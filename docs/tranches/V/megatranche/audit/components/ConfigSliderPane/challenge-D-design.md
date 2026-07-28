# CHALLENGE-D — `demo/scenes/ConfigSliderPane.vue` — the design is flawed (PASS 3)

## Model receipt

I observe myself to be **Claude Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm.
This seat was spawned with an explicit Opus 5 declaration and the served tier agrees with it. The
seat is declared, not inherited. No Fable was used in this lane.

---

## 0. What this pass is

Two CHALLENGE-D reports already exist at HEAD and are preserved verbatim:

- `challenge-D-design.pass-1-2026-07-24-prior.md` — 21 findings, the fuller enumeration.
- `challenge-D-design.pass-2-2026-07-28-prior.md` — 4 new findings, 3 corrections, and the
  `Configurator` transposition (§4 of that document), which is correct and which I do **not**
  re-derive.

This is the **third independent pass** at the same repo state. It does four things the prior two did
not:

1. **Eleven new findings** (P-1…P-11), all measured this pass, covering the accessibility-association
   arm, the slot's missing layout contract, the empty state, the ink token's *provenance*, the
   dark-scheme focus arm, and the mobile action band.
2. **Three corrections to pass 2** (K-1…K-3), one of which materially re-states pass 2's headline
   number and is the reason this pass exists at all: **the blob seat measures 180.2 px settled, not
   63 px**, so the form:preview ratio is **12.2 : 1**, not 89.7 : 1. Both prior passes sampled an
   unsettled frame against a register clause (`PROPORTION-AUDIT.md §2` clause 4) that explicitly
   mandates a settled-frame protocol.
3. **Two rows the pass-2 transposition map lacks** — `LabeledField` for the label association, and
   the binding of the project's own `focus-ring.css` recipe (§4).
4. It records what is **sound**, with positive evidence (§6).

Verdict unchanged and reinforced: **DEFECTIVE.**

| Field | Value |
|---|---|
| Subject | `demo/scenes/ConfigSliderPane.vue` (252 lines) |
| Consumers | `demo/scenes/blob/BlobPane.vue` (31 rows / 7 sections), `demo/scenes/atmosphere/AuroraPane.vue` (3 rows + 4 slot Selects) |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| Producer | `@mkbabb/glass-ui@^7.0.0` |
| Live probes (this pass) | `CSP-D-probe{,2,3,4,5,6}.mjs` in the session scratchpad; Chromium **DPR 1**, 1440×900 and 390×844, `colorScheme` light **and** dark, `/#/blob` and `/#/atmosphere` |
| Frames re-read | `shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,rtl-desktop,zoom-200-desktop,keyboard-focus-desktop,forced-colors-desktop}/{blob,atmosphere}.png` |

Nothing outside this directory was written. No source edits land from this seat.

---

## 1. New findings

### P-1 · MAJOR · the wrong producer primitive: 31 `<label>` elements that label nothing

Neither prior pass states this defect. `ConfiguratorRow.vue.d.ts:38-49` legislates against the exact
usage in this file, in the producer's own words:

> **ConfiguratorRow** (this) — for TOKEN, PRESET controls. Carries the token-`name` reference, the
> opt-in `reset` affordance (`canReset`), and the three-rung `size` axis. **No a11y for/id wiring.**
> **LabeledField** — for form controls. Carries stable label, description, error, requirement,
> state, and layout associations without styling the control.
>
> Reach for ConfiguratorRow only when token metadata or reset is the content; **use LabeledField
> directly for an accessible form control**, including inside a Configurator.

`ConfigSliderPane.vue:137-153` uses `ConfiguratorRow` for 31 accessible form controls. Captured DOM
(live, `/#/blob`, first row):

```html
<div data-slot="configurator-row" class="configurator-row flex flex-col gap-1.5 py-1">
  <label data-slot="label" class="glass-label truncate text-small font-medium text-foreground">Body Radius</label>
  …
  <span data-slider-impl dir="ltr" data-slot="slider" class="glass-slider" data-variant="spectrum" aria-label="Body Radi…
```

No `for`. No `id` on the control. The `<label>` is associated with nothing — clicking it does not
focus or activate its slider. The pane compensates by re-stating the same string as
`:aria-label="def.label"` on the Slider (`:145`), so the accessible name is duplicated in the DOM
while the visible label remains an orphan.

This is the producer's documented wrong-primitive choice, in writing, 31 times. It is *why* the pane
also has no `description`/unit slot, no error state and no requirement state (P-2, and pass-1 D-11):
those are `LabeledField`'s job, and `LabeledField` was never reached for.

