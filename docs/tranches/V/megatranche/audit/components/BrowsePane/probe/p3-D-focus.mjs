import { chromium } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/D";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9010/#/browse", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3500);

// focus the seated search field and the Filters trigger directly; report the rendered ring
for (const sel of ['.search-seated input', '.search-seated button[aria-label="Filters"]']) {
  await page.locator(sel).first().focus();
  await page.waitForTimeout(250);
  const info = await page.evaluate((s) => {
    const el = document.querySelector(s);
    const cs = getComputedStyle(el);
    const bar = document.querySelector(".search-seated");
    const bcs = getComputedStyle(bar);
    return {
      sel: s,
      outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} off:${cs.outlineOffset}`,
      boxShadow: cs.boxShadow.slice(0, 120),
      barBoxShadow: bcs.boxShadow.slice(0, 160),
      focusVisible: el.matches(":focus-visible"),
    };
  }, sel);
  console.log(JSON.stringify(info, null, 1));
  await page.screenshot({ path: `${OUT}/focus-${sel.includes("input") ? "field" : "filters"}.png`, clip: { x: 199, y: 190, width: 512, height: 80 } });
}

// keyboard reach — Chromium, DOM-path keyed (MT-F022)
await page.locator("body").click({ position: { x: 5, y: 5 } });
const seen = [];
for (let i = 0; i < 26; i++) {
  await page.keyboard.press("Tab"); await page.waitForTimeout(60);
  const d = await page.evaluate(() => {
    const a = document.activeElement; if (!a || a === document.body) return null;
    const path = []; let n = a;
    while (n && n !== document.body) { path.unshift(n.tagName.toLowerCase() + (n.className ? "." + String(n.className).split(/\s+/)[0] : "")); n = n.parentElement; }
    const inPane = !!a.closest(".pane-scroll-fade");
    return { inPane, name: (a.getAttribute("aria-label") || a.textContent || a.getAttribute("placeholder") || "").trim().slice(0, 30), path: path.slice(-2).join(">"), ring: getComputedStyle(a).boxShadow !== "none" || getComputedStyle(a).outlineStyle !== "none" };
  });
  if (d) seen.push(d);
}
console.log("\n=== Chromium tab walk (26 presses) ===");
const pane = seen.filter(s => s.inPane);
console.log("stops inside the Browse pane:", pane.length);
for (const s of pane) console.log(` ${s.ring ? "RING" : "NORING"}  ${s.name.padEnd(30)} ${s.path}`);
await browser.close();
