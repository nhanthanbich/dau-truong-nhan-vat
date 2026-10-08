import { DANH_SACH_19_MA, HERO_PRESETS, REGISTRY_19, luaChonHopLe } from "../engine/index.js";
import { CLASS_CONTENT } from "../content/demo-content.js";
import type { ClassContent } from "../content/demo-content.js";
import type { DoiTuong, HieuUngCauHinh, MaHieuUng, ThoiDiem, Tier, TranDau } from "../engine/types.js";
import { DevSandboxRuntime, type SandboxActorSetup } from "../runtime/dev-sandbox-runtime.js";
import { getDevContentVersion, saveDevClassDraft } from "./local-dev-content.js";
import { CC_KHOA } from "../engine/constants.js";
import { describeEffect, grantDevClear, loadDevProgress, runDevGacha, unlockDevContent, updateDevProgress, validateDevContent, type GachaRun, type Guardrail } from "./dev-tools.js";

type Tab = "home" | "content" | "effects" | "sandbox" | "progression";
const sandbox = new DevSandboxRuntime();
const allClasses: ClassContent[] = [...CLASS_CONTENT.heroes, ...CLASS_CONTENT.linh_than];
let tab: Tab = "home";
let message = "";
let selectedTarget = "";
let editorClassId = CLASS_CONTENT.heroes[0]!.class_id;
let editorSkillIndex = 0;
let editorDraft: ClassContent = structuredClone(CLASS_CONTENT.heroes[0]!);
let batchReport: AiBatchReport | null = null;
let gachaRuns: GachaRun[] = [];
let progressionMessage = "";
const targets: DoiTuong[] = ["BAN_THAN", "MOT_DICH", "TAT_CA_DICH", "MOT_DONG_DOI", "TAT_CA_DONG_DOI", "NGAU_NHIEN_N_DICH"];
const glyph: Record<string, string> = { SAT_THUONG: "⚔", KHONG_CHE: "⛓", BUFF: "✦", DEBUFF: "⌁", HOI_PHUC: "♡", TIEN_ICH: "✧" };
const esc = (value: unknown): string => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type AiBatchReport = { matches: number; startSeed: number; winsA: number; winsB: number; draws: number; averageActions: number; decisionDensity: number; forcedPassRate: number; ccLockRate: number; deadBeforeActing: number; comebackRate: number; focusFireRate: number; spdSnowballRate: number; skillUse: Record<string, number> };

export function renderDevPanel(contentVersion = 1): string {
  const match = sandbox.current();
  const tabs: [Tab, string, string][] = [["home", "⌂", "Tổng quan"], ["content", "♙", "Nội dung"], ["effects", "✧", "Thư viện effect"], ["sandbox", "⚔", "Sandbox"], ["progression", "◇", "Gacha & tiến trình"]];
  let body = "";
  if (tab === "home") body = `<section class="dev-welcome"><span class="dev-kicker">CÔNG CỤ PHÁT TRIỂN · LOCAL ONLY</span><h1>Dev Workbench</h1><p>Môi trường thử nghiệm tách khỏi tiến trình người chơi. Các trận kiểm tra dùng cùng Shared Combat Engine.</p><div class="dev-metric-grid"><article><span>Phiên nội dung</span><b>LOCAL · v${contentVersion}</b></article><article><span>Class / nhân vật</span><b>${allClasses.length}</b></article><article><span>Effect registry</span><b>${DANH_SACH_19_MA.length} / 19</b></article><article><span>Sandbox đang lưu</span><b>${match ? "Có trận" : "Không có"}</b></article></div><div class="dev-warning">⚠ DEV LOCAL không có xác thực server. Không dùng để bảo vệ nội dung hay dữ liệu production.</div></section><div class="dev-quick-grid"><button data-dev-tab="content"><b>♙</b><span>Kiểm tra Hero & Class</span><small>Tier, loại, ngoại hình, kỹ năng, Nội tại, trạng thái content</small></button><button data-dev-tab="effects"><b>✧</b><span>Thư viện 19 effect</span><small>Tham số, nhóm, target và thời điểm hỗ trợ</small></button><button data-dev-tab="sandbox"><b>⚔</b><span>Mở Battle Sandbox</span><small>Dựng đội, seed, từng lượt và combat log</small></button><button data-dev-tab="progression"><b>◇</b><span>Gacha & tiến trình</span><small>Công cụ test đang được xếp vào Phase 2</small></button></div>`;
  if (tab === "content") body = `<header class="dev-page-heading"><div><span class="dev-kicker">CONTENT INSPECTOR</span><h1>Hero & Class</h1><p>23 Hero có kit và stat chính thức. Nghệ thuật đang dùng placeholder; bản lưu từ editor được đánh dấu DEV_DRAFT.</p></div><span class="dev-count">${allClasses.length} hồ sơ</span></header>${renderClassEditor()}<div class="dev-content-grid">${allClasses.map((item) => {
    const state = item.content_status;
    return `<article class="dev-content-card"><div class="dev-content-top"><span class="dev-tier dev-tier-${item.tier ?? "-"}">${item.tier}</span><span class="dev-content-state ${state === "CONTENT_OFFICIAL" ? "official" : "pending"}">${state}</span></div><h2>${esc(item.ten_co_dinh ?? item.ten_class)}</h2><p>${esc(item.phan_loai)} · ${esc(item.archetype)} · <code>la_hero_preset=${item.la_hero_preset}</code></p><p class="dev-content-art">▧ Ngoại hình: ${esc(String(item.ten_co_dinh ?? item.ten_class))} · ${item.appearance_status}</p><p>HP ${item.stats.hp_nen} · ATK ${item.stats.atk_nen} · DEF ${item.stats.def_nen} · SPD ${item.stats.spd_nen} · MP ${item.stats.mp_nen} · hồi ${item.stats.mp_hoi_moi_luot}</p><details><summary>Skill (${item.skills.length}) & Nội tại</summary><ul>${item.skills.map((skill) => `<li><b>${esc(skill.ten_hien_thi)}</b><small>${skill.danh_sach_hieu_ung.map((effect) => esc(REGISTRY_19[effect.ma_hieu_ung].ten_hien_thi)).join(" · ")}</small></li>`).join("")}</ul><p><b>${esc(item.passive.ten_hien_thi)}</b><small>${esc(item.passive.mo_ta ?? "")} · ${item.passive.kich_hoat} · ${item.passive.danh_sach_hieu_ung.map((effect) => esc(REGISTRY_19[effect.ma_hieu_ung].ten_hien_thi)).join(" · ")}</small></p></details><span class="dev-readonly">${state === "CONTENT_OFFICIAL" ? "Kit và chỉ số chính thức · hình ảnh placeholder" : "Bản nháp DEV LOCAL · không phải content chính thức"}</span></article>`;
  }).join("")}</div>`;
  if (tab === "effects") body = `<header class="dev-page-heading"><div><span class="dev-kicker">EFFECT REGISTRY · READ ONLY</span><h1>Thư viện hiệu ứng</h1><p>Registry đóng của Shared Combat Engine. Panel chỉ đọc định nghĩa, không thêm effect mới.</p></div><span class="dev-count">19 hiệu ứng</span></header><div class="dev-effect-grid">${DANH_SACH_19_MA.map((code) => { const effect = REGISTRY_19[code]; return `<article class="dev-effect-card group-${effect.nhom.toLowerCase()}"><div class="dev-effect-heading"><span>${glyph[effect.nhom]}</span><small>${effect.nhom.replaceAll("_", " ")}</small></div><h2>${esc(effect.ten_hien_thi)}</h2><code>${code}</code><p><b>Tham số</b>${effect.tham_so_schema.map((p) => `<span>${esc(p.ten)} · ${p.kieu}</span>`).join("") || "Không cần tham số"}</p><footer><span>Target: ${effect.doi_tuong_mac_dinh.replaceAll("_", " ")}</span><span>Thời điểm: ${effect.thoi_diem_kha_dung.join(", ")}</span></footer></article>`; }).join("")}</div>`;
  if (tab === "sandbox") body = renderSandbox(match);
  if (tab === "progression") body = renderProgressionLab();
  return `<div class="dev-workbench"><header class="dev-topbar"><a href="?" class="dev-back">← Về game</a><div><span class="dev-status-dot"></span> DEV LOCAL</div><span>Snapshot content · v${getDevContentVersion() || contentVersion}</span></header><div class="dev-layout"><aside class="dev-sidebar"><span class="dev-brand-mark">✦</span><b>WORKBENCH</b><small>GAME OWNER · DEV</small><nav>${tabs.map(([key, icon, label]) => `<button class="${tab === key ? "active" : ""}" data-dev-tab="${key}"><span>${icon}</span>${label}</button>`).join("")}</nav><p>Không có quyền production</p></aside><main class="dev-main">${message ? `<div class="dev-message">${esc(message)}</div>` : ""}${body}</main></div></div>`;
}

