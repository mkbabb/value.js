// X-DS keyframes r7 pass 7 — one diagnosis frame (headless real Chrome, §0ei). ROUTE, SURFACE, W, H, OUT env.
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const { ROUTE, SURFACE, W = 1440, H = 900, OUT } = process.env;
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: +W, height: +H }, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}#/`, { waitUntil: "load" });
  if (SURFACE) await page.evaluate(([k, r, s]) => { const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o[r] = { ...(o[r] ?? {}), selectedControl: s, isTimelineExpanded: false, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(o)); }, [KEY, ROUTE, SURFACE]);
  await page.goto(`${BASE}#/${ROUTE}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(6000);
  console.log(await page.evaluate(() => { const s = [...document.querySelectorAll(".controls-surface")].find((e) => e.checkVisibility()); return [...s.querySelectorAll("*")].filter((e) => e.checkVisibility() && e.getBoundingClientRect().height > 300).slice(0, 12).map((e) => `${e.tagName}.${e.className.toString().slice(0, 50)} ${Math.round(e.getBoundingClientRect().height)}`).join("\n"); }));
  await page.screenshot({ path: OUT });
} finally { await browser.close(); }
