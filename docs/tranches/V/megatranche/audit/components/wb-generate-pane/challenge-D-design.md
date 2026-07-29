# CHALLENGE-D · `demo/workbenches/generate/GeneratePane.vue` — the design is wrong

**Seat:** CHALLENGE-D (design). **Premise accepted:** the design is defective; this report hunts the defect.
**Subject:** `demo/workbenches/generate/GeneratePane.vue` (41 L) + its sole child `demo/workbenches/generate/GenerateControls.vue` (311 L) — the pane is a 41-line shell whose entire rendered body is the child, so the child's composition **is** the pane's design and is audited as one unit.
**Base:** branch `tranche-u`, HEAD `c654824e`. **Live probe:** `http://localhost:9000/#/generate`, real WebKit (Playwright `webkit`), read-only.

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat was explicitly spawned with. Seat declaration matches served model; no inherited/undeclared seat.

---

## 0. Verdict

**DEFECTIVE.** Eighteen defects, three of them BLOCKER. The gestalt failure is singular and everything else is downstream of it:

> **The composition this route was decided to have was never built.** `OPTICAL-BENCH-COMPOSITIONS.md §3` rules Generate as a P122 `InstrumentChassis` at exact `golden` (specimen 61.8033989% / model inspector 38.1966011%), housing decision *"Landmark-neutral chassis; no nested flat Card/local grid"*, Card count **0**. What ships is a **`<Card tier="resting">` page-column** containing a hand-rolled `<section>` that re-implements Card chrome, a **`grid grid-cols-2`** local grid, and a hand-rolled slider track. `grep -rn "InstrumentChassis" demo/` returns **zero consumers** although `@mkbabb/glass-ui@7.0.0` ships the component (`node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/InstrumentChassis.vue.d.ts`). Measured protagonist share on the live route: **36.36%**, against a legal floor of 61.8%.

The premise is correct. This is not a pane that needs tuning; it is a pane built out of the wrong primitive, whose surface defects (duplicated verbs, duplicated data, a phantom copy affordance, a discarded name, a sub-2:1 slider thumb) are the symptoms of that one substitution.

---

## 1. Evidence base

| Kind | Source |
|---|---|
| Source | `demo/workbenches/generate/GeneratePane.vue`, `demo/workbenches/generate/GenerateControls.vue`, `demo/shell/usePaneRouter.ts:186–200`, `demo/palettes/usePaletteStore.ts:66`, `demo/palettes/browser/card/PaletteColorStrip.vue`, `demo/styles/foundation.css:679–700` |
| Canon | `docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md §2,§3,§5`; `docs/tranches/V/VISUAL-CONSTITUTION.md §2,§3,§3.1,§4,§4.1,§4.2,§5`; `docs/tranches/V/PROPORTION-AUDIT.md §4 (PR-04/05/06/07/08/12/13), §5 (card laws 1,2,5,9,13)` |
| Captures (audit) | `docs/tranches/V/megatranche/audit/visual/shots/safari-{desktop,mobile}-{light,dark}/generate.png` — all four read |
| Captures (this seat) | `…/scratchpad/gen-390-max.png`, `gen-zoom200.png`, `gen-pastel.png`, `gen-rtl.png`, `gen-forced-colors.png` |
| Live measurement | 3 WebKit probe scripts; raw output pasted inline below |

The megatranche visual `REPORT.md` rows for this route are clean on the coarse checks — `/#/generate` shows `overflowX 0`, `pageErr 0`, `consoleErr 0`, `main 1` in all four matrices (REPORT.md:124,139,154,169) — and flags `smallTapTargets: 5` per matrix (REPORT.md:38,53,68,83). **The coarse report is the reason this seat exists: none of the eighteen defects below are visible to it.** A route can pass every automated column and still be designed wrong.

---

## 2. BLOCKER findings

### D-1 · The decided composition was never built; the pane is a Card column at 36.36%

**Canon.** `OPTICAL-BENCH-COMPOSITIONS.md §3`, Generate row:
> P122 `golden`: WatercolorDot specimen 61.8033989%; model inspector 38.1966011%; commit actions remain one action region. … Housing / Card decision: **Landmark-neutral chassis; no nested flat Card/local grid.**

`§5`: *"The Card inventory is terminal: Browse and Library use exactly one Card shell per rendered palette entity; … **the other sixteen compositions have Card count `0`**."*
`§2`: *"A `Card` houses a bounded entity or specimen, **never a page column**, empty half, stage wrapper, or padding group."*
`VISUAL-CONSTITUTION.md §3.1` card law: *"`Card` remains semantic housing for a bounded object or specimen and is never the default page primitive."*

