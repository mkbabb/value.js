claude-opus-5[1m]

# Challenge · OrbitalDrag · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/orbital-drag/OrbitalDrag.vue` (352 L)
**Mode:** static, read-only, source-derived. No browser tooling, no installs, no dev server. Nothing in keyframes.js was written or executed.
**Read whole (target + its complete import closure):**

| file | L | why in scope |
|---|---|---|
| `orbital-drag/OrbitalDrag.vue` | 352 | target |
| `orbital-drag/index.ts` | 116 | `import … from "."` (:16, :18) |
| `orbital-drag/types.ts` | 15 | `import type { PressedKeys }` (:17) |
| `orbital-drag/quaternionEuler.ts` | 64 | `:22` |
| `orbital-drag/composables/useOrbitalPointer.ts` | 249 | `:21` |
| `orbital-drag/composables/useOrbitalPinch.ts` | 201 | `:20` |
| `orbital-drag/composables/useOrbitalInertia.ts` | 144 | `:19` |
| `orbital-drag/composables/inertiaDecay.ts` | 34 | via `useOrbitalInertia:16` |

**Read for context, NOT in the import closure** (findings are anchored on the module above; joint surfaces are labelled): `scenes/cube/CubeTarget.vue`, `CubeAxisLines.vue`, `CubeScene.vue`, `useCubeDemo.ts`, `state/controlSurfaces.ts`, `components/instrument/shell/KeyboardShortcutsModal.vue`, `components/instrument/transport/AnimationControlsGroup/useControlsKeyboardShortcuts.ts`, `demo/styles/style.css`, `node_modules/@mkbabb/glass-ui/dist/**` (d.ts + styles only).

**Hitherto corpus folded** (`docs/tranches/V/megatranche/formation/keyframes/`): `lane-frontend.md` §4 (rosters OrbitalDrag as one of the 21 non-glass `.vue`), §5 shadow tally (files it under *"Bespoke, no glass counterpart"*), §6.3 (98 unprefixed demo tokens, **zero `--kf-*`**), §6.5 (13 PRM sites, none in `orbital-drag/`), F-1 (glass-ui phantom dep). Cited inline where overlapping; **contradicted explicitly at §Superlative SUP-5 and §Prompt correction.**

**Posture:** the component was assumed DEFECTIVE until the tree proved otherwise. Two hypotheses I formed and then **killed against the tree** are recorded at §Killed (a false defect is worse than a missed one).

---

## Tally

| severity | n |
|---|---|
| **BLOCKER** | **1** |
| MAJOR | 6 |
| MINOR | 5 |
| **counted defects** | **12** |
| superlatives | 5 |
| cross-axis referrals (NOT counted) | 4 |
| killed hypotheses (NOT counted) | 2 |

---

## BLOCKER

### D-1 · The component is a transform manipulator with **zero** keyboard operability, and the keyboard alternative is gated out of the default state — WCAG 2.1.1 (Level A)

**Severity:** BLOCKER
**Provenance:** `OrbitalDrag.vue:2` (root `<div>`), `:263-292` (the entire listener set), `:276-277` (the only two keyboard listeners), `useOrbitalPointer.ts:169-176` (`updatePressedKeys`), `CubeScene.vue:170-181` + `state/controlSurfaces.ts:22-23` (the gate on the alternative).

The root element is a bare `<div ref="containerRef" :style="containerStyle">`. Across the **entire module** the grep for `aria-`, `role=`, `tabindex` returns **zero hits**. So the element cannot receive focus, announces no name, no role, and no state.

The component nevertheless owns three transform categories — rotate (`:123-158`), translate (`:185-187`), scale (`:189-191`) — plus a 3×3 modifier matrix (`:193-212`). **Every one of those paths is reachable only from a pointer.** Trace it exhaustively:

- `updateRotation` / `updateAxisRotation` / `updateTranslation` / `updateScale` / `handleAxisSpecificInput` are called **only** from `drag()` (`useOrbitalPointer.ts:117-132`), `handleWheel()` (`:155-166`), the pinch readers (`useOrbitalPinch.ts:109-113, 176-181`), and the inertia loop (`useOrbitalInertia.ts:98,108`).
- `drag` is bound to `pointermove` (`useOrbitalPointer.ts:228`); `handleWheel` to `wheel` (`OrbitalDrag.vue:267-274`); pinch to `touch*`/`gesture*` (`:283-290`); inertia is a decay of pointer-seeded velocity.
- The two keyboard listeners (`:276-277`) call **only** `updatePressedKeys`, which does nothing but flip booleans in `pressedKeys` (`useOrbitalPointer.ts:173-175`). Those booleans are read exclusively **inside pointer handlers** as a *branch selector*.

**Net: pressing X, Y, Z, Shift, Ctrl or Meta produces exactly zero transform.** A keyboard-only user cannot rotate, translate, or scale the cube by any amount.

