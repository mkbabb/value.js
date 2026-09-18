// CHALLENGE-C r2 · probe C3: clear-all closes the popover; miniPickerOpen state leak; double-click reentrancy.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const SHOTS = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence";
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
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

const openFilters = async () => { await page.locator('button[aria-label="Filters"]').click(); await page.waitForTimeout(800); };
const popCount = () => page.evaluate(() => document.querySelectorAll("[data-reka-popper-content-wrapper]").length);
const hasFilterPanel = () => page.evaluate(() => !!document.querySelector('input[aria-label="Search by CSS color"]'));

// ============ 1. Clear-all closes the whole popover (real user click, not .click() on node)
await openFilters();
await page.getByRole("radio", { name: "Featured" }).click();
await page.waitForTimeout(500);
out.T1_badgeAfterFeatured = await page.locator('button[aria-label="Filters"]').innerText();
out.T1_popoverOpenBefore = await hasFilterPanel();
await page.screenshot({ path: `${SHOTS}/C-r2-1-before-clearall.png` });
const clearBtn = page.getByRole("button", { name: /Clear all filters/i });
out.T1_clearBoxBefore = await clearBtn.boundingBox();
await clearBtn.click();
await page.waitForTimeout(900);
out.T1_after = {
  popoverStillOpen: await hasFilterPanel(),
  popperWrappers: await popCount(),
  activeElement: await page.evaluate(() => document.activeElement.tagName + "/" + (document.activeElement.getAttribute("aria-label") || document.activeElement.className.slice(0, 40))),
  triggerExpanded: await page.locator('button[aria-label="Filters"]').getAttribute("aria-expanded"),
};
await page.screenshot({ path: `${SHOTS}/C-r2-2-after-clearall.png` });

// ============ 2. miniPickerOpen state leak across outer-popover close/reopen
await openFilters();
await page.getByRole("button", { name: /Open color picker/ }).click();
await page.waitForTimeout(700);
out.T2_miniOpen = { wrappers: await popCount(), svCanvas: await page.locator(".sv-canvas").count() };
// close the OUTER popover by clicking far outside
await page.mouse.click(20, 700);
await page.waitForTimeout(800);
out.T2_afterOutsideClick = { wrappers: await popCount(), svCanvas: await page.locator(".sv-canvas").count(), filterPanel: await hasFilterPanel() };
// reopen the outer popover — does the mini picker pop open by itself?
await openFilters();
out.T2_afterReopen = {
  wrappers: await popCount(),
  svCanvas: await page.locator(".sv-canvas").count(),
  miniAutoOpened: (await page.locator(".sv-canvas").count()) > 0,
};
if (out.T2_afterReopen.miniAutoOpened) await page.screenshot({ path: `${SHOTS}/C-r2-3-minipicker-autoopen-leak.png` });

// ============ 3. reentrancy: 5 rapid Search clicks; spinner never observable
const searchBtn = page.getByRole("button", { name: "Search", exact: true }).last();
let spinnerSeen = false;
const t0 = Date.now();
for (let i = 0; i < 5; i++) {
  await searchBtn.click({ force: true });
  const s = await page.evaluate(() => !!document.querySelector(".animate-spin"));
  if (s) spinnerSeen = true;
}
out.T3 = { fiveClicksMs: Date.now() - t0, spinnerEverSeen: spinnerSeen, badge: await page.locator('button[aria-label="Filters"]').innerText() };

// ============ 4. tap targets inside the popover (WCAG 2.5.8 = 24x24)
out.T4_tapTargets = await page.evaluate(() => {
  const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
  const c = wraps[wraps.length - 1];
  if (!c) return null;
  return [...c.querySelectorAll('button,[role="checkbox"],[role="radio"],input')].map((e) => {
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, role: e.getAttribute("role"), label: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 28), w: +r.width.toFixed(1), h: +r.height.toFixed(1), under24: r.width < 24 || r.height < 24 };
  });
});

writeFileSync(`${OUT}/probeC3.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
