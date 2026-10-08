import { resolveTurn, xacDinhBoLuotTuDong } from "./combat.js";
import type { ActionInput, TranDau, TurnResult } from "./types.js";

/**
 * Runtime adapter contract. `commitOne` must atomically persist one engine result
 * before returning; calls are awaited serially so each automatic turn is a new commit.
 */
export async function resolveAndAutoAdvance(
  initial: TranDau,
  firstAction: ActionInput,
  callerId: string | null,
  commitOne: (current: TranDau, action: ActionInput, trusted: boolean) => Promise<TurnResult>,
  maxAutoActions = 150,
): Promise<TurnResult> {
  let result = await commitOne(initial, firstAction, false);
  if (!result.ok) return result;
  let current = result.tran;
  let resolvedAutomatic = 0;

  while (current.trang_thai === "DANG_DIEN_RA" && resolvedAutomatic < maxAutoActions) {
    const state = current.trang_thai_chien_dau;
    const actor = state.actors.find((candidate) => candidate.actor_id === state.actor_dang_di);
    if (!actor) break;
    const content = current.du_lieu_noi_dung_snapshot.actors[actor.actor_id];
    const mpAfterRecovery = Math.min(actor.mp_toi_da, actor.mp_hien_tai + content!.chi_so_cuoi.mp_hoi);
    const autoReason = xacDinhBoLuotTuDong(current, actor, content, mpAfterRecovery);
    const isAi = actor.dieu_khien === "AI";
    if (!isAi && !autoReason) break;

    const action: ActionInput = isAi && !autoReason ? { ai_tu_dong: true } : { bo_luot: true };
    // Contract: every successful invocation is committed independently before the next begins.
    result = await commitOne(current, action, true);
    if (!result.ok) return result;
    current = result.tran;
    resolvedAutomatic++;
  }
  return { ok: true, tran: current };
}

/** In-memory adapter for tests and Local Runtime prototypes; clone protects committed history. */
export async function resolveAndAutoAdvanceInMemory(initial: TranDau, action: ActionInput, callerId: string | null): Promise<TurnResult> {
  return resolveAndAutoAdvance(initial, action, callerId, async (current, nextAction, trusted) => resolveTurn(current, nextAction, callerId, trusted));
}
