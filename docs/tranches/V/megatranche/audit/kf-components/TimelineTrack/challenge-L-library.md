claude-opus-5[1m]

# Challenge · `TimelineTrack.vue` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/components/TimelineTrack.vue` (246 lines)
**Mode:** static, read-only. No browser tooling, no installs, no dev servers. One probe *was* executed: the installed Tailwind v4.3.0 compiler was invoked in the scratchpad against a synthetic class list to obtain ground truth for §M-2 — no repo file was read-modified, no build artifact was produced in-tree.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries a falsifier; four candidate defects were **killed by their own falsifiers** and are recorded in §K so they are not re-raised.

## Files read whole (the import closure)

| file | why in scope |
|---|---|
| `timeline/components/TimelineTrack.vue` | the target |
| `timeline/composables/useZoomPan.ts` | `:115` import |
| `timeline/TimelineCaret.vue` | `:116` import |
| `timeline/components/TimelineHoverPreview.vue` | `:117` import |
| `timeline/timelineTypes.ts` | `:118` type import |
| `node_modules/@mkbabb/value.js/dist/subpaths/math.d.ts` | `:114` `clamp` |
| `node_modules/@mkbabb/glass-ui/dist/tooltip-OxciiZm6.js` (+ `tooltip.d.ts`, `styles/utilities/btn.css`, `styles/theme/bridges.css`) | `:113` `Tooltip*` — resolution + cascade evidence |
| `timeline/KeyframeTimeline.vue`, `timeline/composables/{useTimeline,useTimelineOps,useTimelineBuild}.ts`, `timeline/utils/snapshotCapture.ts`, `timeline/index.ts` | the consumer seam — prop/emit contracts are only judgeable against it |
| `transport/channel-controls/ChannelControls.vue`, `styles/layout.css`, `styles/style.css`, `tsconfig.json`, `package.json`, `.github/workflows/ci.yml` | mount context, cascade root, enforcement surface |

## Tally

| severity | count |
|---|---|
| BLOCKER | **1** |
| MAJOR | **7** |
| MINOR | **18** |
| INFO | **3** |
| **defects total** | **29** |
| SUPERLATIVE | **5** |

---

## BLOCKER

### B-1 · The component's only third-party UI import resolves to a phantom package — and CI installs from the lockfile

`TimelineTrack.vue:113`

```ts
import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui";
```

`@mkbabb/glass-ui` is declared **nowhere**:

```
$ grep -n "glass-ui" package.json package-lock.json      → (no output)
$ node -e '…@mkbabb/glass-ui/package.json…version'        → 7.0.0   (installed)
```

This **confirms and extends census `lane-frontend.md` F-1**. The extension is the enforcement surface, which F-1 left as deduction: CI does not `npm install`, it `npm ci` — four times — and then builds the demo.

```
.github/workflows/ci.yml:40   run: npm ci
.github/workflows/ci.yml:67   run: npm ci
.github/workflows/ci.yml:73   run: npm run gh-pages      # vite build --mode gh-pages
.github/workflows/deploy-pages.yml:71  run: npm ci
.github/workflows/release.yml:33       run: npm ci
```

`npm ci` reconstructs `node_modules` **strictly** from `package-lock.json`. Zero glass-ui entries there ⇒ no glass-ui on disk ⇒ `vite build --mode gh-pages` cannot resolve `TimelineTrack.vue:113`. The timeline is unambiguously in that build graph: `ChannelControls.vue:253` → `KeyframeTimeline.vue:175` → `TimelineTrack.vue`.

Why this is the *component's* blocker and not merely an ambient one: `TimelineTrack` has exactly **two** external imports (`:113` glass-ui, `:114` value.js). value.js is declared (`package.json:69`, lock `:611`). glass-ui is not. Half this file's external surface is unresolvable from a clean checkout, and it is the half that is load-bearing for its entire tooltip affordance (`:62–94`).

**Falsifier.** Any of: (a) `grep -c "glass-ui" package-lock.json > 0`; (b) an install hook that adds it — `scripts` has only `prepare: npm run build:lib`, no pre/postinstall; (c) a vendored/committed copy — `ls -ld node_modules/@mkbabb/glass-ui` is a real directory dated `Jul 16 05:17`, not a symlink, and `node_modules/` is not tracked; (d) glass-ui arriving transitively — the lock contains exactly one `@mkbabb` entry and it is value.js.
**Explicitly UNPROVEN-NEEDS-LIVE:** the corollary "the gh-pages CI job is currently red". I cannot run CI. The *resolution* fact stands on the lockfile alone; the *observed* CI colour does not.

---

## MAJOR

### M-1 · `@wheel.prevent` turns the track into a scroll dead zone inside a scrolling pane

`TimelineTrack.vue:31`

```html
@wheel.prevent="onWheel"
```

Vue's `.prevent` compiles to `withModifiers(handler, ["prevent"])`, which calls `event.preventDefault()` **unconditionally, before** the handler runs. The handler itself acts on only two of the four wheel cases (`useZoomPan.ts:43–62`): ctrl/meta ⇒ zoom, shift-and-zoomed ⇒ pan. A **plain** wheel does nothing — but has already been cancelled.

The track is mounted inside a scroll container. `ChannelControls.vue:85`:

```html
<div ref="tabsContentEl" class="flex-1 min-h-0 overflow-y-auto flex flex-col pb-1">
```

and the timeline's own sibling comment (`ChannelControls.vue:182–185`) states the placement is deliberate: *"inside the scrollable area so Teleport lifecycle isn't tied to a panel mount/unmount"*. So a full-pane-width band — `h-12` (48px) collapsed, `h-32` (128px) expanded, per `TimelineTrack.vue:25` — silently eats every scroll gesture aimed at the pane. Wheel listeners are non-passive-by-default on non-root elements, so the cancellation lands.

**Falsifier.** Set the wheel handler to conditional prevention (`if (ctrl||meta||shift) event.preventDefault()`) and observe pane scroll restored; or demonstrate that no ancestor of the track scrolls — contradicted directly by `ChannelControls.vue:85`.
**Note the internal inconsistency:** the same element gets `touch-none` + three `.passive` touch handlers (`:24, :32–34`) — the *correct* posture, where `touch-action` removes the gesture so the listener never needs to cancel. The wheel path takes the opposite posture with no equivalent justification.

### M-2 · The keyframe marker's motion design is dead: Tailwind v4 animates `scale`/`rotate`/`translate`, the scoped rule transitions `transform`

`TimelineTrack.vue:66–72` and `:223–227`

```html
'keyframe-marker absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-controls',
expanded ? 'w-6 h-6' : 'w-4 h-4',
'rotate-45 rounded-sm cursor-grab',
'border-2 transition-all',
selectedKeyframeId === kf.id
    ? 'bg-primary border-primary scale-125'
    : 'bg-background border-foreground/50 hover:border-primary scale-on-hover',
```

```css
.keyframe-marker {
    transition:
        transform var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard);
}
```

Ground truth from the **installed** compiler (`tailwindcss@4.3.0`, `node_modules/tailwindcss/dist/lib.js`, invoked in the scratchpad):

```css
.-translate-x-1\/2 { --tw-translate-x: calc(calc(1 / 2 * 100%) * -1); translate: var(--tw-translate-x) var(--tw-translate-y); }
.scale-125        { --tw-scale-x: 125%; --tw-scale-y: 125%; --tw-scale-z: 125%; scale: var(--tw-scale-x) var(--tw-scale-y); }
.rotate-45        { rotate: 45deg; }
.transition-all   { transition-property: all; transition-timing-function: …; transition-duration: …; }
```

Three consequences, all following from that output:

1. **Nothing on this element ever sets the `transform` property.** v4 emits the *independent* `translate` / `rotate` / `scale` properties. The scoped rule's first transition entry animates a property that is never mutated — it is dead weight.
2. **`transition-all` (`:71`) is dead.** The scoped rule is a `transition` **shorthand**, which resets `transition-property`. Vue SFC `<style scoped>` is injected **unlayered**; Tailwind emits utilities inside `@layer utilities` (`@layer theme, base, components, utilities;`). Under CSS Cascade 5, unlayered declarations outrank *every* layered one regardless of specificity. Belt and braces: even ignoring layers, `.keyframe-marker[data-v-…]` is (0,2,0) against `.transition-all`'s (0,1,0). Same verdict twice over.
3. **The selection pop and the hover lift are unanimated.** `scale-125` writes `scale`; glass-ui's `scale-on-hover` (`node_modules/@mkbabb/glass-ui/dist/styles/utilities/btn.css`) is
   ```css
   @utility scale-on-hover { scale: 1; transition: scale var(--spring-smooth-duration) var(--spring-smooth); &:hover { scale: var(--scale-hover); } }
   ```
   — it ships its own `transition: scale`, and that shorthand is clobbered by the unlayered scoped shorthand for exactly the reason in (2). So the component *imports a glass-ui motion primitive and then silently strips its motion*. Only `border-color` still transitions.

**Falsifier.** Any of: Tailwind resolving to v3 (composed `transform: var(--tw-transform)`) — installed is `4.3.0`, declared `^4.3.0`; the scoped block being emitted inside a cascade layer — the Vue Vite plugin injects plain `<style>`; or `transform` being set on `.keyframe-marker` from some other sheet — `grep` across `demo/styles` and the glass dist finds no rule targeting `.keyframe-marker`.
**Cheapest correct fix (for the record, not applied):** `transition: scale …, rotate …, translate …, border-color …`, or simply delete the scoped block and let `scale-on-hover` own it.

### M-3 · Two-finger pinch also drags the playhead — the pointer and touch pipelines are unguarded against each other

`TimelineTrack.vue:27–34` binds **both** pipelines to the same element:

```html
@pointerdown="onTrackPointerDown"
@pointermove="onTrackPointerMove"
…
@touchstart.passive="onTouchStart"
@touchmove.passive="onTouchMove"
```

`onTouchStart`/`onTouchMove` (`useZoomPan.ts:75–92`) implement pinch-zoom on `event.touches.length === 2`. But a touch also emits the full pointer sequence, and neither `onTrackPointerDown` (`:168`) nor `onTrackPointerMove` (`:174`) checks `event.isPrimary`, `event.pointerType`, or any active-pointer count. A touch pointer reports `buttons === 1` while in contact, so `:182`'s `event.buttons > 0` gate passes.

