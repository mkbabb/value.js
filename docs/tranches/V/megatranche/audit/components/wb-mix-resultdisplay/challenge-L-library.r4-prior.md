# CHALLENGE-L — library structure · `demo/workbenches/mix/MixResultDisplay.vue`

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context variant) —
the tier this seat was explicitly spawned with. Declared, not inherited.

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Subject `demo/workbenches/mix/MixResultDisplay.vue` (159 lines), area `demo/workbenches`
- Axis: library structure — module boundaries, ownership, dependency direction, public surface

---

## Provenance — this is run **r4**

Three prior runs of this seat existed at this path. All are preserved:

| file | run |
|---|---|
| `challenge-L-library.r3-prior.md` | r3 — the run that occupied this filename (862 lines) |
| `challenge-L-library.r2-prior.md` | r2 |
| `challenge-L-library.prior-run.md` | r1 |

**I completed my own independent trace and ran every probe below before reading any prior run.**
The convergence is therefore real and I record it as convergence, not as discovery.

**Independently re-derived and re-measured (r1↔r2↔r3↔r4).** The `WatercolorDot` attribute-fallthrough
BLOCKER; the consequent unreachability of the whole mix flow and the RED e2e gate; the duplicated
`MixResult`→clipboard serializer across `MixPane`/`MixResultDisplay` on two different clipboard
primitives; the undiscriminated `MixResult`; the root-barrel `useClipboard`; the dead
`TransitionGroup` import; the 28×28 px dock-controls-outside-the-dock; the 19 `demo/ui/*`
pass-through barrels; the visual-audit coverage gap. My receipts for these are in §2 and §6 — I
publish them because independent re-measurement at a *fourth* seat is itself the evidence that these
are facts about the tree and not artefacts of one probe harness, but I claim no novelty and I do not
re-litigate cures the priors already state well.

**New in r4** — one finding no prior run contains, and three published-surface results that *bound*
prior findings rather than repeat them:

| | |
|---|---|
| **F-11** | **[NEW · MAJOR]** The silhouette-continuity law this file's docblock asserts is **not enforced by `seed` at all.** glass-ui seeds the blob PRNG on `hashString(color + seed)`. Proven by mount: same `seed="mix-result"`, two colours → two entirely different silhouettes. The "one shape" law therefore rests on two independently-written colour expressions coinciding, plus three hand-duplicated spellings of one magic string. The invariant has no owner. |
| **F-12** | **[NEW · bound on r3 F-3]** The *runtime* path is clean: `vite.config.ts` **generates** the alias set from `package.json#exports`, and the alias targets are current (`find src -name '*.ts' -newer dist/subpaths/color.js` → **0**). r3's F-3 is a **typecheck-time-only** defect. The shipped demo does genuinely dogfood the published artefacts. |
| **F-13** | **[NEW · sharpens r3 F-3]** The absent `"."` export is **deliberate and correctly documented**, not drift — bare import fails `ERR_PACKAGE_PATH_NOT_EXPORTED`, and all four README examples are subpaths. So `tsconfig.demo.json`'s `"@mkbabb/value.js": ["./dist/index.d.ts"]` does not merely *drift* from the map; it **invents a public entry point the package deliberately refuses.** A demo file using it would typecheck green and fail in a real consumer's `node`. |
| **F-14** | **[NEW · caps r3 F-8]** `sideEffects`: value.js `false`, glass-ui `["*.css"]`. The JS graph is fully tree-shakable, so the root-barrel import is a *consistency* defect, not a shipped-bytes one. F-8 is permanently MINOR. |

---

## Verdict — **DEFECTIVE (BLOCKER)**

The seat's premise is correct. `MixResultDisplay.vue` consumes `<WatercolorDot>` — a
`@mkbabb/glass-ui@7.0.0` primitive — through **attributes that do not exist in the published
surface**. `WatercolorDot` declares `inheritAttrs: false` and manually re-forwards **only
`$attrs.class` and `$attrs.style`**; everything else is discarded. Here that kills `data-mix-target`,
the anchor this file's own docblock (`:14`) names as *"the anchor the canvas convergence lands on"*.
One component over, the same mechanism kills `tag="button"`, `aria-label`, `:disabled` and `@click`
on the add-colour slot — so `selectedColors` can never reach 2, `canMix` is permanently `false`, and
**`MixResultDisplay.vue` has never rendered in the shipped application.**

