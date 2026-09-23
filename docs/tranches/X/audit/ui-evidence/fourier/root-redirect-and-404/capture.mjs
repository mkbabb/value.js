// UIA-F root-redirect-and-404 capture — headed Chromium, real GPU. Read-only on the app.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const metrics = {};
const probe = (page) => page.evaluate(() => {
  const main = document.querySelector("main");
  const r = main?.getBoundingClientRect();
  return { url: location.pathname, title: document.title, desc: document.querySelector('meta[name=description]')?.content?.slice(0, 60),
    savedTab: localStorage.getItem("fourier_active_tab"), mainChildren: main?.children.length, mainText: main?.innerText.trim().slice(0, 80),
    mainBox: r && [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
    navLabel: document.querySelector(".nav-trigger-label")?.textContent?.trim(), dark: document.documentElement.classList.contains("dark") };
});
async function run(vp, theme, name, seedTab, path) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  if (seedTab) await ctx.addInitScript((t) => { if (!sessionStorage.getItem("seeded")) { localStorage.setItem("fourier_active_tab", t); sessionStorage.setItem("seeded", "1"); } }, seedTab);
  const page = await ctx.newPage();
  const logs = []; page.on("console", (m) => { if (["warning", "error"].includes(m.type())) logs.push(m.type() + ": " + m.text().slice(0, 160)); });
  const t0 = Date.now();
  await page.goto(BASE + path, { waitUntil: "networkidle" }).catch((e) => logs.push("goto " + e.message));
  await page.waitForTimeout(1200);
  const key = `${vp}-${theme}-${name}`;
  await page.screenshot({ path: OUT + key + ".png" });
  metrics[key] = { path, seedTab, ms: Date.now() - t0, ...(await probe(page)), logs };
  await ctx.close();
}
for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  await run(vp, theme, "firstvisit-root", null, "/");
  await run(vp, theme, "returning-gallery", "/gallery", "/");
  await run(vp, theme, "unknown-nope", null, "/nope");
  if (theme === "light") {
    await run(vp, theme, "returning-morph", "/morph", "/");
    await run(vp, theme, "returning-invalid", "/nope", "/");
    await run(vp, theme, "unknown-deep", null, "/gallery/does-not-exist");
    await run(vp, theme, "unknown-saved-viz-missing", null, "/v/no-such-slug");
    await run(vp, theme, "trailing-visualize", null, "/visualize/");
  }
}
writeFileSync(OUT + "metrics.json", JSON.stringify(metrics, null, 1));
await browser.close();
