claude-opus-5[1m]

# Challenge · `AnimationControlsGroup.vue` · axis **L — LIBRARY**

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/AnimationControlsGroup.vue` (336 lines; 214 template / 122 script)
**Read whole, plus every import:** the 4 colocated composables (`AnimationControlsGroup/use{AnimationGroupActions,AnimationGroupPlayback,AnimationProgress,ControlsKeyboardShortcuts}.ts`), `ControlsPaneWrapper.vue`, `TransportDock.vue` (expose surface), `DemoGlobalChrome.vue`, `transportSource.ts`, `composables/{useRafLoop,useDemoTicker}.ts`, `@composables/scene-runtime/useSceneTransport.ts`, `@composables/scene-facility/index.ts`, `@state/controlOptionsStore.ts`, `@state/sceneMachine.ts` (SCRUB reducer), `EditorShell.vue` + `App.vue` (the sole host chain), `useSceneMachineShellBinding.ts`, and the two vitest files that cover this seam.
**Method** static, source-derived. No browser tooling. Nothing written outside this file; no product source touched in any repo.

**Tally — defects 9 (1 BLOCKER · 3 MAJOR · 5 MINOR) · superlatives 4.**

Prior corpus folded, with one explicit contradiction: lane-frontend **F-1** (phantom dep) is corroborated at this component (→ L-3); **S-2** (type-only `/tabs`) passes through it (→ noted, not re-charged); **F-5** (re-export shims) is **contradicted on its evidence** (→ L-5). Lane-library's parse seams do not reach this component — it consumes no parser surface.

---

## Verdict

The component's *architecture* is better than its reputation would suggest: the machine-as-single-authority refactor (T.B8) is real, the reactive-props/getter discipline is flawless, the RAF dogfood is exemplary, and an 18-shortcut registration that looks like a textbook leak is provably clean. Four superlatives, and I record them so a later pass does not "fix" a non-bug.

But the component carries **one shipped regression of the exact defect its own proof gate claims to have cured**, and the gate is green. That asymmetry — a passing test that licenses the bug it was written to forbid — is why this lands BLOCKER rather than MAJOR.

---

## BLOCKER

### L-1 · The channel-first `sliderUpdate` shortcut silently un-does the T.B8 SCRUB-persistence cure for *every* facility scene — and the proof test stays green because it tests the composable, not the seam production takes

**Provenance.** `AnimationControlsGroup.vue:244-254`

```ts
const sliderUpdate = (val: { t: number; animation: KeyframesAnimation<any> }) => {
    const ch = channels?.find(
        (c) => c.animation && c.animation.id === val.animation.id,
    );
    if (ch) {
        const dur = val.animation.options.duration ?? 1000;
        ch.setProgress(dur > 0 ? val.t / dur : 0);
        return;                    // ← :252
    }
    groupSliderUpdate(val);        // ← :253, unreachable for facility scenes
};
```

The chain, each link verified in the tree:

| # | Fact | Site |
|---|---|---|
| 1 | The **only** `SCRUB` dispatch on this axis lives in the *group* path | `AnimationControlsGroup/useAnimationGroupPlayback.ts:146` |
| 2 | `facilityFromGroup` emits **one channel per group animation, each carrying `animation: anim`** | `demo/composables/scene-facility/index.ts:92-109` |
| 3 | …so the `find` at `:246-248` **always matches** for group scenes | (1)+(2) |
| 4 | cube / amiga / square all build their facility via `facilityFromGroup` | `CubeScene.vue:228`, `AmigaScene.vue:232`, `SquareScene.vue:311` |
| 5 | `channels` reaches this component non-empty for every non-home scene | `App.vue:227` → `EditorShell.vue:78` → prop `:142` |
| 6 | `facilityFromGroup`'s own `setProgress` dispatches **nothing** — it is `setChildTime(...).render()` only | `scene-facility/index.ts:104-108` |

Therefore, for cube/amiga/square, every slider scrub returns at `:252` and the machine snapshot is **never written**. `groupSliderUpdate` — the sole carrier of the cure — is dead code in production.

**The regression is verbatim the one T.B8 named.** `useAnimationGroupPlayback.ts:140-146`:

> *"closes the group-scene scrub-persistence gap: cube/amiga/square previously only refreshed `t` at captureActive()/NAVIGATE-away, so a scrub-then-reload lost it"*

That is the current behavior again. `sceneMachine.ts:170-174` (`case "SCRUB"`) is simply never reached from the UI on those scenes, so `perScene[scene].animations[*].t` refreshes only at `captureActive()` on NAVIGATE/SUSPEND. Scrub, then reload without navigating: playhead lost.

**Why the gate did not catch it — the aggravating half.** `test/demo/state/no-shadow-playback-authority.test.ts` asserts the cure at `:83-95`:

```ts
const { sliderUpdate } = useAnimationGroupPlayback(() => group, storedOptions({…}), emit);
sliderUpdate({ t: 555, animation: anim as any });
expect(machine.perScene.value["cube"]!.animations["spin"]!.t).toBe(555);
```

It calls the **composable's** `sliderUpdate` directly (imported at `:21`). It never mounts the component, so the channel branch at `:246-252` — which is what cube actually executes — is invisible to it. The file's own header, `:12-13`, states:

> *"BITE: reds the instant `sliderUpdate` stops dispatching SCRUB … Greens on the cure."*

False. The `sliderUpdate` the user reaches stopped dispatching SCRUB and the suite stayed green. The gate now certifies a property production does not have, on the very scene (`"cube"`) and animation (`"spin"`) it names.

**Severity — BLOCKER.** A user-visible state-loss regression is MAJOR on its own. What makes it blocking is the false proof: any repair wave reading the green gate will conclude the seam is protected and route around it. The gate must move to the component seam (or the channel branch must dispatch) *before* anything else in this component is touched.

**Falsifier.** Exhibit any production code path that dispatches `{ type: "SCRUB" }` when a facility channel's `setProgress` runs. `grep -rn '"SCRUB"' demo/` returns exactly three sites: `useSequenceDemo.ts:285`, `:348` (the sequence scene's own raw-rAF path — not the channel path, and sequence is not a group scene), and `useAnimationGroupPlayback.ts:146`. `scene-facility/index.ts:104-108` dispatches nothing. **Or** show cube/amiga/square do not expose facilities — contradicted by the three `facilityFromGroup` call sites in row 4. **Or** show `channels` arrives `undefined` at this component in the App — contradicted by `App.vue:227`.

*Secondary observation, folded here rather than charged separately:* the channel branch normalizes (`val.t / dur`, `:250`) only for `setProgress` to immediately denormalize (`clamped * dur`, `scene-facility/index.ts:107`) using the same `anim` and the same `?? 1000` default — an exact round-trip, so no drift. But the two disagree at `dur <= 0`: `:250` sends `0` where the group path would have applied `setChildTime(animation, t)` with the raw `t`. Unreachable in the current tree (no zero-duration animation exists) — noted, not charged.

---

## MAJOR

### L-2 · `scrubActive` repeats L-1 on the keyboard axis — six shortcuts, same silent bypass

**Provenance.** `AnimationControlsGroup.vue:264-271`

```ts
const scrubActive = (fraction: number) => {
    const ch = selectedChannel.value;
    if (ch) {
        ch.setProgress(clamp(fraction, 0, 1));
        return;                    // ← :269
    }
    groupScrubActive(fraction);    // ← :270, unreachable for facility scenes
};
```

The composable's `scrubActive` (`useAnimationGroupPlayback.ts:168-177`) reaches `sliderUpdate` → SCRUB. This wrapper returns before it. Bound to six bindings — ArrowLeft/Right, Shift+ArrowLeft/Right, Home, End (`useControlsKeyboardShortcuts.ts:53-58`) — so keyboard scrubbing on cube/amiga/square is likewise non-persisting.

Note the *third* lookup key: `sliderUpdate` matches by `c.animation.id` (`:247`), `scrubActive`/`getActiveT` match by `c.name === storedControls.selectedAnimation` (`:186-188`). Two identity axes for one channel set. Coherent today because `facilityFromGroup` keys names off the same `Object.entries(group.animations)` that supplies the animations, but it is two invariants where one would do.

**Severity — MAJOR, not BLOCKER.** Same root cause as L-1 at a second entry point; the fix is one shared helper. Charged separately because it is a distinct code site a repairer will otherwise miss, and because *no* test covers this path at all (unlike L-1, which at least has a misaimed one).

**Falsifier.** Same as L-1. Additionally: show that `useControlsKeyboardShortcuts` receives the *composable's* `scrubActive` rather than the component's wrapper — it does not; `:328` passes the local `scrubActive` defined at `:264`.

---

### L-3 · The F-1 phantom dependency bites this component at three import specifiers, and takes the whole keyboard surface with it

**Provenance.**

- `AnimationControlsGroup.vue:124` — `import { TooltipProvider } from "@mkbabb/glass-ui"`
- `AnimationControlsGroup.vue:126` — `import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs"`
- `AnimationControlsGroup/useControlsKeyboardShortcuts.ts:1` — `import { registerShortcut } from "@mkbabb/glass-ui/keyboard"`

