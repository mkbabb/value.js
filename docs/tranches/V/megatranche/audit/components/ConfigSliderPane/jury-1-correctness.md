# JURY-1 — CORRECTNESS AND EVIDENCE — `demo/scenes/ConfigSliderPane.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with. Declared at spawn, verified against my own self-knowledge, not inherited.
No Fable seat participated in this adjudication (M-2 / M-11).

---

## 0 · The seat, and what it actually did

| | |
|---|---|
| Subject | `demo/scenes/ConfigSliderPane.vue`, 252 lines, HEAD `c654824e`, branch `tranche-u` |
| Consumers | `demo/scenes/atmosphere/AuroraPane.vue` (1 section / 3 sliders) · `demo/scenes/blob/BlobPane.vue` (7 sections / 31 sliders) |
| Challengers adjudicated | D (21 findings) · L (16) · C (13) = **50 accusations** |
| Verdict | **REPAIR_REQUIRED** — 18 merged defects upheld (3 BLOCKER), 6 challenger claims dismissed on bytes |
| Instrument | private `chromium.launch()` per probe (playwright 1.60.0, in-repo), against the live dev server `http://localhost:9000`. No MCP browser was used — the C seat recorded its `#/blob` navigation being stolen mid-probe by a concurrent seat, so every number below comes from an uncontended context. |
| Committed runner | `docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gate-probe.mjs` — the wave's born-RED battery, **10 gates, 10 RED today**, exit 1 |
| Committed witnesses | `./frames/BEFORE-blob-desktop-light-console.png`, `./frames/BEFORE-atmosphere-forced-colors-focus.png` (see §6 π note — `.gitignore:34` swallows them; the wave force-adds) |

I did not rate the challengers. I re-ran them. Where a challenger claimed a reproduction I reproduced
it in my own browser; where a challenger claimed bytes I opened the bytes; where a challenger
inferred a mechanism I ran a **causal** probe (delete the declaration, re-measure) rather than
accepting the inference. Three of the challengers' proposed **cures** are refuted below by the
producer's own dist source — a jury that upheld those cures would have shipped the defect twice.

**The single most consequential thing this seat found is not in any challenger report:** the demo
*does* ship a forced-colors focus fallback (`demo/styles/foundation.css:702-720`), and it is
**defeated by its own zero-specificity design** against a producer rule that sets `outline: none`.
Both challengers who touched forced colors concluded "no arm exists". The arm exists, loses, and the
cure they proposed (add an arm) would have lost the same way. §3 · CSP-02.

---

## 1 · The merge — 50 accusations, 18 defects

Two challengers describing one mechanism in different words are ONE defect. The merge is by
**mechanism**, not by wording.

| # | Defect (mechanism) | Merged from | Status | Sev | Disp |
|---|---|---|---|---|---|
| **CSP-01** | **The dead fill** — the reserved chromatic recipe on non-chromatic domains blanks `.slider-range`, and the demo re-inks the *inert* track from the text ladder | D-3 · D-4 · D-14 · C-3 · L-6 | UPHELD_REPRODUCED | BLOCKER | BUILD |
| **CSP-02** | **Single-channel control, and a WHCM focus fallback that loses on specificity** | D-1 | UPHELD_REPRODUCED | BLOCKER | BUILD |
| **CSP-03** | **Reset is shape-blind** — depth-1 `Object.assign` destroys live state nested inside a defaulted key | C-1 · L-1 · D-10(reset half) | UPHELD_REPRODUCED | BLOCKER | BUILD |
| **CSP-04** | **The unguarded lens** — `readPath(…) as number` → `.toFixed()` in the render fn; one absent optional branch unmounts the pane, silently | C-5 · C-11c · L-7 | UPHELD_REPRODUCED | MAJOR | BUILD |
| **CSP-05** | **Two voices** — 31/31 sliders carry no `aria-valuetext` while the eye reads `fmt()` | C-2 | UPHELD_REPRODUCED | MAJOR | BUILD |
| **CSP-06** | **Structure drawn, never announced** — 31 orphan `<label>`, 7 sections, 0 groups, 0 headings | C-6 · L-4(a11y half) | UPHELD_REPRODUCED | MAJOR | BUILD |
| **CSP-07** | **No operation truth** — the `CopyResult` is discarded; Reset is destructive, unconfirmed, unannounced | C-4 · D-10 · L-12 | UPHELD_REPRODUCED | MAJOR | BUILD |
| **CSP-08** | **Inert cures carrying live claims** — the "ONE RHYTHM SOURCE" clamp never binds; the coarse `::before` adds *exactly zero*; the producer size ladder is bypassed by two utilities and four `:deep()` | C-7 · C-8(claim half) · D-12 · L-11 | UPHELD_REPRODUCED (causal) | MAJOR | BUILD |
| **CSP-09** | **The API cannot express the canon** — no `rank`/`unit`/`precision`/`enabledWhen`; `Record<string, unknown>` + four `as unknown as`; 31 flat rows in a 695px window | D-9 · D-11 · D-15 · D-16 · D-20 · C-11a · L-8 | UPHELD_BY_BYTES (+ measured) | MAJOR | BUILD |
| **CSP-10** | **Vacuous gate** — no test in the repo exercises one behaviour; the one born-RED gate certifies the override that killed the fill | C-10 · L-6(gate half) | UPHELD_BY_BYTES | MAJOR | BUILD |
| **CSP-11** | **The pane is not a chassis region** — Card + `.console-well` stack on Card-count-`0` compositions; 8 forbidden lines; a bare slot licensing a second row species | D-6 · D-7 · D-8 · D-13 · L-13 · L-14 | UPHELD_REPRODUCED | MAJOR | BUILD + FOLD |
| **CSP-12** | **12 px inline target in every matrix** (WCAG 2.5.8), producer-owned geometry | D-5 · C-8 | UPHELD_REPRODUCED | MAJOR | FOLD |
| **CSP-13** | **No narrow arm** — `/#/blob` has no configurator below 1024 px; route and rendered pane disagree | D-2 · C-13 · L-10 | UPHELD_REPRODUCED | BLOCKER (shell) | FOLD |
| **CSP-14** | **RTL half-mirrors** and promotes the destructive verb | D-18 | UPHELD_REPRODUCED | MINOR | BUILD |
| **CSP-15** | **`pane-scroll-fade` promises a mask that does not exist**; the scroll edge is a hard amputation | D-17 · D-9(mask half) | UPHELD_REPRODUCED | MINOR | BUILD |
| **CSP-16** | **Repo-structural edges** surfaced by the import trace — 19 alias barrels, root-barrel import, `tsconfig.demo.json paths` ≠ `package.json exports`, a feature→boot edge | L-2 · L-3 · L-5 · L-9 | UPHELD_BY_BYTES | MAJOR | FOLD |
| **CSP-17** | **Dead declarations** — two `relative` with zero anchored descendants, `mx-auto` on `w-full`, a JSDoc'd prop that never shipped | D-21 · D-20(doc half) · C-11a | UPHELD_REPRODUCED | INFO | BUILD |
| **CSP-18** | **Render-fn path resolution** re-creates 31 vnodes + 31 arrays per keystroke | C-12 | HYPOTHESIS (timing not re-run) | INFO | RETIRE |

Dismissed: **D-19** (folded, §4.6), **D-5's cure attribution**, **C-1/C-9/L-1's cure**, **D-10's
"unhandled rejection"**, **D-1's "no forced-colors arm"**, **L-16**. All six with refuting bytes, §4.

---

## 2 · The gate battery — RED today, all ten

