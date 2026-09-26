// SERVED MODEL: claude-opus-5-5
// X.W12U.x — A2-VA-X-11 falsifier + the dock colour-input read.
// (a) /palettes at 844x390 (and 360x780 control): scroll a saved card's
//     "Palette menu" into view, open it, and read scrollY before/after and the
//     menu box. RED iff the open menu is not inside the viewport.
// (b) the dock colour-input layer at 360x780 / 844x390: open it through the
//     "Toggle action bar" control and read the input's box and placeholder fit.
// Usage: node probe-landscape-menu.mjs [light|dark]
import { chromium } from "@playwright/test";
import { prepare } from "./seed-x.mjs";

const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
let red = 0;
for (const [W, H] of [[844, 390], [360, 780]]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: true, hasTouch: true });
    await prepare(ctx, { theme, palettes: true, user: true, browse: "ok" });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/palettes", { timeout: 60000 });
    const trig = p.getByRole("button", { name: "Palette menu" }).first();
    await trig.waitFor({ timeout: 60000 });
    await p.waitForTimeout(800);
    await trig.scrollIntoViewIfNeeded();
    const before = await p.evaluate(() => ({ sy: Math.round(scrollY), trig: Math.round(document.querySelector("[aria-label='Palette menu']").getBoundingClientRect().top) }));
    await trig.click();
    await p.waitForTimeout(700);
    const after = await p.evaluate(() => {
        const m = [...document.querySelectorAll("[role=menu]")].find((e) => e.getBoundingClientRect().width > 0);
        const r = m?.getBoundingClientRect();
        return { sy: Math.round(scrollY), trig: Math.round(document.querySelector("[aria-label='Palette menu']").getBoundingClientRect().top), menu: r ? [Math.round(r.top), Math.round(r.bottom)] : null, vh: innerHeight };
    });
    const ok = !!after.menu && after.menu[0] >= 0 && after.menu[1] <= after.vh + 0.5;
    if (!ok) red++;
    console.log(`(a) ${W}x${H} ${theme} card-menu ${ok ? "GREEN" : "RED"} before=${JSON.stringify(before)} after=${JSON.stringify(after)}`);
    await p.keyboard.press("Escape");
    // (b) the dock colour-input layer
    await p.goto("http://localhost:9000/#/", { timeout: 60000 });
    await p.getByRole("button", { name: "Toggle action bar" }).first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(600);
    await p.getByRole("button", { name: "Toggle action bar" }).first().click();
    await p.waitForTimeout(700);
    const inp = await p.evaluate(() => {
        const i = [...document.querySelectorAll("input[aria-label='Enter a CSS color'], input[aria-label='Propose a color name']")].find((e) => e.getBoundingClientRect().width > 0 && !e.closest("[inert]"));
        if (!i) return null;
        const r = i.getBoundingClientRect(); const cs = getComputedStyle(i);
        const c = document.createElement("canvas").getContext("2d"); c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        return { w: Math.round(r.width), h: Math.round(r.height), fs: cs.fontSize, ph: i.placeholder, phW: Math.round(c.measureText(i.placeholder).width), val: i.value.slice(0, 24), valW: Math.round(c.measureText(i.value).width) };
    });
    console.log(`(b) ${W}x${H} ${theme} colour-input ${JSON.stringify(inp)}`);
    await ctx.close();
}
await b.close();
console.log(red ? `RED ${red}/2 (a)` : "GREEN 2/2 (a)");
