// SS8 B11 — FlagReportDialog items SS8-0309..0315 (headless chromium, one browser, one context per cell).
import { writeFileSync } from "node:fs";
import { withBrowser, cell, mockApi, gotoBrowse, cardMenu, desc, pixels, oklabL, rgbOf, EV } from "./lib.mjs";
const out = {};
const openDialog = async (page, how = "mouse") => {
  if (how === "keyboard") {
    const card = page.getByRole("article", { name: "Palette: Probe Palette 1" });
    await card.getByRole("button", { name: "Palette menu" }).focus();
    await page.keyboard.press("Enter");
    await page.getByRole("menu").waitFor();
    await page.getByRole("menuitem", { name: "Report" }).focus();
    await page.keyboard.press("Enter");
  } else {
    await cardMenu(page, 1);
    await page.getByRole("menuitem", { name: "Report" }).click();
  }
  const dlg = page.getByRole("dialog", { name: "Report palette" });
  await dlg.waitFor();
  await page.waitForTimeout(400);
  return dlg;
};
const radios = (page) => page.getByRole("dialog").getByRole("radio").evaluateAll((rs) => rs.map((r) => `${r.id}:${r.getAttribute("aria-checked")}/${r.getAttribute("data-state")}`));
const trace = async (page, ms = [0, 100, 300, 700, 1200]) => {
  const t = []; let last = 0;
  for (const m of ms) { await page.waitForTimeout(m - last); last = m; t.push(`${m}ms:${await page.evaluate(desc)}:dialog=${await page.getByRole("dialog").count()}`); }
  return t;
};

