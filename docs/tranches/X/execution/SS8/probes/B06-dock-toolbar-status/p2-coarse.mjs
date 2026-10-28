// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P2: coarse-pointer cells (iPad-class landscape/portrait, phone 390x844).
// One Chromium (headless shell), one context per cell, closed in finally.
// Items: 0155 0156 0159 0171 0177(chromium half) 0178 0179(390) 0181 0182.
import { chromium } from "playwright";
import { boot, restOnDock, writeJson, EV } from "./lib.mjs";

const out = { probe: "p2-coarse", at: new Date().toISOString(), cells: {} };
const held = (page) => page.evaluate(() => { const d = document.querySelector(".glass-dock"); return { held: d.getAttribute("data-held"), collapsed: d.classList.contains("collapsed"), cls: d.className }; });
const toggleState = (page) => page.evaluate(() => {
  const inner = document.querySelector(".action-bar-toggle-inner"); if (!inner) return { present: false };
  const slot = inner.parentElement, btn = inner.querySelector("button"), b = slot.getBoundingClientRect();
  return { present: true, slotClass: slot.className, inert: slot.hasAttribute("inert"), slotW: +b.width.toFixed(1), opacity: getComputedStyle(slot).opacity, btnTabindex: btn?.getAttribute("tabindex"), btnLabel: btn?.textContent.trim() };
});
const env = (page) => page.evaluate(() => ({ coarse: matchMedia("(pointer: coarse)").matches, hoverNone: matchMedia("(hover: none)").matches, desktopMQ: matchMedia("(min-width: 1024px)").matches, appDesktopMQ: matchMedia("(min-width: 1024px) and (min-aspect-ratio: 1.1)").matches, rootFont: getComputedStyle(document.documentElement).fontSize, uiScale: getComputedStyle(document.documentElement).getPropertyValue("--ui-scale").trim(), touchFloor: getComputedStyle(document.documentElement).getPropertyValue("--dock-touch-target").trim() }));
const seatGeom = (page) => page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [+b.width.toFixed(2), +b.height.toFixed(2)]; };
  const back = [...document.querySelectorAll(".glass-dock button")].find((b) => b.getAttribute("aria-label") === "Back");
  return { seats: [...document.querySelectorAll(".dock-face.is-active .action-button-wrapper")].map(r), back: r(back), toggle: r(document.querySelector(".action-bar-toggle-inner button")) };
});

