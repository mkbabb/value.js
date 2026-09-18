claude-opus-5[1m]

# CHALLENGE · `SequenceScene` · axis L (LIBRARY)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceScene.vue` (43 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. keyframes.js is READ-ONLY evidence; the only file written by this lane is this one.
**Date:** 2026-08-06. Posture: **assume DEFECTIVE until the tree proves otherwise** — but every claim below carries its own falsifier, and a claim that cannot survive its falsifier was cut.

## 0. Read-set (whole-file reads, not greps)

The SFC and its entire first-order import closure, plus the engine and shell surfaces those closures reach:

| kind | file |
|---|---|
| target | `demo/scenes/sequence/SequenceScene.vue` |
| direct imports | `demo/scenes/sequence/SequenceTarget.vue` · `demo/scenes/sequence/useSequenceDemo.ts` · `demo/scenes/sequence/sequenceKeys.ts` · `demo/state/controlOptionsStore.ts` (`@state`) |
| second order | `demo/scenes/sequence/useSequenceInstrument.ts` · `demo/composables/scene-runtime/useSweepScene.ts` · `demo/composables/scene-runtime/useSceneVisibilityPause.ts` · `demo/state/scenePlaybackAdapters.ts` · `demo/state/controlSurfaces.ts` · `demo/state/sceneMachine.ts` · `demo/state/useSceneMachine.ts` · `demo/app/scene/sceneExposedApi.ts` · `demo/app/scene/useSceneMachineShellBinding.ts` · `demo/app/scene/scenes.ts` |
| engine (evidence) | `src/animation/orchestration/sequence/{sequence,lifecycle,transport}.ts` · `src/animation/orchestration/stagger.ts` · `src/animation/physics/playback.ts` · `src/animation/engine/{animation,play-lifecycle}.ts` |
| comparands | `demo/scenes/cube/CubeScene.vue` · `demo/scenes/easing/EasingScene.vue` · `demo/scenes/spring/SpringScene.vue` · `demo/app/dock/ChromeDock.vue` · `demo/components/instrument/transport/{AnimationControlsGroup.vue,AnimationControlsGroup.css}` · `.../ControlsPaneWrapper/useControlsLayout.ts` |

**Hitherto corpus folded** (not re-derived): `formation/keyframes/lane-frontend.md` — F-1 (glass-ui phantom dep), S-4 (`SequenceScrubber` → `ScrubberTimeline`/`Slider`), §4 scene roster (`43 | sequence/SequenceScene.vue | b`). Where the tree disagrees with the corpus I say so explicitly (§4).

## 1. Headline

| # | severity | claim |
|---|---|---|
| **L-1** | **BLOCKER** | The glass-ui phantom dep (F-1) bites *this* scene through its one and only child: on a clean `npm ci` the scene has nothing to render. |
| **L-2** | **MAJOR** | `reseatRow` mutates `Sequence.entries[].at` directly, bypassing `add()`'s `_duration` maintenance — the master clock is frozen at its construction span, so any row re-timed past 1040 ms **can never complete**. Reachable by one `End` keypress. |
| **L-3** | **MAJOR** | The scene's tab-visibility gate protects the *mirror* loop, not the *motion* loop. `sequence.playback` is never suspended; the master clock is wall-clock. Hide the tab >2 s mid-play and you return to a finished storyboard. |
| L-4 | MINOR | `SequenceScene.vue:31` is the last surviving member of a poke-set writer class the tree extirpated everywhere else (S.G1 S1c) — and it is inert: `.controls-layout--railless` already collapses the rail. |
| L-5 | MINOR | Unused `computed` import (`:8`). No gate in this repo can catch it — there is no ESLint, and `npm run check` (`tsc`) never parses an SFC. |
| L-6 | MINOR | The `defineExpose` docblock (`:36–38`) claims `scenePlayback` is exposed as the bind-target identity. It is not in the expose object. |
| L-7 | MINOR | `isStarted: ref(true)` (`:41`) is write-only dead surface for this scene, and is a `Ref<boolean>` where `SceneExposedApi` declares `boolean`. |
| L-8 | MINOR | `playReel` teardown gap: 5 pending `setTimeout`s + up to 5 detached child `RAFPlayback` loops outlive unmount; `onScopeDispose` stops only the mirror and the `Sequence`. |
| L-9 | MINOR | The reel returns children with their `startTime` anchor cleared while the master is merely PAUSED — a managed-pause invariant break, self-healed by `applySequenceAt`. |
| L-10 | MINOR | `useSweepScene` already builds a `ScenePlayback`; `useSequenceDemo` discards it and constructs a second one by hand (`createRafAdapter` ×2 per mount). |
| L-11 | MINOR | The scene's docblock cites `CONTROL_SURFACES.sequence = []` as "the AUTHORITY". That table was **deleted** at T.B2. |
| L-12 | INFO | Both children `inject(SEQUENCE_DEMO_KEY)!` with a bare non-null assertion; the provide contract has no guard and no error posture. |
| L-13 | INFO | `any` in the engine handle type + a cast in `reset()`; three separate `import`s from one specifier. |

