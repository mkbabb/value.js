// SERVED MODEL: claude-opus-5-5
// X.W12U.m2 — R-m-3 (X-W12 m-2): the mobile-edit enter on /palettes at 390×844,
// read in a COARSE context (isMobile + hasTouch: the pointer class the
// mobile-edit layer serves). Opens the seeded local card, opens its first
// swatch's popover, then samples the "Edit color" control's box on every
// animation frame for 2 s and lists every running animation on it and its
// ancestors (the "element is not stable" bisect). Then taps Edit and reads
// whether the dock's "Save edit" seat arrives.
// GREEN iff Edit is in the viewport, its box is still (≤ 0.5 px over the last
// 10 frames, the Playwright stability window is 2 frames) and Save edit lands.
// Usage: node probe-mobile-edit.mjs [light|dark] [fine]   ("fine" = the old fine-pointer context)
import { chromium } from "@playwright/test";

const theme = process.argv[2] ?? "dark";
const fine = process.argv[3] === "fine";
const SEED = { version: 1, palettes: [{ id: "w12e-seed", name: "W12e seed", slug: "w12e-seed",
    colors: [{ css: "oklch(0.7 0.15 30)", position: 0 }, { css: "oklch(0.6 0.12 250)", position: 1 }],
    createdAt: "2026-09-24T00:00:00Z", updatedAt: "2026-09-24T00:00:00Z", isLocal: true }] };
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, ...(fine ? {} : { isMobile: true, hasTouch: true }) });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/palettes", { timeout: 120000 });
const card = p.locator('[aria-label="Palette: W12e seed"]');
await card.waitFor({ timeout: 90000 });
await p.waitForTimeout(1500);
await card.click({ timeout: 10000 });
await p.waitForTimeout(600);
await card.locator(".watercolor-swatch").first().locator("xpath=..").click({ timeout: 10000 });
const edit = p.locator('[aria-label^="Edit color "]').first();
await edit.waitFor({ timeout: 10000 });
const read = await edit.evaluate(async (el) => {
    const boxes = [];
    await new Promise((res) => { let n = 0; const tick = () => { const r = el.getBoundingClientRect(); boxes.push([r.x, r.y, r.width, r.height]); if (++n < 120) requestAnimationFrame(tick); else res(); }; requestAnimationFrame(tick); });
    const anims = [];
    for (let a = el; a; a = a.parentElement) for (const an of a.getAnimations()) anims.push(`${a.tagName.toLowerCase()}.${String(a.className).split(" ")[0]}:${an.animationName ?? an.transitionProperty ?? an.constructor.name}:${an.playState}:${an.effect?.getTiming?.().iterations}`);
    const last = boxes.slice(-10), d = Math.max(...last.map((q) => Math.hypot(q[0] - last[0][0], q[1] - last[0][1], q[2] - last[0][2], q[3] - last[0][3])));
    const all = Math.max(...boxes.map((q) => Math.hypot(q[0] - boxes[0][0], q[1] - boxes[0][1])));
    const r = el.getBoundingClientRect();
    return { box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], inView: r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight,
        settleDrift: Math.round(d * 100) / 100, drift2s: Math.round(all * 10) / 10, anims: [...new Set(anims)].slice(0, 8) };
});
let saved = false;
try { await (fine ? edit.click({ timeout: 10000 }) : edit.tap({ timeout: 10000 })); await p.locator(".glass-dock").getByRole("button", { name: "Save edit", exact: true }).waitFor({ timeout: 10000 }); saved = true; } catch (e) { read.err = String(e.message).split("\n")[0].slice(0, 160); }
const ok = read.inView && read.settleDrift <= 0.5 && saved;
console.log(`390x844 ${theme} ${fine ? "fine" : "coarse"} mobile-edit ${ok ? "GREEN" : "RED"} saved=${saved} ${JSON.stringify(read)}`);
await b.close();
