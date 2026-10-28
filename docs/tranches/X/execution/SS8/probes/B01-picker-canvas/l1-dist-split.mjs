// SS8-0019/0025 cure witness: dist toRgba8(hsv) vs exact rational HSV->RGB, split by cause.
// Exact reference: grid values are rationals (H=12k, s=i/18, v=j/18) -> 255*channel computed in BigInt-free rationals
// via the mini's closed form at higher precision is unnecessary: we classify each disagreement with the mini as
//   'mode'  = mini channel exactly k+.5 at the closed form AND dist == roundHalfEven(k+.5)  (CSS rounding rule, not drift)
//   'drift' = anything else.
import { hsv, toRgba8, convertColor } from "../../../../../../../dist/subpaths/color.js";
const mini = (H, s, v) => { const h = H / 360, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  return [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]][i % 6]; };
const rhe = (x) => { const f = Math.floor(x), d = x - f; return d > 0.5 ? f + 1 : d < 0.5 ? f : (f % 2 === 0 ? f : f + 1); };
const hs = Array.from({ length: 30 }, (_, i) => i * 12), ss = Array.from({ length: 19 }, (_, i) => i / 18);
let n = 0, dMini = 0, mode = 0, drift = 0; const ex = [];
for (const H of hs) for (const s of ss) for (const v of ss) {
  n++; const lib = toRgba8(hsv(H, s, v).value, { gamut: "clip" }).value.slice(0, 3);
  const m = mini(H, s, v).map((c) => c * 255);
  const rounded = m.map(Math.round);
  if (lib.some((c, k) => c !== rounded[k])) { dMini++;
    const isMode = lib.every((c, k) => c === rounded[k] || (Math.abs((m[k] % 1) - 0.5) < 1e-9 && c === rhe(Math.round(m[k] * 2) / 2)));
    if (isMode) mode++; else { drift++; if (ex.length < 5) ex.push({ H, s, v, lib, mini255: m }); } }
}
const probe = convertColor(hsv(0, 0.6, 0.25).value, "rgb").value.channels;
console.log(JSON.stringify({ n, disagreeWithMini: dMini, pct: +(100 * dMini / n).toFixed(3), roundingModeTies: mode, drift, driftExamples: ex,
  m9Sample: { channels: probe, rgba8: toRgba8(hsv(0, 0.6, 0.25).value, { gamut: "clip" }).value } }, null, 1));
