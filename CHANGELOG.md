# Changelog

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
