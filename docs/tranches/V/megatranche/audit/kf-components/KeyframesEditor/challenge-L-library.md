claude-opus-5[1m]

# CHALLENGE — `KeyframesEditor.vue` · axis L (LIBRARY)

**Target** `keyframes.js/demo/components/instrument/keyframes/KeyframesEditor.vue` (284 lines)
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every row below carries a falsifier; four candidate
defects were **KILLED by their own falsifier** and are recorded in §5 so the next lane does not re-file them.
**Method** whole-file read + the complete import closure (16 files, read-only), the engine's own `templateFrames`/
`KeyframeSelector`/`play`-lifecycle source as evidence, and **three empirical probes** run against the installed
`node_modules` (§4). No browser tooling; livable-only claims are marked `UNPROVEN-NEEDS-LIVE`.

**Tally** — 21 defects (2 BLOCKER · 7 MAJOR · 9 MINOR · 3 INFO) · 5 superlatives.

## Import closure actually read

`composables/useKeyframesEditor.ts` · `useKeyframesState.ts` · `useKeyframesParsing.ts` · `useKeyframeOps.ts` ·
`useKeyframeBrushApply.ts` · `useApplyCSS.ts` · `useHighlightCSS.ts` · `useToolbarKeyboard.ts` ·
`components/KeyframeCardList.vue` · `components/KeyframesAddDialog.vue` · `KeyframeCard.vue` ·
`utils/contenteditable.ts` · `demo/components/CopyButton.vue` · `demo/kf-engine.ts` ·
`demo/utils/keyframeSelector.ts` · `demo/utils/formatEditorCSS.ts`.
Engine evidence: `src/animation/compile/frame-compiler.ts` · `compile/selector.ts` · `engine/animation.ts` ·
`engine/css/css-animation.ts` · `engine/play-lifecycle.ts` · `physics/playback.ts` · `load-engine.ts` ·
`animation/index.ts` · `node_modules/@mkbabb/value.js/dist/subpaths/css.{d.ts,js}`.

---

## §1 — BLOCKERS

### L-B1 · BLOCKER · The offsets Slider writes into a **frozen** `KeyframeSelector` — first thumb move throws, the control is inert

`KeyframesEditor.vue:36–52`, the fault at **:43**

```js
@update:model-value="(starts) => {
    animation.templateFrames.forEach((frame, i) => {
        frame.start.value = starts![i];        // ← :43
    });
    updateAllStringsAndAnimation();
}"
```

`frame.start` is a `KeyframeSelector` **produced and deep-frozen by value.js**, stored verbatim by the engine:

- `frame-compiler.ts:146` — `const parsedStart = typeof start === "string" ? parseKeyframeSelector(start) : start;`
  then `:153 start: parsedStart` → `:164 this.templateFrames.push(...)`. The selector object is stored **by
  reference**, never copied.
- `compile/selector.ts:24–25` — `parseKeyframeSelector` returns `result.value` from value.js **unchanged**.
- `value.js/dist/subpaths/css.js:153–160` — the ok-result constructor is `b = (e) => Object.freeze({ok:!0, value: v(e), …})`
  where `v` is a **recursive deep freeze** (`for (let t of Object.values(e)) v(t); return Object.freeze(e)`).
- The seed path reaches it: `css-animation.ts:234` calls `this.addFrame(percent, …)` where `percent` is a **string**
  key of `resolveKeyframes(...).keyframes: Map<string, …>` (`compile/adapter.ts:95`) → `parseKeyframeSelector(percent)`
  → frozen. `useSpringKeyframesEditor.ts:57–63` builds `springEditAnim` via `fromString(buildSpringKeyframesCSS())`,
  so **every stop of the only mounted instance has a frozen `start`**.

**Probe P1 (§4)** — `parseKeyframeSelector('50%').value` is `Object.isFrozen === true`, and assigning `.value`
throws `TypeError: Cannot assign to read only property 'value' of object '#<Object>'`.

SFC render functions are ES modules → **always strict mode**, so the write throws rather than silently no-opping.
The throw lands on `forEach` iteration `i = 0`, so the loop aborts, **no** frame is updated, and
`updateAllStringsAndAnimation()` on `:45` never runs. The editor's primary transport affordance is dead on first
touch.

Corroboration that this is a **contract violation, not a style preference**: the engine itself never mutates a
selector in place — `css-animation.ts:88` (`bindTimeline`) does `frame.start = { kind: "percent", value: fraction }`,
i.e. it **replaces** the selector. The same component's *other* offset writer does the same correct thing
(`KeyframesEditor.vue:206–209`). Only `:43` mutates.

**Falsifier** — the claim dies if `templateFrames[0].start` is *not* frozen at drag time. Two ways that could
happen: (a) a future value.js drops the deep freeze; (b) the user has already Input-edited **every** stop, since
`onUpdateStart:206` replaces `start` with a **mutable literal**. Kill it by asserting
`Object.isFrozen(anim.templateFrames[0].start) === false` on a freshly seeded editor, or by dragging a thumb on a
freshly loaded `/spring` and observing offsets change with no console `TypeError`.

