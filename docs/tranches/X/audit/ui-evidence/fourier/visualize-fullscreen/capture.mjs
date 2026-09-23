// UIA-F visualize-fullscreen — headed Chromium, real GPU. READ-ONLY on the app trees.
// Reuses the sibling seat's seeded workspace (visualize-view-options-popover/seed.txt); no API writes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const sh = (c) => execSync(c).toString().trim();
writeFileSync(OUT + "tree-state.txt",
  `fourier HEAD ${sh("git -C /Users/mkbabb/Programming/fourier-analysis rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | wc -l")}\n` +
  `glass HEAD ${sh("git -C /Users/mkbabb/Programming/glass-ui rev-parse --short HEAD")} dirty ${sh("git -C /Users/mkbabb/Programming/glass-ui status --porcelain | wc -l")}\n${new Date().toString()}\n`);
const slug = process.env.SEED || readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const metrics = {}; const errors = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const q = (s, r = document) => r.querySelector(s);
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderRadius, bg: cs.backgroundColor.slice(0, 60), bgImg: cs.backgroundImage.slice(0, 60), border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 60), pad: cs.padding, z: cs.zIndex, font: cs.fontSize, cls: el.className?.toString().slice(0, 120) }; };
    const dlg = q("[data-slot=dialog-content]");
    const adock = dlg && q(".animation-dock", dlg);
    const attrs = (el) => el && [...el.attributes].map((a) => a.name + "=" + a.value.slice(0, 40)).join(" ").slice(0, 400);
    const pops = [...document.querySelectorAll("[data-reka-popper-content-wrapper]")].map((w) => ({ ...box(w.firstElementChild), wrapperZ: getComputedStyle(w).zIndex, text: w.textContent.trim().slice(0, 80) }));
    const tips = [...document.querySelectorAll("[role=tooltip]")].map((t) => ({ text: t.textContent.trim().slice(0, 40), ...box(t.parentElement) }));
    const inDlg = dlg ? [...dlg.querySelectorAll("button,[role=button],[role=slider],select,[tabindex]")].filter((e) => e.offsetParent !== null || e.getClientRects().length).map((e) => ({ tag: e.tagName, label: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20), role: e.getAttribute("role"), ...box(e) })).slice(0, 25) : [];
    const overlay = q("[data-slot=dialog-overlay]") || q("[data-slot=modal-overlay]");
    return {
      theme: document.documentElement.className, url: location.pathname, vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth,
      dialog: box(dlg), dialogAttrs: attrs(dlg), overlay: box(overlay),
      close: box(dlg && q("[aria-label='Exit fullscreen']", dlg)),
      canvas: box(dlg && q("canvas", dlg)), canvases: dlg ? [...dlg.querySelectorAll("canvas")].map(box) : [],
      canvasContainer: box(dlg && (q(".canvas-container", dlg) || q(".editor-shell", dlg))),
      fsControls: box(dlg && q(".fs-controls", dlg)), adock: box(adock), adockAttrs: attrs(adock),
      adockLayers: adock ? [...adock.querySelectorAll(".dock-layers > *, [data-layer]")].map((e) => ({ inert: e.inert, ...box(e) })).slice(0, 4) : [],
      playCtl: box(dlg && q(".play-control", dlg)), playPressed: dlg && q(".play-control", dlg)?.getAttribute("aria-pressed"),
      timeline: box(dlg && q("[role=slider]", dlg)),
      interactive: inDlg, pops, tips,
      bodyInertSiblings: [...document.body.children].filter((c) => c.inert || c.getAttribute("aria-hidden") === "true").length,
      active: document.activeElement?.outerHTML.slice(0, 160),
    };
  });
}
async function shot(page, name) {
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + name + ".png" });
  metrics[name] = await measure(page);
}
async function openTopDock(page, vp) {
  const dock = page.locator(".controls-dock-anchor .glass-dock").first();
  if (vp === "d") { await dock.hover(); } else { await dock.tap().catch(() => dock.click()); }
  await page.waitForTimeout(800);
}
async function press(page, vp, sel) {
  const b = page.locator(sel).first();
  if (vp === "d") { await b.hover(); await b.click(); } else { await b.tap().catch(() => b.click()); }
}

