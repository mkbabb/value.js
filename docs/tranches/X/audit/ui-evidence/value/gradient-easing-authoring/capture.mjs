// UI-AUDIT seat `gradient-easing-authoring` (COHESION §0bl) — read-only capture.
// Headed Chromium on the real GPU; served dev page :9000; never starts/stops a server.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const BASE = "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const only = process.argv[2];
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
const VPS = [{ name: "1440", w: 1440, h: 900 }, { name: "390", w: 390, h: 844 }];
const seed = (theme) => `(() => { try { if (sessionStorage.getItem('__a')) return; sessionStorage.setItem('__a','1'); localStorage.clear(); localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(theme)}); } catch (e) {} })();`;

async function metrics(page) {
  return page.evaluate(() => {
    const panel = document.querySelector(".easing-panel"); if (!panel) return null;
    const m = (el, tag) => { if (!el) return { tag, missing: true }; const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
      return { tag, w: Math.round(b.width), h: Math.round(b.height), x: Math.round(b.left), r: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter, bs: cs.boxShadow.slice(0, 60), font: cs.fontSize + " " + cs.fontFamily.split(",")[0] }; };
    const vis = (sel) => [...panel.querySelectorAll(sel)].filter(e => e.offsetParent !== null);
    const out = [
      m(panel.closest(".pane-scroll-fade") || panel.parentElement, "pane"),
      m(panel, "panel"), ...vis(".easing-row").map((e, i) => m(e, "row" + i)),
      m(vis(".easing-inner-surface")[0], "ramp"), m(vis(".readout-rail")[0], "readout-rail"), m(vis(".rail-btn")[0], "rail-btn"),
      m(vis(".specimen-tile")[0], "tile0"), m(vis(".family-eyebrow")[0], "eyebrow"), m(vis(".tile-label")[0], "tile-label"),
      m(vis(".fading-scroll")[0], "strip-port"),
      m(vis("[data-testid=easing-picker]")[0], "picker"), ...vis(".easing-authoring .glass-card").map((e, i) => m(e, "picker-card" + i)),
      m(vis(".easing-authoring svg[aria-label]")[0], "picker-svg"),
      m(vis(".easing-authoring [role=tablist]")[0], "picker-tabs"), m(vis(".easing-authoring [role=tab]")[0], "picker-tab"),
      m(vis(".easing-authoring button[aria-label='Easing preset'], .easing-authoring [aria-label='Easing preset']")[0], "preset-trigger"),
      m(vis("[data-testid=easing-readout]")[0], "picker-readout"), m(vis("[data-testid=easing-playback]")[0], "picker-playback"),
    ];
    const port = vis(".fading-scroll")[0];
    return { items: out, dark: document.documentElement.classList.contains("dark"),
      stripScroll: port ? { sw: port.scrollWidth, cw: port.clientWidth } : null,
      docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      pickerText: vis("[data-testid=easing-picker]")[0]?.innerText.replace(/\s+/g, " ").slice(0, 200) ?? null };
  });
}

