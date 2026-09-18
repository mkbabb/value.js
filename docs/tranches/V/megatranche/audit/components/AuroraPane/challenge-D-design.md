# CHALLENGE-D — AuroraPane design audit · **PASS 2 (consolidated, supersedes pass 1)**

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with. Declared, not inherited.

- Subject: `demo/scenes/atmosphere/AuroraPane.vue` (201 lines), area `scenes`, route `/#/atmosphere`.
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Prior seat's report preserved verbatim at **`challenge-D-design-pass1.md`** (13 findings + 5 INFO).
  I re-measured it independently against a live server and the Safari matrix rather than reading it
  first; the overlap below is convergent evidence, not restatement.

---

## Verdict

**DEFECTIVE.** Pass 1's verdict stands and its blocker D-1 is confirmed by independent measurement.
Pass 2 adds **six findings pass 1 did not reach**, **corrects three of its diagnoses**, and — most
consequentially — **retires pass 1's proposed cure**, which routes the four enum rows through the
wrong producer primitive. glass-ui's own doc comment forbids exactly that move and names the right
component, which the demo consumes **zero** times.

Strongest defect (unchanged in substance, sharpened in citation): **the binding Atmosphere
composition is inverted — the protagonist region does not exist.** Pass 1 cited
`VISUAL-CONSTITUTION.md`; the *binding* authority is `OPTICAL-BENCH-COMPOSITIONS.md:46`, which
pass 1 never quoted, and which adds two further breached clauses (housing and boundary inventory).

---

## 0. Pass-1 disposition at a glance

| pass-1 finding | pass-2 disposition |
|---|---|
| D-1 blocker (no preview) | **CONFIRMED + EXTENDED** → see N-1; adds the binding-composition citation, the `InstrumentChassis` zero-usage census, and the "form sections not Cards" breach |
| D-2 blocker (menu bleed-through) | **CONFIRMED, not re-measured** — pass-1's 193,875 px² stands; my open-menu capture reproduces it |
| D-3 ragged edges | **CONFIRMED** — independently measured, identical numbers; adds the 320 px arm and the RTL arm |
| D-4 second row primitive | **CONFIRMED but CURE WRONG** → see C-3 / N-4 |
| D-5 two spines / two rhythms | **CONFIRMED, not re-measured** |
| D-6 "four dead declarations" | **CORRECTED** → see C-1. `text-caption` is not dead; it is *half*-applied, and the half that lands is the half that does the damage |
| D-7 label is not a label | **CONFIRMED + EXTENDED** → N-4 supplies the producer primitive that fixes it |
| D-8 hierarchy inversion | **CONFIRMED**; its `1/√φ` sub-claim **CORRECTED** → C-2 |
| D-9 no persistence | **CONFIRMED, not re-measured** |
| D-10 advanced-first / truncation | **CONFIRMED** — my zoom arm reproduces 567/259 exactly |
| D-11 undersized specimen | **CONFIRMED + EXTENDED** — adds the discriminability failure (N-6) |
| D-12 Zones pinned at ceiling | **CONFIRMED, not re-measured** |
| D-13 identical-branch ternary | **CONFIRMED + EXTENDED** → N-5 quantifies the loss: 5 of 7 media are single-state |
| D-18 forced-colors "unproven" | **RESOLVED** → focus *does* survive forced colors (measured); but a different forced-colors defect is real and new → N-2 |
| — | **NEW** N-1…N-6 below |

---

## 1. New findings

### N-1 · BLOCKER — the *binding* composition is inverted, and two further clauses of it are breached

Pass 1 proved preview = 0 %. The binding authority it did not cite is
`OPTICAL-BENCH-COMPOSITIONS.md:46`, verbatim:

> | **Atmosphere** | P122 `preview-dominant`: Aurora preview 66.6666667%; atom/disclosure inspector
> 33.3333333%. | preview; essentials; advanced. | **Landmark-neutral chassis; form sections not
> Cards.** | W28. Close ratio, causal map, lifecycle and chromatic first frame. |

and `:80`:

> | Atmosphere | `[]` | `none` | none | preview material and confined inspector carry grouping |

Three separate breaches, each measured:

1. **Ratio.** Rendered 0 % preview / 100 % inspector against the binding 66.6666667 / 33.3333333.
   Measured at 1440×900: `<main>` 1408×804, pane Card **1042 × 654.2 = 681,676 px²** = **60.2 % of
   `<main>`**, 52.6 % of the viewport; dedicated preview area **0 px²**.
   (Cross-engine: the Safari capture puts the card at x 201.6 w 1036.8 — agreement within 5 px.)