The obvious defence — "the MatrixEditor sliders are the equivalent path" — **fails against the tree**. `MatrixEditor.vue` does carry keyboard-operable `Slider` + `Input` (`:16, :61, :97-98`), but `CubeScene.vue:170-181` renders it only when `storedControls.selectedControl === "matrix-controls"`, and `state/controlSurfaces.ts:22-23` is the authority on that surface:

> `Cube's matrix-controls is a facet on its Matrix CHANNEL descriptor — visible only while that channel is selected`

So the alternative exists in **one** of the cube's channel states and is absent in the rest, including the state the scene opens in. WCAG 2.1.1 requires the functionality to be keyboard-operable, not to be keyboard-operable in one optional panel.

Corroborating: the whole-scene grep for `keydown` (`scenes/cube/`) returns exactly the two OrbitalDrag latch lines and nothing else — there is no arrow-key nudge, no Home/End reset, nowhere.

**Falsifier (what would kill this claim):** any of — (a) a `tabindex` / `role` / focus handler on the container or its slot content that I missed; (b) a keyboard binding anywhere that writes `model.value.rotate|translate|scale` for the cube (an `ArrowUp`→rotate registration, a global handler in `App.vue`/`useCubeDemo.ts`); (c) evidence that `matrix-controls` is in fact always present (i.e. `surfacesFor` unconditionally unions it regardless of selected channel), which would restore an always-available equivalent path and demote this to MAJOR; (d) a documented owner ruling scoping the demo out of Level A. I found none of (a)–(c).

---

## MAJOR

### D-2 · The X/Y/Z latch has **no reset path other than a matching keyup**, so a focus change strands the cube in a silent single-axis lock

**Severity:** MAJOR
**Provenance:** `useOrbitalPointer.ts:58-60` (the latch), `:169-176` (the only writer), `OrbitalDrag.vue:276-277` (window-bound keydown/keyup), `useOrbitalPointer.ts:117` + `:155` (the latch is the **first** branch in both drag and wheel).

`pressedKeys.x|y|z` are set true on `keydown` and cleared **only** by the corresponding `keyup`. The demo-wide grep for a compensating reset — `"blur"`, `'blur'`, `visibilitychange`, `pagehide` — returns two hits, both unrelated (`useSceneVisibilityPause.ts:11`, `usePaneHover.ts:20`); **neither touches `pressedKeys`**, and neither is in this module.

The universal, trivially-reachable trigger is structural and needs no platform assumption: **hold X → switch windows (Alt-Tab / Cmd-Tab / click another app) → release X.** The `keyup` is delivered to the newly focused window. `pressedKeys.x` stays `true` for the lifetime of the component.

Consequence, read straight off the branch order: `x||y||z` is tested **first** in both `drag` (`:117`) and `handleWheel` (`:155`), so every subsequent drag *and* every wheel event is routed into `handleAxisSpecificInput` and constrained to one axis. Free orbit is gone. Recovery requires the user to press-and-release X again while focused — an action nothing in the UI suggests.

A second trigger, **UNPROVEN-NEEDS-LIVE**: on macOS, WebKit/Chromium are long documented to swallow `keyup` for a letter key held under ⌘. The app registers `Mod+Z` → Undo (`useControlsKeyboardShortcuts.ts:70`), whose `keydown` carries `event.key === "z"` and therefore latches `pressedKeys.z` (`useOrbitalPointer.ts:171-175`). If the swallow holds, the demo's **own** Undo shortcut strands the cube in a Z-only lock. I mark this needs-live rather than assert it.

Note the contrast that makes this precise: shift/ctrl/meta **cannot** stick, because `syncModifiers` re-reads them from the live event at the top of both handlers (see SUP-3). It is exactly the three letter keys — the ones with no event-object mirror — that have no self-healing path.

**Falsifier:** a `window`-level `blur`/`visibilitychange`/`focusout` handler (anywhere in the mount chain) that clears `pressedKeys`; or a `keyup` on `window` firing reliably after focus loss in the target browsers; or evidence that the component is unmounted on tab/window blur so the latch cannot persist (it is not — `useSceneVisibilityPause` pauses the engine loop, it does not unmount).

---

### D-3 · The keyboard latch is bound to `window` with **no editable-target guard**, so typing `x`/`y`/`z` anywhere in the app drives the cube's state

**Severity:** MAJOR
**Provenance:** `OrbitalDrag.vue:276-277` (bound to `window`, not the container), `useOrbitalPointer.ts:169-176` (no `event.target` inspection), `OrbitalDrag.vue:317-321` (a `deep: true` watch that emits per toggle).

```ts
// OrbitalDrag.vue:276-277
useEventListener(window, "keydown", (e: KeyboardEvent) => pointer.updatePressedKeys(e, true));
useEventListener(window, "keyup",   (e: KeyboardEvent) => pointer.updatePressedKeys(e, false));
```

`updatePressedKeys` lowercases `event.key` and writes the matching slot. There is no check for `event.target` being an `<input>`, `<textarea>`, `[contenteditable]`, or the Monaco surface; no check that the container is hovered or focused; no `isTrusted`/composition guard.

