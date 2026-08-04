claude-opus-5[1m]

# CopyButton — CHALLENGE, axis C (CONSUMPTION)

**Target** `keyframes.js/demo/components/CopyButton.vue` (113 lines, unchanged since `git log -1` → Sun Jul 12 2026).
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components (S-1..S-8), value.js transitive exposure, props/emits contract, sibling seams.
**Method** read-only. Component + every transitive import read whole. Two executed probes against the INSTALLED `@mkbabb/value.js@4.0.0` and the BUILT `dist/engine/index.js` (evidence below; no product source touched, no browser). Livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Import closure read**: `@lucide/vue` (`createLucideIcon.mjs`, `Icon.mjs`, `icons/clipboard.mjs`) · `@mkbabb/keyframes.js` → (vite self-alias, `vite.config.ts:40-43`) `src/animation/index.ts` → `load-engine.ts` → `public.ts` → `engine/css/css-animation.ts`, `engine/animation.ts`, `engine/option-setters.ts`, `engine/options.ts`, `compile/easing/easing-option.ts`, `compile/easing/easing-registry.ts`, `compile/value-ast.ts`, `group/group.ts`, `constants/{types,defaults}.ts` · `@utils/clipboard` → `demo/utils/clipboard.ts` → `vue-sonner` · plus `demo/kf-engine.ts` + `demo/app/main.ts` (the warm seam) and all four call sites.

**Tally** 13 findings — 1 BLOCKER · 3 MAJOR · 6 MINOR · 3 INFO. 3 superlatives. 1 explicit contradiction of the hitherto corpus. 3 candidate claims killed by their own falsifiers (§5).

---

## 1 · BLOCKER

### C-1 [BLOCKER] · `timingFunction: "bounceInEase"` is not a name value.js 4.0.0 knows — the whole `onMounted` body dies at line 69, so the copy animation has never run at any mount site

**Provenance** `CopyButton.vue:42` (`timingFunction: "bounceInEase"`) → `:40` `options` → `:69` `new CSSKeyframesAnimation(options)`.

The chain, read end to end:

- `CSSKeyframesAnimation` ctor → `super(options, targets)` — `engine/css/css-animation.ts:57-64`
- `KeyframesAnimation` ctor → `this.setOptions({ ...defaultOptions, ...this._ctorOptions })` — `engine/animation.ts:196` (ctor options WIN the merge, `:192-196`)
- `setOptions` → `setters.applyOptions` — `engine/animation.ts:317-320`
- `applyOptions` → `applyTimingFunction` — `engine/option-setters.ts:137-139`, `:32-37`
- → `normalizeTimingFunction` → `resolveEasingOption("timingFunction", …)` — `engine/options.ts:41-47`
- → `resolveTimingFunction(input)` — `compile/easing/easing-option.ts:47`
- → `parseTimingFunction("bounceInEase")` FAILS (not a CSS keyword/function), registry lookup MISSES → `throw new TypeError` — `compile/easing/easing-registry.ts:124-136`, throw at `:135`
- → rethrown as `AnimationOptionError(… "UNKNOWN_TIMING_FN")` — `compile/easing/easing-option.ts:48-58`

The registry roster is `Object.keys(bezierPresets) + "ease-in-bounce" + DIRECT_NAMES` (`easing-registry.ts:20-34`). `bounceInEase` is in NONE of the three. The real name is **`easeInBounce`** (`DIRECT_NAMES[8]`, `easing-registry.ts:28`).

**Executed proof 1** — replica of `resolveTimingFunction` over the installed `@mkbabb/value.js@4.0.0`:

```
parseTimingFunction("bounceInEase") ok=false
bounceInEase => THROWS: Unknown timing function "bounceInEase".
easeInBounce => FROM_REGISTRY
registry has bounceInEase: false
easing("bounceInEase") -> {"code":"easing_name_unknown"}
easing("easeInBounce")  -> OK
```

**Executed proof 2** — the real class from the BUILT library (`keyframes.js/dist/engine/index.js`):

