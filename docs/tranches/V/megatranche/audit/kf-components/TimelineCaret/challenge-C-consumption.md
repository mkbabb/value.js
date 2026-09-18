claude-opus-5[1m]

# CHALLENGE · `TimelineCaret` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/TimelineCaret.vue` (70 L)
**Mode** static, read-only. No writes to any product tree; no browser tooling; no installs; no dev servers. Two `node -e` probes were run — both are pure reads of already-installed `dist/` artifacts + IEEE-754 arithmetic, neither mutates anything.
**Substrate** keyframes.js `master`, demo tree as of the lane census (`8281638c`). glass-ui **7.0.0** installed; value.js **4.0.0** installed + declared (`package.json:69`).
**Corpus folded** `lane-frontend.md` (F-1 phantom dep; S-1..S-8 shadow census), `lane-library.md` (§4.1 Tier-A parse seams; §4.6 downstream parse consumers; R1 class). In-repo priors: `docs/tranches/V/audit/R1-13-a11y.md` AY-4, `docs/tranches/U/audit/lane-24-design-restructure-system.md:160`, `docs/tranches/U/loop/pass1-research-demo-module-census.md:77`.

**Verdict** 11 defects · **0 BLOCKERS** · 7 superlatives · 1 explicit contradiction of the hitherto corpus.