2. **Housing.** "form sections **not Cards**". `AuroraPane.vue:110` roots on `ConfigSliderPane`,
   whose root is `Card tier="resting"` (`ConfigSliderPane.vue:99–102`); measured computed class
   `glass-resting card rounded-card text-card-foreground …`. And
   `grep -rn "InstrumentChassis" demo/ --include="*.vue" --include="*.ts"` → **0 hits**, while
   `@mkbabb/glass-ui@7.0.0` exports `./instrument-chassis` (package `exports` map, verified). The
   producer ships the required housing; the demo has never consumed it, on any route.
3. **Boundaries.** Binding inventory is `[]` / reserve `none`. Rendered: 2 boundaries —
   `.config-section-header { border-bottom: 1px … }` (`ConfigSliderPane.vue:233`) and
   `.config-action-bar { border-top: 1px … }` (`:250`). Cf. `PROPORTION-AUDIT` PR-05.

`grep` census and geometry are in `scratchpad/D-aurora-probe.json`.

---

### N-2 · MAJOR — the selected option paints **zero pixels**; selection has no visual existence

Pass 1's state table records *"selected (in menu) | partial | 1 px pink ring spanning the full
889.86 px option"*. **That ring is the `data-highlighted` state, not selection.** Measured with the
keyboard moved two rows off the selected item (`scratchpad/D-aurora-probe3.mjs`):

| option | `aria-selected` | `data-highlighted` | background | box-shadow | outline |
|---|---|---|---|---|---|
| Analogous | **true** | – | `rgba(0,0,0,0)` | `none` | `none` |
| Split Complementary | false | `""` | `oklab(0.9156 … / 0.52)` | 2 px ring | `none` |

The producer *does* emit a marker for the checked item — measured DOM on
`[role="option"][aria-selected="true"][data-state="checked"]`:

```html
<span aria-hidden="true" class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
  <span aria-hidden="true"><span class="inline-block w-2 h-2 rounded-pill"
    style="background-color: var(--select-dot-color, var(--glass-accent, currentColor))">
```

Element present, 8 × 8 px, at (334, 331.3). Its computed paint:

```
dot.backgroundColor  = "rgba(0, 0, 0, 0)"
--select-dot-color   = ""                    (unset)
--glass-accent       = "rgba(0, 0, 0, 0)"    (DEFINED, and transparent)
```

`var()` falls through only on *undefined*, never on *transparent*. `--glass-accent` is defined, so
`currentColor` is unreachable and **the marker renders at alpha 0**.

