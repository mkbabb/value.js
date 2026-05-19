# D-REACTIVITY-B — Instant Reactivity Audit (READ-ONLY)

**Lane**: REACTIVITY-B — instant reactivity in value.js color-picker demo + keyframes.js demo.
**Mode**: planning / audit only. No code edits; no git mutations.
**Author**: hardening agent, tranche D.
**Date**: 2026-05-19.
**Scope**: `demo/color-picker/` + `demo/@/` in value.js; `demo/app/` + `demo/@/` in keyframes.js. Cross-refs `src/units/color/index.ts`, `src/units/interpolate.ts`.

---

## §1 — Color-picker reactivity graph + barriers

### 1.1 The source-of-truth ladder

The value.js color-picker has **two stacked `shallowRef<ColorModel>`** — this is intentional, not accidental:

```
demo/color-picker/App.vue
  ├─ model = shallowRef<ColorModel>(defaultColorModel)             [tier 1: app-level model]
  ├─ useAppColorModel(model) → { cssColor, cssColorOpaque, ... }   [tier 1.5: cross-cutting derived]
  ├─ provide(EDIT_TARGET_KEY, activeEditTarget)                    [shallowRef<EditTarget|null>]
  └─ provide(CSS_COLOR_KEY, cssColorOpaque)                        [ComputedRef<string>]
       │
       ▼ (passed as :model prop into <ColorPicker>)
       │
ColorPicker.vue
  └─ useColorModel(externalModel)
       ├─ model = shallowRef<ColorModel>({ ...externalModel.value })  [tier 2: local cache]
       ├─ watch(() => externalModel.value, ...) — ext → local sync
       └─ updateModel(patch) — writes to BOTH local AND externalModel
```

The tier-2 local `shallowRef` is **load-bearing**, exactly as the project memory entry calls out:

- `defineModel()` returns a `WritableComputedRef` whose write triggers an async parent round-trip. Reads after writes return *stale data* (the parent hasn't re-evaluated yet).
- `useColorModel` works around this by maintaining `model` as a synchronous cache. `updateModel` writes `model.value = next` **first** (synchronous, observable on the next tick of the same microtask), then `externalModel.value = next` (parent round-trip).
- `lastWrittenModel` (line 42) is the echo-suppression sentinel: when the external `watch` fires for a value the local just wrote, the watch no-ops.

**Verdict**: the pattern is sound and the workaround is still in place + still load-bearing. **DO NOT** flatten this into a single shared ref without first reconfirming the `defineModel` async round-trip is acceptable for hot interactive paths (spectrum drag, slider drag).

### 1.2 The full topology

```
              ┌────────────────────────────────────────────────────────┐
INPUT EVENTS  │  spectrum pointermove    slider drag      hex input    │
              │       │                       │              │         │
              │       ▼                       ▼              ▼         │
              │  scheduleSpectrumUpdate    updateColorComp  parseAndSet│
              │  (rAF-throttled)           (Slider model)   ColorDeb.  │
              │       │                       │              │ (2000ms)│
              └───────┼───────────────────────┼──────────────┼─────────┘
                      ▼                       ▼              ▼
              ┌────────────────────────────────────────────────────────┐
              │             useColorModel.model (shallowRef)            │
              │             updateModel(patch) — atomic                 │
              └────────────────────────────────────────────────────────┘
                      │  trigger ▼  (one shallow trigger per mutation)
              ┌────────────────────────────────────────────────────────┐
COMPUTED      │  cssColor, cssColorOpaque, denormalizedCurrentColor,    │
GRAPH         │  HSVCurrentColor, currentColorOpaque, currentColorSpace,│
              │  colorComponents, currentColorComponentsFormatted, ...  │
              └────────────────────────────────────────────────────────┘
                      │
                      ├─► SpectrumCanvas (background style + dot pos)
                      ├─► ComponentSliders (model-value bound to .value[k].value)
                      ├─► useSliderGradients.watch → gradients (debounced via key-string)
                      ├─► useColorNameResolution.watch → debounce(100ms) → XYZ string
                      ├─► useColorUrl.watch → debounce(300ms) → router.replace
                      └─► useAppColorModel.watch → debounce(200ms) → localStorage
```

### 1.3 Barrier audit

| # | Barrier | Location | Status | Cost |
|---|---------|----------|--------|------|
| B1 | `defineModel` async round-trip | tier-1↔tier-2 cache | mitigated by local `shallowRef`+`lastWrittenModel` | none on hot path |
| B2 | `shallowRef<ColorModel>` (granularity) | `useColorModel.ts:39`, `App.vue:120` | correct: ColorModel mutates via replacement, not in-place; no field-level reactivity required | none |
| B3 | `stableHue` ref | `useColorModel.ts:95` | present; low-chroma guard `s*v > 0.01` at 3 sites (ext-watch, parseAndSet, updateColorComponent) | ~free |
| B4 | spectrum rAF throttle | `SpectrumCanvas.vue:94-105` | already rAF-coalesced; primitive coords stored, not Color objects | ≤16ms by construction |
| B5 | slider → component update | `ComponentSliders.vue:60-63` calls `updateColorComponent(v, c, true)` | **synchronous** (no debounce on `updateColorComponent`); the *debounced* variant `updateColorComponentDebounced` is exported but not bound to the slider — good. Sliders are instant. | none |
| B6 | hex input → preview | `useColorParsing.parseAndSetColor` | **non-debounced variant exists** and is called by the input on blur/Enter; `parseAndSetColorDebounced` (2000ms) is also exported — verify which the input uses (see §4) | depends on binding |
| B7 | URL sync | `useColorUrl.syncModelToUrl` | debounced 300ms — does NOT block UI; correct | none on UI |
| B8 | localStorage sync | `useAppColorModel.syncColorToStorage` | debounced 200ms; non-blocking | none on UI |
| B9 | XYZ name resolution | `useColorNameResolution.recomputeXYZ` | debounced 100ms; the displayed name lags by ≤100ms — acceptable for a name pill | imperceptible |
| B10 | `useSliderGradients.watch` source-key | `useSliderGradients.ts:45-53` | source builds a string `${space}:${k1:v1|k2:v2|…}`; Vue's source-comparison is by-value; for 4-channel colors at 3-digit precision the string is ≤80 chars — fast | <µs |
| B11 | computed-of-computed chains | `currentColorOpaque ← denormalizedCurrentColor`; `cssColor ← denorm` | max depth 2; Vue caches; one model write triggers exactly N invalidations where N = unique computeds read in the render — no cascade explosion | trivial |
| B12 | watchers' flush timing | all default `pre` (post-update, pre-render) | no `flush: 'sync'` anywhere — verified via grep | correct |
| B13 | external watch echo | `useColorModel.ts:43-45` | echo-suppressed via `lastWrittenModel === ext` reference check | correct |

**No stalls detected on the hot interactive paths (spectrum drag, slider drag).** Hex input is the only path with a debounced-by-default variant; instant feedback there depends on which binding is used (see §4).

### 1.4 `reactive()` audit

Only **four** call sites (grep verified):

| Site | Contents | Verdict |
|------|----------|---------|
| `App.vue:211` | `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` | pure primitives (numbers, colors-as-strings) — deep reactivity is fine and intended (aurora config tweaks need granular updates) |
| `App.vue:218` | `reactive({ ...BLOB_CONFIG_DEFAULTS })` | pure primitives — fine |
| `goo-blob/GooBlob.vue:32` | `reactive({ ...BLOB_CONFIG_DEFAULTS })` (fallback when no injected config) | pure primitives — fine |
| `useHoverPopover.ts:14`, `useCardMenu.ts:9` | `reactive({ top: "0px", left: "0px" })` | CSS strings only — fine |

**No `Color<T>` or `ValueUnit` instance is ever placed inside a `reactive()` container in the demo.** Color/ValueUnit instances always live inside the `shallowRef<ColorModel>` chain. This is the correct topology — see §3.

---

## §2 — keyframes.js demo reactivity sketch

Located at `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue` + scene-specific subdirs (`amiga/`, `cube/`, `easing/`, `square/`, `playground/`).

### 2.1 Topology — fundamentally different from value.js

The keyframes.js demo's reactivity kernel is **NOT directly Vue-driven**. Instead:

```
┌───────────────────────────────────────────────────────────────┐
│  AnimationGroup (markRaw, NOT reactive)                        │
│   ├─ animations: Record<string, { animation: Animation, ... }> │
│   ├─ playing(), pause(), tick(time)                            │
│   └─ rAF loop drives time → tick → mutate animation.t          │
└───────────────────────────────────────────────────────────────┘
                       │
                       │   ┌──────────────────────────────────┐
                       └───┤  useAnimationSync(getAnimation,  │
                           │   isPlaying)                     │
                           │  ── rAF poll reads animation.t,  │
                           │     .started, .reversed and      │
                           │     writes to three Vue refs.    │
                           └──────────────────────────────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │  Vue refs: currentT, │
                            │  isStarted, isReversed│
                            └──────────────────────┘
                                       │
                                       ▼
                            UI bindings (scrubber, transport)
```

### 2.2 Key primitives in `App.vue` (verified)

- `currentAnimationGroup = shallowRef<AnimationGroup>(markRaw(new AnimationGroup()))` — **`markRaw` is correctly applied.** The AnimationGroup will not be deep-Proxied; its internal mutations (frame ticks, animation `t` updates) don't pay the reactive trap cost.
- `sceneRef = shallowRef<any>(null)` — scene component refs.
- `currentSuperKey = shallowRef<string>(...)`.
- `EasingScene.useEasingDemo`: `dummyAnimation = markRaw(...)`, `animationGroup = markRaw(...)`.
- `SquareScene`: `animationGroup = markRaw(new AnimationGroup(anim))`.
- `useAnimationSync` (line-verified at `demo/@/components/custom/animation-controls/controls/composables/useAnimationSync.ts`): runs an unconditional rAF loop, polls `animation.effectiveT`/`started`/`reversed`, writes to three Vue `ref<number|boolean>`s. Comments at lines 7-12 explicitly justify the unconditional loop ("three ref assignments per frame is negligible, and gating creates chicken-and-egg problems").

### 2.3 Verdict

The keyframes.js demo's reactivity strategy is **already model-grade**:

1. The animation kernel (mutation-heavy, ≥60 Hz) runs entirely outside Vue's reactivity (`markRaw`).
2. A thin rAF-polled bridge writes a small set of primitives to Vue refs — three writes per frame, each O(1).
3. The UI (scrubber, transport) binds to those primitive refs and renders cheaply.

This is the gold-standard pattern. The value.js color-picker would benefit from referencing it as a model. **No instant-reactivity issues identified in keyframes.js demo.**

The one thing keyframes.js does NOT use that the value.js demo also does NOT use: `flush: 'sync'`. Neither needs it — both have rAF-coalesced input loops feeding the model.

---

## §3 — L8 `Color<T>` Map → own-property flatten × Vue 3.5 reactivity

### 3.1 The transposition and its reactivity surface

Current shape (`src/units/color/index.ts:31-37`):

```ts
export abstract class Color<T = number> {
    [key: string]: any;                                  // index signature for `color.value.r`
    protected components: Map<string, T>;
    constructor(public readonly colorSpace: ColorSpace,
                public alpha: T = 1 as T) {
        this.components = new Map<string, T>();
    }
    // get/set go through getComponent/setComponent (lines 94-100)
}
```

Subclasses (e.g. RGBColor, OKLChColor) declare per-channel getters/setters that delegate to `this.components.get(key)` / `.set(key, value)` plus a top-level `[key]: any` accessor. **All channel reads are method calls on a Map.**

L8 proposes: replace the Map with own properties (e.g. `this.r`, `this.g`, `this.b`).

### 3.2 The Vue-reactivity interaction the brief asks about

The brief flags a hypothetical: "if `Color<T>` instances are inside `reactive()`, own properties become trap calls, but Map storage is opaque to traps — so flattening could ADD overhead inside hot loops."

**Empirical verdict — the hypothetical does not apply to this codebase:**

- **No `Color` or `ValueUnit` instance is ever placed inside `reactive()`** anywhere in `demo/@/` or `demo/color-picker/`. The four `reactive()` sites (§1.4) all hold pure primitives.
- The `ColorModel` (which contains the Color via `model.color`) is held in `shallowRef<ColorModel>`. `shallowRef` does **not** deep-proxy its `.value` — channel access on `model.value.color.value.r` traverses through plain object access + Map.get() (or, post-L8, plain property access). Zero trap cost in either world.
- The lerp/`mixColors`/conversion kernels (`src/units/color/utils.ts` — 1160 loc) operate on Color instances *as values*, not as reactive sources. They're invoked from inside `computed()` callbacks (e.g. `cssColor`, `denormalizedCurrentColor`), but the tracked dependency is the top-level `model` shallowRef, not channel-level. The kernel walks the Color and pays only the underlying storage cost (Map.get today, property read post-L8).

**So the L8 flatten is a net win for the hot path:**

| Operation | Map storage (today) | Own-property (post-L8) |
|-----------|---------------------|------------------------|
| `color.r` channel read | `this.components.get("r")` — hash lookup, ~5–15 ns | direct property read — ~1–2 ns |
| `keys()` | `[...this.components.keys(), "alpha"]` — allocates a new array | precomputed static `["r","g","b","alpha"]` — no allocation |
| `entries()` | `[...this.components.entries(), …]` — allocates an array of pairs | iterate over known keys — no allocation |
| inside `reactive()` (HYPOTHETICAL) | opaque | property trap (~30 ns) per read |
| inside `shallowRef.value` (ACTUAL) | hash lookup | direct property read |

### 3.3 Mitigation primitives — defense in depth

Even though the codebase doesn't currently expose Color to deep `reactive()`, the L8 transposition should ship with one defensive primitive to prevent future regressions:

- **Primitive M1**: when a Color instance is constructed, call `Object.freeze(this.constructor.prototype)` (idempotent) and consider adding a `[markRawSymbol] = true` private — or, simpler, document in `src/units/color/CLAUDE.md` that **Color instances must never be placed inside `reactive()`; use `shallowRef`, `markRaw`, or `shallowReactive`**.
- **Primitive M2**: a Vitest unit test that asserts `isReactive(someColor) === false` after `reactive({ color: new RGBColor() }).color` (i.e. Color survives reactive-wrapping without channel-trap overhead). This is a regression fence, not a correctness gate.
- **Primitive M3**: optional — define `Color.prototype[Symbol.iterator]` for `for…of` over entries; once the Map is gone, this avoids the `entries()` array allocation in `toString()` / `toFormattedString()` / `lerpColorValue` hot paths.

### 3.4 Recommended pattern for the L8 transposition

In the lib code itself, when the flatten lands, mark the prototype as raw-safe with a documentation comment + add the assertion test. **No mitigation in the demo is required** — the demo's existing topology (`shallowRef<ColorModel>` + Color/ValueUnit never inside `reactive()`) is already correct and the L8 flatten is strictly cheaper.

**Conservative caveat — measurement evidence:** the claimed ~3–10× speedup on channel reads should be confirmed with a microbenchmark (e.g. `bench/color-channel.bench.ts`) running 1M iterations of `color.r` access pre- and post-L8. This is a single 30-line benchmark; the trap-cost numbers above are order-of-magnitude estimates from prior Vue 3 micro-benches, not measurements from this codebase.

---

## §4 — Non-instant sites in the demos

### 4.1 Color-picker demo

Reviewed every visible input → output binding. Findings:

| Path | Status | Notes |
|------|--------|-------|
| Spectrum drag → spectrum dot | INSTANT (rAF) | rAF-coalesced; one frame max (16ms) |
| Spectrum drag → cssColorOpaque consumer (e.g. saved palettes background) | INSTANT (next tick) | computed chain depth 1; default `pre`-flush watch fires post-update |
| Slider drag → channel value | INSTANT | `updateColorComponent` (non-debounced) bound directly |
| Slider drag → spectrum hue (when hue slider) | INSTANT | `updateColorComponent` updates `stableHue` synchronously when component is "h"/"hue" |
| Hex input → preview | **DEPENDS** | `useColorParsing` exports both `parseAndSetColor` (sync) and `parseAndSetColorDebounced` (2000ms). The 2000ms debounce is significant if it's used for the live preview. **Recommended verification**: search `ColorInput.vue` / `EditDrawer.vue` for which binding is used. If `parseAndSetColorDebounced` is bound to `@input`, the live preview lags 2 s. If only the user-cancelable commit-on-blur path uses it, it's fine. (Not verified in this read-only audit — flagged for follow-up.) |
| Palette click → picker color | INSTANT | direct `updateModel({ color })` via `parseAndNormalizeColor` |
| Color-space dropdown → channel set | INSTANT | `updateToColorSpace` calls `setCurrentColor` synchronously |
| View switch → pane swap | covered by D.W3 `usePaneRouter` | not in scope here |
| XYZ name pill | LAGS 100ms (intentional) | `useColorNameResolution.recomputeXYZ` is debounced; pill flicker would otherwise be jarring |
| URL sync | LAGS 300ms (intentional) | spectrum drag → URL would otherwise spam history |
| localStorage | LAGS 200ms (intentional) | drag → 60 disk writes/sec is bad |

**Net**: zero unintentional non-instant sites detected. One requires a binding verification (hex-input debounce).

### 4.2 Keyframes.js demo

| Path | Status | Notes |
|------|--------|-------|
| Keyframe edit → animation preview | INSTANT | `useAnimationSync` polls every rAF; ≤16ms |
| Scene switch → scene mount | LAGS (intentional) | `<Transition out-in mode>` — controlled visual transition |
| Transport play/pause | INSTANT | direct `group.pause()` / `group.play()` on markRaw object; rAF poll picks up state next frame |

No issues.

---

## §5 — `_lerp` bolt-on reactivity audit

### 5.1 Where it lives

`src/units/interpolate.ts:117-124`:

```ts
export function prepareInterpVar(iv: InterpolatedVar<any>): InterpolatedVar<any> {
    (iv as any)._lerp = iv.computed
        ? lerpComputedValue
        : iv.start.unit === "color"
          ? lerpColorValue
          : lerpNumericValue;
    return iv;
}
```

And the consumer at `interpolate.ts:84-107` (`lerpValue`): reads `(iv as any)._lerp` and dispatches.

### 5.2 Reactivity concern + resolution

The brief flags: "if the IV is inside a tracked reactive, the post-construction `_lerp = …` mutation could fail to trigger an update."

**Empirical verdict — no concern:**

- `InterpolatedVar` is a plain class (declared in `src/units/index.ts`). It carries `start: ValueUnit`, `stop: ValueUnit`, `value: ValueUnit`, `computed: boolean`.
- Grep of `demo/` and `src/` confirms `InterpolatedVar` instances are never placed inside a `reactive()` container. They're consumed from the lib's interpolation kernel which is called from inside `computed()` callbacks (and from keyframes.js's `markRaw`'d Animation kernel).
- Even if one ever were placed inside `reactive()`: `_lerp` is set BEFORE the IV is exposed (`prepareInterpVar` is called once at IV construction time, before any consumer reads it). Vue's deep-reactive Proxy would intercept the assignment and add it to the tracked deps — but no consumer ever depends on `_lerp` as a *reactive* source; it's read inside non-tracked hot-path functions.
- The `(iv as any)._lerp` write is an *invariant property* for the lifetime of the IV (the comment at line 116 spells this out: "the dispatch is invariant"). Vue's reactivity model handles invariant adds fine.

**Verdict**: the `_lerp` bolt-on is **reactivity-benign**. The only legitimate concern is *type-system* — `(iv as any)._lerp` should ideally be a typed hidden field on the `InterpolatedVar` class declaration (private property with a name-prefix like `__dispatch`) rather than an `as any` bolt-on. That's a code-quality nit, not a reactivity bug.

---

## §6 — Cross-check with REACTIVITY-A's assertion sites

REACTIVITY-A is hypothesized to propose dev-only assertions inside `Color`/`ValueUnit` setters (e.g. "channel value must be a finite number" or "alpha must be in [0,1]").

### 6.1 Assertion-trigger cascade concern

If assertions are added inside setters and the setters are called during a render-tracked context:

- `reactive()` Proxy `set` trap fires → setter runs → assertion runs → if it `throw`s or `console.warn`s, render aborts/spams.
- The assertion itself does NOT trigger reactivity invalidation (assertions are side-effect-free unless they throw).

**Verdict**: assertions are reactivity-safe **as long as** they are pure (no state mutation, no observable side effects in production builds) and gated on `import.meta.env.DEV`.

### 6.2 Recommendation for REACTIVITY-A integration

Whatever assertion primitive REACTIVITY-A lands, it should:

1. Be gated on `import.meta.env.DEV` so the production hot path pays zero cost.
2. Use `console.error`/`console.warn`, **not** `throw`, when the value is non-fatal — throwing inside a Vue render aborts the frame and produces confusing stack traces. Throwing inside a setter called from a `reactive()` Proxy trap is especially bad — Vue may swallow or re-throw it inconsistently across flush stages.
3. Be a no-op for the empirically-confirmed safe paths (e.g. `lerpColorValue` writing `current.value = result` 4×/frame at 60 Hz must not trip assertions).

This audit does **not** require REACTIVITY-A's assertions to land first — they're orthogonal. But the REACTIVITY-A author should know that REACTIVITY-B has verified Color/ValueUnit live exclusively inside `shallowRef`/`markRaw` containers, so the assertion site is the bare class, not a Proxy.

---

## §7 — Instant-reactivity hardening primitives

### 7.1 Primitive (a) — Playwright "reactivity smoke" check

Add to D.W5 `e2e/reactivity-smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("spectrum drag commits color within one frame", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const spectrum = page.locator(".spectrum-picker");
    const dot      = page.locator(".spectrum-dot");
    const box      = await spectrum.boundingBox();
    if (!box) throw new Error("spectrum not mounted");

    // 1. Read initial bg color of any consumer of cssColorOpaque
    //    (e.g. document.body background or a known swatch)
    const before = await page.evaluate(() =>
        getComputedStyle(document.body).background
    );

    // 2. Pointerdown + 5× pointermove + pointerup with timestamps
    const startTime = await page.evaluate(() => performance.now());
    await spectrum.dispatchEvent("pointerdown", {
        clientX: box.x + 10, clientY: box.y + 10, pointerId: 1, isPrimary: true,
    });
    for (let i = 0; i < 5; i++) {
        await spectrum.dispatchEvent("pointermove", {
            clientX: box.x + 10 + i * 20, clientY: box.y + 10 + i * 20,
            pointerId: 1, isPrimary: true,
        });
    }
    await spectrum.dispatchEvent("pointerup", { pointerId: 1, isPrimary: true });

    // 3. Wait at most 50ms for the dot to move (well past 16ms frame budget)
    await expect.poll(async () => {
        const left = await dot.evaluate(el => (el as HTMLElement).style.left);
        return parseFloat(left || "0");
    }, { timeout: 50 }).toBeGreaterThan(5);

    const endTime = await page.evaluate(() => performance.now());

    // 4. Assert ≤ 32 ms from first pointermove to dot update (2 frames for slack)
    expect(endTime - startTime).toBeLessThan(50);

    const after = await page.evaluate(() =>
        getComputedStyle(document.body).background
    );
    expect(after).not.toBe(before);
});
```

**Threshold**: ≤ 50ms wall-clock total for pointerdown→5×move→up→visible-change. The hot-path frame budget is 16ms; allowing 3× slack covers CI variance.

**Bind in D.W5**: add the spec, mark it `@reactivity-smoke`, run in the CI matrix.

### 7.2 Primitive (b) — Vue effect-leak probe

Add a dev-only utility composable `useEffectCensus.ts`:

```ts
// dev-only
import { getCurrentScope, onScopeDispose } from "vue";

export function useEffectCensus(label: string) {
    if (!import.meta.env.DEV) return;
    const scope = getCurrentScope();
    const before = (scope as any)?.effects?.length ?? 0;
    onScopeDispose(() => {
        const after = (scope as any)?.effects?.length ?? 0;
        if (after > before) {
            console.warn(`[effect-census] ${label}: leaked ${after - before} effects`);
        }
    });
}
```

Place `useEffectCensus("ColorPicker")` etc. inside `<script setup>` of major panes. On view switch, if a pane's effect count grows monotonically, you have a leak.

(Note: `(scope as any).effects` is a Vue-3.x internal — version-pin the probe.)

### 7.3 Primitive (c) — `shallowReactive`-vs-`reactive` classifier

A static-analysis ESLint rule (or a one-shot ts-morph script) that walks every `reactive()` call site and asserts:

- If the argument's TypeScript type contains `Color` or `ValueUnit` recursively → flag for `shallowReactive` migration.
- If the argument is `Record<string, primitive>` or `{ ...primitives }` → leave alone.

Implement once; run in pre-commit or CI. This is forward-looking — there are zero violations today (§1.4), but the rule prevents future regressions when contributors add new `reactive()` containers.

### 7.4 Primitive (d) — microbenchmark for L8

`bench/color-channel-access.bench.ts` (pseudo):

```ts
import { bench, describe } from "vitest";
import { RGBColor } from "@src/units/color";

describe("color channel access", () => {
    const c = new RGBColor(); c.r = 0.5; c.g = 0.5; c.b = 0.5;
    bench("read channel × 1M", () => {
        let sum = 0;
        for (let i = 0; i < 1_000_000; i++) sum += c.r + c.g + c.b;
    });
    bench("entries() × 100k", () => {
        for (let i = 0; i < 100_000; i++) c.entries();
    });
});
```

Run pre- and post-L8 to measure the actual delta. **This is the measurement evidence the brief requires** before claiming "trap cost vs Map cost" in any commit message.

### 7.5 Verdict — primitives ready to land

| Primitive | Status | Effort |
|-----------|--------|--------|
| (a) Playwright reactivity-smoke spec | ready to land in D.W5 | ~40 lines |
| (b) `useEffectCensus` dev probe | ready, low priority | ~15 lines |
| (c) static `reactive()` classifier | proactive, optional | ~80 lines (ts-morph script) |
| (d) L8 microbenchmark | required as L8 acceptance gate | ~30 lines |

---

## Summary (8 lines)

1. **Reactivity-graph barriers**: 13 cataloged (B1–B13); all on hot paths are either rAF-coalesced, debounced-by-design, or echo-suppressed. The two-tier `shallowRef<ColorModel>` cache is load-bearing for `defineModel`'s async round-trip — keep it.
2. **`stableHue` + low-chroma guard (`s*v > 0.01`)**: present at 3 update sites (`useColorModel` ext-watch, `useColorParsing.parseAndSetColor`, `useColorModel.updateColorComponent`). The `atan2(0,0)=0` regression is fenced.
3. **L8 × Vue interaction**: the hypothetical trap-cost regression does NOT apply — zero `Color`/`ValueUnit` instances live inside `reactive()` anywhere in the demo (4 `reactive()` sites all hold pure primitives). The flatten is strictly cheaper on the hot path; recommend doc-mark Color as `markRaw`-safe + add an `isReactive(color) === false` regression test.
4. **Non-instant sites**: 0 unintentional; 1 needs binding-verification (`parseAndSetColorDebounced` at 2000ms — confirm it's commit-on-blur, not live-input).
5. **`_lerp` bolt-on**: reactivity-benign. `InterpolatedVar` instances never inside `reactive()`; the `_lerp` mutation is invariant and pre-exposure.
6. **REACTIVITY-A cross-check**: assertions inside Color/ValueUnit setters are safe IF gated `import.meta.env.DEV` and non-throwing. Color lives outside `reactive()`, so no Proxy-trap pathology.
7. **Hardening primitives proposed**: (a) Playwright reactivity-smoke spec for D.W5; (b) `useEffectCensus` dev probe; (c) static `reactive()` classifier; (d) L8 microbenchmark as acceptance gate.
8. **Conservative caveat**: instant-reactivity claims in §1.3, §3.2, §4 are topology-derived, not yet measured. Primitive (a) is the smallest measurement that converts the topology argument into evidence; recommend landing it before any "verified instant" claim in tranche-D release notes.
