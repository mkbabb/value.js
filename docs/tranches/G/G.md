# G — Type-system completion + architectural decomposition + invariant codification

**Tranche letter**: G (value.js repo; sixth tranche).
**Successor to**: F — value.js's "No deferrals" + post-W12 substrate hygiene + lerpLegacy retirement tranche. Closed at `docs/tranches/F/FINAL.md`; merged to master at `6b3a41b`; tagged `v0.8.0`.
**Branch**: `tranche-g` (off master HEAD `6b3a41b` post-F-merge).
**Open**: 2026-05-21.
**Precepts at open**: `68d9b20` (unchanged since D).
**Mode**: planning-only at open per the G-opening directive ("This is NOT an implementation phase. Tranche development only. Relay all carry-forward items to me for ratification.").

## §0 — Master HEAD provenance

G opens **off `6b3a41b` (F merge commit; v0.8.0 tag)**. Zero drift between F close + G open — verified at `audit/G-AUDIT-3 §3`.

## §1 — Thesis

The G-opening directive (verbatim in `G-PROMPTS.md §1`) declares:
- "DEEPLY audit with 6 agents in parallel"
- "NO quick solutions, NO workarounds: idiomatic, gestalt approaches"
- "NO legacy code"
- "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable"
- "Delineate any chronically deferred items and fold them into this new tranche"
- "Delineate any deferred items and fold them into this new tranche"
- "Recap ALL of our prompts and requests hitherto and ensure they've been addressed"
- "This is NOT an implementation phase. Tranche development only."
- **"Relay all carry-forward items to me for ratification"**

Per the 6-lane audit (`audit/G-AUDIT-1..6`), G's thesis decomposes into three axes:

### Axis 1 — Type-system completion (G2 invariant)

F.W1 Lane A retired the sole `@ts-ignore` in `src/` via the typed `Memoized<T>` wrapper. G extends that idiom to the **`as any` corpus**: 36 sites in `src/` across 12 files (G-AUDIT-1 §5; G-AUDIT-5 §1). Plus 11 `as unknown as` sites across 4 files. The G-AUDIT-5 §9 transposition cluster (G-OPP-2/3/4/5) targets **-29 sites** via 4 typed-wrapper introductions. The irreducible residue (~5) is external-library boundary casts (parse-that signatures, DOM event surfaces) — documented as policy, not silently carried.

### Axis 2 — Architectural decomposition (G3 invariant)

`src/units/color/utils.ts` is **1,430 LoC** — the lone post-F god-module (`feedback_no_god_modules.md` violation). G.W1 Lane B decomposes it into **9 focused modules** ≤ 350 LoC each (G-OPP-1; planning estimated 7 — see §2 G3 for the execution ratification). Pure file moves + named-export hygiene; downstream consumers unaffected because the barrel (`src/units/color/index.ts`) re-exports.

### Axis 3 — Invariant codification (G4 invariant)

F locked in `@deprecated=0` (F2) + `@ts-ignore=0` (F.W1 Lane A) + flat-dist/ dts shape (F.W3 Lane D) + bundle-size ≤ 145 KB (F.W3 Lane E) — but these are CI-gated only, not corpus-grep-script gated. G adds 3-4 proof scripts (SCRIPTS-1/2/3/4 per G-AUDIT-6 §5) that codify the F-thesis invariants as runtime-checkable artefacts:
- `proof:resolution` types-key probe extension (SCRIPTS-1, F.W3 Lane F successor).
- `proof:no-deprecated` (SCRIPTS-2, codifies F2).
- `proof:no-ts-ignore` (SCRIPTS-3, codifies F.W1 Lane A).
- `proof:as-any-budget` (SCRIPTS-4, codifies G2).

### Axis 4 — F-window oversight corrections