**Compounding (same site, survives the freeze fix)** — the units are inverted. `:38` feeds the Slider
`frame.start.value`, which is a **fraction in [0,1]** (`demo/utils/keyframeSelector.ts:7` — `${selector.value * 100}%`),
against `:48–50 min=-10 max=110` (a **percent** domain). The seeded stops `0/25/50/75/100 %` become
`[0, 0.25, 0.5, 0.75, 1]`, i.e. all five thumbs land inside `8.3 %–9.2 %` of the track — a collapsed cluster. And
`:43` writes the raw slider integer back into a fraction field, so a successful drag to `50` would mean `5000 %`.
Fixing the freeze without fixing the unit turns an inert control into a 100× destructive one. *(The numeric collapse
is proven from the seed; the exact pixel rendering is `UNPROVEN-NEEDS-LIVE` for SS-13.)*

### L-B2 · BLOCKER · Every per-stop offset field renders `[object Object]`

`components/KeyframeCardList.vue:11` → `KeyframeCard.vue:5` and `:37`

```js
:frame-start="frames[i].start.toString()"        // KeyframeCardList.vue:11
:model-value="frameStart"                        // KeyframeCard.vue:5   (the offset Input)
>s {{ frameStart }}</Label                       // KeyframeCard.vue:37  (the ghost label)
```

`KeyframeSelector` is a bare frozen object literal —
`Readonly<{kind:"percent"; value:number}> | Readonly<{kind:"named"; name; offset?}>`
(`value.js/dist/subpaths/css.d.ts:210–216`) — with `Object.prototype` as its prototype and **no** `toString`.
Nothing in either repo adds one (grepped). So `.toString()` is `Object.prototype.toString`.

**Probe P1 (§4)** — `String(parseKeyframeSelector('50%').value) === "[object Object]"`.

This is not confined to the frozen case: `onUpdateStart:206–209` writes a hand-rolled `{kind:"percent", value}`
literal, which has no `toString` either. Both the seeded and the edited state render garbage.

The repo already ships the correct renderer and does not use it here: `demo/utils/keyframeSelector.ts:7 selectorText()`
— a module the editor's own `useKeyframeOps.ts:9` already imports. The engine's serializers use their own twin
(`compile/emit/format.ts:20`). The editor is the only consumer of `KeyframeCardList`, so it owns this prop contract.

Second-order: the garbage is **round-tripped**. Typing into that Input emits `updateStart` with the string
`"[object Object]"`, which `onUpdateStart:186` hands to `parseCssScalar` → `!ok` → a toast reading
`css_syntax at 0-15: expected …`. The error posture is correct; the input it is fed is not.

**Falsifier** — dies if `frames[i].start` is ever a string/number (it is not: `TemplateAnimationFrame.start:
KeyframeSelector` at `src/animation/constants/types.ts:66`, and `addFrame` normalizes every shape), or if a
`toString` is added to the value.js type. Kill it by rendering one card and reading the Input's value.

---

## §2 — MAJORS

### L-M1 · MAJOR · The "structural projector" watch **never fires** — and warns once per frame at setup

`composables/useKeyframesParsing.ts:96–103`, with a 10-line rationale at `:86–95`

```js
watch(animation.templateFrames, async () => { await nextTick(); debouncedUpdateAllStrings(); }, { flush: "post" });
```

`animation.templateFrames` is a **plain array** (`engine/animation.ts:208` → `compilerFor(this).templateFrames`, a
`TemplateAnimationFrame<V>[] = []` field at `frame-compiler.ts:84`) of **plain objects**, on a `markRaw` animation
(`useSpringKeyframesEditor.ts:57`). Vue treats an array source as a **multi-source list**, mapping each *element*
(`@vue/reactivity/dist/reactivity.cjs.js:1843–1856`): not a ref, not reactive, not a function →
`warnInvalidSource(s)` and `undefined`. The source array is also captured **once**, so length changes are outside
the getter by construction.

**Probe P2 (§4)** — `fired = 0` after both a `push` and an element mutation; two `[Vue warn]: Invalid watch source`
lines at registration.

So the comment's central claim — *"this watch fires on STRUCTURAL changes (a frame added/removed — the array
reference's length)"* — is **false**. The honest data-flow the comment congratulates itself on is a **single**
projector (the explicit calls), not two.

