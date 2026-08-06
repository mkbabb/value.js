claude-opus-5[1m]

# Challenge · `SpringTrace.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringTrace.vue` (129 lines)
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. One arithmetic re-execution of the component's own parse loop in a scratchpad (§D-1) — no product file touched.
**Corpus folded:** `formation/keyframes/lane-frontend.md` (§4 roster row `129 | spring/SpringTrace.vue | b`; §5 shadow census S-1..S-8; §6.3 flat token namespace; §6.5 PRM sites; F-1 phantom dep).
**Read whole:** the target; `./useSpringLinearStops.ts`; its transitive `src/animation/physics/spring/css/linear-stops.ts` + `solver/sample.ts`; the consumer `./SpringTarget.vue` (470L); the parameter owners `./SpringPhysicsFacet.vue`, `./springPresets.ts`, `./useSpringDemo.ts`, `./SpringHeatmap.vue`; the sibling plot `../easing/EasingTarget.vue`; the token chain `demo/styles/style.css` → `node_modules/@mkbabb/glass-ui/dist/styles/{index,typography/{scale,utilities},tokens/color-radius}.css`.

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| **D-1** | The trace is drawn over **x ∈ [2, 98]**, not [0, 100] — both endpoints mis-registered ≈15 px against a full-bleed graticule. The component's own comment (`:49`) states the opposite rule; the guard meant to enforce it (`:76–79`) is dead. | **BLOCKER** |
| **D-2** | `&zeta;` sits inside `text-mono-caption`, which sets `text-transform: uppercase` → the header renders **Ζ** (U+0396), not **ζ**. The sibling tag 8 files-lines away carries `text-transform: none` for exactly this reason. | **BLOCKER** |
| **D-3** | The y=1 target line computes **1.84 : 1** against the card (`--border` baseline: **1.34 : 1**). WCAG 2.2 SC 1.4.11 wants 3 : 1. At α=0.45 the *ceiling* on this card is 3.31 : 1 and only for pure black. | MAJOR |
| **D-4** | The reference geometry wears the **data hue**. Target line and trace are both `--color-progress`; at ζ ≥ 1 the settled trace lies **on** the reference and occludes it. | MAJOR |
| **D-5** | `aria-hidden="true"` on the sole informational artifact, with **no** `role="img"`, `<title>`, `<desc>` or sr-only mirror — against an established in-repo sr-only idiom. | MAJOR |
| **D-6** | Unlabeled graticule: nothing in the rendered output says **1** or **0** or names the x-axis. The stated thesis ("the overshoot is `y > 1`") is unverifiable by the viewer. | MAJOR |
| **D-7** | Vertical budget: **33 %** of the plot height is reserved for overshoot headroom; at the shipped boot default (ζ=0.86) the overshoot fills **0.9 %** of it — 0.22 px. At the `gentle` preset, 0 px. | MAJOR |
| D-8 | `preserveAspectRatio="none"` + fixed 72 px height + fluid width → the drawn shape is viewport-dependent (anisotropy 2.7 : 1 @375 w → 6.4 : 1 @768 w). | MINOR |
| D-9 | `mb-1` here vs `mb-2` on the structurally identical sibling block in the same card (`SpringTarget.vue:135`). | MINOR |
| D-10 | The live ζ readout is `text-muted-foreground`, violating the scene's own documented rule that live values wear the accent (`SpringTarget.vue:137–139`). | MINOR |
| D-11 | `{{ linearPlot.length }} stops plotted` is **invariantly 26** — a bound expression that cannot change, occupying the primary label slot. | MINOR |
| D-12 | No error state: a stop that misses the regex is silently emitted as `{v: 0}` and plotted as a dive to the baseline; the header still claims 26. | MINOR |
| D-13 | `overflow: visible` + a 3 px `drop-shadow` glow → at ζ ≈ 0.2 the peak sits 1.25 px from the top edge and the glow spills into the 4 px label gap. | MINOR |
| D-14 | Zero `forced-colors` handling — but the gap is **corpus-wide** (0 hits across all 206 demo files), so this is a lane-level note, not a component indictment. | INFO |
| D-15 | Consumes `--color-progress` (demo-owned, unprefixed) and `--border` (glass-ui-owned) with no qualification — corroborates lane-frontend §6.3. | INFO |
| D-16 | State coverage: empty / loading / RTL are clean **by construction**, not by omission. Recorded so the absence is not later mistaken for a gap. | INFO |

**Superlatives** (§S, L-18 both ways): **S-A** the polyline is the *correct* mark for `linear()` · **S-B** `vector-effect: non-scaling-stroke` applied to all three marks, none forgotten · **S-C** no PRM block and none needed — vacuously honest · **S-D** total typography-register conformance to the glass fluid scale · **S-E** the value-axis headroom exactly brackets the reachable analytic maximum.

**Tally: 16 defects (2 BLOCKER · 5 MAJOR · 6 MINOR · 3 INFO), 5 superlatives.**

---

## 1. What the component is

