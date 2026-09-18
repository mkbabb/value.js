// Mega-tranche visual-audit harness — Safari (WebKit) desktop + mobile, light + dark,
// every route, with per-page defect telemetry.
//
// Read-only against the running dev server. Writes ONLY under
// docs/tranches/V/megatranche/audit/visual/.
//
//   node docs/tranches/V/megatranche/audit/visual/capture.mjs [--origin=http://localhost:9000]
//
// Produces: shots/<matrix>/<route>.png (+ .sha256 sidecar) and REPORT.json + REPORT.md
//
// ─────────────────────────────────────────────────────────────────────────────
// X.KF.W9 `.a` CARVE — 2026-09-17. Three things this harness could not express
// before, each of which is a convicted failure rather than a nicety:
//
//   (1) I-20 CELL LABELS. webkit-engine and safari-app are SEPARATE evidence
//       cells and the law has fired TWICE on inverted verdicts. Before this
//       carve `grep -c 'safari-app|webkit-engine|ios-device|ios-simulator'`
//       returned 0 here: the harness literally could not say which cell a row
//       belonged to, so every row it emitted was ambiguous between an engine
//       and an app. Every row now carries `cell` from the ten-cell roster, and
//       assertCell() THROWS rather than let a playwright row wear a safari-app
//       label.
//   (2) PER-SHOT sha256. "Green without per-shot sha256 FAILS" (G-KFW9-2). A
//       screenshot with no digest cannot be proved to be the bytes anyone
//       looked at. Every shot now gets a digest in the row AND a `.sha256`
//       sidecar beside the PNG.
//   (3) SUBSTRATE STAMP + a REAL DENOMINATOR. A capture that does not name the
//       ref, sha and bundle it photographed is not evidence (G-KFW9-14); and a
//       coverage fraction quoted against anything but the published ≈590-probe
//       surface list fails G-KFW9-3 (B18-26 rejected the 73,568 Kronecker
//       denominator outright). Both are now loaded, not typed in.
//
// The roster is duplicated verbatim in `states.mjs` because §Bounds makes these
// two files the only writable harness surface — there is nowhere lawful to put
// a shared module beside them. Divergence is therefore made DETECTABLE rather
// than trusted: each file hashes its own CELLS literal at runtime and compares
// it to ROSTER_DIGEST below. Edit one file's roster without the other and the
// run aborts. The published roster of record is
// docs/tranches/X/keyframes/evidence/W9/CELL-ROSTER.md.
// ─────────────────────────────────────────────────────────────────────────────
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const ORIGIN = arg("origin", "http://localhost:9000");

// ---- I-20 CELL ROSTER (G-KFW9-2; KF-W9.md §Surface-list protocol 4) ---------
// TEN cells. `driver` is what must actually be driving for a row to wear the
// label; `column` is the evidence column a verdict lands in. A verdict may
// NEVER cross columns: a webkit-engine reading copied into a safari-app column
// is a gate FAILURE, not a shortcut, and a chromium emulation labelled as WHC
// is the I-20 failure by name (KF-W9.md §Sequencing S-13).
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
// sha256 of JSON.stringify(CELLS) — the cross-file sync guard described above.
const ROSTER_DIGEST = "255695bc616c2a1420639ccf56848bdaf5df2c87618587c0c736fda4ef762035";

// The only three things an unrun cell may say. Silence is not one of them, and
// neither is green.
const UNRUN = ["UNMEASURED", "UNREACHABLE-IN-CELL", "UNVERIFIABLE-HERE"];

