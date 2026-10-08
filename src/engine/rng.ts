/** PRNG thuần thuật toán — mulberry32. Cấm Math.random trong combat. Spec 1.5.0a */

export function hashSeedU32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function nextU32(state: number): { value: number; state: number } {
  const nextState = (state + 0x6d2b79f5) >>> 0;
  let t = nextState;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const value = (t ^ (t >>> 14)) >>> 0;
  return { value, state: nextState };
}

export function nextFloat(state: number): { value: number; state: number } {
  const r = nextU32(state);
  return { value: r.value / 4294967296, state: r.state };
}

export function chonNgauNhienIndex(state: number, n: number): { index: number; state: number } {
  if (n <= 0) return { index: 0, state };
  const r = nextFloat(state);
  return { index: Math.min(n - 1, Math.floor(r.value * n)), state: r.state };
}