`/Users/mkbabb/Programming/keyframes.js/package.json` declares exactly one dependency — `@mkbabb/value.js: 4.0.0` — and glass-ui appears in no field. `grep -c "glass-ui" package-lock.json` → **0**. Installed 7.0.0 sits in `node_modules/@mkbabb/glass-ui` as an undeclared artifact. This corroborates **lane-frontend F-1 (RED)**; I do not re-litigate the headline.

**What this component adds to F-1 that the census could not see from the repo level:** the third specifier is not decorative. `registerShortcut` is this component's *only* teardown-correct shortcut registry (see superlative L-S1) and the sole binding site for all 18 of its keyboard actions. A resolution failure does not degrade the component — it removes play/pause, stop, reset, all six scrub bindings, animation cycling, tab switching, Copy-CSS, delete-keyframe, and undo/redo in one stroke. And `.npmrc` (`legacy-peer-deps=true`, single line) guarantees the failure is silent at install and only surfaces at build.

The two type-only specifiers are the **S-2** tell exactly as the census framed it: the demo imports glass-ui's tab *data contract* (`SegmentedTabOption`, `:126`, threaded through `:173` → `:30` → `ControlsPaneWrapper.vue:198`) while rendering its own strip. I record the pass-through; the charge stays S-2's.

**Falsifier.** Show `@mkbabb/glass-ui` in any dependency field of `keyframes.js/package.json`, or any entry in `package-lock.json`. Both are currently absent. (Verified separately that the imports *resolve* against the installed tree — `TooltipProvider` via `dist/components/tooltip/index.d.ts`, `SegmentedTabOption` via `dist/components/tabs/index.d.ts`, `registerShortcut` via `dist/composables/keyboard/useKeyboardShortcuts.d.ts` — so this is a declaration defect, not a broken import.)

