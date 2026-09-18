# CHALLENGE-D — `demo/scenes/ConfigSliderPane.vue` — the design is flawed (PASS 4)

## Model receipt

I observe myself to be **Claude Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm.
The seat was spawned with an explicit Opus 5 declaration and the served tier agrees with it. The seat
is declared, not inherited. No Fable was used in this lane, and no subagent was spawned.

---

## 0. What this pass is

Three CHALLENGE-D reports already exist at HEAD and are preserved verbatim beside this one:

- `challenge-D-design.pass-1-2026-07-24-prior.md` — D-1…D-21.
- `challenge-D-design.pass-2-2026-07-28-prior.md` — N-1…N-4, C-1…C-3, and the `Configurator`
  transposition (§4 of that document).
- `challenge-D-design.pass-3-2026-07-28-prior.md` — P-1…P-11, K-1…K-3.

This is the **fourth independent pass** at the same repo state. Its contribution is deliberately
narrow: it goes at the states and layers the first three did not open. Concretely —

1. **Nine new findings (Q-1…Q-9).** The largest are: the pane's two actions ship on a **prop that
   does not exist in glass-ui 7** and therefore render at the producer's *default* emphasis; the
   buttons paint their fill on the content box and their ring on the border box, so every action verb
   in every shipped capture is a hard-edged slab inside an empty capsule; the **scrolled state — for
   which the entire 60-capture matrix has no witness at all** — violates a numbered proportion law
   and double-exposes 1.76 rows through a header that is never opaque; and the pane's seven visual
   section headings have **zero** semantic existence.
2. **Four corrections to pass 3 (R-1…R-4)**, one of which retires a headline number (the "21 px
   mobile action verbs" — measured 14 px in both engines, and 21 px is above the ceiling of the token
   involved).
3. **Four negative proofs** (§6) that close plausible-looking hypotheses so pass 5 does not spend
   probes on them.

Verdict unchanged and reinforced: **DEFECTIVE.**

| Field | Value |
|---|---|
| Subject | `demo/scenes/ConfigSliderPane.vue` (252 lines) |
| Consumers | `demo/scenes/blob/BlobPane.vue` (31 rows / 7 sections), `demo/scenes/atmosphere/AuroraPane.vue` (3 rows + 4 slot Selects) |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| Producer | `@mkbabb/glass-ui@^7.0.0` |
| Live probes (this pass) | `probes/pass-4/csp-d4-probe{1..10}.mjs`, run against `http://localhost:9000`. **Both engines**: Playwright `chromium` and `webkit`. Viewports 1440×900 and 390×844, DPR 1/2/3/4, `colorScheme` light **and** dark, routes `/#/blob` and `/#/atmosphere` |
| Frames produced | `probes/pass-4/csp-d4-wk-blob-light-scrolled600.png` (the scrolled state), `csp-d4-{wk,cr}390-btnbox.png` (exact-button-box captures), `csp-d4-{wk,cr}-*-bar.png` |
| Frames re-read | `shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,safari-mobile-dark,keyboard-focus-desktop,zoom-200-desktop}/{blob,atmosphere}.png` |

Nothing outside this directory was written. No source edits land from this seat.

---

## 1. New findings

### Q-1 · MAJOR · the two action verbs are configured with a prop glass-ui 7 does not have, and ship at the producer's **default** emphasis

`ConfigSliderPane.vue:165` and `:169`:

```vue
<Button variant="ghost" size="sm" @click="copyAsJson">
<Button variant="ghost" size="sm" @click="resetDefaults">
```

`Button` is re-exported straight from the producer — `demo/ui/button/index.ts` is one line,
`export { Button } from "@mkbabb/glass-ui";`. The producer's prop shape has **no `variant`**:

```ts
// node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4-20
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    /** Visual priority. It does not change the command's semantics. */
    emphasis?: ButtonEmphasis;
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean; loading?: boolean; type?: …; disabled?: …; class?: …;
}
```

`grep -rn "variant" node_modules/@mkbabb/glass-ui/dist/components/button/*.d.ts` → **0 hits.**
`variant="ghost"` therefore falls through `$attrs` and lands in the DOM as a stray non-standard HTML
attribute. Captured live (`probes/pass-4/csp-d4-probe10.mjs`, `/#/blob`, 1440×900):

```html
<button data-slot="button" data-emphasis="secondary" data-tone="neutral" data-size="sm"
        type="button"
        class="button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover"
        variant="ghost" style="--glass-btn-press-t: 0.0000; --flex-vel: 0.0000;">
```

