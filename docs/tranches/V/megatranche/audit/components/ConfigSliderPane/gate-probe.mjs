#!/usr/bin/env node
/**
 * MT-W-CSP-01 — the wave's runnable gate battery for `demo/scenes/ConfigSliderPane.vue`.
 *
 * JUROR-1 (correctness + evidence) authored this as the wave's BORN-RED instrument:
 * every assertion below FAILS against HEAD c654824e. Each gate names the exact input
 * that reddens it (FORMATION-LAWS L-2) and the environment it runs in (L-12).
 *
 *   ENV: private Chromium via in-repo playwright, against the dev server at
 *        http://localhost:9000. Structurally blind to: the BUILT bundle (MT-F012),
 *        WebKit-only rendering (use the visual harness for that arm), and any
 *        failure the demo's ErrorBoundary swallows — which is why G7 asserts the
 *        MOUNT, never `pageerror`.
 *
 *   RUN: node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gate-probe.mjs
 *        exit 0 = all gates GREEN · exit 1 = at least one RED (today: 9 RED)
 *        `--frames` additionally writes the π witnesses into ./frames/.
 */
import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const BASE = process.env.CSP_BASE ?? "http://localhost:9000";
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../../../../..");   // repo root
const FRAMES = join(HERE, "frames");
const WANT_FRAMES = process.argv.includes("--frames");
const GRAPHICS_FLOOR = 3;

const results = [];
const gate = (id, name, pass, detail) => results.push({ id, name, verdict: pass ? "GREEN" : "RED", detail });

const CONTRAST = `
function __toRGB(css, under){const c=document.createElement("canvas");c.width=c.height=1;
 const x=c.getContext("2d",{willReadFrequently:true});x.fillStyle=under||"#fff";x.fillRect(0,0,1,1);
 x.fillStyle=css;x.fillRect(0,0,1,1);const d=x.getImageData(0,0,1,1).data;return [d[0],d[1],d[2]];}
function __lum([r,g,b]){const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
 return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);}
function __ratio(a,b,under){const A=__lum(__toRGB(a,under)),B=__lum(__toRGB(b,under));
 const hi=Math.max(A,B),lo=Math.min(A,B);return +((hi+0.05)/(lo+0.05)).toFixed(2);}
`;

const browser = await chromium.launch();
if (WANT_FRAMES && !existsSync(FRAMES)) mkdirSync(FRAMES, { recursive: true });

async function open(opts = {}, route = "/#/blob", settle = 4000) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(settle);
  return { ctx, page };
}

// ───────────────────────────────────────────────────────── G1 · the value read
// PRODUCT: on every config slider the FILLED extent is distinguishable from the
// unfilled track at >= 3:1 (WCAG 1.4.11 for the control's own state).
// REDDENS: any row whose `.slider-range` composites identically to `.slider-track`
//          — which is what `variant="spectrum"` guarantees by recipe.
{
  const { ctx, page } = await open();
  const r = await page.evaluate(`(() => { ${CONTRAST}
    const rows = [...document.querySelectorAll(".config-console .configurator-row")];
    const bad = [];
    for (const row of rows) {
      const t = row.querySelector(".slider-track"), g = row.querySelector(".slider-range");
      if (!t || !g) continue;
      const tb = getComputedStyle(t).backgroundColor, gb = getComputedStyle(g).backgroundColor;
      const ratio = __ratio(gb, tb, tb);
      if (ratio < ${GRAPHICS_FLOOR}) bad.push({ label: row.querySelector("label")?.textContent?.trim(), trackBg: tb, rangeBg: gb, ratio });
    }
    return { rows: rows.length, failing: bad.length, sample: bad.slice(0, 2) };
  })()`);
  gate("G1", "filled extent >=3:1 against unfilled track", r.failing === 0, r);
  if (WANT_FRAMES) await page.locator(".config-console").screenshot({ path: join(FRAMES, "BEFORE-blob-desktop-light-console.png") });
  await ctx.close();
}

