# CHALLENGE-D — `demo/scenes/ConfigSliderPane.vue` — the design is flawed (PASS 2)

## Model receipt

I observe myself to be **Claude Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm.
This seat was spawned with an explicit Opus 5 declaration and the served tier agrees with it. The
seat is declared, not inherited. No Fable was used in this lane.

---

## 0. What this pass is

A pass-1 CHALLENGE-D report exists at HEAD, dated 2026-07-24, 21 findings. It is preserved verbatim
at **`challenge-D-design.pass-1-2026-07-24-prior.md`** and is not superseded — it remains the fuller
enumeration. This document is the **second independent pass** against the same subject at the same
repo state, and it exists to do three things pass 1 did not:

1. **Four new findings**, all measured, three of which pass 1's probe set could not have produced.
2. **Three corrections** to pass-1 mechanism claims — two of which make the finding *sharper*, one of
   which retracts a finding as canon-compliant.
3. **The transposition.** Pass 1 diagnosed 21 defects and proposed 21 local cures. It never located
   the producer surface that already solves them. glass-ui 7.0.0 ships a `Configurator` family whose
   own type documentation **names aurora and blob as its intended consumers**. That citation is the
   single most decisive design-boundary fact available about this component and it is absent from
   pass 1. §4 draws the map.

Verdict is unchanged and reinforced: **DEFECTIVE.**

| Field | Value |
|---|---|
| Subject | `demo/scenes/ConfigSliderPane.vue` (252 lines) |
| Consumers | `demo/scenes/blob/BlobPane.vue` (31 rows), `demo/scenes/atmosphere/AuroraPane.vue` (3 rows) |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| Producer | `@mkbabb/glass-ui@7.0.0` |
| Live probes (this pass) | `chD-design-probe.mjs`, `chD-probe2.mjs`, `chD-focus.mjs`, `chD-ratio.mjs` in the session scratchpad; Chromium 1440×900 DPR 2, `http://localhost:9000/#/blob` |
| Frames re-read | `shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,safari-mobile-dark,rtl-desktop,zoom-200-desktop,keyboard-focus-desktop,forced-colors-desktop}/{blob,atmosphere}.png` |

Nothing outside this directory was written. No source edits land from this seat.

---

## 1. New findings

### N-1 · BLOCKER · `Reset` destroys live, externally-owned state that is not a slider

Pass-1 D-10 records that Reset "overwrites 31 live atoms with no confirmation, no undo". That
understates it. `Object.assign` overwrites **every own key of `defaults`**, not the keys this pane's
`sections` address — and `BLOB_CONFIG_DEFAULTS` carries a key that the pane's own consumer documents
as *belonging to something else*.

`ConfigSliderPane.vue:92-94`

