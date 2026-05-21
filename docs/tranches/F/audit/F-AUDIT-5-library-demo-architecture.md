# F-AUDIT-5 — Library + demo architecture at F open (post-W12)

**Mode**: READ-ONLY. Authored at F open.
**Date**: 2026-05-20.
**Branch / HEAD**: `tranche-f` @ `e1549e0` (W12-unblocker — dts flat dist/ layout).
**Precedent**: `docs/tranches/E/audit/E-AUDIT-5-library-demo-architecture.md` (carries the 15-transposition list this audit re-surveys).

---

## §0 — Methodology

**Scope**:

- `src/` library at HEAD (10,581 LoC across 29 .ts files — +348 LoC since E open's 10,233 figure; entirely from E.W1 perf additions: DIRECT_PATHS table + rgb-family helpers + tryParse context window + keys() cache).
- `demo/` post-E.W2 Lane D + post-W8-W12 lockstep dep bumps.
- W8-W12 architectural surface: Vite 8 + Rolldown (`08a7f96`), TS 6 (`9f56813`), vue-tsc 3.3 (`442aba1`), dts emit layout (`e1549e0`).

**Inspection criteria** (per dispatch):

1. Status of E-AUDIT-5 §9's 15 transposition opportunities at F open.
2. Post-W12 architectural surface — new debt or opportunities.
3. Library structural state vs E close.
4. Demo structural state vs E close.
5. NEW transposition candidates surfaced at F open per "necessary and desirable" clause.
6. NO LEGACY CODE re-verify against E2 sharpening.

**HEAD verified**: `git -C /Users/mkbabb/Programming/value.js log -1 --format=%H` returns `e1549e0d309c31b4e977765d7c7a02fc67987078`. PROCEED.

---

## §1 — E.W1's 15 transposition opportunities — status at F open

All 15 items E-AUDIT-5 §9 enumerated. Status at HEAD `e1549e0`:

| # | Item | E-close state | F-open state | Notes |
|---|------|---------------|--------------|-------|
| 1 | `lerpLegacy` retirement | DEFERRED (E5 trigger: keyframes.js maintainer migration of 2 broken call sites; codemod `scripts/migrate-keyframes-js-lerp.mjs` shipped) | **STILL DEFERRED** at HEAD per `src/math.ts:34–45` JSDoc + `src/index.ts:166` export. Trigger unchanged. | Lone `@deprecated` survivor; F-scope inheritance candidate IF keyframes.js trigger fires. |
| 2 | 152-branch `nameParser` `any()` | LANDED E.W1 Lane D | **LANDED** at `src/parsing/color.ts:520–536` — `KNOWN_COLOR_NAMES = new Set(Object.keys(COLOR_NAMES))` + single `namedColorIdent` regex + `.chain()` Map-lookup. Bench gate: parser-namelookup 47.33× speedup. | Verified. |
| 3 | `WhitePointColor<T>` lift | LANDED E.W1 Lane B | **LANDED** — `grep -rn "WhitePointColor" src/` returns 0 class declarations; all 15 spaces extend `Color<T>` directly (`src/units/color/index.ts:246–579`). `whitePoint: WhitePoint = "D65"` lives on `Color<T>` base (line 71). Only comment references remain (`:60–61, :213`) as audit-trail. | Verified. |
| 4 | `DIRECT_PATHS` table for `color2` | LANDED E.W1 Lane C | **LANDED** at `src/units/color/utils.ts:1217–1229` — 6-pair table (oklab↔rgb, oklch↔rgb, hsl↔rgb). `color2` checks `DIRECT_PATHS[directKey]` before XYZ-hub fallback (line 1241). Bench gate: color2-direct-paths 4.28× HSL→RGB. | Verified. |
| 5 | rgb-family helpers | LANDED E.W1 Lane C | **LANDED** — `rgbFamily2xyz` + `xyz2rgbFamily` at `src/units/color/utils.ts:913, 928`; 6 wide-gamut conversion sites (Linear-sRGB / Display-P3 / Adobe-RGB / ProPhoto-RGB / Rec2020) collapse to single-call helpers. | Verified. |
| 6 | Conversion-barrel cleanup | LANDED E.W1 Lane A (54 actual) | **LANDED** — `src/index.ts:114–117` carries the rationale comment + retained surface is only `color2`, `colorUnit2`, `gamutMap`, `interpolateHue`, `mixColors`, contrast helpers. The 51 individual `<from>2<to>` functions remain internal-only. | Verified. |
| 7 | `vue-router` devDep move | LANDED E.W1 Lane A | **LANDED** — `package.json:78` lists `vue-router: ^4.6.4` in `devDependencies`. `dependencies` carries only `@mkbabb/parse-that: ^0.8.2` (single-runtime-dep library). | Verified. |
| 8 | `Color.keys()` cache | LANDED E.W1 Lane C | **LANDED** — `src/units/color/index.ts:186–191` reads `(C as typeof Color & { channelKeysWithAlpha? }).channelKeysWithAlpha ?? […]`. All 15 subclasses define `static readonly channelKeysWithAlpha` (lines 247, 271, 295, …, 555, 579 — 15 sites). | Verified. |
| 9 | `keyFn` identity at memoize sites | LANDED E.W1 Lane D (7 sites) | **LANDED** at the 7 string-input memoize sites. Bench gate retained the L8 hot-path margin. | Verified via FINAL.md §5 + commit `b4bc8ea`. |
| 10 | `as any` cleanup | LANDED E.W1 Lane E (7 sites) | **LANDED** — total `as any` drops from 44 (E-AUDIT-5 §5.3 figure) → **37** at HEAD (`grep -rn "as any" src/ \| wc -l`). 7-site delta matches the FINAL.md §7 INTERNAL line. | Verified. |
| 11 | `tryParse` context window | LANDED E.W1 Lane D | **LANDED** at `src/parsing/utils.ts:41–53` — 16-char window (8 before + 8 after offset). +2 unit tests in the 1584-test suite (E.W1 Lane D test additions). | Verified. |
| 12 | `ch<T>` consolidation | LANDED E.W1 Lane E | **LANDED** — `src/units/color/index.ts:37` exports `export const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;`. The per-file duplicates in `utils.ts` + `contrast.ts` are gone (`utils.ts:5` now imports `ch` from `.`; `contrast.ts` imports from `.`). | Verified. |
| 13 | CLAUDE.md drift footgun | LANDED E.W1 Lane E | **LANDED** — `src/units/CLAUDE.md`, `src/units/color/CLAUDE.md`, `src/parsing/CLAUDE.md`, `demo/CLAUDE.md`, root `CLAUDE.md` all carry the "LoC counts intentionally omitted — `wc -l` is the source of truth" note (visible in the system-reminder views fetched during this audit). | Verified. |
| 14 | palette-manager wiring extraction | LANDED E.W2 Lane D (314 → 154 LoC) | **LANDED** — `wc -l demo/@/composables/palette/usePaletteManager.ts` → 154; companion `usePaletteManagerWiring.ts` → 159. Total 313 LoC across the pair (was 314 in one file). | Verified. |
| 15 | `api/src/middleware.ts` split | LANDED E.W2 Lane E (279 LoC → 6 files ≤100 LoC) | **LANDED** per E FINAL.md §7 INTERNAL line + commit `6945a0d` (api/ outside library scope but referenced by audit checklist). | Verified via commit reference. |

**Roll-up at F open**:
- 14 of 15 items LANDED + carried forward unchanged through W8-W12 dep bumps (no regression; verified by bench gate green + test count flat at 1584).
- 1 item DEFERRED (item 1 — `lerpLegacy`), carrying E5 (a)(b)(c) trigger. The keyframes.js peer has NOT shipped the codemod-application during E's window (per E coord §5). The deferral remains compliant with E5.

**Drift since E close**: zero. None of W8-W12's dep bumps disturbed the E.W1 transposition surface.

---

## §2 — Post-W12 architectural surface

### §2.1 — Vite 8 + Rolldown impact (W10-β / `08a7f96`)

The bump is **structurally clean** with one substantive architectural ripple:

**Rolldown-specific config**:
- `vite.config.ts:95` + `:161` use the new `rolldownOptions` key (renamed from `rollupOptions`). The library mode passes only `{ external: ["vue", "@mkbabb/parse-that"] }`; gh-pages mode passes a function-form `manualChunks` (deprecated-not-removed at Vite 8; clean follow-on is the declarative `codeSplitting` form).
- `vite-plugin-dts` stays at `^4.5.4` (vue-tsc 3.3.1 peer-range conflict prevents 5.x — surfaced as constellation binding, NOT a value.js scope decision).
- `@vitejs/plugin-vue` stays at `^6.0.7` (Vite-8-compat via peer range `^5 || ^6 || ^7 || ^8`).

**Rolldown side-effects discovery** (the W10-β architectural ripple): Rolldown 1.0.1 applies `"sideEffects": false` harder than Rollup did, dead-stripping the hero-lab demo entry to its modulepreload polyfill. The idiomatic fix scopes `sideEffects` to a file pattern in `package.json:20–23`:

```json
"sideEffects": [
    "./demo/**",
    "**/*.css"
]
```

**This is the correct architectural shape**, not a workaround. The library `dist/` surface remains tree-shakeable (an esbuild bundle of `import { Color }` produces 147 kB with zero `postcss-*` / `standalone-*` references per W10-β commit verification); only demo entries + CSS files retain side-effect status. **No transposition needed.**

**Bundle size impact**: `dist/value.js` 141.47 kB → 124.98 kB (-11.7%) — Oxc minify shrink. Net positive regression.

**Build perf**: library build 1.12 s → 956 ms (-14.6%).

### §2.2 — TypeScript 6 impact (W12-β / `9f56813`)

The bump is **mechanical and byte-flat**:

- `package.json:80` declares `typescript: "^6.0.3"`. The only meaningful lockfile delta is `typescript 5.9.3 → 6.0.3`.
- vue-tsc error count: 126 (E close baseline) → 120 (post-TS 6) — **6 errors silently resolved** by TS 6's narrowing improvements in the shadcn-vue ui/ cluster. Direction is improving, not regressing.
- `as any` count at HEAD: 37. Compared to E close (37 — verified via `git -C … grep -c "as any" 47399c2 -- src/`): **0 drift**. No `as any` re-introduced under TS 6.
- `@ts-ignore` count at HEAD: 1, exclusively at `src/utils.ts:146` (the pre-existing memoize cache-field assignment — present at E close per `git show 47399c2:src/utils.ts | grep -n "@ts-ignore"` returning the same line). **0 drift**.
- `@ts-expect-error` count at HEAD: 0. **0 drift**.
- Library build: 124.98 kB (byte-flat vs W10-β).
- Test suite: 34 files / 1584 tests pass (flat vs E close).

**No new `as any` adoption; no TS 6-imposed type-system regressions.** The dispatch's hard-cap is honored by the codebase itself — TS 6 was absorbed without weakening the type surface.

### §2.3 — vue-tsc 3.3 impact (W9-A / `442aba1`)

- `package.json:84` lifts `vue-tsc: ^2.2.0 → ^3.3.1`. Constellation LOCKSTEP — glass-ui already at this version.
- vue-tsc 3 ships a new analyzer (Volar 3); the 126-error baseline is **declared flat in character** per the W9-A commit (the ui/ tree still hits `exactOptionalPropertyTypes` violations the same way, the count is what's flat against the new analyzer).
- Post-W12 the count is 120, all in `demo/@/components/ui/*` (84 files) — except **2 errors in `demo/@/components/custom/dock/menus/`** that arose from the W9-C `lucide-vue-next → @lucide/vue` rename (see §2.4 below). This is a NEW non-vendor error surface at F open.

### §2.4 — `dts` emission layout (W12-unblocker / `e1549e0`)

The headline F-open commit. Before the fix:
- `vite-plugin-dts` inferred `publicRoot` from the common ancestor of program source files. With only `entryRoot` set, the plugin still mirrored the source layout under `dist/src/`, so the dts tree shipped as `dist/src/index.d.ts` while `package.json` `"types": "./dist/index.d.ts"` claimed flat layout. Every typed consumer (keyframes.js, words/frontend) hit TS7016 on `@mkbabb/value.js` import.

The fix (`vite.config.ts:115–122`):
```ts
dts({
    include: ["src/"],
    compilerOptions: {
        rootDir: path.resolve(import.meta.dirname, "src"),
    },
    entryRoot: path.resolve(import.meta.dirname, "src"),
}),
```

Pinning `compilerOptions.rootDir` to `<repo>/src` decouples `publicRoot` from the program-source-set inference. The dts tree now collapses to `dist/{index,units,parsing,...}.d.ts` — parallel to `dist/value.js`.

**Verified at HEAD**: `find dist -name "*.d.ts"` returns 31 dts files; `ls dist/src` returns ABSENT (flat layout confirmed). All consumer surface is callable through `@mkbabb/value.js`.

**This unblocks the constellation's typed consumers immediately.** No remaining transposition needed for the build pipeline.

---

## §3 — Library structural state (post-W12)

| Surface | E-close shape | F-open shape | Delta |
|---|---|---|---|
| `src/index.ts` barrel | ~200 named exports (post-Lane-A 54-conversion un-export) | 307 LoC; same export inventory; lines 114–117 carry the rationale comment | flat |
| `src/units/color/index.ts` | 546 LoC pre-Lane-B; LANDED Lane B lifted WhitePointColor; ~600 LoC at E close | 618 LoC; `Color<T>` carries `whitePoint: WhitePoint = "D65"` at line 71; 15 subclasses extend Color directly; `static readonly channelKeysWithAlpha` on each (Lane C) | +~18 LoC (additional dev-guard + Lane C `keys()` cache wiring) |
| `src/units/color/utils.ts` | 1174 LoC pre-Lane-C; +DIRECT_PATHS + rgb-family helpers brought to ~1430 | 1430 LoC | flat since Lane C land |
| `src/parsing/color.ts` | 600 LoC pre-Lane-D; +broad-regex + Set lookup | 615 LoC; `KNOWN_COLOR_NAMES = new Set(Object.keys(COLOR_NAMES))` at line 520 | flat since Lane D land |
| `src/math.ts` | 100 LoC; `lerpLegacy` + `@deprecated` JSDoc with E5 trigger | 107 LoC; lerpLegacy + JSDoc + E5 trigger STILL PRESENT (lines 34–45) | flat |
| `src/parsing/utils.ts` | 50 LoC pre-Lane-D; +12 LoC for tryParse context window | 62 LoC; lines 41–53 carry the windowed error | flat since Lane D land |
| `src/units/utils.ts` | 430 LoC | 448 LoC | +18 LoC (minor; likely Lane C `containerQuery` unit work) |
| Total `src/` | ~10,233 LoC | 10,581 LoC | +348 LoC (entirely E.W1 perf work) |

**`@deprecated` survivors**: 1 — `src/math.ts:34` (`lerpLegacy` JSDoc; E5 deferral).
**`as any` survivors**: 37 — same count as E close.
**`@ts-ignore` survivors**: 1 — `src/utils.ts:146` (memoize cache-field; pre-existing).
**`@ts-expect-error` survivors**: 0.
**`TODO/FIXME/XXX/HACK` survivors**: 0.

The library structural shape is **stable since E close**. W8-W12 added no LoC to `src/`; the +348 LoC delta is entirely E.W1's land (already accounted in E close).

---

## §4 — Demo structural state

| Surface | E-close shape | F-open shape | Delta |
|---|---|---|---|
| `demo/@/composables/palette/usePaletteManager.ts` | 154 LoC (post-E.W2 Lane D slim from 314) | 154 LoC | flat |
| `demo/@/composables/palette/usePaletteManagerWiring.ts` | 159 LoC (E.W2 Lane D companion) | 159 LoC | flat |
| `demo/@/styles/style.css` glass-ui imports | Both `./styles` + `./styles.css` (E.W0 Lane A) | Both still present (lines 23–24) | flat |
| `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue` | Imports `Github` from `lucide-vue-next` | **BROKEN** — imports `Github` from `@lucide/vue` (line 4); icon was removed in the W9-C rename | +1 type error |
| `demo/@/components/custom/dock/menus/ProfileSection.vue` | Imports `Github` from `lucide-vue-next` | **BROKEN** — same as above | +1 type error |

**The `Github` icon error is a NEW non-vendor type error at F open.** The W10-β commit message explicitly catalogues it as "blocked by a pre-existing W9-C chronic — `Github` was removed in the `lucide-vue-next` → `@lucide/vue` rename and has no canonical replacement in @lucide/vue's 5875 exports." `gh-pages` mode build is BLOCKED by this until the icon import is migrated.

**The fix**: replace `Github` with the closest extant @lucide/vue export. Candidates after a 5875-symbol scan:
- `Code` (generic; loses the platform branding)
- A custom inline SVG (`<svg viewBox="…">` literal; restores branding semantically)
- An asset import from `assets/icons/github.svg` (if a brand-asset convention is desired)

The semantically-correct path is the inline SVG (GitHub's brand mark has no Lucide canonical because Lucide-1.x stripped vendor brand glyphs). **Wave-slot estimate: 0.1.**

---

## §5 — NEW transposition opportunities surfaced at F open

Per the F-opening "necessary and desirable" clause. Listed with file:line precision, structural rationale, and impact estimate.

### §5.1 — Migrate the 2 dock-menu `Github` imports off @lucide/vue (W9-C chronic)

**Location**: `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:4`, `demo/@/components/custom/dock/menus/ProfileSection.vue:4`.

**Rationale**: vue-tsc 3.3.1 emits TS2305 ("Module '\"@lucide/vue\"' has no exported member 'Github'") on both sites. `@lucide/vue` 1.16.0's 5875 exports include no canonical `Github` symbol — the Lucide 1.x line stripped vendor brand glyphs by design. `npm run gh-pages` is BLOCKED at this surface.

**Idiomatic fix**: replace the icon import with an inline SVG component that carries GitHub's brand mark, OR an `<img src="@assets/icons/github.svg">` reference. The inline SVG preserves the consumer-prop contract (size, currentColor) without introducing an icon-package dependency.

**Impact**:
- LoC delta: ~+10 LoC per site (inline SVG); 2 sites total ≈ +20 LoC OR a single shared `GithubIcon.vue` brand glyph ≈ +30 LoC.
- Bench delta: zero.
- Surface delta: gh-pages build unblocked; vue-tsc error count 120 → 118 (removes both custom-tree errors; the 84-file ui/ vendor cluster remains).
- Wave-slot: 0.1.

**F-axis**: ELEGANCE — closes a constellation-LOCKSTEP debt the W9-C bump opened.

### §5.2 — Replace function-form `manualChunks` with Rolldown declarative `codeSplitting`

**Location**: `vite.config.ts:163–169` (gh-pages mode).

**Rationale**: W10-β commit explicitly flags this: "Function-form `manualChunks` retained — Rolldown 1.0.2's typed surface still exposes `ManualChunksFunction = (id, meta) => ...`; the Vite 8 migration guide marks function form deprecated, not removed. Future declarative rewrite via Rolldown's `codeSplitting` groups is a clean follow-on."

The current form scans `id.includes("node_modules")` + `id.includes("katex")` / `id.includes("highlight")` — string-substring matching per Rolldown chunk. Declarative `codeSplitting` form (per Rolldown 1.0.2 docs) expresses the same intent as `{ groups: [{ name: "vendor-katex", test: /katex/ }, …] }`.

**Idiomatic fix**: rewrite the 7-line function as a declarative groups array.

**Impact**:
- LoC delta: -2 to -5 LoC (declarative form is denser).
- Bench delta: zero.
- Surface delta: removes a deprecation warning surface against a future Vite 9.
- Wave-slot: 0.25.

**F-axis**: ELEGANCE + future-proofing.

### §5.3 — Strengthen the `@ts-ignore` site at `src/utils.ts:146` to a typed cache attachment

**Location**: `src/utils.ts:144–149`:

```ts
} as T;

// @ts-ignore
memoized.cache = cache;

return memoized as any;
```

**Rationale**: The `memoize` helper attaches a `.cache` field to its returned function for external invalidation. The `@ts-ignore` + `as any` pair erases the cache shape from the public type. Per E2 (NO LEGACY CODE) sharpening + the dispatch hard-cap ("DO NOT propose `@ts-ignore` … strengthen types upstream"), this is the residual upstream strengthening: lift `cache: Map<…>` into the returned function type so consumers can read `memoized.cache.clear()` without a cast.

**Idiomatic fix**: declare the return type as `MemoizedFn<T> = T & { cache: Map<string, ReturnType<T>> }`, eliminating both the `@ts-ignore` and the trailing `as any`.

**Impact**:
- LoC delta: ~+5 LoC (one new type alias, return-type annotation).
- Bench delta: zero (`@ts-ignore` has zero runtime presence).
- Surface delta: removes the sole `@ts-ignore` survivor in `src/` (count 1 → 0); `as any` count 37 → 36.
- Wave-slot: 0.25.

**F-axis**: ELEGANCE — closes the last @ts-ignore in the library and the one remaining type-erasure footgun the audit can name.

### §5.4 — Lift `picomatch` 3.0.4 → 4.0.4 ripple (vue-tsc 3 transitive)

**Location**: lockfile post-`442aba1`.

**Rationale**: The vue-tsc 3 bump dragged `@vue/language-core 3.3.1` which dragged `picomatch 3 → 4`. This is a peer-dep transitive lift, not a value.js scope decision. Survey at HEAD: `package-lock.json` references `picomatch 4.0.4`. **No source-level transposition is needed.** Listed here for E2-style completeness — to mark that the lift was absorbed without value.js-side action.

**Impact**: tracked-and-absorbed; no F-scope work. Surface delta: zero.

### §5.5 — Color hierarchy follow-on: consolidate the 5 RGB-family classes (deferred at E)

**Location**: `src/units/color/index.ts:483, 507, 531, 555, 579` (LinearSRGBColor, DisplayP3Color, AdobeRGBColor, ProPhotoRGBColor, Rec2020Color).

**Rationale**: E-AUDIT-5 §2.2.2 surveyed this and explicitly DEFERRED it on tree-shaking grounds: "If a consumer only uses `RGBColor`, the bundler today can drop `Rec2020Color`; with a parameterized family it cannot. Tradeoff: 120 LoC of duplication vs ~3 kB of unused gamut code on a constrained bundle. **For value.js as a CSS-spec library, the duplication is the correct call.** Skip."

**At F open, this verdict still holds**. Rolldown's tree-shaking (per the W10-β `sideEffects` scoping) does NOT obviate this — the structural cost of a parameterized RGBFamily class is the same against Rolldown as it was against Rollup. **No new transposition.** Listed here to mark that the E-deferral remains correct at F open.

### §5.6 — Color hierarchy follow-on: `goo-blob/composables/useBlobSatellites.ts` extirpation (deferred at E)

**Location**: `demo/@/components/custom/goo-blob/composables/useBlobSatellites.ts` (~294 LoC per E-AUDIT-5 §3.3 figure).

**Rationale**: E-AUDIT-5 §3.3 flagged this as "the largest single composable file outside the palette facade … Not actionable today, but worth flagging as a candidate for the post-glass-ui blob extirpation." Per E-coord §3, glass-ui has not shipped the GooBlob primitive at E close.

**At F open**: blob primitive still pending at glass-ui; the extirpation still routes to a successor tranche. **No F-scope action.**

---

**New transposition count at F open**: **2 actionable** (§5.1 dock-menu Github + §5.3 utils.ts @ts-ignore strengthen) + **1 future-proofing** (§5.2 declarative codeSplitting) = **3 total**.

Two are micro-scope (≤ 0.25 wave-slot); §5.1 is the load-bearing one because it unblocks the gh-pages build path.

---

## §6 — NO LEGACY CODE re-verify (E2 sharpened)

| Marker | E-close count | F-open count | Drift | Verdict |
|---|---|---|---|---|
| `@deprecated` in `src/` | 1 (`lerpLegacy` JSDoc with E5 trigger) | 1 (`src/math.ts:34`, same JSDoc) | 0 | E5-COMPLIANT — gated on keyframes.js maintainer; trigger documented |
| `_legacy\|Legacy\|_old\|\bOld\b` in `src/` | 3 (all on the `lerpLegacy` line/export) | 3 (same) | 0 | Co-located with #1; no new survivors |
| `TODO\|FIXME\|XXX\|HACK` in `src/` | 0 | 0 | 0 | CLEAN |
| `@ts-ignore\|@ts-expect-error` in `src/` | 1 (`src/utils.ts:146` memoize cache) | 1 (same line) | 0 | Pre-existing; §5.3 names the strengthening |
| `as any` in `src/` | 37 (post-Lane-E 7-site cleanup) | 37 | 0 | No new survivors under TS 6 |

**Verdict**: E2 (NO LEGACY CODE) is HONORED at F open. Zero drift across all five legacy markers since E close. The single `@deprecated` survivor is E5-compliant; the single `@ts-ignore` is pre-existing and §5.3 names the close-out.

---

## §7 — F-plan recommendations

### §7.1 — Transpositions F.W1 should land

Two micro-scope cleanups that close ALL non-deferred audit findings:

1. **§5.1 — dock-menu `Github` icon migration** (≤ 0.1 wave-slot)
   - Unblocks `gh-pages` build mode (W10-β-flagged chronic).
   - Removes the 2 non-vendor vue-tsc errors (120 → 118).
   - Inline SVG path; no new dep.

2. **§5.3 — `utils.ts:146` `@ts-ignore` strengthening** (≤ 0.25 wave-slot)
   - Removes the sole `@ts-ignore` survivor in `src/`.
   - Drops `as any` count 37 → 36.
   - Strengthens the `memoize` return-type contract for downstream cache-clearing consumers.

**Total F.W1 budget**: ≤ 0.35 wave-slots if both land in a single legacy-clean lane.

### §7.2 — Future-proofing (post-F.W1)

3. **§5.2 — Rolldown declarative `codeSplitting` migration** (0.25 wave-slot)
   - Removes the function-form `manualChunks` deprecation against future Vite 9.
   - Pure config-shape rewrite; no behavioural change.

### §7.3 — Deferred (E5-compliant carry-forward)

4. **lerpLegacy retirement** — gated on keyframes.js codemod application. E5 trigger documented at `docs/tranches/E/coordination/Q.md §5` + commit `b4bc8ea` + `scripts/migrate-keyframes-js-lerp.mjs`. **F does not unilaterally land** until the peer-side trigger fires.

5. **GooBlob extirpation** — gated on glass-ui's metaball primitive ship. Not F-scope.

### §7.4 — Architectural rebases NOT needed

W8-W12 introduced **zero rebase-worthy debt**. The Vite 8 + Rolldown side-effects ripple (`08a7f96`) was absorbed structurally (file-pattern scoping in `package.json`, NOT a workaround). TS 6 was byte-flat. vue-tsc 3.3 improved the error baseline. The W12-unblocker (`e1549e0`) closed a typed-consumer footgun.

The verdict: **W8-W12 was a clean ride**; F's plan can focus on micro-scope finishing-touches and NEW tranche-scope work outside the W8-W12 surface.

---

## §8 — Authority

**Audit deliverables consulted**:

- `/Users/mkbabb/Programming/value.js/docs/tranches/E/audit/E-AUDIT-5-library-demo-architecture.md` (full read — the 15-item precedent shape).
- `/Users/mkbabb/Programming/value.js/docs/tranches/E/FINAL.md` (§4 invariant matrix + §5 perf/artefact state + §6 cross-repo state + §7 release surface).
- `/Users/mkbabb/Programming/value.js/docs/tranches/E/coordination/Q.md` (§5 lerpLegacy E5 trigger + §3 cross-repo gates).

**Source files inspected** (READ-ONLY, all absolute paths):

- `/Users/mkbabb/Programming/value.js/src/index.ts` (full — 307 LoC; barrel verification).
- `/Users/mkbabb/Programming/value.js/src/math.ts` (full — 107 LoC; `lerpLegacy` E5 trigger present at lines 34–45).
- `/Users/mkbabb/Programming/value.js/src/utils.ts:140–164` (the `@ts-ignore` site).
- `/Users/mkbabb/Programming/value.js/src/units/color/index.ts:1–250` (Color base + brand + first subclasses; verified Lane B + Lane C work).
- `/Users/mkbabb/Programming/value.js/src/units/color/utils.ts:1–80, 1200–1265` (verified DIRECT_PATHS table + color2 dispatch).
- `/Users/mkbabb/Programming/value.js/src/parsing/color.ts:505–565` (verified nameParser Lane D land).
- `/Users/mkbabb/Programming/value.js/src/parsing/utils.ts` (full — 62 LoC; verified tryParse context window at lines 41–53).
- `/Users/mkbabb/Programming/value.js/demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:1–30` (Github import).
- `/Users/mkbabb/Programming/value.js/vite.config.ts` (full — Rolldown + dts config inspection).
- `/Users/mkbabb/Programming/value.js/tsconfig.json` (full — TS 6 flag verification).
- `/Users/mkbabb/Programming/value.js/package.json` (full — Vite 8 + TS 6 + vue-tsc 3.3 + lockstep verification).
- `/Users/mkbabb/Programming/value.js/demo/@/styles/style.css:1–25` (E.W0 Lane A glass-ui imports verification).
- `/Users/mkbabb/Programming/value.js/CLAUDE.md` (embedded in system reminder).
- `/Users/mkbabb/Programming/value.js/src/units/CLAUDE.md` (embedded).
- `/Users/mkbabb/Programming/value.js/src/units/color/CLAUDE.md` (embedded).
- `/Users/mkbabb/Programming/value.js/src/parsing/CLAUDE.md` (embedded).
- `/Users/mkbabb/Programming/value.js/demo/CLAUDE.md` (embedded).

**Bash audits performed** (READ-ONLY):

- `git log -1 --format=%H` — verified HEAD `e1549e0`.
- `git branch --show-current` — verified `tranche-f`.
- `wc -l src/**/*.ts` — LoC inventory across 29 files.
- `grep -rn '@deprecated' src/` — 1 hit (`lerpLegacy`).
- `grep -rEn '_legacy|Legacy|_old|\bOld\b' src/` — 3 hits, all co-located with #1.
- `grep -rEn 'TODO|FIXME|XXX|HACK' src/` — 0 hits.
- `grep -rEn '@ts-ignore|@ts-expect-error' src/` — 1 hit (`src/utils.ts:146`).
- `grep -rn 'as any' src/ | wc -l` — 37 hits.
- `grep -rn 'WhitePointColor' src/` — 0 class declarations; 3 comment hits (audit-trail).
- `git grep -c 'as any' 47399c2 -- src/` (E close baseline) → 37; F open → 37 → 0 drift.
- `git show 47399c2:src/utils.ts | grep -n '@ts-ignore'` → confirmed pre-existing.
- `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` → 120 (vs 126 at E close).
- `npx vue-tsc --noEmit 2>&1 | … | sort -u | grep -v components/ui/` → 2 non-vendor files (the 2 Github icon errors).
- `npx vitest run` → 34 files / 1584 tests pass.
- `find dist -name "*.d.ts"` → 31 files at flat layout; `dist/src/` ABSENT (W12-unblocker confirmed).
- `git log --oneline e1549e0 -30` — commit-history reconciliation.

**No mutations**. Branch `tranche-f` is undisturbed; the working-tree `M`/`??` entries documented in the initial gitStatus snapshot predate this audit. No git operations performed beyond read-only `log`, `grep`, `show`.

---

## §9 — Verdict summary

| Lane | Verdict |
|---|---|
| §1 — 15-item E-AUDIT-5 transposition status | 14 LANDED + carried forward unchanged; 1 DEFERRED (E5-compliant). Zero drift. |
| §2.1 — Vite 8 + Rolldown impact | Absorbed cleanly. `sideEffects` file-pattern scoping is the correct architectural shape (not a workaround). |
| §2.2 — TS 6 impact | Byte-flat; 0 `as any` / `@ts-ignore` drift. 6 vue-tsc errors silently resolved. |
| §2.3 — vue-tsc 3.3 impact | Error baseline 126 → 120 (improving). 2 new non-vendor errors are W9-C `@lucide/vue` `Github`-rename chronic. |
| §2.4 — dts flat layout | Unblocked via `compilerOptions.rootDir` + `entryRoot` pairing. 31 dts files at flat `dist/{*,units,parsing}.d.ts`. |
| §3 — Library structural state | Stable since E close. +348 LoC delta entirely from E.W1 perf land. |
| §4 — Demo structural state | Stable except 2 `Github`-icon import errors in `dock/menus/` (W9-C chronic). |
| §5 — NEW transposition opportunities | 2 actionable (§5.1 + §5.3); 1 future-proofing (§5.2); 2 carry-forward (E-deferrals correct at F). |
| §6 — NO LEGACY CODE re-verify | E2 HONORED. 0 drift across all 5 markers since E close. |
| §7 — F-plan recommendations | F.W1 legacy-clean lane: ≤ 0.35 wave-slots to close all non-deferred findings. |

**Top-3 F-scope transpositions, ranked**:

1. **§5.1 — Migrate dock-menu `Github` icon off @lucide/vue** (0.1 slot; unblocks gh-pages build).
2. **§5.3 — Strengthen `utils.ts:146` `@ts-ignore` site** (0.25 slot; removes the sole `@ts-ignore` survivor).
3. **§5.2 — Rolldown declarative `codeSplitting`** (0.25 slot; Vite 9 future-proofing).

**Deliverable path**: `/Users/mkbabb/Programming/value.js/docs/tranches/F/audit/F-AUDIT-5-library-demo-architecture.md`
