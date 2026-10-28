// Counts grid cells where the mini's closed form lands within 1e-9 of an x.5 tie (rounding-mode-sensitive).
const mini = (H, s, v) => { const h = H / 360, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  return [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]][i % 6]; };
const grids = { A: [Array.from({ length: 30 }, (_, i) => i * 12), Array.from({ length: 19 }, (_, i) => i / 18)],
  B: [Array.from({ length: 30 }, (_, i) => i * 12), Array.from({ length: 19 }, (_, i) => +(0.05 + i * 0.05).toFixed(2))] };
for (const [k, [hs, ss]] of Object.entries(grids)) { let ties = 0, n = 0;
  for (const H of hs) for (const s of ss) for (const v of ss) { n++; if (mini(H, s, v).some((c) => Math.abs(((c * 255) % 1) - 0.5) < 1e-6)) ties++; }
  console.log(k, { n, cellsWithTieChannel: ties }); }