```
new CSSKeyframesAnimation({duration:200, timingFunction:"bounceInEase"})
  → THROWS: Invalid value for animation option "timingFunction": "bounceInEase"
    — unknown timing function … | code: UNKNOWN_TIMING_FN
new CSSKeyframesAnimation({duration:200, timingFunction:"easeInBounce"})
  → CONSTRUCTED OK
```

**Consequence** — the throw is at `:69`, the FIRST statement after the `await` at `:66-67`. Everything below is dead: `:82` (second animation), `:95` (`new AnimationGroup`), `:98-99` (`setTargets`), `:101` (`group.value = g`). `group` (`:49`) stays `null` for the lifetime of every instance, so `void group.value?.play()` (`:62`) is a permanent no-op. **The copy-feedback animation this component exists to render has never rendered.** The `?.` the author placed as a *startup* guard silently converts a permanent failure into a permanent nothing.

Second consequence: the rejection surfaces through Vue's `callWithAsyncErrorHandling` → `logError` → `console.error("Unhandled error during execution of mounted hook")` in dev AND prod. `demo/` declares no `app.config.errorHandler` and no `onErrorCaptured` anywhere (`grep -rn "errorHandler|onErrorCaptured" demo/` → empty), so nothing intercepts it.

**Blast radius** — 4 static mount sites, one of them per-keyframe (N instances):
`scenes/easing/EasingTarget.vue:35` · `scenes/spring/StartingStyleTarget.vue:59` · `components/instrument/keyframes/KeyframesEditor.vue:82` · `components/instrument/keyframes/KeyframeCard.vue:26`.

**It ships.** The string is in the built artifact: `grep -rlo bounceInEase dist/gh-pages/` → `assets/usePainterRegistry-BBbT13tI.js` (1 occurrence, build dated Jul 16, source unchanged since Jul 12).

**Root cause is transitive value.js exposure** (the R1 class, different organ). `src/animation/easing.ts:44` and `src/animation/waapi/eligibility.ts:169` BOTH still name `bounceInEase` in prose as an example value.js bespoke curve — the name was real once and value.js 4.0.0's registry no longer carries it. The library's own doc comments carry the same stale name as the demo. Nothing at the type layer caught the rename: see C-13.

**Falsifier** — run the demo at `#/easing` and observe the CopyButton's icon pulse on click, with a clean console. If the check icon animates, my claim is dead. Equivalently: show `resolveTimingFunction("bounceInEase")` returning a function against the pinned value.js — the two probes above are re-runnable and say otherwise. A third kill: demonstrate that `_ctorOptions` does NOT reach `applyTimingFunction` (it does — `engine/animation.ts:195-196` merges ctor-explicit over defaults, and the built-dist probe closes the question empirically).

**Tension I must name honestly**: `.github/workflows/ci.yml:77` runs `demo:correctness`, whose `live-session` battery carries an accumulated **error budget = 0** built as the COMPLEMENT of a named-benign allowlist (`scripts/lib/console-budget.mjs:24-30`, `scripts/observe/demo/live-session.mjs:16-18,106-113,378-379`) and DOES visit `#/easing` (`live-session.mjs:543-545`, leg `B4:cube→easing`) where `EasingTarget.vue:35` mounts a CopyButton unconditionally (no `v-if` — `EasingTarget.vue:11-40`). A Vue mounted-hook `console.error` is not in the benign set, so that gate must be RED on the current tree. Either it is (the megatranche is exactly the program that would surface it), or the roster has not been re-run since the value.js pin moved. **If someone produces a green `demo:correctness` run on this tree, C-1 needs re-examination before repair** — but the two executed probes constrain what such a run could mean: at best the hook is never reached, not that the name resolves.

**Fix** one token: `"bounceInEase"` → `"easeInBounce"` (`:42`). Then C-10 becomes visible for the first time.

---

## 2 · MAJOR

### C-2 [MAJOR] · `copyText` is consumed fire-and-forget and success is announced unconditionally — the lone divergent consumer of a util its siblings await inside try/catch

**Provenance** `CopyButton.vue:52` `copyText(text);` — no `await`, no `.catch`, return value discarded. `demo/utils/clipboard.ts:3-8`: `async`, awaits `navigator.clipboard.writeText`, offers an unused `successMessage` toast channel.