```ts
function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`BlobPane.vue:8-9`, the contract it breaks, in the consumer's own words:

> `color.paletteStops` is omitted: it is the live picker-palette feed (App.vue's `deriveBlobPalette`
> watch), **not a slider**.

**Measured** (`chD-design-probe.mjs` §B — read the live config through the pane's own Copy JSON path,
click Reset, read again):

```
pre-reset  color.paletteStops = ["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]   ← derived from the picked colour
post-reset color.paletteStops = ["#b5947f","#d4b27d","#dad6b1"]             ← stale library default
undo affordance present  = 0
confirm dialog present   = 0
```

The hero blob desaturates from the live pink palette to a canned brown/olive triple **and stays
there**, because the producing watch (`demo/color-picker/composables/boot/useAtmosphere.ts:393`)
only re-fires when the picked colour changes. The user pressed "Reset" on a slider pane and silently
broke the colour binding that is the entire premise of the route
(`VISUAL-CONSTITUTION.md §7`: "the background aurora derives its palette from the picked colour").

This is not a missing-affordance finding. It is **data loss with a visible wrong render**, produced
by a one-line reset that does not respect its own declared scope.

**Reproduction.** `/#/blob` → **Reset** → **Copy JSON** → paste. `color.paletteStops` is the brown
triple; the blob on screen is brown.

**Cure.** Reset must be scoped to `sections[].defs[].key` and applied through `writePath`, or —
better — delegated to `useConfiguratorState` (glass-ui `./configurator`), which owns preset/diff/reset
semantics against a declared shape. A whole-object `Object.assign` can never be correct here, because
the pane does not own the whole object.

---

### N-2 · BLOCKER · the focus indicator in the ordinary light scheme measures 1.87 : 1

Pass 1 measured the focus ring **only under forced colors** (its D-1) and explicitly recorded that
the tracked `keyboard-focus-desktop` frame "says nothing about the pane's own focus states". The
ordinary-scheme case was never measured. It fails too.

**Measured** (`chD-focus.mjs`: clip-screenshot the first `.slider-thumb` ±14 px, `focus()`, re-clip,
per-pixel diff, WCAG relative-luminance on every changed pixel):

```
changed pixels: 2 219 / 6 400
max contrast ratio across ALL changed pixels: 1.87 : 1
median changed pixel:                          1.01 : 1
computed :focus-visible box-shadow = 0 0 0 2px color(srgb 0.6655 0.0001 0.2617 / 0.3), 0 0 8px …
computed outline-style = none
```

WCAG 2.2 SC 2.4.11 (Focus Appearance) requires ≥ 3:1 between the focused and unfocused states of the
indicator area. The **best** pixel on the whole indicator reaches 1.87:1; the typical pixel is
1.01:1 — indistinguishable.

`VISUAL-CONSTITUTION.md §4.1`: "Focus remains visibly distinct from selection in both schemes, forced
colors and reduced transparency." It is distinct in none of them.

The cause is this component's, not the producer's: a 2 px ring at **30 % alpha** is legible on the
producer's default `--secondary` track, and illegible on the near-black slab this pane substitutes
(N-4 / pass-1 D-4). **The pane destroyed its own focus affordance as a side effect of re-inking the
track.** That coupling is the finding — it is why the cure must be structural rather than a ring
tweak.

**Reproduction.** `chD-focus.mjs`; artefacts `scratchpad/thumb-{unfocused,focused}.png`.

---

### N-3 · MAJOR · the `/#/blob` route measures **exactly 50.000 / 50.000**, and the form is 89.7× the preview

Pass 1 reported the pane at "512 px of a 1440 px viewport → 35.6 % of the viewport". Measured against
the *viewport* that number reads as near-compliant with the binding 33.333 % inspector arm. Measured
against the **stage** — the two panes that actually partition the composition — it is not.

**Measured** (`chD-ratio.mjs`, 1440×900):

```
main → DIV.pane-wrapper pane-wrapper--left    x=199  w=512     (the Picker)
main → DIV.pane-wrapper pane-wrapper--right   x=729  w=512     (ConfigSliderPane)
                                              → 512 / 512 = 50.000 % / 50.000 %

canvases on route: 2
  atmosphere-canvas   1440 × 900   x=0      (the full-viewport background)
  goo-blob-canvas       63 ×  63   x=623    (the Picker's inline seat)

form visible port 512 × 695 = 355 840 px²    preview 63 × 63 = 3 969 px²    → 89.7 : 1
```

Three binding clauses fail on those numbers:

* `OPTICAL-BENCH-COMPOSITIONS.md §4`, Blob row — "P122 `preview-dominant`: container-scaled material
  preview **66.6666667 %**; morphology/disclosure inspector **33.3333333 %**; **no Picker diameter
  inheritance**." Measured 50/50, and the only blob paint on the route *is* the Picker seat.
* `VISUAL-CONSTITUTION.md §3.3` — "Atmosphere/Blob preview area is **larger** than the form at every
  desktop size." Measured: the form is 89.7× larger.
* `VISUAL-CONSTITUTION.md §7` — the workbench "owns a persistent container-scaled material preview
  filling P122's exact `preview-dominant` 66.6666667 % stage … **it does not reuse the Picker
  inline-seat diameter**." Measured: 63 px, the Picker inline seat.

`PROPORTION-AUDIT.md:54` PR-10 ("Atmosphere/Blob form acreage exceeds preview → **TIGHTEN**") is the
standing register row. This pass supplies the number it was missing: **89.7 : 1**, and an exact
50.000/50.000 split — not "approximately half", not "35.6 % of the viewport", but a measured 1:1
partition of the stage where the register binds 2:1 the other way.

The component's own root asserts nothing about its arm: `ConfigSliderPane.vue:98`
`class="relative w-full mx-auto h-full min-w-0"` — `w-full` of whatever slot it is handed.

---

### N-4 · MAJOR · the track fill and the live readout are painted from **one byte-identical token**

Pass-1 D-4 correctly names the mechanism ("a text-ink token used as a 962 × 24 px area fill"). What
makes the hierarchy inversion *exact*, and what pass 1 did not show, is that the token is the same
one the readout uses — so the pane's decoration and its datum are not merely similar in weight, they
are **the same colour**.

`ConfigSliderPane.vue:202` and `:205`, twelve lines apart:

```css
.config-console                                  { --slider-track-bg: var(--ink-muted, var(--muted-foreground)); }
.config-console :deep(.configurator-row .font-mono) { color:             var(--ink-muted, var(--muted-foreground)); }
```

**Measured computed values, same page, same frame:**

```
--slider-track-bg on .config-console        = oklch(44.712054906087% 0.003861589952 34.629978305623deg)
.configurator-row .font-mono  color         = oklch(0.447121 0.00386159 34.63)          ← identical
.slider-range     backgroundColor           = rgba(0, 0, 0, 0)                          ← the fill is OFF
.slider-track     h × w                     = 24 × 432 px  = 10 368 px² per row
```

**Measured rendered ink** (extreme-pixel per text run against the `.console-well` ground, real Safari
PNGs, `shots/safari-desktop-{light,dark}/blob.png`):

| Element | light | dark |
|---|---|---|
| row label "Body Radius" | 13.52 : 1 | 9.28 : 1 |
| **inert track slab** | **5.99 : 1** | **8.37 : 1** |
| **live value "0.220"** | **5.82 : 1** | **8.30 : 1** |
| section heading "GEOMETRY" | 5.08 : 1 | 5.97 : 1 |

The element carrying **zero** information out-inks the element carrying **all** of it, in both
schemes, by construction — and out-areas it ≈ **28 : 1** (10 368 px² of slab vs ≈ 372 px² for the
"0.220" glyph box). Multiplied by 31 rows: **321 408 px² of dead ink** in a 462 px-wide console.

`PROPORTION-AUDIT.md §5` law 8 — "Real rendered relation wins over token intent. Adjacent rungs,
measured rects and ink gaps appear in DELTA; token presence alone cannot close a row." The token
`--ink-muted` is *named* for de-emphasis. Rendered as a 24 px area fill it is the loudest thing on
the pane. That is precisely the failure mode law 8 exists to catch.

Correction of emphasis versus pass 1: this is not "an ink token used as a fill" in the abstract. It
is **one token doing surface duty and text duty inside one 250-line component**, which is why no
amount of contrast tuning can fix it — raising the track's contrast raises the readout's identically,
and lowering the readout's lowers the track's. The two uses must be separated before either can be
tuned. That is a structural conclusion, not a colour one.

---

## 2. Corrections to pass 1

### C-1 · `writeClipboard` does not reject — it returns a discarded discriminated result

Pass-1 D-10 states: "`writeClipboard` can reject (permissions, non-secure context, Safari user-gesture
rules); `@click="copyAsJson"` on an `async` function means a rejection is an unhandled promise
rejection."