129 lines. A colocated sub-unit of `SpringTarget` (`SpringTarget.vue:152–155`) that takes `(response, dampingFraction)`, calls `useSpringLinearStops` → the library's own `springLinearStops()` emitter, re-parses the emitted `linear(…)` **string** back into points, and draws them as an SVG polyline against two reference lines.

Its declared purpose is stated twice and unambiguously (`:2–8`, `:98–101`):

> the position trace crests OVER the y=1 target line (the overshoot is `y > 1`, right there in the data) and rings back for ζ<1. … The two readings of one curve — numeral (sidebar) + trace (here) — the math made beautifully visible.

Every finding below is measured against **that** declared contract, not an imported one. Where the component and its own prose disagree, the tree wins.

Lane-frontend §4 rows it as `129 | spring/SpringTrace.vue | b` (no glass-ui import). **I checked whether that is a shadow-census miss and it is not**: glass-ui 7.0.0 ships 73 subpaths and *none* is a plot/chart/sparkline/curve primitive (`ls dist/components/` → 68 dirs, no `spark|curve|plot|graph|chart|trace`; the `easing/` family is `EasingPicker` + `EasingConfigurator` + `useEasingPicker` only). **This component is justified bespoke in the S-8 sense — extend the census with `S-9 · SpringTrace — JUSTIFIED BESPOKE, no glass counterpart exists.`** That is a *contribution* to the corpus, not a contradiction.

---

## 2. BLOCKERS

### D-1 · The trace spans x ∈ [2, 98], not [0, 100] — **BLOCKER**

**Provenance:** `SpringTrace.vue:59–79` (the implicit-percent fill), `:49` (the stated rule), `:76–79` (the dead guard), `:23` + `:25` (the full-bleed graticule the trace is measured against), and the producer `src/animation/physics/spring/css/linear-stops.ts:62–70`.

The component states its own anchoring rule at `:48–49`:

```
// Stops without an explicit % are distributed evenly (the CSS linear() rule);
// the FIRST/LAST implicit stops anchor 0% / 100%.
```

`springLinearStops` emits `"0"` first and `"1"` last with **no percentage** (`linear-stops.ts:62`, `:69`), and 24 interior stops each with an explicit percentage `(i/25)·100` (`:64–66`). So both terminal stops enter the fill loop as `pct == null`.

Trace the loop by hand at `i = 0`: `j` advances to 1, `nextPct = 4`, `span = j - i + 1 = 2`, and the single interior write is `pts[0].pct = 0 + (4 − 0)·1/2 = **2**`. At `i = 25`: `j` runs off the end, `nextPct = 100`, `span = 2`, `lastPct = 96`, so `pts[25].pct = 96 + (100 − 96)·1/2 = **98**`.

The guard at `:76–79` is then a no-op — it uses `??`, and by the time it runs neither field is `null` any more:

```js
pts[0]!.pct = pts[0]!.pct ?? 0;          // pct is already 2 → unchanged
pts[n - 1]!.pct = pts[n - 1]!.pct ?? 100; // pct is already 98 → unchanged
```

I re-executed lines 50–86 verbatim against a verbatim `springLinearStops`-shaped string (24 interior stops at `(i/25)·100 %`, implicit `0` / `1` terminals):

```
n (header 'stops plotted') = 26
FIRST x = 2    (comment line 49 claims 0)
LAST  x = 98   (comment line 49 claims 100)
```

**The design consequence — this is why it is a design blocker and not merely a correctness one.** Both reference lines are drawn edge to edge, `x1="0" … x2="100"` (`:23`, `:25`). The data mark is not. At the `max-w-3xl` measure (48 rem = 768 px) the viewBox x-unit is 7.68 px, so:

* the trace **starts 15.4 px inside** the left edge, floating off its own origin while the baseline runs under it to the edge;
* the trace **stops 15.4 px short** of the right edge — i.e. it visibly does **not** land on the end of the target line. The single reading the component exists to deliver ("it settles onto 1") is contradicted by the picture at both ends;
* the gap is not symmetric in meaning: the left 2 % is empty *before* t=0 and the right 2 % is empty *after* the curve terminates, so the graticule frames 4 % of nothing while the data is compressed into 96 %.

This is a *rendered geometry* defect, visible without instrumentation at any width, in every reachable state (the emitter always produces this stop shape).

**Falsifier.** Show that `springLinearStops` emits an explicit `0%` on the first stop and `100%` on the last — then both terminals skip the loop and the guard is unnecessary. `linear-stops.ts:62` (`const stops: string[] = ["0"];`) and `:69` (`stops.push("1");`) say otherwise; the re-execution above says otherwise. Alternatively, show the first/last vertices are visually indistinguishable from the edges at every rendered width — at 768 px they are 15.4 px in, which is 7× the 2 px stroke.

---

### D-2 · `ζ` is uppercased to `Ζ` by the chosen type utility — **BLOCKER**

**Provenance:** `SpringTrace.vue:12–14`; `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css` (`@utility text-mono-caption`); `SpringTarget.vue:120–121` + `:448–455`; `SpringPhysicsFacet.vue:39`.

The template:

```html
<span class="text-mono-caption text-muted-foreground tabular-nums">
    &zeta; {{ dampingFraction.toFixed(2) }}
</span>
```

The utility it selects:

```
@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption);
  letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }
```

The import chain that makes it live: `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` → `package.json exports["./styles"] = "./dist/styles/index.css"` → `@import "./typography.css"` → `@import "./typography/utilities.css"`. `SpringTrace`'s scoped block (`:97–128`) sets no `text-transform`, and a repo-wide grep finds **no** demo-level override of `text-mono-caption` in any `.css`.

`text-transform: uppercase` maps **U+03B6 GREEK SMALL LETTER ZETA → U+0396 GREEK CAPITAL LETTER ZETA**. The rendered glyph is `Ζ` — which in Fira Code is visually a Latin `Z`, and which in control theory denotes nothing. The damping ratio is lowercase ζ by universal convention, and the slider that *drives this exact value* is labelled `"damping (ζ)"` at `SpringPhysicsFacet.vue:39`. The plot header and its own control therefore disagree in glyph.

**The repo already knows.** `SpringTarget.vue:120–121` renders the same symbol through the same utility:

```html
<span class="derby-lane-tag text-mono-caption tabular-nums">
    {{ lane.name }} · ζ{{ lane.zeta.toFixed(2) }}
</span>
```

…and its scoped rule at `:448–455` ends with:

```css
.derby-lane-tag { … text-transform: none; }
```

That is the **only** `text-transform` declaration anywhere in `scenes/spring/`. It exists for precisely this hazard, was written by the author of the parent file, and was not carried into the child. Two components, one scene, one symbol, one fix applied to one of them.

Severity is BLOCKER rather than MAJOR because this is the component's **only** textual datum besides an invariant (D-11), it is a notational-correctness failure in an instrument whose subject is that notation, and the corrective is a single declaration already proven adjacent.

**Falsifier.** Show that the installed `text-mono-caption` does not set `text-transform: uppercase` (it does — quoted above from `dist/styles/typography/utilities.css`), or that some rule in the cascade resets it for this subtree (none exists — no demo `.css` mentions the utility, and the scoped block is quoted in full at `:97–128`), or that the UA does not case-map U+03B6 → U+0396 (all do; it is a plain Unicode simple-uppercase mapping). Any one of those kills the claim.

---

## 3. MAJORS

### D-3 · The reference lines fail non-text contrast — **MAJOR** (computed)

**Provenance:** `SpringTrace.vue:108–119`; `demo/styles/style.css:130,163`; `glass-ui/dist/styles/tokens/color-radius.css` (`--card`, `--neutral-4`, `--border`).

Resolved chain: `--color-progress` → `--accent-kf` → `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`. Light arm converts to **sRGB ≈ rgb(126, 90, 204)**. Backdrop: `--card: hsl(30 85% 96%)` ≈ **rgb(254, 245, 236)**, relative luminance **0.9222**.

| mark | declaration | composited sRGB | Y | contrast vs card | SC 1.4.11 (3:1) |
|---|---|---|---|---|---|
| `.plot-trace` (`:122`) | `--color-progress`, α=1 | rgb(126, 90, 204) | 0.1602 | **4.63 : 1** | **PASS** |
| `.plot-target-line` (`:109`) | `color-mix(… 45%, transparent)` | rgb(196, 175, 222) | 0.4772 | **1.84 : 1** | **FAIL** |
| `.plot-baseline` (`:115,118`) | `--border` (= `--neutral-4`) @ `opacity: .5` | rgb(226, 212, 197) | 0.6745 | **1.34 : 1** | **FAIL** |

The structural half matters more than the arithmetic. **At α = 0.45 over this card the maximum attainable contrast is 3.31 : 1, and only for pure black** (a 45 %-black composite on `--card` lands at Y = 0.2435). Any chromatic mid-tone token — and every accent in this system is one — is *mathematically incapable* of reaching 3 : 1 through that mix. The 45 % is not a tuning miss; it is a token choice that forecloses conformance.

The exemption for non-essential graphics does not apply, and the component forecloses that defence itself: `:22` calls the target line "the y=1 target line every trace is measured against", and `:3–5` makes the crossing of that line the entire reading. A reference line the doc-comment declares load-bearing is, by definition, "required to understand the content".

**Falsifier.** (a) Show the effective backdrop is materially darker or lighter than `--card` — the `Card` is `surface="glass"` (`SpringTarget.vue:10–13`), so the true composite includes a backdrop-filtered blur of `--background: --neutral-0 = hsl(40 30% 98%)`; both candidates are warm near-whites within ~2 % luminance of each other, so the ratio moves by <0.05, but the *exact* composite is **UNPROVEN-NEEDS-LIVE** for the SS-13 pass. (b) Show a ruling that these two lines are decorative — contradicted by `:22` and `:3–5`. (c) Show my OKLCh→sRGB conversion is wrong: `oklch(0.56 0.17 295)` → OKLab(0.56, 0.0718, −0.1541) → linear sRGB(0.2083, 0.1013, 0.6020) → rgb(126, 90, 204); recompute and the ratio follows.