Net: `aria-selected="true"` is announced and **nothing whatsoever is drawn**. Selected-state delta
= **0 px in light, dark, monochrome and forced colors.** This inverts `VISUAL-CONSTITUTION.md` §4.1
(*"Focus remains visibly distinct from selection in both schemes, forced colors and reduced
transparency"* — here selection is not merely confusable with focus, it is absent) and fails §4.2 /
`PROPORTION-AUDIT` §5.14's demand for *"exactly one visible marker [that] agrees with the selected
option and `aria-selected`"* with a *"nonzero selected-state delta in monochrome and forced colors"*.

The defect hides from casual capture because reka seeds the highlight onto the selected row at open
time — which is precisely how pass 1 read a ring that belongs to focus as the selection marker.

Consumer half of the cure is one token. The transparent-fallback masking is a producer packet (§5).

---

### N-3 · MAJOR — dark mode ships the producer's own *named* "dark-leg defect"

glass-ui `dist/components/aurora/composables/atoms.d.ts`, documenting the `lightnessScheme` atom,
verbatim:

> `"dark"` shifts the WHOLE ramp into the luminous-dark band [0.18, 0.42] so a derived-from-seed
> field reads as a rich luminous-dark wash behind glass in a dark shell — **never a washed-pale
> salmon field with dark cards floating on it (the dark-leg defect)**.

`shots/safari-desktop-dark/atmosphere.png` **is** a washed-pale salmon field with a dark
brown-mauve card floating on it. The producer named the exact failure mode; the demo renders it.

Cause, and it is entirely demo-side:

- `demo/scenes/atmosphere/aurora-atoms.ts:60–84` (`DEFAULT_AURORA_ATOMS`) sets no `lightnessScheme`.
- `grep -rn "lightnessScheme\|lBand\|hueSpread\|chromaVariance\|chromaCounterpoint" demo/ --include="*.ts" --include="*.vue"`
  → matches only prose inside comments; **zero assignments** anywhere in the demo.
- AuroraPane exposes no control for it. Of the producer's atom surface, the pane exposes 7 and
  declines 6 — and the one it declines that has a *visible* consequence is the one that fixes its
  own dark leg.

`VISUAL-CONSTITUTION.md` §2 requires *"Dark chrome uses the restrained neutral pole"*; §7 requires
Atmosphere to *"begin chromatic"* under a real seven-atom causal map. The dark leg fails both, and
the failure is one atom wide. No glass-ui edit is required.

---

### N-4 · MAJOR — glass-ui ships the labeled-form-control primitive, its own doc forbids pass-1's cure, and the demo consumes it **zero** times

Pass 1 correctly identified the hand-rolled row (its D-4/D-7) and proposed rendering the four enums
through `ConfiguratorRow` — then listed as open coordination question #1: *"Does `ConfiguratorRow`
accept a non-slider control in its slot with the label association wired?"*

**Answered, from the producer's own type doc** (`dist/components/configurator/ConfiguratorRow.vue.d.ts`):

> \# ConfiguratorRow vs LabeledField
> - **ConfiguratorRow** (this) — for TOKEN, PRESET controls. Carries the token-`name` reference, the
>   opt-in `reset` affordance (`canReset`), and the three-rung `size` axis. **No a11y for/id wiring.**
> - **LabeledField** — for form controls. Carries stable label, description, error, requirement,
>   state, and layout associations without styling the control.
>
> Reach for ConfiguratorRow only when token metadata or reset is the content; **use LabeledField
> directly for an accessible form control**, including inside a Configurator. Never nest both solely
> to repeat a label.

So pass-1's Move 2 would have shipped the enum rows into the one row primitive the producer
explicitly says does **not** wire `for`/`id` — i.e. it would have fixed alignment and left pass-1's
own D-7 (the inert label) unfixed.

The right primitive exists, and it is specialised for this exact case
(`dist/components/labeled-field/index.d.ts`):

```ts
export { default as LabeledField }  from "./LabeledField.vue";
export { default as LabeledSelect } from "./LabeledSelect.vue";
```

```ts
// types.d.ts
export type LabeledFieldLayout = "default" | "horizontal";
export interface LabeledSelectProps extends LabeledFieldCommonProps {
  modelValue: string; items: readonly string[]; open?: boolean; placeholder?: string;
  invalid?: boolean; disabled?: boolean; required?: boolean;
}   // + label, description, requirement, layout, errorLive
```

That is an aurora row, label column, `horizontal` layout, description, disabled and invalid states
included. Census:

```
$ grep -rn "LabeledField\|LabeledSelect" demo/ --include="*.vue" --include="*.ts"   →  0 hits
```

The demo has never used the design system's form-field layer. Owner edicts 3 (KISS, no contrivance)
and 4 (glass-ui is the design system) land here, and the finding is *sharper* than pass-1's: the
pane did not merely re-roll a row, it re-rolled a row **whose correct version ships with error,
disabled, requirement and layout states the hand-roll has none of** (see the state table, §3).

---

### N-5 · MAJOR — the pane advertises a 7-way medium axis and collapses 5 of the 7 to a single unparameterised state

Pass 1 found the identical-branch ternary (`AuroraPane.vue:85–91`). The design consequence is
larger than "four lines of comment describe a distinction the code does not make."

The producer's atom union (`atoms.d.ts:160–176`):

```ts
export type AuroraAtoms = AuroraAtomsBase & (
  { medium?: { kind: "smooth" }; interactivity?: AuroraSmoothInteractivityAtom }
| { medium: { kind: Exclude<AuroraMedium,"smooth">; amount?: number };
    interactivity?: AuroraPainterlyInteractivityAtom });
```

Every textured medium carries a second axis, `amount`. Nothing in the demo ever writes it. So
**Watercolor, Oil, Crayon, Vangogh and Oil-Pastel — five of the seven `MEDIA` options
(`AuroraPane.vue:54–62`) — each have exactly one strength, permanently.** The `MEDIUM` control
presents a seven-way choice over a space that is really 2 kinds × 1 unreachable amplitude.

`VISUAL-CONSTITUTION.md` §7 requires *"every select/axis has an observable effect on its live
preview"*. The *kind* axis clears that bar; the amplitude axis the producer exposes is unreachable
from the UI — and, per N-1, there is no live preview to observe it on anyway.

Same mechanism family, one line up: `setArrangement` (`:82–84`) rebuilds `{ count, arrangement }`
from scratch, so any sibling key on `zones` is dropped on every arrangement change. The write is
structurally lossy independent of today's atom shape.

---

### N-6 · MINOR — the italic control face clips its own terminal glyph

Pass 1 found the italic (its D-6) and read it as a voice error. It is also a **render** error.

The value box is sized to the glyph *advance* width and carries `overflow: hidden;
text-overflow: clip` (measured, `scratchpad/D-aurora-probe2.mjs`). Layout therefore reports no
overflow — `clientWidth === scrollWidth` (74 === 74 for "Scattered") — while the box's fractional
rect is 73.67 px and the italic `d` paints past its own advance. `overflow: hidden` clips **paint**,
not just layout, so the tail is sliced and no `scrollWidth` check can ever detect it.

Rendered proof at DPR 3 — `scratchpad/D-rows-3x.png`: **"Scattered" loses the right stem of its
final `d` to a straight vertical cut.** Reproduced at DPR 2 in `scratchpad/D-probe-zoom200.png`
("Scattereᴅ", "Smootһ", "Driftin").

Also new, and it compounds pass-1's D-11: at the size the `PreviewStrip` is drawn (≈40 px of an
890 px row, 4.5 %), the two harmonies the strip most needs to separate — `Analogous` and
`Monochrome` — render as **visually identical pink triples** (`scratchpad/D-probe-menu-open.png`).
The affordance is substantively correct and defeated by its scale.

