# G.W4 Close-Audit — Lane 2: Substrate-Without-Consumer

**Auditor:** G.W4 close-audit Lane 2
**Date:** 2026-05-22
**Branch:** `tranche-g` · **HEAD:** `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df2`
**Mode:** Read-only. No git operations, no code modification. One findings doc authored.

## Pre-flight

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| `git rev-parse HEAD` | `3a25f32…` | `3a25f32f64d92e67742d2b1fd9d5ac0a5d03df2` | PASS |
| Branch | `tranche-g` | `tranche-g` | PASS |

Pre-flight PASSES — audit proceeded.

## Scope

Verify every artefact Tranche G introduced has a genuine consumer — no dead
substrate. Five categories audited.

---

## Category 1 — The 9 color sub-modules

`src/units/color/conversions/*.ts` (8 files incl. `index.ts` barrel) + `dispatch.ts`.

| Artefact | Consumer(s) | Result |
|----------|-------------|--------|
| `conversions/hex.ts` | `dispatch.ts` (re-exports `hex2rgb`/`rgb2hex`); barrel `conversions/index.ts` | LIVE |
| `conversions/kelvin.ts` | `dispatch.ts`; `src/parsing/color.ts` (`kelvin2rgb`); barrel | LIVE |
| `conversions/cylindrical.ts` | `dispatch.ts`; `src/units/color/colorFilter.ts`; barrel | LIVE |
| `conversions/lab.ts` | `dispatch.ts`; barrel | LIVE |
| `conversions/oklab.ts` | `dispatch.ts`; barrel | LIVE |
| `conversions/transfer.ts` | `gamut.ts`; `color/index.ts`; `conversions/direct.ts`; `conversions/xyz-extended.ts`; barrel | LIVE |
| `conversions/xyz-extended.ts` | `dispatch.ts`; barrel | LIVE |
| `conversions/direct.ts` | `dispatch.ts` (imports all 6 `direct*` functions for `DIRECT_PATHS` table) | LIVE |
| `dispatch.ts` | `src/index.ts`, `src/units/{interpolate,normalize,index}.ts`, `color/{contrast,mix,normalize,index}.ts`, `conversions/{direct,xyz-extended}.ts`, `src/parsing/color.ts`, 7 test files | LIVE |
| `conversions/index.ts` (barrel) | `test/color-roundtrip.test.ts` (`import * as ColorConversions`) | LIVE |

**Note (informational, not an orphan):** the `conversions/index.ts` barrel
re-exports the 6 focused modules but does NOT re-export `direct.ts`. This is
by design per the barrel's own docstring — `direct.ts` is dispatch-internal
(the `{from}2{to}` namespace-access contract excludes the `directXToY` names).
`direct.ts` is consumed directly by `dispatch.ts`; not an orphan.

Category 1: **all 9 modules have live consumers — zero orphans.**

---

## Category 2 — G.W2 typed wrappers

| Artefact | Defined at | Live call site(s) | Result |
|----------|-----------|-------------------|--------|
| `getColorSpaceBound` | `color/constants.ts:251` | `color/normalize.ts:23`; `dispatch.ts:75` | LIVE |
| `getColorSpaceDenormUnit` | `color/constants.ts:270` | `color/normalize.ts:21`; `dispatch.ts:74` | LIVE |
| `DirectPathsTable` (type) | `dispatch.ts:155` | `dispatch.ts:161` — type annotation of `const DIRECT_PATHS` | LIVE |
| `channelOf` | `color/index.ts:68` | `color/index.ts:237,269,278` (`clone`/`values`/`entries`); `interpolate.ts:68,69,86`; `parsing/color.ts:61` | LIVE |
| `setChannel` | `color/index.ts:75` | `color/index.ts:237` (`clone`); `interpolate.ts:90`; `parsing/color.ts:61` | LIVE |
| `ValueUnit.unwrapDeep` | `units/index.ts:38` | `interpolate.ts:70,71`; `color/normalize.ts:42,94`; `parsing/color.ts:61` | LIVE |

