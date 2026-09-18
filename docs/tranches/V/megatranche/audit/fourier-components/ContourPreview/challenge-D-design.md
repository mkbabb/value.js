claude-opus-5[1m] (served model id)

# CHALLENGE — `ContourPreview.vue` · axis **D** (DESIGN)

**Status.** This file **supersedes an earlier D-axis draft at this path** (19 defects / 2 BLOCKER /
5 superlatives). That draft was read whole and adjudicated row by row: **15 of its 19 findings are
carried, 2 are re-graded, 2 are refuted, and 1 of its four self-killed candidates is itself
refuted** — see **§6**. Nine findings are new to this lane. Where a claim is the earlier draft's, it
is attributed inline as *[prior]*; where it is the C-lane's, as *[C-D-n]*.

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourPreview.vue`
— **62 lines** (confirms `lane-frontend.md:98`).
**Axis.** Spacing / margins / proportion (Aristotelian) · glass-ui conformance **under the old pin**
(`^4.0.0` installed, producer at 7.0.0) with an explicit F.W1 break-or-improve ledger (§7) ·
typography · motion incl. `prefers-reduced-motion` · a11y (roles, aria, focus, token-decidable
contrast) · prose · state coverage (empty / error / loading).
**Mode.** Static + source-derived, read-only. No browser tooling (L: probe parsimony). Live-only
claims marked **UNPROVEN-NEEDS-LIVE (SS-13)**. No product source touched in any repo; this file is
the lane's only write.
**Substrate.** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` — the coordinate
`lane-fourier-r3-r6.md` **R4-9 / X-4** certifies byte-identical to the F.W0 opening tree. glass-ui
producer read at HEAD `4ef35e8d4ab061f8c0a446a41cc722c6df1f4c5f`, `package.json.version = 7.0.0`.

| read whole (read-only) | why |
|---|---|
| the subject | — |
| `web/src/components/ui/CollapsibleSection.vue` (72) | the only component import; 7 of this lane's findings enter through it |
| `web/src/lib/contourEditing.ts` (222) | `Point2D`, `closedSplinePath` |
| `web/src/components/ui/PathPreview.vue` (69) · `web/src/components/decorative/FourierMorphSvg.vue` (39) | the two in-tree primitives this file re-derived |
| `web/src/style.css` | the `cartoon-card` shim · the root-font breakpoint · the `--viz-amber` carry · the D.W4.d focus-ring block |
| `web/src/components/visualization/VisualizationView.vue` | the sole caller: render gates, column track, aside stack |
| `web/src/components/visualization/composables/useViewState.ts` | **the localStorage edit-mode restore — decides §6 C-3** |
| `web/src/components/visualization/ContourEditorCanvas.vue` · `ContourSettings.vue` (head+template) · `web/src/stores/workspace.ts` · `web/package.json` | the same contour, the stack sibling, the published state flags, the pins |
| installed `@mkbabb/glass-ui@4.0.0` dist | `styles/{cards,configurator,animations}.css`, `styles/utilities/{base,a11y-overrides}.css`, `styles/typography/{utilities,scale}.css`, `styles/theme/bridges.css`, `styles/tokens/{color-radius,dark-arm,light-dark,scheme-motion,offsets-sizing,shadow}.css`, `components/ui/card/Card.vue.d.ts`, `components/custom/configurator/ConfiguratorLayer.vue.d.ts`, `components/ui/index.d.ts`, `CollapsibleContent-C_s6fG7r.js` |
| producer glass-ui **7.0.0** src | `components/{collapsible,configurator,card,skeleton}/*`, `styles/{animations.css,index.css,typography/utilities.css,utilities/btn.css,tokens/shadow.css}`, `components/card/styles.css`, `package.json` |
| `reka-ui` dist | `Collapsible/CollapsibleContent.js`, `Collapsible/CollapsibleTrigger.js` |

**Corpus folded, not re-invented.** `lane-frontend.md` (`:98` roster · `:213-226` import census ·
`:293` this closure's root-barrel line · `:368` the 3 local wrappers · `:413-421` shadow ledger ·
`:444` PathPreview *"genuinely bespoke — no flag"* · `:458-466` the ADDED-14 / REMOVED-21 export
diff · `:565` the 12 SVG surfaces · `§9` items 1/5/8) · `CENSUS-2026-08-03.md` (`:102-105` +
`:186` the break surface · `§3a` · `§4` the F.W0–W10 sketch · `:256-258` the no-test-net risk) ·
the adjudicated intake `lane-fourier-r3-r6.md` (38/52 TRUE) · the sibling lanes
`ContourPreview/challenge-C-consumption.md` and `ContourEditorCanvas/challenge-D-design.md`.

**Posture.** Assumed defective until the tree proved otherwise. **Five** claims — four of mine, one
of the earlier draft's — died on their own falsifiers and are recorded in §5/§6 rather than deleted.

| | count |
|---|---:|
| **defects** | **26** |
| BLOCKER | **1** |
| MAJOR | 9 |
| MINOR | 11 |
| INFO | 5 |
| **superlatives** | **7** |

---

## §0 — The verdict in one paragraph

The geometry is careful, the box is unusually clean, and almost everything holding them is a
hand-rolled restatement of something the design system already ships **at the pin that is installed
today**. The component draws the editor's only left-panel rendering of the contour at **1.660 : 1**
against its own card in light mode (§1). It mounts a reka-backed `Collapsible` **inside
`<Configurator>`** — the exact composition the *installed* `ConfiguratorLayer` docblock names as the
F-ε-3 non-convergent watcher loop — while the sanctioned primitive is imported by its own stack
sibling three lines later (M-2). Its card re-creates `<Card surface="cartoon">`, which ships at 4.0.0
*and* 7.0.0, so half the upstream carry the corpus books for it is asking the producer to re-ship an
API it already shipped (M-3). Its title renders in the UA's generic serif because
`--font-serif-math` is defined in **none** of the three trees (M-4). It frames a shape with X-derived
padding on both axes (M-6), at a hardcoded 160 px inside a 320–440 px column (M-7), with no empty,
loading or error arm over a store that publishes all three (M-8), and with no accessible name on the
graphic that is its entire payload (M-1). Five of its nine MAJORs are curable **before** F.W1, at the
installed pin, with no producer ask and no coordination letter.

---

## §1 — BLOCKER

### B-1 · The contour stroke fails SC 1.4.11 in the light arm at **1.660 : 1** — while the repo's own remediated token measures **4.625 : 1** *[prior B-2 · C-D-1 · sibling-lane B-1]*

**Provenance.** `ContourPreview.vue:45` `stroke="hsl(40 90% 55% / 0.85)"` — a theme-invariant literal
— composited over the card background the shim binds explicitly (`style.css:107-111`
`@utility cartoon-card { @apply cartoon-surface; border-color: var(--border); background: var(--card) }`),
where `--card` is arm-dependent: `hsl(36 48% 97%)` light
(`glass-ui@4.0.0/dist/styles/tokens/color-radius.css:72`) / `hsl(24 8% 16%)` dark (`tokens/dark-arm.css:64`).

Recomputed independently for this lane (WCAG 2.x relative luminance, alpha composited in linear sRGB):

| stroke | vs light `--card` | vs dark `--card` |
|---|---:|---:|
| `hsl(40 90% 55%)` opaque | 1.810 : 1 | — |
| `hsl(40 90% 55% / 0.85)` **as shipped** | **1.660 : 1** — FAIL, 1.81× short | 5.922 : 1 |
| `var(--viz-amber)` light, post-D.W4.d `hsl(35 76% 35%)` | **4.625 : 1** | — |
| `var(--viz-amber)` dark `hsl(37 73% 67%)` | — | 8.067 : 1 |

**Method authentication.** `style.css:113-118` publishes the repo's own figure for the cured token —
*"darkens to `hsl(35 76% 35%)` ≈ 4.6:1"*. My arithmetic returns **4.625**; the earlier draft at this
path returned **4.63**; the C lane returned **4.625**. Three independent computations, same method,
same number.

Three design consequences of one cause (counted once, per the R3-7a/b/c precedent):

**(a) It is the content.** `VisualizationView.vue:257` mounts this as the only contour rendering in
the editor's aside; on the no-image path (`ContourSettings` is behind `v-if="hasImage"`, `:260`) it is
the *only* thing in the panel. SC 1.4.11's bar for graphical objects required to understand content
is 3 : 1.

**(b) The 0.85 alpha spends 8.3 % of a ratio the graphic does not have** — 1.810 → 1.660 — and buys
nothing: the stroke sits on a flat card, not over imagery. Contrast the editor, where
`opacity: 0.28` on the image underlay (`ContourEditorCanvas.vue:253`) is doing real work.

**(c) Theme-blind by construction.** The design system gives amber two values on purpose
(`style.css:120` light / `:125` dark); this literal has one, so the dark arm is the only one that has
ever been legible. The light arm was never checked, and light is user-reachable
(`layout/DarkModeToggle.vue` → `useGlobalDark` from `@mkbabb/glass-ui/dark`).

