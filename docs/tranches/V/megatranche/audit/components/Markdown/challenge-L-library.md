# CHALLENGE-L — library structure · `demo/scenes/about/markdown/Markdown.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. Declared, not inherited. No defect on this axis.

---

# REVISION 4 — 2026-07-28

The **fourth run** of the CHALLENGE-L seat at this path. Revisions 3, 2 and 1 are **retained in full
below the divider**; nothing in them is discarded or edited. This revision does three things:

1. **Re-measures Revision 3's load-bearing claims from my own commands**, before reading its
   answers. Ledger in §V4-A.
2. **Adds five findings (L-18 … L-22)** that no prior revision contains. **L-18 is the strongest
   defect inside this component's own closure** and it *amends L-6 upward*: the value
   `useMarkdownColors` computes is **already published on `:root`**, byte-identical across the app's
   entire normal operating range, and `demo/DESIGN.md:334` forbids exactly this construction in
   law-voice.
3. **Proves the transposition instead of proposing it** — including proving that the *obvious* form
   of it is wrong, by 35/255 on a case I reproduced.

**Verdict unchanged: DEFECTIVE.** Now **22 findings** — 1 BLOCKER, 10 MAJOR, 9 MINOR, 2 INFO.
Strongest defect *overall* remains **L-1** (the lattice is unenforced — it is the gate that lets the
rest exist and recur); strongest defect *newly established* is **L-18**.

---

## §V4-A · Verification ledger — prior claims, re-measured by this seat

Every claim below was re-derived from my own commands before I read the prior revision's treatment
of it. Commands and outputs pasted.

**L-1 (BLOCKER) — CONFIRMED.**
```
$ npx eslint --print-config demo/scenes/about/markdown/Markdown.vue | jq -r '.rules["no-restricted-imports"]'
UNSET
```
The subject file is governed by no import restriction of any kind.

**L-4 (≥124 dead style lines) — CONFIRMED, and I raise the proof from "the pipeline cannot emit it"
to "and the corpus does not contain it, and the live DOM has none of it."** Three independent
instruments agree.

*(i) The pipeline.* `Markdown({})` (`vite.config.ts:162`) registers zero markdown-it plugins; no
`markdownItSetup` exists anywhere; the only markdown package installed is the plugin itself:
```
$ grep -rn "markdownItSetup\|markdownItUses\|markdown-it-" vite.config.ts package.json
(no output)
$ node -e "const d=require('./package.json');console.log(Object.keys({...d.dependencies,...d.devDependencies}).filter(k=>/markdown/i.test(k)))"
[ 'unplugin-vue-markdown' ]
```
Core markdown-it emits no `dl`/`dt`/`dd`, no `.footnotes`, no `ul.contains-task-list`, no `.toc`, no
`.callout`. Those five rule families are **structurally unreachable**, not merely unused.

*(ii) The corpus* — all 11 files, 980 lines:
```
$ cd assets/docs
$ for pat in '^> ' '^\s*\|' '^!\[' 'callout' 'toc' '\[\^' '^- \[ \]' '^#####' '^######'; do
    printf "%-12s %s\n" "$pat" "$(grep -lE "$pat" *.md | tr '\n' ' ')"; done
^>
^\s*\|
^!\[
callout
toc
\[\^
^- \[ \]
^#####
^######
                       ← every family: zero files
$ echo "h1:$(grep -h -c '^# ' *.md|awk '{s+=$1}END{print s}') h2:$(grep -h -c '^## ' *.md|awk '{s+=$1}END{print s}') h3:$(grep -h -c '^### ' *.md|awk '{s+=$1}END{print s}') h4:$(grep -h -c '^#### ' *.md|awk '{s+=$1}END{print s}')"
h1:0 h2:53 h3:85 h4:0
$ echo "fences:$(grep -h -c '^```' *.md|awk '{s+=$1}END{print s/2}')  links:$(grep -hoE '\]\([^)]+\)' *.md|wc -l)  inline-code:$(grep -hoE '`[^`]+`' *.md|wc -l)"
fences:0  links:3  inline-code:207
```
**Zero fenced code blocks across all 11 documents** — so `pre` (`:229-238`) is dead too, a rule
Revision 3's table does not list, and with it the entire AB-3 ruling attached to it.

*(iii) The live DOM* (headless Chromium against the dev server, `lab.md` rendered):
```
h1:0  h4:0  h5:0  h6:0  blockquote:0  table:0  img:0  dl:0  dt:0  dd:0
ul.contains-task-list:0  .callout:0  .footnotes:0  .footnote-ref:0  .toc:0  pre:0  a:0
--- live: h2:4  h3:9  hr:4  ul:4  p>code:5  mark.cs-name:9  div:has(>.katex-display):4
```
Seventeen selector families, zero matches; seven families live. L-4 stands, wider than stated.

**L-6 (the hand copy + the omitted epoch bump) — CONFIRMED.**
```
$ grep -rn "bumpProbeEpochOnMount" demo/ | grep -v useContrastSafeColor.ts
demo/picker/controls/ComponentSliders/ConsoleRail.vue:96,133          ✓
demo/color-picker/composables/boot/useViewAccents.ts:52,89            ✓
$ grep -rn "resolveSurfaceLightnessLive" demo/ | grep -v useContrastSafeColor.ts
demo/scenes/about/markdown/composables/useMarkdownColors.ts:7,44      ✗ no bump
demo/picker/visual/HeroBlob.vue:42,99                                 ✗ no bump
demo/picker/controls/ComponentSliders/ConsoleRail.vue:97,136          ✓
demo/color-picker/composables/boot/useViewAccents.ts:53,108           ✓
```
Two of four external folders violate the contract stated in law-voice at
`useContrastSafeColor.ts:72-77` — a contract whose docstring names *this component* as the reason the
export exists. **Reproduction of a symptom: NONE.** The contract violation is proved; a wrong first
paint is not. Same posture as Revision 3.

**L-7 (glass-ui `Skeleton` props do not exist) — CONFIRMED from the shipped declaration:**
```
$ cat node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts
type __VLS_Props = { class?: HTMLAttributes["class"]; };
```
`Markdown.vue:4,6,7` passes `surface="glass"` and `variant="shimmer"`. Neither is declared. Both
fall through as raw HTML attributes.

**L-11 (`?source` / `@src` / `vite-source-export` is dead) — CONFIRMED:**
```
$ grep -rn "?source" demo/ assets/ src/            → (no output)
$ grep -rn "@src" demo/ assets/                    → (no output)
```
`vite.config.ts:70-74` keeps the `@src` alias alive on a comment naming *this component's corpus*
(`assets/docs/*.md` "which embed live source snippets via `@src/…?source`") — a corpus that embeds
none. `sourceExportPlugin()` runs first in `defaultPlugins` (`:160`) for every build, serving no
consumer. `useMarkdownHighlighting.ts:71-76` documents this component's code-block behaviour entirely
through that dead plugin, over a corpus with **0 fenced blocks × 11**.

**L-17 (the `.markdown-body` seam is a third-party default) — CONFIRMED:**
```
$ grep -n 'wrapperClasses: "markdown-body"' node_modules/unplugin-vue-markdown/dist/src-5Xwh9b7i.mjs
281:        wrapperClasses: "markdown-body",
$ node -e "console.log(require('./node_modules/unplugin-vue-markdown/package.json').version)"
32.0.0
```
`Markdown({})` passes no options; the class that couples the stylesheet (`:98,104,198`) and
`useMarkdownHighlighting.ts:11` to the build is a package default under a floating `^32.0.0`.

**L-9 — one correction to the record, in the defect's favour and against a possible overread.** I
measured the *dev injection count*, which Revision 3 did not:
```
$ # style tags whose vite dev-id contains the sheet, in the live page
foundation.css → 1     utils.css → 1     (32 style tags total)
```
Vite dedupes by module id, so the double import injects **nothing twice today**. This does not
weaken Revision 3's §A: it measured the *edge weight* (526,224 emitted bytes hanging off
`Markdown.vue:37`), which is the number that governs a module-graph edge, and its severity argument
is about what happens when `App.vue:199-200` changes. Both numbers belong in the record. The
component still holds **both spellings of the same intent four lines apart** — the runtime `import`
at `:37-38` and the compile-time `@reference` at `:79` — and is the **only** file in the tree that
does:
```
$ grep -rln "@reference" demo/ --include="*.vue" | wc -l          → 17
$ grep -rln "@reference" demo/ --include="*.vue" | xargs grep -ln 'import "\.\./.*styles/'
demo/scenes/about/markdown/Markdown.vue        ← a scene leaf
demo/color-picker/App.vue                      ← the boot root
```

**Two prior negatives re-proved, not disturbed.** The value.js import *specifiers* are correct
(`useMarkdownColors.ts:3-4` uses `@mkbabb/value.js/color` and `/css`, both real `exports` keys; a
real npm consumer could write those two lines verbatim; `grep -rn "@src" demo/ assets/` → 0). And
there is exactly one dark store: `useGlobalDark` from `@mkbabb/glass-ui/dark`, zero vueuse `useDark`
anywhere — the brief's named historical suspect at `useMarkdownHighlighting.ts:76` is the *comment
describing the landed cure*, not a live defect.

---

## §V4-B · NEW FINDINGS

### L-18 · MAJOR — the composable is a bespoke resolver for a value `:root` already publishes, and the repo's own design law names the violation

This amends **L-6**. Revision 3 proved `useMarkdownColors` is a hand copy of
`useSafeAccentFn("resting")` and proposed consuming that composable instead. That cure is correct and
insufficient, because it leaves the computation in JavaScript. The computation should not exist at
all: **its result is already a CSS custom property on `:root`.**

**The law it breaks, written in this repo, in law-voice:**

> `demo/DESIGN.md:334` — **The accent axis (R.W3 Lane A / A2).** `--accent-live` is the
> contrast-guarded LIVE picked color — written onto `:root` by App.vue from the library
> `safeAccentColor` path (**the SAME computation `SAFE_ACCENT_KEY` provides; ONE color-resolution
> path, never a bespoke resolver**).

`useMarkdownColors` is a bespoke resolver. It reaches four levels out of the scene into three
separate `color-session` files (`:5-7`), reassembles `inject(INK_AMBIENT_KEY)` +
`useGlobalDark()` + `resolveSurfaceLightnessLive("resting", …)` + `certifyAccentInk(…)`, and arrives
where the boot writer already is:

```ts
// demo/color-picker/composables/boot/useAtmosphereBoot.ts:92-105 — the ONE resolver
provide(SAFE_ACCENT_KEY, safeAccentCss);
provide(INK_AMBIENT_KEY, derivedLightness);
watch(safeAccentCss, css => document.documentElement.style.setProperty("--accent-live", css), { immediate: true });
watch(mutedInkCss,   css => document.documentElement.style.setProperty("--ink-muted",   css), { immediate: true });
```

**Measured, in the live app, at the same instant** — `--accent-live` read off `:root` versus
`--md-color-h2` read off `.markdown-wrapper`'s inline style, for five inputs driven through the URL:

| picked colour | `--accent-live` (`:root`) | `--md-color-h2` (this component) | identical? |
|---|---|---|---|
| `oklch(0.6 0.25 30)` | `oklch(43.412458514795% 0.174109526153 30deg)` | `oklch(43.412458514795% 0.174109526153 30deg)` | **yes, byte-for-byte** |
| `oklch(0.6 0.08 30)` | `oklch(42.215958461165% 0.08 30deg)` | `oklch(42.215958461165% 0.08 30deg)` | **yes, byte-for-byte** |
| `oklch(0.6 0.02 30)` | `oklch(41.536896047182% 0.02 30deg)` | `oklch(42.215958461165% 0.08 30deg)` | no — chroma floored |
| `oklch(0.6 0 30)` | `oklch(41.325579076074% 0 30deg)` | `oklch(42.215958461165% 0.08 30deg)` | no — chroma floored |
| `rgb(128 128 128)` | `oklch(41.322157068913% 0 none)` | `oklch(41.322157068913% 0 0deg)` | same colour, `none` vs `0deg` |

