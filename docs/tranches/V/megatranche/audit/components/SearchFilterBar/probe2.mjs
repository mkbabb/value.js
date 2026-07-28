// CHALLENGE-D probe 2 — SearchFilterBar.vue TALLEST-STATE / STATE-COVERAGE probe.
// Read-only against the live dev server. Stubs only NETWORK RESPONSES (no source edits)
// so the Tags section + the activeFilterCount badge + the Clear-all row actually render.
//
//   node docs/tranches/V/megatranche/audit/components/SearchFilterBar/probe2.mjs
//
import { webkit, devices } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";

const TAGS = ["pastel", "neon", "earthy", "monochrome", "retro", "vaporwave", "muted", "high-contrast"]
  .map((name, i) => ({ name, count: 12 - i }));

const PALETTES = Array.from({ length: 6 }, (_, i) => ({
  slug: `probe-palette-${i}`,
  name: `Probe Palette ${i}`,
  colors: ["#4488cc", "#cc4488", "#88cc44", "#cccc44"],
  oklabColors: [{ L: 0.6, a: -0.02, b: -0.12 }],
  userSlug: "someone-else",
  visibility: "public",
  tier: i % 2 ? "featured" : null,
  tags: [TAGS[i % TAGS.length].name],
  votes: 3,
  forkCount: 1,
  createdAt: new Date().toISOString(),
}));

const R = (b) => ({ x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) });

async function stub(context) {
  await context.route("**/api/colors/tags", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) }));
  await context.route(/\/colors(\?|$)/, (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ palettes: PALETTES, nextCursor: null }) }));
  await context.route(/api\.color\.babb\.dev\/.*/, (r) => {
    const u = r.request().url();
    if (u.includes("/colors/tags")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) });
    if (u.includes("/colors")) return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ palettes: PALETTES, nextCursor: null }) });
    return r.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
}

