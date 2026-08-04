claude-opus-5[1m]

# CHALLENGE · `CSSPasteDialog.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/CSSPasteDialog.vue` (80 lines)
**Date** 2026-08-04 · **Mode** static, source-derived. No browser tooling (SS-13 owns the visual audit).
**Evidence roots (READ-ONLY)** keyframes.js @ `tranche-u` working tree · glass-ui 7.0.0 source @ `/Users/mkbabb/Programming/glass-ui` (version-matched to the installed `node_modules/@mkbabb/glass-ui` — verified `7.0.0` both sides) · the **built witness** `keyframes.js/dist/gh-pages/assets/index-CL_QYCiO.css` (571 KB, mtime `Jul 16 09:11` — NEWER than the component's `Jul 15 17:38`, so it is a valid emission witness for this file).

**Posture** The component was assumed DEFECTIVE until the tree spoke. Six candidate defects were **killed by the built witness** before publication and are recorded in §5 (Killed Claims) so the next reader does not re-invent them.

**Tally** 21 defects (3 BLOCKER · 7 MAJOR · 8 MINOR · 3 INFO) · 3 superlatives.

---

## 0 · What the component is

A props-driven shell: `Dialog` → `DialogContent` → `DialogTitle` / `DialogDescription` / a hand-rolled `pre[contenteditable]` / `DialogFooter` + one `Button`. Two call sites (`KeyframeTimeline.vue:135`, `:145`) parameterise it into an "Import" and an "Add" dialog. It emits `submit(text)`.

Everything below is measured against **glass-ui 7.0.0's own published rulings** — its type scale, its ink register, its radius canon, its field-control recipe — because glass-ui is the design system of record for this repo (`feedback_glass_ui_first_class`).

---

## 1 · BLOCKERS

### D-B1 · The editable region destroys the caret on every keystroke — the dialog's primary affordance is typing-hostile
**Severity** BLOCKER · **Provenance** `CSSPasteDialog.vue:13-18` (the `pre`/`code`/`{{ text }}` triple), `:59` (`const text = ref(...)`), `:71-73` (`onInput` writes `text.value`).

```vue
<pre ref="textEl" @input="onInput" :class="preClass" contenteditable="true"><code>{{ text }}</code></pre>
```
```ts
const onInput = (e: Event) => { text.value = (e.target as HTMLElement).innerText; };
```

`text` is a render dependency of the `<code>` mustache. Every keystroke fires `input` → `onInput` writes `text.value` → the render effect re-runs → Vue's compiled `code` vnode carries `PatchFlags.TEXT`, so `patchElement` calls `hostSetElementText(el, children)` whenever `n1.children !== n2.children`. `hostSetElementText` is `el.textContent = value`, which **removes every child node and inserts a fresh `Text` node**. The DOM `Selection` anchored inside the removed node is invalidated. This is the canonical Vue + `contenteditable` antipattern: the state the user is editing is also the state that re-renders the node they are editing in.

The mechanism is source-certain. The *observable* landing position of the destroyed caret (start-of-host vs. dropped) is engine-specific and marked **UNPROVEN-NEEDS-LIVE**.

**Why this is a design defect, not only a correctness one:** the dialog's entire reason to exist is "paste or type CSS here". A box whose caret cannot survive a keystroke offers a *false affordance* — it looks like a text field (cursor `text`, border, fill, mono type) and does not behave like one. It degrades to paste-only, which the copy never says.

**Falsifier** Open the Import dialog, click into the box, and type `abc` without clicking again. If the box reads `abc` with the caret after `c`, this claim is dead. (Equivalently: if a future `v-once`/uncontrolled-DOM rewrite lands, or if the mustache is replaced by an imperative one-shot write, the claim dies.)

**Axis note** overlaps axis C (correctness). Reported here because the observable failure is an affordance failure.

---

### D-B2 · The "Add CSS" dialog's copy, label, and icon all promise a merge; the code performs a full replace
**Severity** BLOCKER · **Provenance** `CSSPasteDialog.vue:12` (renders `description`), `:24` (renders `buttonLabel` + `buttonIcon`) → `KeyframeTimeline.vue:145-152` → `:274-279` → `useTimelineBuild.ts:144-161`.

Three independent design signals, all additive:

| signal | value | file:line |
|---|---|---|
| description | "Paste CSS @keyframes to **merge** into the timeline" | `KeyframeTimeline.vue:148` |
| button label | "**Add**" | `KeyframeTimeline.vue:149` |
| button icon | `FilePlus2` (a file-**plus** glyph) | `KeyframeTimeline.vue:150` |

The handler:

```ts
const doAddCSS = (text: string) => { if (text.trim()) { importCSS(text); addCSSDialogOpen.value = false; } };   // KeyframeTimeline.vue:274
```

and `importCSS` (`useTimelineBuild.ts:152`):

```ts
state.value.keyframes = imported;      // ← whole-array REPLACE
```

`importCSSToTimeline` (`timelineEngine.ts:78-104`) never reads existing state; it builds a fresh array from the parsed CSS and returns it. So **"Add" destroys the user's entire timeline**, and the success toast (`useTimelineBuild.ts:155`) says "Imported N keyframes" — the count of the *new* set, which reads as confirmation that N were added.

`doImport` (`:267`) and `doAddCSS` (`:274`) are byte-equivalent modulo which `ref` they close. The two dialogs are the *same* operation wearing two different promises; the description delta ("load into" vs "merge into") is a distinction the code does not make.

Mitigation, not exculpation: `useTimeline` wraps `state` in `useRefHistory` (`useTimeline.ts:77-88`, `deep: true, clone: true, capacity: 50`), so `Mod+Z` recovers. But the dialog never mentions undo, offers no confirmation, and offers no Cancel (see D-m6). A destructive primary action dressed as an additive one is the sharpest prose defect available on this axis.

**Falsifier** If `importCSS` were changed to splice/concat onto `state.value.keyframes`, or if the "Add" description/label/icon were retuned to say "replace", the claim dies. Also dies if some caller I did not find re-seeds state before `doAddCSS` — I grepped every `CSSPasteDialog` usage (2 sites, both in `KeyframeTimeline.vue`) and every `importCSS` reference (4 sites) and found none.

---

### D-B3 · Long content grows the dialog off-screen with no scroll path — the submit button becomes pointer-unreachable
**Severity** BLOCKER · **Provenance** `CSSPasteDialog.vue:54` (`preClass` default), `DialogContent.vue:228` (`baseClasses`), `DialogContent.vue:64` (`scroll: false` default), `DialogContent.vue:275-277`.

The container:

```
fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 …   // DialogContent.vue:228 — NO max-height
```
```ts
const centerScrollClasses = computed(() =>
    props.scroll && isCenter.value ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "");   // :275
```

`scroll` defaults `false` (`:64`) and **the consumer never sets it** (`CSSPasteDialog.vue:3-10` passes only `@interact-outside`). So the dialog has no `max-height` and no `overflow`.

The `pre` is equally unbounded: `preClass` is `font-mono min-h-[20vh] p-3 cursor-text rounded-lg text-small bg-muted/50 outline-none border border-border` — a `min-height` and nothing else. No `max-h`, no `overflow-auto`, no `whitespace-pre-wrap`. And the built witness confirms **no `pre { overflow }` rule exists anywhere in the shipped sheet** (searched `index-CL_QYCiO.css` for any selector containing `pre` with an `overflow` declaration: zero matches). Tailwind preflight only sets `code,kbd,samp,pre { font-family: … }`.

Consequences, both from `pre`'s UA defaults (`white-space: pre`, `overflow: visible`):

1. **Vertical.** A 200-line `@keyframes` block makes the grid row grow; the `fixed top-1/2 -translate-y-1/2` box overflows the viewport symmetrically. `DialogFooter` and the Import button go below the fold. `position: fixed` means document scroll cannot reach them, and reka's modal locks body scroll. Keyboard users can still `Tab`+`Enter`; **pointer users cannot submit**.
2. **Horizontal.** A long declaration (`transform: translate3d(…) rotate3d(…) scale3d(…);`) overflows the `pre`'s inline box with `overflow: visible` — it paints *outside* the glass plate, over the scrim.

The design system already ships the answer twice and neither is taken: `DialogContent`'s `scroll` prop, and `field-control.css:57` `.field-control[data-kind="textarea"] { overflow: auto }`.

**Falsifier** Paste a 200-line keyframes block into the Import dialog. If the dialog clamps at `100dvh - 2rem` and gains a scrollbar, or if the `pre` scrolls internally, this claim is dead.

---

## 2 · MAJORS

### D-M1 · The `pre[contenteditable]` re-authors glass-ui's `Textarea` and forfeits nine ruled behaviours — CONTRADICTS census `lane-frontend.md:204`
**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:13-18`, `:54` vs `glass-ui/src/components/textarea/Textarea.vue` + `glass-ui/src/components/_shared/field/field-control.css:1-120`.

**Census contradiction (explicit, per the fold rule).** `lane-frontend.md:204` classifies this file:

> `| 80 | CSSPasteDialog.vue | G | paste-CSS dialog — Dialog* + Button |`

The `G` (glass-conformant) verdict was reached from the *import list*, which is indeed pure glass-ui. It did not open the template. **The load-bearing control in this dialog is bespoke**, and it is a shadow of a component glass-ui ships. This is an **S-9-class shadow component the frontend lane missed** — same family as S-1 (`KfPillTabs` → `SegmentedTabs`), S-4 (`SequenceScrubber` → `ScrubberTimeline`), S-7 (`CopyButton` → `Button`). It is smaller in line count than any of those (one element, one class string), which is presumably why the census's line-count heuristic passed over it — but by *ruled-behaviour count forfeited* it is heavier than S-6 or S-7.

What `<Textarea>` would have supplied, all measured from `field-control.css`:

| # | ruled behaviour | field-control.css | the bespoke `pre` |
|---|---|---|---|
| 1 | `overflow: auto` | `:57` | absent → D-B3 |
| 2 | `:focus-visible { border-color + box-shadow: var(--focus-ring-shadow) }` | `:63-67` | `outline-none`, nothing → D-M2 |
| 3 | `border: 1.5px solid var(--control-surface-border)` | `:12` | `border border-border` → D-M3 |
| 4 | `border-radius: var(--radius-field)` (16px) | `:54` | `rounded-lg` (10px) → D-m1 |
| 5 | `padding-inline: calc(1rem * var(--ui-scale))` / `padding-block: calc(0.75rem * var(--ui-scale))` | `:18`, `:55` | `p-3` (12px, scale-blind) → D-M7 |
| 6 | `font-size: var(--control-text)` = `--type-small × --ui-scale` | `:20-21`, `sizing.css:85` | `text-small` (raw) → D-M5 |
| 7 | `min-block-size: max(5lh, calc(5rem * var(--ui-scale)))` | `:53` | `min-h-[20vh]` → D-M7 |
| 8 | `background: var(--input-on-glass)` (the calibrated on-glass form-well fill) | `:5-7`, `on-glass-fg.css:37` | `bg-muted/50` |
| 9 | `::placeholder`, `:user-invalid`/`[data-state=invalid]`, `[data-state=readonly]`, `[data-state=disabled]`, `resize`, `field-sizing: content`, `caret-color` | `:59-120` | none → D-m5 |

Also forfeited: `data-slot="textarea"` / `data-kind` / `data-size` / `data-state`, which is the hook surface glass-ui's own visual-regression suite and consumer overrides target.

**Falsifier** If glass-ui 7.0.0 shipped no multi-line field, or if the `pre` needed a capability `Textarea` lacks (syntax highlighting, per-token decoration, non-textual children) this would be justified bespoke à la **S-8 `TypingDots`**. Neither holds: `Textarea.vue` exists and is exported; and the box renders exactly one un-decorated text node (`<code>{{ text }}</code>`) — no highlighting, no children, no rich content. The claim dies if a future revision adds real rich-text rendering inside the box.

---

### D-M2 · `outline-none` strips the focus indicator from the dialog's primary control, with nothing put back
**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:54` (`… outline-none …`); built witness `.outline-none{--tw-outline-style:none;outline-style:none}`; contrast with `field-control.css:63-67` and `DialogContent.vue:484` (`class="focus-ring absolute right-… "`).

`preClass` contains `outline-none` and contains **no** `focus-visible:` utility, no `focus-ring` class, no `ring-*`. An author-origin `outline-style: none` beats the UA-origin `:focus-visible { outline: auto }`, so the box has no focus ring in any engine.

This is the **only focusable surface in the dialog without one**:

- the close `X` → `focus-ring` (`DialogContent.vue:484`)
- the submit `Button` → glass-ui's button focus recipe
- every `field-control` in the system → `box-shadow: var(--focus-ring-shadow)` on `:focus-visible` (`field-control.css:63-67`)
- the `pre` → nothing

The ink register rules this explicitly (`color-radius.css:118-121`):

> Control perimeter and focus ring are GAP-INDEPENDENT — always **0.48**, because WCAG 1.4.11 does not care what is beside them.

`--ink-perimeter: 0.48` is documented at `color-radius.css:139` as the **3.0:1** rung. The component ships 0.

**Honest scope.** A text caret *does* appear (`caret-color` inherits; the box is editable), and a caret is commonly argued to satisfy WCAG 2.4.7 for text inputs. So I do **not** claim a 2.4.7 failure. I claim: (a) an unambiguous internal-consistency defect — one of four focusables in one dialog has no ring; (b) a probable **WCAG 2.2 SC 2.4.11 Focus Appearance** failure, since the insertion caret is not counted as the focus indicator under that SC and no ≥2px-perimeter / 3:1 indicator exists; (c) in forced-colors mode the stripped outline is *not* restored by the UA, so the high-contrast focus path is stripped too.

**Falsifier** If `preClass` is overridden at some call site to re-add a ring, the claim narrows to the default. Both call sites (`KeyframeTimeline.vue:135`, `:145`) pass **no** `pre-class`, so the default is what ships. Claim dies if a `:focus-visible` rule targeting `[contenteditable]` exists in the demo's stylesheets — I grepped `demo/styles/*.css`; none does.

---

### D-M3 · `border-border` is the ink glass-ui EXPLICITLY RETIRED for control perimeters
**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:54` (`border border-border`); built witness `.border-border,.border-border\/30{border-color:var(--border)}` (offset 202244 — the utility does emit); the ruling at `glass-ui/src/styles/tokens/color-radius.css:129-131`.

The design system's own words:

> `--border` **RETIRES as a divider ink** (it stays a SURFACE token above). Tan at α1.0 computes dip 47.5 / contrast **1.28:1** — it **fails 3:1 for a control perimeter** and is 1.43× the plate edge for a grouping line. It sits between two rungs and belongs to neither; two inks is a second colour system.

The `pre` is a control. Its perimeter therefore rules to `--ink-perimeter: 0.48` (3.0:1), composed as `color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%), transparent)` — or, if adopted wholesale, `--control-surface-border` = `--glass-border-floating` at **1.5px** (`field-control.css:12`, `glass.css:296`, `glass.css:251`). The component ships the retired token at 1px.

**Independent recompute (cross-check of the system's 1.28:1).** From tokens, light arm, anchoring the plate on `--card` (the anchor `ladder.css:198-208` uses for the light-backdrop bucket):

- `--border` = `--neutral-4` = `hsl(32 26% 70%)` → sRGB `(0.778, 0.705, 0.622)` → Y = **0.4711**
- `--card` = `hsl(30 85% 96%)` → sRGB `(0.994, 0.960, 0.926)` → Y = **0.9222**
- contrast = (0.9222 + 0.05) / (0.4711 + 0.05) = **1.87:1**

My anchor differs from theirs (they measure over the composited plate; I measure over opaque `--card`), and the two numbers differ accordingly — but **both fall well short of 3:1**, so the conclusion is robust to the anchor choice. The exact composited ratio over the live translucent `glass-floating` plate is **UNPROVEN-NEEDS-LIVE**.

**Falsifier** If `--border` were re-promoted to a control-perimeter ink in a later glass-ui, or if the box acquired a second, compliant boundary signal, this dies. The fill does not supply one: `bg-muted/50` composites `--muted` (`--neutral-1`, `hsl(38 26% 95%)`, Y after 50% mix over card = 0.9107) against the card's 0.9222 → **1.01:1**, i.e. no boundary information at all. (Note glass-ui's own `--input-on-glass` fill computes only 1.08:1 against the same anchor — the system deliberately leans on the *border*, not the fill, which is exactly why the border rung matters here.)

---

### D-M4 · `text-body` on the description breaks the √φ title/description interval, and INVERTS it above ~2086 px
**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:12` (`class="text-body text-muted-foreground"`) vs `DialogDescription.vue:14` (`cn('text-small text-muted-foreground', props.class)`); scale at `typography/scale.css:105-120`; `cn` semantics at `_shared/class-names.ts:65-95`.

