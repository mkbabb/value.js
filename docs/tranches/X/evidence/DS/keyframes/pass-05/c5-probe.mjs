// X-DS keyframes pass 5, critic C5 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c5-probe.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2] ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 5000);
const KEY = "animation-groups-control-options-store";
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const R = (b) => b && [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)];
const shot = async (page, name, clipSel, pad = 16) => {
    const file = path.join(OUT, `${name}.png`);
    if (clipSel) {
        const b = await page.locator(clipSel).first().boundingBox();
        if (b) { await page.screenshot({ path: file, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); return; }
    }
    await page.screenshot({ path: file });
};
const setSurface = (page, scene, control, expanded) => page.evaluate(([k, scene, control, expanded]) => {
    const s = JSON.parse(localStorage.getItem(k) ?? "{}");
    s[scene] = { ...(s[scene] ?? {}), selectedControl: control, isTimelineExpanded: expanded };
    localStorage.setItem(k, JSON.stringify(s));
}, [KEY, scene, control, expanded]);
const ribbon = (page) => page.evaluate(() => {
    const ap = [...document.querySelectorAll("button")].find((b) => b.textContent.trim().startsWith("Apply"));
    const row = ap.parentElement;
    return { row: Math.round(row.getBoundingClientRect().width), overflow: row.scrollWidth - row.clientWidth,
        buttons: [...row.querySelectorAll("button")].map((b) => { const r = b.getBoundingClientRect(); return [b.getAttribute("aria-label") ?? b.textContent.trim(), Math.round(r.width), Math.round(r.height), Math.round(r.y), getComputedStyle(b).whiteSpace]; }) };
});
const timelineRead = (page) => page.evaluate(() => {
    const stage = document.querySelector(".timeline-preview-stage");
    const subj = stage?.querySelector("[data-timeline-preview-subject]");
    const sb = stage?.getBoundingClientRect(), xb = subj?.getBoundingClientRect();
    const marker = document.querySelector(".keyframe-marker");
    const caret = document.querySelector(".timeline-caret-readout");
    const tick = document.querySelector(".timeline-tick-label");
    return {
        stage: sb && [Math.round(sb.width), Math.round(sb.height)],
        subject: xb && [Math.round(xb.x - sb.x), Math.round(xb.y - sb.y), Math.round(xb.width), Math.round(xb.height)],
        subjectCentred: xb && Math.abs((xb.x + xb.width / 2) - (sb.x + sb.width / 2)) < 2 && Math.abs((xb.y + xb.height / 2) - (sb.y + sb.height / 2)) < 2,
        badgeOnMarker: !!marker?.querySelector("[data-slot=badge], .stop-count"),
        caret: caret && { text: caret.textContent.trim(), name: caret.getAttribute("aria-label"), ink: getComputedStyle(caret).color },
        tickInk: tick && getComputedStyle(tick).color,
        primary: (() => { const d = document.createElement("div"); d.style.color = "var(--primary)"; document.body.appendChild(d); const c = getComputedStyle(d).color; d.remove(); return c; })(),
    };
});

try {
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const page = await ctx.newPage();
        const logs = [];
        page.on("console", (m) => { if (m.type() === "error") logs.push(m.text().slice(0, 200)); });
        await page.goto(`${BASE}#/square`, { waitUntil: "load" });
        await page.evaluate(() => localStorage.clear());
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);

        // KF-C5-04 — box and field are one measure.
        report[`square-1440-${scheme}`] = await page.evaluate(() => {
            const b = document.querySelector(".demo-box").getBoundingClientRect();
            const f = document.querySelector(".square-field").getBoundingClientRect();
            return { box: Math.round(b.width), cell: Math.round(f.width / 4 * 10) / 10, boxCells: Math.round(b.width / (f.width / 4) * 100) / 100 };
        });
        // KF-C5-06 / -10 — the controls pane.
        report[`controls-${scheme}`] = await page.evaluate(() => {
            const f = document.querySelector(".pane-frame");
            const it = [...f.querySelectorAll("input")].find((i) => /infin|∞/.test(i.value));
            const rev = [...f.querySelectorAll("button")].find((b) => b.textContent.trim() === "Reverse");
            const pre = f.querySelector('[aria-label="Ball preview"]');
            return { iterations: it?.value, reverse: [Math.round(rev.getBoundingClientRect().width), rev.getAttribute("data-emphasis")], preview: [Math.round(pre.getBoundingClientRect().width), pre.getAttribute("data-emphasis")], pane: Math.round(f.getBoundingClientRect().width) };
        });
        await shot(page, `controls-pane-1440-${scheme}`, ".pane-frame");

        // KF-C5-02 — the Keyframes tab ribbon.
        await setSurface(page, "square", "keyframes", false);
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE + 2000);
        report[`ribbon-1440-${scheme}`] = await ribbon(page);
        await shot(page, `keyframes-pane-1440-${scheme}`, ".pane-frame");

        // KF-C5-01 / -03 / -07 — the Timeline with a two-member stop at 0%.
        await setSurface(page, "square", "timeline", false);
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        const snap = async () => { await page.locator(".pane-frame button", { hasText: "Snapshot" }).first().click(); await page.waitForTimeout(1800); };
        await snap();
        await snap();
        await page.mouse.move(1200, 120);
        await page.waitForTimeout(400);
        report[`timeline-docked-${scheme}`] = await timelineRead(page);
        await shot(page, `timeline-2kf-docked-1440-${scheme}`);
        await shot(page, `timeline-2kf-docked-crop-1440-${scheme}`, ".pane-frame");
        await page.locator('button[aria-label="Unfold timeline"]').first().click();
        await page.waitForTimeout(1500);
        report[`timeline-expanded-${scheme}`] = await timelineRead(page);
        await shot(page, `timeline-expanded-1440-${scheme}`);
        await page.locator('button[aria-label="Fold timeline into the pane"]').first().click();
        await page.waitForTimeout(800);
        await setSurface(page, "square", "controls", false);

        // KF-C5-11 — the spring rail copy.
        await page.goto(`${BASE}#/spring`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`spring-${scheme}`] = await page.evaluate(() => document.getElementById("spring-rail-hint")?.textContent.replace(/\s+/g, " ").trim());
        await shot(page, `spring-rail-1440-${scheme}`, ".spring-rail", 48);

        // KF-C5-05 — the sequence plate.
        await page.goto(`${BASE}#/sequence`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`sequence-1440-${scheme}`] = await page.evaluate(() => {
            const c = document.querySelector(".seq-target").getBoundingClientRect();
            const t = document.querySelector(".seq-track").getBoundingClientRect();
            const rail = document.querySelector(".seq-track .progress-rail").getBoundingClientRect();
            const after = getComputedStyle(document.querySelector(".seq-track"), "::after");
            return { plate: [Math.round(c.x), Math.round(c.y), Math.round(c.width), Math.round(c.height)], track: [Math.round(t.left), Math.round(t.right)], railEnd: Math.round(rail.right), room: [after.left, after.borderTopStyle] };
        });

        // KF-C5-08 — the shortcuts dialog.
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        await page.keyboard.press("Shift+Slash");
        await page.waitForTimeout(1500);
        report[`shortcuts-${scheme}`] = await page.evaluate(() => {
            const d = document.querySelector('[data-slot="dialog-content"]');
            return { width: Math.round(d.getBoundingClientRect().width), wrapped: [...d.querySelectorAll("dt")].filter((e) => e.getBoundingClientRect().height > 30).map((e) => e.textContent.trim()) };
        });
        await shot(page, `shortcuts-1440-${scheme}`);
        await page.keyboard.press("Escape");
        report[`errors-${scheme}`] = logs;
        await ctx.close();
    }
    // 390: the ribbon (KF-C5-02) and the square plate and field (KF-C5-04).
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
        const page = await ctx.newPage();
        await page.goto(`${BASE}#/square`, { waitUntil: "load" });
        await page.evaluate(() => localStorage.clear());
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        report[`square-390-${scheme}`] = await page.evaluate(() => {
            const b = document.querySelector(".demo-box").getBoundingClientRect();
            const f = document.querySelector(".square-field").getBoundingClientRect();
            const p = document.querySelector(".square-stage").getBoundingClientRect();
            return { plate: [Math.round(p.width), Math.round(p.height)], field: [Math.round(f.y - p.y), Math.round(f.height)], box: Math.round(b.width), cell: Math.round(f.width / 4 * 10) / 10, boxCells: Math.round(b.width / (f.width / 4) * 100) / 100 };
        });
        await shot(page, `square-390-plate-${scheme}`);
        await setSurface(page, "square", "keyframes", false);
        await page.reload({ waitUntil: "load" });
        await page.waitForTimeout(SETTLE);
        const open = page.locator('button[aria-label*="Keyframes" i], [role="tab"]:has-text("Keyframes")').first();
        report[`ribbon-390-${scheme}`] = await ribbon(page).catch((e) => String(e).slice(0, 120));
        await ctx.close();
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "c5-probe.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
