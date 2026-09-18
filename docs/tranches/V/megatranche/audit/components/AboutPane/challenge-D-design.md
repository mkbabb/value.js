# CHALLENGE-D — `demo/scenes/about/AboutPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context arm), spawned with an explicit
Opus 5 declaration. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The tranche canon already ratified a binding composition for About
(`OPTICAL-BENCH-COMPOSITIONS.md:38`, `VISUAL-CONSTITUTION.md §3.1`, `PROPORTION-AUDIT.md` PR-14).
That row names five close-conditions with exact target counts. I measured all five at HEAD
`c654824e` on the live build. **Every one of them is still at its pre-remediation value, and one is
at its pre-remediation value to the exact digit** (`repeated dividers 7→0`; measured **7**).

| Ratified close-condition (`OPTICAL-BENCH-COMPOSITIONS.md:38`) | Target | Measured at HEAD |
|---|---:|---:|
| Card `1→0` | 0 | **1** (`AboutPane.vue:2`) |
| static Alert `1→0` | 0 | **1** (`ColorNutritionLabel.vue:8`) |
| repeated dividers `7→0` | 0 | **7** |
| empty Tooltip / false trigger `1→0` | 0 | **4** |
| zero companion tier / "never returns as Picker's companion" (`:31`) | 0 | **1** (`viewSchema.ts:107`) |
| prose measure `66ch` (`:100`, `VISUAL-CONSTITUTION.md §4`) | `66ch` | `max-inline-size: none` |
| `/about` route with direct-load identity (`:31`) | 1 | **0** |

This is not a component that drifted from its spec. It is a component whose spec was written,
ratified, costed, and then never applied — while the register row that describes its defects was
left open. Everything below is the anatomy of that.

---

## Method (what I actually ran)

- Read the shipped source: `demo/scenes/about/AboutPane.vue`, `ColorNutritionLabel.vue`,
  `markdown/Markdown.vue`, `demo/shared/ui/PaneHeader.vue`, `demo/shell/usePaneRouter.ts`,
  `demo/shell/viewSchema.ts`, `demo/color-picker/router/index.ts`.
- Read the canon: `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `OPTICAL-BENCH-COMPOSITIONS.md`,
  `PALETTE-CONTRACT.md`.
- Read the tracked Safari captures:
  `megatranche/audit/visual/shots/safari-desktop-{light,dark}/picker.png`,
  `safari-mobile-light/picker.png`, and `REPORT.md`.
- Drove the **live dev server at `http://localhost:9000`** read-only with three WebKit probes
  (scripts retained at
  `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-.../scratchpad/`:
  `probe-about.mjs`, `ABD-states.mjs`, `ABD-final.mjs`). Matrices: 1440×900 light + dark,
  390×844 mobile, 720×450 (the 200%-zoom CSS-pixel arm), `forcedColors: active`,
  `reducedMotion: reduce`, `dir="rtl"`.

A note on the tracked visual audit: **`megatranche/audit/visual/capture.mjs` has no About row** —
its `ROUTES` table (`:22–38`) lists 15 paths and `/#/about` is not among them, because the route
does not exist. About is therefore visible in exactly **2 of the 60 tracked captures**
(desktop light + dark `/#/`, as the right companion) and in **0 of the 30 mobile/zoom/RTL/
forced-colors captures**. Every finding below in those matrices is new evidence.

---

## Findings

### D-1 · BLOCKER — The ratified About composition was never applied; the register row is open at its exact original numbers

**Evidence.** `OPTICAL-BENCH-COMPOSITIONS.md:38` (binding, W18-owned):

> **About** … | No `InstrumentChassis`; **no default Card/Alert/repeated divider stack** around the
> article or sections. | W18. Close on reading measure/type jurisdictions, **Card 1→0, static Alert
> 1→0, repeated dividers 7→0, empty Tooltip/false trigger 1→0** and zero companion/ornamental tier.

`OPTICAL-BENCH-COMPOSITIONS.md:72` — About's boundary inventory is literally `none`:
`| About | n/a | n/a | none | headings and interval group the structural article |`.

Measured at HEAD:

```
$ grep -n "<Separator" demo/scenes/about/ColorNutritionLabel.vue demo/scenes/about/AboutPane.vue
demo/scenes/about/AboutPane.vue:29:        <Separator />
demo/scenes/about/AboutPane.vue:46:        <Separator />
demo/scenes/about/ColorNutritionLabel.vue:15:        <Separator />
demo/scenes/about/ColorNutritionLabel.vue:40:        <Separator />
demo/scenes/about/ColorNutritionLabel.vue:68:        <Separator />
demo/scenes/about/ColorNutritionLabel.vue:90:        <Separator />
demo/scenes/about/ColorNutritionLabel.vue:146:        <Separator />
```

Live DOM count inside `.about-card`: **`separatorCountInAbout: 7`** (all three matrices,
`probe-about.mjs`). Card: `AboutPane.vue:2` `<Card tier="resting" class="about-card …">`.
Alert: `ColorNutritionLabel.vue:8` `<Alert class="m-0 bg-well border-border/30 rounded-card">`.
False triggers: live `convNodeCount: 4` — four `div.cursor-pointer` conversion-graph nodes wrapped
in `TooltipProvider`/`TooltipTrigger as-child` (`ColorNutritionLabel.vue:92–112`), non-focusable,
non-named, cursor-bearing.

**Mechanism.** The Card is used as the *page primitive*, which `VISUAL-CONSTITUTION.md §3.1`
forbids in terms — "`Card` remains semantic housing for a bounded object or specimen and **is never
the default page primitive**" — and `§5` law 1 restates it ("A page region … does not become a Card
by default"). Once About is a Card, every internal group needs a rule to separate it from the Card's
own chrome, which is where the seven dividers come from. The divider stack is *downstream of the
Card decision*; it is one defect, not five.

