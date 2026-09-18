// CHALLENGE-D · AuroraPane design probe.
//
// The mega-tranche state matrix (audit/visual/states.mjs:18) captures ROUTES =
// ["#/", "#/gradient", "#/browse", "#/blob", "#/admin/users"] — `#/atmosphere`
// is ABSENT from every state matrix. So zoom-200 / forced-colors / RTL /
// keyboard-focus / open-dropdown have NEVER been captured for this component.
// This probe fills exactly that gap and measures the geometry the PNGs imply.
//
// Read-only: navigates, measures, screenshots. No app mutation beyond opening a
// Select (which the app itself does on click).
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "frames");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = "http://localhost:9000";
const ROUTE = ORIGIN + "/#/atmosphere";
const out = {};

// The four enum rows as authored in AuroraPane.vue:119-179.
const ROW_MEASURE = () => {
    const rows = [...document.querySelectorAll(".aurora-row")];
    const num = (v) => Math.round(v * 100) / 100;
    return rows.map((row) => {
        const label = row.querySelector(".aurora-row-label");
        const trig = row.querySelector("[role=combobox],button");
        const lb = label.getBoundingClientRect();
        const tb = trig.getBoundingClientRect();
        const lcs = getComputedStyle(label);
        const tcs = getComputedStyle(trig);
        // the SelectValue text node inside the trigger
        const val = trig.querySelector("span") || trig;
        const vcs = getComputedStyle(val);
        return {
            label: label.textContent.trim(),
            labelRect: { x: num(lb.x), w: num(lb.width), h: num(lb.height) },
            trigRect: { x: num(tb.x), w: num(tb.width), h: num(tb.height) },
            gapLabelToTrig: num(tb.x - (lb.x + lb.width)),
            labelFont: `${lcs.fontFamily.split(",")[0]} ${lcs.fontSize}/${lcs.lineHeight} ls=${lcs.letterSpacing} tt=${lcs.textTransform} color=${lcs.color}`,
            labelHasFor: label.hasAttribute("for"),
            labelTag: label.tagName,
            trigFont: `${tcs.fontFamily.split(",")[0]} ${tcs.fontSize} style=${tcs.fontStyle}`,
            valueFont: `${vcs.fontFamily.split(",")[0]} ${vcs.fontSize} style=${vcs.fontStyle} weight=${vcs.fontWeight}`,
            trigAriaLabel: trig.getAttribute("aria-label"),
            trigAriaLabelledby: trig.getAttribute("aria-labelledby"),
            trigId: trig.id || null,
            // resolved custom props the scoped CSS depends on
            typeSmall: lcs.getPropertyValue("--type-small").trim(),
            trackingCaps: lcs.getPropertyValue("--tracking-caps").trim(),
            typeCaption: tcs.getPropertyValue("--type-caption").trim(),
        };
    });
};

const ACREAGE = () => {
    const num = (v) => Math.round(v * 100) / 100;
    const card = document.querySelector("main .glass-card, main [class*=card], main .relative > *") ||
        document.querySelector("main > *");
    const cb = card.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight;
    const scroller = document.querySelector(".pane-scroll-fade");
    return {
        viewport: { w: vw, h: vh },
        cardRect: { x: num(cb.x), y: num(cb.y), w: num(cb.width), h: num(cb.height) },
        cardShareOfViewport: num((cb.width * cb.height) / (vw * vh) * 100),
        scrollClipped: scroller
            ? { scrollH: scroller.scrollHeight, clientH: scroller.clientHeight, hidden: scroller.scrollHeight - scroller.clientHeight }
            : null,
        // any canvas inside the pane region = a preview stage; the constitution
        // requires a persistent Aurora preview for /atmosphere.
        canvasesInMain: document.querySelectorAll("main canvas").length,
        canvasesInPage: document.querySelectorAll("canvas").length,
    };
};

const TAPTARGETS = () => {
    const bad = [];
    for (const el of document.querySelectorAll("main button,main [role=combobox],main a,main [role=slider]")) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) continue;
        if (b.width < 44 || b.height < 44) {
            bad.push({
                tag: el.tagName, role: el.getAttribute("role"),
                name: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30),
                w: Math.round(b.width), h: Math.round(b.height),
            });
        }
    }
    return bad;
};

async function boot(ctx, tag) {
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
    page.on("console", (m) => { if (m.type() === "error") errs.push("console:" + m.text().slice(0, 160)); });
    await page.goto(ROUTE, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500);
    out[tag] = out[tag] || {};
    out[tag].errs = errs;
    return page;
}

const browser = await webkit.launch();