`:54-60` then sets `isCopied = true` and schedules the AT announcement **unconditionally**, on a promise nobody inspected. `writeText` rejects on `NotAllowedError` (document not focused, `clipboard-write` permission policy denied — e.g. the demo embedded in an iframe), and `navigator.clipboard` is `undefined` outright in a non-secure context, which throws synchronously inside the async fn → a rejected promise with no handler. In every one of those cases the sighted user gets the (intended) success pulse and the screen-reader user is told "Copied to clipboard" while the clipboard is unchanged. A false success report is worse than a visible failure.

The seam contrast is the proof this is CopyButton's defect and not the util's:

- `components/instrument/shell/useShareState.ts:31-40` — `await copyText(url, "Link copied to clipboard!")` inside `try`, with a real `catch` fallback (writes the state to the URL, toasts "copy from address bar").
- `components/instrument/keyframes/KeyframesStringControls.vue:133-167` — `await copyText(...)` inside `try`, `catch` toasts the failure with the error message and `console.error`s.
- `CopyButton.vue:52` — neither.

Same util, three consumers, one of them alone assumes infallibility. It also declines the util's `successMessage` toast channel and invents a private AT-only region instead, so the demo now has **two unrelated copy-feedback idioms** (toast vs. sr-only live region) with no stated rule for which applies where.

Secondary instance, same sin: `:62` `void group.value?.play()` — `AnimationGroup.play()` is `async play(): Promise<void>` (`group/group.ts:325`) and `void` discards its rejection too.

**Falsifier** — show that `navigator.clipboard.writeText` cannot reject in any context this demo is served in (gh-pages https, top-level, focused), or show a global `unhandledrejection` handler in `demo/` (grep says none). Either kills the severity, not the contract point.

### C-3 [MAJOR] · `isCopied` is a write-once latch — after one copy the accessible name is permanently "Copied to clipboard" and the `label` prop is annihilated

**Provenance** `CopyButton.vue:32` (`ref(false)`), `:54` (`isCopied.value = true`) — the ONLY write in the file. No reset, no timeout, no watch.

`:4` `:aria-label="isCopied ? 'Copied to clipboard' : label"`. So the first click permanently rewrites the button's accessible name and **discards the `label` prop forever**. `EasingTarget.vue:38` passes `label="Copy easing literal"` precisely to distinguish it; after one copy that distinction is gone. `KeyframesEditor.vue:82`, `KeyframeCard.vue:26`, `StartingStyleTarget.vue:59` pass no label, so on a page with several of them every copied button converges on the same stale name — AT users lose the ability to tell them apart, permanently, from one click.

It also lies about state: the visual (`:9-11` `opacity-0` + a 200 ms pulse) returns to the un-copied appearance the moment the animation ends (`fillMode: "forwards"`, `constants/defaults.ts:84`, holds the 100% frame — `opacity: 0`). Sighted state says "not copied", accessible name says "Copied to clipboard". The two channels disagree from ~200 ms after the first click onward, forever.

The prop contract is inverted: a public `label` whose value can be destroyed by a private internal that never comes back.

**Falsifier** — find any reset of `isCopied` (a `setTimeout`, `watch`, `useTimeoutFn`, parent `key` remount). The file is 113 lines and contains none; the four call sites do not `:key` the component. If a call site remounts it per copy, the finding weakens at that site only.

### C-4 [MAJOR, latent] · The component has ZERO intrinsic size — a mandatory external sizing contract that lives only in a *consumer's* CSS comment

**Provenance** `CopyButton.vue:5` root is `relative inline-block … p-0 m-0`; `:105-112` scoped `.clipboard { position: absolute; height: 100%; width: 100% }` applies to BOTH icons (`:8`, `:9-11`). An `inline-block` whose only children are out-of-flow has no content box → **0 × 0**.

Every current site compensates externally, and one of them documents the component's internals from the outside:

```
scenes/easing/EasingTarget.css:67-72
.literal-copy {
    /* CopyButton's icons are absolutely-positioned at 100% — the button needs
       an intrinsic box here (the sidebar mount sizes it externally). */
    width: 1rem; height: 1rem; flex: none;
}
```
plus `KeyframesEditor.vue:83` `w-6 h-6`, `KeyframeCard.vue:26` `h-6 w-6`, `StartingStyleTarget.vue:59` `shrink-0 w-4 h-4`.