await withBrowser(async (b) => {
  // C-9 + H-1 — four close paths, mouse-opened; plus a keyboard-opened submit.
  for (const [name, how, path, status] of [
    ["submit-ok", "mouse", "submit", 200], ["submit-fail", "mouse", "submit", 500],
    ["cancel", "mouse", "cancel", 200], ["escape", "mouse", "escape", 200],
    ["kbd-submit-ok", "keyboard", "submit", 200], ["kbd-cancel", "keyboard", "cancel", 200],
  ]) {
    out[name] = await cell(b, {}, async (page) => {
      await mockApi(page, { flagStatus: status, flagDelay: 500 });
      await gotoBrowse(page);
      const dlg = await openDialog(page, how);
      const r = { focusOnOpen: await page.evaluate(desc), radiosOnOpen: await radios(page) };
      if (path === "submit") {
        await dlg.getByRole("radio").nth(1).click();
        const report = dlg.getByRole("button", { name: /Report/ });
        if (how === "keyboard") { await report.focus(); await page.keyboard.press("Enter"); } else await report.click();
        await page.waitForTimeout(60);
        r.pending = await page.evaluate(() => { const b = [...document.querySelectorAll("[role=dialog] button")].find((x) => /Report/.test(x.textContent)); return { disabled: b?.disabled, ariaBusy: b?.getAttribute("aria-busy"), ariaDisabled: b?.getAttribute("aria-disabled") }; });
        r.trace = await trace(page);
        if (status >= 400) {
          r.alert = await page.getByRole("alert").allInnerTexts();
          r.radiosAfterFail = await radios(page);
        }
      } else if (path === "cancel") {
        const c = dlg.getByRole("button", { name: "Cancel" });
        if (how === "keyboard") { await c.focus(); await page.keyboard.press("Enter"); } else await c.click();
        r.trace = await trace(page);
      } else {
        await page.keyboard.press("Escape");
        r.trace = await trace(page);
      }
      // H-1 re-open: does a fresh open carry a pre-selected reason?
      if ((await page.getByRole("dialog").count()) === 0) {
        await openDialog(page, "mouse");
        r.radiosOnReopen = await radios(page);
      }
      return r;
    });
  }

  // Dark scheme textarea reading (0311) + D-8 overflow (0312) + ratio (0315), at two viewports.
  for (const [name, vp, scheme] of [["dark-1280", { width: 1280, height: 900 }, "dark"], ["light-1280", { width: 1280, height: 900 }, "light"], ["light-390", { width: 390, height: 844 }, "light"]]) {
    out[name] = await cell(b, { viewport: vp, colorScheme: scheme }, async (page) => {
      await mockApi(page); await gotoBrowse(page);
      const dlg = await openDialog(page);
      const geo = await page.evaluate(() => {
        const d = document.querySelector("[role=dialog]"); const ta = d.querySelector("textarea");
        const cs = getComputedStyle(ta); const ds = getComputedStyle(d);
        const dr = d.getBoundingClientRect(), tr = ta.getBoundingClientRect();
        return { taClass: ta.className, taBg: cs.backgroundColor, taColor: cs.color, taBorder: cs.borderTopColor + " " + cs.borderTopWidth, dlgBg: ds.backgroundColor, dlgBackdrop: ds.backdropFilter, taH: tr.height, dlgH: dr.height, pct: +(100 * tr.height / dr.height).toFixed(1), taRect: [tr.x, tr.y, tr.width, tr.height], lineH: cs.lineHeight, font: cs.fontSize, pad: cs.paddingTop + "/" + cs.paddingBottom, rows: ta.rows, fieldSizing: cs.fieldSizing, resize: cs.resize, minH: cs.minHeight, maxH: cs.maxHeight };
      });
      // pixel: textarea interior vs the dialog surface just above the textarea's top-left
      const shot = await page.screenshot();
      const dpr = await page.evaluate(() => devicePixelRatio);
      const [x, y, w] = geo.taRect;
      const px = await pixels(page, shot, { x: Math.round((x + w / 2) * dpr), y: Math.round((y + 6) * dpr), w: 1, h: 1 });
      const sx = Math.round((x + 4) * dpr), sy = Math.round((y - 4) * dpr);
      const surf = await pixels(page, shot, { x: sx, y: sy, w: 1, h: 1 });
      geo.taPixel = px.data.slice(0, 3); geo.surfacePixel = surf.data.slice(0, 3);
      geo.dL = +(oklabL(geo.surfacePixel) - oklabL(geo.taPixel)).toFixed(3);
      geo.dLcomputed = +(oklabL(geo.surfacePixel) - oklabL(rgbOf(geo.taBg))).toFixed(3);
      if (name === "dark-1280") await dlg.screenshot({ path: EV + "flag-dark-1280.png" });
      // D-8: type six lines, read the overflow figures
      await dlg.locator("textarea").fill("line one\nline two\nline three\nline four\nline five\nline six");
      geo.overflow = await page.evaluate(() => { const t = document.querySelector("[role=dialog] textarea"); const cs = getComputedStyle(t); const lh = parseFloat(cs.lineHeight); const inner = t.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom); return { scrollH: t.scrollHeight, clientH: t.clientHeight, hiddenPx: t.scrollHeight - t.clientHeight, visibleLines: +(inner / lh).toFixed(3), lh }; });
      return geo;
    });
  }

  // H-2 forced colors (0313)
  out["forced-colors"] = await cell(b, { forcedColors: "active", colorScheme: "light" }, async (page) => {
    await mockApi(page); await gotoBrowse(page);
    const dlg = await openDialog(page);
    const ta = dlg.locator("textarea");
    const rest = await ta.evaluate((t) => { const c = getComputedStyle(t); return { fca: c.forcedColorAdjust, bg: c.backgroundColor, color: c.color, border: `${c.borderTopStyle} ${c.borderTopWidth} ${c.borderTopColor}`, outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, shadow: c.boxShadow }; });
    await ta.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
    const focused = await ta.evaluate((t) => { const c = getComputedStyle(t); return { isFocus: document.activeElement === t, fv: t.matches(":focus-visible"), outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, border: `${c.borderTopStyle} ${c.borderTopWidth} ${c.borderTopColor}`, shadow: c.boxShadow }; });
    const dlgCs = await dlg.evaluate((d) => { const c = getComputedStyle(d); return { bg: c.backgroundColor, border: `${c.borderTopStyle} ${c.borderTopWidth} ${c.borderTopColor}` }; });
    await dlg.screenshot({ path: EV + "flag-forced-colors-focus.png" });
    return { rest, focused, dlgCs };
  });

  // H-3 200% zoom (viewport 640x450 @ DSF 2 ≡ 1280x900 at 200%) + root text scaling 200%
  for (const [name, opt, textScale] of [["zoom200", { viewport: { width: 640, height: 450 }, deviceScaleFactor: 2 }, false], ["text200", {}, true]]) {
    out[name] = await cell(b, opt, async (page) => {
      await mockApi(page); await gotoBrowse(page);
      if (textScale) await page.addStyleTag({ content: "html{font-size:200% !important}" });
      const dlg = await openDialog(page);
      await dlg.locator("textarea").fill("line one\nline two\nline three\nline four");
      const r = await page.evaluate(() => { const d = document.querySelector("[role=dialog]"); const t = d.querySelector("textarea"); const c = getComputedStyle(t); const lh = parseFloat(c.lineHeight); const inner = t.clientHeight - parseFloat(c.paddingTop) - parseFloat(c.paddingBottom); const dr = d.getBoundingClientRect(); return { font: c.fontSize, lh, taH: t.clientHeight, visibleLines: +(inner / lh).toFixed(3), hiddenPx: t.scrollHeight - t.clientHeight, dlg: [dr.top, dr.bottom, innerHeight], dlgScrollable: d.scrollHeight > d.clientHeight || [...d.querySelectorAll("*")].some((e) => e.scrollHeight > e.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(e).overflowY)) }; });
      if (name === "zoom200") await page.screenshot({ path: EV + "flag-zoom200.png" });
      return r;
    });
  }
});
writeFileSync(EV + "flag.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