for (const vp of Object.keys(VPS)) for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: VPS[vp], colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${vp}-${theme} pageerror ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`${vp}-${theme} console.${m.type()} ${m.text().slice(0, 220)}`); });
  await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" }).catch((e) => errors.push("goto " + e.message));
  await page.locator(".controls-dock-anchor").waitFor({ timeout: 60000 }).catch((e) => errors.push(`${vp}-${theme} no dock ` + e.message));
  await page.waitForTimeout(1500);
  if (vp === "m") { const t = page.getByRole("tab", { name: /canvas/i }); if (await t.count()) await t.first().click(); await page.waitForTimeout(600); }
  const tag = `${vp}-${theme}`;
  try {
    // 0 — open fullscreen from the top dock
    await openTopDock(page, vp); await press(page, vp, "[aria-label='Fullscreen']");
    await page.locator("[data-slot=dialog-content]").waitFor({ timeout: 8000 });
    await page.mouse.move(5, 450);
    await shot(page, `${tag}-0-fs-open-paused`);
    // 1 — play (persistent play control inside fullscreen)
    await press(page, vp, "[data-slot=dialog-content] .play-control");
    await page.mouse.move(5, 450); await page.waitForTimeout(2600);
    await shot(page, `${tag}-1-fs-playing`);
    // 2 — animation dock expanded inside fullscreen
    const ad = page.locator("[data-slot=dialog-content] .animation-dock").first();
    if (vp === "d") await ad.hover(); else await ad.locator("[aria-label='Expand dock'],[role=button]").first().tap().catch(() => ad.tap());
    await page.waitForTimeout(900);
    await shot(page, `${tag}-2-fs-anim-dock-expanded`);
    // 3 — more-options menu inside fullscreen (z-tier / portal check)
    await press(page, vp, "[data-slot=dialog-content] [aria-label='More options']");
    await page.waitForTimeout(700);
    await shot(page, `${tag}-3-fs-more-menu`);
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    metrics[`${tag}-3b-after-esc-menu`] = { dialogStillOpen: await page.locator("[data-slot=dialog-content]").count() };
    if (vp === "d" && theme === "light") {
      // 4 — exit control hover + keyboard focus
      await page.locator("[aria-label='Exit fullscreen']").hover(); await page.waitForTimeout(900);
      await shot(page, `${tag}-4-exit-hover`);
      await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
      await shot(page, `${tag}-5-keyboard-tab2`);
    }
    // close via Exit
    await press(page, vp, "[aria-label='Exit fullscreen']"); await page.waitForTimeout(900);
    metrics[`${tag}-closed`] = { dialogCount: await page.locator("[data-slot=dialog-content]").count(), active: await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 160)) };
    // 6 — while editing: toggle Edit contour, then fullscreen
    await openTopDock(page, vp); await press(page, vp, "[aria-label='Edit contour']"); await page.waitForTimeout(1200);
    await openTopDock(page, vp); await press(page, vp, "[aria-label='Fullscreen']");
    await page.locator("[data-slot=dialog-content]").waitFor({ timeout: 8000 });
    await page.mouse.move(5, 450);
    await shot(page, `${tag}-6-fs-editing`);
    // 7 — edit gesture inside fullscreen: drag at canvas centre-ish; then exit and inspect inline editor
    if (vp === "d" && theme === "light") {
      const m = metrics[`${tag}-6-fs-editing`];
      const before = await page.evaluate(() => document.querySelector("[data-slot=dialog-content] canvas")?.toDataURL().length);
      const c = m.canvas; if (c) { await page.mouse.move(c.x + c.w / 2, c.y + c.h * 0.22); await page.mouse.down(); await page.mouse.move(c.x + c.w / 2 + 60, c.y + c.h * 0.22 + 40, { steps: 8 }); await page.mouse.up(); }
      await page.waitForTimeout(600);
      await shot(page, `${tag}-7-fs-editing-after-drag`);
      await page.keyboard.press("Escape"); await page.waitForTimeout(900);
      await shot(page, `${tag}-8-inline-editor-after-fs-edit`);
      metrics[`${tag}-8-inline-editor-after-fs-edit`].dlgBeforeLen = before;
      metrics[`${tag}-8-inline-editor-after-fs-edit`].undoDisabled = await page.locator("[aria-label='Undo'],[aria-label*='Undo']").first().getAttribute("disabled").catch(() => "n/a");
    } else { await page.keyboard.press("Escape"); await page.waitForTimeout(800); }
    // restore view state (edit off) so later contexts start clean — localStorage is per-context anyway
  } catch (e) { errors.push(`${tag} flow ${e.message.slice(0, 240)}`); await page.screenshot({ path: OUT + tag + "-ERR.png" }); }
  await ctx.close();
}
writeFileSync(OUT + "metrics.json", JSON.stringify({ slug, metrics, errors }, null, 1));
await browser.close();
console.log("done", slug, errors.length, "errors");
