# U — The gap-closure tranche: library-correctness · adopt · perf · a11y · canon · security · oracle-teeth · the owner-eye reds

**Tranche letter**: U — value.js's seventeenth tranche (arc A..T → U). T executes on branch
`tranche-t` (T.W8 remediation landing concurrently; not yet closed). The owner's 2026-07-12 order
opened U: *"Let's mark what's been done in T, and then fold those, propagate them, to a new
forthcoming tranche that will seek to close all noted gaps."* The mark landed
(`docs/tranches/T/audit/T-MARK-2026-07-12.md`); the propagation is this tranche.

**One-line thesis**: *T was a visual-taste campaign that certified the app the owner's eye
described; the post-T audit turned every OTHER lens on the tree — CI-teeth, library correctness,
performance, a11y beyond the dock, security, canon-truth — and found that a green CI proved almost
nothing, that the published `parseCSSValue`/`toString` ship real data-loss bugs the visual
campaign never looked at, and that a handful of owner-eye reds outlive T.W8. U closes all of it:
the library-correctness class first, the disease-class adopt, the shared-surface perf/CLS, the
a11y modalities T never ran, the canon/security/oracle hardening — and it inherits T.W8's terminal
state for the residual §2 reds, with a decided disposition for every finding and zero silent
drops.*

**The spec of record**: `audit/registry.md` — the converged finding-family registry (7 rounds,
32-agent steerable budget, two-consecutive-clean-passes convergence, STABLE 2026-07-12). It is the
governing evidence base; this charter distills and transcribes it. Where the two could diverge,
**the registry wins**, and above BOTH, **the owner's verbatim text wins over every encoding**
(§13.5 is the live instance — U-F29/U-F30 owner-ruled AMELIORATE).

**Mode**: PLANNING-ONLY. This campaign authors `docs/tranches/U/**` and makes **NO source edits,
runs NO fix**. The tranche is the deliverable, not the fix. Formation opens on T.W8's terminal
state; the design-loop (research → synthesize → prototype → critique → agglomerate) authors each
wave spec in the phase that follows this charter.

**Substrate**: branch `tranche-t` (U shares T's branch; T.W8 remediation lands commits
concurrently — every U commit is path-scoped to `docs/tranches/U/**` ONLY and pull-rebased first).
value.js **3.1.0** on the registry (`latest`). Siblings (read-only, `file:` deps): `../glass-ui`
labelled **5.0.0** on disk (npm 4.2.0, no v5 tag — USER-GATED; CI still pins `tranche/BG`) ·
`../keyframes.js` post-5.2.0 (unreleased). BOTH pin `@mkbabb/value.js '^3.1.0'` in peer+dev — the
two floors the library-correctness cut co-lands against (U-F77).

---

## §Mission

U closes the two gap classes T's visual campaign never addressed, plus the residue T.W8 does not
land:

1. **The library-correctness class** — the headline defect the whole audit surfaced: the
   published, README-usage-example `parseCSSValue` silently truncates every token after the first
   sub-value (`'1px solid red'` → `'1px'`), and colors from the flagship CSS Color 4/5 paths
   (`color-mix()`, relative-color) serialize their internal normalized `[0,1]` channels verbatim
   (`color-mix(in srgb, red 30%, blue).toString()` → the near-black `'rgb(0.3 0 0.7)'`). Both are
   **owner-ruled defects — AMELIORATE** (§13.5). Their serialization/contract siblings
   (U-F31/F32/F33) join by E-3 — one wave, born-RED per defect, no cherry-picking. These ship in
   published 3.1.0 and the T campaign never looked at them.

