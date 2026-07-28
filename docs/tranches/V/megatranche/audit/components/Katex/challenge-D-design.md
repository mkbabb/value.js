# CHALLENGE-D — design · `demo/scenes/about/katex/Katex.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the tier this seat was
explicitly spawned with. The declaration is present and matches the served model; the seat is not
inherited or undeclared.

## Verdict

**DEFECTIVE.** The premise held. This component has, in design terms, almost no design: a 49-line
SFC whose entire visual contract — box, direction, voice, scale, rhythm, overflow behaviour,
failure appearance, copy payload — is supplied by a vendored third-party stylesheet and by a
`:has()` selector in a *different* component. Two of the resulting defects lose content outright.

The single worst one is not subtle: **on a 390px viewport, three of the four display formulas in
the Lab guide are horizontally clipped, one of them by 57.3%, with zero scroll affordance of any
kind** — no scrollbar (WebKit overlay, `offsetHeight − clientHeight = 0`), no mask, no fade, no
`::after`, no focusable port. The reader sees `a* = 500 [` and a card edge, and has no signal that
446 more pixels of equation exist.

The tranche's own visual audit could not have caught this: the About pane is Picker's right pane, its
"Detailed Guide" is below the fold, and **0 of the 80 captures under `audit/visual/shots/` contain a
single rendered formula** (`grep -c "katex\|about" REPORT.json` → `0`).

17 findings: 2 BLOCKER, 9 MAJOR, 5 MINOR, 1 INFO.

---

## Method

- Read: the component (49 lines), its sole consumer path (`AboutPane.vue` → `Markdown.vue` →
  `assets/docs/*.md`), the vendored `katex.min.css` and `katex.mjs`, and the canon
  (`PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md`).
- Looked at: `audit/visual/shots/{safari-desktop-light,forced-colors-desktop,rtl-desktop}/picker.png`.
  None of them reach the component (finding **D-16**).
- Drove the live dev server at `http://localhost:9000/#/` in **real WebKit** across six arms —
  light/dark @1440, RTL, 200% zoom, forced-colors, mobile 390 — measuring geometry, computed type,
  overflow, selection payload, and contrast. Scripts and raw JSON: `evidence/`. Frames: `frames/`.
- Reproduced the error arm out-of-band by calling `katex.renderToString` with the component's exact
  option object (`evidence/probe3-error.mjs`).

## The subject, verbatim

```vue
<template>
    <div class="inline-block" ref="katexElement"></div>
</template>
```
`Katex.vue:1-3`. That div — one hard-coded Tailwind utility — is the entire designed surface.
Everything else the reader sees comes from `node_modules/katex/dist/katex.min.css` (260 rules,
20 `@font-face`) and from `Markdown.vue:286-306`.

---

## Visual truth

`frames/D-desktop-light-1440.png` · `frames/D-desktop-dark-1440.png` · `frames/D-mobile-390.png` ·
`frames/D-zoom200-1440.png` · `frames/D-rtl-1440.png` · `frames/D-header-occlusion-light-1440.png`

What is actually on screen, named in design terms:

1. **Equations run off the right edge and stop mid-glyph.** `L* = 116 f(Y/Yₙ) − 16, a* = 500 [f(`
   and `X = Xₙ·f⁻¹(f_x), Y = Yₙ·f⁻¹(f_` are cut by the card boundary in every arm. There is no
   visual grammar for "there is more" — the truncation is indistinguishable from the equation
   ending there.
2. **The math is a fourth typographic voice.** 19.36px KaTeX_Main serif against 16px Plus Jakarta
   Sans prose and 12px Fira Code inline code, on a page whose headings are Fraunces. Four families,
   three sizes, in one column. The math reads as pasted in from another document — which it is.
3. **The math is the quietest ink on the page.** Headings are recoloured to the live specimen
   (`--md-color-h2`), inline code is recoloured to the accent
   (`oklch(0.470927 0.188343 9.834023)`), and the *formulas that define the colour space* are
   undifferentiated `--foreground`. The chromatic hierarchy is exactly inverted against the
   semantic hierarchy.
4. **The blocks do not share an axis with the prose.** Each display block is centred inside a box
   that carries a `--phi-3` left indent and no right indent, so its optical centre sits 12.94px
   right of the prose column's centre — at every viewport, including the 332px mobile column where
   that is 3.9% of the measure. When a block overflows, `text-align:center` stops applying and it
   goes left-flush instead, so *adjacent* formulas in the same derivation sit on two different
   axes.
5. **RTL turns the formulas into nonsense** (`frames/D-rtl-1440.png`): `L*` renders as `*L`, `Yₙ`
   as `ₙY`, `a*/500` as `*a/500`, and the `\begin{cases}` brace points the wrong way. See **D-1**.