Live consequence, and this is the part that is not merely dead code: `SpringPhysicsFacet.vue:105` wires a
**"re-sample"** button to `demo.seedKeyframes()`, which at `useSpringKeyframesEditor.ts:73–76` does
`springEditAnim.fromString(...)` + `.parse()` — a wholesale structural replacement of every stop — and calls
**nothing** on the editor. The editor's only other reprojection triggers are
`watch(() => kfControls.selectedKeyframesControl)` (`useKeyframesParsing.ts:79`) and the mutation-site calls. So
after "re-sample" the card list keeps rendering the pre-re-sample CSS while the animation plays the new curve.
The dead watch is exactly the mechanism that was supposed to cover this.

**Falsifier** — dies if any other path reprojects after `seedKeyframes()`. Grep gives 2 callers
(`SpringPhysicsFacet.vue:105`, `useSpringDemo.ts:159` re-export); neither touches `updateAllStrings`. Kill it by
clicking re-sample and observing the card text change.

### L-M2 · MAJOR · Highlighting is **one-shot per element** — both `highlightAll()` call sites are no-ops after first paint

`composables/useHighlightCSS.ts:116–126` · consumed at `KeyframesEditor.vue:229` and `:275–277`

```js
const highlight = (el) => {
    if (!el || el.getAttribute("highlighted")) return;      // :117
    void bootHighlighter().then(({ hljs }) => {
        if (el.getAttribute("highlighted")) return;          // :121
        el.innerHTML = h.value;
        el.setAttribute("highlighted", "true");              // :124
    });
};
```

The `highlighted` marker is set once and **never cleared** — grep across all of `demo/` finds zero
`removeAttribute("highlighted")` (the only four occurrences are the four lines inside this composable). So:

- `onKeyDown:229` calls `highlightAll()` on **every keystroke** → after the first pass, every owned `<pre>` is
  short-circuited at `:117`. Pure overhead.
- `watch(cssKeyframesString, highlightAll)` at `:275–277` — the watcher whose whole purpose is
  *"Re-highlight the card list whenever the serialized keyframes change"* — is likewise a no-op from the second
  fire onward.
- And the content **does** change underneath: `KeyframeCard.vue:50` renders `<code>{{ formattedCSS }}</code>`, so
  Vue patches the text 1 s after typing stops (the debounced `updateAllStrings`), blowing away the `innerHTML`
  `highlight()` wrote — while the stale marker guarantees it is never re-applied. Highlighting is lost
  permanently on the first content change.

**Falsifier** — dies if some path clears the marker, or if Vue's patch preserves the injected spans. Kill it by
typing in a card, waiting 1 s, and observing the `<pre>` still carries `hljs` spans.

### L-M3 · MAJOR · `useApplyCSS.clear()` is never wired — apply-CSS leaves the animation **permanently paused** after unmount

`useKeyframeBrushApply.ts:29–45` · `useApplyCSS.ts:54–66` · `useHighlightCSS.ts:58–61`

`useApplyCSS` publishes exactly the revert path this needs — `clear()` at `:54`, which restores
`animation.paused = prevPaused.value`, clears the `<style>`, and strips the class. `useKeyframeBrushApply:29`
destructures **only** `{ isApplied, toggle }`; `clear` is dropped on the floor. The composable's `onUnmounted`
(`:43`) tears down the **brush** animation and nothing else.

Meanwhile `useHighlightCSS`'s own `onUnmounted` (`:58–61`) **does** remove the injected `<style>`. So unmounting
with apply-CSS ON leaves:

1. `animation.paused === animation.started` — stuck `true` (`useApplyCSS.ts:45`), and
2. every target carrying the `keyframes-style-<uuid>` class (`:47–49`) with **no rules behind it**.

The animation outlives the component: `springEditAnim` is `markRaw`'d and owned by the scene composable
(`useSpringKeyframesEditor.ts:57`), not by the editor. So navigating away from `/spring` with the brush engaged
and back leaves the sweep permanently frozen with no affordance to un-freeze it (the fresh editor's `isApplied`
starts `false`, so `toggle()` re-enters the *apply* arm).

**Falsifier** — dies if the scene disposes `springEditAnim` on the same unmount tick. `useSpringDemo.ts` holds it
across the scene's life. Kill it by toggling apply, navigating away and back, and seeing the sweep still animate.

### L-M4 · MAJOR · A fresh compiled `CSSKeyframesAnimation` per **keystroke**, un-debounced and un-cancelled

`KeyframesEditor.vue:213–216` and `:254–258`

```js
const onUpdateCSS = ({ value, index }) => {
    updateAnimationFromKeyframeString(value, index);        // debounced 1000 ms
    animateProgressBar(progressBarKeyframesEl.value!);      // NOT debounced   ← :215
};
const animateProgressBar = (el) => {
    new CSSKeyframesAnimation({ duration: 1000 }, el).fromVars([{width:"0%"},{width:"100%"}]).play();
};
```