`cn` buckets `text-body` and `text-small` **both** into `font-size` (`class-names.ts:82-85`), so last-write-wins and the consumer's `text-body` deterministically replaces the primitive's `text-small`. (No nondeterminism — I checked; see §5 K-2.) The override is therefore load-bearing and intentional-looking, and it is wrong.

The scale (`scale.css:105-120`):

```
--type-small:      clamp(0.875rem, 0.8rem  + 0.25vw, 1.25rem)     /* fluid */
--type-body:       clamp(1rem,     0.92rem + 0.27vw, 1.375rem)    /* fluid */
--type-subheading: 1.272rem  /* 20.4px — √φ — FIXED, a "typographic identity, not a control" (:98-99) */
```

`DialogTitle` is `text-subheading` (`DialogTitle.vue:15`) — **fixed**. The description is **fluid**. So the title:description ratio is a function of viewport width. At 16px root:

| viewport | title | desc @ `text-small` (system) | ratio | desc @ `text-body` (shipped) | ratio |
|---:|---:|---:|---:|---:|---:|
| 1280 px | 20.35 px | 16.00 px | **1.272 = √φ** | 18.18 px | 1.12 |
| 1440 px | 20.35 px | 16.40 px | 1.241 | 18.61 px | 1.09 |
| 1920 px | 20.35 px | 17.60 px | 1.156 | 19.90 px | 1.02 |
| 2086 px | 20.35 px | 18.02 px | 1.129 | **20.35 px** | **1.000 — crossover** |
| 2560 px | 20.35 px | 19.20 px | 1.060 | **21.63 px** | **0.94 — INVERTED** |

