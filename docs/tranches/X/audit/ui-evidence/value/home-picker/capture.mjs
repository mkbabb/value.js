// home-picker capture — HEADED Chromium, 1440x900 + 390x844, light + dark.
// READ-ONLY on the app: navigates, hovers, clicks, scrolls; never persists.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/home-picker";
const URL = "http://localhost:9000/#/";
const sh = (c) => execSync(c, { cwd: "/Users/mkbabb/Programming/value.js" }).toString().trim();
const tree = () => `${sh("git rev-parse --short HEAD")} dirty=${sh("git status --porcelain | wc -l").trim()}`;
const manifest = [];
const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) for (const [vw, vh] of [[1440, 900], [390, 844]]) {
  const tag = `${vw}-${theme}`;
  const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, colorScheme: theme, hasTouch: vw < 500, isMobile: false });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 220)); });
  p.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 220)));
  const shot = async (name, opts = {}) => {
    const f = `${OUT}/${tag}-${name}.png`;
    await p.screenshot({ path: f, ...opts });
    manifest.push({ frame: `${tag}-${name}.png`, tree: tree(), t: new Date().toISOString() });
  };
  await p.goto(URL, { waitUntil: "load", timeout: 60000 });
  // early overture frame (blob not yet emerged)
  await p.waitForTimeout(300);
  await shot("00-boot-300ms");
  await p.waitForTimeout(4500);
  await shot("01-default");
  const card = p.locator(".pane-shell").first();
  await card.screenshot({ path: `${OUT}/${tag}-02-card.png` }); manifest.push({ frame: `${tag}-02-card.png`, tree: tree() });
  if (vw < 500) await shot("03-fullpage", { fullPage: true });
  // metrics
  const m = await p.evaluate(() => {
    const cs = (el, ks) => { const s = getComputedStyle(el); return Object.fromEntries(ks.map(k => [k, s.getPropertyValue(k)])); };
    const r = (el) => { const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
    const one = (s) => document.querySelector(s);
    const out = { html: document.documentElement.className, bodyBg: getComputedStyle(document.body).backgroundColor };
    for (const [k, s] of Object.entries({ card: ".pane-shell > :first-child", header: ".picker-header", title: ".space-trigger", readout: ".readout", rail: ".channel-rail", blob: ".hero-blob-anchor", spectrum: "[class*=spectrum]" })) {
      const el = one(s); if (!el) { out[k] = null; continue; }
      out[k] = { box: r(el), cls: String(el.className).slice(0, 140), ...cs(el, ["font-size", "font-family", "border-radius", "background-color", "box-shadow", "padding"]) };
    }
    out.sliderRows = [...document.querySelectorAll("[data-slot=slider], [role=slider]")].slice(0, 6).map(e => ({ box: r(e), rad: getComputedStyle(e).borderRadius, cls: String(e.className).slice(0, 100) }));
    out.railItems = [...document.querySelectorAll(".channel-rail-item")].map(e => ({ box: r(e), rad: getComputedStyle(e).borderRadius }));
    out.buttons = [...document.querySelectorAll(".pane-shell button")].map(e => ({ label: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 30), box: r(e), rad: getComputedStyle(e).borderRadius, slot: e.getAttribute("data-slot") }));
    out.canvas = [...document.querySelectorAll(".pane-shell canvas")].map(e => ({ box: r(e), rad: getComputedStyle(e).borderRadius, parentRad: getComputedStyle(e.parentElement).borderRadius, pcls: String(e.parentElement.className).slice(0, 100) }));
    out.docOverflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    return out;
  });
  writeFileSync(`${OUT}/${tag}-metrics.json`, JSON.stringify({ tree: tree(), ...m, errs }, null, 1));
  // hover: spectrum
  const spec = p.locator(".pane-shell canvas").first();
  if (await spec.count()) { await spec.hover({ position: { x: 60, y: 40 } }).catch(() => {}); await p.waitForTimeout(400); await card.screenshot({ path: `${OUT}/${tag}-04-spectrum-hover.png` }); manifest.push({ frame: `${tag}-04-spectrum-hover.png`, tree: tree() }); }
  // ConsoleRail tooltip hover
  const railItem = p.locator(".channel-rail-item").nth(1);
  if (await railItem.count()) {
    await railItem.hover(); await p.waitForTimeout(900);
    await shot("05-rail-tooltip");
    // keyboard focus on rail
    await railItem.focus(); await p.keyboard.press("ArrowDown"); await p.waitForTimeout(400);
    await card.screenshot({ path: `${OUT}/${tag}-06-rail-focus.png` }); manifest.push({ frame: `${tag}-06-rail-focus.png`, tree: tree() });
    await p.mouse.move(5, 5);
  }
  // slider hover/focus
  const slider = p.locator(".pane-shell [role=slider]").first();
  if (await slider.count()) { await slider.hover(); await slider.focus(); await p.waitForTimeout(400); await card.screenshot({ path: `${OUT}/${tag}-07-slider-focus.png` }); manifest.push({ frame: `${tag}-07-slider-focus.png`, tree: tree() }); }
  // space selector open
  const trig = p.locator(".space-trigger").first();
  if (await trig.count()) { await trig.click(); await p.waitForTimeout(700); await shot("08-space-select-open"); await p.keyboard.press("Escape"); await p.waitForTimeout(400); }
  // edit a component value (contenteditable) → dock layer
  const fig = p.locator(".readout-fig").nth(1);
  if (await fig.count()) {
    await fig.click(); await p.waitForTimeout(800);
    await shot("09-value-edit");
    const dock = await p.evaluate(() => ({ active: document.activeElement?.getAttribute("aria-label") || document.activeElement?.tagName, layer: [...document.querySelectorAll("[data-layer],[data-dock-layer]")].map(e=>e.getAttribute("data-layer")||e.getAttribute("data-dock-layer")), btns: [...document.querySelectorAll("[aria-label='Save edit'],[aria-label='Cancel edit']")].map(e => { const b = e.getBoundingClientRect(); return { l: e.getAttribute("aria-label"), vis: b.width > 0 && getComputedStyle(e).visibility !== "hidden", box: [b.x, b.y, b.width, b.height].map(Math.round) }; }) }));
    writeFileSync(`${OUT}/${tag}-09-edit-dock.json`, JSON.stringify(dock, null, 1));
    await p.keyboard.press("Escape"); await p.waitForTimeout(600);
    await shot("10-after-escape");
  }
  // header condense on scroll (card scroll host at <lg; page otherwise)
  const sc = await p.evaluate(() => {
    const c = document.querySelector(".pane-shell > :first-child");
    const before = { sh: c.scrollHeight, ch: c.clientHeight };
    c.scrollTop = 200; window.scrollTo(0, 400);
    return before;
  });
  await p.waitForTimeout(900);
  const cond = await p.evaluate(() => ({ condensed: !!document.querySelector(".picker-header.is-condensed"), top: document.querySelector(".pane-shell > :first-child").scrollTop, winY: scrollY }));
  writeFileSync(`${OUT}/${tag}-11-condense.json`, JSON.stringify({ ...sc, ...cond }, null, 1));
  await shot("11-condensed");
  await card.screenshot({ path: `${OUT}/${tag}-12-condensed-card.png` }).catch(() => {}); manifest.push({ frame: `${tag}-12-condensed-card.png`, tree: tree() });
  await ctx.close();
}
writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 1));
await b.close();
console.log("done", manifest.length);
