export type Tier = "C" | "B" | "A" | "S" | "SS" | "SSS";
export type HeroTier = "B" | "A" | "S" | "SS";
export type PhanLoaiClass = "THUONG" | "LINH_THAN";
export type CheDoTier = "CAN_BANG" | "TU_DO";
export type Doi = "DOI_A" | "DOI_B";
export type DieuKhien = "NGUOI_CHOI" | "AI";
export type AiArchetype = "AGGRESSIVE" | "CONTROL" | "DEFENSIVE" | "ADAPTIVE";
export type DoiTuong =
  | "BAN_THAN"
  | "MOT_DICH"
  | "TAT_CA_DICH"
  | "MOT_DONG_DOI"
  | "TAT_CA_DONG_DOI"
  | "NGAU_NHIEN_N_DICH";
export type ThoiDiem = "KHI_THI_TRIEN" | "KHI_DANH_TRUNG" | "BI_DONG_DAU_TRAN";
export type NhomHieuUng = "SAT_THUONG" | "KHONG_CHE" | "BUFF" | "DEBUFF" | "HOI_PHUC" | "TIEN_ICH";
export type TriggerNoiTai =
  | "BAT_DAU_TRAN"
  | "BAT_DAU_LUOT"
  | "KHI_SU_DUNG_SKILL"
  | "KHI_GAY_SAT_THUONG"
  | "KHI_NHAN_SAT_THUONG";
export type NguonHieuUng = "SKILL" | "NOI_TAI" | "DOT_HOT";
export type LyDoBoLuot = "CHU_DONG" | "BI_STUN" | "BI_SILENCE" | "KHONG_DU_MP";
export type KetQuaTran = "CO_BEN_THANG" | "HOA";
export type TrangThaiTran = "DANG_DIEN_RA" | "KET_THUC";
export type LoaiTran = "PVE_DOI_KHANG" | "PVE_DI_AI" | "PVP_DOI_KHANG" | "PVP_DI_AI_CUNG_NHAU";

export type MaHieuUng =
  | "EFF_DMG_DIRECT"
  | "EFF_DMG_DOT"
  | "EFF_DMG_TRUE"
  | "EFF_DMG_AOE"
  | "EFF_LIFESTEAL"
  | "EFF_STUN"
  | "EFF_SILENCE"
  | "EFF_ROOT"
  | "EFF_SLOW"
  | "EFF_BUFF_ATK"
  | "EFF_BUFF_DEF"
  | "EFF_BUFF_SPD"
  | "EFF_SHIELD"
  | "EFF_DEBUFF_ATK"
  | "EFF_DEBUFF_DEF"
  | "EFF_HEAL"
  | "EFF_HOT"
  | "EFF_CLEANSE"
  | "EFF_DISPEL";

export type PhanBoDiem = {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  mp: number;
  mp_hoi: number;
};

export type ChiSoNen = {
  hp_nen: number;
  atk_nen: number;
  def_nen: number;
  spd_nen: number;
  mp_nen: number;
  mp_hoi_moi_luot: number;
};

export type ChiSoCuoi = {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  mp: number;
  mp_hoi: number;
};

export type HieuUngCauHinh = {
  ma_hieu_ung: MaHieuUng;
  tham_so: Record<string, number>;
  doi_tuong: DoiTuong;
  thoi_diem: ThoiDiem;
};

export type KyNangSnapshot = {
  id: string;
  ma_ky_nang: string;
  ten_hien_thi: string;
  mo_ta?: string;
  class_id: string;
  hoi_chieu_luot: number;
  chi_phi_mp: number;
  danh_sach_hieu_ung: HieuUngCauHinh[];
  trang_thai: "HOAT_DONG" | "AN";
  dac_trung_rieng?: boolean;
};

export type DieuKienNoiTai =
  | Record<string, never>
  | { loai: "HP_PCT_NHO_HON_BANG" | "HP_PCT_LON_HON_BANG"; gia_tri: number };

export type NoiTaiSnapshot = {
  id: string;
  ma_noi_tai: string;
  ten_hien_thi: string;
  mo_ta?: string;
  kich_hoat: TriggerNoiTai;
  dieu_kien: DieuKienNoiTai;
  danh_sach_hieu_ung: HieuUngCauHinh[];
  dac_trung_rieng?: boolean;
};

export type ActorContentSnapshot = {
  actor_id: string;
  class_id: string;
  class_ma: string;
  ten_class: string;
  ten_co_dinh?: string;
  phan_loai: PhanLoaiClass;
  la_hero_preset?: boolean;
  chi_so_nen: ChiSoNen;
  tier: Tier;
  tier_seed?: HeroTier;
  he_so_tier_ap_dung: number;
  phan_bo_diem: PhanBoDiem;
  he_so_quy_doi: typeof import("./constants.js").HE_SO_QUY_DOI;
  chi_so_cuoi: ChiSoCuoi;
  noi_tai: NoiTaiSnapshot;
  ky_nang: KyNangSnapshot[];
  ai_archetype?: AiArchetype;
};

export type StatusInstance = {
  instance_id: number;
  ma_hieu_ung: MaHieuUng;
  nhom: NhomHieuUng;
  so_luot: number;
  tham_so: Record<string, number>;
  nguon_actor_id: string;
  nguon: NguonHieuUng;
  thu_tu_ap_dung: number;
  bo_qua_tick_luot_nay?: boolean;
};

