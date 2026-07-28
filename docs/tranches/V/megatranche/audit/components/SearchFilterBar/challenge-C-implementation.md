# CHALLENGE-C — SearchFilterBar.vue · the implementation is defective (r3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was spawned with and the tier I am serving. Nothing here is inherited from an
ambient default and nothing was delegated to another model.

---

**Subject** `demo/palettes/browser/search/SearchFilterBar.vue` (249 lines · area `palettes`)
**Repo** `/Users/mkbabb/Programming/value.js` · branch `tranche-u`
**HEAD at audit time** `f36f780c`. The brief cites `c654824e`; the branch advanced during the
mega-tranche. The **subject file is unchanged** since `a61094e3`
(`git log --oneline -1 -- demo/palettes/browser/search/SearchFilterBar.vue` → `a61094e3`), so every
measurement below is against the bytes the brief points at.
**Sole consumer** `demo/palettes/BrowsePane.vue:10-27`
**Verdict** **DEFECTIVE** — four blockers, seven majors.

### Relationship to r2

A previous C seat (r2) wrote to this path and banked C-1…C-14. **Its report is preserved verbatim at
`challenge-C-implementation-r2-32b4040e.md`**; its probes and evidence in `probes/` and `evidence/`
are untouched. This report supersedes it and states what happened to its load-bearing claims:

| r2 claim | r3 disposition |
|---|---|
| C-1 Checkbox prop/emit drift | **re-verified independently** against the published `.d.ts` (§2.1) |
| C-2 hex-only masking fallback | **re-verified, and a second entry path found** — the empty string (§1.4) |
| C-3 popover cannot shrink or scroll | **ESCALATED — reproduced with NO fixture at the repo's own certified mobile matrix** (§1.1). r2 needed a mocked tag list; the shipped zero-tag state is already broken. |
| C-4 `variant="ghost"` is not a glass-ui 7 prop | **re-verified independently** against `Button.vue.d.ts` (§2.2) |
| C-5 dead `async`/`searching` | re-verified; **and it is the only reason a nameless button is not already in the visual REPORT** (§1.6) |
| C-6 Clear-all unmounts under focus | carried; compounded by §1.4 |
| C-7 zero tests / `strictTemplates` off | re-verified with my own count — **94** spec/test files, 0 references |
| C-8 a11y (badge not in name, unnamed radiogroups) | re-verified (`triggerAccessibleLabel: "Filters"` while `badgeText: "1"`) |
| C-9 "no `requestAnimationFrame`, no `defineModel`, no lossy roundtrip" | **partially challenged and then confirmed by a harder probe** — the parent *does* close a lossy HSV↔hex writeback loop; I measured it and it converges (§4) |

**Six defects r2 did not find** are in §1: C-15 … C-22. Four of them are measurable without any
network fixture at all, which is what makes them shipped rather than hypothetical.

---

## 0. Method

**Static.** Full read of the subject; `MiniColorPicker.vue`; `BrowsePane.vue:10-27` and `:326-358`;
the `demo/ui/*` barrels; and the **published** glass-ui 7.0.0 surface in
`node_modules/@mkbabb/glass-ui/dist/**` — both the `.d.ts` (what a gate would read) and the compiled
`.js`/`.css` (what the user gets).

**Live.** Three Playwright probe batches against the running dev server at `http://localhost:9000`:

- `probes/probe-C6-r3.mjs` → `evidence/probeC6-r3.json` — style-token liveness, computed panel
  geometry, mount-state, the valid-hex desync, `type` audit, and five instrumented SV-canvas drags.
  *(Uses r2's two route interceptions so the tag section can be reached; every finding states whether
  it needs them.)*
- `probes/probe-C7-r3.mjs` → `evidence/probeC7-r3.json` + `evidence/C-r3-panel-over-live-text.png` —
  **no fixture at all**: panel material, per-button `type`, and the undo experiment.
- `probes/probe-C8-r3.mjs` → `evidence/probeC8-r3.json` + `evidence/C-r3-trap-*.png` —
  **no fixture at all**, three viewports including `devices["iPhone 14"]`.

**Why "no fixture" matters.** r2's strongest finding was gated behind a mocked
`/colors/tags` response, which let it be read as conditional. §1.1 and §1.2 need nothing: a bare dev
server, one click, one screenshot.

---

# 1. New defects

## 1.1 BLOCKER — C-15: on the repo's **own certified mobile matrix**, the entire "Find by Color" section is below the fold in the shipped zero-tag state. The Search button cannot be clicked.

### The matrix is not my choice — it is the repo's

`docs/tranches/V/megatranche/audit/visual/capture.mjs:53-58` defines `safari-mobile-light` /
`safari-mobile-dark` as `{ ...devices["iPhone 14"] }`:

```
$ node --input-type=module -e 'import {devices} from "playwright"; console.log(JSON.stringify(devices["iPhone 14"].viewport))'
{"width":390,"height":664}
```

So 390×664 is the viewport the visual gate certified `/#/browse` at, four captures deep, twice.