The producer's typing says the opposite (`dist/composables/dom/useClipboard.d.ts`):

```ts
/** Stateless one-shot clipboard write … Returns the discriminated result
 *  (`{ ok }` / `{ ok, reason }`) **rather than a lossy boolean**, for identical call ergonomics:
 *  `const { ok } = await writeClipboard(text)` */
export declare function writeClipboard(text: string): Promise<CopyResult>;
export type CopyFailureReason = "clipboard-api" | "no-api";
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };
```

It **resolves**, always, carrying a named reason on failure. There is no unhandled rejection. The
defect is worse than pass 1 described and cleaner to state: `ConfigSliderPane.vue:88-90` calls a
function that was deliberately designed to hand back a typed failure — "rather than a lossy boolean"
is the producer arguing this exact point in a doc comment — and **discards it**:

```ts
async function copyAsJson() {
    await writeClipboard(JSON.stringify(config, null, 2));
}
```

`void`-marking it (which pass 1 notes the other three demo call sites do) would not improve it. The
producer also ships `useClipboard({ resetMs, timeoutMs, onCopyError })` with a
`status: "idle"|"pending"|"success"|"failure"` computed — the whole feedback state machine, unused.
Severity stands at pass-1's MAJOR; the mechanism is corrected.

### C-2 · there are two canvases on `/#/blob`, and the blob seat is 63 px

