claude-opus-5[1m]

# CHALLENGE · `TimelineHoverPreview` · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/components/TimelineHoverPreview.vue` (38 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Posture:** the component is presumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and a false defect is worse than a missed one.

---

## 0. Read set (whole files, read-only)

| file | why |
|---|---|
| `demo/components/instrument/timeline/components/TimelineHoverPreview.vue` | the target |
| `demo/components/instrument/timeline/timelineTypes.ts` | its ONE import (`TimelineKeyframe`), + `DEFAULT_CAPTURE_PROPERTIES` |
| `demo/components/instrument/timeline/components/TimelineTrack.vue` | the sole call-site (`:87–93`); owns `ghostStyle`, the tooltip envelope, the hover wiring |
| `demo/components/instrument/timeline/KeyframeTimeline.vue` | owns `previewCache` / `previewLoading` / `onDiamondHover` (`:216–233`) |
| `demo/components/instrument/timeline/utils/snapshotCapture.ts` | proves what `keyframe.vars` actually CONTAINS (computed values) |
| `demo/styles/font-roles.json` | the T.D4 mono/data-register contract the component invokes |
| `demo/styles/design-idioms.css` | the demo's owned idiom vocabulary (what was available and not used) |
| glass-ui 7.0.0 `dist/tooltip-OxciiZm6.js`, `dist/styles/typography/{semantic,scale,utilities}.css`, `dist/styles/tokens/{offsets,color-radius,dark-arm,light-dark,on-glass-fg,scheme-motion}.css`, `dist/styles/glass/{ladder,a11y-fallback}.css` | the surface + type + colour tokens this component's classes resolve against |

**Hitherto corpus folded:** `lane-frontend.md` §4 (roster: this file is the 38-line **`b`** row — no glass-ui import), §5 **S-3** (the 666-line bespoke timeline cluster; this component is the "marker-tooltip slot" line, verdict *evaluate*), §6.3 (98 unprefixed demo tokens, **`--kf-*` count = 0**), §6.5 (13 PRM sites), **F-1** (glass-ui is a phantom dependency — every glass-token claim below is therefore sourced from the *installed* `node_modules/@mkbabb/glass-ui@7.0.0`, exactly as the lane did).

**Where I contradict the corpus:** nowhere on facts. One **extension**: lane-frontend §6.3 flags the flat unprefixed namespace as a *collision* hazard. This component shows the *other* half of the same hazard — it declares zero tokens and therefore cannot collide, but it consumes glass's `--muted-foreground` **through a glass surface that redefines it** (`glass/ladder.css`), and the authored two-tone hierarchy silently inverts (D-5). Flat namespace + surface-scoped redefinition is a two-sided defect, not one-sided.

---

## 1. What the component actually resolves to (the substrate, established before any claim)

Three facts do most of the work below. All three are read off the installed glass-ui, which is what `demo/styles/style.css:3` (`@import "@mkbabb/glass-ui/styles"`) compiles into the demo's Tailwind build.

**(a) `text-admin-label` is a SHOUTING LABEL rung, not a data rung.**
`node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css`:

```css
@utility text-admin-label {
  font-family: var(--font-mono);
  font-size: var(--type-admin-label);      /* scale.css: 0.625rem = 10px, fixed */
  line-height: 1;
  text-transform: uppercase;               /* ← */
  letter-spacing: var(--type-tracking-caps); /* scheme-motion.css: 0.1em ← */
  font-weight: 500;
}
```

**(b) the tooltip declares its own body size, and it is bigger.**
`dist/styles/tokens/offsets.css`: `--tooltip-text: var(--type-caption)`; `scale.css`: `--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` → **12px → 16px**. The surface class string (`dist/tooltip-OxciiZm6.js`) ends `… text-(length:--tooltip-text)`.

**(c) the tooltip is a `glass-floating` surface that REDEFINES `--muted-foreground`.**
`dist/tooltip-OxciiZm6.js` → `class: "z-tooltip overflow-hidden rounded-tooltip border text-popover-foreground glass-reveal" + resolveSurfaceClass("floating")` → `.glass-floating`. Then `dist/styles/glass/ladder.css`:

```css
:where(.glass-floating, .glass-overlay) { --muted-foreground: var(--on-glass-muted); }
@container style(--glass-backdrop: light) { … .glass-floating … { --muted-foreground: var(--foreground); } }
@supports (color: contrast-color(white)) { @container style(--glass-backdrop: light) { … .glass-floating … { --muted-foreground: contrast-color(var(--card)); } } }
```

`--on-glass-muted` = `hsl(30 26% 35%)` light / `hsl(34 16% 72%)` dark (`tokens/on-glass-fg.css`, `tokens/dark-arm.css`). Every arm **lifts** muted ink on glass. The component was written against the *page* meaning of `text-muted-foreground`, not the *glass* meaning.

