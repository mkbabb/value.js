claude-opus-5[1m]

# CHALLENGE · `KeyframeTimeline` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/KeyframeTimeline.vue` (312 lines)
**Mode** static, read-only, source-derived. No browser tooling, no installs, no dev server. Nothing in keyframes.js or glass-ui was written.
**Date** 2026-08-05.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries a falsifier and dies if the falsifier fires.

## Evidence base actually read (whole)

| file | why |
|---|---|
| `timeline/KeyframeTimeline.vue` | target |
| `timeline/components/TimelineTrack.vue` (246) | direct import — the rendered track |
| `timeline/TimelineCaret.vue` (70) | transitive — one per keyframe |
| `timeline/components/TimelineHoverPreview.vue` (38) | transitive — tooltip body |
| `timeline/CSSPasteDialog.vue` (80) | direct import ×2 |
| `timeline/composables/useTimeline.ts`, `useTimelineBuild.ts`, `useZoomPan.ts` | state + geometry |
| `timeline/timelineTypes.ts`, `timeline/index.ts` | contract + async barrel |
| `keyframes/CSSCodeEditor.vue` (229) | direct import — inline editor |
| `transport/controls-pane/RibbonBar.vue`, `transport/channel-controls/ChannelControls.vue`, `AnimationControlsGroup*` | the consumers that own the other half of this instrument's action set |
| `demo/styles/style.css`, `demo/styles/layout.css` | cascade root + `--caret-offset` |
| glass-ui **7.0.0 installed** `dist/styles/{transitions,tokens/sizing,tokens/light-dark,typography/*,utilities/*,accessibility}.css`, `dist/components/{button,card,input,_shared/field-control}` | the design-system contract |
| glass-ui **producer** `/Users/mkbabb/Programming/glass-ui/src/styles/{transitions,index}.css` | retirement provenance |
| **`keyframes.js/dist/gh-pages/assets/index-CL_QYCiO.css` + `KeyframeTimeline-C1xKzyhf.css`** | the **built artifact** (mtime `Jul 16 09:11`, one minute after the SFC's `Jul 16 09:10`) — used to settle cascade/codegen questions that source alone leaves ambiguous |

Corpus folded (not re-invented): `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom dep), **S-3** (the 666-line bespoke timeline cluster vs the unimported glass `/timeline` family), **§6.3** (98 unprefixed demo tokens, zero `--kf-*`), **§6.5** (PRM census). One lane finding is **contradicted by the tree** — see D-1.

---

## Headline

| id | severity | one line |
|---|---|---|
| **D-1** | **BLOCKER** | `<Transition name="fade-slide">` names a class set glass-ui **RETIRED**; two comment blocks cite a false line range. Zero rules ship. |
| **D-2** | **BLOCKER** | The "Add CSS" dialog says *merge*; `doAddCSS` calls the same `importCSS` that **replaces the entire keyframe set**. |
| **D-3** | **BLOCKER** | The per-keyframe percent readout is a click-only `<div>` — no role, no `tabindex`, no key handler. WCAG 2.1.1 (A). |
| D-4 | MAJOR | `previewCache` is never invalidated — the tooltip pairs the *live* percent with a *stale* capture, and the `alt` asserts the live percent. |
| D-5 | MAJOR | `opacity-50` == `--opacity-disabled: .5`. Disabled Undo/Redo are **pixel-identical** to enabled. |
| D-6 | MAJOR | Pane-action icons compute to **2.01:1** (light) / **2.46:1** (dark) — SC 1.4.11 needs 3:1. |
| D-7 | MAJOR | The scrub rail's boundary computes to **1.87:1** / **2.00:1**, its fill to **1.01:1** / **1.11:1**. The primary interactive surface has no perceivable edge. |
| D-8 | MAJOR | `h-7 w-7` defeats `--control-floor` and leaves `min-block-size` standing → **28×36 px** icon buttons (fine pointer), **28×54 px** (coarse). Not square, on a pill radius. |
| D-9 | MAJOR | `text-admin-label` (10 px, `uppercase`, tracked) on the **user's own label input** — force-uppercases typed content, trips iOS focus-zoom, ~11 chars of capacity. |
| D-10 | MAJOR | Hover preview fires on `@mouseenter` only. Keyboard focus opens the tooltip and the capture never starts. |
| D-11 | MAJOR | The zoom bar's `v-if="zoomLevel > 1"` pops in **mid-gesture** and shifts the track ≈32 px down. |
| D-12 | MAJOR | The diamond's selection/hover scale is **un-transitioned** — the scoped rule transitions `transform`; Tailwind 4.3 animates `scale`/`rotate`/`translate`. |
| D-13 | MAJOR | Tooltips render the literal registry token `Mod+Z` while the shortcuts modal renders the same string through glass-ui `formatComboParts`. |
| D-14 | MAJOR | "Clear all keyframes" and "Remove keyframe" carry no `tone="destructive"`, no confirmation, and are visually identical to Undo/Redo/Expand. |
| D-15 | MAJOR | No empty state, no expression of the ≥2-keyframe contract, `rebuild()` failure is `console.error`-only, whitespace submit is a silent no-op that leaves the dialog open. |
| D-16 | MAJOR | The **create** action lives on a different surface from the **destroy** actions; the card's own row offers no way to add a keyframe. |
| D-17 | MAJOR | Expanded diamond half-height 16.97 px (21.21 px selected) exceeds `--caret-offset: 14px` → the marker overlaps and hit-steals its own percent caret. |
| D-18…D-24 | MINOR | token redundancy · verbose slider naming · no glass focus treatment · zero forced-colors · prose/verb drift · no live-region or focus move · physical-only positioning |
| D-25…D-28 | INFO | redundant wrapper + broken indentation · identity arithmetic · hardcoded `250px` · `--caret-offset` as a global unprefixed singleton |
| **S-1…S-5** | **SUPERLATIVE** | counter-rotated hit pad · genuine slider keyboard model · correct `clip`/`visible` pairing · real `alt` text · undo at *perceived-edit* granularity |

**Defects 28 · Blockers 3 · Superlatives 5.**

---

# BLOCKERS

## D-1 · `fade-slide` is a phantom class set, and the component documents a false provenance

**BLOCKER** · `KeyframeTimeline.vue:89–96`, `:310–312`

The SFC opens the inline editor with:

```
 96:        <Transition name="fade-slide">
```

and justifies it twice, in prose that names an exact line range:

```
 89:        <!-- Selected Keyframe Editor (inline). J.W7b S1d — the transition is
 90:             glass-ui's published `.fade-slide` class set (transitions.css:23-37):
 …
 93:             rules, a near-exact re-author MISSING the PRM guard) is DELETED in
 94:             the same motion; the published classes carry the
 95:             `prefers-reduced-motion` bracket (transitions.css PRM block) the
 96:             local copy lacked. -->