function renderProgressionLab(): string {
  const progress = loadDevProgress();
  const heroOptions = [...HERO_PRESETS.map((hero) => ({ id: hero.class_id, name: hero.ten_co_dinh, tier: hero.tier })), ...CLASS_CONTENT.linh_than.map((god) => ({ id: god.class_id, name: god.ten_co_dinh!, tier: "SSS" }))];
  const results = gachaRuns.map((run) => `<details class="dev-gacha-run" open><summary>Seed ${run.seed} · 10 Hero · không trùng · bảo đảm S+ / A+</summary><ol>${run.heroes.map((hero, index) => `<li><b>${index + 1}.</b> <span class="dev-tier">${hero.tier}</span> ${esc(hero.ten_co_dinh)}</li>`).join("")}</ol></details>`).join("");
  return `<header class="dev-page-heading"><div><span class="dev-kicker">ISOLATED DEV DATA · KHÔNG PHẢI PLAYER SAVE</span><h1>Progression Test Lab</h1><p>Gacha dùng seeded PRNG và rule progression dùng chung; wallet/ownership lưu ở khóa dev riêng.</p></div><span class="dev-count">DEV WALLET · ${progress.wallet}</span></header>${progressionMessage ? `<p class="dev-inline-message">${esc(progressionMessage)}</p>` : ""}<div class="dev-progression-grid"><section class="dev-side-config"><header><span>HƯƠNG HỎA ẢO</span><b>${progress.wallet}</b></header><div class="dev-wallet-actions"><button data-dev-action="wallet-10">+10</button><button data-dev-action="wallet-100">+100</button><form id="dev-wallet-form"><label>Đặt số dư<input name="wallet-value" type="number" min="0" step="1" value="${progress.wallet}"/></label><button>Set</button></form><button class="dev-quiet" data-dev-action="reset-progress">Reset Dev Data</button></div><div class="dev-progression-controls"><button data-dev-action="test-first-clear">Mô phỏng thắng first-clear (+100)</button><button data-dev-action="test-replay">Mô phỏng replay (0)</button><label>Hero / Linh Thần<select name="dev-unlock-target">${heroOptions.map((item) => `<option value="${item.id}" ${progress.owned.includes(item.id) ? "disabled" : ""}>${item.tier} · ${esc(item.name)}${progress.owned.includes(item.id) ? " · Đã mở" : ""}</option>`).join("")}</select></label><button data-dev-action="unlock-dev">Test unlock</button></div><small>First-clear và unlock gọi progression rules hiện có nhưng chỉ cập nhật Dev Test Wallet. Reset không tác động save người chơi.</small></section><section class="dev-side-config"><header><span>GACHA TEST · 19 HERO B–SS</span><b>${gachaRuns.length} package</b></header><form id="dev-gacha-form" class="dev-gacha-controls"><label>Seed bắt đầu<input name="gacha-seed" type="number" min="0" max="4294967295" value="20261008"/></label><label>Số seed<input name="gacha-count" type="number" min="1" max="100" value="1"/></label><button class="dev-primary">Chạy gói 10</button><button type="button" data-dev-action="clear-gacha">Xóa kết quả</button></form><small>Package test không claim initial gacha và không ghi progression player.</small>${results}</section></div><section class="dev-side-config dev-wallet-ledger"><header><span>TRẠNG THÁI TIẾN TRÌNH TEST</span><b>${progress.owned.length} unlock</b></header><p>First-clear: ${progress.cleared.length ? progress.cleared.map(esc).join(" · ") : "chưa có"}</p><p>Đã mở: ${progress.owned.length ? progress.owned.map((id) => esc(heroOptions.find((item) => item.id === id)?.name ?? id)).join(" · ") : "chưa có"}</p><small>Test progression không phải acceptance test production; dùng npm test để chạy test tự động.</small></section>`;
}

function renderClassEditor(): string {
  const base = renderClassEditorBase();
  const skill = editorDraft.skills[Math.min(editorSkillIndex, editorDraft.skills.length - 1)] ?? editorDraft.skills[0]!;
  const preview = `<section class="dev-preview"><b>Preview · ${esc(skill.ten_hien_thi)}</b><span>${skill.danh_sach_hieu_ung.map((effect, index) => `${index + 1}. ${esc(describeEffect(effect))}`).join(" → ")}</span><small>Runtime sẽ snapshot definition này; combat resolve qua Shared Combat Engine.</small></section>`;
  const findings = validateDevContent(editorDraft);
  return base.replace('<div class="dev-effects-edit">', `${preview}<div class="dev-effects-edit">`)
    .replace('</select></label><div class="dev-skill-editor">', '</select></label><button type="button" data-dev-action="new-skill">＋ Tạo skill</button><div class="dev-skill-editor">')
    .replace('</div><div class="dev-effects-edit">', `</div><label class="dev-skill-status">Trạng thái skill<select name="skill-status"><option value="HOAT_DONG" ${skill.trang_thai === "HOAT_DONG" ? "selected" : ""}>Hoạt động</option><option value="AN" ${skill.trang_thai === "AN" ? "selected" : ""}>Ẩn / không hoạt động</option></select></label><div class="dev-effects-edit">`)
    .replace("<footer><span class=\"dev-pending-note\">", `<section class="dev-guardrails"><header><b>Validate & balance guardrails</b><button type="button" data-dev-action="validate-content">Kiểm tra lại</button></header>${findings.map((item) => `<div class="dev-guardrail ${item.level.toLowerCase()}"><b>${item.level}</b><span><strong>${esc(item.title)}</strong><small>${esc(item.detail)}</small></span></div>`).join("")}<small>RED chặn do vi phạm contract Engine; YELLOW là heuristic, vẫn lưu/test được. GREEN không xác nhận balance.</small></section><footer><span class="dev-pending-note">`)
    .replace("Lưu content local", "Lưu Draft");
}

