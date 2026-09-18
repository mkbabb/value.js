# CHALLENGE-C — `demo/workbenches/mix/MixConfigBar.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant), the
tier this seat was explicitly spawned with. Seat declared, not inherited.

## Verdict

**DEFECTIVE.** Eleven findings, three of them MAJOR. The component's headline verb ships styled by
a prop that **does not exist in glass-ui 7.0.0** and therefore renders in the wash tier the file's
own comment forbids; the Hue-method control and its four-chip preview quartet are **provably inert
in the app's shipped default color space**; and the *only* behavioural oracle for this component's
preview chips — the O-14 T-17 leg — is **RED on both tests right now**, so the T-17 feature has
never been verified in a live DOM.

Everything below is file:line, a pasted command run in this session, or a measured number.

---

## Scope read

| artifact | path |
|---|---|
| subject | `demo/workbenches/mix/MixConfigBar.vue` (173 lines, read whole) |
| parent | `demo/workbenches/mix/MixPane.vue` |
| state | `demo/workbenches/mix/composables/useMixingState.ts` |
| sampler | `demo/color-session/color-chips/sample.ts`, `PreviewRamp.vue`, `index.ts` |
| vocabulary | `demo/color-session/color-space-meta.ts`, `demo/palettes/mix.ts` |
| design system | `node_modules/@mkbabb/glass-ui/dist/components/{button,select,label,watercolor-dot}/*.d.ts` (v7.0.0) |
| tests | `test/preview-chips.test.ts`, `e2e/smoke/oracles/o14-preview-truth.spec.ts` |
| live | `http://localhost:9000/#/mix` (Chromium via Playwright MCP) + a full `playwright test` run |
| visual | `docs/tranches/V/megatranche/audit/visual/REPORT.json` + `shots/safari-desktop-light/mix.png` |

---

## C-1 · MAJOR — `variant="primary-audacious"` is not a glass-ui 7.0.0 prop. The page's ONE verb ships in the wash tier, and the dead attribute leaks into the DOM

`MixConfigBar.vue:162-167` renders the pane's primary command:

```vue
<Button
    variant="primary-audacious"
    :disabled="!canMix"
    class="h-10 gap-2 font-medium font-display"
    @click="emit('mix')"
>
```

`demo/ui/button/index.ts` is a one-line re-export: `export { Button } from "@mkbabb/glass-ui";`.
glass-ui 7.0.0's `ButtonProps` (`dist/components/button/Button.vue.d.ts`) is:

```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean; loading?: boolean; type?; disabled?; class?;
}
```

There is **no `variant`**. The token does not exist anywhere else either:

```
$ grep -rn "primary-audacious" --include='*.vue' --include='*.ts' --include='*.css' demo/ src/
demo/workbenches/mix/MixConfigBar.vue:163:            variant="primary-audacious"
demo/workbenches/generate/GenerateControls.vue:158:                        variant="primary-audacious"
$ grep -rn "primary-audacious" node_modules/@mkbabb/glass-ui/dist/
(no matches)
```

So `variant` falls through Vue's `$attrs` onto the host `<button>` as a raw invalid HTML attribute
and styles nothing. Measured in the live DOM at `http://localhost:9000/#/mix`:

```json
"attrs": [
  "data-slot=\"button\"", "data-emphasis=\"secondary\"", "data-tone=\"neutral\"",
  "data-size=\"md\"", "data-press-armed=\"\"", "type=\"button\"", "disabled=\"\"",
  "class=\"button tap-squish focus-ring glass-wash glass-capsule h-10 gap-2 font-medium font-display\"",
  "variant=\"primary-audacious\"",
  ...
]
"computed": { "bg": "oklab(0.915626 0.00551148 0.0130686 / 0.52)", "opacity": "0.5", "bgImage": "none" }
```

`data-emphasis="secondary"` is glass-ui's *default* — confirmed at
`node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js`: `emphasis: { default: "secondary" }`.
The applied recipe is `glass-wash glass-capsule`.