**Reproduction.** `node scratchpad/probe-about.mjs` → `separatorCountInAbout: 7`, `convNodeCount: 4`
in all three matrices. Source lines above.

**Cure (gestalt, not patch).** Transpose About from a Card-hosted pane to the ratified
**structural `<article>`** — `<article>` + `<section>` + the `--space-phi-5` major-section interval
from PR-35 (`OPTICAL-BENCH-COMPOSITIONS.md:100`). The Card, the Alert, all seven Separators and the
four Tooltip shells delete in that one move; interval and heading rhythm carry the grouping, which
is what `:72` says they are for. Do **not** delete the dividers while keeping the Card — that
inverts the causality and will regrow them.

---

### D-2 · BLOCKER — About is Picker's companion, which the canon abrogates by name

**Evidence.** `demo/shell/viewSchema.ts:104–112`:

```ts
picker: {
    left: "color-picker",
    right: "about",          // ← here
    label: "Home",
    rightLabel: "About",
```

`OPTICAL-BENCH-COMPOSITIONS.md:31`: "About occupies the quiet trailing information position and
**never returns as Picker's companion**." `VISUAL-CONSTITUTION.md §3.1`: "**About is a quiet
trailing destination rather than Picker's companion**"; the composition table gives About
`no synthetic companion` and outer housing `structural article, no default Card`.

**Mechanism.** `viewSchema` is the one table that decides pane topology, and About's row was never
moved out of `picker`. `usePaneRouter.ts:89` (`if (name === "about") return AboutPane;`) and
`:146–152` (`rightProps("about")`) are the two live consumers.

**Reproduction.** Load `http://localhost:9000/#/` at 1440×900. Two cards, side by side, equal width.
Tracked frame: `megatranche/audit/visual/shots/safari-desktop-light/picker.png`.

**Cure.** Move About to its own `ViewId` + route (see D-3); `viewSchema.picker.right` becomes
`null`, which is also what unblocks D-4 (Picker can then take its golden 61.8% instead of 49%).

---

### D-3 · BLOCKER — About has no URL. It cannot be linked, reloaded, back-buttoned, or announced

**Evidence.** `demo/color-picker/router/index.ts:21–36` — the full route table. There is **no
`/about` entry**. `OPTICAL-BENCH-COMPOSITIONS.md:31`: "The route inventory is exactly `/` Picker …
and **`/about` About**. Each has **one first-class Dock affordance and direct-load identity**."

Measured (`ABD-final.mjs`, 390×844 WebKit, `isMobile: true`):

```json
"mobileBefore":  { "about": false, "hash": "#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)" },
"mobileAboutControlCount": 1,
"mobileAfter":   { "about": true,  "hash": "#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)" }
```

**The hash is byte-identical before and after About is shown.** 7 993 px of scrollable
documentation appears and the URL does not move.

**Mechanism.** About's visibility is `viewManager.mobilePaneIndex` — a ref, not a route. The only
control that mutates it is the dock's pane segmented control (`Picker | About`), visible in
`scratchpad/ABD-zoom200.png`. `VISUAL-CONSTITUTION.md §3` law 6 **abrogates that control**: "no
global pane selector, left/right split state, or simultaneous two-stage miniature survives", and
`§4.2` repeats it: "**V retires the global Dock `PaneSegmentedControl` and left/right view state.**"

So the sole affordance that reaches About is the one the canon deletes, and the replacement the
canon mandates (`/about`) does not exist. **On the day `PaneSegmentedControl` is retired as ruled,
About becomes structurally unreachable.** That is the defect: not "About lacks a route" but "About's
reachability is load-bearing on an abrogated mechanism."

Consequence against `VISUAL-CONSTITUTION.md §5.1`, row *direct URL or reload*: the required
"destination `<title>` and the single visible H1 exist before app-ready" is unsatisfiable for About
— there is no destination.

**Reproduction.** `node scratchpad/ABD-final.mjs`; compare `mobileBefore.hash` to `mobileAfter.hash`.

**Cure.** Add `{ path: "/about", name: "about", component: Stub }` + a `ViewId` whose `left` is
About and whose `right` is `null`; delete the pane-index path for About. This is the same edit that
retires the pane selector, so D-2/D-3/D-15 close together.

---

### D-4 · MAJOR — The two-part scene is 49.1 / 49.1, not the golden 61.8 / 38.2 the composition law fixes exactly

**Evidence.** Measured rects at 1440×900 (`probe-about.mjs`, identical light and dark):

```
pickerRect  x=199   w=512   (199 … 711)
aboutRect   x=729   w=512   (729 … 1241)
gap 18px · total stage 199 … 1241 = 1042px
protagonist share = 512 / 1042 = 49.14 %
```

`VISUAL-CONSTITUTION.md §3` law 1: "A P122 instrument chooses **exactly** `golden`
(`61.8033989% / 38.1966011%`) or `preview-dominant` (`66.6666667% / 33.3333333%`); the
display-rounded protagonist law is **61.8–66.7%**." §3.1's Picker row: "exact golden inspector
38.1966011%".

**Measured 49.14%. The floor is 61.8%. Deficit 12.66 percentage points.** The optical color stage
— the product's declared protagonist (`§1`: "Each screen therefore has one dominant instrument") —
is not dominant. It is exactly tied with a documentation reader.

`§3` law 8 is the same violation stated perceptually: "One pane may have one full-strength visual
protagonist. Supporting fixtures do not compete with it through equal size or equal shadow." In
`safari-desktop-light/picker.png` the two cards are equal width, equal corner radius, equal cast
shadow, equal material tier. The About card is in fact **larger** (774 px vs 685 px tall) and
starts **higher** in the frame than the instrument it is supposed to support.

