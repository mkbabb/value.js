# CHALLENGE-C — `demo/workbenches/mix/MixConfigBar.vue` — implementation (r2)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
seat was spawned with an explicit Opus 5 declaration and I am serving it as declared; nothing here
is inherited or undeclared.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

**Pass note.** An r1 pass of this seat exists (2026-07-27). I preserved it verbatim at
`challenge-C-implementation.2026-07-27-r1-prior.md` and re-ran its load-bearing measurements from
scratch this session rather than inheriting them. Findings carried forward are marked
**[r1, re-measured]**; findings that did not exist in r1 are marked **[NEW]**. Two r1 findings are
re-graded upward on new evidence.

---

## Verdict

**DEFECTIVE.** Sixteen findings — two BLOCKER, five MAJOR.

The two blockers are of one family and they compound. The pane's only verb is styled by a prop
**glass-ui 7.0.0 does not have**, so it renders in the wash tier its own source comment forbids —
and the affordance that would ever *enable* that verb is, by the identical mechanism one component
over, a non-interactive `aria-hidden` `<span>`. On a cold load of `/#/mix` the Mix button is
disabled, nothing on the page can un-disable it, and therefore the T-17 preview-chip feature this
file exists to host **cannot render at all in the shipped app**. Not "untested" — unreachable.

Beneath that, three defects in the preview's own truth: with ≥3 operands the chip does not contain
the color Mix produces; in the app's default color space the four-arc quartet is four identical
chips; and the chip paints a *continuous* gradient, so 16 of every 17 pixel-columns are painted by
the browser's gradient engine — the exact engine `sample.ts`'s sampling law forbids — with a
modelled worst-band error of 23.5/255 on the `longer` arc.

Every number below is from a command I ran in this session or a DOM value I measured live.

---

## Scope read

| artifact | path |
|---|---|
| subject | `demo/workbenches/mix/MixConfigBar.vue` — 173 lines, read whole |
| parent | `demo/workbenches/mix/MixPane.vue` |
| state | `demo/workbenches/mix/composables/useMixingState.ts` |
| sibling (proximate cause of C-2) | `demo/workbenches/mix/MixSourceSelector.vue` |
| sampler | `demo/color-session/color-chips/{sample.ts,PreviewRamp.vue,index.ts}` |
| vocabulary | `demo/color-session/color-space-meta.ts`, `demo/palettes/mix.ts` |
| design system | `node_modules/@mkbabb/glass-ui/dist/**` @ 7.0.0 (`.d.ts` + shipped runtime chunks) |
| tests | `test/preview-chips.test.ts`, `e2e/smoke/oracles/o14-preview-truth.spec.ts` |
| live | `http://localhost:9000/#/mix` — 5 Playwright/Chromium sessions, scripts in scratchpad |
| visual | `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}`, `shots/safari-{desktop,mobile}-{light,dark}/mix.png` |

---

## C-1 · BLOCKER — the pane's ONE verb is styled by a prop glass-ui 7.0.0 does not have. It ships in the wash tier and leaks a dead attribute into the DOM **[r1, re-measured]**

`MixConfigBar.vue:162-170`:

```vue
<Button
    variant="primary-audacious"
    :disabled="!canMix"
    class="h-10 gap-2 font-medium font-display"
    @click="emit('mix')"
>
```

`demo/ui/button/index.ts` is one line — `export { Button } from "@mkbabb/glass-ui";`. glass-ui
7.0.0's `ButtonProps` (`dist/components/button/Button.vue.d.ts`) declares
`emphasis | tone | size | iconOnly | loading | type | disabled | class` and **no `variant`**. The
shipped runtime agrees (`dist/button-Bu9F4uU6.js:10-32` props block; line 11 is
`emphasis: { default: "secondary" }`), and the token exists nowhere in the package:

```
$ grep -rl "primary-audacious" node_modules/@mkbabb/glass-ui/dist/
(no matches)
$ grep -o "primary[a-z-]*\|audacious" node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js | sort -u
primary
```

So `variant` falls through `$attrs` onto the host `<button>` as an invalid HTML attribute and styles
nothing. Measured live at `http://localhost:9000/#/mix` (Chromium, 1440×900):

```json
"attrs": [
  "data-slot=\"button\"", "data-emphasis=\"secondary\"", "data-tone=\"neutral\"",
  "data-size=\"md\"", "data-press-armed=\"\"", "type=\"button\"", "disabled=\"\"",
  "class=\"button tap-squish focus-ring glass-wash glass-capsule h-10 gap-2 font-medium font-display\"",
  "variant=\"primary-audacious\"",
  "style=\"--glass-btn-press-t: 0.0000; --flex-vel: 0.0000;\""
],
"bg": "oklab(0.915626 0.00551148 0.0130686 / 0.52)", "bgImage": "none", "opacity": "0.5"
```

`data-emphasis="secondary"` is glass-ui's default; the applied recipe is `glass-wash glass-capsule`.
The file's own comment, `MixConfigBar.vue:158-161`, states the requirement *and names the exact
failure that shipped*:

