// Visual audit — the STATE matrices no prior audit covered: 200% zoom, reduced-motion,
// forced-colors, RTL, and keyboard-focus. WebKit (Safari engine), desktop + mobile.
//
// MT-F022: this harness emitted four false signals before it was corrected. Three fixes are
// load-bearing and must not be undone: (1) `dir=rtl` is applied POST-load — documentElement is
// null at addInitScript time in WebKit; (2) motion is measured by instrumenting rAF, because
// getAnimations() cannot see a WebGL render loop; (3) keyboard rows are meaningless in WebKit
// alone — macOS ships Full Keyboard Access OFF, so run ENGINE=chromium before believing any
// focus gap, and key focus identity by DOM path, never by label (see probes/kbd-reach.mjs).
//
// ─────────────────────────────────────────────────────────────────────────────
// X.KF.W9 `.a` CARVE — 2026-09-17. Same three obligations as capture.mjs, for
// the same reason: before this carve `grep -c 'safari-app|webkit-engine|
// ios-device|ios-simulator' states.mjs` returned 0, so every state row this
// file emitted was ambiguous between an ENGINE and an APP. I-20 has fired
// TWICE on exactly that substitution.
//
//   (1) I-20 CELL LABELS from the ten-cell roster, with assertCell() throwing
//       rather than letting a playwright row wear a safari-app label. This file
//       runs BOTH engines (ENGINE=chromium is load-bearing for the keyboard
//       rows — see MT-F022 above), so its cell is chosen by the engine that is
//       actually driving, never typed in.
//   (2) PER-SHOT sha256 in the row AND in a `.sha256` sidecar beside the PNG.
//       Green without a digest FAILS (G-KFW9-2).
//   (3) SUBSTRATE ref + sha + bundle digest on every row (G-KFW9-14).
//       `--bundle-sha=` has NO default: the bundle this wave opened against was
//       destroyed at 15:26:18 (SUBSTRATE-PIN §3), and a default here would be a
//       figure inherited from an artifact nobody can re-hash.
//
// The roster below is duplicated VERBATIM from capture.mjs because §Bounds makes
// these two files the only writable harness surface — there is nowhere lawful to
// put a shared module beside them. Divergence is made DETECTABLE rather than
// trusted: both files hash their own CELLS literal and compare to ROSTER_DIGEST.
// Roster of record: docs/tranches/X/keyframes/evidence/W9/CELL-ROSTER.md.
// ─────────────────────────────────────────────────────────────────────────────
import { webkit, chromium, devices } from "playwright";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const ENGINE = process.env.ENGINE === "chromium" ? "chromium" : "webkit";
const engineFor = { webkit, chromium }[ENGINE];
const HERE = import.meta.dirname;
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const ORIGIN = arg("origin", "http://localhost:9000");
const ROUTES = ["#/", "#/gradient", "#/browse", "#/blob", "#/admin/users"];

// ---- I-20 CELL ROSTER (G-KFW9-2; KF-W9.md §Surface-list protocol 4) ---------
// VERBATIM from capture.mjs. `driver` is what must actually be driving for a row
// to wear the label; `column` is the evidence column a verdict lands in. A
// verdict may NEVER cross columns, and a chromium emulation labelled as WHC is
// the I-20 failure by name (KF-W9.md §Sequencing S-13).
const CELLS = [
  { id: "safari-app/desktop", driver: "safaridriver", column: "safari-app" },
  { id: "safari-app/ios-device", driver: "safaridriver-ios", column: "safari-app" },
  { id: "safari-app/ios-simulator", driver: "safaridriver-simulator", column: "safari-app" },
  { id: "webkit-engine", driver: "playwright-webkit", column: "webkit-engine" },
  { id: "chromium", driver: "playwright-chromium", column: "chromium" },
  { id: "chromium/emulated-forced-colors", driver: "playwright-chromium", column: "chromium" },
  { id: "windows/real-HCM", driver: "windows-host", column: "windows" },
  { id: "at/voiceover-safari", driver: "voiceover+safaridriver", column: "at" },
  { id: "at/nvda", driver: "windows-host", column: "at" },
  { id: "at/jaws", driver: "windows-host", column: "at" },
];
const ROSTER_DIGEST = "255695bc616c2a1420639ccf56848bdaf5df2c87618587c0c736fda4ef762035";

// The only three things an unrun cell may say. Silence is not one of them, and
// neither is green.
const UNRUN = ["UNMEASURED", "UNREACHABLE-IN-CELL", "UNVERIFIABLE-HERE"];

const DRIVER = ENGINE === "chromium" ? "playwright-chromium" : "playwright-webkit";

function assertCell(cellId, driver) {
  const c = CELLS.find((x) => x.id === cellId);
  if (!c) throw new Error(`I-20: '${cellId}' is not in the ten-cell roster`);
  if (c.driver !== driver)
    throw new Error(
      `I-20 VIOLATION: cell '${cellId}' requires driver '${c.driver}' but this run drives '${driver}'. ` +
        `A ${c.column} verdict produced by ${driver} is a gate FAILURE, not a shortcut.`,
    );
  return c;
}

