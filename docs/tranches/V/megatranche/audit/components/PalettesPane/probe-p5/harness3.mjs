// pass 5 · probe 3 — forced-colors FOCUS visibility, hover-capability truth,
// the drag ghost, and the ramp under forced-colors. Read-only.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const ROUTE = "http://localhost:9000/#/palettes";

const mkColors = (n, t) => Array.from({ length: n }, (_, i) => ({ css: `oklch(0.72 0.16 ${(i * 360) / n})`, name: `${t}-${i}`, position: i }));
const now = new Date().toISOString();
const p = (id, name, colors) => ({ id, name, slug: id, colors, createdAt: now, updatedAt: now, isLocal: true });
const STORE = { version: 1, palettes: [p("a", "Sunset Ridge", mkColors(5, "a")), p("b", "Moss & Bone", mkColors(4, "b")), p("c", "Harbor", mkColors(6, "c")), p("d", "Fifty", mkColors(50, "d"))] };

const paneJs = `(() => { const h=[...document.querySelectorAll('h1,h2,h3,h4')].find(e=>/My\\s*Palettes/.test(e.textContent||'')); return h ? h.closest("[class*='pane-scroll-fade']") : null; })()`;

const out = {};
const b = await chromium.launch();

async function boot(opts) {
    const ctx = await b.newContext(opts);
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), STORE);
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    return { ctx, page };
}

// ── 1. FORCED COLORS: is focus visible? ──
{
    const { ctx, page } = await boot({ viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" });
    out.fcFocus = await page.evaluate((src) => {
        const pane = eval(src);
        const read = (el) => {
            el.focus();
            const c = getComputedStyle(el);
            return {
                name: el.getAttribute("aria-label") || el.getAttribute("placeholder"),
                outline: `${c.outlineWidth} ${c.outlineStyle} ${c.outlineColor}`,
                outlineOffset: c.outlineOffset,
                boxShadow: c.boxShadow,
                forcedColorAdjust: c.forcedColorAdjust,
                isActive: document.activeElement === el,
            };
        };
        const trash = pane.querySelector('[aria-label="Delete all saved palettes"]');
        const menu = pane.querySelector('[aria-label="Palette menu"]');
        const input = pane.querySelector("input");
        const wrap = input.closest("[class*='search-seated']");
        input.focus();
        const wrapFocus = { cls: (wrap.className || "").toString().slice(0, 40), boxShadow: getComputedStyle(wrap).boxShadow, outline: `${getComputedStyle(wrap).outlineWidth} ${getComputedStyle(wrap).outlineStyle}` };
        return {
            forcedColorsMedia: matchMedia("(forced-colors: active)").matches,
            trash: read(trash), menu: read(menu), input: read(input), searchWrapperOnFocus: wrapFocus,
        };
    }, paneJs);
    // photograph the focused trash under forced colors
    await page.evaluate((src) => { const pane = eval(src); pane.querySelector('[aria-label="Delete all saved palettes"]').focus(); }, paneJs);
    await page.screenshot({ path: path.join(OUT, "chromium-fc-focus-trash.png") });
    await page.evaluate((src) => { const pane = eval(src); pane.querySelector('[aria-label="Palette menu"]').focus(); }, paneJs);
    await page.screenshot({ path: path.join(OUT, "chromium-fc-focus-menu.png") });
    out.fcRamp = await page.evaluate((src) => {
        const pane = eval(src);
        const s = pane.querySelector(".palettes-ramp-text");
        const c = getComputedStyle(s);
        return { color: c.color, backgroundImage: c.backgroundImage.slice(0, 120), webkitTextFillColor: c.webkitTextFillColor, forcedColorAdjust: c.forcedColorAdjust };
    }, paneJs);
    await ctx.close();
}

// ── 2. NORMAL mode: focus ring channel, hover capability ──
{
    const { ctx, page } = await boot({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    out.hoverCapability = await page.evaluate(() => ({
        hoverHover: matchMedia("(hover: hover)").matches,
        anyHover: matchMedia("(any-hover: hover)").matches,
        pointerFine: matchMedia("(pointer: fine)").matches,
    }));
    // real mouse move onto the card
    const box = await page.locator('[role="article"]').first().boundingBox();
    const rest = await page.locator('[role="article"]').first().evaluate((e) => {
        const c = getComputedStyle(e);
        return { transform: c.transform, boxShadow: c.boxShadow, borderColor: c.borderColor, bg: c.backgroundColor, translate: c.translate, scale: c.scale };
    });
    await page.mouse.move(box.x + box.width / 2, box.y + box.height - 12);
    await page.waitForTimeout(600);
    const hov = await page.locator('[role="article"]').first().evaluate((e) => {
        const c = getComputedStyle(e);
        return { matchesHover: e.matches(":hover"), transform: c.transform, boxShadow: c.boxShadow, borderColor: c.borderColor, bg: c.backgroundColor, translate: c.translate, scale: c.scale };
    });
    await page.mouse.down();
    await page.waitForTimeout(300);
    const act = await page.locator('[role="article"]').first().evaluate((e) => {
        const c = getComputedStyle(e);
        return { matchesActive: e.matches(":active"), transform: c.transform, boxShadow: c.boxShadow, translate: c.translate, scale: c.scale };
    });
    await page.mouse.up();
    out.cardPointerStates = { rest, hov, act };

    // focus ring channel in normal mode
    out.focusRingNormal = await page.evaluate((src) => {
        const pane = eval(src);
        const g = (el) => { el.focus(); const c = getComputedStyle(el); return { name: el.getAttribute("aria-label") || el.getAttribute("placeholder"), outline: `${c.outlineWidth} ${c.outlineStyle} ${c.outlineColor}`, boxShadow: c.boxShadow.slice(0, 130) }; };
        return { trash: g(pane.querySelector('[aria-label="Delete all saved palettes"]')), menu: g(pane.querySelector('[aria-label="Palette menu"]')) };
    }, paneJs);

    // drag ghost class — what does opacity-30 look like against the pane?
    out.ghost = await page.evaluate((src) => {
        const pane = eval(src);
        const card = pane.querySelector('[role="article"]');
        card.classList.add("opacity-30");
        const c = getComputedStyle(card);
        const r = { opacity: c.opacity, bg: c.backgroundColor, shadow: c.boxShadow.slice(0, 60) };
        card.classList.remove("opacity-30");
        return r;
    }, paneJs);

    // scroll the pane: does the pane-scroll-fade mask clip a focused control?
    out.scrollFade = await page.evaluate((src) => {
        const pane = eval(src);
        const c = getComputedStyle(pane);
        return { maskImage: (c.maskImage || c.webkitMaskImage || "none").slice(0, 160), overflowY: c.overflowY, scrollH: pane.scrollHeight, clientH: pane.clientHeight };
    }, paneJs);
    await ctx.close();
}

await b.close();
fs.writeFileSync(path.join(OUT, "TELEMETRY-chromium-3.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
