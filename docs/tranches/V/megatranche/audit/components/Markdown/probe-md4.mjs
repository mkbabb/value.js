// CHALLENGE-D · Markdown.vue — probe 4: reduced-motion, katex clip, link focus,
// 200% zoom, dead-selector confirmation.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const OUT = resolve(HERE, "frames");
mkdirSync(OUT, { recursive: true });
const out = {};

// A. reduced-motion: does the global guard reach the heading colour transition?
for (const rm of ["no-preference", "reduce"]) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: rm });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".markdown-body", { timeout: 30000 });
    await page.waitForTimeout(1500);
    out[`motion_${rm}`] = await page.evaluate(() => {
        const b = document.querySelector(".markdown-body");
        const g = (s) => { const e = b.querySelector(s); if (!e) return null; const c = getComputedStyle(e);
            return { transitionProperty: c.transitionProperty, transitionDuration: c.transitionDuration, willChange: c.willChange }; };
        return { h2: g("h2"), h3: g("h3"), p: g("p"), a: g("a"), mark: g("mark.cs-name"),
            matchMediaReduce: matchMedia("(prefers-reduced-motion: reduce)").matches };
    });
    await browser.close();
}

// B. katex clipping on mobile — capture the widest display formula
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ ...devices["iPhone 14"], colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4000);
    await page.getByRole("button", { name: "About", exact: true }).first().click().catch(() => {});
    await page.waitForTimeout(3000);
    out.katex = await page.evaluate(async () => {
        const b = document.querySelector(".markdown-body");
        if (!b) return { found: false };
        const displays = [...b.querySelectorAll(".katex-display")];
        const worst = displays.map((d) => ({ el: d, ov: d.scrollWidth - d.clientWidth })).sort((a, x) => x.ov - a.ov)[0];
        if (!worst) return { found: false };
        worst.el.scrollIntoView({ block: "center" });
        await new Promise((r) => setTimeout(r, 500));
        const r = worst.el.getBoundingClientRect();
        const outer = worst.el.closest("div.inline-block");
        const or = outer ? outer.getBoundingClientRect() : null;
        const card = b.closest(".about-card");
        const cr = card.getBoundingClientRect();
        return {
            found: true,
            innerScrollW: worst.el.scrollWidth, innerClientW: worst.el.clientWidth, innerOverflow: worst.ov,
            innerOverflowX: getComputedStyle(worst.el).overflowX,
            innerRect: { left: +r.left.toFixed(1), right: +r.right.toFixed(1), width: +r.width.toFixed(1) },
            outerOverflowX: outer ? getComputedStyle(outer).overflowX : null,
            outerScrollW: outer ? outer.scrollWidth : null, outerClientW: outer ? outer.clientWidth : null,
            cardOverflowX: getComputedStyle(card).overflowX,
            cardRight: +cr.right.toFixed(1),
            inkRightEdge: +(r.left + worst.el.scrollWidth).toFixed(1),
            clippedPx: +(r.left + worst.el.scrollWidth - cr.right).toFixed(1),
            viewportY: +r.top.toFixed(1), viewportH: +r.height.toFixed(1),
        };
    });
    if (out.katex.found) {
        await page.screenshot({ path: resolve(OUT, "mobile-katex-clip.png"), clip: { x: 0, y: Math.max(0, out.katex.viewportY - 60), width: 390, height: Math.min(300, 844 - Math.max(0, out.katex.viewportY - 60)) } }).catch(() => {});
    }
    await browser.close();
}

// C. link focus-visible + 200% zoom
{
    const browser = await webkit.launch();
    const ctx = await webkit.launch ? await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" }) : null;
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".markdown-body", { timeout: 30000 });
    await page.waitForTimeout(1500);
    out.links = await page.evaluate(() => {
        const b = document.querySelector(".markdown-body");
        const as = [...b.querySelectorAll("a")];
        return {
            count: as.length,
            sample: as.slice(0, 4).map((a) => ({ href: a.getAttribute("href"), text: (a.textContent || "").slice(0, 30),
                target: a.getAttribute("target"), rel: a.getAttribute("rel"),
                outline: getComputedStyle(a).outline, textDecoration: getComputedStyle(a).textDecorationLine })),
        };
    });
    // 200% zoom
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    await page.waitForTimeout(1200);
    out.zoom200 = await page.evaluate(() => {
        const b = document.querySelector(".markdown-body");
        const card = b.closest(".about-card");
        return {
            bodyW: +b.getBoundingClientRect().width.toFixed(1),
            cardW: +card.getBoundingClientRect().width.toFixed(1),
            docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            bodyOverflowX: b.scrollWidth - b.clientWidth,
            h2Size: (() => { const e = b.querySelector("h2"); return e ? getComputedStyle(e).fontSize : null; })(),
            h2MarginTop: (() => { const e = b.querySelector("h2"); return e ? getComputedStyle(e).marginTop : null; })(),
        };
    });
    await page.screenshot({ path: resolve(OUT, "zoom200-markdown.png") });
    await browser.close();
}

writeFileSync(resolve(HERE, "probe-md4.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