**Geometry.** `max-w-56` = 224px border-box; glass pads `--overlay-pad-inline: --spacing(2)` = 8px and `--overlay-pad-block: calc(8px × 1.272)` ≈ 10.18px, plus 1px border → **content width ≈ 206px**. `max-h-24` = 96px. `w-36` = 144px. `w-16 h-16` = 64px. `gap-1.5` = 6px.

---

## 2. Defects

### D-1 · BLOCKER · The component's entire data payload renders in ALL CAPS with 0.1em caps-tracking

**Provenance:** `TimelineHoverPreview.vue:20` (`class="font-mono text-admin-label … " data-register="code"`), rows at `:21–23`; rung defined at glass-ui `dist/styles/typography/semantic.css` (§1a).

The one job of this component is to show you the CSS that exists at a keyframe. `text-admin-label` carries `text-transform: uppercase` and `letter-spacing: 0.1em`. `snapshotCapture.ts:13–21` proves the payload is `getComputedStyle().getPropertyValue()` output — resolved CSS literals. So the rendered rows read:

```
BACKGROUND-COLOR: RGB(82, 232, 152)
TRANSFORM: MATRIX3D(1, 0, 0, 0, 0, 1, 0, 0, …
```

This is not a legibility nit; it **falsifies the data**. CSS is case-insensitive for property names and keywords, but not for: custom-property names (`--myVar` ≠ `--MYVAR`), `url()` paths, `font-family` string names, counter/`@keyframes`/animation identifiers, and `attr()` targets — all of which are reachable in the 17-property capture set (`timelineTypes.ts:20–38` includes `filter`, `box-shadow`, `background-color`, all of which serialize identifiers and can serialize `url()`). A keyframe inspector that renders a literal you cannot re-type is not an inspector.

It also breaks the demo's **own ruled contract**. `demo/styles/font-roles.json:82` (T.D4, RULED): *"Fira Code is the DATA register only: **literals** + tabular digits."* The author correctly marked the leaf `data-register="code"` — clause (c) of that very contract — and then bound it to the rung whose defining property is that it destroys literals. The `data-register` declaration and the class on the same element (`:20`) are in direct contradiction.

**Scope check (this is not a demo-wide idiom, it is this file):** 16 `text-admin-label` call-sites exist in `demo/`; this is the **only one** co-occurring with `data-register="code"`. The other mono/data leaves use non-uppercasing rungs (`StartingStyleTarget.vue:73` uses `text-mono-small`, which `typography/utilities.css` defines *without* `text-transform`) or are digits-only.

**Falsifier.** Any of: (i) a shipped rule resetting `text-transform` for `[data-register="code"]` or for this subtree — I grepped `demo/**` and `node_modules/@mkbabb/glass-ui/dist/styles/**`: **zero** CSS rules key on `data-register` at all, it is a census-only attribute (`font-roles.json:72–73` uses it as a *selector contract for the census*, not a paint rule); (ii) Tailwind not emitting `@utility text-admin-label` in the demo build — but `demo/styles/style.css:1,3` imports `tailwindcss` then the glass style index, which is exactly how the other 15 call-sites get their uppercase; (iii) `--type-tracking-caps` resolving to `normal` — `tokens/scheme-motion.css` says `0.1em`.

---

### D-2 · BLOCKER · Every long value is truncated with **no recovery path whatsoever**

**Provenance:** `TimelineHoverPreview.vue:21` (`class="truncate"`), `:20` (`overflow-y-auto`, i.e. **y only**), `:22` (`{{ prop }}: {{ val }}`).

`truncate` = `overflow:hidden; text-overflow:ellipsis; white-space:nowrap`. There is **no `title` attribute, no `<abbr>`, no wrap, no `overflow-x`, no expand affordance, no copy affordance**. Once a row exceeds the line box the remainder is gone — not scrolled, not revealed on hover, not available to a screen reader beyond the raw text (SR does read the full node, so this is a *sighted*-user data loss).

Overflow is the **norm, not the edge case**, and this is decidable from the tree:

- Content width ≈ **206px** (§1 geometry).
- Fira Code is monospace at a 0.6em advance; at the 10px D-1 rung that is 6px/char, plus `--type-tracking-caps` 0.1em = 1px → **7px/char → ≈29 characters per row**.
- `snapshotCapture.ts:17` stores *computed* values. `background-color` alone serializes as `rgb(82, 232, 152)`; the row `background-color: rgb(82, 232, 152)` is **35 chars**. An animating `transform` serializes as `matrix(…)` or `matrix3d(` + 16 components ≈ **80+ chars**.

So the single most important row in a keyframe inspector — the transform — shows roughly its first third and stops. D-1 makes this strictly worse (the 0.1em tracking costs ~14% of the character budget outright).