Pass-1 §1.1 prints `blobCanvases: [{ cls: "atmosphere-canvas …", w: 1440, h: 900 }]` and asserts "the
only `<canvas>` on the route is the full-viewport atmosphere background", then five lines later
describes "the ~90 px bead in the Picker card's top-right corner". Both cannot be true. Measured:

```
canvasCount: 2
  atmosphere-canvas   1440 × 900  x=0
  goo-blob-canvas       63 ×  63  x=623
```

The blob is present, it is the Picker inline seat, and it is **63 px**, not ~90 px. The conclusion
pass 1 drew is unaffected and in fact strengthened — see N-3, where 63 px is what produces the
89.7 : 1 ratio.

### C-3 · RTL is canon-compliant; retract "half-mirrored … incoherent"

Pass-1 §1.5 and D-18 call the RTL row "half-mirrored" and its reading order "incoherent" because the
label/value pair mirrors while the track does not. I confirm the geometry and dissent on the verdict.

**Measured** (`shots/rtl-desktop/blob.png` vs `shots/safari-desktop-light/blob.png`): `Orbit Radius
0.170` on a `0.15…0.48` domain puts the thumb at 7 % from the physical left in **both** frames;
`Body Radius` at 38 % in both. The axis does not mirror; the chrome does.

That is exactly what the canon legislates, in two places:

* `VISUAL-CONSTITUTION.md §5.2`, numeric Slider axis row — "identical; **numeric/scientific sign never
  mirrors**".
* `VISUAL-CONSTITUTION.md §6.1` — "chrome, navigation and layout: logical inline/block direction
  follows the document" / "CSS directional keywords and **scientific coordinate axes: preserve their
  declared physical/domain meaning**".

A mirrored label over an unmirrored scientific axis is not a half-measure; it is the two rules
composing correctly. The component's own CSS is also RTL-clean: `.config-console`,
`.config-section-header` and `.config-action-bar` all use symmetric shorthand, and the one bespoke
pseudo-element uses `inset-inline` (`:225`). **Not a defect. Record so it is not re-litigated.**

The *other* half of pass-1 D-18 — that the action order flips and promotes destructive **Reset** to
the leading position — is real and I concur. Given N-1, an RTL user's first action in the pane's
action bar is the one that destroys the picker binding. That raises pass-1 D-18's MINOR to a
contributing factor of N-1's BLOCKER.

---

## 3. Independent confirmations

Re-measured this pass with a different probe stack; all agree with pass 1.

