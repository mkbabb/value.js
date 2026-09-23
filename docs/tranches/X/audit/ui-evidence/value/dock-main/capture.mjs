// dock-main UI audit capture (READ-ONLY on the app tree; headed Chromium, real GPU).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const OUT = new URL(".", import.meta.url).pathname;
const BASE = "http://localhost:9000/";
const sha = (d) => execSync(`git -C ${d} rev-parse --short HEAD`).toString().trim();
const dirty = (d) => execSync(`git -C ${d} status --porcelain | wc -l`).toString().trim();
const meta = {
  captured: new Date().toISOString(),
  value: { head: sha("/Users/mkbabb/Programming/value.js"), dirty: dirty("/Users/mkbabb/Programming/value.js") },
  glass: { head: sha("/Users/mkbabb/Programming/glass-ui"), dirty: dirty("/Users/mkbabb/Programming/glass-ui") },
  frames: {}, radii: {}, notes: [],
};
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };

const browser = await chromium.launch({ headless: false });

async function ctx(vp, theme, { admin = false, offline = false } = {}) {
  const c = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await c.addInitScript(({ theme, admin }) => {
    try {
      localStorage.setItem("vueuse-color-scheme", theme);
      if (admin) localStorage.setItem("palette-admin-token", "audit-ui-only-token");
    } catch {}
  }, { theme, admin });
  const p = await c.newPage();
  const logs = [];
  p.on("console", (m) => { if (m.type() === "error") logs.push(m.text().slice(0, 200)); });
  p.on("pageerror", (e) => logs.push("PAGEERROR " + String(e).slice(0, 200)));
  if (offline) await p.route(/:3000\/|\/api\//, (r) => r.abort());
  return { c, p, logs };
}

async function dockBox(p) {
  return p.evaluate(() => {
    const d = document.querySelector(".glass-dock");
    if (!d) return null;
    const r = d.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height, cls: d.className };
  });
}
async function shotDock(p, name, pad = 24) {
  const b = await dockBox(p);
  if (!b) { meta.notes.push(`${name}: no .glass-dock`); return; }
  const vw = p.viewportSize();
  const clip = { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: Math.min(vw.width - Math.max(0, b.x - pad), b.width + 2 * pad), height: b.height + 2 * pad };
  await p.screenshot({ path: `${OUT}${name}.png`, clip });
  meta.frames[name] = { dock: b };
}
async function shotFull(p, name) {
  await p.screenshot({ path: `${OUT}${name}.png` });
  meta.frames[name] = { full: true, dock: await dockBox(p) };
}
async function radii(p, name) {
  meta.radii[name] = await p.evaluate(() => {
    const out = [];
    const d = document.querySelector(".glass-dock");
    const band = d?.closest("nav") ?? document;
    const els = [d, ...band.querySelectorAll(".glass-dock button, .glass-dock [role=combobox], .glass-dock .slug-pill, .dock-status-lamp, .dock-seal, .dock-plate")];
    for (const el of els) {
      if (!el) continue;
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      out.push({
        tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 90),
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30),
        w: Math.round(r.width), h: Math.round(r.height), radius: cs.borderTopLeftRadius,
        bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopStyle, boxShadow: cs.boxShadow.slice(0, 60),
        font: cs.fontSize + " " + cs.fontWeight + " " + cs.fontFamily.split(",")[0],
        pad: cs.padding,
      });
    }
    return out;
  });
}

