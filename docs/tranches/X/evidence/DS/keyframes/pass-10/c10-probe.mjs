// X-DS keyframes pass 10, critic C10 cure seat — the AFTER frames for the
// critic's special cells (the route cells come from scripts/ds-census.mjs
// --frames) plus the served measurements behind each cure. Headless real
// Chrome only (COHESION §0ei). Run with the keyframes dev server on :5173:
//   node c10-probe.mjs [outDir] [--no-shots]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const args = process.argv.slice(2);
const SHOTS = !args.includes("--no-shots");
const OUT = args.find((a) => !a.startsWith("--")) ?? path.dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 5000);
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {};
const shot = (page, name, opts) => (SHOTS ? page.screenshot({ path: path.join(OUT, name), ...opts }) : null);
const go = async (page, route) => {
    for (let attempt = 1; ; attempt++) {
        try {
            await page.goto(`${BASE}#/${route}`, { waitUntil: "domcontentloaded", timeout: 240000 });
            await page.evaluate(() => localStorage.clear());
            await page.reload({ waitUntil: "domcontentloaded", timeout: 240000 });
            break;
        } catch (e) {
            if (attempt >= 3) throw e;
        }
    }
    await page.waitForTimeout(SETTLE);
};
const clipOf = async (page, sel, pad = 16) => {
    const b = await page.locator(`${sel} >> visible=true`).first().boundingBox();
    return b && { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad };
};
// the stage title's ink against its card (KF-C10-01)
const stageTitle = (page) =>
    page.evaluate(() => {
        const h = [...document.querySelectorAll("[data-scene-stage-header]")].find((e) => e.getBoundingClientRect().width > 0);
        if (!h) return null;
        const t = h.querySelector("h2, h3, [data-slot=card-title]") ?? h;
        const pb = h.closest("[data-slot=card]").getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(t);
        const ink = range.getBoundingClientRect();
        return { title: t.textContent.trim(), inset: Math.round(ink.left - pb.left), top: Math.round(t.getBoundingClientRect().top - pb.top) };
    });
// a fresh load, so the bottom dock's channel select is up (it rests collapsed
// after idle)
// a fresh load, then the bottom dock hovered up (it rests collapsed, its
// channel select hidden), then Sweep → Entry. A touch context cannot hover the
// collapsed dock up (O-88, DOCK-COLLAPSE-MOTION, glass-owned), so the 390 Entry
// cell runs in a fine-pointer context at the same viewport.
const toEntry = async (page, w, h) => {
    await go(page, "spring");
    await page.mouse.move(w / 2, h - 40);
    await page.waitForTimeout(600);
    await page.mouse.move(w / 2, h - 90);
    await page.waitForTimeout(1500);
    await page.getByRole("combobox", { name: "Select animation" }).click({ timeout: 8000 });
    await page.waitForTimeout(800);
    await page.getByRole("option", { name: /Entry/ }).first().click({ timeout: 8000 });
    await page.waitForTimeout(2500);
    await page.mouse.move(w - 20, 120);
    await page.waitForTimeout(800);
    return true;
};
// KF-C10-03 / -04 — the artifact row: the chevron against the stage column's
// text edge, and the copy control against the trigger it copies
const entryRow = (page) =>
    page.evaluate(() => {
        const trig = [...document.querySelectorAll(".artifact-trigger")].find((e) => e.getBoundingClientRect().width > 0);
        if (!trig) return null;
        const chev = trig.querySelector("svg").getBoundingClientRect();
        const copy = trig.parentElement.parentElement.querySelector("[aria-label='Copy the @starting-style artifact']").getBoundingClientRect();
        const h = [...document.querySelectorAll("[data-scene-stage-header]")].find((e) => e.getBoundingClientRect().width > 0);
        const t = h.querySelector("h2, h3, [data-slot=card-title]") ?? h;
        const range = document.createRange();
        range.selectNodeContents(t);
        const titleInk = range.getBoundingClientRect().left;
        return { chevronLeft: Math.round(chev.left), titleInkLeft: Math.round(titleInk), copyGapFromTrigger: Math.round(copy.left - trig.getBoundingClientRect().right) };
    });

