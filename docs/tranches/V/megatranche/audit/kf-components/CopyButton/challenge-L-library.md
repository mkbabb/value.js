claude-opus-5[1m]

# CHALLENGE · `CopyButton.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/CopyButton.vue` (113 lines, whole-file read)
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every runtime claim is traced to source; anything that would need a live page is marked **UNPROVEN-NEEDS-LIVE** and deferred to the SS-13 visual audit.
**Evidence tree** `/Users/mkbabb/Programming/keyframes.js` @ working tree as read 2026-08-04 (census substrate `8281638c`). READ-ONLY. My only write is this file.
**Hitherto corpus folded** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` (S-1..S-8, F-1) · `lane-library.md` (§4.1/§4.6 parse seams, §7.5 failure posture). Two of their claims about this file are **contradicted** below (§4).

**Complete import closure read** (every file this component pulls, transitively, to the point where the contract is decided):
`demo/utils/clipboard.ts` · `src/animation/index.ts` (barrel) · `src/animation/load-engine.ts` · `src/animation/group/group.ts` · `src/animation/group/lifecycle.ts` · `src/animation/group/entries.ts` · `src/animation/group/waapi.ts` · `src/animation/group/yield-batch.ts` · `src/animation/internal/transport/core.ts` · `src/animation/engine/animation.ts` · `src/animation/engine/css/css-animation.ts` · `src/animation/engine/play-lifecycle.ts` · `src/animation/engine/options.ts` · `src/animation/compile/adapter.ts` · `src/animation/compile/value-ast.ts` · `src/animation/constants/defaults.ts` · `node_modules/@lucide/vue/dist/lucide-vue.d.ts` · `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js` (setRef). Plus all four call sites and the three sibling copy sites.

---

## 0. Verdict

| | count |
|---|---|
| **BLOCKER** | 1 |
| **MAJOR** | 4 |
| **MINOR** | 5 |
| **INFO** | 3 |
| **SUPERLATIVE** | 4 |
| **corpus contradictions** | 2 |

The component is a *good* piece of Vue with one **untruthful** failure path. It reaches the keyframes engine through exactly the seam the library documents (§5 S-1), renders a real `<button>`, and carries an AT status sink most demo buttons do not. It also announces "Copied to clipboard" to a screen reader on a copy that **did not happen**, drops the promise that would have told it so, animates through `prefers-reduced-motion: reduce` in a repo where four sibling sites do not, and has no intrinsic size — a fact one consumer has already been forced to document in its own CSS.

---

## 1. BLOCKER

### L-1 · The copy is fire-and-forget: an unhandled rejection, and a **false success announcement to assistive tech**

**Severity** BLOCKER
**Provenance** `demo/components/CopyButton.vue:51-63`; `demo/utils/clipboard.ts:3-8`

```ts
// CopyButton.vue:51-63
const handleClick = () => {
    copyText(text);                       // :52  ← not awaited, not caught

    isCopied.value = true;                // :54  ← unconditional
    liveStatus.value = "";                // :57
    requestAnimationFrame(() => {
        liveStatus.value = "Copied to clipboard";   // :59  ← unconditional
    });

    void group.value?.play();             // :62
};
```

```ts
// demo/utils/clipboard.ts:3-8
export async function copyText(text: string, successMessage?: string): Promise<void> {
    await navigator.clipboard.writeText(text);
    if (successMessage) { toast.success(successMessage); }
}
```

`copyText` is `async`, so **every** failure mode becomes a rejected promise, and line 52 attaches no handler to it:

- insecure context / `navigator.clipboard === undefined` → `TypeError` thrown inside the async body → rejected promise;
- `NotAllowedError` — document not focused (Safari/Firefox reject `writeText` on an unfocused document), permission denied, or a cross-origin frame without `allow="clipboard-write"`.

Two consequences, both shipped:

1. **`unhandledrejection`** on the page. Nothing in the file, and nothing in `demo/app/main.ts`, catches it.
2. **The component lies.** Lines 54 and 59 run regardless. The `role="status" aria-live="polite"` region (`:15`) announces *"Copied to clipboard"* to a screen-reader user whose clipboard is unchanged, and the icon pulse (`:62`) gives the sighted user the same false confirmation. The file's own comment at `:13-14` names this region as the honest AT channel — it is the channel that lies.

This is not a posture the repo lacks. **All three sibling copy sites handle it**, and CopyButton — the component *named* for copying — is the sole outlier:

| site | posture |
|---|---|
| `demo/components/instrument/shell/useShareState.ts:30-40` | `try { await copyText(url, "Link copied…") } catch { … router.replace fallback + toast.info("URL updated — copy from address bar") }` |
| `demo/components/instrument/keyframes/KeyframesStringControls.vue:133-167` | `try { await copyText(…) } catch (e) { toast.error("Export CSS failed 🔧", {description: (e as Error).message}); console.error(e) }` |
| `KeyframesStringControls.vue:173-177` (`defineExpose.copyCSS`) | `await copyText(…)` — rejection propagates to the caller, not swallowed |
| **`CopyButton.vue:52`** | **bare call, no `await`, no `.catch`, success asserted unconditionally** |

The file *knows* the floating-promise idiom — line 62 writes `void group.value?.play()`. Line 52 does not even get the `void`. Whatever the reason, an `async` function is being called as if it were `void`-returning.

**Falsifier** — this claim dies if ANY of: (a) `demo/app/main.ts` or an app-level plugin installs an `unhandledrejection` handler that surfaces a copy failure to the user *and* something reverts `isCopied`/`liveStatus` (grep of `demo/app/main.ts` and `demo/app/App.vue` for `unhandledrejection` → no hits); (b) `copyText` is rewritten to swallow and return a boolean; (c) a live audit shows `navigator.clipboard.writeText` cannot reject in any browser the demo supports (it can — `NotAllowedError` on unfocused documents is normative in the Clipboard API spec).

**Non-claim** I do **not** claim the failure is *common* on the deployed gh-pages origin (HTTPS, top-level, user-gesture — the happy path). The defect is that the failure path is unmodelled and mis-announced, not that it fires often.

---

## 2. MAJOR

### L-2 · `respectReducedMotion` is never set — the pulse runs through `prefers-reduced-motion: reduce`

**Severity** MAJOR
**Provenance** `CopyButton.vue:40-43, 65-102`; `src/animation/group/group.ts:57`; `src/animation/group/lifecycle.ts:73-96`; `src/animation/constants/defaults.ts:87`

The group's PRM gate is a **group field**, defaulted off, and read only off the group:

```ts
// src/animation/group/group.ts:55-57
/** When true, `play()` honors `prefers-reduced-motion: reduce` by snapping
 * every child to its final frame in one composite, no rAF loop. Default false. */