**Shipped.** `GeneratePane.vue:31` — `<Card tier="resting" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">`. Plus `GenerateControls.vue:219` — `<div class="grid grid-cols-2 gap-3">`, the "no local grid" clause.

**Measured** (WebKit, 1440×900, `/#/generate`):

```json
{ "mainW": 1408,
  "cardWidths": [512, 512],
  "cardShare": [36.36, 36.36],
  "companionText": "My PalettesSave, organize, and share your colors.Start a new palette· empty plat",
  "genCardH": 514.8, "genCardContentH": 449.7 }
```

Three independent proportion-law breaches in one number set:

1. **Protagonist 36.36%** vs `VISUAL-CONSTITUTION.md §3.1`: *"the display-rounded protagonist law is 61.8–66.7%."* The Generate stage is at **59% of its legal floor**.
2. **The companion is empty and takes an equal 36.36%.** §3.2: *"Empty secondary content occupies at most a narrow invitation tray (≤15% of the stage) or disappears. **It never receives half the viewport.**"* The measured companion text is literally `"No saved palettes yet"` (see `shots/safari-desktop-light/generate.png`). PR-04 names this exact mechanism: *"Empty/equal companion Cards and nested housing → **REMOVE**."*
3. **`Card` count = 2** on a route whose binding inventory is `0`.

And `genCardH 514.8` vs `genCardContentH 449.7` → **65 px of dead card interior**, present only because `h-full` chains the Generate card's height to the empty companion beside it. The pane's own content does not decide its own height.

**Mechanism.** `Card` was used as the page-column primitive because it was the primitive to hand. Every sibling repeats it — `GradientPane.vue:20`, `MixPane.vue:62`, `ExtractPane.vue:5`, `GeneratePane.vue:31` all carry the identical string `Card tier="resting" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full"`. This is a copied chassis recipe, which `§3.1` forbids by name: *"value.js composes regions with domain content; **it does not clone a local chassis recipe**."*

**Cure (gestalt, not patch).** Transpose the route onto `InstrumentChassis` with `variant="golden"`, `boundaries={[]}`, `reserve="none"` per `§5`'s binding row. Stage = the generated specimen; dial = preset/harmony/count; action region = the one commit set. Delete the `Card`, delete the `grid grid-cols-2`, delete the `h-full` height coupling, and let the absent companion vanish rather than occupy 36%. Patching the percentages inside a `Card` cannot satisfy the row — `§3.1` requires the chassis, and the chassis owns the six `S122` padding/gap properties the consumer is forbidden to declare (PR-33).

---

### D-2 · The editable palette name is silently discarded on save

**The affordance.** `GenerateControls.vue:144–149` renders an in-place editable plate title bound to `paletteName`. `:52` seeds it `"Generated Palette"`. `:48–50` declares the contract:

```ts
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
```

`:103` honours it: `emit("save", [...palette.value], paletteName.value);`
The source comment at `:44–47` states the intent explicitly — *"the save carries the plate's own name — the bench title is provenance FOR the save, never display-only chrome. (The pane's `createPalette` name-wire is its owner's one-liner…)"*.

**The consumer drops it.** `GeneratePane.vue:14–20`:

```ts
function onSave(colors: string[]) {            // ← second emitted arg never accepted
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
    pm.createPalette("Generated Palette", paletteColors);   // ← name hard-coded
}
```

TypeScript accepts a handler with fewer parameters, so the contract breach is silent at compile time. The "owner's one-liner" was never written.

**Reproduction (live, WebKit 1440×900):** type a name, press the plate's Save, read the store.

```
input value at save time: ZZZ-PROBE-NAME
[["color-palettes",
  "{\"version\":1,\"palettes\":[{\"id\":\"65aa4d42-…\",\"name\":\"Generated Palette\",
    \"slug\":\"generated-palette-263727f3\",\"colors\":[…]"]]
```

The typed name is gone; the persisted `name` **and** the derived `slug` are both `generated-palette`. Because `usePaletteStore.ts:66–81` dedups on `p.name.toLowerCase() === name.toLowerCase() && colorsMatch(...)`, every palette this pane ever writes is named identically — the library fills with indistinguishable `Generated Palette` rows and the user's only naming lever is inert.