---

### N-7 · MINOR — the component types itself on a **devDependency**, past a design system that already narrows the type

`AuroraPane.vue:25` — `import type { AcceptableValue } from "reka-ui";`

`package.json` `dependencies` is exactly `{ "@mkbabb/glass-ui": "^7.0.0", "@mkbabb/keyframes.js":
"^6.0.0" }` — **`reka-ui` is a devDependency**. Shipped app source types itself on glass-ui's
transitive UI kernel.

glass-ui narrows it already (`dist/components/select/Select.vue.d.ts:13–14`):

```ts
export interface SelectEmits { "update:modelValue": [value: SelectionValue] }   // string | number
```

Because the imported type is wider than the emit actually is, all four setters must launder it —
`String(v) as AuroraHarmony` (`:79`), `as AuroraZoneArrangement` (`:83`), `as AuroraMedium` (`:89`),
`as AuroraMotionAtom` (`:93`): a runtime coercion **plus** an unchecked assertion, neither of which
validates the result against `HARMONIES` / `ARRANGEMENTS` / `MEDIA` / `MOTIONS`. Owner edicts 2 (no
masking fallbacks) and 4. `import type` erases at build, so this is a layering and correctness
defect rather than a runtime one — pass 1 marked edict 8 CLEAN on form, which is right; the *source*
is the problem, not the syntax.

---

## 2. Corrections to pass 1

### C-1 · `text-caption` is not dead — it is **half**-applied, and the half that lands is the damage

Pass-1 D-6 claim 1 reads: *"`text-caption` is dead. It asks for `--type-caption` = 14.375 px; the
element computes 16.4 px. The producer class list already carries `text-dropdown` and wins."*

Measured (`scratchpad/D-probe6.mjs`, `D-probe7.mjs`), resolved **at the trigger's own container**:

```
trigger classes (type)     ["text-dropdown", "text-caption"]
computed font-size          16.4px
computed font-style         italic
--type-caption   clamp( 0.75rem, 0.71rem + 0.21vw, 1rem )               → 14.384px
--type-small     clamp( 0.875rem, 0.8rem + 0.25vw, 1.25rem )            → 16.4px
--dropdown-text  calc(clamp( 0.875rem, 0.8rem + 0.25vw, 1.25rem ) * 1)  → 16.4px
```

and glass-ui's rule is exactly one declaration: `text-dropdown { font-size: var(--dropdown-text) }`.

So:

- the **font-size** arm of `text-caption` loses to `text-dropdown` — pass 1 is right on that arm;
- the **`font-style: italic`** arm has *no competitor* (`text-dropdown` declares font-size only),
  so it lands, on all four triggers and all eighteen options. `text-caption` is the sole source of
  the slant. It is not dead.

