import { generatePalette, HARMONY_NAMES, PRESET_NAMES } from "../../../../../../../demo/color-session/generate-color";

const SEED = 0x1a2b3c4d;
console.log("=== COUNT PREFIX STABILITY (preset=vibrant, seed fixed) ===");
console.log("harmony              | n=5 -> n=6 : prefix colours preserved (of 5)");
for (const h of HARMONY_NAMES) {
    const a = generatePalette(5, "vibrant", h, SEED);
    const b = generatePalette(6, "vibrant", h, SEED);
    const same = a.filter((c, i) => c === b[i]).length;
    console.log(`${h.padEnd(20)} | ${same}/5   ${same === 5 ? "STABLE" : "DESTRUCTIVE"}`);
    if (h === "triadic") { console.log("   n=5:", a.join(" ")); console.log("   n=6:", b.join(" ")); }
}

console.log("\n=== PREVIEW STRIP TRUTH: strip caps at 7 segments (STRIP_SEGMENT_CAP) ===");
for (const n of [5, 7, 8, 12]) {
    const p = generatePalette(n, "vibrant", "golden", SEED);
    console.log(`count=${String(n).padStart(2)}  palette stops=${p.length}  strip shows=${Math.min(n,7)}  hidden=${Math.max(0,n-7)}`);
}

console.log("\n=== count=1 : do the 10 preset rows differ? (seed fixed, harmony=golden) ===");
const one = PRESET_NAMES.map((p) => `${p.padEnd(8)} ${generatePalette(1, p, "golden", SEED)[0]}`);
console.log(one.join("\n"));
const uniq1 = new Set(PRESET_NAMES.map((p) => generatePalette(1, p, "golden", SEED)[0]));
console.log(`distinct preset previews at count=1: ${uniq1.size}/10`);

console.log("\n=== count=1 : do the 6 harmony rows differ? ===");
const hs = HARMONY_NAMES.map((h) => generatePalette(1, "vibrant", h, SEED)[0]);
HARMONY_NAMES.forEach((h, i) => console.log(`${h.padEnd(20)} ${hs[i]}`));
console.log(`distinct harmony previews at count=1: ${new Set(hs).size}/6`);

console.log("\n=== harmony preview discrimination at DEFAULT count=5 ===");
const h5 = HARMONY_NAMES.map((h) => generatePalette(5, "vibrant", h, SEED).join("|"));
console.log(`distinct harmony previews at count=5: ${new Set(h5).size}/6`);

console.log("\n=== clipboard payload (copyColors) ===");
console.log(generatePalette(5, "vibrant", "golden", SEED).join(", "));