| Pass-1 finding | This pass' measurement |
|---|---|
| D-3 — no slider shows its value | `.slider-range backgroundColor = rgba(0,0,0,0)` on every row, while the geometry *is* computed (`range.w = 163.5` of `432` = 37.8 % for Body Radius). The fill is calculated and then deliberately not painted, because `.glass-slider[data-variant=spectrum] .slider-range { background: 0 0 }` (`dist/glass-ui.css`). `variant` attr measured `"spectrum"`. |
| D-4 / D-14 — reserved chromatic material on non-chromatic domains | confirmed and sharpened at **N-4** |
| D-6 — eight dividing lines | `document.querySelectorAll('.config-section-header').length` → **7**, `borderBottom: 1px solid color(srgb … / 0.5)`; plus `.config-action-bar` `border-top` → **8**. `OPTICAL-BENCH-COMPOSITIONS.md §5` binds Atmosphere and Blob to "Retained non-P122 dividing line: **none**" and "Card count `0`". |
| D-7 — mono owns a section heading | computed `.config-section-title` = `Fira Code`, `16.4px`, `uppercase`, `1.64px` tracking. `VISUAL-CONSTITUTION.md §4`: section heading → `text-heading` → **Plus Jakarta Sans**; mono is the *value/code/provenance* family. The identical five declarations are copy-pasted into `AuroraPane.vue:194-200`. |
| D-11 — no tabular figures, no reserved width | `font-variant-numeric: "normal"`; live sweep of the `Speed` row: `"1"` = **6.78 px** → one `ArrowRight` → `"1.050"` = **33.86 px**, a **+27.08 px** jump on a single keypress. `VISUAL-CONSTITUTION.md §4`: "Live numbers use tabular figures and reserve their widest legal representation so value changes never reflow the settled chassis." |
| D-12 — the "ONE RHYTHM SOURCE" clamp is inert | computed `min-block-size: 35.84px`; measured row height **60.97 px**. The clamp is overshot by 25 px on all 31 rows. |
| D-17 — the fade the class name promises | `getComputedStyle('.pane-scroll-fade').maskImage` → `"none"`. Overflow measured: `scrollHeight 2611` vs `clientHeight 695` — **1 916 px (73 %) below a hard, un-cued edge**, which is the cut visible through the "Noise 0.500" row in `shots/safari-mobile-dark/atmosphere.png`. |
| D-2 — absent below the breakpoint | `REPORT.json`: desktop `/#/blob` = 642 elements / 713 chars / 39 small tap targets; mobile `/#/blob` = **228 elements / 69 chars / 0 slider thumbs**. `shots/zoom-200-desktop/blob.png` shows the Picker with an unselected "Blob" tab. |
| D-5 — sub-minimum targets | `.slider-thumb` rect = **12 × 24** desktop, **12 × 44** mobile. The width never changes in any matrix; the `@media (pointer: coarse)` pseudo (`:218-230`) extends the *root's* band, not the handle. |

**Not re-verified this pass:** pass-1 D-1 (forced colors). I did not re-run Chromium
`forcedColors: "active"`. Pass 1's measurement (`trackBg = wellBg = rgb(255,255,255)`,
`trackEqualsWell: true`, ratio 1.00 : 1) is accepted as recorded, and it is consistent with the
mechanism: the track is a bare `background` with no border, so a UA that forces `Canvas` erases it.
The tracked `shots/forced-colors-desktop/blob.png` is pixel-indistinguishable from the ordinary light
frame and remains **not** evidence of anything.

**Tab-stop cost (new number, supports pass-1 D-9):** the page has 59 focusable stops; **31 of them
(53 %) are inside `.config-console`**, beginning at index 26. A keyboard user who enters the pane
presses Tab 31 times to leave it, with no way to collapse a section they are not tuning.

---

## 4. The transposition — the producer surface that already exists

This is what pass 1 did not do. Every pass-1 cure was local: add a mask, add a status region, add a
`precision` field, delete a `:deep()`. Taken together they amount to *rebuilding a configurator by
hand, correctly this time*. The correct move is not to build it at all.

**glass-ui 7.0.0 exports `./configurator`**, and its own type documentation names this component's two
consumers as the intended users (`dist/components/configurator/ConfiguratorLayer.vue.d.ts`):

> `<ConfiguratorLayer>` — labeled section inside a `<Configurator>`'s controls column. Provides a
> header trigger + chevron affordance + collapsible body. Authors stack multiple layers to express
> the per-axis split (per R2 §C: **aurora** has Medium / Palette / Flow / Texture / Comp / Nuclei;
> **blob** has Mood / Body / Surface / Color / Motion / Pointer / Render).

The producer built the disclosure **for aurora and blob**. The demo hand-rolled a static header and a
`border-bottom` instead. Owner edict 4 in one citation.

### 4.1 Defect → producer surface

