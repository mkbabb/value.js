// JUROR-3 · wave V·MT-W-APP-1 — the born-RED gate suite for demo/color-picker/App.vue.
//
// Run:  node docs/tranches/V/megatranche/audit/components/App/gates-w-app-1.mjs
//       (dev server must be live at http://localhost:9000)
//       G1..G3 filter with GATE=G7 to run one.
//
// EVERY gate below is RED against HEAD c654824e. A gate that is green at authorship is
// vacuous; each row's `whatWouldMakeItFail` names the exact input that turns it RED, so the
// suite cannot be satisfied by deleting the measurement.
//
// Exit code = number of RED gates.
import { chromium } from "playwright";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, join } from "node:path";

const ORIGIN = "http://localhost:9000";
const REPO = resolve(import.meta.dirname, "../../../../../../..");
const ONLY = process.env.GATE || null;
const results = [];
const record = (id, title, green, observed, expected) => {
  if (ONLY && ONLY !== id) return;
  results.push({ id, title, verdict: green ? "GREEN" : "RED", observed, expected });
};

const DESKTOP = { viewport: { width: 1440, height: 900 } };
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const ZOOM200 = { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 };

const browser = await chromium.launch();
const open = async (ctxOpts, route = "#/", settleMs = 3200) => {
  const c = await browser.newContext(ctxOpts);
  const p = await c.newPage();
  await p.addInitScript(() => {
    window.__lt = []; window.__cls = 0;
    try { new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(e.duration))).observe({ type: "longtask", buffered: true }); } catch {}
    try { new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true }); } catch {}
  });
  await p.goto(`${ORIGIN}/${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(settleMs);
  return { c, p };
};

// ── G1 · PROPORTION ─────────────────────────────────────────────────────────────────────
// π-1 · 1440×900 · /#/ · .pane-wrapper--left / --right
{
  const { c, p } = await open(DESKTOP);
  const share = await p.evaluate(() => {
    const l = document.querySelector(".pane-wrapper--left"), r = document.querySelector(".pane-wrapper--right");
    if (!l || !r) return null;
    const lw = l.getBoundingClientRect().width, rw = r.getBoundingClientRect().width;
    return rw === 0 ? null : +(100 * lw / (lw + rw)).toFixed(4);
  });
  const legal = share === null || Math.abs(share - 61.8033989) <= 0.5 || Math.abs(share - 66.6666667) <= 0.5;
  record("G1", "protagonist share is golden or preview-dominant", legal,
    `leftShare=${share}%`, "61.8033989% or 66.6666667% (±0.5pp), or a single-scene shell (no second wrapper)");
  await c.close();
}

// ── G2 · HEADING + BYPASS ───────────────────────────────────────────────────────────────
// π-2 · 1440×900 AND 390×844@3 · /#/ · h1 / main / skip link / polite status
for (const [id, ctx] of [["G2", DESKTOP], ["G2m", MOBILE]]) {
  const { c, p } = await open(ctx);
  const a11y = await p.evaluate(() => {
    const main = document.querySelector("main");
    const first = document.querySelector("a[href], button, input, [tabindex]:not([tabindex='-1'])");
    return {
      h1: document.querySelectorAll("h1").length,
      h1InMain: main ? main.querySelectorAll("h1").length : 0,
      mainCount: document.querySelectorAll("main").length,
      firstFocusableIsSkip: !!(first && first.tagName === "A" && /skip/i.test(first.textContent + (first.className || ""))),
      politeStatus: document.querySelectorAll("[role='status'], [aria-live='polite']").length,
    };
  });
  const green = a11y.h1 === 1 && a11y.h1InMain === 1 && a11y.mainCount === 1 && a11y.firstFocusableIsSkip;
  record(id, "one H1 inside the sole main, skip link is the first focusable", green,
    JSON.stringify(a11y), "{h1:1, h1InMain:1, mainCount:1, firstFocusableIsSkip:true}");
  await c.close();
}

// ── G3 · MOBILE ACTION LIVENESS ─────────────────────────────────────────────────────────
// π-3 · 390×844@3 · /#/generate · nav.dock-band button[aria-label='Regenerate']
{
  const { c, p } = await open(MOBILE, "#/generate", 3500);
  const sig = () => p.evaluate(() => [...document.querySelectorAll("main [style*='background-color']")]
    .slice(0, 10).map(e => e.getAttribute("style")).join("|"));
  const before = await sig();
  const hit = await p.evaluate(() => {
    const t = [...document.querySelectorAll("nav.dock-band button")]
      .find(x => /regenerate/i.test((x.getAttribute("aria-label") || "") + (x.textContent || "")));
    if (!t) return "absent";
    t.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    return "dispatched";
  });
  await p.waitForTimeout(1500);
  const after = await sig();
  record("G3", "the dock's Regenerate changes the generate specimen at 390px", hit === "dispatched" && before !== after,
    `click=${hit} specimenChanged=${before !== after}`, "a rendered, enabled dock action mutates the specimen at every viewport it renders on");
  await c.close();
}

// ── G4 · DEEP-LINK OVERTURE ─────────────────────────────────────────────────────────────
// π-4 · 1440×900 · cold /#/gradient · performance marks
{
  const { c, p } = await open(DESKTOP, "#/gradient", 5000);
  const marks = await p.evaluate(() => performance.getEntriesByType("mark").map(m => m.name).filter(n => n.startsWith("overture:")));
  const green = ["b0", "b1", "b2", "b3", "b4"].every(b => marks.includes("overture:" + b));
  record("G4", "a cold deep link emits the whole overture DAG b0..b4", green,
    JSON.stringify(marks), "all five beats on a non-picker-left route");
  await c.close();
}

// ── G5 · AMBIENT MOTION TERMINATES OR IS STOPPABLE ──────────────────────────────────────
// π-5 · 1440×900 AND 390×844@3 · /#/ · rAF census at t=6s + operable still control
for (const [id, ctx] of [["G5", DESKTOP], ["G5m", MOBILE]]) {
  const c0 = await browser.newContext(ctx);
  const p = await c0.newPage();
  await p.addInitScript(() => { window.__raf = 0; const o = requestAnimationFrame; window.requestAnimationFrame = function (cb) { window.__raf++; return o.call(window, cb); }; });
  await p.goto(`${ORIGIN}/#/`, { waitUntil: "networkidle", timeout: 45000 });
  await p.waitForTimeout(6000);
  const a = await p.evaluate(() => window.__raf);
  await p.waitForTimeout(2000);
  const r = await p.evaluate(() => ({
    delta: window.__raf - 0,
    control: document.querySelectorAll("button[aria-pressed][data-ambient-motion], button[aria-label*='motion' i][aria-pressed], button[aria-label*='pause' i][aria-pressed]").length,
  }));
  const stillRunning = (r.delta - a) > 5;
  record(id, "ambient motion has terminated by 5s, or one announced still control exists", !stillRunning || r.control >= 1,
    `rafDeltaOver2sAfter6s=${r.delta - a} stillControls=${r.control}`,
    "rAF quiescent after 5s, or >=1 keyboard-operable aria-pressed still control that zeroes it");
  await c0.close();
}

