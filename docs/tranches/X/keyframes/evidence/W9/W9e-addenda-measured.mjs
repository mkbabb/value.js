// SERVED MODEL: claude-opus-5[1m]
// X.KF.W9 `.e` — the MEASURED addenda: `.d`'s five handed-over findings, landed under ORIGINAL ids.
//   node W9e-addenda-measured.mjs            (dry-run)
//   node W9e-addenda-measured.mjs --write
//
// These are NOT escalation-trigger write-backs (those are W9e-addenda.mjs's thirteen, and the two
// families are counted separately so neither number can absorb the other). They are dated
// MEASUREMENTS `.d` took and was forbidden to land — E-1/E-3 reserve every adjudicated-record write
// to `.e` alone (KF-W9.md §Bounds `:69`). Every one is append-only, under an id the record already
// banks, and **no row is re-booked, re-graded, renamed or dropped by any of them**.

import fs from "node:fs";
import path from "node:path";

const WRITE = process.argv.includes("--write");
const REC = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/";
const MARK = "## ADDENDUM 2026-09-17 (X.KF.W9 · `.d` measured, `.e` landed)";

const SUB = "55e9bf0d2391bbc6d9871bb3f0555a6225daae92";
const BUNDLE = "1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448";
const STAMP =
  `substrate keyframes.js \`${SUB}\` (COHESION §0m.2 HOLD) · bundle \`${BUNDLE}\` ` +
  `(built in the §0m.2 capture clone, **measured and double-run** at \`.d\` and **re-hashed identical at \`.e\`**)`;