**Falsifier.** Recompute: sRGB `hsl(40 90% 55%)` → `(0.955, 0.685, 0.145)`; composite at α 0.85 over
light `--card` `(0.984, 0.973, 0.956)`; luminances `0.5475` vs `0.9421`; ratio
`(0.9421+0.05)/(0.5475+0.05) = 1.660`. Or show the preview on a surface other than `--card` — `:33`
is `cartoon-card` and `style.css:110` sets it. Or argue the graphic is decorative — see M-1's
reachability argument. **UNPROVEN-NEEDS-LIVE (SS-13):** the computed runtime `--card`, and perceived
visibility. **Cure:** `stroke="var(--viz-amber)"` (the token exists at both pins —
`color-radius.css:246,266` `--viz-amber: var(--section-color-5)`), alpha via `stroke-opacity`.

**Cross-axis reconciliation, stated because the grades differ.** `challenge-C-consumption.md` **D-1**
grades this MAJOR — correct on the *consumption* axis, where the finding is "a literal outside the
F.W2 migration surface". `ContourEditorCanvas/challenge-D-design.md` **B-1** grades the identical
failure class (1.43 : 1, same literal, same cascade) **BLOCKER**. On the design axis this is an
accessibility-conformance failure on the sole content object; I align with the sibling lane and with
the earlier draft at this path. **BLOCKER.**

---

## §2 — MAJOR

### M-1 · The component's entire informational payload is an unnamed graphic — no role, no name, no `<title>`, and no decision in the other direction either *[prior B-1, re-graded]*

**Provenance.** `ContourPreview.vue:36-50`. No `role="img"`, no `aria-label`, no `<title>`/`<desc>`,
no `aria-labelledby`, **and no `aria-hidden="true"`** — so nothing on the path from
`CollapsibleSection`'s default slot down to `<path>` declares what this is, in either direction. A
screen-reader user who expands *"Preview — live contour shape"* receives an unnamed graphics node and
no text: the card carries **zero** characters of content beyond its own header.

The repo does this work for controls and not for meaning-bearing graphics: `visualization/` carries
`aria-label` on 20+ interactive elements (`AnimationControls.vue:67,82,104`,
`BasisSelector.vue:130,164,174,191,201`, `CanvasControlsDock.vue:46`,
`EditorControlsDock.vue:105,121,136`, `ContourSettings.vue:200,211`, …), while
`grep -rln "<title>\|<desc>" web/src/components/` → **empty**. All 12 SVG surfaces in
`lane-frontend.md:565` share the hole; this is the one where the SVG *is* the component.

**The repo's own gate is structurally blind.** `@axe-core/playwright` ships `svg-img-alt`, but that
rule's selector requires `role="img"` — an `<svg>` with no role never enters it. Same blindness that
lets B-1 through. And there is no unit-test net at all (`CENSUS-2026-08-03.md:256-258`;
`web/package.json:6-12` = `dev` / `build` / `preview` / `test:e2e`).

**Falsifier — and it is why I re-grade.** The earlier draft at this path grades this **BLOCKER** on
SC 1.1.1 (Level A), arguing the graphic *cannot* be decorative because it is the only thing the
section exists to show. That reading is defensible and I do not think it is wrong. But there is a
second legitimate remedy: this is a **secondary** rendering of an object the user directly
manipulates in an adjacent canvas, so `aria-hidden="true"` + naming *the editor* is a conforming
design answer — which makes the defect "no decision was made", not "the wrong decision was made".
That, plus the systemic 12-surface scope, is why I grade **MAJOR**; a reader who holds the strict
1.1.1 line keeps BLOCKER, and the wave should treat it as blocker-adjacent either way.
**Cure:** `role="img"` + `:aria-label` naming the shape and its point count (already computed —
`ContourEditorCanvas.vue:128`, surfaced at `VisualizationView.vue:239`), or an explicit
`aria-hidden`. Two lines, version-independent.

---

### M-2 · Wrong section chassis: a reka-backed `Collapsible` inside `<Configurator>` — the exact composition the **installed** design system documents as a recursion hazard — while the sanctioned primitive is imported three lines away *[NEW]*

**Provenance.** `ContourPreview.vue:34` renders `CollapsibleSection`, i.e. `Collapsible` +
`CollapsibleTrigger` + `CollapsibleContent` from the glass-ui **root barrel**
(`CollapsibleSection.vue:2`), with a JS-visible height reveal (`:60-65`, keyframes interpolating
`var(--reka-collapsible-content-height)` — `glass-ui@4.0.0/dist/styles/animations.css:18-37`). It is
mounted inside `<Configurator>`: opened `VisualizationView.vue:194`, aside stack `:253-261`, closed
`:278`.

**(a) The producer documents this exact composition as a non-convergent watcher loop — at the pin
fourier has installed.** `glass-ui@4.0.0/dist/components/custom/configurator/ConfiguratorLayer.vue.d.ts:15-32`:

> *"# M.W2 Lane A (F-ε-3 fix) — recursion-free reveal. Earlier versions composed `<Collapsible>` +
> `<CollapsibleContent>` from reka-ui to drive the height transition. Under Lighthouse's strict
> cold-load discipline (CPU throttle + network throttle + headless Chrome stable layout gating) this
> surfaced a watcher-graph race inside reka-ui's `<Presence>` + `<CollapsibleContent>`
> height-measurement watchers — `getComputedStyle(node).animationName` + `getBoundingClientRect()`
> reads inside a `watch([isOpen, presentRef.value?.present])` callback — created a non-convergent
> loop that tripped Vue's 100-iteration recursion cap on `<Configurator>`."*

Every element is live here. glass-ui's `Collapsible*` at 4.0.0 are thin forwards to reka
(`dist/CollapsibleContent-C_s6fG7r.js:3` imports `CollapsibleContent`, `CollapsibleRoot`,
`CollapsibleTrigger` from `reka-ui`), and reka's content component carries the named watcher verbatim:
`reka-ui/dist/Collapsible/CollapsibleContent.js:40`
`watch(() => [isOpen.value, presentRef.value?.present], async () => {` … `:50`
`const rect = node.getBoundingClientRect();`. The host is `<Configurator>`. The producer's remedy was
to remove the pattern from that host entirely, not to bound it.

**(b) The hierarchy register is abandoned in a two-item stack.** The component's only stack sibling —
`ContourSettings.vue:190`, rendered 3 lines below at `VisualizationView.vue:260` — uses
`<ConfiguratorLayer label="Contour" sub="edge extraction settings">` from
`@mkbabb/glass-ui/configurator` (`ContourSettings.vue:19`). Twelve pixels apart
(`.viz-panel-left { gap: 0.75rem }`, `VisualizationView.vue:366`):

| | `ContourPreview` (via `CollapsibleSection`) | `ContourSettings` (via `ConfiguratorLayer`) |
|---|---|---|
| header type | `text-sm font-semibold tracking-tight` = **14 px / 600** (`CollapsibleSection.vue:39`) | `.configurator-section-label` = **20.4 px / 600**, `--font-text`, `--type-tracking-tight` (`glass-ui/dist/styles/configurator.css:22-29`; tokens `offsets-sizing.css:499-500`) |
| face | `cm-serif` → generic serif (M-4) | `var(--font-text)` |
| section tint / divider | none | `--configurator-section-tint` + `--configurator-divider-section` (`configurator.css:60-66`) |
| chrome | `cartoon-card` (M-3) | the layer's own |

`configurator.css:1-13` states the intent this opts out of: the partial *"lands the three NAMED
hierarchy registers ONCE so every studio INHERITS a vocabulary (section weight / label register /
control rhythm) rather than a flat undifferentiated stack."* The aside is that flat stack — with the
**smaller** header on the item that comes first.

**(c) The disclosure state is uncontrollable and unpersisted.** `CollapsibleSection.vue:14` snapshots
`props.defaultOpen` into a local `ref` and never watches it; no `defineExpose`, no `v-model:open`
passthrough. `ConfiguratorLayer` ships `defineModel("open")` with an uncontrolled seed plus a
`useId()`-backed `aria-controls` pairing (`ConfiguratorLayer.vue.d.ts:52-54` at the installed pin;
producer 7.0.0 `src/components/configurator/ConfiguratorLayer.vue:66-79`). **Rider, not counted
separately:** `ContourPreview.vue:34` passes `:default-open="true"`, restating the wrapper's own
default (`CollapsibleSection.vue:10-12`) — a no-op that reads as a decision *[prior m-5 · C-D-9]*.

**Falsifier.** Attack (a): the docblock scopes the loop to `<Configurator>`'s own reveal, and a nested
consumer collapsible is not literally the same node — so **the conformance claim is proven statically
and the recursion reproduction is UNPROVEN-NEEDS-LIVE (SS-13)**. (b) and (c) are refutable only by
showing `ConfiguratorLayer` unavailable; it is imported and rendered 3 lines away.
**Route** F.W3: `<ConfiguratorLayer label="Preview" sub="live contour">` retires the wrapper at this
site with no uplift dependency.

---

### M-3 · The card is a hand-rolled resurrection of `<Card surface="cartoon">` — which ships **at the installed pin** — so half the booked upstream carry asks the producer for something already delivered *[NEW]*

**Provenance.** `ContourPreview.vue:33` `class="cartoon-card px-3 py-2"` → `style.css:107-111`, whose
docblock (`:98-106`) records *"glass-ui removed the `.cartoon-card` recipe at C.W5 … this shim is the
fourier-local KISS stop-gap"* pending *"cross-repo re-publish recorded as a coordination ask."*

**The ask is already satisfied at 4.0.0.** `dist/components/ui/card/Card.vue.d.ts:16-33` declares
`export type CardSurface = "glass" | "cartoon" | "veil"` and says verbatim:

> *"cartoon — the Memphis-sticker decoration layered on top of the resolved tier: 2px border,
> offset-stamp shadow, hover-lift. Composes onto ANY tier; **the retired `<CartoonCard>` was
> `tier="quiet" surface="cartoon"`**."*

`:54-61` declares the `surface?: CardSurface` prop; `:11-14` declares `tier="opaque"` — *"the
`--glass-level:0` escape … the solid-card opt-out (AX.W54)"* — which is the opaque-fill arm the shim
hand-writes. `<Card tier="opaque" surface="cartoon">` is the shipped expression of this surface,
available today, no uplift required.

**F.W1 does not change the picture.** At producer HEAD `4ef35e8d`, `.cartoon-card` is still absent and
`cartoon-surface` still ships — relocated to `src/components/card/styles.css:98-102`, `@import`-ed
into the published stylesheet at `src/styles/index.css:183`, with `--shadow-cartoon-md` surviving at
`src/styles/tokens/shadow.css:82` *(this relocation is the earlier draft's §4.1 kill, independently
re-verified here)*. 7.0.0 additionally exposes it as a `cartoon?: boolean` prop
(`src/components/card/Card.vue:18,36,87`). The shim therefore survives the uplift **unchanged and
unneeded**.

**Corpus contradiction, stated explicitly.** `lane-frontend.md §9 item 8` books `cartoon-card` as a
*held upstream carry* and `CENSUS-2026-08-03.md §4` F.W3 schedules *"relay the cartoon-card +
`--viz-amber` carries to the glass BH inbox."* The `--viz-amber` half stands (B-1 shows the cure could
not reach a literal). The **`cartoon-card` half does not**: there is nothing to relay — what is owed
is a consumer migration.

**Falsifier.** Show `Card` at 4.0.0 lacks `surface="cartoon"` (it does not — `Card.vue.d.ts:33,54-61`),
or show `<Card tier="opaque" surface="cartoon">` cannot reproduce `background: var(--card)` +
`border-color: var(--border)`. The second is the honest limit — `tier="opaque"` resolves through the
glass ladder rather than through those two tokens literally, so **exact parity is
UNPROVEN-NEEDS-LIVE (SS-13)**. Availability is proven; substitutability is the wave's measurement.
Site count for the migration: **21 application sites across 14 files** *[C-D-10, both greps re-run]*.

---

### M-4 · The header renders in two typefaces and neither is the intended one: `--font-serif-math` is defined **nowhere** — not at 4.0.0, not at 7.0.0, not in fourier *[NEW]*

**Provenance.** `CollapsibleSection.vue:39`
`<span class="cm-serif text-sm font-semibold tracking-tight">{{ title }}</span>`; `:40` the subtitle
span carries no face class and inherits.

- `.cm-serif` is a glass-ui utility: `dist/styles/typography/utilities.css:65-67` →
  `font-family: var(--font-serif-math, serif)`, with the note *"it resolves to the consumer-supplied
  serif (system serif by default; a math consumer maps Computer Modern / KaTeX over it)."*
- **The consumer never supplies it.** `grep -rn "font-serif-math"` → `web/src`: **zero**; installed
  glass-ui dist: **one hit, the consumption above**; producer 7.0.0 `src/`: **one hit,
  `src/styles/typography/utilities.css:78`, again the consumption.** Read in three trees, written in
  none.
- So the title falls through to the UA generic `serif`. The subtitle inherits from `body`
  (`style.css:19-22` `@apply … font-serif`) → Tailwind `--font-serif` →
  `glass-ui/dist/styles/theme/bridges.css:68` `--font-serif: var(--font-stack-text)` →
  `tokens/scheme-motion.css:43` `"Plus Jakarta Sans", …`.

**Result: `Preview` in Times, `— live contour shape` in Plus Jakarta Sans, 6 px apart on one line**
(`ml-1.5`, `:40`).

**And the app's Computer Modern reaches neither.** `style.css:5-6` describes the fork as *"the brand
fork remaps the `font-sans` Tailwind utility onto Computer Modern Serif"* and `:13-15` sets
`@theme { --font-sans: "Computer Modern Serif", … }` — but the shell applies **`font-serif`**, not
`font-sans` (`:19-20`). Two independent misses that cancel into "everything is a fallback".

**Scope + severity.** Systemic — `.cm-serif` appears in **17 files** — but it lands on this
component's only text, and one declaration (`:root { --font-serif-math: … }`) cures all 17. MAJOR at
the component on that basis.

