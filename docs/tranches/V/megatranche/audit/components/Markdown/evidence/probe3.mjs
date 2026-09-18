import { webkit, chromium } from "playwright";
import fs from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/MDD";
const scrollToGuide = async (page) => {
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const g = [...document.querySelectorAll(".about-card h2")].find((h) => /Detailed Guide/.test(h.textContent));
        if (card && g) card.scrollTop = g.offsetTop - 24;
    });
    await page.waitForTimeout(900);
};

// ---------- 1. SKELETON: delay the doc module, screenshot the loading state ----------
async function skeleton() {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.route("**/assets/docs/**", async (route) => {
        await new Promise((r) => setTimeout(r, 9000));
        await route.continue();
    });
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(3500);
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        card.scrollTop = card.scrollHeight;
    });
    await page.waitForTimeout(500);
    const geo = await page.evaluate(() => {
        // the skeleton root is the Markdown v-if branch
        const sks = [...document.querySelectorAll(".about-card [data-slot='skeleton'], .about-card .skeleton, .about-card [class*='shimmer']")];
        const wrap = sks[0]?.closest("div.flex.items-center");
        const r = (el) => { const b = el.getBoundingClientRect(); return { w: +b.width.toFixed(1), h: +b.height.toFixed(1), x: +b.x.toFixed(1), y: +b.y.toFixed(1) }; };
        return {
            found: sks.length,
            skeletonRects: sks.map((s) => ({ cls: s.className, ...r(s) })),
            wrapperRect: wrap ? r(wrap) : null,
            wrapperHTML: wrap ? wrap.outerHTML.slice(0, 700) : null,
            markdownWrapperPresent: !!document.querySelector(".markdown-wrapper"),
        };
    });
    fs.writeFileSync(`${OUT}/skeleton.json`, JSON.stringify(geo, null, 2));
    const card = await page.$(".about-card");
    if (card) await card.screenshot({ path: `${OUT}/skeleton-card.png` });
    console.log("### SKELETON ###\n" + JSON.stringify(geo, null, 2));
    await browser.close();
}

// ---------- 2. real-pixel hr visibility + wide-viewport prose measure ----------
async function pixels(scheme) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(4000);
    // put the FIRST hr in the middle of the viewport
    await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const hr = document.querySelector(".markdown-body hr");
        card.scrollTop = hr.offsetTop - 300;
    });
    await page.waitForTimeout(1000);
    const box = await page.evaluate(() => {
        const hr = document.querySelector(".markdown-body hr");
        const b = hr.getBoundingClientRect();
        return { x: b.x, y: b.y, w: b.width, h: b.height };
    });
    const buf = await page.screenshot({ clip: { x: box.x + box.w / 2 - 6, y: box.y - 8, width: 12, height: 20 } });
    fs.writeFileSync(`${OUT}/hr-crop-${scheme}.png`, buf);
    // decode the strip and compute the max contrast between the divider row and its neighbours
    const strip = await page.evaluate(async ({ box }) => {
        // draw the page region via a canvas sample of the computed colours is not possible;
        // instead read the hr border colour + its opacity and the actual painted background
        // behind it via elementFromPoint chain composite.
        const hr = document.querySelector(".markdown-body hr");
        const cs = getComputedStyle(hr);
        return { borderTopColor: cs.borderTopColor, opacity: cs.opacity, borderTopWidth: cs.borderTopWidth, height: cs.height };
    }, { box });
    // wide viewport prose measure
    await page.setViewportSize({ width: 2560, height: 1200 });
    await page.waitForTimeout(1200);
    await scrollToGuide(page);
    const wide = await page.evaluate(() => {
        const body = document.querySelector(".markdown-body");
        const p = body.querySelector(":scope > p");
        const probe = document.createElement("span");
        probe.textContent = "0".repeat(100);
        probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;content-visibility:visible;";
        p.appendChild(probe);
        const chPx = probe.getBoundingClientRect().width / 100;
        probe.remove();
        return {
            viewport: 2560,
            bodyWidthPx: +body.getBoundingClientRect().width.toFixed(1),
            chPx: +chPx.toFixed(2),
            bodyWidthCh: +(body.getBoundingClientRect().width / chPx).toFixed(1),
            maxInlineSize: getComputedStyle(body).maxInlineSize,
        };
    });
    fs.writeFileSync(`${OUT}/pixels-${scheme}.json`, JSON.stringify({ box, strip, wide }, null, 2));
    console.log(`### PIXELS ${scheme} ###\n` + JSON.stringify({ strip, wide }, null, 2));
    await browser.close();
}

