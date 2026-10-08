import type { TranDau } from "../engine/types.js";
import type { LocalCharacter } from "../content/demo-content.js";
import type { HeroPreset } from "../engine/progression.js";
import { HERO_PRESETS, LINH_THAN_PRESETS } from "../engine/progression.js";
import { DEFAULT_SKILL_IDS } from "../content/demo-content.js";

export type StageProgress = { da_hoan_thanh: boolean; hoan_thanh_luc?: string };
export type LocalGameSave = {
  schema_version: 1 | 2;
  player_id: string;
  player_name: string;
  da_nhan_trieu_hoi_khoi_dau: boolean;
  starter_result: HeroPreset[];
  characters: LocalCharacter[];
  vi_huong_hoa: { so_du: number; linh_than_da_mo: string[] };
  tien_do_di_ai: Record<string, StageProgress>;
  doi_hinh_mac_dinh: string[];
  active_match: TranDau | null;
  last_match: TranDau | null;
};

export interface AtomicSaveDriver {
  read(): Promise<LocalGameSave | null>;
  transact<T>(create: () => LocalGameSave, update: (draft: LocalGameSave) => T): Promise<T>;
}

const DB_NAME = "dau-truong-nhan-vat-local";
const STORE_NAME = "save";
const SAVE_KEY = "root";

export class IndexedDbSaveDriver implements AtomicSaveDriver {
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor(private readonly factory: IDBFactory = indexedDB) {}

  async read(): Promise<LocalGameSave | null> {
    const db = await this.database();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).get(SAVE_KEY);
      request.onsuccess = () => resolve((request.result as LocalGameSave | undefined) ?? null);
      request.onerror = () => reject(request.error ?? new Error("Không đọc được save local."));
      tx.onabort = () => reject(tx.error ?? new Error("Transaction đọc save đã hủy."));
    });
  }

  async transact<T>(create: () => LocalGameSave, update: (draft: LocalGameSave) => T): Promise<T> {
    const db = await this.database();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite", { durability: "strict" });
      const store = tx.objectStore(STORE_NAME);
      let result!: T;
      let didWrite = false;
      const request = store.get(SAVE_KEY);
      request.onsuccess = () => {
        try {
          const current = (request.result as LocalGameSave | undefined) ?? create();
          const draft = structuredClone(current);
          result = update(draft);
          store.put(draft, SAVE_KEY);
          didWrite = true;
        } catch (error) {
          try { tx.abort(); } catch { /* The transaction may already be inactive. */ }
          reject(error);
        }
      };
      request.onerror = () => {
        try { tx.abort(); } catch { /* The transaction may already be inactive. */ }
        reject(request.error ?? new Error("Không mở được save để cập nhật."));
      };
      tx.oncomplete = () => didWrite ? resolve(result) : reject(new Error("Transaction không ghi save."));
      tx.onerror = () => reject(tx.error ?? new Error("Không ghi được save local."));
      tx.onabort = () => reject(tx.error ?? new Error("Transaction save đã rollback."));
    });
  }

  private database(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;
    this.dbPromise = new Promise((resolve, reject) => {
      const request = this.factory.open(DB_NAME, 2);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("Không mở được IndexedDB."));
      request.onblocked = () => reject(new Error("IndexedDB đang bị chặn bởi một phiên bản cũ của ứng dụng."));
    });
    return this.dbPromise;
  }
}

/** Deterministic test driver with the same single-record atomic contract as IndexedDB. */
export class MemorySaveDriver implements AtomicSaveDriver {
  private record: LocalGameSave | null = null;
  private queue: Promise<void> = Promise.resolve();

  async read(): Promise<LocalGameSave | null> {
    await this.queue;
    return this.record ? structuredClone(this.record) : null;
  }

  async transact<T>(create: () => LocalGameSave, update: (draft: LocalGameSave) => T): Promise<T> {
    let release!: () => void;
    const previous = this.queue;
    this.queue = new Promise<void>((resolve) => { release = resolve; });
    await previous;
    try {
      const draft = structuredClone(this.record ?? create());
      const result = update(draft);
      this.record = draft;
      return structuredClone(result);
    } finally { release(); }
  }
}

export class LocalGameStore {
  constructor(private readonly driver: AtomicSaveDriver, private readonly idFactory: () => string = () => crypto.randomUUID()) {}