`onUpdateCSS` is bound to `@update-c-s-s`, which originates at `KeyframeCard.vue:43` — a raw contenteditable
`@input`, i.e. **once per character**. The mutation half is correctly debounced; the animation half is not. A
20-character burst constructs 20 animations, each running `fromVars` → `parse()` → its own RAF chain
(`play-lifecycle.ts:268–275` → `physics/playback.ts:113`), all writing `width` to the **same** element with no
cancellation of the prior writers. Nothing in `play-lifecycle.ts` cancels a sibling animation on a shared target.

Accuracy note (this is a compile-storm and a competing-writer bug, **not** an unbounded leak): each chain does
self-terminate — `renderFrame` returns `false` at completion → `reschedule(false)` → `_cleanup()`
(`physics/playback.ts:116–122`).

The correct shape exists 130 lines away, in the editor's own child: `KeyframesAddDialog.vue:125–131` fires the same
helper **once per submit** and null-guards its ref.

**Falsifier** — dies if contenteditable `input` events coalesce (they do not) or if the engine deduped animations
per target (it does not). Kill it by counting `RAFPlayback` instances during a typing burst.

### L-M5 · MAJOR · The whole `.vue` surface is **type-unchecked** — L-B1 and L-B2 are both compile errors that CI cannot see

`keyframes.js/package.json` (`check`) · `tsconfig.json:47`

```
check = tsc --noEmit && tsc --noEmit -p tsconfig.test.json
include: ["src/", "demo/"]
```

It is plain `tsc`, **not `vue-tsc`** — grep across `package.json`, `.github/`, and `scripts/` finds zero `vue-tsc`.
`tsc` cannot admit an SFC into its program, so every `<template>` expression and every `<script setup>` body in the
demo has **zero** static coverage. That is precisely where this component's two blockers live:

- `KeyframesEditor.vue:43` `frame.start.value = starts![i]` → **TS2540** *Cannot assign to 'value' because it is a
  read-only property* (`KeyframeSelector` is `Readonly<…>`).
- `KeyframesEditor.vue:38` `frame.start.value` (read) → **TS2339** *Property 'value' does not exist on type
  `Readonly<{kind:"named"; …}>`* — the union is never narrowed on `kind`.

Both would be hard failures under `vue-tsc`. The error posture is inverted: the riskiest code in the component
(template expressions that mutate engine-owned frozen data) is the only code with no type gate.

**Falsifier** — dies if a separate CI step runs `vue-tsc`, or if these two expressions type-check. Kill it by
running `npx vue-tsc --noEmit` and finding zero diagnostics at `KeyframesEditor.vue:38,43`.

### L-M6 · MAJOR · Engine-consumption idiom violated: 5 deep `@src/animation/**` reaches inside the editor's own closure

`useKeyframeOps.ts:1` `reverseCSSTime` ← `@src/animation/compile/emit/css-text`
`useKeyframeOps.ts:4`, `useKeyframesParsing.ts:1` `debounce` ← `@src/animation/**internal**/helpers`
`useKeyframesState.ts:1` `convertPixelsToCh` ← `@src/animation/resolve/browser`
`utils/parseAnimationCSS.ts:7` `serializeTimingFunction` ← `@src/animation/compile/emit/css-text`
*(plus 2 more in the sibling `CSSCodeEditor.vue:40,42` — 7 in the directory)*

These same files' headers cite the **ED-3 dogfood inversion** — `demo/kf-engine.ts:4–10`: *"The demo consumes the
PUBLISHED kf barrel (`@mkbabb/keyframes.js`), not the deep `@src/animation/*` source paths."* Verified against both
published surfaces: none of `debounce`, `reverseCSSTime`, `convertPixelsToCh` appears in
`src/animation/index.ts` (the light barrel) **or** in the `AnimationEngine` interface (`src/animation/load-engine.ts`,
which does publish `CSSKeyframesToString(s)`, `formatCSSKeyframeString`, `yieldToMain`). One of them is imported
from a directory literally named `internal/`.

So the editor's composables are consuming library internals no `npm i` consumer can reach — the exact inverse of
the dogfood the comments claim. `debounce` in particular is a 3-line utility the demo could own outright.

**Falsifier** — dies if any of the three is exported from the barrel or the engine surface. Grepped both: 0 hits.
Kill it by finding `export { debounce }` on a published entry point.

### L-M7 · MAJOR · `@mkbabb/glass-ui` phantom dependency — bites this component at four import sites (**folds lane-frontend F-1**)

`KeyframesEditor.vue:109` — `import { Card, CardContent, Slider } from "@mkbabb/glass-ui"`
`composables/useHighlightCSS.ts:2` — `import { useGlobalDark } from "@mkbabb/glass-ui/dark"`
`KeyframeCard.vue:57–58` — `Label` + `@mkbabb/glass-ui/forms`
`components/KeyframesAddDialog.vue:60–69` — 8 symbols