> The page's ONE verb — the producer's deliberate-primary register … `default` is the quiet glass
> capsule and **read disabled-forever over the wash tier**.

Visible in `shots/safari-desktop-light/mix.png` and `shots/safari-mobile-dark/mix.png`: the "Mix"
capsule is the faintest element on a pane whose only purpose is that verb.

**The gate cannot see it.** Demo typecheck is HARD in CI (`ef57230b`) and green on this tree:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "EXIT=$?"
EXIT=0
```

`tsconfig.demo.json` includes `demo/`, so the file is in the program. No `vueCompilerOptions` block
exists anywhere (`grep -n "vueCompilerOptions" tsconfig*.json vite.config.ts package.json` → no
output), so `strictTemplates` defaults **off** and unknown component attributes are never checked.
Every retired glass-ui prop in the demo is invisible to every gate in the repo — and the demo is
still speaking the pre-7 dialect nearly everywhere: `grep -rn 'variant=' demo/ | grep -c Button` →
51 call sites, against **2** total uses of the 7.0.0 `emphasis` API
(`PalettesPane.vue:113`, `AdminUsersPanel.vue:174`).

**Cure (gestalt).** Speak glass-ui 7's two orthogonal axes at the call site —
`<Button emphasis="primary" tone="…">` — and delete `variant` here and at
`GenerateControls.vue:158`, the only other site carrying this corpse. If "audacious" is a register
the system genuinely lacks, it is a glass-ui `emphasis`/`tone` value authored in glass-ui (owner
edict 4), never a demo-side string. Structurally: turn `strictTemplates: true` on, which converts
this whole family from invisible to compile-RED.

**Mechanism family:** *retired glass-ui-7 prop names still passed at demo call sites; Vue's
attribute fallthrough renders them silently inert; vue-tsc reports nothing.* C-2 is the same
mechanism with a worse consequence.

---

## C-2 · BLOCKER — the Mix verb is unreachable: the only add-color affordance is a non-interactive `aria-hidden` `<span>`, so `canMix` can never become true and this component's preview chips can never render **[r1 C-3(a), re-graded from MAJOR]**

r1 reported this as "the O-14 oracle is red". It is worse than that. The feature is dead in the
shipped app, and the oracle is red *because* the feature is dead.

`MixSourceSelector.vue:164-175` renders the add-current-color affordance:

```vue
<WatercolorDot key="__add__" :color="…" variant="ghost" tag="button" seed="mix-add-slot"
    class="add-slot-ghost …" aria-label="Add current color to the mix"
    :disabled="!canAddColor || undefined" @click="addCurrentColor">
    <Plus class="w-5 h-5 …" aria-hidden="true" />
</WatercolorDot>
```

glass-ui 7.0.0's `WatercolorDot` props (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) are
exactly `{ color, variant, animate, cycleDuration, range, seed }` — **no `tag`, no `as`, no
`asChild`, and no default slot**. The shipped runtime hardcodes `aria-hidden: "true"` and sets
`inheritAttrs` (`grep -o 'inheritAttrs:[!a-z0-9]*\|aria-hidden[^,]*' dist/watercolor-dot.js` →
`aria-hidden": "true"` ×3, `inheritAttrs:`), so the consumer's `aria-label`, `disabled` and click
listener are all dropped.

Measured live — the element as it actually renders:

```json
{ "tag": "SPAN",
  "attrs": ["data-v-292b9032=\"\"", "data-v-a3e86846=\"\"", "aria-hidden=\"true\"",
            "class=\"add-slot-ghost … watercolor-swatch\"",
            "data-testid=\"watercolor-swatch\"", "data-variant=\"ghost\"", "style=\"border-radius: …\""] }
```

No `aria-label`. No `role`. No `button`. And it does not respond:

```
$ document.querySelector('[aria-label="Add current color to the mix"]')   →  null
$ page.getByRole("button", { name: "Add current color to the mix" }).count()  →  0
# two forced clicks on .add-slot-ghost, 750 ms of settle:
== H after 2 ghost clicks == {"mixDisabled":true,"dots":1}
```

`useMixingState.ts:50-53` gates `canMix` on `selectedColors.length >= 2`. In the default `colors`
mode the *only* other way to add a color is `MixSourceSelector.vue:218`
(`Add color ${color.css} from ${palette.name}`), which requires the user to already have saved
palettes. **On a cold, unauthenticated load of `/#/mix` — the state all four visual-audit matrices
captured — there is no reachable path to two operands.** Therefore:

