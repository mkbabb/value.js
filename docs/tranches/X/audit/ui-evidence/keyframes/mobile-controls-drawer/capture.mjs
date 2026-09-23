// mobile-controls-drawer audit capture — READ-ONLY; headed Chromium on the real GPU.
// Captures the keyframes demo's mobile controls Drawer (390x844) at peek / expanded /
// each control tab / dock stacking, both themes; plus the 1440 desktop-rail contrast.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2];
const log = { tree: TREE, sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });

const measure = (page) => page.evaluate(() => {
  const px = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), b: Math.round(b.bottom) }; };
  const st = (e, ...k) => { const s = getComputedStyle(e); return Object.fromEntries(k.map(x => [x, s[x]])); };
  const o = { vw: innerWidth, vh: innerHeight, dark: document.documentElement.classList.contains("dark") };
  const d = document.querySelector(".glass-drawer");
  if (d) {
    const tr = getComputedStyle(d).transform; const m = tr.match(/matrix\(([^)]+)\)/); const ty = m ? +m[1].split(",")[5] : 0;
    o.drawer = { ...px(d), visibleTop: Math.round(d.getBoundingClientRect().top), sheetBottom: Math.round(d.getBoundingClientRect().bottom), ty: Math.round(ty), ...st(d, "borderTopLeftRadius", "backgroundColor", "zIndex", "boxShadow"), t: d.style.getPropertyValue("--glass-drawer-t") || getComputedStyle(d).getPropertyValue("--glass-drawer-t") };
    const h = d.querySelector(".glass-drawer-handle"); o.handle = h ? { ...px(h), now: h.getAttribute("aria-valuenow"), text: h.getAttribute("aria-valuetext") } : null;
    const pane = d.querySelector(".controls-pane"); if (pane) o.pane = { ...px(pane), scrollH: pane.scrollHeight, clientH: pane.clientHeight, scrollTop: pane.scrollTop, ...st(pane, "overflowY", "maskImage"), cls: pane.className.slice(0, 120) };
    const ribbon = d.querySelector("#controls-ribbon-target")?.closest(".flex-shrink-0"); if (ribbon) { const card = ribbon.firstElementChild; o.ribbon = { ...px(ribbon), card: card ? { ...px(card), ...st(card, "borderTopLeftRadius", "boxShadow") } : null, onscreen: ribbon.getBoundingClientRect().top < Math.min(innerHeight, d.getBoundingClientRect().bottom) };
      o.ribbonButtons = [...ribbon.querySelectorAll("button")].filter(b => b.getBoundingClientRect().width > 0).map(b => ({ t: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 22), ...px(b), r: getComputedStyle(b).borderTopLeftRadius })); }
    const panel = [...d.querySelectorAll("[role=tabpanel]")].find(p => p.getBoundingClientRect().height > 0); if (panel) o.panel = { ...px(panel), id: panel.id, label: panel.getAttribute("aria-label") };
    // visible-content fraction: panel pixels inside the sheet's on-screen band
    const bandTop = Math.max(0, d.getBoundingClientRect().top), bandBot = Math.min(innerHeight, d.getBoundingClientRect().bottom);
    o.sheetBand = { top: Math.round(bandTop), bottom: Math.round(bandBot), h: Math.round(bandBot - bandTop) };
    o.cards = [...d.querySelectorAll(".card, [data-slot=card], .glass-panel")].filter(c => c.getBoundingClientRect().height > 0).slice(0, 8).map(c => ({ cls: c.className.slice(0, 60), ...px(c), r: getComputedStyle(c).borderTopLeftRadius }));
    o.pills = [...d.querySelectorAll("button, [role=combobox], input")].filter(b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.top < bandBot && r.bottom > bandTop; }).slice(0, 40).map(b => ({ t: (b.getAttribute("aria-label") || b.textContent.trim() || b.value || "").slice(0, 20), ...px(b), r: getComputedStyle(b).borderTopLeftRadius }));
  }
  const docks = [...document.querySelectorAll(".glass-dock")];
  o.docks = docks.map(e => ({ ...px(e), z: getComputedStyle(e).zIndex, cls: e.className.replace(/\s+/g, " ").slice(0, 70) }));
  const td = docks[docks.length - 1];
  if (d && td) { const a = d.getBoundingClientRect(), b = td.getBoundingClientRect(); o.dockOverlap = { dockTop: Math.round(b.top), dockBottom: Math.round(b.bottom), sheetBottom: Math.round(a.bottom), sheetTop: Math.round(a.top), overlapPx: Math.round(Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))), dockAboveSheet: +getComputedStyle(td).zIndex > +getComputedStyle(d).zIndex }; }
  const rail = document.querySelector(".controls-pane-wrapper"); if (rail) o.rail = { ...px(rail), cls: rail.className.slice(0, 120), vis: getComputedStyle(rail).display };
  const lb = document.querySelector("[role=listbox]"); if (lb) o.listbox = { ...px(lb), items: [...lb.querySelectorAll("[role=option]")].map(x => x.textContent.trim()) };
  const a = document.activeElement; o.focus = a ? (a.getAttribute("aria-label") || a.tagName) + (a.matches(":focus-visible") ? " [fv]" : "") : null;
  return o;
});

