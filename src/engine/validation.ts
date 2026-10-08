import { CC_KHOA } from "./constants.js";
import { REGISTRY_19 } from "./registry.js";
import { phanBoHopLeVaoTran } from "./stats.js";
import type {
  ActorContentSnapshot,
  DauVaoNhanVat,
  HieuUngCauHinh,
  KyNangSnapshot,
  PhanBoDiem,
  Tier,
} from "./types.js";

export class LoiLuatEngine extends Error {
  constructor(readonly ma: string, message: string) {
    super(message);
    this.name = "LoiLuatEngine";
  }
}

const TIERS: Tier[] = ["C", "B", "A", "S", "SS", "SSS"];
const TARGETS = new Set(["BAN_THAN", "MOT_DICH", "TAT_CA_DICH", "MOT_DONG_DOI", "TAT_CA_DONG_DOI", "NGAU_NHIEN_N_DICH"]);

export function validatePhanBo(phan_bo: PhanBoDiem, allowLegacy = false): void {
  if (!phan_bo || typeof phan_bo !== "object") throw new LoiLuatEngine("PHAN_BO_DIEM_KHONG_HOP_LE", "Thiếu phân bổ điểm.");
  if (!phanBoHopLeVaoTran(phan_bo) || (!allowLegacy && Object.values(phan_bo).reduce((a, b) => a + b, 0) !== 5)) {
    throw new LoiLuatEngine("PHAN_BO_DIEM_KHONG_HOP_LE", "Phân bổ phải là số nguyên 0–2 mỗi chỉ số và tổng bằng 5 (hoặc 0 với nhân vật legacy).");
  }
}

export function validateEffect(effect: HieuUngCauHinh, context: "SKILL" | "PASSIVE" | "PASSIVE_BAT_DAU_TRAN" = "SKILL"): void {
  if (!effect || typeof effect !== "object" || !effect.tham_so || typeof effect.tham_so !== "object" || Array.isArray(effect.tham_so)) {
    throw new LoiLuatEngine("EFFECT_PAYLOAD_KHONG_HOP_LE", "Effect phải có mã và object tham_so hợp lệ.");
  }
  const def = REGISTRY_19[effect.ma_hieu_ung];
  if (!def) throw new LoiLuatEngine("EFFECT_KHONG_TON_TAI", `Hiệu ứng ${effect.ma_hieu_ung} không có trong registry.`);
  if (!TARGETS.has(effect.doi_tuong)) throw new LoiLuatEngine("TARGET_KHONG_HOP_LE", "Đối tượng hiệu ứng không hợp lệ.");
  const timingAllowed = effect.thoi_diem === "KHI_THI_TRIEN" || (context === "PASSIVE_BAT_DAU_TRAN" && effect.thoi_diem === "BI_DONG_DAU_TRAN");
  if (!def.thoi_diem_kha_dung.includes(effect.thoi_diem) || !timingAllowed) {
    const message = context === "SKILL" ? "Skill chỉ hỗ trợ KHI_THI_TRIEN." : context === "PASSIVE_BAT_DAU_TRAN" ? "Nội tại BAT_DAU_TRAN chỉ hỗ trợ KHI_THI_TRIEN hoặc BI_DONG_DAU_TRAN." : "Nội tại không hỗ trợ BI_DONG_DAU_TRAN nếu trigger không phải BAT_DAU_TRAN.";
    throw new LoiLuatEngine("THOI_DIEM_KHONG_HO_TRO", message);
  }
  const expected = new Map(def.tham_so_schema.map((parameter) => [parameter.ten, parameter.kieu]));
  for (const [key, value] of Object.entries(effect.tham_so)) {
    if (!expected.has(key)) throw new LoiLuatEngine("THAM_SO_KHONG_DUOC_KHAI_BAO", `${effect.ma_hieu_ung}.${key} không có trong schema registry.`);
    const kind = expected.get(key);
    if (!Number.isFinite(value) || value < 0 || (kind === "int" && !Number.isInteger(value))) {
      throw new LoiLuatEngine("THAM_SO_KHONG_HOP_LE", `${effect.ma_hieu_ung}.${key} phải là ${kind === "int" ? "số nguyên" : "số hữu hạn"} không âm.`);
    }
  }
  for (const key of expected.keys()) {
    if (!(key in effect.tham_so)) throw new LoiLuatEngine("THAM_SO_THIEU", `${effect.ma_hieu_ung}.${key} là tham số bắt buộc.`);
  }
  if ("so_luot" in effect.tham_so && (!Number.isInteger(effect.tham_so.so_luot) || effect.tham_so.so_luot < 1)) {
    throw new LoiLuatEngine("THOI_LUONG_KHONG_HOP_LE", "so_luot phải là số nguyên dương.");
  }
  if (CC_KHOA.has(effect.ma_hieu_ung)) {
    if (effect.tham_so.so_luot > 2 || !["MOT_DICH", "NGAU_NHIEN_N_DICH"].includes(effect.doi_tuong)) {
      throw new LoiLuatEngine("CC_KHONG_HOP_LE", "STUN/SILENCE/ROOT tối đa 2 lượt và chỉ được nhắm MOT_DICH hoặc NGAU_NHIEN_N_DICH.");
    }
  }
  if (effect.ma_hieu_ung === "EFF_SLOW" && effect.tham_so.phan_tram_giam > 1) {
    throw new LoiLuatEngine("SLOW_KHONG_HOP_LE", "phan_tram_giam không được vượt 1.");
  }
  if (effect.ma_hieu_ung === "EFF_LIFESTEAL" && effect.tham_so.phan_tram_hoi > 1) {
    throw new LoiLuatEngine("LIFESTEAL_KHONG_HOP_LE", "phan_tram_hoi không được vượt 1.");
  }
  if (effect.ma_hieu_ung === "EFF_CLEANSE" || effect.ma_hieu_ung === "EFF_DISPEL") {
    if (!Number.isInteger(effect.tham_so.so_luong_go)) throw new LoiLuatEngine("SO_LUONG_GO_KHONG_HOP_LE", "so_luong_go phải là số nguyên.");
  }
}

