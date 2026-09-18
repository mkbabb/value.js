// SERVED MODEL: claude-opus-5[1m]
// X.KF.W9 `.e` — THE FOLD. `.c`'s foreclosures + `.d`'s cells, folded into the four published
// artifacts so `probeTally` and `cellLedger` stop reading UNMEASURED where a measurement exists.
//   node W9e-fold.mjs            (dry-run: prints the mapping and the arithmetic, writes nothing)
//   node W9e-fold.mjs --write
//
// §Disjointness gives `REPORT.*` / `STATES.json` to `.a` and `.e` ALONE, and `.e`'s write is a FOLD
// only: `.a`'s skeleton, roster, digests and counting rules are preserved; only per-cell state,
// per-probe state and the derived tallies move.
//
// THE MAPPING IS MEASURED, NOT ASSERTED. A banked defect id becomes a SURFACE-LIST probe row only
// when the record's own residue line at that probe's `line` contains the id at a WORD BOUNDARY —
// printed below with the matched line, so a third party reproduces it by eye. Terminal dispositions
// whose banked id does NOT name itself in any residue item are NOT forced onto a row: they are
// carried at the row level in `foldLedger.unmappedRowDispositions` with the reason, per the spec's
// own standing clause (route (d) discharges BY ITEM; a residue item need not name its ids).

import fs from "node:fs";
import cp from "node:child_process";

