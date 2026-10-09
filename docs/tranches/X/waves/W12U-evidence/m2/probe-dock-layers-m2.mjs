// SERVED MODEL: claude-opus-5-5
// X.W12U.m2 (from x/probe-dock-input.mjs) — A2-VA-X-13 / X-14 at the box level: the dock colour-input and slug-edit layers at phone widths:
// lists the dock's live (non-inert) controls at rest and after "Toggle action bar",
// with widths, and whether the input's placeholder fits its box.
// m2 adds, per state: docSW, the dock plate's box, the scrolling run that
// holds the controls (box, scrollWidth/clientWidth), and an OUT list = every
// live control whose box is not wholly inside the viewport. X-13 GREEN iff the
// colour-input and toggled layers' OUT lists are empty and docSW == vw; X-14
// GREEN iff the slug-edit OUT list is empty and its placeholder fits.
// Usage: node probe-dock-layers-m2.mjs <width> <height> [light|dark] [shot.jpg]
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 360), Number(process.argv[3] ?? 780)];
const theme = process.argv[4] ?? "light";
const b = await chromium.launch({ channel: "chrome", headless: true });
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
const geo = () => p.evaluate((vw) => {
    const live = [...document.querySelectorAll(".dock-band button, .dock-band input")].filter((e) => e.getBoundingClientRect().width > 0 && !e.closest("[inert]"));
    const out = live.filter((e) => { const r = e.getBoundingClientRect(); return r.left < -0.5 || r.right > vw + 0.5; }).map((e) => e.getAttribute("aria-label") || e.tagName);
    let run = null, rb = null; for (let a = live[0]?.parentElement; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.overflowX === "auto" || cs.overflowX === "scroll" || cs.overflowX === "hidden" || cs.overflowX === "clip") { rb = a.getBoundingClientRect(); run = `${String(a.className).split(" ").slice(0, 2).join(".")} ${Math.round(rb.left)}-${Math.round(rb.right)} sw/cw ${a.scrollWidth}/${a.clientWidth} ${cs.overflowX}`; break; } }
    // HIDDEN = inside the viewport but past the run's scrollport (reached by scrolling the run, the producer's overflow contract O-80).
    const hidden = rb ? live.filter((e) => { const r = e.getBoundingClientRect(); return !e.closest("[inert]") && (r.left < rb.left - 0.5 || r.right > rb.right + 0.5); }).map((e) => e.getAttribute("aria-label") || e.tagName) : [];
    const apply = live.find((e) => /^(Apply color|Propose this color name)$/.test(e.getAttribute("aria-label") ?? "")); const ab = apply?.getBoundingClientRect();
    const plate = document.querySelector(".dock-band .glass-dock, .glass-dock"); const pr = plate?.getBoundingClientRect();
    return { docSW: document.documentElement.scrollWidth, plate: pr ? `${Math.round(pr.left)}-${Math.round(pr.right)}` : null, run, out, hidden, apply: ab ? `${Math.round(ab.width)}x${Math.round(ab.height)}` : null, coarse: matchMedia("(pointer: coarse)").matches };
}, W);
let red = 0; const judge = async (state) => { const g = await geo(); const bad = g.out.length > 0 || g.docSW !== W || (g.apply && g.coarse && parseFloat(g.apply) < 43.5); if (state !== "rest" && bad) red++; console.log(`${W}x${H} ${theme} ${state} GEO`, JSON.stringify(g), bad ? "RED" : "GREEN"); };
console.log(`${W}x${H} ${theme} rest`, JSON.stringify(await vis())); await judge("rest");
await p.getByRole("button", { name: "Toggle action bar" }).first().click();
await p.waitForTimeout(800);
console.log(`${W}x${H} ${theme} toggled`, JSON.stringify(await vis())); await judge("toggled");
await p.getByRole("button", { name: "Open color input" }).first().click();
await p.waitForTimeout(800);
console.log(`${W}x${H} ${theme} colour-input`, JSON.stringify(await vis())); await judge("colour-input");
if (process.argv[5]) await p.screenshot({ path: process.argv[5], clip: { x: 0, y: 0, width: W, height: 110 } });
await p.reload({ timeout: 90000 });
await p.getByRole("button", { name: "Menu" }).first().waitFor({ timeout: 60000 });
await p.waitForTimeout(800);
await p.getByRole("button", { name: "Menu" }).first().click();
await p.waitForTimeout(400);
await p.getByRole("menuitem", { name: /Switch account/ }).first().click();
await p.waitForTimeout(800);
console.log(`${W}x${H} ${theme} slug-edit`, JSON.stringify(await vis())); await judge("slug-edit");
await b.close();
console.log(red ? `RED ${red}/3` : "GREEN 3/3");