At 1280 px the system's own pairing lands **exactly on √φ** — 20.352 / 16.000 = 1.2720, the same √φ that names `--type-subheading`. That is not coincidence; it is the interval the scale is built to produce. The override collapses it to 1.12 and then inverts it: solving `0.92rem + 0.27vw = 1.272rem` gives **W = 2086 px**, above which the *description is larger than the title it describes*. 2560 CSS px is an ordinary 27" QHD at 1× or a 5K at 2× — the exact display class `scale.css:92` names ("the 27" 'font too small' the user flagged").

The system default never inverts (it is fluid-capped at 1.25rem = 20px < 20.35px), so this failure mode is **introduced by the override**, not inherited.

**Falsifier** Remove `text-body` and the interval returns to the ruled ladder. Claim dies if `--type-subheading` is ever made fluid on the same slope, or if `DialogContent` gains a container-width clamp that keeps the description below 20.35px. Neither exists today. The visual read at 2560 px is **UNPROVEN-NEEDS-LIVE**; the arithmetic is not.

---

### D-M5 · `text-small` bypasses `--control-text`, so the code box's type is 1/1.5 of every sibling control on a coarse pointer
**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:54` (`text-small` in `preClass`); `sizing.css:85` (`--control-text: calc(var(--type-small) * var(--ui-scale))`); `light-dark.css:17-22` (`@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5) } }`); `field-control.css:2-21` (`--field-control-font: var(--control-text)`); built witness `.text-small{font-size:var(--type-small)}` (raw, no scalar).

`--ui-scale` is the system's one comfort scalar, multiplied into the control register **exactly once** (`scale.css:96-97`). Every glass-ui field reads `--control-text`. The hand-rolled box reads `--type-small` directly.

On a coarse pointer the code box's text stays at `--type-small` while every neighbouring control's text grows 1.5×. At a 390 px phone viewport: `--type-small` = clamp floor = 14 px; a glass field on the same screen = 21 px. **The one surface the user must read character-by-character (CSS source, where `;` vs `:` and `0.5` vs `05` matter) is the smallest text in the dialog.** The one-token fix is `text-mono-small` + `font-size: var(--control-text)`, or simply adopting `Textarea` (D-M1).

**Falsifier** If the demo sets `--ui-coarse-scale: 1` at root the gap closes — I grepped `demo/styles/*.css`; it does not. Claim dies on a fine-pointer device (`--ui-scale: 1`), where the two registers coincide; it is a coarse-pointer-only defect and is scoped as such.

---

### D-M6 · No `DialogHeader` — the title/description pair is not grouped, so the dialog has a flat four-beat rhythm
**Severity** MAJOR (Aristotelian proportion) · **Provenance** `CSSPasteDialog.vue:11-19` (four direct grid children); `DialogContent.vue:228` (`grid … gap-4`); `DialogHeader.vue:12` (`flex flex-col gap-y-1.5 text-center sm:text-left`); barrel export `dialog/index.ts:13`.

`DialogContent` is `grid gap-4`. The component makes **four** direct children — title, description, `pre`, footer — so all three gaps are **16 px**:

```
title  ──16px──  description  ──16px──  code box  ──16px──  footer
```

The title and description are one semantic unit; the code box is another; the footer is another. Equal spacing between all four says they are four peers. The system rules the intimacy at **6 px** (`gap-y-1.5`) via `DialogHeader`, which is exported from the very barrel the component already imports from (`CSSPasteDialog.vue:33-40` imports six names from `@mkbabb/glass-ui`; `DialogHeader` is the seventh and is right there). The fix is one import and one wrapper element:

```
title ─6px─ description  ──16px──  code box  ──16px──  footer     (2.67 : 1 grouping ratio)
```

This also loses the primitive's responsive alignment: `DialogHeader` is `text-center sm:text-left`, so on <640 px the header should centre. The component uses `DialogFooter` (which *does* apply its mobile `flex-col-reverse` treatment) but not `DialogHeader` — a **half-adopted responsive grammar**: the footer restacks for mobile, the header does not re-align.

The system's own gap law is stated at `color-radius.css:114-117` — "a boundary is drawn only where the gap cannot carry the rank" — and the whole point is that *rank must be legible from the gaps alone*. Here it is not.

**Falsifier** If `DialogHeader` were unexported, or if `DialogContent`'s grid already tightened the first two rows, this dies. Neither: `dialog/index.ts:13` exports it, and `baseClasses` (`DialogContent.vue:228`) has one uniform `gap-4` with no row-specific rule.

---

### D-M7 · Three geometry values are `--ui-scale`-blind and one is viewport-relative where the system rules line-relative
**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:54` (`min-h-[20vh]`, `p-3`), `:22` (`class="gap-2"` on `Button`); built witness `.min-h-\[20vh\]{min-height:20vh}`, `.p-3{padding:calc(var(--spacing) * 3)}`; `field-control.css:18`, `:53-55`; `button/styles.css:10`.

| shipped | value | system rule | source |
|---|---|---|---|
| `p-3` | 12 px fixed | `padding-inline: calc(1rem * var(--ui-scale))`, `padding-block: calc(0.75rem * var(--ui-scale))` | `field-control.css:18,55` |
| `min-h-[20vh]` | 20 % of viewport height | `min-block-size: max(5lh, calc(5rem * var(--ui-scale)))` | `field-control.css:53` |
| `gap-2` on `Button` | 8 px fixed | `gap: calc(0.375rem * var(--ui-scale))` | `button/styles.css:10` |

Two distinct faults:

1. **Scale-blindness.** All three are fixed px. On a coarse pointer the system grows every control's padding and gap by 1.5× while this box's inner pad and its button's icon gap stay put. `gap-2` in particular is a *utilities*-layer class overriding the button's `@layer components` `gap:` — utilities beat components in Tailwind v4's layer order, so the ruled scalar is silently defeated. It buys 8 px where the rule wanted 9 px on touch: a small number, but the *mechanism* is the same one that produces the 12-vs-24 px pad error.

2. **Wrong unit family.** `20vh` sizes a *text* box by *screen* height. It is a code editor: the meaningful unit is lines, which is precisely why the system writes `max(5lh, …)`. Consequences: on a landscape phone (~360 px tall) 20vh = 72 px ≈ 3 lines at 14px/1.4; on a 1440 px-tall desktop it is 288 px ≈ 14 lines. The affordance's *character* changes with the window rather than staying "about five lines" everywhere. It also couples to D-B3: a `vh` floor with no `vh` ceiling is a one-way ratchet.

**Falsifier** If the demo pinned `--ui-scale: 1` unconditionally, fault 1 dies (it does not — `light-dark.css:17-22` ships the coarse block and the demo does not override it). Fault 2 dies if a design ruling exists preferring viewport-proportional editors — I found none in the glass-ui canon; `field-control.css:53` rules the opposite.

---

## 3 · MINORS

### D-m1 · `rounded-lg` (10 px) is the button/media corner, not the multi-line field corner (16 px); and no concentric derivation
**MINOR** · `CSSPasteDialog.vue:54` vs `theme/radius.css:77,86-87,97` and `field-control.css:54`.

`rounded-lg` → `--radius-lg` → `--radius` = `0.625rem` = **10 px**. That rung is shared by `--radius-button` and `--radius-media` (`radius.css:86-87`). The multi-line field rung is `--radius-field` = `--radius-2xl` = **16 px** (`radius.css:97`), explicitly minted "so a multi-line box stops inheriting the 9999px stadium pill" and applied at `field-control.css:54`. The dialog plate is `--radius-dialog` = `--radius-card` = 16 px (`radius.css:80`).

On the concentric law (`radius.css:31-47`): the `pre` is inset 24 px from the plate boundary (`--overlay-pad-inline`), so under the law's own carve-out ("A discrete child control floating inside a padded field/card is NOT that case") it *may* keep its own role silhouette. The defect is therefore not "it should be concentric" — it is "it wears the **button** silhouette while being a **field**". Note also `DialogContent.vue:302-303` asserts "Center dialogs need no relay (they are terminal, not a nesting host)"; this center dialog *does* host a rounded painted surface, so the primitive's premise is quietly false here. Booked as an observation, not charged as a defect against the consumer.

**Falsifier** Dies if `--radius-field` is retuned to 10 px, or if the box is re-cast as a display surface (a `CodeBlock`) rather than a field — but `cursor-text` + `contenteditable` make it a field.

### D-m2 · `text-subheading` and `text-muted-foreground` are re-passed to primitives that already apply them
**MINOR** · `CSSPasteDialog.vue:11` (`class="text-subheading"`) vs `DialogTitle.vue:15` (`cn('text-subheading leading-none tracking-tight', props.class)`); `:12` (`text-muted-foreground`) vs `DialogDescription.vue:14` (`cn('text-small text-muted-foreground', props.class)`).

Both are exact duplicates; `cn` dedups them to a no-op. Harmless in output, but it is the tell that the primitives were not read before being overridden — which is what produced D-M4 (the one class in that same attribute that *does* change behaviour, and changes it wrongly). Cite alongside D-M4.

**Falsifier** Dies if `DialogTitle`/`DialogDescription` drop those defaults.

### D-m3 · `font-mono text-small` where `text-mono-small` is the exact single token
**MINOR** · `CSSPasteDialog.vue:54` vs `typography/utilities.css:49-53`.

```css
@utility text-mono-small { font-family: var(--font-mono); font-size: var(--type-small); line-height: var(--type-leading-small); }
```

That is precisely what `font-mono` + `text-small` is trying to spell — as one token, with no ambiguity. The two-token spelling creates a genuine same-layer `font-family` collision: `text-small` also declares `font-family: var(--font-text)` (`semantic.css:216`), so which font the code box renders in is decided by concatenation order between the demo's Tailwind emission and glass-ui's bundled sheet.

**I checked the built witness and the collision currently resolves correctly**: `.text-small{font-family:var(--font-text);…}` at byte 214643 precedes `.font-mono{font-family:var(--font-mono)}` at byte 215439, so **`font-mono` wins and the box renders mono today**. I therefore make no visual-regression claim. The defect is *fragility*: a bundler reorder, a chunk split, or dropping glass-ui's sheet later in the cascade flips a code editor to a proportional face. And glass-ui's own `cn` conflict table declines to arbitrate — `font-mono` buckets `font-family` (`class-names.ts:90`) while `text-small` buckets `font-size` (`:82-85`), so the two survive dedup even where `cn` is used (here it is not; `preClass` is bound raw at `:16`). Note also `font-mono` is doubly redundant: Tailwind preflight already sets `code,kbd,samp,pre { font-family: …mono… }` (confirmed in the built base layer).

**Falsifier** Emission order in `index-CL_QYCiO.css`. Re-run the byte-offset check after any build-config change; if `.text-small`'s `font-family` ever lands last, the box goes sans and this MINOR promotes to MAJOR.

### D-m4 · `icon-md` (20 px) is the only 20 px button icon in the instrument; and `icon-md` ≠ `--icon-md`
**MINOR** · `CSSPasteDialog.vue:24` (`class="icon-md"`) vs `KeyframeTimeline.vue:22,38,53,68` (`icon-sm`) and `:119` (`icon-xs`); `demo/styles/design-idioms.css:108-113`; `glass-ui/src/styles/tokens/sizing.css:164`, `theme/bridges.css:301`.

Two observations:

1. **Local inconsistency.** Every other icon in the timeline instrument is `icon-sm` (16 px) or `icon-xs` (14 px). This one is `icon-md` (20 px). glass-ui's own dialog close is `w-4 h-4` = 16 px (`DialogContent.vue:486`). The 20 px glyph is a singleton.
2. **Namespace collision — the flat-namespace hazard, in the `icon-*` family.** The demo mints `@utility icon-md { @apply size-5 }` = **20 px** (`design-idioms.css:108`), while glass-ui's theme defines `--icon-md: 1rem` = **16 px** (`sizing.css:164`) and bridges it to `--spacing-icon-md` (`bridges.css:301`), which generates `size-icon-md`/`w-icon-md`. So in one stylesheet `icon-md` means 20 px and `size-icon-md` means 16 px. Nothing errors; a reader is simply misled.

The demo's own docblock (`design-idioms.css:92-95`) records that these utilities were added because "61 call-sites used to resolve to nothing, all computing at Lucide's default 24px" — so the family exists precisely to fix an emission void, which is credit to the demo, and the collision is the residue.

**Falsifier** Dies if a deliberate ruling sets footer-CTA icons at 20 px — I found none; and the sibling `Button`s in the same instrument contradict it.

### D-m5 · No empty state, no error state, no placeholder — and a whitespace-only submit silently no-ops
**MINOR** · `CSSPasteDialog.vue:13-18` (no placeholder mechanism); `KeyframeTimeline.vue:267-279` (`if (text.trim()) { … }` with no `else`).

On open the box is a bordered, faintly-filled rectangle with nothing in it. `initialText` defaults `""` (`:53`) and both call sites take the default. A `contenteditable` has no `::placeholder`; none is faked. The instruction lives only in the description above.

Then: pressing **Import** on an empty or whitespace-only box does *nothing at all*. No toast, no inline message, no disabled state on the button, no focus move — the dialog just sits there. `doImport`/`doAddCSS` guard on `text.trim()` and fall through silently. The system offered two outs and neither is taken: `Textarea`'s `placeholder` + `:user-invalid` states (`field-control.css:59,68-77`), and the toast channel the file already knows about (it imports `isInsideToaster` *because* toasts overlap this dialog — `useTimelineBuild.ts:148,157` already toasts for the other failure modes).

State coverage as shipped: **empty — unlabelled · loading — none (import is `async`, `:144`, with no pending affordance on the button) · error — delegated to toasts for parse failures only, absent for the empty case · RTL — see D-m8 · forced-colors — see D-M2(c)**.

**Falsifier** If the `Button` were `:disabled` while `text.trim()` is empty, the silent no-op becomes a legible state and this narrows to the placeholder alone. It is not (`:21-24` binds no `disabled`).

### D-m6 · No Cancel action in the footer for a destructive primary
**MINOR** · `CSSPasteDialog.vue:19-25`.

`DialogFooter` holds exactly one control: the affirmative. Dismissal is only via the close `X`, `Esc`, or an outside click. For an action that replaces the user's entire timeline (D-B2), a paired Cancel is the conventional and the safer footer grammar, and glass-ui exports `DialogClose` (`dialog/index.ts:10`) for exactly this. `DialogFooter`'s `flex-col-reverse sm:flex-row sm:justify-end` layout is *designed* for a two-button footer — it exists to reverse a [Cancel, Confirm] pair on mobile. With one child that machinery is inert.

**Falsifier** Dies if a ruling elsewhere in the repo standardises single-action dialogs — I found no such ruling, and `DialogFooter.vue:12`'s `flex-col-reverse` presupposes ≥2.

### D-m7 · `footer-extra` slot and `defineExpose({ textEl })` are unexercised API; the slot's mobile gap is 0
**MINOR** · `CSSPasteDialog.vue:20` (`<slot name="footer-extra" />`), `:79` (`defineExpose({ textEl })`); `DialogFooter.vue:12`.

Neither call site fills `footer-extra`; nothing reads the exposed `textEl` (grepped both usages). Speculative generality, against `feedback_kiss_no_contrivance`.

Worse, `textEl` is *structurally* null most of the time: this dialog takes `DialogContent`'s non-spring path (no `springPreset`, `placement` defaults `center` → `springMount` is `null` → `contentForceMount` is `undefined` → reka `Presence` unmounts on close, `DialogContent.vue:313-318,362-366`). So the exposed ref is null whenever the dialog is closed — an API that is only sometimes a value.

And a latent layout hazard if the slot is ever used: `DialogFooter` is `flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2` — the gap is `sm:` only, so **below 640 px two footer children stack completely flush**, 0 px apart. That is glass-ui's defect, not the consumer's; it is booked here because this component's dead slot is the trigger that would expose it, and it should be relayed to the glass-ui BH inbox per the standing relay edict.

**Falsifier** Dies the moment a caller fills the slot or reads `textEl`; grep says neither happens today.

### D-m8 · The code region declares no `dir`, no `spellcheck`, no autocorrect/autocapitalize suppression
**MINOR** · `CSSPasteDialog.vue:13-18`.

A `contenteditable` region holding *source code* should pin `dir="ltr"` (CSS source is LTR regardless of UI locale; under an RTL base direction bidi reordering visually relocates `;` `{` `}` `(` `)` around the neutral runs), and should carry `spellcheck="false"` (otherwise every property name gets a red squiggle) plus `autocorrect="off" autocapitalize="off"` (iOS otherwise capitalises after `;` and substitutes smart quotes/dashes into `content: "…"` and `-` in `translate3d`, corrupting the CSS before it is ever parsed).

RTL is currently theoretical for this demo — I found no `dir` attribute, no i18n layer, and no logical-property RTL work in `demo/`, so the app is effectively LTR-only. Scoped accordingly: the RTL half is a **latent** hazard; the spellcheck/autocorrect half is live on any touch device today.

**Falsifier** If the demo never ships RTL and never runs on iOS, both halves are moot. `vite.config.ts` `server.host: true` and the repo's documented iOS-Safari debugging work say otherwise for the second half.

---

## 4 · INFO

- **D-i1 · The `--kf-*` flat-namespace hazard is checked and ABSENT here.** I enumerated every `--kf-*` custom property in `demo/` — **zero occurrences repo-wide**. This component declares no custom properties at all and reads only glass-ui semantic tokens. The hazard named in the brief does not bite this file. *Falsifier:* any `--kf-` grep hit in `demo/`.
- **D-i2 · No inline-end reserve against the absolutely-positioned close.** `DialogContent` pins the `X` at `right-(--overlay-pad-inline) top-(--overlay-pad-block)` (24 px / ~30.5 px, `DialogContent.vue:484`); `DialogTitle` is a full-width grid child with no `pr-*`. Today's titles ("Import CSS @keyframes", 21 chars at 20.4 px ≈ 210 px inside a 464 px content box) clear it comfortably, so there is **no live collision** — but the prop is `title: string` with no length contract, so a longer title runs under the glyph. Latent only.
- **D-i3 · `contenteditable="true"` rather than `"plaintext-only"`.** Pasting from a syntax-highlighted source injects markup into the editing host. It is self-healing here (D-B1's `textContent` reset wipes it on the next input), so there is no lasting visual defect — but the correct declaration for a plain-text code box is `plaintext-only`, and it would also stop rich paste from ever entering the DOM.

---

## 5 · KILLED CLAIMS — candidate defects the tree falsified

Recorded so the next auditor does not re-raise them. Each was a live hypothesis; each died.

| id | hypothesis | how it died |
|---|---|---|
| **K-1** | `min-h-[20vh]` sits inside a TS **string literal** in a prop default, so Tailwind's content scan misses it and the box collapses — the D7 emission inverse that `DialogContent.vue:256` warns about. | **FALSE.** Built witness emits `.min-h-\[20vh\]{min-height:20vh}`. Tailwind v4's scanner reads SFCs as plain text and extracted it. |
| **K-2** | `text-body` + `text-small` are an unresolved same-bucket conflict → nondeterministic description size. | **FALSE.** `class-names.ts:82-85` buckets both as `font-size`; `dedupClasses` (`:198-225`) keeps the last. Deterministic. The *outcome* is still wrong — promoted to D-M4 on different grounds. |
| **K-3** | `bg-muted/50` loses its alpha modifier (emitted as bare `var(--muted)`). | **FALSE.** The bare rule is the no-`color-mix` fallback; the real rule follows inside `@supports (color:color-mix(in lab, red, red))` with `color-mix(in oklab, var(--muted) 50%, transparent)`. |
| **K-4** | `border-border` never emits, so `border` falls back to `currentColor` (a near-black 1px rule). | **FALSE.** It emits inside a grouped selector at byte 202244: `.border-border,.border-border\/30{border-color:var(--border)}`. The *choice* of token is still wrong — that is D-M3. |
| **K-5** | `icon-md` is not a glass-ui utility, so the icon renders at Lucide's default 24 px. | **FALSE.** The demo mints it locally at `design-idioms.css:108` (`size-5` = 20 px) and it emits. Residual namespace divergence booked as D-m4. |
| **K-6** | `font-mono` + `text-small` currently renders the code box in the **sans** face. | **FALSE** for the shipped bundle: `.font-mono` (byte 215439) follows `.text-small`'s full recipe (byte 214643), so mono wins. Only the *fragility* survives, as D-m3. |

---

## 6 · SUPERLATIVES (L-18 runs both ways)

### D-S1 · Zero hand-rolled motion, zero scoped `<style>` — PRM honesty is fully and correctly inherited
**Provenance** the whole file (80 lines: `<template>` + `<script setup>`, **no `<style>` block**, no inline `transition`/`animation`, no `@keyframes`, no rAF); `DialogContent.vue:96-132,220-235` (the `.glass-reveal` / spring paths and the `motionAxis.prefersReducedMotion` degradation of `scale`/`immersive` → `dim`); `glass/reveal.css:293-298` (`@media (prefers-reduced-motion: reduce)` carve).

Every frame this dialog paints — the plate bloom, the scrim fade, the stage flip — belongs to `DialogContent`, which is 491 lines of ruled, PRM-bracketed motion. The component contributes none and therefore cannot contradict it. That is exactly the right amount of motion authorship for a consumer, and it is the discipline its own sibling had to learn the hard way: `KeyframeTimeline.vue:89-95` records that its hand-rolled keyframe-editor transition was "a near-exact re-author **MISSING the PRM guard**" and had to be deleted in favour of glass-ui's published `.fade-slide` (see also `KeyframeTimeline.vue:310-312`). CSSPasteDialog never made that mistake.

**Falsifier (L-18)** Any `<style>` block, inline `transition`/`animation`, `requestAnimationFrame`, or motion-bearing utility in this file. There are none — I read all 80 lines.

### D-S2 · The `@interact-outside` toast guard is a genuinely considered interaction decision, correctly centralised
**Provenance** `CSSPasteDialog.vue:4-9`; `demo/components/instrument/utils/toastGuard.ts:1-28`.

```vue
@interact-outside="(event) => { if (isInsideToaster(event.target)) return event.preventDefault(); }"
```

The failure this prevents is subtle and easy to never notice: `importCSS` toasts on success *and* on parse failure (`useTimelineBuild.ts:148,155,157`), toasts render above the modal, and a user clicking the toast — often to dismiss the very error telling them their CSS is malformed — would have their dialog dismissed underneath them, losing the paste. Someone thought about that.

The implementation is exemplary too. The vue-sonner attribute is a *private* DOM contract; rather than inlining a magic selector, it is a named module with a docblock that states the attribute, pins the dependency (`vue-sonner ^2.0.9`), explains why no public predicate exists, and names the adoption path if one ships. I grepped: `[data-sonner-toaster]` appears at exactly **one** selector site repo-wide (`toastGuard.ts:18`); the only other mentions are two *prose* references in `useTabStripScroll.ts:29,69` citing this same disposition. Single-sourced, greppable, honest — precisely what the corpus asks of a vendor-DOM coupling.

**Falsifier (L-18)** A second literal `[data-sonner-toaster]` selector anywhere, or the guard inlined without the module. Neither exists.

### D-S3 · The parameterised shell is the right de-duplication
**Provenance** `CSSPasteDialog.vue:43-56` (`title`/`description`/`buttonLabel`/`buttonIcon`/`initialText`/`preClass`); `KeyframeTimeline.vue:135-152` (two instantiations).

One 80-line component serves two dialogs that differ only in prose and glyph, with the variable parts hoisted to typed props (`buttonIcon?: Component` is properly typed, not `any`), the model on `defineModel<boolean>("open", { required: true })`, and a `watch` that re-seats `text` on open (`:65-69`) — necessary and correct, because the *portal content* unmounts on close while the component itself does not.

This is worth stating plainly against D-B2: **the shell is not the defect**. Two dialogs that are genuinely the same operation *should* share one component. The defect is that the copy poured through it asserts a difference the operation does not have. Fixing D-B2 means changing the strings and the handler, not the shell.

**Falsifier (L-18)** If the two call sites diverged enough that the shell needed conditionals, the abstraction would be premature. They pass 4 props each and differ in 4 values — the abstraction is exactly sized.

---

## 7 · Fold-forward

- **To the census.** `lane-frontend.md:204` must be amended: `CSSPasteDialog.vue` is **not** `G`. Propose booking it as **S-9 · `pre[contenteditable]` → `Textarea`** in the shadow-component family, sized at 1 element / 1 class-string but carrying **9 forfeited ruled behaviours** (D-M1), which is a heavier remediation than S-6 or S-7 despite being ~1/100th the line count. The lane's line-count heuristic is the reason it was missed; recommend a second pass over every row currently marked `G` on import-list evidence alone.
- **F-1 dependency.** Everything measured here resolves against `node_modules/@mkbabb/glass-ui` 7.0.0, which `lane-frontend.md:15` records as a **phantom dependency** (absent from `package.json` *and* the lock). All token and recipe citations above are therefore reproducible only against the current `node_modules` state. **F-1 must land before any remediation wave**, exactly as `lane-frontend.md:612` sequences it.
- **Glass-ui BH relay** (standing edict, `feedback-glassui-bhbi-relay`): one library-side item found — `DialogFooter.vue:12` has `sm:gap-x-2` with no base-breakpoint gap, so a two-child footer stacks flush below 640 px (D-m7).
- **To SS-13 (live visual).** Four items are marked **UNPROVEN-NEEDS-LIVE**: the caret landing position in D-B1; the composited border ratio over the live `glass-floating` plate in D-M3; the read of the inverted title/description pair at ≥2086 px in D-M4; and the overflow behaviour of a 200-line paste in D-B3.
