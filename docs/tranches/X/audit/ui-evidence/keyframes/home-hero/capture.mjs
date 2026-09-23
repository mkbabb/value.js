// UI audit capture — keyframes.js home-hero (read-only; headed Chromium on the GPU)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const URL_ = "http://localhost:5173/#/";
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const log = { tree: TREE, sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function fresh(vpKey, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vpKey], deviceScaleFactor: 2, colorScheme: theme, hasTouch: vpKey === "m", isMobile: vpKey === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 300)); });
  page.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 300)));
  await page.goto(URL_, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  return { ctx, page, errs };
}
async function shot(page, name) { const p = OUT + name + ".png"; await page.screenshot({ path: p }); return name + ".png"; }
async function probe(page) {
  return page.evaluate(() => {
    const r = (el) => { if (!el) return null; const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); return { tag: el.tagName, cls: String(el.className).slice(0, 120), label: el.getAttribute("aria-label"), radius: cs.borderRadius, h: Math.round(b.height), w: Math.round(b.width), x: Math.round(b.x), y: Math.round(b.y), font: cs.fontSize + " " + cs.fontFamily.slice(0, 40) }; };
    const q = (s) => [...document.querySelectorAll(s)];
    const hero = document.querySelector(".hero-band");
    return {
      dark: document.documentElement.classList.contains("dark"),
      startScreen: !!hero, heroH1: r(document.querySelector("h1.hero-display")),
      heroDeck: r(document.querySelector(".hero-deck")), heroHint: r(document.querySelector(".hero-hint")),
      aurora: r(document.querySelector(".hero-aurora")), auroraCanvas: !!document.querySelector(".hero-aurora canvas"),
      buttons: q("button,[role=button],[role=combobox],[role=tab]").filter(e => e.getBoundingClientRect().width > 0).slice(0, 60).map(r),
      h1count: q("h1").length, h2: q("h2").map(e => e.textContent.trim().slice(0, 60)),
      docW: document.documentElement.scrollWidth, docH: document.documentElement.scrollHeight,
    };
  });
}
for (const theme of ["light", "dark"]) for (const vp of ["d", "m"]) {
  const tag = `${vp === "d" ? "1440" : "390"}-${theme}`;
  const run = { tag, frames: {}, notes: [] };
  // A. first-load start screen (+ aurora)
  let { ctx, page, errs } = await fresh(vp, theme);
  run.frames.firstLoad = await shot(page, `01-firstload-${tag}`);
  run.probeFirst = await probe(page);
  // hover the play button (tooltip) + keyboard focus
  const play = page.getByRole("button", { name: /Play animation|Pause animation/ }).first();
  run.playVisible = await play.isVisible().catch(() => false);
  if (vp === "d" && run.playVisible) { await play.hover(); await page.waitForTimeout(400); run.frames.hoverPlay = await shot(page, `02-hover-play-${tag}`); }
  await page.mouse.move(5, VPS[vp].height / 2);
  await page.keyboard.press("Tab"); await page.waitForTimeout(250);
  await page.keyboard.press("Tab"); await page.waitForTimeout(250);
  run.focusAfter2Tabs = await page.evaluate(() => { const a = document.activeElement; return a ? (a.getAttribute("aria-label") || a.textContent.trim().slice(0, 40)) + " <" + a.tagName + ">" : null; });
  run.frames.focus = await shot(page, `03-focus-2tabs-${tag}`);
  // B. drag the cube -> start screen dismisses
  const cx = VPS[vp].width / 2, cy = VPS[vp].height * (vp === "d" ? 0.33 : 0.3);
  await page.mouse.move(cx, cy); await page.mouse.down();
  for (let i = 1; i <= 12; i++) { await page.mouse.move(cx + i * 12, cy + i * 4); await page.waitForTimeout(16); }
  await page.mouse.up(); await page.waitForTimeout(1200);
  run.frames.afterDrag = await shot(page, `04-after-drag-${tag}`);
  run.startAfterDrag = await page.evaluate(() => !!document.querySelector(".hero-band"));
  await ctx.close(); run.errsA = errs.slice(0, 20);
  // C. Play from fresh -> start screen dismisses, transport shows
  ({ ctx, page, errs } = await fresh(vp, theme));
  const play2 = page.getByRole("button", { name: /Play animation/ }).first();
  if (await play2.isVisible().catch(() => false)) { await play2.click(); await page.waitForTimeout(1500); }
  else run.notes.push("Play not visible at first load");
  run.frames.afterPlay = await shot(page, `05-after-play-${tag}`);
  run.startAfterPlay = await page.evaluate(() => !!document.querySelector(".hero-band"));
  run.probePlay = await probe(page);
  // D. channel select open (Rotations/Matrix/Hover)
  const sel = page.getByRole("combobox", { name: /Select animation/ }).or(page.getByLabel("Select animation")).first();
  if (await sel.isVisible().catch(() => false)) {
    await sel.click(); await page.waitForTimeout(600);
    run.frames.channels = await shot(page, `06-channel-select-${tag}`);
    run.channelOptions = await page.evaluate(() => [...document.querySelectorAll("[role=option]")].map(o => { const cs = getComputedStyle(o); return o.textContent.trim() + " r=" + cs.borderRadius; }));
    run.listbox = await page.evaluate(() => { const l = document.querySelector("[role=listbox]"); if (!l) return null; const p = l.closest("[data-reka-popper-content-wrapper]") || l.parentElement; const cs = getComputedStyle(l.parentElement); return { radius: cs.borderRadius, cls: String(l.parentElement.className).slice(0, 160) }; });
    await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  } else run.notes.push("Select animation not visible after Play");
  // pause again -> selected/paused state
  const pause = page.getByRole("button", { name: /Pause animation/ }).first();
  if (await pause.isVisible().catch(() => false)) { await pause.click(); await page.waitForTimeout(600); run.frames.paused = await shot(page, `07-paused-${tag}`); }
  await ctx.close(); run.errsC = errs.slice(0, 20);
  log.runs.push(run);
  console.log(tag, JSON.stringify({ play: run.playVisible, afterDrag: run.startAfterDrag, afterPlay: run.startAfterPlay, opts: run.channelOptions, notes: run.notes }));
}
await browser.close();
writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 2));
console.log("sha", sha, "dirty", dirty);
