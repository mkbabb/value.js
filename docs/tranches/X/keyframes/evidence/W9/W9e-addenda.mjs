// SERVED MODEL: claude-opus-5[1m]
// X.KF.W9 `.e` — G-KFW9-13's write-back apparatus.
//   node W9e-addenda.mjs            (dry-run: prints what it WOULD append, writes nothing)
//   node W9e-addenda.mjs --write    (appends; refuses if the record already carries this addendum)
//
// LAW, carried from KF-W9.md §Bounds `:69` (the CELL SPLIT) and §Gates G-KFW9-13:
//   the existing bytes of every `registry/adjudicated/kf-*.md` are IMMUTABLE (E-1) — no edit, no
//   re-grade, no renumber, no deletion, ever. The ONLY lawful write is an APPEND of a dated addendum
//   under an ORIGINAL banked id, by seat `.e` ALONE (E-3). This script only appends, only under ids
//   the ESCALATION-REGISTER already banks, and mints no id.

import fs from "node:fs";
import path from "node:path";

const WRITE = process.argv.includes("--write");
const REC = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/";
const MARK = "## ADDENDUM 2026-09-17 (X.KF.W9 · G-KFW9-13)";

const SUBSTRATE = "55e9bf0d2391bbc6d9871bb3f0555a6225daae92";
const BUNDLE = "1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448";

// ── the measured bounds, each re-run at THIS seat 2026-09-17 ─────────────────────────────────────
const B = {
  ios:
    "`xcrun devicectl list devices` → **`No devices found.`** (re-run at this seat, double-run) · " +
    "`safaridriver --help | grep -ci simulator` → **0** · " +
    "`POST /session {\"safari:useSimulator\":true}` → *\"The 'macOS' platform is incompatible with " +
    "requested capability: safari:useSimulator.\"* (`.c`, double-run byte-identical). " +
    "**RULED UNREACHABLE-IN-CELL at COHESION §0m.2** — recorded, never inferred from `webkit-engine` (I-20).",
  safariDesktop:
    "the `safari-app/desktop` cell was open and productive at `.d` (4 sessions, OP-4 taken, 3 shots) and " +
    "**closed mid-seat**: session creation began returning *\"You must enable 'Allow remote automation'…\"*; " +
    "`safaridriver --enable` → **`Password:Password is not valid`** (an interactive admin authorization no " +
    "seat here can supply); the running Safari is the **owner's** (pid 23725, started 16:23:59, 6 windows) " +
    "and was not quit. **Precondition: 'Allow Remote Automation' re-enabled by a hand that can answer an " +
    "admin prompt, or the owner's Safari restarted.**",
  webkit:
    "`webkit-engine` is **UNMEASURED on a measured bound**: playwright 1.60.0 resolves webkit to " +
    "`webkit-2287` and only `webkit-2311` is installed, so `webkit.launch()` throws. **A chromium reading " +
    "was NOT given that label** (I-20 in its other direction), which is why the cell is empty rather than wrong.",
  windows:
    "`windows/real-HCM` · `at/nvda` · `at/jaws` are **UNREACHABLE-IN-CELL**: `uname -a` → `Darwin 25.4.0`; " +
    "no Parallels/VMware/UTM/VirtualBox/CrossOver in `/Applications`; `command -v qemu-system-x86_64` → no " +
    "output — **no Windows host and no virtualization host** (all four re-run at this seat).",
  voiceover:
    "`at/voiceover-safari` is **UNREACHABLE-IN-CELL on BOTH legs**: the safaridriver leg is the admin-gated " +
    "closure above, and VoiceOver is not running (`pgrep -x VoiceOver | wc -l` → **0**, re-run here) — " +
    "starting it takes over the owner's live machine, for which no grant exists.",
  chromiumOpen:
    "the `chromium` and `chromium/emulated-forced-colors` cells DID open at `.d` (8 rows, 2 + 2 captures), " +
    "so this trigger is **unrun, not foreclosed** there: it needs a pass that mounts the subject.",
};

