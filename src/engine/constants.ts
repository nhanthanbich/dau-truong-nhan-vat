/** Hằng số combat — spec v2.4.0 mục 1.5.0 / 1.5.5 / 0.8.4 / 0.8.5 */

export const NGUONG = 1000;
export const GIOI_HAN_GAUGE = 2000;
export const TRAN_LUOT_ACTOR = 2;
export const TRAN_LUOT_DOI = 3;
export const GIOI_HAN_HANH_DONG = 150;
export const KHANG_CC_SO_LUOT = 2;
export const TRAN_KHIEN_HP = 0.5;
export const TY_LE_SPD_TOI_DA = 2.0;
export const PHIEN_BAN_ENGINE = "2.1.0";

export const HE_SO_TIER = {
  C: 0.94,
  B: 1.0,
  A: 1.04,
  S: 1.08,
  SS: 1.13,
  SSS: 1.22,
} as const;

export const HE_SO_QUY_DOI = {
  hp: 0.06,
  atk: 0.06,
  def: 0.06,
  spd: 0.03,
  mp: 0.1,
  mp_hoi: 0.15,
} as const;

export const TRONG_SO_TIER_TAO_MOI = { B: 60, A: 30, S: 10 } as const;

export const CHI_PHI_LINH_THAN = 300;
export const CHI_PHI_HERO_HUONG_HOA = { B: 15, A: 30, S: 50, SS: 80 } as const;

export const NHOM_CAM_SILENCE = new Set(["HOI_PHUC", "BUFF", "TIEN_ICH"]);
export const CC_KHOA = new Set(["EFF_STUN", "EFF_SILENCE", "EFF_ROOT"]);
export const MA_KHONG_CHE = new Set(["EFF_STUN", "EFF_SILENCE", "EFF_ROOT", "EFF_SLOW"]);

export const AI_TRONG_SO = {
  AGGRESSIVE: { w_DMG: 1.0, w_KILL: 1.5, w_CC: 0.4, w_SUP: 0.3, w_MOD: 0.3 },
  CONTROL: { w_DMG: 0.6, w_KILL: 0.8, w_CC: 1.2, w_SUP: 0.4, w_MOD: 0.5 },
  DEFENSIVE: { w_DMG: 0.5, w_KILL: 0.6, w_CC: 0.6, w_SUP: 1.5, w_MOD: 0.5 },
} as const;
