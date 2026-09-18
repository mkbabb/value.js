# CHALLENGE-L — library structure · `demo/workbenches/extract/ExtractControls.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
seat. The seat was spawned with an explicit Opus 5 declaration and I observe that declaration to
hold: declared, not inherited.

---

## Subject + pin verification

```
$ git rev-parse HEAD
e9cf0aa4037ccce45e83ff34d800bda11ba7f635
$ git branch --show-current
tranche-u
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28
$ wc -l demo/workbenches/extract/ExtractControls.vue
     151
```

**Pin VERIFIED** — `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` matches the
Glass BJ W4 hold exactly. Consumer edits FORBIDDEN until Glass 8. Nothing in this report was
applied to any source file.

**Prompt/HEAD discrepancy, recorded:** the seat brief names HEAD `c654824e`. Actual HEAD is
`e9cf0aa4`. `c654824e` is the tip *two commits back* in the session log. The pinned file is
byte-identical at both, so no finding is affected — but the brief's SHA is stale and the next
seat should not trust it.

**Revision note.** This is **r5**.

- **r1** (git-untracked, HEAD `32b4040e`): findings L-1 … L-10.
- **r2** (HEAD `e9cf0aa4`): re-verified r1's live findings, **falsified r1's L-5 premise** by direct
  accessible-name measurement, sharpened L-2's cure by a transposition experiment, and added
  L-11 … L-15.
- **r3** (HEAD `e39da983`): re-verified the pin and r2's three load-bearing measurements,
  and adds **four findings r2 did not reach — §8, L-16 … L-19.** L-16 is a *contract* defect in the
  demo's own certification API that r2 looked directly at and blessed; L-17 falsifies the premise
  of r2's own L-12 cure. Nothing from r1 or r2 is dropped, corrected, or downgraded.
- **r4** (HEAD `06377848`, this pass): re-verified the pin, then widened the aperture from the
  *file*'s boundaries to the **package and enforcement** boundaries r1–r3 did not reach. Adds
  **§12, L-20 … L-25.** L-20 is the report's **first BLOCKER above the component**: the published
  library declares a runtime dependency on the design system that peer-depends on it, closing a
  package-graph cycle for code `src/` never imports. L-21 shows the demo's declared module lattice
  is enforced by **zero** lint rules. Nothing from r1–r3 is dropped, corrected, or downgraded;
  r4 confirms r3's L-17 and L-12 measurements independently and **extends** L-2 with the measured
  divergence between its two copies (L-22).
- **r5** (HEAD `d19da6d3`, this pass): an **independent blind re-derivation** — the register was
  read only after the pass was complete, so the overlap is evidence of convergence, not of copying.
  r5 independently reproduced L-21, L-13, L-1, L-6, L-7, L-2/L-19 and r2's L-12 dead-degenerate,
  and **honours r2's L-5 correction** (the three `title`-only controls are named per accname; the
  finding is a convention split, not a naming failure — see §16 note). It adds **§16**: one finding
  r1–r4 did not reach (**L-26**, zero prior mentions of `text-micro` or the measured split), and —
  load-bearing — **a correction to r1's L-1 cure, which is inside the wave and prescribes the wrong
  target**. Nothing from r1–r4 is dropped or downgraded; one *cure* is corrected.

