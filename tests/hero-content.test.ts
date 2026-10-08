import { describe, expect, it } from "vitest";
import { HERO_PRESETS, LINH_THAN_PRESETS } from "../src/engine/progression.js";
import { validateEffect, validateLinhThanPublication, validateSkill } from "../src/engine/validation.js";
import { tinhChiSoCuoi } from "../src/engine/stats.js";
import { HERO_CLASSES, LINH_THAN_CLASSES, ARCHETYPE_BASELINES } from "../src/content/demo-content.js";

describe("Owner roster content", () => {
  it("contains exactly 19 gacha Heroes and four SSS Linh Thần", () => {
    expect(HERO_PRESETS.map((item) => [item.ten_co_dinh, item.tier])).toEqual([
      ["Thánh Gióng", "SS"], ["Thạch Sanh", "SS"], ["Chử Đồng Tử", "SS"],
      ["An Dương Vương", "S"], ["Hùng Vương", "S"], ["Tấm", "S"], ["Chú Cuội", "S"], ["Cóc", "S"], ["Ông Táo", "S"],
      ["Mỵ Châu", "A"], ["Trọng Thủy", "A"], ["Tiên Dung", "A"], ["Sọ Dừa", "A"], ["Mai An Tiêm", "A"], ["Lang Liêu", "A"], ["Anh Khoai", "A"],
      ["Cậu Bé Thông Minh", "B"], ["Trạng Quỳnh", "B"], ["Nàng Tô Thị", "B"],
    ]);
    expect(LINH_THAN_PRESETS.map((item) => item.ten_co_dinh)).toEqual(["Lạc Long Quân", "Âu Cơ", "Sơn Tinh", "Thủy Tinh"]);
    expect(new Set([...HERO_CLASSES, ...LINH_THAN_CLASSES].map((item) => item.class_id)).size).toBe(23);
    expect(HERO_CLASSES.every((item) => item.la_hero_preset)).toBe(true);
    expect(LINH_THAN_CLASSES.every((item) => item.tier === "SSS" && item.class_id.startsWith("linh-than-"))).toBe(true);
  });

  it("validates all six official skills and each passive through the closed effect registry", () => {
    const kitSignatures = new Set<string>();
    for (const hero of [...HERO_CLASSES, ...LINH_THAN_CLASSES]) {
      expect(hero.content_status).toBe("CONTENT_OFFICIAL");
      expect(hero.skills).toHaveLength(6);
      expect(new Set(hero.skills.map((skill) => skill.ten_hien_thi)).size).toBe(6);
      expect(hero.skills.map((skill) => skill.id).length).toBe(6);
      const signature = JSON.stringify([hero.skills.map((skill) => skill.danh_sach_hieu_ung), hero.passive.danh_sach_hieu_ung]);
      expect(kitSignatures.has(signature), hero.ten_class).toBe(false);
      kitSignatures.add(signature);
      for (const skill of hero.skills) {
        expect(() => validateSkill(skill, hero.class_id)).not.toThrow();
        for (const effect of skill.danh_sach_hieu_ung) expect(() => validateEffect(effect)).not.toThrow();
      }
      for (const effect of hero.passive.danh_sach_hieu_ung) expect(["BAN_THAN", "TAT_CA_DONG_DOI", "NGAU_NHIEN_N_DICH"]).toContain(effect.doi_tuong);
      if (hero.phan_loai === "LINH_THAN") {
        expect(hero.la_hero_preset).toBe(false);
        expect(hero.passive.dac_trung_rieng || hero.skills.some((skill) => skill.dac_trung_rieng)).toBe(true);
        expect(() => validateLinhThanPublication({ class_id: hero.class_id, trang_thai: "HOAT_DONG", ky_nang_hoat_dong: hero.skills, noi_tai: hero.passive })).not.toThrow();
      }
    }
  });

  it("uses archetype baselines and leaves tier scaling to the existing engine", () => {
    for (const hero of [...HERO_CLASSES, ...LINH_THAN_CLASSES]) expect(hero.stats).toEqual(ARCHETYPE_BASELINES[hero.archetype]);
    const input = { hp_nen: 300, atk_nen: 100, def_nen: 50, spd_nen: 100, mp_nen: 60, mp_hoi_moi_luot: 6 };
    const allocation = { hp: 0, atk: 0, def: 0, spd: 0, mp: 0, mp_hoi: 0 };
    const b = tinhChiSoCuoi(input, allocation, "B", "TU_DO").chi_so_cuoi;
    const sss = tinhChiSoCuoi(input, allocation, "SSS", "TU_DO").chi_so_cuoi;
    expect(sss).toEqual({ hp: 366, atk: 122, def: 61, spd: b.spd, mp: b.mp, mp_hoi: b.mp_hoi });
  });
});