2. **The gate-and-infrastructure class** — a green CI is zero evidence any visual oracle or
   built-bundle perf gate passed (`page-load.spec.ts` is the SOLE hard e2e step; the whole
   `smoke`/`smoke-safari`/`smoke-perf` slate is `continue-on-error` or invoked by no workflow);
   the perf-ratio dist gate flakes ~50% even at idle; a deterministic mobile CLS 0.219 and an
   ~2× LCP are untracked W9-close ambushes; an authenticated impersonation token is
   dead-on-arrival behind a green-over-broken test; the canon docs predate the T.W1 reorg. None
   of this is taste — it is correctness the visual lens is blind to.

3. **The owner-eye residue** — the §2 still-reds (U-F5..F13) the owner's eye logged against
   MANDATE §0.5/0.6/0.7, most routed to T.W8/WR rows. U absorbs **whatever T.W8's running
   remediation does not land** — the visual-inheritance is W8-terminal-dependent (see below).

**Goal criterion.** Every noted gap in `audit/registry.md` — all 77 U-Fxx families + every chronic
+ every prompt-recap row — lands at its root or is explicitly folded/retired with rationale, in a
named wave, with zero silent drops. The library-correctness cut co-lands coherently against both
sibling peer floors. The gate slate gains teeth. The owner-eye residue is cured against a
real-GPU/owner-attested frame, never a headless assertion.

**Completion criterion.** `FINAL.md` walks the DISPOSITION-LEDGER row-by-row (zero drops); every
wave gate is evidence-backed and born-RED where it guards a LIVE defect; the library-correctness
publish decision is owner-held and taken WITH the landed fix; the real-GPU visual annex is
owner-attested. **PP-16** (the inherited T-era close precept): when every wave gate passes but the
wave's goal is not met, the wave/tranche closes `complete_with_misses` — not `complete` (goal unmet)
and not `blocked` (gates pass). It is the honest terminal for a producer-gated or attested-residual
close (e.g. the Q14 perf redemption inheriting to U.W-PERF).

---

## §Inherited edicts (bind the tranche — the owner's verbatim wins over every encoding)

The T-era owner edicts carry forward as U's binding law (`MANDATE-2026-07-06.md §E`):

- **E-1 THE COLOCATION GRAND EDICT** — components colocated recursively. LANDED by T.W1; its
  residue (U-F47, the color-pipeline spine reaching into a feature's internal composable + the
  barrel-less `palette-browser`) is U.W-DEMO's row.
- **E-2 THE PACKET SERIES → THE RELAY EDICT (2026-07-12, standing formation invariant)** — *"All
  component level and glass-ui level changes must be communicated to them directly, at the root, a
  fond."* EVERY U wave that touches a glass-ui component or the glass-ui-level contract (shared
  exports; the `mixColors`/`sampleColorRamp`/`color2` raw-channel convention; the aurora/blob/dock
  producer surfaces) RELAYS to the ACTIVE glass-ui **BH** tranche-dev inbox
  (`../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-<date>-<topic>.md`) at their HEAD,
  path-scoped, foreign-tree fence otherwise (see `[[feedback-glassui-bhbi-relay]]`). This is the
  STRUCTURAL resolution of the U-F30 consumer-coupling class (registry §28): glass-ui's direct
  consumers are coordinated through their dev process, not chased in value.js's audit. The
  U→glass-ui BH communiqué for THIS formation already LANDED (glass-ui HEAD `17e0f522`,
  `valuejs-inbox-2026-07-12-u-formation.md`; registry §28.3). U's cross-repo waves each carry a
  **RELAY row**.
- **E-3 NO quick solutions, NO workarounds, NO legacy shims** — idiomatic, gestalt approaches;
  architectural transposition for elegance / simplicity / performance is DESIRABLE. This binds the
  library-correctness fix to address the serialization/contract CLASS (not one symptom) and forbids
  a consumer CSS override for the U-F4 producer PRM-dock (a demo override would breach glass-ui-first).
- **E-4 ALL deferred items — chronic and recent — delineated and FOLDED INTO THIS TRANCHE.** The
  DISPOSITION-LEDGER IS E-4's discharge: every family + chronic + prompt-recap row gets a decided home.