The app is an instrument shell with live text surfaces mounted beside the scene: `MatrixEditor.vue:16` (`Input`), `KeyframeCard.vue` (`Input`), `SharePopover.vue` (`Input`), and `CSSCodeEditor.vue` (Monaco). Typing any CSS property containing x/y/z — `translateX`, `rotateZ`, `scaleY` — latches and un-latches the corresponding axis on **every keystroke**, and each toggle fires the deep watch at `:317-321`, emitting `pressedKeys` to the parent, which drives `CubeAxisLines`' `--axis-active` (`CubeTarget.vue:159-163`). The visible result is the cube's axis grid strobing while the user types in an unrelated editor.

The structural half — window binding, no guard, emit-per-toggle — is **certain from source**. The "cube is simultaneously visible while typing" half is **UNPROVEN-NEEDS-LIVE** (it depends on the pane layout at the moment of typing), and it is the only part of this finding that needs the SS-13 visual pass.

**Falsifier:** an editable-target guard inside VueUse's `useEventListener` (there is none — it is a thin `addEventListener` wrapper); a layout in which no text input is ever co-mounted with a live OrbitalDrag; or a guard higher in the chain that stops keyboard events from reaching `window` while an editor has focus.

---

### D-4 · The component's entire keyboard/gesture vocabulary bypasses the house shortcut registry and is therefore absent from the app's own shortcuts panel

**Severity:** MAJOR (glass-ui conformance + discoverability)
**Provenance:** `OrbitalDrag.vue:276-277` (raw listeners) vs. `useControlsKeyboardShortcuts.ts:1,30,50-71` (the registry), `EditorShell.vue:190` (`?` opens the panel), `KeyboardShortcutsModal.vue:12-35` (the panel renders `label` + `group` for every registration).

The demo has exactly one keyboard authority, and it says so:

> `// Every binding routes through the ONE existing glass-ui registerShortcut` — `useControlsKeyboardShortcuts.ts:30`

Eighteen bindings are registered there and in `EditorShell.vue:190`, each carrying a `label` and a `group` (`Playback` / `Navigation` / `Actions` / `General`), and `KeyboardShortcutsModal.vue` renders them all — it is a **derived** panel (`useRegisteredShortcuts()`, `:57`), so anything not registered is structurally invisible in it.

OrbitalDrag registers **nothing**. Its vocabulary is substantial and entirely undocumented in-product:

| gesture | effect | source |
|---|---|---|
| drag | orbit (trackball) | `useOrbitalPointer.ts:131` |
| **X / Y / Z** + drag | constrain rotation to that axis | `:117-118` → `OrbitalDrag.vue:197-211` |
| **Shift** + drag | translate X/Y | `useOrbitalPointer.ts:119-121` |
| **Ctrl / ⌘** + drag | Z-roll | `:122-129` |
| **X/Y/Z + Shift** | translate that axis | `OrbitalDrag.vue:198,203,208` |
| **X/Y/Z + Ctrl/⌘** | scale that axis | `:199,204,209` |
| wheel | orbit | `useOrbitalPointer.ts:165` |
| Shift + wheel | translate | `:157-159` |
| Ctrl/⌘ + wheel | uniform scale | `:160-163` |
| 2-finger pinch | scale + translate + Z-rotate | `useOrbitalPinch.ts:109-126` |

Ten distinct modes, zero of them discoverable. A user who never guesses "hold X" never finds the axis lock — and the one affordance that *does* reveal it (`CubeAxisLines`) only fires **after** the key is already held, so it cannot teach the gesture, only confirm it.

This is also the sharpest glass-ui conformance gap in the module: the census (`lane-frontend.md` §3.2) records `/keyboard` as an already-consumed subpath (3 sites), so the primitive is installed, imported elsewhere, and simply not used here.

**Falsifier:** any `registerShortcut` call covering the orbital vocabulary; a `title`/`aria-describedby`/help affordance on the container or in `CubeScene`; or documentation surfaced in-product (a tooltip, a hint line) that teaches the modifiers. I grepped `registerShortcut` demo-wide (23 hits, all in `useControlsKeyboardShortcuts.ts` + `EditorShell.vue`) and `aria-`/`role=`/`tabindex` in `orbital-drag/` (zero).

---

### D-5 · `cursor: move` — the house `grab`/`grabbing` idiom is violated at the one place it matters most, and the cursor names the wrong verb

**Severity:** MAJOR
**Provenance:** `OrbitalDrag.vue:346-352` (the whole scoped block) vs. `SquareScene.css:63,84`, `AmigaScene.vue:251,255,269`, `SequenceTarget.css:133,169`, `TimelineTrack.vue:244`.

The complete style block is three declarations:

```css
div { cursor: move; user-select: none; touch-action: none; }
```

Two independent problems.

**(a) It contradicts a four-site house idiom.** Every other draggable surface in the demo uses `grab` → `grabbing`:

| site | rest | pressed |
|---|---|---|
| `SquareScene.css:63,84` | `grab` | `grabbing` |
| `AmigaScene.vue:255,269` | `grab` | `grabbing` |
| `SequenceTarget.css:133,169` | `grab` | `grabbing` |
| `TimelineTrack.vue:244` | — | `grabbing` |
| **`OrbitalDrag.vue:348`** | **`move`** | **— (none)** |

`AmigaScene.vue:251` even records the rationale, and it is *the same interaction class as this component*:

> `mesh, a miss orbits the camera. cursor: grab advertises the manipulable`

The Amiga scene orbits a camera and uses `grab`. The orbital drag orbits an object and uses `move`. OrbitalDrag is 1-of-5 and it is the demo's signature manipulator.

**(b) The cursor names the wrong verb.** `cursor: move` is the four-way-arrow glyph, conventionally "this element will be **translated**." The unmodified drag on this component **rotates** (`useOrbitalPointer.ts:131` → `updateRotation`); translation is the *Shift-modified* path (`:119-121`). So the resting cursor advertises the secondary, modifier-gated behaviour and stays silent about the primary one.

**(c) There is no pressed state at all.** `isDragging` exists as a reactive ref (`useOrbitalPointer.ts:39`) and is already consumed by three watchers (`OrbitalDrag.vue:324-325`, `useOrbitalInertia.ts:83,135`), so the state is *live and free* — it simply is not bound to any visual. Press-down produces no cursor change, no class, no data-attribute. On a manipulator whose whole value proposition is direct manipulation, the "I have hold of it" moment is unrendered.

**Falsifier:** a global rule elsewhere in the cascade overriding `cursor` on this element (I found none; and see D-9 — the scoped `div[data-v-…]` selector at specificity `0,1,1` would out-rank most of them anyway); or an owner ruling that `move` is deliberate for a 6-DOF manipulator; or a pressed-state visual applied by the parent (`CubeTarget.vue:11-16` passes only layout utilities — `preserve-3d relative flex items-center justify-center justify-items-center select-none`).

---

### D-6 · The post-release inertial glide honours no `prefers-reduced-motion`, in a scene that documents and enforces a "house reduced-motion contract" ten lines away

**Severity:** MAJOR
**Provenance:** `useOrbitalInertia.ts:82-131` (the rAF glide), `OrbitalDrag.vue:248-259` (its wiring), `:324-343` (the release hand-off) vs. `useCubeDemo.ts:158-168` (the contract, honoured for the intro sweep).

`grep -rn "prefers-reduced-motion" demo/scenes/cube/` returns **exactly one** line — `useCubeDemo.ts:164` — and it guards the graph's *intro* sweep:

```ts
// T.A3 — PRM snaps to the opening attitude: under reduced-motion the graph
// jumps straight to rotate3d(-1,1,0,30deg) with NO eased intro sweep (the
// house reduced-motion contract).
```

So the scene *has* a contract, *names* it, and *applies* it — to the one animation the user did not initiate. The one the user did initiate, and which **continues after input stops**, is unguarded.

The glide is real continuing motion, not a transition: on release, `angularVelocitySpeed` is damped to 0.8× (`OrbitalDrag.vue:335`), the loop resumes (`useOrbitalInertia.ts:134-141`), and `applyRotation` runs **every frame** until velocity falls under `1e-4` (`:97-102`, `:51-59`). With the default `inertiaFactor = 0.95` (`OrbitalDrag.vue:56`) the friction is `−ln(0.95)·60 ≈ 3.08 s⁻¹` (`inertiaDecay.ts:33-34`), i.e. an e-folding time of ~325 ms and a visible spin of order a second-plus after the pointer lifts.

Two aggravations:

1. **No CSS fallback can catch it.** glass-ui ships PRM blocks in 11 stylesheets, but this animation is a per-frame JS mutation of the `transform` string through a `computed` (`OrbitalDrag.vue:63-76`) — no CSS transition or `@keyframes` is involved, so no cascade-level PRM rule can reduce it.
2. **The knob exists and is unwired.** `inertiaFactor` is a prop (`:26`) and the math degrades correctly at the limit (`inertiaFactor → 0` ⇒ `friction → ∞` ⇒ per-frame factor `→ 0`, an instant stop). Honouring PRM is a one-line media-query read feeding a prop the component already accepts. `CubeTarget.vue:11-16` passes no `inertia-factor` at all.

The census (`lane-frontend.md` §6.5) enumerates 13 PRM enforcement sites across 12 files; `orbital-drag/` is in none of them. This finding **extends** §6.5's "Gaps" paragraph with a fourth, more serious gap than the two it lists (`TypingDots`, `KeyframeTimeline`), because those two at least delegate to a cascade that can act, and this one cannot.

WCAG 2.3.3 (Animation from Interactions) is AAA, so I do not claim a conformance failure at AA; I claim a **house-contract** failure, which the scene's own comment establishes as the standard here.

