/**
 * BORN-RED — fourier-analysis `web/src/lib/colors.ts:22` `cssVarToHex`, run against the
 * ACTUAL --viz-* token values in the tree today.
 *
 * Sources of truth:
 *   glass-ui@4.0.0 (fourier's installed version, web/node_modules/@mkbabb/glass-ui):
 *     styles :245-246, :263-267  --section-color-4/5 and --viz-* are all oklch()
 *   fourier-local overrides, web/src/style.css:119-127 (:root and .dark):
 *     --viz-amber and --section-color-5 forced to hsl()
 *
 * getComputedStyle().getPropertyValue() on an UNREGISTERED custom property returns the
 * computed value = specified token stream with var() substituted, and with NO type
 * resolution: an oklch() token comes back as the literal text "oklch(...)".
 * cssVarToHex has four arms — hex, hsl(), bare-HSL-triplet, rgb() — and no oklch arm,
 * so every oklch token silently becomes the "#888888" fallback.
 *
 * `resolveVizColors()` (colors.ts:90) is called on mount and on every theme MutationObserver
 * tick (web/src/App.vue:11,13); VIZ_COLORS has 50 read sites across 14 files.
 *
 * run: node docs/tranches/V/megatranche/audit/probes/fourier-vizcolor-oklch.mjs
 * GREEN condition: 0 tokens fall through to #888888.
 */
const hslToHex = (h, s, l) => {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => { const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))).toString(16).padStart(2, "0"); };
    return `#${f(0)}${f(8)}${f(4)}`;
};
const rgbToHex = (r, g, b) => `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

// verbatim transcription of web/src/lib/colors.ts:22-53 (DOM read replaced by the argument)
function cssVarToHex(raw) {
    raw = raw.trim();
    if (!raw) return "#888888";
    if (raw.startsWith("#")) return raw;
    const hslMatch = raw.match(/hsl\(\s*([\d.]+)\s*[ ,]\s*([\d.]+)%?\s*[ ,]\s*([\d.]+)%?\s*\)/);
    if (hslMatch) return hslToHex(+hslMatch[1], +hslMatch[2], +hslMatch[3]);
    const bareMatch = raw.match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
    if (bareMatch) return hslToHex(+bareMatch[1], +bareMatch[2], +bareMatch[3]);
    const rgbMatch = raw.match(/rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);
    if (rgbMatch) return rgbToHex(+rgbMatch[1], +rgbMatch[2], +rgbMatch[3]);
    return "#888888";
}

// the five tokens resolveVizColors() reads, computed-value text, light theme
const LIGHT = [
    ["--viz-fourier",   "oklch(0.579 0.201 30.4)",  "glass-ui@4.0.0 :263"],
    ["--viz-chebyshev", "oklch(0.484 0.163 265.5)", "glass-ui@4.0.0 :264"],
    ["--viz-legendre",  "oklch(0.532 0.180 317.5)", "glass-ui@4.0.0 :265"],
    ["--viz-green",     "oklch(0.551 0.088 171.1)", "glass-ui@4.0.0 :245 via var(--section-color-4)"],
    ["--viz-amber",     "hsl(35 76% 35%)",          "fourier style.css:120 local override"],
];
// the dark arm additionally hands back an UNRESOLVED light-dark() for the same three
const DARK_EXTRA = [
    ["--viz-fourier (dark, light-dark form)", "light-dark(oklch(0.579 0.201 30.4),  oklch(0.693 0.151 28.1))", "glass-ui@4.0.0 :145"],
];

let grey = 0, total = 0;
for (const [name, raw, src] of [...LIGHT, ...DARK_EXTRA]) {
    total++;
    const out = cssVarToHex(raw);
    const bad = out === "#888888";
    if (bad) grey++;
    console.log(`${bad ? "RED " : "ok  "} ${name.padEnd(38)} -> ${out}   (${src})`);
}
console.log(`\n${grey}/${total} tokens collapse to the #888888 fallback.`);
console.log(grey ? "RED — the Fourier/Chebyshev/Legendre series and the green axis paint identical grey." : "GREEN");
process.exit(grey ? 1 : 0);
