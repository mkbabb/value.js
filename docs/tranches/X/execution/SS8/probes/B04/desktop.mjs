// SS-8 B04 desktop witness (headless Chromium 1440x900, fine pointer). One browser; one context per cell.
// Items: U-1 U-3 U-4 U-5 U-6 U-7 U-8 U-9 U-10 U-15 U-16 (ProfileSection) · C-8 (MobileMenuDropdown record).
import { chromium } from "playwright";
import { boot, seed, realSession, inkContrast, grounds, out, EV } from "./lib.mjs";

const s = await realSession();
const PICK = "oklch(0.62 0.19 25)"; // one fixed pick so cells compare; band/menu ground still live
const cells = [];
for (const who of ["out", "in", "admin"]) for (const dark of [false, true]) cells.push({ who, dark });

const vis = `(e)=>e.getClientRects().length&&!e.closest("[inert]")`;
const browser = await chromium.launch();
const results = {};
try {
  for (const c of cells) {
    const name = `${c.who}-${c.dark ? "dark" : "light"}`;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: c.dark ? "dark" : "light" });
    try {
      await seed(ctx, { dark: c.dark, ...(c.who === "in" ? { slug: s.userSlug, token: s.token } : {}), ...(c.who === "admin" ? { admin: "b04-render-only-token" } : {}) });
      if (name === "out-light") await ctx.route(/avatars\.githubusercontent\.com/, (r) => r.abort()); // U-8 offline avatar
      const page = await ctx.newPage();
      const errs = await boot(page, `#/?space=oklch&color=${encodeURIComponent(PICK)}`, 3500);
      const R = { errs };
      // ── band seats (U-6) + trigger ink vs painted ground (U-1, U-15) ──
      R.band = await page.evaluate((visS) => {
        const vis = eval(visS);
        const sec = [...document.querySelectorAll(".glass-dock div.hidden")].filter((d) => d.className.includes("lg:flex") && vis(d));
        const kids = sec.flatMap((d) => [...d.children]).filter(vis).map((e) => { const r = e.getBoundingClientRect(); return { cls: e.className.toString().split(" ").slice(0, 2).join("."), text: e.innerText?.trim().slice(0, 12), x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; });
        const air = kids.slice(1).map((k, i) => +(k.x - (kids[i].x + kids[i].w)).toFixed(1));
        const plate = [...document.querySelectorAll(".dock-plate")].filter(vis).map((p) => getComputedStyle(p).backgroundColor);
        const root = getComputedStyle(document.documentElement);
        return { kids, air, plate, accentLive: root.getPropertyValue("--accent-live").trim(), dark: document.documentElement.classList.contains("dark") };
      }, vis);
      R.trigInk = await inkContrast(page, ".glass-dock [data-o18], .glass-dock .dock-tab-button, .glass-dock .dock-dropdown-trigger");
      // ── L-1/L-2 (U-3/U-4): live instruments read off the mounted ProfileSection ──
      R.inst = await page.evaluate((pick) => {
        const ps = window.__b04.insts("ProfileSection")[0]; if (!ps) return null;
        const st = ps.setupState;
        return { propCssColorOpaque: ps.props.cssColorOpaque, triggerInk: st.triggerInk, menuInk: st.menuInk, chromeOfRaw: st.chromeSafeCss(pick), chromeOfSafe: st.chromeSafeCss(ps.props.cssColorOpaque), floatOfRaw: st.floatingSafeCss(pick) };
      }, PICK);
      if (R.inst) {
        const g = R.trigInk.find((t) => /Profile|Login/.test(t.text))?.ground;
        if (g) R.inst.contrast = await page.evaluate(({ inst, g }) => { const f = (css) => +window.__b04.cr(window.__b04.over(window.__b04.rgba(css), g), g).toFixed(3); return { triggerInk: f(inst.triggerInk), chromeOfRaw: f(inst.chromeOfRaw), raw: f(inst.propCssColorOpaque) }; }, { inst: R.inst, g });
      }
      await page.screenshot({ path: `${EV}desk-band-${name}.png`, clip: { x: 440, y: 0, width: 560, height: 80 } });
      // ── open the @mbabb menu (U-5, U-7, U-8, U-9, U-10, U-16) ──
      await page.locator(".glass-dock .dock-dropdown-trigger", { hasText: "@mbabb" }).click();
      await page.waitForSelector("[role=menu]", { timeout: 5000 });
      await page.waitForTimeout(900);
      R.menu = await page.evaluate(() => {
        const m = document.querySelector("[role=menu]"); const mr = m.getBoundingClientRect();
        const chain = []; for (let e = m; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.backdropFilter !== "none" || cs.webkitBackdropFilter && cs.webkitBackdropFilter !== "none") chain.push({ cls: e.className.toString().slice(0, 60), bf: cs.backdropFilter, bg: cs.backgroundColor }); }
        const inner = [...m.querySelectorAll("*")].map((e) => [e, getComputedStyle(e)]).filter(([, cs]) => cs.backdropFilter !== "none").map(([e, cs]) => ({ cls: e.className.toString().slice(0, 60), bf: cs.backdropFilter, bg: cs.backgroundColor }));
        const rows = [...m.querySelectorAll("[role=menuitem],[role=menuitemcheckbox]")].map((e) => { const r = e.getBoundingClientRect(); return { role: e.getAttribute("role"), text: e.innerText.trim().replace(/\s+/g, " ").slice(0, 20), h: +r.height.toFixed(1), w: +r.width.toFixed(1), lines: Math.round(r.height / parseFloat(getComputedStyle(e).lineHeight || "20")), svg: [...e.querySelectorAll("svg")].map((s) => { const q = s.getBoundingClientRect(); return `${q.width.toFixed(1)}x${q.height.toFixed(1)}`; }) }; });
        const av = m.querySelector("[class*=avatar], .avatar, span.rounded-full"); const img = m.querySelector("img");
        const ar = av?.getBoundingClientRect();
        return { menuBg: getComputedStyle(m).backgroundColor, menuBf: getComputedStyle(m).backdropFilter, glassLevel: getComputedStyle(m).getPropertyValue("--glass-level").trim(), chain, inner, rect: [mr.x, mr.y, mr.width, mr.height].map((v) => +v.toFixed(1)), rows, avatar: av ? { cls: av.className.toString().slice(0, 60), w: ar.width, h: ar.height, img: !!img, imgComplete: img?.complete, imgNatural: img?.naturalWidth, fallbackText: av.innerText.trim() } : null };
      });
      R.menuInk = await inkContrast(page, "[role=menu] [role=menuitem], [role=menu] [role=menuitemcheckbox], [role=menu] a");
      // U-16: hit-test the GitHub row on a 20x5 grid
      R.github = await page.evaluate(() => {
        const row = [...document.querySelectorAll("[role=menu] [role=menuitem]")].find((e) => /GitHub/.test(e.innerText)); if (!row) return null;
        const r = row.getBoundingClientRect(); let hit = 0, n = 0;
        for (let i = 0; i < 20; i++) for (let j = 0; j < 5; j++) { n++; const el = document.elementFromPoint(r.x + (i + 0.5) * r.width / 20, r.y + (j + 0.5) * r.height / 5); if (el && row.contains(el)) hit++; }
        return { rowH: r.height, rowW: r.width, hitFraction: hit / n, tag: row.tagName, anchorsInside: row.querySelectorAll("a").length };
      });
      await page.screenshot({ path: `${EV}desk-mbabb-menu-${name}.png`, clip: { x: Math.max(0, R.menu.rect[0] - 20), y: Math.max(0, R.menu.rect[1] - 10), width: Math.min(400, R.menu.rect[2] + 40), height: R.menu.rect[3] + 20 } });
      // U-16 keyboard arm lives in desktop2.mjs (focus-trail walk); not repeated here.
      await page.keyboard.press("Escape").catch(() => {}); await page.waitForTimeout(400);
      // ── logged-in: the Profile menu + the mutex swap latency (C-8) ──
      if (c.who !== "out") {
        const sum = page.locator(".dock-layer--summary.is-active"); if (await sum.count()) { await sum.click(); await page.waitForTimeout(800); }
        R.preTrig = await page.evaluate(() => ({ o18: [...document.querySelectorAll("[data-o18$=trigger]")].map((e) => e.dataset.o18 + ":" + e.getClientRects().length), layers: [...document.querySelectorAll(".dock-layer.is-active, [class*=dock-layer--].is-active")].map((e) => e.className.toString().slice(0, 50)) }));
        const trig = page.locator(c.who === "in" ? "[data-o18=profile-trigger]" : "[data-o18=admin-trigger]");
        await trig.click(); await page.waitForSelector("[role=menu]"); await page.waitForTimeout(700);
        R.profileMenu = await page.evaluate(() => [...document.querySelectorAll("[role=menu] [role=menuitem], [role=menu] .slug-pill")].map((e) => `${e.innerText.trim().slice(0, 22)}|${e.getBoundingClientRect().height.toFixed(1)}`));
        R.profileInk = await inkContrast(page, "[role=menu] [role=menuitem], [role=menu] .slug-pill");
        R.swap = [];
        for (let k = 0; k < 3; k++) {
          if (!(await page.locator("[role=menu]").count())) { await trig.click(); await page.waitForTimeout(600); }
          const t = await page.evaluate(() => new Promise((res) => {
            const btn = [...document.querySelectorAll(".glass-dock .dock-dropdown-trigger")].find((b) => /@mbabb/.test(b.innerText));
            const t0 = performance.now(); let profileGone = null;
            const tick = () => { const menus = [...document.querySelectorAll("[role=menu]")]; const mb = menus.find((m) => /Share color/.test(m.innerText)); const pr = menus.find((m) => /Switch account/.test(m.innerText));
              if (!pr && profileGone === null) profileGone = performance.now() - t0;
              if (mb && mb.getBoundingClientRect().height > 0) return res({ mbabbOpenMs: +(performance.now() - t0).toFixed(1), profileGoneMs: profileGone && +profileGone.toFixed(1) });
              if (performance.now() - t0 > 3000) return res({ timeout: true, profileGoneMs: profileGone }); requestAnimationFrame(tick); };
            btn.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerType: "mouse" })); btn.click(); requestAnimationFrame(tick);
          }));
          R.swap.push(t);
          await page.keyboard.press("Escape"); await page.waitForTimeout(700);
        }
      }
      R.errsAfter = errs.slice();
      results[name] = R;
      out(`desktop-${name}.json`, R);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