### P-2 · MAJOR · `aria-valuetext` is null on all 31 rows; the announced value contradicts the visible one

`VISUAL-CONSTITUTION.md §5.2`, numeric Slider axis row: *"Home=min, End=max; **announce label, value,
unit**."* §7 (Picker): *"the operable slider exposes the identical channel name/value/unit through
`aria-valuetext`."*

Measured, every `[role="slider"]` in `.config-console`:

```
aria-valuetext : null        (31 / 31)
aria-valuenow  : "0.22"      ← announced
visible readout: "0.220"     ← rendered by fmt()  (ConfigSliderPane.vue:84-86)
unit           : absent from the DOM entirely
```

Two failures. The announced and displayed representations of the same number **disagree in format**,
so a screen-reader user and a sighted user reading the same row over a shoulder hear and see
different strings. And there is no unit anywhere in the composition — the consumer's workaround is to
bake it into the label (`BlobPane.vue:111` — `s("satellites.mergeDuration", "Merge (ms)", 500, 5000, 100)`),
which is the smell that proves the missing slot, and which then leaks the unit into the *accessible
name* rather than the value.

`SliderDef` (`:27-33`) has fields for `key`, `label`, `min`, `max`, `step` — and no field for a unit
or a precision. The type is the defect's origin.

### P-3 · MAJOR · the default slot has no layout contract, so the pane renders two label columns 15 px apart

`:110` is a bare `<slot />` between the header and the console, with no grammar, no padding contract
and no alignment law. Its only consumer therefore invented its own row species
(`AuroraPane.vue:118-192`) with its own padding (`px-4 sm:px-6 pt-2 pb-1`) *outside* the console
well's `padding: 0.75rem 0.875rem` (`:188-189`). Measured label-column origins on `/#/atmosphere`:

```
1440×900:  slot (Select) labels x = 224  |  slider labels x = 239  |  section title x = 239   → Δ 15 px
 390×844:  slot (Select) labels x =  33  |  slider labels x =  48  |  section title x =  48   → Δ 15 px
```

Two label columns, 15 px apart, in one pane, at every viewport — visible as a ragged left edge in
`shots/safari-mobile-light/atmosphere.png`. Compounded by two label *species* (uppercase mono caps
vs sentence-case sans) and two row *layouts* (control-beside-label in the slot, control-below-label
in the sections). One pane, two grammars, neither aligned to the other.

The mechanism is the slot's emptiness, not AuroraPane's CSS: a slot that hands out no rhythm cannot
receive one back.

### P-4 · MAJOR · the documented empty state does not exist, and its absence also removes the actions

`ConfigSliderPane.vue:44`, in the prop doc:

```ts
/** Slider sections to render. Pass empty array to show empty state. */
sections: SliderSection[];
```

There is no empty state. Both guards — `:119` (`v-if="sections.length > 0"` on the console) and
`:163` (the same condition on the action bar) — have **no `v-else`**. With `sections=[]` the pane
renders `PaneHeader` + the slot and nothing else, **and Copy JSON / Reset disappear with the
sliders**.

That is the exact configuration the slot exists to serve — a pane whose controls are all
non-numeric — and in it the user loses the ability to copy or reset the config. A documented state
that was never built is a design defect; the doc line is also false. (`demo/shared/ui/EmptyState.vue`
exists in this repo and is not reached for.)

### P-5 · MAJOR · the project's own focus recipe, written naming "a slider thumb", is not composed here — and the dark arm measures 1.06 : 1