**Falsifier:** a PRM read anywhere in the module's call chain (grep says zero); an owner ruling that user-initiated momentum is exempt from the house contract; or evidence that `useRafFn` is itself PRM-gated inside VueUse (it is not — it is an unconditional `requestAnimationFrame` loop).

---

### D-7 · Unconditional `preventDefault` on `wheel` plus the `ctrlKey` branch captures the browser's page-zoom gesture; with `touch-action: none` the stage becomes a scroll/zoom dead zone

**Severity:** MAJOR
**Provenance:** `useOrbitalPointer.ts:138` (`event.preventDefault()`, first statement, unguarded), `:160-163` (the `ctrlKey` branch), `OrbitalDrag.vue:267-274` (`{ passive: false }`), `:350` (`touch-action: none`); compounded by `CubeTarget.vue:4-5` (`touch-action: none; overscroll-behavior: contain` + `@wheel.prevent`).

```ts
const handleWheel = (event: WheelEvent) => {
    event.preventDefault();          // :138 — unconditional
    …
    } else if (pressedKeys.value.ctrl || pressedKeys.value.meta || ctrlKey) {
        updateScale("x", -deltaY); updateScale("y", -deltaY); updateScale("z", -deltaY);   // :160-163
```

`ctrlKey`-modified wheel is not an ordinary scroll: it is how browsers deliver **page zoom**, and how trackpad pinch is synthesised on every major desktop browser. `:138` cancels it and `:160-163` re-purposes it to scale the cube. Over the container, the user's zoom gesture silently does something else.

This is a WCAG 1.4.4 (Resize Text, AA) *degradation* rather than a clean failure — keyboard zoom (⌘/Ctrl +) still works, and the region is not the whole page — so I do not overstate it. But the composite is a genuine trap: `touch-action: none` on the container (`:350`) plus the parent's `touch-action: none` + `overscroll-behavior: contain` (`CubeTarget.vue:4`) means that on a phone, a finger that lands anywhere on the cube stage cannot scroll the page and cannot pinch-zoom it. The stage is large by construction (`h-full w-full`, `CubeTarget.vue:3`).

The house has an idiom for exactly this problem and it is already installed and already consumed: glass-ui's `useTouchGate` — *"Per-control tap-to-activate guard for mobile touch controls. Desktop pointers pass through immediately. On touch devices, the first tap activates the control unless it turns into a vertical scroll gesture"* (`dist/composables/dom/useTouchGate.d.ts:12-17`) — used at `AnimationVisualizer.vue` and `PlaybackRibbon.vue` (census §4). I do **not** claim it is a drop-in for a trackball; a 6-DOF manipulator has a real case for owning the touch surface. I claim the tradeoff is **unreasoned**: there is no comment, no escape hatch, no gated variant, and no acknowledgement that the house solved this elsewhere.

This finding **extends** the census's §5 filing of OrbitalDrag under *"Bespoke, no glass counterpart"* — true for the trackball math, but `useTouchGate` is a partial counterpart for the touch-arbitration half that §5 did not separate out.

**Falsifier:** a scroll-escape affordance (a margin, a handle, a tap-to-activate gate) I missed; evidence that the stage never occupies enough viewport on touch to trap a scroll; or a recorded design decision accepting the trap. Also killed if `handleWheel`'s `preventDefault` were conditional on the branch actually consuming the event — it is not; it is the first statement.

---

## MINOR

### D-8 · Two of the three modifier modes have no feedback in any state

**Severity:** MINOR
**Provenance:** `OrbitalDrag.vue:193-212` (the 3×3 mode matrix), `:317-321` (emits all six keys), `CubeTarget.vue:159-163` (wires three).

The emit contract is complete — `emit("pressedKeys", { ...keys })` publishes `x,y,z,shift,ctrl,meta`. The consumer wires only `x,y,z` into `axisLock`. So **rotate-lock** is revealed (`CubeAxisLines`), while **Shift → translate** and **Ctrl/⌘ → Z-roll / scale** are revealed nowhere: no cursor change (the cursor is static, D-5), no class, no indicator.

Responsibility is shared with the consumer, which is why this is MINOR rather than MAJOR — but the component-side remedy is the cheap one: the root already renders a bound `:style`, and a `data-mode` attribute or a mode-dependent cursor would give every consumer the affordance for free instead of requiring each to rebuild it.

**Falsifier:** any translate/scale-mode indicator in `CubeTarget`/`CubeScene`/the cascade; or a ruling that only the axis lock warrants revelation.

### D-9 · The bare `div` scoped selector out-ranks consumer utility classes and is fragile to a second element

**Severity:** MINOR
**Provenance:** `OrbitalDrag.vue:346-352`; consumer at `CubeTarget.vue:12`.

