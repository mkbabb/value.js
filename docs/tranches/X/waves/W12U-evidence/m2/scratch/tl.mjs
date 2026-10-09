// SERVED MODEL: claude-opus-5-5
// scratch: docSW timeline + widest non-fixed boxes, one theme.
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H, T, R] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4], process.argv[5] ?? "/"];
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true });
await prepare(ctx, { theme: T, palettes: true, admin: R.startsWith("/admin") });
const p = await ctx.newPage(); await p.goto("http://localhost:9000/#" + R, { timeout: 180000 });
for (let i = 0; i < 30; i++) {
  const s = await p.evaluate((vw) => { const o = []; for (const e of document.querySelectorAll("body *")) { const r = e.getBoundingClientRect(); if (r.right > vw + 0.5 && getComputedStyle(e).position !== "fixed") o.push(`${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).split(" ").slice(0, 2).join(".")}:${Math.round(r.right)}`); }
    return `${document.documentElement.scrollWidth} ${document.querySelectorAll(".pane-wrapper .glass-resting").length}cards ${o.slice(0, 4).join(" ")}`; }, W);
  if (!s.startsWith(W + " ")) console.log(i * 200, s); await p.waitForTimeout(200);
}
await b.close();