Sequence for a pinch: finger 1 down ⇒ `onTrackPointerDown` ⇒ `emit("update:scrubT", …)` — the playhead jumps to finger 1. Finger 2 down ⇒ pinch arms. Both move ⇒ `onTouchMove` zooms **and** `onTrackPointerMove` keeps scrubbing to finger 1's drifting position. `scrubT` drives `scrub()` on the live engine (`useTimeline.ts:41–46` → `useTimelineBuild`), so the animation target visibly re-renders throughout the zoom gesture.

**Falsifier.** Add `if (!event.isPrimary) return` (or an active-pointer counter) and observe the pinch leave `scrubT` untouched; or demonstrate that `touch-action: none` suppresses pointer events — it does not, it suppresses *browser gestures*, which is precisely why the demo hand-rolls pinch here.
**Not falsified by** `useTouchGate` (glass-ui, used at `AnimationVisualizer.vue`, `PlaybackRibbon.vue`) — this component does not import it.

### M-4 · `previewCache` is write-once and never invalidated: stale previews, retained bitmaps for deleted keyframes

`TimelineTrack.vue:125–126, 89–90` declare the contract:

```ts
previewCache: Record<string, string>;
previewLoading: Record<string, boolean>;
```
```html
:preview-src="previewCache[kf.id]"
:loading="previewLoading[kf.id]"
```

Every mutation site across the whole demo (exhaustive grep):

```
KeyframeTimeline.vue:217  const previewCache = reactive<Record<string, string>>({});
KeyframeTimeline.vue:221  if (previewCache[kf.id] || previewLoading[kf.id]) return;
KeyframeTimeline.vue:226  previewCache[kf.id] = canvas.toDataURL("image/png");
```

There is **no `delete`, no reset, no watcher, nothing keyed to `state`**. Keys are `TimelineKeyframe.id`, minted once at `timelineTypes.ts:41` and never rewritten by any mutation. Therefore:

- **Stale after edit.** `onKeyframeCSSChange` (`KeyframeTimeline.vue:246–265`) rewrites `kf.vars` in place; the id survives; the cached PNG of the *old* styling is served forever.
- **Stale after move.** `moveKeyframe` (`useTimelineOps.ts:56–63`) changes `kf.percent`; the id survives; the preview still shows the render captured at the old percent — while the tooltip's own header (`TimelineHoverPreview.vue:3`) prints the *new* percent beside it. The tooltip contradicts itself.
- **Stale after undo.** `useRefHistory({ clone: true })` (`useTimeline.ts:83–88`) restores *cloned* keyframe objects carrying the *same* id strings.
- **Retained after delete.** `removeKeyframe` splices the array; the data-URL PNG stays resident. `previewCache` grows monotonically for the session lifetime, one full-size base64 PNG per keyframe ever hovered.

This is not a hot loop, so it is a bounded leak, not an OOM — but it is a leak with no teardown and a correctness bug on the two most common edit paths.

**Falsifier.** Produce any code path that deletes from or clears `previewCache` — the grep above is exhaustive across `--include="*.vue" --include="*.ts"` over the whole `demo/` tree.
**Seam note.** The store lives in the parent; the *contract* (`Record<string,string>` keyed by a mutable-content, immutable-id entity, with no invalidation token) is declared here at `:125–126`. A `previewToken: string` derived from `percent + vars` would make the contract self-invalidating.

### M-5 · Nothing typechecks this file — no `vue-tsc` exists in the repository, and CI never runs the demo check

```
$ grep -rn "vue-tsc" package.json Makefile .github        → (no output)
$ node -e '…scripts…'
  check     : "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
  check:lib : "tsc --noEmit -p tsconfig.lib.json"
  lint      : "depcruise src"
$ ls -a | grep -i eslint                                   → (no matches)
```

Three independent gaps stack:

1. `tsc` cannot read `.vue` at all. `tsconfig.json` `include: ["src/", "demo/"]`, but `tsc` only ingests `.ts/.tsx/.d.ts`. **Every `<script setup>` in the demo is invisible to `npm run check`.**
2. `npm run check` **is never invoked by CI**. `ci.yml` runs `check:lib` (`:42`) — and `tsconfig.lib.json` "only includes `src/`" per the comment at `tsconfig.json`'s own `paths` block. So even the demo's plain `.ts` (including `useZoomPan.ts`) is unchecked in CI.
3. `lint` is `depcruise src` — dependency-cruiser, scoped to `src/`, not the demo, and not a type or unused-symbol check. There is no ESLint config anywhere.

The tsconfig is strict in intent — `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax` — and **none of it reaches this file**. That is what makes M-5 a MAJOR rather than an INFO: every type-shaped claim below is unenforced by construction.

Concrete latent that this masks, right here: under `noUncheckedIndexedAccess: true`, `previewCache[kf.id]` (`:89`) is `string | undefined` and `previewLoading[kf.id]` (`:90`) is `boolean | undefined`; under `exactOptionalPropertyTypes: true`, `TimelineHoverPreview`'s `previewSrc?: string` / `loading?: boolean` (`TimelineHoverPreview.vue:34–35`) do **not** admit an explicit `undefined`. The runtime is fine; the declared contract is a lie that no gate can catch.

**Falsifier.** Point to any script, workflow step, or hook that runs `vue-tsc` / `vti` / a Volar CLI over `demo/`. Adding `vue-tsc --noEmit` and observing zero diagnostics on this file would also falsify the latent half (though not gap 1–3 themselves).