This matters for the cure, and the corrected reading is *better news* than pass 1's: **glass-ui's
`text-dropdown` already resolves to `--type-small` = 16.4 px — exactly the rung
`VISUAL-CONSTITUTION.md` §4 mandates for controls and dropdown options.** The producer default is
canon-conformant. The consumer's `text-caption` therefore buys nothing but the italic — which
breaches §4's closed matrix (the italic caption is the annotation voice; §4 puts controls and
options at non-bold Plus Jakarta `text-small`) and clips glyphs (N-6). Deleting the eight
`text-caption` stamps needs **no replacement class**; the producer role is already correct
underneath. Pass-1's framing ("the rendered component is not the component that was designed")
implies a specificity bug to chase; there is none.

Pass-1's D-6 claims 2 (`--select-font` dead) and 4 (`min-w-menu` inert) are confirmed. Claim 3
(`max-h-[16rem]` dead) is confirmed with a sharper number: computed `max-height` on the open listbox
measures **384px**, not the 256 px the class asks for.

### C-2 · the `1/√φ` clause does not govern this component

Pass-1 D-8 judges AuroraPane's label:value ratio against `PROPORTION-AUDIT.md:15–16`'s
`label/headline = 1/√φ`. That clause is **Picker-specific**: `:15` opens *"W20/W29 therefore freeze
this result"* and `:16` is P019's paired clamp for the Picker identity/headline pair;
`VISUAL-CONSTITUTION.md` §4 names it *"the sole paired-scale exception"* for Picker. It does not
reach a form label and its control value.

The correct authority for these rows is §4's role matrix, under which **both** a control and a label
sit at `text-small` — so an equal rung between the two is not itself a defect. Pass-1's *observation*
survives intact and is the real finding, restated correctly: the enum label wears the **mono /
uppercase / caps-tracked / muted** voice that `.config-section-title` uses for a **group heading**
(the two rules are byte-identical, `AuroraPane.vue:194–200` vs `ConfigSliderPane.vue:237–243`;
measured identical computed values), so a leaf label is typographically indistinguishable from the
section title beneath it while differing from its own peer labels in family, weight, tracking, case
and colour. That is a §4 jurisdiction breach and a hierarchy inversion. It is not a `1/√φ` breach.

The mobile 14 px : 21 px figure pass 1 reports also needs care: it compares the mono label token
against a differently-clamped value rung; it is a real cross-viewport inconsistency, but
`PROPORTION-AUDIT.md:16`'s *"Mobile and desktop use the same source"* is likewise a P019/Picker
sentence. The honest statement is: two clamps, two crossing curves, no single source — a §3.7
container-scaling breach (which pass-1 already lands independently as its D-5).

### C-3 · pass-1's Move 2 names the wrong primitive

Superseded by **N-4**. `ConfiguratorRow` is documented "No a11y for/id wiring"; `LabeledField` /
`LabeledSelect` is the producer's named component for an accessible form control, and it is unused
in the demo. The revised cure is in §5.

---

## 3. State coverage — delta from pass 1

Pass-1's table is sound. Three rows change:

| state | pass 1 | pass 2 | evidence |
|---|---|---|---|
| **selected (in menu)** | "partial — 1 px pink ring" | **BROKEN — 0 px delta** | N-2; the ring belongs to `data-highlighted`, not `aria-selected` |
| **forced-colors** | "unproven, both ways" | **partially RESOLVED** | measured under `forcedColors: "active"`: focused trigger reports `outline-style: solid`, `outline-width: 2px`, `outline-color: rgba(5,0,73,.8)`, `border: 1px solid rgba(5,0,73,.8)` — **focus and boundary both survive**, the producer handles it. What does *not* survive is selection (N-2), and the ragged column (pass-1 D-3) becomes conspicuous once glass is stripped: see `scratchpad/D-probe-forced-colors.png` |
| **disabled / error** | "NO" | **NO, and now attributable** | `LabeledSelect` ships `disabled`, `invalid`, `requirement` and an `error` slot (N-4). The hand-rolled row has no seat for any of them — the states are not merely unimplemented, the chosen primitive cannot express them |
| **truncated / zoomed** | BROKEN | **CONFIRMED, same numbers** | independently measured at 720×450 / DPR 2: `.pane-scroll-fade` scrollHeight **567** / clientHeight **259** = 45.7 % visible; `.app-layout` 456/450 |
| **RTL** | sound | **CONFIRMED sound** | measured `dir=rtl`: labels 1086.9…1145.6, triggers all x 224, `scrollWidth === 1440` |

