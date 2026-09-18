claude-opus-5[1m]

# CHALLENGE · `TypingDots.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/TypingDots.vue` (125 L)
**Sole consumer** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorStartScreen.vue:29` (`<span class="hero-dots"><TypingDots /></span>`, inside the LCP `<h1>`)
**Date** 2026-08-06 · **Repo posture** keyframes.js is READ-ONLY evidence; this file is the only write.
**No browser tooling used.** Every number below is derived from source + tokens. Where a claim is not decidable statically it is tagged `UNPROVEN-NEEDS-LIVE`.

## Read-set (whole, read-only)

| File | Why |
|---|---|
| `demo/components/instrument/shell/TypingDots.vue` | target |
| `demo/components/instrument/shell/EditorStartScreen.vue` | the only importer; owns `.hero-dots`, the type rung, the ink color |
| `demo/components/instrument/shell/AnimatedText.vue` | the sibling one span away; the PRM comparand |
| `demo/components/instrument/shell/index.ts` | barrel (does not export TypingDots) |
| `demo/kf-engine.ts`, `demo/app/main.ts:50-52` | the engine warm/mount ordering |
| `demo/styles/style.css`, `demo/styles/brand.css`, `demo/styles/playback-idiom.css` | tokens, the `@layer demo-typography` rung override, motion tokens |
| `src/animation/load-engine.ts` | `loadAnimationEngine` (memoized `import("./public")`) |
| `src/animation/orchestration/stagger.ts` | `stagger` / `StaggerFn.delays` |
| `src/animation/constants/types.ts:131-205`, `constants/defaults.ts:79-89` | `AnimationOptions`, `respectReducedMotion` contract, `fillMode: "forwards"` default |
| `src/animation/internal/reduced-motion.ts:110-180` | `withReducedMotion` / `reducedMotionScale` |
| `src/animation/engine/play-lifecycle.ts:320-396` | `playReducedMotion`, `play` |
| `src/animation/engine/animation.ts:58-170,296-352` | `fillForwards`, `usesDefaultRenderer`, per-instance `RAFPlayback` |
| `src/animation/engine/css/css-animation.ts:110-146` | `fromKeyframes` → `resolveTransform` → `_defaultTransform` |
| `src/animation/engine/option-setters.ts`, `engine/options.ts:41-47` | option normalization |
| `src/animation/compile/easing/easing-option.ts`, `easing/easing-registry.ts` | `"steps(4, jump-none)"` → `steppedEase(4,"jump-none")` |
| `src/animation/easing.ts:29-55` | `cssTwinFor` (the `^steps\(` twin) |
| `src/animation/waapi/eligibility.ts`, `waapi/waapi-options.ts`, `waapi/emission.ts`, `waapi/densify.ts` | the delegation decision + the lowering |
| `src/animation/engine/interpolate.ts:254` | per-SEGMENT easing application |
| `node_modules/@mkbabb/glass-ui/dist/styles/tokens/{color-radius,dark-arm}.css`, `typography/{scale,semantic}.css`, `tokens/scheme-motion.css` | `--foreground` / `--background` / `--type-display-mega` / `--type-tracking-display` |

## Hitherto corpus — folded, not re-invented

- **S-8** (`formation/keyframes/lane-frontend.md:387`) rules `TypingDots` **JUSTIFIED BESPOKE, do not replace** against glass-ui's `Pulse`/`PagerDots`, because the component exists to dogfood the engine. **I CONCUR.** Every finding below is orthogonal to the replace/keep question — none of them argues for a glass primitive, and D-1/D-2 would survive a swap onto `Pulse` unchanged (they are about which frame is the fallback, not about who owns the substrate).
- **S-5** (`:354`) flags `AnimatedText`'s hand-rolled `@keyframes charLift` + bespoke sr-only mirror. Relevant here only as the comparand in **D-1**: the sibling's PRM arm rests at the *legible* frame while this component's rests at the *illegible* one.
- **F-1** (`:15`, `:54`) — `@mkbabb/glass-ui` is a phantom dependency (installed 7.0.0, absent from `package.json` **and** the lock). **This bounds my own evidence**: the `--foreground`/`--background` values used in D-2's contrast arithmetic are read from an undeclared, unlocked tree. The *token-specific* numbers (1.52:1 / 1.64:1) are therefore only as reproducible as F-1 permits. The *conclusion* is not — see the backdrop-independent ceiling in D-2, which needs no token at all.
- **No contradiction of the corpus.** The census did not examine the rest-frame polarity, the PRM snap target, or the driver count; nothing I found disagrees with what it recorded.

---

# DEFECTS — 10 (BLOCKER 0 · MAJOR 3 · MINOR 5 · INFO 2)

## D-1 · MAJOR · Every non-animating path lands on the *dimmest* frame

**Claim.** The component has three paths on which motion does not run. All three resolve to `opacity: 0.2` — the least legible state the design contains. The polarity is inverted: the fallback should be the *most* legible frame.

**Provenance / mechanism.**

1. **prefers-reduced-motion.** `respectReducedMotion: true` (`TypingDots.vue:91`) → `play()` routes through `withReducedMotion` (`play-lifecycle.ts:375-381`) → binary `true` under an active query takes the **snap** arm (`reduced-motion.ts:153-165`) → `playReducedMotion` (`play-lifecycle.ts:320-330`) → `anim.fillForwards()` → `interpFrames(this.options.duration, true)` (`animation.ts:329-331`) → **t = 1200 ms = the `100%` keyframe = `REST_OPACITY`** (`TypingDots.vue:95`). `fillMode` defaults to `"forwards"` (`defaults.ts:83`), so `restPosition` is `"final"` and `paintRest`/`settle` confirm the same value. The dots are then static at 0.2 **forever**.
2. **Engine-load failure.** `demo/app/main.ts:50` is `Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(() => app.mount("#app"))` — the boot *deliberately tolerates* a failed engine chunk and mounts anyway. `TypingDots`'s own `await loadAnimationEngine()` (`:75`) re-awaits the same memoized promise (`load-engine.ts:124`), rejects, and Vue routes it to the app error handler (`runtime-core` `injectHook` → `callWithAsyncErrorHandling`). No animation is ever constructed; the scoped `opacity: 0.2` (`:123`) is the terminal rendering.
3. **Pre-resolve paint.** `:123` is the painted value until the awaited engine resolves. (Bounded here — `main.ts` warms before `mount()`, so this is one microtask, not a frame. Called out only for completeness; **not** counted as harm.)

**Why it is a design defect, not a nit.** `TypingDots` is mounted inside the LCP `<h1>` (`EditorStartScreen.vue:27-30`). Its sibling one span away gets this exactly right: `AnimatedText.vue:121-125` rests every char at its `0%/100%` frame — `translateY(0)`, **full ink**. Two components in one heading, opposite fallback polarity. And the component's own comment asserts the outcome it does not deliver: `:120-123` — *"under prefers-reduced-motion (the engine snaps to the resting frame, which the keyframe's 0%/100% sets to REST_OPACITY → readable)"*. The snap is correctly described; **"readable" is the false half** (see D-2 for the number).

**The one-line shape of the fix** (stated only to show the defect is real and cheap, not as a work order): author `0%/100%` at `1` and `50%` at `REST_OPACITY`, and set the CSS floor to `opacity: 1`. Identical motion, inverted fallback — every degradation path then lands on full ink.

**Falsifier.** Any ONE of: (a) show `fillForwards()` lands on a frame other than `100%` for this animation; (b) show `respectReducedMotion: true` under an active query reaches a path other than `playReducedMotion`; (c) exhibit a rule anywhere in the cascade that raises `.typing-dot`'s opacity under `@media (prefers-reduced-motion: reduce)` — the demo carries 9 PRM blocks (scenes, `App.skeleton.vue:95`, `AnimatedText.vue:121`) and **none** selects a `.typing-dot`; `grep -rn "typing-dot" demo/ | grep -v TypingDots.vue` is empty, so the two rules at `:111`/`:117` are the entire selector surface; (d) show `main.ts:50`'s `.catch(() => undefined)` prevents the component from mounting.

**Severity calibration (why MAJOR and not BLOCKER).** The dots are `aria-hidden` decoration; the heading still reads "Select an animation" and the page is fully usable. Nothing is functionally broken. It is MAJOR because it degrades the first-impression surface for an entire preference cohort, silently, and because the component documents the opposite.

---

## D-2 · MAJOR · The legibility floor is denominated in **alpha**, not **contrast** — so the gate is green and the pixel is a ghost

**Claim.** `REST_OPACITY = 0.2` is justified at `:51-53` against a **≥0.15 alpha floor** (`proof:typing-dots` clause (c)). Alpha is the wrong unit. A 20%-alpha composite cannot reach the 3:1 WCAG large-text floor against **any** backdrop — this is a ceiling, not a coincidence of these tokens.

**The token-specific arithmetic** (sRGB compositing, WCAG 2.x relative luminance):

| theme | ink `--foreground` | backdrop `--background` | at α=1.0 | **at α=0.2** |
|---|---|---|---|---|
| light | `hsl(24 10% 10%)` | `hsl(40 30% 98%)` (`--neutral-0`) | 16.83 : 1 | **1.52 : 1** |
| dark | `hsl(30 14% 90%)` | `hsl(24 9% 4%)` | 15.85 : 1 | **1.64 : 1** |

Tokens from `glass-ui/dist/styles/tokens/color-radius.css:1` and `tokens/dark-arm.css:1`; ink reaches the dots by inheritance from `h1.hero-display { color: var(--foreground) }` (`EditorStartScreen.vue:109`).

**The backdrop-independent ceiling** (this is what makes the claim un-killable by "but the hero sits over the aurora/cube"): the composite is `C = 0.2·ink + 0.8·backdrop`, i.e. **80% of the backdrop itself**. Maximizing contrast(C, backdrop) over all ink/backdrop pairs puts them at opposite extremes: black ink on white → **1.52:1**; white ink on black → **1.66:1**. So **no 20%-alpha text composite can exceed ≈1.66:1 against its own backdrop, ever.** The 3:1 large-text minimum is unreachable by a factor of ~1.8× regardless of what the hero is painted over. The aurora/cube backdrop is therefore irrelevant to the verdict.

**Rung-by-rung, the animated state too.** `"steps(4, jump-none)"` (`:90`) is applied **per segment** (`interpolate.ts:254` evaluates `frame.timingFunction.fn(scaled)` on segment-local progress; the two segments are `0→50%` and `50→100%`), giving the ladder `{0.2, 0.4667, 0.7333, 1.0, 0.7333, 0.4667}` on a 150 ms grid. Light-theme contrast per rung: **1.52 / 3.02 / 6.5 / 16.83 / 6.5 / 3.02**. The bottom rung occupies 300 ms of every 1200 ms — **25% of every cycle each dot is at 1.5:1**, and the second rung sits exactly *on* the 3:1 line.

**Glyph size cuts against the usual "large text is fine at low contrast" defence.** The rung is `--type-display-mega: clamp(5.382rem, 4rem + 9vw, 11.089rem)` → 86–177 px (`glass-ui/dist/styles/typography/scale.css`), but the *ink* of a full stop is a fraction of the em — on the order of 15–20 px of actual mark at the 177 px cap. Low contrast on a small mark, not on a large one. (`UNPROVEN-NEEDS-LIVE`: the exact period ink diameter in Instrument Serif — flag for the SS-13 visual audit. The contrast ceiling above does not depend on it.)

**Honest limit on the WCAG citation.** `aria-hidden="true"` (`:14`) makes the ellipsis decorative, and WCAG 1.4.3 exempts incidental/decorative text. **This is therefore not a conformance blocker, and I do not claim it as one.** It stands as a *design legibility* defect: an ellipsis rendered at 1.5:1 reads as a rendering artifact, not as punctuation. The deeper finding is the unit error — a floor expressed in alpha can be satisfied while the rendered contrast is arbitrary, which is exactly how a green gate coexists with a ghost.

**Falsifier.** Exhibit any ink/backdrop pair for which a 20%-alpha composite yields ≥3:1 against that backdrop. (Or: show the dots do not inherit `--foreground`; or that the compositing happens somewhere other than sRGB in a way that changes the ceiling by >1.8×.)

---

## D-3 · MAJOR · Three animations ⇒ three perpetual rAF drivers, where `stagger`'s own contract offers one

**Claim.** The component constructs **one `CSSKeyframesAnimation` per dot** (`:78-100`). Each animation owns its own driver — `readonly playback = new RAFPlayback()` is a per-instance field (`animation.ts:69`), and `RAFPlayback._run` calls `requestAnimationFrame` on its own chain (`physics/playback.ts:113-130`). With `iterationCount: "infinite"` → `Infinity` (`options.ts:56-63`), `done` never becomes true, so **none of the three loops ever retires** for the life of the page.

This holds on **both** backends:

- **WAAPI (the actual path).** Eligibility passes every clause: one DOM target with `.animate`; every frame carries `_defaultTransform` (`css-animation.ts:135` → `resolveTransform(undefined)` → `:114` returns `this._defaultTransform`, and `usesDefaultRenderer` is a reference test, `animation.ts:159-161`); uniform timing (one `Easing` object shared by all frames via `frame-compiler.ts:155-158`); a faithful CSS twin (`cssTwinFor("steps(4, jump-none)")` matches `CSS_FUNCTION_EASING = /^(cubic-bezier\(|steps\(|linear\(|…)/`, `easing.ts:38-54`); unitless numeric slot; no color. So `playWAAPI` runs — and it explicitly starts a **shadow tick loop** on the animation's own `RAFPlayback` (`waapi/delegation.ts:64`, `animation.playback.loop(shadowTick)`) whose continue-predicate is `!animation.done` (`:50`) — never false.
- **rAF fallback** (WebKit/`linear()` holds don't apply here, but if eligibility ever regresses): `playRAF` per animation, same count.

**Why this is the component's defect and not the library's.** `stagger`'s own docstring shows the intended composition (`orchestration/stagger.ts:15-22`):

```ts
const delay = stagger(items.length, { each: 50, from: "center" });
const group = new AnimationGroup(items.map((el, i) => ({ … options: { delay: delay(i, …) } })));
```

`stagger` is a *per-child delay distribution for an `AnimationGroup`* — the group owns one loop and seats the children with the delays. The component imports `stagger` (`:28`) and materializes its delays (`:61-63`) but then discards the composition half, hand-rolling N independent animations. **The one API that would collapse three drivers to one is the one the imported primitive is documented against.**

**The stated rationale does not survive.** `:79-84` justifies `CSSKeyframesAnimation` over `NumericAnimation` because *"an infinite blink would need a forbidden hand-rolled rAF re-loop (WV-W6-HIGH-2). The engine owns the loop."* True in letter — no rAF appears in this file. But the outcome is **three** never-terminating engine rAF loops on the LCP hero for a decorative ellipsis, where one would do. The prohibition was satisfied; its purpose was not.

**Falsifier.** Any ONE of: (a) show `RAFPlayback` multiplexes onto a shared/global rAF across instances (it does not — `_rafId` is a private per-instance field, `playback.ts:83`); (b) show `playWAAPI` retires its shadow tick under `iterations: Infinity` (`delegation.ts:50` returns `!animation.done`); (c) show an `AnimationGroup` of 3 children spins up 3 drivers rather than 1; (d) measure the three loops at zero main-thread cost. (c) and (d) are the honest ones to try — (d) is `UNPROVEN-NEEDS-LIVE` as to *magnitude*; the **count** is decidable from source and is what I claim.

---

## D-4 · MINOR · `count` is a mount-time-only prop whose own docstring promises otherwise

**Claim.** `:32` documents `count` as *"How many dots to render + drive"*. The **render** half is reactive; the **drive** half is not.

`delays` is computed once in setup body (`:61-63`), reading `props.count` non-reactively. `onMounted` (`:71`) runs once. Mutating a bound `:count` therefore: (a) re-renders the `v-for` and mounts new `.typing-dot` spans that **no animation ever targets** — they sit at the CSS `opacity: 0.2` ghost permanently (which is D-1's failure state again); (b) leaves the pre-existing animations driving now-detached elements until `onBeforeUnmount`; (c) leaves `delays` stale-length. The asymmetry is sharp — `glyph` (`:15-17`) *is* fully reactive, so one prop of two honors its contract.

**Latency of harm.** Nil today: the sole consumer is `<TypingDots />` with both defaults (`EditorStartScreen.vue:29`), and `shell/index.ts` doesn't export the component, so there is no second call site. This is why it is MINOR and not MAJOR — but `count`/`glyph` are declared public props with docstrings, i.e. an advertised surface.

**Falsifier.** Bind `:count` to a ref, increment it, and observe the newly-rendered dot pulse. (Also killed if a `watch`/`watchEffect`/`onUpdated` re-arm exists anywhere in the file — it does not; the script is 87 lines and contains exactly two lifecycle hooks.)

---

## D-5 · MINOR · `0.2` is written twice, in two languages, with nothing tying them together

**Claim.** `REST_OPACITY = 0.2` (`:53`, JS, feeds the `0%`/`100%` keyframes at `:93,:95`) and `opacity: 0.2` (`:123`, CSS, the pre-engine/failure floor) are independent literals. Changing one leaves the other silently wrong — and the desync is **invisible**, because both paths still render dots, just at different values. There is no `:style` binding, no custom property, no build-time bridge between them.

Compounding: **the component defines zero design tokens.** `CYCLE_MS = 1200` (`:46`), `STEP_MS = 160` (`:50`), `REST_OPACITY = 0.2` (`:53`) are all bespoke literals, while the demo carries a motion token vocabulary (`--duration-fast`, `--ease-standard` — `demo/styles/playback-idiom.css:33-36`, `tab-idiom.css:38-40`). No token in that vocabulary covers a 1.2 s loop, so this is not a "use the existing token" finding — it is that a *third* motion clock now exists in the demo with no name and no home.

**Falsifier.** Point to any binding (`:style`, a `--`-prefixed custom property, a shared constants module, a codegen step) that derives `:123` from `:53` — or show that a divergence between them is caught by a gate. `proof:typing-dots` clause (c) measures the *animated* minimum, which is `:53`, not `:123`.

---

## D-6 · MINOR · The `steppedEase` comment names a symbol that is nowhere in the file

**Claim.** `:25-26` reads *"`steppedEase` is the value.js CURVE for the discrete dot cadence, NOT the dogfood symbol."* It sits inside the import block, immediately under `import type { CSSKeyframesAnimation }` and above `import { loadAnimationEngine, stagger }`. `grep -c steppedEase TypingDots.vue` → the comment only. Nothing named `steppedEase` is imported, referenced, or reachable by a reader of this file.

The real seam is a **string**: `timingFunction: "steps(4, jump-none)"` (`:90`) → `normalizeTimingFunction` (`engine/options.ts:41-47`) → `resolveEasingOption` (`compile/easing/easing-option.ts:23-66`) → `resolveTimingFunction` → `parseTimingFunction` (value.js) → `fromCssTimingFunction`'s `"steps"` arm → `steppedEase(value.count, value.position)` (`compile/easing/easing-registry.ts:107-110`). Four modules and a package boundary away.

The comment is not *wrong* about where the curve ends up — it is wrong about **where a maintainer will find it**, which is the only thing an import-block comment is for. It also encodes an H-era gate assertion (`proof:dogfood-hero`: *"steppedEase resolves from @mkbabb/value.js"*) as if it were a fact about this file.

**Falsifier.** `grep -n steppedEase demo/components/instrument/shell/TypingDots.vue` returning a non-comment line.

---

## D-7 · MINOR · `display: inline-block` on `.typing-dot` is a dead declaration

**Claim.** `.typing-dot { display: inline-block }` (`:118`) has zero effect. The dot spans are flex items of `.typing-dots` (`display: inline-flex`, `:112`), and **flex items are blockified** (CSS Display §2.7) — `inline-block` computes to `block`. The declaration reads as intentional (it is the first line of the rule, above a 4-line comment about painting) but expresses nothing.

Harmless in isolation; it matters because it is a *false signal* — a reader debugging dot layout will reason about inline-block metrics that the box model never sees.

**Falsifier.** Show `.typing-dots` does not apply (it is the direct parent, `:14-18`), or that the target engines do not blockify flex items.

---

## D-8 · MINOR · No `forced-colors` arm — the one mode whose purpose is guaranteed contrast

**Claim.** `grep -rn "forced-colors" demo/` returns **zero hits** across the entire demo. Under Windows High Contrast / `forced-colors: active`, the UA forces `color` to `CanvasText` but **does not neutralize `opacity`** — so both the animated rest rung and the D-1 static ghost survive into forced-colors mode at the same alpha. The single mode a user enables *because* they need guaranteed contrast is the mode in which this ornament stays a ghost.

Honest scoping: this is a demo-wide gap, not a TypingDots invention. It is filed here because TypingDots is one of the few surfaces that dims *text ink* by alpha rather than by choosing a dimmer token — the only construction `forced-colors` cannot repair.

**Falsifier.** A UA that clamps `opacity` to 1 under `forced-colors: active`, or a `@media (forced-colors: active)` rule reaching `.typing-dot`. I checked the one candidate: glass-ui ships exactly one such block (`dist/styles/accessibility.css`) and it selects only `[aria-current]/[aria-selected]/[aria-pressed]/[aria-checked]/[data-state]/[aria-invalid]` and sets only `border-*` — it neither matches the dots nor touches `opacity`.

---

## D-9 · INFO · `.delays(props.count)` re-passes the argument the API already defaults

`:61-63` is `stagger(props.count, {…}).delays(props.count)`. `StaggerFn.delays(total = defaultTotal)` defaults to the construction-time count (`stagger.ts:173`), and the docstring calls this out explicitly (`:66-69`: *"Both `total` args are OPTIONAL … so `fn(i)` and `fn.delays()` are valid"*). `.delays()` is the contracted call.

Trivial, but it is the second place in this file where the imported primitive's documented shape is not the shape used (see D-3).

**Falsifier.** Show `.delays()` with no argument returns something other than `.delays(props.count)` for this construction.

---

## D-10 · INFO · Identity mismatch: named as a chat typing indicator, realized as hero punctuation

The component is named `TypingDots` and documented as *"the typing-indicator dots"* (`:2`) — the chat-bubble idiom, which is three round dots with visible gaps. What ships is a **text ellipsis**: three `.` glyphs of the ambient display serif, with **no `gap`**, no spacing control, and no size independent of the surrounding type. Mounted as the trailing punctuation of a poster headline (`EditorStartScreen.vue:29`, inside `.hero-dots { white-space: nowrap }`).

The `count`/`glyph` props advertise a general dots primitive that the realized form cannot serve: `:count="5"` renders `.....` (five full stops), not five dots — a legitimate ellipsis at 3 and a typographic error at any other value. The prop is a generality the form does not have.

Nothing is broken; the ellipsis reads correctly at its one call site. Filed as INFO because the naming will mislead the next consumer, and because it is the reason the `count` prop (D-4) has never been exercised.

**Falsifier.** A second consumer passing non-default `count` or `glyph` (`grep -rn "TypingDots" demo/` → one import, one usage, both default).

---

# SUPERLATIVES — 9 (L-18 runs both ways)

## L-1 · The a11y mirror is exactly right

`aria-hidden="true"` on the host (`:14`) means the `<h1>`'s accessible name resolves to `AnimatedText`'s single sr-only span, "Select an animation" (`AnimatedText.vue:21`) — no per-glyph stream, no orphan "period period period" tail, no duplicated ellipsis. This is the correct call and it is *not* the obvious one: the tempting alternative (`role="status"` / `aria-live`, because "typing indicator") would announce a decorative ornament on a start screen where nothing is loading. The component chose decoration and then honored it consistently.
**Falsifier.** An AT dump of the `<h1>` announcing anything beyond "Select an animation".

## L-2 · `align-items: baseline` is load-bearing, not decoration

`:114` neutralizes the classic inline-flex baseline hazard: per CSS Flexbox §8.5, an inline-level flex container with **no** baseline-aligned item synthesizes its baseline from its border box, which would drop the ellipsis below the 177 px hero baseline. With `align-items: baseline` the container's baseline *is* the dots' baseline. The comment at `:113` names exactly this. The author introduced a mechanism and disarmed its one trap in the same rule.
(Fair counterweight: plain `display: inline` would have had no trap to disarm — the flex container is heavier than the job requires, and with `letter-spacing: 0` forced on the display rungs by `demo/styles/style.css:263-272` there is provably **no** rendered delta between the two. Not filed as a defect precisely because the delta is zero and the hazard is handled.)
**Falsifier.** Delete `:114` and observe no baseline shift.

## L-3 · The stagger arithmetic actually works, and the near-collision is survived

`STEP_MS = 160` sits within 7% of the step quantum (600 ms ÷ 4 = 150 ms) — the setup for a march that collapses into a synchronous blink. It does not. Per-dot phase offsets are 0 / 160 / 320 ms on the 6-rung ladder `{0.2, 0.4667, 0.7333, 1.0, 0.7333, 0.4667}` (dwell 300/150/150/300/150/150 ms). Computing the windows over one 1200 ms period:

- **all three at peak (1.0)**: dot0 `[450,750)`, dot1 `[610,910)`, dot2 `[770,1070)` — pairwise intersections exist, the triple intersection is **empty**.
- **all three at rest (0.2)**: dot0 `[1050,1200)∪[0,150)`, dot1 `[10,160)`, dot2 `[170,320)` — triple intersection **empty**.

So there is no instant at which the ellipsis is uniformly bright or uniformly dim; the `· → ·· → ···` march the comment promises at `:48-49` is what the numbers deliver.
**Falsifier.** Exhibit a `t ∈ [0,1200)` at which all three dots share a rung.

## L-4 · The compositor lowering does **not** smear the staircase — and this is non-obvious

The natural suspicion: 3 keyframes → 2 segments → `multiSegment` → `toWAAPIOptions` emits effect easing `"linear"` (`waapi-options.ts`) and the staircase becomes a ramp. It does not, and the reason is arithmetic. `canDensifyWAAPISlots` returns true (opacity is a stable single numeric slot with an invariant template, `densify.ts:69-89`), so `bakeCurve` is on and `densifyInteriorTimes` refines against the **true rAF curve**. The three discontinuities of `steps(4, jump-none)` over `[0,600]` sit at t = 150/300/450 — **exact dyadic midpoints**. Best-first bisection (`densify.ts:283-313`) therefore lands on all three within its first three splits, and the remaining budget (`WAAPI_MAX_SUBSEGMENT_STOPS = 16`, `:45`) shrinks each residual ramp to ≈ 600/2⁵ ≈ **19 ms — about one 60 Hz frame**. The authored discreteness survives delegation intact.
This is a genuine design win: the component gets compositor-thread visuals *and* keeps the step character it chose the easing for.
**Falsifier.** Instrument `toWAAPIKeyframes` for this animation and find any residual ramp wider than ~2 frames, or show `canDensifyWAAPISlots` returns false here.

## L-5 · Degenerate counts are total, not lucky

`count = 0`: `v-for="i in 0"` renders nothing, no ref registers, `dotEls.value` stays null, and `:73`'s `if (!els) return` exits cleanly. `count = 1`: `stagger(1,…).delays(1)` hits the `total <= 1 → 0` arm (`stagger.ts:155`) rather than dividing by a zero `maxDistance`. Negative counts render nothing. **No value of `count` throws or produces `NaN` delays** — and the library's own guard (`stagger.ts:155-158`) is what makes the degenerate case safe, so the totality is inherited honestly rather than papered over locally.
**Falsifier.** A `count` value that throws, NaNs, or leaves an animation targeting `undefined`.

## L-6 · The late-resolve / early-unmount race is closed correctly

`let unmounted = false` (`:69`) is checked **after** the await (`:76`), not before it — the ordering that matters. A component torn down while the engine promise is in flight never reaches `play()`, so no driver is created for a detached tree. `onBeforeUnmount` (`:103-107`) sets the flag, `stop()`s every animation (cancelling both the WAAPI handles and the rAF chain, `delegation.ts:30-32`), and empties the array. This is the correct three-part shape and it is frequently gotten wrong.
**Falsifier.** Unmount during the await and observe a live driver or an inline style write to a detached node.

## L-7 · WCAG 2.3.1 (flash) — checked and **cleared**

Worth stating because a pulsing high-contrast ornament is exactly the shape that trips this. Each dot completes one 0.2↔1.0 excursion per 1200 ms = **0.83 Hz**, far under the 3 Hz general-flash threshold; the group's aggregate transition rate is ~2.5/s but no single element flashes above 0.83 Hz. The flashing area — three full stops — is orders of magnitude below the "25% of the central 10° of vision" size threshold. **No violation.** The `CYCLE_MS = 1200` choice (`:44-46`, deliberately fixed rather than text-length-derived) is what keeps it there.
**Falsifier.** Measure >3 luminance reversals/sec on any single `.typing-dot`.

## L-8 · Zero custom-property surface — no contribution to the flat-namespace hazard

The census flags the flat `--kf-*` namespace as a collision hazard. This component declares **no** custom property at all — `grep -c '^\s*--' TypingDots.vue` → 0. Its entire style surface is two class rules and four declarations. Whatever the namespace hazard costs elsewhere, it is not paid here.
(This is the honest twin of D-5: the same austerity that avoids the namespace hazard is what leaves `0.2` written twice with no binding. Recorded as a superlative and as a defect because it is genuinely both.)
**Falsifier.** Any `--`-prefixed declaration in the file.

## L-9 · RTL is correct — inherited, not authored

`display: inline-flex` (`:112`) takes its main axis from the computed `direction`, so under `dir="rtl"` the DOM-first dot (delay 0) renders **rightmost** and the stagger march runs right-to-left — i.e. along the reading direction, which is what the comment at `:57-60` claims to want ("the monotone left-to-right ramp the reader's eye expects"). `from: "first"` needs no RTL branch.
**Honest caveat, stated as such**: this is untested correctness, not exercised correctness — `grep -rn 'dir="rtl"' demo/` returns nothing, the demo is LTR-only, and the same result would follow from plain inline flow. Credit for not *breaking* RTL (e.g. by hardcoding `flex-direction: row` or positioning by index), not for engineering it.
**Falsifier.** Set `dir="rtl"` on the `<h1>` and observe the wave running against the reading direction.

---

# Summary

| | count |
|---|---|
| BLOCKER | 0 |
| MAJOR | 3 (D-1, D-2, D-3) |
| MINOR | 5 (D-4, D-5, D-6, D-7, D-8) |
| INFO | 2 (D-9, D-10) |
| **defects** | **10** |
| **superlatives** | **9** |

**The one sentence.** `TypingDots` is a carefully-reasoned, arithmetically-correct little machine (L-3, L-4, L-5, L-6, L-7) built on one inverted premise: it treats the **dim** frame as the resting state, so prefers-reduced-motion, engine failure, and first paint all converge on a rendering that cannot exceed ≈1.66:1 against anything (D-1, D-2) — and it pays three perpetual rAF drivers for a decorative ellipsis where the primitive it already imports documents one (D-3).

**Carried to SS-13 (live visual audit), `UNPROVEN-NEEDS-LIVE`:** the period-glyph ink diameter at the 177 px mega rung; the *magnitude* (not the count) of the three shadow-tick loops' main-thread cost; the actual local backdrop under `.hero-dots` (aurora/cube/graph-paper composite) — noting that D-2's ceiling makes the verdict backdrop-independent, so this is confirmatory only.

**Bounded by F-1:** the light/dark contrast figures in D-2's table derive from an undeclared, unlocked `@mkbabb/glass-ui@7.0.0`. Fix F-1 before treating those two numbers as reproducible. The ≤1.66:1 ceiling needs no token and is unaffected.