`data-emphasis="secondary"` is the producer's *default* (`dist/button-Bu9F4uU6.js`:
`emphasis: { default: "secondary" }`), and the class recipe is gated on exactly that:

```js
g = () => p.tone === "neutral" && (p.emphasis === "primary" || p.emphasis === "secondary"),
x = () => e("button tap-squish focus-ring", g.value && "glass-wash glass-capsule", …)
```

So the author asked for a ghost (unfilled, quiet) verb and shipped a **filled secondary capsule**:
measured `background-color: oklab(0.721321 0.00495294 0.0108792 / 0.6)` at both viewports.

Three consequences, all design:

1. **Reset — a destructive, unconfirmed action with a 9-atom blast radius (pass-3 P-9) — renders at
   the same elevated emphasis as Copy JSON**, and both compete with the pane's protagonist.
   `VISUAL-CONSTITUTION.md §3` law 8: *"One pane may have one full-strength visual protagonist.
   Supporting fixtures do not compete with it through equal size or equal shadow."*
2. It is the **direct cause of Q-2**: `glass-wash glass-capsule` is applied *only* for
   primary/secondary. `emphasis="quiet"` or `"text"` removes the broken recipe from this site
   entirely — one prop, two findings.
3. **Owner edict 2 (no legacy code).** `variant="ghost"` is residue of the pre-7.0 / shadcn Button
   API that survived the W44 Glass-7 adoption. Repo-wide census:

```
$ grep -rn 'variant="ghost"' demo | wc -l      → 28   (25 Button sites + 3 WatercolorDot)
$ grep -rn 'emphasis="'      demo | wc -l      →  2   (PalettesPane.vue:113, AdminUsersPanel.vue:174)
```

The pane is one site of a 25-site family. It type-checks only because Vue permits attribute
fallthrough — there is no compiler arm on this class of drift.

### Q-2 · MAJOR · every action button renders as a hard-edged grey slab inside an empty capsule — visible in the shipped Safari matrix, both schemes, both viewports

Measured on the Copy JSON button (`probes/pass-4/csp-d4-probe7.mjs`, Chromium 390×844; identical in
WebKit):

```
background-color : oklab(0.721321 0.00495294 0.0108792 / 0.6)
background-clip  : content-box          ← the FILL paints the content box
padding          : 0px 12px
border-radius    : 9999px               ← the RING/specular paint the border box
::before  content "" · inset 0/0/0/0 · radius 9999px · mix-blend-mode plus-lighter
::after   content "" · grain SVG · radius 9999px · mix-blend-mode overlay
box  121.56 × 36   →  filled area  97.56 × 36
```

The fill is therefore inset **exactly 12 px — the padding — at each end**, with square-ish corners,
while the ring, the specular and the hover chrome are stadiums on the full box. Captured at DPR 4
clipped to the button's own `getBoundingClientRect()`, so the frame contains nothing but the button:

- `probes/pass-4/csp-d4-wk390-btnbox.png` (WebKit)
- `probes/pass-4/csp-d4-cr390-btnbox.png` (Chromium)

Both show the same object: a grey slab floating inside a pink capsule with an unfilled band at each
end. It is not an engine artifact and not a probe artifact — it is in the **shipped audit matrix**:
`shots/safari-mobile-light/atmosphere.png` (both verbs), `shots/safari-desktop-light/blob.png` and
`shots/keyboard-focus-desktop/blob.png` (both verbs, desktop). Nobody named it in three passes.

Scope: `14 of 27` buttons on `/#/blob` compute `background-clip: content-box`
(`probes/pass-4/csp-d4-probe8.mjs`), and **no CSS rule in any document stylesheet declares
`background-clip` at all** (`totalRulesWithBgClip: 0`) — the value arrives with the producer recipe,
not from demo authoring. Ownership is glass-ui; the observation site is this pane; the local cure is
Q-1's (`emphasis="quiet"|"text"` never applies `glass-wash`).

`PROPORTION-AUDIT.md §5` law 8 — *"Real rendered relation wins over token intent"* — is the governing
clause: the composition was reviewed as tokens and never as pixels.

### Q-3 · MAJOR · the scrolled state has **no witness in the matrix**, does not contract as a block, and double-exposes 1.76 rows through a header that is never opaque

`REPORT.json` contains no scroll concept whatsoever:

```
$ python3 -c "...; s=json.dumps(json.load(open('REPORT.json'))); [print(k, s.count(k)) for k in ['scroll','scrollTop','fullPage','clip']]"
scroll 0 · scrollTop 0 · fullPage 0 · clip 0
```

All 60 captures are at rest. The pane's console hides **73.4 %** of its content
(`scrollHeight 2611 / clientHeight 695`, `maxScroll 1916`), so the state the matrix never captured is
the state the component spends most of its life in. Produced here:
`probes/pass-4/csp-d4-wk-blob-light-scrolled600.png` (WebKit, 1440×900, `scrollTop = 600`, DPR 2).

Three defects are visible and measured in that one frame.

**(a) The header band does not contract — a direct violation of a numbered proportion law.**
`VISUAL-CONSTITUTION.md §3` law 5: *"A header contracts as a whole block. At rest it breathes; when
stuck, title, padding, and band all take the compact token step."* Measured
(`probes/pass-4/csp-d4-probe5.mjs`), both engines:

| | rest | `scrollTop = 600` |
|---|---:|---:|
| `.pane-header` block-size — Chromium | 107.39 px | **107.39 px** |
| `.pane-header` block-size — WebKit | 107.34 px | **107.34 px** |

Only the title's `transform: scale()` changes. Padding and band are untouched, so the collapse does
not reclaim a single pixel; it merely **empties** a band that keeps 107.4 px — **13.9 %** of the
772 px pane at 1440, **15.4 %** of the 651.4 px pane at 390 — to hold one 13–26 px word.

**(b) The veil never becomes opaque, so the rows underneath keep showing through.** The header's
material is `--glass-bg-resting` at α **0.65**, scrubbed `opacity 0.52 → 1`:

```
::before background : color(srgb 0.994 0.96 0.926 / 0.65)
::before opacity    : 0.52 at rest → 1.0 at scrollTop 600 (measured)
backdrop-filter     : blur(7px) saturate(1.4)
```

Transmission = `1 − 0.65·0.52` = **66.2 %** at rest and `1 − 0.65` = **35 %** at full veil. With a
61 px row pitch the band permanently overlays **107.4 / 61 = 1.76 rows**, and
`document.elementsFromPoint` at the band's inner edge returns, in order,
`pane-header → (row name line) → configurator-row → … → config-console` — i.e. a live row is under
the title by construction. In the frame, `Warp 0.350` and its full-width track are plainly legible
*through* the header, colliding with the word "Blob". PaneHeader's own source claims this cured:
`PaneHeader.vue:160-162` — *"the veil is near-full before any ink collision (O-11 gate 3, the F2
double-exposure cure)"*. Near-full is 35 % transparent, and this pane — the app's longest scroll — is
where that residue reads as a second, ghosted UI.

**(c) The stuck title lands at half its documented size in WebKit.** `PaneHeader.vue:130-142` asserts
a closed-form endpoint: *"stuck = heading/display-1 — the stuck title lands EXACTLY on the retired
heading rung … ≈0.618 (1/φ) at the ≥1440 cap"*. Measured at 1440:

| engine | `transform` scale at `scrollTop 600` | effective title px |
|---|---:|---:|
| Chromium | 0.618 | 25.89 px (= `--type-heading`, as designed) |
| **WebKit** | **0.3108** | **13.02 px** |

`tan(atan2(…))` does not evaluate to the length ratio in WebKit. The product's reference engine is
Safari; the shipped stuck title is **half** the ratified rung. Owner: PaneHeader (it has its own audit
directory); recorded here because this pane is the only surface with a 1916 px scroll range to
exhibit it, and because (a)+(b)+(c) compose into one broken state.

### Q-4 · MAJOR · seven section headings with zero semantic existence; the route has **no H1**

The pane's entire organising device — seven titled groups over 31 controls — is markup-inert.
Measured inside `.config-console` (`probes/pass-4/csp-d4-probe2.mjs`, `/#/blob`):

```
sectionTitles      : ["Geometry","Membrane","Color","Lit Glass","Pointer","Satellites","Tempo"]   (7)
sectionHeaderTag   : "DIV"          sectionTitleTag : "SPAN"
role="group"       : 0     fieldset : 0     aria-labelledby : 0     aria-describedby : 0
h1..h6 | [role=heading] inside the console : 0
ul/ol/li/[role=list] : 0
document headings  : ["H3:92.0%,88.8,20.0", "H3:Blob"]
```

