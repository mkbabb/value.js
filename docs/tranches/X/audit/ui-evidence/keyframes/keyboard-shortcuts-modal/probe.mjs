// keyboard-shortcuts-modal probe 2 — READ-ONLY; headed Chromium. Targets the KSM dialog by its title
// (the 390 controls drawer is also role=dialog), and measures: initial focus, dialog-level scroll
// (double scroller), sr-only containing block, registry live behind the scrim, wheel chaining.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const VPS = { "1440": { width: 1440, height: 900 }, "390": { width: 390, height: 844 } };
const log = { sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
const SEL = "[role=dialog]:has(h2:text-is('Keyboard Shortcuts'))";
const ksm = (page) => page.evaluate(() => {
  const dlg = [...document.querySelectorAll("[role=dialog]")].find(d => d.querySelector("h2")?.textContent.trim() === "Keyboard Shortcuts");
  if (!dlg) return { open: false };
  const r = dlg.getBoundingClientRect(); const port = dlg.querySelector("[role=region]");
  const sr = dlg.querySelector("dd .sr-only"); const srCB = sr?.offsetParent;
  const plates = [...dlg.querySelectorAll("h3")].map(h => { const c = getComputedStyle(h); return { t: h.textContent.trim(), bg: c.backgroundColor, radius: c.borderTopLeftRadius, font: c.fontSize + "/" + c.fontWeight, color: c.color }; });
  const dt = dlg.querySelector("dt"), cs = getComputedStyle(dt);
  const close = dlg.querySelector("[data-slot=dialog-close], button"); const cb = close.getBoundingClientRect();
  return { open: true, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], radius: getComputedStyle(dlg).borderTopLeftRadius,
    dlgScroll: { top: dlg.scrollTop, sh: dlg.scrollHeight, ch: dlg.clientHeight },
    port: port ? { top: port.scrollTop, sh: port.scrollHeight, ch: port.clientHeight, position: getComputedStyle(port).position, outline: getComputedStyle(port).outline, focusVisible: port.matches(":focus-visible"), focused: document.activeElement === port } : null,
    srOffsetParent: srCB ? (srCB.getAttribute("role") || srCB.tagName) + "." + (srCB.className || "").toString().slice(0, 40) : null,
    plates: plates.slice(0, 2), dt: { font: cs.fontSize + "/" + cs.fontWeight, color: cs.color }, kbdFont: getComputedStyle(dlg.querySelector("kbd")).fontSize,
    close: { w: Math.round(cb.width), h: Math.round(cb.height), domFirst: dlg.querySelector("button") === close },
    active: document.activeElement ? document.activeElement.tagName + "[" + (document.activeElement.getAttribute("role") || "") + "]" + (document.activeElement.getAttribute("aria-label") || document.activeElement.textContent || "").trim().slice(0, 24) : null,
    rowCount: dlg.querySelectorAll("dl > div").length, docW: document.documentElement.scrollWidth };
});
const playLabel = (page) => page.evaluate(() => [...document.querySelectorAll("button")].filter(b => /^(Play|Pause)/.test((b.textContent || "").trim()) && b.getBoundingClientRect().width > 0).map(b => b.textContent.trim()).join("|"));
const tabSel = (page) => page.evaluate(() => [...document.querySelectorAll("[aria-selected=true],[data-state=active]")].map(e => (e.textContent || "").trim().slice(0, 16)).filter(Boolean).join("|"));
for (const vp of ["1440", "390"]) for (const theme of ["light", "dark"]) {
  const run = { tag: `cube-${vp}-${theme}`, frames: [] };
  const ctx = await browser.newContext({ viewport: VPS[vp], deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  try {
    await page.goto(`http://localhost:5173/#/cube`, { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
    // open via "?" (keyboard reach)
    await page.mouse.click(VPS[vp].width / 2, 30); await page.waitForTimeout(300);
    const play0 = await playLabel(page), tab0 = await tabSel(page);
    await page.keyboard.press("Shift+Slash"); await page.waitForTimeout(1000);
    run.onOpen = await ksm(page);
    await page.screenshot({ path: `${OUT}10-open-kbd-${run.tag}.png` }); run.frames.push(`10-open-kbd-${run.tag}.png`);
    // registry live behind the scrim: Space, "3"
    await page.keyboard.press("Space"); await page.waitForTimeout(600);
    await page.keyboard.press("3"); await page.waitForTimeout(600);
    run.behindScrim = { play0, playAfterSpace: await playLabel(page), tab0, tabAfter3: await tabSel(page), stillOpen: (await ksm(page)).open };
    // wheel chaining: wheel over the list well past its end
    const b = await page.locator(SEL).first().boundingBox();
    if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height * 0.7); for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 400); await page.waitForTimeout(80); } await page.waitForTimeout(600); }
    run.afterWheel = await ksm(page);
    await page.screenshot({ path: `${OUT}11-wheel-end-${run.tag}.png` }); run.frames.push(`11-wheel-end-${run.tag}.png`);
    await page.keyboard.press("Escape"); await page.waitForTimeout(700);
    run.afterEsc = { open: (await ksm(page)).open, play: await playLabel(page) };
    // reopen via menu for mouse-path initial focus
    const dock = await page.locator(".glass-dock").first().boundingBox(); if (dock) { await page.mouse.move(dock.x + dock.width / 2, dock.y + dock.height / 2); await page.waitForTimeout(1000); }
    const mb = page.getByRole("button", { name: "@mbabb menu" }).first();
    if (await mb.isVisible()) { await mb.click(); await page.waitForTimeout(700); await page.getByRole("menuitem", { name: /Keyboard shortcuts/ }).click(); await page.waitForTimeout(1000); run.onOpenMenu = await ksm(page); }
    else run.onOpenMenu = "menu trigger not visible";
  } catch (e) { run.err = String(e).slice(0, 400); }
  await ctx.close(); log.runs.push(run); console.log(run.tag, run.err || "ok");
}
await browser.close();
writeFileSync(OUT + "probe-log.json", JSON.stringify(log, null, 1));
console.log(JSON.stringify(log, null, 1));
