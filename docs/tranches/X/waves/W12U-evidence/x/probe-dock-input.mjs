// SERVED MODEL: claude-opus-5-5
// X.W12U.x · §2.3 — the dock colour-input and slug-edit layers at phone widths:
// lists the dock's live (non-inert) controls at rest and after "Toggle action bar",
// with widths, and whether the input's placeholder fits its box.
// Usage: node probe-dock-input.mjs <width> <height> [light|dark] [shot.jpg]
import { chromium } from "@playwright/test";
import { prepare } from "./seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 360), Number(process.argv[3] ?? 780)];
const theme = process.argv[4] ?? "light";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: true, hasTouch: true });
await prepare(ctx, { theme, user: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/", { timeout: 90000 });
await p.getByRole("button", { name: "Toggle action bar" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(800);
const vis = () => p.evaluate(() => [...document.querySelectorAll(".dock-band button, .dock-band input")]
    .filter((e) => e.getBoundingClientRect().width > 0 && !e.closest("[inert]"))
    .map((e) => { const r = e.getBoundingClientRect(); const ph = e.placeholder;
        let fit = "";
        if (ph) { const c = document.createElement("canvas").getContext("2d"); const cs = getComputedStyle(e); c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; fit = ` ph"${ph}"${Math.round(c.measureText(ph).width)}>${Math.round(e.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight))}`; }
        return `${e.getAttribute("aria-label") || e.tagName}:${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.left)}-${Math.round(r.right)}${fit}`; }));
console.log(`${W}x${H} ${theme} rest`, JSON.stringify(await vis()));
await p.getByRole("button", { name: "Toggle action bar" }).first().click();
await p.waitForTimeout(800);
console.log(`${W}x${H} ${theme} toggled`, JSON.stringify(await vis()));
await p.getByRole("button", { name: "Open color input" }).first().click();
await p.waitForTimeout(800);
console.log(`${W}x${H} ${theme} colour-input`, JSON.stringify(await vis()));
if (process.argv[5]) await p.screenshot({ path: process.argv[5], clip: { x: 0, y: 0, width: W, height: 110 } });
await p.reload({ timeout: 90000 });
await p.getByRole("button", { name: "Menu" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(800);
await p.getByRole("button", { name: "Menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: /Switch account/ }).first().click();
await p.waitForTimeout(800);
console.log(`${W}x${H} ${theme} slug-edit`, JSON.stringify(await vis()));
await b.close();