```

`.fade-slide` does not exist. Three independent probes:

1. **Installed 7.0.0** — `grep -rn "fade-slide" node_modules/@mkbabb/glass-ui/dist/` → **0 hits**. `dist/styles/transitions.css` ships exactly `fade`, `tab-fade`, `pane-swap`, `metric-swap`, `dock-in`.
2. **Producer source** — `/Users/mkbabb/Programming/glass-ui/src/styles/transitions.css:22` is a tombstone:
   > `` `fade-slide` RETIRED (census-dead: 0 src/ consumers; the demo showcase tile is deleted with it). Clean break, no alias… ``
   and `glass-ui/src/styles/index.css:118` repeats it in the sheet roster.
3. **The keyframes.js build itself** — `dist/gh-pages/assets/index-CL_QYCiO.css` (571 110 chars): `'fade-slide' in s` → **False**.

Vue emits `fade-slide-enter-from` / `-enter-active` / `-leave-to` and finds no rule for any of them. The panel **snaps** in and out. What the comment calls a migration onto published, PRM-guarded classes is the deletion of four working rules in exchange for nothing; the PRM claim is vacuously true because there is no motion left to reduce.

The cited coordinate `transitions.css:23-37` is worse than wrong — it is *specific*, so the next reader will trust it and not check. That is a corpus poison, not a typo.

**Contradicts `lane-frontend.md §6.5`**, which listed this exact site under *Gaps*:
> `KeyframeTimeline.vue:94 defers to glass-ui's transitions.css PRM block. Neither carries a local guard — correct if the delegation holds, unverified statically.`

The delegation does **not** hold. The lane's hedge is now resolved to NO. (The lane's broader PRM verdict survives intact and is *strengthened* elsewhere — see S-note under D-12.)

**Falsifier** — produce any `fade-slide-*` rule reachable in the demo's built cascade: a hit in `dist/gh-pages/assets/*.css`, or a `.fade-slide` selector in any installed `@mkbabb/glass-ui/dist/**` file, or a demo-local `@layer`/scoped definition. Any one kills this. All three currently return empty.

## D-2 · The "Add CSS" dialog promises a merge and performs a full replace

**BLOCKER** · `KeyframeTimeline.vue:144–152`, `:267–279`; `composables/useTimelineBuild.ts:144–161`

Two dialogs are declared. They differ only in title, description, label and icon:

```
137:            title="Import CSS @keyframes"
138:            description="Paste CSS @keyframes to load into the timeline"
139:            button-label="Import"
…
147:            title="Add CSS @keyframes"
148:            description="Paste CSS @keyframes to merge into the timeline"
149:            button-label="Add"
```

Their handlers are the same function body:

```
267: const doImport  = (text) => { if (text.trim()) { importCSS(text); importDialogOpen.value  = false; } };
274: const doAddCSS  = (text) => { if (text.trim()) { importCSS(text); addCSSDialogOpen.value  = false; } };
```

and `importCSS` is unambiguous (`useTimelineBuild.ts:152`):

```
152:            state.value.keyframes = imported;
```

Whole-array assignment. Nothing merges. A user with a hand-built 9-frame timeline who reaches for **Add CSS** — the affordance the copy says is additive — pastes one frame and loses eight. The success toast then congratulates them: `Imported ${imported.length} keyframes` (`:155`), reporting the *incoming* count, which reads as confirmation that the addition worked.

`useRefHistory` (`useTimeline.ts:83–88`) makes this recoverable in principle, but recovery requires the user to first notice the loss, and the toast is engineered to prevent exactly that. Copy that inverts the destructiveness of an operation is a design defect regardless of the undo stack behind it.

Two identical dialogs are also a duplicated surface with no distinct job: the "Add" path is either a missing merge implementation or a redundant second door onto Import.

**Falsifier** — show any merge path: an overload/branch of `importCSS`, a second handler on the Add dialog, or a `push`/spread over the existing array. `useTimelineBuild.ts` exposes one `importCSS` and it is the assignment at `:152`; `grep -n "importCSS" KeyframeTimeline.vue` returns `:205, :269, :276` only.

## D-3 · The percent caret — one per keyframe — is a click-only `<div>`

**BLOCKER** · `TimelineCaret.vue:6–13` (rendered by `TimelineTrack.vue:97–106`, mounted by `KeyframeTimeline.vue:76–87`)

```
  6:        <div
  7:            v-if="!isEditing"
  8:            :class="[
  9:                'font-mono text-admin-label cursor-pointer select-none transition-colors …',
 …
 12:            @click.stop="startEdit"
 13:        >{{ Math.round(percent) }}%</div>
```

No `role`, no `tabindex`, no `@keydown`, no `aria-*`. `cursor-pointer` is the entire affordance. Consequences:

- **Keyboard**: unreachable. `startEdit` — the only path to *type* an exact percent — cannot be invoked without a pointer. WCAG 2.1.1 **Level A**.
- **AT**: announced as a static text node. A screen-reader user is never told this number is editable. WCAG 4.1.2 **Level A**.
- **Touch**: the tap target is the text box of a 10 px glyph run (`text-admin-label` = `--type-admin-label: 0.625rem`, `line-height: 1`) — roughly 22×10 px for `"100%"`. Below the 24×24 minimum of WCAG 2.5.8, and far below glass-ui's own `--touch-target: 2.75rem`.

The keyboard *retiming* path does exist on the sibling marker (`TimelineTrack.vue:203–214`, arrows/Home/End — see **S-2**), so this is not a component that ignored keyboards. It is one that built a good keyboard model for one control and left the adjacent control on pointer-only, with no visible reason for the asymmetry. The two controls sit 14 px apart and edit the same number.

The successor state is worse, not better: the edit `<input type="number">` (`TimelineCaret.vue:14–27`) is `w-10 h-5` = **40×20 px** — under the 24 px minimum on its short axis — at 10 px font, which additionally trips iOS focus-zoom (see D-9).

**Falsifier** — find a `role`, `tabindex`, `@keydown`, or a wrapping focusable element on this div, or an equivalent keyboard route to `startEdit` elsewhere in the tree. `TimelineCaret.vue` is 70 lines and reproduced in full above for the relevant span; `grep -rn "startEdit" demo/` returns only `TimelineCaret.vue:12,50`.

---

# MAJOR

## D-4 · `previewCache` is write-once and never invalidated; the tooltip asserts a percent the image does not show

**MAJOR** · `KeyframeTimeline.vue:216–233`, `:246–265`; `TimelineHoverPreview.vue:3–10`