- **E-5 ALL owner prompts/requests hitherto recapped and verified addressed.** The prompt-recap
  section of the ledger IS E-5's discharge; U-F18 (E-5's §0.7 addressed-half, structurally unmet at
  audit time) folds into the W8-terminal inheritance census.
- **E-6 PROCESS** — Fable + the frontend-design plugin for all design waves; opus/sonnet fanout.
  The designHeavy waves (U.W-A11Y, U.W-VISUAL) run under Fable+frontend-design.
- **E-7 THE HARDENING/CRITIQUE STAGE** — T.W8's terminal owner-certification package. U does NOT
  re-run it; U inherits its terminal state (below).

**THE PROBE-PARSIMONY EDICT (2026-07-12)** — *"Parsimonious usage of playwright and dev tools MCP,
as to not overwhelm context. Fastidious design and code analysis."* Static analysis first; live
probes only to confirm a formed hypothesis, via purpose-built scripts emitting compact summaries;
element-clipped over full-page; targeted, filtered DevTools calls. Binds every U lane.

**§13.5 OWNER RULING (verbatim, wins over every disposition-candidate)** — U-F29 and U-F30 flip
from disposition-candidate to **OWNER-RULED DEFECTS: AMELIORATE**. The design loop's question is no
longer "is it a bug?" (ruled) but "what is the correct amelioration shape?" The PUBLISH decision
(the version cut — U-F29's reshape is semver-loaded against glass-ui's `value ^3.1.0` peer floor)
is PRESENTED to the owner WITH the landed fix, never taken unilaterally.

---

## §The wave DAG

The registry §26 wave-shape seed, refined into ten named waves. Per-wave paired goal/completion,
item tables (file:line anchors + evidence lanes + gate shapes), born-RED gate specs, triumvirate
dispatch, and RELAY rows live in the wave docs authored in the phase after this charter; the
registry wins.

```
U.W-LIB ──────────────────► U.W-ADOPT ──┐
                                          ├──► U.W-PERF ──► U.W-CLOSE
U.W-VISUAL ──► U.W-A11Y ─────────────────┘         ▲
     └────────────────────────────────────────────┘
U.W-CANON ─┐
U.W-SEC  ──┼──────────────────────────────────────────────► U.W-CLOSE
U.W-ORACLE ┤
U.W-DEMO  ─┘
```

**The ten waves** (structural vs designHeavy per E-6):

| Wave | Title | designHeavy | dependsOn |
|---|---|---|---|
| **U.W-LIB** | THE LIBRARY-CORRECTNESS WAVE (U-F29/F30 owner-ruled + F31/F32/F33 + folds F34/F35/F74) | no (library-API design-loop, not frontend-design) | root |
| **U.W-ADOPT** | THE DISEASE WAVE — glass-ui 5.0.0 adopt + the lib-cut co-land (U-F2/F4/F13-producer/F28/F68/F77) | no | U.W-LIB (U-F77 co-land) + external glass-ui 5.0.0 trigger |
| **U.W-VISUAL** | THE OWNER-EYE STILL-REDS (U-F5..F13, T.W8 terminal-state inherited) | **yes** | external: T.W8 close (visual inheritance) |
| **U.W-A11Y** | THE A11Y HARDENING WAVE (U-F25/F26/F27/F56/F57/F58) | **yes** | U.W-VISUAL (shared picker-mount single-writer) |
| **U.W-PERF** | THE SHARED-SURFACE PERF WAVE (U-F3/F14/F16 + U-F76 mount-box ordering) | no | U.W-VISUAL, U.W-A11Y (U-F76), U.W-ADOPT (U-F3 LCP producer cut) |
| **U.W-CANON** | CANON · HYGIENE · BUILD-TOOLING · LEDGER-TRUTH (U-F17/F21/F22/F23/F24/F49/F50/F51/F52/F53/F63/F64/F65/F66/F69/F70/F71/F75) | no | root |
| **U.W-SEC** | THE SECURITY / API-RUNTIME WAVE (U-F36/F37/F38/F39/F40/F41/F67) | no | root |
| **U.W-ORACLE** | ORACLE / GATE / TEST INTEGRITY (U-F1/F6-oracle/F15/F42/F43/F44/F55-CI/F62/F72/F73) | no | root |
| **U.W-DEMO** | DEMO ARCHITECTURE (U-F45/F46/F47/F48) | no | root |
| **U.W-CLOSE** | CLOSE — zero-drop ledger walk · book re-probe · publish presentation · real-GPU annex attest (U-F61 attested-flags) | no | ALL |

