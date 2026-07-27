// CHALLENGE-D · SearchFilterBar — probe 6: SETTLED keyboard :focus-visible on every popover control.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
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
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Filters"]').focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(900);

const stops = [];
for (let i = 0; i < 12; i++) {
  await page.keyboard.press("Tab");
  await page.waitForTimeout(900); // settle past the 200ms/350ms transitions
  const s = await page.evaluate(() => {
    const a = document.activeElement; if (!a || a === document.body) return { name: "BODY" };
    const cs = getComputedStyle(a);
    return { name: a.getAttribute("aria-label") || a.textContent?.trim().slice(0, 20) || a.tagName, role: a.getAttribute("role"),
      fv: a.matches(":focus-visible"), outline: `${cs.outlineStyle}/${cs.outlineWidth}/${cs.outlineColor}`,
      boxShadow: cs.boxShadow.slice(0, 180), cls: (a.className || "").toString().slice(0, 50) };
  });
  stops.push(s);
  if (s.name === "BODY") break;
}
writeFileSync(`${OUT}/measure6.json`, JSON.stringify(stops, null, 1));
console.log(JSON.stringify(stops, null, 1));
await browser.close();
