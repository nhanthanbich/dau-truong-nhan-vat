import { GIOI_HAN_GAUGE, NGUONG, TRAN_LUOT_ACTOR, TRAN_LUOT_DOI } from "./constants.js";
import { doiKhac, song } from "./actors.js";
import type { ActorState, ChuoiLuot, TrangThaiChienDau } from "./types.js";

export function tapUngVien(st: TrangThaiChienDau): ActorState[] {
  const songCon = st.actors.filter(song);
  let C = songCon;
  const chuoi = st.chuoi_luot;
  if (chuoi.actor_id && chuoi.so_lan_actor >= TRAN_LUOT_ACTOR && songCon.some((a) => a.actor_id !== chuoi.actor_id)) {
    C = C.filter((a) => a.actor_id !== chuoi.actor_id);
  }
  if (chuoi.doi && chuoi.so_lan_doi >= TRAN_LUOT_DOI) {
    const kia = doiKhac(chuoi.doi);
    if (songCon.some((a) => a.doi === kia)) {
      C = C.filter((a) => a.doi !== chuoi.doi);
    }
  }
  return C.length > 0 ? C : songCon;
}

function soTickCan(a: ActorState): number {
  return Math.max(0, Math.ceil((NGUONG - a.thanh_tich_luy) / a.spd_hien_tai));
}

export function chonActorTiepTheo(st: TrangThaiChienDau): { actor_id: string; buoc: number } {
  const C = tapUngVien(st);
  let best = C[0]!;
  let bestTick = soTickCan(best);
  for (const a of C.slice(1)) {
    const t = soTickCan(a);
    if (t < bestTick) {
      best = a;
      bestTick = t;
    } else if (t === bestTick) {
      if (a.spd_hien_tai > best.spd_hien_tai) {
        best = a;
        bestTick = t;
      } else if (a.spd_hien_tai === best.spd_hien_tai && a.thu_tu_uu_tien < best.thu_tu_uu_tien) {
        best = a;
        bestTick = t;
      }
    }
  }
  return { actor_id: best.actor_id, buoc: bestTick };
}

export function tichGauge(st: TrangThaiChienDau, buoc: number): void {
  for (const a of st.actors) {
    if (!song(a)) continue;
    a.thanh_tich_luy = Math.min(GIOI_HAN_GAUGE, a.thanh_tich_luy + buoc * a.spd_hien_tai);
  }
}

export function sauHanhDong(st: TrangThaiChienDau, actorId: string): void {
  const a = st.actors.find((x) => x.actor_id === actorId);
  if (!a) return;
  a.thanh_tich_luy -= NGUONG;
  a.so_lan_hanh_dong += 1;
  const chuoi = st.chuoi_luot;
  if (chuoi.actor_id === actorId) chuoi.so_lan_actor += 1;
  else {
    chuoi.actor_id = actorId;
    chuoi.so_lan_actor = 1;
  }
  if (chuoi.doi === a.doi) chuoi.so_lan_doi += 1;
  else {
    chuoi.doi = a.doi;
    chuoi.so_lan_doi = 1;
  }
}

export function xacDinhActorDauTienHoacKe(st: TrangThaiChienDau): string {
  const { actor_id, buoc } = chonActorTiepTheo(st);
  tichGauge(st, buoc);
  st.actor_dang_di = actor_id;
  return actor_id;
}

export function duBaoThuTu(st: TrangThaiChienDau, n = 6): string[] {
  const copy = structuredClone(st);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    if (!copy.actors.some(song)) break;
    const id = xacDinhActorDauTienHoacKe(copy);
    out.push(id);
    sauHanhDong(copy, id);
  }
  return out;
}

export function chuoiRong(): ChuoiLuot {
  return { actor_id: null, so_lan_actor: 0, doi: null, so_lan_doi: 0 };
}