// This harness drives playwright. It may therefore only emit rows in the
// webkit-engine and chromium columns. Everything else is UNMEASURED here and
// belongs to another seat's apparatus (safari-app → workflows/safari-real-matrix.js).
const DRIVER = "playwright-webkit";

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
// Pinned at evidence/W9/SUBSTRATE-PIN.md, 2026-09-17, by command. Overridable
// only on the command line, so a run against another substrate is DECLARED.
//
// `bundleSha256` HAS NO DEFAULT, deliberately. The gh-pages bundle this wave
// opened against was destroyed at 15:26:18 by npm's `prepare` -> `build:lib`
// self-emptying `dist/` (SUBSTRATE-PIN §3), so the hash that once sat here
// describes bytes nobody can re-hash. A default would be a figure inherited
// from a dead artifact, which is the exact class G-KFW9-14 exists to stop.
// Pass --bundle-sha=<digest of the bundle you actually served>.
const SUBSTRATE = {
  repo: "keyframes.js",
  ref: arg("substrate-ref", "master == origin/master"),
  sha: arg("substrate-sha", "55e9bf0d2391bbc6d9871bb3f0555a6225daae92"),
  bundleSha256: arg("bundle-sha", null),
};

function assertSubstrate() {
  if (!SUBSTRATE.bundleSha256)
    throw new Error(
      "G-KFW9-14: --bundle-sha= is REQUIRED. Every capture must name the bytes it photographed. " +
        "Hash the served bundle (`find dist/gh-pages -type f | LC_ALL=C sort | xargs shasum -a 256 | shasum -a 256`) " +
        "and pass it. A capture that cannot name its bundle is not evidence.",
    );
}

// ---- THE SURFACE LIST (G-KFW9-3/-4) ----------------------------------------
// B18-26 ADJUDICATED: inherit the NUMERATOR, REJECT the DENOMINATOR. The
// denominator is the published 590-probe list and nothing else. If the list is
// absent the harness reports NO fraction at all — quoting one before the list
// is published is G-KFW9-3's explicit fail condition.
const EVIDENCE = resolve(HERE, "../../../../X/keyframes/evidence/W9");
const SURFACE_LIST_PATH = resolve(EVIDENCE, "SURFACE-LIST.json");
const NEGATIVE_REGISTER_PATH = resolve(EVIDENCE, "NEGATIVE-REGISTER.json");

function loadSurfaceList() {
  if (!existsSync(SURFACE_LIST_PATH))
    return { present: false, note: "NO SCOPED SURFACE LIST ON DISK — no fraction may be quoted (G-KFW9-3)" };
  const l = JSON.parse(readFileSync(SURFACE_LIST_PATH, "utf8"));
  return {
    present: true,
    total: l.denominator.total,
    enumerated: l.denominator.enumerated,
    proseCarried: l.denominator.proseCarried,
    records: l.denominator.records,
    probeRows: l.probes.length,
    rejectedDenominator: l.rejectedDenominator.figure,
  };
}

// ---- THE NEGATIVE REGISTER (G-KFW9-12) -------------------------------------
// 6 records · 11 probes · 4 traps. Two rules, both mechanized because both have
// already been broken once in this corpus:
//   (a) a RETIRED probe re-entering the surface list is a GATE FAILURE, not a
//       duplicate — the budget was already spent settling it statically;
//   (b) a probe may not reach EXECUTED without BOTH a discriminator and a
//       falsifier. A probe satisfied by both hypotheses is a SPEC DEFECT, not a
//       measurement (kf-ChromeDock D-19: "a Curve-labelled node proves NOTHING").
function loadNegativeRegister() {
  if (!existsSync(NEGATIVE_REGISTER_PATH)) return null;
  return JSON.parse(readFileSync(NEGATIVE_REGISTER_PATH, "utf8"));
}
const NEGATIVE = loadNegativeRegister();

function assertNotRetired(probeId, record) {
  if (!NEGATIVE) return;
  const hit = NEGATIVE.retired.find(
    (n) => n.record === record && (probeId?.includes(n.id) || n.probe === probeId),
  );
  if (hit)
    throw new Error(
      `NEGATIVE-REGISTER VIOLATION: '${probeId}' (${record}) is ${hit.disposition} — ${hit.ground}. ` +
        `A retired probe re-entering the surface list is a GATE FAILURE (G-KFW9-12), not a duplicate.`,
    );
}

