// CHALLENGE-D live probe #4 — tight state captures + rects for pixel sampling.
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const ORIGIN = "http://localhost:9000";
const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });
const SEL = '[role="textbox"][aria-label="Gradient CSS"]';
const log = [], rects = [];
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

async function shot(page, name, dpr, pad = { t: 0, b: 0 }) {
  const el = page.locator(SEL);
  await el.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(250);
  const bb = await el.boundingBox();
  await page.screenshot({ path: `${OUT}/${name}.png` });
  rects.push({ name, dpr, box: bb ? { x: bb.x, y: bb.y, w: bb.width, h: bb.height } : null, pad });
  return bb;
}

async function run(id, ctxOpts, scheme) {
  const dpr = ctxOpts.deviceScaleFactor ?? 3;
  const browser = await webkit.launch();
  const ctx = await browser.newContext({ ...ctxOpts, colorScheme: scheme });
  await ctx.addInitScript(init(scheme));
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/#/gradient`, { waitUntil: "load" });
  await page.waitForTimeout(3200);
  say(`\n===== ${id} =====`);

  await shot(page, `${id}-A-idle`, dpr);

  await page.locator(SEL).click(); await page.waitForTimeout(300);
  await shot(page, `${id}-B-focus`, dpr);
  say("FOCUS " + JSON.stringify(await page.evaluate((s) => {
    const cs = getComputedStyle(document.querySelector(s));
    return { boxShadow: cs.boxShadow, outlineStyle: cs.outlineStyle };
  }, SEL)));

  await setText(page, "linear-gradient(90deg, notacolor, blue)");
  await page.waitForTimeout(1100);
  await shot(page, `${id}-C-error`, dpr, { b: 34 });

  await setText(page, "");
  await page.waitForTimeout(1100);
  await shot(page, `${id}-D-empty`, dpr, { b: 34 });

  const many = "linear-gradient(90deg, " + Array.from({ length: 12 }, (_, i) => `oklch(0.7 0.15 ${i * 30}) ${Math.round(i * 100 / 11)}%`).join(", ") + ")";
  await setText(page, many);
  await page.waitForTimeout(1200);
  await shot(page, `${id}-E-overflow`, dpr);
  say("OVERFLOW " + JSON.stringify(await page.evaluate((s) => {
    const el = document.querySelector(s); if (!el) return null;
    const r = el.getBoundingClientRect();
    return { scrollH: el.scrollHeight, clientH: el.clientHeight, h: +r.height.toFixed(1), w: +r.width.toFixed(1) };
  }, SEL)));

  // forced colors, focused
  try {
    await page.locator(SEL).click(); await page.waitForTimeout(200);
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(300);
    say("FORCED " + JSON.stringify(await page.evaluate((s) => {
      const el = document.querySelector(s); const cs = getComputedStyle(el);
      return { boxShadow: cs.boxShadow, outlineStyle: cs.outlineStyle, bg: cs.backgroundColor,
        border: cs.borderTopColor, borderStyle: cs.borderTopStyle, color: cs.color,
        forced: matchMedia("(forced-colors: active)").matches };
    }, SEL)));
    await shot(page, `${id}-F-forcedcolors-focus`, dpr, { b: 34 });
    await page.emulateMedia({ forcedColors: "none" });
  } catch (e) { say("forced: " + e.message.split("\n")[0]); }

  // 200% zoom
  if (ctxOpts.viewport) {
    await setText(page, "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)");
    await page.waitForTimeout(900);
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    await page.waitForTimeout(600);
    say("ZOOM-200 " + JSON.stringify(await page.evaluate((s) => {
      const el = document.querySelector(s); if (!el) return { gone: true };
      const r = el.getBoundingClientRect(); const de = document.documentElement;
      return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), scrollH: el.scrollHeight,
        clientH: el.clientHeight, overflowing: el.scrollHeight > el.clientHeight + 1,
        docOverflowX: de.scrollWidth > de.clientWidth + 1, docScrollW: de.scrollWidth, docClientW: de.clientWidth };
    }, SEL)));
    await shot(page, `${id}-G-zoom200`, dpr);
    await page.evaluate(() => { document.documentElement.style.zoom = ""; });
  }
  await browser.close();
}

await run("m-desk-light", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, "light");
await run("m-desk-dark", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, "dark");
await run("m-mob-light", { ...devices["iPhone 14"] }, "light");
await run("m-mob-dark", { ...devices["iPhone 14"] }, "dark");
writeFileSync(`${OUT}/probe4-log.txt`, log.join("\n"));
writeFileSync(`${OUT}/probe4-rects.json`, JSON.stringify(rects, null, 1));
console.log("\nwrote", OUT);