Pass 2 (N-2) measured the focus indicator in the **light** scheme as a focused-vs-unfocused pixel
diff (SC 2.4.11's *state change* arm): max 1.87 : 1, median 1.01 : 1. This pass measures the
complementary arm — the indicator against the **adjacent colour it rides over** (SC 1.4.11) — and
adds the **dark** scheme, which no prior pass measured.

Measured (`CSP-D-probe4.mjs`; the ring colour composited over each ground by the browser's own
canvas-2D sRGB conversion, then WCAG relative luminance):

| | light | dark |
|---|---:|---:|
| focus ring composited over **the track** | **1.17 : 1** | **1.06 : 1** |
| focus ring composited over **the well** (the 2 px that overhangs) | 1.76 : 1 | 2.32 : 1 |
| track vs well (for reference) | 5.82 : 1 | 8.30 : 1 |
| **project `--focus-ring-*` recipe composed?** | **false** | **false** |

```
computed :focus-visible box-shadow (light) = color(srgb 0.6655 0.0001 0.2617 / 0.3) 0 0 0 2px, …
computed :focus-visible box-shadow (dark)  = color(srgb 0.9999 0.9247 0.9331 / 0.3) 0 0 0 2px, …
computed outline-style                     = none
:focus-visible matched                     = true   (both schemes)
```

The dark scheme is worse than the light one (1.06 vs 1.17) because the same 0.3-alpha near-white ring
sits on a near-white track — the polarity inversion of the `--ink-muted` fill carries the ring's
ground with it.

The new fact: **this repository already owns the cure and does not apply it here.**
`demo/styles/focus-ring.css:17-31` declares itself *"ONE token recipe reused by every
keyboard-operable control"*, dual-contrast *"so at least one edge contrasts against ANY fill the ring
rides over (a gradient stop's own colour, **a slider thumb**, a swatch)"*, with
`--focus-ring-inner: rgba(0,0,0,0.85)` / `--focus-ring-outer: rgba(255,255,255,0.92)` at `:33-36`.
Both tokens resolve on the page. Neither appears in any of the 31 thumbs' computed `box-shadow`. The
file's own header records that it is applied by *"the gradient stop handles + remove chip today"* —
the pane's 31 thumbs are the largest population of keyboard-operable controls in the app and are
outside it.

`VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in both schemes,
forced colors and reduced transparency."* Measured distinct in none.

### P-6 · MAJOR · `--ink-muted` is certified against the **resting plate** and applied on the **well** — `:198-201`'s claim is unproven

Pass 2 (N-4) established the *byte identity* of the track fill and the readout ink. This pass
establishes the token's **provenance**, which makes the source comment's own justification false.

`ConfigSliderPane.vue:196-202`:

> the config population re-inks its track via the SAME cure class … the certified de-emphasis rung
> `--ink-muted` (the D6 contract's stamped token — the exact material ExtractControls falls to when no
> live pick threads) **is ≥3:1 on the well by construction**.

The token is written by one app-level boot instance:

```
demo/color-picker/composables/boot/useAtmosphereBoot.ts:96-105
    watch(mutedInkCss, (css) => document.documentElement.style.setProperty("--ink-muted", css), …)

demo/color-session/useContrastSafeColor.ts:316-330
    // The de-emphasis rung (F-4): floor-clamped certified ink for the RESTING PLATE — the boot
    // writer stamps it as `--ink-muted` (the plate-caption / parse-echo voice …)
    const mutedInkCss = computed(() => resolveMutedInk(surfaceLightnessNow("resting", …), …));
```

The certification referent is `surfaceLightnessNow("resting", …)`. The pane applies the result on
`.console-well`, whose computed background is a **different rung**:

```
--well-bg  = color-mix(in oklab, light-dark(hsl(30 85% 96%), hsl(26 22% 17%)) 92%,
                                  light-dark(hsl(24 10% 10%), hsl(30 14% 90%))  8%)
.console-well computed background = oklab(0.913295 …) light / oklab(0.345295 …) dark
```

Nothing certified this token against `--well-bg`. "By construction" is asserted, not derived. The
measured outcome happens to clear 3:1 — it clears it by **1.94×** (light) and **2.77×** (dark),
because the token is floor-clamped for **text** (≈4.5:1), not for a graphic (3:1). That is the
quantified cause of pass-1/pass-2's hierarchy inversion: the pane's largest area is painted at a text
contrast target.

Second provenance fact, from a repo-wide census: `grep -rn -- "--ink-muted" demo/` returns 7 consumer
files. Six use it as `color:` (`ImageDropZone.vue:110`, `ExtractWorkbench.vue:291`,
`ExtractControls.vue:149`, `ColorComponentDisplay.vue:200,205,211`, `ParseEchoReadout.vue:38,44`,
`EmptyState.vue:97`). **`ConfigSliderPane.vue:202` is the only site in the repository that uses it as
a fill.** It is not a shared idiom; it is a one-off.

`PROPORTION-AUDIT.md §5` law 8 — *"Real rendered relation wins over token intent … token presence
alone cannot close a row"* — and this is the sharper form: a token named, certified and used
everywhere else as *text de-emphasis*, made into the pane's loudest surface at one site.

### P-7 · MINOR · the type hierarchy has zero rungs between a row and a section

Measured computed styles, 1440×900 (`--type-small` resolves `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)`
→ **16.4px** at this viewport):

| element | role | family | size |
|---|---|---|---:|
| `.config-section-title` (`:237-243`) | **section heading** | Fira Code | **16.4 px** |
| `.aurora-row-label` (`AuroraPane.vue:194-200`) | **row label** | Fira Code | **16.4 px** |
| `ConfiguratorRow` `<label>` | **row label** | Plus Jakarta Sans | **16.4 px** |
| the live value | **the datum** | Fira Code | **11 px** (`text-micro`) |

Pass 1/2 recorded the family breach (mono owning a section heading, against `VISUAL-CONSTITUTION §4`'s
closed matrix which assigns section heading → `text-heading` → Plus Jakarta Sans). The new fact is the
**scale**: there is *no size step at all* between a row label and the heading that governs it — 16.4
px against 16.4 px — while the one element carrying information renders at 11 px, **0.67× its own
label**. §4 assigns the value role `text-mono-small`; the rendered class is `text-micro`.

A hierarchy in which the governing heading, the governed label and the section label are all the same
size, and the datum is the smallest ink on the surface, is inverted at every rung simultaneously.

### P-8 · MINOR · the mobile action band: 12.9 % of the pane, at 21 px — larger than every heading it sits under

Measured on `/#/atmosphere` (the only route where the pane renders below `lg`):

| | 1440 × 900 | 390 × 844 |
|---|---:|---:|
| `.config-action-bar` height | 77.0 px | **93.7 px** |
| … as a share of the pane | 9.9 % | **12.9 %** |
| button font-size | 16.4 px | **21 px** |
| "Copy JSON" rect | 134.9 × 36 | **165.8 × 54** |
| section heading font-size, same frame | 16.4 px | **14 px** |

At 390 px, two secondary utility verbs render at **21 px** — 1.5× the section heading, larger than
every control label in the pane — inside a permanently reserved 93.7 px band. Visible in
`shots/safari-mobile-light/atmosphere.png`, where "Copy JSON" is the second-largest type on screen
after the pane title.

`VISUAL-CONSTITUTION.md §3` law 8: *"One pane may have one full-strength visual protagonist.
Supporting fixtures do not compete with it through equal size or equal shadow."*
`PROPORTION-AUDIT.md §5` law 7: *"Visual glyph size, operable target size and layout reservation are
separate quantities. Accessibility floors do not require bloated visible chrome."* The touch floor
was met by inflating the visible glyph — the exact failure law 7 names.

Same frame, the companion defect: the unbounded slot (P-3) takes the top half of the pane with four
Select rows, so the slider console — the component's declared subject — gets **one visible row**, with
the second ("Noise 0.500") cut mid-row at the fold. The pane's protagonist is starved by its own
slot, under an action band larger than any heading.

### P-9 · MINOR · Reset's non-slider blast radius is wider than `paletteStops`

Pass 2 (N-1) proved the `color.paletteStops` clobber with a live before/after read. This pass
enumerates the rest. `Object.assign(config, structuredClone(defaults))` (`:92-94`) replaces **every
own top-level key** of `defaults`. Measured:

```
$ node -e "import('@mkbabb/glass-ui/blob').then(m=>console.log(Object.keys(m.BLOB_CONFIG_DEFAULTS)))"
[ 'geometry','satellites','membrane','color','surface','interaction','morphT','quality','tempo' ]   ← 9 replaced

$ … console.log(JSON.stringify(m.BLOB_CONFIG_DEFAULTS.color))
{"paletteStops":["#b5947f","#d4b27d","#dad6b1"],"hueRange":5,"satShift":0,"brightnessShift":0,
 "colorNoiseFreq":2,"colorNoiseSpeed":0.05,"lightnessFloor":0.15}
```

`BlobPane.vue:54-119` declares **31 leaf slider paths**. Reset therefore also silently rewrites
`color.lightnessFloor`, `quality` and `morphT` — three atoms the pane exposes no control for, in
addition to `color.paletteStops`. `quality` in particular is viewport-derived
(`HeroBlob.vue:178` — `isLgViewport.value ? appBlobConfig.quality : "half"`), so Reset can also undo a
device-appropriate render setting.

**The reset scope is `Object.keys(defaults)`, not the pane's declared surface.** No amount of
confirmation UI fixes that; the scope has to be derived from `sections`, or delegated to
`useConfiguratorState` (pass 2 §4). Recorded here so the cure is specified against the right set.

### P-10 · MINOR (hypothesis) · one consumer has a compile-time key guard and the other does not; the unguarded path throws in render

`BlobPane.vue:36-48` derives a `NumericAtomPath` mapped type so *"a typo or an abrogated key fails
typecheck here rather than silently no-op'ing a slider"*. `AuroraPane.vue:97-106` passes plain string
keys with **no guard**:

```ts
const SECTIONS: SliderSection[] = [{ title: "Field", defs: [
    { key: "colorEnergy", … }, { key: "noise", … }, { key: "zones.count", … } ] }];
```

`AuroraAtoms.zones` is optional — `AuroraPane.vue:74` proves it (`atoms.zones?.arrangement ?? "composed"`).
The unguarded path is not defensive: `readPath` (`:57-64`) returns `undefined`, `read()` (`:76-78`)
casts it to `number`, and `fmt()` (`:84-86`) evaluates `undefined.toFixed(3)` → **TypeError during
render**. `writePath` (`:66-73`) throws the same way on a missing intermediate segment.

**Labelled a hypothesis:** the mechanism is certain from the source, but `DEFAULT_AURORA_ATOMS`
(`demo/scenes/atmosphere/aurora-atoms.ts:58-63`) currently defines `zones: { count: 6, arrangement:
"scattered" }`, so it does not reproduce today. It is a producer-rename away, and only one of the two
consumers would catch it at build time. The asymmetry lives in `SliderDef.key: string` (`:28`) — the
type is too weak to carry the guard for both consumers, which is also why the guard had to be
hand-built in one of them.

### P-11 · INFO · forced-colors: zero coverage here, and the pane's sole cure is exactly what WHCM discards

Repo-wide census:

```
$ grep -rln "forced-colors" demo/ | wc -l   →  3   (focus-ring.css, foundation.css, GradientStopEditor.vue)
$ grep -rn  "forced-colors" demo/  | wc -l   →  9
$ grep -c "forced-colors\|prefers-reduced-motion\|prefers-contrast" demo/scenes/ConfigSliderPane.vue  →  0
```

The project does author forced-colors handling; this pane authors none. Its only contrast mechanism
is a `background-color` custom-property feed (`:202`) — precisely the property `forced-colors: active`
overrides — so under WHCM the track and range collapse to one system colour and the control loses its
extent reading entirely. Simultaneously the 7 `color-mix(… --border 50%, transparent)` section rules
(`:233`) are forced to full-strength `CanvasText` and become the loudest marks in the pane, inverting
their design intent.

`shots/forced-colors-desktop/blob.png` still renders full chroma — WebKit did not honour the
emulation — so this arm remains **untested by the matrix**. Recorded as reasoned-from-code, consistent
with pass 1's Chromium measurement, and flagged as the one state in the matrix with no live witness.

---

## 2. Corrections to pass 2

### K-1 · the settled blob seat is **180.2 px**, not 63 px — the ratio is **12.2 : 1**, not 89.7 : 1

Pass 2's C-2 corrects pass 1's "~90 px bead" to "**63 px**" and builds its headline N-3 number on it:
*"form visible port 512 × 695 = 355 840 px² preview 63 × 63 = 3 969 px² → **89.7 : 1**"*.

63 px is a **pre-settle frame**. The blob canvas grows during boot and then holds. Measured
(`CSP-D-probe6.mjs`, 1440×900 light, `getBoundingClientRect` sampled at 1 Hz for 25 s):

```
formArea 396288 px²   (the pane root, 512.0 × 774.0)
 3s:127.8×127.8 = 24.3×   4s:180.2×180.2 = 12.2×   5s…25s: 180.2×180.2 = 12.2×  (22 consecutive samples)
preview area   min 16333 px²   max 32472 px²        ratio bracket 24.3 : 1 … 12.2 : 1
```

A separate earlier run caught a 63.1 × 63.1 sample at ≈3.5 s (ratio 99.5 : 1) — i.e. the pre-settle
window spans at least 63 → 128 → 158 → 180 px. **The settled seat is 180.2 CSS px** and the settled
ratio is **12.2 : 1**.

Why this matters beyond arithmetic: `PROPORTION-AUDIT.md §2` clause 4 already legislates the
protocol — *"after P047's `settled` seam at the fixed reference seed/color and no fission, sample the
transparent renderer buffer… Source radius, CSS token presence and a canvas bounding box cannot
substitute for this result."* Both prior passes quoted an unsettled bounding box. PR-10's DELTA would
have been entered at a number ~7× too large and would not survive re-measurement.

**The finding is unaffected and stands.** The binding law (`VISUAL-CONSTITUTION §3` law 3) requires
the preview to be *larger* than the form; at the settled frame it is **12.2× smaller**, and at no
sampled frame in 25 s is it ever larger. Pass 2's structural conclusions — 50.000/50.000 stage split,
the seat being the Picker's inline seat, `§7`'s "does not reuse the Picker inline-seat diameter" —
all hold unchanged. Only the ratio must be restated: **12.2 : 1 settled**, with the pre-settle
excursion recorded as a separate observation.

### K-2 · citation — the preview-larger law is `§3` law 3, not `§3.3`

Pass 2's N-3 cites *"`VISUAL-CONSTITUTION.md §3.3` — 'Atmosphere/Blob preview area is larger than the
form at every desktop size.'"* There is no §3.3 in that document: §3 is *Proportion laws* (the quoted
sentence is its numbered **law 3**), §3.1 is *Binding route compositions*, §3.2 is *Binding Picker
crop correction*. The quotation is verbatim and correct; only the pointer is wrong. Fixed here so the
register row cites a resolvable coordinate.

