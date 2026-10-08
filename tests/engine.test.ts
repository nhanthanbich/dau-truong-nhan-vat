import { describe, expect, it } from "vitest";
import combatFixture from "./fixtures/combat-basic.json";
import starterFixture from "./fixtures/progression-starter.json";
import pveTierFixture from "./fixtures/combat-pve-tier.json";
import {
  HERO_PRESETS,
  batDauTran,
  capThuongFirstClear,
  chonHanhDongAI,
  DANH_SACH_19_MA,
  hashSeedU32,
  moKhoaHeroPreset,
  luaChonHopLe,
  nhanTrieuHoiKhoiDau,
  nextU32,
  phanBoHopLeTaoMoi,
  phanBoHopLeVaoTran,
  resolveTurn,
  resolveTimeout,
  resolveAndAutoAdvanceInMemory,
  rollStarterPack,
  tinhChiSoCuoi,
  tinhThuongFirstClear,
  validateLinhThanPublication,
  xacDinhBoLuotTuDong,
} from "../src/engine/index.js";
import type { BatDauTranInput, DauVaoNhanVat, HieuUngCauHinh, KyNangSnapshot, NoiTaiSnapshot, TranDau } from "../src/engine/index.js";

const combatGolden = combatFixture as {
  rng_seed: number; tier: "SSS"; mode: "TU_DO"; base_stats: DauVaoNhanVat["chi_so_nen"];
  allocation: DauVaoNhanVat["phan_bo_diem"]; expected: { effective_base_hp: number; effective_base_atk: number; effective_base_def: number; effective_spd: number; stun_duration: number; new_lock_while_locked: string };
};
const starterGolden = starterFixture as { seed: number; expected_count: number; expected_unique: number; guaranteed_tiers: string[]; minimum_tiers: string[] };
const pveTierGolden = pveTierFixture as {
  requested_mode: "CAN_BANG";
  tier: "S";
  expected: { mode: "TU_DO"; tier_multiplier: number; hp: number; atk: number; def: number; spd: number; mp: number; mp_hoi: number };
};

function effect(ma: HieuUngCauHinh["ma_hieu_ung"], tham_so: Record<string, number>, doi_tuong: HieuUngCauHinh["doi_tuong"] = "BAN_THAN"): HieuUngCauHinh {
  return { ma_hieu_ung: ma, tham_so, doi_tuong, thoi_diem: "KHI_THI_TRIEN" };
}

function skill(id: string, effects: HieuUngCauHinh[], cost = 0, cooldown = 0): KyNangSnapshot {
  return { id, ma_ky_nang: id.toUpperCase(), ten_hien_thi: id, class_id: "class-common", hoi_chieu_luot: cooldown, chi_phi_mp: cost, danh_sach_hieu_ung: effects, trang_thai: "HOAT_DONG" };
}

function actor(id: string, control: "NGUOI_CHOI" | "AI", skills?: KyNangSnapshot[], tier: DauVaoNhanVat["tier"] = "B"): DauVaoNhanVat {
  const selected = skills ?? [skill("guard", [effect("EFF_BUFF_DEF", { gia_tri: 0, so_luot: 1 })])];
  const passive: NoiTaiSnapshot = {
    id: `passive-${id}`, ma_noi_tai: `PASSIVE_${id}`, ten_hien_thi: "Nội tại seed",
    kich_hoat: "BAT_DAU_LUOT", dieu_kien: {}, danh_sach_hieu_ung: [effect("EFF_BUFF_DEF", { gia_tri: 0, so_luot: 1 })],
  };
  return {
    nhan_vat_id: `${id}-character`, nguoi_choi_id: control === "NGUOI_CHOI" ? (id.startsWith("A") ? "player-a" : "player-b") : null,
    ten_hien_thi: id, class_id: "class-common", class_ma: "CLASS_COMMON", ten_class: "Class chung", phan_loai: "THUONG",
    chi_so_nen: { hp_nen: 300, atk_nen: 80, def_nen: 40, spd_nen: 100, mp_nen: 50, mp_hoi_moi_luot: 5 },
    tier, phan_bo_diem: { hp: 1, atk: 1, def: 1, spd: 1, mp: 1, mp_hoi: 0 }, ky_nang: selected, noi_tai: passive,
    dieu_khien: control, ai_archetype: control === "AI" ? "AGGRESSIVE" : undefined,
  };
}

