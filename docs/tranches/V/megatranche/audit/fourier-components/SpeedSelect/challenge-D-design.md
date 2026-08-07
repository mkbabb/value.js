claude-opus-5[1m] (served model id)

# CHALLENGE · SpeedSelect · axis D (DESIGN)

**Subject** `fourier-analysis/web/src/components/visualization/SpeedSelect.vue` (70 lines, whole).
**Sole host** `AnimationControls.vue:96` (default) and `:117` (`compact`) — no other callsite in the
tree (`grep -rn SpeedSelect web/src web/tests` → 3 hits, all in AnimationControls; **zero test
coverage**, `web/tests` never names it).
**Method** static + source-derived only. No browser. Every pixel figure below is *arithmetic over
shipped declarations*, not measurement; the measurement that would falsify each is named inline and
the livable-only residue is marked `UNPROVEN-NEEDS-LIVE (SS-13)`.
**Pin** glass-ui `^4.0.0` / installed 4.0.0 (`web/package.json:11`); producer HEAD 7.0.0
(`glass-ui@e286d992`). Both read as evidence; nothing written outside this file.

**Verdict — 15 defects · 2 BLOCKER · 6 MAJOR · 3 MINOR · 4 INFO · 5 superlatives.** The component
is a 70-line leaf whose *logic* is close to ideal (§4) and whose *entire 22-line stylesheet is a
hand-rolled fork of a variant the installed package already ships*. Every declaration in that block
either (a) re-spells a glass-ui token slightly wrong, (b) pins a control off the library's comfort
axis, or (c) is inert. The two BLOCKERs are consequences of the same act: two fixed magnitudes
(`width: 3.5rem`, `height: 1.75rem`/`2rem`) authored as unlayered scoped CSS, which therefore beat
the design system unconditionally.

---

## §0 · The cascade fact everything below rests on

Vue SFC `<style scoped>` emits **unlayered** rules (`.speed-trigger[data-v-…]`). glass-ui's trigger
geometry arrives as Tailwind utilities (`h-(--control-h-md)`, `px-3`, `py-2`, `text-dropdown`,
`rounded-pill`, `w-full`) emitted into `@layer utilities`, and `.control-surface` into
`@layer components` (`glass-ui/src/styles/glass/surfaces.css:6` opens the layer; `:241` declares the
class). **In the CSS cascade, unlayered normal declarations outrank every layered normal
declaration regardless of specificity.** So *every* declaration in SpeedSelect.vue:49-69 wins
unconditionally over the shipped register — including under a future `--ui-scale` retune, a coarse
pointer, or a `--glass-level` change.

Corollary the author appears not to have known: the class string still *contains* the base
utilities. glass-ui's `cn` is clsx + a custom twMerge table (`dist/cn-DJXf4yaB.js:1-10`) whose
conflict groups are all Tailwind-shaped; `"speed-trigger"` matches none of them, so **nothing is
merged away** — `h-(--control-h-md) px-3 py-2 text-dropdown` all still ship on the element and are
simply *overridden*. The padding, in particular, survives and does the damage in D-01/D-09.

*Falsifier for §0:* build the app and read `document.styleSheets` for the scoped rule's layer
ownership; if Vite/Tailwind emitted SFC scoped CSS inside `@layer utilities`, specificity would
decide instead and `h-(--control-h-md)` (0,1,0) would still lose to `.speed-trigger[data-v]`
(0,2,0) — the conclusions are unchanged either way. This finding is robust to that falsifier.

---

## §1 · BLOCKERS

### D-01 · BLOCKER · The trigger is too narrow to render its own value. At every value, in every viewport band.

`SpeedSelect.vue:51` `width: 3.5rem` / `:63` `width: 4rem` are fixed, while the shipped trigger base
keeps `px-3` (0.75rem each side) and appends a `shrink-0` chevron of `h-4 w-4`
(`glass-ui/dist/SelectScrollDownButton-C1jb3b3K.js`, SelectTrigger `setup` → class string
`"… flex w-full items-center justify-between rounded-pill px-3 py-2 text-dropdown … [&>span]:line-clamp-1 …"`,
plus `ChevronDown class="… h-4 w-4 shrink-0 opacity-50"`). Preflight sets `box-sizing: border-box`
(`web/node_modules/tailwindcss/preflight.css:12`). `line-clamp-1` sets `overflow: hidden`, which
resolves the value-span's flex `min-width: auto` to **0** — so the span shrinks and **clips**, it
does not push.

