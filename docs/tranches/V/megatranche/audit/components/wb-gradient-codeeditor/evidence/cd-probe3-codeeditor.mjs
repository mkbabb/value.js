// CHALLENGE-D live probe #3 — states, material, motion, zoom, contrast.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const ORIGIN = "http://localhost:9000";
const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });
const SEL = '[role="textbox"][aria-label="Gradient CSS"]';
const log = [];
const say = (...a) => { const s = a.join(" "); log.push(s); console.log(s); };
const init = (s) => `try{localStorage.setItem('vueuse-color-scheme',${JSON.stringify(s)});const d=document.documentElement;${JSON.stringify(s)}==='dark'?d.classList.add('dark'):d.classList.remove('dark');}catch(e){}`;

async function setText(page, text) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel); if (!el) return;
    el.focus();
    const r = document.createRange(); r.selectNodeContents(el);
    const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }, SEL);
  await page.keyboard.press("Backspace");
  if (text) await page.keyboard.type(text, { delay: 3 });
}

const CONTRAST_FN = `
function srgbToLin(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
function lum(a){return 0.2126*srgbToLin(a[0])+0.7152*srgbToLin(a[1])+0.0722*srgbToLin(a[2]);}
function parse(col){
  const d=document.createElement('div');d.style.color=col;document.body.appendChild(d);
  const c=getComputedStyle(d).color;document.body.removeChild(d);
  const m=c.match(/[\\d.]+/g);return m?[+m[0],+m[1],+m[2],m[3]!==undefined?+m[3]:1]:null;
}
function over(fg,bg){const a=fg[3];return [0,1,2].map(i=>fg[i]*a+bg[i]*(1-a));}
function cr(a,b){const l=[lum(a),lum(b)].sort((x,y)=>y-x);return (l[0]+0.05)/(l[1]+0.05);}
`;

