// CHALLENGE-C r2 · probe C4: popover overflow reproduction + the rest of C3 (routed around the blocked click).
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const SHOTS = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence";
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }, { name: "earth" }];
const VIEWPORTS = [
  { name: "desktop-1440x1000", width: 1440, height: 1000 },
  { name: "laptop-1440x800", width: 1440, height: 800 },
  { name: "mobile-390x664", width: 390, height: 664 },
];

const browser = await chromium.launch();
const out = { viewports: {} };

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
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
  // activate a filter so the Clear row mounts
  const feat = page.getByRole("radio", { name: "Featured" });
  if (await feat.count()) { await feat.first().click({ force: true }); await page.waitForTimeout(700); }

  const m = await page.evaluate(() => {
    const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
    const c = wraps[wraps.length - 1];
    if (!c) return { open: false };
    const s = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    const clear = [...c.querySelectorAll("button")].find((b) => /Clear all/i.test(b.textContent));
    const cr = clear?.getBoundingClientRect();
    // does any ancestor scroll?
    let anyScroll = null, n = c;
    while (n && n !== document.documentElement) {
      const os = getComputedStyle(n);
      if (n.scrollHeight > n.clientHeight + 1 && /auto|scroll/.test(os.overflowY)) { anyScroll = n.className.slice(0, 60); break; }
      n = n.parentElement;
    }
    return {
      open: true,
      viewport: { w: innerWidth, h: innerHeight },
      contentRect: { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), h: +r.height.toFixed(1) },
      maxHeight: s.maxHeight,
      overflowY: s.overflowY,
      scrollHeight: c.scrollHeight, clientHeight: c.clientHeight,
      availableHeightVar: s.getPropertyValue("--reka-popper-available-height").trim() || null,
      bottomOverflowPx: +(r.bottom - innerHeight).toFixed(1),
      clearRect: cr ? { top: +cr.top.toFixed(1), bottom: +cr.bottom.toFixed(1), h: +cr.height.toFixed(1) } : null,
      clearOffscreenPx: cr ? +(cr.bottom - innerHeight).toFixed(1) : null,
      clearFullyOffscreen: cr ? cr.top >= innerHeight : null,
      scrollableAncestor: anyScroll,
      badge: document.querySelector('button[aria-label="Filters"]').textContent.trim(),
    };
  });
  out.viewports[vp.name] = m;
  await page.screenshot({ path: `${SHOTS}/C-r2-overflow-${vp.name}.png` });

  // extra: on the desktop run, do the miniPickerOpen leak + reentrancy tests
  if (vp.name === "desktop-1440x1000") {
    await page.getByRole("button", { name: /Open color picker/ }).first().click({ force: true });
    await page.waitForTimeout(700);
    out.T2_miniOpen = { wrappers: await page.evaluate(() => document.querySelectorAll("[data-reka-popper-content-wrapper]").length), sv: await page.locator(".sv-canvas").count() };
    await page.mouse.click(20, vp.height - 80);
    await page.waitForTimeout(800);
    out.T2_afterOutside = { wrappers: await page.evaluate(() => document.querySelectorAll("[data-reka-popper-content-wrapper]").length), sv: await page.locator(".sv-canvas").count(), panel: await page.evaluate(() => !!document.querySelector('input[aria-label="Search by CSS color"]')) };
    await page.locator('button[aria-label="Filters"]').click();
    await page.waitForTimeout(900);
    out.T2_afterReopen = { wrappers: await page.evaluate(() => document.querySelectorAll("[data-reka-popper-content-wrapper]").length), sv: await page.locator(".sv-canvas").count(), miniAutoOpened: (await page.locator(".sv-canvas").count()) > 0 };
    if (out.T2_afterReopen.miniAutoOpened) await page.screenshot({ path: `${SHOTS}/C-r2-minipicker-autoopen-leak.png` });

    // reentrancy / spinner
    let spinnerSeen = false;
    const t0 = Date.now();
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => {
        const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
        const c = wraps.find((w) => w.querySelector('input[aria-label="Search by CSS color"]'));
        [...c.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search")?.click();
      });
      if (await page.evaluate(() => !!document.querySelector(".animate-spin"))) spinnerSeen = true;
    }
    out.T3_reentrancy = { fiveClicksMs: Date.now() - t0, spinnerEverSeen: spinnerSeen };

    out.T4_tapTargets = await page.evaluate(() => {
      const wraps = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => w.firstElementChild).filter(Boolean);
      const c = wraps.find((w) => w.querySelector('input[aria-label="Search by CSS color"]'));
      if (!c) return null;
      return [...c.querySelectorAll('button,[role="checkbox"],[role="radio"],input')].map((e) => {
        const r = e.getBoundingClientRect();
        return { role: e.getAttribute("role") || e.tagName, label: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 26), w: +r.width.toFixed(1), h: +r.height.toFixed(1), under24: r.width < 24 || r.height < 24 };
      });
    });
  }
  await context.close();
}

writeFileSync(`${OUT}/probeC4.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