```
217: const previewCache = reactive<Record<string, string>>({});
…
220: const onDiamondHover = async (kf) => {
221:     if (previewCache[kf.id] || previewLoading[kf.id]) return;
…
226:         previewCache[kf.id] = canvas.toDataURL("image/png");
```

Keyed by `kf.id`. Nothing ever deletes an entry — `grep -n "previewCache" KeyframeTimeline.vue` → `:217, :221, :226, :82` (the prop pass-down). Meanwhile the same component mutates the very thing the capture depicts:

- `onKeyframeCSSChange` (`:263`) assigns `kf.vars = newVars` and rebuilds.
- `moveKeyframe` (`:84`, via `useTimelineOps`) changes `kf.percent`.
- Undo/redo re-seat `state` wholesale (`useTimeline.ts:94–103`).

Neither touches the cache. The `id` is stable across all of them (`createKeyframeId` runs only at creation, `timelineTypes.ts:41`). So after any edit the hover shows the pre-edit render, indefinitely, with no staleness signal.

The tooltip then actively misrepresents it. `TimelineHoverPreview.vue` renders the **live** percent in the heading and on the image's accessible name:

```
  3:        <span …>{{ Math.round(keyframe.percent) }}%</span>
  8:            :alt="`Rendered preview of the keyframe at ${Math.round(keyframe.percent)}%`"
```

Move a frame from 20% → 60% and the preview reads "60%", captions itself "Rendered preview of the keyframe at 60%", and displays the 20% render. This is the instrument's only visual ground truth, and it lies.

Secondary: on capture failure (`:228–230`, empty catch) `previewLoading` resets to `false` and `previewCache` stays unset, so the guard at `:221` passes again — every subsequent hover re-runs `html2canvas` on a target already known to fail, forever, with the ghost box as the only (indistinguishable-from-"not yet captured") feedback.

**Falsifier** — find any `delete previewCache[...]`, cache-key that includes `percent`/`vars`, or a `watch` that clears it. None exists in the 312 lines or in `useTimeline*.ts`.

## D-5 · Disabled Undo/Redo are pixel-identical to enabled

**MAJOR** · `KeyframeTimeline.vue:17`, `:19`, `:33`, `:35`

```
 17:                        class="h-7 w-7 p-0 opacity-50 hover:opacity-100"
 19:                        :disabled="!canUndo"
```

From the **built** cascade:

```
index-CL_QYCiO.css : .opacity-50{opacity:.5}
index-CL_QYCiO.css : .button:disabled,.button[aria-disabled=true]{opacity:var(--opacity-disabled);cursor:not-allowed}
index-CL_QYCiO.css : --opacity-disabled:.5
```

The resting opacity the demo chose **is numerically the disabled opacity**. `hover:opacity-100` cannot differentiate them either: `.button:disabled{pointer-events:none}` means a disabled button never enters `:hover`. So at rest, and under a pointer, `canUndo === false` and `canUndo === true` render the same pixels.

What survives is `cursor: not-allowed` (a hover-only cue, absent on touch) and the native `disabled` semantics (AT-only). Sighted mouse-free users get nothing. The component's own comment (`:7–10`) calls these buttons "the discoverable affordance" for the Mod+Z bindings, "bounded by the same canUndo/canRedo history state" — the boundedness is real in the DOM and invisible on screen.

Note this is *not* a cascade-order argument that could be wrong: the two values are equal, so the finding holds no matter which declaration wins.

