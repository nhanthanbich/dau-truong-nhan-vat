import { CC_KHOA, GIOI_HAN_HANH_DONG, KHANG_CC_SO_LUOT, MA_KHONG_CHE, NHOM_CAM_SILENCE, PHIEN_BAN_ENGINE } from "./constants.js";
import { atkHienTai, capNhatSpd, cloneTran, dangMangCcKhoa, defHienTai, doiKhac, loaiKhoiSong, sapXepUuTien, song, themStatus, tranKhien } from "./actors.js";
import { chuoiRong, sauHanhDong, xacDinhActorDauTienHoacKe } from "./atb.js";
import { chonHanhDongAI } from "./ai.js";
import { chonNgauNhienIndex, hashSeedU32 } from "./rng.js";
import { tinhChiSoCuoi } from "./stats.js";
import { LoiLuatEngine, validateActorInput, validateSnapshotContent } from "./validation.js";
import type { ActorContentSnapshot, ActorState, ActionInput, BatDauTranInput, Doi, HieuUngCauHinh, HieuUngLog, KyNangSnapshot, LyDoBoLuot, NhatKyLuot, NoiTaiSnapshot, StatusInstance, TranDau, TriggerNoiTai, TurnResult } from "./types.js";

type Work = {
  tran: TranDau;
  log: NhatKyLuot;
  nextInstanceId: number;
  hpDamageByActor: Map<string, number>;
  hpDamageBySource: Map<string, number>;
  lastDamageBySource: Map<string, number>;
  passiveChain: boolean;
  rngRolls: { rng_state_truoc: number; actor_chon: string }[];
  khangCcSetThisAction: Set<string>;
};

const PASSIVE_ORDER: TriggerNoiTai[] = ["KHI_SU_DUNG_SKILL", "KHI_GAY_SAT_THUONG", "KHI_NHAN_SAT_THUONG"];
const TIER_ACTOR_MAX = 3;

export function batDauTran(input: BatDauTranInput): TranDau {
  if (input.loai === "PVP_DI_AI_CUNG_NHAU") throw new LoiLuatEngine("CHE_DO_CHUA_HO_TRO", "Co-op PvP đang được bảo lưu.");
  // A1: PvE is always TU_DO and applies the stored tier multipliers.
  const cheDoTier = input.loai === "PVE_DOI_KHANG" || input.loai === "PVE_DI_AI" ? "TU_DO" : input.che_do_tier;
  if (input.doi_a.length < 1 || input.doi_a.length > TIER_ACTOR_MAX || input.doi_b.length < 1 || input.doi_b.length > TIER_ACTOR_MAX) {
    throw new LoiLuatEngine("DOI_HINH_KHONG_HOP_LE", "Mỗi đội phải có từ 1 đến 3 actor.");
  }
  for (const side of [input.doi_a, input.doi_b]) {
    const ids = side.map((actor) => actor.nhan_vat_id).filter((id): id is string => id !== null);
    if (new Set(ids).size !== ids.length) throw new LoiLuatEngine("NHAN_VAT_TRUNG", "Một đội hình không được chứa cùng nhân vật hai lần.");
    if (side.filter((a) => a.phan_loai === "LINH_THAN").length > 1) throw new LoiLuatEngine("VUOT_TRAN_LINH_THAN", "Mỗi đội tối đa một Linh Thần.");
  }

  const actors: ActorState[] = [];
  const contentByActor: Record<string, ActorContentSnapshot> = {};
  const addSide = (side: BatDauTranInput["doi_a"], doi: Doi): void => {
    side.forEach((inputActor, index) => {
      validateActorInput(inputActor);
      const actorId = `${doi === "DOI_A" ? "A" : "B"}${index + 1}`;
      const stats = tinhChiSoCuoi(inputActor.chi_so_nen, inputActor.phan_bo_diem, inputActor.tier, cheDoTier);
      const actorContent: ActorContentSnapshot = {
        actor_id: actorId,
        class_id: inputActor.class_id,
        class_ma: inputActor.class_ma,
        ten_class: inputActor.ten_class,
        ten_co_dinh: inputActor.ten_co_dinh,
        phan_loai: inputActor.phan_loai,
        la_hero_preset: inputActor.la_hero_preset,
        chi_so_nen: inputActor.chi_so_nen,
        tier: inputActor.tier,
        tier_seed: inputActor.tier_seed,
        he_so_tier_ap_dung: stats.he_so_tier_ap_dung,
        phan_bo_diem: inputActor.phan_bo_diem,
        he_so_quy_doi: HE_SO_QUY_DOI,
        chi_so_cuoi: stats.chi_so_cuoi,
        noi_tai: structuredClone(inputActor.noi_tai),
        ky_nang: structuredClone(inputActor.ky_nang),
        ai_archetype: inputActor.ai_archetype,
      };
      validateSnapshotContent(actorContent);
      contentByActor[actorId] = actorContent;
      actors.push({
        actor_id: actorId, doi, vi_tri: index + 1, dieu_khien: inputActor.dieu_khien,
        nguoi_choi_id: inputActor.nguoi_choi_id, nhan_vat_id: inputActor.nhan_vat_id,
        ten_hien_thi: inputActor.ten_hien_thi, thu_tu_uu_tien: 2 * index + (doi === "DOI_A" ? 0 : 1),
        hp_hien_tai: stats.chi_so_cuoi.hp, hp_toi_da: stats.chi_so_cuoi.hp,
        mp_hien_tai: stats.chi_so_cuoi.mp, mp_toi_da: stats.chi_so_cuoi.mp, shield_hien_tai: 0,
        spd_hien_tai: stats.chi_so_cuoi.spd, thanh_tich_luy: 0, khang_cc: 0,
        buff: [], debuff: [], dot: [], hot: [], cooldowns: {}, so_lan_hanh_dong: 0,
      });
    });
  };
  addSide(input.doi_a, "DOI_A");
  addSide(input.doi_b, "DOI_B");

  const seed = input.rng_seed >>> 0;
  const tran: TranDau = {
    id: input.tran_dau_id,
    loai: input.loai,
    trang_thai: "DANG_DIEN_RA",
    ket_qua: null,
    actor_ids_thang: [],
    trang_thai_chien_dau: {
      actors,
      actor_dang_di: actors[0]!.actor_id,
      so_luot: 1,
      chuoi_luot: chuoiRong(),
      rng_seed: seed,
      rng_state: seed,
    },
    du_lieu_noi_dung_snapshot: { actors: contentByActor },
    nhat_ky_luot_danh: [],
    phien_ban_engine: PHIEN_BAN_ENGINE,
    che_do_tier: cheDoTier,
    man_choi_id: input.man_choi_id,
    ket_qua_tien_trinh: null,
  };

  const initLog: HieuUngLog[] = [];
  const initPassives: { actor_id: string; ma_noi_tai: string; trigger: TriggerNoiTai }[] = [];
  let instanceId = 1;
  for (const actor of sapXepUuTien(actors)) {
    const passive = contentByActor[actor.actor_id]!.noi_tai;
    if (passive.kich_hoat !== "BAT_DAU_TRAN") continue;
    const work = makeWork(tran, instanceId, true);
    applyPassive(work, actor, passive, "BAT_DAU_TRAN");
    initLog.push(...work.log.hieu_ung_ap_dung);
    initPassives.push(...work.log.passive_kich_hoat);
    instanceId = work.nextInstanceId;
  }
  tran.su_kien_khoi_tao = initLog;
  tran.passive_khoi_tao = initPassives;
  xacDinhActorDauTienHoacKe(tran.trang_thai_chien_dau);
  return tran;
}