**The cross-wave binds** (load-bearing sequencing laws — the registry's R-2/R-3/R-4 reconciliations
+ §28):

- **U-F77 — the lib-cut ⟷ adopt co-land, against BOTH `^3.1.0` peer floors.** U-F29's honest
  amelioration is semver-loaded; glass-ui pins `@mkbabb/value.js '^3.1.0'` (peer + dev) and
  keyframes.js pins `'^3.1.0'` (VERIFIED, registry §22) — a 4.0.0 cut strands TWO floors, not one.
  U.W-LIB authors the fix (born-RED per defect); U.W-ADOPT sequences the version-cut decision
  (owner-held) against both floors so the peer floors and the cut land coherently. LIB → ADOPT.

- **The `spectrum-walk` / `backward-color` convention co-migration** (registry §25/§28 — the
  STRUCTURAL resolution). U-F30's fix changes the `mixColors`/`sampleColorRamp`/`color2` OUTPUT
  convention that FOUR sibling surfaces read RAW, bypassing `toString`: glass-ui `spectrum-walk.ts`
  + keyframes `backward-color.ts` (color halves) and glass-ui `parseCSSColor` + keyframes
  `parseCSSValue` (parse halves). The resolution is NOT enumeration (a living-codebase moving
  target) but structural: (1) the design loop prefers the **invariant-preserving fix** (fix only
  the `toString`/serialize layer; a per-instance normalization-state brand is the greenfield
  candidate the prototype phase weighs against normalize-on-construct + co-migrate); (2) a
  **build-time re-enumeration born-RED** greps the THEN-CURRENT constellation for raw-channel
  readers and gates the chosen invariant against all of them at cut time; (3) the **owner relay**
  (E-2) coordinates the siblings' co-migration through their dev processes. U.W-LIB owns the
  invariant + the build-time gate; U.W-ADOPT owns the co-land; both carry RELAY rows.

- **U-F76 — the picker/readout mount-box ordering.** SIX findings edit ONE surface (the
  picker/readout plate mount) across three waves: U-F3 (the LCP element) + U-F16 (the CLS shifting
  node — the SAME element) live in U.W-PERF; U-F5 (blob bead collides the readout) + U-F9 (header
  spacing) live in U.W-VISUAL; U-F26 (dark accents on the controls) + U-F27 (control tap targets)
  live in U.W-A11Y. A reseat that changes the mount box RE-OPENS CLS — so the mount-changing edits
  (VISUAL reseats, A11Y target-size) settle FIRST, then U.W-PERF reserves the settled box and
  measures CLS/LCP over the final geometry. VISUAL → A11Y → PERF is the shared-surface single-writer
  chain; U-F76 is the ordering law that lives in U.W-PERF and binds all three.

---

## §The disposition law (zero silent drops)

Inherited from the registry law and E-4. Binding on the DISPOSITION-LEDGER and every wave:

- **Zero silent drops.** Every U-Fxx family (F1..F77) + every chronic row + every prompt-recap row
  (owner asks T-1..T-61, edicts E-1..E-7) gets a DECIDED disposition — **build / fold / retire**
  (or escalate, a sub-class of build that hands the owner a structural fact) — in a named wave.
  The ledger's enumeration method is stated in the ledger header so the ledger is itself auditable.
