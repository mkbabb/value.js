# JUROR-2 — ARCHITECTURE AND ISOMORPHISM

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with. Declared at spawn, not inherited. (SCOPE.md M-1/M-2/M-11.)

Subject: `demo/scenes/ConfigSliderPane.vue` (252 lines) · repo `/Users/mkbabb/Programming/value.js`,
branch `tranche-u`, HEAD `c654824e`.
Consumers: `demo/scenes/atmosphere/AuroraPane.vue` (201 lines, 3 sliders + 4 enum rows) ·
`demo/scenes/blob/BlobPane.vue` (130 lines, 31 sliders).

**Verdict: APOTHEOSIS_REQUIRED.** The cure is an architectural transposition, not a patch. The
component is a demo-local re-implementation of a design-system package the demo already imports
from, and it consumes exactly one of that package's five primitives.

---

## §0 — What I measured myself, and what it overturned

I did not adjudicate on the challengers' numbers alone. Four private Chromium probes against the
live dev server (`http://localhost:9000`, read-only, isolated `chromium.launch()` per probe — the
shared MCP browser was contended) plus a byte read of the producer's shipped `d.ts` and CSS.

Probe scripts and raw JSON: session scratchpad `j2/{probe,variant,fill,isolate,clean}.mjs`.
The consolidated, runnable gate is committed at
`docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gates/csp-gate.mjs`.

**The single most important thing I found is not in any of the three challenge reports, and it
refutes the one cure all three of them converge on.**

All three challengers (D-3 · D-14, L-6, C-3) prescribe: *drop `variant="spectrum"`, consume the
producer's default Slider, and `.slider-range` will paint the filled extent.* I measured that
proposition directly — flipping only the `data-variant` attribute on a live row, mutating no custom
property (`j2/clean.mjs`):

| | `data-variant` | `.slider-range` background | `.slider-range` box-shadow | thumb |
|---|---|---|---|---|
| as shipped | `spectrum` | `rgba(0, 0, 0, 0)` | `none` | 12 × 24, opacity 1 |
| **flip only** | `standard` | **`oklab(0 0 0 / 0)`** | `oklab(0 0 0 / 0) 0 0 0 0 inset, …` | **0 × 20, opacity 0** |

Both recipes render an **unpainted value extent** on this surface, and the standard arm additionally
removes the only surviving value cue (the handle). The prescribed cure would make the control
strictly *less* readable than it is today.

This is not a token misconfiguration in the demo: `--liquid-fill-tint` resolves correctly on that
element (`oklch(0.88 0.1 75)`), and a bare `<div class="glass-liquid-fill">` injected into the same
subtree paints a real fill (`oklab(0.88 0.0259 0.0966 / 0.88)`, `j2/isolate.mjs`). The producer's
`.glass-liquid-fill` rule lives in `@layer components`
(`node_modules/@mkbabb/glass-ui/dist/styles/glass/liquid-fill.css`), while every SFC-scoped
`.slider-range[data-v-4f4cab01]` rule in `dist/glass-ui.css` is **unlayered** — and unlayered
declarations beat every layered one. I label the precise cascade path a **HYPOTHESIS**; the
observation is reproduced and is not.

**Consequence for the wave:** the value-read cure is *not* a variant retirement. It is a producer
relay plus a root-level feed of the producer's own published seam `--slider-range-bg` — moving one
token from the wrong element (the inert groove) to the right one (the filled extent). That inverts
figure and ground with a single declaration and is measurable. Details in §4 and G2.

Everything else I measured (all reproduced independently of the challengers):

```
reset          ["#ffbde0","#ffdde5","#fff6f6","#fff6f4"] → ["#b5947f","#d4b27d","#dad6b1"]
aria           31 of 31 config sliders aria-valuetext EMPTY; picker sliders on the same page:
               "Lightness 92.0%" / "a axis 88.8" / "b axis 20.0"
grouping       7 drawn sections · role=group 0 · fieldset 0 · heading 0 · aria-labelledby 0
labels         31 <label> of 31 orphaned (no for, no wrapped control)
size axis      .configurator-row data-size = null · component min-block-size 35.84px ·
               rendered row height 60.97px  (the clamp misses by 25px — inert)
shells         .config-console carries `console-well`, nested inside DIV.glass-resting.card
scroll         .pane-scroll-fade maskImage "none" · scrollHeight 2611 / clientHeight 695 = 3.76
geometry       track 432×24 · range 163.47 wide (= the value, correctly sized, painting nothing)
               thumb 12×24 — the single distinct width across all 31 rows
```

---

## §1 — The mechanism, named once

Eleven of the thirteen structural findings and nine of the twenty-one design findings reduce to one
mechanism:

> **`ConfigSliderPane.vue` is a demo-local re-implementation of `@mkbabb/glass-ui/configurator`,
> written by a file that imports from `@mkbabb/glass-ui/configurator` and consumes one of its five
> exports.**

That is the isomorphism break. The producer package exports
(`dist/components/configurator/index.d.ts`):

```
Configurator · ConfiguratorLayer · ConfiguratorRow
CONFIGURATOR_SIZE_KEY / provideConfiguratorSize / useOptionalConfiguratorSize
useConfiguratorState
```

The component imports `ConfiguratorRow` (line 21) and re-mints six concepts that already have homes:

| demo re-mint | line(s) | producer home | proof it is the same concept |
|---|---|---|---|
| `.config-section-header` + `.config-section-title` | 128-130, 232-243 | `ConfiguratorLayer` | *"labeled section inside a `<Configurator>`'s controls column… header trigger + chevron + collapsible body"*, `dividers` prop, `role=button` + `aria-expanded` + `aria-controls` — `ConfiguratorLayer.vue.d.ts` |
| `resetDefaults()` (`Object.assign` + `structuredClone`) | 92-94 | `useConfiguratorState<T>` | typed `config`, `resetCurrent()`, `isDirty`, `clone`, `equals` — `useConfiguratorState.d.ts` |
| `.pane-scroll-fade` + `overflow-y-auto`, fade absent | 106 | `FadingScroll axis="y"` | `Configurator`'s own `scrollMode: "auto"` *"renders a `<FadingScroll axis='y'>` scroll-port (sharp at rest, feathered while overflowing)"* — `Configurator.vue.d.ts` |
| `:deep(.configurator-row) { min-block-size: clamp(2rem, 7cqi, 2.625rem) }` + `class="gap-1.5 py-1"` | 215-217, 142 | the `size` axis | `provideConfiguratorSize()` is a **standalone export**; `.configurator-row[data-size=sm\|md\|lg]` ships `--configurator-row-gap-*` / `--configurator-row-py-*` in `glass-ui.css` |
| `.console-well` (a second bordered, radiused, opaque surface) | 122 + `foundation.css:350-354` | `.configurator-layer` | `background-color: var(--configurator-section-tint)` + border + radius, `components/configurator/styles.css` — **already loaded** via `styles/index.css`, which `foundation.css:56` imports |
| `.config-action-bar` nuclear reset | 163-174, 245-251 | `ConfiguratorRow.canReset` + `reset` emit | *"The reset button is opt-in via `canReset`; emits a `reset` event"* — `ConfiguratorRow.vue.d.ts`; the row also auto-names it `Reset {label}` |

And one concept with **no producer home and no right to exist**: the stringly-typed reflection layer
(`readPath` / `writePath` / `read(): number` / `Record<string, unknown>` / four
`(x as unknown) as Record<string, unknown>` call-site casts). It is the price the component paid to
be generic over two unrelated config shapes, and it is the direct cause of the BLOCKER (a
shape-blind reset), the crash class (`as number` over a provably-`undefined` read), and 37 lines of
compensating mapped-type machinery in `BlobPane.vue`.

