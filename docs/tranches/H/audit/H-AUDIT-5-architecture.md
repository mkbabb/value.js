# H-AUDIT-5 — Library + demo + api architecture (H open)

**Branch**: `tranche-h` @ `e166d37` (post-G merge, v0.9.0).
**Mode**: READ-ONLY across all paths. Author one deliverable.
**Predecessor**: `docs/tranches/G/audit/G-AUDIT-5-library-demo-architecture.md` + `docs/tranches/G/H-SEED.md` §3, §7.

G shipped the as-any-corpus retirement (0 in `src/`), `color/utils.ts` 1430-LoC god module decomposition into `conversions/` + `dispatch.ts` (9 focused modules), 8 proof scripts, withTransaction 3→7. H's window finds a clean substrate — what remains is fine-grained type tightening, two `as unknown as` candidates that look reducible, a configuration micro-strip, a small bench-provenance hygiene fix, and two new cross-collection writes that escaped G.W3 Lane E's expansion. The surface is small enough to fit one wave.

---

## §1 — Substrate state inherited at H open

| Tree | LoC range (excl. data/spec files) | God-module risk |
|---|---|---|
| `src/` | every behavior file ≤ 631 LoC; only 1 file > 500 LoC is parser-cohesive (`parsing/color.ts`, `parsing/stylesheet.ts`, `parsing/math.ts`, `easing.ts`) | NONE — all cohesion-honest |
| `demo/@/` | 1 file > 400 LoC behaviorally (`PointerDebugOverlay.vue`, `PaletteCard.vue`); 1 data-heavy index (`color-picker/index.ts`) | LOW — one split candidate (data extraction); no swelling god modules |
| `api/src/` | every service ≤ 223 LoC; every repository ≤ 186 LoC | NONE — ≤ 250 cap honored repo-wide |
| `bench/`, `plugins/`, `scripts/` | all small | NONE |