export function validateSkill(skill: KyNangSnapshot, classId: string): void {
  if (!skill || typeof skill !== "object" || !Array.isArray(skill.danh_sach_hieu_ung)) throw new LoiLuatEngine("SKILL_PAYLOAD_KHONG_HOP_LE", "Skill phải có danh sách effect dạng mảng.");
  if (!skill.id || skill.class_id !== classId) throw new LoiLuatEngine("SKILL_SAI_CLASS", "Skill phải thuộc đúng Class của actor.");
  if (!Number.isInteger(skill.hoi_chieu_luot) || skill.hoi_chieu_luot < 0 || !Number.isInteger(skill.chi_phi_mp) || skill.chi_phi_mp < 0) {
    throw new LoiLuatEngine("SKILL_COST_KHONG_HOP_LE", "MP cost và cooldown phải là số nguyên không âm.");
  }
  if (!skill.danh_sach_hieu_ung.length) throw new LoiLuatEngine("SKILL_RONG", "Skill phải có ít nhất một effect.");
  for (const effect of skill.danh_sach_hieu_ung) validateEffect(effect);
  const targetSelectors = new Set(skill.danh_sach_hieu_ung.filter((e) => e.doi_tuong === "MOT_DICH" || e.doi_tuong === "MOT_DONG_DOI").map((e) => e.doi_tuong));
  if (targetSelectors.size > 1) throw new LoiLuatEngine("NHIEU_TARGET_SELECTOR", "Một skill không được yêu cầu hai target_actor_id khác loại.");
}