for (const scheme of ["light", "dark"]) {
    const r = (report[scheme] = {});
    for (const [w, h] of [[1440, 900], [390, 844]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
        const page = await ctx.newPage();
        const rw = (r[w] = { stageTitles: {} });
        for (const route of ["easing", "spring", "sequence", "square"]) {
            await go(page, route);
            rw.stageTitles[route] = await stageTitle(page);
            if (route === "easing" && w === 1440) {
                // KF-C10-02 — the scrub's labelled time row against the duration row
                rw.scrub = await page.evaluate(() => {
                    const f = document.querySelector(".pane-frame").getBoundingClientRect().left;
                    const rail = document.querySelector(".scrub-rail");
                    const row = rail.closest(".param-row");
                    const lab = row?.querySelector("label");
                    const dur = [...document.querySelectorAll(".param-row label")].find((l) => l.textContent.trim() === "duration");
                    const font = (e) => e && `${getComputedStyle(e).fontSize} ${getComputedStyle(e).fontWeight}`;
                    return {
                        label: lab?.textContent.trim(), labelInset: lab && Math.round(lab.getBoundingClientRect().left - f), labelFont: font(lab),
                        readout: row?.querySelector(".param-value")?.textContent.trim(),
                        durationInset: dur && Math.round(dur.getBoundingClientRect().left - f), durationFont: font(dur),
                        railBelowLabel: lab && rail.getBoundingClientRect().top >= lab.getBoundingClientRect().bottom - 1,
                        sliderName: rail.querySelector("[role=slider]")?.getAttribute("aria-label"),
                    };
                });
                await shot(page, `easing-pane-${w}-${scheme}.png`, { clip: await clipOf(page, ".pane-frame", 8) });
            }
            if (route === "easing" && w === 390) {
                // KF-C10-06 — the literal breaks only after `fn(`
                rw.literal = await page.evaluate(() => {
                    const c = document.querySelector(".literal-text");
                    if (!c) return null;
                    const a = c.querySelector(".literal-args");
                    const lh = parseFloat(getComputedStyle(c).lineHeight);
                    const rects = [...a.getClientRects()];
                    return { text: c.textContent, lines: Math.round(c.getBoundingClientRect().height / lh), argsLines: Math.round(a.getBoundingClientRect().height / lh), argsText: a.textContent };
                });
                await shot(page, `easing-header-390-${scheme}.png`, { clip: await clipOf(page, "[data-scene-stage-header]", 16) });
            }
            if (route === "spring") {
                if (w === 1440) {
                    // KF-C10-05 — the heatmap's names
                    rw.heatmap = await page.evaluate(() => {
                        const field = [...document.querySelectorAll(".spring-heatmap")].find((e) => e.getBoundingClientRect().width > 0);
                        const pips = [...field.querySelectorAll(".spring-heatmap-pip")].map((p) => {
                            const s = p.querySelector("span");
                            return { name: s.textContent.trim(), current: p.classList.contains("is-current"), visibility: getComputedStyle(s).visibility, color: getComputedStyle(s).color, rect: s.getBoundingClientRect().toJSON(), dot: p.getBoundingClientRect().toJSON() };
                        });
                        const under = field.querySelector(".spring-heatmap-regime--under").getBoundingClientRect();
                        const fb = field.getBoundingClientRect();
                        const gentle = pips.find((p) => p.name === "gentle");
                        const marker = field.querySelector(".spring-heatmap-marker")?.getBoundingClientRect();
                        const overlap = (a, b) => !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
                        const cur = pips.find((p) => p.current);
                        return {
                            pips: pips.map(({ name, current, visibility, color }) => ({ name, current, visibility, color })),
                            underTag: { fromFieldBottom: Math.round(fb.bottom - under.bottom), fromFieldRight: Math.round(fb.right - under.right), topFromField: Math.round(under.top - fb.top) },
                            underTagVsGentleDot: { dy: Math.round(under.top - gentle.dot.bottom), overlapsAnyName: pips.some((p) => overlap(p.rect, under)) },
                            currentNameClearsMarker: cur && marker ? !overlap(cur.rect, marker) : null,
                        };
                    });
                    await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = s.scrollHeight; });
                    await page.waitForTimeout(600);
                    await shot(page, `presets-1440-${scheme}.png`, { clip: { x: 0, y: 0, width: 520, height: 900 } });
                    await page.evaluate(() => { for (const s of document.querySelectorAll(".controls-surface")) s.scrollTop = 0; });
                    await page.waitForTimeout(400);
                    rw.heatmapClip = await clipOf(page, ".spring-heatmap-section", 12);
                    if (rw.heatmapClip) await shot(page, `heatmap-1440-${scheme}.png`, { clip: rw.heatmapClip });
                } else {
                    // KF-C10-03 — Re-seat's glyph under the caption
                    rw.reseat = await page.evaluate(() => {
                        const p = document.getElementById("spring-rail-hint"), b = document.querySelector(".spring-reseat");
                        const range = document.createRange();
                        range.selectNodeContents(p);
                        return { captionInkLeft: Math.round(range.getBoundingClientRect().left), buttonLeft: Math.round(b.getBoundingClientRect().left), glyphLeft: Math.round(b.querySelector("svg").getBoundingClientRect().left), below: b.getBoundingClientRect().top >= p.getBoundingClientRect().bottom - 1 };
                    });
                    await shot(page, `spring-caption-390-${scheme}.png`, { clip: await clipOf(page, ".spring-rail-verbs", 24) });
                }
                // KF-C10-01 / -03 / -04 — the Entry view
                if (w === 1440 && await toEntry(page, w, h).catch((e) => (console.error("entry:", e.message.split("\n")[0]), false))) {
                    rw.stageTitles.entry = await stageTitle(page);
                    rw.entryRow = await entryRow(page);
                    await shot(page, `entry-${w}-${scheme}.png`);
                } else rw.stageTitles.entry = "entry view not reached";
            }
        }
        if (w === 1440) {
            // KF-C10-03 — the home hero's pause control against the deck
            await go(page, "");
            rw.hero = await page.evaluate(() => {
                const d = document.querySelector(".hero-deck"), b = document.querySelector(".hero-motion-toggle");
                const range = document.createRange();
                range.selectNodeContents(d);
                const rr = [...range.getClientRects()].filter((x) => x.width > 0);
                return { deckInkLeft: Math.round(Math.min(...rr.map((x) => x.left))), buttonLeft: Math.round(b.getBoundingClientRect().left), glyphLeft: Math.round(b.querySelector("svg").getBoundingClientRect().left) };
            });
            await shot(page, `home-hero-1440-${scheme}.png`, { clip: await clipOf(page, ".hero-sub", 24) });
        } else {
            await go(page, "");
            rw.hero = await page.evaluate(() => {
                const b = document.querySelector(".hero-motion-toggle").getBoundingClientRect();
                return { buttonCentreOffset: Math.round(b.left + b.width / 2 - innerWidth / 2) };
            });
        }
        await ctx.close();
    }
}
// KF-C10-01 at 390 — the Entry plate in a fine-pointer context (see toEntry)
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme });
    const page = await ctx.newPage();
    const ok = await toEntry(page, 390, 844).catch((e) => (console.error("entry 390:", e.message.split("\n")[0]), false));
    report[scheme][390].stageTitles.entry = ok ? await stageTitle(page) : "entry view not reached";
    if (ok) {
        report[scheme][390].entryRow = await entryRow(page);
        await shot(page, `entry-390-${scheme}.png`);
    }
    await ctx.close();
}
// KF-C10-02 rider — the time line must not push the easing pane into a scroll
// at the laptop heights KF-C9-10 calibrated (the plot budget counts it)
for (const [w, h] of [[1440, 900], [1280, 760], [1280, 800], [1024, 700], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await go(page, "easing");
    report[`easing${w}x${h}`] = await page.evaluate(() => {
        const s = document.querySelector(".controls-surface");
        const curve = document.querySelector(".easing-sidebar [data-slot='easing-curve']").getBoundingClientRect();
        const pr = document.querySelector(".easing-sidebar .param-row");
        return { plot: Math.round(curve.width), scroll: [s.scrollHeight, s.clientHeight], durationRowBottom: Math.round(pr.getBoundingClientRect().bottom), surfaceBottom: Math.round(s.getBoundingClientRect().bottom) };
    });
    if (w === 1280 && h === 760) await shot(page, "easing-pane-1280x760.png", { clip: { x: 0, y: 0, width: 480, height: 760 } });
    await ctx.close();
}
fs.writeFileSync(path.join(OUT, SHOTS ? "c10-probe.json" : "c10-probe.calib.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
await browser.close();
