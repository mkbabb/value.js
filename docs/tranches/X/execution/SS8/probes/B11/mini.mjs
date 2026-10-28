// SS8 B11 — MiniColorPicker items SS8-0316..0326 (headless chromium, one browser, one context per cell).
import { writeFileSync } from "node:fs";
import { withBrowser, cell, mockApi, gotoBrowse, desc, pixels, contrast, EV } from "./lib.mjs";
const out = {};
const IPHONE14 = { viewport: { width: 390, height: 664 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const openTray = async (page) => {
  await page.getByRole("button", { name: /^Filters/ }).click();
  await page.getByRole("textbox", { name: "Search by CSS color" }).waitFor();
  await page.waitForTimeout(350);
};
const swatch = (page) => page.getByRole("button", { name: /^Open color picker/ });
const openPicker = async (page) => { await swatch(page).click(); await page.locator(".sv-canvas").waitFor(); await page.waitForTimeout(350); };
const colorVal = (page) => page.evaluate(() => document.querySelector('input[aria-label="Search by CSS color"]')?.value ?? "<unmounted>");
const readout = (page) => page.evaluate(() => document.querySelector(".sv-canvas")?.parentElement.querySelector(".font-mono")?.textContent.trim() ?? "<unmounted>");
const geo = (page) => page.evaluate(() => {
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom].map((v) => +v.toFixed(1)); };
  const sw = document.querySelector('[aria-label^="Open color picker"]');
  const pc = document.querySelector(".sv-canvas")?.closest("[role=dialog]");
  const tray = document.querySelector('input[aria-label="Search by CSS color"]')?.closest("[role=dialog]");
  const ov = (a, b) => { if (!a || !b) return null; const w = Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])), h = Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1])); return +(100 * w * h / ((a[2] - a[0]) * (a[3] - a[1]))).toFixed(1); };
  const scrollers = (e) => { const s = []; for (let n = e; n; n = n.parentElement) { const c = getComputedStyle(n); if (/auto|scroll/.test(c.overflowY) && n.scrollHeight > n.clientHeight + 1) s.push(n.tagName + "." + [...n.classList].slice(0, 2).join(".")); } return s; };
  return { vp: [innerWidth, innerHeight], swatch: r(sw), tray: r(tray), picker: r(pc), pickerSide: pc?.getAttribute("data-side"), eclipsePctOfTrigger: ov(r(sw), r(pc)), traySideAttr: tray?.getAttribute("data-side"), trayScrollers: tray ? scrollers(tray.querySelector("section") ?? tray) : null, pickerMaxH: pc ? getComputedStyle(pc).maxHeight : null, pickerOverflow: pc ? getComputedStyle(pc).overflowY : null, docScroll: [document.scrollingElement.scrollHeight, innerHeight] };
});