1. the Mix button (C-1's subject) is `disabled` forever;
2. `operandColors` is `[]` forever, so `sampleInterpolationRamp` returns `null` for every row
   (`sample.ts:58`) and **every preview chip is absent** — measured, with both menus open:
   `{"options":9,"chips":0}` for Color space and `{"options":4,"chips":0}` for Hue method;
3. the T-17 feature — the reason 60 % of this file exists (`MixConfigBar.vue:19-23`, `:38-44`,
   `:47-74`, `:104-115`, `:127-137`) — has never rendered for a user.

The one e2e leg that passes is `honest absence: with <2 operands the rows carry NO chip`
(`o14-preview-truth.spec.ts:334`). It passes because the chips are unconditionally absent. That is
the whole of the T-17 green.

(The defective call site belongs to the `wb-mix-sourceselector` seat. It is reported here because
the *consequence* — a dead verb and a dead preview — is entirely this component's surface, and
because C-1 and C-2 are one mechanism: a glass-ui 7 prop rename that no gate in the repo can see.)

**Cure.** Same as C-1: stop passing props the design system does not declare. The add-slot needs a
real interactive host — a `<button>` wrapping the dot, or a glass-ui `asChild`/`Primitive` affordance
authored in glass-ui if the dot is to be commandable (owner edict 4). Then `strictTemplates: true`
so this class cannot recur silently.

---

## C-3 · MAJOR — with three or more operands the preview chip does not contain the color Mix produces **[NEW]**

`MixConfigBar.vue:38-44` states the chips' referent: "the CURRENT mix operands (colors mode) — the
preview ramps' truth inputs". `sample.ts:52-86` builds an **N−1-segment piecewise interpolation
chain**. `useMixingState.ts:87-91` computes the actual result with `mixColorSequence`
(`demo/palettes/mix.ts:39`), a **weighted running accumulation**. For two operands these coincide;
for three or more they do not.

Measured in-page against the real modules, operands
`["oklch(0.62 0.27 9.8)", "rebeccapurple", "rgb(20 120 200)"]`, space `oklch`, arc `shorter`:

```json
"threeOperand": {
  "rampLen": 17,
  "mixedCss": "oklch(54.069139698567% 0.193255046847 307.570128060664deg)",
  "nearestStop": "oklch(48.520384700172% 0.187721999536 319.979741366417deg)",
  "nearestIndex": 6, "nearestDistance": 0.0656, "exactMember": false
},
"twoOperand": { "rampLen": 17, "mixedCss": "oklch(53.01…% 0.2151… 336.58…deg)", "exactMemberIndex": 8 }
```

Two operands: the mix result **is** stop 8, exactly — the chip is a truthful preview. Three
operands: the result is **not on the ramp at all**; the nearest of 17 stops is 5.5 lightness points
and 12.4° of hue away. The chip shows a chain the operation never traverses to a color the operation
never produces.

The component's own quoted law (`sample.ts:15-19`, `o14-preview-truth.spec.ts:6`) is:

> **a chip that approximates the library output is FORBIDDEN** … *a lying preview is worse than
> none.*

The ≥3-operand chip is precisely the forbidden object: byte-honest to `mixColors` (so the O-14
byte-identity leg would bless it), and not a preview of the operation the button performs. The
honest-absence guard (`MixConfigBar.vue:111`, `:133`) does not fire — the ramp is non-null, just
wrong-referent.

**Cure.** Either sample the *actual* operator — walk `mixColorSequence` over prefix weights so the
chip's last stop **is** the mix result — or restrict the chip to the 2-operand case where the chain
and the operator agree, and show honest absence above that. The choice belongs in `sample.ts`
(one sampler, both consumers), not in the view.

---

## C-4 · MAJOR — in the app's shipped default space the Hue-method control is inert and its four preview chips are byte-identical **[r1 C-2, re-measured first-hand]**

`MixConfigBar.vue:66-74` samples the quartet in the **current** space; `useMixingState.ts:44` ships
`const colorSpace = ref<PickerSpace>("oklab")`. `oklab` is rectangular — no hue channel — so the
`hue` option is ignored by `mixColors`.

Measured in-page, distinct ramps across the four arcs, operands
`["oklch(0.62 0.27 9.8)", "rebeccapurple"]`:

```json
{"oklch":2,"oklab":1,"lab":1,"lch":2,"hsl":2,"hsv":2,"hwb":2,"rgb":1,"xyz":1}
```

and the four `oklab` rows, stop 4, verbatim:

```
shorter:    oklch(57.506794900057% 0.22159155218 0.258910679707deg)
longer:     oklch(57.506794900057% 0.22159155218 0.258910679707deg)
increasing: oklch(57.506794900057% 0.22159155218 0.258910679707deg)
decreasing: oklch(57.506794900057% 0.22159155218 0.258910679707deg)
```

**Four of the nine offered spaces** (`oklab`, `lab`, `rgb`, `xyz` — `color-space-meta.ts:26-36`)
render four identical chips under four different arc names, and in all four the Hue-method Select
changes nothing about the mix. The default state of the app is one of them: the captured screenshots
show `COLOR SPACE: OKLab` / `HUE METHOD: Shorter`.

(2-of-4 for cylindrical spaces is the mathematical ceiling — `shorter` always coincides with one of
`increasing`/`decreasing`, `longer` with the other. Only the 1-of-4 result is a defect.)

**Cure.** Add `cylindrical: true` to the five hue-bearing rows of `INTERPOLATION_SPACES`
(`color-space-meta.ts` — the neutral home already exists, no new module), then bind
`:disabled="!isCylindrical(colorSpace)"` on the Hue-method `<Select>` (glass-ui `SelectProps.disabled`
exists) and skip `hueRamps` in that branch. One fact, authored once, consumed by the two surfaces
that already share the module.

---

## C-5 · MAJOR — the chip paints a *continuous* gradient, so 16 of every 17 pixel-columns are painted by the engine the sampling law forbids. Worst-band error 23.5/255 on the `longer` arc **[NEW]**

`PreviewRamp.vue:24-26`:

```ts
const gradient = computed(() => `linear-gradient(90deg, ${stops.join(", ")})`);
```

Its own docstring, `PreviewRamp.vue:6-7`, says the chip "paints them as a **discrete-stop** linear
gradient". It does not: there are no stop positions and no `in <space>` keyword. Measured — the
computed value of an element carrying the real 17-stop output:

```json
{"hasPositions": false, "stopCount": 17,
 "computedHead": "linear-gradient(90deg, oklch(0.62 0.27 9.8), oklch(0.608767 0.263144 5.64831), oklch(0.597534 0.256287 1.49662), oklch(0.586301 0.24943 357.345), …"}
```

`sample.ts:5-11` states the law this violates:

> ramps are k-sample discrete stops built from THE LIBRARY's `mixColors` interpolation — **never CSS
> `in <space>` gradient interpolation, because the preview must show what THE APP computes, not what
> the browser's engine would**.

With 17 samples across `inline-size: 2.618rem` ≈ 41.9 px (`PreviewRamp.vue:43`), the library owns
**17 pixel-columns** and the browser's gradient engine paints the other ~25 — 60 % of the chip, and
100 % of the transitions.

Magnitude, measured (model: sRGB chord between adjacent stops — what a legacy unprefixed
`linear-gradient` paints at each band midpoint — versus the library's own value at that parameter,
Euclidean distance in 0–255 sRGB):

```
oklch · longer   : 17 stops, worst band 7  → Δ 23.5 / 255
oklch · shorter  : 17 stops, worst band 5  → Δ  1.1 / 255
hsv   · longer   : 17 stops, worst band 2  → Δ  0.5 / 255
```

The error concentrates exactly where the feature earns its keep: the **`longer` arc**, the row whose
entire purpose is to show the far way round, is the row the browser chords straight through. (The
number is modelled, not pixel-sampled off a screenshot — stated so it is not read as a direct
measurement.)

The O-14 e2e leg is structurally blind to this: `o14-preview-truth.spec.ts:374-387` asserts only
that the *listed* stops appear in the painted string. Nothing anywhere asserts what happens between
them.

**Cure.** Emit the discrete gradient the docstring already promises — doubled positions,
`s_i (i/n)% ((i+1)/n)%` — so every painted pixel is a library sample and nothing is interpolated by
the engine. That also makes the chip's honesty verifiable by construction rather than by a stop-list
substring check.

---

## C-6 · MAJOR — the T-17 chips have no live verification, and beneath the deadlock the byte-identity assertion cannot match the sampler's own serialization **[r1 C-3(b,c), re-derived]**

### (a) The oracle cannot reach its state

Both chip-rendering legs (`o14-preview-truth.spec.ts:346` and `:404`) begin

```ts
const addSlot = page.getByRole("button", { name: "Add current color to the mix" });
await addSlot.click();
```

and I measured that locator resolving to **0 elements** (C-2). Both legs can only time out.

### (b) And the assertion could not pass anyway

`o14-preview-truth.spec.ts:162-168` parses stops with

```js
/oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g
```

but `serializeStop` (`sample.ts:39-41`) emits `colorToCss(stop, "oklch")`, whose real output — every
string below is from a live call to the shipped function this session — is:

```
oklch(62.795536392143% 0.257683303805 29.233880279628deg)   ← from "red"
oklch(60% 0.2 30deg)                                        ← from "oklch(0.6 0.2 30 / 1)"
oklch(0% 0 none)                                            ← from "#000"
oklch(100% 0 none / 6.25%)                                  ← achromatic with alpha
```

A `%` on L and a `deg` on H. The regex's first group is `[\d.]+`, which cannot consume `62.79…%`, so
it matches **zero** stops in any stamped `data-stops`. Meanwhile the browser canonicalizes the
painted string to `oklch(0.62 0.27 9.8)` (measured above, C-5), which the regex *does* match. So
line 377's `expect(painted.length).toBe(stamped.length)` would evaluate `expect(17).toBe(0)` per
chip. The assertion has never matched the format it claims to parse.

### (c) No unit coverage of the component exists

```
$ grep -rn "MixConfigBar" . --exclude-dir=node_modules -l
demo/workbenches/mix/MixPane.vue
demo/color-session/color-chips/index.ts          ← a doc comment
docs/…                                            ← prose only
```

Nothing mounts it. `test/preview-chips.test.ts` exercises `sample.ts` in isolation: never the
space×hue cross-product at `MixConfigBar.vue:57-74`, never the `v-if` guard, never the emit casts.

**The vacuous-gate mutation, named exactly:** delete both `<PreviewRamp …/>` elements
(`MixConfigBar.vue:111` and `:133`). `npm test` stays fully green — nothing imports the component.
The one green e2e leg (`honest absence … the rows carry NO chip`) stays green *because the chips
become unconditionally absent*. The two red legs stay red. **The entire T-17 feature can be deleted
from this file without turning a single gate a different colour.**

**Cure.** (1) fix the add-slot host so the flow is drivable; (2) delete `parseOklchTriples` and
compare `data-stops.split("|")` against the painted stops through one shared normalizer owned by
`sample.ts` — the module already owns `stampStops`, so the referent exists; (3) add a
`@vue/test-utils` mount asserting the one thing only this file owns: that Space row *i* carries the
ramp for space *i* with the current arc, and Hue row *j* the ramp for arc *j* with the current space.

---

## C-7 · MAJOR (a11y) — three `<label>` elements that label nothing, in the one file in `demo/` that uses `<label>` for this recipe **[r1 C-4, re-measured + new divergence evidence]**

`MixConfigBar.vue:98`, `:121`, `:145`:

```vue
<label class="section-label">Color space</label>
<label class="section-label">Hue method</label>
<label class="section-label">Size mismatch</label>
```

No `for`, no labelable descendant. Measured live:

```json
[{"text":"Color space","htmlFor":"","controlTag":null,"controlId":null,"parentTag":"DIV"},
 {"text":"Hue method", "htmlFor":"","controlTag":null,"controlId":null,"parentTag":"DIV"}]
```

`HTMLLabelElement.control === null` for both rendered rows (the third is `v-if`-hidden in colors
mode). And the promise the element makes is measurably broken — clicking the visible label:

```json
{"afterClick": {"active": "BODY ", "listboxOpen": false}}
```

Focus stays on `<body>`; the Select does not open. A `<label>` that neither names nor activates
anything.

**New this pass:** this is a lone divergence, not a house pattern. Every other `.section-label` in
the demo uses a non-semantic host:

```
$ grep -rn "section-label" demo/ | grep -v '\.css\|\.md'
GradientVisualizer.vue:163,180,197,229   <span class="section-label">
MixSourceSelector.vue:183                <span class="section-label">
GenerateControls.vue:221,255             <span class="section-label">
SearchFilterBar.vue:20,32,48,63          <div  class="section-label">
TagEditPopover.vue:8                     <div  class="section-label">
AdminTagsPanel.vue:87                    <div  class="section-label">
MixConfigBar.vue:98,121,145              <label class="section-label">     ← only site
```

The accessible name survives only because `aria-label` is hand-duplicated on each trigger
(`:100`, `:123`, `:147`) — the same string authored twice, which is how name/label drift begins.
(WCAG 2.5.3 currently holds: `"Size mismatch"` is a prefix of `aria-label="Size mismatch strategy"`.
That is luck.)

glass-ui 7.0.0 ships the primitive and the demo already re-exports it — `demo/ui/label/index.ts` →
`export { Label } from "@mkbabb/glass-ui";` with `LabelProps { for?: string; … }`.

**Cure.** `<Label for="mix-space">Color space</Label>` + `id="mix-space"` on the trigger; drop the
duplicated `aria-label`s. One name, authored once, in the design system's own primitive.

---

## C-8 · MINOR — legacy comma-with-alpha CSS colors throw in `parsePickerColor`; at this component's seam that makes the chip vanish silently while the Mix button stays armed to crash **[NEW]**

Measured in-page, calling the shipped `parseColorIn` directly:

```json
"rgba(255,0,0,1)"    : "THROW: Invalid CSS color"
"rgba(255,0,0,0.5)"  : "THROW: Invalid CSS color"
"hsla(0,100%,50%,1)" : "THROW: Invalid CSS color"
"rgb(255,0,0)"       : parses → oklch(62.795536392143% 0.257683303805 29.233880279628deg)
"rgb(255 0 0 / 100%)": parses
"#ff0000ff"          : parses
```

The comma-separated legacy `rgba()`/`hsla()` forms — valid CSS Color 3, and the form a
human-authored or older-record palette color is most likely to be in — raise
`PickerColorError: Invalid CSS color` from `demo/color-session/picker-color.ts:159`. This is the
repo's known live-parser class showing up on a path this component sits on.

The two consumers of that parse handle it **asymmetrically**:

- `sample.ts:60-66` catches and returns `null` → MixConfigBar's `v-if` (`:111`, `:133`) drops the
  chip. But the guard's documented meaning is *honest absence — the preview has nothing true to
  say* (`sample.ts:50-51`, `MixConfigBar.vue:40-42`). Here it fires for a **parser gap**, and the
  user cannot tell the two apart.
- `useMixingState.ts:88-90` does the identical parse **unguarded**, and `mix.ts:35` throws on a
  failed mix. So the pane simultaneously tells the user "there is nothing to preview" (chip absent)
  and "you are ready to mix" (button enabled), while the truth is "pressing this throws".

Reachability of an `rgba()` operand is a **hypothesis** — I did not find a stored palette color in
that form this session; `selectedColors` are fed from the picker's own serialization and from
`PaletteColor.css` records. The parse failure itself is measured fact.

**Cure.** The parser gap belongs to the parser seat. This component's half: the absence guard must
distinguish *nothing to say* from *cannot read this*, and whatever answer the chip gives, the Mix
button must give the same one — one predicate, both surfaces.

---

## C-9 · MINOR — `serializeStop`'s alpha strip is dead code: the serializer never emits the string it removes **[NEW]**

`sample.ts:38-41`:

```ts
/** Serialize one sampled stop as paintable OKLCh (alpha only when < 1). */
export function serializeStop(stop: AnyColor): string {
    return colorToCss(stop, "oklch").replace(/ \/ 1\)$/, ")");
}
```

Measured outputs of `colorToCss(…, "oklch")` this session:

| input | raw `colorToCss` | after `.replace` |
|---|---|---|
| `oklch(0.6 0.2 30 / 1)` | `oklch(60% 0.2 30deg)` | unchanged |
| `#ff0000ff` | `oklch(62.795536392143% 0.257683303805 29.233880279628deg)` | unchanged |
| achromatic, α<1 | `oklch(100% 0 none / 6.25%)` | unchanged |
| α = 0 | `oklch(0% 0 none / 0%)` | unchanged |

The serializer already omits alpha at α = 1, and when it does emit alpha it emits a **percentage**.
The literal ` / 1)` the regex removes is not in the serializer's output language. The line is a
no-op carried from an older serialization — a legacy path in the module that owns the T-17 truth
law (owner edict 2: no legacy, no dual paths). Its docstring describes behaviour the *serializer*
provides, not behaviour this line provides.

**Cure.** Delete the `.replace`; the docstring's promise is already the serializer's contract.

---

## C-10 · MINOR — `class="h-9"` de-tokenizes the trigger height glass-ui ships as `size="sm"` **[r1 C-5, confirmed]**

`MixConfigBar.vue:100`, `:123`, `:147` all carry `<SelectTrigger … class="h-9">`. glass-ui's
SelectTrigger derives its height from a token — its shipped CSS carries both
`.h-\(--control-h-sm\){height:var(--control-h-sm)}` and `.h-\(--control-h-md\){height:var(--control-h-md)}`
(`dist/styles/components.css`) — and merges consumer `class` through `tailwind-merge`, which drops
the conflicting utility. `.h-9{height:calc(var(--spacing) * 9)}` = 2.25 rem = 36 px; measured
trigger height live: **36 px**, i.e. exactly `--control-h-sm`. The component hardcodes the pixel
value the system already names, and severs these three controls from the token: a future retune of
`--control-h-sm` moves every control in the app except them.

Same idiom on the Button: `class="h-10 gap-2 font-medium font-display"` (`:165`) while
`ButtonProps.size: "xs"|"sm"|"md"|"lg"` exists.

**Cure.** `<SelectTrigger size="sm">` ×3, drop `h-9`; express the Button's register through
`size`/`emphasis`/`tone` (which also closes C-1).

---

## C-11 · MINOR — the component reaches past the design system into `reka-ui` for a type wider than glass-ui's contract, then launders it with three unchecked casts **[r1 C-7]**

`MixConfigBar.vue:15` `import type { AcceptableValue } from "reka-ui";`, and three handlers of the
form (`:99`, `:122`, `:146`):

```vue
@update:model-value="(v: AcceptableValue) => emit('update:colorSpace', v as PickerSpace)"
```

glass-ui 7.0.0's emit is narrower (`Select.vue.d.ts` + `_shared/selection.d.ts`):
`SelectEmits { "update:modelValue": [value: SelectionValue] }` with
`type SelectionValue = string | number`. reka's `AcceptableValue` includes
`Record<string, any> | null`, so the handler advertises values glass-ui will never send and
`as PickerSpace` narrows from a union containing `null` with no check — a masking cast (owner
edict 2). It also pins the demo to `reka-ui`, a devDependency, for a contract glass-ui 7 narrowed
precisely so consumers need not touch reka.

**Cure.** Annotate `(v: string | number)` and narrow honestly with a membership check against
`INTERPOLATION_SPACES` / `HUE_INTERPOLATION_METHODS` — both already imported, both already the
source of the rendered rows. That also closes C-16.

---

## C-12 · MINOR (a11y) — the decorative `<Blend>` icon is exposed as a nameless `img` inside the button **[r1 C-6]**

`MixConfigBar.vue:168`: `<Blend class="w-4 h-4" />` — no `aria-hidden`; `@lucide/vue` does not add
it. The sibling component gets it right at `MixSourceSelector.vue:174`
(`<Plus … aria-hidden="true" />`), so this is an inconsistency inside one feature, not a house
style. (Note the button's own accessible name is intact — this is a spurious child node, not a
nameless control, and it is *not* the `/#/mix` `namelessButtons: 1` row in `REPORT.json`: that count
is desktop-only and absent on mobile, where this button also renders.)

**Cure.** `<Blend class="w-4 h-4" aria-hidden="true" />`.

---

## C-13 · MINOR — the leftover-strategy vocabulary is duplicated in the view, against the precept this file cites eight lines earlier **[r1 C-8]**

`MixConfigBar.vue:83-89` keeps a hand-written `STRATEGIES: LeftoverStrategy[]` beside a
`Record<LeftoverStrategy, string>` of labels, while `LeftoverStrategy` is owned by
`demo/palettes/mix.ts:19`. The `Record` is exhaustiveness-checked by TypeScript; **the array is
not** — adding a fourth strategy to the union compiles clean and the new strategy silently never
appears in the menu. `MixConfigBar.vue:16-18` states the opposite principle for the *other*
vocabulary ("the interpolation vocabulary lives in its neutral home"); the interpolation vocabulary
was moved out and the strategy vocabulary was left behind.

**Cure.** Put `{ value, label }` metadata beside the type in `demo/palettes/mix.ts`, the same shape
`color-space-meta.ts` uses. Zero new modules.

---

## C-14 · MINOR (a11y) — the pane's only verb is natively disabled on every cold load: no reason, no tab reach; and the async result is never announced **[r1 C-9]**

Measured: `{"disabled": true, "ariaDisabled": null, "opacity": "0.5", "describedby": null}`. A native
`disabled` button is removed from the tab order, so a keyboard or screen-reader user cannot reach it
to discover that it exists or why it is unavailable — nothing on the page says "pick two". Given
C-2, that state is permanent.

Separately, the mix result is asynchronous from the user's point of view (`useMixingState.ts:100`
opens a narration window) and lands in `MixResultDisplay` with **no `aria-live` anywhere in the
chain** (`MixPane.vue:111-119`). Noted here so the mix seat does not drop it between components; the
region belongs on the result surface, not on this one.