function assertProbeTerminal(probe) {
  if (probe.state !== "EXECUTED") return probe;
  assertNotRetired(probe.id, probe.record);
  for (const f of ["capture", "sha256", "substrateSha", "cell", "discriminator", "falsifier"]) {
    if (!probe[f])
      throw new Error(
        `G-KFW9-12: probe '${probe.id}' cannot be EXECUTED without '${f}'. ` +
          (f === "discriminator" || f === "falsifier"
            ? "A probe satisfied by both hypotheses is a spec defect, not a measurement."
            : "A capture that cannot be proved to be the bytes anyone looked at is not evidence."),
      );
  }
  return probe;
}

// ---- PER-SHOT sha256 (G-KFW9-2) --------------------------------------------
// The digest goes in the row AND in a sidecar beside the PNG, so the proof
// survives the JSON being regenerated.
function shotDigest(path) {
  const d = createHash("sha256").update(readFileSync(path)).digest("hex");
  writeFileSync(`${path}.sha256`, `${d}  ${path.split("/").pop()}\n`);
  return d;
}

// ---- OP-4 capability record (per cell, asserted not assumed) ----------------
const capabilityProbe = () =>
  JSON.stringify({
    forcedColors: matchMedia("(forced-colors: active)").media,
    reducedTransparency: matchMedia("(prefers-reduced-transparency: reduce)").media,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").media,
    userAgent: navigator.userAgent,
    devicePixelRatio: devicePixelRatio,
  });

// THE DEMO IS A HASH-ROUTER APP (`createWebHashHistory`, demo/color-picker/router/index.ts).
// Canonical deep links are `/#/<route>`. Navigating the bare path renders the DEFAULT view
// with the path intact — which silently captures the same pane N times. That error was made
// once here; it must never be made again, so the hash is baked into the route table.
const ROUTES = [
  { path: "/#/", name: "picker" },
  { path: "/#/palettes", name: "palettes" },
  { path: "/#/browse", name: "browse" },
  { path: "/#/extract", name: "extract" },
  { path: "/#/mix", name: "mix" },
  { path: "/#/generate", name: "generate" },
  { path: "/#/gradient", name: "gradient" },
  { path: "/#/atmosphere", name: "atmosphere" },
  { path: "/#/blob", name: "blob" },
  { path: "/#/admin/users", name: "admin-users" },
  { path: "/#/admin/names", name: "admin-names" },
  { path: "/#/admin/audit", name: "admin-audit" },
  { path: "/#/admin/flagged", name: "admin-flagged" },
  { path: "/#/admin/tags", name: "admin-tags" },
  { path: "/#/does-not-exist", name: "notfound-redirect" },
];

// MATRIX ids were authored `safari-*` before the I-20 carve. They are WEBKIT-ENGINE
// rows — playwright's WebKit, not Safari.app — and the `cell` field is now the
// load-bearing label. The ids are left alone (the prior corpus under shots/ is
// keyed by them and renaming would orphan dated evidence); the cell is what any
// reader must key on, and assertCell() enforces it.
const MATRIX = [
  {
    id: "safari-desktop-light",
    cell: "webkit-engine",
    engine: "webkit",
    colorScheme: "light",
    ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  },
  {
    id: "safari-desktop-dark",
    cell: "webkit-engine",
    engine: "webkit",
    colorScheme: "dark",
    ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  },
  {
    id: "safari-mobile-light",
    cell: "webkit-engine",
    engine: "webkit",
    colorScheme: "light",
    ctx: { ...devices["iPhone 14"] },
  },
  {
    id: "safari-mobile-dark",
    cell: "webkit-engine",
    engine: "webkit",
    colorScheme: "dark",
    ctx: { ...devices["iPhone 14"] },
  },
];

// The demo drives dark via a `dark` class on <html> (useGlobalDark). Force BOTH
// the media preference and the class so the capture cannot be a false light shot.
const initScript = (scheme) => `
  try {
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
    const de = document.documentElement;
    if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark');
    else de.classList.remove('dark');
  } catch (e) {}
`;

