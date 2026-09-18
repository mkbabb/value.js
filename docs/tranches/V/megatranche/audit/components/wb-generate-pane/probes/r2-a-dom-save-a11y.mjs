import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + String(e).slice(0, 200)));

await page.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" });
await page.waitForSelector("[data-generate-plate]", { timeout: 20000 });
await page.waitForTimeout(700);

const result = await page.evaluate(() => {
  const out = {};
  const sw = [...document.querySelectorAll(".generate-swatch")];
  out.swatchCount = sw.length;
  const s0 = sw[0];
  out.swatch = {
    tagName: s0.tagName,
    ariaHidden: s0.getAttribute("aria-hidden"),
    ariaLabel: s0.getAttribute("aria-label"),
    tagAttr: s0.getAttribute("tag"),
    role: s0.getAttribute("role"),
    tabIndex: s0.tabIndex,
    pointerEvents: getComputedStyle(s0).pointerEvents,
    cursor: getComputedStyle(s0).cursor,
    attrs: [...s0.attributes].map((a) => a.name),
    rect: (r => ({ w: Math.round(r.width), h: Math.round(r.height) }))(s0.getBoundingClientRect()),
  };
  const r0 = s0.getBoundingClientRect();
  const hit = document.elementFromPoint(r0.left + r0.width / 2, r0.top + r0.height / 2);
  out.swatchHitTest = hit ? `<${hit.tagName}> ${String(hit.className).slice(0, 70)}` : null;

  const plate = document.querySelector("[data-generate-plate]");
  out.plate = {
    ariaLabel: plate.getAttribute("aria-label"),
    buttons: [...plate.querySelectorAll("button")].map((b) => ({
      name: (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 24),
      w: Math.round(b.getBoundingClientRect().width),
      h: Math.round(b.getBoundingClientRect().height),
    })),
    focusables: [...plate.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')].length,
    liveRegions: plate.querySelectorAll("[aria-live],[role=status],[role=alert]").length,
  };
  out.paneLiveRegions = document.querySelectorAll("[aria-live],[role=status],[role=alert]").length;

  const thumb = document.querySelector('[role="slider"]');
  if (thumb) {
    const tr = thumb.getBoundingClientRect();
    out.sliderThumb = { tag: thumb.tagName, w: Math.round(tr.width), h: Math.round(tr.height), aria: thumb.getAttribute("aria-label"), valuenow: thumb.getAttribute("aria-valuenow") };
  }
  const strip = plate.querySelector(".rounded-t-card");
  out.strip = strip ? { tag: strip.tagName, cls: String(strip.className).slice(0, 60), ariaHidden: strip.getAttribute("aria-hidden"), role: strip.getAttribute("role"), text: (strip.textContent || "").trim().slice(0, 40) } : null;
  return out;
});

const before = await page.evaluate(() => localStorage.getItem("color-palettes"));
await page.fill('[data-generate-plate] input[aria-label="Palette name"]', "AUDIT-PROBE-NAME-XYZ");
await page.waitForTimeout(120);
const typed = await page.inputValue('[data-generate-plate] input[aria-label="Palette name"]');
await page.click('[data-generate-plate] button[aria-label="Save palette"]');
await page.waitForTimeout(500);
const saved = await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem("color-palettes") || "{}");
  return (s.palettes || []).map((p) => ({ name: p.name, slug: p.slug, n: (p.colors || []).length }));
});

let swatchClickError = null;
try { await page.click(".generate-swatch", { timeout: 2500 }); }
catch (e) { swatchClickError = String(e).split("\n").slice(0, 4).join(" | "); }

const tabOrder = await page.evaluate(() => {
  const plate = document.querySelector("[data-generate-plate]");
  return [...plate.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
    .map((el) => `${el.tagName}:${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 20)}`);
});

const perf = await page.evaluate(async () => {
  const mod = await import("/demo/color-session/generate-color.ts").catch((e) => ({ __err: String(e).slice(0, 120) }));
  if (mod.__err) return mod;
  const { generatePalette, PRESET_NAMES, HARMONY_NAMES } = mod;
  const seed = 123456;
  for (let i = 0; i < 5; i++) PRESET_NAMES.forEach((p) => generatePalette(12, p, "golden", seed));
  const N = 50, t0 = performance.now();
  for (let i = 0; i < N; i++) {
    PRESET_NAMES.forEach((p) => generatePalette(12, p, "golden", seed));
    HARMONY_NAMES.forEach((h) => generatePalette(12, "vibrant", h, seed));
  }
  return { presets: PRESET_NAMES.length, harmonies: HARMONY_NAMES.length, msPerFullPreviewPass_count12: +((performance.now() - t0) / N).toFixed(3) };
});

const boundary = await page.evaluate(async () => {
  const mod = await import("/demo/color-session/generate-color.ts").catch((e) => ({ __err: String(e).slice(0, 120) }));
  if (mod.__err) return mod;
  const { generatePalette } = mod;
  const probe = (label, fn) => { try { const v = fn(); return { label, ok: true, out: Array.isArray(v) ? { len: v.length, first: v[0] } : v }; } catch (e) { return { label, ok: false, err: String(e).slice(0, 140) }; } };
  return [
    probe("count=0", () => generatePalette(0, "vibrant", "golden", 1)),
    probe("count=-3", () => generatePalette(-3, "vibrant", "golden", 1)),
    probe("count=NaN", () => generatePalette(NaN, "vibrant", "golden", 1)),
    probe("count=1 analogous", () => generatePalette(1, "warm", "analogous", 1)),
    probe("count=1e5 neon random", () => { const t = performance.now(); const v = generatePalette(100000, "neon", "random", 1); return `${v.length} in ${Math.round(performance.now() - t)}ms`; }),
    probe("seed=NaN", () => generatePalette(5, "vibrant", "golden", NaN)),
    probe("seed=-1", () => generatePalette(5, "vibrant", "golden", -1)),
    probe("seed=2^53", () => generatePalette(5, "vibrant", "golden", 2 ** 53)),
    probe("warm hue-clamp x12", () => generatePalette(12, "warm", "golden", 42)),
    probe("cool hue-clamp x12", () => generatePalette(12, "cool", "golden", 42)),
    probe("earth hue-clamp x12", () => generatePalette(12, "earth", "golden", 42)),
  ];
});

await page.evaluate((b) => { if (b === null) localStorage.removeItem("color-palettes"); else localStorage.setItem("color-palettes", b); }, before);
console.log(JSON.stringify({ ...result, typed, savedPalettes: saved, swatchClickError, tabOrder, perf, boundary, consoleErrors }, null, 1));
await browser.close();
