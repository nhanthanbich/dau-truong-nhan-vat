import {
  batDauTran,
  moKhoaHeroPreset,
  moKhoaLinhThan,
  nhanTrieuHoiKhoiDau,
  resolveAndAutoAdvance,
  resolveTurn,
  tinhThuongFirstClear,
} from "../engine/index.js";
import type { ActionInput, BatDauTranInput, DauVaoNhanVat, Tier, TranDau, TurnResult } from "../engine/types.js";
import type { HeroPreset, OwnedCharacter, StarterClaimResult, StarterPackStore } from "../engine/progression.js";
import { HERO_PRESETS } from "../engine/progression.js";
import { classContent, createPresetCharacter, DEFAULT_ALLOCATION, DEFAULT_SKILL_IDS, makeActorInput, type LocalCharacter } from "../content/demo-content.js";
import { IndexedDbSaveDriver, LocalGameStore, type LocalGameSave } from "./local-store.js";

export type PvEMode = "PVE_DOI_KHANG" | "PVE_DI_AI";
export type StageDefinition = { id: string; order: number; name: string; huong_hoa_first_clear: number; enemy: Array<{ class_id: string; tier: Tier; ai_archetype: "AGGRESSIVE" | "CONTROL" | "DEFENSIVE" | "ADAPTIVE" }> };

export const STAGES: readonly StageDefinition[] = [
  { id: "stage-1", order: 1, name: "Màn 1 · Bến khởi hành", huong_hoa_first_clear: 100, enemy: [{ class_id: "hero-trang-quynh", tier: "B", ai_archetype: "AGGRESSIVE" }] },
  { id: "stage-2", order: 2, name: "Màn 2 · Đường qua núi", huong_hoa_first_clear: 100, enemy: [{ class_id: "hero-my-chau", tier: "A", ai_archetype: "CONTROL" }, { class_id: "hero-so-dua", tier: "A", ai_archetype: "DEFENSIVE" }] },
  { id: "stage-3", order: 3, name: "Màn 3 · Đấu trường cuối", huong_hoa_first_clear: 100, enemy: [{ class_id: "hero-thanh-giong", tier: "SS", ai_archetype: "AGGRESSIVE" }, { class_id: "hero-chu-cuoi", tier: "S", ai_archetype: "CONTROL" }, { class_id: "hero-lang-lieu", tier: "A", ai_archetype: "DEFENSIVE" }] },
];

export function cryptographicRandom(): number {
  const words = new Uint32Array(1);
  crypto.getRandomValues(words);
  return words[0]! / 0x1_0000_0000;
}

function randomU32(): number {
  const words = new Uint32Array(1);
  crypto.getRandomValues(words);
  return words[0]!;
}

function newId(): string { return crypto.randomUUID(); }

function sameMatchVersion(a: TranDau, b: TranDau): boolean {
  return a.id === b.id && a.trang_thai_chien_dau.so_luot === b.trang_thai_chien_dau.so_luot &&
    a.trang_thai_chien_dau.actor_dang_di === b.trang_thai_chien_dau.actor_dang_di &&
    a.trang_thai_chien_dau.rng_state === b.trang_thai_chien_dau.rng_state;
}

export class LocalRuntime implements StarterPackStore {
  constructor(private readonly store: LocalGameStore, private readonly externalRandom = cryptographicRandom, private readonly contentVersion: () => number = () => 1) {}

  load(): Promise<LocalGameSave> { return this.store.loadOrCreate(); }

  async claimStarterPackAtomically(createPack: () => readonly HeroPreset[]): Promise<StarterClaimResult> {
    return this.store.transact((save) => {
      if (save.da_nhan_trieu_hoi_khoi_dau) return { claimed_now: false, heroes: structuredClone(save.starter_result) };
      const heroes = [...createPack()];
      if (heroes.length !== 10 || new Set(heroes.map((hero) => hero.class_id)).size !== 10) throw new Error("GÃ³i khá»Ÿi Ä‘áº§u cáº§n Ä‘Ãºng 10 Hero khÃ¡c nhau.");
      const officialById = new Map(HERO_PRESETS.map((hero) => [hero.class_id, hero]));
      if (heroes.some((hero) => {
        const official = officialById.get(hero.class_id);
        return !official || official.tier !== hero.tier || official.ten_co_dinh !== hero.ten_co_dinh || official.ma_class !== hero.ma_class;
      }) || !heroes.some((hero) => hero.tier === "S" || hero.tier === "SS") || !heroes.some((hero) => hero.tier !== "B")) {
        throw new Error("GÃ³i pháº£i chá»‰ gá»“m Hero B–SS chÃ­nh thá»©c vÃ  Ä‘áº¡t cáº£ hai báº£o Ä‘áº£m tier.");
      }
      const existing = new Set(save.characters.map((character) => character.class_id));
      if (heroes.some((hero) => existing.has(hero.class_id))) throw new Error("GÃ³i khá»Ÿi Ä‘áº§u táº¡o Hero Ä‘Ã£ sá»Ÿ há»¯u; transaction bá»‹ há»§y Ä‘á»ƒ báº£o toÃ n save.");
      save.characters.push(...heroes.map((hero) => createPresetCharacter(hero, newId())));
      save.starter_result = structuredClone(heroes);
      save.da_nhan_trieu_hoi_khoi_dau = true;
      return { claimed_now: true, heroes };
    });
  }

