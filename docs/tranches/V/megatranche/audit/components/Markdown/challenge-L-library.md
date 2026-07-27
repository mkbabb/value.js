# CHALLENGE-L — library structure · `demo/scenes/about/markdown/Markdown.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited. No defect on this axis.

---

## Verdict

**DEFECTIVE.** The premise holds. The subject is not one component with some structural
smells — it is a scene leaf sitting on a module lattice that is **unenforced by construction**
(L-2), fed by a **split package-resolution graph** where two adjacent import lines in one
composable resolve to two different copies of value.js (L-1), styled by a 331-line block that
is **42.9 % dead by measurement** (L-7), reached through a **19-directory pure-shim tree**
(L-5), rendering content that **depends backwards into the app** (L-3), and calling a glass-ui
API that **does not exist** and that nothing can catch (L-8).

`Markdown.vue` is a god module by conflation, and it is misnamed: it takes `cssColor` and
`colorSpaceName`, so it is not a Markdown renderer at all. It is `ColorSpaceGuide`.

Strongest single defect: **L-1**. The demo is the repo's only proof that the published API is
usable. For `@mkbabb/value.js/css` that proof is *false* — the demo typechecks against the
npm 4.0.0 tarball and runs against the working tree, and this component's composable straddles
the seam on lines 3 and 4.

---

## L-1 · BLOCKER — the demo typechecks `@mkbabb/value.js/css` against the published tarball and *runs* against the local build

`useMarkdownColors.ts` imports two published subpaths on adjacent lines:

```ts
// demo/scenes/about/markdown/composables/useMarkdownColors.ts:3-4
import { convertColor } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
```

Both specifiers are correct — both keys are in `package.json#exports`. The **resolution** is
not. Measured with `tsc --traceResolution` under the real `tsconfig.demo.json`:

```
======== Resolving module '@mkbabb/value.js/color' ... ========
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
======== ... successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts'. ========

======== Resolving module '@mkbabb/value.js/css' ... ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Loading module '@mkbabb/value.js/css' from 'node_modules' folder ...
======== ... successfully resolved to
         '/Users/.../node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`/color` → the **local working-tree build**. `/css` → the **published registry tarball 4.0.0**.
At runtime both go to the local build, because `vite.config.ts` generates `valueJsSelfAlias`
from `package.json#exports` — which *does* contain `./css`.

The two declaration files are not the same file:

```
$ wc -l dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
     382 dist/subpaths/css.d.ts
     350 node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
$ diff -q ...   → Files ... differ          # /color: IDENTICAL
```

and the divergence is semantic, not cosmetic. The local build's `css.d.ts` forks the core
colour types into private duplicates:

```
< declare type Alpha_2 = number | "none";
< declare type Channel_2 = number | "none";
< declare type ChannelsBySpace_2 = { ... };
< declare type Color_2<S extends SpaceId_2> = Readonly<{ space: S; channels: ...; alpha: Alpha_2 }>;
< declare type SpaceId_2 = "rgb" | "hsl" | ... ;
136c106
<     [S in CssColorSpace]: Color_2<S>;      # local
---
>     [S in CssColorSpace]: Color<S>;        # published 4.0.0
```

So in the local surface, `parseCssColor(...).value` is `Color_2<S>` from `css.d.ts` while
`convertColor` (from `color.d.ts`) accepts `Color<S>` — **two declarations of one concept
across two published entry points**. Structural identity makes it compile; nominal identity is
gone. Today's demo hides this because it typechecks `/css` against the *older* copy that
doesn't have the fork.

**Root cause** — `tsconfig.demo.json:42-49` is a hand-maintained mirror of the exports map and
has drifted in both directions:

| `paths` entry | in `package.json#exports`? | target file |
|---|---|---|
| `@mkbabb/value.js` → `dist/index.d.ts` | **no** (`.` key does not exist) | **MISSING** |
| `@mkbabb/value.js/parsing` | **no** | **MISSING** |
| `@mkbabb/value.js/units` | **no** | **MISSING** |
| `@mkbabb/value.js/color` | yes | present |
| `@mkbabb/value.js/math` / `/easing` / `/transform` / `/quantize` | yes | present |
| **`@mkbabb/value.js/css`** | **yes** | **NO ENTRY** |
| **`@mkbabb/value.js/value`** | **yes** | **NO ENTRY** |