The default app state agrees too — first probe of the session, no URL override:
`--accent-live` = `--md-color-h2` = `oklch(47.118925176164% 0.188447570516 9.83402284231deg)`,
rendering `rgb(170,0,67)` in both readings.

**So the entire composable — 83 lines, three cross-area deep imports, a per-frame
parse → convert → re-serialise → re-parse → gamut-map → WCAG-walk — exists to add ONE chroma floor
(`Math.max(C, 0.08)`, `:52`) to a string the root already carries.** Outside the window
`0 < C < 0.08` it computes a value that is already there. Chroma 0 gives the same rendered colour by
a different serialisation of a powerless hue.

**What that redundancy costs, measured.** `mdColorVars` is a `computed` keyed on the live picked
colour and bound with `:style` on the wrapper (`Markdown.vue:15`), so every recompute rewrites an
inline style attribute on the root of the rendered document:

```
markdown subtree elements under .markdown-wrapper …… 1,352
inline-style rewrites during one ~1 s slider drag ……  198   (MutationObserver on the style attr)
parseCssColor + convertColor, in-page, 5,000 iters ……   3.02 µs/call
                                                        (certifyAccentInk then parses AGAIN,
                                                         gamut-maps, and walks the WCAG floor)
```

198 inline-property rewrites over a 1,352-element subtree per drag, to reproduce a `:root` token that
is being rewritten on the same frames by the boot writer anyway.

**The cure — and why the obvious form of it is wrong.** The repo already consumes `--accent-live`
through relative-colour syntax (`demo/styles/utils.css:79`:
`oklch(from var(--accent-live) l 0.12 calc(h + var(--i,0) * 36deg))`), so the tempting
pure-CSS transposition is:

```css
--md-color-h2: oklch(from var(--accent-live) l max(c, 0.08) h);   /* WRONG — see the last row */
```

I ran it against the shipping JS for the same five inputs, comparing rendered sRGB and WCAG contrast
against the live composited plate:

| picked colour | JS (ships) | CSS form | max channel Δ | contrast Δ |
|---|---|---|---|---|
| `oklch(0.6 0.25 30)` | `rgb(154,8,0)` | `rgb(154,8,0)` | **0** | 0.000 |
| `oklch(0.6 0.08 30)` | `rgb(115,59,51)` | `rgb(115,59,51)` | **0** | 0.000 |
| `oklch(0.6 0.02 30)` | `rgb(115,59,51)` | `rgb(113,58,49)` | 2 | +0.164 |
| `oklch(0.6 0 30)` | `rgb(115,59,51)` | `rgb(112,57,48)` | 3 | +0.280 |
| `rgb(128 128 128)` | `rgb(75,75,75)` | `rgb(110,55,73)` | **35** | +0.334 |

(`CSS.supports("color","oklch(from red l max(c, 0.08) h)")` → `true`, so the syntax is not the
problem.) The last row is the refutation: on an achromatic pick the JS path honours the
powerless-hue rule (`useMarkdownColors.ts:52-53`, chroma → 0, a true grey) while naive CSS invents
0.08 chroma on a hue that means nothing and paints headings pink. **The floor is not a CSS
expression; it is an ink policy with a branch.**

Which tells you where it belongs. It is not a *markdown* policy at all — if a near-grey pick makes
markdown headings read grey, it makes the space trigger and the plate titles read grey too. It is the
**letterform rung of the accent axis**, and that rung already has a published sibling: `--ink-muted`,
stamped by the same writer, in the same `watch` block, four lines below `--accent-live`, described in
its own docstring as "the floor-clamped certified plate ink … the plate-caption / parse-echo voice."

> **Transposition.** Add `accentInkCss` beside `mutedInkCss` in `useContrastSafeColor` — the same
> `certifyAccentInk` call it already makes, with the chroma floor and the powerless-hue branch moved
> in from `useMarkdownColors.ts:50-53` verbatim — and stamp it from the boot writer as `--ink-accent`
> in a third `watch`, three lines, structurally identical to the two above it. Then this component's
> ink is three CSS declarations and no JavaScript:
>
> ```css
> > h2                        { color: var(--ink-accent); }
> > h3, > h4                  { color: color-mix(in oklab, var(--ink-accent) 61.8%, var(--foreground)); }
> mark.cs-name, p > code      { color: var(--ink-accent); }
> ```
>
> `useMarkdownColors.ts` (83 lines) is **deleted**, not migrated. `:style="mdColorVars"` is deleted.
> The 198 inline rewrites become 0; the 1,352-element invalidation becomes 0; the per-frame double
> parse becomes 0; the three cross-area deep imports become 0; the omitted `bumpProbeEpochOnMount`
> (L-6a) becomes structurally impossible to omit because there is nothing left to omit; and
> `resolveSurfaceLightnessLive` loses its *namesake* justification — its docstring cites
> `useMarkdownColors` as the reason it is exported.

This is smaller than Revision 3's MD-c cure (which keeps the composable and swaps its innards for
`useSafeAccentFn`) and it is the one that obeys `DESIGN.md:334` rather than merely reducing the
number of ways it is disobeyed.

---

### L-19 · MINOR — two token names, one value, in the same returned object

```ts
// useMarkdownColors.ts:75-79
return {
    "--md-color-h2":     accent,
    "--md-color-h3":     `color-mix(in oklab, ${accent} 61.8%, var(--foreground))`,
    "--md-color-accent": accent,          // ← the same expression as --md-color-h2
} as Record<string, string>;
```

`--md-color-h2` and `--md-color-accent` are assigned the identical expression and both are consumed —
`--md-color-h2` at `Markdown.vue:163,312`, `--md-color-accent` at `:187,252`. A pure alias, minted
inside the component's own token surface, against edict 2 (no aliases). Verified live: both resolve
to `oklch(47.118925176164% 0.188447570516 9.83402284231deg)`. One name survives the L-18
transposition (`--ink-accent`); the split does not.

The `as Record<string, string>` cast on the same line is the second half of the tell — the object is
cast to a shape that erases exactly the distinction the two keys pretend to make.

---

### L-20 · MINOR — a declared-optional prop its only consumer always supplies, and two masking fallbacks that therefore cannot fire

```ts
// Markdown.vue:44-48
const { module, cssColor, colorSpaceName } = defineProps<{
    module: DocModule;
    cssColor?: string;          // optional
    colorSpaceName?: string;    // optional
}>();
```
```vue
<!-- AboutPane.vue:75-77 (the sole consumer), :54-55 -->
defineProps<{ cssColor: string }>();          <!-- required, one level up -->
<Markdown … :cssColor="cssColor" :colorSpaceName="colorSpaceName" />   <!-- always passed -->
```

`colorSpaceName` is likewise always supplied (`AboutPane.vue:95` computes it with a `??` of its own).
The optionality is never exercised by any caller. Downstream, two CSS fallbacks exist solely to
service the unexercised branch — `mdColorVars` returns `{}` only when `cssColor` is falsy
(`useMarkdownColors.ts:29`):

```css
Markdown.vue:252   color: var(--md-color-accent, var(--foreground));
Markdown.vue:312   border-color: var(--md-color-h2, var(--border));
```

Neither fallback can fire in the shipping app. Edict 2 (no masking fallbacks). Under L-18 both
become unconditional `var(--ink-accent)` reads of a token `foundation.css:231` already gives a
pre-hydration literal — the fallback moves to the one place a fallback is honest, the token's own
declaration.

---

### L-21 · MINOR — the demo has one sanctioned `Result` → exception adapter; this composable hand-rolls a second

The canonical one, with a typed error that preserves the library's diagnostics:

```ts
// demo/color-session/picker-color.ts:97-113
export class PickerColorError extends Error { … }
function valueOrThrow<T, E extends Readonly<{ code: string }>>(result: Result<T, E>): T { … }
export function parsePickerColor(source: string): CssColor {
    const result = parseCssColor(source.trim());
    if (result.ok) return result.value;
    throw new PickerColorError("Invalid CSS color", result.diagnostics);
}
```

`valueOrThrow` is the demo's single unwrapping seam — 16+ call sites in `picker-color.ts` alone
(`:116,120,126-139,…`). `useMarkdownColors.ts` does not use it; it hand-writes three ad-hoc throws:

```ts
:33  throw new Error(`[MarkdownColors] invalid CSS color: ${parsed.diagnostics[0].code}`);
:37  throw new Error(`[MarkdownColors] OKLCH conversion failed: ${converted.error.code}`);
:41  throw new Error("[MarkdownColors] OKLCH lightness and chroma are required");
```

Three differences, each a loss: the error type is bare `Error` (uncatchable by kind), all diagnostics
past `[0]` are discarded, and `diagnostics[0]` is indexed without a guard. And it re-parses a string
the app *already parsed* — `AboutPane` receives a structured `ColorModel` and hands this component a
*serialised* `cssColor: string`, which this composable parses back. A serialise→parse round trip
across a component boundary, per frame. **Reproduction of a user-visible failure: NONE** — the app's
own pipeline only ever supplies strings it just serialised, and `useColorUrl.ts:42-46` already
try/catches the untrusted URL edge, so the throws are defensively unreachable today; `App.vue:50-140`
wraps the panes in `ErrorBoundary` in any case. This is an ownership defect, not a live crash. It
dies with L-18: no parse, no unwrap, no second policy.

---

### L-22 · INFO — `demo/scenes/about/katex/` has zero consumers inside `demo/`

```
$ grep -rn "katex" demo/ --include="*.vue" --include="*.ts" -l
demo/scenes/about/katex/Katex.vue        ← itself
$ grep -hn "import" assets/docs/*.md | sort -u
2:import { Katex } from "../../demo/scenes/about/katex";     ← ×11, the only importers
```

A module that lives in the demo component tree and whose only consumers are **repo-root content
files reaching back into `demo/`** — the inverse edge of L-5, and the reason `Markdown.vue:291-306`
carries a 16-line ruling styling a component it neither imports nor owns. The coupling runs
`Markdown.vue`'s stylesheet → `.katex-display` → `Katex.vue` → `assets/docs/*.md` → back to
`AboutPane.vue`, with no module edge anywhere along it. Under Revision 3's MD-d (content moves to
`demo/scenes/about/docs/`) the import becomes `../../katex` — one hop, inside the scene, one
direction — and the styling rule sits beside the component it styles.

---

## §V4-C · The god-module question, re-answered from the split

408 lines. **76 are the component** (template + script) and **330 are a stylesheet** (`:78-408`,
81% of the file). Measured against that split, the honest answer:

`Markdown.vue` is **not one module wearing several names — it is one stylesheet wearing a
component's name.** The Vue module underneath is 76 lines with three responsibilities (load a doc
module, derive ink, mark a name), two of which should not be there at all: the ink derivation is
L-18's redundant resolver, and the name-marking is L-13's DOM mutation. Strip both and the component
is ~40 lines: `async import → <component :is>`, with a skeleton and an error state. That is not a god
module. It is a correctly-sized component with a 330-line global stylesheet nailed to it, and the
`:deep()` on 100% of the content rules (L-3) is the nail.