---

### D-4 · The reference geometry wears the data hue — **MAJOR**

**Provenance:** `SpringTrace.vue:108–113` vs `:120–127`; contrast against `:114–119`.

Three marks, two roles, but the color assignment splits the wrong way:

| mark | role | hue family |
|---|---|---|
| `.plot-baseline` | reference (value 0) | `--border` — **neutral. Correct.** |
| `.plot-target-line` | reference (value 1) | `--color-progress` @45 % — **the data hue. Wrong.** |
| `.plot-trace` | data | `--color-progress` @100 % | 

The two gridlines that do the same job wear two different color families, and the one that wears the accent is the one that collides with the mark it is meant to measure. Three consequences, all visible:

1. **Encoding collision.** Hue is doing double duty: it means "this is the spring" on the trace and "this is a reference" on the line. A viewer cannot read the hue as a channel.
2. **Occlusion at the exact moment of need.** The trace terminates at value 1 by construction (`linear-stops.ts:69`), so its settled tail is collinear with the target line. At the `gentle` preset (ζ = 1.0, `springPresets.ts:39`) the overshoot is analytically **zero** and the entire post-rise trace lies *on* the reference — a 2 px opaque violet stroke over a 1 px 45 %-violet dashed line of the same hue. The reference disappears under the data.
3. **It causes D-3.** The 45 % dilution exists to keep the accent from competing with the trace. A neutral `--border`-family line at full opacity would need no dilution and would clear 3 : 1.

The demo's own sibling plot supports the neutral reading: `EasingTarget.vue:94–104` draws its sparkline as the *only* colored mark inside its stage; glass-ui's own SVG utilities offer `stroke-border`, `stroke-border/40`, `stroke-muted-foreground/30|50` (`dist/styles/components.css`) — a documented neutral-gridline vocabulary this component does not reach for.

**Falsifier.** Show the target line is deliberately tinted to read as "the spring's own destination" rather than as chart furniture — a defensible design argument, but then it must not be simultaneously dimmed to 45 % (which reads as furniture) and must not be occluded by the trace at ζ ≥ 1. Show, at ζ = 1.0 live, that the reference remains legible under the settled trace, and (2) dies.

---

### D-5 · `aria-hidden` on the sole informational artifact, no text equivalent — **MAJOR**

**Provenance:** `SpringTrace.vue:20`; the total accessible output at `:11` and `:12–14`; the in-repo idiom at `AnimatedText.vue:21`, `CopyButton.vue:15`, `ControlsPaneWrapper.vue:134`, `SquareScene.vue:56,66`.

`<svg … aria-hidden="true">` removes the entire graphic from the accessibility tree. What remains for a non-visual user is exactly two strings: an invariant ("26 stops plotted", D-11) and a mis-cased symbol with a number ("Ζ 0.86", D-2). Peak overshoot, settle time, ring count, whether the curve crosses at all — none of it has a text equivalent anywhere in the spring scene. `SpringHeatmap` renders the same information as *another* image; the sidebar renders the `linear()` string into a Monaco editor.

Decorative `aria-hidden` is the right call for a mark whose meaning is carried in text elsewhere. Here nothing carries it. The component needs one of: `role="img"` + `aria-label`, an SVG `<title>`/`<desc>` pair, or the sr-only mirror this demo already uses in five places — most pointedly `AnimatedText.vue:7–8, :21`, which lane-frontend §5 S-5 singles out as "a bespoke sr-only a11y mirror … the accessibility concern `TypewriterText` exists to solve centrally". The idiom is present, understood, and declined here.

The cheapest sufficient fix is a computed sentence — peak value, whether it exceeds 1, and ζ — which the component already has in hand: `Math.max(...linearPlot.map(p => p.v))` is one line from data it already computes.

**Falsifier.** Point to any text, sr-only span, `aria-live` region, or labelled control in the spring scene that conveys the overshoot magnitude or the settle shape numerically. I grepped `sr-only` across all 58 demo `.vue` files (5 hits, none in `scenes/spring/`) and read `SpringTarget.vue` whole (the readouts are live `x`, live `v`, and a settled/tracking badge — instantaneous state, not curve shape). If such a surface exists, downgrade to MINOR.

---

### D-6 · The graticule is unlabeled — **MAJOR**

**Provenance:** `SpringTrace.vue:16–28` (the whole SVG — three elements, zero `<text>`); `:11–14` (the header, which names neither axis).

The rendered output contains: a dashed line, a fainter solid line, a curve, and two strings. Nothing states that the dashed line is **1**. Nothing states the solid line is **0**. Nothing names the x-axis (it is percent-of-duration, not time — a distinction that matters because the duration itself varies with `response`). No tick, no unit, no legend.

The component's thesis is quantitative — "the overshoot is `y > 1`, right there in the data" (`:4–5`) — and the viewer is given no `1` against which to read `y > 1`. The knowledge lives entirely in the source comment, which no user reads. The plot is legible as *a shape*; it is not legible as *data*.