That comment is the defect's confession: a consumer had to learn, and re-document, the component's private layout to use it. Nothing in the component's props, name, or docblock says "you must size me". A fifth site that forgets ships an invisible, unclickable control that is also a WCAG 2.5.8 target-size failure. Two of the four current sites (`w-4 h-4` = 16 px, `1rem` = 16 px) are already **under the 24 px minimum target size** with no padding to make up the difference — the sizing decision was pushed to consumers and two of them chose too small.

Latent for the 0×0 case (all four sites comply today); already live for the target-size case.

**Falsifier** — give the root a default box (`w-4 h-4` in its own class list, or a `size` prop) and the contract gap closes; show that an unsized `<CopyButton>` still paints and hits, and the claim dies. Falsifier for the 24 px half: a spacing/hit-area ancestor at those two sites that expands the effective target — `UNPROVEN-NEEDS-LIVE` (SS-13 should measure the two 16 px sites).

---

## 3 · MINOR

### C-5 [MINOR] · No `emits` — copy success is swallowed, and an owner design doc has already asked for it

`CopyButton.vue:27-30` declares props only; there is no `defineEmits`, no `defineExpose`, no injected channel. The copy result is unobservable from outside.

`docs/frontend-design/demo/easing.md:238-241` specifies: *"**The readout reacts to copy.** On CopyButton success in `EasingEditor.vue`, flash the readout literal with a brief `--trace` highlight sweep … confirmation that the copy-worthy artifact was copied."* That is unimplementable against this contract without editing the component — the design intent is already blocked on a missing `@copied` (or `@copy-failed`, which C-2 shows is the more important one). A one-line `defineEmits<{ copied: []; failed: [unknown] }>()` would serve both.

**Falsifier** — show a consumer observing copy success today (none of the four sites does), or an owner ruling that the doc line is retired.

### C-6 [MINOR] · `AnimationGroup<any>` discards the library's own generic

`CopyButton.vue:49` `shallowRef<AnimationGroup<any> | null>(null)`. The barrel exports `Vars` as a type (`src/animation/index.ts`, the `constants/types` re-export block), and `AnimationGroup<V extends Vars>` (`group/group.ts:42`). `AnimationGroup<Vars>` is available and precise; `any` opts the handle out of every check the library offers. One-word fix, and the `import type` line at `:23` already exists to carry it.

**Falsifier** — show `Vars` is not reachable from `@mkbabb/keyframes.js` (it is — the type surface is explicitly kept whole on the LIGHT barrel, `index.ts` docblock ¶4).

### C-7 [MINOR] · `g.singleTarget = false` pokes DERIVED state the library recomputes elsewhere — load-bearing correctness resting on a field the API owns

`CopyButton.vue:95-99` constructs the group, then writes `g.singleTarget = false` (`:96`), then assigns targets to the CHILDREN individually (`:98-99`).

The library derives that field: `group/group.ts:159-161` computes it in the constructor as `animations.every(a => a.targets[0] === animations[0]?.targets[0])`. At `:95` both children have **empty** target arrays, so the derivation compares `undefined === undefined` → `true` → `singleTarget = true`, which is wrong for this group. The manual poke at `:96` is a correction for a construct-then-assign ordering.

It is load-bearing: `render()` branches on it (`group/group.ts:225` vs `:289`), so if the poke were ever lost the group would composite BOTH children's vars onto the first target and the check icon would never animate. And it IS losable — `AnimationGroup.setTargets` recomputes the field (`group/group.ts:195-204`); any future call to it silently reverts the poke.

The library already offers the ordering that makes the derivation correct by construction: `CSSKeyframesAnimation(options?, ...targets: HTMLElement[])` (`engine/css/css-animation.ts:57-64`). Passing each icon at construction removes both the poke and the fragility.

**Falsifier** — show `singleTarget` documented as a consumer-writable knob rather than a derived value. `group/group.ts:73` declares it bare (`singleTarget = true`) with no doc comment, while the two derivation sites treat it as computed; the ambiguity is real but the recompute at `:201` is the decisive evidence.