**Design reading.** This is not merely a bug: it is an affordance that lies. `PROPORTION-AUDIT.md §5` card law 6 — *"Add affordance when the surviving action/state is otherwise undiscoverable"* — presumes affordances do what they show. A dashed-underline editable title that discards its value is worse than no title at all, because it consumes a user's attention and returns nothing.

**Cure.** Accept the emitted name: `function onSave(colors: string[], name: string)` → `pm.createPalette(name, paletteColors)`. Under D-1's transposition the naming job should not live on the specimen plate at all — `VISUAL-CONSTITUTION.md §5` rules that *"rename/lifecycle/export actions and durable operation state live in the selected inspector"*; commit-then-name belongs to the Library inspector, and Generate's commit region should hand off, not fork a second naming path.

---

### D-3 · The specimen is invisible to assistive technology and unreachable by keyboard; the per-swatch Copy verb is a mouse-only phantom

**Shipped.** `GenerateControls.vue:199–208` renders each generated color as `<WatercolorDot tag="button" :aria-label="\`Copy ${css}\`" @click="copyColor(css)">`, with a 5-line comment asserting *"the button stays the copy-verb seat (`tag="button"`)"*.

**What actually renders** (live DOM, 1440×900):

```json
{ "dotTag": "SPAN", "dotRole": null, "dotTabIndex": null, "dotAriaLabel": null,
  "dotIsFocusable": false,
  "dotOuter": "<span data-v-292b9032=\"\" aria-hidden=\"true\" class=\"generate-swatch w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer active:scale-95 transition-transform focus-visible:outline-none watercolor-swatch\" data-testid=\"watercolor-swatch\" data-variant=\"solid\" style=\"background-color: oklch(0.679065 0.138778 …" }
```

Three facts, each independently disqualifying:

1. **`tag="button"` is a dead prop.** glass-ui 7.0.0 already executed `VISUAL-CONSTITUTION.md §4.2`'s abrogation — *"V **abrogates a selection outline and interactive host on `WatercolorDot`**. P051 removes the public `tag="button"`/interactive-host branch in the clean major"* — and now renders `<span>` unconditionally. The consumer still passes the prop. Edict 2 (no legacy/dual paths) and edict 4 (glass-ui is the design system) are both live here: the consumer is coding against a retired API.
2. **The producer forces `aria-hidden="true"`, so `:aria-label="Copy …"` is dropped** (`dotAriaLabel: null`). Five to twelve labelled copy verbs announce nothing.
3. **`@click` still binds and `cursor-pointer` still paints.** The result is an operable ornament: a pointer-only action on an AT-hidden, non-focusable span. `PROPORTION-AUDIT.md §5` card law 5 is categorical — *"A small icon/mark is either data, status, labeled action, drag affordance, focus/selection register or removed. **Decorative controls and operable ornaments without names are forbidden.**"* Card law 9: *"A renderer specimen is not an unlabeled button."*

**Keyboard reachability, measured:**

```
plate tabbable order: ["Palette name","BUTTON","Save palette","Copy all colors"]
```

Four stops. Zero swatches.

**And the strip is decorative too.** `PaletteColorStrip.vue:2–4` — `aria-hidden="true" role="presentation"`. So *both* renderings of the palette are hidden. **The complete chromatic output of the Generate pane is unavailable to assistive technology**; the route's entire accessible text (REPORT.md:124, `text: 310`) contains the seed hex and no color value whatsoever. A color tool whose colors cannot be read is a design failure, not an a11y footnote.

**Cure.** Per `§4.2`: the organic face is presentation; *"Selection, activation, drag and keyboard focus belong to a **named enclosing geometric button/seat**"*. Give each specimen a real `<button type="button">` seat wrapping the (aria-hidden) dot, with the color value as its accessible name; and make the specimen list itself readable — a named list whose items announce their CSS color — so the pane's output exists in text. Removing `tag="button"` alone would leave a silent specimen; the seat must be added in the same move.

---

## 3. MAJOR findings

### D-4 · Three verbs, six seats — the plate duplicates the Dock action bar, with two names for one verb

`usePaneRouter.ts:194–199` already gives the route a Dock action bar with exactly `Regenerate` / `Save palette` / `Copy colors`, wired to `GeneratePane`'s `defineExpose` (`GeneratePane.vue:22–26`). `GenerateControls.vue:156–185` renders the *same three verbs again* inside the plate.

**Measured** (1440×900, route-wide accessible-name census):