async function probe(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const overflowX = de.scrollWidth - de.clientWidth;
    const sel = (s) => document.querySelectorAll(s).length;
    const vis = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    // tap-target audit: interactive elements smaller than 24x24 CSS px
    const interactive = [
      ...document.querySelectorAll(
        'a,button,input,select,textarea,[role="button"],[role="link"],[role="tab"],[role="switch"],[role="slider"],[tabindex]:not([tabindex="-1"])',
      ),
    ].filter(vis);
    const small = interactive
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), tag: el.tagName.toLowerCase(), label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40) };
      })
      .filter((m) => m.w < 24 || m.h < 24);
    // images without alt
    const imgNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
    // buttons with no accessible name
    const namelessButtons = [...document.querySelectorAll('button,[role="button"]')]
      .filter(vis)
      .filter((b) => !(b.getAttribute("aria-label") || b.getAttribute("aria-labelledby") || b.textContent.trim()))
      .length;
    // elements overflowing the viewport horizontally
    const bleeding = [...document.querySelectorAll("body *")]
      .filter(vis)
      .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1)
      .slice(0, 12)
      .map((el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(/\s+/).slice(0, 2).join(".") : ""}`);
    return {
      title: document.title,
      url: location.href,
      overflowX,
      hasDarkClass: de.classList.contains("dark"),
      counts: {
        main: sel("main"),
        h1: sel("h1"),
        nav: sel("nav"),
        canvas: sel("canvas"),
        button: sel("button"),
        dialog: sel('[role="dialog"]'),
        allElements: sel("*"),
      },
      a11y: { smallTapTargets: small, imgNoAlt, namelessButtons },
      bleeding,
      bodyTextLength: (document.body.innerText || "").trim().length,
    };
  });
}

const rosterDigest = rosterGuard();
assertSubstrate();
const surfaceList = loadSurfaceList();
const capabilityByCell = {};
const results = [];
const browser = await webkit.launch();

for (const m of MATRIX) {
  // I-20: throws before a single pixel is written if this row's cell and this
  // run's driver disagree. Cheap, loud, and at the only place it can help.
  const cell = assertCell(m.cell, DRIVER);
  const dir = resolve(HERE, "shots", m.id);
  mkdirSync(dir, { recursive: true });
  const context = await browser.newContext({ ...m.ctx, colorScheme: m.colorScheme });
  await context.addInitScript(initScript(m.colorScheme));

  // OP-4: the three `.media` strings, evaluated IN the cell and recorded. A
  // query the UA cannot parse serializes as `not all`; that — and only that —
  // is what makes a row UNREACHABLE-IN-CELL by capability rather than omission.
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
    const page = await context.newPage();
    const consoleErrors = [];
    const consoleWarnings = [];
    const pageErrors = [];
    const failedRequests = [];
    page.on("console", (msg) => {
      const t = msg.type();
      if (t === "error") consoleErrors.push(msg.text().slice(0, 300));
      else if (t === "warning") consoleWarnings.push(msg.text().slice(0, 300));
    });
    page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
    page.on("requestfailed", (req) =>
      failedRequests.push(`${req.method()} ${req.url().slice(0, 160)} :: ${req.failure()?.errorText}`),
    );

    // Every row names its cell, its column and the exact bytes it photographed.
    // A row missing any of these is not evidence (G-KFW9-2 / G-KFW9-14).
    const row = {
      matrix: m.id,
      cell: cell.id,
      column: cell.column,
      driver: DRIVER,
      substrateRef: SUBSTRATE.ref,
      substrateSha: SUBSTRATE.sha,
      bundleSha256: SUBSTRATE.bundleSha256,
      route: r.path,
      name: r.name,
    };
    const t0 = Date.now();
    try {
      await page.goto(ORIGIN + r.path, { waitUntil: "networkidle", timeout: 30000 });
    } catch (e) {
      row.navError = String(e).slice(0, 200);
      try {
        await page.goto(ORIGIN + r.path, { waitUntil: "domcontentloaded", timeout: 20000 });
      } catch (e2) {
        row.navFatal = String(e2).slice(0, 200);
      }
    }
    // Give WebGL / lazy panes a settle window; the boot is known-slow.
    await page.waitForTimeout(2500);
    row.settleMs = Date.now() - t0;

    try {
      row.probe = await probe(page);
    } catch (e) {
      row.probeError = String(e).slice(0, 200);
    }

    const shot = resolve(dir, `${r.name}.png`);
    try {
      await page.screenshot({ path: shot, fullPage: true, animations: "disabled" });
      row.shot = shot.replace(resolve(HERE, "../../../../../.."), "").replace(/^\//, "");
      // G-KFW9-2: green without a per-shot sha256 FAILS. Digest in the row and
      // in a sidecar, so the proof outlives any regeneration of REPORT.json.
      row.shotSha256 = shotDigest(shot);
    } catch (e) {
      row.shotError = String(e).slice(0, 200);
    }
    if (!row.shotSha256) row.verdict = "UNMEASURED";

    row.consoleErrors = consoleErrors;
    row.consoleWarnings = consoleWarnings.slice(0, 20);
    row.pageErrors = pageErrors;
    row.failedRequests = failedRequests.slice(0, 20);
    results.push(row);
    await page.close();
    process.stderr.write(
      `${m.id} ${r.path} -> errs=${pageErrors.length}/${consoleErrors.length} overflowX=${row.probe?.overflowX ?? "?"} text=${row.probe?.bodyTextLength ?? "?"}\n`,
    );
  }
  await context.close();
}
await browser.close();

// ---- Report -----------------------------------------------------------------
const blank = results.filter((r) => (r.probe?.bodyTextLength ?? 0) < 40);
const withPageErrors = results.filter((r) => (r.pageErrors || []).length > 0);
const withConsoleErrors = results.filter((r) => (r.consoleErrors || []).length > 0);
const overflowing = results.filter((r) => (r.probe?.overflowX ?? 0) > 0);
const darkMissing = results.filter((r) => r.matrix.endsWith("dark") && r.probe && !r.probe.hasDarkClass);
const multiMain = results.filter((r) => (r.probe?.counts?.main ?? 1) !== 1);
const tapTargets = results.filter((r) => (r.probe?.a11y?.smallTapTargets || []).length > 0);
const nameless = results.filter((r) => (r.probe?.a11y?.namelessButtons ?? 0) > 0);

// SAMENESS GUARD — if routes inside one matrix render identical content, the harness is
// navigating wrong (this exact failure happened once with path URLs against a hash router).
// A visual audit that captures the same pane N times is worse than no audit: it reads green.
const sameness = [];
for (const m of MATRIX) {
  const rows = results.filter((r) => r.matrix === m.id);
  const buckets = new Map();
  for (const r of rows) {
    const key = `${r.probe?.bodyTextLength ?? "?"}|${(r.probe?.counts?.allElements ?? "?")}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(r.name);
  }
  for (const [key, names] of buckets) {
    if (names.length > 2) sameness.push(`${m.id}: ${names.length} routes share content signature ${key} -> ${names.join(", ")}`);
  }
}

