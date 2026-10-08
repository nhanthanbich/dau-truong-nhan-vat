import { HE_SO_QUY_DOI, HE_SO_TIER } from "./constants.js";
import type { CheDoTier, ChiSoCuoi, ChiSoNen, PhanBoDiem, Tier } from "./types.js";

export function tongPhanBo(p: PhanBoDiem): number {
  return p.hp + p.atk + p.def + p.spd + p.mp + p.mp_hoi;
}

function cacChiSoPhanBoHopLe(p: PhanBoDiem): boolean {
  const stats = [p.hp, p.atk, p.def, p.spd, p.mp, p.mp_hoi];
  return stats.every((value) => Number.isInteger(value) && value >= 0 && value <= 2);
}

export function phanBoHopLeTaoMoi(p: PhanBoDiem): boolean {
  return cacChiSoPhanBoHopLe(p) && tongPhanBo(p) === 5;
}

export function phanBoHopLeVaoTran(p: PhanBoDiem): boolean {
  if (!cacChiSoPhanBoHopLe(p)) return false;
  const tong = tongPhanBo(p);
  return tong === 5 || tong === 0;
}

export function heSoTierApDung(tier: Tier, che_do_tier: CheDoTier): number {
  if (che_do_tier === "CAN_BANG") return 1.0;
  return HE_SO_TIER[tier];
}

function bonus(coSo: number, tyLe: number): number {
  return Math.max(1, Math.round(coSo * tyLe));
}

/** Spec 0.8.4.B — `tinh_chi_so_cuoi` */
export function tinhChiSoCuoi(
  nen: ChiSoNen,
  phanBo: PhanBoDiem,
  tier: Tier,
  che_do_tier: CheDoTier,
): { chi_so_cuoi: ChiSoCuoi; he_so_tier_ap_dung: number; chi_so_nen_hieu_dung: ChiSoNen } {
  const hs = heSoTierApDung(tier, che_do_tier);
  const hp_nen = Math.round(nen.hp_nen * hs);
  const atk_nen = Math.round(nen.atk_nen * hs);
  const def_nen = Math.round(nen.def_nen * hs);
  const spd_nen = nen.spd_nen;
  const mp_nen = nen.mp_nen;
  const mp_hoi = nen.mp_hoi_moi_luot;

  const chi_so_cuoi: ChiSoCuoi = {
    hp: hp_nen + phanBo.hp * bonus(hp_nen, HE_SO_QUY_DOI.hp),
    atk: atk_nen + phanBo.atk * bonus(atk_nen, HE_SO_QUY_DOI.atk),
    def: def_nen + phanBo.def * bonus(100 + def_nen, HE_SO_QUY_DOI.def),
    spd: spd_nen + phanBo.spd * bonus(spd_nen, HE_SO_QUY_DOI.spd),
    mp: mp_nen + phanBo.mp * bonus(mp_nen, HE_SO_QUY_DOI.mp),
    mp_hoi: mp_hoi + phanBo.mp_hoi * bonus(mp_hoi, HE_SO_QUY_DOI.mp_hoi),
  };

  return {
    chi_so_cuoi,
    he_so_tier_ap_dung: hs,
    chi_so_nen_hieu_dung: {
      hp_nen,
      atk_nen,
      def_nen,
      spd_nen,
      mp_nen,
      mp_hoi_moi_luot: mp_hoi,
    },
  };
}
