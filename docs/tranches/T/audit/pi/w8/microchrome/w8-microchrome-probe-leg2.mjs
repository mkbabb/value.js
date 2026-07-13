/**
 * T.W8 · PASS 11 leg 2 — the ambiguity closers:
 *  A · .pane-scroll-fade real scrollbar treatment (gradient + browse panes)
 *      + does the glass-ui Card apply scrollbar-hidden / scrollbar-width:none?
 *  B · every [role=slider] cursor + rect on the picker (roster 3 slider read).
 *  C · [title=] native-tooltip roster PER TOOL VIEW (gradient/mix/extract/
 *      browse) — the real count roster item 5 targets.
 *  D · error plate: ghost-trio STRICTLY scoped to the [role=alert] subtree.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:8700";
const OUT = "docs/tranches/T/audit/pi/w8/microchrome";
mkdirSync(OUT, { recursive: true });
const OWNER_COLOR = "lab(38%25 32 24)";
const url = (view = "") => `${BASE}/#/${view}?space=lab&color=${OWNER_COLOR}`;
const report = [];
const log = (s) => { console.log(s); report.push(String(s)); };

const browser = await chromium.launch({ headless: true, channel: "chromium", args: ["--force-color-profile=srgb"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();

// ── A + B: picker view ──
await page.goto(url(""), { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(1400);

const B = await page.evaluate(() => {
    const sliders = [...document.querySelectorAll("[role='slider']")].slice(0, 12).map((el) => {
        const r = el.getBoundingClientRect();
        return {
            cursor: getComputedStyle(el).cursor,
            cls: (el.getAttribute("class") || "").slice(0, 44),
            aria: el.getAttribute("aria-label") || el.getAttribute("aria-valuetext") || null,
            w: Math.round(r.width), h: Math.round(r.height),
        };
    });
    // also the slider TRACK cursor (parent) + the ConsoleRail rows
    const track = document.querySelector("[data-reka-slider-track], [class*='slider'][class*='track']");
    return { sliders, trackCursor: track ? getComputedStyle(track).cursor : "NO-TRACK" };
});
log(`[B · slider cursors] ${B.sliders.length} [role=slider] found; track cursor=${B.trackCursor}`);
for (const s of B.sliders) log(`   ${s.w}x${s.h} cursor=${s.cursor} aria=${JSON.stringify(s.aria)} .${s.cls}`);

// ── A: pane scroller treatment across the tool views ──
async function scrollerRead(view) {
    await page.goto(url(view), { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(1200);
    return await page.evaluate((v) => {
        const els = [...document.querySelectorAll(".pane-scroll-fade")];
        return els.slice(0, 3).map((el) => {
            const cs = getComputedStyle(el);
            return {
                view: v,
                cls: (el.getAttribute("class") || "").slice(0, 60),
                scrollbarWidth: cs.scrollbarWidth,
                scrollbarColor: cs.scrollbarColor,
                hasScrollbarHiddenClass: (el.getAttribute("class") || "").includes("scrollbar-hidden"),
                overflows: el.scrollHeight > el.clientHeight,
            };
        });
    }, view);
}
for (const v of ["gradient", "extract", "browse"]) {
    const rs = await scrollerRead(v);
    log(`\n[A · pane-scroll-fade @${v}] found ${rs.length}`);
    for (const r of rs) log(`   sb-width=${r.scrollbarWidth} sb-color=${r.scrollbarColor} hidden-class=${r.hasScrollbarHiddenClass} overflows=${r.overflows} · .${r.cls}`);
}

// ── C: [title=] native-tooltip roster per tool view ──
async function titleRoster(view) {
    await page.goto(url(view), { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(1400);
    return await page.evaluate((v) => {
        const els = [...document.querySelectorAll("[title]")];
        return {
            view: v,
            count: els.length,
            items: els.slice(0, 40).map((e) => ({
                tag: e.tagName.toLowerCase(),
                title: (e.getAttribute("title") || "").slice(0, 32),
                aria: e.getAttribute("aria-label") || null,
                inDock: !!e.closest("[class*='dock'],nav,[data-slot*='dock']"),
            })),
        };
    }, view);
}
for (const v of ["gradient", "mix", "extract", "browse"]) {
    const tr = await titleRoster(v);
    const nonDock = tr.items.filter((i) => !i.inDock);
    const noAria = tr.items.filter((i) => !i.aria && !i.inDock);
    log(`\n[C · [title] @${v}] total=${tr.count} · non-dock=${nonDock.length} · non-dock-without-aria=${noAria.length}`);
    for (const i of tr.items) log(`   ${i.inDock ? "DOCK" : "----"} <${i.tag} title="${i.title}"${i.aria ? ` aria="${i.aria}"` : " [NO-ARIA]"}>`);
}

// ── D: error plate — ghost trio STRICTLY scoped to [role=alert] ──
await page.goto(url("browse"), { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(2500);
const D = await page.evaluate(() => {
    const alert = document.querySelector("[role='alert']");
    if (!alert) return { present: false };
    return {
        present: true,
        trioInsideAlert: !!alert.querySelector("[data-slot='empty-state-trio']"),
        watercolorDotsInsideAlert: alert.querySelectorAll("[class*='watercolor'],[class*='goo']").length,
        eyebrowInsideAlert: /· [^·]+ ·/.test(alert.textContent),
        trioAnywhereOnPage: !!document.querySelector("[data-slot='empty-state-trio']"),
        childTags: [...alert.children].map((c) => c.tagName.toLowerCase() + "." + (c.getAttribute("class") || "").split(" ")[0]),
    };
});
log(`\n[D · error plate ghost-trio scoped]`);
if (D.present) {
    log(`   trio INSIDE alert = ${D.trioInsideAlert} (must be false)`);
    log(`   watercolor/goo dots inside alert = ${D.watercolorDotsInsideAlert}`);
    log(`   eyebrow inside alert = ${D.eyebrowInsideAlert} (must be false)`);
    log(`   trio anywhere on page = ${D.trioAnywhereOnPage} (leg-1 doc-scope false-positive source)`);
    log(`   alert children = ${JSON.stringify(D.childTags)}`);
} else log(`   NO error plate (unexpected)`);

await ctx.close();
await browser.close();
writeFileSync(`${OUT}/w8-microchrome-probe-leg2-log.txt`, report.join("\n"));
console.log("\n=== WROTE LEG2 LOG ===");
