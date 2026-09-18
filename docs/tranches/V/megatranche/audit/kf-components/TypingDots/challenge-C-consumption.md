claude-opus-5[1m]

# CHALLENGE · TypingDots · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/TypingDots.vue` (125 L)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choice, shadow census, value.js transitive exposure, props/emits contract, sibling seams.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim carries severity + `file:line` + its falsifier. Four claims I formed while reading were then **killed by the tree** and are recorded in §4 rather than shipped as findings — a false defect is worse than a missed one.
**No browser tooling.** Anything that needs pixels is marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Tally — 8 defects (0 BLOCKER · 2 MAJOR · 5 MINOR · 1 INFO) · 4 superlatives · 4 killed claims.**

Read whole (read-only): the component; its sole consumer `EditorStartScreen.vue`; its sibling `AnimatedText.vue`; `shell/index.ts`; `demo/kf-engine.ts`; `demo/app/App.vue`, `main.ts`, `EditorShell.vue`; `CopyButton.vue`; `vite.config.ts`; `package.json`. Library evidence: `src/animation/{index,easing}.ts`, `orchestration/stagger.ts`, `constants/{types,defaults}.ts`, `engine/{play-lifecycle,options,option-setters,interpolate,animation}.ts`, `engine/css/css-animation.ts`, `compile/{frame-compiler,value-ast}.ts`, `compile/easing/{easing-option,easing-registry}.ts`, `waapi/{eligibility,waapi-options,delegation,densify}.ts`, `group/{waapi,types,group,lifecycle}.ts`, `internal/reduced-motion.ts`, `physics/playback.ts`. Installed artifacts: `node_modules/@mkbabb/value.js@4.0.0`, `node_modules/@mkbabb/glass-ui@7.0.0`.

---

## 0. The consumption shape in one paragraph

TypingDots is the demo's **thinnest engine consumer**: two value imports off the bare root barrel (`loadAnimationEngine`, `stagger` — `:28`), one erased type import (`:27`), a mount-time `await`, N single-target `CSSKeyframesAnimation`s each looping `iterationCount: "infinite"`, and a teardown. It consumes **zero glass-ui**. Its keyframes.js consumption is, on the boundary question, *better than the library's own documented example* (§3). Its **props contract and its sibling seam are where it is defective** (§1 C-1, C-2), and its design-system consumption is a null it should not be (§1 C-3).

---

## 1. Defects

### C-1 · MAJOR · `count` is a public reactive prop wired to a mount-once, non-reactive engine binding

`count` is declared optional-with-default (`:32-33, 38`) and is advertised as a live knob by the wave record that created the component: *"`<TypingDots :count="5" />` would render five"* (`keyframes.js/docs/tranches/H/audit/harden/impl-w6w4-w6.md:27`). The template honors it reactively (`v-for="i in count"`, `:15`). **The engine wiring does not.**

- `:61-63` — `const delays = stagger(props.count, {…}).delays(props.count)` runs **once, in setup scope**. Not a `computed`, not inside a `watch`. `props.count` is read exactly once and frozen.
- `:71-101` — `onMounted` enumerates `dotEls.value` **once** and pushes one animation per element into a module-scope `anims` array (`:65`).
- `:103-107` — `onBeforeUnmount` is the **only** place `anim.stop()` is ever called.

Consequences of a `count` change on a mounted instance:

| direction | outcome | mechanism |
|---|---|---|
| `count` ↑ | the new `<span>`s render the glyph and **never animate** — they sit at the scoped `opacity: .2` (`:123`) forever | no `onMounted` re-run; `anims` is never extended |
| `count` ↓ | the removed element's `CSSKeyframesAnimation` stays live in `anims` **and keeps a WAAPI effect + a shadow rAF loop running against a detached node** | `stop()` is unmount-only (`:105`); the shadow loop is `delegation.ts:64 animation.playback.loop(shadowTick)` and, with `iterationCount: Infinity`, `animation.done` is never true so `shadowTick` never returns `false` (`delegation.ts:53-63`) |
| `count` unchanged, `delays` stale | n/a today | `delays` also freezes `STEP_MS`-scaled offsets against the *setup-time* count; a count change would leave `delays.length ≠ dots.length` and `delays[i] ?? 0` (`:88`) silently collapses the tail dots to zero delay |

