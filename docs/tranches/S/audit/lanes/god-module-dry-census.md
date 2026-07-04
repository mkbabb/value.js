# S · god-module + DRY census (whole repo)

Audit-only. Repo at `c5aa091` (branch `tranche-q`). Scope: `src/`, `demo/@/` (excl.
vendored `components/ui/`), `api/src/`, plus `test/`/`e2e/` sized for reference
only (not god-module targets — they're not product code, hard/demo caps don't
bind them). Method: `wc -l` census + `grep -n` structural scan (exports,
top-level `const`/`function`) per file, then targeted reads to judge true
cohesion vs. accidental bundling.

## 1. God-module table — `src/` (hard cap 500, **excluding** documented
   pure-data tables which are a different class of problem — see §1.1)

| File | LoC | Verdict | Split sketch |
|---|---|---|---|
| `src/units/color/index.ts` | 968 | **SPLIT-WORTHY.** Cohesive subject (Color class hierarchy) but mechanically repetitive: 1 base `Color<T>` + `ColorChannel` brand (~250 LoC) + **15** near-identical space subclasses (`RGBColor`..`Rec2020Color`, ~400 LoC, each ~20-line boilerplate ctor+getters). | Lift the 15 subclasses to `src/units/color/spaces.ts`; keep base `Color`, `ColorChannel` brand, `ch()`/`channelOf()`/`setChannel()` helpers in `index.ts` as the barrel. Mirrors the G.W1 Lane B `conversions/` split already done one level down. |
| `src/parsing/stylesheet.ts` | 864 | **SPLIT-WORTHY, higher risk.** One recursive `Parser.lazy` CSS-stylesheet grammar: types (124 LoC) + 28 internal combinators building `styleRule`/`atRule`/`recursiveBlock` via mutual recursion. Genuinely one grammar, but the at-rule bodies (`@keyframes`, `@property`, `@function`, `@scope`, `@starting-style`, `@scroll-timeline`/`@view-timeline`) are separable leaves that only close over the shared `recursiveBlock`/`declarationList` primitives. | Extract `stylesheet-types.ts` (the 124-LoC type block) immediately (no risk). Then lift each at-rule body builder (`keyframeRule`+`keyframesBody`, `propertyBody`, `functionBody`, `scopeBody`, `scrollTimelineBody`/`viewTimelineBody`) into per-feature modules that accept the shared primitives as params/imports and return `Parser<StylesheetItem>` — same shape as the color-conversions split. Needs a careful pass since `recursiveBlock`/`atRule` are mutually recursive with the leaves; do NOT split under time pressure. |
| `src/parsing/color.ts` | 854 | **SPLIT-WORTHY.** Single `Value` dispatch table gluing 4 distinct concerns the module's own doc comment (CLAUDE.md) already names separately: (a) hex/named/kelvin literal syntax, (b) legacy+modern functional color notation (`colorFunctionSpaces`, ~100 LoC), (c) `color-mix()`, (d) relative color syntax (`resolveRelativeColor`/`evaluateRelativeCalc`/`resolveExpr`, ~180 LoC — its own self-contained calc-expr evaluator). | Lift relative-color-syntax (lines ~132-256) to `color-relative.ts`; color-mix parsing to `color-mix-syntax.ts` (parsing, not the existing `units/color/mix.ts` runtime mixer — name to avoid confusion); keep hex/kelvin/named/functional dispatch as the `color.ts` core. |
| `src/units/constants.ts` | 799 | **NOT a real god module — it's 78% pure data.** `STYLE_NAMES` (line 167 → EOF) is a flat ~630-line array of CSS property-name string literals. Logic (unit-family arrays, `MatrixValues`, `FUNCTION_IDENTITY`) is only ~166 LoC. | Move `STYLE_NAMES` to `src/units/style-names.ts` (pure data, re-exported from `constants.ts` or consumed directly). Shrinks `constants.ts` to ~170 LoC; the data file stays big but that's an accepted shape for a literal table, not a cohesion problem. |
| `src/units/utils.ts` | 722 | **SPLIT-WORTHY — genuinely mixed concerns**, the most KISS-relevant of the set. Five unrelated jobs share one file: (1) `isColorUnit`/`functionIdentityValue` type guards; (2) `flattenObject`/`unflattenObject`/`unflattenObjectToString` — **generic object (de)serialization utilities with no CSS-unit-specific content**, sitting oddly under `units/` rather than the root `src/utils.ts` which already owns generic helpers (`clone`, `memoize`, `debounce`, case conversion); (3) `isCSSStyleName`/`unpackMatrixValues`; (4) DOM-querying container-query/writing-mode/font-metric pixel conversion (`findQueryContainer`, `isVerticalWritingMode`, `convertViewportUnitToPixels`, `convertFontMetricUnitToPixels` — touches `HTMLElement`, ~140 LoC); (5) the `convertToPixels`/`convertToMs`/`convertToDegrees`/`convertToHz`/`convertToDPI` unit-conversion dispatch. CLAUDE.md's own module doc bundles (2)+(5) together ("unit conversion … flatten/unflatten") so this is a **documented** combination, not an accident — but (4)'s DOM-container-query logic is a distinct runtime concern (browser layout queries) from pure numeric conversion and is the strongest split candidate. | Extract (4) to `src/units/dom-metrics.ts` (viewport/font-metric/container-query pixel resolution — the only DOM-touching code in the file). Leave (2) where documented unless a future pass wants to fold it into root `src/utils.ts` as truly generic (would need a decision, not assumed here). |
| `src/parsing/scroll-timeline.ts` | 667 | **Borderline — cohesive by feature, not by concern.** 25 exports covering one CSS feature area (scroll/view-timeline + animation-range + trigger) but 3 layers bundled: types, parse, serialize+extract. | Low priority: split into `scroll-timeline-types.ts` / `-parse.ts` / `-serialize.ts` if it grows further; not urgent at 667. |
| `src/units/color/constants.ts` | 613 | **Mostly pure data**, same shape as `units/constants.ts`. `COLOR_NAMES` (147 CSS named colors) + the ranges/matrices tables dominate; `getColorSpaceBound`/`getColorSpaceDenormUnit` (the only real logic) are ~30 LoC. | Optional: lift `COLOR_NAMES` to its own data file if the "no data-in-god-module" convention is wanted repo-wide; low urgency, this file is legible as-is. |
| `src/parsing/index.ts` | 587 | **Borderline.** Top-level barrel doing double duty as parser-combinator host (gradients, transforms, var()/calc() wiring) per its own doc comment. | Acceptable at this size given it's the documented top-level entry; watch it, don't split preemptively. |
| `src/transform/path.ts` | 562 | **NOT god-module — one cohesive `PathGeometry` class** (SVG path parse + adaptive-subdivision flatten + arc-length table + binary-search sampling). Minor DRY note: `cubicAt()` (line 111) re-implements the Bernstein-basis cubic evaluation that `src/math.ts`'s `deCasteljau`/`cubicBezier` already provide generically — different call shape (scalar-per-axis vs generic point array) so not a straight dup, but worth a look if `math.ts` gains a scalar fast-path. | No split recommended; P2 DRY note only. |
| `src/units/normalize.ts` | 550 | **SPLIT-WORTHY.** Two concerns share the file: (a) DOM-adjacent "layout epoch" cache — `ResizeObserver`-driven `getLayoutEpoch`/`bumpLayoutEpoch`, `WeakMap`-keyed element/ValueUnit id tables, memoized `getComputedValue` against `CSSStyleDeclaration` (~165 LoC, lines 89-254); (b) pure numeric `normalizeNumericUnits`/`normalizeValueUnits` (~120 LoC, lines 349-550+). | Extract (a) to `src/units/layout-cache.ts`; keeps the one documented `as unknown as` irreducible (CLAUDE.md cites `normalize.ts:117` for `CSSStyleDeclaration`) traveling with its cache logic, not diluting the normalization module. |
| `src/transform/decompose.ts` | 541 | **NOT god-module** — CLAUDE.md documents this as the single decompose/recompose/slerp module by design; 9 exports, each a focused function on the same Mat4/quaternion domain. | No split. |
| `src/units/color/dispatch.ts` | 522 | **Known, already tracked** — CLAUDE.md itself notes "landed at 522 post-K-DISP." 4 exports (`color2`, `color2Into`, `gamutMap`, `getFormattedColorSpaceRange`) each substantial (generic dispatch + gamut mapping). | Already on record as debt; re-flagging here for the census's completeness, not a new finding. |
| `src/easing.ts` | 515 | **NOT god-module** — documented single-purpose module (30+ named easings + cubic-bezier solver + stepped + `linear()`). High internal repetition (many 3-line easing fns) is expected shape for a curve catalog, not a smell. | No split. |
| `src/units/color/gamut.ts` | 514 | **NOT god-module** — one algorithm (Ottosson analytical gamut mapping), documented. | No split. |
| `src/parsing/math.ts` | 509 | **NOT god-module** — documented combo (calc() AST + min/max/clamp/trig/exp/round/mod/rem), just over the line. | No split; watch. |