| Finding | Hand-rolled here | Ships in glass-ui 7.0.0 |
|---|---|---|
| N-1, D-10 · reset scope, no compare | `Object.assign(config, structuredClone(defaults))` `:92` | `useConfiguratorState<T>` — `ConfiguratorState`, `ConfiguratorCloneMode`, preset/diff/reset against a declared shape (`./configurator`) |
| N-2, N-4, D-3, D-4, D-14 · track ink, dead fill, dead focus ring | `variant="spectrum"` `:146` + `--slider-track-bg: var(--ink-muted)` `:202` | `Slider` `variant="standard"` — restores `.slider-range`'s `--slider-range-bg` liquid fill, the `:hover`/`[data-held]` rim that `spectrum` suppresses, the 6 px `--slider-track-height` rung, and a designed ground for the producer's focus ring |
| N-3, D-2 · composition ratio, absent below `lg` | `<Card>` in a shell-owned 50/50 wrapper `:99` | `<Configurator>` — `stage` + aside, `asideSide`, `asideWidth` minmax band, `galleryPlacement`; "Below `lg` the layout is a single column" — the §3.6 stage→inspector→action sequence, produced not emulated |
| D-9 · no essentials/advanced disclosure; 31 flat tab stops | flat `v-for` over 7 sections, all open `:123-154` | `<ConfiguratorLayer :label :default-open :dividers>` — header trigger + chevron + CSS-only `0fr↔1fr` reveal, `aria-expanded`/`aria-controls` |
| D-17, §1.3 hard cut | `.pane-scroll-fade` (`contain` + `scroll-timeline`, **no mask**) `:106` | `./fading-scroll` → `<FadingScroll axis="y">`; reached automatically by `<Configurator scrollMode="auto">` — "sharp at rest, feathered while overflowing" |
| D-11 · readout reflow | `fmt()` `:84-86` | `./animated-digit` — baked `font-feature-settings:"ss01","tnum","lnum"; font-variant-numeric: tabular-nums lining-nums` (`dist/glass-ui.css:1`) |
| D-11 · no unit, no numeric entry | `SliderDef` has neither `:27-33` | `ConfiguratorRow` `sub` prop (the documented "double-label API"); `./number-field`; `./labeled-field` |
| C-1, D-10 · no copy feedback | `await writeClipboard(...)`, result discarded `:88-90` | `useClipboard({ resetMs, timeoutMs, onCopyError })` → `status: "idle"\|"pending"\|"success"\|"failure"`; `./completion-seal`, `FeedbackMark` |
| D-12 · inert rhythm clamp, `:deep()` corrections | `:deep(.configurator-row){min-block-size:…}` `:215`, `:deep(… .font-mono){color:…}` `:204` | `ConfiguratorRow` `size` prop — "Resolution order: 1. Local `size` prop 2. `<Configurator>` inject 3. baked recipe". `ConfiguratorRow.vue.d.ts` states the API exists so consumers express rows "**WITHOUT a `:deep()` reach into the slot**" |
| D-5 · thumb target geometry | `@media (pointer: coarse) ::before` hit band `:218-230` | `Slider` `size` (`sm\|md\|lg`) — and `VISUAL-CONSTITUTION.md §5` forbids the local version outright: "feature waves own their domain arrangement, **not new slider mechanics**" |
| D-6, D-8 · Card + well + 8 lines | `<Card>` `:99` + `.console-well` `:122` + 7 `.config-section-header` + 1 `.config-action-bar` | `Configurator` is the landmark-neutral chassis; `ConfiguratorLayer` owns section identity through header + interval; `dividers` is opt-in and stays off; the `footer` slot (which already emits `reset`) owns the action region — killing the `GlassDock` species collision too |

### 4.2 The shape

```
<Configurator scrollMode="auto" asideSide="right" size="sm"
              :aside-width="['33.333%','33.333%']">   <!-- N-3: the binding preview-dominant arm -->
  <template #stage>
    <GooBlob … />        <!-- a real container-scaled preview, not the Picker's 63 px seat -->
  </template>

  <ConfiguratorLayer v-for="s in sections" :key="s.title" :label="s.title"
                     :default-open="s.title === essentials">        <!-- D-6, D-8, D-9 -->
    <ConfiguratorRow v-for="d in s.defs" :key="d.key"
                     :label="d.label" :sub="d.unit" :name="digits(d)"
                     can-reset @reset="resetOne(d.key)">            <!-- N-1, D-11 -->
      <Slider variant="standard" size="md" … />                     <!-- N-2, N-4, D-3, D-5 -->
    </ConfiguratorRow>
  </ConfiguratorLayer>

  <template #footer="{ reset }">                                    <!-- D-6, D-10 -->
    <Button @click="copy">Copy JSON</Button>   <!-- useClipboard({onCopyError}) — C-1 -->
    <Button @click="reset">Reset</Button>      <!-- useConfiguratorState scope — N-1 -->
  </template>
</Configurator>
```

