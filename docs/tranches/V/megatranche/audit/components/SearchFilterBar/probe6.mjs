// CHALLENGE-D probe 6 — keyboard reach + focus indication + unselected-state contrast.
// CHROMIUM, per the standing MT-F022 rule in `visual/states.mjs`: macOS ships Full
// Keyboard Access OFF, so a WebKit-only focus gap is not evidence. Read-only.
//
//   PROBE_ORIGIN=http://localhost:9100 node .../probe6.mjs
//
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9100";

const TAGS = ["pastel", "neon", "earthy", "monochrome", "retro", "vaporwave", "muted", "high-contrast"]
  .map((name, i) => ({ name, count: 12 - i }));
const PALETTES = Array.from({ length: 6 }, (_, i) => ({
  slug: `p-${i}`, name: `Probe Palette ${i}`, colors: ["#4488cc", "#cc4488"],
  oklabColors: [{ L: 0.6, a: -0.02, b: -0.12 }], userSlug: "x", visibility: "public",
  tier: null, tags: [TAGS[i % TAGS.length].name], votes: 1, forkCount: 0, createdAt: new Date().toISOString(),
}));

const browser = await chromium.launch();
const out = {};
for (const scheme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  await context.route("**/api/colors/tags", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) }));
  await context.route(/\/api\/colors(\?|$)/, (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ palettes: PALETTES, nextCursor: null }) }));
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.click('button[aria-label="Filters"]');
  await page.waitForTimeout(800);

  const tabs = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(70);
    tabs.push(await page.evaluate(() => {
      const ae = document.activeElement; if (!ae) return null;
      const path = (el) => { const p = []; while (el && el.tagName && p.length < 5) { p.unshift(el.tagName.toLowerCase() + (el.getAttribute?.("role") ? `[${el.getAttribute("role")}]` : "") + (el.className ? "." + String(el.className).split(/\s+/)[0] : "")); el = el.parentElement; } return p.join(" > "); };
      const cs = getComputedStyle(ae);
      return {
        path: path(ae),
        name: (ae.getAttribute?.("aria-label") || ae.closest?.("label")?.textContent || ae.textContent || "").trim().slice(0, 24),
        inPopover: !!ae.closest?.('[role="dialog"][data-state="open"]'),
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        boxShadow: cs.boxShadow === "none" ? "none" : cs.boxShadow.slice(0, 60),
        hasVisibleRing: (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none",
      };
    }));
  }
  out[scheme] = { tabs };

  // unselected radio / checkbox rendered edge contrast against the veil it sits on
  out[scheme].unselected = await page.evaluate(() => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const Lum = (r) => 0.2126 * lin(r[0]) + 0.7152 * lin(r[1]) + 0.0722 * lin(r[2]);
    const px = (s) => { const m = s.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
    const ratio = (a, b) => { const la = Lum(a), lb = Lum(b); const hi = Math.max(la, lb), lo = Math.min(la, lb); return +((hi + 0.05) / (lo + 0.05)).toFixed(2); };
    const radios = [...root.querySelectorAll('[role="radio"]')];
    const unchecked = radios.find((r) => r.getAttribute("aria-checked") === "false");
    const checked = radios.find((r) => r.getAttribute("aria-checked") === "true");
    const box = root.querySelector('[role="checkbox"]');
    const grab = (el) => { if (!el) return null; const c = getComputedStyle(el); return { border: `${c.borderTopWidth} ${c.borderTopColor}`, bg: c.backgroundColor, size: `${el.getBoundingClientRect().width.toFixed(1)}x${el.getBoundingClientRect().height.toFixed(1)}` }; };
    // approximate the composited surface behind the control by the popover's own paint
    const veil = getComputedStyle(root).backgroundColor;
    const vrgb = px(veil);
    const edge = (el) => { const c = getComputedStyle(el); const e = px(c.borderTopColor); return e && vrgb ? ratio(e, vrgb) : null; };
    return {
      veil,
      uncheckedRadio: grab(unchecked), uncheckedRadioEdgeRatio: unchecked ? edge(unchecked) : null,
      checkedRadio: grab(checked),
      uncheckedCheckbox: grab(box), uncheckedCheckboxEdgeRatio: box ? edge(box) : null,
      note: "edge ratio uses the popover's own declared paint as the surround; the veil is translucent so the true composited ratio varies with what is behind it",
    };
  });
  await page.screenshot({ path: resolve(SHOTS, `probe6-${scheme}-tabbed.png`), fullPage: false });
  await context.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