The app's root font-size is banded: `style.css:41` `html { font-size: 1.125rem }` with
`style.css:45-47` `@media (min-width: 768px) { html { font-size: 1rem } }`. Media-query `rem`
resolves against the initial 16px, so Tailwind's `sm` = 40rem = 640px is unaffected; the three live
bands are:

| band | which variant renders | trigger W | − padding | − border | − chevron | **text box** | widest label¹ |
|---|---|---|---|---|---|---|---|
| < 640px (rem 18) | `compact` only (`AnimationControls.vue:115` `flex sm:hidden`) | 72px | −27 | −3 | −18 | **24px** | `0.25×` ≈ 47.3px |
| 640–767px (rem 18) | default only (`:95` `hidden sm:block`) | 63px | −27 | 0 | −18 | **18px** | `0.25×` ≈ 47.3px |
| ≥ 768px (rem 16) | default only | 56px | −24 | 0 | −16 | **16px** | `0.25×` ≈ 42.0px |

¹ monospace advance 0.6em at the pinned `text-sm` (`:54`/`:66`) → 15.75px font <640px, 14px ≥768px.

**Even the shortest label loses.** `1×` is 2 glyphs = 16.8px at the desktop band against a 16px text
box. The control whose entire job is to display the current playback rate cannot display *any* of
its five values without clipping — and the clip is silent (`overflow:hidden`, no ellipsis, since
`line-clamp` clips at the box edge, mid-glyph).

*Provenance:* SpeedSelect.vue:51, :63, :54, :66, :53, :65 · glass-ui 4.0.0
`dist/SelectScrollDownButton-C1jb3b3K.js` (SelectTrigger base class + chevron) · tailwindcss
`preflight.css:12` · fourier `style.css:41,45-47`.
*Falsifier:* in a live build, for each of the five values in each band, read the value-`<span>`'s
`scrollWidth` vs `clientWidth`. If `scrollWidth ≤ clientWidth` anywhere, that row dies. The 0.6em
monospace advance is the one estimated input — `UNPROVEN-NEEDS-LIVE (SS-13)` for the *exact* glyph
count lost; the *existence* of overflow survives any plausible advance ≥ 0.36em at the desktop band
(16px ÷ 14px ÷ 2 glyphs = 0.57em is already the breakeven for the **shortest** label; every longer
label breaks at ≥ 0.23em).
*Cure:* delete both `width` declarations. The base ships `w-full`; give the row a `min-w-` or let
the pill size to content. If a fixed slot is genuinely wanted, it must be ≥ `chevron + 5ch + px-3×2`
≈ 5.5rem at the *largest* comfort scale, not 3.5rem at the smallest.

### D-02 · BLOCKER · The fixed heights defeat glass-ui's WCAG-2.5.5 coarse-pointer touch floor — on the touch-only code path.

glass-ui 4.0.0 makes the touch floor a token seam, not a per-component chore:
`tokens/offsets-sizing.css:148-152` declares `--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))`
with `--control-floor: 0px` at desktop, and `tokens/light-dark.css:19-20` lifts **both** knobs under
`@media (pointer: coarse)`: `--ui-scale: var(--ui-coarse-scale, 1.5)` and
`--control-floor: var(--touch-target, 2.75rem)`. The shipped Select trigger therefore paints
`max(3.75rem, 2.75rem)` = **3.75rem** on a coarse pointer.

SpeedSelect overrides it to a literal (`:50` `1.75rem`, `:62` `2rem`) that has no scale term and no
floor term. On a phone (rem 18px): shipped **67.5px**, painted **36px** — 53% of the library's own
size, and **below the 44px WCAG 2.5.5 target**.

This is not a hypothetical band. `AnimationControls.vue:115` gates the compact instance
`flex sm:hidden` — below 640px the `compact` trigger is the **only** speed control that exists
(`:95` `hidden sm:block` removes the other from the layout *and* the a11y tree). The 36px form is
the touch-only form.