### C-8 [MINOR] · Reduced motion declined — the library ships the opt-in, the consumer does not take it

`AnimationGroup.respectReducedMotion` defaults to **false** (`group/group.ts:55-57`), as does `defaultOptions.respectReducedMotion` (`constants/defaults.ts:87`). Honoring `prefers-reduced-motion: reduce` is opt-IN: `group/lifecycle.ts:75-80` snaps to the final frame only when the flag is set. `CopyButton.vue` sets neither the group flag nor the per-animation option, so the `scale(1) → scale(1.25) → scale(1)` pulse (`:70-93`) runs at full amplitude for users who asked for less motion.

A 200 ms 1.25× pulse on a 16-24 px icon is a mild instance — but it is the consumer's call to make and the component makes it silently, in the same file where reduced-motion-adjacent a11y (the live region, `:13-15`) was thought about carefully.

**Falsifier** — a global reduced-motion gate in the demo shell that suppresses this (none found; `reducedMotionScale`/`withReducedMotion` are library exports the component does not import), or an owner ruling that micro-pulses are exempt.

### C-9 [MINOR] · The two `@keyframes` are JS string literals — unlinted, untokenized, invisible to the stylesheet layer

`CopyButton.vue:70-79` and `:83-92` author CSS inside `/*css*/` template literals. They never reach `demo/styles/` (where the demo centralizes shared keyframes), get no PostCSS/Tailwind processing, no design-token substitution, and no lint. The `/*css*/` marker is an editor-highlighting convention, not a toolchain hook.

This is the surviving kernel of lane-frontend's rows for `:70`/`:83` — with the mechanism corrected: see §4.

Note the same block ships an animation named `fade-out` that fades nothing (C-10) — precisely the class of error a stylesheet-resident, linted keyframe is likelier to catch.

**Falsifier** — show a build step that extracts and processes `/*css*/` literals (none in `vite.config.ts`), or an owner ruling that engine-driven keyframes belong in script by design. (The latter is defensible for *dynamic* keyframes; these two are constant.)

### C-10 [MINOR] · There is no icon SWAP — `fade-out` never touches opacity, so the check flashes superimposed over a clipboard that never leaves

`CopyButton.vue:83-92`: the animation bound to the clipboard icon (`:99`) interpolates `transform` only — `0%,100% { transform: scale(1) }`, `50% { transform: scale(1.25) }`. No `opacity` key. Meanwhile `:70-79` drives the check from `opacity: 0` → `1` → `0`.

So the sighted feedback is a 200 ms superimposed flash of two stacked icons at the same 100%/100% box (`:105-112`), not a swap and not a state. Three descriptions in one file disagree about what the feedback is:

- `:13-14` comment — "the icon swap is the sighted feedback" (there is no swap);
- `:83` the animation's own name — `fade-out` (it fades nothing);
- `:32/:54` `isCopied` — a persistent latched state (the visual is transient; and see C-3).

Currently unobservable because C-1 kills the whole thing; it becomes live the moment C-1 is fixed, which is why it belongs in the same repair.

**Falsifier** — the composite may still *read* correctly, since Lucide's `ClipboardCheck` is `Clipboard` plus a check path, so the overlay could look like a clean state change with slightly heavier strokes. `UNPROVEN-NEEDS-LIVE` (SS-13: fix C-1, then screenshot the 50% frame — if the double-stroke is invisible at 16-24 px, downgrade to INFO). The naming/comment/state disagreement stands regardless of how it renders.

---

## 4 · INFO

### C-11 [INFO] · `useTemplateRef<HTMLElement>` on functional Lucide icons yields `SVGSVGElement` — a type lie that is benign only by accident

`CopyButton.vue:37-38` types both refs `HTMLElement`. `@lucide/vue@1.17.0` builds icons as **functional** components — `createLucideIcon.mjs:11-19` returns `(props, { slots, attrs }) => h(Icon, …)`, and `Icon.mjs:17-60` is likewise a plain function rendering `h("svg", …)`. Vue resolves a template ref on a non-stateful component vnode to `vnode.el`, so `clipboard.value` is the `<svg>` DOM node — an `SVGSVGElement`, which is **not** an `HTMLElement`.