// ───────────────────────────────────────────── G2/G3 · forced colors (WHCM)
// PRODUCT G2: the control extent survives forced-colors — the track is not
//   byte-identical to the well, or a >=1px border/painted range supplies a
//   second channel.
// PRODUCT G3: a keyboard-focused thumb still shows an indicator in WHCM.
// REDDENS: expressing the whole control through `background` alone (G2), and a
//   producer `:focus-visible{outline:none}` that outranks the demo's
//   zero-specificity `:where(...)` WHCM outline fallback (G3).
{
  const { ctx, page } = await open({ forcedColors: "active" }, "/#/atmosphere");
  const extent = await page.evaluate(`(() => {
    const t = document.querySelector(".config-console .slider-track");
    const g = document.querySelector(".config-console .slider-range");
    const w = document.querySelector(".console-well");
    const cs = getComputedStyle;
    return { trackBg: cs(t).backgroundColor, wellBg: cs(w).backgroundColor, rangeBg: cs(g).backgroundColor,
             trackBorderW: cs(t).borderTopWidth, equal: cs(t).backgroundColor === cs(w).backgroundColor };
  })()`);
  const secondChannel = !extent.equal || parseFloat(extent.trackBorderW) > 0 ||
    !/rgba\(0, 0, 0, 0\)|transparent/.test(extent.rangeBg);
  gate("G2", "forced-colors: control extent has a surviving channel", secondChannel, extent);

  await page.keyboard.press("Tab");
  let landed = false;
  for (let i = 0; i < 90 && !landed; i++) {
    landed = await page.evaluate(() => {
      const a = document.activeElement;
      return !!(a && a.closest && a.closest(".config-console") && a.getAttribute("role") === "slider");
    });
    if (!landed) await page.keyboard.press("Tab");
  }
  const focus = await page.evaluate(`(() => { const a = document.activeElement; const c = getComputedStyle(a);
    return { label: a.getAttribute("aria-label"), focusVisible: a.matches(":focus-visible"),
             outlineStyle: c.outlineStyle, boxShadow: c.boxShadow }; })()`);
  const visible = focus.outlineStyle !== "none" || (focus.boxShadow && focus.boxShadow !== "none");
  gate("G3", "forced-colors: keyboard focus indicator paints", !!visible, { landed, ...focus });
  if (WANT_FRAMES) await page.screenshot({ path: join(FRAMES, "BEFORE-atmosphere-forced-colors-focus.png") });
  await ctx.close();
}

// ─────────────────────────────────────────────────────── G4 · one voice
// PRODUCT: every config slider announces the SAME string the eye reads.
// REDDENS: a formatted readout rendered only to the row's `name` slot.
{
  const { ctx, page } = await open();
  const r = await page.evaluate(`(() => {
    const rows = [...document.querySelectorAll(".config-console .configurator-row")];
    const bad = rows.map(row => {
      const t = row.querySelector("[role=slider]"); const n = row.querySelector(".font-mono");
      return { label: row.querySelector("label")?.textContent?.trim(), seen: n?.textContent?.trim() ?? null,
               heard: t?.getAttribute("aria-valuetext") ?? null, valuenow: t?.getAttribute("aria-valuenow") ?? null };
    }).filter(x => x.heard !== x.seen);
    return { rows: rows.length, failing: bad.length, sample: bad.slice(0, 2) };
  })()`);
  gate("G4", "aria-valuetext === rendered readout on every row", r.failing === 0, r);
  await ctx.close();
}

// ───────────────────────────────────────────── G5 · reset is a declared domain
// PRODUCT: Reset restores exactly the paths the pane declares and touches nothing else.
// REDDENS: `Object.assign(config, structuredClone(defaults))` — a depth-1 merge —
//          against any live state nested inside a top-level key that defaults owns.
{
  const { ctx, page } = await open();
  const r = await page.evaluate(`(async () => {
    const el = document.querySelector(".config-console");
    let c = el && el.__vueParentComponent, hops = 0;
    while (c && !(c.props && c.props.config) && hops < 8) { c = c.parent; hops++; }
    if (!c) return { reached: false };
    const cfg = c.props.config;
    cfg.color.paletteStops = ["#ffbde0", "#ffdde5", "#fff6f6", "#fff6f4"];   // the live picker feed
    const before = JSON.stringify(cfg.color.paletteStops);
    [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Reset")?.click();
    await new Promise(r => setTimeout(r, 400));
    const after = JSON.stringify(cfg.color.paletteStops);
    return { reached: true, before, after, preserved: before === after };
  })()`);
  gate("G5", "Reset preserves every path outside the declared slider domain", r.preserved === true, r);
  await ctx.close();
}

// ───────────────────────────────────────────── G6 · the grouping is announced
// PRODUCT: each rendered section is a programmatic group with its title as name.
// REDDENS: a `<span>` heading over a border-bottom and no role.
{
  const { ctx, page } = await open();
  const r = await page.evaluate(`(() => {
    const con = document.querySelector(".config-console");
    const titles = con.querySelectorAll(".config-section-title, [data-slot=configurator-layer-title]").length;
    const groups = [...con.querySelectorAll('[role=group],fieldset')];
    const named = groups.filter(g => (g.getAttribute("aria-label") || g.getAttribute("aria-labelledby")));
    return { sections: titles, groups: groups.length, namedGroups: named.length };
  })()`);
  gate("G6", "every section is a named role=group", r.sections > 0 && r.namedGroups === r.sections, r);
  await ctx.close();
}