*Provenance:* SpeedSelect.vue:50, :62 · glass-ui `tokens/offsets-sizing.css:136,142,148-152,461` ·
`tokens/light-dark.css:19-20` · `AnimationControls.vue:95,115`.
*Falsifier:* (a) a fourier-side override of `--ui-scale`/`--control-floor`/`--ui-coarse-scale` —
`grep -rn -- "--ui-scale\|--control-floor\|--ui-coarse-scale\|--touch-target" web/src` returns
**zero hits**, so the library defaults stand; (b) an ancestor `min-height` lifting the hit box —
none: the compact instance's parent is `div.flex … px-3 py-1.5` (`:115`), which has no min-height;
(c) `document.elementFromPoint` probing the real hit rect at 375×667 — `UNPROVEN-NEEDS-LIVE (SS-13)`
for the rendered rect only.
*Cure:* `<SelectTrigger size="sm">` — shipped at 4.0.0 (`dist/…` size switch → `h-(--control-h-sm)`)
**and** retained at 7.0.0 (`glass-ui/src/components/select/SelectTrigger.vue:50-57`). It yields
2.25rem at desktop (marginally larger than the author's 2rem) and keeps the `max(…, --control-floor)`
clamp on touch. This is a one-word fix; the hand-roll bought nothing and cost the floor.

---

## §2 · MAJOR

### D-03 · MAJOR · A hand-rolled ghost that keeps the backdrop blur — while `variant="ghost"` ships, unused.

`:55-56` `border: none; background: none` kills the surface. But `.control-surface` also declares
`backdrop-filter: var(--control-surface-blur)` and `-webkit-backdrop-filter:` (glass-ui
`glass/surfaces.css:241-246`), and **neither is overridden**. The result is a control with no fill,
no border, no shadow — that still runs a rectangular backdrop blur inside the dock's own glass
plate: an invisible widget that costs a compositing layer and paints a hard-edged blur seam against
the surface it sits on.

glass-ui shipped the correct expression of exactly this intent at 4.0.0: `variant="ghost"` swaps the
*whole* class (`dist/SelectScrollDownButton-C1jb3b3K.js`, SelectTrigger: `r.variant === "ghost" ? "bg-transparent border-none shadow-none" : "control-surface"`),
so `.control-surface` — and its blur — is never applied at all. Two characters of prop instead of
two lines of CSS, and no orphan blur.

*Provenance:* SpeedSelect.vue:55-56 · glass-ui 4.0.0 `glass/surfaces.css:241-246` ·
`dist/SelectScrollDownButton-C1jb3b3K.js` (variant switch) · 7.0.0 `SelectTrigger.vue:45-47`.
*Falsifier:* `getComputedStyle(trigger).backdropFilter` — if `none`, dead. The class-list fact
(`control-surface` present, blur not overridden) is source-proven; the *visible* seam is
`UNPROVEN-NEEDS-LIVE (SS-13)`.

### D-04 · MAJOR · One value, two typefaces: mono in the trigger, serif in the list that produced it.

`:53`/`:65` force `"Fira Code", monospace` on the **trigger**. `SelectContent` is portaled
(`dist/…` SelectContent wraps `SelectPortal`), and the scoped block contains **no rule targeting the
items** — no `:deep()`, no `<style>` unscoped block, no class passed to `SelectContent` (`:37` is
bare). So the five options inherit from the portal root: `style.css:20`
`html, body { @apply … font-serif }` with `style.css:14` `--font-sans: "Computer Modern Serif", …`.

The literal string `0.25×` therefore renders **monospace in the trigger and serif in the option row
that set it**. A user opens the menu, picks a serif `0.25×`, and the pill closes onto a mono
`0.25×`. That is a typographic discontinuity at the exact moment the control's affordance is being
learned — and it is the only place in the component where the same glyphs appear twice.

*Provenance:* SpeedSelect.vue:53, :65, :37-43 · `style.css:14,20` · glass-ui
`dist/SelectScrollDownButton-C1jb3b3K.js` (SelectContent → SelectPortal) ·
`dist/menuItemVariants-DWRQXBxJ.js` (item base declares `text-dropdown` — a *size*, never a family).
*Falsifier:* `getComputedStyle(item).fontFamily` on an open menu; if it resolves to a mono stack,
some global rule I did not find is doing it. `grep -rn "select-item\|data-slot=\"select" web/src`
→ no fourier-side global rule exists. `UNPROVEN-NEEDS-LIVE (SS-13)` for the computed value only.

### D-05 · MAJOR · `--font-mono` bypassed — the metric-matched fallback is dropped inside a fixed box.

glass-ui ships the mono stack as a token: `theme/bridges.css:70` `--font-mono: var(--font-stack-mono)`
→ `tokens/scheme-motion.css:46` `--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace`,
and self-hosts the face (`src/fonts/fira-code/`, `styles/fonts.css:109-135`, explicitly
`font-display: swap` — "acceptable here because Fira Code is post-LCP").

SpeedSelect re-spells the stack by hand and **drops the middle two rungs**, including
`"Fira Code Fallback"` — the metric-compatible face whose entire purpose is to hold layout during
the swap window. Generic `monospace` has a different advance width. Because the trigger box is
*fixed* (D-01), a wider fallback advance shifts the clip point: the label visibly re-truncates when
the web font lands. The one component in the tree that most needs the metric-matched fallback is the
one that discards it.

The shipped one-class replacement for **both** `:53` and `:54` exists at the installed version:
`text-mono-small` (`typography/utilities.css:36-40` = `font-family: var(--font-mono); font-size: var(--type-small); line-height: var(--type-leading-small)`),
registered app-wide via `style.css:3 @import "@mkbabb/glass-ui/styles"`.

*Provenance:* SpeedSelect.vue:53, :65 · glass-ui `theme/bridges.css:70` ·
`tokens/scheme-motion.css:46` · `styles/fonts.css:109-135` · `typography/utilities.css:36-40`.
*Falsifier:* if `"Fira Code Fallback"` were not a real shipped face, the rung would be decorative —
`ls glass-ui/src/fonts/fira-code` confirms the family is vendored. Re-check at F.W1: if 7.0.0 drops
the fallback rung, the CLS half of this row dies and only the token-fork half survives.
*Systemic note (out of scope, for F.W4):* the same hardcode appears at 13 sites across 8 files
(`grep -rn "Fira Code" web/src`) — this row is the leaf instance, not the campaign.

### D-06 · MAJOR · `@apply text-sm` pins the control off the `--ui-scale` comfort axis.

The base applies `text-dropdown` → `--text-dropdown`/`--dropdown-text` → `--control-text` →
`calc(var(--type-small) * var(--ui-scale))` (`theme/bridges.css:30`,
`tokens/offsets-sizing.css:206`, `:174`). That chain is the library's *one* comfort axis: on a coarse
pointer every control's text grows 1.5× from a single `:root` knob
(`tokens/light-dark.css:19`).

`:54`/`:66` `@apply text-sm` — unlayered, therefore winning (§0) — replaces the whole chain with a
constant. On a phone every other glass control's label grows and this one does not; it becomes the
smallest interactive text in the dock, in a box that is simultaneously 53% of the shipped height
(D-02). The three defects compound: a non-growing font is the *only* reason D-01's clip is not
worse, which is not a defence.

*Provenance:* SpeedSelect.vue:54, :66 · glass-ui `theme/bridges.css:30`,
`tokens/offsets-sizing.css:174,189-207` · `tokens/light-dark.css:19`.
*Falsifier:* if fourier overrode `--dropdown-text` or `--control-text` to a constant anyway, the
opt-out would be moot — `grep -rn -- "--dropdown-text\|--control-text" web/src` → zero hits.

### D-07 · MAJOR · The two variants are two different controls — and the one declaration expressing design intent is inert.

`compact` is not a size modifier; it is a **second visual identity**:

| | `.speed-trigger` (:49-59) | `.speed-trigger-compact` (:61-69) |
|---|---|---|
| surface | none (`background: none`) | `.control-surface` fill + blur retained |
| edge | none (`border: none`) | hand-rolled `1.5px` @ 15%α |
| text colour | `var(--muted-foreground)` | *unset* → inherits `--foreground` |
| height | 1.75rem | 2rem |
| width | 3.5rem | 4rem |

Five simultaneous divergences for one control, switched by a boolean whose name discloses none of
it, across a single 640px breakpoint. Nothing in the tree explains why the mobile form should be
*more* enclosed and *more* saturated than the desktop form; the usual design logic runs the other
way (a control inside an already-bordered dropdown row — `AnimationControls.vue:115` supplies
`border-b border-border/50` — needs *less* chrome, not more).

And the colour leg — the only declaration in the file that states an intent rather than a magnitude
— **does not paint**. glass-ui 4.0.0 lifts the muted register inside a dock for contrast:
`dock/morph.css:332-337` `:where(.glass-dock) { … --muted-foreground: var(--foreground); }` (the
in-file rationale: "the muted L40 tier cannot clear 4.5:1 on a translucent darkened plate"). The
component's only host opens `<GlassDock>` at `AnimationControls.vue:58`, so `:58`'s
`color: var(--muted-foreground)` resolves to `var(--foreground)` — identical to the compact form it
was written to differ from. Custom-property resolution is layer-independent, so §0 does not save it.

The contrast question is therefore **clean**: `--muted-foreground` = `--neutral-5` =
`hsl(30 22% 40%)`, annotated "WCAG AA: 5.21:1 vs page / 4.90:1 vs muted"
(`tokens/color-radius.css:45,85`), and inside the dock it is `--foreground` anyway. No contrast
defect is charged. The defect is **dead intent plus a fragile coupling**: the moment F.W3/F.W4 moves
this control out of a `.glass-dock` (the shadow-retirement wave touches this folder), the two
variants silently diverge in ink as well.

*Provenance:* SpeedSelect.vue:49-69 (both blocks) · `AnimationControls.vue:58,115` · glass-ui
`dock/morph.css:332-337` · `tokens/color-radius.css:45,85`.
*Falsifier:* compare `getComputedStyle(t).color` on both instances. Prediction: **identical today**
(that is the finding), divergent outside a dock. If they differ *today*, `:where(.glass-dock)` is
not reaching the trigger and this row upgrades from latent to live.

### D-08 · MAJOR · No placeholder, no out-of-ladder state: a persisted off-ladder speed renders an empty pill while the clock uses it.

`:35` is a bare `<SelectValue />` — no `placeholder`. reka's `SelectValue` renders the matched item's
text or the placeholder; with neither, it renders **nothing**, leaving a 56px pill containing only a
chevron.

That state is reachable from data, not from the UI. `AnimationSettings.speed` is an unconstrained
`number` (`web/src/lib/types.ts:49`); the store seeds it straight from persisted workspace data —
`composables/useWorkspaceLoader.ts:57` `if (as?.speed) anim.speed = as.speed;` — which itself comes
from the server entity (`stores/workspace.ts:217-219`, `viz.animation_settings`) or a local draft
(`:167-169`), and is round-tripped verbatim on save (`stores/gallery.ts:255`). Any value outside
`{0.25, 0.5, 1, 2, 4}` — a 1.5 from an older client, an API default change, a hand-edited draft —
produces a **blank control while the rAF clock is actively dividing by it**
(`stores/animation.ts:50` `const dur = duration.value / speed.value`). The user sees a speed control
showing nothing, animating at a speed it will not name, and any interaction silently snaps the value
onto the ladder.

Three states are absent and all three are cheap: a placeholder (`<SelectValue placeholder="—" />`),
an out-of-ladder disclosure (render the raw value), and no loading/disabled arm at all (the control
stays live while `store.computing` is true — `stores/workspace.ts:50`).

*Provenance:* SpeedSelect.vue:35 · `web/src/lib/types.ts:49` · `useWorkspaceLoader.ts:57` ·
`stores/workspace.ts:167-169,217-219` · `stores/gallery.ts:255` · `stores/animation.ts:23,50`.
*Falsifier:* if the API constrained `speed` to an enum, the state would be unreachable — it does not
(`speed: number`), and `defaults.ts:22` seeds `1`, which is in-set, so **no UI path produces it
today**. Severity MAJOR, reachability **server-data-conditional**; I state that limit rather than
inflate it.

---

## §3 · MINOR / INFO

### D-09 · MINOR · The base's `py-2` is fully consumed — optical padding is zero in a 28px pill.
Content box = `1.75rem − (0.5rem × 2)` = **12px** (default, rem 16) against a 20px `text-sm` line box
and a 16px chevron. Both overflow their content box into the padding (nothing clips — the trigger's
own `overflow` is visible), so the *declared* 8px of internal breathing room is 100% eaten and the
glyphs sit optically edge-to-edge inside the pill. Aristotelian proportion: a pill whose radius is
`9999px` and whose interior padding is 0 reads as a label with a stroke, not a control.
*Provenance:* SpeedSelect.vue:50,62 · base `px-3 py-2` (dist trigger class string).
*Falsifier:* if `py-2` had been overridden it would be moot — it is not (§0: nothing is merged away).

### D-10 · MINOR · Two token forks on the surface axis: a 15%α/1.5px border and a literal pill radius.
`:67` `1.5px solid color-mix(in srgb, var(--foreground) 15%, transparent)` shadows
`--control-surface-border` → `--glass-border-floating` = `color-mix(in srgb, var(--foreground) 19%, transparent)`
(`tokens/glass.css:162,181`), at `1.5px` where `.control-surface` ships `1px`
(`glass/surfaces.css:243`). Four percentage points lighter and 50% thicker than the register it
copies — and, being a literal, **blind to `--glass-level` and the W55 bright-bucket retunes** that
the whole form family tracks from one handle. `:57`/`:68` `border-radius: 9999px` likewise re-spells
`--radius-pill` where the base already applies `rounded-pill`; inert today, blind tomorrow.
*Provenance:* SpeedSelect.vue:57,67,68 · glass-ui `tokens/glass.css:162,180-183` ·
`glass/surfaces.css:243`.
*Falsifier:* if `--control-surface-border` resolved to 15% the values would agree — it resolves to
19% by direct read.

### D-11 · MINOR · The `size` prop is unused where it is the exact, floor-preserving expression of the author's intent.
Both hand-rolled heights are attempts to say "smaller than default". `size="sm"` says it, in one
word, at **both** pins (4.0.0 `dist/…` switch → `h-(--control-h-sm)`; 7.0.0 `SelectTrigger.vue:50-57`),
and keeps the coarse clamp. Filed separately from D-02 because it is the *design-vocabulary* half:
the component invented private CSS where public API existed.

### D-12 · INFO · `hideIndicator` unused — half of each row is a gutter for a 2–5 glyph label.
`SelectItem` defaults `indicator: "start"` → `pl-7 pr-2` (28px left gutter, plus an absolutely
positioned `h-3.5 w-3.5` dot at `left-2`), inside a `min-w-32` (128px) panel — anchored to a 56px
trigger, i.e. a menu **2.3× the width of its own anchor**, with ~50% of each row given to indicator
gutter for labels of 2–5 characters. `hideIndicator` is a shipped prop at 4.0.0
(`dist/…` SelectItem props) and would be the proportionate choice here (the trigger already displays
the current value; the dot is redundant disclosure).
*Provenance:* glass-ui `dist/menuItemVariants-DWRQXBxJ.js` (`indicator.start = "pl-7 pr-2"`),
`dist/SelectScrollDownButton-C1jb3b3K.js` (SelectItem `hideIndicator` prop, `min-w-32` on content).

### D-13 · INFO · `@reference "tailwindcss"` is the mechanical cause of D-05/D-06.
`:48` references the **stock** Tailwind entry, not the app entry (`style.css`, which is what pulls in
`@mkbabb/glass-ui/styles`). glass-ui's own `@utility` registers — `text-mono-small`, `text-dropdown`
— are therefore invisible to `@apply` inside this block, which is precisely why the family and size
were hand-rolled. The cure is **not** to re-point the `@reference` (that would pull the app's whole
theme into every SFC) but to put `text-mono-small` in the template's `:class`, where it resolves as
an ordinary emitted class.

### D-14 · INFO · `flex-shrink: 0` at `:52` is dead.
The default instance's parent is `div.hidden.sm:block` (`AnimationControls.vue:95`) — a block box, so
`flex-shrink` on its child has no effect. The compact instance's parent *is* a flex container
(`:115`), so `:64`'s copy is live. Two identical declarations, one inert; symptomatic of the block
having been copy-pasted rather than derived.

### D-15 · INFO · Zero prose in a folder that documents single props.
70 lines, no comment, no wave provenance, no rationale for the two variants, and `compact` carries no
JSDoc — in a directory whose sibling documents a lone `maxWidth` prop across six lines
(`AnimationControls.vue:19-24`) and spends five lines justifying one `role="group"`
(`AnimationControls.vue:109-114`). The name `compact` does not disclose that it is the *in-dropdown
mobile* form, which is the only thing a reader needs to know.

---

## §4 · SUPERLATIVES (L-18 runs both ways)

- **S-1 · The value ladder is right, and the glyph is right.** `0.25 / 0.5 / 1 / 2 / 4` is a clean
  ×2 geometric ladder with no arbitrary rung, five options — under the ~7±2 scannable ceiling and
  well under the `--select-content-max-h` bound, so no scroll affordance is ever needed. Every label
  uses `&times;` (U+00D7 MULTIPLICATION SIGN), never the letter `x`, and matches the unit the
  collapsed dock summary renders (`AnimationControls.vue:75` `<MetricBadge … unit="×">`) — one
  typographic vocabulary across two surfaces. *Provenance:* SpeedSelect.vue:38-42;
  AnimationControls.vue:75. *Falsifier:* any non-×2 rung, any ASCII `x`, or a unit mismatch with the
  badge — none present.

- **S-2 · The accessible name is present, correct, and satisfies Label-in-Name.** The desktop form
  has **no visible label**, and `:32` `aria-label="Playback speed"` is the correct cure rather than a
  title attribute or a visually-hidden span. In the compact form the visible label is `Speed`
  (`AnimationControls.vue:116`), and "Speed" is a substring of "Playback speed" — **WCAG 2.5.3 Label
  in Name passes**, which is the failure mode this pattern usually walks into. *Falsifier:* an
  accessible name omitting the visible text, or an `aria-labelledby` overriding it — neither exists.

- **S-3 · PRM-correct by construction.** The SFC declares zero `transition`, zero `animation`, zero
  `@keyframes` — so there is no local motion to audit, and every animated surface it inherits (the
  chevron rotation, the popover zoom/fade, the `tap-squish` press) is the producer's and is caught by
  glass-ui's blanket gate (`utilities/a11y-overrides.css:6-30`: `*:not([data-allow-motion])` →
  `animation-duration: 0.01ms !important`, `transition-property` narrowed to non-spatial; plus the
  targeted `tap-squish` reset at `utilities/base.css:273-278`). This is the one axis on which
  hand-rolling *nothing* was exactly right. *Falsifier:* any motion declaration in `:47-69` — none.