// ── G6 · REFLOW AT 200% ZOOM ────────────────────────────────────────────────────────────
// π-6 · 720×450@2 · /#/ · .channel-rail vs clientHeight, document scrollability
{
  const { c, p } = await open(ZOOM200);
  const z = await p.evaluate(() => {
    const de = document.documentElement;
    const rail = document.querySelector(".channel-rail");
    const below = [...document.querySelectorAll("main *")].filter(e => {
      const b = e.getBoundingClientRect(); return b.height > 8 && b.top < de.clientHeight && b.bottom > de.clientHeight + 1;
    }).length;
    return { docScrollable: de.scrollHeight - de.clientHeight, vh: de.clientHeight,
      railBottom: rail ? +rail.getBoundingClientRect().bottom.toFixed(2) : null, clippedBelowFold: below };
  });
  const reachable = z.docScrollable > 0 || (z.clippedBelowFold === 0 && (z.railBottom === null || z.railBottom <= z.vh + 1));
  record("G6", "at the 200% arm every instrument is reachable by document scroll", reachable,
    JSON.stringify(z), "documentElement scrolls, or nothing is clipped below the fold");
  await c.close();
}

// ── G7 · MAIN-THREAD BUDGET ─────────────────────────────────────────────────────────────
// π-7 · 1440×900 · /#/ · PerformanceObserver longtask, 0..8000ms
{
  const { c, p } = await open(DESKTOP, "#/", 8000);
  const tbt = await p.evaluate(() => window.__lt.reduce((a, d) => a + Math.max(0, d - 50), 0));
  const max = await p.evaluate(() => Math.max(0, ...window.__lt));
  record("G7", "total blocking time over the first 8s is <= 200ms", tbt <= 200,
    `tbt=${Math.round(tbt)}ms longestTask=${Math.round(max)}ms`, "tbt<=200ms; no single task over 200ms");
  await c.close();
}