```
$ node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gate-probe.mjs
  … exit 1
```

| gate | product asserted | today | the input that reddens it |
|---|---|---|---|
| G1 | filled extent ≥3:1 against unfilled track, every row | **RED** 31/31 failing, ratio **1.00** | any `.slider-range` that composites identically to `.slider-track` — `variant="spectrum"` guarantees it by recipe |
| G2 | forced-colors: the control extent keeps a channel | **RED** track `rgb(255,255,255)` ≡ well `rgb(255,255,255)`, border `0px`, range transparent | expressing the whole control through `background` |
| G3 | forced-colors: keyboard focus paints | **RED** `:focus-visible` matched, `outline-style: none`, `box-shadow: none` | a producer `:focus-visible{outline:none}` outranking a `:where()` fallback |
| G4 | `aria-valuetext` ≡ the rendered readout | **RED** 31/31 (`seen "0.220"` / `heard null` / `valuenow "0.22"`) | a formatted value rendered only into the row's `name` slot |
| G5 | Reset preserves every path outside the declared domain | **RED** `["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]` → `["#b5947f","#d4b27d","#dad6b1"]` | a whole-object merge standing in for a key domain |
| G6 | every section is a named `role=group` | **RED** 7 sections / 0 groups / 0 named | a `<span>` heading over a `border-bottom` |
| G7 | an absent optional intermediate does not unmount the pane | **RED** `mounted:false`, `rowsAfter:0`, boundary text | `config.zones = undefined` (type-legal: `atoms.d.ts:145 zones?:`) |
| G8 | a failed Copy JSON is observable | **RED** bar text unchanged, 0 live regions, `aria-disabled null` | `navigator.clipboard === undefined` (the producer's documented `no-api` arm) |
| G9 | producer size ladder engaged, zero `:deep()` | **RED** `deepCount 4`, `withDataSize 0/31`, clamp `35.84px` under a `60.97px` row | `class="gap-1.5 py-1"` + a `min-block-size` clamp below the content height |
| G10 | a behavioural unit suite exists | **RED** `demo/test/scenes/config-slider-pane.test.ts` absent | mutations M1–M4 (below) keep every existing gate green |

G7 asserts the **mount**, never `pageerror` — measured `pageErrors: []`, `consoleErrors: []` while
the pane was gone. The demo's ErrorBoundary swallows this class completely, which is precisely why
`REPORT.json` reads `consoleErrors: 0 / pageErrors: 0` on both routes in all four Safari matrices.
A gate that watched the console here would be green over a dead pane (FORMATION-LAWS L-12).

---

## 3 · The upheld defects, with the evidence that upholds them

### CSP-01 · BLOCKER · The dead fill — UPHELD_REPRODUCED

`ConfigSliderPane.vue:146` `variant="spectrum"` + `:202` `--slider-track-bg: var(--ink-muted, …)`.

Producer recipe, byte-exact
(`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`):

```css
.glass-slider[data-variant=spectrum] .slider-track{height:calc(var(--slider-thumb-size,1rem)*1.5);
                                                   background:var(--slider-track-bg,var(--secondary))}
.glass-slider[data-variant=spectrum] .slider-range{-webkit-backdrop-filter:none;box-shadow:none;background:0 0}
```

`background: 0 0` is `background-position: 0 0` with **no colour** — the range is transparent *by
recipe*, because a spectrum track carries its meaning as a ramp. This pane feeds that seam a flat
solid. Measured, `/#/blob` 1440×900, 31 rows:

```
.slider-track  432×24  bg oklch(0.447121 0.00386159 34.63)  bgImage none  border 0px
.slider-range  163.47  bg rgba(0,0,0,0)  bgImage none        ← correctly sized (0.22 in [0.08,0.45] = 37.8%), paints nothing
[role=slider]   12×24  bg rgba(0,0,0,0)                       ← an outlined pill; the producer's 2px border is the only paint
readout .font-mono  color oklch(0.447121 0.00386159 34.63)    ← BYTE-IDENTICAL to the track background
```

`trackSameInkAsReadout: true` in both schemes. A 962×24 px inert surface and an 11 px live number
carry the same emphasis, from the same token. Contrast against the well, canvas sRGB round-trip:

| | light | dark |
|---|---:|---:|
| track vs well | **5.82** | **8.30** |
| readout vs well | 5.82 | 8.30 |
| row label vs well | 13.52 | 9.28 |
| section heading vs well | 5.08 | 5.97 |
| section divider vs well | **1.08** | **5.09** |

The frames settle it beyond measurement. `shots/rtl-desktop/blob.png` frames both slider populations
in one image: eight identical charcoal slabs on the left, four real gradient rails with visible fills
on the right. `shots/safari-mobile-dark/atmosphere.png` shows the single visible track as a near-white
slab — the brightest object on the screen, brighter than the `Atmosphere` display title — with a
black-outlined transparent thumb sitting on it. Figure and ground are inverted: the inert background
reads as the filled value, the handle as a hole punched in it.

**Two prior waves diagnosed this and cured neither time.** `N/audit/lanes2/U-CONTROLS.md:54`,
`N/waves/N.W13.md:28` ("a spectrum slider with no spectrum"), and the mandate at `N.W13.md:96`
— *"Feed `ConfigSliderPane.vue:139` the real `--slider-track-bg` gradient so its spectrum variant
shows a spectrum"* — verified present at those exact lines. T.W8 discharged it by feeding the
variant an **ink** instead of retiring the variant. The census then certified the substitution.

Canon: `VISUAL-CONSTITUTION.md:7` reserves the spectral meniscus for "genuinely chromatic continuous
domains — Picker and Gradient"; the 34 domains here are geometry, membrane, surface and time.
`PROPORTION-AUDIT.md:73` law 8: "token presence alone cannot close a row" — the comment at `:190-201`
closes its row on token presence.

### CSP-02 · BLOCKER · Single-channel extent, and a defeated WHCM focus fallback — UPHELD_REPRODUCED, mechanism corrected

Chromium `forcedColors: "active"`, `/#/atmosphere`:

```
track bg rgb(255,255,255) === well bg rgb(255,255,255)   → 1.00 : 1
track border-width 0px      range bg rgba(0,0,0,0)
```

WCAG 1.4.11 wants ≥3:1 for a control's extent. There is no second channel: no border, and the
range paints nothing (CSP-01). The **only** element in the pane that survives forced colors is the
`.config-section-header` rule the boundary inventory forbids (CSP-11) — a precise inversion of design
priority.

**The focus half, corrected.** Both D and I first measured `outline: none / box-shadow: none` under
script focus, which proves nothing. I re-ran it with a **real keyboard walk** (7 × `Tab`) so that
`:focus-visible` genuinely matched:

```
forcedColors : label "Colour Energy"  focusVisible true  outline "none 3px …"  outline-offset 2px  box-shadow "none"
normal       : label "Colour Energy"  focusVisible true  outline "none 3px …"  outline-offset 0px  box-shadow "…0 0 0 2px, …0 0 8px"
```

The indicator is genuinely gone in WHCM. But **D-1's stated mechanism is wrong**, and the wrongness
matters: the challenger wrote *"`grep -rn forced-colors demo/scenes/` returns zero hits"* and
prescribed "add a forced-colors arm". The arm already exists —
`demo/styles/foundation.css:702-720`:

```css
@media (forced-colors: active) {
  :where(a[href], button, [role="button"], …, [role="slider"], …):focus-visible {
      outline: 2px solid Highlight; outline-offset: 2px; }
}
```

Its `outline-offset: 2px` **did apply** (measured above — that is the fingerprint proving the rule
matched). Its `outline` shorthand lost, because `:where()` pins the rule at specificity **(0,1,0)**
by deliberate design, and the producer ships

```css
.glass-slider[data-variant=spectrum] .slider-thumb[data-v-4f4cab01]:focus-visible{
    box-shadow:var(--focus-ring-shadow), var(--shadow-sm); outline:none}
```

at specificity **(0,5,0)**. The demo's own comment says `:where()` keeps specificity at 0 *"so a
control's own focus rule still wins the normal register"* — and that same choice hands the producer's
unconditional `outline: none` the WHCM register too, where `box-shadow` is stripped. Adding another
demo arm cannot fix this. The producer must stop asserting `outline: none` in the WHCM register.
Likewise `foundation.css:693` already lists `.glass-slider[data-variant=spectrum] .slider-range` under
`forced-color-adjust: none` — a no-op, because preserving a transparent background preserves nothing.

### CSP-03 · BLOCKER · Reset is shape-blind — UPHELD_REPRODUCED, cure refuted

`ConfigSliderPane.vue:92-94`. Reproduced in my own context (probe 1, `/#/blob`, reached
`props.config` through `.config-console.__vueParentComponent` + 3 parent hops, clicked the real
button):

```json
"before": {"paletteStops":["#ffbde0","#ffdde5","#fff6f6","#fff6f4"], "topKeys":9}
"after":  {"paletteStops":["#b5947f","#d4b27d","#dad6b1"],           "topKeys":9}
```

Reads and writes are **dot-path** addressed (`readPath`/`writePath`, `:57-73`); reset is **top-level**.
The component understands nested shape for one half of its abstraction and not the other. Both
consumers declare the invariant this breaks in prose — `BlobPane.vue:8-9` (*"`color.paletteStops`
is omitted: it is the live picker-palette feed … not a slider"*) and `aurora-atoms.ts:17-20`. Aurora
survives only by the accident that `seed` is top-level and absent from defaults; blob dies because
`paletteStops` is at depth 2 inside `color`, which *is* on `BLOB_CONFIG_DEFAULTS`:

```
$ node -e "…BLOB_CONFIG_DEFAULTS.color" → {"paletteStops":["#b5947f","#d4b27d","#dad6b1"], "hueRange":5, …}
```

The writer does not restore it: `useAtmosphere.ts:389-403` is `watch(atmosphereColor, …)`, keyed on
the colour string, so the picker→blob link stays severed until a *different* colour is picked. The
arity changes too (4 live stops → 3 canned).

**The cure all three challengers proposed is refuted by the producer's own dist.** C-1, C-9 and L-1
all prescribe `useConfiguratorState<T>` (the still-open C10 A4 [P1] book, verified present at
`docs/tranches/N/audit/lanes/C10.md:92-105` and `:265`). Its apply function, from
`dist/configurator-M5OaIlJd.js`:

```js
function m(e){ let t = c, n = e;
  for (let e of Object.keys(t)) e in n || delete t[e];    // PRUNE top-level keys absent from the baseline
  for (let e of Object.keys(n)) t[e] = n[e]; }            // REPLACE top-level keys wholesale
function _(){ … n && (… m(t(n.config))) }                 // resetCurrent()
```

That is the **same depth-1 replacement**, plus a prune that would additionally **delete AuroraPane's
`seed`** — a key that survives today. Adopting it as written would ship the blob clobber unchanged
and add an aurora clobber. It also owns its own `reactive` config (`c = v(…)`), which is not the
injected `BLOB_CONFIG_KEY` object the app provides, so adoption is a providership transposition, not
an import. **The only cure that cannot lie is a reset over the declared `SliderDef` key domain** —
the pane resets exactly what it renders, which is also the only statement of the invariant that a
gate can check (G5).

### CSP-04 · MAJOR · The unguarded lens — UPHELD_REPRODUCED (injected, type-legal)

`:76-78` `return readPath(config, key) as number` over a function that returns `undefined` by design
(`:60`), handed to `fmt()` (`:84-86`) inside the render function. Boundary table, exact body:

```
0 → "0"   -0 → "0"   0.5 → "0.500"   NaN → "NaN"   Infinity → "Infinity"   1e21 → "1e+21"
undefined → THROWS: Cannot read properties of undefined (reading 'toFixed')
null      → THROWS
```

The state is type-permitted: `AuroraAtoms.zones` is `zones?: AuroraZones`
(`glass-ui/dist/components/aurora/composables/atoms.d.ts:145`) and the def is `{key:"zones.count"}`
(`AuroraPane.vue:103`). My reproduction (probe 2 / G7) sets `config.zones = undefined` on the live
reactive object:

```json
{"rowsBefore":3, "mounted":false, "rowsAfter":0,
 "body":"… This panel hit an unexpected error. Cannot read properties of undefined (reading 'toFixed') …",
 "pageErrors":[], "consoleErrors":[]}
```

Three facts: one absent optional branch takes down **all** rows, not one; the boundary swallows the
failure so completely that no harness watching `console`/`pageerror` can see it; and the pane's own
file is internally inconsistent — `AuroraPane.vue:74` and `:82` guard the same key
(`atoms.zones?.arrangement ?? "composed"`, `atoms.zones?.count ?? 4`) three lines from the def that
does not. `writePath` (`:66-73`) has the mirror hole with three unchecked casts.

L-7's asymmetry observation is the same defect seen from the module axis and merges here. Per
FORMATION-LAWS **L-8 (structure over gates)** the cure is to make the class unrepresentable: a
`SliderDef` carrying its own typed accessor deletes `readPath`, `writePath`, the `as number`, and
both consumers' `as unknown as` casts — strictly less code.

### CSP-05 · MAJOR · Two voices — UPHELD_REPRODUCED, byte corrected

Measured on all 31 rows: `aria-valuetext` is **absent** (`null`), not empty as C-2 reported; the
sighted readout says `0.220` and `aria-valuenow` says `0.22`. On the same page the picker population
announces `Lightness 92.0%`. The producer forwards only `aria-label`/`labelledby`/`describedby`/
`errormessage` (`slider-DzqeQmMu.js:134-137`), so the demo's own in-repo cure —
`demo/picker/controls/ComponentSliders/composables/useSliderAnnouncements.ts:2-13`, whose header
records the same constraint and the sanctioned interim — is the shipped answer, and
`ComponentSliders.vue:326` already records it as *"Offered to the ConfigSliderPane population."*
The offer was never taken.

### CSP-06 · MAJOR · Structure drawn, never announced — UPHELD_REPRODUCED

```
labelCount 31 · labelsWithFor 0 · labelsWrappingControl 0
groupsInConsole 0 · headingsInConsole 0 · sectionTitleTags 7 × {tag:"SPAN", role:null}
firstLabel: <label data-slot="label" class="glass-label truncate text-small font-medium text-foreground">Body Radius</label>
```

31 `<label>` elements that label nothing, and 7 visually grouped sections with zero programmatic
grouping (WCAG 1.3.1). `for` is unavailable — `span[role="slider"]` is not a labelable element — so
the durable wiring is `aria-labelledby` against the label's id, which the producer's Slider **does**
forward but `ConfiguratorRow` does not expose. That half is a glass-ui BH relay item; the
`role="group" aria-labelledby` half is two attributes on markup the pane already draws.

### CSP-07 · MAJOR · No operation truth — UPHELD_REPRODUCED, one detail dismissed

`writeClipboard` never throws; it returns `{ok:false, reason:'no-api'|'clipboard-api'}`
(`dist/useClipboard-D36OTaeT.js`). `:88-90` awaits it and drops the value. Forced `no-api` on the
real button:

```json
{"before":"Copy JSON  Reset","after":"Copy JSON  Reset","changed":false,
 "liveRegions":0,"ariaDisabled":null}
```

Silent on failure and silent on success. `no-api` is not hypothetical for this repo: `vite.config.ts`
sets `server.host: true` specifically so the demo can be driven from a phone over `http://<LAN-ip>:9000`,
and `navigator.clipboard` is secure-context-gated — on the exact origin the LAN host exists to serve,
Copy JSON is a dead button. Reset is destructive, unconfirmed, unannounced and irreversible, and
`OPTICAL-BENCH-COMPOSITIONS.md:47` names a `compare` region that does not exist.

### CSP-08 · MAJOR · Inert cures carrying live claims — UPHELD_REPRODUCED by causal probe

Two of the three most heavily-commented cures in the file do nothing. I did not accept the
challengers' inference; I deleted the declarations at runtime and re-measured.

**(a) the clamp.** `:215-217 min-block-size: clamp(2rem, 7cqi, 2.625rem)` under a comment claiming
"THE ONE RHYTHM SOURCE … container-scaled".

| route | container | resolved clamp | rendered row |
|---|---:|---:|---:|
| `/#/blob` | 512 px (`.pane-wrapper--right`, `container-type: inline-size`) | 35.84 px | **60.97 px** |
| `/#/atmosphere` | 1042 px (`--left`) | 42 px (ceiling) | **60.97 px** |
| `/#/atmosphere` 390 | 358 px | 32 px | 77.59 px |

`rowHeights` is a **single value** `[61]` across a 2.03× container span. The clamp ceiling sits ~19 px
under the row's content height on every arm: it never binds. Meanwhile `data-size` is `null` on
every row while the producer ships `.configurator-row[data-size=sm|md|lg]` with a
`--configurator-row-gap-*`/`-py-*` ladder and an `@container style(--configurator-size)` seam. The
real rhythm comes from `class="gap-1.5 py-1"` (`:142`) plus a `:deep()` correction —
`VISUAL-CONSTITUTION.md:89` says W17 deletes descendant corrections; the file has **four**.

**(b) the coarse hit extension.** `:218-230`, claiming a ≥44 px tap zone. Causal probe, 390×844
`hasTouch`, coarse pointer confirmed:

```
baseline                       root 44 · thumb 12×44 · track 294×24 · row 77.6 · min-block-size 44px
::before killed (!important)   root 44 · thumb 12×44 · track 294×24 · row 77.6      ← delta ZERO
min-block-size killed          root 24 · thumb 12×24                                 ← the real source
```

The 44 px rung is the **producer's**, and I found the rule:
`glass-ui/dist/styles/utilities/responsive.css:1` —
`@media (pointer: coarse) { [data-control-target] { min-block-size: var(--touch-target, 2.75rem); min-inline-size: … } }`,
and `slider-DzqeQmMu.js` stamps `data-control-target=""` on every Slider root. The pane's
pseudo-element contributes **exactly nothing**, and it is unreachable on the route carrying 31 of the
34 sliders anyway (CSP-13). Both blocks and their justification comments are pure deletion.

### CSP-09 · MAJOR · The API cannot express the canon — UPHELD_BY_BYTES + measured

`SliderDef {key,label,min,max,step}` / `SliderSection {title,defs}` (`:27-39`) has no `rank`,
`unit`, `precision`, `disabled`/`enabledWhen`, `format`. Consequences, each verified:

- **Disclosure unrepresentable.** `scrollHeight 2611 / clientHeight 695` = 3.75 screens of flat list;
  `maskImage "none"`. `OPTICAL-BENCH-COMPOSITIONS.md:46-47` binds the regions
  `preview; essentials; advanced[/reset/compare]`; `PROPORTION-AUDIT.md:54` PR-10 is the open row.
  No consumer can build them because the prop shape has no vocabulary for them.
- **Precision inferred from the value, not the step.** `fmt` = `Number.isInteger(v) ? String(v) : v.toFixed(3)`.
  Measured widths in the shipped font: `"1"` = **6.78 px**, `"0.990"` = **33.86 px**,
  `"-0.050"` = 40.63 px; `font-variant-numeric: normal`; `min-inline-size: auto`. Every range
  containing an integer flips its readout by ~80% of its width mid-drag.
  `VISUAL-CONSTITUTION.md:78` requires tabular figures **and** a reserved widest representation;
  both fail. `noiseFreq` (step 0.1) renders `0.500` — two digits of false precision.
- **No `unit`.** `Merge (ms)` smuggles its unit into the label; `Hue Range` (degrees) has none.
  `VISUAL-CONSTITUTION.md:124` requires "announce label, value, **unit**".
- **No dependent state.** `geometry.satelliteCount` has minimum **0** (`BlobPane.vue:59`) with five
  satellite-dependent sliders alongside; `aria-disabled` is `null` on all 31 thumbs and `SliderDef`
  has no field to express it. *(That five sliders drive nothing at count 0 is the challenger's
  mechanism read, not a driven reproduction — the state model gap is what I uphold.)*
- **Types erased.** `config`/`defaults: Record<string, unknown>` forces four `as unknown as` casts
  across two consumers, and `BlobPane.vue:36-48` spends a 13-line recursive mapped type restoring
  key safety the pane threw away. That mapped type is *good* structure and must survive the cure.
- **A documented empty state that has no branch** (`:44` vs `:119`/`:163`, no `v-else`) and a
  documented prop `extraControls?` (`:3`) that `:41-52` never declares.

### CSP-10 · MAJOR · Vacuous gate — UPHELD_BY_BYTES

```
$ grep -rlE "ConfigSliderPane|config-console|copyAsJson|resetDefaults|readPath|writePath" test/ demo/test/ e2e/
e2e/smoke/oracles/o7-card-census.spec.ts
e2e/smoke/oracles/o18-contrast-census.spec.ts
```

`o7` **explicitly excludes** the pane (`:38-42`, "grep-verified at the wave gate" — a grep standing
in for the runtime walk). `o18` asserts only computed colours: `:950` the label's ratio, `:959` the
`.font-mono` ratio, `:1170`/`:1205` the `.slider-track` ratio. It never reads text, never moves a
slider, never clicks a button. Mutations that keep every gate green: **M1** `update(){}` (all 34
sliders read-only) · **M2** `resetDefaults(){}` · **M3** `copyAsJson(){}` · **M4** `fmt = String`.

And the one born-RED gate the file cites, `o18:1144-1215`, is aimed at the wrong element: it asks
whether the **inert track** clears 3:1 and is green *because* of the `--ink-muted` re-ink that killed
the fill. The correct cure therefore turns an existing gate RED. **The wave re-aims that leg at the
range/track pair (G1) in the same cut** — a bounds correction, not a weakening, on the W6.5
precedent the spec's own header cites.

### CSP-11 · MAJOR · The pane is not a chassis region — UPHELD_REPRODUCED

- **Card stack.** `:99-101` `<Card tier="resting">` as the pane root, `:122` `.console-well` nested
  inside it (`background --well-bg; border 1px solid --card-edge; border-radius --radius-panel`,
  `foundation.css:350-354`). Live ancestor walk from `.console-well`: `[{tag:"DIV", tier:"resting",
  classes:["glass-resting"]}]`. `OPTICAL-BENCH-COMPOSITIONS.md:67` — "the other sixteen compositions
  have Card count `0`"; `:46` Atmosphere "form sections not Cards"; `:47` Blob "no settings Card
  stack". `foundation.css:346-348` concedes it: `.console-well` is an *"INTERIM demo class — swaps
  onto the producer `.glass-well` rung when packet P3 ships (BOOKED)"*. Verified: glass-ui 7.0.0
  ships **zero** `.glass-well` occurrences, but `SURFACE_TIERS` is
  `["wash","quiet","resting","floating","overlay"]` — `quiet` is the rung the well wants, available
  today, so the bank's condition is already met (FORMATION-LAWS L-4).
- **Eight forbidden lines.** 7 × `.config-section-header{border-bottom}` + 1 × `.config-action-bar
  {border-top}`, against a binding inventory of `none` for both compositions
  (`OPTICAL-BENCH-COMPOSITIONS.md:80-81`, `:90` "Any additional line … is a defect"). Scheme-asymmetric:
  **1.08:1 light / 5.09:1 dark** — a 4.7× swing for one element, invisible in one scheme and a crisp
  rule in the other, and the only survivor under forced colors.
- **Two row species from one bare slot.** `:110` is an unnamed, ungridded slot; `AuroraPane.vue:118-181`
  fills it with a hand-rolled species. Measured on `/#/atmosphere`:
  `.aurora-row` `x 224 → 1216, h 36` vs `.configurator-row` `x 239 → 1201, h 60.97` — **15 px indent
  difference, 1.69× height**, Fira Code 400 caps `rgb(112,89,66)` vs Plus Jakarta Sans 500
  `rgb(28,25,23)`, on two material tiers. And `.aurora-row-label` (`AuroraPane.vue:194-199`) is
  **computed-identical to `.config-section-title`** — six of six properties equal, in all three arms
  (light / dark / forced-colors), from five byte-identical declarations in the same order. A section
  heading and a control label are the same object; in `shots/safari-mobile-dark/atmosphere.png`,
  `FIELD` and `HARMONY` are indistinguishable.

### CSP-12 · MAJOR · 12 px inline target in every matrix — UPHELD_REPRODUCED, attribution corrected

All 31 thumbs are `12×24` on desktop and `12×44` on coarse. WCAG 2.5.8 is 24×24 and is not
pointer-type-conditional; the producer's `[data-control-target]` rung raises the **root**
(`min-inline-size` on a 100%-wide element is inert), never the thumb, whose width is
`calc(var(--slider-thumb-size,1rem)*.75)`. So the inline axis fails in **every** matrix and the fix
is a producer token, not a demo override (edict 5). **D-5's claim that "the mobile arm proves the
cure works" is dismissed** — §4.1.

### CSP-13 · BLOCKER (shell-owned) · No narrow arm — UPHELD_REPRODUCED

Breakpoint sweep on `/#/blob`: `1024 → 31 rows`, `1000 → 0`, `900 → 0`, `390 → 0`. Mechanism: L's
reading is the precise one and supersedes C's — `viewSchema.ts:179-187` gives blob
`{left:"color-picker", right:"blob"}` with **no `defaultPaneIndex`**, and `useViewManager.ts:65`
resolves `defaultPaneIndex ?? 0` → pane 0 → the **left** pane → the ColorPicker. `defaultPaneIndex: 1`
exists and is used twice elsewhere. Compounding it, `usePaneRouter.ts:95` ends `return ColorPicker;`
— a masking fallback (edict 2) that makes a pane rename degrade silently instead of failing a
typecheck. The frame shows the URL saying `/#/blob` while the dock pill shows `Picker` selected —
route and rendered pane in open disagreement, and `OPTICAL-BENCH-COMPOSITIONS.md:115` names a visible
global pane toggle a live defect.

### CSP-14 · MINOR · RTL — UPHELD_REPRODUCED

Measured: thumb centre at **0.382 of track width from the visual left in BOTH directions** (the axis
does not mirror — legitimate under `VISUAL-CONSTITUTION.md:124`), while the action bar's visual order
flips to `Reset, Copy JSON` (DOM order is `Copy JSON, Reset`), promoting the destructive verb.
`shots/rtl-desktop/blob.png` shows the row reading `0.220 Body Radius` — the text pair mirrors over a
track that does not — and the description's terminal period orphaned onto the next line (`.behavior`),
a bidi-isolation gap in the path the pane feeds at `:107`. `:154` requires LTR-isolated spans for
values inside RTL prose; the readout has none.

### CSP-15 · MINOR · A mask that never existed — UPHELD_REPRODUCED

`:104-106` claims "The scroll region owns the fade mask + overflow" and `:106` applies
`pane-scroll-fade`. Measured `maskImage: "none"`, `webkitMaskImage: "none"`. The class
(`PaneHeader.vue:54-57`, an **unscoped** block in a child component) sets only
`contain: layout style paint` and `scroll-timeline: --pane-scroll`. The visible consequence is the
amputation in `shots/safari-mobile-dark/atmosphere.png`: `Noise 0.500` with its control sliced at a
hard edge. L-13's structural half merges here: a global class emitted from a leaf component is a
magic-string contract across nine consumers with no prop, no type and no check, while the other
cross-pane class (`.console-well`) lives in `foundation.css` — two homes for one category.

### CSP-16 · MAJOR (repo-structural) · UPHELD_BY_BYTES — every count re-measured

| row | measured |
|---|---|
| L-2 alias shims | `demo/ui/` = **19** directories, each a single `index.ts` re-exporting `@mkbabb/glass-ui`; **90** demo imports via the shim vs **37** root-barrel + **82** subpath. `ConfigSliderPane.vue:16-23` uses both paths in one eight-line block. |
| L-3 root barrel | `dist/glass-ui.js` 25,239 B / **46** static chunk deps vs `dist/dom.js` 4,179 B / **7**; `./dom` is a published key (74 total) and exports `writeClipboard` (verified by import). |
| L-5 tsconfig drift | `package.json exports` = 7 keys, no `"."`. `tsconfig.demo.json:42-49` declares 8, of which **3 dangle** (`.`/`parsing`/`units` — `dist/index.d.ts`, `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts` all absent) and **2 real keys are unspoken** (`./css` — **10 demo imports** — and `./value`). Consequence measured: `dist/subpaths/css.d.ts` and the installed tarball's copy **DIFFER** (all six siblings are byte-identical), so those 10 imports typecheck against one surface and execute against another. |
| L-9 boot edge | `demo/scenes/atmosphere/aurora-harmony-stops.ts:23` imports `../../color-picker/composables/boot/atmosphere-calibration`; `demo/color-picker/` is the Vite `root`. A feature reaching into the shell's boot chain. |

These are real and none of them is ConfigSliderPane's to fix. They FOLD (§5) with their identities
intact; L-5 in particular weakens every other proof in the tranche and should not ride on a
component wave.

### CSP-17 · INFO · Dead declarations — UPHELD_REPRODUCED

Scoped to the pane's own Card (the naive `querySelector('[data-tier=resting]')` picks the *picker's*
card on `/#/blob` — a measurement trap): **64** absolutely-positioned descendants inside the pane,
**0** of them anchored to the Card or its wrapper (every one resolves to `.slider-track` or
`.glass-slider`). Both `relative` declarations (`:98`, `:101`) are dead positioning contexts, residue
of the floating action bar the comment at `:159-162` records migrating away; `mx-auto` on a `w-full`
element is inert.

---

## 4 · Dismissed — with the bytes that refute them

### 4.1 D-5's cure attribution: *"the mobile arm proves the cure works"* — REFUTED
Killing `ConfigSliderPane.vue:218-230` at runtime changes **nothing**: `root 44 · thumb 12×44 · row
77.6` before and after. Killing `min-block-size` drops the root to 24. The rung is
`glass-ui/dist/styles/utilities/responsive.css:1` (`@media (pointer: coarse) { [data-control-target] { min-block-size: var(--touch-target, 2.75rem) … } }`)
applied to the root the producer stamps in `slider-DzqeQmMu.js`. The pane's block never contributed
and deleting it is safe.

### 4.2 C-1 / C-9 / L-1's cure: *adopt `useConfiguratorState`* — REFUTED
`dist/configurator-M5OaIlJd.js` `m(e)`: `for (let e of Object.keys(t)) e in n || delete t[e]; for (let e of Object.keys(n)) t[e] = n[e];`
— top-level replace **plus prune**. It reproduces the blob clobber exactly and additionally deletes
AuroraPane's `seed`, which survives today. It also owns its own `reactive` config, which is not the
injected one. (The producer's *typed* surface, `clone`/`equals` seams and `canReset` remain worth
consuming; its **reset semantics** are not.)

### 4.3 D-10: *"`@click` on an async fn means a rejection is an unhandled promise rejection"* — REFUTED
`writeClipboard` cannot reject: `dist/useClipboard-D36OTaeT.js` returns `{ok:false,reason:"no-api"}`
and catches its own `writeText` rejection into `{ok:false,reason:"clipboard-api"}`. Measured: the
failing arm emits one `console.warn` and **zero** page errors. The defect is a discarded `Result`
(CSP-07), not an unhandled rejection, and the distinction changes the cure.

### 4.4 D-1: *"`grep -rn forced-colors demo/` returns zero hits under `demo/scenes/`"* → *"add a forced-colors arm"* — REFUTED
`demo/styles/foundation.css:678-720` is a full WHCM arm, including a `[role="slider"]:focus-visible`
outline fallback and a `forced-color-adjust: none` entry naming
`.glass-slider[data-variant="spectrum"] .slider-range` by selector. The arm exists and **loses** —
on specificity for focus, and on a transparent background for the range. Adding another demo arm
reproduces the bug. (The *finding* stands; the *mechanism and the cure* are corrected — CSP-02.)

### 4.5 L-16: *`/#/blob` drifts off-route in Chromium* — NOT REPRODUCED
Eight navigations to `/#/blob` across five private Chromium contexts in this seat, including three
with `setViewportSize()` sweeps: `page.url()` remained
`http://localhost:9000/#/blob?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` every time, 31 rows
present, `--ink-muted` stamped. The C seat independently documented the shared MCP browser being
driven concurrently by other seats (its own `#/blob` navigation stolen and landed on `#/gradient`) —
which is the parsimonious explanation for L's three drifting probes. Dismissed as an instrument
artifact of contended MCP, not a property of the tree. *(The `oklch(none 0.2 30)` URL L saw is
separately real and belongs to the parser band's R1 row; it is not this component's.)*

### 4.6 D-19: *a truncated label has no fallback* — UPHELD BUT NOT THIS PANE'S (folded, not dismissed)
The `truncate` class is on the producer's `Label` inside `ConfiguratorRow`
(measured: `class="glass-label truncate text-small font-medium text-foreground"`), and today's
longest shipped label is `Click Impulse` (13 chars), so the state does not fire in shipped content.
Shipping *both* a label budget and a `title` is the contrivance edict 3 forbids. **FOLD** to the
glass-ui BH relay with CSP-06's `aria-labelledby` item, one packet.

### 4.7 Two smaller corrections, recorded so they are not re-litigated
- D-3's *"the value is carried by a 12×24 **transparent** thumb"*: the thumb's *fill* is transparent;
  the producer paints a 2 px border (`--slider-thumb-border-w`), so it reads as an outlined pill.
  The defect is unchanged; the description is not.
- D-16's edict-1 (god module) reading: the file is 252 lines, under the 400-line cap C measured. It
  is not a god module by size. It does carry seven responsibilities, which is what CSP-09 books.

---

## 5 · WAVE SPEC — `MT-W-CSP-01` · *The config-slider pane states its value, its domain, and its truth*

Filled against the FORMATION-LAWS wave template.

**DEFECT.** Thirty-four numeric controls whose value is painted by nothing; a Reset that destroys
live state it does not own; a render-time cast that unmounts the pane on a type-legal input and
reports nothing; and a component whose entire behaviour can be deleted with every gate green.
Reproduction and today's output: §2, `node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gate-probe.mjs` → **exit 1, ten RED**.

**BORN.** **RED.** All ten gates fail against `c654824e`, today, with the failure pasted above.

**SCOPE.** Exactly these files, exactly this end state:

| file | end state |
|---|---|
| `demo/scenes/ConfigSliderPane.vue` | `SliderDef<T>` carries `get`/`set` (typed accessors), `precision`, `unit`, `enabledWhen?`; `SliderSection<T>` carries `rank: "essential" \| "advanced"`. `readPath`/`writePath`/`read`/`as number` **deleted**. `resetDefaults` resets **only the declared key domain**. `copyAsJson` consumes the `CopyResult` into a durable `[role=status]` in the action bar. `variant="spectrum"` and `--slider-track-bg` **deleted**; the producer's neutral Slider paints the fill. All four `:deep()` blocks, `gap-1.5 py-1`, the `@media (pointer: coarse)` block, `.config-section-header`'s `border-bottom`, `.config-action-bar`'s `border-top`, both `relative`, `mx-auto`, the `extraControls` JSDoc line, the false empty-state JSDoc and both dead `v-if` guards **deleted**. Section wrappers become `role="group" :aria-labelledby`. Each thumb receives `aria-valuetext` from the same `fmt` cell the row renders. The readout gets `font-variant-numeric: tabular-nums` and a `min-inline-size` reserved from the widest legal string for its def. `<Card tier="resting">` + `.console-well` collapse to one surface at `tier="quiet"`. The bare `<slot/>` becomes a typed row entry so enum controls render as `ConfiguratorRow`s in the one grid. `pane-scroll-fade` → `pane-scroll-host` **or** it grows the `mask-image` its name claims. |
| `demo/scenes/blob/BlobPane.vue` | passes typed accessors; both `as unknown as` casts deleted; `NumericAtomPath` **preserved** (it is the good structure); sections gain `rank`. |
| `demo/scenes/atmosphere/AuroraPane.vue` | both `as unknown as` casts deleted; `.aurora-row`/`.aurora-row-label` and the whole `<style>` block deleted with the slot cure (`:118-181` become typed rows). |
| `demo/test/scenes/config-slider-pane.test.ts` | **new** — the M1–M4 mutation killers (§ GATES G10). |
| `demo/styles/foundation.css` | `.console-well` deleted (its rung is `tier="quiet"`); the `.glass-slider[data-variant=spectrum] .slider-range` `forced-color-adjust` entry deleted with the variant. |
| `e2e/smoke/oracles/o18-contrast-census.spec.ts` | the config GRAPHICS leg re-aimed from the inert track to the **range/track pair** (G1). A bounds correction on the W6.5 precedent, recorded as such. |
| glass-ui relay (BH packet, no source edit here) | (i) `.slider-thumb:focus-visible{outline:none}` must not assert in the `forced-colors` register; (ii) `ConfiguratorRow` exposes its label `id` for `aria-labelledby`; (iii) `--slider-thumb-size` inline axis ≥24 px or a thumb-scoped target extension; (iv) `ConfiguratorRow` owns the reserved tabular value slot per `VISUAL-CONSTITUTION.md:104`. |

**STRUCTURE (L-8) — what is made unrepresentable, rather than gated:**

1. A `SliderDef` that addresses a non-numeric or absent path **cannot be written** — the accessor is
   a closure over the typed config, so CSP-04's crash class and the four `as unknown as` casts stop
   existing. No gate is needed for what the compiler refuses.
2. Reset over a **declared key domain** cannot destroy a path the pane does not render — CSP-03
   becomes inexpressible rather than guarded.
3. Deleting `variant="spectrum"` removes the recipe that blanks the fill; there is no override left
   to mask it — CSP-01/CSP-02's extent problem stops existing rather than being re-inked.

Gates remain for the three properties that are genuinely observational (contrast, WHCM, a11y wiring).

**GATES.** (all ten from §2, plus the mutation gate)

| id | command | property | RED today | reddening input |
|---|---|---|---|---|
| G1–G9 | `node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/gate-probe.mjs` | §2 table | ✅ 9/9 | §2 table |
| G10 | `npx vitest run demo/test/scenes/config-slider-pane.test.ts` | the suite exists and dies under M1 (`update(){}`), M2 (`resetDefaults(){}`), M3 (`copyAsJson(){}`), M4 (`fmt = String`) | ✅ (no such file) | any of M1–M4 applied to a green tree |
| G11 | `npx playwright test e2e/smoke/oracles/o18-contrast-census.spec.ts -g "config-track graphics"` | the **range/track pair** clears 3:1, not the inert track alone | ✅ once re-aimed (today it is green over the defect) | restoring `--slider-track-bg: var(--ink-muted)` |

**ENV (L-12).** Gates run in private Chromium against the dev server. That environment is
structurally blind to: (a) the **built** bundle — MT-F012's empty prod mount is invisible here, so no
bundle or performance claim may cite these gates; (b) **WebKit** rendering — the desktop+mobile Safari
arm is the visual harness's, and the tracked `forced-colors-desktop` matrix is *not* a forced-colors
render at all (WebKit ignores Playwright's `forcedColors`, which is why that frame is byte-comparable
to the ordinary light frame and could never have caught CSP-02); (c) anything the ErrorBoundary
swallows — hence G7 asserts the mount, never the console.

**π OBLIGATIONS.** Each: matrix · route · selector · committed path.

| # | matrix | route | selector | committed capture |
|---|---|---|---|---|
| π1 | chromium-desktop-light 1440×900 | `/#/blob` | `.config-console` | `audit/components/ConfigSliderPane/frames/BEFORE-blob-desktop-light-console.png` **(captured)** |
| π2 | chromium-desktop forcedColors:active | `/#/atmosphere` | full page, thumb focused by keyboard | `…/frames/BEFORE-atmosphere-forced-colors-focus.png` **(captured)** |
| π3 | safari-desktop-{light,dark} | `/#/blob` | `.config-console .configurator-row:nth-of-type(1..2)` | `…/frames/AFTER-safari-desktop-{light,dark}-console.png` |
| π4 | safari-mobile-dark 390×844 | `/#/atmosphere` | `.console-well` bottom edge | `…/frames/AFTER-safari-mobile-dark-scroll-edge.png` |
| π5 | rtl-desktop | `/#/blob` | `.config-action-bar` | `…/frames/AFTER-rtl-desktop-actionbar.png` |

**`.gitignore:34` is `*.png` and `git ls-files` returns ZERO tracked files under
`audit/visual/shots/` and under every component `frames/` directory** — the entire visual evidence
base this jury was handed is untracked, which is FORMATION-LAWS **L-7's** exact failure reproducing
inside this formation. Every π capture above is force-added (`git add -f`) or the claim is not made.

**DELTA OBLIGATIONS.**

| # | before → after, one pair per visual claim |
|---|---|
| Δ1 | π1 before (31 identical slabs, range 1.00:1) → after (a painted fill at ≥3:1, thumb on the boundary) |
| Δ2 | π2 before (no track, no extent, no focus ring) → after (visible extent + a painted `Highlight` focus outline) |
| Δ3 | mobile-dark scroll edge before (`Noise 0.500` amputated) → after (the disclosure/mask edge) |
| Δ4 | `/#/atmosphere` slot rows before (two species: `x 224/h 36` vs `x 239/h 60.97`) → after (one grid, one indent, one tier) |
| Δ5 | dividers before (7 + 1 lines, 1.08:1 light / 5.09:1 dark) → after (0 lines, grouping by heading + interval) |
| Δ6 | RTL action bar before (`Reset` leading) → after (order pinned by role) |

**CARRIES (L-5 — original identifiers preserved, no re-booking).**

| original id | row | disposition |
|---|---|---|
| `C10 A4 [P1]` (`N/audit/lanes/C10.md:92-105`, `:265`) | "ADOPT ConfigSliderPane → full Configurator + useConfiguratorState" | **RETIRE** — refuted §4.2: the producer's `resetCurrent()` is the same depth-1 replacement **plus** a prune that deletes `seed`. The row's *intent* (stop hand-rolling state) is discharged by the declared key domain + typed accessors in this wave; its *prescription* is retired on bytes, and the retirement is recorded against the original id so it cannot return under a new name. |
| `N.W13 · U20b` (`N/waves/N.W13.md:96,215,295`) | "Feed ConfigSliderPane a real `--slider-track-bg` gradient so its spectrum variant shows a spectrum" | **RETIRE** — the premise is wrong: these are not chromatic domains (`VISUAL-CONSTITUTION.md:7`). The variant is retired instead of fed. Third appearance of this row (U-CONTROLS §54 → N.W13 → T.W8's ink substitution); it terminates here. |
| `M-34` "the population clause" | the config population wears certified ink | **FOLD** into G1/G11 — the population keeps a certified *fill*, not a certified inert track. |
| `PR-05` (`PROPORTION-AUDIT.md:49`) | duplicate boundaries | **BUILD** here for the pane's 8 lines; family stays with W18. |
| `PR-08` (`:52`) | operation truth only transient | **BUILD** here (CSP-07); family stays with W23. |
| `PR-10` (`:54`) | Atmosphere/Blob form acreage exceeds preview | **FOLD** → **W28 / W29**. This wave supplies the `rank` axis that makes `essentials/advanced` *representable*; the preview-dominant composition is theirs. |
| `PR-12` (`:56`) | touch target vs visual glyph | **FOLD** → **W18** + the BH relay (CSP-12). The pane's own coarse block dies here as dead code, on the correct grounds (§4.1). |
| `P3 / .console-well` bank (`foundation.css:346-348`) | "swaps onto the producer rung when P3 ships" | **RETIRE the bank, BUILD the swap** — re-trigger evaluated per L-4: `node -e "…SURFACE_TIERS"` → `quiet` exists in glass-ui 7.0.0 today. The condition is met; holding the interim class is holding a dual path (edict 2). |
| `CSP-13` (D-2/C-13/L-10) | `/#/blob` unreachable below 1024 px; `componentFor`'s `return ColorPicker` masking fallback | **FOLD** → **W29** (narrow composition) + **`MT-W-SHELL-01`** (one pane table holding component references, `defaultPaneIndex` derived, masking fallback deleted). Gate for the receiving wave: `/#/blob` at 1000 px renders `.config-console`; renaming a pane key fails `vue-tsc`. |
| `CSP-16.L-2` | 19 `demo/ui/` alias barrels, 90 sites | **FOLD** → **`MT-W-DEMOUI-01`**. Gate: `test -d demo/ui` fails; `no-restricted-imports` bans the bare root barrel. |
| `CSP-16.L-3` | root-barrel import for one function | **FOLD** → same wave, same gate. |
| `CSP-16.L-5` | `tsconfig.demo.json paths` ≠ `package.json exports` | **FOLD** → **`MT-W-DOGFOOD-01`**. Gate (RED today): a script asserting `paths` keys ≡ `exports` keys and every target existing — 3 dangling, 2 missing, `css.d.ts` DIFFERs from the installed surface. |
| `CSP-16.L-9` | `scenes/atmosphere` → `color-picker/composables/boot` | **FOLD** → `MT-W-DEMOUI-01`. Gate: no `demo/scenes/**` import matches `color-picker/composables`. |
| `D-19` truncation | label budget vs `title` | **FOLD** → the glass-ui BH relay packet with CSP-06(ii) — §4.6. |
| `CSP-18` render-fan-out | 31 vnodes/keystroke | **RETIRE** — the typed accessor removes the whole-pane key tracking as a side effect; at ~43 µs/row it does not justify a row of its own, and re-booking it would be the disease. |

**BANKS.** One, with its re-trigger written as a command (L-4):

```
BANK-CSP-1 — the producer's WHCM focus assertion.
  re-trigger:  node -e "const c=require('fs').readFileSync('node_modules/@mkbabb/glass-ui/dist/glass-ui.css','utf8'); \
               process.exit(/slider-thumb\[[^\]]*\]:focus-visible\{[^}]*outline:none/.test(c)?1:0)"
  today: exit 1 (the assertion is present). When it exits 0, G3's producer half is discharged
  and the demo's `:where()` fallback paints unassisted.
```

**COMPLETABLE (L-1).** *If this were the only wave that ever executed, would the tree be better and
would the wave be closed?* **Yes.** One component, its two consumers, one new test file, one gate
re-aim, one relay packet — no other wave must land first. The chassis-region composition (W28/W29),
the shell's pane table, and the repo-structural rows are folded out precisely so this wave stays
one-session sized. Nothing in the scope depends on a third party: the BH relay items are *booked*
here and gated by BANK-CSP-1, while the demo-side cures land independently.

---

## 6 · Addendum clause (ready to paste)

> **§CSP — the config-slider population.** A control that carries a value shall paint that value.
> `demo/scenes/ConfigSliderPane.vue` and every consumer of it express the filled extent through the
> producer's own `.slider-range` at ≥3:1 against the unfilled track, in light, dark and
> `forced-colors`; the spectral-meniscus variant is reserved to Picker and Gradient
> (`VISUAL-CONSTITUTION.md:7`) and is retired from all 34 non-chromatic axes, together with the
> `--ink-muted` track re-ink it was invented to excuse — a text-ladder token may not be spent as an
> area fill (`PROPORTION-AUDIT.md:73`). No control may express its whole visual definition through a
> single channel that `forced-colors` overrides, and no demo focus fallback is accepted as a cure
> while a producer rule asserts `outline: none` at higher specificity in that register.
> A pane's Reset restores **exactly the key domain it renders** and touches nothing else; a
> whole-object merge is not a reset, and the producer's `resetCurrent()` does not satisfy this clause
> (it replaces and prunes at depth 1). A slider row's value has **one voice**: the string the eye
> reads is the string `aria-valuetext` announces. Drawn structure is announced structure: a visual
> section is a named `role="group"`, and a `<label>` that labels nothing is a defect. Every action
> reports its result in a durable region owned by the pane; a discarded `Result` is a silent lie.
> Path access into a config object is typed at the definition site — `as number` over a value the
> type system says may be absent is forbidden, and the render function may not be where that lie is
> discovered. Any CSS declaration whose removal leaves every measured box identical is deleted with
> its justification comment: an inert cure carrying a live claim is worse than an absent one, because
> the next reader believes it. This clause is enforced by
> `audit/components/ConfigSliderPane/gate-probe.mjs` (ten gates, all RED at authorship) and by
> `demo/test/scenes/config-slider-pane.test.ts`, whose suite must die under `update(){}`,
> `resetDefaults(){}`, `copyAsJson(){}` and `fmt = String`.

---

## 7 · Dissent

Recorded now so no later reading manufactures consensus. I have not seen JUROR-2's or JUROR-3's
returns; these are the points on which I expect to be alone or contradicted, stated with my reasons.

1. **Against all three challengers on `useConfiguratorState` (§4.2).** C-1, C-9 and L-1 converge on
   it, and convergence between blind seats is normally strong evidence. Here it is three seats
   reading the same `.d.ts` and none reading the implementation. If JUROR-2 upholds the adoption on
   architectural grounds, I dissent: it is architecturally attractive and *semantically wrong* for
   this reset, and adopting it would re-ship CSP-03 plus a new aurora clobber. Consume the producer's
   typing, `clone`/`equals` seams and `canReset`; do not consume its reset.

2. **Against L's greenfield lattice** (`ConfigSliderPane.vue` does not exist; each consumer composes
   `Configurator`/`Layer`/`Row` directly). It is a clean design and I do not adopt it in this wave.
   Deleting the shared pane duplicates the row grammar into two consumers — which is the exact
   mechanism that produced CSP-11's second row species — and it is not one-session completable
   (L-1). The generic pane is not the disease; the *untyped* generic pane is. If JUROR-2 carries the
   lattice, my dissent is scope, not direction: land the typed pane first, and let the lattice be a
   later wave whose born-RED gate is the duplication count.

3. **On severity for CSP-13.** I mark it BLOCKER *and* fold it out of this wave. A juror who marks
   it BLOCKER and keeps it in-scope produces a wave that cannot close in one session (L-1); a juror
   who folds it and downgrades it to MAJOR is under-reporting a route whose entire purpose is absent
   at every width below 1024 px and at 200% zoom. Both halves are needed.

4. **On D's proportion findings (§1.1/§1.2: 72.4% form acreage, no preview on a `preview-dominant`
   composition).** They are real, canon-cited, and I upheld none of them as *this component's*
   defect — they are compositional facts about W28/W29's routes that the pane merely occupies. If
   JUROR-3 books them against ConfigSliderPane, I dissent: a component cannot be defective for the
   acreage its host allots it, and mixing the two would let the real cure (build the preview stage)
   be discharged by shrinking a pane.