`vue-tsc` is green throughout, because unknown attributes on a Vue component are legal fallthrough.
The `.d.ts` trust boundary the tranche record cites as *the* dogfood proof is structurally blind to
this entire failure class: it certifies the typed **prop** surface and says nothing about the
**attribute** surface, where all the load-bearing plumbing (`data-*` hooks, listeners, `aria-*`,
host tag, children) actually lives.

r4's F-11 is the same disease one layer deeper and is what I add to the record: the component does
not merely pass attributes the primitive discards — it asserts a *visual law* over the primitive's
seeding behaviour **without having read what the primitive seeds on**. Same mechanism, different
surface: a contract asserted by the consumer rather than read from the producer.

**Strongest defect: F-1** (inherited, re-verified). **Strongest r4-original defect: F-11.**

---

## 1 · The import trace

Every import in `MixResultDisplay.vue:2-7`, traced to its home:

| line | specifier | home | verdict |
|---|---|---|---|
| 2 | `@lucide/vue` → `Copy, Check, Save, RotateCcw` | devDep icon set | OK (gh-pages build; icons are demo-only) |
| 3 | `@mkbabb/glass-ui/dock` → `DockControl, DockSeparator` | real subpath (`exports["./dock"]` ✓) | resolves; **dock vocabulary out of dock** — F-6 |
| 4 | `vue` → `computed, TransitionGroup` | peer | `TransitionGroup` dead — F-9 |
| 5 | `@mkbabb/glass-ui` → `useClipboard` | **root barrel** | published on `./dom` — F-8 (capped MINOR by F-14) |
| 6 | `@mkbabb/glass-ui/watercolor-dot` → `WatercolorDot` | real subpath ✓ | **consumed against a contract that does not exist** — F-1, F-11 |
| 7 | `import type { MixResult }` ← `./composables/useMixingState` | sibling composable | correct `import type`; wrong *direction* and the type itself is defective — F-5 |

**No wrong-direction topology crossing.** Nothing reaches into `shell/`, `platform/`, boot code, or
`src/`. Independently confirmed:

```
$ grep -rn 'from "@mkbabb/value.js"' demo/                 → (empty)   # no bare root specifier
$ grep -rn 'from "../../../src\|@src/' demo/               → (empty)   # no src reach-through
$ grep -rhno '@mkbabb/value.js[a-z/.-]*' demo/ | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
```

All five are real `exports` keys. **A real consumer could write every value.js import in this
component's transitive graph.** The subject's module edges are clean; its defects are *contract* and
*configuration* defects, not topology defects.

---

## 2 · F-11 · MAJOR **[r4-NEW]** — the "one silhouette" law is asserted over a primitive whose seeding contract was never read

### The claim the file makes

`MixResultDisplay.vue:9-18`:

> While the drops are in flight (`ghost`) the plate stands as the announced destination … On settle
> the ghost flips live and **the SAME seed fills in: the silhouette the pigment poured into is the
> silhouette the result wears.** The swap rides `vj-morph` (one surface, new content — the family
> law).

The mechanism the file uses to enforce it is a seed literal, spelled by hand three times:

```
:68   seed="mix-result"                                              ← ghost well
:83   seed="mix-result"                                              ← single-colour landed dot
:104  :seed="i === 0 ? 'mix-result' : `mix-result-${i}`"             ← palette landed dots
```

### What glass-ui actually seeds on

`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — the shipped 7.0.0 blob PRNG:

```js
function S(e, i = {}) {                                  // useWatercolorBlob
  let { animate:a=!1, cycleDuration:o=4e3, range:s=[20,80], seed:c="" } = i,
      d = n(r((typeof e == "function" ? e : () => e.value)() + c));
      //  ^mulberry32( ^hashString( COLOR + SEED ) )
  l.value = y(v(d, s[0], s[1]));                         // → the border-radius silhouette
  …
}
```

and for the wet edge, `y = i(() => r(t.color + t.seed) % 256)` — the `feTurbulence` seed, likewise
`color + seed`.

**The silhouette is a function of `(color, seed)`, not of `seed`.**

### Reproduction — pasted

Scratchpad `seed.test.ts` + `vitest.seed.config.ts`, mounting the real glass-ui primitive:

```
$ npx vitest run --config <scratchpad>/vitest.seed.config.ts
seed='mix-result', color=result.css      : 20.977150606922805% 27.9310439247638% 78.01286653615534% 43.92424934078008%
                                         / 40.78628639690578% 60.2543443441391% 60.02384949475527% 24.739338718354702%