The component's own header comment (lines 6-10) names the package and declines it:

> *"The section-group wrapper and the floating copy/reset dock remain demo-local (they are thin
> structural shells, not the row primitive)."*

They are not thin shells. One of them is where the BLOCKER lives.

---

## §2 — Adjudication

Merged by mechanism. A defect with bytes and a reproduction is UPHELD regardless of how minor it
sounds; a defect asserted without one is a HYPOTHESIS and is marked.

### Upheld

| id | defect (merged) | challengers | status | severity | disposition |
|---|---|---|---|---|---|
| **A-1** | **Reset is shape-blind.** `Object.assign(config, structuredClone(defaults))` is a depth-1 merge; nested runtime state under any top-level key present on `defaults` is destroyed. `color.paletteStops` — declared out of the slider domain by `BlobPane.vue:8-9` — is wiped by one click. | C-1 · L-1 | **UPHELD_REPRODUCED** (my probe, §0) | BLOCKER | BUILD (MT·W-CSP) |
| **A-2** | **The control communicates no value.** `.slider-range` is correctly sized (163.47 of 432 = the value) and paints nothing, in **both** shipped variants; the inert track is re-inked from a body-text token so it reads as 100% filled. Figure and ground are inverted on all 34 rows. | D-3 · D-4 · D-14 · L-6 · C-3 | **UPHELD_REPRODUCED** | BLOCKER | BUILD |
| **A-3** | **The reflection layer.** `Record<string, unknown>` + dot-path strings + `read(): number` over a value the type system says is `unknown` + 4 call-site double-casts + a 37-line mapped type reconstructing the safety thrown away. `readPath` guards every hop, `writePath` guards none. | C-5 · C-11b/c · D-16 · L-7 · L-8 | **UPHELD_BY_BYTES** (crash reproduced by injection only — labelled) | MAJOR | BUILD |
| **A-4** | **Two voices, one control.** 31 of 31 config sliders ship an empty `aria-valuetext` while the formatted value is rendered to the eye; the repo's own cure (`useSliderAnnouncements.ts`) was written for the first slider population and never consumed by the second. | C-2 | **UPHELD_REPRODUCED** | MAJOR | BUILD |
| **A-5** | **Drawn structure, unannounced.** 7 sections → 0 `role=group`, 0 `fieldset`, 0 heading, 0 `aria-labelledby`; 31 orphan `<label>` elements labelling nothing. | C-6 · L-4 | **UPHELD_REPRODUCED** | MAJOR | BUILD |
| **A-6** | **Two inert cures carrying live claims.** The "ONE RHYTHM SOURCE" clamp resolves 25px below the row's natural height and never binds; the `@media (pointer: coarse)` `::before` resolves `max(100%, 44px)` = 100% and adds zero — on a route where the pane does not mount at coarse widths at all. | C-7 · D-12 | **UPHELD_REPRODUCED** | MAJOR | BUILD |
| **A-7** | **The producer size axis is unused.** `data-size` is `null` on every row; the component replaces the producer's gap/padding ladder with Tailwind utilities plus a `:deep()` correction. | D-12 · L-11 | **UPHELD_REPRODUCED** | MAJOR | BUILD |
| **A-8** | **A second surface tier inside the pane.** `.console-well` nests a bordered/radiused opaque sub-card inside `DIV.glass-resting.card`, on two compositions whose binding inventory gives Card count `0` and forbids a settings Card stack by name. | D-8 · L-14 | **UPHELD_REPRODUCED** | MAJOR | BUILD (inner well only — see dissent §3.2) |
| **A-9** | **Eight forbidden dividing lines.** 7 section-header `border-bottom` + 1 action-bar `border-top`, where `OPTICAL-BENCH-COMPOSITIONS.md:80-81` gives Atmosphere and Blob `Retained non-P122 dividing line: none` and `:90` calls any additional line a defect. Scheme-asymmetric: 1.08:1 light / 5.03:1 dark. | D-6 | **UPHELD_REPRODUCED** (8 ruled edges, gate G10) | MAJOR | BUILD |
| **A-10** | **The bare `<slot />` licensed a second row species.** One unnamed region slot let `AuroraPane` re-mint the nearest recipe it could see: `.aurora-row-label` (`AuroraPane.vue:194-199`) is a **byte-identical five-declaration copy** of `.config-section-title` (`ConfigSliderPane.vue:237-243`) — a *section heading* recipe wearing a *control label*'s job, at 15px different indent and 1.69× different height, on a different material tier. | D-13 · D-7 | **UPHELD_BY_BYTES** (the two CSS blocks, read and compared) | MAJOR | BUILD |
| **A-11** | **The canonical composition is unrepresentable.** `SliderSection` has no disclosure axis, so 31 rows ship flat behind a hard clip: `scrollHeight 2611 / clientHeight 695 = 3.76 screens`, `maskImage: "none"`. The canon names the regions `preview; essentials; advanced/reset/compare`. The class name `pane-scroll-fade` and the comment at :104-106 both promise a fade that does not exist. | D-9 · D-17 | **UPHELD_REPRODUCED** | MAJOR | BUILD |
| **A-12** | **Two actions with no result state.** `copyAsJson` awaits a `CopyResult` and discards it — both documented failure modes (`no-api`, `clipboard-api`) are silent, and the bare `@click` on an async fn makes a rejection unhandled at every other demo call site's stated idiom (`void writeClipboard(…)`). Reset is destructive, unconfirmed, irreversible, with no compare and no status region. | D-10 · C-4 · L-12 | **UPHELD_REPRODUCED** (challenger probe; contract read from `useClipboard-D36OTaeT.js`) | MAJOR | BUILD |
| **A-13** | **The 12px handle.** 31 thumbs at 12 × 24 in every desktop matrix — half the WCAG 2.5.8 inline minimum — under a comment claiming a ≥44px rung. Producer-owned geometry (`--slider-thumb-size` × the spectrum recipe's `.75`). | D-5 · C-8 · L-11 | **UPHELD_REPRODUCED** (widths = `[12]`, gate G9) | MAJOR | BUILD + producer relay |
| **A-14** | **Forced colors: no control, no focus.** The track's entire definition routes through one channel (`background`), which forced-colors overrides to Canvas; focus ships as `box-shadow` with `outline-style: none`, which forced-colors strips. `grep -rn forced-colors demo/scenes/` → 0. The producer's standard arm has the same shape: `.glass-slider:not([data-variant=spectrum]):focus-within .slider-track { box-shadow: var(--focus-ring-shadow) }` — a shadow, in the one mode shadows do not paint. | D-1 | **UPHELD_BY_BYTES** (+ challenger's Chromium `forcedColors:"active"` probe) | BLOCKER | BUILD (producer relay) |
| **A-15** | **Vacuous gate.** No test in the repository exercises any behaviour of this file. `o7-card-census` explicitly excludes it and substitutes a grep; `o18-contrast-census` asserts computed colours only. `update()` can be replaced by a no-op — all 34 sliders read-only — and every gate stays green. | C-10 | **UPHELD_BY_BYTES** (`o7:38-42`, `o18:924-966`, `o18:1161-1210` read) | MAJOR | BUILD |
| **A-16** | **The o18 GRAPHICS leg certifies the wrong object.** It asserts `.slider-track` ≥3:1 against the well — the *inert* channel — and never asks whether the value position reads. It was authored born-RED against `--secondary` and green against the `--ink-muted` re-ink, so the oracle is green while the control is unreadable, and the correct cure would break it. | L-6 · C-3 | **UPHELD_BY_BYTES** (`o18:1150-1215`) | MAJOR | BUILD (re-aim, §5 G2) |
| **A-17** | **Dependent-control state was never modelled.** At `Satellites = 0`, five sliders remain enabled, focusable and draggable with live readouts and no effect. `SliderDef` has no `disabled`/`enabledWhen`; `aria-disabled` is `null` on every thumb. The producer Slider ships `disabled` (`slider/types.d.ts`). | D-15 | **UPHELD_BY_BYTES** (`BlobPane.vue:59-62, 111-112`; `SliderDef` at :27-33) | MAJOR | BUILD |
| **A-18** | **Readout jitter and false precision.** No tabular figures, no reserved width, precision inferred from the *value* rather than the statically-known `step` — a ~27px live width swing mid-drag on nearly every row, and `0.500` on a `step: 0.1` field. No `unit` field, so `Merge (ms)` smuggles its unit into the label while `Hue Range` (degrees) has none. | D-11 | **UPHELD_REPRODUCED** (challenger measurement; `fmt` at :84-86 read) | MAJOR | BUILD |
| **A-19** | **`demo/ui/` is a 19-barrel pure-alias shim over glass-ui, and both paths are live in one 8-line import block.** 90 imports through the shim, 37 bare root-barrel, 82 subpath. `ConfigSliderPane.vue:16-18` uses the shim for `Button`/`Card`/`Slider` and :20-23 goes direct for `GlassDock`/`ConfiguratorRow`/`writeClipboard`. Edict 2 (no aliases/dual paths) and edict 4. | L-2 | **UPHELD_BY_BYTES** (all 19 `index.ts` read; counts measured) | MAJOR | BUILD (3 sites, MT·W-CSP) + FOLD (87 sites → **MT·W-UISHIM**) |
| **A-20** | **Root-barrel import for one function.** `import { writeClipboard } from "@mkbabb/glass-ui"` pulls `dist/glass-ui.js` (25,239 B, 46 static chunk deps, CSS-bearing chunks declared side-effectful by name) where `./dom` (4,179 B, 6 deps) is the function's home. 74 subpath keys are published; 17 demo sites take the barrel. | L-3 | **UPHELD_BY_BYTES** | MINOR | BUILD (1 site) + FOLD (**MT·W-UISHIM**) |
| **A-21** | **`tsconfig.demo.json` `paths` ≠ `package.json` `exports`.** Three declared keys are not exports and have no target on disk (`@mkbabb/value.js` root, `/parsing`, `/units` — `dist/index.d.ts`, `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts` all absent); two real exports (`./css`, `./value`) have no `paths` entry, so the demo's 10 `@mkbabb/value.js/css` imports typecheck against the installed 4.0.0 tarball while Vite aliases them to this checkout — and those two `.d.ts` files **differ**. The demo is the dogfood gate and the gate is aimed at a stale artefact. | L-5 | **UPHELD_BY_BYTES** (verified: exports = 7 keys, no `"."`; the three `ls` failures reproduced) | MAJOR | FOLD (**MT·W-DOGFOOD-PATHS**) |
| **A-22** | **Pane identity is three string-keyed tables with a masking fallback**, and `/#/blob` is unreachable by URL on mobile. `usePaneRouter.ts:81-95` ends `return ColorPicker` for any unknown name — a rename in `viewSchema` cannot fail a typecheck. `viewSchema.ts` gives `blob { left: "color-picker", right: "blob" }` with **no `defaultPaneIndex`**, so mobile resolves to pane 0 = the picker; `palettes` and `mix` set `defaultPaneIndex: 1`, `blob` does not. Below 1024px the Blob configurator leaves the DOM entirely. | L-10 · D-2 · C-13 | **UPHELD_BY_BYTES** (both files read; the `defaultPaneIndex` asymmetry confirmed) | MAJOR | FOLD (**MT·W-PANETABLE**) |
| **A-23** | **A global class emitted from a leaf, with an untyped parent contract.** `.pane-scroll-fade` is defined in `PaneHeader.vue`'s **unscoped** `<style>` and must be applied by all 9 of its consumers or the header's scroll choreography silently does nothing. The sibling cross-pane class `.console-well` lives in `foundation.css`. Two cross-pane classes, one category, two homes — and this component is the only one of the nine that puts it on an inner div rather than the pane Card root. | L-13 | **UPHELD_BY_BYTES** | MINOR | FOLD (**MT·W-PANESHELL-CLASS**) |
| **A-24** | **Feature → shell/boot up-edge.** `demo/scenes/atmosphere/aurora-harmony-stops.ts:23` imports `../../color-picker/composables/boot/atmosphere-calibration`; `demo/color-picker/` is the Vite `root` — the shell. A read across an inverted edge is still an inverted edge. | L-9 | **UPHELD_BY_BYTES** | MINOR | BUILD (MT·W-CSP — it is in the subject subtree) |
| **A-25** | **Dead branches and false documentation.** `:44` promises an empty state with no `v-else` anywhere; `:119` and `:163` are permanently-true guards; `:3` documents an `extraControls?` prop that :41-52 never declares; `:98`/`:101` carry `relative` with no positioned descendant and `mx-auto` on a `w-full` element. | D-20 · D-21 · C-11a | **UPHELD_BY_BYTES** | MINOR | BUILD |
| **A-26** | **RTL half-mirrors and promotes the destructive verb.** The label/value pair mirrors, the track does not; the readout is not LTR-isolated; the action bar renders `Reset` before `Copy JSON`. | D-18 | **UPHELD_BY_BYTES** (`shots/rtl-desktop/blob.png`) | MINOR | BUILD |
| **A-27** | **Truncating label with no fallback channel.** Producer `truncate` clips at `clientWidth 392 / scrollWidth 413` with `title: null`; the full string survives only in `aria-label`. Latent (longest shipped label is 13 chars), reproduced by substitution. | D-19 | **HYPOTHESIS** (latent state, reproduced only by DOM substitution) | MINOR | BUILD (cheap: the schema declares a label budget) |
| **A-28** | **Whole-pane render fan-out.** `read()`, `fmt()` and the `[read(def.key)]` literal all evaluate in the render function; one keystroke re-creates 31 Slider vnodes. Measured +1.21 ms mean (+22%) for 10× the rows ≈ 43 µs/row. | C-12 | **UPHELD_REPRODUCED** (challenger measurement, numbers stated) | INFO | BUILD (falls out free from A-3's lens) |
| **A-29** | **No value.js dogfood in the app's second-largest control population.** 34 numeric controls, 34 numeric readouts, zero `@mkbabb/value.js` imports; `fmt` is the fourth hand-rolled numeric formatter in the demo. A proof gap, not a correctness defect. | L-15 | **UPHELD_BY_BYTES** | INFO | RETIRE (see §3.5) |

### Dismissed

| id | claim | why dismissed | refuting bytes |
|---|---|---|---|
| **L-16** | `/#/blob` drifts off-route in Chromium; `--ink-muted` unstamped; degenerate `oklch(none 0.2 30)` in the URL | Not reproduced. Four independent isolated-Chromium probes of mine navigated to `/#/blob` and stayed, with the console mounted and 31 rows present. The challenger self-labelled it a hypothesis and recorded that the shared MCP browser was being driven concurrently by other seats. This is a probe-hygiene artefact of a contended browser, not a component or shell defect. | `j2/probe.mjs`, `j2/clean.mjs`: `url: "http://localhost:9000/#/blob?space=lab&color=lab(92%25+88.8+20+/+82.7%25)"`, `hasConsole: true`, `configCount: 31`. The structural half (three pane tables + masking fallback) is upheld separately as A-22. |
| **D-3/L-6/C-3 cure** | *"drop `variant='spectrum'` and the producer's default `.slider-range` will paint the filled extent"* | **Refuted by measurement.** Flipping only `data-variant` yields `background-color: oklab(0 0 0 / 0)`, a fully-transparent rim shadow, and a `0 × 20` opacity-0 thumb. The prescribed cure removes the last remaining value cue. The *defect* (A-2) stands; the *cure* does not. | `j2/clean.mjs` (§0 table); `dist/glass-ui.css` — `.slider-thumb[data-v-4f4cab01]{width:0;…;opacity:0}` is the base rule and `width: calc(--slider-thumb-size * .75); opacity: 1` is **spectrum-scoped**. |
| **L-4 cure** | *"Compose the producer whole: `<Configurator>` for the size axis"* | `<Configurator>` is a **studio**, not a section stack: it renders `class="configurator glass-floating rounded-panel border border-border/60"` over a stage/aside CSS grid. Nesting it inside the pane's `glass-resting` Card creates a **third** surface tier and a stage this pane has no stage for — worsening A-8, not curing it. VISUAL-CONSTITUTION.md:19: *"One surface has one tier."* The size axis does not require the chassis: `provideConfiguratorSize()` is a standalone export. | `dist/configurator-M5OaIlJd.js` class strings; `dist/components/configurator/styles.css` `[data-slot="configurator"]` grid rules; `dist/components/configurator/size.d.ts`. |
| **D-8 cure** | *"Compose `InstrumentChassis`' inspector region and drop both shells"* | `grep -rn "instrument-chassis\|InstrumentChassis" demo` → **0 hits**. The demo has never adopted InstrumentChassis anywhere; doing it for one pane is a shell-wide chassis migration across the 9 panes that share `.pane-scroll-fade`, and `OPTICAL-BENCH-COMPOSITIONS.md` assigns Atmosphere/Blob chassis closure to W28/W29. The defect stands; the component-scope cure is deleting the **inner** well. | measured grep; OBC §3.1 and the Atmosphere/Blob rows. |
| **L-13 cure** | *"a `demo/shared/PaneShell.vue` that renders header + scroll region together"* | Edict 3 forbids a **new wrapper component that does not already exist**. It would also rewrite 9 panes for a class-home problem whose honest fix is a 2-line move. The defect stands as A-23 and folds. | owner edict 3; 9 `.pane-scroll-fade` consumers measured. |
| **L-7 cure** | *"`demo/shared/config-path.ts` exporting `readPath`/`writePath` with symmetric guards + a vitest beside it"* | This **promotes** the reflection layer to a repo-wide primitive and ships a well-tested wrong abstraction. A guarded `readPath` cannot restore the type information the string erased, and it cannot make A-1 unrepresentable. The defect stands as A-3; the cure is deletion, not extraction. | `ConfigSliderPane.vue:57-78`; the four call-site casts. |
| **C-1/C-9/L-1/L-4 cure** | *"adopt `useConfiguratorState<T>` for reset"* | Partially dismissed — see dissent §3.1. `resetCurrent()` is documented as *"Restore `config` to the active preset's baseline"* — the same whole-object semantics that produced the BLOCKER, relocated behind a `clone` hook documented for *"shapes that contain unclonable values"*, which is a different problem. The producer models neither "reset only the declared domain" nor "exclude a live key from a baseline". | `dist/components/configurator/useConfiguratorState.d.ts`. |

---

## §3 — Dissent

Recorded explicitly. No vote manufactures truth.

**§3.1 — On the reset cure, I dissent from all three challengers and from the standing C10 A4 book.**
They converge on adopting `useConfiguratorState<T>`. Its `resetCurrent()` restores the whole
baseline; making `color.paletteStops` survive requires a hand-written `clone` that reaches into the
shape — exactly the shape-knowledge the generic component was not supposed to need, moved one level
out. The correct cure is **domain-scoped reset**: iterate the fields the pane actually declares and
write each one's default through its own setter. Then the clobber is not *guarded against*, it is
**unrepresentable** — `color.paletteStops` is not a field, therefore no code path can reach it.
Three lines, no new dependency, and strictly stronger than the producer's own semantics. C-1's own
report reaches for this in its last sentence (*"the only form that cannot lie"*) and then
recommends the other thing. I take the sentence over the recommendation. `useConfiguratorState` is
RETIRED for this component; a glass-ui relay asks the producer for a domain-scoped reset (§6 R-3).

**§3.2 — On the Card, I dissent from D-8's scope.** Eight sibling panes root a `<Card tier="resting">`
(Browse, Palettes, Admin, About, Gradient, Mix, Generate, Extract). Retiring it from *this* pane
alone breaks isomorphism with all eight and does not serve the canon's Card-count-0 row, which is a
whole-composition ruling owned by W28/W29 with the chassis. What is unambiguously this component's
is the **inner** `.console-well` — a second bordered, radiused, opaque surface inside the first. My
wave deletes that, taking the surface count from 2 to 1, and the pane-root Card retirement is a
named obligation on the chassis wave, not a silent carry.

**§3.3 — On `variant="spectrum"`, I dissent from the unanimous cure** (§0, and the dismissal table).
The wave must *measure* the fill before choosing the variant. G2 is written as an experiment with a
deterministic fallback, not as an assumption.

**§3.4 — On extraction as a cure.** L proposes three new shared modules (`config-path.ts`,
`config-slider-schema.ts`, `PaneShell.vue`). I take exactly one of them — the schema — because it is
the only one that removes a concept rather than relocating it. Extracting plumbing you should be
deleting is how a defect becomes a platform.

**§3.5 — A-29 (no value.js dogfood) I RETIRE**, against L-15's implicit push to close it here.
`clamp` is measurably not needed (all 31 blob brackets contain their defaults — L-15's own check,
0 defects) and `ValueUnit` is a *unit* type, not a *presentation-precision* type; forcing it into a
readout formatter to manufacture a dogfood edge would be contrivance (edict 3). The proof gap is
real and belongs to a library-surface wave, not to a slider pane. Rationale recorded; not re-booked.

---

## §4 — The target lattice

### Files that exist afterward

```
demo/scenes/config-fields.ts              NEW   the field schema + two pure functions. No .vue on
                                                the type-resolution path for a data shape.
demo/scenes/ConfigSliderPane.vue          REWRITTEN  generic <T>. Presentation only. ~120 lines,
                                                zero scoped CSS rules, zero :deep().
demo/scenes/atmosphere/AuroraPane.vue     REWRITTEN  typed fields incl. its 4 enum rows. No <style>.
demo/scenes/blob/BlobPane.vue             REWRITTEN  typed fields. No NumericAtomPath.
demo/scenes/atmosphere/atmosphere-calibration.ts   MOVED from demo/color-picker/composables/boot/
demo/test/config-fields.test.ts           NEW   the anti-vacuity unit gate (vitest already includes
                                                `demo/test/**/*.ts` — vitest.config.ts:21)
e2e/smoke/oracles/o21-config-console.spec.ts  NEW   the runtime gates G1–G4, G7–G11
```

`demo/scenes/` and `demo/test/` both already exist. **No new directory, no new wrapper component**
(edict 3).

### Exact ownership of every concept the component touches

| concept | owner afterward | today |
|---|---|---|
| field identity, bounds, step, precision, unit, dependency | `config-fields.ts` (`NumberField<T>`, `EnumField<T>`, `FieldSection<T>`) | inline in the SFC as `SliderDef`/`SliderSection`, untyped keys |
| reading/writing a config value | the field's own `get(c)` / `set(c, v)` closures — typed at the value, not the key | `readPath`/`writePath` over `Record<string, unknown>` |
| numeric presentation (precision, tabular width, unit) | `config-fields.ts` `formatField()` + `precisionOf(step)` | `fmt()` inferring precision from the value |
| reset semantics | `ConfigSliderPane.resetFields()` — iterates the declared fields only | `Object.assign(config, structuredClone(defaults))` |
| per-row reset + dirty | `ConfiguratorRow.canReset` + its `reset` emit (producer) | absent |
| section grouping, disclosure, section a11y | `ConfiguratorLayer` (producer) | `.config-section-header` / `.config-section-title` + a bare `<span>` |
| section material | `.configurator-layer` section tint (producer) | `.console-well` (demo class, second surface) |
| row rhythm | the `size` axis — `provideConfiguratorSize()` once on the console (producer) | a `:deep()` clamp that never binds + `gap-1.5 py-1` |
| the filled extent (the value read) | glass-ui Slider; demo feeds `--slider-range-bg` **once at the console root** | `--slider-track-bg` on the *inert* track; range unpainted |
| handle geometry + focus + forced-colors arm | glass-ui Slider (relay R-1/R-2) | 12px thumb, `box-shadow` focus, no forced-colors arm |
| scroll port + edge feather | `FadingScroll axis="y"` (producer) | `.pane-scroll-fade` (a class that only sets `contain` + `scroll-timeline`) |
| screen-reader value | `useSliderAnnouncements` (in-repo, first population) until relay R-2 lands | absent |
| clipboard result + status | `useClipboard()` status (producer) + one `aria-live="polite"` region in the action bar | discarded |
| pane plate | `<Card tier="resting">` — unchanged, 8 siblings, o7 asserts it | same |

### Legal edges

```
demo/scenes/config-fields.ts        → (nothing)

demo/scenes/ConfigSliderPane.vue    → @mkbabb/glass-ui/configurator  { ConfiguratorLayer,
                                                                       ConfiguratorRow,
                                                                       provideConfiguratorSize }
                                    → @mkbabb/glass-ui/slider        { Slider }
                                    → @mkbabb/glass-ui/button        { Button }
                                    → @mkbabb/glass-ui/card          { Card }
                                    → @mkbabb/glass-ui/dock          { GlassDock }
                                    → @mkbabb/glass-ui/fading-scroll { FadingScroll }
                                    → @mkbabb/glass-ui/dom           { useClipboard }
                                    → @lucide/vue                    { Copy, RotateCcw }
                                    → ../shared/ui/PaneHeader.vue
                                    → ./config-fields                (import type + formatField)

AuroraPane.vue / BlobPane.vue       → ../ConfigSliderPane.vue, ./config-fields (types),
                                      their own atoms module, @mkbabb/glass-ui/{select,aurora,blob}
```

**Forbidden edges, enforced by G5:**

- `demo/scenes/**` → `../ui/*` (the alias shim) — dual path, edict 2.
- `demo/scenes/**` → bare `@mkbabb/glass-ui` (the root barrel) — 74 subpaths are published.
- any `:deep()` from a demo SFC into a producer class name — the producer's own docstring exists to
  make it unnecessary (`ConfiguratorRow.vue.d.ts`: *"All three are declarative props… WITHOUT a
  `:deep()` reach"*).
- `demo/scenes/**` → `demo/color-picker/**` (feature → shell/boot inversion, A-24).
- any `as unknown as` / `as number` on the config path.

### Deletions, named explicitly

| deleted | where | why it can go |
|---|---|---|
| `readPath` | `ConfigSliderPane.vue:57-64` | fields carry typed accessors; no path resolution remains |
| `writePath` | `:66-73` | same |
| `read(): number` and its `as number` | `:76-78` | the lie has no expression left |
| `fmt()` | `:84-86` | → `formatField()` in `config-fields.ts`, precision from `step` |
| `resetDefaults()` — `Object.assign` + `structuredClone` | `:92-94` | → `resetFields()`, domain-scoped |
| `SliderDef` / `SliderSection` exported from the SFC | `:27-39` | → `config-fields.ts`; no consumer imports a `.vue` for a shape |
| `config`/`defaults` typed `Record<string, unknown>` | `:41-52` | → `T` |
| the `extraControls?` doc line | `:3` | documents an API that never shipped |
| the "empty state" JSDoc promise | `:44` | there is no `v-else` anywhere |
| `relative` on the wrapper and the Card, `mx-auto` on a `w-full` element | `:98`, `:101` | no positioned descendant exists |
| the bare `<slot />` | `:110` | → typed enum fields + named per-option slots |
| both `v-if="sections.length > 0"` guards | `:119`, `:163` | permanently true |
| the T.W4-4 population-clause comment block | `:112-117` | describes the well being deleted |
| `console-well` on the console div | `:122` | → `.configurator-layer` section material (the class itself survives in `foundation.css` for its one remaining consumer, `ComponentSliders.vue` — one home, one consumer, not a dual path) |
| the section `<div>` + `.config-section-header` + `.config-section-title` | `:123-130`, `:232-243` | → `ConfiguratorLayer` |
| `class="gap-1.5 py-1"` on the row | `:142` | → the `size` axis |
| `variant="spectrum"` | `:146` | → the variant the G2 experiment selects |
| `.config-console { padding; --slider-track-bg: var(--ink-muted) }` | `:188-203` | the ink was a compensation for the wrong element |
| `:deep(.configurator-row .font-mono) { color: … }` | `:204-206` | producer `name`-slot ink |
| `:deep(.configurator-row) { min-block-size: clamp(…) }` | `:215-217` | measured inert (35.84 vs 60.97) |
| the whole `@media (pointer: coarse)` `::before` block | `:218-230` | measured inert (`max(100%, 44px)` = 100%) |
| `.config-action-bar { border-top: … }` | `:250` | OBC §5 Blob/Atmosphere: retained line `none` |
| **the entire `<style scoped>` block** | `:179-252` | a component that composes correctly emits no corrections |
| `.aurora-row`, `.aurora-row-label` and the whole `<style>` block | `AuroraPane.vue:184-201` | the second row species dies with the slot |
| the slot payload (4 hand-built rows) | `AuroraPane.vue:117-180` | → 4 `EnumField` entries in one section |
| `NumericAtomPath` (13 lines) + its 24-line comment + `s()` | `BlobPane.vue:19-52` | typed accessors check the *value*, not just the key literal |
| all four `(x as unknown) as Record<string, unknown>` | `AuroraPane.vue:111,113`; `BlobPane.vue:124,126` | the prop is `T` |

Measured deletion budget: **252 + 201 + 130 = 583 lines today**, against a target of **≤ 400 across
four files** (schema included) with **zero** scoped CSS rules in the pane and **zero** in AuroraPane.

### The schema, concretely

```ts
// demo/scenes/config-fields.ts
export interface NumberField<T> {
    readonly kind: "number";
    readonly label: string;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    /** Decimal places for the readout. Derived from `step` when omitted — never from the value. */
    readonly precision?: number;
    /** Rendered after the value, in its own span. Never smuggled into the label. */
    readonly unit?: string;
    readonly get: (c: T) => number;
    readonly set: (c: T, v: number) => void;
    /** False ⇒ the row renders the producer's disabled state with an explicit reason. */
    readonly enabledWhen?: (c: T) => boolean;
    readonly disabledReason?: string;
}
export interface EnumField<T> {
    readonly kind: "enum";
    readonly label: string;
    readonly options: readonly { readonly value: string; readonly label: string }[];
    readonly get: (c: T) => string;
    readonly set: (c: T, v: string) => void;
    /** Names a per-option scoped slot on the pane. Absent ⇒ plain option label. */
    readonly optionSlot?: string;
}
export type Field<T> = NumberField<T> | EnumField<T>;
export interface FieldSection<T> {
    readonly title: string;
    /** `advanced` sections mount collapsed — the canon's essentials/advanced composition. */
    readonly rank: "essential" | "advanced";
    readonly fields: readonly Field<T>[];
}
export declare function precisionOf(step: number): number;
export declare function formatField<T>(f: NumberField<T>, c: T): string;
export declare function widestValue<T>(f: NumberField<T>): string; // width reservation
```

`get`/`set` are closures the consumer writes:
`get: c => c.geometry.bodyRadius, set: (c, v) => { c.geometry.bodyRadius = v }`. That is *stronger*
than `NumericAtomPath`, which checked only that the key literal existed — it now checks that the
addressed member is a `number`, at the site, with no mapped-type machinery. The 37 lines die and
nothing replaces them.

Reset becomes, in full:

```ts
function resetFields() {
    for (const s of sections) for (const f of s.fields)
        if (f.kind === "number") f.set(config, f.get(defaults));
        else f.set(config, f.get(defaults));
}
```

`color.paletteStops` is not a field. **A-1 is now unrepresentable**, which is the difference between
a fix and an architecture.

---

## §5 — WAVE SPEC — `MT·W-CSP` · *The configurator transposition*

**Born RED: yes.** 18 of 18 gates fail against `tranche-u @ c654824e` right now. The gate is
committed and runnable:

```
$ node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gates/csp-gate.mjs ; echo $?
…
18 RED / 18 gates
1
```

**Scope.** `demo/scenes/ConfigSliderPane.vue`, `demo/scenes/config-fields.ts` (new),
`demo/scenes/atmosphere/AuroraPane.vue`, `demo/scenes/blob/BlobPane.vue`,
`demo/scenes/atmosphere/atmosphere-calibration.ts` (moved), `demo/test/config-fields.test.ts` (new),
`e2e/smoke/oracles/o21-config-console.spec.ts` (new), the re-aimed
`e2e/smoke/oracles/o18-contrast-census.spec.ts` config legs.
**Out of scope, folded to named waves:** `demo/ui/` (87 remaining sites → `MT·W-UISHIM`),
`tsconfig.demo.json` (→ `MT·W-DOGFOOD-PATHS`), the pane tables (→ `MT·W-PANETABLE`),
`.pane-scroll-fade`'s class home (→ `MT·W-PANESHELL-CLASS`), the pane-root Card and the
InstrumentChassis adoption (→ the W28/W29 chassis obligation, §6 O-1).

**FORMATION-LAWS L-1 test** — *if this were the only wave that ever executed, would the tree be
better and would the wave be closed?* Yes. It lands a correctness cure for a shipping data-loss bug,
restores the value read on 34 controls, and deletes ~180 net lines without depending on any other
wave.

### Gates

Every gate below is **RED today** with its measured failing value pasted, and every one names the
exact input that turns it RED again.

| gate | command | RED today | what makes it fail |
|---|---|---|---|
| **G1** RESET-DOMAIN | `node …/gates/csp-gate.mjs` → G1; then `npx vitest run demo/test/config-fields.test.ts`; then `npx playwright test e2e/smoke/oracles/o21-config-console.spec.ts -g "reset domain"` | **RED** — `["#ffbde0","#ffdde5","#fff6f6","#fff6f4"] → ["#b5947f","#d4b27d","#dad6b1"]` | any reset that writes a key not declared as a field: re-introduce a whole-object merge, or add a `defaults` path the field list does not cover |
| **G2** VALUE-READ | `…/csp-gate.mjs` → G2 (also the re-aimed o18 GRAPHICS leg: assert the **range** ≥3:1 against the **track**, not the track against the well) | **RED** — `painted=false bg=rgba(0,0,0,0) img=none variant=spectrum` (the ratio figure printed alongside is meaningful only when `painted=true`) | any variant/override/token state that leaves `.slider-range` with `background-color: transparent` **and** `background-image: none` **and** no painted shadow. **Wave obligation:** measure `data-variant="standard"` first (my measurement says it is *also* unpainted here — §0); if it is, feed `--slider-range-bg` once at `.config-console` (the producer's published seam, root-level, edict 5 satisfied — the exact idiom `ComponentSliders.vue:193-201` uses for `--slider-track-bg`) and open relay R-1 |
| **G3** ONE-VOICE | `…/csp-gate.mjs` → G3 | **RED** — `31 of 31 empty` | any slider whose `aria-valuetext` is absent or differs from the rendered readout string of its own row |
| **G4** GROUPING | `…/csp-gate.mjs` → G4 | **RED** — `0 groups for 7 drawn sections` | any drawn section without a programmatic group carrying an accessible name |
| **G5** NO-FORK (static, 9 legs, no server) | `…/csp-gate.mjs` → G5a–G5i | **RED ×9** — `:deep()` 4 · `demo/ui` 3 · root barrel 1 · casts 4 · `readPath/writePath` present · `Object.assign(config,…)` present · 4 scoped rules · `.aurora-row` present · `NumericAtomPath` present | re-adding any shim import, any root-barrel import, any `:deep()`, any `as unknown as Record`, any path-string resolver, any whole-object merge, any scoped CSS rule in the pane, any row-species CSS in a consumer |
| **G7** DISCLOSURE/SCROLL | `…/csp-gate.mjs` → G7 | **RED** — `ratio=3.76 maskImage=none` | a console that overflows past 1.5 screens with a hard-clipped edge — i.e. re-flattening the essentials/advanced disclosure, or dropping the `FadingScroll` port |
| **G8** SIZE-AXIS | `…/csp-gate.mjs` → G8 | **RED** — `data-size=null min-block-size=35.84px rendered=60.97px` | any consumer-authored row metric: re-adding a `min-block-size`, or failing to provide the producer size axis |
| **G9** HANDLE-FLOOR | `…/csp-gate.mjs` → G9 | **RED** — `thumb widths [12]` | any operable handle narrower than 24 CSS px on the inline axis. *(Producer-owned — relay R-1; the wave may close this leg by a `--slider-thumb-size` feed at the console root only if the producer declines.)* |
| **G10** NO-LINE | `…/csp-gate.mjs` → G10 | **RED** — `8 ruled edges` | any `border-top`/`border-bottom` inside the console or its action bar (OBC §5: Atmosphere and Blob retained line = `none`) |
| **G11** ONE-SURFACE | `…/csp-gate.mjs` → G11 | **RED** — `` `.console-well` nests a second surface inside the pane Card `` | any second bordered/radiused/opaque surface between the pane plate and a row |
| **G12** ANTI-VACUITY | `npx vitest run demo/test/config-fields.test.ts` | **RED** — the file does not exist and neither do the functions it names | it must kill C-10's four green-keeping mutations by name: `update` → no-op (M1), `resetDefaults` → no-op (M2), `copyAsJson` → no-op (M3), `fmt` → `String(v)` (M4). A gate that does not fail against all four is deleted, not weakened (FORMATION-LAWS L-2) |
| **G13** FORCED-COLORS | `npx playwright test e2e/smoke/oracles/o21-config-console.spec.ts --project=chromium -g "forced colors"` (Chromium — **WebKit ignores Playwright's `forcedColors`, so the existing `shots/forced-colors-desktop/*` frames are byte-comparable to the ordinary light frames and cannot witness this**) | **RED** — challenger measurement, corroborated by the bytes: track background === well background (1.00:1), `outlineStyle: "none"`, `boxShadow: "none"`, and the producer's standard-arm focus is also a `box-shadow` | any control whose extent or focus is expressed in a single channel that `forced-colors` overrides — no border on the track, or a shadow-only focus ring |

### Ordering

1. **G12 first.** The vacuous gate is what let every other divergence accumulate; land the unit gate
   before any cure, so the next inert cure cannot be certified.
2. **G1** — a shipping data-loss bug and the smallest cure (`resetFields`, 3 lines).
3. **G2** — the experiment, then the token. 34 controls currently communicate nothing.
4. **G5 / G8 / G10 / G11** — the transposition proper; these land together because they are one edit.
5. **G3 / G4 / G13** — the announced surface.
6. **G7 / G9** — disclosure and handle; G9 may block on relay R-1.

### π obligations (pinned witness capture)

| id | matrix | route | selector | why |
|---|---|---|---|---|
| π-1 | `safari-desktop-light`, `safari-desktop-dark` | `/#/blob` | `.config-console` | the 31-row console — the primary surface for A-2, A-8, A-9, A-11 |
| π-2 | `safari-desktop-light`, `safari-desktop-dark` | `/#/atmosphere` | `.config-console` and its enum rows | A-10's two row species in one frame |
| π-3 | **`chromium-forced-colors` (NEW ARM)** | `/#/blob` | `.config-console .configurator-row:first-child`, focused | A-14. The existing `forced-colors-desktop` matrix is WebKit and cannot witness it; the arm must be added, not reused |
| π-4 | `safari-mobile-dark` | `/#/atmosphere` | `.config-console` | the coarse-pointer rung — the only mobile surface this component has (A-22 keeps `/#/blob` off mobile until `MT·W-PANETABLE`) |
| π-5 | `chromium-desktop` (AX tree, not a screenshot) | `/#/blob` | every `[role="slider"]` and every section node | A-3/A-4/A-5 — no screenshot can carry an accessibility tree |
| π-6 | `rtl-desktop` | `/#/blob` | `.config-console .configurator-row:first-child`, `.config-action-bar` | A-26 |

### DELTA obligations (before/after pairs)

Every "before" below is **measured**, not asserted, so the pair can be completed by the executing
session without re-deriving the baseline.

| id | measurement | before (measured today) |
|---|---|---|
| Δ-1 | first row `.slider-range` `{backgroundColor, backgroundImage, boxShadow}` + rect; and the same for `.slider-track` | `rgba(0,0,0,0)` / `none` / `none`, 163.47 × 24 of a 432 × 24 track at `oklch(0.447121 0.00386159 34.63)` |
| Δ-2 | `config.color.paletteStops` before and after one Reset, picked colour held | `["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]` → `["#b5947f","#d4b27d","#dad6b1"]` |
| Δ-3 | console `scrollHeight / clientHeight` and the port's `mask-image` | `2611 / 695 = 3.76`, `none` |
| Δ-4 | per-section AX: group/heading count + accessible names | `0` groups, `0` headings for `7` drawn sections; 31 of 31 `<label>` orphaned |
| Δ-5 | `[role="slider"]` `aria-valuetext` census, config vs picker population, same page | config `0/31` non-empty; picker `"Lightness 92.0%"`, `"a axis 88.8"`, `"b axis 20.0"` |
| Δ-6 | first row `data-size`, computed `min-block-size`, rendered height | `null`, `35.84px`, `60.97px` |
| Δ-7 | ruled-edge census inside the console + action bar | `8` |
| Δ-8 | thumb rect census across all config sliders | distinct widths `[12]`, heights `[24]` desktop / `[44]` mobile |
| Δ-9 | LOC and scoped-CSS-rule count for the three SFCs | `252 / 4 rules`, `201 / 2 rules`, `130 / 0` — 583 lines total |
| Δ-10 | import-edge census on the three SFCs | 3 shim imports, 1 root-barrel import, 4 `as unknown as Record` casts, 4 `:deep()` |

---

## §6 — Relays and folded obligations

Nothing here is re-booked. Each row is BUILD in a named wave, FOLD into a named wave that this
clause charters, or RETIRE with rationale.

**Producer relays** (standing BH/BI relay edict — every component/glass-ui-level change is relayed
to the active glass-ui BH inbox at root; glass-ui owns BJ in its own instance, SCOPE M-7):

- **R-1 — the Slider's two incomplete recipes.** `spectrum` paints a 12px handle and an explicitly
  transparent range (`.glass-slider[data-variant=spectrum] .slider-range { background: 0 0 }`);
  `standard` paints a liquid range and a `width: 0; opacity: 0` handle — and on this surface the
  standard range measured `oklab(0 0 0 / 0)` as well. **Neither recipe delivers fill + handle +
  focus together.** Ask for: a bounded-numeric recipe whose `.slider-range` paints from
  `--slider-range-bg` over a non-gradient track, with a handle ≥24px on the inline axis. Include the
  cascade hypothesis: `.glass-liquid-fill` sits in `@layer components` while every SFC-scoped
  `.slider-range[data-v-…]` rule is unlayered.
- **R-2 — `aria-valuetext` pass-through.** `slider-DzqeQmMu.js:134-137` forwards `aria-label`,
  `-labelledby`, `-describedby`, `-errormessage` and nothing else. `ConfiguratorRow` does not expose
  its label `id`, so `aria-labelledby` is unavailable to the slot. Ask for both. The in-repo
  `useSliderAnnouncements` interim is consumed meanwhile and **documented as an interim**, per its
  own header, with `ComponentSliders.vue:326`'s standing offer finally taken.
- **R-3 — a domain-scoped reset on `useConfiguratorState`.** `resetCurrent()` is a whole-baseline
  restore; there is no way to say "restore only these paths". Ask for it, and record §3.1's dissent
  as the motivating case.
- **R-4 — a forced-colors arm on the Slider.** `border: 1px solid` on `.slider-track`,
  `.slider-range { forced-color-adjust: none; background: Highlight }`, and `outline` (not
  `box-shadow`) for the focus register — the producer already ships exactly this shape for
  `.disclosure-*` in `_shared/disclosure.css`, so it is a consistency ask, not an invention.
- **R-5 — `--slider-range-bg` documented as a public seam**, so the console-root feed is a
  sanctioned consumption rather than a discovered one.

**Folded, each into a named wave chartered here:**

- **`MT·W-UISHIM`** — delete `demo/ui/` (19 alias barrels, all pure re-exports); rewrite the
  remaining 87 import sites to the glass-ui subpath that owns each symbol; add a flat-config
  `no-restricted-imports` rule banning the bare `@mkbabb/glass-ui` root barrel so the 74-key subpath
  map becomes load-bearing. Gate: `grep -rc 'from "[^"]*\/ui\/' demo` == 0 and
  `grep -rc 'from "@mkbabb/glass-ui"' demo` == 0. RED today: 90 and 37. (A-19, A-20)
- **`MT·W-DOGFOOD-PATHS`** — generate `tsconfig.demo.json`'s value.js `paths` from
  `package.json#exports` exactly as `vite.config.ts:33-49` already generates the runtime aliases, or
  delete them and let node resolution answer. Gate: a script asserting `paths` keys ≡ `exports` keys.
  RED today: 3 dangling keys, 2 missing, and `dist/subpaths/css.d.ts` differing between the checkout
  and the installed tarball. (A-21)
- **`MT·W-PANETABLE`** — collapse the three pane tables into `VIEW_MAP` holding component
  references; delete `componentFor` and its `return ColorPicker` masking fallback; derive
  `defaultPaneIndex` from which slot the view is named for so no tenth view can forget it the way
  `blob` did. Gate: `/#/blob` at 390×844 mounts `.config-console` with 31 rows. RED today: 0 rows.
  (A-22, and it is the precondition for this component ever having a mobile surface.)
- **`MT·W-PANESHELL-CLASS`** — move `.pane-scroll-fade` from `PaneHeader.vue`'s unscoped `<style>`
  to `demo/styles/foundation.css` beside `.console-well`, its sibling in the same category. Two
  cross-pane classes, one home. No new component (§3.3). (A-23)

**Chassis obligation, named not booked:**

- **O-1 → W28 (Atmosphere) / W29 (Blob)** — the pane-root `<Card tier="resting">` and the
  `InstrumentChassis` adoption. `OPTICAL-BENCH-COMPOSITIONS.md` §5 gives these compositions Card
  count `0` and §3.1 assigns the chassis contract; `grep -rn InstrumentChassis demo` → 0 hits today,
  so this is a shell-wide first adoption across the 9 panes that share `.pane-scroll-fade`, not a
  component edit. `MT·W-CSP` takes the surface count from 2 to 1 and hands W28/W29 a pane that is
  already one tier from compliant. (A-8, §3.2)

**Retired with rationale:**

- **A-29** (no value.js dogfood in this population) — §3.5. `clamp` is measurably unnecessary (all
  31 blob brackets contain their defaults, 0 defects) and `ValueUnit` is a unit type, not a
  presentation-precision type. Forcing either in to manufacture a dogfood edge is contrivance
  (edict 3). The proof gap is real and belongs to a library-surface wave.
- **`useConfiguratorState` adoption for this component** (the standing `C10 A4 [P1]` book) —
  superseded, not deferred. §3.1: its `resetCurrent()` carries the same whole-object semantics that
  produced the BLOCKER. The book closes by supersession; relay R-3 carries the residual ask upstream.

---

## §7 — The addendum clause

> **ADD-CSP — the configurator transposition.**
> `demo/scenes/ConfigSliderPane.vue` is a demo-local re-implementation of
> `@mkbabb/glass-ui/configurator`, authored by a file that imports from that package and consumes
> one of its five exports. It re-mints the section (`ConfiguratorLayer`), the state
> (`useConfiguratorState`), the scroll port (`FadingScroll`), the row rhythm (the `size` axis), the
> seated surface (`.configurator-layer`) and the reset affordance (`ConfiguratorRow.canReset`), and
> it pays for that generality with a stringly-typed reflection layer — `Record<string, unknown>`,
> dot-path strings, `read(): number` over a provably-`undefined` value, and four
> `as unknown as Record<string, unknown>` casts at the call sites — whose shape-blindness silently
> destroys live application state on every Reset (measured: `color.paletteStops`
> `["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]` → `["#b5947f","#d4b27d","#dad6b1"]`).
>
> The cure is a transposition, not a patch. The schema moves to `demo/scenes/config-fields.ts` as
> `Field<T>`/`FieldSection<T>` carrying typed `get`/`set` accessors, `precision` derived from
> `step`, an explicit `unit`, an `enabledWhen` dependency predicate and an
> `essential | advanced` disclosure rank. Reset becomes an iteration over the declared fields, which
> makes the clobber **unrepresentable** rather than merely guarded. Sections become
> `ConfiguratorLayer`s — announced, collapsible, and materially seated by the producer — so
> `.console-well`, both `.config-section-*` rules, all eight forbidden dividing lines and the second
> surface tier delete together. Row rhythm rides `provideConfiguratorSize()`, deleting a `:deep()`
> clamp measured 25px below the row's natural height and a coarse-pointer hit extension measured to
> add exactly zero. The scroll port becomes `FadingScroll axis="y"`, delivering the feather the class
> name `pane-scroll-fade` has promised and never rendered. `AuroraPane`'s bare `<slot />` — which
> licensed a second control-row species whose label recipe is a byte-identical copy of the pane's
> *section-heading* recipe — is replaced by typed enum fields with named per-option slots, deleting
> that pane's entire `<style>` block; `BlobPane`'s 37-line `NumericAtomPath` mapped type deletes
> because typed accessors check the value, not the key literal. The pane's own `<style scoped>` block
> goes to zero rules: a component that composes correctly emits no corrections.
>
> **The value-read cure is not the variant retirement all three challengers prescribe.** Measured
> live (flipping only `data-variant`, mutating nothing else): `spectrum` renders
> `.slider-range { background-color: rgba(0,0,0,0) }` with a 12 × 24 handle, and `standard` renders
> `oklab(0 0 0 / 0)` with a `0 × 20`, opacity-0 handle. Both recipes leave the filled extent
> unpainted on this surface and the prescribed cure removes the last remaining value cue. The wave
> therefore *measures before it chooses*, and feeds the producer's published `--slider-range-bg`
> seam once at the console root — the exact idiom `ComponentSliders.vue:193-201` uses for
> `--slider-track-bg`, root-level and edict-5 clean — moving one token from the inert groove to the
> filled extent and inverting figure and ground with a single declaration. The `o18` GRAPHICS leg
> re-aims from *track vs well* to *range vs track*: it currently certifies the inert channel, which
> is why it reads green while no slider in the pane indicates its value.
>
> The wave opens RED: 18 of 18 gates fail against `tranche-u @ c654824e`, proven by the committed
> runnable gate at
> `docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gates/csp-gate.mjs` (exit 1). Four
> repo-level defects this component merely sits downstream of — the 19-barrel `demo/ui` alias shim,
> the `tsconfig.demo.json` ↔ `package.json#exports` drift that aims the dogfood gate at a stale
> artefact, the three string-keyed pane tables with a masking `return ColorPicker`, and
> `.pane-scroll-fade`'s leaf-emitted global class — fold to `MT·W-UISHIM`,
> `MT·W-DOGFOOD-PATHS`, `MT·W-PANETABLE` and `MT·W-PANESHELL-CLASS`, each chartered with its own
> RED-today gate. Five producer asks (R-1 the incomplete Slider recipes, R-2 `aria-valuetext`
> pass-through, R-3 a domain-scoped reset, R-4 a forced-colors arm, R-5 `--slider-range-bg` as a
> documented seam) relay to glass-ui BH under the standing relay edict. The pane-root Card and the
> first `InstrumentChassis` adoption are named obligations on W28/W29, not carries. No item in this
> clause is re-booked.

---

*Seat: JUROR-2 (architecture + isomorphism). Wrote only under
`docs/tranches/V/megatranche/audit/components/ConfigSliderPane/`. No source edited. Probe scripts in
the session scratchpad under `j2/`; the runnable born-RED gate is committed beside this report at
`gates/csp-gate.mjs`.*
