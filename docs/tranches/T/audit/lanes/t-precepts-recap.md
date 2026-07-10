# t-precepts-recap — THE PRECEPTS RECAPITULATION

**Lane**: `t-precepts-recap` (development, doc-synthesis; ZERO product-code changes)
**Substrate**: `tranche-t` = master @ `cc4f4fa` (the S close, tag `tranche-s-close`)
**Charge**: recover the binding process/product precepts from CLAUDE.md + `S.md §13` +
`S/FINAL.md §7` + the memory-encoded standing rules; render them as the **draft `§Precepts`
section for the T charter**, each precept carrying its provenance cite; then ADD the two new
precepts S's *execution* minted (integration-row certification; repo-wide sweep in EVERY wave
gate). This artefact IS that draft — the charter author lifts §A–§E verbatim; §F is the
lane's finding ledger (evidence / root-cause / owner / cure direction).

The owner's own words are the ceiling (MANDATE §0): *"recapitulate our original prompts, plans,
and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches… NO legacy
code."* Every precept below is a codification of a law the owner or the tranche record already
minted; none is invented here. Where the mandate's own edicts (E-1…E-7) restate a standing
precept, the recap says so and treats the mandate line as the re-ratification.

---

## §A — THE PROCESS PRECEPTS (how the work is done)

Each row: **statement** · **provenance** (the load-bearing cite) · **how it binds T**.

### PP-1 · NO WORKAROUNDS — gestalt-only, architectural transposition welcome
No quick solution, no patch-idea; every finding takes an idiomatic, gestalt approach, and
architectural transpositions in the sake of elegance / simplicity / performance are *necessary
and desirable*.
- **Provenance**: MANDATE §0 verbatim (`MANDATE-2026-07-06.md:58–60`); re-ratified as
  `E-3` (`MANDATE-2026-07-06.md:147`); CLAUDE.md's api-broken-rootcause REJECTION of the
  localhost-to-prod shim (`CLAUDE.md:19–25`) is this precept exercised.
- **Binds T**: every T finding's cure direction is a *gestalt*, never a patch (the lane
  charter's own rule); the whole tranche is development-only for exactly this reason —
  the design must be got right before code moves.

### PP-2 · NO FALLBACKS — the honest failure state, never a silent substitute
A precondition that isn't met produces a *designed, loud* state — never a silent fall-through
to a wrong-but-working path. The dev-misconfigured chip (loud console error + distinct UI
chip) over a silent prod fallback is the canonical instance; the Q10 mix re-author is
"Safari-true by construction, NO fallback path."
- **Provenance**: CLAUDE.md `dev:web-only` note "never a silent prod fallback" +
  the REJECTED localhost-to-ALLOWED_ORIGINS shim (`CLAUDE.md:12,19–25`); `S.md §12 Q10`
  disposition ("Safari-true by construction, NO fallback path").
- **Binds T**: **T-9** (the misconfigured banner) is this precept's live test — the banner
  removal must *keep* the honest-dev communication, not delete the signal; **T-27/T-1** boot
  animation must not silently desaturate through gray as a "safe" interpolation path.