**Falsifier** — show a rule that gives disabled Undo an opacity ≠ 0.5 in this build (e.g. a demo `disabled:` variant, or a different `--opacity-disabled` under the Card's context). `grep -n "disabled:" KeyframeTimeline.vue` → no hits; `--opacity-disabled` appears twice in the built CSS, both `.5`.

## D-6 · Pane-action icons: 2.01:1 light / 2.46:1 dark — SC 1.4.11 requires 3:1

**MAJOR** · `KeyframeTimeline.vue:17, 33, 49, 64` (all four buttons), `:119` (the X)

`emphasis="quiet"` binds `color: var(--muted-foreground)` (built CSS: `.button[data-emphasis=quiet]{…color:var(--muted-foreground)}`). The demo then multiplies the whole button by `opacity: .5`.

Resolved hexes, taken from the built artifact:

| token | light | dark |
|---|---|---|
| `--card` | `#fdf5ec` | `#352a22` |
| `--muted-foreground` → `--neutral-5` | `#7c6650` | `#aca091` |

WCAG 2.x relative luminance, `(L₁+0.05)/(L₂+0.05)`:

| state | light | dark |
|---|---|---|
| glyph at full opacity | **5.02:1** ✓ | **5.44:1** ✓ |
| glyph at `opacity:.5` over card | **2.01:1** ✗ | **2.46:1** ✗ |

The token is fine; the `opacity-50` is what breaks it. These are icon-only commands — the glyph *is* the component's identifying visual information, so SC 1.4.11 (3:1, Level AA) is the governing threshold, not the 4.5:1 text rule.

The glass-context rebinding does not rescue it: inside a glass surface `--muted-foreground: var(--on-glass-muted)` = `#705942` (light), which composites at 50% to **2.17:1** — still short of 3:1.

**Falsifier** — a resolved backdrop materially darker than `#fdf5ec` (light) or lighter than `#352a22` (dark) behind these buttons, or a rule that raises the resting opacity. Both bindings of `--muted-foreground` were computed and both fail; the remaining unknown is the Card `tier="quiet"` surface's actual painted plate, which is **UNPROVEN-NEEDS-LIVE** for the exact figure — but the failure margin is ~1 point, not a rounding question.

## D-7 · The scrub rail has no perceivable boundary in either theme

**MAJOR** · `TimelineTrack.vue:24`

```
 24:                'timeline-track relative rounded-lg border border-border bg-muted/50 …',
```

`--muted` = `--neutral-1`, `--border` = `--neutral-4`, both from the built CSS:

| | light | dark |
|---|---|---|
| `--card` | `#fdf5ec` | `#352a22` |
| `--neutral-1` (rail fill, @50%) | `#f6f3ef` | `#1f1c19` |
| `--neutral-4` (rail border) | `#c6b49f` | `#655749` |

| measurement | light | dark |
|---|---|---|
| rail **fill** vs card | **1.01:1** | **1.11:1** |
| rail **border** vs card | **1.87:1** ✗ | **2.00:1** ✗ |
| rail border vs rail fill | 1.84:1 | 2.22:1 |

The fill is, in light mode, indistinguishable from the card it sits on — a 50% wash of `#f6f3ef` over `#fdf5ec`. The whole rail is therefore defined by a 1 px hairline at 1.87:1. SC 1.4.11 asks 3:1 for the visual boundary of an interactive control, and this rail is the instrument's *primary* interactive control: click-to-scrub, drag-to-scrub, wheel-to-zoom, pinch-to-zoom (`TimelineTrack.vue:27–34`).

`hover:bg-muted/70` (same line) raises the fill to ~1.02:1 — the hover state is not perceivable either.

The expanded mode compounds it: `KeyframeTimeline.vue:3` sets `bg-transparent border-0 shadow-none` on the Card, so in expanded mode the rail's 1 px hairline sits over an unknown backdrop with no plate behind it at all.

**Falsifier** — measure the painted rail against its painted backdrop live; if `Card tier="quiet"` composites a plate that darkens/lightens the region by ≥1 JND, the ratio moves. Direction of the problem is structural though: a 50%-alpha `neutral-1` over a `neutral-0/1`-family card cannot reach 3:1 by construction. Marked **UNPROVEN-NEEDS-LIVE** for the exact figure, CONFIRMED for the token math.

## D-8 · `h-7 w-7` yields non-square icon buttons and defeats the coarse-pointer control floor

**MAJOR** · `KeyframeTimeline.vue:14–17, 30–33, 46–49, 61–64` and `:112–115`

```
 14:                        size="sm"
 16:                        icon-only
 17:                        class="h-7 w-7 p-0 opacity-50 hover:opacity-100"
```

glass-ui's `iconOnly` is documented as *"Square geometry for an accessibly named icon command"* (`components/button/Button.vue.d.ts`). The built rule:

```
.button[data-icon-only]{inline-size:var(--button-size);block-size:var(--button-size);min-block-size:var(--button-size);padding:0}
.button[data-size=sm]{--button-size:var(--control-h-sm);…}
--control-h-sm:max(calc(2.25rem * var(--ui-scale)), var(--control-floor))
--spacing:.25rem                    →  .h-7{height:calc(var(--spacing) * 7)}  =  28px
@media (pointer:coarse){ --ui-scale:var(--ui-coarse-scale,1.5); --control-floor:var(--touch-target,2.75rem) }
```

Tailwind emits `height`/`width` — **not** `min-height`. So `h-7 w-7` overrides `block-size`/`inline-size` and leaves `min-block-size` standing:

| pointer | `--button-size` | authored | **rendered** |
|---|---|---|---|
| fine | 2.25rem = 36 px | 28×28 | **28 × 36** |
| coarse | max(3.375rem, 2.75rem) = 54 px | 28×28 | **28 × 54** |

On `border-radius: var(--radius-pill)` a 28×54 box is a vertical capsule, not the circle `iconOnly` promises. Four of them in a `gap-1` row.

Two independent losses:

1. **Proportion.** The design system's one square-geometry guarantee is broken by the override that was meant to shrink it.
2. **Touch target.** `--control-floor` exists precisely so no control drops under `--touch-target: 2.75rem` on a coarse pointer. `w-7` (28 px) is a hard px value that ignores `--ui-scale` entirely — the short axis stays 28 px on a phone. WCAG 2.5.8 (24 px) is met; glass-ui's own 44 px contract is not, and the AAA 2.5.5 target is missed by 36%.

Same defect, one size smaller, at `:114` — the Remove-keyframe `X` is `h-6 w-6 p-0` = 24 px wide × 36/54 px tall, exactly at the 2.5.8 floor with zero margin.

Same defect on the label field at `:108` — `<Input class="… h-6 …">` against `.field-control[data-kind=input]{block-size:var(--field-control-height)}` = `--control-h-md` = 40 px fine / 60 px coarse. `Input` publishes a `size` prop (`ControlSize`) for exactly this; the smallest published value is 36 px, so the component is deliberately 33% under the system's floor via a raw class rather than the axis.

**Falsifier** — show that `min-block-size` is overridden (a `min-h-*` class, a scoped rule, or `!important`), or that Tailwind 4.3 emits `min-height` for `h-*`. The built artifact says otherwise: `.h-7{height:calc(var(--spacing) * 7)}`, `.h-6{height:calc(var(--spacing) * 6)}`, and `min-block-size` appears unguarded in `.button[data-icon-only]`.

## D-9 · `text-admin-label` on the user's own label field

**MAJOR** · `KeyframeTimeline.vue:105–109`

```
105:                        <Input
106:                            v-model="selectedKeyframe.label"
107:                            placeholder="Label..."
108:                            class="font-mono text-admin-label h-6 w-32"
109:                        />
```

`text-admin-label` (glass-ui `typography/semantic.css`):

```
@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label);
                            line-height: 1; text-transform: uppercase;
                            letter-spacing: var(--type-tracking-caps); font-weight: 500; }
--type-admin-label: 0.625rem      /* 10px, fixed — the one type token with no clamp() */
```

Four consequences, each independently a defect:

1. **What you type is not what you see.** `text-transform: uppercase` is presentational only — the model keeps the authored case. Type `fadeIn`, see `FADEIN`, export `fadeIn`. The field visually contradicts its own value.
2. **iOS focus-zoom.** Safari zooms the viewport on focus of any input under 16 px computed. This is 10 px. The repo *already knows* — `components/instrument/utils/iosTextEntry.ts:10` defines `clampIOSNoZoomFontSize`, and `CSSCodeEditor.vue:137` applies it to Monaco. It is not applied here, or to the caret's `<input type="number">` (`TimelineCaret.vue:19`, also `text-admin-label`). The demo defends its 4 MB editor against a hazard it leaves open on its two small text entries.
3. **Wrong register.** `text-admin-label` is a *label* token — uppercase, tracked, `line-height: 1`, chrome-scale. It is being used for user-authored content. The system publishes `text-mono-small` (14 px, mono, real leading) for exactly this.
4. **Capacity.** `w-32` = 128 px, minus `.field-control{padding-inline:calc(1rem * var(--ui-scale))}` = 32 px, minus 3 px of 1.5 px borders → ~93 px of content box, at 10 px mono **plus** `--type-tracking-caps`. Practical capacity ≈ 11 characters. The placeholder itself renders as `LABEL...`.

**Falsifier** — a demo-side override of `text-transform`, `font-size`, or an iOS clamp reaching this input. `grep -rn "text-admin-label" demo/components/instrument/timeline/` → `KeyframeTimeline.vue:108`, `TimelineCaret.vue:9,19`, `TimelineHoverPreview.vue:17,20`; no local overrides exist in any of them.

## D-10 · The hover preview has no keyboard parity

**MAJOR** · `TimelineTrack.vue:79–83`

```
 79:                        tabindex="0"
 81:                        @pointerdown.stop="onMarkerPointerDown($event, kf.id)"
 82:                        @keydown="onMarkerKeydown($event, kf)"
 83:                        @mouseenter="emit('diamondHover', kf)"
```

The marker is deliberately focusable (`tabindex="0"`, `role="slider"`) and reka's `TooltipTrigger` opens on focus as well as hover — so a keyboard user *does* get the tooltip. But the capture that fills it is bound to `@mouseenter` alone. `onDiamondHover` never runs, `previewCache[kf.id]` stays empty, and the panel renders the fallback ghost box forever.

The consequence is a two-tier instrument: pointer users see the actual rendered frame, keyboard users see a 64×64 approximation assembled from four properties (`TimelineTrack.vue:151–158` handles only `background-color`, `opacity`, `transform`, `border-radius`), with no indication that a better preview exists.

One `@focus` handler alongside `@mouseenter` closes it.

**Falsifier** — find a `@focus`/`@focusin` on the marker, or show reka's tooltip does not open on focus for an `as-child` trigger. Lines 62–84 are the complete marker; there is no focus handler.

## D-11 · The zoom bar pops in mid-gesture and shifts the track ≈32 px

**MAJOR** · `TimelineTrack.vue:4–18`

```
  4:        <div
  5:            v-if="zoomLevel > 1"
  6:            class="flex items-center gap-2"
```

`zoomLevel` is continuous — `clamp(zoomLevel * factor, 1, 10)` on wheel (`useZoomPan.ts:51`), `Math.max(1, Math.min(10, initialPinchZoom * scale))` on pinch (`:86–89`). The moment it leaves 1.0 the row mounts: an `h-1.5` bar plus a `text-small` readout (~20 px row) plus the parent's `gap-3` (12 px) ≈ **32 px** of new content inserted *above* the track.

The track — the thing under the user's finger or cursor — jumps down 32 px on the first increment of the gesture, and jumps back up when they return to 1.0. It is a layout shift triggered by a continuous direct-manipulation input, at the exact boundary the input crosses most often.

There is no transition on the mount, and no reserved space (`v-show` + `invisible`, or a fixed-height slot, would both hold the geometry).

Secondary, same block: the zoom control has **no discoverable affordance at all**. The only indication zoom exists is the `2.4x` readout — which is `v-if`'d to appear only once you have already zoomed. There is no button, no keyboard route (`useZoomPan.ts` exposes wheel + touch only), and no hint text.

**Falsifier** — show the row is height-reserved (a wrapper with a min-height, a `v-show`, a grid track), or that `zoomLevel` is quantised so the boundary is never crossed mid-gesture. Neither: it is a `v-if` on a `ref(1)` mutated by a continuous factor.

## D-12 · The diamond's selection and hover scale are un-transitioned

**MAJOR** · `TimelineTrack.vue:65–73` + `:223–227` (scoped)

Authored intent, scoped:

```
223: .keyframe-marker {
224:     transition:
225:         transform var(--duration-fast) var(--ease-standard),
226:         border-color var(--duration-fast) var(--ease-standard);
227: }
```

The classes it is meant to animate (`:66–72`) are `-translate-x-1/2 -translate-y-1/2`, `rotate-45`, `scale-125`, `scale-on-hover`, plus a Tailwind `transition-all` on `:69`. Tailwind 4.3 does **not** write `transform` for any of them — from the built artifact:

```
.rotate-45{rotate:45deg}
.scale-125{--tw-scale-x:125%;--tw-scale-y:125%;--tw-scale-z:125%;scale:var(--tw-scale-x) var(--tw-scale-y)}
.-translate-x-1\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}
```

Individual `rotate` / `scale` / `translate` properties. `transform` is never set on this element, so `transition-property: transform, border-color` transitions a property that has no value to interpolate. Only `border-color` is live.

And the scoped rule *wins* over the two declarations that would have covered `scale`:

```
KeyframeTimeline-C1xKzyhf.css : .keyframe-marker[data-v-39fe8774]{transition:transform …, border-color …}
index-CL_QYCiO.css            : .transition-all{transition-property:all;…}
glass utilities/btn.css       : @utility scale-on-hover { scale:1; transition: scale …; &:hover{ scale:var(--scale-hover) } }
```

The scoped selector is unlayered **and** (0,2,0) — it beats both `.transition-all` and `.scale-on-hover` (0,1,0) on either the layer argument or the specificity argument, independently. Net: selecting a keyframe snaps it from 1.0× to 1.25× in one frame, and the hover scale snaps too. On an instrument whose entire job is demonstrating interpolation, the selection feedback is a step function.

`transition-all` is dead code sitting in the class list, reading as live to any maintainer.

**Falsifier** — find `.rotate-45{transform:…}` or `.scale-125{transform:…}` anywhere in `dist/gh-pages/assets/*.css` (would make `transition: transform` live), or a later-winning `transition-property` on `.keyframe-marker`. Both probes were run against the shipped bundle and returned the split-property form above. **CONFIRMED against the build artifact**, not inferred.

*Fair note, against my own interest:* glass-ui's `utilities/a11y-overrides.css` applies a global PRM clamp — `*:not([data-allow-motion]){ transition-duration:0.1s !important; transition-property: opacity,color,background-color,border-color,box-shadow !important }` — which does cover this component. So `lane-frontend §6.5`'s reading that the timeline's motion is PRM-safe by delegation is **correct for the scoped rule**; it is only D-1's `fade-slide` claim that fails. I will not stack a false PRM defect on top of a true one.

## D-13 · `Mod+Z` is a registry token, rendered to users as keyboard prose

**MAJOR** · `KeyframeTimeline.vue:25`, `:41`

```
 25:                <TooltipContent>Undo (Mod+Z)</TooltipContent>
 41:                <TooltipContent>Redo (Mod+Shift+Z)</TooltipContent>
```

`Mod` is glass-ui's platform-abstraction token from `registerShortcut` (`useControlsKeyboardShortcuts.ts:70–71` registers exactly `"Mod+Z"` / `"Mod+Shift+Z"`). No keyboard has a `Mod` key.

The demo already owns the correct rendering. glass-ui publishes `formatComboParts(raw: string): string[]` (`dist/composables/keyboard/useKeyboardShortcuts.d.ts:30`), and `KeyboardShortcutsModal.vue:26–30` uses it to render the *same two shortcuts* as platform-correct `<kbd>` chips:

```
 26:                                    v-for="(part, i) in formatComboParts(shortcut.raw)"
 29:                                >{{ part }}</kbd>
```

So one surface shows `⌘` `Z` and another shows the literal string `Mod+Z`, for one binding, in one app. Plus a typographic drift: chips vs parenthetical plain text.

**Falsifier** — show `formatComboParts` cannot be reached from this SFC (it can: `@mkbabb/glass-ui/keyboard` is already consumed at three demo sites per `lane-frontend §3.2`), or that "Mod" is a real key label on some target platform.

## D-14 · Destructive commands are visually indistinguishable from navigation

**MAJOR** · `KeyframeTimeline.vue:43–57` and `:111–120`

```
 45:                    <Button size="sm" emphasis="quiet" icon-only
 50:                        aria-label="Clear all keyframes"
 51:                        @click="clear()"
```

`clear()` (`useTimelineBuild.ts:185–188`) empties the array and nulls the animation. No confirmation, no hold-to-confirm, no undo prompt. It renders with the **same** `size`, `emphasis`, geometry, and opacity as Undo, Redo, and Expand-timeline, three commands that destroy nothing. The only differentiator is a 14 px trash glyph at 2.01:1 (D-6).

glass-ui's `Button` publishes exactly the axis for this — `tone?: Tone` with a `destructive` member, wired in the built CSS (`.button[data-tone=destructive]{--button-tone:var(--destructive);…}`, and for quiet emphasis `.button[data-emphasis=quiet]:not([data-tone=neutral]){color:var(--button-tone)}`). It is unused here. Same for the Remove-keyframe `X` at `:111–120`.

The one-tap-wipe-the-instrument command sits 4 px from the Redo button in a `gap-1` row of 28 px targets.

**Falsifier** — show a confirmation path, or that `tone="destructive"` is unavailable/unstyled for `emphasis="quiet"`. The built rule above styles precisely that combination.

## D-15 · Empty, single-frame, and error states are all unexpressed

**MAJOR** · `KeyframeTimeline.vue:76–87`, `:264`, `:267–279`; `useTimelineBuild.ts:34–51`

Four uncovered states, each decidable from source:

1. **Empty (0 keyframes).** `sortedKeyframes` is `[]`; `TimelineTrack` renders ticks, a playhead, and nothing else. No copy anywhere in the 666-line cluster explains what the surface is or how to populate it. The card's four buttons are: disabled, disabled, "clear nothing", and "expand nothing".
2. **Single frame.** `rebuild()` returns early below two keyframes (`useTimelineBuild.ts:35–38`) and sets `animation.value = null`. Scrubbing moves the playhead and animates nothing. The ≥2 contract surfaces exactly once, as a toast, and only if the user happens to press Export (`:120–123`). Until then it is an invisible rule.
3. **Rebuild failure.** `useTimelineBuild.ts:47–50` catches, logs to `console.error`, and nulls the animation. `KeyframeTimeline.vue:264` calls `rebuild()` un-awaited from the inline CSS editor's change handler. So a value the engine rejects silently kills the animation while the editor keeps showing the text that killed it. Every other failure in this file toasts (`:121, :138, :148, :157`); this one — the one reachable by typing — does not.
4. **Whitespace submit.** `doImport`/`doAddCSS` (`:267–279`) guard on `text.trim()` and, when it is empty, do nothing *and leave the dialog open*. No message, no field-level invalid state — the button simply appears broken. `CSSPasteDialog.vue` has no `invalid`/error slot at all.

**Falsifier** — find an empty-state block, a `v-if="!sortedKeyframes.length"` branch, a toast/aria-live on rebuild failure, or an error affordance in `CSSPasteDialog.vue` (80 lines, read whole — there is none).

## D-16 · The create action is on a different surface from the destroy actions

**MAJOR** · `KeyframeTimeline.vue:6–73`, `:296–307`; `RibbonBar.vue:67–104`

`useTimeline` returns `addKeyframe`. `KeyframeTimeline` does not destructure it (`:194–210`). The only creation path is `snapshot`, which the component exposes upward (`:297`) for a *different* surface to render:

```
RibbonBar.vue:76:  @click="activeTimelineRef?.snapshot?.()"     Snapshot
RibbonBar.vue:84:  @click="activeTimelineRef?.openImportDialog?.()"   Import
RibbonBar.vue:92:  @click="activeTimelineRef?.exportCSS?.()"    Export
RibbonBar.vue:100: @click="activeTimelineRef?.openAddCSSDialog?.()"   Add CSS
```

reached through `ChannelControls → AnimationControlsGroup.activeTimelineRef → ControlsPaneWrapper → RibbonBar`. So one instrument's verbs are split across two surfaces, and the split is not by kind:

| surface | verbs | emphasis | shape | height |
|---|---|---|---|---|
| the card itself | Undo · Redo · **Clear** · Expand | `quiet`, `opacity-50` | icon-only, 28 px | 28×36 |
| RibbonBar | **Snapshot** · Import · Export · Add CSS | `secondary` | pill + text label | `h-8` = 32 px |

The card owns *destroy* and not *create*. Two visual languages for one toolbar. And the consequence lands on the state from D-15: with an empty timeline, the surface that shows the emptiness has no control that can fix it, and the control that can is a ribbon the user must already have discovered — one that is itself gated on `storedControls.selectedControl === 'timeline'` (`RibbonBar.vue:69`).

**Falsifier** — find an add/capture control inside `KeyframeTimeline.vue`'s own template. Lines 6–73 are the complete action row: Undo, Redo, Trash, Expand.

## D-17 · The expanded diamond overlaps and hit-steals its own percent caret

**MAJOR** · `TimelineTrack.vue:66–72`, `:97–106`; `TimelineCaret.vue:4`; `demo/styles/layout.css:139`

Geometry, fully determined by the source:

- Marker centre: `absolute top-1/2 -translate-y-1/2` (`:66`).
- Marker box: `expanded ? 'w-6 h-6' : 'w-4 h-4'` (`:67`) with `rotate-45` (`:68`).
- Selected: `scale-125` (`:71`).
- Caret origin: `top: calc(50% + var(--caret-offset))` (`TimelineCaret.vue:4`), `--caret-offset: 14px` (`layout.css:139`, `:root`).

Half-height of a square rotated 45° is `s·√2/2`:

| state | side | half-height | vs 14 px offset |
|---|---|---|---|
| collapsed | 16 px | 11.31 px | 2.7 px clearance |
| collapsed + selected | 20 px | 14.14 px | **0.14 px overlap** |
| **expanded** | 24 px | 16.97 px | **2.97 px overlap** |
| **expanded + selected** | 30 px | 21.21 px | **7.21 px overlap** |

The caret text is 10 px with `line-height: 1`, so a 7.21 px overlap covers ~72% of its glyph height. And the marker carries `z-controls` (`:66`) while the caret carries no z-index, so the marker paints *over* the caret and intercepts pointer events in the overlap band — which is the band containing the caret's `@click.stop="startEdit"` (D-3's only entry point).

