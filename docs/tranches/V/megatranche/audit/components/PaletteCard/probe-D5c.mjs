// CHALLENGE-D pass 3 — probe C. High-magnification witnesses + the arms
// probe B could not reach: forced-colors specimen loss, the Extract `aside`
// arm under RTL, expanded swatch geometry, and the drag state.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("./evidence/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const R = {};
const NOW = new Date().toISOString();
const mk = (css, i) => ({ css, position: i });
const FIXTURE = {
    version: 1,
    palettes: [
        { id: "p-sunset", slug: "sunset-ridge", name: "Sunset Ridge", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#e9c46a"].map(mk), tags: ["warm", "test", "alpha"], forkCount: 3, versionCount: 4 },
        { id: "p-ocean", slug: "deep-ocean", name: "Deep Ocean", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#03045e", "#0077b6", "#00b4d8"].map(mk), tags: ["cool"] },
    ],
};

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 6 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2400);

    const geo = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const r = c.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height, bottom: r.bottom };
    });
    // magnify the bottom-left corner where both facets meet
    const clip = { x: Math.round(geo.x - 12), y: Math.round(geo.bottom - 24), width: 34, height: 34 };
    await page.screenshot({ path: OUT + "p3-corner-clip-ON.png", clip });
    await page.addStyleTag({ content: ".palette-card-grid{contain:none !important}" });
    await page.waitForTimeout(250);
    await page.screenshot({ path: OUT + "p3-corner-clip-OFF.png", clip });

    // ---- forced colors: the specimen -------------------------------------
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(700);
    R.forcedColorsSpecimen = await page.evaluate(() => {
        const strip = document.querySelector('[role="presentation"]');
        const segs = [...strip.children].map((s) => {
            const cs = getComputedStyle(s);
            return { declared: s.getAttribute("style"), computedBg: cs.backgroundColor, w: +s.getBoundingClientRect().width.toFixed(1) };
        });
        const distinct = new Set(segs.map((s) => s.computedBg));
        return { segs, distinctRenderedColors: [...distinct], declaredDistinct: 5 };
    });
    const stripGeo = await page.evaluate(() => { const s = document.querySelector('[role="presentation"]').getBoundingClientRect(); return { x: Math.round(s.x), y: Math.round(s.y), width: Math.round(s.width), height: Math.round(s.height) }; });
    await page.screenshot({ path: OUT + "p3-forced-colors-strip.png", clip: stripGeo });
    await page.emulateMedia({ forcedColors: "none" });

    // ---- expanded swatch geometry ----------------------------------------
    await page.waitForTimeout(400);
    await page.click('[role="article"]');
    await page.waitForTimeout(900);
    R.expandedSwatches = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const strip = c.querySelector('[role="presentation"]');
        const btns = [...c.querySelectorAll("button")].filter((b) => /Color swatch/i.test(b.getAttribute("aria-label") || ""));
        const dots = btns.length ? btns : [...c.querySelectorAll('[class*="watercolor"], [data-slot*="watercolor"]')];
        const rr = (e) => { const r = e.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
        return {
            cardH: +c.getBoundingClientRect().height.toFixed(1),
            stripH: strip ? +strip.getBoundingClientRect().height.toFixed(1) : null,
            dotCount: dots.length,
            dotSize: dots[0] ? rr(dots[0]) : null,
            dotLabels: dots.slice(0, 2).map((d) => d.getAttribute("aria-label")),
            allAriaLabels: [...c.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label")).slice(0, 12),
            // duplication check: are the expanded dot colours identical to the strip segments?
            stripColors: strip ? [...strip.children].map((s) => getComputedStyle(s).backgroundColor) : null,
        };
    });
    await page.screenshot({ path: OUT + "p3-expanded-detail.png", fullPage: true });

    // ---- Extract aside arm, LTR then RTL ---------------------------------
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
    R.extractLTR = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        if (!c) return { note: "no card (undeveloped plate)" };
        const strip = c.querySelector('[role="presentation"]');
        const cs = getComputedStyle(c), ss = strip ? getComputedStyle(strip) : null;
        return {
            rootDisplay: cs.display, rootClass: c.className,
            stripClass: strip ? strip.getAttribute("class") : null,
            stripRadius: ss ? [ss.borderTopLeftRadius, ss.borderTopRightRadius, ss.borderBottomLeftRadius, ss.borderBottomRightRadius] : null,
            stripRect: strip ? (() => { const r = strip.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })() : null,
            cardRect: (() => { const r = c.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; })(),
        };
    });

    // ---- drag / sortable state -------------------------------------------
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    R.dragStyles = await page.evaluate(() => {
        const out = [];
        for (const sheet of document.styleSheets) {
            let rules; try { rules = sheet.cssRules; } catch { continue; }
            const walk = (rs) => { for (const r of rs) { if (r.cssRules) { walk(r.cssRules); continue; } if (r.selectorText && /sortable-(ghost|chosen|drag|fallback)/.test(r.selectorText)) out.push(r.selectorText + " { " + r.style.cssText.slice(0, 160) + " }"); } };
            walk(rules);
        }
        const handle = document.querySelector(".drag-handle");
        return {
            sortableRules: out,
            handle: handle ? { tag: handle.tagName.toLowerCase(), ariaLabel: handle.getAttribute("aria-label"), role: handle.getAttribute("role"), tabIndex: handle.tabIndex, rect: (() => { const r = handle.getBoundingClientRect(); return { w: r.width, h: r.height }; })() } : null,
        };
    });

    writeFileSync(OUT + "../probe-D5c-results.json", JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
    await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