**Falsifier.** Any of: (a) a `watch(() => props.count, …)` re-arm — absent, the file is 125 L and was read whole; (b) a doc or type marking `count` construction-time-only — the opposite exists (`impl-w6w4-w6.md:27`); (c) `stop()` being reachable outside unmount — it is not; (d) the WAAPI/rAF loop self-terminating on element detach — it does not (`delegation.ts:53` gates only on `animation.done`, and `iterationCount: Infinity` never sets it; `play-lifecycle.ts:139` takes the `else` branch forever).

**Not a BLOCKER** only because the single live call site passes no props (`EditorStartScreen.vue:29 <TypingDots />`). The contract is the defect, not today's render.

---

### C-2 · MAJOR · the hero mounts two incompatible motion authorities in one `<h1>`, and TypingDots' props contract has no seam to join them

`EditorStartScreen.vue:27-30` is one headline:

```
<h1 class="hero-display text-display-mega p-0">
    <AnimatedText :text="title" />
    <span class="hero-dots"><TypingDots /></span>
</h1>
```

Two adjacent inline runs, two entirely different motion stacks:

| | `AnimatedText` | `TypingDots` |
|---|---|---|
| driver | pure CSS `animation: charLift var(--wave-cycle) infinite both` (`AnimatedText.vue:100`) | engine `CSSKeyframesAnimation` (`:86-96`) |
| per-glyph phase | hand-rolled arithmetic `(word.startIndex + ci) * offsetMs` written as an inline style (`AnimatedText.vue:39`) | the library's `stagger` primitive (`:61-63`) |
| PRM authority | hand-written `@media (prefers-reduced-motion: reduce) { animation: none }` (`AnimatedText.vue:121-125`) | `respectReducedMotion: true` → the shared `withReducedMotion` gate (`:91`, `internal/reduced-motion.ts:139-153`) |
| a11y | bespoke `sr-only` mirror + `aria-hidden` visual layer (`AnimatedText.vue:7-9, 21-23`) | `aria-hidden` only (`:14`) |
| cycle | 3600 ms | 1200 ms |

The library ships the primitive that collapses the left column into the right: `splitText` (`src/animation/index.ts:107`) — *"a11y-first text-splitter (LIGHT: composes `stagger` + the platform Intl.Segmenter) … Returns a fragment cohort + a ready stagger; the container keeps the whole pre-split string as its accessible name (aria-label + aria-hidden fragments)"* — which is, line for line, the contract `AnimatedText.vue:7-9,21-45` hand-rolls. So `inv-ζ` (*"the chrome runs on its own engine"*, `docs/tranches/H/H.md:102`) is **half-kept on a single DOM node**.

The part that is **TypingDots' own defect**, not its sibling's: the wave is specified as *"one ripple crossing the line, left to right"* (`AnimatedText.vue:16-18, 96`). The dots sit at the end of that line and restart the ramp from zero — `from: "first"` with no offset (`:61`). To continue the ripple the dots need to start at the sibling's last char index × its `offsetMs` (17 × 55 ≈ 935 ms). **TypingDots exposes no parameter that could carry it.** Its whole props surface is `{ count?, glyph? }` (`:32-35`): no `initialDelayMs`, no `each`, no `from`, no `cycleMs` — the four knobs its own internals hardcode as `STEP_MS`/`CYCLE_MS`/`"first"` (`:46, 50, 61`). The demo's own design record already prescribes the fix and names this component as the reference: *"`stagger(...)` (mirror TypingDots.vue:66) and apply them as `animationDelay`"* (`keyframes.js/docs/frontend-design/demo/home.md:420`) and *"the orchestration…"* (`:208`) — the direction of travel is the sibling adopting `stagger`, and TypingDots is not shaped to meet it.

**Falsifier.** (a) A phase-continuation prop existing under another name — the props block is 6 lines, read whole, it does not. (b) The two runs being intended as independent ornaments — contradicted by `AnimatedText.vue:16-18` ("the wave sweeps the whole line, never restarting") and by `home.md:94` ("their idle loop and `TypingDots` blink — but there is no *arrival*"). (c) The perceptual half — whether a reader actually sees the ripple break at the dots — is `UNPROVEN-NEEDS-LIVE`; the **structural** half (no seam exists in the contract) is source-final.

