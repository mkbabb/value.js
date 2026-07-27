// ActionBarToggle design probe — CHALLENGE-D seat.
// Read-only: navigates, measures, clicks the Tools toggle. No source touched.
import { chromium, webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import zlib from "node:zlib";

const ENGINE = process.env.ENGINE === "webkit" ? webkit : chromium;
const TAG = process.env.ENGINE === "webkit" ? "wk" : "cr";
const ORIGIN = "http://localhost:9000";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
mkdirSync(OUT, { recursive: true });

// ── minimal non-interlaced PNG → RGBA pixel reader (no deps) ──
function decodePng(buf) {
  let p = 8, w = 0, h = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString("ascii", p + 4, p + 8);
    const data = buf.subarray(p + 8, p + 8 + len);
    if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; }
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    p += 12 + len;
  }
  if (bitDepth !== 8) throw new Error("bitDepth " + bitDepth);
  const ch = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * ch;
  const out = Buffer.alloc(h * stride);
  let ptr = 0;
  for (let y = 0; y < h; y++) {
    const f = raw[ptr++];
    const line = raw.subarray(ptr, ptr + stride); ptr += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y ? out.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? cur[x - ch] : 0, b = prev[x], c = x >= ch ? prev[x - ch] : 0, v = line[x];
      cur[x] = f === 0 ? v : f === 1 ? (v + a) & 255 : f === 2 ? (v + b) & 255
        : f === 3 ? (v + ((a + b) >> 1)) & 255
        : (() => { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
                   return (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255; })();
    }
  }
  return { w, h, ch, px: out };
}
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const relLum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const [x, y] = a > b ? [a, b] : [b, a]; return (x + 0.05) / (y + 0.05); };

// darkest (ink) and brightest (paper) luminance inside a crop → the real rendered contrast
function inkVsPaper(png) {
  const { w, h, ch, px } = png;
  const lums = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * ch;
    lums.push(relLum(px[i], px[i + 1], px[i + 2]));
  }
  lums.sort((a, b) => a - b);
  const q = (f) => lums[Math.max(0, Math.min(lums.length - 1, Math.round(f * (lums.length - 1))))];
  return { ink: q(0.02), paper: q(0.98), ratio: +contrast(q(0.02), q(0.98)).toFixed(2), n: lums.length };
}

const MEASURE = () => {
  const q = (s) => document.querySelector(s);
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect();
    return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {};
    for (const p of props) o[p] = s.getPropertyValue(p); return o; };
  const tools = q('[aria-label="Toggle action bar"]');
  const slot = document.querySelector(".action-bar-toggle-slot");
  const inner = document.querySelector(".action-bar-toggle-inner");
  const toolsIcon = tools?.querySelector("svg");
  const toolsSvgs = tools ? [...tools.querySelectorAll("svg")].map((s) => box(s)) : [];
  const toolsLabel = tools ? [...tools.querySelectorAll("span")].pop() : null;
  const mainLayer = document.querySelector("#main, [id='main']") || [...document.querySelectorAll(".dock-layer")].find((l) => l.id === "main");
  const controls = [...document.querySelectorAll("nav button, nav [role=button], nav a")].map((el) => ({
    label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 26),
    tag: el.tagName, cls: el.className?.baseVal ?? String(el.className).slice(0, 60),
    ...box(el),
  })).filter((c) => c.w > 0);
  const seps = [...document.querySelectorAll("nav .dock-separator, nav [data-slot=dock-separator], nav hr")].map(box);
  return {
    toolsPresent: !!tools,
    toolsBox: box(tools),
    toolsCS: cs(tools, ["padding", "margin-inline-start", "margin-inline-end", "gap", "height", "min-height",
                        "background-color", "color", "scale", "box-shadow", "border-radius", "opacity", "visibility"]),
    toolsAttrs: tools ? { ariaPressed: tools.getAttribute("aria-pressed"), tabindex: tools.getAttribute("tabindex"),
                          cls: String(tools.className), title: tools.getAttribute("title"),
                          ariaExpanded: tools.getAttribute("aria-expanded"), ariaControls: tools.getAttribute("aria-controls"),
                          disabled: tools.disabled ?? null } : null,
    toolsSvgBoxes: toolsSvgs,
    toolsIconCS: cs(toolsIcon, ["width", "height", "color"]),
    toolsLabelText: toolsLabel?.textContent?.trim() ?? null,
    toolsLabelBox: box(toolsLabel),
    toolsLabelCS: cs(toolsLabel, ["font-family", "font-size", "font-weight", "color", "line-height", "letter-spacing"]),
    slotCS: cs(slot, ["display", "grid-template-columns", "opacity", "transition-property", "transition-duration"]),
    slotCls: slot ? String(slot.className) : null,
    innerCS: cs(inner, ["overflow", "min-width"]),
    mainLayerCS: cs(mainLayer, ["opacity", "visibility", "pointer-events", "position"]),
    mainLayerCls: mainLayer ? String(mainLayer.className) : null,
    controls, seps,
    dockBox: box(document.querySelector("nav .glass-dock") || document.querySelector(".glass-dock")),
    tokens: (() => { const s = getComputedStyle(document.documentElement); const o = {};
      for (const k of ["--dock-active-bg", "--dock-active-color", "--dock-active-scale", "--dock-active-shadow",
                       "--dock-active-border", "--dock-compact-control-padding", "--dock-icon-glyph",
                       "--accent-live", "--font-display", "--font-text", "--duration-normal", "--ease-standard",
                       "--spring-snappy", "--dock-layer-gap"]) o[k] = s.getPropertyValue(k).trim();
      return o; })(),
  };
};

const results = {};
const browser = await ENGINE.launch();

