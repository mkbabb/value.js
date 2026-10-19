// SS-8 B16 — MigratePalettesDialog witnesses (SS8-0451..0460). Headless Chromium, one browser,
// one context per cell. Seeds LOCAL palettes (context-scoped localStorage) so a slug switch mounts the
// switch-mode dialog with NO API write; the API is mocked for the whole context (no dev-DB writes).
import { chromium, newCell, mockApi, save, EV, APP } from "./lib.mjs";
const now = new Date().toISOString();
const mk = (i, name, cols) => ({ id: `ss8-local-${i}`, name, slug: `ss8-local-${i}`, colors: cols.map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true });
const SEED = JSON.stringify({ version: 1, palettes: [
  mk(1, "Harbor dusk", ["oklch(0.45 0.12 250)", "oklch(0.7 0.1 200)", "oklch(0.85 0.08 80)"]),
  mk(2, "Moss", ["oklch(0.5 0.1 140)", "oklch(0.75 0.12 120)", "oklch(0.3 0.05 150)"]),
  mk(3, "Signal", ["oklch(0.65 0.25 25)", "oklch(0.9 0.02 90)", "oklch(0.25 0.02 260)"]) ] });
const TARGET = "quiet-amber-harbor-fox";
const out = { served: APP, cells: {} };

async function openLayer(p, w) {
  // The slug layer is always in the DOM (stacked dock layers); it is opened by Profile → Switch account.
  for (let k = 0; k < 3; k++) {
    const prof = p.getByRole("button", { name: "Profile" });
    if (await prof.isVisible().catch(() => false)) { await prof.click(); }
    else { const menu = p.getByRole("button", { name: "Menu" }).first(); if (await menu.isVisible().catch(() => false)) await menu.click(); }
    await p.waitForTimeout(500);
    const sw = p.getByRole("menuitem", { name: /^(Switch account|Login)$/ }).first();
    if (await sw.isVisible().catch(() => false)) { await sw.click(); await p.waitForTimeout(900); return true; }
    await p.keyboard.press("Escape"); await p.waitForTimeout(500);
  }
  return false;
}
const dlg = '[data-slot="dialog-content"]';
async function openDialog(p, w) {
  await openLayer(p, w);
  await p.locator('input[aria-label="Slug or admin token"]').fill(TARGET);
  await p.keyboard.press("Enter");
  await p.locator(dlg).waitFor({ state: "visible", timeout: 10000 });
  await p.waitForTimeout(900);
}
const readDialog = (p) => p.evaluate((sel) => {
  const d = document.querySelector(sel); if (!d) return null;
  const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), right: +r.right.toFixed(1) }; };
  const cs = getComputedStyle(d);
  const title = d.querySelector('[data-slot="dialog-title"]');
  const close = [...d.querySelectorAll("button")].find((b) => /close/i.test(b.getAttribute("aria-label") ?? "") || b.dataset.slot === "dialog-close");
  const cls = (d.className?.baseVal ?? d.className).toString();
  return {
    className: cls, roundedDialogCount: cls.split(/\s+/).filter((c) => c === "rounded-dialog").length,
    rect: R(d), vw: innerWidth, bg: cs.backgroundColor, backdrop: cs.backdropFilter || cs.webkitBackdropFilter, opacity: cs.opacity,
    title: R(title), titleText: title?.textContent.trim(),
    close: close ? { ...R(close), aria: close.getAttribute("aria-label"), slot: close.dataset.slot ?? null } : null,
    buttons: [...d.querySelectorAll("button")].map((b) => ({ text: b.textContent.trim().slice(0, 40), aria: b.getAttribute("aria-label"), variantAttr: b.getAttribute("variant"), attrs: [...b.attributes].map((a) => a.name).join(","), emphasis: b.dataset.emphasis ?? null, color: getComputedStyle(b).color, ...R(b) })),
    active: document.activeElement ? `${document.activeElement.tagName}:${document.activeElement.textContent.trim().slice(0, 30)}` : null,
    overlay: (() => { const o = document.querySelector('[data-slot="dialog-overlay"]'); return o ? getComputedStyle(o).backgroundColor : null; })(),
  };
}, dlg);

// Decode a PNG buffer in a scratch page and return the mean RGB plus the extreme-luminance pixel.
async function pixelStats(ctx, buf) {
  const pg = await ctx.newPage();
  try {
    await pg.setContent("<canvas id=c></canvas>");
    return await pg.evaluate(async (b64) => {
      const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
      const c = document.getElementById("c"); c.width = img.width; c.height = img.height;
      const g = c.getContext("2d"); g.drawImage(img, 0, 0); const d = g.getImageData(0, 0, c.width, c.height).data;
      let r = 0, gg = 0, bb = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; }
      return { mean: [r / n, gg / n, bb / n].map((v) => +v.toFixed(1)), w: c.width, h: c.height };
    }, buf.toString("base64"));
  } finally { await pg.close(); }
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
const rgbOf = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number);