import { HE_SO_QUY_DOI } from "./constants.js";

export function resolveTurn(current: TranDau, action: ActionInput, callerId: string | null, trusted = false): TurnResult {
  try {
    const tran = cloneTran(current);
    const state = tran.trang_thai_chien_dau;
    if (tran.trang_thai !== "DANG_DIEN_RA") throw new LoiLuatEngine("TRAN_DA_KET_THUC", "Trận đấu đã kết thúc.");
    const actor = state.actors.find((a) => a.actor_id === state.actor_dang_di);
    if (!actor || !song(actor)) throw new LoiLuatEngine("ACTOR_DANG_DI_KHONG_HOP_LE", "Actor đang đi không tồn tại hoặc đã chết.");
    const content = tran.du_lieu_noi_dung_snapshot.actors[actor.actor_id];
    if (!content) throw new LoiLuatEngine("SNAPSHOT_THIEU_ACTOR", "Snapshot thiếu dữ liệu actor; không fallback sang content đang sống.");

    if (!trusted) {
      if (actor.dieu_khien === "AI") throw new LoiLuatEngine("AI_KHONG_NHAN_CLIENT_ACTION", "Lượt AI chỉ được gọi từ luồng tin cậy.");
      if (actor.nguoi_choi_id !== callerId) throw new LoiLuatEngine("KHONG_CO_QUYEN_DIEU_KHIEN", "Người gọi không sở hữu actor đang đi.");
    }

    const log: NhatKyLuot = {
      so_luot: state.so_luot, actor_id: actor.actor_id, actor_doi: actor.doi,
      ten_hien_thi_actor: actor.ten_hien_thi, hanh_dong: "BO_LUOT",
      ky_nang_id: null, target_actor_id: null, mp_tieu_ton: 0,
      ly_do_bo_luot: null, so_lua_chon_hop_le: 0,
      hieu_ung_ap_dung: [], passive_kich_hoat: [], actor_chet: [],
    };
    const work = makeWork(tran, maxInstanceId(tran), false, log);
    state.rng_state >>>= 0;

    actor.mp_hien_tai = Math.min(actor.mp_toi_da, actor.mp_hien_tai + content.chi_so_cuoi.mp_hoi);
    applyPassiveForTrigger(work, actor, "BAT_DAU_LUOT");

    const autoReason = xacDinhBoLuotTuDong(tran, actor, content, actor.mp_hien_tai);
    const autoAction = autoReason !== null;
    let resolvedAction = action;
    if (action.ai_tu_dong) {
      if (!trusted || actor.dieu_khien !== "AI") throw new LoiLuatEngine("AI_KHONG_NHAN_CLIENT_ACTION", "Yêu cầu chọn hành động AI chỉ hợp lệ trong luồng tin cậy.");
      const choice = autoAction ? null : chonHanhDongAI(tran, actor.actor_id);
      resolvedAction = choice ? { ky_nang_id: choice.ky_nang_id, target_actor_id: choice.target_actor_id } : { bo_luot: true };
    }
    const isPass = autoAction || resolvedAction.bo_luot === true;
    if (!trusted && !autoAction && isPass === Boolean(resolvedAction.ky_nang_id)) {
      throw new LoiLuatEngine("ACTION_KHONG_HOP_LE", "Chọn đúng một trong dùng skill hoặc BỎ_LƯỢT.");
    }
    log.hanh_dong = isPass ? "BO_LUOT" : "SKILL";
    log.ly_do_bo_luot = autoReason ?? (isPass ? "CHU_DONG" : null);

    if (!autoAction && !isPass) {
      const skillId = resolvedAction.ky_nang_id;
      const skill = skillId ? content.ky_nang.find((s) => s.id === skillId) : undefined;
      if (!skill || skill.trang_thai !== "HOAT_DONG") throw new LoiLuatEngine("SKILL_KHONG_TRONG_SNAPSHOT", "Skill không có trong snapshot hoặc không hoạt động.");
      const cooldown = actor.cooldowns[skill.id] ?? 0;
      if (cooldown > 0) throw new LoiLuatEngine("SKILL_DANG_HOI", "Skill đang hồi chiêu.");
      if (actor.mp_hien_tai < skill.chi_phi_mp) throw new LoiLuatEngine("KHONG_DU_MP", "Không đủ MP để dùng skill.");
      validateControlGuards(actor, skill);
      validateChosenTarget(tran, actor, skill, resolvedAction.target_actor_id ?? null);
      log.ky_nang_id = skill.id;
      log.mp_tieu_ton = skill.chi_phi_mp;
      log.hanh_dong = "SKILL";
      actor.mp_hien_tai -= skill.chi_phi_mp;
      const choices = getAvailableSkills(actor, content.ky_nang).length;
      log.so_lua_chon_hop_le = choices;
      for (const effect of skill.danh_sach_hieu_ung) {
        applyConfiguredEffect(work, actor, effect, "SKILL", resolvedAction.target_actor_id ?? null);
      }
      applyPassiveForTrigger(work, actor, "KHI_SU_DUNG_SKILL");
      if ((work.hpDamageBySource.get(actor.actor_id) ?? 0) > 0) applyPassiveForTrigger(work, actor, "KHI_GAY_SAT_THUONG");
      for (const receiver of sapXepUuTien(state.actors)) {
        if (receiver.hp_hien_tai > 0 && (work.hpDamageByActor.get(receiver.actor_id) ?? 0) > 0) {
          applyPassiveForTrigger(work, receiver, "KHI_NHAN_SAT_THUONG");
        }
      }
      actor.cooldowns[skill.id] = skill.hoi_chieu_luot;
    } else {
      log.so_lua_chon_hop_le = getAvailableSkills(actor, content.ky_nang).length;
    }

    tickDotHot(work);
    clampAndRemoveDeaths(work);
    const outcome = checkVictory(tran);
    if (outcome) {
      tran.trang_thai = "KET_THUC";
      tran.ket_qua = outcome.ket_qua;
      tran.actor_ids_thang = outcome.actor_ids_thang;
    } else {
      finishActorTurn(tran, actor, log.ky_nang_id, work.khangCcSetThisAction);
      sauHanhDong(state, actor.actor_id);
      state.so_luot += 1;
      xacDinhActorDauTienHoacKe(state);
    }

    log.actor_chet = state.actors.filter((a) => a.hp_hien_tai <= 0 && current.trang_thai_chien_dau.actors.find((old) => old.actor_id === a.actor_id)?.hp_hien_tai! > 0)
      .sort((a, b) => a.thu_tu_uu_tien - b.thu_tu_uu_tien).map((a) => a.actor_id);
    if (outcome) state.so_luot += 1;
    log.rng_state_truoc = work.rngStateBefore;
    log.rng_actor_chon = work.rngChosenActor ?? undefined;
    log.rng_rolls = work.rngRolls.length ? work.rngRolls : undefined;
    tran.nhat_ky_luot_danh.push(log);
    return { ok: true, tran };
  } catch (error) {
    if (error instanceof LoiLuatEngine) return { ok: false, loi: { ma: error.ma, mo_ta: error.message } };
    return { ok: false, loi: { ma: "ENGINE_ERROR", mo_ta: error instanceof Error ? error.message : "Lỗi engine không xác định." } };
  }
}