function renderClassEditorBase(): string {
  const skill = editorDraft.skills[Math.min(editorSkillIndex, editorDraft.skills.length - 1)] ?? editorDraft.skills[0]!;
  return `<details class="dev-editor" open><summary>✎ Chỉnh sửa content local · thay đổi tạo snapshot cho trận mới</summary><form id="dev-content-form"><div class="dev-editor-grid"><label>Class / Hero<select name="editor-class">${allClasses.map((item) => `<option value="${esc(item.class_id)}" ${item.class_id === editorClassId ? "selected" : ""}>${esc(item.ten_co_dinh ?? item.ten_class)} · ${item.tier ?? item.phan_loai}</option>`).join("")}</select></label><label>Tên hiển thị<input name="class-name" value="${esc(editorDraft.ten_class)}" maxlength="48"/></label><label>Loại nhân vật<input value="${editorDraft.phan_loai} · ${editorDraft.archetype} · la_hero_preset=${editorDraft.la_hero_preset}" disabled/></label></div><div class="dev-stat-editor">${([["hp_nen", "HP"], ["atk_nen", "ATK"], ["def_nen", "DEF"], ["spd_nen", "SPD"], ["mp_nen", "MP"], ["mp_hoi_moi_luot", "MP hồi"]] as const).map(([key, label]) => `<label>${label}<input type="number" min="0" name="stat-${key}" value="${editorDraft.stats[key]}"/></label>`).join("")}</div><label class="dev-editor-skill-select">Kỹ năng<select name="editor-skill">${editorDraft.skills.map((item, index) => `<option value="${index}" ${index === editorSkillIndex ? "selected" : ""}>${esc(item.ten_hien_thi)}</option>`).join("")}</select></label><div class="dev-skill-editor"><label>Tên kỹ năng<input name="skill-name" value="${esc(skill.ten_hien_thi)}" maxlength="48"/></label><label>MP<input name="skill-mp" type="number" min="0" value="${skill.chi_phi_mp}"/></label><label>Hồi chiêu<input name="skill-cooldown" type="number" min="0" value="${skill.hoi_chieu_luot}"/></label><label>Mô tả<input name="skill-description" value="${esc(skill.mo_ta)}"/></label></div><div class="dev-effects-edit"><header><b>Effect theo thứ tự áp dụng</b><span>${skill.danh_sach_hieu_ung.length} effect</span></header>${skill.danh_sach_hieu_ung.map((effect, index) => `<article class="dev-effect-edit" data-effect-index="${index}"><div class="dev-effect-edit-head"><b>${String(index + 1).padStart(2, "0")}</b><select name="effect-code-${index}">${DANH_SACH_19_MA.map((code) => `<option value="${code}" ${effect.ma_hieu_ung === code ? "selected" : ""}>${esc(REGISTRY_19[code].ten_hien_thi)}</option>`).join("")}</select><select name="effect-target-${index}">${targets.map((target) => `<option value="${target}" ${effect.doi_tuong === target ? "selected" : ""}>${target.replaceAll("_", " ")}</option>`).join("")}</select><span class="dev-effect-time">Khi thi triển</span></div><div class="dev-effect-params">${Object.entries(effect.tham_so).map(([key, value]) => `<label>${esc(key)}<input type="number" step="any" name="effect-param-${index}-${esc(key)}" value="${value}"/></label>`).join("")}</div><div class="dev-effect-order"><button type="button" data-effect-move="${index}" data-delta="-1" ${index === 0 ? "disabled" : ""}>↑ Đưa lên</button><button type="button" data-effect-move="${index}" data-delta="1" ${index === skill.danh_sach_hieu_ung.length - 1 ? "disabled" : ""}>↓ Đưa xuống</button><button type="button" data-effect-remove="${index}" ${skill.danh_sach_hieu_ung.length <= 1 ? "disabled" : ""}>× Bỏ effect</button></div></article>`).join("")}<div class="dev-add-effect"><select name="new-effect">${DANH_SACH_19_MA.map((code) => `<option value="${code}">${esc(REGISTRY_19[code].ten_hien_thi)}</option>`).join("")}</select><button type="button" data-dev-action="add-effect">＋ Thêm effect</button></div></div>${renderPassiveEditor()}<footer><span class="dev-pending-note">${editorDraft.content_status}</span><button class="dev-primary" type="submit">Lưu content local</button></footer></form></details>`;
}

function renderPassiveEditor(): string {
  const html = renderPassiveEditorBase();
  const condition = editorDraft.passive.dieu_kien as { loai?: string; gia_tri?: number };
  const conditionInput = `<div class="dev-passive-condition"><label>Điều kiện<select name="passive-condition"><option value="" ${!condition.loai ? "selected" : ""}>Không điều kiện</option><option value="HP_PCT_NHO_HON_BANG" ${condition.loai === "HP_PCT_NHO_HON_BANG" ? "selected" : ""}>HP ≤ ngưỡng (%)</option><option value="HP_PCT_LON_HON_BANG" ${condition.loai === "HP_PCT_LON_HON_BANG" ? "selected" : ""}>HP ≥ ngưỡng (%)</option></select></label><label>Ngưỡng HP %<input name="passive-condition-value" type="number" min="0" max="100" value="${condition.gia_tri ?? 50}" ${condition.loai ? "" : "disabled"}/></label></div>`;
  const effectControls = `${editorDraft.passive.danh_sach_hieu_ung.map((_, index) => `<button type="button" data-passive-remove="${index}" ${editorDraft.passive.danh_sach_hieu_ung.length <= 1 ? "disabled" : ""}>Bỏ effect nội tại ${index + 1}</button>`).join("")}<button type="button" data-passive-add ${editorDraft.passive.danh_sach_hieu_ung.length >= 2 ? "disabled" : ""}>＋ Thêm effect nội tại</button>`;
  return html.replace('</header><div class="dev-passive-fields">', `</header>${conditionInput}<div class="dev-passive-fields">`).replace("</section>", `${effectControls}</section>`);
}

function renderPassiveEditorBase(): string {
  const passive = editorDraft.passive;
  return `<section class="dev-passive-editor"><header><b>✦ Nội tại Class</b><small>Không chiếm slot kỹ năng · snapshot cùng trận</small></header><div class="dev-passive-fields"><label>Tên nội tại<input name="passive-name" value="${esc(passive.ten_hien_thi)}"/></label><label>Mô tả nội tại<input name="passive-description" value="${esc(passive.mo_ta ?? "")}"/></label><label>Kích hoạt<select name="passive-trigger">${["BAT_DAU_TRAN", "BAT_DAU_LUOT", "KHI_SU_DUNG_SKILL", "KHI_GAY_SAT_THUONG", "KHI_NHAN_SAT_THUONG"].map((trigger) => `<option ${passive.kich_hoat === trigger ? "selected" : ""}>${trigger}</option>`).join("")}</select></label>${editorDraft.phan_loai === "LINH_THAN" ? `<label class="dev-special"><input type="checkbox" name="passive-special" ${passive.dac_trung_rieng ? "checked" : ""}/> Đặc trưng riêng</label>` : ""}</div>${passive.danh_sach_hieu_ung.map((effect, index) => `<div class="dev-passive-effect"><select name="passive-code-${index}">${DANH_SACH_19_MA.map((code) => `<option value="${code}" ${effect.ma_hieu_ung === code ? "selected" : ""}>${REGISTRY_19[code].ten_hien_thi}</option>`).join("")}</select><select name="passive-target-${index}">${targets.map((target) => `<option value="${target}" ${effect.doi_tuong === target ? "selected" : ""}>${target.replaceAll("_", " ")}</option>`).join("")}</select>${Object.entries(effect.tham_so).map(([key, value]) => `<label>${key}<input type="number" step="any" name="passive-param-${index}-${key}" value="${value}"/></label>`).join("")}${passive.kich_hoat === "BAT_DAU_TRAN" ? `<label>Thời điểm<select name="passive-time-${index}"><option value="KHI_THI_TRIEN" ${effect.thoi_diem === "KHI_THI_TRIEN" ? "selected" : ""}>KHI_THI_TRIEN</option><option value="BI_DONG_DAU_TRAN" ${effect.thoi_diem === "BI_DONG_DAU_TRAN" ? "selected" : ""}>BI_DONG_DAU_TRAN</option></select></label>` : `<span class="dev-effect-time">KHI_THI_TRIEN</span>`}</div>`).join("")}</section>`;
}

