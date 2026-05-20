# Dn — value.js ↔ keyframes.js cross-library integration audit

**Tranche**: value.js D (planning). **Lane**: Dn (Dξ).
**Mode**: research, read-only across **both** repos. No src/ edits, no commits.
**Scope**: deep-audit the library-level / animation-kernel-level coupling between
value.js (`master` `70e61e9`) and keyframes.js (HEAD `0909177`, v2.1.1, code-side
contract-v2 compliant per `Dh-contract-v2.md §4`). B's `B-keyframes-parity.md §1`
already established the dependency direction is clean and one-way with zero
shared-math duplication; this lane goes deeper — is the **abstraction split**
between the two libraries optimal? Should value.js ship higher-level interpolation
primitives? Should anything lift from keyframes.js into value.js? And the
965-line god module flagged at B `coordination/Q.md §9 kf-1` — sketch the
cohesive split (keyframes.js-side work; routes to `D coordination/Q.md §9`).

**Inputs read (read-only)**:
- `value.js/src/index.ts` (~355 lines of named exports, the full library surface).
- `value.js/src/units/interpolate.ts`, `src/units/color/utils.ts:1092-1164`
  (`mixColors`, `color2`), `src/units/color/normalize.ts`.
- `value.js/src/easing.ts`, `src/math.ts`, `src/parsing/animation-shorthand.ts`,
  `src/parsing/extract.ts`, `src/parsing/serialize.ts`, `src/parsing/stylesheet.ts`.
- `value.js/package.json` (`sideEffects: false` ✓, `parse-that ^0.8.2`),
  `value.js/dist/value.js` (139 kB raw ESM, library chunk).
- `keyframes.js/src/animation/index.ts` (965 lines — the god module),
  plus all 13 sibling modules in `keyframes.js/src/animation/` (4030 lines total).
- `keyframes.js/src/animation/utils.ts:182-186` (the cross-realm parse-that comment).
- `keyframes.js/package.json` (`@mkbabb/parse-that ^0.8.1`,
  `@mkbabb/value.js file:../value.js`).