This is `PROPORTION-AUDIT.md` **PR-04** ("Empty/equal companion Cards and nested housing —
**REMOVE** — Primary W18") measured live and still open.

**Reproduction.** `node scratchpad/probe-about.mjs`, `desktop-light.pickerRect` /
`desktop-light.aboutRect`.

**Cure.** D-2's cure resolves this by subtraction, not by re-tuning a ratio: with `right: null` the
Picker takes the stage and About goes to its own route where it is the protagonist. Re-splitting
512/512 into 644/398 would keep the companion the canon forbids.

---

### D-5 · MAJOR — The two cards are misaligned on both edges by ~44.6 px; neither edge relation is designed

**Evidence.** Same probe, 1440×900:

```
about  top 103    bottom 877    height 774
picker top 147.5  bottom 832.23 height 684.73
Δtop = 44.5 px      Δbottom = 44.77 px
```

The About card is `h-full` (`AboutPane.vue:4`) and stretches its slot; the Picker is auto-height and
centres. The result is a pair that is **neither top-aligned, nor bottom-aligned, nor optically
centred** — the two 44.6 px overhangs read as a mistake rather than a relation, and they are the
first thing the eye lands on in `safari-desktop-light/picker.png`.

`PROPORTION-AUDIT.md §1`: "Every element earns its scale, interval, boundary and material from its
job relative to the local protagonist." A 44.5 px overhang above the protagonist's cap line is not
earned; it is `h-full` meeting `align-items: center` and nobody looking at the frame.

**Reproduction.** As above. Visible in the tracked Safari captures, both schemes.

**Cure.** Dies with D-2.

---

### D-6 · BLOCKER — The sticky pane header does not occlude. Body ink at `opacity: 1` prints through it

This is the ugliest thing on the surface and no code read produces it.

**Evidence.** `scratchpad/ABD-scroll420.png` (crop of the About card at `scrollTop = 420`,
1440×900 light, WebKit): the header line **"About the color / spaces, *Lab* ⌄"** is drawn directly
on top of the body rows **"Gamut: Unlimited"** and **"Created: 1976"**. The word *Created:* is
bisected by *spaces,* — both glyph layers are simultaneously readable.

Measured (`ABD-final.mjs`, elements intersecting the sticky header band, with their computed
opacity):

| scrollTop | header band | veil `::before` opacity | elements intersecting at `opacity: 1` | max overlap |
|---:|---|---:|---:|---:|
| 0 | 104 → 240.6 | 0.52 | 0 | — |
| 120 | 104 → 240.6 | **1** | **2** (`Definition`, the definition sentence) | 40.0 px |
| 420 | 104 → 240.6 | **1** | **8** (`Gamut:`, `Unlimited`, `Created:`, `1976`, `Components`, …) | 30.5 px |
| 900 | 104 → 240.6 | **1** | **6** (`Lab`, `XYZ`, `OKLab`, `LCh`, `OKLCh`, `Lab`) | 35.9 px |

Every one of those has computed `opacity: 1` and full ink `rgb(28, 25, 23)`.

**Mechanism — and it is a design decision, not a bug.** The occluder is
`.pane-header::before` (`PaneHeader.vue:82–98`), whose fill is measured as
`color(srgb 0.994 0.96 0.926 / 0.65)` with `backdrop-filter: blur(7px) saturate(1.4)`.
The animation scrubs `opacity` 0.52 → 1 over 0–64 px — **but the fill's own alpha is 0.65.** At
`opacity: 1` the layer is still 65% opaque, so 35% of whatever is behind it transmits, forever.
No value of the animated property can make a 0.65-alpha paint opaque. The choreography is
scrubbing the wrong quantity.

The `backdrop-filter` blur that would rescue it is defeated by the host: `.pane-scroll-fade` sets
`contain: layout style paint` (`PaneHeader.vue:54–57`), measured live as `contain: content`, which
makes the pane its own paint-containment root — the backdrop the filter samples is the contained
subtree, not a smeared plate. The header comment at `:158–163` asserts this was cured
("O-11 gate 3, the F2 double-exposure cure"); the rendered frame says it was not.

Second half of the same defect, visible in the same crop: the mask fades content the header does
**not** cover. At `scrollTop = 420` the `Components` heading and the `L* / a* / b*` component names
sit *below* the header band and are washed to near-illegibility, while `Gamut: Unlimited` sits
*inside* the band at full ink. **The fade band and the occlusion band are not the same band.** The
treatment erases live content and preserves colliding content — exactly backwards.

**Reproduction.**
```
node scratchpad/ABD-final.mjs      # occlusion table above
# or: open /#/, scroll the About card to 420, read scratchpad/ABD-scroll420.png
```

**Cure.** A scrolling document does not get a translucent sticky cap. Either (a) the header is
opaque at the plate tone from frame zero and the scrub carries only elevation/size — an honest
occluder — or, preferably under D-1/D-2, (b) About becomes a document-scrolling article with **no
sticky header at all**, which is what `VISUAL-CONSTITUTION.md §3` law 6 already mandates for the
narrow arm ("one document-scrolling stage→inspector→action sequence") and what the "quiet trailing
destination" framing implies for the wide one. The double exposure, the mismatched fade band and
the 8 000 px nested scroller (D-7) all die in (b).

---

### D-7 · MAJOR — The header band never contracts; it permanently eats 17.7% of the pane, and shrinks its own title below the body's

**Evidence.** Measured header rect at four scroll offsets: `{top: 104, bottom: 240.6, h: 136.6}` —
**identical at 0, 120, 420 and 900 px of scroll.** The scrub animates `transform: scale()` on the
title (`PaneHeader.vue:205–212`), and `transform` does not affect layout, so the band is fixed.

Against `clientHeight = 772`, the band is **136.6 / 772 = 17.7%** of the visible pane, permanently.

`VISUAL-CONSTITUTION.md §3` law 5: "**A header contracts as a whole block.** At rest it breathes;
when stuck, **title, padding, and band all take the compact token step.**" Measured: title takes the
step (scale → `--pane-title-shrink-ratio` ≈ 0.618); padding and band do not. One of three.

**And the shrink inverts the hierarchy.** In `ABD-scroll420.png` the scrubbed header title renders
at ~15 px while `Components` (20.35 px), `Key Properties` and the 16.4 px body rows are all larger.
The pane's identity line becomes the **smallest type on the pane** at the moment it is most needed.
`PROPORTION-AUDIT.md §5` law 13's role matrix has no rung where instrument identity is smaller than
prose.

**Reproduction.** `node scratchpad/ABD-final.mjs`, compare `scroll_0.headerRect` …
`scroll_900.headerRect`.

**Cure.** If a sticky header survives at all (it should not — D-6), contract the *block*: animate
`block-size`/padding to the compact token step in one producer-owned rule so the band returns the
space it stops using, and floor the title at the section-heading rung so it never goes under the
prose it caps.

---

### D-8 · BLOCKER — 7 of 18 color spaces render "Detailed Guide" as a heading over a void, and the designed error state is unreachable

**Evidence.** The live option list from the About title selector (`ABD-states.mjs`, `out.options`)
has **18** entries. `AboutPane.vue:81–93` `markdownModules` has **11** keys.

Missing: `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `ictcp`, `jzazbz`
— **7 of 18 = 38.9%.**

Selecting *Display P3* live:

```json
"afterDisplayP3": {
  "title": "About the color spaces, Display P3",
  "guideHeadingPresent": true,
  "guideBodyChars": 0,          ← the section is empty
  "guideSectionHeight": 133.1,  ← 133 px of heading + padding, no content
  "markdownMounted": false,
  "ohSnapAlert": false,         ← the designed fallback did not render
  "scrollH": 1250               ← was 8023; 84% of the pane silently vanishes
}
```

Frame: `scratchpad/ABD-display-p3-guide.png` — a 33 px bold Fraunces **"Detailed Guide"** sitting at
the bottom of the card with nothing under it. It is the terminal element, so the pane reads as
truncated/broken.

**Mechanism — two compounding decisions.**

1. `AboutPane.vue:96–98`:
   ```ts
   const activeMarkdownModule = computed(() =>
       markdownModules[model.value.selectedColorSpace as MarkdownSpace],
   );
   ```
   The `as MarkdownSpace` cast is the whole defect. `markdownModules` is typed
   `Record<MarkdownSpace, DocModule>` where `MarkdownSpace` is a **hand-written 11-member union**
   (`:79`) rather than the domain's `DisplayColorSpace`. Typing it `Record<DisplayColorSpace,
   DocModule>` would make `tsc` enumerate the seven missing docs at build time. The local union +
   cast exists to silence exactly that error.
2. `AboutPane.vue:50–56`: `<Markdown v-if="activeMarkdownModule" …>`. Markdown.vue **has** a designed
   empty state — the "Oh snap… We couldn't find the documentation for the selected color space."
   `Alert` at `Markdown.vue:19–29`. The host's `v-if` guarantees it never mounts. Measured
   `ohSnapAlert: false`. **A designed state rendered dead by its only consumer.**

The `<h2>Detailed Guide</h2>` at `:49` sits *outside* the `v-if`, so the promise is unconditional
and the delivery is not.

**Reproduction.** `/#/` → About title selector → *Display P3* (or sRGB Linear / Adobe RGB /
ProPhoto RGB / Rec. 2020 / ICtCp / Jzazbz) → scroll to the bottom of the About card.