/** Pure TIMEOUT mutation; persistence/runtime must serialize it with turns and commit atomically. */
export function resolveTimeout(current: TranDau, timedOutActorId: string): TurnResult {
  try {
    const tran = cloneTran(current);
    if (tran.trang_thai !== "DANG_DIEN_RA") throw new LoiLuatEngine("TRAN_DA_KET_THUC", "Trận đấu đã kết thúc.");
    const state = tran.trang_thai_chien_dau;
    if (state.actor_dang_di !== timedOutActorId) throw new LoiLuatEngine("TIMEOUT_SAI_ACTOR", "Timeout không khớp actor đang tới lượt.");
    const actor = state.actors.find((item) => item.actor_id === timedOutActorId);
    if (!actor || actor.dieu_khien !== "NGUOI_CHOI") throw new LoiLuatEngine("TIMEOUT_ACTOR_KHONG_HOP_LE", "Timeout chỉ áp dụng cho actor người chơi đang đi.");
    const winner = doiKhac(actor.doi);
    const log: NhatKyLuot = {
      so_luot: state.so_luot, actor_id: actor.actor_id, actor_doi: actor.doi, ten_hien_thi_actor: actor.ten_hien_thi,
      hanh_dong: "TIMEOUT", ky_nang_id: null, target_actor_id: null, mp_tieu_ton: 0, ly_do_bo_luot: null,
      so_lua_chon_hop_le: 0, hieu_ung_ap_dung: [], passive_kich_hoat: [], actor_chet: [],
    };
    tran.trang_thai = "KET_THUC";
    tran.ket_qua = "CO_BEN_THANG";
    tran.actor_ids_thang = state.actors.filter((item) => item.doi === winner).map((item) => item.actor_id);
    state.so_luot += 1;
    tran.nhat_ky_luot_danh.push(log);
    return { ok: true, tran };
  } catch (error) {
    if (error instanceof LoiLuatEngine) return { ok: false, loi: { ma: error.ma, mo_ta: error.message } };
    return { ok: false, loi: { ma: "ENGINE_ERROR", mo_ta: error instanceof Error ? error.message : "Lỗi engine không xác định." } };
  }
}

