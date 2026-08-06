claude-opus-5[1m] (served model id)

# CHALLENGE — `PaperArticleWindow.vue` · axis **C (CONSUMPTION)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperArticleWindow.vue` (212 lines)
**Axis** how this component consumes value.js `0.13.0` / keyframes.js `4.3.0` / glass-ui `4.0.0` / `@mkbabb/latex-paper 0.2.1` / the 45-operation fourier API; props/emits contract quality; integration seams.
**Posture** DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its falsifier. Superlatives carry falsifiers too (L-18 runs both ways).
**Method** static + source-derived only. No browser. Live-only claims tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read whole** the component; `web/src/lib/figureDimensions.ts` (57); `web/src/components/paper/PaperView.vue` (685, the sole caller); `web/src/components/paper/useScrollNavigation.ts`; `web/src/router/index.ts`; `web/src/style.css`; `web/vite.config.ts`; `web/package.json`; and read-only into `node_modules`: `@mkbabb/latex-paper@0.2.1` (`dist/vue.js`, `dist/chunk-5VAEDP55.js`, `dist/vue/**/*.d.ts`, `dist/types/output.d.ts`, `src/vue/theme.css`), `@mkbabb/glass-ui@4.0.0` (`dist/styles/utilities/base.css`, `dist/styles/tokens/*`, `dist/styles/theme/bridges.css`, `dist/components/ui/button/*.d.ts`), `@vue/runtime-core@3.5.38` (`setRef`).

**Corpus folded (not re-invented)**
`docs/tranches/V/megatranche/formation/fourier/lane-frontend.md` (dep table §1 L58-61, glass-ui paper-family import paste L282-290, peer-floor rows L479-492, F.W2 §640), `CENSUS-2026-08-03.md` (pins L37, value.js 5-site surface L38, PaperArticleWindow row L158, F.W2 charter L187-188, tri-package P0 L218-220), `lane-crud.md`, and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (rows **R4-8**, **R5-7**, **R6-5** cited below).

---

## §0 — CONSUMPTION INVENTORY (the ground truth, before any finding)

Measured against the installed trees, not the manifests.

| substrate | manifest | installed | **this component's consumption** | evidence |
|---|---|---|---|---|
| `@mkbabb/value.js` | `^0.13.0` | `0.13.0` | **ZERO** — no import, no transitive call | `grep -rn "@mkbabb/value.js" web/src` → 5 hits, all in `equation/` + `lib/easings.ts`; none in `components/paper/` |
| `@mkbabb/keyframes.js` | `^4.3.0` | `4.3.0` | **ZERO** | `grep -rn "@mkbabb/keyframes.js" web/src` → `composables/useFourierMorph.ts:14` only |
| fourier API (45 ops) | — | — | **ZERO** — no `lib/api.ts`, no store, no fetch | component import list = lines 2-9 |
| `@mkbabb/glass-ui` | `^4.0.0` | `4.0.0` | **3 utility classes, 0 component imports** | `.deferred-section` (L74), `.cm-serif` (L111), `.fourier-f` (L116) + 5 theme custom properties (L182,184,195,196,200) |
| `@mkbabb/latex-paper` | `^0.2.1` | `0.2.1` | **the load-bearing seam**: 2 components + 1 type + 2 slot contracts | L2-6, L76-122 |
| `lucide-vue-next` | `^1.0.0` | — | 1 icon | L8 |

Two consequences the parent audit should book straight away:

1. **F.W2 blast radius on this component is nil.** The F.W2 charter (CENSUS L187-188: "5 bare specifiers → `/easing`, delete the `colors.ts` hand-rolled arms") touches nothing here. This file imports neither value.js nor `lib/colors.ts`. It is the only paper-family component with a *zero* value.js surface **and it should stay that way** — nothing in its job (URL string building, figure geometry, spacer divs) wants a colour/easing runtime.
2. **The tri-package deadlock (CENSUS L218-220 / lane-frontend L492) reaches this file only through `.deferred-section`.** glass-ui 4→7 must keep that utility (or supply a rename) or §B-1 below changes shape rather than disappearing.

**Overlap with the adjudicated intake.** The `v-for` at **L71 is on a native `<div>`**, not a component callsite — exactly the derivation blind spot adjudicated TRUE at **R5-7** and cured by **R6-5**'s `NATIVE_TEMPLATE_LOOP` family. Any instance/loop denominator built on component callsites (the R4-8 census: `physicalCallsites` 512, `mountedSubjects` 1105) **drops this component's entire section loop**, i.e. the whole rendered paper body, precisely as it dropped `PaperSidebar`'s three `<li v-for>` rows. This is a second live witness for R5-7 that the intake did not enumerate; it strengthens, not contradicts, that row.

---

## §1 — BLOCKER

### B-1 · `.deferred-section` is consumed into the one seam it is contraindicated for: the element `useVirtualSectionWindow` measures with `offsetHeight`