**Cure.** Type the map `Record<DisplayColorSpace, DocModule>` so the compiler enumerates the hole,
then close it honestly — either author the seven missing docs, or make the section a real state
machine (`content | not-yet-documented`) that renders Markdown.vue's existing empty state instead of
a heading over a void. Never a heading whose body is conditional.

---

### D-9 · BLOCKER — 5 of 18 spaces are described with **RGB's facts** under their own name. The pane lies.

**Evidence.** `ColorNutritionLabel.vue:210–215`:

```ts
const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;          // ← silent masking fallback
});
```

`colorSpaceInfo` has 13 keys (`rgb hsl hsv hwb lab lch oklab oklch xyz kelvin ictcp jzazbz hex`).
Missing: `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020` — **5 of 18**.

Frame `scratchpad/ABD-display-p3-guide.png`, title reads **"About the color spaces, Display P3"**,
and directly beneath it:

- Components: **Red / Green / Blue**, `0 to 1`
- Key Properties: Perceptual Uniformity **No**, Hue Linearity **No**, Lightness Separation **No**
- Conversion Graph: **RGB → XYZ**, **RGB → Kelvin**, **RGB → HSL**, **RGB → Hex**

Every one of those is sRGB's row, presented as Display P3's, with no annotation, no qualifier, and
no visual distinction from the 13 truthful rows. A reader cannot tell the difference.

**Mechanism.** A `? :` fallback to a default record — precisely the pattern owner edict #2 forbids
("no masking fallbacks"). It converts a *missing-data* state into a *wrong-data* state, which is
strictly worse: missing data is visible, wrong data is not.

`VISUAL-CONSTITUTION.md §7`, palette section, states the general law for this product: "The closed
attribution union is visual truth… **absence is never filled by inference.**" This is absence filled
by inference, in the one pane whose entire job is being right about color science.

