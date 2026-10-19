// SERVED MODEL: claude-opus-5[1m]
//
// X.F.W2 unit `.b` — G11: THE COLOUR-VALUE CENSUS over fourier's `web/src`.
//
// The denominator is keyed on authored colour VALUES, never on import
// specifiers. An import-keyed inventory is provably blind three ways, and all
// three are re-measured live below: `ImageUpload.vue` duplicates six palette
// hexes in an SFC with zero `@mkbabb` imports; `ContourEditorCanvas.vue` painted
// brand amber at eight inline SVG attributes with zero declarations;
// `CanvasControlsDock.vue` reads `--viz-amber` twice while importing nothing.
//
// METHOD (K-24 — "the inventory must be exact"):
//   1. comments are BLANKED first, offsets preserved: a colour named in prose is
//      not a paint site, and counting one is how a census inflates itself;
//   2. every remaining colour-value form is classified —
//        BRAND    a chromatic colour value authored outside the token cascade;
//        NEUTRAL  black/white/grey scrim, shadow or ink — declared, not identity;
//        COMPOSE  an interpolation whose EVERY channel is a variable (the
//                 declared hex residual's own `rgba(${r}, ${g}, ${b}, ${a})`).
//      An interpolation with ANY authored channel — `hsl(${h}, 85%, 55%)` — is
//      BRAND: the frozen saturation and lightness ARE the authored value, and
//      that is the whole of the four `spectrumColor` ramps.
//   3. `var(--token)` is never a value. It is the cascade, which is the target
//      posture, so a file full of `var(--viz-*)` reads scores zero.
//   4. the sixteen measured zero-cells are re-measured on BOTH axes and
//      subtracted from the CONSUMPTION denominator with their ids — never from
//      the colour roster, because two of them author colour.
//
// run: node docs/tranches/X/fourier/evidence/w2/colour-value-census-2026-09-18.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = "/Users/mkbabb/Programming/fourier-analysis/web/src";

