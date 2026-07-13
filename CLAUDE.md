# value.js

CSS value unit library: parsing, normalization, interpolation, color space conversion.

## Build

```
npm run build        # library → dist/value.js (ESM) + dist/*.d.ts (flat layout, W12-unblocker)
npm run build:watch  # vite build --watch (D.W1 — contract-v2 fleet dev orchestration)
npm run gh-pages     # demo → dist/gh-pages/ (vendor-katex + vendor-highlight chunks via Rolldown codeSplitting, F.W1 Lane B)
npm run dev          # HONEST full local stack (S.W0 W0-1): scripts/dev.sh up — local api + mongo rs0 + VITE_API_URL wired + dev CORS. Palette features round-trip out of the box.
npm run dev:web-only # frontend ONLY (bare vite :9000). No backend: palette/API features CORS-die against prod; the UI surfaces an explicit "dev misconfigured" state, never a silent prod fallback.
```

> `npm run dev` boots the full stack because the demo's palette API needs a
> CORS-permissive local backend. Bare vite with no `VITE_API_URL` targets the
> cross-origin prod api (`api.color.babb.dev`), whose allow-list excludes
> localhost — every palette request preflight-dies. Rather than mislabel that as
> "backend offline", the demo detects the precondition (unset `VITE_API_URL` +
> loopback origin + cross-origin BASE_URL) and enters a designed `misconfigured`
> state (loud console error + a distinct UI chip). **REJECTED**: adding localhost
> to prod `ALLOWED_ORIGINS` — dev must not target prod (api-broken-rootcause).

## Test + verify

```
npm test                 # vitest (jsdom) — unit suite (count → per-tranche FINAL.md)
npx playwright test      # 6 projects: smoke / smoke-admin / smoke-mobile / smoke-reactivity / smoke-perf / smoke-safari (count → per-tranche FINAL.md)
npm run lint             # eslint flat config (D.W1 L7) — exit 0 required
npm run typecheck        # vue-tsc --noEmit (library + demo); api typecheck: cd api && npx tsc --noEmit
```

> The G/H-era **repo-wide grep `proof:*` sweeps** were retired as overfit. A
> distinct, narrower idiom lives on: the O/Q-era **per-invariant born-RED gates**
> (the `package.json` `proof:*` scripts, each guarding one named tranche invariant
> against a specific regression, not a repo-wide grep). **Tranche T's Q13 rules
> their disposition** (executed at W0-2): retain-reclassify the 5 behavioral gates
> — `css-parity`, `round-trip-idempotent`, `perf-target`, `serialize-fidelity`,
> `subpath-budget` (the parse-that-free / bundle-trace floor) — as a CI-wired
> `test:dist`; excise the other 7 as overfit. The disciplines the excised set
> guarded stand by the type system + eslint + review.

> Exact test/spec counts belong in per-tranche FINAL.md docs (e.g.
> `docs/tranches/E/FINAL.md`). Numbers inlined here drift each wave; the
> wave-gate doc carries the authoritative count for that wave.

## Structure

