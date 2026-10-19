import { createRequire } from "node:module"; import path from "node:path";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = path.dirname(new URL(import.meta.url).pathname);
const BASE = "http://localhost:5173/"; const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  // 1. chevron rotation in the 1440 controls pane
  let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  let page = await ctx.newPage();
  await page.goto(BASE + "#/cube", { waitUntil: "load" });
  await page.evaluate(([k]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s.cube = { ...(s.cube ?? {}), selectedControl: "controls", isTimelineExpanded: false }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY]);
  await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
  out.chevrons = await page.evaluate(() => [...document.querySelectorAll("[data-slot=select-trigger], button[role=combobox]")].map((t) => { const svg = t.querySelector("svg:last-of-type"); const openAnc = t.closest("[data-state=open]"); return { text: t.textContent.trim().slice(0, 30), expanded: t.getAttribute("aria-expanded"), rotate: svg ? getComputedStyle(svg).rotate : null, openAncestor: openAnc ? (openAnc.getAttribute("data-slot") || openAnc.className.toString().slice(0, 60)) : null }; }));
  await ctx.close();
  // 2. 390 dark imported timeline at several delays
  ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "dark", deviceScaleFactor: 2 });
  page = await ctx.newPage();
  await page.goto(BASE + "#/cube", { waitUntil: "load" });
  await page.evaluate(([k]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s.cube = { ...(s.cube ?? {}), selectedControl: "timeline", isTimelineExpanded: true, isControlsPanelOpen: true }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY]);
  await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000);
  const lead = page.locator("p:has-text('to edit here') ~ button").first();
  out.leadCount = await lead.count();
  if (out.leadCount) {
    await lead.evaluate((b) => b.click());
    for (const t of [600, 2500, 6000]) {
      await page.waitForTimeout(t === 600 ? 600 : t - (t === 2500 ? 600 : 2500));
      out["t" + t] = await page.evaluate(() => { const h = [...document.querySelectorAll("h1,h2,h3,[data-slot=sheet-content] *")].find((e) => e.childElementCount === 0 && e.textContent.trim() === "Timeline"); const sc = document.querySelector(".controls-pane"); return { titleOpacity: h ? getComputedStyle(h).opacity : null, titleTop: h ? h.getBoundingClientRect().top : null, paneScroll: sc ? sc.scrollTop : null, mask: sc ? getComputedStyle(sc).maskImage.slice(0, 160) : null, toast: !!document.querySelector("[data-sonner-toast],[data-slot=toast], li[role=status]") }; });
      await page.screenshot({ path: path.join(OUT, `imported-390-dark-t${t}.png`) });
    }
  }
  await ctx.close();
} finally { await browser.close(); }
console.log(JSON.stringify(out, null, 1));