The refs are then handed to `setTargets(...targets: HTMLElement[])` (`:98-99`) — the library's declared element contract, which this satisfies only because the write path touches nothing HTML-specific: `transformTargetsStyle` (`compile/value-ast.ts:386-400`) uses `target.style.setProperty` / `removeProperty`, and `SVGElement` implements `ElementCSSInlineStyle`. Any future engine path reaching for `offsetWidth`, `dataset`, or `instanceof HTMLElement` breaks this silently. The honest annotation is `SVGSVGElement`; the honest library signature is `Element`.

**Falsifier** — show `@lucide/vue` icons are stateful (then the refs would be component instances and the code would already be broken, a stronger finding, not a weaker one), or a library guard that rejects non-HTML elements (none in the write path).

### C-12 [INFO] · The "resolves within microtasks of mount" comment is TRUE — but for a reason it does not name, and the reason does not travel

`CopyButton.vue:45-48` claims the engine "resolves within microtasks of mount — well before a user can click". That holds here only because `demo/app/main.ts:44-50` awaits `warmKfEngine()` **before** `app.mount("#app")`, and `loadAnimationEngine()` memoizes its promise (`load-engine.ts:118-121`, `demo/kf-engine.ts:33-42`). The awaited promise is already settled, so the continuation runs one microtask after mount — refs populated, no race. Correct.

But the comment attributes the guarantee to `loadAnimationEngine()` itself, and the file's framing ("rather than a deep `@src` import") is the npm-consumer story. Lift this component into any host without a pre-mount warm and the `await` at `:66-67` becomes a real network fetch of the engine chunk; a click inside that window hits `group.value === null` (`:62`), and the component has **no queue, no retry, and no pending state** — the animation is silently dropped and never replayed. One sentence of the comment ("because main.ts warms the engine before mount") would make the coupling auditable; a `pending` guard would make it survive the lift.

**Falsifier** — remove the `warmKfEngine()` await from `main.ts` and show the first click still animates. It will not, on a cold chunk.

### C-13 [INFO] · The type surface that should have caught C-1 is defeated by its own `| string` arm

`constants/types.ts:191-195`:

```ts
timingFunction:
    | TimingFunction
    | Easing
    | TimingFunctionNames
    | string          // ← swallows the union
    | undefined;
```

`TimingFunctionNames` (`:25-37`) is a closed, accurate roster — and it does **not** contain `bounceInEase`. With `| string` present, the union collapses to `string` and the roster provides exactly zero compile-time protection: `npm run check` is green on a name the runtime rejects. This is the mechanism by which a value.js registry rename reached production silently, and it is the same shape as the R1 class (a value.js-side change that only a runtime path discovers).

Recorded here as the library seam behind C-1, not double-counted as a component defect. Dropping the `| string` arm (or narrowing it to a template-literal type for `cubic-bezier(…)`/`steps(…)`/`linear(…)` literals) would have made C-1 a compile error.

### C-14 (negative finding, INFO) · The R1 parser-crash class is NOT reachable from this component

Both keyframe strings (`:70-79`, `:83-92`) carry only `transform` and `opacity` — no color values. `fromString` → `resolveKeyframes` (`engine/css/css-animation.ts:169-176`) therefore never reaches value.js's color parser, so the R1 `parseCssColor("oklch()")` shipping crash is **not** reachable here. `defaultOptions.colorSpace: "oklab"` (`constants/defaults.ts`) is inert for the same reason. The component's real value.js exposure is the **easing registry** (C-1) and the keyframe grammar — not the color path.

**Falsifier** — add any color property to either keyframe string and the exposure opens immediately, with no guard in this component.

---

## 5 · Claims considered and KILLED by their own falsifiers

Recorded so the next lane does not re-litigate them.

