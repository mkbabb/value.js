# CHALLENGE-D — `demo/scenes/about/markdown/Markdown.vue` — pass 2 (independent re-run)

**Axis:** design (visual truth · state coverage · motion · design-system boundary · proportion/seat law)
**Subject:** `demo/scenes/about/markdown/Markdown.vue` — 408 LoC (77 template+script, 331 scoped CSS)
**Repo/HEAD:** value.js · `tranche-u` · seat brief cites `c654824e`; working tree at run time `fe8785e5`
**Date:** 2026-07-28

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. No inherited or undeclared
seat.

---

## 0. Standing on a prior pass — what this document is

A CHALLENGE-D pass already ran on this component earlier today. It is preserved **verbatim** beside this
file as **`challenge-D-design.pass-1.md`** (16 findings, `evidence/` bench, `probe-md*.mjs`,
`probe-skeleton.mjs`, `probe-error.mjs`, `probe-pixels.mjs`). Nothing in it was overwritten.

I did not read pass-1 until after my own probes were complete, so this is a genuine independent
re-derivation, not a review. It matters for two reasons: the E-1 twice-audit edict wanted a second
reading, and a second reading is the only thing that can falsify a *negative*.

**Result: pass-1 is corroborated on every finding I independently reached, with numbers taken by
different scripts — and one of its proved negatives is overturned by measurement.**

| pass-1 finding | my independent number | agreement |
|---|---|---|
| D-1 dark accent collapse | ΔE(mark,strong) 0.3153 light → **0.0378** dark; chroma 0.1887 → **0.0208** (9.1×) | **identical** |
| D-2 unreachable error / route teardown | one aborted request → `pickerPresent:false`, `aboutPresent:false` | **identical** |
| D-3 zero-width skeleton bones | bones measured **48×48, 0×16, 0×16**; `border-radius: 4px` despite `rounded-full`; `surface`/`variant` land as raw attributes | **identical** |
| D-4 `content-visibility` scroll inflation | `scrollHeight` 8 023 → 4 908 after one full scroll-through; **Δ −3 115 px (−47 %)** | same defect, different arm (they report 63 %; see §2 note) |
| D-5 type matrix bypassed | prose 16 px vs `text-prose` **20.672 px**; code 12 px vs `text-mono-small` **16.4 px**; h2 30 px Fraunces 600 vs `text-heading` 25.888 px PJS 700 | **identical** |
| D-6 RTL markers lost | `padding-inline-start` **41.888 px → 0 px**; marker room **42 px → 0 px** | **identical** |
| D-7 forced-colors mark backplate deleted | `mark` forced bg = `rgba(255,255,0,0)`, alpha 0; `code` forced bg = Canvas with 0 px border | **identical** |
| D-8 god module / dead theme | 22 of 43 rules dead; ≥131 of 331 style lines unreachable (they count 112 — see §2 note) | same verdict |
| D-11 `66ch` absent | `max-inline-size: 100%`; measure 60.0 chars desktop / 43.1 chars mobile | same defect, different metric (see §2 note) |
| D-14 leaf re-imports global CSS | `Markdown.vue:37,38` are the only leaf occurrence in `demo/` | **identical** |
| D-15 no witness in the visual matrix | 0 of 60 captures contain a pixel of this component | **identical** |
| **negative #1 — "Motion / `prefers-reduced-motion` — SOUND"** | **FALSIFIED — see N-1 below** | **overturned** |

Pass-1's D-9 (PR-14 divider subtraction), D-10 (20 of 33 φ intervals are collapsed margins), D-12
(sibling root restyled) and D-13 (local `--phi-*` shadow) I did not independently reach; I have no
evidence against them and they stand on pass-1's bench.

