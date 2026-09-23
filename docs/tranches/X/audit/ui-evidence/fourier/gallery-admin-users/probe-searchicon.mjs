// READ-ONLY probe: why the Search glyph in AdminUserList's search field does not paint. GETs only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.route("**/api/**", (r) => r.request().method() !== "GET" && /\/api\/admin\//.test(r.request().url()) ? r.abort() : r.fallback());
await page.goto("http://localhost:3100/gallery?admin=dev");
await page.getByRole("tab", { name: "Users" }).waitFor({ timeout: 30000 }); await page.waitForTimeout(1500);
await page.getByRole("tab", { name: "Users" }).click(); await page.locator("[role=listitem]").first().waitFor();
console.log(JSON.stringify(await page.evaluate(() => {
  const inp = document.querySelector("input[aria-label='Search users']");
  const wrap = inp.closest(".relative");
  const svg = wrap.querySelector("svg");
  const r = svg.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
  const chain = []; let e = inp; while (e && e !== wrap) { const cs = getComputedStyle(e); chain.push({ tag: e.tagName, cls: String(e.className).slice(0, 100), pos: cs.position, z: cs.zIndex, bg: cs.backgroundColor, pl: cs.paddingLeft }); e = e.parentElement; }
  return { svgBox: [r.x, r.y, r.width, r.height], svgCls: svg.getAttribute("class"), svgColor: getComputedStyle(svg).color, topAtIcon: top.tagName + " " + String(top.className).slice(0, 80), chain, wrapChildren: [...wrap.children].map((c) => c.tagName + "." + String(c.className?.baseVal ?? c.className).slice(0, 60)) };
})));
await browser.close();
