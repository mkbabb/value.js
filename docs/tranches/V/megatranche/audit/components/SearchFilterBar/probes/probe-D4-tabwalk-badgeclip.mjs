// CHALLENGE-D · SearchFilterBar — probe 4: badge clipping + the real keyboard-focus register.
import { webkit, chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }, { name: "earth" }, { name: "monochrome" }, { name: "retro" }, { name: "vaporwave" }, { name: "high-contrast-accessible-set" }];
const out = {};

for (const [engName, eng] of [["webkit", webkit], ["chromium", chromium]]) {
  const browser = await eng.launch();
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

  // 1) Keyboard walk: Tab from the document start, log every focus stop inside the filter surface.
  await page.locator('button[aria-label="Filters"]').focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(900);
  const stops = [];
  for (let i = 0; i < 26; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(80);
    const s = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return { name: "BODY" };
      const cs = getComputedStyle(a);
      return {
        name: (a.getAttribute("aria-label") || a.textContent?.trim().slice(0, 22) || a.tagName),
        tag: a.tagName, role: a.getAttribute("role"),
        fv: a.matches(":focus-visible"),
        outline: `${cs.outlineStyle}/${cs.outlineWidth}/${cs.outlineColor}`,
        shadow: cs.boxShadow.slice(0, 90),
        cls: (a.className || "").toString().slice(0, 60),
      };
    });
    stops.push(s);
    if (s.name === "BODY") break;
  }
  out[engName + "_tabStops"] = stops;

  // 2) Badge clipping: set tier, then compare the badge rect with every clipping ancestor.
  await page.keyboard.press("Escape").catch(()=>{});
  await page.waitForTimeout(400);
  await page.locator('button[aria-label="Filters"]').click({ force: true });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
    [...c.querySelectorAll(".filter-option")].find(o => o.textContent.trim() === "Featured").querySelector('[role="radio"]').click();
  });
  await page.waitForTimeout(700);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  out[engName + "_badgeClip"] = await page.evaluate(() => {
    const t = document.querySelector('button[aria-label="Filters"]');
    const b = t.querySelector("span");
    if (!b) return { present: false };
    const br = b.getBoundingClientRect();
    const clippers = [];
    let p = t.parentElement;
    while (p && p !== document.body) {
      const s = getComputedStyle(p);
      if (s.overflow !== "visible" || s.overflowX !== "visible" || s.overflowY !== "visible") {
        const r = p.getBoundingClientRect();
        clippers.push({
          cls: (p.className || "").toString().slice(0, 50), overflow: `${s.overflowX}/${s.overflowY}`,
          rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1) },
          clipsBadge: br.right > r.right + 0.5 || br.y < r.y - 0.5 || br.x < r.x - 0.5 || br.bottom > r.bottom + 0.5,
          overhangRight: +(br.right - r.right).toFixed(1), overhangTop: +(r.y - br.y).toFixed(1),
        });
      }
      p = p.parentElement;
    }
    return { present: true, badge: { x: +br.x.toFixed(1), y: +br.y.toFixed(1), right: +br.right.toFixed(1), bottom: +br.bottom.toFixed(1) }, clippers };
  });
  await page.screenshot({ path: `${OUT}/${engName}-badge-closed.png`, clip: { x: 880, y: 620, width: 120, height: 80 } });
  await browser.close();
}
writeFileSync(`${OUT}/measure4.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
