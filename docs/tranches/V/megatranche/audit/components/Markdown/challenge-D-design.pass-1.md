# CHALLENGE-D — `demo/scenes/about/markdown/Markdown.vue`

**Axis:** design (visual truth · state coverage · motion · design-system boundary · proportion/seat law)
**Subject:** `demo/scenes/about/markdown/Markdown.vue` (408 LoC — 76 script/template, **331 scoped CSS**)
**Repo/HEAD:** value.js · `tranche-u` · `c654824e`
**Date:** 2026-07-28

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model this seat was explicitly
spawned with. The declaration is present and matches; no inherited or undeclared seat.

## Verdict

**DEFECTIVE.** Not marginally. This component's headline design idea — a per-color certified accent ink
that gives the About document a chromatic heading voice — **does not exist in dark mode** (measured
ΔE_ok collapse of 8.3×, every rung at or below JND). Its designed error state is **structurally
unreachable**, and the real failure mode tears down the entire route. Its loading state renders as a
single 48px square because two of its three bones compute to **width 0**. Its 331-line stylesheet is a
generic GitHub-flavoured-markdown theme of which **112 lines (33.8%) can never match** the 11-document
corpus it exists to style. It bypasses the closed type matrix entirely, uses physical directional
properties throughout (RTL loses **every list marker and every ordinal**), and inflates its own
scrollbar by **63%**.

Sixteen findings below. Every one carries a measurement, a pasted number, or a screenshot.

## How the evidence was taken

Live dev server `http://localhost:9000`, Playwright **WebKit** (Safari truth, matching the tranche
matrix) except where forced-colors required Chromium. Probe scripts and raw JSON are checked in beside
this report under `evidence/`. Re-run any of them with `node evidence/probeN.mjs <arm>`.

The route is `/#/` — `VIEW_MAP.picker` seats About as the **right** pane
(`demo/shell/viewSchema.ts:105-113`), so this component ships on the home route. The document sampled
is `assets/docs/lab.md` (the default color space).

---

## Findings

### D-1 · BLOCKER · The accent-ink design does not exist in dark mode

`useMarkdownColors.ts:55-79` mints one certified accent and derives an h3/h4 rung by mixing it 61.8%
toward the body ink — 25 lines of commentary establishing "the register boundary: letterforms speak ONE
ink". Five CSS sites consume it (`Markdown.vue:163, 172, 187, 252, 312`).

Measured OKLab inks, same seed color, both schemes
(`evidence/M2-rhythm-inks-light.json`, `evidence/M3-rhythm-inks-dark.json`):

| pair | ΔE_ok LIGHT | ΔE_ok DARK | ratio |
|---|---|---|---|
| h2 vs prose | **0.3153** | **0.0378** | 8.3× |
| h3 vs prose | **0.1938** | **0.0230** | 8.4× |
| mark vs prose | **0.3153** | **0.0378** | 8.3× |
| h2 vs h3 | **0.1215** | **0.0149** | 8.2× |

Chroma of the accent: light `C = 0.1887` → dark `C = 0.0208` — a **9.1× collapse**. The dark accent is
`oklch(95.83% 0.021 9.83)`: near-white, essentially achromatic.

In dark mode `h2 vs h3` = **0.0149** and `h3 vs prose` = **0.0230**. The OKLab JND for small text is
~0.02. **The three-rung ink ladder is one perceptual ink in dark.** Look at
`evidence/E2-populated-desktop-dark.png`: "Historical Context" (h3), "Key Characteristics" (h2) and the
body prose are all plain white Fraunces/PJS. The only surviving heading signal is size.

This is not a contrast failure — `certifyAccentInk` is doing its job (it walks lightness until the WCAG
floor is met against a dark plate, and on the way there it has nowhere to go but toward white). It is a
**design failure**: the guard has no *separation* obligation, only a *legibility* obligation, so the
scheme that needs the accent most is the scheme where the accent is deleted. Light and dark are two
different designs wearing one name.

- **Evidence:** `evidence/M2-rhythm-inks-light.json` / `M3-rhythm-inks-dark.json`; `evidence/E2-populated-desktop-dark.png`
- **Reproduction:** `node evidence/probe4.mjs light` then `node evidence/probe4.mjs dark`; compare `deltaEok`.
- **Cure (gestalt):** the ink contract must be *two-sided* — a WCAG floor **and** a minimum perceptual
  separation from the body ink and from the adjacent rung, enforced in both schemes. `certifyAccentInk`
  gains a `minSeparation` obligation; when the floor walk would cross it, the rung changes *carrier*
  (weight, size, or a rule) rather than silently converging. The measurement above is the acceptance bench.

### D-2 · BLOCKER · The designed error state is unreachable; the real failure collapses the whole route

`Markdown.vue:58-71`:

```js
const loadDocs = async () => {
    isLoading.value = true;
    currentDoc.value = await module();   // no try/catch
    isLoading.value = false;
};
onMounted(async () => { await loadDocs(); });
```

If `module()` rejects, `isLoading.value = false` never runs, so `v-if="isLoading"` holds forever and the
`v-else` Alert branch (`Markdown.vue:19-31`, "Oh snap…") can never render. It is dead template. Worse:
the rejection escapes `onMounted` and propagates to `ErrorBoundary` (`demo/color-picker/App.vue:50-140`),
whose `onErrorCaptured` (`ErrorBoundary.vue:59`) wraps **the entire workspace**.