  async loadOrCreate(): Promise<LocalGameSave> {
    return this.driver.transact(
      () => createEmptySave(this.idFactory()),
      (save) => migrateSave(save),
    );
  }

  read(): Promise<LocalGameSave | null> { return this.driver.read(); }

  transact<T>(update: (draft: LocalGameSave) => T): Promise<T> {
    return this.driver.transact(() => createEmptySave(this.idFactory()), update);
  }
}

export function createEmptySave(playerId: string): LocalGameSave {
  return {
    schema_version: 2,
    player_id: playerId,
    player_name: "Người chơi",
    da_nhan_trieu_hoi_khoi_dau: false,
    starter_result: [],
    characters: [],
    vi_huong_hoa: { so_du: 0, linh_than_da_mo: [] },
    tien_do_di_ai: {},
    doi_hinh_mac_dinh: [],
    active_match: null,
    last_match: null,
  };
}

const legacyClassIds: Record<string, string> = {
  "hero-vua-hung": "hero-hung-vuong",
  "hero-vua-hung-18": "hero-hung-vuong",
  "hero-tam": "hero-tam",
  "hero-so-dua": "hero-so-dua",
  "hero-mai-an-tiem": "hero-mai-an-tiem",
  "hero-lang-lieu": "hero-lang-lieu",
  "hero-anh-khoai": "hero-anh-khoai",
  "hero-lac-long-quan": "linh-than-lac-long-quan",
  "hero-au-co": "linh-than-au-co",
  "hero-thuy-tinh": "linh-than-thuy-tinh",
  "linh-than-thach-sanh": "hero-thach-sanh",
  "linh-than-thanh-giong": "hero-thanh-giong",
  "linh-than-chu-dong-tu": "hero-chu-dong-tu",
};

/** Remap old prototype ownership while keeping in-flight matches on their immutable old snapshots. */
function migrateSave(save: LocalGameSave): LocalGameSave {
  const charactersAlreadyCanonical = save.characters.every((character) =>
    character.class_id.startsWith("hero-") || character.class_id.startsWith("linh-than-"),
  );
  if (save.schema_version >= 2 && charactersAlreadyCanonical) return save;

  const officialHeroes = new Map(HERO_PRESETS.map((hero) => [hero.class_id, hero]));
  const officialGods = new Map<string, (typeof LINH_THAN_PRESETS)[number]>(LINH_THAN_PRESETS.map((god) => [god.class_id, god]));
  const migrated: LocalCharacter[] = [];
  const seen = new Set<string>();

  for (const prior of save.characters ?? []) {
    const classId = legacyClassIds[prior.class_id] ?? prior.class_id;
    const hero = officialHeroes.get(classId);
    const god = officialGods.get(classId);
    const preset = hero ?? (
      god
        ? { class_id: god.class_id, ten_co_dinh: god.ten_co_dinh, tier: "SSS" as const }
        : undefined
    );
    if (!preset || seen.has(classId)) continue;

    seen.add(classId);
    migrated.push({
      ...prior,
      class_id: classId,
      name: preset.ten_co_dinh,
      tier: preset.tier,
      la_hero_preset: Boolean(hero),
      skill_ids: DEFAULT_SKILL_IDS(classId),
      appearance: { ...prior.appearance, style: "PLACEHOLDER_ART" },
    });
  }

  save.characters = migrated;
  save.doi_hinh_mac_dinh = (save.doi_hinh_mac_dinh ?? []).filter((id) =>
    migrated.some((character) => character.id === id),
  );
  save.starter_result = (save.starter_result ?? []).flatMap((entry) => {
    const hero = officialHeroes.get(legacyClassIds[entry.class_id] ?? entry.class_id);
    return hero ? [hero] : [];
  });
  save.vi_huong_hoa ??= { so_du: 0, linh_than_da_mo: [] };
  save.vi_huong_hoa.linh_than_da_mo = [
    ...new Set(
      (save.vi_huong_hoa.linh_than_da_mo ?? [])
        .map((id) => legacyClassIds[id] ?? id)
        .filter((id) => officialGods.has(id)),
    ),
  ];
  save.tien_do_di_ai ??= {};
  save.schema_version = 2;
  return save;
}