### K-3 · the "12 × 44 mobile" thumb figure contradicts pass 2's own mobile row, and measures the wrong element

Pass 2's §3 confirmation table records *"`.slider-thumb` rect = 12 × 24 desktop, **12 × 44**
mobile"*, while two rows above, its D-2 line records mobile `/#/blob` = *"228 elements / 69 chars /
**0 slider thumbs**"*. Both cannot describe the same route. The 44 px figure can only come from
`/#/atmosphere`, which is the only route rendering this pane below `lg`.

The measurement also attributes the block extension to the wrong element. `:218-230` applies
`block-size: max(100%, var(--dock-touch-target, 2.75rem))` to a `::before` on **`.glass-slider`** —
the slider *root* — not to the handle. The handle's own rect is **12 × 24 in every matrix**, which is
what `REPORT.json` measures and reports (31 rows of `{"w":12,"h":24,"tag":"span"}` on
`/#/blob`). Pass 1's D-5 conclusion (the coarse-pointer cure does not fix the failing axis) is
correct and is in fact stronger than its own supporting number: the failing axis is **inline** (12
px), the cure extends **block**, and on a fine pointer the cure is absent entirely.

---

## 3. Independent confirmations (this pass, different probe stack)

All agree with the prior passes; recorded compactly so they are not re-litigated.