5. **On CSP-18 (perf).** C measured it honestly and marked it INFO with a number. I retire it. If
   another seat promotes it, the burden is a fresh measurement against the post-cure tree — 43 µs/row
   on fast desktop Chromium is not a defect, and booking it invites the fan-out to be "cured" by
   contrivance.

6. **A standing objection to the evidence base itself.** Every screenshot this jury was given —
   `audit/visual/shots/**` and every component `frames/**` — is untracked
   (`git ls-files` → empty; `.gitignore:34 *.png`). Under FORMATION-LAWS L-7 *"a witness that is not
   committed does not exist."* Read strictly, no visual claim in any of the three challenge reports
   is admissible, including several I upheld above. I upheld them because I re-measured the
   *computed* values myself in a private browser and the frames merely corroborate — but the
   formation should not mistake that for the frames being evidence. Until they are force-added, the
   visual axis of this audit rests on files that do not exist in any git object, which is the precise
   failure L-7 was written from.

---

*Seat: JUROR-1 (correctness + evidence). Wrote only under
`docs/tranches/V/megatranche/audit/components/ConfigSliderPane/`. No source edited, no `INBOX.md`
touched, `scripts/dev/dev.sh` untouched. Probes: `gate-probe.mjs` (committed here) plus eleven
session-scratchpad probes; every number above is re-runnable from the command beside it.*