The prose sheet is not a *component* concern in any sense that survives inspection: it targets markup
this component never authors, addressed by a class name this component does not own (L-17), for a
corpus this component does not know about. It is a global stylesheet, and `demo/styles/` — where
`hljs.css` already sits as the exact precedent — is its home. No new directory, no new wrapper
component, no new concept: edict 3 satisfied by *moving* rather than *creating*.

---

## §V4-D · Findings index after Revision 4

| # | severity | one line | status |
|---|---|---|---|
| L-1 | BLOCKER | demo module lattice vacuous; subject under zero import restriction | **re-verified (R4)** |
| L-2 | MAJOR | `tsconfig.demo.json#paths` describes a non-existent surface | retained |
| L-3 | MAJOR | `<style scoped>` scoped in name only; `:deep()` on 100% of content rules | retained |
| L-4 | MAJOR | ≥124 style lines target markup the pipeline cannot emit | **re-verified + widened (R4)** — 17 selector families dead in the live DOM; `pre` added (0 fences × 11) |
| L-5 | MAJOR | registry in the consumer; content outside `demo/`; the edge is a cycle | retained |
| L-6 | MAJOR | `useMarkdownColors` hand-copies `useSafeAccentFn("resting")`; epoch bump omitted | **re-verified; AMENDED by L-18** |
| L-7 | MAJOR | `Skeleton surface`/`variant` do not exist in glass-ui 7.0.0 | **re-verified (R4)** |
| L-8 | MAJOR | `demo/ui/` is a 19-dir back-compat shim; 90 vs 18 dual path | retained |
| L-9 | MAJOR | the only scene leaf that runtime-imports the global stylesheets (526 KiB edge) | **re-verified + dev-injection count added (R4)** |
| L-10 | MINOR | barrel ships a dead export (`DocItem`) and `any` | retained |
| L-11 | MINOR | `?source`/`@src`/`vite-source-export` is a dead subsystem documented as live | **re-verified (R4)** |
| L-12 | MINOR | correct only because its single consumer keys it | retained |
| L-13 | MINOR | `onUpdated` driving imperative mutation of another component's DOM | retained |
| L-14 | MINOR | the name promises a general renderer | retained |
| L-15 | INFO | documentation surface has no route, therefore no visual-audit coverage | retained |
| L-16 | MINOR | `ref()` safe only by an unstated ESM invariant | retained |
| L-17 | MAJOR | `.markdown-body` is an undeclared default of a floating third-party range | **re-verified (R4)** |
| **L-18** | **MAJOR** | **bespoke resolver for a value `:root` already publishes; `DESIGN.md:334` forbids it** | **NEW (R4)** |
| **L-19** | **MINOR** | **`--md-color-accent` is a pure alias of `--md-color-h2`** | **NEW (R4)** |
| **L-20** | **MINOR** | **optional prop always supplied; two masking fallbacks that cannot fire** | **NEW (R4)** |
| **L-21** | **MINOR** | **second `Result`→exception adapter; drops diagnostics; re-parses a just-serialised string** | **NEW (R4)** |
| **L-22** | **INFO** | **`demo/scenes/about/katex/` has zero consumers inside `demo/`** | **NEW (R4)** |

---

## §V4-E · Wave amendment — MD-c is replaced

Revision 3's MD-a, MD-b and MD-d stand as written. **MD-c is replaced** by a strictly smaller wave
that deletes rather than migrates. Individually completable, one session, no successor dependency:

| wave | scope | closing evidence |
|---|---|---|
| **MD-c′** | Add `accentInkCss` beside `mutedInkCss` in `useContrastSafeColor.ts` (same `certifyAccentInk` call; the chroma floor + powerless-hue branch moved verbatim from `useMarkdownColors.ts:50-53`); stamp `--ink-accent` from `useAtmosphereBoot.ts` in a third `watch` beside the two existing ones. **Delete `useMarkdownColors.ts` entirely.** Delete `:style="mdColorVars"` (`Markdown.vue:15`) and the `useMarkdownColors` import (`:41,52`). Repoint the four style rules onto `var(--ink-accent)`; collapse `--md-color-h2`/`--md-color-accent` to one name (L-19) and drop both `var(…, fallback)` forms (L-20). | `ls demo/scenes/about/markdown/composables/useMarkdownColors.ts` → ENOENT; `grep -c "md-color" Markdown.vue` → 0; re-run this seat's five-input URL probe and assert rendered `> h2` colour byte-identical for `oklch(0.6 0.25 30)` → `rgb(154,8,0)`, `oklch(0.6 0.02 30)` → `rgb(115,59,51)`, `rgb(128 128 128)` → `rgb(75,75,75)` (**the achromatic row is the gate — it is where the naive CSS form fails by 35/255**); MutationObserver on `.markdown-wrapper` during a 40-step slider drag → **0** style rewrites (was 198); `npm run typecheck` green. |

**Riders unchanged**, with one addition: L-18's `resolveSurfaceLightnessLive` deletion now has three
remaining call sites (`HeroBlob.vue:99`, `ConsoleRail.vue:136`, `useViewAccents.ts:108`) rather than
four, and `HeroBlob.vue` is the one that still omits the epoch bump — that is `picker/`'s wave, not
this one.

**MD-c′ is the highest-leverage single edit in this report**: it removes 83 lines, three cross-area
deep imports, a per-frame double parse, 198 inline-style rewrites per drag over a 1,352-element
subtree, one dead alias token, two dead fallbacks, one duplicate `Result` adapter, and one silent
contract violation — by adding three lines to a file that already contains their exact structural
twin.

---

*Revision 4 evidence, all against `/Users/mkbabb/Programming/value.js` @ `c654824e` (branch
`tranche-u`), no source file modified: five headless-Chromium probes against the live dev server at
`localhost:9000` (DOM/scope-attribute census; 17-family dead-selector census; a four-home token
comparison; a five-input URL-driven divergence matrix; a JS-vs-relative-colour-CSS equivalence matrix
with contrast measurement), one 5,000-iteration in-page `parseCssColor`+`convertColor` benchmark, one
`MutationObserver` count over a scripted 40-step slider drag, one Node run against
`dist/subpaths/{css,color}.js` characterising `convertColor` channel types on achromatic input, one
`eslint --print-config` read, a static construct census over all 11 `assets/docs/*.md`, and reads of
`visual/REPORT.md` and `shots/safari-desktop-light/picker.png` (which show the About card's
`ColorNutritionLabel` above the fold and **no captured pixel of this component** — L-15 confirmed by
inspection).*

---
# REVISION 3 — 2026-07-28

This is the **third run** of the CHALLENGE-L seat at this path. Revision 2 (2026-07-28 10:45) is
**retained in full below the divider** — it is a strong document and nothing in it is discarded. This
revision does three things and only three things:

1. **Independently re-verifies** Revision 2's load-bearing claims, from my own commands, without
   reading its answer first. Verification ledger below.
2. **Amends L-9** from MINOR to MAJOR on a measured number Revision 2 did not take: it sized the
   `foundation.css` edge by its *source* bytes, and the number that governs a module-graph edge is
   what the pipeline *emits*.
3. **Adds two findings** Revision 2 does not contain — one of which (**L-16**) contradicts an item in
   its "What is NOT defective — the negative, proved" section. Its reasoning there is correct; its
   scope is not. I reproduced the failure.

**Verdict unchanged: DEFECTIVE.** Now 17 findings — 1 BLOCKER, 9 MAJOR, 6 MINOR, 1 INFO.
**Strongest defect remains L-1** (the module lattice is vacuous), which I confirmed verbatim.

---

## §V · Verification ledger — Revision 2's claims, re-measured by this seat

I re-ran the claims that carry the report. Every command and its output:

**L-1 (BLOCKER) — CONFIRMED verbatim.** The enforcement layer points at a deleted tree, and the
subject is governed by no import rule.

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ sed -n '232,238p' eslint.config.js
        files: [
            "demo/color-picker/**/*.ts",
            "demo/color-picker/**/*.vue",
            "demo/@/components/**/*.ts",      ← dead
            "demo/@/components/**/*.vue",     ← dead
            "demo/@/lib/**/*.ts",             ← dead
            "demo/@/lib/**/*.vue",            ← dead
        ],

$ npx eslint --print-config <file> | jq -r '.rules["no-restricted-imports"]'
demo/scenes/about/markdown/Markdown.vue                       UNSET
demo/scenes/about/markdown/composables/useMarkdownColors.ts   UNSET
src/value.ts                                                  [2,{patterns:[{group:["@mkbabb/glass-ui",…]}]}]   ← inv-K-1 alive

$ grep -rn 'strictTemplates' tsconfig*.json ; echo "(exit $?)"
(exit 1)
```

**L-7 (glass-ui `Skeleton` props do not exist) — CONFIRMED independently.** glass-ui 7.0.0's
`Skeleton` declares exactly one prop; `Markdown.vue:4,6,7` pass `surface` and `variant`.

```
$ head -4 node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts
import { type HTMLAttributes } from "vue";
type __VLS_Props = {
    class?: HTMLAttributes["class"];
};
```

**L-6(a) (the epoch-bump contract is violated) — CONFIRMED, and I concur with Revision 2's honest
`Reproduction: NONE` label on the symptom.** The contract at `useContrastSafeColor.ts:69-77` is
stated in law-voice; the census holds: 2 of 4 external folders omit the bump, and
`useMarkdownColors.ts` is one of them.

**L-8 (`demo/ui/` is a 19-directory shim tree) — CONFIRMED, with the dual path measured.** Revision 2
proved the tree is vacuous; the sharper fact is that *both spellings are live simultaneously*:

```
$ grep -rn 'from "@mkbabb/glass-ui"' demo/ --include='*.vue' --include='*.ts' | grep -v '^demo/ui/' | wc -l
18
$ grep -rnE 'from "(\.\./)+ui/[a-z-]+"' demo/ --include='*.vue' --include='*.ts' | wc -l
90
$ # files that use BOTH spellings in one file:
GradientVisualizer.vue · MixPane.vue · GenerateControls.vue · ConfigSliderPane.vue
ColorPicker.vue · ColorInput.vue · PaletteSlugBar.vue · PaletteCard.vue          → 8 files
```

90 imports through the shim, 18 direct, **8 files holding both at once**. glass-ui exposes no
`./alert` or `./skeleton` subpath (`'./alert' in exports → False`), so the shim buys not even
tree-shaking granularity — it is a pure second name.

**L-2 (`tsconfig.demo.json#paths` describes a surface that does not exist) — CONFIRMED on the
exports side.** `package.json#exports` has 7 keys and **no `.` root key**:
`./color ./value ./css ./easing ./math ./transform ./quantize`.

**Revision 2's central negative — CONFIRMED.** The subject consumes value.js honestly. `vite.config.ts:41-50`
*generates* the alias set from `package.json#exports`, mapping each key to `conditions.import`
(`dist/subpaths/*.js`), so `useMarkdownColors.ts:3-4` resolves through the **published artifact**, not
`src/`. A real npm consumer could write those two lines verbatim. This is the one axis of the
challenge premise that comes back clean, and it comes back clean for a structural reason, not by luck.

---

## §A · L-9 AMENDED — MINOR → **MAJOR**

Revision 2 sized the rogue stylesheet edge by its source bytes:

> `Markdown.vue:37  import "../../../styles/foundation.css";  // 46,269 bytes`

That is the authored file. A module-graph edge carries what the **pipeline emits**, and
`foundation.css` opens with `@import "tailwindcss"` — it is a compiler entry, not a stylesheet.
Measured against the live dev server, which is the actual transform:

```
$ wc -c demo/styles/foundation.css demo/styles/utils.css
   46269 demo/styles/foundation.css
   10122 demo/styles/utils.css

$ curl -s 'http://localhost:9000/@fs/…/demo/styles/foundation.css?direct' -o /tmp/f.css -w '%{size_download}\n'
526224
$ curl -s 'http://localhost:9000/@fs/…/demo/styles/utils.css?direct'      -o /tmp/u.css -w '%{size_download}\n'
10135
```

**526,224 bytes — 11.4× the source figure, and 514 KiB of compiled Tailwind + glass-ui + animations +
hljs + shell CSS hanging off line 37 of a scene leaf.** The edge is real in the emitted module, not
merely in the source text — confirmed by reading what Vite hands the browser:

```
$ curl -s 'http://localhost:9000/@fs/…/demo/scenes/about/markdown/Markdown.vue' | sed -n '4,5p'
import "/@fs/…/demo/styles/foundation.css?t=1785250921408";
import "/@fs/…/demo/styles/utils.css";
```

Why this is MAJOR and not MINOR: `AboutPane` is `defineAsyncComponent` (`demo/shell/usePaneRouter.ts:69`),
so the app's entire CSS entry is a static dependency of a **lazy chunk's** import graph. Revision 2
called this "harmless today only because the entry already owns the module and Vite dedupes by id"
and drew MINOR. I draw the opposite conclusion from the same fact: a defect whose harmlessness is
contingent on a *co-incidence at another file* (`App.vue:199-200` happening to import the same ids)
is not a minor defect — it is a live trap with a 514 KiB blast radius, and Revision 2 names the
trigger itself: *"delete `App.vue:199-200` and the global sheet silently relocates into the lazy About
chunk."* Severity should track blast radius under the realistic mutation, not under today's accident.

The component holds **both spellings of the same intent four lines apart** — `import` at :37-38
(runtime, wrong) and `@reference` at :79 (compile-time, correct, emits nothing). Cure unchanged:
delete :37-38. It is one edit.

---

## §B · NEW FINDINGS

### L-16 · MINOR (REPRODUCED) — `currentDoc = ref()` is safe only by an ESM invariant the code never states, and the declared type admits the unsafe case

This **amends Revision 2's negative proof.** It asserts, under *"What is NOT defective"*:

> *"`currentDoc = ref(...)` holding a module namespace is **not** a deep-reactivity defect: module
> namespaces are non-extensible, so Vue's `getTargetType` returns `INVALID` and `reactive()` returns
> the target unproxied."*

**The reasoning is correct and I reproduced it.** But it is true of *the one call site*, not of *the
declared contract* — and the contract is the library-structure question this seat owns.

Half one, the negative, measured:

```
$ node docs/.../Markdown/probe-L16-namespace.mjs
dynamic-import namespace isExtensible: false
ref(ns).value isReactive: false   isProxy: false
ref(ns).value === ns  : true
```

Half two — the type that governs the prop is `markdown/index.ts:3`:

```ts
export type DocModule = () => Promise<{ default: any }>;
```

Nothing in that signature requires a module namespace. `() => Promise.resolve({ default: MyComp })`
satisfies it exactly, and `Markdown.vue:45` accepts it as a **public prop**. For that value the deep
`ref` at `Markdown.vue:55` proxies the component. Driving the exact `Markdown.vue:55/60/64-67` shape
with a value the type permits:

```
$ node docs/tranches/V/megatranche/audit/components/Markdown/probe-L16-shallowref.mjs
rendered: <div class="markdown-body">hi</div>
warn count: 1
WARN: [Vue warn]: Vue received a Component that was made a reactive object. This can lead to
      unnecessary performance overhead and should be avoided by marking the component with
      `markRaw` or using `shallowRef` instead of `ref`.
```

The control in the same probe isolates the cause — `ref(plainObj).value.default isReactive: true`
versus `isReactive: false` for the namespace. The proxying is entirely a function of which of the two
permitted shapes arrives.

**Mechanism.** The correctness of `Markdown.vue:55` is not a property of `Markdown.vue`. It is a
property of `AboutPane.vue:82-92` choosing to pass `() => import(…)` — and of an ESM spec guarantee
(`isExtensible === false` on namespace objects) that appears nowhere in the type, the prop, or a
comment. An invariant that lives only in the caller and only by accident is exactly what standing
edict 7 asks to be made structural. This also gives Revision 2's L-10 (`DocModule`'s `any`) a
concrete cost it lacked: the `any` is not merely loose, it is the hole the reactive-component case
comes through.

**Reproduction:** `docs/tranches/V/megatranche/audit/components/Markdown/probe-L16-shallowref.mjs`, pasted above — `renderToString` of the verbatim
`ref` → `await module()` → `computed(() => .default)` → `h(...)` chain.
**Severity MINOR** because no live call site triggers it; it is a latent contract hole, not a current
misrender. I record it at MINOR deliberately rather than inflating it.
**Cure:** `shallowRef` at `Markdown.vue:55` — one word, and the whole declared type domain becomes
safe instead of one call site. Under Revision 2's greenfield lattice the type becomes
`Record<DisplayColorSpace, () => Promise<Component>>` and `any` dies with it; `shallowRef` is then
correct by construction rather than by caller discipline.

### L-17 · MAJOR — the `.markdown-body` seam is an undeclared default of a floating third-party range, and all four of its dependents fail silently

Revision 2's L-3 and L-4 both work *from the rules inward* — L-3 faults `:deep()` universality, L-4
proves `Markdown({})` configures no markdown-it plugins. Neither names the **contract** defect that
sits under both: the single class name that couples this component to the build pipeline is owned by
neither, and is not written down anywhere in this repo.

The producer — a package default, not a repo decision:

```
$ grep -n 'Markdown(' vite.config.ts
162:    Markdown({}),                                    ← zero options

$ grep -n 'wrapperClasses: "markdown-body"' node_modules/unplugin-vue-markdown/dist/src-5Xwh9b7i.mjs
281:		wrapperClasses: "markdown-body",

$ sed -n '160,167p' node_modules/unplugin-vue-markdown/dist/types-CAs0WWKP.d.mts
  wrapperDiv?: boolean;
  /** Class names for wrapper div
   *  This option will be ignored if `wrapperDiv` is set to `false`
   *  @default 'markdown-body' */
  wrapperClasses?: …

$ python3 -c "…" # dependency range
devDependencies  unplugin-vue-markdown            ^32.0.0          ← floating minor
```

The consumers — four in-repo sites depend on the literal, and **not one of them can report its own
absence**:

| # | site | mechanism | failure mode if the default changes |
|---|---|---|---|
| 1 | `Markdown.vue:98` | `.markdown-body[data-v-…]` (attribute-scoped) | rule stops matching — **silent** |
| 2 | `Markdown.vue:104` | `.markdown-wrapper[data-v-…] .markdown-body` | ~100 typography rules die — **silent** |
| 3 | `Markdown.vue:198` | second, identical selector block | the rest die — **silent** |
| 4 | `useMarkdownHighlighting.ts:11` | `container.querySelector(".markdown-body")` | `:12 if (!body) return;` — colour-space marking vanishes — **silent** |

Verified from the compiled CSS the dev server emits, not from the source text:

```
$ curl -s '…/Markdown.vue?vue&type=style&index=0&scoped=…&lang.css' | python3 -c '… json-decode __vite__css …'
bytes: 10246
'.markdown-body[data-v-b622b24b] {'
'.markdown-wrapper[data-v-b622b24b] .markdown-body {'
'.markdown-wrapper[data-v-b622b24b] .markdown-body {'      ← emitted twice
```

Two things this makes precise that Revision 2 leaves implicit:

**(a) Two mechanisms for one concept.** Site 1 relies on Vue propagating the *parent's* scope id onto
a *child component's root element*; sites 2-3 rely on ordinary descendant matching. Both currently
hit the same element. Site 1 additionally dies if the `.md` wrapper ever renders a fragment or
`wrapperDiv: false` is ever set — the identical class of silent-dead-rule failure the SFC's own
comment (`:81-97`) documents having already suffered once for the inner elements. The cure landed for
the inner elements and left the root on the old mechanism.

**(b) The seam has no owner.** The class is produced by `unplugin-vue-markdown@^32.0.0`, consumed by
`Markdown.vue`'s stylesheet and by `useMarkdownHighlighting.ts`'s DOM query, and configured by
nobody. A caret range means an upstream minor can retire the default; the repo's response would be
four silent regressions and a green CI. `Markdown({})` is not a neutral call — it is an abstention
from declaring the contract the whole feature stands on.

**Reproduction:** the four greps and the compiled-CSS decode above. The *breakage* is a hypothesis —
I did not mutate `vite.config.ts` (this seat may not edit source), so the failure is proved by
mechanism and by the `if (!body) return;` early-out at `useMarkdownHighlighting.ts:12`, not by a
staged upstream bump.
**Cure — one line, and it is the same line that cures Revision 2's L-4:**

```ts
// vite.config.ts:162 — declare the seam this repo actually depends on
Markdown({ wrapperClasses: "markdown-body" }),
```

Under the greenfield lattice the seam disappears rather than being declared: the stylesheet moves to
`demo/styles/prose.css` keyed on a class the repo owns, and `markSpaceName.ts` receives the container
element from `useTemplateRef` instead of re-finding it by string. A concept that no longer needs a
name shared across a package boundary cannot drift across one.

---

## §C · The god-module question, re-answered

I concur with Revision 2 and will state it more flatly, because it is the answer to the brief's
framing question. Re-measured:

```
$ awk 'BEGIN{t=0;s=0} /^<style/{st=1} {t++; if(st)s++} END{print "total",t; print "style",s; print "script+template",t-s}' \
      demo/scenes/about/markdown/Markdown.vue
total 408
style 331          (81.1%)
script+template 77 (18.9%)
```

**408 lines is not one module wearing one name — it is 77 lines of component with a 331-line
stylesheet stapled to it because the stylesheet has no home.** So the answer to "is this a god
module" is *no, and proposing a component split would be the wrong cure* — there is no conflated
behaviour to separate. It is a **relocation**, and it is mechanical. Revision 2's MD-a/MD-b waves are
the correct shape and each is individually completable under L-1: MD-a moves the block verbatim and
closes on `grep -c ":deep(" = 0` plus a byte-identical computed-style diff; MD-b deletes dead rule
bodies and closes on the same diff. Neither depends on the other landing first.

My two additions slot in without new waves:

- **L-16** → one word inside **MD-d** (`ref` → `shallowRef`, alongside the `DocModule`/`any` deletion
  that wave already owns). Closing evidence: `probe-L16-shallowref.mjs` emits `warn count: 0`.
- **L-17** → one line inside **MD-a** (`Markdown({ wrapperClasses: … })`, landing beside the
  stylesheet move that consumes the same class). Closing evidence: `grep -c 'wrapperClasses' vite.config.ts` = 1.
- **L-9 at MAJOR** → unchanged cure, unchanged wave (MD-a, delete :37-38). Only the priority moves.

---

## §D · Findings index after Revision 3