// CELL LEDGER (I-20). Every one of the ten cells appears, every run, with its
// state. A cell this apparatus cannot drive is UNMEASURED *here* — it is never
// absent, because an absent cell is how a webkit reading ends up in a safari
// column by default.
const cellsRun = new Set(results.map((r) => r.cell));
const cellLedger = CELLS.map((c) => ({
  cell: c.id,
  column: c.column,
  driver: c.driver,
  state: cellsRun.has(c.id)
    ? "MEASURED"
    : c.driver === DRIVER
      ? "UNMEASURED"
      : "UNVERIFIABLE-HERE",
  reason: cellsRun.has(c.id)
    ? `${results.filter((r) => r.cell === c.id).length} captures`
    : `this apparatus drives '${DRIVER}'; cell '${c.id}' requires '${c.driver}'`,
  capability: capabilityByCell[c.id] ?? null,
}));

// SHA COVERAGE. A capture with no digest is not a capture (G-KFW9-2).
const shotsWithoutSha = results.filter((r) => r.shot && !r.shotSha256).map((r) => `${r.cell} ${r.route}`);

// PROBE-STATE AUDIT (G-KFW9-12 / -4). Every probe row in the published surface
// list is re-validated on every run, so a row a later seat marks EXECUTED
// without its discriminator, falsifier or digest fails HERE — at the next
// capture — instead of at the close, where the budget is already gone.
let probeAudit = { present: false };
if (existsSync(SURFACE_LIST_PATH)) {
  const list = JSON.parse(readFileSync(SURFACE_LIST_PATH, "utf8"));
  const tally = { EXECUTED: 0, RETIRED: 0, "UNREACHABLE-IN-CELL": 0, UNMEASURED: 0, other: 0 };
  for (const p of list.probes) {
    assertProbeTerminal(p); // throws on a malformed terminal state
    if (p.state in tally) tally[p.state]++;
    else tally.other++;
  }
  probeAudit = { present: true, denominator: list.denominator.total, tally };
}

