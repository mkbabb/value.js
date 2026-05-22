# G.W4 Close-Audit — Lane 4: Idiomatic-Gestalt / Invariants

**Wave**: G.W4 (close ceremony).
**Lane**: 4 — idiomatic-gestalt / invariant verification.
**Branch**: `tranche-g` @ `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df26` (pre-flight verified).
**Mode**: read-only audit. No git ops, no code modification, no rebuild
(`dist/` consumed as-is; build measurement owned by a sibling lane).
**Verdict**: **ISSUES** — 1 invariant breach (G3 `dispatch.ts` 391 LoC > 350).

---

## §1 — Pre-flight

| Check | Expected | Actual | Result |
|---|---|---|---|
| `git rev-parse HEAD` | `3a25f32…` | `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df26` | ✅ |
| `git rev-parse --abbrev-ref HEAD` | `tranche-g` | `tranche-g` | ✅ |

Pre-flight PASS — audit proceeds.

---

## §2 — G-invariant table (G1–G4)

| Invariant | Probe | Result | Verdict |
|---|---|---|---|
| **G1** — relay before ratification | `PROGRESS.md` §"2026-05-21 — G.W0 close + user ratification received" + §"Peer-audit scope expansion (post-ratification)"; `coordination/Q.md` §2.1, §3.3, §6.A | G.W0 closed with a ratification ask block (`G.md §7`, blocks A–E, 22 items). User ratified via two AskUserQuestion exchanges (2026-05-21): Block D 9 FOLD-INTO-G items RATIFIED + 12 peer-audit FOLD items RATIFIED. PROGRESS.md records "G.W0 CLOSED on this ratification. G.W1 dispatches next." — execution waves dispatched *after* ratification, never before. | **HOLD** |
| **G2a** — `as any` ≤ 5 (expect 0) | `npm run proof:as-any-budget`; `grep -rn 'as any' src/ \| wc -l` | proof exits 0 — `PASS — 0 'as any' site(s) (budget ≤ 5)`. grep = **0**. | **HOLD** |
| **G2b** — `as unknown as` ≤ 4, all documented | `grep -rn 'as unknown as' src/` | **4** sites: `units/normalize.ts:110` (`styleRecord` CSSStyleDeclaration→Record helper), `units/normalize.ts:319` (`asColorValueUnit` guarded narrowing — preceded by a `unit !== "color"` throw), `units/color/dispatch.ts:222` (XYZ-hub `fromXYZFn` cast — documented in `G.W2-lane-b-typed-DIRECT_PATHS.md §"Irreducible cast left in-bounds"`), `parsing/color.ts:59` (clone→`Color<number>` reinterpret — has a 3-line explanatory comment above). All 4 ≤ threshold; each is a self-evident helper or carries a rationale (in-code comment or G.W2 Lane B doc). | **HOLD** |
| **G3** — color/utils decomposition: `utils.ts` gone, 9 modules, each ≤ 350 LoC | `ls src/units/color/utils.ts`; `wc -l src/units/color/conversions/*.ts src/units/color/dispatch.ts` | `utils.ts` **DELETED** (no shim). 9 decomposition modules present (8 in `conversions/` + `dispatch.ts`; plus `conversions/index.ts` aggregate barrel). **8/9 modules ≤ 350.** `dispatch.ts` is **391 LoC — 41 over the ≤ 350 G3 constraint.** See §4 breach B-1. | **BREACH** |
| **G4** — invariant codification (8 proof scripts exit 0) | `npm run proof:{no-deprecated,no-ts-ignore,as-any-budget,resolution,dts-layout,codemod-publication,no-deep,no-bare-builtins}` | All 8 exit **0**. `no-deprecated` PASS (0 `@deprecated`); `no-ts-ignore` PASS (0); `as-any-budget` PASS (0 ≤ 5); `resolution` PASS (contract-v2); `dts-layout` PASS (flat dist/); `codemod-publication` PASS (1 codemod in tarball); `no-deep` PASS (0 `:deep()`); `no-bare-builtins` PASS (71 api/src files, 0 bare builtins). | **HOLD** |

