# CHALLENGE-D — PaletteCard: the design is flawed (pass 2, 2026-07-28)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context arm), the tier
explicitly declared at spawn. The seat is declared, not inherited. No defect on this axis.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/card/PaletteCard/` — six files, 876 lines
(`PaletteCard.vue` 364 · `PaletteCardMenu.vue` 228 · `PaletteCardSwatches.vue` 96 ·
`PaletteRenameInput.vue` 66 · `PaletteCardMeta.vue` 64 · `ActionFeedback.vue` 58).

---

## Provenance — this is pass 2; pass 1 is preserved verbatim

An earlier CHALLENGE-D seat (Opus 5, 2026-07-27 18:38) ran this axis. Its report is preserved
unaltered at **`challenge-D-design.pass-1-2026-07-27.md`** and remains the fuller catalogue of
type-rung and C-ladder measurements. This pass is an **independent adversarial re-run**, driven by
the owner's new marks **MT-F036 / OM-11 / OM-12** (2026-07-27), against the compiled glass-ui 7.0.0
distribution rather than against source intent.

It converges with pass 1 on the two blockers — the card is the artefact the constitution forbids,
and the palette name renders at 0 px — which is independent corroboration, reproduced here on a
different browser engine with a different seed. It adds four mechanisms pass 1 did not have, and
**corrects one claim pass 1 got wrong**:

> pass 1, §1: *"Three stacked hard casters, plus **a fourth lagging `.cartoon-cast` child**
> (`PaletteCard.vue:30`) **driven by** `useLiquidPress` (`:263-267`)."*

That is false at runtime. `.cartoon-cast` matches **zero rules** in the running document and
computes to `display:inline; position:static; box-shadow:none;` with a **0 × 0** box; `useLiquidPress`
writes `--card-press-t`, which has **zero readers** anywhere in the repo or in glass-ui, while the
producer's cast reads `--cartoon-press-t`. The shadow is single, not doubled. The correct charge is
worse than the one pass 1 laid: not a fourth caster, but **dead decoration and a dead motion drive**
left behind by the glass-6 → glass-7 adoption — which is also the named mechanism for the owner's
"no hover state" mark. See D-4 and D-5.

Read both. Where they disagree on a measured value, this pass pasted the computed style.

---

## Verdict

**DEFECTIVE.** Nineteen findings, four BLOCKER. The premise holds and then some: this is not a flawed
implementation of a good design — it is a **different object from the one the tranche canon
specifies**, and one of its states destroys the card's primary content outright.

The strongest defect is not stylistic. At 390 px the palette's **name renders at 0 px wide** while
its decorative tag chips render at full width. The identity — the one datum a person is scanning for
— is the only shrinkable item in a flex row of ten `shrink-0` ornaments. Measured, and visible in a
screenshot taken this session.

Beneath it sits the fault the owner's marks point at: the card hand-rolls a `cartoon-surface`
decoration register that **glass-ui 7.0.0 no longer implements**, so it ships a three-facet hard
shadow slab with *no hover, no press, no focus*, plus a dead `<span>` and a dead JS spring.

---

## Method and probe log

Static: full read of all six SFCs, `useHeightTransition.ts`, `useHoverPopover.ts`, the three canon
documents (`PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md`), the mega-tranche
visual `REPORT.md`, the owner-marked `OM-11` / `OM-12` witnesses, and the **compiled** glass-ui 7.0.0
distribution under `node_modules/@mkbabb/glass-ui/dist/**` (this is the pass-2 difference: pass 1
judged the consumer against the canon; this pass judges the consumer against the producer's shipped
CSS).

Live: Playwright/Chromium against the running dev server `http://localhost:9000`, `/#/palettes`, with
`localStorage["color-palettes"]` seeded to six palettes reproducing the owner's OM-11 data shape
(three tag chips + `forkCount:3` + `versionCount:4`), plus an empty palette and a 24-colour palette.
Viewports 1440 × 1000 and 390 × 844. All numbers below are pasted tool output.

Own witness written this session, tracked in this folder:
**`evidence/pass2-390-title-starvation.png`** (full-page, 390 × 844).

---

## Findings

### D-1 — BLOCKER — The palette name renders at **0 px** on mobile; the tag chips do not

**Evidence** — measured, `/#/palettes` at 390 × 844, `getBoundingClientRect()` on the identity span
and every sibling of its flex row:

```
{ label: "Palette: Sunset Ridge", cardW: 324,
  titleW: 0,  titleScrollW: 65,  titleText: "Sunset Ridge",
  rowW: 252,  metaChildren: 8,
  chips: [ svg 16, badge-atom 29, flex 21, flex 21,
           rounded-full 40, rounded-full 31, rounded-full 40 ] }

{ label: "Palette: Deep Ocean",  titleW: 0,  titleScrollW: 61, ... }
{ label: "Palette: A very long palette name …", titleW: 4, titleScrollW: 100, ... }

{ label: "Palette: Empty", titleW: 64, titleScrollW: 64, metaChildren: 3 }   // no chips → name survives
{ label: "Palette: Fifty", titleW: 45, titleScrollW: 45, metaChildren: 3 }   // no chips → name survives
```

Visual witness `evidence/pass2-390-title-starvation.png`: the Sunset Ridge and Deep Ocean cards show drag
handle, count badge (`5`, `3`), fork count, version count, `warm` `test` `alpha`, and the `…` menu —
and **no name at all**. The one card that shows a name is the one with no metadata.

**Mechanism** — `PaletteCard.vue:43–79`. The identity row is a single
`flex items-center gap-2 min-w-0`. Every ornament carries `shrink-0`: drag handle (`:49`), featured
badge (`:64`), count badge (`:72`), and all five chip species `PaletteCardMeta` emits
(`PaletteCardMeta.vue:9,18,27,39,45`). The title span (`:53–59`) carries no `shrink-0` and no
`min-width`, so it is the *sole* flexible item and absorbs 100 % of a 198 px deficit.
`line-clamp-2 sm:line-clamp-1` clamps lines, not width, so it cannot save it.

**Reproduction** — seed `localStorage["color-palettes"]` with a palette carrying
`tags:["warm","test","alpha"], forkCount:3, versionCount:4`; open `/#/palettes` at 390 × 844. This is
exactly the data shape in the owner's own `OM-11` witness, so it is the shipping configuration.

**Cure (gestalt, not patch)** — the identity is a *row*, not a flex item: `identity line` (own block,
full measure, `--type-subheading`) then `metadata line` (a wrapping rail with an overflow budget —
N chips then `+k`). Do **not** add `shrink-0` to the title; that trades a vanished name for a
horizontally overflowing card. Under the canon cure (D-2) the identity lives inside the pressed seat
and the metadata rail moves to the selected inspector, dissolving the contention entirely.

---

### D-2 — BLOCKER — The card is not the Card the canon specifies, and its activation is a mouse-only `<div>`

**Evidence** — measured root, `/#/palettes` at 1440:

```
rootClass : "group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer"
role      : "article"      tabIndex : -1      onkeydown : false
boxShadow : oklab(… /0.32) -3px 3px 0 0, oklab(… /0.26) -5px 5px 0 0, oklab(… /0.18) -7px 7px 0 0
```

`PaletteCard.vue:5–27` — a `<div role="article" … cursor-pointer @click="$emit('click')">`. There is
no `<Card>`, no `<button>`, no `tabindex`, no key handler anywhere in the folder.

**Canon, verbatim** — `VISUAL-CONSTITUTION.md §5`:

> A palette card is a bounded entity article, **not a clickable `role=article`**, `listbox`/`option`
> composite, or seven-mode omnibus. One native named `<button type="button">` spans its
> specimen/identity region and expresses inspector selection only through `aria-pressed`… **The card
> body owns no expand, inline rename, action menu, transient result or hover-only swatch-action
> path.**

`§3.1` / `PROPORTION-AUDIT.md §5.12`:

> Every Browse/Library palette entity Card uses exactly `{size:"sm", material:"content",
> tier:"quiet", surface:"opaque", shadow:false, grain:false, specular:"off"}` … **has no
> cartoon/grid/selected variant** … The Card/article root is a **noninteractive container**: it owns
> no activation, focus or selection state.

Every clause is violated: no `Card`, `cartoon-surface` present, shadow present and measured, the root
owns activation, and the body hosts expand + inline rename + action menu + transient result +
hover-only swatch actions — the exact five the canon enumerates as forbidden. (Pass 1 §1 tabulates
all six prohibitions against source coordinates; that table stands.)

The canon-mandated Card exists and is unused:
`node_modules/@mkbabb/glass-ui/dist/components/card/Card.vue.d.ts` exposes `size`, `material`,
`shadow: boolean`, `surface`, `grain`, `specular` — the frozen tuple by name.

**Consequence beyond canon** — `tabIndex: -1` with no keydown means the card's primary affordance
(click → select/expand) is **unreachable by keyboard and by AT**. Every consumer wires
`@click="pm.toggleExpand(...)"` (`BrowsePane.vue:101`). There is no keyboard path to a palette.

**Cure** — adopt the canon shape: `<Card>` with the frozen tuple as a noninteractive container; one
native `<button type="button" aria-pressed>` seat spanning specimen + identity. This is not a
refactor of this file; it is the deletion of its premise — see D-10.

---

### D-3 — BLOCKER — MT-F036 (a): the hard-edged faceted shadow slab, at its root

**Evidence** — the owner's witnesses `audit/visual/owner-marked/OM-11-palette-card-shadow-artifacts.png`
and `OM-12-palette-card-shadow-artifact-closeup.png` show a stepped grey slab trailing bottom-left of
each card with a square outer corner. Resolved token:

```
--shadow-cartoon-md
  = -3px 3px 0 color-mix(… var(--cartoon-ink) 32%, transparent),
    -5px 5px 0 color-mix(… var(--cartoon-ink) 26%, transparent),
    -7px 7px 0 color-mix(… var(--cartoon-ink) 18%, transparent)
```
(`node_modules/@mkbabb/glass-ui/dist/styles/tokens/shadow.css:1`)

Three offset copies of the border-box at **zero blur radius**. Three discrete facets by construction;
offset diagonally, so the bottom-left corner is a visible staircase. That is the whole mechanism —
MT-F027's class exactly. Applied by the one rule the utility owns
(`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css:1`):

```css
@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
```

**Aggravating, and new in this pass:** glass-ui pairs its cartoon shadows with a solid ink outline —
`:where(.shadow-cartoon-sm,.shadow-cartoon-md,.shadow-cartoon-lg) { border: 2px solid var(--border) }`
(`dist/styles/utilities/components.css:1`). `cartoon-surface` sets only `border-width: 2px`;
PaletteCard supplies the colour via `border-card-edge`, measured
`oklab(0.216128 0.00350075 0.00518669 / 0.12)` — **12 % alpha on a 2 px stroke**. The card therefore
ships cel *shadow* without cel *line*: a heavy three-facet cast hung off an almost invisible edge.
That incoherence, not the shadow alone, is what reads as an artifact in OM-11.

**Cure (root)** — the canon disposition is already written: `shadow=false` on the frozen tuple. The
cartoon register is producer decoration, not the material of a specimen slip. Delete
`cartoon-surface` from this consumer; do not tune the offsets, and do not add a consumer
`box-shadow: none` override — that is precisely the per-instance patch edict 5 forbids.

---

### D-4 — BLOCKER — MT-F036 (b): the interactive container has **no hover, press, or focus register at all**

**Evidence** — the complete inventory of every rule in the running document whose selector mentions
`cartoon` (walked over all 53 stylesheets / 5 351 rules):

```
.cartoon-surface                     { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
.shadow-cartoon                      { box-shadow: var(--shadow-cartoon); }
.liquid-enter.is-cel > .cartoon-cast { position:absolute; inset:0; z-index:-1; border-radius:inherit; box-shadow:…; }
.liquid-enter.is-cel > .cartoon-cast { …animation… }                      (×3 variants)
:where(.shadow-cartoon-sm,-md,-lg)   { border: 2px solid var(--border); }
.shadow-cartoon-sm / -md / -lg       { box-shadow: …; translate: 0 -1px; }
```

And every `:hover` / `:active` rule in the document whose **subject** is one of the card root's six
classes:

```
".group-[.destructive]:hover:border-destructive/30 {}"        ← empty declaration block
".group-[.destructive]:hover:bg-destructive {}"               ← empty declaration block
".group-[.destructive]:hover:text-destructive-foreground {}"  ← empty declaration block
```

Three empty Tailwind variant registrations that additionally require `.destructive` on the group.
**Zero hover. Zero active. Zero focus. Zero transition** (measured `transitionDuration: "0s"`). The
scoped `<style>` block (`PaletteCard.vue:337–364`) contains only `.featured-badge`,
`.featured-badge__icon svg` and `.rename-morph`.

**Mechanism — a glass-7 adoption regression; the source comment is now false.**
`PaletteCard.vue:7–18` asserts:

> the `cartoon-surface` atom owns the hover/press choreography (translate/scale on
> `--ease-cartoon-punch` @ `--duration-normal`, shadow bezier md→lg, `:active` squash, 2px border)

Glass-ui 7.0.0's `cartoon-surface` owns three declarations and none of them is motion. The card was
built against a producer contract that no longer exists; W44 adopted glass 7 whole and this consumer
was never re-verified. A card with `cursor-pointer` and a click handler that gives **no feedback on
hover, press, or focus** is not under-polished — it is undesigned.

**Cure — a BJ ask, never a local patch.** Per owner edict 4 the hover/press/focus register for a card
belongs at the glass/card root. The request to glass-ui: *the canon palette entity slip needs a
producer-owned interactive register on `Card` (or on the named pressed seat) — resting → hover →
pressed → focus-visible — in the glass motion vocabulary, PRM-gated at the producer, so consumers
never hand-roll it.* Under the canon shape (D-2) the register attaches to the `<button aria-pressed>`
seat, not to the article root, which also fixes the fact that the current root can be hovered but
never focused.

---

### D-5 — MAJOR — A dead `<span>` and a dead JS spring on every rendered card (legacy edict) — *corrects pass 1*

**Evidence** — measured computed style of `PaletteCard.vue:30`'s `<span class="cartoon-cast">`:

```
display: "inline",  position: "static",  boxShadow: "none",  zIndex: "auto",
borderRadius: "0px", translate: "none", scale: "none",
rect: { width: 0, height: 0 }
```

It matches **no rule**: the only `.cartoon-cast` selectors in the document are
`.liquid-enter.is-cel > .cartoon-cast`, and the card root carries neither class. The bare
`.cartoon-cast` rule ships in `dist/styles/glass/glass-atom.css`, but that file is not reachable from
the `@mkbabb/glass-ui/styles` entry graph (`dist/styles/index.css` imports `glass.css`, not
`glass/glass-atom.css`). So the element is an empty inline box, present once per card, purely to
satisfy the comment above it.

And the drive that was meant to move it:

```
inline style on every card root: "--card-press-t: 0.0000; --flex-vel: 0.0000;"
```

```
$ grep -rn "card-press-t" node_modules/@mkbabb/glass-ui/dist/       → (no matches)
$ grep -rn "card-press-t" demo/ src/
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:29   (comment)
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:260  (comment)
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:264  (pressVar: "--card-press-t")
```

`--card-press-t` has **zero readers anywhere**. The producer's cast reads `--cartoon-press-t`
(`@property --cartoon-press-t { syntax:"<number>"; inherits:true; initial-value:0 }`,
`dist/styles/tokens/property-regs.css`). The variable name never matched. `--flex-vel` is
`@property`-registered and read by nothing. `useLiquidPress` is imported at exactly one site in the
whole demo — this file.

So each card mounts a spring clock and six pointer handlers (`v-bind="press.handlers"`,
`:style="press.pressStyle.value"`) to write two custom properties nobody reads, into an element that
isn't styled, to move a span with no box. **This is why the card has no press feedback** — and it is
the second half of the owner's MT-F036 mark, mechanised.

**Cure** — delete the `.cartoon-cast` span and the `useLiquidPress` call outright. Press feedback
arrives with D-4's producer register on the seat. Owner edict 2 (no legacy, no dual paths, no masking
fallbacks) makes this mandatory.

---

### D-6 — MAJOR — Radius concentricity error at the colour strip (the crescent in OM-11)

**Evidence** — measured, same card:

```
card:  x 33,  borderTopLeftRadius 16px,  borderTopWidth 2px
strip: x 35,  borderTopLeftRadius 16px                        ← inset 2px, same radius
```

**Mechanism** — `PaletteCard.vue:33–37` gives the strip `rounded-t-card`, i.e. the card's *outer*
radius, but `cartoon-surface`'s 2 px border pushes the strip 2 px inside the border box. Concentric
curves require `inner = outer − border`; the correct value is **14 px**. Two 16 px arcs offset by
2 px are not parallel, so a wedge of `bg-well` up to 2 px wide shows between the strip's arc and the
border's inner arc at both top corners. That is the light crescent above the red and blue strips in
`OM-11`.

The comment at `:16–18` explains why the card deliberately does not clip ("a card-level radius clip
rasterizes 1-bit at compositing-layer bounds; the strip clips its OWN corners") — sound reasoning
that then forgot to subtract the border.

**Cure** — the strip radius derives from the container's radius and border in one place. Under the
canon tuple the strip becomes a full-bleed child of a producer-clipped surface and the arithmetic
disappears. If the local shape survives, the radius is one derived token, not a repeated literal.

---

### D-7 — MAJOR — The expand/collapse motion is untokenized, layout-forcing, and ignores `prefers-reduced-motion`

**Evidence** — `demo/palettes/browser/card/composables/useHeightTransition.ts`:

```ts
const DEFAULT_EXPAND_DURATION = 350;
const DEFAULT_COLLAPSE_DURATION = 250;
const EXPAND_EASING   = "cubic-bezier(0.16, 1, 0.3, 1)";  // matches --ease-out-expo
const COLLAPSE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";   // matches --ease-standard
…
htmlEl.style.transition = `height ${expandDuration}ms ${EXPAND_EASING}, opacity …`;
void htmlEl.offsetHeight;                                  // forced reflow ×3 across the hooks
htmlEl.style.height = `${targetHeight}px`;
…
htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
```

```
$ grep -rn "prefers-reduced-motion\|matchMedia" demo/palettes/browser/card/
demo/palettes/browser/card/ShadowPalette.vue:25:   (a comment)
```

Nothing else. Four defects in one file:

1. **Untokenized durations.** 350 / 250 ms are hand-tuned literals, and the header comment admits it:
   *"no exact glass-ui canon match — 350ms sits between `--duration-normal` 300ms and
   `--duration-slow` 450ms."* `§6`: *"Spatial continuity uses one producer-owned glass-ui spring
   register."* A duration chosen because it sits *between* two rungs is an off-ladder value by
   definition.
2. **Forked easing.** The cubic-bezier literals are copies of token values, annotated "matches
   `--ease-out-expo`". If the producer retunes the token, this drifts silently and forever.
3. **`height` animation.** Animating `height` forces layout every frame for every expanding card,
   with three explicit `void offsetHeight` reflows on top. `max-height` — which the sibling `vj-*`
   families already use (`demo/styles/animations.css:122,131,135`) — or a grid-rows morph does not.
4. **No PRM arm.** The `vj-morph` / `vj-celebrate` families used by the rename input and the feedback
   chip *are* globally neutralised (`demo/styles/animations.css:184`). This JS path bypasses that
   guard entirely — an inline `style.transition` written at runtime is unreachable by a media query.
   `§6`: *"Reduced motion resolves directly to the final geometry and stable chromatic state."*
   Additionally `scrollIntoView({behavior:"smooth"})` fires unconditionally on every expand, moving
   the viewport under a user who asked for no motion.

**Cure** — the expand disclosure is deleted by the canon shape (detail lives in the selected
inspector). Any surviving local disclosure uses the producer spring register through the `vj-*` CSS
families, with `interpolate-size`/grid-rows rather than `height`, inheriting the global PRM guard for
free.

---

### D-8 — MAJOR — The reorder handle is an unnamed, unfocusable 16 × 16 icon

**Evidence** — `PaletteCard.vue:47–50`:

```html
<GripVertical v-if="draggable"
  class="drag-handle w-4 h-4 text-muted-foreground shrink-0 cursor-grab active:cursor-grabbing" />
```

Measured `{ w: 16, h: 16 }`. No `role`, no `tabindex`, no `aria-label`, no key handling, no `title`.
It is an `<svg>` with a grab cursor.

**Canon** — `§3.1` and `PROPORTION-AUDIT.md §5.12`: *"An optional reorder handle is a separate
**named** control."* `§5.2` requires keyboard reorder: *"after Space grabs, Down = next ordinal …
every move announces item and `position of total`; Space drops, Escape cancels."* None of that is
possible against a non-focusable graphic. `PR-07` names the family: *"Hover-only/unlabeled controls
and invisible drag state → ADD-AFFORDANCE / REMOVE."* `§5.5`: *"A small icon/mark is either data,
status, labeled action, drag affordance, focus/selection register or removed. Decorative controls and
operable ornaments without names are forbidden."*

16 px is also below every tap floor; `REPORT.md:34` already counts 8 small tap targets per
`/#/palettes` capture without any card even rendering.

**Cure** — a named `<button type="button">` seat carrying the grip glyph, with the Space-grab
protocol and an ordinal announcement; or, if reorder is not a shipped affordance this tranche, remove
the glyph. Do not leave an operable ornament.

---

### D-9 — MAJOR — Operation truth is a 2.5-second transient, injected imperatively through a component ref

**Evidence** — `PaletteCard.vue:238–244` exposes `showFeedback` via `defineExpose`; the parents hold
a map of child instances and call into them:

```
demo/palettes/BrowsePane.vue:209  const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
demo/palettes/BrowsePane.vue:230  card.showFeedback("Saved!", "success");
demo/palettes/BrowsePane.vue:239  card.showFeedback(result.message, "error");
demo/palettes/BrowsePane.vue:249  cardRefs[palette.slug]?.showFeedback(result.message, result.success ? "success" : "error");
demo/palettes/BrowsePane.vue:264  cardRefs[palette.slug]?.showFeedback(message, "error");
demo/palettes/PalettesPane.vue:207 card.showFeedback(result.message, result.success ? "success" : "error");
```

`ActionFeedback.vue:23–47` auto-dismisses after `autoDismissMs = 2500`.

**Canon** — `§5`: *"Persistent operation state stays with the entity/workspace. A transient flourish
may celebrate success but **never carries the only truth**."* And *"The card body owns no … transient
result."* `PR-08`: *"Pending/failure/export/recovery truth only transient → ADD-AFFORDANCE."*

Here a **failure** message is the only truth the user ever gets, it lives inside the child, and it
evaporates in 2.5 s. If the card unmounts (sort, filter, page) the result goes with it. The
imperative `ref.method()` channel also means the parent cannot render, replay, or test the state
without mounting the child.

**Cure** — operation state is owner-held per entity (`{ pending | ok | failed(reason) }`) and rendered
in the selected inspector's durable status region; the card may keep a silent celebration. Delete
`defineExpose`; the ref map goes with it.

---

### D-10 — MAJOR — The six-file split is not along seams: a god module distributed across six files

The seat asks whether the decomposition is real. It is real for two of six files and cosmetic for the
rest.

| file | lines | owns state? | props | emits | verdict |
|---|---:|---|---:|---:|---|
| `PaletteCard.vue` | 364 | rename, feedback, menuOpen, press, hover-popover, height-transition | 11 | 17 | the god module |
| `PaletteCardMenu.vue` | 228 | `apiOffline` only | 5 | 2 | thin; 9 conditional items — defensible |
| `PaletteCardSwatches.vue` | 96 | **none** | 8 | 8 | pass-through, not a seam |
| `PaletteCardMeta.vue` | 64 | **none** | 1 | 1 | multi-root fragment, not a seam |
| `PaletteRenameInput.vue` | 66 | `localName` | 1 | 2 | genuine seam |
| `ActionFeedback.vue` | 58 | dismiss timer | 4 | 1 | genuine seam |

**`PaletteCardSwatches` is a mechanical extraction.** It owns nothing. It takes 8 props — including
`floatingStyle`, `openPopoverIndex`, `canHover`, `swatchClass` — and re-emits 8 events, every one of
which the parent forwards straight back into `useHoverPopover`. The parent must know the child's
entire interaction model; the child cannot be reasoned about alone. Moving 96 lines out of a file
does not create encapsulation when the coupling surface is 16 members wide.

**`PaletteCardMeta` has no root element at all.** Its template is five sibling root nodes
(`PaletteCardMeta.vue:8,16,26,36,43`) laid out by the *parent's* flex row. Measured proof: the parent
row reports `metaChildren: 8` with the meta chips as direct children
(`rounded-full 40, rounded-full 31, rounded-full 40 …`). The component cannot be styled, positioned,
sized, or given attributes independently — its geometry is the parent's. Extraction moved text, not a
responsibility. It also *created* D-1: the `shrink-0` decision that starves the title now lives in a
file that cannot see the title.

**The parent kept everything that matters**: 11 props (including two mode switches, `layout` and
`swatchClass`), 17 emits, a 19-entry string-keyed action dispatch table (`:293–313`), four
composables, and two pieces of UI state. The comments record the history — `T.W5 PP-8 cap cure`,
`the H.W3 sub-component precedent` — a line cap met by relocation. `§5` names the result: a
**"seven-mode omnibus."** The prop list is literally seven modes: `expanded`, `isOwned`,
`editableName`, `isAdmin`, `showSlug`, `draggable`, `layout`.

**Cure — subtraction, not re-cutting.** The canon anatomy is
`Card(frozen tuple) > button[aria-pressed] spanning specimen+identity` + an optional named reorder
handle, with expand, rename, menu, transient result and swatch actions moving to the selected
inspector. That **deletes** `PaletteCardSwatches`, `PaletteRenameInput`, `ActionFeedback` and most of
`PaletteCardMenu` from the card rather than redistributing them, and dissolves D-1, D-7, D-9 and D-17
as a side effect. Per `feedback_kiss_no_contrivance` the fix is not a seventh file or a `shared/` dir.

---

### D-11 — MINOR — Seven hand-rolled copies of the icon-button recipe survive inside the folder

```
$ grep -c "rounded-sm hover:bg-accent" demo/palettes/browser/card/PaletteCard/*.vue
PaletteCardSwatches.vue:4   PaletteRenameInput.vue:2   PaletteCardMeta.vue:1
PaletteCard.vue:0   PaletteCardMenu.vue:0   ActionFeedback.vue:0
$ grep -c "active:scale-95" …            → identical 4 / 2 / 1
```

The recipe is verbatim seven times:
`p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`.

Meanwhile `PaletteCard.vue:96–104` uses the glass-ui atom — `<Button icon-only variant="ghost"
size="sm">` — under a comment claiming *"3rd copy of the hand-rolled icon-trigger recipe dies onto
the glass-ui atom."* One died; seven live on in the siblings. Owner edict 4/5, and `§5.12` (glyph
size, target size and reservation are separate quantities — the hand-rolled `p-1.5` conflates them).
Measured menu button 36 × 36 against hand-rolled swatch actions at ~28 — a visible inconsistency
inside one card.

---

### D-12 — MINOR — Per-instance override of a glass-ui Badge, plus a forked gold token

`PaletteCard.vue:64` renders `<Badge variant="outline" class="featured-badge gold-shimmer … border-gold">`
and `:343–354` reaches back in from the consumer:

```css
.featured-badge { border-color: var(--color-gold); }
.featured-badge__icon svg { stroke: var(--color-gold); filter: drop-shadow(…); }
```

`border-gold` and `.featured-badge { border-color: var(--color-gold) }` are the same declaration
written twice. Edict 5 says style at the root component level — a "featured" tone belongs on `Badge`
as a producer tone/variant, not as a consumer class reaching into a producer component.

Compounding: `demo/styles/foundation.css:104` declares `--color-gold: #D4AF37`, forking glass-ui's own
bridge `--color-gold: var(--gold)` (`dist/styles/theme/bridges.css`, `--gold: oklch(0.784 0.143 86.0)`
in the dark arm). A producer design token is overridden at the demo root and then consumed by a
per-instance rule.

---

### D-13 — MINOR — The folder is split-brain on the Vue 3.5 props idiom

`PaletteCardMenu.vue:206`, `PaletteCardMeta.vue:61`, `PaletteRenameInput.vue:39` use reactive props
destructure. `PaletteCard.vue:182` and `ActionFeedback.vue:23` use `withDefaults(defineProps<…>(), …)`
+ `props.x`. Edict 7 asks for one idiom; three files each way inside one folder is not a considered
exception.

(`verbatimModuleSyntax`, edict 8, **passes**: every type-only import in all six files is
`import type` / inline `type`.)

---

### D-14 — MINOR — `swatchClass` is a raw Tailwind class string passed as a prop

`PaletteCard.vue:194–197` — `swatchClass?: string`, default `"w-9 h-9 sm:w-10 sm:h-10"`, forwarded to
`SwatchHoverMenu`'s `size-class`. `ExtractWorkbench.vue:150` passes
`swatch-class="w-12 h-12 sm:w-14 sm:h-14"`.

A string-typed styling API is a per-instance override channel with a public name: it cannot be
type-checked, cannot be enumerated, and lets any consumer put any geometry on the specimen. The
correct shape is a closed `size` token (`"sm" | "md"`), resolved inside the component — matching how
the producer's own `Card`/`Button` take `size`.

---

### D-15 — MINOR — Dead `group` utility on the root

Measured `groupHoverDescendants: []` — no descendant of the card carries any `group-hover:` or
`group-focus:` class. The `group` in `PaletteCard.vue:19` has zero consumers: a leftover of the hover
choreography D-4 shows no longer exists.

---

### D-16 — MINOR — The "designed empty-state swatch" never paints

`PaletteCard.vue:220–226` declares:

> a palette with zero colors is a real, reachable state … This neutral mid-gray is the designed
> empty-state swatch
```ts
const EMPTY_PALETTE_SWATCH = "#888";
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
```

`firstColor` is consumed only by `safeFirstColor` (`:230`), passed only to `PaletteCardSwatches`
(`:145`), used only to tint the **slug pill** (`PaletteCardSwatches.vue:10`) — rendered only when the
card is *expanded* **and** `showSlug` is set.

Measured, zero-colour palette at 390:

```
{ label: "Palette: Empty", cardRect: {324, 125}, stripPresent: true,
  stripRect: { x: 35, width: 320, height: 40 }, swatchCount: 0 }
```

A 40 px full-width band of nothing at the top of the card. The empty state was named in a comment and
never designed. `§5.5` / `PR-04` (collapse absent support) applies: either the strip collapses and
the card says what it is, or it carries a real designed empty mark — not a void band.

---

### D-17 — MINOR — The activation region is defined by exclusion

The root is entirely clickable; four descendants cancel it: `PaletteCard.vue:82` (menu wrapper),
`PaletteCard.vue:58` (title, when `editableName`), `PaletteRenameInput.vue:2`,
`PaletteCardSwatches.vue:2`. A user cannot see where the card stops being a button. This is the
structural consequence of D-2: with no named seat, the hit surface is whatever is left over.

---

### D-18 — INFO — The component is completely unwitnessed by the mega-tranche visual matrix

All 60 Safari captures render **zero** PaletteCards. `/#/browse` shows *"The commons is unreachable —
Failed to load palettes"* and `/#/palettes` shows *"No saved palettes yet"*, in all four matrices
(verified by reading `shots/safari-desktop-light/browse.png`, `…-dark/browse.png`, `…/palettes.png`,
`…-dark/palettes.png`). The derived state matrices — `shots/forced-colors-desktop/browse.png`,
`shots/rtl-desktop/`, `shots/rtl-mobile/`, `shots/zoom-200-desktop/`, `shots/keyboard-focus-desktop/`,
`shots/reduced-motion-desktop/` — contain no card either.

So for the component with the largest state surface in the product, **forced-colors, RTL, 200 % zoom,
keyboard-focus and reduced-motion have never been observed.** The owner's `OM-11`/`OM-12` are the only
rendered witnesses in the tranche, and they were produced by hand. Pass 1 recorded this as its
"finding zero"; this pass reproduces it independently and confirms it is unchanged.

Any fixture for this component must seed the local store — including tags, `forkCount` and
`versionCount` — before capture, or the matrix will keep photographing an empty room.

---

### D-19 — MINOR — Breakpoint fork on the identity's line budget

`PaletteCard.vue:55` — `line-clamp-2 sm:line-clamp-1`. `§3.7`: *"Spacing is container-scaled from
glass-ui tokens. No desktop-tight/mobile-airy fork and no breakpoint pile."* The fork also buys
nothing: the mobile arm grants the title two lines exactly where D-1 has starved it to 0 px wide.

---

## State coverage — what was never designed

| state | handled? | evidence |
|---|---|---|
| populated | partially | D-1: identity vanishes below ~430 px card width |
| **empty (0 colours)** | **no** | D-16 — 40 px void band, `swatchCount: 0` |
| loading / skeleton | yes (sibling) | `PaletteCardSkeleton.vue`, used at `BrowsePane.vue:49` |
| error / failed action | **transient only** | D-9 — 2.5 s chip, imperative, unmount-fragile |
| pending | **no** | no pending affordance anywhere in the folder |
| disabled | **no** | only `PaletteCardMenu` items disable (`apiOffline`); the card has no disabled arm |
| **hovered** | **no** | D-4 — zero rules; owner mark MT-F036 |
| **focused** | **no** | D-2 — `tabIndex: -1`, no focus-visible rule on the root |
| **pressed / active** | **no** | D-4 / D-5 — dead `--card-press-t`, no `:active` rule |
| **selected** | **no** | D-2 — no `aria-pressed`, no selected register; canon requires one |
| dragging | **no** | D-8 — `cursor-grab` only; no drag state, no keyboard grab |
| overflowing / truncated | **broken** | D-1 — identity truncated to nothing; chips never truncate |
| RTL | unobserved | D-18; `layout="aside"` uses `flex` + `rounded-l-card` (logical-property risk — hypothesis) |
| reduced-motion | **no (expand)** | D-7 — JS inline transition + smooth `scrollIntoView` bypass the global guard |
| forced-colors | unobserved | D-18; hypothesis: with `box-shadow` dropped, the only boundary is a 12 %-alpha border |
| zoom 200 % | unobserved | D-18 |

Ten states unhandled or broken. Per the seat's own rule — *a state that was never designed is a
design defect* — this table alone carries the verdict.

---

## Canon crosswalk

| canon clause | status |
|---|---|
| `§3.1` frozen Card tuple `{sm, content, quiet, opaque, shadow:false, grain:false, specular:off}` | **violated** — no `<Card>`; `cartoon-surface` + measured 3-layer shadow |
| `§3.1` root is a noninteractive container | **violated** — root owns `@click`, `cursor-pointer`, press handlers |
| `§3.1` / `§5` one native `<button aria-pressed>` seat | **absent** |
| `§5` "no expand, inline rename, action menu, transient result, hover-only swatch path" | **all five present** |
| `§5` "swatch strip is noninteractive data, zero activation/focus/drag" | **violated** — `SwatchHoverMenu` popovers, click, hover |
| `§5` transient never carries the only truth | **violated** — D-9 |
| `§5.12` reorder handle is a *separate named control* | **violated** — D-8 |
| `§7` "matte specimen slips … not cartoon casters" | **violated** — D-3 |
| `§6` one producer spring register; PRM resolves to final geometry | **violated** — D-7 |
| `§5.13` palette identity = `--type-subheading`, Fraunces | met in classes (`font-display text-subheading`) — but rendered at 0 px (D-1) |
| `PR-05` dividers / caster shadows repeat a boundary → REMOVE | **violated** — D-3 |
| `PR-07` unlabeled controls / invisible drag state | **violated** — D-8 |
| `PR-08` operation truth only transient | **violated** — D-9 |
| `PR-12` glyph size ≠ target size ≠ reservation | **violated** — D-8 (16 px), D-11 |
| edict 1 no god modules | **violated** — D-10 |
| edict 2 no legacy | **violated** — D-5 (dead span, dead press var) |
| edict 3 KISS | **violated** — D-14, D-10 |
| edict 4 glass-ui is the design system | **violated** — D-2, D-11 |
| edict 5 root-level styling | **violated** — D-12 |
| edict 6 animations tokenized | **violated** — D-7 |
| edict 7 idiomatic Vue 3.5 | **violated** — D-13 |
| edict 8 `verbatimModuleSyntax` | **met** |

---

## The BJ ask (glass-ui), stated once

Two producer gaps are load-bearing and must go to glass-ui rather than be patched locally:

1. **An interactive register for the palette entity slip.** Glass 7.0.0's `cartoon-surface` is
   `position` / `border-width` / `box-shadow` and nothing else; the hover/press choreography this
   consumer was written against no longer exists (D-4, D-5). The canon shape needs a producer-owned
   resting → hover → pressed → focus-visible register on the named seat (or on `Card` when it hosts
   one), in the glass motion vocabulary, PRM-gated at the producer. *A missing glass variant is a
   marked BJ ask, never a local `hover:` utility.*
2. **The quiet matte slip.** If `{size:"sm", material:"content", tier:"quiet", surface:"opaque",
   shadow:false, grain:false, specular:"off"}` does not read as a *matte specimen slip* against the
   glass workspace, that is a producer composition question, not a consumer shadow override. The
   consumer's job is to stop drawing its own shadow (D-3), not to draw a quieter one.

Relay per the standing E13 / BH-BI fond.

---

## What is genuinely right

Stated so the indictment is honest.

- `PaletteRenameInput.vue` and `ActionFeedback.vue` are real components: self-contained, one
  responsibility, correct `useTemplateRef` (`:48`), correct focus-on-mount, correct timer cleanup.
- The `vj-morph` / `vj-celebrate` families are the right idea, correctly parameterised by geometry
  custom properties at the consumer (`PaletteCard.vue:358–363`, `ActionFeedback.vue:53–57`), and are
  globally PRM-neutralised (`demo/styles/animations.css:184`). The failure in D-7 is precisely that
  the height transition did *not* join them.
- Retiring the local `golden-text-shimmer` keyframe onto glass-ui's `metal-shimmer-sweep` (`:60–63`)
  is exactly edict 6's "moved, not deleted", done right.
- `PaletteCardMenu`'s K-INV5 pattern — disable the doomed action *and name the degraded state
  in-register* (`:35–39`, `:56–59`) rather than firing a toast — is better than most of the product,
  and is the model the rest of the card's states should follow.
- Accessible names on the icon-only buttons in `PaletteCardSwatches` are present and interpolate the
  colour value; `REPORT.md`'s `namelessButtons: 1` for `/#/palettes` is not this component's.

None of it changes the verdict. The parts that are well made are attached to an object the canon says
should not exist in this shape.

---

## Recommended disposition

One wave, and it is a **subtraction wave**, not a repair wave:

1. Transpose the entity slip onto the canon shape — `<Card>` frozen tuple, noninteractive root, one
   named `<button aria-pressed>` seat over specimen + identity, one named reorder handle. Closes
   D-2, D-3, D-4 (with the BJ register), D-5, D-6, D-8, D-15, D-17.
2. Move expand / rename / menu / export / operation-state to the selected inspector. Closes D-7, D-9,
   D-10, and deletes three of the six files rather than re-cutting them.
3. Re-lay the identity as its own row with a wrapping metadata rail and an overflow budget. Closes
   D-1, D-19.
4. Design the empty and pending arms explicitly (D-16); retire `swatchClass` for a closed `size`
   token (D-14); land the seven icon buttons on the glass-ui atom (D-11); move the featured tone into
   `Badge` (D-12); unify the props idiom (D-13).
5. Give the visual matrix a seeded palette fixture so this component is *observable* (D-18), then
   capture forced-colors / RTL / 200 % / keyboard-focus / reduced-motion for the first time.

**No source edits land from this formation.** Every disposition above is a wave input, not a patch.
