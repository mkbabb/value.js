# CHALLENGE-L — library structure · `demo/workbenches/mix/MixResultDisplay.vue`

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` — the tier this seat was
explicitly spawned with. Declared, not inherited.

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Subject `demo/workbenches/mix/MixResultDisplay.vue` (159 lines), area `demo/workbenches`
- Axis: library structure — module boundaries, ownership, dependency direction, public surface

---

## Provenance — this is run **r5**

Four prior runs existed at this path. All preserved:

| file | run |
|---|---|
| `challenge-L-library.r4-prior.md` | r4 (the run that occupied this filename) |
| `challenge-L-library.r3-prior.md` | r3 |
| `challenge-L-library.r2-prior.md` | r2 |
| `challenge-L-library.prior-run.md` | r1 |

**I completed my own trace and ran every probe below before reading any prior run.** I record the
overlap as convergence, not as discovery.

**Independently re-derived and re-measured at a fifth seat** (receipts in §2): the `WatercolorDot`
attribute-fallthrough BLOCKER and the consequent RED mix gate; the duplicated `MixResult`→clipboard
serializer across `MixPane`/`MixResultDisplay` on two clipboard primitives; the undiscriminated
`MixResult` and its masking `??`s; the dead demo import-boundary eslint regime; the
`tsconfig.demo.json` ↔ `package.json#exports` divergence; the root-barrel `useClipboard`; the
unnecessary `TransitionGroup` import; the compact dock controls outside a dock. I do not
re-litigate cures the priors state well.

**New at r5** — two findings no prior run contains, one negative result the brief asked for, and one
precision bound:

| | |
|---|---|
| **F-16** | **[NEW · MAJOR]** The result plate's eyebrow is a five-utility per-instance override of a design-system recipe its own three siblings use — and it paints **Fraunces italic 700** where `demo/DESIGN.md`'s NORMATIVE three-voice law says *"italics never on control text"* and *"plate captions/eyebrows"* are Fira Code. Measured, both sides. Concept with three homes inside one feature folder. |
| **F-17** | **[NEW · MAJOR]** `demo/palettes/export/` — the 914-line V.W51 **byte-exact palette-export contract set** — has **exactly one importer in the entire repository, and it is a test**. The shipped app runs the 132-line legacy `demo/palettes/export.ts`. The certified implementation is dead in the app; the live one is uncertified. The brief's named suspect, confirmed by enumeration. |
| **F-18** | **[NEW · CLEARED]** The brief's third named suspect — "three parallel `useDark` stores" — is **already dead**. Zero live `useDark(` call sites in `demo/`. Recorded as a negative so no seat re-spends the probe. |
| **F-9′** | **[bound on r4 F-9]** The `TransitionGroup` import is **unnecessary, not unused** — the template does reference it, so no unused-import lint can fire. The proof is the in-file asymmetry with `<Transition>`. This changes how the cure is verified. |

---

## Verdict — **DEFECTIVE (BLOCKER)**

The seat's premise holds. `MixResultDisplay.vue` consumes `@mkbabb/glass-ui@7.0.0`'s
`<WatercolorDot>` through **an attribute surface that does not exist**: the primitive declares
`inheritAttrs: false` and re-forwards only `$attrs.class` and `$attrs.style`. That silently kills
`data-mix-target` (`:69`) — the anchor this file's own docblock (`:14`) names as *"the anchor the
canvas convergence lands on"* — plus three `tag="div"` props (`:67, :81, :101`), the palette
swatches' `:title` (`:103`), and the redundant `aria-hidden` (`:72`). One component over, the same
mechanism kills `@click`/`aria-label`/`:disabled`/children on the add-colour slot, so `canMix` is
permanently false and **this component has never rendered in the shipped app**. `vue-tsc` is green
because unknown attributes on a Vue component are legal fallthrough: the `.d.ts` trust boundary
certifies the **prop** surface and is structurally blind to the **attribute** surface where all the
load-bearing plumbing lives.

