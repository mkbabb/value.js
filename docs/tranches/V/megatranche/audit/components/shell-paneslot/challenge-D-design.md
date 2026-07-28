# CHALLENGE-D — `demo/shell/PaneSlot.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.**

`PaneSlot.vue` is 129 lines of which ~55 are a comment block defending two decisions. Both
decisions are wrong, and one of them is defended by a claim I falsified by measurement against
the project's own pinned Vue on the project's own dev server.

The component's whole reason to exist — "collapse the triple-nested Transition + KeepAlive +
`component:is` pattern" (PaneSlot.vue:2) — is sound. What it collapsed *into* is not a wrapper;
it is a **second, timer-driven source of truth for what route is on screen**, married to a
transition mode that guarantees two panes occupy the same in-flow box for ~200 ms on every
swap. The measured result is a layout convulsion on every route change, at every breakpoint,
**identically under `prefers-reduced-motion: reduce`**.

Strongest single finding: **D-1** — the stated blocker for `mode="out-in"` does not reproduce
on Vue 3.5.35. The workaround is a legacy shim kept alive by its own comment, and it is the
proximate cause of D-2, D-3 and D-4.

---

## 1. What the component is, exactly

```
demo/shell/PaneSlot.vue   129 lines
  L25       import { onBeforeUnmount, ref, shallowRef, watch, type Component } from "vue";
  L27–63    reactive-destructured props: component, componentKey, componentProps,
            transitionName, max = 5, onMount, appear = false, onAppeared
  L74–76    liveComponent / liveKey / liveProps  ← MIRROR STATE
  L86–97    watch(componentKey) → cancelAnimationFrame + requestAnimationFrame(commit)
  L101–106  watch(componentProps) → forward only while NOT mid-swap
  L112–128  <Transition :name><KeepAlive :max><component :is :key :ref v-bind/></KeepAlive></Transition>
```

Three call sites, all in `demo/color-picker/App.vue`: the mobile slot (L83, `:max="9"`), the
desktop-left slot (L101, `:max="6"`), the desktop-right slot (L127, `:max="4"`). It renders no
DOM of its own — its entire design surface is *timing, lifecycle and layout*, which is why the
defects below are all measured rather than read off a stylesheet.

---

## 2. Findings

### D-1 · BLOCKER — the `mode="out-in"` prohibition is stale; the workaround is a legacy shim

`PaneSlot.vue:12–23` is a standing prohibition:

> TRANSITION MODE — the `<Transition>` below is the DEFAULT (simultaneous) mode, NOT
> `mode="out-in"`. Under `vite` DEV, Vue 3.5's out-in machinery fails to re-mount the incoming
> pane once the outgoing pane's leave transition has completed: the internal
> `afterLeave → instance.update()` re-render does not fire, so the slot is stranded on a bare
> comment placeholder forever (the incoming component's setup — even a *synchronous* one — is
> never invoked).

**I ran that exact configuration in the live app, on the live dev server, using the app's own
Vue module** (`/@id/vue`), on `Transition mode="out-in"` → `KeepAlive :max` → `<component :is :key>`:

```
$ node scratchpad/outin-probe.mjs
{
  "via": "/@id/vue",
  "vueVersion": "3.5.35",
  "mountedOrder": [ "A", "B" ],          ← the incoming component's setup DID run
  "beforeHTML":        "<div class=\"pane-A\">A</div>",
  "afterSwapHTML":     "<div class=\"pane-B\">B</div>",   ← re-mounted after leave
  "afterSwapBackHTML": "<div class=\"pane-A\">A</div>",   ← KeepAlive restore works
  "outInRemountWorks": true
}
```

The pinned version is `vue@3.5.35` (`package.json` devDependency `^3.5.34`;
`node_modules/vue/package.json` → `3.5.35`). The defect the comment describes — "stranded on a
bare comment placeholder forever" — **does not reproduce**. It was real at R.W3 against an
older 3.5.x; it was fixed upstream; nobody re-tested.

This is a direct violation of **owner edict 2 (no legacy code — no migration shims, no masking
fallbacks)**. The workaround is invisible to every gate because it lives in a comment that
asserts its own necessity. Every downstream defect below (D-2, D-3, D-4) is a consequence of it.

**Reproduction:** `node /private/tmp/.../scratchpad/outin-probe.mjs` against
`http://localhost:9000` (script preserved; it mounts a throwaway app off-screen and never
touches the repo).

