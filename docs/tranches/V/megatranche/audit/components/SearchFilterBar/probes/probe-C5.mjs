// CHALLENGE-C r2 · probe C5: effective tap target of the tag rows (label vs button); label double-fire check.
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
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2200);
await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(900);

const out = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const labels = [...c.querySelectorAll("label.filter-option")];
  const rows = labels.map((l) => {
    const r = l.getBoundingClientRect();
    const cb = l.querySelector('[role="checkbox"],[role="radio"]');
    const cr = cb?.getBoundingClientRect();
    return {
      text: l.textContent.trim().slice(0, 12),
      kind: cb?.getAttribute("role"),
      labelRect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), top: +r.top.toFixed(1) },
      controlRect: cr ? { w: +cr.width.toFixed(1), h: +cr.height.toFixed(1) } : null,
      labelIsForwarding: l.control ? l.control.tagName + "/" + (l.control.getAttribute("role") || "") : null,
    };
  });
  // vertical pitch between consecutive tag rows
  const tagRows = rows.filter((r) => r.kind === "checkbox");
  const pitch = tagRows.length > 1 ? +(tagRows[1].labelRect.top - tagRows[0].labelRect.top).toFixed(1) : null;
  return { rows, tagRowPitch: pitch };
});

// label double-fire probe: instrument the checkbox and click the *text* of the row
out.doubleFire = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  const label = [...c.querySelectorAll("label.filter-option")].find((l) => l.textContent.trim() === "pastel");
  const cb = label.querySelector('[role="checkbox"]');
  let clicks = 0, stateChanges = [];
  cb.addEventListener("click", () => clicks++);
  const mo = new MutationObserver((ms) => ms.forEach((m) => { if (m.attributeName === "data-state") stateChanges.push(cb.getAttribute("data-state")); }));
  mo.observe(cb, { attributes: true });
  label.querySelector("span").click();   // click the TEXT, not the control
  return new Promise((res) => setTimeout(() => { mo.disconnect(); res({ clicksOnControl: clicks, stateChanges, finalState: cb.getAttribute("data-state") }); }, 250));
});

writeFileSync(`${OUT}/probeC5.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