function collectEditorForm(form: HTMLFormElement): ClassContent {
  const data = new FormData(form);
  const next = structuredClone(editorDraft);
  next.ten_class = String(data.get("class-name") ?? next.ten_class).trim();
  next.stats = {
    hp_nen: Number(data.get("stat-hp_nen")), atk_nen: Number(data.get("stat-atk_nen")),
    def_nen: Number(data.get("stat-def_nen")), spd_nen: Number(data.get("stat-spd_nen")),
    mp_nen: Number(data.get("stat-mp_nen")), mp_hoi_moi_luot: Number(data.get("stat-mp_hoi_moi_luot")),
  };
  const skill = next.skills[editorSkillIndex];
  if (!skill) throw new Error("Không tìm thấy kỹ năng đang chỉnh sửa.");
  skill.ten_hien_thi = String(data.get("skill-name") ?? skill.ten_hien_thi).trim();
  skill.chi_phi_mp = Number(data.get("skill-mp"));
  skill.hoi_chieu_luot = Number(data.get("skill-cooldown"));
  skill.mo_ta = String(data.get("skill-description") ?? skill.mo_ta).trim();
  skill.trang_thai = String(data.get("skill-status") ?? skill.trang_thai) as "HOAT_DONG" | "AN";
  skill.danh_sach_hieu_ung = skill.danh_sach_hieu_ung.map((effect, index) => {
    const code = String(data.get(`effect-code-${index}`) ?? effect.ma_hieu_ung) as MaHieuUng;
    const definition = REGISTRY_19[code];
    const params = Object.fromEntries(definition.tham_so_schema.map(({ ten }) => [ten, Number(data.get(`effect-param-${index}-${ten}`) ?? effect.tham_so[ten] ?? defaultParam(ten))]));
    return { ma_hieu_ung: code, tham_so: params, doi_tuong: String(data.get(`effect-target-${index}`) ?? effect.doi_tuong) as DoiTuong, thoi_diem: "KHI_THI_TRIEN" };
  });
  next.passive.ten_hien_thi = String(data.get("passive-name") ?? next.passive.ten_hien_thi).trim();
  next.passive.mo_ta = String(data.get("passive-description") ?? next.passive.mo_ta ?? "").trim();
  next.passive.kich_hoat = String(data.get("passive-trigger") ?? next.passive.kich_hoat) as typeof next.passive.kich_hoat;
  const passiveCondition = String(data.get("passive-condition") ?? "");
  next.passive.dieu_kien = passiveCondition ? { loai: passiveCondition as "HP_PCT_NHO_HON_BANG" | "HP_PCT_LON_HON_BANG", gia_tri: Number(data.get("passive-condition-value") ?? 50) } : {};
  next.passive.dac_trung_rieng = data.has("passive-special");
  next.passive.danh_sach_hieu_ung = next.passive.danh_sach_hieu_ung.map((effect, index) => {
    const code = String(data.get(`passive-code-${index}`) ?? effect.ma_hieu_ung) as MaHieuUng;
    const params = Object.fromEntries(REGISTRY_19[code].tham_so_schema.map(({ ten }) => [ten, Number(data.get(`passive-param-${index}-${ten}`) ?? effect.tham_so[ten] ?? defaultParam(ten))]));
    const trigger = next.passive.kich_hoat;
    const thoi_diem = String(data.get(`passive-time-${index}`) ?? (trigger === "BAT_DAU_TRAN" ? effect.thoi_diem : "KHI_THI_TRIEN")) as ThoiDiem;
    return { ma_hieu_ung: code, tham_so: params, doi_tuong: String(data.get(`passive-target-${index}`) ?? effect.doi_tuong) as DoiTuong, thoi_diem };
  });
  return next;
}

function defaultParam(key: string): number { return key === "so_luot" || key === "so_luong_go" ? 1 : key === "he_so" || key === "phan_tram_hoi" ? 1 : 40; }

function newEffect(code: MaHieuUng): HieuUngCauHinh {
  const def = REGISTRY_19[code];
  return { ma_hieu_ung: code, doi_tuong: def.doi_tuong_mac_dinh, thoi_diem: "KHI_THI_TRIEN", tham_so: Object.fromEntries(def.tham_so_schema.map(({ ten }) => [ten, defaultParam(ten)])) };
}

function readTeamSetup(form: HTMLFormElement, side: "a" | "b", control: "NGUOI_CHOI" | "AI"): SandboxActorSetup[] {
  return [1, 2, 3].filter((slot) => form.querySelector<HTMLInputElement>(`[data-enable="${side}"][data-slot="${slot}"]`)?.checked).map((slot) => {
    const classId = form.querySelector<HTMLSelectElement>(`[data-dev-class="${side}"][data-slot="${slot}"]`)!.value;
    const content = allClasses.find((item) => item.class_id === classId)!;
    const name = form.querySelector<HTMLInputElement>(`[data-name="${side}"][data-slot="${slot}"]`)!.value;
    const tier = form.querySelector<HTMLSelectElement>(`[data-tier="${side}"][data-slot="${slot}"]`)!.value as Tier;
    const skillPicker = form.querySelector<HTMLSelectElement>(`[data-dev-skills="${side}"][data-slot="${slot}"]`);
    const skill_ids = skillPicker ? [...skillPicker.selectedOptions].map((option) => option.value) : content.skills.slice(0, 4).map((skill) => skill.id);
    const readNumber = (key: string): number | undefined => { const value = form.querySelector<HTMLInputElement>(`[data-initial="${key}"][data-side="${side}"][data-slot="${slot}"]`)?.value; return value === undefined || value === "" ? undefined : Number(value); };
    const hp = readNumber("hp"); const mp = readNumber("mp"); const atb = readNumber("atb"); const cooldown = readNumber("cooldown");
    return {
      class_id: classId, name, tier,
      allocation: { hp: 1, atk: 1, def: 1, spd: 1, mp: 1, mp_hoi: 0 },
      skill_ids, control, ai_archetype: "ADAPTIVE",
      initial: { hp, mp, atb, cooldowns: cooldown === undefined ? {} : Object.fromEntries(skill_ids.map((id) => [id, cooldown])) },
    };
  });
}

function selectClasses(selected: string, side: "a" | "b", slot: number): string {
  return `<select data-dev-class="${side}" data-slot="${slot}" aria-label="Class đội ${side.toUpperCase()} vị trí ${slot}">${allClasses.map((item) => `<option value="${esc(item.class_id)}" ${item.class_id === selected ? "selected" : ""}>${esc(item.ten_co_dinh ?? item.ten_class)}${item.content_status === "DEV_DRAFT" ? " · DEV DRAFT" : ""}</option>`).join("")}</select>`;
}

function skillPicker(classId: string, side: "a" | "b", slot: number): string {
  const content = allClasses.find((item) => item.class_id === classId);
  return `<select multiple size="4" data-dev-skills="${side}" data-slot="${slot}" aria-label="Skills cho Sandbox, chọn 1–4">${(content?.skills ?? []).map((skill, index) => `<option value="${esc(skill.id)}" ${index < 4 ? "selected" : ""}>${esc(skill.ten_hien_thi)}</option>`).join("")}</select><small>Chọn 1–4 skill để đưa vào trận</small>`;
}

