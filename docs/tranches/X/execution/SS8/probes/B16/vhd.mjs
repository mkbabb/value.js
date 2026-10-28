// SS-8 B16 — VersionHistoryDrawer witnesses SS8-0468..0476. Headless; one browser per run (engine = argv[2]),
// a new context per cell, all closed in finally. The palette API is mocked (lib.mjs): the wall carries remote
// palettes with versionCount 3 owned by the seeded slug, so the card menu offers "Versions" and the drawer
// offers Revert. No write reaches the shared dev API.
// Usage: node vhd.mjs chromium <cells…>   (cells: rest coarse race)
//        node vhd.mjs webkit   <cells…>   (cells: wk-focus wk-forced)
import { chromium, webkit, newCell, mockApi, wallPalette, versions, save, EV, APP } from "./lib.mjs";
const engine = process.argv[2]; const want = process.argv.slice(3);
const out = { engine };
const A = wallPalette({ name: "Harbor dusk", slug: "harbor-dusk-ss8" });
const B = wallPalette({ name: "Moss bank", slug: "moss-bank-ss8", currentHash: "payload-3", colors: [{ css: "#14532d", position: 0 }, { css: "#86efac", position: 1 }] });
const tagged = (slug, tag) => versions(slug).map((v) => ({ ...v, name: `${tag} r${v.revisionNo}` }));
const dlg = '[role="dialog"]';

async function openVersions(page, name, tap = false) {
  const card = page.locator(`[role="article"][aria-label="Palette: ${name}"]`).first();
  await card.waitFor({ state: "visible", timeout: 10000 });
  const m = card.getByRole("button", { name: "Palette menu" });
  if (tap) await m.tap(); else await m.click();
  await page.waitForTimeout(450);
  const it = page.getByRole("menuitem", { name: /Versions/ }).first();
  if (tap) await it.tap(); else await it.click();
}
const readRows = (page) => page.evaluate((sel) => {
  const d = document.querySelector(sel); if (!d) return null;
  const desc = d.querySelector('[data-slot="dialog-description"], p')?.textContent.replace(/\s+/g, " ").trim();
  const wells = [...d.querySelectorAll(".bg-well")];
  return { desc, rows: wells.map((w) => w.textContent.replace(/\s+/g, " ").trim().slice(0, 80)) };
}, dlg);