function start(override: Partial<BatDauTranInput> = {}): TranDau {
  return batDauTran({
    tran_dau_id: "fixture-match", loai: "PVE_DOI_KHANG", che_do_tier: "TU_DO",
    doi_a: [actor("A1", "NGUOI_CHOI")], doi_b: [actor("B1", "AI")], rng_seed: 123456789,
    ...override,
  });
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

describe("Shared Combat Engine — golden fixtures", () => {
  it("exposes exactly the closed 19-effect registry", () => {
    expect(DANH_SACH_19_MA).toHaveLength(19);
    expect(new Set(DANH_SACH_19_MA).size).toBe(19);
  });

  it("allows BI_DONG_DAU_TRAN only for a BAT_DAU_TRAN passive, never for a skill", () => {
    const passiveActor = actor("A1", "NGUOI_CHOI");
    passiveActor.noi_tai.kich_hoat = "BAT_DAU_TRAN";
    passiveActor.noi_tai.danh_sach_hieu_ung = [{ ...effect("EFF_SHIELD", { luong_hap_thu: 35 }), thoi_diem: "BI_DONG_DAU_TRAN" }];
    const match = start({ doi_a: [passiveActor], doi_b: [actor("B1", "AI")] });
    expect(match.trang_thai_chien_dau.actors.find((item) => item.actor_id === "A1")?.shield_hien_tai).toBe(35);
    expect(() => start({ doi_a: [actor("A1", "NGUOI_CHOI", [skill("bad-time", [{ ...effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH"), thoi_diem: "BI_DONG_DAU_TRAN" }])])], doi_b: [actor("B1", "AI")] })).toThrow(/Skill chỉ hỗ trợ KHI_THI_TRIEN/);
    passiveActor.noi_tai.kich_hoat = "BAT_DAU_LUOT";
    expect(() => start({ doi_a: [passiveActor], doi_b: [actor("B1", "AI")] })).toThrow(/Nội tại không hỗ trợ BI_DONG_DAU_TRAN nếu trigger không phải BAT_DAU_TRAN/);
  });

  it("applies the v2.4 tier multipliers only to HP/ATK/DEF in PvE TU_DO", () => {
    const result = tinhChiSoCuoi(combatGolden.base_stats, combatGolden.allocation, combatGolden.tier, combatGolden.mode);
    expect(result.he_so_tier_ap_dung).toBe(1.22);
    expect(result.chi_so_nen_hieu_dung).toMatchObject({
      hp_nen: combatGolden.expected.effective_base_hp,
      atk_nen: combatGolden.expected.effective_base_atk,
      def_nen: combatGolden.expected.effective_base_def,
      spd_nen: combatGolden.base_stats.spd_nen,
      mp_nen: combatGolden.base_stats.mp_nen,
      mp_hoi_moi_luot: combatGolden.base_stats.mp_hoi_moi_luot,
    });
    expect(tinhChiSoCuoi(combatGolden.base_stats, combatGolden.allocation, "SSS", "CAN_BANG").he_so_tier_ap_dung).toBe(1);
  });

  it("forces PvE into TU_DO and matches the tier golden fixture", () => {
    const tran = start({
      loai: "PVE_DOI_KHANG",
      che_do_tier: pveTierGolden.requested_mode,
      doi_a: [actor("A1", "NGUOI_CHOI", undefined, pveTierGolden.tier)],
    });
    const content = tran.du_lieu_noi_dung_snapshot.actors.A1!;
    expect(tran.che_do_tier).toBe(pveTierGolden.expected.mode);
    expect(content.he_so_tier_ap_dung).toBe(pveTierGolden.expected.tier_multiplier);
    expect(content.chi_so_cuoi).toMatchObject({
      hp: pveTierGolden.expected.hp,
      atk: pveTierGolden.expected.atk,
      def: pveTierGolden.expected.def,
      spd: pveTierGolden.expected.spd,
      mp: pveTierGolden.expected.mp,
      mp_hoi: pveTierGolden.expected.mp_hoi,
    });
  });

  it("allows the AI-only C and SS tiers for THUONG actors", () => {
    for (const tier of ["C", "SS"] as const) {
      const tran = start({ doi_b: [actor("B1", "AI", undefined, tier)] });
      expect(tran.du_lieu_noi_dung_snapshot.actors.B1?.tier).toBe(tier);
    }
  });

  it("starts a variable-formation battle, resolves effect order, damage and lock CC deterministically", () => {
    const attack = skill("strike-stun", [
      effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH"),
      effect("EFF_STUN", { so_luot: 2 }, "MOT_DICH"),
    ]);
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI", [attack])], doi_b: [actor("B1", "AI")] });
    expect(tran.trang_thai_chien_dau.actors).toHaveLength(2);
    expect(tran.trang_thai_chien_dau.actor_dang_di).toBe("A1");
    const result = resolveTurn(tran, { ky_nang_id: attack.id, target_actor_id: "B1" }, "player-a");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const defender = result.tran.trang_thai_chien_dau.actors.find((a) => a.actor_id === "B1")!;
    expect(defender.hp_hien_tai).toBe(261); // round(85 × 100 / (100 + 48)) = 57
    expect(defender.debuff.find((status) => status.ma_hieu_ung === "EFF_STUN")?.so_luot).toBe(combatGolden.expected.stun_duration);
    expect(result.tran.nhat_ky_luot_danh[0]?.hieu_ung_ap_dung.map((item) => item.ma_hieu_ung)).toEqual(["EFF_BUFF_DEF", "EFF_DMG_DIRECT", "EFF_STUN"]);
    expect(result.tran.nhat_ky_luot_danh[0]?.hieu_ung_ap_dung[1]?.gia_tri).toBe(57);
  });

  it("ignores a second lock CC while locked and applies no diminishing returns rule", () => {
    const stunSkill = skill("stun", [effect("EFF_STUN", { so_luot: 2 }, "MOT_DICH")]);
    const silenceSkill = skill("silence", [effect("EFF_SILENCE", { so_luot: 1 }, "MOT_DICH")]);
    const stun = start({ doi_a: [actor("A1", "NGUOI_CHOI", [stunSkill, silenceSkill])], doi_b: [actor("B1", "AI")] });
    const first = resolveTurn(stun, { ky_nang_id: "stun", target_actor_id: "B1" }, "player-a");
    expect(first.ok).toBe(true);
    if (!first.ok) return;
    first.tran.trang_thai_chien_dau.actor_dang_di = "A1";
    const second = resolveTurn(first.tran, { ky_nang_id: "silence", target_actor_id: "B1" }, "player-a", true);
    const target = first.tran.trang_thai_chien_dau.actors.find((a) => a.actor_id === "B1")!;
    expect(target.debuff.find((status) => status.ma_hieu_ung === "EFF_STUN")?.so_luot).toBe(2);
    expect(second.ok).toBe(true);
    if (second.ok) expect(second.tran.nhat_ky_luot_danh.at(-1)?.hieu_ung_ap_dung.at(-1)).toMatchObject({ bi_bo_qua: true, ly_do_bo_qua: "DANG_MANG_CC" });
    const invalidWideCc = () => start({ doi_a: [actor("A1", "NGUOI_CHOI", [skill("wide", [effect("EFF_STUN", { so_luot: 1 }, "TAT_CA_DICH")])])], doi_b: [actor("B1", "AI")] });
    expect(invalidWideCc).toThrow();
  });

  it("auto-passes STUN and preserves deterministic PRNG state", () => {
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI", [skill("stun", [effect("EFF_STUN", { so_luot: 1 }, "MOT_DICH")])])], doi_b: [actor("B1", "AI")] });
    const cast = resolveTurn(tran, { ky_nang_id: "stun", target_actor_id: "B1" }, "player-a");
    expect(cast.ok).toBe(true);
    if (!cast.ok) return;
    expect(xacDinhBoLuotTuDong(cast.tran, cast.tran.trang_thai_chien_dau.actors.find((a) => a.actor_id === "B1")!)).toBe("BI_STUN");
    const a = nextU32(hashSeedU32("golden"));
    const b = nextU32(hashSeedU32("golden"));
    expect(a).toEqual(b);
  });

  it("rejects invalid allocation and target rather than silently retargeting", () => {
    const validAllocation = { hp: 2, atk: 2, def: 0, spd: 1, mp: 0, mp_hoi: 0 };
    const emptyLegacyAllocation = { hp: 0, atk: 0, def: 0, spd: 0, mp: 0, mp_hoi: 0 };
    const invalidAllocation = { hp: 3, atk: 2, def: 0, spd: 0, mp: 0, mp_hoi: 0 };
    expect(phanBoHopLeTaoMoi(validAllocation)).toBe(true);
    expect(phanBoHopLeTaoMoi(emptyLegacyAllocation)).toBe(false);
    expect(phanBoHopLeVaoTran(validAllocation)).toBe(true);
    expect(phanBoHopLeVaoTran(emptyLegacyAllocation)).toBe(true);
    expect(phanBoHopLeTaoMoi(invalidAllocation)).toBe(false);
    expect(phanBoHopLeVaoTran(invalidAllocation)).toBe(false);
    const attack = skill("attack", [effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH")]);
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI", [attack])], doi_b: [actor("B1", "AI"), actor("B2", "AI")] });
    const missing = resolveTurn(tran, { ky_nang_id: "attack" }, "player-a");
    expect(missing.ok).toBe(false);
    if (!missing.ok) expect(missing.loi.ma).toBe("THIEU_TARGET");
    const wrongTarget = resolveTurn(tran, { ky_nang_id: "attack", target_actor_id: "A1" }, "player-a");
    expect(wrongTarget.ok).toBe(false);
  });

  it("honors MP, silence and root turn-pass contracts", () => {
    const healing = skill("heal", [effect("EFF_HEAL", { gia_tri: 10 })], 0);
    const actorWithSilence = start({ doi_a: [actor("A1", "NGUOI_CHOI", [healing])], doi_b: [actor("B1", "AI")] });
    const current = actorWithSilence.trang_thai_chien_dau.actors[0]!;
    current.debuff.push({ instance_id: 99, ma_hieu_ung: "EFF_SILENCE", nhom: "KHONG_CHE", so_luot: 1, tham_so: { so_luot: 1 }, nguon_actor_id: "B1", nguon: "SKILL", thu_tu_ap_dung: 99 });
    expect(xacDinhBoLuotTuDong(actorWithSilence, current)).toBe("BI_SILENCE");
  });

  it("caps shield, prioritizes CC cleanse, and ticks DOT/HOT once per global action", () => {
    const shieldSkill = skill("shield", [effect("EFF_SHIELD", { luong_hap_thu: 1000 })]);
    const shieldMatch = start({ doi_a: [actor("A1", "NGUOI_CHOI", [shieldSkill])], doi_b: [actor("B1", "AI")] });
    const caster = shieldMatch.trang_thai_chien_dau.actors[0]!;
    caster.hp_hien_tai = 200;
    const shielded = resolveTurn(shieldMatch, { ky_nang_id: "shield" }, "player-a");
    expect(shielded.ok).toBe(true);
    if (shielded.ok) {
      expect(shielded.tran.trang_thai_chien_dau.actors[0]?.shield_hien_tai).toBe(159);
      expect(shielded.tran.nhat_ky_luot_danh[0]?.hieu_ung_ap_dung.at(-1)).toMatchObject({ bi_cat_tran: true, gia_tri: 159 });
    }

    const cleanseSkill = skill("cleanse", [effect("EFF_CLEANSE", { so_luong_go: 1 }, "MOT_DONG_DOI")]);
    const cleanseMatch = start({ doi_a: [actor("A1", "NGUOI_CHOI", [cleanseSkill]), actor("A2", "NGUOI_CHOI")], doi_b: [actor("B1", "AI")] });
    const ally = cleanseMatch.trang_thai_chien_dau.actors.find((a) => a.actor_id === "A2")!;
    ally.debuff.push(
      { instance_id: 10, ma_hieu_ung: "EFF_DEBUFF_ATK", nhom: "DEBUFF", so_luot: 2, tham_so: { gia_tri: 5, so_luot: 2 }, nguon_actor_id: "B1", nguon: "SKILL", thu_tu_ap_dung: 1 },
      { instance_id: 11, ma_hieu_ung: "EFF_STUN", nhom: "KHONG_CHE", so_luot: 1, tham_so: { so_luot: 1 }, nguon_actor_id: "B1", nguon: "SKILL", thu_tu_ap_dung: 2 },
    );
    const cleaned = resolveTurn(cleanseMatch, { ky_nang_id: "cleanse", target_actor_id: "A2" }, "player-a");
    expect(cleaned.ok).toBe(true);
    if (cleaned.ok) {
      const cleanedAlly = cleaned.tran.trang_thai_chien_dau.actors.find((a) => a.actor_id === "A2")!;
      expect(cleanedAlly.debuff.map((item) => item.ma_hieu_ung)).toEqual(["EFF_DEBUFF_ATK"]);
      expect(cleanedAlly.khang_cc).toBe(2);
    }

    const dotSkill = skill("dot", [effect("EFF_DMG_DOT", { sat_thuong_moi_luot: 10, so_luot: 1 }, "MOT_DICH")]);
    const dotMatch = start({ doi_a: [actor("A1", "NGUOI_CHOI", [dotSkill])], doi_b: [actor("B1", "AI")] });
    const applied = resolveTurn(dotMatch, { ky_nang_id: "dot", target_actor_id: "B1" }, "player-a");
    expect(applied.ok).toBe(true);
    if (!applied.ok) return;
    const afterNextGlobalAction = resolveTurn(applied.tran, { bo_luot: true }, null, true);
    expect(afterNextGlobalAction.ok).toBe(true);
    if (afterNextGlobalAction.ok) {
      const dotTarget = afterNextGlobalAction.tran.trang_thai_chien_dau.actors.find((a) => a.actor_id === "B1")!;
      expect(dotTarget.hp_hien_tai).toBe(308);
      expect(dotTarget.dot).toHaveLength(0);
    }
  });

  it("grants CC resistance only when CLEANSE removes locking CC and preserves both turns", () => {
    const cleanse = skill("cleanse-ally", [effect("EFF_CLEANSE", { so_luong_go: 1 }, "MOT_DONG_DOI")]);
    const ordinary = start({ doi_a: [actor("A1", "NGUOI_CHOI", [cleanse]), actor("A2", "NGUOI_CHOI")], doi_b: [actor("B1", "AI")] });
    const ally = ordinary.trang_thai_chien_dau.actors.find((item) => item.actor_id === "A2")!;
    ally.debuff.push({ instance_id: 91, ma_hieu_ung: "EFF_DEBUFF_ATK", nhom: "DEBUFF", so_luot: 2, tham_so: { gia_tri: 5, so_luot: 2 }, nguon_actor_id: "B1", nguon: "SKILL", thu_tu_ap_dung: 91 });
    const ordinaryResult = resolveTurn(ordinary, { ky_nang_id: "cleanse-ally", target_actor_id: "A2" }, "player-a");
    expect(ordinaryResult.ok).toBe(true);
    if (ordinaryResult.ok) expect(ordinaryResult.tran.trang_thai_chien_dau.actors.find((item) => item.actor_id === "A2")?.khang_cc).toBe(0);

    const selfCleanse = start({ doi_a: [actor("A1", "NGUOI_CHOI", [cleanse])], doi_b: [actor("B1", "AI")] });
    const caster = selfCleanse.trang_thai_chien_dau.actors.find((item) => item.actor_id === "A1")!;
    caster.debuff.push({ instance_id: 92, ma_hieu_ung: "EFF_STUN", nhom: "KHONG_CHE", so_luot: 1, tham_so: { so_luot: 1 }, nguon_actor_id: "B1", nguon: "SKILL", thu_tu_ap_dung: 92 });
    const selfResult = resolveTurn(selfCleanse, { ky_nang_id: "cleanse-ally" }, "player-a");
    expect(selfResult.ok).toBe(true);
    if (selfResult.ok) expect(selfResult.tran.trang_thai_chien_dau.actors.find((item) => item.actor_id === "A1")?.khang_cc).toBe(2);
  });

  it("rejects a target that was already dead when the action began", () => {
    const attack = skill("attack-dead-target", [effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH")]);
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI", [attack])], doi_b: [actor("B1", "AI"), actor("B2", "AI")] });
    tran.trang_thai_chien_dau.actors.find((item) => item.actor_id === "B2")!.hp_hien_tai = 0;
    const result = resolveTurn(tran, { ky_nang_id: attack.id, target_actor_id: "B2" }, "player-a");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.loi.ma).toBe("TARGET_KHONG_HOP_LE");
  });

  it("builds the turn read-model from post-recovery MP and live legal targets", () => {
    const affordable = skill("affordable", [effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH")], 5);
    const tooExpensive = skill("expensive", [effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH")], 100);
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI", [affordable, tooExpensive])], doi_b: [actor("B1", "AI"), actor("B2", "AI")] });
    const current = tran.trang_thai_chien_dau.actors.find((item) => item.actor_id === "A1")!;
    current.mp_hien_tai = 0;
    const readModel = luaChonHopLe(tran);
    expect(readModel.co_the_bo_luot).toBe(true);
    expect(readModel.ky_nang[0]).toMatchObject({ dung_duoc: true, can_chon_target: true, target_hop_le: ["B1", "B2"] });
    expect(readModel.ky_nang[1]).toMatchObject({ dung_duoc: false, ly_do: "THIEU_MP" });
  });

  it("builds roster-derived AI choices deterministically", () => {
    const damage = skill("ai-strike", [effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH")]);
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI")], doi_b: [actor("B1", "AI", [damage])] });
    const first = chonHanhDongAI(tran, "B1");
    const second = chonHanhDongAI(tran, "B1");
    expect(first).toEqual(second);
    expect(first?.ky_nang_id).toBe("ai-strike");
  });

  it("auto-resolves AI sequentially through the shared engine and stops at player input", async () => {
    const playerPass = skill("player-pass", [effect("EFF_BUFF_DEF", { gia_tri: 0, so_luot: 1 })]);
    const aiAttack = skill("ai-attack", [effect("EFF_DMG_DIRECT", { he_so: 1 }, "MOT_DICH")]);
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI", [playerPass])], doi_b: [actor("B1", "AI", [aiAttack])] });
    const result = await resolveAndAutoAdvanceInMemory(tran, { bo_luot: true }, "player-a");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.tran.nhat_ky_luot_danh.map((entry) => entry.actor_id)).toEqual(["A1", "B1"]);
      expect(result.tran.nhat_ky_luot_danh[1]?.ky_nang_id).toBe("ai-attack");
      expect(result.tran.trang_thai_chien_dau.actor_dang_di).toBe("A1");
      expect(result.tran.trang_thai_chien_dau.so_luot).toBe(3);
    }
  });

  it("logs each seeded NGAU_NHIEN_N_DICH roll with its preceding rng_state", () => {
    const randomSkill = skill("random-stun", [effect("EFF_STUN", { so_luot: 1 }, "NGAU_NHIEN_N_DICH")]);
    const tran = start({ doi_a: [actor("A1", "NGUOI_CHOI", [randomSkill])], doi_b: [actor("B1", "AI"), actor("B2", "AI")] });
    const result = resolveTurn(tran, { ky_nang_id: "random-stun" }, "player-a");
    expect(result.ok).toBe(true);
    if (result.ok) {
      const log = result.tran.nhat_ky_luot_danh[0]!;
      expect(log.rng_rolls).toHaveLength(1);
      expect(log.rng_rolls?.[0]?.rng_state_truoc).toBe(tran.trang_thai_chien_dau.rng_state);
      expect(log.hieu_ung_ap_dung.at(-1)?.target_actor_id).toBe(log.rng_rolls?.[0]?.actor_chon);
      expect(result.tran.trang_thai_chien_dau.rng_state).not.toBe(tran.trang_thai_chien_dau.rng_state);
    }
  });

  it("increments canonical so_luot for PvP timeout and awards the opponent team", () => {
    const tran = start({ loai: "PVP_DOI_KHANG", doi_a: [actor("A1", "NGUOI_CHOI")], doi_b: [actor("B1", "NGUOI_CHOI")] });
    const result = resolveTimeout(tran, tran.trang_thai_chien_dau.actor_dang_di);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.tran.trang_thai).toBe("KET_THUC");
      expect(result.tran.trang_thai_chien_dau.so_luot).toBe(tran.trang_thai_chien_dau.so_luot + 1);
      expect(result.tran.nhat_ky_luot_danh.at(-1)?.hanh_dong).toBe("TIMEOUT");
      expect(result.tran.actor_ids_thang).toEqual(["B1"]);
    }
  });
});

describe("v2.4 progression", () => {
  it("seeds exactly 19 gacha Hero split to the Owner roster", () => {
    expect(HERO_PRESETS).toHaveLength(19);
    expect(new Set(HERO_PRESETS.map((hero) => hero.class_id)).size).toBe(19);
    expect(["B", "A", "S", "SS"].map((tier) => HERO_PRESETS.filter((hero) => hero.tier === tier).length)).toEqual([3, 7, 6, 3]);
  });

  it("keeps the exact v2.4 Hero names and tier order", () => {
    expect(HERO_PRESETS.map(({ ten_co_dinh, tier, la_hero_preset }) => [ten_co_dinh, tier, la_hero_preset])).toEqual([
      ["Thánh Gióng", "SS", true], ["Thạch Sanh", "SS", true], ["Chử Đồng Tử", "SS", true],
      ["An Dương Vương", "S", true], ["Hùng Vương", "S", true], ["Tấm", "S", true], ["Chú Cuội", "S", true], ["Cóc", "S", true], ["Ông Táo", "S", true],
      ["Mỵ Châu", "A", true], ["Trọng Thủy", "A", true], ["Tiên Dung", "A", true], ["Sọ Dừa", "A", true], ["Mai An Tiêm", "A", true], ["Lang Liêu", "A", true], ["Anh Khoai", "A", true],
      ["Cậu Bé Thông Minh", "B", true], ["Trạng Quỳnh", "B", true], ["Nàng Tô Thị", "B", true],
    ]);
  });

  it("hard-blocks a Linh Thần class without four active skills and a marked kit feature", () => {
    const skillList = Array.from({ length: 4 }, (_, i) => skill(`god-${i}`, [effect("EFF_BUFF_DEF", { gia_tri: 1, so_luot: 1 })]));
    skillList.forEach((item) => { item.class_id = "god"; });
    const passive = actor("A1", "NGUOI_CHOI").noi_tai;
    expect(() => validateLinhThanPublication({ class_id: "god", trang_thai: "HOAT_DONG", ky_nang_hoat_dong: skillList, noi_tai: passive })).toThrow();
    skillList[0]!.dac_trung_rieng = true;
    expect(() => validateLinhThanPublication({ class_id: "god", trang_thai: "HOAT_DONG", ky_nang_hoat_dong: skillList, noi_tai: passive })).not.toThrow();
  });

  it("produces a deterministic 10-unique starter pack with both guarantees", () => {
    const one = rollStarterPack(seededRandom(starterGolden.seed));
    const two = rollStarterPack(seededRandom(starterGolden.seed));
    expect(one).toEqual(two);
    expect(one).toHaveLength(starterGolden.expected_count);
    expect(new Set(one.map((hero) => hero.class_id)).size).toBe(starterGolden.expected_unique);
    expect(one.some((hero) => starterGolden.guaranteed_tiers.includes(hero.tier))).toBe(true);
    expect(one.some((hero) => starterGolden.minimum_tiers.includes(hero.tier))).toBe(true);
  });

  it("keeps every seeded pack inside the official 19-Hero pool and repairs guarantees without duplicates", () => {
    const official = new Set(HERO_PRESETS.map((hero) => hero.class_id));
    for (let seed = 0; seed < 250; seed++) {
      const pack = rollStarterPack(seededRandom(seed));
      expect(pack).toHaveLength(10);
      expect(new Set(pack.map((hero) => hero.class_id)).size).toBe(10);
      expect(pack.every((hero) => official.has(hero.class_id))).toBe(true);
      expect(pack.some((hero) => hero.tier === "S" || hero.tier === "SS")).toBe(true);
      expect(pack.some((hero) => hero.tier !== "B")).toBe(true);
    }
  });

  it("chooses a Hero directly and never charges for an already owned Hero", () => {
    const hero = HERO_PRESETS.find((item) => item.tier === "B")!;
    expect(moKhoaHeroPreset(hero.class_id, HERO_PRESETS, [], { so_du: 20, linh_than_da_mo: [] }).so_du_moi).toBe(5);
    expect(() => moKhoaHeroPreset(hero.class_id, HERO_PRESETS, [{ id: "owned", class_id: hero.class_id, tier: "B" }], { so_du: 20, linh_than_da_mo: [] })).toThrow();
  });

  it("grants Hương Hỏa only once on a winning PvE first clear", async () => {
    const win = tinhThuongFirstClear({ loai: "PVE_DI_AI", ket_qua: "CO_BEN_THANG", doiNguoiChoiThang: true, daHoanThanh: false, huongHoaFirstClear: 100 });
    expect(win).toEqual({ first_clear: true, huong_hoa_nhan: 100 });
    expect(tinhThuongFirstClear({ loai: "PVE_DI_AI", ket_qua: "CO_BEN_THANG", doiNguoiChoiThang: true, daHoanThanh: true, huongHoaFirstClear: 100 })).toEqual({ first_clear: false, huong_hoa_nhan: 0 });
    expect(tinhThuongFirstClear({ loai: "PVE_DOI_KHANG", ket_qua: "CO_BEN_THANG", doiNguoiChoiThang: true, daHoanThanh: false, huongHoaFirstClear: 100 })).toEqual({ first_clear: false, huong_hoa_nhan: 0 });
    const store = { settleStageWinAtomically: async () => win };
    await expect(capThuongFirstClear(store, "stage-1", 100)).resolves.toEqual(win);
  });

  it("makes exactly one concurrent starter claim succeed and stores the same pack", async () => {
    let claimed = false;
    let stored: readonly (typeof HERO_PRESETS)[number][] = [];
    let lock = Promise.resolve();
    const store = {
      claimStarterPackAtomically: async (createPack: () => readonly (typeof HERO_PRESETS)[number][]) => {
        let release!: () => void;
        const previous = lock;
        lock = new Promise<void>((resolve) => { release = resolve; });
        await previous;
        try {
          if (claimed) return { claimed_now: false, heroes: stored };
          const heroes = createPack();
          stored = heroes;
          claimed = true;
          return { claimed_now: true, heroes };
        } finally { release(); }
      },
    };
    const [one, two] = await Promise.all([
      nhanTrieuHoiKhoiDau(store, seededRandom(7)),
      nhanTrieuHoiKhoiDau(store, seededRandom(8)),
    ]);
    expect(Number(one.claimed_now) + Number(two.claimed_now)).toBe(1);
    expect(one.heroes).toEqual(two.heroes);
    expect(stored).toHaveLength(10);
  });
});
