# CHALLENGE-C · `demo/workbenches/generate/GenerateControls.vue` — implementation audit

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. No inherited or
undeclared seat.

**Run of record:** 2026-07-27, repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`,
HEAD `9bcd5d91` (the seat was briefed against `c654824e`; the two intervening commits are
`docs/tranches/V/**` only and touch nothing in this component's dependency cone).

**Prior-pass note.** A 2026-07-24 CHALLENGE-C pass existed at this path. I did not read it until
after my own findings were fixed, and I preserved it verbatim at
`challenge-C-implementation.2026-07-24-pass.md` in this directory rather than overwrite its
evidence. The two passes were run independently and **converge on the same BLOCKER**; where they
overlap I say so, and §5 records the two facts I took from that pass and then re-verified myself
(O-20's live RED, and CI's e2e gap). Independent convergence on a dead control is worth more than
either report alone.

---

## 0 · Pin verification (coordination boundary)

CARRY-LEDGER §D — **glass BJ W4 / v8 Slider post-cut consumer hold (2026-07-22)** — pins this file at
SHA-256 `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6`.

```
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

**No drift.** No coordination-boundary finding. **No source edit is proposed or landed by this
seat**; every cure is authored as a wave item gated `BLOCKED-ON-GLASS-V8` (§7).

Environment of record: `@mkbabb/glass-ui@7.0.0`, `reka-ui` per lockfile, dev server LIVE at
`http://localhost:9000`, visual REPORT `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}`.

---

## 1 · Verdict

**DEFECTIVE.** The premise holds. The component ships **one entirely dead interactive control** (the
per-swatch copy verb — three of its four bindings are silently discarded by the glass-ui 7.0.0
primitive it mounts), a **second dead control** (the editable plate name, whose value the consumer
drops on save), and **zero accessible representation of its own output**.

The strongest single fact: the component's *only* automated oracle is **currently RED** and **CI
never runs it** — and the red is not about any of the defects above. Every gate that does run
(`lint`, both `vue-tsc` passes, `npm test`, the visual capture) is green over all three defects.

Severity ladder: BLOCKER (a user-facing control does not work) · MAJOR · MINOR · INFO. Hypotheses are
labelled and carry `REPRODUCTION: NONE`.

---

## 2 · BLOCKER

### C-1 · The per-swatch copy verb does not exist. Three of four bindings are discarded.

`GenerateControls.vue:199–208` mounts the palette swatches as:

```vue
<WatercolorDot
    v-for="(css, i) in palette" :key="i"
    :color="css"
    tag="button"                                  ← discarded
    :seed="`gen-${css}-${i}`"
    class="generate-swatch w-9 h-9 … cursor-pointer active:scale-95 … focus-visible:outline-none"
    :aria-label="`Copy ${css}`"                    ← discarded
    @click="copyColor(css)"                        ← discarded
/>
```

**Mechanism.** `WatercolorDot` in glass-ui 7.0.0 declares exactly six props and no emits
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts:23–52`):
`{ color, variant?, animate?, cycleDuration?, range?, seed? }`. There is **no `tag` prop**:

```
$ grep -o "tag" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js | wc -l
       0
```

The compiled component sets `inheritAttrs: false` and hand-forwards **only `class` and `style`** from
`useAttrs()` (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`, `setup` body:
`let … n = h(), c = i(() => n.class), f = i(() => n.style)`), then renders a hardcoded
`<span aria-hidden="true" … style="… pointerEvents:'none' …">`. `tag`, `aria-label` and the `onClick`
listener never reach the DOM — and the element is not hit-testable even if they had.

**Live DOM confirmation** (Playwright against `http://localhost:9000/#/generate`, swatch 0 inside
`[data-generate-plate]`):

```json
{
  "swatchCount": 5,
  "swatch0": {
    "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null, "tabIndex": -1,
    "tagAttr": null, "pointerEvents": "none", "cursor": "pointer", "w": 40, "h": 40,
    "html": "<span data-v-292b9032=\"\" aria-hidden=\"true\" class=\"generate-swatch w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer active:scale-95 transition-transform focus-visible:outline-none watercolor-swatch\" data-testid=\"watercolor-swatch\" data-variant=\"solid\" style=\"background-color: oklch(…"
  },
  "tabbablesInPlate": [
    { "tag": "INPUT",  "label": "Palette name" },
    { "tag": "BUTTON", "label": "Regenerate" },
    { "tag": "BUTTON", "label": "Save palette" },
    { "tag": "BUTTON", "label": "Copy all colors" }
  ]
}
```

Four consequences, each independently a defect:

1. **The click can never land.** `pointer-events: none` is written by the producer into the root
   inline style, and the producer object is second in `normalizeStyle([attrsStyle, ownStyle])`, so it
   wins unconditionally. No pointer, touch, or synthetic click reaches the element.
2. **There is no listener to land on.** `@click` becomes a fallthrough attr; `inheritAttrs:false` plus
   the class/style-only forward drops it. `copyColor()` (`GenerateControls.vue:111–113`) is
   **unreachable dead code**.
3. **Not a button, not focusable.** `tagName === "SPAN"`, `tabIndex === -1`. The plate has exactly
   **4** tabbables; the five swatches contribute **zero**. Keyboard users have no path to the verb.
4. **`cursor: pointer` is a lie in the source** — `class` is one of the two attrs that *do* forward,
   so the component advertises clickability it does not have. (The cursor never actually resolves,
   because `pointer-events:none` removes the element from hit-testing.)

The source comment at `GenerateControls.vue:190–197` asserts the opposite in writing: *"the button
stays the copy-verb seat (`tag="button"`), the dot its organic face"*. That claim is false against
glass-ui 7.0.0. Note the shape of the failure: this is an **API break absorbed silently at the W44
"Glass 7.0.0 adopted whole" landing**, because unknown attributes on a Vue component are legal
fallthrough and therefore invisible to every type and lint gate (see C-5c).

**REPRODUCTION.** `http://localhost:9000/#/generate` → click any swatch in the plate → nothing is
copied, no focus moves, no state changes. Structurally confirmed by the DOM dump above
(span / aria-hidden / pointer-events:none / tabIndex −1 / no aria-label).

**Cure (architectural, not a patch).** The organic dot is a *face*, not a *seat*. The idiomatic
transposition is a real `<button>` seat that **wraps** the dot: the dot stays the decorative
`aria-hidden` child it was built to be, and the button carries the accessible name, the focus
affordance, the ≥24 px target, and the listener. Better still for a 9-consumer species: glass-ui grows
the seat itself — a `WatercolorDotButton`, or an explicit `as`/`tag` + attr-forwarding contract on
`WatercolorDot` so the documented consumer idiom actually works. Both are glass-side or hold-blocked;
see §7. **Do not** "fix" this by deleting the three dead bindings — that retires the verb, not the
defect.

---

## 3 · MAJOR

### C-2 · The plate's editable name is discarded on save. Renaming does nothing.

`GenerateControls.vue:48–50` declares a two-payload emit, and `:102–104` sends both:

```ts
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
function save() { emit("save", [...palette.value], paletteName.value); }
```

The only consumer, `demo/workbenches/generate/GeneratePane.vue:14–20`, declares a **one-parameter**
handler and hardcodes the literal:

```ts
function onSave(colors: string[]) {                       // ← `name` never bound
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
    pm.createPalette("Generated Palette", paletteColors);  // ← literal, not the emitted name
}
```

`createPalette(name, colors)` (`demo/palettes/usePaletteStore.ts:66`) accepts a name; it is available
and ignored. TypeScript raises nothing — a handler with fewer parameters is assignable to a wider
signature, so the drop is structurally invisible to `vue-tsc`.

**Live reproduction** (Playwright, `/#/generate`; native value setter + `input` event so `v-model`
commits, click `[aria-label="Save palette"]`, read `localStorage["color-palettes"]`):

```json
{
  "inputValueAfter": "MY UNIQUE NAME 4711",
  "namesBefore": ["Generated Palette", "Sunset", "A Deliberately Very Long Palette Name…", "Empty Plate", "Overflowing"],
  "namesAfter":  ["Generated Palette", "Generated Palette", "Sunset", "A Deliberately Very Long Palette Name…", "Empty Plate", "Overflowing"]
}
```

The user's name is gone; a second `"Generated Palette"` row appears. The dock-driven save path is the
same drop (`GeneratePane.vue:22–26` re-exposes `save`, which routes through the same emit).

The comment at `GenerateControls.vue:44–47` records that the author knew — *"The pane's
`createPalette` name-wire is its owner's one-liner; … this emit is already truthful."* The emit is
truthful; the wire is not. A user-visible control with no effect is a live defect regardless of which
side owes the one-liner.

**Cure.** Bind the payload at the only site that can: `onSave(colors: string[], name: string)` →
`pm.createPalette(name, paletteColors)`. The structural cure that kills the *class* is to make the
drop unrepresentable — emit a single object payload (`save: [{ colors, name }]`), so ignoring a field
must be explicit rather than a consequence of arity.

### C-3 · The generated palette — the workbench's entire output — has no accessible representation.

Every element carrying colour information in this plate is hidden from assistive technology:

| element | source | AT exposure |
|---|---|---|
| full-bleed specimen strip | `PaletteColorStrip.vue:2–10` — `aria-hidden="true" role="presentation"` | none (deliberate, correct in isolation) |
| the 5–12 swatches | producer hardcodes `aria-hidden="true"`; the `:aria-label="Copy ${css}"` is discarded (C-1) | none |
| preset/harmony preview strips | `PreviewStrip.vue:43` — `aria-hidden="true"` | none (correct — the row has a text name) |
| the count ramp behind the slider | `GenerateControls.vue:293–296` — unlabelled decorative div | none |

Net: a screen-reader user perceives the region *"Generated palette"*, a text field, a badge reading
`5`, three buttons, and `seed: 71f806ff`. **The colours themselves do not exist.**

Compounding it, none of the three verbs announces anything. Live probe of every live region on the
page while operating the plate:

```json
"liveRegions": [ { "role": "alert", "live": null, "text": "dev misconfigured — run `npm run dev`" } ]
```

That is the dev banner. There is **no** `aria-live` for regenerate (the whole palette silently
replaces itself), save (silent — see C-12), or copy. WCAG 4.1.3 Status Messages; 1.1.1 for the colour
content.

**REPRODUCTION.** `/#/generate` with any AT: tab through the plate — 4 stops, none naming a colour;
press Regenerate — nothing announced, and the only changed announceable text is the seed hex.

**Cure.** Strip and dots stay decorative (they are ornament); give the *palette* a text alternative
once, at region level — the `<section>`'s accessible name carrying count + ordered colours, or a
visually-hidden `<ul>` of the css strings that doubles as the keyboard seat for C-1's copy verbs (one
structure, both cures). Add one `role="status"` in the plate that all three verbs write to.

### C-4 · The count slider thumb is 12.7 × 24.3 CSS px — under the 24 px floor, on every matrix.

Live measurement of the count slider's anatomy (`/#/generate`, desktop):

```json
"countSliderRoot": { "tag": "SPAN", "cls": "glass-slider relative w-full", "w": 434.5, "h": 36.9 },
"countSliderDescendants": [
  { "tag": "SPAN", "role": null,     "cls": "slider-track",                   "w": 434.5, "h": 36.9, "ti": -1 },
  { "tag": "SPAN", "role": null,     "cls": "slider-range glass-liquid-fill", "w": 158.5, "h": 28.7, "ti": -1 },
  { "tag": "SPAN", "role": "slider", "cls": "slider-thumb glass-specular-track",
    "w": 12.7, "h": 24.3, "label": "Color count", "ti": 0 }
]
```

This is exactly the row the visual audit already recorded, on **all four** matrices (`REPORT.json`,
`/#/generate`, `probe.a11y.smallTapTargets`):

```json
{ "w": 12, "h": 24, "tag": "span", "label": "Color count" }
```

`/#/generate` reports 5 small tap targets per matrix; **this is the one attributable to
GenerateControls.** The other four — a 160 × 23 unlabelled `input` and three 22 × 22 slug buttons —
belong to the co-mounted Palettes pane and the dock, not here. So this component contributes **4 of
the 60** report-wide small-target defects, and no nameless buttons (`namelessButtons: 0` on the
route).

WCAG 2.5.8 Target Size (Minimum) requires 24 × 24 CSS px; 12.7 fails on the minor axis. The demo's own
O-27 oracle encodes precisely this rule
(`e2e/smoke/oracles/o27-focus-affordance.spec.ts`, BR-3: *"every keyboard/pointer-operable gradient
control's EFFECTIVE target ≥ 24px CSS on fine pointers (WCAG 2.5.8) / ≥ 44px on coarse"*) — but
`openGradient()` (`o27:33–41`) pins the whole spec to the **Gradient** route. The rule exists; this
route is outside its reach (see C-5).

Thumb geometry is producer-owned (`.slider-thumb`, glass-ui), and the same probe measured the
picker's L/A/B/ALPHA channel thumbs at 12 × 24 each — a species-wide producer defect, not a one-off.
Under the BJ W4 hold this is a **relay to glass**, not a demo fix.

### C-5 · The gates are vacuous — and the one real oracle is RED and unrun. Name the mutation.

**(a) The component's only oracle is currently FAILING.** `e2e/smoke/oracles/o20-generate-plate.spec.ts`
is the sole automated coverage of this component. Run at HEAD:

```
$ npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --reporter=line
  1) [smoke] › o20-generate-plate.spec.ts:63:5 › T-17 seed-exact strips: a preset row's stamped
     stops ≡ the palette selecting it yields
     Error: expect(received).toEqual(expected) // deep equality
     - "oklch(85.53637546394% 0.087179123785 49.783647190779deg)",   ← stamped (data-stops)
     + "oklch(0.855364 0.0871791 49.7836)",                          ← live (getComputedStyle)
       … (all five rows differ the same way)
     at e2e/smoke/oracles/o20-generate-plate.spec.ts:105:22
  1 failed
  1 passed (39.2s)
```

Note the *mechanism*: the five colours are numerically **identical** (85.53637546394 % ≡ 0.855364;
49.783647190779deg ≡ 49.7836). The oracle compares the library's `serializeCssColor` output against
the browser's **computed-style** serialization of the same colour — two different string forms of one
value. It is a serialization-form assertion masquerading as a byte-identity law, and it is
browser-version-fragile by construction. So the T-17 truth law it claims to hold is, in practice,
**unguarded**: the property is true (§6) but the oracle proves nothing about it.

**(b) CI never runs it.** `.github/workflows/ci.yml` steps are, in order:

```
$ grep -n "run:" .github/workflows/ci.yml
32: npm ci
33: npm run lint
34: npx vue-tsc -p tsconfig.lib.json --noEmit
35: npx vue-tsc -p tsconfig.demo.json --noEmit
36: npm run build
37: npm test                      ← vitest only
50: node scripts/ci/verify-packed-surface.mjs …
70: npx tsc --noEmit
71: npm test
```

There is no `playwright` / `test:e2e` step in any of the three workflow files
(`ci.yml`, `deploy-pages.yml`, `release.yml`). A red oracle has been sitting red, unobserved.

**(c) Name the mutation.** Even green, O-20 would not catch C-1. Its swatch assertion (`o20:98–105`)
is:

```ts
const live = await plate.locator(".generate-swatch")
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
```

`.generate-swatch` is a **class**, and class is one of the two attrs `WatercolorDot` *does* forward —
so the selector matches the aria-hidden, pointer-events-none span perfectly, and `backgroundColor` is
painted by the producer regardless. **The exact mutation that changes nothing in O-20's result:
delete `tag="button"`, `:aria-label` and `@click` from `GenerateControls.vue:199–208`.** The spec never
asserts a role, an accessible name, focusability, or that clicking copies. Test 1 is a pure
locator/containment assert and is likewise indifferent. That is a vacuous gate over the BLOCKER.

**(d) Zero unit coverage.**

```
$ grep -rln "GenerateControls\|useColorGeneration\|generatePalette\|generateSingleColor" test e2e
e2e/smoke/oracles/o20-generate-plate.spec.ts
```

No test exercises `generatePalette`, `generateHues`, `clampHueToRanges`, or `useColorGeneration`.
`test/preview-chips.test.ts` covers only the **RAMP** sampler (`sampleInterpolationRamp`) used by
gradient/mix — never the **STRIP** path (`presetStops`/`harmonyStops` → `PreviewStrip`) this component
uses, and never `PreviewStrip`'s 7-segment truncation cap (`PreviewStrip.vue:25`), which goes live
whenever `count > 7`.

**(e) `npm run typecheck` — the CI-hard gate (D48/D56) — is green over all of it.**

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?
EXIT=0
$ npx vue-tsc -p tsconfig.demo.json --noEmit --listFiles | grep -i "GenerateControls\|watercolor-dot"
…/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts
…/@mkbabb/glass-ui/dist/watercolor-dot.d.ts
/Users/mkbabb/Programming/value.js/demo/workbenches/generate/GenerateControls.vue
```

Both files are in the program and the checker is silent: unknown attributes are legal fallthrough,
and a narrower emit handler is assignable. **The type system cannot see either defect class.**

**Cure.** One route-parameterised a11y census oracle (O-27's BR-1/BR-3/BR-4 body driven over the route
matrix instead of `openGradient()`) retires C-4's blind spot and would have caught C-1's nameless,
unfocusable seats. Repair O-20's comparison to normalise both sides through one serializer — or, far
better, assert the swatch **role and accessible name** instead of a decorative computed property. And
put e2e in CI, or delete it: an unrun oracle is a liability that manufactures false confidence.

---

## 4 · MINOR

### C-6 · Both clipboard call sites discard a result the producer designed to be read.

`GenerateControls.vue:106–113`:

```ts
async function copyColors() { await writeClipboard(palette.value.join(", ")); }
async function copyColor(css: string) { await writeClipboard(css); }
```

`writeClipboard` returns a discriminated result, not a throw
(`node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts:16–37`):

```ts
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };
/** … Returns the discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy
 *  boolean, for identical call ergonomics: `const { ok } = await writeClipboard(text)`. */