const ADDENDA = [
  {
    record: "kf-SpringHeatmap.md",
    ids: ["D-m8", "D-B3"],
    cell: "`chromium` (AT-precondition inventory; the AT cells themselves are UNREACHABLE-IN-CELL)",
    capture: "`…/audit/visual/safari-real/at-chromium-spring-heatmap-application.png`",
    shotSha: "67e4ca6205e7a18e81fd4dffa2af4679116dda1e7a53c3989f06da830c50549a",
    body: [
      `- **D-B3 REPRODUCES, clause by clause.** Measured live: \`role="application"\`, \`tabindex="0"\`, ` +
        `\`aria-valuenow: null\`, \`aria-valuetext: null\`, \`childCount: 2\`, \`childrenAriaHidden: ["true","true"]\` ` +
        `— **the EMPTY application subtree, exactly as banked.** The row is confirmed, not re-graded.`,
      `- **D-m8's numeral moves, and only downward: the label is 23 words, not 33.** Counting rule published ` +
        `with the figure (whitespace-separated tokens of the rendered \`aria-label\`). **The no-\`describedby\`-split ` +
        `half of D-m8 is untouched and holds**; what is corrected is one count, and the correction makes the row ` +
        `*weaker*, not stronger — recorded because a register that only ever confirms itself is not measuring.`,
      `- **NET-NEW, and it is a duplication, not a re-grade: \`role="application"\` appears TWICE on the spring ` +
        `route**, with an identical 23-word label. The bank's *"sole such role"* is a role-**kind** claim and is ` +
        `**untouched**; that there are two instances of that kind is new information the record did not carry.`,
      `- **UNMEASURED, with its precondition named**: **D-M3 branch (a)** (residue #1) needs \`getPropertyValue\` ` +
        `AND \`ctx.fillStyle\` logged **together in one pass**; this capture is an AT-subtree read and **is not ` +
        `that probe**. Its own addendum is the G-KFW9-13 block above.`,
    ],
  },
  {
    record: "kf-CopyButton.md",
    ids: ["KF-CB-9"],
    cell: "`chromium` (the AT cells are UNREACHABLE-IN-CELL — `at/voiceover-safari` on both legs, `at/nvda`/`at/jaws` for want of a Windows host)",
    capture: "none for this row — the reading is a live DOM/computed-style read, banked unedited at `evidence/W9/W9d-raw-chromium-cells.json`",
    shotSha: "—",
    body: [
      `- **The PRECONDITION is CONFIRMED**: a nested \`role="status"\` inside a \`<button>\` is present on the ` +
        `shipped surface — the structural half of the registry's single highest-value SS-13 probe.`,
      `- **NET-NEW: the probe has a THIRD possible outcome its two-branch framing does not enumerate.** The copy ` +
        `button ships in **two divergent forms on one route**: \`"Copy curve literal"\` carries **no nested ` +
        `\`role="status"\` at all**, while \`"Copy easing literal"\` carries one. A probe framed as *"the live region ` +
        `either is or is not announced"* cannot express *"the surface is not one surface."* **The row is not ` +
        `re-graded and the probe is not re-authored here** — the finding is recorded so whoever runs the AT pass ` +
        `runs it against both mounts.`,
      `- **The UTTERANCE stays UNREACHABLE-IN-CELL**: what an AT says is what an AT cell measures, and all three ` +
        `are foreclosed on this host with their bounds measured. **S-8 family (vi) is DECLARED UNSPENT** — no probe ` +
        `in it is spent by this reading, and none may later be skipped on the ground that a seat "already looked".`,
    ],
  },
  {
    record: "kf-SpringTarget.md",
    ids: ["D-14", "N-4", "D-6"],
    cell: "`chromium` · `safari-app/desktop` (both read in the same pass where the cell was open)",
    capture: "none for these rows — live DOM/computed-style reads, banked unedited at `evidence/W9/W9d-raw-chromium-cells.json`",
    shotSha: "—",
    body: [
      `- **D-14 + N-4 CONFIRM as ONE BINDING**: on \`/#/spring\`, **16 of 16** sliders read \`aria-valuetext: null\`; ` +
        `names are **positional** (\`"Value 1 of 5"\`).`,
      `- **NET-NEW: \`aria-valuenow\` runs \`0…1\` against a declared \`max\` of 110.** A value space and a declared ` +
        `range that do not describe each other — recorded as a dated measurement, **not** as a re-grade of either id, ` +
        `and not booked as a new defect: no id is minted here.`,
      `- **D-6 CONFIRMS, and the intra-repo divergence now rests on a side-by-side reading rather than on two dates**: ` +
        `\`/#/spring\` headings **\`[]\`** and \`/#/easing\` headings **\`["H2:ease"]\`**, measured **in the same pass**.`,
      `- **D-5's \`aria-hidden\` half stays UNMEASURED** with its precondition named, and **i-13/C-3's iOS symptom ` +
        `(residue #5) is UNREACHABLE-IN-CELL** — \`xcrun devicectl list devices\` → \`No devices found.\`, ` +
        `\`safaridriver --help | grep -ci simulator\` → **0**, ruled at COHESION §0m.2.`,
    ],
  },
  {
    record: "kf-SequenceAxis.md",
    ids: ["D-11 (≡ banked D-16)", "killed-claims #12 (ruling 7)"],
    cell: "producer bytes read at glass **7.0.0**'s shipped dist — **read-only; zero glass-ui bytes written**",
    capture: "none — a file-level enumeration over the installed producer dist",
    shotSha: "—",
    body: [
      `- **Ruling 7's FOUR-FILE correction re-measured, and the figure is larger, not different in kind.** ` +
        `⟨\`find …/dist -name '*.css' | LC_ALL=C sort | xargs grep -l 'forced-colors'\`⟩ → **TWELVE files**. ` +
        `**All four of the ruling's files are present and all four still resolve.**`,
      `- **The ruling's CONCLUSION is REINFORCED, not disturbed**: if no *"the sole forced-colors rule is X"* cell ` +
        `survived four files, none survives twelve. **The verdict is unchanged; only its denominator is.**`,
      `- Published as an **enumeration, not a numeral**, so the next census reproduces it rather than inheriting it. ` +
        `**No row is re-graded and no id is minted.**`,
    ],
  },
  {
    record: "kf-PlaybackRibbon.md",
    ids: ["D-3", "DU-M-1", "D-12 (demo-side stopgap)"],
    cell: "`chromium/emulated-forced-colors` (the BEFORE witness + its falsifier) · `safari-app/desktop` (the normal-state antecedent)",
    capture: "`…/audit/visual/safari-real/hcm-chromium-emulated-forced-colors-easing-ribbon.png`",
    shotSha: "bb2434b5c7bb9e17f29736ef8246b422e013ca7f3222af2b9dfd20bdcc1bdd88",
    body: [
      `- **THE REDUNDANCY GROUND IS FALSE AS WORDED — measured, and handed to KF.W13 before its act lands.** The ` +
        `standing ground for deleting \`playback-idiom.css:72-75\` is *"both demo copies are wholly redundant against ` +
        `producer \`base.css\`'s identical rule."* Measured per copy at glass **7.0.0**'s shipped dist: ` +
        `\`design-idioms.css:76-79\` \`.focus-ring:focus-visible\` — the producer ships the **identical selector** with ` +
        `the same two declarations → **TRUE AS STATED**; \`playback-idiom.css:72-75\` \`.btn-playback:focus-visible\` — ` +
        `⟨\`find …/dist -name '*.css' | xargs grep -l 'btn-playback'\`⟩ → **exit 1, no output**, widened to all file ` +
        `types → **no output** → **FALSE AS STATED: no producer rule at any coordinate.**`,
      `- **The row survives by a different path, and the path is the finding.** Measured live, the ribbon's own class ` +
        `lists carry **both** \`btn-playback\` **and** \`focus-ring\` ` +
        `(\`"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover btn-playback btn-playback-accent"\`), ` +
        `and ⟨\`querySelectorAll('.focus-ring').length\`⟩ → **44**. The producer reaches these buttons once *both* demo ` +
        `copies are gone — **via the co-present \`.focus-ring\` class, not via a producer \`.btn-playback\` rule.**`,
      `- **This makes K-5 MEASURED rather than argued.** Delete only \`design-idioms\` → \`.btn-playback:focus-visible ` +
        `{ outline: none }\` still matches **the same buttons**; delete only \`playback-idiom\` → ` +
        `\`.focus-ring:focus-visible { outline: none }\` still matches **the same buttons**. **ONE ACT, NEVER SPLIT — ` +
        `proved by the buttons' own class list, not by inference.**`,
      `- **The BEFORE witness exists and is falsifiable.** Under \`forced-colors: active\` genuinely matching, ` +
        `\`.btn-playback\` reads \`:focus-visible true\` · \`outline-style: none\` · \`box-shadow: none\`; the FALSIFIER ` +
        `(same engine, same bundle, \`forcedColors: "none"\`) paints an indicator. **The AFTER witness reads ` +
        `UNMEASURED** — the two-deletion act is **KF.W13's**, this wave spent no cure and deleted no byte (S-9).`,
      `- **The obligation this hands KF.W13**: the ground must be **re-worded to redundancy via the co-present ` +
        `\`.focus-ring\` class** before the deletion lands. **The act itself is unchanged and is still ONE act.** ` +
        `No severity moves here; the row's cure home is untouched.`,
    ],
  },
];

