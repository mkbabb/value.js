claude-opus-5[1m]

# CHALLENGE · `TimelineCaret.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/TimelineCaret.vue` (70 lines)
**Mode** static, read-only, source-derived. No installs, no dev server, no browser. Every livable-only claim is tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read whole** the component; its sole runtime import (`clamp` ← `@mkbabb/value.js/math`); its only consumer `components/TimelineTrack.vue` (246 L); the grandparent `KeyframeTimeline.vue`; `composables/useZoomPan.ts`, `composables/useTimelineOps.ts`, `composables/useTimelineBuild.ts`, `utils/keyframeSelector.ts`, `timelineTypes.ts`, `index.ts`; the mount chain `channel-controls/ChannelControls.vue` → `controls-pane/ControlsPaneWrapper.vue`; `demo/styles/layout.css`, `demo/styles/design-idioms.css`; and the installed design system at `node_modules/@mkbabb/glass-ui/dist/` (`styles/typography/{semantic,scale}.css`, `styles/theme/bridges.css`, `styles/tokens/{color-radius,dark-arm,light-dark,on-glass-fg,scheme-motion,scheme-spring}.css`, `styles/glass/ladder.css`, `styles/components.css`, `styles/transitions.css`, `styles/accessibility.css`, `styles/utilities/a11y-overrides.css`, `dist/keyboard.js`, `dist/drawer.js`, `dist/components/number-field/`).

**Tally — 19 defects (2 BLOCKER · 9 MAJOR · 8 MINOR) · 5 superlatives · 3 INFO · 6 claims killed by their own falsifier.**

---

## 0. What the component actually is (and a correction to the census)

It renders, per keyframe, a percent **label** that swaps to a numeric **input** on click. It contains no caret, no playhead, no tick, no triangle — no positional mark of any kind. The playhead is a different element entirely, `TimelineTrack.vue:52–55` (`w-0.5 bg-primary`), and is not in this file.

**Contradiction of the hitherto corpus (fold, then correct):**

- `formation/keyframes/lane-frontend.md:205` labels it "**hand-rolled playhead caret** (absolute-positioned, `%`-driven)". The tree disagrees: it is a per-keyframe *percent readout + inline editor*. The `%`-driven positioning half of the census claim is correct (`TimelineCaret.vue:4`); the "playhead caret" half is not.
- `lane-frontend.md:342` maps it to glass-ui's `ScrubberTimeline` caret / `timeline/geometry`. Wrong counterpart. Its geometry is 1 line of `left: ${position}%`; its substance is a **number field**. The correct shadow is `@mkbabb/glass-ui/number-field` — which the census itself names at `lane-frontend.md:101` as one of the 52 *unreached* subpaths, without connecting it to this component. See **M-9**.
- `lane-frontend.md:305` (S-3, timeline cluster, AMBER, "evaluate not mechanical swap") **stands and is reinforced**: everything below is a symptom of hand-rolling a primitive the installed 7.0.0 already ships.
- `lane-frontend.md:441` (98 unprefixed demo custom properties, zero `--kf-*` namespace) **bites here**: `--caret-offset` is a *global* `:root`-scope token in `layout.css:139` with exactly one consumer (`grep -c` → 1), sitting in an unprefixed namespace shared with glass-ui's. See **M-2**.
- `lane-frontend.md:489` records the cluster "defers to glass-ui's `transitions.css` PRM block". Verified and **narrowed**: that block scopes to named Vue transition classes only (`.fade-*`, `.tab-fade-*`, `.pane-swap-*`, `.metric-swap-*`). It does not reach this component — which turns out not to need it (**S-4**).

---

## 1. BLOCKERS

### B-1 · Opening the editor scrubs the animation — `.stop` is on the wrong event

`TimelineCaret.vue:12`
```
@click.stop="startEdit"
```
The parent track's handler is **`pointerdown`**, not `click`:
```
TimelineTrack.vue:27    @pointerdown="onTrackPointerDown"
TimelineTrack.vue:168-172
  const onTrackPointerDown = (event: PointerEvent) => {
      const percent = getPercentFromPointer(event);
      emit("update:scrubT", percent / 100);
      (event.target as Element).setPointerCapture(event.pointerId);
  };
```
`pointerdown` fires **before** `click` and bubbles from the caret label (a descendant of the track div, `TimelineTrack.vue:21–107`). It is not stopped. So every click on a percent label:
1. yanks the playhead (`update:scrubT`) to the pointer's x, re-rendering the animated target — a global state mutation the user did not ask for; and
2. calls `setPointerCapture` on the label element, which `v-if` is about to unmount.

