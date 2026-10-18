import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const BASE = "http://localhost:9372";
const browser = await chromium.launch({ headless: true });
const MEASURE = () => {
  const stage = document.querySelector("#easing-authoring-0");
  const svg = stage.querySelector('svg[role="img"][aria-label]');
  const ctm = svg.getScreenCTM();
  const wrap = svg.closest('[data-slot="easing-picker"] > div');
  return { svgW: Math.round(svg.getBoundingClientRect().width), wrapW: Math.round(wrap.getBoundingClientRect().width), handles: [...stage.querySelectorAll('[data-slot="easing-handles"] circle[role="slider"]')].map((c) => { const r = c.getBoundingClientRect(); const p = new DOMPoint(c.cx.baseVal.value, c.cy.baseVal.value).matrixTransform(ctm); return { dx: +(r.left + r.width / 2 - p.x).toFixed(1), dy: +(r.top + r.height / 2 - p.y).toFixed(1) }; }) };
};
try {
  for (const arm of ["cure", "old-rule"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/gradient`, { timeout: 180000 });
    const head = page.locator("button.interval-head").first();
    await head.waitFor({ timeout: 180000 });
    if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
    await page.getByRole("button", { name: "Author a custom curve" }).first().click();
    await page.locator("#easing-authoring-0 svg[role='img']").waitFor();
    if (arm === "old-rule") await page.addStyleTag({ content: `.easing-authoring [data-slot="easing-picker"] > div { inline-size: auto !important; } .easing-authoring svg[aria-label] { inline-size: min(100%, 19rem) !important; margin-inline: 0 !important; }` });
    await page.waitForTimeout(1500);
    const m = await page.evaluate(MEASURE);
    const pass = m.handles.every((h) => Math.abs(h.dx) <= 1 && Math.abs(h.dy) <= 1);
    console.log(arm, JSON.stringify(m), pass ? "FALSIFIER GREEN" : "FALSIFIER RED");
    await ctx.close();
  }
} finally { await browser.close(); }