// ---- 1. desktop light: geometry, typography, acreage, tap targets ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await boot(ctx, "desktop-light");
    out["desktop-light"].rows = await page.evaluate(ROW_MEASURE);
    out["desktop-light"].acreage = await page.evaluate(ACREAGE);
    out["desktop-light"].tap = await page.evaluate(TAPTARGETS);

    // ---- 2. OPEN the Harmony select (a state no capture has ever held) ----
    await page.locator('[aria-label="Palette harmony"]').click();
    await page.waitForTimeout(900);
    out["desktop-light"].open = await page.evaluate(() => {
        const num = (v) => Math.round(v * 100) / 100;
        const content = document.querySelector("[role=listbox]");
        if (!content) return { found: false };
        const cb = content.getBoundingClientRect();
        const items = [...content.querySelectorAll("[role=option]")].map((el) => {
            const b = el.getBoundingClientRect();
            const strips = el.querySelectorAll("[class*=strip],[class*=chip],[class*=preview]");
            return {
                text: el.textContent.trim().slice(0, 24),
                h: num(b.height), w: num(b.width),
                stripEls: strips.length,
                swatchEls: el.querySelectorAll("*").length,
            };
        });
        return {
            found: true,
            contentRect: { x: num(cb.x), y: num(cb.y), w: num(cb.width), h: num(cb.height) },
            overflowsViewportBottom: num(cb.bottom - innerHeight),
            scrollable: content.scrollHeight > content.clientHeight,
            scrollH: content.scrollHeight, clientH: content.clientHeight,
            items,
            // does ANY descendant paint a distinct colour (the PreviewStrip)?
            distinctBgs: [...new Set([...content.querySelectorAll("*")]
                .map((e) => getComputedStyle(e).backgroundColor)
                .filter((c) => c !== "rgba(0, 0, 0, 0)"))].slice(0, 12),
        };
    });
    await page.screenshot({ path: resolve(SHOTS, "desktop-light-harmony-open.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);

    // ---- 3. keyboard focus: tab to the first select, read the ring ----
    await page.evaluate(() => document.querySelector('[aria-label="Palette harmony"]').focus());
    await page.waitForTimeout(300);
    out["desktop-light"].focus = await page.evaluate(() => {
        const ae = document.activeElement;
        const cs = getComputedStyle(ae);
        return {
            active: ae.getAttribute("aria-label") || ae.tagName,
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} off=${cs.outlineOffset}`,
            boxShadow: cs.boxShadow.slice(0, 120),
        };
    });
    await page.screenshot({ path: resolve(SHOTS, "desktop-light-focus.png"), clip: { x: 300, y: 260, width: 900, height: 220 } });
    await ctx.close();
}

// ---- 4. dark ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    const page = await boot(ctx, "desktop-dark");
    out["desktop-dark"].rows = await page.evaluate(ROW_MEASURE);
    out["desktop-dark"].acreage = await page.evaluate(ACREAGE);
    await ctx.close();
}

// ---- 5. mobile ----
{
    const ctx = await browser.newContext({ ...devices["iPhone 14"] });
    const page = await boot(ctx, "mobile");
    out["mobile"].rows = await page.evaluate(ROW_MEASURE);
    out["mobile"].acreage = await page.evaluate(ACREAGE);
    out["mobile"].tap = await page.evaluate(TAPTARGETS);
    await page.locator('[aria-label="Palette harmony"]').click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: resolve(SHOTS, "mobile-harmony-open.png") });
    await ctx.close();
}

// ---- 6. forced-colors ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
    const page = await boot(ctx, "forced-colors");
    out["forced-colors"].rows = await page.evaluate(ROW_MEASURE);
    await page.screenshot({ path: resolve(SHOTS, "forced-colors.png") });
    await ctx.close();
}

// ---- 7. RTL ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await boot(ctx, "rtl");
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(1000);
    out["rtl"].rows = await page.evaluate(ROW_MEASURE);
    out["rtl"].overflowX = await page.evaluate(() =>
        Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    await page.screenshot({ path: resolve(SHOTS, "rtl.png") });
    await ctx.close();
}

// ---- 8. 200% zoom (half viewport @2x, the states.mjs convention) ----
{
    const ctx = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
    const page = await boot(ctx, "zoom-200");
    out["zoom-200"].rows = await page.evaluate(ROW_MEASURE);
    out["zoom-200"].acreage = await page.evaluate(ACREAGE);
    out["zoom-200"].overflowX = await page.evaluate(() =>
        Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    await page.screenshot({ path: resolve(SHOTS, "zoom-200.png") });
    await ctx.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe-D.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
