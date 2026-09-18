# ARM B — PROGRAM PF-GOVERNANCE — the cross-repo governance tranche program

**Formation seat:** armB (independent Fable formation; Codex corpus unread — firewall honored).
**Date:** 2026-07-19. **Canon:** L1 (`keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md`) + L2 packets P0–P6 + CONVERSATION-ADDENDA C1–C23 (addenda WIN where they tighten). **Truth base:** `armB/sweep-kf-lib.md` + `armB/sweep-value-lib.md` (both present, both consumed whole).

---

## §0 — PROGRAM CHARTER

PF-GOVERNANCE owns the constellation's coordination spine so every sibling program
(parser, color, structure, frontend, apparatus) can cut deep without breaking a consumer
silently: ONE co-land boundary (value 5 / kf 7 / glass peers / atlas ranges), priced by the
ERESOLVE-hard wedge; the kf dispatch protocol (P4.5) as the sole cross-repo edit channel;
the capability-diff gate on BOTH repos so the v4 failure mechanism (*no advocate ⇒ no
tombstone*) can never fire again; the P3 zone dispositions carried as INPUT into a single
owner-decision docket; glass-ui defect batching (never piecemeal); semver discipline
(parse-that ≤1.1 forever, C15); G0′ pins with mandatory anchor re-derivation. Eight waves,
KISS-cut: infrastructure first, the boundary crossing LAST, zero silent drops throughout.

---

## §1 — G0′ PIN REGISTER (measured 2026-07-19; supersedes the letters' pins where drifted)

| Repo | Tree | Branch @ HEAD | Version | Drift vs letters |
|---|---|---|---|---|
| value.js | `/Users/mkbabb/Programming/value.js` | `tranche-u@c654824e` | 4.0.0 (published deps-free) | canon `db77dbd8` +docs only; `git diff db77dbd8..HEAD -- src package.json` = EMPTY |
| keyframes.js | `/Users/mkbabb/Programming/keyframes-v-exec` | `master@81a56990` | 6.0.0 | canon `0dac636b` +2 docs-only commits; all zone LOC EXACT at new HEAD |
| parse-that | `/Users/mkbabb/Programming/parse-that` (pkg at `typescript/`) | `master@ef10d5b7` | 1.0.0 (npm latest) | ✓ matches canon |
| glass-ui | `/Users/mkbabb/Programming/glass-ui` | `master@cdc322b9` | 7.0.0 | canon said "re-pin at read" — now pinned |
| atlas (ACTIVE) | `/Users/mkbabb/Programming/.p-totality/atlas` | `p/totality@fe9abcfc` | 7.0.0 (npm latest ALREADY 7.0.0) | ✓; standalone `atlas@master` checkout remains a STALE trap |
| bbnf-lang | `/Users/mkbabb/Programming/bbnf-lang` | `master@af15f63e` | — | canon `b3cf48e3b` — re-pinned |
| fourier-analysis | `/Users/mkbabb/Programming/fourier-analysis` | `m/w1-bump-migration@cd26c653` | — | new pin (C8 scope) |
| sci-report | `/Users/mkbabb/Programming/sci-report` | `feat/tranche-k-arc@da1e3763` | — | new pin (W56 rider) |

**Standing proof the re-derivation law earns its keep (sweep-kf-lib §3):** at kf HEAD, 3 of
the 13 P4.3 flatten anchors had ALREADY drifted (vite.config.ts `:41→:37`, `:156→:153`,
`:229→:227`); 9 were exact; the internal/ fan-in is **11** importers, not "10-zone".
Every wave in every program re-derives its anchors at execution (N-ADJ-3; L1 §7.3).

**Channel constants (verified on disk today):** kf inbox =
`keyframes-v-exec/docs/tranches/V/coordination/`, grammar `VALUEJS-INBOUND-<date>-<topic>.md`,
rowed in `INBOUND-LEDGER.md` (live precedent: three `VALUEJS-INBOUND-2026-07-17-*` files).
glass-ui inbox = the ACTIVE glass tranche's `coordination/` (BJ at this read — **re-derive at
dispatch**; glass advances quickly). parse-that channel = PT-E ask letters
(`parse-that/docs/tranches/A/VALUEJS-PT-E-2026-07-05.md` precedent).

---

## §2 — THE WAVE SET (8 waves)

