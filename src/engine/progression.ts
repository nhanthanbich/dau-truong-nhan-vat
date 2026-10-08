import { CHI_PHI_HERO_HUONG_HOA, CHI_PHI_LINH_THAN } from "./constants.js";
import type { Tier } from "./types.js";

export type HeroPreset = { class_id: string; ma_class: string; ten_co_dinh: string; tier: "B" | "A" | "S" | "SS"; la_hero_preset: true };

/** Official owner roster; ids are persistent content keys. */
export const HERO_PRESETS: readonly HeroPreset[] = [
  ["hero-thanh-giong", "HERO_THANH_GIONG", "Thánh Gióng", "SS"],
  ["hero-thach-sanh", "HERO_THACH_SANH", "Thạch Sanh", "SS"],
  ["hero-chu-dong-tu", "HERO_CHU_DONG_TU", "Chử Đồng Tử", "SS"],
  ["hero-an-duong-vuong", "HERO_AN_DUONG_VUONG", "An Dương Vương", "S"],
  ["hero-hung-vuong", "HERO_HUNG_VUONG", "Hùng Vương", "S"],
  ["hero-tam", "HERO_TAM", "Tấm", "S"],
  ["hero-chu-cuoi", "HERO_CHU_CUOI", "Chú Cuội", "S"],
  ["hero-coc", "HERO_COC", "Cóc", "S"],
  ["hero-ong-tao", "HERO_ONG_TAO", "Ông Táo", "S"],
  ["hero-my-chau", "HERO_MY_CHAU", "Mỵ Châu", "A"],
  ["hero-trong-thuy", "HERO_TRONG_THUY", "Trọng Thủy", "A"],
  ["hero-tien-dung", "HERO_TIEN_DUNG", "Tiên Dung", "A"],
  ["hero-so-dua", "HERO_SO_DUA", "Sọ Dừa", "A"],
  ["hero-mai-an-tiem", "HERO_MAI_AN_TIEM", "Mai An Tiêm", "A"],
  ["hero-lang-lieu", "HERO_LANG_LIEU", "Lang Liêu", "A"],
  ["hero-anh-khoai", "HERO_ANH_KHOAI", "Anh Khoai", "A"],
  ["hero-cau-be-thong-minh", "HERO_CAU_BE_THONG_MINH", "Cậu Bé Thông Minh", "B"],
  ["hero-trang-quynh", "HERO_TRANG_QUYNH", "Trạng Quỳnh", "B"],
  ["hero-nang-to-thi", "HERO_NANG_TO_THI", "Nàng Tô Thị", "B"],
].map(([class_id, ma_class, ten_co_dinh, tier]) => ({ class_id, ma_class, ten_co_dinh, tier, la_hero_preset: true })) as HeroPreset[];

export const LINH_THAN_PRESETS = [
  { class_id: "linh-than-lac-long-quan", ten_co_dinh: "Lạc Long Quân" },
  { class_id: "linh-than-au-co", ten_co_dinh: "Âu Cơ" },
  { class_id: "linh-than-son-tinh", ten_co_dinh: "Sơn Tinh" },
  { class_id: "linh-than-thuy-tinh", ten_co_dinh: "Thủy Tinh" },
] as const;
export const TRIEU_HOI_KHOI_DAU_CONFIG = { so_luot: 10, bao_dam_toi_thieu: "S" as const, bao_dam_toi_thieu_lan_hai: "A" as const, trong_so_tier: { B: 60, A: 30, S: 9, SS: 1 } };
export type RandomSource = () => number;
export type StarterWeights = typeof TRIEU_HOI_KHOI_DAU_CONFIG.trong_so_tier;

export function rollStarterPack(random: RandomSource, roster: readonly HeroPreset[] = HERO_PRESETS, weights: StarterWeights = TRIEU_HOI_KHOI_DAU_CONFIG.trong_so_tier): HeroPreset[] {
  const counts = new Map<string, number>();
  for (const hero of roster) counts.set(hero.tier, (counts.get(hero.tier) ?? 0) + 1);
  if (roster.length !== 19 || new Set(roster.map((h) => h.class_id)).size !== 19 || [3, 7, 6, 3].some((n, i) => n !== counts.get((["B", "A", "S", "SS"] as const)[i]))) throw new Error("Starter pool must be the official 19 B/A/S/SS Heroes.");
  if (Object.values(weights).some((w) => !Number.isInteger(w) || w < 0) || Object.values(weights).reduce((a, b) => a + b, 0) !== 100 || weights.S + weights.SS === 0) throw new Error("Invalid starter tier weights.");
  const selected: HeroPreset[] = [];
  while (selected.length < 10) selected.push(drawUnique(roster, selected, random, weights));
  if (!selected.some((hero) => hero.tier === "S" || hero.tier === "SS")) {
    replaceWithGuaranteedTier(selected, roster.filter((hero) => hero.tier === "S" || hero.tier === "SS"), weights, random, ["B", "A"]);
  }
  if (!selected.some((hero) => hero.tier !== "B")) {
    replaceWithGuaranteedTier(selected, roster.filter((hero) => hero.tier !== "B"), weights, random, ["B"]);
  }
  return selected;
}
function checkedRandom(random: RandomSource): number { const value = random(); if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError("Random source must return [0,1)."); return value; }
function weightedPick(pool: readonly HeroPreset[], random: RandomSource, weights: StarterWeights): HeroPreset {
  const weighted = pool.map((hero) => ({ hero, weight: weights[hero.tier] / (HERO_PRESETS.filter((h) => h.tier === hero.tier).length) }));
  const total = weighted.reduce((sum, row) => sum + row.weight, 0); if (!(total > 0)) throw new Error("No weighted Hero available.");
  let roll = checkedRandom(random) * total;
  for (const row of weighted) { roll -= row.weight; if (roll < 0) return row.hero; }
  return weighted[weighted.length - 1]!.hero;
}
function drawUnique(pool: readonly HeroPreset[], selected: readonly HeroPreset[], random: RandomSource, weights: StarterWeights): HeroPreset {
  const remaining = pool.filter((h) => !selected.some((s) => s.class_id === h.class_id));
  return weightedPick(remaining, random, weights);
}
function replaceWithGuaranteedTier(selected: HeroPreset[], eligible: readonly HeroPreset[], weights: StarterWeights, random: RandomSource, replaceTiers: readonly HeroPreset["tier"][]): void {
  const replacement = weightedPick(eligible.filter((hero) => !selected.some((item) => item.class_id === hero.class_id)), random, weights);
  const index = selected.findIndex((hero) => replaceTiers.includes(hero.tier));
  if (index < 0) throw new Error("Cannot repair starter guarantee without replacing an ineligible tier.");
  selected[index] = replacement;
}

