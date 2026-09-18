import { hsv, toRgba8 } from "/Users/mkbabb/Programming/value.js/dist/subpaths/color.js";

function componentBytes(hueDeg, sat, val) {
    const h = hueDeg / 360, s = sat, v = val;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function libBytes(hueDeg, sat, val) {
    const c = hsv(hueDeg, sat, val, 1);
    if (!c.ok) throw new Error("hsv rejected");
    const p = toRgba8(c.value, { gamut: "clip" });
    if (!p.ok) throw new Error("toRgba8 failed");
    return [p.value[0], p.value[1], p.value[2]];
}

// EXACT grid — integer-derived, no float accumulation
let n = 0, mismatch = 0, maxDelta = 0;
const worst = [];
for (let hi = 0; hi <= 120; hi++) {
  const H = hi * 3;
  for (let si = 0; si <= 20; si++) {
    const S = si / 20;
    for (let vi = 0; vi <= 20; vi++) {
      const V = vi / 20;
      const a = componentBytes(H, S, V), b = libBytes(H, S, V);
      n++;
      const d = Math.max(Math.abs(a[0]-b[0]), Math.abs(a[1]-b[1]), Math.abs(a[2]-b[2]));
      if (d > 0) {
        mismatch++;
        if (d > maxDelta) { maxDelta = d; }
        if (d >= 2 && worst.length < 10) worst.push({H, S, V, component: a.join(","), library: b.join(",") , delta: d});
      }
    }
  }
}
console.log(`EXACT grid: ${n} samples, ${mismatch} byte-level mismatches (${(100*mismatch/n).toFixed(2)}%), MAX |delta| = ${maxDelta} of 255`);
if (worst.length) console.table(worst); else console.log("no sample diverged by >=2 bytes");
