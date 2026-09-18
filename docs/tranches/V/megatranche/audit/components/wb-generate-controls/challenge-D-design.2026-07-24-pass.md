# CHALLENGE-D — `demo/workbenches/generate/GenerateControls.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the tier
explicitly declared at spawn. Declaration matches observation; no inherited or undeclared seat.

## Seat, subject, and coordination boundary

| Field | Value |
|---|---|
| Axis | CHALLENGE-D — the design is flawed; find how |
| Subject | `demo/workbenches/generate/GenerateControls.vue` (311 lines) |
| Consumer | `demo/workbenches/generate/GeneratePane.vue` (40 lines) |
| Route | `/#/generate` |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| Pinned SHA-256 | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| Measured SHA-256 | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| Drift | **NONE.** The CARRY-LEDGER §D glass BJ W4 pin holds exactly. |

```
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

**No source edit is proposed or landed by this seat.** Every cure below is authored as
`BLOCKED-ON-GLASS-V8` with its exact release condition (§7).

Probe budget: 6 live `browser_evaluate` calls against `http://localhost:9000/#/generate` at
1440×900, 4 screenshot reads, and static reads of the producer `dist`. No writes outside this
directory.

---

## 1. Verdict

**DEFECTIVE.** The component is not merely under-polished; three of its advertised affordances do
not function at all, and its central compositional idea — "the specimen plate owns its chrome" —
was executed by duplicating the specimen three times and duplicating every verb twice.

The single most damning fact: **the entire generated palette, which is the sole output of this
workbench, is invisible to assistive technology, unreachable by keyboard, and — for the per-swatch
copy verb — unclickable by pointer.** The plate advertises five `Copy <css>` actions. Zero of them
exist in the DOM, and zero of them can receive a click.

The component's own source comments are the most reliable index of the defect: they argue at
length for constructs the tranche canon has since abrogated (`tag="button"` on `WatercolorDot`),
assert behaviour that measurement falsifies (wrap "at 390"), and describe a name-wire as "already
truthful" that is in fact discarded one file away.

---

## 2. Visual truth

Screenshots read: `safari-desktop-light/generate.png`, `safari-desktop-dark/generate.png`,
`safari-mobile-light/generate.png`, `safari-mobile-dark/generate.png`.

`REPORT.md` records `/generate` as clean on the coarse gates — 0 blank, 0 page errors, 0 console
errors, 0 horizontal overflow, `main`=1 — and 5 small tap targets in **all four** matrices
(REPORT.md:38, 53, 68, 83). The coarse gates are green; the design is not. Note also that
`/generate` has **no** forced-colors, RTL, reduced-motion, keyboard-focus or zoom-200 capture —
those five matrices cover only `adminusers, blob, browse, gradient, picker`. Every claim below in
those registers is either measured live by me or explicitly labelled a hypothesis.

### 2.1 The same five colours are drawn three times

Measured live, one frame, `oklch()` strings compared byte-for-byte:

```
stripSegColors : ["oklch(0.79658 0.151905 81.4961)","oklch(0.627249 0.113434 219.004)",
                  "oklch(0.645124 0.238662 356.512)","oklch(0.706343 0.162397 134.019)",
                  "oklch(0.648548 0.187244 271.527)"]
dotColors      : ["oklch(0.79658 0.151905 81.4961)","oklch(0.627249 0.113434 219.004)",
                  "oklch(0.645124 0.238662 356.512)","oklch(0.706343 0.162397 134.019)",
                  "oklch(0.648548 0.187244 271.527)"]
slider gradient: linear-gradient(to right, oklch(0.79658 0.151905 81.4961) 0%,
                  oklch(0.627249 0.113434 219.004) 25%, oklch(0.645124 0.238662 356.512) 50%, …)
```

Identical. The `PaletteColorStrip` (GenerateControls.vue:135), the `WatercolorDot` row (:199–208)
and the count-slider track gradient (:65–73, :293–296) are three renderings of one datum inside one
plate. Look at either desktop screenshot: a wide rectangle band of five colours, and directly
beneath it, five dots of the same five colours, and beneath that a rail of the same five colours.
Nothing is learned from the second or third telling.

`PROPORTION-AUDIT.md:5` — "they do not excuse a mechanically large gap, an undersized specimen, or
**decoration without information**." Two of the three depictions are decoration without information.

### 2.2 The named protagonist is the smallest thing on the plate

`VISUAL-CONSTITUTION.md:46` binds Generate's protagonist: "**generated WatercolorDot specimen**".
`OPTICAL-BENCH-COMPOSITIONS.md:41` sizes it: "P122 `golden`: WatercolorDot specimen 61.8033989%".

Measured at 1440:

| Element | Rect | Painted area |
|---|---|---|
| `PaletteColorStrip` (not the protagonist) | 461 × 48 | 22,128 px² |
| 5 × `WatercolorDot` (the protagonist) | 41 × 41 each | 8,405 px² |