r3 HEAD note: `e9cf0aa4` (r2's HEAD) is a real commit but is no longer the tip; HEAD is now
`e39da983`. `git diff e9cf0aa4 e39da983 -- demo/workbenches/extract/ExtractControls.vue` is empty
and the subject hash is unchanged, so every r2 finding stands at r3's HEAD without re-derivation.

r4 HEAD note: HEAD has advanced again, to `06377848`
(`docs(V·mega): workbenches 5th deploy harvested…`). The subject hash is **unchanged**
(`71aa0a65…`), so every r1–r3 finding stands at r4's HEAD without re-derivation. The seat brief's
`c654824e` remains stale — third consecutive revision to record this.

---

## 0. Verdict

**DEFECTIVE.**

The component's own 151 lines are disciplined — reactive props destructure, no `any`, no dead
imports, `verbatimModuleSyntax` clean, no library deep-path. The defects are all *boundary*
defects: this file is a faithful consumer of a lattice that puts three concepts in the wrong
home and hands it two producer primitives whose contracts do not hold where it seats them.

The single strongest **structural** defect is **L-11**: both `<DockSeparator />` instances render at
**height 0 and paint nothing**, because `--dock-separator-height` is authored only inside
`.glass-dock` and this component is on a `.card` plate. Two DOM nodes and a designed visual
affordance, dead in every matrix of the visual audit — the literal signature of a chrome primitive
used outside its chrome.

**r3 addendum to the verdict.** The strongest **contract** defect is **L-16** (§8): the demo's own
`certifyAccentInk(css, surfaceL, floor)` silently adds `CERTIFY_HEADROOM = 1.25` to the parameter
named `floor`, so this component's documented "WCAG 1.4.11 graphics floor" of **3** ships as a
**4.25:1** walk. Measured against this component's real rung, that drives the certified track ink
**ΔL −0.079 … −0.084 further from the user's pick** and strips up to **−14.6% chroma**. r2's L-6
inspected `CERTIFY_HEADROOM` and ruled it legitimate product policy — correct about the *constant*,
but it never checked *what the constant is added to*. It is added to the caller's floor, which makes
the parameter's name false at every call site. That is the one defect here that damages the
delivered design on every colour the user picks.

---

## 1. Every import, traced to its home

| # | line | specifier | resolves to | verdict |
|---|---|---|---|---|
| 1 | 96 | `vue` | `node_modules/vue` | OK |
| 2 | 97 | `@lucide/vue` | published pkg | OK |
| 3 | 98 | `@mkbabb/glass-ui/dock` | glass-ui published subpath | **boundary — L-11** |
| 4 | 99 | `../../ui/slider` | `demo/ui/slider/index.ts` → `export { Slider } from "@mkbabb/glass-ui"` | **alias shim — L-1** |
| 5 | 100 | `../../color-session/useContrastSafeColor` | demo session kernel | **wrong home — L-6/L-13** |
| 6 | 101 | `../../color-session/ink` | demo session kernel | **wrong home + dup — L-6** |

Imports 3 and 4 are **the same package, three lines apart, by two different routes**. That is
the whole L-axis story in miniature.

### The library-surface question, answered

`ExtractControls.vue` imports **nothing** from `@mkbabb/value.js` directly. Its transitive edge is
`ink.ts:1-13` → `@mkbabb/value.js/color` + `@mkbabb/value.js/css`. Both are real published
subpaths. Resolution proven against the published `exports` map, not the working tree:

```
$ node --input-type=module -e "for (const s of ['@mkbabb/value.js','@mkbabb/value.js/css','@mkbabb/value.js/value','@mkbabb/value.js/parsing','@mkbabb/value.js/units','@mkbabb/value.js/color']) { try { console.log('OK  ', s, '->', import.meta.resolve(s).replace('file:///Users/mkbabb/Programming/value.js/','')); } catch (e) { console.log('FAIL', s, '->', e.code); } }"
FAIL @mkbabb/value.js     -> ERR_PACKAGE_PATH_NOT_EXPORTED
OK   @mkbabb/value.js/css -> dist/subpaths/css.js
OK   @mkbabb/value.js/value -> dist/subpaths/value.js
FAIL @mkbabb/value.js/parsing -> ERR_PACKAGE_PATH_NOT_EXPORTED
FAIL @mkbabb/value.js/units   -> ERR_PACKAGE_PATH_NOT_EXPORTED
OK   @mkbabb/value.js/color -> dist/subpaths/color.js
```

**A real consumer could write every specifier in this component's transitive closure.** No deep
path, no `@src/*`, no `../../src`:

```
$ grep -rn 'from "[^"]*\.\./src/\|from "@/src\|value\.js/src' demo --include='*.ts' --include='*.vue'
(no output)
$ grep -rhno '@mkbabb/value\.js[^"'"'"']*' demo --include='*.ts' --include='*.vue' | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
```

Five specifiers, all in the exports map, zero deep paths. The T.W1 demo-dogfood keystone holds
**at runtime**. It does not hold at the *type* level — see L-8.

---

## 2. Positive proof — the negatives that hold

These were hunted and are **clean**; recording them so the next seat does not re-spend on them.

| claim | proof |
|---|---|
| No library deep-path import | `grep` above, zero hits |
| `verbatimModuleSyntax` clean | all six imports at 96-101 are runtime values; zero type-only imports needed, zero present |
| Vue 3.5 idioms | reactive props destructure at `:103-111`; no template refs needed so `useTemplateRef` correctly absent; no `defineModel` so no stale-read hazard |
| No local color math | `trackInk` (`:123-125`) delegates entirely to `safeCss`; no norm/denorm arithmetic in the file |
| `variant="spectrum"` is a real producer variant | `glass-ui.css`: `[data-variant=spectrum] .slider-track{...}` — a published variant, not an invented one |
| `--slider-track-bg` is a real producer seam | `glass-ui.css`: `.slider-track{background:var(--slider-track-bg,var(--muted-medium))}` |
| `--btn-hover-color` is a real producer token and IS loaded | `dist/components/dock/styles/controls/icon-button.css`: `&:hover:not(:disabled){ color: var(--btn-hover-color, var(--foreground)) }`; loaded via `demo/styles/foundation.css:56 @import "@mkbabb/glass-ui/styles"` |
| No god module | 151 lines, 6 imports, one `computed`; `useExtractSession.ts` is 223 lines with one cohesive responsibility |
| Route is clean on the hard visual gates | `REPORT.md:122` — `/#/extract`: `overflowX 0`, `main 1`, `pageErr 0`, `consoleErr 0`, `blankOrNearBlank` absent, in all four matrices |
| **Buttons are NOT nameless** | see **Correction to r1 L-5** below — measured accnames are `"Upload image"`, `"Open camera"`, `"Reset"` |

---

## 3. Findings

### L-11 · BLOCKER — both `<DockSeparator />` render at height 0 and paint nothing; a dock-scoped primitive on a card plate

`ExtractControls.vue:57` and `:81` place `<DockSeparator />` in a `flex items-center` row seated
on the extract pane's resting `.card`.

Producer geometry, from the shipped stylesheet:

```css
/* node_modules/@mkbabb/glass-ui/dist/…  — the separator */
.dock-separator { width: 1px; height: var(--dock-separator-height); margin: 0 0.375rem;
                  background: var(--surface-tint-15); }
/* …and the ONLY authoring site of that variable */
.glass-dock { --dock-separator-height: calc(var(--dock-h, var(--size-icon-btn)) * 0.5); … }
```

`--dock-separator-height` is authored **only inside `.glass-dock`**. On a card plate the custom
property is unset, so `height: var(--dock-separator-height)` is *invalid at computed-value time*;
`height` is not inherited, so it falls to its initial value `auto`; the div is empty and the row
is `align-items: center`, so `auto` computes to **0**.

Measured live, WebKit 1440×900, `/#/extract`, the controls-row children in DOM order:

```
{ "tag":"button","cls":"dock-icon-button …","w":40,"h":40 }          ← Upload
{ "tag":"button","cls":"dock-icon-button …","w":40,"h":40 }          ← Camera
{ "tag":"div",  "cls":"dock-separator","w":1,"h":0,
  "bg":"color(srgb 0.11 0.098 0.09 / 0.15)" }                        ← SEPARATOR — h = 0
{ "tag":"div",  "cls":"flex items-center gap-1.5 flex-1 min-w-0","w":276,"h":24 }  ← kC
{ "tag":"div",  "cls":"dock-separator","w":1,"h":0, … }              ← SEPARATOR — h = 0
{ "tag":"button","cls":"dock-icon-button …","w":40,"h":40,"opacity":"0.5" }        ← Reset
```

Corroborated by the visual audit's own capture — `shots/safari-desktop-light/extract.png`, the
controls row: upload glyph, camera glyph, `kC`, crimson track, `0.5`, reset glyph. **No divider
marks anywhere in the row.** The component asks for two group boundaries and gets none, in every
matrix.

**Mechanism.** Wrong direction of dependency. `DockControl`/`DockSeparator` are *shell chrome*
primitives whose contract is `.glass-dock`-scoped. A **feature** control bar imported them for
their look and inherited a geometry contract that its host scope does not satisfy. `DockControl`
survives the trip (its sizing token has a fallback: `var(--dock-control-size, var(--size-icon-btn))`
→ measured 40×40); `DockSeparator` does not (no fallback). The demo is one fallback away from a
silent no-op and has no way to know.

**Cure — architectural, not a patch.** A plate-seated control bar must not speak dock. Two moves,
either of which fully closes it:

1. **Producer (preferred, Glass 8):** give `DockSeparator`'s height a defined fallback —
   `height: var(--dock-separator-height, 1.5rem)` — so the primitive is *self-contained*, which
   is what "primitive" means. Same for any other `--dock-*` read with no fallback. One-line, cannot
   regress inside the dock.
2. **Structural:** glass-ui already ships `Separator` (`demo/ui/separator/index.ts` re-exports it).
   The plate-seated bar should use the **plain** `Separator`, and `DockSeparator` should be
   reserved for `.glass-dock` descendants. That is the correct name-reuse (edict 4: reuse existing
   component-type names) and needs no producer change.

Both are blocked on the consumer pin for the demo-side half; move 1 is pure producer and is the
Glass 8 ask.

---

### L-12 · MAJOR — the hand-rolled k-rail is provably redundant; the producer seam already renders it, at identical geometry

r1's L-2 correctly identified two implementations of "gradient rides the track". r1 then justified
the contrived one: *"Path B exists to buy two things Path A can't express today: a background
colour beneath the gradient and an inset ring."* **That justification is false, and I falsified it
by transposition.**

`--slider-track-bg` is substituted into a `background:` **shorthand**, not `background-color`:

```css
[data-variant=spectrum] .slider-track[data-v-4f4cab01]{
  height:calc(var(--slider-thumb-size,1rem) * 1.5);
  background:var(--slider-track-bg,var(--secondary))
}
.slider-track[data-v-4f4cab01]{ border-radius:var(--radius-pill); overflow:hidden; … }
```

A `background` shorthand takes **layered** values, so `linear-gradient(…), <color>` is exactly
"gradient over a colour" — and the demo *already does this elsewhere*:
`demo/picker/controls/ComponentSliders/ComponentSliders.vue:197-199` feeds
`` `${ramp}, var(--alpha-checker)` `` through the same seam.

Transposition experiment, run live on `/#/extract` (WebKit 1440×900). Before: read the producer
track's real geometry and the demo rail's. Then push a gradient through the producer seam and
re-measure:

```
=== rail-div redundancy proof ===
{
 "before": { "trackH": 24, "trackBg": "none", "trackRadius": "9999px",
             "trackOverflow": "hidden", "railH": 24 },
 "after":  { "trackH": 24,
             "trackBg": "linear-gradient(to right, rgb(225, 29, 72) 0%, rgb(245, 158, 11) 50%, rgb(14, 165, 233) 100%)",
             "rendersGradient": true }
}
```

Point for point, the demo rail (`ExtractControls.vue:19-23`) reimplements what the producer track
already is:

| demo rail (`:21`) | producer `.slider-track` | equal? |
|---|---|---|
| `h-6` = 24px | `calc(var(--slider-thumb-size,1rem) * 1.5)` = 24px (token measured live = `1rem`) | **yes** |
| `rounded-full` | `border-radius: var(--radius-pill)` → computed `9999px` | **yes** |
| `overflow-hidden` | `overflow: hidden` | **yes** |
| `background: gradient` | `background: var(--slider-track-bg, …)` | **yes** |
| `backgroundColor: trackInk` | second background layer, `linear-gradient(…), <color>` | **yes** |
| `boxShadow: inset 0 0 0 1.5px trackInk` | not expressible today — **the only real gap** | no |

So the rail exists to buy **one** thing: an inset ring. To get it, the component blanks the real
track (`--slider-track-bg: 'transparent'`, `:32`), hand-matches its 24px/9999px/hidden geometry on
a sibling, and floats the slider over the copy. One extra DOM node, one extra stacking context,
and a geometry contract duplicated by hand in Tailwind classes — for one `box-shadow`.

The redundancy also produced a **dead code path** in the composable. `useExtractSession.ts:103`
returns `"var(--muted)"` as the pre-image degenerate; `ExtractControls.vue:22` then writes
`background` **before** `backgroundColor`, so the degenerate is unconditionally overwritten.
Measured pre-image inline style attribute:

```
"inlineStyleAttr": "background-image: ; background-position-x: ; … ;
                    background-color: oklch(0.545141 0.218024 9.834023);
                    box-shadow: oklch(0.545141 0.218024 9.834023) 0px 0px 0px 1.5px inset;",
"computedBackgroundImage": "none"
```

Every `background-*` longhand blank, `background-color` = `trackInk`. `useExtractSession.ts:103`
is unreachable-in-effect: a residue of the pre-T-44a design that the cure never swept.

**Cure.** Producer: add `--slider-track-ring` to the spectrum track
(`box-shadow: inset 0 0 0 var(--slider-track-ring-w, 0) var(--slider-track-ring, transparent)`).
Consumer then collapses to a single element and the whole rail div, the `transparent` blanking,
and the dead `"var(--muted)"` degenerate all die together:

```html
<Slider variant="spectrum" aria-label="Number of colors"
        :style="{ '--slider-track-bg': gradient ?? trackInk,
                  '--slider-track-ring': trackInk, '--slider-track-ring-w': '1.5px' }" … />
```

That is strictly smaller than r1's proposed `trackFill`/`trackRing` prop pair: one token, no new
props, and it deletes the second copy in `GenerateControls.vue:292-307` at the same time.

---

### L-13 · MAJOR — `.plate-ink` is copy-pasted verbatim into five scoped stylesheets; the demo has no home for a design token

```
$ grep -rn "^\.plate-ink" demo -A2 --include='*.vue' --include='*.css'
demo/workbenches/extract/ExtractControls.vue:148:.plate-ink {
demo/workbenches/extract/ExtractControls.vue-149-    color: var(--ink-muted, var(--muted-foreground));
demo/workbenches/extract/ExtractWorkbench.vue:290:.plate-ink {
demo/workbenches/extract/ExtractWorkbench.vue-291-    color: var(--ink-muted, var(--muted-foreground));
demo/workbenches/extract/ImageDropZone.vue:109:.plate-ink {
demo/workbenches/extract/ImageDropZone.vue-110-    color: var(--ink-muted, var(--muted-foreground));
demo/shared/ui/EmptyState.vue:102:.plate-ink {
demo/shared/ui/EmptyState.vue-103-    color: var(--ink-muted, var(--muted-foreground));
demo/color-picker/ErrorBoundary.vue:104:.plate-ink {
demo/color-picker/ErrorBoundary.vue-105-    color: var(--ink-muted, var(--muted-foreground));
```

Five files, byte-identical declaration, five scoped copies. Three of them are in the *same
directory* — `ExtractControls`, `ExtractWorkbench`, `ImageDropZone` each re-declare it because Vue
scoped CSS cannot cross a component boundary. This is not a style choice; it is a **utility with
no module**. Owner edict 5 says style at the root level, never per-instance; edict 1's unique-
semantic-ownership invariant says exactly one home per concept. This concept has five.

The fallback is a second defect stacked on the first. `--ink-muted` is stamped at
`demo/color-picker/composables/boot/useAtmosphereBoot.ts:103`
(`document.documentElement.style.setProperty("--ink-muted", css)`). The
`, var(--muted-foreground))` arm is a **masking fallback** for boot not having run — precisely
what edict 2 forbids. Measured live at rest the boot value is present:

```
"inkMuted": "oklch(44.687157993053% 0.003861589952 34.629978305623deg)"
```

so the fallback is never the paint in the shipped path; it only hides a boot failure if one ever
occurs.

**Cure.** One Tailwind v4 `@utility plate-ink` in `demo/styles/foundation.css` (the file this
component already `@reference`s at `:137`), reading `--ink-muted` with **no fallback**; delete all
five scoped blocks. Boot absence then fails loudly (unstyled ink) instead of silently degrading to
a statically-authored token that was measured at 2.82–3.08:1 over the live plate — the exact
regression the `.plate-ink` idiom was introduced to prevent.

---

### L-14 · MAJOR — `cssColorOpaque` has two delivery mechanisms; `ExtractWorkbench` uses both, three lines apart

The established pattern is injection: `CSS_COLOR_KEY` in `demo/color-session/keys.ts`, injected at
**9 sites**:

```
$ grep -rln "inject(CSS_COLOR_KEY" demo --include='*.vue' --include='*.ts'
demo/workbenches/gradient/GradientPane.vue      demo/workbenches/mix/MixPane.vue
demo/workbenches/generate/GeneratePane.vue      demo/workbenches/extract/ExtractWorkbench.vue
demo/scenes/about/ColorNutritionLabel.vue       demo/shell/dock/Dock.vue
demo/palettes/BrowsePane.vue                    demo/palettes/PalettesPane.vue
demo/palettes/admin/AdminPane.vue
```

Running in parallel: a `cssColor` **prop**, declared in 3 components and drilled through 9
bindings:

```
$ grep -rn "cssColor\??: string" demo --include='*.vue'
demo/workbenches/extract/ExtractControls.vue:108:        cssColor?: string | undefined;
demo/scenes/about/markdown/Markdown.vue:46:    cssColor?: string;
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:186:        cssColor?: string | undefined;
$ grep -rn "css-color=" demo --include='*.vue' | wc -l
       9
```

`ExtractWorkbench.vue` runs **both legs simultaneously**: it injects at `:218`
(`const cssColorOpaque = inject(CSS_COLOR_KEY, undefined)`) and then prop-drills the injected value
straight back down at `:69` (`:css-color="cssColorOpaque ?? ''"`) and `:149`. The subject component
sits on the prop leg.

The dual path costs three stacked degenerates for one value: `inject(…, undefined)` →
`?? ''` (`ExtractWorkbench:69`) → `cssColor ? … : "var(--ink-muted)"` (`ExtractControls:124`). And it
has already produced a vestigial call site — `demo/workbenches/mix/MixSourceSelector.vue:266`
passes the literal `:css-color="''"`, a prop that exists only to be satisfied.

**Cure.** Delete the prop leg. `ExtractControls` calls `inject(CSS_COLOR_KEY)` itself — it is
already inside the provider's subtree (its parent injects successfully) and it already injects
implicitly anyway via `useSafeAccentFn` → `inject(INK_AMBIENT_KEY)`. One mechanism, one degenerate,
`ExtractWorkbench` stops relaying a value it does not use.

---

### L-1 · MAJOR — two routes to one package, one line apart; `demo/ui/` is a 19-barrel shim with zero implementation *(r1, re-verified)*

```
$ find demo/ui -type f | wc -l
19
$ find demo/ui -type f -not -name index.ts
(no output)
```

Nineteen directories, nineteen `index.ts` files, **zero component files**. Every one is a bare
re-export:

```ts
// demo/ui/slider/index.ts — the file in its entirety
export { Slider } from "@mkbabb/glass-ui";
```

`demo/ui/alert/index.ts` states the history in its own doc-block: it *used* to hold a local
shadcn-vue reimplementation, was converted to a re-export at B.W2, and the barrel was kept so
"the two consumers … import from this barrel unchanged". That is a migration shim preserved to
avoid touching consumers — owner edict 2's exact prohibition ("no aliases, migration shims, dual
paths, back-compat").

Inside the subject file the two routes sit adjacent:

```ts
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";   // :98 — direct
import { Slider } from "../../ui/slider";                              // :99 — through the shim
```

**Cure.** Delete `demo/ui/` entirely; rewrite the ~19 import sites to `@mkbabb/glass-ui`. Purely
mechanical, and it removes the only remaining pretence that the demo has a UI layer of its own.

---

### L-2 · MAJOR — the gradient-track concept has two implementations *(r1; superseded in its cure by L-12)*

Carried. Path A = `ComponentSliders.vue:193-200` (producer seam). Path B = `ExtractControls.vue:18-34`
+ its verbatim copy at `GenerateControls.vue:292-307`, whose own comment admits the copy. r1's
diagnosis stands; **read L-12 for the corrected cure** — the producer seam can express all but one
of Path B's affordances today, so the fix is one token, not a prop pair.

---

### L-3 · MAJOR — the `disabled` prop is honoured by 1 of 3 controls *(r1, re-verified)*

`disabled` is declared at `:110` and referenced **exactly once**, at `:84`
(`:disabled="disabled || !hasImage"` on Reset). Upload (`:40-46`) and Camera (`:49-55`) ignore it.
The parent's intent is the opposite: `ExtractWorkbench.vue:70` passes
`:disabled="session.isProcessing.value || cameraActive"` — "the camera is running, stand down" —
and the camera button is the one control that does not stand down. `ExtractWorkbench.startCamera`
(`:239-255`) then overwrites `cameraStream` without stopping the prior stream.

L-axis reading: a prop whose *name* is a whole-component contract and whose *implementation* is one
child. Either rename it to what it governs (`resetDisabled`) or honour it on the whole cluster.

---

### L-5 · **CORRECTED** — the three DockControls DO have accessible names; r1's "nameless" premise is falsified

r1 called this "the worst nameless-button row in the whole audit" on the strength of
`REPORT.json` `"namelessButtons": 3` plus its own probe returning `"n": ""`.

**Both measurements are of the wrong thing.** The audit's predicate
(`visual/capture.mjs:102-105`) is:

```js
.filter((b) => !(b.getAttribute("aria-label") || b.getAttribute("aria-labelledby") || b.textContent.trim()))
```

It never consults `title`. But `title` **is** a name source — accname-1.2 step 2I, the tooltip
fallback. Measured with a real accessible-name computation (Playwright `locator.ariaSnapshot()`,
WebKit, `/#/extract`):

```
=== aria snapshot: button lines ===
  - button "Toggle action bar":
  - button "Login":
  - button "@mbabb"
  - button "Upload image, click to browse or drop an image here":
  - slider "Number of colors"
  - button "Upload image":
  - button "Open camera":
  - slider "Chroma weight"
  - button "Reset" [disabled]:
button lines with no quoted name: 0 / 7
```

**Zero nameless buttons.** The three flagged elements are precisely this component's controls —

```
[{ "title":"Upload image","cls":"dock-icon-button …","scope":["data-v-bfbc09b0"] },
 { "title":"Open camera", … }, { "title":"Reset", … }]
```

(`data-v-bfbc09b0` is `ExtractControls`' scope id) — and each computes a correct name from `title`.

**What survives as a real finding, at reduced severity (MINOR).** Two things:

1. **The audit instrument is wrong**, and it is wrong on 18 rows across 7 routes
   (`REPORT.md:88-105`). Any downstream seat reading `namelessButtons` is reading a false positive
   rate of unknown size. Fix `capture.mjs:102-105` to use a real accname (Playwright exposes
   `ariaSnapshot`), or the mega-tranche will chase phantom a11y work.
2. **`title` is still the weaker convention**, and the repo is split on it along a *feature-tree*
   boundary — 12 `aria-label` sites under `demo/shell/`, 17 `title` sites under `demo/workbenches/`.
   A convention that partitions by directory rather than by semantics is the signature of an absent
   producer contract: `DockControl.vue.d.ts` ships `shape | compact | active | type | disabled |
   as | asChild | class` and no naming prop at all. r1's cure is right and I endorse it unchanged —
   a required `label` on `shape="icon"`, stamped as `aria-label`, making an unnamed icon button a
   type error. **Glass 8.**

---

### L-6 · MAJOR — WCAG floor constants have four homes, three of them in one directory *(r1, extended)*

```
$ grep -rn "TEXT_CONTRAST_FLOOR\s*=\|GRAPHICS_CONTRAST_FLOOR\s*=\|CERTIFY_HEADROOM\s*=" demo src --include='*.ts'
demo/color-session/ink.ts:15:export const TEXT_CONTRAST_FLOOR = 4.5;
demo/color-session/ink.ts:16:export const GRAPHICS_CONTRAST_FLOOR = 3;
demo/color-session/ink.ts:17:export const CERTIFY_HEADROOM = 1.25;
demo/color-session/view-accent.ts:13:export const GRAPHICS_CONTRAST_FLOOR = 3;
demo/color-session/palettes-ramp.ts:83:export const RAMP_TEXT_CONTRAST_FLOOR = 4.5;
demo/color-session/palettes-ramp.ts:88:export const RAMP_LARGE_TEXT_CONTRAST_FLOOR = 3;
```

Two *identically named* exports of `GRAPHICS_CONTRAST_FLOOR` in sibling files, plus two renamed
copies of the same two spec numbers in a third. `ExtractControls.vue:101` picks `ink.ts` — with no
way to know it is choosing.

r1 stopped at "two homes". The deeper defect is **the numbers are in the wrong repo**. These are
WCAG 2.2 SC 1.4.3 (4.5:1 text) and SC 1.4.11 (3:1 non-text) — *spec* constants. The library ships
the machinery that consumes them and none of the constants:

```
$ cat src/subpaths/color.ts | grep -n "safeAccentColor"
23:    safeAccentColor,
$ grep -n "minimumRatio" src/color/operations.ts
210:    options: { readonly minimumRatio: number; readonly gamut: RgbGamut },
212:    if (!options || !Number.isFinite(options.minimumRatio)) return err({ code: "color_non_finite" });
213:    if (options.minimumRatio < 1 || !(options.gamut in GAMUT_SPACE)) return err({ code: "color_out_of_range" });
```

`safeAccentColor` demands a `minimumRatio` and exports no answer for what it should be, so every
consumer invents one. **Cure:** `@mkbabb/value.js/color` exports a frozen
`WCAG = { text: 4.5, largeText: 3, graphics: 3 }`; all four demo declarations delete; `CERTIFY_HEADROOM`
(1.25) stays in the demo because it is *product* policy, not spec. This is the one finding here
that is a **library** (not demo) ask and is **not** blocked by the Glass pin.

---

### L-7 · MINOR — dead scoped CSS in the subject file *(r1, re-verified live)*

`ExtractControls.vue:139-142` ships a `.touch-gate-target` rule. The class appears **nowhere** in
this component's template. Measured on the live route:

```
=== .touch-gate-target reachability ===
{ "rootScopeAttrs": ["data-v-bfbc09b0","data-v-ce26fe94"],
  "touchGateTargetsInDoc": 0,
  "touchGateTargetsInExtract": 0,
  "touchGateRuleSelectors": [".touch-gate-target", ".touch-gate-target:has(.slider-track)",
                             ".touch-gate-target.touch-gate-active",
                             ".touch-gate-target[data-v-bfbc09b0]"] }
```

The scoped rule `.touch-gate-target[data-v-bfbc09b0]` is compiled, shipped, and matches **zero
elements**. The idiom's real home is `ComponentSliders.vue:243-262` (whose block is deliberately
*unscoped*, and whose doc-block explains why). This is a fragment copied across a boundary where
the mechanism does not travel — the same failure shape as L-11, in CSS instead of tokens.

---

### L-8 · MINOR — `tsconfig.demo.json` `paths` has desynchronised from `package.json#exports` *(r1, re-verified)*

```
$ node -e "console.log(Object.keys(require('./package.json').exports).join(' '))"
./color ./value ./css ./easing ./math ./transform ./quantize          ← 7 keys, no root
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

`tsconfig.demo.json:42-49` declares 8 entries and a comment calling the exports map "a CLOSED
8-key set". Three of the 8 (`@mkbabb/value.js`, `/parsing`, `/units`) are in neither the exports
map nor `dist/` — confirmed unresolvable by the `import.meta.resolve` run in §1. Two live
subpaths (`/css`, `/value`) have no `paths` entry at all — and `/css` is the one **this
component's `trackInk` transitively depends on** (`ink.ts:11-13`).

r1 traced it and found self-`exports` resolution catches `/css`, so this is not a live break. It
is a **config that no longer proves anything**: `vite.config.ts:37-50` *generates* its alias set
from the exports map explicitly so it "can never drift", while the tsconfig hand-maintains the
same truth and has drifted. **Cure:** delete the seven value.js `paths` entries — self-`exports`
resolution already works — or generate them, as Vite does.

---

### L-9 · MINOR — the dogfood alias substitutes the working tree into glass-ui's and keyframes' own dependency; the comment justifying it is false *(r1, re-verified)*

`vite.config.ts:25`: *"A package does not install itself, so these exact aliases point the seven
public specifiers at this checkout's freshly-built published surface."*

It does install itself, transitively:

```
$ grep -n "@mkbabb/value.js" package-lock.json | sed -n '3,6p'
1291:                "@mkbabb/value.js": "^4.0.0",     ← glass-ui peer
1307:                "@mkbabb/value.js": {
1330:                "@mkbabb/value.js": "4.0.0"       ← keyframes.js hard pin
1336:        "node_modules/@mkbabb/value.js": {
$ node -e "console.log(require('./node_modules/@mkbabb/value.js/package.json').version)"
4.0.0
```

The Vite aliases are repo-wide and anchored on the bare specifiers, so glass-ui's and keyframes'
own internal value.js imports are rewritten to this checkout's `dist/` too. Defensible as a dogfood
choice; undocumented, and the sentence documenting it is factually wrong at HEAD. Directly relevant
here: `Slider`'s spectrum recipe and `DockControl`'s glass recipes are downstream of glass-ui's
`@mkbabb/value.js/color` imports.

---

### L-10 · MINOR — producer thumb geometry below the WCAG target-size floor *(r1, re-verified with the token)*

```
=== WCAG 2.2 SC 2.5.8 thumb check ===
[{ "label":"Number of colors","w":12,"h":24,"cssWidth":"12px","thumbSizeToken":"1rem","pass2_5_8":false },
 { "label":"Chroma weight",   "w":12,"h":24,"cssWidth":"12px","thumbSizeToken":"1rem","pass2_5_8":false }]
```

12 × 24 CSS px against SC 2.5.8 (AA) 24 × 24. Both appear in `REPORT.json` `smallTapTargets` for
`/#/extract` in all four matrices, by `aria-label`. The width is producer arithmetic —
`width: calc(var(--slider-thumb-size,1rem) * .75)` with the token measured unset-and-defaulted to
`1rem`. A consumer *could* set `--slider-thumb-size: 2rem` to reach 24px, but that is a per-instance
override of a root-level design decision (edict 5) applied at every slider in the repo. **The
default is wrong; the default is glass-ui's. Glass 8.**

---

### L-15 · MINOR — per-instance icon sizing duplicates the producer's own root-level token

`ExtractControls.vue:45, 54, 89` each carry `class="w-5 h-5 transition-colors"`. The producer
already sizes the glyph at the root:

```css
.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: var(--dock-icon-glyph, 1.25rem); }
```

`1.25rem` = 20px = exactly `w-5`/`h-5`. The utilities land in `@layer utilities` and therefore win
over `@layer components`, so the demo's hand-written duplicate is what actually paints — a
per-instance override that re-states the design system's default and silently opts each of the
three buttons out of `--dock-icon-glyph` retuning. `transition-colors` is likewise redundant: the
producer already transitions `color` on `.dock-icon-button` and the glyph inherits it through
`currentColor`. The idiom is repo-wide — 13 `class="w-5 h-5"` sites in `demo/`.

**Cure:** delete the classes; if a workbench wants larger glyphs than the dock, set
`--dock-icon-glyph` once at the control-bar root.

---

## 4. Mechanism families

| family | findings | one-sentence mechanism |
|---|---|---|
| **F1 · chrome primitive off its scope** | L-11, L-7 | dock-scoped CSS contracts (`--dock-separator-height`, `.touch-gate-target`) travel to a card plate; the variable/class does not, and the failure is silent |
| **F2 · producer seam bypassed, then reimplemented** | L-12, L-2, L-15, L-10 | the design system already expresses the thing; the demo rebuilds it beside it and blanks the original |
| **F3 · one concept, N homes** | L-13, L-6, L-14, L-1 | `.plate-ink` ×5, `GRAPHICS_CONTRAST_FLOOR` ×2(+2 renamed), `cssColor` inject∥prop, `demo/ui/` ×19 — no module owns the concept, so every consumer re-declares it |
| **F4 · config/comment that no longer describes reality** | L-8, L-9, L-3 | hand-maintained mirrors of a generated truth, and prop names that overstate their scope |
| **F5 · instrument error** | L-5 | the audit's `namelessButtons` predicate ignores accname step 2I and manufactures false positives on 18 rows |

F1 and F2 are the same root disease seen from two sides: **the demo/glass-ui boundary is drawn
around *components* but not around *contracts*.** A consumer may import `DockSeparator` but cannot
see that its height comes from a scope; may import `Slider` but cannot see that `--slider-track-bg`
takes layered backgrounds. The producer publishes components and hides its seams, so consumers
route around them.

---

## 5. The greenfield lattice

If I were structuring this today with no legacy, five modules — and `demo/ui/`, `demo/color-session/ink.ts`,
and the rail div would not exist.

```
@mkbabb/value.js/color            ← + WCAG = { text: 4.5, largeText: 3, graphics: 3 }   (L-6)
        │                              spec constants live with the function that eats them
        ▼
@mkbabb/glass-ui                  ← THE design system. Consumed by bare specifier, always.
  ├─ Slider  (spectrum)              + --slider-track-ring / --slider-track-ring-w        (L-12)
  ├─ Separator                       the plate-seated divider
  ├─ dock/DockControl                + required `label` on shape="icon"                   (L-5)
  └─ dock/DockSeparator              height gets a fallback; stays dock-only              (L-11)
        │
        ▼
demo/theme/                       ← NEW HOME. The ink/contrast layer, extracted whole from
  ├─ ink.ts                          color-session/. It has zero session state — it is theming,
  ├─ useSafeAccentFn.ts              and it is misfiled today purely by history.
  └─ ink.css                         @utility plate-ink  (the 5 scoped copies die)        (L-13)
        │
        ▼
demo/color-session/               ← what actually remains: the user's live colour, palettes,
                                     parsing, persistence. Provides CSS_COLOR_KEY + INK_AMBIENT_KEY.
        │
        ▼
demo/workbenches/extract/
  ├─ useExtractSession.ts            state + quantize orchestration (unchanged, it is good)
  ├─ ExtractWorkbench.vue            stops relaying cssColor downward                     (L-14)
  └─ ExtractControls.vue             injects CSS_COLOR_KEY; imports ONLY @mkbabb/glass-ui
```

Concretely, `ExtractControls.vue` under that lattice:

- **imports drop from 6 to 5**, and all design-system imports become bare `@mkbabb/glass-ui`
  (`demo/ui/` deleted, L-1);
- **`GRAPHICS_CONTRAST_FLOOR` comes from `@mkbabb/value.js/color`** as `WCAG.graphics` (L-6);
- **`useSafeAccentFn` comes from `demo/theme/`**, not from the session kernel;
- **the `cssColor` prop is gone** — `inject(CSS_COLOR_KEY)` (L-14), which also removes the
  `?? ''`/`cssColor ? …` degenerate pair;
- **the rail div, `--slider-track-bg: 'transparent'`, and the `h-6`/`rounded-full`/`overflow-hidden`
  hand-match are gone** — one `<Slider>` carrying `--slider-track-bg` + `--slider-track-ring`
  (L-12), which also kills `useExtractSession.ts:103`;
- **both `<DockSeparator />` become `<Separator orientation="vertical" />`** and actually paint
  (L-11);
- **both scoped `<style>` rules are gone** — `.touch-gate-target` was always dead (L-7),
  `.plate-ink` moves to `demo/theme/ink.css` (L-13);
- **the three `w-5 h-5 transition-colors` classes are gone** (L-15).

Net: **151 lines → roughly 95**, one `<style>` block deleted entirely, one DOM node per slider
deleted, and every remaining line is either markup or a producer token. Elegance and performance
move in the same direction here — the rail deletion removes a stacking context and a paint layer
per slider, and the `demo/ui/` deletion removes 19 modules from the graph.

---

## 6. The blocked wave — pin `71aa0a65…`, consumer edits FORBIDDEN until Glass 8

### Wave V·L-EXTRACT-CONTROLS — "the control bar stops speaking dock"

**Status: BLOCKED. Do not open.**

**Exact release condition (all four must hold):**

1. `@mkbabb/glass-ui` publishes a version `>= 8.0.0` that ships **all four** producer changes:
   - **P1 (L-11)** `.dock-separator { height: var(--dock-separator-height, 1.5rem) }` — a defined
     fallback so the primitive is self-contained outside `.glass-dock`;
   - **P2 (L-12)** the spectrum `.slider-track` accepts
     `--slider-track-ring` + `--slider-track-ring-w` as an inset ring;
   - **P3 (L-5)** `DockControl` requires `label: string` when `shape="icon"`, stamped as
     `aria-label`;
   - **P4 (L-10)** the default `--slider-thumb-size` yields a thumb `>= 24 × 24` CSS px
     (`2rem`, since width is `size * .75`), satisfying WCAG 2.2 SC 2.5.8 without any consumer
     override.
2. `package.json` dependency on `@mkbabb/glass-ui` is bumped to that version and the Glass BJ W4
   hold on `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` is formally released.
3. The E13 relay to the glass-ui BH inbox carrying P1–P4 has been **sent and acknowledged** (the
   standing formation invariant: every glass-ui-level change is relayed at root).
4. The O-18 contrast census oracle has an approved migration for its
   `data-o18="extract-k-rail"` anchor (`e2e/smoke/oracles/o18-contrast-census.spec.ts:1133-1134`),
   since P2 deletes the element that anchor selects. The census must re-anchor to the producer's
   `.slider-track` — the same anchor its sibling `extract-kc` row already uses at line 1126.

**Wave contents once released**, in dependency order:

| step | change | findings closed | blocked by |
|---|---|---|---|
| 1 | `@mkbabb/value.js/color` exports frozen `WCAG`; delete the 4 demo floor declarations | L-6 | **nothing — this step is NOT blocked** |
| 2 | Extract `demo/theme/` (`ink.ts`, `useSafeAccentFn.ts`, `ink.css` with `@utility plate-ink`); delete the 5 scoped `.plate-ink` blocks | L-13 | nothing |
| 3 | Delete `demo/ui/` (19 barrels); rewrite import sites to `@mkbabb/glass-ui` | L-1 | nothing |
| 4 | Delete the `cssColor` prop leg; consumers inject `CSS_COLOR_KEY` | L-14 | nothing |
| 5 | Regenerate or delete the value.js `paths` in `tsconfig.demo.json`; correct the `vite.config.ts:25` comment | L-8, L-9 | nothing |
| 6 | Fix `visual/capture.mjs:102-105` to compute a real accname | L-5 (instrument) | nothing |
| 7 | `DockSeparator` → `Separator` in plate-seated bars | L-11 | P1 |
| 8 | Collapse the k-rail into `--slider-track-bg` + `--slider-track-ring`; delete the rail div, the `transparent` blanking, `useExtractSession.ts:103`, and the twin at `GenerateControls.vue:292-307` | L-12, L-2 | P2, condition 4 |
| 9 | `title` → `label` on all 17 workbench `DockControl` sites | L-5 (convention) | P3 |
| 10 | Delete the three `w-5 h-5 transition-colors` classes; delete the dead `.touch-gate-target` block; make `disabled` govern the whole cluster or rename it | L-15, L-7, L-3 | P4 for the thumb half |

**Steps 1–6 touch no pinned consumer and could be authored as a separate unblocked wave.** Step 1
in particular is a pure `src/` library change and is the highest value-per-risk item in this
report. Nothing was applied; this formation lands no source edits.

---

## 7. Commands and probes run

```
git rev-parse HEAD ; git branch --show-current ; shasum -a 256 <subject> ; wc -l <subject>
find demo/ui -type f | wc -l ; find demo/ui -type f -not -name index.ts
grep -rn 'from "[^"]*\.\./src/\|from "@/src\|value\.js/src' demo
grep -rhno '@mkbabb/value\.js[^"'"'"']*' demo --include='*.ts' --include='*.vue' | sort | uniq -c
node --input-type=module -e "<import.meta.resolve over 6 specifiers>"
node -e "Object.keys(require('./package.json').exports)"
ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
grep -rn "^\.plate-ink" demo -A2 ; grep -rn "…CONTRAST_FLOOR\s*=" demo src
grep -rln "inject(CSS_COLOR_KEY" demo ; grep -rn "css-color=" demo | wc -l
grep -o "\.slider-track\[data-v-4f4cab01\]{[^}]*}"  node_modules/@mkbabb/glass-ui/dist/glass-ui.css
grep -o "\[data-variant=spectrum\][^{]*{[^}]*}"     node_modules/@mkbabb/glass-ui/dist/glass-ui.css
grep -rho "\.dock-separator[^{]*{[^}]*}"            node_modules/@mkbabb/glass-ui/dist/
grep -rho "[^{}]*{[^{}]*--dock-separator-height:[^{}]*}" node_modules/@mkbabb/glass-ui/dist/
node -e "require('./node_modules/@mkbabb/value.js/package.json').version"
```

Three live WebKit probes (Playwright, `http://localhost:9000/#/extract`, 1440×900, 3.5 s settle),
scripts retained at
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chalL-wbextract-probe{,2,3}.mjs`:

1. `ariaSnapshot()` accessible names; DockControl attribute/geometry dump; slider thumb geometry;
   k-rail computed paint; `.touch-gate-target` reachability; ink tokens.
2. Audit-predicate nameless enumeration with scope ids; kC track ink + host plate colour; SC 2.5.8
   thumb check.
3. Controls-row child geometry (the DockSeparator `h: 0` measurement); the rail-redundancy
   transposition experiment.

Image read: `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png`
(corroborates L-11 — no divider marks in the controls row).

**No file outside
`docs/tranches/V/megatranche/audit/components/wb-extract-controls/` was written or modified.**

---

# r3 addendum

Four findings r2 did not reach. Pin re-verified at r3's HEAD (`e39da983`):
`shasum -a 256 demo/workbenches/extract/ExtractControls.vue` →
`71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28`. Consumer edits remain
FORBIDDEN; nothing was applied.

## 8. Findings (r3)

### L-16 · MAJOR — the parameter named `floor` is not the floor; the graphics contract ships 42% over spec, and it costs chroma

`ink.ts:107-112`:

```ts
export const CERTIFY_HEADROOM = 1.25;

export function certifyAccentInk(css: string, surfaceL: number, floor: number = TEXT_CONTRAST_FLOOR): string {
    const accent = parseOklch(css);
    if (!accent) return css;
    const safe = certify(accent, surfaceL, floor + CERTIFY_HEADROOM);   // ← the defect
```

The documented contract at the call site says otherwise. `useContrastSafeColor.ts:350-352`:

> `/** @param floor optional WCAG floor override — pass `GRAPHICS_CONTRAST_FLOOR` (3) for non-text`
> ` *  ink (WCAG 1.4.11: slider tracks, rails — the T-44a rung); defaults to the 4.5 text floor. */`

No mention of headroom. `ExtractControls.vue:124` passes `GRAPHICS_CONTRAST_FLOOR` (3); the walk
targets **4.25**. The component's own comments assert the spec floor twice and are wrong about what
ships both times — `:63-64` ("certified against its rung at the WCAG 1.4.11 graphics floor") and
`:115` ("at the WCAG 1.4.11 graphics floor").

**This is not a harmless over-certification.** Measured against this component's actual rung — the
extract pane's resting plate, light scheme, ambient L 0.60, giving
`resolveSurfaceLightness("resting", …)` = **0.8430** — using the built library
(`dist/subpaths/{color,css}.js`):

| pick | raw ratio on the plate | walk @ floor 3 (documented) | walk @ 4.25 (shipped) | extra ΔL | chroma delta |
|---|---|---|---|---|---|
| `oklch(0.7 0.15 30)` | 1.76 | L 56.66%, C 0.150 | L 48.47%, C 0.150 | **−0.0819** | — |
| `oklch(0.65 0.2 250)` | 2.00 | L 54.88%, C 0.1553 | L 46.86%, C 0.1327 | **−0.0802** | **−14.6%** |
| `#3b82f6` | 2.27 | L 55.55%, C 0.1880 | L 47.64%, C 0.1880 | **−0.0790** | — |
| `#e11d48` | 2.90 | L 57.71%, C 0.2220 | L 49.32%, C 0.1975 | **−0.0838** | **−11.0%** |
| `oklch(0.55 0.12 150)` | 2.84 | L 53.65%, C 0.120 | L 45.54%, C 0.120 | **−0.0811** | — |

Reproduction — `scratchpad/floor-probe.mjs`, run against the built dist:

```
$ node .../scratchpad/floor-probe.mjs
resting surface L (light, ambient .60) = 0.8430
oklch(0.7 0.15 30)   raw 1.76 | floor3 -> oklch(56.661446122453% 0.15 30deg) ΔL -0.1334 | floor4.25 -> oklch(48.474732784089% 0.15 30deg) ΔL -0.2153
oklch(0.65 0.2 250)  raw 2.00 | floor3 -> oklch(54.87903729314% 0.155338885542 250deg) ΔL -0.1012 | floor4.25 -> oklch(46.863602914382% 0.132650647825 250deg) ΔL -0.1814
#3b82f6              raw 2.27 | floor3 -> oklch(55.546136301904% 0.188014734508 259.81deg) ΔL -0.0676 | floor4.25 -> oklch(47.642193340033% 0.188014734508 259.81deg) ΔL -0.1467
#e11d48              raw 2.90 | floor3 -> oklch(57.706371630711% 0.222042445395 17.58deg) ΔL -0.0088 | floor4.25 -> oklch(49.31977783435% 0.197511596424 17.58deg) ΔL -0.0926
oklch(0.55 0.12 150) raw 2.84 | floor3 -> oklch(53.648267346434% 0.12 150deg) ΔL -0.0135 | floor4.25 -> oklch(45.540324661415% 0.12 150deg) ΔL -0.0946
```

(`ΔL` in the raw output is measured from the *pick*; the table's "extra ΔL" is the difference
between the two walks — the damage attributable solely to the undocumented headroom.)

The surrounding prose names this exact failure mode as the thing to avoid.
`useContrastSafeColor.ts:283-291`: *"against the former raw mid-ambient referent … NO mid-chroma
colour clears the floor and the walk degenerated to the L extreme (the cream collapse)."* Pushing
the target 42% above spec pushes every walk in precisely that direction, and the call site cannot
see it happening because the parameter claims to be the floor.

**Why r2 missed it.** r2's L-6 enumerated `CERTIFY_HEADROOM` in its grep output (`ink.ts:17`) and
ruled: *"`CERTIFY_HEADROOM` (1.25) stays in the demo because it is product policy, not spec."* That
ruling is correct about the constant's *residence* and silent on its *application*. A probe-error
margin is legitimate; adding it to a caller-supplied argument named `floor`, undocumented, is a
contract defect independent of whether the margin itself is justified.

**Severity: MAJOR.** **Reproduction:** the script above; or read `ink.ts:110` against
`useContrastSafeColor.ts:350-352` and `ExtractControls.vue:124`.

**Cure (contract, not patch).** The headroom is a property of the *measurement*, not of the
*requirement*, so it must not be folded into the requirement's name:

```ts
export function certifyAccentInk(
    css: string,
    surfaceL: number,
    opts: { floor?: number; headroom?: number } = {},
): string
```

with `headroom` defaulting to `PROBE_HEADROOM` and the walked target reported in the returned value
during development. Once the library exports `contrastRatio` (L-18), the headroom stops being a
guessed constant and becomes measurable: certify at the floor, then *verify* the delivered ratio
against the live probe and widen only if the probe disagrees. That deletes the constant entirely.

---

### L-17 · MAJOR — the inset ring, the sole justification for the rail div, paints nothing: ring colour == fill colour, 1.00:1

r2's L-12 proved the rail div reimplements the producer track point for point and concluded the ring
is *"the only real gap"* — then designed `--slider-track-ring` around it. r3 checked whether the
ring, as authored, renders. **It does not.**

`ExtractControls.vue:22` feeds the *same value* to the fill and to the ring:

```
:style="{ background: gradient, backgroundColor: trackInk, boxShadow: `inset 0 0 0 1.5px ${trackInk}` }"
```

Measured live, WebKit, `http://localhost:9000/#/extract`, boot state:

```js
document.querySelector('[data-o18="extract-k-rail"]') → getComputedStyle(…)
backgroundImage : "none"
backgroundColor : "oklch(0.481452 0.0657404 28.6099)"
boxShadow       : "oklch(0.481452 0.0657404 28.6099) 0px 0px 0px 1.5px inset"
```

Ring colour and fill colour are the identical string. **Contrast ratio 1.00:1.** The ring is a
1.5px band of the fill drawn on the fill.

Corroborated visually in
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png`: the k rail and
the kC track render as two indistinguishable solid magenta capsules. No edge, no gradient, no
differentiation between the row that is supposed to carry palette content and the row that is
supposed to carry flat contract ink.

This directly falsifies the component's own load-bearing claim at `:8-11`:

> *"the certified ink survives OUTWARD as a persistent hairline ring … giving the component a
> certified identity edge **independent of its gradient content in every state**."*

It is absent in the boot state — the state all four Safari matrices captured, and the state the
route enters on every cold visit. In the post-image state the gradient supplies the fill and the
ring becomes visible only by accident of whatever colours the quantizer returned.

**Severity: MAJOR.** **Reproduction:** navigate to `/#/extract`, read the computed style of
`[data-o18="extract-k-rail"]` before uploading any image.

**Cure — a correction to r2's L-12 cure, not a replacement.** r2's `--slider-track-ring` token is
right and should ship as **P2** unchanged. What must change is the *value the consumer feeds it*:
`trackInk` is the fill's own ink and can never contrast with itself. The correct referent already
exists, unused, in the same module — `ink.ts:127-146` `contrastInkFor(fillCss)`, which returns the
WCAG-maximal neutral endpoint for a concrete opaque fill. The released consumer line becomes:

```html
:style="{ '--slider-track-bg': gradient ?? trackInk,
          '--slider-track-ring': contrastInkFor(gradientMid ?? trackInk) ?? 'transparent',
          '--slider-track-ring-w': '1.5px' }"
```

`?? 'transparent'` is not a masking fallback: `contrastInkFor` returns `null` exactly when no
neutral endpoint clears the floor against that fill, and a ring that cannot be certified must not be
drawn. **Wave step 8 must carry this or it will ship the same invisible ring through a nicer seam.**

---

### L-18 · MAJOR — the library's contrast machinery is module-private, so the demo infers ratios by oracle-abuse

r2's L-6 asked the library for the WCAG *constants*. The deeper surface gap is the *function*.
`src/color/operations.ts` computes contrast and never exports it:

```
$ grep -rn "export function safeAccentColor" src/
src/color/operations.ts:207:export function safeAccentColor(
$ grep -rn "contrastRatio" src/
(no output)
```

`luminance()` is at `operations.ts:182` and `contrast()` at `operations.ts:195` — both module-local.
`src/subpaths/color.ts:41` exports `safeAccentColor` and nothing else from that cluster. So a
consumer can ask *"give me a colour that clears N"* but never *"what is the ratio of A on B?"*

The demo pays for that twice, in this component's direct dependency chain:

**(a) `contrastInkFor` (`ink.ts:127-146`) abuses `safeAccentColor` as an oracle.** Unable to measure
a ratio, it walks both neutral endpoints and infers the answer from a floating-point identity test:

```ts
const result = safeAccentColor(ink, fill, { minimumRatio: TEXT_CONTRAST_FLOOR, gamut: "srgb" });
if (result.ok && Math.abs(lightness(result.value) - endpoint) < 1e-9) {
    return endpoint === 0 ? "oklch(0 0 0)" : "oklch(1 0 0)";
}
```

"Did the walk leave my candidate where I put it?" is a proxy for "did my candidate already clear the
floor?" — correct today, and silently wrong the moment `safeAccentColor`'s internal walk changes its
termination behaviour. A 1e-9 comparison is load-bearing for a colour decision.

**(b) `certifyAccentInk` (`ink.ts:113-125`) must certify-then-diff-channels** to discover whether
certification was needed at all, comparing every channel with an epsilon, because it cannot ask
whether the input already cleared.

**Severity: MAJOR** (library public surface). **Reproduction:** the greps above;
`ink.ts:127-146` and `ink.ts:113-125` for the two workarounds.

**Cure.** `@mkbabb/value.js/color` exports
`contrastRatio(a: AnyColor, b: AnyColor, opts?: { quantized?: boolean }): Result<number, ColorIssue>`
— the already-written `contrast()`, promoted, with the same `Result` discipline as everything else
in the subpath. Both workarounds then collapse to a comparison, L-16's headroom becomes measurable
rather than assumed, and the O-18 census gains a first-class oracle instead of a DOM probe.
**This is a pure `src/` change, not blocked by the Glass pin — it belongs beside r2's wave step 1
and shares its risk profile.**

---

### L-19 · MINOR — the palette→gradient string builder exists twice, in two different layers

r2's L-12 killed the second *rail div* at `GenerateControls.vue:292-307`. The *string builder* that
feeds it is also duplicated, and lives at a different altitude in each copy.

`useExtractSession.ts:101-112` (a feature composable):

```ts
const kSliderGradient = computed(() => {
    const presented = presentedPalette.value;
    if (!presented.ok || presented.value.length === 0) return "var(--muted)";
    const stops = presented.value.map((entry, i) => {
        const pct = presented.value.length === 1 ? 50 : (i / (presented.value.length - 1)) * 100;
        return `${entry.serialized} ${pct.toFixed(0)}%`;
    });
    return `linear-gradient(to right, ${stops.join(", ")})`;
});
```

`GenerateControls.vue:65-73` (inline in a component `<script setup>`):

```ts
const countSliderGradient = computed(() => {
    const colors = palette.value;
    if (colors.length === 0) return "var(--muted)";
    const stops = colors.map((css, i) => {
        const pct = colors.length === 1 ? 50 : (i / (colors.length - 1)) * 100;
        return `${css} ${pct.toFixed(0)}%`;
    });
    return `linear-gradient(to right, ${stops.join(", ")})`;
});
```

Same algorithm, same `n === 1 → 50%` singleton guard, same `.toFixed(0)`, same `"var(--muted)"`
empty return. Neither lives in `color-session/`, where every other colour-string derivation in the
demo lives — so the concept "an ordered palette rendered as a track ramp" has **no owner**, and each
consumer re-derives it at whatever altitude was convenient.

```
$ grep -rn "linear-gradient(to right" demo/ | grep -v "styles/"
demo/workbenches/generate/GenerateControls.vue:72
demo/workbenches/extract/composables/useExtractSession.ts:111
demo/workbenches/mix/MixResultDisplay.vue:112
demo/picker/controls/ComponentSliders/ComponentSliders.vue:195
demo/picker/controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts:38
demo/palettes/browser/search/MiniColorPicker.vue:27,162
```

Seven sites, four of them building an evenly-spaced ramp from a colour list.

**Severity: MINOR** (no user-visible defect today) — **MAJOR as a maintenance mechanism**: r2's
wave step 8 changes the empty-state contract for both copies, and there is no single place to
change it.

**Cure.** `color-session/palettes-ramp.ts` — which already owns ramp semantics — gains:

```ts
export function paletteToTrackGradient(colors: readonly string[]): string | null;
```

Returning `null`, **not** a CSS token string, for empty. `"var(--muted)"` is a *design decision*
smuggled through a data path; the consumer must own its own empty state (and under r2's L-12 cure it
does: `--slider-track-bg: gradient ?? trackInk`). Both call sites collapse to one line, and the dead
degenerate r2 identified at `useExtractSession.ts:103` is deleted at its source rather than
worked around at the consumer.

---

## 9. Mechanism families (r3 update)

| family | r3 additions | note |
|---|---|---|
| **F2 · producer seam bypassed, then reimplemented** | **L-18** | extended one layer down: `value.js` hides `contrast()`/`luminance()`, so `ink.ts` reimplements the *question* by abusing the *answer* |
| **F3 · one concept, N homes** | **L-19** | the ramp builder joins `.plate-ink` ×5 and `GRAPHICS_CONTRAST_FLOOR` ×2 |
| **F4 · config/comment that no longer describes reality** | **L-16, L-17** | promoted from a documentation family to a **behavioural** one: L-16's comment is wrong *and the divergence changes rendered colour*; L-17's comment is wrong *and the affordance it describes does not paint* |

**New family, r3 —** **F6 · a named parameter whose name is false.** L-16 alone. Distinct from F4:
F4 is prose drifting from code, F6 is *the API's own vocabulary* misdescribing its behaviour, so no
amount of reading the call site can reveal it. It is the only defect class in this report that
survives a careful reviewer, and the only one that required running the library to detect.

---

## 10. Wave amendments (r3)

r2's Wave **V·L-EXTRACT-CONTROLS** is adopted whole. Four amendments:

| # | amendment | finding | blocked? |
|---|---|---|---|
| A1 | **Step 1 expands**: `@mkbabb/value.js/color` exports `contrastRatio` alongside the frozen `WCAG` namespace | L-18, L-6 | **NOT blocked** — pure `src/` |
| A2 | **New step 1b**: `certifyAccentInk`'s third argument becomes `{ floor?, headroom? }`; the walked target is no longer the caller's floor plus a hidden constant. Depends on A1 for the measurable-headroom half | L-16 | **NOT blocked** |
| A3 | **Step 8 is amended, not replaced**: `--slider-track-ring` must be fed `contrastInkFor(...)`, never `trackInk`. Shipping r2's step 8 verbatim reproduces the invisible ring through a cleaner seam | L-17 | P2 (glass-ui) |
| A4 | **New step 3b**: `paletteToTrackGradient` lands in `color-session/palettes-ramp.ts` returning `string \| null`; both builders collapse; `useExtractSession.ts:103` dies at source | L-19 | **NOT blocked** (lands with step 8 for the consumer half) |

**Born-RED gate for step 8, added by r3.** The step is not green until, on `/#/extract` in the
**boot (pre-image) state**, the k slider's ring measures **≥ 3:1 against its own track fill** —
i.e. `contrastRatio(ringColor, trackFillColor) >= GRAPHICS_AA`, asserted in the O-18 census at the
re-anchored `.slider-track` selector. Today that assertion reads **1.00** (L-17) and the gate is
therefore born RED by construction, which is the point: the current implementation must fail it.

**Steps 1, 1b, 2, 3, 3b, 4, 5, 6 touch no pinned consumer.** With r3's additions, the unblocked
sub-wave now closes L-6, L-13, L-14, L-1, L-8, L-9, L-5(instrument), **L-16, L-18, L-19** — ten
findings, zero Glass dependency, zero pin contact.

---

## 11. Commands and probes run (r3)

```
shasum -a 256 demo/workbenches/extract/ExtractControls.vue        # pin re-verified at e39da983
git merge-base --is-ancestor c654824e HEAD; git rev-parse HEAD
git diff --stat c654824e HEAD -- demo/workbenches/extract/ExtractControls.vue   # empty
git cat-file -t e9cf0aa4; git log --oneline -1 e9cf0aa4            # r2's HEAD, no longer tip
grep -rn "CONTRAST_FLOOR *=" demo/ src/
grep -rn "export function safeAccentColor" src/ ; grep -rn "contrastRatio" src/
sed -n '150,260p' src/color/operations.ts                          # private luminance()/contrast()
grep -rn "linear-gradient(to right" demo/
grep -rln "^\.plate-ink {" demo/ ; grep -rn "touch-gate-target" demo/
node .../scratchpad/floor-probe.mjs                                # the L-16 measurement table
```

One live WebKit probe (Playwright, `http://localhost:9000/#/extract`), used to decide L-17 and to
independently re-confirm r2's L-10 and L-5 measurements:

- `[data-o18="extract-k-rail"]` computed `backgroundImage` / `backgroundColor` / `boxShadow`
  → ring colour == fill colour, the L-17 evidence;
- `--slider-track-bg` gradient transposition on a detached probe element
  → `"linear-gradient(to right, rgb(255,0,0), rgb(0,0,255))"`, independently reproducing r2's L-12;
- slider thumbs `{role:"slider", w:12, h:24}` ×2 — r2's L-10 confirmed, and traced to its
  mechanism: `.glass-slider[data-variant=spectrum] .slider-thumb{width:calc(var(--slider-thumb-size,1rem)*.75)}`
  → 16 × 0.75 = 12px exactly, i.e. shipped geometry, not a stray override;
- the three DockControls: `title` present, `aria-label` null, 40×40 — r2's L-5 correction confirmed.

Image re-read: `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png`
— corroborates L-17 (k rail and kC track render as two identical solid capsules; no edge, no ramp).

Script retained at
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/floor-probe.mjs`.

**r3 wrote only this file. No source edit, no `INBOX.md`, no `vnext/`, no `scripts/dev/dev.sh`.
The pin is verified and intact.**

---

## 12. Findings (r4) — the package boundary and the enforcement boundary

r1–r3 traced the *file*'s boundaries exhaustively and correctly. r4 asked two questions they did
not: **what does the published package declare about itself**, and **what actually enforces the
lattice this report keeps describing?** Both answers are defective, and the first is the most
severe finding in the register.

---

### L-20 · **BLOCKER** — the published library declares a runtime dependency on the design system that peer-depends on it; `src/` imports neither dependency it ships

`package.json` declares **two runtime `dependencies`**. The library imports **neither**.

```
$ grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/ ; echo "grep exit=$?"
grep exit=1                      ← 1 = ZERO matches in the entire library source

$ grep -rn "@mkbabb/" dist/ ; echo "grep exit=$?"
grep exit=1                      ← 1 = ZERO matches in the PUBLISHED artifact

$ node -p "JSON.stringify(require('./package.json').dependencies)"
{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}
```

`package.json#files` is `["dist", "!dist/gh-pages", "!dist/gh-pages/**"]` — the published tarball is
`dist/` alone, and `dist/` contains **zero** `@mkbabb/*` specifiers. Both declarations are
unreachable from anything a consumer can execute.

**The direction is inverted, and it closes a cycle.** glass-ui declares value.js the correct way:

```
$ node -p "'peerDependencies.@mkbabb/value.js = ' + require('./node_modules/@mkbabb/glass-ui/package.json').peerDependencies['@mkbabb/value.js']"
peerDependencies.@mkbabb/value.js = ^4.0.0
```

So the declared package graph is:

```
@mkbabb/value.js@4.0.0  ──dependencies──▶  @mkbabb/glass-ui@^7.0.0
        ▲                                            │
        └──────────── peerDependencies ──────────────┘
```

`eslint.config.js:211-214` enforces this exact invariant **inside the source tree** and names it:

> `"inv-K-1: the value.js LIBRARY (src/) must never import glass-ui — the topology is glass-ui → value.js(lib), one direction, no cycle."`

The lint rule holds — `src/` is clean, proven above. **`package.json` violates the same invariant
one level up, where no rule looks.** inv-K-1 is enforced at the import level and unenforced at the
manifest level, and the manifest is the level a consumer's package manager reads.

**Measured cost to every consumer of `@mkbabb/value.js`:**

```
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js
5.2M    node_modules/@mkbabb/glass-ui
608K    node_modules/@mkbabb/keyframes.js
```

**5.8 MB** of Vue design system + animation runtime, installed unconditionally, by a package whose
own `description` reads *"Immutable, failure-explicit CSS color, value, easing, transform, math,
and quantization capabilities."* glass-ui in turn pulls `reka-ui`, `embla-carousel`,
`embla-carousel-vue`, `@vueuse/core`, `tailwindcss`, `tw-animate-css`, `@lucide/vue`,
`@mkbabb/pencil-boil` and `vue` itself (its own `peerDependencies`, read above) — so a Node-only
consumer doing color math installs a browser UI toolkit and a Vue peer requirement.

**Why this is the L-seat's finding and not another seat's.** This report's §1 asks whether the demo
imports value.js "through the published subpath export map — a demo import a real consumer could
not write is a library-structure defect and a false proof of the public API." r1–r3 answered that
for *specifiers* and found it clean. The **manifest** is the other half of the same public surface,
and there the dogfood is false in the opposite direction: the demo needs glass-ui, so glass-ui was
declared where the demo would resolve it — in the *library's* `dependencies` — and the real
consumer inherits the demo's needs. This is the exact mechanism L-9 (r1) identified in
`vite.config.ts` ("a package does not install itself" — it does, transitively), traced to its root
cause. **L-9 is the symptom; L-20 is the cause.**

- **Reproduction:** the four commands above, pasted with output. Verified at HEAD `06377848`.
- **Severity BLOCKER** — it is shipped, in the immutable published `4.0.0`, wrong in the manifest
  every consumer reads, and it inverts the constellation's single most-defended topology invariant.
- **Cure (one edit, `package.json`, NOT pin-blocked, NOT `src/`):** move both entries from
  `dependencies` to `devDependencies`. Nothing resolves them at runtime — proven by the `dist/`
  grep — so no consumer breaks. Then add the manifest half of inv-K-1 as a real gate: a check that
  `Object.keys(dependencies)` is a subset of the bare specifiers appearing in `dist/`. Today that
  set is empty, so the correct assertion is `dependencies === undefined`.
- **Note on the epoch rule:** `4.0.0` is published and immutable. The cure lands in the next minor
  and the published `4.0.0` manifest stays wrong forever — which is precisely why this must be
  gated before the next publish, not after.

---

### L-21 · MAJOR — every `no-restricted-imports` rule that encodes the demo's module lattice is dead; its file globs point at a directory tree that no longer exists

`eslint.config.js` carries three named architectural invariants over the demo tree — G-DEMO-1
(*"the shared color layer must never import app-root boot"*), G-DEMO-3a (*"features depend on
shared, never the reverse"*), G-DEMO-3b (*"reach palette-browser through its barrel seam, never a
raw `.vue` file"*). Each is attached to a `files:` glob. Every one of those globs is dead:

```
$ grep -n '"demo/@' eslint.config.js
235:            "demo/@/components/**/*.ts",
236:            "demo/@/components/**/*.vue",
237:            "demo/@/lib/**/*.ts",
238:            "demo/@/lib/**/*.vue",
275:            "demo/@/composables/**/*.ts",
276:            "demo/@/composables/**/*.vue",

$ test -d demo/@ && echo EXISTS || echo ABSENT
ABSENT

$ git ls-files 'demo/@*' | wc -l
       0

$ npx eslint 'demo/@/**/*.ts'
No files matching the pattern "demo/@/**/*.ts" were found.
```

The `demo/@/` tree was deleted by **W43 (RF-15)** — `tsconfig.demo.json:32-34` records the deletion
in its own comment: *"the demo `@…` path aliases were killed — every demo import is relative to its
physical home."* The tsconfig was updated. **`eslint.config.js` was not.** Its rule *groups* are
equally dead — they ban `@components/custom/**`, an alias that no longer resolves:

```
$ grep -rn 'from "@components' demo --include='*.ts' --include='*.vue' | wc -l
       0
```

So both halves of every rule are inert: the globs match no file, and the patterns match no
specifier. **Zero of the demo's declared module-graph invariants are enforced by anything.**

This is the finding that explains the *shape* of this whole report. r1–r3 found `demo/ui/` shims
(L-1), duplicated concepts across layers (L-13, L-19), a config drifted from the manifest it
mirrors (L-8), and a dual delivery mechanism for one value (L-14). Those are exactly the defect
classes G-DEMO-1/3a/3b were written to prevent, and they accumulated freely because the rules
stopped matching files two tranches ago while continuing to *read* as though they were live. A dead
rule is worse than no rule: it is a standing false attestation that a boundary is defended.

- **Reproduction:** the four commands above, with pasted output. Verified at HEAD `06377848`.
- **Mechanism:** F4 (config that no longer describes reality) escalated — this is not prose drift,
  it is *enforcement* drift, and it is silent because ESLint never errors on a `files:` glob that
  matches nothing.
- **Cure:** re-point the three globs at the live trees — `demo/color-session/**` (the shared kernel,
  the layer that must not reach up), `demo/workbenches/**` + `demo/picker/**` + `demo/scenes/**`
  (the feature trees), `demo/palettes/**` (the barrel-seam feature) — and re-express the groups as
  relative-path patterns now that the aliases are gone (`**/color-picker/**`,
  `**/palettes/browser/**/*.vue`, `**/workbenches/*/composables/**`). Then add the edge this report
  actually needs: **ban `demo/color-session/**` and `demo/workbenches/**` from importing
  `demo/color-picker/**`.** Not pin-blocked; touches only `eslint.config.js`.
- **Gate:** the re-pointed config is not green until `npx eslint <each new glob>` reports a
  non-zero file count. Born-RED today by construction: the count is 0.

---

### L-22 · MAJOR — the O-18 cure landed on one of L-2's two copies; the born-RED gate's own probe hook exists **only** on the cured copy, so the gate is structurally blind to the divergent twin

r1's L-2 established that the gradient-track concept has two implementations, and that
`GenerateControls.vue:284-285` admits the copy in its own comment: *"the extract k-slider pattern
**verbatim**."* r4 measured what happened to the two copies afterwards. **They have diverged, and
the divergence is exactly the O-18 contrast cure this component's 40 lines of comments exist to
document.** One live WebKit probe, both routes, one page session:

| | `/#/extract` k-rail (subject `:19-23`) | `/#/generate` count-rail (`GenerateControls.vue:293-296`) |
|---|---|---|
| geometry | `h: 24` | `h: 24` |
| `boxShadow` (the certified identity ring) | `oklch(0.545406 0.21813 9.83402) 0px 0px 0px 1.5px inset` | **`none`** |
| `backgroundColor` (the floor-clamped fill) | `oklch(0.545406 0.21813 9.83402)` | **`rgba(0, 0, 0, 0)`** |
| row label class | `text-mono-small plate-ink …` | **`text-mono-small font-bold text-muted-foreground …`** |
| row label computed colour | `oklch(0.447121 0.00386159 34.63)` (= `--ink-muted`) | **`rgb(112, 89, 66)`** (the static token) |
| O-18 probe hook | `data-o18="extract-k-rail"` | **absent** |

The label row is the sharpest edge. The subject's own scoped stylesheet, at `:144-147`, states the
rule the twin breaks:

> *"the extract plate's labels/readouts thread the certified de-emphasis rung (`--ink-muted` —
> boot-stamped, floor-clamped against the live resting plate; D6), **never the STATIC
> `text-muted-foreground`** that composited 2.82–3.08:1 over the live-ambient plate in light."*

`GenerateControls.vue:288` is `text-mono-small font-bold text-muted-foreground` — the named-and-
retired token, on the structurally identical row, measured live as `rgb(112, 89, 66)` while the
subject's row measured the boot-stamped certified rung. The E1-R1 remediation was applied to the
copy that had the finding filed against it and not to the copy that was cloned from it.

**And the gate cannot see this.** `data-o18` appears on exactly three files repo-wide:

```
$ grep -rln 'data-o18' demo --include='*.vue'
demo/workbenches/extract/ExtractControls.vue
demo/scenes/about/ColorNutritionLabel.vue
demo/shell/dock/menus/ProfileSection.vue
```

The O-18 graphics-contrast census selects on `data-o18`. The subject carries the hook; its verbatim
twin does not. So the born-RED gate that certifies the extract rail **cannot fail on the generate
rail**, no matter how far it drifts. A gate anchored on a hand-placed attribute measures the
components that remembered to opt in — which is, by construction, the set that was already cured.

- **Reproduction:** Playwright against the live dev server at `http://localhost:9000`, one page
  session, `location.hash` walked `#/extract` → `#/generate` with a 1.4 s settle; computed
  `boxShadow` / `backgroundColor` / `className` / `color` read off each rail and its row label. Full
  output in §15. Plus the `grep -rln` above.
- **Why it belongs to the L-seat:** this is the *cost function* of L-2 made concrete. Two copies of
  one concept do not merely duplicate code — they duplicate the **surface a cure must be applied
  to**, and cures are applied by finding, not by structure. The cure reached one. It always will.
- **Cure:** L-12's — one producer token, one element, both call sites collapse onto it. When the
  ramp rides `--slider-track-bg` there is no second element to forget, the ink is a prop of the one
  primitive, and the census can anchor on `.slider-track` (a producer-owned selector present on
  every instance) instead of a hand-placed `data-o18`. **r3's step-8 born-RED gate should re-anchor
  on `.slider-track`, not on `[data-o18]`** — see the wave amendment A5 in §14.
- **Scope note:** `GenerateControls.vue` is **not** under the `71aa0a65…` pin. The twin's half of
  this cure is *not* Glass-blocked; only the subject's half is.

---

### L-23 · MAJOR — the quantize domain has four homes and three of them disagree; the published `.d.ts` declares none of it

The subject's two sliders bound `k` and `chromaWeight`. Both bounds are literals in the template.
Both are wrong relative to the library that validates them, and there is no exported constant a
consumer could have read instead.

**What the library actually enforces** — `src/quantize.ts:39-49`:

```
    const k = options.k ?? 8;
    const maxIterations = options.maxIterations ?? 20;
    const targetPixels = options.targetPixels ?? 10_000;
    const chromaWeight = options.chromaWeight ?? 1;
    const dedupeThreshold = options.dedupeThreshold ?? 0.02;
    if (!Number.isInteger(k) || k < 1 || k > 64
        || !Number.isInteger(maxIterations) || maxIterations < 1
        || !Number.isFinite(targetPixels) || targetPixels < 1
        || !Number.isFinite(chromaWeight) || chromaWeight < 0
        || !Number.isFinite(dedupeThreshold) || dedupeThreshold < 0) {
        return fail("quantize_invalid_option");
```

**What a real consumer can see** — the published `dist/subpaths/quantize.d.ts:42-48`:

```
export declare type QuantizeOptions = Readonly<{
    k?: number;
    maxIterations?: number;
    targetPixels?: number;
    chromaWeight?: number;
    dedupeThreshold?: number;
}>;
```

Five bare `number`s. **The entire domain — the integrality of `k`, its ceiling of 64, the
non-negativity of `chromaWeight` — exists only as a runtime guard in unpublished source.** The
`.d.ts` is the trust boundary `tsconfig.demo.json` was written to establish (its own comment:
*"the `dist/*.d.ts` trust boundary… the demo speaks only the public keys"*), and across that
boundary the quantizer's contract is `number`. A consumer authoring a control **must** guess.

**The four disagreeing homes:**

| home | `k` | `chromaWeight` |
|---|---|---|
| `src/quantize.ts:39,42` (library default) | **8** | **1** |
| `src/quantize.ts:44,47` (library domain) | integer **1 … 64** | finite, **≥ 0**, no ceiling |
| `src/quantize.ts:137` (`dominantColor`, hardcoded) | **5** | *(default 1)* |
| `useExtractSession.ts:44-45`, `:181-182` (demo default + reset) | **5** | **0.5** |
| `ExtractControls.vue:28-30`, `:71-73` (the affordance) | **1 … 16** | **0 … 1.5** step 0.1 |
| `GenerateControls.vue:301-303` (the sibling "how many colours" control) | **1 … 12** | — |

Three distinct defaults for `k` (8 / 5 / 5), two for `chromaWeight` (1 / 0.5), two different UI
ceilings for the same product question (16 / 12), and a UI ceiling of 16 against a library ceiling
of 64. `chromaWeight`'s `1.5` is pure invention: the library's only constraint is `≥ 0`, so 1.5 is
neither a maximum nor a documented preference — it is a number someone picked, now frozen into the
affordance that defines what the feature can express.

```
$ grep -rn "MAX_K\|K_MAX\|MAX_COLORS\|CHROMA_WEIGHT" demo src
demo/workbenches/mix/MixSourceSelector.vue:38:const MAX_COLORS = 12;
```

One unrelated local constant in a third workbench. **No shared name for the concept exists
anywhere in the repo.**

- **Reproduction:** the file:line citations above, each verified by direct read at HEAD `06377848`;
  the `grep` with pasted output.
- **Mechanism:** F3 (one concept, N homes), at the **library/consumer** boundary rather than the
  intra-demo boundary where r1–r3 found it. Unique semantic ownership fails hardest here because the
  owner (`src/quantize.ts`) *has* the knowledge and declines to publish it.
- **Cure — architectural transposition, not a shared literal.** The domain belongs to the type, not
  to a constant the consumer must remember to import. `@mkbabb/value.js/quantize` should export
  the domain as data *and* narrow the option type:
  ```ts
  export const QUANTIZE_DOMAIN = {
      k:               { min: 1,   max: 64,  step: 1,   default: 8    },
      chromaWeight:    { min: 0,   max: 4,   step: 0.1, default: 1    },
      maxIterations:   { min: 1,             step: 1,   default: 20   },
      targetPixels:    { min: 1,                        default: 10_000 },
      dedupeThreshold: { min: 0,                        default: 0.02 },
  } as const;
  ```
  The single validation block at `:44-49` then reads its bounds from `QUANTIZE_DOMAIN` instead of
  restating them — one home, checked by the compiler, and `ExtractControls`'s `:min`/`:max`/`:step`
  become `QUANTIZE_DOMAIN.k.min` etc. A slider that cannot express a value the library accepts, or
  can express one it rejects, becomes impossible to author. `dominantColor`'s hardcoded `{ k: 5 }`
  (`:137`) either takes the default or documents why 5.
- **Blocked?** The `src/` half is **NOT pin-blocked** and lands immediately. The consumer half
  (rewriting the two `:max` literals) touches the pinned file and waits for Glass 8.

---

### L-24 · MAJOR — `INK_AMBIENT_KEY` has two incompatible injection contracts; the subject's path takes the throwing one, and the sole provider is app-root boot

The subject's `trackInk` (`:118`, `:123-125`) delegates to `useSafeAccentFn("resting")`. That
composable opens with a **non-null-asserted inject**:

```
demo/color-session/useContrastSafeColor.ts:347:    const ambient = inject(INK_AMBIENT_KEY)!;
```

Two other consumers of the same key inject it **safely, with an explicit default**:

```
demo/picker/controls/ComponentSliders/ConsoleRail.vue:128:const inkAmbient = inject(INK_AMBIENT_KEY, null);
demo/picker/visual/HeroBlob.vue:95:const inkAmbient = inject(INK_AMBIENT_KEY, null);
```

**One key, two contracts.** `inject(K, null)` says *"absent is a legitimate state"*;
`inject(K)!` says *"absent is impossible"* and silences the compiler's disagreement with a bang.
Both cannot be the contract. The subject depends on the one that asserts.

**The sole provider is the app root.** There is exactly one `provide`:

```
$ grep -rn "provide(INK_AMBIENT_KEY" demo
demo/color-picker/composables/boot/useAtmosphereBoot.ts:92:    provide(INK_AMBIENT_KEY, derivedLightness);

$ grep -rn "useAtmosphereBoot" demo --include='*.vue' --include='*.ts' | grep -v "boot/useAtmosphereBoot.ts"
demo/color-picker/App.vue:193:import { useAtmosphereBoot } from "./composables/boot/useAtmosphereBoot";
demo/color-picker/App.vue:285:const { auroraCssGradient, auroraArrived } = useAtmosphereBoot(
```

So the real dependency edge is:

```
demo/workbenches/extract/ExtractControls.vue   (feature leaf, 151 lines)
      → demo/color-session/useContrastSafeColor.ts   (shared kernel)
          → inject(INK_AMBIENT_KEY)!   ← no default
              ← provided ONLY by demo/color-picker/composables/boot/useAtmosphereBoot.ts:92
                  ← called ONCE, at demo/color-picker/App.vue:285
```

**Feature leaf → shared kernel → app-root boot.** The crossing is real and it is the exact edge
G-DEMO-1 names — and L-21 just proved nothing enforces it. It is invisible at every level a reader
would check: the subject's `defineProps` (`:103-111`) declares `cssColor?: string | undefined` and
nothing else, so the component's stated contract is "give me a colour string"; the true contract is
"give me a colour string **and** mount me beneath `color-picker/App.vue`."

**Honest scoping.** The *import* graph is clean — I verified the shared kernel does not import boot:

```
$ grep -rn 'color-picker' demo/color-session/ | grep -v '^\s*[/*]'
   (only prose in comments; zero import statements)
```

The coupling is entirely through the injection key, which is why r1–r3's import trace could not see
it. And because `App.vue` is the only mount path in the shipped app, **this does not crash today**.

- **Reproduction of the coupling: the four greps above, pasted.** Verified at HEAD `06377848`.
- **Reproduction of a failure: NONE — this is a labelled HYPOTHESIS.** The mechanism is certain from
  the code (`ambient` is `undefined` without a provider; `safeCss` at `:353-359` dereferences
  `ambient.value`), and it is gated behind `cssColor` being truthy because `trackInk` (`:123-125`)
  short-circuits to `var(--ink-muted)` when it is falsy — and `ExtractWorkbench.vue:69` passes
  `cssColorOpaque ?? ''`, which is falsy. So the throw requires *provider absent* **and**
  *colour present*, a combination no shipped route produces. **I did not execute it.** The finding
  is the structural coupling, which is measured; the crash is a hypothesis.
- **Consequence that is not hypothetical:** the subject cannot be mounted in isolation — not in a
  unit test, not in a component harness, not in a second app shell. `demo/test/` contains
  `export/`, `glass/`, `palettes/` and **no test mounts this component or any workbench leaf**
  (`grep -rln "ExtractControls\|useSafeAccentFn" demo/test test` → no output). The absence of
  component-level tests for a 151-line leaf with a 3-emit, 6-prop surface is a *consequence* of this
  edge, not a coincidence.
- **Cure:** give the key one contract. `useSafeAccentFn` takes `inject(INK_AMBIENT_KEY, null)` and
  degrades to the certified de-emphasis token when absent — the exact degenerate path `trackInk`
  already implements for a missing `cssColor`, so the component's two "no live pick" states unify
  instead of one being graceful and the other fatal. Not pin-blocked: the edit is in
  `demo/color-session/useContrastSafeColor.ts`, and the subject's own lines do not change.

---

### L-25 · MINOR *(cone-adjacent; the seat brief's named suspect, resolved)* — `demo/palettes/export.ts` and `demo/palettes/export/` are two live implementations of one concept, and the byte-exact test suite certifies the one the app never calls

The brief names this suspect. It is **real, alive, and worse than a duplicate** — but it is
**outside this component's dependency cone**, so it is recorded here for the register rather than
folded into the extract wave.

A file and a directory share one name:

```
$ ls demo/palettes/export.ts demo/palettes/export/
demo/palettes/export.ts

demo/palettes/export:
bytes.ts  canonical.ts  css.ts  digest.ts  json.ts  png.ts
reload.ts  rfc8785.ts  serializers.ts  svg.ts  tailwind.ts  types.ts
```

Both implement JSON serialization, with independent code:

```
demo/palettes/export.ts:13:      export function exportAsJSON(palette: Palette): ExportResult {
demo/palettes/export/json.ts:11: export function serializeJson(snapshot: ExportSnapshot): Uint8Array {
```

`export.ts` even carries its own private `slugify` (`:9-11`). The two have **disjoint consumers**:

```
$ grep -rn 'from "\./export"' demo
demo/palettes/usePaletteExport.ts:9:} from "./export";        ← the LIVE APP path

$ grep -rn 'palettes/export/' demo
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";   ← the ONLY consumer
```

**The app runs `export.ts`. The byte-exact test suite tests `export/serializers.ts`.** They are the
same concept and no execution path connects them. The suite named *byte-exact* — the strongest
correctness claim in the demo's test tree — is byte-exact about a serializer no user can reach.

- **Reproduction:** the three commands above, pasted. Verified at HEAD `06377848`.
- **Disposition — OUT OF CONE, recorded not folded.** The subject's cone is
  `ExtractControls → ExtractWorkbench → useExtractSession → { useImageQuantize, usePaletteStore,
  palettes/types }`. Nothing in it reaches `palettes/export*`. This finding belongs to the
  palettes-export component seat; it is written here because the brief asked, and because a seat
  that checks a named suspect and stays silent leaves the next seat to re-spend on it.
- **Cure (for that seat):** `export/` is the structured, tested, RFC-8785-canonical implementation;
  `export.ts` is the ad-hoc one the app happens to call. Migrate `usePaletteExport.ts` onto
  `export/serializers.ts` and delete `export.ts` whole — no shim, no alias, per the no-legacy edict.
  The test suite then certifies what ships.

---

## 13. Mechanism families (r4 update)

| family | r4 additions | note |
|---|---|---|
| **F1 · one concept, two implementations** | **L-25** | promoted in severity by its *consumers*: the two impls are not merely duplicated, they are **split across app and test**, so the tests certify the dead one |
| **F3 · one concept, N homes** | **L-23** | crosses the *package* boundary — the owner has the knowledge (`src/quantize.ts:44-49`) and does not publish it, forcing every consumer to re-invent a domain |
| **F4 · config/comment that no longer describes reality** | **L-21** | escalated from documentation to **enforcement**: the config does not merely misdescribe, it *silently stops defending* |

**New family, r4 — F7 · the invariant enforced at the wrong altitude.** L-20 and L-21 together.
inv-K-1 is enforced on imports and unenforced on the manifest; G-DEMO-1/3a/3b are written against a
tree that no longer exists. In both cases a rule *exists*, *reads correctly*, and *defends nothing*,
because the level it inspects is not the level the violation occurs at. This family is invisible to
every other seat in the workflow: an implementation seat reads the code the rule covers, a design
seat reads the rendered result, and neither ever asks *what the rule's glob actually matches*.

**New family, r4 — F8 · the cure that does not propagate.** L-22 alone. When one concept has two
implementations (F1), a fix applied by *search* reaches the copy that carried the finding and not
the copy cloned from it — and if the gate's probe hook is hand-placed, the gate inherits the same
blindness. F8 is F1's cost function: it is the reason F1 is a BLOCKER-class family rather than a
tidiness complaint.

---

## 14. Wave amendments (r4)

r2's Wave **V·L-EXTRACT-CONTROLS**, as amended by r3 (A1–A4), is adopted whole. Six further
amendments. **Five of the six touch no pinned consumer.**

| # | amendment | finding | blocked? |
|---|---|---|---|
| **A5** | **r3's step-8 born-RED gate re-anchors from `[data-o18="extract-k-rail"]` to `.slider-track`** — a producer-owned selector present on *every* slider instance. The `data-o18` anchor can only measure components that opted in, which is the set already cured (L-22). | L-22, L-17 | P2 (glass-ui) |
| **A6** | **New step 0 — `package.json`: move `@mkbabb/glass-ui` + `@mkbabb/keyframes.js` from `dependencies` to `devDependencies`.** Add a publish gate asserting `dependencies` is empty while `dist/` contains zero bare `@mkbabb/*` specifiers. Step 0 because it is the only finding in this report that is wrong in the *published artifact*. | **L-20** | **NOT blocked** |
| **A7** | **New step 0b — `eslint.config.js`: re-point G-DEMO-1/3a/3b at the live trees** and add the edge this report needs (`demo/color-session/**` and `demo/workbenches/**` may not import `demo/color-picker/**`). | L-21, L-24 | **NOT blocked** |
| **A8** | **Step 1 expands again — `@mkbabb/value.js/quantize` exports `QUANTIZE_DOMAIN`**, and `quantizePixels`'s validation block reads its bounds from it rather than restating them. | L-23 | **NOT blocked** (`src/` only) |
| **A9** | **New step 3c — `useSafeAccentFn` takes `inject(INK_AMBIENT_KEY, null)`** and degrades to the certified de-emphasis token, unifying the two "no live pick" states. | L-24 | **NOT blocked** |
| **A10** | **Step 8 gains a twin — `GenerateControls.vue:284-309` collapses onto the same producer seam in the same step.** Landing the subject's half alone re-creates the divergence the moment the pin lifts. `GenerateControls.vue` is **not pinned**; its half can land ahead of Glass 8. | L-22, L-2 | **NOT blocked** |

**Born-RED gates added by r4:**

- **A6 gate.** `node -e "const p=require('./package.json'); if (p.dependencies && Object.keys(p.dependencies).length) process.exit(1)"`
  paired with the `dist/` bare-specifier grep. Today: exits 1. Born RED, correctly.
- **A7 gate.** For each re-pointed `files:` glob, `npx eslint <glob>` must report a non-zero file
  count. Today all three report `No files matching the pattern`. Born RED, correctly.
- **A8 gate.** `ExtractControls.vue` contains zero numeric literals in the `k` / `chromaWeight`
  slider bounds. Today: four (`1`, `16`, `0`, `1.5`). Born RED, correctly. *(consumer half — Glass 8)*
- **A10 gate.** `grep -c 'absolute inset-0' demo/workbenches/*/[A-Z]*.vue` returns 0 across the
  workbench tree, and no `--slider-track-bg: 'transparent'` survives. Today: 2 and 2. Born RED.

**Release condition for the pin-blocked remainder, restated exactly.** The consumer half —
`ExtractControls.vue` itself: A5's ring token consumption, A8's literal removal, and the subject's
share of step 8 — is **blocked until `@mkbabb/glass-ui@8.0.0` is published and installed**, because
each requires a producer token (`--slider-track-ring`, and `--slider-track-bg` carrying the ramp)
that Glass 7.0.0 does not ship. The pin is
`71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28`; it must be re-verified
immediately before the first consumer edit and the wave aborted if it does not match. **A6, A7, A8's
`src/` half, A9, and A10 are unblocked and should land now** — none of them touches the pinned file.

---

## 15. Commands and probes run (r4)

```
git rev-parse HEAD                                                # 06377848 (advanced from r3's e39da983)
shasum -a 256 demo/workbenches/extract/ExtractControls.vue        # 71aa0a65… PIN VERIFIED
grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/ ; echo $?     # exit 1 — zero matches      [L-20]
grep -rn "@mkbabb/" dist/ ; echo $?                               # exit 1 — zero matches      [L-20]
node -p "JSON.stringify(require('./package.json').dependencies)"                              # [L-20]
node -p "require('./node_modules/@mkbabb/glass-ui/package.json').peerDependencies"             # [L-20]
du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js   # 5.2M + 608K        # [L-20]
grep -n '"demo/@' eslint.config.js ; test -d demo/@ ; git ls-files 'demo/@*' | wc -l          # [L-21]
npx eslint 'demo/@/**/*.ts'                                       # "No files matching…"       [L-21]
grep -rn 'from "@components' demo --include='*.ts' --include='*.vue' | wc -l   # 0             [L-21]
grep -rln 'data-o18' demo --include='*.vue'                       # 3 files, twin absent       [L-22]
sed -n '39,49p;135,139p' src/quantize.ts                          # the real domain            [L-23]
grep -n "QuantizeOptions" -A 10 dist/subpaths/quantize.d.ts       # the published domain: none [L-23]
grep -rn "MAX_K\|K_MAX\|MAX_COLORS\|CHROMA_WEIGHT" demo src       # one unrelated local        [L-23]
grep -rn "provide(INK_AMBIENT_KEY\|INK_AMBIENT_KEY" demo          # 1 provider, 2 contracts    [L-24]
grep -rn "useAtmosphereBoot" demo | grep -v boot/useAtmosphereBoot.ts   # App.vue:285 only     [L-24]
grep -rln "ExtractControls\|useSafeAccentFn" demo/test test        # no output — zero tests    [L-24]
ls demo/palettes/export.ts demo/palettes/export/                                              # [L-25]
grep -rn 'from "\./export"' demo ; grep -rn 'palettes/export/' demo # disjoint consumers       [L-25]
node --input-type=module -e "…import.meta.resolve…"                # r3's §1 resolution, re-run
```

**One live WebKit probe** (Playwright, `http://localhost:9000`), one page session, three
`browser_evaluate` calls, used to decide **L-22** and to independently re-confirm r3's L-17 and
r2's L-12:

- `/#/extract` — `[data-o18="extract-k-rail"]` vs its sibling `.slider-track`:
  **identical boxes**, `{h: 24, w: 434, top: 425.390625}` both, confirming r3's L-17 geometry;
  rail `boxShadow: "oklch(0.545406 0.21813 9.83402) 0px 0px 0px 1.5px inset"` with
  `backgroundColor: "oklch(0.545406 0.21813 9.83402)"` — **ring colour == fill colour**,
  r3's L-17 independently reproduced.
- **`--slider-track-bg` transposition, on the live in-page track** (not a detached probe element):
  set → computed `backgroundImage` became
  `"linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))"`, then reverted.
  **r2's L-12 confirmed on the real element** — the producer seam accepts the ramp today, so the
  rail div is redundant scaffolding, not a workaround for a missing capability.
- `#/extract` → `#/generate` walk — the L-22 divergence table in §12. `--slider-thumb-size`
  read as `1rem`, so the twins' hardcoded `h-6` matches
  `calc(var(--slider-thumb-size) * 1.5)` = 24px **by coincidence of the current token value**;
  a producer token change silently desynchronises both rails.
- Button accessible-name re-read: three `dock-icon-button`s with `title` set
  (`"Upload image"` / `"Open camera"` / `"Reset"`) and `aria-label` null — **consistent with r2's
  L-5 correction**, and noted as the demo-wide minority idiom (every other DockControl on the route
  carries `aria-label`).

**Prior-art check performed before writing.** r1–r3's full finding register (L-1 … L-19) was read
first. L-20 … L-25 are disjoint from it: r1's L-9 touches the `package-lock` cycle from the *Vite
alias* angle and explicitly rules the alias "defensible as a dogfood choice" — it never inspects
`package.json#dependencies`, which is L-20's subject and L-9's root cause. r1's L-2 establishes the
two ramp implementations; L-22 measures what became of them. r1's L-8 covers `tsconfig` drift;
L-21 covers `eslint` drift, a different file enforcing different invariants. Nothing in r1–r3 is
restated, and nothing is downgraded.

**r4 wrote only this file (the §12–§15 addendum plus the revision note at `:33`). No source edit,
no `INBOX.md`, no `vnext/`, no `scripts/dev/dev.sh`, no `src/`, `demo/`, `api/`, `test/`, `e2e/`.
The pin was verified before and after and is intact.**

---

# r5 addendum

**Method note — this was a blind pass.** r5 traced the component's imports, probed the live app, and
reached its findings *before* opening r1–r4's register. The convergence is therefore independent
corroboration rather than restatement, and it is reported as such: §16.1 lists what r5 re-derived
without prior sight, §16.2 gives the one finding nobody reached, §16.3 gives a **correction to a
cure that is already inside the wave**.

**Pin re-verified at r5's HEAD.**

```
$ git rev-parse HEAD
d19da6d3
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28   # PIN INTACT
```

HEAD has advanced again (r4's `06377848` → `d19da6d3`). Subject hash unchanged; every r1–r4 finding
stands without re-derivation. The brief's `c654824e` is stale for the **fourth** consecutive
revision — this should now be treated as a defect in the brief-generation step, not a per-seat note.

---

## 16. Findings (r5)

### 16.1 — Independent corroboration (no new bookings)

Reached blind, matched on reading the register. Recorded because a finding reproduced by two
disjoint routes is a different epistemic object from one asserted twice.

| r5 reached, blind | matches | r5's independent evidence |
|---|---|---|
| the demo lattice defends nothing | **L-21** | `npx eslint --print-config` on the **subject itself** → `no-restricted-imports` **ABSENT**; same for `demo/color-session/useContrastSafeColor.ts`. r4 proved the globs match no files; r5 proves the *rule does not reach the component*, which is the form the wave gate needs. |
| `.plate-ink` ×5 | **L-13** | live CSSOM enumeration: **four** of the five scope-hashed copies ship on `/#/extract` *simultaneously* (`97dc6261`/0 matches, `7acf0aa0`/2, `3fb07b91`/1, `bfbc09b0`/3, `ce26fe94`/1) |
| two routes to glass-ui, `:98` vs `:99` | **L-1** | + the demo-wide split: 37 bare-barrel vs 82 subpath imports, **24 files using both** — see §16.3 |
| WCAG floors have N homes | **L-6** | `safeAccentColor` (`src/color/operations.ts:210`) *requires* `minimumRatio` and `src/subpaths/color.ts` exports no floor — the duplication is downstream of a missing library surface |
| `.touch-gate-target` is dead | **L-7** | live: `.touch-gate-target[data-v-bfbc09b0]` → **0 matches**, while `.plate-ink[data-v-bfbc09b0]` → 3, confirming the hash is the subject's |
| ramp→gradient duplicated | **L-19** | + a **third** variant at `useGradientCSS.ts:223/269/272` (`90deg` rather than `to right`) |
| `var(--muted)` degenerate is masked | **r2's L-12** | live `railStyle`: every `background-*` longhand empty, `background-color: oklch(0.545141 0.218024 9.834023)` |
| twin diverged, twin keeps `text-muted-foreground` | **L-22** | reached from the *comment* side: `ExtractControls.vue:144-147` names the token its own twin still ships |

**Honouring r2's L-5 correction.** r5's first read of `REPORT.json` (`/#/extract`
`namelessButtons: 3`, against ≤1 for every other route, all four matrices) pointed at the three
`DockControl`s, and r5's own probe confirmed `title` set / `aria-label` null on exactly those three.
**r2 is right and the harness metric is strict**: `capture.mjs:102-105` counts only
`aria-label` / `aria-labelledby` / text content, whereas `title` *is* a valid last-resort
accessible name per accname. **No new booking.** What survives is not a naming failure but a
convention split, and it is sharper than r4's "minority idiom" note because it is total and it
follows the module boundary exactly:

| area | files with `<DockControl` | `aria-label` | `title` |
|---|---:|---:|---:|
| `demo/shell/dock/**` | 4 | **7** | **0** |
| `demo/workbenches/**` | 5 | **0** | **10** |

Zero overlap. Two conventions for one primitive, partitioned by directory, with no producer
contract to arbitrate — `DockControl.vue.d.ts` declares `shape`, `compact`, `active`, `type`,
`disabled`, `as`, `asChild`, `class` and **no name prop at all**. This is family F3 at the
*producer* altitude and it belongs in the Glass 8 ask beside A5: `DockControl`'s `icon` shape
should take a **required** `label`, so an unnamed icon control cannot be authored. Filed as an
amendment (§17 A12), not as a finding.

### 16.2 — L-26 · MINOR (NEW) — the subject's two slider labels are one role in two type recipes, and the file's own comment asserts they are one

Zero prior mentions: `grep -Fc 'text-micro' challenge-L-library.md` → **0**; `grep -Fc '16.4'` → **0**.

`ExtractControls.vue:12-13` states the invariant:

> *"The k label speaks its cluster's ONE mono voice (weight 400, matching kC — E1-R1)."*

The two labels use different recipes — `:15` is `text-mono-small` (a glass-ui `@utility`), `:66` is
`fira-code text-micro` (a demo alias at `demo/styles/utils.css:9`, plus a glass-ui size step).
Measured live, `/#/extract`, WebKit 1440×900, `getComputedStyle`:

| label | source | family | **size** | weight |
|---|---|---|---:|---:|
| `k` (`{{ k }}`, `:16`) | `text-mono-small` | Fira Code | **16.4px** | 400 |
| `kC` (`:66`) | `fira-code text-micro` | Fira Code | **11px** | 400 |

Weight matches (400/400, as claimed); **size differs by 1.49×**. The asserted invariant is half
true, and the false half is the visible one — in
`shots/safari-desktop-light/extract.png` the `5` reads conspicuously larger than the `kC` / `0.5`
row directly beneath it, on a control bar whose whole design premise is a single readout voice.

**Mechanism — F3 (one concept, N homes), at the type layer.** `demo/DESIGN.md` reserves
`.fira-code` for *"one-off opt-in"* and directs authors to glass-ui's named utilities, but names no
rule for when a readout is "one-off". Both idioms are live demo-wide (18 files use `fira-code`,
30 use `text-mono-small`), so a single 151-line component reached for both, 50 lines apart, for the
same semantic role. The comment at `:12-13` is F4 (a comment that no longer describes reality) —
it was written when the claim was about *weight*, and has been read as a claim about the voice ever
since.

**Cure.** One named role in `demo/styles/utils.css`, beside `.fira-code` (its exact sibling in
kind) and beside the `.plate-ink` hoist L-13 already requires — `.readout { … }` — applied at both
sites. Then delete the `:12-13` clause that asserts an invariant the CSS, not the comment, should
carry. **Consumer-side, therefore pin-blocked**; the `demo/styles/utils.css` half is not.

### 16.3 — C1 · CORRECTION to r1's L-1 cure — it prescribes the bare barrel, which this repo has already ruled against

**This is the r5 finding that matters, because L-1 is inside the wave.** r1's cure reads:

> *"Delete `demo/ui/` entirely; rewrite the ~19 import sites to `@mkbabb/glass-ui`."*

That target is wrong on two independent grounds.

**(1) The producer publishes the subpaths.** glass-ui's `package.json#exports` declares **74**
subpaths, including `./slider` — the very symbol the subject reaches through the shim:

```
$ node -p "Object.keys(require('./node_modules/@mkbabb/glass-ui/package.json').exports).length"
74
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').exports['./slider'].import"   # ./dist/slider.js
$ node -p "JSON.stringify(require('./node_modules/@mkbabb/glass-ui/package.json').sideEffects)"
["*.css"]
```

The subject **already** imports `DockControl`/`DockSeparator` by subpath one line above. r1's cure
would resolve the two-routes defect by standardising on the *worse* of the two routes, and would
convert 82 correct subpath imports into a minority idiom.

**(2) This repo already ruled on exactly this, for exactly this reason.** `demo/shared/utils.ts:8-20`
records the T.W6.5 Lane M row-12 "root-barrel shed":

> *"`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier —
> the full-barrel import that drags the scroll-timeline grammar chunk (~36 KiB gz) into the eager
> graph for a 40-line timer utility."*

The shed completed: **all 49** value.js imports in `demo/` now go through the `exports` map, none
bare, none deep (§16.4). `package.json` publishes no `"."` export at all, so the bare specifier
would not even resolve. The identical reasoning was never carried across to glass-ui — and
`demo/ui/`'s 18 bare-barrel re-exports are the artefact that hid it. Measured demo-wide:

| idiom | files |
|---|---:|
| `from "@mkbabb/glass-ui"` (bare) | **37** |
| `from "@mkbabb/glass-ui/<subpath>"` | **82** |
| files using **both** | **24** |

`ExtractControls.vue` is one of the 24, and so are `GenerateControls.vue`, `MixPane.vue`,
`ColorPicker.vue`, `PaletteCard.vue`, `Dock*`. Dev-server cost, measured on one page load of
`/#/extract`: **14** glass-ui module requests.

**Honest bound on the claim.** glass-ui declares `sideEffects: ["*.css"]`, so a production Rollup
build *should* tree-shake the JS and the prod byte delta may be ~0. **The prod-bytes claim is a
hypothesis and is not booked.** What is measured and booked is the *idiom* defect: two routes to
one package, 24 files carrying both, and a cure in the wave that would entrench the losing one.

**Corrected cure.** Delete `demo/ui/` and rewrite the sites to **subpaths** — and while the sites
are being rewritten anyway, give the deletion somewhere to land. `demo/ui/` is 20 files that add
nothing; replacing it with 0 files leaves the demo with no place to seat a project-level default,
which is what forced the per-instance `--slider-track-bg` overrides (`:32`, `:75`,
`GenerateControls.vue:305`, `ComponentSliders.vue:197`) that edict 5 forbids, and what
`ConfigSliderPane.vue:197` documents from the inside — *"the `--slider-track-bg` feed, **no
`ui/slider` edit**"*. The barrel is acknowledged in-tree as un-editable: it is not a boundary, it
is a redirect. Replace 20 redirects with **one** module that is a boundary:

```
demo/design/index.ts   ⟵ the ONLY file in demo/ permitted to name "@mkbabb/glass-ui".
                          Imports by SUBPATH. Seats project defaults (Slider size,
                          the DockControl name contract of §16.1). 20 files → 1,
                          and the 1 has a reason to exist.
```

enforced by the lattice rule L-21 is already reinstating (A7): `demo/!(design)/**` may not name
`@mkbabb/glass-ui*`. That single edge subsumes L-1, prevents its recurrence, and gives A12's
`label` contract a place to be enforced before Glass 8 ships it.

**Note on L-19's cure.** r3 homes `paletteToTrackGradient` in `demo/color-session/palettes-ramp.ts`.
That is defensible and r5 does not contest it. Recorded for the vnext ledger only: the library
ships a full CSS parser, the `CssLinearStop` type and `serializeCssColor`, and **no gradient
serializer** (`src/subpaths/css.ts`) — so the ramp→CSS step has no library home, which is why it has
three demo homes. If a `rampToGradient` lands in `@mkbabb/value.js/css`, L-19's demo home becomes a
one-line re-export and the third variant (`useGradientCSS.ts:223`) collapses too. **Not booked
here** — it is a library-surface row, not a component row.

### 16.4 — Negative proof re-verified at r5's HEAD

Stated positively, with the commands.

**The published-library surface is clean, and is the model for §16.3's cure.**

```
$ grep -rhn '@mkbabb/value.js' demo | sed 's/.*from "//; s/".*//' | sort | uniq -c | sort -rn
  24 @mkbabb/value.js/color      10 @mkbabb/value.js/css       6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing      4 @mkbabb/value.js/quantize
$ grep -rn 'from "\.\./\.\./\.\./src\|value.js/src' demo | wc -l
0
```

49 imports, **all** through `package.json#exports`, zero deep-`src/` reaches, zero bare specifiers —
and `package.json` publishes no `"."` export, so the surface is closed by construction. Every demo
import is one a real consumer could write. **The demo is a true proof of the public API.** (This is
the axis on which the structure is exemplary; L-20 concerns the *manifest*, not the import graph.)

**No upward edges from the lower layers.** `demo/color-session/` and `demo/ui/` reach only downward
and sideways — G-DEMO-1 and G-DEMO-3a **hold today, by author discipline**:

```
$ grep -rn 'from "\.\./\(workbenches\|palettes\|picker\|shell\|scenes\|color-picker\)' demo/color-session/
demo/color-session/color-chips/sample.ts:33   # matches "../picker-color", not ../picker — false positive
$ grep -rn 'from "\.\.' demo/ui/
(none)
```

This is the strongest possible argument for landing A7 **now**: the graph is clean, so turning the
rule on costs zero remediation and buys permanent defence. A lattice reinstated against a clean
graph is free; reinstated against a dirty one it is a project.

**The subject has no upward edge.** Its five targets are `vue`, `@lucide/vue`,
`@mkbabb/glass-ui/dock`, `demo/ui/slider` (sideways — the L-1 defect), `demo/color-session/*`
(lower layer). It reaches into no shell, no boot, no sibling feature. **Every edge points the right
way**; the defects are in what sits at the far end of them.

**`verbatimModuleSyntax` compliant** — all five imports are value imports; none is type-only, so
no `import type` is owed. **Idiomatic Vue 3.5** — reactive props destructure (`:103-111`), typed
`defineEmits` (`:127-133`); no template ref needed, no `defineModel` round-trip, so the `shallowRef`
caveat does not apply. **Not a god module** — 151 lines, one job, five imports, one `computed`.

---

## 17. Wave amendments (r5)

The wave as amended through r4 (A1–A10) is adopted whole. Two amendments; **neither is new work —
one corrects a step already in the wave, one relocates an ask to the producer.**

| # | amendment | finding | blocked? |
|---|---|---|---|
| **A11** | **A7's `demo/ui/` step is retargeted from the bare barrel to subpaths, and lands as one module, not zero.** Delete `demo/ui/` (20 files); create `demo/design/index.ts` importing glass-ui **by subpath** and seating project defaults; rewrite the 48 barrel-consumer sites onto it. r1's L-1 cure as written would standardise on `@mkbabb/glass-ui` bare — the idiom this repo already shed for value.js (`demo/shared/utils.ts:8-20`) and the minority idiom today (37 bare vs 82 subpath). **Landing L-1 as written is worse than not landing it.** | **C1**, L-1 | **NOT blocked** (`demo/ui/`, `demo/design/`, 48 call sites; the subject's `:99` is 1 line and rides the pin) |
| **A12** | **Glass 8 ask, filed beside A5: `DockControl`'s `icon` shape takes a required `label`,** stamped as `aria-label` and forwarded to its own tooltip. Today the primitive declares no name prop, and the demo's two conventions partition **exactly** on the module boundary (shell 7/0 `aria-label`, workbenches 0/10 `title`) with nothing able to tell them apart. Interim, unblocked: `aria-label` at the 4 **unpinned** `demo/workbenches/**` call sites. | §16.1 | P2 (glass-ui); **interim NOT blocked** |

**Born-RED gates added by r5:**

- **A11 gate.** `grep -rc 'from "@mkbabb/glass-ui"' demo | grep -v ':0' | wc -l` returns **1** (only
  `demo/design/index.ts` may name the bare specifier, and only if a symbol has no subpath), **and**
  `test -d demo/ui` fails. Today: 37 and the directory exists. Born RED, correctly.
- **A12 interim gate.** `grep -rn '<DockControl' -A4 demo/workbenches | grep -c 'title='` returns 0.
  Today: 10. Born RED, correctly. *(1 of the 5 files is pinned — the gate goes green at 3 of 10 with
  the subject's share deferred to Glass 8.)*
- **L-26 gate.** `grep -c 'text-micro\|text-mono-small' demo/workbenches/extract/ExtractControls.vue`
  returns 0 (both replaced by the one `.readout` role). Today: 3. Born RED. *(consumer — Glass 8;
  the `demo/styles/utils.css` half lands now.)*

**Release condition — unchanged and restated.** The consumer half remains blocked until
`@mkbabb/glass-ui@8.0.0` is published and installed. r5 adds two producer conditions to the check,
so the gate answers whether Glass 8 actually shipped what the wave needs rather than merely that
its version bumped:

```sh
# ALL FOUR must hold. Any FAIL keeps the consumer half shut. Run at every wave open (L-4).
node -e 'process.exit(require("@mkbabb/glass-ui/package.json").version.startsWith("8.")?0:1)'
grep -qE 'slider-track-ring' node_modules/@mkbabb/glass-ui/dist/glass-ui.css          # A5 ring token
grep -q 'label' node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts  # A12 name contract
test "$(shasum -a 256 demo/workbenches/extract/ExtractControls.vue | cut -d' ' -f1)" \
     = 71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28               # pin intact
```

**Do not book:** the 12×24 slider thumb. r5 re-measured it (60 instances, 9 routes, all four
matrices; both of the subject's thumbs `w:12 h:24`) and confirms it is **glass-ui-owned and already
seated** — `GLASS-UI-COMMUNIQUE-2026-07-29.md §1`: *"spectrum seam, roving dock keyboard, Slider
a11y … retain their existing seats and must not be duplicated."* It is cited in r5 only as evidence
for C1: a producer default that misses a WCAG floor across an entire application has, today, **no
place in the demo where it could be corrected at the root** — because the seam that should be that
place is 20 empty re-exports. A11 creates that place.

---

## 18. Commands and probes run (r5)

```
git rev-parse HEAD ; shasum -a 256 demo/workbenches/extract/ExtractControls.vue   # d19da6d3 / PIN OK
npx eslint --print-config demo/workbenches/extract/ExtractControls.vue            # no-restricted-imports ABSENT
npx eslint --print-config demo/color-session/useContrastSafeColor.ts              # ABSENT          [L-21]
ls -d demo/@ ; find demo/@/{components,composables,lib} -type f | wc -l           # absent / 0      [L-21]
grep -rn '"@components' vite.config.ts tsconfig*.json demo | wc -l                # 0               [L-21]
cat demo/ui/*/index.ts                                                            # 20 bare re-exports
node -p "Object.keys(require('./node_modules/@mkbabb/glass-ui/package.json').exports).length"  # 74  [C1]
node -p "JSON.stringify(require('./node_modules/@mkbabb/glass-ui/package.json').sideEffects)"  # css [C1]
grep -rl 'from "@mkbabb/glass-ui"' demo | wc -l ; grep -rl '@mkbabb/glass-ui/' demo | wc -l    # 37/82
comm -12 <(grep -rlE 'from "[^"]*\.\./ui/' demo|sort) <(grep -rl '@mkbabb/glass-ui' demo|sort) | wc -l  # 24
grep -rhn '@mkbabb/value.js' demo | sed 's/.*from "//;s/".*//' | sort | uniq -c    # 49, all subpath [§16.4]
grep -rn "^export const GRAPHICS_CONTRAST_FLOOR" demo                             # ink.ts:16 + view-accent.ts:13
grep -n "view-accent\|\./ink" demo/color-session/{ink,view-accent}.ts              # no cross-import  [L-6]
grep -rn "minimumRatio" src/color/operations.ts                                   # :210 required, no default
grep -rn "^\.plate-ink" demo                                                      # 5 homes          [L-13]
awk 'NR<=93' demo/…/ExtractControls.vue | grep -c touch-gate-target               # 0 — dead rule    [L-7]
for f in shell/dock workbenches; do grep -rn '<DockControl' -A4 demo/$f; done      # 7/0 vs 0/10      [§16.1]
cat node_modules/@mkbabb/glass-ui/dist/components/{slider/types,dock/DockControl.vue}.d.ts  # no track, no label
python3 … REPORT.json                                                             # thumbs 12×24 ×60 routes
```

**Three read-only WebKit page loads** (Playwright, `http://localhost:9000/#/extract`, 1440×900, no
interaction), used to decide L-26 and to independently reproduce L-7, L-13 and r2's L-12:

- **accessible names + thumb geometry** — 3 buttons `title` set / `aria-label` null; both
  `[role=slider]` thumbs `w:12 h:24`; rail inline style with every `background-*` longhand empty and
  `background-color: oklch(0.545141 0.218024 9.834023)` (r2's L-12 dead degenerate, reproduced).
- **CSSOM rule enumeration** — every rule whose selector names `touch-gate-target` or `plate-ink`,
  with its live match count: `.touch-gate-target[data-v-bfbc09b0]` → **0**,
  `.plate-ink[data-v-bfbc09b0]` → 3, plus three further `.plate-ink[data-v-*]` rules live on the
  same route. Also counted 14 glass-ui module requests on the page.
- **computed type metrics** — the k and kC labels: 16.4px vs 11px at weight 400 (**L-26**).

Screenshots read (vision, not code): `shots/safari-desktop-light/extract.png` and
`shots/safari-mobile-dark/extract.png` — the k rail renders as one solid bar in both schemes with no
filled/unfilled distinction, and the size split of §16.2 is visible directly.

**Prior-art check performed after the pass, deliberately.** r1–r4's full register (L-1 … L-25) was
read only once r5's findings were fixed, so §16.1's overlaps are independent corroboration. Of r5's
findings, **one** (L-26) is new, **one** (C1) corrects a cure inside the wave, and the remainder
corroborate. r2's L-5 correction was accepted on reading and r5's own contrary first reading was
withdrawn — recorded in §16.1 rather than quietly dropped, because a seat that silently abandons a
falsified premise leaves the next seat to re-derive it.

**r5 wrote only this file (the §16–§18 addendum plus the revision note at `:33`). No source edit, no
`INBOX.md`, no `vnext/`, no `scripts/dev/dev.sh`, no `src/`, `demo/`, `api/`, `test/`, `e2e/`. The
pin was verified before and after and is intact.**