async function fresh(vp, theme, route) {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(5, 200); await page.waitForTimeout(4200);
  return { ctx, page, errs };
}
async function shot(page, run, name, extra = {}) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, ...m, ...extra });
  return m;
}
const visRect = (page, sel) => page.evaluate((s) => { const e = [...document.querySelectorAll(s)].find(x => !x.closest("[inert]") && x.getBoundingClientRect().width > 0); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, sel);
const clickSel = async (page, sel, wait = 900) => { const b = await visRect(page, sel); if (!b) return false; await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(wait); return true; };
// the chrome (top) dock: expand it (hover/tap) then act on its controls
const topDockOpen = async (page) => { const b = await page.evaluate(() => { const e = document.querySelector(".glass-dock"); const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, collapsed: e.classList.contains("collapsed") }; }); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(700); const still = await page.evaluate(() => document.querySelector(".glass-dock").classList.contains("collapsed")); if (still) { await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); } await page.waitForTimeout(1100); };
async function pickTab(page, label) {
  await topDockOpen(page);
  if (!(await clickSel(page, "[aria-label='Controls tab']", 700))) return "no-trigger";
  const opts = await page.evaluate(() => [...document.querySelectorAll("[role=listbox] [role=option]")].map(o => o.textContent.trim()));
  const ok = await page.evaluate((l) => { const o = [...document.querySelectorAll("[role=listbox] [role=option]")].find(x => x.textContent.trim().toLowerCase().startsWith(l.toLowerCase())); if (!o) return false; o.scrollIntoView({ block: "nearest" }); return true; }, label);
  if (!ok) { await page.keyboard.press("Escape"); return "no-option:" + opts.join("|"); }
  const r = await page.evaluate((l) => { const o = [...document.querySelectorAll("[role=listbox] [role=option]")].find(x => x.textContent.trim().toLowerCase().startsWith(l.toLowerCase())); const b = o.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; }, label);
  await page.mouse.click(r.x, r.y); await page.waitForTimeout(1200);
  await page.mouse.move(5, 420); await page.waitForTimeout(900);
  return "ok:" + opts.join("|");
}
async function expandViaHandle(page) {
  const h = await visRect(page, ".glass-drawer-handle"); if (!h) return "no-handle";
  await page.mouse.click(h.x + h.width / 2, h.y + h.height / 2); await page.waitForTimeout(1300);
  return "tap";
}
async function dragHandle(page, dy, hold = false) {
  const h = await visRect(page, ".glass-drawer-handle"); if (!h) return null;
  const x = h.x + h.width / 2, y = h.y + h.height / 2;
  await page.mouse.move(x, y); await page.mouse.down();
  for (let i = 1; i <= 12; i++) { await page.mouse.move(x, y + (dy * i) / 12); await page.waitForTimeout(16); }
  if (hold) return { x, y };
  await page.mouse.up(); await page.waitForTimeout(1400); return { x, y };
}
async function expandAny(page) { await expandViaHandle(page); if ((await openFact(page)) !== "0.12") return "tap"; await topDockOpen(page); await clickSel(page, "[aria-label='Controls panel']", 1400); await page.mouse.move(5, 420); await page.waitForTimeout(800); return "toggle"; }
const openFact = (page) => page.evaluate(() => document.querySelector(".glass-drawer-handle")?.getAttribute("aria-valuenow"));

