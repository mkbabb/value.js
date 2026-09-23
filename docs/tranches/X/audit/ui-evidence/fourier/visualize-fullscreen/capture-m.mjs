// Mobile (390x844) capture, light+dark — reaches the Canvas tab first; logs edit-state after each tap.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const slug = readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const R = {}; const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const st = (page) => page.evaluate(() => ({ view: localStorage.getItem("fourier_visualizer_view_state"), dlg: !!document.querySelector("[data-slot=dialog-content]"),
  editorShellInDlg: !!document.querySelector("[data-slot=dialog-content] .editor-shell"),
  dock: (() => { const d = document.querySelector(".controls-dock-anchor .glass-dock"); if (!d) return null; const r = d.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height), d.className.includes("expanded") ? "expanded" : "collapsed"]; })(),
  controls: [...document.querySelectorAll(".controls-dock-anchor [aria-label]")].filter((e) => e.getClientRects().length).map((e) => { const r = e.getBoundingClientRect(); return e.getAttribute("aria-label") + "@" + Math.round(r.x) + "," + Math.round(r.y) + (e.closest("[inert]") ? "(inert)" : ""); }),
  adock: (() => { const d = document.querySelector("[data-slot=dialog-content] .animation-dock"); if (!d) return null; const r = d.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height), d.className.includes("expanded") ? "expanded" : "collapsed"]; })(),
  canvasCss: document.querySelector("[data-slot=dialog-content] canvas")?.style.width,
  menu: (() => { const m = document.querySelector(".menu-popup"); if (!m) return null; const r = m.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), visibleOnTop: m.contains(hit) }; })(),
  scrollW: document.documentElement.scrollWidth }));
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const log = (R[theme] = []);
  const shot = async (n) => { await page.waitForTimeout(800); await page.screenshot({ path: `${OUT}m-${theme}-${n}.png` }); log.push({ n, ...(await st(page)) }); };
  try {
    await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
    await page.getByRole("tab", { name: /canvas/i }).first().tap(); await page.waitForTimeout(1200);
    await shot("a-canvas-tab");
    const dock = page.locator(".controls-dock-anchor .glass-dock").first();
    const db = await dock.boundingBox();
    await page.touchscreen.tap(db.x + db.width / 2, db.y + db.height / 2); await shot("b-topdock-tapped-centre");
    // undo the accidental edit toggle if the centre tap hit the persistent Edit control
    if (await page.evaluate(() => (localStorage.getItem("fourier_visualizer_view_state") || "").includes('"editing":true'))) { await page.locator("[aria-label='Edit contour']").first().tap(); await page.waitForTimeout(1500); }
    await page.mouse.click(5, 800).catch(() => {}); await page.waitForTimeout(2500);
    await page.locator(".controls-dock-anchor [aria-label='Expand dock']").first().tap().catch(() => {}); await page.waitForTimeout(800);
    await shot("b2-topdock-expanded-via-summary");
    await page.locator("[aria-label='Fullscreen']").first().tap(); await page.waitForTimeout(600);
    await shot("0-fs-open");
    // play via persistent control
    await page.locator("[data-slot=dialog-content] .play-control").tap(); await page.waitForTimeout(2500);
    await shot("1-fs-playing");
    // expand the animation dock by tapping its summary (not the play control)
    await page.locator("[data-slot=dialog-content] .animation-dock [aria-label='Expand dock']").first().tap().catch((e) => log.push({ err: 'expand ' + e.message.slice(0, 100) }));
    await shot("2-fs-anim-dock-expanded");
    await page.locator("[data-slot=dialog-content] [aria-label='More options']").tap().catch((e) => log.push({ err: e.message.slice(0, 120) }));
    await shot("3-fs-more-menu");
    await page.keyboard.press("Escape"); await page.waitForTimeout(400);
    await page.locator("[aria-label='Exit fullscreen']").tap(); await page.waitForTimeout(900);
    // editing: expand top dock, tap Edit contour, then Fullscreen
    await page.locator(".controls-dock-anchor [aria-label='Expand dock']").first().tap().catch(() => {}); await page.waitForTimeout(800);
    await shot("c-topdock-expanded-for-edit");
    if (!(await page.evaluate(() => (localStorage.getItem("fourier_visualizer_view_state") || "").includes('"editing":true'))))
      { await page.locator("[aria-label='Edit contour']").first().tap(); await page.waitForTimeout(1200); }
    await page.locator(".controls-dock-anchor [aria-label='Expand dock']").first().tap().catch(() => {}); await page.waitForTimeout(800);
    await page.locator("[aria-label='Fullscreen']").first().tap(); await page.waitForTimeout(600);
    await shot("6-fs-editing");
  } catch (e) { log.push({ err: e.message.slice(0, 300) }); await page.screenshot({ path: `${OUT}m-${theme}-ERR2.png` }); }
  await ctx.close();
}
writeFileSync(OUT + "capture-m.json", JSON.stringify(R, null, 1)); await browser.close(); console.log(JSON.stringify(R, null, 1));