- **S-4 · A textbook single-source model bridge.** `:23-26` — one 4-line `computed` with a setter,
  no mirrored `ref`, no `watch`, no store reach-in. The `number ↔ string` impedance mismatch that
  reka's `Select` forces is confined to exactly two lines and cannot desync, and the props/emit
  contract keeps the leaf host-agnostic (which is why it can serve both the dock row and the
  dropdown row without a second component). *Falsifier:* a local `ref` mirror or a `watch` that
  could diverge from `props.modelValue` — neither exists.

- **S-5 · Zero primitive leakage.** All five imports come from `@mkbabb/glass-ui/select` (`:3-9`);
  no `reka-ui` import, no vendored shadcn copy, no local Select fork — the leaf-level proof of the
  census's "deepest, cleanest glass consumer in the constellation" posture
  (`CENSUS-2026-08-03.md §3a`, 95 named imports / 21 subpaths / 0 direct reka-ui). *Falsifier:* a
  `from "reka-ui"` line or a `components/ui/select` shadow — neither exists.

---

## §5 · THE F.W1 UPLIFT SURFACE (glass ^4.0.0 installed → producer 7.0.0)

Census break surface for reference: **metric-badge · hover-card / hover-popover · dock members ·
`ToastVariant`** (`CENSUS-2026-08-03.md §3a "the uplift break surface"`, §2 C-4, §5 risk 1 — the
atomic tri-package deadlock).