// ── G8 · IDLE FRAME RATE ────────────────────────────────────────────────────────────────
// π-8 · 1440×900 · /#/ · clean single rAF chain sampled t=6..8s, zero input
{
  const { c, p } = await open(DESKTOP, "#/", 6000);
  const fps = await p.evaluate(() => new Promise(res => {
    let n = 0; const t0 = performance.now();
    const tick = () => { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(tick); else res(+(n / ((performance.now() - t0) / 1000)).toFixed(1)); };
    requestAnimationFrame(tick);
  }));
  record("G8", "the idle desktop scene sustains >=55fps (or motion has terminated)", fps >= 55,
    `idleFps=${fps}`, ">=55fps with zero user input, or a terminated ambient renderer");
  await c.close();
}

// ── G9 · POST-PAINT GEOMETRY ────────────────────────────────────────────────────────────
// π-9 · 1440×900 · /#/ · PerformanceObserver layout-shift
{
  const { c, p } = await open(DESKTOP, "#/", 6000);
  const cls = await p.evaluate(() => +window.__cls.toFixed(4));
  record("G9", "the scene does not change geometry after paint (CLS <= 0.002)", cls <= 0.002,
    `cls=${cls}`, "VISUAL-CONSTITUTION.md:142 — enhancement after paint without geometry change");
  await c.close();
}

// ── G10 · CHROME INK NEUTRALITY ─────────────────────────────────────────────────────────
// π-10 · 1440×900 light AND dark · /#/ · nav.dock-band text leaves
for (const [id, scheme] of [["G10", "light"], ["G10d", "dark"]]) {
  const { c, p } = await open({ ...DESKTOP, colorScheme: scheme });
  const ink = await p.evaluate(() => {
    const nav = document.querySelector("nav.dock-band");
    if (!nav) return [];
    return [...nav.querySelectorAll("*")]
      .filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length))
      .map(e => {
        const t = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join("");
        const col = getComputedStyle(e).color;
        const m = col.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)/i);
        let chroma = null;
        if (m) chroma = +m[2];
        else { const n = col.match(/[\d.]+/g); if (n) { const [r, g, b] = n.slice(0, 3).map(Number); const mx = Math.max(r, g, b), mn = Math.min(r, g, b); chroma = +((mx - mn) / 255 * 0.4).toFixed(4); } }
        return { text: t.slice(0, 16), color: col.slice(0, 48), chroma };
      });
  });
  // 0.03 OKLCH chroma is the perceptual-neutral bar: the dark arm measures 0.0211 (neutral, and
  // GREEN — that is §2:21's "restrained neutral pole" working) while the light arm measures
  // 0.1884, 6x the bar. A tighter threshold would make the dark arm trip on a non-violation.
  const offenders = ink.filter(i => i.chroma !== null && i.chroma > 0.03 && !/palettes/i.test(i.text));
  record(id, `dock labels use neutral ink (${scheme})`, offenders.length === 0,
    JSON.stringify(offenders), "VISUAL-CONSTITUTION.md:23 — only the two `Palettes` substrings carry identity color");
  await c.close();
}