### PP-3 · NO LEGACY — migrate the consumer at the root, never a compat shim
No backwards-compat layer, no dead-but-kept surface. When an API changes, the consumer is
migrated at the root; legacy code AND unused dependencies are excised.
- **Provenance**: MANDATE `E-3` "NO legacy code" (`:149`) + §0 (`:61`);
  `memory/feedback_no_backwards_compat.md` ("Never add legacy-compat shims; migrate the
  consumer to the new API at the root"); `S.md §12 Q3` BROADENED ("all legacy code and
  dependencies" → the W0-9 dependency-excision ledger).
- **Binds T**: `E-3` binds the whole tranche; T's colocation restructure (E-1) is a
  no-legacy move (no re-export shims left at old paths — the imports move to the new home).

### PP-4 · BREAKING CHANGES ARE FINE — always cut the major
When correctness or API honesty calls for a break, CUT THE MAJOR. Booking a known-wrong
surface forward out of version timidity is the anti-pattern. Semver itself is unchanged —
breaks are still majors, majors are still cheap.
- **Provenance**: `S.md §13` lesson 11 (`:315–318`); minted at the Q2 ruling
  (`RATIFICATION-2026-07-05.md §2.5:91–92` "Standing precept minted"; the owner's verbatim
  "fix now. Breaking changes are fine: always."); `S.md §12 Q2` disposition.
- **Binds T**: E-2's request packets against glass-ui + the forthcoming BG/BH cut, and any
  src touch T scopes, are freed to break — no shim budget.

### PP-5 · BOOKS, NEVER GATES — a trigger-gated event never blocks a wave
A book (a deferred cross-repo / trigger-gated event) is *recorded*, re-verified at close, and
handed to the successor — but NO wave gate ever reads the books table. A wave whose trigger
did not fire inside its window is not a miss.
- **Provenance**: `R/PROGRESS.md:65`; `S/FINAL.md §1` W8 row ("recorded as-is; books never
  gates") + `§5` header ("Books, never gates.").
- **Binds T**: the S.W8 5.0.0-adopt book + every open GLASSUI-S-ASK ride into T as books;
  E-2's request packets are *authored* (development) but their landing is book-gated on the
  producer cut — the T close must not treat an unfired producer cut as a T miss.

### PP-6 · CERTIFY IN THE AMENDED TREE — the artefact, not the discharge lane's word
A discharge / cure is certified against the amended text/tree itself, with every *new*
citation re-verified against the live tree — never against the lane's own claim that it
discharged. The close suite re-runs in the MERGED tree.
- **Provenance**: `R/FINAL.md §7` lesson 4 (`:232` "Certify in the amended text, never the
  discharge lane's word"); `S/audit/w2-close-artefacts.md:4` ("every row verified in the
  amended tree by an independent verifier"); `S/FINAL.md:29` merged-tree suite re-run.
- **Binds T**: T is development-only, but the ratification gate certifies the *corpus as
  written*, and every lane's provenance cite (this lane included) is re-checkable against
  the live tree — a cite that has drifted is a defect, not a footnote.

### PP-7 · NEVER SILENTLY REGOLDEN — every moved/changed fixture is enumerated
An output-changing cure enumerates its regoldened fixtures in the commit message; a golden is
never silently rewritten to make a test pass. (Corollary: a false compliance claim is
append-corrected on the record, not overwritten.)
- **Provenance**: `S/waves/S.W1.md:132` ("every moved fixture is enumerated in the commit
  message") + `:90`; `S/audit/w1-close-artefacts.md §Regoldened:60–66`; the W5
  false-compliance append-correction (`S/FINAL.md §1` W5 row).
- **Binds T**: any T implementation wave that changes a rendered/computed output (aurora
  path, title metrics, blob geometry) enumerates the golden delta; the π before/after
  archives are the visual equivalent.

### PP-8 · WAVE-GREEN ≠ REPO-GREEN — the repo-wide sweep joins EVERY wave gate  ⟵ NEW (S-minted)
"A wave closes green against its own gate" does not mean "the repo stays green." The standing
repo-wide sweeps — the ≤-cap check, the legacy grep, the `as any`/`as unknown as` ledger — run
in EVERY wave gate, not only at close. (Proven the hard way: W5 cured App.vue to 398, W7
re-breached it to 408 with no cap row, and only the close sweep caught it.)
- **Provenance**: `S.md §13` lesson 2 (`:289–293` "S's close gate re-runs the repo-wide
  sweeps… not just touched surfaces"); **elevated to a per-wave law** at `S/FINAL.md §7`
  lesson 5 (`:189–191` "The cap sweep belongs in EVERY wave gate, not only the close.").
- **Binds T**: **directly consequential for E-1** — the colocation grand edict *moves files
  en masse*, which recomputes every LoC cap; the sweep must run at every T wave gate that
  touches directory structure, and the src cohesion-caps (ledger rows, not a hard number)
  are recomputed after each lift, never trusted at their pre-move value.

### PP-9 · INTEGRATION-ROW CERTIFICATION — a MET must cite a test driving the INTEGRATED surface  ⟵ NEW (S-minted)
A gate row marked MET on an *integration* claim must cite a test that drives the integrated
surface end-to-end — not the units that compose it. (Proven: the W1 publish lane certified
ICtCp/Jzazbz "full spaces" while only the conversion *pairs* had shipped; the independent gate
caught it; the honest recovery shape is publish → BLOCKED → remediate → re-publish → re-gate.)
- **Provenance**: `S/FINAL.md §7` lesson 1 (`:172–176`); the W1 chain record
  (`S/FINAL.md §1` W1 row; `w1-close-artefacts.md §7`).
- **Binds T**: T-1/T-25/T-27 are load-sync + boot-animation *integration* findings — a T
  cure that claims "sync fixed" must cite a test driving the actual page-load ordering
  (the atmosphere-cold-load e2e is the seam), never merely the composable units in isolation.

### PP-10 · BOUNDED NUMBERS BEAT VIBES — and their baselines are recorded
Every budget carries its measured baseline; a re-baselining is an on-record event, never a
silent slackening of the gate.
- **Provenance**: `S.md §13` lesson 8 (`:308–309`); the RP-2 JS-eager re-baseline
  (`S/FINAL.md §6.2:153`, on-record 347.9 KiB vs ≤280 gate).
- **Binds T**: T-2/T-7's "1.5× golden scale" and T-8's blob perf-at-390 are numeric claims —
  each carries its measured before/after, and the 390px perf gate stays a hard gate (Q7).

### PP-11 · RESOLVE AGAINST THE LIVE TREE — HEAD-stamped producer claims
Cross-lane contradictions are resolved against the LIVE tree before either claim is elevated;
any present-tense claim about the producer (glass-ui) carries a HEAD-stamped verification or
is phrased as design intent. The producer moves daily — drift is a designed-for condition.
- **Provenance**: `S.md §13` lessons 1, 3, 9 (`:286–288, :294–297, :310–312`).
- **Binds T**: E-2's glass-ui audit + request packets cite glass-ui HEAD, spot-re-verified at
  wave-open; `../glass-ui` is READ-ONLY for T, so every producer-root finding is a *packet*,
  never an assumed-landed cure.

### PP-12 · TEST COMMENTS ARE NOT FILINGS — a known divergence gets a row or a fix
A known defect documented only in a test comment that carves *around* it is not filed. A
divergence gets a ledger row or a fix — never a carve-out comment alone.
- **Provenance**: `S.md §13` lesson 5 (`:301–303`, the `round()` crash + okhsl dodged band).
- **Binds T**: every T finding is a numbered ledger row with owner + cure — the lane format
  *is* this precept.

### PP-13 · THE GATE JUDGES THE RECALIBRATED BAR — mid-gate owner recalibration is routing authority
An owner ruling mid-gate is the routing authority (over even a triumvirate's iteration halt);
a landed overshoot is a calibration between poles, not a reversal, and the gate re-judges the
recalibrated bar.
- **Provenance**: `S/FINAL.md §7` lesson 3 (`:182–185`, the W6 variance re-judge `ae7112d`
  + the tuning pass `fe30d68`).
- **Binds T**: **T-26 IS this precept as a spec** — the variance target is now bracketed from
  BOTH sides (triad/0.82 "too strong" → analogous/0.7 "too muted"); T designs INSIDE the
  bracket and the bracket becomes the producer sizing-spec. T-2/T-7/T-10/T-23 are all owner
  recalibrations of landed S work — encoded as recalibrations, not bug-reversals.

### PP-14 · LANE-DEATH RECOVERY — recover the work-order from the journal, FINISH it
A session-limit / rate-limit lane death is recovered by reading the lane journal, auditing the
partials, and *finishing* them — never blind-commit, never discard. A dying lane's last
observation can be the tranche's most valuable finding.
- **Provenance**: `S.md §13` lesson 6 (`:304–305`); `S/FINAL.md §7` lesson 2 (`:177–181`,
  proven ×4; STEP-0 → GAP-ARM as the exemplar).
- **Binds T**: the mandate's own "batches of three agents… to avoid rate-limit walls"
  (`MANDATE §0:68`) is this precept as process; row-scoped path-scoped commits (this lane's
  own rule) make partial recovery clean.

### PP-15 · HARNESS WAITS MUST HARD-FAIL — a wait for the recorded state is a gate
A π/e2e harness wait for the very state a shot exists to record is a *gate*, not a courtesy;
a swallowed wait lets a defect hide inside a green run.
- **Provenance**: `S/FINAL.md §7` lesson 6 (`:192–194`, the `pi-w5b` swallowed wait that hid
  PI-DRIFT-1).
- **Binds T**: any T π-harness added for the boot/aurora/blob work (T-1/T-8/T-25/T-27) fails
  loudly if its state never arrives.

### PP-16 · THE NAMING LAW — gates-pass-goal-unmet closes `complete_with_misses`
Every miss is named; none is silently reconciled. Gates-pass-but-goal-unmet closes
`complete_with_misses`, never `complete`. A red probe at close is named per the no-workaround
law and routed, never patched in-place to green the gate.
- **Provenance**: `S/FINAL.md` verdict header (`:8–10`) + `§9` (RP-1/RP-2/PI-DRIFT-1 named).
- **Binds T**: T is development-only, so its "close" is the ratification gate — but the same
  honesty binds: any owner finding the T corpus cannot fully resolve is named as a folded
  book (E-4), not quietly dropped.

---

## §B — THE PRODUCT PRECEPTS (what ships)

### PR-1 · NO GOD MODULES — the LoC caps
`demo/` files (excluding the vendored `demo/@/components/ui/` shadcn tree) stay **≤ 400 LoC**;
`api/src` files stay **≤ 350 LoC**; `src/` has no god module (its caps are cohesion-ledger
rows, re-derived per wave, not a hard universal number). Never add to a god module — create a
focused module with proper encapsulation.
- **Provenance**: CLAUDE.md `:111` (demo ≤400), `:113` (api/src ≤350);
  `memory/feedback_no_god_modules.md`; the S per-wave cap ledger (`S.md §10.2` sweeps).
- **Binds T**: **E-1 (colocation) is a mass file-move — PR-1 is its hard gate**; every lift
  must land under-cap, and PP-8 runs the sweep at every wave that restructures a directory.

### PR-2 · ROOT-FIX AT THE PRODUCER — component-level items land in glass-ui (or herein)
Glass-ui is the design system. A component-level defect is fixed at the ROOT — a
variant/primitive in glass-ui — never a per-consumer patch in `demo/@/components/ui/`. Reuse
an existing component-type name (a Tabs variant, not a new SegmentedControl).
- **Provenance**: MANDATE `E-2` (`:145–146` "all component-level items at the ROOT — glass-ui
  or herein") + §0 (`:52–54`); `memory/feedback_glass_ui_first_class.md`; CLAUDE.md glass-ui
  §3.4 pin policy.
- **Binds T**: **the routing spine of the whole tranche** — every T finding is triaged
  demo / producer / joint / src (this lane's own owner field). T-20 (Tabs pilling) is the
  producer-root exemplar; E-2's request packets are the formalized channel.

### PR-3 · ZERO PER-INSTANCE OVERRIDES — style at the root component level
Style changes land at the shadcn / glass-ui root component level, not as per-instance
overrides scattered across consumers. Configurable via a token, not a hardcoded per-site value.
- **Provenance**: `memory/feedback_root_styling.md` ("Style changes at shadcn root component
  level, not per-instance overrides"); `memory/feedback_select_font.md` (font via token, not
  hardcoded mono); the S "ONE token, composed everywhere" pattern (`--alpha-checker`,
  `S/FINAL.md §4` ruling 5).
- **Binds T**: T-24 (the gray/black/white consistency audit) and T-18 (inconsistent glass-card
  backgrounds) are PR-3 defects — the cure is ONE neutral token slate consumed everywhere,
  never per-card color literals.

### PR-4 · ERROR ≠ EMPTY (and loading ≠ empty) — fail-explicit is its own register
An error state is visually and semantically distinct from an empty state; a backend-down
surface never silently costumes itself as "nothing here." Loading is not the eternal-skeleton
class either.
- **Provenance**: `S/FINAL.md §1` W5 row ("error ≠ empty; Q6 true-empty"); `S/audit/
  SYNTHESIS.md:132` ("Fail-explicit becomes a design register too"); `S/waves/S.W5.md:107`
  ("loading ≠ empty, and error ≠ empty"); Q6 RATIFIED-NARROWED (true-empty keeps the plate;
  error speaks the plain register).
- **Binds T**: **T-9** (the removed banner + "why does the backend not work") is exactly the
  error-register question — the honest-dev state (PP-2) must read as an explicit failure,
  distinct from an empty roster.

### PR-5 · ONE INK FOR TYPE — letterforms speak one ink; hue lives on color-data surfaces
Letterforms speak ONE ink — an L/C ladder on the single accent hue, everywhere headings
render. Hue-variation belongs to color-DATA surfaces (dots, ramps, palette strips), never to
type. (The three-voice / display-voice law is the register scaffold; this is its color clause.)
- **Provenance**: `S.md §12 Q4` disposition (`:273` "letterforms speak one ink; hue-variation
  belongs to color-data surfaces — never to type") + Q5 (`:274`, display voice ×9 panes);
  `S/audit/SYNTHESIS.md:276` (W4-8 "the register boundary, stated").
- **Binds T**: **T-10 is an owner OVERRULE of PR-5's reach** — "Only 'Palettes' should be
  rainbow; the rest white/black" partially reverses W7-4's one-voice menu; encode it as an
  explicit owner overrule (MANDATE §3), NOT a bug against PR-5. T-2 (title metrics) rides
  the same display-voice scaffold at a new size.

### PR-6 · MINIMIZE `as any` / `as unknown as` — typed narrowing + branded nominal types
`src/` holds **0** real `as any`; the `as unknown as` sites are one accepted irreducible
erasure class (Color<T> generic-component erasure + the DOM CSSStyleDeclaration boundary),
each with a load-bearing inline comment. The count is *regenerable, not hardcoded* (grep is
the source of truth). `api/src`: 0 `as any`, 1 `as unknown as`.
- **Provenance**: CLAUDE.md conventions (`:106`, the full as-any discipline paragraph);
  `S/FINAL.md §2` ("the `as any`/`as unknown as` ledger regenerated and matches CLAUDE.md
  exactly").
- **Binds T**: any src touch T scopes preserves the discipline; the ledger is re-regenerated
  (not re-hardcoded) at the T close sweep (PP-8).

### PR-7 · PRESERVE ANIMATIONS — never remove, only move or tokenize
Custom CSS animations are never deleted — only moved to their colocated/centralized home or
tokenized. Global keyframes centralize in `demo/@/styles/animations.css`; scoped keyframes
stay in their component.
- **Provenance**: `memory/feedback_preserve_animations.md`; MEMORY.md "Global keyframes
  centralized… scoped keyframes remain in components."
- **Binds T**: **E-1 (colocation) must honor PR-7** — moving a component moves its scoped
  keyframes WITH it, never drops them; T-14 (all card transitions onto liquid-glass easing)
  and T-22 (easing area) re-author curves but preserve the animation identities.

### PR-8 · NAMED EXPORTS ONLY, colocation is the directory law
Named exports only, no defaults (tree-shaking). Components are COLOCATED with their
sub-components / composables / skeletons / constants / styles, recursively; truly
module/global-level composables live in a `composables/` dir at their level; long-running dirs
break into common encapsulated modules; the backend gets the same treatment, abstracted for
its idioms.
- **Provenance**: CLAUDE.md conventions ("Named exports only, no defaults"); MANDATE `E-1`
  THE COLOCATION GRAND EDICT (`:140–144`) + §0 (`:69–78`).
- **Binds T**: **E-1 is a first-class T structural wave** — it interacts with PR-1 (caps),
  PR-7 (animations move with their component), and PP-3 (no legacy re-export shims at old
  paths). This is the single largest structural transposition T scopes.

---

## §C — THE TWO NEW PRECEPTS S's EXECUTION MINTED (charge-mandated)

The lane charge names these explicitly. Both are **process** precepts that graduated from
"loop lesson" to "standing gate law" *because S's own execution proved them the hard way* — so
they belong in the charter's binding §Precepts, not merely in a lessons appendix.

1. **PP-8 · Repo-wide sweep in EVERY wave gate** (wave-green ≠ repo-green). Minted from
   `S.md §13` lesson 2 and *elevated to a per-wave requirement* at `S/FINAL.md §7` lesson 5.
   The concrete failure it closes: a cap cured in one wave, re-breached in the next with no
   cap row, caught only at close. **For T this is load-bearing** — E-1 restructures
   directories wholesale, so the cap/legacy/as-any sweep must run at every wave gate that
   moves files, not just at ratification.

2. **PP-9 · Integration-row certification** (a MET on an integration claim cites a test
   driving the integrated surface). Minted at `S/FINAL.md §7` lesson 1 from the W1
   full-spaces-vs-pairs miss and its honest publish→BLOCKED→remediate→re-publish→re-gate
   recovery. **For T this binds the sync/boot findings** (T-1/T-25/T-27) — "sync fixed"
   must cite the page-load ordering seam, not the composable units.

Neither is yet encoded in `CLAUDE.md`'s standing conventions — they live only in the S tranche
record. **The T charter's §Precepts is the place they become standing** (see F-2, F-3).

---

## §D — HOW THE PRECEPT SET BINDS *THIS* TRANCHE (the crosswalk)

| Precept | The T finding(s) / edict it governs |
|---|---|
| PP-1 no-workaround | E-3; every finding's cure = a gestalt (charter-wide) |
| PP-2 no-fallback | T-9 (honest-dev state kept, banner gone); T-27 (no gray "safe" interp path) |
| PP-3 / PP-4 no-legacy / cut-the-major | E-3; E-2 packets free to break; E-1 leaves no re-export shims |
| PP-5 books-never-gates | S.W8 5.0.0-adopt + GLASSUI-S-ASKS ride in as books; unfired producer cut ≠ T miss |
| PP-6 certify-in-amended-tree | the ratification gate certifies the corpus as written; cites re-checkable |
| PP-7 never-regolden | any output-changing T cure (aurora/titles/blob) enumerates its delta; π archives |
| **PP-8 repo-wide sweep / wave** | **E-1 mass file-move recomputes caps → sweep at every restructure gate** |
| **PP-9 integration-row cert** | **T-1/T-25/T-27 sync/boot "fixed" cites the load-ordering seam** |
| PP-13 recalibrated-bar | **T-26** (variance bracket = sizing spec); T-2/T-7/T-10/T-23 = owner recalibrations |
| PR-1 no-god-module caps | E-1's hard gate; every lift lands under-cap |
| PR-2 root-fix-at-producer | the demo/producer/joint/src triage on EVERY finding; T-20 the exemplar; E-2 the channel |
| PR-3 zero-per-instance | T-24 (neutral consistency audit); T-18 (card-bg inconsistency) = ONE token slate |
| PR-4 error≠empty | T-9 (backend-down reads as explicit failure) |
| PR-5 one-ink-for-type | T-10 encoded as an owner OVERRULE, not a PR-5 bug; T-2 rides the display voice |
| PR-7 preserve-animations | E-1 moves scoped keyframes with their component; T-14/T-22 re-author curves, keep identities |
| PR-8 colocation | **E-1 = the tranche's largest structural transposition** |

The E-4 obligation ("ALL deferred items folded into THIS tranche") is itself governed by PP-5:
the folded items arrive as *books discharged into T waves*, and PP-5's "re-verify at close"
becomes T's E-5 ("all owner prompts recapped and verified addressed").

---

## §E — THE COMPACT PRECEPT LEDGER (for the charter's quick-reference)

| ID | Precept (one line) | Kind | Provenance |
|---|---|---|---|
| PP-1 | No workarounds — gestalt-only, transposition welcome | process | MANDATE §0/E-3; CLAUDE.md api-rootcause |
| PP-2 | No fallbacks — the honest failure state | process | CLAUDE.md dev:web-only; S §12 Q10 |
| PP-3 | No legacy — migrate at the root, no shim | process | E-3; feedback_no_backwards_compat; Q3 |
| PP-4 | Breaking changes fine — cut the major | process | S §13.11; RATIFICATION §2.5; Q2 |
| PP-5 | Books, never gates | process | R PROGRESS:65; S FINAL §1-W8/§5 |
| PP-6 | Certify in the amended tree | process | R FINAL §7.4; w2-close:4; FINAL:29 |
| PP-7 | Never silently regolden | process | S.W1:132; w1-close §Regoldened |
| **PP-8** | **Repo-wide sweep in EVERY wave gate** (NEW) | process | **S §13.2 → S FINAL §7.5** |
| **PP-9** | **Integration-row MET cites the integrated surface** (NEW) | process | **S FINAL §7.1** |
| PP-10 | Bounded numbers + recorded baselines | process | S §13.8; FINAL §6.2 RP-2 |
| PP-11 | Resolve against the live tree; HEAD-stamp producer claims | process | S §13.1/3/9 |
| PP-12 | Test comments are not filings | process | S §13.5 |
| PP-13 | The gate judges the recalibrated bar | process | S FINAL §7.3 |
| PP-14 | Lane-death recovery — finish from the journal | process | S §13.6; FINAL §7.2 |
| PP-15 | Harness waits must hard-fail | process | S FINAL §7.6 |
| PP-16 | The naming law — misses named, never silently reconciled | process | S FINAL verdict header |
| PR-1 | No god modules — demo ≤400 / api ≤350 / src cohesion-ledger | product | CLAUDE.md:111,113; feedback_no_god_modules |
| PR-2 | Root-fix at the producer (glass-ui or herein) | product | E-2; feedback_glass_ui_first_class |
| PR-3 | Zero per-instance overrides — token at the root | product | feedback_root_styling; feedback_select_font |
| PR-4 | Error ≠ empty (loading ≠ empty) | product | S FINAL §1-W5; SYNTHESIS:132; Q6 |
| PR-5 | One ink for type; hue on color-data surfaces | product | S §12 Q4/Q5; SYNTHESIS:276 |
| PR-6 | Minimize as any / as unknown as; count regenerable | product | CLAUDE.md:106; S FINAL §2 |
| PR-7 | Preserve animations — move/tokenize, never delete | product | feedback_preserve_animations |
| PR-8 | Named exports only; colocation is the directory law | product | CLAUDE.md conventions; E-1 |

---

## §F — LANE FINDINGS (numbered; evidence · root-cause · owner · cure direction)

### F-1 · The precept set is fully recovered and re-ratified by the mandate itself
- **Evidence**: MANDATE `E-3` (`:147–149`) is a verbatim restatement of PP-1/PP-3
  ("NO quick solutions, NO workarounds… NO legacy code"); §0 (`:58–61`) is the owner minting
  it live. Every precept in §A/§B resolves to a live-tree cite (§E column 4), re-checked this
  lane.
- **Root-cause**: n/a — this is the recovery result. The precept corpus is *coherent* across
  CLAUDE.md, the S record, and the memory feedback files; no contradictions surfaced.
- **Owner**: joint (charter authors lift §A–§E).
- **Cure direction**: the T charter's `§Precepts` section IS §A–§E of this artefact,
  verbatim, with the crosswalk (§D) as its "how this tranche is bound" subsection. No new
  precept is invented; the section is a codification, per PP-1's own spirit.

### F-2 · PP-8 (repo-wide sweep in EVERY wave gate) is minted but NOT yet in CLAUDE.md — and E-1 makes it load-bearing
- **Evidence**: the law lives only in `S.md §13` lesson 2 + `S/FINAL.md §7` lesson 5
  (`:189–191`); CLAUDE.md's cap language (`:111,113`) states the caps but not the
  *every-wave-gate* obligation. E-1 (`MANDATE:140–144`) restructures every directory, which
  recomputes every LoC cap.
- **Root-cause**: the precept graduated from loop-lesson to gate-law inside S's execution; it
  never round-tripped back into the standing conventions doc.
- **Owner**: joint (charter must encode it as a T gate law; a later doc-truth pass folds it
  into CLAUDE.md conventions).
- **Cure direction**: the T charter's wave-gate template carries a mandatory row — "repo-wide
  sweep: caps (recomputed post-move) · legacy grep · as-any/as-unknown-as ledger regenerated"
  — on EVERY wave gate, not just close. Because E-1 moves files wholesale, the cap half is
  recomputed *after* each colocation lift and never trusted at its pre-move value. This is the
  single most likely law for a 32-lane fleet to violate (the W5→W7 App.vue re-breach is the
  cautionary precedent).

### F-3 · PP-9 (integration-row certification) is the correct gate-shape for T's sync/boot findings
- **Evidence**: `S/FINAL.md §7` lesson 1 (`:172–176`); T-1/T-25/T-27 are *integration*
  findings (load-ordering, boot animation, per-pick transition) whose "fixed" claim is only
  meaningful end-to-end. The standing atmosphere-cold-load e2e (`S/FINAL.md §6:146`) + the
  URL-precedence e2e are the existing seams.
- **Root-cause**: sync/boot bugs are emergent across the background/blob/hero-title/aurora
  composition — a per-unit green tells you nothing about arrival ordering.
- **Owner**: joint (charter binds the gate-shape; demo owns the seam-test).
- **Cure direction**: any T wave closing a sync/boot row cites a test driving the composed
  page-load ordering (extend the atmosphere-cold-load e2e to assert arrival cadence across all
  four elements), never merely `useAurora`/`useAtmosphereBoot` units in isolation. Encode PP-9
  as a named requirement on the T-1/T-25/T-27 wave rows.

### F-4 · PR-1's src cap is a *ledger-row* not a hard number — E-1 must recompute it, not assume it
- **Evidence**: CLAUDE.md fixes demo ≤400 (`:111`) and api ≤350 (`:113`) as hard numbers, but
  `src/` caps are cohesion-ledger rows (`S.md §10.2` records four recorded over-cap rows —
  `stylesheet.ts` 643, `color.ts` 696, etc. — each with a "decompose-stopped-short /
  cohesive-over-cap" rationale, not a universal ceiling).
- **Root-cause**: `src/` cohesion is judged per-module (a scanner-consolidation DRY win can be
  legitimately over 400); the demo/api caps are structural, the src caps are editorial.
- **Owner**: src (any T src touch); joint (E-1 restructure).
- **Cure direction**: E-1's src colocation (if it reaches `src/`) recomputes each module's
  cohesion-ledger row *after* the move and records the rationale in the commit — never inherits
  the pre-move judgement. The demo/api caps stay hard numbers under PP-8's per-wave sweep.

### F-5 · T-10 must be encoded as an owner OVERRULE of PR-5, not a bug — the corpus already flags the collision
- **Evidence**: MANDATE §3 explicitly lists "T-10 vs W7-4 (the landed one-voice/color-wheel-
  legend menu) — an owner overrule, not a bug" (`:163`); PR-5's provenance (Q4 disposition,
  `S.md:273`) established "one ink for type." T-10 says "Only 'Palettes' rainbow; the rest
  white/black."
- **Root-cause**: the owner is *narrowing* PR-5's reach for one deliberate chromatic moment —
  the same "hue belongs to a color-data surface" logic, applied at the menu's single
  palette-browse affordance.
- **Owner**: demo (the menu voice); joint (charter records the overrule).
- **Cure direction**: the T charter encodes T-10 as a scoped exception to PR-5 with its
  rationale on-record (the Palettes entry is the browse/color-data affordance; the rest are
  chrome → white/black), so a later pass does not "fix" it back to full one-voice. PR-5 stands
  unamended for type generally; the exception is named and bounded — exactly the
  RATIFICATION-narrowing shape (Q6 precedent).

### F-6 · Two precepts are the highest-risk for a 32-agent fleet: PP-5 (books≠gates) and PP-6 (certify-in-amended-tree)
- **Evidence**: `S/FINAL.md §1` W8 row (an unfired producer trigger recorded as-is, *not* a
  miss) + `R/FINAL.md §7.4` (certify against the amended text, not the lane's word). A
  parallel fleet naturally produces (a) lanes that want to gate on a producer cut they can't
  land, and (b) lanes that certify their own discharge.
- **Root-cause**: E-2 authors request-packets against a READ-ONLY producer whose 5.0.0 cut has
  NOT fired (`S/FINAL.md §5` — registry `latest=4.2.0`, no v5 tag); a lane could mis-file "not
  landed" as a T miss (violating PP-5), or claim a packet "addresses" a finding without a live
  re-check (violating PP-6).
- **Owner**: joint (charter must restate both prominently).
- **Cure direction**: the T charter's §Precepts foregrounds PP-5 and PP-6 in its opening; every
  producer-root finding (T-20 and the E-2 packet census) is a *book*, verified at the T close
  against the live producer HEAD (PP-11), never a gate; and the ratification gate certifies each
  lane's cure against the amended corpus + a live-tree re-check of its cites, never the lane's
  self-report.

---

## §G — SOURCES CONSULTED (provenance base, for re-verification)

- `docs/tranches/T/MANDATE-2026-07-06.md` — §0 verbatim, §2 edicts E-1..E-7, §3 interactions,
  finding table T-1..T-29.
- `CLAUDE.md` — Build/Test/Structure/Conventions; the dev:web-only honest-fallback note; the
  as-any discipline paragraph; the no-god-module caps (demo ≤400, api ≤350); §3.4 pin policy.
- `docs/tranches/S/S.md §12` (Q-TABLE Q1..Q11) + `§13` (process lessons 1–11).
- `docs/tranches/S/FINAL.md` — §1 per-wave verdicts, §2 sweeps, §4 owner rulings, §5 books
  table, §6 oracle slate, §7 process lessons (S's 6 additions), §8 residuals.
- `docs/tranches/S/audit/RATIFICATION-2026-07-05.md §2.5` — the "breaking changes are fine"
  standing precept minting.
- `docs/tranches/S/audit/SYNTHESIS.md` — the register-boundary (one-ink) statement; error≠empty.
- `docs/tranches/S/waves/S.W1.md`, `w1-close-artefacts.md`, `w2-close-artefacts.md` —
  never-silently-regolden + certify-in-amended-tree in practice.
- `docs/tranches/R/FINAL.md §7`, `R/PROGRESS.md:65` — certify-in-amended-text; books-never-gates.
- Memory feedback files (provenance for the product precepts): `feedback_no_backwards_compat`,
  `feedback_no_god_modules`, `feedback_root_styling`, `feedback_glass_ui_first_class`,
  `feedback_preserve_animations`, `feedback_select_font`, `feedback_kiss_no_contrivance`.
