// SERVED MODEL: claude-opus-5-5
// X.W12U.m3 diagnostic: after "Toggle action bar", the run's children chain widths (which box holds the run's scrollWidth).
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 360), Number(process.argv[3] ?? 780)];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: "light", isMobile: true, hasTouch: true });
await prepare(ctx, { theme: "light", user: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/", { timeout: 90000 });
await p.getByRole("button", { name: "Toggle action bar" }).first().click({ timeout: 60000 });
await p.waitForTimeout(1000);
await p.getByRole("button", { name: "Open color input" }).first().tap();
await p.waitForTimeout(1000);
console.log((await p.evaluate(() => { const out = []; const walk = (e, d) => { if (d > 5 || (e.closest("[inert]") && d > 2)) return; const r = e.getBoundingClientRect(); if (r.width > 0) out.push(`${"  ".repeat(d)}${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).split(" ").slice(0, 3).join(".")} ${Math.round(r.left)}-${Math.round(r.right)} w${Math.round(r.width)} sw${e.scrollWidth} inert${e.inert ? 1 : 0} ${e.getAttribute("aria-label") ?? ""} ${getComputedStyle(e).inlineSize} min ${getComputedStyle(e).minInlineSize} ow${e.offsetWidth}`); for (const c of e.children) walk(c, d + 1); }; walk(document.querySelector(".dock-band .dock-layer--full"), 0); return out; })).join("\n"));
} finally { await b.close(); }