Verified against the tree, and it **agrees with F-1** (`formation/keyframes/lane-frontend.md:15,54`): `@mkbabb/glass-ui`
is absent from `dependencies`, `devDependencies`, `peerDependencies` and `optionalDependencies`, and
`package-lock.json`'s `packages` map has **0** entries matching `glass-ui` — yet `node_modules/@mkbabb/glass-ui`
is installed. The component cannot be built from a clean `npm ci`.

Sharper than the census row: `useHighlightCSS.ts:2` is a **subpath** import (`/dark`), so this component depends not
just on an undeclared package but on an **unpinned exports map**. Three of the four sites are subpath imports
(`/dark`, `/forms`). Any glass-ui version whose exports map moves `dark` breaks the editor with a resolution error,
and there is no lock entry to pin against. Lane-frontend's ordering (`:612` — "F-1 first") is confirmed correct and
should be read as blocking *this* component's remediation, not just the S-1..S-8 swaps.

**Falsifier** — dies if an npm workspace, `overrides`, or `.npmrc` declares it. Kill it with
`npm ls @mkbabb/glass-ui` returning a declared (non-`extraneous`) tree, or `rm -rf node_modules && npm ci &&
npx vite build --mode gh-pages` succeeding.

---

## §3 — MINORS and INFO

### L-m1 · MINOR · `sliderUpdate` is declared, never emitted, **and** its payload contradicts the app-wide contract

`KeyframesEditor.vue:142–145` declares `(e: "sliderUpdate", val: { t: number; animationId: number })`. Grep finds
**zero** `emit("sliderUpdate"` in this component. Every other declaration of the same event in the demo carries
`{ t: number; animation: KeyframesAnimation<any> }` — `ControlsPaneWrapper.vue:306`, `ChannelControls.vue:354`,
`ChannelOptions.vue:514`, `PlaybackRibbon.vue:129`, `AnimationControlsGroup.vue:244`,
`useAnimationGroupPlayback.ts:133`. So the dead declaration is also the **one divergent** shape (an invented
`animationId` field that exists nowhere else). Wiring it up as written would not typecheck against any consumer.

Adjacent: `keyframesUpdate` *is* emitted (via `useKeyframeOps.ts:83`), but the sole consumer
`SpringPhysicsFacet.vue:119` binds **no** listeners at all — so the whole emit surface currently goes nowhere.

**Falsifier** — a second consumer that listens. Grep gives exactly one `<KeyframesEditor` callsite.

### L-m2 · MINOR · `cardInstances` is never truncated — `removeKeyframe`'s neighbour pick reads a dead slot

`components/KeyframeCardList.vue:64–72` · consumed at `KeyframesEditor.vue:237–240`

`setCardRef(i, el)` only ever **assigns** `cardInstances.value[i]`; nothing anywhere shrinks the array (no
`.length =`, no `splice`, no re-init on `frameStrings` change). So after a removal takes the list from *N* to
*N−1*, `cardRefs.length` remains *N*. `removeKeyframe` then reads that stale length:

```js
const cards = cardList.value?.cardRefs ?? [];
const el2 = frameIx < cards.length - 1 ? cards[frameIx + 1] : cards[frameIx - 1];   // :239–240
```

For `frameIx = N-2` (the last **live** card after one prior removal) the test is `N-2 < N-1` → true → `el2` is the
slot of the already-removed card. `presets.jumpUp().setTargets(el2)` then binds a detached element or `null`
(`engine/animation.ts:465` assigns unconditionally; `resolve/element-resolve.ts:171–172` null-guards the env, so it
degrades to a silent no-op rather than a throw) — the neighbour pop animation plays on nothing, and the true
neighbour never animates. `getPreElements()` (`:76–79`) likewise keeps handing the highlighter a detached `<pre>`.

The array-length claim is **proven from source** (no truncation exists). Which specific index ends up `null` after
Vue's keyed patch/unmount interleaving is `UNPROVEN-NEEDS-LIVE`.
**Falsifier** — assert `cardList.cardRefs.length === animation.templateFrames.length` after one removal.

### L-m3 · MINOR · `tabsListEl` is never bound, so the responsive print-width mechanism is entirely dead

`useKeyframesState.ts:27,31–39,54` · `useKeyframesEditor.ts:32`

`tabsListEl` is created, returned from the state composable, re-exported by the barrel — and **never assigned by
any consumer**: grep over all of `demo/**/*.vue` gives **0** hits for `tabsListEl`. Therefore
`getFormatWidth()`'s default `el ??= tabsListEl.value!` is always `null`, the guard at `:34` returns `undefined`, and
every `formatEditorCSS(css, undefined)` call falls back to `printWidth = 80`
(`demo/utils/formatEditorCSS.ts:4`). The whole `convertPixelsToCh` path — the reason for the L-M6 deep `@src`
import at `useKeyframesState.ts:1` — never executes. Two dead things propping each other up.
The `!` at `:32` is also a lie about a value that is *always* null.
**Falsifier** — find any `ref="tabsListEl"` / `state.tabsListEl.value =` assignment.

