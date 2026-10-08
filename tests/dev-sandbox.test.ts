import { describe, expect, it } from "vitest";
import { CLASS_CONTENT } from "../src/content/demo-content.js";
import { luaChonHopLe } from "../src/engine/read-model.js";
import { DevSandboxRuntime, type SandboxActorSetup } from "../src/runtime/dev-sandbox-runtime.js";

const classes = [...CLASS_CONTENT.heroes, ...CLASS_CONTENT.linh_than];
function actor(class_id: string, name: string): SandboxActorSetup {
  const content = classes.find((item) => item.class_id === class_id)!;
  return { class_id, name, tier: content.tier ?? "B", allocation: { hp: 1, atk: 1, def: 1, spd: 1, mp: 1, mp_hoi: 0 }, skill_ids: content.skills.slice(0, 4).map((skill) => skill.id), control: "NGUOI_CHOI" };
}

describe("DevSandboxRuntime", () => {
  it("creates an isolated engine match with a content snapshot and steps canonical turns", () => {
    const runtime = new DevSandboxRuntime();
    const match = runtime.start({ teamA: [actor("hero-thanh-giong", "A")], teamB: [actor("hero-so-dua", "B")], seed: 1234, contentVersion: 7, classes });
    expect(match.du_lieu_noi_dung_snapshot.phien_ban_content).toBe(7);
    expect(match.trang_thai_chien_dau.actors).toHaveLength(2);
    const current = match.trang_thai_chien_dau.actors.find((item) => item.actor_id === match.trang_thai_chien_dau.actor_dang_di)!;
    const option = luaChonHopLe(match).ky_nang.find((skill) => skill.dung_duoc)!;
    const before = runtime.current()!;
    const result = runtime.act({ ky_nang_id: option.ky_nang_id, target_actor_id: option.target_hop_le[0] });
    expect(result.ok).toBe(true);
    expect(runtime.current()!.nhat_ky_luot_danh.length).toBe(1);
    expect(current.actor_id).toBeDefined();
    expect(before.nhat_ky_luot_danh).toHaveLength(0);
    runtime.reset();
    expect(runtime.current()).toBeNull();
  });

  it("repeats the same seeded start state without touching player progression", () => {
    const left = new DevSandboxRuntime();
    const right = new DevSandboxRuntime();
    const input = { teamA: [actor("hero-thanh-giong", "A")], teamB: [actor("hero-so-dua", "B")], seed: 98765, contentVersion: 1, classes };
    expect(left.start(input)).toEqual(right.start(input));
    expect("vi_huong_hoa" in left.current()!).toBe(false);
  });

  it("keeps active battle content frozen when the next test uses edited content", () => {
    const runtime = new DevSandboxRuntime();
    const draftClasses = structuredClone(classes);
    const before = runtime.start({ teamA: [actor("hero-thanh-giong", "A")], teamB: [actor("hero-so-dua", "B")], seed: 11, contentVersion: 1, classes: draftClasses });
    const actorContentBefore = before.du_lieu_noi_dung_snapshot.actors.A1!;
    const updated = draftClasses.find((item) => item.class_id === "hero-thanh-giong")!;
    updated.stats.atk_nen += 100;
    updated.skills[0]!.ten_hien_thi = "Bản sửa tiếp theo";
    const next = runtime.start({ teamA: [actor("hero-thanh-giong", "A")], teamB: [actor("hero-so-dua", "B")], seed: 12, contentVersion: 2, classes: draftClasses });
    expect(before.du_lieu_noi_dung_snapshot.actors.A1!.chi_so_nen.atk_nen).toBe(actorContentBefore.chi_so_nen.atk_nen);
    expect(before.du_lieu_noi_dung_snapshot.actors.A1!.ky_nang[0]!.ten_hien_thi).not.toBe("Bản sửa tiếp theo");
    expect(next.du_lieu_noi_dung_snapshot.phien_ban_content).toBe(2);
    expect(next.du_lieu_noi_dung_snapshot.actors.A1!.chi_so_nen.atk_nen).toBe(actorContentBefore.chi_so_nen.atk_nen + 100);
  });

  it("allows per-match tier overrides without changing the official preset tier", () => {
    const runtime = new DevSandboxRuntime();
    const setupA = { ...actor("hero-thanh-giong", "A"), tier: "B" as const };
    const match = runtime.start({ teamA: [setupA], teamB: [actor("hero-so-dua", "B")], seed: 7, contentVersion: 1, classes });
    expect(match.du_lieu_noi_dung_snapshot.actors.A1?.tier).toBe("B");
    expect(classes.find((item) => item.class_id === "hero-thanh-giong")?.tier).toBe("SS");
  });
});
