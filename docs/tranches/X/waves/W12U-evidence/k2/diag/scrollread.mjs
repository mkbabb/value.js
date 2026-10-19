// SERVED MODEL: claude-opus-5-5
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [route, W, H] = [process.argv[2] ?? "/admin/users", Number(process.argv[3] ?? 1440), Number(process.argv[4] ?? 900)];
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: W, height: H } });
await prepare(ctx, { admin: true, palettes: true, user: true, browse: "ok" });
const p = await ctx.newPage();
await p.goto(`http://localhost:9000/#${route}`, { waitUntil: "commit", timeout: 600000 });
await p.waitForFunction(() => !!document.querySelector("main .pane-header"), null, { timeout: 600000 });
await p.waitForTimeout(8000);
console.log(JSON.stringify(await p.evaluate(() => {
  const hs = [...document.querySelectorAll("main .card-scroll-host, main .pane-scroll-fade")].filter((e) => e.getClientRects().length);
  const doc = document.scrollingElement;
  const out = hs.map((h) => { const c = h.closest("[data-slot='card']"); const cs = getComputedStyle(h); return { cls: h.className.slice(0, 60), ch: h.clientHeight, sh: h.scrollHeight, oy: cs.overflowY, card: c?.getBoundingClientRect().height, wrap: c?.parentElement?.getBoundingClientRect().height, region: c?.parentElement?.parentElement?.className.slice(0, 60) }; });
  return { doc: { ch: doc.clientHeight, sh: doc.scrollHeight }, out };
})));
await b.close();
