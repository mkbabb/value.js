// SS-8 B04 SlugEditLayer witness (headless Chromium). One browser; one context per cell.
// Items: A-1 C-2 D-2 D-3 D-4 D-5 D-6 geometry placeholder PRM L-10.
import { chromium } from "playwright";
import { boot, seed, realSession, out, EV } from "./lib.mjs";

const which = process.argv[2] || "all";
const MOB = (w, h = 844) => ({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
const INPUT = ".glass-dock input[aria-label='Slug or admin token']";
async function openLayer(page, mobile) {
  const sum = page.locator(".dock-layer--summary.is-active"); if (await sum.count()) { await sum.click(); await page.waitForTimeout(700); }
  if (mobile) { await page.locator(".glass-dock [aria-label=Menu]").filter({ visible: true }).first().click(); await page.waitForSelector("[role=menu]"); await page.waitForTimeout(600); await page.locator("[role=menu] [role=menuitem]", { hasText: "Login" }).click(); }
  else await page.locator(".glass-dock .dock-tab-button", { hasText: "Login" }).click();
  await page.waitForTimeout(900);
}
const layerState = (page) => page.evaluate((sel) => {
  const i = document.querySelector(sel); const layer = i?.closest(".dock-layer");
  const grp = document.querySelector(".dock-layer-group") || document.querySelector(".dock-layers");
  return { active: !!layer && layer.classList.contains("is-active") && !layer.closest("[inert]"), value: i?.value, groupW: grp ? +grp.getBoundingClientRect().width.toFixed(1) : null, dockW: +document.querySelector(".glass-dock")?.getBoundingClientRect().width.toFixed(1), summaryActive: !!document.querySelector(".dock-layer--summary.is-active") };
}, INPUT);
const geom = (page) => page.evaluate((sel) => {
  const i = document.querySelector(sel); const form = i.closest("form"); const layer = i.closest(".dock-layer");
  const btn = (n) => [...layer.querySelectorAll("button")].find((b) => b.getAttribute("aria-label") === n || (n === "submit" && b.type === "submit"));
  const R = (e) => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(1)); };
  const sub = btn("submit"), can = btn("Cancel"); const c = (r) => [r[0] + r[2] / 2, r[1] + r[3] / 2];
  const dist = (a, b) => +Math.hypot(a[0] - b[0], a[1] - b[1]).toFixed(1);
  const ir = R(i), sr = R(sub), cr = R(can);
  const ov = layer.closest("[data-dock-overflow]") || document.querySelector("[data-dock-overflow]");
  const cc = c(cr); const hit = document.elementFromPoint(cc[0], cc[1]);
  const cs = getComputedStyle(i); const cx = document.createElement("canvas").getContext("2d"); cx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const avail = i.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  return { input: ir, submit: sr, cancel: cr, centres: { inputSubmit: dist(c(ir), c(sr)), submitCancel: dist(c(sr), cc), inputCancel: dist(c(ir), cc) },
    cancelHit: hit ? (can.contains(hit) ? "cancel" : `${hit.tagName}.${hit.className.toString().slice(0, 40)}`) : null,
    layer: { sw: layer.scrollWidth, cw: layer.clientWidth }, form: { sw: form.scrollWidth, cw: form.clientWidth }, overflow: ov ? { sw: ov.scrollWidth, cw: ov.clientWidth, ox: getComputedStyle(ov).overflowX } : null,
    inputFont: cs.fontSize, placeholder: i.placeholder, placeholderW: +cx.measureText(i.placeholder).width.toFixed(1), availW: +avail.toFixed(1), placeholderFits: cx.measureText(i.placeholder).width <= avail, autocapitalize: i.getAttribute("autocapitalize"), viewport: innerWidth };
}, INPUT);