**Cure.** Keep the button focusable with `aria-disabled` + a short `aria-describedby` hint; give the
result plate `role="status"`.

---

## C-15 · INFO — "costs nothing at rest" holds; the invalidation source is sloppy but sub-frame **[r1 C-10, re-measured]**

`MixConfigBar.vue:19-22` claims the sampling "costs nothing at rest". **True**, and verified two
ways: `computed` is lazy, glass-ui's SelectContent unmounts when closed, and with the menu closed no
`[data-stops]` exists; with the menu open and <2 operands, 9 option rows render `chips: 0`.

The residual is on the invalidation side: `MixPane.vue:103` passes
`:operand-colors="mode === 'colors' ? selectedColors.map((sc) => sc.css) : []"` — a **new array
identity on every MixPane render** — so both computeds invalidate on renders where nothing changed
by value. Measured cost of a full 9-space map rebuild (`RAMP_SAMPLE_COUNT = 16`, warmed, 20
iterations, in-page):

```
2 operands → 0.72 ms / full map (153 stops)      9 operands → 1.03 ms / full map
```

Sub-frame at both ends, and only while a menu is open. Recorded as INFO because I measured no
user-visible consequence. **Cure:** hoist to a `computed` in `MixPane` for a stable identity.

---

## C-16 · INFO — `<SelectValue />` has no placeholder and the offered vocabulary is a strict subset of the prop's type **[r1 C-11 — hypothesis on reachability]**

