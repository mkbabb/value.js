// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P1b: colour-input popover + drag-lag witnesses (1440x900, fine).
// One Chromium, one context per cell, closed in finally. Items: 0176 0184 0185.
import { chromium } from "playwright";
import { boot, restOnDock, ensureExpanded, renderedContrast, resolveColor, oklab, writeJson, EV } from "./lib.mjs";

const out = { probe: "p1b-input", at: new Date().toISOString(), cells: {} };
const input = (p) => p.locator('[aria-label="Enter a CSS color"]').first();
// The input lives on the dock's input face: Tools -> "Open color input" (1440, fine).
async function openInputFace(page) {
  await ensureExpanded(page);
  const back = page.locator('.dock-face.is-active button[aria-label="Back"]').first();
  if (!(await back.isVisible().catch(() => false))) { await page.locator(".action-bar-toggle-inner button").first().click(); await page.waitForTimeout(1200); await restOnDock(page); }
  await page.locator('.dock-face.is-active button[aria-label="Open color input"]').first().click();
  await page.waitForTimeout(1000);
}
const OOG = "?space=oklch&color=" + encodeURIComponent("oklch(0.88 0.33 145)");

const browser = await chromium.launch();
try {
  // 0184 — clips-state ink vs the live popover plate, both schemes.
  for (const cs of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: cs });
    const cell = (out.cells[`clips-${cs}`] = { errors: [] });
    try {
      const page = await ctx.newPage();
      page.on("pageerror", (e) => cell.errors.push(String(e).slice(0, 200)));
      await boot(page, "#/" + OOG);
      await openInputFace(page);
      await input(page).hover();
      await page.waitForTimeout(1200);
      const v = page.locator('.gamut-verdict[data-clips="true"]').filter({ visible: true }).first();
      cell.openedBy = "hover";
      if (!(await v.count())) { await input(page).click(); await page.waitForTimeout(1000); cell.openedBy = "click"; }
      cell.visible = await v.count();
      if (!cell.visible) cell.verdictsInDom = await page.evaluate(() => [...document.querySelectorAll(".gamut-verdict")].map((e) => e.getAttribute("data-clips") + ":" + e.textContent.trim()));
      if (cell.visible) {
        cell.text = (await v.textContent()).trim();
        cell.plate = await page.evaluate(() => { const el = document.querySelector('.gamut-verdict[data-clips="true"]'); const pc = el.closest("[data-reka-popper-content-wrapper] > *") ?? el.closest("[role=dialog]"); const s = pc ? getComputedStyle(pc) : null; return s ? { cls: String(pc.className).slice(0, 120), bg: s.backgroundColor, backdrop: s.backdropFilter } : null; });
        cell.contrast = await renderedContrast(page, v, { shot: `${EV}/p1b-0184-clips-${cs}.png`, pad: 0 });
        cell.echoContrast = await renderedContrast(page, page.locator(".echo-ink").filter({ visible: true }).first());
      }
    } finally { await ctx.close(); }
  }

  // 0185 — A-1 throw repro: black, space HSL, hover the colour input.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const cell = (out.cells["a1-black-hsl"] = { errors: [], consoleErrors: [] });
    try {
      const page = await ctx.newPage();
      page.on("pageerror", (e) => cell.errors.push(String(e).slice(0, 240)));
      page.on("console", (m) => { if (m.type() === "error" || (m.type() === "warning" && /Vue warn|Unhandled/.test(m.text()))) cell.consoleErrors.push(m.text().slice(0, 240)); });
      await boot(page, "#/?space=hsl&color=black");
      await openInputFace(page);
      cell.inputText = (await input(page).textContent()).trim();
      await input(page).hover();
      await page.waitForTimeout(1200);
      cell.readout = await page.evaluate(() => { const v = [...document.querySelectorAll(".gamut-verdict")].map((e) => e.textContent.trim()); const echo = [...document.querySelectorAll(".echo-ink")].map((e) => e.textContent.trim()); return { verdicts: v, echo }; });
      cell.dockIntact = await page.evaluate(() => ({ dock: !!document.querySelector(".glass-dock .dock-face.is-active button"), trigger: !!document.querySelector(".view-select-trigger") }));
      await page.screenshot({ path: `${EV}/p1b-0185-black-hsl-hover.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    } finally { await ctx.close(); }
  }

  // 0176 — DVS-25 drag lag: trigger glyph (--accent-view) vs the live picked colour during a spectrum drag.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const cell = (out.cells["drag-lag"] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/?space=oklch&color=" + encodeURIComponent("oklch(0.6 0.15 30)"));
      const canvas = await page.evaluate(() => { const cs = [...document.querySelectorAll("main canvas, canvas")].map((c) => ({ c, b: c.getBoundingClientRect() })).filter((o) => o.b.width > 150 && o.b.height > 150 && o.b.top > 80); cs.sort((a, b) => b.b.width * b.b.height - a.b.width * a.b.height); const b = cs[0]?.b; return b ? { x: b.x, y: b.y, w: b.width, h: b.height, cls: String(cs[0].c.className).slice(0, 60) } : null; });
      cell.canvas = canvas;
      if (canvas) {
        await page.evaluate(() => {
          window.__lag = []; const t0 = performance.now();
          const icon = document.querySelector(".view-select-trigger svg");
          const inp = document.querySelector('[aria-label="Enter a CSS color"]');
          const tick = () => { window.__lag.push({ t: +(performance.now() - t0).toFixed(1), icon: getComputedStyle(icon).color, accentView: getComputedStyle(document.documentElement).getPropertyValue("--accent-view").trim(), input: inp?.textContent.trim() }); if (performance.now() - t0 < 4200) requestAnimationFrame(tick); };
          requestAnimationFrame(tick);
        });
        const y = canvas.y + canvas.h * 0.4;
        await page.mouse.move(canvas.x + canvas.w * 0.1, y); await page.mouse.down();
        const tDown = await page.evaluate(() => performance.now());
        for (let i = 1; i <= 30; i++) { await page.mouse.move(canvas.x + canvas.w * (0.1 + 0.8 * i / 30), y + Math.sin(i / 5) * 20); await page.waitForTimeout(33); }
        await page.mouse.up();
        await page.waitForTimeout(3000);
        const frames = await page.evaluate(() => window.__lag);
        writeJson("p1b-0176-frames.json", frames);
        // icon colour change times and settle after drag end
        const lab = {};
        for (const f of frames) if (!lab[f.icon]) lab[f.icon] = oklab(await resolveColor(page, f.icon));
        const final = lab[frames[frames.length - 1].icon];
        const dist = frames.map((f) => { const a = lab[f.icon]; return { t: f.t, d: Math.hypot(a[0] - final[0], a[1] - final[1], a[2] - final[2]) }; });
        const inputChanges = frames.filter((f, i) => i && f.input !== frames[i - 1].input).map((f) => f.t);
        const iconChanges = frames.filter((f, i) => i && f.icon !== frames[i - 1].icon).map((f) => f.t);
        const lastInput = inputChanges[inputChanges.length - 1] ?? null, lastIcon = iconChanges[iconChanges.length - 1] ?? null;
        cell.result = { frames: frames.length, inputChangeCount: inputChanges.length, iconChangeCount: iconChanges.length, firstInputChange: inputChanges[0] ?? null, firstIconChange: iconChanges[0] ?? null, lastInputChange: lastInput, lastIconChange: lastIcon, iconTrailAfterInputSettledMs: lastInput != null && lastIcon != null ? +(lastIcon - lastInput).toFixed(1) : null, maxOKLabFromFinalDuringDrag: +Math.max(...dist.filter((x) => lastInput == null || x.t <= lastInput).map((x) => x.d)).toFixed(4), okLabFromFinalAtInputSettle: lastInput != null ? +dist.find((x) => x.t >= lastInput).d.toFixed(4) : null, iconStart: frames[0].icon, iconEnd: frames[frames.length - 1].icon, inputStart: frames[0].input, inputEnd: frames[frames.length - 1].input, transition: await page.evaluate(() => getComputedStyle(document.querySelector(".view-select-trigger svg")).transition.slice(0, 160)) };
      }
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
  writeJson("p1b-input.json", out);
  console.log(JSON.stringify(out, null, 1).slice(0, 7000));
}