| id | sev | finding | status |
|---|---|---|---|
| L-1 | BLOCKER | demo module lattice vacuous; subject under zero import restriction | **re-verified by this seat** |
| L-2 | MAJOR | `tsconfig.demo.json#paths` describes a non-existent surface | re-verified (exports side) |
| L-3 | MAJOR | `<style scoped>` scoped in name only; `:deep()` on 100% of content rules | retained |
| L-4 | MAJOR | ≥124 style lines target markup the pipeline cannot emit | retained |
| L-5 | MAJOR | registry in the consumer; content outside `demo/`; the edge is a cycle | retained |
| L-6 | MAJOR | `useMarkdownColors` hand-copies `useSafeAccentFn("resting")`; epoch bump omitted | **re-verified** |
| L-7 | MAJOR | `Skeleton surface`/`variant` do not exist in glass-ui 7.0.0 | **re-verified** |
| L-8 | MAJOR | `demo/ui/` is a 19-dir back-compat shim; 90 vs 18 dual path, 8 files hold both | **re-verified + measured** |
| **L-9** | **MAJOR** ↑ | rogue global-stylesheet import — **526,224 bytes emitted**, in a lazy chunk | **AMENDED from MINOR** |
| L-10 | MINOR | barrel ships a dead export (`DocItem`) and `any` | retained (see L-16) |
| L-11 | MINOR | `?source`/`@src`/`vite-source-export` is a dead subsystem documented as live | retained |
| L-12 | MINOR | correct only because its single consumer keys it | retained |
| L-13 | MINOR | `onUpdated` driving imperative mutation of another component's DOM | retained |
| L-14 | MINOR | the name promises a general renderer | retained |
| L-15 | INFO | documentation surface has no route, therefore no visual-audit coverage | retained |
| **L-16** | **MINOR** | `ref` safe only by an unstated ESM invariant; declared type admits the proxied case | **NEW — reproduced** |
| **L-17** | **MAJOR** | `.markdown-body` seam is an undeclared default of `^32.0.0`; 4 silent dependents | **NEW** |

*Revision 3 probes, all read-only, against `/Users/mkbabb/Programming/value.js` @ `c654824e`
(branch `tranche-u`): 3 `eslint --print-config` reads; 5 Vite dev-server transform fetches
(`Markdown.vue`, its compiled scoped-style module, `foundation.css?direct`, `utils.css?direct`,
`assets/docs/lab.md`); 2 Node/Vue reactivity probes (`probe-L16-namespace.mjs`, `probe-L16-shallowref.mjs` — the second
reproducing the Vue warning via `@vue/server-renderer`); `package.json`/`exports` and glass-ui
`exports` enumeration; the `unplugin-vue-markdown@32.0.0` default-options read; the `demo/ui/` census;
one read of `visual/REPORT.md` and `shots/safari-desktop-light/picker.png`. The browser MCP was held
by another seat, so the dev server's own transform pipeline served as the probe where a DOM read was
not decisive. **No source file was modified.**
Revision 2 is retained below in full.*

---
---

# RETAINED — REVISION 2 (2026-07-28 10:45)

*Preserved verbatim. Read §V and §A above for the items this seat re-measured or amended; L-16 and
L-17 in §B are additions, and L-16 narrows the "Vue 3.5 idioms (edict 7) correct" bullet in its
"What is NOT defective" section.*

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. Declared, not inherited. No defect on this axis.

---

## Status of this document

**This revision supersedes the 2026-07-24 CHALLENGE-L report at this path.** It is a re-run of the
same seat. Every finding carried forward was **independently re-measured** by this seat; nothing is
inherited on the prior seat's word.

One prior finding does not survive. It was the prior report's **strongest** claim:

> *Prior L-1 (BLOCKER): "the demo typechecks `@mkbabb/value.js/css` against the published tarball
> and runs against the local build … 9 demo files typecheck against the tarball … the V·π parser
> work is invisible to the demo typecheck."*

**REFUTED.** That result is an artifact of the probe, not a property of the repo — §R below carries
the counter-evidence. The *underlying* config drift is real, but its blast radius is nil; it is
re-filed here as **L-2 (MAJOR)**, not a blocker. Correcting a false blocker on my own axis is part
of this seat's job, so it leads the report.

---

## Verdict

**DEFECTIVE.** 14 findings — 1 BLOCKER, 7 MAJOR, 5 MINOR, 1 INFO.

The premise holds, though not for the headline reason the prior seat gave. The subject is a scene
leaf sitting on a lattice that is **unenforced by construction** (L-1: the subject file is under
*no* import restriction and `strictTemplates` is off everywhere), which is what licenses everything
below it: a 331-line stylesheet with no home but this SFC (L-3), **≥124 lines of which style markup
the build pipeline cannot emit** (L-4), a content registry living in the consumer and content
living outside `demo/` in a directed cycle (L-5), a composable hand-copied from `color-session`
plus an export minted to enable the copy (L-6), and a glass-ui call whose props **do not exist**
(L-7).

Measured composition of the file:

```
$ awk '…' demo/scenes/about/markdown/Markdown.vue
total:    408
template:  32   (7.8%)
script:    43  (10.5%)
style:    331  (81.1%)
```

Is it a god module? **Not in the sense the brief anticipated.** It is not 408 lines of conflated
behaviour — it is **43 lines of component carrying a 331-line stylesheet that has nowhere else to
live**. That single fact determines the whole cure: this is not a decomposition problem, it is a
*relocation* problem, and it is mechanical.

**Strongest surviving defect: L-1.** It is the enabling condition. Every other finding is something
a live lattice would have refused.

---

## §R · The refutation — why prior L-1 does not survive

The prior report reproduced its finding with a probe file written to `/tmp`:

```bash
printf '…' > /tmp/probe.ts
printf '{"extends":"…/tsconfig.demo.json",…,"include":["probe.ts"]}' > /tmp/tsconfig.probe.json
npx tsc -p /tmp/tsconfig.probe.json 2>&1 | grep -E "value\.js/(css|color)"
```

I ran that probe verbatim. It reproduces:

```
'@mkbabb/value.js/color' → '/Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts'
'@mkbabb/value.js/css'   → '/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts'
                            with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'
```

Then I ran the **real demo program against the real subject file**:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution
======== Resolving module '@mkbabb/value.js/css' from
         '/Users/mkbabb/Programming/value.js/demo/scenes/about/markdown/composables/useMarkdownColors.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
File '…/demo/scenes/about/markdown/composables/package.json' does not exist …
File '…/demo/scenes/about/package.json' does not exist …
File '/Users/mkbabb/Programming/value.js/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
File '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' exists - use it as a name resolution result.
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

**The repo's own `dist/`. Not the tarball.** And across the entire demo program there is exactly
one resolution target — zero demo files reach `node_modules`:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution 2>/dev/null \
  | grep "Module name '@mkbabb/value.js/css' was successfully resolved" | sort -u
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts' with Package ID … ========
        ← ONE line. All 10 import sites. The repo build.
```

**Mechanism of the artifact.** TypeScript's `exports`-based self-resolution walks up from the
*importer* to the nearest ancestor `package.json` whose `name` matches the specifier's package. Any
file inside the repo walks up to the repo's own `package.json` (`name: "@mkbabb/value.js"`,
`exports` contains `./css`) and self-resolves to `./dist/subpaths/css.d.ts`. A file in `/tmp` has no
such ancestor, so resolution falls through to `node_modules` and lands on the installed tarball.
The probe's *location* produced the finding.

The `Package ID '…@4.0.0'` annotation misled the prior seat: it is TypeScript labelling the package
*identity* (name@version read from the resolved package's `package.json`), not evidence of a
`node_modules` hop. The `/color` line lacks it only because `paths` short-circuits before package
identity is established.

**Consequently retracted:** the `Color_2` type-fork argument, the "9 demo files typecheck against
the tarball" blast radius, and "the gate that is supposed to catch a parser regression cannot see
the parser." The demo typechecks against the working tree, including `src/css/`. V·π's parser work
**is** visible to the demo typecheck.

---

## BLOCKER

### L-1 · BLOCKER — the demo module lattice is documentation, not law; the subject is under zero import restriction

`eslint.config.js:232-301` carries three `no-restricted-imports` objects encoding the demo's module
graph. Every one is keyed on a tree W43 deleted:

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ grep -n "@components/custom\|demo/@" eslint.config.js
235:            "demo/@/components/**/*.ts",
236:            "demo/@/components/**/*.vue",
237:            "demo/@/lib/**/*.ts",
238:            "demo/@/lib/**/*.vue",
247:                                "@components/custom/palette-browser/**/*.vue",
```

Vacuous twice over: no file matches the `files` glob (the directory does not exist), and no import
could match the banned patterns (`tsconfig.demo.json:32-34` records that every `@…` project alias
was killed). Measured effective config:

```
$ npx eslint --print-config <file> | jq '.rules["no-restricted-imports"]'
src/value.ts                                                  [2,{"patterns":[{"group":["@mkbabb/glass-ui",…]}]}]   ← inv-K-1 LIVE
demo/scenes/about/markdown/Markdown.vue                       UNSET/OFF
demo/scenes/about/markdown/composables/useMarkdownColors.ts   UNSET/OFF
```

Only the *library's* `inv-K-1` is alive. **The subject component and its composables are governed by
no import rule whatsoever.**

`vue-tsc` is equally blind on the adjacent axis:

```
$ grep -rn "strictTemplates" tsconfig*.json
(no match — default false)
```

so unknown component props are never reported. That is the exact mechanism behind L-7.

This is the BLOCKER because it is the *enabling condition*. L-5's cross-`demo/` cycle, L-6's 4-hop
reach into `color-session` internals, L-9's global-stylesheet import — none of them could have
landed against a live lattice. Findings L-2…L-14 are symptoms; this is the disease.

Mechanism: an enforcement layer left pointing at a tree that was renamed out from under it, never
re-keyed, never re-measured.
Reproduction: the three commands above.
Cure: re-key the three objects onto the real tree
(`demo/{color-session,palettes,picker,platform,scenes,shared,shell,ui,workbenches}/**`) and state
the lattice as **relative-depth** bans — a scene leaf may not climb out of its scene
(`../../../../`), a feature may not import from `color-picker/` (the boot shell). Enable
`vueCompilerOptions.strictTemplates`. Both are mechanically verifiable and need no design ruling.

---

## MAJOR

### L-2 · MAJOR — one public surface, two resolution mechanisms; the *declared* one is factually false

*(This is what survives of prior L-1, at correct severity.)*

`useMarkdownColors.ts` imports the library on adjacent lines, and TypeScript resolves them by two
different mechanisms:

```ts
demo/scenes/about/markdown/composables/useMarkdownColors.ts:3  import { convertColor }  from "@mkbabb/value.js/color";  // ← paths hit
demo/scenes/about/markdown/composables/useMarkdownColors.ts:4  import { parseCssColor } from "@mkbabb/value.js/css";    // ← paths MISS → exports self-resolution
```

Both land on the repo build (§R), so there is no type/runtime skew. The defect is that
`tsconfig.demo.json#paths` — whose own comment asserts it enumerates *"the 7 subpath barrels"* and
*"a CLOSED 8-key set"* — describes a surface that does not exist:

| `paths` key | in `package.json#exports`? | target file |
|---|---|---|
| `@mkbabb/value.js` | **NO** (`.` key does not exist) | `dist/index.d.ts` — **MISSING** |
| `@mkbabb/value.js/parsing` | **NO** | `dist/subpaths/parsing.d.ts` — **MISSING** |
| `@mkbabb/value.js/units` | **NO** | `dist/subpaths/units.d.ts` — **MISSING** |
| `/color` `/math` `/easing` `/transform` `/quantize` | yes | present |
| **`./css`** — 10 demo import sites | yes | **NO ENTRY** |
| **`./value`** | yes | **NO ENTRY** |

```
$ for f in dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts \
           dist/subpaths/css.d.ts dist/subpaths/value.d.ts; do …
dist/index.d.ts                    MISSING
dist/subpaths/parsing.d.ts         MISSING
dist/subpaths/units.d.ts           MISSING
dist/subpaths/css.d.ts             EXISTS
dist/subpaths/value.d.ts           EXISTS
```

