#!/usr/bin/env node
// MT·W-CSP — the born-RED gate for demo/scenes/ConfigSliderPane.vue.
//
// Authored by JUROR-2 (architecture + isomorphism) against tranche-u @ c654824e.
// Every assertion below FAILS against today's tree. Run it now; it exits 1.
//
//   node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gates/csp-gate.mjs
//
// Requires the dev server at http://localhost:9000 (read-only drive).
// Static legs (G5) need no server and run first.

import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.CSP_BASE ?? "http://localhost:9000";
const ROOT = new URL("../../../../../../../..", import.meta.url).pathname;
const read = (p) => readFileSync(ROOT + p, "utf8");

const results = [];
const check = (gate, ok, detail) => results.push({ gate, ok, detail });

// ───────────────────────── G5 — STATIC: no fork, no shim, no cast ─────────────
{
    const csp = read("demo/scenes/ConfigSliderPane.vue");
    const aur = read("demo/scenes/atmosphere/AuroraPane.vue");
    const blb = read("demo/scenes/blob/BlobPane.vue");
    const count = (s, re) => (s.match(re) ?? []).length;

    check("G5a :deep() reaches into producer internals == 0", count(csp, /:deep\(/g) === 0,
        `found ${count(csp, /:deep\(/g)}`);
    check("G5b demo/ui shim imports == 0", count(csp, /from "\.\.\/ui\//g) === 0,
        `found ${count(csp, /from "\.\.\/ui\//g)}`);
    check("G5c bare glass-ui root-barrel imports == 0", count(csp, /from "@mkbabb\/glass-ui"/g) === 0,
        `found ${count(csp, /from "@mkbabb\/glass-ui"/g)}`);
    check("G5d `as unknown` config casts across the three files == 0",
        count(aur + blb, /as unknown\) as Record/g) === 0,
        `found ${count(aur + blb, /as unknown\) as Record/g)}`);
    check("G5e stringly-typed reflection layer absent (readPath/writePath)",
        !/function (readPath|writePath)/.test(csp), "readPath/writePath present");
    check("G5f whole-object reset absent (Object.assign over defaults)",
        !/Object\.assign\(\s*config/.test(csp), "Object.assign(config, …) present");
    check("G5g component emits no scoped CSS rule (composition, not correction)",
        (csp.match(/^\.[a-z][\w-]*\s*\{/gm) ?? []).length === 0,
        `${(csp.match(/^\.[a-z][\w-]*\s*\{/gm) ?? []).length} scoped rules`);
    check("G5h AuroraPane emits no row-species CSS (.aurora-row*)",
        !/\.aurora-row/.test(aur), ".aurora-row / .aurora-row-label present");
    check("G5i BlobPane carries no reflection-key mapped type (NumericAtomPath)",
        !/NumericAtomPath/.test(blb), "NumericAtomPath present");
}

// ───────────────────────── runtime legs ───────────────────────────────────────
const b = await chromium.launch();
const p = await b.newContext({ viewport: { width: 1440, height: 900 } }).then((c) => c.newPage());
await p.goto(`${BASE}/#/blob`, { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
if (!p.url().includes("/#/blob")) {
    await p.evaluate(() => (location.hash = "#/blob"));
    await p.waitForTimeout(2000);
}

const m = await p.evaluate(() => {
    const q = (s, r = document) => r.querySelector(s);
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const con = q(".config-console");
    const row = q(".configurator-row", con);
    const rng = q(".slider-range", row);
    const trk = q(".slider-track", row);
    const csr = getComputedStyle(rng);
    const cst = getComputedStyle(trk);

    // relative luminance of a computed colour, via a 1×1 canvas round-trip
    const lum = (css) => {
        const c = document.createElement("canvas");
        c.width = c.height = 1;
        const x = c.getContext("2d");
        x.fillStyle = "#fff";
        x.fillRect(0, 0, 1, 1);
        x.fillStyle = css;
        x.fillRect(0, 0, 1, 1);
        const [r, g, bl] = x.getImageData(0, 0, 1, 1).data;
        const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl);
    };
    const ratio = (a, b) => {
        const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
        return (x + 0.05) / (y + 0.05);
    };

    const thumbs = qa('[role="slider"]', con);
    const port = q(".pane-scroll-fade");

    // reach the live reactive config the way a consumer would not have to
    let v = con.__vueParentComponent, cfg = null, hops = 0;
    while (v && hops++ < 8) { if (v.props?.config) { cfg = v.props.config; break; } v = v.parent; }
    window.__cfg = cfg;

    return {
        rangePainted: csr.backgroundColor !== "rgba(0, 0, 0, 0)" || csr.backgroundImage !== "none",
        rangeVsTrack: +ratio(csr.backgroundColor, cst.backgroundColor).toFixed(3),
        rangeBg: csr.backgroundColor,
        rangeBgImage: csr.backgroundImage,
        variant: q(".glass-slider", row)?.getAttribute("data-variant"),
        sliderCount: thumbs.length,
        valuetextMissing: thumbs.filter((t) => !t.getAttribute("aria-valuetext")).length,
        thumbWidths: [...new Set(thumbs.map((t) => Math.round(t.getBoundingClientRect().width)))],
        sectionCount: qa(".config-section-header", con).length,
        groupCount: qa('[role="group"][aria-labelledby], fieldset', con).length,
        rowDataSize: row?.getAttribute("data-size"),
        componentMinBlockSize: getComputedStyle(row).minBlockSize,
        rowHeight: +row.getBoundingClientRect().height.toFixed(2),
        lineCount: qa(".config-section-header, .config-action-bar", con.closest(".card") ?? document)
            .filter((e) => {
                const s = getComputedStyle(e);
                return s.borderBottomWidth !== "0px" || s.borderTopWidth !== "0px";
            }).length,
        wellNesting: [...con.classList].includes("console-well"),
        maskImage: getComputedStyle(port).maskImage,
        overflowRatio: +(port.scrollHeight / port.clientHeight).toFixed(2),
        paletteBefore: JSON.parse(JSON.stringify(cfg?.color?.paletteStops ?? null)),
    };
});

// G1 — the reset domain: a non-declared nested key must survive Reset
await p.locator(".config-action-bar button", { hasText: "Reset" }).first().click();
await p.waitForTimeout(400);
const paletteAfter = await p.evaluate(() =>
    JSON.parse(JSON.stringify(window.__cfg?.color?.paletteStops ?? null)),
);

check("G1 Reset touches only declared field paths (color.paletteStops survives)",
    JSON.stringify(m.paletteBefore) === JSON.stringify(paletteAfter),
    `${JSON.stringify(m.paletteBefore)} → ${JSON.stringify(paletteAfter)}`);
check("G2 the filled extent is a painted object ≥3:1 against the track",
    m.rangePainted && m.rangeVsTrack >= 3,
    `painted=${m.rangePainted} ratio=${m.rangeVsTrack} bg=${m.rangeBg} img=${m.rangeBgImage} variant=${m.variant}`);
check("G3 every config slider carries aria-valuetext",
    m.valuetextMissing === 0, `${m.valuetextMissing} of ${m.sliderCount} empty`);
check("G4 every drawn section is a programmatic, named group",
    m.groupCount >= m.sectionCount && m.sectionCount > 0,
    `${m.groupCount} groups for ${m.sectionCount} drawn sections`);
check("G7 the overflowing console feathers its edge or does not overflow",
    m.overflowRatio <= 1.5 || m.maskImage !== "none",
    `ratio=${m.overflowRatio} maskImage=${m.maskImage}`);
check("G8 row rhythm rides the producer size axis, not a consumer clamp",
    m.rowDataSize !== null && m.componentMinBlockSize === "auto",
    `data-size=${m.rowDataSize} min-block-size=${m.componentMinBlockSize} rendered=${m.rowHeight}px`);
check("G9 the operable handle meets the 24px inline floor",
    m.thumbWidths.every((w) => w >= 24), `thumb widths ${JSON.stringify(m.thumbWidths)}`);
check("G10 the console emits no retained dividing line (OBC §5: Blob = none)",
    m.lineCount === 0, `${m.lineCount} ruled edges`);
check("G11 exactly one surface tier between the pane plate and a row",
    !m.wellNesting, "`.console-well` nests a second surface inside the pane Card");

await b.close();

let red = 0;
for (const r of results) {
    if (!r.ok) red++;
    console.log(`${r.ok ? "GREEN" : "RED  "}  ${r.gate}\n         ${r.detail}`);
}
console.log(`\n${red} RED / ${results.length} gates`);
process.exit(red === 0 ? 0 : 1);