`<style scoped>` compiles `div` to `div[data-v-…]` — specificity **(0,1,1)**. Tailwind utilities are single classes, **(0,1,0)**. `CubeTarget.vue:12` already passes five utility classes onto this root; a consumer that passed `cursor-grab` (the house idiom, D-5) would **lose** to the component's own `cursor: move` with no way to override short of `!important` or a deeper selector. A component that styles its root via an element selector cannot be re-styled by its callers — the opposite of the standing `feedback_root_styling` / `feedback_glass_ui_first_class` posture.

Second, fragility: the rule is written as "all divs", and today it happens to match exactly one element (slot content carries the *parent's* scope id, not this component's, so the slotted cube subtree is untouched). Adding any wrapper `<div>` to this template would silently apply `cursor: move; user-select: none; touch-action: none` to it. A class or `:host`-style root selector states the intent; `div` states an accident.

**Falsifier:** Vue applying the child scope id to slotted content (it does not, absent `:slotted`), which would make the rule already-overreaching rather than merely fragile — that would *raise* the severity, not remove it. Or a consumer that needs to inherit these three declarations onto arbitrary descendants.

### D-10 · Permanent `will-change: transform` on a `preserve-3d` subtree

**Severity:** MINOR
**Provenance:** `OrbitalDrag.vue:73`, consumer gating at `CubeTarget.vue:14`.

```ts
willChange: 'transform' as const,   // :73 — present whenever applyTransformToContainer is true
```

`applyTransformToContainer` is bound to `props.isPlaying || props.isStarted` (`CubeTarget.vue:14`) — `isStarted` never returns to false in normal use, so the hint is effectively permanent from first interaction onward. `will-change` is specified as a *transient* optimisation hint; held indefinitely it pins a compositor layer for a `transform-style: preserve-3d` subtree containing six faces plus overlays, for the entire session. The honest cost is memory/compositing, not correctness — hence MINOR — but the correct shape is to set it on gesture start and drop it when velocity reaches zero, which this component already knows (`useOrbitalInertia.ts:125-128` is exactly the "all motion has stopped" moment).

**Falsifier:** a measurement showing no layer cost on the target devices (needs-live), or a documented decision that the permanent hint is preferable to per-gesture toggling.

### D-11 · The interaction's entire "feel" is twelve untokenized magic numbers spread across three files

**Severity:** MINOR
**Provenance:** `OrbitalDrag.vue:53-58, 130, 135-138, 146, 335, 339`; `useOrbitalPointer.ts:48, 115, 144`; `useOrbitalPinch.ts:104-105, 165-166`.

| value | meaning | site |
|---|---|---|
| `0.5` / `×0.5` | pointer / touch sensitivity | `OrbitalDrag.vue:53-54` |
| `0.8` | translation factor | `:55` |
| `0.95` | inertia factor | `:56` |
| `0.02` | scale factor | `:57` |
| `/ 25` | px→radian angle divisor | `:130`, `:146` |
| `0.3` | EMA alpha for angular velocity | `:135-138` |
| `0.8` | release damping (×2 sites) | `:335`, `:339` |
| `0.5` px | drag deadzone | `useOrbitalPointer.ts:115` |
| `150` ms | wheel-end debounce | `:48` |
| `× 1.5` | wheel log-dampening gain | `:144` |
| `1/(scaleFactor*2)` | pinch scale divisor | `useOrbitalPinch.ts:104-105` |
| `scaleFactor/1.25` | Safari-gesture scale divisor | `:165-166` |

Not one reaches a named constant or a CSS custom property. Compare the module's *own* discipline elsewhere: `inertiaDecay.ts` hoists `TARGET_DT` and derives `inertiaFactorToFriction` with a full derivation comment (`:17-34`) — the right pattern, applied to exactly one of the twelve. The consequence is that the demo's signature interaction cannot be re-tuned or themed without editing three files, and no reviewer can tell whether `/25` and `×1.5` were measured or guessed.

This does **not** implicate the token-namespace hazard — see SUP-5.

