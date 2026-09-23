// UIA-F visualize-export-modal — headed Chromium, real GPU. READ-ONLY on the app trees.
// Reach: /w/<slug> -> bottom dock -> More options -> Export -> ExportModal. Only client-side state
// (switch toggles, a PNG download into Playwright's temp dir); no API write.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const slug = process.env.SEED || "smoky-nesting-ruby-cat";
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = []; const events = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 60), backdrop: cs.backdropFilter, border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 80), pad: cs.padding, font: cs.fontSize + "/" + cs.fontWeight + " " + cs.fontFamily.slice(0, 40), color: cs.color, outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor, cls: el.className?.toString().slice(0, 140) }; };
    const dlg = document.querySelector("[role=dialog]");
    const q = (s) => dlg ? [...dlg.querySelectorAll(s)] : [];
    return { theme: document.documentElement.className, vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth,
      dialog: box(dlg), overlay: box(document.querySelector("[data-slot=dialog-overlay], [data-state=open].fixed.inset-0")),
      title: box(q("[data-slot=dialog-title], h2")[0]), header: box(q("[data-slot=dialog-header]")[0]),
      close: box(q("[data-slot=dialog-close], button[aria-label*=lose], button:has(.sr-only)")[0]),
      closeHtml: q("button").map((b) => b.outerHTML.slice(0, 200)),
      rows: q(".option-row").map((r) => ({ text: r.textContent.trim(), ...box(r) })),
      switches: q("[role=switch]").map((s) => ({ checked: s.getAttribute("aria-checked"), thumb: box(s.firstElementChild), ...box(s) })),
      footer: box(q("[data-slot=dialog-footer]")[0]),
      buttons: q("button").map((b) => ({ text: b.textContent.trim(), ...box(b) })),
      description: q("[data-slot=dialog-description]").length, ariaDescribedby: dlg?.getAttribute("aria-describedby"),
      active: document.activeElement?.outerHTML.slice(0, 180) };
  });
}
async function shot(page, name) {
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + name + ".png" });
  const m = metrics[name] = await measure(page);
  if (m.dialog) { const b = m.dialog; const x0 = Math.max(0, b.x - 32), y0 = Math.max(0, b.y - 32);
    await page.screenshot({ path: OUT + name + "-crop.png", clip: { x: x0, y: y0, width: Math.min(m.vw, b.x + b.w + 32) - x0, height: Math.min(m.vh, b.y + b.h + 32) - y0 } }); }
}
async function expandDock(page, vp) {
  // the AnimationControls dock (in .controls-overlay) — its collapsed summary is the disclosure
  const exp = page.locator(".controls-overlay [aria-label='Expand dock']").first();
  if (await exp.count() && await exp.isVisible()) { if (vp === "d") await exp.click(); else await exp.tap(); }
  await page.waitForTimeout(800);
}
async function press(page, vp, loc) { if (vp === "d") { await loc.hover(); await loc.click(); } else { await loc.tap(); } }
async function openModal(page, vp) {
  await expandDock(page, vp);
  await press(page, vp, page.locator("[aria-label='More options']").first());
  await page.waitForTimeout(400);
  await press(page, vp, page.getByRole("menuitem", { name: /Export/ }).first());
  await page.locator("[role=dialog]").waitFor({ timeout: 5000 });
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`;
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m", acceptDownloads: true });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("fourier_visualizer_view_state", JSON.stringify({ editing: false, overlay: false, equation: false })); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${tag} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${tag} console.${m.type()} ${m.text().slice(0, 220)}`); });
  await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" }).catch((e) => errors.push("goto " + e.message));
  await page.locator(".controls-overlay .animation-dock").first().waitFor({ state: "attached", timeout: 60000 }).catch(() => {}); await page.locator("canvas").first().waitFor({ timeout: 60000 }).catch((e) => errors.push(`${tag} no dock ` + e.message));
  await page.waitForTimeout(1500);
  if (vp === "m") { const t = page.getByRole("tab", { name: /canvas/i }); if (await t.count()) await t.first().click(); await page.waitForTimeout(600); }
  try {
    await openModal(page, vp); await shot(page, `${tag}-0-open-default`);
    if (vp === "d") { await page.locator(".option-row").nth(1).hover(); await shot(page, `${tag}-1-row-hover`); }
    await page.keyboard.press("Tab"); await shot(page, `${tag}-2-keyboard-tab`);
    // toggle all switches off
    const sw = page.locator("[role=dialog] [role=switch]");
    const n = await sw.count();
    for (let i = 0; i < n; i++) await press(page, vp, sw.nth(i));
    await shot(page, `${tag}-3-switches-toggled`);
    // row label click toggles? (label wraps switch)
    await press(page, vp, page.locator(".option-label").first());
    await shot(page, `${tag}-4-label-click`);
    // Esc closes
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    events.push(`${tag} esc-closed=${!(await page.locator("[role=dialog]").count())}`);
    // reopen: do switches persist or reset?
    await openModal(page, vp); await page.waitForTimeout(400);
    events.push(`${tag} reopen-switches=${JSON.stringify(await page.locator("[role=dialog] [role=switch]").evaluateAll((a) => a.map((s) => s.getAttribute("aria-checked"))))}`);
    // Save PNG -> download?
    const dl = page.waitForEvent("download", { timeout: 6000 }).catch(() => null);
    await press(page, vp, page.getByRole("button", { name: /Save PNG/ }).first());
    const d = await dl; events.push(`${tag} download=${d ? d.suggestedFilename() : "NONE"}`);
    if (d) { const p = OUT + `${tag}-export.png`; await d.saveAs(p).catch(() => {}); }
    await page.waitForTimeout(500);
    events.push(`${tag} save-closed=${!(await page.locator("[role=dialog]").count())}`);
    await shot(page, `${tag}-5-after-save`);
  } catch (e) { errors.push(`${tag} flow ${e.message.slice(0, 220)}`); await page.screenshot({ path: OUT + tag + "-ERR.png" }); }
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ slug, metrics, events, errors }, null, 1));
await browser.close();
console.log("done", slug, errors.length, "errors"); console.log(events.join("\n")); console.log(errors.join("\n"));