---

### L-4 · `animControlRefs` is a parent-owned map written by a child through a prop, and the write is never undone

**Provenance.** `AnimationControlsGroup.vue:191` declares it, `:27` passes it down:

```ts
const animControlRefs = reactive<Record<string, any>>({});
```

`ControlsPaneWrapper.vue:194` receives it as a **prop** — `animControlRefs: Record<string, any>` — and `:51` **writes into it**:

```vue
:ref="(el: any) => { if (el) animControlRefs[host.name] = el }"
```

Two defects on one line.

**(a) Ownership inversion — CONFIRMED.** The child mutates parent state with no emit and no contract. The parent then reads that map in three places it does not control: `activeKeyframesRef` (`:193-196`), `activeTimelineRef` (`:198-201`), `switchTab` (`:315-320`). The component's own comment at `:311-312` claims *"switchTab stays here: it drives the **component-owned** animControlRefs registry"* — the registry is not component-owned; the component owns the object identity and the child owns every write. One-way data flow is inverted, and Vue will not warn because the prop is mutated, not reassigned.

**(b) Entries outlive their components — PLAUSIBLE, with a bound I must state.** `if (el)` swallows the unmount `null`, so no entry is ever removed. **But** `EditorShell.vue:76` keys the component `:key="superKey"`, so the whole `reactive` map is discarded on every scene switch. This is therefore **not an unbounded leak**, and I will not call it one. The retention window is one scene's lifetime, and a remount under the same name overwrites.

What survives that bound is a *staleness* hazard. `controlHosts` (`ControlsPaneWrapper.vue:207-228`) `flatMap`s **only channels carrying `animation`** — a light channel mounts no host. The selection `watchEffect` (`:208-218`) validates `selectedAnimation` against the **full** channel axis (`:210`), light channels included. So a light channel is a *valid selection with no live host*. If a painting channel of the same name unmounted earlier in the same scene, `activeKeyframesRef`/`activeTimelineRef` resolve the dead instance with no liveness check, and Mod+S / Delete / Mod+Z / Mod+Shift+Z (`useControlsKeyboardShortcuts.ts:64-71`) dispatch into it instead of no-op'ing.

The correct idiom is identity-checked removal — `if (el) map[n] = el; else if (map[n] === self) delete map[n]` — which also preserves the mount/unmount ordering safety the bare `if (el)` was presumably reaching for.

