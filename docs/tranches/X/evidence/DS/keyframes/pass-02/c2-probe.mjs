// X-DS keyframes pass 2, critic C2 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c2-probe.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

let chromium;
for (const root of ["/Users/mkbabb/Programming/keyframes.js", "/Users/mkbabb/Programming/value.js"])
    for (const pkg of ["playwright", "playwright-core", "@playwright/test"])
        try { chromium ??= createRequire(root + "/package.json")(pkg).chromium; } catch {}

const OUT = process.argv[2] ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 5000);
const KEY = "animation-groups-control-options-store";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const box = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
const shot = async (page, name, clipSel) => {
    const file = path.join(OUT, `${name}.png`);
    if (clipSel) {
        const b = await page.locator(clipSel).first().boundingBox();
        if (b) {
            const pad = 16;
            await page.screenshot({ path: file, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } });
            return;
        }
    }
    await page.screenshot({ path: file });
};
const setSurface = (page, scene, control, expanded) =>
    page.evaluate(([k, scene, control, expanded]) => {
        const s = JSON.parse(localStorage.getItem(k) ?? "{}");
        s[scene] = { ...(s[scene] ?? {}), selectedControl: control, isTimelineExpanded: expanded };
        localStorage.setItem(k, JSON.stringify(s));
    }, [KEY, scene, control, expanded]);

try {
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);

        // KF-C2-06 / -09 — the label column's one size; one rule width per card.
        report[`pane-${scheme}`] = await page.evaluate(() => {
            const frame = document.querySelector(".pane-frame");
            const layer = [...frame.querySelectorAll("button")].find((b) => b.textContent.trim() === "layer");
            const label = frame.querySelector("label.label");
            const r = (el) => { const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.width)]; };
            return {
                layerFontSize: getComputedStyle(layer).fontSize,
                labelFontSize: getComputedStyle(label).fontSize,
                separators: [...frame.querySelectorAll(".separator")].filter((s) => s.getBoundingClientRect().width > 0).map(r),
            };
        });

        // KF-C2-03 — the cubic-bezier sub-pane: one plate.
        await page.locator('button[aria-label="Edit easing curve"]').first().click();
        await page.waitForTimeout(1200);
        report[`bezier-${scheme}`] = await page.evaluate(() => {
            const p = document.querySelector(".pane-frame .subpane-body [data-surface], .pane-frame .subpane-body .easing-picker");
            return { pickerSurface: p?.getAttribute("data-surface") ?? null, pickerBg: p ? getComputedStyle(p).backgroundColor : null, pickerBorder: p ? getComputedStyle(p).borderTopWidth : null };
        });
        await shot(page, `cube-bezier-1440-${scheme}`, ".pane-frame");
        await page.locator('button[aria-label^="Back from"]:visible').first().click();
        await page.waitForTimeout(900);

        // KF-C2-12 — the layer sub-pane (its labels: disabled rows on the cube's multi-target group).
        await page.locator(".pane-frame button", { hasText: /^layer$/ }).first().click();
        await page.waitForTimeout(1200);
        report[`layer-${scheme}`] = await page.evaluate(() =>
            [...document.querySelectorAll(".pane-frame .panel-row--active label.label")].map((l) => [l.textContent.trim(), getComputedStyle(l).color, l.closest(".labeled-field")?.getAttribute("data-disabled") ?? null]),
        );
        await shot(page, `cube-layer-1440-${scheme}`, ".pane-frame");

        // KF-C2-04 — the Timeline surface, docked and expanded.
        await setSurface(page, "cube", "timeline", false);
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        await shot(page, `timeline-docked-1440-${scheme}`);
        await page.locator('button[aria-label="Expand timeline"]').first().click();
        await page.waitForTimeout(1500);
        report[`timeline-expanded-${scheme}`] = await page.evaluate(() => ({
            railFrameDisplay: getComputedStyle(document.querySelector(".pane-frame")).display,
            card: (() => { const c = document.querySelector("#timeline-expanded-target .cartoon-surface"); const b = c?.getBoundingClientRect(); return b && [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; })(),
            snapshotInCard: !!document.querySelector("#timeline-expanded-target .cartoon-surface") && [...document.querySelectorAll("#timeline-expanded-target .cartoon-surface button")].some((b) => b.textContent.trim() === "Snapshot"),
        }));
        await shot(page, `timeline-expanded-1440-${scheme}`);
        if (scheme === "light") {
            await page.locator("#timeline-expanded-target button", { hasText: "Snapshot" }).first().click();
            await page.waitForTimeout(1500);
            await shot(page, `timeline-snap-1440-${scheme}`);
        }
        await page.locator('button[aria-label="Collapse timeline"]').first().click();
        await page.waitForTimeout(800);
        await setSurface(page, "cube", "controls", false);

        // KF-C2-13 — the Sequence clock disc on its row's rule; KF-C2-10 stage boxes.
        await page.goto(`${BASE}#/sequence`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`sequence-clock-${scheme}`] = await page.evaluate(() => {
            const ball = document.querySelector(".seq-lane-scrub-ball")?.getBoundingClientRect();
            const rail = document.querySelector(".seq-lane-scrub .progress-rail")?.getBoundingClientRect();
            return ball && rail ? { discCentreY: +(ball.y + ball.height / 2).toFixed(1), ruleCentreY: +(rail.y + rail.height / 2).toFixed(1) } : null;
        });
        await shot(page, `sequence-pane-1440-${scheme}`, ".pane-frame");
        const stages = {};
        for (const r of ["easing", "spring", "square", "sequence"]) {
            await page.goto(`${BASE}#/${r}`, { waitUntil: "load" });
            await page.waitForTimeout(3000);
            stages[r] = await page.evaluate(() => {
                const c = document.querySelector(".stage-cell").querySelector(".easing-target, .spring-target, .square-stage, .seq-target");
                const b = c.getBoundingClientRect();
                return [Math.round(b.x), Math.round(b.y), Math.round(b.width)];
            });
            if (r === "spring") await shot(page, `spring-pane-1440-${scheme}`, ".pane-frame");
        }
        report[`stages-${scheme}`] = stages;

        // KF-C2-11 — the dock scene menu (the live minis at rest).
        await page.goto(`${BASE}#/square`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        await page.locator('button[aria-label="Scene"]:visible').first().click();
        await page.waitForTimeout(1200);
        const vis = page.locator('button[role=combobox][aria-label="Scene"]:visible');
        if (await vis.count()) { await vis.first().click(); await page.waitForTimeout(1200); }
        await shot(page, `dock-scene-1440-${scheme}`, "[role=listbox], [role=menu]");
        await ctx.close();
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "c2-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