### M-6 · Clicking a caret's percent label to edit it also jumps the playhead — and the author guarded the sibling

`TimelineTrack.vue:27` binds `@pointerdown="onTrackPointerDown"` on the track. `TimelineCaret` renders **inside** that track (`:97–106`, track closes `:107`). Its two interactive elements are guarded asymmetrically:

```html
TimelineCaret.vue:12    @click.stop="startEdit"                  ← label: click guarded, pointerdown NOT
TimelineCaret.vue:25-26 @click.stop   @pointerdown.stop          ← input: both guarded
```

`pointerdown` on the label bubbles to the track ⇒ `onTrackPointerDown` ⇒ `emit("update:scrubT", percent/100)` ⇒ `KeyframeTimeline.vue:83` writes `scrubT` ⇒ the engine scrubs. *Then* `click` fires `startEdit`. So the discoverable "click the number to retype it" affordance silently moves the playhead as a side effect, and — because `getPercentFromPointer` reads the raw pointer x, not the caret's own `percent` — it moves it to wherever inside the label the click landed, not to the keyframe.

The `@pointerdown.stop` two lines below on the `<input>` is the evidence that the hazard was known and only half-covered.

**Falsifier.** Add `@pointerdown.stop` to `TimelineCaret.vue:12` and observe `scrubT` unchanged on a label click; or show that `onTrackPointerDown` no-ops for this target — it does not, it is unconditional (`:168–172`).

### M-7 · Shift-wheel pan reads only `deltaY`, the axis Chromium zeroes for shift-wheel

`useZoomPan.ts:57–61`

```ts
} else if (event.shiftKey && zoomLevel.value > 1) {
    // Horizontal pan
    panOffset.value += (event.deltaY * 0.1) / zoomLevel.value;
    clampPan();
}
```

`event.deltaX` is never read anywhere in the file (`grep -n "deltaX" useZoomPan.ts` → no output). Chromium's shift-wheel handling swaps the axis at the input layer: the event arrives with `shiftKey: true`, `deltaX: ±N`, `deltaY: 0`. Multiplying zero by `0.1 / zoomLevel` gives zero ⇒ `panOffset` never moves ⇒ the entire horizontal-pan affordance is inert, and — compounded by **M-1** — the gesture is *also* swallowed, so the pane doesn't scroll either. Firefox reports the delta on `deltaY` with `shiftKey`, which is why the branch was presumably written and observed to work once.

The source-level defect is certain and browser-independent: a handler that claims to pan horizontally must read the horizontal delta. `event.deltaX || event.deltaY` is the one-token fix.

**Falsifier (source half, fully proven):** show a `deltaX` read — there is none.
**Falsifier (behaviour half) — UNPROVEN-NEEDS-LIVE:** log `{deltaX, deltaY, shiftKey}` on shift-wheel over the track in Chrome. If `deltaY !== 0` there, the "inert in Chromium" half dies while the "reads the wrong axis" half survives. Flagged for the SS-13 live pass.

---

## MINOR

