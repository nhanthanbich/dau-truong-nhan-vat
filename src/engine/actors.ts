import { CC_KHOA, TRAN_KHIEN_HP } from "./constants.js";
import type { ActorState, Doi, StatusInstance, TranDau } from "./types.js";

export function cloneTran(tran: TranDau): TranDau {
  return structuredClone(tran);
}

export function actorById(actors: ActorState[], id: string): ActorState | undefined {
  return actors.find((a) => a.actor_id === id);
}

export function song(a: ActorState): boolean {
  return a.hp_hien_tai > 0;
}

export function doiKhac(doi: Doi): Doi {
  return doi === "DOI_A" ? "DOI_B" : "DOI_A";
}

export function dangMangCcKhoa(a: ActorState): boolean {
  return a.debuff.some((e) => CC_KHOA.has(e.ma_hieu_ung));
}

export function mangMa(a: ActorState, ma: string): boolean {
  return [...a.buff, ...a.debuff, ...a.dot, ...a.hot].some((e) => e.ma_hieu_ung === ma);
}

export function atkHienTai(a: ActorState, atkGoc: number): number {
  let v = atkGoc;
  for (const b of a.buff) if (b.ma_hieu_ung === "EFF_BUFF_ATK") v += b.tham_so.gia_tri ?? 0;
  for (const b of a.debuff) if (b.ma_hieu_ung === "EFF_DEBUFF_ATK") v -= b.tham_so.gia_tri ?? 0;
  return Math.max(0, v);
}

export function defHienTai(a: ActorState, defGoc: number): number {
  let v = defGoc;
  for (const b of a.buff) if (b.ma_hieu_ung === "EFF_BUFF_DEF") v += b.tham_so.gia_tri ?? 0;
  for (const b of a.debuff) if (b.ma_hieu_ung === "EFF_DEBUFF_DEF") v -= b.tham_so.gia_tri ?? 0;
  return Math.max(0, v);
}

export function spdHienTai(a: ActorState, spdGoc: number): number {
  const slow = a.debuff.find((e) => e.ma_hieu_ung === "EFF_SLOW");
  let spd = spdGoc;
  if (slow) spd = Math.round(spdGoc * (1 - (slow.tham_so.phan_tram_giam ?? 0)));
  for (const b of a.buff) if (b.ma_hieu_ung === "EFF_BUFF_SPD") spd += b.tham_so.gia_tri ?? 0;
  const lo = Math.max(1, Math.round(0.5 * spdGoc));
  const hi = Math.round(1.5 * spdGoc);
  return Math.min(hi, Math.max(lo, spd));
}

export function capNhatSpd(a: ActorState, spdGoc: number): void {
  a.spd_hien_tai = spdHienTai(a, spdGoc);
}

export function tranKhien(hpToiDa: number): number {
  return Math.round(TRAN_KHIEN_HP * hpToiDa);
}

export function sapXepUuTien(actors: ActorState[]): ActorState[] {
  return [...actors].sort((x, y) => x.thu_tu_uu_tien - y.thu_tu_uu_tien);
}

export function loaiKhoiSong(a: ActorState): void {
  a.buff = [];
  a.debuff = [];
  a.dot = [];
  a.hot = [];
}

export function themStatus(list: StatusInstance[], item: StatusInstance, refresh: boolean): void {
  const idx = list.findIndex((e) => e.ma_hieu_ung === item.ma_hieu_ung);
  if (idx >= 0 && refresh) {
    list[idx] = { ...item, instance_id: list[idx].instance_id, thu_tu_ap_dung: list[idx].thu_tu_ap_dung };
    return;
  }
  if (idx >= 0 && !refresh) return;
  list.push(item);
}