async function run(id, ctxOpts, route, fn) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));
  await page.goto(`${ORIGIN}/#/${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2600);
  const r = await fn(page);
  r.pageErrors = errs;
  results[id] = r;
  await ctx.close();
}

// A · desktop light, /#/gradient — rest state geometry + type + ink
await run("A-desktop-light-gradient", { viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 },
  "gradient", async (page) => {
    const rest = await page.evaluate(MEASURE);
    // crop the label + the sibling route label for a real rendered contrast read
    const shots = {};
    for (const [k, sel] of [["toolsLabel", '[aria-label="Toggle action bar"] span'],
                            ["viewLabel", '[aria-label*="view" i] span, .dock-select-trigger span']]) {
      const el = await page.$(sel);
      if (!el) continue;
      const b = await el.boundingBox();
      if (!b) continue;
      const buf = await page.screenshot({ clip: { x: b.x - 1, y: b.y - 1, width: b.width + 2, height: b.height + 2 } });
      shots[k] = inkVsPaper(decodePng(buf));
    }
    await page.screenshot({ path: `${OUT}/abt-${TAG}-dock-rest.png`,
      clip: { x: rest.dockBox.x - 8, y: rest.dockBox.y - 8, width: rest.dockBox.w + 16, height: rest.dockBox.h + 16 } });
    // B · hover
    await page.hover('[aria-label="Toggle action bar"]');
    await page.waitForTimeout(400);
    const hover = await page.evaluate(MEASURE);
    // C · focus-visible via keyboard
    await page.evaluate(() => document.querySelector('[aria-label="Toggle action bar"]').blur());
    await page.keyboard.press("Tab");
    const focusChain = [];
    for (let i = 0; i < 16; i++) {
      const cur = await page.evaluate(() => { const a = document.activeElement;
        return a ? { label: (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 30), tag: a.tagName } : null; });
      focusChain.push(cur);
      if (cur?.label === "Toggle action bar") break;
      await page.keyboard.press("Tab"); await page.waitForTimeout(60);
    }
    const focusCS = await page.evaluate(() => { const a = document.activeElement;
      if (!a || a.getAttribute("aria-label") !== "Toggle action bar") return null;
      const s = getComputedStyle(a); return { outline: s.outline, boxShadow: s.boxShadow, background: s.backgroundColor }; });
    // D · ACTIVE — click the toggle, then re-measure the same node
    await page.click('[aria-label="Toggle action bar"]');
    await page.waitForTimeout(900);
    const active = await page.evaluate(MEASURE);
    const activeA11y = await page.locator("nav").first().ariaSnapshot().catch(() => "");
    const pressedInAx = String(activeA11y).includes("Toggle action bar");
    await page.screenshot({ path: `${OUT}/abt-${TAG}-dock-active.png`,
      clip: { x: Math.max(0, active.dockBox.x - 8), y: Math.max(0, active.dockBox.y - 8),
              width: active.dockBox.w + 16, height: active.dockBox.h + 16 } });
    return { rest, hover, focusChain, focusCS, active, pressedInAx, activeAx: String(activeA11y).slice(0,700), shots };
  });

// E · desktop light, /#/browse — NO action bar: the absent state
await run("E-desktop-browse-absent", { viewport: { width: 1440, height: 900 }, colorScheme: "light" },
  "browse", async (page) => {
    const m = await page.evaluate(MEASURE);
    const ax = await page.locator("nav").first().ariaSnapshot().catch(() => "");
    const inAx = { hit: String(ax).includes("Toggle action bar"), snap: String(ax).slice(0, 700) };
    const clickable = await page.evaluate(() => {
      const t = document.querySelector('[aria-label="Toggle action bar"]'); if (!t) return null;
      const r = t.getBoundingClientRect();
      const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      return { rect: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
               hitIsSelf: hit === t || t.contains(hit), focusable: (() => { t.focus(); return document.activeElement === t; })() };
    });
    return { m, inAx, clickable };
  });

// F · 200% zoom (720 CSS px @2dpr) — WCAG 1.4.4
await run("F-zoom200-gradient", { viewport: { width: 720, height: 450 }, colorScheme: "light", deviceScaleFactor: 2 },
  "gradient", async (page) => await page.evaluate(MEASURE));

// G · forced-colors active (chromium only honours this)
await run("G-forced-colors", { viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" },
  "gradient", async (page) => {
    const rest = await page.evaluate(MEASURE);
    await page.click('[aria-label="Toggle action bar"]').catch(() => {});
    await page.waitForTimeout(700);
    const active = await page.evaluate(MEASURE);
    return { rest, active };
  });

// H · reduced motion
await run("H-reduced-motion", { viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" },
  "gradient", async (page) => await page.evaluate(MEASURE));

// I · mobile (iPhone 14 width) — the label branch drops
await run("I-mobile-gradient", { viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  "gradient", async (page) => await page.evaluate(MEASURE));

// J · dark
await run("J-desktop-dark-gradient", { viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 },
  "gradient", async (page) => {
    const m = await page.evaluate(MEASURE);
    const el = await page.$('[aria-label="Toggle action bar"] span');
    if (el) { const b = await el.boundingBox();
      const buf = await page.screenshot({ clip: { x: b.x - 1, y: b.y - 1, width: b.width + 2, height: b.height + 2 } });
      m.labelInk = inkVsPaper(decodePng(buf)); }
    await page.screenshot({ path: `${OUT}/abt-${TAG}-dock-dark.png`,
      clip: { x: m.dockBox.x - 8, y: m.dockBox.y - 8, width: m.dockBox.w + 16, height: m.dockBox.h + 16 } });
    return m;
  });

await browser.close();
writeFileSync(`${OUT}/abt-probe-${TAG}.json`, JSON.stringify(results, null, 1));
console.log("wrote", `${OUT}/abt-probe-${TAG}.json`);