The author knew the correct guard and applied it **everywhere else in the same two files**: the sibling `<input>` two lines below carries *both* (`TimelineCaret.vue:25-26` `@click.stop` **and** `@pointerdown.stop`), and the diamond marker carries `@pointerdown.stop` (`TimelineTrack.vue:81`). The label is the only interactive descendant of the track without it.

Severity BLOCKER, not MAJOR: the component's *only* affordance cannot be exercised without side-effecting an unrelated subsystem, and the fix is one modifier.

**Falsifier** — put a `console.count` in `onTrackPointerDown` and click a caret label. If the count does not advance, `pointerdown` is being stopped somewhere between the label and the track and this claim dies. (`UNPROVEN-NEEDS-LIVE` for the visible playhead jump only; the event-path claim is decidable from the two files.)

### B-2 · The editor is unreachable and unnamed for assistive tech; the selected state is invisible to it

`TimelineCaret.vue:6-13` — a bare `<div>` with a `@click` handler. No `tabindex`, no `role`, no `aria-*`. `TimelineCaret.vue:14-27` — an `<input type="number">` with **no `aria-label`, no `<label>`, no `aria-labelledby`, no `title`**. Its only textual context is the label it replaced, which has just been removed from the DOM by `v-if`.

Three distinct failures:
- **WCAG 4.1.2 Name, Role, Value (A)** — once rendered, the spinbutton has no accessible name. Unambiguous, and it is a *rendered* control, not a hypothetical.
- **WCAG 2.1.1 Keyboard (A)** — the edit affordance has no keyboard entry point. *Mitigation stated honestly:* the sibling diamond at the same coordinate is a full `role="slider"` with `aria-label` / `aria-valuenow` / `aria-valuemin` / `aria-valuemax` / `tabindex="0"` and Arrow/Shift-Arrow/Home/End handling (`TimelineTrack.vue:74–82, 198–214`), so *retiming* is keyboard-operable. Absolute numeric entry is not. This mitigation weakens 2.1.1 but does not touch 4.1.2.
- **forced-colors state loss** — glass-ui already ships the cure and it is keyed on ARIA this component does not emit: `styles/accessibility.css` gives `border-color: Highlight !important; border-style: solid; border-width: 2px` to `:is([aria-current]:not([aria-current="false"]), [aria-selected="true"], [aria-pressed="true"], [aria-checked="true"], [data-state="checked"], [data-state="on"])`. The caret exposes selection **only** through `text-primary` (`TimelineCaret.vue:10`), and `color` is force-overridden in that mode. Declaring `aria-selected` would have bought the forced-colors treatment for free.

**Falsifier** — inspect the accessibility tree with the input open. If the input reports a non-empty name (e.g. an inherited `title` from an ancestor, or a Vue-injected `aria-labelledby`), the 4.1.2 half dies. Nothing in the read set supplies one.

---

## 2. MAJOR

### M-1 · The two canonical keyframes (0% and 100%) have their readouts sliced in half

`TimelineCaret.vue:4` positions with a **fixed** `transform: translateX(-50%)`. The track clips horizontally: `TimelineTrack.vue:24` `overflow-x-clip overflow-y-visible` (a legal pair — `clip` does not coerce a sibling `visible` axis, unlike `hidden`/`auto`/`scroll`).

At zoom 1 / pan 0, `percentToPosition(p) === p` (`useZoomPan.ts:9-11`, `(pct - 0) * 1`), so a 0% keyframe lands at `left: 0%`.

Metrics, at `--type-admin-label: 0.625rem` = 10px with `--type-tracking-caps: 0.1em` = 1px/char and Fira Code's 600/1000-em advance = 6px/char → **7px per character**:

| keyframe | string | width | span vs. clip edge | visible |
|---|---|---|---|---|
| 0% | `0%` | 14px | −7 → +7px | right half only → reads **`%`** |
| 100% | `100%` | 28px | −14 → +14px | left half only → reads **`10`** |
| editor at either edge | `w-10` = 40px | 40px | ±20px | half the field, half its border |

These are not edge cases: the demo's own default animations ship 0% frames at `scenes/square/useSquareDemo.ts:349`, `scenes/amiga/useAmigaDemo.ts:99,116,133`, `scenes/sequence/useSequenceDemo.ts:134`, and the square scene ships the full `0/25/50/75/100` set (`useSquareDemo.ts:349–364`) — **two of its five carets are clipped on first paint**.

The author solved this exact problem **50 lines above, in the parent**, for the tick labels:
```
TimelineTrack.vue:44-47
  percentToPosition(tick) <= 2 ? 'translate-x-0'
: percentToPosition(tick) >= 98 ? '-translate-x-full'
: '-translate-x-1/2',
```
The caret does not adopt it.