---

## Findings

Severity: BLOCKER = loses or destroys content in a shipped, default configuration.
MAJOR = a designed state is absent, or a binding canon law is broken.
MINOR = measurable but recoverable. INFO = a gap in the canon rather than in the code.

---

### D-1 · BLOCKER — RTL mirrors scientific notation: subscripts and superscripts swap sides

**Mechanism.** `Katex.vue:2` emits a bare `<div>` with no `dir` and no `unicode-bidi` isolation, and
`katex.render` is called with no direction option. KaTeX's stylesheet never sets `direction`
either — verified:

```
$ grep -o "direction:[a-z]*" node_modules/katex/dist/katex.min.css | sort | uniq -c
   1 direction:column
   1 direction:row
```

(both are `flex-direction`). So `.katex` inherits the document direction. Measured under
`dir="rtl"`: `direction: rtl`, `text-align: right` (`evidence/p2-rtl.json`), and the layout is
genuinely recomputed — the widest block's `scrollWidth` changes 778 → 752px.

**Evidence.** `frames/D-rtl-1440.png`. `L* = 116 f(Y/Yₙ) − 16` renders as `(Y/ₙY) f 116 = *L`.
`f_y = (L*+16)/116` renders as `yf`. `X = Xₙ · f⁻¹(f_x)` renders as `X = ₙX · f ⁻¹(f x)` with the
minus detached and leading. Every sub/superscript has changed sides.

**Reproduction.** `node evidence/probe2.mjs` (arm `p2-rtl`); or in any browser on `/#/`,
`document.documentElement.setAttribute("dir","rtl")` and scroll the About pane to the formulas.

**Canon.** `VISUAL-CONSTITUTION.md §5.2`: "numeric/scientific sign never mirrors". §6.1: "CSS
strings, hex, slugs, IDs and provenance | render in LTR-isolated spans inside RTL prose."
Mathematical notation is the strongest member of that class and is the only one with no isolation.
`index.html:11` establishes `dir="ltr"` explicitly as the RTL-readiness seam, and the tranche
captures an `rtl-desktop` matrix — RTL is a governed axis here, not an unsupported one.

**Cure.** The component root owns its own direction: `dir="ltr"` plus `unicode-bidi: isolate` on the
root it already renders. One attribute, at the root, in the component that knows it is emitting
math — not a consumer override.

---

### D-2 · BLOCKER — display math is clipped with zero affordance; up to 57.3% of a formula is unreachable

**Mechanism.** The component's root is `inline-block` with no overflow behaviour of its own
(`Katex.vue:2`). `Markdown.vue:301-306` reaches in and converts it to
`display:block; overflow-x:auto`. `overflow-x:auto` on WebKit produces *overlay* scrollbars: the
port reserves no space and paints nothing at rest. Nothing else marks the edge.

**Measured** (`evidence/p2-*.json`, `hiddenPx` = `scrollWidth − clientWidth`):

| arm | port width | widest formula | hidden | hidden % | scrollbar reserved | mask/fade/`::after` |
|---|---:|---:|---:|---:|---:|---|
| desktop 1440 light+dark | 462 | 778 | **316px** | **40.6%** | 0px | none |
| desktop 1440, 2nd block | 462 | 505 | 43px | 8.5% | 0px | none |
| **zoom 200%** | 350 | 778 | **428px** | **55.0%** | 0px | none |
| **mobile 390** | 332 | 778 | **446px** | **57.3%** | 0px | none |
| mobile 390, 2nd block | 332 | 505 | 173px | 34.3% | 0px | none |
| mobile 390, 3rd block | 332 | 431 | 99px | 23.0% | 0px | none |

`evidence/p5.json` confirms the absence of every affordance on an overflowing port:
`maskImage:"none"`, `backgroundImage:"none"`, `boxShadow:"none"`, `::before/::after content:"none"`,
`scrollbarWidthReserved: 0`.

**Evidence.** `frames/D-mobile-390.png` — `a* = 500 [` then card edge.
`frames/D-zoom200-1440.png` — `a* = 500 [f(` then card edge.
`frames/D-desktop-light-1440.png` and `-dark-` — same cut in both schemes.

**Reproduction.** `node evidence/probe2.mjs`; or open `/#/` at 390×844, scroll the About card to
"Lab to XYZ".

**Why this is a design defect, not a CSS bug.** "Overflowing" is a state. It was handled
*mechanically* (the content is technically reachable by trackpad gesture) and never handled
*designedly*: no edge signal, no keyboard port (**D-8**), no responsive strategy (no `\allowbreak`
relation breaks, no scaling, no stacked-alignment fallback). A state that was never designed is a
design defect, and this one costs the reader more than half of the page's thesis content on the
most common viewport class.

