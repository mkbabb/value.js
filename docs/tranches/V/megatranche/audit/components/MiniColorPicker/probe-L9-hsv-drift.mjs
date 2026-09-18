import { hsv, convertColor, toRgba8 } from "/Users/mkbabb/Programming/value.js/dist/subpaths/color.js";

// ---- verbatim transcription of MiniColorPicker.vue:85-125 ----
function componentHex(hueDeg, sat, val) {
    const h = hueDeg / 360, s = sat, v = val;
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

// verbatim transcription of the incoming-hex watch, MiniColorPicker.vue:110-125
function componentParse(incomingHex, prevHue) {
    const r = parseInt(incomingHex.slice(1, 3), 16) / 255;
    const g = parseInt(incomingHex.slice(3, 5), 16) / 255;
    const b = parseInt(incomingHex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    const val = max;
    const sat = max === 0 ? 0 : d / max;
    if (d === 0) return { hue: prevHue, sat, val };
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return { hue: h * 360, sat, val };
}

// ---- library path (what picker-color.ts / pickerColorToHex does) ----
function libHex(hueDeg, sat, val) {
    const c = hsv(hueDeg, sat, val, 1);
    if (!c.ok) throw new Error("hsv() rejected " + JSON.stringify([hueDeg, sat, val]) + " -> " + c.error.code);
    const p = toRgba8(c.value, { gamut: "clip" });
    if (!p.ok) throw new Error("toRgba8 failed");
    const hx = (v) => v.toString(16).padStart(2, "0");
    return `#${hx(p.value[0])}${hx(p.value[1])}${hx(p.value[2])}`;
}

// === TEST 1: forward agreement over a dense grid ===
let n = 0, mismatch = 0;
const examples = [];
for (let H = 0; H <= 360; H += 3)
  for (let S = 0; S <= 1.0001; S += 0.05)
    for (let V = 0; V <= 1.0001; V += 0.05) {
      const a = componentHex(H, S, V), b = libHex(H, S, V);
      n++;
      if (a !== b) { mismatch++; if (examples.length < 8) examples.push({H, S:+S.toFixed(2), V:+V.toFixed(2), component:a, library:b}); }
    }
console.log(`TEST1 forward hsv->hex: ${n} samples, ${mismatch} mismatches (${(100*mismatch/n).toFixed(3)}%)`);
console.table(examples);

// === TEST 2: hue=360 boundary (component clamps to 360, does not wrap) ===
console.log("\nTEST2 hue boundary:");
for (const H of [359.9, 360]) {
  let lib = "THROWS/na";
  try { lib = libHex(H, 1, 1); } catch (e) { lib = "ERR:" + e.message.slice(0,60); }
  console.log(`  H=${H} component=${componentHex(H,1,1)} library=${lib}`);
}

// === TEST 3: the parent<->child hex round-trip (SearchFilterBar feeds update:hex back in as the hex prop) ===
// Simulate: user drags to (H,S,V); component emits hex; parent writes it back; watch re-derives.
console.log("\nTEST3 round-trip hue drift (drag to a dark/desaturated point, parent echoes hex back):");
const cases = [
  { H: 210, S: 0.6, V: 0.8, label: "default seed (bright)" },
  { H: 210, S: 0.6, V: 0.03, label: "near-black" },
  { H: 210, S: 0.04, V: 0.5, label: "near-gray" },
  { H: 37,  S: 0.02, V: 0.9, label: "near-white warm" },
  { H: 137, S: 0.01, V: 0.4, label: "very low sat" },
];
for (const c of cases) {
  const emitted = componentHex(c.H, c.S, c.V);
  const back = componentParse(emitted, c.H);
  const dHue = Math.abs(back.hue - c.H);
  console.log(`  ${c.label.padEnd(22)} in H=${String(c.H).padStart(5)} S=${c.S} V=${c.V} -> ${emitted} -> H=${back.hue.toFixed(1)} S=${back.sat.toFixed(3)} V=${back.val.toFixed(3)}  |dHue|=${dHue.toFixed(1)}deg`);
}

// === TEST 4: how many distinct (S,V) drag positions survive the hex round-trip at low V? ===
console.log("\nTEST4 state collapse: distinct hexes produced while dragging the FULL SV canvas at low value");
for (const V of [1.0, 0.5, 0.1, 0.03]) {
  const set = new Set();
  for (let S = 0; S <= 1; S += 1/512) set.add(componentHex(210, S, V));
  console.log(`  V=${String(V).padEnd(5)} -> ${String(set.size).padStart(4)} distinct hexes across 513 horizontal drag positions`);
}
