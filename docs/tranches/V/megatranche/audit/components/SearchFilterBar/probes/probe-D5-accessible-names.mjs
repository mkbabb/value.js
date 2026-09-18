// CHALLENGE-D · SearchFilterBar — probe 5: settled focus register on the swatch + accessible names.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }, { name: "earth" }];

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
await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(900);

const out = {};
await page.evaluate(() => {
  const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  [...c.querySelectorAll("button")].find(b => (b.getAttribute("aria-label") || "").startsWith("Open color picker")).focus();
});
await page.waitForTimeout(1200);
out.swatchSettled = await page.evaluate(() => {
  const a = document.activeElement; const s = getComputedStyle(a);
  return {
    isSwatch: (a.getAttribute("aria-label") || "").startsWith("Open color picker"),
    focusVisible: a.matches(":focus-visible"),
    boxShadow: s.boxShadow,
    outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} off:${s.outlineOffset}`,
    focusRingShadowToken: s.getPropertyValue("--focus-ring-shadow").trim().slice(0, 200),
    focusRingColorToken: s.getPropertyValue("--focus-ring-color").trim(),
  };
});
await page.evaluate(() => {
  const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  c.querySelector('[role="checkbox"]').focus();
});
await page.waitForTimeout(1200);
out.checkboxSettled = await page.evaluate(() => {
  const a = document.activeElement; const s = getComputedStyle(a);
  return { focusVisible: a.matches(":focus-visible"), boxShadow: s.boxShadow.slice(0, 220), outline: `${s.outlineStyle} ${s.outlineWidth}` };
});

const cdp = await context.newCDPSession(page);
await cdp.send("Accessibility.enable");
const axr = await cdp.send("Accessibility.getFullAXTree");
out.axControls = axr.nodes
  .filter((n) => ["radio", "checkbox", "button", "textbox", "menuitemradio", "menuitemcheckbox"].includes(n.role?.value))
  .map((n) => ({ role: n.role.value, name: n.name?.value ?? null, checked: n.properties?.find((p) => p.name === "checked")?.value?.value ?? null }));

writeFileSync(`${OUT}/measure5.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
