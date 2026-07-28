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

**Revision note.** This is **r2**. An r1 of this file exists in git-untracked form written at HEAD
`32b4040e` (findings L-1 … L-10). r2 re-verifies r1's live findings, **falsifies r1's L-5
premise by direct accessible-name measurement**, sharpens L-2's cure by a transposition
experiment, and adds four findings r1 did not reach (L-11 … L-14). Nothing from r1 is dropped.

---

## 0. Verdict

**DEFECTIVE.**

The component's own 151 lines are disciplined — reactive props destructure, no `any`, no dead
imports, `verbatimModuleSyntax` clean, no library deep-path. The defects are all *boundary*
defects: this file is a faithful consumer of a lattice that puts three concepts in the wrong
home and hands it two producer primitives whose contracts do not hold where it seats them.

The single strongest defect is **L-11**: both `<DockSeparator />` instances render at **height 0
and paint nothing**, because `--dock-separator-height` is authored only inside `.glass-dock` and
this component is on a `.card` plate. Two DOM nodes and a designed visual affordance, dead in
every matrix of the visual audit — the literal signature of a chrome primitive used outside its
chrome.

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