| Prior finding | This pass' measurement |
|---|---|
| pass-1 D-3 / pass-2 N-4 — no value fill | one painted layer inside `.glass-slider`: `{cls:"slider-track", bg:"oklch(0.447121 …)", w:432, h:24}`. No `.slider-range`. `data-variant="spectrum"` on non-chromatic domains (`membrane.noiseFreq`, `tempo`, `specShininess`) — `VISUAL-CONSTITUTION §1` reserves the spectral rail for *"genuinely chromatic continuous domains — Picker and Gradient"* |
| pass-1 D-5 — sub-minimum targets | `thumbsUnder24w: 31` live; `REPORT.json` `/#/blob` lists 31 of 39 `smallTapTargets` as `{"w":12,"h":24}` named `Body Radius … Speed`. WCAG 2.2 SC 2.5.8 floor 24 × 24 |
| pass-1 D-12 — the "ONE RHYTHM SOURCE" clamp | computed `min-block-size: 35.84px` (`7cqi` resolving against the 512 px pane container) vs measured row height **60.97 px**. Overshot on all 31 rows; the clamp never binds |
| pass-1 D-17 / pass-2 §3 — the fade that does not fade | `maskImage: "none"`, `webkitMaskImage: "none"`; `scrollHeight 2611 / clientHeight 695` → **73.4 % hidden**. `.pane-scroll-fade` is defined at `demo/shared/ui/PaneHeader.vue:54-57` as `{contain: layout style paint; scroll-timeline: --pane-scroll block;}` — no mask, no gradient. Also mis-hosted: PaneHeader.vue:43-45 states the class *"lives on the ROOT element of each pane Card"*; here it is on the inner scroll div (`:106`), not the Card root (`:99`) |
| pass-1 D-11 — readout reflow | rendered `text-micro font-mono` metrics: `membrane.noiseFreq` `"1"` = **6.78 px** → `"0.500"` = **33.86 px**, **Δ 27.08 px**; `tempo` identical; `specShininess` Δ 6.77 px. `font-variant-numeric` not tabular; no width reservation in the `flex items-baseline justify-between` row |
| pass-1 D-2 — absent below the breakpoint | live 390 × 844 `/#/blob`: `.config-console` **absent**, `body.innerText.length` = 68, controls = `["Picker","Blob",…]` with *Picker* active. `shots/zoom-200-desktop/blob.png` identical. WCAG 1.4.4; `VISUAL-CONSTITUTION §3` law 6 abrogates the pane selector this depends on |
| pass-2 C-1 — copy feedback | clicking *Copy JSON* changes `document.body.innerText.length` by **−21** (nothing added); the page's only `aria-live`/`role=status` nodes are the unrelated dev-misconfig alert and the Picker's four `aria-live="off"` channel readouts. **No status region exists in this pane** |
| pass-1 D-6 — repeated boundaries | 7 × `.config-section-header` `border-bottom` + 1 × `.config-action-bar` `border-top` = 8, over a `.console-well` that already supplies a tone-step + hairline (`foundation.css:350-354`) and a `gap-5` interval. `PROPORTION-AUDIT §5` law 4 |
| pass-2 C-3 — RTL | concur: the axis does not mirror (`dir="ltr"` pinned on `[data-slider-impl]`), which is `§5.2` + `§6.1` composing correctly. The leading-destructive-action half stands (`shots/rtl-desktop/blob.png` → `Reset ‖ Copy JSON`). One addition: the live readout also precedes its own label (`0.220 Body Radius`) with no LTR isolate, against `§6.1`'s *"render in LTR-isolated spans inside RTL prose"* |
| pass-1 D-10 / pass-2 N-1 — Reset | reproduced end-to-end: 6 × `ArrowRight` on `Body Radius` (step 0.005) moved `0.220 → 0.250`; clicking **Reset** returned it to `0.220`. Blast radius enumerated at **P-9** |