**Strongest defect: F-1** (inherited, independently re-measured). **Strongest r5-original: F-17** —
because it is the same disease at module scale: a certified implementation and an uncertified one
coexisting, with the certification pointed at the one nobody runs.

---

## 1 · Import trace

| line | specifier | home | verdict |
|---|---|---|---|
| 2 | `@lucide/vue` | devDep; glass-ui peerDep | OK |
| 3 | `@mkbabb/glass-ui/dock` → `DockControl, DockSeparator` | real subpath | resolves; dock vocabulary out of dock — F-6 |
| 4 | `vue` → `computed, TransitionGroup` | peer | `TransitionGroup` unnecessary — F-9′ |
| 5 | `@mkbabb/glass-ui` → `useClipboard` | **root barrel**; published on `./dom` | F-8 |
| 6 | `@mkbabb/glass-ui/watercolor-dot` | real subpath | **contract fiction** — F-1 |
| 7 | `import type { MixResult }` ← `./composables/useMixingState` | sibling composable | correct `import type`; wrong direction, defective type — F-5 |

**No wrong-direction topology crossing, and the value.js public surface is consumed correctly.**
Re-confirmed independently:

```
$ grep -rn "@mkbabb/value\.js" demo/ | grep -oE '"@mkbabb/value\.js[^"]*"' | sort | uniq -c
  25 "@mkbabb/value.js/color"
  10 "@mkbabb/value.js/css"
   6 "@mkbabb/value.js/math"
   5 "@mkbabb/value.js/easing"
   4 "@mkbabb/value.js/quantize"
$ grep -rn "@src|\.\./\.\./\.\./\.\./src" demo/workbenches/mix/ demo/palettes/mix.ts \
      demo/color-session/color-utils.ts demo/color-session/picker-color.ts   → (empty)
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "@mkbabb/value.js/css"
======== Module name '@mkbabb/value.js/css' was successfully resolved to
'/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' with Package ID
'@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

All five specifiers are declared `exports` keys; resolution lands on the `dist/` trust boundary, not
on source. **A real npm consumer could write every value.js import in this component's transitive
graph verbatim.** The defects are contract and configuration defects, not topology defects.

---

## 2 · F-16 · MAJOR **[r5-NEW]** — the plate eyebrow overrides a design-system recipe, and paints a prohibited voice

### The call site

```html
:58  <span class="font-display text-caption font-bold text-muted-foreground uppercase tracking-wide">Result</span>
```

Five utilities, hand-stacked. Its three siblings in the same feature folder use the recipe:

```
demo/workbenches/mix/MixConfigBar.vue:98    <label class="section-label">Color space</label>
demo/workbenches/mix/MixConfigBar.vue:121   <label class="section-label">Hue method</label>
demo/workbenches/mix/MixConfigBar.vue:145   <label class="section-label">Size mismatch</label>
demo/workbenches/mix/MixSourceSelector.vue:183 <span class="section-label">From palettes</span>
```

`.section-label` is owned by glass-ui:

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css */
.section-label { @apply text-mono-caption; color: var(--muted-foreground); }
@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption);
                             letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }
```

### Measured — both sides, in the running app

Probe: a `<span>` with each class list appended into `.pane-main` on the live `:9000` page, computed
style read, node removed.

| | `MixResultDisplay.vue:58` | `.section-label` | `MixSourceSelector.vue:120` |
|---|---|---|---|
| font-family | `Fraunces, "Fraunces Fallback", serif` | `"Fira Code", …, monospace` | `Fraunces, …, serif` |
| font-style | **italic** | normal | normal |
| font-weight | 700 | 400 | 600 |
| font-size | 14.384px | 14.384px | 16.4px |
| letter-spacing | 0.3596px | **1.4384px** | normal |
| text-transform | uppercase | uppercase | none |

`text-caption` carries `font-style: italic` (`glass-ui/dist/styles/typography/semantic.css`), so
stacking it under `font-display` yields a Fraunces **italic** bold label. Tracking is 4× off the
recipe.

### The law it breaks

`demo/DESIGN.md` §Type, "The three-voice law (**NORMATIVE** — R.W3 Lane A)":