### Measurement (`probe-C8-r3.mjs`, **zero fixtures, zero tags, one click on the Filters trigger**)

```json
"mobile-390x664": {
  "panel":            { "top": 304, "bottom": 745.4, "h": 441.4 },
  "viewport":         { "w": 390, "h": 664 },
  "maxHeight":        "none",
  "overflowY":        "visible",
  "scrollable":       false,
  "availableHeight":  "359.7156372070313px",
  "findByColorVisible": false,
  "searchClicked":    false
}
"mobile-390x664_searchClickError":
  "TimeoutError: locator.click: Timeout 4000ms exceeded. | Call log:
   | - waiting for locator('button').filter({ hasText: /^Search$/ }).first()"
```

Read the five numbers together:

- The panel is **441.4px** tall and its bottom edge sits at **745.4px** — **81.4px past the fold.**
- reka publishes the exact budget on the popper wrapper: **`--reka-popper-available-height:
  359.72px`**. The panel is 441.4px. It overruns the number the positioning engine handed it by
  **81.7px**, and consumes that variable nowhere.
- `max-height: none`, `overflow-y: visible`, `scrollHeight === clientHeight` → **there is no scroll
  container anywhere in the chain.** Nothing is clipped-and-scrollable; it is simply gone.
- `findByColorVisible: false` — the "Find by Color" label's own rect is outside the viewport.
- Playwright could not even *resolve* the Search button for a click.

### The screenshot (`evidence/C-r3-trap-mobile-390x664.png`)

The rendered panel contains, top to bottom: `SORT` (three radios), `TIER` (two radios), and then the
words `FIND BY COLOR` bisected by the bottom edge of the screen. The swatch, the text field and the
Search button are not on the device. There is no scrollbar and no visual cue that anything more
exists.

**This component exists to filter palettes by colour. On the repo's certified phone viewport, in the
state it ships in today, that feature is not reachable.**

### Why every gate was green

`audit/visual/REPORT.json`, all four `/#/browse` rows, is identical:

```json
"counts": { "main": 1, "h1": 0, "nav": 1, "canvas": 1, "button": 14, "dialog": 0, "allElements": 187 },
"a11y": { "smallTapTargets": [ {"w":160,"h":20,"tag":"input","label":""},
                               {"w":23,"h":23,"tag":"button","label":"Switch to slug"},
                               {"w":23,"h":23,"tag":"button","label":"Generate new slug"},
                               {"w":23,"h":23,"tag":"button","label":"Cancel"} ],
          "imgNoAlt": 0, "namelessButtons": 0 }
```

`"dialog": 0` — the popover is never opened. All four tap-target rows belong to `PaletteSlugBar`.
**This component's contribution to the REPORT is zero because the REPORT never looked inside it**,
which is not the same as clean. The same four rows also carry
`"Failed to load remote palettes: SyntaxError: The string did not match the expected pattern."`,
so `availableTags` is empty in every capture — the third gate that would have surfaced C-1.

### Cure

The height contract belongs in glass-ui's `PopoverContent` root (edicts 4 and 5), not here —
the same design system already ships the idiom one component over
(`dist/styles/utilities/components.css`:
`max-height:min(24rem, var(--reka-combobox-content-available-height,60dvh))`). Popover needs
`max-h-[min(var(--reka-popover-content-available-height,80dvh),80dvh)] overflow-y-auto
overscroll-contain`. **BH/BI relay item.** The demo-side contribution is §1.2 (40.7px of padding the
author already tried to delete) and C-9's 44px radio rows.

---

## 1.2 MAJOR — C-16: `p-0` on the PopoverContent is **inert**. The padding it deletes is still there — 40.7px of it — while `w-60`, in the same class attribute, wins.

### Measurement (`probe-C6-r3.mjs`, `freshOpen`)

```json
"classList": "popover-content z-popover glass-floating [--overlay-pad-inline:1rem]
              [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)]
              px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal w-60 p-0",
"padding":       "20.352px 16px",
"paddingInline": "16px",
"paddingBlock":  "20.352px",
"width":         "240px"
```

`SearchFilterBar.vue:16` writes `class="w-60 p-0"`. Both are per-instance overrides of a design-system
root, which edict 5 forbids outright. What actually happened:

- **`w-60` won.** 240px, against glass-ui's own `w-72` (288px).
- **`p-0` lost.** `padding-inline` is 16px (`--overlay-pad-inline: 1rem`) and `padding-block` is
  20.352px (`1rem × 1.272`). The `px-(--overlay-pad-inline)` / `py-(--overlay-pad-block)` pair in
  glass-ui's own emitted sheet orders after `.p-0`, so the shorthand never lands.

One class attribute, two overrides, **opposite outcomes**. That asymmetry is precisely why edict 5
exists: at the design-system root the consumer cannot predict which of its overrides survives.

### The three consequences, each independently observable

1. **40.7px of block padding the author explicitly asked to remove** — 9.2% of the 441.4px panel in
   §1.1, and a direct contributor to the overflow measured there and in C-3.