---

## 4. Two additions to the pass-2 transposition map

Pass 2 §4 is correct and is the disposition of record. Two rows are missing from its table.

| Finding | Hand-rolled here | Ships in glass-ui 7.0.0 / this repo |
|---|---|---|
| **P-1** · 31 orphan `<label>`s, duplicated accessible names | `ConfiguratorRow` + a compensating `:aria-label` on the Slider (`:137-145`) | **`./labeled-field` → `LabeledField`** — the producer's own doc routes accessible form controls here explicitly (*"No a11y for/id wiring… use LabeledField directly for an accessible form control, including inside a Configurator"*). It also carries `description`, `error`, `requirement` and `state`, which closes P-2's unit slot and pass-1 D-11's error state in the same move. Pass 2's table lists `labeled-field` only as a cure for "no unit, no numeric entry"; the **association** is its primary job and the primary defect |
| **P-5** · focus indicator 1.06–1.17 : 1 | producer default 2 px ring at 0.3 α accent, `outline-style: none` | **`demo/styles/focus-ring.css:33-36`** — `--focus-ring-inner` / `--focus-ring-outer`, already declared *"ONE token recipe reused by every keyboard-operable control"* and written naming *"a slider thumb"*. Pass 2 routes the focus fix through `Slider variant="standard"` alone; that repairs the **ground** but leaves the ring at 0.3 α accent. The second half is binding the producer thumb's `:focus-visible` to this existing dual-contrast pair, so the indicator reads on any track the variant later ships |

