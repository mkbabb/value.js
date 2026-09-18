# CHALLENGE-L — library structure · `demo/scenes/about/katex/Katex.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE.** The premise holds. This component sits at the wrong altitude, in the wrong
tree, with a dependency edge that runs backwards, a box model owned by a foreign stylesheet,
and a 61-call-site public surface that no static gate in the repository can see. Twelve
findings below, eleven of them with a reproduction I ran and pasted.

The single strongest one is not any individual edge — it is that **this component should not
exist at all.** The repository already contains the correct idiom for this exact problem
(`plugins/vite-source-export.ts`: "pre-formatted with Prettier and pre-highlighted with
highlight.js at build time … No runtime formatting or highlighting libraries are needed"),
applies it to code, and then ships a 588 kB runtime math typesetter to render 64
compile-time-constant LaTeX strings. Math is the only content type in this repo that did not
get the treatment. That is a dual path (edict 2) at architectural altitude.

---

## Subject, verbatim

`demo/scenes/about/katex/Katex.vue` — 49 lines, 2 imports, 1 template element.

```
demo/scenes/about/katex/Katex.vue:2   <div class="inline-block" ref="katexElement"></div>
demo/scenes/about/katex/Katex.vue:6   import { useTemplateRef, onMounted, watch } from "vue";
demo/scenes/about/katex/Katex.vue:7   import katex from "katex";
demo/scenes/about/katex/Katex.vue:20  import "katex/dist/katex.min.css";
demo/scenes/about/katex/Katex.vue:48  watch(() => expression, renderKatex);
```

It imports nothing from `@mkbabb/value.js`. The published-subpath test is therefore vacuous
here and I record it as a **clean negative**: there is no deep `src/` reach, no
`@mkbabb/value.js/...` specifier at all, no false proof of the public API. `katex` and
`@types/katex` are correctly `devDependencies` (`package.json:90,104`) and `files`
excludes `dist/gh-pages` (`package.json:50-54`), so nothing here leaks into the published
package. Those two boundaries are sound.

Everything else is not.

---

## The dependency map, traced

```
demo/shell/viewSchema.ts:107            right: "about"          ← About is the DEFAULT right pane of "/#/"
demo/shell/usePaneRouter.ts:69,89       AboutPane (async)
demo/scenes/about/AboutPane.vue:82-92   import("../../../assets/docs/rgb.md")   ── demo ──▶ assets
assets/docs/rgb.md:2                    import { Katex } from "../../demo/scenes/about/katex"  ── assets ──▶ demo
demo/scenes/about/katex/index.ts:1      export { default as Katex } from "./Katex.vue"
```

Eleven `assets/docs/*.md` files carry that identical line-2 import:

```
$ grep -n "^import" assets/docs/*.md
assets/docs/hex.md:2:import { Katex } from "../../demo/scenes/about/katex";
assets/docs/hsl.md:2:…  hsv.md:2  hwb.md:2  kelvin.md:2  lab.md:2  lch.md:2
assets/docs/oklab.md:2  oklch.md:2  rgb.md:2  xyz.md:2         (11 files, one line each)
```

It is the **only** cross-boundary import any doc page makes:

```
$ grep -rn "@src\|?source" assets/
(no output)
```

So `assets/` reaches into `demo/` for exactly one thing, and that thing is this component.

---

## Findings

### L-1 · MAJOR — the dependency edge runs backwards, and it closes a cycle

`assets/` is content. `demo/` is the application. Content must not know the application.
Here `assets/docs/*.md:2` imports out of `assets/`, across the repo root, down into
`demo/scenes/about/katex/` — a *scene-private leaf three levels inside a feature tree* —
and `demo/scenes/about/AboutPane.vue:82-92` imports back the other way. The two directories
are mutually dependent at the directory level.

Worse than the cycle is the *specificity*: a doc page has taken a hard dependency on the
internal folder layout of one scene. Nothing in `demo/DESIGN.md`, `tsconfig.demo.json` or
`eslint.config.js` prevents `assets/docs/lab.md` from importing
`demo/picker/composables/useColorModel.ts` tomorrow. The boundary is not enforced; it is
merely unexercised.

**Evidence:** `assets/docs/rgb.md:2`, `demo/scenes/about/AboutPane.vue:82-92`,
`demo/scenes/about/katex/index.ts:1`.
**Reproduction:** the greps above.

### L-2 · MAJOR — 64 call sites, 0 covered by any static gate

`Katex`'s props contract is `{ expression: string; displayMode?: boolean }`
(`Katex.vue:22-25`). It is invoked 64 times. Every one of those invocations is invisible to
every gate this repo runs.

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit --listFiles | grep -c "assets/docs"
0
$ npx vue-tsc -p tsconfig.demo.json --noEmit --listFiles | wc -l
929
```

Zero of 929 program files. `tsconfig.demo.json` closes with
`"include": ["demo/", "src/vite-env.d.ts"]` — `assets/` is not in the program. And the doc
SFC blocks are `<script setup>` with **no `lang="ts"`** (`assets/docs/rgb.md:1`), so even if
included they would be JavaScript.

ESLint is blind too — `eslint.config.js` ignores `"**/*.md"` in its `ignores` array.

Tailwind is blind too: `demo/styles/foundation.css:91-92` declares
`@source "../../color-picker/**"` and `@source "../**"`; neither covers `assets/`. (Line 91
is additionally dead — see L-12.)

So the demo's *most-used component by call count* has its entire public surface outside the
typecheck program, outside the lint program, and outside the style program. That is not a
component with a weak contract; it is a component with **no contract**.

**Evidence:** pasted `--listFiles` counts; `tsconfig.demo.json:57`; `eslint.config.js`
ignores block; `demo/styles/foundation.css:91-92`.

### L-3 · MAJOR — the component's box model is owned by a *different* component, and I measured what that costs

`Katex.vue:2` hardcodes `class="inline-block"` on the root **regardless of `displayMode`**,
even though `displayMode` defaults to `true` (`Katex.vue:22`). KaTeX's own stylesheet makes
the display layer block-level and non-wrapping:

```
$ grep -o "\.katex-display[^}]*}" node_modules/katex/dist/katex.min.css | head -2
.katex-display{display:block;margin:1em 0;text-align:center}
.katex-display>.katex{display:block;text-align:center;white-space:nowrap}
```

The correction — turning the inline-block root back into a block with a scroll container —
does not live in `Katex.vue`. It lives in a **sibling component's scoped stylesheet**:

```
demo/scenes/about/markdown/Markdown.vue:301-306
    > div.inline-block:has(> .katex-display) {
        display: block;
        @apply overflow-x-auto;
        padding: var(--phi-1) 0 var(--phi-1) var(--phi-3);
        margin-block: var(--phi-1);
    }
demo/scenes/about/markdown/Markdown.vue:286-289
    p div.inline-block:has(> .katex), li div.inline-block:has(> .katex) { @apply mx-1; }
```

`Katex.vue` therefore has **zero** self-sufficient layout. 100 % of its box model is defined
in `Markdown.vue`, keyed on a *direct-child* relationship to `.markdown-body`. I proved the
consequences live against `http://localhost:9000/#/` (WebKit, 1440×900), by relocating a
real display-mode instance in the DOM:

```json
{
 "before":  { "display": "block",        "overflowX": "auto",    "sw": 462, "cw": 462 },
 "inP":     { "display": "inline-block", "overflowX": "visible", "sw": 479, "cw": 479 },
 "outside": { "display": "inline-block", "overflowX": "visible", "hostW": 300, "boxW": 557 }
}
```

- `before` — direct child of `.markdown-body`: correct, scrollable.
- `inP` — same document, same `.markdown-body`, but nested one level inside a `<p>`: the
  `>` combinator no longer matches. **The scroll container is gone.**
- `outside` — moved into a 300 px-wide host outside `.markdown-body`, i.e. exactly what any
  second consumer would get: **a 557 px box inside a 300 px parent, `overflow-x: visible`.
  257 px of formula, unclipped and unscrollable.**

That is the *identical* failure class the AB-1 comment block at `Katex.vue:8-19` and
`Markdown.vue:291-300` describes at length as cured. It is not cured. It was localised to
one call pattern and left latent everywhere else.

**Evidence:** the pasted measurement; `Katex.vue:2`; `Markdown.vue:286-306`.
**Reproduction:** `scratchpad/latent-probe.mjs`, output pasted above.

### L-4 · MAJOR — a Tailwind utility class is being used as a load-bearing structural contract between two modules

`Markdown.vue:287,288,301` select on `div.inline-block`. `inline-block` is a *Tailwind
utility*, an implementation detail of `Katex.vue:2`. There is no semantic hook — no
`data-katex`, no `.katex-host`, no component-owned class. I tested what a rename costs:

```json
"classSwapped": { "display": "block", "overflowX": "visible" }
```

Swapping the root class from `inline-block` to `katex-host` and re-parenting as a direct
child of `.markdown-body` **silently kills the `overflow-x: auto` correction**. No error, no
warning, no test failure — wide formulas simply start overflowing the card again.

This is the same defect that produced AB-1 (a CSS contract that dies silently when the DOM
it targets changes), re-expressed one layer up. The cure there was to stop scoping the
stylesheet; the cure here is for the component to own its own display and stop publishing a
utility class as an API.

**Evidence:** the pasted class-swap measurement; `Markdown.vue:301`; `Katex.vue:2`.

### L-5 · MAJOR (the gestalt one) — a 588 kB runtime typesetter on the landing route, against the repo's own established build-time idiom

Every one of the 64 expressions is a **compile-time string literal** in a markdown file.
None is derived from state. None changes at runtime. Yet the full KaTeX engine ships to the
client and typesets them in the browser, on the **default route**:

```
$ node scratchpad/net-probe.mjs      # WebKit, http://localhost:9000/#/, networkidle
KATEX REQUESTS ON DEFAULT ROUTE /#/ : 8
[{"u":"index.ts"},{"u":"Katex.vue"},{"u":"katex.js?v=4e022d5d"},{"u":"katex.min.css"},
 {"u":"KaTeX_Main-Regular.woff2"},{"u":"KaTeX_Math-Italic.woff2"},
 {"u":"KaTeX_Size4-Regular.woff2"},{"u":"KaTeX_Size3-Regular.woff2"}]
```

```
$ du -sh node_modules/katex/dist/katex.mjs node_modules/katex/dist/katex.min.css node_modules/katex/dist/fonts
588K  node_modules/katex/dist/katex.mjs
 24K  node_modules/katex/dist/katex.min.css
1.1M  node_modules/katex/dist/fonts
```

`katex` declares no `sideEffects` and exposes no tree-shakeable subpath
(`exports["."]` is a single monolith) — nothing of it can be dropped.

Meanwhile, thirty lines away in the same repo:

```
plugins/vite-source-export.ts:14-17
 * Appending `?source` to any TS import rewrites each exported
 * function/const into a named string export containing the original
 * source text — pre-formatted with Prettier and pre-highlighted with
 * highlight.js at build time.
plugins/vite-source-export.ts:21
 * No runtime formatting or highlighting libraries are needed.
```

Code snippets in these very doc pages are formatted and highlighted **at build time** by a
plugin this repo wrote, precisely so no runtime library ships. Math — the *only* other rich
content type in the same documents — takes the opposite path. Two mechanisms, one concept
("render rich content into a doc page"). That is a dual path (edict 2), and the wrong branch
is the one carrying 588 kB.

I verified the build-time path is trivially available: all 64 expressions render server-side
with zero failures.

```
$ node scratchpad/expr-check.mjs     # katex.renderToString, throwOnError: true
expressions: 64 | failing under throwOnError:true = 0
[]
```

### L-6 · MAJOR — zero test coverage, zero visual coverage, on a component with a documented catastrophic-regression history

```
$ grep -rn "katex\|Katex" test/ e2e/
(no output)
```

Not one unit test, not one e2e assertion. And the visual matrix does not reach it either:
`docs/tranches/V/megatranche/audit/visual/REPORT.md` captures 15 routes; About is not a
route — it is the right pane of `/#/` (`demo/shell/viewSchema.ts:104-112`) — and the
formulas sit below the viewport fold. I read
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/picker.png`: the About
card is visible down to "Key Properties"; **no KaTeX output appears in any of the 60
captures.**

The AB-1 comment at `Katex.vue:8-19` documents that this component previously shipped with
all 231 stylesheet rules dead, a duplicate visible MathML layer, and a 6400 px stretchy
brace. That regression was invisible to CI then and would be invisible to CI now.

**Evidence:** the grep; the screenshot read; `REPORT.md` route list.

### L-7 · MINOR — the render is imperative with an incomplete dependency list

```
demo/scenes/about/katex/Katex.vue:46   onMounted(renderKatex);
demo/scenes/about/katex/Katex.vue:48   watch(() => expression, renderKatex);
```

`renderKatex` reads **both** `expression` (line 31) and `displayMode` (line 33), but only
`expression` is watched. A `displayMode` flip re-renders nothing.

**Reproduction: NONE — this is a hypothesis at the behavioural level.** Statically it is
certain (the watcher source is a single getter), but all 64 call sites pass a literal, so no
live path exercises it. It is recorded as a structural symptom, not a live bug: the DOM here
is a hand-maintained mirror of props rather than a derivation of them, and hand-maintained
mirrors drift.

### L-8 · MINOR — `throwOnError: false` is a masking fallback (edict 2)

`Katex.vue:36`. A malformed expression renders as red inline error text instead of failing.
Given L-2 (no typecheck at any call site) and L-6 (no tests), this is the *only* thing
standing between a LaTeX typo and silently-shipped red text on the landing route.

Honest negative: it currently masks nothing — `expr-check.mjs` shows 0/64 expressions fail
under `throwOnError: true`. The defect is that the safety net exists at all, in a place where
every real gate is absent.

### L-9 · MINOR — a directory and a barrel module for one 49-line component (edict 3, KISS)

```
$ cat demo/scenes/about/katex/index.ts
export { default as Katex } from "./Katex.vue";
```

One folder, one barrel, one line, one export, zero encapsulation. Its only reason to exist is
so `assets/docs/*.md` can write a directory specifier — i.e. it exists to service L-1.
Contrast `demo/scenes/about/markdown/index.ts`, which at least carries the `DocModule` /
`DocItem` types. Compare `demo/shared/ui/` (`EmptyState.vue`, `PaneHeader.vue`) — flat files,
no per-component folder. This is the outlier.

### L-10 · MINOR — `vite.config.ts` documents a rationale that is factually false at HEAD

```
vite.config.ts:70-73
 // platform/shell/shared/scenes + the feature trees). `@src` SURVIVES
 // for the EXEMPT `assets/docs/*.md` reference pages, which embed live
 // source snippets via `@src/…?source` (the `sourceExportPlugin`), and
 // for the vitest suite's own `@src` alias in `vitest.config.ts`.
```

```
$ grep -rn "@src\|?source" assets/
(no output)
$ grep -rn "@src" --include="*.ts" --include="*.vue" --include="*.md" . | grep -v node_modules | grep -v "^./docs/"
… only vite.config.ts, tsconfig.demo.json, vitest.config.ts, and 5 files under test/
```

No doc page uses `@src` or `?source`. The alias at `vite.config.ts:74` is dead for the app
build; only the vitest program still needs it. The comment is load-bearing documentation
that now misdescribes the tree — and it is the *only* written justification for `assets/`
being permitted to import anything at all. Remove the false half and L-1's remaining edge
stands entirely undefended.

### L-11 · BLOCKER — `npm run gh-pages` at HEAD emits 59 KaTeX font files (1.1 MB) and no application

Reproduced three times, each into a scratch outDir (nothing in the repo was written):

```
$ npx vite build --mode gh-pages --outDir <scratch>/ghp --emptyOutDir
✓ built in 4.40s
$ ls <scratch>/ghp/assets | wc -l ;  ls <scratch>/ghp/assets | grep -v "woff\|ttf\|otf"
63
favicon-BpOvZXpk.svg
glass-fonts-DH5GtBvs.css
index-Dezn_h7o.js          ← 0.69 kB
quantize-worker-xMwe415C.js
$ cat <scratch>/ghp/assets/index-Dezn_h7o.js
(function(){let e=document.createElement(`link`).relList; …modulepreload polyfill only… })();
```

The entire application bundle is Vite's modulepreload polyfill. Zero app code, zero `katex`
JS, zero `katex` CSS — and yet **59 KaTeX font files, 1.1 MB**, all emitted. The CSS asset
graph was walked far enough to emit every `url()` target of `katex.min.css` while the
stylesheet itself and the whole module graph were dropped.

The same result appears with `deferGlassFonts()` removed (`ghp3`: 62 files, 59 of them
KaTeX, `index-*.js` still 0.69 kB), so that plugin is not the cause. The existing
`dist/gh-pages` in the working tree (built 2026-07-27 18:46) has the identical 698-byte
`index-Dezn_h7o.js` — so this is not an artefact of my invocation.

I formed and then **falsified** the obvious hypothesis: `package.json:19` declares
`"sideEffects": false` at the package root, and `demo/` has no `package.json` of its own
(`find demo -name package.json` → none), so the whole demo graph is nominally marked
side-effect-free while the entry (`demo/color-picker/index.html:205-213`, an inline
`<script type="module">` whose entire body is `createApp(App).use(router).mount("#app")`) is
*pure* side effect. Forcing `rolldownOptions.treeshake = { moduleSideEffects: true }` did
**not** resurrect the bundle (`ghp2`: still 0.69 kB). Cause remains unidentified.

Attribution, stated plainly: this is the known W44 §F "gh-pages prod-preview empty-mount"
carry, independently reproduced from a cold start, and it is **not** caused by `Katex.vue`.
What *is* attributable here is that KaTeX is the largest single asset family in the broken
artefact — 1.1 MB of orphan fonts with no stylesheet to reference them — and that anchoring
that corpus to a leaf scene component is what makes it survive a build that drops everything
else. `docs/…/visual/shots/LIVE-color.babb.dev.png` shows the deployed site rendering
correctly, which makes this a regression at HEAD rather than a long-standing state.

### L-12 · INFO — two collateral dead references found while tracing the CSS path

Both are outside this component but were turned up by tracing its stylesheet and are cheap to
verify:

1. `plugins/vite-defer-glass-fonts.ts:73` guards on
   `id.includes("demo/@/styles/style.css")`. `demo/@` does not exist — W43 (RF-15) killed the
   `@` tree.
   ```
   $ ls -d demo/@            → No such file or directory
   $ grep -rn "__GLASS_FONTS_DEFERRED__" demo/
   demo/styles/foundation.css:75:/*__GLASS_FONTS_DEFERRED__*/
   ```
   The transform can never fire, so the marker is neither stripped in build nor replaced in
   dev. The plugin's `renderStart` emit half still runs (hence the 132 kB
   `glass-fonts-*.css`), but the deferral half — its entire stated purpose — is dead.

2. `demo/styles/foundation.css:91` — `@source "../../color-picker/**/*.{vue,ts,html}"`
   resolves to `<repo>/color-picker/**`:
   ```
   $ ls -d demo/styles/../../color-picker  → No such file or directory
   $ ls -d demo/styles/../color-picker     → demo/styles/../color-picker
   ```
   Same W43 move, same missed `..`. Harmless only because line 92 (`@source "../**"`) happens
   to cover the same tree.

---

## Ownership duplication — the checks the brief named

| Suspect | Result |
| --- | --- |
| Deep `src/` import / bypass of the `exports` map | **Clean.** Zero `@mkbabb/value.js` imports; zero `@src`. |
| `katex` misplaced in `dependencies` | **Clean.** `devDependencies` (`package.json:104`), `files` excludes `dist/gh-pages`. |
| Logic that belongs in `src/` | **Clean.** No color/value/math logic here. |
| Logic that belongs in glass-ui | **Partial defect, see below.** |
| Second implementation of the same concept | **Defect — L-5.** Build-time rich-content rendering (`vite-source-export.ts`) vs runtime (`Katex.vue`). |
| God module | **Clean.** 49 lines, one job. |
| Three parallel `useDark` stores | **Clean here.** `useMarkdownHighlighting.ts:76-80` documents that S.W4-8 already killed the private `useDark`; the one authority is glass-ui `useGlobalDark`. Nothing in the KaTeX path touches theme. |

**The glass-ui half.** `Katex.vue:20` imports a stylesheet that declares **20 `@font-face`
rules** across 251 total rules, including two bare `body { … }` selectors:

```
$ grep -o "@font-face" node_modules/katex/dist/katex.min.css | wc -l   →  20
$ grep -o "body{[^}]*}" node_modules/katex/dist/katex.min.css
body{position:relative}                       (…that one is .accent .accent-body, a false hit)
body{counter-reset:katexEqnNo mmlEqnNo}       (…this one is a genuine global)
```

This repo runs an explicit **three-voice typography law** with a single source token per
voice (`demo/styles/foundation.css:205-218`, `--font-stack-display: "Fraunces"…`, and the
`--font-mono` / `--font-serif` bridges documented at lines 95-102). KaTeX introduces a
**fourth voice** — `KaTeX_Main`, `KaTeX_Math`, `KaTeX_Size1-4`, `KaTeX_AMS`, `KaTeX_Caligraphic`,
`KaTeX_Fraktur`, `KaTeX_SansSerif`, `KaTeX_Script`, `KaTeX_Typewriter` — entirely outside
that law, entering the document through a side-effect import in a leaf scene component, plus
a global `body` rule. The math voice is un-tokenized and unowned. Under edict 4 the
typographic surface belongs at the design-system root, and under edict 5 the entry point
belongs at `demo/styles/`, not at a per-component leaf.

---

## Modularization — the greenfield lattice

Written concretely, with no hedging. The concept is **"reference documentation pages that
contain typeset math and highlighted source."** It has exactly one home.

```
content/docs/                     rgb.md hex.md hsl.md … (11)
                                  pure markdown. $inline$ / $$display$$. no <script setup>.
                                  ZERO imports. content knows nothing about the app.

plugins/vite-docs.ts              ONE build-time document transform.
                                    ├─ markdown-it + @vscode/markdown-it-katex
                                    │    → renderToString at BUILD time, throwOnError: TRUE
                                    │    → emits <figure class="math-display"> / <span class="math-inline">
                                    └─ folds in today's sourceExportPlugin `?source` half
                                       (same idiom, same stage, one plugin)

demo/scenes/about/DocPage.vue     renders the compiled module.
                                  owns the φ ladder + the math figure's overflow-x, on a
                                  SEMANTIC class it emitted itself.

demo/styles/math.css              the math voice: the 24 kB KaTeX sheet, entering at the
                                  typography root beside the three existing voices, with the
                                  face stack behind a --font-stack-math token.
```

**What this deletes, by construction:**

- `demo/scenes/about/katex/Katex.vue` and `demo/scenes/about/katex/index.ts` — gone (L-9).
- the `assets/ → demo/` edge and the directory cycle — gone (L-1). Content has no imports.
- 588 kB of client-side `katex` — gone (L-5). The landing route stops shipping a typesetter.
  Remaining cost: 24 kB CSS + the 4 woff2 faces actually fetched (~90 kB), down from 588 kB
  JS + 24 kB CSS + fonts.
- `Markdown.vue:286-306` — gone (L-3, L-4). The figure owns its own overflow; no `:has()`
  reach into a foreign component's utility class.
- the 64 un-gated call sites — gone (L-2). `$$…$$` is content; there is no props contract to
  check because there are no props.
- `throwOnError: false` — gone (L-8). A build-time render can fail the build; a runtime
  render cannot, which is exactly why the fallback exists.

**Precedent, not invention.** Every mechanism above already exists in this repo:
`plugins/vite-source-export.ts` is the build-time-content-transform pattern verbatim;
`unplugin-vue-markdown` is already in the plugin chain (`vite.config.ts:161-163`);
`demo/styles/` is already the typography root. Nothing new is introduced. This is
consolidation onto the branch the repo already chose for code, extended to math. It satisfies
edict 3 (no new shared/ dirs, no wrapper components) because it creates **fewer** modules than
exist today.

### If the build-time transposition is declined — the minimum structural cure

In strict priority order. Each is independently landable.

1. **Own the box.** `Katex.vue:2` becomes
   `<div :class="displayMode ? 'katex-block' : 'katex-inline'" ref="katexElement">` with
   `.katex-block { display:block; overflow-x:auto }` in its **own** `<style scoped>`
   (script-side CSS import stays, per AB-1). Delete `Markdown.vue:286-306`. Cures L-3 and L-4
   together — the component becomes correct in any host.
2. **Make it declarative.** Replace lines 27-48 with
   `const html = computed(() => katex.renderToString(expression, { displayMode, output: "htmlAndMathml", throwOnError: true }))`
   plus `v-html`. Deletes the template ref, `onMounted`, the incomplete `watch`, and the
   masking fallback in one stroke. Cures L-7 and L-8; the file drops to ~15 lines.
3. **Gate the call sites.** Add `"assets/docs/**/*.md"` to `tsconfig.demo.json` `include`,
   add `lang="ts"` to the eleven doc `<script setup>` blocks, and narrow the eslint
   `"**/*.md"` ignore to exclude `assets/docs/`. Cures L-2.
4. **Re-home the component.** `demo/shared/ui/Katex.vue`, flat, no barrel — it is provably not
   About-specific, since its only consumers live outside `demo/scenes/`. Cures L-9 and makes
   L-1 a boundary between *content* and *shared UI* rather than content and a scene leaf.
5. **Move the stylesheet to the typography root.** `import "katex/dist/katex.min.css"` leaves
   `Katex.vue` for `demo/styles/`, behind a `--font-stack-math` token, beside the other three
   voices. Cures the edict-4/5 half.

---

## Negative proof — what I checked and found sound

Recorded so the absence of a finding is evidence, not silence.

- **Published-surface integrity.** `grep` for `@mkbabb/value.js`, `@src`, and `dist/` inside
  `Katex.vue` and the eleven doc pages: zero hits. No deep import, no demo-only path, no
  false proof of the public API. The `exports` map (`package.json:20-48`, 7 subpaths) is
  untouched by this component.
- **Dependency placement.** `katex` + `@types/katex` are `devDependencies`; `files` excludes
  `dist/gh-pages`; the library build (`vite.config.ts:167-239`) has no HTML entry and never
  sees `demo/`. Nothing here can leak into the npm artefact.
- **`verbatimModuleSyntax` (edict 8).** `Katex.vue` has no type-only import to mark; both
  imports are value imports. Compliant by having nothing to violate.
- **Vue 3.5 idioms (edict 7).** `useTemplateRef` at line 27 and reactive props destructure at
  lines 22-25 are both correct and current. No `defineModel` round-trip, so no `shallowRef`
  requirement.
- **Animations (edict 6).** No keyframes defined or deleted; nothing to preserve.
- **God module (edict 1).** 49 lines, two imports, one responsibility.
- **`useDark` triplication.** `useMarkdownHighlighting.ts:76-80` confirms S.W4-8 already
  collapsed this to glass-ui `useGlobalDark`; the KaTeX path holds no theme state at all.
- **`ActionBarLayer` / `usePaletteExport` duplication suspects.** Neither is reachable from
  this component's graph; not applicable.
- **Expression validity.** All 64 LaTeX strings render clean under `throwOnError: true`
  (`expressions: 64 | failing = 0`). The content itself is correct.
- **Lazy loading.** At 390 px the About pane is not mounted and **zero** KaTeX assets are
  requested (probe returned `dispCount: 0`, no katex stylesheets in `document.styleSheets`).
  The `defineAsyncComponent` + per-doc `import()` boundaries do work; the cost in L-5 is a
  desktop-landing-route cost, not an unconditional one.

---

## Artefacts

Probe scripts (scratchpad, outside the repo; nothing in the working tree was modified):

- `…/scratchpad/katex-probe.mjs` — DOM census of rendered instances, stylesheet count, font faces.
- `…/scratchpad/latent-probe.mjs` — the relocation + class-swap measurements in L-3/L-4.
- `…/scratchpad/net-probe.mjs` — network census on `/#/`.
- `…/scratchpad/expr-check.mjs` — all 64 expressions under `throwOnError: true`.
- `…/scratchpad/vite.probe.config.mts` — read-only gh-pages config variant used to falsify the
  `sideEffects` hypothesis in L-11.

Repository writes from this seat: this file only.