**Reproduction.** `/#/` → About selector → *Display P3* / *Adobe RGB* / *ProPhoto RGB* /
*Rec. 2020* / *sRGB Linear*. Read the Conversion Graph against the title.

**Cure.** Delete the fallback. `colorSpaceInfo` becomes `Record<DisplayColorSpace, ColorSpaceInfo>`
so the five holes are compile errors, and they are filled with real data. There is no third option
here — a pane that documents color spaces may not guess.

*(`ColorNutritionLabel` has its own audit seat; recorded here because `AboutPane.vue:43` is its sole
host and the lie is only visible in this composition, under this title.)*

---

### D-10 · MAJOR — The heading outline is inverted: zero `h1`, the largest heading is an `h3`, and three different sizes share the level `h2`

**Evidence.** Live heading census on `/#/` (`probe-about.mjs`, `desktop-light.headings`):

```
h1 count on the route: 0        (REPORT.md confirms h1 = 0 for all 60 tracked captures)

H3  "About the color spaces, Lab"  41.888 px  Fraunces   ← AboutPane's identity line
  H2  "Basic Information"          20.352 px  Fraunces
  H2  "Components"                 20.352 px  Fraunces
  H2  "Key Properties"             20.352 px  Fraunces
  H2  "Conversion Graph"           20.352 px  Fraunces
  H2  "Usage"                      20.352 px  Fraunces
  H2  "Detailed Guide"             32.928 px  Fraunces   ← AboutPane.vue:49
    H3  "Attributes"               24 px      Fraunces
    H2  "Key Characteristics"      30 px      Fraunces   ← from the .md
```

Three defects in one census:

1. **`h1` = 0.** `VISUAL-CONSTITUTION.md §4.1`: "Each route has **one H1** and exactly one stable
   main landmark, owned by the shell." Not satisfied on any route; About is the pane that most
   obviously needs one (`§3.1` gives About "typographic product argument" and `§4` maps
   "route H1 or major argument → `text-display`").
2. **An `h3` parents six `h2`s.** `PaneHeader.vue:21` emits `<h3 class="pane-header-title">`, and it
   renders at 41.888 px — the largest text in the card — above `h2`s at 20.352 px. The document
   outline runs backwards.
3. **`h2` renders at 20.352 / 30 / 32.928 px** — three sizes, one semantic level, three different
   producers (`text-subheading` in ColorNutritionLabel, `text-3xl` in Markdown.vue,
   `text-title` in `AboutPane.vue:49`). A reader cannot infer depth from size because size does not
   track depth.

**And all of them are Fraunces.** `OPTICAL-BENCH-COMPOSITIONS.md:104` (binding across `ALL18`):
"**section headings → `text-heading` + Plus Jakarta Sans**"; `VISUAL-CONSTITUTION.md §4` and
`PROPORTION-AUDIT.md §5` law 13 say the same, and law 13 adds "Fraunces owns display/identity, Plus
Jakarta Sans owns headings/prose/controls". Measured font-family for **every** section heading in
the About body: `Fraunces`. `AboutPane.vue:49` writes it explicitly: `class="font-display text-title"`
— the display family and the *identity* rung, on a section heading.

**Reproduction.** `node scratchpad/probe-about.mjs`, `desktop-light.headings` / `h1Count`.

**Cure.** One outline: shell `<h1>` owns the route identity at `text-display`; About's sections use
`<h2>` at `text-heading` + Plus Jakarta Sans (one size, one family); the markdown body's `h2/h3` map
onto `text-heading`/its adjacent rung rather than raw `text-3xl`/`text-2xl` Tailwind sizes. The pane
title stops being an `h3` that outranks everything below it.

---

### D-11 · MAJOR — The `66ch` prose measure does not exist; today's measure is an accident of the companion column

**Evidence.** `VISUAL-CONSTITUTION.md §4`: "**About prose has `max-inline-size: 66ch`**; only the
named `Conversion paths` ordered graph and fenced code specimens may escape that prose measure."
Restated at `§7` and at `OPTICAL-BENCH-COMPOSITIONS.md:100` ("About prose is capped at `66ch`").

Measured (`probe-about.mjs`, six sampled `.markdown-body > p`, all three matrices):

```
maxInlineSize : "none"          ← on every paragraph
.markdown-body max-width : "100%"
rendered      : 462 px = 49.5ch
```

Source: `Markdown.vue:100–104` — `.markdown-body { @apply max-w-full; }`. The declared intent is the
exact opposite of the law.

**Mechanism.** The prose currently measures 49.5ch only because the companion column is 512 px wide.
That number is produced by D-2/D-4 — the very defects that must be fixed. **The moment About becomes
the full-width route the canon mandates, the same CSS yields ≈ 1 300 px ≈ 140 ch.** The measure is
not merely unbounded, it is unbounded *and* currently masked by a second defect; fixing D-2 without
fixing this makes the reading experience worse.

**Reproduction.** `node scratchpad/probe-about.mjs` → `measure[*].maxInline === "none"`,
`mdBodyMaxWidth === "100%"`.

**Cure.** `max-inline-size: 66ch` on the article's prose flow (not per-element), with the two named
escapes (`Conversion paths` graph, fenced code) opting out via a single `:where()` exemption.

---

### D-12 · MAJOR — In dark mode the interactive title-selector becomes optically identical to the sentence around it (2.41:1 → 1.09:1)

**Evidence.** Measured computed colors on the inline `ColorSpaceSelector` trigger inside the About
title vs. the surrounding title ink (`probe-about.mjs`):

| scheme | trigger ink | title ink | contrast between them |
|---|---|---|---:|
| light | `color(srgb 0.665034 0 0.261497 / .86)` | `rgb(28, 25, 23)` | **2.41 : 1** |
| dark | `color(srgb 1 0.924654 0.933001 / .86)` | `rgb(233, 230, 226)` | **1.09 : 1** |