`grep -rn "as any" src/` → **0**. `grep -rn "as unknown as" src/` → **4** (down from G open's 11). `grep -rn "@ts-ignore\|@deprecated" src/` → **0**. The 8 proof scripts all exit 0.

The substrate is *clean*. The candidates below are micro-transpositions and policy expansions, not bug fixes or structural rescues.

---

## §2 — `as unknown as` residue analysis (G.W3 Lane B + H-SEED §3 #3)

| # | Site | Type | Reducible? | Notes |
|---|---|---|---|---|
| 1 | `src/units/color/dispatch.ts:143` — `toEntry.from as unknown as (color: XYZColor<T>) => ColorSpaceMap<T>[C]` | XYZ-hub dispatch return cast | **YES — H-OPP-1** | `XYZ_FUNCTIONS` (line 82) is typed `Record<string, { to: (color: any) => XYZColor; from: (color: XYZColor) => any }>`. A mapped type `{ [K in ColorSpace]: { to: (c: ColorSpaceMap<unknown>[K]) => XYZColor; from: (c: XYZColor) => ColorSpaceMap<unknown>[K] } }` (the same idiom G.W2 Lane B applied to `DIRECT_PATHS`) would let `toEntry.from` self-type. Removes BOTH the cast AND the inner `: any`. |
| 2 | `src/units/normalize.ts:110` — `style as unknown as Record<string, string>` | DOM `CSSStyleDeclaration` → indexable record | **NO** | Genuine DOM-type boundary. `CSSStyleDeclaration` has its own typed accessors but no string-index narrowing without the cast. KEEP. |
| 3 | `src/units/normalize.ts:319` — `value as unknown as Parameters<typeof normalizeColorUnits>[0]` | Post-`unit !== "color"` guard narrowing | **MARGINAL** | The runtime guard `value.unit !== "color"` IS the narrowing. The cast bridges the runtime check to the type system. A type-predicate `function isColorValueUnit(v: ValueUnit): v is ValueUnit<Color<ValueUnit>, "color">` already exists in `units/utils.ts` (`isColorUnit`) — using it here would let the narrowing flow without the cast. Small lift; keep on watch. |
| 4 | `src/parsing/color.ts:59` — `color.clone() as unknown as Color<number>` | Clone-reinterpret (T-parameter swap) | **NO** | `clone()` preserves `T`; the loop after the clone unwraps every `ValueUnit<number>` to `number` (writes via `setChannel`). The cast announces the reinterpretation that the loop performs. Boundary cast — KEEP. |
| api-1 | `api/src/index.ts:150` — `(server as unknown as { close: ... }).close(...)` | `@hono/node-server` `serve` return shape | **NO** | Hono's typed `serve` return doesn't expose `close()` in its public signature, though the runtime object is `http.Server`-compatible. Boundary cast — KEEP. |

**Verdict**: 1 of 4 `src/` sites is reducible (H-OPP-1, the XYZ_FUNCTIONS mapped-type lift); 3 are documented irreducible-boundary casts. The G2 cap framework already covers `as any` (0); H may consider codifying `as unknown as ≤ 4` as a separate proof script (H-OPP-2) to lock in the irreducibility of #2, #3, #4 once #1 lands.

---

## §3 — `Color<T>` `[key: string]: any` index signature (H-SEED §3 #4)

G.W2 Lane C kept this as a BREAKING-decision verdict (KEEP), arguing it's structurally required because:
1. `Color<T>` is publicly barrel-exported.
2. The demo's `useColorModel`, `ComponentSliders`, `useSliderGradients` dynamically index by a runtime `component: string`.
3. TypeScript string-index signatures require *every* member to be assignable; `whitePoint`, `colorSpace`, and the methods aren't.

**H investigation**: The deeper restructure would be channels-in-a-typed-sub-record:

```ts
export abstract class Color<T = number> {
  abstract channels: { [K in ChannelOf<this>]: ColorChannel<T> };
  // ... no more [key: string]: any
}
// demo dynamic access: color.channels[component]
```

This works in theory but is a **3-tranche-scale BREAKING change** for every consumer that reads `color.r`, `color.l`, `color.h` directly (which is the entire demo and library hot-path). The own-property storage L8 hardening (`bench/color-channel-access.mjs`) depends on monomorphic instance shape — channels as a sub-record would defeat V8 hidden-class optimization and almost certainly regress the 11.00× bench gate.

**H verdict**: KEEP the G.W2 Lane C decision. The deeper restructure trades a typed channel surface for measurable runtime regression and a cross-repo migration that's larger than the corpus benefit. The typed `channelOf`/`setChannel` accessors (E.W1 Lane E / G.W2 Lane C) are the right localization. **No H wave action.**

---

## §4 — Loose-cohesion file list

Behavioral files (excluding pure-data constants + spec-algorithm clusters):

| File | LoC | Cohesion | Action |
|---|---|---|---|
| `src/parsing/color.ts` | 631 | Single cohesive parser surface (15 color spaces, hex, color-mix, relative color syntax). G-audit confirmed. | HOLD |
| `src/parsing/stylesheet.ts` | 520 | Single cohesive CSSOM parser. | HOLD |
| `src/parsing/math.ts` | 509 | Single cohesive math-function evaluator (calc + min/max/clamp + trig + exp). | HOLD |
| `src/easing.ts` | 505 | 30+ timing functions, all small formulas. | HOLD |
| `src/transform/decompose.ts` | 541 | 2D + 3D matrix decomposition + slerp + recompose (CSSOM spec cluster). | HOLD |
| `src/units/utils.ts` | 453 | Unit conversion + flatten/unflatten + style helpers. Borderline. | WATCH |
| `src/units/normalize.ts` | 399 | `getComputedValue` + `normalizeNumericUnits` + `normalizeValueUnits`. Three cohesive concerns. | HOLD |
| `src/units/color/index.ts` | 719 | 15 color subclass declarations + base class. G-audit considered split into `spaces/{rgb,hsl,...}.ts`; rejected (cohesion-honest as a class hierarchy). | HOLD |
| `src/units/color/gamut.ts` | 347 | Ottosson analytical gamut mapping cluster. | HOLD |
| `src/units/color/dispatch.ts` | 312 | `color2()` + `gamutMap` + `interpolateHue` + `mixColors` + `XYZ_FUNCTIONS`. G.W1 Lane B output. | HOLD |
| `src/quantize/cluster.ts` | 356 | MMCQ + k-means++ + JND dedup. | HOLD |
| `src/index.ts` | 306 | Public barrel — 30+ re-exports. | HOLD |
| `src/units/color/colorFilter.ts` | 305 | SPSA filter solver. | HOLD |
| `demo/@/lib/palette/api.ts` | 484 | API client — fetch helpers (request/adminRequest) + 50 endpoint shims grouped by 13 sections (SESSIONS/PALETTES/VERSIONING/FORKING/FLAGGING/COLORS/ADMIN-{COLORS,PALETTES,USERS,BATCH,TAGS,FLAGGED,AUDIT}). | **Split candidate — H-OPP-3** |
| `demo/@/components/custom/color-picker/index.ts` | 376 | 99 LoC of types/helpers + 277 LoC `colorSpaceInfo` metadata object. | **Split candidate — H-OPP-4** |
| `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue` | 449 | Pure debug overlay (events, gauges, log). Self-contained dev-only component; cohesion is fine. | HOLD |
| `demo/@/components/custom/palette-browser/PaletteCard.vue` | 435 | Card display tile — template + script + scoped style. The one surviving `:deep(svg)` is documented post-D.W4. | HOLD |

**Pure-data files** (intentionally large, NOT cohesion violations):

- `src/units/constants.ts` (736) — 16 export constants, all unit arrays + `STYLE_NAMES` + `MatrixValues` interface.
- `src/units/color/constants.ts` (551) — ranges, white points, conversion matrices, named colors.

---

## §5 — Repeated patterns (3+ copies)

Surveyed `demo/@/composables/auth/` (4 files), `demo/@/composables/palette/` (13 files), `demo/@/lib/` (palette/api.ts + supports), and `demo/@/components/custom/`. The notable repetitions:

| Pattern | Sites | Lift candidate? |
|---|---|---|
| `safeGetItem / safeSetItem / safeRemoveItem` (already lifted to `useSafeStorage`) | 3 (`useAdminAuth`, `useSession`, `useUserAuth`) | Already lifted. PASS. |
| `useFilteredList` (already lifted) | 3 (`useBrowsePalettes`, `useColorNameQueue`, `usePaletteManager`) | Already lifted. PASS. |
| `fetch(...)` + `Authorization: Bearer` / `X-Session-Token` headers | 51 endpoints in `api.ts` (centralized via `request` / `adminRequest` helpers) | Already lifted within `api.ts`. PASS. |
| `(colorSpaceInfo as any)[space]` indexing | 1 (`ComponentSliders.vue:162`) | Only 1 site — H-OPP-4 (typed `colorSpaceInfo` map) would clear this. |
| `import.meta.env.DEV` dev-only guard | 14 sites in `Color<T>` subclass constructors (each space brand-assert wrapper) | Cohesion-correct — each subclass has its own constructor. Lifting would change semantics. PASS. |

**Verdict**: G already mopped up the repeating-pattern lifts (`useSafeStorage` consolidation, `useFilteredList`). No new ≥ 3-site duplication candidates surfaced. **No H wave action for §5 alone.**

---

## §6 — Cross-collection writes still un-wrapped (H-SEED §7 #4)

G.W3 Lane E expanded `withTransaction` 3 → 7. Re-audit:

| Service | Cross-collection? | `withTransaction`? | H verdict |
|---|---|---|---|
| `deleteUser` (admin/users.ts:161) | Yes (palettes + votes + flags + sessions + adminAudit + users) | YES | OK |
| `deletePalette` (palette/crud.ts:209) | Yes (palettes + votes + flags + parent fork-count) | YES | OK |
| `forkPalette` (palette/forks.ts:80) | Yes (palettes + paletteVersions + parent fork-count) | YES | OK |
| `toggleVote` (palette/votes.ts:45) | Yes (votes + palettes vote-count) | YES | OK |
| `revertToVersion` (palette/versions.ts:151) | Yes (palettes + paletteVersions) | YES | OK |
| `batchPalettes(delete)` (admin/batch.ts:39) | Yes (palettes + cascades) | YES | OK |
| `batchUsers(suspend)` (admin/batch.ts:87) | Yes | YES | OK |
| **`deleteUserPalettes` (admin/users.ts:183-203)** | **Yes (palettes + votes + flags)** | **NO** | **H-OPP-5 candidate** |
| **`pruneEmptyUsers` (admin/users.ts:205-216)** | **Yes (users + sessions)** | **NO** | **H-OPP-5 candidate** |
| `importPalettes` (admin/import.ts:28) | No (palettes only — single collection, per-row try/catch on 11000) | N/A | OK |

**Two un-wrapped cross-collection writes**:

- `deleteUserPalettes` writes to `votes` + `flags` + `palettes` (lines 195, 196, 198). A partial failure between `votes.deleteByPaletteSlugs` and `palettes.deleteManyByUserSlug` leaves orphaned vote/flag rows — the exact failure mode G.W3 Lane E's `deletePalette` wrap was filed to prevent.
- `pruneEmptyUsers` writes to `sessions` + `users` (lines 212, 213). A failure between them leaves sessions pointing at deleted user slugs.

Both are admin-only paths, lower-traffic than the wrapped sites. But the cascade-correctness invariant is the SAME — G.W3 Lane E's rationale (no orphans, all-or-nothing) applies identically.

---

## §7 — `bench/` provenance hygiene (H-SEED §3 #2)

After G.W4 doc-drift repointing, the three bench files cite provenance at these granularities:

| File | Provenance comment shape | Drift-prone? |
|---|---|---|
| `bench/color2-direct-paths.mjs` | `// CSS Color 4 sRGB inverse — src/units/color/conversions/xyz-extended.ts:49` (specific line) | **YES** — 4 line-number citations (lines 70, 78, 85, 113) |
| `bench/color-channel-access.mjs` | `// mirror of src/units/color/index.ts` (module-only) | NO |
| `bench/parser-namelookup.mjs` | "shape now in `src/parsing/color.ts`" (module-only) | NO |

**H verdict**: `color2-direct-paths.mjs` is the lone bench citing line numbers. Each line citation drifts on any insertion above the cited line — exactly the failure mode H-SEED flagged. The natural shape: cite module + function symbol (e.g. `src/units/color/conversions/xyz-extended.ts:lin2srgb`) which is stable across refactors. **H-OPP-6**.

---

## §8 — Configuration / policy candidates

### §8.1 — Rolldown `//#region` marker strip (H-SEED §3 #1)

`dist/value.js` carries **52 `//#region` / `//#endregion` marker pairs** — one for each module folded into the bundle. These are Rolldown's source-navigation annotations preserved through minification (esbuild's `drop: ["console", "debugger"]` doesn't recognize them as droppable).

**Bundle delta**: bundle is currently 125,496 B. Stripping all 52 marker pairs at average ~30 B (`//#region src/units/color/conversions/transfer.ts\n//#endregion\n`) → ~1,560 B savings, ~1.2% of bundle. Small but free.

**Mechanism**: Rolldown's `output.banner`/`output.footer` won't reach this. Two paths:
1. A small post-build sed-strip in `package.json:build` (regex `/^\/\/#(region|endregion).*$/gm` → ``).
2. A Rolldown output transform plugin (`rolldown:strip-region-markers`).

Either works. Path 1 is 1 line of `package.json`; path 2 is ~20 lines of plugin. **H-OPP-7**.

### §8.2 — Extend `proof:no-bare-builtins` to `plugins/` (H-SEED §7 implicit)

`scripts/proof-no-bare-builtins.mjs` is currently scoped to `SCAN_ROOT = join(ROOT, "api", "src")`. Survey of `plugins/`, `bench/`, `scripts/`:

- `plugins/vite-source-export.ts:2` — `import { readFileSync } from "fs"` — **bare**.
- `bench/*.mjs` (3 files) — all use `node:perf_hooks`, `node:url`, `node:path`, `node:fs`. Clean.
- `scripts/*.mjs` (10 files) — all use `node:fs`, `node:path`, `node:url`. Clean.

So `plugins/vite-source-export.ts` is the **only** outlier outside `api/src/`. Extending the proof script's `SCAN_ROOT` to also walk `plugins/`, `scripts/`, `bench/` would (a) gate this one fix, (b) lock in the discipline across all Node-executing trees. **H-OPP-8**.

### §8.3 — `as unknown as` budget proof (H-SEED §7 #2)

G codified `as any` (proof:as-any-budget at ≤ 5; current 0). The parallel `as unknown as` proof would lock current count at 4 (or 3 after H-OPP-1). Mechanism is a direct copy of `proof-as-any-budget.mjs` with the regex swapped. **H-OPP-9** — pairs naturally with H-OPP-1.

---

## §9 — Candidate table — H-OPP numbering

| # | Name | Location | Current shape | Proposed transposition | Impact | Target wave |
|---|---|---|---|---|---|---|
| H-OPP-1 | XYZ_FUNCTIONS mapped-type | `src/units/color/dispatch.ts:82,143` | Wide `Record<string, { to: (c:any)=>XYZColor; from: (c:XYZColor)=>any }>` + `as unknown as` at the dispatch return | Mapped type keyed on `ColorSpace`; per-key narrowing on `from`/`to`. Removes 1 `as unknown as` + 2 `: any` parameter widenings. | Type strength — eliminates 1 of 4 residual `as unknown as` sites + 2 `: any` widenings. The G.W2 Lane B `DirectPathsTable` idiom applied to the second dispatch table. Zero runtime delta. | H.W1 |
| H-OPP-2 | `as unknown as` budget proof | `scripts/proof-as-unknown-as-budget.mjs` (new) | None | Copy of `proof-as-any-budget.mjs` with regex swap; cap at 4 (or 3 post H-OPP-1). | Codifies the irreducibility verdict for the 3 boundary casts; G4-style runtime contract. Adds 1 to the 8-proof set. | H.W1 (after H-OPP-1) |
| H-OPP-3 | `demo/@/lib/palette/api.ts` split | `demo/@/lib/palette/api.ts` (484 LoC, 13 sections) | Single file with `request`/`adminRequest` helpers + 51 endpoint shims grouped by section comments | Split into `palette/api/{client.ts, sessions.ts, palettes.ts, versions.ts, forks.ts, flags.ts, colors.ts, admin.ts}.ts` mirroring the section structure; re-export from `palette/api/index.ts` for source-compat. | Behavioral file 484 → 8 files of ≤ 100 LoC each; matches the api/src/ + src/units/color/conversions/ decomposition idiom. Cohesion improvement. | H.W2 |
| H-OPP-4 | `color-picker/index.ts` data lift | `demo/@/components/custom/color-picker/index.ts` (376 LoC) | 99 LoC behavior + 277 LoC `colorSpaceInfo` metadata table | Extract `colorSpaceInfo` to a new `colorSpaceInfo.ts` adjacent file; type it as `Record<DisplayColorSpace, ColorSpaceInfo>` so `ComponentSliders.vue:162` drops its `(colorSpaceInfo as any)[space]` cast. | Cohesion + types — clears the 1 demo `as any` cast. Behavioral index.ts → 99 LoC. | H.W2 |
| H-OPP-5 | `withTransaction` 7 → 9 | `api/src/services/admin/users.ts:183-216` | `deleteUserPalettes` + `pruneEmptyUsers` perform cross-collection writes without `withTransaction` | Wrap each in `services.withTransaction(async (session) => {...})`, thread `session` through the repo calls (votes/flags/palettes for the first; sessions/users for the second). | Cascade-correctness — closes the partial-failure orphan window. Same idiom as G.W3 Lane E's 4 additions. | H.W1 |
| H-OPP-6 | `bench/` provenance hygiene | `bench/color2-direct-paths.mjs:70,78,85,113` | 4 line-number citations (`xyz-extended.ts:49`, `:43`, `transfer.ts:38`, `cylindrical.ts:131`) | Rewrite to module + symbol citations (e.g. `xyz-extended.ts:lin2srgb`, `transfer.ts:srgbCompand`, `cylindrical.ts:hsl2rgb`). Stable across refactors. | Doc-drift hygiene — the 3 other bench files already follow this shape. Consistency + future-proof. | H.W3 (doc-only) |
| H-OPP-7 | Rolldown region-marker strip | `vite.config.ts` (production mode) OR new `rolldown` plugin | 52 `//#region`/`//#endregion` marker pairs survive into `dist/value.js` (~1,560 B / 1.2%) | Add a small Rolldown output-transform plugin OR a `package.json:build` post-step regex-strip. | Bundle byte delta -1.2%. Low value, low risk — clean micro-transposition. | H.W2 |
| H-OPP-8 | `proof:no-bare-builtins` scope expansion | `scripts/proof-no-bare-builtins.mjs:21` + `plugins/vite-source-export.ts:2` | Proof scans only `api/src/`; `plugins/vite-source-export.ts:2` uses bare `fs` import (only outlier outside `api/src/`) | (a) Fix `plugins/vite-source-export.ts:2` → `node:fs`. (b) Extend `SCAN_ROOT` to walk `plugins/`, `scripts/`, `bench/`. | Repo-wide `node:*` discipline; locks in the only outlier. Adds nothing new to the 8 proof scripts (extends one). | H.W1 |
| H-OPP-9 | `units/normalize.ts:319` type-predicate narrowing | `src/units/normalize.ts:315-320` | `asColorValueUnit(value)` casts via `as unknown as` after a runtime check | Replace with the existing `isColorUnit` type-predicate from `units/utils.ts` — `if (!isColorUnit(value)) throw …; return value;`. The narrowing flows through. | Removes 1 `as unknown as`. Pairs with H-OPP-2 to drop the cap to 3. Marginal — keep on H.W1 spec; defer to H.W2 if tight. | H.W1–H.W2 |

**Total candidates surfaced**: 9.

**By tree**:
- `src/`: 2 (H-OPP-1, H-OPP-9).
- `demo/@/`: 2 (H-OPP-3, H-OPP-4).
- `api/src/`: 1 (H-OPP-5).
- `bench/` + config + scripts: 4 (H-OPP-6, H-OPP-7, H-OPP-8, H-OPP-2).

**"No further transposition needed" verdict**:
- **`src/transform/`** — single 541-LoC cohesion-honest file (decompose + slerp + recompose); spec-algorithm cluster. No action.
- **`src/quantize/`** — 2 files totalling 547 LoC; well-decomposed. No action.
- **`src/easing.ts`** — 30+ named timing functions, no cohesion split makes sense. No action.
- **`src/units/color/conversions/`** — the 8 focused modules from G.W1 Lane B; no further split candidate.
- **`api/src/repositories/`** — 9 files all ≤ 186 LoC. No action.

---

## §10 — Top-5 strongest candidates with rationale

Ranked by impact-per-effort and invariant-codification value:

1. **H-OPP-5 — `withTransaction` 7 → 9** (api). Closes a genuine cascade-correctness gap. Same idiom as G.W3 Lane E's 4 additions. ~30 LoC of changes; deterministic test gate (the wrapped path is exercised by an existing admin test). Highest *correctness* value of the 9.

2. **H-OPP-1 + H-OPP-2 — XYZ_FUNCTIONS mapped-type + `as unknown as` budget proof** (src). Together retire 1 of 4 boundary casts and codify the irreducibility of the remaining 3 (G4-style runtime contract). Mirrors the G.W2 Lane B `DirectPathsTable` pattern exactly. Highest *invariant* value.

3. **H-OPP-3 — `demo/@/lib/palette/api.ts` 484 → 8 modules**. The lone behavioral file > 400 LoC in `demo/`. Section comments map cleanly to file boundaries. Mirrors the `color/utils.ts` → `conversions/` decomposition idiom; brings the demo's API client into structural parity with the api/ + src/units/color/ shapes.

4. **H-OPP-8 — `proof:no-bare-builtins` scope expansion** (config + plugin fix). Repo-wide `node:*` discipline with one outlier to fix; the proof script already has the walker logic. Highest *policy* value-per-effort.

5. **H-OPP-7 — Rolldown region-marker strip** (config). 1.2% bundle byte delta, low effort, zero risk. The G.W1 Lane B side-effect carried forward; H closes the loop H-SEED §3 #1 flagged.

H-OPP-4, H-OPP-6, H-OPP-9 are smaller-effort H.W2/H.W3 polish items — clean wins, low effort, but not deciding-the-shape-of-the-tranche items.

---

## §11 — Forward-carry to H wave planning

- **H.W1 (correctness + type-strength)**: H-OPP-5 (withTransaction), H-OPP-1 + H-OPP-2 (XYZ_FUNCTIONS + budget proof), H-OPP-8 (proof scope expansion), H-OPP-9 (type-predicate narrowing). 5 lanes; ~150 LoC delta; all with deterministic proof-script gates.
- **H.W2 (decomposition + config)**: H-OPP-3 (api.ts 484→8), H-OPP-4 (colorSpaceInfo lift), H-OPP-7 (region-marker strip). 3 lanes; mostly mechanical.
- **H.W3 (doc-drift hygiene)**: H-OPP-6 (bench provenance). 1 lane; doc-only.

Per H-SEED §3 #5 (`useMetaballRenderer.ts` → `@mkbabb/glass-ui/metaballs`): RE-CHECK at glass-ui's next non-AK tranche-open. Per H-SEED §2 row 1 (8 glass-ui primitive asks): same gate. Neither is H-eligible without the upstream ship.

---

## §12 — Verdict on H-SEED §3 prompts

| H-SEED prompt | Audit verdict |
|---|---|
| §3 #1 — Rolldown region-marker strip | YES — actionable as H-OPP-7. ~1.2% bundle delta. |
| §3 #2 — bench provenance hygiene | YES — actionable as H-OPP-6. `color2-direct-paths.mjs` is the lone offender. |
| §3 #3 — `as unknown as` corpus (XYZ_FUNCTIONS mapped-type + budget proof) | YES — actionable as H-OPP-1 + H-OPP-2. The XYZ_FUNCTIONS lift is exact-shape parallel to G.W2 Lane B. |
| §3 #4 — `Color<T>` deeper restructure | NO — would defeat L8 own-property monomorphic storage + force a 3-tranche-scale BREAKING migration. G.W2 Lane C verdict HOLDS. |
| §3 #5 — `useMetaballRenderer` → `glass-ui/metaballs` | DEFER — gated by glass-ui's next non-AK tranche-open. |

| H-SEED §7 open question | Audit verdict |
|---|---|
| §7 #1 — demo god-module risk | NONE — 1 split candidate (H-OPP-3) but it's borderline; no swelling. |
| §7 #2 — `as unknown as` budget proof | YES — H-OPP-2. |
| §7 #3 — glass-ui contraction-posture inversion | NOT-in-scope-for-this-audit. |
| §7 #4 — api decomposition candidate analogous to `color/utils.ts` | NONE — service/repo decomposition already honored ≤ 250 LoC cap. The 2 un-wrapped cross-collection writes (H-OPP-5) are the genuine api finding. |

---

## §13 — Authority

This audit is read-only and pinned by `docs/tranches/G/H-SEED.md` + `docs/tranches/G/audit/G-AUDIT-5-library-demo-architecture.md` + `docs/tranches/G/FINAL.md`. Wave planning supersedes this audit wherever the orchestrator chooses; H-OPP numbers are inheritable identifiers for the wave-plan to reference but not commitments.

H opens with a smaller substrate than G did — the architectural transposition surface is now polish-grade. The 9 candidates here are real improvements, but none are structural rescues. The G-tranche infrastructure (proof scripts, focused modules, withTransaction discipline, decomposed color subsystem) is doing its job.