const MATRIX = [
  { id: "tall-desktop-light", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
  { id: "tall-desktop-dark", ctx: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
  { id: "tall-mobile", ctx: { ...devices["iPhone 14"] } },
  { id: "tall-zoom200", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } },
  { id: "tall-forced-colors", ctx: { viewport: { width: 1440, height: 900 }, forcedColors: "active" } },
  { id: "tall-reduced-motion", ctx: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" } },
];

const browser = await webkit.launch();
const out = {};
for (const m of MATRIX) {
  const context = await browser.newContext(m.ctx);
  await stub(context);
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2600);

  await page.click('button[aria-label="Filters"]');
  await page.waitForTimeout(700);

  // put the bar in its LOUDEST legal state: featured tier + 3 tags + a color search
  await page.evaluate(() => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    const lbl = [...root.querySelectorAll("label")].find((l) => l.textContent.trim() === "Featured");
    lbl?.click();
  });
  await page.waitForTimeout(250);
  await page.evaluate(() => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    const boxes = [...root.querySelectorAll('[role="checkbox"]')];
    boxes.slice(0, 3).forEach((b) => b.click());
  });
  await page.waitForTimeout(350);
  await page.evaluate(() => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    const btn = [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
    btn?.click();
  });
  await page.waitForTimeout(500);

  await page.screenshot({ path: resolve(SHOTS, `${m.id}-open.png`), fullPage: false });

  const measured = await page.evaluate(() => {
    const RR = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    if (!root) return { missing: true };
    const cs = getComputedStyle(root);
    const divide = root.querySelector(".divide-y");
    const sections = [...root.querySelectorAll(".filter-section")].map((s) => ({
      label: s.querySelector(".section-label")?.textContent?.trim(), rect: RR(s),
    }));
    const clearRow = [...root.querySelectorAll("button")].find((b) => /Clear all filters/.test(b.textContent || ""));
    const tagList = root.querySelector(".scrollbar-thin");
    const colorInput = root.querySelector('input[aria-label="Search by CSS color"]');
    const badge = document.querySelector('button[aria-label="Filters"] span');
    const trig = document.querySelector('button[aria-label="Filters"]');
    // does the popover content clip or scroll at all?
    const chain = [];
    let n = root;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n);
      chain.push({ tag: n.tagName.toLowerCase(), cls: String(n.className).slice(0, 60), ovY: c.overflowY, maxH: c.maxHeight, h: +n.getBoundingClientRect().height.toFixed(1) });
      n = n.parentElement;
    }
    return {
      viewport: { w: innerWidth, h: innerHeight },
      content: RR(root),
      contentOverflowBottom: +(root.getBoundingClientRect().bottom - innerHeight).toFixed(1),
      contentOverflowRight: +(root.getBoundingClientRect().right - innerWidth).toFixed(1),
      contentCS: { pad: cs.padding, maxH: cs.maxHeight, ovY: cs.overflowY, bg: cs.backgroundColor, backdrop: cs.backdropFilter, animName: cs.animationName, animDur: cs.animationDuration, transDur: cs.transitionDuration, border: `${cs.borderTopWidth} ${cs.borderTopColor}` },
      sections,
      sectionCount: sections.length,
      // Tailwind v4 `divide-y` writes border-BOTTOM on :not(:last-child)
      dividers: divide ? [...divide.children].map((c) => { const s = getComputedStyle(c); return { bt: s.borderTopWidth, bb: s.borderBottomWidth, color: s.borderBottomColor }; }) : null,
      renderedDividerCount: divide ? [...divide.children].filter((c) => { const s = getComputedStyle(c); return parseFloat(s.borderBottomWidth) > 0 || parseFloat(s.borderTopWidth) > 0; }).length : 0,
      clearRow: clearRow ? { rect: RR(clearRow), visibleInViewport: RR(clearRow).y + RR(clearRow).h <= innerHeight } : null,
      tagList: tagList ? { rect: RR(tagList), scrollH: tagList.scrollHeight, clientH: tagList.clientHeight, ovY: getComputedStyle(tagList).overflowY, maxH: getComputedStyle(tagList).maxHeight } : null,
      colorInput: colorInput ? { rect: RR(colorInput), scrollW: colorInput.scrollWidth, clientW: colorInput.clientWidth, value: colorInput.value, placeholder: colorInput.placeholder, pr: getComputedStyle(colorInput).paddingRight } : null,
      badge: badge ? { text: badge.textContent.trim(), rect: RR(badge), cs: (() => { const c = getComputedStyle(badge); return { fs: c.fontSize, fw: c.fontWeight, bg: c.backgroundColor, color: c.color }; })() } : null,
      triggerRect: RR(trig),
      badgeClippedByTrigger: badge ? (RR(badge).x < RR(trig).x || RR(badge).y < RR(trig).y) : null,
      scrollChain: chain.slice(0, 6),
      // popover-content animation on the producer element
      contentAnim: (() => { try { return root.getAnimations().map((a) => ({ name: a.animationName ?? (a.effect?.getKeyframes?.().length ? "css" : "?"), dur: a.effect?.getTiming?.().duration })); } catch { return "err"; } })(),
    };
  });

  // keyboard: tab order + focus ring, keyed by DOM path (never by label)
  const tabs = [];
  await page.evaluate(() => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    root?.focus?.();
  });
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(70);
    tabs.push(await page.evaluate(() => {
      const ae = document.activeElement;
      if (!ae) return null;
      const path = (el) => { const p = []; while (el && el.tagName && p.length < 6) { p.unshift(el.tagName.toLowerCase() + (el.getAttribute("role") ? `[${el.getAttribute("role")}]` : "") + (el.className ? "." + String(el.className).split(/\s+/)[0] : "")); el = el.parentElement; } return p.join(" > "); };
      const cs = getComputedStyle(ae);
      const inPopover = !!ae.closest('[role="dialog"][data-state="open"]');
      return {
        path: path(ae), inPopover,
        ring: (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) ? `outline ${cs.outlineWidth} ${cs.outlineColor}` : (cs.boxShadow !== "none" ? `boxShadow ${cs.boxShadow.slice(0, 40)}` : "NONE"),
      };
    }));
  }
  await page.screenshot({ path: resolve(SHOTS, `${m.id}-tabbed.png`), fullPage: false });

  out[m.id] = { measured, tabs };
  await context.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
