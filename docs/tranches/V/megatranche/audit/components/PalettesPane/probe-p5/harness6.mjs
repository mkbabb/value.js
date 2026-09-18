// pass 5 · probe 6 — overflow/containment: does `contain: layout style paint`
// on the pane clip the card menu popover, and does `.pane-scroll-fade` fade
// anything at the crop edge? Read-only.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const ROUTE = "http://localhost:9000/#/palettes";
const mkColors = (n, t) => Array.from({ length: n }, (_, i) => ({ css: `oklch(0.72 0.16 ${(i * 360) / n})`, name: `${t}-${i}`, position: i }));
const now = new Date().toISOString();
const p = (id, name, colors) => ({ id, name, slug: id, colors, createdAt: now, updatedAt: now, isLocal: true });
const list = [];
for (let i = 0; i < 12; i++) list.push(p(`p${i}`, `Palette ${i + 1}`, mkColors(4 + (i % 4), `s${i}`)));
const STORE = { version: 1, palettes: list };
const paneJs = `(() => { const h=[...document.querySelectorAll('h1,h2,h3,h4')].find(e=>/My\\s*Palettes/.test(e.textContent||'')); return h ? h.closest("[class*='pane-scroll-fade']") : null; })()`;

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), STORE);
await page.goto(ROUTE, { waitUntil: "networkidle" });
await page.waitForTimeout(1400);

const out = {};
out.containment = await page.evaluate((src) => {
    const pane = eval(src);
    const c = getComputedStyle(pane);
    const r = pane.getBoundingClientRect();
    const cards = [...pane.querySelectorAll('[role="article"]')];
    const last = cards[cards.length - 1].getBoundingClientRect();
    // the first card whose bottom edge crosses the pane's visible bottom
    const cropped = cards
        .map((el, i) => ({ i, r: el.getBoundingClientRect() }))
        .find((x) => x.r.top < r.bottom && x.r.bottom > r.bottom);
    return {
        contain: c.contain,
        mask: (c.maskImage || c.webkitMaskImage || "none"),
        overflowY: c.overflowY,
        paneBottom: Math.round(r.bottom),
        scrollH: pane.scrollHeight,
        clientH: pane.clientHeight,
        hiddenPx: pane.scrollHeight - pane.clientHeight,
        croppedCard: cropped ? { index: cropped.i, top: Math.round(cropped.r.top), bottom: Math.round(cropped.r.bottom), visiblePx: Math.round(r.bottom - cropped.r.top), ofPx: Math.round(cropped.r.height) } : null,
        lastCardBottom: Math.round(last.bottom),
        scrollbarWidth: pane.offsetWidth - pane.clientWidth,
    };
}, paneJs);

// open the LAST visible card's menu and see where the popover lands
const menus = page.locator('[aria-label="Palette menu"]');
const n = await menus.count();
await menus.nth(Math.min(3, n - 1)).click();
await page.waitForTimeout(700);
out.menuPopover = await page.evaluate((src) => {
    const pane = eval(src);
    const pop = document.querySelector('[role="menu"],[data-radix-popper-content-wrapper],[data-reka-popper-content-wrapper]');
    if (!pop) return { found: false };
    const pr = pane.getBoundingClientRect();
    const qr = pop.getBoundingClientRect();
    return {
        found: true,
        insidePane: pane.contains(pop),
        portalParent: pop.parentElement?.tagName + "." + (pop.parentElement?.className || "").toString().slice(0, 30),
        popRect: { x: Math.round(qr.x), y: Math.round(qr.y), w: Math.round(qr.width), h: Math.round(qr.height) },
        paneRect: { x: Math.round(pr.x), y: Math.round(pr.y), w: Math.round(pr.width), h: Math.round(pr.height) },
        overflowsPaneBottom: Math.round(qr.bottom - pr.bottom),
        overflowsPaneRight: Math.round(qr.right - pr.right),
        items: [...pop.querySelectorAll('[role="menuitem"],button')].map((e) => (e.textContent || "").replace(/\s+/g, " ").trim().slice(0, 24)),
    };
}, paneJs);
await page.screenshot({ path: path.join(OUT, "chromium-card-menu-open.png") });

// scroll the pane to the bottom and photograph the crop edge
await page.evaluate((src) => { const pane = eval(src); pane.scrollTop = pane.scrollHeight; }, paneJs);
await page.waitForTimeout(500);
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(OUT, "chromium-pane-scrolled-bottom.png") });

await ctx.close();
await b.close();
fs.writeFileSync(path.join(OUT, "TELEMETRY-chromium-6.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
