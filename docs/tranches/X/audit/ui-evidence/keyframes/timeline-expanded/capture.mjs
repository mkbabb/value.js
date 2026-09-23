// timeline-expanded — READ-ONLY capture; headed Chromium on the real GPU. Writes only beside this file.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js", GUI = "/Users/mkbabb/Programming/glass-ui";
const rev = (t) => ({ sha: execSync(`git -C ${t} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${t} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const ONLY = process.argv[2];
const log = { kf: rev(TREE), glass: rev(GUI), when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const CSS = `@keyframes demo {
  0% { transform: rotate(0deg) scale(1); background-color: #e11d48; }
  35% { transform: rotate(90deg) scale(1.2); background-color: #f59e0b; }
  70% { transform: rotate(200deg) scale(0.8); background-color: #10b981; }
  100% { transform: rotate(360deg) scale(1); background-color: #6366f1; }
}`;
const measure = (page) => page.evaluate(() => {
  const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const st = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: r(e), radius: c.borderTopLeftRadius, bg: c.backgroundColor, border: c.borderTopWidth + " " + c.borderTopColor, bf: c.backdropFilter, shadow: c.boxShadow.slice(0, 60), font: c.fontSize + "/" + c.fontWeight, cls: (e.className?.baseVal ?? e.className ?? "").toString().slice(0, 160) }; };
  const out = { dark: document.documentElement.classList.contains("dark") };
  const q = (s) => [...document.querySelectorAll(s)].find(vis);
  const cell = document.getElementById("timeline-expanded-target");
  out.cell = st(cell); out.cellScroll = cell ? [cell.scrollHeight, cell.clientHeight, getComputedStyle(cell).maxHeight, getComputedStyle(cell).position] : null;
  out.cellKids = cell ? cell.children.length : null;
  out.pane = st(q(".controls-pane"));
  out.paneWrapper = st(q(".controls-pane-wrapper"));
  out.stageCell = st(q(".stage-cell"));
  out.card = st(cell?.querySelector("[data-slot=card], .card") || null);
  out.track = st(q(".timeline-track"));
  out.stage = st(q(".timeline-preview-stage"));
  out.markers = [...document.querySelectorAll(".keyframe-marker")].filter(vis).map(m => ({ l: m.getAttribute("aria-label"), box: r(m), sel: m.dataset.state, inCell: !!cell?.contains(m) }));
  out.placeholder = (() => { const p = [...document.querySelectorAll("p")].find(p => /Timeline expanded below/.test(p.textContent) && vis(p)); return p ? { box: r(p), wrap: st(p.parentElement) } : null; })();
  const btns = (n) => [...document.querySelectorAll("button")].filter(vis).filter(b => (b.getAttribute("aria-label") || b.textContent.trim()) === n).map(b => ({ ...st(b), inCell: !!cell?.contains(b), inDock: !!b.closest(".glass-dock") }));
  out.buttons = Object.fromEntries(["Undo", "Redo", "Clear all keyframes", "Expand timeline", "Collapse timeline", "Collapse", "Snapshot", "Import", "Export", "Add CSS", "Remove keyframe", "Controls panel"].map(n => [n, btns(n)]).filter(([, v]) => v.length));
  out.docks = [...document.querySelectorAll(".glass-dock")].filter(vis).map(d => ({ ...st(d), text: d.textContent.trim().replace(/\s+/g, " ").slice(0, 80) }));
  const tip = q("[data-slot=tooltip-content], [role=tooltip]"); out.tooltip = tip ? { box: r(tip), t: tip.textContent.trim().slice(0, 80) } : null;
  out.docOverflow = [document.documentElement.scrollWidth, innerWidth, document.documentElement.scrollHeight, innerHeight];
  const ae = document.activeElement; out.focus = ae ? (ae.getAttribute("aria-label") || ae.tagName) + " fv=" + ae.matches(":focus-visible") : null;
  // overlap: does the cell overlap the transport dock?
  const dockB = [...document.querySelectorAll(".glass-dock")].filter(vis).map(d => d.getBoundingClientRect());
  const cb = cell?.getBoundingClientRect(); out.cellDockOverlap = cb && cb.height > 0 ? dockB.map(d => Math.max(0, Math.min(cb.bottom, d.bottom) - Math.max(cb.top, d.top)) * (Math.min(cb.right, d.right) > Math.max(cb.left, d.left) ? 1 : 0)) : null;
  return out;
});
async function fresh(vp, theme, route = "cube") {
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 200)); });
  await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(VPS[vp].width - 5, VPS[vp].height / 2); await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
const hoverDock = async (page, idx = 0) => { const b = await page.locator(".glass-dock").filter({ visible: true }).nth(idx).boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100); } };
const hoverBottomDock = async (page) => { const ds = page.locator(".glass-dock").filter({ visible: true }); const n = await ds.count(); let best = null; for (let i = 0; i < n; i++) { const b = await ds.nth(i).boundingBox(); if (b && (!best || b.y > best.y)) best = b; } if (best) { await page.mouse.move(best.x + best.width / 2, best.y + best.height / 2); await page.waitForTimeout(1200); } };
const openDrawer = async (page, vp) => {
  if (vp !== "390") return;
  await hoverDock(page);
  const t = page.getByRole("button", { name: "Controls panel" }).first();
  if (await t.count()) { await t.click(); await page.waitForTimeout(1400); }
  await page.mouse.move(5, 300); await page.waitForTimeout(600);
};
const toTimeline = async (page, run) => {
  await hoverDock(page);
  const trig = page.locator('[aria-label="Controls tab"]').first();
  if (!(await trig.count())) { run.notes.noTab = true; return false; }
  await trig.click(); await page.waitForTimeout(800);
  const opt = page.getByRole("option", { name: /^Timeline/ }).first();
  if (!(await opt.count())) { run.notes.noTimelineOption = true; await page.keyboard.press("Escape"); return false; }
  await opt.click(); await page.waitForTimeout(2000);
  return true;
};
async function shot(page, run, name) {
  const m = await measure(page); const p = `${name}-${run.tag}.png`;
  await page.screenshot({ path: OUT + p }); run.frames.push({ frame: p, kf: rev(TREE), ...m });
}
const btn = (page, name) => page.getByRole("button", { name, exact: true }).filter({ visible: true }).first();
const step = async (run, name, fn) => { try { await fn(); } catch (e) { run.notes["fail:" + name] = String(e).slice(0, 200); } };
const vps = ONLY ? [ONLY.split("-")[0]] : ["1440", "390"];
for (const vp of vps) for (const theme of ["light", "dark"]) {
  const tag = `${vp}-${theme}`; if (ONLY && ONLY.includes("-") && ONLY !== tag) continue;
  const run = { tag, frames: [], notes: {} };
  try {
    const { ctx, page, errs } = await fresh(vp, theme);
    await openDrawer(page, vp);
    if (!(await toTimeline(page, run))) throw new Error("no Timeline tab");
    if (vp === "390") await openDrawer(page, vp);
    const park = async () => { await page.mouse.move(VPS[vp].width - 5, 5); await page.waitForTimeout(600); };
    await park();
    await step(run, "expand-empty", async () => { await btn(page, "Expand timeline").click(); await page.waitForTimeout(1500); await park(); await shot(page, run, "01-expanded-empty");
      const imp = btn(page, "Import"); try { await imp.click({ trial: true, timeout: 2500 }); run.notes.importClickableWhileExpanded = true; } catch (e) { run.notes.importClickableWhileExpanded = String(e).split("\n").filter(l => /intercepts|outside|not visible|stable/.test(l)).slice(0, 2).join(" | ").slice(0, 300) || "timeout"; }
      await page.locator("#timeline-expanded-target [aria-label='Collapse timeline']").first().click(); await page.waitForTimeout(1500); });
    await step(run, "import-collapsed", async () => {
      await btn(page, "Import").click(); await page.waitForTimeout(900);
      await page.locator("[role=dialog] textarea").first().fill(CSS); await page.waitForTimeout(300);
      await page.locator("[role=dialog] button", { hasText: /^Import/ }).last().click(); await page.waitForTimeout(2000);
      await park(); await shot(page, run, "02-tab-populated-collapsed");
    });
    await step(run, "expand-populated", async () => { await btn(page, "Expand timeline").click(); await page.waitForTimeout(1600); await park(); await shot(page, run, "03-expanded-populated");
      run.notes.copies = await page.evaluate(() => { const c = document.getElementById("timeline-expanded-target"); return [...c.children].map(k => ({ h: Math.round(k.getBoundingClientRect().height), markers: k.querySelectorAll(".keyframe-marker").length, top: Math.round(k.getBoundingClientRect().top) })); });
      run.notes.selectedAnimationText = await page.evaluate(() => [...document.querySelectorAll("button, [role=combobox]")].map(b => b.textContent.trim()).filter(t => /Rotation|Translat|Scale|Face/i.test(t)).slice(0, 4));
    });
    await step(run, "select", async () => { await page.locator("#timeline-expanded-target .keyframe-marker").filter({ visible: true }).nth(1).click(); await page.waitForTimeout(1200); await park(); await shot(page, run, "04-expanded-selected"); });
    await step(run, "hover-marker", async () => { await page.locator("#timeline-expanded-target .keyframe-marker").filter({ visible: true }).nth(2).hover(); await page.waitForTimeout(2600); await shot(page, run, "05-expanded-marker-hover"); await park(); });
    await step(run, "dock-hover", async () => { await hoverBottomDock(page); await shot(page, run, "06-transport-dock-expanded-collapse-chip"); const c = page.locator(".glass-dock [aria-label='Collapse timeline']").filter({ visible: true }).first(); if (await c.count()) { await c.hover(); await page.waitForTimeout(900); await shot(page, run, "07-transport-collapse-tooltip"); } else run.notes.noDockCollapse = true; });
    await step(run, "inpane-collapse-hover", async () => { await park(); const c = page.locator("#timeline-expanded-target [aria-label='Collapse timeline']").first(); await c.hover(); await page.waitForTimeout(900); await shot(page, run, "08-inpane-minimize-hover"); });
    await step(run, "kbd-focus", async () => { await park(); const c = page.locator("#timeline-expanded-target [aria-label='Collapse timeline']").first(); await c.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(400); await shot(page, run, "09-inpane-minimize-kbd-focus"); });
    await step(run, "collapse-via-inpane", async () => { await page.locator("#timeline-expanded-target [aria-label='Collapse timeline']").first().click(); await page.waitForTimeout(1500); await park(); await shot(page, run, "10-after-inpane-collapse"); });
    await step(run, "reexpand-dock-collapse", async () => { await btn(page, "Expand timeline").click(); await page.waitForTimeout(1500); await hoverBottomDock(page); const c = page.locator(".glass-dock [aria-label='Collapse timeline']").filter({ visible: true }).first(); await c.click(); await page.waitForTimeout(1500); await park(); await shot(page, run, "11-after-dock-collapse"); });
    await step(run, "reexpand-placeholder-collapse", async () => { await btn(page, "Expand timeline").click(); await page.waitForTimeout(1500); await park(); const c = btn(page, "Collapse"); run.notes.placeholderCollapseVisible = await c.count(); await shot(page, run, "12-reexpanded-placeholder-view"); if (await c.count()) { await c.click(); await page.waitForTimeout(1500); await park(); await shot(page, run, "13-after-placeholder-collapse"); } });
    if (vp === "390") await step(run, "390-drawer-closed-expanded", async () => {
      await btn(page, "Expand timeline").click(); await page.waitForTimeout(1500);
      await hoverDock(page); const t = page.getByRole("button", { name: "Controls panel" }).first(); if (await t.count()) { await t.click(); await page.waitForTimeout(1400); }
      await park(); await shot(page, run, "14-390-expanded-drawer-closed");
    });
    await step(run, "switch-scene-expanded", async () => {
      await page.goto(`http://localhost:5173/#/amiga`); await page.waitForTimeout(3500); await park(); await shot(page, run, "15-amiga-after-route-while-expanded");
    });
    run.errs = errs.slice(0, 12); await ctx.close();
  } catch (e) { run.err = String(e).slice(0, 400); }
  log.runs.push(run); console.log(tag, run.err || "ok", run.frames.length, JSON.stringify(run.notes).slice(0, 700));
}
await browser.close(); writeFileSync(OUT + `capture-log${ONLY ? "-" + ONLY : ""}.json`, JSON.stringify(log, null, 2)); console.log(JSON.stringify(log.kf), JSON.stringify(log.glass));