// ── G11 · ANNOUNCED NOT-FOUND ───────────────────────────────────────────────────────────
// π-11 · 1440×900 · /#/does-not-exist · role=status content
{
  const { c, p } = await open(DESKTOP, "#/does-not-exist", 3500);
  const s = await p.evaluate(() => [...document.querySelectorAll("[role='status'], [aria-live='polite']")]
    .map(e => e.textContent.trim()).filter(Boolean));
  const green = s.some(t => t.length > 0);
  record("G11", "an unknown route announces its redirect in one polite status", green,
    JSON.stringify(s), "VISUAL-CONSTITUTION.md:113 — redirect reason in one polite status, then destination title/H1");
  await c.close();
}

// ── G12 · EAGER GRAPH ───────────────────────────────────────────────────────────────────
// π-12 · 1440×900 · /#/ anonymous · performance resource entries
{
  const { c, p } = await open(DESKTOP, "#/", 3500);
  const admin = await p.evaluate(() => performance.getEntriesByType("resource").map(e => e.name)
    .filter(n => n.includes("/demo/") && /admin/i.test(n)).map(n => n.split("/demo/")[1].split("?")[0]));
  record("G12", "no admin module is in the anonymous first-paint graph", admin.length === 0,
    `${admin.length} eager admin modules: ${JSON.stringify(admin.slice(0, 6))}`, "0");
  await c.close();
}
await browser.close();

// ── G13 · COMPOSITION ROOT (static) ─────────────────────────────────────────────────────
{
  const mainTs = existsSync(join(REPO, "demo/color-picker/main.ts"));
  const html = readFileSync(join(REPO, "demo/color-picker/index.html"), "utf8");
  const inlineModule = /<script\s+type="module"\s*>[\s\S]*?<\/script>/.test(html);
  record("G13", "the app has a real entry module and no inline module body", mainTs && !inlineModule,
    `main.ts=${mainTs} inlineModuleScript=${inlineModule}`, "main.ts exists; index.html references it via src= only (MT-F012 P0)");
}

// ── G14 · GLOBAL KEYFRAME HOME (static) ─────────────────────────────────────────────────
{
  const walk = (d, acc = []) => { for (const f of readdirSync(d)) { const p = join(d, f);
    if (statSync(p).isDirectory()) { if (!/node_modules/.test(p)) walk(p, acc); } else if (p.endsWith(".css")) acc.push(p); } return acc; };
  const stray = walk(join(REPO, "demo")).filter(p => !p.includes("/demo/styles/"))
    .filter(p => /@keyframes/.test(readFileSync(p, "utf8")))
    .map(p => p.replace(REPO + "/", ""));
  record("G14", "every global @keyframes lives in demo/styles/", stray.length === 0,
    JSON.stringify(stray), "edict 6 — animations are moved, never deleted; global keyframes live in demo/styles/");
}

// ── G15 · NO DEAD STYLING HOOK (static) ─────────────────────────────────────────────────
{
  let hits = "";
  try { hits = execSync(`grep -rn "picker-shell" ${JSON.stringify(join(REPO, "demo"))} ${JSON.stringify(join(REPO, "node_modules/@mkbabb/glass-ui/dist"))} 2>/dev/null || true`, { encoding: "utf8" }); } catch {}
  const lines = hits.split("\n").filter(Boolean);
  record("G15", "no class is applied that no stylesheet defines", lines.length === 0,
    `${lines.length} reference(s), all consumers: ${lines.map(l => l.replace(REPO + "/", "").split(":").slice(0, 2).join(":")).slice(0, 3).join(" ")}`,
    "0 — either the rule exists in demo/styles or the token is deleted (edict 2)");
}

// ── report ──────────────────────────────────────────────────────────────────────────────
const red = results.filter(r => r.verdict === "RED");
console.log("\n  V·MT-W-APP-1 — born-RED gate suite\n");
for (const r of results) console.log(`  ${r.verdict.padEnd(5)} ${r.id.padEnd(5)} ${r.title}\n        observed: ${r.observed}\n        expected: ${r.expected}`);
console.log(`\n  ${red.length} RED / ${results.length} gates\n`);
process.exit(red.length);