// ── the thirteen, exactly as ESCALATION-REGISTER.json banks them ─────────────────────────────────
const ADDENDA = [
  {
    n: 1, ids: ["KF-KC-25"], record: "kf-KeyframeCard.md",
    registerId: "KC-25", ceiling: "MAJOR", cell: "safari-app/ios-device",
    measurement: "the modal punch-through observed on the z-modal surface, and the iOS text mutation that is its tell",
    state: "PROVISIONAL (unrun)",
    precondition: `a real-iOS-Safari session. ${B.ios} The record's own residue row **#9** (*"iOS device confirmation of the focus zoom + autocorrect rewriting (KF-KC-16/25 — mechanisms closed statically)"*) is booked **UNREACHABLE-IN-CELL** in the same motion at \`SURFACE-LIST.json\`.`,
  },
  {
    n: 2, ids: ["KF-ES-3"], record: "kf-EasingScene.md",
    registerId: "KF-ES-3", ceiling: "BLOCKER", cell: "safari-app/desktop",
    measurement: "`steps(1, jump-none)` reached through the shipped step-start seed inside the glass-ui EasingPicker the scene mounts by default — the throw must land in the RENDER path, not merely in an event handler",
    state: "PROVISIONAL (unrun)",
    precondition: `a session in a cell that can mount the scene. ${B.safariDesktop} ${B.chromiumOpen} **The cure is GLASS-OWNED (SS-6 BH relay); this wave measures and authors no producer byte** — nothing here re-opens that routing.`,
  },
  {
    n: 3, ids: ["D-M3"], record: "kf-SpringHeatmap.md",
    registerId: "D-M3 branch (a)", ceiling: "BLOCKER", cell: "safari-app/desktop",
    measurement: "SS-13 residue **#1** — `getComputedStyle(field).getPropertyValue('--color-progress')` AND `ctx.fillStyle`, **logged together in one pass** after `paint()` in light mode",
    state: "PROVISIONAL (unrun)",
    precondition: `the three-branch probe run as worded. **Logging ONE value cannot pick a branch**, and S-13 halts a third such pass. ${B.chromiumOpen} ${B.safariDesktop} \`.d\`'s AT pass photographed this component's \`role="application"\` subtree in the \`chromium\` cell (\`at-chromium-spring-heatmap-application.png\`) — **that shot is not this probe** and is not offered as one.`,
  },
  {
    n: 4, ids: ["M-7/missed-4", "D-4"], record: "kf-TimelineTrack.md",
    registerId: "kf-TimelineTrack M-7/missed-4 + D-4", ceiling: "MAJOR", cell: "—",
    measurement: "ONE armed row, ONE measurement, TWO banked ids — a wheel event with `deltaY` **exactly 0** (not merely small) reaching the track handler, and, in the same capture, the label collision at the rendered overlap",
    state: "PROVISIONAL (unrun)",
    precondition: `one capture carrying both limbs. **Both ids receive this addendum; neither is renamed, merged or dropped** — this row's two-ids-one-trigger composition is why the register's figure is **thirteen** and not fourteen (R2-15). ${B.chromiumOpen} ${B.safariDesktop}`,
  },
  {
    n: 5, ids: ["KAD-7", "D-2"], record: "kf-KeyframesAddDialog.md",
    registerId: "KAD-7/D-2", ceiling: "BLOCKER (toward)", cell: "safari-app/desktop · webkit-engine · chromium",
    measurement: "the computed `pre[contenteditable].tabIndex`, **PER ENGINE** — read inside each engine cell SEPARATELY (I-20 in full; three separate rows)",
    state: "PROVISIONAL (unrun) — 0 of 3 engine cells",
    precondition: `three readings in three cells. \`safari-app/desktop\`: ${B.safariDesktop} \`webkit-engine\`: ${B.webkit} \`chromium\`: ${B.chromiumOpen} **A webkit-engine reading may NOT be written into a safari-app column** — no substitution is offered here.`,
  },
  {
    n: 6, ids: ["KF-SST-15", "KF-SST-16", "KF-SST-17"], record: "kf-StartingStyleTarget.md",
    registerId: "KF-SST-15/-16/-17", ceiling: "MAJOR", cell: "—",
    measurement: "the `@starting-style` entry transition's rendered first frame, **STAMPED** (KF-AX-4) — an un-stamped frame cannot be placed in the entry sequence and does not discriminate",
    state: "PROVISIONAL (unrun)",
    precondition: `one stamped first frame. No stamped entry frame was captured in any cell this wave. ${B.chromiumOpen} ${B.safariDesktop} The \`data-allow-motion\` producer-inert policy stays decided ONCE demo-wide (KF-SST-13, third witness; S-3) and is **not** re-decided here.`,
  },
  {
    n: 7, ids: ["KF-TFP-7"], record: "kf-TimingFunctionPanel.md",
    registerId: "KF-TFP-7 (via KF-CO-5)", ceiling: "MAJOR", cell: "—",
    measurement: "the observation taken **THROUGH KF-CO-5's path** — a reading taken off the direct path does not carry the escalation",
    state: "PROVISIONAL (unrun)",
    precondition: `one observation on KF-CO-5's path. ${B.chromiumOpen} ${B.safariDesktop}`,
  },
  {
    n: 8, ids: ["KF-TD-8"], record: "kf-TypingDots.md",
    registerId: "KF-TD-8", ceiling: "promote-or-INFO-forever", cell: "—",
    measurement: "**ONE `performance.measure`** — the cheapest trigger in the register — taken on the lane the SUBSTRATE actually runs",
    state: "PROVISIONAL (unrun)",
    precondition: `one \`performance.measure\` on a served build of the pinned substrate, stamped \`${SUBSTRATE.slice(0, 8)}\`. **The TypingDots INVERSION is live**: at the disqualified \`8281638c\` the dots stop (rAF lane); at \`origin/master\` they keep pulsing (WAAPI lane) — a measure on the wrong lane answers a different question, so the substrate stamp is mandatory on this row. The servable build now EXISTS (bundle \`${BUNDLE.slice(0, 12)}…\`, built in the §0m.2 clone and re-hashed at this seat), so the bound is no longer the bundle: it is a cell that can hold a trace. ${B.safariDesktop} ${B.chromiumOpen} **TD = TypingDots, NOT TransportDock.**`,
  },
  {
    n: 9, ids: ["KF-AV-41"], record: "kf-AnimationVisualizer.md",
    registerId: "KF-AV-41", ceiling: "promote", cell: "—",
    measurement: "**a live counterexample instance, captured** — not an argument that one could exist",
    state: "PROVISIONAL (unrun)",
    precondition: `a captured band wide enough for a counterexample to appear in. **This is NOT a reading of absence**: the falsifier (*"absence across the captured band leaves the grade where it stands"*) requires a captured band, and this wave produced **7 shots over 3 cells**, none on this component's surface. Absence across an unrun band is not absence, and is not recorded as one.`,
  },
  {
    n: 10, ids: ["KAD-F4"], record: "kf-KeyframesAddDialog.md",
    registerId: "KAD-F4", ceiling: "MAJOR (R-A's, revivable)", cell: "safari-app/ios-device",
    measurement: "the `autocapitalize`/`autocorrect` mutation inside `pre[contenteditable]` on a **REAL iOS device** (G-KFW9-11's own close condition)",
    state: "PROVISIONAL (unrun) — **R-A's MAJOR is neither revived nor resolved**",
    precondition: `a real iOS device. ${B.ios} **A desktop cell cannot revive this MAJOR** — the mutation is an iOS text-entry behaviour, so no cell this host can open substitutes. The record's residue row **#10** is booked **UNREACHABLE-IN-CELL** in the same motion. The row is governed by the **KF-AV-28** standing supersession rider: the witness is lawful now, a CURE is not this wave's to spend, and none was.`,
  },
  {
    n: 11, ids: ["KF-ET-8"], record: "kf-EasingTarget.md",
    registerId: "KF-ET-8 (contested dark arm)", ceiling: "MAJOR", cell: "—",
    measurement: "the **dark-arm** contrast numeral, **RE-DERIVED AT CAPTURE** (KF-SKEL-22 — no corpus numeral is the figure of record)",
    state: "PROVISIONAL (unrun)",
    precondition: `one dark-arm capture of the selected sparkline over the true plate, with the numeral re-derived from the delivered pixels. **The DARK arm specifically** — a light-arm reading does not decide it, and none of this wave's 7 shots is a dark-arm contrast plate. ${B.safariDesktop} ${B.chromiumOpen} kf-EasingTarget's **KF-ET-24 is a SEPARATE row and a named TRAP** (NEGATIVE-REGISTER T-3) — not conflated here, and not re-probed.`,
  },
  {
    n: 12, ids: ["N-5"], record: "kf-SpringTrace.md",
    registerId: "N-5", ceiling: "MAJOR", cell: "—",
    measurement: "the **BITE POINT** — the viewport height at which clipping begins (residue #10, the cheapest probe in that record)",
    state: "PROVISIONAL (unrun)",
    precondition: `a viewport-height sweep against the served bundle. **A reading that only confirms \"it clips eventually\" does not separate MINOR from MAJOR** — the bite point itself is the measurement. ${B.chromiumOpen} ${B.safariDesktop}`,
  },
  {
    n: 13, ids: ["L-M-10/N-3"], record: "kf-KeyframesStringControls.md",
    registerId: "L-M-10/N-3 + KF-TFP-19 (INP hooks)", ceiling: "MAJOR", cell: "—",
    measurement: "a **FELT INP cost** — not the existence of the waste, which is already banked. KSC: N+1 prettier formats per typing pause + per-pause `localStorage` serialize",
    state: "PROVISIONAL (unrun)",
    precondition: `an INP figure on this path. **A CPU-time figure alone promotes neither row** — the discriminator is INP (the interaction's own latency), not total work, on the kf-ChannelControls precedent. This trigger binds **two records**; its other limb (**KF-TFP-19**) carries the same addendum at \`kf-TimingFunctionPanel.md\`, which is why the register counts **thirteen triggers over twelve records**. ${B.chromiumOpen} ${B.safariDesktop}`,
  },
  {
    n: 13, ids: ["KF-TFP-19"], record: "kf-TimingFunctionPanel.md",
    registerId: "L-M-10/N-3 + KF-TFP-19 (INP hooks)", ceiling: "MAJOR", cell: "—",
    measurement: "a **FELT INP cost**. TFP: per-`pointermove` whole-bucket `JSON.stringify` + `localStorage.setItem` on the demo's only direct-manipulation authoring surface, no debounce anywhere on the path",
    state: "PROVISIONAL (unrun)",
    precondition: `an INP figure on this path. **A CPU-time figure alone promotes neither row.** This trigger binds **two records**; its other limb (**L-M-10/N-3**) carries the same addendum at \`kf-KeyframesStringControls.md\`. ${B.chromiumOpen} ${B.safariDesktop}`,
  },
];