G-AUDIT-6 §3 surfaced a **CRITICAL defect**: `.github/workflows/node.js.yml:224` references `origin/main` while value.js's default branch is `master`. F.W3 Lane B's CHANGELOG-gate is **currently INERT**. G.W1 Lane A fixes this 1-line typo. Plus `api/CLAUDE.md` is missing references to `api/src/services/color/` + `api/src/services/session/` subdirs (G-AUDIT-6 §6 / DOCS-1 — F.W4 Lane 3 documented but didn't TIME-BIND). G.W1 Lane C folds.

### Axis 5 — Bounded cross-cutting improvements

Folded narrowly into G.W3 (CI/api/e2e/scripts hygiene wave):
- **API-1**: extend `withTransaction` to 4 cross-collection write sites (`deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`) — eliminates orphan-vote/flag/session partial-failure class.
- **API-2**: declare `"engines": {"node": ">=22"}` in `api/package.json`.
- **E2E-1**: add 1 mobile-walk spec (PaneSegmentedControl + dock).
- **CI-2**: add `npm pack --dry-run` step for publish-shape regression catch.

## §2 — Invariants G1-G4 + inheritance

G inherits A + B + D + E + F invariants verbatim. G1-G4 are the G-specific deltas:

### G1 — Relay before ratification (binding)

Per the G-opening directive's final clause ("Relay all carry-forward items to me for ratification"), every carry-forward item identified in G.W0 is **presented to the user with an explicit ratification ask BEFORE any execution-phase wave dispatches**. Strengthens F1 ("No deferrals as binding") by adding the user-as-explicit-decision-maker for the carry-forward dispositions.

Workflow: G.W0 closes with a **ratification ask block** in this `G.md` (§7 below) + in the `PROGRESS.md`. G.W1+ does not dispatch until user ratifies (or modifies) the proposed dispositions.

### G2 — `as any` corpus retires (target ≤ 5 in src/)

Sharpens F.W1 Lane A ("@ts-ignore=0"). The 36-site `as any` corpus in `src/` retires to ≤ 5 sites at G close. The irreducible ~5 are external-library boundary casts (parse-that, DOM events) — POLICY-documented in the relevant module's header comment + listed in `VENDOR-POLICY.md`-analogue section, not silently carried.

Pre-condition for the G.W2 typed strengthening lanes: G.W1 Lane B architectural decomposition complete (easier to type-strengthen 9 focused modules than 1 god-module).

### G3 — Color utils decomposition (9 focused modules ≤ 350 LoC each — ratified at G.W1 Lane B)

`src/units/color/utils.ts` (1,430 LoC) decomposes into a `conversions/` cluster + `dispatch.ts` per `feedback_no_god_modules.md`:
- `conversions/hex.ts` — hex parse + serialize.
- `conversions/kelvin.ts` — temperature ↔ RGB/XYZ.
- `conversions/cylindrical.ts` — HSL/HSV/HWB cluster.
- `conversions/lab.ts` — CIE Lab/LCH.
- `conversions/oklab.ts` — OKLab/OKLCH.
- `conversions/xyz-extended.ts` — RGB-family ↔ XYZ + matrices.
- `conversions/transfer.ts` — sRGB/AdobeRGB/ProPhoto/Rec2020 transfer functions.
- `conversions/direct.ts` — `directXxx` hot-path conversions.
- `dispatch.ts` — `color2()` + DIRECT_PATHS + `gamutMap` + dispatch glue.

**Execution ratification (G.W1 Lane B)**: planning estimated 7; execution ratified **9**. A cohesion-honest ≤ 350 LoC partition requires the lab/oklab split (which restores `audit/G-AUDIT-5 §2`'s original proposal — G.md's planning estimate had collapsed it) + the `direct.ts` extraction (a 7-module split forces `dispatch.ts` to 527 LoC, breaching the hard ≤ 350 sub-gate, which is itself the workaround the directive forbids). All 9 modules ≤ 350 LoC. At G.W1 close the max was `dispatch.ts` at 336; G.W2 Lane B's typed `DIRECT_PATHS` mapped-type grew it to 391 (a breach the G.W4 close audit caught — lanes 1 + 4), and G.W4 remediated it by relocating the `DIRECT_PATHS` table to its cohesion-honest home in `conversions/direct.ts` — **final max is `dispatch.ts` 312**. A `conversions/index.ts` aggregate barrel was also added (71 LoC; not counted as a decomposition module). The barrel (`src/units/color/index.ts`) re-exports all public functions — no consumer change. Tests pass unchanged.

### G4 — Invariant codification (4 new proof scripts)

Add corpus-grep proof scripts that codify F's and G's invariants as runtime artefacts:
- `scripts/proof-no-deprecated.mjs` — `grep '@deprecated' src/` must be 0 (codifies F2).
- `scripts/proof-no-ts-ignore.mjs` — `grep '@ts-ignore' src/` must be 0 (codifies F.W1 Lane A).
- `scripts/proof-as-any-budget.mjs` — `grep 'as any' src/ | wc -l` must be ≤ 5 (codifies G2).
- `scripts/proof-resolution-contract.mjs` — extend with `types` key probe (F.W3 Lane F successor; SCRIPTS-1).

Each script is wired into `package.json` scripts + the CI workflow (post-build).

### Inherited from F (F1-F4)

| # | Invariant | G-inheritance |
|---|---|---|
| F1 | "No deferrals" as binding | EXTENDED as G1 — ratification ask before execution. |
| F2 | `lerpLegacy` retires (NO LEGACY CODE sharpened) | HOLDS. G adds proof:no-deprecated.mjs to codify. |
| F3 | Cross-repo write boundary (explicit + bounded) | HOLDS. G makes ZERO cross-repo writes by default. The keyframes.js peer commit `470814e` (LOCAL ONLY at F close) — G surfaces its push status to the user as ratification item, does not force the push. |
| F4 | W8-W12 back-reference + tranche-discipline | HOLDS. G follows the same posture (this `G.md` + 6 audit deliverables + wave specs at open). |

### Inherited from E + D + B + A

All E1-E5 + D1-D7 + precept 30-33 + 9 standing mandates HOLD per `audit/G-AUDIT-1 §5`. `proof:resolution` GREEN at HEAD `6b3a41b`.

## §3 — Wave schedule (5 waves)

**Updated 2026-05-21 post-peer-audit ratification**: G scope expanded with 11 additional FOLD-INTO-G items from `audit/G-PEER-GLASS-UI` + `audit/G-PEER-KEYFRAMES-JS` + `audit/G-PEER-SPEEDTEST`. Wave count unchanged (5); lane count increased in W2 (+2), W3 (+3), W4 (+4). Two substrate-level items (FOLD-3 G-AUDIT-5 correction + FOLD-5 Metaballs API surfaces + R1 sharpening) DONE in G.W0 follow-up (`coordination/Q.md §2.1.1-§2.1.2 + §6.A`).

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| **G.W0 HEADLINE** | open | 6-agent audit + plan substrate + **ratification ask** + peer-audit ratification + substrate scope expansion | All 6 G-AUDIT docs + 3 G-PEER docs landed; G substrate authored; user ratification received (Block A-E + peer-audit FOLD items); Q.md §2.1.1 + §2.1.2 + §6.A authored |
| **G.W1** | W0 ratification | substrate hygiene + architectural decomposition | CI-1 `origin/main`→`master` fix; api/CLAUDE.md services drift fix; state-at-G-open captured; color/utils.ts decomposed into 7 modules |
| **G.W2** | W1 close | typed strengthening + glass-ui consumer adoption | G-OPP-2/3/4/5 (`as any` corpus ≤ 5); **NEW Lane E**: `useBreakpoint` at 4 demo sites; **NEW Lane F**: PaletteSlugBar `<Button>` shim |
| **G.W3** | W2 close | invariant codification + CI/api/e2e hygiene + cross-peer adoption | 4 proof scripts + API-1/2 + E2E-1 + CI-2; **NEW Lane I**: codemod-publication invariant (G-PUB-1); **NEW Lane J**: `proof:no-deep.mjs` (FOLD-S1); **NEW Lane K**: `proof:no-bare-builtins.mjs` for api/src/ (FOLD-S2) |
| **G.W4 HEADLINE close** | W3 close | strengthened close — FINAL.md + H-SEED.md, doc drift, coord state, merge to master, **v0.9.0 tag** | 7 close-audit lanes + close-honesty checklist; **NEW**: README upgrade section (G-PUB-2) + CHANGELOG path fix (G-PUB-3) + CONTRIBUTING.md devDep rationale (G-PUB-4) + predecessor-authored `H-SEED.md` (FOLD-S3); merge ceremony; v0.9.0 annotated tag |

**Critical path: 5 wave-slots** — W0 → W1 → W2 → W3 → W4.

**Parallelism per wave**:
- G.W0: 6 audit lanes (DONE) + substrate authoring (orchestrator).
- G.W1: 4 lanes (A: CI fix, B: color/utils decomposition, C: api/CLAUDE.md fix, D: state-at-open). Mostly file-disjoint; A + C + D parallelizable, B is the longest single-actor lane.
- G.W2: 4 lanes (one per G-OPP). G-OPP-4 (`Color<T>` channel accessor) is the most impactful + may be BREAKING for downstream — verify in dispatch.
- G.W3: 6 lanes (SCRIPTS-1/2/3/4 + API-1/2 + E2E-1 + CI-2). Largely file-disjoint.
- G.W4: 7 close-audit lanes (read-only parallel) + close-ceremony writes.

## §4 — Per-wave anchors

Each wave spec under `waves/G.W0..G.W4.md` carries per-lane sub-gates, verification artefacts, and a commit plan.

## §5 — File ownership

Each wave spec's "File bounds" section is the single source of truth.

Out of G's bounds:
- `glass-ui/` — read-only (peer; G refines (c) triggers; no glass-ui authorship in G).
- `keyframes.js/` — read-only at G default. The peer commit `470814e` (F.W2 LOCAL ONLY) push is a ratification item, not a G-authorized cross-repo write.
- `speedtest/`, `fourier-analysis/` — read-only.
- `docs/tranches/C/` — long-standing untracked scaffold; not G's to write.
- CW Phase-2 activation — speedtest authority; user-gated.

## §6 — Gate model (3 tiers — inherited from F)

1. **Tier 1 — invariants.** G1-G4 + inherited F1-F4 + E1-E5 + D1-D7 + precept 30-33 + 9 standing mandates.
2. **Tier 2 — per-lane sub-gates.** Every wave lane carries one explicit sub-gate.
3. **Tier 3 — the wave gate.** Conjunction of sub-gates + wave-qualified bench probes. G.W4 close additionally runs the 7-lane close ceremony + 14-item pre-merge gate matrix (inherits F's 14 + any G-NEW).

## §7 — Carry-forward items relayed for ratification (G1 binding)

Per the G-opening directive, the following items are **presented to the user for ratification before G.W1+ dispatch**:

### Ratification block A — PEER-AUTHORSHIP carry-forwards (8 items — chronic across 5 tranches)

These are glass-ui authorship asks; value.js cannot author them. G proposes **CARRY-FORWARD with sharpened TIME-BOUND (c) triggers** per F1 + G1:

| # | Ask | Origin | G-disposition | Proposed (c) trigger |
|---|---|---|---|---|
| 1 | Glass-ui Metaballs API additions (positionSource, pointer input, per-blob opacity, HSV perturbation, context-loss recovery, MetaballCanvas mode="layout", pauseOnHidden) | A/D | **CARRY-FORWARD; NEGOTIATION CANDIDATE** | Glass-ui AJ shipped `positioning="viewport\|local"` (W1-β) + `:duration` (W4-γ) — partially overlapping. Re-check at glass-ui's next non-AK tranche-open OR ratify a name-renegotiation with glass-ui maintainer. |
| 2 | Aurora `deriveAuroraPalette` + `deriveAuroraConfig` | D | CARRY-FORWARD | Re-check at glass-ui's next non-AK tranche-open. |
| 3 | `BlobDot` organic-dot primitive | D | CARRY-FORWARD | Re-check at glass-ui's next non-AK tranche-open. (Note: F's "16 WatercolorDot instances" drifted to 10 — G-AUDIT-5 §5.) |
| 4 | `SelectTrigger size` prop | E | CARRY-FORWARD | Re-check at glass-ui's next non-AK tranche-open. |
| 5 | `DockSelectTrigger clampLabel` | E | CARRY-FORWARD | Re-check at glass-ui's next non-AK tranche-open. |
| 6 | `TooltipContent variant="mono"` | E | CARRY-FORWARD | Re-check at glass-ui's next non-AK tranche-open. |
| 7 | `Button size="icon-sm"` rung | E | CARRY-FORWARD | Re-check at glass-ui's next non-AK tranche-open. |
| 8 | `<Tabs variant="underline">` provider family | E | CARRY-FORWARD | Re-check at glass-ui's next non-AK tranche-open. |

### Ratification block B — PEER-AUTHORSHIP residuals (3 items)

| # | Ask | G-disposition | Proposed action |
|---|---|---|---|
| 9 | Contract-v2 §2.1 glass-ui font-inlining | CARRY-FORWARD | Re-check at glass-ui's `dist/glass-ui.css` next-publish; `siblingFsAllowTransient` carries until then. |
| 10 | keyframes.js precept-pin drift (`458c2d1` vs upstream `68d9b20`) | CARRY-FORWARD | Re-check at keyframes.js maintainer's next submodule-rebase signal. |
| 11 | keyframes.js peer commit `470814e` (F.W2 codemod LOCAL ONLY) push status | **RATIFICATION REQUESTED** | The peer commit is local; keyframes.js origin still carries legacy lerp. **User decision required**: (a) push to keyframes.js origin (`git -C keyframes.js push origin master`), (b) leave LOCAL until next keyframes.js work, (c) coordinate with keyframes.js maintainer to integrate. |

### Ratification block C — CW Phase-2 activation (1 item)

| # | Item | G-disposition | Proposed action |
|---|---|---|---|
| 12 | Speedtest CW Phase-2 activation | CARRY-FORWARD | Re-check on user explicit signal OR speedtest CW Phase-2 ship. **Note**: G-AUDIT-4 §4 found speedtest does NOT consume value.js (past coord tracking was stale). |

### Ratification block D — FOLD-INTO-G items (5 items — proposed for G execution)

| # | Item | G-target wave |
|---|---|---|
| 13 | G-OPP-1: decompose `src/units/color/utils.ts` 1,430 LoC → 7 focused modules | G.W1 Lane B |
| 14 | G-OPP-2/3/4/5: typed strengthening (-29 `as any`/`as unknown as` sites) | G.W2 |
| 15 | SCRIPTS-1: extend `proof:resolution` with types-key probe (F.W3 Lane F successor) | G.W3 |
| 16 | SCRIPTS-2/3/4: codify F2 + F.W1 Lane A + G2 as runtime proof scripts | G.W3 |
| 17 | API-1 + API-2: `withTransaction` 4-site expansion + `engines.node` declaration | G.W3 |
| 18 | E2E-1: mobile-walk spec | G.W3 |
| 19 | CI-1: `origin/main`→`master` workflow typo fix (CHANGELOG-gate currently INERT) | G.W1 Lane A |
| 20 | CI-2: `npm pack --dry-run` publish-shape regression catch | G.W3 |
| 21 | DOCS-1: `api/CLAUDE.md` services drift fix (color/, session/) | G.W1 Lane C |

### Ratification block E — Retire-moot (1 item — proposed for retirement)

| # | Item | G-disposition | Rationale |
|---|---|---|---|
| 22 | Playwright environmental flake class (11/36 specs at F.W4 Lane 6) | **RETIRE-MOOT** | Per F.W4 Lane 6 + G-AUDIT-6 §2: 0 code-side regressions; all 11 failures are environmental (missing local WebKit binary; no local API backend). CI environment installs WebKit + smoke-admin uses addInitScript mock fixture. Re-classifying as documented-environmental-class, not actionable. |

## §8 — v0.9.0 release surface (preview — finalized at G.W3/G.W4)

**BREAKING**: TBD at G.W2 dispatch. The G-OPP-4 typed `Color<T>` channel accessor MAY be BREAKING if the current `[key: string]: any` index signature is publicly relied on. If breaking, it's the lone BREAKING for v0.9.0. If non-breaking, v0.9.0 is INTERNAL-only.

**INTERNAL**:
- G.W1: CI defect fix; api/CLAUDE.md services drift; state-at-G-open; color/utils.ts decomposition (1,430 → 7 modules).
- G.W2: typed strengthening (-29 `as any`/`as unknown as` sites).
- G.W3: 4 new proof scripts; withTransaction expansion; engines.node; mobile-walk spec; npm pack dry-run.
- G.W4: close ceremony.

**DEPS**: No dep drift expected in G.

## §9 — Mode

Planning-only at open. The 6-lane audit (`audit/G-AUDIT-1..6`) is the substrate basis. G.W1+ dispatches only after user ratification per G1.

## §10 — Authority

Plan substrate: this file + `G-PROMPTS.md` + `findings.md` + `audit/G-AUDIT-1..6` (six audit lanes) + `coordination/Q.md` (refreshed at G open) + `dispatch/AGENT.md` (G deltas vs F's contract) + `waves/G.W0..G.W4.md` (five wave specs) + `PROGRESS.md`.