My own probe scripts and frames (independent of `evidence/`):
`chD-md-probe{,2,3}.mjs`, `chD-final.mjs`, `chD-skel.mjs`, `chD-err2.mjs`, `chD-ovf2.mjs`,
`chD-prm.mjs`, `chD-roles.mjs`, frames under `chD/`, in
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`.

---

## 1. New findings — the motion axis, which pass 1 closed as sound

### N-1 · MAJOR · **Reduced motion does not resolve to the final state** — pass-1's proved negative is false

`challenge-D-design.pass-1.md:556-559` closes the motion axis:

> **Motion / `prefers-reduced-motion` — SOUND.** `Markdown.vue:125` … and `:201, :405` … are all
> neutralised by the global guard at `demo/styles/animations.css:184-193`
> (`transition-duration: 0.01ms !important` on `*`).

That is a *source-reading* claim about the cascade, not a measurement. Measured
(`chD-prm.mjs`, WebKit, `reducedMotion: "reduce"`, emulation confirmed live by
`matchMedia("(prefers-reduced-motion: reduce)").matches === true`):

```
NORMAL: prmMatches=false   h2 → "0.45s | color"
                           code → "0s | all"
                           mark → "0s | all"
                           p    → "0s | all"

REDUCE: prmMatches=true    h2   → "0.1s | opacity, color, background-color, border-color, box-shadow"
                           code → "0.1s | opacity, color, background-color, border-color, box-shadow"
                           mark → "0.1s | opacity, color, background-color, border-color, box-shadow"
                           p    → "0.1s | opacity, color, background-color, border-color, box-shadow"