```json
{ "duplicateAccessibleNames": { "Regenerate": 1, "Save palette": 2, "Palette name": 1,
                                "Copy all colors": 1, "Color count": 2 },
  "regenBtnCount": 2, "regenOwners": ["dock/other", "plate"] }
```

A Playwright click on `button[aria-label='Save palette']` fails with `locator resolved to 2 elements` — the duplication is severe enough to break automation. And the copy verb ships under **two different names for one action**: Dock `"Copy colors"` (`usePaneRouter.ts:198`) vs plate `"Copy all colors"` (`GenerateControls.vue:179`).

**Canon.** `PROPORTION-AUDIT.md §4` PR-06: *"Three adjacent action species or duplicated selected fills → **REMOVE** … One action/selection owner across **Generate** and owner/Admin/Mix tabs."* `OPTICAL-BENCH-COMPOSITIONS.md §3` Generate close: *"Close regions, exact narrow order, stable regeneration, truthful seed and **one Dock action species**."* `VISUAL-CONSTITUTION.md §5`: *"Commit uses **one** glass-ui action set."*

**Cure.** One owner. Either the Dock bar owns the three verbs and the plate chrome is deleted, or the reverse and `usePaneRouter.ts`'s generate branch is deleted. The `defineExpose` imperative bridge exists only to serve the duplicate; it goes with it.

### D-5 · Two facts rendered four times

Same route, simultaneously visible:

| Fact | Rendering 1 | Rendering 2 |
|---|---|---|
| the 5–12 generated colors | `PaletteColorStrip` full-bleed strip (`GenerateControls.vue:135`) | `WatercolorDot` row (`:199–208`) |
| the count | `Badge` in plate chrome (`:150–152`) | slider `<label>` (`:287–291`) |

Measured at 390×844, count = 12:

```json
{ "dotCount": 12, "dotRows": [452, 494], "stripSegments": 12, "stripSegW": 26.83,
  "badge": "12", "labels": ["12"] }
```

Twelve colors as 26.83 px strip segments, then the same twelve as 36 px dots on two ragged rows 60 px below — two geometries, no registration, no differentiation of role. `gen-390-max.png` shows the second dot row half-empty against a perfectly regular strip. The count reads `12` twice, ~290 px apart. `PROPORTION-AUDIT.md §5` card law 5 requires each mark to be *"data, status, labeled action, drag affordance, focus/selection register or removed"* — a second identical rendering of data already shown is none of those. `§3` law 8: *"One pane may have one full-strength visual protagonist. Supporting fixtures do not compete with it through equal size."*

**Cure.** Canon already picked the winner: `OPTICAL-BENCH-COMPOSITIONS.md §3` says the Generate protagonist is *"WatercolorDot specimen"*. The strip is the redundant one. Delete it; let the dot field be the stage at 61.8%. The count badge dies with it — the slider's own label is the count's one owner.

### D-6 · Hand-rolled slider track — measured **1.19:1** thumb contrast, and it escapes the forced-colors roster

`GenerateControls.vue:292–307`:

```html
<div class="absolute inset-0 rounded-full overflow-hidden h-6" :style="{ background: countSliderGradient }" />
<Slider … variant="spectrum" :style="{ '--slider-track-bg': 'transparent' }" />
```

A bare `<div>` paints the color track; the producer `Slider`'s own track is blanked by a **per-instance CSS-variable override**.

Three violations at once:

1. **Edict 5 / root-level styling.** `--slider-track-bg` is a producer token overridden inline on one instance.
2. **Edict 4 + `VISUAL-CONSTITUTION.md §5`.** *"The domain-neutral axis composition sits over BI `Slider`: label, unit, reserved live value, optional numeric entry, focus/target behavior, and **a color-bearing or neutral track chosen by semantics**. Picker, **Generate count**, Extract, Gradient, Atmosphere and Blob adopt that one composition; feature waves own their domain arrangement, **not new slider mechanics**."* A color-bearing track is named as producer surface. This is new slider mechanics.
3. **The consequence is measurable and unbounded.** The thumb has `background-color: rgba(0,0,0,0)` and `border-color: rgb(251,250,248)` — a transparent-filled near-white ring over an *arbitrary user-generated* gradient:

```
vibrant: ring rgb(251,250,248) vs track stops → ratios [2.76, 1.72, 3.75, 2.35, 3.34]
pastel : ring rgb(251,250,248) vs track stops → ratios [1.45, 1.19, 1.62, 1.37, 1.56]  min 1.19
```

