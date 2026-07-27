// Visual audit — the STATE matrices no prior audit covered: 200% zoom, reduced-motion,
// forced-colors, RTL, and keyboard-focus. WebKit (Safari engine), desktop + mobile.
//
// MT-F022: this harness emitted four false signals before it was corrected. Three fixes are
// load-bearing and must not be undone: (1) `dir=rtl` is applied POST-load — documentElement is
// null at addInitScript time in WebKit; (2) motion is measured by instrumenting rAF, because
// getAnimations() cannot see a WebGL render loop; (3) keyboard rows are meaningless in WebKit
// alone — macOS ships Full Keyboard Access OFF, so run ENGINE=chromium before believing any
// focus gap, and key focus identity by DOM path, never by label (see probes/kbd-reach.mjs).
import { webkit, chromium, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ENGINE = process.env.ENGINE === "chromium" ? "chromium" : "webkit";
const engineFor = { webkit, chromium }[ENGINE];
const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const ROUTES = ["#/", "#/gradient", "#/browse", "#/blob", "#/admin/users"];

const MATRIX = [
  { id: "zoom-200-desktop", ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 },
    note: "200% zoom simulated as half-viewport at 2x DPR — WCAG 1.4.4 reflow" },
  { id: "reduced-motion-desktop", ctx: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" } },
  { id: "forced-colors-desktop", ctx: { viewport: { width: 1440, height: 900 }, forcedColors: "active" } },
  { id: "rtl-desktop", ctx: { viewport: { width: 1440, height: 900 } }, rtl: true },
  { id: "rtl-mobile", ctx: { ...devices["iPhone 14"] }, rtl: true },
  { id: "keyboard-focus-desktop", ctx: { viewport: { width: 1440, height: 900 } }, tab: 12 },
];

const rows = [];
const browser = await engineFor.launch();
for (const m of MATRIX) {
  const dir = resolve(HERE, "shots", m.id);
  mkdirSync(dir, { recursive: true });
  const context = await browser.newContext(m.ctx);
  for (const r of ROUTES) {
    const name = r.replace(/[#/]/g, "") || "picker";
    const page = await context.newPage();
    const errs = []; page.on("pageerror", e => errs.push(String(e).slice(0, 160)));
    // rAF is where the motion actually is; getAnimations() is structurally blind to it (MT-F022).
    // `window` exists at init-script time even though `document.documentElement` does not.
    await page.addInitScript(() => {
      window.__raf = 0;
      const orig = requestAnimationFrame;
      window.requestAnimationFrame = function (cb) { window.__raf++; return orig.call(window, cb); };
    });
    await page.goto(ORIGIN + "/" + r, { waitUntil: "networkidle", timeout: 45000 }).catch(e => errs.push("nav:" + String(e).slice(0,80)));
    await page.waitForTimeout(2200);
    // MT-F022 #1: documentElement is null at addInitScript time in WebKit, so the flip is post-load.
    if (m.rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(1200); }
    // Sample rAF across a quiet window: a renderer that has stopped is the reduced-motion assertion.
    const rafA = await page.evaluate(() => window.__raf ?? -1);
    await page.waitForTimeout(1500);
    const rafRate = (await page.evaluate(() => window.__raf ?? -1)) - rafA;
    if (m.tab) for (let i = 0; i < m.tab; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(90); }
    const probe = await page.evaluate(() => {
      const de = document.documentElement;
      const ae = document.activeElement;
      const vis = (el) => { const b = el.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
      const cs = ae && ae !== document.body ? getComputedStyle(ae) : null;
      return {
        overflowX: de.scrollWidth - de.clientWidth,
        overflowY: de.scrollHeight - de.clientHeight,
        dir: de.getAttribute("dir"),
        textLen: (document.body.innerText || "").trim().length,
        focused: ae ? `${ae.tagName.toLowerCase()}[${(ae.getAttribute("aria-label") || ae.textContent || "").trim().slice(0,28)}]` : null,
        focusRingVisible: cs ? (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none" : null,
        clipped: [...document.querySelectorAll("body *")].filter(vis)
          .filter(el => { const b = el.getBoundingClientRect(); return b.right > de.clientWidth + 1 || b.left < -1; })
          .slice(0, 8).map(el => `${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0,2).join(".")}`),
        animatedCount: document.getAnimations ? document.getAnimations().length : -1,
      };
    }).catch(e => ({ err: String(e).slice(0, 120) }));
    await page.screenshot({ path: resolve(dir, `${name}.png`), fullPage: true, animations: "disabled" }).catch(()=>{});
    rows.push({ matrix: m.id, route: r, engine: ENGINE, ...probe, rafPer1500ms: rafRate, pageErrors: errs });
    console.log(`${m.id.padEnd(24)} ${r.padEnd(14)} overflowX=${String(probe.overflowX).padStart(5)} dir=${probe.dir} text=${probe.textLen} clipped=${(probe.clipped||[]).length} anims=${probe.animatedCount} raf/1.5s=${String(rafRate).padStart(4)} focus=${probe.focused ?? "-"} ring=${probe.focusRingVisible ?? "-"} err=${errs.length}`);
    await page.close();
  }
  await context.close();
}
await browser.close();
writeFileSync(resolve(HERE, "STATES.json"), JSON.stringify(rows, null, 1));
