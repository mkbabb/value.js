// SERVED MODEL: claude-opus-5-5[1m]
// X.KF.W13T.k3 · R-k-1 — bounded chrome probe (headless chromium, kf dev :5173). Per viewport:
// ribbon retired (no "Show header actions"), the three App-zone names live INSIDE the top dock, `?` opens the
// shortcuts dialog, the dock's "Show keyboard shortcuts" opens it, "Share animation" opens the share popover.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch();
for (const [w,h] of [[1440,900],[768,1024],[390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  await p.goto("http://localhost:5173/#/cube", { waitUntil:"networkidle" }); await p.waitForTimeout(800);
  const dock = p.locator('[data-dock-tether="top"] .glass-dock').first();
  const ribbon = await p.getByRole("button", { name: /header actions/ }).count();
  await dock.hover(); await p.waitForTimeout(900);
  const inDock = {};
  for (const n of ["Share animation","Show keyboard shortcuts",/Switch to (dark|light) mode/]) inDock[String(n)] = await dock.getByRole("button", { name: n }).count();
  const outside = await p.evaluate(() => { const d=document.querySelector('[data-dock-tether="top"] .glass-dock');
    return [...document.querySelectorAll('button[aria-label="Share animation"],button[aria-label="Show keyboard shortcuts"]')].filter(e=>!d.contains(e)).length; });
  await p.mouse.move(w-5,h-5); await p.locator("body").click({ position:{x:w-5,y:h-5} }).catch(()=>{});
  await p.keyboard.press("?"); await p.waitForTimeout(400);
  const dlgKey = await p.getByRole("dialog").count();
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  await dock.hover(); await p.waitForTimeout(900);
  await dock.getByRole("button", { name: "Show keyboard shortcuts" }).click(); await p.waitForTimeout(400);
  const dlgClick = await p.getByRole("dialog").count();
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  await dock.hover(); await p.waitForTimeout(900);
  await dock.getByRole("button", { name: "Share animation" }).click(); await p.waitForTimeout(500);
  const share = await p.getByRole("textbox", { name: "Share URL or hash to load" }).count();
  console.log(`${w}x${h} ribbon=${ribbon} inDock=${JSON.stringify(inDock)} outsideDock=${outside} dialog(?)=${dlgKey} dialog(click)=${dlgClick} sharePopover=${share}`);
  await p.close();
}
await b.close();