```

The guard's `0.01ms` is **not** what these elements compute. Under reduced motion they compute **100 ms
across a five-property list** — including `opacity` and `box-shadow`, neither of which they transition in
the normal register. Even `<p>`, which has no transition at all normally, acquires one. Something later
in the cascade with equal `!important` weight is winning over `animations.css:184-192`; whatever the
owner, the *component* declares no reduced-motion behaviour of its own and its assumption that a global
guard covers it is measurably wrong.

`VISUAL-CONSTITUTION.md:144`: "Reduced motion resolves directly to the final geometry and stable
chromatic state." It resolves to a different, broader transition instead. Confirmed at two arms of the
same script in the same run, so this is not emulation drift.

### N-2 · MAJOR · One ink, two motions — the accent cross-fades on headings and snaps on everything else

`--md-color-accent` is consumed at five sites (`Markdown.vue:163, 172, 187, 252, 312`). Exactly one of
them transitions:

| site | rule | measured normal-register transition |
|---|---|---|
| `> h1…h6` | `Markdown.vue:125` `transition: color var(--duration-slow) var(--ease-standard)` | **0.45 s / color** |
| `mark.cs-name` | `Markdown.vue:185-189` | **0 s / all** |
| `p > code, li > code` | `Markdown.vue:250-253` | **0 s / all** |
| `hr` | `Markdown.vue:309-314` | **0 s / all** |
| `> h3, > h4` (`--md-color-h3`) | inherits line 125 | 0.45 s / color |

Drag the picker and the four `h2`/nine `h3` cross-fade over 450 ms while the nine `mark.cs-name` runs,
fourteen inline `code` chips and four `hr` rules — carrying the **same** certified ink — jump instantly,
inside the same paragraph. The document tears chromatically on every pointer move.

`VISUAL-CONSTITUTION.md:139-140`: "Spatial continuity uses one producer-owned glass-ui spring register.
Color/opacity effects use the corresponding short effect curve." One ink cannot honestly have two
curves, and 450 ms (`--duration-slow`) is the *spatial* rung applied to a colour effect.

### N-3 · MAJOR · The producer's error affordance is declined while a non-existent one is invented

Two halves of the same defect, both against edict 4/5 (glass-ui is the design system; style at the root):

**Invented.** `Markdown.vue:4,6,7` pass `surface="glass" variant="shimmer"`. glass-ui 7.0.0's `Skeleton`
declares one prop:
```ts
// node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts
type __VLS_Props = { class?: HTMLAttributes["class"] };
```
Rendered DOM (`chD-skel.mjs`) carries them as literal HTML attributes. Corroborates pass-1 D-3.1.

**Declined.** `Markdown.vue:20` uses a bare `<Alert>`. glass-ui 7.0.0 ships exactly the affordance this
state needs — pass 1 does not mention it (`grep -n "tone=\|announce\|destructive" challenge-D-design.pass-1.md` → 0 hits):
```ts
// dist/components/alert/index.d.ts
declare const TONE: { neutral; destructive; success; warning; info };
// dist/components/alert/Alert.vue.d.ts
type __VLS_Props = { class?; tone?: AlertVariants["tone"]; announce?: "off" | "polite" | "assertive" };
```
Even after pass-1's W-MD-3 makes the failure state reachable, it would render in the **neutral** tone
with the **default** announcement — an error styled as information, silent to assistive technology.
`VISUAL-CONSTITUTION.md:83`: "Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."

### N-4 · MINOR · `scroll-m-20` is a dead magic number

`Markdown.vue:121` (`> h1…h6`) and `:389` (`.toc`) apply `scroll-m-20` = `scroll-margin: 5rem`. 5 rem is
sized to clear a sticky header. The component's own comment at `Markdown.vue:380-384` records that the
sticky band was *retired* ("nothing in-card sticks above the pane header"), and the corpus contains no
in-page anchors:
```
$ grep -c '](#' assets/docs/*.md | awk -F: '{s+=$2} END {print s}'   → 0
```
80 px of scroll margin on thirteen headings, for an anchor mechanism that does not exist and a sticky
header that was deleted. Not mentioned in pass 1.

---

## 2. Where my numbers differ from pass 1 — and why both are right

Recorded so an adjudicator does not read these as contradictions.

**Scroll inflation (pass-1 D-4: 63 %; mine: 47 %).** Different arms of the same defect. Pass 1 compares
the *first-paint estimate* against the settled height. I compare *arrival* (8 023 px card / 6 636 px
body) against *after one full scroll-through, returned to top* (4 908 / 3 521) — Δ **−3 115 px**, which
is 47 % of the arrival figure. Same mechanism (`content-visibility: auto` +
`contain-intrinsic-size: auto 200px` on 34 children whose true heights span 1 px `<hr>` to hundreds of
px); the percentage just depends on which pair you difference. The user-facing fact is identical: the
scroll thumb lies until the document has already been read, and the content slides upward under the
cursor.

**Prose measure (pass-1: 49.5 ch desktop / 35.5 ch mobile; mine: 60.0 / 43.1).** Pass 1 divides the body
width by the `0` glyph advance (the literal CSS `ch` unit, 9.342 px). I divide by the measured mean
advance of running prose (7.700 px desktop). Both are correct for their definition; the constitution's
"`66ch`" is written in CSS `ch`, so **pass 1's 49.5 / 35.5 are the numbers that bind**. Mine describe
what a reader actually gets per line. Both agree the cap is absent — computed `max-inline-size: 100%`
from `Markdown.vue:101` `@apply max-w-full`, which would additionally *defeat* a 66 ch bound introduced
upstream.

**Dead-rule count (pass-1: 112 lines; mine: ≥131 lines / 22 of 43 rules).** I counted whole rule blocks
including their `> h1`, `> h4`, `> h5`, `> h6` heads and the 14-of-15 never-matching pairs in the
consecutive-heading matrix (`Markdown.vue:149-155`); pass 1 appears to count a narrower set. Both land in
the same place: a general-purpose GitHub-markdown theme retained speculatively over a corpus that emits
only `h2 · h3 · p · ul · ol · li · code · hr · strong · em · Katex`. Live census for `lab.md`:
`h1 0 · h4/h5/h6 0 · table 0 · pre 0 · blockquote 0 · img 0 · dl 0 · .toc 0 · .callout 0 · .footnotes 0
· ul.contains-task-list 0`.

---

## 3. Negative proofs — mine, including one claim of my own that I withdraw

- **WITHDRAWN — mobile horizontal overflow.** An early run reported
  `about-card scrollWidth − clientWidth = 185 px` at 390 px. It **did not reproduce**
  (`chD-ovf2.mjs`: `cardScrollW 356 === cardClientW 356`). It was a pre-settle layout artefact. This
  strengthens pass-1 negative #2 rather than contradicting it.
- **KaTeX MathML is correctly clipped.** `.katex-mathml` computes `position: absolute;
  clip-path: inset(50%)`, rendered width **1 px**. The accessible duplicate does not participate in
  overflow. (This is what made the 185 px reading a false positive.)
- **No horizontal document overflow.** `documentElement.scrollWidth − clientWidth = 0` at 1440 px and
  390 px.
- **Contrast passes AA in both schemes.** h2 on plate **6.14 : 1** light / **8.34 : 1** dark; inline code
  on its chip **5.82 : 1** / **10.16 : 1**. The dark defect (D-1/N-corroboration) is *chromatic
  separation*, not legibility — `certifyAccentInk` meets its stated obligation; the obligation is the
  wrong one.
- **The design-system boundary is not bypassed.** `Alert` and `Skeleton` come from glass-ui 7.0.0 through
  the demo barrels — `demo/ui/alert/index.ts` documents the B.W2 conversion away from a local shadcn
  re-implementation; `demo/ui/skeleton/index.ts` is a one-line re-export. The defects (N-3) are *misuse*
  of the producer API, not a hand-rolled duplicate.
- **The `:deep()` reach is legitimate.** `Markdown.vue:104,198` reach into content this repo compiles
  itself, not a shadcn internal — the distinction `DESIGN.md §Idioms NOT used` draws. The scoped-selector
  explanation at lines 81-97 is accurate.
- **The φ rungs are the published rungs.** Measured `41.888 / 25.888 / 16 / 9.875 / 6.109 px` — exact
  `--phi-4…--phi-0` from `demo/styles/foundation.css:458-462`. No ad-hoc literals in the block. (Pass-1
  D-10's finding is about *collapsed* intervals, a different claim, which I did not test.)
- **Vue 3.5 idioms and `verbatimModuleSyntax` are clean.** `useTemplateRef` (50), reactive props
  destructure (44), `import type { DocModule }` (40), `import type { ShallowRef }`
  (`useMarkdownHighlighting.ts:1`).
- **HYPOTHESIS, not established — post-render mutation reflow.** `onUpdated` → `applyHighlighting`
  (`Markdown.vue:73-75`) inserts weight-600 `<mark>` runs *after* first paint, which must reflow the
  paragraphs receiving them. I did not capture the pre-mark frame. Labelled a hypothesis.
- **HYPOTHESIS, not established — unreachable KaTeX scroll boxes.** The four
  `> div.inline-block:has(> .katex-display)` boxes compute `overflow-x: auto` but are `tabIndex: -1` with
  no focusable child; if one ever overflows, a keyboard user cannot scroll it (WCAG 2.1.1). I could not
  produce an overflowing formula at 462 px or 332 px.

---

## 4. Visual truth — frames taken this pass

`chD/wk-desktop-light.png` · `chD/wk-desktop-dark.png` · `chD/wk-rtl.png` · `chD/m3-skeleton.png` ·
`chD/m3-error.png` · `chD/final-forced-colors.png` · `chD/final-mobile-about.png`

Three things the frames say that no number does:

1. **Dark kills the idea.** In `wk-desktop-dark.png`, "Historical Context", "Key Characteristics", the
   `L*`/`a*`/`b*` chips and every marked "Lab" are the same white as the prose. The entire
   `useMarkdownHighlighting.ts` mechanism — 93 lines of `TreeWalker` DOM mutation, nine marks per
   document — produces **no visible output**, and at weight 600 it is *less* emphatic than the
   weight-700 `<strong>` beside it.
2. **Four emphasis species fight in one paragraph.** In `wk-desktop-light.png`: black `**strong**` 700,
   crimson `mark.cs-name` 600, crimson 12 px mono `code`, italic `<em>`. In "Standardized by the CIE in
   1976, **Lab** was designed to be **perceptually uniform**—" the reader cannot tell which bold is the
   argument. This is an emphasis-inflation defect independent of the ink solver.
3. **The first heading is born inside the scroll fade.** `Markdown.vue:127-134` zeroes `margin-top` on
   `:first-child`, so the opening `h3` ("Attributes") always lands in the About card's fade band and
   renders as a washed ghost — visible in light, dark and RTL frames alike.

**Adjacent, not this component (flagged for their owners, no action from this seat):**
`AboutPane`/`PaneHeader` — "Detailed Guide" overprints "spaces, *Lab*" in every scrolled frame, two
typographic voices in one 40 px band. `ErrorBoundary.vue:23-29` — in the N-corroborated teardown repro
its `innerText` contains "This panel hit an unexpected error. Importing a module script failed", but
`chD/m3-error.png` paints only the "Try again" pill; the statement line and `CircleAlert` glyph do not
render.

---

## 5. Verdict

**DEFECTIVE.** Concurring with pass 1, on independently taken evidence, and adding the motion axis it
closed as sound.

**Strongest defect — unchanged from pass 1: D-1, the dark-mode accent collapse.** I reproduce its exact
numbers by a different route (ΔE 0.3153 → 0.0378; chroma 0.1887 → 0.0208). The component's entire reason
for existing as something more than a stylesheet is that the document speaks the live colour. In dark it
does not. A certified *contrast* floor with no *separation* floor guarantees legibility and nothing else.

**Strongest defect that is new to this pass — N-1.** Pass 1 proved motion sound by reading the cascade;
measurement says otherwise. Under `prefers-reduced-motion: reduce` every element in this subtree computes
a 100 ms five-property transition, not the guard's 0.01 ms — and in the normal register the same accent
ink cross-fades on headings (450 ms) while snapping on marks, code and rules (0 s). This is the seat
brief's motion question answered in the negative, and it is the reason a second pass was worth running.

---

## 6. Disposition

Pass-1's wave table (`challenge-D-design.pass-1.md` §"Proposed disposition") is sound and I adopt it
unchanged — one transposition (`W-MD-0`: the prose theme leaves the SFC for a glass-ui prose primitive,
`demo/styles/prose.css` interim) then narrow closes, each individually completable (L-1) on a bench that
already exists.

Two amendments this pass requires:

| wave | amendment | acceptance witness |
|---|---|---|
| **W-MD-3** (state coverage) | add the producer affordance: `<Alert tone="destructive" announce="assertive">`; delete the inert `surface`/`variant`; stop relying on `rounded-full` that the producer root overrides | rendered DOM carries no unknown attributes; the reachable failure state computes the `destructive` tone class and exposes an assertive announcement |
| **W-MD-5** *(new — motion)* | one curve for one ink: either every `--md-color-accent` site transitions on the same short effect rung, or none does. Declare the component's own reduced-motion resolution rather than assuming the global guard reaches it; find and name the rule that beats `animations.css:184-192`. | `chD-prm.mjs` re-run: under `reduce`, every accent site computes a duration ≤ 0.01 ms **or** an explicitly-named carve-out; under `no-preference`, `h2`, `mark`, `code`, `hr` report the **same** duration and property list |

`W-MD-5` is closeable by one session on the two arms of a single existing script. It does not touch the
transposition and can land before or after it.

**Relay note (standing edict).** `W-MD-0`'s prose primitive and any `Skeleton`/`Alert` API question are
glass-ui-level and belong in the active BH inbox relay, not in a demo-local invention.
