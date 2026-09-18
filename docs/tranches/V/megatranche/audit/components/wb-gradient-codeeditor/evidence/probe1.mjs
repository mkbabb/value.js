// CHALLENGE-D live probe — GradientCodeEditor. READ-ONLY against the dev server.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

const initScript = (scheme) => `
  try {
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
    const de = document.documentElement;
    if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark');
    else de.classList.remove('dark');
  } catch (e) {}
`;

const SEL = '[role="textbox"][aria-label="Gradient CSS"]';

function srgbToLin(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function relLum([r, g, b]) { return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b); }
function contrast(a, b) { const [l1, l2] = [relLum(a), relLum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); }

const log = [];
function say(...a) { const s = a.join(" "); log.push(s); console.log(s); }

async function run(matrixId, ctxOpts, scheme) {
  const browser = await webkit.launch();
  const ctx = await browser.newContext({ ...ctxOpts, colorScheme: scheme });
  await ctx.addInitScript(initScript(scheme));
  const page = await ctx.newPage();
  const consoleErrors = [], pageErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => pageErrors.push(String(e && e.stack ? e.stack.split("\n")[0] : e)));

  await page.goto(`${ORIGIN}/#/gradient`, { waitUntil: "load" });
  await page.waitForTimeout(3500);

  const ed = page.locator(SEL);
  await ed.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  say(`\n===== ${matrixId} =====`);

  // ---- geometry + material -------------------------------------------------
  const geom = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const parentPane = el.closest("main") || document.body;
    // sibling readout rail (the OM-13 easing row) for radius/material comparison
    const rail = document.querySelector(".readout-rail");
    const railCs = rail ? getComputedStyle(rail) : null;
    const railRect = rail ? rail.getBoundingClientRect() : null;
    const tokens = [...el.querySelectorAll("span")].slice(0, 12).map((s) => ({
      cls: s.className, color: getComputedStyle(s).color, text: s.textContent.slice(0, 18),
    }));
    return {
      rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      scrollH: el.scrollHeight, clientH: el.clientHeight,
      css: {
        backgroundColor: cs.backgroundColor, backgroundImage: cs.backgroundImage.slice(0, 90),
        backdropFilter: cs.backdropFilter, borderColor: cs.borderTopColor, borderWidth: cs.borderTopWidth,
        borderRadius: cs.borderRadius, color: cs.color, fontFamily: cs.fontFamily,
        fontSize: cs.fontSize, lineHeight: cs.lineHeight, padding: cs.padding,
        minHeight: cs.minHeight, maxHeight: cs.maxHeight, overflowY: cs.overflowY,
        overflowWrap: cs.overflowWrap, wordBreak: cs.wordBreak, whiteSpace: cs.whiteSpace,
        transition: cs.transition, scrollbarWidth: cs.scrollbarWidth, boxShadow: cs.boxShadow,
        outline: cs.outline,
      },
      attrs: { spellcheck: el.getAttribute("spellcheck"), role: el.getAttribute("role"),
        ariaLabel: el.getAttribute("aria-label"), ariaInvalid: el.getAttribute("aria-invalid"),
        ariaDescribedby: el.getAttribute("aria-describedby"),
        ariaMultiline: el.getAttribute("aria-multiline"), tabIndex: el.tabIndex,
        id: el.id || "(none)", inputMode: el.getAttribute("inputmode"),
        autocapitalize: el.getAttribute("autocapitalize"), autocorrect: el.getAttribute("autocorrect"),
      },
      tokens,
      rail: rail ? {
        rect: { w: +railRect.width.toFixed(1), h: +railRect.height.toFixed(1) },
        borderRadius: railCs.borderRadius, backgroundColor: railCs.backgroundColor,
        borderColor: railCs.borderTopColor, borderWidth: railCs.borderTopWidth, padding: railCs.padding,
      } : null,
      paneBg: getComputedStyle(parentPane).backgroundColor,
    };
  }, SEL);
  say("GEOM+CSS " + JSON.stringify(geom, null, 1));

  await page.screenshot({ path: `${OUT}/${matrixId}-01-idle.png`, clip: {
    x: Math.max(0, geom.rect.x - 24), y: Math.max(0, geom.rect.y - 70),
    width: Math.min(geom.rect.w + 48, (ctxOpts.viewport?.width ?? 390)), height: geom.rect.h + 110 } });

  // ---- pixel sample: plate vs editor vs ink ---------------------------------
  const shotBuf = await page.screenshot({ path: `${OUT}/${matrixId}-00-full.png`, fullPage: false });

  // ---- FOCUS state ---------------------------------------------------------
  await ed.click();
  await page.waitForTimeout(250);
  const focusCss = await page.evaluate((sel) => {
    const el = document.querySelector(sel); const cs = getComputedStyle(el);
    return { outline: cs.outline, boxShadow: cs.boxShadow, borderColor: cs.borderTopColor,
      activeIsEditor: document.activeElement === el, caretColor: cs.caretColor };
  }, SEL);
  say("FOCUS " + JSON.stringify(focusCss));
  await page.screenshot({ path: `${OUT}/${matrixId}-02-focus.png`, clip: {
    x: Math.max(0, geom.rect.x - 24), y: Math.max(0, geom.rect.y - 70),
    width: Math.min(geom.rect.w + 48, (ctxOpts.viewport?.width ?? 390)), height: geom.rect.h + 110 } });

  // ---- MT-F001: type an empty-argument colour function ----------------------
  consoleErrors.length = 0; pageErrors.length = 0;
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    el.focus();
    const range = document.createRange(); range.selectNodeContents(el);
    const s = window.getSelection(); s.removeAllRanges(); s.addRange(range);
  }, SEL);
  await page.keyboard.press("Backspace");
  await page.keyboard.type("linear-gradient(90deg, oklch(), blue)", { delay: 8 });
  await page.waitForTimeout(1200);

  const afterCrash = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const verdict = document.querySelector('[data-testid="gradient-parse-verdict"]');
    return {
      editorText: el.textContent,
      editorHtmlHasSpans: el.querySelectorAll("span").length,
      verdictShown: !!verdict, verdictText: verdict ? verdict.textContent.trim() : null,
      ariaInvalid: el.getAttribute("aria-invalid"),
      borderColor: getComputedStyle(el).borderTopColor,
    };
  }, SEL);
  say("MT-F001 TYPED `oklch()` → " + JSON.stringify(afterCrash));
  say("MT-F001 pageErrors: " + JSON.stringify(pageErrors));
  say("MT-F001 consoleErrors: " + JSON.stringify(consoleErrors.slice(0, 4)));
  await page.screenshot({ path: `${OUT}/${matrixId}-03-oklch-empty.png`, clip: {
    x: Math.max(0, geom.rect.x - 24), y: Math.max(0, geom.rect.y - 70),
    width: Math.min(geom.rect.w + 48, (ctxOpts.viewport?.width ?? 390)), height: geom.rect.h + 130 } });

  // ---- a NORMAL rejection (control): what the designed error state looks like
  consoleErrors.length = 0; pageErrors.length = 0;
  await page.evaluate((sel) => {
    const el = document.querySelector(sel); el.focus();
    const range = document.createRange(); range.selectNodeContents(el);
    const s = window.getSelection(); s.removeAllRanges(); s.addRange(range);
  }, SEL);
  await page.keyboard.press("Backspace");
  await page.keyboard.type("linear-gradient(90deg, notacolor, blue)", { delay: 8 });
  await page.waitForTimeout(1200);
  const rejected = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
    const vcs = v ? getComputedStyle(v) : null;
    const r = el.getBoundingClientRect();
    return { verdictText: v ? v.textContent.trim() : null,
      verdictCss: vcs ? { color: vcs.color, fontSize: vcs.fontSize, fontFamily: vcs.fontFamily,
        role: v.getAttribute("role"), ariaLive: v.getAttribute("aria-live"), id: v.id || "(none)" } : null,
      ariaInvalid: el.getAttribute("aria-invalid"), borderColor: getComputedStyle(el).borderTopColor,
      rectY: +r.y.toFixed(1), rectH: +r.height.toFixed(1) };
  }, SEL);
  say("CONTROL REJECT → " + JSON.stringify(rejected));
  say("CONTROL pageErrors: " + JSON.stringify(pageErrors));
  await page.screenshot({ path: `${OUT}/${matrixId}-04-rejected.png`, clip: {
    x: Math.max(0, geom.rect.x - 24), y: Math.max(0, rejected.rectY - 70),
    width: Math.min(geom.rect.w + 48, (ctxOpts.viewport?.width ?? 390)), height: rejected.rectH + 130 } });

  // ---- overflow / truncation: a long many-stop gradient --------------------
  await page.evaluate((sel) => {
    const el = document.querySelector(sel); el.focus();
    const range = document.createRange(); range.selectNodeContents(el);
    const s = window.getSelection(); s.removeAllRanges(); s.addRange(range);
  }, SEL);
  await page.keyboard.press("Backspace");
  const many = "linear-gradient(90deg, " + Array.from({length: 12}, (_, i) =>
    `oklch(0.7 0.15 ${i * 30}) ${Math.round(i * 100 / 11)}%`).join(", ") + ")";
  await page.keyboard.type(many, { delay: 2 });
  await page.waitForTimeout(1200);
  const overflow = await page.evaluate((sel) => {
    const el = document.querySelector(sel); const r = el.getBoundingClientRect();
    return { scrollH: el.scrollHeight, clientH: el.clientHeight, h: +r.height.toFixed(1),
      overflowing: el.scrollHeight > el.clientHeight + 1,
      textLen: el.textContent.length };
  }, SEL);
  say("OVERFLOW " + JSON.stringify(overflow));
  await page.screenshot({ path: `${OUT}/${matrixId}-05-overflow.png`, clip: {
    x: Math.max(0, geom.rect.x - 24), y: Math.max(0, geom.rect.y - 70),
    width: Math.min(geom.rect.w + 48, (ctxOpts.viewport?.width ?? 390)), height: 300 } });

  // ---- BLUR resync behaviour (the "editor truce") --------------------------
  await page.evaluate((sel) => { document.querySelector(sel).blur(); });
  await page.waitForTimeout(500);
  const afterBlur = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return { text: el.textContent.slice(0, 90),
      verdict: (document.querySelector('[data-testid="gradient-parse-verdict"]') || {}).textContent || null };
  }, SEL);
  say("AFTER BLUR " + JSON.stringify(afterBlur));

  await browser.close();
}

await run("desktop-light", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, "light");
await run("desktop-dark", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, "dark");
await run("mobile-light", { ...devices["iPhone 14"] }, "light");

writeFileSync(`${OUT}/probe-log.txt`, log.join("\n"));
console.log("\nwrote", OUT);