**Falsifier** — measure the rendered `getBoundingClientRect()` of a 0% caret against the track's client rect. If the label's left edge is ≥ the track's left content edge, the clip does not occur and this dies. (Font-advance figure `UNPROVEN-NEEDS-LIVE`; the *clipping* is decidable — any centered box at `left:0%` loses its left half regardless of width.)

### M-2 · `--caret-offset: 14px` is one absolute constant serving two track heights and two marker sizes

`layout.css:139` `--caret-offset: 14px;` — a `:root` token, one consumer. `TimelineCaret.vue:4` `top: calc(50% + var(--caret-offset))` sets the label's **top edge**; the label box is 10px tall (10px font × `line-height: 1` from `text-admin-label`). The thing it must clear is the diamond, whose size is state-dependent (`TimelineTrack.vue:67` `expanded ? 'w-6 h-6' : 'w-4 h-4'`, `:71` `scale-125` when selected), centered at the same `left` and at `top-1/2`.

Rotated-square half-diagonal = `size × √2 / 2`:

| track state | track h | mid | label span | diamond half-diag | diamond bottom vertex | result |
|---|---|---|---|---|---|---|
| collapsed | 48px | 24 | 38 → 48 | 16·0.707 = 11.31 | 35.31 | 2.69px clearance — *the value 14px was tuned for* |
| collapsed + **selected** | 48 | 24 | 38 → 48 | ×1.25 = 14.14 | 38.14 | **0.14px overlap** |
| **expanded** | 128px | 64 | 78 → 88 | 24·0.707 = 16.97 | 80.97 | **2.97px overlap** |
| expanded + **selected** | 128 | 64 | 78 → 88 | ×1.25 = 21.21 | 85.21 | **7.21px overlap — 72% of the label's height** |

Both marks are `translateX(-50%)`-centred on the same x, so the vertex lands on the label's **middle glyph**, not its margin. The failing combination — expanded *and* selected — is precisely the state the editor puts you in when you open a keyframe for editing.

Aristotelian reading: the offset is expressed in an absolute unit while every quantity it must relate to (`h-12`/`h-32`, `w-4`/`w-6`, `scale-125`) is state-relative. A proportion cannot be held by a constant. The token should derive — `calc(var(--marker-half-diagonal) + var(--optical-gap))` — or the caret should be laid out in flow relative to the marker rather than absolutely relative to the track's midline.

**Falsifier** — screenshot the expanded timeline with a keyframe selected. If the diamond's lower vertex does not touch the digits, one of my inputs is wrong (most likely `line-height: 1` not resolving to a 10px box, or Tailwind's `rotate-45`+`scale-125` composing differently than assumed). `UNPROVEN-NEEDS-LIVE` for the visual; the arithmetic is fully source-derived.

### M-3 · In the light theme, "selected" and "hovered" are the identical colour

`TimelineCaret.vue:10`
```
isSelected ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
```
Resolved through `styles/theme/bridges.css` (`--color-primary: var(--primary)`, `--color-foreground: var(--foreground)`) into the light arm:
```
tokens/color-radius.css  :root  --primary:    hsl(24 10% 10%)
tokens/color-radius.css  :root  --foreground: hsl(24 10% 10%)
tokens/light-dark.css    :root  --primary:    light-dark(hsl(24 10% 10%), oklch(0.739 0.134 318.1))
tokens/light-dark.css    :root  --foreground: light-dark(hsl(24 10% 10%), hsl(30 14% 90%))
```
The light arms are **byte-identical**. Contrast between the selected colour and the hover colour = **1.00:1**. Hovering any unselected caret makes it indistinguishable from the selected one.