function block(a) {
  const ids = a.ids.join(" · ");
  return [
    ``,
    `${MARK} — **${ids}**`,
    ``,
    `*Appended by seat \`.e\`, the only seat §Bounds \`:69\` permits to write here. **Nothing above this line is`,
    `rewritten** — no edit, no re-grade, no renumber, no deletion, no new id (E-1 immutable bytes / E-3`,
    `addenda-not-patch). This addendum records a MEASUREMENT STATE, not a grade: **the banked severity is`,
    `unchanged and stays exactly where the record put it.***`,
    ``,
    `- **armed trigger** — register row **${a.n}** of thirteen, \`evidence/W9/ESCALATION-REGISTER.json\` (id as banked there: \`${a.registerId}\`); ceiling if it fires: **${a.ceiling}**; roster cell(s): \`${a.cell}\`.`,
    `- **measurement named by the trigger** — ${a.measurement}.`,
    `- **measured value** — **NONE. The trigger did not run.**`,
    `- **resulting severity** — **${a.state}**. The banked grade stands; it is neither inherited as confirmed nor moved.`,
    `- **exact precondition** — ${a.precondition}`,
    `- **substrate of this wave** — keyframes.js \`${SUBSTRATE}\` (COHESION §0m.2 HOLD; frontier moved to \`3e81f500\`, the pin is its ancestor, **no re-pin on a seat's authority**). Served bundle \`${BUNDLE}\`, built in the §0m.2 capture clone and **re-hashed at this seat, double-run identical**. Capture: **none for this row**; shot-sha256: **none**.`,
    `- **G-KFW9-13 reading** — this row closes the gate's *"unrun triggers reported PROVISIONAL at close"* arm, **not** its *"measured value written back"* arm. The gate stays **RED**.`,
    ``,
  ].join("\n");
}

let appended = 0, skipped = 0;
const touched = new Set();
for (const a of ADDENDA) {
  const p = path.join(REC, a.record);
  const cur = fs.readFileSync(p, "utf8");
  const sig = `${MARK} — **${a.ids.join(" · ")}**`;
  if (cur.includes(sig)) { console.log(`SKIP  ${a.record}  (already carries ${a.ids.join(" · ")})`); skipped++; continue; }
  const add = block(a);
  if (WRITE) { fs.appendFileSync(p, add); touched.add(a.record); }
  console.log(`${WRITE ? "APPEND" : "WOULD"} ${a.record.padEnd(32)} ${a.ids.join(" · ")}  (+${add.split("\n").length - 1} lines)`);
  appended++;
}
console.log(`\nblocks ${WRITE ? "appended" : "pending"}: ${appended} · skipped: ${skipped} · records touched: ${touched.size || new Set(ADDENDA.map(a => a.record)).size}`);
