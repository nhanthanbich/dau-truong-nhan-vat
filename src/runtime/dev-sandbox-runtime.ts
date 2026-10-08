import { batDauTran, resolveTurn } from "../engine/index.js";
import type { ActionInput, BatDauTranInput, DauVaoNhanVat, PhanBoDiem, Tier, TranDau, TurnResult } from "../engine/types.js";
import type { ClassContent, LocalCharacter } from "../content/demo-content.js";

export type SandboxActorSetup = {
  class_id: string;
  name: string;
  tier: Tier;
  allocation: PhanBoDiem;
  skill_ids: string[];
  control: "NGUOI_CHOI" | "AI";
  ai_archetype?: "AGGRESSIVE" | "CONTROL" | "DEFENSIVE" | "ADAPTIVE";
  initial?: { hp?: number; mp?: number; atb?: number; cooldowns?: Record<string, number> };
};

/** Isolated, in-memory developer runtime. It never reads or writes the player save. */
export class DevSandboxRuntime {
  private match: TranDau | null = null;
  readonly callerId = "dev-local";

  start(input: { teamA: SandboxActorSetup[]; teamB: SandboxActorSetup[]; seed: number; contentVersion: number; classes: readonly ClassContent[] }): TranDau {
    const lookup = new Map(input.classes.map((content) => [content.class_id, content]));
    const makeActor = (setup: SandboxActorSetup): DauVaoNhanVat => {
      const content = lookup.get(setup.class_id);
      if (!content) throw new Error(`Không tìm thấy Class ${setup.class_id}.`);
      const skills = setup.skill_ids.map((id) => content.skills.find((skill) => skill.id === id)).filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));
      if (!skills.length || skills.length !== setup.skill_ids.length) throw new Error(`Chọn ít nhất một kỹ năng hợp lệ của ${content.ten_class}.`);
      return {
        nhan_vat_id: null,
        nguoi_choi_id: setup.control === "NGUOI_CHOI" ? this.callerId : null,
        ten_hien_thi: content.la_hero_preset || content.phan_loai === "LINH_THAN" ? content.ten_co_dinh! : setup.name.trim() || content.ten_class,
        class_id: content.class_id,
        class_ma: content.class_ma,
        ten_class: content.ten_class,
        phan_loai: content.phan_loai,
        la_hero_preset: content.la_hero_preset,
        ten_co_dinh: content.ten_co_dinh,
        ngoai_hinh_co_dinh: { gender: "NAM", skin: "indigo", style: "DEV_LOCAL" },
        chi_so_nen: structuredClone(content.stats),
        tier: setup.tier,
        // Sandbox tier is a per-match test override. It never mutates the saved
        // Hero preset or draft, and keeps the preset validation contract intact.
        tier_seed: content.la_hero_preset ? setup.tier as DauVaoNhanVat["tier_seed"] : content.tier_seed,
        phan_bo_diem: structuredClone(setup.allocation),
        ky_nang: structuredClone(skills),
        noi_tai: structuredClone(content.passive),
        dieu_khien: setup.control,
        ai_archetype: setup.control === "AI" ? setup.ai_archetype ?? "ADAPTIVE" : undefined,
      };
    };
    if (!Number.isInteger(input.seed) || input.seed < 0 || input.seed > 0xffff_ffff) throw new Error("Seed phải là số nguyên không dấu 32-bit.");
    const engineInput: BatDauTranInput = {
      tran_dau_id: `dev-${input.seed.toString(16)}`,
      loai: "PVE_DOI_KHANG",
      che_do_tier: "TU_DO",
      rng_seed: input.seed,
      doi_a: input.teamA.map(makeActor),
      doi_b: input.teamB.map(makeActor),
    };
    const match = batDauTran(engineInput);
    match.du_lieu_noi_dung_snapshot.phien_ban_content = input.contentVersion;
    const setups = [...input.teamA, ...input.teamB];
    setups.forEach((setup, index) => {
      const actor = match.trang_thai_chien_dau.actors[index];
      if (!actor || !setup.initial) return;
      actor.hp_hien_tai = clamp(setup.initial.hp ?? actor.hp_toi_da, 0, actor.hp_toi_da);
      actor.mp_hien_tai = clamp(setup.initial.mp ?? actor.mp_toi_da, 0, actor.mp_toi_da);
      actor.thanh_tich_luy = clamp(setup.initial.atb ?? 0, 0, 2000);
      for (const [skillId, turns] of Object.entries(setup.initial.cooldowns ?? {})) {
        if (!Number.isInteger(turns) || turns < 0) throw new Error("Cooldown ban đầu phải là số lượt nguyên không âm.");
        if (match.du_lieu_noi_dung_snapshot.actors[actor.actor_id]?.ky_nang.some((skill) => skill.id === skillId)) actor.cooldowns[skillId] = turns;
      }
    });
    this.match = match;
    return structuredClone(match);
  }

  current(): TranDau | null { return this.match ? structuredClone(this.match) : null; }
  reset(): void { this.match = null; }

  act(action: ActionInput): TurnResult {
    if (!this.match) throw new Error("Hãy dựng trận sandbox trước.");
    const result = resolveTurn(this.match, action, this.callerId, false);
    if (result.ok) this.match = result.tran;
    return result.ok ? { ok: true, tran: structuredClone(result.tran) } : result;
  }

  actAi(): TurnResult {
    if (!this.match) throw new Error("Hãy dựng trận sandbox trước.");
    const result = resolveTurn(this.match, { ai_tu_dong: true }, null, true);
    if (result.ok) this.match = result.tran;
    return result.ok ? { ok: true, tran: structuredClone(result.tran) } : result;
  }
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) throw new Error("Chỉ số ban đầu phải là số hữu hạn.");
  return Math.min(max, Math.max(min, value));
}

export function setupFromCharacter(character: LocalCharacter): SandboxActorSetup {
  return { class_id: character.class_id, name: character.name, tier: character.tier, allocation: structuredClone(character.allocation), skill_ids: [...character.skill_ids], control: "NGUOI_CHOI" };
}