Both additions land at the producer / at a shared token, not in `demo/scenes/` — consistent with
owner edicts 4 and 5, and with pass 2's conclusion that the correct move is subtraction rather than a
better local build.

---

## 5. Finding index (this pass)

| ID | Severity | One line |
|---|---|---|
| **P-1** | MAJOR | wrong producer primitive — `ConfiguratorRow` is documented *"No a11y for/id wiring; use LabeledField"*; 31 `<label>`s with no `for`, plus a duplicated `aria-label` |
| **P-2** | MAJOR | `aria-valuetext` null × 31; announced `0.22` vs displayed `0.220`; no unit in the DOM, baked into the label instead (`BlobPane.vue:111`) |
| **P-3** | MAJOR | the bare `<slot/>` has no layout contract → two label columns **15 px** apart (224 vs 239 @1440; 33 vs 48 @390) and two row grammars in one pane |
| **P-4** | MAJOR | `:44` documents an empty state that does not exist; `sections=[]` also removes Copy JSON / Reset |
| **P-5** | MAJOR | focus ring vs the track it rides over = **1.17 : 1** light / **1.06 : 1** dark; the repo's own dual-contrast recipe, written naming "a slider thumb", is **not composed** (`projectRecipeUsed: false`) |
| **P-6** | MAJOR | `--ink-muted` is certified against the **resting plate**, applied on the **console well** — `:198-201`'s "≥3:1 on the well by construction" is unproven; and this is the **only** site in the repo using the token as a fill (6 others use it as `color:`) |
| **P-7** | MINOR | zero size step between row label and section heading (both **16.4 px**); the datum is **11 px** `text-micro` where `§4` assigns `text-mono-small` |
| **P-8** | MINOR | mobile action band **93.7 px = 12.9 %** of the pane, buttons at **21 px** — larger than every heading; the unbounded slot starves the sections to one visible row |
| **P-9** | MINOR | Reset replaces **9** top-level atoms against **31** declared leaf paths — also `color.lightnessFloor`, `quality`, `morphT`, not only `paletteStops` |
| **P-10** | MINOR (hyp) | `AuroraPane` has no compile-time key guard (`BlobPane` does); the unguarded path reaches `undefined.toFixed(3)` → TypeError in render |
| **P-11** | INFO | zero `forced-colors` blocks here vs 9 in 3 files repo-wide; the sole cure is a `background-color`, which WHCM discards; the arm has no live witness |
| **K-1** | correction | settled blob seat is **180.2 px**, not 63 px → ratio **12.2 : 1**, not 89.7 : 1; both prior passes sampled a pre-settle frame against a clause that mandates a settled protocol |
| **K-2** | correction | the preview-larger law is `VISUAL-CONSTITUTION §3` **law 3**, not "§3.3" |
| **K-3** | correction | pass 2's "12 × 44 mobile" thumb contradicts its own "0 slider thumbs on mobile `/#/blob`" row, and measures `.glass-slider`'s band rather than the handle; the handle is **12 × 24 in every matrix** |
| §3 | confirmations | pass-1 D-2/D-3/D-5/D-6/D-10/D-11/D-12/D-17 and pass-2 C-1/C-3/N-1 independently re-measured and agreeing |
| §4 | cure | two rows added to pass 2's transposition map: `LabeledField` (association) and the `focus-ring.css` recipe binding |

