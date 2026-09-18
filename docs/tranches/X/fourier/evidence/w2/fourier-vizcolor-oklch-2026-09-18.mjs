// SERVED MODEL: claude-opus-5[1m]
//
// X.F.W2 unit `.b` — the `--viz-*` token probe, RE-GROUNDED at the ADOPTED pin.
// A DATED ADDENDUM-BESIDE (E-3). It amends nothing:
// `docs/tranches/V/megatranche/audit/probes/fourier-vizcolor-oklch.mjs` keeps
// its bytes and stays a true reading of the pre-uplift tree.
//
// WHY IT IS RE-GROUNDED (finding F-1, `execution/C/F-W2.md`). The dated probe
//   (a) transcribes the five token texts from glass-ui@4.0.0 into its own source
//       — fourier now installs 8.0.0, so the transcription is a frozen claim,
//       not a reading; and
//   (b) simulates `cssVarToHex`, a four-regex resolver that `3bac3d5` DELETED.
// It therefore reports 5/6 RED against a code path that no longer exists. That
// reading is neither GREEN nor RED at this tree: it is stale, and a gate read
// off it would be read off a probe measuring a deleted function.
//
// WHAT THIS PROBE ASKS INSTEAD — the same question, at today's bytes:
//   LEG 1  the producer's SHIPPED token declarations, read from glass-ui 8.0.0's
//          own files and fourier's own override, parsed by value.js's own
//          `parseStylesheet`. Nothing is transcribed.
//   LEG 2  what value.js can resolve WITHOUT a cascade. This is the measurement
//          that retires the string-matching resolver by construction rather than
//          by assertion: `light-dark()` and `var()` forms are not context-free
//          colors, and no parser reaches the right arm without the engine.
//   LEG 3  the live cascade — the USED value of each token at both schemes, read
//          through a real probe element (glass-ui `/dom`'s own remedy), then
//          converted by `parseCssColor` + `toRgba8`, exactly as the landed
//          `colors.ts` does it.
//
// GREEN: leg 3 resolves every token to a distinct brand hue, 0 falling through
// to the `#888888` fallback the dated probe measured. The live leg is REQUIRED —
// if the app is unreachable the probe exits 2 INCONCLUSIVE and never 0, because
// a probe that passes when it cannot look is the defect it exists to catch.
//
// run: node docs/tranches/X/fourier/evidence/w2/fourier-vizcolor-oklch-2026-09-18.mjs
//      (with fourier's dev server on http://localhost:3000; override with BASE_URL)

import { readFileSync } from "node:fs";

const FOURIER = "/Users/mkbabb/Programming/fourier-analysis/web";
const GLASS = `${FOURIER}/node_modules/@mkbabb/glass-ui/dist/styles`;
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const css = await import(`${FOURIER}/node_modules/@mkbabb/value.js/dist/subpaths/css.js`);
const color = await import(`${FOURIER}/node_modules/@mkbabb/value.js/dist/subpaths/color.js`);

const SOURCES = [
    ["glass-ui 8.0.0 tokens/color-radius.css", `${GLASS}/tokens/color-radius.css`],
    ["glass-ui 8.0.0 tokens/light-dark.css", `${GLASS}/tokens/light-dark.css`],
    ["glass-ui 8.0.0 tokens/dark-arm.css", `${GLASS}/tokens/dark-arm.css`],
    ["fourier web/src/style.css", `${FOURIER}/src/style.css`],
];

const hex = (c) => {
    const r = color.toRgba8(c, { gamut: "clip" });
    return r.ok
        ? `#${r.value.slice(0, 3).map((n) => n.toString(16).padStart(2, "0")).join("")}`
        : null;
};

// ── LEG 1 ────────────────────────────────────────────────────────────────────
console.log("LEG 1 — the producer's shipped declarations, read not transcribed\n");
/** selector-arm → token name → authored text */
const declared = { ":root": new Map(), ".dark": new Map() };
const parseFailures = [];
for (const [label, path] of SOURCES) {
    const text = readFileSync(path, "utf8");
    const parsed = css.parseStylesheet(text);
    if (!parsed.ok) {
        const d = parsed.diagnostics?.[0];
        parseFailures.push([label, d]);
        console.log(
            `  ${label}: value.js parseStylesheet ok=false — ${d?.code} expected ${JSON.stringify(d?.expected)} actual ${JSON.stringify(d?.actual)}`,
        );
    }
    // The authored TEXT is what the cascade sees, so it is taken from the bytes
    // whether or not the whole sheet parses. Reported either way; never silent.
    for (const m of text.matchAll(/([.:][a-z-]+)\s*\{([^}]*)\}/g)) {
        const arm = m[1] === ":root" ? ":root" : m[1] === ".dark" ? ".dark" : null;
        if (!arm) continue;
        for (const d of m[2].matchAll(/(--(?:viz|section-color)-[a-z0-9-]+)\s*:\s*([^;]+)/g)) {
            declared[arm].set(d[1], d[2].trim());
        }
    }
    console.log(
        `  ${label}: parsed ok=${parsed.ok}, ${text.length} chars`,
    );
}
const VIZ = [...new Set([...declared[":root"].keys(), ...declared[".dark"].keys()])]
    .filter((n) => n.startsWith("--viz-"))
    .sort();
