// SERVED MODEL: claude-opus-5-5[1m]
// X.KF.W13T.e2 — the bounded G-KFW13T-6 (whole) + R-e-2 live probe (value.js playwright, kf dev :5173).
// Beside KF-W13T-e-probe.mjs (E-3: the banked probe is not edited). One fresh browser context per run,
// so the persisted store starts empty; the reload keeps the context's localStorage, as a page reload does.
// Usage: node KF-W13T-e2-probe.mjs <tag> [shotDir] [engine=chromium|webkit] [scheme=light|dark]
import { chromium, webkit } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const [tag = "after", shotDir = null, engine = "chromium", scheme = "light"] = process.argv.slice(2);
const B = "http://localhost:5173/";
const b = await (engine === "webkit" ? webkit : chromium).launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
const out = { tag, engine, scheme };
const shot = async (p, name, clip) => { if (shotDir) await p.screenshot({ path: `${shotDir}/KF-W13T-e2-${tag}-${name}.png`, ...(clip ? { clip } : {}) }); };
const p = await ctx.newPage(); const errs = [];
p.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
const open = async (reload) => { if (reload) await p.reload({ waitUntil: "networkidle" }); else await p.goto(B + "#/easing", { waitUntil: "networkidle" }); await p.waitForTimeout(1200); };
const toggle = () => p.getByRole("button", { name: "Hide ball preview" }).first();
const vis = () => p.evaluate(() => { const s = document.querySelector(".scrub-rail")?.closest(".grid")?.querySelector(".visualizer-stage"); return !!s && s.getClientRects().length > 0; });
const stages = () => p.evaluate(() => document.querySelectorAll(".visualizer-stage").length);
const stored = () => p.evaluate(() => { try { return JSON.parse(localStorage.getItem("animation-groups-control-options-store") ?? "{}").easing?.easingPreview ?? null; } catch { return "unreadable"; } });
const read = async () => ({ pressed: await toggle().getAttribute("aria-pressed"), visible: await vis(), stages: await stages(), stored: await stored() });
const railBox = async () => { const r = await p.locator(".scrub-rail .glass-slider").boundingBox(); return { x: r.x - 24, y: r.y - 24, width: r.width + 48, height: 220 }; };

// ── R-e-2: a PAUSED scrub repaints the AnimationVisualizer twin (the scene rests on entry)
await open(false);
{
  const th = p.locator('[role=slider][aria-label="Scrub animation timeline"]');
  const ball = () => p.evaluate(() => { const e = document.querySelector(".scrub-rail")?.closest(".grid")?.querySelector(".visualizer-stage .visualizer-ball"); return e ? { x: Math.round(e.getBoundingClientRect().x), transform: e.style.transform || "none" } : null; });
  const playing = () => p.getByRole("button", { name: /^Pause$/ }).count();
  const r = { playingAtEntry: (await playing()) > 0, t0: Number(await th.getAttribute("aria-valuenow")), ball0: await ball() };
  await th.focus(); for (let i = 0; i < 40; i++) await p.keyboard.press("ArrowRight"); await p.waitForTimeout(300);
  r.keyboard = { t: Number(await th.getAttribute("aria-valuenow")), ball: await ball() };
  await shot(p, "paused-scrub-keyboard", await railBox());
  // pointer: drag the thumb back by 12 x 12 px (the KF-W13T-e-probe G-4 gesture, reversed)
  const tb = await th.boundingBox();
  await p.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await p.mouse.down();
  for (let i = 1; i <= 12; i++) { await p.mouse.move(tb.x + tb.width / 2 - i * 12, tb.y + tb.height / 2); await p.waitForTimeout(25); }
  await p.mouse.up(); await p.waitForTimeout(300);
  r.pointer = { t: Number(await th.getAttribute("aria-valuenow")), ball: await ball() };
  await shot(p, "paused-scrub-pointer", await railBox());
  r.stillPaused = (await playing()) === 0;
  r.keyboardMoved = r.keyboard.ball?.x !== r.ball0?.x; r.pointerMoved = r.pointer.ball?.x !== r.keyboard.ball?.x;
  out.re2 = r;
}
// ── G-KFW13T-6 whole: hide/show, and each state persisted across a reload
{
  const g = { entry: await read() };
  await toggle().click(); await p.waitForTimeout(400); g.hide = await read();
  await shot(p, "preview-hidden", await railBox());
  await open(true); g.hideAfterReload = await read();
  await shot(p, "preview-hidden-after-reload", await railBox());
  await toggle().click(); await p.waitForTimeout(400); g.show = await read();
  await open(true); g.showAfterReload = await read();
  await shot(p, "preview-shown-after-reload", await railBox());
  g.green = g.entry.pressed === "false" && g.entry.visible && g.hide.pressed === "true" && !g.hide.visible && g.hide.stages === 0 && g.hideAfterReload.pressed === "true" && !g.hideAfterReload.visible && g.hideAfterReload.stages === 0 && g.show.pressed === "false" && g.show.visible && g.showAfterReload.pressed === "false" && g.showAfterReload.visible;
  out.g6 = g;
}
out.pageerrors = [...errs];
await b.close();
console.log(JSON.stringify(out));