const browser = await chromium.launch();
const R = {};
try {
  if (which === "all" || which === "geom") {
    // geometry + D-4 aperture + placeholder per arm + L-10 active-layer capture
    R.geom = {};
    for (const [n, opt, mob] of [["1440", { viewport: { width: 1440, height: 900 } }, false], ["1024", { viewport: { width: 1024, height: 768 } }, false], ["zoom200-720", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 }, true], ["390", MOB(390), true], ["360", MOB(360), true], ["320", MOB(320, 640), true]]) {
      const ctx = await browser.newContext(opt);
      try {
        await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 3000);
        await openLayer(page, mob); R.geom[n] = { state: await layerState(page), ...(await geom(page)) };
        const d = await page.evaluate(() => { const r = document.querySelector(".glass-dock").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
        if (["1440", "390", "320"].includes(n)) await page.screenshot({ path: `${EV}slug-layer-active-${n}.png`, clip: { x: Math.max(0, d.x - 8), y: Math.max(0, d.y - 8), width: Math.min(opt.viewport.width, d.width + 16), height: d.height + 16 } });
        if (n === "1440") {
          // D-3: field at rest vs focused, pixel diff
          const ib = await page.locator(INPUT).boundingBox(); const clip = { x: ib.x - 6, y: ib.y - 6, width: ib.width + 12, height: ib.height + 12 };
          await page.evaluate((s) => document.querySelector(s).blur(), INPUT); await page.mouse.move(5, 500); await page.waitForTimeout(300);
          const a = await page.screenshot({ clip }); await page.evaluate((s) => document.querySelector(s).focus(), INPUT); await page.keyboard.press("Shift"); await page.waitForTimeout(300);
          const b = await page.screenshot({ clip });
          R.d3 = await page.evaluate(async ({ a, b }) => { const dec = async (s) => { const im = new Image(); im.src = "data:image/png;base64," + s; await im.decode(); const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; const x = c.getContext("2d"); x.drawImage(im, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; }; const p = await dec(a), q = await dec(b); let n = 0; for (let i = 0; i < p.length; i += 4) if (Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2]) > 12) n++; return { bytesIdentical: a === b, changedPx: n, totalPx: p.length / 4 }; }, { a: a.toString("base64"), b: b.toString("base64") });
          R.d3.focusStyle = await page.evaluate((s) => { const cs = getComputedStyle(document.querySelector(s)); return { outline: cs.outlineStyle + " " + cs.outlineWidth, boxShadow: cs.boxShadow.slice(0, 120), border: cs.borderTopWidth + " " + cs.borderTopStyle, bg: cs.backgroundColor }; }, INPUT);
          // D-6: long token overflow
          await page.locator(INPUT).fill("x".repeat(48) + "-" + "0123456789abcdef".repeat(8));
          R.d6 = await page.evaluate((s) => { const i = document.querySelector(s); const cs = getComputedStyle(i); return { sw: i.scrollWidth, cw: i.clientWidth, textOverflow: cs.textOverflow, maskImage: cs.maskImage, type: i.type }; }, INPUT);
          await page.screenshot({ path: `${EV}slug-long-token-1440.png`, clip });
        }
      } finally { await ctx.close(); }
    }
  }
  if (which === "all" || which === "hold") {
    // D-2: desktop idle-collapse while typing
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 3000);
      await openLayer(page, false); await page.locator(INPUT).type("silver-cut", { delay: 30 }); await page.mouse.move(700, 600);
      const t0 = Date.now(); R.hold = [];
      for (const t of [0, 2000, 4000, 6000, 8000, 12000]) { const w = t - (Date.now() - t0); if (w > 0) await page.waitForTimeout(w); R.hold.push({ t, ...(await layerState(page)) }); }
    } finally { await ctx.close(); }
  }
  if (which === "all" || which === "focus") {
    // D-5/C-7: focus timelines, cold contexts, desktop ×3 and mobile ×3
    R.focus = [];
    for (const mob of [false, false, false, true, true, true]) {
      const ctx = await browser.newContext(mob ? MOB(390) : { viewport: { width: 1440, height: 900 } });
      try {
        await seed(ctx, {}); const page = await ctx.newPage(); await boot(page, "#/", 3000);
        await page.evaluate(() => { window.__ft = []; addEventListener("click", () => { const t0 = performance.now(); for (const d of [0, 16, 50, 100, 200, 400, 800, 1500]) setTimeout(() => { const a = document.activeElement; window.__ft.push(`${d}:${a?.tagName}${a?.getAttribute("aria-label") ? "[" + a.getAttribute("aria-label") + "]" : ""}${a?.getAttribute("role") ? "(" + a.getAttribute("role") + ")" : ""}`); }, d); }, { capture: true }); });
        if (mob) { await page.locator(".glass-dock [aria-label=Menu]").filter({ visible: true }).first().click(); await page.waitForSelector("[role=menu]"); await page.waitForTimeout(600); await page.evaluate(() => { window.__ft = []; }); await page.locator("[role=menu] [role=menuitem]", { hasText: "Login" }).click(); }
        else await page.locator(".glass-dock .dock-tab-button", { hasText: "Login" }).click();
        await page.waitForTimeout(1800);
        const ft = await page.evaluate(() => window.__ft.filter((x, i, a) => true).slice(-8));
        // close half: Escape from the field, where does focus land
        await page.keyboard.press("Escape"); await page.waitForTimeout(500);
        R.focus.push({ arm: mob ? "mobile-390" : "desktop-1440", timeline: ft, afterEscape: await page.evaluate(() => `${document.activeElement?.tagName}|${document.activeElement?.getAttribute("aria-label")}`) });
      } finally { await ctx.close(); }
    }
  }
  if (which === "all" || which === "submit") {
    // A-1 + C-2: the live submit chain (slug arm) in the hash-history app; PRM spinner duration
    const s2 = await realSession();
    for (const prm of [false, true]) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: prm ? "reduce" : "no-preference" });
      try {
        await seed(ctx, {}); const page = await ctx.newPage(); const errs = await boot(page, "#/", 3000);
        await page.evaluate(() => { window.__rej = []; addEventListener("unhandledrejection", (e) => window.__rej.push(String(e.reason).slice(0, 200))); });
        const net = []; let delay = false;
        await ctx.route(/localhost:3000/, async (r) => { net.push({ t: Date.now(), m: r.request().method(), p: new URL(r.request().url()).pathname }); if (delay) await new Promise((z) => setTimeout(z, 1500)); await r.continue(); });
        await openLayer(page, false); await page.locator(INPUT).fill(s2.userSlug);
        await page.evaluate((sel) => { window.__mo = []; const t0 = performance.now(); const f = document.querySelector(sel).closest("form"); new MutationObserver(() => { const sp = f.querySelector(".animate-spin"); window.__mo.push({ t: +(performance.now() - t0).toFixed(1), busy: f.getAttribute("aria-busy"), spin: !!sp, spinDur: sp ? getComputedStyle(sp).animationDuration : null }); }).observe(f, { subtree: true, attributes: true, childList: true }); window.__t0 = t0; }, INPUT);
        delay = true; const tSubmit = Date.now();
        await page.locator(INPUT).press("Enter");
        await page.waitForTimeout(50); const at50 = await layerState(page);
        await page.waitForTimeout(3500); delay = false;
        R[prm ? "submitPRM" : "submit"] = { at50, after: await layerState(page), mo: await page.evaluate(() => window.__mo.slice(0, 12)), net: net.filter((n) => n.t >= tSubmit).map((n) => `${n.t - tSubmit}ms ${n.m} ${n.p}`), rejections: await page.evaluate(() => window.__rej), errs, slugStored: await page.evaluate(() => localStorage.getItem("palette-user-slug")), expected: s2.userSlug, trigger: await page.evaluate(() => [...document.querySelectorAll(".glass-dock [data-o18]")].filter((e) => e.getClientRects().length).map((e) => e.innerText.trim())), url: page.url() };
        if (!prm) await page.screenshot({ path: `${EV}slug-after-submit-1440.png`, clip: { x: 400, y: 0, width: 640, height: 90 } });
      } finally { await ctx.close(); }
    }
  }
  out(`slug-${which}.json`, R);
} finally { await browser.close(); }
