claude-opus-5[1m]

# CHALLENGE C · CONSUMPTION — `SequenceScene`

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceScene.vue` (43 lines)
**Axis** CONSUMPTION — how the component consumes keyframes.js (the library), glass-ui (the design system) and value.js (the transitive dep): subpath choice, shadow components (S-1..S-8), R1 reachability, the `defineExpose` contract, sibling integration seams.
**Method** whole-file read + every transitive import read read-only, plus the library source the seams land on. No browser (saturation is static + source-derived). Hitherto corpus folded: `formation/keyframes/lane-frontend.md` (F-1, S-1..S-8), `lane-library.md`.
**Date** 2026-08-06

## Tally

| | count |
|---|---|
| defects | 11 (1 BLOCKER · 1 MAJOR · 7 MINOR · 2 INFO) |
| blockers | 1 |
| superlatives | 4 |

Two findings (C-1, C-2) share one root cause and close with one fix; they are listed separately because their repros, severities and remedies differ. The parent may re-slice.

## Scope note — what "SequenceScene" means on this axis

`SequenceScene.vue` is a 43-line composition seam: it calls `useSequenceDemo()` (line 18), `provide`s the result (line 19), pokes one store field (line 31) and `defineExpose`s three members (33–42). Its *whole* library consumption is transitive, through the module it instantiates and the single child it renders. Judging only the 43 lines would be judging the wrapper and missing the contract. The findings below are anchored to the file that carries the line, with the SequenceScene call-site that reaches it named in every case.

---

## DEFECTS

### C-1 · BLOCKER · `Sequence.duration` goes permanently stale the moment a row is re-timed — the scene's headline gesture strands a row mid-glide

**Provenance**
- `demo/scenes/sequence/useSequenceDemo.ts:341-342` — `entry.at = clamped; sequence.entries.sort((a, b) => a.at - b.at);`
- `src/animation/orchestration/sequence/sequence.ts:158` — `private _duration = 0;`
- `src/animation/orchestration/sequence/sequence.ts:202-204` — `get duration(): number { return this._duration; }`
- `src/animation/orchestration/sequence/sequence.ts:271-279` — `add()`, the **only** writer of `_duration` (`:278` `this._duration = Math.max(this._duration, this.cursor);`)
- `src/animation/orchestration/sequence/transport.ts:35` — `const local = clamp(masterClock - at, 0, animation.options.duration);`
- `src/animation/orchestration/sequence/transport.ts:117` / `:219` — `clamp(raw, 0, duration * repeatCount)` / `const total = ctx.duration * ctx._repeatCount;`
- reached from `SequenceScene.vue:18` → `useSequenceDemo()`; the gesture enters at `SequenceTarget.vue:220` (drag) and `:239` (`End` key).

**The defect.** `Sequence` derives `duration` from a **private monotone-max cache written exclusively inside `add()`**. An exhaustive grep of the whole `orchestration/sequence/` directory returns `_duration` at exactly three lines — the declaration (`:158`), the getter's read (`:203`) and the single `Math.max` write inside `add()` (`:278`). There is no `remove`, no `clear`, no `reposition`, no duration setter, and no recomputation on read (the full method list of `Sequence` is `constructor/duration/time/progress/rate/label/on/add/seek/setTargets/finished/play/stop/pause/resume/timeScale/reverse/repeat/yoyo`).

`useSequenceDemo` calls `add()` **only** in the construction loop (`:147-150`). Every subsequent re-authoring — the scene's headline "draggable rows" refinement — mutates `entry.at` in place (`:341`) and hand-re-sorts (`:342`). `duration` is therefore frozen at its construction value for the lifetime of the scene while `at` is free to move.

**Concrete failure, fully source-derived.** Construction: `ROW_DURATION = 900` (`:62`), delays `[0, 260, 520, 780, 1040]` (`STAGGER_EACH = 260`, `:65`). `add()` walks the cursor to `1040 + 900 = 1940`, so `_duration = 1940`. `STAGGER_MAX = 1600` (`:74`) — strictly greater than the largest construction-time `at`.

Now focus any row handle and press `End` (`SequenceTarget.vue:239` → `reseatRow(index, 1600)`):

- that row's true span becomes `[1600, 2500]`; the storyboard's true extent is 2500 ms;
- `sequence.duration` remains **1940**;
- `progress = _time / 1940`, so `progress === 1` ⟺ `_time === 1940`;
- `applySequenceAt` (transport.ts:35) gives that row `local = clamp(1940 − 1600, 0, 900) = 340` — **37.8 % of its glide**;
- the play loop bounds the master clock at `ctx.duration * repeatCount = 1940` (transport.ts:117/:219), so `play()` resolves with the row still at 340 ms. `fillMode: "forwards"` never lands its `--ball-p: 1`.

The row is **structurally incapable of completing**, under both `seek` (scrub to 100 %) and `play` (natural end). Meanwhile `SequenceScrubber.vue:16` prints `1.000` and the machine receives `SCRUB t=1` (`useSequenceDemo.ts:348`) — the readout, the playhead and the machine snapshot all assert "done" over a visibly unfinished storyboard.

**The mirror case (same root, opposite sign).** Drag every row to `at = 0` and the true extent collapses to 900 ms while `duration` stays 1940 — because `_duration` is a `Math.max`, it *never shrinks*, and no code path resets it (`stop()` does not touch it; `reset()` at `:288-303` also re-authors by direct field mutation rather than re-`add`ing). The last ~54 % of the master clock becomes dead air: the scrubber travels while nothing moves.

**Falsifiers, each applied:**
1. *"`duration` is recomputed from `entries` on read."* — **FALSE.** `sequence.ts:202-204` is a bare private-field read.
2. *"`_duration` is updated somewhere else."* — **FALSE.** Exhaustive grep over `src/animation/orchestration/sequence/*.ts`: writes only at `:278`.
3. *"`reseatRow` cannot exceed the construction-time max."* — **FALSE.** `STAGGER_MAX = 1600 > 1040`; one `End` keypress reaches it (`SequenceTarget.vue:239`), as does a full-right drag (`:217` `ratio * demo.STAGGER_MAX`).
4. *"Something re-calls `add()` after a reseat, refreshing the cache."* — **FALSE.** `sequence.add` appears once, in the construction loop (`:149`).
5. *"`fillMode: 'forwards'` rescues the row."* — **FALSE.** `fillMode` applies at the *child's* own end; the child's local clock is hard-clamped by `masterClock − at` and the master never exceeds the stale duration.
6. *"A reduced-motion / PRM path short-circuits this."* — would need a live check; irrelevant, since the stranding is in the clock map, not the renderer.

**Kill condition.** Show `sequence.duration` reading ≥ 2500 after `reseatRow(0, 1600)`, or show the reseated row's `--ball-p` reaching 1 at master progress 1. Either observation kills this finding outright.

**Remedy space.** Demo-side, the only correct fix using the public API is to rebuild the `Sequence` on re-author (`new Sequence()` + re-`add` every child at its new `at`) — `_duration` is private with no setter, so it cannot be repaired in place. The structural fix is library-side and is C-2.

---

### C-2 · MAJOR · the scene reaches past `Sequence`'s public API into `entries[]` and hand-replicates `add()`'s private invariant — because no reposition API exists

**Provenance** `useSequenceDemo.ts:341-342` and `:299-301`; against `sequence.ts:121` (`readonly entries: SequenceEntry<V>[] = []`) and `sequence.ts:271-279`.

**The defect.** `entries` is declared `readonly` — which in TypeScript freezes the *reference*, not the array's contents. The demo exploits exactly that gap at two sites:

```
// reseatRow — useSequenceDemo.ts:341-342
entry.at = clamped;
sequence.entries.sort((a, b) => a.at - b.at);

// reset — useSequenceDemo.ts:299-301
if (i >= 0) e.at = DEFAULT_DELAYS[i]!;
sequence.entries.sort((a, b) => a.at - b.at);
```

Both are hand-copies of the second half of `add()` (`:273-276`), and both silently skip its third and fourth statements (`:277` cursor advance, `:278` duration extension). The composable's own comment concedes the replication — *"the SAME re-sort `Sequence.add` runs internally — dogfooding the engine's position model, inv ζ"* (`:320-322`) — but replicating a private invariant is the opposite of dogfooding: it is a fork of the engine's bookkeeping that the engine cannot keep in sync.

This is the structural finding under C-1. It is separately actionable and separately dangerous: any future bookkeeping added to `add()` (label recompute, event emission, segment-index cache, duration invalidation) silently diverges here with no type error and no test signal.

**Falsifiers, applied:**
1. *"`entries` is a public mutation surface the library sanctions."* — Partly. It is `public readonly`, and `SequenceEntry.at` is not `readonly`, so the mutation type-checks. But the library's own docblock (`sequence.ts:33-36`) frames `at` as *resolved at `add` time* from a `SequencePosition`, and offers no verb to change it afterwards. The absence of `remove`/`reposition` in the full method list is the evidence that this is a gap, not an API.
2. *"Some other consumer does the same, so it is the established idiom."* — checked: `grep -rn "\.entries" demo/` outside `scenes/sequence/` returns no other `entries[].at` writer. This is the only site.

**Kill condition.** Point to a public `Sequence` verb that re-times an existing entry, or to a `_duration` recomputation triggered by an `entries` mutation.

---

### C-3 · MINOR · the `isControlsPanelOpen` poke-set survives here alone, after the codebase declared it deleted

**Provenance** `SequenceScene.vue:30-31`; against `app/dock/ChromeDock.vue:107`, `scenes/easing/EasingScene.vue:36-40`, `scenes/spring/SpringScene.vue:46-50`.

ChromeDock names this exact write as already superseded, by name and by scene:

> *"For home/sequence the DFA set is [] — so NO control affordance renders, which is the DFA-driven supersession of those scenes' former `isControlsPanelOpen = false` poke-sets (one authority for 'this scene has no panel', not a per-scene imperative write)."* — `ChromeDock.vue:104-108`

Easing and Spring deleted their twin of this write at `S.G1 S1c (p10 F4 — writer c)`, each leaving a tombstone comment saying so (`EasingScene.vue:36-40`, `SpringScene.vue:46-50`, both ending *"The scene pokes nothing."*). SequenceScene is the sole survivor of the three-writer chain — a live violation of the standing `feedback_no_backwards_compat` law ("never legacy beside the replacement").

**Falsifier — applied, and it demoted this from MAJOR to MINOR.** I tested whether the write has an observable effect today:
- The layout class it drives is `controls-layout--closed` (`AnimationControlsGroup.vue:7`). But sequence *also* always carries `controls-layout--railless` (`:8`, since `hasControlSurfaces` is false), and **both rules declare the identical `--rail-track: 0px`** at identical specificity (`AnimationControlsGroup.css:64-69`). The class is therefore a no-op for this scene.
- The collapse toggle is gated on `hasControlPanel` (`ChromeDock.vue:114`), which is false for sequence, so no affordance reads the field either.
- `ControlsPaneWrapper` does not mount at all (`AnimationControlsGroup.vue:20`, `v-if="hasControlSurfaces"`), so `useControlsLayout`'s competing writer (`useControlsLayout.ts:66`) never runs.

So the write is **provably inert today**. What survives is (a) the no-legacy violation, and (b) a latent clobber: it is unconditional and runs on every mount, so the instant sequence gains any control surface, a user's stored open-preference is silently discarded on every entry — precisely the bug class `S.G1 S1c` cured for the other two scenes.

**Kill condition.** Show a rule where `--closed` and `--railless` diverge for a railless scene, and this becomes a live layout defect instead of dead code.

---

### C-4 · MINOR · the scene cites a deleted module as "the AUTHORITY" for its own panel-less-ness

**Provenance** `SequenceScene.vue:26-29` — *"The control-surface DFA (H.W11.S4 / I2 — `CONTROL_SURFACES.sequence = []`) is the AUTHORITY on this being a self-contained, panel-less stage."*

`CONTROL_SURFACES` does not exist. `demo/state/controlSurfaces.ts:1-12` records its removal explicitly: the module was *"INVERTED at T.B2 from a hand-maintained per-scene exclusion TABLE (the deleted `CONTROL_SURFACES` / `CONDITIONAL_SURFACES` rows, keyed by SceneId) into a DERIVATION off the live scene facility."*

The live authority is `surfacesFor(facility, selected)` (`controlSurfaces.ts:95-125`), fed by `App.vue:249-255`. The *behaviour* the comment asserts still holds — sequence's lone channel declares neither `animation` nor `surfaces` (`useSequenceDemo.ts:424-432`), so `surfacesFor` returns `[]` — but it holds for a reason the file misnames. This matters on the consumption axis because the comment is the only in-file statement of *why* this scene may skip the panel contract; a future editor checking it will grep for a symbol that was deleted two tranches ago.

Note the implicit form: the facility's channel *omits* `surfaces` rather than declaring `surfaces: []`. The empty set is inferred from absence, not asserted. Declaring it explicitly would make the scene's panel-less-ness a stated contract rather than a fall-through.

**Falsifier.** Find a live `CONTROL_SURFACES` export anywhere in `demo/state/` — `grep -rn "CONTROL_SURFACES" demo/` returns only comment text.

---

### C-5 · MINOR · the `defineExpose` docblock documents a member that is not exposed — and the shell's own comments repeat the error

**Provenance** `SequenceScene.vue:36-38` — *"`scenePlayback` is also exposed as the STABLE bind-target identity the shell's once-per-entry ready-guard keys on."* The expose object (`:39-41`) contains exactly `facility`, `superKey`, `isStarted`. There is no `scenePlayback` key.

The shell does not read one either: `useSceneMachineShellBinding.ts:163` reads `sceneRef.value?.facility?.identity`, and the readiness watcher (`:216-219`) watches the same path. The behaviour is correct — `useSequenceDemo.ts:423` sets `identity: scenePlayback`, so the stable identity does reach the guard, just through `facility`, not through the expose surface.

What makes this worth a row rather than a shrug is that the drift is **bilateral**: the shell's comments at `:158-161` (*"a facility-only scene (sequence) exposes a stable `scenePlayback` adapter instead"*) and `:214-216` (*"watch its stable `scenePlayback` too or its readiness would never re-drive"*) describe the same non-existent member. Both ends of the seam document a contract neither implements — so a reader has no surviving correct account of how sequence satisfies the readiness guard.

Compounding: `defineExpose()` is structurally unchecked against `SceneExposedApi` (`app/scene/sceneExposedApi.ts:16-33`). The shell asserts the shape via `shallowRef<SceneExposedApi | null>` (`App.vue:209`), so a typo'd or dropped key on the scene side is a silent runtime `undefined`, not a compile error. Every member of this contract is optional (`facility?`, `superKey?`, `autoPlays?`, `isStarted?`), so nothing forces a scene to expose anything at all.

**Falsifier.** Show a `scenePlayback` key in the expose object, or a shell read of `sceneRef.value?.scenePlayback` — neither exists.

---

### C-6 · MINOR · `isStarted: ref(true)` is a write-only sink, and this is its most degenerate instance

**Provenance** `SequenceScene.vue:41`; writer at `useSceneMachineShellBinding.ts:261-265`.

The shell writes through it on every bottom-bar start-state change (`onStartStateChange` → `sceneRef.value.isStarted = started`, which `proxyRefs` unwraps onto `.value`). Nothing in `scenes/sequence/` reads it — `grep -rn "isStarted" demo/scenes/sequence/` returns only line 41.

Easing (`EasingScene.vue:46`) and Spring (`SpringScene.vue:56`) share the vestige, so the *class* is not sequence-specific. But SequenceScene is strictly the worst instance: it constructs the ref **inline inside the expose object**, keeping no local handle, so the scene is structurally incapable of ever reading back the value the shell writes into it. Easing and Spring at least retain a named local that a future consumer could bind. Contrast the one scene that actually uses the member: `CubeScene.vue:66` holds `const isStarted = ref(false)` and threads it to `CubeTarget.vue:119` via `:is-started`.

**Falsifier.** Any reader of `isStarted` under `scenes/sequence/` kills this — there is none.

---

### C-7 · MINOR · unused `computed` import, and no lint in this repo can catch it

**Provenance** `SequenceScene.vue:8` — `import { computed, provide, ref } from "vue";`. `grep -c "computed("` in the file returns **0**.

Nothing catches it: `tsconfig.json` sets `strict`, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` but **not** `noUnusedLocals`; and `package.json`'s `"lint": "depcruise src"` runs dependency-cruiser over `src/` only — `demo/` has no linter at all, and eslint is absent from `devDependencies` entirely. `npm run check` is green with this dead import in place.

Corroborating detail: `prettier-plugin-organize-imports` **is** in `devDependencies`, and it drops unused imports as part of TS `organizeImports`. Its failure to have removed this one is evidence the file has not been formatted since its last edit — a small but real signal about the change hygiene on this seam.

**Falsifier.** A `computed(` call anywhere in the file, or a lint config covering `demo/` — neither exists.

---

### C-8 · MINOR · the provide contract publishes the whole composable, raw engine handles included

**Provenance** `SequenceScene.vue:19` `provide(SEQUENCE_DEMO_KEY, demo);`; key typed at `sequenceKeys.ts:7-8` as `InjectionKey<SequenceDemo>`, where `SequenceDemo = ReturnType<typeof useSequenceDemo>` (`useSequenceDemo.ts:482`) — a 24-member bag.

The scene's *entire* contract to its subtree is this one untyped-narrowed, non-`readonly` object. It carries, among the refs and methods, two raw engine handles: `sequence` (the `markRaw`'d `Sequence`) and `childAnims` (the five `CSSKeyframesAnimation`s). Any descendant, at any depth, can drive the engine directly and desynchronise the machine that `useSequenceDemo`'s own docblock (`:154-156`) names as *"the single authority"*.

Descendants already use it that way: `SequenceTarget.vue:187` calls `demo.childAnims[i]!.setTargets(el)` and `:192` writes `demo.sequence.progress = demo.progress.value`. There is no facade, no `readonly()`, no narrowed key.

**Falsifier — applied, and it trimmed the claim.** I checked whether either descendant write actually desynchronises: `:192` copies the *reactive mirror into the engine* without changing `progress.value`, so the machine's view stays consistent, and the surrounding comment (`:189-191`) argues the ordering case correctly. `:187` is target binding, which legitimately belongs where the elements are. So no *live* desync exists — the finding is the absent guard rail, not a present break. That is why this is MINOR and not MAJOR.

**Kill condition.** A narrowed injection key, a `Readonly<>` wrapper, or a facade type on `SEQUENCE_DEMO_KEY`.

---

### C-9 · MINOR · census extension — the subtree hand-rolls **two** slider families, six runtime nodes; S-4 enumerates one

**Provenance** `SequenceScrubber.vue:22` and `SequenceTarget.vue:99`, both `role="slider"`.

`lane-frontend.md` **S-4** flags `SequenceScrubber` (162 lines) as an AMBER shadow of glass-ui `ScrubberTimeline` / `Slider`, correctly noting that `Slider` is already imported elsewhere in this same repo (`KeyframesEditor.vue:109`, `MatrixEditor.vue:97`, `PlaybackRibbon.vue:92`) — so the primitive is not merely available, it is already a live dependency.

**Where the tree disagrees with the census:** S-4 accounts for the scrubber only. `SequenceTarget.vue:97-107` contains a **second** hand-rolled slider — the per-row `at:` re-timing handle, with its own `role="slider"`, `aria-valuenow/min/max`, `tabindex="0"`, `@pointerdown` and a bespoke `@keydown` arrow/Home/End implementation (`:232-243`). It renders once per row, so **five** instances at runtime. Total under `SequenceScene`: **six** hand-rolled slider nodes against a `Slider` primitive the repo already ships.

The census's residual bucket lists *"12 remaining (scene shells, Three.js, orbital drag, axis/playhead, …)"* — `SequenceAxis` and `SequencePlayhead` are accounted for there, but `SequenceTarget`'s row handle is enumerated nowhere. This is an addition to S-4's line count, not a contradiction of its verdict.

**Falsifier — applied, and it constrains the claim.** I checked whether the hand-rolls are *broken* as well as duplicative: both carry `role="slider"`, an `aria-label`, and `aria-valuenow`/`valuemin`/`valuemax`, with keyboard handlers. Neither is an a11y defect. The finding is duplication and divergence risk (two independent keyboard-step implementations: `ROW_AT_STEP = 40` at `SequenceTarget.vue:232`, a separate scheme in `SequenceScrubber`), not brokenness. Any claim that these handles are inaccessible would be false.

---

### C-10 · INFO · synchronous `kfEngine()` at setup, on a boot path that tolerates the warm failing

**Provenance** `SequenceScene.vue:18` → `useSequenceDemo.ts:91` `const { CSSKeyframesAnimation } = kfEngine();`; accessor contract at `demo/kf-engine.ts:47-56` (*"Throws if read before `warmKfEngine()` has resolved"*); boot at `demo/app/main.ts:50-54`.

`main.ts` mounts with `void Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(() => app.mount("#app"))`. The warm's rejection is swallowed and `.finally` mounts regardless, so a chunk-fetch failure (flaky network, stale deploy with hashed chunk names) mounts an app whose `kfEngine()` throws. There is **no error boundary anywhere in `demo/`** — `grep -rn "errorHandler|onErrorCaptured|errorCaptured" demo/` returns nothing.

**Falsifier — applied, and it demoted this from BLOCKER to INFO.** SequenceScene is not the first casualty: `App.vue:217-220` calls `kfEngine().AnimationGroup` during the *App's own* setup, which runs before any scene mounts. So the failure mode is app-wide and attributable to `main.ts`, not to this scene. SequenceScene merely shares the exposure. Recorded here only so the axis report is complete; it belongs to the shell's docket.

---

### C-11 · INFO · F-1 exposure is one hop away — the shell is clean, its only child is not

**Provenance** `lane-frontend.md` **F-1**; `keyframes.js/package.json` (verified: `@mkbabb/glass-ui` absent from both `dependencies` and `devDependencies`, while 7.0.0 sits in `node_modules`); `SequenceTarget.vue:136,138`.

`SequenceScene.vue` imports zero glass-ui (`grep -c "glass-ui"` → 0), so the shell itself is insulated. Its sole rendered child imports `{ Button, Card }` from the barrel (`:136`) and `{ Metric }` from `@mkbabb/glass-ui/metric` (`:138`). Under F-1 (undeclared, unlocked), `npm ci` cannot reproduce this subtree's render at all. Confirming F-1's own remedy ordering: nothing in this scene's glass consumption is reproducible until F-1 lands.

**Falsifier — applied, and it killed a claim I had drafted.** I initially flagged the barrel/subpath *mix* inside one file as a discipline defect. It is not: across `demo/`, barrel imports number 31 and subpath imports 45, and every scene family mixes both (`EasingTarget.vue`, `MatrixEditor.vue`, `SpringPhysicsFacet.vue` all do). SequenceTarget follows the house norm, not an outlier. Further, the mix costs nothing: glass-ui declares `sideEffects: ["*.css"]` and the barrel is 23.9 KB pre-shake, so `Button`/`Card` tree-shake cleanly. **Claim withdrawn** — recording it so the parent does not re-derive it.

---

## SUPERLATIVES

L-18 runs both ways. Each of these is stated with the observation that would kill it.

### S★-1 · The LIGHT/HEAVY boundary is honoured exactly — textbook, not accidental

`useSequenceDemo.ts:4` takes `CSSKeyframesAnimation` as a **type-only** import from the barrel (`import type { CSSKeyframesAnimation as CSSKeyframesAnimationT }`), and `:91` takes the **runtime constructor** from the dynamic heavy accessor (`const { CSSKeyframesAnimation } = kfEngine();`). This is precisely the split the barrel declares — `src/animation/index.ts:283` exports `CSSKeyframesAnimation` as `export type` only, while `Sequence` (`:138`), `stagger` (`:94`) and `springTimingFunction` (`:54`) are genuine LIGHT static exports.

The consequence is real, not stylistic: `kf-engine.ts:9-11` states the heavy surface *"is value.js-bearing and is reached ONLY through the barrel's `loadAnimationEngine()` dynamic accessor — the one place value.js enters the graph."* This scene keeps value.js off the static light graph by construction.

*Kill condition:* a value-position import of `CSSKeyframesAnimation` from the barrel would break `proof:boundary`. There is none.

### S★-2 · The R1 parser-crash class is **provably unreachable** from this entire subtree

Every value.js import under `scenes/sequence/` — all four of them — is the same narrowest-possible leaf: `import { clamp } from "@mkbabb/value.js/math"` (`useSequenceDemo.ts:8`, `SequenceTarget.vue:134`, `SequenceScrubber.vue:43`, `SequencePlayhead.vue:15`). Three independent facts make the R1 exclusion a proof rather than a hope:

1. value.js 4.0.0's `exports` map has **no root `"."` entry** — only seven subpaths — so a bare `@mkbabb/value.js` import cannot even resolve. The narrow choice is enforced by the package.
2. `dist/subpaths/math.js` is a **zero-import leaf**; its `clamp` is a three-line `Math.min(Math.max(...))`. It pulls nothing.
3. `parseCssColor` appears in exactly one built subpath — `dist/subpaths/css.js` — which nothing in this subtree imports.

R1 (the live `parseCssColor("oklch()")` shipping crash on the megatranche docket) therefore cannot be reached through `SequenceScene` by any path. The scene also never routes a colour string through the engine: its keyframes are pure numbers (`--ball-p`, `opacity`, `scale`, `useSequenceDemo.ts:133-137`) and all colour lives in CSS custom properties resolved by the browser (`SequenceTarget.vue:161-167`, the `--rainbow-*` token family plus one `color-mix`).

*Kill condition:* any `@mkbabb/value.js/css`, `/color`, or bare-specifier import appearing under `scenes/sequence/`, or a colour-valued keyframe entering `fromKeyframes`. `grep -rn "@mkbabb/value.js" demo/scenes/sequence/` returns four hits, all `/math`.

### S★-3 · The scene shell carries zero design-system coupling, and its leaf adopts the Glass 7 primitive rather than shadowing it

`SequenceScene.vue` imports only `vue`, `@state`, and its own colocated modules — no glass-ui, no keyframes.js, no value.js. Three of the six scene shells do **not** hold this line (`CubeScene.vue`, `SquareScene.vue` and `SpringScene.vue` each import `@mkbabb/glass-ui` directly), so this is a measured distinction, not a tautology of the file's size.

And where the leaf does consume the design system, it consumes it correctly: `SequenceTarget.vue:137-138` reaches for `Metric` through its own subpath with the comment *"Glass 7 canonical poster-metric primitive"* — the anti-shadow move, adopting a 7.0.0 primitive instead of hand-rolling a readout. That is the behaviour the S-1..S-8 census exists to encourage, landing on the correct side.

*Kill condition:* a glass-ui or engine import appearing in `SequenceScene.vue` (currently 0), or a hand-rolled metric plate in the leaf.

### S★-4 · The `stagger` → `at:` consumption is genuine dogfood at construction time

`stagger(ROW_COUNT, { each: STAGGER_EACH, from: "first" })` (`useSequenceDemo.ts:101-104`) produces the per-index delays, and those delays are fed **unmodified** straight into `Sequence.add(anim, at)` (`:147-150`). No re-derivation, no parallel delay table, no hand-rolled staircase — the library's distribution primitive *is* the timeline's position-insertion input, which is exactly the GSAP-timeline idiom the scene claims to prove. `DEFAULT_DELAYS` (`:108`) is captured from the same generator rather than re-typed as a literal, so Reset restores the engine's own distribution.

*Stated tension, honestly:* this superlative holds for the **construction** path only. The moment the re-authoring path runs, C-1/C-2 apply and the dogfood becomes a fork. Fixing C-2 (a library reposition verb, or a rebuild-on-reauthor) would extend this superlative across the whole lifecycle; today it is true at t=0 and false thereafter.

*Kill condition:* a hand-written delay array, or `at` values computed anywhere other than `staggerFn.delays()`.

---

## UNPROVEN — NEEDS LIVE (for the SS-13 visual audit)

Deliberately **not** claimed above; recorded so the visual lane can close them.

- **U-1.** The *visual* signature of C-1: a row dragged to `at = 1600` should be observably stranded at ~38 % of its rail while the timecode reads `1.000`. The clock arithmetic is proven from source; the on-screen manifestation is not.
- **U-2.** Whether the reversed transport (`sequence.reverse()`, `useSequenceDemo.ts:261-272`) interacts with the stale duration differently — the rate flip re-anchors against `duration`, so a reversed run after a reseat may strand a *different* row.
- **U-3.** Whether the `powerOn` boot cascade (`useSequenceInstrument.ts:26-35`, a `setTimeout(760)` against a CSS animation) stays phase-locked with the engine's `--ball-p` fan-out — this is the one timing seam in the subtree that is *not* engine-driven, and inv ζ is asserted for it only in prose (`useSequenceInstrument.ts:8-11`).
- **U-4.** Whether C-3's poke-set has any transitional visual effect during the scene-swap View Transition, before `--railless` is applied.