| # | claim | provenance | falsifier |
|---|---|---|---|
| m-1 | `const props = defineProps<…>()` binds a name the script never reads (`grep -n "props\." TimelineTrack.vue` → none). Same dead binding at `TimelineCaret.vue:35`; `TimelineHoverPreview.vue:32` gets it right with a bare `defineProps<…>()`. Three sibling files, two idioms, no gate (`noUnusedLocals` absent from tsconfig, no ESLint). | `:120`; `TimelineCaret.vue:35`; `TimelineHoverPreview.vue:32` | find a `props.` read in either script block. |
| m-2 | Only glass-ui import site in the demo that takes the **root barrel** for `Tooltip*`. Five of six take the subpath — including its own parent one directory up (`KeyframeTimeline.vue:172`). The barrel is 73 subpaths wide, and this file sits inside a `defineAsyncComponent` chunk (`index.ts:6`, `ChannelControls.vue:253`) whose whole purpose is to keep the Monaco-bearing timeline out of the umbrella. | `:113` vs `KeyframeTimeline.vue:172`, `TransportDock.vue:246`, `ChannelOptions.vue:422`, `EditorShell.vue:125`, `PlaybackRibbon.vue:94` | `sideEffects: ["*.css"]` means the JS *is* shakable — **UNPROVEN-NEEDS-BUILD:** inspect the gh-pages timeline chunk; if its glass-ui footprint equals the subpath-only cost, only the house-idiom half survives. |
| m-3 | Hand-rolled affine remap where the module already imported on the adjacent line exports it. `percentToPosition(pct) = (pct − pan) · zoom` is exactly `scale(pct, pan, pan + 100/zoom, 0, 100)`. | `useZoomPan.ts:9–15`; `@mkbabb/value.js/dist/subpaths/math.d.ts`: `export declare function scale(value, fromMin, fromMax, toMin?, toMax?): number` | show the two are not algebraically identical over the window, or that `scale` is unreachable from the `/math` subpath — it is exported from it. |
| m-4 | Two clamp idioms in one 110-line file, with `clamp` imported at `:3`: `clamp(zoomLevel*factor, 1, 10)` at `:51` vs `Math.max(1, Math.min(10, …))` at `:86–89`. | `useZoomPan.ts:3, 51, 86–89` | show the two differ in NaN handling in a way the author relied on — `clamp` is a plain min/max composition. |
| m-5 | `percentToPosition(tick)` is evaluated **three times per tick per render** — once at `:41`, twice inside the ternary at `:46`. At `zoomLevel ≥ 8` the tick step is 1 (`useZoomPan.ts:25`) ⇒ up to ~102 ticks ⇒ ~306 calls, and the whole track re-renders on every `pointermove` during a scrub. | `:41, :46`; `useZoomPan.ts:23–40` | hoist to a `computed` keyed on `(pan, zoom)` and measure no change — the arithmetic is cheap, so the claim is about churn, not cost. |
| m-6 | Two `v-for`s over the same `sortedKeyframes` (`:62`, `:98`) emitting 2N absolutely-positioned nodes plus N Tooltip roots. Markers and carets are the same datum rendered twice with independent geometry calls. | `:62, :98` | show the two loops need different lifecycles — both key on `kf.id` and both consume `percentToPosition(kf.percent)`. |
| m-7 | `getGhostStyle` hardcodes **4** properties (`background-color`, `opacity`, `transform`, `border-radius`) against `DEFAULT_CAPTURE_PROPERTIES`' **17**. A keyframe animating only `filter`, `box-shadow`, `color`, `width`… yields `{}` ⇒ `TimelineHoverPreview.vue:13`'s `v-else-if` renders nothing. Two literal lists, no shared source, guaranteed to drift. | `:151–158`; `timelineTypes.ts:20–38`; `TimelineHoverPreview.vue:13` | show the four are the only *previewable* properties — `filter` and `box-shadow` are directly renderable on the ghost box. |
| m-8 | `transform: \`scale(0.3) ${vars["transform"]}\`` composes without validating. `transform: none` ⇒ `scale(0.3) none` ⇒ invalid ⇒ the **whole** declaration is dropped and the ghost renders unscaled, overflowing the `max-w-56` tooltip. Reachable: `snapshotCapture.ts:18` filters `"none"`, but `onKeyframeCSSChange` (`KeyframeTimeline.vue:246–265`) writes whatever the user types with zero validation. | `:155`; `snapshotCapture.ts:18`; `KeyframeTimeline.vue:246–265` | show the inline editor rejects `none` — it does not; it only splits on `:` and strips `;`. |
| m-9 | `getPercentFromPointer` returns the **in-band sentinel `0`** on a null ref. `0` is a valid percent, so a failure scrubs the playhead to the start rather than no-opping. Currently unreachable (all three callers are bound *on* `trackEl`), which is exactly what makes it a latent trap for the next caller. | `:160–166` | make it reachable and observe a no-op — it will emit `update:scrubT` with `0`. |
| m-10 | Composable contract disagreement: `useZoomPan(trackEl: Ref<HTMLElement \| null>)` admits null, then `onWheel` asserts `trackEl.value!`. The signature promises a nullable ref the body refuses to handle. | `useZoomPan.ts:5` vs `:46` | narrow the parameter to a non-null ref and observe no call-site breaks — `TimelineTrack.vue:136`'s `useTemplateRef` is nullable, so it would break, proving the mismatch is real. |
| m-11 | Dead condition. `:182` re-tests `!draggingKeyframeId.value`, already guaranteed by the early return at `:175–179`. | `:175–186` | find a path reaching `:182` with `draggingKeyframeId` truthy — the `return` at `:178` forbids it. |
| m-12 | `onTrackPointerDown` never checks `event.button` / `event.isPrimary`. Right-click and middle-click scrub the playhead and take pointer capture before the context menu opens. | `:168–172` | add `if (event.button !== 0) return` and observe scrub unchanged on right-click. |
| m-13 | `setPointerCapture` is called on **`event.target`**, not on `trackEl.value` (`:171`, `:195`). Capture therefore lands on whichever descendant was hit — a `v-for`-managed tick div (`:37–49`, keyed by tick **value**, so it unmounts whenever the step changes) or a caret label (`TimelineCaret.vue:6`, `v-if`-swapped on edit). If the capture element unmounts mid-gesture the implicit release drops the terminating `pointerup`; `onTrackPointerUp` never runs; `draggingKeyframeId` stays latched; the next button-less `pointermove` over the track takes the `:175` branch and moves the keyframe with no button held. | `:171, :195, :37–49, :175–179`; `TimelineCaret.vue:7` | capture on `trackEl.value` (which never unmounts while handlers are bound) and the whole class disappears. Low frequency — the tick set only changes at a zoom threshold — which is why MINOR, not MAJOR. |
| m-14 | `draggingKeyframeId` is never reconciled against `sortedKeyframes`. Delete or undo-away the dragged keyframe mid-drag and the id dangles; `moveKeyframe` then silently no-ops (`useTimelineOps.ts:57` `find` ⇒ undefined) with no state reset until a `pointerup` lands on the track. | `:137, :175–178`; `useTimelineOps.ts:56–63` | add a watcher clearing the id when absent from the list and observe no behavioural change — there is none today. |
| m-15 | Colocation. `TimelineCaret.vue` sits one directory **above** its sole consumer (`grep -rn TimelineCaret demo` → 2 hits, both in `TimelineTrack.vue`), imported as `../TimelineCaret.vue`. The cluster's 5 SFCs split with no principle across `timeline/` and `timeline/components/` — a path with a redundant `components/` segment already nested inside `demo/components/`. | `:116`; `timeline/` listing | name a second consumer of `TimelineCaret`, or a rule that puts `TimelineCaret` and `CSSPasteDialog` at the root while `TimelineTrack` and `TimelineHoverPreview` go one level down. |
| m-16 | Keyboard users never see the real preview. `diamondHover` fires only on `@mouseenter` (`:83`), but reka opens the tooltip on **focus** too — and the marker is deliberately focusable (`tabindex="0"`, `:79`). A keyboard user tabs to the diamond, the tooltip opens, `previewCache[kf.id]` was never populated, so `TimelineHoverPreview` always falls through to the ghost branch. A parity gap in a component that otherwise invested heavily in keyboard access (see S-5). | `:83` vs `:79`; `KeyframeTimeline.vue:220` | wire `@focus` to the same emit and observe the html2canvas preview appear under keyboard focus. |
| m-17 | Reaches around the design system's spacing contract: `class="p-2 max-w-56"` on `TooltipContent` overrides glass-ui's designed `px-(--overlay-pad-inline) py-(--overlay-pad-block)` rhythm (where `--overlay-pad-block` is derived as `calc(var(--overlay-pad-inline)*1.272)` — an intentional optical ratio). | `:86`; `glass-ui/dist/tooltip-OxciiZm6.js` TooltipContent class string | show `p-2` reproduces the ratio — it sets both axes to `0.5rem`, ratio 1.0. |
| m-18 | Identity round-trips presented as unit conversions: `${(panOffset / 100) * 100}%` and `${(100 / zoomLevel / 100) * 100}%` (`:12–13`). Both `/100*100` pairs cancel. The arithmetic is *correct* — `panOffset` really is already in percent (`useZoomPan.ts:7`) — but it reads as a unit conversion that isn't one, inviting a "fix" in either direction. | `:12–13`; `useZoomPan.ts:7` | show a unit system in which the division is meaningful — `panOffset` is documented as percent at its declaration. |