**Cure.** See **D-10** — glass-ui already ships the exact primitive, and this repo already uses it.

---

### D-3 · MAJOR — the math introduces a fourth and fifth type family and a rogue 1.21× rung

**Measured** (`evidence/light-1440.json`):

| role on the line | family | size | line-height |
|---|---|---:|---:|
| prose | Plus Jakarta Sans | 16px | 28px |
| inline code | Fira Code | 12px | — |
| **math (inline and display)** | **KaTeX_Main, Times New Roman, serif** | **19.360001px** | **23.232002px** |

19.360001 / 16 = **1.21 exactly** — KaTeX's hard-coded shorthand
`.katex{font:normal 1.21em KaTeX_Main,Times New Roman,serif;line-height:1.2}`. Five KaTeX faces
actually load on the Lab route (`KaTeX_Main-Regular`, `KaTeX_Math-Italic`, `KaTeX_Size3`,
`KaTeX_Size4`, per `document.fonts` status), out of 20 `@font-face` rules the import installs.

**Canon.** `VISUAL-CONSTITUTION.md §4`: the seven-role type matrix "is closed across all eighteen
compositions… P019's family-neutral Picker identity/headline pair is the **sole** paired-scale
exception." `PROPORTION-AUDIT.md §5.13`: "Fraunces owns display/identity, Plus Jakarta Sans owns
headings/prose/controls, and Fira Code owns mono roles." Math has no row, so it is currently
outside the closed matrix on two counts: family (KaTeX_Main/KaTeX_Math, plus a `Times New Roman`
fallback that would render if a face fails) and scale (1.21× is on neither the glass-ui golden
ladder nor the φ ladder, whose rungs are 0.382/0.618/1/1.618/2.618rem — `foundation.css:458-462`).

Note the `font:` *shorthand* also resets weight, style, variant, stretch **and** line-height, so the
math's 1.2 leading is imposed rather than inherited: inline math is 21% larger and 17% tighter-leaded
than the sentence carrying it.

**Cure.** Give math a named row in §4 and pin it. Either (a) it is a **specimen**, sharing the code
fence's jurisdiction — mono/well tone, `text-mono-small` metric, one named math face; or (b) it is
prose-with-symbols — `\text{}` runs re-mapped to Plus Jakarta Sans and the symbol face sized at an
adjacent golden rung, not 1.21em. Either way the size comes from a token, not from a vendored
shorthand.

---

### D-4 · MAJOR — selecting and copying a formula yields per-glyph, doubled garbage

**Mechanism.** `output: "htmlAndMathml"` (`Katex.vue:41`) emits both a MathML layer and an HTML
layer. The MathML layer is *visually* hidden by `clip-path: inset(50%)` — which does not remove it
from the selection or from find-in-page. Its `<annotation>` carries the clean LaTeX source, and
that is *also* in the text content.

**Measured** (`evidence/p5.json`) — `window.getSelection().toString()` over one display block:

```
f\n(\nt\n)\n=\n{\nt\n3\nt\n>\nϵ\nκ\nt\n+\n16\n116\notherwise\n \nf(t)={ \n3\n  \nt\n​\t\n \n116\nκt+16\n​\t\n \n​\t\n  \nt>ϵ\notherwise\n​\t\n \n
```

and `textContent` is a three-way concatenation:
`f(t)={t3t>ϵκ t+16116otherwise` + `f(t) = \begin{cases}…\end{cases}` + `f(t)={3t​116κt+16​​t>ϵotherwise​`.
`duplicated: true`. The clean payload — `annotationText` — exists and is exactly what a reader
wants, and is exactly what they do not get.

**Consequences.** (a) Copy is unusable on a page whose purpose is to hand the reader formulas.
(b) Find-in-page matches every numeral up to 3× per formula and can scroll to the clipped hidden
layer. (c) Any AT that falls back to flat text hears the equation twice plus its LaTeX source.

**Reproduction.** `node evidence/probe5.mjs`; or select a formula on `/#/` and paste.

**Cure.** The copy payload is a design decision and must be made: mark the redundant layers
`user-select: none` and let the `<annotation>` LaTeX be the selectable text, or drop to
`output: "html"` and carry accessibility on one authored `aria-label`. Today no decision has been
made at all.

---

### D-5 · MAJOR — the error state is an un-overridable `#cc0000` that fails contrast in dark by 2.1×

