# value.js

CSS value unit library: parsing, normalization, interpolation, color space conversion.

## Build

```
npm run build        # library → dist/value.js (ESM) + dist/*.d.ts (flat layout, W12-unblocker)
npm run build:watch  # vite build --watch (D.W1 — contract-v2 fleet dev orchestration)
npm run gh-pages     # demo → dist/gh-pages/ (vendor-katex + vendor-highlight chunks via Rolldown codeSplitting, F.W1 Lane B)
npm run dev          # dev server (Vite default port)
```

## Test + verify

```
npm test                 # vitest (jsdom) — unit suite (count → per-tranche FINAL.md)
npx playwright test      # 5 projects: smoke / smoke-admin / smoke-mobile / smoke-reactivity / smoke-safari (count → per-tranche FINAL.md)
npm run lint             # eslint flat config (D.W1 L7) — exit 0 required
npm run typecheck        # vue-tsc --noEmit (library + demo); api typecheck: cd api && npx tsc --noEmit
```

> The grep-based `proof:*` invariant scripts (G/H-era) were retired as overfit;
> the disciplines they guarded stand by the type system + eslint + review.

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
├── vite-env.d.ts         # Vite module declarations (.bbnf?raw, .vue)
├── parsing/              # parse-that combinators for CSS values
│   ├── index.ts          # top-level: parseCSSValue, gradients, transforms, var(), calc()
│   ├── units.ts          # dimension parsers: length, angle, time, frequency, resolution, flex, %
│   ├── color.ts          # 15 color spaces, hex, kelvin, color-mix(), relative color syntax
│   ├── math.ts           # calc() AST, min/max/clamp, trig, exp, round/mod/rem
│   ├── utils.ts          # istring, number, none, tryParse, succeed, fail
│   ├── animation-shorthand.ts  # animation/transition shorthand parsing
│   ├── extract.ts        # value extraction helpers
│   ├── serialize.ts      # value serialization
│   ├── stylesheet.ts     # stylesheet-level parsing
│   └── grammars/         # BBNF spec grammars (used in equivalence tests)
│       ├── css-values.bbnf
│       └── css-color.bbnf
├── units/                # core value classes + unit definitions
│   ├── index.ts          # ValueUnit, FunctionValue, ValueArray classes
│   ├── constants.ts      # unit arrays, STYLE_NAMES (CSS properties), MatrixValues
│   ├── utils.ts          # unit conversion (px, deg, ms, Hz, dpi), flatten/unflatten
│   ├── normalize.ts      # value normalization + interpolation setup
│   ├── interpolate.ts    # value interpolation
│   └── color/            # color system (15 spaces, conversion, gamut mapping)
│       ├── index.ts      # Color<T> base + 15 space classes + ColorChannel brand + ch<T> helper
│       ├── constants.ts  # ranges, matrices, white points, named colors
│       ├── conversions/  # 8 focused {from}2{to} modules (hex, kelvin, cylindrical, lab, oklab, transfer, xyz-extended, direct) + index barrel (G.W1 Lane B)
│       ├── dispatch.ts   # color2() generic converter, DIRECT_PATHS, gamutMap, interpolateHue, mixColors
│       ├── matrix.ts     # Vec3/Mat3 math (row-major, f64, replaces gl-matrix)
│       ├── normalize.ts  # color normalization to [0,1], space conversion
│       ├── gamut.ts      # Ottosson analytical sRGB gamut mapping (zero-iteration)
│       ├── colorFilter.ts # CSS filter solver via SPSA optimization
│       ├── contrast.ts   # OKLab contrast helpers, safeAccentColor
│       └── mix.ts        # N-color mix() helpers
├── quantize/             # image color quantization (OKLab-native)
│   ├── index.ts          # quantizePixels, dominantColor (public API)
│   ├── cluster.ts        # MMCQ median cut, k-means++, JND deduplication
│   └── types.ts          # QuantizeOptions, QuantizedColor
└── transform/
    └── decompose.ts      # 2D/3D matrix decomposition, quaternion slerp, recomposition
```

```
test/                     # vitest unit tests
e2e/smoke/                # playwright smoke suite across 5 projects:
                          #   smoke (desktop Chromium, incl. WebGL + view-anchors)
                          #   smoke-admin (admin views via addInitScript mock fixture)
                          #   smoke-mobile (Pixel-7 layout probe)
                          #   smoke-reactivity (slider-keyboard + spectrum-drag instant-update gates; workers:1)
                          #   smoke-safari (iPhone-14 WebKit; sustained-30s context-loss probe)
demo/                     # Vue 3.5 color picker app (reka-ui, Tailwind, @vueuse)
api/                      # Hono + MongoDB palette API (Docker, Node 22, 9 collections / 27 indexes)
docs/                     # color-theory.md, gamut-mapping.md
assets/docs/              # 10 color space reference pages (Vue + KaTeX)
```

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports (enforced by verbatimModuleSyntax)
- `@mkbabb/parse-that` for all parsing (not Parsimmon)
- Named exports only, no defaults (enables tree-shaking)
- Color matrices stored row-major (3x3); transform matrices column-major (4x4, CSS convention)
- Color components normalized to [0,1] internally; denormalized on output
- **Minimize `as any` / `as unknown as`** — prefer typed narrowing + branded nominal types. `src/` holds **0** `as any` and **2** policy-documented `as unknown as` irreducibles (DOM `CSSStyleDeclaration` at `normalize.ts:117`; clone-reinterpret at `parsing/color.ts:59`). `api/src` holds the same discipline (tranche L): **0** `as any`, **1** `as unknown as` (the `@hono/node-server` `server.close()` handle at `index.ts`); the 2 former `resolve-session.ts` ObjectId casts were retired by the branded `SessionToken`/`UserSlug` nominal types on `Session._id`/`User._id`. The discipline stands by the type system + review, not by a grep budget-script.
- **No `demo/` god module** — every `demo/` file (excluding shadcn-vue at `demo/@/components/ui/`) stays ≤ 400 LoC; H.W3 decomposed `demo/@/lib/palette/api.ts` (484 LoC) → 9 modules, `PointerDebugOverlay.vue` (449) and `PaletteCard.vue` (435) via sub-component lifts
- **Cascade-correctness** — the H1 invariant requires every cross-collection write site in `api/` wrapped in `services.withTransaction(...)` with `session` threaded through; H.W1 expanded 9 → 16 wrapped sites + authored the standing reference `docs/tranches/H/audit/api-withTransaction-coverage.md`
- **`api/src` boundary closure (tranche L)** — every failure throws a typed `ApiError` (no ad-hoc `c.json({ error })`); routes call services, never `repositories.*` directly (ownership/ETag reads in `services/palette/ownership.ts`); only `repositories/` + the inject-services factory touch raw `db`; no legacy palette fields (`sessionToken`/4-state `status` excised — canonical state is `(visibility, tier)`); no `api/src` file > 350 LoC. See `docs/tranches/L/L.md §2` + `FINAL.md`.
- The `demo/@/components/ui/` shadcn-vue tree is vendored noise (excluded from the god-module cap). **Post-F.W1 Lane C**: 29 zero-consumer subdirs swept (165 → 22 files, -588 KiB). **Post-F.W3 Lane C**: vue-tsc CI gate is **strict-zero (≤ 0 errors)**.
- See `docs/RELEASE.md` for the manual tranche-close publish ceremony (authored H.W4 Lane D).

## Entry point

`src/index.ts` — re-exports the public API (units, colors, parsing, easing, math, transforms).

## Dependencies

- **Runtime**: `@mkbabb/parse-that@^0.13.0`
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