seed='mix-result', color=var(--muted-fg) : 65.4106078390032% 58.38093521539122% 32.12905287742615% 70.63073758035898%
                                         / 30.561487269587815% 73.72246569488198% 33.73698253184557% 27.72718566004187%
SILHOUETTE EQUAL? false
hashString('oklab(0.62 0.11 0.03)mix-result')  = 4050021408
hashString('var(--muted-foreground)mix-result') = 1377652986
SAME color+seed EQUAL? true
 Test Files  1 passed (1)   Tests  2 passed (2)
```

Same seed. Eight different radii. The law does not travel with the seed.

### Why that matters here specifically

The ghost's colour and the landed dot's colour are computed by **two different expressions with
different fallbacks**:

```ts
// :36-40 — the ghost
const wellColor = computed(() =>
    result.type === "color"
        ? result.css ?? "var(--muted-foreground)"
        : result.colors?.[0]?.css ?? "var(--muted-foreground)",
);
```
```vue
:80   <WatercolorDot :color="result.css" … seed="mix-result" />        <!-- landed, single -->
:101  <WatercolorDot :color="color.css"  … :seed="i===0 ? 'mix-result' : …" />  <!-- landed, palette -->
```

They coincide only while both `??` branches stay unreached. The moment either fires — `result.css`
undefined (permitted by the optional-bag type, F-5) or `result.colors` empty (`demo/palettes/mix.ts:118,125`
return `[]` for an empty or zero-length mix) — the ghost wears one silhouette and the settled plate
another, and `vj-morph` cross-fades between two unrelated shapes. The stated family law breaks
**silently**, because nothing anywhere asserts it.

Note also the second, unwritten rule smuggled into `:104`: *slot 0 shares the ghost's seed*. The
same rule appears as prose at `:35-36` ("the pool lands on slot 0 — spatially true"). One invariant,
two encodings, one template ternary, zero owners.

**Severity note.** I label the *runtime reachability* of the divergence a **hypothesis** — I could
not drive `mixPalettes` to `[]` through the UI because the flow is dead (F-1). The **structural**
defect is proven outright: the enforcement mechanism the file names (the seed) is measurably
incapable of enforcing the law it names.

**Cure.** The law must be carried by **one value**, not by a coincidence between two:

```ts
// mix-result.ts — with F-5's true union, this is total; the fallbacks vanish
export const RESULT_SEED = "mix-result";
export const plateColor = (r: MixResult) => r.type === "color" ? r.css : r.colors[0].css;
```

Ghost and landed dot both read `plateColor(result)` and `RESULT_SEED`; slot-0's seed identity becomes
`i === 0 ? RESULT_SEED : \`${RESULT_SEED}-${i}\`` from the same constant. And the producer-side
correction belongs in the glass-ui BH relay: `WatercolorDot`'s `seed` prop is documented as *"Extra
seed string mixed into the shape + wet-edge PRNG for uniqueness"* (`WatercolorDot.vue.d.ts`), which
does not tell a consumer that **`color` is also in the seed** — i.e. that two dots of the same seed
and different colours are different shapes. Every consumer reaching for "same seed ⇒ same shape"
(this file, `MixSourceSelector.vue:168`) has read the doc and drawn the wrong conclusion. glass-ui
should either document the `(color, seed)` domain explicitly or expose a `shapeSeed` that excludes
colour, which is the property consumers actually want.

---

## 3 · F-12 / F-13 / F-14 **[r4-NEW]** — the published surface, measured

r3's F-3 established that `tsconfig.demo.json#paths` shadows `package.json#exports` at typecheck
time. It left the *runtime* half unstated, and left one of its "drift" rows under-diagnosed. Three
probes close both.

### F-12 — the runtime path is clean, and the artefacts are current

`vite.config.ts:37-50` does not hand-roll its alias table; it derives it from the exports map by
anchored regex, and says why:

> *"GENERATED (not hand-rolled) so the alias set can never drift from the exports map: add or rename
> a subpath in `package.json#exports` and the alias follows."*

And the artefacts those aliases point at are current, not stale:

```
$ ls dist/subpaths/
color.d.ts color.js  css.d.ts css.js  easing.d.ts easing.js  math.d.ts math.js
quantize.d.ts quantize.js  transform.d.ts transform.js  value.d.ts value.js     (built Jul 27 11:52)
$ find src -name "*.ts" -newer dist/subpaths/color.js | wc -l
       0
```

