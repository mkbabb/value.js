// CHALLENGE-D state harness for demo/workbenches/mix/MixResultDisplay.vue.
// Read-only against the live dev server; writes only under this component's audit dir.
//   node docs/tranches/V/megatranche/audit/components/wb-mix-resultdisplay/probe.mjs
// ENGINE=chromium for forced-colors (WebKit cannot emulate forced-colors).
//
// Reachability note (measured, see MT-D findings): glass-ui 7.0.0 WatercolorDot has
// NO `tag` prop, so MixSourceSelector's colors-mode add affordances are not buttons
// and the colors path cannot be driven at all. The palettes path is the only route
// to a rendered MixResultDisplay.
import { webkit, chromium, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ENGINE = process.env.ENGINE === "chromium" ? "chromium" : "webkit";
const engineFor = { webkit, chromium }[ENGINE];
const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = "http://localhost:9000";

const mk = (n, hues) => ({
  id: `pal-${n}`, name: n, slug: n.toLowerCase(),
  colors: hues.map((h, i) => ({ css: `oklch(0.72 0.15 ${h})`, position: i })),
  createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", isLocal: true,
});
const TWELVE = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const STORE = { version: 1, palettes: [mk("Alpha", TWELVE), mk("Beta", TWELVE.map((h) => h + 15))] };
// The one-color arm: MixPane's own `onSave` mints exactly this shape ("Mixed Color",
// a single PaletteColor), so two of them are an ordinary reachable state.
const STORE1 = { version: 1, palettes: [mk("Mixed Color", [40]), mk("Mixed Color 2", [220])] };

const seed = (scheme, breakClipboard, oneColor) => `
  try {
    localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify(STORE))}.replace(/^/, ''));
    if (${JSON.stringify(!!oneColor)}) localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify(STORE1))});
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
  } catch (e) {}
  if (${JSON.stringify(!!breakClipboard)}) {
    try { Object.defineProperty(navigator, 'clipboard', { configurable: true,
      get: () => ({ writeText: () => Promise.reject(new Error('probe: denied')) }) }); } catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', () => {
    if (${JSON.stringify(scheme)} === 'dark') document.documentElement.classList.add('dark');
  });`;

const PROBE = () => {
  const px = (v) => Math.round(parseFloat(v) * 100) / 100;
  const plate = document.querySelector(".mix-plate");
  if (!plate) return { present: false };
  const cs = getComputedStyle(plate);
  const r = plate.getBoundingClientRect();
  const scroller = plate.closest(".overflow-y-auto");
  const sr = scroller && scroller.getBoundingClientRect();
  const well = document.querySelector(".dashed-well");
  const label = plate.querySelector("span");
  const lcs = label && getComputedStyle(label);
  const value = plate.querySelector(".select-all");
  const vcs = value && getComputedStyle(value);
  const cfgLabel = document.querySelector(".section-label");
  const clcs = cfgLabel && getComputedStyle(cfgLabel);
  const srcLabel = well && well.querySelector("span");
  const slcs = srcLabel && getComputedStyle(srcLabel);

  const btns = [...plate.querySelectorAll("button")].map((b) => {
    const br = b.getBoundingClientRect(); const bcs = getComputedStyle(b);
    return { title: b.getAttribute("title"), aria: b.getAttribute("aria-label"),
             text: (b.textContent || "").trim(), w: px(br.width), h: px(br.height),
             dockControlSize: bcs.getPropertyValue("--dock-control-size").trim() || "(unset)",
             dockSafeInset: bcs.getPropertyValue("--dock-control-safe-inset").trim() || "(unset)",
             bg: bcs.backgroundColor, ariaPressed: b.getAttribute("aria-pressed") };
  });

  const lines = [...plate.querySelectorAll("*")].filter((el) => {
    const c = getComputedStyle(el); const b = el.getBoundingClientRect();
    const thin = (b.width <= 3 && b.height >= 6) || (b.height <= 3 && b.width >= 6);
    return thin && (c.backgroundColor !== "rgba(0, 0, 0, 0)" || parseFloat(c.borderTopWidth) > 0);
  }).map((el) => {
    const b = el.getBoundingClientRect(); const c = getComputedStyle(el);
    return { tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 70),
             w: px(b.width), h: px(b.height), bg: c.backgroundColor,
             aria: el.getAttribute("aria-hidden"), role: el.getAttribute("role") };
  });

  const swatchRow = plate.querySelector(".swatch-row");
  const kids = swatchRow ? [...swatchRow.children].map((k) => {
    const b = k.getBoundingClientRect();
    return { tag: k.tagName.toLowerCase(), w: px(b.width), h: px(b.height), top: px(b.top),
             left: px(b.left), title: k.getAttribute("title"), tagAttr: k.getAttribute("tag"),
             aria: k.getAttribute("aria-label"), role: k.getAttribute("role") };
  }) : null;

  const strayTagAttr = [...plate.querySelectorAll("[tag]")].map(
    (e) => `${e.tagName.toLowerCase()}[tag="${e.getAttribute("tag")}"]`);

  const strip = plate.querySelector('[role="presentation"]');
  const stripInfo = strip ? (() => { const b = strip.getBoundingClientRect(); const c = getComputedStyle(strip);
    return { w: px(b.width), h: px(b.height), inlineStyle: strip.getAttribute("style"),
             computedBgImage: c.backgroundImage, bgColor: c.backgroundColor,
             ariaHidden: strip.getAttribute("aria-hidden"), role: strip.getAttribute("role") }; })() : null;

  return {
    present: true,
    plate: { w: px(r.width), h: px(r.height), top: px(r.top), bottom: px(r.bottom),
             radius: cs.borderRadius, padding: cs.padding, gap: cs.rowGap, bg: cs.backgroundColor,
             boxShadow: cs.boxShadow, border: cs.borderTopWidth + " " + cs.borderTopStyle,
             opacity: cs.opacity, transition: cs.transitionProperty + " " + cs.transitionDuration,
             ghost: plate.classList.contains("mix-plate--ghost") },
    scroller: scroller ? { top: px(sr.top), bottom: px(sr.bottom),
                           scrollTop: px(scroller.scrollTop),
                           scrollHeight: scroller.scrollHeight, clientHeight: scroller.clientHeight,
                           plateFullyVisible: r.bottom <= sr.bottom + 0.5 && r.top >= sr.top - 0.5,
                           plateVisiblePx: px(Math.max(0, Math.min(r.bottom, sr.bottom) - Math.max(r.top, sr.top))) } : null,
    dashedWell: well ? (() => { const w = getComputedStyle(well); const b = well.getBoundingClientRect();
      return { w: px(b.width), radius: w.borderRadius, padding: w.padding, bg: w.backgroundColor,
               boxShadow: w.boxShadow.slice(0, 70), border: w.borderTopWidth + " " + w.borderTopStyle }; })() : null,
    labels: {
      result: lcs ? { text: label.textContent.trim(), family: lcs.fontFamily.split(",")[0],
                      size: lcs.fontSize, weight: lcs.fontWeight, style: lcs.fontStyle,
                      transform: lcs.textTransform, tracking: lcs.letterSpacing, color: lcs.color } : null,
      source: slcs ? { text: srcLabel.textContent.trim(), family: slcs.fontFamily.split(",")[0],
                       size: slcs.fontSize, weight: slcs.fontWeight, style: slcs.fontStyle,
                       transform: slcs.textTransform, tracking: slcs.letterSpacing } : null,
      config: clcs ? { text: cfgLabel.textContent.trim(), family: clcs.fontFamily.split(",")[0],
                       size: clcs.fontSize, weight: clcs.fontWeight, style: clcs.fontStyle,
                       transform: clcs.textTransform, tracking: clcs.letterSpacing } : null,
    },
    value: vcs ? { text: value.textContent.trim(), family: vcs.fontFamily.split(",")[0],
                   size: vcs.fontSize, color: vcs.color, wordBreak: vcs.wordBreak,
                   dir: value.getAttribute("dir"), bidi: vcs.unicodeBidi } : null,
    buttons: btns, lineElements: lines, swatchKids: kids, strayTagAttr, gradientStrip: stripInfo,
    plateText: plate.innerText.replace(/\s+/g, " ").slice(0, 160),
    liveRegions: [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")]
      .map((e) => `${e.tagName.toLowerCase()}[${e.getAttribute("aria-live") || e.getAttribute("role")}]`),
    plateHasLive: !!plate.querySelector("[aria-live],[role=status],[role=alert]"),
    docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    activeEl: document.activeElement ? `${document.activeElement.tagName.toLowerCase()}[${(document.activeElement.getAttribute("title") || document.activeElement.getAttribute("aria-label") || "").slice(0, 26)}]` : null,
  };
};

async function selectTwoPalettes(page) {
  // Native DOM clicks only — Playwright actionability waits are unreliable over the
  // animated pane and are not what is under test here.
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find(
      (b) => (b.textContent || "").trim() === "Palettes" && b.getBoundingClientRect().top > 200);
    b && b.click();
  });
  await page.waitForTimeout(900);
  const n = await page.evaluate(() => {
    const bs = [...document.querySelectorAll('button[aria-label^="Select palette"]')];
    bs.slice(0, 2).forEach((b) => b.click());
    return bs.length;
  });
  await page.waitForTimeout(600);
  return n;
}