---

## 6. What is genuinely sound

Reported with positive evidence, so the next pass does not spend probes here.

- **Owner edict 7 (idiomatic Vue 3.5) — clean.** `:41` uses reactive props destructure
  (`const { config, sections, defaults, title, description } = defineProps<{…}>()`). No template ref
  is warranted, so `useTemplateRef`'s absence is correct. No `defineModel` round-trip exists, so no
  `shallowRef` cache is owed.
- **Owner edict 8 (`verbatimModuleSyntax`) — clean.** Every type-only import across the three files is
  `import type` (`ConfigSliderPane.vue:16-23` are all value imports; `AuroraPane.vue:25-34` and
  `BlobPane.vue:13-15` correctly mark `AcceptableValue`, the four aurora atom types, `BlobConfig` and
  `SliderSection`).
- **Owner edict 6 (animations never deleted) — not violated.** The pane authors no motion; the thumb's
  `transform .2s linear(…)` and the track's `background .2s` are producer registers.
- **Owner edicts 1 and 2 — clean.** No god module was fed; no alias, migration shim, dual path or
  masking fallback exists anywhere in the file.
- **RTL axis semantics — correct** (pass 2's C-3 retraction confirmed independently): `dir="ltr"` is
  pinned on `[data-slider-impl]`, so the scientific axis does not mirror while the chrome does —
  `§5.2` + `§6.1` composing as legislated. The pane's own CSS is RTL-clean: symmetric shorthand
  throughout and `inset-inline` on the one bespoke pseudo-element (`:225`).
- **Keyboard operation works.** 6 × `ArrowRight` on `Body Radius` (step 0.005) → `0.220 → 0.250`;
  Reset → `0.220`. The 31 thumbs are all `tabIndex 0` and all match `:focus-visible` on keyboard entry
  (the indicator's *legibility* is P-5's defect, not its *presence*).
- **Runtime health.** `REPORT.md` records **0** page errors, **0** horizontal overflow, **0** blank or
  near-blank captures and **0** missing dark-class rows across all four Safari matrices on both
  routes. The pane does not crash, does not overflow, and renders in both schemes.
- **The generic merge itself (Ae-6) was the right instinct.** AuroraPane and BlobPane genuinely share
  one composition. The defect is the *substrate* chosen for that sharing — a demo-local `Card` shell
  instead of the producer's `Configurator` — not the decision to share.