const THEMES = ["light", "dark"];
for (const theme of THEMES) {
  // ── 1440 expanded / hover / focus / popovers / collapse / morph ──
  {
    const { c, p, logs } = await ctx("d", theme);
    await p.goto(BASE + "#/", { waitUntil: "networkidle" }).catch(() => {});
    await p.waitForTimeout(2500);
    await shotFull(p, `d-${theme}-01-page-expanded`);
    await shotDock(p, `d-${theme}-02-dock-expanded`);
    await radii(p, `d-${theme}-expanded`);
    // hover Tools
    const tools = p.getByRole("button", { name: "Toggle action bar" });
    if (await tools.count()) { await tools.first().hover(); await p.waitForTimeout(400); await shotDock(p, `d-${theme}-03-hover-tools`); }
    // hover login
    const login = p.locator(".glass-dock button", { hasText: "Login" });
    if (await login.count()) { await login.first().hover(); await p.waitForTimeout(400); await shotDock(p, `d-${theme}-04-hover-login`); }
    // keyboard focus ring on view select
    await p.mouse.move(700, 600);
    await p.keyboard.press("Tab"); await p.waitForTimeout(200);
    for (let i = 0; i < 6; i++) {
      const f = await p.evaluate(() => document.activeElement?.closest(".glass-dock") ? (document.activeElement.getAttribute("aria-label") || document.activeElement.textContent.trim()) : null);
      if (f) { await shotDock(p, `d-${theme}-05-focus-${i}-${String(f).replace(/\W+/g, "_").slice(0, 20)}`); }
      await p.keyboard.press("Tab"); await p.waitForTimeout(200);
    }
    // view select open
    const vs = p.getByRole("combobox", { name: "Select view" });
    if (await vs.count()) { await vs.first().click(); await p.waitForTimeout(600); await shotFull(p, `d-${theme}-06-view-select-open`); await p.keyboard.press("Escape"); await p.waitForTimeout(400); }
    // @mbabb menu
    const mb = p.locator(".glass-dock button", { hasText: "@mbabb" });
    if (await mb.count()) { await mb.first().click(); await p.waitForTimeout(600); await shotFull(p, `d-${theme}-07-mbabb-menu-open`); await p.keyboard.press("Escape"); await p.waitForTimeout(400); }
    // action-bar layer (Tools)
    if (await tools.count()) { await tools.first().click(); await p.waitForTimeout(900); await shotDock(p, `d-${theme}-08-actionbar-layer`); await radii(p, `d-${theme}-actionbar`);
      const back = p.getByRole("button", { name: "Back" }); if (await back.count()) { await back.first().click(); await p.waitForTimeout(900); await shotDock(p, `d-${theme}-09-back-to-main`); } }
    // collapse: leave pointer outside, wait > collapseDelay
    await p.mouse.move(700, 800); await p.waitForTimeout(400);
    const t0 = Date.now(); let collapsed = false;
    while (Date.now() - t0 < 12000) { const b = await dockBox(p); if (b?.cls.includes("collapsed")) { collapsed = true; break; } await p.waitForTimeout(250); }
    meta.notes.push(`${theme} 1440: idle collapse ${collapsed ? "fired after ~" + (Date.now() - t0) + "ms (pointer outside)" : "DID NOT fire within 12s"}`);
    if (!collapsed) { await p.mouse.wheel(0, 600); await p.waitForTimeout(3000); const b = await dockBox(p); meta.notes.push(`${theme} 1440: after scroll dock cls=${b?.cls}`); collapsed = !!b?.cls.includes("collapsed"); }
    await p.waitForTimeout(1200);
    await shotFull(p, `d-${theme}-10-page-collapsed`);
    await shotDock(p, `d-${theme}-11-seal`, 40);
    await radii(p, `d-${theme}-collapsed`);
    // morph collapse→expand: hover the seal, burst-capture
    const b = await dockBox(p);
    if (b) {
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      const clip = { x: Math.max(0, cx - 360), y: Math.max(0, b.y - 20), width: 720, height: b.height + 40 + 20 };
      await p.mouse.move(cx, cy);
      const tm = Date.now(); const times = [];
      for (let i = 0; i < 14; i++) { await p.screenshot({ path: `${OUT}d-${theme}-12-morph-expand-${String(i).padStart(2, "0")}.png`, clip }); times.push(Date.now() - tm); }
      meta.frames[`d-${theme}-12-morph-expand`] = { times };
      // expand→collapse morph
      await p.mouse.move(700, 850);
      const t1 = Date.now(); let started = false; const times2 = [];
      while (Date.now() - t1 < 9000) { const bb = await dockBox(p); if (bb?.cls.includes("collapsed")) { started = true; break; } await p.waitForTimeout(40); }
      if (started) for (let i = 0; i < 10; i++) { await p.screenshot({ path: `${OUT}d-${theme}-13-morph-collapse-${String(i).padStart(2, "0")}.png`, clip }); times2.push(Date.now() - t1); }
      meta.frames[`d-${theme}-13-morph-collapse`] = { started, times2 };
    }
    // video-free rAF width trace of one expand
    const trace = await p.evaluate(async () => {
      const d = document.querySelector(".glass-dock"); const r = d.getBoundingClientRect();
      d.dispatchEvent(new MouseEvent("mouseenter"));
      const out = []; const t0 = performance.now();
      await new Promise((res) => { const f = () => { const q = d.getBoundingClientRect(); out.push([Math.round(performance.now() - t0), Math.round(q.width), Math.round(q.height), d.classList.contains("collapsed") ? "c" : "e"]); if (performance.now() - t0 < 1200) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
      return { from: [r.width, r.height], out };
    });
    meta.frames[`d-${theme}-14-expand-raf-trace`] = trace;
    meta.notes.push(`${theme} 1440 console errors: ${logs.length} ${logs.slice(0, 4).join(" | ")}`);
    await c.close();
  }
  // ── 390 ──
  {
    const { c, p, logs } = await ctx("m", theme);
    await p.goto(BASE + "#/", { waitUntil: "networkidle" }).catch(() => {});
    await p.waitForTimeout(2500);
    await shotFull(p, `m-${theme}-01-page-expanded`);
    await shotDock(p, `m-${theme}-02-dock-expanded`, 12);
    await radii(p, `m-${theme}-expanded`);
    const kebab = p.locator(".glass-dock button[aria-label*='enu' i], .glass-dock [aria-haspopup]").filter({ hasNot: p.locator("[aria-label='Select view']") });
    meta.notes.push(`${theme} 390 kebab-candidates: ${await kebab.count()}`);
    const menu = p.getByRole("button", { name: /menu/i });
    if (await menu.count()) { await menu.first().click(); await p.waitForTimeout(700); await shotFull(p, `m-${theme}-03-menu-open`); await p.keyboard.press("Escape"); await p.waitForTimeout(400); }
    const vs = p.getByRole("combobox", { name: "Select view" });
    if (await vs.count()) { await vs.first().click(); await p.waitForTimeout(700); await shotFull(p, `m-${theme}-04-view-select-open`); await p.keyboard.press("Escape"); await p.waitForTimeout(400); }
    const tools = p.getByRole("button", { name: "Toggle action bar" });
    if (await tools.count()) { await tools.first().click(); await p.waitForTimeout(900); await shotDock(p, `m-${theme}-05-actionbar-layer`, 12); await radii(p, `m-${theme}-actionbar`); const back = p.getByRole("button", { name: "Back" }); if (await back.count()) { await back.first().click(); await p.waitForTimeout(700); } }
    await p.mouse.move(200, 700); await p.waitForTimeout(7000);
    const b = await dockBox(p);
    meta.notes.push(`${theme} 390: after 7s idle dock cls=${b?.cls}`);
    await p.mouse.wheel(0, 800); await p.waitForTimeout(1500);
    await shotFull(p, `m-${theme}-06-after-idle-scroll`);
    meta.notes.push(`${theme} 390: after scroll dock cls=${(await dockBox(p))?.cls}`);
    meta.notes.push(`${theme} 390 console errors: ${logs.length} ${logs.slice(0, 4).join(" | ")}`);
    await c.close();
  }
}

// ── admin mode (UI-only fake token in the audit browser profile) ──
for (const theme of THEMES) {
  for (const vp of ["d", "m"]) {
    const { c, p, logs } = await ctx(vp, theme, { admin: true });
    await p.goto(BASE + "#/admin/users", { waitUntil: "networkidle" }).catch(() => {});
    await p.waitForTimeout(3000);
    await shotFull(p, `${vp}-${theme}-20-admin-page`);
    await shotDock(p, `${vp}-${theme}-21-admin-dock`, vp === "d" ? 24 : 12);
    await radii(p, `${vp}-${theme}-admin`);
    if (vp === "d") {
      const vs = p.getByRole("combobox", { name: "Select view" });
      if (await vs.count()) { await vs.first().click(); await p.waitForTimeout(700); await shotFull(p, `d-${theme}-22-admin-view-select`); await p.keyboard.press("Escape"); await p.waitForTimeout(400); }
      await p.mouse.move(700, 880);
      const t0 = Date.now(); while (Date.now() - t0 < 12000) { const b = await dockBox(p); if (b?.cls.includes("collapsed")) break; await p.waitForTimeout(250); }
      await p.waitForTimeout(1200);
      await shotDock(p, `d-${theme}-23-admin-seal`, 40);
      // picker in admin-authenticated but non-admin mode (shows 'admin' pill in ProfileSection)
      await p.goto(BASE + "#/", { waitUntil: "networkidle" }).catch(() => {}); await p.waitForTimeout(2500);
      await shotDock(p, `d-${theme}-24-admin-auth-picker-dock`);
    }
    meta.notes.push(`admin ${vp} ${theme} console errors: ${logs.length} ${logs.slice(0, 3).join(" | ")}`);
    await c.close();
  }
}

// ── status lamp (backend forced offline) ──
for (const vp of ["d", "m"]) {
  const { c, p, logs } = await ctx(vp, "light", { offline: true });
  await p.goto(BASE + "#/", { waitUntil: "domcontentloaded" }).catch(() => {});
  await p.waitForTimeout(5000);
  const lamp = await p.evaluate(() => { const l = document.querySelector(".dock-status-lamp"); if (!l) return null; const r = l.getBoundingClientRect(); return { variant: l.dataset.variant, text: l.textContent.trim(), x: r.x, y: r.y, w: r.width, h: r.height }; });
  meta.notes.push(`lamp ${vp} offline: ${JSON.stringify(lamp)}`);
  await shotFull(p, `${vp}-light-30-lamp-offline-page`);
  const band = await p.evaluate(() => { const n = document.querySelector("nav.dock-band") || document.querySelector(".glass-dock")?.parentElement; if (!n) return null; const r = n.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  meta.notes.push(`lamp ${vp} offline: band=${JSON.stringify(band)} dock=${JSON.stringify(await dockBox(p))} errors=${logs.slice(0,4).join(" | ")}`);
  if (band) await p.screenshot({ path: `${OUT}${vp}-light-31-lamp-band.png`, clip: { x: 0, y: Math.max(0, band.y - 8), width: p.viewportSize().width, height: band.height + 16 } });
  await radii(p, `${vp}-light-lamp`);
  await c.close();
}
// healthy lamp presence
{
  const { c, p } = await ctx("d", "light");
  await p.goto(BASE + "#/", { waitUntil: "networkidle" }).catch(() => {}); await p.waitForTimeout(2500);
  meta.notes.push(`lamp healthy: ${await p.evaluate(() => !!document.querySelector(".dock-status-lamp"))}`);
  await c.close();
}

writeFileSync(`${OUT}capture-meta.json`, JSON.stringify(meta, null, 1));
await browser.close();
console.log("done", Object.keys(meta.frames).length, "frames");
