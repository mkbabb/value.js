# Tranche G — FINAL

**Tranche letter**: G (value.js repo; sixth tranche).
**Theme**: Type-system completion + architectural decomposition + invariant codification.
**Successor to**: F (value.js's "No deferrals" + post-W12 substrate hygiene + lerpLegacy retirement tranche; closed at `docs/tranches/F/FINAL.md`; merged at `6b3a41b`; tagged `v0.8.0`).
**Branch**: `tranche-g` — opened off master HEAD `6b3a41b`; closed 2026-05-22.
**Tag**: `v0.9.0`.
**Precepts at close**: `68d9b20` (unchanged through the entire G window).

---

## §1 — Thesis verdict

The G-opening directive (the canonical 6-agent-audit invocation, verbatim in `G-PROMPTS.md §1`) set the thesis: **"DEEPLY audit with 6 agents in parallel"**, **"NO quick solutions, NO workarounds: idiomatic, gestalt approaches"**, **"NO legacy code"**, **"architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable"**, **"Delineate any chronically deferred items and fold them into this new tranche"**, **"This is NOT an implementation phase. Tranche development only."**, and **"Relay all carry-forward items to me for ratification."**

G honored every clause. G.W0 ran the 6-agent audit + 3 peer-repo deep audits, decomposed every carry-forward item into a TIME-BOUND disposition, and relayed all carry-forward items to the user — who ratified them across two `AskUserQuestion` exchanges before any execution-phase wave dispatched. The three axes of the thesis each landed:

- **Axis 1 — type-system completion**: the `as any` corpus in `src/` retired **35 → 0** (G2 target was ≤ 5).
- **Axis 2 — architectural decomposition**: the 1,430-LoC `color/utils.ts` god-module decomposed into **9 focused modules ≤ 350 LoC each** (G3).
- **Axis 3 — invariant codification**: **6 new proof scripts** codify the F-thesis + G-thesis invariants as runtime-checkable artefacts (G4).

**G-thesis verdict**: SATISFIED.

---

## §2 — G1-G4 invariants — final verdict

| Invariant | Verdict | Evidence |
|---|---|---|
| **G1** — Relay before ratification | SATISFIED | G.W0 closed with a ratification ask block (`G.md §7`, 22 items + 12 peer-audit FOLD items). The user ratified all dispositions via two `AskUserQuestion` exchanges (recorded in `PROGRESS.md` 2026-05-21 sections). No execution-phase wave dispatched before ratification. |
| **G2** — `as any` corpus retires (≤ 5 in src/) | SATISFIED — **exceeded** | `grep -rn 'as any' src/ \| wc -l` = **0** (was 35 at G.W1 baseline; pre-G figure 36). `proof:as-any-budget` codifies + enforces it. `as unknown as` = 4 (≤ 4 wave gate) — all genuine irreducible boundary casts, analysed in `audit/G.W2-lane-c-color-channel-typing.md`. Zero cast-laundering — every retirement is a genuine correct type. |
| **G3** — Color utils decomposition (≤ 350 LoC each) | SATISFIED | `src/units/color/utils.ts` (1,430 LoC) DELETED; decomposed into 9 modules — `conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,xyz-extended,direct}.ts` + `dispatch.ts` — every one ≤ 350 LoC (max `dispatch.ts` 312 post-G.W4 remediation). The planning estimate of 7 was ratified to 9 at G.W1 Lane B (a cohesion-honest ≤ 350 partition requires it); a G.W2 regression that grew `dispatch.ts` to 391 was caught by the G.W4 close audit and remediated (`9902036`). |
| **G4** — Invariant codification (proof scripts) | SATISFIED | 6 new proof scripts authored + `proof:resolution` extended: `proof:no-deprecated`, `proof:no-ts-ignore`, `proof:as-any-budget`, `proof:codemod-publication`, `proof:no-deep`, `proof:no-bare-builtins`. All wired into `package.json scripts` + the CI workflow; all exit 0 at HEAD. |

---

## §3 — Inherited invariant inheritance

| Inherited | Verdict | Notes |
|---|---|---|
| F1 — "No deferrals" as binding | HONORED — EXTENDED as G1 | Every carry-forward item relayed + ratified; the G.W1 Lane B `assets/docs/` regression was remediated in-wave (not deferred); the G.W4 G3 breach was remediated in-wave. |
| F2 — `lerpLegacy` retired / NO LEGACY CODE | HOLD | `grep '@deprecated' src/` = 0; `proof:no-deprecated` codifies it. `utils.ts` was DELETED, not shimmed. |
| F3 — Cross-repo write boundary | HONORED | **ZERO cross-repo writes in the G window** (G.W4 Lane 7). keyframes.js stays at `470814e` (R11 = LEAVE LOCAL per user ratification). |
| F4 — W8-W12 back-reference + tranche-discipline | HOLD | G followed the same posture: `G.md` + 6 audit deliverables + 3 peer audits + wave specs at open. |
| E1-E5, D1-D7 | HOLD | G.W4 Lane 4 spot-check: no god modules added (9 modules ≤ 350; no new file > 400 LoC); named-exports-only; `import type` discipline clean; architectural transposition over patching (the decomposition + 4 typed wrappers). |
| Precept invariants 30-33 | HOLD | `proof:resolution` GREEN; precept submodule `68d9b20` unchanged; close-commit bodies carry pre/post grep evidence. |

---

## §4 — Commit inventory

Per `master..tranche-g`:

| # | SHA | Type | Wave / Lane | Summary |
|---|---|---|---|---|
| 1 | `b745c0e` | docs | G open | Tranche G opened — 6-agent audit + planning-only substrate |
| 2 | `0b9832c` | docs | G.W0 close | user ratification received — G.W0 closed, G.W1 unblocked |
| 3 | `a2e03de` | audit | G.W0 follow-up | peer-repo deep audits — glass-ui + keyframes.js + speedtest |
| 4 | `704195e` | docs | G.W0 follow-up | G scope expansion — 11 peer-audit FOLD items ratified |
| 5 | `96894eb` | fix | G.W1 Lane A | CHANGELOG-gate base-ref — `origin/main` → `github.base_ref` |
| 6 | `413b47e` | refactor | G.W1 Lane B | decompose `color/utils.ts` 1430 LoC → 9 focused modules |
| 7 | `195b834` | docs | G.W1 Lane C | `api/CLAUDE.md` services/ block — color/ + session/ subdirs |
| 8 | `27f2183` | fix | G.W1 Lane B remediation | repoint `assets/docs` color-space pages to decomposed modules |
| 9 | `ab6c744` | docs | G.W1 close | state-at-G-open baseline + ratify 9-module G3 |
| 10 | `23ec904` | refactor | G.W2 Lanes A+B | typed `getColorSpaceBound` + typed `DIRECT_PATHS` mapped-type |
| 11 | `ef8a80b` | refactor | G.W2 Lanes C+D | typed `Color<T>` channel accessor + `ValueUnit.unwrapDeep` + as-any → 0 |
| 12 | `bda584c` | refactor | G.W2 Lane E | adopt glass-ui `useBreakpoint` at 4 demo sites |
| 13 | `1be6d15` | refactor | G.W2 Lane F | migrate PaletteSlugBar hand-rolled buttons → glass-ui `<Button>` |
| 14 | `c57ec01` | docs | G.W2 close | typed strengthening verified, as-any corpus → 0 |
| 15 | `61314fa` | feat | G.W3 Lanes A,B,C,D,H,I,J,K | codify 6 invariant proof scripts + extend `proof:resolution` |
| 16 | `277e04a` | feat | G.W3 Lanes E+F | expand `withTransaction` to 4 sites + `engines.node` |
| 17 | `affbe0e` | test | G.W3 Lane G | mobile-walk spec — PaneSegmentedControl + dock |
| 18 | `3a25f32` | docs | G.W3 close | 6 proof scripts codified, CI/api/e2e hygiene landed |
| 19 | `9902036` | refactor | G.W4 remediation | relocate `DIRECT_PATHS` table → `conversions/direct.ts` — restore G3 ≤ 350 |
| 20 | `audit` | G.W4 close | 7 read-only close-audit lanes |
| 21 | `docs` | G.W4 close | resolve close-audit doc drift (CLAUDE.md ×4 + bench + wave-specs) |
| 22 | `docs` | G.W4 close | FINAL.md + H-SEED + close-ceremony docs |
| 23 | `chore` | G.W4 release | v0.9.0 — version bump |
| 24 | `merge` | G.W4 close | Merge tranche-g into master — Tranche G close (v0.9.0) |

**Cross-repo writes in the G window**: ZERO (G.W4 Lane 7 integrity sweep — verified).

---

## §5 — Pre-merge gate matrix (21 items — F's 14 + 7 G-NEW)

| # | Gate | Threshold | Captured | Verdict |
|---|---|---|---|---|
| 1 | Every G wave-log row reads `closed` | all closed | G.W0-W4 all closed (PROGRESS.md) | PASS |
| 2 | `FINAL.md` cites every G commit + F close (`6b3a41b` + tag `v0.8.0`) | full inventory | §4 above; F close pinned §11 | PASS |
| 3 | build + vue-tsc + vitest + lint + proof:resolution + proof:dts-layout + playwright | all green | build clean (125,496 B); vue-tsc 0; vitest 1584/34; lint 0; proof:resolution + proof:dts-layout PASS; playwright 34/34 Chromium specs pass isolated (2 environmental — RM-1) | PASS |
| 4 | L8 microbenchmark | ≥ 5× | 11.00× (Lane 5) | PASS |
| 5 | Recursion-guard suite green | green | vitest 1584/34 includes `recursion-guard.test.ts` (exercises `ValueUnit.unwrapDeep`) | PASS |
| 6 | Reactivity-smoke spec | within budget | slider-keyboard subtest passes isolated; full-fleet flake is the RM-1 environmental class (Lane 6) | PASS (environmental) |
| 7 | Integrity sweep clean | clean | Lane 7 PASS — zero agent-attributed git ops; zero cross-repo writes; stash empty; precept `68d9b20` unchanged | PASS |
| 8 | `CHANGELOG.md` carries the v0.9.0 entry | present | authored in the `chore(release)` commit | PASS |
| 9 | `package.json` version bumped to `0.9.0` | bumped | `chore(release)` commit | PASS |
| 10 | Backend tests green | ≥ 104 | 106/21 (G.W3 Lane E added 2 rollback tests) | PASS |
| 11 | DIRECT_PATHS bench | ≥ 2× | 4.49× HSL→RGB (Lane 5) | PASS |
| 12 | nameParser bench | ≥ 5× | 39.34× (Lane 5) | PASS |
| 13 | dts-shape invariant | `dist/index.d.ts` present, no `dist/src/` | `proof:dts-layout` PASS | PASS |
| 14 | bundle-size gate | `dist/value.js` ≤ 148,480 B | 125,496 B (22,984 B headroom) | PASS |
| 15 | **G-NEW** `proof:no-deprecated` | exit 0 | PASS — 0 `@deprecated` in src/ | PASS |
| 16 | **G-NEW** `proof:no-ts-ignore` | exit 0 | PASS — 0 `@ts-ignore` in src/ | PASS |
| 17 | **G-NEW** `proof:as-any-budget` | exit 0 (≤ 5) | PASS — 0 `as any` in src/ | PASS |
| 18 | **G-NEW** `proof:resolution` types-key probe | exit 0 | PASS — `exports["."].types` resolves to an emitted file | PASS |
| 19 | **G-NEW** `proof:codemod-publication` | exit 0 | PASS — `scripts/migrate-keyframes-js-lerp.mjs` in the npm tarball | PASS |
| 20 | **G-NEW** `proof:no-deep` | exit 0 | PASS — 0 `:deep()`/`::v-deep` in demo/ + src/ | PASS |
| 21 | **G-NEW** `proof:no-bare-builtins` | exit 0 | PASS — 0 bare built-in imports in api/src/ (71 files) | PASS |

**All 21 gates PASS.**

---

## §6 — v0.9.0 release surface

**BREAKING**: none. The G.W2 Lane C `Color<T>` channel-accessor typing ran the BREAKING-decision protocol and resolved **INTERNAL** — the `[key: string]: any` index signature is kept (a TS string index cannot structurally coexist with `Color<T>`'s heterogeneous members, and the demo dynamically indexes `Color` by a runtime component string; the dynamic boundary is localized into internal typed `channelOf`/`setChannel` helpers). The public typed `.l`/`.c`/`.r` API is unchanged. v0.9.0 is an INTERNAL-only minor bump.

**INTERNAL**:
- `src/units/color/utils.ts` (1,430 LoC god-module) decomposed into 9 focused modules ≤ 350 LoC each.
- `as any` corpus in `src/` retired 35 → 0 via 4 typed-wrapper transpositions (`getColorSpaceBound`, typed `DIRECT_PATHS`, typed `Color<T>` channel accessor, `ValueUnit.unwrapDeep`).
- 6 new proof scripts codify the F+G invariants as runtime artefacts.
- `withTransaction` expanded from 3 to 7 cross-collection write sites in `api/`; `engines.node ">=22"` declared.
- 1 mobile-walk Playwright spec added (e2e 35 → 36 specs).
- CI: CHANGELOG-gate base-ref defect fixed (was INERT since F.W3); `npm pack --dry-run` publish-shape step; 7 proof-script CI steps.
- Demo: glass-ui `useBreakpoint` adopted at 4 sites; PaletteSlugBar hand-rolled buttons migrated to glass-ui `<Button>`.
- `scripts/migrate-*.mjs` added to `package.json files:` — F.W2's codemod is now discoverable by npm consumers.

**DEFERRED → ZERO (per G1)**: every carry-forward item was relayed + ratified; standing peer-authorship asks carry sharpened TIME-BOUND (c) triggers (§7).

**DEPS**: no dep drift in G.

---

## §7 — Standing peer-authorship asks — state at G close

Per `coordination/Q.md §6` + §7:

| Ask | (c) re-check trigger |
|---|---|
| 8 glass-ui primitive asks (Metaballs API additions [renegotiated — see Q.md §2.1]; Aurora derive; BlobDot; SelectTrigger size; DockSelectTrigger clampLabel; TooltipContent variant; Button icon-sm; Tabs underline) | Re-check at glass-ui's next non-AK tranche-open; the Metaballs ask additionally re-checks at speedtest AL ratification (value.js is sole-identified-consumer of `glass-ui/MetaballCanvas`). |
| Contract-v2 §2.1 glass-ui font-inlining residual | Re-check at glass-ui's `dist/glass-ui.css` next-publish. |
| keyframes.js precept-pin drift (`458c2d1` vs upstream `68d9b20`) | Re-check at keyframes.js maintainer's next submodule-rebase signal. |
| keyframes.js peer commit `470814e` push status (R11) | **User-ratified LEAVE LOCAL** — re-check at next keyframes.js work-window. |
| CW Phase-2 activation | INFORMATIONAL only (speedtest does not consume value.js — Q.md §4.1). |

All carry-forward triggers are TIME-BOUND. Full forward-carry ledger in `docs/tranches/G/H-SEED.md`.

---

## §8 — Performance summary (close-audit Lane 5)

| Metric | F close | G close | Delta |
|---|---|---|---|
| `dist/value.js` raw bytes | 124,936 | 125,496 | +560 B (structural — per-module Rolldown `//#region` markers from the 1→9-module decomposition; ≤ 148,480 gate, 22,984 B headroom) |
| L8 channel-access | 10.66× | 11.00× | NEUTRAL (≥ 5× gate) |
| DIRECT_PATHS HSL→RGB | 7.51× | 4.49× | within run-to-run noise of the G-open baseline 4.56× (the F-close 7.51× was an outlier) — ≥ 2× gate |
| nameParser | 38.23× | 39.34× | NEUTRAL (≥ 5× gate) |
| Backend tests | 104/20 | 106/21 | +2 (G.W3 Lane E rollback tests) |

**Verdict**: zero regressions. The G.W2 typed strengthening is erased at emit (no JIT pessimization); the G3 decomposition's +560 B is pure structural marker overhead.

---

## §9 — Visual-runtime summary (close-audit Lane 6)

- Spec inventory: 36 files across 5 Playwright projects. Meets the ≥ 36 threshold (G.W3 Lane G added `e2e/smoke/mobile/walk.spec.ts`).
- Isolated (`--workers=1`) run: all 34 Chromium-engine specs PASS (smoke 20, smoke-admin 12, smoke-mobile 2).
- 2 non-passing, both pre-existing **environmental** (RM-1 class, user-retired at G.W0): `smoke-reactivity` slider-keyboard 200 ms-poll wall-clock flake (same class F.W4 Lane 6 documented); `smoke-safari` missing local WebKit binary (PW 1.60.0 needs `webkit-2287`; CI installs it).
- **Zero real regressions** — no G code change caused any test failure.
- Vitest re-verification: 1584 passed / 34 files.

---

## §10 — Constellation health summary at G close

Per `coordination/Q.md §7` (refreshed at G.W4):

- Precept upstream HEAD `68d9b20` — no advance in the G window.
- Precept constellation-pin convergence (value.js + glass-ui): YES.
- Contract-v2 dev-resolution: GREEN (`proof:resolution`, now with the types-key probe).
- value.js `@deprecated` / `@ts-ignore` / `as any` counts: **0 / 0 / 0** — all three codified by proof scripts.
- value.js `vue-tsc --noEmit` errors: 0.
- value.js `dist/value.js` bundle: 125,496 B (gate ≤ 148,480).
- Glass-ui: HEAD `3822f48` (+5 commits in the G window — glass-ui's own AK-tranche work, NOT value.js writes; `origin` unchanged). Primitive-expansion asks remain OPEN (peer-authorship).
- keyframes.js: HEAD `470814e` (unchanged; R11 LEAVE LOCAL).
- speedtest: does not consume value.js (Q.md §4.1). fourier-analysis: chronic 109-file dirty tree (unchanged).

---

## §11 — Authority pins

- Plan substrate: `G.md` + `G-PROMPTS.md` + `findings.md` + `audit/G-AUDIT-1..6` (6 open-time audit lanes) + `audit/G-PEER-{GLASS-UI,KEYFRAMES-JS,SPEEDTEST}.md` (3 peer audits) + `audit/G.W1-*` + `audit/G.W2-lane-*` + `audit/G.W3-lane-*` + `audit/G.W4-close-lane-1..7-*` + `audit/G.W4-g3-remediation-*` + `audit/G.W4-doc-drift-remediation.md` + `coordination/Q.md` + `dispatch/AGENT.md` + `waves/G.W0..G.W4.md` + `PROGRESS.md` + this `FINAL.md`.
- F close pin: `6b3a41b` (merge `tranche-f` → master) + tag `v0.8.0`.
- G merge: the G.W4 close-ceremony merge commit.
- G tag: `v0.9.0`.
- Cross-repo: none (zero writes in the G window).
- Precept submodule: `68d9b20` (unchanged through the G window).

---

## §12 — Successors (next-tranche candidates)

Forward-carry ledger authored at `docs/tranches/G/H-SEED.md` (per FOLD-S3). Headline H-target candidates:

- **glass-ui primitive-expansion** — file the 8 standing asks if glass-ui's contraction posture inverts.
- **Rolldown `//#region` marker strip** — the library bundle carries ~+314 B of per-module source-navigation comment markers; a `vite.config.ts` option could strip them (flagged at G.W1 Lane B; build-config territory, out of G scope).
- **keyframes.js precept-pin reconciliation** + the R11 `470814e` push — at the next keyframes.js work-window.
- **`useMetaballRenderer.ts` migration** to `@mkbabb/glass-ui/metaballs` — gated on the 4-5 OPEN Metaballs sub-asks shipping.

None on a critical path; all gated on peer-authorship signal or user explicit signal.

---

## §13 — Note on the close

G's FINAL.md records the precept-bound truth:
- G1 (relay before ratification) — honored: every carry-forward item relayed; user ratified before execution.
- G2 (`as any` ≤ 5) — exceeded: the corpus retired to 0, zero cast-laundering.
- G3 (color/utils decomposition) — satisfied: 9 modules ≤ 350 LoC; the one in-flight breach was caught by the close audit and remediated before merge.
- G4 (invariant codification) — satisfied: 6 proof scripts now make the F+G invariants runtime-checkable, not review-dependent.

Two deviations arose mid-tranche and were each remediated in-wave rather than deferred (per F1): the G.W1 Lane B `assets/docs/` importer-grep miss, and the G.W2 Lane B `dispatch.ts` LoC overflow. Both are recorded in `PROGRESS.md` + the relevant audit docs — the honest accounting the directive demands.

A's + B's + D's + E's + F's + G's `FINAL.md` together close every clause of every user prompt across value.js's history.