The rendered section header, verbatim:

```html
<div class="config-section-header"><span class="config-section-title">Geometry</span></div>
```

So: a screen-reader user meets **31 flat sliders with no grouping and no heading**, in a region that
hides 73 % of itself. The visual hierarchy the whole component is built around is a paint job.

The route-level number is worse and corroborated app-wide. `VISUAL-CONSTITUTION.md §4.1`: *"Each
route has one H1 and exactly one stable main landmark, owned by the shell."* `REPORT.md`'s per-capture
table gives `h1 = 0` for **all 60 captures**, and on `/#/blob` the only two headings are an `<h3>`
holding the pane title and an `<h3>` holding the Picker's numeric readout `92.0%,88.8,20.0` — which
`PROPORTION-AUDIT.md §5` law 11 forbids in terms: *"A display-sized readout is not therefore a
document heading or live status."* This pane cannot fix the shell's missing H1, but it emits an `h3`
into an outline with no `h1`/`h2` above it and then declines to emit the seven headings it actually
draws.

Cure is producer-shaped, not local: `ConfiguratorLayer` (pass 2 §4) owns section identity with a
header trigger and `aria-expanded`/`aria-controls`; `FadingScroll`'s `ariaLabel`/`ariaLabelledby`
props "*name the scroll port and expose it as a region*" (`FadingScroll.vue.d.ts:8-12`).

### Q-5 · MAJOR · a decorative rail out-contrasts the heading that governs it — in **both** schemes; in dark the whole hierarchy collapses to 1.12 : 1

True-pixel measurement (each colour composited by the browser's own canvas-2D conversion onto
`.console-well`'s computed background, then WCAG relative luminance —
`probes/pass-4/csp-d4-probe2.mjs`):

| ink | role | light | dark |
|---|---|---:|---:|
| `.configurator-row label` | names the control | **13.52 : 1** | **9.28 : 1** |
| `.slider-track` (432 × 24 px × 31) | decoration — no value split | 5.82 : 1 | **8.30 : 1** |
| the live readout (11 px) | **the datum** | 5.82 : 1 | 8.30 : 1 |
| `.config-section-title` | **the governing heading** | **5.08 : 1** | **5.97 : 1** |
| `.config-section-header` border-bottom | the grouping rule | 1.24 : 1 | 1.29 : 1 |

Two facts neither prior pass has:

1. **The track out-contrasts the section heading in both schemes** — 5.82 vs 5.08 (×1.15) light,
   8.30 vs 5.97 (×1.39) dark. The single loudest painted area in the pane is the one element that
   carries no information, and it is louder than the heading that governs the group.
2. **The dark scheme flattens the hierarchy to near-parity.** label : track is **2.32×** in light and
   **1.12×** in dark. The `--ink-muted` polarity inversion (near-black fill → near-white fill) lifts
   the ornament to within 12 % of the control's own name. `VISUAL-CONSTITUTION.md §4.1`: *"Text,
   focus, boundaries and state meet their rendered contrast on the actual material tier; a token name
   is not evidence."* This is the rendered relation, and it is upside-down at the section rung.

This is the quantitative form of pass-1 D-4 / pass-3 P-6: the token is not merely mis-provenanced, it
lands **above** the heading rung on the perceptual ladder, and the dark arm is where it is worst.

### Q-6 · MINOR · the pane is not a scroll-confined inspector, though canon names it one twice

`VISUAL-CONSTITUTION.md §3.1` gives both consumer routes the same inspector clause — Atmosphere:
*"compact atom essentials plus **scroll-confined** advanced disclosure"*; Blob: same. §7 (line 214)
repeats it: *"advanced grouped disclosure, reset/compare and a **scroll-confined inspector**"*.
`docs/tranches/V/megatranche/design/layout-gestalt-worker-o.md:535` spells the recipe the producer
owes: `min-block-size:0; overflow-block:auto; overscroll-behavior-block:contain; scrollbar-gutter:stable`.

Measured on `.pane-scroll-fade` (`probes/pass-4/csp-d4-probe2.mjs`):

```
overscrollBehavior : "auto"      ← scroll chaining is live; flicking past the end scrolls the page
scrollbarGutter    : "auto"      ← the gutter is not reserved
scrollPaddingTop   : "auto"      ← nothing accounts for the 107.4 px sticky header
scrollbarWidth     : "thin"      ← the one arm that is set
maskImage          : "none"      ← the class is named `pane-scroll-fade`
role / aria-label  : null / null ← 73.4 % hidden, unnamed
```