This is the classic unlabeled-axis failure and it is unforced: the SVG has 20 viewBox units of headroom above the target line (D-7) sitting empty at every reachable state, which is room for a `1` and a `0` at the left margin with no layout change.

**Falsifier.** Show a rendered label, tick, legend, tooltip, or caption — anywhere in the spring scene — that identifies the y=1 line or the value axis. `SpringTarget.vue` read whole: the only occurrences of "target line" are in HTML/CSS comments (`:75–79`, `:357–361`), never in rendered text. The `.spring-target-line` at `:80–84` is a different object (the rail's right edge) and is itself `aria-hidden`.

---

### D-7 · Vertical budget: a third of the canvas reserved for 0.9 % of signal — **MAJOR** (computed)

**Provenance:** `SpringTrace.vue:80–85` (`Y_TARGET = 20`, `Y_ZERO = 56`), `:18` (`viewBox="0 0 100 60"`), `:104` (`height: 4.5rem`); `useSpringDemo.ts:84` (boot default); `springPresets.ts:21,27,33,39`; the demo's own overshoot formula at `SpringHeatmap.vue:88`.

Geometry, resolved:

* box = 72 CSS px tall over 60 viewBox units → **1.2 px per unit**;
* `Y_ZERO − Y_TARGET = 36` units → **43.2 px for the full 0 → 1 range** (60 % of the height);
* above the target line: **20 units = 24 px = 33 % of the height**, i.e. headroom for value up to **1.556**;
* below the baseline: **4 units = 4.8 px**, permanently empty — a unit-step spring from 0 never undershoots below 0 (min after the first ring at ζ=0.2 is 1 − e^(−2ζπ/√(1−ζ²)) = 0.72).

Now fill the reserved band, using the demo's own analytic overshoot `exp(−ζπ/√(1−ζ²))` (`SpringHeatmap.vue:88`). These are **upper bounds** — the drawn polyline samples the peak and can only under-shoot them:

| state | ζ | overshoot | drawn height above the line | share of the 24 px band |
|---|---|---|---|---|
| **boot default** (`useSpringDemo.ts:84`) | 0.86 | 0.501 % | **0.22 px** | **0.9 %** |
| preset `gentle` (`springPresets.ts:39`) | 1.00 | 0 | **0 px** | **0 %** |
| preset `snappy` (`:27`) | 0.65 | 6.81 % | 2.94 px | 12 % |
| preset `bouncy` (`:33`) | 0.45 | 20.5 % | 8.87 px | 37 % |
| slider/heatmap floor (`SpringPhysicsFacet.vue:42`, `SpringHeatmap.vue:72`) | 0.20 | 52.7 % | 22.8 px | 95 % |

So: **the state the user first sees uses 0.22 px of a 24 px reserve**, and one of the four shipped presets uses none of it. Two thirds of the plot's height (24 px headroom + 4.8 px dead floor = 28.8 px of 72) is near-empty at the default, while the 0 → 1 region — where the rise shape, the settle knee, and every ζ distinction actually live — is compressed into 43.2 px.

This is the Aristotelian charge precisely: the proportion is fixed to the *extreme* case and paid for by the *typical* one. The domain is hard-coded (`:82–83`) with no data-driven scaling and no documentation of the coupling.

Note the finding is **not** "the plot lies". It renders reality faithfully, and at ζ=0.86 an overshoot of 0.5 % *should* look like nothing. The defect is the allocation: reserving a third of the canvas for a phenomenon that four of five shipped states barely exercise, while starving the region that carries the signal in all of them.

**Falsifier.** Show that the y-domain adapts to the data (it does not — `Y_TARGET`/`Y_ZERO` are module-level `const`s at `:82–83` inside the computed, never derived from `pts`). Or show that the default ζ is not 0.86 (`useSpringDemo.ts:84`: `const dampingFraction = ref(0.86);`). Or show that 0.22 px of vertical deflection is legible against a 1 px dashed 1.84 : 1 line — that one is decidable by eye at the SS-13 pass and I mark it **UNPROVEN-NEEDS-LIVE**; the arithmetic, however, stands independent of the visual call.

---

## 4. MINORS

### D-8 · The drawn shape is viewport-dependent — MINOR

`preserveAspectRatio="none"` (`:19`) with a **fixed** 72 px height (`:104`) and a fluid width capped at `max-w-3xl` (`:9`, 48 rem = 768 px) makes the x/y scale ratio a function of viewport width:

| container width | x scale (px/unit) | y scale | anisotropy |
|---|---|---|---|
| ~327 px (375 vw − card padding) | 3.27 | 1.20 | **2.73 : 1** |
| 768 px (the `max-w-3xl` measure) | 7.68 | 1.20 | **6.40 : 1** |

The same ζ renders with apparent slopes differing by **2.35×** between phone and desktop. For a general chart this is ordinary responsive practice; for an instrument whose declared job is making a *shape* legible ("the math made beautifully visible", `:7`), the shape is not invariant. An `aspect-ratio` on the SVG, or a height in `cqw`, pins it.

**Falsifier.** Show the component is only ever rendered at one width, or that ζ remains discriminable across the range at the SS-13 pass — **UNPROVEN-NEEDS-LIVE** for the perceptual half; the scale arithmetic is source-decidable.

### D-9 · Inconsistent header→content rhythm against its own sibling — MINOR

Two structurally identical blocks sit adjacent inside the same `Card`, both `w-full max-w-3xl shrink-0`, both a `flex items-center justify-between` label row over a track:

* `SpringTarget.vue:135` — `class="flex items-center justify-between mb-2"` (8 px)
* `SpringTrace.vue:10` — `class="flex items-center justify-between mb-1"` (4 px)

Same grammar, same card, two different gaps. The parent's `gap-8` between blocks makes the internal inconsistency the only variable rhythm in the stack.

**Falsifier.** Show a reason the plot wants a tighter head than the sweep track — e.g. that the plot's `overflow: visible` glow needs the label closer. It needs the opposite (D-13).

### D-10 · The live readout is muted, against the scene's documented rule — MINOR

`SpringTarget.vue:137–139` states and applies the rule:

```
<!-- J.W7a S3 (D14 / CP-4) — the live sampled value wears the scene accent; the label stays muted. -->
<span class="readout-accent text-mono-caption tabular-nums">{{ demo.sampled.value.toFixed(3) }}</span>
```

`SpringTrace.vue:12` puts the live ζ in `text-muted-foreground` — the *label* register — while the left span at `:11` takes `text-foreground`. Within the plot header the static label is therefore **louder** than the live value, inverting both the sibling's rule and the scene-wide re-tier documented at `SpringTarget.vue:26–32` ("the equal-weight inversion the user named").

**Falsifier.** Argue ζ is a *parameter*, not a *sampled readout*, so D14/CP-4 does not reach it — a fair reading. But then the muted styling should attach to a labelled pair, not to the value alone, and the left/right weight ordering still inverts. Downgrade to INFO if the parameter/readout distinction is ruled.

### D-11 · `{{ linearPlot.length }} stops plotted` is invariantly 26 — MINOR

`:11` binds a reactive expression to the primary label. It can never change:

* `useSpringLinearStops` (`:24–34`) passes only `response` and `dampingFraction` — never `sampleCount`, so the default 24 always applies (`linear-stops.ts:47`);
* `sampleNormalizedSpring` returns exactly `sampleCount` entries always — settling *pins to 1*, it does not truncate (`solver/sample.ts:58–64`);
* the emitter always frames them with `"0"` and `"1"` (`:62`, `:69`).

Total: 26, in every reachable state. The header's primary slot spends itself on a constant dressed as a live value — verified by the re-execution in §D-1 (`n = 26`). If the count is genuinely interesting it belongs in the static prose; if it is meant to be live, the sample count should be exposed.

**Falsifier.** Find any call path that passes `sampleCount`, or any early-return in `sampleNormalizedSpring` — `:58–64` has neither (`for (let i = 1; i <= opts.sampleCount; i++)` with an unconditional `samples.push`).

### D-12 · No error state — a parse miss plots as a baseline dive — MINOR

`:55–57`:

```js
const m = p.match(/^(-?[\d.]+)\s*(?:([\d.]+)%)?$/);
if (!m) return { v: 0, pct: null };
```

A stop the regex cannot read becomes **value 0** — indistinguishable from a legitimate datum at the baseline. CSS `linear()` legally admits two positions per stop (`0.5 10% 20%`), which this regex rejects; so does any exponent notation (`1e-5`), which `toFixed(5)` currently avoids but nothing guarantees. The failure mode is a curve that dives to the floor mid-flight while the header still reports 26 stops (D-11) and the component reports no fault. There is no error surface, no fallback, no dev-time warning.

Design-axis reading: an instrument must distinguish "the data says zero" from "I could not read the data". This one cannot.

**Falsifier.** Show the emitter is contractually pinned to the one shape the regex accepts — `linear-stops.ts:66` (`${v.toFixed(5)} ${pct.toFixed(3)}%`) is the current shape, but the two modules are decoupled by a *string*, which is exactly the seam that drifts. Lane-library's parse-seam findings are the general form of this hazard.

### D-13 · Glow spill into the label gap at low ζ — MINOR

`:106` `overflow: visible` and `:127` `filter: drop-shadow(0 0 3px …)`. At the ζ = 0.2 floor the peak lands at y = 56 − 36 × 1.527 = **1.04 viewBox units = 1.25 px** from the top edge. The stroke's own half-width (1 px, non-scaling) leaves 0.25 px of geometric clearance — the box does *just* contain the mark (that near-miss is S-E) — but the 3 px blur radius is not contained, and `overflow: visible` lets it paint into the **4 px** `mb-1` gap (D-9) and onto the label row's cap-height.

**Falsifier.** Show the parent clips it — `SpringTarget.vue:12` does carry `overflow-hidden`, but on the `Card`, ~24 px of padding away; the plot's own wrapper (`:9`) sets no overflow. Or show ζ ≤ 0.25 is unreachable — it is not: `SpringPhysicsFacet.vue:42` `:min="0.2"` and `SpringHeatmap.vue:72` `DAMPING_MIN = 0.2` both reach it, and the heatmap makes it a single click.

---

## 5. INFO

### D-14 · `forced-colors` — a corpus gap, not a component gap

`grep -rn "forced-colors" --include="*.vue" --include="*.css" --include="*.ts" demo/` → **0 hits across all 206 demo files**. So SpringTrace is not an outlier and I decline to charge it as a component defect.

The component-specific hazard, recorded for the lane: in forced-colors mode UAs force `fill` and `stroke` to system colors. All three marks would collapse toward one color, leaving only `stroke-dasharray: 3 2` (`:111`) to distinguish the target line from the trace, and **nothing** to distinguish the baseline from the trace (both solid). The `drop-shadow` filter is not forced and would persist as a halo in the un-forced accent. Note glass-ui itself does ship forced-colors handling (`components.css`: `@media (forced-colors:active){.outline-hidden{…outline:2px solid #0000}}`) — the producer has the idiom; the consumer has not adopted it.

**Falsifier.** If a UA does not force SVG `stroke` (behaviour has varied), the marks survive as authored and only the D-3 contrast finding applies. Marked **UNPROVEN-NEEDS-LIVE**.

### D-15 · Token namespace

Consumes exactly two custom properties: `--color-progress` (demo-owned, `demo/styles/style.css:163` → `--accent-kf` at `:130`) and `--border` (glass-ui-owned → `--neutral-4`). Both unprefixed, both in one flat global namespace, cited at the same specificity with nothing distinguishing which repo owns which. This **corroborates lane-frontend §6.3** — "98 demo-owned custom properties … `--kf-*` count → 0 … a collision surface worth a lane of its own." I add the concrete shape: a consumer file cannot tell, from the call site, whether a token is local or vendored, so a glass-ui release that introduces `--color-progress` would silently retone this plot with no diff in the demo.

### D-16 · State coverage — clean by construction, recorded so it is not later read as omission

| state | verdict |
|---|---|
| **empty** | Unreachable. `springLinearStops` always emits ≥ 2 stops (`linear-stops.ts:62,69`); the `if (!pts.length) return "";` guard at `:90` is dead but harmless. |
| **loading** | N/A. `useSpringLinearStops` is a synchronous `computed` (`:28–33`) — no async boundary, no suspense, nothing to skeleton. |
| **error** | **Missing** — charged at D-12. |
| **RTL** | Clean. The component's scoped CSS (`:97–128`) uses **zero** physical directional properties; the only spacing is `mb-1` (block-axis, direction-agnostic); the header is `flex justify-between`, which mirrors correctly; SVG user space is direction-independent, so the time axis correctly does **not** flip. |
| **forced-colors** | Absent — D-14, corpus-wide. |
| **reduced-motion** | Correctly absent — see **S-C**. |

---

## 6. Superlatives (§S)

### S-A · The polyline is the *correct* mark, and the label names it

`:91–93` joins the points with `L` segments — no smoothing spline, no Catmull-Rom, no `Q`/`C`. That is right, and it is right for a reason most implementations get wrong: **CSS `linear()` *is* a polyline.** The browser interpolates linearly between stops, so a smoothed curve would depict an idealized spring the engine will never actually run, while the straight segments depict exactly what `animation-timing-function: linear(…)` will do. The consequence is that the drawn apex *understates* the true analytic peak — which is not an error, it is the truth about the approximation. And the header names what is drawn: `linear() — 26 stops plotted` (`:11`), not "spring response". Form, referent, and label agree.

**Falsifier (runs both ways).** If the component's contract were "draw the analytic spring", the polyline would be a defect and the understated peak a bug. `:2–8` and `:39–41` both scope it to "the springLinearStops() output … finally PLOTTED" — the emitter's output, not the solver's ideal. The superlative survives its own falsifier.

### S-B · `non-scaling-stroke` on all three marks — none forgotten

`:112`, `:117`, `:126`. Under `preserveAspectRatio="none"` at up to 6.4 : 1 anisotropy (D-8), a scaled stroke would render 6.4× fatter horizontally than vertically, with elliptical caps and joins — the classic disfigurement of a stretched SVG plot. `vector-effect: non-scaling-stroke` is the exact correct incantation, and it is applied to the trace, the target line, **and** the baseline. The partial application (data mark only, gridlines forgotten) is the common failure; it did not happen here. `stroke-linecap: round` + `stroke-linejoin: round` (`:124–125`) compound correctly, since round joins in device space stay circular.

**Falsifier.** Name a stroked element in this SVG lacking the property. There are three stroked elements and three declarations.

### S-C · No motion, no PRM block, and that is the honest answer

The 32-line stylesheet contains zero `@keyframes`, zero `transition`, zero `animation`. Both props change only on user input (`SpringTarget.vue:153–154` reads `demo.response` / `demo.dampingFraction`, driven by the two `LabeledSlider`s at `SpringPhysicsFacet.vue:27–46` and the heatmap); nothing here is on the painter hot path or a rAF. So there is nothing autonomous to suppress and the absence of a `prefers-reduced-motion` block is **correct**, not a gap.

This **refines lane-frontend §6.5**, which enumerates 13 PRM sites and flags `TypingDots.vue:121` and `KeyframeTimeline.vue:94` as unguarded-but-delegating. SpringTrace is a *third* file in `scenes/spring/` without a PRM block — the sibling `SpringTarget.vue:462`, `SpringHeatmap.vue:333`, and `StartingStyleTarget.vue:211` all carry one — and the correct census entry is "no guard needed", not "gap". Recording it so a later sweep does not add a vacuous `@media` block for symmetry.

**Falsifier.** Find any `transition`/`animation`/`@keyframes` in `:97–128`, or any autonomous (non-input-driven) writer of `response`/`dampingFraction`. `useSpringDemo.ts:341` watches them; nothing drives them.

### S-D · Total typography-register conformance

Both header spans draw from glass-ui's fluid scale and mirror the sibling sweep block's exact register pairing:

| | `SpringTarget.vue` sweep header | `SpringTrace.vue` plot header |
|---|---|---|
| label | `:136` `text-small text-foreground` | `:11` `text-small text-foreground` |
| value | `:139` `text-mono-caption tabular-nums` | `:12` `text-mono-caption … tabular-nums` |

`--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` and `--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` — both fluid, both vendored. **Zero raw px, zero bespoke font-size, zero local font declarations** in the entire scoped block. The two blocks are typographically indistinguishable, which is exactly what two peer readouts in one card should be.

Note this stands *despite* D-2: the uppercase defect is a hazard of the chosen utility's transform, not a violation of the scale. The register discipline is intact; only the glyph is wrong.

**Falsifier.** Find a font-size, font-family, or line-height declaration in `:97–128`. There are none.

### S-E · The value-axis headroom exactly brackets the reachable maximum

`Y_TARGET = 20` / `Y_ZERO = 56` (`:82–83`) allows a maximum representable value of 56/36 = **1.5556**. The maximum *reachable* analytic overshoot is at ζ = 0.2 — the floor shared by both parameter surfaces (`SpringPhysicsFacet.vue:42`, `SpringHeatmap.vue:72`) — giving 1 + exp(−0.2π/√0.96) = **1.5266**. The trace is geometrically incapable of escaping its own box, with 1.9 % of margin.

That is a genuinely good bound, arrived at from a comment (`:80–81`) that reads heuristic rather than computed ("the y=1 target line at 1/3 from the top so overshoot has room to cross above it"). Whether by derivation or by taste, the number is right.

**Falsifier (runs both ways).** The 1.9 % margin is *undocumented as a coupling*: nothing ties `Y_TARGET`/`Y_ZERO` to `DAMPING_MIN`, and lowering the slider floor to ζ = 0.15 (overshoot 1.618) would silently paint outside the box. If the coupling is judged accidental rather than designed, the superlative degrades to a MINOR latent-coupling finding — but the current tree is correct, and I score what ships. See also D-13, where the 0.25 px clearance is real but the glow is not contained.

---

## 7. Provenance & discipline

* Every source read is under `/Users/mkbabb/Programming/keyframes.js` (**READ-ONLY**) or `node_modules/@mkbabb/glass-ui/dist/` (the copy installed in the census target, per lane-frontend's provenance note — no upgrade assumed).
* **No product source in any repo was written, mutated, or executed.** No installs, no dev servers, no browser tooling. The single write is this file.
* The one execution (§D-1) ran a **transcription** of `SpringTrace.vue:50–86` in a scratchpad `.mjs`, importing nothing from the repo, purely to check arithmetic I had already derived by hand. It agrees with the hand trace.
* Contrast figures are computed from resolved token values (OKLCh → OKLab → linear sRGB → WCAG relative luminance; HSL → sRGB for `--card`/`--neutral-4`). The **effective glass backdrop** is the one input I cannot resolve statically — flagged **UNPROVEN-NEEDS-LIVE** in D-3, with the sensitivity bounded (<0.05 on the ratio between the two candidate backdrops).
* Perceptual calls are marked **UNPROVEN-NEEDS-LIVE** and never carry a severity on their own: D-7's "0.22 px is illegible" (the arithmetic carries the severity, not the eye), D-8's slope discriminability, D-14's forced-colors rendering.
* **Corpus contribution back to the census:** `S-9 · SpringTrace — JUSTIFIED BESPOKE`. glass-ui 7.0.0's 68 component directories contain no plot/curve/sparkline primitive; the `/easing` family is a picker, not a renderer. The bespoke SVG is correct, and lane-frontend §5's shadow table should carry it in the S-8 "keep" row rather than leaving it unadjudicated in the "12 remaining bespoke" bucket.
* **No contradiction of the hitherto corpus was found.** Two refinements: §6.5's PRM census (S-C — this file is a "no guard needed", not a gap) and §6.3's token hazard (D-15 — concrete collision shape supplied).
* F-1 (glass-ui phantom dependency) is upstream of every glass-conformance judgement here; the typography and token findings assume the installed 7.0.0 is what ships, which F-1 says is not guaranteed by the lockfile.