```
src/
├── index.ts              # barrel: exports all public API
├── math.ts               # lerp, bezier, clamp, scale, deCasteljau
├── easing.ts             # CSS timing functions (30+ named, cubic-bezier, stepped, linear())
├── utils.ts              # clone, memoize, debounce, RAF, case conversion
├── vite-env.d.ts         # Vite module declarations (.vue, .bbnf?raw)
├── parsing/              # parse-that combinators for CSS values (15 modules — file inventory: src/parsing/CLAUDE.md)
│   ├── index.ts          # top-level: parseCSSValue, gradients, transforms, var(), calc()
│   ├── units.ts          # dimension parsers: length, angle, time, frequency, resolution, flex, %
│   ├── color.ts          # 15+ color spaces, hex, kelvin, color-mix(), relative color syntax
│   ├── color-unit.ts     # ValueUnit-level color parse/normalize bridge
│   ├── relative-color.ts # relative color syntax (from … channel keywords)
│   ├── math.ts           # calc() AST, min/max/clamp, trig, exp, round/mod/rem
│   ├── easing.ts         # <easing-function> value parser (NOT src/easing.ts — that's the named-fn table)
│   ├── scroll-timeline.ts # scroll()/view() timeline value parsing
│   ├── syntax.ts         # <syntax> descriptor grammar (@property)
│   ├── animation-shorthand.ts  # animation/transition shorthand parsing
│   ├── extract.ts        # value extraction helpers
│   ├── serialize.ts      # value serialization
│   ├── stylesheet.ts     # stylesheet-level parsing
│   ├── stylesheet-types.ts # stylesheet AST types
│   └── utils.ts          # istring, number, none, tryParse, succeed, fail
├── units/                # core value classes + unit definitions
│   ├── index.ts          # ValueUnit, FunctionValue, ValueArray classes
│   ├── constants.ts      # unit arrays, MatrixValues
│   ├── style-names.ts    # STYLE_NAMES (CSS property-name data table, W1-8 split)
│   ├── utils.ts          # unit conversion (px, deg, ms, Hz, dpi), flatten/unflatten
│   ├── dom-metrics.ts    # DOM/layout pixel-resolution helpers (viewport/font/cq, W1-8)
│   ├── normalize.ts      # value normalization + interpolation setup
│   ├── layout-cache.ts   # getComputedValue + layout-epoch memo (W1-8 split)
│   ├── interpolate.ts    # value interpolation
│   └── color/            # color system (17 spaces, conversion, gamut mapping — file inventory: src/units/color/CLAUDE.md)
│       ├── index.ts      # Color<T> base + 17 space classes + ColorChannel brand + ch<T> helper
│       ├── base.ts       # Color<T> base leaf (W1-8 split)
│       ├── spaces.ts     # the space-class table (W1-8 split)
│       ├── constants.ts  # ranges, matrices, white points, named colors
│       ├── color-names.ts # CSS named-color table
│       ├── conversions/  # 10 focused {from}2{to} modules (hex, kelvin, cylindrical, lab, oklab, transfer, xyz-extended, direct, ictcp, jzazbz) + index barrel (G.W1 Lane B; +ICtCp/Jzazbz S.W1)
│       ├── dispatch.ts   # color2() generic converter, DIRECT_PATHS, gamutMap, interpolateHue, mixColors
│       ├── matrix.ts     # Vec3/Mat3 math (row-major, f64, replaces gl-matrix)
│       ├── normalize.ts  # color normalization to [0,1], space conversion
│       ├── gamut.ts      # Ottosson analytical sRGB gamut mapping (zero-iteration)
│       ├── gamut-raytrace.ts # raytrace gamut map (Q8/S.W1)
│       ├── boundary.ts   # gamut-boundary helpers
│       ├── okhsl.ts      # OKHSL/OKHSV perceptual picker pair
│       ├── difference.ts # deltaE2000 + deltaEITP + xyzToICtCp
│       ├── colorFilter.ts # CSS filter solver via SPSA optimization
│       ├── contrast.ts   # OKLab contrast helpers, safeAccentColor
│       ├── serialize.ts  # color serialization
│       └── mix.ts        # N-color mix() helpers
├── quantize/             # image color quantization (OKLab-native)
│   ├── index.ts          # quantizePixels, dominantColor (public API)
│   ├── cluster.ts        # MMCQ median cut, k-means++, JND deduplication
│   └── types.ts          # QuantizeOptions, QuantizedColor
├── subpaths/             # tree-shake subpath barrels (O.W2) — each parse-that-budget-gated (proof:subpath-budget)
│   ├── color.ts          # @mkbabb/value.js/color (the parse-that-ZERO barrel)
│   ├── easing.ts         # @mkbabb/value.js/easing
│   ├── math.ts           # @mkbabb/value.js/math
│   ├── parsing.ts        # @mkbabb/value.js/parsing
│   ├── quantize.ts       # @mkbabb/value.js/quantize
│   ├── transform.ts      # @mkbabb/value.js/transform
│   └── units.ts          # @mkbabb/value.js/units
└── transform/
    ├── decompose.ts      # 2D/3D matrix decomposition, quaternion slerp, recomposition
    └── path.ts           # SVG-path geometry (getTotalLength/getPointAtLength, no DOM; N.W7 VJ-F1)
```