---

## 4. Independently re-measured and confirmed

Stated so convergence is visible rather than assumed. All from
`scratchpad/D-aurora-probe.{mjs,json}` against `http://localhost:9000/#/atmosphere`.

- **Ragged control column**, 1440: trigger `x` = 318.10 / 365.06 / 306.41 / 306.41, widths
  897.86 / 850.94 / 909.59 / 909.59 — spread **58.65 px**, exactly the label-width delta
  (`ARRANGEMENT` 129.06 − `MEDIUM` 70.41). Mobile 390: spread 50.08 px = 14.0 % of the 358 px card.
  **New arm — 320 px:** the `min-w-menu` floor (`--menu-min-w: 11rem` = 176 px,
  `foundation.css:445`) clamps two rows, giving 176 / 176 / 181.9 / 181.9 — a 5.9 px mismatch, too
  small to read as intent, large enough to read as broken.
- **Label voice identity**: `.aurora-row-label` and `.config-section-title` both compute
  `"Fira Code" 16.4px, uppercase, letter-spacing 1.64px, rgb(112,89,66)` — zero delta between a
  leaf label and a group heading.
- **No page or console errors** on the route in any of the four Safari matrices
  (`visual/REPORT.md:126,141,156,171`).
- **No horizontal overflow** at 1440 / 390 / 320 / 720-dpr2 / RTL: `scrollWidth === innerWidth`.
- **The harmony strips tell the truth** — `aurora-harmony-stops.ts:38` resolves through
  `resolveCalibratedAtmosphere({...atoms, harmony})`; six visibly distinct palettes render in
  `scratchpad/D-probe-menu-open.png`. **C2 "aurora palette-blind static-Sky" did not reproduce
  here.**
- **`SelectItem`'s `#description` slot is real producer API** (`SelectItem.vue.d.ts` declares
  `description?: (props: {}) => any`) — the `PreviewStrip` usage is not a slot invention.
- **Reduced motion** — not born-RED, per the root's verified `raf/1.5 s = 0`.
- **Edicts 1 (no god module), 6 (no motion deleted — the component declares none), 8
  (`verbatimModuleSyntax`)** remain CLEAN.

Cross-engine check: the Safari capture and my chromium probe agree on the pane rect to <5 px, so
every geometry claim here is engine-independent. My probe ran against a dev server displaying a
`DEV MISCONFIGURED` shell badge; it affects no measurement used above and does not appear in the
Safari matrix.

---

## 5. Revised cure — three moves, one of them corrected

The consolidated 19-defect set collapses into three mechanisms: **the route has no protagonist
region**, **the pane hand-rolls a form field the design system already ships**, and **the atom door
is narrower than the producer's**.