7 real keys, 8 declared, intersection 5. Three phantom entries naming absent files; two real keys
undeclared.

The bitter part: `vite.config.ts:37-50` **generates** the runtime alias set from
`package.json#exports` precisely so *"the alias set can never drift from the exports map"* — and the
sibling mirror that must agree with it is hand-rolled and has drifted. Single-sourcing was applied
to one of two mirrors; that asymmetry is the bug.

Mechanism: two descriptions of one public surface, one generated, one hand-copied.
Reproduction: the table above; the `sort -u` trace in §R.
Cure — **simpler than the prior report's**: do not generate the paths map, **delete it**. Remove all
seven `@mkbabb/value.js*` entries from `tsconfig.demo.json`. §R proves `package.json#exports`
already resolves every key correctly and exhaustively from inside the repo. Zero entries = zero
drift surface = no generator to maintain. (Retain the `vue`/`@vue/*` entries; those pin instance
identity and are load-bearing.)

### L-3 · MAJOR — the `<style scoped>` block is scoped in name only; `:deep()` on 100% of content rules is the tell

Measured live (headless Chromium against `:9000`, `.markdown-wrapper` on the home route):

```json
"wrapperDataV": ["data-v-b622b24b"],
"bodyDataV":    ["data-v-b622b24b"],
"h2DataV":      []
```

The wrapper and the compiled `.md` component's root carry the scope attribute. **No content element
does.** Which is why all ~50 content rules in lines 98-407 sit inside `:deep(.markdown-body)`. The
file's own comment (lines 81-97) presents this as a *cure*: *"Every content rule now routes through
`:deep()`."*

It is not a cure — it is the diagnosis. A scoped block in which **every** rule must escape its own
scoping is a global stylesheet paying a per-component tax for nothing:

- `.markdown-wrapper :deep(.markdown-body)` appears **twice** — line 104 and line 198 — with no
  semantic boundary between them. One rule set, split at an arbitrary line.
- `demo/styles/foundation.css:81` already carries `@import "./hljs.css";` — the exact precedent for
  a sibling `@import "./prose.css";`.
- Lines 94-96 claim the `--phi-*` rungs *"live in `style.css :root`"*. There is no `style.css`
  anywhere under `demo/` (`find demo -name style.css` → nothing); they are at
  `demo/styles/foundation.css:458-462`. The comment documents a file that does not exist.

Mechanism: SFC-local styling used as the home for a design-system concern; `:deep()` normalised from
rare exception into permanent posture.
Reproduction: the DOM census above; 331 style lines against 43 script lines.
Cure: extract to `demo/styles/prose.css`, wired beside the hljs precedent. **Every `:deep()`
disappears**, the split heals, and L-9's rogue imports go with it.

Note on ownership: glass-ui@7.0.0 exports 73 subpaths and **none** is `prose`/`typography`/`markdown`
(`node -e "Object.keys(require('@mkbabb/glass-ui/package.json').exports)"`). The φ ladder and
`--md-color-*` are value.js-doc-specific and would not earn their keep in the shared design system,
so edict 4 is satisfied by a demo style layer — the same tier as the existing `animations.css`,
`utils.css`, `hljs.css`. This is a relocation, not a new abstraction (edict 3).

### L-4 · MAJOR — ≥124 style lines target markup this pipeline cannot emit, and the root cause is one line of build config

The prior seat measured the dead set from the corpus. It missed the *cause*, which makes the
finding structural rather than editorial:

```
$ grep -n "Markdown(" vite.config.ts
162:    Markdown({}),

$ grep -rn "markdownItSetup\|markdownItOptions\|wrapperClasses" vite.config.ts plugins/
(no output)
```

`unplugin-vue-markdown` with **no plugins configured**. There is no TOC plugin, no footnote plugin,
no task-list plugin, no deflist plugin, no container/callout plugin in this repo. The markup those
rules target is **not producible by this pipeline at all** — independent of what any author writes.
The corpus census then closes the remainder. All 11 `assets/docs/*.md` (files-hit of 11):

| construct | hits | | construct | hits |
|---|---|---|---|---|
| `## ` h2 | **11** | | `# ` h1 | 0 |
| `### ` h3 | **11** | | `#### ` h4 | 0 |
| `---` hr | **11** | | `##### `/`###### ` | 0 |
| inline `` ` `` | **11** | | ```` ``` ```` fence | **0** |
| `<Katex …>` | **11** (64 tags) | | `> ` blockquote | 0 |
| `](…)` link | 3 files | | `![…](…)` image | 0 |
| | | | `\|` table | 0 |
| | | | `: ` deflist · `- [ ]` task · `[^…]` footnote · `[[toc]]` · `callout` | 0 |

Dead rule **bodies**, by line range in `Markdown.vue`:

| lines | selector | why dead |
|---|---|---|
| 142-146 | `> h5, > h6` | no h5/h6 |
| 157-159 | `> h1` | no h1 |
| 171-174 | `> h4` | no h4 |
| 176-178 | `> h5` | no h5 |
| 180-182 | `> h6` | no h6 |
| 234-238 | `pre` | **zero code fences in 11/11** |
| 256-260 | `blockquote` | none |
| 263-276 | `table, th, td` | none |
| 280-283 | `img` | none |
| 316-329 | `dl, dt, dd` | no plugin, no source |
| 332-342 | `ul.contains-task-list` | no plugin, no source |
| 345-357 | `.callout` `.warning` `.danger` | no plugin, no source |
| 360-378 | `.footnotes` `.footnote-ref` `.footnote-item` | no plugin, no source |
| 386-406 | `.toc` (+ ul/li/a) | no plugin, no source |

**124 rule-body lines = 37% of the style block, 30% of the file** — a floor. Adding the dead
*members* of live selector lists (h1/h4/h5/h6 in the `:first-child` list at 127-134; **14 of the 15**
pairs in the adjacency matrix at 149-155, where only `> h2 + h3` can ever match) and the
multi-line rulings attached to dead rules (`AB-3` at 229-233, the `F6 ONE-grammar law` at 380-385)
reaches the prior seat's 142 / 42.9%. Both numbers are floors on the same fact.

Two corrections to the prior seat's census, from re-measurement:

- **`a` (links) is NOT dead.** The prior DOM probe read `"a": 0` — but it sampled the *lab* doc
  only. Corpus-wide there are 3 links, in `lch.md:13`, `xyz.md:13`, `oklch.md:13`. A single-document
  DOM census is not a corpus census; the rule stays.
- **`.katex-display` is NOT dead**, and for a non-obvious reason. `Katex.vue:22` declares
  `displayMode = true` as the **default**. Of 64 `<Katex>` tags, 27 pass `:display-mode="false"`;
  the remaining 37 take the default and render display blocks. The AB-1 selector at line 301 is
  live. (Both seats agree here; recording the mechanism because `grep '^\$\$'` returns 0 and would
  otherwise suggest the opposite.)

The `pre` row deserves its own line: `useMarkdownHighlighting.ts:71-74` asserts as fact that *"Code
blocks are pre-formatted and pre-highlighted at build time by the vite-source-export plugin."*
There are no code blocks, and the plugin has no consumers (L-11). Three layers of one fiction.

Cure: delete the 14 blocks plus the rulings attached to them. If a doc ever needs tables or fences,
the markdown-it plugin config and the rule land in one change — that is the correct coupling.

### L-5 · MAJOR — the registry lives in the consumer, the content lives outside `demo/`, and the edge is a cycle

```ts
demo/scenes/about/AboutPane.vue:79     type MarkdownSpace = "rgb"|"hex"|…|"kelvin";
demo/scenes/about/AboutPane.vue:81-93  const markdownModules: Record<MarkdownSpace, DocModule> = {
                                          rgb: () => import("../../../assets/docs/rgb.md"), … }
demo/scenes/about/AboutPane.vue:97     markdownModules[model.value.selectedColorSpace as MarkdownSpace]
```

Three defects in one place.

**(a) Split ownership.** The `markdown/` module owns the *type* of a doc loader but cannot resolve
its own content; a consumer must hand it one. There is exactly one consumer, so the indirection buys
nothing and costs the registry its home.

**(b) A parallel enumeration of the colour spaces.** `MarkdownSpace` is a hand-copy of
`DisplayColorSpace` (`demo/color-session/color-model.ts:31`), and the `as MarkdownSpace` cast at
line 97 is load-bearing proof they are not known to agree. Add a space to `DisplayColorSpace` and
the lookup returns `undefined`, the `v-if` at `AboutPane.vue:51` silently hides the guide, and
nothing errors.

**(c) A directory-level dependency cycle across the `demo/` boundary:**

```
demo/scenes/about/AboutPane.vue:82  → import("../../../assets/docs/rgb.md")     [repo-root assets/]
assets/docs/lab.md:2                → import { Katex } from "../../demo/scenes/about/katex";   (11/11 identical)
```

`assets/` contains nothing but `docs/`, whose 11 files are consumed by exactly one component — and
those files are compiled as **Vue SFCs** (`vite.config.ts:161`,
`Vue({ include: [/\.vue$/, /\.md$/] })`; `assets/docs/lab.md:1` is `<script setup>`). They are demo
components living outside `demo/`, importing back into `demo/scenes/about/`. The content is
un-relocatable: moving `scenes/about/katex/` breaks 11 files outside the app tree.

Cure: `assets/docs/` → `demo/scenes/about/docs/` (they are demo components; nothing else reads
them), Katex import becomes `"../katex"` — one hop, no inversion — and the registry moves behind the
module seam keyed off the canonical union:

```ts
// demo/scenes/about/docs/registry.ts
import type { DisplayColorSpace } from "../../../color-session/color-model";
export const colorSpaceDocs: Record<DisplayColorSpace, () => Promise<Component>> = { … };
```

`Record<DisplayColorSpace, …>` is exhaustive by construction: a new space becomes a compile error,
and the `as` cast dies.

### L-6 · MAJOR — `useMarkdownColors` is a hand copy of `useSafeAccentFn("resting")`, and a `color-session` export exists only to enable the copy

The canonical composable:

```ts
// demo/color-session/useContrastSafeColor.ts:345-365
export function useSafeAccentFn(surface: InkSurface = "page") {
    const { isDark } = useGlobalDark();
    const ambient = inject(INK_AMBIENT_KEY)!;
    bumpProbeEpochOnMount();
    function safeCss(css: string, floor?: number): string {
        return certifyAccentInk(css, surfaceLightnessNow(surface, ambient.value, isDark.value), floor);
    }
    return { safeCss };
}
```

The copy — a 4-hop reach out of the scene into three separate `color-session` files
(`useMarkdownColors.ts:5-7`), assembling the identical recipe:

```ts
// useMarkdownColors.ts:18,25,44-73
const { isDark } = useGlobalDark();                                        // ← same
const ambient = inject(INK_AMBIENT_KEY)!;                                  // ← same
                                                                           // ← bumpProbeEpochOnMount() MISSING
const bgL = resolveSurfaceLightnessLive("resting", ambient.value, isDark.value);
const accent = certifyAccentInk(`oklch(${L} ${headingC} ${headingH})`, bgL);
```

And the export that makes the copy possible:

```ts
// demo/color-session/useContrastSafeColor.ts:370-376
export function resolveSurfaceLightnessLive(surface, ambientL, dark): number {
    return surfaceLightnessNow(surface, ambientL, dark);      // a one-line pass-through
}
```

