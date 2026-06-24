# Changelog

## [1.1.1] — 2026-06-23 (Q · VJ-Q1 — the `contrast-color()` library-LEADS catch-up)

The ONE platform-parity gap the keyframes.js **Tranche Q** dispatch
(`KF-TO-VALUEJS-Q.md`, VJ-Q1) named: `contrast-color()` was the FIRST CSS feature
value.js trailed the platform on (Baseline April 2026), inverting the
library-LEADS precept. This PATCH closes it. parse-that re-pinned `^0.13.0`
(transparent — the deleted `thenMap`/`fuse` had zero value.js consumers; the full
suite stays green).

### LIBRARY

- **VJ-Q1 — `contrast-color(<color>)` (CSS Color L7) eager evaluation**
  (`src/units/color/contrast.ts`, re-exported from `src/index.ts` +
  `src/units/color/index.ts`; the parser arm in `src/parsing/color.ts`). A NET-NEW
  WCAG 2.x leaf — `wcagRelativeLuminance(color)` (the linear-light sRGB luminance
  `0.2126·R + 0.7152·G + 0.0722·B`, computed via `color2(color, "srgb-linear")` so
  the cross-space transform AND the gamma decode are one step) + `wcagContrastRatio(a, b)`
  (`(L1 + 0.05) / (L2 + 0.05)`, range [1, 21]) + `contrastColor(color)` (the
  maximally-contrasting black/white). This is DISTINCT from the OKLab-lightness
  `computeSafeAccent`/`safeAccentColor` accent helpers — the WCAG metric picks a
  different endpoint near the contrast boundary (a `#767676` mid-gray resolves to
  black under WCAG; the OKLab-L metric would mispick). The leaf accepts a
  PUBLIC-domain `Color` (RGB in [0,255], as `new RGBColor(255,…)` / `parseCSSColor`
  produce) and normalizes internally. The `contrast-color()` parse arm joins the
  `c` color-dispatch bucket and resolves EAGERLY to ONE concrete `Color` (mirroring
  the `color-mix()` combinator), so `parseCSSValue('contrast-color(red)')` is now a
  `Color` (`rgb(0 0 0)`), NOT the opaque `FunctionValue` it was at 1.1.0. kf inherits
  the resolved color transparently under its existing `^1.1.0` caret.

### NO-LEGACY

- **The dead CSS Color L6 `color-contrast(... vs ...)` grammar stub** was retired
  from `src/parsing/grammars/css-color.bbnf` (the never-shipped L6 `colorContrast`
  rule + its dangling `color` rule reference), replaced by the `contrastColor` L7
  rule. The `.bbnf` is a documentation grammar (the live parser is hand-rolled
  combinators), so the delete is parse-path-inert; only the new L7 arm changes
  behavior.

### GATE

- **`proof:contrast-color`** (NEW, born-RED — `scripts/proof-contrast-color.mjs`,
  wired to `npm run proof:contrast-color`). Exercises the BUILT `dist/value.js`:
  C1 the born-RED witness (`contrast-color(red)` is a concrete `Color`, not an
  opaque `FunctionValue`), C2 the WCAG endpoint picks (DISTINCT from the OKLab-L
  metric at the `#767676` crossover), C3 the WCAG leaf math (L(white)=1, L(black)=0,
  ratio=21), C4 the dead L6 stub is gone. Verified RED on the unfixed tree
  (plant-a-failure: reverting the L7 arm re-opaques the value + restores the stub →
  C1/C2/C4 red).

## [0.13.0] — 2026-06-16 (N · the kf-K-dispatched grammar fold — N.W11.D + N.W11′)

The two net-new grammars the keyframes.js-K frontier dispatched (`GRAMMAR-FOLD.md`,
ratified 2026-06-15), shipped jointly in the N R2 library track. Both were
born-RED at 0.12.0 (the symbols were absent across `src/` and `dist/`); they
resolve and their gate laws hold at this cut. Library-only — zero demo coupling,
zero glass-ui BA gate.

### LIBRARY