**Move 1 — the pane becomes an instrument.** (Unchanged from pass 1, with the binding citation.)
Build `/atmosphere` as the P122 `preview-dominant` `InstrumentChassis`
(`@mkbabb/glass-ui/instrument-chassis`, currently 0 usages in `demo/`): a bounded live aurora stage
at 66.6666667 %, the atom inspector at 33.3333333 %, boundaries `[]`, reserve `none`, form sections
not Cards, order preview → essentials → advanced, mobile stage → inspector → action. Closes
pass-1 D-1/D-9/D-10 and N-1, satisfies PR-10, retires the inner scroller, and — by removing two
thirds of the inline space from the form — makes the 890 px trigger (and therefore most of pass-1's
D-2 blast radius, and N-6's 4.5 % specimen) structurally impossible.

**Move 2 — CORRECTED: consume `LabeledSelect`, not `ConfiguratorRow`.** Delete `.aurora-row`,
`.aurora-row-label`, the wrapper `<div>` at `AuroraPane.vue:118` and all eight `text-caption`
stamps. Render the four enum atoms as `LabeledSelect layout="horizontal"` (label column, real
`for`/`aria-labelledby`, `disabled`/`invalid`/`description`/`error` seats) and keep the three
numerics on `ConfiguratorRow` + `Slider`, both inside one `<Configurator>` supplying the size rung.
One spine, one measure, one container-scaled rhythm, one label voice, one accessible name per
control — and the italic dies with the class, taking N-6's glyph clip with it and leaving the
producer's already-conformant `text-dropdown` (= `--type-small`) in place with no replacement class
needed. Closes pass-1 D-3/D-4/D-5/D-6/D-7/D-8 and N-4, N-6, and C-1.

**Move 3 — widen the atom door to the producer's actual surface.** Type the setters on glass-ui's
`SelectionValue`, drop the `reka-ui` import and the four `String(...) as …` launders (N-7), collapse
the dead ternary to one write, and expose the two atoms whose absence is currently *visible*:
`medium.amount` (a slider mounting only for textured kinds — N-5) and `lightnessScheme` (defaulted
from the resolved colour mode, which alone cures the dark leg — N-3). Read `zones.count`'s ceiling
from the producer instead of the hand-copied `6` (pass-1 D-12), and replace the getter functions
with `computed` (pass-1 D-17).

### Coordination packets to glass-ui — answers and one new item

glass-ui is `@mkbabb/glass-ui@^7.0.0` and is **not ours to edit this formation**; these are mail,
not waves.

1. **Pass-1's open question #1 is ANSWERED and needs no packet.** `ConfiguratorRow` is documented
   "No a11y for/id wiring"; `LabeledField` / `LabeledSelect` is the producer's named component for
   an accessible form control and already ships. Consumer-side fix only.
2. **`SelectContent` resting opacity** (pass-1 D-2 — α 0.7488 content / α 0.52 option, `blur(11px)`)
   is insufficient to occlude 16.4 px text over a live chromatic canvas. Producer recipe. **Stands.**
3. **`--select-font` seam** (pass-1 D-6 claim 2) — the demo's root override does not reach the
   Glass 7 trigger. **Stands.**
4. **NEW — the selected-marker fallback chain swallows itself.** `SelectItem`'s marker inks through
   `var(--select-dot-color, var(--glass-accent, currentColor))`. `var()` falls through only on
   *undefined*; a **defined-but-transparent** `--glass-accent` (measured `rgba(0,0,0,0)` at `:root`
   in this app) therefore wins and `currentColor` is never reached, so the marker paints at alpha 0
   and every `aria-selected="true"` option is visually unmarked. Suggested producer fix: ink the
   marker through a token that cannot be transparent, or floor the chain (`color-mix` /
   `@supports`) rather than relying on undefined-only fallthrough. Any consumer under a
   transparent-accent root inherits an invisible selected state — this is not AuroraPane-local.

---

## 6. Verdict

**DEFECTIVE.** Nineteen distinct design defects across the two passes; two blockers, both confirmed.

The strongest defect is **N-1 / pass-1 D-1**: `OPTICAL-BENCH-COMPOSITIONS.md:46` binds Atmosphere to
a `preview-dominant` chassis — Aurora preview 66.6666667 %, inspector 33.3333333 %, "form sections
not Cards", boundaries `[]` — and the route ships **0 % preview / 100 % inspector inside a Card
with two boundaries**, with `InstrumentChassis` unconsumed anywhere in `demo/`. The surface built to
tune the atmosphere is the surface covering it.

The most *correctable* defect is **N-4**: the design system already ships `LabeledSelect` with the
label column, the association, and the disabled/invalid/error seats this pane lacks, and the demo
has never once imported it. Pass 1 reached for `ConfiguratorRow` and would have shipped the
alignment fix while leaving the inert label in place; the producer's own doc says which component to
use.

---

**Report path:** `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AuroraPane/challenge-D-design.md`
**Pass 1 preserved:** `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AuroraPane/challenge-D-design-pass1.md`
**Probes (tracked):** `.../AuroraPane/pass2/probes/` — `D-aurora-probe.mjs` + `.json`,
`D-aurora-probe2.mjs`, `D-aurora-probe3.mjs`, `D-probe4.mjs`, `D-probe5.mjs`, `D-probe6.mjs`,
`D-probe7.mjs`. Run any of them with `node <file>` against a live `http://localhost:9000`.
**Frames (tracked):** `.../AuroraPane/pass2/frames/` —
`D-probe-{desktop-1440,mobile-390,narrow-320,zoom200,forced-colors,rtl,menu-open}.png`,
`D-rows-3x.png` (the DPR-3 glyph-clip crop), `D-menu-kb.png` (selection vs keyboard highlight),
`D-fc-focus.png` (forced-colors focus).

Every `scratchpad/…` path cited in the body resolves to the corresponding file under
`pass2/probes/` or `pass2/frames/`.
