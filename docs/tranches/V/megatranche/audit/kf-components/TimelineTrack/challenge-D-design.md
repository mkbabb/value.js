claude-opus-5[1m]

# CHALLENGE · TimelineTrack · axis D (DESIGN)

**Target** `keyframes.js/demo/components/instrument/timeline/components/TimelineTrack.vue` (246 L)
**Date** 2026-08-06 · **Mode** static + token arithmetic only (no browser; L-x)
**Verdict** **DEFECTIVE** — 1 BLOCKER · 14 MAJOR · 12 MINOR · 5 SUPERLATIVE

## Read set (whole, read-only)

| file | why |
| --- | --- |
| `demo/components/instrument/timeline/components/TimelineTrack.vue` | target |
| `demo/components/instrument/timeline/composables/useZoomPan.ts` | imported — tick ladder, zoom/pan math |
| `demo/components/instrument/timeline/TimelineCaret.vue` | imported — rendered per keyframe |
| `demo/components/instrument/timeline/components/TimelineHoverPreview.vue` | imported — tooltip body |
| `demo/components/instrument/timeline/timelineTypes.ts` | imported — `TimelineKeyframe` |
| `demo/components/instrument/timeline/KeyframeTimeline.vue` | sole parent; owns `scrubT`, `previewCache` |
| `demo/components/instrument/transport/channel-controls/ChannelControls.vue` | sole mount site; owns the scroll container + `TooltipProvider` |
| `demo/DESIGN.md` | the demo's stated design law (§§1,2,4,7,9,10) |
| `demo/styles/{style,design-idioms,layout}.css` | token authorities |
| `@mkbabb/glass-ui/dist/styles/{accessibility,utilities/a11y-overrides,theme/bridges,typography/scale,tokens/*}.css` | consumed token + a11y contract |
| `demo/scenes/spring/SpringTarget.vue` | the exemplar TimelineTrack's own comment claims to mirror |

## Corpus fold (hitherto, not re-invented)

- **S-3** (`lane-frontend.md:325-346`) — "timeline cluster → glass-ui `/timeline` family, AMBER". It already records that `TimelineTrack` imports glass-ui *only for leaf chrome* (`Tooltip*`) and that "the timeline geometry itself is entirely bespoke". Every conformance finding below (D-6, D-7, D-14, D-m3) is a **cost line under S-3**, not a new census row. S-3 says the cluster "wants its own spec, not a mechanical swap" — this challenge supplies the design half of that spec.
- **F-1** (`lane-frontend.md:15,54`) — glass-ui is a phantom dependency. Every token ratio computed here is read out of the *installed* `node_modules/@mkbabb/glass-ui@7.0.0`. If F-1 is fixed to a different version, re-run the arithmetic in §Appendix.
- **lane-frontend.md:489** — "`KeyframeTimeline.vue:94` defers to glass-ui's `transitions.css` PRM block. Neither carries a local guard — correct if the delegation holds, **unverified statically**." **I close this open note in the affirmative — see SUP-5.** This is a contradiction of the lane's uncertainty, not of its claim.
- **Memory law** (`feedback-proof-idiom-retired`) — `DESIGN.md §10` names nine `proof:*` witnesses (`styling-idioms`, `colocation`, `style-file-ceiling`, `font-census`, `brittleness`, `idioms`, …); `package.json:50-51` retains only `proof:publish` and `proof:owner-golden`. **This is deliberate owner policy, NOT a defect, and I do not report it as one.** It is stated here only because it is the mechanism: the design law below is *stated* and *unwitnessed*, which is why drift is invisible to CI. Every law citation below is to `DESIGN.md` prose, never to a gate.

---

# BLOCKER

## D-1 · The primary verb of the instrument — scrubbing — has no keyboard path anywhere in the tree (WCAG 2.1.1, Level A)

**Severity** BLOCKER · **Provenance** `TimelineTrack.vue:21-35` (track element), `TimelineTrack.vue:129-134` (emits), `KeyframeTimeline.vue:296-307` (`defineExpose`)

The track is the scrubber. `onTrackPointerDown` / `onTrackPointerMove` (`TimelineTrack.vue:168-186`) are the *only* writers of `update:scrubT`. The track element itself carries **no `role`, no `tabindex`, no `@keydown`** — it is a bare `<div>` with six pointer/touch listeners.

I traced every other writer of `scrubT`:

```
$ grep -rn "scrubT" demo/ --include=*.vue --include=*.ts
… KeyframeTimeline.vue:78,83,197 · useTimeline.ts:30,46,54,108
  useTimelineOps.ts:17,28 · useTimelineBuild.ts:27,54,58,96
  TimelineTrack.vue:54
```

`useTimelineBuild.ts:54` (`scrubT.value = clamp(t,0,1)`) is reached only through `scrubAndCapture`, which `KeyframeTimeline.vue:220-233` calls on **`@mouseenter`**. `KeyframeTimeline`'s `defineExpose` (`:296-307`) publishes `snapshot / openImportDialog / openAddCSSDialog / exportCSS / removeSelectedKeyframe / selectedKeyframeId / undo / redo / canUndo / canRedo` — **`scrubT` and `scrubTo` are not exposed**, so no ancestor can drive it either. The three files in the demo that register a `keydown` listener (`OrbitalDrag.vue`, `useTypedTrigger.ts`, `KeyframesAddDialog.vue`, plus `useSquareKeyboard.ts` / `useToolbarKeyboard.ts` / `usePlayActuation.ts` / `useKfPillTabs.ts`) touch none of it.

The second path to the same fact is dead the same way: `TimelineCaret.vue:6-13` renders the percent readout as a `<div>` with `@click.stop="startEdit"` — no `tabindex`, no `role`, no key handler. A keyboard user can neither scrub nor open the caret editor.

The component's own comment (`TimelineTrack.vue:199`) claims the keyboard work "mirrors SpringTarget's arrow/Home/End template." The mirror is inverted where it matters. `SpringTarget.vue:62-72` puts `role="slider"` + `aria-label` + `aria-valuenow/min/max` + `tabindex="0"` + `@keydown` **on the rail** — the drag surface itself. TimelineTrack put them on the *markers* and left the rail bare. Moving a keyframe is keyboard-operable; **operating the timeline is not**.