### L-m4 · MINOR · `onUpdateStart` hand-rolls a helper the tree already exports

`KeyframesEditor.vue:206–209` writes `{ kind: "percent", value: scalar.value / 100 }` inline. That is verbatim
`percentSelector(percent)` from `demo/utils/keyframeSelector.ts:26–29` — a module the editor's own
`useKeyframeOps.ts:9` already imports. Colocation defect: the canonical constructor exists, one directory up, and
the component duplicates it. Same file holds `selectorText`, the fix for L-B2.
**Falsifier** — the two constructions differ semantically. They do not.

### L-m5 · MINOR · The `framed` branch duplicates the entire child invocation, including a repeated `ref` name

`KeyframesEditor.vue:10–22` vs `:23–33` — the 8-line `<KeyframeCardList>` block (5 bindings + 4 handlers +
`ref="cardList"`) appears **twice**, byte-identical, differing only in the wrapper. Two template nodes claim the
same `ref="cardList"`; safe today only because `v-if`/`v-else` are mutually exclusive. Honest caveat: this is not a
one-liner — `Card` + `CardContent` is a two-level wrapper, so a `<component :is>` collapse needs a slot shape, not
a swap. Filing it as duplication, not as a mechanical fix.
**Falsifier** — the two blocks differ. Diff them: they do not.

### L-m6 · MINOR · `useKeyframesEditor` is a self-declared backwards-compat barrel with 4 dead members

`useKeyframesEditor.ts:12–13` states the intent outright: *"The public return shape is unchanged from the pre-split
composable so the `KeyframesEditor.vue` callsite keeps resolving."* That is a compat shim preserved for a callsite
that could simply have been migrated — the standing `feedback_no_backwards_compat` law
(*"Never add legacy-compat shims; migrate the consumer to the new API at the root"*), the same law
lane-frontend invokes at `lane-frontend.md:553`.

It re-exports 20 members across two composables. `KeyframesEditor.vue:152–164` consumes 11;
`KeyframesStringControls.vue:62–68` consumes 5; and **4 have zero `.vue` consumers anywhere**: `tabsListEl`,
`animationUUID`, `debouncedUpdateAllStrings`, `updateAnimationFromKeyframesString` (0 hits each across
`demo/**/*.vue`). The barrel widens the surface it exists to preserve.
**Falsifier** — a consumer outside `.vue` files. The only readers are the composables' own internals, which reach
`state.*`/`ops.*` directly and never need the barrel.

### L-m7 · MINOR · A stringly-typed template-ref reach across the composable boundary, inconsistent with its own interface

`useKeyframeBrushApply.ts:8–17` takes `templateRef: string` and does `useTemplateRef<HTMLElement>(options.templateRef)`
— resolving against the **caller's** `instance.refs` by string name (`KeyframesEditor.vue:264` passes `"brush"`).
The same interface already models the *correct* contract for its other dependencies: `getCSSString: () => string`,
`getAnimation: () => …`. A `getTarget: () => HTMLElement | null` would make the coupling checkable; the string
cannot be, and renaming the template ref breaks it silently. (This is a contract critique only — the resolution
itself works; see §5 K-3.)
**Falsifier** — a compile-time mechanism that ties the string to the template. There is none, and per L-M5 the
template is not checked at all.

### L-m8 · MINOR · `kfEngine()` at **module** scope turns a warm failure into an unrecoverable chunk-eval throw

`useKeyframeBrushApply.ts:6` — `const { CSSKeyframesAnimation } = kfEngine();` at top level, where `kfEngine()`
**throws** if the warm has not resolved (`demo/kf-engine.ts:50–55`). `demo/app/main.ts:47` does
`Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(() => app.mount())` — it **swallows** a
warm rejection and mounts anyway. The spring scene is lazy (`demo/app/scene/scenes.ts:175`), so today the module
evaluates post-warm and this is fine; but on a warm failure the route's chunk throws during **module evaluation**,
failing the entire scene (not just the editor) with a message that does not name the engine.
Contrast the component's own read at `KeyframesEditor.vue:130`, which is at **setup** scope — see §6 S-2.
**Falsifier** — `loadAnimationEngine()` cannot reject. Kill it by blocking the engine chunk and loading `/spring`.

### L-m9 · MINOR · Two writers of the `highlighted` marker disagree on truthiness

`useHighlightCSS.ts:110` (`setHighlightingString`) sets `setAttribute("highlighted", "")` — `getAttribute` then
returns `""`, which is **falsy**, so the guards at `:117` and `:121` do **not** skip it. `:124` (`highlight`) sets
`"true"`, which does. Same attribute, same composable, opposite semantics; `setHighlightingString` is the path
`KeyframesAddDialog.vue:103` uses. One of the two is wrong and there is no way to tell which from the code.
**Falsifier** — a documented distinction between the two markers. None exists.