`PickerSpace` is the full library union (17 members, `picker-color.ts`); `INTERPOLATION_SPACES`
offers 9. `<SelectValue />` (`:101`, `:124`, `:148`) carries no `placeholder`, so a `colorSpace`
outside the 9 renders a blank trigger with no fallback text. Not live-reachable today —
`colorSpace` is a `ref` local to `useMixingState` written only by this Select — so the reachability
claim is a **hypothesis**; the type hole is factual. It goes live the moment mix state is lifted,
URL-persisted, or shared with the picker's 17-space catalog. C-11's membership check closes it
structurally.

---

## Negative proof — what I checked and did NOT find

Stated so the absences are evidence, not silence.

- **No hazard-class code in this file.** All 173 lines read: no `requestAnimationFrame` (no PRM-RAF
  exposure), no `addEventListener`, no `ResizeObserver`/`IntersectionObserver`, no timers, no
  lifecycle hooks, no async, no fetch, no WebGL, no canvas. There is nothing to leak, nothing to
  cancel, and nothing to clean up — the missing-cleanup, leaked-listener and ungated-loop classes
  are genuinely absent here.
- **No `defineModel`.** Explicit `defineProps` (`:32`) + `defineEmits` (`:76`), so the
  `WritableComputedRef` async-round-trip stale-read hazard cannot arise. The reactive props
  destructure at `:25-45` is idiomatic Vue 3.5.