type WorkState = Work & { rngStateBefore?: number; rngChosenActor?: string };
function makeWork(tran: TranDau, nextInstanceId: number, passiveChain: boolean, log?: NhatKyLuot): WorkState {
  const actualLog: NhatKyLuot = log ?? {
    so_luot: 0, actor_id: "", actor_doi: "DOI_A", ten_hien_thi_actor: "", hanh_dong: "BO_LUOT",
    ky_nang_id: null, target_actor_id: null, mp_tieu_ton: 0, ly_do_bo_luot: null, so_lua_chon_hop_le: 0,
    hieu_ung_ap_dung: [], passive_kich_hoat: [], actor_chet: [],
  };
  return { tran, log: actualLog, nextInstanceId, hpDamageByActor: new Map(), hpDamageBySource: new Map(), lastDamageBySource: new Map(), passiveChain, rngRolls: [], khangCcSetThisAction: new Set() } as WorkState;
}

function validateChosenTarget(tran: TranDau, source: ActorState, skill: KyNangSnapshot, targetId: string | null): void {
  if (!targetId) return;
  const selector = skill.danh_sach_hieu_ung.find((effect) => effect.doi_tuong === "MOT_DICH" || effect.doi_tuong === "MOT_DONG_DOI");
  if (!selector) return; // Area, random, and self effects resolve their own targets.
  const target = tran.trang_thai_chien_dau.actors.find((candidate) => candidate.actor_id === targetId);
  const sameSide = selector.doi_tuong === "MOT_DONG_DOI" ? target?.doi === source.doi : target?.doi !== source.doi;
  if (!target || !song(target) || !sameSide) {
    throw new LoiLuatEngine("TARGET_KHONG_HOP_LE", "Target không tồn tại, đã chết hoặc sai đội.");
  }
}

function maxInstanceId(tran: TranDau): number {
  let max = 0;
  for (const actor of tran.trang_thai_chien_dau.actors) for (const list of [actor.buff, actor.debuff, actor.dot, actor.hot]) {
    for (const item of list) max = Math.max(max, item.instance_id);
  }
  return max + 1;
}

export function xacDinhBoLuotTuDong(
  tran: TranDau,
  actor: ActorState,
  content = tran.du_lieu_noi_dung_snapshot.actors[actor.actor_id],
  mpSauHoi = actor.mp_hien_tai,
): LyDoBoLuot | null {
  if (!content) return null;
  if (actor.debuff.some((status) => status.ma_hieu_ung === "EFF_STUN")) return "BI_STUN";
  const silence = actor.debuff.some((status) => status.ma_hieu_ung === "EFF_SILENCE");
  const ready = content.ky_nang.filter((skill) => skill.trang_thai === "HOAT_DONG" && (actor.cooldowns[skill.id] ?? 0) === 0 && !isRootBlocked(actor, skill));
  const permitted = ready.filter((skill) => !silence || !skill.danh_sach_hieu_ung.some((effect) => NHOM_CAM_SILENCE.has(effectGroup(effect.ma_hieu_ung))));
  if (silence && permitted.length === 0 && ready.length > 0) return "BI_SILENCE";
  if (permitted.length > 0 && !permitted.some((skill) => skill.chi_phi_mp <= mpSauHoi)) return "KHONG_DU_MP";
  return null;
}