function availableTiers(classId: string): Tier[] {
  const content = allClasses.find((item) => item.class_id === classId);
  if (!content) return ["B", "A", "S"];
  if (content.phan_loai === "LINH_THAN") return ["SSS"];
  if (content.la_hero_preset) return ["B", "A", "S", "SS"];
  return ["B", "A", "S"];
}

function tierSelect(classId: string, side: "a" | "b", slot: number): string {
  const options = availableTiers(classId);
  const officialTier = allClasses.find((item) => item.class_id === classId)?.tier;
  const selected = officialTier && options.includes(officialTier) ? officialTier : options[0];
  return `<select data-tier="${side}" data-slot="${slot}" aria-label="Tier ${side} ${slot}">${options.map((tier) => `<option ${tier === selected ? "selected" : ""}>${tier}</option>`).join("")}</select>`;
}

function renderSandbox(match: TranDau | null): string {
  const classIdA = "hero-thanh-giong";
  const classIdB = "hero-so-dua";
  const current = match?.trang_thai === "DANG_DIEN_RA" ? match.trang_thai_chien_dau.actors.find((actor) => actor.actor_id === match.trang_thai_chien_dau.actor_dang_di) : undefined;
  const read = current ? luaChonHopLe(match!) : null;
  const actorSet = (side: "a" | "b", currentClass: string) => `<section class="dev-side-config dev-side-${side}"><header><span>ĐỘI ${side.toUpperCase()}</span><b>${side === "a" ? "◆" : "◇"}</b></header>${[1, 2, 3].map((slot) => `<div class="dev-actor-config"><label><input type="checkbox" data-enable="${side}" data-slot="${slot}" ${slot === 1 ? "checked" : ""}/> Vị trí ${slot}</label>${selectClasses(currentClass, side, slot)}${tierSelect(currentClass, side, slot)}${skillPicker(currentClass, side, slot)}<input data-name="${side}" data-slot="${slot}" placeholder="Tên thử nghiệm" aria-label="Tên actor ${side} ${slot}"/><div class="dev-initial-fields"><label>HP<input type="number" min="0" data-initial="hp" data-side="${side}" data-slot="${slot}" placeholder="Mặc định"/></label><label>MP<input type="number" min="0" data-initial="mp" data-side="${side}" data-slot="${slot}" placeholder="Mặc định"/></label><label>ATB<input type="number" min="0" max="2000" data-initial="atb" data-side="${side}" data-slot="${slot}" placeholder="0"/></label><label>CD all<input type="number" min="0" data-initial="cooldown" data-side="${side}" data-slot="${slot}" placeholder="0"/></label></div></div>`).join("")}</section>`;
  const setup = `<form class="dev-sandbox-config" id="dev-sandbox-form"><div class="dev-config-row"><label>Seed <input name="seed" type="number" min="0" max="4294967295" value="20260417"/></label><label>Điều khiển <select name="control"><option value="manual">Tự điều khiển cả hai đội</option><option value="ai">AI đấu AI</option></select></label><label>Số trận AI-vs-AI <input name="batch-count" type="number" min="1" max="100" value="20"/></label><span>Tier tự do · cùng Shared Combat Engine</span></div><div class="dev-teams">${actorSet("a", classIdA)}<div class="dev-vs">VS</div>${actorSet("b", classIdB)}</div><div class="dev-form-actions"><button class="dev-primary" type="submit">⚔ Dựng trận thử</button><button type="button" class="dev-quiet" data-dev-action="run-batch">▦ Chạy AI-vs-AI N trận</button><button type="button" class="dev-quiet" data-dev-action="reset">↺ Xóa trận</button></div></form>`;
  let battle = "";
  if (match) {
    const states = match.trang_thai_chien_dau.actors.map((actor) => `<article class="dev-state-card ${actor.actor_id === current?.actor_id ? "active" : ""}"><span>${actor.doi === "DOI_A" ? "ĐỘI A" : "ĐỘI B"} · VỊ TRÍ ${actor.vi_tri}</span><h3>${esc(actor.ten_hien_thi)}</h3><small>${match.du_lieu_noi_dung_snapshot.actors[actor.actor_id]?.tier} · ${match.du_lieu_noi_dung_snapshot.actors[actor.actor_id]?.ten_class}</small><div>♥ ${actor.hp_hien_tai}/${actor.hp_toi_da}　◈ ${actor.mp_hien_tai}/${actor.mp_toi_da}</div><div>ATB ${actor.thanh_tich_luy}　Khiên ${actor.shield_hien_tai}</div><div>Cooldown: ${Object.entries(actor.cooldowns).filter(([, count]) => count > 0).map(([id, count]) => `${esc(id.split(":").at(-1))} ${count}`).join(" · ") || "—"}</div><div>Trạng thái: ${[...actor.buff, ...actor.debuff, ...actor.dot].map((status) => `${esc(REGISTRY_19[status.ma_hieu_ung].ten_hien_thi)} (${status.so_luot})`).join(" · ") || "—"}</div></article>`).join("");
    let controls = "";
    if (match.trang_thai === "DANG_DIEN_RA") {
      if (current?.dieu_khien === "AI") controls = `<button class="dev-primary" data-dev-action="step-ai">▶ Chạy một hành động AI</button><button class="dev-quiet" data-dev-action="run-ai">⏩ Chạy AI đến kết thúc</button>`;
      else controls = `<div class="dev-turn-info">Đến lượt: <b>${esc(current?.ten_hien_thi)}</b> · ${current?.doi === "DOI_A" ? "Đội A" : "Đội B"}</div><div class="dev-skill-actions">${read?.ky_nang.map((skillChoice) => { const skill = match!.du_lieu_noi_dung_snapshot.actors[current!.actor_id]!.ky_nang.find((item) => item.id === skillChoice.ky_nang_id)!; const targetSelect = skillChoice.can_chon_target ? `<select class="dev-target-select" data-target-for="${esc(skill.id)}">${skillChoice.target_hop_le.map((id) => { const target = match!.trang_thai_chien_dau.actors.find((item) => item.actor_id === id)!; return `<option value="${id}">${esc(target.ten_hien_thi)} · ${target.hp_hien_tai} HP</option>`; }).join("")}</select>` : ""; return `<div class="dev-skill-pick">${targetSelect}<button class="dev-skill-button" data-dev-skill="${esc(skill.id)}" data-dev-target="${esc(skillChoice.can_chon_target ? skillChoice.target_hop_le[0] ?? "" : "")}" ${skillChoice.dung_duoc ? "" : "disabled"}><b>⚡ ${esc(skill.ten_hien_thi)}</b><small>${skill.chi_phi_mp} MP · Hồi chiêu ${skill.hoi_chieu_luot} · ${skillChoice.ly_do ?? "Sẵn sàng"}</small></button></div>`; }).join("") ?? ""}</div><button class="dev-quiet" data-dev-action="pass">↷ Bỏ lượt</button>`;
    } else controls = `<strong class="dev-result">${match.ket_qua === "CO_BEN_THANG" ? `Thắng: ${match.actor_ids_thang.join(", ")}` : "Trận hòa"}</strong><button class="dev-primary" data-dev-action="rerun">↻ Chạy lại cùng seed</button>`;
    const log = match.nhat_ky_luot_danh.slice(-30).reverse().map((entry) => `<li><b>L${entry.so_luot} · ${entry.actor_doi} · ${esc(entry.ten_hien_thi_actor)}</b><span>${entry.hanh_dong} ${esc(entry.ky_nang_id ?? "")}${entry.target_actor_id ? ` → ${entry.target_actor_id}` : ""} · MP -${entry.mp_tieu_ton}</span>${entry.hieu_ung_ap_dung.map((effect) => `<small>${REGISTRY_19[effect.ma_hieu_ung].ten_hien_thi} → ${effect.target_actor_id ?? "ngẫu nhiên"}: ${effect.gia_tri}${effect.bi_bo_qua ? " · bỏ qua" : ""}</small>`).join("")}<small>RNG ${entry.rng_state_truoc ?? "—"} → ${entry.rng_rolls?.map((roll) => roll.rng_state_truoc).join(", ") ?? "—"} · Passive ${entry.passive_kich_hoat.map((passive) => passive.ma_noi_tai).join(", ") || "—"} · Chết ${entry.actor_chet.join(", ") || "—"}</small></li>`).join("");
    battle = `<section class="dev-battle"><header><div><span class="dev-kicker">ENGINE CANONICAL STATE · CONTENT v${match.du_lieu_noi_dung_snapshot.phien_ban_content ?? "?"}</span><h2>${match.trang_thai === "DANG_DIEN_RA" ? "Trận đang chạy" : "Trận đã kết thúc"}</h2></div><span>Seed ${match.trang_thai_chien_dau.rng_seed} · RNG state ${match.trang_thai_chien_dau.rng_state}</span></header><div class="dev-state-grid">${states}</div><div class="dev-turn-panel">${controls}</div><details class="dev-combat-log" open><summary>☷ Combat log · ${match.nhat_ky_luot_danh.length} hành động</summary><ol>${log || "<li>Chưa có hành động</li>"}</ol></details></section>`;
  }
  return `<header class="dev-page-heading"><div><span class="dev-kicker">ENGINE TEST BENCH</span><h1>Battle Sandbox</h1><p>Input cô lập → Runtime → Shared Combat Engine → canonical state và log.</p></div><span class="dev-count">KHÔNG GHI SAVE PLAYER</span></header>${message ? `<p class="dev-inline-message">${esc(message)}</p>` : ""}${setup}${batchReport ? renderBatchReport(batchReport) : ""}${battle}`;
}