### 1.1 Files approaching caps (headroom notes, not violations)
- `src/units/color/mix.ts` 479, `src/quantize/cluster.ts` 356, `src/units/color/boundary.ts` 325 — all under 500, fine, no action.
- Demo files nearest the 400 cap: `SpectrumCanvas.vue` 392, `Markdown.vue` 388, `ColorInput.vue` 374, `PaletteCard.vue` 372, `PaletteDialog.vue` 367, `ComponentSliders.vue` 367, `useInertiaGesture.ts` 360. **None currently violate** the demo ≤400 cap; several are close enough that the next feature added to any of them (plausible given S-2/S-13/S-16/S-19 findings touch `ComponentSliders.vue`/`ColorInput.vue`/`SpectrumCanvas.vue` directly) will need a companion sub-component lift in the same wave-item, not deferred.
- `api/src/` — **zero files exceed the tranche-L 350-LoC cap.** Largest: `crud-list.ts` 325, `crud.ts` 309, `errors/index.ts` 271, `models.ts` 265. Headroom is thin on `crud-list.ts`/`crud.ts` (25/41 LoC to cap) — flag for any wave that touches palette CRUD.
- `demo/@/` overall: **zero files exceed 400.** The god-module discipline (H.W3 lifts, D.W3 Lane A colocated splits) is holding.