The strip occupies **2.63×** the area of the specimen it duplicates. The constitutionally named
protagonist renders at 38% of its own redundant copy. `VISUAL-CONSTITUTION.md:34` — "One pane may
have one full-strength visual protagonist. Supporting fixtures do not compete with it through equal
size or equal shadow." The supporting fixture does not merely compete; it wins.

### 2.3 The chrome row wraps at desktop, and the source says it does not

GenerateControls.vue:138–142 states the design intent verbatim: "The row WRAPS gracefully:
name+count lead, the verb cluster rides `ml-auto` right — **at 390** the verbs settle onto their own
right-aligned line, never a clipped title."

Measured at 1440 × 900, `/#/generate`:

```
chromeRow: { rowRect: {y:369.7, h:96.5, w:460}, nameTop: 379.7, verbsTop: 416.2, wrapped: true }
```

The verb cluster is on its own second line **at the primary desktop viewport**, not at 390. The
comment's premise — that the pane is viewport-wide — is wrong: `/generate` is a two-pane desktop
scene (Generate | My Palettes), so the plate's content box is 460 CSS px, and the row wraps
everywhere. The stated single-line design has no rendered instance at any supported width.

The wrapped result is what the screenshots show and it is optically poor: the title sits hard-left
on line 1 with the badge floating far right, then line 2 is empty on the left and carries a
right-jammed verb cluster. The chrome row is 96.5 px tall to seat one title and three buttons, with
a large unowned void at bottom-left. Nothing is aligned to anything.

### 2.4 Mobile: the verb outweighs the specimen

In `safari-mobile-light/generate.png` the `Regenerate` button renders at roughly half the plate
width, set in the same display face and near the same optical weight as the plate title "Generated
Palette", stacked directly beneath it. The count badge renders as a large circular chip whose
numeral is the heaviest glyph in the plate. Reading order down the plate is: colour band → title →
big counter chip → enormous verb → the actual specimen dots → seed. The specimen is fifth.

`VISUAL-CONSTITUTION.md:46` narrow order is "specimen, model inspector, commit action". The commit
action is interleaved *into* the specimen instead of following it.

### 2.5 Dark mode moves away from the neutral pole

`VISUAL-CONSTITUTION.md:21` — "Dark chrome uses the restrained neutral pole. Seed tint is forbidden
outside the ambient field, active accent, WatercolorDot/specimen, and pastel Palettes lanes."