export function validateActorInput(input: DauVaoNhanVat): void {
  if (!input || typeof input !== "object" || !input.chi_so_nen || !input.phan_bo_diem || !input.noi_tai || !Array.isArray(input.ky_nang)) {
    throw new LoiLuatEngine("ACTOR_PAYLOAD_KHONG_HOP_LE", "Actor thiếu dữ liệu Class, stats, phân bổ, passive hoặc loadout.");
  }
  if (!TIERS.includes(input.tier)) throw new LoiLuatEngine("TIER_KHONG_HOP_LE", "Tier không hợp lệ.");
  if (input.phan_loai === "LINH_THAN") {
    if (input.tier !== "SSS") throw new LoiLuatEngine("LINH_THAN_SAI_TIER", "Linh Thần luôn có tier SSS.");
    if (!input.ten_co_dinh || input.ten_hien_thi !== input.ten_co_dinh) throw new LoiLuatEngine("TEN_LINH_THAN_SAI", "Tên hiển thị Linh Thần phải lấy từ tên cố định.");
  } else if (input.dieu_khien === "AI") {
    if (input.tier === "SSS") throw new LoiLuatEngine("TIER_AI_THUONG_KHONG_HOP_LE", "AI Class THUONG nhận C/B/A/S/SS; SSS chỉ dành cho Linh Thần.");
  } else if (input.tier === "SSS" || input.tier === "C" || (input.tier === "SS" && !input.la_hero_preset)) {
    throw new LoiLuatEngine("TIER_THUONG_KHONG_HOP_LE", "Nhân vật THUONG tự tạo chỉ nhận B/A/S; SS chỉ dành cho Hero preset.");
  }
  if (input.la_hero_preset) {
    if (!input.ten_co_dinh || input.ten_hien_thi !== input.ten_co_dinh) throw new LoiLuatEngine("TEN_HERO_SAI", "Tên Hero preset phải lấy từ tên cố định.");
    if (!input.tier_seed || input.tier !== input.tier_seed) throw new LoiLuatEngine("TIER_HERO_SAI", "Tier Hero phải khớp tier seed cố định.");
  }
  validatePhanBo(input.phan_bo_diem, true);
  if (input.chi_so_nen.spd_nen <= 0) throw new LoiLuatEngine("SPD_KHONG_HOP_LE", "SPD nền phải lớn hơn 0.");
  for (const value of Object.values(input.chi_so_nen)) {
    if (!Number.isInteger(value) || value < 0) throw new LoiLuatEngine("CHI_SO_NEN_KHONG_HOP_LE", "Chỉ số nền phải là số nguyên không âm.");
  }
  if (!input.ky_nang.length || input.ky_nang.length > 4) throw new LoiLuatEngine("LOADOUT_KHONG_HOP_LE", "Actor cần từ 1 đến 4 skill.");
  if (new Set(input.ky_nang.map((s) => s.id)).size !== input.ky_nang.length) throw new LoiLuatEngine("SKILL_TRUNG", "Loadout không được có skill trùng.");
  for (const skill of input.ky_nang) validateSkill(skill, input.class_id);
}

export function validateLinhThanPublication(input: {
  class_id: string;
  trang_thai: "HOAT_DONG" | "AN";
  ky_nang_hoat_dong: KyNangSnapshot[];
  noi_tai: ActorContentSnapshot["noi_tai"];
}): void {
  if (input.trang_thai !== "HOAT_DONG") return;
  if (input.ky_nang_hoat_dong.filter((skill) => skill.class_id === input.class_id && skill.trang_thai === "HOAT_DONG").length < 4) {
    throw new LoiLuatEngine("LINH_THAN_THIEU_SKILL", "Linh Thần hoạt động cần tối thiểu 4 skill hoạt động.");
  }
  if (!input.ky_nang_hoat_dong.some((skill) => skill.class_id === input.class_id && skill.trang_thai === "HOAT_DONG" && skill.dac_trung_rieng) && !input.noi_tai.dac_trung_rieng) {
    throw new LoiLuatEngine("LINH_THAN_THIEU_DAC_TRUNG", "Linh Thần cần ít nhất một skill hoặc Nội tại có dac_trung_rieng=true.");
  }
}

export function validateSnapshotContent(content: ActorContentSnapshot): void {
  const synthetic: DauVaoNhanVat = {
    nhan_vat_id: null, nguoi_choi_id: null, ten_hien_thi: content.ten_co_dinh ?? content.ten_class, class_id: content.class_id,
    class_ma: content.class_ma, ten_class: content.ten_class, phan_loai: content.phan_loai,
    la_hero_preset: content.la_hero_preset, chi_so_nen: content.chi_so_nen, tier: content.tier,
    ten_co_dinh: content.ten_co_dinh,
    tier_seed: content.tier_seed,
    phan_bo_diem: content.phan_bo_diem, ky_nang: content.ky_nang, noi_tai: content.noi_tai,
    // Content snapshots are control-neutral. C/SS ordinary AI tiers are valid
    // in the same snapshot model, while concrete player inputs are checked above.
    dieu_khien: content.tier === "C" || (content.tier === "SS" && !content.la_hero_preset) ? "AI" : "NGUOI_CHOI",
  };
  validateActorInput(synthetic);
  if (content.noi_tai.danh_sach_hieu_ung.length < 1 || content.noi_tai.danh_sach_hieu_ung.length > 2) {
    throw new LoiLuatEngine("PASSIVE_KHONG_HOP_LE", "Nội tại cần 1–2 effect.");
  }
  for (const effect of content.noi_tai.danh_sach_hieu_ung) {
    validateEffect(effect, content.noi_tai.kich_hoat === "BAT_DAU_TRAN" ? "PASSIVE_BAT_DAU_TRAN" : "PASSIVE");
    if (["MOT_DICH", "MOT_DONG_DOI"].includes(effect.doi_tuong)) throw new LoiLuatEngine("PASSIVE_TARGET_KHONG_HOP_LE", "Nội tại không được yêu cầu target chọn tay.");
  }
}