## 2. Duplication map

### 2.1 CONFIRMED verbatim CSS duplication — `.gold-shimmer-icon`
`Dock.vue:238` and `DockViewSelect.vue:129` define **byte-identical** CSS:
```css
.gold-shimmer-icon {
    color: var(--color-gold);
    filter: drop-shadow(0 0 2px color-mix(in srgb, var(--color-gold) 30%, transparent));
}
```
`DockViewSelect.vue`'s comment (`/* Admin golden icon — matches the class used
in Dock.vue collapsed slot */`) shows this is a **self-aware** copy-paste, not
an oversight. The repo already has the correct pattern for exactly this
situation: `.pastel-rainbow-text` was lifted to `demo/@/styles/utils.css:35`
at N.W5.E specifically because a scoped recipe couldn't reach cross-component
consumers (documented in `PaletteDialogHeader.vue`'s own trailing comment).
**Root-routing: demo `@/styles/utils.css`** — lift `.gold-shimmer-icon`
there, delete both scoped copies. Trivial, two-file diff, directly serves S-8
(collapsed dock) and S-20 (cartoon-card consistency) territory since the dock
is exactly where those findings live.

### 2.2 NEAR-duplicate — 3 independent "gold/admin shimmer" recipes
Beyond §2.1's exact dup, there are **3 different animation techniques** for
what reads as the same design idea ("this is admin/featured, shimmer it
gold"):
- `PaletteCard.vue:347-361` — `golden-text-shimmer` keyframe: `background-position` sweep on a text gradient-clip, 4s, `var(--ease-standard)`.
- `PaletteDialogHeader.vue:69-88` — `golden-shimmer` keyframe: `::after` pseudo-element radial gradient rotation, `var(--duration-shimmer-fast)`, `mix-blend-mode: overlay`.
- `ProfileSection.vue:76` + `DockViewSelect.vue:113` — `gold-shimmer` class (defined where? — **not found via grep in this pass**, worth a follow-up: confirm this class resolves to one of the two keyframes above or is itself a 3rd recipe; if the class name resolves but isn't co-located with either keyframe file, that's a 4th implicit variant).
This 3-recipe spread is a plausible root cause underneath the "cartoon-card
inconsistency" (S-20) and general styling-inconsistency complaints (S-1) — the
codebase has never converged on ONE admin/featured-accent treatment.
**Root-routing: glass-ui producer** (per `feedback_glass_ui_first_class.md` —
"glass-ui is the design system; add variants/primitives there") — this reads
as exactly the shape of a missing glass-ui primitive (e.g. an `accent="gold"`
shimmer variant on an existing text/badge component) rather than 3 bespoke
demo-local keyframes. Candidate wave-item: consolidate to one glass-ui
primitive, consumed by all 4 sites.

### 2.3 CONFIRMED — PRM-media-query inconsistency (root-consistency, not exact dup)
Two composables (`useMixingAnimation.ts`, `useInertiaGesture.ts`) correctly
route their `prefers-reduced-motion` gate through glass-ui's shared
`useBreakpoint("(prefers-reduced-motion: reduce)")` — the canonical,
already-established pattern (see demo/CLAUDE.md: "Breakpoint / hover-capability
queries route through glass-ui's `useBreakpoint`"). One site,
`useSpectrumCrossfade.ts:35`, instead hand-rolls
`window.matchMedia("(prefers-reduced-motion: reduce)").matches` directly.
Small (1-line) but a real root-consistency break; trivial fix.
**Root-routing: demo** (`useSpectrumCrossfade.ts`) — swap to `useBreakpoint`.

### 2.4 CONFIRMED — hand-rolled RAF loops bypass glass-ui's `useRAFLoop`
glass-ui ships `useRAFLoop` (`../glass-ui/src/composables/motion/useRAFLoop.ts`)
— a full animation-loop primitive with `pauseWhenHidden` (via the shared
`useDocumentVisibility` leaf), PRM auto-pause, frame/delta/elapsed timing, and
a `yieldToMain()` lever for INP-safety under heavy per-frame work. **Zero demo
consumers** (`grep -rl useRAFLoop demo/@` → empty). Instead, `useMixingAnimation.ts`
and `useInertiaGesture.ts` each hand-roll `requestAnimationFrame`/
`cancelAnimationFrame` bookkeeping plus their own PRM gate (correctly, via
`useBreakpoint` per §2.3) but get none of `pauseWhenHidden`/`yieldToMain` for
free — a background/hidden tab keeps animating (a real, measurable perf cost,
directly on-point for **S-9** "performance audit" and **S-23** "performance
above all"). Two lower-stakes one-shot RAF calls (`ColorInput.vue:254` focus,
`Dock.vue:89` settle-flag) are NOT loops and don't need this — no action there.
**Root-routing: demo** (migrate the 2 loop consumers to glass-ui's
`useRAFLoop`) — this is exactly the "glass-ui-first-class consumption"
precept already applied to `useBreakpoint`/`<Button>`, just not yet extended
to the RAF-loop primitive. Candidate wave-item, ties directly to S-9.

### 2.5 Color-space dropdown — NOT duplicated (verified single component; a coupling bug, not a DRY problem)
S-1 reports the picker-card and About-page color-space dropdowns render
inconsistently (wrong font on About). Traced: **both consume the single
shared `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue`**
(`AboutPane.vue:10-14` imports it directly) — there is no second
implementation to de-duplicate. The inconsistency is a **hidden-coupling bug**
inside that one component: its own code comment
(`ColorSpaceSelector.vue:22-27`) states the trigger's display face
deliberately has NO self-owned font — "the display face rides the
`CardHeader`'s `font-display` surface + the cloned specimen-row class" —
i.e. correct rendering depends on an ambient CSS class cascading down from
whatever parent wraps the selector. Inside the picker card that parent is a
`CardHeader` (font-display present); `AboutPane.vue` mounts it in a different
wrapper, so the ambient class isn't there and the trigger falls back to
default typography. This is a **root-styling violation in spirit**
(`feedback_root_styling.md`: style at the root component, not per-instance)
inverted — the root component itself isn't self-contained, it silently
reaches up for ambient context instead of carrying its own font token.
**Root-routing: demo `ColorSpaceSelector.vue`** — give the trigger its own
`font-display`-equivalent class instead of relying on ambient cascade. One
fix site cures both surfaces (picker + About) since they share the component
— good news for the eventual fix wave, but flagging here because it's the
kind of "one component, ambient-coupled" bug this census is positioned to
catch and a DRY audit alone (which would say "no duplication, ship it") would
miss.
Also confirms: the "— 06 / 16" counter text (**S-14**) lives at exactly one
line, `ColorSpaceSelector.vue:9-11` (`space-eyebrow` span) — single delete
site, no duplication to hunt.

### 2.6 Skeleton/shimmer loading-state survey (context for S-10)
`PaletteCardSkeleton.vue` already routes through the glass-ui `<Skeleton
surface="glass" variant="shimmer">` primitive (root-correct, not a demo-local
reinvention) — S-10's complaint ("shadow palette is ugly," "want shimmers
sequential per palette area," "want palette VARIANTS of shadow/skeleton") is
a **feature gap in the glass-ui `Skeleton` primitive's variant surface**, not
a duplication problem in demo. **Root-routing: glass-ui producer** (new
`Skeleton` variants/stagger-timing prop) + demo (thread the new prop through
`PaletteCardSkeleton.vue`, currently the only consumer touched by S-10).

## 3. KISS violations / needless abstraction
- No new shared/wrapper abstraction smells surfaced in this pass beyond
  §2.1-2.4's inconsistency issues (which are under-abstraction — needing to
  reach for the shared thing that already exists — rather than
  over-abstraction). Consistent with `feedback_kiss_no_contrivance.md`
  already being enforced: no stray `shared/` dirs found, no dead wrapper
  components found in the scanned trees.
- `src/units/utils.ts` mixing generic object-flatten utilities with CSS-unit
  math (§ table, row 5) is the one place this census found abstraction
  bundled somewhat arbitrarily under a domain-specific path — worth a KISS
  look in a future wave even though CLAUDE.md documents the combination as
  intentional.

## 4. Summary of candidate wave-items (ranked)
1. **P1** — Lift `.gold-shimmer-icon` to `demo/@/styles/utils.css`; audit +
   consolidate the 3 gold/admin-shimmer recipes (§2.1, §2.2) into one
   glass-ui primitive. Root: glass-ui (primitive) + demo (consumer swap).
2. **P1** — Migrate `useMixingAnimation.ts` / `useInertiaGesture.ts` to
   glass-ui's `useRAFLoop` for `pauseWhenHidden`/`yieldToMain` (§2.4). Direct
   S-9/S-23 performance payoff. Root: demo.
3. **P1** — Fix `ColorSpaceSelector.vue`'s ambient-font-cascade coupling
   (§2.5) — cures S-1 at its one true root site; delete the `— NN/NN` eyebrow
   line for S-14 in the same edit. Root: demo.
4. **P2** — Split `src/units/color/index.ts` (space-class lift),
   `src/parsing/color.ts` (relative-color + color-mix extraction),
   `src/units/normalize.ts` (layout-cache extraction), and lift
   `STYLE_NAMES`/`COLOR_NAMES` data tables out of `constants.ts` files. Root:
   value.js src.
5. **P2** — `src/parsing/stylesheet.ts` at-rule-body extraction — larger
   effort, recursive-grammar risk; scope as its own lane item with tests
   run before/after each extraction, not a quick pass. Root: value.js src.
6. **P2** — Fix the single stray `matchMedia` PRM call in
   `useSpectrumCrossfade.ts` to use `useBreakpoint` (§2.3). Root: demo.
7. **P3** — `src/transform/path.ts`'s `cubicAt` vs `src/math.ts`'s
   `deCasteljau` scalar-path overlap; watch, don't split preemptively.
   Root: value.js src.
8. **P3** — glass-ui `Skeleton` variant/stagger surface for S-10. Root:
   glass-ui producer.

No git commits made; no product files edited. This file is the only write.