  claimStarterPack() { return nhanTrieuHoiKhoiDau(this, this.externalRandom); }

  async unlockHero(classId: string): Promise<{ already_owned: boolean; character?: LocalCharacter; balance: number }> {
    return this.store.transact((save) => {
      const owned: OwnedCharacter[] = save.characters.map(({ id, class_id, tier }) => ({ id, class_id, tier }));
      if (owned.some((item) => item.class_id === classId)) return { already_owned: true, balance: save.vi_huong_hoa.so_du };
      const result = moKhoaHeroPreset(classId, HERO_PRESETS, owned, { ...save.vi_huong_hoa });
      const character = createPresetCharacter(result.hero, newId());
      save.vi_huong_hoa.so_du = result.so_du_moi;
      save.characters.push(character);
      return { already_owned: false, character, balance: result.so_du_moi };
    });
  }

  async unlockLinhThan(classId: string): Promise<{ already_owned: boolean; character?: LocalCharacter; balance: number }> {
    return this.store.transact((save) => {
      const owned: OwnedCharacter[] = save.characters.map(({ id, class_id, tier }) => ({ id, class_id, tier }));
      if (owned.some((item) => item.class_id === classId)) return { already_owned: true, balance: save.vi_huong_hoa.so_du };
      const result = moKhoaLinhThan(classId, owned, { ...save.vi_huong_hoa });
      const content = classContent(classId)!;
      const character: LocalCharacter = { id: newId(), class_id: classId, la_hero_preset: false, tier: "SSS", name: content.ten_co_dinh!, allocation: { ...DEFAULT_ALLOCATION }, skill_ids: DEFAULT_SKILL_IDS(classId), appearance: { gender: "NAM", skin: "placeholder-skin-1", style: "PLACEHOLDER_ART" } };
      save.vi_huong_hoa.so_du = result.so_du_moi;
      save.vi_huong_hoa.linh_than_da_mo = result.linh_than_da_mo;
      save.characters.push(character);
      return { already_owned: false, character, balance: result.so_du_moi };
    });
  }

  async setFormation(ids: string[]): Promise<void> {
    await this.store.transact((save) => {
      if (ids.length < 1 || ids.length > 3 || new Set(ids).size !== ids.length || ids.some((id) => !save.characters.some((character) => character.id === id))) throw new Error("Äá»™i hÃ¬nh cáº§n 1â€“3 nhÃ¢n váº­t Ä‘ang sá»Ÿ há»¯u, khÃ´ng trÃ¹ng nhau.");
      if (ids.filter((id) => save.characters.find((character) => character.id === id)?.tier === "SSS").length > 1) throw new Error("Má»—i Ä‘á»™i hÃ¬nh tá»‘i Ä‘a má»™t Linh Tháº§n.");
      save.doi_hinh_mac_dinh = [...ids];
    });
  }

  async startBattle(mode: PvEMode, characterIds: string[], stageId?: string): Promise<TranDau> {
    const seed = randomU32();
    return this.store.transact((save) => {
      if (save.active_match?.trang_thai === "DANG_DIEN_RA") throw new Error("Äang cÃ³ tráº­n chÆ°a káº¿t thÃºc. Tiáº¿p tá»¥c tráº­n Ä‘Ã£ lÆ°u trÆ°á»›c khi báº¯t Ä‘áº§u tráº­n má»›i.");
      if (characterIds.length < 1 || characterIds.length > 3 || new Set(characterIds).size !== characterIds.length) throw new Error("Chá»n tá»« 1 Ä‘áº¿n 3 nhÃ¢n váº­t khÃ¡c nhau.");
      const characters = characterIds.map((id) => save.characters.find((item) => item.id === id));
      if (characters.some((character) => !character)) throw new Error("Äá»™i hÃ¬nh cÃ³ nhÃ¢n váº­t khÃ´ng cÃ²n sá»Ÿ há»¯u.");
      if (characters.filter((character) => character!.tier === "SSS").length > 1) throw new Error("Má»—i Ä‘á»™i hÃ¬nh tá»‘i Ä‘a má»™t Linh Tháº§n.");
      const stage = mode === "PVE_DI_AI" ? STAGES.find((item) => item.id === stageId) : undefined;
      if (mode === "PVE_DI_AI" && !stage) throw new Error("KhÃ´ng tÃ¬m tháº¥y mÃ n Äi áº£i.");
      const enemies = stage?.enemy ?? [
        { class_id: "hero-cau-be-thong-minh", tier: "B" as const, ai_archetype: "CONTROL" as const },
        { class_id: "hero-nang-to-thi", tier: "B" as const, ai_archetype: "AGGRESSIVE" as const },
        { class_id: "hero-trang-quynh", tier: "B" as const, ai_archetype: "DEFENSIVE" as const },
      ];
      const input: BatDauTranInput = {
        tran_dau_id: newId(), loai: mode, che_do_tier: "TU_DO", rng_seed: seed,
        man_choi_id: stage?.id,
        doi_a: characters.map((character) => makeActorInput(character!, "NGUOI_CHOI", save.player_id)),
        doi_b: enemies.map((enemy, index) => makeActorInput({
          id: `ai-${index + 1}`, class_id: enemy.class_id, tier: enemy.tier, la_hero_preset: classContent(enemy.class_id)?.la_hero_preset ?? false,
          name: classContent(enemy.class_id)?.ten_class ?? `Äá»‘i thá»§ ${index + 1}`,
          allocation: { hp: 2, atk: 1, def: 1, spd: 1, mp: 0, mp_hoi: 0 },
          skill_ids: DEFAULT_SKILL_IDS(enemy.class_id),
          appearance: { gender: "NAM", skin: "placeholder-skin-1", style: "PLACEHOLDER_ART" },
          ai_archetype: enemy.ai_archetype,
        }, "AI", null)),
      };
      const match = batDauTran(input);
      match.du_lieu_noi_dung_snapshot.phien_ban_content = this.contentVersion();
      save.doi_hinh_mac_dinh = [...characterIds];
      save.active_match = match;
      return match;
    });
  }