Three phantom entries, two missing real ones. The file's own comment (`tsconfig.demo.json:37-41`)
asserts *"the 7 subpath barrels, each → its `dist/*.d.ts`"* and *"the `exports` map is a CLOSED
8-key set"* — the map is 7 keys and contains no `.`.

**Blast radius** — 9 demo files import `/css`; all typecheck against the tarball:

```
demo/color-session/generate-color.ts
demo/color-session/ink.ts
demo/color-session/picker-color.ts
demo/color-session/view-accent.ts
demo/scenes/about/markdown/composables/useMarkdownColors.ts    ← subject
demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts
demo/workbenches/extract/composables/useExtractSession.ts
demo/workbenches/gradient/composables/gradientParse.ts
demo/workbenches/gradient/composables/useGradientCSS.ts
```

**Why this matters now**: the V·π mini-tranche's entire subject is `src/css/` — the parser.
Every signature change it lands is invisible to the demo typecheck. The gate that is supposed
to catch a parser regression cannot see the parser.

**Reproduction**
```bash
cd /Users/mkbabb/Programming/value.js
printf 'import { convertColor } from "@mkbabb/value.js/color";\nimport { parseCssColor } from "@mkbabb/value.js/css";\nexport const x=[convertColor,parseCssColor];\n' > /tmp/probe.ts
printf '{"extends":"/Users/mkbabb/Programming/value.js/tsconfig.demo.json","compilerOptions":{"noEmit":true,"traceResolution":true},"include":["probe.ts"]}' > /tmp/tsconfig.probe.json
npx tsc -p /tmp/tsconfig.probe.json 2>&1 | grep -E "value\.js/(css|color)"
```

**Cure** — `tsconfig.demo.json#paths` must be *generated*, exactly as `vite.config.ts` already
generates `valueJsSelfAlias` from `package.json#exports`. One map, one generator, two consumers.
The current arrangement has the runtime lattice generated and the typecheck lattice hand-copied;
that asymmetry *is* the bug. Ship a `scripts/gen-demo-paths.mjs` writing a
`tsconfig.value-paths.json` that `tsconfig.demo.json` extends, and a golden that fails when a
`traceResolution` line for any subpath carries a `Package ID`.

---

## L-2 · BLOCKER — the demo module lattice has **zero** structural enforcement over this component

`eslint.config.js` carries three `no-restricted-imports` objects that encode the demo's module
graph (G-DEMO-1, G-DEMO-3a, G-DEMO-3b, `eslint.config.js:232-301`). Every one of them is keyed
on a tree W43 deleted:

```
$ ls -d demo/@
ls: demo/@: No such file or directory
$ find demo/@/components demo/@/lib demo/@/composables -type f 2>/dev/null | wc -l
0
```