---

## INFO

| # | claim | provenance | falsifier |
|---|---|---|---|
| i-1 | Matched magic numbers across two languages with no shared token: tick labels sit at `-top-5` (= 1.25rem above the rail) and the scoped rule reserves exactly `margin-top: 1.25rem`. Correct today, and silently broken by editing either half. | `:45` vs `:219` | introduce a token and observe no visual change — which is the point. |
| i-2 | The 24px hit pads overlap for keyframes closer than ~3% at zoom 1 on an 800px track. Overlap resolution is DOM order + `z-controls`, so the *later* keyframe in `sortedKeyframes` wins and the earlier one becomes unclickable in the overlap band. Inherent to a fixed-size pad on a continuous rail; zooming is the escape hatch, which is presumably why zoom exists. | `:233–241`, `:62` | measure a hit at the earlier marker's centre while a later marker is within 24px — the later one is painted last at equal z-index. |
| i-3 | Indentation break at `useZoomPan.ts:51` (`const newZoom` at 8 spaces inside a 12-space block) — the fingerprint of a hand-patch that no formatter has since visited. Consistent with M-5: nothing in this repo formats or lints the demo. | `useZoomPan.ts:50–52` | run the repo's formatter — there isn't one configured. |

---

## SUPERLATIVES

L-18 runs both ways; each of these is held to the same falsifier discipline as the defects.

### S-1 · `overflow-x-clip overflow-y-visible` — the one mixed overflow pair CSS refuses to coerce

`:24`

```
.overflow-x-clip    { overflow-x: clip; }
.overflow-y-visible { overflow-y: visible; }
```
(compiler output, verified)

CSS Overflow 3's computed-value rule coerces mixed overflow: *if one axis is `visible`/`clip` and the other is neither, `visible` computes to `auto` and `clip` computes to `hidden`.* Here **both** values are in `{visible, clip}`, so **no coercion applies** — this is the only pairing that survives intact. The component needs exactly that: zoomed content must clip horizontally (markers at pan-offscreen percents), while the tick labels at `-top-5` (`:45`) must escape vertically. Reaching for the reflexive `overflow-hidden` would have decapitated every tick label; `overflow-x-hidden` would have silently forced `overflow-y` to `auto` and produced a scrollbar. This is a precise, non-obvious cascade fact used correctly.

**Falsifier for the praise.** Show that `overflow-x: clip; overflow-y: visible` *is* coerced (it is not, per the rule above), or that the tick labels don't need vertical escape (`-top-5` puts them entirely outside the box), or that no content ever overflows horizontally (`percentToPosition` is unbounded by construction: `(pct − pan) · zoom`, `useZoomPan.ts:9–11`).

### S-2 · The `::before` hit pad — WCAG 2.5.8 met without moving a visible pixel

`:229–241`

```css
.keyframe-marker::before {
    content: ""; position: absolute; top: 50%; left: 50%;
    width: 24px; height: 24px;
    transform: translate(-50%, -50%) rotate(-45deg);
}
```