1. **"The `requestAnimationFrame` re-arm at `:57-60` never lands the clear, so a repeat copy does not re-announce."** KILLED. Vue flushes DOM updates on the microtask queue; `liveStatus = ""` (`:57`) flushes before the rAF callback (`:58-60`) runs, so the region genuinely empties then refills. The mechanism works. (rAF is throttled in a backgrounded tab — but a backgrounded tab is not being clicked. Not a defect.)
2. **"The scoped `.clipboard` style (`:105-112`) cannot reach a child component's root, and Lucide's `Icon.mjs` overwrites the incoming `class`."** KILLED twice: Vue applies the parent's scope id to a child component's root element, and fallthrough attrs are merged with `mergeProps` (class strings concatenate, not replace), so the explicit `class:` in `Icon.mjs:52-57` is additive with the consumer's `clipboard` / `opacity-0`. The sizing rule does apply.
3. **"The `!` non-null assertions at `:98-99` will crash on a fast unmount."** KILLED for this codebase: with the pre-mount warm (C-12) the continuation runs one microtask after mount, while refs are live. The assertion is unjustified *style* but not a live defect — and it is already covered by C-12's lift hazard.

---

## 6 · Superlatives (L-18, both ways)

### SUP-1 · Library consumption is exemplary — the published barrel and the dynamic accessor, never a deep source import

`:23-24` imports `type { InputAnimationOptions, AnimationGroup }` + `loadAnimationEngine` from `@mkbabb/keyframes.js` — the package specifier — and reaches the HEAVY surface through `loadAnimationEngine()` (`:66-67`), never `@src/animation/engine/*`. That is exactly the ED-3 dogfood law (`demo/kf-engine.ts:1-26`: "the demo consumes the PUBLISHED kf barrel… the HEAVY surface is reached ONLY through `loadAnimationEngine()`"), and exactly the light/heavy contract the barrel's own docblock defines (`src/animation/index.ts` ¶2-3). The types ride the erased static surface, the runtime rides the dynamic edge — `proof:boundary`'s invariant, honored by a 113-line leaf component with no supervision.

Note this survives C-1 intact: the component consumes the library *correctly* and still fails, because the failure is in a value it passed, not a path it took.

**Falsifier** — any `@src/` or `dist/` import in this file. There is none.

### SUP-2 · `shallowRef` for the `AnimationGroup` handle — the right call, and the non-obvious one

`:49` `shallowRef<AnimationGroup<any> | null>(null)`. A plain `ref()` would deep-proxy the entire engine object graph reachable from the group: `animations`, the entry cache, `_composite`, each child's compiler and playback state, **and the DOM element arrays**. That is not merely a perf tax — it is a correctness hazard: `group/group.ts:159-161` and `:195-204` derive `singleTarget` by **reference identity** on `targets[0]`, and reactive proxies break identity comparisons between wrapped and raw elements. `shallowRef` sidesteps the entire class. Deliberate and right.

**Falsifier** — show Vue does not proxy class instances reachable from a deep `ref` (it does, unless marked raw), or that the group holds no element references (it holds them at two derivation sites).

### SUP-3 · One AT-only status sink, re-armed — the correct a11y shape, with its reasoning written down

`:13-15` a single `sr-only` `role="status" aria-live="polite"` region, empty until a copy fires, with a comment naming both the mechanism and the intent ("without a visual change… the icon swap is the sighted feedback"). No duplicate live regions, no `aria-live="assertive"` shouting, no visual/AT double-channel, and the empty-then-set re-arm (`:57-60`) is the standard fix for re-announcing unchanged text. The *thinking* here is a rung above the file's average.

**Caveat, stated because L-18 runs both ways**: paired with the `aria-label` swap on `:4`, a focused button may be announced twice (name change + status region) — `UNPROVEN-NEEDS-LIVE`, SS-13 should verify with VoiceOver/NVDA. And C-3 shows the *label* half of that pairing is broken. The live-region design is the good part; the label swap should probably go away entirely, leaving the status sink as the sole announcement.

---

## 7 · Hitherto corpus — folded, and one explicit contradiction

**Cited and CONFIRMED**