// ────────────────────── G7 · an absent optional branch cannot unmount the pane
// PRODUCT: a type-legal absent intermediate (AuroraAtoms.zones is `zones?:`) renders
//          without taking the pane down.
// REDDENS: `readPath(...) as number` handed to `v.toFixed(3)` in the render fn.
// NOTE: asserted on the MOUNT, never on `pageerror` — the ErrorBoundary swallows
//       this class entirely (measured: pageErrors [] / consoleErrors []).
{
  const { ctx, page } = await open({}, "/#/atmosphere");
  const r = await page.evaluate(`(async () => {
    const el = document.querySelector(".config-console");
    let c = el && el.__vueParentComponent, hops = 0;
    while (c && !(c.props && c.props.config) && hops < 8) { c = c.parent; hops++; }
    if (!c) return { reached: false };
    const rowsBefore = document.querySelectorAll(".config-console .configurator-row").length;
    c.props.config.zones = undefined;                       // type-legal: atoms.d.ts:145
    await new Promise(r => setTimeout(r, 600));
    return { reached: true, rowsBefore, mounted: !!document.querySelector(".config-console"),
             rowsAfter: document.querySelectorAll(".config-console .configurator-row").length,
             body: document.body.innerText.slice(0, 120).replace(/\\s+/g, " ") };
  })()`);
  gate("G7", "absent optional intermediate does not unmount the pane", r.mounted === true && r.rowsAfter === r.rowsBefore, r);
  await ctx.close();
}

// ─────────────────────────────────────── G8 · the copy action has a result state
// PRODUCT: a failed copy is observable (a live region or a control state change).
// REDDENS: `await writeClipboard(...)` with the CopyResult discarded.
{
  const { ctx, page } = await open();
  const r = await page.evaluate(`(async () => {
    const btn = [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Copy JSON");
    if (!btn) return { found: false };
    const bar = document.querySelector(".config-action-bar");
    const before = bar.textContent.trim();
    const saved = navigator.clipboard;
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true }); // the documented no-api arm
    btn.click();
    await new Promise(r => setTimeout(r, 600));
    const after = bar.textContent.trim();
    const live = document.querySelectorAll(".config-action-bar [aria-live], .config-action-bar [role=status], .config-console [aria-live]").length;
    Object.defineProperty(navigator, "clipboard", { value: saved, configurable: true });
    return { found: true, before, after, changed: before !== after, liveRegions: live,
             ariaDisabled: btn.getAttribute("aria-disabled") };
  })()`);
  gate("G8", "a failed Copy JSON is observable", r.changed === true || r.liveRegions > 0, r);
  await ctx.close();
}

// ───────────────────────── G9 · producer sizing engaged; no descendant correction
// PRODUCT: the rows carry the producer's `data-size` ladder and the demo holds no
//          `:deep()` correction over producer internals (VISUAL-CONSTITUTION:89).
// REDDENS: `class="gap-1.5 py-1"` + three `:deep()` rules + `data-size` unset.
{
  const { ctx, page } = await open();
  const live = await page.evaluate(`(() => {
    const rows = [...document.querySelectorAll(".config-console .configurator-row")];
    return { rows: rows.length, withDataSize: rows.filter(r => r.getAttribute("data-size")).length,
             minBlockSize: rows[0] && getComputedStyle(rows[0]).minBlockSize,
             renderedHeight: rows[0] && +rows[0].getBoundingClientRect().height.toFixed(2) };
  })()`);
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(join(ROOT, "demo/scenes/ConfigSliderPane.vue"), "utf8");
  const deepCount = (src.match(/:deep\(/g) || []).length;
  gate("G9", "producer size ladder engaged; zero :deep() corrections",
    deepCount === 0 && live.rows > 0 && live.withDataSize === live.rows, { deepCount, ...live });
  await ctx.close();
}

// ─────────────────────────────────────────── G10 · the behaviour gate exists
// PRODUCT: a unit suite that dies under the M1..M4 mutations.
// REDDENS: no such file — the entire component can be emptied and every gate stays green.
{
  const { existsSync: ex } = await import("node:fs");
  const spec = join(ROOT, "demo/test/scenes/config-slider-pane.test.ts");
  gate("G10", "a behavioural unit suite exists for the pane", ex(spec), { spec: "demo/test/scenes/config-slider-pane.test.ts", exists: ex(spec) });
}

await browser.close();

const red = results.filter((r) => r.verdict === "RED");
console.log(JSON.stringify({ base: BASE, gates: results, redCount: red.length }, null, 1));
process.exit(red.length === 0 ? 0 : 1);