and every banned pattern names `@components/custom/...` — an alias `tsconfig.demo.json:32-34`
states was killed (*"No `@styles`/`@components`/`@utils`/`@lib`/`@composables`/`@assets` project
alias survives"*). The bans are vacuous twice over: no file matches the glob, and no import
could match the pattern.

Measured effective config:

```
$ for f in src/value.ts demo/color-picker/App.vue \
           demo/scenes/about/markdown/Markdown.vue \
           demo/scenes/about/markdown/composables/useMarkdownColors.ts; do
    npx eslint --print-config "$f" | jq -c '.rules["no-restricted-imports"] // "UNSET/OFF"'; done

src/value.ts                          [2,{"patterns":[{"group":["@mkbabb/glass-ui",...]}]}]   # inv-K-1 LIVE
demo/color-picker/App.vue             [2,{"patterns":[{"group":["@components/custom/..."]}]}] # vacuous
demo/scenes/about/markdown/Markdown.vue                       UNSET/OFF
demo/scenes/about/markdown/composables/useMarkdownColors.ts   UNSET/OFF
```

Only the library's `inv-K-1` is live. **The subject component and its composables are under no
import restriction at all.** Every finding below (the 4-hop reach into `color-session`
internals, the shim-tree reach, the backwards content dependency) exists because nothing can
stop it. The lattice is documentation, not law.

`vue-tsc` is equally toothless on this axis: no `vueCompilerOptions.strictTemplates` exists in
any tsconfig (`grep -n "strictTemplates" tsconfig*.json` → no match), so the default `false`
applies and unknown component props are never reported. That is the mechanism behind L-8.

**Cure** — re-key the three objects onto the real tree
(`demo/{color-session,palettes,picker,platform,scenes,shared,shell,workbenches}/**`) and state
the lattice as relative-depth bans, e.g. a scene leaf may not `../../../../` out of its scene.
Turn on `strictTemplates`. Both are mechanically verifiable by `eslint --print-config` and a
vue-tsc run; neither needs a design decision.

---

## L-3 · MAJOR — inverted dependency: repo-root content imports a deep internal of the app scene tree

All eleven documents this component renders open with the same line:

```
$ grep -n "import" assets/docs/*.md
assets/docs/hex.md:2:import { Katex } from "../../demo/scenes/about/katex";
assets/docs/hsl.md:2:import { Katex } from "../../demo/scenes/about/katex";
...  (11/11 identical)
```

`assets/` is repo-root **data**, outside `demo/`, outside `src/`, outside the vite root
(`demo/color-picker/`). It reaches *up and inward* into a scene's private subdirectory. The
edge points the wrong way: a scene may own its content; content must never name a scene's
internals. Consequences that are already live:

- The content is un-relocatable. Moving `scenes/about/katex/` breaks 11 files outside `demo/`.
- The content cannot be authored or reviewed without the app tree present.
- `AboutPane.vue:82-92` must climb back out (`"../../../assets/docs/rgb.md"` ×11) to reach it —
  a three-hop escape from `demo/` for every entry in the map.

**Cure** — the content belongs inside the scene it serves: `demo/scenes/about/content/*.md`,
importing `"../katex"` (one hop, same scene, no inversion). `AboutPane`'s map becomes
`"./content/rgb.md"`.

---

## L-4 · MAJOR — dead legacy on this component's supply chain, kept alive by a false comment

`vite.config.ts:70-74` keeps the `@src` alias alive with a stated justification:

> `@src` SURVIVES for the EXEMPT `assets/docs/*.md` reference pages, which embed live source
> snippets via `@src/…?source` (the `sourceExportPlugin`) …

Measured:

```
$ grep -rn "@src" assets/ demo/            → (no output)
$ grep -rn "?source" assets/ demo/ src/    → (only plugins/vite-source-export.ts's own docstring)
$ ls test/docs-source-snippets.test.ts     → No such file
```

Zero consumers. The exemption is empty. Yet `sourceExportPlugin()` is registered in **every**
build (`vite.config.ts:160`, first entry of `defaultPlugins`), and its own docstring cites a
golden test (`plugins/vite-source-export.ts:87`) that does not exist.

Two live harms, both structural:

1. Because `@src` still resolves, **any demo file can deep-import `src/` internals and the
   build succeeds.** The demo-dogfood keystone — "no `src/` internal is reachable"
   (`tsconfig.demo.json:6-7`) — is asserted in prose and unenforced in fact (see L-2: no lint
   rule bans it either).
2. `useMarkdownHighlighting.ts:71-76` documents this component's code-block behaviour entirely
   in terms of the dead plugin:
   > *"Code blocks are pre-formatted and pre-highlighted at build time by the vite-source-export
   > plugin … their ink is the static house hljs token theme (`@styles/hljs.css`)"*

   Every clause is false here: **there are zero fenced code blocks in all 11 docs**
   (`grep -c '^```' assets/docs/*.md` → `0` ×11), the plugin is unconsumed, and `hljs.css` is
   consumed by `GradientCodeEditor.vue`, not by this component.

**Cure** — delete `plugins/vite-source-export.ts`, drop it from `defaultPlugins`, drop the
`@src` alias from `vite.config.ts` (it stays in `vitest.config.ts:11`, where it has 6 real
consumers in `test/`). One deletion, verified by `npm run gh-pages` staying green.

---

## L-5 · MAJOR — `demo/ui/` is a 19-directory back-compat shim tree, by its own admission

Two of the subject's four value-carrying imports go through it:

```ts
// Markdown.vue:35-36
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { Skeleton } from "../../../ui/skeleton";
```

Every directory under `demo/ui/` is one file containing one re-export line:

```
demo/ui/alert/        files=1  codelines=2   → export { Alert, AlertTitle, AlertDescription } from "@mkbabb/glass-ui";
demo/ui/skeleton/     files=1  codelines=1   → export { Skeleton } from "@mkbabb/glass-ui";
demo/ui/{avatar,badge,button,card,checkbox,collapsible,dialog,dropdown-menu,input,label,
         popover,radio-group,select,separator,slider,switch,tooltip}/   files=1  codelines=1  each
```

19 of 19 are pure pass-throughs. `demo/ui/alert/index.ts:1-9` states the purpose in writing:

> *"B.W2 … converted it to a re-export … The two consumers (`ColorNutritionLabel.vue`,
> `Markdown.vue`) **import from this barrel unchanged**."*

A layer whose stated reason to exist is that call sites should not have to change is a
migration shim. Owner edict 2 forbids exactly that; edict 4 says glass-ui is the design system,
so the honest specifier is `@mkbabb/glass-ui`. 92 import sites across `demo/` currently route
through the shims.

**Cure** — delete `demo/ui/` (19 files), rewrite the 92 sites to `@mkbabb/glass-ui`. Purely
mechanical; evidence is `grep -rc "ui/alert\|ui/skeleton\|…" demo/ → 0` plus a green typecheck.

---

## L-6 · MAJOR — `useMarkdownColors` re-implements `useSafeAccentFn("resting")` and widened `color-session`'s surface to do it

The composable makes a 4-hop reach out of its scene into three separate `color-session`
internals:

```ts
// useMarkdownColors.ts:5-7
import { INK_AMBIENT_KEY }             from "../../../../color-session/keys";
import { certifyAccentInk }            from "../../../../color-session/ink";
import { resolveSurfaceLightnessLive } from "../../../../color-session/useContrastSafeColor";
```

There is no `demo/color-session/index.ts` (`ls` → No such file) — the module has **no seam**, so
consumers necessarily name its files. And the three pieces it imports assemble into a recipe
`color-session` already publishes as one composable:

```ts
// demo/color-session/useContrastSafeColor.ts:346-361 — useSafeAccentFn
const { isDark } = useGlobalDark();
const ambient = inject(INK_AMBIENT_KEY)!;
function safeCss(css, floor?) {
    return certifyAccentInk(css, surfaceLightnessNow(surface, ambient.value, isDark.value), floor);
}
```

```ts
// useMarkdownColors.ts:18,25,44-73 — the same three steps, hand-assembled
const { isDark } = useGlobalDark();
const ambient = inject(INK_AMBIENT_KEY)!;
const bgL = resolveSurfaceLightnessLive("resting", ambient.value, isDark.value);
const accent = certifyAccentInk(`oklch(${L} ${headingC} ${headingH})`, bgL);
```

`resolveSurfaceLightnessLive` was *added to `color-session`'s surface for this one call site* —
its docstring names the beneficiary (`useContrastSafeColor.ts:365-368`): *"for composables that
fold the referent into their own computation (`useMarkdownColors`)"*. The fold is not needed:
the only markdown-specific step is the chroma floor (`useMarkdownColors.ts:52-53`), which acts
on the **input** string, not on the referent. The honest form is

```ts
const { safeCss } = useSafeAccentFn("resting");   // one import, one seam
const accent = computed(() => safeCss(withChromaFloor(cssColor())));
```

3 deep imports → 1, and a public-surface widening loses its justification.

Related, same mechanism: the composable converts the library's **failure-explicit `Result`**
back into thrown exceptions inside a `computed` (`useMarkdownColors.ts:33, 37, 41`). value.js's
entire published contract is "immutable, failure-explicit" — a consumer that answers `!parsed.ok`
with `throw` re-introduces the exception channel at the render boundary, where the only catcher
is the app-root `ErrorBoundary.vue`. The `--md-color-*` vars are decoration; the correct
degenerate is to return `{}` and let the inherited ink stand.

---

## L-7 · MAJOR — 142 of 331 style lines (42.9 %) style markup that cannot exist

The `<style scoped>` block (`Markdown.vue:78-408`) is a *generic* markdown theme. The corpus is
a **closed set of 11 hand-authored files**. Static census of all 11:

```
$ grep -c '^|' assets/docs/*.md          → 0 ×11   (tables)
$ grep -c '^>' assets/docs/*.md          → 0 ×11   (blockquotes)
$ grep -c '^!\[' assets/docs/*.md        → 0 ×11   (images)
$ grep -c '^```' assets/docs/*.md        → 0 ×11   (fenced code)
$ heading levels across all 11:  h1=0  h2=53  h3=85  h4=0  h5=0  h6=0
```

Confirmed against the **live DOM** at `http://localhost:9000/#/` (Playwright,
`document.querySelectorAll` inside `.markdown-wrapper .markdown-body`, 34 children):