A **pure alias for a private function**, exported so three call sites can re-implement the composable
beside it — and its docstring names this component as the beneficiary: *"for composables that fold
the referent into their own computation (`useMarkdownColors`) rather than certifying a whole colour
through `safeCss`."* But `useMarkdownColors` **does** certify a whole colour through
`certifyAccentInk` — the identical call `safeCss` makes, with identical arguments. The stated
justification does not hold for the consumer it was minted for. Edict 2 (no aliases, no dual paths).

Two consequences the prior report did not reach:

**(a) The epoch-bump contract is violated.** `useContrastSafeColor.ts:69-77` states it in law-voice:
a consumer that folds `resolveSurfaceLightnessLive` into its own computed *"**must** register the
mount bump from its setup, or its first (possibly detached/pre-style) probe result caches until some
OTHER consumer happens to bump the epoch."* Measured:

```
$ grep -rn "bumpProbeEpochOnMount" demo/
ConsoleRail.vue:133              ✓
useViewAccents.ts:89             ✓
useContrastSafeColor.ts:300,:348 ✓ (internal)
useMarkdownColors.ts             ✗ ABSENT
HeroBlob.vue:99                  ✗ ABSENT
```

Two of four external folders violate the module's own stated contract.
***Reproduction: NONE — this is a hypothesis as to symptom.*** In the live app the boot writer's
`useContrastSafeColor` bumps the epoch at App mount, which self-heals the first read; I did not
reproduce a wrong paint. The **contract violation** is proven; the **symptom** is not.

**(b) Two failure policies for one parse.** `certifyAccentInk` treats an unparseable colour as
benign — `demo/color-session/ink.ts:136`, `if (!accent) return css;`. Four frames up the same call
chain, `useMarkdownColors.ts:33/37/41` **throws**, from inside a `computed` the template reads via
`:style="mdColorVars"`, on a value driven by the live picked colour. value.js's published contract
is *"immutable, failure-explicit"*; a consumer that answers `!parsed.ok` with `throw` re-introduces
the exception channel at the render boundary. One concept, two policies, the stricter one wired to
render.

Cure:

```ts
const { safeCss } = useSafeAccentFn("resting");            // bump + inject + isDark, once
const accent = safeCss(`oklch(${L} ${headingC} ${headingH})`);
```

3 deep imports → 1; `mdColorVars` returns `{}` on unparseable input and inherited ink stands. Then
**delete `resolveSurfaceLightnessLive`** and migrate `HeroBlob.vue` / `ConsoleRail.vue` /
`useViewAccents.ts` the same way — the epoch bump becomes structurally impossible to omit.

### L-7 · MAJOR — the component calls a glass-ui API that does not exist, and nothing can catch it

```html
<!-- Markdown.vue:2-8 -->
<!-- R.W4 Lane A / A2 (U20): glass shimmer bones, not opaque pulse blocks. -->
<Skeleton surface="glass" variant="shimmer" class="h-12 w-12 rounded-full" />
```

glass-ui 7.0.0's `Skeleton` declares exactly one prop — verified at
`node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts`:

```ts
import { type HTMLAttributes } from "vue";
type __VLS_Props = { class?: HTMLAttributes["class"] };
```

`surface` and `variant` are undeclared: they fall through onto the root as non-standard HTML
attributes with zero effect. The design intent named in the comment is expressed through an API that
does not exist. It *looks* right only because shimmer is glass-ui's unconditional default — the
props would keep "working" if glass-ui changed it.

Second-order, and the interesting half: glass-ui's skeleton fills with `var(--muted)`, while this
component's own style block (`Markdown.vue:229-232`) rules that content chips seat on `--well-bg`,
*"never the parallel `--muted` species (which stepped OPPOSITE the well in dark)."* The skeleton it
ships sits on precisely the banned tone — and the component believes it already cured that via props
that do not exist.

Nothing catches this because `strictTemplates` is off everywhere (L-1). Enabling it makes this a
compile error. Per edict 4 the fix is a glass-ui variant, relayed to the BH inbox — not a demo
override.

### L-8 · MAJOR — `demo/ui/` is a 19-directory back-compat shim tree, by its own admission

Two of the subject's four value-carrying imports route through it (`Markdown.vue:35-36`). Measured:

```
$ for d in demo/ui/*/; do … done
alert            files=1 codelines=2
avatar badge button card checkbox collapsible dialog dropdown-menu input label
popover radio-group select separator skeleton slider switch tooltip
                 files=1 codelines=1   (each)
total dirs: 19
```

19 of 19 are single-file pure pass-throughs to `@mkbabb/glass-ui`. `demo/ui/alert/index.ts:1-9`
states the purpose in writing: *"B.W2 … converted it to a re-export … The two consumers
(`ColorNutritionLabel.vue`, `Markdown.vue`) **import from this barrel unchanged**."* A layer whose
stated reason to exist is that call sites should not have to change is a migration shim — edict 2
forbids exactly that, and edict 4 says the honest specifier is `@mkbabb/glass-ui`.