  async advanceAutomaticTurns(): Promise<TranDau | null> {
    let current = (await this.store.read())?.active_match ?? null;
    let count = 0;
    while (current?.trang_thai === "DANG_DIEN_RA" && count++ < 150) {
      const actor = current.trang_thai_chien_dau.actors.find((item) => item.actor_id === current!.trang_thai_chien_dau.actor_dang_di);
      if (!actor || actor.dieu_khien !== "AI") return current;
      const result = await this.commitOne(current, { ai_tu_dong: true }, null, true);
      if (!result.ok) throw new Error(result.loi.mo_ta);
      current = result.tran;
    }
    return current;
  }

  async act(action: ActionInput): Promise<TurnResult> {
    const save = await this.store.read();
    if (!save?.active_match) return { ok: false, loi: { ma: "KHONG_CO_TRAN", mo_ta: "KhÃ´ng cÃ³ tráº­n Ä‘ang lÆ°u Ä‘á»ƒ tiáº¿p tá»¥c." } };
    const match = save.active_match;
    return resolveAndAutoAdvance(match, action, save.player_id, async (expected, nextAction, trusted) => this.commitOne(expected, nextAction, save.player_id, trusted));
  }

  async resumeBattle(): Promise<TranDau | null> { return (await this.store.read())?.active_match ?? null; }
  async latestBattle(): Promise<TranDau | null> { const save = await this.store.read(); return save?.active_match ?? save?.last_match ?? null; }

  private async commitOne(expected: TranDau, action: ActionInput, callerId: string | null, trusted: boolean): Promise<TurnResult> {
    return this.store.transact((save) => {
      const canonical = save.active_match;
      if (!canonical || !sameMatchVersion(canonical, expected)) return { ok: false as const, loi: { ma: "STATE_DA_THAY_DOI", mo_ta: "Tráº¡ng thÃ¡i tráº­n Ä‘Ã£ Ä‘á»•i; táº£i láº¡i canonical state trÆ°á»›c khi gá»­i action." } };
      const result = resolveTurn(canonical, action, callerId, trusted);
      if (!result.ok) return result;
      const match = result.tran;
      if (match.trang_thai === "KET_THUC") {
        const stage = match.man_choi_id ? STAGES.find((item) => item.id === match.man_choi_id) : undefined;
        const playerWon = match.ket_qua === "CO_BEN_THANG" && match.actor_ids_thang.some((id) => match.trang_thai_chien_dau.actors.some((actor) => actor.actor_id === id && actor.doi === "DOI_A"));
        const firstClear = stage ? tinhThuongFirstClear({ loai: match.loai, ket_qua: match.ket_qua!, doiNguoiChoiThang: playerWon, daHoanThanh: Boolean(save.tien_do_di_ai[stage.id]?.da_hoan_thanh), huongHoaFirstClear: stage.huong_hoa_first_clear }) : { first_clear: false, huong_hoa_nhan: 0 };
        if (stage && firstClear.first_clear) {
          save.tien_do_di_ai[stage.id] = { da_hoan_thanh: true, hoan_thanh_luc: new Date().toISOString() };
          save.vi_huong_hoa.so_du += firstClear.huong_hoa_nhan;
        }
        match.ket_qua_tien_trinh = firstClear;
        save.last_match = match;
        save.active_match = null;
      } else save.active_match = match;
      return { ok: true, tran: match };
    });
  }
}

export function createBrowserLocalRuntime(contentVersion?: () => number): LocalRuntime {
  return new LocalRuntime(new LocalGameStore(new IndexedDbSaveDriver()), cryptographicRandom, contentVersion);
}