async function run(matrixId, ctxOpts, scheme) {
  const browser = await webkit.launch();
  const ctx = await browser.newContext({ ...ctxOpts, colorScheme: scheme });
  await ctx.addInitScript(init(scheme));
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/#/gradient`, { waitUntil: "load" });
  await page.waitForTimeout(3200);
  await page.locator(SEL).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  say(`\n===== ${matrixId} (${scheme}) =====`);

  // --- transition, non-PRM ---
  const t0 = await page.evaluate((sel) => {
    const el = document.querySelector(sel); const cs = getComputedStyle(el);
    return { inlineStyleAttr: el.getAttribute("style"),
      transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration,
      transitionTimingFunction: cs.transitionTimingFunction,
      tokenDurationNormal: getComputedStyle(document.documentElement).getPropertyValue("--duration-normal").trim(),
      tokenEaseStandard: getComputedStyle(document.documentElement).getPropertyValue("--ease-standard").trim() };
  }, SEL);
  say("TRANSITION(no-PRM) " + JSON.stringify(t0));

  // --- contrast: hljs ink vs the editor's composited backdrop ---
  const contrast = await page.evaluate(({ sel, fn }) => {
    eval(fn);
    const el = document.querySelector(sel);
    const csEl = getComputedStyle(el);
    // walk up for the first opaque ancestor background
    let node = el, bg = null;
    while (node) {
      const c = parse(getComputedStyle(node).backgroundColor);
      if (c && c[3] > 0.98) { bg = c; break; }
      node = node.parentElement;
    }
    if (!bg) bg = [255, 255, 255, 1];
    // composite the editor's own semi-transparent fill on top
    const own = parse(csEl.backgroundColor);
    const plate = own && own[3] > 0 ? over(own, bg) : bg.slice(0, 3);
    const out = { plateApprox: plate.map(v => Math.round(v)), editorOwnFill: csEl.backgroundColor, opaqueAncestorBg: bg };
    const seen = new Map();
    for (const s of el.querySelectorAll("span")) {
      const cls = s.className || "(bare)";
      if (seen.has(cls)) continue;
      const c = parse(getComputedStyle(s).color);
      seen.set(cls, { color: getComputedStyle(s).color, ratio: +cr(over(c, plate), plate).toFixed(2), sample: s.textContent.slice(0, 12) });
    }
    const plainInk = parse(csEl.color);
    out.plainText = { color: csEl.color, ratio: +cr(over(plainInk, plate), plate).toFixed(2) };
    out.tokens = Object.fromEntries(seen);
    return out;
  }, { sel: SEL, fn: CONTRAST_FN });
  say("CONTRAST " + JSON.stringify(contrast, null, 1));

  // --- EMPTY state ---
  await setText(page, "");
  await page.waitForTimeout(1100);
  const empty = await page.evaluate((sel) => {
    const el = document.querySelector(sel); if (!el) return { gone: true };
    const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
    const r = el.getBoundingClientRect();
    return { text: JSON.stringify(el.textContent), html: JSON.stringify(el.innerHTML.slice(0, 40)),
      h: +r.height.toFixed(1), verdict: v ? v.textContent.trim() : null,
      ariaInvalid: el.getAttribute("aria-invalid"), placeholder: el.getAttribute("data-placeholder") || null };
  }, SEL);
  say("EMPTY " + JSON.stringify(empty));
  const er = await page.locator(SEL).boundingBox();
  await page.screenshot({ path: `${OUT}/${matrixId}-empty.png`, clip: { x: er.x - 20, y: er.y - 60, width: er.width + 40, height: er.height + 110 } });

  // --- OVERFLOW state: 12 stops ---
  const many = "linear-gradient(90deg, " + Array.from({ length: 12 }, (_, i) => `oklch(0.7 0.15 ${i * 30}) ${Math.round(i * 100 / 11)}%`).join(", ") + ")";
  await setText(page, many);
  await page.waitForTimeout(1100);
  const ov = await page.evaluate((sel) => {
    const el = document.querySelector(sel); if (!el) return { gone: true };
    const r = el.getBoundingClientRect();
    return { scrollH: el.scrollHeight, clientH: el.clientHeight, h: +r.height.toFixed(1),
      overflowing: el.scrollHeight > el.clientHeight + 1, chars: el.textContent.length,
      scrollbarWidth: getComputedStyle(el).scrollbarWidth };
  }, SEL);
  say("OVERFLOW " + JSON.stringify(ov));
  const or_ = await page.locator(SEL).boundingBox();
  await page.screenshot({ path: `${OUT}/${matrixId}-overflow.png`, clip: { x: or_.x - 20, y: or_.y - 60, width: or_.width + 40, height: or_.height + 110 } });

  // --- break-all mid-token wrap witness (crop the wrapped body) ---
  await page.screenshot({ path: `${OUT}/${matrixId}-breakall.png`, clip: { x: or_.x, y: or_.y, width: or_.width, height: Math.min(or_.height, 200) } });

  // --- FOCUS + forced colors box-shadow survival ---
  await page.locator(SEL).click();
  await page.waitForTimeout(200);
  const focus0 = await page.evaluate((sel) => {
    const cs = getComputedStyle(document.querySelector(sel));
    return { boxShadow: cs.boxShadow, outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth,
      ringVar: cs.getPropertyValue("--tw-ring-color").trim() };
  }, SEL);
  say("FOCUS(normal) " + JSON.stringify(focus0));
  try {
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(250);
    const focus1 = await page.evaluate((sel) => {
      const el = document.querySelector(sel); const cs = getComputedStyle(el);
      return { forced: matchMedia("(forced-colors: active)").matches, boxShadow: cs.boxShadow,
        outlineStyle: cs.outlineStyle, bg: cs.backgroundColor, border: cs.borderTopColor,
        borderStyle: cs.borderTopStyle, borderWidth: cs.borderTopWidth };
    }, SEL);
    say("FOCUS(forced-colors) " + JSON.stringify(focus1));
    const fr = await page.locator(SEL).boundingBox();
    await page.screenshot({ path: `${OUT}/${matrixId}-forcedcolors.png`, clip: { x: fr.x - 20, y: fr.y - 60, width: fr.width + 40, height: fr.height + 110 } });
    await page.emulateMedia({ forcedColors: "none" });
  } catch (e) { say("forced-colors: " + e.message.split("\n")[0]); }

  // --- PRM ---
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(200);
  const prm = await page.evaluate((sel) => {
    const cs = getComputedStyle(document.querySelector(sel));
    return { prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
      transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration };
  }, SEL);
  say("TRANSITION(PRM) " + JSON.stringify(prm));
  await page.emulateMedia({ reducedMotion: "no-preference" });

  // --- 200% zoom (desktop only) ---
  if (ctxOpts.viewport) {
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    await page.waitForTimeout(500);
    const z = await page.evaluate((sel) => {
      const el = document.querySelector(sel); if (!el) return { gone: true };
      const r = el.getBoundingClientRect();
      const de = document.documentElement;
      return { w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        scrollH: el.scrollHeight, clientH: el.clientHeight,
        overflowing: el.scrollHeight > el.clientHeight + 1,
        docOverflowX: de.scrollWidth > de.clientWidth + 1,
        docScrollW: de.scrollWidth, docClientW: de.clientWidth };
    }, SEL);
    say("ZOOM-200 " + JSON.stringify(z));
    await page.evaluate(() => { document.documentElement.style.zoom = ""; });
  }

  // --- verdict typography (redundant fira-code?) ---
  await setText(page, "linear-gradient(90deg, notacolor, blue)");
  await page.waitForTimeout(1100);
  const verdict = await page.evaluate(() => {
    const v = document.querySelector('[data-testid="gradient-parse-verdict"]'); if (!v) return null;
    const cs = getComputedStyle(v);
    const probe = document.createElement("p");
    probe.className = "text-mono-small"; document.body.appendChild(probe);
    const base = getComputedStyle(probe).fontFamily; document.body.removeChild(probe);
    const r = v.getBoundingClientRect();
    return { classes: v.className, fontFamily: cs.fontFamily, textMonoSmallFontFamily: base,
      firaCodeRedundant: cs.fontFamily === base,
      color: cs.color, fontSize: cs.fontSize, role: v.getAttribute("role"),
      ariaLive: v.getAttribute("aria-live"), id: v.id || "(none)",
      rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) } };
  });
  say("VERDICT " + JSON.stringify(verdict));
  const vr = await page.locator(SEL).boundingBox();
  await page.screenshot({ path: `${OUT}/${matrixId}-error.png`, clip: { x: vr.x - 20, y: vr.y - 60, width: vr.width + 40, height: vr.height + 130 } });

  await browser.close();
}

await run("p3-desktop-light", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, "light");
await run("p3-desktop-dark", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, "dark");
await run("p3-mobile-light", { ...devices["iPhone 14"] }, "light");
await run("p3-mobile-dark", { ...devices["iPhone 14"] }, "dark");
writeFileSync(`${OUT}/probe3-log.txt`, log.join("\n"));
console.log("\nwrote", OUT);