So: select a keyframe in expanded mode and its percent label is both occluded and click-blocked by the marker that selected it.

The collapsed hit pad worsens it slightly: `.keyframe-marker::before` is an axis-aligned 24×24 pad centred on the marker (`:233–241`), extending 12 px below centre — 2 px short of the caret at 14 px, in the collapsed case. Expanded, the marker's own body already exceeds it.

**Falsifier** — show `--caret-offset` is overridden in the timeline's subtree (it is not: `grep -rn "caret-offset" demo/` → `layout.css:139` definition, `TimelineCaret.vue:4` consumption, nothing else), or that the marker's `z-controls` does not establish paint order over the caret, or that the caret is not clipped/covered because of a stacking context I have not accounted for. Marked **UNPROVEN-NEEDS-LIVE** for the visual, CONFIRMED for the arithmetic.

---

# MINOR

**D-18 · redundant token stacking** — `KeyframeTimeline.vue:108` `class="font-mono text-admin-label …"`; `TimelineCaret.vue:9` and `:19` likewise. `text-admin-label` already sets `font-family: var(--font-mono)`. Three sites carrying a no-op class that suggests the token does less than it does. *Falsifier:* show `text-admin-label` omits `font-family` — it does not (`typography/semantic.css`).

**D-19 · the slider's accessible name is an instruction and duplicates its value** — `TimelineTrack.vue:75`: `` `Keyframe at ${Math.round(kf.percent)}% — drag or arrow to move` ``. The name changes on every 1% step, so each arrow press re-announces the full instruction. Instructions belong on `aria-describedby`; the value belongs on `aria-valuenow` (already present, `:76`). Also missing `aria-valuetext`, so AT reads `43`, not `43 percent`. *Falsifier:* an AT recording showing the instruction is not re-read on value change.

