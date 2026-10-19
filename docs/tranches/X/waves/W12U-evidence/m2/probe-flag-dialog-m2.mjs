// SERVED MODEL: claude-opus-5-5
// X.W12U.m2 — A2-VA-X-10 consumer half re-read: the Browse "Report" (flag)
// dialog at 844×390 (and 360×780, 430×932 controls). GREEN iff the dialog box
// lies inside the viewport (top ≥ 0, bottom ≤ innerHeight) and, when its
// content is taller than the box, the body scrolls (some descendant has
// scrollHeight > clientHeight with overflow-y auto|scroll), so its footer is
// reached inside the dialog (glass `scroll`; whether the footer is pinned is
// glass's DialogContent, A2-FO-L2-8) and its title is on screen.
// Same open path as x/capture-overlays.mjs.
// Usage: node probe-flag-dialog-m2.mjs [light|dark]
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";

const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ channel: "chrome", headless: true });
let red = 0, n = 0;
for (const [W, H] of [[844, 390], [360, 780], [430, 932]]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: true, hasTouch: true });
    await prepare(ctx, { theme, user: true, browse: "ok" });
    const p = await ctx.newPage();
    await p.goto("http://localhost:9000/#/browse", { timeout: 120000 });
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(1200);
    const trig = p.getByRole("button", { name: "Palette menu" }).nth(1);
    await trig.scrollIntoViewIfNeeded();
    await trig.click();
    await p.waitForTimeout(400);
    await p.getByRole("menuitem", { name: "Report" }).first().click();
    await p.waitForTimeout(1500);
    const s = await p.evaluate(() => {
        const d = [...document.querySelectorAll("[role=dialog],[role=alertdialog]")].find((e) => e.getBoundingClientRect().width > 0);
        if (!d) return null;
        const r = d.getBoundingClientRect();
        const scrollers = [d, ...d.querySelectorAll("*")].filter((e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 1);
        const title = d.querySelector("h2,[data-slot$=title]"), tr = title?.getBoundingClientRect();
        const btns = [...d.querySelectorAll("button")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => e.getBoundingClientRect());
        return { t: Math.round(r.top * 10) / 10, b: Math.round(r.bottom * 10) / 10, h: Math.round(r.height), vh: innerHeight,
            titleIn: !!tr && tr.top >= 0 && tr.bottom <= innerHeight, lastBtnIn: btns.length > 0 && btns.at(-1).bottom <= innerHeight + 0.5,
            scrolls: scrollers.length > 0 };
    });
    const ok = !!s && s.t >= -0.5 && s.b <= s.vh + 0.5 && s.titleIn && (s.lastBtnIn || s.scrolls);
    n++; if (!ok) red++;
    console.log(`${W}x${H} ${theme} flag-report ${ok ? "GREEN" : "RED"} ${JSON.stringify(s)}`);
    await ctx.close();
}
await b.close();
console.log(red ? `RED ${red}/${n}` : `GREEN ${n}/${n}`);