**Falsifier.** Measure rendered characters-per-line in the shipped tooltip; if ≥ the longest computed row in `DEFAULT_CAPTURE_PROPERTIES` for the demo's own targets, the *frequency* claim weakens — but the *structural* claim (truncation with zero recovery affordance) is falsified only by finding a `title`/tooltip/expand/copy path in the tree, and there is none in these 38 lines nor in `TimelineTrack.vue:86–93`.

---

### D-3 · MAJOR · A scroll region inside `role="tooltip"` — unreachable if it isn't focusable, ARIA-illegal if it is

**Provenance:** `TimelineHoverPreview.vue:20` (`max-h-24 overflow-y-auto`); envelope at `TimelineTrack.vue:62–94` (reka `Tooltip`/`TooltipTrigger`/`TooltipContent` via glass, `dist/tooltip-OxciiZm6.js` imports `TooltipPortal` — the content is **portalled out of the trigger's DOM position**).

Rows are 10px tall (`line-height: 1`, §1a) in a 96px viewport → **9 rows visible**. Realistic row count from `snapshotCapture.ts:18`, which drops only `none`/`auto`/empty: of the 17 `DEFAULT_CAPTURE_PROPERTIES`, `transform`/`box-shadow`/`filter` drop when identity/none and `top/left/right/bottom` drop when `auto` — leaving a **floor of ~10–11 rows** (`opacity`, `background-color`, `color`, `border-color`, `width`, `height`, `margin`, `padding`, `border-radius`, `font-size`, + `transform` mid-animation). **The ordinary case already overflows**, before any positional keyframe.

The hidden remainder is then in a dilemma with no good horn:

- If the scroller is **not** keyboard-focusable, the overflow is unreachable for a keyboard user.
- If it **is** (Chrome ≥127 and Firefox make overflowing scrollers sequentially focusable), it is a focusable element inside `role="tooltip"`, which the ARIA APG forbids — and it is *still* unreachable, because the content is portalled to the end of `<body>` (so Tab from the trigger goes to the next diamond, not into the tooltip) and reka closes the tooltip on trigger blur.

**Falsifier.** Tab from a focused keyframe marker (`TimelineTrack.vue:79` `tabindex="0"`) and observe whether focus enters the scroll region *while the tooltip stays open*. If it does, D-3 converts from "unreachable" to "APG violation" — the defect survives either way; only its wording changes. Killed outright only by a shipped `max-height` large enough that the region never scrolls.

---

### D-4 · MAJOR · The body rung undershoots the surface's own declared type size, at zero leading

**Provenance:** `TimelineHoverPreview.vue:17` and `:20` (`text-admin-label` → `--type-admin-label: 0.625rem`, `line-height: 1`); the surface's own floor at glass-ui `dist/styles/tokens/offsets.css` (`--tooltip-text: var(--type-caption)`) and `typography/scale.css` (`--type-caption: clamp(0.75rem, …, 1rem)`).

The tooltip **declares** its body size as 12→16px. This component overrides it downward to a fixed 10px — **17% smaller at the clamp floor, 37.5% smaller at the ceiling** (and note `--type-admin-label` is *not* fluid, so on a large viewport the gap widens while everything around it grows). `--type-admin-label` is the smallest rung glass ships apart from `--type-micro`; it exists for single-line caps chips, which is why it also carries `line-height: 1`.

Applying `line-height: 1` to a **10-row scrolling list** is the Aristotelian error precisely: the mean between too-tight and too-loose is chosen for the wrong genus. Zero leading in 10px uppercase mono with 0.1em tracking produces a solid grey block, not a table. The component had glass's `text-mono-small` (`typography/utilities.css`: `--type-small` + `--type-leading-small`, **no uppercase**) sitting one token away — the rung its sibling `StartingStyleTarget.vue:73` already uses for a `data-register="code"` leaf.

**Falsifier.** Show that `--type-admin-label` resolves ≥ `--type-caption`'s floor in the demo build (it is a literal `0.625rem` in `scale.css`, so this requires a demo-side override — grep of `demo/styles/*.css` finds none), or that a local rule restores leading.

---

### D-5 · MAJOR · The authored prop/value hierarchy is visually null in light and **inverted** in dark

**Provenance:** `TimelineHoverPreview.vue:20` (container `text-muted-foreground`) vs `:22` (`<span class="text-foreground/70">{{ prop }}</span>`); resolution chain at glass-ui `dist/styles/glass/ladder.css` + `tokens/on-glass-fg.css` + `tokens/{color-radius,dark-arm}.css`.

The author's intent is legible from the code: the **property name** gets `text-foreground/70` (a deliberate step *down* from full foreground), and the **value** inherits `text-muted-foreground` — i.e. "name slightly quieter, value muted". That intent assumes page semantics. On a `glass-floating` surface, `--muted-foreground` is **promoted** (§1c). Computed against the nominal plate (`--card`), WCAG 2.x relative luminance, `text-foreground/70` composited at 70% over the plate:

| theme | property name — `--foreground` @70% | value — `--muted-foreground` → `--on-glass-muted` | verdict |
|---|---|---|---|
| light (`--card` `hsl(30 85% 96%)`) | **6.22 : 1** | **6.06 : 1** | delta 0.16 → **perceptually null** |
| dark (`--card` `hsl(26 22% 17%)`) | **6.30 : 1** | **7.22 : 1** | **INVERTED** — the value out-shouts its own label by 15% |

The dark inversion is *structural*, not a coincidence of the plate: an ink at 70% alpha is pulled toward the plate and can never out-contrast an opaque ink that already sits further from it. Pure `--foreground` dark reaches 11.18:1; the 70% modifier drops it to 6.30:1 — **below** the token the author was trying to out-rank. On the `@supports (color: contrast-color(white))` arm of `ladder.css`, `--muted-foreground` becomes `contrast-color(var(--card))` — maximal contrast — and the inversion becomes total.

Net: the two-tone the author paid for does not exist. The prop/value distinction is carried entirely by the literal `:` at `:22` and by word order.

**Both inks clear AA** (all four ratios > 4.5:1), so this is a **hierarchy** defect, not a contrast failure — I am explicitly *not* claiming a contrast breach, and glass-ui deserves credit for the promotion that prevents one.

**Falsifier.** Read the computed `color` of the two spans in the shipped tooltip, both themes. If `--muted-foreground` resolves *dimmer* than `--foreground` @70%, D-5 dies. (Absolute ratios will differ from the table — the real plate is `color-mix(--glass-bg-rung, --glass-tint-source, …)` under a `backdrop-filter`, so the numbers are nominal; **UNPROVEN-NEEDS-LIVE** for the absolutes. The *ordering* is what the claim rests on, and it is plate-robust in dark by the alpha argument above.)

---

### D-6 · MAJOR · Three mutually exclusive preview sizes, no reserved box → the tooltip resizes and reflows under the cursor

**Provenance:** `TimelineHoverPreview.vue:5–10` (`<img class="w-36 h-auto">` = 144px, **no `width`/`height` attributes, no `aspect-ratio`, no `min-height` on any ancestor**), `:12–16` (ghost = `w-16 h-16` = 64px), and the implicit third branch — `v-if`/`v-else-if` both false → **nothing renders at all**.

Three consequences, all decidable statically:

1. **Per-marker size jump.** Sweeping the pointer across diamonds swaps between a 144px preview, a 64px preview (2.25× smaller), and no preview — with `side="top"` (`TimelineTrack.vue:86`) so the popper is bottom-anchored and the whole tooltip *jumps vertically* on every marker. The component's own envelope is its most-changing property.
2. **Decode reflow.** `previewSrc` is a `toDataURL("image/png")` (`KeyframeTimeline.vue:226`) with `h-auto` and no intrinsic size declared. Between insert and decode the `<img>` contributes ~0 height; on decode the stack grows and the popper re-solves. The tooltip moves *under a stationary cursor* — and moving hover-triggered content is the classic way to make it un-hoverable (WCAG 1.4.13).
3. **Width instability too.** `truncate` sets `white-space: nowrap`, so the flex column's max-content is the *un-truncated* row width, clamping to `max-w-56` whenever any row is long — but the "No properties" case (`:24`, ~13 chars) collapses the tooltip to a fraction of that. Width and height both vary per marker.

**Falsifier.** Hover three adjacent markers with differing capture outcomes and record the tooltip's box. If the box is stable, the branches are producing equal-height content — which would require the ghost + list to happen to equal the image height, and nothing in the tree arranges that.

---

### D-7 · MAJOR · The ghost fallback is unfaithful in the three cases that matter most

**Provenance:** `TimelineHoverPreview.vue:12–16` (`v-else-if="Object.keys(ghostStyle).length > 0"`, `class="w-16 h-16 rounded border border-border/30 bg-muted/30"`, `:style="ghostStyle"`); producer at `TimelineTrack.vue:151–158`.

1. **`opacity: 0` renders an invisible hole.** `getGhostStyle` copies `opacity` straight through (`TimelineTrack.vue:154`). `opacity` composites the *whole element* — background, border, everything. The single most common authored keyframe in the world is `0% { opacity: 0 }`; at that keyframe the guard `Object.keys(ghostStyle).length > 0` is **true** (opacity is a key), so the branch renders — a 64×64 completely invisible box, indistinguishable from a layout bug, occupying space and pushing the rest of the stack. There is no checkerboard, no outline-at-full-opacity, no "opacity 0" annotation.
2. **The raw transform is passed through unbounded.** `TimelineTrack.vue:155` builds `scale(0.3) ${vars.transform}`. Because the author's `scale(0.3)` is *outermost*, every subsequent translate is scaled by 0.3 — but `snapshotCapture.ts:17` yields a **computed matrix**, so a target animating `translateX(500px)` produces `scale(0.3) matrix(1,0,0,1,500,0)` → a 150px displacement of a 64px box inside a ~206px tooltip whose surface is `overflow-hidden` (glass `dist/tooltip-OxciiZm6.js`). The swatch **slides out of its own tooltip and is clipped to nothing**, silently. Rotations/skews likewise leave the box.
3. **Only 4 of 17 captured properties are previewable.** `getGhostStyle` maps `background-color`, `opacity`, `transform`, `border-radius` (`TimelineTrack.vue:152–157`). A keyframe animating `width`/`height`/`filter`/`box-shadow`/`color`/`border-color` — 6 of the 17 in `DEFAULT_CAPTURE_PROPERTIES` — yields `{}`, the guard is false, and **the third branch (nothing) fires with no placeholder, no "no preview available", no reserved box**.

**Falsifier.** Any of: a `forced-color-adjust`/`opacity` floor on the ghost; an `overflow:hidden` + `contain` wrapper around the ghost that would make (2) a clip rather than an escape (there is none in these 38 lines — the flex column at `:2` sets no overflow); a fallback branch after `v-else-if`. All three are absent from the tree.

---

### D-8 · MAJOR · No error state exists in the prop contract; failed captures are silent **and retried forever**

**Provenance:** `TimelineHoverPreview.vue:32–37` (`previewSrc?`, `loading?`, `ghostStyle` — **no `error`**), `:17–19` (the only status line, keyed on `loading`); producer at `KeyframeTimeline.vue:220–233`.

```ts
// KeyframeTimeline.vue:221
if (previewCache[kf.id] || previewLoading[kf.id]) return;
…
} catch {
    // KEEP: capture failed (no animation, 3D not supported, etc.) — ghost preview shown as fallback
}
```

On failure neither `previewCache[id]` nor `previewLoading[id]` is set, so the memo guard at `:221` **never latches** — every re-hover re-runs `scrubAndCapture` (which scrubs the live animation) and re-fails. The user sees "Capturing…" flash and vanish on each hover, forever, with no explanation. The comment claims "ghost preview shown as fallback", but per D-7(3) the ghost itself is `{}` for 6 of the 17 properties, so the documented fallback frequently does not exist either.

The prop contract at `:32–37` is where this is fixable and where it is missing: three render branches, two of which are *absence*, and absence-because-failed is not distinguishable from absence-because-never-tried.

**Falsifier.** Find an `error`/`failed` prop, a `v-else` terminal branch, or a latch that marks the id as permanently un-capturable. None exists in either file.

---

### D-9 · MAJOR · The component's primary branch is **dead on the keyboard path**

**Provenance:** `TimelineHoverPreview.vue:5–10` (the `previewSrc` branch) vs `TimelineTrack.vue:83` — `@mouseenter="emit('diamondHover', kf)"`.

Capture is wired to `mouseenter` **only**. reka's `Tooltip` opens on **focus** as well as hover, and the marker is explicitly focusable (`TimelineTrack.vue:79` `tabindex="0"`, `role="slider"`). So a keyboard user Tabs to a diamond, the tooltip opens, and `onDiamondHover` never fires: `previewSrc` is permanently `undefined`, `loading` permanently falsy. The keyboard user gets, by construction, the **degraded** ghost-or-nothing rendering — never the html2canvas preview that is this component's headline feature.

The wire is at the parent; the *contract* is here — `previewSrc` is declared optional (`:34`) precisely so this can silently happen, and nothing in these 38 lines signals to a keyboard user that a richer preview exists.

**Falsifier.** Find a `@focus`/`@focusin` capture trigger, or show reka's tooltip does not open on focus. `TimelineTrack.vue:62–94` has exactly one capture emit and it is `@mouseenter`.

---

### D-10 · MINOR · Under `forced-colors: active` the ghost swatch conveys literally nothing

**Provenance:** `TimelineHoverPreview.vue:14` (`bg-muted/30`, `border-border/30`) and `:15` (`:style="ghostStyle"`, whose entire payload is `backgroundColor`/`opacity`/`transform`/`borderRadius`).

In forced-colors mode the UA forces `background-color` and `border-color` to the system palette unless `forced-color-adjust: none` is set. The ghost's *only* information channel is `background-color`. Grep of `demo/**` for `forced-colors` / `forced-color-adjust`: **zero hits**. So the branch that exists specifically to convey colour renders a uniform Canvas rectangle — while the `<img>` branch (`:5–10`) survives untouched. The degraded path degrades further exactly where it was already weakest.

The house idiom is available and this component simply does not reach for it: glass-ui's `dist/styles/glass/a11y-fallback.css` carries a full `@media (forced-colors: active)` block (it forces the tooltip surface itself to `background: Canvas; border: 1px solid CanvasText`), so the surface is handled and only the demo-authored swatch is not.

**Falsifier.** A `forced-color-adjust: none` (or a `@media (forced-colors: active)` swatch treatment) anywhere in the demo cascade reaching this element. There is none.

---

### D-11 · MINOR · One flat 6px gap for a four-tier stack — tighter than the frame that holds it

**Provenance:** `TimelineHoverPreview.vue:2` (`gap-1.5` = 6px, the *only* spacing declaration in the file); frame at glass-ui `dist/tooltip-OxciiZm6.js` (`--overlay-pad-inline: --spacing(2)` = 8px, `--overlay-pad-block: calc(8px × 1.272)` ≈ 10.18px).

The stack has four semantic tiers — caption (`:3`), media (`:5–16`), transient status (`:17–19`), body (`:20–25`) — separated by one undifferentiated 6px. There is no proportional articulation: the caption is not bound closer to the media it titles, the body is not set off from the media. And 6px is **smaller than both of the surface's own paddings**, so the interior rhythm is denser than its container — the frame reads looser than the content it frames, which inverts the normal figure/ground relationship.

Note what was on offer and unused: glass encodes a deliberate ratio in its own padding (`inline × 1.272` — the φ-adjacent step the demo's type scale also uses, `typography/scale.css` `--type-subheading: 1.272rem`). A 6/10 or 6/8/12 progression keyed to that step was one token away.

**Falsifier.** Show a second spacing declaration (margin, space-y, per-child padding) in the file — there is none; the file declares no `<style>` block at all.

---

### D-12 · MINOR · The alignment axis changes mid-stack with no rule

**Provenance:** `TimelineHoverPreview.vue:2` (`items-center`) vs `:20` (`w-full`, default flush-left text) and `:24` (the centred-container/left-text empty row).

Caption and both preview modes are centred; the code block is a full-width left-aligned block. Two axes in a 38-line component, and the switch is incidental (it follows from `w-full`, not from a decision). The consequence is visible: the 144px image (`:9`) sits centred inside a ~206px box, leaving ~31px of dead gutter on each side, directly above a body block that runs the full 206px — so the *media*, which is the component's headline, is narrower than the *annotation* beneath it. Emphasis and width disagree.

**Falsifier.** If `max-w-56` rarely binds and the tooltip usually shrink-wraps to the 144px image, the gutters vanish and the mismatch is moot — but D-6(3) shows `white-space: nowrap` on the rows drives max-content to the clamp whenever any row is long, which D-2 shows is the ordinary case. Measure the shipped tooltip width across markers (**UNPROVEN-NEEDS-LIVE** for the exact gutter).

---

### D-13 · MINOR · The loading line is in the wrong place in the stack, unannounced, and mis-punctuated

**Provenance:** `TimelineHoverPreview.vue:17–19`.

- **Position.** It renders *after* the preview (`v-if="loading"` is a sibling following both preview branches), so a cached image plus an in-flight capture would show a finished preview with "Capturing…" underneath it. The status belongs where the thing it describes will appear, or in the reserved box D-6 asks for.
- **No live region.** No `role="status"`, no `aria-live="polite"`. The ghost→image swap is silent to AT. (The tooltip content is announced once via `aria-describedby`; a later mutation is not.)
- **Punctuation.** ASCII `...` rather than `…`, in a repo that is otherwise fastidious about typography (`font-roles.json` is a whole ruled type manifest). D-1 additionally renders it as `CAPTURING...`.

**Falsifier.** A `role="status"`/`aria-live` on an ancestor within the tooltip subtree — `TimelineTrack.vue:86–93` sets none.

---

### D-14 · MINOR · `font-mono` at `:20` is dead weight

**Provenance:** `TimelineHoverPreview.vue:20` (`class="font-mono text-admin-label …"`) vs glass-ui `dist/styles/typography/semantic.css` (`@utility text-admin-label { font-family: var(--font-mono); … }`).

`text-admin-label` already binds the mono family. Both are single-class utilities in the same layer, so the second declaration is at best redundant and at worst ordering-dependent noise. It is a repeated idiom, not a typo — `KeyframeTimeline.vue:108` and `TimelineCaret.vue:9,19` do the same — which makes it a **cluster-wide** hygiene item worth naming once here: it obscures which utility owns the family, and it is precisely the redundancy that would mask the D-1 rung mistake from a reviewer skimming the class list ("it says `font-mono`, so it must be the code rung").

**Falsifier.** Show `text-admin-label` is not generated in the demo build (then `font-mono` is load-bearing) — but then D-1/D-4 dissolve too, and the 15 sibling call-sites would all be unstyled. The two cannot both be true.

---

### D-15 · MINOR · No height cap or aspect ratio on the capture

**Provenance:** `TimelineHoverPreview.vue:9` (`class="w-36 h-auto"` — no `max-h`, no `aspect-ratio`); surface at glass-ui `dist/tooltip-OxciiZm6.js` (`overflow-hidden`, **no max-height**, no use of reka's `--reka-popper-available-height`).

`html2canvas` returns the target at the target's own aspect (`KeyframeTimeline.vue:224–226`); a tall subject at 144px wide yields a tall image. The scrolling list next to it is capped (`max-h-24`) and the image is not — the constraint is on the cheap element and absent on the expensive one. With `overflow-hidden` on the surface and no height budget anywhere, a tall capture is either clipped mid-image or drives the tooltip past the viewport.

**Falsifier.** If every demo scene's animation target is wide-and-short, the case never fires in practice — the *missing constraint* is still statically true, but its visual consequence is **UNPROVEN-NEEDS-LIVE**.

---

### D-16 · INFO · The code register carries no `dir="ltr"`

**Provenance:** `TimelineHoverPreview.vue:20–23` (`{{ prop }}: {{ val }}` inside a `data-register="code"` block, no `dir`).

CSS is an LTR notation. In an RTL context, the `:` and the bracket/comma-rich computed values bidi-reorder and the row becomes wrong. The correct treatment for a code register is an explicit `dir="ltr"`.

**Latent, not live:** grep of `demo/**` for `dir="rtl"` / `dir="ltr"` / `:dir` → **zero hits**; the demo declares no RTL support. Filed as INFO so it is not lost if RTL is ever added — this is one of the places that would break first.

**Falsifier.** Any RTL entry point in the demo would promote this to MINOR; a shipped `dir` on an ancestor would kill it.

---

### D-17 · INFO · Three unnamed alpha one-offs where the demo has a token vocabulary

**Provenance:** `TimelineHoverPreview.vue:9` (`border-border/30`), `:14` (`border-border/30 bg-muted/30`), `:22` (`text-foreground/70`).

Three magic alphas, none named, none shared, none derived. `demo/styles/design-idioms.css` is a 300-line owned vocabulary that names exactly this class of constant (`--badge-tint: 14%`, `--badge-text-mix: 50%`, `--rail-tint`, `--ball-glow: 35%`) *and documents why each number is what it is* (`:213–217` — "AA-CONTRAST (load-bearing)"). The `/70` at `:22` is the one that turned out to be load-bearing and wrong (D-5); had it been a named token it would have been reviewed alongside the glass promotion.

Folding **lane-frontend §6.3**: the lane flags 98 unprefixed demo custom properties as a *collision* surface and records `--kf-*` = 0. This component is the complementary case — it declares nothing (so it cannot collide) but it also *names* nothing, so its constants are invisible to any future namespace or contrast audit. Both halves of §6.3 want the same fix.

**Falsifier.** Show any of the three alphas resolving from a named token — they are Tailwind literal modifiers, so they do not.

---

## 3. Superlatives (L-18 both ways — each survives its own falsifier)

### S-1 · The `alt` text is exemplary, and structurally cannot drift from the visible caption

`TimelineHoverPreview.vue:8`:

```
:alt="`Rendered preview of the keyframe at ${Math.round(keyframe.percent)}%`"
```

It describes the *content and its provenance* (a rendered preview, of a keyframe, at a stated position), carries no "image of"/"graphic of" filler, and — the part that is genuinely good engineering rather than good copy — it is built from **the same `Math.round(keyframe.percent)` expression as the visible caption at `:3`**. The accessible name and the visual reading are computed from one source; they cannot desynchronise under any rounding, locale, or refactor that touches one and not the other. Most alt text in a codebase this size is a stale literal.

**Falsifier.** Find a rounding/format divergence between `:3` and `:8`, or a case where the alt is empty/decorative-but-not-marked. Neither exists.

### S-2 · An explicit, correctly-guarded empty state — in a *hover preview*, of all places

`TimelineHoverPreview.vue:24`: `<div v-if="Object.keys(keyframe.vars).length === 0" class="italic">No properties</div>`.

Transient hover surfaces are where empty states go to die; this one is present, honestly worded (no cheerful evasion, no "Nothing here yet!" cliché), visually differentiated by italic rather than by another colour, and **guarded on the same predicate as the list it replaces** (`Object.keys(keyframe.vars).length`) so it can neither double-render with the `v-for` at `:21` nor gap. Two-branch exhaustiveness over one expression, in a component where the *other* two-branch construction (`:6` / `:13`) is the one that leaks a third unhandled case (D-6/D-7).

**Falsifier.** A `keyframe.vars` shape where both the `v-for` and the empty row render, or where neither does. `Object.keys(…).length === 0` is exactly complementary to `Object.entries(…)` being non-empty.

### S-3 · `tabular-nums` on the percent readout — the right call, and a *legal* one by the repo's own ruling

`TimelineHoverPreview.vue:3`: `class="text-mono-caption font-semibold tabular-nums"`.

The percent changes as the pointer sweeps markers; tabular figures stop the digits from jittering the caption's width mid-sweep. Beyond the craft, it is contract-correct: `demo/styles/font-roles.json:71` lists `[class*='tabular-nums']` in `monoAllowedSelectors` and `:82` clause (b) admits "a tabular numeric readout" as a legal Fira Code leaf. The author reached for the one mono rung that the T.D4 ruling *pre-authorises*, on the one element where it applies — which makes the D-1 mistake below it a rung error, not an ignorance of the contract.

**Falsifier.** Show the caption is static per tooltip and never re-renders with a different digit count — but each `Tooltip` is per-marker and the caption's width participates in the shrink-to-fit envelope (D-6(3)), so digit width is load-bearing.

### S-4 · Zero authored motion and zero authored CSS — a PRM claim it never has to honour

The file has **no `<style>` block, no transition, no animation, no `@keyframes`**. The tooltip's reveal is delegated wholly to glass (`glass-reveal`, `data-reveal="tooltip"`, `data-material="overlay"` — `dist/tooltip-OxciiZm6.js`), which carries the `prefers-reduced-motion` bracket in `dist/styles/transitions.css`.

This is not merely absence — it is the *right* absence, and the cluster proves the counterfactual. Its own parent records the alternative in `KeyframeTimeline.vue:89–95`: a hand-rolled keyframe-editor transition, "a near-exact re-author **MISSING the PRM guard**", which had to be deleted and replaced by glass's published `.fade-slide`. `TimelineHoverPreview` never made that mistake, so it never needed that repair. Folding **lane-frontend §6.5** (13 PRM enforcement sites, "conscientious but inconsistent in mechanism"): this component is the case where delegation is unambiguously correct, because there is nothing local to delegate.

**Falsifier.** Any transition/animation reaching this subtree from a demo-owned rule without a PRM bracket. `design-idioms.css` and `layout.css` carry no rule targeting this subtree, and the component sets no class that they key on.

### S-5 · The mono exception is self-documented at the call-site, exactly as the ruling requires

`TimelineHoverPreview.vue:20` carries `data-register="code"`.

`demo/styles/font-roles.json:82` (T.D4, RULED) requires that a Fira Code leaf be *"an explicit identifier chip marked `data-register="code"` … reviewed exceptions, **self-documented at the call-site**"*, and `:72–73` makes `[data-register='code']` a first-class entry in `monoAllowedSelectors`. This is one of only **eight** `data-register="code"` sites in the entire 206-file demo — the author knew the ruling existed, knew a mono leaf here required a declaration, and made it. The census will read this leaf as legal, and it *is* legal.

That the *rung* stacked on top of it then violates the same clause's "literals" mandate (D-1) does not retract the discipline; it localises the fix to one class token rather than to a contract argument. A component that had skipped the marking would need both the fix and the ruling re-litigated.

**Falsifier.** Show `data-register="code"` is not the ruled marker (it is, `font-roles.json:72`), or that the site is one of many careless ones (grep: 8 sites demo-wide, each on a genuine data leaf).

---

## 4. Tally

| severity | count | ids |
|---|---|---|
| **BLOCKER** | **2** | D-1 (uppercase/caps-tracking on the code register), D-2 (unrecoverable truncation) |
| MAJOR | 7 | D-3, D-4, D-5, D-6, D-7, D-8, D-9 |
| MINOR | 6 | D-10, D-11, D-12, D-13, D-14, D-15 |
| INFO | 2 | D-16, D-17 |
| **defects total** | **17** | |
| **superlatives** | **5** | S-1 … S-5 |

**The one-line verdict.** The component's structure is sound and its instincts are good — derived alt text, a real empty state, a contract-legal tabular readout, an honest delegation of motion — but it binds its entire data payload to a **label** rung that uppercases, letter-spaces, shrinks below the surface's own declared type size, and strips leading, then truncates the result with no way to read what was cut. Two of those are one class token each (`text-admin-label` → `text-mono-small`; add `title`/wrap). The rest is state coverage: three preview branches, two of them absence, none of them reserved, and no error state for the failure the parent already catches and discards.

**Not claimed (guarded against false positives).** I do **not** claim a WCAG contrast failure — all four computed ratios in D-5 clear AA, because glass-ui's surface-scoped promotion of `--muted-foreground` prevents the failure the page-level reading would have produced. I do **not** claim the ghost swatch escapes onto the page — glass's `overflow-hidden` clips it (D-7(2) is a silent *clip*, not a spill). I do **not** claim trite or cliché prose: the four strings in this file (`%`, `Capturing...`, `No properties`, the alt) are terse and honest; the only prose defect found is punctuation (D-13).

**Provenance note.** `/Users/mkbabb/Programming/keyframes.js` was read-only throughout: no file in it was written, mutated, or executed; no install, no dev server, no browser tooling. glass-ui claims are sourced from the **installed** `keyframes.js/node_modules/@mkbabb/glass-ui@7.0.0` (per lane-frontend F-1, the declaration is absent from `package.json`/lock, so the installed copy is the only truth on disk). The sole write of this task is this file.