- **N.W11.D — `sampleColorRamp(from, to, n, opts)`** (`src/units/color/mix.ts`,
  re-exported `src/index.ts`). The INVERSE SIBLING of `mixColorsN`: where
  `mixColorsN` folds N colors → 1, `sampleColorRamp` expands 2 colors → N
  evenly-spaced perceptual stops. A COMPOSITION over the already-shipped color
  kernels — `mixColors` (the per-step perceptual lerp; premultiplied alpha, NaN
  propagation, and the cylindrical `hueMethod` hue path all inherited) +
  `gamutMap`/`gamutMapOKLab` (the per-stop sRGB egress, so no stop silently
  clips). ZERO new color science. The `space` conversion is HOISTED out of the
  per-stop loop (the ramp pays it 2×, not 2n×). `SampleRampOptions`:
  `{ space?, hueMethod?, endpoints?: "inclusive"|"exclusive", gamutMap? }`;
  `n ≥ 2` (throws otherwise, mirroring `mixColorsN`'s empty-input throw).
  Oracle suite (`test/color-ramp.test.ts`, 13 tests): monotone deltaEOK spacing
  (every step within ±20% of the mean), in-gamut egress at every stop (incl.
  out-of-gamut endpoints), hue-method fidelity (`"longer"` traverses the long
  arc; `"shorter"` does not — the path bare two-stop `@keyframes` cannot encode),
  and identity-exact inclusive endpoints. Un-blocks kf-K.W10's CC-2 oklab
  densify (`proof:compile-replay-equal` clause (d)).
- **N.W11′ — the `CSSTimelineOptions` scroll-VALUE grammar** (NEW
  `src/parsing/scroll-timeline.ts`, re-exported `src/index.ts`). The ONE genuine
  net-new grammar of N: a typed parser + inverse serializer over the
  `animation-timeline` / `animation-range` (+ `-start`/`-end`) / `timeline-scope`
  property values (plus the forward-looking `animation-trigger` sub-item),
  authored in the `parsing/easing.ts` parser-combinator idiom beside
  `parsing/extract.ts`. The division-of-labour law is held verbatim — the parser
  emits the typed options AS-WRITTEN (the named-timeline ref as a `<dashed-ident>`
  string, `auto`/`none` as themselves, the range-phase keyword + the
  `<length-percentage>` offset verbatim); it resolves no DOM defaults and no px
  offsets (that is the kf `ScrollScene` driver's job — value.js owns VALUES, kf
  owns TIME). Public surface: `parseAnimationTimeline` / `parseAnimationRange` /
  `parseAnimationRangeBoundary` / `parseTimelineScope` / `parseAnimationTrigger`
  + `extractTimelineOptions` (the stylesheet-aggregate, mirror of
  `extractAnimationOptions`) + `serializeAnimationTimeline` /
  `serializeAnimationRange` / `serializeTimelineScope` / `serializeAnimationTrigger`
  / `serializeTimelineOptions` (the inverse, mirror of `reverseAnimationShorthand`)
  + the typed value families (`CSSTimelineOptions`, `AnimationTimelineValue`,
  `AnimationRangeValue`, `AnimationTriggerValue`, `RangeBoundary`, `RangePhase`,
  `ViewInset`, `TimelineScopeValue`, `ScrollerKeyword`, `TimelineAxis`,
  `TriggerType`). The round-trip law `serialize(parse(s)) === s` (canonical form)
  is the gate core (`test/scroll-timeline.test.ts`, 55 tests). Fail-loud rides
  the shipped `tryParse` + `OnParseError`/`ParseDiagnostic` sink (N.W7). The
  order-free `[<axis> || <scroller>]` pair (the one combinator `easing.ts` has no
  precedent for) is parsed token-then-classify and canonicalizes to
  `<scroller> <axis>`. Un-blocks kf-K.W9's scroll-as-CSS parse round-trip
  (`proof:scroll-roundtrip` clause (b)).

### INTERNAL

- **`splitTopLevelCommas` promoted to `parsing/utils.ts`** (N.W11′ D2) — the
  paren/string-aware top-level `#`-list splitter, formerly local to
  `parsing/animation-shorthand.ts`, is now a shared export consumed by both the
  `animation` shorthand splitter and the scroll-timeline `#`-list grammars. Pure
  move, no behavior change (the 25 `parsing-animation-shorthand` tests stay green).

### NOTES (value.js stylesheet-parser limitations surfaced, not in scope to fix here)

- The stylesheet parser comma-joins function args (a `scroll(root block)`
  declaration value round-trips through `Declaration.value.toString()` as
  `scroll(root, block)`); `extractTimelineOptions` tolerates the comma form.
- A property-level `#`-list declaration value (`timeline-scope: --a, --b`) is
  truncated to its first segment by the stylesheet parser's `ValueArray`. The
  per-property `parseTimelineScope` handles the FULL comma-list correctly (it is
  the primitive kf-K.W9 consumes for a single declaration string); the aggregate
  extractor gets what the stylesheet preserves.

### Stats

- vitest: **1777** (was 1584 at H close; +68 from the two new oracle suites —
  `color-ramp.test.ts` 13, `scroll-timeline.test.ts` 55 — plus the 0.11/0.12
  growth between cuts). 43 test files.
- vue-tsc: 0 errors (`tsconfig.lib.json`).
- `dist/value.js`: 145,809 B (≤ 148,480 B ceiling).
- Born-RED probes inverted: `grep -rc sampleColorRamp src/ dist/` and
  `grep -rscE "CSSTimelineOptions|parseAnimationTimeline" src/` now nonzero
  (both were ZERO at 0.12.0); all 24 new symbols (12 functions + 12 types)
  present in `dist/value.js` + the `dist/index.d.ts` roll-up.

## [0.12.0] — 2026-06 (N.W7 library wave)

- N.W7 library wave: 11 keyframes.js next-slice items, parse-that `^0.9`, the
  Prettier eviction, `parseCSSColor` root typing; the structured
  `ParseDiagnostic`/`OnParseError` diagnostics sink. (Released at commit
  `3f4f0ed`; the CHANGELOG entry is reconstructed here from the release commit.)

## [0.11.2] — 2026-06 (Tranche I dependency)

- `parseCSSValueUnit` empty-input contract (the keyframes.js Tranche I B1
  dependency). (Released at commit `0cb5dd2`.)

## [0.11.0] — 2026-06 (Tranche F hand-off)

- The Tranche F performance hand-off: A2 maximal-munch unit classifier, the
  computed-unit endpoint cache, the SoA `lerpArray` primitive, the frozen
  color-channel plan (B3/B5), `formatColor` alpha-clause omission (B1b), the
  O(1) first-char `dispatch()` color fork (A1), and the relative-length
  no-op resolution (C5). (Released at commit `e8cc1fb`.)

## [0.10.0] — 2026-05-26 (H close)

### INTERNAL

- **H1 — Cascade-correctness completion**. Cross-collection write sites wrapped in `services.withTransaction(...)` expanded **9 → 16** at H.W1. Lane A repaired the H-AUDIT-6 §3 defect (`createPalette` + `patchPalette` previously wrote across `palettes` + `palette_versions` without a transaction — orphan-version exposure class). The in-wave Lane A.2 extension (per F1 "no deferrals" + H1 maximalist invariant text) added 7 admin-tree wraps: `registerSession`, `loginSession`, admin-variant `deletePalette`, `setUserStatus`, `deleteUserPalettes`, `pruneEmptyUsers`, `deleteTag`. 9 new rollback tests (api vitest 106 → 115). Standing reference `docs/tranches/H/audit/api-withTransaction-coverage.md` enumerates every cross-collection site + its session status — the H1 invariant codifier.
- **H2 — `as unknown as` corpus retired 4 → 2** in `src/`. Lane A: typed `XyzFunctionsTable` mapped-type at `units/color/dispatch.ts` (mirrors G.W2 Lane B's `DirectPathsTable` precedent). Lane C: type-predicate `isColorValueUnit` at `units/normalize.ts:319` (also removed a dead-helper double-discriminant check). The 2 residual sites are policy-documented irreducibles (`normalize.ts:117` DOM `CSSStyleDeclaration`; `parsing/color.ts:59` clone-reinterpret). Codified by NEW `proof:as-unknown-as-budget` script (budget = 2 — tightened from plan's 3 per the cleaner-than-anticipated outcome).
- **H3 — No `demo/` god module**. Every `demo/` file (excluding `demo/@/components/ui/` shadcn-vue) is now ≤ 400 LoC. Lane A decomposed `demo/@/lib/palette/api.ts` (484 LoC, 13 sections) → 9 cohesion-honest modules under `api/` (max 110 LoC), with the old `api.ts` DELETED (no shim — directory-as-module resolution). Lane B decomposed `PointerDebugOverlay.vue` (449 → 286) via `DebugEventLog.vue` sub-component lift + `usePointerDebug` composable extraction, and `PaletteCard.vue` (435 → 388) via `PaletteCardSwatches.vue` sub-component lift. Lane C lifted the pure-data `colorSpaceInfo` (291 LoC) out of `color-picker/index.ts` (376 → 99); zero consumer impact (barrel re-export).
- **H4 — Cross-tree invariant codification**. Three proof-script scope extensions land: `proof:no-ts-ignore` extended `src/` → `src/ + demo/` (with `--exclude-dir=ui` for vendored shadcn); `proof:no-bare-builtins` extended `api/src/` → `api/src/ + plugins/ + scripts/ + bench/`; NEW `proof:as-unknown-as-budget`. Demo `@ts-ignore` retired (2 sites in `useMarkdownHighlighting.ts` via `declare module "*.css?inline"` in `demo/color-picker/vite.d.ts`). `plugins/vite-source-export.ts` `from "fs"` → `from "node:fs"` outlier fixed. **All 9 proof scripts now run at their full applicability.**
- **api/tsconfig.json lifted to root strictness** at H.W1 Lane B — 4 missing flags added (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`). 36 surfaced errors repaired genuinely (zero `@ts-ignore`, zero `as any`, zero `as unknown as` added). Incidental: latent duplicate `PaletteColor` interface in `api/src/hash.ts` unified to canonical `models.ts` source-of-truth.
- **Rolldown `//#region` markers stripped** from `dist/value.js` via `vite.config.ts` `rolldownOptions.experimental.attachDebugInfo: "none"` (scoped to production only). `dist/value.js` 125,496 B (G close) → **124,130 B** (−1,366 B). 4× the H-SEED ~314 B estimate. Bench gates all GREEN (L8 ≥ 5×, DIRECT_PATHS HSL→RGB ≥ 2×, nameParser ≥ 5×).
- **Bench provenance hygiene**: 7 line-number references in `bench/color2-direct-paths.mjs` + `bench/parser-namelookup.mjs` repointed from `file:NNN` to `file: <SYMBOL>` (drift-resistant; line numbers churn on every refactor).
- **E2E reactivity-instant flake mitigation**: `e2e/smoke/reactivity-instant.spec.ts` had TWO 200ms `waitForFunction` double-duty timeouts (the cited slider-keyboard at :198 AND a discovered symmetric spectrum-drag at :95). Outer "alive?" budget widened 200 → 2000ms; perceptual gates (50ms spectrum, 100ms slider) UNCHANGED.
- **CONTRIBUTING.md + NEW docs/RELEASE.md**: the manual tranche-close publish ceremony is now codified (6 sections — prerequisites, pre-merge gate matrix, ceremony, rollback, cross-repo consumption, authority). NO automation (no `.github/workflows/release.yml`) — manual ceremony preserved per H-AUDIT-6 §3.4 Option (a).

### DEPS

- No dependency drift in H.

### Stats

- vitest: 1584 / 34 (unchanged from G close).
- api vitest: 115 / 22 (+9 new H.W1 rollback tests; was 106 / 21).
- e2e specs: 36 (unchanged from G close).
- 9 proof scripts (was 8 at G close; +1 from H.W2 Lane B `proof:as-unknown-as-budget`; 2 scope-extended at H.W3 Lanes D+E).
- vue-tsc: 0 errors.
- `dist/value.js`: 124,130 B (−1,366 B from G close's 125,496 B; ≤ 148,480 B ceiling).
- `as any` in src/: 0 (unchanged).
- `as unknown as` in src/: 2 (was 4 at H open; both irreducible per H2 policy).
- `@ts-ignore` / `@deprecated`: 0 (unchanged).
- `withTransaction` sites in api/: 16 (was 7 at G close).

## [0.9.0] — 2026-05-22 (G close)

### INTERNAL

- **`src/units/color/utils.ts` (1,430-LoC god-module) decomposed** into 9 focused modules ≤ 350 LoC each — a `conversions/` cluster (`hex`, `kelvin`, `cylindrical`, `lab`, `oklab`, `transfer`, `xyz-extended`, `direct`) + `dispatch.ts`. The barrel re-exports every public name; no consumer-visible change.
- **`as any` corpus in `src/` retired 35 → 0** via 4 typed-wrapper transpositions: a typed `getColorSpaceBound`, a typed `DIRECT_PATHS` mapped-type, a typed `Color<T>` channel accessor (`channelOf`/`setChannel`), and the `ValueUnit.unwrapDeep()` static (which codifies the Mar-2026 iOS-Safari nesting fix). Zero cast-laundering — every retirement is a genuine, correct type. The `Color<T>` channel-accessor change ran a BREAKING-decision protocol and resolved INTERNAL (the `[key: string]: any` index signature is structurally retained; the public typed `.l`/`.c`/`.r` API is unchanged).
- **6 invariant proof scripts codified** — `proof:no-deprecated`, `proof:no-ts-ignore`, `proof:as-any-budget`, `proof:codemod-publication`, `proof:no-deep`, `proof:no-bare-builtins` — plus a `types`-key existence probe added to `proof:resolution`. All wired into CI post-build.
- **api/**: `withTransaction` expanded from 3 to 7 cross-collection write sites (`deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`) with rollback tests; `engines.node` `">=22"` declared.
- **CI**: the CHANGELOG-changed gate base-ref defect fixed (it referenced `origin/main` and was INERT since F.W3); an `npm pack --dry-run` publish-shape step added; `scripts/migrate-*.mjs` added to `package.json files:` so the published lerp codemod is discoverable by npm consumers.
- **demo/**: glass-ui's `useBreakpoint` composable adopted at 4 sites (retiring hand-rolled `matchMedia` patterns); PaletteSlugBar hand-rolled buttons migrated to glass-ui `<Button>`.
- 1 mobile-walk Playwright spec added (e2e 35 → 36 specs).

### DEPS

- No dependency drift in G.

## [0.8.0] — 2026-05-21 (F close)

### BREAKING

- **Removed `lerpLegacy`**. The legacy `lerp(t, a, b)` argument ordering was deprecated in v0.7.0 (canonical `lerp(a, b, t)` introduced at D.W3 Lane C); migration is now mandatory. Consumers using `lerpLegacy` must migrate to `lerp(a, b, t)`. Value.js's published codemod (`scripts/migrate-keyframes-js-lerp.mjs`) handles the keyframes.js-shape migration; manual migration is straightforward for other consumers (swap the first argument with the last two).

### INTERNAL

- W8–W12 consumer LOCKSTEP back-reference doc authored at `docs/tranches/F/W8-W12-consumer-lockstep.md` per F4 invariant.
- gh-pages chronic closed: 2 dock-menu Github icon refs migrated to inline SVG following W9-C's @lucide/vue rename punt.
- 3 post-W12 transpositions: typed `Memoized<T>` shape retires the sole `@ts-ignore` in src/; Rolldown declarative `codeSplitting` adopted; 29 zero-consumer shadcn-vue subdirs swept (165 → 22 files, −588 KiB).
- 5 CI hygiene gates: CHANGELOG-changed gate broadened; vue-tsc baseline lowered to 0; dts-shape invariant guard (`scripts/proof-dts-layout.mjs`); `dist/value.js` bundle-size gate (≤ 145 KB raw); (optional) proof:resolution types-key probe.
- keyframes.js cross-repo write: applied published lerp codemod against the keyframes.js sibling repo (HEAD `470814e`) per F3 invariant (LOCAL-ONLY commit; user-discretionary push).

### DEFERRED → ZERO (per F1)

- All E5 inherited deferrals either landed in F or carry sharpened (c) triggers in `coordination/Q.md`. Standing peer-authorship asks (7 glass-ui primitive asks; contract-v2 §2.1 font-asset residual; keyframes.js precept-pin drift) carry forward with sharpened TIME-BOUND (c) triggers per F1 invariant.

### DEPS

- (No dep drift in F; the W8–W12 lockstep dep-lift happened pre-F open on master `47399c2..e1549e0` — see `docs/tranches/F/W8-W12-consumer-lockstep.md`.)

## [0.7.0] — 2026-05-20 (E close)

### BREAKING

- 51 internal `<from>2<to>` color-conversion functions removed from the main barrel (`src/index.ts`). The public surface is `color2(value, "from", "to")` + `colorUnit2`. The 51 individual functions remain available internally (still imported by `color2`'s dispatch table) but are no longer part of `@mkbabb/value.js`'s exported API. **Migration**: replace direct `import { rgb2hsl } from "@mkbabb/value.js"` with `color2(rgb, "rgb", "hsl")`.
- Dead exports removed: `BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS`. **Migration**: consumers must declare their own constants if needed.
- `vue-router` moved from `dependencies` to `devDependencies` — the library does not consume vue-router; the demo does. **No consumer migration** unless an external consumer was relying on vue-router being transitively installed via `@mkbabb/value.js`.

### DEFERRED (not in v0.7.0)

- `lerpLegacy` removal — deferred until keyframes.js's `file:`-linked consumer migrates the single call site at `keyframes.js/src/animation/numeric.ts:159`. See `docs/tranches/E/coordination/Q.md §5` for the migration diff + E5 retirement trigger.

### FEATURES

- **`tryParse` error messages now include a 16-char context window** around the failure offset (`src/parsing/utils.ts`). Errors read `Parse error at offset N: "...<context>..."` instead of just an offset; diagnostics improve substantially when tracking down parse failures in user-supplied CSS. (E.W1 Lane D)

### PERFORMANCE

- **152-branch color-name parser → broad-regex + Set-lookup** (`src/parsing/color.ts`). The named-color lookup (`rebeccapurple`, `red`, the 147 CSS named colors + the kelvin lookup family + 8 custom registrations) is now O(1) Set.has() instead of 152 sequential `any(istring(...))` regex tests. **Median 37× speedup** on the lookup hot path (`bench/parser-namelookup.mjs`). The constructed Set is built once at module init. (E.W1 Lane D)
- **`memoize` `keyFn: (s) => s` override** at 7 single-string-input parser sites (`parseCSSValue`, `parseCSSColor`, `parseAnimationShorthand`, `parseCSSStylesheet`, `parseCSSTime`, `parseCSSPercent`, etc.). Identity key replaces `JSON.stringify(args)` — both faster and clearer about the cache shape. (E.W1 Lane D)

### SUBTLE BEHAVIORAL CHANGE

- **Color-name parser is now STRICT-NO-PREFIX-MATCH.** Pre-v0.7.0, parsing `"redwood"` would consume `"red"` and leave `"wood"` as residual input (a partial-match artefact of the 152-branch `any(istring(...))` shape). Post-v0.7.0, the broad-regex + Set-lookup parser parses the full identifier `"redwood"` and rejects it (not a known color name). For any CSS context where a color-name parser is the leaf of a longer grammar production, the parser composition (e.g., `colorParser.or(genericValueParser)`) still selects the right disjunct — this strictness change is only observable in standalone `parseCSSColor("redwood")` calls where the previous partial-match was effectively a misparse. All 1582 existing parser tests continue to pass; no real-world consumer relies on the pre-v0.7.0 partial-match semantics. (E.W1 Lane D)

### INTERNAL

- **`WhitePointColor<T>` intermediate class lifted into `Color<T>` base** (`src/units/color/index.ts`). Pre-v0.7.0 the inheritance graph was asymmetric: `OKLABColor extends WhitePointColor<T>` but `OKLCHColor extends Color<T>` directly — the same color family split across two inheritance levels. Post-v0.7.0 the `whitePoint` field lives on `Color<T>` base with a `"D65"` default; LAB and OKLAB override to `"D50"` in their constructors; XYZ inherits the default. `WhitePointColor<T>` was never exported from the barrel — no consumer migration required. L8 microbench held at 10.87× median (≥ 5× gate). (E.W1 Lane B)

### PERFORMANCE (continued)

- **`DIRECT_PATHS` table in `color2()` for hot-path conversions** (`src/units/color/utils.ts`). The 6-entry table covers `oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb` — the highest-frequency conversions per a typical app's render loop. Direct paths use Ottosson's LMS→linear-sRGB matrix (OKLab/OKLCh) or the well-known direct HSL↔RGB cylindrical conversion, skipping the XYZ hub entirely. `color2()` consults the table first; the existing XYZ-hub path remains the fallback. Bench: HSL→RGB **3.80×–4.40× speedup** (≥ 2× gate PASS); OKLab→RGB ~1.04× and OKLCh→RGB ~1.07× (smaller savings — dominated by the shared `linearToSrgb` transcendental + `gamutMap` cost; the saved matrix-multiply is real but a tiny fraction of total cost). 2 parser-snapshot tests updated for floating-point ε-equivalent values (delta ~3e-9 from the skipped matrix multiply). (E.W1 Lane C)
- **`rgbFamily2xyz` / `xyz2rgbFamily` extracted** (`src/units/color/utils.ts`). The 5 wide-gamut RGB-family classes (LinearSRGB, DisplayP3, AdobeRGB, ProPhotoRGB, Rec2020) share an identical matrix-multiply structure post-transfer-function; the helpers parameterize over the matrix. 8 of 10 family converters collapse to one-liners (ProPhoto's 2 cases keep the explicit D50 Bradford-adapt shape). (E.W1 Lane C)
- **`Color.keys()` cache via `static readonly channelKeysWithAlpha`** (`src/units/color/index.ts`). Pre-v0.7.0 `keys()` returned a new `[...channels, "alpha"]` array per call — a per-frame allocation source in `lerpColorValue`'s `forEach`. Post-v0.7.0 each subclass exposes a frozen static tuple; `keys()` returns the cached reference. 15 subclasses, 8 shared tuples (RGB/LinearSRGB/DisplayP3/AdobeRGB/ProPhoto/Rec2020 share `["r","g","b","alpha"]`; LAB/OKLAB share `["l","a","b","alpha"]`; LCH/OKLCH share `["l","c","h","alpha"]`). Zero per-call allocation. (E.W1 Lane C)

### INTERNAL

- **Type-tidy** (`src/units/normalize.ts` + `src/units/utils.ts`). 7 `as any` suppressions removed (2 in `normalize.ts` + 5 in `utils.ts`'s `getUnitGroup` chain, refactored as a table-driven sentinel-narrowing dispatch). Zero new suppressions introduced. (E.W1 Lane E)
- **`ch<T>` brand-eraser consolidated to `src/units/color/index.ts`** (alongside the `ColorChannel<T>` phantom brand). Pre-v0.7.0 the helper lived in two places — `utils.ts` AND `contrast.ts` — a D.W1 Lane L8 residual. Post-v0.7.0 there is exactly one canonical export; 2 consumers updated. (E.W1 Lane E)
- **CLAUDE.md drift-footgun cleanup** — 5 CLAUDE.md files (root + `src/units/` + `src/units/color/` + `src/parsing/` + `demo/`) had stale inline LoC counts that drifted across D + E waves. All inline counts STRIPPED with a `> LoC counts intentionally omitted — wc -l is the source of truth.` note. Missing file entries added (6 new entries across `src/units/color/` + `src/parsing/` for `contrast.ts`, `mix.ts`, `animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`). Root CLAUDE.md's test/spec counts downgraded to ranges. Prevents re-drift across future tranches. (E.W1 Lane E)
- **`VENDOR-POLICY.md`** authored at repo root — formal policy for the 126-error `demo/@/components/ui/` shadcn-vue generated cluster. Decision: ACCEPT + DOCUMENT (Option 3). 94% of errors are TS2379 `exactOptionalPropertyTypes` regressions from reka-ui type version-skew (generator-noise, not authored-code defects). Lint + vitest + build are all GREEN; vue-tsc gate stays at 126 — any rise indicates either a new genuine error or a shadcn-vue regeneration drift. (E.W4 Lane C — closes B-01 + B-07 chronic ledger items.)
- **`scripts/migrate-keyframes-js-lerp.mjs`** authored (257 LoC) — idempotent codemod (`--dry-run`, parity-count assertion, `[unmatched]` refusal mode) for the keyframes.js `lerp(t,a,b) → lerp(a,b,t)` migration. Registered as `npm run codemod:keyframes-lerp`. Lane F's audit surfaced a SECOND silently-broken call site at `keyframes.js/src/animation/group.ts:251` beyond the originally-named `numeric.ts:159`; the codemod covers both. (E.W4 Lane F — `lerpLegacy` retirement deferred to the next tranche per the documented E5 trigger.)

## v0.6.0 — 2026-05-20

The first minor release since `v0.5.1`. Closes Tranche D (contract-v2 alignment + api/ refactor + frontend cohesion + library hardening + Playwright expansion). Also carries the work from Tranche A and Tranche B.

### BREAKING

- **`Color<T>` storage transposition** — color components are now own properties, not a `Map`. Read `color.L` instead of `color.components.get("L")`. The Map storage was a V8 hidden-class miss in every lerp hot path and a per-frame allocation source (`.keys()` / `.values()` / `.entries()`). Channel access is now monomorphic inline-cache friendly with a **median 10× speedup** (microbench `bench/color-channel-access.mjs`, 3-run close re-measure; range 10.02× to 10.67×). The flatten covers all 15 color-space classes; 45 channel-getter/setter pairs were deleted. (D.W1 Lane L8)
- **`AnimationOptions` rename** — `src/parsing/extract.ts` exported `AnimationOptions` (the CSS-shorthand-string type) renamed to `CSSAnimationOptions` to break the silent shadow with keyframes.js's same-named engine-options type. 14 internal sites updated; external consumers must rename imports. (D.W1 Lane L6 / `coordination/Q.md §9.5` — keyframes.js consumption update filed)
- **`package.json exports["."]` collapses to 3-key `{types, import, default}`** — the `development` condition is removed per contract-v2 (`docs/precepts@68d9b20`). Consumer dev tooling must resolve via the bundler default (Vite, esbuild, Rollup, etc.). (D.W1 Lane L1)

### FEATURES

- **`registerColorNames`, `clearCustomColorNames`, `getCustomColorNames`** exported from the barrel (G1 from B.W3 library-gap audit, ship-decided at D.W1 Lane L6).
- **`solveCubicBezierX`** exported from the barrel (G11 / K5 from B.W3 keyframes.js parity audit, ship-decided at D.W1 Lane L6).
- **`TimingFunction = (t: number) => number`** type alias exported from `src/easing.ts` and the barrel (canonical name for the easing function shape; consumers like keyframes.js can import the canonical name).
- **`parseCSSValue("inherit" | "unset" | "initial" | "revert")`** now correctly carries the `CSSWideKeyword` `superType` (was opaque-string before; L6 bug fix per CHALLENGE-Dm).
- **Case-insensitive color/math function names** — `RGB(...)` / `OKLCH(...)` / `CALC(...)` etc. now accepted per CSS Color L4 / CSS Values 4 ASCII case-insensitivity. (L7 bug fix per CHALLENGE-Dm)
- **`parseCSSColor` + `parseCSSValueUnit` memoized** with invalidation hooks — parity with the other parsers per the CLAUDE.md contract; cache invalidates on `registerColorNames` / `clearCustomColorNames`. (D.W3 Lane C L3 + L8)
- **`lerpColorValue` honours `hueMethod`** — cylindrical-space animations (oklch / hsl / lch) now interpolate via the requested method (default `shorter` per CSS Color 4 §12.4), not the long way round. `InterpolatedVar<T>` carries `hueMethod` + `colorSpace` through from `normalizeColorUnits`. Animation between `oklch(50% 0.2 350°) → oklch(50% 0.2 10°)` now goes 20° via 360→0, not 340° via 180°. (D.W3 Lane C L5 — 3-file fix)
- **`interpolate.ts` arg-order canonicalised** to `(a, b, t, opts?)` across `lerp` / `interpolateHue` / `slerp` family. `lerpLegacy(t, a, b)` aliased with `@deprecated` JSDoc + re-exported from the barrel for backward source-compat. (D.W3 Lane C L11)
- **`cssColorToRgb` memoised** in `useMetaballRenderer.ts:53` with 256-entry LRU cap — eliminates per-frame canvas `getImageData` + 3-element array allocation. (D.W3 Lane C — demo-side micro-fix)
- New **`build:watch`** script for fleet dev orchestration (`vite build --mode production --watch`).
- New **`proof:resolution`** script (ported from glass-ui `ce5aad8`) — verifies contract-v2 dev-resolution shape across the constellation.
- New **`lint`** script + eslint flat config (D.W1 L7) + CI step.

### INTERNAL

- `src/parsing/animation-shorthand.ts` / `extract.ts` / `serialize.ts` / `stylesheet.ts` and `src/units/interpolate.ts` are now tracked + tested (B.W3 committed the WIP; D.W1 Lane L7 added vitest specs).
- `evaluateSimpleCalc` routed through the existing calc AST evaluator — `new Function(...)` excised from `src/parsing/color.ts:78`; replaced with explicit `createCalcParser` + `evaluateMathFunction` pipeline. (`grep -rn 'new Function' src/parsing/` returns 0; D.W2 Lane D L4 — D6 invariant satisfaction)
- **Backend `api/` refactor** — service + repository + zod validation pipeline, fail-explicit migration, god modules split (`palettes.ts` 845 LoC → 5 concerns; `admin.ts` 750 LoC → 8 concerns). Cross-collection writes use idempotent-upsert + gated `$inc` (vote-toggle race fix). 9 typed repositories are the ONLY layer touching `db.collection(...)`; route handlers depend on services via Hono-context DI. 17 audit-emit invocations across admin services. 3 LRUs consolidated behind `api/src/cache/lru.ts`. SIGTERM + SIGINT handlers with 5s grace window. (D.W2 — 4 lanes)
- `PaletteDialog.vue` 652 LoC → 13-file colocated `PaletteDialog/` dir (340 LoC shell + 6 sub-components + 5 composables + constants); palette-manager facade exposes 5 sub-objects (`pm.audit` / `pm.flagged` / `pm.tags` / `pm.versions` / `pm.tagEdit`). Vue 3.5 reactive-props destructure across 32 SFCs (final `const props = defineProps<` count: 0; gate was ≤ 2). `viewSchema.ts` extracted as the canonical `ViewId` + `VIEW_MAP` source. (D.W3 — 4 lanes)
- **51 arbitrary `[var(--…)]` Tailwind callsites surfaced as first-class utilities** — 5 NEW `@theme` bridge declarations in `style.css` (`max-w-desktop-pane`, `min-w-menu`, `top-dock-inset`, `max-w-tooltip`, `shadow-card-hover`); 48 callsites resolved through glass-ui's existing bridges. NEW `--app-padding-x: 1rem` token breaks silent `.app-layout` ↔ `.pane-container` coupling. 4 style.css blocks colocated. Brittle selectors hardened. `demo/DESIGN.md` expanded 24 → 133 lines as the design-idiom catalog. (D.W4 — 2 lanes combined)
- **`e2e/smoke/` expanded from 3 specs to 21 across 3 projects** (`smoke` / `smoke-admin` / `smoke-mobile`): 6 user-view specs + walk + 2 WebGL + reactivity-instant (wall-clock ≤ 50ms median, **MERGE-GATE-BLOCKING**) + 5 admin specs + admin-walk + Pixel-7 mobile boot probe. Admin auth via `addInitScript` localStorage seeding fixture. CI runs all 3 projects. (D.W5)
- `test/bbnf-equivalence.test.ts` renamed to `test/parser-snapshot.test.ts` — the file imports zero BBNF runtime; it snapshots hand-written parsers. The KISS rename is the D.W6 close-ceremony disposition per `audit/D.W6-doc-drift.md`.

### RECURSION-PREVENTION HARDENING (D7 invariant)

The Mar-2026 `colorUnit2` nesting bug (`80cdd59` fix of `35cd9d5`) is now fortified by **4 cooperating safeguards** under L8 (D.W1 Lane L8 — non-optional, non-deferrable):

- **`ColorChannel<T>` TypeScript brand** (45 declare-applications) — compile-time refusal of `instance.L = colorInstance`.
- **DEV-only `_assertChannel` setters** — runtime guard, zero production cost (`grep -c "import.meta.env.DEV" dist/value.js` returns 0; DCE-verified).
- **`test/recursion-guard.test.ts`** — 5 named tests including 294-frame replay (the original iOS Safari reproduction), clone-no-amplify, depth-3 nest detection.
- **`clone()` depth-16 ceiling** — diagnostic-only fail-explicit.

Plus `Color.clone()` was rewritten to use per-channel explicit construction (not `new Constructor()` no-args), which was fragile under own-property storage.

### DEPS

- `docs/precepts` submodule advanced `3c32fae → 68d9b20` (the contract-v2 codification SHA — published to upstream main during the D.W0 Lane 0 pre-flight).

### Merge / release authority

The merge sequence (`tranche-b → master` with `--no-ff`), the `v0.6.0` tag, and the post-merge keyframes.js consumption-update filing all live in `docs/tranches/D/D-RELEASE-PLAN.md §3` and execute under orchestrator authority. See `docs/tranches/D/FINAL.md` for the close report; `docs/tranches/D/PROGRESS.md` for the per-wave execution log; `docs/tranches/D/findings.md §2` for the per-finding disposition table.