2. **The `divide-y` hairlines do not reach the panel edge.** Lines 17 and 19-120 build the sections
   as full-bleed rows separated by `divide-y divide-border`; with `p-0` inert they are inset 16px on
   each side. Visible in `evidence/C-r3-panel-over-live-text.png` (2× DPR): the rule under
   "Most Forked" stops ~17 CSS px short of the panel edge on both sides, and there is a ~20px empty
   band above `SORT` and below the last row.
3. **It reads as done.** A future maintainer sees `p-0` and believes the panel is unpadded. Dead code
   that lies about the layout is worse than absent code.

### Cure

Delete `p-0`, and take the section padding from glass-ui's overlay tokens instead of re-deriving it
in `.filter-section` (`0.75rem`, line 238) — or, if the design really is full-bleed divided rows, that
is a `PopoverContent` variant request for glass-ui (**BH/BI relay**), not a consumer class. Either
way the current line asserts something untrue.

---

## 1.3 MAJOR — C-17: the swatch's hover affordance cannot exist. `hover:shadow-cartoon-md` is a variant Tailwind is structurally unable to generate.

`SearchFilterBar.vue:76`:

```
class="block h-7 w-7 rounded-full border-2 border-border shadow-cartoon-sm cursor-pointer
       transition-shadow hover:shadow-cartoon-md shrink-0 focus-ring"
```

### Mechanism

`.shadow-cartoon-sm` / `.shadow-cartoon-md` are **hand-authored CSS classes** in glass-ui's shipped
sheet, not Tailwind theme utilities:

```
$ grep -o ".\{0,40\}\.shadow-cartoon-md.\{0,60\}" node_modules/@mkbabb/glass-ui/dist/styles/utilities/components.css
… :where(.shadow-cartoon-sm, .shadow-cartoon-md, .shadow-cartoon-lg) { border: 2px solid var(--border); }
  .shadow-cartoon-sm { box-shadow: var(--shadow-cartoon-sm); translate: 0 -1px; }
  .shadow-cartoon-md { box-shadow: var(--shadow-cartoon-md); translate: 0 -1px; }
```

The *tokens* exist (`--shadow-cartoon-sm: -2px 2px 0 …`, `--shadow-cartoon-md: -3px 3px 0 …`,
measured live on `:root`), and the *bare* classes exist. But a `hover:` variant of a hand-written
class is not something Tailwind can emit — it only varies utilities it generated. And it did not:

```
$ grep -rn "hover\\\\:shadow-cartoon" node_modules/@mkbabb/glass-ui/dist/*.css demo/styles/*.css
(no output)
```

The CSSOM scan in `probe-C6-r3.mjs` walked every stylesheet in the live document and found exactly
two selectors containing `shadow-cartoon-md` — `:where(.shadow-cartoon-sm, .shadow-cartoon-md,
.shadow-cartoon-lg)` and `.shadow-cartoon-md`. **No hover rule is served.**

### Reproduction (live, no fixture)

```json
"freshOpen.swatchBoxShadow":
  "oklab(0.28 0.0167833 0.0248661/0.32) -2px 2px 0px 0px,
   oklab(0.28 0.0167833 0.0248661/0.26) -3px 3px 0px 0px,
   oklab(0.28 0.0167833 0.0248661/0.18) -4px 4px 0px 0px"
"swatchHover.boxShadow":
  "oklab(0.28 0.0167833 0.0248661/0.32) -2px 2px 0px 0px,
   oklab(0.28 0.0167833 0.0248661/0.26) -3px 3px 0px 0px,
   oklab(0.28 0.0167833 0.0248661/0.18) -4px 4px 0px 0px"
```

Byte-identical after a real `hover()` and a 350ms settle — and the offsets `-2/-3/-4px` are the **sm**
recipe, not md (`-3/-5/-7px`). The swatch has **no hover state at all**, and `transition-shadow`
transitions a property that never changes. Three classes on the same element transacting nothing.

The same dead class sits on `MiniColorPicker.vue:18` and `:41` (the SV thumb and the readout dot use
the bare `shadow-cartoon-sm`, which *does* work) — so the family is one site, this one.

### Cure

Two honest options, and the choice is glass-ui's, not the demo's (edicts 4/5):
promote `--shadow-cartoon-*` into glass-ui's `@theme` so the `shadow-*` namespace generates real
variant-capable utilities, or ship an explicit `.hover\:shadow-cartoon-md` (and `focus-visible:`)
alongside the base classes. **BH/BI relay item**, and it is a general one: any consumer writing
`hover:`/`focus:`/`dark:` on a glass hand-authored utility gets silence.

---

## 1.4 MAJOR — C-18: the colour filter cannot be undone, and the empty string performs a search.

### Measurement (`probe-C7-r3.mjs`, **no fixture**)

```json
"afterSearch":         { "badge": "1", "inputValue": "#ff0000", "clearAllPresent": true }
"afterEmptyingField":  { "badge": "1", "inputValue": "",        "clearAllPresent": true }
"afterEnterOnEmpty":   { "badge": "1", "inputValue": "",        "clearAllPresent": true }
```