function rosterGuard() {
  const d = createHash("sha256").update(JSON.stringify(CELLS)).digest("hex");
  if (d !== ROSTER_DIGEST)
    throw new Error(
      `CELL ROSTER DRIFT: computed ${d}, expected ${ROSTER_DIGEST}. capture.mjs and states.mjs ` +
        `carry the roster verbatim; one has been edited without the other. Re-sync both and ` +
        `re-publish evidence/W9/CELL-ROSTER.md — a silent roster edit is the I-20 failure re-armed.`,
    );
  return d;
}

// ---- SUBSTRATE (G-KFW9-14) --------------------------------------------------
const SUBSTRATE = {
  repo: "keyframes.js",
  ref: arg("substrate-ref", "master == origin/master"),
  sha: arg("substrate-sha", "55e9bf0d2391bbc6d9871bb3f0555a6225daae92"),
  bundleSha256: arg("bundle-sha", null),
};
if (!SUBSTRATE.bundleSha256)
  throw new Error(
    "G-KFW9-14: --bundle-sha= is REQUIRED. Every capture must name the bytes it photographed.",
  );

// ---- PER-SHOT sha256 (G-KFW9-2) --------------------------------------------
function shotDigest(path) {
  const d = createHash("sha256").update(readFileSync(path)).digest("hex");
  writeFileSync(`${path}.sha256`, `${d}  ${path.split("/").pop()}\n`);
  return d;
}

const rosterDigest = rosterGuard();

// The state matrices below are EMULATIONS driven by playwright. `forced-colors:
// active` here is `chromium/emulated-forced-colors` or a webkit-engine reading —
// it is NOT `windows/real-HCM`, and labelling it so is the I-20 failure by name.
const CELL_FOR_RUN = ENGINE === "chromium" ? "chromium" : "webkit-engine";

// Every row carries its CELL. `forced-colors-desktop` is the one that must never
// be relabelled: under ENGINE=chromium it is `chromium/emulated-forced-colors`,
// and an emulation written into a `windows/real-HCM` column is the I-20 failure
// S-13 names as a mandatory triumvirate trigger.
const MATRIX = [
  { id: "zoom-200-desktop", cell: CELL_FOR_RUN, ctx: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 },
    note: "200% zoom simulated as half-viewport at 2x DPR — WCAG 1.4.4 reflow" },
  { id: "reduced-motion-desktop", cell: CELL_FOR_RUN, ctx: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" } },
  { id: "forced-colors-desktop",
    cell: ENGINE === "chromium" ? "chromium/emulated-forced-colors" : "webkit-engine",
    ctx: { viewport: { width: 1440, height: 900 }, forcedColors: "active" },
    note: "EMULATED. NOT windows/real-HCM — that cell needs a Windows host and reads UNREACHABLE-IN-CELL here" },
  { id: "rtl-desktop", cell: CELL_FOR_RUN, ctx: { viewport: { width: 1440, height: 900 } }, rtl: true },
  { id: "rtl-mobile", cell: CELL_FOR_RUN, ctx: { ...devices["iPhone 14"] }, rtl: true },
  { id: "keyboard-focus-desktop", cell: CELL_FOR_RUN, ctx: { viewport: { width: 1440, height: 900 } }, tab: 12 },
];

// OP-4: the three `.media` strings, evaluated IN the cell, recorded per cell,
// never inherited from another cell.
const capabilityProbe = () =>
  JSON.stringify({
    forcedColors: matchMedia("(forced-colors: active)").media,
    reducedTransparency: matchMedia("(prefers-reduced-transparency: reduce)").media,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").media,
    userAgent: navigator.userAgent,
    devicePixelRatio: devicePixelRatio,
  });
const capabilityByCell = {};