function renderBatchReport(report: AiBatchReport): string {
  const stat = (label: string, value: string) => `<article><span>${label}</span><b>${value}</b></article>`;
  return `<section class="dev-batch-report"><header><div><span class="dev-kicker">ENGINE LOG AGGREGATE</span><h2>AI-vs-AI · ${report.matches} trận</h2></div><button type="button" data-dev-action="clear-batch">× Xóa báo cáo</button></header><div class="dev-batch-grid">${stat("Seed bắt đầu", String(report.startSeed))}${stat("Thắng Đội A", `${report.winsA} · ${pct(report.winsA, report.matches)}`)}${stat("Thắng Đội B", `${report.winsB} · ${pct(report.winsB, report.matches)}`)}${stat("Hòa", `${report.draws} · ${pct(report.draws, report.matches)}`)}${stat("Hành động / trận", report.averageActions.toFixed(1))}${stat("Mật độ quyết định", pct(report.decisionDensity, 1))}${stat("Bỏ lượt cưỡng bức", pct(report.forcedPassRate, 1))}${stat("Lượt dính CC khóa", pct(report.ccLockRate, 1))}${stat("Chết trước khi hành động", pct(report.deadBeforeActing, 1))}${stat("Comeback 1v3", pct(report.comebackRate, report.matches))}${stat("Focus fire", pct(report.focusFireRate, report.matches))}${stat("SPD snowball", pct(report.spdSnowballRate, report.matches))}</div><details><summary>Phân bố kỹ năng được dùng</summary><p>${Object.entries(report.skillUse).sort((a, b) => b[1] - a[1]).map(([skill, count]) => `${esc(skill)}: ${count}`).join(" · ") || "Không dùng kỹ năng"}</p></details><small>Metric chỉ tổng hợp log và state của Shared Combat Engine; ngưỡng đều dùng để phát hiện vấn đề, chưa phải kết luận cân bằng.</small></section>`;
}

function pct(numerator: number, denominator: number): string { return `${denominator ? (100 * numerator / denominator).toFixed(1) : "0.0"}%`; }

function runAiBatch(config: { teamA: SandboxActorSetup[]; teamB: SandboxActorSetup[]; seed: number; count: number }): AiBatchReport {
  if (!config.teamA.length || !config.teamB.length) throw new Error("Mỗi đội cần ít nhất một actor để chạy batch.");
  if (!Number.isInteger(config.count) || config.count < 1 || config.count > 100) throw new Error("Batch chỉ nhận từ 1 đến 100 trận.");
  const totals = { winsA: 0, winsB: 0, draws: 0, actions: 0, decisionTurns: 0, allTurns: 0, forcedPass: 0, lockTurns: 0, deadBefore: 0, actorCount: 0, comebacks: 0, focusFire: 0, snowballs: 0 };
  const skillUse: Record<string, number> = {};
  for (let index = 0; index < config.count; index++) {
    const runner = new DevSandboxRuntime();
    let match = runner.start({ teamA: config.teamA.map((setup) => ({ ...setup, control: "AI" })), teamB: config.teamB.map((setup) => ({ ...setup, control: "AI" })), seed: (config.seed + index) >>> 0, contentVersion: getDevContentVersion(), classes: allClasses });
    const totalActors = match.trang_thai_chien_dau.actors.length;
    totals.actorCount += totalActors;
    const acted = new Set<string>();
    let recentDamage: Array<{ source: string; target: string }> = [];
    let hadAOneVsBThree = false;
    let hadBOneVsAThree = false;
    let focusFire = false;
    let snowballTriggers = 0;
    let steps = 0;
    while (match.trang_thai === "DANG_DIEN_RA" && steps++ < 500) {
      const before = match;
      const active = before.trang_thai_chien_dau.actors.find((actor) => actor.actor_id === before.trang_thai_chien_dau.actor_dang_di)!;
      const locked = active.debuff.some((status) => CC_KHOA.has(status.ma_hieu_ung));
      totals.allTurns++;
      if (locked) totals.lockTurns++;
      const result = runner.actAi();
      if (!result.ok) throw new Error(`Engine từ chối AI action: ${result.loi.mo_ta}`);
      match = result.tran;
      const log = match.nhat_ky_luot_danh.at(-1)!;
      totals.actions++;
      acted.add(active.actor_id);
      if (log.so_lua_chon_hop_le >= 2) totals.decisionTurns++;
      if (["BI_STUN", "BI_SILENCE", "KHONG_DU_MP"].includes(log.ly_do_bo_luot ?? "")) totals.forcedPass++;
      if (log.ky_nang_id) skillUse[log.ky_nang_id] = (skillUse[log.ky_nang_id] ?? 0) + 1;
      for (const effect of log.hieu_ung_ap_dung) if (effect.ma_hieu_ung.startsWith("EFF_DMG_") && effect.gia_tri > 0 && !effect.bi_bo_qua && effect.target_actor_id) recentDamage.push({ source: log.actor_id, target: effect.target_actor_id });
      recentDamage = recentDamage.slice(-6);
      for (const deadId of log.actor_chet) {
        const deadSide = before.trang_thai_chien_dau.actors.find((actor) => actor.actor_id === deadId)?.doi;
        const enemiesAlive = before.trang_thai_chien_dau.actors.filter((actor) => actor.doi !== deadSide && actor.hp_hien_tai > 0);
        if (enemiesAlive.length === 3 && enemiesAlive.every((enemy) => recentDamage.some((hit) => hit.source === enemy.actor_id && hit.target === deadId))) focusFire = true;
      }
      const state = match.trang_thai_chien_dau;
      if (state.chuoi_luot.so_lan_actor === 2 && state.chuoi_luot.actor_id === active.actor_id) snowballTriggers++;
      const aliveA = state.actors.filter((actor) => actor.doi === "DOI_A" && actor.hp_hien_tai > 0).length;
      const aliveB = state.actors.filter((actor) => actor.doi === "DOI_B" && actor.hp_hien_tai > 0).length;
      if (aliveA === 1 && aliveB === 3) hadAOneVsBThree = true;
      if (aliveB === 1 && aliveA === 3) hadBOneVsAThree = true;
    }
    totals.deadBefore += match.trang_thai_chien_dau.actors.filter((actor) => actor.hp_hien_tai <= 0 && !acted.has(actor.actor_id)).length;
    const winningSide = match.trang_thai_chien_dau.actors.find((actor) => match.actor_ids_thang.includes(actor.actor_id))?.doi;
    if ((winningSide === "DOI_A" && hadAOneVsBThree) || (winningSide === "DOI_B" && hadBOneVsAThree)) totals.comebacks++;
    if (focusFire) totals.focusFire++;
    if (snowballTriggers >= 3) totals.snowballs++;
    if (match.ket_qua === "CO_BEN_THANG") {
      const side = match.trang_thai_chien_dau.actors.find((actor) => match.actor_ids_thang.includes(actor.actor_id))?.doi;
      if (side === "DOI_A") totals.winsA++; else if (side === "DOI_B") totals.winsB++;
    } else totals.draws++;
  }
  return { matches: config.count, startSeed: config.seed, winsA: totals.winsA, winsB: totals.winsB, draws: totals.draws, averageActions: totals.actions / config.count, decisionDensity: totals.allTurns ? 100 * totals.decisionTurns / totals.allTurns : 0, forcedPassRate: totals.allTurns ? 100 * totals.forcedPass / totals.allTurns : 0, ccLockRate: totals.allTurns ? 100 * totals.lockTurns / totals.allTurns : 0, deadBeforeActing: totals.actorCount ? 100 * totals.deadBefore / totals.actorCount : 0, comebackRate: totals.comebacks, focusFireRate: totals.focusFire, spdSnowballRate: totals.snowballs, skillUse };
}