What is left to carry the state is `font-semibold` — a 500→600 step (the register's own weight is 500, `typography/semantic.css` `@utility text-admin-label { … font-weight: 500 }`) at **10px**. And that residue is itself conditional: if the `@utility` declaration out-orders the core `font-semibold` in Tailwind v4's utility layer, the weight does not change either and the selected state has **no visual signal at all** in light mode. Both branches are bad.

Dark mode is fine: `oklch(0.739 0.134 318.1)` (violet) vs `hsl(30 14% 90%)` (warm white) are plainly distinct.

**Falsifier** — compute `getComputedStyle(el).color` on a hovered-unselected caret and a selected caret in light mode. Two different strings kills this. A theme override of `--primary` scoped inside the timeline `Card` would also kill it; I found none (`glass/ladder.css` rebinds `--foreground` and `--muted-foreground` inside `.glass-*`, never `--primary` — and its `--foreground: contrast-color(var(--card))` is a Safari-18.2-only function that, where it *does* apply over the light card, resolves toward black, i.e. toward `--primary` again).

### M-4 · Open-and-dismiss silently retimes the keyframe, and pushes an undo entry

The model is **continuous**:
```
TimelineTrack.vue:160-166  getPercentFromPointer → (x / rect.width) * 100   // float
useTimelineOps.ts:56-63    kf.percent = clamp(newPercent, 0, 100)           // no rounding
useTimelineOps.ts:31       const p = percent ?? scrubT.value * 100          // float
```
The caret is **integral**, in both directions:
```
TimelineCaret.vue:18  :value="Math.round(percent)"
TimelineCaret.vue:62  emit("update:percent", clamp(Math.round(val), 0, 100))
```
`commitEdit` is wired to `@blur` (`:22`) and emits unconditionally whenever the parsed value is a number — it does not compare against the incoming `percent`. So: drag a keyframe to 33.7%, click its label (reads "34%"), click anywhere else. No keystroke was typed, yet `34` is written over `33.7`, `percentSelector` rewrites the CSS selector (`useTimelineOps.ts:60`), `rebuild()` fires, and the debounced `useRefHistory` (`useTimeline.ts:56–76`) records an undo step for an edit the user never made. A read-only-intent gesture mutates the document.

The same integral/continuous mismatch shows in `min="0" max="100"` with **no `step`** (`TimelineCaret.vue:20-21`): the implied `step=1` grid marks any fractional model value as `:invalid` and quantises the spinner to a resolution the model does not share.

**Falsifier** — drag a keyframe to a fractional percent, open and blur the caret without typing, and read `state.keyframes[i].percent`. If it is unchanged, `moveKeyframe` rounds upstream of what I read, and this dies. `useTimelineOps.ts:59` says it does not.

### M-5 · Zero focus indicator in forced-colors mode

`TimelineCaret.vue:19` `… outline-none focus:ring-1 focus:ring-primary`.

- Tailwind **v4** (`package.json:76,101` → `@tailwindcss/postcss ^4.3.0`, `tailwindcss ^4.3.0`), where `outline-none` genuinely removes the outline — verified in the compiled system CSS, not inferred: `styles/components.css` contains `.outline-none{--tw-outline-style:none;outline-style:none}`. (This is the v3→v4 rename hazard: v3's forced-colors-safe transparent outline is now `outline-hidden`.)
- `ring-1` is a **box-shadow**, and forced-colors mode forces `box-shadow: none`.
- glass-ui *does* restore outlines under forced colors — but only for an enumerated class list (`styles/utilities/a11y-overrides.css`): `.focus-ring:focus-visible, .interactive-item:focus-visible, .dock-icon-button…, .field-control:focus-visible, .input-pill:focus, .input-pill:focus-visible { outline: 2px solid Highlight; outline-offset: 2px }`. This raw `<input>` joins none of them.

Net: outline suppressed, ring erased, restoration not matched → the focused editor is indistinguishable from the unfocused one. WCAG 2.4.7 (A). Using glass `Input` (M-9) would land `.field-control` and fix this incidentally.

**Falsifier** — enable Windows High Contrast / `forced-colors: active` emulation, focus the caret input, screenshot. Any visible indicator kills this. `UNPROVEN-NEEDS-LIVE`; every input to the deduction is source-verified.

### M-6 · The focus ring is 1px — half the required perimeter area

`ring-1` = 1 CSS px. WCAG 2.2 **SC 2.4.11 Focus Appearance (AA)** requires the indicator to be at least as large as the area of a **2 px thick perimeter** of the unfocused component. A 1px ring around a 40×20 box is ~120px² against a required ~232px² — roughly half.

The *contrast* half of 2.4.11 is comfortably met (computed below, §5): `--primary` vs the input's `bg-background` fill = **16.82:1** light, **8.08:1** dark; vs the track it sits over = 16.00:1 / 6.32:1. Only thickness fails. `ring-2` would satisfy it at zero design cost.

**Falsifier** — if `--default-ring-width` is overridden above 1px anywhere in the cascade, `ring-1` may not be 1px. I found no such override in `styles/**` or `demo/styles/**`.

### M-7 · The edit field has no perceivable boundary (SC 1.4.11)

The field is authored, not UA-default: `bg-background border border-border rounded` (`TimelineCaret.vue:19`). It opens **over the track**, whose backdrop is `bg-muted/50` composited on the `Card` (`TimelineTrack.vue:24`; `KeyframeTimeline.vue:3` `<Card cartoon tier="quiet">`). Computed (sRGB compositing, WCAG relative-luminance):

| boundary signal | light | dark | SC 1.4.11 needs |
|---|---|---|---|
| `border-border` (`--neutral-4`) vs track | **1.84:1** | **2.21:1** | 3:1 |
| `bg-background` (`--neutral-0`) fill vs track | **1.05:1** | **1.28:1** | 3:1 |

Neither the border nor the fill reaches 3:1, so nothing identifies the control's extent against the surface it replaced. In light mode the fill is a 1.05:1 no-op — `--background: hsl(40 30% 98%)` against a track composited from `--muted: hsl(38 26% 95%)` over `--card: hsl(30 85% 96%)`. The field is, effectively, invisible until you notice the digits changed alignment.

**Falsifier** — if a glass ladder rule rebinds `--border` inside the `Card`'s scope (I checked `glass/ladder.css`: it rebinds `--foreground`, `--muted-foreground`, `--muted-foreground-strong`, not `--border`), or if `cartoon` on `<Card>` injects a heavier border token into descendants, the ratios shift. Sample the rendered `borderColor` and `backgroundColor` and recompute.

### M-8 · Both targets are undersized, and the spacing exception fails

WCAG 2.2 **SC 2.5.8 Target Size (Minimum), AA** — 24×24 CSS px.

| target | size | source |
|---|---|---|
| percent label | ≤ 28 × **10** px | 10px font × `line-height: 1`; width = 2–4 chars × 7px |
| number input | 40 × **20** px | `w-10 h-5` (`TimelineCaret.vue:19`) |

The *spacing* exception (a 24px-diameter circle centred on each undersized target must not intersect another target's circle) **fails**: the caret's circle spans y ≈ 31–55 while the diamond's spans y ≈ 12–36 at the same x — they overlap by ~5px.

The condemning detail is internal. `TimelineTrack.vue:57-61` and `:229-241` show the author reasoning about this exact criterion and building a bespoke fix **for the neighbouring mark**:

> *"The visible diamond keeps its 16/24px size; an invisible ≥24px hit pad (`::before`) meets the touch-target minimum without moving a pixel of the diamond."*

Fifteen pixels away, its sibling target is 10px tall with no pad. The standard was known, applied once, and not carried across.

**Falsifier** — measure both bounding boxes live. Any hidden padding/pseudo-element on the caret (there is none — the file has no `<style>` block and no `::before`) would kill this.

### M-9 · Bespoke input where the same cluster already imports the glass primitive, and where `/number-field` exists

Three converging facts:

1. **The cluster already uses glass forms.** Sixty lines up the tree, the *other* inline editor in the timeline is a glass `Input`: `KeyframeTimeline.vue:171` `import { Input } from "@mkbabb/glass-ui/forms";`, used at `:105`. This component hand-rolls `bg-background border border-border rounded px-0.5 outline-none focus:ring-1 focus:ring-primary` instead. One cluster, two field idioms, and the bespoke one is the one that fails M-5/M-6/M-7.
2. **glass-ui ships a number field.** `dist/components/number-field/{NumberField,NumberFieldContent,NumberFieldIncrement,NumberFieldDecrement,NumberFieldInput}.vue.d.ts` + `styles.css`, over `reka-ui`'s `NumberFieldRootProps` (min/max/step/locale parsing/`update:modelValue`), with an `invalid` lever. That is `commitEdit` + `clamp` + `min`/`max` + the missing `step` + the missing ARIA, already written and already on disk. `/number-field` is in the census's *unreached-52* list (`lane-frontend.md:101`) — this is the site that wanted it.
3. **The census mapped this component to the wrong primitive** (`lane-frontend.md:342` → `ScrubberTimeline` / `geometry`). Its geometry is one interpolation; its substance is a number field. Correcting the mapping changes the wave plan: the caret is *not* blocked on the risky S-3 timeline-family evaluation. It is independently landable **today** on `/number-field` + `/forms`, ahead of the geometry question.

Severity MAJOR rather than MINOR because the bespoke path is what carries five of the other defects in this document (B-2, M-5, M-6, M-7, m-6): they are all consequences of not using the primitive.

**Falsifier** — if `NumberField` cannot render label-less, chrome-less, absolutely-positioned inline (e.g. it hard-requires the Increment/Decrement children or a fixed min-width), the swap is not mechanical and this drops to "evaluate". The `.d.ts` shows a slotted root with an optional default slot, which suggests it can, but composition is not provable from types alone. `UNPROVEN-NEEDS-LIVE`.

---

## 3. MINOR

**m-1 · Focus is never requested; the whole exit contract depends on it.**
`TimelineCaret.vue:53-55` — `nextTick(() => inputEl.value?.select())`. There is no `.focus()` anywhere in the file. `select()` is not specified to focus (MDN documents it as not guaranteed and pairs it with `focus()`), and this is `type="number"`, whose selection API is unsupported in Blink — where `select()` is plausibly a complete no-op. If the input never takes focus, `@blur` (`:22`), `@keydown.enter` (`:23`) and `@keydown.escape` (`:24`) are all unreachable and the component sits open with a dead field until the user clicks it a second time. The source-decidable half — *the component delegates its focus contract to a side effect it never asserts* — stands regardless of engine.
**Falsifier** — click a caret and read `document.activeElement`. If it is the input, only the design objection survives. `UNPROVEN-NEEDS-LIVE`.

**m-2 · A data value is dressed in the label register, against the repo's own written rule.**
`text-admin-label` is a *label* register: `typography/semantic.css` → `font-family: var(--font-mono); font-size: var(--type-admin-label); line-height: 1; text-transform: uppercase; letter-spacing: var(--type-tracking-caps); font-weight: 500`. The demo states the governing distinction itself, at `design-idioms.css:223-226`: *"A status WORD is a UI label, not data … call-sites compose `text-admin-label` for the SIZE rung ONLY."* Here the **full** register lands on a numeric datum. And the same datum, sixty lines away, wears a different one: `KeyframeTimeline.vue:102` `class="text-mono-caption font-semibold tabular-nums"`. One value, two registers, one cluster.
**Falsifier** — if a project token doc designates `text-admin-label` as the canonical numeric-readout register, the rule I am citing is superseded. `design-idioms.css:225` is the only statement of it I found.

**m-3 · Redundant utilities.** `font-mono` (`:9`, `:19`) is already bound by `text-admin-label`'s `font-family: var(--font-mono)`. `tabular-nums` (`:9`) is inert under a monospace stack (Fira Code → "Fira Code Fallback" → SF Mono/Menlo/Consolas, `typography/scale.css`), where every advance is already tabular. Both are harmless; both are noise that hides which utility owns the family.
**Falsifier** — if `--font-mono` can resolve to a proportional face in any fallback path, `tabular-nums` is load-bearing. The declared fallback chain is monospace end-to-end.

**m-4 · The affordance vanishes in the state that most invites it, and is never advertised.**
`:10` — the selected branch (`text-primary font-semibold`) has **no `hover:`** variant; only the unselected branch does. Select a keyframe and the label stops responding to the pointer entirely. There is no tooltip, no underline, no icon, no `title` — the neighbouring diamond gets a full `<Tooltip>` with instructional copy (`TimelineTrack.vue:62-94, 75`: *"Keyframe at 50% — drag or arrow to move"*), the caret gets `cursor-pointer` and nothing else. Click-to-edit-the-number is undiscoverable.
**Falsifier** — a global `[class*="cursor-pointer"]:hover` rule in the cascade would supply feedback. None found in `demo/styles/*.css`.

**m-5 · `keyframeId` is dead API.** Declared at `:36`, passed by the parent at `TimelineTrack.vue:100`, and read **nowhere** — `grep -c keyframeId TimelineCaret.vue` → 1, the declaration. The component looks addressable-by-id but its `select` emit (`:44`) carries no payload, forcing the parent to close over `kf.id` anyway (`TimelineTrack.vue:104-105`). Either the emits should carry the id or the prop should go.
**Falsifier** — any template or script reference I missed. There is none in 70 lines.

**m-6 · `w-10` is exactly zero-slack for "100".** 40px − `px-0.5` (2×2px) − 2×1px border = 34px content, less Blink's native `type=number` spinner (~13px) = **21px**, against `"100"` measuring 3 × (6px advance + 1px caps-tracking) = **21px**. Gecko's spinner is wider. The margin was spent by m-2's letter-spacing.
**Falsifier** — measure `scrollWidth > clientWidth` on the input with value `100`. `UNPROVEN-NEEDS-LIVE`.

**m-7 · The name misdescribes the artefact.** `TimelineCaret` renders no caret; see §0. Cheap to fix while the cluster is open (`KeyframePercentField`), and it is what propagated the wrong census mapping.
**Falsifier** — an internal glossary defining "caret" as "per-mark label". None found.

**m-8 · `step` unattributed on a bounded numeric input** — `:20-21` declares `min`/`max` but not `step`, so the implied `step=1` conflicts with the continuous model (M-4) and the spinner/validity grid quantises silently. Explicit `step="any"` (or `step="0.1"`) would state the intended domain.
**Falsifier** — if the model is intended to be integral, then M-4 is the defect and this is its symptom, not a separate one. `useTimelineOps.ts:59` shows it is not.

---

## 4. INFO (recorded, **not** counted as defects)

**i-1 · RTL.** The geometry is physical (`left`, `translateX`) rather than logical (`inset-inline-start`, `translate`). But the entire track is physical too (`TimelineTrack.vue:41,54,80`), the axis is *time* (conventionally LTR even in RTL locales), and `grep -rn 'dir="rtl"' demo/` returns nothing — the demo has no RTL surface at all. Consistent, untested, not a defect today. Worth stating that "RTL state coverage" for this component is **vacuous**, not passing.

**i-2 · Empty / error / loading states.** There are none to cover, and correctly so: the component is `v-for`-instantiated per keyframe (`TimelineTrack.vue:97-99`), so "empty" means "not rendered". A NaN percent is unreachable — percents derive from a validated selector union (`utils/keyframeSelector.ts:28-31`) whose parser throws on bad input (`:14-21`). Loading is the parent's concern (`TimelineHoverPreview`).

**i-3 · Sub-pixel mis-centring.** `--type-tracking-caps: 0.1em` adds trailing letter-space after the final glyph, so a `translateX(-50%)`-centred string sits ~0.5px left of the true keyframe x. Below perceptibility at 10px. Recorded for completeness; explicitly **not claimed** as a defect.

---

## 5. SUPERLATIVES (L-18 runs both ways)

**SUP-1 · Escape genuinely cancels — the guard that makes it work is deliberate.**
`:58-59` opens `commitEdit` with `if (!isEditing.value) return;`. `cancelEdit` (`:67-69`) clears the flag *before* the input unmounts, so if a `blur` follows the teardown it hits the guard and commits nothing. Enter-then-blur is likewise idempotent. Escape-should-cancel-but-commits is the single most common bug in this component shape, and it is closed here by construction rather than by luck.
**Falsifier** — set the percent, open, type a new value, press Escape, read the model. Any mutation kills the superlative.

**SUP-2 · The empty-number-input trap is closed.**
`:60-63` — `parseFloat(inputEl.value?.value ?? "")` guarded by `!isNaN(val)`. A `type="number"` field whose content is invalid reports `value === ""`; the naive `Number("")` → `0` would silently retime the keyframe to 0%. Clearing the field and blurring is here a no-op. Deliberate, and rarer than it should be.
**Falsifier** — clear the field, blur, and read the percent. A jump to 0 kills it.

**SUP-3 · The 10px readout clears WCAG AA in both themes, both hover states — computed, not assumed.**
`text-muted-foreground` over the composited track (`bg-muted/50` on `--card`, and `bg-muted/70` on hover):

| | resting track | hovered track |
|---|---|---|
| light, root binding (`--neutral-5`) | **4.95:1** | 4.93:1 |
| light, glass-ladder binding (`--on-glass-muted`) | 5.98:1 | 5.95:1 |
| dark, root binding | 6.02:1 | 6.26:1 |
| dark, glass-ladder binding | 8.01:1 | 8.32:1 |
| light, expanded (`Card` → `bg-transparent`) | 5.05:1 | — |

All ≥ 4.5:1 for normal-size text. Reported honestly: the worst case is **4.95:1**, ~10% headroom — passing, but the token that carries it (`--neutral-5`) is one nudge from failure at this size, and the size is the component's own choice. The hover and selected colours are 16:1 (light) / 12.4:1 and 6.32:1 (dark).
**Falsifier** — sample the rendered `color` and the effective backdrop and recompute; a `Card` surface tint I did not model (`cartoon`, `tier="quiet"`, glass translucency over the page background) would move the backdrop luminance and could push the 4.95 case under 4.5.

**SUP-4 · Motion is honest, and cheaply so.**
The only declared transition is `transition-colors` (`:9`) — `color`/`background-color`/`border-color`/`fill`/`stroke`. No transform, no opacity, no layout. A colour crossfade is not vestibular motion, so the component correctly requires **no** `prefers-reduced-motion` guard and contributes zero surface to the demo's 13 PRM enforcement sites (`lane-frontend.md:462–489`). It also does not animate `left`, so it tracks a drag instantly instead of lagging the diamond it labels. Both are the right calls.
**Falsifier** — if Tailwind v4's `transition-colors` were to include `transform` or `opacity` (it does not), a PRM guard would be owed.

**SUP-5 · Cross-repo primitive reuse instead of a local re-derivation.**
`:33` `import { clamp } from "@mkbabb/value.js/math"` — the same import its parent (`TimelineTrack.vue:114`), its ops layer (`useTimelineOps.ts:6`), its build layer (`useTimelineBuild.ts:16`) and its zoom composable use. No local `Math.min(Math.max(…))`. Small, but it is the constellation invariant holding at the leaf, where it usually stops holding.
**Falsifier** — a divergent local clamp elsewhere in the cluster would make this unremarkable. There is none.

---

## 6. CLAIMS I RAISED AND KILLED (the falsifier ran both ways)

Recorded so the next lane does not re-derive them, and as a check on this document's own error rate.

| # | claim | verdict | killer |
|---|---|---|---|
| K-1 | Bare `transition-colors` uses Tailwind's 150ms default instead of the system's `--duration-fast`/`--ease-standard`, unlike its sibling `TimelineTrack.vue:24,224-227` | **REJECTED** | glass-ui rebinds the Tailwind default token at `:root` — `styles/components.css` → `--default-transition-duration: var(--duration-fast, 150ms)` (0.2s). And `--motion-ease-standard: cubic-bezier(0.4, 0, 0.2, 1)` (`tokens/scheme-spring.css`) is byte-identical to Tailwind's default timing function. The un-suffixed utility resolves to the *same* values the explicit sibling names. |
| K-2 | Escape leaks past `cancelEdit` and dismisses the enclosing mobile Drawer, costing the user the whole controls sheet | **REJECTED** | `ControlsPaneWrapper.vue:117-123` binds `<Drawer :open="true">` — a literal, with no `@update:open`. reka emits `escapeKeyDown` (`dist/drawer.js` emits list) but a controlled-open drawer with no handler cannot close. |
| K-3 | Enter and digits typed in the caret fire app-level keyboard shortcuts (`EditorShell.vue:122` `registerShortcut`) | **REJECTED** | `dist/keyboard.js` guards: `t === "INPUT" \|\| t === "TEXTAREA" \|\| t === "SELECT" \|\| e.isContentEditable \|\| e.closest(".monaco-editor")`. |
| K-4 | `font-semibold` on selection changes the glyph advance and reflows the label | **REJECTED** | Monospace end-to-end (`typography/scale.css` fallback stack: SF Mono / Menlo / Consolas / Roboto Mono) — advance is weight-invariant. |
| K-5 | A malformed imported keyframe yields `percent = NaN` → `"NaN%"` and an invalid `left` that collapses the caret to the origin | **REJECTED** | Unreachable: `utils/keyframeSelector.ts:14-21` throws on unparseable selectors; `selectorPercent` (`:28-31`) reads a validated discriminated union. |
| K-6 | The 10px readout fails AA text contrast | **REJECTED** by computation — see SUP-3 (4.95:1 worst case). |

---

## 7. Ranked remediation (design axis only)

1. **B-1** — add `@pointerdown.stop` to `:12`. One token; kills the state side-effect.
2. **B-2 + M-5 + M-6 + M-7 + M-9 + m-1 + m-6 + m-8** — replace the raw `<input>` with glass-ui `NumberField` (or at minimum `/forms` `Input` + `aria-label` + `.field-control`). Eight findings retire on one substitution, and it does **not** wait on the S-3 timeline-family evaluation.
3. **M-1** — port the parent's own edge-aware translate (`TimelineTrack.vue:44-47`) onto `:4`. Unblocks the 0%/100% frames every animation ships with.
4. **M-3** — stop signalling selection with `--primary` in a theme where `--primary === --foreground`; use a non-colour channel (a rule, a chip, a `data-state`) that also survives forced colours, and expose `aria-selected` so `accessibility.css` adopts it (closes the third limb of B-2).
5. **M-2** — derive `--caret-offset` from the marker's half-diagonal, or namespace it `--kf-caret-offset` and give it a per-state value (folds `lane-frontend.md:441`).
6. **M-4** — display and commit at the model's precision; make blur-without-change a no-op by comparing against the incoming `percent`.
7. **M-8** — give the label the same invisible ≥24px pad the diamond already has (`TimelineTrack.vue:229-241`) — copy, do not re-invent.
8. **m-2 / m-3 / m-4 / m-5 / m-7** — register, redundancy, affordance, dead prop, name. Cosmetic individually; together they are the difference between a component and a sketch.

---

### Provenance

Everything above is sourced from `/Users/mkbabb/Programming/keyframes.js` (read-only) and its installed `node_modules/@mkbabb/glass-ui/dist/` — the copy the demo already resolves against, so no upgrade is presupposed by any recommendation. Contrast figures were computed from the resolved token literals (`tokens/color-radius.css`, `tokens/dark-arm.css`, `tokens/light-dark.css`, `tokens/on-glass-fg.css`) via sRGB compositing and the WCAG relative-luminance formula, in a scratchpad script; no file in keyframes.js, glass-ui or value.js was written or mutated. No installs, no dev server, no browser. The sole write performed by this lane is this file.