The collapsed diamond is `w-4 h-4` = 16px, rotated 45° ⇒ a 22.6px diagonal bounding box, under the 24×24 minimum of WCAG 2.2 SC 2.5.8. The pad restores it **without** enlarging the mark. The counter-rotation is the part worth naming: Tailwind v4 sets `rotate: 45deg` as an independent property applied *before* `transform` in the transform pipeline, so the pseudo's own `rotate(-45deg)` cancels it and the pad is an axis-aligned 24×24 square — not a 24px *diamond*, whose axis-aligned inscribed area would have been only ~17px. The comment at `:229–232` states exactly this reasoning, and the reasoning checks out against the compiler output in M-2. Pseudo-element hit tests attribute to the originating element, so the pointer handlers at `:81–83` and the `tabindex` at `:79` need no changes.

**Falsifier for the praise.** Show the pad is clipped (the marker sets no `overflow`; its ancestor clips only x, and only at the rail edges — see i-2's honest counterweight), or that pseudo-elements are not hit-testable (they are), or that the counter-rotation is a no-op (it is not — without it the pad's axis-aligned extent drops to ~17px).

### S-3 · `:key="kf.id"` over a *sorted computed* is what makes drag-past-neighbour work at all

`:62` / `:99` key both loops on `kf.id` while iterating `sortedKeyframes` — a `computed` that **re-sorts on every `percent` mutation** (`useTimeline.ts:33–35`). Dragging a keyframe past a neighbour therefore reorders the list *mid-gesture*. Because the key is the stable entity id and not the index or the percent, Vue's keyed diff **moves** the existing DOM node (`insertBefore`) rather than unmount/remount — the node is never disconnected, so the in-flight `setPointerCapture` from `:195` survives the reorder and the drag continues uninterrupted. An index key, or a percent key, would silently destroy the captured element at the crossing point and strand the drag. The caret loop uses `'caret-' + kf.id` (`:99`) to keep the two keyspaces disjoint under the same parent.

**Falsifier for the praise.** Show that `sortedKeyframes` doesn't reorder during a drag — `moveKeyframe` writes `kf.percent` (`useTimelineOps.ts:59`) and the computed sorts on `percent`; or show Vue recreates keyed nodes on reorder — it moves them.

### S-4 · `touch-none` + `.passive` — the correct half of the gesture posture

`:24` sets `touch-action: none`, which removes the browser's own pan/pinch on the element. That is *precisely* the precondition under which a touch listener never needs `preventDefault`, which is *precisely* the precondition for `.passive` (`:32–34`). The three-way pairing (CSS gesture suppression → no cancellation needed → passive listener → no scroll-blocking main-thread dependency) is correct and deliberate.

**Falsifier for the praise.** Show a path where `onTouchStart`/`onTouchMove`/`onTouchEnd` needs to cancel — none of the three calls `preventDefault` (`useZoomPan.ts:75–96`), and `touch-action: none` already suppresses the native gesture.
**Deliberately noted:** this superlative is the mirror of M-1. The same file reasons correctly about touch cancellation and then blanket-cancels wheel. Praising S-4 without naming that asymmetry would be dishonest.

### S-5 · The `role="slider"` keyboard template — a real keyboard equivalent for a drag-only affordance

`:74–79` + `:198–214` give a pointer-only drag handle a complete keyboard peer: `role="slider"`, live `aria-valuenow`, static `aria-valuemin/max`, a self-describing `aria-label` (`"Keyframe at N% — drag or arrow to move"`), `tabindex="0"`, arrows at ±1%, Shift for ±10%, Home/End to the rail ends, `preventDefault` called **only** on keys actually handled (`:210–211` — the early `return` precedes it, so Tab and every unhandled key still work), selection emitted alongside the move so the two surfaces stay in sync (`:212–213`), and — the part most implementations get wrong — **clamping delegated rather than duplicated**: `moveKeyframe` clamps at `useTimelineOps.ts:59`, and the doc comment at `:202` says so explicitly. The belt-and-braces `clamp(next, 0, 100)` at `:213` is defensible redundancy at an emit boundary, not a second source of truth.

**Falsifier for the praise.** Show `moveKeyframe` does *not* clamp (it does: `kf.percent = clamp(newPercent, 0, 100)`), or that `preventDefault` fires on unhandled keys (`if (next === null) return` at `:210` precedes it), or that the role lacks a required attribute (`aria-valuenow`, `aria-valuemin`, `aria-valuemax` all present).
**Bounded by** m-16: the *preview* half of the affordance is still mouse-only. The keyboard template is excellent; its coverage is not yet total.

---

## K · Candidate defects killed by their own falsifiers

Recorded so the next lane does not re-raise them.