**Mechanism.** `throwOnError: false` (`Katex.vue:33`) routes every malformed expression into
KaTeX's own error rendering. `node_modules/katex/dist/katex.mjs:170-172` defaults
`errorColor: "#cc0000"`; line 16552 writes it as **`node.setAttribute("style", "color:" + …)`** — an
inline style, so no app stylesheet can override it without `!important`.

**Reproduced with the component's exact options** (`evidence/probe3-error.mjs`):

```
-- malformed expr= "\\frac{1}{"
   errorClass: class="katex-error"
   inlineStyle: style="color:#cc0000"
   role/aria: (none)
   head: <span class="katex-error" title="ParseError: KaTeX parse error: Unexpected end of input…" style="color:#cc0000">\frac{1}{</span>
```

**Measured contrast** (`evidence/p4b.json`, WCAG 2.x relative-luminance):

| ground | value | `#cc0000` contrast |
|---|---|---:|
| About Card, **dark** (`--card`) | `rgb(53, 42, 34)` | **2.37 : 1** — fails AA (4.5) and even large-text (3.0) |
| About Card, light | `rgb(253, 245, 236)` | 5.45 : 1 |
| the app's own `--destructive`, dark | `rgb(235, 71, 71)` | (the certified token) |
| the app's own `--destructive`, light | `rgb(219, 36, 36)` | (the certified token) |

So the component ships a **second, uncertified, scheme-blind error red** alongside the certified
`--destructive` — the identical "parallel species" defect this codebase already cured for
`--muted` vs `--well` (`Markdown.vue:229-232`, AB-3).

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "Selected, failed, pending, withdrawn and disabled states
are never color-only. Role, accessible name, state/value and associated error/status are explicit."
The KaTeX error state is colour-only: no role, no accessible name, no visible message — the
diagnosis lives in a `title` attribute (hover-only) and the visible content is a raw LaTeX dump.

**Reproduction status.** The mechanism is reproduced exactly; no *current* expression in
`assets/docs/*.md` is malformed, so the state is presently **latent**. It is an undesigned state
that will appear the first time anyone edits a formula.

**Cure.** The component owns its failure arm: `throwOnError: true` inside a `try`/`catch`, rendering
the app's own named error affordance (role, accessible name, human message, `--destructive`),
never a vendored red source dump. This also retires the edict-2 masking fallback.

---

### D-6 · MAJOR — chromatic hierarchy is inverted: the formulas are the least-emphasised ink on the page

**Measured** (`evidence/light-1440.json` / `dark-1440.json`) — one column, three species:

| species | light | dark |
|---|---|---|
| prose | `rgb(28, 25, 23)` | `rgb(233, 230, 226)` |
| **math** | `rgb(28, 25, 23)` (= prose) | `rgb(233, 230, 226)` (= prose) |
| inline `code` | `oklch(0.470927 0.188343 9.834023)` (accent) | `oklch(0.958322 0.021053 9.834023)` (accent) |
| `h2`/`h3` | `--md-color-h2` / `-h3`, live-specimen derived | same |

`Markdown.vue:163,168,252` recolour headings and inline code to the live specimen; math gets
nothing. On a page whose subject *is* colour, and where the conversion formulas are the argument,
the argument is the only content that never participates in the live chromatic system.

**Canon.** `PROPORTION-AUDIT.md §1`: "Every element earns its scale, interval, boundary and material
from its job relative to the local protagonist." `VISUAL-CONSTITUTION.md §7 (About)`: "About
follows the type and material constitution". The formulas are the local protagonist of the
"Conversion" sections and are rendered as background.

**Cure.** Math is a specimen. Give it the specimen well (`bg-well`, the rung-2 tone the code fences
and TOC already share — `Markdown.vue:236,241,388`) so the block is *materially* distinguished
instead of relying on an ad-hoc indent, and let the accent live on the relation operators or on
nothing — but decide it, at the root.

---

### D-7 · MAJOR — the display block's vertical rhythm is off-ladder and inverts proximity

**Measured** (`evidence/p2-base.json`, rendered *ink* gaps via `Range.getClientRects`):

- prose ¶ → formula: **46.49px**
- formula → next formula: **60.25px**

Two consequences.

(a) Neither is a φ rung. The ladder is 6.112 / 9.888 / 16 / 25.888 / 41.888px
(`foundation.css:458-462`). 46.49 and 60.25 are on nothing. They are the accidental sum of four
independent owners: the preceding `<p>`'s `margin-bottom: var(--phi-2)`; the wrapper's
`margin-block: var(--phi-1)` and `padding: var(--phi-1) 0 var(--phi-1) var(--phi-3)`
(`Markdown.vue:304-305`); and the vendored `.katex-display{margin:1em 0}`. Four owners, one gap,
no owner.