await withBrowser(async (b) => {
  // R-1 — the input's .value PROPERTY across open → type → close → re-open; R-11 focus restore; R-7 padding cascade
  out.r1_r7_r11 = await cell(b, {}, async (page) => {
    await mockApi(page); await gotoBrowse(page);
    const r = {};
    await openTray(page);
    r.valueOnOpen = await colorVal(page);
    r.attrOnOpen = await page.evaluate(() => document.querySelector('input[aria-label="Search by CSS color"]').getAttribute("value"));
    await openPicker(page);
    r.valueAfterPickerOpen = await colorVal(page);
    r.readoutAfterPickerOpen = await readout(page);
    // R-7: the picker content's padding and the cascade that sets it
    r.padding = await page.evaluate(() => {
      const pc = document.querySelector(".sv-canvas").closest("[role=dialog]"); const c = getComputedStyle(pc);
      const rules = [];
      const walk = (list, layer) => { for (const rule of list) { if (rule.cssRules && rule.constructor.name === "CSSLayerBlockRule") walk(rule.cssRules, (layer ? layer + "." : "") + rule.name); else if (rule.cssRules && rule.constructor.name !== "CSSStyleRule") walk(rule.cssRules, layer); else if (rule.selectorText && pc.matches(rule.selectorText.split(/(?<!\\),/).map((s) => s.trim()).filter((s) => !/::/.test(s)).join(",") || "#__none") && /padding/.test(rule.style.cssText)) rules.push({ sel: rule.selectorText.slice(0, 90), layer: layer || "UNLAYERED", pad: rule.style.cssText.match(/padding[^;]*/g)?.join("; ").slice(0, 160) }); } };
      for (const s of document.styleSheets) { try { walk(s.cssRules, ""); } catch {} }
      return { cls: pc.className.slice(0, 220), pt: c.paddingTop, pl: c.paddingLeft, rootFont: getComputedStyle(document.documentElement).fontSize, rules };
    });
    // R-11 — close via the picker's Search (parent flips `open`)
    await page.locator(".sv-canvas").locator("xpath=..").getByRole("button", { name: "Search" }).click();
    await page.waitForTimeout(500);
    r.focusAfterPickerSearch = await page.evaluate(desc);
    r.pickerMountedAfterSearch = await page.locator(".sv-canvas").count();
    // R-11 — Escape path
    await openPicker(page);
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    r.focusAfterPickerEscape = await page.evaluate(desc);
    r.trayStillOpen = await page.getByRole("textbox", { name: "Search by CSS color" }).count();
    // R-1 continued: type, close tray, reopen
    const input = page.getByRole("textbox", { name: "Search by CSS color" });
    if (!(await input.count())) await openTray(page);
    await input.fill("rebeccapurple");
    r.valueAfterType = await colorVal(page);
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    if (await input.count()) { await page.keyboard.press("Escape"); await page.waitForTimeout(400); }
    r.valueWhileClosed = await colorVal(page);
    await openTray(page);
    r.valueOnReopen = await colorVal(page);
    return r;
  });

  // R-3 — mid-press dismissal, then hover after re-open (stuck drag?)
  out.r3 = await cell(b, {}, async (page) => {
    await mockApi(page); await gotoBrowse(page); await openTray(page); await openPicker(page);
    const box = await page.locator(".sv-canvas").boundingBox();
    const r = { before: await readout(page) };
    await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.3);
    await page.mouse.down();
    r.duringPress = await readout(page);
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    r.pickerMountedMidPress = await page.locator(".sv-canvas").count();
    await page.mouse.move(box.x + 5, box.y + 5, { steps: 4 }); await page.mouse.up();
    await openPicker(page);
    const box2 = await page.locator(".sv-canvas").boundingBox();
    r.afterReopen = await readout(page);
    await page.mouse.move(box2.x + box2.width * 0.85, box2.y + box2.height * 0.85, { steps: 6 });
    await page.waitForTimeout(150);
    r.afterBareHover = await readout(page);
    r.stuckDrag = r.afterBareHover !== r.afterReopen;
    return r;
  });

  // R-4 — thumb ring scanlines at the default field and a light field (DSF 2)
  out.r4 = await cell(b, { deviceScaleFactor: 2 }, async (page) => {
    await mockApi(page); await gotoBrowse(page); await openTray(page); await openPicker(page);
    const res = {};
    for (const [name, fx, fy] of [["default", null, null], ["light-field", 0.02, 0.02], ["mid-field", 0.5, 0.15]]) {
      if (fx !== null) { const box = await page.locator(".sv-canvas").boundingBox(); await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy); await page.waitForTimeout(150); }
      const t = await page.evaluate(() => { const th = document.querySelector(".sv-canvas > div"); const b = th.getBoundingClientRect(); const c = getComputedStyle(th); return { rect: [b.left, b.top, b.width, b.height], bg: c.backgroundColor, shadow: c.boxShadow, border: c.borderTopColor }; });
      const shot = await page.screenshot();
      const [x, y, w, h] = t.rect; const cy = Math.round((y + h / 2) * 2); const x0 = Math.round((x - 6) * 2);
      const line = await pixels(page, shot, { x: x0, y: cy, w: 26, h: 1 });
      const px = []; for (let i = 0; i < line.w; i++) px.push(line.data.slice(i * 4, i * 4 + 3));
      // device-px offsets from x0: field at 0..5 (css -6..-3.5), ring at 11 (css -0.5), white border at 13..14 (css +0.5..+1)
      const field = px[2], ring = px[11], border = px[13];
      res[name] = { thumb: t, readout: await readout(page), scan: px.map((p) => p.join(",")).join(" | "), field, ring, border, ringVsField: +contrast(ring, field).toFixed(3), borderVsField: +contrast(border, field).toFixed(3), ringVsBorder: +contrast(ring, border).toFixed(3) };
    }
    await page.locator(".sv-canvas").screenshot({ path: EV + "mini-thumb-light-field-dsf2.png" });
    return res;
  });

  // R-5 — forced colors census of the instrument
  out.r5 = await cell(b, { forcedColors: "active" }, async (page) => {
    await mockApi(page); await gotoBrowse(page); await openTray(page); await openPicker(page);
    const cs = await page.evaluate(() => { const sv = document.querySelector(".sv-canvas"); const hue = sv.nextElementSibling; const f = (e) => { const c = getComputedStyle(e); return { fca: c.forcedColorAdjust, bgImage: c.backgroundImage.slice(0, 80), bg: c.backgroundColor, border: c.borderTopStyle + " " + c.borderTopColor }; }; return { sv: f(sv), thumb: f(sv.firstElementChild), hue: f(hue), handle: f(hue.firstElementChild) }; });
    const census = {};
    for (const [k, sel] of [["sv", ".sv-canvas"], ["hue", ".sv-canvas + div"]]) {
      const shot = await page.locator(sel).screenshot();
      const p = await pixels(page, shot, null);
      const set = new Set(); for (let i = 0; i < p.data.length; i += 4) set.add(`${p.data[i] >> 3},${p.data[i + 1] >> 3},${p.data[i + 2] >> 3}`);
      census[k] = { px: p.w * p.h, distinctColours5bit: set.size };
    }
    await page.locator(".sv-canvas").locator("xpath=..").screenshot({ path: EV + "mini-forced-colors.png" });
    return { cs, census };
  });

  // R-2 + R-6 — geometry at desktop, iPhone 14, and 200% zoom
  for (const [name, opt] of [["desktop-1280", {}], ["iphone14", IPHONE14], ["zoom200-of-1280x900", { viewport: { width: 640, height: 450 }, deviceScaleFactor: 2 }], ["zoom200-of-iphone14", { ...IPHONE14, viewport: { width: 195, height: 332 }, deviceScaleFactor: 6 }]]) {
    out["geo-" + name] = await cell(b, opt, async (page) => {
      await mockApi(page); await gotoBrowse(page);
      const r = {};
      await openTray(page);
      r.trayOpen = await geo(page);
      try { await swatch(page).click({ timeout: 4000 }); r.swatchClick = "ok"; } catch (e) { r.swatchClick = "FAILED: " + e.message.split("\n")[0]; }
      await page.waitForTimeout(450);
      r.pickerOpen = await geo(page);
      if (name !== "desktop-1280") await page.screenshot({ path: EV + `mini-geo-${name}.png` });
      // R-9 — touch-action on the drag surfaces (coarse cells)
      r.touchAction = await page.evaluate(() => { const sv = document.querySelector(".sv-canvas"); return sv ? [getComputedStyle(sv).touchAction, getComputedStyle(sv.nextElementSibling).touchAction] : null; });
      return r;
    });
  }

  // R-10 — '#zzzzzz' through the live UI, then the engine's reading of --hue: NaN
  out.r10 = await cell(b, {}, async (page) => {
    await mockApi(page); await gotoBrowse(page); await openTray(page);
    const input = page.getByRole("textbox", { name: "Search by CSS color" });
    await input.fill("#zzzzzz"); await input.press("Enter"); await page.waitForTimeout(400);
    const r = { alert: await page.getByRole("alert").allInnerTexts(), swatchLabel: await swatch(page).getAttribute("aria-label") };
    await openPicker(page);
    r.hueVar = await page.evaluate(() => document.querySelector(".sv-canvas").style.getPropertyValue("--hue"));
    r.readout = await readout(page);
    r.engineNaN = await page.evaluate(() => { const d = document.createElement("div"); d.className = "sv-canvas"; d.style.cssText = "--hue: NaN; width:20px;height:20px;background:hsl(calc(var(--hue) * 1deg), 100%, 50%)"; document.body.append(d); const v = getComputedStyle(d).backgroundColor; d.remove(); return v; });
    return r;
  });
});
writeFileSync(EV + "mini.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 12000));
