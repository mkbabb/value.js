import { chromium, devices } from "@playwright/test";

const FS = "/@fs/Users/mkbabb/Programming/value.js/demo/color-session/generate-color.ts";
const browser = await chromium.launch();

// ── A) MOBILE: is the dock action bar wired to the generate pane at all? ──
const mctx = await browser.newContext({ ...devices["iPhone 14"] });
const mp = await mctx.newPage();
await mp.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" });
await mp.waitForSelector("[data-generate-plate]", { timeout: 20000 });
await mp.waitForTimeout(900);

const seedOf = (p) => p.evaluate(() => {
  const el = [...document.querySelectorAll("[data-generate-plate] p")].find((n) => /seed:/.test(n.textContent || ""));
  return el ? el.textContent.trim() : null;
});

const mobile = {};
mobile.seedBefore = await seedOf(mp);
mobile.dockButtons = await mp.evaluate(() => {
  const dock = document.querySelector(".glass-dock");
  if (!dock) return null;
  return [...dock.querySelectorAll("button,[role=button]")].map((b) => (b.getAttribute("aria-label") || b.getAttribute("title") || b.textContent || "").trim().slice(0, 26)).filter(Boolean);
});
// Try the dock Regenerate (the action-bar route) on mobile.
mobile.regenClick = await mp.evaluate(() => {
  const dock = document.querySelector(".glass-dock");
  if (!dock) return "no dock";
  const b = [...dock.querySelectorAll("button,[role=button]")].find((x) => /regenerate/i.test((x.getAttribute("aria-label") || x.getAttribute("title") || x.textContent || "")));
  if (!b) return "no dock Regenerate button visible (may be behind the Tools group)";
  b.click();
  return "clicked";
});
await mp.waitForTimeout(400);
mobile.seedAfterDockRegen = await seedOf(mp);
// Control: the in-plate Regenerate must still work on mobile.
await mp.click('[data-generate-plate] button:has-text("Regenerate")');
await mp.waitForTimeout(300);
mobile.seedAfterPlateRegen = await seedOf(mp);
mobile.plateSwatchTapTargets = await mp.evaluate(() =>
  [...document.querySelectorAll(".generate-swatch")].map((s) => { const r = s.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), pe: getComputedStyle(s).pointerEvents }; }).slice(0, 2));
await mctx.close();

// ── B) DESKTOP: perf + domain boundary, importing the real module over /@fs/ ──
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const dp = await dctx.newPage();
await dp.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" });
await dp.waitForSelector("[data-generate-plate]", { timeout: 20000 });

const perf = await dp.evaluate(async (fs) => {
  const mod = await import(fs).catch((e) => ({ __err: String(e).slice(0, 160) }));
  if (mod.__err) return mod;
  const { generatePalette, PRESET_NAMES, HARMONY_NAMES } = mod;
  const seed = 123456;
  const pass = (n) => { PRESET_NAMES.forEach((p) => generatePalette(n, p, "golden", seed)); };
  for (let i = 0; i < 10; i++) pass(12);
  const time = (fn, N) => { const t0 = performance.now(); for (let i = 0; i < N; i++) fn(); return +((performance.now() - t0) / N).toFixed(3); };
  return {
    presets: PRESET_NAMES.length,
    harmonies: HARMONY_NAMES.length,
    ms_open_preset_menu_count5: time(() => PRESET_NAMES.forEach((p) => generatePalette(5, p, "golden", seed)), 200),
    ms_open_preset_menu_count12: time(() => PRESET_NAMES.forEach((p) => generatePalette(12, p, "golden", seed)), 200),
    ms_one_generatePalette_count12: time(() => generatePalette(12, "vibrant", "golden", seed), 2000),
  };
}, FS);

const boundary = await dp.evaluate(async (fs) => {
  const mod = await import(fs).catch((e) => ({ __err: String(e).slice(0, 160) }));
  if (mod.__err) return mod;
  const { generatePalette, generateSingleColor } = mod;
  const P = (label, fn) => { try { const v = fn(); return { label, ok: true, out: Array.isArray(v) ? { len: v.length, first: v[0], last: v[v.length - 1] } : v }; } catch (e) { return { label, ok: false, err: String(e).slice(0, 160) }; } };
  return [
    P("count=0", () => generatePalette(0, "vibrant", "golden", 1)),
    P("count=-3", () => generatePalette(-3, "vibrant", "golden", 1)),
    P("count=NaN", () => generatePalette(NaN, "vibrant", "golden", 1)),
    P("count=1 analogous warm", () => generatePalette(1, "warm", "analogous", 1)),
    P("seed=NaN", () => generatePalette(5, "vibrant", "golden", NaN)),
    P("seed=-1", () => generatePalette(5, "vibrant", "golden", -1)),
    P("seed=2^53", () => generatePalette(5, "vibrant", "golden", 2 ** 53)),
    P("seed=0", () => generatePalette(5, "vibrant", "golden", 0)),
    P("seed=undefined (Math.random path)", () => generatePalette(3, "vibrant", "golden", undefined)),
    P("warm x12 hue-clamp", () => generatePalette(12, "warm", "golden", 42)),
    P("cool x12 hue-clamp", () => generatePalette(12, "cool", "golden", 42)),
    P("earth x12 hue-clamp", () => generatePalette(12, "earth", "golden", 42)),
    P("bad preset name", () => generatePalette(3, "nope", "golden", 1)),
    P("bad harmony name", () => generatePalette(3, "vibrant", "nope", 1)),
    P("generateSingleColor default rng", () => generateSingleColor("neon")),
  ];
}, FS);

// C) hue-clamp distribution check: does 'warm' actually stay warm across 12?
const hueCheck = await dp.evaluate(async (fs) => {
  const mod = await import(fs).catch(() => null);
  if (!mod) return null;
  const out = {};
  for (const preset of ["warm", "cool", "earth"]) {
    const seen = new Set();
    for (let s = 0; s < 40; s++) mod.generatePalette(12, preset, "golden", s).forEach((c) => seen.add(c));
    out[preset] = { distinct: seen.size, sample: [...seen].slice(0, 3) };
  }
  return out;
}, FS);

// D) the copy verb: what does writeClipboard actually return in this context, and is it checked?
const clip = await dp.evaluate(async () => {
  return { hasClipboard: !!navigator.clipboard, isSecure: window.isSecureContext, permissionsApi: !!navigator.permissions };
});

console.log(JSON.stringify({ mobile, perf, boundary, hueCheck, clip }, null, 1));
await browser.close();