respectReducedMotion = false;
```
```ts
// src/animation/group/lifecycle.ts:79-81
return beginPlay(group, () => withReducedMotion(
    group.respectReducedMotion,      // ← the ONLY consultation on the group path
    () => playReducedMotion(group),
    () => { … rAF loop … },
));
```

CopyButton's `options` (`:40-43`) carries only `duration` + `timingFunction`, and `g` (`:95-101`) never receives `respectReducedMotion`. Note this is **not** fixable by putting the flag in `options`: the child-options arm (`src/animation/engine/play-lifecycle.ts:210-218`, `anim.options.respectReducedMotion`) is on the *standalone* `playFrame` path, which a managed child never takes — `group._frame` → `advanceTo` → `renderMultiTarget` never consults child options. `group.respectReducedMotion = true` is the only lever.

Result: clicking copy runs a 200 ms `scale(1) → scale(1.25) → scale(1)` rAF pulse on both icons under `reduce`.

This contradicts the repo's own standing idiom at **four** sites:

- `demo/state/animationOptionsStore.ts:49` — `respectReducedMotion: true` in `defaultAnimationOptions`
- `demo/components/playback/AnimationVisualizer.vue:144-148` — `new SpringProgress({ …, respectReducedMotion: true })`
- `demo/components/instrument/shell/TypingDots.vue:91` — `respectReducedMotion: true`, with the comment (`:83-87`) *"the engine owns the loop; respectReducedMotion routes the PRM resting frame through the shared `withReducedMotion` authority (replacing the old hand-mirrored `@media` block)"*
- `demo/app/transition/useSceneSwap.ts:45` — `new SpringProgress({ respectReducedMotion: true })`

**Falsifier** — dies if a CSS `@media (prefers-reduced-motion: reduce)` rule neutralises `.clipboard`'s transform. It does not: `grep -rn "prefers-reduced-motion" demo/styles/*.css` → **zero hits** (no global block exists), and the 13 files that do carry a PRM block (`App.skeleton.vue`, `AnimatedText.vue`, `TypingDots.vue`, `KeyframeTimeline.vue`, `ControlsPaneWrapper.css`, `EasingTarget.{css,vue}`, `SequenceTarget.css`, `SpringHeatmap.vue`, `SpringTarget.vue`, `StartingStyleTarget.vue`, `SquareInstrument.vue`, `SquareScene.css`) are all scene/component-scoped and none of them selects CopyButton or `.clipboard`. Also dies if `withReducedMotion` (`src/animation/internal/reduced-motion.ts`) is shown to gate independently of the passed policy — it does not; the policy is its first argument.

**Scale of the motion** — 25 % scale, 200 ms, on a 16–24 px icon. Small. That is why this is MAJOR and not BLOCKER: the harm is a policy breach against the repo's own law, not a vestibular hazard.

---

### L-3 · `isCopied` is a write-once latch — the button's **accessible name** is permanently wrong after the first click

**Severity** MAJOR
**Provenance** `CopyButton.vue:4, 32, 54`

```html
<!-- :4 -->  :aria-label="isCopied ? 'Copied to clipboard' : label"
```
```ts
// :32
const isCopied = ref(false);
// :54  — the ONLY write in the file
isCopied.value = true;
```

`isCopied` is set true and **never cleared**. Nothing in the file, the template, or the animation completion path resets it (`group.play()` resolves, `settle()` runs — `src/animation/group/lifecycle.ts:159-171` — and touches no component state). `isCopied` has exactly one consumer: the `aria-label` ternary.

Consequences:

1. `aria-label` is the accessible **name**. After one click the button is permanently named *"Copied to clipboard"* — a past-tense state, not the action it performs. A user who tabs to it an hour later hears "Copied to clipboard, button" and has no idea what activating it will do. The `label` prop (`:29`, default `"Copy to clipboard"`, overridden at `EasingTarget.vue:38` to `"Copy easing literal"`) is dead from the first click onward.
2. It duplicates the live region. On click #1 the name changes *and* `:15` announces — two utterances for one event, on channels the file's comments (`:13-14`, `:33-34`) treat as one.
3. As a state model it is incomplete: a latch with a set and no reset is dead state (cf. `animationOptionsStore.ts:22-23`, where the repo already excised `animationState` as *"dead state from the pre-machine era"*).

Compounded by L-1: on a *failed* copy the name flips to "Copied to clipboard" permanently.

**Falsifier** — dies if `aria-label` is not the accessible name here (it is: `<button>` with no text content, only two `aria-hidden`-less SVGs and an `sr-only` span; `aria-label` wins accname step 2C), or if some consumer resets it via a `key` remount on every copy (none of the four call sites keys the component — `EasingTarget.vue:35`, `KeyframesEditor.vue:82`, `KeyframeCard.vue:26`, `StartingStyleTarget.vue:59` all mount it plain).

---

### L-4 · Zero intrinsic box — the component is unrenderable without an external size, and a consumer has already had to document the workaround

**Severity** MAJOR
**Provenance** `CopyButton.vue:5, 8-12, 104-113`; `demo/scenes/easing/EasingTarget.css:68-74`

```css
/* CopyButton.vue:104-113 (scoped) */
.clipboard { bottom: 0; left: 0; height: 100%; width: 100%; position: absolute; }
```

The `<button>` (`:5`, `relative inline-block`, `p-0 m-0 border-0`) contains **only**: two absolutely-positioned SVGs and one `sr-only` span (Tailwind v4's `sr-only` is itself `position:absolute`). Nothing is in flow. The button's content box is therefore **0 × 0**, and the icons — sized `height:100%; width:100%` of that box — are 0 × 0 too. The component is a no-op unless every consumer supplies a size from outside.

That contract is nowhere declared in the file: no default size class, no documented prop, no comment. And it has already cost a consumer:

```css
/* demo/scenes/easing/EasingTarget.css:68-74 */
.literal-copy {
    /* CopyButton's icons are absolutely-positioned at 100% — the button needs
       an intrinsic box here (the sidebar mount sizes it externally). */
    width: 1rem;
    height: 1rem;
    flex: none;
    …
}
```

A consumer writing a comment to explain a leaf component's missing intrinsic box **is** the defect: the contract leaks into four independent stylesheets and is enforced by nothing.

Secondary, and shipped today: two of the four consumers size it to **16 px**, below the 24 × 24 CSS-px floor of **WCAG 2.2 SC 2.5.8 (Target Size, Minimum)** —

| call site | size | |
|---|---|---|
| `KeyframesEditor.vue:82-85` | `w-6 h-6` = 24 px | at the floor |
| `KeyframeCard.vue:26` | `h-6 w-6` = 24 px | at the floor |
| `EasingTarget.vue:35-39` → `.literal-copy` | `1rem` = 16 px | **below** |
| `StartingStyleTarget.vue:59` | `shrink-0 w-4 h-4` = 16 px | **below** |

A component that owned a `min-width/min-height: 24px` on its own root would make this unrepresentable.

**Falsifier** — dies if the button acquires a box some other way: a global `button { min-height }` rule (grep of `demo/styles/style.css` and the 12 demo CSS files shows no such rule reaching a bare `<button>` with `p-0`), or if `sr-only` were in-flow (Tailwind v4 `sr-only` sets `position:absolute`). Also dies for the WCAG half if the 16 px sites are shown to have ≥24 px spacing exemptions under SC 2.5.8's "spacing" exception — **UNPROVEN-NEEDS-LIVE**: `EasingTarget`'s copy button sits inside a `gap: 0.45rem` inline row (`EasingTarget.css:58-63`) adjacent to a `<code>`, so the exception plausibly does *not* apply, but only a live measurement settles it. The zero-intrinsic-box half needs no live check.

---

### L-5 · `useTemplateRef<HTMLElement>` is a type lie, and the lie is **load-bearing** for the build

**Severity** MAJOR
**Provenance** `CopyButton.vue:8-12, 20, 37-38, 98-99`; `node_modules/@lucide/vue/dist/lucide-vue.d.ts:10`; `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:1761`; `src/animation/group/group.ts:195`; `src/animation/compile/value-ast.ts:386-388`

```ts
// :37-38
const clipboard = useTemplateRef<HTMLElement>("clipboard");
const clipboardChecked = useTemplateRef<HTMLElement>("clipboardChecked");
// :98-99
clipboardCheckedAnim.setTargets(clipboardChecked.value!);
clipboardAnim.setTargets(clipboard.value!);
```

Lucide's Vue icons are **functional** components:

```ts
// @lucide/vue/dist/lucide-vue.d.ts:10
type LucideIcon = FunctionalComponent<LucideProps>;
```

and Vue resolves a template ref on a functional vnode to the **rendered DOM element**, not an instance:

```js
// @vue/runtime-core .../runtime-core.cjs.js:1761
const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
//                              ^ 4 = STATEFUL_COMPONENT; a functional vnode falls to vnode.el
```

`vnode.el` for a lucide icon is the root `<svg>` — an **`SVGSVGElement`**, which does **not** extend `HTMLElement`. So the runtime type is `SVGSVGElement` and the declared type is `HTMLElement`.

Why it matters beyond tidiness: the annotation is what makes the call typecheck. The engine's target contract is `HTMLElement`-only —

```ts
// src/animation/group/group.ts:195
setTargets(...targets: HTMLElement[]) { … }
// src/animation/compile/value-ast.ts:386-388
export function transformTargetsStyle<V extends Vars>(vars: V, targets: HTMLElement[]): void
```

— so annotating the ref honestly (`useTemplateRef<SVGSVGElement>`) would make `tsc --noEmit` **fail** at `:98-99`. The `<HTMLElement>` is laundering a genuine contract gap: *the engine does not model SVG targets, and this component animates SVG targets.* It works today only because `transformTargetsStyle` reaches for `.style.setProperty`, which `SVGElement` happens to expose. Any future narrowing on the target path (`instanceof HTMLElement`, `offsetWidth`, `dataset`, layout reads) breaks this call site silently — and no test covers it (`grep -rn "CopyButton" test/` → no hits).

**Falsifier** — dies if lucide icons are stateful (they are not: `FunctionalComponent`, d.ts:10), if Vue assigns the public instance for functional vnodes (it does not: runtime-core:1761), or if `setTargets` widens to `Element`/`HTMLElement | SVGElement` in the source (it does not, at `group.ts:195` or `engine/animation.ts:173-176`). Whether the *rendering* is correct — `transform: scale()` on an outermost `<svg>` with the default `transform-box`/`transform-origin` — is **UNPROVEN-NEEDS-LIVE** and I make no claim about it; I claim only that the declared type is false and that its falsity is what lets the build pass.

---

## 3. MINOR

### L-6 · No unmount teardown — the rAF loop and the naked `requestAnimationFrame` both outlive the component

**Severity** MINOR · **Provenance** `CopyButton.vue:58-60, 65-102` (no `onBeforeUnmount` anywhere in the file); `src/animation/group/group.ts:107` (`readonly playback = new RAFPlayback()`)

Two ungated schedulers, neither cancelled:

1. `group.playback` (a per-instance `RAFPlayback`) keeps ticking after unmount. `_renderFrame` (`group.ts:281-315`) returns `true` until `done`, so the loop runs to completion — **bounded at ~200 ms** — writing `style.setProperty` to detached SVG nodes the whole time. Not an unbounded leak; still wasted main-thread work on dead DOM, and it is exactly what `group.stop()` (`group/lifecycle.ts:192-195`) exists for.
2. `requestAnimationFrame` at `:58` returns a handle that is discarded. Its callback writes `liveStatus.value` on a torn-down instance.

The in-repo exemplar is one directory over — `demo/components/instrument/shell/TypingDots.vue:103-107`:

```ts
onBeforeUnmount(() => {
    unmounted = true;
    for (const anim of anims) anim.stop();
    anims.length = 0;
});
```

TypingDots is the **only** file under `demo/components/` besides `TransportDock/useMenubarMeasure.ts` that does teardown; CopyButton drives an engine loop and does not.

**Falsifier** — dies if `RAFPlayback.loop` self-cancels on target detachment (it does not; `physics/playback.ts` has no detachment probe) or if the group is proven never to be playing at unmount (impossible to prove statically; a scene switch during the 200 ms window is exactly the case).

---

### L-7 · Post-`await` non-null assertions on refs the framework nulls at unmount

**Severity** MINOR · **Provenance** `CopyButton.vue:65-67, 98-99`

```ts
onMounted(async () => {
    const { CSSKeyframesAnimation, AnimationGroup } = await loadAnimationEngine();
    …
    clipboardCheckedAnim.setTargets(clipboardChecked.value!);   // :98
    clipboardAnim.setTargets(clipboard.value!);                 // :99
});
```

Vue sets template refs to `null` on unmount (`runtime-core.cjs.js:1762`, `isUnmount ? null : refValue`). If the component unmounts during the `await`, both `!` assertions are false and `setTargets(null!)` assigns `targets = [null]` — no throw (`group.ts:195-204` and `engine/animation.ts:196-197` only assign), just a permanently inert group holding a null target and a component that no longer exists.

The window is genuinely small: `demo/app/main.ts:50-53` awaits `warmKfEngine()` **before** `app.mount("#app")`, so `loadAnimationEngine()`'s memoized promise (`load-engine.ts:114,124`) is already settled and the `await` costs one microtask. But `!` is the wrong tool for "I believe this cannot be null" — and TypingDots.vue:68-76 shows the repo's own answer:

```ts
// TypingDots.vue:67-76
// Guards a late engine resolve against an early unmount: …
let unmounted = false;
onMounted(async () => {
    const els = dotEls.value;
    if (!els) return;
    const { CSSKeyframesAnimation } = await loadAnimationEngine();
    if (unmounted) return;
```

**Falsifier** — dies if Vue retains ref values through unmount (it does not, runtime-core:1762), or if a component provably cannot unmount within one microtask of mounting (it can: a synchronous `v-if` flip in the same flush; the scene machine switches whole trees).

---

### L-8 · `fromString` where `fromKeyframes` suffices — a full CSS-stylesheet-grammar parse, per instance, of module-constant text

**Severity** MINOR · **Provenance** `CopyButton.vue:69-93`; `src/animation/engine/css/css-animation.ts:169,176` and `:131-146`; `src/animation/compile/adapter.ts:266,278-282,219-225`

Both animations are built with `.fromString(/*css*/ \`@keyframes … \`)` (`:69-80`, `:82-93`). That routes through the heaviest available seam:

```
fromString(:169) → resolveKeyframes(:176)
  → parseSource(adapter.ts:219-225) → parseStylesheet(@mkbabb/value.js/css)   // full CSS grammar
  → pickKeyframes / collectStyleRules / recoverScrollOptions / recoverAnimationOptionsBase
```

Nothing memoizes it. `resolveKeyframes` (`adapter.ts:266`) calls `parseSource` unconditionally; `grep -rn "^const .*= new Map\|memoize" src/animation/compile/**` finds exactly one module-level map (`easing-registry.ts:50`, unrelated), and no source-string cache exists in `@mkbabb/value.js/dist/subpaths/css.js`. So **every CopyButton instance runs two full stylesheet parses at mount**, over byte-identical text that is a module constant. `KeyframeCardList.vue:4-7` renders one `KeyframeCard` — hence one CopyButton — per keyframe string, so an N-frame animation pays 2N parses in one mount flush.

The frames here carry **no** CSS-stylesheet syntax: two stops, two properties, no `@property`, no sibling style rule, no scroll grammar, no `var()`/`calc()`. `fromKeyframes` (`css-animation.ts:131-146`) takes them as a plain object and **never touches `resolveKeyframes`** — it goes straight to `addFrame` + `parse()`. That is precisely what the sibling does:

```ts
// TypingDots.vue:88-95
new CSSKeyframesAnimation<{ opacity: number }>({ … }).fromKeyframes({
    "0%":   { opacity: REST_OPACITY },
    "50%":  { opacity: 1 },
    "100%": { opacity: REST_OPACITY },
});
```

(The `0%, 100%` comma selector must expand to two keys under `fromKeyframes` — a two-line change.)

**Falsifier** — dies if a memo on `parseStylesheet` keyed by source string is found anywhere in the value.js 4.0.0 dist or the kf compile zone (searched; none), or if `fromKeyframes` is shown to funnel through `resolveKeyframes` (it does not — `css-animation.ts:131-146` contains no such call).
**Cost claim is UNPROVEN-NEEDS-LIVE**: I assert the *structure* (2N unmemoized stylesheet parses of constant text through the wrong seam), not a millisecond figure. A profile is the only thing that would rank the wall-clock impact.
**Extends `lane-library.md §4.6`**: that section's "downstream (demo) parse consumers" list omits CopyButton because it makes no *direct* value.js parser call. It is nonetheless a downstream stylesheet-grammar consumer, reached via Tier A (`fromString`), and belongs in the parser wave's blast radius at `CopyButton.vue:69` and `:82`.

---

### L-9 · `g.singleTarget = false` pokes derived state, because the group is built before its children have targets

**Severity** MINOR · **Provenance** `CopyButton.vue:95-99`; `src/animation/group/group.ts:73, 159-161, 195-204`; `src/animation/group/waapi.ts:28-31`

```ts
// :95-99
const g = new AnimationGroup(clipboardAnim, clipboardCheckedAnim);
g.singleTarget = false;                                    // :96 ← manual override
clipboardCheckedAnim.setTargets(clipboardChecked.value!);  // :98 ← targets arrive AFTER
clipboardAnim.setTargets(clipboard.value!);                // :99
```

`singleTarget` is a **derived** field. The constructor computes it (`group.ts:159-161`):

```ts
this.singleTarget = animations.every(
    (animation) => animation.targets[0] === animations[0]?.targets[0],
);
```

At `:95` both children have `targets === []`, so `undefined === undefined` → `true` → `singleTarget = true`, and line 96 exists only to undo that. The group's own `setTargets` re-derives it (`group.ts:201-204`), but it broadcasts one target set to *all* children — useless here, where the two icons need different targets. Calling `setTargets` on each child before constructing the group would derive `singleTarget = false` correctly and delete line 96. As written, the correctness of the multi-target render depends on a hand-written assignment to an undocumented field (`group.ts:73` carries no JSDoc) in the right order; drop line 96 and both animations silently composite onto the *first* icon only.

Consequence worth naming: `singleTarget === false` is a hard refusal in the group's native-lowering gate —

```ts
// src/animation/group/waapi.ts:28-31
if (!group.singleTarget || entries.length === 0) {
    return { eligible: false, reason: "group requires one shared target" };
}
```

— so despite `useWAAPI: true` being the engine default (`constants/defaults.ts:86`), the copy pulse always runs on the main-thread rAF compositor, never lowered to `Element.animate`. That is *correct* (it avoids the split-brain the module's header warns about) but it is an unstated consequence of a hand-poked field, and it compounds L-2: an unlowered, PRM-unguarded rAF loop.

**Falsifier** — dies if `singleTarget` is documented as consumer-writable public API (it is not: bare field, no doc comment, in a file where every other public field carries one), or if a child `setTargets` propagates to the group (it does not — `engine/animation.ts` has no back-edge to the group).

---

### L-10 · The two feedback channels diverge on a repeat click: AT re-arms, the icon does not

**Severity** MINOR · **Provenance** `CopyButton.vue:13-14, 33-34, 55-62`; `src/animation/internal/transport/core.ts:12-16`

The file states its own contract twice:

```
:13-14  One AT-only status sink: announces the copy to screen readers
        without a visual change (the icon swap is the sighted feedback).
:33-34  … re-armed each click so a repeat copy re-announces …
```

The AT channel honours it — `liveStatus` is cleared then re-set on the next frame (`:57-60`), which does produce two distinct DOM mutations because Vue flushes on the microtask queue *before* the rAF callback runs. The sighted channel does not:

```ts
// src/animation/internal/transport/core.ts:12-16
export function beginPlay(state, start) {
    if (state._playingPromise) return state._playingPromise;   // ← re-entrant: no restart
    …
}
```

A second click inside the 200 ms window returns the held promise and **does not replay the pulse**. So a rapid repeat copy re-announces to a screen reader and gives the sighted user nothing — the exact inverse of the comment's premise that the icon swap is the sighted feedback.

**Falsifier** — dies if `group.play()` restarts a running group (it does not; `beginPlay` short-circuits), or if the group's `_playingPromise` is cleared before the animation ends (it is cleared in `result.finally`, i.e. after settle, `core.ts:18-20`).

---

## 4. Contradictions of the hitherto corpus

### C-1 · `lane-frontend.md` S-7 (`:385`) and the injection table (`:452-453`) are **factually wrong** about the mechanism

The census claims:

> `CopyButton.vue:70` and `:83` build `@keyframes fade-in` / `fade-out` as **runtime JS template strings** and inject them — style-injection from script, bypassing the cascade entirely. That is its own defect regardless of the glass question.

and lists both lines in a table headed *"runtime JS string injection"*.

**Nothing is injected.** Traced end to end:

| step | file:line | what happens |
|---|---|---|
| 1 | `CopyButton.vue:69,82` | the literal is passed to `CSSKeyframesAnimation.fromString` |
| 2 | `engine/css/css-animation.ts:169,176` | `fromString` calls `resolveKeyframes(keyframes)` |
| 3 | `compile/adapter.ts:266,278-282` → `:219-225` | `parseSource` → `parseStylesheet` — a **parse**, returning `{ ast, issues }` |
| 4 | `css-animation.ts:204-215` | parsed stops become `templateFrames` via `addFrame` |
| 5 | `compile/value-ast.ts:386-397` | at play time, `transformTargetsStyle` does `target.style.setProperty(property, …)` |

There is no `<style>` element, no `CSSStyleSheet.insertRule`, no `document.adoptedStyleSheets`, no document-level `@keyframes` rule. The *only* CSSOM-writing method on this class is `registerProperties` (`CSS.registerProperty`, `css-animation.ts:78`, guarded by `metadata.ts:109` feature detection) — a **separate** method CopyButton never calls, and the input carries no `@property` rules to feed it.

The consequence clause is wrong in the opposite direction too: the engine paints **inline styles**, which are not "bypassing the cascade" — inline declarations are the highest-priority normal-declaration origin, i.e. maximally *inside* it, and element-scoped rather than document-global. If anything, the mechanism is more contained than the census implies, not less.

The **kernel of truth survives**, and I restate it correctly as **L-8**: authoring CSS as a JS literal in a leaf component routes constant frames through the heaviest parse seam, per instance, when `fromKeyframes` expresses them with no stylesheet parse at all. That is a seam-choice defect, not an injection defect. Recommend `lane-frontend.md:452-453` be struck from the "runtime JS string injection" table and re-filed under the parse-seam blast radius (`lane-library.md §4.6`).

### C-2 · `lane-frontend.md` F-1 (the glass-ui phantom dependency) does **not** bite this component

F-1 is real (glass-ui 7.0.0 installed, absent from both `package.json` and `package-lock.json`). It has **zero** exposure here. CopyButton's complete import set is `@lucide/vue` (`:20`), `vue` (`:22`), `@mkbabb/keyframes.js` (`:23-24`), `@utils/clipboard` (`:25`) — no glass-ui edge, direct or transitive. `@utils/clipboard`'s only third-party edge is `vue-sonner`, a **declared** devDependency (`package.json` devDeps), already resident in the app graph via `DemoGlobalChrome.vue:28,48`'s mounted `<Toaster>`. So the phantom-dep blast radius on the LIBRARY axis for this file is **nil**.

This *agrees* with S-7's own "partial shadow" framing (no copy primitive exists in glass-ui) — I record it explicitly so the CopyButton row is not swept into an F-1 remediation that would introduce the coupling it currently lacks.

**Checked and NOT defects** (recorded so a later pass does not re-litigate them):

- **Shared `options` object across two animations** (`:40-43` → `:69,82`) — safe. `engine/animation.ts:195-196` stores the reference in `_ctorOptions` but only ever **spreads** it (`{...defaultOptions, ...this._ctorOptions}`); the sole other reader, `css-animation.ts:200`, also spreads. `grep -rn "_ctorOptions" src/animation/` → 4 sites, zero mutations. No aliasing hazard.
- **Second and later plays** — work. `group.settle()` (`group/lifecycle.ts:159-171`) → child `settle()` (`engine/play-lifecycle.ts:459-468`) resets `startTime = undefined`, `t = 0`, `done`/`started` false, so click #2 re-runs cleanly. The children's `managed` flag flipping to `false` at settle is harmless: `managed` gates only direct `KeyframesAnimation.play()` (`play-lifecycle.ts:364-367`), and the group drives `advanceTo`/`interpFrames` directly (`yield-batch.ts:33`, `entries.ts:92-93`).
- **Fill mode** — a non-issue by construction. Default is `fillMode: "forwards"` (`constants/defaults.ts:84`), but both keyframe blocks are symmetric (`0%, 100%` identical), so the rest frame equals the start frame and the icons return to `scale(1)` / `opacity:0` with no cleanup code. Filed as a superlative (S-3) rather than a finding.
- **Reactive-props destructure** (`:27-30`) — correct. Vue 3.5.35 has `propsDestructure` on by default, so `text` in `handleClick` compiles to `__props.text` and stays reactive across the four call sites that bind changing values (`KeyframeCard.vue:26` `:text="frameString"`, `StartingStyleTarget.vue:59` `:text="compiledEntryCss || copyableCss"`).
- **Roving-tabindex participation** — correct and free. `useToolbarKeyboard.ts:40-47` collects `container.querySelectorAll("button")`; CopyButton's real `<button>` root is picked up with no registration. Filed as S-2.
- **`role="status"` + `aria-live="polite"`** (`:15`) — redundant (the role implies the live value) but harmless, and the belt-and-braces form is the widely-recommended one. Not a defect.
- **Focus ring** — CopyButton does **not** set `outline-none`, so the UA focus ring survives. Its toolbar sibling at `KeyframesEditor.vue:87-92` sets `outline-none focus-visible:ring-2`. Mild inconsistency; CopyButton is on the correct side of it.

---

## 5. Superlatives (L-18, running the other way)

### S-1 · Textbook LIGHT/HEAVY boundary consumption — this is the seam the library documents, used exactly as documented

**Provenance** `CopyButton.vue:23-24, 45-49, 65-67`; `src/animation/index.ts:1-27`; `demo/kf-engine.ts:16-18`

```ts
// :23-24
import type { InputAnimationOptions, AnimationGroup } from "@mkbabb/keyframes.js";
import { loadAnimationEngine } from "@mkbabb/keyframes.js";
```

Three things are right at once, and each is a separate trap the file avoids:

1. **Types static, runtime dynamic.** Heavy-side types (`AnimationGroup`, `InputAnimationOptions`) come through `import type`, erased under `verbatimModuleSyntax`; only `loadAnimationEngine` is a value import. That is verbatim the contract `src/animation/index.ts:19-21` states — *"`import type` is erased … so re-exporting heavy-side types here costs no runtime edge."* A single value-import of `AnimationGroup` would drag value.js's parser and colour graph onto the LIGHT static barrel and turn `proof:boundary` red.
2. **The published barrel, not the source.** `@mkbabb/keyframes.js`, never a deep `@src/animation/*` path — the ED-3 dogfood inversion `demo/kf-engine.ts:5-11` exists to enforce.
3. **The right accessor for this call site.** `demo/kf-engine.ts:16-18` says plainly: *"Most demo sites await `loadAnimationEngine()` directly at their point of need … This module is the ONE extra ergonomic seam for the SCENE-MACHINE hot path."* CopyButton is a leaf with an async mount and no synchronous-construction pressure, so the direct accessor is the correct choice, not the `kfEngine()` shortcut. Since `main.ts:50-53` awaits `warmKfEngine()` before `app.mount()`, the memoized promise (`load-engine.ts:114,124`) is already settled and CopyButton shares the same chunk at zero cost.

And the comment at `:45-48` states the reasoning and the null-guard invariant in three lines. This is the reference implementation of the boundary for a leaf component.

**Falsifier (superlatives run both ways)** — this praise dies if a static `@src` edge or a value-import of a heavy symbol is found in the file (neither is: `:20-25` is the complete import list), or if `demo/kf-engine.ts` were shown to be the mandated path for all sites (its own header says the opposite).

### S-2 · A real `<button type="button">` root — accessibility and toolbar integration for free

**Provenance** `CopyButton.vue:2-3`; `useToolbarKeyboard.ts:40-47`

`type="button"` prevents implicit form submission; the native element brings keyboard activation, focus, and the button role with no ARIA. It also means `useToolbarKeyboard`'s `querySelectorAll("button")` collects it into the roving-tabindex cohort with **zero per-item registration** — the composable's header (`:22-27`) names CopyButton as one of the three items it is agnostic to. A `<div role="button">` or a glass-ui wrapper with a non-button root would have required a registration protocol. Given lane-frontend S-7's suggestion to reshell this on glass `Button`, this property is worth protecting explicitly in any such migration.

### S-3 · Symmetric `0%, 100%` keyframes make fill-mode reasoning unnecessary

**Provenance** `CopyButton.vue:70-79, 83-92`; `src/animation/constants/defaults.ts:84`

Both blocks put the identical declaration at `0%` and `100%`. The engine's default `fillMode: "forwards"` therefore leaves the icons exactly where they started, so the component needs no completion handler, no `reset()`, no inline-style cleanup, and no fill-mode option. A one-directional `0% → 100%` authoring of the same pulse would have required all four. Small, deliberate, and load-bearing.

### S-4 · `void group.value?.play()` — the correct fire-and-forget posture, stated in one line

**Provenance** `CopyButton.vue:62`, with `:45-49`

The optional chain covers the (one-microtask) window before the engine resolves, and the explicit `void` marks the promise as intentionally unawaited rather than accidentally dropped — the idiom the library itself uses at `load-engine.ts:130` (`warmEngine`). The comment at `:45-48` explains why the null can occur and why it is safe.

This superlative is also the sharpest indictment of **L-1**: the file demonstrably knows how to name a deliberately-floated promise, and does it correctly on line 62 — while line 52 floats a genuinely failure-bearing one with no `void`, no `await`, and no `catch`.

---

## 6. INFO

- **L-11 · `AnimationGroup<any>` (`:49`).** Matches a repo-wide pattern — 13 sites (`App.vue:218`, `scene-facility/index.ts:72,83`, `useSceneMachineShellBinding.ts:28`, `scenePlaybackAdapters.ts:38,118`, `AnimationControlsGroup.vue:141`, `ControlsPaneWrapper.vue:182`, `EditorShell.vue:137`, +3 composables). So not an outlier. Worth recording only because CopyButton is the **one** of the thirteen whose vars are statically known and closed (`{ transform: string; opacity: number }`); every other site is a genuinely heterogeneous scene-machine seam where `any` is defensible. If a `Vars`-tightening pass ever runs, this is the free win.
- **L-12 · Engine-load failure is silent and permanent.** `loadAnimationEngine` memoizes with `enginePromise ??= import("./public")` (`load-engine.ts:114,124`) — a **rejected** promise is cached forever, so one transient chunk-load failure disables the engine for the session. `main.ts:50` swallows the warm's rejection (`warmKfEngine().catch(() => undefined)`) and mounts anyway. CopyButton's `onMounted` rejection is routed to Vue's `callWithAsyncErrorHandling` (a dev warning, nothing in prod), leaving `group` null forever and the button a dead icon with no signal to anyone. Nothing here is CopyButton's defect; it is the failure envelope this component sits inside, and it means the `:45-48` comment's cheerful "resolves within microtasks of mount" has an unmodelled other branch.
- **L-13 · `liveStatus` is never cleared (`:35, 59`).** After the first copy, the `sr-only` span holds "Copied to clipboard" for the rest of the session. Screen readers expose `sr-only` text in browse/virtual mode, so a stale past-tense sentence sits permanently in the accessibility tree next to a button whose name is *also* permanently past-tense (L-3). Individually trivial; together with L-3 the component's entire a11y surface describes an event rather than an affordance.
- **Folded from `lane-library.md §7.5` (failure-posture inconsistency).** The parse seam CopyButton rides is the **absorb** arm — `compile/adapter.ts:217-225` returns an empty AST plus `Diagnostic` rows on `animation.diagnostics`, never a throw (`css-animation.ts:186-191`). CopyButton never reads `diagnostics`. Not a live risk today (the CSS is a valid hardcoded literal), but it means any future edit that breaks either literal produces a **frameless, silently no-op** animation with the reason sitting unread on the object. Another argument for L-8's `fromKeyframes`, which has no parse to fail.

---

## 7. Claim ledger

| id | sev | one-line | primary provenance |
|---|---|---|---|
| L-1 | **BLOCKER** | unawaited/uncaught `copyText` + unconditional success feedback ⇒ unhandled rejection *and* a false AT announcement | `CopyButton.vue:52,54,59`; `utils/clipboard.ts:3-8` |
| L-2 | MAJOR | `group.respectReducedMotion` never set ⇒ rAF pulse runs under `prefers-reduced-motion: reduce` | `CopyButton.vue:95-101`; `group/group.ts:57`; `group/lifecycle.ts:79-81` |
| L-3 | MAJOR | `isCopied` write-once ⇒ accessible name permanently "Copied to clipboard" | `CopyButton.vue:4,32,54` |
| L-4 | MAJOR | zero intrinsic box; contract leaks to every consumer; 2 of 4 ship 16 px targets | `CopyButton.vue:5,104-113`; `EasingTarget.css:68-74` |
| L-5 | MAJOR | `useTemplateRef<HTMLElement>` false (lucide is functional ⇒ `SVGSVGElement`) and load-bearing for `tsc` | `CopyButton.vue:37-38,98-99`; `lucide-vue.d.ts:10`; `runtime-core.cjs.js:1761` |
| L-6 | MINOR | no `onBeforeUnmount`: rAF loop + naked `requestAnimationFrame` outlive unmount | `CopyButton.vue:58,65-102`; cf. `TypingDots.vue:103-107` |
| L-7 | MINOR | post-`await` `!` on refs Vue nulls at unmount | `CopyButton.vue:98-99`; cf. `TypingDots.vue:68-76` |
| L-8 | MINOR | `fromString` (full stylesheet parse, ×2 per instance, unmemoized) where `fromKeyframes` needs none | `CopyButton.vue:69,82`; `adapter.ts:266,219-225`; cf. `TypingDots.vue:88-95` |
| L-9 | MINOR | `g.singleTarget = false` pokes derived state; ordering-fragile; forfeits the WAAPI lane | `CopyButton.vue:95-99`; `group.ts:73,159-161`; `group/waapi.ts:28-31` |
| L-10 | MINOR | repeat click re-announces to AT but drops the icon pulse (`beginPlay` re-entrancy) | `CopyButton.vue:13-14,33-34,62`; `transport/core.ts:12-16` |
| L-11 | INFO | `AnimationGroup<any>` — repo-wide, but the one site with closed vars | `CopyButton.vue:49` |
| L-12 | INFO | engine-load rejection cached forever + swallowed at boot ⇒ silent permanent dead icon | `load-engine.ts:114,124`; `main.ts:50` |
| L-13 | INFO | `liveStatus` never cleared ⇒ stale sentence in the a11y tree | `CopyButton.vue:35,59` |
| S-1 | SUP | reference-grade LIGHT/HEAVY boundary consumption (`import type` + `loadAnimationEngine`) | `CopyButton.vue:23-24,45-49`; `src/animation/index.ts:19-21` |
| S-2 | SUP | real `<button type="button">` ⇒ free roving-tabindex + native a11y | `CopyButton.vue:2-3`; `useToolbarKeyboard.ts:40-47` |
| S-3 | SUP | symmetric `0%,100%` frames retire fill-mode reasoning entirely | `CopyButton.vue:70-79,83-92` |
| S-4 | SUP | `void group.value?.play()` — correct named fire-and-forget | `CopyButton.vue:62` |
| C-1 | CONTRA | lane-frontend `:385,:452-453` "runtime JS string injection / bypasses the cascade" is **false**; real mechanism is parse → inline `style.setProperty` | `css-animation.ts:169,176`; `adapter.ts:219-225`; `value-ast.ts:386-397` |
| C-2 | CONTRA | lane-frontend F-1 (glass-ui phantom dep) has **nil** exposure here — no glass-ui edge; `vue-sonner` is declared and already resident | `CopyButton.vue:20-25`; `DemoGlobalChrome.vue:28,48` |

**Law compliance.** `/Users/mkbabb/Programming/keyframes.js` was read only — no file in it, or in any other repo, was written, mutated, installed, or executed. No dev server, no browser tooling, no Playwright, no DevTools MCP. This file is the single write. Every livable-only assertion is marked UNPROVEN-NEEDS-LIVE and deferred to SS-13: the SVG `transform-origin`/`transform-box` render (L-5), the SC 2.5.8 spacing exception at the two 16 px sites (L-4), and the wall-clock parse cost (L-8).
