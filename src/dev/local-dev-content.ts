import { PLAYABLE_CLASSES, DEFAULT_ALLOCATION, type ClassContent } from "../content/demo-content.js";
import { validateEffect, validateSkill, validateActorInput } from "../engine/validation.js";
import type { DauVaoNhanVat } from "../engine/types.js";

const STORAGE_KEY = "dau-truong-nhan-vat-dev-content-v1";
const VERSION_KEY = "dau-truong-nhan-vat-dev-content-version";
let contentVersion = 1;

export function loadDevContentOverrides(): void {
  if (typeof localStorage === "undefined") return;
  try {
    contentVersion = Math.max(1, Number(localStorage.getItem(VERSION_KEY)) || 1);
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as ClassContent[];
    for (const draft of parsed) applyDraft(draft);
  } catch {
    // Invalid local draft is ignored; shipped content remains the fallback.
  }
}

export function getDevContentVersion(): number { return contentVersion; }

export function saveDevClassDraft(draft: ClassContent): number {
  validateDraft(draft);
  applyDraft({ ...structuredClone(draft), content_status: "DEV_DRAFT" });
  if (typeof localStorage !== "undefined") {
    const allDrafts = PLAYABLE_CLASSES.filter((item) => item.content_status === "DEV_DRAFT");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allDrafts));
    contentVersion++;
    localStorage.setItem(VERSION_KEY, String(contentVersion));
  } else contentVersion++;
  return contentVersion;
}

function applyDraft(draft: ClassContent): void {
  const target = PLAYABLE_CLASSES.find((item) => item.class_id === draft.class_id);
  if (target) Object.assign(target, structuredClone(draft));
}

function validateDraft(content: ClassContent): void {
  const stats = Object.values(content.stats);
  if (stats.some((value) => !Number.isInteger(value) || value < 0) || content.stats.spd_nen <= 0) throw new Error("Chỉ số nền phải là số nguyên không âm; SPD phải lớn hơn 0.");
  if (!content.class_id || !content.class_ma || !content.ten_class.trim()) throw new Error("Class cần có mã và tên hiển thị.");
  if (content.skills.length < 1 || content.skills.some((skill) => skill.class_id !== content.class_id)) throw new Error("Class cần có skill hợp lệ thuộc đúng Class.");
  if (new Set(content.skills.map((skill) => skill.id)).size !== content.skills.length) throw new Error("Mã skill trong Class không được trùng.");
  for (const skill of content.skills) validateSkill(skill, content.class_id);
  if (content.passive.danh_sach_hieu_ung.length < 1 || content.passive.danh_sach_hieu_ung.length > 2) throw new Error("Nội tại cần có từ 1 đến 2 effect.");
  for (const effect of content.passive.danh_sach_hieu_ung) {
    validateEffect(effect, content.passive.kich_hoat === "BAT_DAU_TRAN" ? "PASSIVE_BAT_DAU_TRAN" : "PASSIVE");
    if (["MOT_DICH", "MOT_DONG_DOI"].includes(effect.doi_tuong)) throw new Error("Nội tại không được yêu cầu chọn mục tiêu bằng tay.");
  }
  const testActor: DauVaoNhanVat = {
    nhan_vat_id: null, nguoi_choi_id: null, ten_hien_thi: content.ten_co_dinh ?? content.ten_class,
    class_id: content.class_id, class_ma: content.class_ma, ten_class: content.ten_class,
    phan_loai: content.phan_loai, la_hero_preset: content.la_hero_preset,
    ten_co_dinh: content.ten_co_dinh, ngoai_hinh_co_dinh: {}, chi_so_nen: content.stats,
    tier: content.tier ?? "B", tier_seed: content.tier_seed,
    phan_bo_diem: { ...DEFAULT_ALLOCATION }, ky_nang: content.skills.slice(0, 4),
    noi_tai: content.passive, dieu_khien: "NGUOI_CHOI",
  };
  validateActorInput(testActor);
}