---

### C-3 · MINOR · glass-ui consumption is zero where a published JS token exists for exactly this cascade

`STEP_MS = 160` (`:50`) is a bare literal justified only by prose ("~0.16s gives a `. → ·· → ···` march"). glass-ui 7.0.0 — the installed design system — publishes the stagger canon **twice**, and one of the two forms exists specifically for JS-driven cascades like this one:

- CSS: `--motion-stagger-default: 80ms` (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css`).
- **JS/TS**, on the `./tokens` subpath: `export declare const motionStagger: { readonly tight: 40; readonly default: 80; readonly relaxed: 120 }` (`node_modules/@mkbabb/glass-ui/dist/styles/tokens.d.ts:43-47`), whose docblock states the intent verbatim: *"Stagger increments (ms) for animation cascades driven from JS … so the JS-driven cascade and CSS-driven [cascade stay in lockstep]"* (`tokens.d.ts:29-33`).

`160` is not any of the three canon rungs; it is `2 × default`. The demo imports glass-ui at **76 sites** and from the `./tokens` subpath at **zero** (`grep -rn "glass-ui/tokens" demo/` → empty), so this is the demo-wide posture and not a TypingDots invention — but TypingDots is the demo's *only* JS-driven per-element stagger, i.e. the exact and only case the token was published for.

**Falsifier.** (a) The token not existing in the pinned artifact — it does, cited above. (b) kf's demo owning a competing stagger canon — it does not: `grep -rn stagger demo/` finds only `useSequenceDemo.ts:64 STAGGER_EACH = 260` (another off-canon literal) and prose. (c) A ruling that the kf demo deliberately floats free of glass-ui motion tokens — none found in the V/U/T tranche records.

**Rider.** This finding is downstream of **F-1** (`value.js/docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md:15, 54-70`): glass-ui is a phantom dependency, absent from `package.json` and the lockfile. Any wave that opens the `/tokens` door must land F-1 first.

---

### C-4 · MINOR · the `async onMounted` has no rejection boundary

`:71` `onMounted(async () => { … await loadAnimationEngine() … })`. There is no `try`/`catch` and no `.catch()`. Two throw sites are reachable through this await:

1. **Chunk-load failure.** `loadAnimationEngine()` is a dynamic `import("./engine")` (`src/animation/index.ts:308` → `load-engine.ts`). A stale hashed chunk after a deploy, or a network failure, rethrows with the failure named (`easing.ts:79-86` is the sibling pattern). Genuinely reachable in production SPAs.
2. **Fail-explicit option normalization.** `timingFunction: "steps(4, jump-none)"` (`:90`) → `normalizeTimingFunction` (`engine/options.ts:42-46`) → `resolveEasingOption`, which **throws** `AnimationOptionError` on an unresolvable string (`compile/easing/easing-option.ts:44-58`). Unreachable today because the literal is a compile-time constant and `@mkbabb/value.js` is pinned exact (`package.json:69 "@mkbabb/value.js": "4.0.0"`), but the throw is by design and the component takes no posture on it.

Result on either path: an **unhandled promise rejection** (Vue does not await the hook's returned promise for error-boundary purposes here), plus dots frozen at the scoped `opacity: .2` (`:123`) — which is **pixel-identical to the PRM rest frame** (§3 S★-4). The visual degradation is graceful by design; the silent rejection is not. Note the repo runs a console budget harness (`scripts/lib/console-budget.mjs`, attached per-page in `scripts/observe/demo/live-session.mjs:1162`), so an unhandled rejection is a measured surface, not merely cosmetic.

**Falsifier.** A global `app.config.errorHandler` or an `onErrorCaptured` ancestor that catches async-hook rejections — `errorHandler` does **not** receive unhandled rejections from an `async` lifecycle hook whose promise nobody holds; `demo/app/main.ts` registers no handler. If one is added, this drops to INFO.

---

### C-5 · MINOR · three of the numeric constants cite a retired gate as their authority

The component justifies its three tuned constants against named clauses of `proof:typing-dots`:

- `:45` — "1.2s total holds under **proof:typing-dots (d)**'s ≤1.6s ceiling"
- `:51` — "the perceptual fix + **proof:typing-dots (c)**'s ≥0.15 floor"
- `:59` — "the monotone left-to-right ramp … (**proof:typing-dots (b)**)"

That gate no longer exists. `scripts/gates/` contains only `surface/` and `visual/`; the sole surviving mention is an epitaph — *"The historical typing-dots check emitted beside the library dist"* (`scripts/gates/surface/published-surface.mjs:175-176`) — and the retirement is on the record: `docs/tranches/U/waves/U.E.md:139` folds `proof:typing-dots` into `proof:demo-smoke` + owner-golden.

The surviving oracle is `scripts/observe/demo/live-session.mjs:1130-1177` (leg S2), and it checks **two** clauses, not four:

```
const controlBlinks = controlChurn.length > 0 && controlChurn.every((n) => n >= 2);   // ≈ clause (a)
const prmStatic     = prmChurn.length > 0 && prmChurn.every((n) => n === 1);          // the PRM snap
```

— i.e. "each `.typing-dot` shows ≥2 distinct computed opacities over 1.8 s" and "under PRM each shows exactly 1". **Clause (b) (monotone increasing delays) and clause (d) (cycle ≤ 1.6 s) are now unguarded**, and clause (c)'s ≥0.15 floor is only implied by the PRM leg. Two of the three cited justifications are dangling references to a dead oracle.

**Falsifier.** A gate named `typing-dots` under another path — `grep -rn "typing-dots" scripts/` returns exactly the four lines cited above and one incidental comment (`scripts/lib/demo-driver.mjs:77`). If the clauses were re-homed into `proof:demo-smoke`, the citations should be re-pointed there; I found no such re-homing in `scripts/`.

---

### C-6 · MINOR · three permanent main-thread rAF registrations on the LCP node's subtree, for a decorative ornament

The dots are WAAPI-eligible (proven in §3 S★-2), so the *visuals* run on the compositor. But `playWAAPI` installs a **JS shadow tick loop per animation** to keep the state machine coherent:

```
delegation.ts:64   animation.playback.loop(shadowTick);
delegation.ts:53   if (animation.done) return false;      ← never true for iterationCount: Infinity
play-lifecycle.ts:135-141   onEnd: iteration += 1; startTime = undefined   ← the else branch, forever
```

So each dot holds one `requestAnimationFrame` chain **for the entire lifetime of the start screen** (`EditorShell.vue:60 v-if="showStartScreen"`), doing `advanceTo` + a `playState` reconcile per frame per dot, on top of work the compositor is already doing. Three dots × 60 Hz. The LCP element is this very `<h1>` (`demo/app/index.html:39`, `demo/styles/style.css:72`), and `docs/tranches/U/audit/lane-22-perf-demo-runtime.md` is the standing perf lane for exactly this surface.

**Falsifier.** (a) `RAFPlayback.loop` self-terminating — it reschedules while `step` returns truthy (`physics/playback.ts:113-150`), and `shadowTick`'s `reconcile` returns `!animation.done` which is permanently `true`. (b) The cost being negligible — plausible; the per-frame body is O(1). **The magnitude is `UNPROVEN-NEEDS-LIVE`; the existence of three permanent rAF chains is source-final.** Reported at MINOR on that split.

---

### C-7 · MINOR · the chosen option pair (`delay > 0` + `iterationCount: "infinite"`) rides a library path whose JS clock re-arms the delay every iteration

CSS applies `animation-delay` **once**, before the first iteration. The engine's JS state machine does not:

```
play-lifecycle.ts:135   onEnd:      anim._playback.startTime = undefined;
play-lifecycle.ts:164   advanceTo:  if (startTime === undefined) { onStart(anim) … }
play-lifecycle.ts:118   onStart:    if (anim.options.delay > 0) { paused = true; return sleep(delay)… }
```

`onEnd` clears `startTime` at every iteration boundary, so `advanceTo` re-enters `onStart`, which re-sleeps the full `delay`. `RAFPlayback._run` awaits a thenable step before rescheduling (`physics/playback.ts:139-146`), so the JS iteration period becomes `CYCLE_MS + delays[i]` while the native WAAPI animation keeps an exact `CYCLE_MS`. For dot 3 (`delays[2] = 320`) that is a **27 % clock skew per cycle**, unbounded.

TypingDots is the demo's **only** site combining a non-zero `delay` with `iterationCount: infinite` on a `CSSKeyframesAnimation` (`grep -rn iterationCount demo/` — the other infinite sites, `useSquareDemo.ts:345`, `useAmigaDemo.ts:95,112,129`, `useEasingDemo.ts:292`, carry no per-instance stagger delay).

**Today this is latent, not visible.** The dots' pixels come from the native animation, which applies `delay` once; the JS side's only side effect is `paintRest()`'s inline write per iteration (`play-lifecycle.ts:132`), masked by the running `fill: forwards` effect. It becomes a real defect the moment any of: `useWAAPI: false` is set, the component runs where `Element.animate` is absent (jsdom, a test harness), or anything listens for `animationiteration`/`finished`.

**Falsifier.** Showing `onStart` is not re-entered per iteration, or `onEnd` not clearing `startTime` — both are single lines, cited. Alternatively, showing the shadow loop pauses the compositor during the re-sleep (it would then be *visible*, i.e. worse): it does not — `reconcile` is chained **after** the sleep resolves and after `begin()` clears `paused` (`delegation.ts:55-63`, `play-lifecycle.ts:120-123`), so `wa.pause()` is never reached. Reported MINOR, not MAJOR, on that split.

---

### C-8 · INFO · `.delays(props.count)` restates a number the API already closed over

`:61-63` — `stagger(props.count, { each: STEP_MS, from: "first" }).delays(props.count)`.

`StaggerFn.delays(total?)` defaults `total` to the construction-time count: *"Both `total` args are OPTIONAL: the implementation defaults them to the construction-time count … so `fn(i)` and `fn.delays()` are valid"* (`orchestration/stagger.ts:63-70`), implemented at `stagger.ts:173 fn.delays = (total: number = defaultTotal) => …`. The idiomatic call is `.delays()`. Passing the count twice creates two sources of truth for one number; any future edit that changes one and not the other silently produces a delay array of the wrong length, which `delays[i] ?? 0` (`:88`) then swallows into a zero delay rather than an error.

**Falsifier.** The default not existing in the pinned API — it does, cited. Harmless today; INFO.

---

## 2. Contract summary (props / emits / slots)

| surface | state | note |
|---|---|---|
| `count?: number = 3` | **defective** | reactive in template, frozen in the engine wiring — C-1 |
| `glyph?: string = "."` | **sound** | text content only (`:15-17`); never enters a keyframe value — §3 S★-3 |
| emits | none | correct — the component is a leaf ornament |
| slots | none | correct |
| `defineExpose` | none | correct — no imperative surface to leak |
| missing | `initialDelayMs` / `each` / `cycleMs` / `from` | the four knobs hardcoded at `:46, 50, 61`; their absence is what makes C-2 unfixable at the seam |

The **absence** of emits/slots/expose is right and deliberate — `impl-w6w4-w6.md:26` records it as the design ("No emits, no slots, no exposed methods"). The defect is entirely on the input side.

---

## 3. Superlatives (L-18 runs both ways)

### S★-1 · the light/heavy boundary is consumed exactly right, on the one node where it matters most

`:27` `import type { CSSKeyframesAnimation } from "@mkbabb/keyframes.js"` — a **type-only** import, erased under `verbatimModuleSyntax`, zero runtime edge. `:28` `import { loadAnimationEngine, stagger }` — the only two value imports, and both are **LIGHT** barrel exports (`src/animation/index.ts:94` stagger, `:308` loadAnimationEngine). The heavy constructor is reached solely through the dynamic accessor at `:75`.

The near-miss this avoids is a real, one-character-away door: `package.json:26-29` publishes `"./engine"` as a **static** subpath. `import { CSSKeyframesAnimation } from "@mkbabb/keyframes.js/engine"` would compile, would look tidier (no `await`), and would put value.js's parser + color graph on the **static entry graph of the LCP element** — precisely what `proof:boundary` exists to prevent (`src/animation/index.ts:1-25`). It also uses the **bare package specifier**, not a deep `@src/animation/*` path, honoring the ED-3 dogfood rule (`demo/kf-engine.ts:4-9`). Two correct choices, neither of which the file's own comments claim credit for.

**Falsifier.** A static value.js edge reachable from either import. `stagger` pulls `clamp` from `internal/leaves.ts:28`, which re-exports `@mkbabb/value.js/math` — a **verified-clean, grammar-free 2-module ~1.4 KB subpath** (`internal/leaves.ts:6-19`, gated by `proof:boundary`'s `math-subpath-clean` clause). That is the *only* static value.js byte the component adds, and it is the allow-listed one. The superlative survives.

### S★-2 · N standalone single-target animations is the **only** shape that keeps this on the compositor — and it contradicts the library's own documented example

I formed the obvious criticism first: `stagger`'s own docblock pairs it with `AnimationGroup`, and TypingDots uses only half the idiom —

```ts
// orchestration/stagger.ts:16-23
const delay = stagger(items.length, { each: 50, from: "center" });
const group = new AnimationGroup(items.map((el, i) => ({
    animation: fadeIn(el), options: { delay: delay(i, items.length) },
})));
```

**The tree kills the criticism twice over.**

1. **A group would demote all three dots to the main thread.** `isGroupWAAPIEligible` refuses any multi-target group outright — `group/waapi.ts:31-33`: *`if (!group.singleTarget || entries.length === 0) return { eligible: false, reason: "group requires one shared target" }`*. Three dots are three distinct elements, so `singleTarget` is false (`group/group.ts:159-161`) and `lowerGroupWAAPI` returns `null` (`group/waapi.ts:60`) — the whole cohort falls to the rAF compositor. As three **standalone single-target** animations they each pass `isWAAPIEligible` (default renderer `animation.ts:155-161` · uniform easing with a `steps()` CSS twin `easing.ts:36-38, 52` · unitless numeric slots, no color, no layout unit `waapi/eligibility.ts:198-260`) and each lands on the compositor.
2. **The documented example does not even typecheck against the shipped API.** `AnimationGroupInput` is `KeyframesAnimation | { animation, layer? }` (`group/types.ts:26-29`) — there is **no `options` member**. A consumer who followed `stagger.ts:16-23` literally would fail to build. TypingDots did not follow it.

The component's own comment gives a *different* and also-true reason for the shape (`:79-83`: `NumericAnimation.play()` is single-pass, an infinite blink would need a forbidden hand-rolled rAF re-loop). The compositor reason is the deeper one and is unstated. **This is a non-obvious correct consumption decision that survives adversarial reading — and it means the library's canonical `stagger` example is the artifact that needs fixing, not this component.**

### S★-3 · the R1 / value.js parser-crash family is **structurally unreachable** from this component's data path — verified at the library, not asserted

The header comment claims it (`:9-11`: *"only numeric opacity is interpolated, so no string ever reaches a `_lerp` value position"*). The library confirms it:

```ts
// compile/value-ast.ts:67-77
const parseAuthoredValue = (value: unknown, key: string): CssValue => {
    if (isCssValue(value)) return value;
    if (typeof value === "number") return scalarNumber(value);      // ← hand-built, NO parse
    if (typeof value === "string") { const parsed = parseCssValues(value); … }
```

All four keyframe values are numeric literals (`:93-95`, via `REST_OPACITY`), so value.js's `parseCssValues` is never entered; `glyph` is text content (`:15-17`), never a keyframe value; no color property is animated, so `parseCssColor` — the **R1 shipping-crash family** — has no call path here at all.

The **one** value.js parse the component does trigger is `"steps(4, jump-none)"` (`:90`) → `resolveTimingFunction` → `parseTimingFunction` → `steppedEase(4, "jump-none")` (`compile/easing/easing-registry.ts:106-110, 122-133`). I checked it against the **pinned artifact rather than the spec**: `node_modules/@mkbabb/value.js/dist/subpaths/css.js` carries `jump-none` (6 occurrences) and `dist/subpaths/easing.js` carries it (3), with `dist/subpaths/easing.d.ts:87 steppedEase(count: number, position?: JumpPosition)`. Both halves are supported; the dependency is pinned **exact** (`package.json:69 "4.0.0"`), so this cannot drift under the component. Clean.

### S★-4 · the PRM resting frame is correct **by construction**, and three independent degradation modes land on one pixel

`respectReducedMotion: true` (`:91`) → `play` routes through `withReducedMotion` (`play-lifecycle.ts:375-381`) → `playReducedMotion` (`:320-329`) → `anim.fillForwards()` (`engine/animation.ts:329-331`) → `interpFrames(duration)` → the **100 % frame**, which the component authored as `REST_OPACITY` (`:95`). That is `0.2` — byte-identical to the scoped CSS floor `.typing-dot { opacity: 0.2 }` (`:123`), and identical to what the element shows if the engine never resolves at all (C-4). **PRM rest, pre-first-frame paint, and total engine failure are the same pixel.** The comment at `:118-123` claims this; the engine proves it.

Two details make it correct rather than lucky, neither of which the file names:

- `defaults.ts:84 fillMode: "forwards"`. Had the component (or a future edit) set `fillMode: "none"`, `restPosition` would be `"initial"` and `fillForwards`'s paint would be clobbered on the completion path — the PRM contract would silently invert. The component inherits the right default rather than declaring it, which is a latent fragility but not today's defect.
- `playFrame` re-consults `withReducedMotion` **every tick** (`play-lifecycle.ts:213-222`), so an OS toggle mid-session snaps a running infinite animation to rest (`snapToReducedMotion`, `:342-352`). The sibling `AnimatedText` gets live PRM for free from CSS (`AnimatedText.vue:121-125`); the engine path had to earn it, and `respectReducedMotion: true` is exactly the two words that buy it. This is a genuinely well-reasoned option choice.

Against the surviving oracle: `live-session.mjs`'s `prmStatic` clause requires **exactly one** distinct computed opacity per dot over 1.8 s under `reducedMotion: "reduce"`. With the CSS floor and the snapped inline write both at `0.2`, the set size is 1. The contract satisfies its own gate by construction.

---

## 4. Claims I formed and the tree killed

Recorded because L-18 cuts both ways and a false defect is worse than a missed one.

**K-1 · "`steps(4, jump-none)` silently degrades to a linear ramp on the WAAPI lane."** The lowering *is* suspicious: for a multi-segment animation `toWAAPIOptions` emits effect easing `"linear"` and delegates fidelity to keyframe densification (`waapi/waapi-options.ts:86-92`), and a step function is a staircase that piecewise-linear fill cannot represent exactly. **Killed by arithmetic.** `densifyInteriorTimes` spends a 16-stop budget **per segment** best-first on the largest chord error (`waapi/densify.ts:216-305`, `WAAPI_MAX_SUBSEGMENT_STOPS = 16` at `:45`). `steps(4, jump-none)` has 3 risers per 600 ms segment, so ~5 bisections each → residual riser ≈ 600/2⁵ ≈ **19 ms ≈ 1.1 frames at 60 Hz**. Not perceptible. No defect.

**K-2 · "not exported from the zone barrel."** `shell/index.ts` exports `EditorShell`/`EditorHeader`/`EditorStartScreen`/`SharePopover` but neither `TypingDots` nor `AnimatedText`. **Killed by the standing rule**: the colocation edict names both as *sub-components* of `EditorStartScreen`, deep-imported by their peer (`keyframes.js/docs/tranches/U/audit/lane-18-demo-instrument-editors-shell-state.md:88`; `EditorStartScreen.vue:62-63` is the deep import). Correct as-is. (Orthogonally: `EditorHeader` **is** barrel-exported and is flagged dead by `U.B.md:135` — not this component's concern.)

**K-3 · "S-8 is over-generous; glass-ui already ships the primitive."** I re-ran the shadow census against glass-ui 7.0.0 rather than trusting the lane. **The lane is right and I corroborate it.** `Pulse` is a *state mark* (`dist/components/pulse/Pulse.vue.d.ts` — `state?: PulseState`, `label?`), not a typing indicator. `useStagger` is a **one-shot boolean reveal** cascade (`dist/composables/motion/useStagger.d.ts` — `revealed: Ref<boolean[]>`, `start()`, `isComplete`), not an infinite per-glyph pulse. `PagerDots` is pagination. No glass-ui primitive has this shape. **S-8 "JUSTIFIED BESPOKE, do not replace" stands** (`lane-frontend.md:388-390`) — and stands on the *shape* argument, which is stronger than the dogfood argument the lane used, since glass-ui itself consumes keyframes.js on 7 dist modules (`dist/{blob,drawer,dock,motion}.js`, `useAnimatedNumber`/`useDragMorph`/`useSpring` chunks; peer `"@mkbabb/keyframes.js": "^6.0.0"`), so a glass primitive would not necessarily have *removed* library coverage.

**K-4 · lane-22 F3's "the hero has zero engine dependency" — contradicted in the runtime sense.** `docs/tranches/U/audit/lane-22-perf-demo-runtime.md:104-118` argues the LCP hero imports only `@lucide/vue` `List`, `AnimatedText`, `TypingDots` and therefore has *"zero engine dependency"*, and proposes mounting before `warmKfEngine()` resolves. That is true of the **static** graph only. `TypingDots.vue:28,75` makes the LCP subtree a **runtime** consumer of the heavy chunk: today the awaited promise is already resolved (`demo/app/main.ts:50` gates `app.mount` on `warmKfEngine()`), so the cost is one microtask — but **if F3's remediation lands, the hero's dots freeze at `opacity: .2` until the ~250 KB engine chunk arrives.** Not a defect in TypingDots; a coupling F3's wave must plan for. Flagged here so the two records do not diverge.

---

## 5. Provenance index

| id | severity | anchor |
|---|---|---|
| C-1 | MAJOR | `TypingDots.vue:15, 32-33, 61-63, 65, 71-101, 105`; `delegation.ts:53-64`; `play-lifecycle.ts:135-141`; `docs/tranches/H/audit/harden/impl-w6w4-w6.md:27` |
| C-2 | MAJOR | `TypingDots.vue:14, 32-35, 46, 50, 61`; `EditorStartScreen.vue:27-30`; `AnimatedText.vue:7-9, 16-18, 21-23, 39, 96, 100, 121-125`; `src/animation/index.ts:107`; `docs/frontend-design/demo/home.md:208, 420` |
| C-3 | MINOR | `TypingDots.vue:50`; glass-ui `dist/styles/tokens.d.ts:29-33, 43-47`; `dist/styles/tokens/scheme-motion.css`; lane-frontend `F-1` (`:15, 54-70`) |
| C-4 | MINOR | `TypingDots.vue:71-101, 90, 123`; `engine/options.ts:42-46`; `compile/easing/easing-option.ts:44-58`; `easing.ts:79-86`; `scripts/observe/demo/live-session.mjs:1162` |
| C-5 | MINOR | `TypingDots.vue:45, 51, 59`; `scripts/gates/surface/published-surface.mjs:175-176`; `docs/tranches/U/waves/U.E.md:139`; `scripts/observe/demo/live-session.mjs:1130-1177` |
| C-6 | MINOR | `delegation.ts:53-64`; `physics/playback.ts:113-150`; `play-lifecycle.ts:135-141`; `EditorShell.vue:60`; `demo/app/index.html:39` |
| C-7 | MINOR | `play-lifecycle.ts:118-125, 135, 164`; `physics/playback.ts:139-146`; `waapi/waapi-options.ts:100-106`; `TypingDots.vue:88-89` |
| C-8 | INFO | `TypingDots.vue:61-63, 88`; `orchestration/stagger.ts:63-70, 173` |
| S★-1 | — | `TypingDots.vue:27-28, 75`; `src/animation/index.ts:1-25, 94, 308`; `package.json:26-29`; `internal/leaves.ts:6-19, 28`; `demo/kf-engine.ts:4-9` |
| S★-2 | — | `group/waapi.ts:31-33, 60`; `group/group.ts:159-161`; `group/types.ts:26-29`; `orchestration/stagger.ts:16-23`; `waapi/eligibility.ts:110-260`; `engine/animation.ts:155-161`; `TypingDots.vue:79-83` |
| S★-3 | — | `compile/value-ast.ts:67-77`; `compile/easing/easing-registry.ts:106-110, 122-133`; `TypingDots.vue:9-11, 15-17, 90, 93-95`; `node_modules/@mkbabb/value.js/dist/subpaths/{css,easing}.js`, `easing.d.ts:87`; `package.json:69` |
| S★-4 | — | `TypingDots.vue:91, 95, 118-123`; `play-lifecycle.ts:213-222, 320-329, 342-352, 375-381`; `engine/animation.ts:329-331`; `constants/defaults.ts:84`; `internal/reduced-motion.ts:139-153`; `live-session.mjs:1153-1177` |