(WCAG relative-luminance ratio between the two inks; the pair is the *affordance signal*, not a
legibility ratio.)

Confirmed visually against the tracked captures: in `safari-desktop-light/picker.png` the word
*Lab* in "About the color spaces, **Lab**" is unmistakable magenta against near-black. In
`safari-desktop-dark/picker.png` it is the same near-white as the rest of the sentence. The only
remaining affordance is a ~12 px chevron.

**Mechanism.** The design encodes "this word is a control" entirely in hue. The accent resolver
lands near-white at the dark pole, so the encoding has no headroom there. `VISUAL-CONSTITUTION.md
§4.1`: "Selected, failed, pending, withdrawn and disabled states are **never color-only**" and
"Text, focus, boundaries and state meet their **rendered** contrast on the actual material tier; a
token name is not evidence." The token is present in both schemes; the *rendered* separation is not.

**Reproduction.** `node scratchpad/probe-about.mjs`; compare `desktop-light.triggerColor`/
`titleColor` to `desktop-dark.triggerColor`/`titleColor`. Or read the two tracked picker PNGs.

**Cure.** Give the trigger a non-chromatic second channel that survives both poles and forced
colors — the glass-ui select-trigger seat (border/underline/pressed geometry) rather than a bare
colored word. This is also the glass-ui-first cure (D-14).

---

### D-13 · MAJOR — The title is a run-on English sentence with a control embedded in it; it disintegrates in RTL, and numerics are not LTR-isolated

**Evidence.** `AboutPane.vue:15–27` composes `PaneHeader`'s slot as prose with an inline control:

```
About the color spaces,   <ColorSpaceSelector inline />
```

Under `dir="rtl"` (`scratchpad/ABD-rtl.png`, 1440×900 WebKit) it renders:

```
About the color
Lab ⌄  ,spaces
```

The comma detaches to the wrong side and the control lands mid-sentence. The composition depends on
LTR word order to be grammatical.

Same frame, the Components row renders `to 125 125-` and `to 100% 0%` — the ranges reverse and the
minus sign orphans to the right of its number. Measured on sampled `<code>` elements in the About
body (`ABD-final.mjs`):

```json
"code": [ { "tag": "CODE", "dir": "rtl", "uni": "normal", "t": "L*" }, … ]
```

`direction: rtl`, `unicode-bidi: normal` — **zero isolation.**

`VISUAL-CONSTITUTION.md §6.1`: "CSS strings, hex, slugs, IDs and provenance | **render in
LTR-isolated spans inside RTL prose**". `§5.2`: "numeric/scientific sign **never mirrors**".

**Reproduction.** `node scratchpad/ABD-final.mjs` → `out.rtl`; frame `scratchpad/ABD-rtl.png`.

**Cure.** The identity line is `About` + a labelled space control, not a sentence with a control
inside it — that removes the direction fragility at the root. Separately, wrap code/range/value
spans in `unicode-bidi: isolate; direction: ltr` at the producer.

---

### D-14 · MINOR — Motion: the loading skeleton depicts an avatar and two lines where a 6 851 px article will land, and `:key` guarantees the swap

**Evidence.** `AboutPane.vue:50–53`:

```html
<Markdown v-if="activeMarkdownModule" :key="model.selectedColorSpace" … />
```

`:key` forces a full unmount/remount of the Markdown subtree on every space change. The remounted
component starts at `isLoading = true` (`Markdown.vue:57`), whose branch is (`Markdown.vue:3–9`):

```html
<Skeleton class="h-12 w-12 rounded-full" />   <!-- a 48px circle -->
<Skeleton class="h-4 w-full" /> <Skeleton class="h-4 w-full" />   <!-- two lines -->
```

Measured article geometry it stands in for: `guideSectionHeight: 6851.2 px`
(`ABD-states.mjs`, OKLCh). The skeleton is ~64 px tall. **The placeholder misrepresents the content
by two orders of magnitude, and it draws an avatar for a document that has none** — so the
transition is a full-height collapse and re-expansion of the pane, not a fill.

`VISUAL-CONSTITUTION.md §6`: "A scene swap preserves the specimen and changes the surrounding
instrument. **No full-slab remount hole**, rAF-delayed blank, or dock collapse."

**Reproduction status — HYPOTHESIS for the visible blank, CONFIRMED for the shape.** I could not
photograph the blank frame: `ABD-final.mjs` sampled at 0/16/33/66/120/300 ms after a space change
and found `md: true, guideChars: 4041` at every sample, because Vite's dev server had the `.md`
chunk in module cache. The *shape* mismatch and the `:key` remount are confirmed by source and by
the measured 6 851 px vs ~64 px. The blank is reproducible in principle on a cold production
chunk fetch; I am labelling it a hypothesis rather than claiming a frame I did not capture.

Also in this family (CONFIRMED, INFO): **zero `prefers-reduced-motion`, `forced-colors` or
`prefers-contrast` blocks exist anywhere under `demo/scenes/about/` or in `PaneHeader.vue`** —
```
$ grep -rn "forced-colors\|prefers-reduced-motion\|prefers-contrast" demo/scenes/about/ demo/shared/ui/PaneHeader.vue
(no output)
```
The scroll *scrub* is legitimately exempt (position-mapped, per `PaneHeader.vue:149–151`), but
`Markdown.vue:124` `transition: color var(--duration-slow) var(--ease-standard)` on every heading and
`ColorNutritionLabel.vue:105` `transition-colors` on the graph nodes are time-based and ungated.
Under `forcedColors: active` the About card still paints author colors
(`card.bg: oklab(0.943611 …)`, `sep0.bg: color(srgb 0.11 0.098 0.09 / 0.22)`) and its 0.22-alpha
separators have no forced-colors treatment — though WebKit's forced-colors emulation is weak, so I
record the missing rules (grep, definitive) rather than the render.

