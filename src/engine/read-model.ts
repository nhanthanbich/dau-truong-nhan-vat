import { NHOM_CAM_SILENCE } from "./constants.js";
import { xacDinhBoLuotTuDong } from "./combat.js";
import { REGISTRY_19 } from "./registry.js";
import { song } from "./actors.js";
import type { ActorState, HieuUngCauHinh, LuaChonHopLe, LuaChonHopLeSkill, TranDau } from "./types.js";

/** UI hint only. resolveTurn always validates the submitted action against canonical state. */
export function luaChonHopLe(tran: TranDau, actorId = tran.trang_thai_chien_dau.actor_dang_di): LuaChonHopLe {
  const actor = tran.trang_thai_chien_dau.actors.find((item) => item.actor_id === actorId);
  const content = tran.du_lieu_noi_dung_snapshot.actors[actorId];
  if (tran.trang_thai !== "DANG_DIEN_RA" || !actor || !content || !song(actor) || actorId !== tran.trang_thai_chien_dau.actor_dang_di) {
    throw new Error("Actor không phải actor sống đang tới lượt trong snapshot.");
  }

  const mpAfterRecovery = Math.min(actor.mp_toi_da, actor.mp_hien_tai + content.chi_so_cuoi.mp_hoi);
  const skills: LuaChonHopLeSkill[] = content.ky_nang.map((skill) => {
    let ly_do: LuaChonHopLeSkill["ly_do"] = null;
    if (skill.trang_thai !== "HOAT_DONG") ly_do = "KHONG_HOAT_DONG";
    else if ((actor.cooldowns[skill.id] ?? 0) > 0) ly_do = "COOLDOWN";
    else if (actor.debuff.some((status) => status.ma_hieu_ung === "EFF_SILENCE") && skill.danh_sach_hieu_ung.some((effect) => NHOM_CAM_SILENCE.has(REGISTRY_19[effect.ma_hieu_ung].nhom))) ly_do = "BI_SILENCE";
    else if (actor.debuff.some((status) => status.ma_hieu_ung === "EFF_ROOT") && skill.danh_sach_hieu_ung.some((effect) => effect.doi_tuong !== "BAN_THAN")) ly_do = "BI_ROOT";
    else if (skill.chi_phi_mp > mpAfterRecovery) ly_do = "THIEU_MP";

    const selector = skill.danh_sach_hieu_ung.find((effect) => effect.doi_tuong === "MOT_DICH" || effect.doi_tuong === "MOT_DONG_DOI");
    const targets = resolveReadTargets(tran, actor, selector?.doi_tuong ?? skill.danh_sach_hieu_ung[0]?.doi_tuong);
    const manuallySelectable = selector !== undefined && targets.length > 1;
    return {
      ky_nang_id: skill.id,
      dung_duoc: skill.trang_thai === "HOAT_DONG" && ly_do === null,
      ly_do,
      can_chon_target: manuallySelectable,
      target_hop_le: targets.map((target) => target.actor_id),
    };
  });

  return {
    actor_id: actor.actor_id,
    ky_nang: skills,
    co_the_bo_luot: xacDinhBoLuotTuDong(tran, actor, content, mpAfterRecovery) === null,
  };
}

function resolveReadTargets(tran: TranDau, source: ActorState, selector: HieuUngCauHinh["doi_tuong"] | undefined): ActorState[] {
  const alive = tran.trang_thai_chien_dau.actors.filter(song);
  switch (selector) {
    case "MOT_DICH": case "TAT_CA_DICH": case "NGAU_NHIEN_N_DICH":
      return alive.filter((target) => target.doi !== source.doi);
    case "MOT_DONG_DOI": case "TAT_CA_DONG_DOI":
      return alive.filter((target) => target.doi === source.doi);
    default:
      return [source];
  }
}
