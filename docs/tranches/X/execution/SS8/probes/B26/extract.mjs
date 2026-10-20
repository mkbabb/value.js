// SS-8 B26 — #/extract cells (Chromium headless). Usage: APP=http://localhost:9026/ node extract.mjs [cell ...]
import { chromium, newCell, goto, makePng, loadImage, meanRgb, resolveColorFn, contrast, oklchChroma, save, runCells } from "./lib.mjs";

const want = process.argv.slice(2);

// In-page reader of the extract pane's geometry + structure.
const READ = `(() => {
  const h = [...document.querySelectorAll("h1,h2,h3")].find((x) => x.textContent.trim() === "Extract");
  const shell = h && h.closest(".pane-shell");
  const card = shell && shell.querySelector(".pane-shell__card");
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  const scrollers = [...document.querySelectorAll("body *")].filter((el) => { const s = getComputedStyle(el); return /(auto|scroll)/.test(s.overflowY) && el.getBoundingClientRect().height > 40; })
    .map((el) => ({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 80), role: el.getAttribute("role"), ariaLabel: el.getAttribute("aria-label"), ariaLabelledby: el.getAttribute("aria-labelledby"), tabindex: el.getAttribute("tabindex"), clientH: el.clientHeight, scrollH: el.scrollHeight, inPane: !!(shell && shell.contains(el)) }));
  const se = document.scrollingElement;
  const ghost = shell && shell.querySelector('[aria-hidden="true"][class*="skeleton"], [data-skeleton], [class*="shadow-palette"]');
  const allLabels = [...document.querySelectorAll("[aria-label]")];
  const panes = [...document.querySelectorAll(".pane-shell")].map((p) => r(p));
  return {
    heading: h ? { tag: h.tagName, id: h.id || null } : null,
    paneRect: r(shell), cardRect: r(card), panes, vw: innerWidth, vh: innerHeight,
    cardRole: card && card.getAttribute("role"), cardAria: card && card.getAttribute("aria-label"),
    docScrollable: se.scrollHeight > se.clientHeight, docScrollH: se.scrollHeight, docClientH: se.clientHeight,
    scrollers,
    ariaLabelCount: { total: allLabels.length, inPane: allLabels.filter((e) => shell && shell.contains(e)).length },
    ghostCaption: shell ? [...shell.querySelectorAll("p,span")].filter((e) => /drop an image|no image|extract.*appear/i.test(e.textContent) && e.children.length === 0).map((e) => e.textContent.trim().slice(0, 80)) : null,
    ghostRect: r(ghost),
  };
})()`;

async function setK(page, k) {
  const thumb = page.locator('[aria-label="Number of colors"] [role="slider"], [role="slider"][aria-label="Number of colors"]').first();
  await thumb.focus();
  await page.keyboard.press("Home");
  for (let i = 1; i < k; i++) await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(1200);
  return thumb.getAttribute("aria-valuenow");
}