WCAG 1.4.11 requires **3:1** for a UI component's state indicator. At preset = *Pastel* the slider's only value indicator sits at **1.19:1** — visually confirmed in `gen-pastel.png`, where the thumb all but vanishes. `VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state **meet their rendered contrast on the actual material tier**; a token name is not evidence."* Because the track is user data, no fixed ring color can satisfy this; the failure is architectural, not a color choice.

4. **The hand-rolled div escapes the WHCM roster.** `demo/styles/foundation.css:679–698` enumerates the color-display surfaces that keep `forced-color-adjust: none`, and it names the *producer* surface — `.glass-slider[data-variant="spectrum"] .slider-range`. The substitute `<div>` has no roster class and no `data-color-surface`, so in forced-colors the ramp is stripped, while the producer range that *is* rostered was deliberately made transparent. The roster was written correctly for a design-system slider; hand-rolling around the slider walked out of it.

**Cure.** Push the color-bearing track into the producer: a `track-gradient` (or `stops`) input on glass-ui `Slider` with a producer-owned thumb whose ring carries its own contrast guarantee against arbitrary track color (dual-stroke light/dark halo). Delete the div and the inline variable. This is edict 4's whole point — the variant belongs in glass-ui.

### D-7 · Chrome outweighs the specimen; the wrap cascade explodes under zoom

Measured, 1440×900:

```json
{ "chromeRowH": 96.5, "stripH": 40, "plateH": 219.5 }
```

The plate's action chrome row is **96.5 px — 2.4× the 40 px specimen strip**, and it is 96.5 px only because the verb cluster *wraps to a second line at the default desktop viewport*: `cluster.clusterWrapped: true` at 1440, with `cluster.x = 123.98` at 390 leaving ~78 px of dead space to its left. The source comment at `GenerateControls.vue:139–142` predicts the wrap at **390**; it happens at **1440**. The comment describes a layout the code does not produce.

At 200 % browser zoom the cascade compounds:

```json
{ "plateW": 700, "chromeRowH": 193, "overflowPastPlate": -26, "docHScroll": 0 }
```

**193 px of action chrome** against a 40 px specimen — the support outweighs the protagonist 4.8:1. `VISUAL-CONSTITUTION.md §3` law 8 forbids exactly this. (`gen-zoom200.png`; no horizontal overflow — that part is clean.)

**Mechanism.** `flex-wrap` + `ml-auto` + `shrink-0` on a 3-button cluster inside a 460 px column has no stable rest state; the row's height is a function of viewport width with a discontinuity right at the default desktop size. Under D-1's chassis the commit set is a *region*, not a wrapping flex line, and the discontinuity disappears.

### D-8 · Type-jurisdiction breach: control labels in Fira Code

`GenerateControls.vue:221,255` label the two selects with `<span class="section-label">Preset|Harmony</span>`. Computed, live:

```json
{ "text": "Preset", "font": "\"Fira Code\"", "size": "12.179px",
  "transform": "uppercase", "tracking": "1.2179px",
  "color": "oklab(0.457941 0.014425 0.03273)" }