Cure: delete `demo/ui/`, rewrite the call sites to the bare package. Purely mechanical.
*(Cross-cutting — a rider, not this component's wave.)*

---

## MINOR

### L-9 · MINOR — the only component in the demo tree that runtime-imports the global stylesheets

```ts
Markdown.vue:37  import "../../../styles/foundation.css";     // 46,269 bytes; opens `@import "tailwindcss";`
Markdown.vue:38  import "../../../styles/utils.css";          // 10,122 bytes
```

Both are already imported at the app root (`App.vue:199-200`). Across the whole demo tree every
other reference to these sheets is the Tailwind-4 **compile-time** `@reference` directive, which
emits nothing — and `Markdown.vue:79` uses that correct idiom four lines below the wrong one. The
component holds both spellings at once.

Direction matters: `scenes/about/markdown/` (deepest leaf) → `styles/` (shell global). And
`AboutPane` is `defineAsyncComponent` (`demo/shell/usePaneRouter.ts:69`), so this drags the entry
stylesheet into an async chunk's import graph; it is harmless today only because the entry already
owns the module and Vite dedupes by id. Delete `App.vue:199-200` and the global sheet silently
relocates into the lazy About chunk. Cure: delete lines 37-38; L-3 subsumes the rest.

### L-10 · MINOR — the barrel declares types, ships a dead export, and is imported by the component it exports

```ts
demo/scenes/about/markdown/index.ts
1  export { default as Markdown } from "./Markdown.vue";
3  export type DocModule = () => Promise<{ default: any }>;
5  export interface DocItem { name: string; path: string; module: DocModule; }
```

- **`DocItem` is dead** — `grep -rn "DocItem" demo/ src/ test/ e2e/` returns one hit, its own
  declaration. Edict 2.
- **Self-barrel cycle.** `index.ts` → `Markdown.vue` → (line 40) `import type … from "./"`. Erased
  at build by `verbatimModuleSyntax`, so no runtime cycle — but it exists only because the barrel is
  doubling as a types module. Barrels re-export; they do not declare.
- **`any` at the seam.** `Promise<{ default: any }>` propagates to `Markdown.vue:55`. The component's
  most important prop is untyped, and `@typescript-eslint/no-explicit-any` is `off`
  (`eslint.config.js:70`) so nothing flags it. The honest type is `Component` from `vue` — the value
  genuinely is a compiled Vue component.

### L-11 · MINOR — `?source` / `@src` / `vite-source-export` is a fully dead subsystem this component documents as live

```
$ grep -rn "?source" --include="*.ts" --include="*.vue" --include="*.md" . | grep -v node_modules | grep -v '^./docs/'
vite.config.ts:72                            (a comment claiming the docs use it)
plugins/vite-source-export.ts:5,8,10,20,87   (the plugin and its own JSDoc)

$ grep -rn "@src" demo/ assets/ --include="*.ts" --include="*.vue" --include="*.md"
(no output)
```

Zero consumers. `vite.config.ts:70-73` asserts the opposite. Yet `sourceExportPlugin()` is the first
entry of `defaultPlugins` (`vite.config.ts:160`) and runs in every build. Measured, from
`npx vite build --mode gh-pages` (exit 0, this seat):

```
[PLUGIN_TIMINGS] Your build spent significant time in plugins. Here is a breakdown:
  - source-export (52%)
  - unplugin-vue-markdown (27%)
  - value-defer-glass-fonts (10%)
  - vite:css (7%)
✓ built in 10.19s
```

The top plugin by time has zero consumers. *(Caveat: 52% is of plugin time, not wall time, and
reflects per-module hook dispatch by a plugin whose `resolveId` early-returns. The zero-consumer
fact is exact; the recoverable time is not quantified.)*

A second harm the timing obscures: because `@src` still resolves at
`vite.config.ts:74`, **any demo file can deep-import `src/` internals and the build succeeds.** The
demo-dogfood keystone — *"no `src/` internal is reachable"* (`tsconfig.demo.json:6-7`) — is asserted
in prose and unenforced in fact (L-1: no lint rule bans it either). Nothing exploits it today
(`grep -rn "@src" demo/` → 0), which is why this is MINOR rather than MAJOR — but the guarantee is
a convention, not a mechanism.

Cure: retire the plugin, the alias, the registration, the stale comments and the `pre` rule
together — one subsystem, one deletion. `vitest.config.ts:11`'s `@src` alias stays; it has real
consumers in `test/`. *(Cross-cutting — a rider.)*

### L-12 · MINOR — the component is correct only because its single consumer keys it

`Markdown.vue:69` loads `module` exactly once, in `onMounted`. There is no
`watch(() => module, loadDocs)`. Changing the `module` prop on a live instance renders the previous
document forever. It works solely because the consumer forces a remount —
`AboutPane.vue:52`, `:key="model.selectedColorSpace"`. A component whose contract is upheld by its
caller has the wrong contract; a second consumer writes the bug. After L-5 the component takes the
*space*, resolves and watches internally, and the `:key` stops being load-bearing.

### L-13 · MINOR — `onUpdated` driving imperative mutation of another component's DOM

```ts
Markdown.vue:73  onUpdated(() => { applyHighlighting(); });
```

`onUpdated` fires on **every** re-render — including every `mdColorVars` recompute during a colour
drag; each firing runs two `querySelector` calls before the `mark.cs-name` early-out
(`useMarkdownHighlighting.ts:13-15`). More structurally, `highlightColorSpaceName` walks the compiled
`.md` component's subtree with a `TreeWalker` and calls `textNode.parentNode?.replaceChild(frag, …)`
(`:64`) — **`Markdown.vue` rewrites text nodes a different component owns and Vue rendered.** It
survives only because the `.md` render functions are static and Vue never patches those nodes.
(Measured live: 9 `mark.cs-name` on the Lab doc, correct.)

Note also the naming: the composable is `useMarkdownHighlighting`, its docstring
(`useMarkdownHighlighting.ts:68-69`) says *"Color-space-name marking"*, and it performs no syntax
highlighting at all — two names, one job, neither of them highlighting.

Idiomatic Vue 3.5 is a post-flush watcher on the thing that changed, not a lifecycle hook on all
renders. The *elegant* transposition is to stop mutating DOM: the CSS Custom Highlight API
(`CSS.highlights.set("cs-name", new Highlight(...ranges))`, WebKit 17.2+, the Safari floor this repo
already targets) marks ranges without touching a node, so Vue's ownership is never crossed and
re-marking on a name change is one `set`. *(The Safari-floor decision wants an owner ruling —
rider, not wave.)*

### L-14 · MINOR — the name promises a general renderer; the component is a colour-space guide

`Markdown` / `DocModule` / `DocItem` name the *mechanism*. The component takes `colorSpaceName`,
mints `--md-color-*` from the live picked colour, marks colour-space names, and styles a φ ladder
tuned to eleven specific documents. There is one consumer and no generality. **The misnaming is what
licensed L-4**: a file called `Markdown` invites a general markdown theme, and a general theme was
written against a corpus that uses eight element types. Cure: `ColorSpaceGuide.vue`.

---

## INFO

### L-15 · INFO — the documentation surface has no route, and therefore no visual-audit coverage

`demo/color-picker/router/index.ts:22-37` registers 15 paths; `grep -c 'about'` → **0**. About is
reachable only as the *right* pane of the `picker` view (`demo/shell/viewSchema.ts:107`).
Consequently:

```
$ node -e '…REPORT.json… results.filter(x=>/about/i.test(x.route)).length'  →  0
routes captured: ["/#/","/#/palettes","/#/browse","/#/extract","/#/mix","/#/generate",
                  "/#/gradient","/#/atmosphere","/#/blob","/#/admin/…","/#/does-not-exist"]
```

I read `shots/safari-desktop-light/picker.png`: the About card is captured, but the viewport ends
inside `ColorNutritionLabel` — "Detailed Guide" and everything `Markdown.vue` renders is below the
fold in all four matrices. **Zero of the 60 captures show this component's output**, and the
report's clean `blankOrNearBlank: 0` / `pageErrors: 0` rows say nothing about it.

I closed the gap myself (headless Chromium, About card scrolled to the markdown region): the
component renders correctly — headings in Fraunces at the certified accent
(`oklch(0.471189 0.188448 9.83402)`, `margin-top: 41.888px`), φ margins live, 9 marks, 34 body
children with 33 under `content-visibility: auto`; one console error and it is the unrelated dev
CORS notice. Reported so the visual lane knows its matrix has a hole — not as a defect of this
component. For a *documentation* surface, un-deep-linkable is also a product defect: there is no
`/#/about/oklch` to share.

---

## What is NOT defective — the negative, proved

- **The value.js import *specifiers* are correct, and the published surface is honestly consumed.**
  All 45 demo import sites use bare published subpaths — `color` 25, `css` 10, `math` 6, `easing` 5,
  `quantize` 4 — every one a real `exports` key. **No deep `src/` import exists anywhere in `demo/`**
  (`grep -rn "@src" demo/ assets/` → 0). A real npm consumer could write `useMarkdownColors.ts:3-4`
  verbatim. §R further shows the *resolution* is correct too; L-2 is a defect of the config's
  *claims*, not of what happens.
- **Library math ownership is clean — there is no demo-side duplicate of the contrast walk.**
  `demo/color-session/ink.ts:1-12` imports `convertColor`, `mixColors`, `oklch`, **`safeAccentColor`**,
  `parseCssColor`, `serializeCssColor` from the published subpaths and does no colour math of its
  own; `certifyAccentInk` is a thin policy wrapper over the library's `safeAccentColor`
  (`src/color/operations.ts:207`). The "demo carries NO norm/denorm colour math" claim holds.
- **Only ONE dark store — the historically-named suspect is CURED.** The brief cites
  `useMarkdownHighlighting.ts:76` as one of "three parallel `useDark` stores." Verified by
  enumeration:
  ```
  $ grep -rn "useDark\|useGlobalDark" --include="*.ts" --include="*.vue" demo/ src/
  → 11 call sites, ALL `useGlobalDark` from "@mkbabb/glass-ui/dark"; ZERO vueuse `useDark`.
  ```
  Line 76 is the *comment describing the landed cure*, not a live defect.
- **No duplicate markdown renderer exists.** `grep -rn "Markdown" demo/` finds exactly one component
  and one consumer (`AboutPane.vue:50`). Whatever else is wrong, there is no second implementation
  of this concept alive elsewhere. `Alert` likewise is a genuine glass-ui re-export, not a local
  re-implementation — the shim *tree* is the defect (L-8), duplicated component *logic* is not.
- **`verbatimModuleSyntax` (edict 8) satisfied** across all four module files: `Markdown.vue:40`
  `import type { DocModule }`, `useMarkdownHighlighting.ts:1` `import type { ShallowRef }`; zero
  mixed imports.
- **Vue 3.5 idioms (edict 7) correct.** `useTemplateRef` (`Markdown.vue:50`, `Katex.vue:27`),
  reactive props destructure (`Markdown.vue:44`, `Katex.vue:22`), getters passed into composables
  (`:52-53`) rather than leaking `props`. `currentDoc = ref(...)` holding a module namespace is **not**
  a deep-reactivity defect: module namespaces are non-extensible, so Vue's `getTargetType` returns
  `INVALID` and `reactive()` returns the target unproxied.
- **Animations preserved (edict 6).** The only motion in the block is
  `transition: color var(--duration-slow) var(--ease-standard)` (`:125`) on live `> h2/h3`. It moves
  with the rules in L-3's extraction; nothing is deleted.
- **The `:deep()` *target* is legitimate** — content this repo compiles, not a shadcn internal, the
  distinction `demo/DESIGN.md` draws. L-3 faults its *universality*, not its licence.
- **KaTeX's stylesheet import is correct.** `Katex.vue:20` imports script-side, precisely to avoid
  the dead-scoped-CSS failure this report faults elsewhere. The cure is real: 9 `.katex` and 4
  `.katex-display` nodes render live.

---

## Modularization — the greenfield lattice

Structured today with no legacy, this is **five files and no barrel**:

```
demo/scenes/about/
├── AboutPane.vue                unchanged role:  <ColorSpaceGuide :space="…" :cssColor="…" />
├── ColorSpaceGuide.vue          ~40 lines. template + script. NO <style>.
├── docs/
│   ├── registry.ts              ~15 lines — Record<DisplayColorSpace, () => Promise<Component>>
│   ├── rgb.md … kelvin.md       the 11, MOVED in from repo-root assets/docs/
│   │                            `import { Katex } from "../../katex"` — one hop, no inversion
│   └── markSpaceName.ts         ~25 lines — CSS.highlights + Range; no DOM mutation
└── katex/Katex.vue              unchanged
demo/styles/prose.css            ~200 lines — the theme, dead rules gone, ZERO :deep(),
                                 wired at foundation.css:82 beside @import "./hljs.css"
```

Dependency direction, all one-way:

```
AboutPane ──► ColorSpaceGuide ──► docs/registry ──► docs/*.md ──► katex/Katex
     │                │
     └────────────────┴──► color-session/{color-model, useContrastSafeColor}
                                      └──► @mkbabb/value.js/{color,css}   (published subpaths)
ColorSpaceGuide ──► @mkbabb/glass-ui                       (direct — demo/ui/ deleted, L-8)
styles/foundation.css ──► styles/prose.css                 (cascade, not module graph)
```

Four transpositions produce it — each an inversion, not a patch:

1. **The stylesheet leaves the component.** `:deep()` is not a tool, it is a symptom; 331 lines of
   prose typography inside an SFC is a stylesheet that has not admitted what it is. Out to
   `demo/styles/prose.css` beside the `hljs.css` precedent. `:deep()` goes 50 → 0, the arbitrary
   104/198 split heals, L-9's rogue imports go with it, and the component drops 408 → ~40.
2. **The content comes home and types itself.** `assets/docs/` → `demo/scenes/about/docs/`; registry
   `Record<DisplayColorSpace, …>` behind the module seam. The repo-root↔`demo/` cycle dies, the
   parallel enumeration dies, the `as MarkdownSpace` cast dies, and the domain becomes exhaustive by
   the compiler rather than by vigilance.
3. **The composable is consumed, not copied.** `useSafeAccentFn("resting")` replaces the hand-rolled
   inject+dark+lightness+certify quartet; `resolveSurfaceLightnessLive` — a pure alias exported only
   to enable its own copies — is deleted along with the other two folded call sites. The epoch-bump
   contract becomes impossible to omit because there is nothing to omit.
4. **The marking stops mutating the DOM.** `CSS.highlights` + `Range` replaces the `TreeWalker` +
   `replaceChild` pass over Vue-owned nodes; a post-flush watch on `space` replaces `onUpdated`.

`useMarkdownHighlighting.ts` (93 lines) disappears into (4). Net across the module:
408 + 83 + 93 = **584 lines in 3 files → ≈ 280 in 5 files**, each with one job and one seam.

---

## Waves — each individually completable (L-1 law)

Four waves inside the component's blast radius. Each closes on its own evidence, in one session,
with no successor dependency. These are independent landings, not a refactor arc.

| wave | scope | closing evidence |
|---|---|---|
| **MD-a** | Delete `Markdown.vue:37-38`; move the `<style scoped>` block **verbatim** to `demo/styles/prose.css`; `@import "./prose.css";` at `foundation.css:82`; drop every `:deep()` wrapper and the 104/198 split. **No rule body changed.** | `grep -c ":deep(" Markdown.vue` = 0; `wc -l Markdown.vue` ≈ 77; re-run this seat's DOM probe and diff computed `h2` colour / family / margin-top against the pasted values (`oklch(0.471189 0.188448 9.83402)` / `Fraunces…` / `41.888px`) |
| **MD-b** | Delete the 14 dead rule bodies (L-4 table) + the dead members of the `:first-child` and adjacency lists + the 2 rulings attached to dead rules. Nothing else. | `wc -l prose.css` drops ≥124; same DOM probe byte-identical for every element that exists; `a` and `.katex-display` rules **retained** (L-4 corrections) |
| **MD-c** | `useMarkdownColors` → `useSafeAccentFn("resting")`; `{}` degenerate instead of `throw`; delete `resolveSurfaceLightnessLive` + migrate `HeroBlob.vue:99`, `ConsoleRail.vue:136`, `useViewAccents.ts:108` | `grep -rn resolveSurfaceLightnessLive demo/` = 0; `npm run typecheck` green; DOM probe `--md-color-h2` unchanged |
| **MD-d** | `assets/docs/` → `demo/scenes/about/docs/`; registry to `docs/registry.ts` keyed `Record<DisplayColorSpace, …>`; delete `markdown/index.ts` (with `DocItem` and the `any`); rename → `ColorSpaceGuide.vue`; add the internal `watch` (L-12) | `grep -rn "as MarkdownSpace" demo/` = 0; `grep -rn "assets/" demo/` = 0; `assets/` removed; all 11 spaces render through the selector |

**Riders, not waves** — these reach outside the component and must be owned elsewhere:
L-1 (re-key the eslint lattice + enable `strictTemplates` — repo-wide, and the gate that makes the
rest stick), L-2 (delete the `tsconfig.demo.json` paths block), L-7 (glass-ui `Skeleton` variant —
relay to the BH inbox per the standing glass-ui relay edict), L-8 (`demo/ui/` retirement, 19 files
and ~92 call sites), L-11 (`vite-source-export` / `@src` retirement), L-13's `CSS.highlights`
transposition (wants an owner ruling on the Safari floor).

**MD-a and MD-b are the whole shape of the thing.** Mechanical, independently verifiable against
pasted numbers, and together they take the largest component in the demo tree from 408 lines to 77
without altering one rendered pixel. L-1 should land first among the riders — it is the only finding
that prevents the others from returning.

---

*Evidence gathered against `/Users/mkbabb/Programming/value.js` @ `c654824e` (branch `tranche-u`).
Probes run by this seat: two `tsc --traceResolution` runs (real demo program + the prior seat's
`/tmp` probe, for the §R refutation), one `npx vite build --mode gh-pages` (exit 0, 10.19 s), three
`eslint --print-config` reads, one headless-Chromium DOM+screenshot probe against the live dev
server, one read of `visual/REPORT.{md,json}` and `shots/safari-desktop-light/picker.png`, and a
static construct census over all 11 `assets/docs/*.md`. No source file was modified.*
