# U — PROGRESS

**Status board.** U is **FORMED — CONVERGED, awaiting owner ratification** (2026-07-12). The evidence
base — `audit/registry.md`, the 7-round converged finding-family registry — is STABLE
(two-consecutive-clean-passes convergence; the U→glass-ui BH communiqué discharged the §28.3 relay at
glass-ui `17e0f522`). The full formation spine is authored: the charter (`U.md`), this board, the
zero-silent-drop `DISPOSITION-LEDGER.md` (77 families + every chronic + every prompt-recap row
DECIDED), and **all ten wave specs** (`waves/U.W-*.md` — LIB · ADOPT · VISUAL · A11Y · PERF · CANON ·
SEC · ORACLE · DEMO · CLOSE, each with born-RED gates, π/DELTA obligations, RELAY rows, and
dispositions). The **integration + fresh-adversary critique pass is FILED** (`FORMATION-VERDICT.md`,
verdict **CONVERGED**): zero silent drops (all F1..F77 owned once), coherent backward-only DAG,
born-RED honesty doubly enforced (no pretend-headless flip, no fabricated red), RELAY rows on every
glass-ui-touching wave, π/DELTA on every visual claim; four NOTE-level residuals named, none blocking.
**NEXT**: owner ratification, then the design-loop executes each wave on T.W8's terminal state.

**Mode**: PLANNING-ONLY — U authors `docs/tranches/U/**` and makes NO source edits, runs NO fix.
Commits path-scope to `docs/tranches/U/**` ONLY; T.W8 remediation lands concurrently on the shared
`tranche-t` branch → every U commit pull-rebases first.

**The precedence chain**: owner verbatim (§13.5) → `audit/registry.md` → `U.md` → the wave docs.

---

## The wave DAG

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

Cross-wave binds (the sequencing laws): **U-F77** LIB→ADOPT co-land (both `^3.1.0` peer floors +
the spectrum-walk/backward-color convention co-migration) · **U-F76** VISUAL→A11Y→PERF shared
picker-mount ordering (a reseat that changes the mount box re-opens CLS) · **U-F3** ADOPT→PERF
(the LCP cure rides the producer payload cut).

---

## The wave slate