```

`.section-label` resolves in `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css` to `@apply text-mono-caption; color: var(--muted-foreground)` → Fira Code, caption size, uppercase, caps tracking.

`VISUAL-CONSTITUTION.md §4` closes the matrix *"across all eighteen compositions"*: **control or label, including dropdown options → `text-small`, Plus Jakarta Sans, non-bold**; Fira Code is reserved for *"value, code, or provenance"*. `PROPORTION-AUDIT.md §5` card law 13 repeats it. `PRESET` / `HARMONY` are control labels wearing the mono/value voice — visible in every capture as tracked uppercase monospace above two sans-serif select triggers, so the label reads as data and the value reads as chrome. The hierarchy is inverted.

Same family, same file: the count label at `:288` is `text-mono-small font-**bold**`, and mono roles carry no bold in the matrix.

### D-9 · The provenance line fails AA at 3.19:1

`GenerateControls.vue:212` — `class="px-3 pb-2.5 pt-1 text-mono-small text-muted-foreground tabular-nums select-all"`.

Measured (light, real render, opaque plate background — no translucency involved):

```
seed text  rgb(112, 89, 66)   14px Fira Code
plate bg   oklab(0.913299 0.005463 0.013024)   (opaque)
contrast   3.19 : 1
```

14 px is not large text (AA large = 18.66 px bold / 24 px), so the floor is **4.5:1**. Measured 3.19. `VISUAL-CONSTITUTION.md §4.1` requires rendered contrast on the actual tier. The seed is the pane's *only* reproducibility affordance and its only textual record of the specimen (see D-3) — it is the last thing that should be the faintest ink on the plate.

### D-10 · The name input's states were never designed

Four states, three broken:

- **Rest.** `border: 0px`, `background: transparent`, `text-decoration: none` (measured). The field is indistinguishable from a heading; the only affordance is `hover:underline decoration-dashed` (`:148`) — **hover does not exist on touch**, so on every mobile capture the editable title is undiscoverable. `PROPORTION-AUDIT.md §4` PR-07: *"Hover-only/unlabeled controls and invisible drag state → **ADD-AFFORDANCE / REMOVE**."*
- **Focus.** `gen-390-max.png` shows the focused field as a hard rectangular box glued into the plate — a form-control edge in a composition that has no other form-control edges. The designed indicator is `focus-visible:ring-2 focus-visible:ring-ring/40`, a **40%-alpha** ring; `§4.1` requires focus to be *"visibly distinct from selection in both schemes, forced colors and reduced transparency"* — a 40%-alpha shadow ring is the one construct that survives none of those three.
- **Overflow / truncation.** Measured at 390 with a 51-char name:

```json
{ "inputClientW": 253, "inputScrollW": 487, "inputTextOverflow": "clip" }
```

  The name is cut **mid-word with no ellipsis and no overflow signal** (`gen-390-max.png`: *"A very long generated pale"*). `text-overflow` does not apply to a scrolled `<input>`, so this state has no styling at all.
- **Disabled / error / pending.** Do not exist. There is no invalid-name state, no length bound, no empty-name guard — an empty name would persist as an unnamed palette. (Moot only because D-2 discards the value entirely.)

### D-11 · No commit truth: save and copy are both silent

After a successful save (D-2 probe), the route's live regions:

```
feedback after save: {"liveRegions":["dev misconfigured — run `npm run dev`"]}
```

The only `aria-live` / `role=status` node on the page is an unrelated dev banner. No toast, no inline status, no focus move, no change in the plate. `copyColors()` (`:106–108`) and `copyColor()` (`:111–113`) `await writeClipboard(...)` and **discard the result** — a clipboard rejection (non-secure context, permission denial) is indistinguishable from success.

`VISUAL-CONSTITUTION.md §5`: *"Persistent operation state stays with the entity/workspace. A transient flourish may celebrate success but **never carries the only truth**."* Here there is not even a flourish. `PROPORTION-AUDIT.md §4` PR-08: *"Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**"* — Generate is the degenerate case of that row: zero truth.

---

## 4. MINOR findings

### D-12 · RTL: physical utilities; the verb cluster lands on the wrong side

`GenerateControls.vue:156` uses `ml-auto` (physical `margin-left`) to seat the verb cluster; `:288` uses `text-right` on the count label. Measured with `dir="rtl"` at 1440:

```json
{ "plate": { "x": 754, "right": 1216 },
  "clusterX": 970.2, "clusterRight": 1203,
  "clusterInsetFromPlateInlineStart": 13,
  "countLabelAlign": "right", "firstDotX": 1163, "docHScroll": 0 }
```

`margin-left:auto` does not flip: the cluster's edge lands 13 px from the plate's **physical right**, which under RTL is the **inline start** — so the verbs seat directly beneath the title instead of opposite it (`gen-rtl.png`). The source comment at `:153–155` states the intent as *"right-seated"*; the correct logical utility is `ms-auto`. Likewise `text-right` on the count digit points it away from the slider it labels under RTL (visible gap in `gen-rtl.png`), where `text-end` would keep it adjacent. The wrapping dot field itself flips correctly (`firstDotX: 1163` = inline start) and there is no horizontal overflow, so the defect is confined to the two physical utilities.

### D-13 · The plate triple-expresses one boundary, inside a Card that already drew one

`GenerateControls.vue:132` — `class="rounded-card border border-card-edge bg-well shadow-cartoon-sm"`. Measured:

```json
{ "border": "1px", "borderColor": "oklab(0.216129 0.003491 0.005182 / 0.12)",
  "bg": "oklab(0.913299 …)", "radius": "16px",
  "shadow": "oklab(0.28 0.01676 0.024882 / 0.32) -2px 2px 0px 0px, …" }