> **Fraunces — the atlas/display voice.** Display rungs ONLY … **Never** on body/control text;
> **italics never on control text.**
> **Fira Code — the readout/annotation voice.** Numeric readouts, code, admin labels, **plate
> captions/eyebrows.**

The same document's material ladder lists *"the mix result plate"* explicitly as a **rung-2 WELL**.
Its caption is a plate eyebrow by that document's own taxonomy. It is currently the exact
combination the law prohibits.

### Why this is a *library-structure* finding, not a styling nit

The concept "section eyebrow" has **three implementations inside one feature folder** — the design
system's (`.section-label`, 4 call sites), this file's five-utility stack, and
`MixSourceSelector.vue:120`'s four-utility stack (`text-small font-display font-semibold
text-muted-foreground`). Unique semantic ownership is the invariant this axis exists to protect, and
the owner already exists in glass-ui. Owner edict 5 (style at the root component level, never
per-instance overrides) and edict 4 (glass-ui is the design system; reuse existing names) both bite.

**Cure.** `class="section-label"` at `:58` and at `MixSourceSelector.vue:120`; delete both local
stacks. If a plate eyebrow genuinely needs a rung distinct from a config-bar label, that rung is a
glass-ui modifier — `.section-label--plate`, alongside the `.section-label--tinted` that already
exists in the same stylesheet — relayed through the standing glass-ui BH fond. Never five utilities
at the call site.

---

## 3 · F-17 · MAJOR **[r5-NEW]** — the byte-exact palette-export contract set has zero app consumers; the app ships the legacy twin

The brief names `demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers` as a
suspect. It is worse than a suspect — it is a live dual path where the **certified** half is the
dead one.

### Enumeration — every importer of `demo/palettes/export/**`, whole repo

```
$ grep -rn 'palettes/export/|"\./export/|"\.\./export/|"\.\./\.\./export/' demo/ | grep -v "^demo/palettes/export/"
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

**One importer. It is a test.**

### What the app actually runs

```
$ grep -rn 'from "\./export"' demo/
demo/palettes/usePaletteExport.ts:9:} from "./export";
$ grep -rn "usePaletteExport" demo/ | grep -v usePaletteExport.ts:
demo/palettes/BrowsePane.vue:198   · :324
demo/palettes/PalettesPane.vue:152 · :211
```

`usePaletteExport.ts:2-9` imports `exportAsJSON, exportAsCSSCustomProperties, exportAsTailwindConfig,
exportAsSVG, exportAsPNG, downloadExport` from the **legacy** `demo/palettes/export.ts`, and both
palette panes consume it. That is the export path a user's click reaches.

### Sizes

```
$ wc -l demo/palettes/export/*.ts   → 914 total  (bytes, canonical, css, digest, json, png,
                                                  reload, rfc8785, serializers, svg, tailwind, types)
$ wc -l demo/palettes/export.ts     → 132
```

914 lines of contract-grade code — RFC 8785 JSON canonicalisation, domain-separated SHA-256 digests,
a byte-exact PNG writer, a reload-identity core — reachable from nothing but its own spec test.
132 lines of pre-contract code, uncertified, in the user's hands. `serializers.ts:6-9` states the
situation in its own header:

> *"This module is intentionally NOT named `index.ts`: the sibling legacy `../export.ts` (the
> pre-contract routed seat that W50 will replace) still resolves `./export`; the byte-exact set is
> addressed by its explicit paths here so the two never collide."*

The two do not collide — because only one of them is wired. Owner edict 2 prohibits dual paths, and
the failure mode here is the sharpest form of it: **a green test suite that proves the wrong
implementation correct.** `byte-exact.test.ts` will stay green through any regression in the code
users actually run.

### Relevance to the subject

`demo/palettes/` is in this component's transitive closure — `useMixingState.ts:20-21` imports
`../../../palettes/types` and `../../../palettes/mix`. The subject's own `onCopy` (`:42-47`) then
hand-rolls a *third* serialization of the same concept (`colors.map(c => c.css).join(", ")`, also at
`MixPane.vue:53` and `PaletteCard.vue:294`), because "a colour list as text" has no home in either
export implementation. One concept, two module-scale implementations plus three inline copies.

**Cure.** Finish W50: route `usePaletteExport` onto `export/serializers` (an `ExportSnapshot` built
from `Palette`), delete `demo/palettes/export.ts`, and let `byte-exact.test.ts` guard the shipping
path. Do this **before** F-4's `mixResultToText` lands, so the new home is carved out of the
surviving module and not the doomed one. Owner: `demo/palettes/`, not `mix/` — but `mix/` is
blocked behind it for the clipboard cure.

---

## 4 · F-18 · **[r5-NEW · CLEARED]** — the "three parallel `useDark` stores" suspect is already dead

The brief names it. It is not live:

```
$ grep -rn "useDark" demo/
demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76:  * vueuse `useDark` instance with it (one of three parallel dark stores;
demo/scenes/about/markdown/composables/useMarkdownColors.ts:16:      // vueuse useDark: parallel stores raced the initial scheme resolution
```

Both hits are **comments recording the removal**. Zero `useDark(` call sites remain. From
`useMarkdownHighlighting.ts:74-81`:

> *"S.W4-8 killed this composable's former GitHub-css head-injection swap AND its private vueuse
> `useDark` instance with it (one of three parallel dark stores; one wrong-theme first paint was
> observed live). No dark consumer remains here: the theme is pure CSS, so the ONE app dark store
> (glass-ui `useGlobalDark`, App.vue) is the only scheme authority."*

Recorded as a negative result so no future seat re-spends the probe. Nothing to file.

---

## 5 · F-19 · MINOR **[r5-NEW]** — swatch identity and blob shape are keyed on array position

```
:97-105  <WatercolorDot v-for="(color, i) in result.colors" :key="i"
                        :seed="i === 0 ? 'mix-result' : `mix-result-${i}`" … />
```

inside `<TransitionGroup name="vj-enter">` (`:92-96`). Both the transition key and the silhouette
seed are the index, so any reorder / insert / remove re-keys the transition (`vj-enter` fires on the
wrong members) **and** re-shapes every downstream blob. The sibling `MixSourceSelector.vue:88-98`
maintains a `swatchKeyMap` specifically to give chips stable identity across mutation — the idiom
exists six files away and is not used here. `PaletteColor` already carries `position`
(`demo/palettes/types.ts:4`), which is the stable identity on hand.

Latent today: `mixResult` is replaced wholesale on each mix, so no in-place reorder occurs. **The
user-visible consequence is a hypothesis; the structural defect is fact.** Folds into F-5's cure —
under the true union the seed and the key both come off `position`.

---

## 6 · F-9′ · precision bound on r4 F-9

r4 files the `TransitionGroup` import at `:4` as "dead". It is **unnecessary, not unused**: the
template genuinely references `<TransitionGroup>` at `:92`, so `eslint`'s unused-import rule cannot
fire and removing it is not a lint-driven cleanup. The proof it is unnecessary is entirely in-file —
`<Transition>` at `:60` is *not* imported and works, because the SFC compiler resolves `Transition`,
`TransitionGroup`, `KeepAlive`, `Suspense`, `Teleport` as built-ins. Repo-wide, all three `.vue`
files that use `<TransitionGroup>` import it (`MixResultDisplay`, `MixSourceSelector`,
`CurrentPaletteEditor`), so this is a consistent-but-unnecessary house idiom, not a one-off.

This matters for how the cure is verified: the gate is a **render** (the transition still runs after
the import is deleted), not a lint.

---

## 7 · Inherited findings — receipts from this seat

I re-derived each of these before reading the priors. Cures as the priors state them; receipts are
mine.

### F-1 · BLOCKER — the `WatercolorDot` contract fiction

Published prop surface (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts:23-51`) is exactly
`{ color; variant?; animate?; cycleDuration?; range?; seed? }`. No `tag`, no `as`, no slot.

Shipped runtime (`dist/watercolor-dot.js`), verbatim:

```js
c({ inheritAttrs: !1, __name: "WatercolorDot",
    props: { color:{}, variant:{default:"solid"}, animate:{…}, cycleDuration:{…}, range:{…}, seed:{default:""} },
    setup(e) { let t=e, n=h(), c=i(()=>n.class), f=i(()=>n.style), …
      return (t,n)=>(d(), o("span", { "aria-hidden":"true", class:l([c.value,"watercolor-swatch",…]),
        "data-testid":"watercolor-swatch", "data-variant":e.variant,
        style:u([f.value,{ …, pointerEvents:"none", … }]) }, [ svg…, ghost-stroke? ])); } })
```

`inheritAttrs:false`; only `attrs.class` and `attrs.style` re-forwarded; root tag hardcoded `span`;
`aria-hidden` and `pointer-events:none` hardcoded; **no default-slot render at all**.

Live receipt, `http://localhost:9000/#/mix`. `MixSourceSelector.vue:166-176` hands the primitive five
things — `tag="button"`, `aria-label="Add current color to the mix"`, `:disabled`, `@click`, a
`<Plus>` child. What renders:

```html
<span data-v-292b9032 data-v-a3e86846 aria-hidden="true"
      class="add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer … watercolor-swatch"
      data-testid="watercolor-swatch" data-variant="ghost"
      style="border-radius:…; pointer-events: none; --watercolor-color: lab(92% 88.8 20); …">
```

Five passed, five dropped; `class` survives — the class/style-only policy proven in situ. Two
synthetic clicks change nothing:

```
{ before: 0, mid: 0, after: 0, ptr: "none", url: "#/mix" }      // [data-mix-source] count
$ document.querySelectorAll('[tag]').length          → 0
$ dots.filter(d => d.hasAttribute('title')).length   → 0
```

Downstream, `MixAnimationCanvas/composables/mixStage.ts:121-124`:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl ? layoutCenter(targetEl, root)
                        : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

`targetEl` is permanently `null`. The `?:` is a masking fallback (edict 2) that absorbed a broken
contract for a whole tranche — without it the Glass-7 adoption would have thrown on day one.

Census of the blast radius, parsed per `<WatercolorDot>` block:

```
3 demo/workbenches/mix/MixSourceSelector.vue        3 demo/shell/dock/Dock.vue
3 demo/workbenches/mix/MixResultDisplay.vue         3 demo/shared/ui/EmptyState.vue
3 demo/palettes/browser/card/CurrentPaletteEditor.vue  2 demo/palettes/browser/card/SwatchHoverMenu.vue
1 demo/workbenches/generate/GenerateControls.vue    1 demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue
1 demo/picker/controls/ComponentSliders/ConsoleRail.vue  1 demo/color-session/ColorSpaceSelector.vue
= 21 dead `tag=` props across 10 files
```

(The 4th `tag="div"` in the subject, `:94`, is on `<TransitionGroup>` — that one is real.)

The gate, run at HEAD `c654824e`:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Error: element(s) not found
      42 |     await expect(addSlot).toBeVisible();
  1 failed
```

`e2e/smoke/safari/mix-flow.spec.ts:40` carries the same `[data-mix-target]` assertion and never
reaches it. Visual corroboration in `shots/safari-desktop-light/mix.png` (read): the "Selected" well
shows the dashed ghost **with no `+` glyph** and the `Mix` CTA rendered disabled — no path from that
screen to a mix.

Provenance: the last commit to touch this file is `f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui
7.0.0 across the demo consumer surface`. It migrated the dock family and the clipboard **in this very
file** and could not see the `WatercolorDot` narrowing, because types cannot verify an
`inheritAttrs:false` component's attribute and slot surface. Only a render can.

### F-2 · MAJOR — the demo import-boundary lint matches zero files

`eslint.config.js:195-300` encodes G-DEMO-1 / G-DEMO-3a / G-DEMO-3b over globs
`demo/@/components/**`, `demo/@/lib/**`, `demo/@/composables/**`, banning `@components/custom/**`.

```
$ ls -d demo/@                     → ls: demo/@: No such file or directory
$ find demo -path "demo/@*"        → (empty)
$ grep -rn "@components/" demo/    → (empty)
```

`demo/@` died at `a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)`; the
`@components` alias died at W43 (RF-15), which `vite.config.ts` documents in its own comment. The
only live boundary rule left in the file is inv-K-1 (`src/**` may not import glass-ui). This is why
`useMixingState.ts:20-23` reaches sideways into two sibling features with no gate — and why 25
such cross-feature reaches exist under `demo/workbenches/` today. A rule that matches nothing is
worse than no rule: it reads as enforcement in review.

### F-3 · MAJOR (typecheck-time) — two sources of truth for the published surface

`vite.config.ts:40-51` **generates** the runtime alias set from `package.json#exports`.
`tsconfig.demo.json` hand-lists it:

| key | `package.json#exports` | `tsconfig.demo.json#paths` | on disk |
|---|---|---|---|
| `.` | **no** | yes → `./dist/index.d.ts` | **MISSING** |
| `/color` `/easing` `/math` `/transform` `/quantize` | yes | yes | exist |
| `/value` `/css` | yes | **no** | exist |
| `/parsing` `/units` | **no** | yes | **MISSING** |

The tsconfig comment asserts *"the bare `.` root + the 7 subpath barrels … a CLOSED 8-key set"*. It
is a closed **7**-key set with **no root**. Three rows point at files that do not exist.
Not load-bearing today (self-reference resolves everything — trace pasted in §1), which is exactly
why the cure is **delete the block**, not repair it.

### F-4 · MAJOR — one payload, two clipboard implementations

`MixResultDisplay.vue:43-46` and `MixPane.vue:51-53` are the character-identical expression

```ts
result.type === "color" ? result.css ?? "" : result.colors?.map((c) => c.css).join(", ") ?? ""
```

on two different primitives — `useClipboard({resetMs:1500})` (confirming) vs `writeClipboard`
(silent). Both live: `demo/shell/usePaneRouter.ts:222` wires the dock's "Copy result" action to
`MixPane.copyResult`. Same bytes, two owners, two user-visible semantics; both discard
`useClipboard`'s typed `{ ok:false, reason }` channel. A third inline copy of the same expression
sits at `demo/palettes/browser/card/PaletteCard.vue:294`.

### F-5 · MAJOR — `MixResult` is an optional bag

`useMixingState.ts:32-36` — `{ type: "color"|"palette"; css?: string; colors?: PaletteColor[] }`.
The producer (`:85-98`) can only ever populate the matching field, so every optionality is a type lie
paid for in `??`: `:38`, `:39`, `:44`, `:45` here, plus template re-narrowings at `:78`, `:91` and
again at `MixPane.vue:41,44`. Edict 2 names masking fallbacks explicitly. Secondary ownership
defect: the type is exported from the *state machine*, so a presentational plate must import the
machine to render — `demo/palettes/types.ts` proves the repo's own convention is a dedicated type
module.

### F-6 · MAJOR — dock primitives outside a dock, below the tap floor

Three `<DockControl compact>` (`:121-142`) in a plain flex row. `.dock-icon-button--compact` reads
`--dock-compact-control-size / -min-width / -padding`, **none of which glass-ui declares anywhere**;
`--dock-control-size` is declared only under `.glass-dock[data-size=…]` (`styles/density.css`), never
at `:root`. So outside a dock the control is `auto` — the `w-5 h-5` glyph (20 px) plus `2 × 0.25rem`
⇒ **28 × 28 px**. Calibration measured live on `/#/mix` for compacts that *are* inside a dock:

```
{"al":"Switch to slug","w":22,"h":22,"inDock":true,"ctrlSize":"max( calc( 2.5rem * 1 ), 0px )"}
{"al":"Generate new slug","w":22,"h":22,"inDock":true,…}   {"al":"Cancel","w":22,"h":22,…}
```

22 × 22 even *with* the dock's tokens. `docs/tranches/V/megatranche/audit/visual/REPORT.md` reports
`smallTapTargets` = 60 across the matrix with `/#/mix` contributing 8 desktop / 4 mobile — and those
captures do **not** include the result plate, which would add three more. `DockSeparator` outside a
dock is explicitly blessed by its own docblock and is **not** a defect; only `DockControl` is.

### F-8 · MINOR — root barrel beside two subpaths

`:5` imports `useClipboard` from `@mkbabb/glass-ui` while `:3` and `:6` use `./dock` and
`./watercolor-dot`. `useClipboard`/`writeClipboard` are published on `@mkbabb/glass-ui/dom`
(`dist/composables/dom/useClipboard.d.ts` → `dist/dom.d.ts`); `dom.js` is 4,179 B against the root
barrel's 25,239 B before shared chunks. One file, three depths against one package, six lines apart.

---

## 8 · Negative results — hypotheses tested and cleared at r5

Recorded so the next seat does not re-spend the probes.

1. **The value.js public surface is consumed correctly** — five subpaths, all real `exports` keys;
   zero `@src`, zero `src/` reach-through, zero bare-root imports; `traceResolution` lands on
   `dist/subpaths/*.d.ts`. The T.W1 demo-dogfood keystone holds for this component's whole graph.
2. **The `useDark` triple store is dead** (F-18) — zero live call sites; the sole authority is
   glass-ui `useGlobalDark` in `App.vue`.
3. **`DockSeparator` outside a dock is not a defect** — its docblock blesses standalone render
   ("a befitting-silent standalone render, not a violation") and it reads orientation from an
   *optional* dock context. Do not file it alongside F-6.
4. **`verbatimModuleSyntax` satisfied** — `:7` is the only type-only import and is `import type`;
   `:4`'s two symbols are values.
5. **Vue 3.5 idiom correct** — `const { result, ghost = false } = defineProps<…>()` (`:20-23`) is
   reactive props destructure with a default, not `withDefaults`. No `defineModel`, so no
   `shallowRef` obligation arises.
6. **Edict 6 satisfied** — the scoped block (`:149-157`) is a presence transition on
   `--duration-fast`/`--ease-standard`; no keyframe is defined here and none was deleted. The global
   `vj-morph`/`vj-enter` families live at `demo/styles/animations.css:67-94`, correctly.
7. **The material rung is correct** — `bg-well` on a `Card tier="resting"` host is exactly the rung
   `demo/DESIGN.md`'s ladder assigns to *"the mix result plate"* (rung 2 · WELL). `--color-well` /
   `--well-bg` are real demo tokens (`demo/styles/foundation.css:143,328`).
8. **`data-mix-source` is NOT affected by F-1** — it sits on real elements
   (`MixSourceSelector.vue:131` chip div, `:252` palette-card button), never on a `WatercolorDot`.

---

## 9 · Commands run at r5 (reproducible)

```
grep -rn "@mkbabb/value\.js" demo/ | grep -oE '"@mkbabb/value\.js[^"]*"' | sort | uniq -c   → 5 subpaths, all exported
npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "@mkbabb/value.js/css"      → dist/subpaths/css.d.ts
python3 <read WatercolorDot render fn from dist/watercolor-dot.js>                          → inheritAttrs:!1, class+style only, no slot
per-block census of <WatercolorDot … tag="…"> in demo/**/*.vue                              → 21 dead props / 10 files
grep -rho -- "--dock-compact-control-*" node_modules/@mkbabb/glass-ui/dist                  → only var(…, auto) reads; 0 declarations
ls -d demo/@ ; find demo -path "demo/@*" ; grep -rn "@components/" demo/                    → all empty (F-2)
for f in dist/index.d.ts dist/subpaths/{parsing,units,value,css}.d.ts; do [ -e $f ]; done   → 3 MISSING, 2 EXIST (F-3)
grep -rn 'palettes/export/' demo/ | grep -v "^demo/palettes/export/"                        → 1 hit, a test (F-17)
wc -l demo/palettes/export/*.ts ; wc -l demo/palettes/export.ts                             → 914 vs 132 (F-17)
grep -rn "useDark" demo/                                                                    → 2 hits, both comments (F-18)
playwright evaluate @ :9000/#/mix — add-slot outerHTML, 2× synthetic click, [tag]/[title] counts → F-1 receipts
playwright evaluate @ :9000 — injected probe spans, computed styles for the 3 eyebrow recipes    → F-16 table
playwright evaluate @ :9000 — .dock-icon-button--compact rects + --dock-control-size             → 22×22 in-dock (F-6)
npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke                             → 1 failed (RED)
git log --oneline -5 -- demo/workbenches/mix/MixResultDisplay.vue                            → f2c8f565 (glass 7 adoption) is HEAD for this file
Read shots/safari-desktop-light/mix.png                                                     → plate absent; ghost slot has no + glyph; Mix disabled
```

---

## 10 · The lattice

r2–r4's shape is right. I state it once with r5's two edges folded in.

```
demo/workbenches/mix/
├── model/
│   ├── mixResult.ts     TYPES + INVARIANTS. The true discriminated union (F-5) ·
│   │                    RESULT_SEED · plateColor() · mixResultToText() (F-4) ·
│   │                    mixResultToGradientCss(). Swatch identity off PaletteColor.position (F-19).
│   │                    Depends on nothing.
│   └── selection.ts     SelectedColor + the add/remove reducers.
├── keys.ts              MIX_TARGET_KEY: InjectionKey<ShallowRef<HTMLElement|null>> —
│                        replaces the [data-mix-target] DOM-string contract (F-1).
│                        Mirrors demo/color-session/keys.ts, palettes/usePalettePorts.ts.
├── useMixSession.ts     the machine over model/. Owns useClipboard ONCE. Exports no types.
├── MixPane.vue          composition root; provides the anchor; owns no serializer (F-4).
├── MixResultPlate.vue   presentational leaf. class="section-label" (F-16). No ?? anywhere.
└── MixAnimationCanvas/  the one clock; receives the anchor ref as an argument.
                         No querySelector, no masking fallback.
```

Three moves beyond the file tree, in descending value:

1. **Finish W50 before touching `mix/`'s clipboard** (F-17). Route `usePaletteExport` onto
   `export/serializers`, delete `demo/palettes/export.ts`, point `byte-exact.test.ts` at the
   shipping path. `mixResultToText` should be carved out of the *surviving* export module, not the
   doomed one.
2. **Promote `demo/palettes/mix.ts` into the library.** Pure weighted N-ary colour maths over
   `AnyColor` with one published-subpath dependency (`mix.ts:9-13`); its only demo coupling is
   `PickerSpace` and the two string codecs, and it pays for the mismatch with `as unknown as` at
   `mix.ts:37`. `package.json` already advertises `"palette"` as a keyword and ships `./quantize`,
   which *produces* palettes and offers nothing that *combines* them. Library capability living in
   a demo folder is the ownership inversion this axis exists to find.
3. **One glass-ui relay carries five findings** (F-1, F-6, F-16, and the `tag`/`title`/slot halves):
   `WatercolorDot` gains `as`/`asChild` via reka `Primitive` (glass-ui already does this on
   `DockControl`), `v-bind="$attrs"`, a default slot, and a `decorative` prop defaulting `true`;
   the compact control gains `:root` size defaults with an unconditional touch floor; and
   `.section-label--plate` joins the existing `.section-label--tinted`. Per the standing BH/BI fond
   this goes to the glass-ui inbox as formation mail, never into `demo/ui/`.

One rule: **a concept has exactly one home, and dependencies point down the list.** The test that it
worked is that the subject gets *smaller* — after F-1/F-4/F-5/F-16 its script block is
`defineProps`, `defineEmits`, one `plateColor` computed and one `onCopy`: no `??`, no duplicated
serializer, no attribute contract, no magic string, no hand-stacked type utilities.

---

*No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. All browser probes are read-only; the F-16
probe appends a measurement span to the live page and removes it before returning. Prior runs
preserved at `challenge-L-library.r4-prior.md`, `.r3-prior.md`, `.r2-prior.md`, `.prior-run.md`.*