**Falsifier** — produce any code path, in any repo, that writes `KeyframeTimeline`'s `scrubT` (or `useTimelineBuild`'s `scrubTo`) in response to a `KeyboardEvent`. One such path kills this claim outright. A *different* control that scrubs a *different* animation clock (the transport dock's playback progress) does not: it is not this timeline's `scrubT`.

---

# MAJOR

## D-2 · Typographic hierarchy is inverted: the furniture is 1.6× the data

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:45` vs `TimelineCaret.vue:9` / `TimelineHoverPreview.vue:3`

Tick labels ride `text-small`. Keyframe percent readouts — the *data* — ride `text-admin-label`.

```
--type-small        = clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)   [typography/scale.css]
--type-admin-label  = 0.625rem                                     [typography/scale.css]
```

| viewport | tick label (`text-small`) | caret readout (`text-admin-label`) | ratio |
| --- | --- | --- | --- |
| 375 px | 14.00 px (min clamp) | 10 px | **1.40×** |
| 1280 px | 16.00 px | 10 px | **1.60×** |
| 1920 px | 17.60 px | 10 px | **1.76×** |

The scale graduations — background reference furniture that exists to be *read past* — are set 40–76 % larger than the keyframe positions the user is actually manipulating. `text-small` is the body-copy rung; it is used for prose elsewhere in the same tree (`ChannelControls.vue:160` "Timeline expanded below"). A tick label is a caption, not body copy: `text-mono-caption` (0.75–1 rem) or `text-micro` is the rung, and both are published (`@utility text-mono-caption`, `@utility text-micro`).

**Falsifier** — show that `text-small` resolves to ≤ `--type-admin-label` at any viewport in the demo's supported range, or that the tick labels are intended as the primary readout and the carets as furniture.

## D-3 · Numeric readouts break the demo's own Mono-as-data law (DESIGN.md §1)

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:17` (`{{ zoomLevel.toFixed(1) }}x`), `TimelineTrack.vue:48` (`{{ tick }}%`)

`DESIGN.md §1` (lines 25-29): *"**Mono-as-data.** Fira Code is reserved for literals, **tabular-number readouts**, code/keyboard content."* Both of this component's readouts carry **neither `font-mono` nor `tabular-nums`** — they render in Plus Jakarta Sans with proportional figures.

The whole rest of the tree obeys, including this component's own sibling and child:

| call site | classes |
| --- | --- |
| `TimelineCaret.vue:9` | `font-mono text-admin-label … tabular-nums` |
| `TimelineHoverPreview.vue:3` | `text-mono-caption font-semibold tabular-nums` |
| `KeyframeTimeline.vue:102` | `text-mono-caption font-semibold tabular-nums` |
| `SequenceScrubber.vue:16` | `text-mono-caption tabular-nums` |
| `SequenceAxis.vue:10` | `text-mono-caption text-muted-foreground tabular-nums` |
| `SpringTarget.vue:48,139` · `StartingStyleTarget.vue:17,74` · `SpringTrace.vue:12` | `text-mono-caption … tabular-nums` |

`zoomLevel.toFixed(1)` updates continuously under a 1.05-per-tick wheel gesture; without `tabular-nums` every digit change re-measures. `shrink-0` (`:17`) protects the *sibling's* layout, not the glyph run's own width.

**Falsifier** — a `font-roles.json` clause that exempts tick/zoom readouts from §1, or evidence that Plus Jakarta Sans ships tabular figures by default (it does not; `font-variant-numeric` is unset here and `--font-text` is the proportional stack).

## D-4 · The tick ladder's pitch swings 9.4× and collapses to a guaranteed label collision at zoom ≥ 8

**Severity** MAJOR · **Provenance** `useZoomPan.ts:23-40`, `TimelineTrack.vue:37-49`

`visibleTicks` picks the step from four zoom bands (`useZoomPan.ts:24-27`). The on-screen tick pitch is `step(z) × z`, expressed as a percentage of the rail:

| zoom | step | window (`100/z`) | **pitch (% of rail)** | pitch @ 400 px rail |
| --- | --- | --- | --- | --- |
| 1.0 | 25 | 100 % | 25 % | 100 px |
| 2.99 | 25 | 33.4 % | **74.8 %** | 299 px |
| 3.0 | 10 | 33.3 % | 30 % | 120 px |
| 4.99 | 10 | 20.0 % | 49.9 % | 200 px |
| 5.0 | 5 | 20 % | 25 % | 100 px |
| 7.99 | 5 | 12.5 % | 39.9 % | 160 px |
| **8.0** | **1** | 12.5 % | **8 %** | **32 px** |
| 10.0 | 1 | 10 % | 10 % | 40 px |

Two defects in one table. (a) The ladder is not a ladder: pitch ranges 8 %–74.8 %, a **9.4× swing**, and every band *widens* monotonically until it snaps. A tick ladder's whole job is approximately-constant pitch. (b) At `z = 8` the pitch drops **5×** on a 0.01 zoom increment (7.99 → 8.00), and lands at 32 px on the rail.

A `100%` label at `text-small` 16 px in Jakarta Sans measures ≈ 41 px (3 lining digits ≈ 0.55 em + `%` ≈ 0.85 em); `42%` ≈ 32 px. Against a 32 px pitch with `whitespace-nowrap` (`:45`) and no collision avoidance, **labels overlap from zoom 8 upward**. The rail is `--rail-width: clamp(25rem, 33svi, 32rem)` (`design-idioms.css:47`) = 400–512 px, minus `CardContent p-4` (`KeyframeTimeline.vue:4`) → 368–480 px usable. Collision is unavoidable on the entire rail range; the crossover needs a rail ≳ 510 px.

The `1` rung is simply the wrong choice — `2` or `5` at `z ≥ 8` gives 16 %/40 % pitch and no collision.