**Cure:** delete the mirror state and the prohibition; `mode="out-in"`. Re-verify at the wave
with the same probe pinned as a regression test.

---

### D-2 · BLOCKER — the simultaneous transition puts two panes in one in-flow box; the layout convulses on every swap

Because the mode is simultaneous and no rule takes the outgoing pane out of flow, both panes are
in-flow children of the same wrapper for the whole overlap. The wrappers are ordinary boxes:

- `shell.css:113–115` → `[data-layout="desktop"] .pane-wrapper--left { display: flex }`, plus
  `flex-col justify-center` from App.vue:96 → **a flex column**;
- `shell.css:116–118` → `[data-layout="desktop"] .pane-wrapper--right { display: block }` →
  **a block box**;
- `shell.css:110–112` → `[data-layout="mobile"] .pane-slot-mobile { display: flex }` with
  `flex flex-col items-center justify-center` from App.vue:77.

So during every swap the two panes **stack vertically** and the flex arms **crush** them.

#### Measured — mobile grammar, 1024×1366 (portrait tablet → `data-layout="mobile"`), `/#/` → `/#/gradient`

```
t+0     n=1  wrapperH=674   kids=[[top 394, h 674, left 256]]
t+24    n=2  wrapperH=1254  kids=[[-17, 674, 256], [649, 839, -321]]   ← +580px container, −411px displacement
t+236   n=2  wrapperH=1254  kids=[[-25, 692, -318], [656, 824, 168]]
t+243   n=1  wrapperH=822   kids=[[319, 824, 182]]                     ← +330px snap-back on one frame
```

27 consecutive rAF frames (≈212 ms) with two in-flow children. The container height jumps
**674 → 1254 px (+86%)** on one frame and back to 822 on another; the outgoing pane is yanked
**411 px up**, off the top of the viewport, *before* any transform runs.

#### Measured — desktop 1440×900, `/#/` → `/#/mix` (right slot: About → Mix)

```
base    nR=1  right pane [top 103, h 774]
t+21    nR=2  [[103,774,729],[868,791,1279]]   ← incoming Mix parked 765px BELOW its final top
t+224   nR=2  [[ 94,791,1274],[875,777,814]]   ← still parked; 203ms of enter animation spent off-screen
t+234   nR=1  [[146,687,800]]                  ← 722px single-frame teleport into place
```

The incoming pane spends its **entire 203 ms enter animation parked ~765 px below the fold**
(viewport height 900, `.app-layout { overflow: hidden }` → `document.documentElement.scrollHeight`
measured `900`, so it is clipped, not scrollable-to). What the user sees is: outgoing pane
slides out → empty column → new pane *pops* into place at ~90 % of its horizontal travel. The
designed cross-slide never reads because the incoming pane is not where the eye is.

Visual proof: `frames/desktop-comount-right-slot.png` — captured with a **runtime-only**
`transition-duration: 60s` override injected via `document.head` in the browser (no repo edit).
The outgoing About pane is sliding off right; the right column is a large empty glass rectangle;
the incoming Mix pane is the sliver of white at the very bottom-right corner.

**Reproduction:** `node scratchpad/paneslot-probe2.mjs` / `paneslot-probe3.mjs`; or in any browser
at `localhost:9000`, run the rAF sampler in §5.

**Cure:** `mode="out-in"` (D-1) removes the overlap entirely. If a genuine cross-slide is still
wanted, it must be bought with `position: absolute` on `*-leave-active` inside a
`position: relative` wrapper — the standard Vue crossfade recipe — never by leaving the outgoing
pane in flow.

---

### D-3 · BLOCKER — the header's own claims are false: "height-bounded", "never jumps the layout", "CROSS-FADES"

`PaneSlot.vue:21–23`:

> The default mode mounts the incoming pane immediately and **CROSS-FADES** the two slides (the
> Lane-E space-switch intent), working identically in dev and build. The pane slots stay
> **height-bounded** (min-h-0 + --content-max-h), so the **brief co-mount never jumps the
> layout**.

Three claims, three refutations:

1. **"CROSS-FADES"** — `animations.css:228–236` pins `opacity: 1` on both
   `.pane-wrapper--left/right > .vj-enter-enter-from` and `> .vj-enter-leave-to`. There is no
   opacity delta to animate. **Measured: `getComputedStyle(child).opacity === "1"` on both
   children in every one of the 27 mobile co-mount frames and all 26 desktop frames.** Two
   fully-opaque panes overlap. The commit message for that CSS says so explicitly ("opacity
   pinned (the swap reads as travel, not a fade)") — the two files contradict each other, and
   `PaneSlot.vue` is the one that is wrong.
2. **"height-bounded (min-h-0 + --content-max-h)"** — `--content-max-h` is on `.pane-container`
   (`shell.css:75`), which is the *grid*, not the slot. It caps nothing about a wrapper whose
   flex column now holds two children. Measured: the mobile wrapper went 674 → 1254 px.
3. **"never jumps the layout"** — measured jumps: +580 px then −432 px (mobile height);
   −411 px then +330 px (mobile position); +722 px (desktop right-slot position); 512 → 1042 px
   (desktop left-slot width, D-4).

A comment that asserts the opposite of the measured behaviour is worse than no comment: it is
what stopped anyone from re-measuring for three tranches.

---

### D-4 · MAJOR — the `--ghost` right slot annihilates the departing pane mid-animation, and does it identically under reduced motion

`App.vue:120` binds `pane-wrapper--ghost` off `currentConfig.right === null` — i.e. it flips at
the *start* of the swap, not at its end. `App.vue:403–409` gives that class
`visibility: hidden; position: absolute; pointer-events: none; opacity: 0; content-visibility: auto`.

Measured, `#/gradient` → `#/atmosphere` (dual → single), 1440×900, **both** motion preferences:

```
PRM=no-preference
t+  -1  nL=1 nR=1 ghost=0  cH=774  L=[[103,774,199,512]]  R=[[103,774,729,512]]
t+  21  nL=1 nR=1 ghost=1  cH=774  L=[[103,756,199,1042]] R=[[877,2,199,1042]]
t+  47  nL=2 nR=1 ghost=1  cH=774  L=[[-86,378,199,1042],[274,414,-953,1055]]  R=[[499,378,199,1042]]
t+ 242  nL=2 nR=1 ghost=1  cH=774  L=[[-103,412,-877,1054],[285,392,-246,1047]] R=[[482,412,1264,1054]]
t+ 564  nL=1 nR=0 ghost=1  cH=672  L=[[153,655,233,1043]]

PRM=reduce
t+  19  nL=1 nR=1 ghost=1  cH=774  L=[[103,756,199,1042]] R=[[877,2,199,1042]]   ← IDENTICAL geometry
t+  44  nL=2 nR=1 ghost=1  cH=774  L=[[-86,378,199,1042],[274,414,-953,1055]]    ← IDENTICAL
t+ 216  nL=1 nR=0 ghost=1  cH=672  L=[[154,654,199,1042]]
```

On frame 1 of the swap the departing right pane is **crushed from 774 px tall to 2 px, moved
774 px down and 530 px left, and widened from 512 to 1042 px** — while its leave transition is
supposedly running, and while `visibility: hidden` makes all of it invisible anyway. Meanwhile
the left column's width doubles (512 → 1042) because `pane-container--dual` drops in the same
frame, so the incoming pane's `translateX(-110%)` slide distance silently doubles mid-motion.
At t+47 both left children are flex-crushed to 378 / 414 px inside a 774 px box.

**The `PRM=reduce` column is the finding.** `VISUAL-CONSTITUTION.md §6`: *"Reduced motion
resolves directly to the final geometry and stable chromatic state."* Measured: it resolves
through **three** intermediate geometries, byte-identical to the animated path. Reduced motion
only shortens the co-mount window (195 ms → 68 ms); it removes none of the displacement. The
users who asked for stability get the same convulsion, faster.

**Reproduction:** `node scratchpad/paneslot-probe3.mjs` (PROBE 2, both arms).

---

### D-5 · BLOCKER — KeepAlive is imposed on all ten panes and **not one of them implements deactivation**

PaneSlot wraps every routed pane in `<KeepAlive :max>` (L120). KeepAlive is a *contract*: a
cached component is deactivated, not unmounted, so `onUnmounted` never runs and the component
must implement `onDeactivated` to stand down. Census of the entire demo:

```
$ grep -rn "onActivated\|onDeactivated" demo/
demo/picker/visual/HeroBlob.vue:27:    onActivated,
demo/picker/visual/HeroBlob.vue:246:onActivated(() => {
```

**One activation hook. Zero deactivation hooks.** Ten panes are cached; none stands down.
`HeroBlob.vue:246` even calls `blobRef.value?.resume()` on activation — it resumes a render loop
it never pauses.

Measured consequence — global listener survival across a full route cycle (instrumented
`window.addEventListener`/`removeEventListener` via `addInitScript`, before app boot):

```
boot on /#/ (picker mounted):  add=3 rem=0 LIVE=3
#/gradient    add=3 rem=0 LIVE=3      #/atmosphere   add=3 rem=0 LIVE=3
#/generate    add=3 rem=0 LIVE=3      #/mix          add=3 rem=0 LIVE=3
#/extract     add=3 rem=0 LIVE=3      #/palettes     add=3 rem=0 LIVE=3
#/browse      add=3 rem=0 LIVE=3      #/blob         add=3 rem=0 LIVE=3
#/admin/users … #/admin/tags          add=3 rem=0 LIVE=3   (all five)
#/            add=3 rem=0 LIVE=3
picker in DOM on /#/gradient: false
```

`rem = 0` across all fourteen routes. `ColorPicker.vue:376–383` registers
`window.addEventListener("keydown", handleKeydown)` in `onMounted` and removes it in
`onUnmounted`; `onUnmounted` **never fires once** in an entire session. The picker's DOM is
detached (`picker in DOM: false`) but its `window` handler is live on every other route,
holding the whole picker subtree — model, watchers, WebGL — reachable.

`handleKeydown` (ColorPicker.vue:249–267) calls `e.preventDefault()` on two arms: `Escape` and
`Enter` while `isEditing`, and `cmd+k` unconditionally. **The listener survival is CONFIRMED by
the measurement above. The specific Cmd+K swallow is a HYPOTHESIS in my seat** — my synthetic
and real `page.keyboard` Cmd+K on `/#/gradient` returned `defaultPrevented: false`, so the
`useMagicKeys` arm did not latch under automation. A sibling seat reports reproducing it
interactively; the mechanism is unambiguous either way, and the `isEditing` Escape/Enter arm is
the same class.

Full census of `window`/`document` listeners registered inside KeepAlive-cached subtrees (all
therefore surviving deactivation):

| file:line | target/event | removed on | survives deactivation |
|---|---|---|---|
| `demo/picker/ColorPicker.vue:377` | `window keydown` | `onUnmounted` | **yes** |
| `demo/picker/ColorPicker.vue:247` | `useMagicKeys()` (window keydown/keyup/blur/focus) | scope dispose | **yes** |
| `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:239` | `window keydown` (Escape) | `onBeforeUnmount` | **yes** |
| `demo/picker/composables/usePointerDebug.ts:227–232` | `document` pointer/touch ×6, capture | scope dispose | **yes** |
| `demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts:124` | `document pointercancel` | scope dispose | **yes** |
| `demo/color-picker/composables/boot/useAtmosphere.ts:340,354` | `useEventListener` + `document pointerleave` | scope dispose | n/a — App-scoped, not cached |
| `demo/color-picker/composables/useDevicePixelSnap.ts:83–85` | `window resize`, `document transitionend/animationend` (capture) | scope dispose | n/a — App-scoped |

Also implicated: `VISUAL-CONSTITUTION.md §6` — *"Paused, parked and offscreen mean no animation
work."* A KeepAlive-cached pane is offscreen by definition and nothing pauses. The
`consoleErrors` row in `docs/tranches/V/megatranche/audit/visual/REPORT.md:17`
(`safari-desktop-light /#/: WebGL: context lost.`) is **consistent with** cached panes retaining
WebGL contexts (HeroBlob, BlobPane, AuroraPane) past the browser's context cap — I label the
causal link a **hypothesis**, the missing deactivation contract a **confirmed defect**.

**Cure:** the deactivation contract belongs to the component that imposes the caching. PaneSlot
should either (a) not impose KeepAlive at all and let each pane opt in, or (b) provide the
contract — but the honest, KISS answer is that *global* listeners have no business in a cached
subtree. `useEventListener` from `@vueuse/core` (already a dependency, already used at
`useAtmosphere.ts:340`) is scope-bound and still survives deactivation; only `onActivated` /
`onDeactivated` pairs, or a shell-owned command bus, are correct here.

---

### D-6 · MAJOR — no loading state and no error state for ten async panes; measured >2 s of empty slot

`usePaneRouter.ts:69–78` declares all ten panes as bare `defineAsyncComponent(() => import(...))`:
no `loadingComponent`, no `delay`, no `errorComponent`, no `timeout`. PaneSlot renders whatever
comes back, which for an unresolved async component is a comment placeholder — nothing.

Measured, cold first visit to each route (dev server, 1440×900; longest contiguous run with an
empty non-ghost slot):

```
#/mix          longestEmptySlot=  137ms
#/generate     longestEmptySlot= 2121ms
#/gradient     longestEmptySlot= 2505ms
#/browse       longestEmptySlot=  326ms
#/extract      longestEmptySlot=    0ms
#/atmosphere   longestEmptySlot= 2107ms
#/blob         longestEmptySlot= 2110ms
```

Four of seven routes show a **completely empty pane area for over two seconds** with zero
affordance — no skeleton, no spinner, no text. (Dev-server timings are inflated relative to a
production chunk; the *state* is unhandled regardless of duration, and a cold 3G production
load reaches the same place.) `VISUAL-CONSTITUTION.md §6` forbids exactly this shape:
*"No full-slab remount hole, rAF-delayed blank, or dock collapse."*

The **error** state is worse. There is no `errorComponent`, so a failed chunk (stale deploy,
network blip) throws into `App.vue:50`'s `ErrorBoundary` — which wraps the **entire two-pane
grid**, not the pane. So one bad pane replaces the healthy sibling pane too. And
`ErrorBoundary.vue:58–72` latches: `caught` is only cleared by the user pressing "Try again";
there is no watch on the route. **Route away from a failed pane and the error card follows you
to every other route.** The boundary granularity is wrong, and PaneSlot — which owns pane
identity — is where it belongs.

---

### D-7 · MAJOR — the KeepAlive `:max` numbers are hand-maintained magic numbers, and the comments that justify them are inverted

`App.vue:78–82`, `:max="9"` (mobile); `App.vue:97–100`, `:max="6"` (desktop-left);
`App.vue:123–126`, `:max="4"` (desktop-right). Each is a hand-counted census of a route table
that lives in a *different file* (`viewSchema.ts` / `usePaneRouter.ts`). Adding one route
silently invalidates three numbers in a third file. That is the coupling the single route table
was supposed to abolish (`usePaneRouter.ts:1–10`).

Worse, the justification is backwards. `App.vue:97–100`:

> `:max` = the 6 distinct non-admin LEFT panes … admin left panes **fall off the LRU** rather
> than bloating the cache.

`componentFor` (`usePaneRouter.ts:93`) maps every `admin-*` name to the same `AdminPane`, but
the cache **key** is the full view name (`desktopLeft.key = left`, `usePaneRouter.ts:165`), and
`viewSchema.ts:188–231` gives five distinct admin left names. So the left slot has **11 distinct
keys against `max=6`**. Vue's KeepAlive LRU
(`node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:2977–2979`) evicts the **oldest** key
on a miss:

```js
keys.add(key);
if (max && keys.size > parseInt(max, 10)) {
  pruneCacheEntry(keys.values().next().value);   // ← oldest, not newest
}
```

Fresh admin entries evict the **non-admin** panes, not themselves. Visiting the five admin routes
destroys five of the six non-admin left panes — exactly the eviction the comment claims cannot
happen. The mobile slot is worse: 11 left keys + 4 right keys = **15 distinct keys against
`max=9`**.

And the whole cache is thrown away anyway on a breakpoint cross: `App.vue:77` / `App.vue:94`
mount the mobile and desktop slots under `v-if`/`v-else` (the X6 single-mount law), so rotating
a tablet unmounts every cached pane — defeating `App.vue:113–114`'s stated purpose ("always in
DOM to preserve KeepAlive scroll position").

**Cure:** derive the bound from the registry (`Object.keys(VIEW_MAP)` / the distinct left/right
sets) or drop `:max` entirely; the demo has ten pane components, not a thousand.

---

### D-8 · MAJOR — the rAF mirror state is a second source of truth, and `VISUAL-CONSTITUTION.md §6` names it

`PaneSlot.vue:65–108` is the mechanism: on a key change, `liveComponent`/`liveKey`/`liveProps`
**trail the props by one animation frame**, so "the first post-click frame paints only the cheap
container slide."

`VISUAL-CONSTITUTION.md §6`, verbatim: *"A scene swap preserves the specimen and changes the
surrounding instrument. No full-slab remount hole, **rAF-delayed blank**, or dock collapse."*

The component's central mechanism is the named prohibition. It survives today only because
D-2's simultaneous mode leaves the outgoing pane on screen to cover the deferred frame — i.e.
**one canon violation is masking another**. Fix D-1/D-2 (`mode="out-in"`) without also deleting
the rAF defer and the blank becomes visible on every swap.

Design cost beyond the canon: two disagreeing truths. `viewManager.currentConfig` says the route
is B while `liveKey` still renders A. Every consumer that reads `currentConfig` — `App.vue:324`'s
`onDesktopLeftMount` deciding which ref to assign, the Dock's `:action-bar`, `useViewAccents` —
is one frame ahead of the screen. Today they happen to agree; nothing enforces it.

`VISUAL-CONSTITUTION.md §5.1` is also unsatisfiable by construction: *"one atomic DOM commit
changes shell H1/title, marks the outgoing scene inert/AT-hidden and makes the incoming scene the
sole active accessibility subtree; no observer or microtask sees zero or two active subtrees …
First/middle/terminal/reversal frames each expose exactly one main, one H1 and one active route
subtree."* Measured: **two** live subtrees for 26–27 frames per swap, neither `inert` nor
`aria-hidden`, both fully opaque, both keyboard-reachable. Tab during a swap can land focus
inside a pane that is about to be removed; focus then drops to `<body>`.

---

### D-9 · MINOR — the `any`-typed ref-capture seam degrades the whole action-bar dispatch to silent no-ops

`PaneSlot.vue:52` — `onMount?: (instance: any) => void`. `PaneSlot.vue:124` —
`:ref="onMount ? (el: any) => onMount!(el) : undefined"`. That `any` propagates:
`App.vue:317–319` (`ref<any>` ×3) → `usePaneRouter.ts:107–111` (`PaneActionRefs { generate: Ref<any> … }`)
→ `usePaneRouter.ts:196–222`, where every dock action is dispatched as

```ts
handler: () => paneRefs.generate.value?.regenerate?.()
```

Double optional-chaining on an `any`. If a pane renames or stops exposing `regenerate`, the dock
button does **nothing, forever, silently** — no type error, no runtime error. That is precisely
the "masking fallback" **owner edict 2** forbids, and it exists because the seam that captures
the instance is untyped.

Two ancillary notes on the same line: (a) the arrow is re-created on every render, and Vue's
`setRef` is invoked unconditionally on every patch of a ref-bearing vnode
(`runtime-core.cjs.js:5475–5476`), so `onDesktopLeftMount(el)` re-fires on every PaneSlot
re-render — which is every time `liveProps` identity changes; (b) I verified the *good* half:
`unmount()` calls `setRef(..., isUnmount=true)` **before** the KeepAlive `deactivate` branch
(`runtime-core.cjs.js:6588–6598`), so `onMount(null)` *does* fire on deactivation. The ref seam
is honest about deactivation while the panes themselves are not — which is exactly what made
D-5 invisible.

**Cure:** `onMount?: (instance: PaneExposed | null) => void` with a real exposed interface per
pane, or delete the callback and let the dock action bar be *provided* by the active pane
(`provide`/`inject`) instead of reached into.

---

### D-10 · MINOR — `transitionName: ""` as a sentinel; `max = 5` dead default

`PaneSlot.vue:44` documents `transitionName` as *"(empty string suppresses animation)"*. An empty
string is not "no transition" to Vue — it makes the generated classes `-enter-from`,
`-enter-active`, … which happen to match no CSS. The machinery still runs; the suppression is
accidental. The honest expressions are `:css="false"` or a boolean prop. All three call sites
spell it `viewManager.ready.value ? 'vj-enter' : ''` (App.vue:87, 106, 132), so the sentinel is
load-bearing at boot.

`PaneSlot.vue:32` — `max = 5` is never used; all three call sites pass `:max`. A default that
cannot be reached is dead code.

Neither is severe alone; together they are the same smell as the rest of the file — the API
grew by accretion around a workaround instead of being designed.

---

### D-11 · INFO — the mobile grammar does not scroll, and the constitution says it must

`shell.css:20–27` — `.app-layout { height: 100dvh; overflow: hidden }`. Measured at 390×844
across eight mobile routes:

```
#/  #/gradient  #/generate  #/browse  #/extract  #/mix  #/palettes  #/admin/users
docScroll=0 on all eight; scrollers=[] on all eight; clipTop=0 clipBottom=0 on all eight
```

The panes shrink to fit (592, 732, 421, 408, 565, 370, 480, 395 px into slots of the same
height), so nothing is *currently* clipped — but nothing can scroll either.
`VISUAL-CONSTITUTION.md §3` proportion law 6: *"Mobile uses one **document-scrolling**
stage→inspector→action sequence beneath the same top dock."* The shell is a fixed non-scrolling
viewport with height-shrinking panes. This is App.vue/`shell.css`'s decision, not PaneSlot's —
but PaneSlot is the mount seat inside it and any cure to D-2 must not assume a scroll container
that does not exist. Filed here so the mega-tranche does not lose it.

---

## 3. State coverage — the enumeration

| State | Handled? | Evidence |
|---|---|---|
| empty (`right: null`) | partial — ghost wrapper, but see D-4 | App.vue:120, 403–409; probe 2 |
| **loading (async chunk)** | **NO** | D-6 — 2121/2505/2107/2110 ms empty, no affordance |
| populated | yes | — |
| **error (chunk fetch fail)** | **NO** | D-6 — no `errorComponent`; grid-level latching boundary |
| **error (pane render throw)** | wrong granularity + latches across routes | ErrorBoundary.vue:58–72; App.vue:50 |
| **swapping** | **BROKEN** | D-2/D-3/D-4 — 26–27 co-mount frames, ±580/±722 px |
| **deactivated (KeepAlive)** | **NO** | D-5 — zero `onDeactivated` in the whole demo |
| reactivated | one site only | HeroBlob.vue:246 (`onActivated`, unpaired) |
| **evicted (LRU)** | **NO** — silently loses state | D-7 — 11 keys vs `max=6` |
| breakpoint cross | destroys every cache | App.vue:77/94 `v-if`/`v-else` |
| focused / hovered / pressed | n/a — renders no DOM | — |
| **two live a11y subtrees mid-swap** | **NO** | D-8; VISUAL-CONSTITUTION §5.1 |
| focus during swap | **NO** — outgoing pane stays tabbable | D-8 |
| **reduced-motion** | **NO** — identical geometry | D-4, PRM=reduce column |
| forced-colors | n/a (no own DOM) | shots present, no PaneSlot-attributable defect |
| RTL | n/a (no own DOM); `translateX(±110%)` in animations.css is physical, per §6.1 | animations.css:228–236 |
| zoom 200 % / 400 % | not measured this seat | — |
| overflowing / truncated | see D-11 | probe 4 |

Nine states unhandled or broken. **A state that was never designed is a design defect** — this
component was designed for exactly one state (populated) and one transition (the happy swap),
and even that one is wrong.

---

## 4. Design-system boundary, edicts, proportion register

| Law | Status |
|---|---|
| **Edict 1** — no god modules | PASS. PaneSlot is focused; `usePaneRouter.ts` is drifting (route table + props + dock action bar, 231 lines) but is not this seat's subject. |
| **Edict 2** — no legacy code / masking fallbacks | **FAIL ×2** — D-1 (workaround for a fixed upstream bug), D-9 (`?.method?.()` silent no-ops). |
| **Edict 3** — KISS, no contrivance | **FAIL** — 40 lines of mirror state + rAF scheduling to work around D-1; `mode="out-in"` is one attribute. |
| **Edict 4** — glass-ui is the design system | PASS. PaneSlot reaches past nothing; it renders no chrome. Note: glass-ui 7 ships `InstrumentChassis`/phase seams (`VISUAL-CONSTITUTION.md §3.1`) — a producer-owned scene-swap seam is the *right* long-term home for this, and belongs in a BH/BI relay per the standing glass-ui relay edict. |
| **Edict 5** — root-level styling | PASS for PaneSlot; the pane geometry overrides correctly live in `animations.css:228–277`, not per-instance. |
| **Edict 6** — animations never deleted, only moved/tokenized | PASS. The `vj-enter` family and `overture-appear-*` are tokenized and homed globally. |
| **Edict 7** — idiomatic Vue 3.5 | **MIXED**. Reactive props destructure ✓, `shallowRef` ✓. But `useTemplateRef` is bypassed in favour of a hand-rolled `any` ref callback (D-9), and the idiomatic `Transition mode="out-in"` + `Suspense` pair is refused on stale grounds (D-1, D-6). |
| **Edict 8** — `verbatimModuleSyntax` | PASS. `PaneSlot.vue:25` uses the inline `type Component` modifier correctly. |
| `VISUAL-CONSTITUTION.md §5.1` (one active route subtree, atomic commit, focus policy) | **FAIL** — D-8. |
| `VISUAL-CONSTITUTION.md §6` ("no rAF-delayed blank"; "reduced motion resolves directly to the final geometry"; "offscreen means no animation work") | **FAIL ×3** — D-8, D-4, D-5. |
| `VISUAL-CONSTITUTION.md §3` law 4 ("Expanded/collapsed/mounted states do not move the scene below it") | **FAIL** — D-2: the container height moves 674→1254→822 on a mount. |
| `VISUAL-CONSTITUTION.md §3` law 6 (mobile document-scrolling) | **FAIL** — D-11 (shell-owned). |
| `PROPORTION-AUDIT.md` | No PaneSlot row exists. §3 requires *"One row … for every route-level region"*. The pane slot **is** the route-level region and it has no register row, no terminal verb and no accountable primary wave. **That is a register gap, and it is why the swap has never been proportioned.** |

---

## 5. Reproduction — paste into any console at `http://localhost:9000`

```js
// co-mount census: two in-flow panes, both at opacity 1, layout jumping
(async () => {
  const w = document.querySelector('.pane-wrapper--right') || document.querySelector('.pane-slot-mobile');
  const s = [];
  const snap = () => s.push({ t: Math.round(performance.now()), n: w.children.length,
    wh: Math.round(w.getBoundingClientRect().height),
    kids: [...w.children].map(c => { const r = c.getBoundingClientRect();
      return [Math.round(r.top), Math.round(r.height), Math.round(r.left), getComputedStyle(c).opacity]; }) });
  location.hash = '#/'; await new Promise(r => setTimeout(r, 1600));
  snap(); location.hash = '#/mix'; const t0 = performance.now();
  await new Promise(res => (function l(){ snap(); performance.now()-t0 > 700 ? res() : requestAnimationFrame(l); })());
  console.table(s.map(x => ({ 't+ms': x.t - Math.round(t0), n: x.n, wrapperH: x.wh, kids: JSON.stringify(x.kids) })));
})();
```

Scripts used by this seat (scratchpad, not repo):
`keepalive-listener-probe.mjs` (D-5), `paneslot-probe2.mjs` (D-2), `paneslot-probe3.mjs`
(D-4, D-6), `paneslot-probe4.mjs` (D-11), `outin-probe.mjs` (**D-1, the decisive one**).

---

## 6. The gestalt cure — one transposition, not eleven patches

Nine of the eleven findings collapse into one architectural move. PaneSlot is currently a
*scheduler* pretending to be a *slot*. Make it a slot:

```vue
<Transition :name="transitionName" mode="out-in" :appear="appear" …>
  <KeepAlive :max="max">
    <Suspense :key="componentKey">
      <component :is="component" v-bind="componentProps" />
      <template #fallback><PaneSkeleton /></template>
    </Suspense>
  </KeepAlive>
</Transition>
```

- `mode="out-in"` — kills D-2, D-3, D-4, and the a11y half of D-8. **Verified working on the
  pinned Vue 3.5.35 under this project's own dev server** (D-1). One pane in the box at a time;
  the wrapper never holds two children; the ghost class flips after the leave, not before.
- Deleting `liveComponent`/`liveKey`/`liveProps` and the rAF — kills D-8 and restores one source
  of truth. The long-task concern the rAF was buying is better paid by `Suspense` (which defers
  the incoming mount by *readiness*, not by a fixed frame) or by `defineAsyncComponent({ delay })`.
- `Suspense` + a real fallback — kills D-6's loading hole; pair it with a per-slot
  `ErrorBoundary` (move App.vue:50's boundary *inside* PaneSlot, keyed on `componentKey` so it
  self-resets on route change) to kill D-6's latching-error half.
- `:max` derived from the route registry, or dropped — kills D-7.
- A typed `PaneExposed` contract, or `provide`/`inject` for the dock action bar — kills D-9.
- An `onDeactivated` contract for the four panes with global listeners / render loops — kills
  D-5. The honest version is that `ColorPicker`, `ImageEyedropper` and the debug composables
  should not hold `window` listeners at all; a shell-owned command bus is the KISS answer.

The two that do **not** collapse: **D-5** (a per-pane lifecycle debt PaneSlot merely exposes) and
**D-11** (shell-owned scroll grammar).

And before any of it: **PaneSlot needs a `PROPORTION-AUDIT.md` register row** with a terminal
verb and an accountable primary wave. It is the route-level region every other row sits inside,
and it has never been proportioned.