What that deletes from this repository, exactly: the `<Card>` shell, `.console-well`,
`.config-console`, `.config-section-header`, `.config-section-title`, `.config-action-bar`, the
`GlassDock` wrapper, both `:deep()` rules, the `@media (pointer: coarse)` pseudo,
`--slider-track-bg`, `fmt()`, `resetDefaults()`, and the `pane-scroll-fade` class on this consumer —
**the entire 73-line `<style>` block plus 20 lines of template**. `ConfigSliderPane.vue` becomes what
its own header comment at `:6-10` already claims it is: a thin composition over the producer surface,
rather than a second configurator standing beside the first.

The header comment is worth quoting against itself, because it shows the boundary was seen and then
crossed deliberately:

> HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow + useConfiguratorState.
> This component uses ConfiguratorRow for each labeled row so the demo composes the existing glass-ui
> surface rather than rebuilding the row primitive. **The section-group wrapper and the floating
> copy/reset dock remain demo-local (they are thin structural shells, not the row primitive.)**

`ConfiguratorLayer` *is* the section-group wrapper. `Configurator`'s `footer` slot *is* the
copy/reset dock. Both existed. The exemption the comment grants itself is the source of D-6, D-8,
D-9, D-10 and half of N-1 — five findings and one blocker traceable to a single sentence claiming two
shells were not available.

---

## 5. Register mapping (delta over pass 1)

| Finding | Family | Owner |
|---|---|---|
| **N-1** | new mechanism — *unscoped reset over externally-owned state*; joins PR-08 (persistent operation truth) | W29 (Blob site) + producer `useConfiguratorState` |
| **N-2** | pass-1 D-1's family (*single-channel control extent*) extended to the ordinary scheme | producer `Slider`; site W28/W29 |
| **N-3** | PR-10 (`PROPORTION-AUDIT.md:54`) — supplies the missing measured ratio (50.000/50.000; 89.7 : 1) | W28 / W29 |
| **N-4** | PR-02 / law-8 family (*rendered relation over token intent*) — supplies the byte-identity | W28/W29, producer P019 |
| **C-3** | retraction — pass-1 D-18's RTL geometry half is canon-compliant; the action-order half stands and now feeds N-1 | W29 |

---

## 6. Finding index (this pass)

| ID | Severity | One line |
|---|---|---|
| N-1 | **BLOCKER** | `Reset` overwrites `color.paletteStops` — live picker-derived, documented "not a slider"; measured brown-triple clobber, no confirm, no undo |
| N-2 | **BLOCKER** | focus indicator in the ordinary light scheme: max delta **1.87 : 1**, median **1.01 : 1** (needs 3:1), caused by the pane's own track re-ink |
| N-3 | MAJOR | route measured **512/512 = 50.000/50.000** where the register binds 66.7/33.3; preview is the Picker's **63 × 63** seat; form : preview area = **89.7 : 1** |
| N-4 | MAJOR | track fill and live readout are **one byte-identical token** (`oklch(0.447121 0.00386159 34.63)`); decoration 5.99:1 vs datum 5.82:1 (light), 8.37 vs 8.30 (dark), 28 : 1 by area |
| C-1 | correction | `writeClipboard` returns `Promise<CopyResult>` and does **not** reject — the defect is a discarded discriminated result, not an unhandled rejection |
| C-2 | correction | 2 canvases on `/#/blob`; the blob seat is **63 px**, not ~90 px |
| C-3 | retraction | RTL is canon-compliant per §5.2 + §6.1 — not a defect; the leading-destructive-action half stands |
| §3 | confirmations | D-2, D-3, D-4, D-5, D-6, D-7, D-9, D-11, D-12, D-14, D-17 independently re-measured and agreeing |
| §4 | cure | the `Configurator` / `ConfiguratorLayer` / `FadingScroll` / `useConfiguratorState` / `useClipboard` / `AnimatedDigit` / `NumberField` transposition — 73 lines of `<style>` and 20 of template delete |