const b = await chromium.launch({ headless: true });
try {
  // ---- Cell A (1440 light) + Cell C (1440 dark): read, contrast, A-5 experiment, dismissal focus, lazy closure.
  for (const scheme of ["light", "dark"]) {
    const cell = `1440-${scheme}`; const rec = (out.cells[cell] = {});
    const { ctx, page, errs } = await newCell(b, { scheme, seed: SEED });
    try {
      const api = []; await mockApi(ctx, { log: api });
      await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      const mods = []; page.on("request", (r) => { const u = new URL(r.url()); if (u.port === "9000") mods.push(u.pathname); });
      await openDialog(page, 1440);
      rec.lazyModulesOnOpen = { count: mods.length, sample: mods.slice(0, 60) };
      rec.dialog = await readDialog(page);
      await page.screenshot({ path: EV + `migrate-${cell}-open.png` });
      // Caption contrast: text colour vs the rendered ground behind it (text made transparent for the ground shot).
      const cap = page.locator(`${dlg} p.text-caption`).first();
      const box = await cap.boundingBox();
      const capColor = await cap.evaluate((e) => getComputedStyle(e).color);
      await cap.evaluate((e) => (e.style.color = "transparent"));
      const ground = await pixelStats(ctx, await page.screenshot({ clip: box }));
      await cap.evaluate((e) => (e.style.color = ""));
      const capRgb = await page.evaluate((c) => { const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d"); g.fillStyle = c; g.fillRect(0, 0, 1, 1); return [...g.getImageData(0, 0, 1, 1).data].slice(0, 3); }, capColor);
      rec.captionContrast = { capColor, capRgb, groundMean: ground.mean, ratio: contrast(capRgb, ground.mean), text: await cap.textContent() };
      // Panel transmission: alpha of the computed background.
      const a = rec.dialog.bg.match(/\/\s*([\d.]+)\)|rgba\([^)]*,\s*([\d.]+)\)/);
      rec.panelAlpha = a ? Number(a[1] ?? a[2]) : 1;
      // A-5 experiment: a hand-rolled text-muted-foreground on a glass Button — does the utility win? Name the winner (CDP).
      const btn = page.getByRole("button", { name: "Publish, then switch" });
      await btn.evaluate((e) => { e.dataset.ss8 = "1"; e.classList.add("text-muted-foreground"); });
      const mutedRef = await page.evaluate(() => { const s = document.createElement("span"); s.className = "text-muted-foreground"; document.body.append(s); const c = getComputedStyle(s).color; s.remove(); return c; });
      const btnColor = await btn.evaluate((e) => getComputedStyle(e).color);
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
      const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
      const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "[data-ss8]" });
      const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
      const colorRules = (m.matchedCSSRules ?? []).filter((r) => r.rule.style.cssProperties.some((p) => p.name === "color" && !p.disabled && p.value))
        .map((r) => ({ selector: r.rule.selectorList.text.slice(0, 160), layers: (r.rule.layers ?? []).map((l) => l.text).join(">"), value: r.rule.style.cssProperties.filter((p) => p.name === "color").map((p) => p.value + (p.important ? " !important" : "")).join(" | ") }));
      const declares = (rules) => (rules ?? []).filter((r) => r.rule.style.cssProperties.some((p) => p.name === "--muted-foreground"))
        .map((r) => ({ selector: r.rule.selectorList.text.slice(0, 200), layers: (r.rule.layers ?? []).map((l) => l.text).join(">"), value: r.rule.style.cssProperties.filter((p) => p.name === "--muted-foreground").map((p) => p.value).join(" | "), origin: r.rule.origin, sheet: r.rule.styleSheetId }));
      const inherited = (m.inherited ?? []).map((h, i) => ({ depth: i + 1, inline: (h.inlineStyle?.cssProperties ?? []).filter((p) => p.name === "--muted-foreground").map((p) => p.value), rules: declares(h.matchedCSSRules) })).filter((h) => h.inline.length || h.rules.length);
      const varProbe = await btn.evaluate((e) => { const out = []; for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const v = getComputedStyle(n).getPropertyValue("--muted-foreground").trim(); out.push(`${n.tagName}.${(n.className?.baseVal ?? n.className ?? "").toString().split(/\s+/).slice(0, 3).join(".")} = ${v}`); if (n.matches?.('[data-slot="dialog-content"]')) break; } return { chain: out, inlineStyle: e.getAttribute("style"), buttonInk: getComputedStyle(e).getPropertyValue("--button-ink").trim() }; });
      rec.a5 = { mutedRef, btnColorWithUtility: btnColor, utilityWins: btnColor === mutedRef, colorRulesInCascadeOrder: colorRules, mutedVarOnNode: declares(m.matchedCSSRules), mutedVarInherited: inherited, varProbe };
      await btn.evaluate((e) => { delete e.dataset.ss8; e.classList.remove("text-muted-foreground"); });
      // Dismissal focus (A-14): Escape, then Cancel on a re-open.
      await page.keyboard.press("Escape"); await page.waitForTimeout(800);
      rec.afterEscape = await page.evaluate((sel) => ({ open: !!document.querySelector(sel), active: document.activeElement?.tagName, activeLabel: document.activeElement?.getAttribute("aria-label") }), dlg);
      await openDialog(page, 1440);
      await page.getByRole("button", { name: "Cancel", exact: true }).last().click(); await page.waitForTimeout(800);
      rec.afterCancel = await page.evaluate((sel) => ({ open: !!document.querySelector(sel), active: document.activeElement?.tagName, activeLabel: document.activeElement?.getAttribute("aria-label") }), dlg);
      rec.api = api.filter((x) => x.m !== "GET"); rec.errs = errs.slice(0, 8);
    } catch (e) { rec.error = String(e).slice(0, 400); } finally { await ctx.close(); }
  }
  // ---- Cell B (320 light): D-8 geometry.
  {
    const rec = (out.cells["320-light"] = {});
    const { ctx, page, errs } = await newCell(b, { w: 320, h: 720, seed: SEED });
    try {
      await mockApi(ctx);
      await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      await openDialog(page, 320);
      const d = await readDialog(page);
      rec.dialog = d;
      rec.geometry = { x: d.rect.x, w: d.rect.w, sideMargin: +(d.vw - d.rect.right).toFixed(1), titleClosePx: d.close && d.title ? +(d.close.x - d.title.right).toFixed(1) : null, closeBox: d.close ? `${d.close.w}x${d.close.h}` : "no close button" };
      await page.screenshot({ path: EV + "migrate-320-light-open.png" });
      rec.errs = errs.slice(0, 5);
    } catch (e) { rec.error = String(e).slice(0, 400); } finally { await ctx.close(); }
  }
  // ---- Cell D (1440 light): held Enter (A-12 key-repeat limb) — the same key that submits the slug keeps repeating.
  {
    const rec = (out.cells["1440-light-enter-hold"] = {});
    const { ctx, page, errs } = await newCell(b, { seed: SEED });
    try {
      const api = []; await mockApi(ctx, { log: api });
      await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      await openLayer(page, 1440);
      await page.evaluate(() => { window.__ss8 = []; document.addEventListener("click", (e) => window.__ss8.push({ t: performance.now(), tag: e.target.tagName, text: (e.target.closest("button")?.textContent ?? "").trim().slice(0, 40) }), true);
        document.addEventListener("keydown", (e) => { if (e.key === "Enter") window.__ss8.push({ t: performance.now(), key: "Enter", repeat: e.repeat, active: document.activeElement?.textContent?.trim().slice(0, 30) ?? document.activeElement?.tagName }); }, true); });
      await page.locator('input[aria-label="Slug or admin token"]').fill(TARGET);
      await page.keyboard.down("Enter");
      for (let i = 0; i < 20; i++) { await page.waitForTimeout(33); await page.keyboard.down("Enter"); }
      await page.keyboard.up("Enter"); await page.waitForTimeout(800);
      rec.events = await page.evaluate(() => window.__ss8);
      rec.after = await page.evaluate((sel) => ({ open: !!document.querySelector(sel), active: document.activeElement?.textContent?.trim().slice(0, 30) }), dlg);
      rec.apiWrites = api.filter((x) => x.m !== "GET"); rec.apiAll = api.slice(-10);
      rec.errs = errs.slice(0, 8);
    } catch (e) { rec.error = String(e).slice(0, 400); } finally { await ctx.close(); }
  }
  // ---- Cell E (1440 light): L-1 — drive the dialog's navigation path ("Just switch") and collect page errors.
  {
    const rec = (out.cells["1440-light-just-switch"] = {});
    const { ctx, page, errs } = await newCell(b, { seed: SEED });
    try {
      const api = []; await mockApi(ctx, { log: api });
      await page.goto(APP + "#/palettes", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
      await openDialog(page, 1440);
      rec.hashBefore = await page.evaluate(() => location.hash);
      await page.getByRole("button", { name: "Just switch" }).click(); await page.waitForTimeout(2500);
      rec.after = await page.evaluate((sel) => ({ open: !!document.querySelector(sel), hash: location.hash, slugLS: localStorage.getItem("palette-user-slug"), active: document.activeElement?.tagName }), dlg);
      rec.apiNonGet = api.filter((x) => x.m !== "GET"); rec.errs = errs.slice(0, 8);
    } catch (e) { rec.error = String(e).slice(0, 400); } finally { await ctx.close(); }
  }
} finally { await b.close(); save("migrate.json", out); }
for (const [k, v] of Object.entries(out.cells)) console.log(k, JSON.stringify(v).slice(0, 1400));
