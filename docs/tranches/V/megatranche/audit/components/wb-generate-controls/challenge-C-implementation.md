# CHALLENGE-C — `demo/workbenches/generate/GenerateControls.vue` — implementation audit

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. The declaration is honoured; the seat is not inherited or undeclared.

---

## Subject, pin, and boundary

| item | value |
|---|---|
| subject | `demo/workbenches/generate/GenerateControls.vue` (311 lines) |
| repo / branch / HEAD | `/Users/mkbabb/Programming/value.js` · `tranche-u` · `c654824e` |
| pinned SHA-256 (CARRY-LEDGER §D, glass BJ W4 hold) | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| **measured SHA-256** | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| drift | **NONE — hash matches the pin exactly.** No coordination-boundary finding. |

```
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

`docs/tranches/V/reformation/CARRY-LEDGER.md:55–80` holds **all consumer edits** to this file
until Glass 8 proves source→built→packed→installed→served equality. **No source edit is proposed
or landed by this seat.** Every cure below is authored as a *wave item*, gated
`BLOCKED-ON-GLASS-V8` (§ "The wave", at the end).

## Method

- Full read of the component, its composable, its pure core, its two ancestors
  (`GeneratePane.vue`, `usePaneRouter.ts`), its children (`PreviewStrip`, `PaletteColorStrip`),
  and the glass-ui 7.0.0 dist for every primitive it instantiates.
- SFC compiled with `vue/compiler-sfc` to read binding types out of the real render function.
- Live DOM probes against the running dev server at `http://localhost:9000/#/generate` (Chromium).
- The pure core bundled with esbuild and executed in node for timing + boundary values.
- `docs/tranches/V/megatranche/audit/visual/REPORT.json` rows + both Safari screenshots read.
- **The component's only automated oracle executed end-to-end** (`npx playwright test`).

## Verdict

**DEFECTIVE.** Two BLOCKERs, five MAJORs. The single strongest defect: the five colour swatches —
the plate's documented "one direct verb" — render as `<span aria-hidden="true">` with
`pointer-events: none` and **zero attached event listeners**. Per-swatch copy is not slow, not
flaky: it is *entirely absent from the shipped build*, and the generated palette is invisible to
assistive technology. This is a `@mkbabb/glass-ui@7.0.0` API break that the W44 adoption commit
(`f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface`) did not
catch, because nothing in this repository can catch it: the component's only test is red and CI
never runs it.

---

# Findings

## D1 · BLOCKER — the five swatches are inert `aria-hidden` spans; `copyColor` is unreachable

`GenerateControls.vue:199–208` renders the specimen swatches as:

```vue
<WatercolorDot
    v-for="(css, i) in palette" :key="i" :color="css"
    tag="button"                              <!-- ← not a prop in glass-ui 7.0.0 -->
    :seed="`gen-${css}-${i}`"
    class="generate-swatch w-9 h-9 … cursor-pointer active:scale-95 …"
    :aria-label="`Copy ${css}`"               <!-- ← dropped -->
    @click="copyColor(css)"                   <!-- ← dropped -->
/>
```