Three of the four confinement arms are default. `overscroll-contain` exists as a live utility in the
producer sheet (`components.css`: `.overscroll-contain{overscroll-behavior:contain}`) and is not
reached for. The pane hand-rolls the port rather than composing `FadingScroll axis="y"`, which ships
the feather, the non-supporting-engine fallback and the region naming in one component.

### Q-7 · MINOR · four roles, one type rung — measured at both viewports

| element | canon role (`VISUAL-CONSTITUTION §4`) | assigned family | 1440 | 390 |
|---|---|---|---:|---:|
| `.config-section-title` | section heading → `text-heading`, Plus Jakarta Sans | **Fira Code** | 16.4 px | 14 px |
| `ConfiguratorRow` `<label>` | control/label → `text-small` | Plus Jakarta Sans ✓ | 16.4 px | 14 px |
| action verbs (`Copy JSON`, `Reset`) | control/label → `text-small` | Plus Jakarta Sans ✓ | 16.4 px | 14 px |
| the live readout | value → `text-mono-small` | Fira Code ✓, but class is `text-micro` | 11 px | 11 px |

`probes/pass-4/csp-d4-probe5.mjs`, `rootFontSize: 16px` in both engines. The governing heading, the
label it governs and the pane's two action verbs are **byte-identical in size**, and the only element
with a distinct size is the datum — smaller than everything, at **0.67×** its own label. §4 closes the
matrix across all eighteen compositions; this pane collapses four of its rows onto one rung and
mis-families a fifth.

### Q-8 · MINOR · the only pointer feedback in the console lands on a 12 × 24 px mark at the far end of a 432 px rail

Full census of `:hover` rules in the document that touch any slider or row selector
(`probes/pass-4/csp-d4-probe1.mjs` walks every reachable stylesheet):

```
.glass-slider:not([data-variant="spectrum"]):hover .slider-range
.glass-slider[data-variant="spectrum"]:hover .slider-thumb
```

Two rules, both producer. The pane uses `variant="spectrum"` (`:146`), so the first never applies —
the *range* rule is exactly the one the variant forfeits — and the surviving feedback re-paints the
**thumb**, whose measured rect is `12 × 24` in every matrix. There is no `.configurator-row:hover`
anywhere: hovering a 432 × 61 px row produces a change only inside 288 px² of it, possibly 400 px away
from the cursor. `PROPORTION-AUDIT.md §5` law 7 separates glyph size, target size and reservation; the
pane inherits a control whose *state* is expressed only on the smallest of the three.

### Q-9 · MINOR · a quarter of the pane is fixed chrome before a single control is drawn

Measured pane decomposition (`probes/pass-4/csp-d4-probe{3,4}.mjs`):

| | 1440 × 900 `/#/blob` | 390 × 844 `/#/atmosphere` |
|---|---:|---:|
| Card block-size | 772.0 px | 651.4 px |
| sticky `.pane-header` | 107.4 px (13.9 %) | 100.6 px (15.4 %) |
| `.config-action-bar` | 77.0 px (10.0 %) | 77.0 px (11.8 %) |
| **fixed chrome total** | **184.4 px — 23.9 %** | **177.6 px — 27.3 %** |
| usable console band | 587.6 px (76.1 %) | 473.8 px (72.7 %) |

Both chrome bands are permanent: the header never contracts (Q-3a) and the action bar is a
`flex: none` footer (`:245-251`). `VISUAL-CONSTITUTION §3` law 2 caps *empty secondary content* at
15 % of a stage; there is no clause licensing 24–27 % for two utility verbs and one word. The whole
band pays for a title that is already legible at 25.9 px and two commands that `ConfiguratorLayer`'s
`footer` slot would carry inside the existing chassis (pass 2 §4).

---

## 2. Corrections to pass 3

### R-1 · the 390 px action-bar figures are wrong, and P-8's "inverted" reading must be restated as "flat"

Pass 3's P-8 table records, at 390 × 844: `.config-action-bar` **93.7 px**, button font-size
**21 px**, "Copy JSON" rect **165.8 × 54**. Measured this pass in **both** engines at the same
viewport:

```
$ node probes/pass-4/csp-d4-probe4.mjs webkit  "#/atmosphere" 390 844 light …
   bar.h = 77   ·  button rect = 121.6 × 36 (Copy JSON) / 82.4 × 36 (Reset)  ·  font-size 14px
$ node probes/pass-4/csp-d4-probe5.mjs chromium "#/atmosphere" 390 844 light …
   buttonFontSizes = ["14px","14px"] · sectionTitleFontSize 14px · rowLabelFontSize 14px · root 16px
```

An internal-consistency argument settles it without trusting either probe: the verbs render
`--type-small`, whose ceiling is `1.25rem = 20 px`. **21 px is not reachable by that token at any
viewport**, so the figure cannot be a `--type-small` measurement.

The finding does not die, it changes shape. P-8 claims the verbs are *larger* than every heading
(1.5×). They are **exactly equal** to the section heading and the control label — 14 px at 390,
16.4 px at 1440. The defect is the absence of a rung, not an inversion (Q-7). The band's share is
11.8 %, not 12.9 % — still the largest single reservation in the pane after the header (Q-9).

### R-2 · the section-title contrast hypothesis is dead — 5.08 : 1 light / 5.97 : 1 dark on the well

`.config-section-title` uses raw `var(--muted-foreground)` (`:242`) — the exact token
`PaneHeader.vue:23-28` retired for its own caption because it *"measured 4.29:1 on the TRUE header
ground"*. That makes a contrast failure look inevitable here. It is not: on `.console-well` the same
token measures **5.08 : 1** (light, `rgb(112,89,66)` on `rgb(233,225,217)`) and **5.97 : 1** (dark,
`rgb(195,185,172)` on `rgb(66,55,47)`). AA is met at both schemes. The section title's defects are
family, rung and *relative* weight (Q-5, Q-7) — not legibility. Recorded so pass 5 does not file it.

### R-3 · scroll context is never lost — the hypothesis is disproved by the section pitch

A 2611 px column with 7 groups under a 107 px sticky header invites the finding "for most of the
scroll range you cannot tell which section you are in." Measured over 1001 sampled scroll offsets
with the occluded header band excluded from the visible port:

```
sectionOffsets (top, px in the scroll content):
  Geometry 128 · Membrane 519 · Color 1043 · Lit Glass 1434 · Pointer 1958 · Satellites 2282 · Tempo 2471
maxScroll 1916 · effective port 695 − 107.4 = 587.6
largest inter-section gap = 1043 − 519 = 524  <  587.6
sectionCtxLossPct = 0.0
```

At **every** scroll offset at least one section header is visible. Sticky section headers are not
owed. (This is a property of the current `BlobPane` section pitch, not a guarantee: a section longer
than 588 px would break it. It is a negative proof at HEAD, not an invariant.)

### R-4 · keyboard focus never lands under the sticky header

`scroll-padding-top: auto` on the scroller and `scroll-margin-top: 0px` on every row make
focus-occlusion (WCAG 2.2 SC 2.4.11) look like a certainty. Measured by focusing thumbs 0, 4, 8, 12,
20 and 30 in sequence and comparing rects (`probes/pass-4/csp-d4-probe3.mjs`, WebKit):

```
idx  0 Body Radius  thumbTop 306.2  headerBottom 211.3  fullyUnderHeader false  partlyUnderHeader false
idx  4 Eccentricity 574.0                              false / false
idx  8 Noise Freq   438.7  (scrollTop 458)             false / false
idx 12 Hue Range    761.4  (scrollTop 458)             false / false
idx 20 Rim Power    438.8  (scrollTop 1371)            false / false
idx 30 Speed        734.1  (scrollTop 1910)            false / false
```

The engines' own `scrollIntoView` heuristic keeps the focused row clear of the sticky element in all
six positions. Not a defect at HEAD. (`scroll-padding-top` is still owed as *insurance* under Q-6's
confinement recipe, but it must be filed as hygiene, not as an occlusion finding.)

---

## 3. Independent confirmations (compact — not re-litigated)