**D-20 · the bespoke markers get no glass focus treatment** — glass-ui publishes `.focus-ring:focus-visible{outline:none;border-radius:var(--radius-pill);box-shadow:var(--focus-ring-shadow)}` and `--focus-ring-shadow`; there is no global `*:focus-visible` rule in the installed cascade (probed across `components.css`, `utilities/base.css`, `glass/*.css`). The `role="slider"` diamonds therefore fall back to the UA ring on a 16 px rotated square, sitting beside glass `Button`s that carry a designed one. Not a WCAG 2.4.7 failure (a ring is present), a conformance and consistency one. *Falsifier:* find a global focus-visible rule, or a `.focus-ring` on the markers.

**D-21 · zero forced-colors coverage** — `grep -rn "forced-colors" demo/` → **0 hits** across all 206 demo files. The timeline encodes its entire state in `background-color`: playhead (`bg-primary`, `TimelineTrack.vue:53`), selected marker (`bg-primary border-primary`, `:71`), unselected marker (`bg-background border-foreground/50`, `:72`), rail (`bg-muted/50`, `:24`). Under Windows High Contrast, backgrounds are replaced by system colors and selected-vs-unselected collapses. glass-ui's `accessibility.css` covers only `aria-selected`/`aria-checked`/`aria-current`-bearing elements — none of which these markers carry. *Falsifier:* find a forced-colors block reaching this cluster, or show the markers carry an ARIA state attribute glass-ui's rule matches.