Glass-ui 7.0.0's `WatercolorDot` (`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`)
declares exactly five props — `color`, `variant`, `animate`, `cycleDuration`, `range`, `seed`.
**There is no `tag` prop.** The implementation
(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`) sets `inheritAttrs: !1`, forwards only
`class` and `style` off `useAttrs()`, hardcodes the element to `"span"`, and stamps
`"aria-hidden": "true"` plus inline `pointerEvents: "none"` on the root:

```js
inheritAttrs: !1, __name: "WatercolorDot",
props: { color: {}, variant: { default: "solid" }, animate: {…}, cycleDuration: {…}, range: {…}, seed: { default: "" } },
setup(e) { let t = e, n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style); …
  return (t, n) => (d(), o("span", { "aria-hidden": "true", class: l([c.value, "watercolor-swatch", …]),
    style: u([f.value, { backgroundColor: …, pointerEvents: "none", … }]) }, …
```

`inheritAttrs: false` + a setup that reads only `class`/`style` means `onClick` and `aria-label`
never reach the DOM.

**Reproduction — measured live, `http://localhost:9000/#/generate`, Chromium:**

```js
[...document.querySelectorAll('[data-generate-plate] .generate-swatch')]
  .map(el => ({tag: el.tagName, ariaHidden: el.getAttribute('aria-hidden'),
               ariaLabel: el.getAttribute('aria-label'), tagAttr: el.getAttribute('tag'),
               pointerEvents: getComputedStyle(el).pointerEvents, tabIndex: el.tabIndex,
               vueListeners: Object.keys(el._vei || {})}))
```

```json
{ "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null, "tagAttr": null,
  "pointerEvents": "none", "tabIndex": -1, "vueListeners": [] }
```

`vueListeners: []` is the proof — Vue attached **no** DOM handler. `sw.focus()` then
`document.activeElement === sw` returns `false`: the swatch cannot be reached by pointer, by
keyboard, or by AT.

**Consequences, all live:**

1. Clicking a swatch does nothing. `copyColor()` (`:111–113`) is dead code.
2. `cursor-pointer` and `active:scale-95` are still applied (the `class` attr *is* forwarded), so
   the swatch **advertises an affordance it does not have** — a lie in the interface.
3. `PaletteColorStrip` is itself `aria-hidden="true" role="presentation"`
   (`demo/palettes/browser/card/PaletteColorStrip.vue:3–4`). With the dots also `aria-hidden`
   and no `aria-label` surviving, **there is no textual representation of the generated colours
   anywhere in the plate.** A screen-reader user hears: name field, "5", Regenerate, Save
   palette, Copy all colors, "seed: 71f806ff", Preset Vibrant, Harmony Golden, slider 5. They can
   never learn what the palette *is*. WCAG 1.1.1 (Non-text Content) failure on the component's
   primary output.
4. The elaborate `focus-visible:outline-none` / T-28 outline-law comment at `:190–197` reasons
   about a focus ring for an element that can never receive focus.

**Family:** the same dead `tag="button"` seat exists at `demo/workbenches/mix/MixSourceSelector.vue:168,215`
and `demo/palettes/browser/card/CurrentPaletteEditor.vue:98`. `tag="div"` sites (Dock, EmptyState,
ColorSpaceSelector, ImageEyedropper, ConsoleRail, MixResultDisplay) are cosmetically harmless
because the component already renders a span, but they are the same unremoved v6 prop.

**Cure (mechanism, not patch):** the glass-7 dot is a *face*, not a *seat*. The verb must be its
own element: wrap the dot in a real `<button type="button" :aria-label="…">` that owns the click,
the accessible name and the focus ring, with the `<WatercolorDot>` as its (already
`aria-hidden`) child. That restores the copy verb, the accessible name, and keyboard operability
in one move without any per-instance styling. **BLOCKED-ON-GLASS-V8.**

---

## D2 · BLOCKER — the component's only oracle is RED, and CI never runs it

`e2e/smoke/oracles/o20-generate-plate.spec.ts` is the *sole* automated coverage of this component
(`grep -rn "GenerateControls\|useColorGeneration" demo test e2e src` → the pane import and this
spec; `demo/test/` contains only `glass/aurora-*.test.ts` and `export/byte-exact.test.ts`).

**Leg 1 — the oracle fails.** Executed:

```
$ npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --project=smoke --reporter=line
  1) e2e/smoke/oracles/o20-generate-plate.spec.ts:63:5 › T-17 seed-exact strips …
    Error: expect(received).toEqual(expected) // deep equality
    - Expected  - 5
    + Received  + 5
      Array [
    -   "oklch(83.354120947421% 0.092693861504 333.865397069603deg)",
    -   "oklch(90.224193104543% 0.078208583617 111.373161119641deg)",
    …
    +   "oklch(0.833541 0.0926939 333.865)",
    +   "oklch(0.902242 0.0782086 111.373)",
    …
      at e2e/smoke/oracles/o20-generate-plate.spec.ts:105:22
  1 failed
  1 passed (38.1s)
```

The mechanism: `data-stops` stamps the **raw** `serializeCssColor` output
(`demo/color-session/color-chips/sample.ts:88`, `generate-color.ts:240`) — percentage lightness,
`deg` hue — while the assertion reads `getComputedStyle(el).backgroundColor`, which the engine
normalises to unitless-L, no-`deg` `oklch()`. The two encodings can never be equal. The spec's own
comment (`:17`) even asserts they are "the same rgb() strings"; neither side is `rgb()`. The
"seed-exact truth law" this oracle exists to enforce is *unenforced*.

**Leg 2 — CI never runs it.**

```
$ grep -rn "playwright test\|e2e" .github/workflows/*.yml
(no output)
$ node -e "console.log(require('./package.json').scripts.test)"      → vitest run
$ node -e "console.log(require('./package.json').scripts['test:e2e'])" → playwright test
```

`.github/workflows/ci.yml` runs `lint`, two `vue-tsc` passes, `build`, `npm test` (vitest only)
and the packed-surface verifier. `test:e2e` is never invoked by any workflow. A red oracle has
been sitting red, unobserved.

**Leg 3 — the surviving test is vacuous.** Test 1 (`:22–61`) asserts only: the plate is visible;
a "Regenerate" button exists inside it; page-count ≡ plate-count for that name; a `seed: [0-9a-f]{8}`
label exists; Save/Copy buttons are visible; the seed text changes after a click. **Named mutations
that keep it green:** make `save()` a no-op; make `copyColors()` a no-op; delete `paletteName` and
the whole emit; break the count slider entirely; break the harmony `<Select>`; render every swatch
as an inert `aria-hidden` span *(this is what actually shipped — D1)*; drop the `variant` register
on all three buttons *(also shipped — D4)*. Its "the orphan row is dead" clause
(`:38–40`) is additionally vacuous by construction: `usePaneRouter.ts:196` registers a **second**
"Regenerate" command in the dock action menu, which the count only misses because the menu is
closed at assert time.

**Cure:** (a) assert on the *stamped* encoding parsed through the app's own parser, or stamp the
computed encoding — one serialization, both sides; (b) wire `test:e2e` into `ci.yml`; (c) add the
missing behavioural legs (swatch click copies; Save carries the typed name; the count slider moves
the palette). **BLOCKED-ON-GLASS-V8 for (a)/(c) if they require touching the component; (b) is a
CI-only change outside the hold.**

---

## D3 · MAJOR — the plate's editable name is discarded at the emit seam; the UI lies

`GenerateControls.vue:44–50` declares, with a comment insisting the wiring is truthful:

```ts
// T.W6 · W6-5 (T-16/F2): the save carries the plate's own name … this emit is already truthful.
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
```

`:102–104` honours it: `emit("save", [...palette.value], paletteName.value)`.
The consumer does not:

```ts
// demo/workbenches/generate/GeneratePane.vue:14–20
function onSave(colors: string[]) {                       // ← `name` never declared
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
    pm.createPalette("Generated Palette", paletteColors); // ← hardcoded literal
}
```

TypeScript cannot catch this: a handler with fewer parameters is assignable.

**Reproduction — live, measured:** typed `MY CUSTOM NAME` into the plate title via a native
`input` event, clicked "Save palette", read the Palettes pane:

```
inputValueAfterRename: "MY CUSTOM NAME"
bodyTextAfterSave:  "… My Palettes 2 (2 saved) … Generated Palette 5   Generated Palette 5"
```

The plate reads `MY CUSTOM NAME`; the saved palette reads `Generated Palette`. The rename control
is decorative — an editable field wired to nothing, which is worse than no field.

**Cure:** consume the second emit argument (`function onSave(colors: string[], name: string)`);
guard the empty string at the emit site rather than at the sink. **BLOCKED-ON-GLASS-V8** (the
component side); the pane is not itself under the §D pin but the pair must land together.

---

## D4 · MAJOR — `variant` is not a glass-ui 7.0.0 `Button` prop; all three verbs render identically

`:158`, `:167`, `:176` pass `variant="primary-audacious"` and `variant="ghost"`. Glass-ui 7.0.0's
`ButtonProps` (`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts`) is:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  type?: …;  disabled?: …;  class?: …;
}
```

There is no `variant`. `grep -rl "primary-audacious" node_modules/@mkbabb/glass-ui/dist --include="*.js"`
returns **nothing** — the token does not exist anywhere in the design system. `variant` therefore
falls through `$attrs` onto the DOM as a nonsense HTML attribute, and every button renders at the
prop default `emphasis="secondary" tone="neutral"`.

**Reproduction — live DOM, all three plate buttons:**

```
Regenerate   data-emphasis=secondary data-tone=neutral data-size=md
             class="button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover …"
             variant=primary-audacious              ← raw junk attribute
Save palette data-emphasis=secondary data-size=sm data-icon-only=true
             class="… glass-wash glass-capsule glass-capsule-hover …"  variant=ghost
Copy colors  data-emphasis=secondary data-size=sm data-icon-only=true
             class="… glass-wash glass-capsule glass-capsule-hover …"  variant=ghost
```

The `glass-wash glass-capsule` classes are applied by glass-ui *only* when
`tone==="neutral" && (emphasis==="primary"||"secondary")` — a genuine `ghost`/`quiet` icon button
would carry none of them.

**Visual confirmation** — `audit/visual/shots/safari-desktop-light/generate.png` and
`safari-mobile-dark/generate.png`: "Regenerate" and the two icon buttons render in the *same*
pale capsule register. The comment at `:153–155` claims Regenerate "rides the deliberate-primary
register (L6 rider)". It does not. Compare the dock's real primary "Login" pill in the same
screenshot — that is what primary looks like here.

**Scale:** `grep -rln 'variant="ghost"\|variant="primary\|variant="outline"\|variant="destructive"' demo --include="*.vue"`
→ **27 files**; `grep -rn 'emphasis=' demo --include="*.vue"` → **2 occurrences**. The W44 glass-7
adoption migrated the package pin but not the Button emphasis axis. This component is one site of
a demo-wide flattening.

**Cure:** `emphasis="primary"` on Regenerate, `emphasis="quiet"` (or `"text"`) on the two icon
buttons. `variant` is deleted, not aliased (edict 2). Structurally, an eslint rule or a
`vue-tsc`-visible wrapper would be needed to make unknown component attributes an error — Vue's
fallthrough semantics mean the type system cannot. **BLOCKED-ON-GLASS-V8.**

*Note:* `Slider variant="spectrum"` (`:299`) and `Badge variant="secondary"` (`:150`) **are** valid
— `SliderVariant = "standard" | "spectrum"` (`dist/components/slider/types.d.ts:4`), `BadgeVariants`
carries `variant`. Only `Button` lost the axis.

---

## D5 · MAJOR — the clipboard `Result` is discarded; the component gives no feedback on any async verb

```ts
// :106–113
async function copyColors() { await writeClipboard(palette.value.join(", ")); }
async function copyColor(css: string) { await writeClipboard(css); }
```

`writeClipboard`'s contract (`node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts`):

```ts
export type CopyResult = { ok: true } | { ok: false; reason: "clipboard-api" | "no-api" };
/** … Returns the discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy
 *  boolean, for identical call ergonomics: `const { ok } = await writeClipboard(text)`. */
export declare function writeClipboard(text: string): Promise<CopyResult>;
```

The design system went out of its way to make failure *impossible to ignore by accident*, and both
call sites ignore it. A `no-api` failure (insecure origin — the demo is served over LAN HTTP with
`server.host: true` for device testing, and the deployment lives under
`mbabb.fi.ncsu.edu/colors/`) is swallowed silently: the user believes the copy succeeded.

Symmetrically, **there is no success feedback either.** `grep -rn "aria-live\|role=\"status\"\|toast" demo/workbenches/generate/` → no matches. Glass-ui exports both `useClipboard` (with a
`status: "idle"|"pending"|"success"|"failure"` ref designed for exactly this) and `toast`; neither
is used. The live save probe (D3) confirms: clicking Save produced no announcement, no toast, no
DOM change inside the plate — the palette silently materialised in a *different pane*.

`writeClipboard` returns a `Result` and never rejects, so there is no unhandled-rejection hazard —
the defect is purely the dropped failure channel plus the absent live region.

**Cure:** route both verbs through `useClipboard()` and bind its `status` to a single
`aria-live="polite"` region in the plate (one region, both verbs, no per-instance chrome).
**BLOCKED-ON-GLASS-V8.**

---

## D6 · MAJOR — two unchecked `AcceptableValue` casts, with asymmetric failure modes: one crashes the render, one silently empties the palette

```ts
// :75–81
function onPresetChange(value: AcceptableValue) { preset.value = value as PresetName; }
function onHarmonyChange(value: AcceptableValue) { harmony.value = value as HarmonyName; }
```

`AcceptableValue` (reka-ui) admits `string | number | bigint | Record<string, any> | null`. Both
casts are unvalidated, and the two downstream paths fail in *different* ways. Measured, by
executing the bundled pure core in node:

```
$ node scratchpad/probe.mjs
invalid preset  -> THREW TypeError: Cannot read properties of undefined (reading 'l')
invalid harmony -> array len 0
count 0         -> array len 0
count -1        -> array len 0
count 1.5       -> array len 2  first=oklch(55.068393029505% 0.105051596247 225.746618611738deg)
count NaN       -> array len 0
```

- **Invalid preset → render crash.** `generate-color.ts:220` does `const p = GENERATION_PRESETS[preset]`
  with no guard; `:227` dereferences `p.l[0]`. The throw happens *inside the `palette` computed*
  (`useColorGeneration.ts:26–28`), which is read by the render function — so it escalates to a
  Vue render error and blanks the pane. This is the same shipped-blank class the tranche record
  already carries.
- **Invalid harmony → silent empty palette.** `generateHues` (`:101–146`) has a `switch` with **no
  `default`** and returns `[]`. The strip vanishes, the swatches vanish, `countSliderGradient`
  falls back to `var(--muted)`, and `save()` at `:103` emits `[]` — **the plate cheerfully saves an
  empty palette**, with no guard at either end.
- `count 1.5` yields 2 colours while the badge and the slider label both display `1.5`. Not
  reachable through the `:step="1"` slider, but `count` is a public ref on the composable's
  returned surface.

Reachability of a non-`PresetName` value through reka-ui is a **HYPOTHESIS** (I did not force
reka-ui to emit `null`); the crash *mechanism* is CONFIRMED by execution above.

**Cure:** validate at the boundary against the exported `PRESET_NAMES` / `HARMONY_NAMES` arrays and
ignore anything else — one narrow function per select, no cast. In the core, `generateHues` gets an
exhaustive `switch` (`never` check) and `generatePalette` a preset lookup that cannot return
`undefined`. **BLOCKED-ON-GLASS-V8** for the component; the core (`demo/color-session/generate-color.ts`)
is not under the §D pin but is still a `demo/` edit this formation may not land.

---

## D7 · MAJOR — the plate chrome row wraps at 1440 px desktop, by 3 px; the component's own comment says it wraps "at 390"

`:138–142`:

> The row **WRAPS gracefully**: name+count lead, the verb cluster rides `ml-auto` right — **at 390**
> the verbs settle onto their own right-aligned line, never a clipped title.

**Measured at the audit's own desktop matrix** (`audit/visual/capture.mjs:45` — `viewport: {width: 1440, height: 900}`),
live:

```json
{ "innerW": 1440, "plateW": 462, "rowContentW": 436,
  "input":   {"x":237,"y":363,"w":398,"h":31},
  "badge":   {"x":643,"y":365,"w":30,"h":26},
  "cluster": {"x":440,"y":399,"w":233,"h":40},
  "wrapped": true }
```

The verb cluster sits 36 px *below* the input — it wrapped. Mechanism, precisely: `flex-wrap: wrap`
performs line-breaking on **hypothetical main sizes (flex-basis)**, *before* `flex-1` shrinking is
applied. The input carries `basis-[10rem]` = 160 px (`:148`), so the line's hypothetical sum is
`160 + 30 (badge) + 233 (cluster) + 2×8 (gap) = 439 px` against `436 px` of content box —
**over by 3 px**, so the line breaks even though the input could shrink trivially to fit.

**Visible consequence** (`shots/safari-desktop-light/generate.png`, `shots/safari-mobile-dark/generate.png`):
the count badge `5` is flung to the far right edge of line 1, orphaned from any label, and the
plate grows ~40 px taller than designed at every width down from ~1500 px.

**Cure:** `basis-0` (or drop `basis-*` and keep `flex-1 min-w-0`) so the title lane's hypothetical
size is 0 and the row breaks only when the *cluster itself* cannot fit. One class. **BLOCKED-ON-GLASS-V8.**

---

## D8 · MINOR — this component's contribution to the audit's tap-target count is the 12×24 slider thumb

`REPORT.json`, `safari-desktop-light /#/generate`, `a11y.smallTapTargets` (5 entries):

```json
[ {"w":160,"h":23,"tag":"input","label":""},
  {"w":22,"h":22,"tag":"button","label":"Switch to slug"},
  {"w":22,"h":22,"tag":"button","label":"Generate new slug"},
  {"w":22,"h":22,"tag":"button","label":"Cancel"},
  {"w":12,"h":24,"tag":"span","label":"Color count"} ]
```

**Exactly one is this component's**: `{"w":12,"h":24,"tag":"span","label":"Color count"}` — the
`<Slider aria-label="Color count">` thumb at `:297–307`. Confirmed live:

```json
{ "thumb": {"tag":"SPAN","w":12,"h":24,"aria":"Color count","role":"slider",
            "valuemin":"1","valuemax":"12","valuenow":"5","valuetext":null} }
```

12 px wide < the WCAG 2.2 SC 2.5.8 24×24 minimum. The *spacing* exception plausibly applies (the
thumb is the only target on its row and clears 24 px in every direction), so this is MINOR rather
than a hard failure — but it is the row the audit counted. Width comes from glass-ui
(`.slider-thumb { width: calc(var(--slider-thumb-size,1rem) * .75) }`), i.e. a producer knob
(`--slider-thumb-size`), not a consumer class — so any cure is a token set, not a local override.

The other four rows belong to the co-mounted Palettes pane / slug bar (the 160×23 `input` reports
`label: ""`, whereas this component's title input carries `aria-label="Palette name"` and measures
398×31 live). **The palette-name input is not a tap-target defect.**

Also on this slider: `aria-label` lands on **both** the thumb (`role="slider"`) and the root
`div.glass-slider` — glass-ui forwards `$attrs["aria-label"]` to the thumb *and* has
`inheritAttrs` on. Duplicate, but the root carries no role, so it is inert. Not a finding.

---

## D9 · MINOR — the "sub-millisecond" preview-cost claim is false by 2.3×, measured

`:90–93`:

> Computed only while the SelectContent renders … so zero rest cost; **10 rows × 5-12 library
> generations is sub-millisecond**.

Measured (esbuild bundle of `demo/color-session/generate-color.ts`, node 26):

```
per generatePalette(5):                      0.1752 ms
per 10-row preset menu render @count 12:     2.2628 ms
```

**2.26 ms**, not sub-millisecond — 2.3× the claimed budget, and it is spent *synchronously inside
the render function* on every re-render of the open menu (`presetStops`/`harmonyStops` are plain
function calls in the template, `compiled.js:267,312`, not memoised). The harmony menu adds ~1.4 ms.
This is not a user-visible jank at count 5 (0.9 ms), but the comment is load-bearing documentation
that is measurably wrong, and it invites a future writer to add rows on a false budget.

The *correctness* of the seed-exact claim is sound: `presetStops(candidate)` and the post-selection
`palette` call `generatePalette` with identical `(count, candidate, harmony, seed)` and the core is
pure + mulberry32-seeded, so they are byte-identical. Only the cost claim is wrong.

**Cure:** memoise per `(count, harmony, seed)` with a plain `computed` keyed map, or state the real
number. **BLOCKED-ON-GLASS-V8.**

---

## D10 · MINOR — dual import paths to the same package (edict 2: no aliases/dual paths)

`:3–15` imports `Select*`, `Slider`, `Button`, `Badge` through `../../ui/*` barrels, and
`writeClipboard`, `WatercolorDot` **directly** from `@mkbabb/glass-ui`. The barrels are pure
re-export aliases with no added behaviour:

```
$ cat demo/ui/select/index.ts demo/ui/slider/index.ts demo/ui/button/index.ts
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, … } from "@mkbabb/glass-ui";
export { Slider } from "@mkbabb/glass-ui";
export { Button } from "@mkbabb/glass-ui";
```

Two paths to one package inside one 311-line file is exactly the alias/dual-path shape edict 2
forbids, and it is why D4's break was invisible at review time: the `../../ui/button` spelling reads
like a *local* component whose props are the demo's business.

---

## D11 · MINOR — masking optional-chains, and a duplicated command surface

`:115` `defineExpose({ regenerate, save, copyColors })` exists solely to serve a **second copy of
the same three verbs** in the dock action menu:

```ts
// demo/shell/usePaneRouter.ts:196–198
{ key: "regenerate", …, handler: () => paneRefs.generate.value?.regenerate?.() },
{ key: "save",       …, handler: () => paneRefs.generate.value?.save?.() },
{ key: "copy",       …, handler: () => paneRefs.generate.value?.copyColors?.() },
```

and again in `GeneratePane.vue:22–26` (`controlsRef.value?.regenerate?.()`). The `?.` after a method
that `defineExpose` *guarantees* is a masking fallback (edict 2) that would silently swallow a
rename; `PaneActionRefs.generate` is typed `Ref<any>` (`usePaneRouter.ts:109`), so nothing checks it.
Three verbs × three call layers × `any` = the failure mode where a renamed method degrades to a
no-op with no error anywhere.

`GeneratePane.vue:12` also uses `ref<InstanceType<typeof GenerateControls> | null>(null)` where
Vue 3.5's `useTemplateRef` is the idiom (edict 7).

---

## D12 · INFO — the count is displayed twice; the badge has no accessible name

`:150–152` renders `<Badge>{{ count }}</Badge>` inside the plate chrome, and `:287–291` renders the
same `{{ count }}` as the slider's own numeric label. Two renderings of one number, ~200 px apart.
The badge carries no label at all — AT announces a bare "5" (confirmed live: `badgeText: ["5"]`).
If either survives the D7 layout cure, the badge should be the one to go: the slider label is
adjacent to the control that changes it.

---

## D13 · INFO — the transparent-track + gradient underlay is PINNED; do not "simplify" it

`:292–307` sets `--slider-track-bg: transparent` per-instance and paints a hand-rolled
`absolute inset-0` gradient div behind the slider. Read cold this looks like an edict-5
per-instance override plus an edict-3 contrivance, and glass-ui *does* accept a track gradient
directly (`.glass-slider[data-variant=spectrum] .slider-track { background: var(--slider-track-bg, var(--secondary)) }`).

**It is not a defect to file.** `CARRY-LEDGER.md:73–77` pins this exact file at this exact hash and
instructs the Glass 8 migration to *"Preserve the perceptual/alpha-checker ramps … **transparent
K/count underlays** … add no `--track-bg`, v7 alias, copied CSS or local mask."* The underlay is the
producer-sanctioned arrangement for the count slider. Measured live, it is also correct: the
gradient div and the slider root are geometrically identical (`434×24` both), the track computes
`background: rgba(0,0,0,0)`, and the spectrum range computes `backdrop-filter: none` in Chromium
(the demo-owned restatement at `demo/styles/foundation.css:571–574` is what makes that true).
**Recorded here so a later seat does not file it and break the hold.**

The paler look of the ramp versus the hard-segment strip in both screenshots is continuous
interpolation between 5 stops, not a wash — I could not reproduce any blur in Chromium, and I make
no defect claim about it.

---

## D14 · INFO — route drift observed: `#/generate` spontaneously became `#/gradient`

Twice during probing, `page.goto("http://localhost:9000/#/generate")` settled and then the app
navigated itself to `#/gradient` — once ~3 s after load, once on `page.setViewportSize(1440×900)`:

```
{ "url": "http://localhost:9000/#/gradient", "plate": false,
  "bodyText": "Gradient\n\nBuild gradients with per-interval easing and CSS output. …" }
```

Not this component (it owns no routing), but it is a shell-level hazard that any Playwright oracle
for this route will flake on, and it belongs in the mega-tranche's shell lane.

---

# Sound by measurement (the negatives, proved)

These were interrogated against the named local hazards and found **clean** — recorded so the next
seat need not re-run them:

- **`defineModel` stale-read hazard** — not applicable. The component uses no `defineModel`. The
  count binding is one-way `:model-value="[count]"` + an explicit `@update:model-value` handler.
- **Ref-assignment-in-template** — compiled and read: `count` is `setup-maybe-ref`, and the emitted
  handler is `_cache[2] || (_cache[2] = (v) => { if (v?.[0] !== undefined) count.value = v[0]; })`
  (`compiled.js:348`). The assignment compiles to `count.value = …`. **The slider does write.**
- **`ValueUnit` nesting accumulation** — the component touches no `ValueUnit`; `generatePalette`
  returns plain serialized strings.
- **oklch→HSV hue drift / `stableHue`** — no HSV round-trip in this component or its composable.
- **Ungated rAF loops (PRM-RAF)** — none. `WatercolorDot` is instantiated with `animate` defaulting
  to `false`, so `useWatercolorBlob` returns before creating its rAF loop; and glass-ui's loop is
  `{ pauseWhenHidden: true, respectReducedMotion: true }` anyway.
- **Listener / observer leaks** — the component registers no listeners, timers, or observers; every
  handler is a template binding torn down with the vnode.
- **WebGL** — the component boots no drawing context. `WatercolorDot` is explicitly a CSS/SVG
  primitive (its own doc block: *"NO drawing context — no WebGL/WebGPU/Canvas2D"*).
- **`verbatimModuleSyntax`** — all three type-only imports are `import type` (`:21`, `:32`, `:33`).
  Clean.
- **`parseCssColor` crash class** — the component parses nothing; it only *serializes*.
- **Seed hex domain** — `seed.value.toString(16).padStart(8, "0")` over
  `Math.floor(Math.random() * 0xffffffff)` ∈ [0, 4294967294] is always ≤ 8 hex digits, never
  negative. `:60` is safe.
- **Console / page errors on the route** — `REPORT.json` records `consoleErrors: []`,
  `pageErrors: []`, `overflowX: 0`, `namelessButtons: 0` for `/#/generate` across all four
  matrices; my live session reproduced zero application console errors.
- **`no god modules`** — 311 lines, one concern, one composable. Compliant.
- **`animations never deleted`** — no keyframes removed; the scoped transitions stay in-component.
  Compliant (though D1 makes `active:scale-95` unreachable).

---

# The wave — `V·MT/WB-GEN-1` · **BLOCKED-ON-GLASS-V8**

**Status:** authored, not executable. `docs/tranches/V/reformation/CARRY-LEDGER.md:55–80` holds
**all** consumer edits to `GenerateControls.vue` (pinned
`4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6`, hash re-verified this session)
against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`.

**Exact release condition — every clause must hold before a single line of this wave lands:**

1. One **unique, immutable** `@mkbabb/glass-ui` v8 candidate proves exact
   **source → built → packed → installed → served** equality;
2. that candidate is **neither a workspace/source link nor mutable v7**;
3. it **survives two unchanged-byte Sol critics**;
4. glass BJ W4's three formation packets remain bound at
   `3547c78bdf85a5b0fdb73641bab8937f0c47732fed0f9c921ae4ce56462371e4` (emitter),
   `458e51988fb72ff4bd859ebd8f35a29d7cd0349c5a3b7dfe44d79a29ecabe11e` (gate/package),
   `1b8719a0e96bb0253c2c2bf94a8fef783cbdcfdd5498b1389be669231170ef7e` (synthesis);
5. at that point the slider seam migrates **property name only**,
   `--slider-track-bg` → `--glass-slider-track-background`, preserving the transparent count
   underlay, existing pixels, and orientation/RTL/inversion (D13); **no `--track-bg`, no v7 alias,
   no copied CSS, no local mask**;
6. the `foundation.css:571–574` spectrum-range restatement is retired **only** once both installed
   public CSS entries carry `backdrop-filter: none` *and* `-webkit-backdrop-filter: none` and a real
   browser computes both as `none`.

**Wave items, in landing order (all gated by the above except W-0):**

| # | item | finding | gate |
|---|---|---|---|
| W-0 | wire `npm run test:e2e` into `.github/workflows/ci.yml`; fix the `o20` encoding assertion so the RED oracle is observed | D2 | **not held** — CI/e2e only, touches no `demo/` file |
| W-1 | swatch verb re-seated: real `<button>` owning click + accessible name + focus ring, `<WatercolorDot>` as its `aria-hidden` face | **D1** | held |
| W-2 | `variant` → `emphasis` on all three buttons; `variant` deleted, not aliased | D4 | held |
| W-3 | `onSave(colors, name)` consumes the emitted name; empty-name guard at the emit site | D3 | held |
| W-4 | `useClipboard()` + one `aria-live="polite"` region for Save and both Copy verbs | D5 | held |
| W-5 | boundary validation of the two `AcceptableValue` casts; exhaustive `switch` + non-optional preset lookup in the core; empty-palette save guard | D6 | held |
| W-6 | `basis-[10rem]` → `basis-0` on the title lane; re-measure the wrap threshold and correct the comment | D7 | held |
| W-7 | memoise the preview stops per `(count, harmony, seed)`; correct the cost comment to the measured number | D9 | held |
| W-8 | single import path to `@mkbabb/glass-ui`; retire the `demo/ui/*` alias barrels this file touches | D10 | held |
| W-9 | drop the `?.` masking chains + `Ref<any>` on the exposed verbs; decide whether the dock duplicate survives at all | D11 | held |
| W-10 | drop the duplicate count badge or give it a name | D12 | held |
| W-11 | raise `--slider-thumb-size` (producer token) or accept the 2.5.8 spacing exception in writing | D8 | held (producer knob) |

**Relay obligation:** D1 (`tag` removed from `WatercolorDot`), D4 (`variant` removed from `Button`),
and D8 (12 px thumb vs SC 2.5.8) are **producer-surface facts about glass-ui 7.0.0** and fall under
the standing BH/BI relay fond — they belong in the active glass-ui inbox regardless of when this
wave unblocks.