### L-i1 · INFO · Unguarded `!` where the sibling implementation guards

`KeyframesEditor.vue:215` — `animateProgressBar(progressBarKeyframesEl.value!)`. The twin at
`KeyframesAddDialog.vue:126` does `if (!progressBarEl.value) return;`. **Latent, not live**: the element at
`:99–101` is unconditionally rendered and `onUpdateCSS` only fires from a post-mount `input` event, so the ref is
never null in practice. Filed as an inconsistency, not a bug.
**Falsifier** — already stated: the ref is unconditionally rendered.

### L-i2 · INFO · The `Ï` dead-key branch guards a feature this surface does not have

`KeyframesEditor.vue:219–222` swallows the macOS `Shift+Alt+F` dead key and returns. In the two sibling surfaces
the same key **does** something: `KeyframesStringControls.vue:91–95` calls `formatEditor()`, and
`KeyframesAddDialog.vue:112–115` + `:139–147` route it through `useMagicKeys` to `reformat()`. In the card list it
is `preventDefault`ed and dropped — a copied guard with no action behind it. Either wire per-card reformat or drop
the branch.
**Falsifier** — a format action reachable from the card list. Grep finds none.

### L-i3 · INFO · Contenteditable re-render vs. caret — `UNPROVEN-NEEDS-LIVE`

`KeyframeCard.vue:50` renders `<code>{{ formattedCSS }}</code>` inside a `contenteditable` `<pre>` whose text is
also the edit source. `templateFrameStrings` reprojects ~1 s after typing stops (`debouncedUpdateAllStrings`,
`useKeyframesParsing.ts:62`), so Vue patches the text node under the user's caret. This is the canonical
controlled-contenteditable caret-reset shape, and L-M2 shows the markup is rewritten by the highlighter too — but
whether the caret actually jumps depends on runtime patch granularity. **Flagged for SS-13, not claimed.**

**Module size (Goldilocks) — no finding.** 284 lines / 104 template + 180 script, with the parse/state/ops mass
correctly carved into three composables. This is the right size band; there is no god-module defect here.

---

## §4 — Empirical probes (reproducible, read-only)

**P1** — `node --input-type=module -e "import {parseKeyframeSelector} from './node_modules/@mkbabb/value.js/dist/subpaths/css.js'; …"`
```
ok true {"kind":"percent","value":0.5}
frozen(value): true
toString(): [object Object]
ASSIGN THREW: TypeError Cannot assign to read only property 'value' of object '#<Object>'
from -> {"kind":"percent","value":0}
```
→ establishes **L-B1** and **L-B2**.

**P2** — `watch(markRaw({templateFrames:[{id:0,start:{…}},{id:1,start:{…}}]}).templateFrames, cb, {flush:"post"})`
then `push` + element mutation + 2 × `nextTick`:
```
[Vue warn]: Invalid watch source:  { id: 0, start: { kind: 'percent', value: 0 } } …
[Vue warn]: Invalid watch source:  { id: 1, start: { kind: 'percent', value: 1 } } …
callback fired count = 0
```
→ establishes **L-M1**. (vue 3.5.35, the installed version.)

**P3** — dependency state: `package.json` + `package-lock.json` `packages` map contain **0** `glass-ui` entries;
`node_modules/@mkbabb/` contains `glass-ui`, `parse-that`, `value.js`.
→ establishes **L-M7**, confirms lane-frontend **F-1**.

---

## §5 — Candidate defects **KILLED** by their own falsifier (do not re-file)

**K-1 · `parsed.diagnostics[0]` unchecked at `KeyframesEditor.vue:189–191`** — looked like an
undefined-deref inside an error handler. **Killed:** `ParseResult<T>`'s failure arm types `diagnostics` as
`readonly [ParseIssue, ...ParseIssue[]]` — a **non-empty tuple** (`value.js/dist/subpaths/css.d.ts:241–249`) —
and `ParseIssue.expected` is a required `readonly string[]` (`:235`), so `.join(" or ")` cannot throw either.
The value.js contract makes the indexing sound. This is a **correct** consumption idiom.

**K-2 · `brushAnimation.pause()` on unmount leaks a RAF loop** (`useKeyframeBrushApply.ts:43`, an
`iterationCount: "infinite"` animation). **Killed:** `renderFrame` returns `false` when paused
(`play-lifecycle.ts:235–237`) → `reschedule(false)` → `_cleanup()` (`physics/playback.ts:116–122`), cancelling the
`requestAnimationFrame` handle. Pause genuinely tears the chain down. This is **correct** teardown — promoted to
superlative **S-3**.

**K-3 · `setTargets(brush.value!)` binds a component instance, not an element** (`useKeyframeBrushApply.ts:42`,
where `ref="brush"` sits on `<Paintbrush>`, a component). **Killed:** `@lucide/vue` icons are **functional**
components — `createLucideIcon` returns a bare `(props, ctx) => h(Icon, …)`
(`node_modules/@lucide/vue/dist/esm/createLucideIcon.mjs:11`), and Vue resolves a ref on a non-stateful component
vnode to `vnode.el`. `brush.value` is the real `<svg>`. The wiggle animates.