(b) **Proximity is inverted.** Two formulas belonging to the *same* derivation are pushed 29.6%
further apart (60.25px) than a formula and the prose that introduces it (46.49px). Gestalt
proximity says related things sit closer; here the most-related pair sits furthest apart. At 200%
zoom the gap grows to 93.0 / 120.6px and the inversion persists.

**Cure.** One owner for block rhythm. Zero the vendored `.katex-display` margin at the component
root and let the φ ladder alone set the interval, with the intra-derivation gap tighter than the
prose→math gap.

---

### D-8 · MAJOR — the horizontal scroll port is unreachable by keyboard and has no name or role

**Measured** (`evidence/p5.json`, desktop 1440):

```
overflowingPorts: 2   portsWithTabindex: 0   portsWithRole: 0   portsWithAriaLabel: 0
```

The port has no focusable descendant either: the entire `.katex-html` layer is `aria-hidden="true"`
(`evidence/light-1440.json`), and there are no interactive children. A keyboard-only or
switch-access user therefore cannot reach the 316–446px of hidden equation at all — the content is
not merely unsignalled, it is unreachable without a pointer.

**Canon.** `VISUAL-CONSTITUTION.md §5`: "every spatial action has a keyboard/numeric equivalent."
`§4.1`: state and name are explicit.

**Cure.** Same as **D-10**: the port becomes a real named, focusable scroll region.

---

### D-9 · MAJOR — inline math ruptures the paragraph line box at zoom and on mobile

**Mechanism.** `Katex.vue:2` makes the root `inline-block`, so an inline formula is an atomic
inline-level box whose *internal* content wraps. When it wraps, the box grows tall and drags the
whole paragraph line box with it.

**Measured** (`evidence/p2-zoom200.json`, `p2-mobile390.json`) against a 28px prose line-height:

| arm | formula | `.katex` height | exceeds line box by | wrapper height |
|---|---|---:|---:|---:|
| **zoom 200%** | `L^* = 0 \text{ (black) to } 100…` | 101.5px | **+73.5px** | 112px |
| zoom 200% | `a^* < 0 …` (and 3 more) | 45.5px | +17.5px | 56px |
| **mobile 390** | `L^* = 0 \text{ (black) to } 100…` | 50.75px | **+22.75px** | 56px |
| desktop 1440 | all five | 22.75px | −5.25px | 28px |

A 112px-tall "word" inside a 28px-leaded paragraph is a hole in the text block, and the formula
inside it is broken at an arbitrary point with no relation-break logic — the wrap can land between
an operator and its operand.

**Canon.** `VISUAL-CONSTITUTION.md §3.7`: "Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork". The rhythm here is not scaled; it collapses.

**Cure.** Inline math is inline: the root should be `<span>` with the surrounding line-height and a
`\text{}`-aware break policy, or the long `\text{…}` runs should not be inside math at all —
`L^* = 0 \text{ (black) to } 100 \text{ (diffuse white)}` is a *sentence* typeset as an equation,
which is why it is 3.6× the line height. That is a content-shape decision the component's design
never forced anyone to make.

---

### D-10 · MAJOR — glass-ui already ships the exact primitive, and this repo already uses it; the math port hand-rolls instead

**Evidence.** glass-ui 7.0.0 exports `fading-scroll`:

```
$ cat node_modules/@mkbabb/glass-ui/dist/fading-scroll.d.ts
export * from "./components/fading-scroll";
```

and this repository already consumes it for the *identical* problem — a horizontally overflowing
strip inside a pane:

```
demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:13
    import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:84
    <FadingScroll axis="x" class="specimen-strip">
```

The math port instead hand-rolls `@apply overflow-x-auto` at `Markdown.vue:303`, producing the
zero-affordance state measured in **D-2** and the unreachable port in **D-8**.

**Canon / edict.** Owner edict 4 — "Glass-ui is the design system… Reuse existing component-type
names." `feedback_glass_ui_first_class.md`. This is the textbook case: a producer primitive exists,
is in the dependency, is already imported elsewhere in the same repo, and was bypassed.

**Cure.** `<FadingScroll axis="x">` becomes the display-math root, rendered by the component that
knows it is in `displayMode` — which also cures **D-2**, **D-8**, and **D-11** in one move.

---

### D-11 · MAJOR — the root ignores the one prop it takes; a consumer's `:has()` selector supplies the box

**Mechanism.** `Katex.vue:2` hard-codes `class="inline-block"` for *both* modes. `Katex.vue:22-25`
takes `displayMode` and passes it to `katex.render` but never lets it touch the root. So
`Markdown.vue:301-306` has to reach back in and undo it:

```css
> div.inline-block:has(> .katex-display) {
    display: block;
    @apply overflow-x-auto;
    padding: var(--phi-1) 0 var(--phi-1) var(--phi-3);
    margin-block: var(--phi-1);
}
```

**Measured consequence** (`evidence/p5.json`, `orphanRoot`) — the same node cloned outside
`.markdown-body`:

```
display: "inline-block"   overflowX: "visible"   padding: "0px"   margin: "0px"   width: 256.52 (in an 800px host)
```

Outside its one consumer the component has **no** scroll port, **no** block rhythm, **no** indent,
and shrink-wraps to ink width — i.e. 100% of its display-mode design lives in another file, keyed
on a Tailwind utility class used as a structural contract.

**Canon / edict.** Owner edict 5 — "style at the shadcn/glass root component level, never
per-instance overrides." This is the inverse: the root has *no* style and the instance context
supplies all of it.

**Cure.** The root reflects the prop: a `FadingScroll` block root when `displayMode`, a `<span>`
when not. `Markdown.vue:286-306` (21 lines of `:has()` compensation) then deletes.

---

### D-12 · MINOR — a display formula scrolled to lands entirely behind the sticky pane header

**Mechanism.** `Markdown.vue:121` gives `scroll-m-20` (80px) to `> h1..h6` only. The math wrapper
gets nothing.