Superlatives (L-18 runs both ways): **6**, §3.

---

## 2. Findings

### L-1 · BLOCKER · the phantom dep bites here, hardest

`SequenceScene.vue:3` renders exactly one thing — `<SequenceTarget />` — and nothing else. `SequenceTarget.vue:136,138`:

```
import { Button, Card } from "@mkbabb/glass-ui";
import { Metric } from "@mkbabb/glass-ui/metric";
```

Re-verified independently of the census (not taken on the lane's word):

```
$ grep -c "glass-ui" package.json        → 0
$ grep -c "glass-ui" package-lock.json   → 0
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"  → 7.0.0
```

No `@mkbabb/glass-ui` alias exists in `vite.config.ts:37–59` either (the alias map covers `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets` — nothing for glass-ui). So resolution depends *entirely* on the undeclared `Jul 16 05:17` directory in `node_modules`.

SequenceScene is the sharpest instance of F-1 in the roster because it is a **pure shell**: it has zero glass-ui imports of its own (the census correctly marks it `b`), zero DOM of its own beyond a flex centering div, and one child. Its whole rendered output is downstream of an unresolvable specifier. There is no partial-degradation mode — a clean checkout yields a scene that cannot mount at all.

*Falsifier:* a `@mkbabb/glass-ui` entry appearing in `package.json` or `package-lock.json`, a `resolve.alias`/`file:` entry for it in `vite.config.ts`, or a `.npmrc`/workspace mechanism that resolves it without a declaration. Any one of those kills this finding outright. (`.npmrc` is a single `legacy-peer-deps=true` line — it resolves nothing.)

*Corpus:* fold of **F-1**; this lane adds the per-component bite and the independent re-verification.

---

### L-2 · MAJOR · `reseatRow` breaks the `Sequence` duration invariant — re-timed rows can never finish

`useSequenceDemo.ts:325–349` re-authors a row's master-clock offset by reaching into the engine's entry list:

```ts
const entry = sequence.entries.find((e) => e.animation === childAnims[index]);
if (entry) {
    entry.at = clamped;
    sequence.entries.sort((a, b) => a.at - b.at);
}
sequence.seek(sequence.progress * sequence.duration);
```

The comment above it (`:333–336`) asserts this is "the SAME re-sort `Sequence.add` runs internally — dogfooding the engine's position model, inv ζ". **It is not the same.** `sequence.ts:271–280`:

```ts
add(animation, at?) {
    const resolved = resolveSequencePosition(at, this.cursor, this.labels);
    this.entries.push({ animation, at: resolved });
    this.entries.sort((a, b) => a.at - b.at);
    this.cursor = resolved + animation.options.duration;
    this._duration = Math.max(this._duration, this.cursor);   // ← the invariant the demo skips
}
```

`_duration` is `private` (`sequence.ts:158`), is written **only** at `:278`, and is exposed read-only via `get duration()` (`:202–204`). Grep over the whole sequence module confirms one writer:

```
$ grep -rn "_duration" src/animation/orchestration/sequence/
sequence.ts:158:    private _duration = 0;
sequence.ts:203:        return this._duration;
sequence.ts:278:        this._duration = Math.max(this._duration, this.cursor);
```

So the master span is frozen at construction: `max(delay) + ROW_DURATION` = `1040 + 900` = **1940 ms** (`useSequenceDemo.ts:59–65,101–111,127–140`). Meanwhile `STAGGER_MAX = 1600` (`:74`) — the drag/keyboard domain runs **560 ms past the point where the sequence can still contain a row**.

**Concrete failure.** Focus row 1's handle and press `End` (`SequenceTarget.vue:239` → `reseatRow(0, 1600)`). Row 1's child now spans `[1600, 2500]` on the master clock. Every paint path caps at `duration`:

- `set progress(p)` → `seek(clamp(p,0,1) * this.duration)` → master ≤ 1940 (`sequence.ts:221–223`);
- `driveSequenceFrame` settles at `total = ctx.duration * ctx._repeatCount` = 1940 (`transport.ts:219–223`);
- `applySequenceAt` → `local = clamp(masterClock − at, 0, animation.options.duration)` (`transport.ts:35`).

At progress **1.0** the row's local clock is `1940 − 1600 = 340` of 900 → its ball rests at **37.8 %** of its rail, forever, with the readout claiming 100 %. The same keypress in the other direction (`Home` on every row) leaves `duration` at 1940 while the real span is 900 — 54 % of the scrubber is dead track.

This is not a corner: re-timing rows is the page's own headline gesture ("The headline Sequence refinement — the GSAP-timeline gesture", `:316`), and the affordance is a `role="slider"` with `aria-valuemax="1600"` (`SequenceTarget.vue:99–103`) that advertises exactly the range that breaks it.

The honest root cause is a **missing engine API**: `Sequence` ships `add`/`label`/`seek`/`setTargets` but no reposition/remove verb, so a consumer that wants GSAP-style live re-timing has no choice but to mutate `entries` — a `readonly` array whose elements are mutable. The demo took the only available road and inherited a silent invariant break. That makes this a first-class **library-axis** finding, not merely a demo bug: the dogfood found a real gap in `Sequence`'s surface.

*Falsifier:* `duration` computed on the fly from `entries` (it is not — `:202–204` returns the cached field); a second `_duration` writer (grep above: none); a public reposition API on `Sequence` that the demo should have used instead (`sequence.ts:231–315` — `label`, `on`, `add`, `seek`, `setTargets`; none reposition an existing entry); or `driveSequenceFrame`/`seek` bounding on a recomputed span rather than `ctx.duration` (`transport.ts:219`, `sequence.ts:222` — both use the frozen field). Any of these kills it.

*Marked:* the visual consequence (ball parked at 37.8 %) is **UNPROVEN-NEEDS-LIVE** for the SS-13 pass; the arithmetic and the clamp chain are proven statically.

---

### L-3 · MAJOR · the visibility gate protects the mirror, not the motion

The scene runs **two** loops:

1. `sequence.playback` — the engine's own `RAFPlayback` (`sequence.ts:148`), started by `sequence.play()`/`resume()` (`lifecycle.ts:70–73,115`). **This is the loop that moves the balls.**
2. the "mirror" — `useSweepScene`'s `RAFPlayback` (`useSweepScene.ts:78`), whose `frame` only copies `sequence.progress` into a reactive ref (`useSequenceDemo.ts:188–204`).

`useSweepScene` wires the tab-visibility gate to loop **2** and only loop 2:

```ts
useSceneVisibilityPause(() => playback.running, stopLoop, startLoop);   // useSweepScene.ts:119
```

Nothing suspends loop 1. The scene machine deliberately declines to: `useSceneMachine.ts:241–244` — "TAB_HIDDEN / TAB_SHOWN are status-only: the preserved per-scene `useSceneVisibilityPause` (autoPaused) owns the loop on tab visibility, so the machine drives NO adapter here." That delegation is sound for easing/spring, where `useSweepScene`'s `playback` **is** the motion loop. For the sequence it delegates to the wrong loop — the recipe was shaped for scenes whose sweep drives the pixels, and this scene reuses it as a read-out.

The consequence is concrete because the master clock is raw wall-time with no dt clamp (`transport.ts:217–223`):

```ts
const rawMaster = (clock - ctx._playOrigin) * ctx._rate;
const total = ctx.duration * ctx._repeatCount;
const finished = ctx._rate >= 0 ? rawMaster >= total : rawMaster <= 0;
```

`RAFPlayback._run` (`playback.ts`) passes the rAF timestamp straight through — no accumulation, no gap detection, no re-anchor. rAF does not fire in a hidden tab, so the first frame after the tab returns carries a `clock` advanced by the entire hidden interval. With `total = 1940 ms`, **any hide longer than ~2 s returns `finished === true` on the first visible frame** → `settleSequence` → the play promise resolves → the demo's `finally` dispatches `PAUSE` (`useSequenceDemo.ts:231–239`). The user switches tabs for five seconds and comes back to a storyboard that silently ran to the end and parked.

Note also that during the hide the machine parks `status: "suspended"` (`sceneMachine.ts:202–207`), so the mirror's `frame` returns `false` and self-terminates (`useSequenceDemo.ts:193–196`) — the read-out freezes while the engine clock keeps counting. The two loops disagree about what "paused" means, and only one of them is gated.

The fix shape is one line at the seam, not a rewrite: the sequence's own `startLoop`/`stopLoop` (`useSequenceDemo.ts:223–249`) already drive both loops correctly and are already handed to the hand-built adapter (`:411–412`) — they are simply never handed to a visibility gate.

*Falsifier:* any dt clamp / gap re-anchor inside `RAFPlayback._run` or `driveSequenceFrame` (read both: none); an engine-level `visibilitychange` listener (`grep` over `src/animation/physics/playback.ts` and the sequence module: none); a second `useSceneVisibilityPause` registration somewhere in the sequence tree bound to `sequence.playback` (grep over `demo/scenes/sequence/`: the only visibility wiring reaches it through `useSweepScene`); or a browser that keeps firing rAF in background tabs (then the sequence merely plays on unseen — a lesser but still-wrong outcome). Also killed if `machine.dispatch({type:"TAB_HIDDEN"})` were shown to reach `adapter.suspend()` — `useSceneMachine.ts:241–244` says explicitly it does not.

*Marked:* **UNPROVEN-NEEDS-LIVE** as a user-visible sequence; the code path is proven statically end to end.

---

### L-4 · MINOR · the last surviving `isControlsPanelOpen` poke

`SequenceScene.vue:30–31`:

```ts
const storedControls = getStoredAnimationGroupControlOptions(SCENE_ID);
storedControls.isControlsPanelOpen = false;
```

Three separate authorities in the tree say this line should not exist:

1. **`ChromeDock.vue:104–110`** names *this scene* by id: "For home/sequence the DFA set is [] — so NO control affordance renders, which is the DFA-driven supersession of those scenes' former `isControlsPanelOpen = false` poke-sets (one authority for 'this scene has no panel', not a per-scene imperative write)."
2. **`EasingScene.vue:36–41` and `SpringScene.vue:46–51`** each carry a tombstone for the identical line: "S.G1 S1c (p10 F4 — writer c) — the former `storedControls.isControlsPanelOpen = true` born-open POKE is DELETED too (the last dead write of the three-writer chain) … The scene pokes nothing." The chain was extirpated; this is the straggler.
3. The write is **inert**. `AnimationControlsGroup.vue:7–8` applies `controls-layout--open|--closed` *and* `controls-layout--railless`, and `AnimationControlsGroup.css:64–69` gives both `--closed` and `--railless` the same single declaration `--rail-track: 0px`. The sequence is always railless (its `surfacesFor` set is empty, §L-11), so the open/closed class changes nothing. The only other reader, `useControlsLayout.ts:22–70` (which *would* re-open the panel on a tab switch, `:66`), lives inside `ControlsPaneWrapper`, which is `v-if="hasControlSurfaces"` (`AnimationControlsGroup.vue:19`) — never mounted for this scene.

Also note the *shape*: every sibling that legitimately touches this store defaults rather than clobbers — `CubeScene.vue:63` is `storedControls.ppMode ??= false`. This one is an unconditional `=` against a `useStorage`-backed persisted bucket (`controlOptionsStore.ts:48–57`), i.e. a scene component writing a user-owned global on every setup.

Severity stays MINOR precisely because the write is inert today: with the bucket default `isControlsPanelOpen: true` (`controlOptionsStore.ts:45`), the first entry flips it and Vue's identity check suppresses subsequent writes, so it is one dead localStorage write per fresh profile and nothing more.

*Falsifier:* a rule anywhere keyed on `.controls-layout--closed` that `--railless` does not also satisfy (grep over `demo/`: the two class names appear only at `AnimationControlsGroup.vue:7–8` and `AnimationControlsGroup.css:64,67`); or a reader of the `sequence` bucket's `isControlsPanelOpen` that renders under an empty surface set.

---

### L-5 · MINOR · dead import, and nothing in the repo can see it

`SequenceScene.vue:8` — `import { computed, provide, ref } from "vue";`. `computed` occurs exactly once in the file (`grep -c computed` → 1, the import itself). `provide` and `ref` are both used (`:19`, `:41`).

What makes this worth reporting is not the byte, it is the **gate hole it proves**:

- there is no ESLint in the repo at all (`ls eslint.config* .eslintrc*` → no matches; `"lint": "depcruise src"` — a dependency-cruise over `src/` only, `package.json:44`);
- `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"` (`:37`) — `tsc` does not parse `.vue`; `demo/env.d.ts:3–6` shims every SFC to `DefineComponent<{}, {}, any>`;
- CI runs `npm run check:lib` (`.github/workflows/ci.yml:41–42`, `release.yml:42–43`) — `tsconfig.lib.json`, `src/` only;
- `tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters`.

So **no SFC `<script setup>` block in this demo is type-checked or linted by anything**. That is the standing condition under which L-6 and L-7 below also survive undetected.

*Falsifier:* a `vue-tsc` invocation anywhere in `package.json` scripts or the workflows (grep: none); an ESLint config in a parent directory that reaches this repo.

---

### L-6 · MINOR · the expose docblock describes an expose that isn't there

`SequenceScene.vue:36–38`: "`scenePlayback` is **also exposed** as the STABLE bind-target identity the shell's once-per-entry ready-guard keys on (a facility-only scene has no `animationGroup`)."

The expose object is `{ facility, superKey, isStarted }` (`:39–41`). There is no `scenePlayback` key.

Behaviour is nonetheless correct, which is why this is MINOR and not MAJOR: the shell keys on `sceneRef.value?.facility?.identity` (`useSceneMachineShellBinding.ts:163`, and the readiness watcher at `:217–220`), and `facility.identity = scenePlayback` (`useSequenceDemo.ts:423`). The prose describes the *pre-facility* design; the code moved to `facility.identity` and the comment did not. The shell's own comments have the same drift (`:160–161`, `:216`: "watch its stable `scenePlayback` too" — it watches `facility.identity`).

*Falsifier:* any consumer reading `sceneRef.value?.scenePlayback` — then the missing key would be a real defect, not drift. Grep over `demo/` for `scenePlayback` outside `scenes/`: only `useSweepScene.ts`, `scenePlaybackAdapters` re-exports, and comment text. None reads it off the scene ref.

---

### L-7 · MINOR · `isStarted: ref(true)` — write-only, and typed wrong

`SequenceScene.vue:41` constructs a ref *inside the expose literal*, so the scene retains no handle to it and can never observe a write.

- **Nothing reads it.** The only consumer of the exposed field is `useSceneMachineShellBinding.ts:264–266`, which **writes**: `sceneRef.value.isStarted = started`. The `isStarted` that reaches `TransportDock`/`AnimationControlsGroup` is a machine-derived computed (`AnimationControlsGroup/useAnimationGroupPlayback.ts:54–63`), not the scene's. For this scene the exposed ref is a write-only sink.
- **It is typed wrong.** `SceneExposedApi.isStarted?: boolean` (`sceneExposedApi.ts:33`). A `Ref<boolean>` is supplied. Runtime survives because Vue's expose proxy unwraps refs, so reads yield `true` and the shell's write lands on `.value` — but the declared contract and the supplied value disagree, and per L-5 nothing checks it.

The named-local form in `EasingScene.vue:46,118` / `SpringScene.vue:56,186` is the fleet idiom, so the *pattern* is inherited; the inline-in-expose form is this scene's own, and it is the one that makes the deadness unobservable from inside the component.

*Falsifier:* any read of `sceneRef.value?.isStarted` (grep over `demo/app/`: only the write at `:265`); or a `vue-tsc` gate that would reject the Ref/boolean mismatch (none, L-5).

---

### L-8 · MINOR · the reel outlives the scene

`useSequenceDemo.ts:364–392` schedules five `window.setTimeout`s (0/90/180/270/360 ms) each of which sets `child.managed = false` and starts a **standalone** `child.play()` — five independent `RAFPlayback` loops painting five detached elements.

The teardown seam (`:447–450`) is:

```ts
onScopeDispose(() => {
    stopMirror();
    sequence.stop();
});
```

`sequence.stop()` stops the *Sequence's* loop (`lifecycle.ts:77–83`). It does not touch children running their own loops — by construction, since `settleSequence` merely releases ownership (`transport.ts:266–276`). No timer handle is retained, so no timeout is cleared. Hit Reel, switch scenes within ~360 ms, and up to five child loops plus their pending timers run on past unmount, mutating style on elements no longer in the document, with their `finally` handlers calling `sequence.seek(...)` on a stopped sequence.

Bounded (`REEL_STAGGER*4 + ROW_DURATION` ≈ 1.26 s, self-terminating, and a remount builds fresh `childAnims`), which is why this is MINOR rather than a genuine leak — but it is the one teardown path the composable's otherwise-exemplary `onScopeDispose` (see S+3) does not cover.

The sibling `useSequenceInstrument.ts:34` has the same untracked-timer shape (`window.setTimeout(… , 760)` writing `isPoweringOn.value` after a possible unmount) — harmless, same class.

*Falsifier:* a `clearTimeout` path or a `Sequence.stop()` that also stops standalone children (`lifecycle.ts:77–83` + `transport.ts:266–276`: it does not); or an `onScopeDispose`/`onBeforeUnmount` in `SequenceTarget.vue` that stops `demo.childAnims` (read whole: it has only an `onMounted`, `:184–196`).

---

### L-9 · MINOR · the reel returns the children with their anchors cleared

`Sequence.play()` seeds each child `startTime = at; started = true; managed = true` (`lifecycle.ts:57–61`), and `pause()` explicitly **retains** that seeding ("children stay `managed`, unlike `stop()`", `:85–98`).

`playReel` (`useSequenceDemo.ts:364–392`) pauses the master, then for each child sets `managed = false` and calls `child.play()`. When that standalone play settles, the engine clears the anchor (`play-lifecycle.ts:465`, `startTime = undefined`). The reel's `finally` restores `setTimingFunction` and `managed = true` — **but not `startTime = at`**. A subsequent Play takes the mid-play branch `sequence.resume()` (`useSequenceDemo.ts:225–227`), and `resume` does not re-seed child anchors (`lifecycle.ts:107–116`) — only `play()` does.

Damage is contained because the per-frame paint runs through `applySequenceAt`, which derives the local clock from `at`, not from `startTime` (`transport.ts:31–38`), and runs *after* `advanceTo` in the same frame (`transport.ts:243–254`). So the pixels stay right; what goes wrong is the `advanceTo` bookkeeping — `play-lifecycle.ts:164–167` lazily re-seeds `startTime = t + delay`, restarting each touched child's local clock at the master's current phase, which is what the `animationstart`/`animationend` emission keys on.

*Falsifier:* the demo binding any child animation event (it binds none — no `onStart`/`onEnd`/`addEventListener` in the sequence tree); or `resume()` re-seeding anchors (`lifecycle.ts:107–116`: it does not); or `applySequenceAt` reading `startTime` (`transport.ts:35`: it reads `at`). If a future consumer binds `animationend` to these children, this promotes to MAJOR.

---

### L-10 · MINOR · two adapters where the composable already built one

`useSweepScene` returns `{ playback, startLoop, stopLoop, scenePlayback }` — a fully-wired `createRafAdapter` at `useSweepScene.ts:97–107`. Easing and spring consume it (`useEasingDemo.ts:203,350,362`; `useSpringDemo.ts:254,405,429`).

`useSequenceDemo.ts:188–204` destructures only three of the four, then hand-builds a second adapter at `:400–413` with the same five getters and different `startLoop`/`stopLoop`. Every mount therefore allocates a `ScenePlayback` that is never registered, never called, and never referenced.

The rebuild is *justified in substance* — the sequence's loop verbs must drive `sequence.resume()/pause()`, not the mirror (`:223–249`) — which is exactly the point: `useSweepScene`'s contract has no seam for "the sweep is a mirror, the motion is elsewhere". It hard-wires both the adapter and the visibility gate (`:119`) to its own `playback`. That missing parameter is the shared root of this finding and **L-3**: one is the wasted object, the other is the wrong loop being protected.

*Falsifier:* a consumer of the discarded `scenePlayback` (the destructure at `:188–192` renames three fields and takes no fourth); or an option on `SweepSceneOptions` (`useSweepScene.ts:43–64`) that lets a caller supply the loop verbs (there is none).

---

### L-11 · MINOR · the docblock's cited authority was deleted

`SequenceScene.vue:26–28`: "The control-surface DFA (H.W11.S4 / I2 — `CONTROL_SURFACES.sequence = []`) is the AUTHORITY on this being a self-contained, panel-less stage."

`controlSurfaces.ts:1–12` records the opposite: the module was "**INVERTED at T.B2** from a hand-maintained per-scene exclusion TABLE (the **deleted** `CONTROL_SURFACES` / `CONDITIONAL_SURFACES` rows, keyed by SceneId) into a DERIVATION off the live scene facility." `grep -rn "CONTROL_SURFACES" demo/` finds the symbol only in prose.

The live authority is `surfacesFor(facility, selected)` (`controlSurfaces.ts:~96–128`), which returns `[]` here because the lone channel carries no `animation` and declares no `surfaces` (`useSequenceDemo.ts:424–433`), and `facets` is empty. Sub-note: `controlSurfaces.ts` says "a light channel contributes its honest declared subset (**sequence's lone channel declares []**)" — the channel does not declare `surfaces` at all; the `[]` arrives via `?? []`. Same outcome, but "declares" overstates the tree, and an added-later channel property could change the result silently.

*Falsifier:* a live `CONTROL_SURFACES` export anywhere (grep: none).

---

### L-12 · INFO · the provide contract has no guard

`SequenceScene.vue:19` is the sole `provide(SEQUENCE_DEMO_KEY, demo)`. Both consumers assert non-null: `SequenceTarget.vue:150` and `SequenceScrubber.vue:47`, each `inject(SEQUENCE_DEMO_KEY)!`. Rendered outside the scene, the target's template dereferences `demo.progress.value` at first paint and throws a bare `TypeError`, not a named contract error. The whole `demo` surface (including `sequence`, `childAnims`, and every writable ref) is handed down unwrapped — any descendant may write `demo.progress.value` behind the composable's back.

*Falsifier:* any use of these components outside the scene subtree (grep for `SequenceTarget`/`SequenceScrubber`: rendered only at `SequenceScene.vue:3` and `SequenceTarget.vue:127`), which is why this stays INFO — the contract is unenforced but currently unviolated.

---

### L-13 · INFO · type honesty and import hygiene in the closure

- `useSequenceDemo.ts:126` — `const childAnims: CSSKeyframesAnimationT<any>[]`, and `:298` casts `e.animation as CSSKeyframesAnimationT<any>` to find the index. The engine is generic in `V extends Vars` (`sequence.ts:117`); the demo's rows all share one keyframe shape, so a concrete `Vars` would type this without a cast.
- `useSequenceDemo.ts:5,6,7` — three consecutive `import` statements from the same specifier `@mkbabb/keyframes.js`.
- `SequenceScene.vue:16` — `const SCENE_ID = SEQUENCE_SCENE_ID;` is a pure rename of an imported constant used twice (`:30`, `:40`). Fleet-consistent (`CubeScene.vue:60`), so noted, not charged.

---

## 3. Superlatives (L-18, the other direction)

**S+1 · inv-ζ is real here, not aspirational.** The scene claims the demo's signature motion *is* the library. Verified by exhaustion, not by reading the comment:

```
$ grep -rn "requestAnimationFrame\|setInterval" demo/scenes/sequence/   → 0
```

Zero. The balls are painted by `CSSKeyframesAnimation` under `Sequence`'s own `RAFPlayback` (`sequence.ts:148`, `lifecycle.ts:70–73`), the stagger positions come from the engine's `stagger` (`stagger.ts:133–177`) fed straight into `Sequence.add(anim, at)`, and the only Vue-side loop is a read-out that copies one scalar. The two `setTimeout`s in the tree are gesture/boot scheduling, not motion clocks. *Falsifier:* the grep above returning anything, or a hand-rolled dt integrator (none found in either composable). **This is the axis's exemplary case: the component under audit dogfoods the temporal orchestrator honestly.**

**S+2 · a 43-line scene shell that actually is one.** Template is four lines; script is provide + expose. No motion logic, no glass-ui import, no CSS block, no lifecycle hooks. Every scene concern is delegated: engine to `useSequenceDemo`, presentation to `SequenceTarget`, gesture/boot to `useSequenceInstrument`, transport to the machine. Goldilocks — the shell is the smallest thing that could route the scene, and the ≤500L split seams around it (`SequenceScrubber`, `SequencePlayhead`, `SequenceAxis`, `useSequenceInstrument`) are all under 200 lines and all colocated. *Falsifier:* a responsibility in the SFC that belongs elsewhere — read whole; there is none.

**S+3 · the D12 shadow-authority kill, executed and documented.** `useSequenceDemo.ts:47–55` records the deletion of a private `isPlaying = ref(false)` and replaces it with a read-only projection of `machine.status` (`:157–158`), with play/pause dispatching to the single authority. The scene therefore cannot drift from the machine. This is the correct cure for exactly the class of bug L-3 is a residue of, applied deliberately. *Falsifier:* a writable `isPlaying` in the sequence tree (there is none — `useSceneTransport` returns a projection).

**S+4 · `markRaw` discipline on the engine graph.** `markRaw` on every child animation (`:139`) and on the `Sequence` (`:147`); `childAnims` is a plain array, not a `ref`. No engine object is ever proxied, so no per-frame reactivity tax and no accidental deep-reactive traversal of the keyframe graph. *Falsifier:* a `ref(new Sequence())` or `reactive(childAnims)` anywhere (none).

**S+5 · the engine target is the right element, and the tree says why.** `SequenceTarget.vue:108–117` binds each child animation to the traveller ball, not the row track, with the rationale recorded inline: painting `scale: 0.7` on the track shrank the whole row and dropped the 24 px handle to 16.8 px (a target-size regression). Attachment happens in `onMounted` before the shell's readiness bind, so the "targets-attached" precondition (`useSceneMachineShellBinding.ts:171–176`) is satisfied by construction rather than by luck. *Falsifier:* `setTargets` on the track ref (`:187` uses `ballEls`).

**S+6 · the reel respects the engine's ownership protocol.** `Animation.managed` is documented as "Standalone `.play()` throws when set rather than racing the group" (`animation.ts:122–125`). `playReel` clears `managed` before each standalone `play()` and restores it after (`useSequenceDemo.ts:376–382`) — the exact handshake the engine demands, done by a consumer that could easily have just called `play()` and eaten the throw. (L-9 is the *anchor* half it misses; the *ownership* half is right.) *Falsifier:* the engine not throwing on managed standalone play — the field doc and the guard say it does.

---

## 4. Where this lane contradicts / extends the corpus

- **Extends F-1.** The census rates the phantom dep RED at repo scope. At component scope for `SequenceScene` it is a **BLOCKER**, because the scene's entire render is one glass-consuming child (§L-1). Independently re-verified (0 / 0 / installed 7.0.0).
- **Extends S-4.** The census flags `SequenceScrubber` (162 L) as an AMBER `Slider`/`ScrubberTimeline` shadow. Reading the tree adds that the *rows* carry a second, larger hand-rolled slider surface — five `role="slider"` handles with hand-written `aria-value*` and a bespoke keyboard model (`SequenceTarget.vue:96–107,232–243`) sharing one `useDragScrub`. Any S-4 replacement wave must take the row handles with it or the scene ends up with two slider idioms.
- **Contradicts nothing in `lane-frontend.md`.** Its scene-roster row (`43 | sequence/SequenceScene.vue | b`) matches the tree exactly: 43 lines, no glass-ui import.
- **`lane-library.md`** (parser/parse seams) does not reach this component; no overlap to cite.

---

## 5. Verdict

The scene **shell** is close to exemplary: 43 lines, one responsibility, zero hand-rolled clocks, correct `markRaw`/`managed`/target discipline, and the shadow-playback authority genuinely deleted. Its defects are small and mostly stale-prose or dead-surface (L-4 through L-7, L-11), all invisible to a repo with no SFC lint or typecheck (L-5).

The **closure** is where it bleeds. Two majors are live: the `Sequence` duration invariant is broken by the page's own headline gesture (**L-2**, one keypress away, and it exposes a genuine missing engine verb), and the tab-visibility gate is bound to the mirror instead of the motion (**L-3**, one missing parameter on `useSweepScene` away). Above both sits the phantom dep (**L-1**), which makes the whole scene unbuildable from a clean checkout regardless of anything else.

**defects: 13 · blockers: 1 · superlatives: 6**
