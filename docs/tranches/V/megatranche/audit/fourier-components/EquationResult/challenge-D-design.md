claude-opus-5[1m] (served model id)

# CHALLENGE — `EquationResult` · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationResult.vue` (101 lines).
**Posture.** Assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line`
provenance + its own falsifier. Superlatives are held to the same bar (L-18 runs both ways).
**Method.** Static + source-derived only — no browser tooling. Livable-only claims are tagged
`UNPROVEN-NEEDS-LIVE` for SS-13.

**Read closure** (all read, all read-only): the component whole · `EquationView.vue` (its sole consumer,
`:255`) · `api/models/equations.py` · `web/src/style.css` (the global cascade it collides with) ·
`web/src/router/index.ts` · `web/package.json` · installed `@mkbabb/glass-ui@4.0.0` — `dist/button-BNDWhAZb.js`
(the live `cva`), `dist/components/ui/button/{Button.vue.d.ts,index.d.ts}`, `dist/composables/dom/useClipboard.d.ts`,
`dist/useViewportReady-CvBcCYDf.js` (the live `useClipboard` body), `src/styles/tokens/{offsets-sizing,scheme-motion,color-radius,dark-arm,light-dark,glass,scale-paper}.css`,
`src/styles/utilities/{base,a11y-overrides,btn}.css`, `src/styles/{cards,feedback-tone}.css` · producer
`/Users/mkbabb/Programming/glass-ui` @ **7.0.0** — `src/components/button/{index.ts,Button.vue}`,
`src/composables/dom/useClipboard.ts`, `src/styles/tokens/sizing.css` · `katex@0.17.0`
`dist/katex.min.css` + `@types/katex` · `tailwindcss@4.3.1` `theme.css` · siblings
`AnimationControls.vue`, `UserSlugBar.vue`, `EditorControlsDock.vue`, `ConvergenceTimeline.vue` (convention baselines) ·
e2e `visualization-ux.spec.ts` / `visualization-crud.spec.ts` (the axe seats).

**Corpus folded** (cited, not re-derived): `formation/fourier/lane-frontend.md` §5 + the file table `:135`,
`:261-262`; `formation/fourier/CENSUS-2026-08-03.md:102-104`; `audit/fourier-components/ConvergenceLegend/challenge-C-consumption.md:203`
(the `--z-controls` census); `audit/fourier-components/ConvergenceTimeline/challenge-L-library.md:200`
(the four-file `icon-swap` divergence); `audit/fourier-components/CanvasOverlayButton/challenge-L-library.md:360`
(the nine `variant="glass" size="icon"` sites); `audit/fourier-components/EqCoefficientsPanel/challenge-C-consumption.md:72`
(the barrel-edge cohort, `EquationResult.vue:4` named); `audit/fourier-components/EquationView/challenge-C-consumption.md:102-110`
(the `trust: true` leg, adjudicated non-blocking **for this file** — I do not re-litigate it).
The adjudicated intake lane `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` was read; **it carries no row
touching this component** (its 52 claims are archaeology + `PaperSidebar` loop derivation). No overlap to cite,
no contradiction to record. Stated so the absence is on the record rather than implied.

**Tally.** 22 defects — **3 BLOCKER**, 7 MAJOR, 8 MINOR, 4 INFO. **4 superlatives.**

---

## §0 · The one-paragraph verdict

This is a 101-line component that gets its *tokens* right and its *geometry* wrong. It reaches for
`--z-controls`, it retires a hand-rolled `setTimeout` for the library composable, it names its transition
properties instead of `all`, and it documents the one global-cascade collision it defeats — four genuine
marks of care. But its layout is authored against a mental model of a fine-pointer desktop at a fixed root
font-size, and the tree supplies neither: the root font is **larger on mobile** than on desktop
(`style.css:41,46`), and the glass-ui coarse-pointer block multiplies every control by 1.5
(`light-dark.css:17-22`). The consequence is not cosmetic. On any touch pointer the copy button **collides
with a sibling control the parent positions** — 16–18 px of overlap, occluded by a higher z-token. And on
every pointer, `text-align: center` (`:63`) on an `overflow-x: auto` box (`:66`) puts the left half of a
wide equation's overhang **outside the scrollable overflow region entirely** — unreachable, not merely
off-screen. Two of the three blockers are content-loss or target-loss, not polish. The third is that this
file sits on **three** definition-absent 7.0.0 symbols, and the census break table names **none** of them.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The left half of any over-wide equation is unreachable — `text-align: center` on a horizontal scroll container

**Claim.** `.eq-scroll-region` sets `text-align: center` (`EquationResult.vue:63`) and `overflow-x: auto`
(`:66`). KaTeX's own sheet sets `.katex-display > .katex { display: block; text-align: center; white-space: nowrap }`
(`node_modules/katex/dist/katex.min.css`, verbatim). A `display: block` box with `white-space: nowrap`
takes its containing block's width and lets its **inline content** overflow. Centered, that content
overflows *equally on both sides*. Per CSS Overflow §3, the scrollable overflow region of an LTR box
extends only in the block-end and **inline-end** directions — the inline-**start** overhang is not
scrollable. `scrollLeft` floors at 0.

**Consequence.** For an equation wider than the card, the user can scroll to the right end and never to
the left. The leading `f(x) = \sum_{n=…}` is gone — no clip indicator, no scrollbar travel, no cue that
anything is missing. This is the exact failure the `overflow-x: auto` was added to prevent, defeated by
the declaration three lines above it.

**Provenance.** `EquationResult.vue:63` (`text-align: center`) · `:66` (`overflow-x: auto`) ·
`katex.min.css` `.katex-display{display:block;margin:1em 0;text-align:center}` and
`.katex-display>.katex{display:block;text-align:center;white-space:nowrap}`. The component's own
`:deep(.katex-display)` override (`:71-75`) resets `margin`/`padding`/`overflow` but **not** `text-align`,
so KaTeX's centering survives untouched.

**Falsifier.** Show that (a) the equation never exceeds the region's inline size — refuted structurally:
the region *is* a horizontal scroller, an affordance that is dead code if overflow never happens; or
(b) the component sets `justify-content: safe center` / `text-align: start` on the overflow path — grep
the file: neither string occurs; or (c) a UA extends scrollable overflow to the inline-start edge — no
engine does, this is the canonical centered-overflow bug.

**Remediation (KISS, one declaration).** Drop `text-align: center` at `:63` and center via a *safe* box:
`.eq-scroll-region { display: flex; justify-content: safe center; }`. `safe` is the keyword minted for
precisely this — it degrades to start-alignment the moment content overflows, preserving reachability.
`text-align: center` at `:63` is in any case redundant with KaTeX's own `.katex-display` centering.

---

### D-2 · BLOCKER · On any coarse pointer the copy button collides with the parent's info button — 16–18 px stolen, occluded by a higher z-token

**Claim.** The copy button (`EquationResult.vue:38-49`, positioned by `.copy-pos` `:88-93`) and the info
button the *parent* renders (`EquationView.vue:276`, positioned by `.info-anchor` `EquationView.vue:430-434`)
share a containing-block edge and are hand-tuned to interlock at a fine pointer. Under the glass-ui
coarse-pointer block they overlap.

**The arithmetic, entirely from tokens.**

`glass-ui/src/styles/tokens/offsets-sizing.css:151` — `--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))`.
`glass-ui/src/styles/tokens/light-dark.css:17-22` —
```css
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }
```
Both buttons are `size="icon"` → `h-(--control-h-md) w-(--control-h-md)` (`dist/button-BNDWhAZb.js`, the
`size.icon` arm). `.copy-pos` is `right: 0.5rem` (`:92`); `.info-anchor` is `right: 3.25rem`
(`EquationView.vue:432`). `.eq-card` carries no padding — `cartoon-surface` (`glass-ui/src/styles/cards.css:33`)
contributes `border-width`, `box-shadow`, `translate`, `transition` only, and fourier's `@utility cartoon-card`
shim (`style.css:107-111`) adds only `border-color` + `background` — so both offsets measure from the same
right edge.

| pointer | root font | `--control-h-md` | copy spans (from right) | info spans (from right) | result |
|---|---|---|---|---|---|
| fine, ≥768 px | 16 px (`style.css:46`) | `max(40, 0)` = **40 px** | 8 → 48 | 52 → 92 | **4 px gap** (D-7a) |
| coarse, ≥768 px | 16 px | `max(60, 44)` = **60 px** | 8 → 68 | 52 → 112 | **16 px OVERLAP** |
| coarse, <768 px | 18 px (`style.css:41`) | `max(67.5, 49.5)` = **67.5 px** | 9 → 76.5 | 58.5 → 126 | **18 px OVERLAP** |

**Consequence.** `.info-anchor` carries `z-index: var(--z-bar)` = **30** (`glass-ui/src/styles/tokens/scheme-motion.css:337`);
`.copy-pos` carries `var(--z-controls)` = **20** (`:336`, and `EquationResult.vue:90`). The info button
therefore paints **over** the copy button and, being a real `<button>`, takes the pointer events in the
overlap. On a phone that is 18 px of a 67.5 px target — **27 % of the copy affordance is dead**, and the
dead strip is the button's right edge, i.e. the thumb-natural approach from screen-edge. WCAG 2.5.8
(Target Size, Minimum) is about the *undisturbed* target; an occluded 49.5 px-wide remainder still clears
24 px, so this is not a bare-numeric SC failure — it is a design failure that the library's own coarse
block *caused* and that neither file accounts for.

**Falsifier.** (a) Show `--ui-scale` is pinned to 1 by fourier under coarse — `grep -rn "ui-scale" web/src/` returns
**nothing**; the app never overrides it, so glass-ui's 1.5 stands. (b) Show `.info-anchor`'s containing block
differs from `.copy-pos`'s by ≥18 px — both resolve to `.eq-card`'s padding box (`.eq-result-root` is a
static, unpadded, full-width block child; `.eq-card` has no padding). (c) Show `.info-anchor` is not rendered —
it is gated `v-if="tierInfo"` (`EquationView.vue:274`), and `tierInfo` is non-null whenever `result` is
(`EquationView.vue:68`: `result.value ? (TIER_INFO[...] ?? TIER_INFO.spline) : null`), which is the same
condition that renders this component (`:236` `v-else-if="result"`). The two are **co-present by construction**.
(d) Visual confirmation of the paint order is `UNPROVEN-NEEDS-LIVE`; the *geometric* overlap and the
z-token ordering are proven above.

**Note on ownership.** The `right: 3.25rem` at `EquationView.vue:432` is obviously chosen to clear
`0.5rem + 2.5rem = 3rem` — i.e. **this component's private geometry is a cross-file contract** the parent
hand-satisfies with a 4 px slack that the coarse scale consumes. Filed separately as D-17.

---

### D-3 · BLOCKER · Three definition-absent 7.0.0 symbols — and the census break table names none of them

**Claim.** `CENSUS-2026-08-03.md:102-104` and `lane-frontend.md` §5 enumerate the 4.0.0 → 7.0.0 break
surface as: `./metric-badge` ×7 files, `./hover-card` ×2, `./hover-popover` ×2, `DockIconButton` ×2,
`DockDropdownTrigger` ×1, `ToastVariant`, `lucide-vue-next` → `@lucide/vue` ×35, plus the three peer
floors. **`EquationResult` touches none of those.** By the census it is an uplift-clean file. It is not.
Three of its four load-bearing library surfaces are definition-absent at 7.0.0:

**(i) `variant="glass"` — the prop does not exist.** Producer `glass-ui/src/components/button/Button.vue:15-31`:
```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  …
}
```
`variant` is gone; `buttonVariants`/`ButtonVariants` are no longer exported
(`glass-ui/src/components/button/index.ts` exports `Button`, `ButtonProps`, `ButtonEmphasis`, `ButtonSize`
— that is the whole file). `variant="glass"` at `EquationResult.vue:39` is not a valid `ButtonProps` key
and not a valid `HTMLAttributes` key. Glass material at 7.0.0 is *derived*, not declared
(`Button.vue:47-52`: `glassMaterial = tone === "neutral" && (emphasis === "primary" || emphasis === "secondary")`).

**(ii) `size="icon"` — the value does not exist.** `ButtonSize` is `xs | sm | md | lg`. Icon geometry moved
to the boolean `iconOnly` (`Button.vue:25`, documented "Square geometry for an accessibly named icon command").

**(iii) `useClipboard().copied` — the field does not exist.** Installed 4.0.0
(`dist/composables/dom/useClipboard.d.ts:28-38`) returns `{ copied: Ref<boolean>; copy }`. Producer 7.0.0
(`src/composables/dom/useClipboard.ts:24-31`) returns `{ status: ComputedRef<ClipboardStatus>; copy; invalidate }`
where `ClipboardStatus = "idle" | "pending" | "success" | "failure"`. `const { copied, copy } = …`
(`EquationResult.vue:15`) destructures a field that is gone; `v-if="copied"` (`:46`) becomes permanently
false and **the confirmation state silently disappears**.

**Blast radius beyond this file** (measured, live tree, `web/src/`):
`grep -rn 'variant="' web/src/ | wc -l` → **124** · `grep -rn 'size="icon"' web/src/ | wc -l` → **38**
across **21 files** · `grep -rn "useClipboard" web/src/` → **3** consumers, all destructuring `copied`
(`EquationResult.vue:15`, `UserSlugBar.vue:23`, `useMorphConfig.ts:58`). Against `lane-frontend.md:508`'s
budget ("3 removed subpaths, 3 removed dock members, a removed type, a peer rename (35 sites)"), the Button
prop-API rewrite alone is **≥124 attribute sites** — larger than every census row combined, and larger
than the 46-line 3.1→4.0 prior-art by roughly two orders.

**Falsifier.** Produce a `variant`, a `size="icon"`, or a `copied` in producer 7.0.0.
`grep -rn "buttonVariants\|variant?" /Users/mkbabb/Programming/glass-ui/src/components/button/` → empty;
`grep -rn "copied" /Users/mkbabb/Programming/glass-ui/src/composables/dom/useClipboard.ts` → empty. Or show
Vue attribute-fallthrough absorbs them silently — it absorbs them at *runtime* (rendering a literal
`variant="glass"` DOM attribute and a default-`secondary` button), but the repo's build gate is
`vue-tsc -b && vite build` (`web/package.json` `"build"`), which type-checks component props. The exact
`vue-tsc` diagnostic text is `UNPROVEN-NEEDS-BUILD`; the **definition-absence is proven from producer source**.

**Recorded as a contradiction of the corpus, not a supplement.** `CENSUS-2026-08-03.md:186` scopes F.W1's
cure to "(metric-badge ×7 files, hover-card/-popover ×4, dock members ×3, `ToastVariant`)". That list is
**incomplete**; F.W1 cannot land on it.

**Improvement the uplift *does* bring** (cited under the "or improve" mandate): 7.0.0's `loading` prop +
`aria-busy` (`Button.vue:26,92`) is the exact missing affordance of D-10, and `iconOnly`'s docstring
("an accessibly named icon command") is the exact discipline missing in D-6. The 7.0.0 `useClipboard`
`status` four-state machine subsumes D-6's failure leg for free. The uplift is expensive here **and**
curative here.

---

## §2 · MAJOR

### D-4 · MAJOR · "no vertical clip" is false — the clip is real, it just lives in the parent

**Claim.** The comment at `EquationResult.vue:60` reads *"Scrollable equation region — horizontal scroll,
no vertical clip"*. Both halves of the second clause fail.

1. **The region is a vertical scroll container too.** Per CSS Overflow §3.4, when one axis is `visible`
   and the other is not `visible`/`clip`, the `visible` one **computes to `auto`**. `.eq-scroll-region`
   declares only `overflow-x: auto` (`:66`), so its computed `overflow-y` is `auto`, not `visible`. The
   `overflow: visible !important` at `:74` and `overflow: visible` at `:79` are applied to *descendants*
   (`.katex-display`, `.katex`) and cannot undo the ancestor's scrollport.
2. **The actual clip is one level up and is hard.** `EquationView.vue:386-390` —
   `.eq-card { height: 10rem; flex-shrink: 0; overflow: hidden; }`. Fixed height (160 px desktop /
   180 px mobile), `overflow: hidden` — no scrollbar, no keyboard travel, no recovery. `.eq-scroll-region`
   is not height-constrained, so its own computed `overflow-y: auto` never engages; everything taller than
   the card is silently amputated by the card.

**Vertical budget (desktop, root 16 px).** 160 (card) − 32 (`padding-top: 2rem`, `:64`) − 16
(`.katex-display` `padding: 0.5rem 0`, `:73`) − 16 (`padding-bottom: 1rem`) = **96 px** for display math
rendered at 28.8 px base (see D-11). A single-line `\sum` with limits runs ≈2.2 em ≈ 63 px and fits; add a
nested fraction or a two-line aligned form and it does not. Exact overflow onset is
`UNPROVEN-NEEDS-LIVE`; the **clip mechanism and the 96 px budget are proven**.

**Falsifier.** Show `.eq-card` is not `overflow: hidden` (it is, `EquationView.vue:389`) or not fixed-height
(it is, `:387`); or show the CSS Overflow fixup does not apply — it is normative and universally implemented.

**Prose severity.** A comment asserting a property the code lacks is worse than no comment: it is what a
future reader will trust instead of measuring. Paired with D-20.

---

### D-5 · MAJOR · The scroll region is keyboard-unreachable and unnamed — and the route it lives on has zero a11y coverage

**Claim.** `.eq-scroll-region` (`EquationResult.vue:37`) is a scrollable container (`overflow-x: auto`,
`:66`) with **no `tabindex`, no `role`, and no accessible name**. `grep -n "tabindex\|role=\|aria-" web/src/components/equation/EquationResult.vue`
→ empty. A keyboard-only user cannot scroll it: the only focusable descendant is the copy button, and
`v-html` content is inert markup (KaTeX emits no focusables). This is axe-core's `scrollable-region-focusable`
(WCAG 2.1.1 Keyboard, **serious**).

**And the test net does not reach it.** `@axe-core/playwright` is installed (`web/package.json` devDeps) and
wired in `e2e/visualization-ux.spec.ts:2,26-38` (`checkA11y` asserting zero serious/critical). Its only
navigation is `page.goto("/visualize")` (`:47`). This component mounts on **`/equation`**
(`web/src/router/index.ts:92-94`, `component: () => import("@/components/equation/EquationView.vue")`).
`grep -rn '"/equation"' web/e2e/` → empty. **The route carrying this component is never audited.**

**Falsifier.** Point to an axe run covering `/equation` (none), or show the region can never overflow
(refuted by D-1 — the horizontal scroller is not decorative), or show a focusable descendant inside the
`v-html` output (KaTeX emits `<span>` trees only; `katex.min.css` shows no interactive selectors).

**Remediation.** `tabindex="0"` + `role="region"` + `aria-label="Rendered equation"` on `:37` — three
attributes, no layout change. Note the app-wide focus-ring convention already exists
(`style.css:136-143`) and this element would need to join it.

---

### D-6 · MAJOR · The copy outcome is announced by colour + glyph only; failure is announced not at all

**Claim.** Three separate gaps in the one state this component actually owns.

1. **No assistive announcement of success.** The only success signal is the `Check` ⇄ `Copy` swap
   (`:45-48`). The button's accessible name is `title="Copy LaTeX"` (`:42`) and **never changes**. There is
   no `aria-live` region, no `aria-label` toggle, no `<span class="sr-only">`. A screen-reader user
   activating the button receives nothing at all — before, during, or after. (`title` *does* supply a name
   per accname §2I, so the control is named; the defect is the **state**, not the name.)
2. **Failure is swallowed.** `copyLatex()` (`:30-32`) calls `copy(props.latex)` and discards the returned
   promise. The installed 4.0.0 composable resolves `{ ok: false, reason }` and offers `onCopyError`
   explicitly to prevent this — its own docstring
   (`dist/composables/dom/useClipboard.d.ts:12-17`) reads *"Surfaces the failure instead of swallowing it."*
   The option is not passed. On an insecure context, a denied permission, or a Safari non-gesture write,
   the runtime path is (`dist/useViewportReady-CvBcCYDf.js`, `useClipboard` body) `i.ok` false → `copied`
   never flips → **the button does nothing and says nothing**. Indistinguishable from a missed tap.
3. **Colour is the sole differentiator.** `Check` is `text-green-500`, `Copy` is unstyled (`:46-47`). The
   two lucide glyphs also differ in *shape*, so this is not a bare WCAG 1.4.1 (Use of Colour) failure —
   but see D-9 for the contrast arithmetic on the green.

**Falsifier.** Produce an `aria-live`, an `sr-only`, an `onCopyError`, or an awaited result — `grep -n "aria\|sr-only\|onCopyError\|await" web/src/components/equation/EquationResult.vue`
→ empty. Or show `copy()` cannot fail: its 4.0.0 body has three named failure channels
(`"clipboard-api" | "exec-command" | "no-api"`, `useClipboard.d.ts:8`).

---

### D-7 · MAJOR · The control's footprint is not reserved in the padding box — the button sits on the equation

**Claim.** `.eq-scroll-region { padding: 2rem 1rem 1rem }` (`:64`) reserves **2rem** at the top and **1rem**
at the right. `.copy-pos` needs `0.5rem + --control-h-md` on both axes (`:88-93`). At no supported pointer
does the padding cover it.

| pointer / root | needed (top & right) | reserved top | reserved right | vertical intrusion | horizontal intrusion |
|---|---|---|---|---|---|
| fine, 16 px | 8 + 40 = 48 px | 32 px | 16 px | **16 px** | **32 px** |
| coarse, 18 px | 9 + 67.5 = 76.5 px | 36 px | 18 px | **40.5 px** | **58.5 px** |

Because `.copy-pos` is `position: absolute` against `.eq-result-root` while the equation lives in the
scrolling flow, the button **does not scroll with the content** — a wide equation slides underneath it.
The button is `variant="glass"` → `glass-wash btn-glass` (`dist/button-BNDWhAZb.js`, the `glass` arm), a
translucent, backdrop-blurred plate, so the collision reads as a blurred smear over the glyphs rather than
a clean occlusion. Legibility through the plate is `UNPROVEN-NEEDS-LIVE`; the **geometry is proven**.

**D-7a (companion, MINOR).** At the fine pointer the copy/info pair sits **4 px apart** (D-2 table row 1).
Four pixels between two 40 px glass capsules is below every gap token in the library
(`--dock-margin: 0.5rem` = 8 px is the smallest chrome gutter, `offsets-sizing.css:240`) and reads as a
mis-set pair rather than a deliberate cluster.

**Falsifier.** Show the equation is always narrower than `region_width − 6rem` and shorter than the
intrusion band — refuted structurally by the presence of the scroller (D-1) and by the card's 96 px
budget (D-4). Or show `.copy-pos` participates in flow — it is `position: absolute` (`:89`).

**Remediation.** Reserve the control: `padding-top: calc(0.5rem + var(--control-h-md) + 0.5rem)` and
`padding-right: calc(0.5rem + var(--control-h-md) + 0.5rem)`. Both scale with `--ui-scale` automatically,
which is the point — the current literals cannot.

---

### D-8 · MAJOR · `h-4.5 w-4.5` is inert — the producer documents the escape hatch and this is not it

**Claim.** Both icons carry `class="h-4.5 w-4.5"` (`:46-47`). The glass-ui Button `cva` base
(`dist/button-BNDWhAZb.js`, the shared string) includes:
```
[&_svg:not([class*=size-])]:size-(--ui-glyph)
```
The class attribute on the `Check` is `"h-4.5 w-4.5 text-green-500"` and on the `Copy` is `"h-4.5 w-4.5"` —
**neither contains the substring `size-`**, so `:not([class*=size-])` matches and the rule fires. Compiled
specificity: parent class + `svg` element + `:not([attr])` = **(0,2,1)**, against `.h-4\.5` at **(0,1,0)**.
Same Tailwind `utilities` layer, so specificity decides. **glass-ui wins; the authored 18 px is discarded**
and the glyph renders at `--ui-glyph` = `calc(1rem * var(--ui-scale))` (`offsets-sizing.css:177`) = 16 px
fine / 27 px coarse.

**The producer states the contract explicitly.** `glass-ui@7.0.0 src/styles/tokens/sizing.css:106-109`:
> *"the un-sized-`<svg>` CVA rule reads these via `size-[var(--ui-glyph)]`, KEEPING the `:not([class*=size-])`
> host-sized-icon escape intact (**an explicit `size-9` still wins**)."*

The escape requires a `size-*` utility. `h-*`/`w-*` is not it. This is producer-documented, not inferred.
The same rule survives at 7.0.0, so the uplift does not cure it.

**Falsifier.** Show `h-4.5` compiles to a selector of specificity ≥ (0,2,1) (it does not — it is a single
class), or show Tailwind emits the arbitrary-variant selector inside `:where()` (it does not; `:where()`
wrapping is reserved for base/preflight, not utility variants), or show the class string contains `size-`
(read it: it does not).

**Remediation — delete, do not rename.** The tempting fix (`size-4.5`) is *worse*: it would pin the glyph
at a root-relative 18 px that ignores `--ui-scale`, producing a 20.25 px glyph inside a 67.5 px coarse
button (ratio 0.30) where the token gives 27 px (ratio 0.40, identical to the desktop ratio). The correct
remediation is to **remove `h-4.5 w-4.5` entirely** and let the token govern. Non-obvious, and the reason
this defect must not be "fixed" mechanically.

---

### D-9 · MAJOR · The success glyph fails WCAG 1.4.11 in light mode, and is off-token in both

**Claim (two separable legs).**

**Leg A — contrast.** `text-green-500` (`:46`) = `oklch(72.3% 0.219 149.579)`
(`node_modules/tailwindcss/theme.css:75`). The Check is the *sole* graphical indicator of copy success →
WCAG 1.4.11 Non-text Contrast (AA, 3:1) applies. Computed against the surface it sits on (`--card`, since
`glass-wash` = `color-mix(… var(--card) … , transparent)`, `glass.css:137`):

| mode | surface | `text-green-500` | glass-ui `--success` |
|---|---|---|---|
| light | `--card` = `hsl(36 48% 97%)` (`color-radius.css:72`) | **2.10 : 1 — FAILS 3:1** | 2.17 : 1 — also fails |
| dark | `--card` = `hsl(24 8% 16%)` (`dark-arm.css:64`) | 6.56 : 1 — passes | 8.51 : 1 |

(Computed by exact OKLCH→sRGB→WCAG-relative-luminance conversion; the script is reproducible from the
token values cited.) The honest finding is sharper than "wrong token": **swapping to `--success` does not
cure light mode** (2.17:1). The design system's own success hue is not AA-safe as a lone glyph on the
cream card. The cure must be a darker success rung *or* a non-colour-only confirmation (which D-6 already
demands).

**Leg B — token conformance.** `text-green-500` is a raw Tailwind palette literal where the library ships
`--success` (`color-radius.css:273`, `light-dark.css:159`, `dark-arm.css:144`) and a whole feedback-tone
register (`feedback-tone.css`, "The four tone hues map to the HOUSE tokens `--success` / … — presets-in-
consumers, NO new colors"). The repo itself already does it correctly at `EditorControlsDock.vue:211`
(`color: var(--success)`). The measurable cost of the literal: in **dark** mode it pins the *light-arm*
lightness (L 0.723) where the system lifts to L 0.805, delivering 6.56:1 against a calibrated 8.51:1 —
a **23 % contrast deficit** against the system's own target, invisible to any test.

**Falsifier.** Show the Check is not the sole state indicator (it is — D-6), or that the button renders on
a darker plate than `--card` (`glass-wash` mixes `--card` *toward transparent*, i.e. toward the card
behind it; it never darkens), or produce a different `--color-green-500` in the installed Tailwind (cited
line above is verbatim).

---

### D-10 · MAJOR · No loading or staleness treatment — the copy button stays live over a stale equation

**Claim.** `EquationView.vue:238-241` renders a `"Recomputing…"` banner while `computing` is true, **and
keeps the equation card mounted below it** (`:249-255`) showing the *previous* result. `EquationResult`
receives no loading signal (`defineProps<{ latex: string }>()`, `:8-10`), applies no dimming or
`aria-busy`, and leaves the copy button fully enabled. A user who taps copy mid-recompute silently
receives the **stale** LaTeX with a full-confidence green Check.

**Falsifier.** Show the card unmounts during recompute — it does not; the recompute banner is a *sibling*
inside the same `v-else-if="result"` block (`EquationView.vue:236-255`), which is exactly the design
choice that keeps the stale value on screen. Or show a `disabled`/`aria-busy` binding — grep the file: none.

**Cure exists upstream.** 7.0.0's `Button` `loading` prop sets `aria-busy` and suppresses activation
(`glass-ui/src/components/button/Button.vue:26,41-43,92`). Under the old pin the available primitive is
`disabled` (`Button.vue.d.ts` `disabled?: ButtonHTMLAttributes['disabled']`), reached by a one-prop
addition to `defineProps`. Cross-referenced to D-3's "improve" column.

---

## §3 · MINOR

### D-11 · MINOR · The responsive type ramp delivers half of what it declares

`:77-86` steps `.katex` from `1.4em` to `1.8em` at `min-width: 768px` — an authored **+28.6 %**. But
`style.css:40-50` drops the **root** font-size from `1.125rem` (18 px) to `1rem` (16 px) at the *identical*
`min-width: 768px`. `em` resolves against the inherited computed size, which is the root's:

- mobile: 18 px × 1.4 = **25.2 px**
- desktop: 16 px × 1.8 = **28.8 px** → delivered step **+14.3 %**

Half the ramp is eaten by a global rule the component does not reference. Not a no-op — but the authored
intent and the shipped result differ by a factor of two, and nothing in the file records the coupling.
**Falsifier.** Show the root font-size does not change at 768 px — `style.css:41,46-49` is verbatim; or show
`.eq-scroll-region` re-establishes a font-size (it does not, `:61-68`).

### D-12 · MINOR · Chrome-to-ink proportion inverts across the breakpoint (Aristotelian)

Every spacing literal in the file is `rem`, i.e. root-relative, and the root is **larger on mobile**.
`padding: 2rem 1rem 1rem` (`:64`) = 36/18/18 px mobile vs 32/16/16 px desktop; `min-height: 4.5rem` (`:65`)
= 81 px vs 72 px; `.copy-pos` offsets (`:91-92`) = 9 px vs 8 px. Against the type sizes from D-11 the
whitespace-to-ink ratio is **36/25.2 = 1.43 mobile** vs **32/28.8 = 1.11 desktop** — a **29 % swing** in
the single proportion that governs how the card reads. The narrower viewport receives the *heavier* gutter
and the *smaller* type, which is the inverse of the usual mobile discipline.

Compounding: `min-height: 4.5rem` = 72 px desktop, of which 32 (top pad) + 16 (display pad) + 16 (bottom
pad) = 64 px is chrome, leaving **8 px** — less than a third of one 28.8 px line. The floor does not
guarantee one line of display math, which is presumably what a 4.5rem floor was for.
**Falsifier.** Re-derive with `rem` resolving against something other than the root — it does not.

### D-13 · MINOR · `.icon-swap-*` has no `prefers-reduced-motion` guard

`:95-100` transitions `opacity` + `transform: scale(0.8)` unconditionally. The repo carries **15**
reduced-motion references (`grep -rn "prefers-reduced-motion" web/src/ | wc -l` → 15) including in this
component's immediate cohort (`ConvergencePlot.vue:405`, `DarkModeToggle.vue:104`, `CollapsibleSection.vue:66`,
`ContourSettings.vue:370`) and even a global kill-switch for the tab animation (`style.css:92-96`) — so the
convention is established and this file is outside it. glass-ui's own `.tap-squish` is guarded
(`utilities/base.css:274`), which means the *button* respects the preference while the *icon inside it*
does not.
**Falsifier.** Show a global `@media (prefers-reduced-motion: reduce) { *, *::before … { transition: none } }`
reset — `style.css:92-96` scopes its reset to `[data-state="active"][role="tabpanel"]` only, and glass-ui's
`utilities/a11y-overrides.css:6` block does not blanket-disable transitions on arbitrary consumer classes.
**Honest scope note:** `AnimationControls.vue:196` carries the same unguarded `.icon-swap-*`, so this is a
cohort defect, not a solo one. Filed here because this file is the subject.

### D-14 · MINOR · The motion vocabulary diverges three ways from the repo's own ratified form

Folding `ConvergenceTimeline/challenge-L-library.md:200` (four files carry `icon-swap` with divergent
durations) and extending it with two axes that challenge did not measure:

| site | duration | easing | exit scale |
|---|---|---|---|
| `EquationResult.vue:97,99-100` | 0.15 s | **`ease`** (raw keyword) | 0.8 |
| `AnimationControls.vue:196-197` | 0.15 s | **`var(--ease-standard)`** | 0.7 |
| `ConvergenceTimeline.vue:142` | **0.1 s** | — | — |

`AnimationControls.vue:195` carries the ratifying comment: *"A.W3.d — named properties + canonical token,
no `transition: all`."* This file honours the first half (named properties — a superlative, S-3) and misses
the second: `--ease-standard` exists and resolves (`glass-ui/src/styles/tokens/scheme-motion.css:216`).
One transition name, three behaviours.
**Falsifier.** Show `--ease-standard` is undefined in the consumed build — it is defined at both
`scheme-motion.css:216` and `theme/bridges.css:325`.

### D-15 · MINOR · An unearned `!important` — no competing declaration reaches it

`:74` `overflow: visible !important`. The competitors are `style.css:64-69` `.katex-display { overflow-x: auto; overflow-y: visible }`
at specificity **(0,1,0)** and `katex.min.css` `.katex-display{display:block;margin:1em 0;text-align:center}`
which sets **no overflow at all**. The scoped `:deep()` selector compiles to
`.eq-scroll-region[data-v-hash] .katex-display` = **(0,3,0)** and already wins outright. The `!important`
defeats nothing and permanently forecloses any future ancestor override — the precise mechanism by which
cascades ossify. (Contrast `:71-75`'s *comment*, which is a superlative — S-4. The comment is right; the
`!important` is surplus.)
**Falsifier.** Name a declaration of specificity ≥ (0,3,0) or an `!important` on `.katex-display` in the
consumed cascade — `grep -o "\.katex-display{[^}]*}" node_modules/katex/dist/katex.min.css` and
`style.css:64-69` are the only two, both lower.

**Companion (same line-range).** `:79` `overflow: visible` on `.katex` is inert: `katex.min.css` sets
`.katex-display>.katex{display:block;text-align:center;white-space:nowrap}` and no `overflow`, so the
property is already at its initial value.

### D-16 · MINOR · A hand-rolled scrollbar where the design system ships a scroll affordance — and no overflow cue at all

`:67` `scrollbar-width: thin` is the file's entire scroll affordance. glass-ui 4.0.0 already ships
`FadingScroll` (`dist/fading-scroll.d.ts`, `dist/FadingScroll-DwNnvKMs.js`) and a documented
"scroll-fade masks, fading-scroll (scroll-state-driven edge fade)" recipe (`utilities/base.css:2`) —
i.e. the edge-gradient cue that tells a reader content continues past the boundary. Combined with D-1
(centred content, so *both* edges overhang) and `scrollbar-width: thin` on a platform that hides overlay
scrollbars until scroll begins, a wide equation presents **zero** visual signal that it is truncated.
This is available under the old pin; it is not an uplift ask.
**Falsifier.** Show `FadingScroll` is not exported at 4.0.0 — `dist/fading-scroll.d.ts` and the chunk exist;
or show the region cannot overflow (refuted by D-1).

### D-17 · MINOR · The component's private geometry is an undeclared cross-file contract

`.copy-pos` `right: 0.5rem` + `--control-h-md` (`:88-93`) consumes 3 rem of the card's right edge at the
fine pointer. `EquationView.vue:432` positions its info button at `right: 3.25rem` — a literal chosen to
clear exactly that, with **0.25 rem** of slack, across a file boundary, with no comment on either side
recording the dependency. Any change to this component's `right` offset, its `size`, or the library's
`--control-h-md` silently breaks the parent's layout. D-2 is that break, already realised by the library's
coarse block. The two files also disagree on z-token for adjacent peers (`--z-controls` here vs `--z-bar`
there) with no stated rationale.
**Falsifier.** Find a comment, a shared token, or a CSS custom property mediating the two offsets —
`grep -rn "3.25rem\|copy-pos" web/src/components/equation/` returns the two isolated literals only.

### D-18 · MINOR · `resetMs: 2000` diverges from the sibling and from the library default

`:15` passes `resetMs: 2000`. `UserSlugBar.vue:23` — the *other* `useClipboard` consumer performing the
identical copy-confirm interaction — passes `1500`, which is also the library default
(`useClipboard.d.ts:22` "default 1500"). The comment at `:12-14` explains the *migration* but not the
*override*. Two dwell times for one gesture vocabulary.
**Falsifier.** Point to a rationale for 2000 — the comment gives none; `git log` was not consulted (out of
scope for a static read), so this is filed at MINOR rather than asserted as arbitrary.

---

## §4 · INFO

### D-19 · INFO · `@reference "tailwindcss"` is dead weight in this block

`:54` imports the Tailwind theme into the scoped block, but the block contains **no** `@apply`, no
`theme()`, and no `--spacing` reference — every declaration is plain CSS. Repo-wide,
**9 of 35** files with `@reference` have no `@apply` (`AdminFlaggedPanel`, `GalleryAdminBanner`,
`GalleryFeaturedCarousel`, `GalleryCardModal`, **`EquationResult`**, `AdminAuditLog`, `AdminUserList`,
`GalleryDraftsSection`, `CoefficientsSpectrum`). A cohort-level cleanup, not a solo defect.
**Falsifier.** Find an `@apply`/`theme(` in `:53-101` — there is none.

### D-20 · INFO · The header comment is migration archaeology that restates the code

`:12-14` spends three lines on what the code *used to be* ("migrated from bare `navigator.clipboard.writeText`
+ manual `copied` ref + setTimeout") and closes by restating the line below it ("the reactive `copied` flag
here drives the Check/Copy icon swap"). The durable fact — *why* 2000 ms, *why* the composable's
`onCopyError` was declined — is absent (D-18, D-6). Changelog belongs in the changelog; the same P.W5
Lane B.2 block is duplicated near-verbatim at `UserSlugBar.vue:19-22`.
**Falsifier.** Show the comment records something not derivable from `:15` and `:45-48` — it does not.

### D-21 · INFO · `lucide-vue-next` is a devDependency but is imported by runtime source

`:5` `import { Check, Copy } from "lucide-vue-next"` — the package is declared under `devDependencies`
(`web/package.json`), as are `class-variance-authority`, `clsx`, `tailwind-merge`, and `reka-ui`, all of
which glass-ui's runtime resolves. It bundles today because Vite does not read the dependency section, but
the manifest does not describe the artifact. Cross-cut with `lane-frontend.md` §5's `lucide-vue-next →
@lucide/vue` ×35 row: the rename wave is the natural moment to re-home the declaration.
**Falsifier.** Show the package under `dependencies` — read `web/package.json`; it is not.

### D-22 · INFO · Empty state: a blank box with a live button that "successfully" copies nothing

`renderedHtml` returns `""` when `latex` is falsy (`:18`), rendering an empty 4.5 rem box with a fully
enabled copy button. The 4.0.0 `copy()` body has **no empty-string guard** (`dist/useViewportReady-CvBcCYDf.js`:
`await navigator.clipboard.writeText(e), { ok: !0 }`), so `copy("")` resolves `ok` → the green Check flashes
for a copy of nothing — a **false-positive confirmation**, the mirror of D-6's false negative.
**Reachability, stated honestly.** The parent gates on `v-else-if="result"` (`EquationView.vue:236`), and
the API model types `latex: str` (`api/models/equations.py:29,45`) — *required*, so the `undefined` path is
closed. The `""` path is open: `displayLatex` is seeded `""` (`EquationView.vue:38`) and re-assigned from
`resp.latex` on the simplify path (`:138`) without a non-empty check. Filed INFO rather than MAJOR because
reachability depends on the deriver emitting an empty string, which this static read cannot settle.
**Falsifier.** Prove the equation deriver never emits `latex == ""` — that is an API-side claim, out of
this axis's read closure.

---

## §5 · SUPERLATIVES (held to the same bar)

### S-1 · `z-index: var(--z-controls)` — token-conformant, and in the repo's majority

`:90` reaches for the library band token rather than a literal. `glass-ui/src/styles/glass.css:8-9` defines
`--z-controls … --z-dock/panel` as *"the glass band (dock, panels, floating chrome)"* — a floating glass
control over content is exactly that band, and this file lands it correctly. The corpus already took this
census: `ConvergenceLegend/challenge-C-consumption.md:203` lists **nine** conformant sites and names
`EquationResult.vue:90` among them, against two outliers using `--z-content`. This file is on the right side
of a measured 9-vs-2 split.
**Falsifier (L-18).** The commendation is narrowed by D-17: the *token* is right, but the parent's adjacent
peer uses `--z-bar` with no recorded rationale, and that mismatch is what makes D-2's occlusion
deterministic. Correct token, uncoordinated band.

### S-2 · `useClipboard` adoption retired a real leak, not just a line count

`:15` replaced a hand-rolled `ref` + `setTimeout` (per `:12-13`). The library body registers its own
teardown — `onScopeDispose(clearTimeout)` (`dist/useViewportReady-CvBcCYDf.js`, the `f()` factory: `return n(o), {copied: r, copy: s}`
where `o()` clears the pending timer). The hand-rolled version had no unmount path, so a copy followed by a
route change left a timer writing to a disposed ref. The migration is a **correctness** win, not a style
win, and the file is one of only three consumers that took it (`grep -rn "useClipboard" web/src/` → 3).
**Falsifier (L-18).** Narrowed by D-3(iii): the destructure it chose (`copied`) is the field 7.0.0 deletes.
The right dependency, the soon-wrong shape.

### S-3 · Named-property transitions — the ratified form, not `transition: all`

`:97` `transition: opacity 0.15s ease, transform 0.15s ease` enumerates its properties. The repo ratified
this explicitly at `AnimationControls.vue:195` (*"A.W3.d — named properties + no `transition: all`"*), and
it matters here: the animated node is inside a `mode="out-in"` `<Transition>` on a glass button whose
`.tap-squish`/`btn-glass` recipe animates its *own* properties (`utilities/base.css:258-273`); a
`transition: all` would have collided with the library's control transition.
**Falsifier (L-18).** Half the ratified form only — the easing is the raw `ease` keyword, not
`var(--ease-standard)` (D-14), and there is no reduced-motion guard (D-13).

### S-4 · The `:deep(.katex-display)` override is a correctly-diagnosed cross-file cascade collision

`:70-75` — *"Override global katex-display to prevent clipping fractions"* — is the file's best line. The
global rule at `style.css:64-69` sets `.katex-display { overflow-x: auto }`, which inside this component's
own `overflow-x: auto` region would mint a **scroll container inside a scroll container**: nested
scrollports, a trapped inner scrollbar, and (with `padding: 0.75rem 0` + `margin: 1rem 0`) 32 px of
uncontrolled vertical rhythm on top of the card's 96 px budget (D-4). The author found a collision that
spans two files and one vendor sheet, defeated it at the narrowest possible scope (`:deep()` under the
component's own class, not a global reset), and *wrote down why*. That is the standard the rest of the
comments in this file do not meet.
**Falsifier (L-18).** Narrowed twice: the `!important` is unearned (D-15), and the same override stops one
declaration short — it resets `margin`, `padding`, `overflow`, but **not** `text-align`, which is the
declaration that causes D-1. The diagnosis was right; the sweep was incomplete.

---

## §6 · Disposition for F.W1 / F.W4

| id | severity | one-line | wave |
|---|---|---|---|
| D-1 | BLOCKER | centred overflow → left overhang unreachable | F.W4 (1 declaration) |
| D-2 | BLOCKER | coarse-pointer collision with `EquationView`'s info button | F.W4 (needs both files) |
| D-3 | BLOCKER | 3 definition-absent 7.0.0 symbols; **census §5 table incomplete** | **F.W1 — re-scope required** |
| D-4 | MAJOR | comment asserts "no vertical clip"; card clips hard at 10 rem | F.W4 |
| D-5 | MAJOR | scroll region keyboard-unreachable; `/equation` has no axe seat | F.W4 + e2e |
| D-6 | MAJOR | copy outcome visual-only; failure swallowed | F.W4 (cured free at 7.0.0) |
| D-7 | MAJOR | control footprint not reserved in the padding box | F.W4 |
| D-8 | MAJOR | `h-4.5 w-4.5` inert — **delete, do not rename** | F.W4 |
| D-9 | MAJOR | 2.10:1 light-mode glyph; off-token green | F.W4 + a glass-ui carry |
| D-10 | MAJOR | no loading/stale treatment; stale copy under a green Check | F.W1 (`loading` prop) |
| D-11..D-18 | MINOR | type ramp, proportion inversion, reduced-motion, motion vocabulary, `!important`, scroll affordance, cross-file contract, `resetMs` | F.W4 |
| D-19..D-22 | INFO | dead `@reference`, comment archaeology, devDep import, empty state | F.W4 sweep |

**The single most consequential line of this challenge:** `CENSUS-2026-08-03.md:186` scopes F.W1's cure to
metric-badge / hover-card / hover-popover / dock members / `ToastVariant`. This 101-line file, which
touches **none** of those, carries three independent 7.0.0 definition-absences, and the Button prop-API
rewrite alone reaches **124 `variant=` sites and 38 `size="icon"` sites across 21 files**. The uplift
budget must be re-derived before F.W1 opens.