**Falsifier** — measure a rendered `100%` tick label at 1280 px viewport; if its advance width is < 32 px the collision claim dies for that label. **Scope caveat:** in `expanded` mode the timeline teleports to `#timeline-expanded-target` (`ChannelControls.vue:186`), a bottom bar of unknown width; if that bar is ≳ 510 px wide the collision does not occur there. The collapsed rail placement is the load-bearing case and it does collide. `[UNPROVEN-NEEDS-LIVE: the expanded-bar width]`

## D-5 · The zoom viewport indicator fails WCAG 1.4.11 in both arms (1.72 : 1 / 2.23 : 1)

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:8-15`

The mini range bar is the *only* rendering of pan position — which slice of 0–100 % is on screen. Computed from the installed tokens (full derivation in the Appendix):

| element | spec | light | dark | floor |
| --- | --- | --- | --- | --- |
| viewport fill vs its own rail | `bg-primary/40` on `bg-muted/50` | **1.72 : 1** | **2.23 : 1** | 3 : 1 (1.4.11) |
| rail outline vs plate | `border-border/30` | **1.19 : 1** | **1.26 : 1** | 3 : 1 |

Both are state indicators for a user-interface component, squarely inside 1.4.11. The `/40` alpha on a 6 px-tall (`h-1.5`) pill with a 1 px border leaves a **4 px** inner fill at 1.7 : 1 — below the perceptual floor of most displays, let alone the normative one. The `1.0x` text readout beside it passes, but it reports *zoom*, not *pan*; nothing else reports pan.

**Falsifier** — the track sits on a `Card cartoon tier="quiet"` glass plate whose resolved backdrop I cannot compute statically. If that plate resolves materially darker than `--background`, the `/40` fill's ratio rises. Compute the plate's used background and re-run; if either arm reaches 3 : 1, this claim dies for that arm. **`--glass-tint-strength-aa: 0%` is forced to zero for `[data-tier="quiet"]` by `style.css:196-203`, which is why I used `--background` as the substrate.**

## D-6 · The track's hover affordance is a null: 1.01 : 1

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:24`

`bg-muted/50 hover:bg-muted/70 transition-all duration-fast` on the primary scrub surface. `--muted` (`--neutral-1`) is `hsl(38 26% 95%)` light / `hsl(28 12% 11%)` dark, against `--background` (`--neutral-0`) `hsl(40 30% 98%)` / `hsl(24 9% 4%)`. The 20-point alpha step moves the composite by:

```
light:  rgb(248,247,244) → rgb(247,245,242)   CR 1.01 : 1
dark:   rgb( 21, 19, 17) → rgb( 25, 22, 20)   CR 1.03 : 1
```

The hover state is imperceptible, and `transition-all duration-fast` (0.2 s, via the `--transition-duration-fast` bridge — the utility *is* real, see NOT-A-DEFECT below) spends 200 ms easing it. The track's only surviving hover signal is `cursor-pointer`, which `DESIGN.md §7` explicitly disqualifies: *"Cursor-only or home-only hints are not sufficient."*

The same arithmetic says the plate is barely there at rest: `bg-muted/50` against `--background` is **1.03 : 1** light / **1.07 : 1** dark. The rail's entire body is drawn by its `border-border` outline (1.94 : 1 light) alone.

**Falsifier** — same substrate caveat as D-5: the delta is `0.20 × (muted − substrate)`. On a substrate far from `--muted` (e.g. mid-grey) the step becomes visible. Resolve the quiet-glass plate's used background; if `|L(plate50) − L(plate70)|` yields ≥ 1.2 : 1 this claim weakens. **`[UNPROVEN-NEEDS-LIVE: exact ratio]` — the structural claim (a 20-point alpha step on a token 3 % from its own substrate) survives regardless.**

## D-7 · The only focusable elements carry no focus affordance, against the demo's declared single contract

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:64-84` (`tabindex="0"` at `:79`, no `focus-ring`), `design-idioms.css:73-79`, `SpringTarget.vue:63`

`design-idioms.css:73-79` states it as law:

> *"The demo-owned `:focus-visible` contract — the **SINGLE** keyboard-focus affordance: `.focus-ring` paints glass-ui's `--focus-ring-shadow` on `:focus-visible`."*

The keyframe markers are the only focusable nodes this component renders. They do not apply `.focus-ring`, and the scoped block (`:217-245`) declares no `:focus-visible` rule. The exemplar the component names in its own comment does apply it (`SpringTarget.vue:63`: `class="spring-rail stage-field-x focus-ring …"`).

The cost compounds twice:

1. The UA default ring lands on a `rotate-45` element, so keyboard focus is announced as a **rotated diamond outline** on an already-diamond mark — the least legible possible indicator on the most rotated element in the component.
2. glass-ui's forced-colors block keys its focus outline on the class name:
   `a11y-overrides.css` → `@media (forced-colors: active) { .focus-ring:focus-visible, .interactive-item:focus-visible, … { outline: 2px solid Highlight; outline-offset: 2px } }`.
   Without `.focus-ring`, the marker forfeits the published high-contrast focus outline too.

**Falsifier** — a global `:focus-visible` rule in the demo or glass-ui cascade that paints `--focus-ring-shadow` on *all* focusable elements. I grepped `accessibility.css`, `utilities/a11y-overrides.css`, `design-idioms.css`, `style.css`: every `:focus-visible` rule found is **class-scoped**. Produce an unscoped one and this dies.

## D-8 · Selection state is invisible to AT and to forced-colors — and one missing attribute forfeits both

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:70-73`, `glass-ui/dist/styles/accessibility.css`

Selection is rendered *only* as `bg-primary border-primary scale-125` vs `bg-background border-foreground/50`. The marker exposes no `aria-selected`, no `aria-current`, no `aria-pressed`, no `data-state`. A screen-reader user cannot determine which keyframe is selected — which matters, because the inline editor below (`KeyframeTimeline.vue:96-129`, label field + CSS editor + Remove button) operates on exactly that selection.

The second half is the sharp one. glass-ui's `accessibility.css` gives high-contrast and forced-colors treatment **for free**, keyed on precisely those attributes:

```css
@media (prefers-contrast: more) {
  :is([aria-current]:not([aria-current="false"]), [aria-selected="true"],
      [aria-pressed="true"], [aria-checked="true"],
      [data-state="checked"], [data-state="on"])
  { border-color: currentColor !important; border-style: solid !important; border-width: 2px !important; }
}
@media (forced-colors: active) { /* same selector list */ { border-color: Highlight !important; … } }
```

`aria-selected="true"` on the marker would have earned the `Highlight` border in HCM and the `currentColor` border under `prefers-contrast: more` with zero CSS. Its absence costs the AT state *and* both contrast affordances at once.

**Partial mitigation, stated honestly:** `scale-125` is a transform, and transforms survive forced-colors, so a selected marker *is* 25 % larger in HCM. Selection is therefore degraded, not erased — which is why this is MAJOR and not a blocker.

**Falsifier** — show `aria-selected`/`data-state` reaching the marker through `TooltipTrigger as-child` prop merging (reka's TooltipTrigger contributes `data-state` for *tooltip open*, not for selection — that would be a false positive, not a rescue).

## D-9 · The playhead disappears in forced-colors mode

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:52-55`

```html
<div class="absolute top-0 h-full w-0.5 bg-primary z-content pointer-events-none" …>
```

A 2 px div whose entire visual identity is `background-color`, with no border, no outline, no `forced-color-adjust`. Forced-colors mode replaces author background colors with system colors; the playhead resolves to the same `Canvas` as the plate behind it and vanishes. The current scrub position — the instrument's primary readout — becomes unreadable.

Everything else in the component survives HCM by construction and by accident: tick lines are `border-l` (borders map to `CanvasText`), diamonds carry `border-2` *and* a `scale` delta. The playhead alone is the one paint-by-background element, and it is the one that matters most.

`glass-ui/accessibility.css`'s forced-colors block covers only `[aria-current] / [aria-selected] / [aria-pressed] / [aria-checked] / [data-state]` and `.hairline-accent / .glass-dock` — none of which the playhead carries. There is no local `@media (forced-colors: active)` anywhere in the timeline module.

**Falsifier** — a `forced-color-adjust: none` or a forced-colors rule reaching this node; or a demonstration that Chromium/Edge preserve `background-color` on a 2 px element in forced-colors mode (they do not).

## D-10 · `expanded` costs 80 px of height and buys 8 px of diamond

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:25` (`expanded ? 'h-32' : 'h-12'`), `TimelineTrack.vue:67` (`expanded ? 'w-6 h-6' : 'w-4 h-4'`)

Expanding grows the track **48 px → 128 px (2.67×)**. I read the whole template for what fills the new space:

| child | vertical behaviour under `expanded` |
| --- | --- |
| tick lines `:37-49` | `top-0 h-full` — stretch, no new content |
| tick labels `:43-48` | `-top-5` — pinned above the track, unchanged |
| playhead `:52-55` | `top-0 h-full` — stretches, unchanged |
| markers `:62-94` | `top-1/2 -translate-y-1/2` — **centred**; only 16 → 24 px |
| carets `:97-106` | `top: calc(50% + var(--caret-offset))` — **centred + 14 px** |

There is no slot, no `v-if="expanded"` branch, no lane rendering. **~62 % of the expanded box (≈ 80 px of 128 px) is empty `bg-muted/50` plate**, and the plate is 1.03 : 1 against its own background (D-6) — so it is 80 px of nothing at all. The user paid a full teleport into a bottom bar (`ChannelControls.vue:186`) and a mode toggle (`KeyframeTimeline.vue:58-72`) for a 1.5× diamond.

An expanded timeline is where per-property lanes, easing curves between keyframes, or a value ribbon belong. As shipped, `expanded` is a proportion regression: a container grown 2.67× around content that did not grow.

**Falsifier** — a consumer that teleports content *into* the expanded track (I found none; the Teleport at `ChannelControls.vue:186` moves the whole `KeyframeTimeline`, it does not fill the track), or a design intent where the empty band is a deliberate drop-target.

## D-11 · Wheel and touch are trapped over the track inside a scrolling pane

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:31` (`@wheel.prevent`), `TimelineTrack.vue:24` (`touch-none`), `ChannelControls.vue:19,85`

`@wheel.prevent` cancels **every** wheel event over the track. `onWheel` (`useZoomPan.ts:43-62`) acts only under `ctrlKey || metaKey` (zoom) or `shiftKey && zoomLevel > 1` (pan). A plain wheel scroll therefore does *nothing* and is *also* cancelled.

The timeline's ancestors are scroll containers: `ChannelControls.vue:19` and `:85` are both `class="flex-1 min-h-0 overflow-y-auto flex flex-col pb-1"`, and the comment at `ChannelControls.vue:183-185` confirms the timeline is deliberately "inside the scrollable area". So a wheel scroll over the collapsed 48 px track — or the expanded 128 px one — is a dead zone in the middle of the controls pane.

`touch-none` (`touch-action: none`, `:24`) is the same trap for touch: a one-finger vertical swipe anywhere on the track is swallowed. Scrubbing is a *horizontal* gesture; `touch-action: pan-y` preserves vertical page scroll while leaving horizontal drag to the pointer handlers. The pinch handler (`onTouchStart/Move`, `useZoomPan.ts:75-92`) is the honest counter-argument for `none`, but it is a two-finger gesture and does not require sacrificing one-finger vertical scroll.

**Falsifier** — show that neither `overflow-y-auto` ancestor ever actually overflows when the timeline is mounted (the pane also hosts a 250 px `CSSCodeEditor` — `KeyframeTimeline.vue:123-127` — so it does), or that `.prevent` on a no-op branch is required by a pointer-capture interaction I have not traced.

## D-12 · The documented 24 px hit pad contradicts the repo's own declared floor, and its 2.5.8 spacing exception is unmet

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:229-241` + `:57-61` (the claims), `design-idioms.css:81-85`, `glass-ui/utilities/a11y-overrides.css` (`@utility touch-hit-area`), `TimelineTrack.vue:204` (`step = 1`)

The component asserts, twice, that 24 px "meets the touch-target minimum" (`:60-61`, `:229-232`). The repo says otherwise, in its own idiom sheet:

```css
/* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */
.tap-floor { min-height: 44px; min-width: 44px; }        /* design-idioms.css:81-85 */
```

and glass-ui's published equivalent agrees: `@utility touch-hit-area { … min-width: var(--touch-target, 2.75rem) }` with `--touch-target: 2.75rem` = **44 px** (`tokens/sizing.css`). The component hand-rolled a **24 px** version of a published 44 px utility and documented the smaller number as "the minimum".

24 px is the WCAG **2.5.8** (AA, WCAG 2.2) figure, not 2.5.5's 44 px — but 2.5.8 grants 24 px only under an *undisturbed-circle spacing* exception, and that exception is unmet here. Nothing enforces minimum separation between keyframes: the arrow step is **1 %** (`:204`), the pointer path clamps only to 0–100 (`:165`), and `moveKeyframe` accepts any percent. Two keyframes at 41 % and 42 % on a 400 px rail sit **4 px** apart; their 24 px pads overlap by 20 px, and the later sibling in DOM order wins every hit. Under 2.5.8's own rules that is an undersized target.

**Falsifier** — a de-duplication or minimum-separation rule in `useTimelineOps`/`moveKeyframe` that forbids sub-N% spacing (I read `timelineTypes.ts` and the `moveKeyframe` call chain and found none), or a ruling that 2.5.8 AA supersedes `.tap-floor`'s stated 2.5.5 intent for this surface.

## D-13 · The hover tooltip resizes under the pointer, twice, and hides its payload behind an unreachable scroll

**Severity** MAJOR · **Provenance** `TimelineHoverPreview.vue:5-25`, `TimelineTrack.vue:86-93`

`TooltipContent side="top"` (`:86`) grows *upward*, so any height change moves the panel under a stationary cursor. The body changes height twice on a single hover:

1. `v-else-if` ghost box `w-16 h-16` (64 px, `:12-16`) renders immediately.
2. `v-if="loading"` "Capturing..." is a **separate `v-if`, not a `v-else`** (`:17-19`) — it adds a *third* row alongside the ghost, so the panel is ghost + status + var list.
3. `previewSrc` arrives → the `v-if` branch swaps to `<img class="w-36 h-auto">` (`:5-10`) of **unconstrained height**, and the status row unmounts.

Two reflows, both upward, both under the cursor, with the second's magnitude set by an image whose aspect ratio is whatever `html2canvas` captured (`KeyframeTimeline.vue:224-226`). No `min-height`, no `aspect-ratio`, no width/height attributes on the `<img>`.

The payload is worse. The variable list (`:20-25`) is `max-h-24 overflow-y-auto` — a **96 px scroll region inside a tooltip** — with `truncate` on every row (`:21`). So `transform: translate3d(0px, -40px, 0)` renders as `transform: transl…`, and any keyframe with more than ~5 properties (the default capture set is **17**, `timelineTypes.ts:20-38`) hides the rest behind a scrollbar that no keyboard user can reach (`role="tooltip"` is not focusable) and that a pointer user reaches only if hoverable-content is enabled.

**Falsifier** — glass-ui's `Tooltip` does forward reka's `disableHoverableContent` (present in `dist/tooltip-OxciiZm6.js:13,96`), and reka's default is `false`, so **pointer users can probably reach the scroll**. If that holds, the pointer half of the scroll claim dies; the keyboard half and both reflows stand. `[UNPROVEN-NEEDS-LIVE: whether the content stays open across the gap]`

## D-14 · Spacing is expressed as coupled magic numbers in scoped CSS, against DESIGN.md R4

**Severity** MAJOR · **Provenance** `TimelineTrack.vue:218-221` and `TimelineTrack.vue:45`

```css
.timeline-track { margin-top: 1.25rem; margin-bottom: 1rem; }   /* :218-221 */
```
```html
<span class="text-small absolute -top-5 …">{{ tick }}%</span>   <!-- :45 -->
```

`-top-5` is `-1.25rem`. The `margin-top: 1.25rem` exists **solely** to reserve the band that `-top-5` hangs the tick labels into. They must stay equal. Nothing in either location says so — they are 174 lines apart, one in a template class string, one in an uncommented scoped rule, both raw literals. Change either and the tick row silently collides with the button row above (`KeyframeTimeline.vue:6-73`) or floats with dead space.

`DESIGN.md §10 R4` is explicit: *"Utilities belong in templates; scoped CSS is token-plain."* Two margins are exactly what Tailwind spacing utilities are for — `mt-5 mb-4` in the class list at `:24` states the same fact adjacent to its partner. The `--caret-offset: 14px` token in `layout.css:139` shows the component's *other* geometry constant was homed correctly under §6; these two were not.

**Falsifier** — evidence that `margin-top` on a flex item cannot be expressed by a Tailwind utility here (it can), or a documented reason the scoped rule must out-specify a utility. Note R4 has **no surviving gate** (`package.json:50-51`) — by owner policy, per the corpus fold — so this is a law-conformance claim, not a gate failure.

## D-15 · No empty state, and no visible instruction for six distinct gestures (DESIGN.md §7)

**Severity** MAJOR · **Provenance** whole template; `DESIGN.md:147-158`

With `sortedKeyframes: []` — the state every user starts in — the component renders 5 tick labels, a playhead at 0 %, and a plate that is 1.03 : 1 against its own background. There is no message, no call to action, no indication that keyframes are the point.

The gesture surface is dense and entirely undocumented in the UI:

| gesture | handler | discoverable? |
| --- | --- | --- |
| drag to scrub | `:27-29` | no |
| ctrl/⌘ + wheel to zoom | `useZoomPan.ts:44-56` | **no** |
| shift + wheel to pan | `useZoomPan.ts:57-60` | **no** |
| two-finger pinch to zoom | `useZoomPan.ts:75-92` | **no** |
| drag a diamond | `:81` | cursor only (`cursor-grab`) |
| arrow / Home / End on a diamond | `:203-214` | `aria-label` only (AT only) |

`DESIGN.md §7` (lines 149-157): *"Every manipulable scene has one concise verb line in `.stage-legend`: what to drag, what motion is produced, and what release/keyboard action does. … **Cursor-only or home-only hints are not sufficient.**"* The only affordance prose here is a hover tooltip (cursor-only, and it shows a preview, not verbs) and an `aria-label` (AT-only). Three of the six gestures have **no** signal in any modality.

**Falsifier** — §7 says "scene", and the timeline is an instrument control panel, not a scene; if the owner rules §7 scene-scoped, the law citation narrows to a design-quality argument. **The empty-state gap and the three fully-undiscoverable gestures survive that ruling regardless.**

---

# MINOR

## D-m1 · `transition-all` on the marker is dead code, and the selection fill snaps

`TimelineTrack.vue:69` puts `transition-all` in the marker class list; `TimelineTrack.vue:223-227` declares a scoped `.keyframe-marker { transition: transform …, border-color … }`. Vue scoped CSS compiles to `.keyframe-marker[data-v-hash]` — specificity (0,2,0) — which out-specifies the `.transition-all` utility (0,1,0). The scoped two-property list wins; `transition-all` never applies. Consequence: on selection, `transform` (`scale-125`) eases over `--duration-fast` while `background-color` (`bg-background` → `bg-primary`) **snaps**. Two intents, one silently dead, one visible inconsistency.
**Falsifier** — show the utility layer ordering after the scoped block *and* at equal-or-higher specificity (it is neither: `@layer utilities` sits below unlayered scoped styles, and the attribute selector adds a component).

## D-m2 · The tick-label edge clamp threshold is mis-tuned by ~2.5×

`TimelineTrack.vue:46` clamps to `translate-x-0` at ≤ 2 % and `-translate-x-full` at ≥ 98 %, otherwise `-translate-x-1/2`. Half a 16 px `100%` label is ≈ 20 px = **5 %** of a 400 px rail. A tick at 3 % gets `-translate-x-1/2`, putting its left edge at `12 − 20 = −8 px`, clipped by the parent's `overflow-x-clip` (`:24`). The 2 % threshold is only sufficient for rails ≳ 1025 px. Occurs at zoom ≥ 3 (when non-multiples of 25 appear).
**Falsifier** — measure the label advance; if ≤ 16 px the 2 % threshold suffices at 400 px.

## D-m3 · Tick marks compute 1.19 : 1 — the "Tick marks" are effectively unrendered

`TimelineTrack.vue:40` `border-l border-border/30` computes **1.19 : 1** light / **1.26 : 1** dark against the plate. The comment at `:36` calls them "Tick marks"; what the user sees is floating labels with no graduations. `DESIGN.md §4` names `.stage-field-x` as *"the time/position axis"* idiom (`design-idioms.css:205-211`), which paints at full `var(--border)` — 1.94 : 1, 63 % more ink. The hand-roll is justified at zoom > 1 (the idiom's quarter-marks are fixed), but at zoom 1 the component's ticks *are* 0/25/50/75/100 — the exact marks `.stage-field-x` paints, re-authored at 30 % strength.
**Falsifier** — hairline gridlines are conventionally faint; if 1.19 : 1 is legible at the demo's target gamma the aesthetic claim weakens (the idiom-bypass claim does not). Graded MINOR because the labels carry the information.

## D-m4 · The accessible name discards the user's own label and duplicates the value

`TimelineTrack.vue:75`: `` `Keyframe at ${Math.round(kf.percent)}% — drag or arrow to move` ``. `TimelineKeyframe.label` exists (`timelineTypes.ts:11`) and the user can set it (`KeyframeTimeline.vue:105-109`), but it never reaches the accessible name — so with ten keyframes, AT users differentiate by percent alone while sighted users read labels. The percent is also already in `aria-valuenow` (`:76`), so the label double-announces it; `aria-valuetext` (e.g. `"42 percent"`) is the right home and is absent.

## D-m5 · `update:*` emit and emit style both violate DESIGN.md §9.2

`TimelineTrack.vue:130` declares `(e: "update:scrubT", value: number): void`. `DESIGN.md §9.2` (line 207): *"**Models:** every `update:*` channel is a `defineModel`; hand-written `update:*` emits are **banned**."* Same violation at `TimelineCaret.vue:43` (`update:percent`). §9.2 also requires *"Emits: **named tuples only**"* — both files use the call-signature overload form.

## D-m6 · `const props` is never read

`TimelineTrack.vue:120` binds `defineProps` to `props`; the script body (`:136-214`) references `trackEl`, `draggingKeyframeId`, `emit`, `clamp`, `positionToPercent` — **never `props.`**. The template auto-unwraps, so the binding is dead. `DESIGN.md §9.2` asks for reactive destructure with inline defaults; `KeyframeTimeline.vue` (which *does* read `props.expanded`) shows the intended form.

## D-m7 · Two import specifiers for the same three components inside one module

`TimelineTrack.vue:113` — `import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui"`.
`KeyframeTimeline.vue:172` — the same three from `"@mkbabb/glass-ui/tooltip"`.
Same module, same components, two entry points. `DESIGN.md §10 R1` makes the barrel the one contract; the subpath form is the narrower (better) one, and the root-barrel form pulls the full index. Vite will dedupe by resolved file, so this is a consistency and bundle-surface concern, not a correctness one.
**Falsifier** — a build report showing a single shared chunk for both specifiers.

## D-m8 · Dead arithmetic in the zoom bar

`TimelineTrack.vue:12` `` `${(panOffset / 100) * 100}%` `` ≡ `panOffset%`. `:13` `` `${(100 / zoomLevel / 100) * 100}%` `` ≡ `100/zoomLevel%`. Both identities. The values are *correct* (left = pan start, width = 1/zoom of the domain), which is why this is MINOR — but the round trip through /100 ×100 reads as a units bug that isn't one, and invites a "fix" that would introduce one.

## D-m9 · Copy defects

- `:75` "drag or arrow to move" — "arrow" verbed; "use the arrow keys" is the idiom.
- `TimelineHoverPreview.vue:18` "Capturing..." — three periods rather than an ellipsis, and a status message with no `aria-live`, so AT never hears it.
- `TimelineHoverPreview.vue:21` `truncate` on every var row means the tooltip's stated purpose (show me this keyframe's values) is defeated for any value longer than ~24 characters — which is most `transform`/`box-shadow`/`filter` values in the default capture set.
- `TimelineHoverPreview.vue:24` "No properties" (italic) is a **correctly-handled empty state** — the one this component's own track lacks (D-15).

## D-m10 · `TimelineCaret`'s number input is unnamed and 20 px tall

`TimelineCaret.vue:14-27`: `<input type="number" class="… w-10 h-5 …">` with no `aria-label`, no `<label>`, no `placeholder`, no `title`. That is an unnamed form control — WCAG 4.1.2, Level A. Its box is **40 × 20 px**: below WCAG 2.5.8's 24 px AA floor and far below `.tap-floor`'s 44 px (`design-idioms.css:81-85`). Reported here because `TimelineTrack.vue:97-106` renders it, and graded MINOR **only to avoid double-counting** — this is `TimelineCaret`'s own defect and belongs at BLOCKER/MAJOR in that component's challenge. The `commitEdit`-on-blur + Enter / `cancelEdit`-on-Escape pattern (`:58-69`) is otherwise correct.

## D-m11 · Layout shift when zoom crosses 1.0

`TimelineTrack.vue:5` `v-if="zoomLevel > 1"` mounts/unmounts the zoom bar inside a `gap-3` flex column (`:2`). Crossing 1.0 — one 1.05 wheel tick from rest — shifts the entire track and everything below it by ~6 px + 12 px gap. `clampPan`'s floor is `zoom ≥ 1` so it cannot oscillate, which is why this is MINOR rather than MAJOR; reserving the row (`opacity-0` / `visibility: hidden`) removes it entirely.

## D-m12 · RTL: all positioning is physical

`left: ${…}%` (`:12, 41, 54, 80`), `-translate-x-1/2` / `-translate-x-full` / `translate-x-0` (`:46, 66`), `left-0` (`:45`), `-top-5` (`:45`), `left: 50%` in the scoped `::before` (`:237`), and `TimelineCaret.vue:4`'s `left`/`translateX`. No logical properties (`inset-inline-start`), no `[dir]` handling. Graded **INFO-level MINOR**: I grepped the demo for `dir="rtl" | dir="auto" | :dir= | rtl:` and found **zero** occurrences, so the demo declares no RTL surface today. This is a latent cost of the bespoke geometry (S-3), not a live defect.

---

# SUPERLATIVE (L-18, both ways)

## SUP-1 · `overflow-x-clip overflow-y-visible` is the one legal pairing, and it is the right one

`TimelineTrack.vue:24`. `clip` is the **only** overflow value that may pair with `visible` without the other axis computing to `auto` (CSS Overflow 3). The component needs exactly that asymmetry: the panned rail must be clipped horizontally (ticks and carets routinely compute positions outside 0–100 % at zoom > 1 — `useZoomPan.ts:34-38` deliberately emits one step beyond each edge), while the tick labels at `-top-5` (`:45`) and the carets at `top: calc(50% + 14px)` (`TimelineCaret.vue:4`) must spill *vertically* past the track box. A reflexive `overflow-hidden` decapitates the tick row and truncates every caret. This is a deliberate, correct, non-obvious choice.
**Falsifier (runs both ways)** — if `overflow-x: clip` were unsupported in a target browser the fallback is `visible` on both axes and the panned ticks leak; Baseline support since 2022 makes this moot.

## SUP-2 · The counter-rotated hit pad is subtle geometry, correctly reasoned and correctly commented

`TimelineTrack.vue:233-241`. The pad is a child of a `rotate-45` parent, so it inherits that rotation; `rotate(-45deg)` on the pad returns its box to screen-axis alignment. Without the counter-rotation, the guaranteed axis-aligned hit region of a 24 px rotated square is its **inscribed** square, `24/√2 = 17.0 px` — 29 % smaller. The comment states exactly this ("it counter-rotates so its box is axis-aligned, not a 24px diamond") and the geometry checks out.

It is also **better than the published utility it duplicates**: glass-ui's `@utility touch-hit-area` sets `pointer-events: none` on its `::before`, which makes that pad decorative — it cannot extend a hit region. This hand-roll correctly omits `pointer-events`, so the pseudo-element genuinely hit-tests to its originating element. The *size* is wrong (D-12); the *mechanism* is better than the library's.
**Falsifier** — show a browser that does not hit-test a background-less, absolutely-positioned `::before` (none do; hit testing depends on box geometry and `pointer-events`, not on paint).

## SUP-3 · A complete slider keyboard template on a bespoke control, sharing one clamp authority with the pointer path

`TimelineTrack.vue:198-214`. Arrows on both axes, Shift for a ×10 coarse step, Home/End to the rail ends, `preventDefault` only on handled keys (`:211` — so Tab, Escape and browser shortcuts survive), and `emit("select")` before `emit("moveKeyframe")` so the inline editor follows the keyboard. It routes through the **same** `clamp(next, 0, 100)` (`:213`) that the pointer path uses (`:165`) — one clamp authority, two modalities, no drift. Bespoke controls in demo code almost never get this far.
**Falsifier (runs both ways)** — the template is real but incomplete against its own model: PageUp/PageDown (the ARIA slider convention for the coarse step) are unhandled, and `SpringTarget.vue:255-264` is the pattern's other instance, so the "mirrors SpringTarget" claim at `:199` is true for the *markers* and false for the *rail* (D-1).

## SUP-4 · Every primary read-path contrast passes, in both arms

Computed from the installed tokens (Appendix), against the `--background` substrate:

| element | light | dark | floor | |
| --- | --- | --- | --- | --- |
| tick label `text-muted-foreground` | 5.05 : 1 | 7.21 : 1 | 4.5 : 1 (1.4.3) | pass |
| playhead `bg-primary` | 4.66 : 1 | 7.67 : 1 | 3 : 1 (1.4.11) | pass |
| diamond border `border-foreground/50` | 3.30 : 1 | 4.48 : 1 | 3 : 1 (1.4.11) | pass |
| selected diamond `bg-primary` | 4.66 : 1 | 7.67 : 1 | 3 : 1 | pass |

Nothing in the primary read path is under floor — and the light-arm diamond border at 3.30 : 1 shows the `/50` alpha was chosen with some margin awareness rather than by feel. The failures found above (D-5, D-6, D-m3) are all in *secondary* chrome; the instrument's actual readouts hold.
**Falsifier (runs both ways)** — the diamond border's 3.30 : 1 has only 10 % headroom over the 1.4.11 floor; any darkening of the plate substrate, or a drop from `border-2` to `border`, pushes it under. It passes, narrowly.

## SUP-5 · PRM honesty is real — closing lane-frontend.md:489's open note

The census recorded that `KeyframeTimeline.vue:94` *"defers to glass-ui's `transitions.css` PRM block. Neither carries a local guard — correct if the delegation holds, **unverified statically**."* I can verify it. `demo/styles/style.css:3` imports `@mkbabb/glass-ui/styles` → `styles/index.css` → `@import "./accessibility.css"` → `@import "./utilities/a11y-overrides.css"`, which carries an unconditional blanket bracket:

```css
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important; }
  [data-allow-motion]      { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
                             transition-duration: .01ms !important; }
}
```

The rule is `*`-scoped with `!important`, so it out-ranks every layer. Applied to this component: the marker's `transition: transform …` (`:225`) is stripped (`transform` is not in the allowed property list), the track's `transition-all duration-fast` (`:24`) is narrowed to the five safe properties and capped at 0.1 s, and the `scale-125`/`scale-on-hover` *end states* still apply — which is correct, since PRM removes motion, not information. **The delegation holds. `TimelineTrack` is PRM-honest by consumption, and the census's open question resolves in its favour.**
**Falsifier (runs both ways)** — the delegation is *inherited*, not authored: it survives only as long as `styles/index.css` keeps importing `accessibility.css`, and F-1 (glass-ui unlocked in `package-lock.json`) means that import is not pinned. The property is real today and unguaranteed tomorrow.

---

# NOT A DEFECT (claims I built and then killed)

Recorded so the next auditor does not re-file them.

1. **`duration-fast` is a phantom Tailwind utility.** *Killed.* Tailwind v4 resolves `duration-*` from the `--transition-duration-*` namespace (`tailwindcss/dist/lib.js`: `themeKeys/valueThemeKeys: ["--transition-duration"]`), and glass-ui's `theme/bridges.css` declares `@theme inline { … --transition-duration-fast: var(--duration-fast); … }`. The class resolves to 0.2 s. Same for `text-small`, `text-admin-label`, `text-mono-caption`, `scale-on-hover` (all `@utility` definitions in glass-ui) and `z-content`/`z-controls` (`--z-index-content`/`--z-index-controls` bridges).
2. **The Teleport breaks the `TooltipProvider` context.** *Killed.* `ChannelControls.vue` wraps in `<TooltipProvider>` and Vue's provide/inject follows the component tree, not the DOM tree; `<Teleport>` moves DOM only.
3. **Selection is entirely lost in forced-colors.** *Downgraded, not killed* — `scale-125` is a transform and survives HCM, so selection degrades rather than vanishes. See D-8.
4. **The `::before` pad cannot receive pointer events because it has no background.** *Killed.* Hit testing depends on box geometry and `pointer-events`, not on paint.
5. **The missing `proof:*` gates are a regression.** *Killed by owner law* — `feedback-proof-idiom-retired` records the owner deleting the grep-based `proof:*` idiom as "overfit junk". Their absence is policy.
6. **`z-content` on the playhead is below the markers' `z-controls`, so markers occlude the playhead.** *Not filed* — this is the documented and correct ordering (`DESIGN.md §4`: content 10 < controls 20); a keyframe marker occluding a 2 px playhead is intended layering, not a defect.

---

# Appendix · contrast derivation

Method: HSL/OKLCH → sRGB → WCAG relative luminance → `(L₁+0.05)/(L₂+0.05)`. Alpha composited as `fg·α + bg·(1−α)` in sRGB (matching how the browser composites `bg-x/50`). Tokens read from the installed `@mkbabb/glass-ui@7.0.0`.

```
LIGHT (:root, color-scheme: light)         DARK (.dark)
--background --neutral-0 hsl(40 30% 98%)   hsl(24 9% 4%)
--muted      --neutral-1 hsl(38 26% 95%)   hsl(28 12% 11%)
--border     --neutral-4 hsl(32 26% 70%)   hsl(30 16% 34%)
--muted-fg   --neutral-5 hsl(30 22% 40%)   hsl(34 14% 62%)
--foreground             hsl(24 10% 10%)   hsl(30 14% 90%)
--primary = --accent-kf  oklch(.56 .17 295) oklch(.74 .13 305)   [style.css:131-141]

plate = bg-muted/50 over --background  →  light rgb(248,247,244) · dark rgb(21,19,17)

                                            light    dark
tick label   muted-fg on plate               5.05     7.21   (≥4.5 pass)
tick line    border/30 on plate              1.19     1.26   (D-m3)
diamond bdr  foreground/50 on plate          3.30     4.48   (≥3 pass)
playhead     primary on plate                4.66     7.67   (≥3 pass)
zoom fill    primary/40 on plate             1.72     2.23   (≥3 FAIL — D-5)
zoom rail    border/30 on plate              1.19     1.26   (≥3 FAIL — D-5)
track bdr    border vs --background          1.94       —
plate/50 vs plate/70 (hover delta)           1.01     1.03   (D-6)
plate/50 vs --background                     1.03     1.07   (D-6)
```

Substrate caveat (applies to every row): the track sits inside a `Card cartoon tier="quiet"` glass plate. `style.css:196-203` forces `--glass-tint-strength-aa: 0%` for `[data-tier="quiet"]`, which is why `--background` is the right substrate approximation — but the plate's own translucency is not fully resolvable statically. Rows whose verdict would flip under a materially different substrate are marked `[UNPROVEN-NEEDS-LIVE]` in their findings (D-5, D-6). The rows that *pass* (SUP-4) pass with margin in both arms and do not flip.

---

**Counts** — defects 27 (1 BLOCKER · 14 MAJOR · 12 MINOR) · superlatives 5 · killed-before-filing 6.