Zero source files are newer than the built alias target. **The bundled demo genuinely dogfoods the
published subpath artefacts.** This bounds F-3 to a typecheck-time defect — real, worth curing,
but not a claim that the shipped demo bypasses the public surface. Stating the bound matters: the
tranche record's "demo-dogfood keystone" claim is *true at runtime* and *false at typecheck*, and
those are different repairs.

### F-13 — the absent `"."` is deliberate, so the tsconfig row is an invention, not a drift

```
$ node --input-type=module -e "try{await import('@mkbabb/value.js')}catch(e){console.log(e.code)}"
ERR_PACKAGE_PATH_NOT_EXPORTED     ('No "exports" main defined')
$ node --input-type=module -e "try{await import('@mkbabb/value.js/package.json',{with:{type:'json'}})}catch(e){console.log(e.code)}"
ERR_PACKAGE_PATH_NOT_EXPORTED
$ node --input-type=module -e "const m=await import('@mkbabb/value.js/color'); console.log('OK', Object.keys(m).length)"
OK 23
$ grep -n 'from "@mkbabb/value' README.md
30: import { parseCssColor, serializeCssColor } from "@mkbabb/value.js/css";
52: import { convertColor, mixColors, oklch, toRgba8 } from "@mkbabb/value.js/color";
75: import { CubicBezier, easeOutExpo, steppedEase } from "@mkbabb/value.js/easing";
89: import { dominantColor, quantizePixels } from "@mkbabb/value.js/quantize";
```

The package is **intentionally subpath-only** and the README is consistent with it — four examples,
four subpaths, no bare root. So `tsconfig.demo.json`'s

```json
"@mkbabb/value.js": ["./dist/index.d.ts"],
```