// ---------- 3. RTL + forced-colors + 200% zoom (chromium: forced-colors support) ----------
async function chromiumStates() {
    const browser = await chromium.launch();
    const results = {};

    // RTL
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", locale: "ar-EG" });
        const page = await ctx.newPage();
        await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
        await page.waitForTimeout(3500);
        await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
        await page.waitForTimeout(600);
        await scrollToGuide(page);
        results.rtl = await page.evaluate(() => {
            const body = document.querySelector(".markdown-body");
            const cs = (sel, props) => { const el = body.querySelector(sel); return el && Object.fromEntries(props.map((p) => [p, getComputedStyle(el)[p]])); };
            const li = body.querySelector("ul > li");
            const ul = body.querySelector("ul");
            const kx = body.querySelector(":scope > div.inline-block");
            return {
                dir: getComputedStyle(body).direction,
                ul: cs("ul", ["paddingLeft", "paddingRight", "direction"]),
                bulletGutterSide: ul ? (li.getBoundingClientRect().left - ul.getBoundingClientRect().left > ul.getBoundingClientRect().right - li.getBoundingClientRect().right ? "left" : "right") : null,
                ulRect: ul && { l: +ul.getBoundingClientRect().left.toFixed(1), r: +ul.getBoundingClientRect().right.toFixed(1) },
                liRect: li && { l: +li.getBoundingClientRect().left.toFixed(1), r: +li.getBoundingClientRect().right.toFixed(1) },
                katexPad: kx && Object.fromEntries(["paddingLeft", "paddingRight"].map((p) => [p, getComputedStyle(kx)[p]])),
                bodyOverflowX: document.scrollingElement.scrollWidth > document.scrollingElement.clientWidth,
            };
        });
        const card = await page.$(".about-card");
        if (card) await card.screenshot({ path: `${OUT}/rtl-card.png` });
        await ctx.close();
    }

    // forced colors
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" });
        const page = await ctx.newPage();
        await page.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
        await page.waitForTimeout(3500);
        await scrollToGuide(page);
        results.forcedColors = await page.evaluate(() => {
            const body = document.querySelector(".markdown-body");
            const g = (sel, props) => { const el = body.querySelector(sel); return el && Object.fromEntries(props.map((p) => [p, getComputedStyle(el)[p]])); };
            return {
                h2: g(":scope > h2", ["color", "fontFamily"]),
                h3: g(":scope > h3", ["color"]),
                mark: g("mark.cs-name", ["color", "backgroundColor", "fontWeight"]),
                code: g("p > code, li > code", ["color", "backgroundColor"]),
                hr: g("hr", ["borderTopColor", "opacity"]),
                forcedActive: matchMedia("(forced-colors: active)").matches,
            };
        });
        const card = await page.$(".about-card");
        if (card) await card.screenshot({ path: `${OUT}/forced-colors-card.png` });
        await ctx.close();
    }

    fs.writeFileSync(`${OUT}/chromium-states.json`, JSON.stringify(results, null, 2));
    console.log("### CHROMIUM STATES ###\n" + JSON.stringify(results, null, 2));
    await browser.close();
}

const which = process.argv[2];
if (which === "skeleton") await skeleton();
if (which === "pixels-light") await pixels("light");
if (which === "pixels-dark") await pixels("dark");
if (which === "chromium") await chromiumStates();
