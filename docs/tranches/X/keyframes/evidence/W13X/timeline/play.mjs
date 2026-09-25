// SERVED MODEL: claude-opus-5-5 — KF.W13X.timeline · KFA-55 served probe: does the Timeline pane's playhead follow transport play?
// No reduced motion (under PRM the scene clock does not start, so the question cannot be asked). TAG=<before|after> RUN=<n> node play.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5251"; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const touch = w < 1024; const p = await (await b.newContext({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch })).newPage();
  await p.goto(`${BASE}/#/cube`); await sleep(3500);
  const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
  await p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first().click({ force: true }); await sleep(1200);
  await p.getByRole("button", { name: /^Import$/ }).filter({ visible: true }).first().click(); await sleep(600);
  await p.getByRole("dialog").locator("textarea").fill("@keyframes a { 0% { opacity: 1; } 100% { opacity: 0.2; } }");
  await p.getByRole("dialog").getByRole("button", { name: /^Import/ }).click(); await sleep(1500);
  const read = () => p.evaluate(() => { const t = [...document.querySelectorAll('[aria-label="Playhead — scrub the animation"]')].find((e) => e.getBoundingClientRect().width > 0); const s = t?.closest(".cartoon-surface")?.querySelector(".timeline-preview-stage")?.firstElementChild; return `${t?.getAttribute("aria-valuenow")}|${s ? getComputedStyle(s).opacity : "-"}`; });
  const playing = await p.locator('[aria-label="Pause animation"]').filter({ visible: true }).count();
  const s = []; for (let i = 0; i < 12; i++) { s.push(await read()); await sleep(100); }
  await p.evaluate(() => document.activeElement?.blur?.()); await p.keyboard.press("Space"); await sleep(400); // Space = the transport's play/pause
  const held = []; for (let i = 0; i < 5; i++) { held.push(await read()); await sleep(100); }
  console.log(`${w} playing=${playing} distinctWhilePlaying=${new Set(s).size}/12 [${s.slice(0, 4).join(" ")} …] distinctAfterPause=${new Set(held).size}/5 labelAfterPause=${await p.locator('[aria-label="Play animation"]').filter({ visible: true }).count() ? "Play" : "Pause"}`);
  await p.context().close();
}
await b.close();
