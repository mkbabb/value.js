// Is MiniColorPicker.vue:85-105 (hand-rolled HSV->hex) a duplicate of the
// published @mkbabb/value.js/color path, and where does it diverge?
import { hsv, toRgba8 } from "/Users/mkbabb/Programming/value.js/dist/subpaths/color.js";

// verbatim from MiniColorPicker.vue:85-105
function handRolled(hueDeg, s, v) {
    const h = hueDeg / 360;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function library(hueDeg, s, v) {
    const c = hsv(hueDeg, s, v, 1);
    if (!c.ok) return "ERR:" + c.error.code;
    const bytes = toRgba8(c.value, { gamut: "clip" });
    if (!bytes.ok) return "ERR:" + bytes.error.code;
    const [r, g, b] = bytes.value;
    const h2 = (n) => n.toString(16).padStart(2, "0");
    return `#${h2(r)}${h2(g)}${h2(b)}`;
}

let mismatch = 0, total = 0;
const bad = [];
for (let h = 0; h <= 360; h += 1) {
    for (let s = 0; s <= 1.0001; s += 0.05) {
        for (let v = 0; v <= 1.0001; v += 0.05) {
            total++;
            const a = handRolled(h, s, v), b = library(h, s, v);
            if (a !== b) { mismatch++; if (bad.length < 8) bad.push([h, +s.toFixed(2), +v.toFixed(2), a, b]); }
        }
    }
}
console.log(`HSV->hex: ${mismatch} mismatches / ${total} samples`);
for (const r of bad) console.log("  h=%s s=%s v=%s  handRolled=%s  library=%s", ...r);

console.log("\nhue=360 s=1 v=1 -> handRolled", handRolled(360, 1, 1), " library", library(360, 1, 1));
console.log("hue=359.9 s=1 v=1 -> handRolled", handRolled(359.9, 1, 1), " library", library(359.9, 1, 1));
