// CHALLENGE-D · SearchFilterBar — probe 8: the silent colour substitution.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
const ORIGIN = "http://localhost:9000";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
await context.route("**/platform/transport/availability.ts*", async (route) => {
  const res = await route.fetch();
  const body = (await res.text()).replace(/function assertApiAttemptAllowed\(\)\s*\{/, "function assertApiAttemptAllowed() { return;");
  await route.fulfill({ response: res, body, headers: { ...res.headers(), "content-type": "text/javascript" } });
});
const seen = [];
await context.route("https://api.color.babb.dev/**", async (route) => {
  const url = route.request().url();
  if (url.includes("/palettes")) seen.push(url);
  const cors = { "access-control-allow-origin": ORIGIN, "access-control-allow-credentials": "true", "access-control-allow-headers": "*", "access-control-allow-methods": "*", "content-type": "application/json" };
  if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
  return route.fulfill({ status: 200, headers: cors, body: JSON.stringify([]) });
});
const page = await context.newPage();
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(900);

const results = {};
for (const probe of ["hsl(200 50% 50%)", "rebeccapurple", "#ff0000"]) {
  seen.length = 0;
  await page.evaluate(() => {
    const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
    const i = c.querySelector("input");
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    setter.call(i, ""); i.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.evaluate(() => {
    const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
    c.querySelector("input").focus();
  });
  await page.keyboard.type(probe);
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
    [...c.querySelectorAll("button")].find(b => b.textContent.trim() === "Search").click();
  });
  await page.waitForTimeout(1400);
  results[probe] = await page.evaluate((urls) => {
    const t = document.querySelector('button[aria-label="Filters"]');
    const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
    const sw = c ? [...c.querySelectorAll("button")].find(b => (b.getAttribute("aria-label") || "").startsWith("Open color picker")) : null;
    return {
      badge: t?.querySelector("span")?.textContent?.trim() ?? null,
      inputValue: c?.querySelector("input")?.value ?? null,
      swatchLabel: sw?.getAttribute("aria-label") ?? null,
      swatchFill: sw ? getComputedStyle(sw).backgroundColor : null,
    };
  });
  results[probe].requests = [...seen];
}
writeFileSync(`${OUT}/measure8.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
await browser.close();
