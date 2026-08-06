claude-opus-5[1m]

# CHALLENGE · `TimelineTrack.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/components/TimelineTrack.vue` (246 lines, verified `wc -l`)
**Axis** how this component consumes keyframes.js (the library), glass-ui (the design system), and value.js (transitively) — subpath choices, shadow-component overlap (S-1..S-8), R1 reachability, props/emits contract quality, sibling integration seams.
**Mode** static, read-only. No installs, no dev server, no browser. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE`.
**Read whole** the target + every file it imports, transitively one hop past each: `useZoomPan.ts`, `TimelineCaret.vue`, `TimelineHoverPreview.vue`, `timelineTypes.ts`, `index.ts`, plus the parent `KeyframeTimeline.vue`, the sibling composables `useTimeline.ts` / `useTimelineOps.ts` / `useTimelineBuild.ts`, `utils/timelineEngine.ts`, the mount site `ChannelControls.vue`, the installed `@mkbabb/glass-ui@7.0.0` `./timeline` + `./tooltip` surfaces, `reka-ui/dist/Tooltip/TooltipTrigger.js`, `@mkbabb/value.js@4.0.0` exports map, `tsconfig.json`, `package.json`, `package-lock.json`, `.github/workflows/{ci,deploy-pages}.yml`.

**Prior** the component is DEFECTIVE until the tree proves otherwise. A false defect is worse than a missed one — every claim below carries its own falsifier and I dropped three candidates that did not survive theirs (§6).

---

## 0. Headline

| id | severity | claim | anchor |
|---|---|---|---|
| **C-1** | **BLOCKER** | Imports a package that is in neither `package.json` nor `package-lock.json`; the production deploy runs `npm ci` | `TimelineTrack.vue:113` |
| **C-2** | **BLOCKER** | The `update:scrubT` emit never reaches the keyframes.js engine — `scrub()` is exported by the composable and consumed by nobody | `TimelineTrack.vue:170,184` → `KeyframeTimeline.vue:83,194-210` |
| **C-3** | MAJOR | `@wheel.prevent` is unconditional while the handler acts only on ctrl/meta/shift — a scroll trap inside an `overflow-y-auto` pane | `TimelineTrack.vue:31` vs `useZoomPan.ts:43-62` |
| **C-4** | MAJOR | Pointer and touch handlers are both live on the same `touch-action:none` element with no multi-touch guard — pinch-to-zoom also drags the playhead | `TimelineTrack.vue:24,27,29,32-34` |
| **C-5** | MAJOR | The whole typed props/emits surface is verified by nothing — no `vue-tsc` exists in the repo, `npm run check` is bare `tsc`, CI runs only `check:lib` (`include: ["src/"]`) | `package.json` scripts; `tsconfig.lib.json:11` |
| **C-6** | MAJOR | Positions every moving element with `style.left`, contradicting the design system's own published rail contract ("NEVER `style.left`") | `TimelineTrack.vue:41,54,80`, `TimelineCaret.vue:4` vs `ScrubberTimeline.vue.d.ts` |
| **C-7** | MINOR | Root-barrel `@mkbabb/glass-ui` here, granular `/tooltip` in the parent — one cluster, two specifiers for the same three symbols | `TimelineTrack.vue:113` vs `KeyframeTimeline.vue:172` |
| **C-8** | MINOR | Preview capture is bound to `@mouseenter` alone while the tooltip it feeds also opens on focus and is touch-suppressed by reka | `TimelineTrack.vue:83` vs `TooltipTrigger.js` `handleFocus` / `handlePointerMove` |
| **C-9** | MINOR | `setPointerCapture` on `event.target` (an arbitrary descendant) rather than `currentTarget`; glass-ui's own scrubber uses `currentTarget` | `TimelineTrack.vue:171` |
| **C-10** | MINOR | Dead prop `keyframeId` + a redundant derivable `percent`/`position` pair across the caret seam | `TimelineTrack.vue:100-102`, `TimelineCaret.vue:35-40` |
| **C-11** | MINOR | The public prop type drags value.js's `KeyframeSelector` into the contract for a field the entire subtree never reads | `timelineTypes.ts:1,6` → `TimelineTrack.vue:121` |
| **C-12** | MINOR | The ≥24px hit pads of near-coincident keyframes overlap with no z-order or nudge; the 1% arrow step manufactures the collision | `TimelineTrack.vue:229-241,198-214` |
| **C-13** | MINOR | The zoom mini-bar is `v-if`-mounted, so the track jumps vertically the instant a zoom begins; its arithmetic is identity noise | `TimelineTrack.vue:5,12-13` |
| **C-14** | INFO | Zero keyframes.js consumption in the keyframes editor's own track — the inv-ζ counter-case | whole file |
| **C-16** | INFO | Authored CSS is passed unvalidated into inline styles while value.js's parser sits one import away | `TimelineTrack.vue:150-157` |

**Tally — defects 15 (BLOCKER 2 · MAJOR 4 · MINOR 7 · INFO 2) · superlatives 4.**
(`C-15` is not a defect: it is the corpus contradiction, filed at §4.)

---

## 1. BLOCKERS

### C-1 — the phantom dependency, instantiated here (BLOCKER)

`TimelineTrack.vue:113`:

```ts
import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui";
```

First-hand probes (not inherited):

```
$ grep -c 'glass-ui' package-lock.json                          → 0
$ node -e '…deps["@mkbabb/glass-ui"] || devDeps[…]'             → false
$ node -e 'require("./node_modules/@mkbabb/glass-ui/package.json").version'  → 7.0.0
$ cat .npmrc                                                     → legacy-peer-deps=true
```

This confirms hitherto **F-1** (`lane-frontend.md:15,54`) and sharpens it with the consequence F-1 left as a deduction. The **production deploy path** runs a clean install:

```
.github/workflows/deploy-pages.yml:70-71
    - name: npm ci (demo consumer graph)
      run: npm ci
