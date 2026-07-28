// CHALLENGE-C r2 · SearchFilterBar — probe C1: Button `variant` is a dead attr; colorText autofill; nested popover.
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
  if (route.request().url().includes("/colors/tags")) return route.fulfill({ status: 200, headers: cors, body: JSON.stringify(TAGS) });
  return route.fulfill({ status: 200, headers: cors, body: JSON.stringify([]) });
});
const page = await context.newPage();
const out = {};
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") (out.console ||= []).push(m.type() + ": " + m.text().slice(0, 300)); });
page.on("pageerror", (e) => (out.pageerrors ||= []).push(String(e).slice(0, 300)));

await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

const trig = page.locator('button[aria-label="Filters"]');
// ---- A: the trigger Button itself, BEFORE opening
out.A_trigger = await trig.evaluate((b) => {
  const s = getComputedStyle(b);
  return {
    outerHTMLhead: b.outerHTML.slice(0, 300),
    attr_variant: b.getAttribute("variant"),
    data_emphasis: b.getAttribute("data-emphasis"),
    data_tone: b.getAttribute("data-tone"),
    classList: b.className,
    backgroundColor: s.backgroundColor,
    backdropFilter: s.backdropFilter,
    boxShadow: s.boxShadow.slice(0, 160),
  };
});

await trig.click();
await page.waitForTimeout(900);

// ---- B: colorText content immediately after the popover opens (nothing typed)
const contentSel = () => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  return wraps[wraps.length - 1];
};
out.B_openedFresh = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const inp = c.querySelector('input[aria-label="Search by CSS color"]');
  return { inputValue: inp?.value, placeholderShown: inp?.value === "", placeholder: inp?.getAttribute("placeholder") };
});

// ---- C: the Clear-all Button variant (needs an active filter) — select a tag via the radio Tier=featured
out.C_clearButton = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const radios = [...c.querySelectorAll('[role="radio"]')];
  return radios.map((r) => r.textContent.trim() || r.getAttribute("value"));
});

// ---- D: type into the field, close, reopen — does the typed text survive?
await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const inp = c.querySelector('input[aria-label="Search by CSS color"]');
  inp.focus();
});
await page.keyboard.type("rebeccapurple");
await page.waitForTimeout(300);
out.D_typed = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  return c.querySelector('input[aria-label="Search by CSS color"]').value;
});
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
await trig.click();
await page.waitForTimeout(900);
out.D_afterReopen = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  return c.querySelector('input[aria-label="Search by CSS color"]')?.value;
});

// ---- E: nested popover — open the mini picker, drag on the SV canvas, check outer popover survival + text field
const openMini = async () => {
  await page.evaluate(() => {
    const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
    const c = wraps[wraps.length - 1];
    [...c.querySelectorAll("button")].find((b) => (b.getAttribute("aria-label") || "").startsWith("Open color picker")).click();
  });
};
await openMini();
await page.waitForTimeout(800);
out.E_afterMiniOpen = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  return {
    popperWrappers: wraps.length,
    outerStillOpen: !!document.querySelector('input[aria-label="Search by CSS color"]'),
    colorText: document.querySelector('input[aria-label="Search by CSS color"]')?.value,
    svCanvasPresent: !!document.querySelector(".sv-canvas"),
  };
});

const sv = page.locator(".sv-canvas");
if (await sv.count()) {
  const box = await sv.first().boundingBox();
  await page.mouse.move(box.x + 10, box.y + 10);
  await page.mouse.down();
  const path = [];
  for (let i = 0; i < 12; i++) {
    await page.mouse.move(box.x + 10 + i * 8, box.y + 10 + i * 4);
    path.push(await page.evaluate(() => document.querySelector('input[aria-label="Search by CSS color"]')?.value ?? null));
  }
  await page.mouse.up();
  await page.waitForTimeout(300);
  out.E_dragTextValues = path;
  out.E_afterDrag = await page.evaluate(() => ({
    colorText: document.querySelector('input[aria-label="Search by CSS color"]')?.value,
    outerStillOpen: !!document.querySelector('input[aria-label="Search by CSS color"]'),
  }));
}

writeFileSync(`${OUT}/probeC1.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
