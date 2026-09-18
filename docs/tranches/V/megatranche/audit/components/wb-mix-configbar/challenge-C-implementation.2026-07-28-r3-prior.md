# CHALLENGE-C — `demo/workbenches/mix/MixConfigBar.vue` — implementation (r3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
variant. This seat was spawned with an explicit Opus 5 declaration and I am serving it as
declared. Nothing here is inherited or undeclared.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`,
glass-ui `7.0.0` installed.

**Pass note.** Two prior passes of this seat exist. Both are preserved verbatim:
`challenge-C-implementation.2026-07-27-r1-prior.md` and
`challenge-C-implementation.2026-07-28-r2-prior.md`. I did **not** inherit their numbers.
I re-derived every load-bearing measurement from scratch this session, by my own scripts,
before reading r2 — and I read r2 only after my own probes were complete, specifically so
that the confirmations below are independent rather than sympathetic.

- **[CONFIRMED]** — r2 claimed it; I reproduced it independently, by a different method.
- **[SHARPENED]** — r2 was right, but the evidence or the cure is now more precise.
- **[NEW]** — not present in r1 or r2.

**One r2 claim is upgraded from assertion to executed fact**: r2 wrote that both chip e2e
legs "can only time out." I ran them. They do (`2 failed / 1 passed`, output pasted at
§C-2).

---

## Verdict

**DEFECTIVE.** r2's sixteen findings survive re-measurement — I could not falsify a single
one — plus three new findings and two new negative proofs.

The shape of the defect is unchanged and worth restating in one sentence, because the
sentence is the finding: **this component's two most important props do not exist in the
installed design system, and no gate in the repository is capable of noticing.** The pane's
only verb is styled by a `variant` glass-ui 7 does not declare, so it ships in the wash
tier its own source comment forbids. One component over, by the identical mechanism, the
only affordance that could ever enable that verb is a non-interactive `aria-hidden`
`<span>`. Everything downstream — `canMix`, `operandColors`, all thirteen preview ramps,
the entire T-17 feature this file exists to host — is therefore unreachable in the shipped
app, and the oracle built to catch exactly that is red for exactly that reason.

---

## Scope read

| artifact | path |
|---|---|
| subject | `demo/workbenches/mix/MixConfigBar.vue` — 173 lines, read whole |
| parent / state | `MixPane.vue`, `composables/useMixingState.ts` |
| proximate cause of C-2 | `MixSourceSelector.vue` |
| sampler | `demo/color-session/color-chips/{sample.ts,PreviewRamp.vue,index.ts}` |
| vocabulary | `demo/color-session/color-space-meta.ts`, `picker-color.ts`, `demo/palettes/mix.ts` |
| library | `src/color/operations.ts`, `src/color/anchors.ts` |
| design system | `node_modules/@mkbabb/glass-ui@7.0.0/dist/**` — `.d.ts` unions + shipped runtime chunks |
| tests | `test/preview-chips.test.ts`, `e2e/smoke/oracles/o14-preview-truth.spec.ts`, `e2e/smoke/safari/mix-flow.spec.ts` |
| live | `http://localhost:9000/#/mix` — 8 headless Chromium sessions this pass |
| visual | `audit/visual/REPORT.{md,json}`; `shots/safari-desktop-light/mix.png` and `shots/safari-mobile-light/mix.png` read visually |

---

## What I executed this pass

| probe | command / method | result |
|---|---|---|
| P1 | full read of the 173-line SFC + 9 dependency modules | — |
| P2 | vitest probe: arc distinctness × all 9 offered spaces | §C-4 |
| P3 | vitest bench: full 13-ramp rebuild @ 2/6/12 operands | negative proof |
| P4 | vitest probe: O-14 regex vs. real `stampStops` output | §C-6 |
| P5 | `npx playwright test --project=smoke o14-preview-truth.spec.ts -g "T-17"` | **2 failed / 1 passed** |
| P6 | `npx vue-tsc -p tsconfig.demo.json --noEmit` | **EXIT=0** |
| P7 | 8 Chromium probes: DOM attrs, computed styles, label association, forced-click reachability, option a11y names, mode-switch geometry | §C-1,2,7 + §N-1,3 |
| P8 | glass-ui 7.0.0 `.d.ts` prop-union reads: `Button`, `WatercolorDot`, `SelectTrigger`, `SelectItem`, `SelectContent`, `Select` | §C-1,2,10,11 |
| P9 | visual read of desktop + mobile `/#/mix` shots | §N-2 |

Temporary vitest probes were written into `test/`, run, and **deleted** in the same command.
The tree is unmodified; `git status` shows no new tracked files from this seat.

---

# Part 1 — new findings

## N-1 · MAJOR — the pane's only verb jumps 208 px down the page on a mode switch, un-animated; this component owns 73 px of it **[NEW]**

`MixConfigBar.vue:144` gates the leftover-strategy block on a bare `v-if`:

```vue
<div v-if="showLeftoverStrategy" class="flex flex-col gap-1">
```

No `<Transition>`, no reserved space. Measured live — the component's own root
(`.flex.flex-col.gap-3`, the element containing the Color-space trigger):

```
configbar colors   : {"h":114,"children":2}
configbar palettes : {"h":187,"children":3}
```

**+73 px, instantly**, entirely inside this component. And the Mix button's own viewport
position across the same switch:

```
MIX BUTTON y — colors: 497 | palettes: 705 | SHIFT: 208px
```

The remaining 135 px is `MixSourceSelector` growing its palette list; the 73 px is this
file's. A user who has just clicked the "Palettes" tab and moves toward the Mix button
finds it two hundred pixels lower than where it was rendered a frame earlier — the pane's
single most important target, displaced, with no motion to carry the eye.

The component is not ignorant of the idiom. Its own parent wraps the far less important
result plate in one — `MixPane.vue:111`:

```vue
<Transition name="vj-morph" mode="out-in">
```

So the pane transitions the *outcome* and hard-cuts the *controls*. That is backwards.

Owner edict 6 is also live here: this is precisely a case where an animation was never
authored rather than deleted, but the house grammar (`vj-morph`, already tokenized and
already in this pane) exists and is unused at the one seam that most needs it.

**Cure.** Wrap the leftover block in the pane's existing `vj-morph` transition, or — better,
and KISS — reserve the row's height so the verb does not move at all. No new tokens, no new
component; the grammar is already in the file next door.

---

## N-2 · negative proof **[NEW]** — the mobile render is clean, and `text-micro` is a real utility

Two hypotheses I formed from the code and then killed with evidence. Recorded because a
challenge seat that only reports hits is not measuring, it is confirming.

**(a) `grid grid-cols-2` at `:94` is unconditional — I expected mobile truncation.** It does
not truncate. Read visually, `shots/safari-mobile-light/mix.png` (390 px viewport): the two
mono-caps eyebrows "COLOR SPACE" and "HUE METHOD" sit on one line each, both triggers render
their full values ("OKLab", "Shorter") with the chevron intact, nothing wraps, nothing
clips. `REPORT.json` corroborates `overflowX: 0` on both mobile matrices. **Not a finding.**

**(b) `class="text-micro"` (`:112`, `:134`) is absent from `demo/styles/`** — I checked,
because an undefined utility would silently render the descriptions at inherited size:

```
$ grep -rn "text-micro" demo/styles/*.css      → (no matches)
$ grep -rl "text-micro" node_modules/@mkbabb/glass-ui/dist/
node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css   ← defined here
node_modules/@mkbabb/glass-ui/dist/styles/components.css
```

It is a glass-ui typography utility, correctly consumed from the design system. **Not a
finding** — and a small point in the component's favour on edict 4.

---

## N-3 · INFO / producer relay **[NEW]** — the `#description` lane carries the only remaining copy of the space vocabulary, and it is orphaned in the accessibility tree

`MixConfigBar.vue:95-96` records a deliberate deletion:

> W5-7: the permanent subtitles died — the dropdown's own `#description` rows already tell
> the story once, on demand.

So the descriptions ("Perceptual, hue-preserving", "Nearest arc", …) now exist in exactly
one place: the `#description` slot. Measured live, first option of the Color-space menu:

```json
{ "textContent": "OKLCh Perceptual, hue-preserving",
  "ariaLabel": null,
  "aria-describedby": null }
```

and the option's computed **accessible name is exactly `"OKLCh"`** —
`getByRole("option", { name: "OKLCh", exact: true })` resolves to 1. The description spans
are *not* `aria-hidden` (measured `aria-hidden: null` on both), so they are loose text
inside the option node: not part of the name, and not bound by `aria-describedby` to
anything. Most screen readers will read the option's contents anyway; none will present it
as the *description* it is authored to be, and no programmatic relationship exists.

The `#description` slot is glass-ui's (`SelectItem.vue.d.ts` declares
`description?: (props: {}) => any`), so the wiring belongs to the producer, not here.
**Relayed per the standing glass-ui BH/BI edict**: a slot named `description` should
generate an `id` and an `aria-describedby` on its option. Filed as INFO against this
component because the W5-7 deletion is what made the lane load-bearing.

---

# Part 2 — r2's findings, independently re-measured

I re-derived each of these before reading r2. All sixteen survive. The three I could most
plausibly have falsified — C-1, C-4, C-6(b) — are the three I attacked hardest.

## C-1 · BLOCKER **[CONFIRMED + SHARPENED]** — `variant="primary-audacious"` is not a glass-ui 7 prop; the verb ships `data-emphasis="secondary"`

`MixConfigBar.vue:163`. glass-ui 7.0.0's `ButtonProps`
(`dist/components/button/Button.vue.d.ts:4-19`) declares
`emphasis | tone | size | iconOnly | loading | type | disabled | class` — **no `variant`**;
`ButtonEmphasis = "primary" | "secondary" | "quiet" | "text"`. Measured live:

```json
"outerHTMLStart": "<button data-slot=\"button\" data-emphasis=\"secondary\" data-tone=\"neutral\" data-size=\"md\" … class=\"button tap-squish focus-ring glass-wash glass-capsule h-10 gap-2 font-medium font-display\" variant=\"primary-audacious\" …>"
```

`variant` renders as a raw invalid HTML attribute; the resolved register is `secondary`;
the applied recipe is `glass-wash glass-capsule`. The file's own comment at `:158-161`
names the exact failure that shipped: *"`default` is the quiet glass capsule and read
disabled-forever over the wash tier."*

**[SHARPENED] — why this was so easy to write and so impossible to catch.** r2 reported
"the token exists nowhere in the package." That is true of `primary-audacious`, but the
sharper fact is that **`audacious` is a live glass-ui register on three other axes**:

```
$ for f in $(grep -rl "audacious" node_modules/@mkbabb/glass-ui/dist/); do … done
dist/class-names-*.js                     display-audacious
dist/composables/motion/spring/springPresets.d.ts   audacious
dist/styles/typography/scale.css          --type-display-audacious
dist/styles/typography/semantic.css       text-display-audacious
dist/components/dock/styles/density.css   --dock-density-audacious-*
$ grep -rl "primary-audacious" node_modules/@mkbabb/glass-ui/dist/   → (no matches)
```

`audacious` is a typography scale, a spring preset, and a dock density. It is not a Button
emphasis. The author composed a plausible token out of a real system word applied to the
wrong axis — the most reliable way to produce a dead prop, and the reason a reviewer
reading the diff would not have flinched either.

Corroborated visually in both `shots/safari-desktop-light/mix.png` and
`shots/safari-mobile-light/mix.png`: the Mix capsule is the faintest element on a pane
whose entire purpose is that verb.

**The gate is structurally blind.** `npx vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`
on this tree (I ran it; ~4 min). And I independently verified r2's diagnosis of *why*:

```
$ grep -n "vueCompilerOptions" tsconfig*.json vite.config.ts package.json
EXIT=1   (no output — absent)
```

No `vueCompilerOptions` anywhere, so `strictTemplates` defaults **off** and unknown
component attributes are never checked. Demo typecheck has been HARD in CI since `ef57230b`
and cannot see this class of error at all.

**Cure.** `emphasis="primary"` (+ `tone` if a warmer register is wanted); delete `variant`
here and at the only other carrier, `GenerateControls.vue:158`. Structurally:
`strictTemplates: true`, which converts this entire family from invisible to compile-RED.

---

## C-2 · BLOCKER **[CONFIRMED — and executed]** — the Mix verb is unreachable; the add-color affordance is a non-interactive `aria-hidden` `<span>`

`MixSourceSelector.vue:164-176` passes `tag="button"` to `WatercolorDot`. glass-ui 7.0.0's
`WatercolorDot` prop union (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) is
exactly `{ color, variant?, animate?, cycleDuration?, range?, seed? }` — **no `tag`** — and
the shipped runtime hard-codes the root style:

```
dist/watercolor-dot.js (offset ~3507)
  style: u([f.value, { backgroundColor: …, borderRadius: m(b), pointerEvents: "none", … }])
```

Measured live:

```json
{ "byAriaLabel": 0,
  "addSlotGhost": [{ "tag": "SPAN", "aria": null, "role": null,
                     "html": "<span … aria-hidden=\"true\" class=\"add-slot-ghost w-11 h-11 …\"" }] }

{ "before": 0, "after": 0, "mixDisabled": true,
  "wired": { "tag": "SPAN", "ariaHidden": "true", "tabIndex": -1,
             "pointerEvents": "none", "onclickAttr": false } }
```

`before`/`after` are `[data-mix-source]` counts across a **forced** Playwright click. It does
not fire. `aria-label`, `disabled` and the click listener were all dropped.

**[UPGRADED FROM ASSERTION TO FACT]** — r2 reasoned that both chip legs "can only time out."
I ran them:

```
$ npx playwright test --project=smoke e2e/smoke/oracles/o14-preview-truth.spec.ts -g "T-17"
  2 failed
    o14-preview-truth.spec.ts:346 › every open-menu chip's painted gradient carries exactly its stamped stops
    o14-preview-truth.spec.ts:404 › the chip feasibility leg: every preview chip is perceptible against the menu surface …
  1 passed (1.3m)

    Error: locator.click: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByRole('button', { name: 'Add current color to the mix' })
    > 355 |         await addSlot.click();
```

`e2e/smoke/safari/mix-flow.spec.ts:30-34` opens with the same locator and dies the same way.

Consequences, all measured: `canMix` false forever in the default `colors` mode →
Mix button `disabled: true` → `operandColors` `[]` forever → `sampleInterpolationRamp`
returns `null` at `sample.ts:58` for every row → **every `v-if` at `MixConfigBar.vue:111`
and `:133` is false**. The T-17 apparatus — `:19-23`, `:38-44`, `:47-74`, `:104-115`,
`:127-137`, roughly 60 % of the file — has never rendered for a user.

The single passing T-17 leg is `honest absence: with <2 operands the rows carry NO chip`
(`:334`), which asserts `count === 0`. Under this defect that assertion is unfalsifiable.
It is the entirety of the T-17 green.

*(Defect site belongs to the `wb-mix-sourceselector` seat; reported here because the
consequence is wholly this component's surface, and because C-1 and C-2 are one mechanism.)*

**Cure.** A real interactive host — `<button aria-label="…" @click><WatercolorDot
variant="ghost" …/></button>`. The dot's `aria-hidden` + `pointer-events: none` are
*correct*: it is decoration. Do not ask glass-ui for a `tag` prop; wrap it.

---

## C-3 · MAJOR **[r2, not re-derived]** — with ≥3 operands the chip does not contain the color Mix produces

r2's finding, and the best one in either prior pass: `sample.ts:52-86` builds an N−1-segment
piecewise chain while `useMixingState.ts:87-91` computes the result via `mixColorSequence`
(`demo/palettes/mix.ts:39`), a weighted running accumulation. They coincide at N=2 and
diverge at N≥3 — r2 measured the 3-operand mix result off-ramp by 5.5 L and 12.4° of hue,
`exactMember: false`.

I did not independently re-derive this one. C-2 makes the ≥3-operand state unreachable in
the live app, and I judged my remaining probe budget better spent confirming the two
blockers by execution than re-deriving a result r2 already measured by direct module call.
**Carried forward on r2's evidence, flagged as such.**

---

## C-4 · MAJOR **[CONFIRMED, different method]** — in the shipped default space the Hue control is inert and its four chips are byte-identical

`MixConfigBar.vue:66-74` samples the quartet in the current space;
`useMixingState.ts:44` ships `ref<PickerSpace>("oklab")`.

r2 measured this in-page. I measured it in vitest, against the component's exact call
(`sampleInterpolationRamp(operandColors, colorSpace, m.value)`, `:71`), across all nine
offered spaces:

```
oklab  distinct=1/4  <<< ALL FOUR IDENTICAL
lab    distinct=1/4  <<< ALL FOUR IDENTICAL
rgb    distinct=1/4  <<< ALL FOUR IDENTICAL
xyz    distinct=1/4  <<< ALL FOUR IDENTICAL
oklch  distinct=2/4
lch    distinct=2/4
hsl    distinct=2/4
hsv    distinct=2/4
hwb    distinct=2/4
```

Same numbers, independent route. **[SHARPENED] — the mechanism, cited precisely.**
`mixColors` consults `options.hue` only at the space's hue-channel index:

```
src/color/operations.ts:101   const hueIndex = HUE_INDEX[options.space as keyof typeof HUE_INDEX];
src/color/operations.ts:105   if (i === hueIndex) { … interpolateHue(a, b, progress, options.hue) … }
src/color/anchors.ts:360      export const HUE_INDEX = { …
```

`oklab`/`lab`/`rgb`/`xyz` have no entry, so the arc argument is discarded outright — not
approximated, discarded. Four of the nine offered spaces therefore render four identical
chips under four different arc names, and in all four the Hue-method Select changes nothing
about the mix `startMix` performs. **The app's default state is one of them** — the captured
screenshots read `COLOR SPACE: OKLab` / `HUE METHOD: Shorter`.

That is exactly the object `sample.ts:50-51` forbids — *"honest absence, never a canned
swatch"*. The honesty rule was applied to the operand-count axis and never to the
space-geometry axis. And the component demonstrably knows how to hide an inapplicable
control (`v-if="showLeftoverStrategy"`, `:144`) and does not apply it to the one control
that is actually inapplicable.

**[SHARPENED] — cure.** r2 proposed adding `cylindrical: true` to `INTERPOLATION_SPACES`.
Correct in shape, but the fact is already authored **twice** in the tree and need not be
authored a third time: `HUE_INDEX` (`src/color/anchors.ts:360`, the library's own
predicate) and `PICKER_CHANNELS[space].some(m => m.hue)`
(`demo/color-session/picker-color.ts:45,199`). Derive from the existing metadata. Adding a
third parallel copy of "which spaces have hue" is the contrivance the KISS edict exists to
prevent.

*(The 2-of-4 in cylindrical spaces is the mathematical ceiling — `shorter` always coincides
with one of `increasing`/`decreasing` and `longer` with the other. Only the 1-of-4 result is
a defect; but it does mean the "quartet" framing over-promises even where the control works.)*

---

## C-5 · MAJOR **[r2, not re-derived]** — the chip paints a continuous gradient, so 16 of every 17 pixel-columns are painted by the engine the sampling law forbids

`PreviewRamp.vue:24-26` emits `linear-gradient(90deg, ${stops.join(", ")})` — no stop
positions — while its own docstring (`:6-7`) promises a *discrete-stop* gradient and
`sample.ts:5-11` forbids browser interpolation by name. r2 measured `hasPositions: false`
and modelled a worst-band error of 23.5/255 on the `longer` arc.

I verified the code fact by reading (`PreviewRamp.vue:25` — no positions, no `in <space>`)
and accept r2's modelled magnitude, which r2 correctly labelled as modelled rather than
pixel-sampled. **Carried forward.**

---

## C-6 · MAJOR **[CONFIRMED, and reproduced deterministically]** — the T-17 chips have no live verification, and the byte-identity assertion is *unsatisfiable*

### (a) unreachable — see C-2, now executed.

### (b) **[SHARPENED to a one-command reproduction]**

r2 asserted that `o14-preview-truth.spec.ts:162-168`'s regex cannot match `serializeStop`'s
output. This is the single most consequential claim in either prior pass — it means the
byte-identity oracle would fail even if C-2 were cured — so I reproduced it as a
deterministic vitest fact rather than an in-page observation:

```ts
const RE = /oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g;
const stops = sampleInterpolationRamp(["oklch(0.62 0.27 9.8)", "rebeccapurple"], "oklch", "shorter")!;
```

```
first stop: oklch(62% 0.27 9.8deg)
stamp head: oklch(62% 0.27 9.8deg)|oklch(60.876698725014% 0.263143499961 5.648311780535deg)|…
REGEX MATCHES ON STAMP: 0 of 17 stops
REGEX MATCHES ON CANONICALIZED PAINT: 2
```

**Zero of seventeen.** The serializer emits `%` on L and `deg` on H; the regex's first group
is `[\d.]+`, which cannot consume `62%`, and `oklch\(` is anchored so there is no later
match to find. The browser canonicalizes the *painted* string to `oklch(0.62 0.27 9.8)`,
which the regex *does* match. So `expect(painted.length).toBe(stamped.length)` at line 377
evaluates `expect(17).toBe(0)` per chip.

**The O-14 byte-identity leg has never once compared a stamp to a paint.** It is not merely
blocked by C-2; it is unsatisfiable on its own terms. Confirmed.

### (c) no unit coverage — confirmed

`grep -rn "MixConfigBar"` over `*.ts`/`*.vue` yields exactly two live code hits, both in
`MixPane.vue` (`:6`, `:97`); everything else is prose in `docs/`. Nothing mounts the
component. `test/preview-chips.test.ts` exercises `sample.ts` in isolation — never the
space×hue cross-product at `:57-74`, never the `v-if` guards, never the emit casts.

**Vacuous-gate mutations, named exactly** (each keeps every gate its current colour):

| # | mutation | why it survives |
|---|---|---|
| M1 | `:71` → `sampleInterpolationRamp(operandColors, colorSpace, "shorter")` — ignore `m.value` | byte-identity compares each chip to its own stamp; identical chips match themselves. And the comparison never fires anyway (b). |
| M2 | delete both `<PreviewRamp/>` elements (`:111`, `:133`) | nothing imports the component; the one green leg asserts chips are *absent* |
| M3 | delete `variant="primary-audacious"` (`:163`) | already inert — zero pixel change, `vue-tsc` EXIT=0 |
| M4 | `INTERPOLATION_SPACES` → `.slice(0, 1)` at `:107` | no test asserts the component's row set |
| M5 | swap the `@update:model-value` handlers at `:99` and `:122` | no test drives either Select to a new value and asserts the mix changed |

**The entire T-17 feature can be deleted from this file without turning a single gate a
different colour.**

**Cure.** (1) fix the add-slot host; (2) delete `parseOklchTriples` and compare
`data-stops.split("|")` against painted stops through one normalizer owned by `sample.ts`
— the module already owns `stampStops`, so the shared referent exists; (3) one
`@vue/test-utils` mount asserting the only thing this file uniquely owns: Space row *i*
carries the ramp for space *i* at the current arc, and Hue row *j* the ramp for arc *j* at
the current space.

---

## C-7 · MAJOR (a11y) **[CONFIRMED]** — three `<label>` elements that label nothing

`MixConfigBar.vue:98`, `:121`, `:145`. Measured live:

```json
"labels": [
 { "text": "Color space", "htmlFor": null, "control": null, "inMixPane": true },
 { "text": "Hue method",  "htmlFor": null, "control": null, "inMixPane": true }
]
```

`HTMLLabelElement.control === null` on both rendered rows; the third is `v-if`-hidden in
colors mode and I confirmed it appears in palettes mode with the same defect
(`['Color space', 'Hue method', 'Size mismatch']`). r2 additionally measured that clicking
the label leaves focus on `<body>` and does not open the Select — I did not re-run that leg
and carry it forward.

The accessible name survives only because `aria-label` is hand-duplicated on each trigger
(`:100`, `:123`, `:147`) — one string authored twice, which is how name/label drift begins,
and it has already begun: visible `"Size mismatch"` vs. accessible `"Size mismatch
strategy"`. WCAG 2.5.3 holds only because the visible text happens to be a prefix.

r2's census stands and is worth repeating: this is the **only** `.section-label` site in
`demo/` using `<label>`; every other one uses `<span>` or `<div>`. A lone divergence, not a
house pattern. glass-ui ships `Label` with `for?: string` and `demo/ui/label/index.ts`
already re-exports it.

**Cure.** `<Label for="mix-space">` + `id` on the trigger; drop the duplicated `aria-label`s.

---

## C-8 – C-16 **[r2, carried forward]**

Re-read against the source this pass and found accurately stated; not independently
re-measured. Summarised so the ledger is complete:

| id | severity | one line |
|---|---|---|
| C-8 | MINOR | `rgba()`/`hsla()` comma forms throw in `parsePickerColor`; the chip hides silently (indistinguishable from honest absence) while the Mix button stays armed to crash — `sample.ts:60-66` catches, `useMixingState.ts:88-90` does not. r2 correctly labelled operand reachability a hypothesis. |
| C-9 | MINOR | `serializeStop`'s ` / 1)` strip (`sample.ts:40`) is dead code — the serializer never emits that string. My own P4 output corroborates: `oklch(62% 0.27 9.8deg)`, no ` / 1)`. Legacy path, edict 2. |
| C-10 | MINOR | `class="h-9"` ×3 de-tokenizes a height glass-ui ships as a register. **Independently confirmed**: `SelectTrigger.vue.d.ts` declares `size?: "sm" \| "default"` ("Trigger height register"); measured trigger height **36 px** = `--control-h-sm`. Same idiom on the Button (`h-10` vs. `ButtonSize`). The S-tranche CONSUME FIX (`dropdown-select-consistency.md:167`) prescribed this two tranches ago and it is still unlanded. |
| C-11 | MINOR | reka `AcceptableValue` reach (`:15`) + three unchecked `as` casts. **Independently confirmed + sharpened**: glass-ui emits `SelectEmits { "update:modelValue": [SelectionValue] }` with `SelectionValue = string \| number` — strictly narrower than reka's union. *And the producer type is not re-exported*: `dist/components/select/index.d.ts` exports the eight component prop types and **not** `SelectionValue`. So the honest local annotation today is `string`, and the clean fix is a one-line producer re-export — the concrete §4 ask behind register entry `L-D7`. |
| C-12 | MINOR | `<Blend class="w-4 h-4" />` (`:168`) lacks `aria-hidden`, while the sibling `MixSourceSelector.vue:175` gets it right. |
| C-13 | MINOR | `STRATEGIES` array (`:83`) is not exhaustiveness-checked against `LeftoverStrategy`; a fourth union member would compile clean and silently never appear. The file states the opposite principle for the *other* vocabulary eight lines earlier (`:16-18`). |
| C-14 | MINOR | natively `disabled` verb: removed from tab order, no reason surfaced, no `aria-live`/`role="status"` on the async result. |
| C-15 | INFO | `MixPane.vue:103` mints a new array identity per render, invalidating both computeds. **Independently benched** — full 13-ramp rebuild, warmed, 50 reps: `2 operands → 0.60 ms · 6 → 0.66 ms · 12 (=MAX_COLORS) → 0.76 ms`. Sub-frame. Not a defect. |
| C-16 | INFO | no `<SelectValue placeholder>`; 9 rows offered for a 17-member `PickerSpace` union. Reachability is a hypothesis; the type hole is fact. |

---

# Part 3 — negative proof

Stated so the absences are evidence, not silence. Everything below I checked and did **not**
find.

- **No hazard-class code in this file.** All 173 lines read: no `requestAnimationFrame`
  (**no PRM-RAF exposure**), no `addEventListener`, no `ResizeObserver`/`IntersectionObserver`,
  no timers, no lifecycle hooks, no `async`, no `fetch`, no WebGL, no canvas. There is
  nothing to leak, cancel, or clean up. The missing-cleanup, leaked-listener, unbounded-growth
  and ungated-loop classes are genuinely absent. `useMixingState.ts:1-15` is explicit that
  the one clock lives in `useMixingAnimation`; this component owns none of it.
- **No `defineModel`.** Explicit `defineProps` (`:32`) + `defineEmits` (`:76`), so the
  `WritableComputedRef` async-round-trip stale-read hazard cannot arise. The reactive props
  destructure at `:25-45` is correct Vue 3.5 and is the right call for this shape.
- **No `ValueUnit` construction, no `stableHue`, no direct `parseCssColor`, no reka slider.**
  Four of the six named local hazards do not touch this file.
- **`verbatimModuleSyntax` clean.** All four type-only imports (`:12`, `:13`, `:14`, `:15`)
  use `import type`; both value imports (`:18`, `:23`) are used. `vue-tsc` EXIT=0 on both
  projects.
- **Not a god module.** 173 lines, one job, no invented `shared/` dir, no wrapper component.
  Edicts 1 and 3 satisfied.
- **Performance is not a finding, and the source comment is TRUE.** `:19-22` claims the
  sampling "costs nothing at rest." Verified three ways: `computed` is lazy; glass-ui's
  `SelectContentProps` declares **no `forceMount`**, so the content unmounts closed and the
  template never reads the maps; and the full rebuild costs 0.60–0.76 ms anyway (P3). I went
  looking for a recompute storm and there is none.
- **Tap targets — this component contributes ZERO.** Measured: triggers `227 × 36`, Mix
  button `462 × 40`, option rows `221 × 49.5`. All ≥ 24 px. The 8 `smallTapTargets` on
  `/#/mix` in `REPORT.json` are the picker's channel handles (`12 × 24`, labelled
  "L channel"/"A channel"/…), three `22 × 22` slug controls and a `160 × 23` input — every
  one of them from the *other* pane.
- **Nameless buttons — this component contributes ZERO.** `/#/mix` reports 1; measured live
  it is `<button class="send-btn btn-interactive">` with `inMain: false` — the feedback
  widget outside `<main>`.
- **Nothing on `/#/mix` errors, overflows, or renders blank.** `REPORT.json`, all four
  matrices: `consoleErrors: []`, `pageErrors: []`, `overflowX: 0`, `main: 1`. My own eight
  sessions recorded zero console errors and zero page errors on the route.
- **The two `PreviewRamp` guards are not redundant-with-a-hole.** `:111`/`:133` guard `null`;
  `PreviewRamp.vue:31` guards `length >= 2`. `sample.ts` cannot return a 1-element array
  (`perSegment = max(2, …)`), so no state slips between them.
- **The `#description` lane is not cloned into the trigger.** The comment at `:104-106`
  claims `SelectValue` does not clone it; measured — the trigger renders "OKLab" alone while
  the option's `textContent` is "OKLCh Perceptual, hue-preserving". The claim holds.

---

## Findings table (r3)

| id | severity | status | one line |
|---|---|---|---|
| C-1 | BLOCKER | CONFIRMED + SHARPENED | `variant="primary-audacious"` is not a glass-ui 7 prop; verb ships `data-emphasis="secondary"`; `audacious` is real on three *other* axes, which is why it passed review; `strictTemplates` off so no gate can see it |
| C-2 | BLOCKER | CONFIRMED + EXECUTED | add-color affordance is an `aria-hidden` `<span>` with `pointer-events:none`; `canMix` unreachable; every chip permanently absent; **playwright 2 failed / 1 passed** |
| N-1 | MAJOR | **NEW** | the pane's only verb jumps 208 px on a mode switch, un-animated; this component owns 73 px (root 114→187) while the pane transitions the far less important result plate |
| C-3 | MAJOR | r2, carried | with ≥3 operands the ramp does not contain the color Mix produces |
| C-4 | MAJOR | CONFIRMED + SHARPENED | default space `oklab` → Hue control inert, 4 chips byte-identical (1 distinct of 4); mechanism is `HUE_INDEX`, and the predicate is already authored twice in-tree |
| C-5 | MAJOR | r2, carried | chip paints a continuous gradient — the engine `sample.ts` forbids by name |
| C-6 | MAJOR | CONFIRMED + SHARPENED | oracles unreachable **and** the byte-identity regex matches **0 of 17** stops — unsatisfiable on its own terms; zero unit coverage; 5 named green-keeping mutations |
| C-7 | MAJOR | CONFIRMED | three orphan `<label>`s (`control === null`) — the only such site in `demo/` |
| C-8 | MINOR | r2, carried | `rgba()`/`hsla()` throw; chip hides silently while the button stays armed |
| C-9 | MINOR | r2, corroborated | `serializeStop`'s ` / 1)` strip is dead code |
| C-10 | MINOR | CONFIRMED | `h-9`/`h-10` de-tokenize registers glass-ui ships as `size`; measured 36 px = `--control-h-sm` |
| C-11 | MINOR | CONFIRMED + SHARPENED | reka reach + 3 unchecked casts; `SelectionValue` exists but is **not re-exported** from the select barrel — the concrete §4 ask |
| C-12 | MINOR | r2, carried | `<Blend>` lacks `aria-hidden` |
| C-13 | MINOR | r2, carried | `STRATEGIES` not exhaustiveness-checked |
| C-14 | MINOR | r2, carried | disabled verb: no tab reach, no reason, no `aria-live` |
| N-3 | INFO | **NEW** | the `#description` lane holds the only copy of the vocabulary and is orphaned in the a11y tree (`aria-describedby: null`) — glass-ui relay |
| C-15 | INFO | CONFIRMED | per-render array identity invalidates both computeds; 0.60–0.76 ms, sub-frame |
| C-16 | INFO | r2, carried | no `<SelectValue placeholder>`; 9 rows for a 17-member union |
| N-2 | — | **NEW** | negative proof: mobile `grid-cols-2` renders clean at 390 px; `text-micro` is a real glass-ui utility |

---

## The one mechanism

C-1, C-2 and C-10 are not three bugs. They are one:

> *The W44 glass-7.0.0 adoption changed the producer's prop vocabulary; the demo call sites
> were never migrated; Vue legalises unknown component props as fallthrough attributes; and
> `strictTemplates` is off, so the hard CI typecheck is structurally incapable of seeing it.*

`variant`→`emphasis` (dead prop, silent). `tag` (dead prop that silently turns a control
into an `aria-hidden` span). `h-9`/`h-10` (hand-painted over a shipped `size` register). The
demo is still speaking the pre-7 dialect nearly everywhere: **51** `variant=` Button call
sites against **2** uses of the 7.0.0 `emphasis` API.

The patch-level cure is three edits in this file. The **gestalt** cure is one line of
config — `vueCompilerOptions: { strictTemplates: true }` — which converts the entire family
from invisible to compile-RED across all 51 sites at once, plus the producer-API conformance
oracle described at C-6. Without it the next glass minor does this again, silently, with a
green CI.