**Falsifier.** For **(b)**: show that no scene mutates `facility.channels` membership, or a channel's `animation` presence, within a single `superKey`. I searched and found no such mutation, which is why (b) is marked PLAUSIBLE rather than CONFIRMED — but it is also not disproven, and the guard costs one line. For **(a)**: show an emit-based or `provide`-based write path — there is none; `ControlsPaneWrapper.vue:51` is the only writer and it writes through the prop.

---

## MINOR

### L-5 · Contradiction of lane-frontend §7.3 **F-5**: the `useAnimationGroupPlayback` shim is **not** dead

lane-frontend.md §7.3 states:

> **`useAnimationGroupPlayback.ts` is DEAD** — zero consumers:
> `$ grep -rn "composables/useAnimationGroupPlayback" --include="*.vue" --include="*.ts" .` → *(no output)*

**The tree disagrees.** `test/demo/state/no-shadow-playback-authority.test.ts:21`:

```ts
import { useAnimationGroupPlayback } from "../../../demo/components/instrument/transport/composables/useAnimationGroupPlayback";
```

That string contains `composables/useAnimationGroupPlayback` and would have matched. The lane's scan ran with **cwd = `demo/`** — its own output paths begin `components/instrument/…`, not `demo/components/…` — so `test/` was outside the scan root.

This is a correction of evidence, not of law. F-5's underlying charge stands: the shim violates the standing `feedback_no_backwards_compat` law. But the incoherence is *sharper* than F-5 recorded, and in a way that matters for L-1: two sibling suites import the same composable through two different paths —

- `test/demo/state/no-shadow-playback-authority.test.ts:21` → via the shim
- `test/demo/instrument/useAnimationGroupPlayback.test.ts:5` → via the canonical path

— and the one reaching through the shim is precisely the one that proves the SCRUB contract L-1 shows to be broken. The indirection is part of why the seam drift went unnoticed. A deletion wave that follows F-5's "zero consumers" finding will red the build.

**Falsifier.** Show the import at test `:21` resolves elsewhere, or that the file is not collected by vitest.

### L-6 · The transport-axis expression is triplicated inside 30 lines

`channels?.… ?? Object.keys(animationGroup.animations)` is independently re-derived three times in this file — `transportNames` (`:181-183`), `selectedChannel` (`:186-188`), and `validNames` inside the selection `watchEffect` (`:209-210`) — plus a fourth shape in `ControlsPaneWrapper.vue:207-228`. `validNames` at `:210` is byte-identical to `transportNames`'s body at `:182` yet recomputed rather than read from the computed sitting 28 lines above it.

**Falsifier.** Show a reason `validNames` must not be `transportNames.value` — e.g. a deliberately untracked read. There is none: `watchEffect` already tracks both operands through the same reactive sources, so reading the computed is dependency-identical.

### L-7 · The selection `watchEffect` writes to its own tracked dependency

`:208-218` reads `storedControls.selectedAnimation` at `:213` and writes it at `:216`, making the effect self-retriggering. It **does** converge — the second pass sees `null`, the guard is falsy, no write — so I explicitly do **not** claim a bug. The claim is idiom: this is a `watch` with an explicit source, not a `watchEffect`, and the self-write is the kind of thing that stops converging the moment someone adds a second write branch.

**Falsifier.** Demonstrate non-convergence (I could not — the write makes its own guard falsy), or show Vue does not track the `:213` read (it does; `storedControls` is a reactive store bucket from `controlOptionsStore.ts:86-88`).

### L-8 · The `any` surface is load-bearing on exactly the members that carry the keyboard actions

Sixteen `any` across the component and its four colocated composables (4 · 5 · 4 · 1 · 2). Most are the benign `AnimationGroup<any>` engine generic. Two are not:

- `animControlRefs: Record<string, any>` (`:191`), re-declared `any` at the prop boundary (`ControlsPaneWrapper.vue:194-196`)
- `activeKeyframesRef` / `activeTimelineRef` (`:193-201`), typed `Ref<any>` at `useControlsKeyboardShortcuts.ts:20-22`

Consequence: every keyboard action is an unchecked double-optional call — `activeKeyframesRef.value?.copyCSS?.()`, `activeTimelineRef.value?.removeSelectedKeyframe?.()`, `?.undo?.()`, `?.redo?.()` (`useControlsKeyboardShortcuts.ts:64-71`), and `ctrl?.selectControl?.(tab)` (`:319`). Rename any of those on the child and the shortcut silently becomes a no-op; `vue-tsc` sees nothing. There is no accident here — the `?.method?.()` shape is *designed* around the `any`.