### F-PF-governance-01 — The pin register + anchor re-derivation law (program spine)
- **Repo:** value.js (tranche plan folder; program-wide infrastructure).
- **Intent:** Erect the G0′ register (§1) as a living file every wave MUST open by re-pinning;
  codify the anchor re-derivation gate step; open the formation registry with a defect-FAMILY
  axis (P1.5: track families, not instances — the mixColors/parseCSSValue ad-hoc-fix family is
  row 1, its recurrence risk living in the parser successor).
- **Deliverables:** `PIN-REGISTER.md` (the §1 table + re-pin procedure); the re-derivation gate
  template (a mechanical step: cite → re-grep → diff → proceed/halt); the registry file with
  the family axis; the G5′ rider (structure waves AMEND the ratified kf LT blueprint + EXTEND
  proof:structure, naming superseded rulings LT-10/LT-16 — never a parallel authority).
- **Acceptance gates (born-RED — the defect is live today):** RED = a wave spec citing any of
  the three drifted vite anchors at their P4.3 line numbers (`:41/:156/:229`) — they mis-target
  at kf `81a56990` NOW. GREEN = every anchor cite in every ratified wave spec carries a
  re-derivation stamp (HEAD + date) newer than the pinned tree's HEAD.
- **Dependencies:** none (first wave).
- **π/DELTA:** no visual claim → none.
- **Model routing:** Opus mechanical (pin/grep sweeps) under a Fable-authored template; every
  seat reports `model_served` (P0.1 law: declaration ≠ execution).

### F-PF-governance-02 — value.js publish-integrity gates: capability-diff + manifest gate + deps strip
- **Repo:** value.js.
- **Intent:** Mechanize the silent-drop tombstone law where it fired (L1 §7.1: value.js FIRST)
  and defuse the committed registry bomb. One wave, two gates, one strip — all three are
  publish-path integrity.
- **Deliverables:** (a) **capability-diff gate**: export-census script diffing the built public
  surface (the 7 frozen subpath keys) against the prior published tag; CI-wired; red on ANY
  removed export lacking a by-name RIGHTLY/UNJUSTLY/UNCLEAR tombstone in the cutting release's
  CHANGELOG. (b) **pre-publish manifest gate**: fails on runtime `dependencies` ∩ {self,
  glass-ui, keyframes.js} (self-dep prior art: value shipped itself as its own dependency
  v1.1.0–v2.0.1), and on packed-surface drift vs the 7 keys. (c) **the deps strip**: move the
  COMMITTED `dependencies: {"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}` to
  devDependencies — never lockstep-bump (P0.2 row 3: bumping preserves the cycle).