Reproduced (`node evidence/probe6.mjs failure` — abort `/assets/docs/*.md`):

```json
{ "aboutCardPresent": false, "skeletonsPresent": 0, "markdownWrapperPresent": false,
  "alertPresent": false, "alertText": null, "ohSnapPresent": false }
```

`evidence/E6-doc-load-failure-whole-route-collapse.png` shows the result: **the picker and the About card
are both gone**, replaced by a bare "Try again" button on the ambient field. One failed 3 KB markdown
chunk takes down the color picker.

Note also `AboutPane.vue:50-51` guards `v-if="activeMarkdownModule"`, so the Alert's own copy — "We
couldn't find the documentation for the selected color space" — describes a condition the parent already
prevents. The branch is doubly dead: unreachable by construction *and* semantically obsolete.

This violates PR-08 (`PROPORTION-AUDIT.md:52` — "Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE** … Persistent entity status/recovery") and §4.1 (`VISUAL-CONSTITUTION.md:83` —
"Selected, failed, pending, withdrawn and disabled states are never color-only. Role, accessible name,
state/value and associated error/status are explicit").

- **Evidence:** `evidence/M7-failure-state.json`; `evidence/E6-doc-load-failure-whole-route-collapse.png`
- **Reproduction:** `node evidence/probe6.mjs failure`
- **Cure:** the loader owns its own failure. Three explicit states (`loading | ready | failed`) driven by a
  `try/catch/finally`, with the failed state rendering **in place** — a named, retryable, `role="status"`
  region scoped to the document region, not an Alert and not an app-level unmount. Delete the stock Alert.

### D-3 · MAJOR · The loading state renders as one 48px square — two of three bones have width 0

`Markdown.vue:3-9` is a stock shadcn *avatar-and-two-lines* skeleton. Measured
(`node evidence/probe3.mjs skeleton`, `evidence/M4-skeleton-geometry.json`):

```json
[ { "cls": "skeleton h-12 w-12 rounded-full", "w": 48, "h": 48 },
  { "cls": "skeleton h-4 w-full",             "w": 0,  "h": 16 },
  { "cls": "skeleton h-4 w-full",             "w": 0,  "h": 16 } ]
```

The middle `<div class="space-y-2">` is a flex item with `width: auto`; its only children declare
`w-full` = 100% of that auto width — circular, resolves to **0**. `evidence/E1-loading-state-desktop-light.png`
confirms: under a 33px "Detailed Guide" heading, in a 462px column, the loading state is **one small
rounded square and nothing else**.

Three further defects in nine lines:

1. `surface="glass" variant="shimmer"` are **inert**. glass-ui's `Skeleton` declares exactly one prop —
   `class` — and forwards unknown attrs to the div
   (`node_modules/@mkbabb/glass-ui/dist/data-table-BygKg6ZA.js`: `__name:"Skeleton", props:{class:{…}}`).
   The rendered DOM carries them as literal attributes: `surface="glass" variant="shimmer"
   data-slot="skeleton" class="skeleton h-12 w-12 rounded-full"`. The template comment
   (`Markdown.vue:2`, "glass shimmer bones, not opaque pulse blocks") describes an intent the producer
   never implemented. Owner edict 4 — a variant that does not exist in glass-ui was invoked instead of
   being added there.
2. `rounded-full` **loses**: glass-ui's `.skeleton[data-v-cd03d0b0]{border-radius:var(--radius-input)}`
   out-specifies the utility. The "avatar" is a rounded rectangle — visible in E1.
3. The bone paints on `--muted` (glass-ui `.skeleton{background:var(--muted)}`) — the exact "parallel
   `--muted` species (which stepped OPPOSITE the well in dark)" that this file's own AB-3 comment
   (`Markdown.vue:229-232`) says was retired from the populated state. The loading ground and the
   populated ground step opposite ways in dark, by the file's own stated law.

A skeleton's job is to presage its content. This one presages an avatar and a two-line comment; the
content is a 4900px multi-section technical document with 13 headings, 7 lists and 4 math blocks.

- **Evidence:** `evidence/M4-skeleton-geometry.json`; `evidence/E1-loading-state-desktop-light.png`
- **Reproduction:** `node evidence/probe3.mjs skeleton` (delays `/assets/docs/**` by 9s)
- **Cure:** a document-shaped skeleton — heading bar, three prose bars, a list block — sized in the
  content's own measure (`inline-size` on a block container, not `w-full` inside an auto-width flex item),
  and a real glass-ui `Skeleton` variant if the glass treatment is wanted (added **in glass-ui**, per edict 4).

### D-4 · MAJOR · `content-visibility` inflates the scrollbar by 63%

`Markdown.vue:104-109` puts `content-visibility: auto; contain-intrinsic-size: auto 200px` on
**every direct child but the first**. Measured 33 of 34 children carry it
(`evidence/M1-measure-desktop-light.json`).

The 200px placeholder is wrong for essentially every element in the corpus. Measured real heights of the
33 blocks (`evidence/M1-measure-desktop-light.json` → `cvHeights`): four `<hr>` at **1px**, headings at
**28–36px**, most paragraphs/lists at **76–242px**. Consequence, measured
(`node evidence/probe2.mjs`):

```
scrollHeight before any scroll : 8023 px
scrollHeight after full scroll : 4908 px
```

**A 3115px lie — the scrollbar overstates the document by 63% on first paint** and shrinks as you read.
The thumb grows, the track re-scales, and the content under the pointer shifts. The stated purpose —
"Skip layout/paint for off-screen sections (KaTeX formulas, code blocks)" (`Markdown.vue:105`) — is
undercut by the corpus census: there are **zero code blocks** in all 11 documents (D-8), and the four
KaTeX blocks are `<div>` children that would be the only legitimate candidates.

The rule also leaks onto anything appended to `.markdown-body` at runtime: my first ch-measurement probe
returned 231ch because the injected span inherited `contain-intrinsic-size: auto 200px` and reported a
200px width. A selector this broad is a trap for any future DOM work in this subtree — including this
component's own `applyHighlighting`.

- **Evidence:** `evidence/M1-measure-desktop-light.json`; pasted numbers above
- **Reproduction:** `node evidence/probe2.mjs` → `scrollHeightBeforeAnyScroll` vs `scrollHeightAfterFullScroll`
- **Cure:** scope containment to the blocks that actually deserve it — the four KaTeX display containers —
  with an intrinsic size measured from those blocks, or delete it. A 4900px document does not need
  rendering deferral; the acceptance bench is `|scrollHeight_before − scrollHeight_after| / scrollHeight_after ≤ 0.01`.

### D-5 · MAJOR · The closed type matrix is bypassed wholesale

`VISUAL-CONSTITUTION.md:66-78` publishes a **closed** role→type matrix; `PROPORTION-AUDIT.md:78` repeats
it as card law 13. This component uses **none** of it. It carries a parallel Tailwind modular scale:
`text-base`, `leading-7`, `text-4xl`, `text-3xl`, `text-2xl`, `text-xl`, `text-lg`, `text-xs`, `text-sm`
(44 `@apply` directives across 57 selectors).

Measured against the tokens (`evidence/M1-measure-desktop-light.json`, `evidence/M6-mobile-390.json`):

| role | canon (§4) | token value | rendered | verdict |
|---|---|---|---|---|
| prose | `text-prose` → PJS | `--type-prose: clamp(1.125rem, 1.04rem + 0.28vw, 1.5rem)`, leading `1.618` | **16px / 28px (1.75)**, `text-wrap` unset | **≥2px under the floor at every arm**; no `text-wrap: pretty` |
| section heading | `text-heading` → **Plus Jakarta Sans**, `--type-heading: 1.618rem` = 25.9px | | **h2 = 30px Fraunces 600**, **h3 = 24px Fraunces 600** | wrong family *and* wrong size; no `text-wrap: balance` |
| code / value | `text-mono-small` → `--type-small: clamp(0.875rem, …, 1.25rem)` | ≥14px | **12px** | 2px under the floor at the floor arm |

Two consequences worth naming in design terms:

- **Family.** §4 reserves Fraunces for *display and identity*; headings and prose belong to Plus Jakarta
  Sans. Every one of the corpus's **138 headings** (53 `##` + 85 `###`, `assets/docs/*.md`) renders in
  Fraunces because `Markdown.vue:121` applies `font-display` to `h1..h6` unconditionally. The About body
  therefore speaks the identity voice throughout — the exact failure the file's own R.W3 comment
  (`Markdown.vue:11-14`) says was cured for `<p>` and then re-committed for headings.
- **Hierarchy step.** `AboutPane.vue:49` sets the section title `text-title` = **32.928px**; the markdown's
  own `h2` renders at **30px**. Step ratio **1.098** — a 10% difference between a section title and the
  heading nested inside it. The golden ladder's smallest step is √φ = 1.272. The document has, in effect,
  two title-weight rungs and no visible parent/child relation. `evidence/E3-populated-mobile-390-light.png`
  shows "Key Characteristics" at 30px in a 35.5ch column.
- Inline code at **12px** beside 16px prose is a cap-height mismatch you can see in E2/E3: the `L*` `a*`
  `b*` chips read as badges, not as code in a sentence.

- **Evidence:** `evidence/M1-measure-desktop-light.json`, `evidence/M6-mobile-390.json`, glass-ui `dist/styles/typography/semantic.css`
- **Reproduction:** `node evidence/probe.mjs desktop-light` → `bodyFont`, `h2`, `h3`, `inlineCode`, `guideHeading`
- **Cure:** delete the parallel scale. Prose → `text-prose`; `h2`/`h3` → `text-heading` / `text-subheading`;
  inline code → `text-mono-small`. Any rung the corpus needs that the matrix lacks is a **glass-ui** addition,
  not a local utility (edict 4).

### D-6 · MAJOR · RTL loses every list marker and every ordinal

`VISUAL-CONSTITUTION.md:150` — "chrome, navigation and layout | logical inline/block direction follows the
document." Every directional property in this file is **physical**: `padding-left` (`:208, 259, 304, 327`),
`border-l-4` (`:257, 346`), `rounded-r-2xl` (`:346`), `pl-0` (`:333, 393`), `mr-2` (`:339`).

Measured under `dir="rtl"` (`node evidence/probe3.mjs chromium`, `evidence/M5-rtl-forced-colors.json`):

```json
"ul": { "paddingLeft": "41.888px", "paddingRight": "0px", "direction": "rtl" },
"bulletGutterSide": "left",
"ulRect": { "l": 224, "r": 686 },  "liRect": { "l": 265.9, "r": 686 },
"katexPad": { "paddingLeft": "25.888px", "paddingRight": "0px" }
```

The `<li>` is flush with the **right** (inline-start) edge while the 41.9px gutter sits on the **left**.
`list-style-position: outside` therefore draws the marker outside the content box.
`evidence/E4-rtl-desktop-light.png` is decisive: compare it against `evidence/E2-populated-desktop-dark.png` —
**every `<ul>` bullet and every `<ol>` ordinal has disappeared.** "Perceptual uniformity: the founding goal"
and "Device independence: Lab values…" render with no `1.` / `2.` at all. §5.2 line 131 and §6.1 line 153
both require ordinal identity to be preserved; here it is silently deleted, and a 41.9px dead gutter is
left on the wrong side. The KaTeX display indent (`Markdown.vue:304`) is likewise on the wrong side.

Related, same section: `Markdown.vue` renders LTR technical strings (`L*`, `a*`, `oklch(…)`) inside RTL
prose with no LTR isolation, which §6.1 line 154 requires.

- **Evidence:** `evidence/M5-rtl-forced-colors.json`; `evidence/E4-rtl-desktop-light.png`
- **Reproduction:** `node evidence/probe3.mjs chromium`
- **Cure:** every physical property → logical (`padding-inline-start`, `border-inline-start`,
  `margin-inline`, `border-start-end-radius`). Inline code and the KaTeX runs get `unicode-bidi: isolate;
  direction: ltr`. Acceptance: bullet/ordinal count in RTL equals LTR; gutter side follows `direction`.

### D-7 · MAJOR · `mark.cs-name` is byte-identical to a hyperlink, and its forced-colors backplate is deliberately deleted

`Markdown.vue:185-189` styles the injected highlight as `background: transparent; color:
var(--md-color-accent); font-weight: 600`. Measured (`node evidence/probe6.mjs ink`):

```json
{ "markColor":       "oklch(0.470927 0.188343 9.834023)",
  "linkColorInBody": "oklch(0.470927 0.188343 9.834023)",
  "primaryVar":      "oklch(0.470927 0.188343 9.834023)",
  "markTextDecoration": "none", "markWeight": "600", "strongWeight": "700" }
```

The highlight ink is **exactly** `--primary`, i.e. exactly the `a { @apply text-primary }` ink
(`Markdown.vue:201`). At rest, a static non-clickable word is pixel-identical to a hyperlink. There are
**9 such marks in `lab.md` alone** (`evidence/M1-measure-desktop-light.json` → `markParents`). That is nine
false affordances per document. It is also *lighter* than the `<strong>` beside it (600 vs 700) while
carrying the more emphatic colour — an inverted emphasis hierarchy visible in E3: "…in 1976, **Lab** was
designed to be **perceptually uniform**…".

Three more failures of the same rule:

- **Forced colors.** Measured `mark.backgroundColor = rgba(255, 255, 0, 0)` — the UA `Mark` backplate is
  present but at **zero alpha**, because the author declared `background: transparent`. Colour is forced to
  `rgb(0,0,0)`, identical to h2, h3, code and prose. `evidence/E5-forced-colors-desktop.png`: the highlight
  is indistinguishable from body text. The single accessibility affordance `<mark>` carries is the thing this
  rule deletes.
- **Dark.** ΔE_ok(mark, prose) = **0.0378** (D-1). Invisible.
- **Headings.** The TreeWalker excludes `pre, code, mark, script, .katex`
  (`useMarkdownHighlighting.ts:29`) but not headings. Measured, 2 of the 9 marks land **inside `<h3>`**
  ("XYZ to Lab", "Lab to XYZ"), where the parent already carries the derived accent — a null highlight on an
  already-accented run.

Design question the mechanism never answers: what does marking every occurrence of the color-space name, in
a document *titled after* that color space, tell the reader? Nine marks, one word, zero information.

- **Evidence:** `evidence/M5-rtl-forced-colors.json`, `evidence/M1-measure-desktop-light.json`; `evidence/E5-forced-colors-desktop.png`
- **Reproduction:** `node evidence/probe6.mjs ink`; `node evidence/probe3.mjs chromium`
- **Cure:** either the highlight earns a non-colour carrier (a real `<mark>` backplate that survives forced
  colors, or a rule/underline distinct from the link decoration) and an ink that is not `--primary`; or —
  preferred, and KISS — **delete the mechanism**. 93 lines of runtime TreeWalker DOM surgery, an `onUpdated`
  hook that fires on every picker frame, and a `querySelector` per frame, to produce nine invisible-in-dark
  false links. Subtraction precedes explanation (`PROPORTION-AUDIT.md:71`).

### D-8 · MAJOR · 112 of 331 stylesheet lines can never match — this is a god module

Corpus census over **all 11 documents** (`assets/docs/*.md`):

```
$ grep -ho '<[a-zA-Z][a-zA-Z0-9]*' *.md | sort | uniq -c | sort -rn
  64 <Katex
  11 <script
$ for lvl in '# ' '## ' '### ' '#### ' '##### ' '###### '; do …
'# '     -> 0     '#### '   -> 0
'## '    -> 53    '##### '  -> 0
'### '   -> 85    '###### ' -> 0
fenced code: 0 · tables: 0 · blockquotes: 0 · task lists: 0
.toc: 0 · callouts: 0 · footnotes: 0 · <dl>: 0 · images: 0
```

The corpus emits exactly: `h2`, `h3`, `p`, `ul`, `ol`, `li`, `hr`, `code`, `strong`, `em`, `a` (3 total),
and `div.inline-block` (KaTeX). Dead rule blocks, by line range:

| lines | selector | corpus count |
|---|---|---|
| 157-159 | `> h1` | 0 |
| 170-174 | `> h4` | 0 |
| 176-182 | `> h5`, `> h6` | 0 |
| 143-146 | `> h5, > h6` | 0 |
| 149-153 | 15 consecutive-heading selectors | 1 live (`h2+h3`), **14 dead** |
| 234-238 | `pre` | 0 |
| 256-260 | `blockquote` | 0 |
| 263-276 | `table`, `th, td`, `th` | 0 |
| 280-283 | `img` | 0 |
| 317-329 | `dl`, `dt`, `dd` | 0 |
| 332-342 | `ul.contains-task-list` | 0 |
| 345-357 | `.callout` (+ `.warning`, `.danger`) | 0 |
| 360-378 | `.footnotes`, `.footnote-ref`, `.footnote-item` | 0 |
| 386-406 | `.toc`, `.toc ul`, `.toc li`, `.toc a` | 0 |

**112 declaration-bearing lines of 331 (33.8%)**, conservatively counted (comments excluded).

This is what the god-module edict names. `Markdown.vue` is four modules wearing one name:

1. an async document loader + 3-state machine (`:55-75`, 21 lines, one state unreachable);
2. a scheme-aware accent-ink consumer (5 `var(--md-color-*)` sites);
3. an imperative DOM-highlighter host (`onUpdated` → `applyHighlighting`);
4. **a 331-line generic GFM prose theme**, a third of it dead.

(4) is not a component concern at all. It is a *document-typography primitive*. Note also that the same
selector `.markdown-wrapper :deep(.markdown-body)` opens **twice** (`:104` and `:198`) with no semantic
distinction between the two blocks — the split is arbitrary, the tell of accretion rather than design.

There is also a structural fragility the file has already been bitten by once. Its own R.W4 comment
(`:85-91`) records that every content rule was silently dead because scoped selectors did not reach into
the compiled `.md` child; the cure was `:deep()`. But the repair re-installed the *same class* of coupling
via the `>` direct-child combinator: `> h1…h6` and `> p` are bound to markdown-it's exact current output
shape. If the plugin ever wraps content in an `<article>`, every heading and paragraph rule dies silently
again, and nothing in the suite would catch it. The `> h4/h5/h6/h1` rules are dead **right now** and no
gate noticed.

- **Evidence:** pasted census above; `assets/docs/*.md`; `Markdown.vue:78-408`
- **Reproduction:** the two `grep` pipelines above, run in `assets/docs/`
- **Cure (gestalt, architectural transposition):** extract the prose theme out of the SFC. Per edict 4 the
  right home is a **glass-ui document/prose primitive** consumed by class; if that producer seam is out of
  reach this tranche, `demo/styles/prose.css` is the interim home, with the corpus's actual element set and
  nothing else. `Markdown.vue` then becomes a ~60-line loader + slot with no `<style>` block at all. Every
  later repair (D-5, D-6, D-9, D-10) lands once, in the primitive, for every future document surface.

### D-9 · MAJOR · PR-14's divider subtraction is not merely unmet — this component styles the dividers

`PROPORTION-AUDIT.md:58` (PR-14) is unambiguous: About's "seven repeated dividers **7→0**".
`VISUAL-CONSTITUTION.md:218`: "section headings and interval own grouping without the current seven
repeated dividers." Card law 4 (`PROPORTION-AUDIT.md:69`): "A divider is retained only when grouping would
be ambiguous without it. Spacing plus material already expressing the same boundary makes the line
duplicative."

Measured: **`hrCount: 4`** inside `.markdown-body` for `lab.md`, and every one of the 11 documents carries
exactly 4 `---` rules (`grep -c '^---$' assets/docs/*.md` → 4 for all 11). This component contributes 4
dividers to a route whose canonical target is 0, and `Markdown.vue:309-314` **styles** them:

```css
hr { @apply border-t; margin-block: var(--phi-4); border-color: var(--md-color-h2, var(--border)); opacity: 0.3; }
```

Three defects in five lines:

1. The `φ⁴` interval on both sides of the rule (measured 41.88px above, 41.88px below) **already** expresses
   the boundary. By card law 4 the line is duplicative by the canon's own test.
2. `opacity: 0.3` applied to a **certified** ink discards the certification. Measured effective contrast
   against the plate: **1.78 : 1** (`evidence/M1-measure-desktop-light.json` → `hr-effective-vs-plate`), from a
   certified 6.58:1 ink. WCAG 1.4.11 non-text minimum is 3:1. A grouping mark that fails its own contrast
   floor is decoration.
3. In **forced colors** the border is forced to `CanvasText` but `opacity: 0.3` is author-controlled and
   survives: measured `{ "borderTopColor": "rgb(0, 0, 0)", "opacity": "0.3" }`
   (`evidence/M5-rtl-forced-colors.json`). Forced-colors users get a 30%-strength boundary — visible in
   `evidence/E5-forced-colors-desktop.png` as a pale grey hairline on white.

(For scope: the whole About card measured 11 divider-like nodes via the union selector
`hr, [role=separator], [data-orientation=horizontal]`; that count may double-count a `Separator` carrying
both attributes, so I assert only the direct measurement — **4 `<hr>` owned by this component**.)

- **Evidence:** `evidence/M1-measure-desktop-light.json` (`hrCount`, `hr`, `hr-effective-vs-plate`); `evidence/M5-rtl-forced-colors.json`
- **Reproduction:** `node evidence/probe2.mjs`; `node evidence/probe3.mjs chromium`
- **Cure:** `hr → 0` in source and in stylesheet. The section interval is the boundary. If a rule is ever
  re-earned, it is full-strength ink at ≥3:1 with no author opacity.

### D-10 · MAJOR · The declared φ ladder is not the rendered ladder — 20 of 33 intervals are collapsed margins

`OPTICAL-BENCH-COMPOSITIONS.md:100` (PR-35) is explicit for About: "No margin collapse …" and requires the
witness to "record … **collapsed-margin count `0`**."

Measured (`evidence/M2-rhythm-inks-light.json` → `rhythm`, `collapsedCount`): **20 collapsed pairs of 33**.
Representative rows:

| pair | declared `margin-bottom` | declared `margin-top` | sum if no collapse | **rendered gap** |
|---|---|---|---|---|
| `UL→H3` | 16px | 25.875px | 41.88 | **25.88** |
| `P→HR` | 16px | 41.875px | 57.88 | **41.88** |
| `HR→H2` | 41.875px | 41.875px | 83.75 | **41.88** |
| `OL→H3` | 16px | 25.875px | 41.88 | **25.88** |

The `> p { margin-bottom: var(--phi-2) }` rung (`Markdown.vue:194`) is **entirely swallowed** before every
heading and every rule — which is most of the document. `hr`'s `margin-block: φ⁴` and `h2`'s `margin-top: φ⁴`
are two declarations that render as one. The file's own comment (`:92-96`) claims "sectional rhythm comes
from one golden-ratio spacing ladder — margins, divider padding, indents all read φ rungs, never ad-hoc
steps." The rungs are declared twice and rendered once; **you cannot read the intended rhythm off the
stylesheet**, which is exactly what a proportion register needs to be auditable.

- **Evidence:** `evidence/M2-rhythm-inks-light.json` (full 33-row table)
- **Reproduction:** `node evidence/probe4.mjs light` → `collapsedCount`, `rhythm`
- **Cure:** one owner per interval. Either a `flow` container (`> * + * { margin-block-start: … }` / `gap` on
  a flex-column body) so each gap is declared exactly once, or block-start-only margins throughout.
  Acceptance: `collapsedCount === 0` and every rendered gap equals a declared φ rung.

### D-11 · MINOR · The `66ch` prose cap is absent; the rendered measure is 35.5ch on mobile

`VISUAL-CONSTITUTION.md:78` and `:218`, and `OPTICAL-BENCH-COMPOSITIONS.md:100`: "About prose has
`max-inline-size: 66ch`". Measured `maxInlineSize: "100%"` — the cap is not declared. `Markdown.vue:101`
declares the opposite: `@apply max-w-full`.

Rendered measures (correct `ch` probe, taken outside the `content-visibility` subtree):

| arm | body width | ch advance | **measure** |
|---|---|---|---|
| desktop 1440 | 462px | 9.342px | **49.5 ch** |
| desktop 2560 | 462px | 9.34px | **49.5 ch** |
| mobile 390 | 332px | 9.34px | **35.5 ch** |

**Honest reading:** the 66ch ceiling is not currently *exceeded* — the shell caps the pane, so compliance is
accidental rather than structural. The live defect is the other end: **35.5ch on mobile is below the
comfortable 45–75ch band**, and the `ul/ol` indent is a fixed physical `var(--phi-4)` = **41.888px**
(`Markdown.vue:208`) that does not scale, consuming **9.1% of the desktop column and 12.6% of the mobile
column**. Measured mobile list text therefore runs at ~31ch. `evidence/E3-populated-mobile-390-light.png`
shows the result: a deep left gutter and choppy 4–6-word lines.

- **Evidence:** `evidence/M1-measure-desktop-light.json`, `evidence/M6-mobile-390.json`
- **Reproduction:** `node evidence/probe2.mjs`; `node evidence/probe5.mjs light`
- **Cure:** declare the cap the canon names (`max-inline-size: 66ch` with the named graph/code exemptions) so
  compliance is structural, and make the list indent container-relative (`padding-inline-start: 1.5em` or a
  `ch`-based rung) so the measure survives the narrow arm.

### D-12 · MINOR · A sibling component's root is restyled from outside

`Katex.vue:2` renders `<div class="inline-block" ref="katexElement">` as its **root**.
`Markdown.vue:301-306` reaches across the boundary and overrides that root:

```css
> div.inline-block:has(> .katex-display) { display: block; @apply overflow-x-auto; padding: …; margin-block: …; }
```

This is a per-instance override of another component's root, which owner edict 5 forbids ("style at the
shadcn/glass root component level, never per-instance overrides"). It also falsifies `Katex.vue`'s own class
name — the element declares `inline-block` and renders `display: block`. The file's own `:deep()` rationale
(`Markdown.vue:88-92`) draws the legitimacy line at "CONTENT we compile ourselves, not a shadcn internal";
`Katex.vue` is neither — it is a sibling SFC with its own seat.

Corroborating measurement: `display: "block"`, `paddingLeft: "25.888px"`, `paddingRight: "0px"`,
`overflowX: "auto"`, `katexOverflowing: 0` at 1440 and at 390
(`evidence/M1-measure-desktop-light.json`, `evidence/M6-mobile-390.json`). The AB-1 overflow cure works; it
is simply installed in the wrong component.

- **Evidence:** `Katex.vue:2`; `Markdown.vue:301-306`; `evidence/M1-measure-desktop-light.json`
- **Cure:** `Katex.vue` owns its own display mode — a `displayMode` prop already exists (`Katex.vue:22`) and
  should drive `display: block` + `overflow-inline: auto` + the block indent at its own root. The consumer
  then styles nothing.

### D-13 · MINOR · Local `--phi-*` shadow-duplicates the producer's published rung

`demo/styles/foundation.css:462` declares `--phi-4: 2.618rem`. glass-ui publishes
`--space-phi-5: 2.618rem` (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/sizing.css`) — the **same
value**, and `OPTICAL-BENCH-COMPOSITIONS.md:100` names `--space-phi-5` specifically as About's major-section
interval. `Markdown.vue` is the heaviest consumer of the local family (**30 `var(--phi-*)` uses**).

Two names for one rung is a dual path (edict 2) and a design-system bypass (edict 4). It also means the
canon's PR-35 acceptance ("Major section interval: About/recovery `--space-phi-5`") cannot be verified by
reading this file.

- **Evidence:** `demo/styles/foundation.css:458-462`; glass-ui `dist/styles/tokens/sizing.css`; `grep -c "var(--phi-" Markdown.vue` → **30**
- **Cure:** consume the producer rungs; if glass-ui lacks `--space-phi-1…4`, they are a glass-ui addition (edict 4), not a local mint.

### D-14 · MINOR · A leaf re-imports 56 KB of global CSS the app root already imports

`Markdown.vue:37-38` side-effect-imports `styles/foundation.css` (46,269 B) and `styles/utils.css`
(10,122 B). `demo/color-picker/App.vue:199-200` already imports both, eagerly, at the app root. The
`@reference` directive at `Markdown.vue:79` is the correct and sufficient mechanism for `@apply`
resolution inside the scoped block; the two JS imports are pure duplication from a lazily-loaded leaf.

- **Evidence:** `grep -rn 'import ".*styles/foundation.css"' demo/` → exactly 2 sites; `wc -c` → 56,391 B
- **Cure:** delete both imports; keep `@reference`.

### D-15 · INFO · This component has no witness in the tranche's own visual matrix

The mega-tranche capture (`docs/tranches/V/megatranche/audit/visual/`) is 4 matrices × 15 routes = 60
captures. There is **no `about.png`** — About is not a route, it is the right pane of `/#/`, and the
`/#/` captures are above-the-fold only (`shots/safari-desktop-light/picker.png` shows the header and
`ColorNutritionLabel`; the "Detailed Guide" section is below the fold in all four matrices). On **mobile**
the `/#/` capture shows the picker, because `VIEW_MAP.picker` has no `defaultPaneIndex`, so
`mobilePaneIndex` resolves to `0` (`demo/shell/useViewManager.ts:60-66`) — this component is not rendered at
all in the mobile matrix. The screenshots in `evidence/` are, as far as I can tell, the **first rendered
witnesses** of this component in the tranche record.

Related: at a 720×450 frame the shell collapses to the single-pane arm and the About document is not
rendered at all (`node evidence/probe4.mjs zoom200` fails to find the "Detailed Guide" heading). **Labelled
a hypothesis, not a witness** — `VISUAL-CONSTITUTION.md:62` explicitly rejects a substituted CSS-width frame
as evidence for the zoom arm ("not a substituted CSS-width or responsive-emulation frame"), so this indicates
but does not prove a zoom defect. The mechanism belongs to the shell, not to this component; the component is
the casualty.

- **Evidence:** `ls docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-dark/` → no `about.png`;
  `evidence/M6-mobile-390.json` → `pre.hasMarkdown: false` before the pane toggle
- **Cure:** the state matrix must add an About-document state (scrolled to `Detailed Guide`) at all four
  arms; and — per `VISUAL-CONSTITUTION.md:58` — About is a **member route** (`/about`), not a companion pane,
  which is W18/W19's row, not this component's.

### D-16 · INFO · Type and reactivity hygiene

- `index.ts:3` — `export type DocModule = () => Promise<{ default: any }>`. The `any` erases the rendered
  component's type at the one place it is dynamically resolved (`Markdown.vue:66`).
- `Markdown.vue:55` — `ref<Awaited<ReturnType<DocModule>> | null>(null)` holds an ES module namespace object.
  Vue skips deep reactivity on non-extensible targets, so there is no observed bug, but `shallowRef` +
  `markRaw` is the idiom that declares the intent (the project memory names `shallowRef` explicitly).
- `verbatimModuleSyntax`: **clean** — `import type { DocModule }` (`:40`) and
  `import type { ShallowRef }` (`useMarkdownHighlighting.ts:1`) are both correct.
- Vue 3.5 idioms: **clean** — `useTemplateRef` (`:50`), reactive props destructure (`:44-48`).

---

## What is NOT wrong (the negative, proved)

Findings a design challenge should have produced and did not, each with the evidence that closes it:

1. **Motion / `prefers-reduced-motion` — SOUND.** `Markdown.vue:125` (`transition: color var(--duration-slow)`)
   and `:201, :405` (`transition-colors duration-fast`) are all neutralised by the global guard at
   `demo/styles/animations.css:184-193` (`transition-duration: 0.01ms !important` on `*`). No animated property
   forces layout — the only transitioned properties are `color` and `text-decoration`. Nothing animates
   geometry. Nothing was deleted from `animations.css` (edict 6 clean).
2. **Horizontal overflow — SOUND at every arm measured.** `docHorizontalOverflow: 0`,
   `cardHorizontalOverflow: 0` at 390 (`evidence/M6-mobile-390.json`); `katexOverflowing: 0` at 1440 and 390.
   The AB-1 `:has(> .katex-display)` repair works — wide formulas scroll inside their own box and do not clip
   at the card edge. `REPORT.md` records `horizontalOverflow — 0` across all 60 captures.
3. **Inline-code contrast — PASSES.** Certified accent on the well: **5.82 : 1**
   (`evidence/M1-measure-desktop-light.json` → `accent-on-well(inline code)`), above the 4.5:1 floor for the
   12px run. The h2 accent on the plate is **6.58 : 1**. The `certifyAccentInk` path is doing real work in
   light; D-1 is about *separation*, not legibility.
4. **The AB-3 well-tone cure holds in the populated state.** `pre`, `code`, `th`, `.callout`, `.toc` all
   consume `bg-well`; measured `codeBg = oklab(0.913299 …)` in light and `oklab(0.345296 …)` in dark — the
   tone steps the same direction as the plate in both schemes. (D-3.3 is the *loading* state, which never got
   the cure.)
5. **No console or page errors from this component.** The only console error on `/#/` is the dev-config
   `VITE_API_URL` warning; `REPORT.md` records `pageErrors — 0`, `consoleErrors — 1` (a WebGL context-loss on
   an unrelated route).
6. **No legacy shims, no dual code paths, no `demo/ui/` wrapper invention.** The component consumes
   `Alert`/`Skeleton` from the existing barrels; there is no back-compat branch anywhere in the 76 script
   lines. Edicts 2 and 3 are clean on the *script*; the contrivance is entirely in the stylesheet (D-8).

## Strongest defect

**D-1.** The component exists to give the About document a per-color chromatic heading voice, and in dark
mode it does not have one: every rung of the ink ladder falls to or below the OKLab JND, an 8.3× collapse
from light. It is not a bug in the ink solver — the solver meets its stated obligation. It is the design's
obligation that is wrong: a certified *contrast* floor with no *separation* floor guarantees legibility and
guarantees nothing else, so the scheme with the least chromatic headroom is the scheme where the idea
silently disappears. Everything below it — the dead theme, the collapsed margins, the physical directions —
is accretion; D-1 is the design being wrong at its centre.

## Proposed disposition — waves, each individually completable (L-1)

The gestalt cure is one transposition, then six narrow closes. Each wave is closeable on its own evidence by
one session, and each has a bench that already exists in `evidence/`.

| wave | scope | acceptance witness |
|---|---|---|
| **W-MD-0** *(transposition)* | Extract the prose theme out of the SFC into a document/prose primitive (glass-ui per edict 4; `demo/styles/prose.css` interim). `Markdown.vue` → ~60 lines, no `<style>`. Carry only the element set the corpus emits. | rendered-frame equality at 1440/390 × light/dark; style-block LoC 331→0; dead-rule count 112→0 |
| **W-MD-1** | Type jurisdiction: prose→`text-prose`, h2/h3→`text-heading`/`text-subheading`, code→`text-mono-small`. Delete the parallel Tailwind scale. | computed family/size/leading/weight strip at all four arms vs `VISUAL-CONSTITUTION.md:66-78`; title→h2 step ≥ √φ |
| **W-MD-2** | Ink contract gains a two-sided obligation (floor **and** separation) in `certifyAccentInk`. | `evidence/probe4.mjs` ΔE_ok table: `h2–prose ≥ 0.10` and `h2–h3 ≥ 0.05` in **both** schemes |
| **W-MD-3** | State coverage: `try/catch/finally` loader; delete the unreachable Alert; in-place named failure state; document-shaped skeleton with non-zero bones; drop the inert `surface`/`variant` attrs. | `evidence/probe6.mjs failure` renders an in-place named error and `aboutCardPresent === true`; `evidence/probe3.mjs skeleton` bone widths > 0 |
| **W-MD-4** | Logical direction + forced colors: physical→logical properties; LTR-isolate code runs; restore or replace the `<mark>` backplate — or delete the highlighter outright (preferred). | RTL bullet/ordinal count == LTR; gutter side follows `direction`; forced-colors delta ≠ 0 for whatever emphasis survives |
| **W-MD-5** | Scroll integrity + rhythm: scope or delete `content-visibility`; one owner per interval. | `|ΔscrollHeight| / scrollHeight ≤ 0.01`; `collapsedCount === 0` |
| **W-MD-6** | PR-14 close for this component: `hr` 4→0 in the corpus and the stylesheet; declare the `66ch` cap; container-relative list indent. | `hrCount === 0`; `max-inline-size` declared; mobile list measure ≥ 40ch |

W-MD-0 is the only wave that moves files; W-MD-1…6 then land **once**, in the primitive, for every future
document surface — which is the point of the transposition. None of them requires another wave to close.

---

*No source files were edited by this seat. All writes are confined to
`docs/tranches/V/megatranche/audit/components/Markdown/`.*
