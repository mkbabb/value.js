// SERVED MODEL: claude-opus-5-5
// X.W12U.s2 · UIA-V-99 · V-276 falsifier (:9000). /palettes, 6 saved palettes: add the current
// colour (the editor's name row appears), then Rename a saved card. GREEN iff every button in
// the name row and the rename form has an accessible name, the name fields are labelled, the
// save square is square, and every such control meets the pointer floor (24 px fine / 44 px
// coarse). Usage: node probe-editor-names.mjs <w> <h> [light|dark].
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const floor = phone ? 44 : 24;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, palettes: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/palettes", { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(1200);
await p.getByRole("button", { name: /^Add current color/ }).first().click();
await p.waitForTimeout(600);
const nameRow = await p.evaluate(() => {
    const f = [...document.querySelectorAll("input")].find((i) => /^Palette \d+$/.test(i.placeholder));
    if (!f) return null;
    const row = f.closest("div.flex") ?? f.parentElement;
    const btns = [...row.querySelectorAll("button")].map((x) => { const k = x.getBoundingClientRect(); return { name: x.getAttribute("aria-label") ?? x.textContent.trim(), w: Math.round(k.width), h: Math.round(k.height) }; });
    return { field: f.getAttribute("aria-label"), btns };
});
await p.getByRole("button", { name: "Palette menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: "Rename" }).first().click();
await p.waitForTimeout(600);
const rename = await p.evaluate(() => {
    const f = document.querySelector('input[placeholder="Palette name..."]');
    if (!f) return null;
    const btns = [...f.closest("form").querySelectorAll("button")].map((x) => { const k = x.getBoundingClientRect(); return { name: x.getAttribute("aria-label") ?? x.textContent.trim(), w: Math.round(k.width), h: Math.round(k.height) }; });
    return { field: f.getAttribute("aria-label"), btns };
});
const all = [...(nameRow?.btns ?? []), ...(rename?.btns ?? [])];
const ok = nameRow && rename && nameRow.field && rename.field && all.length >= 3 && all.every((x) => x.name && x.w >= floor && x.h >= floor) && nameRow.btns.every((x) => x.w === x.h);
console.log(`[${W}x${H} ${theme}] ${ok ? "PASS" : "RED "} ${JSON.stringify({ floor, nameRow, rename })}`);
await b.close();
process.exit(ok ? 0 : 1);
