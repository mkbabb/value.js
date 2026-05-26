# H — Cascade-correctness + type-system completion II + demo decomposition + invariant codification II

**Tranche letter**: H (value.js repo; seventh tranche).
**Successor to**: G — type-system completion + architectural decomposition + invariant codification (`docs/tranches/G/FINAL.md`; merge `e166d37`; tag `v0.9.0`).
**Branch**: `tranche-h` (off master HEAD `e166d37`).
**Open**: 2026-05-22.
**Precepts at open**: `68d9b20` (unchanged since D).
**Mode**: planning-only at open per the H-opening directive ("This is NOT an implementation phase. Tranche development only. Relay all carry-forward items to me for ratification.").

## §0 — Master HEAD provenance

H opens **off `e166d37` (G merge commit; v0.9.0 tag)**. Zero drift between G close + H open — verified at `audit/H-AUDIT-3 §3`. The constellation is in a zero-mutation G→H boundary (H-AUDIT-4): every sibling repo at the same HEAD as G close.

## §1 — Thesis

The H-opening directive (verbatim in `H-PROMPTS.md §1`) re-asserts the canonical clauses + doubles the "delineate deferred items" clause. The 6-agent audit at H open (`audit/H-AUDIT-1..6`) finds:

- The G-thesis closed cleanly: every G invariant HOLDs, every precept HOLDs, all 8 proof scripts exit 0, every gate is green (H-AUDIT-1 + H-AUDIT-3).
- The transposition surface is **smaller than at G open** (H-AUDIT-5). G left a clean substrate; H is polish-grade — not structural rescue.
- One genuine correctness defect surfaced: `createPalette` + `patchPalette` write across collections without `withTransaction` (H-AUDIT-6).
- The largest unknown is **`demo/`** — G3 (no god modules) was `src/`-only; `demo/` is unaudited (H-AUDIT-1 Gap #5, the highest-value new finding).
- 9 items are at **6-tranche carry** (A→B→D→E→F→G→H — H-AUDIT-2): the 8 glass-ui primitive asks + the keyframes.js precept-pin. The doubled-clause demands these be addressed, not silently re-carried.

H decomposes into four axes:

### Axis 1 — Cascade-correctness closure (H1 invariant)

H-AUDIT-6's highest-ratio finding: `createPalette` + `patchPalette` write to BOTH `palettes` AND `palette_versions` without `withTransaction`. A partial failure leaves an orphan version row or a palette whose `currentHash` doesn't match any version record — a real correctness bug. G.W3 Lane E expanded `withTransaction` to 4 new sites but did not enumerate exhaustively; H closes the class.

### Axis 2 — Type-system completion II (H2 invariant)

G2 retired the `as any` corpus to 0 + codified `proof:as-any-budget`. H extends the same idiom to **`as unknown as`**: the 4-site residue is partially reducible (XYZ_FUNCTIONS is mapped-type-able per H-AUDIT-5 H-OPP-1, mirroring G.W2 Lane B's `DirectPathsTable`). H lands `proof:as-unknown-as-budget` to codify the residue.

`Color<T>` `[key:string]:any` deeper restructure: **REJECTED** (H-AUDIT-5). Would defeat L8 own-property monomorphic storage; G.W2 Lane C verdict HOLDS.

### Axis 3 — Demo decomposition (H3 invariant)

G3 was `src/`-only — `demo/` was never audited against ≤ 400 LoC. H-AUDIT-5 surfaced `demo/@/lib/palette/api.ts` at **484 LoC, 13 sections** — a clear decomposition candidate mirroring G.W1 Lane B's `color/utils.ts` split. H.W3 also runs a `demo/` god-module audit to surface any additional ≥ 400 LoC files.

### Axis 4 — Invariant codification II (H4 invariant)

G4 codified 6 proof scripts + `proof:resolution` types-key probe. H extends the codification:
- `proof:no-bare-builtins` is currently `api/src/`-scoped; H-AUDIT-5 + H-AUDIT-6 find one outlier in `plugins/vite-source-export.ts` and recommend extending the gate to `plugins/`, `scripts/`, `bench/`.
- `proof:no-ts-ignore` is `src/`-scoped; H-AUDIT-6 finds 2 hits in `demo/@/components/.../useMarkdownHighlighting.ts` and recommends extending to `demo/` (with the underlying `*.css?inline` module declaration as the close).
- `proof:as-unknown-as-budget` (Axis 2 codifier) is new.
- The `withTransaction` coverage list (Axis 1) gets an audit-list of every cross-collection write site — a standing reference that future api/ work consults.

## §2 — Invariants H1-H4 + inheritance

H inherits A + B + D + E + F + G invariants verbatim. H1-H4 are the H-specific deltas:

### H1 — Cascade-correctness completion

Every cross-collection write site in `api/` uses `services.withTransaction(async (session) => { ... })` and threads `session` through every repository call inside the block. The defect found at `createPalette` + `patchPalette` (H-AUDIT-6) is repaired; a standing `audit/api-withTransaction-coverage.md` enumerates every cross-collection write + its session status, becoming the future-reference that prevents the class of regression.

### H2 — `as unknown as` corpus retires (target ≤ 3)

Sharpens G2 (`as any` ≤ 5). The 4-site `as unknown as` residue retires to ≤ 3 sites at H close (`as unknown as` 4 → 3 by retiring the XYZ-hub cast via a typed `XYZ_FUNCTIONS` mapped-type). The remaining 3 are genuine irreducible boundary casts (DOM `CSSStyleDeclaration`, post-runtime-guard narrowing, clone-reinterpret) — POLICY-documented in module headers + codified by a new `proof:as-unknown-as-budget` script (budget = 3).

### H3 — Demo decomposition (no god module in `demo/`)

Every `demo/` file ≤ 400 LoC. `demo/@/lib/palette/api.ts` (484 LoC) decomposes into 8 cohesion-honest modules per H-AUDIT-5 H-OPP-3 (the same idiom G.W1 applied to `color/utils.ts`). A `demo/` god-module audit surfaces any other ≥ 400 LoC file + remediates.

### H4 — Cross-tree invariant codification

Extend the proof-script suite to their full applicability:
- `proof:no-bare-builtins` → `api/src/` + `plugins/` + `scripts/` + `bench/`; fix the one outlier in `plugins/vite-source-export.ts:2`.
- `proof:no-ts-ignore` → `src/` + `demo/`; close the 2 hits in `useMarkdownHighlighting.ts` via a `*.css?inline` module declaration in `demo/color-picker/vite.d.ts`.
- `proof:as-unknown-as-budget` (NEW; budget = 3).
- `api/tsconfig.json` lifted to root strictness (4 missing flags per H-AUDIT-6: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`).

### Inherited from G (G1-G4)

| # | Invariant | H-inheritance |
|---|---|---|
| G1 | Relay before ratification | EXTENDED — H.W0 closes with the same ratification ask. H.W1+ does not dispatch until user ratifies. |
| G2 | `as any` ≤ 5 in src/ (codified by proof:as-any-budget) | HOLDS at 0; H must not regress. SHARPENED by H2 for `as unknown as`. |
| G3 | No god module; modules ≤ 350 LoC in src/ | HOLDS (max `dispatch.ts` 312 post-G.W4 remediation); H must not regress. EXTENDED by H3 to `demo/` (≤ 400 LoC). |
| G4 | Invariant codification (proof scripts) | EXTENDED by H4 — 1 new proof script (`as-unknown-as-budget`) + 2 scoped expansions. |

### Inherited from F (F1-F4)

| # | Invariant | H-inheritance |
|---|---|---|
| F1 | "No deferrals" as binding | HOLDS. The doubled "delineate deferred items" clause re-asserts F1 as the H thesis. Every chronic-deferred item gets an explicit H disposition (FOLD / CARRY with sharpened trigger / RETIRE-MOOT / PEER-AUTH). |
| F2 | `lerpLegacy` retired / NO LEGACY CODE | HOLDS. `@deprecated` 0; codified by `proof:no-deprecated`. |
| F3 | Cross-repo write boundary (explicit + bounded) | HOLDS. **H default: ZERO cross-repo writes** (per the G precedent). |
| F4 | W8-W12 back-reference + tranche-discipline | HOLDS. H follows the same posture: this `H.md` + 6 audit deliverables + wave specs at open. |

### Inherited from E + D + B + A + precepts 30-33

All HOLD per H-AUDIT-1 §3 (precept hold-status table). `proof:resolution` GREEN at HEAD.

## §3 — Wave schedule (5 waves)

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| **H.W0 HEADLINE** | H open | 6-agent audit + plan substrate + **ratification ask** | 6 H-AUDIT docs landed; H substrate authored; user ratification received |
| **H.W1** | W0 ratification | api/ cascade-correctness + strictness | createPalette + patchPalette wrapped in withTransaction (defect repair); api/tsconfig.json strictness lifted; withTransaction-coverage audit-list landed |
| **H.W2** | W1 close | type-system completion II (`as unknown as` ≤ 3) | typed `XYZ_FUNCTIONS` mapped-type (-1 `as unknown as`); `proof:as-unknown-as-budget` codified |
| **H.W3** | W2 close | demo decomposition + invariant extension | `demo/@/lib/palette/api.ts` 484 → 8 modules; demo/ god-module audit + remediation; `proof:no-ts-ignore` extended to demo/; demo `@ts-ignore` corpus retired; `proof:no-bare-builtins` extended to plugins/+scripts/+bench/ |
| **H.W4** | W3 close | micro-polish + flake mitigation + close docs | Rolldown `//#region` strip; bench provenance hygiene; e2e reactivity-flake mitigation; CI release docs + CONTRIBUTING.md gaps |
| **H.W5 HEADLINE close** | W4 close | strengthened close — FINAL.md + I-SEED + merge + tag | 7 close-audit lanes + close-honesty checklist + pre-merge gate matrix; merge ceremony; vN.N.N annotated tag |

Wave schedule mirrors G's HEADLINE-flanked shape (H.W0 + H.W5) with 4 substantive waves between, ordered by dependency: cascade-correctness (Axis 1) → type-II (Axis 2) → demo-decomp + invariant-extension (Axes 3 + 4 combined — they share scope) → micro-polish + close docs (Axis 5).

**Parallelism per wave** (file-disjointness governs):
- H.W0: 6 audits (DONE) + substrate authoring (orchestrator).
- H.W1: 3 lanes (A api withTransaction defect, B api tsconfig, C coverage-audit-doc). Largely sequential within `api/`.
- H.W2: 3 lanes (A typed XYZ_FUNCTIONS, B proof:as-unknown-as-budget, C type-predicate normalize.ts:319). Share `src/` files — sequential.
- H.W3: 5 lanes (A demo/lib/palette/api.ts split, B demo god-module audit, C colorSpaceInfo lift, D proof:no-ts-ignore demo-ext + `*.css?inline` decl, E proof:no-bare-builtins scope-ext). Mostly file-disjoint → 3-4 way parallel feasible.
- H.W4: 5 lanes (A Rolldown markers, B bench provenance, C e2e flake mitigation, D CI release docs, E CONTRIBUTING.md). Fully file-disjoint → 5-way parallel feasible.
- H.W5: 7 close-audit lanes (read-only parallel) + close ceremony writes (orchestrator).

## §4 — Per-wave anchors

Each wave spec under `waves/H.W0..H.W5.md` carries per-lane sub-gates, verification artefacts, and a commit plan.

## §5 — File ownership

Each wave spec's "File bounds" section is the single source of truth.

Out of H's bounds:
- `glass-ui/` — read-only (peer).
- `keyframes.js/` — read-only at H default (R11 LEAVE LOCAL per user ratification at G open).
- `speedtest/` — read-only. AL is currently planning-only; H briefs AL with sole-consumer stake but does not write.
- `fourier-analysis/` — read-only.
- `docs/tranches/C/` — long-standing untracked scaffold; not H's to write (per G.md §5 precedent).

## §6 — Gate model (3 tiers — inherited from G)

1. **Tier 1 — invariants.** H1-H4 + G1-G4 + F1-F4 + E1-E5 + D1-D7 + precept 30-33 + 9 standing mandates.
2. **Tier 2 — per-lane sub-gates.** Every wave lane carries one explicit sub-gate.
3. **Tier 3 — the wave gate.** Conjunction of sub-gates + wave-qualified bench probes. H.W5 close additionally runs the 7-lane close ceremony + 22-item pre-merge gate matrix (inherits G's 21 + 1 H-NEW: `proof:as-unknown-as-budget` GREEN).

## §7 — Carry-forward items relayed for ratification (G1 binding)

Per H-AUDIT-2, the following items are **presented to the user for ratification before H.W1+ dispatch**. Detail at `audit/H-AUDIT-2-deferred-ledger.md`.

### Ratification block A — 9 chronic-deferred items at 6-tranche carry (A→B→D→E→F→G→H)

Per H-AUDIT-2 §3 + the user's doubled "delineate deferred items" clause, the 8 glass-ui primitive asks + keyframes.js precept-pin require a **sharper disposition than continued carry**. Four ratification options per AUDIT-2's recommendation:

| Option | Disposition |
|---|---|
| (A) | Continue chronic carry-forward — re-check at glass-ui's next non-AK tranche-open. (Status-quo; the F+G default.) |
| (B) | Re-frame as `chronically-bandwidth-gated-upstream` — acknowledge upstream-shipped or never-will-ship status; remove from the active ledger; flag as informational only. |
| (C) | Propose API shapes for the OPEN sub-asks — value.js owns prior-art for the Metaballs sub-asks per `coordination/Q.md §2.1.1`. The proposed shapes are already authored; ratifying this option authorizes H to surface them to glass-ui maintainer at the next non-AK tranche-open (still PEER-AUTHORSHIP-REQUIRED for shipment; H authors the prompt + tracks). |
| (D) | Selectively retire — retire asks that the post-G architecture no longer needs (e.g. if `useMetaballRenderer.ts` migrates to `glass-ui/metaballs` and consumes only the AJ-shipped surfaces, the un-overlapped Metaballs sub-asks may be RETIRABLE). |

**Recommended**: combination of **(C)** for the Metaballs sub-asks (publish proposed shapes; brief AL with value.js's sole-consumer stake) + **(A)** for the other 7 asks until glass-ui's next non-AK tranche-open + **(D) review at H.W5 close** (re-check if any ask has become genuinely moot).

### Ratification block B — FOLD-INTO-H items (6 items — H.W1-W4 lanes)

| # | Item | Origin | H target |
|---|---|---|---|
| 1 | API-2 createPalette + patchPalette withTransaction (defect repair) | H-AUDIT-6 §3 | H.W1 Lane A |
| 2 | API-1 api/tsconfig.json strictness lift (4 flags) | H-AUDIT-6 §4 | H.W1 Lane B |
| 3 | H-OPP-1 typed XYZ_FUNCTIONS mapped-type (-1 `as unknown as`) | H-AUDIT-5 | H.W2 Lane A |
| 4 | H-OPP-2 `proof:as-unknown-as-budget` codification (≤ 3) | H-AUDIT-5 + H-AUDIT-6 | H.W2 Lane B |
| 5 | H-OPP-3 `demo/@/lib/palette/api.ts` 484 LoC → 8 modules + `demo/` god-module audit | H-AUDIT-5 + H-AUDIT-1 Gap #5 | H.W3 Lanes A+B |
| 6 | H-OPP-4 cluster — invariant codification II: `proof:no-bare-builtins` scope-ext + `proof:no-ts-ignore` to demo/ + close 2 demo `@ts-ignore` hits | H-AUDIT-5 + H-AUDIT-6 | H.W3 Lanes D+E |

### Ratification block C — Micro-polish FOLD items (5 items — H.W4 lanes)

| # | Item | Origin | H target |
|---|---|---|---|
| 7 | Rolldown `//#region` marker strip (vite.config.ts; ~1.2% bundle delta) | H-SEED §3 #1 / H-AUDIT-5 H-OPP-7 | H.W4 Lane A |
| 8 | Bench provenance hygiene (cite module+symbol, not line numbers) | H-SEED §3 #2 / H-AUDIT-5 | H.W4 Lane B |
| 9 | E2E reactivity-instant flake mitigation (split 200ms double-duty timeout) | H-AUDIT-6 §3 | H.W4 Lane C |
| 10 | CI release/publish process docs | H-AUDIT-6 | H.W4 Lane D |
| 11 | CONTRIBUTING.md playwright + publish lines | H-AUDIT-6 | H.W4 Lane E |

### Ratification block D — PEER-AUTHORSHIP carry-forwards (chronic-deferred residue)

| # | Item | Disposition under recommended Option (C+A+D) |
|---|---|---|
| 12 | glass-ui Metaballs API additions (renegotiated) | Option C — value.js publishes proposed shapes + briefs AL with sole-consumer stake. PEER-AUTHORSHIP for shipment. |
| 13-19 | 7 other glass-ui primitive asks (Aurora; BlobDot; SelectTrigger size; DockSelectTrigger clampLabel; TooltipContent variant; Button icon-sm; Tabs underline) | Option A — re-check at glass-ui's next non-AK tranche-open. |
| 20 | Contract-v2 §2.1 glass-ui font-inlining | Option A — re-check at glass-ui's `dist/glass-ui.css` next-publish. |
| 21 | keyframes.js precept-pin drift (`458c2d1` vs `68d9b20`) | Option A — re-check at keyframes.js maintainer's next submodule-rebase signal. |
| 22 | keyframes.js peer commit `470814e` push status (R11) | Already-ratified LEAVE LOCAL at G open; re-check at next keyframes.js work-window. |

### Ratification block E — Release version (the H close release surface)

H is INTERNAL-only (no BREAKING) under the current plan. Trajectory: v0.6.0 → v0.7.0 → v0.8.0 (lone BREAKING) → v0.9.0 → ?

| Option | Disposition |
|---|---|
| (i) | **v0.10.0** — idiomatic semver-minor bump. Default. |
| (ii) | **v1.0.0** — declare stable public API. Post-H: `as any` 0; `as unknown as` ≤ 3; no god modules in `src/` or `demo/`; full proof-script suite; cascade-correctness closed; 5 minor releases of stability. A defensible v1.0.0. |

**Recommended**: **v0.10.0** — `as unknown as` could still drop further, and v1.0.0 is a separate marketing/stability-signaling decision the user should make explicitly (not orchestrator-defaulted). H.W5 can revisit if H lands cleanly.

## §8 — Release surface (preview — finalized at H.W4/H.W5)

**BREAKING**: none expected. H is INTERNAL-only.

**INTERNAL**:
- H.W1: api/ cascade-correctness (defect repair) + tsconfig strictness lift + withTransaction-coverage audit-list.
- H.W2: typed XYZ_FUNCTIONS mapped-type + `proof:as-unknown-as-budget` (≤ 3).
- H.W3: demo/lib/palette/api.ts decomposed; demo/ god-module audit; `proof:no-ts-ignore` extended to demo/; `proof:no-bare-builtins` extended to plugins/+scripts/+bench/.
- H.W4: Rolldown marker strip; bench provenance hygiene; e2e flake mitigation; CI release docs; CONTRIBUTING.md.
- H.W5: close ceremony.

**DEPS**: no dep drift expected in H.

## §9 — Mode

Planning-only at open. The 6-lane audit (`audit/H-AUDIT-1..6`) is the substrate basis. H.W1+ dispatches only after user ratification per G1.

## §10 — Authority

Plan substrate: this file + `H-PROMPTS.md` + `findings.md` + `audit/H-AUDIT-1..6` (six audit lanes) + `coordination/Q.md` + `dispatch/AGENT.md` (H deltas vs G's contract) + `waves/H.W0..H.W5.md` (six wave specs) + `PROGRESS.md` + the predecessor-authored `docs/tranches/G/H-SEED.md`.