**D-22 · prose and terminology drift** — three verbs for one concept: `"Clear all keyframes"` (`:50`), `"Remove keyframe"` (`:116`), `"Delete keyframe"` (`useControlsKeyboardShortcuts.ts:65`, the label shown in the shortcuts modal for the same action as the X button). Two ASCII-ellipsis placeholders doing filler work — `"Label..."` (`:107`) and `"Capturing..."` (`TimelineHoverPreview.vue:19`), the latter with no live region so it is announced to nobody. Two dialog titles that differ by a word for identical behaviour (D-2). *Falsifier:* a glossary or copy deck that fixes Clear/Remove/Delete as three distinct operations — they are not; `removeKeyframe` backs both the X and the Delete shortcut.

**D-23 · the inline editor appears with no announcement and no focus move** — `:96–129`. Selecting a marker by keyboard (`TimelineTrack.vue:212`) reveals a whole editing region below the fold, containing a text input and a 250 px Monaco instance. Focus stays on the diamond; nothing is announced; the region has no `aria-live`, no heading, no `role="region"`/`aria-label`. The action button row (`:6–73`) likewise has no group label. *Falsifier:* find a focus-management call or a live region in the 312 lines.

**D-24 · positioning is physical-only** — every geometry binding in the cluster uses `left` and `-translate-x-*`: ticks (`TimelineTrack.vue:41`), tick-label edge cases (`:46`, incl. `-translate-x-full`), playhead (`:54`), markers (`:80`), caret (`TimelineCaret.vue:4`). A time axis staying LTR under `dir="rtl"` is defensible — but nothing in the tree *declares* that intent, while the surrounding chrome (`justify-end` at `:6`, `gap`, the Card padding) would mirror. The result would be a mirrored toolbar over an unmirrored axis, by accident rather than decision. *Falsifier:* a `dir` declaration, a logical-property migration, or a written ruling that the axis is LTR-invariant. **UNPROVEN-NEEDS-LIVE** for the visual outcome.

---

# INFO

**D-25** — `:2` wraps the Card and two `CSSPasteDialog`s in `flex flex-col gap-3`; both dialogs are renderless in place (reka teleports `DialogContent`, and neither declares a `DialogTrigger`), so the `gap-3` governs a single child. Indentation is broken across the same span: `<Card>` at col 4 (`:3`), `</CardContent>` at col 8 (`:131`), `</Card>` at col 4 (`:132`), the dialog comment at col 4 (`:134`) but the dialogs at col 8 (`:135`, `:145`).

**D-26** — `TimelineTrack.vue:12–13`: `` `${(panOffset / 100) * 100}%` `` and `` `${(100 / zoomLevel / 100) * 100}%` `` — identity arithmetic left in style bindings.

**D-27** — `:125` hardcodes `height="250px"` on the inline `CSSCodeEditor`, inside a card whose expanded mode drops to `p-2 px-0` and goes transparent. A px constant in the one place the layout is most variable.

**D-28** — `--caret-offset: 14px` is declared on `:root` (`layout.css:12` opens the block, `:139` declares it) for exactly one consumer. This is `lane-frontend §6.3`'s flat-namespace hazard instantiated: a generic, unprefixed global for a single-component offset. Worth recording precisely, though: the timeline cluster **defines zero custom properties of its own** and reads exactly one demo-owned token — the rest (`--duration-fast`, `--ease-standard`) are glass-ui's. Its exposure to the namespace collision surface is one name.

---

# SUPERLATIVES (L-18, running the other way)

Each of these must also survive its falsifier, and each did.

**S-1 · the counter-rotated hit pad** — `TimelineTrack.vue:229–241`. A 16 px diamond cannot meet a 24 px target minimum without growing. The solution grows an invisible pad instead:

```
233: .keyframe-marker::before {
236:     position: absolute; top: 50%; left: 50%;
238:     width: 24px; height: 24px;
240:     transform: translate(-50%, -50%) rotate(-45deg);
```

The `rotate(-45deg)` is the part that shows real thought: the parent is `rotate-45`, so an un-counter-rotated pad would be a 24 px *diamond* (33.9 px diagonal, 17 px inradius) — the wrong shape and the wrong measure. Counter-rotating yields a genuinely axis-aligned 24×24 box, which is what WCAG 2.5.8 measures. The comment states exactly this and is correct. *Falsifier:* the pad would be inert under `pointer-events: none`, clipped by an `overflow: hidden` ancestor, or displaced by a non-positioned parent — none apply (parent is `absolute`, track is `overflow-y-visible`, no pointer-events reset). *Limit, stated honestly:* 24 px is the WCAG floor, not glass-ui's own `--touch-target: 2.75rem`, and the pad is a hard px value that does not track `--ui-scale`. Good, not complete.

**S-2 · a real keyboard model for retiming** — `TimelineTrack.vue:74–82`, `:198–214`. `role="slider"` + `tabindex="0"` + correct `aria-valuenow/min/max` + arrows in both axes + Shift for a 10× step + Home/End to the rail ends + `preventDefault` scoped to handled keys only (`:210–211`, the early return before `preventDefault`) + clamping on emit (`:213`). That is the full ARIA slider keyboard contract, hand-built, on a bespoke marker. Most hand-rolled timelines ship drag-only. *Falsifier:* unreachable by Tab, unhandled Home/End, `preventDefault` on unhandled keys, or unclamped emit — all four checked, all four correct.

**S-3 · `overflow-x-clip overflow-y-visible`** — `TimelineTrack.vue:24`. The only pairing that actually works. `overflow-x: hidden` with `overflow-y: visible` would compute the y-axis to `auto` and clip the tick labels sitting at `-top-5` above the rail; `clip` is the one value the spec exempts from that coercion. Chosen correctly, without a comment claiming credit. *Falsifier:* show the tick labels are clipped, or that `clip` coerces the paired axis — the spec's `clip` exemption is exactly why this pair is legal.

**S-4 · a real `alt`** — `TimelineHoverPreview.vue:8`: `` `Rendered preview of the keyframe at ${…}%` ``. Descriptive, generated from live state, not a filename and not `""`-by-default. (D-4 attacks its *truthfulness*, which is a cache defect, not an authoring one — the sentence is the right sentence.) *Falsifier:* a decorative-image argument would demand `alt=""`; this image carries information the surrounding text does not, so a description is correct.

**S-5 · undo at the granularity of a perceived edit** — `useTimeline.ts:77–88`. `useRefHistory(state, { deep: true, clone: true, capacity: 50, eventFilter: debounceFilter(100) })`, bound over the *one* centralized state ref rather than a hand-rolled per-op undo registry. The `deep`+`clone` pairing is necessary (the ops mutate in place — `kf.percent`, `kf.vars`, `push/splice` — so aliased snapshots would restore nothing) and the debounce is the actual UX decision: it makes one undo step equal one edit the user *perceives* as an edit, not one keystroke. The comment argues for it in those terms and the argument is right. *Falsifier:* remove `clone` and undo silently no-ops; remove the debounce and a 40-character CSS edit becomes 40 undo steps. Both failure modes are real and both are pre-empted.

---

## Corpus reconciliation

| lane finding | this challenge |
|---|---|
| `lane-frontend §6.5` — *"KeyframeTimeline.vue:94 defers to glass-ui's transitions.css PRM block… correct if the delegation holds, unverified statically."* | **CONTRADICTED.** The delegation does not hold — `.fade-slide` is retired in the producer and absent from both the installed package and the shipped bundle (**D-1**). The lane's hedge resolves to NO. |
| `lane-frontend §6.5` — PRM coverage generally | **UPHELD and extended.** glass-ui's `utilities/a11y-overrides.css` global clamp does cover the scoped marker transition. I decline to claim a PRM defect that the tree disproves (noted under **D-12**). |
| `lane-frontend S-3` — the 666-line bespoke cluster vs the unimported glass `/timeline` family, verdict *evaluate, not mechanical swap* | **UPHELD, with the cost now itemised.** D-3/D-7/D-8/D-12/D-17/D-20/D-21 are all defects of hand-rolled geometry and hand-rolled state chrome. `dist/components/timeline/geometry.d.ts` exists to own the percent arithmetic that `TimelineCaret.vue:4` and `useZoomPan.ts:9–15` re-author. The lane's caution stands — keyframe-editing semantics do exceed the primitive — but the "evaluate" column now has a price tag. |
| `lane-frontend §3.1` — 21/73 subpath utilisation | **CONFIRMED at this component.** `KeyframeTimeline` reaches root + `/forms` + `/tooltip` and misses `/timeline`, `/keyboard` (**D-13**), `/labeled-field` (**D-9**), `/skeleton` (**D-15**) — four unreached subpaths, each corresponding to a defect above. |
| `lane-frontend §6.3` — 98 unprefixed demo tokens, zero `--kf-*` | **NARROWED.** This cluster defines none and consumes one (`--caret-offset`, **D-28**). Its collision exposure is a single name. |
| `lane-frontend F-1` — glass-ui phantom dependency | **Not re-litigated**; it is the precondition for every glass claim here. All glass evidence above is taken from the *installed* `dist/` and from the *shipped build*, so nothing here depends on resolving F-1 first. |

## Method notes / limits

- No browser was opened. Every ratio is computed from hexes read out of the shipped stylesheet, using the WCAG 2.x relative-luminance formula. Where a live surface could shift a figure (Card `tier="quiet"` glass compositing) the claim is marked **UNPROVEN-NEEDS-LIVE** and the *direction* of the finding is defended separately from its magnitude — D-6 and D-7 only.
- Cascade and codegen questions that source cannot settle (layer order, Tailwind 4.3 transform codegen, `min-block-size` survival) were settled against `dist/gh-pages/assets/*.css`, built one minute after the SFC's last edit. Where that artifact is the evidence, the finding is marked CONFIRMED rather than inferred: **D-1, D-5, D-8, D-12**.
- Findings in `TimelineTrack.vue`, `TimelineCaret.vue`, `TimelineHoverPreview.vue`, `CSSPasteDialog.vue` are reported because `KeyframeTimeline` mounts them and owns their props (`:expanded`, `:selected-keyframe-id`, the dialog copy). Each is attributed to its own file:line.
- `RibbonBar.vue` / `ChannelControls.vue` / `AnimationControlsGroup.vue` were read to establish D-16 only; no defect is filed against them.