**Severity** BLOCKER
**Provenance** `PaperArticleWindow.vue:74` (`class="paper-window-section deferred-section"`), `:167` (`--deferred-section-size: 1200px`), `:141-166` (the 26-line comment asserting safety); `node_modules/@mkbabb/glass-ui/dist/styles/utilities/base.css:477-480`; `node_modules/@mkbabb/latex-paper/dist/vue.js:822, 866-893, 941`; `PaperView.vue:74-83` (`overscanAfterPx: 720`, `warmTargetAfter: 3`).

**The claim.** The component applies glass-ui's `content-visibility: auto` recipe to *the very element the virtualiser measures*, and then retunes the never-painted estimate to a **single global constant, 1200px**. The library's measurement path is:

```js
// latex-paper dist/vue.js:878-893
function measureSection(id, el) {
  if (!el) { disconnectSection(id); return; }
  const current = elementMap.get(id);
  if (current === el) { syncMeasuredHeight(id, el.offsetHeight); return; }   // sync, every patch
  disconnectSection(id); elementMap.set(id, el);
  requestAnimationFrame(() => { const t = elementMap.get(id); if (t) syncMeasuredHeight(id, t.offsetHeight); });
}
// :866-874
function syncMeasuredHeight(id, height) {
  const normalized = Math.max(1, Math.round(height));
  ...
  measuredHeights.set(id, normalized);
  SESSION_HEIGHT_CACHE.set(id, normalized);   // module-level Map, survives remount
  ...
}
// :822 — the layout source of truth
return measuredHeights.get(item.id) ?? SESSION_HEIGHT_CACHE.get(item.id) ?? item.estimatedHeight;
```