.github/workflows/ci.yml (demo job)  — same two lines, then `npm run gh-pages`
```

`npm ci` reconstructs `node_modules` strictly from the lockfile. With zero glass-ui rows there, the deploy tree has no `@mkbabb/glass-ui`, and the very first module the timeline chunk resolves — this line — fails. The working tree survives only because a `Jul 16 05:17` install predates whatever removed the declaration.

That this file uses the **root barrel** (C-7) makes it a slightly worse instance than its siblings: the root specifier is the one an `exports`-map fallback or a path alias would be least likely to rescue.

*Falsifier* — any of: a `@mkbabb/glass-ui` row appearing in `package-lock.json`; a `resolve.alias` entry for `@mkbabb/glass-ui` in `vite.config.ts` (I read lines 25-59: `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets` — no glass-ui); a workspaces/file: link; or a green `npm ci && npm run gh-pages` run on a clean checkout. Any one kills C-1.

### C-2 — the scrub emit is severed from the engine (BLOCKER)

TimelineTrack emits a normalized 0..1 scrub position from two sites:

```
TimelineTrack.vue:170   emit("update:scrubT", percent / 100);   // pointerdown
TimelineTrack.vue:184   emit("update:scrubT", percent / 100);   // pointermove, buttons>0
```

The parent binds it to a bare assignment:

```
KeyframeTimeline.vue:83    @update:scrub-t="(t) => (scrubT = t)"
```

`scrubT` is a plain `ref(0)` created at `useTimeline.ts:30`. The **only** code in the tree that pushes `scrubT` into the keyframes.js animation object is `useTimelineBuild.ts:53-61`:

```ts
const scrub = (t: number) => {
    scrubT.value = clamp(t, 0, 1);
    if (animation.value) {
        animation.value.paused = true;
        animation.value.t = scrubT.value * animation.value.options.duration;
        animation.value.interpFrames(animation.value.t, true);   // ← the ONLY interpFrames call-site
    }
};
```

`scrub` is returned by `useTimelineBuild` (`:193`) and re-returned by `useTimeline` (`:117`). **`KeyframeTimeline.vue:194-210` destructures 15 members and `scrub` is not one of them** (`state, sortedKeyframes, scrubT, snapshot, removeKeyframe, moveKeyframe, rebuild, scrubAndCapture, exportCSS, importCSS, clear, undo, redo, canUndo, canRedo`). It is not in `defineExpose` either (`:296-307`). And there is no watcher — a repo-wide grep for `scrubT` returns exactly nine sites, all of which I read: the `ref` declaration, three composable parameter passes, `useTimelineOps.ts:28`, `KeyframeTimeline.vue:78,83,197`, and `TimelineTrack.vue:54,122,130,170,184`. **No `watch(scrubT, …)` exists.**

Consequence: dragging the playhead moves a 2px `bg-primary` bar and updates a number. The animated target never advances. The engine demonstrably *can* be driven — `scrubAndCapture` calls `scrub(percent/100)`, awaits a frame, screenshots, then calls `scrub(prevT)` (`useTimelineBuild.ts:98-116`) — so the seam exists, is exercised on diamond-hover, and is simply not wired to the component's headline interaction.

This is the CONSUMPTION axis's sharpest finding: the demo's flagship keyframes instrument does not consume keyframes.js from its own playhead.

*Falsifier* — a `watch(scrubT)` anywhere; a `scrub` destructure/call reachable from `KeyframeTimeline` or `ChannelControls`; or a live drag showing the target animating. *Honest counterweight:* `scrubT` is **not** dead — `useTimelineOps.ts:28` reads `scrubT.value * 100` as `snapshot()`'s default capture percent, so the playhead retains a real authoring role. The claim is precisely "the playhead does not preview", not "the playhead does nothing".

---

## 2. MAJORS

### C-3 — the wheel scroll trap (MAJOR)

```
TimelineTrack.vue:31    @wheel.prevent="onWheel"
```

Vue's `.prevent` calls `preventDefault()` unconditionally, before the handler. The handler acts on **two** gestures only:

```
useZoomPan.ts:44    if (event.ctrlKey || event.metaKey) { … }        // zoom
useZoomPan.ts:57    else if (event.shiftKey && zoomLevel.value > 1) { … }  // pan
                    // (no else — a plain wheel does nothing and returns)