---

## §3 — Inherited-invariant table (F / E / D / precept / standing mandates)

| Invariant | Probe | Result | Verdict |
|---|---|---|---|
| **F1** — no deferrals (binding) | EXTENDED as G1 — see §2. Ratification asks relayed before execution. | All carry-forward items presented + ratified. | **HOLD** |
| **F2** — `lerpLegacy` retired / NO LEGACY CODE | `grep -rn 'lerpLegacy' src/`; `grep -rn '@deprecated' src/` | `lerpLegacy` **absent** (0 matches). `@deprecated` **0** — STRENGTHENED, codified by `proof:no-deprecated`. | **HOLD** |
| **F3** — cross-repo write boundary | `git submodule status`; Q.md §3.3 | Only `docs/precepts` submodule (`68d9b20…`, upstream-aligned). G makes zero cross-repo writes; keyframes.js push status R11 carried as a ratification item, not force-pushed. | **HOLD** |
| **F4** — W8-W12 back-ref / tranche discipline | `docs/tranches/G/` structure | G.md + 6 audit deliverables + 5 wave specs + PROGRESS.md + wave audit docs present. | **HOLD** |
| **E1–E5** | spot-check per `G-AUDIT-1 §5` (recorded HOLDing at G open) | Nothing G did regressed E-window state; `lerpLegacy` retirement (E5 hand-off) confirmed complete (F2). | **HOLD** |
| **D6** — no dynamic eval | `grep -rn 'new Function' src/`; `grep -rn 'eval\|await import\|require(' src/` | Only `new FunctionValue(…)` (AST node) — zero `new Function`/`eval`/dynamic-import/`require`. `parsing/color.ts:97,115` explicitly document the D6 invariant. | **HOLD** |
| **D7 / reactivity, D1–D5** | spot-check per `G-AUDIT-1 §5` | No `src/` reactivity/contract regressions in the G window. | **HOLD** |
| **Precept 30** — contract-v2 dev-resolution | `npm run proof:resolution` | PASS — `contract-v2 dev-resolution contract satisfied`. | **HOLD** |
| **Precept 30+** — dts-shape invariant | `npm run proof:dts-layout` | PASS — `flat dist/ dts emission`. | **HOLD** |
| **Precept 31** — props fail-explicit | inherited GREEN at G open; no `src/` component-contract regressions in G | INHERITED-GREEN. | **HOLD (presumed)** |
| **Precept 32** — phantom-class corpus-grep | no new phantom-class introductions in G | GREEN. | **HOLD** |
| **Precept 33** — dead-code corpus-grep | `grep -rn '@deprecated' src/` | **0** — STRENGTHENED, codified by `proof:no-deprecated`. | **HOLD** |
| **No test files in src/** | `find src/ -name '*.test.ts' -o -name '*.spec.ts'` | 0 matches. | **HOLD** |
| **NO god modules** (standing mandate; >400 LoC new file / >500 D12 ceiling) | `find src -name '*.ts'` LoC scan; `git diff master…HEAD` | The 9 G3 modules: 8 ≤ 350, `dispatch.ts` 391 (>350 G3 but <400 mandate / <500 D12 — see §4). **Zero NEW src/ file >400 LoC.** Pre-existing large files (`units/constants.ts` 736, `color/index.ts` 719, `parsing/color.ts` 631, etc.) all predate G; none was created by G — G only edited them (e.g. `color/index.ts` +101 LoC for the G.W1 Lane B barrel block, but the file is pre-existing and not a G-authored module). | **HOLD** (no new god module) |
| **No legacy-compat shims** | grep for shims; F2 | Zero `@deprecated`; `utils.ts` DELETED with no re-export shim; `lerpLegacy` absent. | **HOLD** |
| **Named exports only** | `grep -rn 'export default' src/` | Only `src/vite-env.d.ts` — 2 `export default` inside `declare module` ambient blocks (Vite `.vue` / `?raw` asset-module shape declarations). These are required module-shape ambient declarations, NOT public-API defaults. No API default export. | **HOLD** |
| **`import type` discipline** (verbatimModuleSyntax) | inspect new G modules; `npm run lint` (per CLAUDE.md) | The 9 G3 modules correctly split type-only imports (`import type { HSLColor, ColorSpaceMap, Vec3, WhitePoint, … }`) from value imports (runtime classes `RGBColor`/`OKLABColor`/… + functions `scale`/`transformMat3`). G.W1 Lane B doc records `lint` exit 0 + `vue-tsc` 0 errors. | **HOLD** |

---

## §4 — Breach list

### B-1 — G3 breach: `dispatch.ts` is 391 LoC, exceeds the ≤ 350 per-module constraint

**Invariant**: G3 — "`src/units/color/utils.ts` decomposes into **9 focused
modules ≤ 350 LoC each**" (`G.md §2 G3`; HARD CONSTRAINT per G.W1 sub-gate B.1).

**Probe**: `wc -l src/units/color/dispatch.ts` → **391**.

**Detail**: G.W1 Lane B delivered `dispatch.ts` at **336 LoC** — within the
≤ 350 constraint (verified: `git show 413b47e:…/dispatch.ts | wc -l` = 336;
`G.W1-lane-b-color-utils-decomposition.md §3` records 336). G.W2 Lane B
(`23ec904`, typed `DIRECT_PATHS` mapped-type, G-OPP-3) added the
`DirectPath<From,To>` / `DirectPathsTable` mapped-type machinery + the typed
`getDirectPath` lookup, growing `dispatch.ts` to **391 LoC** (+55) — `git show
23ec904:…/dispatch.ts | wc -l` = 391.

`G.W2-lane-b-typed-DIRECT_PATHS.md` does **not** acknowledge this LoC growth
or the resulting G3 ≤ 350 breach — it reports the `as unknown as` reduction
(8→1 in the file) but is silent on the per-module line ceiling. A subsequent
G.W2 lane should have either re-split `dispatch.ts` (e.g. lift the
`DIRECT_PATHS` table + typed-lookup into a `conversions/direct-table.ts`, the
same cohesion-honest split G.W1 Lane B already applied for `direct.ts`) or
escalated the +41-LoC overage to the orchestrator for ratification.

**Severity**: BOUNDED. 391 LoC:
- breaches the **G3-specific ≤ 350** per-module constraint by **41 LoC**;
- is **within** the standing no-god-module mandate (new file ≤ 400 LoC) and
  far under the D12 >500-line god-module ceiling;
- the file is cohesion-clean (single responsibility: conversion dispatch +
  interpolation primitives) — this is a line-budget overage, not a
  cohesion/god-module regression.

**Recommended disposition**: orchestrator awareness item for the G.W4 close —
either (a) re-split `dispatch.ts` in a follow-on lane to restore ≤ 350, or
(b) ratify the 391-LoC figure as the G-close G3 number (the file is honest
and well under the no-god-module mandate), updating `G.md §2 G3` to record
the as-built LoC. Disposition is the orchestrator's; this lane reports the
breach per its read-only mandate.

---

## §5 — Overall verdict

**ISSUES** — one invariant breach (**B-1**: G3 `dispatch.ts` 391 LoC > 350).

- G1, G2, G4: HOLD.
- G3: **BREACH** on the per-module ≤ 350 axis (`dispatch.ts` 391); the
  `utils.ts`-deleted + 9-modules-present axes of G3 HOLD.
- All inherited F1–F4, E1–E5, D-window, precept 30–33 invariants: HOLD.
- Standing mandates (no god modules / no legacy shims / named-exports-only /
  `import type` discipline): HOLD — the B-1 overage is below the
  no-god-module mandate ceiling (≤ 400) and is a G3-specific line-budget
  breach, not a standing-mandate breach.
- All 8 G4 proof scripts exit 0.

No code modification, no git ops, no rebuild performed — read-only audit, per
the lane's binding constraints.