| Prior finding | This pass' measurement |
|---|---|
| pass-1 D-2 · absent below `lg`, and at 200 % zoom | `shots/zoom-200-desktop/blob.png` re-read: the pane is entirely absent and a `Picker \| Blob` dock toggle appears in its place with *Picker* active. WCAG 1.4.4 |
| pass-1 D-3 / D-14 · no value fill, chromatic material on non-chromatic domains | one painted layer inside `.glass-slider`; `.slider-range` absent; and Q-8 supplies the second cost — `variant="spectrum"` also forfeits the producer's `:hover` range rule |
| pass-1 D-12 · the inert rhythm clamp | computed `min-block-size: 35.84px` (`7cqi` of the 512 px pane container) against a measured row height of **61.0 px**. The clamp binds on 0 of 31 rows |
| pass-1 D-17 / pass-2 §4 · the fade that does not fade | `maskImage: "none"`, `scrollHeight 2611 / clientHeight 695` → **73.4 %** hidden. `probes/pass-4/csp-d4-wk-blob-light-scrolled600.png` shows the top edge cut mid-slider with no feather |
| pass-1 D-6 · repeated boundaries | 7 × `.config-section-header` border-bottom at **1.24 : 1** (light) / **1.29 : 1** (dark) over a well that already supplies a tone step, a hairline and a 20 px interval. A rule at 1.24 : 1 is not a boundary; it is a smudge. `PROPORTION-AUDIT §5` law 4 |
| pass-3 P-5 · the focus indicator | `shots/keyboard-focus-desktop/blob.png` re-read: focus sits on the *Sat Radius* thumb and is, at 1:1, essentially invisible against the track — the visual confirmation of P-5's 1.17 : 1 |
| pass-2 N-3 / pass-3 K-1 · preview vs form | unchanged and not re-measured; K-1's settled protocol stands |

---

## 4. Additions to the transposition map (pass 2 §4, pass 3 §4)

Pass 2's table is the disposition of record and is correct. Two rows are missing, and one existing row
gains a second arm.

| Finding | Hand-rolled / mis-configured here | Ships in glass-ui 7.0.0 |
|---|---|---|
| **Q-1 + Q-2** · dead prop → default emphasis → the slab-in-a-capsule | `<Button variant="ghost" size="sm">` `:165`, `:169` | **`emphasis="quiet"` or `"text"`.** The producer gates `glass-wash glass-capsule` on `emphasis ∈ {primary, secondary}`, so choosing the intended rung both restores the ghost *and* removes the content-box fill from this site. The residual producer defect (fill on the content box, ring on the border box, for every primary/secondary button) rides the **O-16 glass relay** as a new arm |
| **Q-4** · 7 headings with no semantics, an unnamed 73 %-hidden region | `<div class="config-section-header"><span>` `:128-130`; bare `.pane-scroll-fade` `:106` | **`ConfiguratorLayer`** (`label`, `default-open`, `aria-expanded`/`aria-controls`) for section identity — already in pass 2's table for D-9, but its **grouping/heading** arm was never named; and **`FadingScroll`**'s `ariaLabel` / `ariaLabelledby`, documented as *"Name the scroll port and expose it as a region"* |
| **Q-6** · unconfined scroll port | `overscroll-behavior: auto`, `scrollbar-gutter: auto` `:106` | `FadingScroll axis="y"` under `Configurator scrollMode="auto"`, plus the producer arm worker-O's G-2 already asks for (`overscroll-behavior-block: contain`, `scrollbar-gutter: stable`). The utility `.overscroll-contain` already ships in `components.css` |
| **Q-3** · the scrolled header state | `PaneHeader` inside a 1916 px scroll range | **PaneHeader-owned, not this pane's to fix.** Three arms for that seat: (i) §3 law 5 — contract the *band*, not only the title's transform; (ii) an opaque stuck state, or a scroll-padding that stops content entering a 35 %-transparent band; (iii) the `tan(atan2())` identity is engine-divergent — replace with the ratio it is standing in for |

Every row lands at the producer or at a prop, none in `demo/scenes/` — consistent with edicts 4 and 5
and with pass 2's conclusion that the correct move is subtraction.

---

## 5. Finding index (this pass)