- **No `ValueUnit` construction, no `stableHue`, no direct `parseCssColor`, no reka slider.** Four of
  the six named local hazards do not touch this file at all.
- **`verbatimModuleSyntax` is clean.** All four type-only imports (`:12`, `:13`, `:14`, `:15`) use
  `import type`; the two value imports (`:2`, `:18`, `:23`) are used.
- **The sampler does not crash or emit garbage on degenerate operands.** Driven live through the
  offered spaces with `oklch(none none none)`, `""`, `"   "`, `currentColor`, `color-mix(…)`,
  `oklch(0.5 0.2 NaN)` → all `null` (honest absence, no throw); `transparent`, `rgb(0 0 0 / 0)`,
  `#000`, `oklch(0 0 0)`, `oklch(0.5 0.2 400)`, `color(display-p3 1 1 1)` → 17 well-formed stops, no
  `NaN`/`Infinity`/`undefined` in any of them. Achromatic pairs produce 17 **distinct** stops in
  `hsv`/`hwb`/`oklch` (`GRAY hsv longer: 17 stops; distinct=17`), so the `Math.atan2(0,0)=0`
  hue-collapse hazard does not degenerate the ramps.
- **Stop count is bounded.** 2 operands → 17 stops; 9 operands → 17 stops (`perSegment =
  max(2, ceil(16/segments)+1)`, joints deduped). No unbounded growth with operand count in any
  realistic range.