| Wave | Title | Families | designHeavy | dependsOn | Status | Gate summary (placeholder — the wave doc is authoritative) |
|---|---|---|---|---|---|---|
| **U.W-LIB** | THE LIBRARY-CORRECTNESS WAVE | F29 · F30 · F31 · F32 · F33 · folds F34/F35/F74 | no | root | PENDING | born-RED per defect (F29 truncation · F30 normalized-serialize + relative-color leak · F31/F32/F33), each driving the convention-sensitive consumer surfaces; F30 fix at the mix/relative OUTPUT locus with a direct-path-unchanged guard; the build-time raw-channel re-enumeration born-RED; owner-held publish presented WITH the landed fix. |
| **U.W-ADOPT** | THE DISEASE WAVE (glass-ui 5.0.0 adopt + lib-cut co-land) | F2 · F4 · F13-producer · F28 · F68 · F77 | no | U.W-LIB + glass-ui 5.0.0 trigger | PENDING (trigger-gated) | the §1 design reds re-filed as EXPLICIT glass-ui BI-acceptance constraints; the verify-at-cut ledger vs a rebuilt dist; `^4→^5`; lock refresh; U-F77 co-land against BOTH `^3.1.0` floors; RELAY row (BH). Floats on the glass-ui cut. |
| **U.W-VISUAL** | THE OWNER-EYE STILL-REDS (T.W8 terminal-state inherited) | F5 · F6-ramp · F7 · F8 · F9 · F10 · F11 · F12 · F13-demo · (F19 residue) | **yes** | T.W8 close (external visual inheritance) | PENDING (W8-terminal-dependent) | row-set scoped once T.W8 CLOSES (from the still-reds W8's remediation does NOT land); born-RED against a real-GPU / owner-attested frame — NEVER a headless assertion (the U-F54 annex); Fable + frontend-design; RELAY rows for producer material (F8/F10/F13). |
| **U.W-A11Y** | THE A11Y HARDENING WAVE | F25 · F26 · F27 · F56 · F57 · F58 | **yes** | U.W-VISUAL (shared mount) | PENDING | gradient-stop focus affordance · dark-accent re-guard against the RENDERED tier · target-size + `aria-valuetext` · the authed surface eyeballed · forced-colors/prefers-contrast/SR/touch modalities · per-modality build-or-out-of-scope; Fable + frontend-design. |
| **U.W-PERF** | THE SHARED-SURFACE PERF WAVE | F3 · F14 · F16 · F76 | no | U.W-VISUAL, U.W-A11Y, U.W-ADOPT | PENDING | the U-F76 mount-box reservation over the SETTLED (reseated) geometry; CLS added to the PI-1 ledger + the pane-shell reflow cured; the perf-ratio flake floors re-anchored with real headroom; U-F3 LCP escalate (producer cut in-window or a ruled re-scope). W9's Q14 inherits F3/F14/F16. |
| **U.W-CANON** | CANON · HYGIENE · BUILD-TOOLING · LEDGER-TRUTH | F17 · F21 · F22 · F23 · F24 · F49 · F50 · F51 · F52 · F53 · F63 · F64 · F65 · F66 · F69 · F70 · F71 · F75 | no | root | PENDING | the honest §4 Q4-WELL amendment; ONE canon-sync (regenerable-count precept); the barrel-parity gate; single-sourced GroundRecord; the `/auth/` anchor; bloat/branch/scratch/worktree sweep; `.npmignore`/chunk-graph size gate; the parse-that doc-lie; zod orphan; dev-dep bumps; the precept label. |
| **U.W-SEC** | THE SECURITY / API-RUNTIME WAVE | F36 · F37 · F38 · F39 · F40 · F41 · F67 | no | root | PENDING | the impersonation `expiresAt` fix + a test that DRIVES the auth middleware; wire-or-delete the `MONGO_*` config-truth + the precept residual; SHA-256 tokens at rest; the CF-Pages security headers; the hono bump; F41 NCSU-origin escalate (deploy ceremony + re-verify). |
| **U.W-ORACLE** | ORACLE / GATE / TEST INTEGRITY | F1 · F6-oracle · F15 · F42 · F43 · F44 · F55-CI · F62 · F72 · F73 | no | root | PENDING | promote the CI slate to blocking (or an explicit owner soft-posture decision); the O-14 feasibility-leg law ("every guard-constant gets a feasibility leg"); own the 3 armed `test.fail()` + a headed-GPU annex or acknowledge; external-vector color anchors + the omitted Sharma pairs; move the slow build out of `beforeAll`. |
| **U.W-DEMO** | DEMO ARCHITECTURE | F45 · F46 · F47 · F48 | no | root | PENDING | relocate `resolveViewAccent` (break the near-cycle); single-source the session token + delete the dead teardown twin; move the color-pipeline primitive down + give `palette-browser` a barrel (E-1 residue); hoist the store to a singleton + const-extract + computed-predicate. |
| **U.W-CLOSE** | CLOSE | F61 (attested-flags) + the zero-drop ledger walk | no | ALL | PENDING | walk the DISPOSITION-LEDGER row-by-row (zero drops); re-probe every book live; flag the attested-not-verified claims (X2/CI-TBT/webhook); present the library-correctness publish decision WITH the landed fix; the real-GPU visual annex owner-attested; PP-16 (`complete_with_misses` if gates-pass-goal-unmet). |

**Retired / round-closed (no wave)**: U-F20 (harness token, cured at root) · U-F59 (unread sources
— read/run at round 4) · U-F60 (color-math — VERDICT SOUND) · U-F55-a11y-half (lighthouse a11y 1.0)
· the §8 zero-drop WINS (`DISPOSITION-LEDGER §D`).

---

## Gate summary (placeholder)

| Wave | Rounds | Gate rows | Result | Artefacts |
|---|---|---|---|---|
| U.W-LIB | — | — | PENDING | — |
| U.W-ADOPT | — | — | PENDING (trigger-gated) | — |
| U.W-VISUAL | — | — | PENDING (W8-terminal-dependent) | — |
| U.W-A11Y | — | — | PENDING | — |
| U.W-PERF | — | — | PENDING | — |
| U.W-CANON | — | — | PENDING | — |
| U.W-SEC | — | — | PENDING | — |
| U.W-ORACLE | — | — | PENDING | — |
| U.W-DEMO | — | — | PENDING | — |
| U.W-CLOSE | — | — | PENDING | — |

The per-wave paired goal/completion, item tables (file:line anchors + evidence lanes + born-RED gate
shapes), and RELAY rows are authored into the wave docs in the phase after this charter; the
registry wins where the two could diverge.

---

## Event log

| Date | Event |
|---|---|
| 2026-07-12 | **U FORMATION SPINE authored** — the charter (`U.md`), this board (`PROGRESS.md`), and the zero-silent-drop `DISPOSITION-LEDGER.md` (77 families + chronic + prompt-recap all DECIDED) written from the converged `audit/registry.md`. The ten-wave DAG defined (U.W-LIB · ADOPT · VISUAL · A11Y · PERF · CANON · SEC · ORACLE · DEMO · CLOSE); the three cross-wave binds encoded (U-F77 co-land · U-F76 mount-box ordering · U-F3 LCP-rides-adopt). Waves PENDING; the design-loop authors each spec next. |
| 2026-07-12 | **ALL TEN WAVE SPECS authored** — `waves/U.W-*.md` (LIB · PERF · VISUAL · CANON · A11Y · SEC · CANON · DEMO · ORACLE · CLOSE), each with paired goal/completion, item tables (file:line anchors), born-RED gate tables, π/DELTA obligations, RELAY rows, and per-family dispositions. |
| 2026-07-12 | **FORMATION INTEGRATION + FRESH-ADVERSARY CRITIQUE filed** — `FORMATION-VERDICT.md`, verdict **CONVERGED**. Integration verified: (1) zero silent drops (all F1..F77 owned exactly once; splits/census/annex/retire all named-homed); (2) coherent backward-only DAG (no wave depends on a later wave; the three cross-wave binds sequence coherently); (3) born-RED honesty doubly enforced (no pretend-headless flip for GPU visuals → the U-F54 annex; no fabricated red over sound code → born-GREEN U-F72/F73/LIB-G4); (4) RELAY rows on every glass-ui-touching wave + honest not-triggered declarations on the rest; (5) π/DELTA on every visual claim. Adversary: no E-3 breach, no §13.5/owner-verbatim contradiction, no family behind a hand-wave — the tranche SURVIVES. Four NOTE-level residuals named (keyframes pin line-drift → actual `:268`; the three-vs-four heading self-reconciled; F18/F19/F54 ledger→charter-section pointers executed in named waves; PP-16 inherited-not-defined). **Ready for owner ratification.** |