A typed surface exists to widen to: `ChannelControls.vue:410-414` is `defineExpose({ keyframesControlsRef, timelineRef, selectControl })` — exactly the three members read. `Record<string, InstanceType<typeof ChannelControls>>` would make all five call sites checked.

**Falsifier.** Show `ChannelControls` exposes no stable typed surface (it does, `:410-414`), or that `vue-tsc` already flags these (it cannot — `any` short-circuits both the index access and the optional call).

### L-9 · `TooltipProvider` configuration is triplicated down one ancestor chain

Three nested providers on a single path:

| Depth | Site | Props |
|---|---|---|
| 1 | `App.vue:3` | reka defaults |
| 2 | `AnimationControlsGroup.vue:2` | `:delay-duration="100" :skip-delay-duration="0"` |
| 3 | `ChannelControls.vue:2` | `:delay-duration="100" :skip-delay-duration="0"` |

Depth 3 is a strict descendant of depth 2 — `AnimationControlsGroup.vue:18` → `ControlsPaneWrapper.vue:50` → `ChannelControls` — with **byte-identical props**, so it provides nothing its ancestor has not. Depth 2 *is* load-bearing (it overrides App's defaults); depth 3 is pure duplication. The `100 / 0` pair has three declaration sites and no owner.

I explicitly do **not** claim a behavior bug: nested reka providers shadow cleanly, and with `skipDelayDuration = 0` there is no cross-scope grace period to lose. Duplication only.

**Falsifier.** Show `ChannelControls` mounting outside this component's subtree anywhere — then its provider is load-bearing for that host. Its only render site in the tree is `ControlsPaneWrapper.vue:50`, and `ControlsPaneWrapper`'s only mount is `AnimationControlsGroup.vue:18`.

---

## Superlatives (L-18 runs both ways)

### L-S1 · An 18-shortcut registration that discards every disposer — and is provably correct

`useControlsKeyboardShortcuts.ts:50-71` calls `registerShortcut` eighteen times and keeps **none** of the eighteen returned `() => void` disposers. It has no `onUnmounted`, no `onScopeDispose`. This is the exact shape of a textbook listener leak, and it is *not one*.

glass-ui's `registerShortcut` self-scopes. From `node_modules/@mkbabb/glass-ui/dist/keyboard.js` (minified fn `y`):

```js
let l = () => { a.delete(s) && o.value++; };
return t() && n(l), l;        // t = getCurrentScope, n = onScopeDispose
```

`getCurrentScope() && onScopeDispose(unregister)`. The composable is called synchronously at `AnimationControlsGroup.vue:322`, top-level in `<script setup>`, so the component's scope is current and all eighteen auto-unregister on unmount. That matters more than usual here: `EditorShell.vue:76` keys this component `:key="superKey"`, so it **remounts on every scene switch** — a genuine leak would accumulate eighteen live handlers per navigation.

Recorded deliberately so a future audit does not "repair" it into disposer bookkeeping the callee already does.

**Falsifier (it cuts).** Show `useControlsKeyboardShortcuts` called outside an effect scope — from `onMounted`'s microtask, an async boundary, or a plain event handler. Then `getCurrentScope()` is `null`, the auto-dispose never arms, and eighteen handlers leak per scene switch. The single call site is currently top-level setup; moving it is a silent regression with no type error.

### L-S2 · Every reactive-destructured prop crosses a composable boundary as a getter — zero reactivity-loss seams

`:140` uses Vue 3.5 reactive props destructure (vue 3.5.35 confirmed). Passing a destructured prop *by value* into a composable freezes it at setup — the classic 3.5 foot-gun. This file does not do it once:

- `:238` — `useAnimationGroupPlayback(() => animationGroup, …)`
- `:273-277` — `useAnimationProgress(() => animationGroup, isPlaying, () => channels)`
- `:303` — `getGroup: () => animationGroup`

and the callee signatures *demand* it (`getAnimationGroup: () => AnimationGroup<any>`, `getChannels: () => TransportChannel[] | undefined` at `useAnimationProgress.ts:9-14`), so the discipline is enforced by types rather than by care. The one by-value capture is deliberate and sound: `:176` `getStoredAnimationGroupControlOptions(superKey)` reads once, which is correct *precisely because* `EditorShell.vue:76` guarantees a remount when `superKey` changes.

That last point is the near-miss worth naming: the by-value capture is safe only by the host's `:key`. Drop the `:key` — or add a host that changes `superKey` in place — and `storedControls`, the shortcuts, and the entire playback surface stay bound to the previous scene's store, silently. The correctness is real but it is *borrowed from the caller*, and nothing in this file records the debt.

**Falsifier.** Find a `use*` call in this file receiving a destructured prop by value where the callee needs it live. There is none.

### L-S3 · `:deep()` used exactly once, exactly where a fragment-root child makes it mandatory

`AnimationControlsGroup.css:199` — `.controls-layout > :deep(.controls-pane-wrapper)` — is the **only** `:deep` in a 13 KB scoped stylesheet.

It is not defensive noise. `ControlsPaneWrapper.vue` has a **multi-root template** (`DefinePaneBody` at `:29`, the `Drawer` `v-if` at `:117`, the desktop div `v-else-if` at `:142`), so parent scope-id inheritance onto its root cannot be relied on the way it can for a single-root child. `:deep` makes the selector correct independent of that question. Pairing it with a `>` child combinator keeps the escape hatch to one generation instead of the whole subtree.

**Falsifier.** Show `.controls-pane-wrapper` reliably carries this component's `data-v-*` attribute despite the fragment root — that demotes this from exemplary to merely harmless, not to a defect.

### L-S4 · The engine-consumption idiom: one shared RAF driver, zero raw `requestAnimationFrame`

`useAnimationProgress.ts:18-42` drives per-channel progress through `useRafLoop` → `useDemoTicker`, which holds **one module-level `new RAFPlayback()`** (`composables/useDemoTicker.ts:8`) with a `Set` of subscribers, gated on `useDocumentVisibility()`, and an `onScopeDispose` that removes the subscriber *and* reconciles the loop (`:44-47`). The engine's own `RAFPlayback.loop` owns the self-rescheduling and its `_gen` restart-safety against double-scheduling; the demo adds no second scheduler and no per-component loop.

`{ guard: isPlaying }` (`useAnimationProgress.ts:41`) means a paused scene contributes literally zero work to the shared loop — `reconcile` stops the driver when no subscriber is enabled.

This is the dogfood done right: the demo consumes the library's playback driver rather than re-implementing it, and the teardown is complete at both levels (subscriber removal *and* driver reconciliation).

**Falsifier.** Find a raw `requestAnimationFrame` anywhere in this component's reachable graph. `grep` across `AnimationControlsGroup.vue`, all four colocated composables, `useRafLoop.ts`, and `useDemoTicker.ts` returns **none**.

---

## Not charged (examined, cleared)

Recorded so the next pass does not re-open them.

- **`TooltipProvider` from the root barrel** (`:124`) rather than the `/tooltip` subpath. Not a defect: root-barrel import is the *dominant* idiom in this demo (31 sites vs 45 subpath), so charging it here would be charging the tree's convention at one arbitrary file.
- **`DemoGlobalChrome` outside the `TooltipProvider`** (`:112` vs `:118`). It contains only SVG `<defs>` and a `<Teleport>`'d Toaster — no tooltip consumer. No defect.
- **Multi-root template + `v-bind="$attrs"`** (`:10`). Vue suppresses the extraneous-attrs warning when `$attrs` is accessed during render, and it is; template-compiled `mergeProps` handles the `class` merge against `:class` at `:4-9`. Correct.
- **`transportDockRef` optional-chained through a `v-if`** (`:98`, `:297`, `:325`). `TransportDock.vue:373` does `defineExpose({ resetIconSpin })`; the call site guards. Correct.
- **Module size.** 336 lines with 122 of script, four genuinely colocated composables, no god-module smell. Goldilocks — the K.WZ extraction landed.
- **Plain-letter shortcuts (`R`, `1`, `2`, `3`, `[`, `]`) firing while typing.** glass-ui's dispatcher skips `INPUT`/`TEXTAREA`/`SELECT`/`contentEditable`/`.monaco-editor` targets unless `allowInInput` (`dist/keyboard.js`, fn `f`), and the demo's Monaco surface is explicitly covered. No defect.

## Marked UNPROVEN-NEEDS-LIVE (deferred to the SS-13 visual audit)

None. Every claim above is source-derived and statically falsifiable; nothing in this challenge rests on rendered appearance or runtime timing.
