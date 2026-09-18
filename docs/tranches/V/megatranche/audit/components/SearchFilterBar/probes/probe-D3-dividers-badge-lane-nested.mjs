// CHALLENGE-D · SearchFilterBar — probe 3: dividers, RadioGroup gap, badge, keyboard focus,
// the color input's usable lane, and the nested MiniColorPicker.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
const ORIGIN = "http://localhost:9000";
const TAGS = [{ name: "pastel" }, { name: "neon" }, { name: "earth" }, { name: "monochrome" }, { name: "retro" }, { name: "vaporwave" }, { name: "high-contrast-accessible-set" }];

const browser = await webkit.launch();
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
const out = {};
const safe = async (k, fn) => { try { out[k] = await fn(); } catch (e) { out[k] = { ERROR: String(e).slice(0,180) }; } };
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(900);

out.dividers = await page.evaluate(() => {
  const content = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  const host = content.querySelector(".divide-y");
  return {
    hostClass: host.className,
    children: [...host.children].map(c => { const s = getComputedStyle(c); return { cls: c.className.slice(0, 40), bt: s.borderTopWidth + "/" + s.borderTopColor, bb: s.borderBottomWidth + "/" + s.borderBottomColor }; }),
    rgGap: (() => { const rg = content.querySelector('[role="radiogroup"]'); const s = rg ? getComputedStyle(rg) : null; return s ? { display: s.display, gap: s.gap, rowGap: s.rowGap, flexDirection: s.flexDirection } : null; })(),
    rgItemBox: (() => { const b = content.querySelector('[role="radio"]'); const s = getComputedStyle(b); return { w: s.width, h: s.height, minW: s.minWidth, minH: s.minHeight, padding: s.padding, cls: b.className.slice(0, 80) }; })(),
    optionH: (() => { const o = content.querySelector(".filter-option"); const s = getComputedStyle(o); return { h: s.height, padding: s.padding, gap: s.gap, alignItems: s.alignItems }; })(),
  };
});

// Turn ON the tier filter (a real prop path) so the badge renders.
await page.evaluate(() => {
  const content = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  const feats = [...content.querySelectorAll(".filter-option")].find(o => o.textContent.trim() === "Featured");
  feats.querySelector('[role="radio"]').click();
});
await page.waitForTimeout(900);
out.badge = await page.evaluate(() => {
  const t = document.querySelector('button[aria-label="Filters"]');
  const b = t.querySelector("span");
  if (!b) return { present: false, triggerName: t.getAttribute("aria-label") };
  const s = getComputedStyle(b); const r = b.getBoundingClientRect(); const tr = t.getBoundingClientRect();
  return { present: true, text: b.textContent.trim(), rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
    trigRect: { x: +tr.x.toFixed(1), y: +tr.y.toFixed(1), w: +tr.width.toFixed(1), h: +tr.height.toFixed(1) },
    overflowsTop: r.y < tr.y, overflowsRight: r.right > tr.right,
    style: { fs: s.fontSize, fw: s.fontWeight, ff: s.fontFamily.slice(0, 30), bg: s.backgroundColor, color: s.color, w: s.width, h: s.height },
    triggerName: t.getAttribute("aria-label"), ariaExpanded: t.getAttribute("aria-expanded"),
    hasAriaHidden: b.hasAttribute("aria-hidden"),
  };
});
await page.screenshot({ path: `${OUT}/badge-tier.png`, clip: { x: 850, y: 600, width: 200, height: 120 } });

// Type a long CSS colour and measure the usable lane.
await page.evaluate(() => {
  const content = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  const i = content.querySelector("input");
  i.focus();
});
await page.keyboard.type("oklch(0.72 0.19 45.3 / 0.85)");
await page.waitForTimeout(500);
out.longValue = await page.evaluate(() => {
  const content = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  const i = content.querySelector("input"); const s = getComputedStyle(i);
  return { value: i.value, scrollW: i.scrollWidth, clientW: i.clientWidth, laneW: i.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight), overflowing: i.scrollWidth > i.clientWidth, textOverflow: s.textOverflow, whiteSpace: s.whiteSpace };
});
await page.screenshot({ path: `${OUT}/color-row-long.png`, clip: { x: 700, y: 1230, width: 250, height: 70 } });

// Open the nested MiniColorPicker.
await page.evaluate(() => {
  const content = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  [...content.querySelectorAll("button")].find(b => (b.getAttribute("aria-label") || "").startsWith("Open color picker")).click();
});
await page.waitForTimeout(900);
out.nested = await page.evaluate(() => {
  const wrappers = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean);
  return wrappers.map(w => { const r = w.getBoundingClientRect(); const s = getComputedStyle(w); return { cls: w.className.slice(0, 60), rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }, z: s.zIndex, bg: s.backgroundColor }; });
});
out.nestedA11y = await page.evaluate(() => {
  const els = [...document.querySelectorAll(".sv-canvas, [style*='linear-gradient(to right, #f00']")];
  return els.map(e => ({ tag: e.tagName, role: e.getAttribute("role"), tabindex: e.getAttribute("tabindex"), label: e.getAttribute("aria-label"), cls: e.className.slice(0, 50) }));
});
await page.screenshot({ path: `${OUT}/nested-picker.png` });

// Keyboard: Tab to the swatch trigger and read the real :focus-visible register.
out.kbdFocus = await page.evaluate(() => {
  const content = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  const sw = [...content.querySelectorAll("button")].find(b => (b.getAttribute("aria-label") || "").startsWith("Open color picker"));
  return { present: !!sw, tabIndex: sw?.tabIndex, cls: sw?.className };
});
for (let i = 0; i < 40; i++) {
  const hit = await page.evaluate(() => { const a = document.activeElement; return (a?.getAttribute?.("aria-label") || "").startsWith("Open color picker"); });
  if (hit) break;
  await page.keyboard.press("Tab");
  await page.waitForTimeout(60);
}
out.kbdFocusStyle = await page.evaluate(() => {
  const a = document.activeElement;
  if (!(a?.getAttribute?.("aria-label") || "").startsWith("Open color picker")) return { reached: false, active: a?.tagName + ":" + (a?.getAttribute?.("aria-label") || a?.textContent?.trim().slice(0, 20)) };
  const s = getComputedStyle(a);
  return { reached: true, focusVisible: a.matches(":focus-visible"), outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} off:${s.outlineOffset}`, boxShadow: s.boxShadow.slice(0, 240) };
});


writeFileSync(`${OUT}/measure3.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