- **S-7** (`lane-frontend.md:383-385`, `CopyButton → Button + Tooltip`, AMBER, 113 lines) — CONFIRMED and sharpened. The component consumes **zero** glass-ui: `:5` hand-rolls a bare `<button>` with utility classes and **no focus-visible treatment at all**, while its immediate sibling nine lines away in the same toolbar (`KeyframesEditor.vue:91`) hand-rolls a *different* bare button *with* `focus-visible:ring-2 focus-visible:ring-accent`. Two bespoke buttons, two focus contracts, one toolbar — the concrete cost of the un-adopted shadow. Lane's judgment that this is a **partial** shadow (glass shell, local copy logic) is right and I endorse it; add C-4's sizing to the shell's job and C-5's emit to the local half.
- **F-1** (`lane-frontend.md:15,54,569,612`, glass-ui phantom dependency, RED) — a hard **prerequisite** for S-7 here. `@mkbabb/glass-ui` is absent from `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`; any glass `Button` adoption in this file would be unreproducible under `npm ci`. **F-1 before S-7**, exactly as the lane sequenced it.
- **lane-frontend.md:229** (census row 113) — the row's *existence* and its "clipboard button" characterization confirmed; its mechanism clause corrected below.

**CONTRADICTED — `lane-frontend.md:385` and `:452-453`**

> "`CopyButton.vue:70` and `:83` build `@keyframes fade-in` / `fade-out` as **runtime JS template strings** and **inject them — style-injection from script, bypassing the cascade entirely**."

The first half is right; the mechanism is wrong on both counts, and the tree says so:

1. **Nothing is injected.** `fromString` (`engine/css/css-animation.ts:169-176`) hands the string to value.js's `resolveKeyframes` and stores parsed template frames on the animation's compiler. Playback writes **inline styles** via `transformTargetsStyle` (`compile/value-ast.ts:386-400` — `target.style.setProperty(property, String(value))`). There is no `<style>` element, no `document.adoptedStyleSheets`, no `CSSStyleSheet.insertRule` anywhere on this path. `grep -rn "insertRule|adoptedStyleSheets|createElement(\"style\")"` over the reached engine modules returns nothing on this path.
2. **Inline styles do not "bypass the cascade"** — they *are* its author-origin inline level, the highest-specificity author declaration. The phrase inverts the model.

The kernel that survives — constant keyframes authored as unlinted, untokenized JS literals invisible to the stylesheet layer — is preserved as **C-9**, with the mechanism stated correctly. The lane's severity instinct was sound; its causal story would have sent a repair wave hunting for a style-injection site that does not exist.

**DISCHARGED — `docs/tranches/U/audit/lane-24-design-restructure-system.md:89`**

> "Runtime-object props | `CopyButton.vue:27` `defineProps({ text: { type: String, required: true }, … })` — the ONLY runtime-object site in the tree"

The tree has moved. `CopyButton.vue:27-30` is now type-based with reactive-props destructure and a default:

```ts
const { text, label = "Copy to clipboard" } = defineProps<{ text: string; label?: string }>();
```

That U-era row is **discharged**, not outstanding. (The props *shape* is now idiomatic; C-3 and C-5 are about what the contract omits, not how it is declared.)

---

## 8 · Repair order (consumption axis only)

1. **C-1** — `"bounceInEase"` → `"easeInBounce"` (`:42`). One token; unblocks everything and un-reds the console budget. Then re-run `npm run demo:correctness`.
2. **C-10** — with C-1 fixed the animation is visible for the first time: give `fade-out` an actual opacity ramp (or rename it and fix the `:13-14` comment). Do it in the same change; the two are one bug.
3. **C-2 + C-3 + C-5** — one contract repair: `await copyText(...)` in a `try/catch`, set `isCopied` (and announce) **only** on success, reset it on a timer, emit `copied`/`failed`. This also lets `EasingEditor` implement the `easing.md:238` flash.
4. **C-4** — give the root its own box (or a `size` prop); delete the explanatory comment from `EasingTarget.css:67-69`; raise the two 16 px sites to a 24 px target.
5. **C-7 + C-6 + C-8** — construct children with their targets (`new CSSKeyframesAnimation(options, el)`), drop the `singleTarget` poke, type the handle `AnimationGroup<Vars>`, set `respectReducedMotion`.
6. **S-7** — only after **F-1**. Glass `Button` shell; the copy logic stays local.
7. **C-13** — library-side, not this component: narrow `InputAnimationOptions["timingFunction"]` so the next registry rename is a compile error. Route to the kf library lane.
