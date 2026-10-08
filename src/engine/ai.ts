import { AI_TRONG_SO, CC_KHOA, MA_KHONG_CHE, NHOM_CAM_SILENCE, TRAN_KHIEN_HP } from "./constants.js";
import { atkHienTai, defHienTai, song } from "./actors.js";
import type { ActorState, AiArchetype, Doi, HieuUngCauHinh, KyNangSnapshot, TranDau } from "./types.js";
import { LoiLuatEngine } from "./validation.js";

export type LuaChonAI = { ky_nang_id: string; target_actor_id?: string; diem: number };

export function chonHanhDongAI(tran: TranDau, actorId = tran.trang_thai_chien_dau.actor_dang_di): LuaChonAI | null {
  const state = tran.trang_thai_chien_dau;
  const actor = state.actors.find((a) => a.actor_id === actorId);
  const content = tran.du_lieu_noi_dung_snapshot.actors[actorId];
  if (!actor || !content || actor.dieu_khien !== "AI" || !song(actor)) throw new LoiLuatEngine("AI_ACTOR_KHONG_HOP_LE", "Không tìm thấy actor AI sống phù hợp.");

  const candidates = state.actors.filter(song);
  const enemies = candidates.filter((a) => a.doi !== actor.doi);
  const allies = candidates.filter((a) => a.doi === actor.doi);
  const maxThreat = Math.max(1, ...enemies.map((a) => threat(tran, a)));
  const options: Array<{ skill: KyNangSnapshot; target: ActorState | null; components: Components }> = [];

  for (const skill of content.ky_nang) {
    if (skill.trang_thai !== "HOAT_DONG" || (actor.cooldowns[skill.id] ?? 0) > 0 || skill.chi_phi_mp > actor.mp_hien_tai) continue;
    if (has(actor, "EFF_SILENCE") && skill.danh_sach_hieu_ung.some((e) => NHOM_CAM_SILENCE.has(registryGroup(e)))) continue;
    if (has(actor, "EFF_ROOT") && skill.danh_sach_hieu_ung.some((e) => e.doi_tuong !== "BAN_THAN")) continue;
    const targetMode = skill.danh_sach_hieu_ung.find((e) => e.doi_tuong === "MOT_DICH" || e.doi_tuong === "MOT_DONG_DOI")?.doi_tuong;
    const targets = targetMode === "MOT_DICH" ? enemies : targetMode === "MOT_DONG_DOI" ? allies : [null];
    for (const target of targets) {
      options.push({ skill, target, components: scoreSkill(tran, actor, skill, target, maxThreat) });
    }
  }
  if (!options.length) return null;
  const archetype = chooseArchetype(content.ai_archetype ?? "AGGRESSIVE", options, allies, enemies);
  const weights = AI_TRONG_SO[archetype];
  const scored = options.map((option) => ({
    ...option,
    score: weights.w_DMG * option.components.DMG + weights.w_KILL * option.components.KILL +
      weights.w_CC * option.components.CC + weights.w_SUP * option.components.SUP + weights.w_MOD * option.components.MOD,
  }));
  scored.sort((a, b) => b.score - a.score || content.ky_nang.findIndex((x) => x.id === a.skill.id) - content.ky_nang.findIndex((x) => x.id === b.skill.id) ||
    (a.target?.thu_tu_uu_tien ?? -1) - (b.target?.thu_tu_uu_tien ?? -1));
  const best = scored[0]!;
  if (best.score <= 0) return null;
  return { ky_nang_id: best.skill.id, target_actor_id: best.target?.actor_id, diem: best.score };
}

type Components = { DMG: number; KILL: number; CC: number; SUP: number; MOD: number };
function empty(): Components { return { DMG: 0, KILL: 0, CC: 0, SUP: 0, MOD: 0 }; }

function scoreSkill(tran: TranDau, source: ActorState, skill: KyNangSnapshot, selected: ActorState | null, maxThreat: number): Components {
  const result = empty();
  let fixedTargetForSelector = selected;
  for (const effect of skill.danh_sach_hieu_ung) {
    const resolved = resolveAiTargets(tran, source, effect, fixedTargetForSelector);
    if ((effect.doi_tuong === "MOT_DICH" || effect.doi_tuong === "MOT_DONG_DOI") && resolved[0]) fixedTargetForSelector = resolved[0];
    for (const target of resolved) scoreEffect(tran, source, target, effect, maxThreat, result);
  }
  return result;
}

function resolveAiTargets(tran: TranDau, source: ActorState, effect: HieuUngCauHinh, selected: ActorState | null): ActorState[] {
  const alive = tran.trang_thai_chien_dau.actors.filter(song);
  switch (effect.doi_tuong) {
    case "BAN_THAN": return [source];
    case "MOT_DICH": return selected && selected.doi !== source.doi ? [selected] : alive.filter((a) => a.doi !== source.doi).slice(0, 1);
    case "MOT_DONG_DOI": return selected && selected.doi === source.doi ? [selected] : alive.filter((a) => a.doi === source.doi).slice(0, 1);
    case "TAT_CA_DICH": return alive.filter((a) => a.doi !== source.doi);
    case "TAT_CA_DONG_DOI": return alive.filter((a) => a.doi === source.doi);
    case "NGAU_NHIEN_N_DICH": return alive.filter((a) => a.doi !== source.doi).sort((a, b) => a.thu_tu_uu_tien - b.thu_tu_uu_tien).slice(0, 1);
  }
}