The file's own comment, `MixConfigBar.vue:158-161`, states the requirement and names the exact
failure that shipped:

> The page's ONE verb — the producer's deliberate-primary register … `default` is the quiet glass
> capsule and **read disabled-forever over the wash tier**.

The component shipped the wash tier. This is visible in the captured screenshot
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png` — the "Mix" capsule
at the bottom of the pane is a near-invisible washed plate, the weakest element on a pane whose
only purpose is that verb.

**The gate does not catch it.** The demo typecheck is HARD in CI (commit `ef57230b`) and green:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "EXIT=$?"
EXIT=0
```

`tsconfig.demo.json` `"include": ["demo/", "src/vite-env.d.ts"]` — the file is in the program.
`vue-tsc` accepts unknown attributes on a component with attribute fallthrough, so a retired
design-system prop is invisible to every gate in the repo.

**Cure (gestalt, not patch):** speak glass-ui 7's two orthogonal axes at the call site —
`<Button emphasis="primary" tone="accent">` (pick the tone the producer's primary register wants) —
and delete `variant` at both sites (`GenerateControls.vue:158` carries the identical corpse). If
"audacious" is a register the design system genuinely lacks, it is a glass-ui `emphasis` value,
authored in glass-ui (owner edict 4), never a demo-side string.

**Mechanism family (see also C-3):** *retired glass-ui-7 prop names still passed at demo call
sites; Vue's attribute fallthrough makes them silently inert, and vue-tsc reports nothing.*

---

## C-2 · MAJOR — in the shipped default space the Hue-method control is inert and its four preview chips are byte-identical. A lying preview, from the component that owns the pair

`MixConfigBar.vue:66-74` samples the four-arc quartet in the **current** color space:

```ts
const hueRamps = computed(() => new Map(
    HUE_INTERPOLATION_METHODS.map((m) => [m.value, sampleInterpolationRamp(operandColors, colorSpace, m.value)]),
));
```

`useMixingState.ts:44` sets the shipped default: `const colorSpace = ref<PickerSpace>("oklab")`.
`oklab` is rectangular — it has no hue channel, so `mixColors(..., {space:"oklab", hue})` ignores
`hue` entirely.

**Reproduction** (scratch suite, run against the real `sampleInterpolationRamp` with the exact
arguments the component passes):

```
$ npx vitest run --config <scratchpad>/vitest.probe.config.ts
OKLAB QUARTET distinct count: 1 of 4
  shorter:    oklch(62% 0.27 9.8deg) , oklch(60.876698725014% 0.257295474374 7.754769644922deg) , …
  longer:     oklch(62% 0.27 9.8deg) , oklch(60.876698725014% 0.257295474374 7.754769644922deg) , …
  increasing: oklch(62% 0.27 9.8deg) , oklch(60.876698725014% 0.257295474374 7.754769644922deg) , …
  decreasing: oklch(62% 0.27 9.8deg) , oklch(60.876698725014% 0.257295474374 7.754769644922deg) , …

  distinct arcs per listed space (operands: oklch(0.62 0.27 9.8) → rebeccapurple)
  oklch  2/4      lab    1/4      hsv    2/4      xyz    1/4
  oklab  1/4      lch    2/4      hwb    2/4
  hsl    2/4      rgb    1/4
```

**Four of the nine spaces the component offers** (`oklab`, `lab`, `rgb`, `xyz` —
`color-space-meta.ts:26-36`) are rectangular. In all four, the Hue-method Select changes **nothing
about the mix** (`useMixingState.ts:89` forwards `hueMethod` into `mixColorSequence` →
`mixColors`, which ignores it) and the dropdown renders **four identical chips**. The default state
of the app — the state the visual audit captured, `shots/safari-desktop-light/mix.png` shows
`COLOR SPACE: OKLab` / `HUE METHOD: Shorter` — is one of them.

The 2/4 result for cylindrical spaces is *not* a defect: `shorter` is always one of
`increasing`/`decreasing` and `longer` is the other, so two distinct arcs is the mathematical
ceiling. The 1/4 result is the defect.

This is precisely what the T-17 law the file cites exists to forbid. `sample.ts:15-19` and
`o14-preview-truth.spec.ts:6`:

> **THE TRUTH LAW (O-14): a chip that approximates the library output is FORBIDDEN.** … *a lying
> preview is worse than none.*

A quartet of four identical chips under four different arc names is a preview asserting a
distinction that does not exist. And the `<PreviewRamp v-if="…">` honest-absence guard
(`MixConfigBar.vue:133`) does not fire here: the ramps are non-null, just identical.

MixConfigBar holds `colorSpace` in hand (`MixConfigBar.vue:26`) and uses it for nothing but
sampling. It has every fact needed to know the control is inert and renders it as live.

**Cure:** the space vocabulary already exists in a neutral home; give it the fact it is missing —
add `cylindrical: true` to the five hue-bearing entries in `INTERPOLATION_SPACES`
(`color-space-meta.ts`), then in MixConfigBar bind `:disabled="!isCylindrical(colorSpace)"` on the
Hue-method `<Select>` (glass-ui `SelectProps.disabled` exists, `Select.vue.d.ts`) and skip the
`hueRamps` computation entirely in that branch. One fact, added once, consumed by the two surfaces
(Mix and Gradient) that already share the module. No new module, no wrapper.

---

## C-3 · MAJOR — both T-17 chip oracles are RED right now; the component has zero unit coverage; and beneath the red, the byte-identity assertion is itself incapable of matching the stamp

### (a) The e2e legs are RED — measured, this session

```
$ npx playwright test e2e/smoke/oracles/o14-preview-truth.spec.ts --project=smoke -g "T-17 chip referent"
Running 3 tests using 1 worker
  1) o14-preview-truth.spec.ts:346:5 › every open-menu chip's painted gradient carries exactly its stamped stops
     Test timeout of 30000ms exceeded.
     Error: locator.click: Test timeout of 30000ms exceeded.
       - waiting for getByRole('button', { name: 'Add current color to the mix' })
     > 355 |         await addSlot.click();
  2) o14-preview-truth.spec.ts:404:5 › the chip feasibility leg: every preview chip is perceptible …
     Test timeout of 30000ms exceeded.
       - waiting for getByRole('button', { name: 'Add current color to the mix' })
     > 414 |         await addSlot.click();
  2 failed
  1 passed (1.3m)
```

The one passing test is `honest absence: with <2 operands the rows carry NO chip` — it asserts the
chips are **absent**. Every test that would exercise a *rendered* chip is red. **MixConfigBar's
preview ramps have no green verification in any live DOM.**

Root cause is the C-1 mechanism again, one component over: `MixSourceSelector.vue:167-171` renders

```vue
<WatercolorDot key="__add__" variant="ghost" tag="button" seed="mix-add-slot"
    aria-label="Add current color to the mix" …>
```

and glass-ui 7.0.0's `WatercolorDot` props (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`)
are exactly `{ color, variant, animate, cycleDuration, range, seed }` — **no `tag`, no `as`, no
`asChild`**. So the dot renders its default non-interactive host and `getByRole("button", …)` can
never resolve. Confirmed in the failing run's own page snapshot
(`test-results/oracles-o14-preview-truth--e0bf9-…/error-context.md:137-142`) — the "Selected"
region contains no button at all:

```yaml
- generic [ref=e129]:
  - generic [ref=e130]:
    - group [ref=e132]: [button "Colors" [pressed], button "Palettes"]
    - generic [ref=e136]: Selected      # ← the add-slot ghost is not a button
```

(That call site belongs to the `wb-mix-sourceselector` seat; it is reported here because it is the
proximate cause of *this* component's oracle being red, and because it is the same defect family.)

### (b) Beneath the red, the assertion cannot pass either

`o14-preview-truth.spec.ts:162-168` parses stops with

```js
/oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g
```

but `serializeStop` (`sample.ts:39-41`) emits `colorToCss(stop, "oklch")`, whose real output is
`oklch(62% 0.27 9.8deg)` — a `%` on L and `deg` on H. The regex's first group is `[\d.]+`, which
cannot consume `62%`.

```
$ node -e '<the spec regex>'
"oklch(62% 0.27 9.8deg)"                                    -> []
"oklch(60.876698725014% 0.257295474374 7.754769644922deg)"  -> []
"oklch(0% 0 none)"                                          -> []
"oklch(100% 0 none / 6.25%)"                                -> []
```

Meanwhile the browser canonicalizes the painted gradient (measured live, Chrome 150):

```json
{"stamped":"oklch(62% 0.27 9.8deg)",
 "computed":"linear-gradient(90deg, oklch(0.62 0.27 9.8), oklch(0.62 0.27 9.8))"}
{"o14":{"paintedCount":2,"stampedCount":0}}
```

So `expect(painted.length).toBe(stamped.length)` at line 377 would evaluate `expect(17).toBe(0)`
per chip. The feasibility leg's `expect(m.count).toBeGreaterThanOrEqual(2)` at line 537 uses the
same broken regex on the *painted* string, so it survives only by accident of canonicalization.

### (c) There is no unit coverage of the component at all

```
$ grep -rn "MixConfigBar" . --include='*.ts' --include='*.vue' -l | grep -v node_modules
demo/workbenches/mix/MixPane.vue
demo/color-session/color-chips/index.ts        (a doc comment)
```

No test mounts it. `test/preview-chips.test.ts` tests `sample.ts` in isolation — the sampler
function, never the component's wiring: not `spaceRamps`' space×hue cross-product
(`MixConfigBar.vue:57-65`), not `hueRamps`', not the `v-if` guard, not the emit casts.

**The vacuous-gate mutation, named exactly:** delete both `<PreviewRamp …/>` elements
(`MixConfigBar.vue:111` and `:133`). `npm test` stays fully green (nothing imports the component);
the one passing e2e leg — `honest absence … the rows carry NO chip` — stays green *because the
chips are now unconditionally absent*; the two red legs stay red. The entire T-17 feature can be
deleted from this component without turning a single gate a different colour.

**Cure:** (1) fix the add-slot host so the flow is drivable (`wb-mix-sourceselector`); (2) replace
`parseOklchTriples` with a real parse of the sampler's own serialization — the sampler already owns
`stampStops`, so the honest referent is `data-stops.split("|")` compared to painted stops through
one shared normalizer, not a hand-written regex that has never matched the format it claims to
parse; (3) add a `@vue/test-utils` mount of MixConfigBar (the harness is already a devDependency)
asserting one thing the sampler cannot: that row *i* of the Space menu carries the ramp for space
*i* and not for the current space — the cross-product wiring is the only logic this file owns.

---

## C-4 · MAJOR (a11y) — three `<label>` elements that label nothing, while glass-ui's `Label` (with a `for` prop) sits re-exported and unused

`MixConfigBar.vue:98`, `:121`, `:145`:

```vue
<label class="section-label">Color space</label>
<label class="section-label">Hue method</label>
<label class="section-label">Size mismatch</label>
```

No `for`, no nested labelable control. Measured live:

```json
"labels": [
  {"text":"Color space","htmlFor":"","control":null,"id":null},
  {"text":"Hue method","htmlFor":"","control":null,"id":null},
  {"text":"Size mismatch","htmlFor":"","control":null,"id":null}
]
```

`HTMLLabelElement.control === null` for all three: per HTML, a `label` with neither `for` nor a
labelable descendant has **no labeled control**. Consequences, both real:

1. **Clicking the visible label does nothing** — it does not focus or open the Select. Users click
   labels; this one is inert.
2. The accessibility tree shows the text as an orphan static node adjacent to the combobox, not as
   its name — Playwright AX snapshot, both live and in the e2e failure context
   (`error-context.md:144-148`):

   ```yaml
   - generic [ref=e141]: Color space
   - combobox "Color space" [ref=e142]:
       - generic: OKLab
   ```

The name survives only because `aria-label` is hand-duplicated on the trigger
(`MixConfigBar.vue:100`, `:123`, `:147`) — the same string authored twice, which is exactly how
name/label drift starts. (WCAG 2.5.3 is currently satisfied: `"Size mismatch"` is a prefix of
`aria-label="Size mismatch strategy"`. That is luck, not design.)

glass-ui 7.0.0 exports the primitive for this and the demo already re-exports it —
`demo/ui/label/index.ts`: `export { Label } from "@mkbabb/glass-ui";` — with
`LabelProps { for?: string; requirement?: "required"|"optional"; disabled?: boolean }`.

**Cure:** `<Label for="mix-space">Color space</Label>` + `id="mix-space"` on the trigger, and drop
the duplicated `aria-label`s. One name, authored once, in the design system's own primitive
(owner edict 4).

---

## C-5 · MINOR — `class="h-9"` de-tokenizes the trigger height to the exact value glass-ui already ships as `size="sm"`

`MixConfigBar.vue:100`, `:123`, `:147` all carry `<SelectTrigger … class="h-9">`.

glass-ui's SelectTrigger computes its height from a **token**
(`dist/select-BcBAyLXA.js:98-101`):

```js
switch (n.size) { case "sm": return "h-(--control-h-sm)"; default: return "h-(--control-h-md)"; }
```

and merges consumer `class` through `tailwind-merge`, which drops the conflicting utility. Measured
live — the token class is **gone** from the rendered element:

```json
"triggerClass": "control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring … h-9",
"triggerHeight": "36px",
"tokens": { "controlHsm": "max(calc(2.25rem * 1), 0px)",   // 36px
            "controlHmd": "max(calc(2.5rem * 1), 0px) " }  // 40px
```

`h-9` = 2.25rem = 36px = **exactly `--control-h-sm`**. The component hardcodes a per-instance pixel
height that the design system already exposes as a named register, and in doing so severs the
control from the token — a future retune of `--control-h-sm` will move every control in the app
except these three.

Same idiom on the Button: `class="h-10 gap-2 font-medium font-display"` (`MixConfigBar.vue:165`)
while `ButtonProps.size: "xs"|"sm"|"md"|"lg"` exists.

**Cure:** `<SelectTrigger size="sm">` ×3; drop `h-9`. For the Button, express the register through
`size`/`emphasis`/`tone` (which also fixes C-1) rather than a class costume.

---

## C-6 · MINOR (a11y) — the decorative `<Blend>` icon is exposed as a nameless `img` node inside the button

`MixConfigBar.vue:168`: `<Blend class="w-4 h-4" />` — no `aria-hidden`. `@lucide/vue` does not set
it. Measured AX tree (`error-context.md:155-157`):

```yaml
- button "Mix" [disabled]:
  - img
  - text: Mix
```

A bare `img` node with no accessible name inside the control. The sibling component gets this right
— `MixSourceSelector.vue:174`: `<Plus class="w-5 h-5 …" aria-hidden="true" />` — so this is an
inconsistency inside the same feature, not a house style.

**Cure:** `<Blend class="w-4 h-4" aria-hidden="true" />`.

---

## C-7 · MINOR — the component reaches past the design system into `reka-ui` for a type that is wider than glass-ui's actual contract, then launders it with three unchecked casts

`MixConfigBar.vue:15` `import type { AcceptableValue } from "reka-ui";` and three handlers
(`:99`, `:122`, `:146`) of the form:

```vue
@update:model-value="(v: AcceptableValue) => emit('update:colorSpace', v as PickerSpace)"
```

glass-ui 7.0.0's emit is narrower and stable (`Select.vue.d.ts` + `_shared/selection.d.ts`):

```ts
export interface SelectEmits { "update:modelValue": [value: SelectionValue]; ... }
export type SelectionValue = string | number;
```

reka's `AcceptableValue` includes `Record<string, any> | null`. So the handler advertises it accepts
values glass-ui will never send, and `as PickerSpace` is an unchecked narrowing from a union that
contains `null` — a masking cast (owner edict 2: no masking fallbacks). It also pins the demo to
`reka-ui`, a **devDependency**, for a contract glass-ui 7 deliberately narrowed so consumers would
not need reka at all. Five demo components carry the same reach (`GradientVisualizer.vue:28`,
`GenerateControls.vue:33`, `AuroraPane.vue:25`, and this file).

**Cure:** annotate `(v: string | number)` — the literal `SelectionValue` — and narrow honestly with
a membership check against `INTERPOLATION_SPACES` / `HUE_INTERPOLATION_METHODS` (both already
imported, both already the source of the rendered rows) instead of `as`. That also closes C-11.
Deleting the `reka-ui` import from the demo tree is the architectural half.

---

## C-8 · MINOR — the leftover-strategy vocabulary is duplicated inside the component, against the precept the file itself cites eight lines earlier

`MixConfigBar.vue:83-89`:

```ts
const STRATEGIES: LeftoverStrategy[] = ["discard", "repeat", "distribute"];
const strategyLabels: Record<LeftoverStrategy, string> = { discard: …, repeat: …, distribute: … };
```

`LeftoverStrategy` is owned by `demo/palettes/mix.ts:19`. The `Record` is exhaustiveness-checked by
TypeScript; the **array is not** — adding a fourth strategy to the union compiles clean and the new
strategy silently never appears in the menu. Meanwhile `MixConfigBar.vue:16-18` states the opposite
principle for the other vocabulary:

> S.W5-6 · F16: the interpolation vocabulary lives in its neutral @lib/ home … no more cross-feature
> reach.

The interpolation vocabulary was moved out; the strategy vocabulary was left behind in the view.

**Cure:** put label+value metadata beside the type it describes in `demo/palettes/mix.ts` (the same
shape `color-space-meta.ts` uses) and import it. Zero new modules — the neutral home already exists.

---

## C-9 · MINOR (a11y) — the pane's only verb is natively `disabled` by default: no reason, no tab reach, and the async result is never announced

Measured live: `{"disabled": true, "ariaDisabled": null, "opacity": "0.5"}`.

`canMix` (`useMixingState.ts:50-53`) requires ≥2 selections, so the button is disabled on **every
cold load of `/#/mix`**. A native `disabled` button is removed from the tab order entirely, so a
keyboard or screen-reader user cannot reach it to discover it exists or why it is unavailable —
there is no `aria-describedby`, no hint text, and nothing on the page says "pick two". Combined
with the C-1 wash register and `opacity: 0.5`, the screenshot shows it as the faintest thing on the
pane.

Separately: the mix result is asynchronous from the user's point of view (the phase machine opens a
narration window, `useMixingState.ts:100`) and lands in `MixResultDisplay` with **no `aria-live`
region anywhere in the chain** (`MixPane.vue:111-119`) — an assistive-tech user gets no
announcement that the mix completed.

**Cure:** keep the button focusable and use `aria-disabled` + a short `aria-describedby` hint on the
disabled state (glass-ui `ButtonProps.disabled` accepts the native attribute, so this is a call-site
choice), and give the result plate `role="status"`. The `aria-live` belongs on the result surface,
not here — noted so the mix seat does not drop it between components.

---

## C-10 · INFO — the "costs nothing at rest" claim holds; the invalidation source does not

`MixConfigBar.vue:19-22` claims the sampling "costs nothing at rest". That is **true**: `computed`
is lazy and glass-ui's SelectContent unmounts when closed, so the `#description` slot never reads
the maps. Verified by the one green e2e leg (0 `[data-stops]` in a closed menu) and by a live probe
(9 option rows, `chips: 0` each, with <2 operands).

The residual cost is on the invalidation side. `MixPane.vue:103` passes

```vue
:operand-colors="mode === 'colors' ? selectedColors.map((sc) => sc.css) : []"
```

— a **new array identity on every MixPane render**, so both computeds invalidate on renders where
nothing changed by value. Measured cost of one full recompute of both maps (9 spaces + 4 arcs,
`RAMP_SAMPLE_COUNT = 16`):

```
operands=2: 0.638 ms      operands=3: 0.506 ms      operands=5: 0.512 ms
```

Sub-frame, so MINOR-adjacent at worst — but it is unnecessary work triggered by a prop contract the
parent recreates per render. **Cure:** hoist to a `computed` in `MixPane` (stable identity while the
selection is unchanged). Recorded as INFO because I did not measure a user-visible consequence.

---

## C-11 · INFO — `<SelectValue />` has no `placeholder`, and the offered vocabulary is a strict subset of the prop's type

`PickerSpace = SpaceId` (`demo/color-session/picker-color.ts:35`) — the full library union
(`rgb, hsl, hsv, hwb, lab, lch, oklab, oklch, xyz, kelvin, ictcp, jzazbz, prophotoRgb, rec2020,
a98Rgb, displayP3, linearSrgb`). `INTERPOLATION_SPACES` offers **9**. `<SelectValue />`
(`MixConfigBar.vue:101`) carries no `placeholder`, so a `colorSpace` outside the 9 renders a
**blank trigger** with no fallback text.

Not live-reachable today — `colorSpace` is a `ref` local to `useMixingState` and only this Select
writes it. Labelled a **hypothesis** on reachability; the type hole is factual. It becomes live the
moment mix state is lifted, persisted to a URL, or shared with the picker's 17-space catalog.
The C-7 membership-check cure closes it structurally.

---

## Negative proof — what I checked and did NOT find

Stated so the absence is evidence, not silence.

- **No hazard-class code in this file.** Full read of all 173 lines: no `requestAnimationFrame`
  (no PRM-RAF exposure), no `addEventListener`, no `ResizeObserver`/`IntersectionObserver`, no
  timers, no `onMounted`/`onUnmounted`, no async, no fetch, no WebGL. Nothing to leak and nothing
  to clean up — the missing-cleanup and ungated-loop classes are genuinely absent here.
- **No `defineModel`.** The component uses explicit `defineProps` + `defineEmits`
  (`MixConfigBar.vue:32`, `:76`), so the `WritableComputedRef` stale-read hazard cannot arise. The
  reactive props destructure at `:25-45` is idiomatic Vue 3.5.
- **No `ValueUnit` construction, no `stableHue`, no `parseCssColor` call, no reka slider.** The
  four named local hazards do not touch this file. `parseColorIn` is reached only through
  `sample.ts:62`, which is already `try`/`catch`-guarded and returns `null` on failure.
- **Boundary operands do not crash or emit garbage.** I drove the sampler through all 9 offered
  spaces × 5 degenerate pairs (achromatic, identical, α=0, out-of-gamut `oklch(1.4 0.9 120)` /
  `oklch(-0.2 0.5 300)`, hue `±100000`): 45 cases, **zero throws**, zero `NaN`/`Infinity`/
  `undefined` in any stop. `hsl` returns `null` for achromatic and α=0 pairs (honest absence, the
  chip is correctly omitted). Achromatic stops serialize as `oklch(0% 0 none)` — valid CSS Color 4
  and confirmed to paint in the browser (`computed: "linear-gradient(90deg, oklch(0 0 none), …)"`).
- **Zero console errors, zero page errors, zero horizontal overflow on `/#/mix`** across all four
  capture matrices (`REPORT.json`, `/#/mix` rows: `"consoleErrors": []`, `"pageErrors": []`,
  `"overflowX": 0`).
- **This component contributes nothing to the measured tap-target or nameless-button counts.** The
  8 small tap targets on `/#/mix` are all dock/picker: `160×23 input` (unnamed), `22×22` ×3
  ("Switch to slug", "Generate new slug", "Cancel"), `12×24` ×4 (L/A/B/ALPHA channel). The 1
  nameless button is `button.send-btn` at `24×24` under `div.dock-face-content` (measured live).
  MixConfigBar's own controls measure **36px** (triggers), **40px** (button), and **49px** (menu
  option rows, measured with the menu open) — all clear of the 24px floor.
