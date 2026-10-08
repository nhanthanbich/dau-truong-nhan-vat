import { describe, expect, it } from "vitest";
import { LocalRuntime } from "../src/runtime/local-runtime.js";
import { LocalGameStore, MemorySaveDriver } from "../src/runtime/local-store.js";
import { HERO_CLASSES, LINH_THAN_CLASSES } from "../src/content/demo-content.js";
import { luaChonHopLe } from "../src/engine/read-model.js";

function makeRuntime() {
  const driver = new MemorySaveDriver();
  let randomState = 0;
  const runtime = new LocalRuntime(new LocalGameStore(driver, () => "player-test"), () => ((randomState = (randomState + 37) % 997) / 997), () => 7);
  return { driver, runtime };
}

describe("Local Runtime acceptance", () => {
  it("atomically claims the ten-result 19-Hero gacha once across reload and concurrent requests", async () => {
    const { driver, runtime } = makeRuntime();
    const results = await Promise.all([runtime.claimStarterPack(), runtime.claimStarterPack()]);
    expect(results.filter((result) => result.claimed_now)).toHaveLength(1);
    expect(results[0]!.heroes).toHaveLength(10);
    const save = await new LocalGameStore(driver).loadOrCreate();
    expect(save.da_nhan_trieu_hoi_khoi_dau).toBe(true);
    expect(save.characters).toHaveLength(10);
    expect(new Set(save.characters.map((hero) => hero.class_id)).size).toBe(10);
    expect(save.characters.every((hero) => hero.class_id.startsWith("hero-") && hero.la_hero_preset && hero.tier !== "SSS" && hero.appearance.style === "PLACEHOLDER_ART")).toBe(true);
    expect(results[0]!.heroes.some((hero) => hero.tier === "S" || hero.tier === "SS")).toBe(true);
    expect(results[0]!.heroes.some((hero) => hero.tier !== "B")).toBe(true);
  });

  it("sends a current Hero through the Shared Engine and keeps canonical battle state after reload", async () => {
    const { driver, runtime } = makeRuntime();
    await runtime.claimStarterPack();
    const ids = (await runtime.load()).characters.slice(0, 3).map((item) => item.id);
    await runtime.setFormation(ids);
    const battle = await runtime.startBattle("PVE_DOI_KHANG", ids);
    expect(battle.che_do_tier).toBe("TU_DO");
    expect(battle.du_lieu_noi_dung_snapshot.phien_ban_content).toBe(7);
    expect(await new LocalRuntime(new LocalGameStore(driver)).resumeBattle()).toEqual(battle);
  });

  it("migrates retired roster ownership and leaves an active match snapshot untouched", async () => {
    const { driver, runtime } = makeRuntime();
    await runtime.claimStarterPack();
    const ids = (await runtime.load()).characters.slice(0, 3).map((item) => item.id);
    const battle = await runtime.startBattle("PVE_DOI_KHANG", ids);
    await driver.transact(() => { throw new Error("Save must already exist."); }, (save) => {
      save.schema_version = 1;
      const character = save.characters[0]!;
      character.class_id = "hero-vua-hung-18";
      character.tier = "A";
    });
    const migrated = await new LocalGameStore(driver).loadOrCreate();
    expect(migrated.schema_version).toBe(2);
    expect(migrated.characters[0]?.class_id).toBe("hero-hung-vuong");
    expect(migrated.characters[0]?.name).toBe("Hùng Vương");
    expect(migrated.characters[0]?.tier).toBe("S");
    expect(migrated.active_match).toEqual(battle);
  });

  it("charges direct Hero unlock once", async () => {
    const { driver, runtime } = makeRuntime();
    await new LocalGameStore(driver).transact((save) => { save.vi_huong_hoa.so_du = 100; });
    const first = await runtime.unlockHero("hero-so-dua");
    const second = await runtime.unlockHero("hero-so-dua");
    expect(first.already_owned).toBe(false);
    expect(first.balance).toBe(70);
    expect(second.already_owned).toBe(true);
    expect(second.balance).toBe(70);
  });

  it("uses exactly 300 Hương Hỏa to directly choose one official Linh Thần", async () => {
    const { driver, runtime } = makeRuntime();
    await new LocalGameStore(driver).transact((save) => { save.vi_huong_hoa.so_du = 300; });
    const first = await runtime.unlockLinhThan("linh-than-son-tinh");
    const second = await runtime.unlockLinhThan("linh-than-son-tinh");
    expect(first.character?.tier).toBe("SSS");
    expect(first.balance).toBe(0);
    expect(second.already_owned).toBe(true);
    expect(second.balance).toBe(0);
    const save = await runtime.load();
    expect(save.vi_huong_hoa.linh_than_da_mo).toEqual(["linh-than-son-tinh"]);
    expect(save.characters.find((character) => character.class_id === "linh-than-son-tinh")?.la_hero_preset).toBe(false);
  });

  it("offers the 23 official Heroes with six skills and a passive each", () => {
    const roster = [...HERO_CLASSES, ...LINH_THAN_CLASSES];
    expect(roster).toHaveLength(23);
    expect(roster.every((item) => item.content_status === "CONTENT_OFFICIAL" && item.skills.length === 6 && item.passive)).toBe(true);
    expect(new Set(roster.map((item) => item.class_id)).size).toBe(23);
    expect(roster.filter((item) => item.tier === "SSS")).toHaveLength(4);
    expect(roster.filter((item) => item.tier !== "SSS" && item.la_hero_preset)).toHaveLength(19);
  });

  it("grants PvE first-clear Hương Hỏa once and persists canonical result", async () => {
    const { driver, runtime } = makeRuntime();
    await runtime.claimStarterPack();
    await new LocalGameStore(driver).transact((save) => { save.vi_huong_hoa.so_du = 400; });
    await runtime.unlockLinhThan("linh-than-lac-long-quan");
    await runtime.unlockHero("hero-an-duong-vuong");
    await runtime.unlockHero("hero-hung-vuong");
    const ids = (await runtime.load()).characters.filter((character) => ["linh-than-lac-long-quan", "hero-an-duong-vuong", "hero-hung-vuong"].includes(character.class_id)).map((character) => character.id);
    const balanceBeforeClear = (await runtime.load()).vi_huong_hoa.so_du;
    await runtime.setFormation(ids);
    async function finish(match: Awaited<ReturnType<typeof runtime.startBattle>>) {
      for (let step = 0; step < 180 && match.trang_thai === "DANG_DIEN_RA"; step++) {
        const active = match.trang_thai_chien_dau.actors.find((actor) => actor.actor_id === match.trang_thai_chien_dau.actor_dang_di)!;
        if (active.dieu_khien === "AI") match = (await runtime.advanceAutomaticTurns())!;
        else {
          const choice = luaChonHopLe(match).ky_nang.find((skill) => skill.dung_duoc);
          const result = choice ? await runtime.act({ ky_nang_id: choice.ky_nang_id, target_actor_id: choice.can_chon_target ? choice.target_hop_le[0] : undefined }) : await runtime.act({ bo_luot: true });
          if (!result.ok) throw new Error(result.loi.mo_ta);
          match = result.tran;
        }
      }
      return match;
    }
    const match = await finish(await runtime.startBattle("PVE_DI_AI", ids, "stage-1"));
    const save = await new LocalGameStore(driver).loadOrCreate();
    expect(match.trang_thai).toBe("KET_THUC");
    expect(match.ket_qua).toBe("CO_BEN_THANG");
    expect(save.vi_huong_hoa.so_du).toBe(balanceBeforeClear + 100);
    expect(save.tien_do_di_ai["stage-1"]?.da_hoan_thanh).toBe(true);
    expect(save.last_match).toEqual(match);
    const replay = await finish(await runtime.startBattle("PVE_DI_AI", ids, "stage-1"));
    expect(replay.ket_qua_tien_trinh).toEqual({ first_clear: false, huong_hoa_nhan: 0 });
    expect((await runtime.load()).vi_huong_hoa.so_du).toBe(balanceBeforeClear + 100);
  });
});