**Falsifier:** a tuning document or measurement record for these constants; or a ruling that gesture constants are deliberately code-local rather than tokenized (defensible — but then `TARGET_DT`'s hoisting is the inconsistency).

### D-12 · Comment prose: 14% of the script is comment, and one narrative is told three times

**Severity:** MINOR
**Provenance:** `OrbitalDrag.vue:3-6`, `:37-39`, `:314-316` (the same egg narrative ×3); `:100-106` and `:298-304` (the same reverse-path rationale ×2). Measured: 46 comment lines and 53 blank lines in the 334-line `<script setup>` block (~14% comment).

The P.W5.S3 "axis-lock-reveal egg" story is told three separate times in near-identical words:

- `:3-6` — *"expose `pressedKeys` … as a scoped slot prop so the cube can light the locked axis line. Reactive, no new rAF — the same ref the gesture readers mutate."*
- `:37-39` — *"emit the X/Y/Z/modifier latch whenever it changes so a parent (the cube) can light the locked axis line. Reactive, no rAF — fired from the keydown/keyup watch…"*
- `:314-316` — *"surface the X/Y/Z latch to the parent the moment it changes … The cube reads this to light the locked axis."*

And the reverse-path rationale runs seven lines at `:100-106` and seven more at `:298-304`, with the second explicitly re-deriving the first. Roughly 14 of the 46 comment lines are restatement.

Second, register: the comments are written in tranche-ledger shorthand — `P.W5.S3`, `inv ζ`, `F.W10.S1`, `L.W8 ED-3 dogfood inversion`, `ED-3` — which is precise for the program and opaque for anyone reading the file as a demo component. The demo is the library's shop window (68 engine-consuming files, census §1); its source is read by outsiders.

I flag no cliché in **user-facing** copy because there is none: the component renders a single `<slot>` and ships zero strings.

**Falsifier:** a house convention requiring the wave-id prose at each seam; or evidence the triplication is load-bearing (e.g. each restatement documents a *different* mechanism — I read all three and they document the same ref reaching the parent by two routes, which one paragraph covers).

---

## Superlatives (L-18, running the other way)

### SUP-1 · The render path is genuinely SOTA: one `rotate3d` off the quaternion's native axis-angle

`OrbitalDrag.vue:63-76`. The rotation source of truth is a quaternion never reconstructed from Euler (`:78-80`), and the **render** reads its native axis-angle via `quat.getAxisAngle` into a reused out-param — no Euler decompose, no `Rx·Ry·Rz`, no gimbal branch, zero allocation per frame (`renderAxis` hoisted at `:61`). This is exactly what the G-tranche audit demanded (`docs/tranches/G/audit/a-scroll-orbital-quaternions.md:300`, finding O-1; spec at `G.W18.md:28`) and the tree **delivers it**. Most trackball implementations in the wild round-trip through Euler; this one does not.

The reactivity hazard that made the collapse hard is also solved honestly rather than hidden: `void model.value.rotate.x` (`:68`) registers the dep that `syncRotationToModel` already writes per rotation, so a non-reactive `quat` drives a `computed` without a shadow ref, a watcher, or a `markRaw` dance — and the trick is *documented as* a trick (`:65-67`).
**Falsifier:** any `rotateX(`/`rotateY(`/`rotateZ(` in the emitted transform string (there is none — `:74` emits `translate3d(…) rotate3d(…) scale3d(…)`); or a hidden Euler round-trip in the render path (`quaternionToEulerDegrees` is called only by `syncRotationToModel` `:90` and the echo-guard `:308`, both v-model plumbing, never the render).

### SUP-2 · The lock state is signalled on a non-colour channel, and the contrast maths check out

`CubeAxisLines.vue:71-75` (joint surface — the rendering of this component's `pressedKeys` emit) changes `border-style: dashed → solid` on lock, *in addition to* opacity and a colour bloom, and says why: *"a second, motion-free tell that the axis is the active rotation constraint."* A redundant non-colour, non-motion channel is precisely what colour-vision-deficient and reduced-motion users need, and it is rare to find it reasoned rather than accidental.

Computed from the tokens, since it is decidable — `--axis-x: hsl(0 72% 54%)` (`styles/style.css:109`) = `#DE3535`, relative luminance **0.1838**:

| state | opacity | composite vs. white ground | ratio | 1.4.11 (3:1) |
|---|---|---|---|---|
| **locked** (`--axis-active: 1`) | 1.00 | `#DE3535` | **4.49 : 1** | **passes** |
| at rest (`--axis-active: 0`) | 0.45 | `#F0A4A4` | 1.99 : 1 | n/a — decoration |

The state indicator passes where the guideline applies, and the resting line sits below it *by design* — the demotion from 0.75 to 0.45 is documented as deliberate at `CubeAxisLines.vue:47-49` (*"so only the LOCKED axis speaks — the resting grid no longer competes with the die"*). That is the correct call: at rest the lines carry no state, so 1.4.11 does not bind them, and the quieting improves the figure/ground.
**Assumption + falsifier:** the ground is taken to be white/near-white (the light-theme paper stage). If the stage token resolves substantially darker the locked ratio changes and this superlative would need re-computing against the dark theme — that is the observation that would kill it.

### SUP-3 · Modifier state is structurally self-healing

`useOrbitalPointer.ts:62-66`, called as the **first** statement of `drag` (`:100`) and `handleWheel` (`:139`), re-reads `shift`/`ctrl`/`meta` from the live event's own `shiftKey`/`ctrlKey`/`metaKey` before any branch consumes them. This makes the stuck-modifier failure mode — which would be far worse than D-2, since a stuck `meta` silently converts every drag into a Z-roll and every wheel into a scale, with no indicator anywhere — **structurally impossible**. I raised it as a candidate BLOCKER and the tree killed it (see §Killed, K-1). It is a small, deliberate, correct piece of design, and it is why D-2 is confined to exactly the three keys that have no event-object mirror.

### SUP-4 · RTL is correctly a non-concern, and correctly untouched

`OrbitalDrag.vue:124` maps pointer delta to a rotation **axis** in a 3D frame (`vec3.fromValues(-deltaY, deltaX, 0)`); `:74` renders `translate3d` in the same frame. There is no reading-order semantics here to mirror, and mirroring would invert the manipulation — a right-drag must spin the object rightward in every locale. The demo-wide grep for `[dir=`/`dir="rtl"`/`:dir(` returns **zero**, and for this component that is the right answer rather than an omission. Recorded so the SS-13 pass does not file it as a gap.

### SUP-5 · Zero contribution to the token-namespace hazard — and a correction to the framing

The component declares **no** CSS custom properties (its style block is three fixed declarations, `:346-352`) and reads none. It therefore adds nothing to the collision surface the census flags at `lane-frontend.md` §6.3.

**Correction to the challenge framing:** the brief names "the flat `--kf-*` namespace hazard." The census measured the opposite and I confirm it — `grep -rho "\-\-kf-[a-z0-9-]*" demo/styles/*.css | sort -u | wc -l` → **0**. There is no `--kf-*` namespace. The hazard §6.3 identifies is its **absence**: 98 demo-owned custom properties are *unprefixed* and therefore share a flat global namespace with glass-ui's. The cube scene's own `--axis-x|y|z` and `--face-1…6` (`styles/style.css:109-111`) are examples of the unprefixed pattern. OrbitalDrag is neither a contributor nor a victim, and any remediation wave should read §6.3 as "adopt a prefix," not "fix the prefix."

---

## Cross-axis referrals (NOT counted in this axis's tally)

- **R-1 — `defaultTransformState` is a shared mutable module singleton** used as the `defineModel` default (`index.ts:63-80`, `OrbitalDrag.vue:43-49`). If any consumer relies on the default, `syncRotationToModel` (`:91-93`) mutates the module-level object, and the pollution outlives the component. The live consumer passes `v-model` (`CubeTarget.vue:13`), so it is latent — **correctness axis**.
- **R-2 — props are read once at setup and are not reactive**: `const sensitivity = props.sensitivity ?? 0.5` etc. (`:53-58`). These are plain member reads assigned to `const`, not Vue 3.5 reactive-props destructure, so later parent changes to `sensitivity`/`translationFactor`/`inertiaFactor`/`scaleFactor`/`bounds` are ignored. `applyTransformToContainer` is correctly read *inside* the computed (`:64`) and does stay reactive — so the file is inconsistent with itself. No live consumer changes them — **API/correctness axis**.
- **R-3 — `forced-colors` has zero coverage demo-wide** (`grep -rn "forced-colors"` → 0 across all 58 `.vue` + 12 `.css`). This component paints nothing, so it is not the right owner; filed as a **house-level** gap for the a11y lane. (For the joint surface: under forced-colors the three axis lines' `border-color` collapses to one system colour and their identity is lost, but `dashed → solid` survives — see SUP-2.)
- **R-4 — a comment asserts a guarantee the tree does not provide.** `CubeAxisLines.vue:58-59`: *"Smooth the reveal as the key latches/releases … PRM-respecting via the wrapper below."* There is no wrapper below and no `@media (prefers-reduced-motion: reduce)` in that file or in `CubeTarget.css`. Adjacent surface, not in this import closure — filed for the lane that owns `CubeAxisLines`.

---

## Killed hypotheses (recorded so they are not re-raised)

- **K-1 — "a stuck `meta`/`ctrl`/`shift` latch silently breaks every drag with zero feedback" → FALSE.** I drafted this as a second BLOCKER: ⌘-Tab latches `meta` on keydown and the keyup lands in another app, after which `useOrbitalPointer.ts:122-129` would route every drag to Z-roll and `:160-163` every wheel to scale, with no indicator (`CubeTarget.vue:159-163` wires only x/y/z). **Killed by `syncModifiers` at `:100`/`:139`**, which overwrites all three from the live event *before* the branch. Only x/y/z can stick — which is D-2, correctly narrowed. Recorded as SUP-3.
- **K-2 — "listeners registered inside `onMounted` escape scope disposal" → FALSE.** `OrbitalDrag.vue:263-292` calls `useEventListener` inside `onMounted` rather than at setup top level, which looks like a leak. But Vue's `setCurrentInstance` activates the component's effect scope for the duration of a lifecycle hook, so `getCurrentScope()` inside `onMounted` returns that scope and VueUse's `tryOnScopeDispose` registers correctly. The listeners *are* torn down. No defect.

---

## Provenance

Every claim above cites `file:line` in `/Users/mkbabb/Programming/keyframes.js` (read-only) or `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/formation/keyframes/` (the hitherto corpus). glass-ui facts are read from `keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy already on disk in the audit target — so no upgrade is presupposed by any remedy. No browser was driven; the two claims that need the live surface are marked **UNPROVEN-NEEDS-LIVE** inline (D-2's macOS ⌘-keyup swallow; D-3's "cube visible while typing" co-mount) and are the only items handed forward to the SS-13 visual audit. **No file in keyframes.js was written, mutated, or executed; the single write of this lane is this file.**