const summary = {
  origin: ORIGIN,
  wave: "X.KF.W9",
  substrate: SUBSTRATE,
  rosterDigest,
  cellRoster: CELLS.map((c) => c.id),
  unrunCellVocabulary: UNRUN,
  cellLedger,
  surfaceList,
  probeAudit,
  negativeRegister: NEGATIVE
    ? { present: true, ...NEGATIVE.figures }
    : { present: false, note: "NEGATIVE-REGISTER.json absent — retired-probe re-entry cannot be enforced (G-KFW9-12)" },
  shaCoverage: shotsWithoutSha.length
    ? { PASS: false, shotsWithoutSha }
    : { PASS: true, shots: results.filter((r) => r.shotSha256).length },
  samenessGuard: sameness.length ? sameness : "PASS — routes render distinct content",
  matrixCount: MATRIX.length,
  routeCount: ROUTES.length,
  captures: results.length,
  defects: {
    blankOrNearBlank: blank.map((r) => `${r.matrix} ${r.route} (text=${r.probe?.bodyTextLength})`),
    pageErrors: withPageErrors.map((r) => `${r.matrix} ${r.route}: ${r.pageErrors[0]}`),
    consoleErrors: withConsoleErrors.map((r) => `${r.matrix} ${r.route}: ${r.consoleErrors[0]}`),
    horizontalOverflow: overflowing.map((r) => `${r.matrix} ${r.route}: +${r.probe.overflowX}px [${(r.probe.bleeding || []).join(", ")}]`),
    darkClassMissing: darkMissing.map((r) => `${r.matrix} ${r.route}`),
    mainCountNotOne: multiMain.map((r) => `${r.matrix} ${r.route}: main=${r.probe?.counts?.main}`),
    smallTapTargets: tapTargets.map((r) => `${r.matrix} ${r.route}: ${r.probe.a11y.smallTapTargets.length}`),
    namelessButtons: nameless.map((r) => `${r.matrix} ${r.route}: ${r.probe.a11y.namelessButtons}`),
  },
};

writeFileSync(resolve(HERE, "REPORT.json"), JSON.stringify({ summary, results }, null, 1));

const md = [
  "# Mega-tranche visual audit — Safari (WebKit), desktop + mobile, light + dark",
  "",
  `Origin: \`${ORIGIN}\` · ${MATRIX.length} matrices × ${ROUTES.length} routes = **${results.length} captures**`,
  "",
  "## Defect summary",
  "",
  ...Object.entries(summary.defects).map(
    ([k, v]) => `### ${k} — ${v.length}\n\n${v.length ? v.map((s) => `- ${s}`).join("\n") : "_none_"}\n`,
  ),
  "## Per-capture table",
  "",
  "| matrix | route | text | overflowX | main | h1 | canvas | pageErr | consoleErr | settle ms |",
  "|---|---|---:|---:|---:|---:|---:|---:|---:|---:|",
  ...results.map(
    (r) =>
      `| ${r.matrix} | \`${r.route}\` | ${r.probe?.bodyTextLength ?? "?"} | ${r.probe?.overflowX ?? "?"} | ${r.probe?.counts?.main ?? "?"} | ${r.probe?.counts?.h1 ?? "?"} | ${r.probe?.counts?.canvas ?? "?"} | ${(r.pageErrors || []).length} | ${(r.consoleErrors || []).length} | ${r.settleMs} |`,
  ),
].join("\n");
writeFileSync(resolve(HERE, "REPORT.md"), md + "\n");

console.log(JSON.stringify(summary, null, 2));
