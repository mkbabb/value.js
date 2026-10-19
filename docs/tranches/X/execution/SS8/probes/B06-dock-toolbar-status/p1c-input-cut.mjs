// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P1c: the actions<->input sub-layer cut (AT-12, item 0158), 1440x900 light.
// Per-rAF computed opacity of every dock face/layer while "Open color input" is pressed and the input closes again.
import { chromium } from "playwright";
import { boot, ensureExpanded, restOnDock, writeJson, EV } from "./lib.mjs";
const out = { probe: "p1c-input-cut", at: new Date().toISOString() };
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  try {
    const page = await ctx.newPage();
    await boot(page, "#/"); await ensureExpanded(page);
    await page.locator(".action-bar-toggle-inner button").first().click(); await page.waitForTimeout(1200); await restOnDock(page);
    const openInput = page.locator('.dock-face.is-active button[aria-label="Open color input"]').first();
    await openInput.waitFor({ state: "visible", timeout: 5000 });
    out.layers = await page.evaluate(() => [...document.querySelectorAll(".glass-dock .dock-face, .glass-dock .dock-layer")].map((f) => f.className.replace(/\s+/g, ".") + " T=" + getComputedStyle(f).transition.slice(0, 80)));
    await page.evaluate(() => {
      window.__cut = []; const t0 = performance.now();
      const tick = () => {
        const els = [...document.querySelectorAll(".glass-dock .dock-face, .glass-dock .dock-layer")];
        window.__cut.push({ t: +(performance.now() - t0).toFixed(1), o: els.map((f) => +Number(getComputedStyle(f).opacity).toFixed(3)), c: els.map((f) => (f.classList.contains("is-active") ? "A" : f.classList.contains("is-leaving") ? "L" : "-")) });
        if (performance.now() - t0 < 2600) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await page.waitForTimeout(150);
    await openInput.click();
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${EV}/p1c-0158-after-open-250ms.png`, clip: { x: 400, y: 0, width: 640, height: 90 } });
    await page.waitForTimeout(900);
    out.inputFace = await page.evaluate(() => document.querySelector(".dock-face.is-active")?.textContent.trim().slice(0, 60));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1200);
    const frames = await page.evaluate(() => window.__cut);
    writeJson("p1c-0158-frames.json", frames);
    const mids = frames.filter((f) => f.o.some((v) => v > 0.02 && v < 0.98));
    out.frames = frames.length; out.midFrames = mids.length; out.sampleMid = mids.slice(0, 8);
    out.classSeq = frames.filter((f, i) => !i || f.c.join("") !== frames[i - 1].c.join("") || f.o.join() !== frames[i - 1].o.join()).slice(0, 30);
  } finally { await ctx.close(); }
} finally { await browser.close(); writeJson("p1c-input-cut.json", out); console.log(JSON.stringify(out).slice(0, 5000)); }