const runs = [];
for (const vp of ["390", "1440"]) for (const theme of ["light", "dark"]) runs.push([vp, theme]);
for (const [vp, theme] of runs) {
  const run = { tag: `${vp}-${theme}`, frames: [], notes: [], errs: [] };
  if (ONLY && ONLY !== run.tag) continue;
  try {
    if (vp === "390") {
      // ── cube: peek → expanded (tap) → scrolled → tabs ──
      let { ctx, page, errs } = await fresh(vp, theme, "cube");
      await shot(page, run, "01-cube-peek");
      run.notes.push("tap-handle: " + await expandViaHandle(page) + " → now " + await openFact(page));
      await shot(page, run, "02-cube-expanded-tap");
      if ((await openFact(page)) === "0.12") {
        // tap did not expand — try the chrome dock's Controls panel toggle
        await topDockOpen(page); const ok = await clickSel(page, "[aria-label='Controls panel']", 1400);
        await page.mouse.move(5, 420); await page.waitForTimeout(800);
        run.notes.push("controls-panel toggle: " + ok + " → now " + await openFact(page));
        await shot(page, run, "02b-cube-expanded-toggle");
      }
      // scroll the pane to its bottom (reach the ribbon)
      await page.evaluate(() => { const p = document.querySelector(".glass-drawer .controls-pane"); if (p) p.scrollTop = p.scrollHeight; }); await page.waitForTimeout(700);
      await shot(page, run, "03-cube-expanded-scrolled-bottom");
      await page.evaluate(() => { const p = document.querySelector(".glass-drawer .controls-pane"); if (p) p.scrollTop = 0; }); await page.waitForTimeout(400);
      // tabs via the chrome dock's Controls-tab select
      await topDockOpen(page); await clickSel(page, "[aria-label='Controls tab']", 800);
      await shot(page, run, "04-cube-controls-tab-select-open"); await page.keyboard.press("Escape"); await page.waitForTimeout(500);
      for (const [i, t] of [["05", "Keyframes"], ["06", "Timeline"], ["07", "Matrix"], ["08", "Controls"]]) {
        run.notes.push(`pick ${t}: ` + await pickTab(page, t) + " → now " + await openFact(page));
        await shot(page, run, `${i}-cube-tab-${t.toLowerCase()}`);
        if (t === "Keyframes" || t === "Timeline") { await page.evaluate(() => { const p = document.querySelector(".glass-drawer .controls-pane"); if (p) p.scrollTop = p.scrollHeight; }); await page.waitForTimeout(600); await shot(page, run, `${i}b-cube-tab-${t.toLowerCase()}-scrolled`); await page.evaluate(() => { const p = document.querySelector(".glass-drawer .controls-pane"); if (p) p.scrollTop = 0; }); }
      }
      // collapse back to peek by drag down; then drag-up mid-gesture
      await dragHandle(page, 260); run.notes.push("drag-down → now " + await openFact(page));
      await shot(page, run, "09-cube-peek-after-drag-down");
      const held = await dragHandle(page, -120, true); await page.waitForTimeout(120);
      await shot(page, run, "10-cube-drag-mid"); if (held) await page.mouse.up(); await page.waitForTimeout(1400);
      run.notes.push("drag-up release → now " + await openFact(page));
      await shot(page, run, "11-cube-after-drag-up");
      // keyboard on the slider handle
      await page.evaluate(() => document.querySelector(".glass-drawer-handle")?.focus()); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(900);
      await shot(page, run, "12-cube-handle-kbd-focus");
      // stacking: expand the transport dock over the drawer at peek
      await page.evaluate(() => document.activeElement?.blur());
      const td = await page.evaluate(() => { const e = [...document.querySelectorAll(".glass-dock")].pop(); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
      await page.mouse.move(td.x, td.y); await page.waitForTimeout(1200);
      await shot(page, run, "13-cube-peek-transport-hover");
      await page.screenshot({ path: OUT + `13c-crop-bottom-${run.tag}.png`, clip: { x: 0, y: 560, width: 390, height: 284 } });
      run.errs.push(...errs.map(e => "cube: " + e)); await ctx.close();

      // ── spring (a facility with facet tabs; editor/storyboard stage mode) ──
      ({ ctx, page, errs } = await fresh(vp, theme, "spring"));
      await shot(page, run, "20-spring-peek");
      await shot(page, run, "20b-spring-peek-tabselect-pre"); run.notes.push("spring expand via " + await expandAny(page) + " → " + await openFact(page));
      await shot(page, run, "21-spring-expanded");
      await topDockOpen(page); await clickSel(page, "[aria-label='Controls tab']", 800);
      const sopts = await page.evaluate(() => [...document.querySelectorAll("[role=listbox] [role=option]")].map(o => o.textContent.trim()));
      run.notes.push("spring tabs: " + sopts.join("|"));
      await shot(page, run, "22-spring-tab-select-open"); await page.keyboard.press("Escape"); await page.waitForTimeout(400);
      let k = 23; for (const t of sopts) { if (/^controls/i.test(t)) continue; run.notes.push(`spring pick ${t}: ` + await pickTab(page, t.split(/\s/)[0])); await shot(page, run, `${k++}-spring-tab-${t.split(/\s/)[0].toLowerCase()}`); }
      run.errs.push(...errs.map(e => "spring: " + e)); await ctx.close();

      // ── amiga (subject scene) peek + expanded + stacking ──
      ({ ctx, page, errs } = await fresh(vp, theme, "amiga"));
      await shot(page, run, "30-amiga-peek");
      run.notes.push("amiga expand via " + await expandAny(page) + " → " + await openFact(page));
      await shot(page, run, "31-amiga-expanded");
      run.errs.push(...errs.map(e => "amiga: " + e)); await ctx.close();
    } else {
      // ── 1440: the desktop rail (no Drawer) — the contrast frames ──
      let { ctx, page, errs } = await fresh(vp, theme, "cube");
      await shot(page, run, "40-cube-desktop-rail");
      for (const [i, t] of [["41", "Keyframes"], ["42", "Timeline"]]) { run.notes.push(`pick ${t}: ` + await pickTab(page, t)); await shot(page, run, `${i}-cube-desktop-${t.toLowerCase()}`); }
      run.errs.push(...errs.map(e => "cube: " + e)); await ctx.close();
    }
  } catch (e) { run.notes.push("FAIL: " + String(e).slice(0, 300)); }
  log.runs.push(run);
  writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
}
await browser.close();
console.log(JSON.stringify(log.runs.map(r => ({ tag: r.tag, n: r.frames.length, notes: r.notes, errs: r.errs.slice(0, 5) })), null, 1));
