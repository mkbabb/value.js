// SS-8 B04 desktop second pass (headless Chromium 1440x900): U-9 backdrop reach (stripe test),
// U-16 keyboard arm (Enter on the focused GitHub menuitem), C-8 mutex swap with real mouse clicks.
import { chromium } from "playwright";
import { boot, seed, realSession, out, EV } from "./lib.mjs";

const s = await realSession();
const browser = await chromium.launch();
try {
  for (const dark of [false, true]) {
    const name = dark ? "dark" : "light";
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: dark ? "dark" : "light" });
    try {
      await seed(ctx, { dark, slug: s.userSlug, token: s.token });
      const page = await ctx.newPage();
      const errs = await boot(page, "#/", 3500);
      const R = { errs };
      // ── U-9: a high-frequency stripe field under the menu; edge energy inside the menu with the
      //    shipped backdrop-filter vs with backdrop-filter forced to none.
      await page.locator(".glass-dock .dock-dropdown-trigger", { hasText: "@mbabb" }).click();
      await page.waitForSelector("[role=menu]"); await page.waitForTimeout(900);
      const mr = await page.evaluate(() => { const r = document.querySelector("[role=menu]").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
      await page.evaluate((r) => { const d = document.createElement("div"); d.id = "b04-stripes"; Object.assign(d.style, { position: "fixed", left: r.x - 40 + "px", top: r.y - 10 + "px", width: r.width + 80 + "px", height: r.height + 20 + "px", zIndex: "1", pointerEvents: "none", background: "repeating-linear-gradient(90deg,#000 0 2px,#fff 2px 4px)" }); document.body.appendChild(d); }, mr);
      await page.waitForTimeout(200);
      const energy = async (tag) => { const buf = await page.screenshot({ clip: mr, animations: "disabled" }); return page.evaluate(async ({ b64, tag }) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let e = 0, n = 0; for (let y = 0; y < c.height; y++) for (let i = 1; i < c.width; i++) { const p = (y * c.width + i) * 4; e += Math.abs(d[p] - d[p - 4]); n++; } return { tag, meanHorizGrad: +(e / n).toFixed(2) }; }, { b64: buf.toString("base64"), tag }); };
      R.blurShipped = await energy("shipped");
      await page.screenshot({ path: `${EV}desk-u9-stripes-shipped-${name}.png`, clip: { x: mr.x - 40, y: mr.y - 10, width: mr.width + 80, height: mr.height + 20 } });
      const st = await page.addStyleTag({ content: "[role=menu]{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}" });
      await page.waitForTimeout(200);
      R.blurNone = await energy("backdrop-filter:none");
      await st.evaluate((n) => n.remove());
      await page.evaluate(() => document.getElementById("b04-stripes").remove());
      // ── U-16 keyboard arm: walk focus with ArrowDown to the GitHub menuitem, press Enter ──
      await page.evaluate(() => { window.__opened = []; window.open = (...a) => { window.__opened.push(a[0]); return null; }; });
      const trail = [];
      for (let k = 0; k < 8; k++) {
        const f = await page.evaluate(() => { const a = document.activeElement; return `${a?.getAttribute("role")}|${a?.innerText?.trim().slice(0, 14)}`; });
        trail.push(f); if (/^menuitem\|GitHub/.test(f)) break; await page.keyboard.press("ArrowDown");
      }
      R.focusTrail = trail;
      await page.keyboard.press("Enter"); await page.waitForTimeout(300);
      R.enterOpened = await page.evaluate(() => window.__opened);
      R.menuOpenAfterEnter = await page.locator("[role=menu]").count();
      // pointer arm: click 4 px inside the GitHub row's right end (the old dead zone)
      if (!R.menuOpenAfterEnter) { await page.locator(".glass-dock .dock-dropdown-trigger", { hasText: "@mbabb" }).click(); await page.waitForTimeout(700); }
      const gr = await page.evaluate(() => { const r = [...document.querySelectorAll("[role=menu] [role=menuitem]")].find((e) => /GitHub/.test(e.innerText)).getBoundingClientRect(); return { x: r.right - 4, y: r.y + r.height / 2 }; });
      await page.evaluate(() => { window.__opened = []; });
      await page.mouse.click(gr.x, gr.y); await page.waitForTimeout(300);
      R.rightEdgeClickOpened = await page.evaluate(() => window.__opened);
      await page.keyboard.press("Escape").catch(() => {}); await page.waitForTimeout(500);
      // ── C-8: real-mouse swap Profile → @mbabb; an in-page observer stamps both menus ──
      R.swap = [];
      const prof = page.locator("[data-o18=profile-trigger]"); const mb = page.locator(".glass-dock .dock-dropdown-trigger", { hasText: "@mbabb" });
      for (let k = 0; k < 5; k++) {
        const sum = page.locator(".dock-layer--summary.is-active"); if (await sum.count()) { await sum.click(); await page.waitForTimeout(800); }
        await prof.click(); await page.waitForTimeout(700);
        await page.evaluate(() => { window.__sw = { t0: 0, mb: null, prGone: null }; const tick = () => { const w = window.__sw; if (!w.t0) return requestAnimationFrame(tick); const ms = [...document.querySelectorAll("[role=menu]")]; const now = performance.now() - w.t0; if (w.prGone === null && !ms.some((m) => /Switch account/.test(m.innerText))) w.prGone = +now.toFixed(1); const m = ms.find((m) => /Share color/.test(m.innerText)); if (w.mb === null && m && m.getBoundingClientRect().height > 0 && getComputedStyle(m).opacity > 0.5) w.mb = +now.toFixed(1); if (now < 2500 && (w.mb === null || w.prGone === null)) requestAnimationFrame(tick); }; requestAnimationFrame(tick); addEventListener("pointerdown", () => { window.__sw.t0 = performance.now(); }, { once: true, capture: true }); });
        const mbBox = await mb.boundingBox();
        await page.mouse.click(mbBox.x + mbBox.width / 2, mbBox.y + mbBox.height / 2);
        await page.waitForTimeout(1200);
        R.swap.push(await page.evaluate(() => ({ ...window.__sw, t0: undefined, mbabbOpen: [...document.querySelectorAll("[role=menu]")].some((m) => /Share color/.test(m.innerText)) })));
        await page.keyboard.press("Escape"); await page.waitForTimeout(600);
      }
      out(`desktop2-${name}.json`, R);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