function getAvailableSkills(actor: ActorState, skills: KyNangSnapshot[]): KyNangSnapshot[] {
  return skills.filter((skill) => skill.trang_thai === "HOAT_DONG" && (actor.cooldowns[skill.id] ?? 0) === 0 && skill.chi_phi_mp <= actor.mp_hien_tai && !isSkillSilenced(actor, skill) && !isRootBlocked(actor, skill));
}

function isSkillSilenced(actor: ActorState, skill: KyNangSnapshot): boolean {
  return actor.debuff.some((e) => e.ma_hieu_ung === "EFF_SILENCE") && skill.danh_sach_hieu_ung.some((e) => NHOM_CAM_SILENCE.has(effectGroup(e.ma_hieu_ung)));
}

function effectGroup(code: string) {
  return (REGISTRY[code as keyof typeof REGISTRY]).nhom;
}
import { REGISTRY_19 as REGISTRY } from "./registry.js";

function isRootBlocked(actor: ActorState, skill: KyNangSnapshot): boolean {
  return actor.debuff.some((e) => e.ma_hieu_ung === "EFF_ROOT") && skill.danh_sach_hieu_ung.some((e) => e.doi_tuong !== "BAN_THAN");
}

function validateControlGuards(actor: ActorState, skill: KyNangSnapshot): void {
  if (isSkillSilenced(actor, skill)) throw new LoiLuatEngine("BI_SILENCE", "Không thể dùng skill hồi phục, buff hoặc tiện ích khi đang SILENCE.");
  if (isRootBlocked(actor, skill)) throw new LoiLuatEngine("BI_ROOT", "Khi ROOT, mọi effect của skill phải nhắm BAN_THAN.");
}

function applyPassiveForTrigger(work: WorkState, actor: ActorState, trigger: TriggerNoiTai): void {
  if (work.passiveChain || actor.hp_hien_tai <= 0) return;
  const passive = work.tran.du_lieu_noi_dung_snapshot.actors[actor.actor_id]?.noi_tai;
  if (passive?.kich_hoat === trigger && conditionSatisfied(actor, passive)) applyPassive(work, actor, passive, trigger);
}

function applyPassive(work: WorkState, actor: ActorState, passive: NoiTaiSnapshot, trigger: TriggerNoiTai): void {
  if (actor.hp_hien_tai <= 0 || !conditionSatisfied(actor, passive)) return;
  work.log.passive_kich_hoat.push({ actor_id: actor.actor_id, ma_noi_tai: passive.ma_noi_tai, trigger });
  const wasPassive = work.passiveChain;
  work.passiveChain = true;
  for (const effect of passive.danh_sach_hieu_ung) applyConfiguredEffect(work, actor, effect, "NOI_TAI", null);
  work.passiveChain = wasPassive;
}

function conditionSatisfied(actor: ActorState, passive: NoiTaiSnapshot): boolean {
  const condition = passive.dieu_kien as { loai?: string; gia_tri?: number };
  if (!condition.loai) return true;
  const hpPct = actor.hp_hien_tai / actor.hp_toi_da * 100;
  if (condition.loai === "HP_PCT_NHO_HON_BANG") return hpPct <= (condition.gia_tri ?? 0);
  if (condition.loai === "HP_PCT_LON_HON_BANG") return hpPct >= (condition.gia_tri ?? 0);
  return false;
}

function resolveTargets(work: WorkState, source: ActorState, effect: HieuUngCauHinh, chosenTarget: string | null): ActorState[] {
  const alive = work.tran.trang_thai_chien_dau.actors.filter(song);
  if (effect.doi_tuong === "BAN_THAN") return [source];
  if (effect.doi_tuong === "TAT_CA_DICH") return alive.filter((a) => a.doi !== source.doi).sort(byPriority);
  if (effect.doi_tuong === "TAT_CA_DONG_DOI") return alive.filter((a) => a.doi === source.doi).sort(byPriority);
  if (effect.doi_tuong === "NGAU_NHIEN_N_DICH") {
    const targets = alive.filter((a) => a.doi !== source.doi).sort(byPriority);
    if (!targets.length) return [];
    const before = work.tran.trang_thai_chien_dau.rng_state;
    const picked = chonNgauNhienIndex(before, targets.length);
    work.tran.trang_thai_chien_dau.rng_state = picked.state;
    work.rngStateBefore ??= before;
    work.rngChosenActor = targets[picked.index]!.actor_id;
    work.rngRolls.push({ rng_state_truoc: before, actor_chon: targets[picked.index]!.actor_id });
    return [targets[picked.index]!];
  }
  if (chosenTarget) {
    const chosen = work.tran.trang_thai_chien_dau.actors.find((a) => a.actor_id === chosenTarget);
    const sameSide = Boolean(chosen) && (effect.doi_tuong === "MOT_DONG_DOI" ? chosen!.doi === source.doi : chosen!.doi !== source.doi);
    if (!chosen || !sameSide) throw new LoiLuatEngine("TARGET_KHONG_HOP_LE", "Target không tồn tại trong trận hoặc sai đội.");
    work.log.target_actor_id ??= chosen.actor_id;
    return [chosen];
  }
  const candidates = alive.filter((a) => effect.doi_tuong === "MOT_DICH" ? a.doi !== source.doi : a.doi === source.doi);
  if (candidates.length === 1) return candidates;
  if (!chosenTarget) throw new LoiLuatEngine("THIEU_TARGET", "Cần chọn target_actor_id vì còn nhiều mục tiêu hợp lệ.");
  const target = candidates.find((a) => a.actor_id === chosenTarget);
  if (!target) throw new LoiLuatEngine("TARGET_KHONG_HOP_LE", "Target không tồn tại, đã chết hoặc sai đội.");
  work.log.target_actor_id ??= target.actor_id;
  return [target];
}