Three states, one badge value. Specifically:

1. **Emptying the field does not undo the search.** `colorText` is cleared; `colorSearchActive`
   (line 171) is not, because the only writer that clears it is `onClearAll` (line 228). The wall
   stays filtered and the badge keeps claiming one active filter, with nothing on screen naming it.
2. **`Enter` on an empty field runs a search.** `applyColorSearch` (line 213) takes
   `text = ""` → `"".startsWith("#")` is false → `hex = pickerHex.value` → `colorSearchActive = true`
   → emit. The empty string — the canonical domain-boundary input the brief asks about — produces a
   **silently successful search for `#4488cc`**. This is a second entry into C-2's masking fallback
   that requires the user to type nothing at all.
3. **There is no per-filter clear.** The panel's full control inventory after a search:
   `["", "", "", "", "", "Open color picker, current col", "Search", "Clear all filters"]` — five
   radios, the swatch, Search, and one global reset. Nothing removes the colour filter alone.

### Why "Clear all filters" is not an answer

It is the control C-3/§1.1 pushes below the fold and C-6 makes unmount itself under focus. Measured
at the two viewports where a filter can actually be applied:

| viewport | panel height | panel bottom | Clear row rect | verdict |
|---|---|---|---|---|
| 1440×800 | 521.3 | **852.3** (52.3 past the fold) | top 786.9, bottom **822.9** | **63% of the button is off-screen**; its centre is below the fold |
| 390×844 | 494.4 | 888.4 (44.4 past) | top 823.1, bottom 859.1 | 58% off-screen |

(`probeC8-r3.json`; r2 measured it *fully* off-screen at 1440×1000, 1440×800 and 390×664 once tags
exist.) So the only undo is a sliver of a button hanging past the bottom of the window, and
activating it dismisses the whole panel and drops focus to `<body>` (C-6).

### Cure

Delete `colorSearchActive` and lift the truth to the prop the parent already owns
(`BrowsePane.colorSearchParams`, `BrowsePane.vue:336`) — that is r2's C-10 cure and it makes the
badge honest for free. Then: empty input must not search (it must say so — see C-2's cure), and the
colour row needs its own dismiss (an `×` on the swatch when a filter is live), so the global reset
stops being the only exit.

---

## 1.5 MAJOR — C-19: after a valid-hex search, the swatch and its accessible name name a different colour than the one filtering the wall.

### Measurement (`probe-C6-r3.mjs`, `afterValidHexSearch`, no fixture)

Typed `#ff0000` — a *valid* input that C-2's regex **accepts** — and pressed Search:

```json
{ "inputValue": "#ff0000",
  "badgeText": "1",
  "swatchLabel": "Open color picker, current color #4488cc",
  "swatchBg": "rgb(68, 136, 204)",
  "triggerAccessibleLabel": "Filters" }
```

The wall is filtered against red. The swatch is painted blue. Its accessible name **states** the
colour is `#4488cc`. And the trigger's accessible name is still the bare word "Filters" while a badge
reads `1` (C-8).

This is the mirror image of C-2 and it has been missed because C-2 is the louder half. C-2 is *"the
search ignores what you typed"*; C-19 is *"the indicator ignores what you searched"*. Both come from
the same root: `colorText` (line 169) and `pickerHex` (line 170) are two sources of truth with a
one-way link — `onPickerHexUpdate` (line 175) pushes picker → text, and **nothing** pushes text →
picker. After any typed search the swatch is stale for the rest of the session.

An `aria-label` that asserts a specific value is a contract. Announcing `current color #4488cc` when
the applied colour is `#ff0000` is worse than announcing nothing.

### Cure

One source of truth. Keep `colorText` as the field's model and derive the swatch from the last
*applied* colour, not from the picker's independent HSV state:
`:style="{ backgroundColor: appliedHex }"`, `:aria-label="\`Open color picker, current color
${appliedHex}\`"`, where `appliedHex` is set by both entry points. Under C-18's cure that value is a
prop and the desync becomes unrepresentable.

---

## 1.6 MINOR — C-20 / C-21 / C-22: the small ones, all measured.

**C-20 · the inline Search button is a submit button.** `SearchFilterBar.vue:97-104` is a raw
`<button>` with no `type`. Every other button in the panel carries `type="button"` because reka sets
it on its primitives (`probeC7-r3.json`, `buttonTypes`: five `role="radio"` buttons and the swatch
trigger, all `typeAttr: "button"`), but:

```json
{ "name": "Search", "role": null, "typeAttr": null, "typeProp": "submit",
  "rect": { "w": 52.6, "h": 24 } }
```

`button.type === "submit"`. Inert **today** — `probeC6-r3.json.host.hasFormAncestor: false`, and the
panel is portalled out of the tree anyway (`chain: BUTTON.button → DIV.flex → DIV.input-bar → …`).
It becomes live the day glass-ui's `SearchBar` root becomes a `<form>`, which is the idiomatic
markup for a search field. The fix is one attribute and the asymmetry with its own siblings is the
argument for it.

**C-21 · a latent nameless button, and the only reason it is not in the REPORT.** Lines 97-104:
when `searching` is true the button's entire content is `<Loader2 class="animate-spin"/>` — an SVG
with no `title` and no `aria-label`, on a button with no `aria-label`. The control becomes
**nameless**. It is unreachable solely because C-5 makes `searching` unobservable
(`async` with no `await`). `REPORT.json` records `"namelessButtons": 0` for `/#/browse`; that zero is
purchased by a second bug. Fix C-5 as written and the nameless button ships. Both must be cured
together: keep a persistent `aria-label="Search by color"` on the button so its name survives the
content swap.

**C-22 · the Search button is exactly at the WCAG 2.5.8 floor.** Measured 52.6 × **24.0**px — not
below it, but with zero margin, and it is absolutely positioned *over* the input's text lane
(`absolute right-1 top-1/2 -translate-y-1/2`), so it also subtracts from the field's own target. Any
future `h-6` → line-height interaction, browser zoom below 100%, or `--spacing` retune puts it under.
INFO, recorded so the next seat does not re-measure.

---

# 2. Independent re-verification of the r2 blockers

I did not take these on trust; each was re-read from the published contract.

## 2.1 C-1 — the Checkbox prop/emit pair does not exist (CONFIRMED)

`node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts`:

```ts
export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    disabled?: boolean;
    value?: SelectionValue;
    id?: string;
    class?: HTMLAttributes["class"];
}
// emits: { "update:modelValue": (value: CheckedState) => any }
```

No `checked`. No `update:checked`. `SearchFilterBar.vue:51-55` binds both. The checkbox therefore
runs uncontrolled, fills in, sets `aria-checked="true"`, and filters nothing — r2 measured
`states: ["unchecked","checked","unchecked"]`, `badgeText: ""`, and an unchanged network triple in
the same frame. **The severity stands: an affordance that confirms an action it did not perform, to
sighted and AT users simultaneously.** 2 of 2 `<Checkbox>` sites in `demo/` are wrong
(`TagEditPopover.vue:28-29` is the other).

## 2.2 C-4 — `variant` is not a glass-ui 7 Button prop (CONFIRMED)

`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6-19` declares
`emphasis · tone · size · iconOnly · loading · type · disabled · class` and **defaults**
`{ size, as, tone, loading, emphasis, iconOnly }`. There is no `variant` and there is no `type`
default — which is exactly why C-20's sibling asymmetry exists (reka supplies `type="button"`,
glass-ui does not). Lines 5 and 111-112 pass `variant="ghost"`; it lands as an inert DOM attribute
while `emphasis` defaults to `"secondary"`, painting `glass-wash glass-capsule`. Visible in my own
capture `evidence/C-r3-panel-over-live-text.png`: the ⋮ trigger is a filled capsule, not a ghost.

