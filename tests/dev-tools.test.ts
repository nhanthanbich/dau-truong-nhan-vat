import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";
import { CLASS_CONTENT } from "../src/content/demo-content.js";
import { grantDevClear, loadDevProgress, runDevGacha, unlockDevContent, updateDevProgress, validateDevContent } from "../src/dev/dev-tools.js";

const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
const records = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
  getItem: (key: string) => records.get(key) ?? null,
  setItem: (key: string, value: string) => { records.set(key, value); },
  removeItem: (key: string) => { records.delete(key); },
} });

beforeEach(() => { Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
  getItem: (key: string) => records.get(key) ?? null,
  setItem: (key: string, value: string) => { records.set(key, value); },
  removeItem: (key: string) => { records.delete(key); },
} }); });
afterEach(() => { records.clear(); });
afterAll(() => { if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage); else delete (globalThis as { localStorage?: Storage }).localStorage; });

describe("DEV content and progression lab", () => {
  it("shows GREEN for valid content, RED for Engine-invalid content, and YELLOW for balance warnings", () => {
    const content = structuredClone(CLASS_CONTENT.heroes[0]!);
    expect(validateDevContent(content).map((item) => item.level)).toContain("GREEN");
    content.skills[0]!.danh_sach_hieu_ung[0]!.tham_so.he_so = 9;
    expect(validateDevContent(content).some((item) => item.level === "YELLOW")).toBe(true);
    content.skills[0]!.danh_sach_hieu_ung[0]!.tham_so.he_so = -1;
    expect(validateDevContent(content)[0]?.level).toBe("RED");
  });

  it("generates deterministic unique 10-Hero packages without touching player data", () => {
    expect(runDevGacha(42, 5)).toEqual(runDevGacha(42, 5));
    for (const { heroes } of runDevGacha(700, 10)) {
      expect(heroes).toHaveLength(10);
      expect(new Set(heroes.map((hero) => hero.class_id)).size).toBe(10);
      expect(heroes.some((hero) => hero.tier === "S" || hero.tier === "SS")).toBe(true);
      expect(heroes.some((hero) => hero.tier !== "B")).toBe(true);
    }
    expect(records.has("dau-truong-nhan-vat-local")).toBe(false);
  });

  it("isolates wallet, first-clear replay, unlock, and reset under the DEV storage key", () => {
    updateDevProgress(() => ({ wallet: 0, cleared: [], owned: [] }));
    expect(grantDevClear("dev-stage", 100)).toMatchObject({ firstClear: true, amount: 100, progress: { wallet: 100 } });
    expect(grantDevClear("dev-stage", 100)).toMatchObject({ firstClear: false, amount: 0, progress: { wallet: 100 } });
    updateDevProgress((current) => ({ ...current, wallet: 115 }));
    expect(unlockDevContent("hero-cau-be-thong-minh")).toMatchObject({ wallet: 100, owned: ["hero-cau-be-thong-minh"] });
    updateDevProgress(() => ({ wallet: 0, cleared: [], owned: [] }));
    expect(loadDevProgress()).toEqual({ wallet: 0, cleared: [], owned: [] });
    expect([...records.keys()]).toEqual(["dtnv-dev-progression-lab-v1"]);
  });
});
