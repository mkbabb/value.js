// CHALLENGE-D probe 3 — badge clipping, activeFilterCount truth, toggleTag stale-prop,
// contrast, and the color-search silent-fallback. Read-only.
//
//   PROBE_ORIGIN=http://localhost:9100 node .../probe3.mjs
//
import { webkit } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9100";

const TAGS = ["pastel", "neon", "earthy", "monochrome", "retro", "vaporwave", "muted", "high-contrast"]
  .map((name, i) => ({ name, count: 12 - i }));
const PALETTES = Array.from({ length: 6 }, (_, i) => ({
  slug: `probe-palette-${i}`, name: `Probe Palette ${i}`,
  colors: ["#4488cc", "#cc4488", "#88cc44", "#cccc44"],
  oklabColors: [{ L: 0.6, a: -0.02, b: -0.12 }],
  userSlug: "someone-else", visibility: "public", tier: i % 2 ? "featured" : null,
  tags: [TAGS[i % TAGS.length].name], votes: 3, forkCount: 1, createdAt: new Date().toISOString(),
}));

const browser = await webkit.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await context.route("**/api/colors/tags", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(TAGS) }));
await context.route(/\/api\/colors(\?|$)/, (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ palettes: PALETTES, nextCursor: null }) }));
const page = await context.newPage();
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
await page.waitForTimeout(2600);

const badgeOf = () => page.evaluate(() => document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null);
const clickLabel = async (text) => {
  await page.evaluate((t) => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    const lbl = [...root.querySelectorAll("label")].find((l) => l.textContent.trim() === t);
    lbl?.click();
  }, text);
  await page.waitForTimeout(260);
};

await page.screenshot({ path: resolve(SHOTS, "probe3-preclick.png") });
await page.click('button[aria-label="Filters"]', { timeout: 15000 });
await page.waitForTimeout(800);

const out = {};

// --- A. activeFilterCount truth, one deliberate step at a time -------------------
out.countSteps = [];
out.countSteps.push({ step: "initial", badge: await badgeOf() });
await clickLabel("Featured");
out.countSteps.push({ step: "tier=featured", badge: await badgeOf() });
await clickLabel("pastel");
out.countSteps.push({ step: "+tag pastel", badge: await badgeOf() });
await clickLabel("neon");
out.countSteps.push({ step: "+tag neon", badge: await badgeOf() });
await clickLabel("earthy");
out.countSteps.push({ step: "+tag earthy", badge: await badgeOf() });
out.selectedTagsAfterSequential = await page.evaluate(() => {
  const root = document.querySelector('[role="dialog"][data-state="open"]');
  return [...root.querySelectorAll('[role="checkbox"]')]
    .filter((c) => c.getAttribute("aria-checked") === "true")
    .map((c) => c.closest("label")?.textContent?.trim());
});

// --- B. toggleTag stale-prop: three clicks inside ONE tick ----------------------
// clear first
await page.evaluate(() => {
  const root = document.querySelector('[role="dialog"][data-state="open"]');
  const b = [...root.querySelectorAll("button")].find((x) => /Clear all filters/.test(x.textContent || ""));
  b?.click();
});
await page.waitForTimeout(500);
await page.click('button[aria-label="Filters"]').catch(() => {});
await page.waitForTimeout(300);
const stillOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"][data-state="open"]'));
if (!stillOpen) { await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700); }
out.sameTick = await page.evaluate(async () => {
  const root = document.querySelector('[role="dialog"][data-state="open"]');
  const boxes = [...root.querySelectorAll('[role="checkbox"]')];
  const names = boxes.slice(0, 3).map((b) => b.closest("label")?.textContent?.trim());
  boxes.slice(0, 3).forEach((b) => b.click());          // one tick, three toggles
  await new Promise((r) => setTimeout(r, 400));
  return {
    clicked: names,
    checkedAfter: [...root.querySelectorAll('[role="checkbox"]')]
      .filter((c) => c.getAttribute("aria-checked") === "true")
      .map((c) => c.closest("label")?.textContent?.trim()),
  };
});
out.sameTickBadge = await badgeOf();

// --- C. badge geometry + which ancestor clips it ---------------------------------
out.badgeClip = await page.evaluate(() => {
  const trig = document.querySelector('button[aria-label="Filters"]');
  const badge = trig?.querySelector("span");
  if (!badge) return { missing: true };
  const RR = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), r: +b.right.toFixed(1), t: +b.top.toFixed(1) }; };
  const bR = RR(badge), tR = RR(trig);
  const clippers = [];
  let n = trig.parentElement;
  while (n && n !== document.documentElement) {
    const c = getComputedStyle(n);
    if (c.overflow !== "visible" || c.overflowX !== "visible" || c.overflowY !== "visible" || c.clipPath !== "none" || c.maskImage !== "none") {
      const r = RR(n);
      clippers.push({
        tag: n.tagName.toLowerCase(), cls: String(n.className).slice(0, 70),
        overflow: `${c.overflowX}/${c.overflowY}`, clipPath: c.clipPath, mask: c.maskImage.slice(0, 40),
        rect: r,
        badgeCutTop: +(r.t - bR.t).toFixed(1),      // >0 => badge top is above the clipper
        badgeCutRight: +(bR.r - r.r).toFixed(1),     // >0 => badge right is beyond the clipper
      });
    }
    n = n.parentElement;
  }
  return { badge: bR, trigger: tR, clippers };
});

