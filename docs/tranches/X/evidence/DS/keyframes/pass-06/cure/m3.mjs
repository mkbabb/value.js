// X-DS kf pass 6 cure seat — measure the bezier sub-pane (KF-C6-03) and the transport row (KF-C6-01). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const scheme = process.argv[2] ?? "light";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await p.evaluate(() => localStorage.clear()); await p.reload({ waitUntil: "load" });
await p.waitForTimeout(4000);
const row = await p.evaluate(() => {
  const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
  const rev = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Reverse" && b.getBoundingClientRect().width > 0);
  const span = rev?.querySelector("span");
  const labels = [...document.querySelectorAll(".label, label")].filter(e => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().x < 500).slice(0, 6).map(e => [e.textContent.trim().slice(0, 20), R(e)]);
  return { rev: rev && R(rev), revText: span && R(span), labels };
});
console.log(JSON.stringify(row));
await p.locator('[aria-label="Edit easing curve"]:visible').first().click();
await p.waitForTimeout(1500);
const out = await p.evaluate(() => {
  const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
  const body = [...document.querySelectorAll("[data-subpane-body]")].find(e => e.getBoundingClientRect().height > 0);
  const surf = document.querySelector(".controls-surface");
  const kids = [...body.querySelectorAll("*")].filter(e => e.getBoundingClientRect().height > 20).slice(0, 30).map(e => [e.tagName, e.className.toString().slice(0, 60), R(e)]);
  return { body: R(body), surf: R(surf), surfScroll: [surf.clientHeight, surf.scrollHeight], kids };
});
console.log(JSON.stringify(out, null, 1));
await p.screenshot({ path: process.argv[3] ?? "/dev/null" });
await b.close();