const browser = await chromium.launch();
try {
  // ── iPad-class landscape, coarse ──
  {
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 1024 }, isMobile: true, hasTouch: true, colorScheme: "light" });
    const cell = (out.cells["coarse-1366x1024"] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/");
      cell.env = await env(page);
      cell.dockAtBoot = await held(page);
      cell.toggleAtBoot = await toggleState(page);
      if (cell.dockAtBoot.collapsed) { await page.locator(".glass-dock.collapsed").tap(); await page.waitForTimeout(900); }
      if (cell.toggleAtBoot.present && !cell.toggleAtBoot.inert) {
        await page.locator(".action-bar-toggle-inner button").tap();
        await page.waitForTimeout(1200);
        cell.c0155 = await seatGeom(page);                      // AT-4 successor geometry
        const copy = page.locator('[data-scene-action="color.copy"] .action-button-wrapper');
        await copy.tap(); await page.waitForTimeout(500);
        cell.c0156_afterTap1 = await held(page);
        await copy.tap(); await page.waitForTimeout(500);
        cell.c0156_afterTap2 = await held(page);
        await page.waitForTimeout(7000);
        cell.c0156_after7s = await held(page);
        await page.screenshot({ path: `${EV}/p2-0155-coarse-1366.png`, clip: { x: 383, y: 0, width: 600, height: 100 } });
      }
    } finally { await ctx.close(); }
  }

  // ── iPad-class portrait 1024x1366, coarse (0181) ──
  {
    const ctx = await browser.newContext({ viewport: { width: 1024, height: 1366 }, isMobile: true, hasTouch: true, colorScheme: "light" });
    const cell = (out.cells["coarse-1024x1366"] = {});
    try {
      const page = await ctx.newPage();
      await boot(page, "#/");
      cell.env = await env(page);
      cell.dock = await held(page);
      cell.toggle = await toggleState(page);
      cell.dockLayers = await page.evaluate(() => [...document.querySelectorAll(".glass-dock .dock-crossfade > .dock-face")].map((f) => ({ active: f.classList.contains("is-active"), labels: [...f.querySelectorAll("button[aria-label]")].map((b) => b.getAttribute("aria-label")).slice(0, 8) })));
      await boot(page, "#/palettes");
      cell.palettesEditControls = await page.evaluate(() => [...document.querySelectorAll("main button, main [role=button]")].map((b) => b.getAttribute("aria-label") || b.textContent.trim()).filter((t) => /edit|save|commit|done|apply/i.test(t)).slice(0, 20));
      await page.screenshot({ path: `${EV}/p2-0181-portrait-1024x1366-palettes.png`, clip: { x: 0, y: 0, width: 1024, height: 700 } });
    } finally { await ctx.close(); }
  }

  // ── phone 390x844 ──
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: "light" });
    const cell = (out.cells["phone-390x844"] = {});
    try {
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await boot(page, "#/");
      cell.env = await env(page);
      cell.c0182_toggle = await toggleState(page);           // U-5 Tools toggle on /#/
      cell.c0159_seatsInDom = await page.locator(".action-button-wrapper").count();
      cell.c0159_actionFace = await page.evaluate(() => !!document.querySelector('[data-testid="scene-action-row"]'));
      await page.screenshot({ path: `${EV}/p2-0182-390-picker.png`, clip: { x: 0, y: 0, width: 390, height: 110 } });
      // 0171 — AX cell of the view-select combobox (mobile: SelectValue v-if'd away).
      const cb = page.getByRole("combobox", { name: "Select view" });
      cell.c0171_ariaSnapshot = await cb.ariaSnapshot();
      await cdp.send("Accessibility.enable");
      const { nodes } = await cdp.send("Accessibility.getFullAXTree");
      const n = nodes.find((x) => x.role?.value === "combobox" && /Select view/.test(x.name?.value ?? ""));
      cell.c0171_cdp = n ? { role: n.role.value, name: n.name?.value, value: n.value?.value ?? null, description: n.description?.value ?? null, props: (n.properties ?? []).map((p) => `${p.name}=${p.value?.value}`) } : null;
      cell.c0171_textInTrigger = await page.evaluate(() => document.querySelector(".view-select-trigger")?.textContent.trim() ?? null);

      // per-route toggle census (picker family vs generic scenes)
      cell.toggleByRoute = {};
      for (const h of ["#/palettes", "#/mix", "#/generate", "#/gradient"]) { await boot(page, h, 2500); cell.toggleByRoute[h] = await toggleState(page); }

      // 0179 at 390 (generate) — if the bar is reachable.
      await boot(page, "#/generate");
      const t = await toggleState(page);
      if (t.present && !t.inert) {
        await page.locator(".action-bar-toggle-inner button").tap(); await page.waitForTimeout(1200);
        cell.c0179_390 = await page.evaluate(() => {
          const row = document.querySelector('[data-testid="scene-action-row"]'); if (!row) return null;
          const face = row.closest(".dock-face"); const seats = [...row.querySelectorAll(".scene-action-seat")].map((s) => s.getBoundingClientRect());
          const R = (b) => [+b.x.toFixed(1), +b.width.toFixed(1)];
          return { face: R(face.getBoundingClientRect()), row: R(row.getBoundingClientRect()), seats: seats.map(R), pitch: seats.slice(1).map((b, i) => +(b.x - seats[i].x).toFixed(2)), states: [...row.querySelectorAll(".scene-action-seat")].map((s) => s.getAttribute("data-action-state")) };
        });
      }

      // 0178 — the ROOT 390x844 Reset witness on /#/gradient: 90deg -> 337deg -> Reset -> read at +250ms.
      await boot(page, "#/gradient");
      const dirText = () => page.evaluate(() => { const s = [...document.querySelectorAll("span.tabular-nums")].find((e) => /deg$/.test(e.textContent.trim())); return s?.textContent.trim() ?? null; });
      const w = { start: await dirText() };
      const thumb = page.getByRole("slider", { name: "Gradient direction" }).first();
      if (await thumb.count()) {
        await thumb.focus(); await page.keyboard.press("End");
        for (let i = 0; i < 23; i++) await page.keyboard.press("ArrowLeft");
        await page.waitForTimeout(300);
        w.set = await dirText();
        const tg = await toggleState(page);
        w.toggle = tg;
        if (tg.present && !tg.inert) {
          await page.locator(".action-bar-toggle-inner button").tap(); await page.waitForTimeout(1200);
          const reset = page.locator('[data-scene-action="gradient.reset"]');
          w.resetState = (await reset.count()) ? await reset.getAttribute("data-action-state") : "absent";
          if (await reset.count()) {
            await reset.locator(".action-button-wrapper").tap({ force: false }).catch((e) => { w.tapError = String(e).slice(0, 160); });
            await page.waitForTimeout(250);
            w.after250 = await dirText();
            w.srStatus = await page.evaluate(() => [...document.querySelectorAll('[data-testid="scene-action-row"] ~ p[role=status], .glass-dock p[role=status], .glass-dock [role=alert]')].map((p) => p.textContent.trim()).filter(Boolean));
            await page.screenshot({ path: `${EV}/p2-0178-390-gradient-after-reset.png`, clip: { x: 0, y: 0, width: 390, height: 844 } });
          }
        }
      } else w.slider = "absent";
      cell.c0178 = w;
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
  writeJson("p2-coarse.json", out);
  console.log(JSON.stringify(out, null, 1).slice(0, 9000));
}