function scoreEffect(tran: TranDau, source: ActorState, target: ActorState, effect: HieuUngCauHinh, maxThreat: number, score: Components): void {
  const p = effect.tham_so;
  const contentSource = tran.du_lieu_noi_dung_snapshot.actors[source.actor_id]!;
  const contentTarget = tran.du_lieu_noi_dung_snapshot.actors[target.actor_id]!;
  const ehp = Math.max(1, target.hp_hien_tai + target.shield_hien_tai);
  const hpPct = target.hp_hien_tai / target.hp_toi_da;
  const danger = threat(tran, target) / maxThreat;
  const damageFor = (trueDamage = false) => {
    const atk = atkHienTai(source, contentSource.chi_so_cuoi.atk);
    const def = defHienTai(target, contentTarget.chi_so_cuoi.def);
    return trueDamage ? Math.round(atk * p.he_so) : Math.max(1, Math.round(atk * p.he_so * 100 / (100 + def)));
  };
  switch (effect.ma_hieu_ung) {
    case "EFF_DMG_DIRECT": case "EFF_DMG_AOE": case "EFF_DMG_TRUE": {
      const damage = damageFor(effect.ma_hieu_ung === "EFF_DMG_TRUE");
      score.DMG += Math.min(damage, ehp) / ehp * (0.5 + 0.5 * danger);
      if (damage >= ehp) score.KILL += 0.5 + 0.5 * danger;
      break;
    }
    case "EFF_DMG_DOT": {
      const damage = p.sat_thuong_moi_luot * p.so_luot;
      score.DMG += 0.7 * Math.min(damage, ehp) / ehp * (0.5 + 0.5 * danger);
      break;
    }
    case "EFF_STUN": case "EFF_SILENCE": case "EFF_ROOT": case "EFF_SLOW": {
      const ccWeight = effect.ma_hieu_ung === "EFF_STUN" ? 1 : effect.ma_hieu_ung === "EFF_SILENCE" ? 0.6 : effect.ma_hieu_ung === "EFF_ROOT" ? 0.4 : 0.5;
      const active = target.debuff.some((s) => CC_KHOA.has(s.ma_hieu_ung));
      const resisted = CC_KHOA.has(effect.ma_hieu_ung) && (active || target.khang_cc > 0);
      const slowAlready = effect.ma_hieu_ung === "EFF_SLOW" && target.debuff.some((s) => s.ma_hieu_ung === "EFF_SLOW");
      if (!resisted && !slowAlready) score.CC += ccWeight * danger;
      break;
    }
    case "EFF_HEAL": case "EFF_HOT": case "EFF_SHIELD": {
      const raw = effect.ma_hieu_ung === "EFF_SHIELD" ? p.luong_hap_thu : effect.ma_hieu_ung === "EFF_HOT" ? p.luong_moi_luot * p.so_luot * 0.7 :
        Number.isInteger(p.gia_tri) ? p.gia_tri : Math.round(target.hp_toi_da * p.gia_tri);
      const missing = Math.max(0, target.hp_toi_da - target.hp_hien_tai);
      const shieldRoom = Math.max(0, TRAN_KHIEN_HP * target.hp_toi_da - target.shield_hien_tai);
      const effective = effect.ma_hieu_ung === "EFF_SHIELD" ? Math.min(raw, shieldRoom) : Math.min(raw, missing);
      score.SUP += effective / target.hp_toi_da * (1 + (1 - hpPct));
      break;
    }
    case "EFF_CLEANSE": {
      const debuffs = [...target.debuff].sort((a, b) => Number(MA_KHONG_CHE.has(b.ma_hieu_ung)) - Number(MA_KHONG_CHE.has(a.ma_hieu_ung)));
      score.SUP += 0.3 * debuffs.slice(0, p.so_luong_go).reduce((sum, s) => sum + (MA_KHONG_CHE.has(s.ma_hieu_ung) ? 2 : 1), 0);
      break;
    }
    case "EFF_DISPEL": score.MOD += 0.25 * Math.min(p.so_luong_go, target.buff.length); break;
    case "EFF_BUFF_ATK": case "EFF_BUFF_DEF": case "EFF_BUFF_SPD":
      if (!target.buff.some((s) => s.ma_hieu_ung === effect.ma_hieu_ung)) score.MOD += 0.25;
      break;
    case "EFF_DEBUFF_ATK": case "EFF_DEBUFF_DEF":
      if (!target.debuff.some((s) => s.ma_hieu_ung === effect.ma_hieu_ung)) score.MOD += 0.25 * danger;
      break;
    case "EFF_LIFESTEAL": break;
  }
}

function chooseArchetype(config: AiArchetype, options: Array<{ components: Components }>, allies: ActorState[], enemies: ActorState[]): keyof typeof AI_TRONG_SO {
  if (config !== "ADAPTIVE") return config;
  if (allies.some((a) => a.hp_hien_tai / a.hp_toi_da <= 0.35) && options.some((o) => o.components.SUP > 0)) return "DEFENSIVE";
  if (options.some((o) => o.components.KILL > 0)) return "AGGRESSIVE";
  if (allies.length < enemies.length) return "CONTROL";
  return "AGGRESSIVE";
}

function threat(tran: TranDau, actor: ActorState): number {
  return atkHienTai(actor, tran.du_lieu_noi_dung_snapshot.actors[actor.actor_id]!.chi_so_cuoi.atk) * actor.spd_hien_tai;
}
function has(actor: ActorState, code: string): boolean { return actor.debuff.some((e) => e.ma_hieu_ung === code); }
function registryGroup(effect: HieuUngCauHinh): string { return REGISTRY_19[effect.ma_hieu_ung].nhom; }
import { REGISTRY_19 } from "./registry.js";
