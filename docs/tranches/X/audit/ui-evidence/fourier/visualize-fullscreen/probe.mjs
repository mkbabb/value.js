// Targeted probes (read-only): menu occlusion, play-control relocation, canvas under-size, mobile reach.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";
const BASE = "http://localhost:3100";
const OUT = new URL(".", import.meta.url).pathname;
const slug = readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const R = {}; const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
// ---- desktop
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" });
  await page.locator(".controls-dock-anchor").waitFor({ timeout: 60000 }); await page.waitForTimeout(1500);
  R.inlinePlaying = await page.locator(".play-control").first().getAttribute("aria-pressed");
  await page.locator(".controls-dock-anchor .glass-dock").first().hover(); await page.waitForTimeout(700);
  await page.locator("[aria-label='Fullscreen']").click();
  const sizes = [];
  for (const t of [0, 60, 150, 300, 600, 1500]) { await page.waitForTimeout(t ? t - (sizes.at(-1)?.t ?? 0) : 0);
    sizes.push({ t, ...(await page.evaluate(() => { const d = document.querySelector("[data-slot=dialog-content]"); const c = d?.querySelector("canvas"); const cc = d?.querySelector(".canvas-container"); const cs = d && getComputedStyle(d);
      return d && { dlgRect: d.getBoundingClientRect().width, dlgOffset: d.offsetWidth, scale: cs.scale, transform: cs.transform.slice(0, 40), canvasCss: c?.style.width, ccOffset: cc?.offsetWidth }; })) }); }
  R.canvasOverTime = sizes;
  await page.mouse.move(5, 450); await page.waitForTimeout(2500);
  // play-control: pressed state, position before hover, after hover
  const pc = page.locator("[data-slot=dialog-content] .play-control");
  const before = { pressed: await pc.getAttribute("aria-pressed"), box: await pc.boundingBox() };
  await page.mouse.move(before.box.x + 20, before.box.y + 20); await page.waitForTimeout(80);
  const at80 = await pc.boundingBox(); await page.waitForTimeout(700); const at780 = await pc.boundingBox();
  await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(300);
  R.playRelocation = { before, at80, at780, pressedAfterClickAtOriginalSpot: await pc.getAttribute("aria-pressed"),
    hitAtOriginalSpot: await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e?.outerHTML.slice(0, 120); }, [before.box.x + 20, before.box.y + 20]) };
  await page.screenshot({ path: OUT + "p-d-play-relocated.png" });
  // More options menu occlusion
  await page.locator("[data-slot=dialog-content] [aria-label='More options']").click(); await page.waitForTimeout(700);
  R.menu = await page.evaluate(() => {
    const m = document.querySelector(".menu-popup"); if (!m) return null; const r = m.getBoundingClientRect();
    const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    const dlg = document.querySelector("[data-slot=dialog-content]");
    const wrap = m.closest("[data-reka-popper-content-wrapper]");
    const chain = []; let e = wrap; while (e && e !== document.body) { const cs = getComputedStyle(e); if (cs.zIndex !== "auto" || cs.position !== "static") chain.push(e.tagName + "." + (e.className?.toString().slice(0, 40)) + " z=" + cs.zIndex + " pos=" + cs.position); e = e.parentElement; }
    return { rect: [r.x, r.y, r.width, r.height], insideDialog: !!dlg?.contains(m), wrapperParent: wrap?.parentElement?.tagName + "#" + wrap?.parentElement?.id, wrapperZ: getComputedStyle(wrap).zIndex, wrapperStyleZ: wrap?.style.zIndex, dlgZ: getComputedStyle(dlg).zIndex, hitIsMenu: !!m.contains(hit), hit: hit?.outerHTML.slice(0, 120), chain, opacity: getComputedStyle(m).opacity, visibility: getComputedStyle(m).visibility };
  });
  await page.screenshot({ path: OUT + "p-d-menu-open.png" });
  await page.keyboard.press("Escape"); await page.waitForTimeout(400);
  // Tooltip occlusion: hover the Exit button
  await page.locator("[aria-label='Exit fullscreen']").hover(); await page.waitForTimeout(1200);
  R.exitTooltip = await page.evaluate(() => [...document.querySelectorAll("[role=tooltip]")].map((t) => t.textContent));
  // Exit via button: focus restore
  await page.locator("[aria-label='Exit fullscreen']").click(); await page.waitForTimeout(900);
  R.focusAfterExitBtn = await page.evaluate(() => document.activeElement?.tagName + " " + (document.activeElement?.getAttribute("aria-label") ?? ""));
  await ctx.close();
}
// ---- mobile
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/w/${slug}`, { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  await page.screenshot({ path: OUT + "p-m-inline-landing.png" });
  R.mTabs = await page.evaluate(() => [...document.querySelectorAll("[role=tab]")].map((t) => t.textContent.trim() + ":" + t.getAttribute("aria-selected")));
  R.mDock = await page.evaluate(() => { const a = document.querySelector(".controls-dock-anchor"); if (!a) return "absent"; const r = a.getBoundingClientRect(); return { r: [r.x, r.y, r.width, r.height], vis: getComputedStyle(a).visibility, hiddenAncestor: !!a.closest(".panel-inactive,[hidden],.is-hidden") }; });
  R.mFsButtons = await page.evaluate(() => [...document.querySelectorAll("[aria-label='Fullscreen']")].map((b) => { const r = b.getBoundingClientRect(); return [r.x, r.y, r.width, r.height, !!b.closest("[inert]")]; }));
  R.mViewState = await page.evaluate(() => localStorage.getItem("fourier_visualizer_view_state"));
  await ctx.close();
}
writeFileSync(OUT + "probe.json", JSON.stringify(R, null, 1)); await browser.close(); console.log(JSON.stringify(R, null, 1));
