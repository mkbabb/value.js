// 390 drawer continuation — full-snap, occlusion hit-test, ribbon toggle/reset/focus. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const rev = (t) => ({ sha: execSync(`git -C ${t} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${t} status --porcelain`).toString().trim().split("\n").filter(Boolean).length });
const log = { kf: rev("/Users/mkbabb/Programming/keyframes.js"), glass: rev("/Users/mkbabb/Programming/glass-ui"), when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) {
  const run = { tag: `390-${theme}`, steps: [] };
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  const S = async (name, extra) => { const p = `${name}-${run.tag}.png`; await page.screenshot({ path: OUT + p }); run.steps.push({ frame: p, ...(extra || {}) }); };
  try {
    await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
    await page.mouse.move(195, 800); await page.waitForTimeout(1200);
    await page.getByLabel("Select animation").first().click(); await page.waitForTimeout(700);
    await page.getByRole("option", { name: "Matrix" }).first().click(); await page.waitForTimeout(1300);
    const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
    await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800);
    await page.getByRole("option", { name: "Matrix Controls" }).first().click(); await page.waitForTimeout(1400);
    // occlusion hit-test at the peek snap: which element owns the centre of each bottom-row cell?
    const hit = () => page.evaluate(() => { const g = [...document.querySelectorAll(".matrix-grid")].find(x => x.getBoundingClientRect().width > 0); const ins = [...g.querySelectorAll("input")];
      const snap = document.querySelector(".glass-drawer")?.getAttribute("data-snap") ?? document.querySelector("[data-glass-drawer-snap]")?.getAttribute("data-glass-drawer-snap");
      return { snap, vh: innerHeight, cells: [12, 13, 14, 15].map(i => { const r = ins[i].getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2; const h = document.elementFromPoint(cx, cy);
        return { i, y: Math.round(cy), inView: cy < innerHeight, hitIsInput: h === ins[i], hit: h ? h.tagName + "." + h.className.toString().slice(0, 50) + " [" + (h.closest("[aria-label]")?.getAttribute("aria-label") || "") + "]" : null }; }),
        ribbon: [...document.querySelectorAll("button")].filter(b => /^(Reset|Free|Fixed)$/.test(b.textContent.trim())).map(b => { const r = b.getBoundingClientRect(); return { t: b.textContent.trim(), y: Math.round(r.y), visible: r.width > 0 && r.y < innerHeight }; }) }; });
    run.peek = await hit(); await S("11-peek-occlusion", { hit: run.peek });
    // try to reach the full snap with the drawer handle's keyboard contract
    const handle = page.locator(".glass-drawer-handle").first(); const hb = await handle.boundingBox();
    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down();
    await page.mouse.move(hb.x + hb.width / 2, 80, { steps: 25 }); await page.mouse.up(); await page.waitForTimeout(1400);
    run.afterDrag = await hit(); await S("12-drawer-drag-to-top", { hit: run.afterDrag });
    await handle.focus(); for (const k of ["ArrowUp", "ArrowUp", "End"]) { await page.keyboard.press(k); await page.waitForTimeout(500); }
    await page.waitForTimeout(900); run.afterKeys = await hit(); await S("13-drawer-keys-full", { hit: run.afterKeys });
    // bring the ribbon into view and exercise it
    const free = page.getByRole("button", { name: /^(Free|Fixed)$/ }).first();
    await free.scrollIntoViewIfNeeded({ timeout: 5000 }).catch((e) => run.scrollErr = String(e).slice(0, 160));
    await page.waitForTimeout(600); run.afterScroll = await hit(); await S("14-ribbon-scrolled", { hit: run.afterScroll });
    try { await free.click({ timeout: 5000 }); await page.waitForTimeout(700); await S("15-toggle-flipped"); } catch (e) { run.toggleErr = String(e).split("\n")[0].slice(0, 200); }
    try { await page.getByRole("button", { name: /^Reset$/ }).first().focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(500); await S("16-ribbon-focus-visible"); } catch (e) { run.focusErr = String(e).slice(0, 160); }
  } catch (e) { run.err = String(e).slice(0, 300); }
  run.errs = errs; log.runs.push(run); await ctx.close(); console.log(run.tag, run.err || "ok");
}
await browser.close(); writeFileSync(OUT + "capture-390-log.json", JSON.stringify(log, null, 2)); console.log(JSON.stringify(log, null, 1).slice(0, 5000));