```

So a plain vertical wheel over the track is cancelled and does nothing. The track is mounted inside a scroller:

```
ChannelControls.vue:85    <div ref="tabsContentEl" class="flex-1 min-h-0 overflow-y-auto flex flex-col pb-1">
ChannelControls.vue:192   <KeyframeTimeline … :expanded="storedControls.isTimelineExpanded" …>
```

The collapsed track is `h-12` (48px) and full pane width; the expanded one `h-32` (128px). Scrolling the controls pane stalls whenever the cursor crosses that band. The `wheel` listener is on an ordinary element, so it is **not** passive-by-default (that default applies to window/document/body), and `preventDefault()` takes effect.

Correct shape: `@wheel="onWheel"` with `event.preventDefault()` moved inside the two branches that consume the gesture.

*Falsifier* — a passive registration (`.passive` is absent; Vue would warn on `.prevent.passive` anyway); a third branch in `onWheel` I misread; or a live trace showing the pane scrolling normally with the cursor over the track. The jank/UX magnitude is `UNPROVEN-NEEDS-LIVE`; the missing conditional is statically proven.

### C-4 — pointer and touch gestures collide (MAJOR)

The same element carries the full pointer set *and* the pinch set, with `touch-action: none`:

```
TimelineTrack.vue:24    … touch-none
TimelineTrack.vue:27-30 @pointerdown / @pointermove / @pointerup / @pointercancel
TimelineTrack.vue:32-34 @touchstart.passive / @touchmove.passive / @touchend.passive
```

`touch-action: none` means the UA never claims the gesture, so pointer events fire for **every** contact. Trace a pinch: finger 1 down → `pointerdown` → `emit("update:scrubT", x1/100)`; finger 2 down → a second `pointerdown` → the playhead jumps to `x2`; `touchstart` records `initialPinchDist` (`useZoomPan.ts:75-80`); the pinch moves → `pointermove` fires per finger with `event.buttons === 1` (touch contact) → `TimelineTrack.vue:182` scrubs to whichever finger moved last, while `onTouchMove` simultaneously changes `zoomLevel`.

There is **no** guard anywhere in the chain: no `event.isPrimary` check, no active-pointer count, no `pointerType` discrimination. I read all six handlers plus all four `useZoomPan` touch handlers.

Contrast the design system's own rail: `ScrubberTimeline` gates every move behind an explicit `dragging` flag set only in `pointerdown` (`dist/timeline.js`, functions `N`/`P`/`F`), and never mixes a touch-event channel into the same element.

*Falsifier* — a guard I missed; a UA that suppresses pointer events during multi-touch under `touch-action:none` (the spec says otherwise); or a live two-finger trace showing the playhead stationary. The *existence of the collision* is static; the *visible severity* is `UNPROVEN-NEEDS-LIVE`.

### C-5 — the props/emits contract is typed but unverified (MAJOR)

The contract is well-shaped on its face (`TimelineTrack.vue:120-135`): six typed props, four typed emits, `noUncheckedIndexedAccess: true` and `exactOptionalPropertyTypes: true` in `tsconfig.json:8-9`. None of it is checked.

```
package.json  "check":     "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
package.json  "check:lib": "tsc --noEmit -p tsconfig.lib.json"
tsconfig.lib.json:11       "include": ["src/"]
```

`tsc` does not read `.vue` files — SFC `<script setup>` blocks and every template expression are invisible to it. `vue-tsc` is not a dependency (`node -e` on both dep maps → `undefined`) and is invoked by no script and no workflow (`grep -rn "vue-tsc" package.json .github/ scripts/` → nothing; the only lockfile hits are a peer-dep range of another package). CI (`ci.yml:41-42`, `release.yml:42-43`) runs **`check:lib` only** — `src/` — so even the bare-`tsc` demo pass is not gated.

Therefore: every prop binding at `KeyframeTimeline.vue:77-87` and `TimelineTrack.vue:88-105`, every emit payload, and every `previewCache[kf.id]`-into-`previewSrc?: string` assignment (a real `exactOptionalPropertyTypes` question) is unenforced. The contract is documentation.

The repo already knows: `docs/tranches/S/audit/pass1/CRITIQUE.json:95` carries a "bare-tsc/no-vue-tsc caveat clause". So this is corroborated-but-unremediated, not a discovery — I file it because the CONSUMPTION axis is exactly "props/emits contract quality", and an unenforced contract has no quality, only intent.

*Falsifier* — a `vue-tsc` invocation in any script, workflow, or git hook; or a Volar/`vue-tsc` CI step I did not enumerate.

### C-6 — `style.left` contradicts the design system's published rail contract (MAJOR)

Every moving element is positioned by `left`:

```
TimelineTrack.vue:41    :style="{ left: `${percentToPosition(tick)}%` }"          // ticks
TimelineTrack.vue:54    :style="{ left: `${percentToPosition(scrubT * 100)}%` }"  // playhead
TimelineTrack.vue:80    :style="{ left: `${percentToPosition(kf.percent)}%` }"    // markers
TimelineCaret.vue:4     :style="{ left: `${position}%`, … }"                      // carets
```

glass-ui 7.0.0's own rail primitive documents this as the wrong channel, in its shipped type file:

> `ScrubberTimeline.vue.d.ts` — "travel rides a `useSpring`/SpringProgress position written to `transform: translateX()` (**NEVER `style.left`** — Safari composites transform, not left)"

and implements it: `dist/timeline.js` `ScrubberTimeline` sets `transform: translateX(calc(…cqw - 50%)) scale(…)`.

During a marker drag TimelineTrack rewrites `left` on the dragged marker + its caret every `pointermove`, and every zoom/pan wheel tick rewrites `left` on **all** ticks + all markers + all carets — a layout pass per frame per element, on the exact axis the design system singles out as non-composited on Safari.

*Falsifier* — a live paint/layout profile showing no layout thrash (the perf magnitude is `UNPROVEN-NEEDS-LIVE`); or evidence that the glass-ui docblock is stale. The **divergence from the published contract** is statically proven and is the load-bearing half of the claim.

---

## 3. MINORS · INFO

### C-7 — one cluster, two glass-ui specifiers (MINOR)

```
TimelineTrack.vue:113      import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui";
KeyframeTimeline.vue:172   import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui/tooltip";
```

Identical three symbols, parent and child, different specifiers. Both resolve (`dist/glass-ui.js` re-exports `Ct as Tooltip, Tt as TooltipContent, wt as TooltipTrigger`; `./tooltip` → `dist/tooltip.js`, 161 bytes). Cost measured, not assumed: root barrel `dist/glass-ui.js` = 23 938 B and pulls ~40 chunk modules into the module graph vs the subpath's 161 B and one. `package.json` declares `sideEffects: ["*.css"]`, so Rollup **is** free to tree-shake the JS — which is why this is MINOR and not MAJOR. What remains is real but bounded: a larger parse/resolve graph for a lazily-loaded chunk (`timeline/index.ts:6` `defineAsyncComponent`), and a house-style split inside one four-file cluster. The repo is not consistent either way (§3.1 of `lane-frontend.md` counts 31 root-barrel vs 6 `/tooltip` sites), so this is a cluster-local inconsistency, not a repo-wide law violation.

*Falsifier* — a build-output comparison showing byte-identical timeline chunks for the two specifiers would reduce this to pure style (and it may well; that is why it is MINOR).

### C-8 — the hover preview is mouse-only, and the tooltip is not (MINOR)

```
TimelineTrack.vue:83    @mouseenter="emit('diamondHover', kf)"
```

`diamondHover` is the sole producer of `previewCache` (`KeyframeTimeline.vue:220-233`). But the tooltip that *displays* that cache opens on more than hover — reka's trigger (`node_modules/reka-ui/dist/Tooltip/TooltipTrigger.js`):

- `handleFocus(event)` → `rootContext.onOpen()` — the tooltip opens when a user tabs to the diamond (which is `tabindex="0"`, `TimelineTrack.vue:78`);
- `handlePointerMove(event) { if (event.pointerType === "touch") return; … }` — touch never opens it from pointer at all.

So keyboard users get the tooltip with `previewSrc === undefined` forever, and touch users get neither. Both fall to the ghost-box branch (`TimelineHoverPreview.vue:12-16`), which is a real fallback — hence MINOR, not MAJOR. But the component's own docblock claims parity ("drag OR arrow-key the keyframe", `:56-59`), and the fix is one attribute: `@focus="emit('diamondHover', kf)"`.

*Falsifier* — another writer to `previewCache` (grep: only `KeyframeTimeline.vue:226`); or a reka version whose trigger emits `mouseenter` on focus.

### C-9 — pointer capture on the wrong node (MINOR)

```
TimelineTrack.vue:171   (event.target as Element).setPointerCapture(event.pointerId);   // track pointerdown
TimelineTrack.vue:195   (event.target as Element).setPointerCapture(event.pointerId);   // marker pointerdown
```

At `:171` `event.target` is whatever descendant was hit — a tick `<div>`, a tick `<span>` label, a caret label — not the track. Those tick nodes are `v-for`-keyed by tick value (`:38-39`) and are destroyed/recreated whenever `visibleTicks` recomputes (`useZoomPan.ts:23-40`), which happens on every zoom step; capture on a removed node is lost silently. `currentTarget` is the stable node and is what the design system's own scrubber uses (`dist/timeline.js`: `e.currentTarget.setPointerCapture(e.pointerId)`). The `as Element` cast is the tell — `currentTarget` would not have needed one.

*Falsifier* — a live trace showing capture surviving a mid-drag tick re-render.

### C-10 — dead prop + redundant derived prop across the caret seam (MINOR)

```
TimelineCaret.vue:35-40   const props = defineProps<{ keyframeId: string; percent: number; position: number; isSelected: boolean }>();
TimelineTrack.vue:100-102 :keyframe-id="kf.id"  :percent="kf.percent"  :position="percentToPosition(kf.percent)"
```

`keyframeId` is referenced **nowhere** in `TimelineCaret.vue` — a repo-wide grep for `keyframeId` returns exactly one line, its own declaration. The `const props =` binding is itself unused (the template auto-unwraps), as it is in `TimelineTrack.vue:120`. Neither is caught, per C-5.

`position` is `percentToPosition(percent)` — pure derivation the child cannot perform because the zoom/pan transform lives in a composable instantiated in the parent (`TimelineTrack.vue:137-149`) and is neither provided nor passed. Passing both a value and its transform lets them drift and is the symptom, not the disease: the transform wants `provide`/`inject` (or the caret wants to be a slot of the rail).

*Falsifier* — a use of `keyframeId` in a compiled/generated caret variant I did not read.

### C-11 — the prop type over-reaches into value.js (MINOR)

```
timelineTypes.ts:1   import type { KeyframeSelector } from "@mkbabb/value.js/css";
timelineTypes.ts:6   selector: KeyframeSelector;
TimelineTrack.vue:121   sortedKeyframes: TimelineKeyframe[];
```

The track subtree reads exactly three fields: `kf.id`, `kf.percent`, `kf.vars` (`TimelineTrack.vue:63,72-80,90,100-102,152-156`; `TimelineHoverPreview.vue:3,21,24`; and the parent's `onDiamondHover` uses `kf.id`/`kf.percent`). `selector`, `easing`, and `label` are never touched. Yet the public prop type transitively depends on a value.js published type — so a value.js `KeyframeSelector` shape change is a breaking change to this component's props for a field it does not use. A structural `Pick<TimelineKeyframe, "id" | "percent" | "vars">` (or a local `TrackKeyframe`) severs it at zero cost.

*Falsifier* — any read of `selector`/`easing`/`label` inside `TimelineTrack.vue`, `TimelineHoverPreview.vue`, or `TimelineCaret.vue`.

### C-12 — the 24px hit pads collide (MINOR)

The `::before` pad (`:229-241`, and see SUP-2 — it is genuinely good) enlarges each marker's hit area from a 16px diamond to a 24×24 axis-aligned square. Two keyframes 2% apart on a ~600px rail are ~12px apart: their pads overlap, and the later one in `sortedKeyframes` wins on every pointer event because nothing z-orders, offsets, or fans them. `onMarkerKeydown` steps by exactly 1% (`:204`), so the editor's own keyboard affordance manufactures the collision. WCAG 2.2 SC 2.5.8's spacing exception is not met either.

*Falsifier* — a live hit test showing both markers independently selectable at ≤2% separation; or a `pointer-events` / stacking rule I missed in the scoped block (I read all three rules).

### C-13 — the zoom bar shifts the layout it measures (MINOR)

```
TimelineTrack.vue:5     v-if="zoomLevel > 1"
TimelineTrack.vue:12-13 left: `${(panOffset / 100) * 100}%`, width: `${(100 / zoomLevel / 100) * 100}%`
```

The mini range bar mounts the instant zoom exceeds 1 inside a `flex flex-col gap-3` (`:2`), so the track — the element the user is mid-gesture on — is pushed down by the bar's height plus the gap at the first wheel tick. Nothing reserves the row.

The arithmetic is also identity noise: `(panOffset/100)*100 === panOffset` and `(100/zoomLevel/100)*100 === 100/zoomLevel`. Harmless, but it hides that the invariant `panOffset + 100/zoomLevel ≤ 100` (guaranteed by `clampPan`, `useZoomPan.ts:17-20`) is what makes the bar correct.

*Falsifier* — a reserved-height rule on the wrapper (there is none: `:2` is the whole wrapper).

### C-14 — zero keyframes.js consumption (INFO)

`TimelineTrack.vue:112-118` — the complete import list — contains no `@mkbabb/keyframes.js`, no `@kf-engine`, no `@src`. The keyframes editor's own track animates with CSS transitions (`:223-227`). Set against `TypingDots.vue:1-9`, which exists specifically to dogfood the engine ("the inv-ζ seam — the demo's signature animation IS the library, not pure CSS"), and against `lane-frontend.md:35-37` (68 of the demo's files import the library under test), the flagship instrument is on the wrong side of the seam.

I file this INFO, not as a defect, because the honest counter holds: marker/border micro-transitions are chrome, and routing them through the engine would be contrivance (`feedback_kiss_no_contrivance`). The **playhead** is the element that genuinely wants engine drive — and that is C-2, filed there.

*Falsifier* — an engine import reached via a global/provide I did not trace (I read every import in the file and in all four of its local imports).

### C-16 — authored CSS reaches the DOM unvalidated (INFO)

```ts
TimelineTrack.vue:150-157
const getGhostStyle = (vars: Record<string, string>): Record<string, string> => {
    …
    if (vars["transform"]) style.transform = `scale(0.3) ${vars["transform"]}`;
    …
};
```

Arbitrary authored text — typed by the user into the inline `CSSCodeEditor` (`KeyframeTimeline.vue:123-127,246-265`, whose parser is a `split("\n")` + `indexOf(":")` loop) — is string-concatenated into a `transform` value and object-bound as a style. **This is not an injection vector**: Vue sets `:style` object entries through `el.style[prop] = value`, and the CSS parser drops an invalid declaration whole; a `;` cannot escape the property. So the failure mode is silent, not dangerous — an invalid `transform` makes the ghost preview quietly wrong with no user feedback, in a repo whose declared dependency (`@mkbabb/value.js@4.0.0`, `package.json:69`) publishes exactly the parser that would catch it (`parseCssScalar` is already used this way at `KeyframesEditor.vue:186`).

*Falsifier* — a validation pass upstream of `getGhostStyle` (there is none: `onKeyframeCSSChange` does no value validation, `KeyframeTimeline.vue:251-263`).

---

## 4. Corpus reconciliation — where the tree contradicts the lanes

### C-15 — **S-3's glass-ui counterpart mapping is wrong on reachability and on data model** (CONTRADICTION)

`lane-frontend.md:325-348` (S-3) maps:

> | `timeline/components/TimelineTrack.vue` | 246 | `ContinuousRail` + `ContinuousMarkers` |

and asserts

> "percent-positioning arithmetic (`TimelineCaret.vue:4` `left: ${position}%`) that `dist/components/timeline/geometry.d.ts` **exists to own**."

Both halves fail against the installed package.

**(a) Neither named counterpart is reachable.** `dist/timeline.js` ends with exactly one export:

```
export { me as GlassTimeline };
```

`ContinuousRail`, `ContinuousMarkers`, `ContinuousTimeline`, `SegmentedTimeline`, `ScrubberTimeline`, and every `geometry.ts` function are bundled into that file as **module-private** bindings. `dist/timeline.d.ts` is `export * from "./components/timeline"`, and `components/timeline/index.d.ts` exports `GlassTimeline` plus three types — nothing else. `ContinuousRail.vue.d.ts`'s own docblock says it outright: *"DECK-PRIVATE child of `<ContinuousTimeline>` (not a public export)."* And the `exports` map admits no deep path — its only wildcard is `"./fonts/*"` — so `@mkbabb/glass-ui/dist/components/timeline/ContinuousRail.vue` is blocked by Node/Vite resolution. **The `.d.ts` files on disk are misleading artifacts; S-3 read the filesystem, not the export surface.**

**(b) The data models are disjoint.** glass-ui's timeline family consumes `TimelineSegment[]` — `{ key, label, state: "pending"|"active"|"completed", progress?, gradient?, weight? }` (`types.d.ts`). `geometry.ts` computes `regionLeft`/`regionWidth`/`boundaryX` as **weight shares over a segment list** (`dist/timeline.js`, function `j`). That is a phase/progress ribbon. TimelineTrack's model is *point keyframes at arbitrary 0–100 percents, retimeable by drag, under a zoom/pan transform*. `useZoomPan.ts:9-15`'s `percentToPosition = (pct - panOffset) * zoomLevel` has no counterpart anywhere in `geometry.ts`. **S-3's "geometry.d.ts exists to own [it]" is not supported by the tree.**

**(c) The correct counterpart is `ScrubberTimeline`, it is reachable, and it is still blocked — for a different, better reason.** `<GlassTimeline variant="scrubber">` **is** exported, and its contract is a near-exact match for the *scrub half* of this component:

| glass-ui `ScrubberTimeline` | `TimelineTrack` |
|---|---|
| `modelValue?: number` (0..1) | `scrubT: number` (0..1) |
| `update:modelValue` | `update:scrubT` |
| `role="slider" tabindex="0"`, arrow/Home/End + shift-step | `:74-78`, `:198-214` |
| pointer-capture drag | `:168-172` |
| invisible `::before` touch halo | `:229-241` |

`TimelineTrack.vue:58` + `:199` name the provenance as **`SpringTarget`** — a *demo peer* — rather than the design-system primitive that already publishes the identical behaviour. That is the real S-3 finding at this file.

But the swap is blocked, and by something S-3 did not identify: **`ScrubberTimeline` renders no slots.** Reading its compiled render function (`dist/timeline.js`, component `ce`) there is no `renderSlot` call anywhere in it; `GlassTimeline` forwards `popoverContent`/`detail` only on the `continuous` branch. With no overlay slot, the primitive cannot host the diamond markers, the carets, the ticks, or the zoom/pan surface. **The bespoke rail is therefore partially justified**, and the correct remediation is a glass-ui feature request for an overlay slot on the scrubber variant — routed to the active glass-ui BH inbox per the standing relay law (`feedback-glassui-bhbi-relay`) — **not** a demo rewrite. S-3's verdict word ("evaluate, not a mechanical swap") survives; its *reason* and its *component mapping* do not.

*Falsifier* — an `exports` wildcard or a second entry point exposing `ContinuousRail`/`geometry`; a `renderSlot` in `ScrubberTimeline`'s render; or a glass-ui 7.x changelog entry adding either.

### F-1 — **confirmed, and escalated with its consequence** (see C-1). No contradiction.

### S-2 / S-4 / S-7 — **no overlap with this file.** No `@mkbabb/glass-ui/tabs` import, no scrubber fork, no copy button here. Recorded so the census is not double-counted.

### S-8 — **the inv-ζ principle S-8 protects is inverted here.** S-8 keeps `TypingDots` bespoke *because* it dogfoods the engine. TimelineTrack is bespoke and dogfoods nothing (C-14). Same axis, opposite sign.

---

## 5. Superlatives (L-18 runs both ways)

**SUP-1 · the overflow pair is exactly right, and it is the only pair that works.** `TimelineTrack.vue:24` — `overflow-x-clip overflow-y-visible`. Tick labels sit at `-top-5` (`:45`, above the box) and carets at `calc(50% + var(--caret-offset))` (`TimelineCaret.vue:4`, below it), while zoomed-out-of-range markers must be clipped horizontally. CSS Overflow 3 coerces `visible` to `auto` when the other axis is `scroll`/`auto`/`hidden`, and coerces `clip` to `hidden` when the other axis is neither `visible` nor `clip` — the `(clip, visible)` pair triggers **neither** rule. The obvious `overflow-x-hidden` would have silently turned `overflow-y` into `auto`, clipping the labels and adding a scrollbar. This is a precise, spec-level choice.
*Falsifier* — a computed-style read showing `overflow-y: auto` on the track in any shipping engine (`UNPROVEN-NEEDS-LIVE`); spec-provable otherwise.

**SUP-2 · the counter-rotated hit pad.** `:229-241` — a 24×24 `::before` with `transform: translate(-50%,-50%) rotate(-45deg)` cancelling the marker's `rotate-45`, so the pad is an axis-aligned 24px square rather than a 24px diamond (whose axis-aligned inscribed box would be ~17px — still short of WCAG 2.2 SC 2.5.8). It meets the target-size minimum for the 16px collapsed diamond without moving a visible pixel, and the comment explains exactly why the counter-rotation is there. Independently, glass-ui's own `ScrubberTimeline` arrives at the identical idiom — *"the 44px touch target is an invisible `::before` halo, decoupled from the visible bead"* — so the demo converged on the design system's published solution without being able to import it. That is the good kind of fork.
*Falsifier* — a live hit test failing 24×24 on an isolated marker.

**SUP-3 · value.js consumption is minimal, granular, and R1-clean.** Two facts and one negative result:
- `:114` `import { clamp } from "@mkbabb/value.js/math"` — the **granular** subpath (contrast C-7's root-barrel glass-ui import in the very next line), for a package that *is* properly declared (`package.json:69`, `@mkbabb/value.js@4.0.0`, and the sole `@mkbabb` row in the lockfile at `:611`).
- `timelineTypes.ts:1` is `import type` under `verbatimModuleSyntax: true` — erased at compile, so the type module carries **zero** value.js runtime.
- **The R1 class (`parseCssColor("oklch()")` shipping crash) is NOT reachable from this component.** TimelineTrack calls no value.js parse entry; its only value.js runtime symbol is `clamp`. The one path from here into value.js's color parser is `emit("moveKeyframe") → useTimelineOps.moveKeyframe (:56-63) → rebuild() → buildAnimationFromTimeline → CSSKeyframesAnimation.fromKeyframes → value.js`, and that path is wrapped:

```ts
useTimelineBuild.ts:40-50
try { const anim = await buildAnimationFromTimeline(…); animation.value = markRaw(anim); }
catch (e) { console.error("Failed to rebuild timeline animation:", e); animation.value = null; }
```

`rebuild` is `async` and the `await` is inside the `try`, so a rejected engine promise is caught. A naive "R1 is everywhere the demo touches CSS" reading would flag `getGhostStyle` (`:150-157`) — it does not parse, it assigns strings (see C-16). **The R1 crash class is contained at this seam.**
*Falsifier* — a synchronous value.js parse call on any path from a `TimelineTrack` emit that escapes that `try`; or a `rebuild` refactor moving the `await` out of it.

**SUP-4 · the emit units are normalized correctly and clamped at both ends.** `update:scrubT` carries 0..1 (`:170,184` — `percent / 100`) while `moveKeyframe` carries 0..100 (`:177,213`), which is exactly what each sink wants (`scrub` clamps 0..1, `useTimelineBuild.ts:54`; `useTimelineOps.moveKeyframe` clamps 0..100, `:59`). And both are clamped *before* emit as well as after receipt — `getPercentFromPointer` (`:165`) and `onMarkerKeydown` (`:213`) each call `clamp(…, 0, 100)`, so an out-of-range value cannot cross the boundary in either direction. Defence in depth on a seam that has no type gate (C-5) is the right instinct.
*Falsifier* — an emit path that skips the clamp (I traced all four: `:170`, `:184`, `:177`, `:213`, plus the caret's forward at `:103` which clamps in the child, `TimelineCaret.vue:62`).

---

## 6. Candidates dropped (they did not survive their own falsifiers)

Recorded so the next auditor does not re-file them.

1. **"`overflow-x-clip overflow-y-visible` is an invalid pair that coerces to `auto`."** Killed by CSS Overflow 3's actual computed-value rules — the coercions only fire when one axis is `scroll`/`auto`/`hidden`. Inverted into **SUP-1**.
2. **"`@pointerdown.stop` on the marker breaks reka's tooltip close."** Killed by reading `TooltipTrigger.js`: reka's `handlePointerDown` is registered on the *same* element via `mergeProps`/`toHandlers`; `.stop` is `stopPropagation`, not `stopImmediatePropagation`, so both handlers run. The `.stop` correctly prevents the *track* from also scrubbing on a marker grab.
3. **"Root-barrel glass-ui import bloats the async timeline chunk."** Weakened to MINOR (C-7) by `package.json` `sideEffects: ["*.css"]`, which makes the barrel's JS legitimately tree-shakeable. The residual claim is graph size and cluster consistency, not shipped bytes.

---

## 7. Falsifier index

| id | one probe that kills it |
|---|---|
| C-1 | a `glass-ui` row in `package-lock.json`, or a green `npm ci && npm run gh-pages` on a clean checkout |
| C-2 | any `watch(scrubT, …)` or reachable `scrub()` call outside `scrubAndCapture` |
| C-3 | a third branch in `useZoomPan.onWheel`, or a passive wheel registration |
| C-4 | an `isPrimary`/pointer-count guard on any of the six pointer/touch handlers |
| C-5 | a `vue-tsc` invocation in any script, workflow, or hook |
| C-6 | a `transform`-based position binding replacing `left`, or evidence the glass-ui docblock is stale |
| C-7 | byte-identical timeline chunks built from the two specifiers |
| C-8 | a second writer to `previewCache`, or a `@focus` binding on the marker |
| C-9 | capture surviving a mid-drag `visibleTicks` re-render |
| C-10 | any read of `keyframeId` inside `TimelineCaret.vue` |
| C-11 | any read of `selector`/`easing`/`label` in the track subtree |
| C-12 | two markers ≤2% apart both independently hittable |
| C-13 | a reserved-height rule on `TimelineTrack.vue:2` |
| C-14 | a keyframes.js import reached via provide/global |
| C-15 | an `exports` wildcard exposing `ContinuousRail`/`geometry`, or a `renderSlot` in `ScrubberTimeline` |
| C-16 | a validation pass upstream of `getGhostStyle` |
| SUP-1..4 | see each entry |
