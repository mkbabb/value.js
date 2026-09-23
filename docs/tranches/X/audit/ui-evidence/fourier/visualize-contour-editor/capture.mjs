// UIA-F visualize-contour-editor — headed Chromium, real GPU. READ-ONLY on the app TREES.
// One upload (llama-2.jpg) through the app's own file input creates a workspace PRIVATE to
// this seat (so the Save write never touches a sibling seat's seed); every other context reopens it.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, existsSync, readFileSync, appendFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const IMG = "/Users/mkbabb/Programming/fourier-analysis/assets/animals/llama-2.jpg";
const sh = (c) => execSync(c).toString().trim();
const tree = () => `fourier ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")} · glass ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}`;
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const ONLY = process.argv[2];
const metrics = {}; const errors = [];
let slug = existsSync(OUT + "slug.txt") ? readFileSync(OUT + "slug.txt", "utf8").trim() : null;
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopColor, font: cs.fontSize + "/" + cs.fontWeight, color: cs.color, op: cs.opacity, cls: el.className?.baseVal ?? el.className?.toString().slice(0, 100) }; };
    const q = (s) => document.querySelector(s); const qa = (s) => [...document.querySelectorAll(s)];
    return { theme: document.documentElement.className, vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth,
      editorShell: box(q(".editor-shell .editor-shell") || q(".editor-shell")), editorOuter: box(q(".canvas-stage > .editor-shell")),
      stage: box(q(".canvas-stage")),
      points: qa(".control-point").length, selected: qa(".control-point.selected").length,
      pointR: q(".control-point")?.getAttribute("r"), pointPx: box(q(".control-point")),
      docks: qa(".glass-dock").map(box),
      badge: box(q(".dock-badge")), badgeText: q(".dock-badge")?.textContent,
      save: box(q("[aria-label='Save contour']")), saveSvg: q("[aria-label='Save contour'] svg")?.getAttribute("class"),
      undo: q("[aria-label='Undo']") ? { disabled: q("[aria-label='Undo']").disabled, ...box(q("[aria-label='Undo']")) } : null,
      redo: q("[aria-label='Redo']")?.disabled, del: q("[aria-label='Delete point']")?.disabled,
      ctl: ["Undo","Redo","Delete point","Smooth contour"].map((l) => { const e = q(`[aria-label='${l}']`); if (!e) return null; const cs = getComputedStyle(e); return l + " dis=" + e.disabled + " aria-dis=" + e.getAttribute("aria-disabled") + " op=" + cs.opacity + " color=" + cs.color + " svgop=" + (e.querySelector("svg") ? getComputedStyle(e.querySelector("svg")).opacity : ""); }),
      focusOutline: (() => { const e = document.activeElement; if (!e) return null; const cs = getComputedStyle(e); return cs.outlineStyle + " " + cs.outlineWidth + " " + cs.boxShadow.slice(0, 80); })(),
      edit: box(q("[aria-label='Edit contour']")), editPressed: q("[aria-label='Edit contour']")?.getAttribute("aria-pressed") ?? q("[aria-label='Edit contour']")?.getAttribute("data-active"),
      popovers: qa("[data-reka-popper-content-wrapper] > *, [role=dialog]").map(box),
      layers: qa(".viz-panel-left > *").map((e) => ({ text: e.textContent.trim().slice(0, 40), ...box(e) })),
      previewSvg: box(q(".preview-svg")), previewEmpty: !!q(".preview-empty"),
      tabs: qa("[role=tab]").map((t) => t.textContent.trim() + ":" + t.getAttribute("aria-selected")),
      active: document.activeElement?.outerHTML.slice(0, 140),
      tooltips: qa("[role=tooltip]").map((t) => t.textContent.trim()) };
  });
}
async function shot(page, name) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
}
const editorDock = (page) => page.locator(".controls-overlay .glass-dock").first();
async function expandEditorDock(page, vp) {
  const d = editorDock(page);
  if (vp === "d") await d.hover(); else await page.locator(".controls-overlay [aria-label='Expand dock']").first().tap().catch(() => d.tap());
  await page.waitForTimeout(900);
}
async function press(page, vp, loc) { if (vp === "d") { await loc.hover(); await loc.click(); } else await loc.tap(); }

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const P = `${vp}-${theme}`; if (ONLY && ONLY !== P) continue;
  appendFileSync(OUT + "tree-state.txt", `${P} ${tree()} ${new Date().toISOString()}\n`);
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${P} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${P} console.${m.type()} ${m.text().slice(0, 200)}`); });
  try {
    if (!slug) {
      await page.goto(BASE + "/visualize", { waitUntil: "networkidle" });
      await page.locator("[data-testid=image-file-input]").setInputFiles(IMG);
      await page.waitForURL(/\/w\//, { timeout: 30000 });
      slug = new URL(page.url()).pathname.split("/").pop(); writeFileSync(OUT + "slug.txt", slug);
    } else await page.goto(BASE + "/w/" + slug, { waitUntil: "networkidle" });
    await page.locator(".play-control").waitFor({ timeout: 60000 }).catch((e) => errors.push(P + " no play-control " + e.message));
    await page.waitForTimeout(2000);
    if (vp === "m") { const t = page.getByRole("tab", { name: /canvas/i }); if (await t.count()) await t.first().tap(); await page.waitForTimeout(600); }
    // reach: persistent Pencil in the top dock
    const editBtn = page.locator("[aria-label='Edit contour']").first();
    await editBtn.waitFor({ timeout: 30000 });
    await page.mouse.move(vp === "d" ? 720 : 195, 450); await page.waitForTimeout(2600); // let the top dock rest collapsed
    await press(page, vp, editBtn);
    await page.waitForTimeout(1200);
    let entered = await page.locator("[aria-label='Save contour']").count();
    metrics[`${P}-editFirstClickEntered`] = !!entered;
    if (!entered) { await press(page, vp, editBtn); await page.locator("[aria-label='Save contour']").first().waitFor({ timeout: 8000 }); }
    await page.mouse.move(vp === "d" ? 720 : 195, vp === "d" ? 450 : 420);
    await shot(page, `${P}-0-editing-untouched`);
    if (vp === "m") { await page.getByRole("tab", { name: /controls/i }).first().tap(); await shot(page, `${P}-0b-editor-panel`);
      await page.getByRole("tab", { name: /canvas/i }).first().tap(); await page.waitForTimeout(500); }
    await expandEditorDock(page, vp); await shot(page, `${P}-1-dock-expanded`);
    // drag a control point (mouse drag; pointer events on the SVG)
    const pts = page.locator(".control-point"); const n = await pts.count();
    const bb = await pts.nth(Math.floor(n / 4)).boundingBox();
    if (bb) { const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
      await page.mouse.move(cx, cy); await page.mouse.down(); await page.mouse.move(cx + 30, cy - 25, { steps: 8 }); await page.mouse.move(cx + 60, cy - 50, { steps: 8 }); await page.mouse.up(); }
    else errors.push(P + " no control point bbox");
    await page.mouse.move(vp === "d" ? 1400 : 380, 120); // leave the dock → auto-collapse after 2s
    await page.waitForTimeout(2600); await shot(page, `${P}-2-after-drag-collapsed`);
    await expandEditorDock(page, vp); await shot(page, `${P}-3-after-drag-expanded-undo`);
    if (vp === "d") {
      await page.locator("[aria-label='Magnet options']").first().hover(); await shot(page, `${P}-4-magnet-popover`);
      await page.locator("[aria-label='Overlay options']").first().hover(); await shot(page, `${P}-5-overlay-popover`);
      // does "Contour trace" do anything in the editor?
      const before = await page.locator(".canvas-stage").screenshot();
      const tr = page.locator("[aria-label='Contour trace']").last(); if (await tr.count()) { await tr.click(); await page.waitForTimeout(600); }
      const after = await page.locator(".canvas-stage").screenshot();
      metrics[`${P}-traceToggleChangedStage`] = Buffer.compare(before, after) !== 0;
      await shot(page, `${P}-6-trace-toggled`);
      if (await tr.count()) await tr.click().catch(() => {});
      await page.mouse.move(1400, 120); await page.waitForTimeout(400);
      const img = page.locator("[aria-label='Image overlay']").last();
      await page.locator("[aria-label='Overlay options']").first().hover().catch(() => {});
      if (await img.count()) { await img.click().catch(() => {}); await shot(page, `${P}-7-image-overlay-on`); await img.click().catch(() => {}); }
      // focus ring on the editor shell (tabindex=0, outline:none)
      await page.mouse.move(1400, 120); await page.waitForTimeout(2500);
      await page.locator(".canvas-stage .editor-shell .editor-shell, .canvas-stage .editor-shell [tabindex='0']").first().focus().catch((e) => errors.push(P + " focus " + e.message));
      await shot(page, `${P}-8-editor-keyboard-focus`);
    }
    // Save
    await page.mouse.move(vp === "d" ? 1400 : 380, 120); await page.waitForTimeout(2600); // editor dock resting collapsed
    await press(page, vp, page.locator("[aria-label='Save contour']").first());
    await page.waitForTimeout(1500);
    metrics[`${P}-saveFirstClickSaved`] = (await page.locator("[aria-label='Save contour'] svg").first().getAttribute("class"))?.includes("check") ?? false;
    if (!metrics[`${P}-saveFirstClickSaved`]) { await press(page, vp, page.locator("[aria-label='Save contour']").first()); await page.waitForTimeout(1500); } await page.mouse.move(vp === "d" ? 1400 : 380, 120); await page.waitForTimeout(2600);
    await shot(page, `${P}-9-saved`);
    if (vp === "d") { await page.locator("[aria-label='Save contour']").first().hover(); await shot(page, `${P}-9b-saved-hover`); }
    // sidebar editor panel (desktop: visible; open Contour layer too)
    if (vp === "m") { await page.getByRole("tab", { name: /controls/i }).first().tap(); await page.waitForTimeout(600); }
    await shot(page, `${P}-10-editor-panel`);
    const cl = page.getByRole("button", { name: /Contour/ }).first();
    if (await cl.count()) { await press(page, vp, cl); await shot(page, `${P}-11-editor-panel-contour-open`); }
    // global keydown leak: select a point, leave edit mode, press Backspace → does the hidden contour lose a point?
    if (vp === "d" && theme === "light") {
      const before = await page.locator(".control-point").count();
      const p2 = page.locator(".control-point").nth(5); const b2 = await p2.boundingBox();
      if (b2) { await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2); await page.mouse.down(); await page.mouse.up(); }
      await page.locator("[aria-label='Edit contour']").first().click(); await page.waitForTimeout(800);
      await page.keyboard.press("Backspace"); await page.waitForTimeout(300);
      const after = await page.locator(".control-point").count();
      metrics[`${P}-backspaceWhileNotEditing`] = { before, after };
      await shot(page, `${P}-12-left-edit-mode`);
      // undo in a text field: find any text input on page
      const inputs = await page.locator("input[type=text], input:not([type]), textarea, [contenteditable=true]").count();
      metrics[`${P}-textInputsOnPage`] = inputs;
    }
  } catch (e) { errors.push(`${P} flow ${e.message.slice(0, 240)}`); await page.screenshot({ path: OUT + P + "-ERR.png" }); }
  await ctx.close();
}
writeFileSync(OUT + (ONLY ? `metrics-${ONLY}.json` : "metrics.json"), JSON.stringify({ slug, metrics, errors }, null, 1));
await browser.close();
console.log("done", slug, errors.length, "errors");