const cells = [
  ["desk-light-empty", { w: 1440, h: 900 }, async (page) => {
    await goto(page, "extract");
    const a = await page.evaluate(READ);
    await page.screenshot({ path: process.env.EVDIR + "extract-1440-light-empty.png" });
    return a;
  }],
  ["phone-390x664-k16-empty", { w: 390, h: 664, mobile: true, hasTouch: true }, async (page) => {
    await goto(page, "extract");
    const before = await page.evaluate(READ);
    const k = await setK(page, 16);
    const after = await page.evaluate(READ);
    return { k, before: { docScrollable: before.docScrollable, ghostRect: before.ghostRect, scrollers: before.scrollers }, after: { docScrollable: after.docScrollable, ghostRect: after.ghostRect, scrollers: after.scrollers, paneRect: after.paneRect } };
  }],
  ["desk-light-image", { w: 1440, h: 900 }, async (page) => {
    await goto(page, "extract");
    const buf = await makePng(page);
    const loadMs = await loadImage(page, buf);
    const card = () => page.evaluate(`(() => { const h=[...document.querySelectorAll("h1,h2,h3")].find(x=>x.textContent.trim()==="Extract"); const s=h.closest(".pane-shell"); const sc=s.querySelector(".pane-scroll-fade"); return { paneH: s.getBoundingClientRect().height, contentH: sc ? sc.scrollHeight : null, clientH: sc ? sc.clientHeight : null }; })()`);
    const growth = [];
    for (const k of [4, 8, 12, 16]) { const v = await setK(page, k); await page.waitForTimeout(2500); growth.push({ k: v, ...(await card()) }); }
    const code = await page.evaluate(() => { const c = [...document.querySelectorAll("code")].find((e) => e.closest(".pane-shell")); return c ? { cls: c.className, sw: c.scrollWidth, cw: c.clientWidth, text: c.textContent } : null; });
    await page.screenshot({ path: process.env.EVDIR + "extract-1440-light-image-k16.png" });
    return { loadMs, growth, code, read: await page.evaluate(READ) };
  }],
  ["zoom200-image", { w: 720, h: 450, dsf: 2 }, async (page) => {
    await goto(page, "extract");
    await loadImage(page, await makePng(page));
    await page.waitForTimeout(2000);
    const codes = await page.evaluate(() => [...document.querySelectorAll(".pane-shell code")].map((c) => ({ cls: c.className, sw: c.scrollWidth, cw: c.clientWidth, clipped: c.scrollWidth > c.clientWidth + 1, text: c.textContent.slice(0, 60) })));
    const r = await page.evaluate(READ);
    await page.screenshot({ path: process.env.EVDIR + "extract-zoom200-image.png" });
    return { codes, docScrollable: r.docScrollable, paneRect: r.paneRect, scrollers: r.scrollers.filter((s) => s.inPane) };
  }],
  ["desk-dark-image", { w: 1440, h: 900, scheme: "dark" }, async (page) => {
    await goto(page, "extract");
    await loadImage(page, await makePng(page));
    await page.waitForTimeout(2000);
    const rects = await page.evaluate(() => {
      const s = document.querySelector('[aria-label^="Palette: "]'); const card = [...document.querySelectorAll(".pane-shell")].find((p) => p.querySelector('[aria-label^="Palette: "]'));
      const b = (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
      return { plate: s ? b(s) : null, pane: card ? b(card) : null };
    });
    const out = { rects };
    if (rects.plate) { const p = rects.plate; out.plateMean = await meanRgb(page, { x: p.x + p.width - 24, y: p.y + 4, width: 16, height: 8 }); }
    out.ambientMean = await meanRgb(page, { x: 4, y: 450, width: 12, height: 12 });
    out.plateC = out.plateMean ? oklchChroma([out.plateMean.r, out.plateMean.g, out.plateMean.b]) : null;
    out.ambientC = oklchChroma([out.ambientMean.r, out.ambientMean.g, out.ambientMean.b]);
    await page.screenshot({ path: process.env.EVDIR + "extract-1440-dark-image.png" });
    return out;
  }],
  ["phone-addcolor", { w: 390, h: 844, mobile: true, hasTouch: true }, async (page) => {
    await goto(page, "extract");
    await loadImage(page, await makePng(page));
    await page.waitForTimeout(1500);
    const sw = page.locator('.pane-shell [aria-label^="Color swatch "]').first();
    const swatchCount = await page.locator('.pane-shell [aria-label^="Color swatch "]').count();
    if (!swatchCount) return { swatchCount };
    await sw.tap();
    await page.waitForTimeout(1200);
    const addBtn = page.locator('button[aria-label^="Add "][aria-label$="to current palette"]');
    const addCount = await addBtn.count();
    const before = await page.evaluate(() => ({ hash: location.hash, palettesColorCount: document.querySelectorAll('[aria-label^="Color swatch "]').length, saved: localStorage.getItem("color-picker-model") ? 1 : 0, statusText: [...document.querySelectorAll('[role="status"],[aria-live]')].map((e) => e.textContent.trim()).filter(Boolean) }));
    let after = null;
    if (addCount) {
      const muts = await page.evaluate(() => { window.__m = 0; new MutationObserver((l) => { window.__m += l.length; }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true }); return true; });
      await addBtn.first().tap();
      await page.waitForTimeout(2000);
      after = await page.evaluate(() => ({ hash: location.hash, palettesColorCount: document.querySelectorAll('[aria-label^="Color swatch "]').length, toasts: [...document.querySelectorAll('[data-sonner-toast],[role="alert"],[role="status"]')].map((e) => e.textContent.trim().slice(0, 60)).filter(Boolean), mutations: window.__m, statusText: [...document.querySelectorAll('[role="status"],[aria-live]')].map((e) => e.textContent.trim()).filter(Boolean), visiblePanes: [...document.querySelectorAll(".pane-shell")].filter((p) => { const r = p.getBoundingClientRect(); return r.width > 0 && r.right > 0 && r.left < innerWidth; }).map((p) => (p.querySelector("h1,h2,h3") || {}).textContent) }));
      await page.screenshot({ path: process.env.EVDIR + "extract-390-after-add.png" });
    }
    return { swatchCount, addCount, before, after };
  }],
  ["forced-empty", { w: 1440, h: 900, forcedColors: "active" }, async (page) => {
    await goto(page, "extract");
    const fc = await page.evaluate(() => {
      const shell = [...document.querySelectorAll(".pane-shell")].find((p) => /Extract/.test((p.querySelector("h1,h2,h3") || {}).textContent || ""));
      const hidden = [...shell.querySelectorAll('[aria-hidden="true"]')].filter((e) => e.getBoundingClientRect().height > 30);
      const mq = matchMedia("(forced-colors: active)").matches;
      const bones = [...shell.querySelectorAll('[aria-hidden="true"] *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 20 && r.height > 20; }).slice(0, 6).map((e) => { const s = getComputedStyle(e); return { bg: s.backgroundColor, border: s.borderTopColor + " " + s.borderTopWidth, fca: s.forcedColorAdjust }; });
      return { mq, ghostCount: hidden.length, bones };
    });
    await page.screenshot({ path: process.env.EVDIR + "extract-1440-forced-empty.png" });
    const shot = await page.evaluate(() => { const s = [...document.querySelectorAll(".pane-shell")].find((p) => /Extract/.test((p.querySelector("h1,h2,h3") || {}).textContent || "")); const g = [...s.querySelectorAll('[aria-hidden="true"]')].filter((e) => e.getBoundingClientRect().height > 30).pop(); if (!g) return null; const r = g.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
    if (shot) fc.ghostMean = await meanRgb(page, shot);
    return fc;
  }],
  ["rtl-empty", { w: 1440, h: 900 }, async (page) => {
    await goto(page, "extract");
    await page.evaluate(() => { document.documentElement.dir = "rtl"; });
    await page.waitForTimeout(800);
    return page.evaluate(() => {
      const sl = document.querySelector('[aria-label="Number of colors"]');
      const root = sl && (sl.closest("[data-slot]") || sl.parentElement);
      const b = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(1) }; };
      const range = root && root.querySelector('[class*="range"], [data-slot="slider-range"]');
      const thumb = root && root.querySelector('[role="slider"]');
      const wrap = sl && sl.closest(".flex.flex-col");
      const label = wrap && [...wrap.querySelectorAll("span,label")].find((e) => /colou?rs?/i.test(e.textContent) && e.children.length === 0);
      return { dir: document.documentElement.dir, sliderDir: sl && getComputedStyle(sl).direction, dataOrientation: sl && sl.getAttribute("data-orientation"), slider: b(sl), range: b(range), thumb: b(thumb), label: label ? { text: label.textContent.trim(), ...b(label) } : null };
    });
  }],
  ["drag-strobe", { w: 1440, h: 900 }, async (page) => {
    await goto(page, "extract");
    return page.evaluate(async () => {
      const zone = document.querySelector("[data-dragging], .pane-shell [role='button']");
      const z = [...document.querySelectorAll(".pane-shell [role='button'], .pane-shell button")].find((e) => /Upload image/.test(e.textContent)) || zone;
      const kids = [...z.querySelectorAll("*")].filter((e) => e.getBoundingClientRect().width > 0);
      const dt = new DataTransfer(); dt.items.add(new File(["x"], "a.png", { type: "image/png" }));
      const ev = (t, el, rel) => el.dispatchEvent(new DragEvent(t, { bubbles: true, cancelable: true, dataTransfer: dt, relatedTarget: rel || null }));
      const samples = []; let raf = true;
      const tick = () => { samples.push([Math.round(performance.now()), z.getAttribute("data-dragging")]); if (raf) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      ev("dragenter", z); ev("dragover", z); await wait(60);
      // the pointer crosses into child elements and back out, as a real drag does
      for (const k of kids.slice(0, 4)) { ev("dragenter", k); ev("dragleave", z, k); ev("dragover", k); await wait(40); ev("dragenter", z); ev("dragleave", k, z); await wait(40); }
      await wait(80); raf = false;
      const states = samples.map((s) => s[1]);
      let falseRuns = 0; for (let i = 1; i < states.length; i++) if (states[i] !== "true" && states[i - 1] === "true") falseRuns++;
      return { zoneFound: !!z, attrOnZone: z.hasAttribute("data-dragging") || null, kids: kids.length, frames: states.length, trueFrames: states.filter((s) => s === "true").length, falseRunsMidDrag: falseRuns, firstTrueIdx: states.indexOf("true"), tail: states.slice(-3) };
    });
  }],
  ["touch-loupe", { w: 390, h: 844, mobile: true, hasTouch: true }, async (page) => {
    await goto(page, "extract");
    await loadImage(page, await makePng(page));
    await page.waitForTimeout(1000);
    const pick = page.locator("text=Pick a color").first();
    if (!(await pick.count())) return { pickBadge: 0 };
    await pick.tap();
    await page.waitForTimeout(2500);
    const img = await page.evaluate(() => { const d = document.querySelector('[role="dialog"]') || document.body; const c = [...d.querySelectorAll("img,canvas")].map((e) => { const r = e.getBoundingClientRect(); return { tag: e.tagName, x: r.x, y: r.y, w: r.width, h: r.height }; }).sort((a, b) => b.w * b.h - a.w * a.h); return c; });
    const big = img[0];
    if (!big) return { noStage: true };
    await page.touchscreen.tap(big.x + big.w * 0.25, big.y + big.h * 0.25);
    await page.waitForTimeout(700);
    const loupes = await page.evaluate(() => [...document.querySelectorAll("canvas")].map((c) => { const r = c.getBoundingClientRect(); let nonBlank = null; try { const g = c.getContext("2d"); const d = g.getImageData(0, 0, c.width, c.height).data; nonBlank = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) nonBlank++; } catch (e) { nonBlank = "ctx:" + e.message; } return { w: c.width, h: c.height, rw: r.width, rh: r.height, visible: r.width > 0 && getComputedStyle(c).visibility !== "hidden" && getComputedStyle(c).display !== "none", nonBlank }; }));
    await page.screenshot({ path: process.env.EVDIR + "extract-390-touch-loupe.png" });
    return { stageCandidates: img.slice(0, 3), loupes };
  }],
];

// L-3 · accname census of the rendered DockControl family (.dock-icon-button), shell vs workbench side.
// C-4 · keyboard reachability of the pane's scroll hosts (Tab walk; is a scroller ever document.activeElement?).
const NAMES = () => {
  const els = [...document.querySelectorAll(".dock-icon-button")];
  const side = (e) => (e.closest(".pane-shell") ? "workbench" : "shell");
  const rows = els.map((e) => ({ side: side(e), aria: e.getAttribute("aria-label"), title: e.getAttribute("title"), text: e.textContent.trim().slice(0, 30), visible: e.getBoundingClientRect().width > 0 }));
  const tally = (sd) => { const r = rows.filter((x) => x.side === sd); return { n: r.length, ariaLabel: r.filter((x) => x.aria).length, titleOnly: r.filter((x) => !x.aria && x.title).length, neither: r.filter((x) => !x.aria && !x.title).length }; };
  return { shell: tally("shell"), workbench: tally("workbench"), rows };
};
cells.push(["l3-names", { w: 1440, h: 900 }, async (page) => {
  await goto(page, "extract");
  const empty = await page.evaluate(NAMES);
  await loadImage(page, await makePng(page));
  await page.waitForTimeout(1200);
  const image = await page.evaluate(NAMES);
  return { empty: { shell: empty.shell, workbench: empty.workbench }, image: { shell: image.shell, workbench: image.workbench }, rows: image.rows };
}]);
cells.push(["c4-focus", { w: 1440, h: 900 }, async (page) => {
  await goto(page, "extract");
  await loadImage(page, await makePng(page));
  await page.waitForTimeout(1200);
  const scrollers = await page.evaluate(() => [...document.querySelectorAll(".pane-shell *")].filter((el) => /(auto|scroll)/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight + 1).map((el, i) => { el.dataset.ss8Scroller = String(i); return { i, cls: String(el.className).slice(0, 70), role: el.getAttribute("role"), aria: el.getAttribute("aria-label"), tabindex: el.getAttribute("tabindex"), sh: el.scrollHeight, ch: el.clientHeight }; }));
  await page.evaluate(() => document.body.focus());
  const hits = []; const seq = [];
  for (let i = 0; i < 80; i++) { await page.keyboard.press("Tab"); const a = await page.evaluate(() => { const e = document.activeElement; return { sc: e && e.dataset ? e.dataset.ss8Scroller ?? null : null, tag: e ? e.tagName : null, name: e ? (e.getAttribute("aria-label") || e.getAttribute("title") || e.textContent.trim()).slice(0, 30) : null }; }); seq.push(a.tag + ":" + a.name); if (a.sc != null) hits.push({ step: i, ...a }); }
  return { scrollers, scrollerFocusHits: hits, tabSeqHead: seq.slice(0, 40) };
}]);

const out = { app: process.env.APP, at: new Date().toISOString() };
process.env.EVDIR = (await import("./lib.mjs")).EV;
const engine = process.env.ENGINE === "webkit" ? (await import("./lib.mjs")).webkit : chromium;
const browser = await engine.launch();
try { await runCells(browser, cells.filter(([n]) => !want.length || want.includes(n)), out); }
finally { await browser.close(); save("extract" + (process.env.ENGINE === "webkit" ? "-webkit" : "") + (want.length ? "-" + want.join("+") : "") + ".json", out); }