| ID | Severity | One line |
|---|---|---|
| **Q-1** | MAJOR | `variant="ghost"` is not a `ButtonProps` member in glass-ui 7; the DOM carries `variant="ghost"` as a stray attribute and `data-emphasis="secondary"` — both verbs ship at the producer default; 25 sites app-wide vs 2 using `emphasis` (edict 2) |
| **Q-2** | MAJOR | fill on the content box (`background-clip: content-box`, `padding: 0 12px`), ring/specular on the border box (`radius 9999px`) → a **97.56 × 36** slab inside a **121.56 × 36** capsule; exact-box captures in both engines; visible in the shipped Safari matrix; 14/27 buttons on `/#/blob` share the clip |
| **Q-3** | MAJOR | the scrolled state has **no witness in the 60-capture matrix**; the header band does **not** contract (107.4 → 107.4 px, both engines) against `§3` law 5; the veil transmits **35 %** at full opacity so **1.76 rows** ghost through it; WebKit's stuck title is **13.02 px** vs the documented 25.89 px |
| **Q-4** | MAJOR | 7 section headings = `<span>` in `<div>`; `role=group` 0 · `fieldset` 0 · `aria-labelledby` 0 · headings-in-console 0; the route's only headings are two `<h3>`s, one of them a numeric readout; `h1 = 0` on all 60 captures against `§4.1` |
| **Q-5** | MAJOR | the decorative track out-contrasts the section heading in both schemes (×1.15 light, ×1.39 dark); label : track collapses from **2.32×** to **1.12×** in dark |
| **Q-6** | MINOR | `overscroll-behavior: auto`, `scrollbar-gutter: auto`, `scroll-padding-top: auto`, no region name — on a port hiding 73.4 %, where canon says "scroll-confined inspector" twice |
| **Q-7** | MINOR | section heading = control label = action verb = **16.4 px @1440 / 14 px @390**; the datum alone differs, at 11 px (0.67× its label); mono owns a heading against `§4`'s closed matrix |
| **Q-8** | MINOR | the console's only `:hover` rule repaints a **12 × 24** thumb; `spectrum` forfeits the `.slider-range` hover rule; no row-level hover exists |
| **Q-9** | MINOR | fixed chrome = **23.9 %** of the pane at 1440, **27.3 %** at 390, for one word and two utility verbs |
| **R-1** | correction | pass-3 P-8's mobile numbers (93.7 px / 21 px / 165.8 × 54) measure **77 px / 14 px / 121.6 × 36** in both engines; 21 px exceeds `--type-small`'s own 20 px ceiling; P-8 restates as "one rung for four roles", not "inverted" |
| **R-2** | correction | `.config-section-title` on the well measures **5.08 : 1** light / **5.97 : 1** dark — AA met; the "`--muted-foreground` was retired for failing" inference does not transfer from the header ground to the well |
| **R-3** | negative proof | section-context loss = **0.0 %** over 1001 sampled offsets (largest inter-section gap 524 px < 587.6 px port) |
| **R-4** | negative proof | focus never lands under the sticky header at any of 6 sampled positions |

---

## 6. What is genuinely sound

With positive evidence, so pass 5 spends its probes elsewhere.

- **Contrast of the two text inks on the well is not a defect.** Row label **13.52 : 1** / **9.28 : 1**;
  section title **5.08 : 1** / **5.97 : 1**; readout **5.82 : 1** / **8.30 : 1**. Every text element
  clears AA in both schemes. The pane's ink defect is *ordering*, not legibility (Q-5).
- **Section context is always available while scrolling** (R-3) and **keyboard focus is never
  occluded** (R-4). Both were live hypotheses; both are disproved at HEAD.
- **`scrollbar-thin` is a real utility, not a dead class.** `components.css` ships
  `.scrollbar-thin{scrollbar-width:thin}` and the scroller computes `scrollbar-width: "thin"`. The
  U-tranche rider that claimed it (`docs/tranches/U/audit/w-visual-close-artefacts.md:92`) holds.
- **`Card tier="resting"`, `Slider variant="spectrum"`, `GlassDock :always-expanded :fit-content` are
  all real producer props** — `SURFACE_TIERS = ["wash","quiet","resting","floating","overlay"]`,
  `SliderProps.variant`, `DockProps.fitContent` / `.alwaysExpanded`. Q-1 is a single-prop defect, not
  a general "the pane invents props" pattern.
- **The RTL axis semantics and the pane's own RTL-clean CSS** stand as pass-2 C-3 / pass-3 §6 found
  them; nothing this pass contradicts them.
- **Owner edicts 1, 6, 7 and 8 remain clean** on the re-read: no god module fed, no motion deleted
  (the pane authors none), reactive props destructure at `:41`, and every type-only import across the
  three files is `import type`.
- **Runtime health.** `REPORT.md`: 0 page errors, 0 horizontal overflow, 0 blank captures, 0 missing
  dark-class rows across all four Safari matrices on both routes.
- **The generic merge (Ae-6) was the right instinct**, as pass 3 concluded. Four passes have now
  produced 36 + 9 findings against the *substrate* — a demo-local `Card` + well + hand-rolled scroll
  port + dock-as-footer — and none against the decision to share one composition between AuroraPane
  and BlobPane.