function applyConfiguredEffect(work: WorkState, source: ActorState, effect: HieuUngCauHinh, origin: "SKILL" | "NOI_TAI" | "DOT_HOT", chosenTarget: string | null): void {
  if (source.hp_hien_tai <= 0) return;
  if (["EFF_DMG_DIRECT", "EFF_DMG_AOE", "EFF_DMG_TRUE", "EFF_DMG_DOT"].includes(effect.ma_hieu_ung)) {
    work.lastDamageBySource.set(source.actor_id, 0);
  }
  const targets = resolveTargets(work, source, effect, chosenTarget);
  if (effect.doi_tuong === "MOT_DICH" || effect.doi_tuong === "MOT_DONG_DOI") {
    if (targets[0]) work.log.target_actor_id ??= targets[0].actor_id;
  }
  if (!targets.length) {
    work.log.hieu_ung_ap_dung.push({ ma_hieu_ung: effect.ma_hieu_ung, target_actor_id: null, target_doi: null, gia_tri: 0, bi_bo_qua: true, ly_do_bo_qua: "KHONG_CON_MUC_TIEU", nguon: origin });
    return;
  }
  if (effect.ma_hieu_ung === "EFF_LIFESTEAL") {
    const damage = work.lastDamageBySource.get(source.actor_id) ?? 0;
    const raw = Math.round(damage * effect.tham_so.phan_tram_hoi);
    const gained = Math.min(raw, source.hp_toi_da - source.hp_hien_tai);
    source.hp_hien_tai += gained;
    work.log.hieu_ung_ap_dung.push({ ma_hieu_ung: effect.ma_hieu_ung, target_actor_id: source.actor_id, target_doi: source.doi, gia_tri: gained, bi_bo_qua: false, nguon: origin });
    return;
  }
  for (const target of targets) {
    if (target.hp_hien_tai <= 0) {
      work.log.hieu_ung_ap_dung.push({ ma_hieu_ung: effect.ma_hieu_ung, target_actor_id: target.actor_id, target_doi: target.doi, gia_tri: 0, bi_bo_qua: true, ly_do_bo_qua: "TARGET_DA_CHE", nguon: origin });
      continue;
    }
    applyOneEffect(work, source, target, effect, origin);
  }
}