| id | surface | 4.0.0 → 7.0.0 | verdict |
|---|---|---|---|
| **U-1** | `@mkbabb/glass-ui/select` subpath | **retained** — `glass-ui@7.0.0 package.json` `exports["./select"] = {types: "./dist/select.d.ts", import: "./dist/select.js"}` | **NO import break.** SpeedSelect is *not* on the census break surface. Its host is, three ways: `MetricBadge` (`AnimationControls.vue:10` — one of census C-4's 7 files), `DockDropdownTrigger` (`:8` — removed dock member), `lucide-vue-next` (`:6` — the 35-site `@lucide/vue` rename). **SpeedSelect survives its own uplift but cannot render until AnimationControls is cured.** Sequencing fact for F.W1. |
| **U-2** | default trigger variant | `"control-surface"` → `"control-surface glass-control-edge glass-capsule-hover"` (`SelectTrigger.vue:47`) | **REGRESSION.** `.glass-control-edge { box-shadow: var(--glass-rim-top), var(--glass-rim-bottom) }` (`_shared/field/field-surfaces.css:84-85`) is a **box-shadow**, and `:55` `border: none` does not null a box-shadow. The deliberately invisible `.speed-trigger` **gains a visible two-stop keyed rim**; the compact one gains that rim *under* its hand-rolled 15%α border (double edge). `.glass-capsule-hover` (`glass/glass-capsule.css:96-106`) adds a `scale` hover transition inside a fixed-width dock row. Cured for free by adopting `variant="ghost"` (D-03), which is **retained** at 7.0.0 (`SelectTrigger.vue:45-46`). |
| **U-3** | `size` prop union | `"sm" \| "default" \| "display" \| "audacious"` → **`"sm" \| "default"`** (`SelectTrigger.vue:8,50-57`) | **No break here** (SpeedSelect passes none) — but note the cure for D-02/D-11 (`size="sm"`) is stable across **both** pins, so it can be applied *before* F.W1 and survives it. |
| **U-4** | attr forwarding | 7.0.0 adds `inheritAttrs: false` + `fixedHostAttrs` (`SelectTrigger.vue:23,30-34`; `_shared/primitive.ts:23-33`) | **No a11y break.** `fixedHostAttrs` filters only `as`/`asChild`/`as-child`; `aria-label` (`:32`) still forwards to the host. Verified by reading the filter set. |
| **U-5** | `SelectContent` material | 7.0.0 `[data-slot="select-content"]` composes `glass-plate` + the warm-capsule floor + the cartoon under-stamp (`_shared/field/field-surfaces.css:93-120`) | **IMPROVEMENT, free.** `:37` passes no class, so the dropdown inherits the whole new material with zero edits. |
| **U-6** | retired polymorphic props | 7.0.0 drops `asChild`/`as`/`reference` from `SelectTriggerProps` | **No break** — unused here. |
| **U-7** | content collision bound | 4.0.0 ships it precompiled (`src/styles/select.css`, `--select-content-max-h: min(24rem, 60dvh)`) | **INFO** — a 5-item panel never approaches the cap; unaffected either way. Worth recording that this component would not have exercised the U-DROPDOWN defect that rule cures. |

**Net:** the uplift costs this component **one line** (`variant="ghost"`) and pays back a materially
better dropdown. Every other F.W1 cost at this coordinate is its host's.

---

## §6 · Corpus reconciliation

- **`lane-fourier-r3-r6.md` R3-7a** (TRUE, carried → F.W3: "35 Tooltip callsites over nine
  consumers … AnimationControls 4"). **Confirmed at this coordinate and refined**: one of
  AnimationControls' four is the desktop SpeedSelect's wrapper (`AnimationControls.vue:94-97`), and
  it wraps a `<div class="hidden sm:block">` via `TooltipTrigger as-child`
  (`web/src/components/ui/tooltip/Tooltip.vue:25-27`). A `div` is not focusable, so that tooltip is
  **hover-only — unreachable by keyboard** (WCAG 1.4.13 territory). No information is lost, because
  `:32`'s `aria-label` carries the identical string — which is *also* why the pattern is safe to
  migrate. Charged to the host, not to SpeedSelect; flagged here so F.W3's 35-callsite budget carries
  the focusability fix, not just the import swap.
- **`CENSUS-2026-08-03.md §3a` break surface** — cross-checked row by row in §5; SpeedSelect is
  clean, its host is not. **No contradiction with the census.**
- **`CENSUS §3a` "0 direct reka-ui, 3 documented thin adapters keep"** — corroborated at this leaf
  (S-5), and the `ui/tooltip` adapter is one of the three; the R3-7a note above is the reason to
  re-examine whether "keep" survives F.W3.
- **`CENSUS §5 risk 1`** (tri-package atomic deadlock) — this component adds **no new constraint**
  to it (U-1). Recorded as a negative result so F.W1's risk register is not padded.
- **Contradiction filed:** none. Every corpus row touching this coordinate held against the tree.

---

## §7 · Cure, in the order a wave would apply it

1. `<SelectTrigger size="sm" variant="ghost" aria-label="Playback speed" class="speed-trigger">` —
   kills D-02, D-03, D-11 and pre-empts U-2. One line.
2. Add `text-mono-small` to the template `:class` list; delete `:53-54` and `:65-66` — kills D-05,
   D-06, D-13.
3. Delete `width`, `border-radius`, the compact `border`, `color`, and both `flex-shrink`
   declarations — kills D-01, D-07, D-10, D-14, and collapses the two variants toward one control
   (keep at most a single density difference, expressed as `size`).
4. `<SelectValue placeholder="—" />` plus an out-of-ladder disclosure — kills D-08.
5. Add a mono-family rule reaching the portaled items, or accept the list in the app serif and drop
   the mono trigger — either resolves D-04; what is not acceptable is the current split.
6. `hideIndicator` on the five items (D-12), and four lines of prose naming what `compact` is (D-15).

The residue after step 3 is roughly **four lines of scoped CSS or none at all**, which is the real
finding: this component's stylesheet is a 22-line reimplementation of `size="sm" variant="ghost"
text-mono-small`, and every one of its two blockers, six majors and three minors lives inside that
reimplementation. Not one lives in the 26 lines of script and template — which are, on this axis,
close to exemplary (§4).

---

*Read whole: `SpeedSelect.vue` (70 lines) and every file it imports or is mounted by —
`AnimationControls.vue`, `ui/tooltip/Tooltip.vue`, `stores/animation.ts`,
`composables/useWorkspaceLoader.ts`, `stores/workspace.ts`, `lib/types.ts`, `lib/defaults.ts`,
`style.css`; glass-ui 4.0.0 installed (`dist/select.js`, `dist/SelectScrollDownButton-…js`,
`dist/menuItemVariants-…js`, `dist/cn-…js`, `src/styles/**` tokens/surfaces/typography/a11y) and
glass-ui 7.0.0 producer (`src/components/select/**`, `_shared/primitive.ts`,
`_shared/field/field-surfaces.css`, `glass/glass-capsule.css`, `package.json` exports). No product
source in any repo was mutated; this file is the only write.*
