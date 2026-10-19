// SS-8 B16 — PaletteRenameInput (at HEAD: shared/ui/PaletteNameInput.vue `commit` mode inside
// palettes/inspector/PaletteInspector.vue) witnesses SS8-0461..0467. Headless Chromium, one browser per run,
// a new context per cell, all closed in finally. Local palettes are seeded (context-scoped localStorage);
// the API is mocked so no write reaches the shared dev API.
// Usage: node rename.mjs <cell…>   cells: light dark reduce coarse
import { chromium, newCell, mockApi, save, EV, APP } from "./lib.mjs";
const now = new Date().toISOString();
const mk = (i, name, cols) => ({ id: `ss8-local-${i}`, name, slug: `ss8-local-${i}`, colors: cols.map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true });
const SEED = JSON.stringify({ version: 1, palettes: [mk(1, "Harbor dusk at low tide", ["oklch(0.45 0.12 250)", "oklch(0.7 0.1 200)", "oklch(0.85 0.08 80)"])] });
const want = process.argv.slice(2);
const out = {};
const CARD = '[role="article"][aria-label="Palette: Harbor dusk at low tide"]';

async function openRename(page, tap = false) {
  const card = page.locator(CARD).first();
  await card.waitFor({ state: "visible", timeout: 10000 });
  const menuBtn = card.getByRole("button", { name: "Palette menu" });
  if (tap) await menuBtn.tap(); else await menuBtn.click();
  await page.waitForTimeout(500);
  const item = page.getByRole("menuitem", { name: /Rename/ }).first();
  if (tap) await item.tap(); else await item.click();
}
// Per-frame sampler: the card's transform/scale and the rename row's box during a window.
const startSampler = (page) => page.evaluate((sel) => {
  window.__ss8 = []; const t0 = performance.now(); const card = document.querySelector(sel);
  const tick = () => {
    const row = card.querySelector(".rename-morph"); const cs = getComputedStyle(card);
    window.__ss8.push({ t: +(performance.now() - t0).toFixed(1), tf: cs.transform, scale: cs.scale, inl: card.getAttribute("style")?.slice(0, 140) ?? "",
      row: row ? { h: +row.getBoundingClientRect().height.toFixed(1), sh: row.scrollHeight, mh: getComputedStyle(row).maxHeight, cls: row.className.toString().replace(/\s+/g, " ").slice(-90) } : null });
    if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}, CARD);
const scaleDev = (s) => { // max |1 - k| over the transform matrix / scale samples
  let m = 0; for (const x of s) {
    const mm = x.tf.match(/matrix\(([^)]+)\)/); if (mm) { const [a, , , d] = mm[1].split(",").map(Number); m = Math.max(m, Math.abs(1 - a), Math.abs(1 - d)); }
    if (x.scale && x.scale !== "none") for (const v of x.scale.split(" ").map(Number)) m = Math.max(m, Math.abs(1 - v));
  } return +m.toFixed(4); };

const b = await chromium.launch({ headless: true });
try {
  for (const cell of want) {
    const rec = (out[cell] = {});
    const coarse = cell === "coarse";
    const { ctx, page, errs } = await newCell(b, coarse
      ? { w: 390, h: 844, mobile: true, hasTouch: true, seed: SEED }
      : { scheme: cell === "dark" ? "dark" : "light", reducedMotion: cell === "reduce" ? "reduce" : "no-preference", seed: SEED });
    try {
      await mockApi(ctx);
      await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      rec.media = await page.evaluate(() => ({ hover: matchMedia("(hover: hover)").matches, coarse: matchMedia("(pointer: coarse)").matches, prm: matchMedia("(prefers-reduced-motion: reduce)").matches }));
      const titleFont = await page.locator(CARD).first().evaluate((c) => {
        const t = [...c.querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent.trim() === "Harbor dusk at low tide");
        if (!t) return null; const s = getComputedStyle(t); return { tag: t.tagName, cls: t.className.toString().slice(0, 120), family: s.fontFamily, size: s.fontSize, weight: s.fontWeight, ls: s.letterSpacing };
      });
      rec.titleFont = titleFont;
      if (coarse) await startSampler(page);
      await openRename(page, coarse);
      if (coarse) { await page.waitForTimeout(1500); rec.enterSamples = await page.evaluate(() => window.__ss8); }
      else await page.waitForTimeout(900);
      const input = page.locator(`${CARD} input`).first();
      rec.field = await input.evaluate((el) => {
        const s = getComputedStyle(el); const card = el.closest("[role=article]");
        const row = el.closest(".rename-morph");
        return { active: document.activeElement === el, selStart: el.selectionStart, selEnd: el.selectionEnd, valueLen: el.value.length,
          cursor: s.cursor, cardCursor: getComputedStyle(card).cursor, formCursor: getComputedStyle(el.form ?? el.parentElement).cursor,
          family: s.fontFamily, size: s.fontSize, weight: s.fontWeight, ls: s.letterSpacing, cls: el.className.toString().slice(0, 200),
          aria: el.getAttribute("aria-label"), rowH: row ? +row.getBoundingClientRect().height.toFixed(1) : null, rowScrollH: row?.scrollHeight ?? null,
          rowMaxH: row ? getComputedStyle(row).maxHeight : null, controlHsm: getComputedStyle(document.documentElement).getPropertyValue("--control-h-sm").trim(),
          inputH: +el.getBoundingClientRect().height.toFixed(1), morphExpanded: row ? getComputedStyle(row).getPropertyValue("--vj-morph-expanded").trim() : null };
      });
      // AX: the focused node as the accessibility tree exposes it.
      const cdp = await ctx.newCDPSession(page);
      const ax = await cdp.send("Accessibility.getFullAXTree");
      const f = ax.nodes.find((n) => (n.properties ?? []).some((p) => p.name === "focused" && p.value.value));
      rec.axFocused = f ? { role: f.role?.value, name: f.name?.value, value: f.value?.value } : null;
      if (!coarse) {
        await input.hover(); await page.waitForTimeout(150);
        rec.cursorHovered = await input.evaluate((el) => getComputedStyle(el).cursor);
        // Press bleed: type characters including spaces into the focused field; sample the card per frame.
        await startSampler(page);
        await page.keyboard.press("End");
        for (const ch of [" ", "x", " ", " "]) { await page.keyboard.press(ch === " " ? "Space" : ch); await page.waitForTimeout(120); }
        await page.waitForTimeout(900);
        const s = await page.evaluate(() => window.__ss8);
        rec.press = { frames: s.length, maxScaleDeviation: scaleDev(s), distinctTransforms: [...new Set(s.map((x) => x.tf))].slice(0, 12), distinctInline: [...new Set(s.map((x) => x.inl))].slice(0, 8) };
        await page.locator(CARD).first().screenshot({ path: EV + `rename-1440-${cell}.png` });
      } else {
        // Leave: Cancel rename, sample the row's collapse.
        await startSampler(page);
        await page.getByRole("button", { name: "Cancel rename" }).tap(); await page.waitForTimeout(1500);
        rec.leaveSamples = (await page.evaluate(() => window.__ss8)).map((x) => ({ t: x.t, row: x.row })).filter((x) => x.row).slice(0, 40);
        rec.enterSamples = (rec.enterSamples ?? []).map((x) => ({ t: x.t, row: x.row })).filter((x) => x.row).slice(0, 60);
      }
      rec.errs = errs.slice(0, 6);
    } catch (e) { rec.error = String(e).slice(0, 500); } finally { await ctx.close(); }
  }
} finally { await b.close(); save(`rename-${want.join("-")}.json`, out); }
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify(v).slice(0, 2000));