**Cure.** Drop `:key` and let the module swap inside a stable instance; if a pending state is needed,
it must be an article-shaped one at the article's own reserved height. Add the forced-colors
treatment at the producer, not per instance.

---

### D-15 · MAJOR — About disappears entirely at 200% browser zoom

**Evidence.** `ABD-states.mjs`, 720×450 (the CSS-pixel arm of 200% zoom on a 1440×900 display):

```json
"zoom200": { "present": false }
```

`.about-card` is **not in the DOM**. Frame `scratchpad/ABD-zoom200.png` shows the picker alone, with
a `Picker | About` segmented control in the dock as the only recovery path — the control
`VISUAL-CONSTITUTION.md §3` law 6 / `§4.2` retire. And because of D-3 there is no URL to restore it.

The canon requires the 400%-zoom arm as a first-class evidence viewport in five separate places
(`PROPORTION-AUDIT.md §2.2`, `§4` seed rows PR-01/PR-03/PR-15, `VISUAL-CONSTITUTION.md §3.2`, `§4`,
`OPTICAL-BENCH-COMPOSITIONS.md:100`). About fails the 200% arm; the 400% arm is worse by
construction.

**Reproduction.** `node scratchpad/ABD-states.mjs` → `out.zoom200`.

**Cure.** D-3's route. A destination with a URL cannot be zoomed out of existence.

---

### D-16 · MINOR — Two `ColorSpaceSelector` instances on one screen, both owning the same selection

**Evidence.** Live count on `/#/` desktop (`ABD-final.mjs`): `selectorInstances: 2` — the Picker's
title selector and About's inline title selector, both bound to `model.selectedColorSpace`, both
visible simultaneously in `safari-desktop-light/picker.png`.

`PROPORTION-AUDIT.md` **PR-06**: "Three adjacent action species or **duplicated selected fills** —
**REMOVE** — … **One action/selection owner**". `VISUAL-CONSTITUTION.md §1`: "one primary action
instrument" per screen.

**Mechanism.** The duplication exists *because* About is Picker's companion (D-2). On its own route
About needs its own selector and the Picker's is offscreen — one owner per screen, automatically.

**Cure.** Dies with D-2.

---

### D-17 · INFO — Dead utility and an `any` at the type seam

- `AboutPane.vue:4` — `w-full mx-auto`: `mx-auto` is inert at `width: 100%`. Dead class.
- `AboutPane.vue:25` — `@update:model-value="(colorSpace: any) => …"`. The `any` here and the
  `as MarkdownSpace` at `:97` are the two casts that let D-8's seven-space hole compile.
- `AboutPane.vue:31–41` — a 11-line comment explaining that a `py-*` utility once silently lost the
  cascade. The explanation is correct and the fix is correct, but a padding rule that needs eleven
  lines of prose to stay correct is a producer defect being annotated in a consumer. Booked as INFO;
  it belongs to the glass-ui `cn` conflict-resolution seam, not to this component.
- Compliment where earned: the file is genuinely idiomatic Vue 3.5 (`defineModel`, reactive props
  destructure in the children, `import type` throughout — `verbatimModuleSyntax` clean), it is ~100
  lines, and it is not a god module. **Nothing in this report is an owner-edict violation of #1
  (god modules), #3 (contrivance) or #7/#8 (Vue 3.5 / `verbatimModuleSyntax`).** The defects are
  #2 (masking fallback, D-9), #4 (design-system boundary, below), #5 (root-level styling, below),
  and the canon.

---

## The design-system boundary

`AboutPane` does not hand-roll a glass-ui primitive, and that is to its credit. The boundary defects
are the inverse — it reaches for glass-ui primitives whose *semantics* are wrong for the job, then
corrects them per instance:

| Site | Primitive used | Why it is the wrong reach |
|---|---|---|
| `AboutPane.vue:2` | `Card` | Used as a page primitive. `VISUAL-CONSTITUTION.md §3.1` forbids it in terms; the ratified About housing is a structural article. |
| `ColorNutritionLabel.vue:8` | `Alert` | A static definition is lead copy, not an alert. `PROPORTION-AUDIT.md` PR-14 disposition `Alert 1→0`. |
| `ColorNutritionLabel.vue:92–112` | `Tooltip` + `cursor-pointer` `div` | A false trigger around ordered data. PR-14 `empty Tooltip/false trigger 1→0`. |
| `AboutPane.vue:49` | `font-display text-title` on an `<h2>` | Per-instance type override of a role the closed matrix already assigns (`text-heading` + Plus Jakarta Sans). Owner edict #5: style at the root, not per instance. |
| `ColorNutritionLabel.vue:8` | `class="m-0 bg-well border-border/30 rounded-card"` | Four per-instance corrections to make an `Alert` stop looking like an `Alert`. When a component needs four overrides to read correctly, it is the wrong component. |

`PALETTE-CONTRACT.md` is the palette *API/domain* authority (routes, session, export bytes) and has
no About-facing clause; I read it and it does not govern this surface. Recorded so the negative is
on the record rather than assumed.

---

## State coverage

Enumerated exhaustively. **Designed** = a state the code and the canon both account for.