export declare function writeClipboard(text: string): Promise<CopyResult>;
```

Both sites await and throw it away. On Safari permission denial, an insecure context, or the
documented "`writeText` pending forever" platforms the producer explicitly warns about, the user gets
**no signal in either direction** — success and failure are pixel-identical. Combined with C-3 (no live
region), "Copy all colors" is indistinguishable from a no-op. The producer even ships
`useClipboard({ status, copy })` with scope-owned confirmation state for exactly this.

**Cure.** `const { ok } = await writeClipboard(…)` feeding the same `role="status"` seat the C-3 cure
introduces — one status element serving regenerate, save, and both copies.

### C-7 · The dropdown-open cost is 1.3–3.6 ms, not the "sub-millisecond" the comment claims.

`GenerateControls.vue:86–96` asserts: *"Computed only while the SelectContent renders (it unmounts
closed …), so zero rest cost; 10 rows × 5-12 library generations is sub-millisecond."*

Measured in-page against the live dev server (module imported off Vite at
`/@fs/…/demo/color-session/generate-color.ts`, 20 warm-up iterations, `performance.now()`):

```json
{ "onePalette5_ms": 0.1, "presetDropdownOpen_count5_ms": 1.3, "presetDropdownOpen_count12_ms": 3.6 }
```

- **The "zero rest cost" half is TRUE**, and I verified it directly: with both Selects closed,
  `document.querySelectorAll('[data-stops]').length === 0` — reka's `SelectContent` genuinely
  unmounts, so `presetStops`/`harmonyStops` are not evaluated at rest. Credit where due.
- **The "sub-millisecond" half is false by 1.3× to 3.6×.** 3.6 ms of synchronous main-thread work
  lands in the frame that opens the preset menu at `count = 12`, before the harmony menu's own 6 rows.
  Not a stall — but the number in the comment is not the number the machine produces, and the comment
  is load-bearing: it is the stated justification for calling a generator from the template.

These are plain function calls in the template, so the cost re-lands on every re-render while a menu
is open. Nothing currently re-renders the component with a menu open, so I do not raise that as a
separate defect.

### C-8 · The plate-chrome row wraps at the **default desktop** width, not at 390 as documented.

`GenerateControls.vue:138–142`: *"The row WRAPS gracefully: name+count lead, the verb cluster rides
`ml-auto` right — **at 390** the verbs settle onto their own right-aligned line, never a clipped
title."*

`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/generate.png` shows the verb
cluster already on its own second line at desktop, with the title row left holding
`Generated Palette … 5` beside a wide dead gap. Flex base sizes at the measured desktop pane
(content ≈ 437 CSS px): input `basis-[10rem]` = 160, badge ≈ 34, cluster = Regenerate 145 + Save 36 +
Copy 36 + 2 inner gaps = 233, plus 2 row gaps = **443 > 437**. It misses by roughly six pixels, on the
primary layout. The intended one-line composition (*name — count — regenerate — actions*, the whole
point of the F8 hierarchy inversion) therefore **never renders at any viewport**.

Nothing is clipped and nothing overflows (`REPORT.json` `overflowX: 0` on all four matrices), which is
why this is MINOR — but the documented breakpoint is wrong by ~250 px and the composition the comment
defends does not exist.

### C-9 · The editable name's only affordance is `hover:`, which does not exist on touch.

`GenerateControls.vue:144–149` — the name input is `bg-transparent`, borderless, and its sole rest
affordance is `hover:underline decoration-dashed underline-offset-4`. Coarse pointers have no hover
state, so the field is visually indistinguishable from a heading:
`shots/safari-mobile-dark/generate.png` shows "Generated Palette" reading as plate title with zero
field affordance. There is also no `placeholder`, so a user who clears the name is left with an
invisible, empty, unlabelled control — and (per C-2) a save that ignores the value anyway.

**Cure.** A rest-state affordance that is not hover-gated (the card family's dashed underline shown at
rest, or `@media (hover: none)` restoring it), plus a placeholder.

---

## 5 · INFO / hypotheses (labelled — no reproduction from the shipped UI)

### C-10 · `as PresetName` / `as HarmonyName` launder `null`. **REPRODUCTION: NONE.**

`GenerateControls.vue:75–81`:

```ts
function onPresetChange(value: AcceptableValue) { preset.value = value as PresetName; }
function onHarmonyChange(value: AcceptableValue) { harmony.value = value as HarmonyName; }
```

`AcceptableValue` includes `null` (`node_modules/reka-ui/dist/index3.d.cts:231`:
`type AcceptableValue = string | number | bigint | Record<string, any> | null`). A `null` cast into
`PresetName` makes `GENERATION_PRESETS[preset]` `undefined`
(`demo/color-session/generate-color.ts:220`), and `p.l[0]` at line 227 a `TypeError` thrown from
inside the `palette` computed **during render** — the repo's known render-crash shape (blank pane).
The cast is exactly the "masking" idiom the owner edicts forbid.

I found no path in the shipped UI that makes reka emit `null` here (no clear affordance is wired), so
this is a **hypothesis**, not a live crash. It remains an unguarded narrowing on an untrusted
boundary. Cure: a membership check (`if (!isPresetName(value)) return;`) instead of a cast — the shape
`PRESET_NAMES` already affords.

### C-11 · `generatePalette` count-domain behaviour. **REPRODUCTION: NONE (slider clamps 1..12).**

Measured on the live module:

```json
"domain": { "zero": {"len":0}, "one": {"len":1,"first":"oklch(62.67% 0.207 352.70deg)"},
            "neg": {"len":0}, "nan": {"len":0},
            "inf": {"threw":"RangeError: Invalid array length"}, "frac": {"len":3} }