- **The `#description` slot is real.** `SelectItemProps` slots in glass-ui 7.0.0 are
  `{ default, description }` — the lane the component uses exists, and the trigger correctly shows
  only the label (`combobox "Color space": generic: OKLab`), confirming the comment at
  `MixConfigBar.vue:104-106`.
- **`verbatimModuleSyntax` is satisfied.** All five type-only imports (`:12`, `:13`, `:14`, `:15`)
  use `import type`; `:18` and `:23` are genuine value imports. `npx vue-tsc -p tsconfig.demo.json`
  exits 0.
- **No god module, no legacy shim, no invented `shared/` directory** inside this file. It is 173
  lines with one job.

---

## Defect ledger

| id | severity | defect | mechanism |
|---|---|---|---|
| C-1 | MAJOR | `variant="primary-audacious"` is not a glass-ui 7 prop; the primary verb ships `emphasis="secondary"`/`glass-wash` with a dead DOM attribute | retired design-system prop name, silent attr fallthrough, invisible to vue-tsc |
| C-2 | MAJOR | Hue-method control + its 4-chip preview are inert in 4 of 9 spaces, including the shipped default `oklab` (measured 1/4 distinct) | the component holds `colorSpace` and never uses it to gate the hue axis |
| C-3 | MAJOR | Both T-17 chip e2e legs RED; zero unit coverage of the component; the byte-identity regex matches 0 of the stamped stops | oracle depends on a locator killed by the same retired-prop family; hand-written regex never matched the serializer's real format |
| C-4 | MAJOR | 3 `<label>`s with `control === null`; name duplicated as `aria-label` | hand-rolled label instead of glass-ui `Label for=` |
| C-5 | MINOR | `class="h-9"` drops glass-ui's `h-(--control-h-md)` token; equals the existing `size="sm"` register exactly | per-instance costume over a parameterized root register |
| C-6 | MINOR | decorative `<Blend>` exposed as a nameless `img` in the AX tree | missing `aria-hidden` (sibling component does it right) |
| C-7 | MINOR | `reka-ui` `AcceptableValue` reach + 3 unchecked `as` casts, wider than glass-ui's `string \| number` | design-system bypass + masking cast |
| C-8 | MINOR | `STRATEGIES` array duplicated in the view, non-exhaustive | vocabulary left in the consumer, against the file's own cited precept |
| C-9 | MINOR | pane's one verb natively `disabled` on cold load: no reason, no tab reach; no `aria-live` for the result | disabled-state and async-result a11y never authored |
| C-10 | INFO | parent recreates `operandColors` per render → 0.5 ms full resample on no-op renders while a menu is open | unstable prop identity |
| C-11 | INFO | `<SelectValue />` has no placeholder; `PickerSpace` (17) ⊃ offered (9) → blank trigger if ever out of set | type wider than the vocabulary; not live-reachable today |

## Strongest defect

**C-1.** The component's single most important element — "the page's ONE verb", by its own
comment — is styled by a prop that does not exist in the installed design system. It renders in the
quiet wash tier the comment explicitly warns against, it leaks an invalid `variant` attribute into
production HTML, it is visible in the shipped screenshot, and it passes a CI-hard typecheck. C-2 is
the deeper defect (the product lies to the user in its default state) and C-3 explains why neither
was caught, but C-1 is the one with no ambiguity and no product decision attached: the prop name is
simply wrong.