The plate is chrome (a specimen *well*, tier 4 in §2's table — "opaque/quiet neutral stage; the
specimen supplies color"). Measured `background-color`, converted to OKLCh:

| Scheme | computed | L | C | h |
|---|---|---|---|---|
| light | `oklab(0.913295 0.00550478 0.0130424)` | 0.9133 | **0.0142** | 67.1° |
| dark | `oklab(0.345295 0.0103877 0.0175526)` | 0.3453 | **0.0204** | 59.4° |

The dark well carries **44% more chroma** than the light well, at a warm ~60° hue. This is visible:
in `safari-desktop-dark/generate.png` and `safari-mobile-dark/generate.png` the plate reads as warm
brown/taupe, not as a neutral stage. The dark treatment is not the restrained pole; it is the
*less* restrained of the two. The specimen dots then sit on a tinted ground, which biases their
perceived hue — the one surface in the product where colour fidelity is the entire product.

---

## 3. State coverage

Enumerated exhaustively. `n/a` means the state cannot arise for this component.

| State | Handled? | Evidence |
|---|---|---|
| empty | **dead branch** | `palette` is `computed(() => generatePalette(count…))` with `count` min 1 (useColorGeneration.ts:26–28; slider `:min="1"` :301). `:66–67` `if (colors.length === 0) return "var(--muted)"` is unreachable. |
| loading | n/a | generation is synchronous and pure |
| populated | yes | the only designed state |
| error | **none** | `copyColor`/`copyColors` (:106–113) `await writeClipboard(...)` inside a non-awaited handler. A denied clipboard produces silence and an unhandled rejection. No error surface exists. |
| disabled | **none** | no control has a disabled register |
| focused | **broken** | 0 of 5 swatches focusable (`swatchRowFocusable: 0`); `focus-visible:outline-none` at :205 removes the ring and supplies no replacement |
| hovered | **load-bearing and lost** | the title's *only* affordance is `hover:underline decoration-dashed` (:148). Measured at rest: `border: 0px solid`, `text-decoration: none`, `background: rgba(0,0,0,0)`. On touch, hover never occurs. |
| active / pressed | **dead** | `active:scale-95` on `.generate-swatch` (:205) can never trigger — `pointer-events: none` (§4.1) |
| selected | n/a | no selection model |
| dragging | n/a | no reorder |
| overflowing | **partially** | 12 dots wrap to a second row and the plate grows silently; the chrome row wraps at every width (§2.3) |
| truncated | **unhandled** | the title `<input>` has `flex-1 basis-[10rem] min-w-0`; a long name scrolls inside a 398 px box with no ellipsis, no title attribute, and no visible boundary to signal the clip |
| RTL | **unproven** | `/generate` has no RTL capture. `ml-auto` (:156) is a physical-direction utility and will not mirror; `text-right` on the count label (:288) likewise. **Hypothesis** — no reproduction run. |
| reduced-motion | covered at foundation | `demo/styles/animations.css:184–193` neutralises transitions app-wide; not a component defect |
| forced-colors | **partial** | `foundation.css:689` grants `.generate-swatch` `forced-color-adjust: none`, good. But `foundation.css:702–717`'s WHCM outline restore lists `button, [role="button"], …, [tabindex]:not([tabindex="-1"])` — the swatch span matches none of them, so it has no WHCM focus affordance either. Moot only because it is not focusable at all. |
| zoomed 200% | **unproven** | no capture; the row already wraps at 100%, so 200% compounds it. Hypothesis. |
| post-save confirmation | **none** | measured `liveRegions: []` — zero `role=status`/`role=alert`/`aria-live` on the page after a save |

Two states are worth separating out because they are not gaps but active failures:

**The save-confirmation state on mobile does not exist at all.** On desktop, the Library pane sits
alongside and the new entry appears there. On mobile the Dock is a segmented `Generate | Palettes`
selector (visible in `safari-mobile-light/generate.png`) — the Library is a different destination.
Pressing Save on mobile produces no visual change anywhere on screen and no announcement.
`VISUAL-CONSTITUTION.md:101` — "Persistent operation state stays with the entity/workspace. A
transient flourish may celebrate success but never carries the only truth." Here there is neither
flourish nor truth.

**The AT state is total absence.** `PaletteColorStrip.vue:2–5` declares
`aria-hidden="true" role="presentation"` with the comment "color strip is a decorative visual,
hidden from AT". The `WatercolorDot` producer hard-codes `aria-hidden="true"` on its root
(§4.1). So both renderings of the specimen are hidden. Measured accessible names on the entire
plate:

```
accNamesOnPlate: ["INPUT:Palette name", "BUTTON:Save palette", "BUTTON:Copy all colors"]
plateSelfLabel : "Generated palette"
```

A screen-reader user entering the "Generated palette" region receives: a text field, the numeral
"5", three verbs, and `seed: 71f806ff`. **No colour information of any kind.** The workbench's
entire output is unreachable. `VISUAL-CONSTITUTION.md:83` — "Selected, failed, pending, withdrawn
and disabled states are never color-only." This is the product itself being colour-only.

---

## 4. Defects

### D-1 · BLOCKER — the per-swatch copy verb is inert: `tag` is not a prop in glass-ui 7.0.0

`GenerateControls.vue:199–208` renders each swatch as:

```vue
<WatercolorDot :color="css" tag="button" :seed="`gen-${css}-${i}`"
    class="generate-swatch … cursor-pointer active:scale-95 …"
    :aria-label="`Copy ${css}`" @click="copyColor(css)" />
```

The installed producer is `@mkbabb/glass-ui@7.0.0`. Its declared prop set is
`{ color, variant?, animate?, cycleDuration?, range?, seed? }` — **`tag` does not exist**
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`). Its render
function is:

```js
return (t, n) => (d(), o("span", {
    "aria-hidden": "true",
    class: l([c.value, "watercolor-swatch", …]),
    style: u([f.value, { backgroundColor: …, borderRadius: m(b),
        pointerEvents: "none", … }])
}, …
```

(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`)

Three independent kills, all measured live on `/#/generate`:

```
swatch: { tagName: "SPAN", ariaHidden: "true", ariaLabel: null, tagAttr: null,
          role: null, tabIndex: -1, pointerEvents: "none", cursor: "pointer",
          rect: { w: 40, h: 40 } }
hitTestAtDotCentre: { tag: "DIV", cls: "px-3 pb-1 flex flex-wrap gap-1.5",
                      isTheDot: false, containedByDot: false }
swatchRowFocusable: 0
```

1. **The click cannot land.** `pointer-events: none` is set *inline by the producer*, so no
   consumer class can override it (I confirmed no `.generate-swatch { pointer-events }` rule exists:
   `grep -rn "generate-swatch" demo/ src/` returns only `GenerateControls.vue:205`,
   `foundation.css:689`, `foundation.css:834`, none of which touch pointer-events).
   `elementFromPoint` at the dot's exact centre returns the **parent div**, not the dot. The
   `@click="copyColor(css)"` handler is unreachable by any real pointer. A synthetic
   `dispatchEvent` does fire (`syntheticDispatchFires: 1`) — which is precisely why a unit test
   could pass while the shipped affordance is dead.
2. **The accessible name is gone.** `aria-label` is absent from the DOM, and the root is
   hard-`aria-hidden="true"` regardless.
3. **Keyboard cannot reach it.** `tabIndex: -1`, 0 of 5 focusable, and `focus-visible:outline-none`
   at :205 pre-emptively deletes a ring that could never paint.

And `cursor: pointer` resolves on an element that takes no pointer events — so even the visual
promise is void.

This is not an accident of the upgrade; it is the canon executing. `VISUAL-CONSTITUTION.md:91` —
"V **abrogates a selection outline and interactive host on `WatercolorDot`**. P051 removes the
public `tag="button"`/interactive-host branch in the clean major; … W19–W22/W25–W27 execute Dock
seal/edit, ColorSpaceSelector, eyedropper, Spectrum, channel, palette, **Generate**, Mix and
Gradient sites." `OPTICAL-BENCH-COMPOSITIONS.md:108` repeats it. Generate is a *named* execute site
and the execution never happened; glass-ui 7.0.0 landed the removal first.

The in-file comment at :190–197 argues the abrogated position explicitly — "the button stays the
copy-verb seat (`tag="button"`), the dot its organic face … NO geometric focus ring on the organic
edge … rings ride the silhouette via the producer P5 register, **or do not exist**". The canon's
answer is that the ring rides a *named enclosing geometric seat*; "or do not exist" is not one of
the options. The comment is a standing argument for the defect.

`grep -rn 'tag="button"' demo/` finds 6 live call sites across 4 files; this is a fleet-wide
mechanism, not a local slip.

### D-2 · BLOCKER — the editable plate title is a false affordance; the typed name is discarded

`GenerateControls.vue:48–52, 102–104` emit `save: [colors, name]` carrying `paletteName.value`.
`GeneratePane.vue:14–20` receives it:

```ts
function onSave(colors: string[]) {
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
    pm.createPalette("Generated Palette", paletteColors);
}
```

The handler's signature has **one** parameter. The emitted `name` is dropped, and the literal
`"Generated Palette"` is hard-coded at the persistence boundary.

**Reproduction** (live, `/#/generate`): set the title input to `ZZ-CHALLENGE-D-NAME`, dispatch
`input`, click the `Save palette` button, wait 700 ms, read `localStorage`:

```
inputValueAfterType     : "ZZ-CHALLENGE-D-NAME"
libraryMentionsTypedName: false
libraryMentionsDefault  : true
storageKeys             : ["color-palettes"]
storedNames             : ["\"name\":\"Generated Palette\""]
liveRegions             : []
```

The typed name reaches neither the DOM nor storage. The user renames their palette, saves it, and
the rename silently evaporates — with no error, no status, and no live region.

The comment at :44–47 pre-empts exactly this audit: "the save carries the plate's own name — the
bench title is provenance FOR the save, never display-only chrome. (The pane's `createPalette`
name-wire is its owner's one-liner; recorded in the lane record — **this emit is already
truthful**.)" The emit is truthful. The consumer is not, and the comment records the gap as
someone else's one-liner rather than closing it. Nine months of provenance prose defend a wire that
was never connected.

Compounding: the title is also the *only* undiscoverable control on the plate (§3, hovered) —
`border: 0px solid`, `text-decoration: none`, transparent background at rest. So the affordance is
invisible, and when found, inert. `PROPORTION-AUDIT.md:51` PR-07 — "Hover-only/unlabeled controls
and invisible drag state — **ADD-AFFORDANCE / REMOVE**".

### D-3 · BLOCKER — the specimen is wholly absent from the accessibility tree

Both renderings of the palette are `aria-hidden`: the strip by consumer declaration
(`PaletteColorStrip.vue:2–5`), the dots by producer hard-coding (D-1). Measured: 3 accessible names
on the entire plate, none of them a colour. See §3 for the full transcript.

The cure is not "add labels to the dots" — the producer forbids it and the canon forbids the
interactive host. `OPTICAL-BENCH-COMPOSITIONS.md:108` states the shape of the answer:
"**data-bearing static faces remain present as noninteractive named list/text content** with zero
activation/focus/drag semantics." The generated palette is data-bearing. It requires a named
list/text rendering of the colour values that is *not* the decorative face.

### D-4 · MAJOR — triple depiction of one datum; protagonist inverted

§2.1 and §2.2. Strip 22,128 px² vs specimen 8,405 px² (2.63×), identical `oklch()` bytes across
three surfaces. `PROPORTION-AUDIT.md:48` PR-04 — "Empty/equal companion Cards and nested housing —
**REMOVE**"; `PROPORTION-AUDIT.md:5` — decoration without information.

The strip is additionally borrowed sideways: `import { PaletteColorStrip } from
"../../palettes/browser/card"` (:16) reaches from `workbenches/generate` into another feature's
*card internals*. The file's own composable proudly documents the correct law — "the pure
generation core relocated DOWN to the shared color layer; the feature consumes it UP-from-shared
(feature → shared, correct)" (:23–24) — and then violates it eight lines earlier for the strip.
`VISUAL-CONSTITUTION.md:194` names the failure mode precisely: "The generated palette is a draft
specimen, **not a flat strip plus unrelated buttons**." It is currently a flat strip plus buttons,
built from the catalog card's flat strip.

### D-5 · MAJOR — the count slider's axis encodes two incompatible quantities

`:65–73` paints the track by **palette index**: colour `i` at `i/(n-1) × 100%`.
`:297–307` drives the thumb by **count**: value ∈ [1, 12].

Measured at count = 5:

```
gradient : oklch(…) 0%, oklch(…) 25%, oklch(…) 50%, oklch(…) 75%, oklch(…) 100%
thumb    : thumbCentreFrac 0.367     (aria-valuenow 5, min 1, max 12 → (5−1)/11 = 0.364)
```

The five colours span the **entire** track while the thumb sits at 36.7% of it. The same horizontal
axis simultaneously means "which colour" (0→100% = index 0→4) and "how many colours" (0→100% =
count 1→12). The 63% of track to the right of the thumb is painted with colours that *already
exist*, which reads as "drag right to reach these" — it is a chart whose x-axis carries two
different units, and the resulting affordance is affirmatively misleading.

The comment at :62–64 claims "the count slider carries the generated ramp itself — the extract
k-slider pattern (**the instrument shows its own state**)". It shows a second, contradictory state.
Whatever is true of the extract k-slider — where track position plausibly *is* cluster index —
does not transfer to a cardinality axis. This is a pattern transplanted without its precondition.

### D-6 · MAJOR — every verb is rendered twice; PR-06 head-on

`usePaneRouter.ts:191–201` gives `/generate` a Dock "Tools" action bar carrying all three verbs
with the identical icons the plate uses:

```ts
{ key: "regenerate", icon: RefreshCw, title: "Regenerate", … }
{ key: "save",       icon: Save,      title: "Save palette", … }
{ key: "copy",       icon: Copy,      title: "Copy colors", … }
```

`GenerateControls.vue:157–184` renders `RefreshCw` / `Save` / `Copy` again inside the plate. The
Dock set is visible in every screenshot as `Tools →`. Three verbs, six seats.

`VISUAL-CONSTITUTION.md:194` — "Regenerate, Save/Publish and Copy live in **one** Dock control
set." `OPTICAL-BENCH-COMPOSITIONS.md:41` — "commit actions remain **one** action region … and **one
Dock action species**." `PROPORTION-AUDIT.md:50` PR-06 — "Three adjacent action species or
duplicated selected fills — **REMOVE** — One action/selection owner **across Generate** and
owner/Admin/Mix tabs."

The plate cluster is itself three species in 29 px of gap: one `primary-audacious` labelled pill and
two unlabelled `ghost` icon circles (:157–184). The comment at :120–128 celebrates that "the orphan
toolbar row is DEAD" — but the row it deleted was the local one *while the Dock set survived*. The
duplication was not resolved; it was inverted, and a fourth interactive species (the invisible title
input) was added to the same row.

### D-7 · MAJOR — every interactive seat in the pane is under the 44 px floor

Measured live at 1440, all interactive descendants of the Generate pane:

| Seat | Rect | Under 44 |
|---|---|---|
| `INPUT` "Palette name" | 398 × 38 | yes |
| `BUTTON` "Regenerate" | 146 × 43 | yes (by 1 px) |
| `BUTTON` "Save palette" | 37 × 37 | yes |
| `BUTTON` "Copy all colors" | 37 × 37 | yes |
| `BUTTON` "Generation preset" | 226 × 40 | yes |
| `BUTTON` "Color harmony" | 226 × 40 | yes |
| `[role=slider]` "Color count" | **12 × 24** | yes |

`seatsUnder44: 7` of 7. This corresponds to the `smallTapTargets: 5` recorded for `/generate` in
all four matrices (REPORT.md:38, 53, 68, 83) — the audit's count excludes the two seats it did not
sample, but the direction is the same and my measurement is the stricter one.

The 12 × 24 slider thumb is the egregious case: it is the primary drag target of the count
instrument, one third of the minimum width. `PROPORTION-AUDIT.md:56` PR-12 states the correct law —
"Visual glyph size, operable target size and layout reservation are separate quantities.
Accessibility floors do not require bloated visible chrome … **invisible/seat geometry preserves
target floor while optics follow rung**." The design has no invisible seat at all; the glyph *is*
the target. Regenerate missing the floor by a single pixel (43) is the tell that no floor was ever
consulted.

### D-8 · MAJOR — nested cartoon casters and a triple boundary

Measured:

```
plate  : border "1px solid oklab(0.216128 0.00350075 0.00518669 / 0.12)"
         bg     oklab(0.913295 0.00550478 0.0130424)
         shadow "oklab(0.28 … / 0.32) -2px 2px 0px 0px, …"      ← shadow-cartoon-sm
outer  : bg     oklab(0.928268 0.00554796 0.0132111 / 0.664)
         shadow "color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px"   ← cartoon
         border 1px
```

`OPTICAL-BENCH-COMPOSITIONS.md:75` is binding and unambiguous for this route:

| Generate | `[]` | `none` | none | stage, inspector and Dock action species remain distinct without a rule |

Boundaries `[]`. Reserve `none`. The component ships border + fill + cartoon shadow on the plate,
nested inside a bordered, cartoon-shadowed Card. `PROPORTION-AUDIT.md:69` §5.4 — "Spacing plus
material already expressing the same boundary makes the line duplicative." Three expressions of one
edge, twice over. `VISUAL-CONSTITUTION.md:186` — "not cartoon casters stacked within casters" —
literally two nested cartoon casters, visible as the hard offset drop shadows in every screenshot.

### D-9 · MAJOR — the count instrument has no label arm

`VISUAL-CONSTITUTION.md:104` binds one composition: "The domain-neutral axis composition sits over
BI `Slider`: **label**, unit, reserved live value, optional numeric entry, focus/target behavior,
and a color-bearing or neutral track chosen by semantics. Picker, **Generate count**, Extract,
Gradient, Atmosphere and Blob adopt that one composition."

Measured:

```
sliderRowText : "5"
selectLabels  : ["Preset", "Harmony"]
```

The count row's entire visible text is the bare numeral. Preset and Harmony carry `section-label`
captions; the third model input carries none. The rendered result (visible in all four screenshots)
is two labelled dropdowns above one unlabelled coloured rail — the eye reads it as an output meter,
not a control. `aria-label="Color count"` (:298) supplies the AT name and nothing visual.

Compounding, the count is depicted three times over: `DIV.badge-atom` inside the plate (:150–152),
`LABEL.text-mono-small.font-bold` beside the slider (:287–291), and `aria-valuenow="5"`. Measured
`countDepictions: ["DIV|badge-atom.inline-flex|5", "LABEL|text-mono-small.font-bold|5"]`. The badge
inside the specimen plate is the odd one out — it is a model *input* value rendered as specimen
metadata, on a plate whose stated job (:120–128) is to own only its own chrome.

### D-10 · MAJOR — no `InstrumentChassis`; the route is housed in a default Card

`VISUAL-CONSTITUTION.md:46` binds Generate's outer housing to `InstrumentChassis` with
`golden` 61.8033989% / 38.1966011% regions (`OPTICAL-BENCH-COMPOSITIONS.md:41`), and
`VISUAL-CONSTITUTION.md:38` warns "`Card` remains semantic housing for a bounded object or specimen
and **is never the default page primitive**."

`GeneratePane.vue:31` wraps the whole route body in `<Card tier="resting" class="pane-scroll-fade
…">` with a plain `flex flex-col gap-4` inside, and `GenerateControls.vue:119` is another
`flex flex-col gap-4`. There is no chassis, no stage/inspector/action region decomposition, and no
golden ratio — the three regions the constitution names are expressed as three siblings in one
vertical stack with a uniform `gap-4` between them, so the specimen, the model inspector and the
commit action are given *identical* structural weight. That uniform gap is why nothing on the plate
reads as hierarchy: everything is one rhythm.

`OPTICAL-BENCH-COMPOSITIONS.md:41` also requires "Landmark-neutral chassis; **no nested flat
Card/local grid**". `:219` is a `grid grid-cols-2 gap-3` local grid.

### D-11 · MINOR — the one verb has no motion at all

Measured transition state on every specimen surface:

```
plate         : { prop: "all", dur: "0s" }
strip         : { prop: "all", dur: "0s" }
stripSegment  : { prop: "all", dur: "0s" }
gradientLayer : { prop: "all", dur: "0s" }
dot           : { prop: "transform, border-radius, filter, box-shadow", dur: "0.2s, 0.6s, 0.2s, 0.2s" }
anyKeyframeAnimationInPlate: []
```

`Regenerate` replaces all five colours, both depictions, the gradient and the seed hex — and every
one of those surfaces has `transition-duration: 0s`. The palette hard-cuts. Likewise, dragging count
5 → 12 pops seven dots into existence with no entry. The dot's own 0.2 s transitions are the
producer's morph/wobble register and never fire here (`active:scale-95` is dead per D-1; `animate`
defaults false).

`VISUAL-CONSTITUTION.md:139–140` — "Spatial continuity uses one producer-owned glass-ui spring
register. Color/opacity effects use the corresponding short effect curve; exit is shorter than
entry." The workbench's single most important state change has no register at all. This is an
absence, not a deletion, so owner edict 6 is not violated — but the `--animation-slide-sm/md/lg`
tokens are unused here and the constitutional curve is unclaimed.

The `transition-property: all` on the plate/strip/gradient is the Tailwind preflight default at 0 s;
it is inert today, but it is a latent layout-animating declaration on a container whose height
changes with count. Flagged as latent, not as a live defect.

### D-12 · MINOR — dead masking fallback

`:66–67`:

```ts
const colors = palette.value;
if (colors.length === 0) return "var(--muted)";
```

`palette` is `computed(() => generatePalette(count.value, …))` (useColorGeneration.ts:26–28) and
`count` is bounded `[1, 12]` by the slider (`:301–302`). The zero-length branch is unreachable.
Owner edict 2 forbids masking fallbacks; this is one, and it also encodes a phantom "empty" state
the design never has, which is why §3's empty row reads `dead branch` rather than `unhandled`.

### D-13 · MINOR — non-idiomatic template ref in the consumer

`GeneratePane.vue:12` — `const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null)`
with `ref="controlsRef"` at `:36`. Owner edict 7 and the project's Vue 3.5 idiom call for
`useTemplateRef`. `GenerateControls.vue` itself is clean on edict 8: all four type-only imports
(`PaletteColor`, `PresetName`/`HarmonyName`, `AcceptableValue`) use `import type`.

Also `:23–26` — `defineExpose({ regenerate, save, copyColors })` re-exposed through the pane with
`?.()` optional-call guards on all three. The guards are defensive scaffolding against a shape the
type system already guarantees; `usePaneRouter.ts:196–198` calls them with the same `?.` again.
Double-optional plumbing for a non-optional API.

### D-14 · INFO — clipboard rejection is unhandled and silent

`:106–113` — `async function copyColors()` / `copyColor(css)` are bound directly as click handlers
(`:181`, `:207`). Their promises are never awaited, so a `writeClipboard` rejection (permission
denied, non-secure context, Safari user-activation loss) becomes an unhandled rejection with zero
user-visible consequence. Combined with `liveRegions: []`, the *success* path is equally silent:
there is no way for a user to distinguish "copied" from "failed" from "did nothing". Reproduction
not run — clipboard denial requires a permissions override; labelled reasoned-from-source.

---

## 5. Mechanism families

The 14 defects reduce to five mechanisms. Curing the mechanism cures the family; patching the
defects individually will not.

| Family | Mechanism | Members |
|---|---|---|
| **F1 — producer contract drift** | glass-ui 7.0.0 landed the P051 abrogation; the consumer still writes the 6.x interactive-host idiom, and Vue silently discards the unknown prop | D-1, D-3 |
| **F2 — the emit that ends nowhere** | a value is produced, typed, emitted and named at every layer except the one that persists it | D-2 |
| **F3 — depiction inflation** | when a datum is uncertain of its own presentation, it is drawn again rather than drawn better; likewise every verb | D-4, D-5, D-6, D-9 (count triplication) |
| **F4 — housing by accretion** | no chassis was ever chosen, so boundaries, shadows, gaps and labels were each decided locally and none agree | D-8, D-9, D-10, D-7 |
| **F5 — states nobody drew** | the populated happy path is the only designed state; empty is dead code, error is absent, confirmation is absent, motion is absent | D-11, D-12, D-14, and §3 wholesale |

The strongest single defect is **D-1**: it is the only one that renders an advertised, aria-labelled,
cursor-affordanced user action completely inoperable by pointer, keyboard and AT simultaneously, and
it is a *silent* failure — no type error, no console warning, no failing test, because Vue drops an
undeclared prop without complaint and `dispatchEvent` bypasses the hit-test that kills the real
click.

---

## 6. The gestalt cure

Not a patch list. The transposition the canon already specifies:

1. **Adopt `InstrumentChassis` `golden` for the route** (D-10). Three named regions — specimen
   stage, model inspector, commit action — replace the three equal siblings in the `gap-4` stack.
   The chassis owns boundaries `[]` and reserve `none` per `OPTICAL-BENCH-COMPOSITIONS.md:75`,
   which deletes the plate's border, the plate's cartoon shadow and the outer Card in one move
   (D-8). `GeneratePane.vue`'s `Card` disappears; it was never semantic housing for a bounded
   object, only a page primitive.
2. **One depiction of the palette: the WatercolorDot specimen** (D-4). Delete the borrowed
   `PaletteColorStrip` — which also severs the sideways import into `palettes/browser/card`. The
   dots become the 61.8% stage they are constitutionally named as, at a size the stage justifies.
3. **The dots become faces inside named geometric seats** (D-1, D-3, D-7). This is the canon's own
   prescription: "Operable sites use named geometric seats … data-bearing static faces remain
   present as noninteractive named list/text content" (`OPTICAL-BENCH-COMPOSITIONS.md:108`). The
   seat is a native `<button type="button">` at ≥ 44 px carrying the accessible name and the focus
   ring; the face is the untouched organic dot. This is the *only* construction that restores the
   copy verb, the accessible name, the keyboard path and the tap floor at once — and it is
   structurally identical to the Gradient stop treatment already specified at
   `VISUAL-CONSTITUTION.md:206`.
4. **One action owner** (D-6). The Dock "Tools" set already carries all three verbs and is the
   constitutionally named home. Delete the plate's verb cluster entirely; the chrome row collapses
   to title + count and stops wrapping (D-2's row, §2.3) without any responsive work.
5. **Wire the name, or delete the field** (D-2). `onSave(colors, name)` is a one-line signature fix
   — but the honest reading is that a rename affordance with no visible boundary, no label and no
   confirmation belongs in the Library inspector, where `VISUAL-CONSTITUTION.md:102` already places
   it: "rename/lifecycle/export actions and durable operation state live in the selected inspector."
   Deleting the field is the KISS cure and costs the user nothing.
6. **Give the count slider one axis and a label** (D-5, D-9). The track is a count axis; paint it
   neutral or paint it with the *k*-ramp only if the ramp's x-position is redefined to mean count.
   Adopt the §5 axis composition whole — label, value, unit — as Preset and Harmony already do.
7. **Draw the missing states** (F5): the save confirmation (durable, in the entity, per
   `VISUAL-CONSTITUTION.md:101`), the clipboard result, the regenerate transition on the one
   producer-owned curve, and delete the dead empty branch.

Net effect on the file: it should get substantially *shorter*. The strip, the verb cluster, the
badge, the dead fallback and roughly 60 lines of provenance comment all leave; a seat wrapper and a
slider label arrive.

---

## 7. Wave — `BLOCKED-ON-GLASS-V8`

Per the CARRY-LEDGER §D glass BJ W4 hold on this file (pin verified in §0), **no consumer edit is
proposed and none may land.** The wave is authored blocked.

```
WAVE      wb-generate-controls · design remediation
STATUS    BLOCKED-ON-GLASS-V8
SUBJECT   demo/workbenches/generate/GenerateControls.vue @ 4f95c57c…24f6 (verified, no drift)
          demo/workbenches/generate/GeneratePane.vue     (same hold, same route)
CARRIES   D-1 … D-14 (§4), families F1 … F5 (§5), cure §6
```

**Release condition — all four must hold before a single line of this component is edited:**

- **RC-1 · source-to-served identity.** Glass 8 proves that the `WatercolorDot` served to the
  consumer is byte-identical to the `WatercolorDot` in producer source, for the exact version this
  repo resolves. This is the standing BJ W4 condition and is prerequisite to everything below,
  because D-1's entire mechanism is a served-artifact contract (`pointer-events: none` and
  `aria-hidden="true"` are inline in the *dist* render function) that no source read of the consumer
  can reveal.
- **RC-2 · the seat contract is published.** Glass 8 ships, and documents, the named geometric seat
  that `OPTICAL-BENCH-COMPOSITIONS.md:108` presupposes — either as a producer primitive or as a
  written consumer recipe with the focus/`aria-pressed`/target-floor semantics fixed. Until the seat
  exists, D-1/D-3/D-7 have no landing site, and any consumer-side wrapper invented here would be
  precisely the contrived local component owner edict 3 forbids.
- **RC-3 · the abrogation is enforced, not merely documented.** The `tag` prop's absence must fail
  loudly — a build/typecheck error on the 6 live `tag="button"` call sites, not silent prop-drop.
  D-1 shipped because Vue discards unknown props in silence; re-landing the same class of edit
  under the same silence would repeat it. `vue-tsc` on the demo project must reject
  `<WatercolorDot tag="button">`.
- **RC-4 · P122 `InstrumentChassis` is consumable for Generate** with the `golden` split, the
  `[]` boundary set and `reserve="none"` that `OPTICAL-BENCH-COMPOSITIONS.md:75` binds. D-8 and
  D-10 cannot be cured by consumer CSS; `VISUAL-CONSTITUTION.md:92` forbids the consumer hiding a
  producer divider, and the outer Card removal is a chassis decision.

**Explicitly out of scope until release:** D-2's one-line `onSave` signature fix. It is tempting
because it is trivial and it is the second-worst user-visible defect — but `GeneratePane.vue` is
inside the same hold, and landing an isolated fix would (a) breach the hold, (b) ship a working
rename into a field that D-6's cure deletes, and (c) burn the wave's single coordinated edit. It
carries as a blocked row, at BLOCKER severity, with the reproduction preserved in §4 so it cannot be
lost.

**Relay obligation:** D-1 is a producer-boundary finding — glass-ui 7.0.0's `WatercolorDot` renders
`pointer-events: none` + `aria-hidden="true"` on a root that 6 live consumer call sites still address
as an interactive host. Per the standing glass-ui BH/BI relay edict, this belongs in the active
glass-ui inbox as a consumer-fleet impact report accompanying the Glass 8 cut, independent of this
tranche's execution order.

---

## 8. Negative results (things checked that are sound)

Recorded so the next seat need not re-probe:

- `verbatimModuleSyntax` (edict 8): clean. All four type-only imports use `import type` (:21, :32,
  :33).
- `prefers-reduced-motion`: covered at foundation scope (`demo/styles/animations.css:184–193`,
  `*` selector). Not a component defect.
- Forced-colors colour preservation: `.generate-swatch` is granted `forced-color-adjust: none`
  (`foundation.css:689`) and print fidelity (`:834`). Correct, and correctly placed in the
  foundation rather than per-instance.
- Route-level coarse gates: `/generate` shows 0 blank, 0 page errors, 0 console errors, 0 horizontal
  overflow, `main` = 1, `darkClassMissing` = 0 in all four matrices (REPORT.md:124, 139, 154, 169).
- No god module: 311 lines, one job. Edict 1 satisfied.
- The seed provenance is genuinely stable and pure — `generatePalette` is mulberry32-seeded, so the
  `presetStops`/`harmonyStops` dropdown previews (:94–100) are seed-exact as the comment claims.
  That claim, unlike the others, verifies: the strips and the resulting selection are the same
  bytes. It is the one piece of the design that does what its comment says.