// --- D. rendered contrast: badge, section-label, unchecked radio, Search pill ----
out.contrast = await page.evaluate(() => {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const L = (rgb) => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  const parse = (s) => { const m = s.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
  const ratio = (a, b) => { const la = L(a), lb = L(b); const hi = Math.max(la, lb), lo = Math.min(la, lb); return +((hi + 0.05) / (lo + 0.05)).toFixed(2); };
  const root = document.querySelector('[role="dialog"][data-state="open"]');
  const res = {};
  const veil = getComputedStyle(root).backgroundColor;
  const secLbl = root.querySelector(".section-label");
  const opt = root.querySelector(".filter-option span");
  const srch = [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
  const box = root.querySelector('[role="checkbox"]');
  res.veilRaw = veil;
  res.notes = "veil is translucent; ratios below use the resolved computed rgb() of each ink against the popover's own painted colour where opaque";
  const grab = (el, name) => { if (!el) return; const c = getComputedStyle(el); res[name] = { color: c.color, bg: c.backgroundColor, border: `${c.borderTopWidth} ${c.borderTopColor}`, fs: c.fontSize, fw: c.fontWeight, ff: c.fontFamily.split(",")[0], tt: c.textTransform, ls: c.letterSpacing }; };
  grab(secLbl, "sectionLabel"); grab(opt, "optionText"); grab(srch, "searchPill"); grab(box, "checkboxUnchecked");
  const badge = document.querySelector('button[aria-label="Filters"] span');
  grab(badge, "badge");
  if (badge) { const c = getComputedStyle(badge); const f = parse(c.color), b = parse(c.backgroundColor); if (f && b) res.badgeRatio = ratio(f, b); }
  return res;
});

// --- E. the placeholder promise, again, cleanly ---------------------------------
await page.evaluate(() => {
  const root = document.querySelector('[role="dialog"][data-state="open"]');
  const b = [...root.querySelectorAll("button")].find((x) => /Clear all filters/.test(x.textContent || ""));
  b?.click();
});
await page.waitForTimeout(400);
const openNow = await page.evaluate(() => !!document.querySelector('[role="dialog"][data-state="open"]'));
if (!openNow) { await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700); }
out.nonHexCases = [];
for (const v of ["hsl(200 50% 50%)", "#abc", "rebeccapurple", "oklch(70% 0.15 200)", "#AABBCC", "garbage!!"]) {
  await page.fill('input[aria-label="Search by CSS color"]', v);
  const r = await page.evaluate(async () => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    const btn = [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
    const swatch = root.querySelector('button[aria-label^="Open color picker"]');
    const before = swatch ? getComputedStyle(swatch).backgroundColor : null;
    const rejections = [];
    const onRej = (e) => rejections.push(String(e.reason).slice(0, 100));
    addEventListener("unhandledrejection", onRej);
    btn.click();
    await new Promise((r) => setTimeout(r, 350));
    removeEventListener("unhandledrejection", onRej);
    return {
      swatchBefore: before,
      swatchAfter: swatch ? getComputedStyle(swatch).backgroundColor : null,
      swatchLabel: swatch?.getAttribute("aria-label"),
      errorShown: /invalid|error|not a colou?r|unrecogni/i.test(root.textContent || ""),
      rejections,
      resultCount: document.querySelectorAll('[data-slot="card"], article').length,
    };
  });
  out.nonHexCases.push({ typed: v, ...r });
  await page.evaluate(() => {
    const root = document.querySelector('[role="dialog"][data-state="open"]');
    const b = [...root.querySelectorAll("button")].find((x) => /Clear all filters/.test(x.textContent || ""));
    b?.click();
  });
  await page.waitForTimeout(300);
  if (!(await page.evaluate(() => !!document.querySelector('[role="dialog"][data-state="open"]')))) {
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(600);
  }
}

// --- F. results actually change? (does the color filter do anything visible) -----
out.resultDelta = await page.evaluate(async () => {
  const count = () => document.querySelectorAll('button[aria-pressed], [data-slot="card"] , article').length;
  const before = count();
  const root = document.querySelector('[role="dialog"][data-state="open"]');
  const btn = [...root.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search");
  btn?.click();
  await new Promise((r) => setTimeout(r, 500));
  return { before, after: count(), liveRegions: document.querySelectorAll("[aria-live]").length,
    statusRoles: document.querySelectorAll('[role="status"]').length };
});

await page.screenshot({ path: resolve(SHOTS, "probe3-final.png"), fullPage: false });
console.log(JSON.stringify(out, null, 1));
await browser.close();