```json
{ "table":0, "th":0, "td":0, "blockquote":0, "img":0, "dl":0, "dt":0, "dd":0,
  "ul.contains-task-list":0, "li.task-list-item":0, ".callout":0,
  ".footnotes":0, ".footnote-ref":0, ".footnote-item":0, ".toc":0, "pre":0, "a":0,
  "hr":4, "code":14, "mark.cs-name":9, "div.inline-block":9, ".katex":9, ".katex-display":4 }
```

`unplugin-vue-markdown` is configured as `Markdown({})` (`vite.config.ts:162`) — plain
markdown-it, no footnote / deflist / task-list / anchor / toc plugin. The markup those rules
target is **not producible by this pipeline at all**, independent of what the authors write.

Dead rule blocks, by line range:

| lines | rule | live matches |
|---|---|---|
| 142-146 | `> h5, > h6` rhythm | 0 |
| 149-155 | heading-adjacency matrix — 15 selectors, only `> h2 + h3` reachable | 14/15 dead |
| 157-159 | `> h1` | 0 |
| 171-174 | `> h4` | 0 |
| 176-178 | `> h5` | 0 |
| 180-182 | `> h6` | 0 |
| 229-238 | `pre` + the AB-3 well-recipe comment | 0 |
| 255-260 | `blockquote` | 0 |
| 262-276 | `table` / `th, td` / `th` | 0 |
| 278-283 | `img` | 0 |
| 316-329 | `dl` / `dt` / `dd` | 0 |
| 331-342 | `ul.contains-task-list` | 0 |
| 344-357 | `.callout` (+ `.warning`, `.danger`) | 0 |
| 359-378 | `.footnotes` / `.footnote-ref` / `.footnote-item` | 0 |
| 380-406 | `.toc` (+ `ul`, `li`, `a`) | 0 |