```

Stroke **+** material change **+** cartoon caster shadow, nested one level inside `Card tier="resting"` which supplies its own edge and its own resting shadow (`glass-resting card rounded-card`, measured class list). `OPTICAL-BENCH-COMPOSITIONS.md §5`, Generate row: boundaries `[]`, reserve `none`, retained non-P122 line **none**, grouping job *"stage, inspector and Dock action species remain distinct without a rule"* — and the closing sentence: *"Any additional line, automatic P122 divider, consumer-hidden producer line, terminal row rule, **caster stroke** or corner rule is a defect."* `PROPORTION-AUDIT.md §4` PR-05 is the family row; §5 card law 4: *"Spacing plus material already expressing the same boundary makes the line duplicative."* Under the D-1 chassis the plate is the stage region and needs no shell of its own.

### D-14 · Dead injection with a non-null assertion

`GeneratePane.vue:10` — `const cssColorOpaque = inject(CSS_COLOR_KEY)!;`. `grep -c "cssColorOpaque" GeneratePane.vue` → **1**: the declaration is its only occurrence. It is never read in script or template. A non-null-asserted injection that nothing consumes is a hard coupling to a provider the pane does not need — it would throw on a provider-less mount for no benefit. Delete it and the `CSS_COLOR_KEY` import at `:7`.

### D-15 · Masking optional-chains and a pre-3.5 template ref

`GeneratePane.vue:12,22–26`:

```ts
const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null);
defineExpose({
    regenerate: () => controlsRef.value?.regenerate?.(),
    save:       () => controlsRef.value?.save?.(),
    copyColors: () => controlsRef.value?.copyColors?.(),
});
```

The **second** `?.` on each line guards a method `GenerateControls.vue:115` unconditionally exposes. It cannot be absent; the optional call only converts a future rename into a silent no-op. That is edict 2's "masking fallback." (The identical pattern is repeated in the Dock at `usePaneRouter.ts:196–198`: `paneRefs.generate.value?.regenerate?.()` — a rename of the exposed method would silently disable all six seats at once.) Separately, edict 7: Vue 3.5's idiom is `useTemplateRef("controlsRef")`, not `ref<InstanceType<typeof X>>(null)`.

### D-16 · Motion untokenized, and asymmetric across one verb's two seats

`GenerateControls.vue:205` — `active:scale-95 transition-transform`, with no duration or easing token, resolving to Tailwind's bare default. `demo/DESIGN.md` and the tokens `--animation-slide-sm/md/lg` (plus glass-ui `--duration-*` / `--ease-*`) exist for exactly this; edict 6 requires motion to be moved or tokenized, never ad hoc. Two aggravations: the press feedback rides an `aria-hidden`, non-focusable span (D-3), so it exists for mouse only; and the *same verb* animates in one seat and not the other — `usePaneRouter.ts:196` gives the Dock Regenerate `rotateOnClick: true` while the plate Regenerate (`:157–164`) has none. One verb, two seats, two motion languages — a direct consequence of D-4.

### D-17 · Every operable seat in and around the plate is under the 44 px floor

Measured, 1440×900, all interactive elements below 44 px on either axis (excerpt, plate + this route's Dock bar):

```
INPUT  "Palette name"      398 × 31
BUTTON "Regenerate" (plate) 145 × 40
BUTTON "Save palette"        36 × 36
BUTTON "Copy all colors"     36 × 36
BUTTON "Generation preset"  225 × 36
BUTTON "Color harmony"      225 × 36
SPAN   "Color count" (thumb) 12 × 24
BUTTON "Regenerate" (dock)   32 × 32
BUTTON "Save palette" (dock) 32 × 32
BUTTON "Copy colors" (dock)  32 × 32
```

`PROPORTION-AUDIT.md §5` card law 7 and PR-12 make the remedy explicit: *"Visual glyph size, operable target size and layout reservation are separate quantities… **Invisible/seat geometry preserves target floor while optics follow rung**."* Nothing here carries an invisible seat — the glyph box *is* the hit box. (The megatranche `REPORT.md` counts 5 small tap targets for `/#/generate` in every matrix; the enumeration above shows the true route-level count is higher because the report's heuristic misses the slider thumb and the borderless input.)

### D-18 · Inert utilities on the pane root

`GeneratePane.vue:30` — `<div class="relative w-full mx-auto h-full min-w-0">`. `mx-auto` is a no-op beside `w-full`; `relative` establishes a containing block no descendant uses (no `absolute` child exists in the pane). Copied verbatim from `ExtractPane.vue:2`. Small, but it is the same cloned-recipe mechanism as D-1 and it disappears with the chassis.