For a `content-visibility: auto` box that is currently render-skipped, `offsetHeight` returns the **`contain-intrinsic-size`**, and with `auto <length>` that is the last-remembered size *if one exists* — otherwise the literal length. A section that has been **mounted but never painted has no remembered size**, so it reports **1200**. The window mounts such sections by design: `overscanAfterPx: 720` mounts up to 720px past the fold (Chromium's `content-visibility: auto` relevancy margin is ~50% of the viewport, i.e. ~450px on a 900px viewport — so the 450→720px band is mounted *and* skipped), and `ensureTargetWindow` (`dist/vue.js:894-908`, called by `useScrollNavigation` on every TOC jump) mounts `warmTargetBefore 2 / warmTargetAfter 3` sections around a target the user has not scrolled to yet — all of them skipped, all of them reported as 1200.

**Net effect.** `.deferred-section` converts the library's per-section, content-derived `estimatedHeight` (`flattenPaperSections` → `estimatePaperSectionHeight`, `dist/vue.js:1004-1060`) into a **uniform 1200px pseudo-*measurement*** for exactly the sections the virtualiser cannot see — and `measuredHeights` sits *first* in the `??` chain at `:822`, so the synthetic value **outranks** the better estimate. Then `SESSION_HEIGHT_CACHE.set` (`:871`) persists it in a module-level `Map` that is re-seeded into `measuredHeights` on every items-watch (`:941`), so the poisoning survives component remount for the life of the page.

**Failure scenario (concrete).** Load `/paper`. `visibleItems` mounts the intro plus the overscan tail; sections 4-8 sit 500-4000px below the fold, skipped. Their rAF measurement writes `measuredHeights[id] = 1200` each. `buildSectionLayout` sums those → `bottomSpacerPx` (`PaperArticleWindow.vue:129`) is computed from `1200 × n` instead of the real heights (real §-heights in this paper range from ~300px for a two-paragraph subsection to ~3000px for a theorem-dense chapter). The scroller's `scrollHeight` is therefore wrong; `PaperView.vue:186-192` computes the reading-progress bar as `scrollTop / (scrollHeight - clientHeight)` off that number, and the scrollbar thumb resizes on every re-measure as sections paint and correct from 1200 to their real height. Open the ToC and jump to §14: `ensureTargetWindow` warms 5 unpainted sections at 1200 each, `getOffsetFor` (`:909-911`) returns an offset built on them, and `useScrollNavigation.estimateAbsoluteTop` (`useScrollNavigation.ts:52-59`) teleports to it.

**What the component's own comment claims, and why it is false.** Lines 158-161: *"Sections are measured on a post-mount rAF … i.e. AFTER first paint, so the remembered size is always the real one"* and lines 162-165: *"the estimate only applies to a section that has never painted (never the measured case)."* Both premises fail: `measureSection` fires on mount and on **every subsequent patch**, unconditionally, with no paint precondition anywhere in `dist/vue.js:878-893`; and "mounted but never painted" is not an edge case here — it is the steady state the `overscanAfterPx: 720` / `warmTargetAfter: 3` configuration deliberately produces. The comment identifies the right hazard (`auto` vs. plain intrinsic size) and then mis-locates it: the `auto` prefix rescues *re-entry* after a first paint; it does nothing for first mount, which is where this virtualiser takes its reading.

**Falsifiers, applied.**
- *"`contain-intrinsic-size: auto` returns the real height for a never-painted element."* Impossible — there is no real height to remember; css-sizing-4 falls back to the explicit `<length>`. Survives.
- *"All mounted sections are painted."* Refuted by `PaperView.vue:78-82` (`overscanAfterPx: 720`, `warmTargetAfter: 3`) against Chromium's ~50%-viewport relevancy margin. Survives.
- *"Vue's inline arrow ref at `:73` re-fires `measureSection(id, null)` on every render, flushing the height."* **This falsifier KILLS a stronger version of the claim and I withdraw it.** `@vue/runtime-core/dist/runtime-core.esm-bundler.js:1803-1817` handles old-ref teardown only for `isString(oldRef)` and `isRef(oldRef)` — a *function* ref is never re-invoked with `null` on re-render, only on unmount (`:6670`). So there is no null-flush; the inline arrow is merely wasteful, not corrupting. The claim above does not depend on it.
- *"e2e proves the jumps land."* `web/e2e/paper-performance.spec.ts:176-214` ("far TOC jumps land on DFT … without over-mounting") is green **because `useScrollNavigation` masks it**: `computeAbsoluteTop` (`useScrollNavigation.ts:32-46`) prefers the real `getBoundingClientRect` once the element exists, and the correction loop (`MAX_CORRECTIONS 10`, `STABLE_TARGET 2`, `STABILITY_PX 6`, `:15-18`) iterates until stable. **Navigation is compensated. The spacer, `scrollHeight`, scrollbar thumb and progress bar are NOT** — nothing re-derives them from real geometry. The blocker stands on the un-compensated half.
- `UNPROVEN-NEEDS-LIVE` (SS-13): the *magnitude* — how many sections report 1200 at a given scroll position, and the resulting px drift — needs a live `document.querySelectorAll('.paper-window-section')` + `offsetHeight` sweep. The *mechanism* is fully source-derived and does not need a browser.

---

## §2 — MAJOR

### M-1 · The `#figure` slot override silently discards latex-paper's image-error recovery contract

**Severity** MAJOR · **Provenance** `PaperArticleWindow.vue:84-108`; `node_modules/@mkbabb/latex-paper/dist/vue.js:1644-1649`.

The library's default figure renderer is not a bare `<img>` — it carries a failure path:

```js
// dist/vue.js:1644-1649
$setup.effectiveSlots.figure
  ? renderSlot(...)                                   // ← the consumer's override
  : $setup.failedImages.has(block.figure.filename)
    ? createElementBlock("div", _hoisted_122)          // .paper-figure-placeholder
    : createElementBlock("img", { src, alt, loading:"lazy", onError: $ev => $setup.onImageError(block.figure.filename) })
```

`.paper-figure-placeholder` is a real styled recipe (`src/vue/theme.css:637-644`: dashed border, `aspect-ratio: 4/3`, muted fill). By supplying `#figure`, this component takes the first branch and inherits **none** of it: there is no `@error` handler anywhere in `PaperArticleWindow.vue`, so a 404 or decode failure now renders the browser's broken-image glyph inside a `<figure>` whose `<figcaption>` still reads "Figure 2.1: …". This compounds M-2 and the `<picture>` semantics the component itself documents at `:41-43`.

**Falsifier** an `@error`/`onerror` binding on `:96-106`, or a `<picture>`-level fallback. `grep -n "error" PaperArticleWindow.vue` → 0 hits. Survives.

### M-2 · `hasModernVariants` is keyed to the wrong source of truth, guarding a `<picture>` that cannot 404-fall-back

**Severity** MAJOR (latent BLOCKER) · **Provenance** `web/src/lib/figureDimensions.ts:52-57`; `PaperArticleWindow.vue:44-59, 86-95`.

```ts
// figureDimensions.ts:52
const TRANSCODED_FIGURES = new Set(Object.keys(FIGURE_DIMENSIONS));
export function hasModernVariants(png: string) { return TRANSCODED_FIGURES.has(png); }
```

The predicate the component uses to decide "may I emit `<source type=image/avif>`?" actually answers "**do I know this figure's pixel dimensions?**". Those are two independent facts joined by a hand-typed literal. The component's own comment (`:41-43`) states the exact reason this matters — *"`<picture>` does NOT fall back on a 404 — only on an unsupported format"* — so a figure that is in the map but not transcoded yields a `<source>` the browser **accepts** (AVIF is supported) and then fails to fetch, with **no fallback to the `<img>`** and (per M-1) no placeholder either. Permanent broken image.

**And nothing keeps the two facts in sync.** There is no transcode step in the repo: `grep -rn "avif|webp|transcode|sharp|cwebp" --include=*.{py,sh,ts,js} --include=Makefile . | grep -v node_modules` returns only *consumers* of the strings (`api/routers/images.py`, e2e fixtures, this very file) — **no generator, no vite plugin, no manifest, no CI check**. `web/vite.config.ts` has no asset glob. `FIGURE_DIMENSIONS` is 26 hand-typed rows; the `.avif`/`.webp` siblings are hand-produced and committed.

**Falsifier — applied, and it holds today.** I enumerated `assets/`: 28 `.png`, 26 `.avif`, 26 `.webp`, 26 `.pdf`; `comm` on the stems shows the only PNGs without modern siblings are `fourier.png` and `maintainer-avatar.png`, neither a paper figure and neither in the map. `grep -c includegraphics paper/fourier_paper.tex` → 26, and all 26 resolved basenames are map keys. **So the guard is correct at HEAD.** That is precisely the argument for MAJOR rather than MINOR: the invariant is real, load-bearing, and enforced by nothing but two people typing the same 26 names into two places.

### M-3 · Shadow button — the sole component in `components/paper/` that hand-rolls a CTA instead of consuming `@mkbabb/glass-ui/button`

**Severity** MAJOR · **Provenance** `PaperArticleWindow.vue:112-119, 188-211`; lane-frontend L282-290; `node_modules/@mkbabb/glass-ui/dist/components/ui/button/Button.vue.d.ts:4-10`.

`.callout-btn` re-implements a pill CTA from scratch — inline-flex + gap, `padding: .625rem 1.5rem`, `@apply text-base`, `font-weight: 600`, `--primary`/`--primary-foreground`, `border-radius: 9999px`, a `color-mix` shadow, a hover lift and (see m-5) a focus ring exiled to a different file. The census paste (lane-frontend L282-290) enumerates the paper family's glass-ui button adoption: `MobileFloatingToc.vue:3`, `PaperSidebar.vue:6`, `PaperView.vue:22`, `search/PaperSearchDropdown.vue:3`, `search/PaperSearchInput.vue:3`, `search/PaperSearchModal.vue:3` — **six sibling files import `Button`; this one does not.**

It is not a capability gap. glass-ui 4.0.0's `Button` extends reka-ui `PrimitiveProps`:

```ts
interface Props extends PrimitiveProps { variant?: …; size?: …; class?: …; type?: …; disabled?: … }
```

so `<Button as-child variant="default"><router-link :to="callout.link">…</router-link></Button>` is a drop-in that keeps the `<a>` semantics, inherits the token-driven pill, and deletes 24 lines of CSS plus the cross-file focus-ring split.

**Falsifier** a glass-ui `Button` variant that cannot render a router-link, or a visual requirement no variant covers. `buttonVariants` ships 14 variants × 6 sizes including `link`, `glass`, `primary-audacious`; `as`/`asChild` covers the anchor. Survives.

### M-4 · `resolveFigure()` is invoked **7×** per figure per render, allocating a fresh object each time

**Severity** MAJOR · **Provenance** `PaperArticleWindow.vue:87, 88, 92, 93, 97, 99, 100`.

Seven independent template expressions each call `resolveFigure(figure.filename)`. Each call performs 2 `RegExp.replace`s, an object index, a `Set.has`, and 3 template-literal concatenations, returning a **new object** — so `v-if` and the `:srcset` it guards operate on *different object identities*, and Vue's patcher sees fresh strings each time. Template expressions are not memoised; every re-render of `PaperArticleWindow` (i.e. every `visibleItems` change — every scroll-driven `recalculate`, `dist/vue.js:844-864) re-runs all seven for every figure in the window.

The fix is one line — `<template #figure="{ figure }"><picture v-for-free :key>` with a `const f = resolveFigure(figure.filename)` hoisted into a `computed`-per-figure or a memo `Map` keyed on filename (the input set is 26 static strings; a module-level memo makes it exactly 26 calls for the life of the page).

**Falsifier** Vue caching identical template call expressions. It does not — `cacheHandlers` applies only to `on*` handlers; there is no CSE in `@vue/compiler-sfc`. Survives.

---

## §3 — MINOR

### m-1 · Dead `.pdf`→`.png` normalisation, and a doc comment that states the inverse of the library's contract
**MINOR** · `PaperArticleWindow.vue:39, 45`; `node_modules/@mkbabb/latex-paper/dist/chunk-5VAEDP55.js:624-626`.
The parser already normalises before the slot ever sees the value:
```js
filename = f.value.replace(/^.*\//, "");        // basename
if (!filename.includes(".")) filename += ".png";
filename = filename.replace(/\.pdf$/, ".png");  // ← already done
```
So `figure.filename` is **always** a `.png` basename, `:45`'s `filename.replace(/\.pdf$/, ".png")` can never match, and the comment at `:39` — *"The figure source is a `.pdf` name"* — contradicts the installed 0.2.1 contract. (Note `fourier_paper.tex:86` genuinely passes a `.png` to `\includegraphics`, so even the TeX is not uniformly `.pdf`.)
**Falsifier** a latex-paper version reaching the app that omits the normalisation. Installed is 0.2.1 = the manifest pin `^0.2.1`; `dist/chunk-A7GY23HR.js:498-503` passes `node.filename` through unchanged. Survives.

### m-2 · Provably-dead `width`/`height` in the non-variant branch
**MINOR** · `PaperArticleWindow.vue:58`; `figureDimensions.ts:52`.
`hasModernVariants(x)` ⟺ `x ∈ Object.keys(FIGURE_DIMENSIONS)` ⟺ `FIGURE_DIMENSIONS[x] !== undefined`. The `else` branch at `:58` is reached only when the key is absent, so `dims` there is **always** `undefined` and `width`/`height` **always** resolve to `undefined`. The `?.` reads as defensive coding but is unreachable-by-construction. It also hides M-2: the day the two predicates are correctly separated, this branch starts mattering and nobody will notice it was never exercised.
**Falsifier** a second, independent population of `TRANSCODED_FIGURES`. `figureDimensions.ts:52` is its only assignment. Survives.

### m-3 · Asset base re-derived instead of consumed from `PAPER_CONTEXT`
**MINOR** · `PaperArticleWindow.vue:19, 46, 52, 53`; `PaperView.vue:56`; `dist/vue.js:1646`.
`PaperView` already builds and `provide`s the canonical prefix — `assetBase: \`${baseUrl}assets/\`` — into `PAPER_CONTEXT`, and the library's own default `<img>` reads `${$setup.ctx.assetBase}${filename}`. This component, rendering *inside* that provider, re-derives the identical string from `import.meta.env.BASE_URL`. Two sources of truth for one URL prefix, across a repo boundary; a change to `assetBase` (e.g. an asset CDN) updates the library path and silently leaves this one behind.
**Falsifier** `PAPER_CONTEXT` not being injectable here. It is provided at `PaperView.vue:65` and this component is a descendant (`PaperView.vue:379`). Survives.

### m-4 · Motion-token miss — the one A.W3.d survivor in the paper family
**MINOR** · `PaperArticleWindow.vue:199`; `PaperView.vue:511, 598, 652, 670`; `glass-ui/dist/styles/tokens/scheme-motion.css:214,219` + `theme/bridges.css:328`.
`transition: transform 0.2s ease, box-shadow 0.2s ease` uses the raw CSS `ease` keyword. The sibling `PaperView.vue` was migrated by A.W3.d at four sites, each annotated *"A.W3.d — bezier→`--ease-out-expo`"*, onto the glass-ui token (`--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`, shipped by the installed 4.0.0). This declaration was missed by that sweep — the last un-tokenised motion in `components/paper/`.
**Falsifier** the token not existing at glass-ui 4.0.0. Present at `tokens/scheme-motion.css:219` and bridged at `theme/bridges.css:328`. Survives.

### m-5 · `.callout-btn` ownership is split across two files; glass-ui's canonical `.focus-ring` goes unconsumed
**MINOR** · `PaperArticleWindow.vue:188-211` (scoped) vs `web/src/style.css:136-142` (global); `glass-ui/dist/styles/utilities/base.css:174`.
The class is declared in this file's `<style scoped>` but its `:focus-visible` ring lives in the app-global `style.css`, because — as that file's own D.W4.d comment explains — Vue's scope attribute would otherwise not match. Correct workaround, wrong conclusion: glass-ui already ships a `.focus-ring` utility for exactly this, and (per M-3) `Button` carries focus states intrinsically. Today a reader of `PaperArticleWindow.vue` has no way to know a second file styles its element.
**Falsifier** `.focus-ring` not existing at 4.0.0, or not covering an anchor. `utilities/base.css:174` declares `.focus-ring:focus-visible` unrestricted by element. Survives.

### m-6 · Hardcoded CTA label against a data model that carries only `{text, link}`
**MINOR** · `PaperArticleWindow.vue:117`; `dist/types/output.d.ts` (`callout?: { text: string; link: string }`); `web/vite.config.ts:9-19`.
`callout.text` and `callout.link` are data; **"Open Visualizer"** is a literal in the template. The label therefore cannot follow the link. Both configured callouts (`applications`, `image-reconstruction-via-epicycles`) happen to target `/visualize`, so it reads correctly at HEAD — a third callout pointing at `/equation` would render "Open Visualizer" over an equation link. The data model should carry the label, or the component should derive it from the resolved route.
**Falsifier** a `label`/`cta` field on the callout type. `output.d.ts` declares exactly `{ text, link }`. Survives.

### m-7 · `callout.link` is an unvalidated `string` fed to `<router-link :to>`, and the router has no catch-all
**MINOR** · `PaperArticleWindow.vue:113`; `web/src/router/index.ts:40-118`.
The link is a free string flowing `vite.config.ts:13` → latex-paper plugin → `PaperSectionData.callout.link` → `:to`. It is typed `string`, not `RouteLocationRaw` against the app's named routes, and this component — the terminal consumer — validates nothing. The router declares 8 named routes plus `/` and `/s/:slug` redirects and **no `/:pathMatch(.*)*` fallback**, so a mistyped link produces a vue-router "No match" warning and a blank outlet.
**Falsifier — applied, and it partially defuses the claim.** I expected `/visualize` to be unrouted (it is absent from the census's route list). It is **not**: `router/index.ts:71` declares it as an `alias` of `/w/:imageSlug?`. Both configured callouts resolve today. The claim survives only as a fragility (unvalidated string + no catch-all), not as a live break — recorded here explicitly because the census route enumeration does not mention the alias and a future reader would reach my wrong conclusion.

### m-8 · `.paper-portrait` is selected by filename substring, and that choice decides dark-mode inversion
**MINOR** · `PaperArticleWindow.vue:102`; `latex-paper/src/vue/theme.css:598-612`.
`figure.filename.includes('portrait') ? 'paper-portrait' : 'paper-figure'` is not cosmetic dispatch: `.paper-figure` gets `background: white` plus, in dark mode, `filter: invert(1) hue-rotate(180deg)`; `.paper-portrait` gets **neither**. So a filename substring decides whether a figure is colour-inverted for dark readers.
**Falsifier — applied; the heuristic is right today.** The only match in the 26-figure set is `f21_epicycle_portraits.png`, and `fourier_paper.tex:3234` confirms it genuinely is a portrait set ("Joseph Fourier, Augustin-Louis Cauchy, and the NES R.O.B. … the original image inset") whose photographic insets *should not* be inverted. The claim survives as fragility only: rename the figure, or add `f26_portrait_of_a_theorem.pdf`, and the classification flips with zero test coverage (see i-5).

### m-9 · Callback props instead of emits/expose — 5 props, 0 emits
**MINOR** · `PaperArticleWindow.vue:11-17`.
`registerRoot: (el: HTMLElement | null) => void` and `measureSection: (id: string, el: HTMLElement | null) => void` are inbound function props; the component declares no `defineEmits` and no `defineExpose`. The parent-child contract is therefore invisible to devtools, untestable without stubbing two closures, and inverted relative to Vue idiom (`emit('register-root', el)` / `defineExpose({ root })`). It also couples the child to the *identity* of `useVirtualSectionWindow`'s return shape rather than to an event name.
**Falsifier** a technical need for the synchronous call. `measureSection` reads `offsetHeight` synchronously (`dist/vue.js:882`), which an emit would also satisfy (emits are synchronous in Vue 3). Survives.

### m-10 · `visibleItems` typed as a mutable array
**MINOR** · `PaperArticleWindow.vue:12`; `dist/vue/composables/useVirtualSectionWindow.d.ts` (`visibleItems: ComputedRef<T[]>`, `items: MaybeRefOrGetter<readonly T[]>`).
The producer's *input* is `readonly T[]`; the prop that receives its output is `FlatPaperSection[]`. Declaring `readonly FlatPaperSection[]` would let `vue-tsc` reject any in-place mutation of a computed's value. Cheap, and consistent with the library's own posture.
**Falsifier** the component mutating it deliberately. It only `v-for`s. Survives.

### m-11 · Figure class list duplicates the latex-paper theme it is layered over
**MINOR** · `PaperArticleWindow.vue:101`; `latex-paper/src/vue/theme.css:601, 624-627`.
`rounded-lg` (0.5rem) re-states `.paper-article .paper-figure { border-radius: 0.5rem }`; `max-w-full` re-states `.paper-article figure img { max-width: 100% }`. Both already apply, because the `<img>` sits inside the library's `<figure>` inside `<article class="paper-article">` (`PaperView.vue:366`). Two of the three utilities are no-ops that mask which layer actually owns figure presentation.
**Falsifier** the `<img>` not being inside `.paper-article figure`. `dist/vue.js:1639-1643` wraps the slot in `<figure id=…>`; `PaperView.vue:366` supplies `.paper-article`. Survives.

### m-12 · `alt` duplicates the rendered `<figcaption>`
**MINOR** · `PaperArticleWindow.vue:98`; `dist/vue.js:1650-1660`.
The library renders `<figcaption><strong>Figure {number}: </strong><span v-html=caption/></figcaption>` immediately after the slot. Binding the same string to `alt` makes a screen reader announce the caption twice per figure — 52 announcements across 26 figures. The library's own default `<img>` does the same, so this is inherited rather than introduced; the slot override was the opportunity to fix it (`alt=""` + `role="presentation"`, letting the caption carry the semantics) and did not take it.
**Falsifier** the figcaption being suppressed when the slot is supplied. It is not — `:1650` is a sibling of the slot inside the same `<figure>`, unconditional on `effectiveSlots.figure`. Survives.

---

## §4 — INFO

- **i-1 · `lucide-vue-next` rename debt.** `:8` (`ArrowRight`) is one of the 35 sites in the census P0 `lucide-vue-next → @lucide/vue` migration (CENSUS L220, lane-frontend L636). One-line change; listed so the wave budget is complete. *Falsifier:* the rename being out of scope — CENSUS L220 books it inside the F.W1 atomic transaction.
- **i-2 · latex-paper peer ranges are violated (silently).** `latex-paper@0.2.1` peers `katex: ^0.16` and `vite: ^6.0 || ^7.0`; installed are `katex 0.17.0` and `vite 8.0.16`. Both are `peerDependenciesMeta.optional: true`, so npm neither errors nor warns — the mismatch is invisible until a KaTeX 0.17 API change reaches `useKatex`. This component depends on that seam transitively (every `$` in a section body). *Falsifier:* the peers being non-optional — `package.json:44-54` marks all three optional. Survives.
- **i-3 · Both slot contracts are untyped — `vue-tsc` cannot see them.** `dist/vue/components/PaperSectionBlocks.vue.d.ts` declares `__VLS_Props` only, with **no `__VLS_WithSlots`** (contrast `PaperSection.vue.d.ts`, which does declare `__VLS_Slots`). So `#figure="{ figure }"` (`:84`) and `#callout="{ callout }"` (`:109`) destructure implicit `any`. `figure.filename`, `figure.caption`, `callout.text`, `callout.link` are all unchecked; a rename in latex-paper 0.3.0 would pass `vue-tsc -b` and fail at runtime. This is the single largest unchecked surface in the file and it is a **producer** gap — the right fix is a latex-paper carry, not a consumer workaround. *Falsifier:* slot types being emitted elsewhere. `grep -n "__VLS_Slots" dist/vue/components/PaperSectionBlocks.vue.d.ts` → 0. Survives.
- **i-4 · Comment overclaim: `content-visibility` does not defer KaTeX typesetting.** `:146` says the recipe defers *"layout/paint (incl. KaTeX typesetting …)"*. KaTeX→HTML runs **eagerly in the render function** — `innerHTML: $setup.renderParagraph(...)` (`dist/vue.js:1660`), `renderInline`/`renderDisplay` from `useKatex` (`PaperView.vue:36`) — so the JS half of typesetting is paid on mount regardless. `content-visibility` defers only the *browser layout* of the produced spans. The optimisation is real; the attribution is not. *Falsifier:* KaTeX being invoked lazily on paint. No `IntersectionObserver`/`contentvisibilityautostatechange` hook exists in either tree. Survives.
- **i-5 · Zero e2e coverage of this component's own surfaces.** `web/e2e/paper-performance.spec.ts` is 358 lines and exercises mounted-section bounds, the page indicator, far ToC jumps, proofs, code listings, dark-mode code theming and the bibliography — `grep -n "figure|picture|avif|callout|spacer"` → **0 hits**. Every finding above (the `<picture>` variant guard, the callout link/label, the spacer math, the portrait dispatch) is unguarded. *Falsifier:* coverage in another spec — `grep -rn "callout|picture" web/e2e/` → 0. Survives.
- **i-6 · `prefers-reduced-motion` ungated on the callout hover.** `:199` + `:204` animate `transform`/`box-shadow` with no PRM guard; the app's only PRM block (`style.css:92-96`) covers a tabpanel animation. A 1px lift is marginal, but the repo's PRM posture is a live census item (CENSUS L113) and `PaperView.vue:176-181` demonstrates the file-local pattern. *Falsifier:* a global PRM transition kill. `grep -n "prefers-reduced-motion" web/src/style.css` → one hit, scoped to `[role=tabpanel]`. Survives.

---

## §5 — SUPERLATIVES (L-18)

- **S-1 · The `<picture>` 404 guard is correct, and correct for the *right reason*.** `:41-43` states the exact spec semantics almost every `<picture>` adoption gets wrong — *"`<picture>` does NOT fall back on a 404 — only on an unsupported format"* — and the emitted markup honours it: no `<source>` is written unless a variant is known to exist (`:87`, `:92`). Most codebases emit AVIF/WebP `<source>`s unconditionally and ship silent breakage. **Falsifier:** a `<source>` emitted for a figure with no sibling on disk. I enumerated `assets/` (28 png / 26 avif / 26 webp) and the 26 `\includegraphics` basenames in `paper/fourier_paper.tex`: every guarded figure has both siblings, and the two unpaired PNGs (`fourier.png`, `maintainer-avatar.png`) are correctly outside the map. No violation exists. Survives — and note this superlative and M-2 are the same design seen from both ends: the *reasoning* is excellent, the *key* it hangs on is wrong.
- **S-2 · The `contain-intrinsic-size: auto` diagnosis is the hard half of a hard problem, and it consumes rather than forks.** The file correctly identifies that a **non-`auto`** intrinsic size permanently freezes `offsetHeight` and thrashes the scrollbar in a measured virtualiser (`:152-157`) — a failure mode most `content-visibility` adoptions discover in production. And it applies glass-ui's canonical `.deferred-section` rather than re-declaring `content-visibility` locally, retuning only the token (`:167`) — the exact substrate-owns-the-recipe / host-only-retunes discipline the megatranche asks for. **Falsifier:** a local `content-visibility` declaration duplicating the utility. `grep -n "content-visibility" PaperArticleWindow.vue` → 1 hit, in prose. Survives. (B-1 does not retract this: the recipe is consumed correctly; it is consumed into the wrong *seam*.)
- **S-3 · The Vue ref seam is typed with a guard, not a cast — zero `any`, zero `as`.** `toHTMLElement` (`:21-25`) narrows Vue's `Element | ComponentPublicInstance | null` with a real `instanceof` test and returns `HTMLElement | null`, matching the callback props' declared signatures exactly (`:15-16`). In a file whose whole job is DOM plumbing, there is not one `as HTMLElement`, not one `any`, and the two non-null assertions (`:88`, `:93`) are each guarded by a `v-if` on the identical expression one line above — provably safe. **Falsifier:** any cast in the ref path. `grep -nE "\bas [A-Z]|: any" PaperArticleWindow.vue` → 0. Survives.
- **S-4 · The CLS kit is complete, and `figureDimensions.ts` exists because the library contract is genuinely deficient.** `loading="lazy"` + `decoding="async"` + intrinsic `width`/`height` (`:99-105`) is the full set, and the third leg required inventing a 26-row map because `PaperFigureData` (`dist/types/output.d.ts`) carries **only** `filename`/`caption`/`label`/`number` — no dimensions. The module's own header documents that reasoning and its additive-degradation posture. Correct diagnosis of a producer gap, minimal consumer-side remedy, 26/26 coverage. **Falsifier:** a paper figure with no dimensions entry. All 26 `\includegraphics` basenames are map keys. Survives. *(The right long-term home is a latex-paper carry — emit dimensions at parse time from the rasterised asset — which would also dissolve M-2.)*

---

## §6 — DISPOSITION

| id | severity | one-line | suggested wave |
|---|---|---|---|
| B-1 | BLOCKER | `.deferred-section` feeds a 1200px constant into `useVirtualSectionWindow`'s `offsetHeight` measurement for every mounted-but-unpainted section, and persists it in `SESSION_HEIGHT_CACHE` | F.W3 (glass suffusion) + a latex-paper carry: `measureSection` must reject a skipped box (`contentVisibilityAuto` state) or the host must move `.deferred-section` off the measured element onto an inner wrapper |
| M-1 | MAJOR | `#figure` slot discards the library's `onImageError` → `.paper-figure-placeholder` path | F.W3 |
| M-2 | MAJOR | `hasModernVariants` keyed to `Object.keys(FIGURE_DIMENSIONS)`; no generator keeps map ⇔ assets in sync | F.W3 (+ latex-paper carry per S-4) |
| M-3 | MAJOR | shadow CTA; six sibling files import glass-ui `Button`, this one hand-rolls it; `as-child` is a drop-in | F.W3 (glass suffusion) |
| M-4 | MAJOR | `resolveFigure()` ×7 per figure per render, 7 fresh objects | F.W3 |
| m-1…m-12 | MINOR | dead regex + false comment · dead branch · duplicated `assetBase` · raw `ease` vs `--ease-out-expo` · split `.callout-btn` ownership · hardcoded CTA label · unvalidated `:to` · substring portrait dispatch · callback props / 0 emits · non-`readonly` prop · duplicated theme utilities · `alt` ⇄ `<figcaption>` | F.W3 |
| i-1…i-6 | INFO | lucide rename · violated optional peers · **untyped slot contracts (producer gap)** · KaTeX comment overclaim · zero e2e coverage · ungated PRM hover | F.W1 (i-1) · latex-paper carry (i-3) · F.W5 (i-5) |

**Counts** — BLOCKER 1 · MAJOR 4 · MINOR 12 · INFO 6 = **23 defects**, **1 blocker**, **4 superlatives**.

**Two hypotheses tested and withdrawn** (recorded so the next auditor does not re-run them): (a) Vue re-invoking the inline arrow ref at `:73` with `null` on every re-render — refuted at `@vue/runtime-core/dist/runtime-core.esm-bundler.js:1803-1817`, function refs get no old-ref teardown outside unmount; (b) the callout `link: "/visualize"` (`vite.config.ts:13,17`) being unrouted — refuted at `router/index.ts:71`, it is an `alias` of `/w/:imageSlug?` (a fact the census route enumeration omits).

**Axis verdict.** On the CONSUMPTION axis this component is **substrate-light and seam-heavy**: zero value.js, zero keyframes, zero API — so the F.W2 value.js migration cannot touch it — while *every* defect above lives in one of two seams, the `@mkbabb/latex-paper` slot boundary (B-1, M-1, M-2, m-1, m-3, m-11, m-12, i-3, i-4) or the glass-ui adoption boundary (M-3, m-4, m-5). It is the paper family's lightest glass-ui consumer (3 utility classes, 0 component imports) and its only non-conformant button seat. The single most valuable repair is not in this file: it is a latex-paper carry that emits figure dimensions at parse time and types its slots — which would dissolve M-2, i-3 and most of S-4's reason to exist.