const log = [];
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const vp of VPS) for (const theme of ["light", "dark"]) {
  const tag = `${vp.name}-${theme}`; if (only && !tag.includes(only)) continue;
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: vp.name === "390" });
  await ctx.addInitScript(seed(theme));
  const page = await ctx.newPage();
  const errs = []; page.on("pageerror", e => errs.push("PAGEERROR " + String(e).slice(0, 200))); page.on("console", m => m.type() === "error" && errs.push(m.text().slice(0, 200)));
  const shots = []; const mets = {};
  const panel = page.locator(".easing-panel");
  const frame = async () => { await panel.evaluate(el => el.scrollIntoView({ block: "start" })); await page.evaluate(() => window.scrollBy(0, -80)); await page.waitForTimeout(400); };
  const shot = async (name, el = false) => { const f = `${tag}-${name}${el ? "-el" : ""}.png`; if (el) await panel.screenshot({ path: OUT + f }); else await page.screenshot({ path: OUT + f }); shots.push(f); };
  try {
    await page.goto(`${BASE}/#/gradient`, { waitUntil: "commit", timeout: 240000 });
    await panel.waitFor({ timeout: 60000 }); await page.waitForTimeout(3000);
    // a second interval: click the rail at 50% (the bar's add gesture)
    const bar = page.locator("[data-testid=gradient-stop-bar]"); const bb = await bar.boundingBox();
    if (bb) { await page.mouse.click(bb.x + bb.width * 0.5, bb.y + bb.height / 2); await page.waitForTimeout(600); }
    // S2: row open (default row 0)
    await frame(); await shot("01-row-open"); await shot("01-row-open", true); mets.open = await metrics(page);
    // hover a tile
    const t = page.locator(".specimen-tile").filter({ visible: true }).nth(2); await t.hover(); await page.waitForTimeout(250); await shot("02-tile-hover", true);
    // keyboard focus on a tile
    await t.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(250); await shot("03-tile-focus", true);
    // select a tile (back family if present)
    const back = page.locator(".specimen-tile[data-specimen*='back']").filter({ visible: true }).first();
    if (await back.count()) { await back.click(); await page.waitForTimeout(500); await shot("04-tile-selected-back", true); }
    // S1: rows closed
    await page.locator(".interval-head[aria-expanded=true]").first().click(); await page.waitForTimeout(400); await frame(); await shot("05-rows-closed"); await shot("05-rows-closed", true); mets.closed = await metrics(page);
    // reopen row 0 → authoring
    await page.locator(".interval-head").first().click(); await page.waitForTimeout(400);
    await page.locator("button[aria-label='Author a custom curve']").filter({ visible: true }).first().click(); await page.waitForTimeout(900);
    await frame(); await shot("06-authoring-bezier"); await shot("06-authoring-bezier", true); mets.authoring = await metrics(page);
    await page.locator(".easing-authoring").filter({ visible: true }).first().evaluate(el => el.scrollIntoView({ block: "center" })); await page.waitForTimeout(400); await shot("07-authoring-bezier-canvas");
    // drag a bezier handle (does authoring work?)
    const handle = page.locator(".easing-authoring [aria-label='Bezier control point 2'], .easing-authoring [aria-label*='control point']").filter({ visible: true }).last();
    const before = await page.locator(".interval-head").first().innerText();
    if (await handle.count()) { const hb = await handle.boundingBox(); if (hb) { await page.mouse.move(hb.x + hb.width/2, hb.y + hb.height/2); await page.mouse.down(); await page.mouse.move(hb.x - 60, hb.y - 90, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(600); } }
    const after = await page.locator(".interval-head").first().innerText();
    const readout = await page.locator(".readout-rail code").filter({ visible: true }).first().innerText();
    log.push({ tag, note: "drag", handleFound: await handle.count(), before, after, readout });
    await shot("07b-authoring-dragged");
    // preset select open
    const trig = page.locator(".easing-authoring [aria-label='Easing preset']").filter({ visible: true }).first();
    if (await trig.count()) { await trig.click(); await page.waitForTimeout(600); await shot("08-preset-select-open");
      const opt = page.locator("[role=option]").filter({ hasText: /ease-out|easeOut|out/i }).first();
      if (await opt.count()) { const txt = await opt.innerText(); await opt.click(); await page.waitForTimeout(700); await frame(); await shot("08b-preset-chosen", true);
        log.push({ tag, note: "preset", chose: txt, head: await page.locator(".interval-head").first().innerText(), trigger: await trig.innerText(), selTile: await page.locator(".specimen-tile[data-state=on]").filter({ visible: true }).first().getAttribute("data-specimen").catch(() => null) }); }
      else await page.keyboard.press("Escape"); await page.waitForTimeout(300); }
    // steps via the strip (7.0.0 has no mode tabs)
    const st = page.locator(".specimen-tile[data-specimen*='step']").filter({ visible: true }).first();
    if (await st.count()) { await st.click(); await page.waitForTimeout(900); await frame(); await shot("09-authoring-steps"); await shot("09-authoring-steps", true); mets.steps = await metrics(page); }
    else log.push({ tag, note: "no steps tile found" });
    // drag a bezier handle? (skip in steps). Rows closed with authoring flag set:
  } catch (e) { errs.push("SCRIPT " + String(e).slice(0, 300)); try { await shot("ERR"); } catch {} }
  log.push({ tag, sha, dirty, shots, errs, mets });
  await ctx.close();
}
await browser.close();
writeFileSync(OUT + (only ? `log-${only}.json` : "log.json"), JSON.stringify(log, null, 1));
console.log(JSON.stringify(log.map(l => ({ tag: l.tag, shots: l.shots?.length, note: l.note, errs: l.errs })), null, 1));