function applyOneEffect(work: WorkState, source: ActorState, target: ActorState, effect: HieuUngCauHinh, origin: "SKILL" | "NOI_TAI" | "DOT_HOT"): void {
  const { ma_hieu_ung: code, tham_so: p } = effect;
  let value = 0;
  let skipped: string | undefined;
  let capped = false;
  if (["EFF_DMG_DIRECT", "EFF_DMG_AOE", "EFF_DMG_TRUE"].includes(code)) {
    const sourceContent = work.tran.du_lieu_noi_dung_snapshot.actors[source.actor_id]!;
    const targetContent = work.tran.du_lieu_noi_dung_snapshot.actors[target.actor_id]!;
    const atk = atkHienTai(source, sourceContent.chi_so_cuoi.atk);
    const def = defHienTai(target, targetContent.chi_so_cuoi.def);
    const damage = code === "EFF_DMG_TRUE" ? Math.round(atk * p.he_so) : Math.max(1, Math.round(atk * p.he_so * 100 / (100 + def)));
    value = takeDamage(target, damage);
    trackDamage(work, source, target, value);
  } else if (code === "EFF_DMG_DOT" || code === "EFF_HOT") {
    const list = code === "EFF_DMG_DOT" ? target.dot : target.hot;
    const status = makeStatus(work, source, effect, code === "EFF_DMG_DOT" ? "SAT_THUONG" : "HOI_PHUC", origin);
    status.bo_qua_tick_luot_nay = true;
    themStatus(list, status, true);
    value = code === "EFF_DMG_DOT" ? p.sat_thuong_moi_luot : p.luong_moi_luot;
  } else if (["EFF_STUN", "EFF_SILENCE", "EFF_ROOT"].includes(code)) {
    if (dangMangCcKhoa(target)) skipped = "DANG_MANG_CC";
    else if (target.khang_cc > 0) skipped = "KHANG_CC";
    else {
      themStatus(target.debuff, makeStatus(work, source, effect, "KHONG_CHE", origin), false);
      value = p.so_luot;
    }
  } else if (code === "EFF_SLOW" || code === "EFF_DEBUFF_ATK" || code === "EFF_DEBUFF_DEF") {
    const status = makeStatus(work, source, effect, code === "EFF_SLOW" ? "KHONG_CHE" : "DEBUFF", origin);
    themStatus(target.debuff, status, true);
    if (code === "EFF_SLOW") capNhatSpd(target, work.tran.du_lieu_noi_dung_snapshot.actors[target.actor_id]!.chi_so_cuoi.spd);
    value = p.phan_tram_giam ?? p.gia_tri;
  } else if (code === "EFF_BUFF_ATK" || code === "EFF_BUFF_DEF" || code === "EFF_BUFF_SPD") {
    const status = makeStatus(work, source, effect, "BUFF", origin);
    themStatus(target.buff, status, true);
    if (code === "EFF_BUFF_SPD") capNhatSpd(target, work.tran.du_lieu_noi_dung_snapshot.actors[target.actor_id]!.chi_so_cuoi.spd);
    value = p.gia_tri;
  } else if (code === "EFF_SHIELD") {
    const max = tranKhien(target.hp_toi_da);
    const before = target.shield_hien_tai;
    target.shield_hien_tai = Math.min(max, before + p.luong_hap_thu);
    value = target.shield_hien_tai - before;
    capped = before + p.luong_hap_thu > max;
  } else if (code === "EFF_HEAL") {
    // Registry permits either a fixed integer or a decimal proportion of target max HP.
    const raw = Number.isInteger(p.gia_tri) ? p.gia_tri : Math.round(target.hp_toi_da * p.gia_tri);
    const before = target.hp_hien_tai;
    target.hp_hien_tai = Math.min(target.hp_toi_da, before + raw);
    value = target.hp_hien_tai - before;
  } else if (code === "EFF_CLEANSE") {
    const ordered = [...target.debuff].sort((a, b) => Number(MA_KHONG_CHE.has(b.ma_hieu_ung)) - Number(MA_KHONG_CHE.has(a.ma_hieu_ung)) || a.thu_tu_ap_dung - b.thu_tu_ap_dung);
    let removed = 0;
    for (const status of ordered) {
      if (removed >= p.so_luong_go) break;
      const idx = target.debuff.findIndex((x) => x.instance_id === status.instance_id);
      if (idx < 0) continue;
      const [gone] = target.debuff.splice(idx, 1);
      if (CC_KHOA.has(gone!.ma_hieu_ung)) target.khang_cc = KHANG_CC_SO_LUOT;
      removed++;
    }
    const removedLockCc = ordered.some((status) => CC_KHOA.has(status.ma_hieu_ung) &&
      !target.debuff.some((remaining) => remaining.instance_id === status.instance_id));
    if (removedLockCc) {
      target.khang_cc = KHANG_CC_SO_LUOT;
      work.khangCcSetThisAction.add(target.actor_id);
    }
    value = removed;
  } else if (code === "EFF_DISPEL") {
    const ordered = [...target.buff].sort((a, b) => a.thu_tu_ap_dung - b.thu_tu_ap_dung);
    let removed = 0;
    for (const status of ordered) {
      if (removed >= p.so_luong_go) break;
      const idx = target.buff.findIndex((x) => x.instance_id === status.instance_id);
      if (idx >= 0) { target.buff.splice(idx, 1); removed++; }
    }
    value = removed;
  }
  work.log.hieu_ung_ap_dung.push({ ma_hieu_ung: code, target_actor_id: target.actor_id, target_doi: target.doi, gia_tri: value, bi_bo_qua: Boolean(skipped), ly_do_bo_qua: skipped, nguon: origin, bi_cat_tran: capped || undefined });
}

function makeStatus(work: WorkState, source: ActorState, effect: HieuUngCauHinh, group: StatusInstance["nhom"], origin: StatusInstance["nguon"]): StatusInstance {
  return { instance_id: work.nextInstanceId++, ma_hieu_ung: effect.ma_hieu_ung, nhom: group, so_luot: effect.tham_so.so_luot ?? 0, tham_so: { ...effect.tham_so }, nguon_actor_id: source.actor_id, nguon: origin, thu_tu_ap_dung: work.nextInstanceId, bo_qua_tick_luot_nay: true };
}

function takeDamage(target: ActorState, amount: number): number {
  amount = Math.max(0, amount);
  const absorbed = Math.min(target.shield_hien_tai, amount);
  target.shield_hien_tai -= absorbed;
  const hpLoss = Math.min(target.hp_hien_tai, amount - absorbed);
  target.hp_hien_tai -= hpLoss;
  return hpLoss;
}

function trackDamage(work: WorkState, source: ActorState, target: ActorState, hpDamage: number): void {
  if (hpDamage <= 0) return;
  work.hpDamageByActor.set(target.actor_id, (work.hpDamageByActor.get(target.actor_id) ?? 0) + hpDamage);
  work.hpDamageBySource.set(source.actor_id, (work.hpDamageBySource.get(source.actor_id) ?? 0) + hpDamage);
  work.lastDamageBySource.set(source.actor_id, (work.lastDamageBySource.get(source.actor_id) ?? 0) + hpDamage);
}

