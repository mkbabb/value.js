// follow-up probes: artifact not-ready / mismatched (in-browser ref write only, no tree edit),
// entry/exit timing samples, collapsed transport dock, dock Play in Entry, 390 sheet + twin, crops.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const tree = () => ({ sha: execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const res = { ...tree(), when: new Date().toISOString(), runs: [] };
const b = await chromium.launch({ headless: false });
const away = (page, vp) => page.mouse.move(VPS[vp].width - 4, VPS[vp].height / 2);
const setCss = (page, v) => page.evaluate((v) => { const el = document.querySelector(".discrete-card"); let inst = el.__vueParentComponent; const seen = []; while (inst) { seen.push(inst.type?.__name || inst.type?.name); const d = inst.setupState?.demo || inst.props?.demo || inst.exposed?.demo; if (d?.compiledEntryCss) { d.compiledEntryCss.value = v; return seen.join(">"); } const r = inst.setupState?.demo; inst = inst.parent; } return "notfound " + seen.join(">"); }, v);
for (const [vp, theme] of [["1440", "light"], ["1440", "dark"], ["390", "light"], ["390", "dark"]]) {
  const tag = `${vp}-${theme}`; const run = { tag, ...tree(), notes: {} };
  const ctx = await b.newContext({ viewport: VPS[vp], deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  await page.getByRole("combobox", { name: "Select animation" }).first().click(); await page.waitForTimeout(500);
  await page.getByRole("option", { name: /Entry/ }).first().click(); await away(page, vp); await page.waitForTimeout(1500);
  // timing samples (exit then entry)
  const sample = () => page.evaluate(() => new Promise(res => { const e = document.querySelector(".discrete-card"); const t0 = performance.now(); const out = []; const f = () => { const s = getComputedStyle(e); out.push([Math.round(performance.now() - t0), s.display, (+s.opacity).toFixed(2), s.transform.replace("matrix", "").slice(0, 40)]); if (performance.now() - t0 < 650) requestAnimationFrame(f); else res(out); }; f(); }));
  if (theme === "light") {
    const btn = page.locator("[aria-controls].btn-playback-accent").first();
    const p1 = sample(); await btn.click(); run.notes.exit = (await p1).filter((_, i) => i % 3 === 0);
    await page.waitForTimeout(300);
    const p2 = sample(); await btn.click(); run.notes.enter = (await p2).filter((_, i) => i % 3 === 0);
    await away(page, vp); await page.waitForTimeout(800);
  }
  // collapsed dock crop + hover expand
  const combo = page.getByRole("combobox", { name: "Select animation" }).first();
  const dockBox = await page.evaluate(() => { const c = document.querySelector("[aria-label='Select animation']"); let e = c; for (let i = 0; i < 6 && e; i++) { if (/dock/.test(e.className)) break; e = e.parentElement; } const r = (e || c).getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, cls: (e || c).className.toString().slice(0, 120), comboVisible: !!c.offsetParent }; });
  run.notes.dockIdle = dockBox;
  const clip = { x: Math.max(0, dockBox.x - 140), y: Math.max(0, dockBox.y - 60), width: Math.min(VPS[vp].width - Math.max(0, dockBox.x - 140), dockBox.w + 280), height: Math.min(140, VPS[vp].height - Math.max(0, dockBox.y - 60)) };
  await page.screenshot({ path: OUT + `30a-dock-idle-crop-${tag}.png`, clip });
  await page.mouse.move(dockBox.x + dockBox.w / 2, dockBox.y + dockBox.h / 2); await page.waitForTimeout(1100);
  await page.screenshot({ path: OUT + `30b-dock-hover-crop-${tag}.png`, clip });
  const play = page.getByRole("button", { name: "Play animation" }).first();
  run.notes.playVisibleOnHover = await play.isVisible().catch(() => false);
  if (run.notes.playVisibleOnHover) {
    const before = await page.evaluate(() => { const e = document.querySelector(".discrete-card"); const s = getComputedStyle(e); return [s.display, s.opacity, s.transform]; });
    await play.click(); await page.waitForTimeout(120);
    const mid = []; for (let i = 0; i < 6; i++) { mid.push(await page.evaluate(() => { const e = document.querySelector(".discrete-card"); const s = getComputedStyle(e); return [s.display, (+s.opacity).toFixed(2), s.transform.slice(0, 30), document.querySelector("[aria-label='Select animation']")?.closest("[class]")?.textContent.trim().slice(0, 20)]; })); await page.waitForTimeout(150); }
    run.notes.playInEntry = { before, mid, pauseVisible: await page.getByRole("button", { name: "Pause animation" }).first().isVisible().catch(() => false) };
    await page.screenshot({ path: OUT + `31-dock-play-in-entry-${tag}.png` });
    const pz = page.getByRole("button", { name: "Pause animation" }).first(); if (await pz.isVisible().catch(() => false)) await pz.click();
  }
  await away(page, vp); await page.waitForTimeout(600);
  // radii / surfaces
  run.notes.radii = await page.evaluate(() => { const q = (s) => document.querySelector(s); const g = (e) => e && [getComputedStyle(e).borderRadius, e.className.toString().slice(0, 80)]; return { stageCard: g(q(".discrete-card")?.closest("[data-tier]")), discrete: g(q(".discrete-card")), artifact: g(q(".artifact")), chip: g(q(".active-preset-chip")), toggle: g(q("[aria-controls].btn-playback-accent")), copy: g(q("[aria-label='Copy the @starting-style artifact']")), presets: [...document.querySelectorAll(".preset-cell")].map(e => getComputedStyle(e).borderRadius + " h" + Math.round(e.getBoundingClientRect().height)).join(","), rootScroll: [document.scrollingElement.scrollHeight, innerHeight], titleLines: (() => { const t = q(".discrete-card")?.closest("[data-tier]")?.querySelector("[class*=title], h3, h2"); return t && [t.textContent.trim(), Math.round(t.getBoundingClientRect().height), getComputedStyle(t).lineHeight, getComputedStyle(t).hyphens, getComputedStyle(t).fontSize]; })() }; });
  // 390 crops: header/title, toggle-vs-label collision, footer line under sheet
  if (vp === "390") {
    await page.screenshot({ path: OUT + `32a-header-toggle-collision-crop-${tag}.png`, clip: { x: 0, y: 90, width: 390, height: 300 } });
    await page.screenshot({ path: OUT + `32b-footer-under-sheet-crop-${tag}.png`, clip: { x: 0, y: 600, width: 390, height: 244 } });
    run.notes.collide = await page.evaluate(() => { const t = document.querySelector("[aria-controls].btn-playback-accent").getBoundingClientRect(); const l = [...document.querySelectorAll("span")].find(s => s.textContent.trim() === "compileToEntry() artifact"); const lr = l.getBoundingClientRect(); const eased = [...document.querySelectorAll("span")].find(s => s.textContent.trim() === "eased by"); const er = eased?.getBoundingClientRect(); const sheet = [...document.querySelectorAll("[role=dialog], [class*=sheet], [class*=drawer]")].map(e => [e.className.toString().slice(0, 50), Math.round(e.getBoundingClientRect().top)]).slice(0, 4); return { toggle: [t.top, t.bottom].map(Math.round), label: [lr.top, lr.bottom].map(Math.round), labelVisibleDisplay: getComputedStyle(l).display, eased: er && [Math.round(er.left), Math.round(er.top), Math.round(er.width)], sheet }; });
  } else {
    const s = await page.locator(".active-preset-chip").boundingBox();
    await page.screenshot({ path: OUT + `32c-footer-line-crop-${tag}.png`, clip: { x: s.x - 110, y: s.y - 20, width: 700, height: 60 } });
    const hb = await page.locator(".discrete-card").boundingBox();
    await page.screenshot({ path: OUT + `32d-hello-card-and-toggle-crop-${tag}.png`, clip: { x: hb.x - 260, y: hb.y - 20, width: hb.width + 520, height: 200 } });
  }
  // not-ready + mismatched (in-browser ref writes; the app tree is untouched)
  run.notes.setCss = await setCss(page, ""); await page.waitForTimeout(400);
  run.notes.notReady = await page.evaluate(() => ({ status: document.querySelector(".artifact-status")?.textContent.trim(), copy: !!document.querySelector("[aria-label='Copy the @starting-style artifact']") }));
  await page.evaluate(() => document.querySelector(".artifact-status")?.scrollIntoView({ block: "center" }));
  await page.screenshot({ path: OUT + `20-artifact-not-ready-${tag}.png` });
  await setCss(page, ".x { opacity: 0 }"); await page.waitForTimeout(400);
  run.notes.mismatched = await page.evaluate(() => document.querySelector(".artifact-status")?.textContent.trim());
  await page.screenshot({ path: OUT + `21-artifact-mismatched-${tag}.png` });
  // 390: open the sheet and reach the ribbon twin + preset
  if (vp === "390") {
    const handles = await page.evaluate(() => [...document.querySelectorAll("button, [role=button], [role=separator]")].filter(e => /drawer|sheet|handle|expand|resize/i.test((e.getAttribute("aria-label") || "") + e.className)).map(e => (e.getAttribute("aria-label") || "") + " | " + e.className.toString().slice(0, 60)).slice(0, 8));
    run.notes.handles = handles;
  }
  // preset click (evaluate) — does the Entry card + artifact track it?
  run.notes.presetClick = await page.evaluate(() => { const c = [...document.querySelectorAll(".preset-cell")].find(e => /bouncy/i.test(e.textContent)); if (!c) return "no cell"; c.click(); return "clicked"; });
  await page.waitForTimeout(900);
  run.notes.afterBouncy = await page.evaluate(() => ({ chip: document.querySelector(".active-preset-chip")?.textContent.trim(), line: [...document.querySelectorAll(".active-preset-line span")].map(s => s.textContent.trim()).join(" | "), artHead: document.querySelector(".artifact")?.textContent.slice(60, 140) }));
  await page.evaluate(() => { const e = document.querySelector(".active-preset-chip"); e?.scrollIntoView({ block: "center" }); });
  await page.screenshot({ path: OUT + `22-after-bouncy-preset-${tag}.png` });
  res.runs.push(run); await ctx.close();
  writeFileSync(OUT + "probe2-log.json", JSON.stringify(res, null, 1));
}
await b.close();