export type ActorState = {
  actor_id: string;
  doi: Doi;
  vi_tri: number;
  dieu_khien: DieuKhien;
  nguoi_choi_id: string | null;
  nhan_vat_id: string | null;
  ten_hien_thi: string;
  thu_tu_uu_tien: number;
  hp_hien_tai: number;
  hp_toi_da: number;
  mp_hien_tai: number;
  mp_toi_da: number;
  shield_hien_tai: number;
  spd_hien_tai: number;
  thanh_tich_luy: number;
  khang_cc: number;
  buff: StatusInstance[];
  debuff: StatusInstance[];
  dot: StatusInstance[];
  hot: StatusInstance[];
  cooldowns: Record<string, number>;
  so_lan_hanh_dong: number;
};

export type ChuoiLuot = {
  actor_id: string | null;
  so_lan_actor: number;
  doi: Doi | null;
  so_lan_doi: number;
};

export type TrangThaiChienDau = {
  actors: ActorState[];
  actor_dang_di: string;
  so_luot: number;
  chuoi_luot: ChuoiLuot;
  rng_seed: number;
  rng_state: number;
};

export type HieuUngLog = {
  ma_hieu_ung: MaHieuUng;
  target_actor_id: string | null;
  target_doi: Doi | null;
  gia_tri: number;
  bi_bo_qua: boolean;
  ly_do_bo_qua?: string;
  nguon: NguonHieuUng;
  bi_cat_tran?: boolean;
};

export type NhatKyLuot = {
  so_luot: number;
  actor_id: string;
  actor_doi: Doi;
  ten_hien_thi_actor: string;
  hanh_dong: "SKILL" | "BO_LUOT" | "TIMEOUT";
  ky_nang_id: string | null;
  target_actor_id: string | null;
  mp_tieu_ton: number;
  ly_do_bo_luot: LyDoBoLuot | null;
  so_lua_chon_hop_le: number;
  hieu_ung_ap_dung: HieuUngLog[];
  passive_kich_hoat: { actor_id: string; ma_noi_tai: string; trigger: TriggerNoiTai }[];
  actor_chet: string[];
  rng_state_truoc?: number;
  rng_actor_chon?: string;
  rng_rolls?: { rng_state_truoc: number; actor_chon: string }[];
};

export type TranDau = {
  id: string;
  loai: LoaiTran;
  trang_thai: TrangThaiTran;
  ket_qua: KetQuaTran | null;
  actor_ids_thang: string[];
  trang_thai_chien_dau: TrangThaiChienDau;
  du_lieu_noi_dung_snapshot: {
    phien_ban_content?: number;
    actors: Record<string, ActorContentSnapshot>;
  };
  nhat_ky_luot_danh: NhatKyLuot[];
  phien_ban_engine: string;
  che_do_tier: CheDoTier;
  man_choi_id?: string;
  ket_qua_tien_trinh: { huong_hoa_nhan: number; first_clear: boolean } | null;
  su_kien_khoi_tao?: HieuUngLog[];
  passive_khoi_tao?: { actor_id: string; ma_noi_tai: string; trigger: TriggerNoiTai }[];
};

export type DauVaoNhanVat = {
  nhan_vat_id: string | null;
  nguoi_choi_id: string | null;
  ten_hien_thi: string;
  class_id: string;
  class_ma: string;
  ten_class: string;
  phan_loai: PhanLoaiClass;
  la_hero_preset?: boolean;
  ten_co_dinh?: string;
  ngoai_hinh_co_dinh?: Record<string, unknown>;
  chi_so_nen: ChiSoNen;
  tier: Tier;
  tier_seed?: HeroTier;
  phan_bo_diem: PhanBoDiem;
  ky_nang: KyNangSnapshot[];
  noi_tai: NoiTaiSnapshot;
  dieu_khien: DieuKhien;
  ai_archetype?: AiArchetype;
};

export type BatDauTranInput = {
  tran_dau_id: string;
  loai: LoaiTran;
  che_do_tier: CheDoTier;
  doi_a: DauVaoNhanVat[];
  doi_b: DauVaoNhanVat[];
  rng_seed: number;
  man_choi_id?: string;
};

export type ActionInput = {
  ky_nang_id?: string | null;
  bo_luot?: boolean;
  target_actor_id?: string | null;
  nguoi_thuc_hien_id?: string | null;
  duong_goi_tin_cay?: boolean;
  ai_tu_dong?: boolean;
};

export type LuaChonHopLeSkill = {
  ky_nang_id: string;
  dung_duoc: boolean;
  ly_do: "KHONG_HOAT_DONG" | "COOLDOWN" | "THIEU_MP" | "BI_SILENCE" | "BI_ROOT" | null;
  can_chon_target: boolean;
  target_hop_le: string[];
};

export type LuaChonHopLe = {
  actor_id: string;
  ky_nang: LuaChonHopLeSkill[];
  co_the_bo_luot: boolean;
};

export type EngineError = {
  ma: string;
  mo_ta: string;
};

export type TurnResult =
  | { ok: true; tran: TranDau }
  | { ok: false; loi: EngineError };