const rows = [];
const browser = await engineFor.launch();
for (const m of MATRIX) {
  // I-20: throws before a pixel is written if this row's cell and this run's
  // driver disagree.
  const cell = assertCell(m.cell, DRIVER);
  const dir = resolve(HERE, "shots", m.id);
  mkdirSync(dir, { recursive: true });
  const context = await browser.newContext(m.ctx);
  if (!capabilityByCell[cell.id]) {
    const capPage = await context.newPage();
    try {
      capabilityByCell[cell.id] = JSON.parse(await capPage.evaluate(capabilityProbe));
    } catch (e) {
      capabilityByCell[cell.id] = { error: String(e).slice(0, 200) };
    }
    await capPage.close();
  }
  for (const r of ROUTES) {
    const name = r.replace(/[#/]/g, "") || "picker";
    const page = await context.newPage();
    const errs = []; page.on("pageerror", e => errs.push(String(e).slice(0, 160)));
    // rAF is where the motion actually is; getAnimations() is structurally blind to it (MT-F022).
    // `window` exists at init-script time even though `document.documentElement` does not.
    await page.addInitScript(() => {
      window.__raf = 0;
      const orig = requestAnimationFrame;
      window.requestAnimationFrame = function (cb) { window.__raf++; return orig.call(window, cb); };
    });
    await page.goto(ORIGIN + "/" + r, { waitUntil: "networkidle", timeout: 45000 }).catch(e => errs.push("nav:" + String(e).slice(0,80)));
    await page.waitForTimeout(2200);
    // MT-F022 #1: documentElement is null at addInitScript time in WebKit, so the flip is post-load.
    if (m.rtl) { await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl")); await page.waitForTimeout(1200); }
    // Sample rAF across a quiet window: a renderer that has stopped is the reduced-motion assertion.
    const rafA = await page.evaluate(() => window.__raf ?? -1);
    await page.waitForTimeout(1500);
    const rafRate = (await page.evaluate(() => window.__raf ?? -1)) - rafA;
    if (m.tab) for (let i = 0; i < m.tab; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(90); }
    const probe = await page.evaluate(() => {
      const de = document.documentElement;
      const ae = document.activeElement;
      const vis = (el) => { const b = el.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
      const cs = ae && ae !== document.body ? getComputedStyle(ae) : null;
      return {
        overflowX: de.scrollWidth - de.clientWidth,
        overflowY: de.scrollHeight - de.clientHeight,
        dir: de.getAttribute("dir"),
        textLen: (document.body.innerText || "").trim().length,
        focused: ae ? `${ae.tagName.toLowerCase()}[${(ae.getAttribute("aria-label") || ae.textContent || "").trim().slice(0,28)}]` : null,
        focusRingVisible: cs ? (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none" : null,
        clipped: [...document.querySelectorAll("body *")].filter(vis)
          .filter(el => { const b = el.getBoundingClientRect(); return b.right > de.clientWidth + 1 || b.left < -1; })
          .slice(0, 8).map(el => `${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0,2).join(".")}`),
        animatedCount: document.getAnimations ? document.getAnimations().length : -1,
      };
    }).catch(e => ({ err: String(e).slice(0, 120) }));
    const shot = resolve(dir, `${name}.png`);
    let shotSha256 = null;
    await page.screenshot({ path: shot, fullPage: true, animations: "disabled" })
      .then(() => { shotSha256 = shotDigest(shot); })  // G-KFW9-2: green without a digest FAILS
      .catch(()=>{});
    rows.push({
      matrix: m.id,
      cell: cell.id,
      column: cell.column,
      driver: DRIVER,
      substrateRef: SUBSTRATE.ref,
      substrateSha: SUBSTRATE.sha,
      bundleSha256: SUBSTRATE.bundleSha256,
      shot: shot.replace(resolve(HERE, "../../../../../.."), "").replace(/^\//, ""),
      shotSha256,
      verdict: shotSha256 ? undefined : "UNMEASURED",
      route: r, engine: ENGINE, ...probe, rafPer1500ms: rafRate, pageErrors: errs,
    });
    console.log(`${m.id.padEnd(24)} ${r.padEnd(14)} overflowX=${String(probe.overflowX).padStart(5)} dir=${probe.dir} text=${probe.textLen} clipped=${(probe.clipped||[]).length} anims=${probe.animatedCount} raf/1.5s=${String(rafRate).padStart(4)} focus=${probe.focused ?? "-"} ring=${probe.focusRingVisible ?? "-"} err=${errs.length}`);
    await page.close();
  }
  await context.close();
}
await browser.close();

// CELL LEDGER (I-20). Every one of the ten cells appears, every run, with its
// state — never absent, because an absent cell is how a webkit reading ends up
// in a safari column by default.
const cellsRun = new Set(rows.map((r) => r.cell));
const cellLedger = CELLS.map((c) => ({
  cell: c.id,
  column: c.column,
  driver: c.driver,
  state: cellsRun.has(c.id) ? "MEASURED" : c.driver === DRIVER ? "UNMEASURED" : "UNVERIFIABLE-HERE",
  reason: cellsRun.has(c.id)
    ? `${rows.filter((r) => r.cell === c.id).length} captures`
    : `this apparatus drives '${DRIVER}'; cell '${c.id}' requires '${c.driver}'`,
  capability: capabilityByCell[c.id] ?? null,
}));

const shotsWithoutSha = rows.filter((r) => r.shot && !r.shotSha256).map((r) => `${r.cell} ${r.route}`);

writeFileSync(
  resolve(HERE, "STATES.json"),
  JSON.stringify(
    {
      summary: {
        wave: "X.KF.W9",
        origin: ORIGIN,
        engine: ENGINE,
        driver: DRIVER,
        substrate: SUBSTRATE,
        rosterDigest,
        cellRoster: CELLS.map((c) => c.id),
        unrunCellVocabulary: UNRUN,
        cellLedger,
        shaCoverage: shotsWithoutSha.length
          ? { PASS: false, shotsWithoutSha }
          : { PASS: true, shots: rows.filter((r) => r.shotSha256).length },
        captures: rows.length,
      },
      rows,
    },
    null,
    1,
  ),
);