- **Nothing on `/#/mix` errors, overflows, or renders blank.** `REPORT.json`, all four matrices:
  `"consoleErrors": []`, `"pageErrors": []`, `"overflowX": 0`, `main: 1`. My own sessions saw one
  console error, the dev-server `VITE_API_URL` misconfiguration notice — environmental, not this
  component.
- **This component contributes nothing to the `/#/mix` tap-target count.** All 8 desktop rows in
  `REPORT.json` are the picker's channel handles (12×24) and the palette-name row (22×22 / 160×23);
  MixConfigBar's own controls measure 227×36 (triggers) and 462×40 (button), and its menu option
  rows 221×49.5 — every one clears 24 px.
- **The two `PreviewRamp` guards are not redundant-with-a-hole.** `MixConfigBar.vue:111`/`:133`
  guard `null`; `PreviewRamp.vue:31` guards `length >= 2`. The sampler cannot return a 1-element
  array, so no state slips between them.

---

## Findings table

| id | severity | one line |
|---|---|---|
| C-1 | BLOCKER | `variant="primary-audacious"` is not a glass-ui 7 prop; the verb ships `data-emphasis="secondary"`; typecheck green |
| C-2 | BLOCKER | the add-color affordance is an `aria-hidden` `<span>`; `canMix` unreachable; every preview chip permanently absent |
| C-3 | MAJOR | with ≥3 operands the ramp does not contain the color Mix produces |
| C-4 | MAJOR | in the default space `oklab` the Hue control is inert and its 4 chips identical (1 distinct of 4) |
| C-5 | MAJOR | the chip paints a continuous gradient — 16 of 17 columns browser-interpolated; 23.5/255 worst band on `longer` |
| C-6 | MAJOR | both chip oracles unreachable, the byte-identity regex cannot match the serialization, zero unit coverage |
| C-7 | MAJOR | three orphan `<label>`s (`control === null`, click inert) — the only such site in `demo/` |
| C-8 | MINOR | `rgba()`/`hsla()` comma forms throw; chip hides silently while the button stays armed to crash |
| C-9 | MINOR | `serializeStop`'s ` / 1)` strip is dead code |
| C-10 | MINOR | `h-9`/`h-10` de-tokenize heights glass-ui ships as `size` |
| C-11 | MINOR | reka `AcceptableValue` reach + three unchecked `as` casts |
| C-12 | MINOR | `<Blend>` lacks `aria-hidden` |
| C-13 | MINOR | `STRATEGIES` array not exhaustiveness-checked against `LeftoverStrategy` |
| C-14 | MINOR | disabled verb: no tab reach, no reason, no `aria-live` on the result |
| C-15 | INFO | per-render array identity invalidates both computeds; 0.72–1.03 ms, sub-frame |
| C-16 | INFO | no `<SelectValue placeholder>`; 9 rows offered for a 17-member union |

## Reproduction scripts

All under
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`:
`probe-configbar.mjs` (DOM identity, orphan labels, label-click), `probe-two.mjs` (button attrs,
contrast), `probe-three.mjs` (add-slot, menus, sampler cost + boundary matrix),
`probe-four.mjs` (alpha serialization, 3-operand ramp membership, gradient form),
`probe-five.mjs` (band interpolation error), `probe-six.mjs` (distinct arcs per space).
Each is `node <file>` against the live dev server on `:9000`.