console.log(`\n  --viz-* tokens found: ${VIZ.length} — ${VIZ.join(" ")}`);
for (const arm of [":root", ".dark"]) {
    for (const n of VIZ) {
        const v = declared[arm].get(n);
        if (v) console.log(`    ${arm.padEnd(6)} ${n.padEnd(16)} ${v}`);
    }
}

// ── LEG 2 ────────────────────────────────────────────────────────────────────
console.log("\nLEG 2 — what value.js resolves WITHOUT the cascade\n");
let contextFree = 0;
let needsCascade = 0;
for (const arm of [":root", ".dark"]) {
    for (const n of VIZ) {
        let v = declared[arm].get(n);
        if (!v) continue;
        const alias = v.match(/^var\((--[a-z0-9-]+)\)$/);
        const hop = alias ? declared[arm].get(alias[1]) ?? declared[":root"].get(alias[1]) : null;
        const text = hop ?? v;
        const p = css.parseCssColor(text);
        if (p.ok) {
            contextFree++;
            console.log(`  ok        ${arm.padEnd(6)} ${n.padEnd(16)} ${text}  ->  ${hex(p.value)}`);
        } else {
            needsCascade++;
            const d = p.diagnostics?.[0];
            console.log(
                `  CASCADE   ${arm.padEnd(6)} ${n.padEnd(16)} ${text}  ->  ${d?.code} (${JSON.stringify(d?.expected)})`,
            );
        }
    }
}
console.log(
    `\n  ${contextFree} context-free · ${needsCascade} require the engine. The second number is why the resolver reads a USED value and never a token's text.`,
);

// ── LEG 3 ────────────────────────────────────────────────────────────────────
console.log("\nLEG 3 — the live cascade (REQUIRED)\n");
let chromium;
try {
    ({ chromium } = await import(`${FOURIER}/node_modules/playwright/index.mjs`));
} catch (e) {
    console.log(`  INCONCLUSIVE — playwright is not resolvable: ${e.message}`);
    process.exit(2);
}
let browser;
try {
    browser = await chromium.launch({ headless: true });
} catch (e) {
    console.log(`  INCONCLUSIVE — no browser: ${e.message}`);
    process.exit(2);
}
let grey = 0;
let seen = 0;
const hues = { light: new Set(), dark: new Set() };
try {
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ colorScheme: scheme });
        const page = await ctx.newPage();
        try {
            await page.goto(BASE, { waitUntil: "networkidle", timeout: 20000 });
        } catch (e) {
            console.log(`  INCONCLUSIVE — ${BASE} unreachable (${e.message.split("\n")[0]})`);
            await browser.close();
            process.exit(2);
        }
        const used = await page.evaluate(
            ({ names, dark }) => {
                document.documentElement.classList.toggle("dark", dark);
                const probe = document.createElement("span");
                document.body.appendChild(probe);
                const out = {};
                for (const n of names) {
                    probe.style.color = "";
                    probe.style.color = `var(${n})`;
                    out[n] = getComputedStyle(probe).color;
                }
                probe.remove();
                return out;
            },
            { names: VIZ, dark: scheme === "dark" },
        );
        for (const [n, u] of Object.entries(used)) {
            seen++;
            const p = css.parseCssColor(u);
            const h = p.ok ? hex(p.value) : null;
            if (h) hues[scheme].add(h);
            const fellBack = h === "#888888";
            if (fellBack || !h) grey++;
            console.log(
                `  ${fellBack || !h ? "RED " : "ok  "} ${scheme.padEnd(5)} ${n.padEnd(16)} used=${u.padEnd(24)} -> ${h ?? "unparsed"}`,
            );
        }
        await ctx.close();
    }
} finally {
    await browser.close();
}

const distinct = hues.light.size === VIZ.length && hues.dark.size === VIZ.length;
console.log(
    `\n  ${grey}/${seen} tokens collapse to the #888888 fallback · distinct hues per scheme: light ${hues.light.size}/${VIZ.length}, dark ${hues.dark.size}/${VIZ.length}`,
);
console.log(
    grey === 0 && distinct
        ? "GREEN — every --viz-* token resolves to its own brand hue at both schemes."
        : "RED — a token is greyed or two tokens share a hue.",
);
process.exit(grey === 0 && distinct ? 0 : 1);