- `keyframes.js/src/animation/internal/binarySearch.ts` (the engine-internal
  helper with its self-justifying comment about why it doesn't live in value.js).
- `docs/tranches/B/research/B-keyframes-parity.md` (the prior audit this refreshes).
- `docs/tranches/D/coordination/Q.md §9` (the refreshed keyframes.js coordination
  filing per Dh).

**Inheritance**: this lane refreshes B's `coordination/Q.md §9` row `kf-1`
(god-module split sketch) and adds five new coordination rows. It does **not**
supersede B-keyframes-parity §1's verdict (one-way dep, zero math duplication) —
that verdict still holds. It also confirms the §3 framing from B was a
maintainability inventory; this lane sketches the actual split keyframes.js
needs to do, and surfaces three new value.js-side findings.

---

## §1 — `keyframes.js/src/animation/index.ts` cohesive split sketch (965 lines → 7 sub-modules)

The single file mixes seven concerns into one OOP god module. A cohesive split
follows the same small-barrel idiom value.js's `src/units/` and `src/parsing/`
already use:

| # | Sub-module | Lines (est.) | Symbol set |
|---|---|---|---|
| 1.1 | `src/animation/animation.ts` (the engine) | ~250 | `Animation` core: ctor, `addFrame`, `parse`, `createFrame`, `buildVarIndex`, `reconcileVars` |
| 1.2 | `src/animation/options.ts` (the options surface) | ~140 | `setOptions`, `setTimingFunction`, `setDuration`, `setDelay`, `setDirection`, `setFillMode`, `setUseWAAPI`, `setColorSpace`, `setHueMethod`, `setIterationCount`, `setTargets`, `reverse`, `convertFrameStart` |
| 1.3 | `src/animation/playback.ts` (lifecycle — distinct from existing `playback.ts`) | ~180 | `play`, `pause`, `resume`, `stop`, `tick`, `onStart`, `onEnd`, `draw`, `_playRAF`, `_playWAAPI`, `reset` |
| 1.4 | `src/animation/interp.ts` (the hot path) | ~80 | `interpFrames` (binary search + neighbour scan), `at` (stateless), `fillForwards`, `fillBackwards`, `effectiveT` getter |
| 1.5 | `src/animation/events.ts` (DOM event dispatch) | ~25 | `dispatchAnimationEvent` private helper, plus the AnimationEvent capability gate |
| 1.6 | `src/animation/css-keyframes.ts` (the subclass) | ~110 | `CSSKeyframesAnimation`: `fromVars`, `fromKeyframes`, `fromString`, `transform`, `propertyRegistry` field, the `hasClone` private helper |
| 1.7 | `src/animation/index.ts` (the barrel — pure re-exports, ~50 lines) | ~50 | Re-export `Animation`, `CSSKeyframesAnimation`, `getAnimationId`, plus all the existing public re-exports already on lines 26-67 of the current file |

Cohesion rationale:
- **1.1 vs 1.2**: the engine's frame-construction pipeline (`addFrame`/`parse`/`createFrame`/`reconcileVars`) is one cohesive concern; the long list of `setX` validators with their TODO ladder is a second concern (input shaping). Today they sit on the same class; tomorrow they can sit in the same `class Animation` declaration but in different files via module augmentation — or, cleaner, the validators can move to free functions that the `Animation` ctor invokes.
- **1.3 vs 1.4**: playback owns lifecycle (`startTime`, `iteration`, `pausedTime`, `done`, `resolvePromise`, the rAF / WAAPI dispatcher); `interp.ts` is pure data — `t → values`. The `at(progress)` API (line 558-568) is the cleanest illustration: stateless, no playback. Splitting these surfaces the stateless surface as a first-class API.
- **1.5**: 12 lines, but a distinct capability boundary (`AnimationEvent` ≠ universally available — `typeof AnimationEvent === "undefined"` guard at line 153).
- **1.6**: `CSSKeyframesAnimation` is a thin subclass that does ONE thing — adapt three input shapes (`fromVars`, `fromKeyframes`, `fromString`) to `addFrame()` calls. It has zero coupling to the playback machinery and a clear single-responsibility line. Today it shares the file because it `extends Animation`; splitting it does not change the inheritance.

Estimated post-split line counts (no logic change): no file > 250 lines, all under
the small-barrel rule. This is **keyframes.js-side work**; value.js cannot write
it. Routes to `coordination/Q.md §9` as a refreshed sketch (the B filing said
"split it" without saying how).

---

## §2 — value.js → keyframes.js abstraction inventory

What keyframes.js consumes from `@mkbabb/value.js`, by module (the full survey
B's audit summarised as "~14 exports"):

| keyframes.js file | value.js symbols imported | Layer |
|---|---|---|
| `animation/index.ts` (the god module) | `cancelAnimationFrame`, `clamp`, `convertToMs`, `easeInOutCubic`, `isObject`, `parseCSSPercent`, `parseCSSStylesheet`, `parseCSSTime`, `parseCSSValueUnit`, `requestAnimationFrame`, `scale`, `seekPreviousValue`, `sleep`, `unflattenObject`, `ValueUnit`, type `PropertyDescriptor`, type `Stylesheet` | math + utils + parsing + units |
| `animation/utils.ts` | `CSSCubicBezier`, `CSSFunction`, `CSSValues`, `flattenObject`, `FunctionValue`, `lerpColorValue`, `lerpComputedValue`, `lerpNumericValue`, `lerpValue`, `normalizeValueUnits`, `prepareInterpVar`, `timingFunctions`, `tryParse`, `unflattenObjectToString`, `ValueArray`, `ValueUnit` | parsing + interp + units |
| `animation/adapter.ts` | `extractAnimationOptions`, `extractKeyframes`, `extractProperties`, `parseCSSStylesheet`, type `KeyframeRule`, type `PropertyDescriptor`, type `Stylesheet` | parsing (stylesheet + extractors) |
| `animation/constants.ts` | `easeInOutCubic`, `timingFunctions`, type `HueInterpolationMethod`, type `InterpolatedVar`, type `ValueArray`, type `ValueUnit` | easing + types |
| `animation/playback.ts` (the RAFPlayback shared lifecycle) | `cancelAnimationFrame`, `clamp`, `requestAnimationFrame` | utils |
| `animation/group.ts` | `cancelAnimationFrame`, `lerp`, `requestAnimationFrame`, type `ValueUnit` | utils + math |
| `animation/smooth.ts` | `cancelAnimationFrame`, `requestAnimationFrame` | utils |
| `animation/numeric.ts` | `clamp`, `lerp`, `scale` | math |
| `animation/timeline.ts` | `timingFunctions` | easing |
| `animation/format.ts` | `camelCaseToHyphen`, `formatCSS`, `reverseCSSTime`, `timingFunctions`, `unflattenObjectToString`, `ValueUnit` | utils + parsing |
| `animation/animations.ts` (presets) | `CSSCubicBezier`, `steppedEase` | easing |
| `animation/waapi.ts` | `COMPUTED_UNITS`, `unflattenObjectToString` | constants + utils |

Total: ~36 unique symbols, drawing from value.js's `math.ts`, `easing.ts`,
`utils.ts`, `units/index.ts`, `units/constants.ts`, `units/utils.ts`,
`units/normalize.ts`, `units/interpolate.ts`, `units/color/utils.ts`,
`parsing/index.ts`, `parsing/units.ts`, `parsing/stylesheet.ts`,
`parsing/extract.ts`, `parsing/serialize.ts`. **No deep paths** — keyframes.js
consumes only the public barrel; value.js's surface is the canonical contract.

**§2.1 — Are these the right primitives for an animation kernel?**

Yes. The five-level layering is observable in the table:

1. **Math** (`lerp`, `clamp`, `scale`) — pure arithmetic, no domain.
2. **Easing** (`timingFunctions`, `CSSCubicBezier`, `steppedEase`,
   `easeInOutCubic`) — `(t: number) => number` family.
3. **Units** (`ValueUnit`, `ValueArray`, `FunctionValue`, `InterpolatedVar`) —
   parsed CSS value carriers + types.
4. **Interp** (`lerpValue`, `lerpColorValue`, `lerpNumericValue`,
   `lerpComputedValue`, `prepareInterpVar`, `normalizeValueUnits`) — the
   `(t, InterpolatedVar) => ValueUnit` family that mutates in-place.
5. **Stylesheet** (`parseCSSStylesheet`, `extractKeyframes`,
   `extractAnimationOptions`, `extractProperties`, `formatCSS`) — high-level
   CSS-document machinery, B.W3-committed.

Each level has a single, narrow protocol. keyframes.js's `Animation.parse()`
and `Animation.interpFrames()` are exactly the right shape of consumer:
**glue** that strings these primitives together into a frame index and a hot
path. Nothing in keyframes.js is reimplementing math, easing, units, or interp;
the only thing it adds is the **lifecycle layer** (rAF, WAAPI, iteration, fill
modes, events) and the **shape layer** (variable reconciliation across non-
adjacent keyframes, layer blending in `AnimationGroup`).

**§2.2 — Should value.js ship a higher-level `interpolate(spec)`?**

No (NO-CHANGE). The current primitive shape is already the right altitude.
Considered:

- A `interpolate(start, stop, t)` convenience that took raw values and dispatched
  to the right `lerp*Value` — but `prepareInterpVar` already pre-resolves the
  dispatch (`_lerp` hidden property, `interpolate.ts:117-124`), saving three
  type checks per call in the hot path. A higher-level wrapper would re-introduce
  those checks. The current "prepare-once-then-call-fast" shape is optimal.
- A `KeyframeTrack`-style abstraction (multi-stop) — but that's an animation-
  domain concept (positions, timing functions per stop), not a value-domain
  one. Belongs in keyframes.js (`Animation` is exactly this).

**Verdict (§2 overall)**: the value.js surface is well-factored for an animation
kernel. NO-CHANGE recommended.

**§2.3 — `mixColors` ergonomics (the `color2` integration question)**

The prompt asked whether `mixColors` is ergonomic for keyframes. The answer:
**keyframes.js does not call `mixColors` or `color2` at all**.
`grep mixColors\\|color2 keyframes.js/src/` returns zero (one false positive
in `demo/amiga/utils.ts` — a variable name, unrelated).

keyframes.js's color animation flows through `lerpColorValue`
(`interpolate.ts:46-65`), which walks each channel of a parsed `Color` and
lerps independently. The `normalizeColorUnits` step (called via
`normalizeValueUnits` in `keyframes.js/src/animation/utils.ts:275`) handles
colour-space alignment and hue method *before* the lerp, so `lerpColorValue`
itself is colour-space-agnostic. This is the right shape for an interpolation
kernel: `mixColors` is the high-level CSS `color-mix()` reproducer (used by
parsing for the literal `color-mix(in oklab, ...)` syntax); the lerp family is
the low-level interpolation primitive.

The two surfaces serve different consumers and do not need to be unified.
NO-CHANGE.

---

## §3 — Type-sharing audit

| Type | Defined in | Shared? | Verdict |
|---|---|---|---|
| `ValueUnit<T,U>` | `value.js:src/units/index.ts` | Yes — keyframes.js imports as type and value (constructs in `interpFrames`, the hot path) | OK |
| `ValueArray<T>` | `value.js:src/units/index.ts` | Yes — keyframes.js's `ParsedVarMap = Record<string, ValueArray>` (`animation/utils.ts:38`) | OK |
| `FunctionValue<T,N>` | `value.js:src/units/index.ts` | Yes — keyframes.js uses for `instanceof` checks in `flattenToValueUnits` | OK |
| `InterpolatedVar<T>` | `value.js:src/units/index.ts` (re-exported from `interpolate.ts` via `index.ts:3`) | Yes — keyframes.js re-exports as its own public type (`animation/constants.ts:62`) | OK |
| `Color<T>` | `value.js:src/units/color/index.ts` | Indirect — keyframes.js touches `Color` only through `InterpolatedVar<Color>` shape; never as a bare type. | OK |
| `HueInterpolationMethod` | `value.js:src/units/color/utils.ts` | Yes — keyframes.js types `AnimationOptions.hueMethod` as `HueInterpolationMethod` and re-exports (`constants.ts:62`) | OK |
| `TimingFunction = (t: number) => number` | `keyframes.js:src/animation/constants.ts` | **Parallel definition** — value.js does not export this exact name; `timingFunctions[k]` returns `(t: number) => number` (or a higher-arity factory for `steps`), and keyframes.js redefines its own `TimingFunction` type | **Find K7** — see §6 |
| `TimingFunctionNames` | `keyframes.js:src/animation/constants.ts` (`keyof typeof timingFunctions`) | Parallel definition — value.js exports `timingFunctions` itself but not its `keyof` derivation | Borderline — see §6 |
| `AnimationOptions`, `InputAnimationOptions`, `AnimationFrame`, `TemplateAnimationFrame`, `TransformFunction`, `Vars`, `BlendMode`, `AnimationLayerConfig` | `keyframes.js:src/animation/constants.ts` | keyframes.js-only — domain types for the engine itself. value.js's `parsing/extract.ts` exports a separate `AnimationOptions` (the CSS shorthand parse result); the name collision is not an actual symbol collision (different paths). | OK; note the name collision |
| `PropertyDescriptor`, `Stylesheet`, `KeyframeRule` | `value.js:src/parsing/stylesheet.ts` | Yes — keyframes.js imports as types in `animation/adapter.ts`. | OK |

**§3.1 — The name-collision concern (`AnimationOptions`)**

value.js exports `AnimationOptions` from `parsing/extract.ts` (the CSS
animation-shorthand parse result — `name`, `duration`, `timingFunction`, etc., as
strings/numbers extracted from CSS). keyframes.js exports `AnimationOptions`
from its `animation/constants.ts` (the engine's option object — `duration:
number`, `timingFunction: TimingFunction`, `useWAAPI: boolean`, etc.).

If a downstream consumer ever does `import { AnimationOptions } from "@mkbabb/value.js"`
and then `import { AnimationOptions } from "@mkbabb/keyframes.js"`, the latter
will shadow with no compile warning. The shapes are similar enough
(`duration`, `timingFunction`, `iterationCount`, …) that the bug would be
silent. **Find K6** in §6 — disambiguate one of the two names.

**§3.2 — Verdict (§3 overall)**

The type-sharing is fundamentally healthy: 8 of 10 shared types live in
value.js as the canonical home, and keyframes.js consumes them as types
(no re-export drift). Two findings only — K6 (name collision) and K7
(`TimingFunction` parallel definition).

---

## §4 — Bundle / tree-shake audit

| Repo | `sideEffects` | Named-exports only | Effective for tree-shake |
|---|---|---|---|
| value.js | ✅ `"sideEffects": false` (`package.json:21`) | ✅ no default exports across `src/` | Yes |
| keyframes.js | ❌ missing — confirmed at HEAD `0909177` (`package.json` lacks the field) | ✅ named-only | Partial — consumers cannot tree-shake unused keyframes.js exports unless they trust the bundler's static analysis with no `sideEffects` hint |

This was already filed in B `coordination/Q.md §9 kf-3` (one of the items D's
refreshed §9 deemed "maintainability inventory"). Re-confirmed at HEAD; the
gap is real.

**value.js dist sizes** (`dist/value.js`, ESM, post-B):
- `value.js`: 139 kB (the main library chunk).
- `postcss-BrHISTov.js`: 202 kB — Prettier postcss plugin (lazy-loaded via
  `parsing/serialize.ts:135-137` dynamic `import("prettier")`).
- `standalone-JqHlnZSs.js`: 112 kB — Prettier standalone (lazy-loaded same way).

The 314 kB of Prettier weight is **lazy** — `formatCSS` and `stylesheetToString`
are the only entry points that touch it, and they use `await import("prettier")`
so consumers that never call them never pay the cost. Confirmed in
`parsing/serialize.ts:131-150`. **NO-CHANGE** on this — the lazy-import shape is
the right cure for what would otherwise be a 314 kB tax on every value.js
consumer.

**keyframes.js dist size** (`dist/keyframes.js`): 50 kB raw. It does not
re-bundle value.js (Vite externalises it via `peerDependencies`-style
configuration — confirmed by inspecting the dist comment headers; not
re-verified at byte level here).

**§4.1 — Cross-realm `parse-that` (the silent bundle hazard)**

`keyframes.js/src/animation/utils.ts:182-186` carries this comment:

> value.js and keyframes.js each ship their own copy of `@mkbabb/parse-that`
> under different node_modules realms, so the `Parser<T>` classes are nominally
> distinct from TypeScript's perspective. The runtime is the same. Cast to
> `any` to bypass the cross-realm type comparison.

This is a *workaround* for the `file:../value.js` link — when keyframes.js
installs value.js as a file link, npm/yarn installs value.js's `parse-that`
under `node_modules/@mkbabb/value.js/node_modules/@mkbabb/parse-that`,
disjoint from keyframes.js's own `node_modules/@mkbabb/parse-that`. The
classes are *runtime*-identical (same npm tarball) but *type-realm* distinct.
The cast-to-`any` is correct given the constraint, but the pin desync
(`parse-that ^0.8.1` in keyframes.js vs `^0.8.2` in value.js) means the
runtime identity is also fragile — a future bump on one side without the
other could surface a real mismatch.

**Coordination filing (new — K8)**: align `@mkbabb/parse-that` major+minor pins
across the fleet (value.js, keyframes.js, glass-ui if it consumes it). Bumping
keyframes.js from `^0.8.1` → `^0.8.2` is a one-line keyframes.js change. Files
to coordination; routes to keyframes.js's schedule.

---

## §5 — Abstractions to lift from keyframes.js INTO value.js (or NOT)

The prompt asked whether any abstraction in keyframes.js belongs in value.js by
DRY. Survey of every keyframes.js animation/ module:

| Symbol | keyframes.js home | Lift to value.js? | Rationale |
|---|---|---|---|
| `binarySearchRange` | `animation/internal/binarySearch.ts` | **No** — the helper's own header comment (lines 11-13) names this explicitly: "Lives in `src/animation/` (not value.js) because value.js has no interpolation engine of its own to consume it." | NO-CHANGE — the author already considered this and ruled correctly. value.js's interpolation primitives are point-evaluators (`lerpValue(t, iv)`), not range-locators. |
| `getTimingFunction(timingFunction)` | `animation/utils.ts:106-133` | **Maybe** — resolves `TimingFunction \| TimingFunctionNames \| string \| undefined` to a callable. The function does only two things: (a) registry lookup against `timingFunctions`, (b) `cubic-bezier(...)` literal parsing via a regex and `CSSCubicBezier`. Both are value.js-level concerns. | **Find K9** — ship `resolveTimingFunction` in value.js's `easing.ts`. keyframes.js consumes it. The `cubic-bezier()` regex parse is the load-bearing duplication — `parsing/index.ts` already has a full `cubic-bezier()` parser; the regex shortcut here duplicates that. |
| `RAFPlayback` | `animation/playback.ts` (entire 76-line class) | **No** — it's a managed rAF lifecycle (`play(duration, onTick)` resolving a Promise). Pure animation-domain. | NO-CHANGE. |
| `SmoothProgress` | `animation/smooth.ts` (241 lines) | **No** — damped scalar interpolator with reduced-motion handling. Animation-domain. | NO-CHANGE. |
| `Timeline`/`ScrollTimeline`/`ManualTimeline` | `animation/timeline.ts` | **No** — scroll-driven progress. Animation-domain. | NO-CHANGE. |
| `ElementMorph` | `animation/morph.ts` | **No** — wraps `NumericAnimation` for DOM rect interpolation. Animation-domain. | NO-CHANGE. |
| `resolveKeyframes` | `animation/adapter.ts` | **No, but check** — it adapts `parseCSSStylesheet` output to a `Map<percent, vars>` shape. This is *between* value.js's extractor output and keyframes.js's `addFrame()` input. The reshaping is keyframes.js-specific (its `vars` shape with `transform`, `timingFunction` fields). Lifting it would re-couple value.js to keyframes.js's frame model. | NO-CHANGE — but it's worth confirming the value.js `extractKeyframes` already returns the right shape; `adapter.ts` should be thin glue. |
| `parseAndFlattenObject` | `animation/utils.ts:141-217` | **No** — drives the `flattenObject → tryParse` pipeline for the animation engine's `vars`. Knows the engine's `ParsedVarMap` shape. Animation-domain. | NO-CHANGE. |
| `transformTargetsStyle` (the default renderer) | `animation/utils.ts:299-313` | **No** — applies `vars` to DOM element `.style`. DOM-domain. | NO-CHANGE. |
| The `flattenToValueUnits` recursion | `animation/utils.ts:40-56` | **Maybe** — recursively walks `ValueUnit`/`FunctionValue`/`ValueArray` to a flat `ValueUnit[]`. value.js has `flattenObject` (object-flatten) but no equivalent for value-tree flattening. The recursion is value-domain (knows about the three carrier classes). | **Find K10** — consider exporting a `flattenValueTree(v): ValueUnit[]` helper from value.js's `units/utils.ts`. Low priority; current site is a 17-line local function and it's the only consumer. |

**Verdict (§5 overall)**: most candidates correctly stay in keyframes.js. Two
findings — K9 (`resolveTimingFunction` is a clean lift) and K10
(`flattenValueTree` is debatable). K9 is the stronger of the two because the
duplication is concrete (a `cubic-bezier()` regex parallel to value.js's full
parser).

---

## §6 — Prioritised recommendations

All findings are classified per the prompt's vocabulary:

| # | Find | Classification | Wave | Priority |
|---|---|---|---|---|
| K6 | `AnimationOptions` name collision (value.js's CSS-extract vs keyframes.js's engine-option) — silent shadow risk for downstream consumers | COORDINATION | D coord §9 | **P2** |
| K7 | `TimingFunction = (t: number) => number` parallel-defined in keyframes.js; not exported by value.js | VALUE-SHIP (small) | D.Wn-N (a 1-line `src/easing.ts` export + barrel re-export) | **P2** |
| K8 | `@mkbabb/parse-that` pin desync (`^0.8.1` keyframes.js vs `^0.8.2` value.js); cross-realm hazard at `animation/utils.ts:182-186` | COORDINATION | D coord §9 | **P2** |
| K9 | `resolveTimingFunction` could ship from value.js (`easing.ts`) — removes a `cubic-bezier()` regex duplicating value.js's full parser | VALUE-SHIP | D.Wn-N | **P1** |
| K10 | `flattenValueTree` helper for `ValueUnit`/`FunctionValue`/`ValueArray` recursion | VALUE-SHIP (small) | Optional / deferred | **P3** |
| kf-1 (refresh) | The 965-line god module's cohesive split — sketched in §1, seven sub-modules | COORDINATION (replaces the B-vintage one-liner) | keyframes.js own schedule | **P2** |

**Already-OK (NO-CHANGE) findings**:
- Dependency direction (one-way, no circular). [B §1; re-confirmed.]
- Shared-math zero-duplication. [B §1; re-confirmed.]
- `mixColors` / `color2` integration — keyframes.js doesn't call them; the
  `lerpColorValue` primitive is the right shape. [§2.3.]
- Higher-level `interpolate(spec)` — would defeat `prepareInterpVar`'s
  dispatch-cache. [§2.2.]
- `binarySearchRange` lift — already considered and ruled by the author. [§5.]
- `sideEffects: false` on value.js — present. Tree-shake works. [§4.]
- Lazy Prettier import — correct shape. [§4.]
- No cross-repo integration tests in value.js — and none warranted (both
  test suites independently exercise the integration: value.js's
  `interpolate.test.ts` for the lerp family, keyframes.js's `animation.test.ts`
  / `equivalence.test.ts` for the consumer side).

**Top P1 — K9 (ship `resolveTimingFunction` from value.js)**

The cleanest value-ship from this audit. Concrete duplication:
`keyframes.js/src/animation/utils.ts:86-87` defines `CUBIC_BEZIER_LITERAL` regex
to match the CSS `cubic-bezier(...)` syntax, then calls `CSSCubicBezier(x1, y1,
x2, y2)`. value.js already has a full `cubic-bezier()` parser in
`parsing/index.ts` (cited in `parsing/CLAUDE.md` ["cubic-bezier(), generic
function()" line]), so the regex is the only piece of code in keyframes.js
that re-parses a CSS value. Lift `resolveTimingFunction(input: string |
TimingFunction | undefined): TimingFunction | undefined` into `src/easing.ts`,
have it consult `timingFunctions` + try-parse `cubic-bezier()` via the existing
parser. keyframes.js's `getTimingFunction` becomes a one-line re-export (or
deletion + import-rewrite).

Scope: ~30 lines net in value.js (`easing.ts` + barrel export); ~25 lines net
removed from keyframes.js (a KEYFRAMES-RECEIVE follow-up on the consumer side,
filed to coordination).

**Top P2 trio — K6, K7, K8** — all small / coordination-only.

**Top P3 — K10** — optional / discretionary.

---

## §7 — Verdict

The value.js↔keyframes.js library integration is **architecturally healthy** at
HEAD — B's verdict still holds (clean one-way dep, zero math duplication, named
exports + `sideEffects: false` on the publisher). The deep audit surfaces:

- **One real ship recommendation (K9)** that removes a concrete code duplication.
- **One small ship recommendation (K7)** that exports an already-used type.
- **Three coordination filings (K6, K8, kf-1-refresh)** that route to
  keyframes.js's own maintenance.
- **One optional ship (K10)** that's value-judgement only.

The 965-line god module (B kf-1) is a **keyframes.js maintenance task**, not a
value.js coupling issue — the sketch in §1 documents the cohesive split so
keyframes.js's next maintainer has a concrete shape to execute against. Nothing
in value.js needs to wait on that split.

D's coordination filing (`coordination/Q.md §9`) gets a refresh appending K6,
K7, K8, K9, K10, and the §1 split sketch. The B-vintage §9 framing remains
correct (keyframes.js-side schedule); D's refresh sharpens the asks.