function tickDotHot(work: WorkState): void {
  for (const actor of work.tran.trang_thai_chien_dau.actors) {
    if (!song(actor)) continue;
    for (const [list, code] of [[actor.dot, "EFF_DMG_DOT"], [actor.hot, "EFF_HOT"]] as const) {
      for (const status of [...list]) {
        if (status.bo_qua_tick_luot_nay) { status.bo_qua_tick_luot_nay = false; continue; }
        const amount = code === "EFF_DMG_DOT" ? status.tham_so.sat_thuong_moi_luot : status.tham_so.luong_moi_luot;
        let actual = 0;
        if (code === "EFF_DMG_DOT") {
          actual = takeDamage(actor, amount);
          const source = work.tran.trang_thai_chien_dau.actors.find((a) => a.actor_id === status.nguon_actor_id) ?? actor;
          trackDamage(work, source, actor, actual);
        } else {
          const before = actor.hp_hien_tai;
          actor.hp_hien_tai = Math.min(actor.hp_toi_da, actor.hp_hien_tai + amount);
          actual = actor.hp_hien_tai - before;
        }
        status.so_luot -= 1;
        work.log.hieu_ung_ap_dung.push({ ma_hieu_ung: code, target_actor_id: actor.actor_id, target_doi: actor.doi, gia_tri: actual, bi_bo_qua: false, nguon: "DOT_HOT" });
        if (status.so_luot <= 0) list.splice(list.findIndex((x) => x.instance_id === status.instance_id), 1);
      }
    }
  }
}

function finishActorTurn(tran: TranDau, actor: ActorState, usedSkillId: string | null, khangCcSetThisAction: Set<string>): void {
  if (!khangCcSetThisAction.has(actor.actor_id)) actor.khang_cc = Math.max(0, actor.khang_cc - 1);
  for (const [name, list] of [["buff", actor.buff], ["debuff", actor.debuff]] as const) {
    for (const status of [...list]) {
      if (status.so_luot <= 0) continue;
      if (status.bo_qua_tick_luot_nay) {
        status.bo_qua_tick_luot_nay = false;
        continue;
      }
      status.so_luot -= 1;
      if (status.so_luot <= 0) {
        const idx = list.findIndex((x) => x.instance_id === status.instance_id);
        if (idx >= 0) list.splice(idx, 1);
        if (name === "debuff" && CC_KHOA.has(status.ma_hieu_ung)) actor.khang_cc = KHANG_CC_SO_LUOT;
      }
    }
  }
  for (const [skillId, cooldown] of Object.entries(actor.cooldowns)) {
    if (cooldown > 0 && skillId !== usedSkillId) actor.cooldowns[skillId] = cooldown - 1;
  }
  capNhatSpd(actor, tran.du_lieu_noi_dung_snapshot.actors[actor.actor_id]!.chi_so_cuoi.spd);
}

function clampAndRemoveDeaths(work: WorkState): void {
  for (const actor of work.tran.trang_thai_chien_dau.actors) {
    actor.hp_hien_tai = Math.max(0, Math.min(actor.hp_toi_da, actor.hp_hien_tai));
    actor.mp_hien_tai = Math.max(0, Math.min(actor.mp_toi_da, actor.mp_hien_tai));
    actor.shield_hien_tai = Math.max(0, Math.min(tranKhien(actor.hp_toi_da), actor.shield_hien_tai));
    if (actor.hp_hien_tai <= 0) { actor.hp_hien_tai = 0; actor.shield_hien_tai = 0; loaiKhoiSong(actor); }
  }
}

function checkVictory(tran: TranDau): { ket_qua: "CO_BEN_THANG" | "HOA"; actor_ids_thang: string[] } | null {
  const aliveA = tran.trang_thai_chien_dau.actors.some((a) => a.doi === "DOI_A" && song(a));
  const aliveB = tran.trang_thai_chien_dau.actors.some((a) => a.doi === "DOI_B" && song(a));
  if (!aliveA && !aliveB) return { ket_qua: "HOA", actor_ids_thang: [] };
  if (!aliveA || !aliveB) {
    const winningSide = aliveA ? "DOI_A" : "DOI_B";
    return { ket_qua: "CO_BEN_THANG", actor_ids_thang: tran.trang_thai_chien_dau.actors.filter((a) => a.doi === winningSide).map((a) => a.actor_id) };
  }
  if (tran.trang_thai_chien_dau.so_luot + 1 >= GIOI_HAN_HANH_DONG) {
    const sideTotals = (doi: Doi) => {
      const team = tran.trang_thai_chien_dau.actors.filter((a) => a.doi === doi);
      return { hp: team.reduce((sum, a) => sum + a.hp_hien_tai, 0), max: team.reduce((sum, a) => sum + a.hp_toi_da, 0) };
    };
    const a = sideTotals("DOI_A");
    const b = sideTotals("DOI_B");
    const lhs = a.hp * b.max;
    const rhs = b.hp * a.max;
    if (lhs === rhs) return { ket_qua: "HOA", actor_ids_thang: [] };
    const winningSide = lhs > rhs ? "DOI_A" : "DOI_B";
    return { ket_qua: "CO_BEN_THANG", actor_ids_thang: tran.trang_thai_chien_dau.actors.filter((a) => a.doi === winningSide).map((a) => a.actor_id) };
  }
  return null;
}

function byPriority(a: ActorState, b: ActorState): number { return a.thu_tu_uu_tien - b.thu_tu_uu_tien; }