```

`0 / -1 / NaN` silently yield `[]`; `Infinity` throws `RangeError`; `2.5` yields **3** colours
(`generateHues` loops `i < count`). Unreachable today — the slider is `:min="1" :max="12" :step="1"`
(`GenerateControls.vue:301–303`) and `count` is not on `defineExpose`. `countSliderGradient` does
defend the empty case correctly (`:66–68` → `"var(--muted)"`). Latent only; recorded because the
function is exported from the shared colour layer and consumed elsewhere
(`demo/color-session/useColorParsing.ts`).

Related latent: `clampHueToRanges` (`generate-color.ts:156–184`) carries a wrapping-range branch
(`lo > hi`, lines 165–167) whose companion span arithmetic at line 171 would compute a **negative**
span. No shipped preset uses a wrapping range (`warm` is `[[0,80],[330,360]]` — two ascending
segments), so the branch is dead. Dead-but-wrong arithmetic in a shared primitive with no unit test.

### C-12 · Repeated save silently mints duplicates.

From the C-2 reproduction: two `"Generated Palette"` rows after one click, with no confirmation, no
duplicate check, and no undo. Given C-3 (no live region) the user has no way to know whether the first
click registered — which invites exactly this. INFO because the dedupe policy is the store's, not this
component's; the missing feedback *is* this component's.

---

## 6 · What is sound — the negative proof

The premise says the implementation is defective. It is. But the following hazards were checked and
are **genuinely absent**; a challenge seat is not free to invent them.

- **No ungated rAF (the PRM-RAF epidemic).** The component starts no loop. `WatercolorDot` is mounted
  without `animate`, which defaults `false`; the compiled `useWatercolorBlob`
  (`dist/watercolor-dot.js`) returns **before** registering its rAF — `if (l.value = …, !a) return
  { borderRadius: l, transform: u }` precedes the `t(e => g(e.now), …)` registration. Even when armed,
  that loop declares `{ pauseWhenHidden: true, respectReducedMotion: true }`. Clean on both counts.
- **Nothing to clean up.** No listeners, observers, timers, subscriptions, or imperative DOM. The only
  async is the two clipboard awaits (C-6). No leak surface and no unbounded growth: `palette` is a
  `computed` over four refs; `stripColors` and `countSliderGradient` derive from it.
- **No `defineModel` stale-read hazard.** The component uses none; `useColorGeneration` returns plain
  `ref`s and is called once in `setup`. The one `v-model` is on a native `<input>` bound to a local
  `ref` — the synchronous-cache shape the repo's record prescribes.
- **No `ValueUnit` nesting, no oklch→HSV roundtrip / `stableHue` exposure, no WebGL, no reka slider
  pointer-capture surface owned here.** This component touches none of those subsystems.
- **No `parseCssColor` crash surface.** The component parses nothing; it only *emits* CSS strings the
  library serialized. `generatedCss` (`generate-color.ts:235–243`) goes
  `oklch → mapColorToGamut → serializeCssColor` and checks `.ok` on all three.
- **The T-17 seed-exactness law genuinely holds** — even though its oracle does not prove it (C-5a).
  `presetStops(c)` is `generatePalette(count, c, harmony, seed)`; selecting `c` computes
  `generatePalette(count, preset=c, harmony, seed)`. Same pure function, same arguments, mulberry32
  deterministic (`demo/color-session/prng.ts`). Identical by construction — the O-20 failure is a
  string-form artefact, and the five values in its diff are numerically equal. The strips do not lie.
- **The "zero rest cost" claim holds** (verified: `[data-stops] === 0` with the menus closed). Only the
  "sub-millisecond" half is wrong (C-7).
- **`verbatimModuleSyntax` (edict 8): clean.** All four type-only imports are `import type` (`:21`,
  `:32`, `:33`, plus the composable's `:15–18`).
- **No god module (edict 1); no legacy shims, aliases, dual paths or back-compat (edict 2); no
  contrived shared dirs or wrapper components (edict 3); no deleted animations (edict 6).** 312 lines,
  one responsibility, one composable, one pure core imported up-from-shared.
- **Edict 5 (root-level styling) is NOT violated by `--slider-track-bg`.** The inline
  `:style="{ '--slider-track-bg': 'transparent' }"` (`:305`) sets a **producer-sanctioned token**, not
  a per-instance property override — glass-ui's own CSS reads it with a fallback
  (`grep -o -- "--slider-track-bg[^;)]*" glass-ui.css` → `--slider-track-bg,var(--muted-medium`,
  `--slider-track-bg,var(--secondary`). The BJ W4 hold plans to rename this very seam at v8. Correct
  as written.
- **Route-clobber during probing is NOT this component's.** Direct `#/generate` navigation
  intermittently rewrote itself to `#/palettes?space=rgb&color=rgb(255+0+0)` mid-probe — the colour-URL
  sync writing the hash and taking the route path with it. Recorded here only as a probe hazard and a
  lead for the routing seat; I pinned the hash to work around it rather than attribute it to this
  component.

---

## 7 · The wave — BLOCKED-ON-GLASS-V8

Per the seat's standing law and CARRY-LEDGER §D, **no consumer edit to `GenerateControls.vue` is
proposed or authorized.** The wave is authored blocked, with its release condition stated exactly.

**Wave `V·MT-WB-GEN-1` — the dead copy-verb + swatch a11y cure. Status: BLOCKED-ON-GLASS-V8.**

Scope, when unblocked: **C-1** (real button seat + accessible name + focus affordance + ≥24 px target
for the swatch copy verb), **C-3** (region-level text alternative + one `role="status"` seat),
**C-6** (read the `writeClipboard` result into that status seat), **C-9** (non-hover-gated name
affordance).

**Release condition, quoted from the hold** (`docs/tranches/V/reformation/CARRY-LEDGER.md:55–80`,
*glass BJ W4 / v8 Slider post-cut consumer hold, 2026-07-22*):

> Against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`, hold all consumer edits and the
> `@mkbabb/glass-ui` pin until **one unique immutable v8 candidate proves exact
> source→built→packed→installed→served equality, is neither a workspace/source link nor mutable v7,
> and survives two unchanged-byte Sol critics.** Then migrate only the property name to the
> inheriting CSS-`background` seam `--glass-slider-track-background` in the four pinned receivers …
> `GenerateControls.vue` (`4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6`).
> … add no `--track-bg`, v7 alias, copied CSS or local mask.

So: **the wave lands only after Glass 8 proves source-to-served identity and clears the two
unchanged-byte Sol critics.** Until then this file is byte-frozen at `4f95c57c…`.

**Two items do not wait on that gate — producer relays, not edits:**

- **R-1 → the glass BH inbox** (the standing BH/BI relay fond). `WatercolorDot` has no operable-seat
  contract: it hardcodes `aria-hidden="true"` and `pointer-events:none`, sets `inheritAttrs:false`,
  forwards only `class`/`style`, declares no `tag`/`as` prop and no emits — so **every** consumer that
  tries to make a dot clickable silently ships a dead control. Nine consumers use this species. Ask for
  a `WatercolorDotButton` seat, or an explicit documented "decorative-only, wrap it yourself" contract.
  Cite this file as the live casualty and C-1's DOM dump as the receipt.
- **R-2 → the glass BH inbox.** `.slider-thumb` measures **12.7 × 24.3** CSS px across the slider family
  (count slider here; L/A/B/ALPHA channel thumbs on the picker), failing WCAG 2.5.8 on the minor axis.
  The demo's own O-27 BR-3 already encodes the ≥24 / ≥44 rule. Producer-side hit-inflation, please.

**Three gate repairs are demo-side and touch no pinned consumer** — they may proceed independently,
and they are what turn C-1 and C-4 from silent into born-RED:

1. Generalise `o27-focus-affordance.spec.ts` from `openGradient()` to the route matrix.
2. Repair O-20's comparison (normalise both sides through one serializer) **and** replace its
   `backgroundColor` swatch assertion with role + accessible-name assertions.
3. Put `test:e2e` in `.github/workflows/ci.yml`, or delete the suite. An unrun oracle manufactures
   false confidence — which is precisely how a 7.0.0 API break reached the shipped plate.

---

## 8 · Evidence index

| # | Kind | Location / command |
|---|---|---|
| E1 | pin | `shasum -a 256 demo/workbenches/generate/GenerateControls.vue` → `4f95c57c…` (no drift) |
| E2 | source | `demo/workbenches/generate/GenerateControls.vue:199–208` (the four swatch bindings) |
| E3 | producer source | `…/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts:23–52` (6 props, no `tag`, no emits) |
| E4 | producer source | `…/glass-ui/dist/watercolor-dot.js` (`inheritAttrs:!1`; class/style-only forward; `aria-hidden:"true"`; `pointerEvents:"none"`) |
| E5 | command | `grep -o "tag" …/watercolor-dot.js \| wc -l` → `0` |
| E6 | live DOM | swatch 0 = `SPAN`, `aria-hidden=true`, `aria-label=null`, `tabIndex=-1`, `pointer-events:none`; 4 tabbables in plate |
| E7 | source | `demo/workbenches/generate/GeneratePane.vue:14`, `:19`; `demo/palettes/usePaletteStore.ts:66` |
| E8 | live repro | name `"MY UNIQUE NAME 4711"` → saved as `"Generated Palette"` (localStorage `color-palettes`) |
| E9 | live measure | count-slider thumb `12.7 × 24.3`, `role="slider"`, `aria-label="Color count"` |
| E10 | report | `REPORT.json` `/#/generate` → `{"w":12,"h":24,"tag":"span","label":"Color count"}` × 4 matrices; `smallTapTargets: 5`/matrix; `namelessButtons: 0`; `overflowX: 0`; `pageErrors: 0`; `consoleErrors: 0` |
| E11 | command | `npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --reporter=line` → **1 failed, 1 passed**, `o20:105` serialization-form mismatch |
| E12 | command | `grep -n "run:" .github/workflows/ci.yml` → no playwright/e2e step in any of the 3 workflows |
| E13 | command | `grep -rln "GenerateControls\|useColorGeneration\|generatePalette\|generateSingleColor" test e2e` → only `o20-generate-plate.spec.ts` |
| E14 | command | `npx vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`; `--listFiles` confirms both files in the program |
| E15 | live measure | `onePalette5 = 0.1 ms`; preset menu open `1.3 ms` (count 5) / `3.6 ms` (count 12); `[data-stops] = 0` while closed |
| E16 | producer API | `…/dist/composables/dom/useClipboard.d.ts:16–37` (`CopyResult`, discarded at `GenerateControls.vue:107`, `:112`) |
| E17 | live probe | only live region on page = `role="alert"` "dev misconfigured" (no status seat) |
| E18 | screenshot | `shots/safari-desktop-light/generate.png` (verb cluster wrapped at desktop); `shots/safari-mobile-dark/generate.png` (name field has no touch affordance) |
| E19 | types | `node_modules/reka-ui/dist/index3.d.cts:231` — `AcceptableValue` includes `null` |
| E20 | live measure | `generatePalette` domain: `0/-1/NaN → []`, `Infinity → RangeError`, `2.5 → 3` |
| E21 | hold text | `docs/tranches/V/reformation/CARRY-LEDGER.md:55–80` |
| E22 | oracle scope | `e2e/smoke/oracles/o27-focus-affordance.spec.ts:33–41` (`openGradient()` — Gradient route only) |
| E23 | prior pass | `challenge-C-implementation.2026-07-24-pass.md` (preserved verbatim; independent convergence on C-1) |