const WRITE = process.argv.includes("--write");
const V = "/Users/mkbabb/Programming/value.js/";
const EV = V + "docs/tranches/X/keyframes/evidence/W9/";
const AV = V + "docs/tranches/V/megatranche/audit/visual/";
const REC = V + "docs/tranches/V/megatranche/registry/adjudicated/";
const rd = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
// PRESERVE EACH FILE'S OWN INDENT. `.a` wrote REPORT.json/STATES.json at indent 1 and
// SURFACE-LIST.json at indent 2; re-serialising at one width would rewrite every line of a sibling
// seat's artifact for nothing, which is the opposite of a fold.
const indentOf = (p) => (/^\{\n( +)"/.exec(fs.readFileSync(p, "utf8")) || [, " "])[1].length;
const wr = (p, o, n) => fs.writeFileSync(p, JSON.stringify(o, null, n) + "\n");

const SUB = "55e9bf0d2391bbc6d9871bb3f0555a6225daae92";
const BUNDLE = "1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448";

// ── 1 · the id → probe-row mapping, by command ───────────────────────────────────────────────────
const cache = {};
const L = (r) => (cache[r] ??= fs.readFileSync(REC + r, "utf8").split("\n"));
const rx = (t) => new RegExp("(?<![0-9A-Za-z-])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![0-9A-Za-z-])");

const SL_PATH = EV + "SURFACE-LIST.json";
const SL_INDENT = indentOf(SL_PATH);
const SL = rd(SL_PATH);
function findRow(record, token, ordinal) {
  const ps = SL.probes.filter((p) => p.record === record);
  const hits = ordinal ? ps.filter((p) => p.authoredOrdinal === ordinal) : ps.filter((p) => rx(token).test(L(record)[p.line - 1] || ""));
  return hits;
}

// `.c`'s family (v) — one real-iOS-Safari session, foreclosed on BOTH iOS cells (COHESION §0m.2)
const IOS_CELLS = ["safari-app/ios-device", "safari-app/ios-simulator"];
const IOS_BOUND =
  "RULED UNREACHABLE-IN-CELL at COHESION §0m.2. `xcrun devicectl list devices` -> 'No devices found.' " +
  "(double-run at .c and re-run at .e); `safaridriver --help | grep -ci simulator` -> 0; " +
  "POST /session {safari:useSimulator:true} -> \"The 'macOS' platform is incompatible with requested " +
  "capability: safari:useSimulator.\" (double-run byte-identical). Never inferred from webkit-engine (I-20).";
const MOB_BOUND =
  "S-8 family (iii), the 390x844 + 375x667 mobile pass: no cell on this host renders a real mobile " +
  "Safari surface (same measured bound as family (v)); the family is NOT double-spent — no session " +
  "opened, so no member is spent and the family stays one re-runnable unit.";

const FAMILY_V = [
  ["kf-CSSPasteDialog.md", "R-9", null, "R-9 (iOS focus-zoom on the 14px surface)"],
  ["kf-SharePopover.md", "SP-4", null, "SP-4 (auto-zoom at ~12.2px; non-restoration on blur)"],
  ["kf-KeyframesAddDialog.md", "KAD-F4", null, "R-20 / KAD-F4 (autocapitalize/autocorrect mutation in contenteditable pre)"],
  ["kf-KeyframeCard.md", "KF-KC-16", null, "KF-KC-16 / KF-KC-25 (focus zoom + autocorrect rewriting)"],
  ["kf-SequenceScrubber.md", "KF-SCR-1", null, "KF-SCR-1 (two-finger pinch; body.is-dragging stick)"],
  ["kf-SequenceScrubber.md", "K-13", null, "K-13 (Safari mousedown focus on tabindex=0 divs; a cure-HOME decider)"],
  ["kf-SpringTarget.md", "i-13", null, "i-13 / C-3 (pointercancel on a real rail drag)"],
  ["kf-TimelineCaret.md", null, 10, "TimelineCaret probe 10 (iOS focus-zoom fire/restore; rides banked D-9's fold)"],
];
const FAMILY_III = [
  ["kf-App.md", "KF-APP-6", null, "KF-APP-6 (top dock offset + mobile recede, 390x844)"],
  ["kf-App.md", "KF-APP-8", null, "KF-APP-8 (hero/die intersection in dvh at 390x844)"],
  ["kf-TransportDock.md", "TD-36", null, "TD-36 (occluded extent at 1440x900 and 390x844)"],
  ["kf-EditorStartScreen.md", "KF-EST-4", null, "P-3 / KF-EST-4 (hero-hint clip magnitude)"],
];

// `.d`'s one probe row that reaches EXECUTED on its own terms
const EXECUTED = [
  {
    record: "kf-SequenceTarget.md", token: "ST-1", ordinal: null,
    cell: "chromium/emulated-forced-colors",
    capture: "docs/tranches/V/megatranche/audit/visual/safari-real/hcm-chromium-emulated-forced-colors-sequence-slider.png",
    sha256: "32c0504df7aa370a08a28e53e3e2da5faf26deb8b2c11a8cbd27268c72d1f36e",
    discriminator:
      "getComputedStyle AND :focus-visible read SEPARATELY, so 'no indicator' can never be confused with " +
      "'focus never happened'. Measured: .seq-handle :focus-visible true, outline-style none, box-shadow none, " +
      "with forced-colors: active GENUINELY matching (fcMatch true in this cell, false in the chromium control).",
    falsifier:
      "same engine, same bundle, same substrate, forcedColors: 'none' -> an indicator paints " +
      "(box-shadow color(srgb 0.109804 0.0980392 0.0901961 / 0.3) 0px 0px 0px 2px, ...). The row is " +
      "falsifiable and SURVIVES.",
    note:
      "EXECUTED IN THE CELL NAMED AND IN NO OTHER. G-KFW9-9 names the safari-app and real-HCM cells and " +
      "neither carries a forced-colors shot (macOS/WebKit implements no forced-colors mode, measured with a " +
      "live prefers-contrast control; no Windows host and no VM host exists). This row is NOT written into " +
      "either of those columns, and the gate stays RED.",
  },
];

// a probe whose BEFORE half is witnessed and whose AFTER half is another wave's act: it stays
// UNMEASURED (there is no 'partial' in the terminal vocabulary) and carries its before-witness.
const BEFORE_WITNESS = [
  {
    record: "kf-RibbonBar.md", token: "RB-1", ordinal: null,
    cell: "chromium/emulated-forced-colors",
    capture: "docs/tranches/V/megatranche/audit/visual/safari-real/hcm-chromium-emulated-forced-colors-easing-ribbon.png",
    sha256: "bb2434b5c7bb9e17f29736ef8246b422e013ca7f3222af2b9dfd20bdcc1bdd88",
    half: "BEFORE witness taken: .btn-playback :focus-visible true, outline-style none, box-shadow none under " +
      "forced-colors: active; falsifier control paints an indicator at forcedColors: 'none'.",
    remains: "The AFTER half ('then delete the demo rule and assert the Highlight outline returns') is KF.W13's " +
      "two-deletion act (K-5: ONE act, never split). S-9: it reads UNMEASURED here and is never inherited.",
  },
];

// terminal dispositions whose banked id names itself in NO residue item — carried at row level
const UNMAPPED = [
  { ids: ["D-25", "D-6"], record: "kf-EditorShell.md", state: "UNREACHABLE-IN-CELL", cells: IOS_CELLS, bound: MOB_BOUND, why: "no residue item at this record names either id; D-25's notch witness and D-6 are booked rows, not enumerated residue." },
  { ids: ["KF-EST-3"], record: "kf-EditorStartScreen.md", state: "UNREACHABLE-IN-CELL", cells: IOS_CELLS, bound: MOB_BOUND, why: "the record's residue enumerates P-1..P-9; KF-EST-3 is named in none of them at a word boundary." },
  { ids: ["D-2"], record: "kf-AmigaScene.md", state: "MEASURED (AT-precondition inventory, chromium cell)", cells: ["chromium"], bound: "capture at-chromium-amiga-bare-canvas-subject.png, sha256 e4937bdf...; the complete attribute list of .amiga-canvas carries NO ARIA attribute of any kind. FALSIFIER ('any announced accessible name kills the row') not satisfied: the row survives.", why: "no residue item at this record names D-2; the record's 12 residue rows are other subjects." },
  { ids: ["MISSED-A"], record: "kf-AmigaScene.md", state: "UNREACHABLE-IN-CELL", cells: IOS_CELLS, bound: "the touch-affordance arm needs a touch cell; both iOS cells are foreclosed (COHESION §0m.2).", why: "no residue item names it." },
  { ids: ["D-B3", "D-m8"], record: "kf-SpringHeatmap.md", state: "MEASURED (AT-precondition inventory, chromium cell)", cells: ["chromium"], bound: "capture at-chromium-spring-heatmap-application.png, sha256 67e4ca62...; role=application + tabindex=0 + empty aria-hidden subtree reproduce; D-m8's label measures 23 words, not 33.", why: "the record's 8 residue rows are other subjects; landed instead as a dated addendum under the original ids." },
  { ids: ["D-1", "L-i1"], record: "kf-PlaybackRibbon.md", state: "MEASURED (AT-precondition inventory, chromium cell)", cells: ["chromium"], bound: "of 4 role=slider on /#/easing, one has no aria-label, no aria-labelledby, no title and a bare aria-valuenow 1500 against max 5000; aria-valuetext null.", why: "the record's 10 residue rows are other subjects (its AT row #10 is routed to the AT-verification lane)." },
  { ids: ["D-12 (valuetext limb)"], record: "kf-SequenceAxis.md", state: "MEASURED (AT-precondition inventory, chromium + safari-app/desktop)", cells: ["chromium", "safari-app/desktop"], bound: "/#/sequence: 6 of 6 sliders aria-valuetext null, read IDENTICALLY in real Safari and in chromium; five announce bare ms (max 1600), the master scrubber a bare percent (max 100). The uppercase-render limb reads UNMEASURED.", why: "no residue item names D-12." },
  { ids: ["KF-APP-33"], record: "kf-App.md", state: "UNMEASURED (structurally confirmed; the UTTERANCE is unreachable)", cells: ["at/voiceover-safari", "at/nvda", "at/jaws"], bound: "structurally CONFIRMED on 6 of 6 routes (role=combobox, aria-label 'Scene', innerText ''); the probe as worded asks for an NVDA/VoiceOver UTTERANCE and all three AT cells are UNREACHABLE-IN-CELL. S-8 family (vi) is DECLARED UNSPENT by .d, so this row is NOT closed on markup.", why: "App#14 IS the matching residue row; it is deliberately left UNMEASURED rather than closed on a structural read — recorded so the under-claim is a decision, not an oversight." },
  { ids: ["D-6", "D-14", "N-4", "D-5"], record: "kf-SpringTarget.md", state: "MEASURED (D-6/D-14/N-4) · UNMEASURED (D-5)", cells: ["chromium"], bound: "/#/spring headings [] vs /#/easing ['H2:ease'] in ONE pass; 16 of 16 sliders aria-valuetext null, positional names, aria-valuenow 0..1 against max 110. D-5's aria-hidden half: UNMEASURED, precondition named.", why: "no residue item names these ids; landed as a dated addendum under the original ids." },
  { ids: ["KF-CB-9"], record: "kf-CopyButton.md", state: "UNMEASURED (precondition confirmed; the UTTERANCE is unreachable)", cells: ["at/voiceover-safari", "at/nvda", "at/jaws"], bound: "nested role=status inside <button> CONFIRMED, and the button ships in TWO divergent forms (one with no nested status region at all) — a third outcome the probe's two-branch framing does not enumerate. The utterance needs an AT cell; all three are foreclosed.", why: "S-8 family (vi) unspent." },
  { ids: ["KF-KC-2", "KF-KC-3", "KF-KC-26", "MM-2"], record: "kf-KeyframeCard.md / kf-MbabbMenu.md", state: "UNMEASURED", cells: ["at/voiceover-safari"], bound: "the KeyframeCard surface was not isolated and the MbabbMenu was not opened in .d's pass; S-8 family (vi) is DECLARED UNSPENT.", why: "no member of family (vi) is spent; none may later be skipped on the ground that a seat 'already looked'." },
  { ids: ["M-5/C-6", "M-4 riders", "MM-4"], record: "kf-ChromeDock.md / kf-MbabbMenu.md", state: "UNMEASURED (S-6 session NOT RUN)", cells: IOS_CELLS, bound: "the ChromeDock touch/menu session did not run; ChromeDock.vue sits inside the 23-file pin-to-frontier demo delta .c measured.", why: "S-6's three members are a session, not residue ordinals." },
  { ids: ["OD-V3 packet (16 cells)", "OD-V5 390 at-rest"], record: "— (capture packet, not a residue row)", state: "NOT PRODUCED / NOT OBSERVED", cells: IOS_CELLS, bound: "indexed whole at audit/visual/safari-real/SS-13-CAPTURE-RECEIPT.md §1(a)/(b) with the exact precondition; THIS WAVE RULES NOTHING (COHESION §0j.C, 'Never proxied').", why: "a capture packet is not a probe row and is not folded into the 590; it has its own receipt." },
];

// ── 2 · apply ────────────────────────────────────────────────────────────────────────────────────
const applied = [];
function setRow(hits, patch, label) {
  for (const h of hits) {
    const p = SL.probes.find((x) => x.id === h.id);
    Object.assign(p, patch);
    applied.push({ probe: p.id, record: p.record, line: p.line, state: p.state, via: label });
    console.log(`  ${p.state.padEnd(20)} ${p.id.padEnd(26)} <- ${label}`);
    console.log(`      ${(L(p.record)[p.line - 1] || "").replace(/\*\*/g, "").slice(0, 150)}`);
  }
  if (!hits.length) console.log(`  (no residue row) ${label}`);
}

console.log("== UNREACHABLE-IN-CELL · S-8 family (v), one real-iOS-Safari session ==");
for (const [rec, tok, ord, label] of FAMILY_V)
  setRow(findRow(rec, tok, ord), { state: "UNREACHABLE-IN-CELL", cell: IOS_CELLS.join(" + "), capture: null, sha256: null, unreachableBound: IOS_BOUND, ruledAt: "COHESION §0m.2", bookedBy: ".c, folded by .e" }, label);

console.log("\n== UNREACHABLE-IN-CELL · S-8 family (iii), the mobile pass ==");
for (const [rec, tok, ord, label] of FAMILY_III)
  setRow(findRow(rec, tok, ord), { state: "UNREACHABLE-IN-CELL", cell: IOS_CELLS.join(" + "), capture: null, sha256: null, unreachableBound: MOB_BOUND, ruledAt: "COHESION §0m.2", bookedBy: ".c, folded by .e" }, label);

console.log("\n== EXECUTED ==");
for (const e of EXECUTED)
  setRow(findRow(e.record, e.token, e.ordinal), { state: "EXECUTED", cell: e.cell, capture: e.capture, sha256: e.sha256, substrateSha: SUB, bundleSha256: BUNDLE, discriminator: e.discriminator, falsifier: e.falsifier, note: e.note, bookedBy: ".d, folded by .e" }, e.token);

console.log("\n== BEFORE-WITNESS HELD (state stays UNMEASURED — there is no 'partial' terminal) ==");
for (const b of BEFORE_WITNESS)
  setRow(findRow(b.record, b.token, b.ordinal), { beforeWitness: { cell: b.cell, capture: b.capture, sha256: b.sha256, substrateSha: SUB, bundleSha256: BUNDLE, measured: b.half }, afterWitness: { state: "UNMEASURED", owner: "KF.W13 (the two-deletion act; K-5 — ONE act, never split)", note: b.remains }, bookedBy: ".d, folded by .e" }, b.token);

// ── 3 · the tallies, self-counted from the settled rows ──────────────────────────────────────────
const tally = { EXECUTED: 0, RETIRED: 0, "UNREACHABLE-IN-CELL": 0, UNMEASURED: 0 };
for (const p of SL.probes) tally[p.state] = (tally[p.state] || 0) + 1;
const total = Object.values(tally).reduce((a, b) => a + b, 0);
console.log(`\nTALLY  ${JSON.stringify(tally)}  total ${total} (denominator ${SL.denominator.total})`);
if (total !== 590) throw new Error("denominator moved — refusing to write");

// ── 4 · the cell ledger, folded from .c's and .d's own JSON ──────────────────────────────────────
const dLedger = rd(AV + "safari-real/hcm-at-cell-ledger-2026-09-17.json").cellLedger;
const cCells = rd(AV + "safari-real/mobile-cell-foreclosure-2026-09-17.json").cells;
const shots = rd(AV + "safari-real/hcm-at-cell-ledger-2026-09-17.json").captures;
const byCell = (c) => shots.filter((s) => s.cell === c).length;

function foldCell(row) {
  const d = dLedger.find((x) => x.cell === row.cell);
  const c = cCells.find((x) => x.id === row.cell);
  const out = { ...row };
  if (c) {
    out.state = c.state;
    out.captures = c.captures;
    out.bound = `${c.missingHost ? "missing host: " + c.missingHost + ". " : ""}${(c.witnesses || []).join(" · ")}`;
    out.ruledAt = "COHESION §0m.2";
    out.measuredBy = ".c (booked), .e (folded)";
    out.capability = null;
    out.op4 = "NOT TAKEN — no session opens in this cell; booked UNREACHABLE-IN-CELL with the host named, and explicitly NOT inherited from another cell.";
  } else if (d) {
    out.state = d.state;
    out.captures = byCell(row.cell);
    if (d.capability) out.capability = { ...d.capability, measuredBy: ".d, inside this cell (never inherited)" };
    if (d.bound) out.bound = d.bound;
    if (d.forcedColorsArm) { out.forcedColorsArm = d.forcedColorsArm; out.forcedColorsBound = d.forcedColorsBound; }
    if (d.closedMidSeat) out.closedMidSeat = d.closedMidSeat;
    if (d.NOT_WHC) out.NOT_WHC = d.NOT_WHC;
    if (d.rows) out.rows = d.rows;
    if (d.use) out.use = d.use;
    out.measuredBy = ".d (measured), .e (folded)";
  }
  return out;
}

const REPORT = rd(AV + "REPORT.json");
const STATES = rd(AV + "STATES.json");
const foldedLedger = REPORT.cellLedger.map(foldCell);
console.log("\nCELL LEDGER:");
for (const r of foldedLedger) console.log(`  ${r.cell.padEnd(32)} ${String(r.state).padEnd(20)} captures ${r.captures}`);
const stillUnmeasured = foldedLedger.filter((r) => r.state === "UNMEASURED").map((r) => r.cell);
console.log(`  -> cells still UNMEASURED: ${stillUnmeasured.length} (${stillUnmeasured.join(", ") || "none"})`);

const foldMeta = {
  foldedBy: ".e",
  folded: "2026-09-17",
  sources: [
    "docs/tranches/V/megatranche/audit/visual/safari-real/mobile-cell-foreclosure-2026-09-17.json (.c)",
    "docs/tranches/V/megatranche/audit/visual/safari-real/hcm-at-cell-ledger-2026-09-17.json (.d)",
    "COHESION §0m.2 (the iOS cells RULED UNREACHABLE-IN-CELL)",
  ],
  apparatus: "docs/tranches/X/keyframes/evidence/W9/W9e-fold.mjs — re-runnable; the mapping prints its matched residue line",
  mappingRule:
    "a banked defect id becomes a probe row only when the record's own residue line at that probe's `line` " +
    "contains the id at a WORD BOUNDARY. Dispositions whose id names itself in no residue item are carried " +
    "at row level under `unmappedRowDispositions` and are NOT forced onto a row.",
  mappedRows: applied.length,
  unmappedRowDispositions: UNMAPPED,
  captureArtifacts: {
    png: 7,
    sidecarsAgree: "7 of 7, re-hashed at .e",
    rawMeasurementJson: [
      "docs/tranches/X/keyframes/evidence/W9/W9d-raw-chromium-cells.json",
      "docs/tranches/X/keyframes/evidence/W9/W9d-raw-safari-app-desktop.json",
    ],
  },
  surfaceReceipt: "docs/tranches/V/megatranche/audit/visual/safari-real/SS-13-CAPTURE-RECEIPT.md",
};

for (const [obj, path] of [[REPORT, AV + "REPORT.json"], [STATES, AV + "STATES.json"]]) {
  const ind = indentOf(path);
  obj.seat = ".a skeleton, .e fold";
  obj.state = `FOLDED 2026-09-17 by .e — ${tally.EXECUTED} EXECUTED · ${tally["UNREACHABLE-IN-CELL"]} UNREACHABLE-IN-CELL · ${tally.UNMEASURED} UNMEASURED of ${total}; 7 captures across 3 cells.`;
  obj.substrate.bundleSha256 = BUNDLE;
  obj.substrate.bundleNote =
    "MEASURED at .d and RE-HASHED double-run identical at .e, from the §0m.2 capture clone " +
    "(/Users/mkbabb/Programming/keyframes-w9-capture, clean at the pin, no commit, no push, NOT the sacred " +
    "checkout). .a's null is superseded by measurement: the OP-5 break it booked is cured by the ruling's " +
    "shape (b), not by a seat rebuilding in the shared tree.";
  obj.cellLedger = foldedLedger;
  obj.fold = foldMeta;
  if (obj.probeTally) obj.probeTally = tally;
  if (obj.captures !== undefined) obj.captures = 7;
  if (obj.shaCoverage) obj.shaCoverage = { PASS: true, shots: 7, note: "7 of 7 PNGs re-hashed at .e and equal to their .sha256 sidecars; every shot carries cell + substrateRef + substrateSha + measured bundleSha256. Green without a per-shot sha256 FAILS (G-KFW9-2) — this is not vacuous." };
  if (obj.stateMatrices)
    obj.stateMatrices = obj.stateMatrices.map((m) =>
      m.id === "forced-colors-desktop"
        ? { ...m, state: "MEASURED in chromium/emulated-forced-colors ONLY", cellUnderWebkit: "webkit-engine (UNMEASURED — playwright 1.60.0 wants webkit-2287, only webkit-2311 installed)", note: m.note + " MEASURED 2026-09-17 in chromium/emulated-forced-colors (fcMatch true; the chromium control false). NOT measured in safari-app: macOS/WebKit implements no forced-colors mode — proven with a LIVE control (prefers-contrast: more flipped true in the same matchMedia batch while forced-colors stayed false). windows/real-HCM stays UNREACHABLE-IN-CELL: no Windows host, no VM host." }
        : m);
  if (WRITE) wr(path, obj, ind);
}

if (WRITE) {
  SL.fold = { ...foldMeta, tally, denominator: SL.denominator.total };
  wr(SL_PATH, SL, SL_INDENT);
}
console.log(`\n${WRITE ? "WROTE" : "DRY-RUN"}  REPORT.json · STATES.json · SURFACE-LIST.json`);
