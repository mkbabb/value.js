# CHALLENGE-C — `demo/scenes/ConfigSliderPane.vue` — implementation audit · **PASS 2**

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with. Declared, not inherited.

---

## Pass-2 preamble — what this document is

A pass-1 CHALLENGE-C report existed at this path (2026-07-24, also Opus 5). It is preserved verbatim
at **`challenge-C-implementation.pass-1-2026-07-24-prior.md`**. I did **not** read it until after my
own probes had run, so §1 below is an *independent* re-derivation, not a review.

The result is worth stating plainly because it is the strongest evidence in this file:

- **Every MAJOR defect in pass 1 was independently re-derived in pass 2**, from a cold read, with
  different instrumentation. D-1 in particular reproduced to the **byte-identical** before/after
  arrays.
- **D-1's reproduction is upgraded.** Pass 1 reached the reactive config through Vue internals
  (`__vueParentComponent`). Pass 2 reproduced it **through the public UI only** — three real button
  clicks, no internals reach-in (§2). The defect is therefore user-reachable, not
  instrument-manufactured.
- **Three new findings** that pass 1 did not carry: **D-14** (Copy and Reset model two different
  objects — the mechanistic twin of D-1, and the one that puts the corruption in the user's hands),
  **D-15** (`fmt()` ignores the declared `step`), and a **named-rule attribution** for D-7b that
  turns "inert" into "provably redundant with a specific producer utility".
- **One number is reconciled**, not contradicted: the D-12 keystroke cost (§4).

Verdict is unchanged and reinforced: **DEFECTIVE** — 7 MAJOR, 6 MINOR, 2 INFO.

| | |
|---|---|
| Component | `/Users/mkbabb/Programming/value.js/demo/scenes/ConfigSliderPane.vue` — 252 lines (95 script / 82 template / 74 style) |
| Consumers (exhaustive) | `demo/scenes/atmosphere/AuroraPane.vue` (1 section, 3 sliders) · `demo/scenes/blob/BlobPane.vue` (7 sections, 31 sliders) |
| Routes | `/#/atmosphere` · `/#/blob` |
| State owner | `demo/color-picker/composables/boot/useAtmosphere.ts:128` (aurora) · `:381` (blob) |
| Pass-2 probes | private `chromium.launch()` per probe — the shared MCP browser was in use by another seat, so nothing here is cross-contaminated |
| Probe scripts | scratchpad `probe.mjs`, `cspane-probe2.mjs`, `cspane-probe3.mjs`, `cspane-probe4.mjs` |

---

## 1 · Pass-1 roster — independently re-derived

| ID | Pass-1 claim | Pass-2 status | Pass-2 evidence (independent) |
|---|---|---|---|
| D-1 | `resetDefaults` clobbers nested live state | **CONFIRMED — evidence upgraded to UI-only** | §2 |
| D-2 | 31 sliders announce a raw float; no `aria-valuetext` | **CONFIRMED** | `probe.mjs`: `thumbSample[].valuetext: null`, `describedby: null`, ×31 |
| D-3 | `variant="spectrum"` is a dead prop; zero fill affordance | **CONFIRMED** | `probe.mjs`: `trackBg "oklch(0.447121 0.00386159 34.63)"` · `trackBgImage "none"` · `rangeBg "rgba(0, 0, 0, 0) \| none"`. Producer recipe: `glass-ui.css` `.glass-slider[data-variant=spectrum] .slider-range{background:0 0}`. Visual: `shots/safari-desktop-light/blob.png` — 31 charcoal slabs beside the picker's four true spectrums in the same frame |
| D-4 | `copyAsJson` discards the clipboard Result; silent on success and failure | **CONFIRMED** | `probe.mjs` post-click: `{"liveRegions":[],"btnText":["Copy JSON","Reset"]}` on `/#/atmosphere`. Contract quoted at `useClipboard.d.ts:33-37`; never-throws impl at `useClipboard-D36OTaeT.js` |
| D-5 | unguarded dot-path read → render-time `TypeError`, whole pane unmounts | **CONFIRMED (mechanism)** | `read()` casts `undefined as number` (`:76-78`); `fmt(undefined)` throws. Pass 2 did **not** re-run the injection; pass 1's `injectedMissingBranch` capture stands as the reachability evidence |
| D-6a | 31 orphan `<label>`s | **CONFIRMED** | `probe.mjs`: `labelCount: 31, labelsWithFor: 0` on `/#/blob`; `3 / 0` on `/#/atmosphere` |
| D-6b | 7 visual sections, 0 programmatic groups | **CONFIRMED by code read** | `:128-130` — bare `<span class="config-section-title">`, no `role`, no `aria-labelledby`. Not re-measured in pass 2 |
| D-7a | the `clamp()` "ONE RHYTHM SOURCE" never binds | **CONFIRMED, second matrix added** | desktop 1440: `rowH 61` vs clamp ceiling 42 px. **New:** coarse 430×932 — `rowH 77.6`, computed `min-block-size: 32px`. Inert on *both* matrices |
| D-7b | the coarse-pointer `::before` hit extension adds zero | **CONFIRMED and STRENGTHENED — the rule that actually does the work is now named** | §3 |
| D-8 | 12 px-wide thumbs on every matrix | **CONFIRMED** | `probe.mjs` desktop `distinctThumbW:[12] distinctThumbH:[24] smallThumbs:31`; `cspane-probe2.mjs` coarse `{w:12,h:44}` |
| D-9 | hand-rolled copy/reset where `useConfiguratorState` exists | **CONFIRMED** | producer's own reset is a *full replace* (`configurator-M5OaIlJd.js`, fn `m`: delete-then-assign) and its clone is try/caught with a diagnostic; the demo's is a bare shallow `Object.assign` |
| D-10 | vacuous gate — no test exercises any behaviour | **CONFIRMED, mutation M5 added** | §5 |
| D-11a | documented "empty state" does not exist | **CONFIRMED** | `:44` vs `:119`/`:163` |
| D-11b/c | child mutates the parent's prop object; `read(): number` is a lie | **CONFIRMED** | `:80-82`, `:76-78` |
| D-12 | one keystroke re-renders all 31 rows | **CONFIRMED as INFO; number reconciled** | §4 |
| D-13 | the pane does not mount on `/#/blob` at mobile widths | **CONFIRMED** | `REPORT.json` mobile `/#/blob` `bodyTextLength: 69` (vs 713 desktop); `shots/safari-mobile-light/blob.png` shows the dock segmented control on **Picker**, not **Blob**, at URL `/#/blob` |

---

## 2 · D-1 · MAJOR — reproduced through the public UI only (evidence upgrade)

`ConfigSliderPane.vue:92-94`

```ts
function resetDefaults() {
    Object.assign(config, structuredClone(defaults));
}
```

`Object.assign` replaces top-level keys **wholesale**, so any live state at depth ≥ 2 inside a key
that also exists on `defaults` is destroyed. `BlobConfig.color.paletteStops` is exactly that: written
by an external watch at `useAtmosphere.ts:389-402`, keyed on the colour string, so it does not
re-fire until the user picks a *different* colour.

**Pass-2 reproduction — no Vue internals touched.** `probe.mjs` intercepts
`navigator.clipboard.writeText` in an init script and then drives only real buttons:
`Copy JSON` → `Reset` → `Copy JSON`.

```
BLOB pre-reset  color.paletteStops: ["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]
BLOB post-reset color.paletteStops: ["#b5947f","#d4b27d","#dad6b1"]
BLOB pre-reset bodyRadius=0.22 tempo=1
```

Byte-identical to pass 1's arrays, obtained by a different route. The replacement value is confirmed
at the producer: `node_modules/@mkbabb/glass-ui/dist/presets-5myqNv59.js:27-32` —
`color: { paletteStops: ["#b5947f","#d4b27d","#dad6b1"], hueRange: 5, satShift: 0, … }`.

The aurora control arm, same session, same instrument:

```
AURORA pre-reset : {"harmony":"analogous",…,"seed":"lab(92% 88.8 20)"}
AURORA post-reset: {"harmony":"analogous",…,"seed":"lab(92% 88.8 20)"}
```

`seed` survives — because `DEFAULT_AURORA_ATOMS` omits it, a *consumer-side convention* documented at
`aurora-atoms.ts:17-20`. The generic component neither expresses nor enforces that convention, and
the other consumer's defaults object (a third-party constant the demo does not own) does not honour
it. **The bug is the missing contract, not the missing key.**

**Scope of the visible damage, stated honestly.** `HeroBlob.vue:174` overlays
`color: { ...appBlobConfig.color, paletteStops: heroStops.value }`, and HeroBlob is the app's only
`<Blob>` mount (`grep -rn "<Blob" demo/` → one hit, `HeroBlob.vue:13`). So the wiped stops do not
currently reach a pixel *while that component stays mounted*. They **do** reach the user: they are in
the Copy JSON payload the button hands over (**D-14**), and pass 1's mount-order hypothesis
(`HeroBlob.vue:79` seeds once at mount from `appBlobConfig.color.paletteStops`; `onActivated` re-seeds
only on KeepAlive wake) remains an open second-order path. Graded MAJOR, not BLOCKER.

**Cure (unchanged from pass 1, now with a second reason).** Reset the **declared key domain** —
iterate `sections[].defs[].key` and `writePath` each from `defaults` — or adopt
`useConfiguratorState<T>` with its `clone` hook (`C10 A4 [P1]`,
`docs/tranches/N/audit/lanes/C10.md:92-105`, `:265`). Making the reset domain identical to the *edit*
domain also makes D-14 unrepresentable: one projection, two buttons.

---

## 3 · D-7b · MINOR — the inert hit extension, with its replacement now named

Pass 1 established that `ConfigSliderPane.vue:218-230` adds zero. Pass 2 proves *why*, and names the
rule that already does the job.

**Ablation** (`cspane-probe3.mjs`, 430×932, `hasTouch`, DPR 3, `pointer: coarse` = true) — the probe
injects `…glass-slider::before{display:none!important}` and re-measures the same element:

```json
{ "rootH": 44, "rootHNoBefore": 44,
  "beforeBlock": "44px", "beforePos": "absolute", "beforeInset": "0px/0px",
  "rootMinBlock": "44px", "trackH": 24, "thumbH": 44, "thumbW": 12 }
```

Removing the pseudo-element changes the box by **0 px**. `max(100%, 2.75rem)` is `max(44px, 44px)`.

**Attribution** — CDP `CSS.getMatchedStylesForNode` on that slider root (`cspane-probe4.mjs`),
filtered to rules declaring `min-block-size`, returns exactly one:

```json
[{ "selector": "[data-control-target]", "media": "(pointer: coarse)",
   "css": "min-block-size: var(--touch-target, 2.75rem); min-inline-size: var(--touch-target, 2.75rem);" }]
```

That is `node_modules/@mkbabb/glass-ui/dist/styles/utilities/responsive.css:1` — a **producer utility
already in effect app-wide** — and `.glass-slider` already carries `data-control-target`
(`slider-DzqeQmMu.js`, root binding `"data-control-target": ""`). glass-ui ships **no**
`(pointer: coarse)` rule for `.glass-slider` itself (`grep` over `glass-ui.css` finds three coarse
blocks: tags-input, continuous-dot, segmented-dot — none for sliders), so the 44 px comes from the
utility and nothing else.

So the demo spends 13 lines of `:deep()` CSS reaching into a design-system primitive to re-implement
a utility the design system already applies. Edict 3 (no contrivance) **and** edict 5 (never
per-instance overrides of the design-system root). **Cure: delete `:218-230`.**

Note the utility also explains why D-8 cannot be cured demo-side: it grows the **root**
(`min-inline-size` on the root, not the thumb), while the spectrum recipe *shrinks* the thumb by
contract — `.glass-slider[data-variant=spectrum] .slider-thumb{width:calc(var(--slider-thumb-size,1rem)*.75)}`
= 12 px. D-8 is a glass-ui relay; its demo half is D-3 (stop asking for the variant whose thumb
recipe is the 12 px one).

---

## 4 · D-12 · INFO — the keystroke cost, reconciled

Pass 1 measured dispatch → first `MutationObserver` callback: `/#/blob` 6.675 ms mean vs
`/#/atmosphere` 5.463 ms — **+22 % for 10× the rows**, ~43 µs marginal per row.

Pass 2 measured a different quantity — 200 synthetic `ArrowRight` keydowns dispatched back-to-back,
then settled across two rAFs, median of five samples (`cspane-probe2.mjs` §B):

```
{"route":"atmosphere","rows":3, "medianMs":71.1,"samples":[49.1,51.5,71.1,78.9,122.1],"perPressMs":0.3555}
{"route":"blob",      "rows":31,"medianMs":72.5,"samples":[37.2,71.1,72.5,99.2,106.8],"perPressMs":0.3625}
ratio blob/atmosphere per-press: 1.02x
```

The two are consistent, not contradictory. Pass 1 timed a *latency* including one full paint; pass 2
timed *throughput* with renders coalesced, which is where the render function's own cost shows. At
**1.02× across a 10× row count**, the per-row render work — the double `read(def.key)` at `:141`/`:147`
and the fresh `[read(key)]` array literal per row — is **below the noise floor**.

**Joint disposition: NOT a performance defect.** Recorded at INFO so no later seat can promote it
without a number, and so no seat re-chases it a third time.

---

## 5 · D-10 · MINOR — vacuous gate, with a fifth mutation

Coverage census re-run in pass 2:

```
$ ls -R demo/test
export/byte-exact.test.ts
glass/aurora-bracket.test.ts      # asserts DEFAULT_AURORA_ATOMS constants + resolveAtoms — never imports the pane
glass/aurora-motion.test.ts       # same
```

The only automated coverage that touches the component is two e2e **colour-contrast** oracles:
`e2e/smoke/oracles/o18-contrast-census.spec.ts:924` (`.config-console .configurator-row label` and
`… .font-mono`, ratio ≥ 4.5:1) and `:1161` (`… .slider-track`, ratio ≥ 3:1). Neither moves a slider,
presses a button, or reads a value. `o7-card-census.spec.ts:38-42` explicitly *excludes* the pane.

| # | Mutation | Effect | Gates |
|---|---|---|---|
| M1 | `function update(_k, _v) {}` | all 34 sliders become read-only | **GREEN** |
| M2 | `function resetDefaults() {}` | Reset does nothing | **GREEN** |
| M3 | `async function copyAsJson() {}` | Copy JSON does nothing | **GREEN** |
| M4 | `function fmt(v) { return "0" }` | every readout lies, always | **GREEN** |
| **M5 (new)** | delete `:aria-label="def.label"` from the Slider (`:145`) | 31 sliders lose their **only** accessible name | **GREEN** |

**M5 is the sharpest of the five.** The o18 census reads `.configurator-row label` — but per D-6a
that `<label>` has no `for`, no `id`, and wraps nothing, so it is *not* the slider's accessible name.
The oracle is measuring an element no assistive technology associates with the control, and would not
notice its removal. A gate can be green, honest about the pixel it samples, and still certify
nothing about the control.

**Cure:** one vitest mount per behaviour — dot-path round-trip (flat *and* nested); `resetDefaults`
preserving a declared live key at depth 2 (D-1's exact assertion); the copy payload equalling the
declared projection (D-14's exact assertion); `fmt` at `{0, -0, NaN, Infinity, undefined}` and at
each declared `step` (D-15); the clipboard Result on both `reason` values. Five small tests kill
M1–M5 and gate D-1 / D-4 / D-5 / D-14 / D-15.

---

## 6 · NEW findings

### D-14 · MAJOR · Copy and Reset model two different objects — and Copy is the one that hands the corruption to the user

`ConfigSliderPane.vue:88-90` serialises the **whole reactive proxy**:

```ts
await writeClipboard(JSON.stringify(config, null, 2));
```

Measured payloads (`probe.mjs`, clipboard intercepted at `navigator.clipboard.writeText`, real button
clicks):

```
AURORA copy keys : harmony,colorEnergy,zones,noise,medium,motion,interactivity,seed
AURORA copy seed : "lab(92% 88.8 20)"                                    (270 bytes total)
BLOB   copy keys : geometry,satellites,membrane,color,surface,interaction,morphT,quality,tempo
BLOB   copy color.paletteStops: ["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]  (1412 bytes total)
```

Set it against §2: **Reset excludes `seed`; Copy includes it.** The two buttons sitting in the same
`GlassDock` disagree about what "the config" is, in opposite directions:

| member | owner | Reset | Copy |
|---|---|---|---|
| `AuroraAtoms.seed` | the picker (`useAtmosphere.ts:378-380`) | **excluded** ✓ | **included** ✗ |
| `BlobConfig.color.paletteStops` | the picker (`useAtmosphere.ts:389-402`) | **clobbered** ✗ (D-1) | **included** ✗ |
| `BlobConfig.morphT`, `.quality` | not pane knobs | rewritten | included |

Consequences:

1. A user who pastes the copied atmosphere JSON back as a preset **freezes the seed** and severs the
   picker coupling that `aurora-atoms.ts:6-10` exists to preserve. The one member the defaults object
   was deliberately built to exclude is the one the export leaks.
2. The blob payload carries `color.paletteStops` — which `BlobPane.vue:8-9` explicitly calls *"the
   live picker-palette feed … not a slider"* — plus `morphT` and `quality`, neither of which any
   slider in the pane drives. 1412 bytes of "config" of which a measurable fraction is not
   configuration.
3. It is the **delivery vehicle for D-1**: after a Reset the clipboard hands over the tan triad as if
   it were the user's tuned state.

`sections` is the pane's own declaration of what it owns. Copy ignores it.

**Cure:** one projection function over `sections[].defs[].key`, consumed by **both** buttons. Copy
emits exactly the declared surface; Reset writes exactly the declared surface. The disagreement stops
being a bug and starts being unrepresentable — and D-1 dies with it. This is the same transposition
D-1 already asks for, which is why the two should be fixed as one hunk, not two.

### D-15 · MINOR · `fmt()` ignores the declared `step` and formats by value shape

`ConfigSliderPane.vue:84-86`

```ts
function fmt(v: number): string { return Number.isInteger(v) ? String(v) : v.toFixed(3); }
```

`SliderDef.step` (`:31`) is the declared precision of every control and `fmt` never consults it.
Formatting is decided by a heuristic on the *value*, so the readout changes shape as the value moves:

- `BLOB_CONFIG_DEFAULTS.color.satShift === 0` and `.brightnessShift === 0` (verified against the
  dist), so those two rows render **`"0"`** while every neighbour renders three decimals — measured
  live readouts on `/#/blob`: `Body Radius 0.220`, `Sat Radius 0.082`, `Orbit Radius 0.170`,
  `Eccentricity 0.050`, `Smooth K 0.050`.
- Dragging `Saturation` (step 0.005) across zero produces `-0.005` → `0` → `0.005`: **5 glyphs → 1 →
  5**, a width jump inside a `truncate` inline row, on the exact control where the user's eye is
  parked. Same for `Warp`, `Noise Amp`, `Pulse Amp`, `Attraction` — every knob whose domain contains 0.
- Conversely a step-100 knob (`satellites.mergeDuration`) is formatted as `"2500"` only because the
  value happens to be integral; any float contamination flips it to `"2500.000"`.

**Cure:** `const dp = Math.max(0, -Math.floor(Math.log10(def.step)))` → `v.toFixed(dp)`. Precision
then always equals what the control can express, and the readout width is constant across the whole
domain. One line, and it deletes the heuristic rather than tuning it.

---

## 7 · Negative proof — hypotheses tested in pass 2 and DISPROVED

Recorded so no seat re-chases them. Pass 1's negative table stands; these are the pass-2 additions.

1. **Per-render cost scaling** — DISPROVED at 1.02× across a 10× row count (§4).
2. **Domain-boundary crash** (`cspane-probe2.mjs` §C, `/#/blob`, first slider):
   `Home → aria-valuenow 0.08 / readout "0.080"`; `End → 0.45 / "0.450"`; `pageerrors: []`.
   Both bounds sound, step honoured, no crash.
3. **`structuredClone` throwing** — both `defaults` are plain module constants, proved cloneable by
   `useAtmosphere.ts:128` and `:381` cloning the *same two objects* at boot. Pass 1's `DataCloneError`
   demonstration is a correct statement about a *reactive* defaults object; no consumer passes one
   today. Latent, not live.
4. **Nameless-button contribution = 0.** `REPORT.md:96-113` records `/#/blob: 1` nameless button, but
   `/#/atmosphere: 0` across all four Safari matrices while rendering the **identical**
   ConfigSliderPane chrome. The pane's own two buttons measure 134.9 × 36 and 89 × 36 px, both
   text-labelled, both ≥ 24 px. The `/#/blob` one is not this component's.
5. **Readout truncation** — `readoutsTruncated: 0` on both routes at 1440 × 900, despite
   ConfiguratorRow applying `truncate` to both the label and the `name` span. Not a live defect at
   the measured widths (D-15's width *jitter* is a separate, real thing).
6. **The repo's named local hazards, all absent from this file:** no `defineModel` (no async
   round-trip stale read), no oklch→HSV roundtrip / `stableHue`, no `ValueUnit` construction, no
   `parseCssColor`, no canvas/WebGL, **zero** `requestAnimationFrame` / `setTimeout` / `setInterval`
   / `addEventListener` / observers — so nothing to leak and nothing for the PRM-RAF epidemic to
   touch. Verified by reading all 95 script lines.
7. **Edict 8 (`verbatimModuleSyntax`)** — satisfied. This file imports only values (`:16-23`); both
   consumers use `import type { SliderSection }` / `import type { BlobConfig }`
   (`AuroraPane.vue:34`, `BlobPane.vue:15`).
8. **`--slider-track-bg` is NOT an edict-5 violation** — it is a producer-supported token
   (`glass-ui.css`: `.slider-track{background:var(--slider-track-bg,var(--muted-medium))}`), fed at
   `:202` through a demo-owned class. The edict-5 violations in this file are the *other* three
   `:deep()` rules — `:204` (which couples to the Tailwind utility class `font-mono` inside a
   third-party scoped component), `:215` (D-7a) and `:219-229` (D-7b).

---

## 8 · Standing-edict ledger

| Edict | Verdict | Evidence |
|---|---|---|
| 1 · No god modules | **PASS** | 252 lines / 95 script; one responsibility |
| 2 · No legacy code | **PASS** | no shims, aliases, dual paths. (The dot-path walk is the generic, not back-compat — it is D-5's defect on other grounds) |
| 3 · KISS, no contrivance | **FAIL** | D-7a (inert clamp), D-7b (13 dead lines re-doing a named producer utility), D-11a (documented non-existent empty state) |
| 4 · Glass-ui is the design system | **FAIL** | D-4/D-14 (`useClipboard` ignored), D-9 (`useConfiguratorState` ignored; `ConfiguratorRow.canReset` ignored), D-6a (`ConfiguratorRow.vue.d.ts:41-47` says in as many words *"No a11y for/id wiring … use LabeledField directly for an accessible form control"* — the producer names the right primitive and the pane uses the wrong one), D-3 (variant declared then overridden away) |
| 5 · Root-level styling | **FAIL** | three `:deep()` per-instance overrides of design-system roots (`:204`, `:215`, `:219-229`); `:204` couples to a Tailwind utility class *inside* a third-party scoped component |
| 6 · Animations never deleted | **PASS** | none removed; no keyframes here |
| 7 · Idiomatic Vue 3.5 | **PASS** | reactive props destructure `:41`; no `defineModel`, so the stale-read edict does not bind; no template ref needed |
| 8 · `verbatimModuleSyntax` | **PASS** | §7.7 |

---

## 9 · Defect family map (pass-2 consolidation)

Fifteen findings, **three mechanisms** — unchanged from pass 1 except that D-14 and D-15 slot into
families 1 and 3 respectively, and family 1 grows a second head.

1. **The stringly-typed reflection layer** (`Record<string, unknown>` + dot-path strings + `as number`
   + two `as unknown as` call-site casts) → **D-1, D-5, D-11b, D-11c, D-14**.
   The layer has no notion of *which keys the pane owns*, so every operation that needs that notion
   guesses: Reset guesses "all top-level keys of `defaults`" and D-1 falls out; Copy guesses "the
   whole object" and D-14 falls out; `read` guesses "it will resolve" and D-5 falls out.
   **One cure kills all five:** make `sections` the single declared key domain and derive read, write,
   reset and copy from it — or adopt `useConfiguratorState<T>` (C10 A4 [P1]) and let the producer's
   typed state machine hold the domain.
2. **Results and producer affordances thrown away** (the clipboard Result; `useConfiguratorState`;
   `ConfiguratorRow.canReset`; `useSliderAnnouncements`; `LabeledField`; the spectrum variant's
   material; the `[data-control-target]` utility) → **D-2, D-3, D-4, D-6a, D-7b, D-9**.
   Cured by *consumption*, not new code — every piece already exists, four of them inside this
   repository.
3. **Comments asserting cures the measurements refute** (the ≥ 44 px touch rung; the "ONE RHYTHM
   SOURCE" clamp; the coarse-pointer hit extension; the "empty state"; U20b's spectrum discharge; the
   `name`-slot "pairing"; `fmt`'s implied precision) → **D-3, D-7, D-8, D-11a, D-15**.

All of family 3 stands on **D-10**, the vacuous gate, which is what let the divergence accumulate
across two waves. **Fix D-10 first**: five small behavioural tests both kill M1–M5 and make the next
inert cure impossible to land.

---

## 10 · Ranked disposition

| ID | Severity | Defect | Reproduced? |
|---|---|---|---|
| D-1 | MAJOR | Reset clobbers externally-owned `color.paletteStops` | **YES — UI-only, pass 2** |
| D-14 | MAJOR | Copy and Reset model different objects; Copy exports `seed`/`paletteStops`/`morphT`/`quality` | **YES — payloads dumped** |
| D-3 | MAJOR | `variant="spectrum"` declared then overridden away; 31 controls with no value affordance | **YES — computed styles + shot** |
| D-4 | MAJOR | clipboard Result discarded; silent on success and both failure modes | **YES — both passes** |
| D-2 | MAJOR | 31 sliders announce a raw float; the repo's own `aria-valuetext` cure never consumed | **YES** |
| D-5 | MAJOR | unguarded dot-path read → render `TypeError` unmounts the pane; boundary swallows it | **YES (pass 1 injection)** |
| D-6 | MAJOR | 31 orphan `<label>`s; 7 sections, 0 programmatic groups | **YES** |
| D-8 | MINOR | 12 px-wide thumbs, every matrix; 31 of the 39 worst-route tap targets | **YES** |
| D-7 | MINOR | two of the three most-argued CSS cures are provably inert | **YES — ablation + CDP attribution** |
| D-9 | MINOR | hand-rolled reset/clone where the producer's typed state machine is one import away | **YES** |
| D-10 | MINOR | vacuous gate — five mutations that delete the component's purpose and stay green | **YES** |
| D-15 | MINOR | `fmt()` ignores `def.step`; `0` renders `"0"` beside `"0.050"` | **YES** |
| D-11 | MINOR | dead branches, false JSDoc, prop mutation, the `as number` lie | **YES** |
| D-12 | INFO | keystroke fan-out — real, measured, **not** a defect | **YES (disproved)** |
| D-13 | INFO | the pane does not mount on `/#/blob` at mobile widths (shell defect, cross-ref) | **YES** |

**Strongest defect: D-1, taken together with its twin D-14.**

D-1 is the only finding that silently destroys state the user cannot recover; it now has a
reproduction that touches nothing but three buttons, and it reproduced byte-identically across two
independent passes a session apart. D-14 is why it matters beyond the config layer: it is the
mechanism that puts the corrupted state into the user's clipboard. Both fall out of the *same* root —
a component that manipulates "the config" as an opaque object while its `sections` prop is sitting
right there, already declaring exactly which keys it owns. Reset guesses. Copy guesses wider. The
cure is to stop guessing: derive read, write, reset and copy from the one declaration the component
already has.

---

*Seat: CHALLENGE-C (implementation), pass 2. Wrote only under
`docs/tranches/V/megatranche/audit/components/ConfigSliderPane/`. No source edited. Pass 1 preserved
at `challenge-C-implementation.pass-1-2026-07-24-prior.md`. Probe scripts left in the session
scratchpad (`probe.mjs`, `cspane-probe2.mjs`, `cspane-probe3.mjs`, `cspane-probe4.mjs`).*
