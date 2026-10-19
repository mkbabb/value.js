// SERVED MODEL: claude-opus-5-5 — X.W12.u3: admin tags on glass's removable Chip, one line, visible remove seat (UIA-V-180 (179 = glass: the Chip stylesheet is not in 7.0.0 styles)); the create row at 390 (UIA-V-182). /admin/tags fulfilled from a fixture.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TAGS = [["moody", "mood"], ["an-extremely-long-tag-name-that-keeps-going-on", "mood"], ["warm", "temperature"], ["cool", "temperature"]].map(([name, category], i) => ({ id: `t${i}`, name, category }));
const out = {};
const b = await chromium.launch({ headless: true });
for (const [w, h, touch, scheme] of [[390, 844, true, "light"], [390, 844, true, "dark"], [1440, 900, false, "dark"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch, colorScheme: scheme });
  await ctx.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "dev"); } catch {} });
  const p = await ctx.newPage(); p.setDefaultTimeout(60000);
  await p.route(/\/admin\/tags(\?|$)/, (r) => r.request().method() === "GET" ? r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) }) : r.continue());
  await p.goto("http://localhost:9000/#/admin/tags", { waitUntil: "domcontentloaded", timeout: 180000 });
  await p.getByRole("button", { name: "Delete tag moody", exact: true }).waitFor({ timeout: 90000 }); await p.waitForTimeout(800);
  await p.mouse.move(0, 0);
  const r = await p.evaluate(() => {
    const B = (e) => { const q = e.getBoundingClientRect(); return [Math.round(q.x), Math.round(q.y), Math.round(q.width), Math.round(q.height)]; };
    const chips = [...document.querySelectorAll('main button[aria-label^="Delete tag "]')].map((x) => x.parentElement).map((c) => ({ box: B(c), radius: getComputedStyle(c).borderTopLeftRadius, text: c.innerText.trim().slice(0, 24), sw: c.querySelector(".truncate")?.scrollWidth, cw: c.querySelector(".truncate")?.clientWidth }));
    const seat = [...document.querySelectorAll("main button")].find((x) => x.getAttribute("aria-label") === "Delete tag moody");
    const name = document.querySelector('[aria-label="New tag name"]'), cat = document.querySelector('[aria-label="New tag category"]'), add = document.querySelector('[aria-label="Create tag"]');
    const card = document.querySelector(".pane-scroll-fade");
    return { chips, seatOpacity: seat && getComputedStyle(seat).opacity, seatBox: seat && B(seat), name: B(name), cat: B(cat), add: B(add), card: card && B(card), docSW: document.documentElement.scrollWidth };
  });
  out[`${w}-${scheme}`] = r;
  await p.screenshot({ path: `${OUT}u3-tags-${w}-${scheme}${process.env.RUN ?? ""}.png` });
  await ctx.close();
}
await b.close();
writeFileSync(`${OUT}probe-u3-tags${process.env.RUN ?? ""}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