is not a stale row that fell behind the map. It **manufactures a public entry point the package
deliberately refuses**, aimed at a file that does not exist (`ls dist/*.d.ts` → none). Any demo file
that wrote the bare specifier would typecheck green and blow up in a real consumer's `node` with
`ERR_PACKAGE_PATH_NOT_EXPORTED`. Today no demo file does (grep above → empty), so this is a **loaded
trap, not a live break** — which is exactly why deleting the block (r3's cure, which I endorse) is
the right move rather than repairing it.

*Secondary, worth one line to the producer:* `"./package.json"` is not exported either. Some
toolchains (older bundler resolvers, `publint`-style checks, some framework plugins) read a
dependency's `package.json` through the specifier. Adding `"./package.json": "./package.json"` is
the standard, zero-risk courtesy export. **Hypothesis, no reproduction** — nothing in this repo
currently needs it.

### F-14 — the tree-shaking bound on F-8

```
$ node -e "console.log(require('./package.json').sideEffects)"                              → false
$ node -e "console.log(JSON.stringify(require('./node_modules/@mkbabb/glass-ui/package.json').sideEffects))"
                                                                                            → ["*.css"]
```

Both packages declare their JS side-effect-free, so Rollup drops the unused barrel graph. My own
static closure measurement (`closure.mjs` over the dist ESM import graph) is therefore a **graph**
figure, not a shipped-bytes figure, and I publish it as such:

```
glass-ui.js       66 files  224193 bytes      ← root barrel, module graph
dom.js             8 files   12599 bytes      ← the declared home of useClipboard
dock.js           32 files  101223 bytes
watercolor-dot.js  6 files    9503 bytes
```

F-8 stands as a **consistency** defect — one file declaring three different depths against one
package, six lines apart, while a sibling (`GradientEasingEditor.vue:29`) already gets it right —
and is capped at MINOR permanently. r2's measured esbuild delta (1895 vs 1077 B) is the honest
shipped number and should be the one cited.

---

## 4 · Inherited findings — re-verified at this seat

Cures as stated by the prior runs; I add only receipts.

### F-1 · BLOCKER — the `WatercolorDot` contract fiction, and the unreachable feature

**The published prop surface** (`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) is exactly
`{ color; variant?; animate?; cycleDuration?; range?; seed? }`. No `tag`, no `as`, no `title`, no
`aria-label`, no `disabled`, no emits, **no slot**.

**The mechanism** (`dist/watercolor-dot.js`): `inheritAttrs: !1`; root tag hardcoded `"span"`;
`useAttrs()` read only for `.class` and `.style`; no `v-bind="$attrs"`; render children are the
`<svg>` filter host and the ghost-stroke span only; `pointerEvents: "none"` set inline.

**Direct-mount receipt** (scratchpad `probe.test.ts`, vitest+jsdom, subject component itself):

```
--- GHOST HTML ---
<div class="mix-plate … mix-plate--ghost"><span class="font-display …">Result</span>
  <transition-stub name="vj-morph" mode="out-in" …>
    <div class="flex items-center gap-3">
      <span aria-hidden="true" class="shrink-0 w-14 h-14 watercolor-swatch"
            data-testid="watercolor-swatch" data-variant="ghost" style="border-radius: …">…</span>
    </div></transition-stub></div>
data-mix-target present: false
querySelector([data-mix-target]): 0
```
```
--- PALETTE HTML (excerpt) ---
title= count: 3                 ← all three are the DockControl buttons
swatch tagNames: SPAN,SPAN      ← tag="div" ignored; :title="color.css" absent
```

Note precisely what survived — `class` (`shrink-0 w-14 h-14`) — and what died: `data-mix-target`,
`aria-hidden`, `tag`, `:title`.

**Live receipt** (WebKit, real `:9000`, desktop 1280×900):

```
{ "watercolorSwatchCount": 4,
  "firstDot": { "tagName": "SPAN", "pointerEvents": "none", "childTags": ["svg"] },
  "addSlotByAriaLabel": 0,     ← aria-label DROPPED
  "addSlotClass": 1,           ← class SURVIVED — the class/style-only policy, proven in situ
  "mixTargetCount": 0, "titleAttrDots": 0 }
```

**Downstream** — `MixAnimationCanvas/composables/mixStage.ts:121-124`:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl ? layoutCenter(targetEl, root)
                        : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

`targetEl` is permanently `null`; the convergence has always landed on the hardcoded guess. That
`?:` is a masking fallback (edict 2) that absorbed a broken contract for an entire tranche — without
it the Glass-7 adoption would have thrown on day one.

**Blast radius** — parsed census of every `<WatercolorDot>` in `demo/**/*.vue`:

```
total call sites: 23   sites passing unsupported props/attrs/children: 22
… of which 8 pass tag="button" together with @click and aria-label
  (MixSourceSelector:164,211 · GenerateControls:199 · SwatchHoverMenu:14,29 · CurrentPaletteEditor:95 …)
```

Under `inheritAttrs:false` with no `$attrs` bind, `onClick` lives in `$attrs` and is never attached;
the root additionally sets `pointer-events:none`. Those eight are inert spans with no role, no name,
no handler, and no children.

**The gate** — pasted, at HEAD `c654824e`:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
  1) [smoke] › mix flow: convergence lands at the result plate within budget
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', …).getByRole('button', { name: 'Add current color to the mix' })
    Error: element(s) not found
  1 failed
```

**Visual corroboration** — `shots/safari-desktop-light/mix.png` (read): the "Selected" row shows the
dashed ghost silhouette **with no `+` glyph inside it** (the dropped child) and the `Mix` button
rendered disabled. There is no path from that screen to a mix.

**Why the migration missed it.** `git show f2c8f565` ("adopt @mkbabb/glass-ui 7.0.0 …") migrated the
dock family, the clipboard, five removed subpaths and more — careful work. It missed `WatercolorDot`
because unknown attributes on a Vue component are legal, so `vue-tsc -p tsconfig.demo.json` reports
nothing. **Types are structurally incapable of verifying an `inheritAttrs:false` component's
attribute and slot surface.** Only a render can.

### F-6 · MAJOR — dock-scoped primitive rendered outside the dock

`DockControl` docblock: *"the HIT CELL stays the full `--dock-control-size` (**≥44px on coarse** via
the density clamp)"*. Those tokens are declared only on `.glass-dock[data-size=…]`
(`dist/components/dock/styles/density.css`), and the coarse floor excludes the variant this file
uses (`controls/touch-floor.css`):

```css
@media (pointer: coarse) {
  .dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *)) {
    min-block-size: var(--dock-touch-target, 2.75rem); min-inline-size: var(--dock-touch-target, 2.75rem); }}
```

```
$ for t in dock-compact-control-size dock-compact-control-min-width dock-compact-control-padding; do
    echo "--$t declared in glass-ui dist: $(grep -rho -- "--$t:" node_modules/@mkbabb/glass-ui/dist | wc -l)"; done
--dock-compact-control-size declared in glass-ui dist: 0
--dock-compact-control-min-width declared in glass-ui dist: 0
--dock-compact-control-padding declared in glass-ui dist: 0
```

Measured live at 390×844 with `hasTouch`/`isMobile`, injecting this component's exact emitted markup
into the running page so the app's real cascade applies, then removing it:

```
{ "coarse": true, "insideGlassDock": false,
  "tokens": { "--dock-control-size": "(unset)", "--dock-compact-control-size": "(unset)",
              "--dock-compact-control-padding": "(unset)", "--dock-touch-target": "2.75rem" },
  "buttons": [ {"title":"Copy color","w":28,"h":28,"minW":"0px","minH":"auto","padding":"4px"},
               {"title":"Save to palettes","w":28,"h":28,…}, {"title":"Reset","w":28,"h":28,…} ] }
```

**28 × 28 px** against a 44 px floor the system computes (`--dock-touch-target` resolves) and then
declines to apply. Five workbench files leak the dock family this way (`ExtractControls`,
`ExtractWorkbench`, `ImageEyedropper`, `GradientVisualizer`, and this file); the five `shell/dock/*`
users are legitimate. The cure is a glass-ui BH relay — an icon seat on `@mkbabb/glass-ui/button`
(`<Button shape="icon" compact>`, reusing the existing component-type name per edict 4) with an
unconditional touch floor and `:root`-scoped tokens, the dock keeping density as a scoped
refinement. Not a `demo/ui/` patch.

### F-4 · MAJOR — one payload, two clipboard implementations

`MixResultDisplay.vue:42-47` (`useClipboard`, confirming) and `MixPane.vue:49-55` (`writeClipboard`,
silent) compute a **character-identical** serialization expression and copy the same value. Both are
live:

```
$ grep -rn "copyResult" demo/
demo/workbenches/mix/MixPane.vue:49:async function copyResult() {
demo/workbenches/mix/MixPane.vue:57:defineExpose({ clearSelection, startMix, copyResult });
demo/shell/usePaneRouter.ts:222:  { key:"copy", …, handler: () => paneRefs.mix.value?.copyResult?.() },
```

Dock copy → no feedback; plate copy → 1.5 s check. Same bytes, two owners, two semantics. And both
discard `useClipboard`'s typed `{ ok:false, reason }` channel.

### F-5 · MAJOR — `MixResult` is an optional bag

`useMixingState.ts:32-36` declares `{ type: "color"|"palette"; css?: string; colors?: PaletteColor[] }`
— a discriminant with two independently-optional payloads permits `{type:"color"}` with no `css`.
The producer never emits that (`:90`, `:97` always populate the matching field), so every
optionality is a type lie paid for in `??`: `:38`, `:39`, `:44`, `:45` here, plus template
re-narrowings at `:78` and `:91` and again at `MixPane.vue:41,44`. Owner edict 2 names masking
fallbacks explicitly.

Related and additive to F-11: it is precisely these two `??` fallbacks at `:38-39` that make the
ghost's colour capable of diverging from the landed colour. **Curing F-5 cures half of F-11 for
free** — under a true union `plateColor` is total and no fallback exists to diverge into.

### F-8 / F-9 / F-10 · MINOR–INFO

`useClipboard` from the root barrel while the same file uses two subpaths (F-8, capped by F-14);
`TransitionGroup` imported at `:4` while `<Transition>` at `:60` is not, proving the import
unnecessary (F-9); 19 one-line `demo/ui/*` pass-through barrels over the glass-ui root, of which
`MixPane.vue:3` uses one (`../../ui/card`) while its sibling `MixResultDisplay.vue` imports glass-ui
directly — two conventions inside one feature folder (F-10).

Also inherited and not re-argued: F-2 (the demo import-boundary eslint regime globs a deleted tree),
F-3 (bounded by F-12/F-13 above), F-6-gradient (the fourth hand-rolled `linear-gradient` strip;
`MixResultDisplay.vue:109-116` is one of them, and the ≤1-colour case emits invalid CSS —
`linear-gradient` requires two stops), F-7 (`mixColorSequence` — pure weighted N-ary colour maths —
homed in `demo/palettes/mix.ts` rather than behind `@mkbabb/value.js/color`, forcing
`as unknown as` at `mix.ts:37`).

---

## 5 · Negative results — hypotheses tested and cleared at r4

Recorded so the next seat does not re-spend the probes. (r3's seven clearances stand; these are
additional or independently re-confirmed.)

1. **The `dist/` alias target is not stale.** `find src -name "*.ts" -newer dist/subpaths/color.js`
   → **0**. The demo is not dogfooding an old build. (F-12)
2. **The missing `"."` export is deliberate and documented, not an omission.** README uses subpaths
   exclusively; the package publishes no root entry by design. (F-13)
3. **Tree-shaking is not disabled.** `sideEffects: false` / `["*.css"]`. The root-barrel import
   costs graph complexity, not bytes. (F-14)
4. **Every glass-ui and value.js *specifier* in this component's graph is real.** `./dock`,
   `./watercolor-dot`, `.`, `./color`, `./css` all present in the respective `exports` maps. F-1 is
   a **prop/attribute**-surface fiction, never a **module**-surface one.
5. **`verbatimModuleSyntax` satisfied.** `:7` is the only type-only import and is correctly
   `import type`.
6. **Vue 3.5 idiom correct.** `const { result, ghost = false } = defineProps<…>()` (`:20-23`) is
   reactive props destructure with a default — current idiom, not `withDefaults`. `computed` reads
   of the destructured `result` compile to `__props.result` and stay reactive.
7. **Scoped styling is legitimate; no animation was deleted.** `.mix-plate` / `.mix-plate--ghost`
   (`:152-157`) are component-scoped *presence* on `--duration-fast` / `--ease-standard`; `bg-well`
   is a real demo token (`demo/styles/utils.css:42,101-105`). Edict 6 satisfied.
8. **`data-mix-source` is NOT affected by F-1.** It sits on real elements
   (`MixSourceSelector.vue:131` chip div, `:252` palette-card button), not on a `WatercolorDot`. My
   live `mixSourceCount: 0` reading reflects an empty selection, not a dropped attribute. Do not
   file it.

---

## 6 · Commands run at r4 (reproducible)

```
grep -rn 'from "@mkbabb/value.js"' demo/                                   → (empty)
grep -rn 'from "../../../src|@src/' demo/                                  → (empty)
grep -rhno '@mkbabb/value.js[a-z/.-]*' demo/ | sort | uniq -c | sort -rn   → 5 subpaths, all exported
python3 <census>                                                           → 22 of 23 WatercolorDot sites drift
node -e "…glass-ui exports…"                                               → ./dock ./watercolor-dot ./dom ./button present
grep -rho -- "--dock-compact-control-*:" node_modules/@mkbabb/glass-ui/dist → 0 declarations (×3 tokens)
node <scratchpad>/closure.mjs                                              → barrel 66/224193 vs dom 8/12599 (graph, not bytes)
node <scratchpad>/probe3.mjs   (webkit 1280×900, live :9000)               → mixTargetCount 0; addSlotByAriaLabel 0; addSlotClass 1
node <scratchpad>/probe5.mjs   (webkit 390×844 coarse, live :9000)         → 28×28 px controls; --dock-control-size (unset)
npx vitest run --config <scratchpad>/vitest.probe.config.ts                → data-mix-target present: false; title count 3; SPAN,SPAN
npx vitest run --config <scratchpad>/vitest.seed.config.ts                 → F-11: SILHOUETTE EQUAL? false
npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke            → 1 failed (RED)
find src -name "*.ts" -newer dist/subpaths/color.js | wc -l                → 0
node --input-type=module -e "import('@mkbabb/value.js')"                   → ERR_PACKAGE_PATH_NOT_EXPORTED
node -e "…sideEffects…"                                                    → false / ["*.css"]
Read shots/safari-desktop-light/mix.png                                    → plate absent; ghost slot has no + glyph
```

---

## 7 · Cure ledger (full, r1–r4 consolidated)

| id | sev | defect | cure | owner |
|---|---|---|---|---|
| **F-1** | **BLOCKER** | `WatercolorDot` attribute-surface fiction — `tag`/`aria-label`/`title`/`disabled`/`@click`/children/`data-mix-target` all silently dropped; the mix colours mode is inert; **this component has never rendered** | glass-ui: `as`/`asChild` + drop `inheritAttrs:false` (BH relay). demo: delete 21 `tag=`, move every semantic/handler/identifier onto a real wrapper element the demo owns; replace the `[data-mix-target]` DOM-string contract with a typed ref threaded from `MixPane`; delete the `mixStage.ts:123` masking fallback | glass-ui + demo (19 files) |
| **F-11** | **MAJOR** **[r4]** | the "one silhouette" law is enforced by a seed literal, but glass-ui seeds on `hashString(color + seed)` — proven: same seed, two colours, two shapes | one `RESULT_SEED` constant + one `plateColor(result)` read by both branches (total once F-5 lands); glass-ui: document the `(color, seed)` seeding domain or expose a colour-independent `shapeSeed` | demo + glass-ui BH |
| **F-6** | MAJOR | dock-scoped primitive outside `.glass-dock`; 3 tokens undeclared, coarse floor excluded by selector; **28×28 px** vs a 44 px promise | glass-ui: icon seat on `./button` with unconditional floor, `:root` tokens, dock density as scoped refinement; demo: 5 workbenches stop importing `/dock` | glass-ui BH + demo (5 files) |
| **F-4** | MAJOR | `MixResult`→clipboard serializer duplicated parent/child on two clipboard mechanisms; both discard `{ok:false,reason}` | one serializer on the model; the plate owns `useClipboard` and emits; `MixPane` forwards; `copyResult` deleted | `mix/` + `usePaneRouter.ts` |
| **F-5** | MAJOR | `MixResult` is an optional bag, not a discriminated union → 10 masking fallbacks across 3 files (and it is what makes F-11 divergence reachable) | true union in `mix/mix-result.ts`; all ten delete themselves | `mix/mix-result.ts` |
| **F-2** | MAJOR | 100% of demo import-boundary eslint rules glob the deleted `demo/@` tree | re-aim globs at the live tree; CI-assert every glob matches ≥1 file | `eslint.config.js` |
| **F-3** | MAJOR (typecheck-only, per **F-12**) | `tsconfig.demo.json#paths` shadows `package.json#exports`; and per **F-13** its bare-root row *invents* an entry point the package deliberately refuses | **delete** the `@mkbabb/value.js*` `paths` block; self-reference already resolves all seven | `tsconfig.demo.json` |
| **F-6b** | MAJOR | 4th hand-rolled `palette → linear-gradient` strip (`:109-116`); ≤1-colour case emits invalid CSS | widen `PreviewRamp`, mount at all four sites, delete the inline builders | `color-chips/` + 3 workbenches |
| **F-7** | MINOR | weighted N-ary `mixColorSequence` homed in `demo/palettes/`, forcing `as unknown as` — *hypothesis* | promote behind `@mkbabb/value.js/color`, typed on `SpaceId` | `src/color/` |
| **F-8** | MINOR (capped by **F-14**) | root-barrel `@mkbabb/glass-ui` for `useClipboard` while the same file uses two subpaths | `@mkbabb/glass-ui/dom` here + 9 siblings | demo (10 files) |
| **F-9** | MINOR | dead `TransitionGroup` import | delete `:4`'s `TransitionGroup` | `MixResultDisplay.vue:4` |
| **F-10** | INFO | 19 pass-through `demo/ui/*` barrels; two conventions inside `mix/` | delete the barrels; import glass-ui subpaths directly | `demo/ui/` |
| **F-13b** | INFO | `"./package.json"` not exported — *hypothesis, no reproduction* | add `"./package.json": "./package.json"` | `package.json` |
| **F-15** | INFO | the component appears in **0 of 60** visual captures; the `/#/mix` a11y rows belong to the shell and the add slot | a `STATES.json` entry driving the flow, once F-1 is cured | visual audit |

---

## 8 · The lattice, restated

r2's shape is right and r3's enforcement layer is right; I state only the two edges r4 changes.

```
demo/workbenches/mix/
├── mix-result.ts        TYPES + INVARIANTS. The true union (F-5) · MixSwatch ·
│                        AnimationPhase · RESULT_SEED · plateColor()  ←── F-11 lands here
│                        Depends on nothing. Everything below depends on it.
├── useMixingState.ts    the machine: selection · config · phase · two edges.
│                        Exposes no types of its own (F-5 cures the direction, §1 line 7).
├── MixPane.vue          composition root. Owns the anchor ref and hands it to the
│                        animation as Ref<HTMLElement|null> — no DOM-string contract (F-1).
│                        Owns no serialization and no second clipboard (F-4).
├── MixResultDisplay.vue presentational leaf. Props: MixResult, ghost. Emits: save, reset, copy.
│                        Exposes the anchor element ref.
└── MixAnimationCanvas/  the one clock. Receives the anchor ref as an argument.
                         No querySelector, no masking fallback.
```

One rule: **a concept has exactly one home, and dependencies point down the list.** The test that it
worked is that the component gets *smaller*: after F-1/F-4/F-5/F-11 its script block is
`defineProps`, `defineEmits`, `useClipboard`, one `plateColor` computed and one `onCopy` — no `??`,
no duplicated serializer, no attribute contract, no magic string.

---

*No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. All probes are read-only; `probe5.mjs` injects
markup into a live page and removes it before returning. All scratch artefacts live outside the
repo. Prior runs preserved at `challenge-L-library.r3-prior.md`, `.r2-prior.md`, `.prior-run.md`.*
