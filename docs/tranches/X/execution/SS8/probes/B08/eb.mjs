// SS-8 B08 ErrorBoundary witnesses. A REAL render throw is induced in one region: PaneSlot's
// compiled render (type.render, dev) is wrapped to throw while window.__ss8Throw names that
// region's componentKey; Vue's renderComponentRoot -> handleError -> the region's
// ErrorBoundary onErrorCaptured runs exactly as for a shipped pane throw.
// Cells: eb-contrast (U-1 + U-2) · eb-focus (U-4) · eb-census (U-5) · eb-webgl (U-6) · eb-alerts (U-7) · eb-chunk (U-3 + U-8)
import { chromium } from "playwright";
import { O, EV, routeApi, newCell, settle, pixelMean, servedCr } from "./lib.mjs";
const want = process.argv.slice(2);
const on = (c) => !want.length || want.includes(c);

const ARM = () => {
  // Vue caches `instance.render` at setup, so the wrap goes on each mounted PaneSlot INSTANCE (patching
  // type.render after mount is inert); the throw rides Vue's own renderComponentRoot -> handleError path.
  for (const i of __ss8.findInstances("PaneSlot")) {
    if (i.__ss8) continue; const orig = i.render;
    i.render = function (ctx, ...a) { if (window.__ss8Throw && i.props.componentKey === window.__ss8Throw) throw new Error("SS8 probe: induced render throw in " + i.props.componentKey); return orig.call(this, ctx, ...a); };
    i.__ss8 = true;
  }
  // and on the TYPE, so a PaneSlot re-created by the boundary's reset (Try again) is armed too
  const [ps] = __ss8.findInstances("PaneSlot"); const T = ps.type;
  if (!T.__ss8) { const o = T.render; T.render = function (ctx, ...a) { if (window.__ss8Throw && this?.$props?.componentKey === window.__ss8Throw) throw new Error("SS8 probe: induced render throw in " + window.__ss8Throw); return o.call(this, ctx, ...a); }; T.__ss8 = true; }
  return __ss8.findInstances("PaneSlot").map((i) => i.props.componentKey);
};
const THROW = (key) => { window.__ss8Throw = key; window.__ss8Arm?.(); const ps = __ss8.findInstances("PaneSlot").find((i) => i.props.componentKey === key); ps.proxy.$forceUpdate(); };
async function boot(browser, route, opts = {}) {
  const ctx = await newCell(browser, opts);
  await routeApi(ctx, () => "pass");
  const page = await ctx.newPage();
  const logs = []; page.on("console", (m) => /error|warn/.test(m.type()) && logs.push(m.type() + ": " + m.text().slice(0, 140)));
  await page.goto(O + "/" + route, { waitUntil: "load" });
  await settle(page, 4000);
  const keys = await page.evaluate(ARM);
  return { ctx, page, keys, logs };
}
const plateFacts = () => {
  const eb = document.querySelector(".vj-error-boundary"); if (!eb) return null;
  const [stmt, detail] = eb.querySelectorAll("p"); const glyph = eb.querySelector("svg");
  const vw = innerWidth * innerHeight; const card = eb.closest("[class*=paper-grain]") || eb.parentElement; const cr = card.getBoundingClientRect();
  const textArea = [stmt, detail, glyph].reduce((s, e) => { const r = e.getBoundingClientRect(); return s + r.width * r.height; }, 0);
  const hit = (e) => { const r = e.getBoundingClientRect(); const h = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return h === e || e.contains(h) ? "self" : (h?.tagName + "." + (h?.getAttribute("class") || "").slice(0, 30)); };
  return { stmt: __ss8.ink(stmt), glyph: __ss8.ink(glyph), detail: __ss8.ink(detail), detailText: detail.textContent.trim(), hit: { stmt: hit(stmt), glyph: hit(glyph), detail: hit(detail) },
    plateViewportPct: +(cr.width * cr.height / vw * 100).toFixed(1), inkViewportPct: +(textArea / vw * 100).toFixed(2), role: eb.getAttribute("role"), live: eb.getAttribute("aria-live") };
};
const browser = await chromium.launch();
try {
  if (on("eb-contrast")) for (const scheme of ["light", "dark"]) {
    const { ctx, page, keys } = await boot(browser, "#/palettes", { scheme });
    try {
      await page.evaluate(THROW, "palettes");
      await page.waitForSelector(".vj-error-boundary", { timeout: 5000 });
      await page.waitForTimeout(1200);
      const f = await page.evaluate(plateFacts);
      // pixel witness of occlusion: count non-ground pixels inside the statement's box
      const box = await page.locator(".vj-error-boundary p").first().boundingBox();
      const buf = await page.screenshot({ clip: box });
      const ink = await page.evaluate(async ([b64, g]) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let n = 0, tot = d.length / 4, minL = 255; for (let i = 0; i < d.length; i += 4) { const l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; minL = Math.min(minL, l); if (Math.abs(d[i] - g[0]) + Math.abs(d[i + 1] - g[1]) + Math.abs(d[i + 2] - g[2]) > 60) n++; } return { inkPx: n, totalPx: tot, minLuma: Math.round(minL) }; }, [buf.toString("base64"), f.stmt.ground]);
      // served ground: a pixel patch just left of each ink box, inside the plate (glass, grain and atmosphere as served)
      const served = {};
      for (const k of ["stmt", "glyph", "detail"]) { const [x, y, w, h] = f[k].rect; served[k] = servedCr(f[k].raw, await pixelMean(page, { x: x - 12, y: y + h / 2 - 3, width: 6, height: 6 })); }
      f.served = served;
      await page.screenshot({ path: `${EV}eb-u1-plate-${scheme}.png` });
      console.log("eb-contrast", scheme, JSON.stringify({ regions: keys, ...f, statementPixels: ink }));
    } finally { await ctx.close(); }
  }
  if (on("eb-focus")) {
    const { ctx, page, keys } = await boot(browser, "#/palettes");
    try {
      // a live text field in the OTHER region (the picker): focus it and select its text
      const field = page.locator('[data-pane="color-picker"] input[type="text"], [data-pane="color-picker"] input:not([type]), [data-pane="color-picker"] [contenteditable="true"]').first();
      const fieldDesc = await field.evaluate((e) => e.tagName + "." + (e.getAttribute("class") || "").slice(0, 40) + " aria=" + e.getAttribute("aria-label"));
      await field.focus(); await field.evaluate((e) => (e.select ? e.select() : document.getSelection().selectAllChildren(e)));
      const pre = await page.evaluate(() => ({ active: document.activeElement.tagName + "." + (document.activeElement.getAttribute("class") || "").slice(0, 30), selection: String(document.getSelection()).slice(0, 30), inputSel: [document.activeElement.selectionStart, document.activeElement.selectionEnd] }));
      await page.evaluate(THROW, "palettes");
      await page.waitForSelector(".vj-error-boundary"); await page.waitForTimeout(400);
      const post = await page.evaluate(() => { const a = document.activeElement; const eb = document.querySelector(".vj-error-boundary"); const sel = document.getSelection();
        return { active: a.tagName + "." + (a.getAttribute("class") || "").slice(0, 40), activeIsBoundary: a === eb, selectionCollapsed: sel.isCollapsed, selectionInBoundary: !!(sel.anchorNode && eb.contains(sel.anchorNode)), selection: String(sel).slice(0, 30) }; });
      // D2-4a arm: Retry while the child still throws -> re-catch; where does focus land?
      await page.getByRole("button", { name: "Try again" }).click();
      await page.waitForTimeout(500);
      const afterFailedRetry = await page.evaluate(() => { const a = document.activeElement; return { active: a.tagName + "." + (a.getAttribute("class") || "").slice(0, 40), activeIsButton: a.tagName === "BUTTON", plateUp: !!document.querySelector(".vj-error-boundary") }; });
      // recovery arm: stop throwing, Retry -> where does focus go?
      await page.evaluate(() => { window.__ss8Throw = null; });
      await page.getByRole("button", { name: "Try again" }).click();
      await page.waitForTimeout(800);
      const afterRecover = await page.evaluate(() => ({ active: document.activeElement.tagName + "." + (document.activeElement.getAttribute("class") || "").slice(0, 40), plateUp: !!document.querySelector(".vj-error-boundary") }));
      console.log("eb-focus", JSON.stringify({ regions: keys, field: fieldDesc, pre, post, afterFailedRetry, afterRecover }));
    } finally { await ctx.close(); }
  }
  if (on("eb-census")) {
    const { ctx, page, keys } = await boot(browser, "#/palettes");
    try {
      const f = await page.evaluate(() => {
        const app = document.querySelector("#app"); const all = app.querySelectorAll("*").length;
        const ebs = __ss8.findInstances("ErrorBoundary");
        const regions = [...document.querySelectorAll(".pane-wrapper")]; const guarded = regions.reduce((s, r) => s + r.querySelectorAll("*").length, 0);
        return { elementsUnderApp: all, guardedInRegions: guarded, pct: +(guarded / all * 100).toFixed(1), boundaryCarriers: ebs.length, appLayoutChildren: [...(document.querySelector(".app-layout")?.children || [])].map((c) => c.tagName.toLowerCase() + (c.className ? "." + c.className.toString().split(" ")[0] : "")),
          appTopLevel: [...app.children].map((c) => c.tagName.toLowerCase() + (c.className ? "." + c.className.toString().split(" ")[0] : "")), bodyChildren: [...document.body.children].map((c) => c.tagName.toLowerCase() + (c.id ? "#" + c.id : "")) };
      });
      console.log("eb-census", JSON.stringify({ regions: keys, ...f }));
    } finally { await ctx.close(); }
  }
  if (on("eb-webgl")) {
    const ctx = await newCell(browser, { init: { fn: () => { window.__gl = { made: 0, lost: 0, ctxs: [] }; const g = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { const had = this.__ss8had; const c = g.call(this, t, ...a); if (/webgl/.test(t) && c && !had) { this.__ss8had = true; window.__gl.made++; window.__gl.ctxs.push(c); this.addEventListener("webglcontextlost", () => window.__gl.lost++); } return c; }; } } });
    try {
      await routeApi(ctx, () => "pass");
      const page = await ctx.newPage();
      const logs = []; page.on("console", (m) => /WebGL|context/i.test(m.text()) && logs.push(m.type() + ": " + m.text().slice(0, 120)));
      await page.goto(O + "/#/blob", { waitUntil: "load" }); await settle(page, 5000);
      const keys = await page.evaluate(ARM);
      const key = keys.find((k) => /blob/.test(k)) ?? keys[keys.length - 1];
      const s0 = await page.evaluate(() => ({ made: __gl.made, lost: __gl.lost, live: __gl.ctxs.filter((c) => !c.isContextLost()).length, canvases: document.querySelectorAll("canvas").length }));
      for (let i = 0; i < 12; i++) {
        await page.evaluate(THROW, key); await page.waitForSelector(".vj-error-boundary"); await page.waitForTimeout(250);
        await page.evaluate(() => { window.__ss8Throw = null; }); await page.getByRole("button", { name: "Try again" }).click(); await page.waitForTimeout(900);
      }
      const s1 = await page.evaluate(() => ({ made: __gl.made, lost: __gl.lost, live: __gl.ctxs.filter((c) => !c.isContextLost()).length, canvases: document.querySelectorAll("canvas").length, connectedCanvasesWithCtx: __gl.ctxs.filter((c) => c.canvas.isConnected).length }));
      console.log("eb-webgl", JSON.stringify({ regions: keys, cycledKey: key, before: s0, after12: s1, glConsole: logs.slice(0, 6) }));
    } finally { await ctx.close(); }
  }
  if (on("eb-alerts")) {
    const { ctx, page, keys } = await boot(browser, "#/palettes");
    try {
      await page.evaluate(THROW, "palettes"); await page.waitForSelector(".vj-error-boundary"); await page.waitForTimeout(500);
      const f = await page.evaluate(async () => ({ base: (await import(performance.getEntriesByType("resource").map((e) => e.name).find((n) => /transport\/client\.ts/.test(n)))).BASE_URL,
        alertsInDomOrder: [...document.querySelectorAll('[role="alert"]')].map((a) => ({ cls: (a.getAttribute("class") || "").slice(0, 40), inNav: !!a.closest("nav"), visible: !!a.getClientRects().length, text: a.textContent.trim().slice(0, 50) })) }));
      console.log("eb-alerts", JSON.stringify({ regions: keys, ...f }));
    } finally { await ctx.close(); }
  }
  if (on("eb-chunk")) {
    const ctx = await newCell(browser);
    let abortChunk = true; const chunkReqs = [];
    try {
      await routeApi(ctx, () => "pass");
      await ctx.route(/\/BrowsePane\.vue/, (r) => { chunkReqs.push({ t: Date.now(), phase: abortChunk ? "abort" : "pass", url: r.request().url().replace(/^https?:\/\/[^/]+/, "").replace(/\?.*$/, ""), q: (r.request().url().split("?")[1] || "") }); return abortChunk ? r.abort() : r.continue(); });
      const page = await ctx.newPage();
      await page.goto(O + "/#/palettes", { waitUntil: "load" }); await settle(page, 3500);
      await page.goto(O + "/#/browse"); await page.waitForTimeout(3000);
      const st = () => page.evaluate(() => ({ chunkPlate: !!document.body.innerText.match(/scene could not be loaded/), boundaryPlate: !!document.querySelector(".vj-error-boundary"), browseLive: !!document.querySelector('[data-pane="browse"] [role=alert], [data-pane="browse"] [role=status], [data-pane="browse"] [role=article]') && !document.body.innerText.match(/scene could not be loaded/) }));
      const failed = await st();
      abortChunk = false; const n0 = chunkReqs.length;
      await page.goto(O + "/#/palettes"); await page.waitForTimeout(1500);
      await page.goto(O + "/#/browse"); await page.waitForTimeout(3500);
      const afterSpaRenav = await st(); const spaReqs = chunkReqs.slice(n0);
      const n1 = chunkReqs.length;
      const btn = page.getByRole("button", { name: "Reload the app" });
      if (await btn.count()) { await btn.first().click(); } else { await page.reload(); }
      await page.waitForLoadState("load"); await page.waitForTimeout(4000);
      const afterReload = await st();
      await page.screenshot({ path: `${EV}eb-u8-after-reload.png` });
      console.log("eb-chunk", JSON.stringify({ failed, abortedRequests: chunkReqs.slice(0, n0), afterSpaRenav, spaRenavChunkRequests: spaReqs, afterReload, reloadChunkRequests: chunkReqs.slice(n1) }));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