All six wrappers replace prior untyped casts (index-access `as`, double-cast
unwrap chains) and have live call sites at the boundaries they were created to
localise. Category 2: **zero orphans.**

---

## Category 3 — The 6 new G.W3 proof scripts

Added in commit `61314fa` (`feat(scripts/w3): codify 6 invariant proof scripts`).
(`proof-resolution-contract.mjs` and `proof-dts-layout.mjs` predate G.W3 — out of scope.)

| Proof script | `package.json` script | CI step (`node.js.yml`) | Result |
|--------------|----------------------|-------------------------|--------|
| `proof-no-deprecated.mjs` | `proof:no-deprecated` | line 116 | WIRED |
| `proof-no-ts-ignore.mjs` | `proof:no-ts-ignore` | line 119 | WIRED |
| `proof-as-any-budget.mjs` | `proof:as-any-budget` | line 122 | WIRED |
| `proof-no-deep.mjs` | `proof:no-deep` | line 125 | WIRED |
| `proof-no-bare-builtins.mjs` | `proof:no-bare-builtins` | line 128 | WIRED |
| `proof-codemod-publication.mjs` | `proof:codemod-publication` | line 139 | WIRED |

All 6 steps execute inside the `build-and-test` job (`runs-on: ubuntu-latest`)
under the `### Invariant proof-script suite (G.W3)` block (lines 107-139).
Category 3: **all 6 wired into both `package.json` and CI — zero orphans.**

---

## Category 4 — withTransaction-expanded api sites (G.W3 Lane E)

Commit `277e04a` (`feat(api/w3): expand withTransaction to 4 cross-collection
sites`) added exactly 4 `services.withTransaction(...)` call sites.

| # | Site | Enclosing fn | Route handler | Mounted | Result |
|---|------|-------------|---------------|---------|--------|
| 1 | `services/admin/batch.ts:38` | `batchPalettes` | `routes/admin/batch.ts:19` | `admin/index.ts:41` (`admin.route("/", batch)`) | REACHABLE |
| 2 | `services/admin/batch.ts:87` | `batchUsers` | `routes/admin/batch.ts:29` | same router | REACHABLE |
| 3 | `services/palette/crud.ts:209` | `deletePalette` | `routes/palettes/crud.ts:125` | `palettes/index.ts:32` (`crudRouter`) | REACHABLE |
| 4 | `services/palette/versions.ts:151` | `revertToVersion` | `routes/palettes/versions.ts:68` | `palettes/index.ts:33` (`versionsRouter`) | REACHABLE |

All 4 expanded sites sit inside exported service functions invoked by live,
mounted route handlers. Category 4: **zero orphans.**

---

## Category 5 — Mobile-walk spec

| Artefact | Discovery mechanism | Result |
|----------|--------------------|--------|
| `e2e/smoke/mobile/walk.spec.ts` | `playwright.config.ts` — `smoke-mobile` project (`testDir: "./e2e/smoke/mobile"`, no `testMatch`/`testIgnore` restriction; default `testMatch` matches `*.spec.ts`) | DISCOVERED |

Verified empirically: `npx playwright test --list --project=smoke-mobile`
reports 2 tests in 2 files, including
`smoke/mobile/walk.spec.ts:60:1 › mobile walk: segmented control toggles panes
+ view-select re-routes`.

Category 5: **spec discovered by `smoke-mobile` — zero orphans.**

---

## Orphan list

**ZERO ORPHANS.** Every artefact across all 5 categories has at least one
genuine, live consumer.

(One informational note recorded under Category 1: `direct.ts` is intentionally
absent from the `conversions/index.ts` barrel — it is dispatch-internal and
consumed directly by `dispatch.ts`. This is by design, documented in the
barrel's docstring, and is NOT an orphan.)

## Overall verdict

**PASS.** No dead substrate. All 9 color sub-modules, all 6 G.W2 typed
wrappers, all 6 G.W3 proof scripts, all 4 withTransaction-expanded api sites,
and the mobile-walk spec have verified live consumers / wiring.
