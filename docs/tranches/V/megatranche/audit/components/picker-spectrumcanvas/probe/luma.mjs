// Exact composite of the shipped plate:
//   base(x) = mix(#fff, hsl(h 100% 50%), s)   [linear-gradient to right]
//   out     = base * v                        [black at alpha (1-v) over base]
// vs. the shipped model spectrumLuma(s,v) = v*(1 - s*0.5), flip at 0.5.
const SPECTRUM_LUMA_FLIP = 0.5;
const spectrumLuma = (s, v) => v * (1 - s * 0.5);
const isLight = (s, v) => spectrumLuma(s, v) > SPECTRUM_LUMA_FLIP;

function hslToRgb(h) { // s=100%, l=50%
  const f = (n) => { const k = (n + h / 30) % 12; const a = 1 * Math.min(0.5, 1 - 0.5); return 0.5 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
  return [f(0), f(8), f(4)];
}
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const [x, y] = [relLum(a), relLum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const rows = [];
for (const h of [0, 60, 120, 180, 240, 300]) {
  const hue = hslToRgb(h);
  for (const [s, v] of [[1, 1], [1, 0.9], [0.8, 1], [1, 0.75], [0.6, 1]]) {
    const base = hue.map((c) => 1 * (1 - s) + c * s);
    const out = base.map((c) => c * v);
    const light = isLight(s, v);
    const border = light ? [0, 0, 0] : [1, 1, 1];
    rows.push({ h, s, v,
      modelSaysLight: light,
      trueRelLum: +relLum(out).toFixed(3),
      borderPicked: light ? "black" : "white",
      contrast: +contrast(border, out).toFixed(2),
      wcagUiPass: contrast(border, out) >= 3 });
  }
}
console.log("h   s    v    modelLight trueLum border  contrast pass(>=3:1)");
for (const r of rows) console.log(
  `${String(r.h).padStart(3)} ${r.s.toFixed(2)} ${r.v.toFixed(2)}  ${String(r.modelSaysLight).padEnd(9)} ${String(r.trueRelLum).padEnd(6)}  ${r.borderPicked.padEnd(6)} ${String(r.contrast).padStart(6)}   ${r.wcagUiPass ? "PASS" : "**FAIL**"}`);
const fails = rows.filter(r => !r.wcagUiPass);
console.log(`\n${fails.length}/${rows.length} sampled (h,s,v) fail WCAG 1.4.11 non-text contrast (3:1) for the dot border.`);
