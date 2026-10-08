import type { DoiTuong, MaHieuUng, NhomHieuUng, ThoiDiem } from "./types.js";

export type KieuThamSo = "decimal" | "int" | "decimal_or_int";
export type ThamSoDinhNghia = { ten: string; kieu: KieuThamSo };
export type DinhNghiaHieuUng = {
  ten_hien_thi: string;
  nhom: NhomHieuUng;
  tham_so_schema: readonly ThamSoDinhNghia[];
  doi_tuong_mac_dinh: DoiTuong;
  thoi_diem_kha_dung: readonly ThoiDiem[];
};

const skillTime: readonly ThoiDiem[] = ["KHI_THI_TRIEN", "BI_DONG_DAU_TRAN"];
const p = (ten: string, kieu: KieuThamSo): ThamSoDinhNghia => ({ ten, kieu });
const effect = (ten_hien_thi: string, nhom: NhomHieuUng, doi_tuong_mac_dinh: DoiTuong, tham_so_schema: ThamSoDinhNghia[]): DinhNghiaHieuUng => ({
  ten_hien_thi, nhom, doi_tuong_mac_dinh, tham_so_schema, thoi_diem_kha_dung: skillTime,
});

/** Closed v2.4 registry. Content can configure parameters; only engine code can add effect types. */
export const REGISTRY_19: Record<MaHieuUng, DinhNghiaHieuUng> = {
  EFF_DMG_DIRECT: effect("Sát thương trực tiếp", "SAT_THUONG", "MOT_DICH", [p("he_so", "decimal")]),
  EFF_DMG_DOT: effect("Sát thương theo thời gian", "SAT_THUONG", "MOT_DICH", [p("sat_thuong_moi_luot", "int"), p("so_luot", "int")]),
  EFF_DMG_TRUE: effect("Sát thương xuyên giáp", "SAT_THUONG", "MOT_DICH", [p("he_so", "decimal")]),
  EFF_DMG_AOE: effect("Sát thương diện rộng", "SAT_THUONG", "TAT_CA_DICH", [p("he_so", "decimal")]),
  EFF_LIFESTEAL: effect("Hút máu", "SAT_THUONG", "BAN_THAN", [p("phan_tram_hoi", "decimal")]),
  EFF_STUN: effect("Choáng", "KHONG_CHE", "MOT_DICH", [p("so_luot", "int")]),
  EFF_SILENCE: effect("Câm lặng", "KHONG_CHE", "MOT_DICH", [p("so_luot", "int")]),
  EFF_ROOT: effect("Trói chân", "KHONG_CHE", "MOT_DICH", [p("so_luot", "int")]),
  EFF_SLOW: effect("Giảm tốc", "KHONG_CHE", "MOT_DICH", [p("phan_tram_giam", "decimal"), p("so_luot", "int")]),
  EFF_BUFF_ATK: effect("Tăng công", "BUFF", "BAN_THAN", [p("gia_tri", "decimal"), p("so_luot", "int")]),
  EFF_BUFF_DEF: effect("Tăng thủ", "BUFF", "BAN_THAN", [p("gia_tri", "decimal"), p("so_luot", "int")]),
  EFF_BUFF_SPD: effect("Tăng tốc", "BUFF", "BAN_THAN", [p("gia_tri", "decimal"), p("so_luot", "int")]),
  EFF_SHIELD: effect("Khiên chắn", "BUFF", "BAN_THAN", [p("luong_hap_thu", "int")]),
  EFF_DEBUFF_ATK: effect("Giảm công", "DEBUFF", "MOT_DICH", [p("gia_tri", "decimal"), p("so_luot", "int")]),
  EFF_DEBUFF_DEF: effect("Giảm thủ", "DEBUFF", "MOT_DICH", [p("gia_tri", "decimal"), p("so_luot", "int")]),
  EFF_HEAL: effect("Hồi máu", "HOI_PHUC", "BAN_THAN", [p("gia_tri", "decimal_or_int")]),
  EFF_HOT: effect("Hồi máu theo thời gian", "HOI_PHUC", "BAN_THAN", [p("luong_moi_luot", "int"), p("so_luot", "int")]),
  EFF_CLEANSE: effect("Thanh lọc", "TIEN_ICH", "BAN_THAN", [p("so_luong_go", "int")]),
  EFF_DISPEL: effect("Giải trừ", "TIEN_ICH", "MOT_DICH", [p("so_luong_go", "int")]),
};

export const DANH_SACH_19_MA = Object.keys(REGISTRY_19) as MaHieuUng[];