---

## 5. What I checked that is **not** a defect

Recorded so the negative is proved rather than assumed:

- **`prefers-reduced-motion` is handled.** `demo/styles/animations.css:184–192` applies a global `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important` guard, which neutralises the dots' `transition-transform`. (D-16 is about tokenization and symmetry, not about reduced-motion compliance.)
- **The animated property is compositor-safe.** `transform` only — no layout-forcing property is animated anywhere in the pane.
- **Horizontal overflow is genuinely zero** — measured `docHScroll: 0` at 1440, 390, 200 % zoom, and `dir=rtl`. Matches `REPORT.md`'s `overflowX 0` rows.
- **`.generate-swatch` *is* in the forced-colors tier-1 roster** (`demo/styles/foundation.css:690`), so the dots keep their color under WHCM. The gap is the hand-rolled slider div and the strip segments (D-6.4), not the dots.
- **`verbatimModuleSyntax` is satisfied** — `GeneratePane.vue:8` and `GenerateControls.vue:21,32,33` all use `import type`.
- **The dropdown preview strips do not lie.** `presetStops` / `harmonyStops` (`GenerateControls.vue:94–100`) call the same pure, mulberry32-seeded `generatePalette` with the live `(count, seed)`, so each row previews the exact palette selecting it yields. This is the one place in the component where an affordance tells the truth, and it should survive the rebuild intact.
- **The palette-name type role is correct** — measured Fraunces 20.35 px = `--type-subheading`, matching `VISUAL-CONSTITUTION.md §4`'s *"palette identity"* row. (Its behaviour is broken — D-2, D-10 — but its typography is canon.)
- **No console errors, no page errors, one `<main>`** on `/#/generate` in all four audit matrices (`REPORT.md:124,139,154,169`).
- **The `dev misconfigured` banner** seen in `gen-zoom200.png` colliding with the Dock is a shell/dev-harness artifact, not this component's; recorded here so it is not mistaken for a Generate defect.

---

## 6. Family grouping — the defects reduce to four mechanisms

| Family | Members | Root mechanism |
|---|---|---|
| **F1 · wrong primitive** | D-1, D-13, D-18, D-7 | `Card` + raw flex/grid substituted for the decided `InstrumentChassis`; boundaries, proportion and wrap behaviour are all consequences |
| **F2 · contract dropped at the seam** | D-2, D-14, D-15 | the pane is a thin bridge that mis-consumes the interfaces on both sides — drops an emitted arg, injects what it never reads, optional-chains what always exists |
| **F3 · reached past the design system** | D-3, D-6, D-8, D-16 | hand-rolled substitutes for producer surfaces (dot-as-button, slider track, label voice, motion) that then fall outside the producer's guarantees — a11y semantics, contrast, the WHCM roster, the motion tokens |
| **F4 · state never designed** | D-4, D-5, D-9, D-10, D-11, D-12, D-17 | the happy path at 1440-light was designed; duplicate/empty/focused/truncated/RTL/silent-commit/touch states were not |

**One cure dominates.** Executing the `OPTICAL-BENCH-COMPOSITIONS.md §3` Generate row as written — `InstrumentChassis` `golden`, `boundaries []`, `reserve none`, Card 0, WatercolorDot specimen as the 61.8% stage, model inspector at 38.2%, **one** commit region — dissolves F1 entirely, forces the D-4 verb-ownership decision, removes the D-5 second rendering (the strip), and gives D-11's commit truth a region to live in. F2 and F3 are then narrow, mechanical repairs on top of a correct chassis. Patching percentages, ring alphas or `ml-auto` inside the current `Card` column addresses symptoms while leaving the component built out of the primitive canon forbids for this route.

---

## 7. Standing-law compliance for this seat

- Model receipt declared (§ Model receipt).
- All writes confined to `docs/tranches/V/megatranche/audit/components/wb-generate-pane/`. No source, no `INBOX.md`, no `vnext/`, no `scripts/dev/dev.sh` touched. Zero source edits.
- Every finding carries `file:line`, pasted command/probe output, a measured number, or a quoted canon clause. No finding in this report is an unlabelled hypothesis; all eighteen have a reproduction or a direct measurement.
- Browser probes: 3 scripted WebKit runs, read-only, batched to keep the cost proportionate (probe parsimony edict).
