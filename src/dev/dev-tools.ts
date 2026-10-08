import { HERO_PRESETS, LINH_THAN_PRESETS, moKhoaHeroPreset, moKhoaLinhThan, rollStarterPack, tinhThuongFirstClear, validateEffect, validateSkill } from "../engine/index.js";
import { nextFloat } from "../engine/rng.js";
import { REGISTRY_19 } from "../engine/registry.js";
import type { ClassContent } from "../content/demo-content.js";
import type { HieuUngCauHinh } from "../engine/types.js";

const DEV_SAVE_KEY = "dtnv-dev-progression-lab-v1";
export type Guardrail = { level: "GREEN" | "YELLOW" | "RED"; title: string; detail: string };
export type DevProgress = { wallet: number; cleared: string[]; owned: string[] };
export type GachaRun = { seed: number; heroes: ReturnType<typeof rollStarterPack> };

export function validateDevContent(content: ClassContent): Guardrail[] {
  const findings: Guardrail[] = [];
  try {
    if (!content.class_id || !content.class_ma || !content.ten_class.trim()) throw new Error("Nhân vật cần class ID, class code và tên hiển thị.");
    if (Object.values(content.stats).some((value) => !Number.isInteger(value) || value < 0) || content.stats.spd_nen <= 0) throw new Error("Stats phải là số nguyên không âm; SPD phải lớn hơn 0.");
    if (!content.skills.length || new Set(content.skills.map((skill) => skill.id)).size !== content.skills.length) throw new Error("Cần skill và ID skill không trùng nhau.");
    for (const skill of content.skills) validateSkill(skill, content.class_id);
    if (content.passive.danh_sach_hieu_ung.length < 1 || content.passive.danh_sach_hieu_ung.length > 2) throw new Error("Nội tại cần 1–2 effect theo contract hiện tại.");
    for (const effect of content.passive.danh_sach_hieu_ung) validateEffect(effect, content.passive.kich_hoat === "BAT_DAU_TRAN" ? "PASSIVE_BAT_DAU_TRAN" : "PASSIVE");
    if (content.passive.danh_sach_hieu_ung.some((effect) => effect.doi_tuong === "MOT_DICH" || effect.doi_tuong === "MOT_DONG_DOI")) throw new Error("Nội tại không thể yêu cầu chọn target bằng tay.");
  } catch (error) {
    findings.push({ level: "RED", title: "Không hợp lệ với Engine", detail: error instanceof Error ? error.message : "Content không hợp lệ." });
    return findings;
  }
  for (const skill of content.skills) {
    const effectCount = skill.danh_sach_hieu_ung.length;
    if (effectCount >= 4) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: nhiều effect`, detail: `${effectCount} effect trong một action; kiểm tra tổng sức mạnh và độ dễ hiểu.` });
    if (skill.chi_phi_mp === 0 && skill.hoi_chieu_luot === 0 && effectCount > 1) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: dùng lặp không tốn tài nguyên`, detail: "MP cost và cooldown đều bằng 0 với nhiều effect; vẫn lưu/test được, cần chủ động rà balance." });
    else if (skill.chi_phi_mp <= 10 && skill.hoi_chieu_luot <= 1 && effectCount >= 3) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: sức mạnh cao so với cost/cooldown`, detail: "Nhiều effect với MP cost/cooldown thấp; cảnh báo tham khảo, không chặn lưu draft." });
    const repeated = skill.danh_sach_hieu_ung.map((effect) => effect.ma_hieu_ung).filter((code, index, list) => list.indexOf(code) !== index);
    if (repeated.length) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: effect lặp`, detail: `Lặp ${[...new Set(repeated)].map((code) => REGISTRY_19[code].ten_hien_thi).join(", ")}; kiểm tra stacking và thứ tự.` });
    for (const effect of skill.danh_sach_hieu_ung) {
      const p = effect.tham_so;
      const damage = effect.ma_hieu_ung === "EFF_DMG_DIRECT" || effect.ma_hieu_ung === "EFF_DMG_TRUE" || effect.ma_hieu_ung === "EFF_DMG_AOE";
      if (damage && p.he_so >= 2) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: hệ số sát thương cao`, detail: `${REGISTRY_19[effect.ma_hieu_ung].ten_hien_thi} dùng hệ số ${p.he_so}. Đây là cảnh báo cân bằng, không thay đổi công thức Engine.` });
      if ((effect.ma_hieu_ung === "EFF_STUN" || effect.ma_hieu_ung === "EFF_SILENCE" || effect.ma_hieu_ung === "EFF_ROOT") && p.so_luot >= 2) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: CC khóa tối đa`, detail: `Thời lượng ${p.so_luot} lượt; Engine cho phép nhưng nên kiểm thử kỹ tương tác B1.` });
      if (effect.ma_hieu_ung === "EFF_SLOW" && p.phan_tram_giam >= 0.5) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: giảm tốc mạnh`, detail: `Slow ${Math.round(p.phan_tram_giam * 100)}%; đây là cảnh báo balance.` });
      if (effect.ma_hieu_ung === "EFF_SHIELD" && p.luong_hap_thu > content.stats.hp_nen) findings.push({ level: "YELLOW", title: `${skill.ten_hien_thi}: khiên lớn hơn HP nền`, detail: `${p.luong_hap_thu} khiên trên ${content.stats.hp_nen} HP nền.` });
    }
  }
  return findings.length ? findings : [{ level: "GREEN", title: "Không có cảnh báo", detail: "Content hợp lệ theo Engine; GREEN không phải xác nhận balance." }];
}

export function describeEffect(effect: HieuUngCauHinh): string {
  const name = REGISTRY_19[effect.ma_hieu_ung].ten_hien_thi;
  const params = Object.entries(effect.tham_so).map(([key, value]) => `${key} ${value}`).join(" · ");
  return `${name}${params ? ` (${params})` : ""} → ${effect.doi_tuong.replaceAll("_", " ")}`;
}

export function loadDevProgress(): DevProgress {
  try {
    const raw = typeof localStorage === "undefined" ? null : localStorage.getItem(DEV_SAVE_KEY);
    const value = raw ? JSON.parse(raw) as DevProgress : null;
    if (value && Number.isInteger(value.wallet) && Array.isArray(value.cleared) && Array.isArray(value.owned)) return value;
  } catch { /* Start with an empty isolated test wallet. */ }
  return { wallet: 0, cleared: [], owned: [] };
}

export function updateDevProgress(update: (current: DevProgress) => DevProgress): DevProgress {
  const next = update(structuredClone(loadDevProgress()));
  if (!Number.isInteger(next.wallet) || next.wallet < 0) throw new Error("Hương Hỏa test phải là số nguyên không âm.");
  if (typeof localStorage !== "undefined") localStorage.setItem(DEV_SAVE_KEY, JSON.stringify(next));
  return next;
}

export function grantDevClear(stageId: string, reward: number): { progress: DevProgress; firstClear: boolean; amount: number } {
  let firstClear = false;
  let amount = 0;
  const progress = updateDevProgress((current) => {
    const result = tinhThuongFirstClear({ loai: "PVE_DI_AI", ket_qua: "CO_BEN_THANG", doiNguoiChoiThang: true, daHoanThanh: current.cleared.includes(stageId), huongHoaFirstClear: reward });
    firstClear = result.first_clear;
    amount = result.huong_hoa_nhan;
    return firstClear ? { ...current, wallet: current.wallet + amount, cleared: [...current.cleared, stageId] } : current;
  });
  return { progress, firstClear, amount };
}

export function unlockDevContent(classId: string): DevProgress {
  return updateDevProgress((current) => {
    const owned = current.owned.map((id) => ({ id, class_id: id, tier: HERO_PRESETS.find((hero) => hero.class_id === id)?.tier ?? "SSS" as const }));
    if (current.owned.includes(classId)) return current;
    const god = LINH_THAN_PRESETS.some((item) => item.class_id === classId);
    const result = god ? moKhoaLinhThan(classId, owned, { so_du: current.wallet, linh_than_da_mo: current.owned.filter((id) => LINH_THAN_PRESETS.some((item) => item.class_id === id)) }) : moKhoaHeroPreset(classId, HERO_PRESETS, owned, { so_du: current.wallet, linh_than_da_mo: [] });
    return { wallet: result.so_du_moi, cleared: current.cleared, owned: [...current.owned, classId] };
  });
}

export function runDevGacha(seed: number, count = 1): GachaRun[] {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffff_ffff || !Number.isInteger(count) || count < 1 || count > 100) throw new Error("Seed phải là uint32; số seed là 1–100.");
  return Array.from({ length: count }, (_, offset) => {
    let state = (seed + offset) >>> 0;
    const heroes = rollStarterPack(() => { const result = nextFloat(state); state = result.state; return result.value; });
    return { seed: (seed + offset) >>> 0, heroes };
  });
}