**K-4 · the shared `#highlightjs-theme` singleton is removed by whichever consumer unmounts first**
(`useHighlightCSS.ts:66,142–145`; two consumers — `KeyframesEditor.vue:176` and its own child
`KeyframesAddDialog.vue:92`). **Killed as a live defect:** the two are parent and child in one subtree, so Vue's
child-then-parent unmount order makes the second `remove()` a no-op on an already-detached node — net effect
identical to one removal. **Latent only** — a third concurrently-mounted `useCodeHighlight` consumer *outside* this
subtree would lose its theme, and the composable has no refcount. Grep confirms exactly 2 consumers today. Not
filed; noted so a future third consumer is caught. (The per-keystroke `document.head.querySelector` in
`ensureThemeStyle`, reached from every `highlightAll()`, is subsumed by L-M2.)

---

## §6 — Superlatives (L-18, running the other way)

**S-1 · The scoped-highlight ownership contract is genuinely exemplary.**
`KeyframesEditor.vue:176–178` — `useCodeHighlight(() => cardList.value?.getPreElements() ?? [])`. The editor hands
the highlighter **its own** elements, collected through a declared child-ref contract
(`KeyframeCard.vue:78–80 defineExpose({preEl})` → `KeyframeCardList.vue:76–81 getPreElements()`), with **zero**
`querySelectorAll`. `useHighlightCSS.ts:74–76` records what this replaced: *"never the whole document (D.W3.S1: the
global `document.querySelectorAll("pre")` was the bug)."* The lazy-getter shape means the scope tracks the live
card set without a subscription. This is the right way for a component to own a DOM effect.
*Falsifier:* a `querySelector` anywhere in the highlight path. There is none.

**S-2 · `kfEngine()` read at setup scope — the correct half of the warm contract.**
`KeyframesEditor.vue:130` destructures the heavy surface **inside** `<script setup>`, i.e. per instance at mount,
after `main.ts:47`'s warm. The comment at `:128–129` states the invariant it relies on and why it is synchronous.
This is exactly the discipline `useKeyframeBrushApply.ts:6` breaks (L-m8) — the component's own consumption is the
model, and the divergence is in a dependency.
*Falsifier:* a path that renders `KeyframesEditor` before the warm. The spring route is lazy
(`scenes.ts:175`), so there is none.

**S-3 · The brush animation is built once and genuinely torn down.**
`useKeyframeBrushApply.ts:18–27` constructs **one** long-lived `CSSKeyframesAnimation`, binds targets at
`onMounted` (`:42`), and pauses at `onUnmounted` (`:43`) — which, per **K-2**, really does cancel the RAF chain via
`renderFrame` → `_cleanup()`. Compare L-M4, where the same class is instantiated per keystroke. The right
lifecycle idiom exists in this component's own closure; it is simply not applied at `:254`.
*Falsifier:* `pause()` not cancelling the handle. Traced to `physics/playback.ts:121`.

**S-4 · Animate-then-commit ordering on removal, on the current API.**
`KeyframesEditor.vue:242–249` awaits `AnimationGroup.of(presets.warpLeft().setTargets(el1),
presets.jumpUp().setTargets(el2)).play()` **before** `removeKeyframeData(frameIx)` — the exit animation runs
against the still-mounted DOM, then the data mutates. And it uses the current composition API with its provenance
recorded (`:242–243`: *"`AnimationGroup.of(...)` replaces the excised `KeyframesAnimation.group(...)`"*), rather
than a shim — the `feedback_no_backwards_compat` law honoured at exactly the site where a shim would have been
easiest. (L-m2's stale-index bug is in the *ref bookkeeping*, not in this ordering.)
*Falsifier:* a shim re-introducing `KeyframesAnimation.group`. Grep finds none.

**S-5 · The offset-Input error posture is the best code in the file.**
`KeyframesEditor.vue:182–211` routes the user's text through value.js's own grammar (`parseCssScalar`), surfaces the
**typed diagnostic verbatim** (`${issue.code} at ${issue.start}-${issue.end}: expected ${issue.expected.join(" or ")}`),
keys the toast by a **stable per-index id** (`startDiagnosticId`, `:180`) so re-typing replaces rather than stacks,
explicitly `toast.dismiss`es on success (`:205`), separately validates the *unit* (`:197`), and then **replaces**
`frame.start` wholesale — the same idiom the engine itself uses at `css-animation.ts:88`. It is the exact write
`:43` should have made. Two writers of one field, 160 lines apart: one is the reference implementation, the other
is L-B1.
*Falsifier:* the replace-write being wrong. `bindTimeline` does the same thing.
