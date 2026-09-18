// CHALLENGE-C r2 · probe C2: input padding vs Search button; live checkbox truth; garbage-search success report.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }, { name: "earth" }];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.route("**/platform/transport/availability.ts*", async (route) => {
  const res = await route.fetch();
  const body = (await res.text()).replace(/function assertApiAttemptAllowed\(\)\s*\{/, "function assertApiAttemptAllowed() { return;");
  await route.fulfill({ response: res, body, headers: { ...res.headers(), "content-type": "text/javascript" } });
});
await context.route("https://api.color.babb.dev/**", async (route) => {
  const cors = { "access-control-allow-origin": ORIGIN, "access-control-allow-credentials": "true", "access-control-allow-headers": "*", "access-control-allow-methods": "*", "content-type": "application/json" };
  if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
  const u = route.request().url();
  if (u.includes("/colors/tags")) return route.fulfill({ status: 200, headers: cors, body: JSON.stringify(TAGS) });
  return route.fulfill({ status: 200, headers: cors, body: JSON.stringify([]) });
});
const page = await context.newPage();
const out = {};
const netLog = [];
page.on("request", (r) => { if (r.url().includes("api.color.babb.dev")) netLog.push(r.method() + " " + r.url()); });

await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(900);

const C = () => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  return wraps[wraps.length - 1];
};

// --- 1. Input geometry: does pr-16 survive field-control?
out.inputGeometry = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const inp = c.querySelector('input[aria-label="Search by CSS color"]');
  const s = getComputedStyle(inp);
  const btn = [...c.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
  const ir = inp.getBoundingClientRect(), br = btn.getBoundingClientRect();
  return {
    inputClass: inp.className,
    paddingRight: s.paddingRight,
    paddingLeft: s.paddingLeft,
    fontFamily: s.fontFamily.slice(0, 60),
    textOverflow: s.textOverflow,
    inputRect: { x: +ir.x.toFixed(1), w: +ir.width.toFixed(1), h: +ir.height.toFixed(1) },
    searchBtnRect: { x: +br.x.toFixed(1), w: +br.width.toFixed(1), h: +br.height.toFixed(1) },
    // does the text lane end before the button starts?
    textLaneRightEdge: +(ir.right - parseFloat(s.paddingRight)).toFixed(1),
    buttonLeftEdge: +br.x.toFixed(1),
    overlapPx: +(ir.right - parseFloat(s.paddingRight) - br.x).toFixed(1),
    btnDisabledAttr: btn.getAttribute("disabled"),
    btnClass: btn.className.slice(0, 120),
  };
});

// --- 2. Checkbox truth: click tag "neon" -> aria-checked, badge count, grid count
const gridCount = () => document.querySelectorAll('[data-slot="palette-card"], .palette-card').length;
out.checkbox = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const cbs = [...c.querySelectorAll('[role="checkbox"]')];
  const trig = document.querySelector('button[aria-label="Filters"]');
  const before = { n: cbs.length, states: cbs.map((b) => b.getAttribute("data-state")), badge: trig.textContent.trim(), checkedAttr: cbs.map((b) => b.getAttribute("checked")) };
  cbs[1].click();
  return { before, afterSync: cbs.map((b) => b.getAttribute("data-state")) };
});
await page.waitForTimeout(500);
out.checkboxAfter = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const cbs = [...c.querySelectorAll('[role="checkbox"]')];
  const trig = document.querySelector('button[aria-label="Filters"]');
  return { states: cbs.map((b) => b.getAttribute("data-state")), aria: cbs.map((b) => b.getAttribute("aria-checked")), badgeText: trig.textContent.trim() };
});
out.netAfterTagClick = netLog.slice(-4);

// --- 3. Garbage search reports success
await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const inp = c.querySelector('input[aria-label="Search by CSS color"]');
  inp.focus();
});
await page.keyboard.type("totally-not-a-color");
await page.waitForTimeout(200);
await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  [...c.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search").click();
});
await page.waitForTimeout(700);
out.garbageSearch = await page.evaluate(() => {
  const trig = document.querySelector('button[aria-label="Filters"]');
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const inp = c?.querySelector('input[aria-label="Search by CSS color"]');
  const swatch = c ? [...c.querySelectorAll("button")].find((b) => (b.getAttribute("aria-label") || "").startsWith("Open color picker")) : null;
  return {
    badgeText: trig.textContent.trim(),
    fieldStillReads: inp?.value,
    swatchLabel: swatch?.getAttribute("aria-label"),
    errorTextPresent: c ? /not a|invalid|couldn|error/i.test(c.textContent) : null,
    clearAllPresent: c ? !!([...c.querySelectorAll("button")].find((b) => /Clear all/i.test(b.textContent))) : null,
  };
});

// --- 4. Clear-all button: emphasis + focus destruction
out.clearAll = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const btn = [...c.querySelectorAll("button")].find((b) => /Clear all/i.test(b.textContent));
  if (!btn) return null;
  const s = getComputedStyle(btn);
  btn.focus();
  const before = { active: document.activeElement.textContent.trim().slice(0, 30), variantAttr: btn.getAttribute("variant"), dataEmphasis: btn.getAttribute("data-emphasis"), bg: s.backgroundColor, cls: btn.className.slice(0, 140) };
  btn.click();
  return before;
});
await page.waitForTimeout(600);
out.clearAllAfter = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  return {
    activeTag: document.activeElement.tagName,
    activeText: (document.activeElement.textContent || "").trim().slice(0, 40),
    clearStillPresent: c ? !!([...c.querySelectorAll("button")].find((b) => /Clear all/i.test(b.textContent))) : null,
    badgeText: document.querySelector('button[aria-label="Filters"]').textContent.trim(),
    fieldValue: c?.querySelector('input[aria-label="Search by CSS color"]')?.value,
  };
});

writeFileSync(`${OUT}/probeC2.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