**142 lines of 331 = 42.9 % of the style block; 34.8 % of the whole file.** Every one ships in
the bundle. Several of them carry multi-line rulings (`AB-3` at 229-233, the `F6 ONE-grammar
law` at 380-384) adjudicating markup that has never rendered — the audit record itself has been
polluted by speculative CSS.

Two more structural notes in the same block:

- The selector `.markdown-wrapper :deep(.markdown-body)` appears **twice**, at line 104 and at
  line 198, with no separating reason. One rule set, split in half.
- Lines 94-96 say the `--phi-*` rungs *"live in `style.css :root`"*. There is no `style.css`
  anywhere under `demo/` (`find demo -name style.css` → nothing). They live at
  `demo/styles/foundation.css:458-460`.

---

## L-8 · MAJOR — the component calls a glass-ui API that does not exist, and no gate can see it

```html
<!-- Markdown.vue:2-8 -->
<!-- R.W4 Lane A / A2 (U20): glass shimmer bones, not opaque pulse blocks. -->
<Skeleton surface="glass" variant="shimmer" class="h-12 w-12 rounded-full" />
<Skeleton surface="glass" variant="shimmer" class="h-4 w-full" />
<Skeleton surface="glass" variant="shimmer" class="h-4 w-full" />
```

glass-ui 7.0.0's `Skeleton` declares exactly one prop:

```ts
// node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts
type __VLS_Props = { class?: HTMLAttributes["class"] };
```

and its compiled CSS carries a single unconditional recipe — no variant selectors:

```css
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);
  background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{ ...linear-gradient(105deg,...) }
.skeleton[data-v-cd03d0b0]:after{animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s)...}
```

`surface` and `variant` are undeclared, so they fall through onto the root element as
non-standard HTML attributes with zero effect. The named design intent is expressed through an
API that does not exist. It *looks* correct only because shimmer is glass-ui's unconditional
default — the props are noise that would keep "working" if glass-ui ever changed it.

Second-order, and it is the interesting half: glass-ui's skeleton fills with `var(--muted)` —
and this component's own style block (`Markdown.vue:229-232`) rules that content chips seat on
`--well-bg`, *"never the parallel `--muted` species (which stepped OPPOSITE the well in dark)"*.
The skeleton it ships sits on exactly the banned tone. Per edict 4 the cure is a glass-ui
change, not a demo override — but right now the component believes it already cured it via
props that do not exist.

Nothing catches this because `strictTemplates` is off everywhere (L-2). Turning it on makes
this a compile error.

---

## L-9 · MINOR — the only component in the demo tree that runtime-imports the global stylesheets

```ts
// Markdown.vue:37-38
import "../../../styles/foundation.css";
import "../../../styles/utils.css";
```

Both are already imported at the app root (`demo/color-picker/App.vue:199-200`). Across the
whole demo tree, **every other component** references the sheet only through the Tailwind-4
`@reference` directive inside its `<style>` block (18 sites: `ColorPicker.vue:389`,
`Dock.vue:297`, `PaneHeader.vue:61`, …). `Markdown.vue` is the sole file that does both — line
79 has the correct `@reference` *and* lines 37-38 have the redundant runtime import. A leaf
scene component re-entering the app's global CSS layer is a boundary inversion; delete lines
37-38.

---

## L-10 · MINOR — the module's public seam is phantom, and the map that belongs behind it lives in the parent

```ts
// demo/scenes/about/markdown/index.ts
export { default as Markdown } from "./Markdown.vue";
export type DocModule = () => Promise<{ default: any }>;     //  `any` at the seam
export interface DocItem { name: string; path: string; module: DocModule; }   // 0 consumers
```

`grep -rn "DocItem" demo/ assets/ src/ test/ e2e/` returns exactly one hit — the declaration
itself. The seam exports a concept nothing uses, and erases the module type to `any`.

Meanwhile the thing that *should* be behind the seam — the space→document map — lives in the
parent, along with a fourth copy of the colour-space union:

```ts
// AboutPane.vue:79-93,97
type MarkdownSpace = "rgb"|"hex"|"hsl"|"hsv"|"hwb"|"lab"|"lch"|"oklab"|"oklch"|"xyz"|"kelvin";
const markdownModules: Record<MarkdownSpace, DocModule> = { rgb: () => import("../../../assets/docs/rgb.md"), … };
const activeMarkdownModule = computed(() => markdownModules[model.value.selectedColorSpace as MarkdownSpace]);
```

The canonical union is `DisplayColorSpace` (`demo/color-session/color-model.ts:29`).
`MarkdownSpace` is a hand-copy, and the `as MarkdownSpace` cast at line 97 defeats
exhaustiveness: **add a space to `DisplayColorSpace` and the lookup silently returns
`undefined`**, the `v-if` at `AboutPane.vue:51` hides the guide, and no error is raised anywhere.
Typing the map `Record<DisplayColorSpace, GuideModule>` turns that into a compile error and
deletes the cast.

---

## L-11 · MINOR — the docs feature has no route, and therefore no audit coverage