function block(a) {
  return [
    ``,
    `${MARK} — **${a.ids.join(" · ")}**`,
    ``,
    `*Appended by seat \`.e\`, the only seat §Bounds \`:69\` permits to write here; **measured by seat \`.d\`**, which`,
    `was forbidden to land it. **Nothing above this line is rewritten** — no edit, no re-grade, no renumber, no`,
    `deletion, no new id (E-1 / E-3). Every bullet is a dated MEASUREMENT; none re-books a row or moves a severity.*`,
    ``,
    `- **cell** — ${a.cell}`,
    `- **capture** — ${a.capture}${a.shotSha === "—" ? "" : ` · shot-sha256 \`${a.shotSha}\``}`,
    `- **stamp** — ${STAMP}`,
    ``,
    ...a.body.map((b) => b),
    ``,
  ].join("\n");
}

let n = 0;
for (const a of ADDENDA) {
  const p = path.join(REC, a.record);
  const cur = fs.readFileSync(p, "utf8");
  const sig = `${MARK} — **${a.ids.join(" · ")}**`;
  if (cur.includes(sig)) { console.log(`SKIP  ${a.record}`); continue; }
  const add = block(a);
  if (WRITE) fs.appendFileSync(p, add);
  console.log(`${WRITE ? "APPEND" : "WOULD"} ${a.record.padEnd(26)} ${a.ids.join(" · ")}  (+${add.split("\n").length - 1} lines)`);
  n++;
}
console.log(`\nblocks ${WRITE ? "appended" : "pending"}: ${n} · records: ${new Set(ADDENDA.map((a) => a.record)).size}`);
