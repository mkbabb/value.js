# Changelog

## [0.7.0] — Unreleased (E close)

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