**Measured** (`evidence/probe6.mjs`, live, after `wrapper.scrollIntoView({block:"start"})` — the
browser's own in-page-anchor behaviour):

```
headingScrollMarginTop: "80px"      mathScrollMarginTop: "0px"
pane-header height: 136.59px        header bottom edge: y = 240.59
formula ink: y = 129.98 … 188.06    ink height: 58.08px
occluded: 110.61px  →  190.4% of the ink is above the header's bottom edge
```

`PaneHeader.vue:11` is `sticky top-0 z-header` with a `mask-image` that dissolves only its last
14px, so the formula sits ghosted *under* the header rather than hidden — see the top of
`frames/D-desktop-light-1440.png` and `frames/D-header-occlusion-light-1440.png`, where
`f(t) = {…}` and the header title overprint each other.

Note the heading's own 80px is also short of the 136.59px header, so this is a family defect —
but math is the only member with `0`.

**Cure.** One `scroll-margin-block-start` token owned by the pane, applied to every scroll target
including the math block.

---

### D-13 · MINOR — the centring axis is displaced 12.94px from the prose axis at every viewport

**Measured** (`evidence/p2-*.json`, `axis`): the wrapper carries `padding-left: 25.888px`
(`--phi-3`) and `padding-right: 0`, so its content-box centre is 12.94px right of the column centre.
Constant in absolute terms across 1440 / 200%-zoom / mobile-390 — which means it is proportionally
worst where the column is narrowest (12.94 / 332 = **3.9%** of the mobile measure).

Compounding this: `.katex-display{text-align:center}` only applies while the formula fits. The two
overflowing blocks are left-flush instead. So on mobile, adjacent formulas in one derivation sit on
two different axes — visible in `frames/D-mobile-390.png`, where `f_y = …` starts at a different x
than `where ε = …`.

**Cure.** Pick one axis and hold it in both the fits and overflows cases. If display math is
centred, the indent must be symmetric; if it is indented, it must be left-aligned.

---

### D-14 · MINOR — `content-visibility` reserves 200px for blocks that are 76–110px tall

**Measured** (`evidence/p2-base.json`, `cv` + `rows`): `Markdown.vue:106-108` applies
`content-visibility: auto; contain-intrinsic-size: auto 200px` to every non-first child of
`.markdown-body`, which includes each display-math wrapper. Real heights on the Lab route:
**109.83 / 98.20 / 91.58 / 76.23px**. Every off-screen block over-reserves by 90.17–123.77px;
across the four blocks that is ~360px of phantom height in a card that is itself the scroll
container — a lying scrollbar and a scroll position that shifts as blocks are rendered.

**Cure.** Either a per-species intrinsic size that matches the measured range, or — better — drop
`content-visibility` from the math wrapper entirely once the display block is a real bounded
species with a known height.

---

### D-15 · MINOR — `displayMode` is declared reactive and is not

`Katex.vue:48`: `watch(() => expression, renderKatex);`. The watch source is `expression` alone.
Because props are reactively destructured (`Katex.vue:22`), `displayMode` *is* read reactively
inside `renderKatex` — but nothing re-invokes `renderKatex` when only `displayMode` changes. A
consumer binding `:display-mode="someRef"` gets a silently stale render.

**Reproduction.** NONE — no current call site binds `displayMode` dynamically (all 64 sites in
`assets/docs/*.md` pass a literal). This is a latent contract defect, labelled as such.

Related: the prop's default is `true` (`Katex.vue:22`), inverting the HTML boolean-attribute idiom —
27 of the 64 call sites must write `:display-mode="false"`, and no site can write the natural
`<Katex inline>`.

**Cure.** `watch([() => expression, () => displayMode], renderKatex)`, or `watchEffect`. If the
root becomes mode-dependent (**D-11**) the prop must be reactive by construction anyway.

---

### D-16 · MAJOR (evidence) — the component has zero visual coverage in the tranche's own audit

**Measured.**

```
$ grep -c "katex\|about" docs/tranches/V/megatranche/audit/visual/REPORT.json
0
```

The 60-capture Safari matrix covers 15 routes; About is not a route — it is Picker's *right pane*
(`viewSchema.ts:105-113`, `picker: { left: "color-picker", right: "about" }`). On desktop the About
card renders, but the "Detailed Guide" markdown sits below the fold and no capture scrolls; on
mobile `/#/` shows pane-index 0 (the Picker), so About is not rendered at all — which is exactly
why `REPORT.md:149` records 70 text nodes for `safari-mobile-light /#/` against 859 on desktop.
The supplementary matrices (`rtl-desktop`, `zoom-200-desktop`, `forced-colors-desktop`,
`reduced-motion-desktop`, `keyboard-focus-desktop`) each capture `picker.png` at the same scroll
position. I read `safari-desktop-light/picker.png`, `forced-colors-desktop/picker.png` and
`rtl-desktop/picker.png` directly: none contains a rendered formula.

**Net: 0 of 80 captures contain the component's output.** Both BLOCKERs above were invisible to the
audit that was supposed to find them — including the RTL corruption, which the `rtl-desktop` matrix
was built to catch.

**Cure.** The visual matrix must capture *pane states*, not just routes: a route with a right pane
needs at least one below-the-fold capture, and mobile needs the pane-index-1 arm. Otherwise About,
Palettes, Mix and Blob right-pane content are all structurally uncapturable.

---

### D-17 · INFO — the canon has no jurisdiction for mathematics

`VISUAL-CONSTITUTION.md §4`: "About prose has `max-inline-size: 66ch`; **only** the named
`Conversion paths` ordered graph and fenced code specimens may escape that prose measure."
`§3.1`/`§7` describe About as "typographic product argument… supporting examples content-hug".

Display mathematics is neither prose, nor the Conversion-paths graph, nor a fenced code specimen.
It is the single largest content species on the route (64 instances across 11 documents) and the
canon does not name it once — no type row (**D-3**), no material tier, no measure exemption, no
overflow policy, no direction rule. Measured today, `max-inline-size` on `.markdown-body` and on
`p` is `100%` / `none` (`evidence/light-1440.json`) — the 66ch law is not implemented at all, so
the conflict is currently dormant; the moment W18 lands it, every display formula becomes an
unowned exception.

**Cure.** Add a math row to §4's matrix and a math clause to §7's About paragraph, in the same pass
that lands the 66ch measure. This is a formation input, not an implementation task.

---

## The gestalt cure

Not a patch list. The transposition is: **display mathematics becomes a first-class bounded
specimen species with exactly one owner for each of its design properties**, in the component that
already knows it is rendering math.

Today, the ownership map is:

| property | owner today |
|---|---|
| box / display | `Markdown.vue:301` `:has()` selector |
| overflow port | `Markdown.vue:303` hand-rolled `overflow-x-auto` |
| indent / axis | `Markdown.vue:304` asymmetric padding |
| block rhythm | four owners (`p` margin + wrapper margin + wrapper padding + vendored `1em`) |
| type voice + scale | `node_modules/katex/dist/katex.min.css` |
| ink colour | inherited `--foreground`, uncertified |
| direction | inherited from the document — nobody |
| failure appearance | `katex.mjs:16552` inline `#cc0000` |
| copy payload | nobody |
| keyboard reach | nobody |

Afterwards, all ten rows read **`Katex.vue`**:

```
<FadingScroll v-if="displayMode" axis="x" dir="ltr" tabindex="0" role="group" :aria-label="…">
  <div ref="katexElement" />
</FadingScroll>
<span v-else dir="ltr" ref="katexElement" />
```

with (1) the math type row added to `VISUAL-CONSTITUTION.md §4` and consumed as a token rather than
inheriting KaTeX's 1.21em shorthand; (2) `.katex-display{margin:1em 0}` neutralised at the root so
the φ ladder is the sole rhythm owner, tighter within a derivation than between prose and math;
(3) the specimen well tone (`bg-well`) carrying the block, so it is materially a specimen rather
than an indent; (4) `throwOnError: true` inside the component's own `try`/`catch`, rendering the
app's named error affordance on `--destructive`; (5) the LaTeX `<annotation>` designated as the
selectable payload and the duplicate layers `user-select: none`.

That deletes `Markdown.vue:286-306` (21 lines of compensation), deletes the Tailwind-class-as-
structural-contract, and — the point — makes the component's rendered result a function of its own
props instead of a function of where it happens to be mounted.

Sequencing note: if the parallel proposal to move typesetting to **build time** is adopted, every
one of these design decisions still has to be made — they simply move into the markdown transform.
None of the 17 findings is cured by relocating the renderer; they are cured by deciding the design.

---

## Negative proof — what I attacked and found sound

- **Motion.** The component animates nothing, tokenised or otherwise. No `transition`, no
  `@keyframes`, no rAF, no layout-forcing animated property. `prefers-reduced-motion` is therefore
  vacuously satisfied. No animation was deleted anywhere in its history (edict 6 clean). **SOUND.**
- **Sub-pixel fraction bars.** I hypothesised the `\frac` rule would vanish at DPR 1. It does not:
  `border-bottom-width` computes to `1px` at DPR 1 and `0.5px` at DPR 2, i.e. one device pixel in
  both cases (`evidence/p4b.json`). Hypothesis **withdrawn**.
- **Forced colors.** `matchMedia("(forced-colors: active)")` resolves `true` under WebKit emulation,
  but WebKit performs no colour substitution — `.frac-line` border and the stretchy-`svg` `fill`
  both stay `rgb(28, 25, 23)` (`evidence/p2-forced.json`). The arm is **not testable** in this
  harness; I make no claim either way rather than manufacture one.
- **Math ink contrast.** Math inherits exactly the prose colour in both schemes
  (`rgb(28,25,23)` / `rgb(233,230,226)`), so it is no worse than the prose it sits beside. **SOUND**
  (the uncertified-against-translucent-card concern is the pane's, not the component's).
- **MathML accessibility layer.** `output: "htmlAndMathml"` is the right choice for WebKit; the HTML
  layer correctly carries `aria-hidden="true"` and the MathML is exposed. The reasoning in the
  `Katex.vue:34-40` comment is correct. **SOUND** — the defect is the copy payload (**D-4**), not
  the AT layer.
- **Vue 3.5 idioms (edict 7).** `useTemplateRef` ✓, reactive props destructure ✓, no `defineModel`
  stale-read hazard (no model). **SOUND** apart from the incomplete watch source (**D-15**).
- **`verbatimModuleSyntax` (edict 8).** All three imports are value imports; no type-only import is
  mis-declared. **SOUND.**
- **God modules (edict 1).** 49 lines, one job. **SOUND.**
- **Horizontal page overflow.** The card never overflows the document — `REPORT.md` records
  `overflowX: 0` on every capture, and my probes agree. The clipping in **D-2** is contained
  *inside* the port, which is why no automated overflow check found it.

---

## Artefacts

| path | what |
|---|---|
| `frames/D-desktop-light-1440.png` | WebKit 1440×900 light — clipped `a* = 500 [f(` |
| `frames/D-desktop-dark-1440.png` | same, dark scheme |
| `frames/D-mobile-390.png` | 390×844 — three of four formulas clipped, 57.3% max |
| `frames/D-zoom200-1440.png` | 200% zoom — 55.0% of the widest formula hidden |
| `frames/D-rtl-1440.png` | `dir="rtl"` — sub/superscripts mirrored (**D-1**) |
| `frames/D-header-occlusion-light-1440.png` | formula scrolled to `block:"start"`, 190.4% occluded |
| `evidence/light-1440.json`, `dark-1440.json` | computed type, colour, geometry, font-load status |
| `evidence/p2-{base,rtl,zoom200,forced,mobile390}.json` | overflow, axis, rhythm, line-box, direction |
| `evidence/p4b.json` | `#cc0000` contrast vs `--card`/`--background`/`--destructive`, both schemes |
| `evidence/p5.json` | selection payload, orphan-root geometry, port a11y, affordance inventory |
| `evidence/probe{1,2,4b,5,6}.mjs` | the live WebKit probes, re-runnable against `localhost:9000` |
| `evidence/probe3-error.mjs` | the error-arm reproduction, component's exact option object |

Dev-server console during every probe carried exactly one pre-existing error — the
`VITE_API_URL` misconfiguration banner — unrelated to this component.