**Falsifier.** Produce a `--font-serif-math` declaration in any loaded stylesheet or a JS write of it
(`grep` over `web/src` `*.css`/`*.ts`/`*.vue` + `index.html` → none), or a local override at this
site (the file's one scoped rule, `:57-61`, targets the SVG). **UNPROVEN-NEEDS-LIVE (SS-13):** the
two computed `font-family` values side by side. **F.W1 does not fix it** — 7.0.0 ships the identical
fallback expression.

---

### M-5 · The preview re-frames itself on every pointer move, contradicting — in the same repo, on the same array — the editor's explicit, commented stable-bounds policy *[prior M-1 · C-D-3]*

**Provenance.** `ContourPreview.vue:16-29` is a `computed` over the **live** point array; every drag
frame mutates a point, the extrema recompute, the `viewBox` changes, and the shape rescales and
re-centres under the cursor.

The editor — same contour, same array, same session — decided the opposite and said so:

```ts
// ContourEditorCanvas.vue:49-50
// Stable bounds — computed from initial contour, not live points
const stableBounds = ref({ minX: 0, maxX: 1, minY: 0, maxY: 1, width: 1, height: 1 });
```

`stableBounds` has exactly one writer (`initFromContour`, `:53-70`, driven by
`watch(() => props.contour, initFromContour, { immediate: true })` at `:72`). So while you drag a
vertex the editor holds still and the thumbnail beside it breathes. A preview whose frame of
reference moves *with* the thing previewed cannot serve as a reference — you cannot tell whether the
shape changed or the camera did, which is the component's one job.

**A11y leg:** this is motion triggered by user interaction, neither essential to the manipulation (the
editor already gives direct feedback) nor disable-able — SC 2.3.3 (AAA). The only PRM block on the
path is `CollapsibleSection.vue:66-70`, which covers the disclosure height animation and nothing else.

**Falsifier.** Show `previewViewBox` memoised (it is not — `:17` reads `props.points` fresh, `:19-25`
recomputes extrema on every invalidation), or the editor's bounds tracking live (they do not).
**UNPROVEN-NEEDS-LIVE (SS-13):** the visible magnitude of the breathing. **Cure:** accept the
editor's `stableBounds` as a prop — the policy exists and is already commented; this is adoption, not
invention.

---

### M-6 · Padding derived from **X only** and applied to **both** axes — the framing swings 3.5× to 11× with aspect ratio, and past h ≳ 15.8 w it clips *[prior M-2 · C-D-6]*

**Provenance.** `ContourPreview.vue:26,28`:

```ts
const pad = (maxX - minX) * 0.1;                                            // X extent only
return `${minX-pad} ${-(maxY+pad)} ${maxX-minX+pad*2} ${maxY-minY+pad*2}`;  // spent on BOTH
```

Under `preserveAspectRatio="xMidYMid meet"` (`:38`) into the fixed 160 × 160 box (`:57-59`), the
resulting gutters — `s = min(160/(w+2p), 160/(h+2p))`, gap_side `= (160 − s(w+2p))/2 + s·p`,
gap_top `= (160 − s(h+2p))/2 + s·p`:

| contour w × h | side gap | top gap | asymmetry |
|---|---:|---:|---:|
| 100 × 100 | 13.33 px | 13.33 px | 1.00× |
| 200 × 100 | 13.33 px | 46.67 px | **3.50×** |
| 300 × 100 | 13.33 px | 57.78 px | **4.33×** |
| 100 × 200 | 43.64 px | 7.27 px | **6.00×** |
| 100 × 300 | 55.00 px | 5.00 px | **11.00×** |

I re-derived the 200 × 100 row independently and it reproduces exactly (p = 20, viewBox 240 × 140,
s = 0.6667, letterbox 33.33 + s·p 13.33 = 46.67). The horizontal gutter is pinned at 13.33 px for
every wide contour; the vertical one is a free variable. Past **h ≳ 15.8 w** the top gap drops below
1 px — half the 2 px non-scaling stroke (`:46-47`) — and the extreme vertices clip against the SVG's
default `overflow: hidden`.

The sibling on the same data computes both axes independently at a different magnitude:
`padX = b.width * MARGIN`, `padY = b.height * MARGIN`, `MARGIN = 0.15`
(`ContourEditorCanvas.vue:30,76-81`) — so the two renditions do not even agree on how much air a
contour needs.

Aristotelian reading: the component sets out to impose one relation — *shape inside frame* — and
imposes a different one on each axis.

**Falsifier.** Recompute the `meet` fit (the table is that formula), or argue square contours are the
only case — contours come from arbitrary uploaded images, so aspect is unbounded.

---

### M-7 · A hard-coded 160 × 160 px object in a 320–440 px column, in a repo that scales its root font by breakpoint — and scales it the wrong way *[prior M-4, sharpened]*

**Provenance.** `ContourPreview.vue:57-61` `.preview-svg { width: 160px; height: 160px; }`.

| ring | source | subtracts |
|---|---|---|
| aside column | `VisualizationView.vue:322` `minmax(320px, 360px)` @≥1024 · `:326` `minmax(360px, 400px)` @≥1280 · `:329` `minmax(400px, 440px)` @≥1536 · `:355` `max-width: 480px` below 1024 | — |
| `.viz-panel-left` | `:368` `padding: 0.5rem` | 16 px |
| card | `ContourPreview.vue:33` `px-3` | 24 px |
| inner flex | `:35` `p-2` | 16 px |

Available graphic width = column − 56 px ⇒ **264 px** narrowest desktop, **384 px** widest, **424 px**
on the stacked layout ⇒ the 160 px square fills **60.6 % / 41.7 % / 37.7 %**, leaving 52 / 112 /
132 px of dead gutter **per side**, in a panel whose only other occupant is full-bleed and
conditional (`VisualizationView.vue:260`).

**And the direction is inverted.** `style.css:39-49` sets `html { font-size: 1.125rem }` and drops it
to `1rem` at ≥768 px — deliberately larger type on small screens. A `px` graphic under a `rem`-scaled
type system therefore reads **smaller relative to its own label** on mobile (160 px = 8.89 rem) than
on desktop (160 px = 10 rem): backwards for the device with less screen and more finger.

It is also the closure's **only `px` literal**, and the only preview surface in the tree without a
size knob: `PathPreview.vue:14` `size?: number` (default 64), `EasingCurvePreview.vue:21-22`
`:width="size"`.

**Falsifier.** Produce a media/container query, `rem`, `%`, `min()`, `clamp()` or `size` prop
governing the box — the scoped block is four lines and has none; or show the panel width fixed — it
is a three-band track plus a mobile cap. `preserveAspectRatio="meet"` does not help: `meet` fits the
*viewBox into the viewport*, and the viewport is pinned at 160 px by `:58-59`.
**UNPROVEN-NEEDS-LIVE (SS-13):** the rendered gutter.

---

### M-8 · Zero state coverage — empty, loading and error are all a 160 px void under a heading that promises a "live contour shape" *[prior M-3, with a corrected reachability analysis]*

**Provenance.** `ContourPreview.vue:12` returns `""` for `< 3` points; `:18` returns `"0 0 1 1"` for
`< 2`; `:42-48` emits `<path d="">`, which paints nothing. No `v-if`/`v-else` arm, no placeholder, no
skeleton, no message, in 62 lines. The card is always open (`:34`), so the void is never collapsed
away.

Reachable blanks, **corrected**:

1. `points === []` — `ContourEditorCanvas.vue:34` initialises to `[]`; filled by `initFromContour`
   (`:53-72`, `immediate`). Real but narrow.
2. **`props.points === undefined` on the restored-edit-mode cold load.** The earlier draft killed this
   branch as "FALSE in the live path" because the editor mounts in the `#stage` slot under
   `v-if="store.contour"` (`VisualizationView.vue:203-207`), independent of `isEditing`. That
   reasoning is right for the *toggle* path and **wrong for the restore path**:
   `useViewState.ts` persists `editing` to `localStorage` and, when `saved.editing` is true, sets
   `isEditing.value = true` inside `watch(() => store.contour, …, { immediate: true })` — i.e. **in the
   same tick in which `store.contour` first becomes non-null**. On that pass both subtrees are created
   together and `editorRef` is null when `<ContourPreview>`'s vnode is built. See §6 C-3.
3. `points.length < 3` — the file's own guard, so the author considered it reachable.

**The store publishes exactly the states the card ignores:** `stores/workspace.ts:49` `loading`,
`:50` `computing` (depth-counted at `:60-68` so it survives sequential async steps), `:51` `error`.
The house owns all three idioms and this component uses none: empty →
`CoefficientsSpectrum.vue:28-31,139` (`emptyText: "Compute to see coefficients"`); loading →
`VisualizationView.vue:155-158`; error → `:162-175` (a `cartoon-card` with a message and a recovery
action; cf. `EquationView.vue:239,243`). **And the primitive is already installed** — `Skeleton` ships
at 4.0.0 through the same root barrel `CollapsibleSection.vue:2` already imports from
(`dist/components/ui/index.d.ts:31`; component at `dist/components/ui/skeleton/Skeleton.vue.d.ts`).

The panel also carries **zero** text: the point count the user is actually manipulating is computed
one component over (`ContourEditorCanvas.vue:128`) and surfaced by the dock
(`VisualizationView.vue:239`), but not here — so the empty state cannot even say *how* empty it is.

**Falsifier.** Point at any state branch in the file — there is none. Honest bound: on the toggle path
the void lasts at most one frame (the earlier draft's kill is correct there); the *durable* half is
the missing `loading` / `computing` / `error` arms during extraction and re-extraction, which are
second-scale. **UNPROVEN-NEEDS-LIVE (SS-13):** the visible duration during a real extract.

---

### M-9 · The correct framing math is owned **twice** in this repo — `ui/PathPreview.vue` and `decorative/FourierMorphSvg.vue` — and was re-derived here, worse, on every axis *[prior M-5 · C-D-5, extended]*

**Provenance.** `ContourPreview.vue:16-29,36-50,57-61` against two live in-tree primitives.

| decision | `PathPreview.vue` | `FourierMorphSvg.vue` | `ContourPreview.vue` | lands as |
|---|---|---|---|---|
| fit | one uniform scale over the **governing** extent, centred (`:29-36`) | consumer-supplied `viewBox` prop (`:3,:24,:29`) | X-only pad on both axes (`:26`) | **M-6** |
| stroke colour | `strokeColor` prop, default `"currentColor"` (`:16`) | `strokeColor` prop, default **`var(--accent-red)`** (`:25,:30`) | `hsl(40 90% 55% / 0.85)` literal (`:45`) | **B-1** |
| size | `size` prop, default 64 (`:14`), `strokeWidth/size` (`:56`) | consumer-scaled | `160px` hard-coded (`:58-59`) | **M-7** |
| degenerate extent | `rangeX = maxX-minX \|\| 1` (`:29-30`) | n/a | none | **m-1** |
| empty path | `<path v-if="svgPath">` (`:60`) — no element at all | `:d="path"` (`:9`) | `<path d="">` always emitted | **M-8** |
| joins/caps | `round`/`round` (`:57-58`) | `round`/`round` (`:13-14`) | default `miter` | §5 F-2 (killed) |

**The claim is duplication, not the individual deltas** — those are counted under their own findings —
and it sharpens the C lane. `challenge-C-consumption.md` **D-5** frames the cure as *"a `d`-accepting
slot or `path` prop on the existing primitive was the two-line move"*; in fact **a `d`-accepting
component already existed and needed no extension**: `FourierMorphSvg.vue:20-33` takes
`path` + `viewBox` + `strokeColor` + `strokeWidth`, token-defaulted. `lane-frontend.md:444`
classifies `PathPreview` as *"genuinely bespoke — no flag"*, i.e. sanctioned; `GalleryCard.vue:10`
imports it; `MorphShapePreview.vue:48` imports the other (used at `:5-9`). Two of the repo's three SVG preview
surfaces are token-driven and parameterised; this is the third.

**Honest scope.** Neither is a drop-in: `PathPreview` emits an `M…L…Z` polyline (`:44`) and would lose
the Catmull-Rom smoothing (`contourEditing.ts:20-43`) that makes the preview match the editor;
`FourierMorphSvg` has no `scale(1,-1)` group. The defect is that the framing, colour, sizing and
guard decisions were already made correctly in `ui/` and `decorative/` and were re-made worse here.
**Falsifier.** Show either primitive unimported, or its geometry wrong — the uniform-fit formula
produces symmetric gutters at every aspect ratio, which M-6's table shows this file does not.

---

## §3 — MINOR

| id | claim | file:line | falsifier |
|---|---|---|---|
| **m-1** *[prior]* | **No degenerate-extent guard — a zero-extent contour disables rendering of the whole `<svg>`, not just the path.** If `maxX === minX` then `pad = 0` and the emitted viewBox width is `0`; per SVG 1.1 §7.7 / SVG 2 *"a value of zero disables rendering of the element"*. Both other consumers of these bounds guard: `ContourEditorCanvas.vue:65` (`maxX-minX \|\| 1`), `PathPreview.vue:29-30`. Two of three guard; this one does not. *[C-D-6 files the same guard as the latent half of its anisotropy finding.]* | `:26,:28` | Prove `minX !== maxX` for every contour reachable through insert/drag/simplify — nothing constrains it; only the ≥3-point floor is enforced. Defensive, not live ⇒ MINOR. |
| **m-2** *[prior · C-D-7]* | **Split thresholds over one array.** `previewPath` guards `< 3` (`:12`); `previewViewBox` guards `< 2` (`:18`). At exactly n = 2 the component computes a real, correct viewBox to frame a path it has decided to leave empty — while the library it calls *does* handle n = 2 (`contourEditing.ts:23-24`). Three floors, no reconciliation. | `:12,:18` | n = 2 is unreachable through the editor today (`deleteSelected` floors at 3, `simplifyClosedPoints` at 4) — which is why MINOR. |
| **m-3** *[prior]* | **The fallback viewBox contradicts the coordinate convention the file documents two lines later.** `:18` returns `"0 0 1 1"` — **positive** Y — while `:27-28` state in a comment that the real branch uses negative Y because of the `scale(1,-1)` at `:41`. The fallback frames `y ∈ [0,1]`, which under the flip is where content can never be. Harmless today only because the path is simultaneously empty — two bugs cancelling. Convention-correct: `"0 -1 1 1"`. | `:18` vs `:27-28,41` | Show the fallback framing the flipped half-plane — it frames the unflipped one. |
| **m-4** *[prior m-4, re-scoped]* | **Three padding owners across two components, none tokenized.** Above the SVG: `:35` `p-2` (8) + `CollapsibleSection.vue:36` `py-1.5` (6) = 14 px. Below: `p-2` (8) + `CollapsibleSection.vue:46` `pb-1` (4) + `:33` `py-2` (8) = 20 px. Beside: `px-3` (12) + `p-2` (8) = 20 px. **I disagree with the earlier draft on the reading:** a 14/20 above-below split around a captioned object is *correct* typographic grouping (the object should sit closer to its own label than to its frame) — see **S-5**, where the same numbers are a superlative. The defect is that the result is unowned: four utilities in two files, no token, no single owner, and a change to any one silently re-tunes the frame. | `:33,:35`, `CollapsibleSection.vue:36,46` | Show a single owner or a token for the trigger↔body gap. |
| **m-5** *[prior m-6 · this lane]* | **Two renditions of one contour, two independent stroke literals.** Both carry `vector-effect="non-scaling-stroke"`, so both widths are **device** px: editor `stroke-width="3"` (`ContourEditorCanvas.vue:262`), preview `stroke-width="2"` (`:46`) across a 4× smaller box — a thumbnail whose line is proportionally ~2.5× heavier than the master, closing thin features. | `:46` vs `ContourEditorCanvas.vue:262` | The *direction* is defensible (smaller box wants a lighter line); the defect is the **absence of a binding** — two unrelated literals, no token, no ratio, no comment. Perceived weight is **UNPROVEN-NEEDS-LIVE (SS-13)**. |
| **m-6** *[prior m-7]* | **It previews the path, not the editing surface — and silently ignores the toggle that changes it.** The editor draws on a plate: `--radius`, a 1 px `--border`, a 28 px two-axis grid over `--card` (`ContourEditorCanvas.vue:285-297`), plus an optional image underlay at 0.28 opacity (`:245-255`). The preview draws the stroke on nothing. It also takes **only** `points` (`:7`), so `showImageOverlay` — wired to the editor at `VisualizationView.vue:205` and toggled from two docks — changes the editor and not the thing labelled "Preview". | `:7,:35-50` | Argue "shape only" is the intent — the deck says *"live contour shape"*, which is defensible; the defect then narrows to the untracked overlay toggle, which is not. |
| **m-7** *[prior m-8 · this lane, merged]* | **A display-only card carries an interactive hover affordance today.** `.cartoon-card` → `@apply cartoon-surface`, and at the **installed** pin that utility is not decoration-only: `glass-ui@4.0.0/dist/styles/cards.css:33-49` ships `translate: 0`, a `translate`/`box-shadow` transition, and `&:hover:not(:disabled) { translate: var(--lift-sm) var(--lift-sm); box-shadow: var(--shadow-cartoon-lg) }` (`--lift-sm: -1px`, `tokens/offsets-sizing.css:10`). On a `<div>` the `:not(:disabled)` always holds, so hovering the inert graphic lifts the whole card while the actual control inside it has no hover at all — the affordance is inverted. **PRM nuance:** glass-ui's blanket (`utilities/a11y-overrides.css:6-16`) narrows `transition-property` to `opacity, color, background-color, border-color, box-shadow !important`, so under reduce the *transition* is stripped but the 1 px `translate` still applies — instantly. At **7.0.0** the recipe is three declarations, `position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md)` (`src/components/card/styles.css:98-102`) — **no hover-lift**. For this component F.W1 is a net cure; the wave must know it is a fleet-wide 21-site visual delta. | `:33` | Produce a hover rule on `cartoon-surface` at 7.0.0 (that file is the whole utility), or an interactive role on the `<div>`. 1 px is near the perceptual floor ⇒ MINOR. |
| **m-8** *[prior m-9]* | **The brand contour colour is an inline presentation attribute duplicated at 9 sites across 2 files, invisible to every token audit.** `grep -rn "hsl(40 90% 55%" web/src` → **9** hits: `ContourEditorCanvas.vue:261,307,308,315,319,328,329,333` + `ContourPreview.vue:45`, at five alpha values. No `--contour-stroke` exists. A presentation attribute is also the weakest cascade rung, so any stray `path { stroke }` rule silently wins. glass-ui ships the semantic home (`tokens/color-radius.css:266`) and fourier already remediated it (`style.css:119-127`); nine literals route around both. | `:45` | Produce a declaration of this colour as a custom property in either tree — there is none. B-1 is the instance; this is the system. |
| **m-9** *[NEW]* | **F.W1 silently deletes this component's only motion.** `CollapsibleSection.vue:57-65` animates the reveal *by name* (`collapsible-open` / `collapsible-close`), and its comment is **true at the installed pin** — `glass-ui@4.0.0/dist/styles/animations.css:18,29` define both, interpolating `height: 0 ↔ var(--reka-collapsible-content-height)`. It is **false at 7.0.0**: at producer HEAD, `grep -rn "collapsible-open"` over `src/` **and** `dist/styles/` → empty; `src/styles/animations.css` now holds `tooltip-in`, `fade-in`, `scale-in`, `slide-up`, `dock-in`, `shimmer*`, `shake`, `metal-shimmer-sweep`, `typewriter-blink`, `glass-reveal-out{,-reduced}` and no collapsible pair (the producer moved disclosure reveals to the CSS-only `grid-template-rows: 0fr ↔ 1fr` pattern — `ConfiguratorLayer` docblock). An unknown `animation-name` is not an error; it simply does not apply. `var(--ease-out)` survives (`tokens/scheme-motion.css:217`), so the declaration stays valid and visibly inert. **Nothing in the repo can catch it:** `web/package.json:6-12` has no stylelint and no CSS gate. | `CollapsibleSection.vue:61,64` | Find the keyframes under a new name at 7.0.0 — the only related addition is the `transition-disclosure` caret register (`src/styles/utilities/btn.css:69-71`), not a height reveal. Degradation is graceful ⇒ MINOR; a reader weighting "an undetectable regression the wave will ship" may grade MAJOR. |
| **m-10** *[NEW]* | **The component's sole tab stop has no design-system focus indicator.** `CollapsibleSection.vue:36` renders reka's `<button>` with layout utilities only. glass-ui ships the canonical opt-ins — `.focus-ring:focus-visible { box-shadow: var(--focus-ring-shadow) }` (`utilities/base.css:174-178`) and `.interactive-item:focus-visible` (`:205-208`) — neither applied. fourier's own remediation enumerates exactly four classes (`style.css:136-143`, *"D.W4.d — `:focus-visible` rings … Mirrors the canonical pattern at AppHeader.vue:174-177"*) and `.collapsible-trigger` is not among them. | `CollapsibleSection.vue:36` | **Bounded:** nothing sets `outline: none` on this button (the only such rules at 4.0.0 are `.popover-content` and the two focus recipes, `utilities/base.css:138,175,206`), so the **UA default ring does render**. The defect is inconsistency with the `--ring` vocabulary, not absence of focus ⇒ MINOR. Verified *not* a defect: the caret is `aria-hidden` automatically (`lucide-vue-next/dist/esm/Icon.js:41`). |
| **m-11** *[NEW]* | **A JS smooth scroll on the disclosure toggle ignores `prefers-reduced-motion`.** `CollapsibleSection.vue:17-30`: opening the section schedules `el.scrollIntoView({ behavior: "smooth", block: "end" })` after `setTimeout(…, 250)`. glass-ui's PRM blanket governs CSS `animation`/`transition` only; a scripted `behavior: "smooth"` is untouched, and the component's own PRM block (`:66-70`) covers only the two keyframe rules. The idiomatic guard (`matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"`) is absent. Riders: the 250 ms timer is tuned to the 0.2 s animation (`:61`) and outlives it by 50 ms; under PRM (animation `none`) it is 250 ms of dead wait before an unrequested smooth jump. | `CollapsibleSection.vue:26` | The scroll is conditional on `rect.bottom` exceeding the scroll parent (`:25`), which in the aside is often false ⇒ MINOR. **UNPROVEN-NEEDS-LIVE (SS-13):** whether the aside overflows at a real viewport. |

---

## §4 — INFO

| id | note |
|---|---|
| **i-1** *[prior i-1, with its casing sub-claim killed]* | **Prose.** *"live contour shape"* (`:34`): *contour* already denotes a shape, so the phrase is redundant; *live* is the only load-bearing word and it advertises exactly the behaviour M-5 and C-D-3/D-4 ask the wave to remove. *"Preview"* names the widget, not the object, in a two-card panel whose sibling names the object (`ConfiguratorLayer label="Contour"`, `ContourSettings.vue:190`). The card also carries no datum — `pointCount` exists two components away (`VisualizationView.vue:239`). **The casing critique is dead** — see §5 F-4; I drafted it independently and killed it exactly as the earlier draft did. |
| **i-2** *[prior i-2]* | **The spline's `tension` parameter is dead.** `contourEditing.ts:20` declares `closedSplinePath(points, tension = 0.5)`; the body never reads it — the coefficient is hard-coded `const factor = 1/6` (`:33`). Repo-wide, `tension` appears only in that signature: zero callers pass it, zero read it. `ContourPreview.vue:13` and `ContourEditorCanvas.vue:85` both call with one argument, so the two renditions agree **by accident, not by contract**. A design knob that looks settable and is not. |
| **i-3** *[prior i-3]* | **One non-finite coordinate blanks the preview with no signal.** `:19-25` propagates `NaN` through the extrema, `:26` through `pad`, `:28` emits `"NaN NaN NaN NaN"`. An invalid `viewBox` is *ignored* by UAs (not an error), so the SVG reverts to 1 : 1 user units and an image-space contour leaves the 160 px box entirely. No `Number.isFinite` guard anywhere. **Reachability UNPROVEN**; the propagation is proven by inspection. |
| **i-4** *[NEW]* | **The path itself has no transition — and that is correct.** In a tree with eight PRM blocks and a full duration/ease ladder, an untransitioned primary visual reads like an omission. It is not: per C-D-4 the `d` string is already rebuilt per `pointermove` at n = 1024 default, so a `d`-interpolation or CSS transition would compound a cost the wave intends to remove. Recorded so F.W4 does not "improve" this into a regression. |
| **i-5** *[NEW — corrects prior S-4]* | **The closure is *not* zero-line under F.W1.** The earlier draft's S-4 says *"unusually for this repo — no `lucide-vue-next` import"*, and that is true **of the 62 lines** and false of the closure: `CollapsibleSection.vue:4` `import { ChevronRight } from 'lucide-vue-next'` is 1 of the census's **35** `@lucide/vue` rename sites (`CENSUS-2026-08-03.md:105`); `web/package.json:35` pins `lucide-vue-next: ^1.0.0`; the producer's own `ConfiguratorLayer.vue:2` already imports from `@lucide/vue`. Same correction applies to C-lane **S-3**, which scoped its "zero lines" claim to glass-ui subpaths. **Net F.W1 budget for this closure: 1 rename line + 1 silent regression (m-9) + 0 break-surface members.** |

---

## §5 — Falsified candidates (L-18 turned inward)

Recorded so F.W4 does not re-file them, and so the method is auditable. F-1 and F-2 are mine; F-3 and
F-4 were drafted independently here and had already been killed by the earlier draft — concurrence,
recorded as such.

| # | The claim I was about to file | Why it died |
|---|---|---|
| **F-1** | *"The caret's `transition-transform duration-200` is inert — Tailwind v4's `rotate-90` writes the `rotate` longhand, which `transition-transform` does not cover, so the chevron SNAPS."* Motivated by the producer's own docblock (7.0.0 `src/styles/utilities/btn.css:55-60`: *"a `transition: transform` never covers the `rotate` Tailwind v4's `rotate-*` writes, so its chevron SNAPPED"*). | **REFUTED by the compiled CSS.** `.transition-transform{transition-property:transform,translate,scale,rotate;…}` and `.rotate-90{rotate:90deg}` — verified identically in `glass-ui/dist/styles/components.css` and in fourier's own build output `web/dist/assets/index-57FkGzlZ.css`. The **utility** covers `rotate`; the producer was describing a hand-written `transition: transform` declaration in Configurator's scoped CSS. The caret animates. Only the *register* divergence survives, and it is an F.W1 improve-surface, not a defect → §7. |
| **F-2** | *"Missing `stroke-linejoin: round` / `stroke-linecap: round` (`:42-48`) produces miter spikes at the knots and at the closure."* | **REFUTED.** `closedSplinePath` (`contourEditing.ts:27-41`) computes both control points of every segment from the same neighbour-difference formula, so incoming and outgoing tangents at each knot are collinear — C1 continuity, no angular join for a miter to spike at; and `Z` (`:41`) closes a zero-length segment. `PathPreview.vue:54-55` needs `round` because it emits `L` polylines with genuine angles; this file does not. The omission is correct. *(Independently the earlier draft's §4.2 — same conclusion.)* |
| **F-3** | *"`@utility cartoon-card { @apply cartoon-surface }` fails to build at F.W1, taking this component's chrome and 13 other files with it."* (candidate BLOCKER) | **REFUTED.** `cartoon-surface` merely relocated: 7.0.0 `src/components/card/styles.css:98-102`, `@import`-ed at `src/styles/index.css:183` — the same entry fourier consumes via `@import "@mkbabb/glass-ui/styles"` (`style.css:3`). `--shadow-cartoon-md` survives at `src/styles/tokens/shadow.css:82`. The shim resolves at both pins. The recipe *body* does change → m-7. *(The earlier draft reached this first; re-verified line-by-line here.)* |
| **F-4** | *"The subtitle casing breaks the section-header idiom."* | **REFUTED.** All four `CollapsibleSection` callsites: `"live contour shape"` (`:34`), `"harmonics & display"` (`FunctionInput.vue:176`), `"f(x)"` (`:94`) are lower-case; `"Fourier spectrum"` (`EqCoefficientsPanel.vue:13`) capitalises only a proper noun. This file follows the majority idiom exactly. The *wording* critique survives as i-1; the casing critique does not. |

---

## §6 — Adjudication of the earlier draft at this path (L-18 applied to my predecessor)

Read whole and checked row by row against the tree. **Carried: 15. Re-graded: 2. Refuted: 2. Its own
self-kills: 3 confirmed, 1 refuted.**

| prior row | disposition |
|---|---|
| **B-2** (light-arm contrast 1.66 : 1) | **CARRIED, re-numbered B-1.** Arithmetic independently reproduced to three digits (1.660 / 4.625). Its derivation, its `--card` chain, and its `--viz-amber` substitution all check out. |
| **B-1** (unnamed SVG, SC 1.1.1) | **CARRIED, RE-GRADED to MAJOR** (M-1). Reason in M-1's falsifier: `aria-hidden` + naming the editor is a conforming alternative remedy, so the defect is "no decision", and the 12-surface scope makes a single-leaf BLOCKER over-weighted. The strict reading is not wrong; the wave should treat M-1 as blocker-adjacent. |
| **M-1** (live-bounds reframing) | **CARRIED** → M-5. Every citation verified, incl. the single writer of `stableBounds` and the `immediate` watch at `ContourEditorCanvas.vue:72`. |
| **M-2** (X-only padding + gutter table) | **CARRIED** → M-6. I re-derived the 200 × 100 row from the `meet` algebra: 13.33 / 46.67, exactly as tabulated. Added the sibling's independent `padX`/`padY` at `MARGIN = 0.15`. |
| **M-3** (zero state coverage) | **CARRIED with a corrected reachability analysis** → M-8. Its branch 1 (`props.points === undefined`) is the branch its own §4.4 kills; §6 C-3 below restores it on the restore path. |
| **M-4** (160 px in a responsive column) | **CARRIED** → M-7, with the column band corrected (see C-1) and the `rem`-inversion argument adopted. |
| **M-5** (PathPreview re-derivation) | **CARRIED and EXTENDED** → M-9: `decorative/FourierMorphSvg.vue` is a **second**, `d`-accepting, token-defaulted primitive the draft did not name — which sharpens the C lane's "an extension was needed" framing to "no extension was needed". |
| **m-1, m-2, m-3, m-6, m-7, m-9** | **CARRIED** → m-1, m-2, m-3, m-5, m-6, m-8. All citations spot-verified. |
| **m-4** (14/20/20 padding) | **CARRIED, RE-SCOPED** → m-4 + S-5. I dispute the reading, not the numbers: 14 above / 20 below around a captioned object is correct grouping. The ownership complaint survives; the asymmetry complaint becomes a superlative. |
| **m-5** (`:default-open` redundant) | **CARRIED as a rider under M-2(c)**, not counted separately (C-D-9 already books it). |
| **m-8** (hover-lift; removed at 7.0.0) | **CARRIED and EXTENDED** → m-7: 7.0.0's three-declaration recipe re-verified at `src/components/card/styles.css:98-102`; added the PRM nuance (the blanket strips the transition, not the translate) and corrected the fleet count to **21 sites / 14 files** (C-D-10's measurement; `style.css:102`'s "14 sites / 13 files" is stale). |
| **i-1, i-2, i-3** | **CARRIED** → i-1, i-2, i-3. `tension` re-verified dead (`contourEditing.ts:20` vs `:33`). |
| **§4.1 / §4.2 / §4.3** (its three self-kills) | **CONFIRMED** — re-derived independently as F-3 / F-2 / F-4. |
| **C-1 · its column band is one step off** | **CORRECTION.** It states *"desktop ≥1024: `minmax(320px, 360px)`; ≥1280: `minmax(360px, 400px)`; ≥1536: `minmax(400px, 440px)`"* and then computes *"160 / 280 = 57 % … 160 / 440 = 36 %"*. The **bands are right** (`VisualizationView.vue:322,326,329`), but the subtraction is not applied consistently: content width is column − 56 px (panel `0.5rem` ×2 + `px-3` ×2 + `p-2` ×2), giving **264 / 384 / 424 px** ⇒ **60.6 % / 41.7 % / 37.7 %**, not 57 % / 36 %. Same conclusion, corrected denominators — M-7. |
| **C-2 · its S-4 ("not on the break surface") is half wrong** | **CORRECTION** → i-5. True for the 62 lines; false for the closure, which owns 1 of the 35 `lucide-vue-next` rename sites at `CollapsibleSection.vue:4`. |
| **C-3 · its §4.4 self-kill is itself refuted on the restore path** | **CORRECTION.** It kills the "blank first render" branch because `ContourEditorCanvas` mounts in the `#stage` slot under `v-if="store.contour"` (`VisualizationView.vue:203-207`), independent of `isEditing` — correct for the **toggle** path. But `useViewState.ts` persists `editing` to `localStorage` (`fourier_visualizer_view_state`) and, when restored, sets `isEditing.value = true` inside `watch(() => store.contour, …, { immediate: true })` — the same tick in which `store.contour` first becomes non-null. On that pass both subtrees are created together and `editorRef` is null when `<ContourPreview>` is built, so C-D-2's mechanism holds there. **Falsifier:** clear `localStorage` and the branch is unreachable; that is exactly the point — it is reachable only for a user who was last in edit mode. |
| **its §6 corpus gap** (add an inline-presentation-attribute colour sweep to the token census) | **ENDORSED and carried** into §8. |

---

## §7 — The F.W1 uplift ledger (the axis's explicit ask)

Break surface per `CENSUS-2026-08-03.md:102-105` / `:186` — **metric-badge ×7 files · hover-card ×2 ·
hover-popover ×2 · dock members ×3 · `ToastVariant` (hard typecheck break) · `lucide-vue-next →
@lucide/vue` ×35 · pencil-boil 0.4.1→^0.11.2.**

| surface | status for this closure | evidence |
|---|---|---|
| `./metric-badge` (removed at 7.0.0) | **NOT PRESENT** | no `Metric*` import in the subject, `CollapsibleSection.vue`, or `contourEditing.ts` |
| `./hover-card`, `./hover-popover` (removed at 5.0.0) | **NOT PRESENT** | ditto |
| dock members (`DockIconButton`, `DockDropdownTrigger`) | **NOT PRESENT** | ditto |
| `ToastVariant` (definition-absent ⇒ hard break) | **NOT PRESENT** | `useToast.ts` is not in the closure |
| pencil-boil 0.4.1 → ^0.11.2 | **NOT PRESENT** | no `useLineBoil` / `SvgFilters` in the closure |
| **`lucide-vue-next` → `@lucide/vue`** | **1 SITE — BREAKS** | `CollapsibleSection.vue:4`; 1 of 35 → i-5 |
| **`collapsible-open` / `collapsible-close`** | **REGRESSES SILENTLY** | present at `4.0.0 dist/styles/animations.css:18,29`; **absent in 7.0.0 `src/` and `dist/`** → m-9 |
| `./collapsible` subpath | **SURVIVES** | in neither ADDED-14 nor REMOVED-21 (`lane-frontend.md:458-466`); 7.0.0 still exports it |
| `.cartoon-card` shim | **RESOLVES AT BOTH PINS — and is unnecessary at both** | `cartoon-surface` relocated (F-3); `<Card surface="cartoon">` ships at 4.0.0 → M-3 |
| `cartoon-surface` **hover-lift** | **IMPROVES — removed at 7.0.0** | `src/components/card/styles.css:98-102` is three declarations → m-7 |
| `--font-serif-math` | **UNCHANGED — still undefined at 7.0.0** | one consumption, zero definitions, in all three trees → M-4 |
| `CollapsibleTrigger` a11y | **IMPROVES marginally** | 7.0.0 adds `data-slot`/`data-disclosure`, a `disclosure-trigger` class hook and `useId()`-stable `id`/`aria-controls` (`src/components/collapsible/CollapsibleTrigger.vue:30-39`). **Honest bound:** reka already emits `aria-controls`/`aria-expanded` at 4.0.0 (`reka-ui/dist/Collapsible/CollapsibleTrigger.js:29`) — stability + a styling hook, not a new guarantee |
| `transition-disclosure` caret register | **IMPROVES — new capability** | 7.0.0-only (`src/styles/utilities/btn.css:69-71`): one settle clock + arrival curve across every disclosure caret, with a documented PRM arm. Absent at 4.0.0. Adopt at F.W3; see F-1 for what this is *not* |
| `Skeleton` | **AVAILABLE ALREADY** | root barrel at 4.0.0 (`dist/components/ui/index.d.ts:31`) — M-8 is unblocked today |

**Net.** Zero break-surface members; **one** rename line; **one** silent motion regression; **three**
improve-surfaces. The component is on the cheap side of F.W1 — and B-1, M-1, M-2, M-3, M-4, M-8 are
all curable *before* the uplift, at the installed pin.

---

## §8 — Provenance against the hitherto corpus

| corpus row | this lane |
|---|---|
| `lane-fourier-r3-r6.md` **R4-9 / X-4** (substrate byte-identical at `cd26c653`) | **RELIED ON** — no staleness caveat on any `file:line` above. |
| **R3-7a** (35 Tooltip callsites / 9 consumers → F.W3) · **R3-10** (6 dynamic `:is` families → F.W4) · **R5-7** (deriver blind to native loops → F.W4) | **NOT APPLICABLE** — zero Tooltip, zero dynamic `:is`, zero `v-for` here; recorded so the F.W3/F.W4 denominators mark the absence explicitly rather than silently. Design rider: the 20 px-gutter card has room for the `#actions` slot `CollapsibleSection.vue:43` exposes and no consumer uses. |
| **R6-8** (operation leaf embeds client back-refs → F.W5) | **CONFIRMED-BY-ABSENCE**, as C-lane S-4 books it. Not re-counted. |
| `lane-frontend.md:98` roster row · `:565` the 12 SVG surfaces | **AGREE**, line count confirmed exactly. M-1 supplies what `:565` implies but does not state: none of the 12 carries a text alternative. |
| `lane-frontend.md:368` — the 3 local `components/ui/` wrappers are *"thin API-shape adapters, not shadows … the correct posture — keep"* | **CONTRADICTED for `CollapsibleSection`.** *Keep* is defensible; *no findings* is not. The wrapper contributes M-2(a) (the documented Configurator hazard), M-2(c) (unforwarded state), M-4 (the dead `cm-serif` face), m-4 (half the padding stack), m-9 (the keyframes that vanish at 7), m-10 (no DS focus ring), m-11 (the ungated JS smooth scroll) and i-5 (the lucide rename). **Eight** of this lane's 26 findings enter through a 72-line "thin adapter". |
| `lane-frontend.md:444` — `PathPreview` *"genuinely bespoke — no flag"* | **AGREE, and extended on a second axis** → M-9. The lane flagged bespoke components shadowing *glass-ui*; M-9 flags the inverse — a bespoke component shadowing **two** sanctioned local primitives. |
| `lane-frontend.md §9 item 8` — `cartoon-card` + `--viz-amber` as **held upstream carries** | **SPLIT: half CONTRADICTED, half CONFIRMED.** `--viz-amber` stands, and B-1 shows the cure never reached this surface because a literal cannot read a token. `cartoon-card` does not: `<Card surface="cartoon">` ships at 4.0.0 **and** 7.0.0 → M-3. |
| `CENSUS-2026-08-03.md §4` F.W3 — *"relay the cartoon-card + `--viz-amber` carries to the glass BH inbox"* | **RE-SCOPE BEFORE SENDING.** Send the `--viz-amber` light-token rebaseline; convert the `cartoon-card` row into an F.W4 consumer migration (21 sites / 14 files). Relaying it as written asks the producer to re-ship a shipped API. |
| `CENSUS-2026-08-03.md §3a` — five `components/visualization/` SFCs have zero glass-ui imports, incl. this one | **AGREE, with the design gloss:** zero *direct* glass-ui imports is not zero glass-ui *dependence*. This component consumes the design system entirely through one local wrapper and one local `@utility` shim — which is precisely how M-2, M-3 and M-4 stayed invisible to an import census. |
| `CENSUS-2026-08-03.md:102-105` (break surface) · `:256-258` (no test net) | **MEASURED against this closure** — §7. **New row offered to the census:** `collapsible-open`/`collapsible-close` are consumed *by name* at `CollapsibleSection.vue:61,64` and are absent at 7.0.0; add a keyframe-name resolution check to the F.W1 gate list, since no CSS gate exists (`web/package.json:6-12`). |
| the earlier draft's **§6 corpus gap** (inline-presentation-attribute colour sweep) | **ENDORSED.** `grep -rn 'stroke="hsl\|fill="hsl' web/src` is the one-line probe; it is invisible to any CSS-only token audit and it is what surfaces m-8's nine literals. |
| `challenge-C-consumption.md` **D-1** | **RE-GRADED to BLOCKER** on this axis, reconciliation at §1. |
| `challenge-C-consumption.md` **D-2** | **RELIED ON, not re-counted** — and its reachability is *restored* by §6 C-3 against the earlier draft's kill. |
| `challenge-C-consumption.md` **D-3 / D-4 / D-6 / D-7 / D-9 / D-10** | **CITED** at M-5 / i-4 / M-6+m-1 / m-2 / M-2(c) / M-3 respectively. Where this lane counts the same underlying fact it does so on a distinct design claim (framing policy, not reactivity; proportion, not arithmetic), and says so. |
| `challenge-C-consumption.md` **S-3** (*"the tri-package bump costs this component zero lines"*) | **SHARPENED** → i-5: correct for glass-ui subpaths; F.W1 is atomic and its lucide leg costs `CollapsibleSection.vue:4`. |
| `ContourEditorCanvas/challenge-D-design.md` **B-1** | **CORROBORATED** — same literal, same cascade, second consumer; its note that *"`ContourPreview.vue:45` is the tenth [instance]"* is confirmed by m-8's nine-site grep. |
| `ContourEditorCanvas/challenge-D-design.md` **M-7** (*"no empty/loading/error state — and the 62-line sibling proves the author knew the guard was required"*) | **PARTIALLY CONTRADICTED.** The 62-line sibling **is** this component, and its guards (`:12`, `:18`) produce a **silent blank**, not a state. It proves the author avoided the crash, not that the state was designed. M-8 files the same defect against the component that was cited as its counter-example. |
| `ContourEditorCanvas/challenge-D-design.md` **S-2 / S-3** (`stableBounds`; aspect-preserving padding *"correct here, and wrong in the sibling"*) | **AGREE** — the mirrors of M-5 and M-6. Not re-counted. |

---

## §9 — Superlatives (L-18 runs both ways)

**S-1 · `vector-effect="non-scaling-stroke"` is exactly right, and it is the non-obvious choice.**
`:47`. The path is emitted in **contour data space** — image-extracted coordinates of arbitrary
magnitude (`ContourEditorCanvas.vue:54` zips them straight from `props.contour.points`) — then fitted
by `meet` into 160 px. A plain `stroke-width="2"` would mean *2 data units*: a hairline on a
4000-unit contour, a blob on a 10-unit one, varying per upload. `non-scaling-stroke` pins it to 2
device px regardless of extent — the only formulation that survives an unbounded input domain. The
editor makes the same call (`:263`, `:274`). *Falsifier: show the rendered width tracking the viewBox
scale — `vector-effect` is precisely what prevents it.* **Stated limit:** it cannot rescue B-1 — a
crisp 2 px line at 1.660 : 1 is still 1.660 : 1.

**S-2 · The Y-flip is correct on both halves, and documented.** `:27-28,41`. The classic failure is to
flip the group and leave the viewBox origin positive, putting all content off-screen. This file
negates the origin — `-(maxY + pad)` — *and* flips the group, *and* says why in one line. Verify:
content spans `y ∈ [minY, maxY]`; after the flip it occupies `[−maxY, −minY]`; the viewBox covers
`[−maxY−pad, −minY+pad]`. Exact, with the intended padding at both ends, and identical in form to
`ContourEditorCanvas.vue:243` — so the two renditions cannot disagree about which way is up.
*Falsifier: work the interval arithmetic; it closes.*

**S-3 · `preserveAspectRatio="xMidYMid meet"` — the contour is never distorted.** `:38`. A preview that
stretched a shape to fill a square box would misrepresent the exact geometry the user is editing,
which is the one thing a contour editor must not do. All three SVG fitting surfaces in the repo
independently agree on this value: here, `ContourEditorCanvas.vue:235`, `PathPreview.vue:53`. Three of
three. *Falsifier: name a case where `slice` or `none` serves a shape preview better.*

**S-4 · Scoped-style restraint, in a file that had every excuse.** `:56-62` is four lines, one class,
zero `!important`, **zero `:deep()`** — against a host carrying ~180 lines of scoped CSS including a
`:deep(.configurator-stage)` override of the substrate's grid (`VisualizationView.vue:344`) and a
sibling that hand-rolls a disclosure in 35 lines (`ContourSettings.vue:340-374`). Of the twenty
non-recursive `components/visualization/*.vue`, three reach into design-system internals
(`FullscreenViewer` 3, `EquationPanel` 2, `VisualizationView` 1); this one reaches for exactly one
declaration it cannot express in utilities and stops. **This is why M-2/M-3's migrations are cheap:
nothing has to be un-picked before a primitive is swapped underneath it.** *Falsifier: count the
rules. The restraint does cost the tokenization — that is M-7 — but the discipline is real and rare
in this tree.*

**S-5 · The optical frame is uniform at 20 px on three sides, and correctly tighter to the caption.**
Four independently-authored paddings sum to: left/right `px-3` 12 + `p-2` 8 = **20 px**; bottom
`p-2` 8 + `pb-1` 4 + `py-2` 8 = **20 px**; top-to-header `py-1.5` 6 + `p-2` 8 = **14 px**. A graphic
framed evenly on three sides and held *closer to its own label than to its frame* is exactly right —
proximity groups the caption with the object, and the equal margin reads as a plate. All four values
are `rem`-derived Tailwind spacing, so the frame scales with the 768 px root-size step. **This is
where I part company with the earlier draft**, which reads the same 14/20 as an accretion defect; the
ownership half of that reading survives as m-4, the aesthetic half does not. *Falsifier: re-add the
four utilities.*

**S-6 · The reduced-motion floor is inherited correctly, and doubly.** The closure's only CSS animation
is the collapsible reveal, guarded **twice**: locally at `CollapsibleSection.vue:66-70`
(`animation: none`) and globally by glass-ui's blanket (`utilities/a11y-overrides.css:6-29`), which
additionally overrides its own `[data-allow-motion]` carve because *"accessibility is absolute"*.
There is **no ungated CSS animation anywhere in the closure** — against which the sibling lane's M-2
finds an ungated `infinite` animation on the editor's own work surface, in the same tree at the same
pin. The two live gaps are both outside CSS's reach (m-11's JS smooth scroll, m-7's 1 px translate),
which is a fair description of a discipline that is real. *Falsifier: `grep -n "animation" ` the
closure — two declarations, both gated.*

**S-7 · Zero break-surface members — corrected, and still a superlative.** Checked against the
census's enumerated set: no `metric-badge`, no `hover-card`/`hover-popover`, no dock member, no
`ToastVariant`, no pencil-boil. The closure's entire glass-ui surface is the `Collapsible` triple —
which appears in neither the ADDED-14 nor the REMOVED-21 subpath diff — plus a shim that resolves at
both pins. Against `lane-frontend.md §9 item 1` (*"[P0] the tri-package atomic bump … cannot be
decomposed"*), this component sits on the **cheap** side of the transaction. *Falsifier: name a
break-surface symbol in the closure.* **Corrected from the earlier draft's S-4:** the closure is not
*zero*-line — `CollapsibleSection.vue:4` is one of the 35 lucide renames (i-5). One line is still the
best result available.

---

## §10 — Routing, tally, and the single sentence

| finding | wave | note |
|---|---|---|
| **B-1**, m-8 | **F.W2** | one substitution (`var(--viz-amber)`) fixes the light arm here; the 8 sibling literals are the same object — mint `--contour-stroke` once, cure ten sites. |
| **M-1** | **F.W4** (blocker-adjacent) | `role="img"` + `:aria-label` with the point count, or an explicit `aria-hidden` + naming the editor. Two lines, no pin coupling. The axe gate cannot regress-test it — pair with an explicit assertion. |
| **M-2**, m-10 | **F.W3** | adopt `<ConfiguratorLayer>`; it discharges the recursion hazard, the hierarchy register, the uncontrolled state and the focus-ring gap in one move. |
| **M-3** | **F.W3 (re-scope the BH relay) + F.W4 (21-site migration)** | `<Card tier="opaque" surface="cartoon">`; do **not** relay the `cartoon-card` ask as written. |
| **M-4** | **F.W4** | one `:root` declaration for `--font-serif-math` cures 17 files; also decide `font-sans` vs `font-serif` at the shell. |
| **M-5** | **F.W4** | accept the editor's `stableBounds` — adoption, not invention. |
| **M-6**, **M-9**, m-1, m-2, m-3 | **F.W4** | the framing cluster; all five die together if the geometry is lifted from `PathPreview.vue:29-36`. |
| **M-7**, m-4, m-5 | **F.W4** | proportion + rhythm — the Aristotelian core: one owner for the box size and the vertical gap, expressed in `rem`/`%`/`min()`. |
| **M-8** | **F.W4** | empty/loading/error; reuse `CoefficientsSpectrum`'s `emptyText` idiom and the installed `Skeleton` rather than minting a fourth. |
| **m-6** | **F.W4** | either accept "shape only" and re-word the deck (i-1), or pass `showImageOverlay` through. |
| **m-7**, **m-9**, i-5 | **F.W1** | m-9 must land *with* the uplift (no gate can catch it); m-7 is a fleet-wide 21-site hover delta the wave should land knowingly; i-5 is the 1-line rename. |
| **m-11**, i-1, i-2, i-3 | **F.W4** | cleanups; i-2 (`tension`) is a `lib/` finding routed through this consumer. |
| the census addition (§8) | **F.W0** | add the inline-presentation-attribute colour sweep **and** a keyframe-name resolution check to the token/uplift census. |

**Tally.** **26 defects** — 1 BLOCKER (B-1) · 9 MAJOR (M-1…M-9) · 11 MINOR (m-1…m-11) · 5 INFO
(i-1…i-5). **7 superlatives** (S-1…S-7), each with its falsifier run. **4 candidate defects killed by
their own falsifiers** (§5), plus **1 of the predecessor's self-kills refuted** (§6 C-3). Nothing
routes to F.W5 — the closure is API-free.

**The single sentence.** The one thing this component draws, it draws at 1.660 : 1 in light mode and
without a name; and everything holding that drawing — the section chassis, the card, the typeface,
the size, the empty state — is a hand-rolled restatement of something the design system already ships
**at the pin installed today**, so six of its ten worst findings need no uplift, no producer ask, and
no coordination letter to cure.

**Method note.** Read-only throughout; this file is the only write. Probes: `cat` / `sed` / `grep` /
`find` / `ls` / `wc`, plus `node` for sRGB relative-luminance contrast arithmetic (the method the
repo's own `style.css:113-118` figure authenticates to three digits) and for the `meet`-fit gutter
algebra. No dev server, no browser, no network, no product source mutated in any repo.