| State | Handled? | Evidence |
|---|---|---|
| populated (11 documented spaces) | **yes** | measured `guideBodyChars: 4041`, `scrollH: 8023` |
| populated (7 undocumented spaces) | **NO — heading over a void** | D-8, `guideBodyChars: 0` |
| content wrong-but-plausible (5 RGB-masked spaces) | **NO — silently wrong** | D-9 |
| loading | **shape-wrong** | D-14, 64 px skeleton for 6 851 px article |
| error / doc missing | **designed but unreachable** | D-8, `ohSnapAlert: false`; `Markdown.vue:19–29` is dead code from this host |
| empty | n/a — the pane has no empty arm | — |
| overflowing | **partial** | 8 023 px in a 772 px scroller = **10.4 screens**; nested, contained, capped by a non-occluding sticky header (D-6) |
| truncated | **NO** | the "Detailed Guide" void reads as truncation (D-8) |
| scrolled | **BROKEN** | D-6 (double exposure, 8 elements) + D-7 (band never contracts) |
| hovered | partial | conversion nodes hover `bg-accent/50`; they are not controls (D-1) |
| focused | **not verifiable here** | no focusable element in the About body except the title trigger; no focus-visible rule in `demo/scenes/about/` |
| pressed / active / selected / disabled / dragging | n/a — no controls | — |
| dark | **degraded** | D-12 (affordance 1.09:1) |
| RTL | **BROKEN** | D-13 (title disintegrates; `-125` mirrors) |
| reduced-motion | **partial** | scrub exempt by construction; two ungated color transitions (D-14) |
| forced-colors | **unhandled** | zero `@media (forced-colors: active)` rules; 0.22-alpha separators |
| zoomed 200% | **ABSENT** | D-15, `present: false` |
| mobile | **URL-less** | D-3, hash unchanged; 7 993 px in 730 px = 10.9 screens |
| direct URL / reload | **IMPOSSIBLE** | D-3, no `/about` route |

**Nine of twenty-one states are broken, absent, or actively misleading.** Five of those nine
(undocumented, RGB-masked, zoomed, direct-URL, mobile-URL) have *never been captured* by any tracked
frame, because the visual-audit route table cannot reach a surface that has no route.

---

## Proportion and seat law — judgment

Against `PROPORTION-AUDIT.md §5`:

- **Law 1** ("A Card houses one bounded object/specimen… a page region does not become a Card") —
  **VIOLATED**, D-1.
- **Law 2** ("one protagonist, one identity line, at most one persistent action/status region") —
  **VIOLATED**: five equal-weight `<section>`s plus a markdown document, no protagonist.
- **Law 4** ("A divider is retained only when grouping would be ambiguous without it") —
  **VIOLATED ×7**, D-1. Each of the seven separates blocks that spacing already separates.
- **Law 5** ("A small icon/mark is either data, status, labeled action, drag affordance, focus
  register or removed") — **VIOLATED ×4**: the conversion nodes are cursor-bearing, tooltip-wrapped,
  unnamed, non-focusable.
- **Law 6** ("Subtraction precedes explanation") — **VIOLATED**: the four tooltips explain content
  that should have been ordered data.
- **Law 8** ("Real rendered relation wins over token intent") — this is the report's spine. Every
  claim above is a measured rect, a computed style, or a photographed frame.
- **Law 13** (the closed type role matrix) — **VIOLATED**: `text-title` on a section heading,
  Fraunces on every section heading, three sizes on one level, `text-3xl`/`text-2xl` raw Tailwind
  sizes in the markdown body. D-10.

`PROPORTION-AUDIT.md §6`: "W18 cannot complete while any register row lacks a terminal verb/owner."
PR-14 has both. It has simply not been executed, and the component has shipped through W40–W45 and
the whole of V′ in that state.

---

## Strongest defect

**D-1 + D-2 + D-3 are one defect.** About was ratified as a *quiet trailing route* — a structural
article with its own URL, its own H1, a 66ch measure, no Card, no Alert, no dividers, no companion.
What ships is a Card-in-a-companion-pane with seven dividers, an Alert, four false triggers, no
route, no H1, and an unbounded measure, whose only reachability mechanism the same canon abrogates.

The mechanism is not carelessness. It is that **About is the only member route in the eleven-member
inventory that was never given a route**, so it was never captured by the visual audit, so it never
appeared in a defect table, so nobody had to look at it. `capture.mjs:22–38` proves the loop closed:
the harness enumerates routes; About has none; About is invisible to the harness; the harness reports
zero blank-or-near-blank and zero horizontal-overflow defects, all true, all of a surface that does
not include this one.

The cure is a transposition, not a patch: **give About its route, make it an article, and the Card,
the seven dividers, the Alert, the false triggers, the duplicate selector, the 49/49 split, the
44.5 px misalignment, the non-occluding sticky header and the 200%-zoom disappearance all resolve
in the same move.** Fixing them individually inside the companion pane would preserve every one of
their causes.

---

## Frames and artifacts

Tracked (in-repo):

- `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/picker.png` — the 49/49 split, the 44.5 px misalignment, the light-mode accent trigger
- `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-dark/picker.png` — the dark-mode affordance collapse
- `docs/tranches/V/megatranche/audit/visual/REPORT.md` — `h1 = 0` on all 60 captures; no About row exists
- `docs/tranches/V/megatranche/audit/visual/capture.mjs:22–38` — the route table with no About

Session artifacts (scratchpad,
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`):

- `probe-about.mjs` / `probe1.json` — rects, headings, measure, separator count, colors
- `ABD-states.mjs` — the 18-option list, the Display P3 void, forced-colors, 200% zoom
- `ABD-final.mjs` / `ABD-final.json` — occlusion table, RTL, mobile reachability, selector count
- `ABD-display-p3-guide.png` — **"Detailed Guide" over a void**, and RGB's facts under Display P3's name
- `ABD-scroll420.png` — **the header printing through "Created: 1976"**
- `ABD-rtl.png` — the title disintegrating; `to 125 125-`
- `ABD-zoom200.png` — About absent at 200%

No source file was modified. Writes confined to
`docs/tranches/V/megatranche/audit/components/AboutPane/`.