- **Re-booking is forbidden.** A family terminates in build / fold / retire / escalate with
  rationale; it may not ride to a further tranche un-decided.
- **The disease-row law.** A family that has ridden ≥2 closes un-decided is a DISEASE row and
  deciding it is a wave of its own. U-F2 (the glass-ui 5.0.0 adopt, ≥3 tranches) is the named
  disease → U.W-ADOPT is its own wave; U-F3 (Q14/RP-2, 3rd tranche) rides U.W-PERF as an escalate.
- **Build / fold / retire, no re-book:**
  - **build** — a fix lands in the named wave (born-RED where it guards a LIVE defect).
  - **fold** — the family merges into a sibling's remediation (named), no independent row.
  - **retire** — recorded so no successor re-opens it: the §8 zero-drop WINS T genuinely
    discharged, the round-closed coverage gaps (U-F59/F60), the harness-cured U-F20, the stale
    labels/orphans.

---

## §W8-terminal-state inheritance (the visual-inheritance is W8-dependent)

The §2 owner-eye still-reds (U-F5..F13) were mostly routed to T.W8 / the WR-1..11 remediation rows,
which land CONCURRENTLY with this formation (T.W8 is mid-flight, 8/11 passes filed at audit time).
**U.W-VISUAL's row-set is therefore W8-TERMINAL-DEPENDENT**: it is scoped once T.W8 CLOSES, from
the still-reds T.W8's running remediation does NOT land. The inheritance census (U-F18 = E-5's
§0.7 addressed-half; U-F19 = the W8 live-defect residue) routes the un-landed residue BY NAME:

- T-56 near-black ramp wreck (the WR-8 cure) → the U-F6 ramp-half → U.W-VISUAL (color) + the
  Q5-ramp-resolver correctness feeds the U-F6-adjacent library reasoning; its oracle-half → U.W-ORACLE.
- error-detail 2.72:1 sub-3:1 contrast + the dark-accent breaches → the U-F26 class → U.W-A11Y.
- T-53 dark caster (`--shadow-color` → 50%-α cream slab) + AB-1 About-KaTeX scope-dead → U.W-VISUAL
  (material) / U.W-CANON (the KaTeX boot-scope half, if a build seam).
- the eight carried-forward T producer reds (relayed in the BH communiqué §2b) → U.W-ADOPT's
  BI-acceptance-constraint list + the RELAY row.

U does NOT re-litigate T.W8's landed cures; it takes the terminal W8 state as fact and absorbs only
what W8 leaves red, with a named home for each (the ledger's W8-inheritance section).

---

## §The real-GPU annex (U-F54 — owner-attested)

The headed-GPU oracle slate (O-1..O-26 live legs — the tranche-T core deliverable) was NEVER
executed across all seven audit rounds: the headless env forces SwiftShader (the static CSS
placeholder → migration ≈ 0 forever; O-3's chroma assertion SKIPS on software-GL), and the registry
itself logged TWO demonstrated headless false-reds (the U-F4 `overture.css` red herring + the U-F13
PRM confound). Pretending a headless assertion verifies a GPU frame is the close-class lie the
charter forbids.

Therefore U carries a **real-GPU visual annex**, exactly as S and T did: the §2 still-red
remediation gates (U.W-VISUAL) and the U-F7 scene-transition (the thrice-red, MANDATE-escalated
T-58 mandate) are born-RED **against a real-GPU or owner-attested frame, NEVER a headless
assertion**. The annex is **owner-attested** (or a headed-CI lane if one is stood up); it is not
chased further in the headless env. This is a formation-time acknowledgement, recorded here so no
successor reader mistakes the annex for an un-run gate.

---

**Precedence chain**: the owner's verbatim text (§13.5 + any live ruling) → `audit/registry.md`
(the converged spec) → this charter (`U.md`) → the wave docs. Downstream never overrides upstream.
