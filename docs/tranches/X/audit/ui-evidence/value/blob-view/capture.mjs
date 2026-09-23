// blob-view capture — HEADED Chromium, 1440x900 + 390x844, light + dark.
// READ-ONLY on the app: navigates, hovers, drags a slider (in-memory config), clicks Copy/Reset.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/blob-view";
const URL = "http://localhost:9000/#/blob";
const sh = (c) => execSync(c, { cwd: "/Users/mkbabb/Programming/value.js" }).toString().trim();
const tree = () => `${sh("git rev-parse --short HEAD")} dirty=${sh("git status --porcelain | wc -l").trim()}`;
const manifest = [];
const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) for (const [vw, vh] of [[1440, 900], [390, 844]]) {
  const tag = `${vw}-${theme}`;
  const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, colorScheme: theme, hasTouch: vw < 500, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 220)); });
  p.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 220)));
  const shot = async (name, loc, opts = {}) => {
    const f = `${OUT}/${tag}-${name}.png`;
    try { if (loc) await loc.screenshot({ path: f }); else await p.screenshot({ path: f, ...opts }); manifest.push({ frame: `${tag}-${name}.png`, tree: tree(), t: new Date().toISOString() }); }
    catch (e) { manifest.push({ frame: `${tag}-${name}.png`, err: String(e).slice(0, 200) }); }
  };
  await p.goto(URL, { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(5000);
  await shot("01-default");
  if (vw < 500) await shot("01b-fullpage", null, { fullPage: true });
  const pane = p.locator(".config-console").first();
  const card = p.locator(".config-console").locator("xpath=ancestor::*[contains(@class,'overflow-hidden')][1]").first();
  await shot("02-pane", card);
  const metrics = async () => p.evaluate(() => {
    const r = (el) => { const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
    const cs = (el, ks) => { const s = getComputedStyle(el); return Object.fromEntries(ks.map(k => [k, s.getPropertyValue(k)])); };
    const q = (s) => document.querySelector(s);
    const out = { route: location.hash, html: document.documentElement.className, bodyBg: getComputedStyle(document.body).backgroundColor };
    const con = q(".config-console");
    out.console = con ? { box: r(con), ...cs(con, ["border-radius", "background-color", "padding", "border"]) } : null;
    const scr = con?.closest(".pane-scroll-fade"); out.scroll = scr ? { box: r(scr), sh: scr.scrollHeight, ch: scr.clientHeight } : null;
    const card = con?.closest("[data-slot=card]") || con?.closest(".overflow-hidden");
    out.card = card ? { box: r(card), cls: String(card.className).slice(0, 160), ...cs(card, ["border-radius", "background-color", "box-shadow"]) } : null;
    const hdr = scr?.firstElementChild; out.header = hdr ? { box: r(hdr), text: hdr.textContent.trim().slice(0, 160), cls: String(hdr.className).slice(0, 120) } : null;
    const h = hdr?.querySelector("h1,h2,h3,[class*=title]"); out.headerTitle = h ? { tag: h.tagName, ...cs(h, ["font-size", "font-family", "font-weight"]) } : null;
    out.sectionTitles = [...document.querySelectorAll(".config-section-title")].map(e => ({ t: e.textContent, box: r(e), ...cs(e, ["font-size", "font-family", "letter-spacing"]) }));
    out.rows = [...document.querySelectorAll(".config-console .configurator-row")].slice(0, 4).map(e => ({ box: r(e), text: e.textContent.trim().slice(0, 40), lab: cs(e.querySelector("label") || e, ["font-size", "font-family", "font-weight"]) }));
    out.rowCount = document.querySelectorAll(".config-console .configurator-row").length;
    out.sliders = [...document.querySelectorAll(".config-console [role=slider]")].slice(0, 2).map(e => ({ box: r(e), rad: getComputedStyle(e).borderRadius, track: (() => { const t = e.closest(".glass-slider, [data-slot=slider]"); return t ? { box: r(t), rad: getComputedStyle(t).borderRadius, cls: String(t.className).slice(0, 100) } : null; })() }));
    const tr = document.querySelector(".config-console [data-slot=slider-track], .config-console .slider-track"); out.track = tr ? { box: r(tr), ...cs(tr, ["border-radius", "background", "height"]) } : null;
    const ab = q(".config-action-bar"); out.actionBar = ab ? { box: r(ab), dock: (() => { const d = ab.firstElementChild; return d ? { box: r(d), cls: String(d.className).slice(0, 140), ...cs(d, ["border-radius", "background-color", "box-shadow"]) } : null; })(), btns: [...ab.querySelectorAll("button")].map(x => ({ t: x.textContent.trim(), box: r(x), rad: getComputedStyle(x).borderRadius, slot: x.getAttribute("data-slot"), fs: getComputedStyle(x).fontSize })) } : null;
    const blob = q(".hero-blob-anchor"); out.blob = blob ? { box: r(blob), canvas: !!blob.querySelector("canvas") } : null;
    out.canvases = [...document.querySelectorAll("canvas")].map(c => ({ box: r(c), w: c.width, h: c.height, pcls: String(c.parentElement.className).slice(0, 80) }));
    out.regions = [...document.querySelectorAll("[data-region],[data-role],[data-pane]")].slice(0, 10).map(e => ({ a: e.getAttribute("data-region") || e.getAttribute("data-role") || e.getAttribute("data-pane"), box: r(e) }));
    out.dockBtns = [...document.querySelectorAll("nav button, [data-slot=dock] button, .glass-dock button")].slice(0, 30).map(x => ({ l: x.getAttribute("aria-label") || x.textContent.trim().slice(0, 24), box: r(x), rad: getComputedStyle(x).borderRadius }));
    out.docOverflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    return out;
  });
  const m0 = await metrics();
  // bottom of pane (scroll the pane's own scroll host)
  await p.evaluate(() => { const s = document.querySelector(".config-console")?.closest(".pane-scroll-fade"); if (s) s.scrollTop = s.scrollHeight; window.scrollTo(0, document.body.scrollHeight); });
  await p.waitForTimeout(600);
  await shot("03-pane-scrolled-bottom");
  await p.evaluate(() => { const s = document.querySelector(".config-console")?.closest(".pane-scroll-fade"); if (s) s.scrollTop = 0; window.scrollTo(0, 0); });
  await p.waitForTimeout(400);
  // hover + keyboard focus on first slider thumb
  const thumb = p.locator(".config-console [role=slider]").first();
  if (await thumb.count()) {
    await thumb.scrollIntoViewIfNeeded(); await thumb.hover(); await p.waitForTimeout(300);
    await shot("04-slider-hover", pane);
    await thumb.focus(); await p.keyboard.press("Tab"); await p.keyboard.press("Shift+Tab"); await p.waitForTimeout(300);
    await shot("05-slider-focus", pane);
    // tune: Body Radius → max via keyboard End; also Satellites → max
    const before = await thumb.getAttribute("aria-valuenow");
    await p.keyboard.press("End"); await p.waitForTimeout(200);
    const sat = p.locator(".config-console [role=slider]").nth(1);
    await sat.focus(); await p.keyboard.press("End");
    const smooth = p.locator(".config-console [role=slider]").nth(5);
    await smooth.focus(); await p.keyboard.press("End");
    await p.waitForTimeout(1500);
    const after = await thumb.getAttribute("aria-valuenow");
    await p.evaluate(() => { const s = document.querySelector(".config-console")?.closest(".pane-scroll-fade"); if (s) s.scrollTop = 0; window.scrollTo(0, 0); });
    await p.waitForTimeout(300);
    await shot("06-tuned-live");
    manifest.push({ frame: `${tag}-06-tuned-live.png`, note: `bodyRadius ${before} -> ${after}` });
    // drag interaction on a slider (pointer)
    const tb = await p.locator(".config-console [role=slider]").nth(6).boundingBox();
    if (tb) { await p.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await p.mouse.down(); await p.mouse.move(tb.x + 140, tb.y + tb.height / 2, { steps: 8 }); await p.waitForTimeout(250); await shot("07-dragging"); await p.mouse.up(); }
  }
  // blob motion: 3 frames of the blob / stage for the animation-view cohesion read
  const blobLoc = p.locator(".hero-blob-anchor").first();
  if (await blobLoc.count()) { for (const i of [0, 1, 2]) { await p.waitForTimeout(700); await shot(`08-blob-motion-${i}`); } }
  // Copy JSON
  const copy = p.getByRole("button", { name: /Copy JSON/ });
  let clip = null;
  if (await copy.count()) {
    await copy.scrollIntoViewIfNeeded(); await copy.hover(); await p.waitForTimeout(250);
    await shot("09-copy-hover", p.locator(".config-action-bar"));
    await copy.click(); await p.waitForTimeout(600);
    clip = await p.evaluate(async () => { try { const t = await navigator.clipboard.readText(); return t.slice(0, 300) + ` …(${t.length} chars)`; } catch (e) { return "ERR " + e.message; } });
    await shot("10-after-copy");
  }
  // Reset
  const reset = p.getByRole("button", { name: /^Reset$/ });
  let resetVal = null;
  if (await reset.count()) {
    await reset.click(); await p.waitForTimeout(1000);
    resetVal = await p.locator(".config-console [role=slider]").first().getAttribute("aria-valuenow");
    await p.evaluate(() => { const s = document.querySelector(".config-console")?.closest(".pane-scroll-fade"); if (s) s.scrollTop = 0; window.scrollTo(0, 0); });
    await shot("11-after-reset");
  }
  const m1 = await metrics();
  writeFileSync(`${OUT}/${tag}-metrics.json`, JSON.stringify({ tree: tree(), m0, m1Buttons: m1.actionBar, clip, resetVal, errs }, null, 1));
  // Home: dock home / leave the blob view
  const home = p.locator("[aria-label*=Home i], [aria-label*=Picker i]").first();
  if (await home.count()) { await home.click().catch(() => {}); await p.waitForTimeout(1500); await shot("12-home"); manifest.push({ frame: `${tag}-12-home.png`, note: "route=" + (await p.evaluate(() => location.hash)) }); }
  await ctx.close();
}
writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 1));
await b.close();
console.log("done", manifest.length);