const launcher = engine === "webkit" ? webkit : chromium;
const b = await launcher.launch({ headless: true });
try {
  for (const cell of want) {
    const rec = (out[cell] = {});
    const coarse = cell === "coarse";
    const forced = cell === "wk-forced" || cell === "forced";
    const { ctx, page, errs } = await newCell(b, coarse ? { w: 390, h: 844, mobile: engine === "chromium", hasTouch: true } : { forcedColors: forced ? "active" : "none" });
    try {
      const log = [];
      await mockApi(ctx, { wall: [A, B], log, versionDelay: cell === "race" ? { "harbor-dusk-ss8": 2000 } : {}, versionsFor: { "harbor-dusk-ss8": tagged("harbor-dusk-ss8", "HARBOR"), "moss-bank-ss8": tagged("moss-bank-ss8", "MOSS") } });
      await page.goto(APP + "#/browse", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      rec.media = await page.evaluate(() => ({ hover: matchMedia("(hover: hover)").matches, anyHover: matchMedia("(any-hover: hover)").matches, coarse: matchMedia("(pointer: coarse)").matches, forced: matchMedia("(forced-colors: active)").matches }));
      if (cell === "race") {
        // VHD-9: open A (its versions answer in 2 s), dismiss at once, open B; read B's drawer after A's page lands.
        await openVersions(page, "Harbor dusk"); await page.waitForTimeout(150);
        await page.keyboard.press("Escape"); await page.waitForTimeout(500);
        await openVersions(page, "Moss bank"); await page.waitForTimeout(3000);
        rec.crossPalette = await readRows(page);
        await page.keyboard.press("Escape"); await page.waitForTimeout(600);
        // VHD-13: rapid reopen of the same palette (A, 2 s answer) — count the version fetches.
        const n0 = log.filter((x) => /harbor-dusk-ss8\/versions/.test(x.p)).length;
        await openVersions(page, "Harbor dusk"); await page.waitForTimeout(120);
        await page.keyboard.press("Escape"); await page.waitForTimeout(350);
        await openVersions(page, "Harbor dusk");
        const samples = [];
        for (let i = 0; i < 16; i++) { samples.push(await readRows(page)); await page.waitForTimeout(200); }
        rec.rapidReopen = { fetches: log.filter((x) => /harbor-dusk-ss8\/versions/.test(x.p)).length - n0, descTimeline: [...new Set(samples.map((s) => s?.desc))], final: samples.at(-1) };
      } else if (cell === "wk-focus") {
        // D-03: WebKit focus alternation inside the open modal — poll activeElement per frame for 1.6 s.
        await page.evaluate(() => { window.__f = []; const t0 = performance.now(); let last = "";
          const tick = () => { const a = document.activeElement; const k = a ? `${a.tagName}:${(a.getAttribute("aria-label") ?? a.textContent ?? "").trim().slice(0, 24)}` : "null";
            if (k !== last) { window.__f.push({ t: +(performance.now() - t0).toFixed(0), k }); last = k; } if (performance.now() - t0 < 4000) requestAnimationFrame(tick); };
          requestAnimationFrame(tick); });
        await openVersions(page, "Harbor dusk"); await page.waitForTimeout(1600);
        rec.focusTimeline = await page.evaluate(() => window.__f);
        for (let i = 0; i < 3; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(150); }
        rec.afterTabs = await page.evaluate((sel) => ({ k: `${document.activeElement?.tagName}:${(document.activeElement?.textContent ?? "").trim().slice(0, 24)}`, inDialog: !!document.activeElement?.closest(sel) }), dlg);
      } else {
        await openVersions(page, "Harbor dusk", coarse); await page.waitForTimeout(1500);
        rec.rows = await readRows(page);
        // U-1: the current row's ring vs its scroll container.
        rec.clip = await page.evaluate((sel) => {
          const d = document.querySelector(sel); const cur = d && [...d.querySelectorAll(".bg-well")].find((w) => w.classList.contains("ring-2"));
          if (!cur) return { current: null };
          let sc = cur.parentElement; while (sc && !/(auto|scroll|hidden|clip)/.test(getComputedStyle(sc).overflowY + getComputedStyle(sc).overflowX)) sc = sc.parentElement;
          const r = cur.getBoundingClientRect(), s = sc.getBoundingClientRect(), cs = getComputedStyle(sc);
          const bl = parseFloat(cs.borderLeftWidth), br = parseFloat(cs.borderRightWidth), bt = parseFloat(cs.borderTopWidth);
          const pad = { left: s.left + bl, right: s.right - br, top: s.top + bt };
          return { boxShadow: getComputedStyle(cur).boxShadow.slice(0, 160), outline: getComputedStyle(cur).outlineStyle,
            row: { l: +r.left.toFixed(1), r: +r.right.toFixed(1), t: +r.top.toFixed(1) }, scroller: { cls: sc.className.toString().slice(0, 90), ox: cs.overflowX, oy: cs.overflowY, l: +pad.left.toFixed(1), r: +pad.right.toFixed(1), t: +pad.top.toFixed(1), pl: cs.paddingLeft, pr: cs.paddingRight, scrollTop: sc.scrollTop },
            roomLeft: +(r.left - pad.left).toFixed(1), roomRight: +(pad.right - r.right).toFixed(1), roomTop: +(r.top - pad.top + sc.scrollTop).toFixed(1),
            markerLeftPx: !!d.querySelector('[class*="-left-px"]') };
        }, dlg);
        // U-6 / U-8: the revert action's visibility and the row baseline numbers.
        rec.actions = await page.evaluate((sel) => [...document.querySelectorAll(`${sel} button`)].filter((x) => /Revert/.test(x.textContent)).map((x) => { const s = getComputedStyle(x); const r = x.getBoundingClientRect(); return { text: x.textContent.trim(), opacity: s.opacity, visibility: s.visibility, w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; }), dlg);
        rec.baseline = await page.evaluate((sel) => { const d = document.querySelector(sel); const r = d.getBoundingClientRect(); const w = d.querySelector(".bg-well"); const ws = w && getComputedStyle(w);
          const sw = d.querySelector(".bg-well [style*='background']"); const cs0 = getComputedStyle(d); return { sheet: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1), vw: innerWidth, vh: innerHeight, pos: cs0.position, top: cs0.top, rightCss: cs0.right, bottomCss: cs0.bottom, left: cs0.left, transform: cs0.transform, cls: d.className.toString().slice(0, 200) }, well: ws && { bg: ws.backgroundColor, border: ws.borderTopColor, radius: ws.borderTopLeftRadius, h: +w.getBoundingClientRect().height.toFixed(1) },
            swatch: sw ? { bg: getComputedStyle(sw).backgroundColor, fca: getComputedStyle(sw).forcedColorAdjust } : null, ringColor: getComputedStyle(d.querySelector(".ring-2") ?? d).getPropertyValue("--tw-ring-color").trim() }; }, dlg);
        await page.screenshot({ path: EV + `vhd-${engine}-${cell}.png` });
      }
      rec.errs = errs.slice(0, 6);
    } catch (e) { rec.error = String(e).slice(0, 500); } finally { await ctx.close(); }
  }
} finally { await b.close(); save(`vhd-${engine}-${want.join("-")}.json`, out); }
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify(v).slice(0, 2200));