## 2.3 C-7 — the test surface, re-counted

```
$ find test e2e -name "*.spec.ts" -o -name "*.test.ts" | wc -l
      94
$ grep -rln "SearchFilterBar|Find by Color|Search by CSS color|Clear all filters" test/ e2e/
(no output)
```

**94 spec/test files, zero references.** The vacuous mutation is total: delete lines 16-122 and
reduce `<script setup>` to a bare `defineEmits`, and `npm test` and `npm run test:e2e` both stay
green. `e2e/smoke/views/browse-loading.spec.ts` and `browse-pagination.spec.ts` exist; neither opens
the popover, which is the same blindness §1.1 found in the visual gate.

## 2.4 C-8 — the accessible name, re-measured

`probeC6-r3.json.afterValidHexSearch`: `"triggerAccessibleLabel": "Filters"` alongside
`"badgeText": "1"`. `aria-label` (line 5) overrides the subtree, so the visible name "Filters 1" and
the accessible name "Filters" disagree whenever a filter is active.

---

# 3. Edict ledger

| edict | status | evidence |
|---|---|---|
| 1 · no god modules | **clean** | 249 lines, one concern, one consumer |
| 2 · no legacy code, no masking fallbacks | **VIOLATED ×2** | C-2's regex fallback (line 218) — now with a second entry via the empty string (§1.4); and `variant="ghost"` / `:checked` are unmigrated pre-7 shadcn-vue vocabulary (C-1, C-4) |
| 3 · KISS, no contrivance | **VIOLATED** | five pieces of machinery around `searching` that transact nothing (C-5); `hexToOklab`'s unreachable `"none"` branch (C-13); an inert single-child flex wrapper (line 2) |
| 4 · glass-ui is the design system | **clean at the demo boundary** | all primitives come from the barrels; the failures are contract drift, not forks |
| 5 · root-level styling, no per-instance overrides | **VIOLATED, and half of it does not even work** | `class="w-60 p-0"` (line 16) — `w-60` wins, `p-0` is inert (§1.2) |
| 6 · animations never deleted | **clean** | scoped `transition` on `.filter-option` is layout-local; global keyframes untouched. *(Note: `transition-shadow` on line 76 animates nothing — that is C-17, a dead target, not a deleted animation.)* |
| 7 · idiomatic Vue 3.5 | **VIOLATED** | dead `async` (C-5); mixed `$emit`(lines 21, 33) vs typed `emit` (line 154). Reactive props destructure (line 147) is correct; `useTemplateRef` N/A here |
| 8 · `verbatimModuleSyntax` | **clean** | `import type { Tag }` (line 144) is the only type-only import and it is correct |