export type StarterClaimResult = { claimed_now: boolean; heroes: readonly HeroPreset[] };
export interface StarterPackStore { claimStarterPackAtomically(createPack: () => readonly HeroPreset[]): Promise<StarterClaimResult> }
export async function nhanTrieuHoiKhoiDau(store: StarterPackStore, externalRandom: RandomSource, weights: StarterWeights = TRIEU_HOI_KHOI_DAU_CONFIG.trong_so_tier): Promise<StarterClaimResult> {
  return store.claimStarterPackAtomically(() => rollStarterPack(externalRandom, HERO_PRESETS, weights));
}
export function chiPhiMoHero(tier: HeroPreset["tier"]): number { return CHI_PHI_HERO_HUONG_HOA[tier]; }
export function chiPhiMoLinhThan(): number { return CHI_PHI_LINH_THAN; }
export type OwnedCharacter = { id: string; class_id: string; tier: Tier };
export type HuongHoaWallet = { so_du: number; linh_than_da_mo: string[] };
export function moKhoaHeroPreset(classId: string, roster: readonly HeroPreset[], owned: readonly OwnedCharacter[], wallet: HuongHoaWallet): { hero: HeroPreset; so_du_moi: number } {
  const hero = roster.find((item) => item.class_id === classId); if (!hero) throw new Error("Hero preset không tồn tại.");
  if (owned.some((item) => item.class_id === classId)) throw new Error("Hero đã sở hữu.");
  const cost = chiPhiMoHero(hero.tier); if (wallet.so_du < cost) throw new Error("Không đủ Hương Hỏa.");
  return { hero, so_du_moi: wallet.so_du - cost };
}
export function moKhoaLinhThan(classId: string, owned: readonly OwnedCharacter[], wallet: HuongHoaWallet): { so_du_moi: number; linh_than_da_mo: string[] } {
  if (!LINH_THAN_PRESETS.some((item) => item.class_id === classId)) throw new Error("Linh Thần không thuộc roster hiện hành.");
  if (owned.some((item) => item.class_id === classId) || wallet.linh_than_da_mo.includes(classId)) throw new Error("Linh Thần đã sở hữu.");
  if (wallet.so_du < CHI_PHI_LINH_THAN) throw new Error("Không đủ Hương Hỏa.");
  return { so_du_moi: wallet.so_du - CHI_PHI_LINH_THAN, linh_than_da_mo: [...wallet.linh_than_da_mo, classId] };
}
export type FirstClearResult = { first_clear: boolean; huong_hoa_nhan: number };
export function tinhThuongFirstClear(input: { loai: "PVE_DOI_KHANG" | "PVE_DI_AI" | "PVP_DOI_KHANG" | "PVP_DI_AI_CUNG_NHAU"; ket_qua: "CO_BEN_THANG" | "HOA"; doiNguoiChoiThang: boolean; daHoanThanh: boolean; huongHoaFirstClear: number }): FirstClearResult {
  if (input.huongHoaFirstClear < 0 || !Number.isInteger(input.huongHoaFirstClear)) throw new Error("First-clear reward must be a non-negative integer.");
  const eligible = input.loai === "PVE_DI_AI" && input.ket_qua === "CO_BEN_THANG" && input.doiNguoiChoiThang && !input.daHoanThanh;
  return eligible ? { first_clear: input.huongHoaFirstClear > 0, huong_hoa_nhan: input.huongHoaFirstClear } : { first_clear: false, huong_hoa_nhan: 0 };
}
export interface FirstClearStore { settleStageWinAtomically(stageId: string, huongHoaFirstClear: number): Promise<FirstClearResult> }
export function capThuongFirstClear(store: FirstClearStore, stageId: string, huongHoaFirstClear: number): Promise<FirstClearResult> { return store.settleStageWinAtomically(stageId, huongHoaFirstClear); }
