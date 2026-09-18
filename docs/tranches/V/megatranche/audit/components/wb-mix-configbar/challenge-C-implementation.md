# CHALLENGE-C — `demo/workbenches/mix/MixConfigBar.vue` — implementation (r6)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
This seat was spawned with an explicit Opus 5 declaration and is serving it as declared. Nothing
here is inherited, defaulted, or undeclared.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`,
`@mkbabb/glass-ui@7.0.0` installed, dev server live on `:9000`. **No source edits.** This seat
wrote only inside `docs/tranches/V/megatranche/audit/components/wb-mix-configbar/`; probe scripts
ran from the session scratchpad (one copy preserved here as `probe-ramp-identity.mjs`).

**Pass note.** Five prior passes exist and are preserved verbatim (`…r1-prior.md` …
`…2026-07-29-r5-prior.md`). I re-derived the load-bearing claims with my own probes *before*
reading them. r1–r3 audited props/tokens/a11y/gates; r4 executed the nine-space vocabulary against
real colors and found the HSL killer; r5 measured the description register, the roster gap and the
condition-matrix coverage.

**This pass exists because every prior round reasoned about `C-2` (the dead add-affordance) as a
*neighbouring* component's defect and left its consequence for THIS component unstated — and
because r5 explicitly declined to re-verify `C-1`.** I did both, and in doing so found that
`C-2`'s mechanism is one layer deeper than the record says, that it makes 35 % of this file
unreachable code, and that the one green leg of this component's only live gate is green
*because* of it.

Tags: **[NEW]** = absent from r1–r5. **[CONFIRMED]** = prior claim, re-derived here by my own
probe. **[SHARPENED]** = prior claim whose mechanism or cure I moved.

---

## Verdict

**DEFECTIVE.** The prior blockers stand. This pass adds **one BLOCKER**, **three MAJOR** and one
MINOR, all measured, none previously filed. Nothing in r1–r5 is refuted; one mechanism is
corrected upward in severity.

The one-line addition to the record:

> **This component's principal feature has never been reachable.** `spaceRamps` and `hueRamps` —
> 60 of 173 lines, the whole T-17 preview apparatus with its vitest oracle, its e2e byte-identity
> leg, its feasibility leg and its `data-stops` stamp — can only produce a chip when
> `operandColors.length >= 2`. In colors mode **no input path in the shipped UI can put a single
> operand there**, because glass-ui 7's `WatercolorDot` is `inheritAttrs: false` and forwards only
> `class` and `style`, so both add-affordances lose their `@click` listener outright. Measured:
> a *programmatic* `.click()` on the add slot moves the operand count `0 → 0`.

---

## What I executed this pass

| # | probe | tool | result |
|---|---|---|---|
| P1 | 9 spaces × 4 arcs distinctness census against the real library | `node` + `dist/subpaths/*.js` | §R6-4 — `distinct = 1/4` for `oklab`, `lab`, `rgb`, `xyz` |
| P2 | live DOM: the Hue menu's four `data-stops` stamps, read in ONE evaluate | `playwright` | §R6-4 — **`distinctStops: 1` of 4**, 989 chars each, byte-identical; screenshot attached |
| P3 | live DOM: the verb's full attribute dump | `playwright` | §R6-3 — `data-emphasis="secondary"` + raw `variant="primary-audacious"` |
| P4 | `grep -rl "primary-audacious" node_modules/@mkbabb/glass-ui/` | `grep` | §R6-3 — **0 hits** in the entire published design system |
| P5 | **the demo typecheck gate, run** | `vue-tsc` | §R6-3 — **EXIT=0** with the dead prop present; `--listFiles` confirms the file is in the program |
| P6 | `.add-slot-ghost` element identity + `elementFromPoint` + **programmatic `.click()`** | `playwright` | §R6-1 — `0 → 0` operands; the listener is not bound at all |
| P7 | glass-7 `WatercolorDot` render root, decompiled | `node` on `dist/watercolor-dot.js` | §R6-1 — `inheritAttrs: !1`, only `class`/`style` forwarded, root hard-coded `<span aria-hidden="true" … pointerEvents:"none">` |
| P8 | error-path sweep: `none` channels, huge, `-0`, `transparent`, `currentcolor`, `""`, alpha, `color()` | `node` | §negative proof |
| P9 | ramp timing at 2 / 3 / 6 / 12 operands | `node` | §negative proof — 0.42–0.70 ms |
| P10 | live DOM: orphan `<label>`s, trigger heights vs `--control-h-*`, a11y counters | `playwright` | §carried table |
| P11 | the O-14 mix legs' fixture arithmetic | source read | §R6-2 |

---

# Part 1 — new findings

## R6-1 · BLOCKER **[NEW · measured]** — `spaceRamps`/`hueRamps` are unreachable code: no input path can put an operand in `operandColors`, and the listener that was supposed to is silently dropped by glass-7

`MixConfigBar.vue:57-74` computes 13 ramps; `:104-115` and `:127-137` render them. Both are
gated on `sampleInterpolationRamp(...) !== null`, and that helper's first line is
`if (operandsCss.length < 2) return null` (`sample.ts:58`). So the whole apparatus turns on one
question: can `operandColors` ever hold two strings?

`MixPane.vue:103` sources it from `selectedColors`, which has exactly two writers in the entire
demo — both `emit("addColor", …)` in `MixSourceSelector.vue` (`:70` the picker add-slot, `:220`
the palette swatches). `grep -rn "addColor" demo/ | grep -v workbenches/mix` returns nine hits,
**none of them wired to the mix** (they are Extract's and PaletteCard's own local events).

Both writers hang off `<WatercolorDot tag="button" … @click="…">`. Live, that element is:

```json
{ "tag": "SPAN", "role": null, "ariaHidden": "true", "ariaLabel": null, "tabIndex": -1,
  "pointerEvents": "none",
  "inlineStyle": "border-radius: 76.83% 21.27% …; pointer-events: none; --watercolor-color: lab(92% 88.8 20); …",
  "rect": { "x": 47, "y": 350, "w": 44, "h": 44 } }
elementFromPoint(centre) → DIV.swatch-row          ← real pointer input never reaches it
```

r4/r5 stopped at `pointer-events: none`. **That is not the whole mechanism.** I bypassed
hit-testing entirely with a synthetic click, which fires handlers regardless of `pointer-events`:

```json
{ "programmaticClick": { "before": 0, "after": 0, "handlerAlive": false } }
```

The handler never runs, because glass-ui 7's `WatercolorDot` does not have one to run.
Decompiled from `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`:

```js
inheritAttrs: !1,
props: { color:{}, variant:{default:"solid"}, animate:{…}, cycleDuration:{…}, range:{…}, seed:{default:""} },
setup(e){ let n = useAttrs(), c = computed(() => n.class), f = computed(() => n.style); …
  return () => (openBlock(), createElementBlock("span", {
      "aria-hidden": "true",
      class: [c.value, "watercolor-swatch", …],
      "data-variant": e.variant,
      style: [f.value, { …, pointerEvents: "none", … }] }, …
```

`inheritAttrs: false` with only `attrs.class` and `attrs.style` read back. `tag`, `aria-label`,
`title`, `disabled` and **`onClick`** are all silently discarded — they are neither declared props
nor spread onto the root. The consumer's `tag="button"` has been a no-op since the glass-7
adoption (`f2c8f565`), and the root is hard-coded to a `pointer-events: none`, `aria-hidden`
`<span>`.

**The consequence lands in this file.** In colors mode `operandColors` is permanently `[]`;
`sampleInterpolationRamp` returns `null` for all 13 rows; every `<PreviewRamp v-if>` is false
forever. Palettes mode passes `[]` by design (`MixPane.vue:103`). So:

- **`MixConfigBar.vue:19-23, 47-74, 104-115, 127-137` — ~60 of 173 lines (35 % of the file) — is
  unreachable in the shipped app.**
- `canMix` is `selectedColors.length >= 2` (`useMixingState.ts:50-53`) ⟹ false forever ⟹ the
  pane's ONE verb (`:162-170`) is permanently disabled.
- It explains, without any further hypothesis, why every `/#/mix` capture in the visual gate shows
  the closed, chip-less, disabled state, and why r5's run of the e2e leg timed out waiting for
  `getByRole("button", { name: "Add current color to the mix" })`: there is no button and no name.

**Honest complication, recorded because it is evidence and not noise.** Earlier in this same
session the page carried two operands (`data-mix-color="#ff0055"`, `"#0088ff"`), four rendered
chips and an enabled verb with a computed result — the state my §R6-4 measurement was taken in.
That state was **not produced by me and its provenance is unknown** (concurrent audit seats share
this browser; a seat driving Vue internals or a since-deleted saved palette would both explain
it). It is reported because it proves the *render* path is sound when operands exist. It does not
weaken the measurement above: at the moment I probed, with a clean pane, neither a real click nor
a synthetic one moved the count off zero.

**Cure (transposition, not patch).** The defect is a design-system boundary that lies: a
component whose contract is "decorative swatch" is being asked to be a command. Do not re-plumb
`WatercolorDot`. Wrap it in the labelable element the app already has — glass-ui ships
`Button` with `iconOnly` and `asChild` for exactly this ("Square geometry for an accessibly named
icon command", `components/button/Button.vue.d.ts:15`) — and let the dot be the decoration inside
it. That restores the click, the accessible name, the `disabled` semantics and the focus ring in
one edit, at the root, with no new vocabulary. Relay to the glass-ui BH inbox: `WatercolorDot`'s
`inheritAttrs: false` silently swallowing `onClick`/`aria-label` is a footgun the primitive should
either forward or refuse loudly.

---

## R6-2 · MAJOR **[NEW]** — the only GREEN leg of this component's live gate is green *because of* R6-1

`e2e/smoke/oracles/o14-preview-truth.spec.ts` carries three legs for the mix bar. r5 ran them:
2 failed, 1 passed. The one that passed is this, in full (`:334-343`):

```ts
await openView(page, "Mix");
await page.getByRole("combobox", { name: "Color space", exact: true }).click();
expect(await page.getByRole("listbox").locator("[data-stops]").count()).toBe(0);
```

It asserts that with fewer than two operands the rows carry **no chip**. Under R6-1 there can
never *be* two operands, so this assertion is satisfied by the blocker itself. The gate's single
green light is a photograph of the defect.

The two red legs are the ones that would have caught it — and both fail on the add-slot locator
before reaching a single assertion, i.e. they fail for exactly the same reason, and their failure
mode (a locator timeout) reads like harness rot rather than a product break. Add r4's R4-4 (CI
runs no Playwright step at all) and the loop is closed: the component's only behavioural gate
cannot run, and if it ran, its passing leg would still pass.

Both fixtures also add the **same** color twice (`await addSlot.click(); await addSlot.click();`,
`:353-355`) — `useMixingState.addColor` has no dedupe (contrast `addPalette`, which dedupes on
`slug`, `:66-69`). Two identical operands make every ramp in every space and every arc a flat
constant, so even a repaired fixture could not detect R6-4: distinctness is untestable by
construction in the oracle's own inputs.

**Named green-keeping mutations (this pass's, all distinct from r5's):**

1. Replace `hueRamps`' third argument with `hueMethod` instead of the loop variable `m.value`
   (`MixConfigBar.vue:71`) — the quartet becomes four copies of the current arc. Suite stays green.
2. Delete the `@mix` emit binding (`:166`). No test mounts the component; the e2e never gets a
   verb to press. Green.
3. Swap `spaceRamps` and `hueRamps` at the two `v-if` sites (`:111`, `:133`). Green.

**Cure.** Give the oracle two *different* operands and one assertion that the rows differ —
`new Set(stops).size === rows.length` for a polar space. One line; it is the only assertion that
tests what the chips are FOR.

---

## R6-3 · MAJOR **[NEW facts on a CONFIRMED finding]** — the dead `variant` prop, verified live, traced to its provenance, and proven invisible to the hard typecheck gate

r5 carried `C-1` explicitly unverified ("I do not claim to have verified it"). Verified here.

```
MixConfigBar.vue:163 →  variant="primary-audacious"
```

Live DOM attribute dump of the rendered verb:

```json
["data-slot=\"button\"", "data-emphasis=\"secondary\"", "data-tone=\"neutral\"", "data-size=\"md\"",
 "type=\"button\"",
 "class=\"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover h-10 gap-2 font-medium font-display\"",
 "variant=\"primary-audacious\"", "style=\"--glass-btn-press-t: 0.0000; …\""]
```

Three facts, each independently checkable:

1. **The prop does not exist.** glass-7 `ButtonProps` is
   `emphasis | tone | size | iconOnly | loading | type | disabled | class` — no `variant`
   (`dist/components/button/Button.vue.d.ts:6-18`). `emphasis` defaults to `"secondary"`
   (`dist/button-Bu9F4uU6.js`, `props:{ emphasis:{default:"secondary"} … }`).
2. **The token does not exist anywhere in the design system.**
   `grep -rl "primary-audacious" node_modules/@mkbabb/glass-ui/` → **no files**. The string is not
   a renamed variant; it is a vocabulary glass 7 does not speak at all.
3. **It leaks into the document as an invalid attribute** (`variant="primary-audacious"` on a
   `<button>`), and the rendered register is `glass-wash glass-capsule` — which the file's own
   comment at `:158-161` names as the thing it is *not* supposed to be ("`default` is the quiet
   glass capsule"). The component's one verb ships in precisely the register its author documented
   as wrong.

**Provenance** — `git log -S "primary-audacious" -- demo/` → `a34d20f4` *"feat(S.W5-6 · mix): …
the L6 primary verb"*, authored against the pre-glass-7 Button. `git log -S '"@mkbabb/glass-ui"'
-- package.json` → `f2c8f565` *"feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo
consumer surface"*. The adoption wave migrated the surface and left this prop behind — in **two**
files: `MixConfigBar.vue:163` and `GenerateControls.vue:158` (`grep -rn 'variant="primary-audacious"' demo/`
→ 2 hits). This is edict 2 (no legacy) and edict 4 (glass-ui is the design system) in one line.

**The gate is blind to it [NEW].** The demo typecheck was flipped to hard in `ef57230b`. Run at
HEAD:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "EXIT=$?"
npx vue-tsc -p tsconfig.demo.json --noEmit  5.61s user 0.42s system 186% cpu 3.233 total
EXIT=0

$ npx vue-tsc -p tsconfig.demo.json --noEmit --listFiles | grep -c MixConfigBar
1
```

Zero diagnostics. The file **is** in the program. A prop that does not exist on the target
component, carrying a value from a retired vocabulary, passes a hard gate silently — so no
mechanical check in this repo can catch the next one either. That is the finding underneath the
finding: `C-1` is not a slip, it is the class of defect this repo's gates structurally cannot see.

**Cure.** `emphasis="primary"` (plus a `tone` if the audacious accent is wanted) — the glass-7
axis that means what the comment says. And, because the gate cannot enforce it, the migration
sweep for a major design-system bump must be a `grep` of every prop name against the new `.d.ts`
surface, not a typecheck run.

---

## R6-4 · MAJOR **[CONFIRMED live + cure SHARPENED]** — the hue quartet is four byte-identical chips in the shipped default space, and the app already owns the predicate that fixes it

Prior rounds established this by library census (`vite-node`). Here it is in the **live DOM**, all
four rows read in a single `evaluate` so no state can have drifted between samples — default space
`oklab` (`useMixingState.ts:47`), operands `#ff0055` / `#0088ff`:

```json
{ "count": 4, "distinctStops": 1, "allChipsInDom": 4,
  "rows": [
    { "label": "Shorter Nearest arc",            "stopsHash": "oklch(63.536899137778% 0.254068619329 15.458217691216deg)|…len989" },
    { "label": "Longer Far arc",                 "stopsHash": "oklch(63.536899137778% 0.254068619329 15.458217691216deg)|…len989" },
    { "label": "Increasing Always clockwise",    "stopsHash": "oklch(63.536899137778% 0.254068619329 15.458217691216deg)|…len989" },
    { "label": "Decreasing Counter-clockwise",   "stopsHash": "oklch(63.536899137778% 0.254068619329 15.458217691216deg)|…len989" } ] }
```

Four 989-character stamps, one distinct value. Screenshot:
`evidence-hue-quartet-identical.png` (four identical pink→blue chips beside four different
descriptions). This is the O-14 TRUTH LAW inverted — `sample.ts:16-19` forbids a chip that merely
*approximates* the library; four identical chips presented as four distinct arcs assert a
difference that does not exist, which is strictly worse than approximation.

The library census gives the exact collapse set (`probe-ramp-identity.mjs`, run against
`dist/subpaths/color.js`):

```
space=oklch  distinct_hue_ramps=2/4
space=oklab  distinct_hue_ramps=1/4 <-- ALL FOUR CHIPS IDENTICAL
space=lab    distinct_hue_ramps=1/4 <-- ALL FOUR CHIPS IDENTICAL
space=lch    distinct_hue_ramps=2/4
space=hsl    distinct_hue_ramps=2/4
space=hsv    distinct_hue_ramps=2/4
space=hwb    distinct_hue_ramps=2/4
space=rgb    distinct_hue_ramps=1/4 <-- ALL FOUR CHIPS IDENTICAL
space=xyz    distinct_hue_ramps=1/4 <-- ALL FOUR CHIPS IDENTICAL
```

(`2/4` in the polar spaces is honest: `increasing` coincides with `shorter` or `longer` depending
on the arc's sign. That is arithmetic, not a defect.)

**The sharpening.** `{oklab, lab, rgb, xyz}` is *exactly* the set of `INTERPOLATION_SPACES` whose
channel metadata carries no hue — and that metadata is already in the repo, machine-readable, one
module away:

```ts
// demo/color-session/picker-color.ts:50,52-70
const hue = (key = "h"): ChannelMeta => ({ key, min: 0, max: 360, unit: "deg", hue: true });
export const PICKER_CHANNELS = Object.freeze({ oklab: [percent("l"), unit("a",…), unit("b",…)],
                                               oklch: [percent("l"), unit("c",…), hue()], … });
```

`PICKER_CHANNELS[space].some((m) => m.hue)` is a total, exact predicate for "this space has an
arc". So the cure is not a special case bolted onto the chip — it is the existing restraint law
("honest absence — the preview has nothing true to say", `sample.ts:50-51`) extended from *too few
operands* to *no axis to vary*, driven by a fact the app already owns:

- suppress the hue chips when the current space is non-polar, and
- `:disabled` the Hue Select itself there (glass-7 `SelectProps.disabled` exists) — today the
  control is fully operable, fully described, and completely inert in the space it ships in.

---

## R6-5 · MINOR **[SHARPENED]** — the reka `AcceptableValue` reach is now a *runtime* contract mismatch, not merely a type-reach

`MixConfigBar.vue:15` imports `AcceptableValue` from `reka-ui` and types all three handlers with
it (`:99`, `:122`, `:146`), then narrows with an unchecked `as`. Prior rounds filed the reach.
What is new is that glass-7 makes the two vocabularies *actively contradictory*:

```js
// dist/select-BcBAyLXA.js — glass-ui 7 Select
function o(e){ if (!isSelectionValue(e)) throw TypeError("[glass-ui] Select received a non-scalar value."); emit("update:modelValue", e); }
// dist/components/_shared/selection.d.ts
export type SelectionValue = string | number;
```

glass declares `string | number` and **throws** on anything else; reka's `AcceptableValue` admits
`boolean`, plain objects and `null`. The component therefore annotates its handlers with a
vocabulary the design system rejects at runtime, and reaches past the design system to a
transitive dependency to do it (`grep -rn 'from "reka-ui"' demo/` → 4 files, all four for this one
type). Edict 4. The cure is `import type { SelectionValue } from "@mkbabb/glass-ui"` — the type the
emitter actually emits — after which the three `as` casts narrow from a two-member union instead of
a five-member one.

---

# Part 2 — the prior ledger, independently re-derived

Nothing in r1–r5 is refuted by this pass. What I re-measured myself:

| id | prior | this pass | my own evidence |
|---|---|---|---|
| **C-2** | BLOCKER | **CONFIRMED + mechanism corrected upward** | not only `pointer-events: none` — the `@click` listener is **never bound**. Synthetic `.click()` (which ignores `pointer-events`) moves operands `0 → 0`. Root cause decompiled: `inheritAttrs: !1` + only `attrs.class`/`attrs.style` read back. See §R6-1. |
| **C-1** | BLOCKER (r5: *not* re-measured) | **CONFIRMED** | live attribute dump + `grep` count 0 in glass-7 + provenance commits + **EXIT=0** from the hard typecheck. See §R6-3. |
| **C-4** | MAJOR | **CONFIRMED live** | `distinctStops: 1` of 4 in the DOM, one evaluate, plus the 9-space census. See §R6-4. |
| **C-6** | MAJOR | **CONFIRMED + extended** | the green leg is green *because of* C-2; the fixture's two identical operands make distinctness untestable. See §R6-2. |
| **C-7** | MAJOR | **CONFIRMED** | live: `[{text:"Color space",htmlFor:null,hasControlInside:false},{text:"Hue method",htmlFor:null,hasControlInside:false}]` — two orphan `<label>`s (three in palettes mode). glass-7 ships the cure and it is unused: `dist/components/labeled-field/types.d.ts:16-24` — `LabeledField`'s `controlLabelable` docstring names this exact case, and its slot hands out `{ controlId, labelledBy, describedBy }`. |
| **C-10** | MINOR | **CONFIRMED** | live: both triggers compute **36.00 px** carrying `h-9`; `--control-h-md` = `max(calc(2.5rem * 1), 0px)` = **40 px**, `--control-h-sm` = **36 px**. So `h-9` is `size="sm"` written as a magic number, and it puts the two triggers 4 px out of register with the 40 px verb directly beneath them in the same bar. |
| C-3 · C-5 · C-8 · C-9 · C-11…C-16 · R4-1…R4-8 · R5-1…R5-5 | BLOCKER…INFO | carried | not re-executed this pass; I make no claim about them beyond what their rounds recorded. |

---

# Part 3 — negative proof (this pass's own measurements)

Absences I can defend as evidence rather than silence.

- **The sampler is total against hostile input.** Twelve adversarial operand pairs × four spaces,
  run through the real library: `""` → `null`, `"   "` → `null`, `currentcolor` → `null`,
  `rgb(none 0 0)` → `null`, unparseable → `null`. `transparent`, `#ff000080`,
  `color(display-p3 1 0 0)`, `oklch(1e9 1e9 1e9)`, `rgb(-0 -0 -0)`, identical operands and
  achromatic pairs all produce 17 well-formed stops. **No `NaN`/`Infinity` reached any stop
  string, and nothing threw.** The `try`/`catch` at `sample.ts:60-66` holds. (The one residual gap
  is `serializeStop` at `:82`, called *outside* the `try` — I could not make it throw;
  **hypothesis, not reproduced.**)
- **The ramps are sub-frame.** Best-of-7, V8: **0.42 ms** (2 operands) / 0.45 (3) / 0.56 (6) /
  **0.70 ms** (12) for the full 13-ramp workload. The `MixPane.vue:103` identity churn is real
  (a fresh `.map()` array per parent render, and MixPane re-renders on every picker tick through
  `cssColorOpaque`) but its cost is sub-frame and the computeds are lazy, so it is not a defect I
  will file.
- **The "costs nothing at rest" claim at `:19-22` is TRUE.** Live: `chipsAtRest: 0`,
  `selectContentAtRest: 0` with the menus closed; 4 chips the instant one opens. reka unmounts the
  content and the computeds are never read at rest.
- **No hazard-class code in the file.** All 173 lines: no `requestAnimationFrame` (zero PRM-RAF
  exposure), no `addEventListener`, no observers, no timers, no lifecycle hooks, no `async`, no
  `fetch`, no WebGL, no `defineModel` (so the stale-read round-trip cannot apply), no `ValueUnit`
  construction, no reka slider (so no pointer-capture leak). Nothing to leak, nothing to cancel.
- **`verbatimModuleSyntax` clean** — all five type-only imports (`:12-15`, and the value/type split
  at `:18`, `:23`) are correct; both value imports are used.
- **Zero contribution to the visual REPORT's a11y counters.** `/#/mix`'s 8 small tap targets
  enumerate in `REPORT.json` as `input 160×23`, three `22×22` slug controls and four `12×24`
  picker channel spans — all dock/picker. The single nameless button is not this file's either.
  MixConfigBar renders 158×36, 158×36 and 324×40; all ≥ 24 px, all with accessible names.
- **Not a god module.** 173 lines, one job, no invented `shared/` directory, no wrapper component.
  Edicts 1 and 3 hold.

---

## Findings table (r6)

| id | severity | status | one line |
|---|---|---|---|
| **R6-1** | **BLOCKER** | **NEW · measured** | 35 % of this file is unreachable: no input path can populate `operandColors`, because glass-7 `WatercolorDot` is `inheritAttrs:false` and drops `@click` outright — synthetic `.click()` moves the operand count `0 → 0` |
| **R6-2** | **MAJOR** | **NEW** | the O-14 mix oracle's only green leg (`expect(chips).toBe(0)`) is satisfied *by* R6-1; its fixture adds the same color twice, so distinctness is untestable by construction; three new green-keeping mutations named |
| **R6-3** | **MAJOR** | **NEW facts** | `variant="primary-audacious"` verified live (`data-emphasis="secondary"`, raw invalid attribute), **0 hits** in all of glass-7, traced to `a34d20f4` and missed by the `f2c8f565` adoption, present in 2 files — and `vue-tsc -p tsconfig.demo.json` exits **0** |
| **R6-4** | **MAJOR** | **CONFIRMED live + cure sharpened** | 4 rows, 4 byte-identical 989-char `data-stops` in the DOM at the shipped default space; the collapse set is exactly the hue-less spaces, and `PICKER_CHANNELS[s].some(m => m.hue)` already decides it |
| **R6-5** | MINOR | **SHARPENED** | glass-7's Select *throws* on anything outside `string \| number`; the handlers are typed with reka's wider `AcceptableValue`, reached past the design system in 4 demo files |
| C-1 · C-2 · C-4 · C-6 · C-7 · C-10 | BLOCKER/MAJOR/MINOR | **CONFIRMED** | see Part 2 |
| C-3 · C-5 · C-8 · C-9 · C-11…C-16 · R4-1…R4-8 · R5-1…R5-5 | BLOCKER…INFO | carried | see r2–r5 |

---

## The mechanism this pass adds

r4 named it as *a component never executed against a color*. r5 named it as *every gate pointed at
the ornament*. Both are right. Underneath both is a third:

> **This component was verified through its abstractions and never through its surface.** The
> sampler has a strict vitest oracle; the paint has a byte-identity e2e leg; the chip has a
> feasibility leg with real WCAG floors; the props have a hard typecheck. Every one of those
> instruments reads a *representation* of the component — a pure function's return value, a
> serialized stamp, a declared type. Not one of them reads the rendered element. So a prop that
> the design system does not have (R6-3), a listener the design system silently eats (R6-1), and a
> preview that draws the same picture four times (R6-4) all pass every gate this repo owns, while
> the single assertion that does touch the DOM passes *because* of the worst of them (R6-2).

Three edits close it, none of them a patch:

1. **`MixSourceSelector.vue:163-176, :211-220`** — put the two add-affordances inside the labelable
   command glass-ui already ships (`Button` with `iconOnly`/`asChild`) and let `WatercolorDot` be
   the decoration inside it. Restores the click, the name, the `disabled` semantics and the focus
   ring at the root. Un-deadens 35 % of *this* file as a side effect, and turns R6-2's two red legs
   green for the right reason.
2. **`MixConfigBar.vue:66-74, :122-139`** — derive the Hue control's applicability from
   `PICKER_CHANNELS[colorSpace].some(m => m.hue)`: no chips and a disabled Select in a non-polar
   space. Extends the existing honest-absence law to the axis, using a fact the app already owns.
3. **`MixConfigBar.vue:163` + `GenerateControls.vue:158`** — `emphasis="primary"`; and because
   `vue-tsc` demonstrably cannot see a dead prop, make the design-system bump's migration checklist
   a prop-name grep against the new `.d.ts` surface rather than a gate run.

Without (1), every future round audits a feature no user has ever been able to reach.