const rows = [];
async function run(id, ctxOpts, opts = {}) {
  const browser = await engineFor.launch();
  const context = await browser.newContext(ctxOpts);
  await context.addInitScript(seed(opts.scheme ?? "light", opts.breakClipboard, opts.oneColor));
  const page = await context.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push("page:" + String(e).slice(0, 160)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console:" + m.text().slice(0, 120)); });
  await page.goto(`${ORIGIN}/#/mix`, { waitUntil: "networkidle", timeout: 45000 }).catch((e) => errs.push(String(e).slice(0, 100)));
  await page.waitForTimeout(2300);
  if (opts.rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(700); }

  const nPal = await selectTwoPalettes(page);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find(
      (b) => (b.textContent || "").trim() === "Mix" && b.getBoundingClientRect().width > 200);
    b && b.click();
  });

  await page.waitForTimeout(170);
  const ghost = await page.evaluate(PROBE).catch((e) => ({ err: String(e).slice(0, 140) }));
  await page.screenshot({ path: resolve(SHOTS, `${id}-ghost.png`), fullPage: true }).catch(() => {});

  await page.waitForTimeout(5200);
  // The as-delivered frame — NO scroll assist, exactly what the user is left with.
  const settledAsDelivered = await page.evaluate(PROBE).catch((e) => ({ err: String(e).slice(0, 140) }));
  await page.screenshot({ path: resolve(SHOTS, `${id}-settled-as-delivered.png`), fullPage: true }).catch(() => {});

  // Then scroll the plate into view so the composition itself can be judged.
  await page.evaluate(() => document.querySelector(".mix-plate")?.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(500);
  const settled = await page.evaluate(PROBE).catch((e) => ({ err: String(e).slice(0, 140) }));
  await page.screenshot({ path: resolve(SHOTS, `${id}-settled.png`), fullPage: true }).catch(() => {});

  let copy = null;
  const hasBtn = await page.evaluate(() => !!document.querySelector(".mix-plate button"));
  if (hasBtn) {
    await page.evaluate(() => document.querySelector(".mix-plate button").click());
    await page.waitForTimeout(340);
    copy = await page.evaluate(() => {
      const b = document.querySelector(".mix-plate button");
      return b ? { title: b.getAttribute("title"), innerHtml: b.innerHTML.replace(/\s+/g, " ").slice(0, 180),
                   ariaPressed: b.getAttribute("aria-pressed"),
                   plateHasLive: !!document.querySelector(".mix-plate [aria-live],.mix-plate [role=status]") } : null;
    }).catch(() => null);
    await page.screenshot({ path: resolve(SHOTS, `${id}-copy.png`), fullPage: true }).catch(() => {});
  }

  let focus = null;
  if (opts.focus) {
    for (let i = 0; i < 45; i++) {
      await page.keyboard.press("Tab");
      if (await page.evaluate(() => !!document.activeElement?.closest?.(".mix-plate"))) break;
    }
    focus = await page.evaluate(() => {
      const ae = document.activeElement; if (!ae) return null;
      const c = getComputedStyle(ae); const r = ae.getBoundingClientRect();
      return { el: ae.tagName.toLowerCase(), title: ae.getAttribute("title"),
               inPlate: !!ae.closest(".mix-plate"),
               outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`,
               boxShadow: c.boxShadow.slice(0, 80), w: Math.round(r.width), h: Math.round(r.height) };
    }).catch(() => null);
    await page.screenshot({ path: resolve(SHOTS, `${id}-focus.png`), fullPage: true }).catch(() => {});
  }

  rows.push({ id, engine: ENGINE, opts, nPal, ghost, settledAsDelivered, settled, copy, focus, errs });
  console.log(`\n===== ${id} (${ENGINE}) =====`);
  console.log(JSON.stringify({ nPal, ghost, settledAsDelivered, settled, copy, focus, errs }, null, 1));
  await browser.close();
}

const DESK = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const MOB = { ...devices["iPhone 14"] };
const only = process.env.ONLY;
const jobs = [
  ["desktop-light", DESK, { scheme: "light", focus: true }],
  ["desktop-dark", { ...DESK, colorScheme: "dark" }, { scheme: "dark" }],
  ["mobile-light", MOB, { scheme: "light" }],
  ["mobile-dark", { ...MOB, colorScheme: "dark" }, { scheme: "dark" }],
  ["zoom200", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 }, { scheme: "light" }],
  ["rtl", DESK, { scheme: "light", rtl: true }],
  ["reduced-motion", { ...DESK, reducedMotion: "reduce" }, { scheme: "light" }],
  ["clipboard-denied", DESK, { scheme: "light", breakClipboard: true }],
  ["one-color-palette", DESK, { scheme: "light", oneColor: true }],
  ["forced-colors", { ...DESK, forcedColors: "active" }, { scheme: "light" }],
];
for (const [id, ctx, opts] of jobs) {
  if (only && !id.includes(only)) continue;
  if (id === "forced-colors" && ENGINE !== "chromium") { console.log("skip forced-colors (needs ENGINE=chromium)"); continue; }
  try { await run(id, ctx, opts); } catch (e) { console.log(`FAILED ${id}: ${String(e).slice(0, 300)}`); }
}
writeFileSync(resolve(HERE, `probe-results-${ENGINE}.json`), JSON.stringify(rows, null, 1));
