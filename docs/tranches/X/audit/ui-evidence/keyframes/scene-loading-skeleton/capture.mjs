// UI audit capture — keyframes.js scene-loading-skeleton (read-only; headed Chromium on the GPU)
// Holds the target scene's entry module in-flight (page.route) so the <Suspense> #fallback is observable,
// then releases it and samples the swap into the resolved scene.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TREE = "/Users/mkbabb/Programming/keyframes.js";
const sha = execSync(`git -C ${TREE} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${TREE} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const BASE = "http://localhost:5173/";
const VPS = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const log = { tree: TREE, sha, dirty, when: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function ctxFor(vpKey, theme) {
  const ctx = await browser.newContext({ viewport: VPS[vpKey], deviceScaleFactor: 2, colorScheme: theme, hasTouch: vpKey === "m", isMobile: vpKey === "m" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  return ctx;
}
function holder(page, re) {
  let release; const gate = new Promise((r) => (release = r)); const hits = [];
  page.route((u) => re.test(u.toString()), async (route) => { hits.push(route.request().url()); await gate; await route.continue(); });
  return { release: () => release(), hits };
}
async function shot(page, name) { await page.screenshot({ path: OUT + name + ".png" }); return name + ".png"; }
async function probe(page) {
  return page.evaluate(() => {
    const r = (el) => { if (!el) return null; const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
      return { cls: String(el.className).slice(0, 140), radius: cs.borderRadius, bg: cs.backgroundColor, border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow.slice(0, 80), x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), opacity: cs.opacity, anim: cs.animationName + " " + cs.animationDuration }; };
    const sk = document.querySelector(".scene-skeleton");
    const sheen = document.querySelector(".scene-skeleton__sheen");
    const sheenAfter = sheen ? getComputedStyle(sheen, "::after") : null;
    const host = document.querySelector(".scene-host");
    const firstPlate = host ? host.querySelector(":scope > * > [class*=card], :scope [class*=rounded-card]") : null;
    return {
      dark: document.documentElement.classList.contains("dark"),
      hash: location.hash,
      skeleton: r(sk), plate: r(document.querySelector(".scene-skeleton__plate")), sheen: r(sheen),
      sheenAfter: sheenAfter ? { content: sheenAfter.content, anim: sheenAfter.animationName + " " + sheenAfter.animationDuration, bg: sheenAfter.backgroundImage.slice(0, 120) } : null,
      host: r(host), hostChild: r(host?.firstElementChild), resolvedPlate: r(firstPlate),
      live: [...document.querySelectorAll("[aria-live]")].map((e) => e.getAttribute("aria-live") + ":" + e.textContent.trim().slice(0, 40)),
      vt: typeof document.startViewTransition === "function",
      startScreen: !!document.querySelector(".hero-band"),
      bodyBg: getComputedStyle(document.body).backgroundColor,
    };
  });
}
const SCENE = "amiga";
const RE = new RegExp(`/scenes/${SCENE}/AmigaScene\\.vue`);
for (const theme of ["light", "dark"]) for (const vp of ["d", "m"]) {
  const tag = `${vp === "d" ? "1440" : "390"}-${theme}`;
  const run = { tag, frames: {}, notes: [] };
  // A. HARD LOAD on #/amiga with the scene chunk held -> the fallback on first paint
  let ctx = await ctxFor(vp, theme); let page = await ctx.newPage(); const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 240)); });
  page.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 240)));
  let h = holder(page, RE);
  await page.goto(BASE + "#/" + SCENE, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".scene-skeleton", { timeout: 15000 }).catch(() => run.notes.push("A: no .scene-skeleton seen"));
  await page.waitForTimeout(1200);
  run.frames.hardLoadFallback = await shot(page, `01-hardload-fallback-${tag}`);
  run.probeFallback = await probe(page);
  await page.waitForTimeout(700); // mid-sheen second sample
  run.frames.hardLoadFallback2 = await shot(page, `02-hardload-fallback-t2-${tag}`);
  // release and sample the swap into the resolved scene
  const t0 = Date.now(); h.release();
  await page.waitForSelector(".scene-skeleton", { state: "detached", timeout: 15000 }).catch(() => run.notes.push("A: skeleton never detached"));
  run.resolveMs = Date.now() - t0;
  run.frames.swap0 = await shot(page, `03-hardload-swap-t0-${tag}`);
  run.probeSwap0 = await probe(page);
  await page.waitForTimeout(150); run.frames.swap150 = await shot(page, `04-hardload-swap-t150-${tag}`);
  await page.waitForTimeout(1500); run.frames.resolved = await shot(page, `05-hardload-resolved-${tag}`);
  run.probeResolved = await probe(page);
  run.hitsA = h.hits.length;
  await ctx.close();
  // B. IN-APP ROUTE CHANGE home -> amiga (cold chunk held) : old paint -> fallback -> resolved
  ctx = await ctxFor(vp, theme); page = await ctx.newPage();
  page.on("pageerror", (e) => errs.push("pageerror(B): " + String(e).slice(0, 240)));
  await page.goto(BASE + "#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
  run.frames.before = await shot(page, `06-route-before-cube-${tag}`);
  h = holder(page, RE);
  await page.evaluate((s) => { location.hash = "#/" + s; }, SCENE);
  // sample the VT cross-fade window into the fallback
  await page.waitForTimeout(120); run.frames.routeT120 = await shot(page, `07-route-t120-${tag}`);
  await page.waitForSelector(".scene-skeleton", { timeout: 8000 }).catch(() => run.notes.push("B: no .scene-skeleton seen"));
  await page.waitForTimeout(900); run.frames.routeFallback = await shot(page, `08-route-fallback-${tag}`);
  run.probeRouteFallback = await probe(page);
  // per-frame opacity trace of the host across release -> resolve (does the resolved scene fade in, or hard-cut?)
  await page.evaluate(() => { window.__trace = []; const host = document.querySelector(".scene-host"); const t0 = performance.now();
    const tick = () => { window.__trace.push([Math.round(performance.now() - t0), getComputedStyle(host).opacity, !!document.querySelector(".scene-skeleton"), host.style.transform]); if (window.__trace.length < 90) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  h.release();
  await page.waitForSelector(".scene-skeleton", { state: "detached", timeout: 15000 }).catch(() => run.notes.push("B: skeleton never detached"));
  run.frames.routeSwap0 = await shot(page, `09-route-swap-t0-${tag}`);
  await page.waitForTimeout(1600);
  run.frames.routeResolved = await shot(page, `10-route-resolved-${tag}`);
  run.trace = await page.evaluate(() => { const t = window.__trace; const flip = t.findIndex((r) => !r[2]); return { flipIdx: flip, around: t.slice(Math.max(0, flip - 3), flip + 12) }; });
  run.probeRouteResolved = await probe(page);
  run.errs = errs.slice(0, 15);
  await ctx.close();
  log.runs.push(run);
  console.log(tag, "done", run.notes.join("; "));
}
// C. reduced-motion + forced-colors spot check at 1440 light (sheen arms)
{
  const ctx = await browser.newContext({ viewport: VPS.d, deviceScaleFactor: 2, colorScheme: "light", reducedMotion: "reduce" });
  const page = await ctx.newPage(); const h = holder(page, RE);
  await page.goto(BASE + "#/" + SCENE, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".scene-skeleton", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1000);
  await shot(page, "11-prm-fallback-1440-light");
  log.prm = await probe(page); h.release(); await ctx.close();
}
writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 2));
await browser.close();