`demo/color-picker/router/index.ts:22-37` registers 15 paths; none is `/about`. The About pane
is reachable only as the *right* pane of the `picker` view (`viewSchema.ts:107`), and `picker`
declares no `defaultPaneIndex`, so on mobile it defaults to pane 0 (the picker) —
**the entire documentation surface has no addressable URL on mobile at all.**

The consequence for this audit is concrete: the visual sweep drives routes, so its 60 captures
never reach the Markdown body.
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/picker.png` shows the
About card cut off at `Key Properties` — the "Detailed Guide" heading and everything
`Markdown.vue` renders is below the fold and was never captured. **The largest component in the
demo tree has zero visual-audit coverage**, and the report's clean `blankOrNearBlank: 0` /
`pageErrors: 0` rows say nothing about it.

For a *documentation* surface, un-deep-linkable is also a product defect: no
`/#/about/oklch` to share.

---

## Modularization — the greenfield lattice

`Markdown.vue` is one name over four concerns, and the name is wrong. It accepts `cssColor` and
`colorSpaceName`; it is not a markdown renderer, it is the About scene's **colour-space guide**.
That misnaming is what licensed the 142 dead lines: a file called `Markdown` invites a general
markdown theme, and a general theme was written against a corpus of 11 files using 8 element
types.

Structured today with no legacy:

```
demo/scenes/about/
  AboutPane.vue                  unchanged role
  guide/
    index.ts                     the ONLY seam:  { ColorSpaceGuide }
    ColorSpaceGuide.vue          ~60 lines — async load + skeleton + error + <component :is>
    guides.ts                    ~15 lines — Record<DisplayColorSpace, GuideModule>, moved DOWN
                                 from AboutPane; a new space is now a compile error
    useGuideInk.ts               ~12 lines — useSafeAccentFn("resting") + chroma floor → 3 vars
  content/                       the 11 .md files, MOVED from repo-root assets/docs/
    rgb.md … kelvin.md           `import { Katex } from "../katex"` — one hop, no inversion
demo/styles/markdown.css         ~90 lines — the prose theme as ONE `.md-prose` class:
                                 h2 h3 p ul ol li code hr a + the katex-display scroll box.
                                 Global, unscoped, no :deep(). Styling a document is a
                                 stylesheet's job, not a component's.
```

Four deletions fall out:

1. **`useMarkdownHighlighting.ts` (93 lines) disappears entirely.** Term-marking is a *content*
   transform performed at *render* time by a `TreeWalker` that mutates DOM Vue owns, from an
   `onUpdated` hook (`Markdown.vue:73-75`). Its home is the build: either
   `Markdown({ markdownItSetup(md) { md.use(csNamePlugin) } })` in `vite.config.ts:162`, or —
   simpler, and KISS — `<mark class="cs-name">` authored in the 11 documents, which are hand-written
   anyway. The composable's name claims syntax highlighting; its own docstring
   (`useMarkdownHighlighting.ts:68-69`) says *"Color-space-name marking"*. Two names, one job,
   neither of them highlighting.
2. **`demo/ui/`** (19 files) — L-5.
3. **`plugins/vite-source-export.ts` + the `@src` alias** — L-4.
4. **142 lines of dead CSS** — L-7.

Net: 408 + 83 + 93 = **584 lines across 3 files** → ≈ **177 lines across 4 files**, each with
one job and one seam.

### The waves — each individually completable (L-1)

Each closes on its own evidence in one session. This is a set of independent landings, not a
refactor arc:

| wave | change | closing evidence |
|---|---|---|
| **W-Lα** | generate `tsconfig.demo.json#paths` from `package.json#exports` (reuse the `vite.config.ts` generator) | `tsc --traceResolution` shows every value.js subpath resolving under the repo root with **no `Package ID`**; golden asserts it |
| **W-Lβ** | delete `demo/ui/` (19 files), rewrite 92 sites to `@mkbabb/glass-ui` | `grep -rn '"\.\./ui/' demo/` → 0; typecheck + `npm run gh-pages` green |
| **W-Lγ** | excise the 142 dead lines; extract the prose theme to `demo/styles/markdown.css` as `.md-prose` | style block 331 → ≈90; a DOM golden asserts *styled selector set == rendered selector set* |
| **W-Lδ** | move `assets/docs/*.md` → `demo/scenes/about/content/`; invert the Katex edge | `grep -rn "demo/" assets/` → 0 (or `assets/` gone) |
| **W-Lε** | `useMarkdownColors` → `useSafeAccentFn("resting")`; drop the throw-in-computed; retire `resolveSurfaceLightnessLive`'s markdown justification | deep imports 3 → 1; `mdColorVars` returns `{}` on unparseable input instead of throwing |
| **W-Lζ** | re-key the three eslint lattice objects onto the real tree; enable `vueCompilerOptions.strictTemplates` | `eslint --print-config Markdown.vue` shows a **live** `no-restricted-imports`; vue-tsc flags `surface`/`variant` on `Skeleton` |
| **W-Lη** | rename `Markdown` → `ColorSpaceGuide`; hoist `guides.ts` behind the seam; type it `Record<DisplayColorSpace, …>`; delete `DocItem` and the `as MarkdownSpace` cast | adding a space to `DisplayColorSpace` is a compile error |
| **W-Lθ** | register `/about` (and `/about/:space`) so the guide is addressable and auditable | the visual sweep captures the rendered guide; a deep link restores the space |

W-Lα is the one that must land first — it is the only defect that makes the rest of the repo's
evidence untrustworthy.

---

## What is NOT defective (the negative, proved)

- **The value.js import *specifiers* are correct.** `useMarkdownColors.ts:3-4` uses
  `@mkbabb/value.js/color` and `@mkbabb/value.js/css` — both real keys in `package.json#exports`.
  There is **no deep `src/` reach anywhere in this component's graph**:
  `grep -rn "@src" demo/ assets/` returns nothing. A real consumer could write these two lines
  verbatim. The defect is in the resolution lattice (L-1), not the specifier.
- **`verbatimModuleSyntax` is honoured.** `Markdown.vue:40` is `import type { DocModule }`;
  `useMarkdownHighlighting.ts:1` is `import type { ShallowRef }`. Zero mixed imports across the
  three files.
- **Vue 3.5 idioms are correct.** `useTemplateRef` (`Markdown.vue:50`, `Katex.vue:27`), reactive
  props destructure (`Markdown.vue:44`, `Katex.vue:22`), getter-passing into composables
  (`Markdown.vue:52-53`) rather than leaking `props`.
- **Only ONE dark store.** The historically-suspected third `useDark` is gone:
  `grep -rn "useDark\|useGlobalDark" demo/` returns 9 call sites, **all** of them
  `useGlobalDark` from `@mkbabb/glass-ui/dark` (the singleton App.vue constructs). No `vueuse`
  `useDark` survives anywhere in `demo/`. The named suspect at
  `useMarkdownHighlighting.ts:76` is a *comment describing a cure that landed*, not a live
  defect.
- **`Alert` is not a local re-implementation.** `demo/ui/alert/index.ts` genuinely re-exports
  glass-ui's primitive. The shim tree is the defect (L-5); duplicated component *logic* is not.
- **The `:deep()` reach is legitimate.** It targets content this repo compiles
  (`unplugin-vue-markdown` output), not a shadcn internal — the distinction `demo/DESIGN.md`
  draws. The comment at `Markdown.vue:81-97` is accurate about *why* it is needed.
- **No duplicate markdown renderer exists.** `grep -rn "Markdown" demo/` finds exactly one
  component and one consumer (`AboutPane.vue:50`). Whatever else is wrong, there is no second
  implementation of this concept alive elsewhere.
- **KaTeX's stylesheet import is correct.** `Katex.vue:20` imports it script-side, exactly to
  avoid the dead-scoped-CSS class this report faults elsewhere. That cure is real: the live DOM
  shows 9 `.katex` and 4 `.katex-display` nodes rendering.

---

*Evidence gathered against `/Users/mkbabb/Programming/value.js` @ `c654824e` (branch
`tranche-u`), live dev server `http://localhost:9000`, one Playwright DOM probe, one
`tsc --traceResolution` probe, one `eslint --print-config` probe. No source file was modified.*
