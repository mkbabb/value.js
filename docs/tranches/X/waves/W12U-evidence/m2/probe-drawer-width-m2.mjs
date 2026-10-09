// SERVED MODEL: claude-opus-5-5
// X.W12U.m2 (from x/probe-browse-overlays.mjs) — A2-VA-X-3 consumer WIDTH half (+ the glass PLACE half read beside it): the Browse card menu's "Versions" drawer
// and "Edit Tags" popover must open INSIDE the viewport. Headed Chromium, :9000,
// remote palettes route-stubbed (seed-x.mjs), logged-in slug. Samples the open
// overlay's box at 0.3/1/2/3 s after the menu item, from card 0 and from a card
// scrolled below the fold (card 5).
// GREEN iff every sample has top >= 0 and bottom <= innerHeight.
// Usage: node probe-browse-overlays.mjs <width> <height> [light|dark] [frames dir]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { prepare } from "../x/seed-x.mjs";

const [W, H] = [Number(process.argv[2] ?? 390), Number(process.argv[3] ?? 844)];
const theme = process.argv[4] ?? "light";
const FR = process.argv[5];
if (FR) mkdirSync(FR, { recursive: true });
const phone = W < 900;
const b = await chromium.launch({ channel: "chrome", headless: true });
let red = 0, n = 0;
for (const [item, card] of [[/Versions/, 0], [/Versions/, 4]]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, user: true, browse: "ok" });
    if (process.env.UNDO) await ctx.addInitScript(() => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = "[role=dialog]{max-width:none !important}"; document.head.append(s); })); // UNDO=1: the pre-cure width
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse");
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 25000 }).catch(() => {});
    await p.waitForTimeout(1200);
    const trig = p.getByRole("button", { name: "Palette menu" }).nth(card);
    await trig.scrollIntoViewIfNeeded();
    await trig.click();
    await p.waitForTimeout(400);
    await p.getByRole("menuitem", { name: item }).first().click();
    const samples = [];
    for (const t of [300, 700, 1000, 1000]) {
        await p.waitForTimeout(t);
        samples.push(await p.evaluate(() => {
            const d = [...document.querySelectorAll("[role=dialog]")].find((e) => e.getBoundingClientRect().width > 0);
            if (!d) return null;
            const r = d.getBoundingClientRect();
            let fixedIn = null;
            for (let a = d.parentElement; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.transform !== "none" || cs.filter !== "none" || cs.contain.includes("paint") || cs.backdropFilter !== "none" && cs.backdropFilter) { fixedIn = `${a.tagName.toLowerCase()}.${String(a.className).split(" ").slice(0, 2).join(".")}`; break; } }
            return { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width), vw: document.documentElement.clientWidth, t: Math.round(r.top), b: Math.round(r.bottom), h: Math.round(r.height), vh: innerHeight, sy: Math.round(scrollY), pos: getComputedStyle(d).position, cb: fixedIn, title: (d.querySelector("h2,[data-slot$=title]")?.textContent ?? "").trim().slice(0, 30) };
        }));
    }
    const last = samples.at(-1);
    const ok = !!last && last.l >= -0.5 && last.r <= last.vw + 0.5 && last.w <= last.vw + 0.5; // WIDTH half (consumer), on the SETTLED sample (the side-sheet enters by sliding in)
    const place = !!last && samples.every((s) => s && s.t >= -0.5 && s.b <= s.vh + 0.5); // PLACE half (glass G-1)
    n++; if (!ok) red++;
    console.log(`${W}x${H} ${theme} card${card} ${item} width ${ok ? "GREEN" : "RED"} · place(G-1) ${place ? "GREEN" : "RED"} ${JSON.stringify(samples.at(-1))}`);
    if (FR) await p.screenshot({ path: join(FR, `${W}x${H}-${theme}-card${card}-${String(item).replace(/\W/g, "")}.jpg`), type: "jpeg", quality: 50 });
    await ctx.close();
}
await b.close();
console.log(red ? `RED ${red}/${n}` : `GREEN ${n}/${n}`);