export function wireDevPanel(onChange: () => void): void {
  document.querySelectorAll<HTMLElement>("[data-dev-tab]").forEach((button) => button.addEventListener("click", () => { tab = button.dataset.devTab as Tab; message = ""; onChange(); }));
  document.querySelectorAll<HTMLSelectElement>("[data-dev-class]").forEach((select) => select.addEventListener("change", () => {
    const side = select.dataset.devClass as "a" | "b";
    const slot = select.dataset.slot!;
    const tier = document.querySelector<HTMLSelectElement>(`[data-tier="${side}"][data-slot="${slot}"]`);
    if (tier) {
      const options = availableTiers(select.value);
      const official = allClasses.find((item) => item.class_id === select.value)?.tier;
      const selected = official && options.includes(official) ? official : options[0];
      tier.innerHTML = options.map((value) => `<option ${value === selected ? "selected" : ""}>${value}</option>`).join("");
    }
    const picker = document.querySelector<HTMLSelectElement>(`[data-dev-skills="${side}"][data-slot="${slot}"]`);
    if (picker) picker.outerHTML = skillPicker(select.value, side, Number(slot));
  }));
  document.querySelector<HTMLFormElement>("#dev-content-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      editorDraft = collectEditorForm(event.currentTarget as HTMLFormElement);
      const version = saveDevClassDraft(editorDraft);
      message = `Đã lưu DEV_DRAFT v${version}. Trận mới dùng bản nháp; trận đang chạy giữ snapshot. Đây chưa phải content chính thức.`;
    } catch (error) { message = error instanceof Error ? error.message : "Content chưa hợp lệ."; }
    onChange();
  });
  document.querySelector<HTMLFormElement>("#dev-gacha-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget as HTMLFormElement);
      gachaRuns = runDevGacha(Number(data.get("gacha-seed")), Number(data.get("gacha-count")));
      progressionMessage = `Đã chạy ${gachaRuns.length} package trong DEV SANDBOX; player gacha không bị thay đổi.`;
    } catch (error) { progressionMessage = error instanceof Error ? error.message : "Không thể chạy gacha test."; }
    onChange();
  });
  document.querySelector<HTMLFormElement>("#dev-wallet-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    try { const value = Number(new FormData(event.currentTarget as HTMLFormElement).get("wallet-value")); updateDevProgress((current) => ({ ...current, wallet: value })); progressionMessage = `Đã set Dev Wallet: ${value}.`; }
    catch (error) { progressionMessage = error instanceof Error ? error.message : "Số dư không hợp lệ."; }
    onChange();
  });
  document.querySelector<HTMLSelectElement>('[name="editor-class"]')?.addEventListener("change", (event) => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (form) { try { editorDraft = collectEditorForm(form); } catch { /* Keep the current in-progress draft while switching. */ } }
    editorClassId = (event.currentTarget as HTMLSelectElement).value;
    editorDraft = structuredClone(allClasses.find((item) => item.class_id === editorClassId)!);
    editorSkillIndex = 0;
    onChange();
  });
  document.querySelector<HTMLSelectElement>('[name="editor-skill"]')?.addEventListener("change", (event) => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (form) editorDraft = collectEditorForm(form);
    editorSkillIndex = Number((event.currentTarget as HTMLSelectElement).value);
    onChange();
  });
  document.querySelector<HTMLSelectElement>('[name="passive-trigger"]')?.addEventListener("change", () => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (form) { try { editorDraft = collectEditorForm(form); } catch (error) { message = error instanceof Error ? error.message : "Passive chưa hợp lệ."; } }
    onChange();
  });
  document.querySelector<HTMLSelectElement>('[name="passive-condition"]')?.addEventListener("change", () => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (form) { try { editorDraft = collectEditorForm(form); } catch (error) { message = error instanceof Error ? error.message : "Điều kiện chưa hợp lệ."; } }
    onChange();
  });
  document.querySelector<HTMLFormElement>("#dev-content-form")?.querySelectorAll<HTMLSelectElement>("[name^=passive-code-]").forEach((select) => select.addEventListener("change", () => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (!form) return;
    try {
      const index = Number(select.name.split("-").at(-1));
      const effect = newEffect(select.value as MaHieuUng);
      const target = form.querySelector<HTMLSelectElement>(`[name="passive-target-${index}"]`);
      if (target) target.value = effect.doi_tuong;
      editorDraft = collectEditorForm(form);
      editorDraft.passive.danh_sach_hieu_ung[index] = effect;
    } catch (error) { message = error instanceof Error ? error.message : "Không đổi được effect nội tại."; }
    onChange();
  }));
  document.querySelectorAll<HTMLButtonElement>("[data-passive-add], [data-passive-remove]").forEach((button) => button.addEventListener("click", () => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (!form) return;
    try {
      editorDraft = collectEditorForm(form);
      if (button.hasAttribute("data-passive-add")) {
        if (editorDraft.passive.danh_sach_hieu_ung.length >= 2) throw new Error("Nội tại tối đa 2 effect theo contract hiện tại.");
        editorDraft.passive.danh_sach_hieu_ung.push(newEffect("EFF_BUFF_DEF"));
      } else {
        const index = Number(button.dataset.passiveRemove);
        if (editorDraft.passive.danh_sach_hieu_ung.length <= 1) throw new Error("Nội tại cần ít nhất một effect.");
        editorDraft.passive.danh_sach_hieu_ung.splice(index, 1);
      }
    } catch (error) { message = error instanceof Error ? error.message : "Không cập nhật được nội tại."; }
    onChange();
  }));
  document.querySelector<HTMLFormElement>("#dev-content-form")?.querySelectorAll<HTMLSelectElement>("[name^=effect-code-]").forEach((select) => select.addEventListener("change", () => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (form) {
      try {
        const old = editorDraft.skills[editorSkillIndex]!.danh_sach_hieu_ung;
        const index = Number(select.name.split("-").at(-1));
        const code = select.value as MaHieuUng;
        const nextEffects = [...old];
        nextEffects[index] = newEffect(code);
        editorDraft = collectEditorForm(form);
        editorDraft.skills[editorSkillIndex]!.danh_sach_hieu_ung = nextEffects;
      } catch (error) { message = error instanceof Error ? error.message : "Không đổi được effect."; }
    }
    onChange();
  }));
  document.querySelectorAll<HTMLButtonElement>("[data-effect-move], [data-effect-remove]").forEach((button) => button.addEventListener("click", () => {
    const form = document.querySelector<HTMLFormElement>("#dev-content-form");
    if (!form) return;
    try {
      editorDraft = collectEditorForm(form);
      const effects = editorDraft.skills[editorSkillIndex]!.danh_sach_hieu_ung;
      const index = Number(button.dataset.effectMove ?? button.dataset.effectRemove);
      if (button.dataset.effectMove !== undefined) { const next = index + Number(button.dataset.delta); [effects[index], effects[next]] = [effects[next]!, effects[index]!]; }
      else effects.splice(index, 1);
      onChange();
    } catch (error) { message = error instanceof Error ? error.message : "Không cập nhật được effect."; onChange(); }
  }));
  document.querySelector<HTMLFormElement>("#dev-sandbox-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    try {
      const seed = Number(data.get("seed"));
      const control = data.get("control") === "ai" ? "AI" : "NGUOI_CHOI";
      sandbox.start({ teamA: readTeamSetup(form, "a", control), teamB: readTeamSetup(form, "b", control), seed, contentVersion: getDevContentVersion(), classes: allClasses });
      message = "";
    } catch (error) { message = error instanceof Error ? error.message : "Không thể dựng trận sandbox."; }
    onChange();
  });
  document.querySelectorAll<HTMLElement>("[data-dev-action]").forEach((button) => button.addEventListener("click", () => {
    const action = button.dataset.devAction;
    if (action === "add-effect") {
      const form = document.querySelector<HTMLFormElement>("#dev-content-form");
      if (form) { try { editorDraft = collectEditorForm(form); const code = new FormData(form).get("new-effect") as MaHieuUng; editorDraft.skills[editorSkillIndex]!.danh_sach_hieu_ung.push(newEffect(code)); } catch (error) { message = error instanceof Error ? error.message : "Không thêm được effect."; } }
    }
    else if (action === "new-skill") {
      try {
        const form = document.querySelector<HTMLFormElement>("#dev-content-form");
        if (form) editorDraft = collectEditorForm(form);
        const id = `${editorDraft.class_id}:dev-skill-${editorDraft.skills.length + 1}`;
        if (editorDraft.skills.some((skill) => skill.id === id)) throw new Error("Mã skill này đã tồn tại trong bản nháp.");
        editorDraft.skills.push({ id, ma_ky_nang: id.toUpperCase().replaceAll(/[^A-Z0-9]+/g, "_"), ten_hien_thi: "Skill mới · Draft", mo_ta: "Bản nháp cần được thiết kế và kiểm thử.", class_id: editorDraft.class_id, hoi_chieu_luot: 1, chi_phi_mp: 10, trang_thai: "HOAT_DONG", danh_sach_hieu_ung: [newEffect("EFF_DMG_DIRECT")] });
        editorSkillIndex = editorDraft.skills.length - 1;
      } catch (error) { message = error instanceof Error ? error.message : "Không tạo được skill draft."; }
    }
    else if (action === "run-batch") {
      const form = document.querySelector<HTMLFormElement>("#dev-sandbox-form");
      if (form) {
        try {
          const data = new FormData(form);
          const seed = Number(data.get("seed"));
          const count = Math.max(1, Math.min(100, Number(data.get("batch-count")) || 1));
          const report = runAiBatch({ teamA: readTeamSetup(form, "a", "AI"), teamB: readTeamSetup(form, "b", "AI"), seed, count });
          batchReport = report;
          message = "";
          tab = "sandbox";
        } catch (error) { message = error instanceof Error ? error.message : "Không chạy được batch AI."; }
      }
    }
    else if (action === "clear-batch") batchReport = null;
    else if (action === "validate-content") {
      const form = document.querySelector<HTMLFormElement>("#dev-content-form");
      try { if (form) editorDraft = collectEditorForm(form); const findings = validateDevContent(editorDraft); message = findings.map((item) => `${item.level}: ${item.title} — ${item.detail}`).join("\n"); }
      catch (error) { message = error instanceof Error ? error.message : "Validation thất bại."; }
      tab = "content";
    }
    else if (action === "wallet-10" || action === "wallet-100") { const amount = action === "wallet-10" ? 10 : 100; updateDevProgress((current) => ({ ...current, wallet: current.wallet + amount })); progressionMessage = `Dev Wallet +${amount}.`; }
    else if (action === "reset-progress") { updateDevProgress(() => ({ wallet: 0, cleared: [], owned: [] })); gachaRuns = []; progressionMessage = "Đã reset Dev/Test data riêng. Player save không thay đổi."; }
    else if (action === "test-first-clear" || action === "test-replay") {
      try { const result = grantDevClear("dev-stage-test", 100); progressionMessage = result.firstClear ? `First-clear test: +${result.amount} Hương Hỏa ảo.` : "Replay test: stage đã clear, không nhận Hương Hỏa."; }
      catch (error) { progressionMessage = error instanceof Error ? error.message : "Không chạy được progression test."; }
    }
    else if (action === "unlock-dev") {
      try { const id = document.querySelector<HTMLSelectElement>('[name="dev-unlock-target"]')?.value; if (!id) throw new Error("Chọn nhân vật cần unlock."); const progress = unlockDevContent(id); progressionMessage = `Unlock test hoàn tất. Dev Wallet còn ${progress.wallet}.`; }
      catch (error) { progressionMessage = error instanceof Error ? error.message : "Không chạy được unlock test."; }
    }
    else if (action === "clear-gacha") { gachaRuns = []; progressionMessage = "Đã xóa kết quả test trên màn hình."; }
    else if (action === "reset") sandbox.reset();
    else if (action === "rerun") { tab = "sandbox"; document.querySelector<HTMLFormElement>("#dev-sandbox-form")?.requestSubmit(); return; }
    else if (action === "step-ai") { const result = sandbox.actAi(); if (!result.ok) message = result.loi.mo_ta; }
    else if (action === "run-ai") { for (let index = 0; index < 150; index++) { const match = sandbox.current(); if (!match || match.trang_thai !== "DANG_DIEN_RA") break; const result = sandbox.actAi(); if (!result.ok) { message = result.loi.mo_ta; break; } } }
    else if (action === "pass") { const result = sandbox.act({ bo_luot: true }); if (!result.ok) message = result.loi.mo_ta; }
    onChange();
  }));
  document.querySelectorAll<HTMLButtonElement>("[data-dev-skill]").forEach((button) => button.addEventListener("click", () => {
    const skillId = button.dataset.devSkill!;
    const chosen = document.querySelector<HTMLSelectElement>(`[data-target-for="${CSS.escape(skillId)}"]`)?.value;
    const result = sandbox.act({ ky_nang_id: skillId, target_actor_id: chosen || button.dataset.devTarget || undefined });
    if (!result.ok) message = result.loi.mo_ta;
    selectedTarget = "";
    onChange();
  }));
}