- **KILLED — "`if (vars["opacity"])` drops `opacity: 0`."** `:154` tests a **string**. `getComputedStyle().opacity` returns `"0"`, a non-empty and therefore truthy string; `snapshotCapture.ts:18`'s `if (value && …)` passes it through for the same reason. Opacity 0 renders correctly. Not a defect.
- **KILLED — "the tooltip is clipped by the track's `overflow-x: clip`."** glass-ui's `TooltipContent` wraps its render in reka's `TooltipPortal` (`dist/tooltip-OxciiZm6.js`, `TooltipContent` setup returns `createBlock(TooltipPortal, …)`). The content teleports to `body` and escapes the clip entirely.
- **KILLED — "`Tooltip` will throw for want of a `TooltipProvider`."** `ChannelControls.vue:203` closes a `</TooltipProvider>` that wraps the timeline mount, and `App.vue:145` provides one at the root. The `Teleport` at `ChannelControls.vue:186` does not break it: Vue's provide/inject follows the *component* tree, not the DOM.
- **KILLED — "`--caret-offset` is undefined, so `top: calc(50% + var(--caret-offset))` is dropped."** Defined at `demo/styles/layout.css:139` inside the `:root` block opened at `:12`. Also killed the companion suspicion that `duration-fast` / `text-small` / `text-admin-label` / `z-controls` / `z-content` are phantom utilities — all five resolve through glass-ui's `@theme inline` block in `dist/styles/theme/bridges.css` (`--transition-duration-fast`, `--text-small`, `--text-admin-label`, `--z-index-controls`, `--z-index-content`), and `scale-on-hover` is a real `@utility` in `dist/styles/utilities/btn.css`.

---

## Corpus reconciliation

| corpus id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (glass-ui phantom dep, RED) | **Confirmed and sharpened → B-1.** New evidence: `npm ci` appears in all four workflows and `npm run gh-pages` follows it at `ci.yml:73`, converting F-1's "deduction, installs forbidden" into a lockfile-provable build-graph break with this file as a named unresolvable import site. |
| `lane-frontend.md` **S-3** (timeline cluster → glass-ui `/timeline`, AMBER, 666 lines, *evaluate not swap*) | **Endorsed, and the caveat is upheld by the tree.** The bespoke geometry S-3 flagged is `useZoomPan`'s zoom/pan affine map + `percentToPosition` — and M-2, M-3, M-6, M-7, m-13 are all defects *in exactly that hand-rolled surface*, which strengthens the replacement case. But S-5 (the `role="slider"` keyboard template) and S-2 (the WCAG hit pad) are genuine local assets that a mechanical swap onto `ContinuousMarkers` would forfeit. S-3's "evaluate, not mechanical swap" verdict is correct. |
| `lane-frontend.md` **§3.1** (21/73 subpath utilisation) | **Refined → m-2.** The utilisation figure understates the discipline problem: this file is the *sole* demo site importing `Tooltip*` from the root barrel while five siblings — including its own parent — use `/tooltip`. Subpath adoption is near-total; this is the outlier, not a systemic gap. |
| `lane-frontend.md` **§6.5** (PRM: `KeyframeTimeline.vue:94` "defers to glass-ui's `transitions.css` PRM block … unverified statically") | **Contradicted for this child, on new evidence.** `TimelineTrack` carries **no** PRM guard and its motion does not reach glass-ui's PRM block either — because, per M-2, its scoped `transition` shorthand *overrides* glass-ui's `scale-on-hover` transition. The delegation the census could not verify does not hold here: the component intercepts the primitive's motion and then fails to animate it at all. Ironically this yields PRM-safe behaviour by accident (nothing animates), which is not the same as honouring the preference — a PRM-respecting fix must restore the transition *and* bracket it. |
| `lane-frontend.md` **F-5 / §7.3–7.4** (back-compat shims, duplicate-name hazard) | **No counterpart here.** The timeline cluster has no re-export shims. Its colocation problem is different in kind → m-15. |
| `lane-frontend.md` **§7.2** (colocation idiom: 63 of 71 composables colocated) | **Partially contradicted → m-15.** The *composable* colocation is clean (`timeline/composables/`, 4 files). The *component* colocation is not: `TimelineCaret.vue` sits above its only consumer, and the cluster splits arbitrarily across two levels. |
| `lane-library.md` (parse seams) | **No overlap.** `TimelineTrack` imports nothing from the keyframes engine — see the note below. |

## Engine-consumption note

`TimelineTrack` imports **zero** engine symbols. Against the census's "68 engine-consuming files" (`lane-frontend.md §1`) that is not a gap but the correct boundary: the track is a pure presentational rail, and every engine touch (`rebuild`, `scrub`, `scrubAndCapture`, `importCSS`) is confined to `useTimelineBuild` behind `useTimeline`. The seam is clean in the direction that matters — the component cannot corrupt engine state except through the four typed emits at `:129–134`.

The one library-consumption *miss* is in the other direction and is m-3: the file imports `clamp` from `@mkbabb/value.js/math` at `:114` and then hand-rolls, one file away, the affine remap that the very same module exports as `scale(value, fromMin, fromMax, toMin, toMax)`. Reaching for one function from a module and re-implementing its neighbour is the specific shape of under-consumption worth naming.

---

## Provenance

Every line reference resolves against the working tree at `/Users/mkbabb/Programming/keyframes.js` (census HEAD `8281638c`). Every glass-ui claim is sourced from `node_modules/@mkbabb/glass-ui/dist/` — the copy already installed in the target, so no upgrade is presupposed. Every Tailwind claim is sourced from `node_modules/tailwindcss@4.3.0`'s own compiler, invoked in the session scratchpad against a synthetic class list; no repo file was written, mutated, or executed, no install was run, no dev server was started, and no browser tooling was used. Two claim-halves are flagged **UNPROVEN-NEEDS-LIVE** (B-1's CI colour; M-7's Chromium delta axis) and one **UNPROVEN-NEEDS-BUILD** (m-2's chunk footprint) for the SS-13 pass. The sole write performed by this lane is this file.