The component is small, disciplined, and its **value.js edge is the best in the demo tree**. Its defects are all on the *other* two consumption faces: the glass-ui design-system face (it declines four primitives it already has on disk) and the **sibling-integration face** (it sits inside `TimelineTrack`'s pointer field and inside a lossy percent↔fraction conversion it is the sole exact-integer writer into).

---

## 0. The whole import surface (the thing being challenged)

```ts
// TimelineCaret.vue:32-33 — the ENTIRE external surface
import { nextTick, ref, useTemplateRef } from "vue";
import { clamp } from "@mkbabb/value.js/math";
```

Zero glass-ui. Zero `@mkbabb/keyframes.js`. Zero local types. Four scalar props in, two emits out.

Files read whole for this challenge (read-only): `TimelineCaret.vue`; its sole consumer `components/TimelineTrack.vue`; that file's consumer `KeyframeTimeline.vue`; `timelineTypes.ts`, `index.ts`; `composables/{useTimeline,useTimelineBuild,useTimelineOps,useZoomPan}.ts`; `utils/{timelineEngine,snapshotCapture,flattenVars}.ts`; `demo/utils/keyframeSelector.ts`; `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts`; `demo/styles/layout.css`, `design-idioms.css`; and the installed `node_modules/@mkbabb/value.js/dist/subpaths/math.js`, `.../glass-ui/dist/components/{number-field,timeline}/*.d.ts`, `.../glass-ui/dist/styles/{theme/bridges,typography/{scale,semantic,utilities}}.css`.

---

## 1. Defect table

| # | severity | one-line |
|---|---|---|
| C-1 | **MAJOR** | The caret is the only writer of exact integer percents; 8 of its 101 possible values are corrupted by the `percent/100 → value*100` trip through value.js's `KeyframeSelector` fraction domain |
| C-2 | **MAJOR** | `@click.stop` without `@pointerdown.stop` — opening the caret editor scrubs the playhead; the sibling `<input>` (`:26`) and the marker (`TimelineTrack:81`) both carry the guard the label lacks |
| C-3 | **MAJOR** | `Math.round` at display *and* commit truncates the fractional percents every other write path produces — a no-op Enter silently moves the keyframe |
| C-4 | **MAJOR** | Hand-rolled `<input type="number">` + 9 utility classes shadows glass-ui `NumberField` (`/number-field`, unreached) **and** `Input` (`/forms`, already imported by two siblings in the same directory) |
| C-5 | MINOR | `keyframeId` prop declared + bound + never read; `select` emit carries no payload, so the id is doubly dead |
| C-6 | MINOR | Numeric readout on the `text-admin-label` rung while the demo's numeric-readout idiom — and the *same datum* 90 lines away — is `text-mono-caption`; `font-mono` is redundant against the utility's own family bind |
| C-7 | MINOR | Hand-rolled `focus:ring-1 focus:ring-primary` declines glass-ui's bridged `--shadow-focus-ring` and diverges from the demo's only other ring site |
| C-8 | MINOR | The `from`/`to` carets (0 % / 100 %) are half-clipped by the parent's `overflow-x-clip`; the sibling tick labels **in the same file** carry the edge-aware cure the caret lacks |
| C-9 | INFO | Undeclared three-file geometric coupling: the caret's `--caret-offset` overhang is visible only because two ancestor files opt into `overflow-*-visible`, with no comment at any node |
| C-10 | INFO | `update:percent` is `v-model`-shaped but never consumed as `v-model:percent`; no `defineModel` |
| C-11 | INFO | AY-4 restated on the consumption axis: `/labeled-field` (already reached by 4 demo sites) is the primitive that answers it, and the caret declines it |

---

## C-1 — the caret is the sole exact-integer writer into a lossy fraction domain — **MAJOR**

**The chain** (every hop verified in the tree):

```
TimelineCaret.vue:62      emit("update:percent", clamp(Math.round(val), 0, 100))     → 29
TimelineTrack.vue:104     emit("moveKeyframe", kf.id, p)                             → 29
KeyframeTimeline.vue:84   @move-keyframe="moveKeyframe"
useTimelineOps.ts:60-61   kf.percent = clamp(29,0,100);  kf.selector = percentSelector(29)
demo/utils/keyframeSelector.ts:23-26   percentSelector → { kind:"percent", value: percent/100 }   → 0.29
   … rebuild() …
utils/timelineEngine.ts:38            const key = selectorText(kf.selector)
demo/utils/keyframeSelector.ts:8      `${selector.value * 100}%`   →   0.29 * 100
```

**Measured** (`node -e`, pure IEEE-754, no imports):

```
INTEGER percents p in [0,100] where (p/100)*100 !== p:  8
[[7, 7.000000000000001], [14, 14.000000000000002], [28, 28.000000000000004],
 [29, 28.999999999999996], [55, 55.00000000000001], [56, 56.00000000000001],
 [57, 56.99999999999999], [58, 57.99999999999999]]

random fractional p (2000 samples), (p/100)*100 !== p:  0
```

So the corruption is **exclusive to exact integers** — which is exactly and only what this component emits. Every other write path (`getPercentFromPointer` at `TimelineTrack.vue:160-166`, `captureSnapshot` at `snapshotCapture.ts:24`, the arrow-key path at `TimelineTrack.vue:206-209` starting from a fractional `kf.percent`) produces floats that survive the trip. **The caret manufactures the only inputs that break it.**

**The value.js half** — confirmed against the installed 4.0.0 dist (read-only import of `dist/subpaths/css.js`):

```
parseKeyframeSelector("29%") -> {"kind":"percent","value":0.29}
parseKeyframeSelector("7%")  -> {"kind":"percent","value":0.07}
parseKeyframeSelector("from")-> {"kind":"percent","value":0}
```

value.js's `KeyframeSelector` is a **fraction** carrier; `timelineTypes.ts:6` documents `selector` as the "Normalized authored selector retained for CSS round-trip". The demo's `selectorText` (`keyframeSelector.ts:6-13`) is the only inverse, and it is not exact.

**The user-visible corruption vector — a no-op edit rewrites the artifact:**

1. User imports `@keyframes x { 29% { … } }` → `importCSSToTimeline` (`timelineEngine.ts:82-84`) → `requireKeyframeSelector("29%")` → `{value:0.29}` → `selectorPercent` = `0.29*100` = **28.999999999999996** stored as `kf.percent`.
2. The caret renders `Math.round(28.999999999999996)` = **29**. Correct-looking.
3. User clicks it, changes nothing, presses Enter → `commitEdit` → `emit("update:percent", 29)`.
4. `percentSelector(29)` → `{value: 0.29}` → `selectorText` → **`"28.999999999999996%"`**.
5. That string is the `keyframesMap` key fed to `fromKeyframes` (`timelineEngine.ts:51-53`) — i.e. into value.js's `parseKeyframeSelector` via the engine (`lane-library` §4.1 **A4**, `src/animation/compile/selector.ts:24`) — and it is what `exportTimelineToCSS` (`timelineEngine.ts:64-72`) writes to the clipboard.

The exported CSS silently changes from `29%` to `28.999999999999996%` because the user opened and closed a read-only-looking label.

**Blast radius beyond cosmetics.** `timelineEngine.ts:42-48` uses `key` as the merge key ("multiple keyframes at same percent get merged"). Two keyframes the UI both reports as "29%" — one imported (`28.999999999999996`), one caret-committed (`29` → `0.29` → `28.999999999999996`) — happen to collide *correctly* here, but the merge is keyed on a float's decimal serialization, not on a percent. Any future path that stores `29` without the `/100` round trip yields `"29%"` and fails to merge with `"28.999999999999996%"`.

**Not a BLOCKER because:** `28.999999999999996%` is legal CSS, parses back to the same fraction, and the animation is visually identical. Undo/redo (`useTimeline.ts:78-88`) can back it out.

**Falsifier.** This claim dies if any of: (a) `(29/100)*100 === 29` in V8 — measured false; (b) `percentSelector` did not divide by 100 — it does, `keyframeSelector.ts:25`; (c) `selectorText` did not multiply by 100 — it does, `keyframeSelector.ts:8`; (d) some node between the caret and `selectorText` re-quantized the value — `useTimelineOps.ts:60` only clamps, `timelineEngine.ts:38` calls `selectorText` directly; (e) `selectorText`'s output were not the map key / export text — it is both.

---

## C-2 — `@click.stop` without `@pointerdown.stop`: opening the editor scrubs the playhead — **MAJOR**

The caret is rendered **inside** the track's pointer field: `TimelineTrack.vue:97-106` sits inside the `<div ref="trackEl">` opened at `:21` and closed at `:107`. That div carries:

```
TimelineTrack.vue:27   @pointerdown="onTrackPointerDown"
TimelineTrack.vue:28   @pointermove="onTrackPointerMove"
```

`onTrackPointerDown` (`:168-172`) is **not** `.self`-gated and does **not** test the target:

```ts
const onTrackPointerDown = (event: PointerEvent) => {
    const percent = getPercentFromPointer(event);
    emit("update:scrubT", percent / 100);
    (event.target as Element).setPointerCapture(event.pointerId);
};
```

The caret's display div guards only `click`:

```
TimelineCaret.vue:12    @click.stop="startEdit"
```

`pointerdown` fires **before** `click`. So clicking the caret label: (1) bubbles to the track → the playhead jumps and `scrubT` is rewritten; (2) `setPointerCapture` lands on the caret label; (3) `startEdit` runs and `v-if`/`v-else` removes the captured element mid-gesture; (4) any residual drag re-enters `onTrackPointerMove` (`:182-185`, `event.buttons > 0`) and keeps scrubbing.

**This is an omission, not a design choice — the file proves it three ways:**

| site | guard | present? |
|---|---|---|
| `TimelineCaret.vue:26` — the `<input>` | `@pointerdown.stop` | ✅ |
| `TimelineTrack.vue:81` — the marker diamond | `@pointerdown.stop` | ✅ |
| `TimelineCaret.vue:12` — the caret label | `@pointerdown.stop` | ❌ |

The author reached for exactly this guard on the *other* half of the same component, one line-block down. The label was missed.

**Falsifier.** Dies if: `onTrackPointerDown` were `.self`-modified or target-tested (it is neither, `:27`, `:168`); or the caret rendered outside `trackEl` (it does not — `:97` is inside `:21`–`:107`); or `click` preceded `pointerdown` in the UI-Events order (it does not). Secondary claim (the residual-drag scrub) is source-derived; the exact post-unmount capture behaviour is **UNPROVEN-NEEDS-LIVE** for the SS-13 pass — the primary claim (playhead jumps on caret click) needs no live probe.

---

## C-3 — the caret truncates a fractional model at both the display and the commit — **MAJOR**

```
TimelineCaret.vue:13   {{ Math.round(percent) }}%
TimelineCaret.vue:18   :value="Math.round(percent)"
TimelineCaret.vue:62   emit("update:percent", clamp(Math.round(val), 0, 100))
```

`percent` is **not** integral in the model. Every other producer is continuous:

- `TimelineTrack.vue:160-166` `getPercentFromPointer` → `(x / rect.width) * 100` through `positionToPercent` (`useZoomPan.ts:13-15`, a division by `zoomLevel` + pan add) — continuous.
- `useTimelineOps.ts:60` stores it **unrounded**: `kf.percent = clamp(newPercent, 0, 100)`.
- `snapshotCapture.ts` stores `p = scrubT*100` — continuous.
- `importCSSToTimeline` stores `selectorPercent(parsedSelector)` — arbitrary precision from the CSS source.

So the caret is a **rounding well**: it *displays* a rounded view of a precise value, and on commit it writes that rounded view back as truth. A user who drags a keyframe to 33.7 %, then clicks the caret to *read* the value and dismisses with Enter (or Tab, via `@blur`), has silently moved the keyframe to 33 %. The commit path is reachable by `blur` alone (`:22`) — no keystroke required beyond focusing away.

Note this is distinct from C-1: C-1 is float-representation loss in the fraction domain; C-3 is deliberate integer truncation of a continuous model. They compose (C-3 produces the integers that C-1 then corrupts).

The affordance is also *presented* as read-only — a `<div>` with `cursor-pointer` (`:9`) reading a percentage. Nothing signals that dismissing it mutates.

**Falsifier.** Dies if `percent` were integral by construction anywhere upstream. It is not: `useTimelineOps.ts:60` clamps without rounding, and `useZoomPan.ts:14` divides. Also dies if `@blur` were removed or gated — it is neither (`:22`, and `commitEdit`'s only guard at `:59` is `isEditing`, which is `true` on blur).

---

## C-4 — the number editor shadows two glass-ui primitives, one of them already on disk *and already imported by a sibling* — **MAJOR** *(extends `lane-frontend` S-3)*

```html
<!-- TimelineCaret.vue:14-27 -->
<input v-else ref="inputEl" type="number"
  :value="Math.round(percent)"
  class="font-mono text-admin-label w-10 h-5 text-center bg-background border border-border rounded px-0.5 outline-none focus:ring-1 focus:ring-primary"
  min="0" max="100" @blur="commitEdit" @keydown.enter="commitEdit" @keydown.escape="cancelEdit" … />
```

Nine hand-authored utility classes reconstructing a form-control chrome (surface, border, radius, padding, focus ring) that the design system owns.

**Primitive 1 — `NumberField`, `/number-field`, installed, subpath NEVER reached** (`lane-frontend` §3.1 lists `/number-field` among the 52 unreached of 73). It is a reka-backed composite with exactly this component's job:

```
node_modules/@mkbabb/glass-ui/dist/components/number-field/index.d.ts
  NumberField, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement, NumberFieldContent

NumberField.vue.d.ts
  export interface NumberFieldProps extends NumberFieldRootProps {
      /** App-driven invalid state; locale parsing and native form behavior stay Reka-owned. */
      invalid?: boolean; class?: HTMLAttributes["class"];
  }
  emits: { "update:modelValue": (val: number) => any }
```

`NumberFieldRootProps` carries reka's `min`/`max`/`step` **with locale-aware parsing** — which is the correct answer to the `parseFloat` at `TimelineCaret.vue:60` (a bare `parseFloat` on a raw `<input>.value` is locale-blind; a comma-decimal locale types `29,5` and `parseFloat` returns `29`). And `update:modelValue: (val: number)` is precisely the `update:percent` contract, already numeric.

**Primitive 2 — `Input`, `/forms`, installed, subpath reached 5× — and imported by a sibling in the same directory:**

```
KeyframeTimeline.vue:171   import { Input } from "@mkbabb/glass-ui/forms";
KeyframeCard.vue:58        import { Input } from "@mkbabb/glass-ui/forms";
```

`KeyframeTimeline.vue:105-109` renders `<Input v-model="selectedKeyframe.label" class="font-mono text-admin-label h-6 w-32" />` — the *same visual register*, the *same card*, for the *sibling field of the same keyframe*. The caret hand-rolls what its own parent imports.

**This extends S-3, and S-3 missed it.** The census mapped `TimelineCaret.vue → ScrubberTimeline caret / geometry` and stopped at the geometry face. The caret is only ~40 % geometry (`:2-5`); the other 60 % is an inline form control, and *that* half has two exact, installed counterparts. §7 contradicts the geometry half of that mapping outright.

**Falsifier.** Dies if `/number-field` or `/forms` were absent from the installed exports map — both present (`node -e` on `glass-ui/package.json` → `['./forms','./number-field','./timeline']`); or if `NumberField` lacked min/max/numeric-model support — `NumberFieldRootProps` + `update:modelValue:(val:number)` present. **Not falsified by** the fact that a swap needs design review: the claim is that a shadow exists and was uncensused, not that a mechanical swap is safe.

---

## C-5 — dead contract surface: `keyframeId` in, no payload out — MINOR

```
TimelineCaret.vue:36        keyframeId: string;      ← declared
TimelineTrack.vue:100       :keyframe-id="kf.id"     ← bound by the parent
(grep across the SFC)       props.keyframeId         ← ZERO reads
```

Exhaustive probe:

```
$ grep -n "keyframeId\|keyframe-id" TimelineCaret.vue components/TimelineTrack.vue
TimelineCaret.vue:36:    keyframeId: string;
components/TimelineTrack.vue:100:                :keyframe-id="kf.id"
```

Two occurrences total. The prop is written and never read.

The reason it is dead is structural: the `select` emit carries **no payload** (`:44` `(e: "select"): void`), and the parent re-derives the id from its own `v-for` closure (`TimelineTrack.vue:104-105` `(p) => emit('moveKeyframe', kf.id, p)` / `emit('select', kf.id)`). So the caret is told its identity and never needs it, while the emits pretend it has none. The contract points both ways at once.

The plausible original intent — an `id`/`aria-controls` linkage from the caret to the `role="slider"` marker for the same keyframe (`TimelineTrack.vue:62-84`) — was never wired. That linkage is exactly what would answer the "two parallel controls for one datum with no ARIA relationship" seam (§C-11).

**Why it survived:** nothing lints it. `package.json` scripts are `lint = depcruise src` (demo excluded by scope) and `check = tsc --noEmit` — neither reports an unread declared prop.

**Falsifier.** Dies on a single `props.keyframeId` read anywhere in the SFC, or a `useAttrs`/`$attrs` fallthrough consuming it (there is none; the component declares the prop, so it is removed from `$attrs`).

---

## C-6 — the numeric readout is on the wrong typographic rung, and re-declares the family — MINOR

```
TimelineCaret.vue:9    'font-mono text-admin-label … tabular-nums'
TimelineCaret.vue:19   'font-mono text-admin-label w-10 h-5 …'
```

`text-admin-label` is a **glass-ui** utility reached through the theme bridge — good consumption in principle:

```
glass-ui/dist/styles/theme/bridges.css:1   @theme inline { --text-admin-label: var(--type-admin-label); … }
glass-ui/dist/styles/typography/scale.css  --type-admin-label: 0.625rem;
glass-ui/dist/styles/typography/semantic.css
  text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label);
                     line-height: 1; text-transform: uppercase;
                     letter-spacing: var(--type-tracking-caps); font-weight: 500; }
```

**(a) Wrong rung.** The demo's established numeric-readout rung is `text-mono-caption` (`--type-caption`, same mono/caps family, larger):

```
scenes/sequence/SequenceAxis.vue:10        text-mono-caption text-muted-foreground tabular-nums   ← % ticks
scenes/square/SquareInstrument.vue:44      text-mono-caption text-muted-foreground tabular-nums
scenes/sequence/SequenceScrubber.vue:16    text-mono-caption tabular-nums                          ← timecode
KeyframeTimeline.vue:102                   text-mono-caption font-semibold tabular-nums            ← ★
```

`KeyframeTimeline.vue:102-104` renders **the identical datum** — `{{ Math.round(selectedKeyframe.percent) }}%` — at `text-mono-caption`, inside the same `<Card>`, ~90 lines from the caret's `text-admin-label`. The selected keyframe's percentage therefore appears at two different sizes simultaneously in the same surface. `text-admin-label` in this tree is otherwise reserved for word labels — status badges (`SquareInstrument.vue:30`, `SequenceTarget.vue:39`, `SpringTarget.vue:45`), menu prose (`MbabbMenu.vue:12,38,50,65,66`), a modal heading (`KeyboardShortcutsModal.vue:12`). The caret is the sole numeric consumer of the rung.

**(b) Redundant family bind.** `text-admin-label` already sets `font-family: var(--font-mono)`. The `font-mono` prefix at `:9` and `:19` re-declares it. The demo's own `design-idioms.css:223-227` is explicit that this utility carries a "mono family bind" and that call-sites compose it "for the SIZE rung only" — the caret composes it for the size rung *and* re-states the family.

**(c) Register friction (source-derived, extent UNPROVEN-NEEDS-LIVE).** `letter-spacing: var(--type-tracking-caps)` is applied to `tabular-nums` digits inside a `w-10` (2.5 rem) centered `<input>`. Caps-tracking loosens glyph advance; tabular figures exist to tighten it. Whether `100` overflows the 40 px box at 0.625 rem + caps tracking is a live measurement for the SS-13 visual pass.

**Falsifier.** (a) dies if `text-mono-caption` is not the demo's numeric idiom — 5 sites say it is, and the same-datum site at `KeyframeTimeline.vue:102` is decisive. (b) dies if `text-admin-label` did not bind `font-family` — `semantic.css` shows it does. (c) dies on a live measurement showing no overflow.

---

## C-7 — the focus ring is hand-authored against a bridged token — MINOR

```
TimelineCaret.vue:19   … outline-none focus:ring-1 focus:ring-primary
```

glass-ui bridges its focus ring as a first-class token:

```
glass-ui/dist/styles/theme/bridges.css:1   --shadow-focus-ring: var(--focus-ring-shadow);
```

The caret consumes neither the token nor the `Input` primitive that would carry it (C-4). It is also the **odd one out** among the demo's two ring sites:

```
$ grep -rn "focus:ring\|focus-visible:ring\|shadow-focus-ring" demo/ --include="*.vue" --include="*.css"
KeyframesEditor.vue:91   … focus-visible:ring-2 focus-visible:ring-accent
TimelineCaret.vue:19     … focus:ring-1 focus:ring-primary
```

Three axes of divergence in a two-element population: modifier (`focus` vs `focus-visible`), width (1 vs 2), tone (`primary` vs `accent`). `outline-none` additionally removes the UA fallback with no `@media (forced-colors)` re-provision.

**Deliberately not over-claimed:** `focus:` (not `focus-visible:`) is *correct* for a text input — a keyboard-or-pointer-focused text field should always show focus. The defect is the width/tone/token divergence and the `outline-none` removal, not the modifier.

**Falsifier.** Dies if a third demo ring site established `ring-1 ring-primary` as the idiom (grep says the population is 2), or if `--shadow-focus-ring` were absent from the installed bridge (it is present).

---

## C-8 — the `from`/`to` carets are half-clipped, and the cure sits 50 lines above them in the same file — MINOR

The parent clips horizontally:

```
TimelineTrack.vue:24   '… overflow-x-clip overflow-y-visible …'
```

The caret hardcodes a symmetric centering transform with no edge awareness:

```
TimelineCaret.vue:4   :style="{ left: `${position}%`, top: 'calc(50% + var(--caret-offset))', transform: 'translateX(-50%)' }"
```

At `position = 0` the label's left half sits at negative x and is clipped; at `position = 100` its right half is clipped. **`from` and `to` — the canonical CSS `@keyframes` endpoints — land exactly there.** Confirmed reachable: value.js parses both to the rail ends (`parseKeyframeSelector("from") → {value:0}`, `("to") → {value:1}`), `selectorPercent` yields 0 and 100, and `useZoomPan.ts:11` `percentToPosition(0) = 0`, `percentToPosition(100) = 100` at the default zoom 1 / pan 0.

The sibling tick labels **in the same file** already solve it:

```html
<!-- TimelineTrack.vue:44-47 -->
:class="[ 'text-small absolute -top-5 left-0 …',
  percentToPosition(tick) <= 2 ? 'translate-x-0'
  : percentToPosition(tick) >= 98 ? '-translate-x-full'
  : '-translate-x-1/2' ]"
```

Ticks at 0 % and 100 % pin flush; carets at 0 % and 100 % overhang and clip. Two idioms, one track, one file.

**Falsifier.** Dies if `overflow-x: clip` did not clip (per CSS Overflow 3, `clip` on one axis with `visible` on the other is the one legal pairing that preserves the other axis — so x *does* clip); or if the caret's label were narrow enough that half its width is < 0 px (impossible); or if keyframes at exactly 0 %/100 % were unreachable (they are the default import shape). **Exact clipped pixel extent: UNPROVEN-NEEDS-LIVE** for SS-13 — the *fact* of clipping is source-derived.

---

## C-9 — an undeclared three-file geometric coupling — INFO

`TimelineCaret.vue:4` pushes the caret **below** the track centre by a demo-owned token:

```
demo/styles/layout.css:139   --caret-offset: 14px;     (in the :root block opened at layout.css:12)
```

Collapsed track height is `h-12` = 48 px (`TimelineTrack.vue:25`) → centre 24 px → caret top 38 px → a 0.625 rem `line-height:1` label spans ≈ 38–48 px and overhangs. It renders only because two *other* files opt in:

```
TimelineTrack.vue:24     overflow-y-visible
KeyframeTimeline.vue:3   <Card cartoon tier="quiet" :class="['w-full overflow-visible', …]">
```

Three files, one invariant, zero comments at any node. Removing `overflow-visible` from the Card (a plausible glass-ui adoption cleanup) silently truncates every caret label. This is worth recording precisely because a `/timeline`-adoption or `Card`-cleanup wave is exactly the kind of change that would trip it.

`--caret-offset` is also one of the 98 unprefixed demo custom properties in the flat global namespace (`lane-frontend` §6.3) — verified **not** used by glass-ui 7.0.0 (`grep -rn -- "--caret-offset" node_modules/@mkbabb/glass-ui/dist/` → no output), so there is no collision *today*.

**Falsifier.** Dies if `--caret-offset` were 0, or the collapsed track taller than `2 × (24 + 14 + label height)`, or if either ancestor's `overflow-*-visible` were absent (both present at the cited lines).

---

## C-10 — `update:percent` is `v-model`-shaped but never `v-model`'d — INFO

```
TimelineCaret.vue:43     (e: "update:percent", value: number): void;
TimelineTrack.vue:104    @update:percent="(p) => emit('moveKeyframe', kf.id, p)"
```

The `update:<prop>` name is Vue's `v-model:percent` protocol, but no consumer uses it and the caret does not use `defineModel`. A reader is invited to write `v-model:percent="kf.percent"` — which would bypass `useTimelineOps.moveKeyframe` (`:57-64`) entirely, skipping the `selector` re-derivation at `:61` and the `rebuild()` at `:62`, and leaving the engine desynced from the state.

Cited as an overlap: `docs/tranches/U/loop/pass1-research-demo-module-census.md:77` records "`defineModel` for `TimelineTrack` manual `update:*` (`:129`, U.B12)" and marks the caret **KEEP**. The tree agrees the caret should not adopt `defineModel` — but for the opposite reason the census implies: not because the shape is fine, but because `percent` is **not** writable through this component. Renaming the emit (`requestPercent` / `commitPercent`) is the KISS cure; `defineModel` would be actively wrong here.

**Falsifier.** Dies if any consumer binds `v-model:percent` (none does — one consumer, `TimelineTrack.vue:104`, binds the listener explicitly), or if `moveKeyframe` were a pure setter (it is not — it re-derives `selector` and triggers `rebuild`).

---

## C-11 — AY-4, restated on the consumption axis — INFO

The a11y finding is **already known and correctly dispositioned** — `docs/tranches/V/audit/R1-13-a11y.md:103-113` (AY-4, P3): the `<input>` at `:14-27` has no `aria-label`; the `:14` display div is a click-only trigger with no `tabindex`/`@keydown`; severity held at P3 because `TimelineTrack.vue:74-82`'s `role="slider"` markers give an independent keyboard path. Registered at `docs/tranches/V/audit/AUDIT-REGISTRY.md:24` (FAM-10). **I do not re-litigate it.**

The *consumption* reading the a11y lane did not make: glass-ui's `/labeled-field` — **already reached by 4 demo sites** —

```
channel-controls/ChannelOptions.vue:423    import { LabeledSelect, LabeledInput } from "@mkbabb/glass-ui/labeled-field";
channel-controls/LayerConfigPanel.vue:74   import { LabeledField, LabeledSelect, LabeledSlider, LabeledSwitch } …
```

is the primitive whose entire purpose is label↔control association. AY-4's disposition ("add `aria-label=…`; optionally make the display a real `<button>`") patches the symptom by hand; `LabeledInput` (or `NumberField` per C-4) discharges it structurally. Same wave, cheaper, and it also lands C-4, C-6 and C-7.

Additionally on the integration seam: `TimelineTrack` renders **two parallel `v-for` loops over the same `sortedKeyframes`** — the `role="slider"` markers (`:62-94`) and the carets (`:97-106`) — two independent controls for one datum with two interaction models and **no ARIA relationship between them**. `aria-controls`/`id` is exactly what the dead `keyframeId` prop (C-5) would have carried.

**Falsifier.** Dies if `/labeled-field` were unreached or absent (it is reached at the two cited lines), or if `LabeledInput` did not associate a label (that is its published purpose).

---

## 2. Non-findings recorded as traps for a later wave

**The triple clamp is NOT a defect.** `clamp` fires three times on the same value — `TimelineCaret.vue:62`, `TimelineTrack.vue:213` (keyboard path), `useTimelineOps.ts:60` (authority). A dedupe wave will be tempted to collapse them. **Do not delete the caret's.** `min="0" max="100"` on `<input type="number">` constrain the *stepper* and form *validity*, not typed text: a user types `999` and `inputEl.value` is `"999"`. `TimelineCaret.vue:62` is the boundary where unconstrained user text becomes a model number, and it is load-bearing. All three clamps have distinct, real sources.

**The `isEditing` guard is NOT dead code.** `commitEdit`'s `if (!isEditing.value) return;` (`:59`) is a deliberate, correct defense: Escape (`:24`) → `cancelEdit` sets `isEditing = false` → Vue unmounts the `<input>` (`v-else`) → a focused-element removal may fire `blur` → `commitEdit` (`:22`) would otherwise commit the value Escape just discarded. Enter (`:23`) has the same shape. Removing the guard reintroduces "Escape commits".

---

## 3. Superlatives (L-18, running the other way)

**S★1 — the value.js edge is the minimum viable one, and it is the best in the demo tree.** The entire value.js surface is `clamp` from `@mkbabb/value.js/math` (`:33`). Verified against the installed 4.0.0: `dist/subpaths/math.js` is **1 110 bytes with zero import statements** (`grep -cE "^import|require\(|from *\"" → 0`) — a true leaf, exporting 9 pure numeric functions. No transitive graph, no side effects, nothing to tree-shake around. *Falsifier: a single import in `math.js` — measured 0.*

**S★2 — the caret is on the R1-parser-free side of the boundary, by construction.** It never imports `@mkbabb/value.js/css`, so the `parseCssColor`/`parseKeyframeSelector` crash class (`lane-library` §4.6, R1) is not directly reachable from this module. It is reachable *one hop out* through its emit (documented in C-1), but the component itself imports no parser. *Falsifier: any `/css`, `/color`, or `/value` import in the SFC — there is none.*

**S★3 — the prop contract deliberately avoids the heavy type.** The caret takes **four scalars** (`keyframeId, percent, position, isSelected`), not a `TimelineKeyframe`. It therefore does **not** import `timelineTypes.ts`, and so does **not** transitively pull `KeyframeSelector` from `@mkbabb/value.js/css` the way its own parent does (`TimelineTrack.vue:118` → `timelineTypes.ts:1`). Whether intentional or incidental, it is the correct cut, and it is the reason S★2 holds. *Falsifier: a `TimelineKeyframe` import in the SFC — there is none.*

**S★4 — `percent` and `position` are correctly split into model-value and screen-coordinate.** `percent` is the 0–100 model datum; `position` is `percentToPosition(kf.percent)` (`TimelineTrack.vue:102`), the zoom/pan-transformed screen coordinate from `useZoomPan.ts:10-12`. The entire zoom model lives in the parent; the caret is geometry-agnostic and survives any change to it. Most hand-rolled carets conflate these into one number and bake the transform into the leaf. *Falsifier: any use of `zoomLevel`/`panOffset`/`percentToPosition` inside the caret — there is none.*

**S★5 — `clamp` is exactly on-idiom, with no duplicate authority.** 20+ demo modules import the identical `clamp` from `@mkbabb/value.js/math` (`useZoomPan.ts:3`, `useTimelineOps.ts:6`, `useTimelineBuild.ts:17`, `TimelineTrack.vue:114`, `scene-facility/index.ts:24`, …), and keyframes.js's own `src/` exports **no** `clamp` (`grep -rn "export const clamp\|export function clamp" src/` → 0 hits). There is no ambiguity about which `clamp` is authoritative, and the caret picked the right one. *Falsifier: a `clamp` export in `src/` — measured 0.*

**S★6 — F-1 immunity.** `lane-frontend` F-1 (RED) records `@mkbabb/glass-ui` as a phantom dependency — installed at 7.0.0, absent from both `package.json` and `package-lock.json`, so `npm ci` cannot reconstruct it. TimelineCaret imports zero glass-ui, and its one external package (`@mkbabb/value.js`) **is** declared and locked (`package.json:69`, `package-lock.json:611`). Its module graph is fully reproducible on a clean checkout. Double-edged and stated as such: the same abstinence is what makes C-4/C-6/C-7 possible. *Falsifier: a glass-ui import in the SFC — there is none.*

**S★7 — every boundary law `lane-frontend` records as GREEN is honored here.** No `<style>` block at all (the file ends at `</script>`, `:70`) — 100 % utility/token composition, versus the 40 `.vue` files carrying scoped CSS (§6.1). No `reka-ui` import (§3.4). No local `cn()`/cva/clsx (§3.3). No raw `z-[N]` bracket (§6.3). No backwards-compat shim (F-5). No runtime style injection (contrast `CopyButton.vue:70,83`, S-7). For a component that reaches *around* the design system on four counts, it breaks none of its structural laws.

---

## 4. Contradiction of the hitherto corpus

**`lane-frontend` §5 S-3 maps `TimelineCaret.vue | 70 | ScrubberTimeline caret / geometry`. Both halves of that mapping are wrong for this component. The tree disagrees.**

**(a) `ScrubberTimeline` is a single-head 0..1 scrubber, not a multi-marker caret family.** From the installed `dist/components/timeline/ScrubberTimeline.vue.d.ts`:

```
/** <ScrubberTimeline> — single-track normalized 0..1 scrubber.
 *  Owns the pre-Z.W2 single-track contract: pointer-capture drag, keyboard
 *  a11y (role=slider + arrow-key step + shift-step), `label` tooltip caret. */
type __VLS_Props = {
    modelValue?: number;   /** 0..1 scrubber position. */
    label?: string;        /** Tooltip caret text. */
};
emits: { "update:modelValue": (v:number), scrubStart: (), scrubEnd: () }
```

One value. One head. Its `label` is *tooltip caret text* for that single head — a different thing from N independently-positioned, independently-editable percentage carets. The demo's actual counterpart to `ScrubberTimeline` is the **playhead** (`TimelineTrack.vue:52-55`) plus its scrub handlers, **not** `TimelineCaret`. S-3 mapped the caret onto the wrong primitive.

**(b) `geometry.d.ts` is weighted-segment math, not percent-marker math.** Its full export surface:

```
fillFor(seg: TimelineSegment): number
segmentWeight(seg): number
createContinuousGeometry(segments: Ref<TimelineSegment[]>)
   → { totalWeight, regionLeft(i), regionWidth(i), boundaryX(i), continuousAriaValueNow }
stitchedRailGradient(segments): string
stitchedRegionWindow(regionLeft, regionWidth): { sizeX, positionX }
continuousFillWidth(seg): number
popoverPayloadFor(seg): DefaultPopoverPayload
```

Every function is keyed on `TimelineSegment[]` — `{ key, label, state: "pending"|"active"|"completed", progress?, gradient? }` (`types.d.ts`). Adjacent weighted phases with lifecycle states. There is **no** helper that positions a free marker at an arbitrary `left: N%`, and no percent↔fraction conversion at all. `lane-frontend` §5 S-3 asserts "percent-positioning arithmetic (`TimelineCaret.vue:4` `left: ${position}%`) that `geometry.d.ts` exists to own" — **it does not own it.** The nearest analogue, `regionLeft(i)`, returns a cumulative weight fraction for segment *i*, which is a different model entirely.

**What S-3 got right, and what it missed.** S-3's own caveat ("keyframe-editing semantics may exceed the primitive's contract… treat as *evaluate*, not *mechanical swap*") is correct and, for the caret, stronger than stated — the geometry half has **no** counterpart. But S-3 stopped at the geometry face and therefore missed the real shadow: the caret's *forms* half maps cleanly onto `NumberField` (`/number-field`, unreached) and `Input` (`/forms`, reached 5× including by this component's own grandparent). §C-4 supplies it.

**Recommended S-3 amendment:** strike `TimelineCaret.vue → ScrubberTimeline / geometry` from the S-3 evaluate-list; re-file the caret under a new **S-9 · inline numeric editors → `NumberField` / `Input`**, which is a *lower-risk, mechanically landable* row (unlike the rest of S-3), and pairs naturally with AY-4's disposition wave.

**Falsifier for this contradiction.** Dies if `ScrubberTimeline` accepted an array model or exposed per-marker positioning (its props are exactly `{modelValue?: number, label?: string}`), or if `geometry.d.ts` exported any percent-marker helper (its full export list is reproduced above, verbatim from the installed `.d.ts`).

**Non-contradictions — corpus confirmed by this challenge:** `lane-frontend` F-1 (RED, phantom glass-ui — confirmed, and §S★6 records the caret's immunity); F-6 (the reka/`ui/`/cva boundary is otherwise clean — confirmed for this component, §S★7); `lane-library` §4.1 A4 (`parseKeyframeSelector` is value.js's sole selector grammar authority — confirmed, and C-1 traces the caret's one-hop reach into it); `docs/tranches/V/audit/R1-13-a11y.md` AY-4 (confirmed unchanged, §C-11); `docs/tranches/U/audit/lane-24-…:160` (the caret sits at the module root with one consumer — confirmed by the exhaustive grep in §C-5).

---

## 5. Wave order (cheapest correct sequence)

1. **C-2** — add `@pointerdown.stop` to `TimelineCaret.vue:12`. One modifier. Copies the guard already at `:26`. No design review.
2. **C-1 + C-3 together** — fix the percent↔fraction round trip. The KISS cure is to stop re-deriving: make `percent` the derived view of `selector` (one direction only), or round-trip through a shared exact helper in `demo/utils/keyframeSelector.ts` rather than `/100` and `*100` at opposite ends of the tree. Do **not** attempt C-3 alone — removing `Math.round` without fixing C-1 leaves the float trip live for the drag path's occasional exact values.
3. **C-4 + C-6 + C-7 + C-11 as one adoption** — swap the raw `<input>` for `NumberField` (or `Input`); the register, the ring, and AY-4's label all discharge with it. **Gated on `lane-frontend` F-1** — declare `@mkbabb/glass-ui: 7.0.0` and regenerate the lock first, or the adoption is unreproducible.
4. **C-5** — delete the `keyframeId` prop *or* wire it to an `id`/`aria-controls` linkage with the `role="slider"` marker. Decide which; do not leave it dead.
5. **C-8** — port `TimelineTrack.vue:44-47`'s edge-aware translate to the caret.
6. **C-9, C-10** — comment the overflow contract at all three nodes; rename the emit off the `update:` protocol.

---

## Provenance

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (7.0.0 — the copy already installed in the target, so no upgrade is implied by any recommendation). Every value.js claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/value.js/dist/` (4.0.0 — declared and locked). Two `node -e` probes were executed: an IEEE-754 arithmetic loop (no imports), and a read-only dynamic import of `value.js/dist/subpaths/css.js` to obtain `parseKeyframeSelector`'s fraction output. No file in keyframes.js, glass-ui, or value.js was written, mutated, executed as a server, or installed. No browser tooling was used; all livable-only extents are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit. The single write of this task is this file.