---

# 4. Negative proof — hypotheses I formed, probed, and killed

Recorded in full so the next seat does not re-spend the probes.

**4.1 The mount-time autofill. RETRACTED.** I predicted the field would self-populate on every
open. The arithmetic is worth writing down because it is *almost* right:
`MiniColorPicker`'s refs start `hue=210, sat=0.6, val=0.8` → `currentHex` = `#528fcc`. The
`{immediate:true}` watcher on the `hex` prop (line 110-125) runs during setup with `hex="#4488cc"`
and corrects `sat` to `0.5333/0.8 = 0.6667` — a real change — which makes `currentHex` `#4488cc`, a
different value, which should fire `watch(currentHex, …)` (line 107) and emit `update:hex` at mount,
and the parent's `onPickerHexUpdate` (line 175) writes **both** `pickerHex` *and* `colorText`.
Measured on a fresh open: `{"inputValue": "", "inputPlaceholderShown": true}`. It does not fire.
Independently confirms r2's retraction. **Sound.**

**4.2 The lossy HSV↔hex writeback loop. Mechanism real, hazard does not fire.** This is the one r2
waved past. `SearchFilterBar` **closes a feedback loop**: `MiniColorPicker` emits `update:hex` on
every `currentHex` change (line 107), the parent writes it to `pickerHex` (line 176), and `pickerHex`
is bound straight back into the child as `:hex` (line 68), where the incoming watcher re-derives
`hue/sat/val` from the 8-bit string. That is the exact shape of this repo's documented hazard —
`demo/color-session/useColorPipeline.ts:73-76` ("oklch→HSV loses hue at low chroma
(`atan2(0,0)=0`)") — and the child's guard is far weaker than the repo's cure:
`MiniColorPicker.vue:119` guards only `d === 0` (exact gray), whereas
`demo/color-session/useColorParsing.ts:43` guards the whole low-chroma neighbourhood
(`if (saturation * value > 0.01) stableHue.value = …`).

So I drove it: five instrumented drags across the SV canvas, sampling the thumb and the readout
during and after each (`probeC6-r3.json.dragSamples`).

| drag target | readout | thumb left | thumb top |
|---|---|---|---|
| fx 0.90, fy 0.20 (control) | `#1470cc` | `90%` | `20%` |
| fx 0.02, fy 0.20 (near-gray) | `#c8cacc` | `2.00001%` | `20%` |
| fx 0.90, fy 0.20 (return) | **`#1470cc`** | `90%` | `20%` |
| fx 0.60, fy 0.95 (dark) | `#05090d` | `60%` | `95%` |
| fx 0.60, fy 0.50 | `#335980` | `60%` | `50%` |

The thumb tracks the pointer to five decimals, and the near-gray excursion returns **bit-identical**
(`#1470cc` → `#c8cacc` → `#1470cc`): HSV → RGB8 → HSV is idempotent to within the quantum, so the
loop converges in one pass and the hue survives. No "Maximum recursive updates exceeded" in the
console (only the known dev CORS misconfiguration error). **The loop is a latent coupling, not a
live defect. Recorded as INFO, retracted as a defect.**

**4.3 The unhandled rejection. RETRACTED — but it constrains the C-2 cure.** `applyColorSearch`
(line 213) is `async` with `try`/`finally` and **no `catch`**, so a throw from `hexToOklab` becomes a
rejected promise the `@click`/`@keydown` handlers ignore. I expected it to vanish into
`unhandledrejection`. It does not: Vue wraps template handlers in `callWithAsyncErrorHandling`, which
routes the rejection to the error handler, and `demo/color-picker/ErrorBoundary.vue:59` has an
`onErrorCaptured`. **Nothing is swallowed — which is worse for the cure than it sounds.** Deleting
C-2's regex without adding a `catch` converts "that is not a colour" into an ErrorBoundary teardown
of the Browse pane. **The C-2 cure MUST land the `catch` and the `aria-live` error surface in the
same change.**

**4.4 Nested-layer dismissal. Sound.** `Escape` inside the mini picker closes only the inner layer
and restores focus correctly: `{"wrappers": 1, "svPresent": false, "filterPanelPresent": true,
"activeEl": "BUTTON/Open color picker, current color #335980"}`.

**4.5 Panel legibility over live content. NOT a defect.** The 1× shot in `shots/desktop-light-open.png`
shows page text apparently crisp through the panel, which reads as a contrast failure. Measured:
`backgroundColor: oklab(0.936403 0.00557132 0.0133027 / 0.808)` (80.8% opaque) plus
`backdrop-filter: blur(11px) saturate(1.6)`, and my own 2× capture
(`evidence/C-r3-panel-over-live-text.png`) shows the blur rendering correctly over
"The commons is unreachable." / "Failed to load palettes" / "Retry". The 1× artefact was a capture
resolution effect. **Retracted.**

**4.6 The repo's other named hazards.** No `requestAnimationFrame` (PRM-RAF clean), no WebGL, no
`ValueUnit` wrapping, no `defineModel` in this file (`colorText`, `pickerHex`, `colorSearchActive`,
`miniPickerOpen`, `searching` are plain local refs — the async-round-trip stale-read hazard does not
apply), no timers, no listeners, no observers, nothing owed to `onUnmounted`, no unbounded growth.
The only pointer-capture surface is `MiniColorPicker.vue:129/144`, outside this subject.

**4.7 eslint.** `npx eslint demo/palettes/browser/search/SearchFilterBar.vue` → exit 0, no output
(re-run at `f36f780c`).

---

# 5. Defect ledger

| id | sev | defect | reproduction | origin |
|---|---|---|---|---|
| **C-15** | **BLOCKER** | At `devices["iPhone 14"]` (390×664) — the repo's own certified mobile matrix — the panel is 441.4px against a 359.72px published budget, `max-height:none`, `overflow-y:visible`, no scroll container; the **entire "Find by Color" section is below the fold** and the Search button cannot be resolved for a click. **No fixture, no tags, shipped state.** | `probeC8-r3.json`, `C-r3-trap-mobile-390x664.png` | **NEW (r3)** — escalates r2's fixture-gated C-3 |
| C-1 | **BLOCKER** | Tag checkboxes bound to `:checked`/`@update:checked`; glass-ui 7 exposes `modelValue`/`update:modelValue`. Filters nothing; announces `aria-checked="true"` anyway. 2 of 2 demo sites. | r2 `probeC2.json` + `.d.ts` re-read §2.1 | r2, re-verified |
| C-2 | **BLOCKER** | Every input but `/^#[0-9a-f]{6}$/i` is discarded and `pickerHex` searched instead, reporting success. Edict-2 masking fallback. | r2 `probeC2.json`; **second entry path §1.4** | r2, extended |
| C-3 | **BLOCKER** | Popover has no height contract at any viewport once tags exist; "Clear all filters" fully off-screen at 1440×1000 / 1440×800 / 390×664. Root cause in glass-ui `PopoverContent`. | r2 `probeC4.json` ×3 viewports | r2, subsumed by C-15 |
| **C-16** | MAJOR | `class="w-60 p-0"` — `w-60` wins (240px), **`p-0` is inert** (measured `padding: 20.352px 16px`). 40.7px of block padding the author asked to delete, `divide-y` rules inset 16px, and an edict-5 override that reads as done. | `probeC6-r3.json` `freshOpen`; `C-r3-panel-over-live-text.png` | **NEW (r3)** |
| **C-17** | MAJOR | `hover:shadow-cartoon-md` is a variant Tailwind cannot generate (`.shadow-cartoon-md` is hand-authored in glass-ui); no hover rule is served; measured box-shadow byte-identical at rest and on hover. `transition-shadow` transitions nothing. | `probeC6-r3.json` `swatchHover`; CSSOM scan; grep | **NEW (r3)** |
| **C-18** | MAJOR | Colour filter has no undo: emptying the field leaves badge `1` and the wall filtered; **`Enter` on an empty field performs a search**; the only exit is the partially/wholly off-screen, self-unmounting "Clear all filters". | `probeC7-r3.json`; `probeC8-r3.json` | **NEW (r3)** |
| **C-19** | MAJOR | After a valid-hex search the swatch and its `aria-label` name a different colour than the applied filter (`#ff0000` searched, `current color #4488cc` announced). | `probeC6-r3.json` `afterValidHexSearch` | **NEW (r3)** |
| C-4 | MAJOR | `variant="ghost"` is not a glass-ui 7 Button prop; renders inert while `emphasis` defaults `"secondary"` → filled capsule. 51 `<Button variant>` sites demo-wide. | r2 `probeC1.json`; `.d.ts` re-read §2.2 | r2, re-verified |
| C-5 | MAJOR | `async` with no `await` → `searching` never observable; spinner, `:disabled`, reentrancy guard all dead. | r2: 5 clicks/43ms, spinner never present | r2 |
| C-6 | MAJOR | Clear-all unmounts itself under focus → focus to `<body>` and the whole panel dismisses. | r2 `probeC2.json` `clearAllAfter` | r2 |
| C-7 | MAJOR | **94** spec/test files, 0 references; visual gate never opens the popover (`"dialog": 0` ×4); `strictTemplates` unset, hiding C-1 and C-4 behind one config line. | §2.3; `REPORT.json` | r2, re-counted |
| **C-20** | MINOR | The one hand-written `<button>` has no `type` → `button.type === "submit"`; all five reka siblings + the swatch carry `type="button"`. Inert today (no form ancestor, portalled), latent. | `probeC7-r3.json` `buttonTypes` | **NEW (r3)** |
| **C-21** | MINOR | Latent nameless button: `Loader2`-only content with no accessible name while `searching`. Unreachable **only** because C-5 is broken — curing C-5 alone ships it. | source lines 97-104; `REPORT.json` `namelessButtons: 0` | **NEW (r3)** |
| C-8 | MINOR | Badge count absent from the accessible name (`"Filters"` vs badge `1`); 2 unnamed radiogroups; no `aria-live`; no headings. | §2.4; r2 a11y tree | r2, re-verified |
| **C-22** | INFO | Search button measured 52.6 × **24.0**px — exactly the WCAG 2.5.8 floor, overlapping the field's own lane. | `probeC6-r3.json` `searchBtnRect` | **NEW (r3)** |
| C-9…C-14 | INFO | 16×16 checkbox vs 44×44 radio in a 31px row; `colorSearchActive` duplicates parent state; double clear; no idempotence; `hexToOklab` misnamed with an unreachable branch; inert wrapper / dead `@reference` / mixed emit idiom. | r2 | r2, carried |
| — | INFO | **The parent closes a lossy HSV↔hex writeback loop** (`update:hex` → `pickerHex` → `:hex` → HSV re-derivation) with a `d === 0` guard where the repo's own cure guards `sat*val > 0.01`. Probed with 5 drags: converges, hue survives. Latent coupling only. | §4.2 | **NEW (r3), retracted as a defect** |

---

## Strongest defect

**C-15.** Not because it is the most surprising mechanism — C-1's checkbox, which announces "checked"
to a screen reader while filtering nothing, still holds that title — but because of what it costs and
how little it needs to be true.

It needs **nothing**: no mocked tag list, no admin action, no unusual state. A bare dev server, the
shipped zero-tag catalog, one tap on the ⋮ button, on the exact 390×664 viewport this repo's own
visual audit certified `/#/browse` at four times. And what it costs is the component: "Find by Color"
is the reason `SearchFilterBar` exists, and on a phone it is not on the device. The swatch, the
field, and the Search button render 81.4px past the fold of a panel that declares `max-height: none`
and `overflow-y: visible` while reka hands it `--reka-popper-available-height: 359.72px` on the very
element it sits in.

It also explains the rest of this report. The three gates are green — vue-tsc clean, eslint exit 0,
visual REPORT `"dialog": 0`, 94 spec files with zero references — because **the surface that would
have exposed C-1, C-2, C-16, C-17, C-18 and C-19 is the part that falls off the bottom of the
screen.** Fix the height contract and six other defects become visible to the naked eye on the first
open.

---

## 6. Relay obligations created by this report

Per the standing BH/BI edict, four items are glass-ui-level and must reach the active glass-ui inbox
rather than being patched in `demo/`:

1. **`PopoverContent` has no height contract** (C-15/C-3) — add
   `max-h-[min(var(--reka-popover-content-available-height,80dvh),80dvh)] overflow-y-auto
   overscroll-contain` to the root class list. The Combobox family already ships exactly this idiom.
2. **`PopoverContent` padding cannot be overridden by consumers** (C-16) — `p-0` loses to
   `px-(--overlay-pad-inline)`/`py-(--overlay-pad-block)` while `w-60` beats `w-72` in the same class
   string. Either expose a `pad="none"` variant or document that the pad is not overridable; the
   current behaviour teaches consumers to write code that silently does nothing.
3. **Hand-authored utilities carry no variants** (C-17) — `hover:`/`focus-visible:`/`dark:` on
   `shadow-cartoon-*` (and any other hand-written glass utility) produce no rule at all. Promote them
   into `@theme`, or ship the variants.
4. **7.0.0 shipped no migration note, and no native attribute declarations** (C-4, C-20, C-7) —
   51 `<Button variant>` sites in this repo alone still speak the shadcn-vue vocabulary and fail
   silently; `ButtonProps` declares `type` but defaults it nowhere (reka supplies `type="button"`,
   glass-ui does not); and `InputProps`/`ButtonProps` do not declare their native attr/emit surfaces,
   which is the prerequisite for this repo turning `strictTemplates: true` on. `Checkbox`'s 16px
   control against `RadioGroupItem`'s 44px belongs in the same note.

---

**No source edits land from this seat.** Everything written here lives under
`docs/tranches/V/megatranche/audit/components/SearchFilterBar/`: this report, the r2 archive
(`challenge-C-implementation-r2-32b4040e.md`), `probes/probe-C6-r3.mjs`, `probes/probe-C7-r3.mjs`,
`probes/probe-C8-r3.mjs`, `evidence/probeC6-r3.json`, `evidence/probeC7-r3.json`,
`evidence/probeC8-r3.json`, `evidence/C-r3-panel-over-live-text.png`,
`evidence/C-r3-trap-mobile-390x664.png`, `evidence/C-r3-trap-mobile-390x844.png`,
`evidence/C-r3-trap-laptop-1440x800.png`.
