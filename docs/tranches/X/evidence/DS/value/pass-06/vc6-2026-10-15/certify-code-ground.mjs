#!/usr/bin/env node
// X-DS · value · pass 6 (VC6-05) — certify the dark code paper at a chroma cap of 0.05
// against the five dark hljs crayons + the dark code ink, over EVERY accent hue (step 5°).
// The ground is `oklch(from var(--accent-live) 0.345 min(c, CAP) h)`; the worst case is the
// cap itself (a stronger accent clamps to it). Pure OKLCh -> sRGB (clipped) -> WCAG 2 ratio.
const toLin = (L, C, h) => {
    const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map((v) => Math.min(1, Math.max(0, v)));
};
const Y = (lin) => 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
const hsl = (h, s, l) => { s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l); const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)); return [f(0), f(8), f(4)].map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); };
const inks = {
    "--code-comment": hsl(34, 14, 66),
    "--code-keyword": toLin(0.75, 0.15, 27),
    "--code-entity": toLin(0.76, 0.11, 262),
    "--code-string": toLin(0.77, 0.11, 148),
    "--code-number": toLin(0.8, 0.11, 85),
    "--code-ink (#e9e6e2)": [0xe9, 0xe6, 0xe2].map((v) => ((v / 255) <= 0.04045 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4)),
};
const out = {};
for (const cap of [0.03, 0.05]) {
    const res = {};
    for (const [k, ink] of Object.entries(inks)) {
        let min = Infinity, at = 0;
        for (let h = 0; h < 360; h += 5) {
            const g = Y(toLin(0.345, cap, h)), t = Y(ink);
            const cr = (Math.max(g, t) + 0.05) / (Math.min(g, t) + 0.05);
            if (cr < min) { min = cr; at = h; }
        }
        res[k] = { min: +min.toFixed(2), atHue: at };
    }
    out[`cap ${cap}`] = res;
}
console.log(JSON.stringify(out, null, 1));