- **Acceptance gates (born-RED — both defects are live today):** RED-1 = the capability-diff
  BIRTH CERTIFICATE: run the census retroactively v3.1.0→v4.0.0 — it MUST go red on the
  unpapered extinction (`grep -rniE "deltaE|raytrace|okhsl|okhsv" src/` = 0 at HEAD; the Into
  family absent; the v4.0.0 CHANGELOG names ZERO of the 14-row D-ledger families). A gate that
  passes the v4 cut is vacuous-green and is rejected. RED-2 = the manifest gate run at
  `c654824e` TODAY: `git show HEAD:package.json` carries the deps block **committed in-repo**
  (sweep-value-lib §4 — sharper than the letters' "working-tree-only"); a publish from this
  branch ships the kf↔value registry cycle + dual-core forcing via kf's exact pin. GREEN =
  strip landed + both gates CI-wired + capability-diff green-with-tombstones on the next cut.
- **Dependencies:** F-PF-governance-01.
- **π/DELTA:** none (no visual claim).
- **Model routing:** Opus mechanical (census scripts, CI wiring); Fable adjudicates the
  tombstone taxonomy on the retro-run (RIGHTLY vs UNJUSTLY is a judgment call — e.g. the
  P2.2 tombstone list is RIGHTLY; the gamut/ΔE/Into families are UNJUSTLY, restored by the
  color program).

### F-PF-governance-03 — The kf dispatch protocol + the initial dispatch pack
- **Repo:** value.js → keyframes.js inbox (`docs/tranches/V/coordination/`).
- **Intent:** Formalize P4.5 as the SOLE cross-repo channel: this value.js-owned tranche
  DIRECTS kf library items as specs + bounded dispatches; the kf successor implements; kf's
  demo/UI corpus + FOLD-FORWARD rows stay kf-owned; direct cross-repo edits require an
  explicit owner grant. All sibling programs' kf items ride THIS channel.
- **Deliverables:** the protocol doc (grammar `VALUEJS-INBOUND-<date>-<topic>.md`; every
  dispatch rowed in kf's `INBOUND-LEDGER.md`; acknowledgment discipline; bounded scope per
  dispatch) + the initial governance dispatch pack: (a) **kf capability-diff gate spec** —
  export census vs the 6.0.0 tag; kf's 6.0.0 record already models tombstone compliance, so
  the gate is born-GREEN there BUT its `--selftest` must prove RED capability by mutation
  (remove one export, assert red) — a gate that cannot fail is the lighthouse-mask disease;
  (b) **kf-7 co-land spec** (the boundary member: version 7.0.0, value pin moves EXACT
  `4.0.0`→`5.0.0`, the 44-key `./engine` mirror re-verified by EXECUTION post-cut); (c)
  **scar-tissue deletion spec**, triggered on the color program's R-DELTAE/R-RAMP landing:
  delete `compile/emit/backward/color.ts:120-124` (hand-rolled oklab Euclidean ΔE) +
  `backward.ts:30-32` (stale `sampleColorRamp`/`deltaEOK` docstrings) and re-adopt value's
  restored surface; (d) **easing.ts consume-vs-ratify adjudication row** — the ONE live
  boundary census row (confirmed EXACT at kf HEAD: `:30` `CSS_NATIVE_KEYWORD`, `:38-39`
  `CSS_FUNCTION_EASING`): a two-regex string classifier, zero productions, under kf's
  documented value.js-free light-engine law — the dispatched spec presents RATIFY (keep as
  classifier, documented as the deliberate duplication) vs CONSUME (import the name table)
  with the sweep's evidence; also rowed in kf's addendum-2 regex census; (e) **zone-docket
  outcome relays** (post-owner ruling, from F-PF-governance-04).
- **Acceptance gates:** completeness, machine-checkable — every dispatch has an
  INBOUND-LEDGER row; zero un-rowed dispatches; every sibling-program kf item in the landing
  map (§5) cites a dispatch id or an explicit owner grant. RED = any kf-touching wave in any
  program whose mechanism is a direct edit without a grant.
- **Dependencies:** F-PF-governance-01.
- **π/DELTA:** none.
- **Model routing:** Fable (spec authorship + the consume-vs-ratify adjudication brief);
  Opus for the ledger-completeness checker.

### F-PF-governance-04 — Zone-disposition docket + prune riders + the oscillator record correction
- **Repo:** value.js (docket assembly) + dispatches via F-PF-governance-03 (kf-side riders).
- **Intent:** The P3 tables are INPUT, not open questions. Assemble the single owner-decision
  sheet (§3 below) for the ~2.4k OWNER-DECISION LOC + value-side decision rows; author the
  prune riders for the ~0.8k unilateral candidates; discharge the record-correction duty on
  oscillator. The record-state trichotomy governs: intact record → owner decides; refuted
  record → shield pierced + correction duty; fence-register ruling → cite-to-overturn.
- **Deliverables:** the §3 docket sheet, ratification-ready; three prune riders — split-text
  (486 LOC; four-tree census = 0 consumers; named casualty: the split-a11y oracle, rowed with
  its test binding), motion-path (~180; 0 consumers, no EP-3 row), oscillator (~150;
  shield PIERCED) — each rider carries the census evidence cite at pinned HEADs, the
  zone-orphaned-test binding (scroll 800 / svg 807 / ingest 1027 / waapi 737 LOC bind to zone
  verdicts; no orphaned green), and the K F6 fence check (any prune touching
  scroll/timeline/physics must cite-and-overturn the named ruling — none of the three does);
  the **oscillator record-correction rider**: fix `published-surface.md:44` (its two named
  consumers are FALSE on disk) + spec the NEW gate rule (proof:publish verifies consumer
  CLAIMS, not just coverage-file existence — dispatched kf-side via 03).
- **Acceptance gates (born-RED — the record defect is live today):** RED =
  `published-surface.md:44` asserts consumers that a four-tree grep disproves, NOW. GREEN =
  record corrected + the gate-rule spec dispatched + docket sheet complete (every P3.1/P3.2
  row disposed — checkable 1:1 against the tables; a row with no disposition is a silent
  drop). Prune riders EXECUTE only post-owner-ratification and only behind frozen surfaces
  until the boundary (P4.2).
- **Dependencies:** F-PF-governance-01, F-PF-governance-03 (dispatch channel).
- **π/DELTA:** none (prunes carry no visual claim; the split-text casualty row notes the demo
  never consumed it on any tree).
- **Model routing:** Fable (docket adjudication briefs — each row argued both ways in ≤10
  lines); Opus for the census re-greps at execution HEADs.

### F-PF-governance-05 — Glass-ui defect batching + the shadcn-gap channel
- **Repo:** value.js (batch ledger) → glass-ui active-tranche inbox (BJ at this read;
  re-derive at dispatch).
- **Intent:** Root glass-ui defects batch to the working glass agent and are released only
  once large swaths of features are isolated, fully precepts-compliant wave addenda are
  written, and their exact defects targeted — never interrupted piecemeal (L1 §4). C5's
  shadcn abrogation feeds this channel: every shadcn component with no true glass-ui
  equivalent is marked, prototyped in glass-ui idioms, and spec'd as a glass wave.
- **Deliverables:** the batch ledger (fold in the kf 15-row marks register — glass §7 defects
  with live kf exposure, per kf FOLD-FORWARD); the release-criteria checklist (isolation
  evidence + targeted defect + precepts-compliant addendum, all three or it does not ship);
  the shadcn-gap census hook (the census itself is the frontend program's; THIS wave owns the
  channel + the dispatch format); the standing-invariant note (owner edict 2026-07-12: EVERY
  component/glass-ui-level change relays to the active glass inbox — a fond).
- **Acceptance gates:** RED = any glass-touching change in ANY sibling program shipping
  outside a batch (checked against the ledger — the ledger check is the gate); RED = a batch
  entry missing any of the three release criteria. GREEN = all glass dispatches batched,
  criteria-complete, acknowledged in the glass tranche's coordination dir.
- **π/DELTA (visual claims EXIST here):** every shadcn-gap prototype dispatched carries a π
  capture pair (extant shadcn rendering vs glass-ui prototype, light+dark, mobile+desktop
  viewports) and a DELTA row naming the exact visual deltas claimed; no prototype ships to
  glass without its captures ON DISK (the declared-captures-missing close-lie check).
- **Dependencies:** F-PF-governance-01.
- **Model routing:** Fable exclusively for prototype design + capture adjudication (C17: all
  deep frontend design is Fable); probe parsimony (parsimonious playwright, fastidious
  analysis).

### F-PF-governance-06 — Semver discipline + the release train
- **Repo:** all (discipline doc lives in value.js plan folder; cuts execute per-repo).
- **Intent:** One ordered train, not ad-hoc cuts. Encode the semver caps and the sequencing
  laws that keep sibling programs from front-running the boundary.
- **Deliverables:** `RELEASE-TRAIN.md` codifying: (a) **parse-that may NEVER publish >1.1**
  regardless of change level (C15; C1: leveraged as published, minor fixes only — needs route
  as PT-E ask letters, no feature uplift this tranche); (b) kf 6.0.0 / value 4.0.0 tags
  immutable (P4.1.3); (c) value 4.1.x (the W56 SCI-1 vehicle — mixColorsInto/toRgba8Into,
  D54 DECIDED, extended by R-INTO, never forked) cuts BEFORE the 5.0.0 boundary; the D-GAP-6
  rider fires at 4.1 (kf adopts sampleBezier ONLY if 4.1 ships it); (d) **glass peer
  strategy: RANGE-WIDENING first** — glass peers move `^6`→`^6 || ^7` (kf) and `^4`→`^4 || ^5`
  (value) as a glass MINOR, landing BEFORE the boundary: because the wedge is ERESOLVE-hard,
  widening in advance is the only move that lets both sides of the boundary install during
  the crossing window (docket row OD-12 if the owner prefers a hard bump); (e) sequencing
  laws: kf MR2/MR4 land before any restructure import churn (P3.3 row 7, relayed into the
  kf-7 dispatch); internal-only restructures behind frozen surfaces until the boundary
  (P4.2); value W55 owns the `.github` edit — no other wave touches it; atlas ranges move
  LAST; **no stale-atlas catch-up wave exists** (npm latest is already 7.0.0 — P0.2 row 4);
  sci-report crosses atomically at its own glass-7 consume (registry row, not a wave).
- **Acceptance gates:** RED = any cut outside the train order, any parse-that version >1.1
  proposed anywhere in the formation, any 4.1.x-fork of the W56 vehicle. GREEN = train
  ratified + the manifest gate (02) bound to every cut + post-cut `npm view` assertions
  scripted.
- **Dependencies:** F-PF-governance-01, -02 (gates bind cuts), -03 (kf-7 spec is a train car).
- **π/DELTA:** none.
- **Model routing:** Fable adjudicates the ordering (the widen-vs-bump brief); Opus scripts
  the cut/assert mechanics.

### F-PF-governance-07 — THE CO-LAND BOUNDARY (the one breaking-change crossing)
- **Repo:** value.js + keyframes.js + glass-ui + atlas (ACTIVE tree), coordinated.
- **Intent:** The single coordinated crossing: value 5.0.0 / kf 7.0.0 / glass peers (widened
  in 06 or bumped per OD-12) / active-atlas ranges. Everything breaking that sibling programs
  built behind frozen surfaces ships HERE, tombstoned, priced, and chased — once.
- **Deliverables:** the **wedge price sheet** (pre-written chase ledgers, re-derived at
  execution): glass 7 peers kf ^6 + value ^4 (optional — but a present-INCOMPATIBLE
  peerOptional HARD-FAILS npm, ERESOLVE, proven by execution twice; `optional` exempts ABSENT
  peers only) AND vue ^3.5 / tailwindcss ^4 / reka-ui ^2 / @lucide/vue ^1.16 (NON-optional
  framework peers — chase-ledger residents, untouched by this crossing); kf pins value EXACT
  (4.0.0 → 5.0.0); atlas ACTIVE consumes the exact tuple (devDeps exact + peers ^7/^6/^4) with
  named chase sites: 3 TimingFunction sites (useCountUp.ts:47, useScrollTimeline.ts:44,
  useScrollLettering.ts:57 — IN-ATLAS-5 is the correction event) + `MorphSVG` via
  `@mkbabb/keyframes.js/engine` (buildMarkAnimation.ts:7 — the `./engine` subpath has a live
  external consumer); kf→value exposure = 47 importing files, `/css` dominant at 29 sites/39
  symbols (consumer signatures frozen by the parser program — parseStylesheet/collect*/
  ParseIssue never move); glass→value = 5 import statements. The crossing order: freeze →
  value 5.0.0 → kf 7.0.0 → atlas ranges → post-cut assertions.
- **Acceptance gates (born-RED by construction):** the **ERESOLVE proof matrix** — a scripted
  `npm install` matrix over the co-installing consumers (atlas, both demos) at the crossing
  versions. RED today/mid-crossing: installing a value@5 prerelease beside glass 7.0.0's
  published `^4` peer ERESOLVE-fails (this is the priced wedge, demonstrated, not assumed).
  GREEN = post-crossing full matrix installs clean at every consumer. PLUS: capability-diff
  green-with-tombstones on BOTH cuts (every capability removed by sibling programs — e.g.
  decompose PRUNE — carries its by-name tombstone in the 5.0.0 CHANGELOG); the kf 44-key
  engine mirror re-verified by EXECUTION; `npm view` version assertions; the T-census
  signature freeze check (`TimingFunction = (t: number) => number` at
  kf `constants/types.ts:45` unchanged, or IN-ATLAS-5 executed in the same window).
- **Dependencies:** F-PF-governance-02, -03, -04 (docket ratified — prunes are boundary
  cargo), -06; EXTERNAL: terminal waves of every surface-mutating sibling program (parser
  R-PARSER, color R-DELTAE..R-RAMP, structure dissolution/prunes) — this wave is LAST among
  breaking changes.
- **π/DELTA:** none directly (demo-visible changes ride their owning programs' obligations).
- **Model routing:** Fable orchestrates the crossing + adjudicates any mid-crossing surprise;
  Opus executes the mechanical chase edits from the pre-written ledgers.

### F-PF-governance-08 — Governance close: zero-drop audit + docket ratification + boundary go/no-go
- **Repo:** value.js (program close).
- **Intent:** The close-class-lie firewall for the whole program: prove every input row landed;
  present the docket as one sheet; rule boundary readiness. Nothing counted done that is
  partial — folding is a decision; every partial/banked/abandoned item gets a terminal
  disposition (folded into a named wave / banked with a named re-trigger / retired with
  rationale).
- **Deliverables:** the row-inventory audit (§5's landing map re-walked against P0–P6 + C1–C23
  + the L1 §2–§8 mandates, at close-time state); the ratified §3 docket with owner rulings
  recorded; the boundary go/no-go memo (gates 02/03/04/06 green or named-red-with-owner-
  acceptance); disease-row screen (any chronic that has ridden 2+ closes un-decided gets its
  own deciding wave — none known in-program at formation; the screen proves it).
- **Acceptance gates:** two consecutive clean registry passes (the §0 stability criterion);
  RED = any inventory row without a named landing (wave / gate / registry row /
  owner-decision row), any docket row unruled, any close-lie pattern found (vacuous-green
  gate, declared capture missing on disk, masked fallback, re-booked chronic).
- **Dependencies:** all F-PF-governance waves (terminal).
- **π/DELTA:** none.
- **Model routing:** Fable (the audit is adversarial adjudication; thrice-reviewed per C20 —
  two skeptics assuming the close is a lie, one adjudicator).

---

## §3 — THE OWNER-DECISION DOCKET (single sheet; surfaces via F-PF-governance-04, ratifies via -08)

Every row: the record state, the cost, the ask. Trichotomy: intact record → owner decides;
refuted record → shield pierced; fence ruling → cite-to-overturn.

| # | Row | Repo/zone (LOC) | Record state | The decision asked |
|---|---|---|---|---|
| OD-1 | flip | kf orchestration/flip (176) | EP-3 PATH-B decided-terminal, INTACT | keep vs prune; auto-flip trigger never fired |
| OD-2 | draw-svg | kf svg/draw-svg (~194) | EP-3 PATH-B intact; atlas hits prose-only but record holds a real historical live-proof | keep vs prune |
| OD-3 | physics/morph | kf physics (in 2,552 zone) | rides flip's PATH-B; glass `MorphRect` TYPE-only edge | keep vs prune (couple to OD-1) |
| OD-4 | scroll/ | kf scroll (1,233) | K.W9 book + compile-wired + native fast lane; **K-1 fence: cite-to-overturn with new Baseline evidence** | keep (default) vs overturn-and-prune |
| OD-5 | ingest/ | kf ingest (835) | K.W8 book intact; zero consumption disclosed | the round-trip thesis is the owner's call |
| OD-6 | internal/ | kf internal (535; **11 importers measured**) | owner's verbatim dislike = the mandate; LT-10's cost census stands (superseded taste ruling named per G5′) | RESTRUCTURE shape (not prune — every file consumed); which target layout |
| OD-7 | R-HDR | value src/css | the 11-day `ictcp()`/`jzazbz()` parse drop | restore vs the CSS-native-only law |
| OD-8 | R-SPRING-GRAMMAR | value vs kf | solver ownership SETTLED kf (K F6.6 fence); grammar ownership OPEN, leaning value (CSS-spec territory) | who owns `spring()` grammar |
| OD-9 | R-EVAL | value src/css | WEAK candidate per P2.2 | calc/math static evaluator vs DOM-resolution status quo |
| OD-10 | api/ extract-vs-stay | value api/ (125 files) | P3.2 says EXTRACT; **C7 (later, addenda-WIN) says STAYS at `/api`** | ratify STAY (default per addenda precedence) and retire the extract row with rationale, or re-rule |
| OD-11 | easing D13 rider | value easing.ts | halved-curve rider from D13 | restore-or-tombstone |
| OD-12 | glass peer strategy | glass-ui package.json | wedge is ERESOLVE-hard either way | RANGE-WIDEN `^6\|\|^7` + `^4\|\|^5` as glass minor (program recommendation, de-risks the crossing) vs hard peer bump |
| OD-13 | R-CONTRAST republish | value src/color | named in P2.2 row 8 | WCAG-metrics republish alongside `contrast-color()` grammar |
| VIS-1 | oscillator (visibility, not decision) | kf physics/oscillator (~150) | record REFUTED — published-surface.md:44's both named consumers FALSE on disk; shield PIERCED | prune proceeds under the pierced shield + record-correction rider unless the owner objects |

Prune riders proceeding WITHOUT docket rows (unilateral, evidence-complete, fence-clean):
kf split-text (486; casualty = split-a11y oracle, named) · kf motion-path (~180) ·
value transform/decompose.ts (609; ZERO consumers on all four trees — structure program
executes, governance carries the tombstone at the boundary) · value quantize DEMOTE-to-demo
(demo-only on all four trees).

---

## §4 — THE CROSS-REPO WAVE MAP

| Repo | What crosses | Vehicle | Channel |
|---|---|---|---|
| keyframes.js | capability-diff gate · kf-7 co-land · scar deletions · easing consume-vs-ratify · zone-docket outcomes · proof:publish consumer-claim rule | F-PF-gov-03/-04/-07 | `VALUEJS-INBOUND-*` + INBOUND-LEDGER (P4.5) |
| glass-ui | peer widen/bump (OD-12) · batched root defects (incl. the kf 15-row marks register) · shadcn-gap prototype specs (C5) | F-PF-gov-05/-06/-07 | active glass tranche `coordination/` (BJ at read; re-derive) |
| atlas (ACTIVE `p/totality`) | range/devDeps updates at the boundary · 3 TimingFunction chase sites (IN-ATLAS-5) · MorphSVG `./engine` continuity | F-PF-gov-07 | atlas chase ledger (pre-written, re-derived) |
| sci-report | crosses atomically at its OWN glass-7 consume | registry row (no wave — value W56 row rules the posture) | — |
| fourier-analysis | C7 API-isomorphism reference (value `/api` CRUD ↔ fourier's CRUD visualization API) — the API program's design input; governance provides the channel if fourier-side change emerges | sibling API program; dispatch on demand | fourier inbox, same INBOUND grammar |
| parse-that | consumption as published 1.0.0; needs → PT-E ask letters; **semver cap ≤1.1 forever** | F-PF-gov-06 | PT-E channel |
| bbnf-lang | C14 BBNF dual-definition is the parser program's; OUT of governance scope beyond the pin | — | — |

---

## §5 — THE LANDING MAP (every relevant letter/packet/addenda row → its landing; zero silent drops)

Legend: **[G-nn]** = lands in F-PF-governance-nn · **[DOCKET]** = §3 row · **[SIBLING:x]** =
routed to the named sibling program (explicit routing ≠ silent drop; the close wave audits
sibling receipt).

**L1 charter rows:**
- §0 model routing / verify-tier-served → every wave's routing note + `model_served` law [G-01..08]
- §0 tree pins (G0′) → §1 register [G-01]
- §2 parser waves (R-PARSER, bench witness, spec census) → [SIBLING:parser]; consumer-signature
  freeze + `/css` 29-site exposure priced in [G-07]
- §3 color program (R-DELTAE→R-GAMUT→R-INTO→R-RAMP ladder) → [SIBLING:color]; scar-deletion
  dispatch [G-03c]; R-INTO-rides-W56-never-forks → train law [G-06]
- §4 structure (flatten, subpaths dissolve, decompose PRUNE, quantize DEMOTE, api EXTRACT,
  isomorphism gates) → [SIBLING:structure]; api extract-vs-stay tension → [DOCKET OD-10];
  boundary tombstones for prunes [G-07]; anchors law [G-01]
- §4 demo/frontend + glass batching-release conditions → [G-05] (the batching law verbatim);
  audit itself [SIBLING:frontend]
- §5 zone dispositions as INPUT → [G-04] + [DOCKET]; zone-orphaned-test binding → rider
  clauses [G-04]; external-census standing discipline → rider evidence requirement [G-04]
- §6 ownership/co-land (ONE boundary; internal-until; no atlas catch-up; deps STRIP not bump)
  → [G-06]/[G-07]/[G-02]
- §7 edicts: tombstone law → [G-02]/[G-03a]; G0′ → [G-01]; re-derive anchors → [G-01]; phase
  labels → charter note (this program = formation-phase output; its waves bind implementation);
  chronics/disease-rows/partials/terminal dispositions → [G-08]; prompt-recap → this §5 itself,
  audited at [G-08]
- §8 thrice method → [G-08] close runs thrice; docket briefs thrice-checked [G-04]
- §9 return contract (docket as single sheet; zero drops vs row inventory) → §3 + [G-08]

**L2 packet rows:**
- P0.1 declaration≠execution → routing notes + `model_served` [all waves]
- P0.2 r1 refutations: row 1 (wedge HARD) → [G-07 price sheet]; row 3 (strip not lockstep) →
  [G-02c]; row 4 (no atlas catch-up) → [G-06e]; rows 2/5 → [SIBLING:parser]; rows 6–14, 16–18
  (zone/gate verdicts) → [G-04] inputs + [SIBLING:apparatus]; row 15 (single-sided loss) →
  [SIBLING:color] premise, tombstone taxonomy [G-02]
- P1.4 easing boundary row → [G-03d]; P1.5 defect-family register → [G-01 registry axis];
  P1.6 decree (readopt as published; internal work OUT) → [G-06a cap + PT-E routing]
- P2.1 kf scars → [G-03c]; no-advocate⇒no-tombstone mechanism → [G-02a birth certificate]
- P2.2 rows 1–5,6–9,13,14 → [SIBLING:color/parser]; row 10 (R-HDR) → [DOCKET OD-7]; row 11
  (R-SPRING-GRAMMAR) → [DOCKET OD-8]; row 12 (R-EVAL) → [DOCKET OD-9]; row 8's republish
  decision → [DOCKET OD-13]; tombstones-RIGHTLY list → [G-02] taxonomy (never re-litigate)
- P3.1 table whole → [G-04] + [DOCKET OD-1..6, VIS-1] + prune riders; shrink notes
  (emit-backward `compileToViewTransition` demo=0, play-lifecycle recombine, presets breadth)
  → [SIBLING:structure via G-03 channel]
- P3.2 table whole → deps strip [G-02c]; decompose/quantize/subpaths/isomorphism
  [SIBLING:structure]; api [DOCKET OD-10]; e2e [SIBLING:apparatus]; PNGs/demo-tests
  [SIBLING:structure]
- P3.3 rows 1–8 (kf gates program) → [SIBLING:apparatus], dispatched via [G-03 channel];
  row 7 sequencing law (MR2/MR4 first) → [G-06e]; lighthouse-mask lesson → the selftest
  clause [G-03a]
- P3.4 rows: 1,2,3,5 → [SIBLING:apparatus/parser]; row 4 (manifest gate) → [G-02b]; row 6
  (capability-diff) → [G-02a]
- P4.1 fence pack → [G-07] price sheet (T-census, 44-key mirror, exports `.`+`./engine`,
  immutable tags, depcruise leaf-key move rider, scenes/precepts read-only)
- P4.2 whole → [G-02c]/[G-06]/[G-07]
- P4.3 anchors → [G-01] (re-derived: 9 exact / 3 drifted, sweep §3)
- P4.4 G5′ → [G-01] rider (amend-not-parallel; LT-10/LT-16 named)
- P4.5 → [G-03]
- P5: SCI-1/D54/W56 → [G-06c]; D-GAP-6 → [G-06c rider]; §D name-a-code re-open + RF-18 →
  registry rows [G-01]; PT-E → [G-06a routing]; kf R2-07/W9 staged at `b920b190` (branch
  verified EXISTS local+origin) → [SIBLING:apparatus via G-03]; CH-05 fold → same; EP-3/K.W8/
  K.W9/F6 → [DOCKET] record states; FOLD-FORWARD marks register → [G-05 batch ledger];
  W53/W55/W56 vehicles → [G-06] laws; oscillator doc-truth → [G-04] rider + gate-rule dispatch
- P6 first actions (row the letters, verify mirrors, open registry, zero drops) → [G-01]/[G-08]

**Addenda rows:**
- C1/C15 (parse-that bound, ≤1.1) → [G-06a]; C16 (isolation) → honored (this file is the only
  write; armB-only); C17 (routing) → per-wave notes; C5 (shadcn abrogation) → [G-05] channel
  (+ [SIBLING:frontend] census); C7 (api stays; fourier isomorphism) → [DOCKET OD-10] + §4 map;
  C8 (mega-tranche scale) → this program contributes 8 of the 50+; C20 (thrice) → [G-04]/[G-08];
  C21 (KISS/parsimony) → the 8-wave cut itself; C23 (union mandate) → this arm's charter.
- C2/C3/C4/C10/C22 (mobile easing selector, mobile toolbar, kf demo mobile, BREATH OF LIFE,
  frontend totality) → [SIBLING:frontend] (named routing; governance provides π/DELTA
  discipline via [G-05] for any glass-bound outputs). C6 (routing/state) · C12 (full spec) ·
  C13 (color) · C14 (dual parser) → [SIBLING:parser/color/API]. C18/C19 (meta-audit arms) →
  probe/audit arms, outside this program.

No row of the canon relevant to governance lands nowhere; every routed row names its sibling,
and F-PF-governance-08 audits sibling receipt before close.

---

*— armB / PF-governance seat, 2026-07-19. Written under the isolation law: this file is the
seat's sole write. Model: verified from own system prompt as `claude-fable-5`.*