const FORMS = [
    ["hex", /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g],
    ["hsl", /\bhsla?\(/g],
    ["rgb", /\brgba?\(/g],
    ["oklch", /\b(?:oklch|oklab|lab|lch)\(/g],
];

/** Blank every comment span, preserving offsets and line structure. */
function blankComments(src) {
    const out = src.split("");
    const blank = (from, to) => {
        for (let k = from; k < to && k < out.length; k++) {
            if (out[k] !== "\n") out[k] = " ";
        }
    };
    let i = 0;
    while (i < src.length) {
        if (src.startsWith("/*", i)) {
            const end = src.indexOf("*/", i + 2);
            const stop = end === -1 ? src.length : end + 2;
            blank(i, stop);
            i = stop;
        } else if (src.startsWith("//", i) && src[i - 1] !== ":") {
            const end = src.indexOf("\n", i);
            const stop = end === -1 ? src.length : end;
            blank(i, stop);
            i = stop;
        } else if (src.startsWith("<!--", i)) {
            const end = src.indexOf("-->", i + 4);
            const stop = end === -1 ? src.length : end + 3;
            blank(i, stop);
            i = stop;
        } else i++;
    }
    return out.join("");
}

const argsOf = (line, idx) => {
    const open = line.indexOf("(", idx);
    if (open === -1) return "";
    let depth = 0;
    for (let k = open; k < line.length; k++) {
        if (line[k] === "(") depth++;
        else if (line[k] === ")" && !--depth) return line.slice(open + 1, k);
    }
    return line.slice(open + 1);
};

const classify = (line, idx, form) => {
    if (form === "hex") {
        const m = line.slice(idx).match(/#([0-9a-fA-F]{6})/);
        if (m) {
            const [r, g, b] = [0, 2, 4].map((k) => parseInt(m[1].slice(k, k + 2), 16));
            if (r === g && g === b) return "NEUTRAL";
        }
        return "BRAND";
    }
    const a = argsOf(line, idx);
    if (a.includes("${") && !/\d/.test(a.replace(/\$\{[^}]*\}/g, ""))) return "COMPOSE";
    if (form === "rgb") {
        const m = a.match(/^\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
        if (m) {
            const [r, g, b] = m.slice(1).map(Number);
            if (r === g && g === b) return "NEUTRAL";
        }
    }
    if (form === "hsl") {
        const m = a.match(/^\s*[\d.]+[a-z]*[,\s]+([\d.]+)%/);
        if (m && Number(m[1]) === 0) return "NEUTRAL";
    }
    return "BRAND";
};

const files = [];
(function walk(dir) {
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(ts|vue|css|js)$/.test(p)) files.push(p);
    }
})(ROOT);

const rows = new Map();
const tally = { BRAND: 0, NEUTRAL: 0, COMPOSE: 0, IN_COMMENT: 0 };
const countAll = (text) => {
    let n = 0;
    for (const line of text.split("\n")) {
        for (const [, re] of FORMS) {
            re.lastIndex = 0;
            while (re.exec(line)) n++;
        }
    }
    return n;
};
for (const f of files) {
    const raw = readFileSync(f, "utf8");
    const code = blankComments(raw);
    const rel = relative(ROOT, f);
    const importKeyed = /@mkbabb\//.test(raw);
    tally.IN_COMMENT += countAll(raw) - countAll(code);
    code.split("\n").forEach((line, i) => {
        for (const [form, re] of FORMS) {
            re.lastIndex = 0;
            let m;
            while ((m = re.exec(line))) {
                const cls = classify(line, m.index, form);
                tally[cls]++;
                if (!rows.has(rel))
                    rows.set(rel, { importKeyed, BRAND: 0, NEUTRAL: 0, COMPOSE: 0, sites: [] });
                const r = rows.get(rel);
                r[cls]++;
                if (cls === "BRAND") r.sites.push(String(i + 1));
            }
        }
    });
}

const brand = [...rows.entries()]
    .filter(([, r]) => r.BRAND > 0)
    .sort((a, b) => b[1].BRAND - a[1].BRAND || a[0].localeCompare(b[0]));
const blind = brand.filter(([, r]) => !r.importKeyed);

console.log("THE ROSTER — every file authoring a brand colour value\n");
console.log("  keyed  brand  file (BRAND site lines)");
for (const [f, r] of brand) {
    console.log(
        `  ${r.importKeyed ? "IMP  " : "BLIND"}  ${String(r.BRAND).padStart(5)}  ${f} [${[...new Set(r.sites)].join(",")}]`,
    );
}
console.log(
    `\n  ${files.length} files scanned · ${brand.length} author brand colour · ${brand.reduce((a, [, r]) => a + r.BRAND, 0)} brand values`,
);
console.log(
    `  INVISIBLE TO AN IMPORT-KEYED CENSUS: ${blind.length} files · ${blind.reduce((a, [, r]) => a + r.BRAND, 0)} values`,
);
console.log(
    `  occurrences by class: BRAND ${tally.BRAND} · NEUTRAL ${tally.NEUTRAL} · COMPOSE ${tally.COMPOSE} · in comments (excluded) ${tally.IN_COMMENT}`,
);

// ── the sixteen measured zero-cells, subtracted and cited ────────────────────
const CELLS = [
    ["fr-App", "C-12", "App.vue"],
    ["fr-Tooltip", "FR-TT-22", "components/ui/tooltip/Tooltip.vue"],
    ["fr-UserSlugBar", "FR-USB-38", "components/visualization/gallery/UserSlugBar.vue"],
    ["fr-EquationModeToggle", "FR-EMT-24", "components/equation/EquationModeToggle.vue"],
    ["fr-FunctionInput", "item 6", "components/equation/FunctionInput.vue"],
    ["fr-CanvasControlsDock", "C-25", "components/visualization/CanvasControlsDock.vue"],
    ["fr-MobileFloatingToc", "item 9", "components/paper/MobileFloatingToc.vue"],
    ["fr-PaperView", "C-08", "components/paper/PaperView.vue"],
    ["fr-ConvergenceTimeline", "S-9", "components/equation/convergence/ConvergenceTimeline.vue"],
    ["fr-MorphShapePreview", "C·S-2", "components/morph/MorphShapePreview.vue"],
    ["fr-AdminUserList", "FR-AUL-55", "components/visualization/gallery/AdminUserList.vue"],
    ["fr-AnimationControls", "C-18", "components/visualization/AnimationControls.vue"],
    ["fr-CollapsibleSection", "P-9", "components/ui/CollapsibleSection.vue"],
    ["fr-PaperSearch", "P-9", "components/paper/PaperSearch.vue"],
    ["fr-PaperSearchInput", "P-9", "components/paper/search/PaperSearchInput.vue"],
    ["fr-PaperSearchDropdown", "P-9", "components/paper/search/PaperSearchDropdown.vue"],
];
console.log("\nTHE SIXTEEN ZERO-CELLS — subtracted from the CONSUMPTION denominator, cited by id\n");
console.log("  record / id                        imports  brand  var(--viz-*) reads");
let imps = 0;
let bs = 0;
let reads = 0;
for (const [record, id, rel] of CELLS) {
    const src = readFileSync(join(ROOT, rel), "utf8");
    const imports = (src.match(/@mkbabb\/[a-z.-]+/g) ?? []).filter(
        (s) => s.includes("value.js") || s.includes("keyframes"),
    ).length;
    const b = rows.get(rel)?.BRAND ?? 0;
    const tokenReads = (src.match(/var\(--viz-[a-z]+\)/g) ?? []).length;
    imps += imports;
    bs += b;
    reads += tokenReads;
    console.log(
        `  ${(record + " " + id).padEnd(34)} ${String(imports).padStart(7)} ${String(b).padStart(6)} ${String(tokenReads).padStart(19)}`,
    );
}
console.log(
    `\n  ${CELLS.length} cells · value.js/keyframes imports ${imps} (the zero-cell claim, reproduced) · brand colour values ${bs} · --viz-* reads ${reads}`,
);
console.log(
    "  A zero-cell is zero on the CONSUMPTION axis and is not thereby zero on the colour axis —",
);
console.log(
    "  which is the denominator's whole shape: zero import cost, non-zero colour cost.",
);