```
test/                     # vitest unit tests
e2e/smoke/                # playwright smoke suite across 6 projects:
                          #   smoke (desktop Chromium, incl. WebGL + view-anchors + the T oracle mints)
                          #   smoke-admin (admin views via addInitScript mock fixture)
                          #   smoke-mobile (Pixel-7 layout probe)
                          #   smoke-reactivity (slider-keyboard + spectrum-drag instant-update gates; workers:1)
                          #   smoke-perf (built-bundle :8091 frame-budget gates; workers:1)
                          #   smoke-safari (iPhone-14 WebKit; sustained-30s context-loss probe)
demo/                     # Vue 3.5 color picker app (reka-ui, Tailwind, @vueuse)
api/                      # Hono + MongoDB palette API (Docker, Node 22, 9 collections / 27 indexes)
docs/                     # colors/ (theory · gamut-mapping · app · quantization) · RELEASE.md · precepts/ · tranches/
assets/docs/              # 11 color space reference pages (Vue + KaTeX; incl. kelvin.md)
```

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports (enforced by verbatimModuleSyntax)
- `@mkbabb/parse-that` for all parsing (not Parsimmon)
- Named exports only, no defaults (enables tree-shaking)
- Color matrices stored row-major (3x3); transform matrices column-major (4x4, CSS convention)
- Color components normalized to [0,1] internally; denormalized on output
- **Minimize `as any` / `as unknown as`** — prefer typed narrowing + branded nominal types. `src/` holds **0** `as any`. The `as unknown as` sites are all ONE accepted, irreducible erasure class — `Color<T>` generic-component-type erasure where the runtime is provably `Color<number>` but TypeScript can't thread it through a shared dispatch/leaf (`dispatch.ts` `color2Into`, `contrast.ts`, `parsing/color.ts`), plus the DOM `CSSStyleDeclaration` no-string-index class (`units/layout-cache.ts`, the `styleRecord` boundary — moved there from `normalize.ts` in S.W1 W1-8's layout-cache lift) — each carrying a load-bearing inline comment. The **count is regenerable, not hardcoded** (the LoC-precept pattern — a hardcoded number drifts every wave a generic-dispatch leaf lands): `grep -rn 'as unknown as' src/ | wc -l` is the source of truth (8 at tranche S; the 6 beyond the 2 originally-documented DOM/clone-reinterpret sites arrived with tranche Q's WCAG leaf + zero-alloc `color2Into` fast path, all the same class). `api/src` holds the same discipline (tranche L): **0** `as any`, **1** `as unknown as` (the `@hono/node-server` `server.close()` handle at `index.ts`); the 2 former `resolve-session.ts` ObjectId casts were retired by the branded `SessionToken`/`UserSlug` nominal types on `Session._id`/`User._id`. The discipline stands by the type system + review, not by a grep budget-script.
- **No `demo/` god module** — every `demo/` file (excluding shadcn-vue at `demo/@/components/ui/`) stays ≤ 400 LoC; H.W3 decomposed `demo/@/lib/palette/api.ts` (484 LoC) → 9 modules, `PointerDebugOverlay.vue` (449) and `PaletteCard.vue` (435) via sub-component lifts
- **Cascade-correctness** — the H1 invariant requires every cross-collection write site in `api/` wrapped in `services.withTransaction(...)` with `session` threaded through; H.W1 expanded 9 → 16 wrapped sites + authored the standing reference `docs/tranches/H/audit/api-withTransaction-coverage.md`
- **`api/src` boundary closure (tranche L)** — every failure throws a typed `ApiError` (no ad-hoc `c.json({ error })`); routes call services, never `repositories.*` directly (ownership/ETag reads in `services/palette/ownership.ts`); only `repositories/` + the inject-services factory touch raw `db`; no legacy palette fields (`sessionToken`/4-state `status` excised — canonical state is `(visibility, tier)`); no `api/src` file > 350 LoC. See `docs/tranches/L/L.md §2` + `FINAL.md`.
- The `demo/@/components/ui/` shadcn-vue tree is vendored noise (excluded from the god-module cap). **Post-F.W1 Lane C**: 29 zero-consumer subdirs swept (165 → 22 files, -588 KiB). **Post-F.W3 Lane C**: vue-tsc CI gate is **strict-zero (≤ 0 errors)**.
- See `docs/RELEASE.md` for the manual tranche-close publish ceremony (authored H.W4 Lane D).

## Entry point

`src/index.ts` — re-exports the public API (units, colors, parsing, easing, math, transforms).

## Dependencies

- **Runtime**: `@mkbabb/parse-that@^1.0.0` (the R-booked re-pin, shipped 2.0.1 `a7eabcc`; W0-4 discharged)
- **Dev**: vite, vue, typescript, vitest, playwright, reka-ui, @vueuse/core, tailwindcss, katex
- **Sibling `file:` deps**: `@mkbabb/glass-ui: file:../glass-ui`, `@mkbabb/keyframes.js: file:../keyframes.js` (kept deliberately — see §3.4 pin policy). The keyframes devDep is NOT phantom: it is the demo build's provision of glass-ui's `@mkbabb/keyframes.js` peerDependency `^5.0.0`, and keyframes' dist is a live transitive consumer of value.js's own `/math` subpath (`clamp`/`lerpArray`/`scale`).

### §3.4 Pin policy (Q4 — RATIFIED 2026-07-03)

**Keep `file:../glass-ui` and `file:../keyframes.js` deliberately.** The constellation is a paired-authorship monorepo-in-spirit; a registry pin during active co-development is theater that goes stale the day it's written ("3.13.0" and "BA 4.0.0" both proved this). The disciplines that actually protect value.js are the **adopt-event books** (each sibling major cut is an explicit booked event), the **by-name MIGRATION tables** the relay letters demand, and **`boot-smoke` cold** as the catch-all for named-export drift (the Tabs class of failure). The alternative — registry-pinning at 5.0.0 — makes every sibling break an explicit version event at the price of twice-disproven pin staleness. The keyframes devDep KEEP (above) is the same policy applied to the peer-provision chain.

## Path aliases (tsconfig)

```
@src/*         → src/
@styles/*      → demo/@/styles/
@components/*  → demo/@/components/
@utils/*       → demo/@/utils/
@lib/*         → demo/@/lib/
@composables/* → demo/@/composables/
@assets/*      → assets/
```
