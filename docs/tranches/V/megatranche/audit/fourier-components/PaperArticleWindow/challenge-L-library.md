claude-opus-5[1m]

# CHALLENGE — `PaperArticleWindow.vue` · axis L (LIBRARY)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperArticleWindow.vue` (212 lines)
**Posture** DEFECTIVE-until-proven. Every row carries severity · file:line · falsifier. Superlatives carry the same (L-18 runs both ways).
**Method** Static + source-derived only (no browser tooling). Vue semantics re-derived from the tree's own `web/node_modules/@vue/runtime-core@3.5.38` and `@vue/compiler-core`, and from the SFC compiled through the tree's own `@vue/compiler-sfc`. Livable-only magnitudes tagged `UNPROVEN-NEEDS-LIVE` (SS-13).
**Read whole** target SFC · `@/lib/figureDimensions` · `@mkbabb/latex-paper/vue` `{PaperSection, PaperSectionBlocks, FlatPaperSection}` + `useVirtualSectionWindow` + `virtualSectionLayout` + `flattenPaperSections` + `paperSectionSlots` + `theme.css` · sole consumer `PaperView.vue` · `web/vite.config.ts` · `web/src/router/index.ts` · `@mkbabb/glass-ui` token + `.deferred-section` sources at **both** live pins · `paper/fourier_paper.tex` · `web/public/assets/` · `web/e2e/paper-performance.spec.ts`.

**Working-tree provenance (load-bearing, cf. intake §0 / R4-9).** fourier HEAD `cd26c65`, **28 uncommitted paths** — the same caveat the intake lane recorded. `PaperArticleWindow.vue` and `lib/figureDimensions.ts` are **clean at HEAD** (`git status --porcelain | grep paper` lists `MobileFloatingToc.vue`, `PaperView.vue`, `search/PaperSearchDropdown.vue` only; the `PaperView.vue` delta is a single class swap at `:393`, `glass-subtle`→`glass-wash`, which shifts no line I cite). The one pin that matters here: `@mkbabb/glass-ui` is **`^3.1.0` [HEAD]** and **`^4.0.0` [WT]**, with `4.0.0` installed in `node_modules`. **L-1 was verified against both** and is version-independent — see its falsifier.

**Tally — 18 defects · 2 BLOCKER · 4 MAJOR · 9 MINOR · 3 INFO · 4 superlatives.**

---

## 0. What this component actually is

63 lines of script, 71 of template, 78 of scoped CSS (of which 23 are a single prose block). It is the **sole mount point for the entire paper body**: every `PaperSection`, `PaperSectionBlocks`, `MathBlock`, `Theorem`, `CodeBlock`, every figure and both callouts enter the instance graph through the one native `v-for` at line 71. It owns three contracts:

1. **the measurement contract** with `useVirtualSectionWindow` (`registerRoot` / `measureSection` callback props, lines 15-16),
2. **the slot contract** with `PaperSectionBlocks` (`#figure` / `#callout`, lines 84 / 109),
3. **the class contract** with `latex-paper/theme` (`paper-figure` / `paper-portrait`, line 102) and with glass-ui (`deferred-section`, line 74).

All three are breached. The first two by this component's own structure; the third by a token-format mismatch the component is on the *right* side of while the classes it opts into are on the wrong side.

---

## 1. BLOCKERS

### L-1 · BLOCKER · `latex-paper/theme.css`'s documented token contract is dead against glass-ui 4.0.0 — 42 declarations dropped, several on this component's exact render path

`theme.css:3-7` states its contract verbatim:

> `Requires the consumer to define HSL custom properties: --primary, --foreground, --border, --muted, --muted-foreground, --accent-pink, --section-heading, --card, --radius, --_section-color`

i.e. the shadcn **bare-channel** convention (`--card: 36 48% 97%`), so that `hsl(var(--card))` resolves. The consumer ships the opposite:

| token | live value | source |
|---|---|---|
| `--card` | `hsl(36 48% 97%)` | `web/node_modules/@mkbabb/glass-ui/src/styles/tokens/color-radius.css:72` |
| `--border` | `var(--neutral-4)` → `hsl(32 26% 70%)` | `color-radius.css:95` / `:44` |
| `--muted-foreground` | `var(--neutral-5)` → `hsl(30 22% 40%)` | `color-radius.css:85` / `:45` |
| `--primary` | `hsl(24 10% 10%)` / dark `oklch(0.739 0.134 318.1)` | `color-radius.css:98`, `dark-arm.css:82` |

`web/src/style.css:3` imports `@mkbabb/glass-ui/styles` and **fourier redefines none of them** (`grep -rn -- "--border:|--card:|--muted-foreground:|--primary:" web/src/` → empty). So every `hsl(var(--x))` in `theme.css` substitutes to `hsl(hsl(…))` — invalid-at-computed-value-time — and the declaration computes to `unset`. There are **42 such sites** (`grep -c "hsl(var(--" theme.css` → 42).

On *this* component's render path:

| theme.css | selector · declaration | consequence |
|---|---|---|
| `:447`, `:459` | `.section-header--chapter` / `--sub` `background: hsl(var(--card))` | **the sticky section headers have no background** → body text scrolls visibly *under* them. `.paper-article`'s own `background: var(--card)` (`PaperView.vue:524`) paints behind, not between; the header is a descendant at `z-index:10` with `background: transparent`. |
| `:599`, `:607`, `:611` | `.paper-figure` `border: 1px solid hsl(var(--border)/.5)`; dark `border-color`; `.paper-portrait` `border` | **the figure borders this component asks for at line 102 never render.** Note `background: white` on `:600` is a literal and survives — so light-mode figures get a white slab with no border. |
| `:631` | `figcaption { color: hsl(var(--muted-foreground)) }` | captions inherit body colour; the typographic hierarchy collapses. |
| `:14`, `:17`, `:23` | `.paper-ref` `color` + `border-bottom: 1px dashed hsl(var(--primary)/.4)` | **cross-reference links lose colour *and* underline** — they render as plain body text, while `useClickDelegate` (`PaperView.vue:87-97`) still binds clicks to them. An invisible-but-live affordance. |
| `:209`, `:210`, `:241`, `:549`, `:550`, `:564`, `:567`, `:569` | proof-block border/background, inline `code` colours, blockquote rail | same class of loss throughout the section bodies this component mounts. |

The six `var(--_section-color, hsl(var(--section-heading)))` sites (`:476,481,493,498,511,512`) **survive**, because `--_section-color` is always set by `PaperSection.vue:17` from `--section-color-${sectionIndex}` — and this component always supplies `:section-index="item.rootIndex"` (line 81), and glass-ui ships a 13-stop ramp `--section-color-0..12` (`color-radius.css:241-253`) against 12 top-level entries in the paper (11 `\chapter` + the leading `\section{Introduction}`, `paper/fourier_paper.tex:93,118,558,1725,1895,2272,2346,2803,3000,…`). So the fallback branch is never taken. **Precise, not sweeping.**

**Why this is the component's row and not purely the library's:** this component's *own* scoped CSS is on the correct convention — `border: 1px solid var(--border)` (line 182), `var(--muted)` (184), `var(--primary)` (196, 200, 205). It demonstrably knows the live token format, and it opts elements into library classes authored against the dead one (line 102, and the `.section-header--*` classes it induces via `:depth`, line 80).

**Falsifier — three checked, all fail.**
1. *If any stylesheet in the cascade defined the shadcn bare-channel form, all 42 would be valid.* fourier `web/src/**` defines none; glass-ui `tokens/{color-radius,dark-arm,light-dark}.css` ship full colours in all three arms; latex-paper's `theme.css` defines no tokens of its own (`grep -- "--border:|--card:" theme.css` → empty).
2. *If this were an artefact of the in-flight `^3.1.0`→`^4.0.0` bump, it would be a fresh regression rather than a standing breach.* It is not. At the **HEAD** pin, `glass-ui v3.1.0:src/styles/tokens.css` reads `--card: var(--neutral-0)` (`:343`), `--muted-foreground: var(--neutral-5)` (`:356`), `--border: var(--neutral-4)` (`:366`), `--primary: hsl(24 10% 10%)` (`:369`) — **full colours there too**, in both light and dark arms (`:1277-1281`, `:1394-1402`). The breach is **version-independent across both live pins**, which also means no bump can be blamed for it and no rollback cures it.
3. *If `theme.css` were not loaded.* It is: `PaperView.vue:12` `import "@mkbabb/latex-paper/theme"`, and latex-paper's `package.json` maps `"./theme": "./src/vue/theme.css"` — the raw source ships in `files`.
**NOT in the hitherto corpus** — `grep -rn "hsl(var(" formation/fourier/ audit/codex-provenance/intakes/` → zero hits. Novel.
Pixel grading of each loss: `UNPROVEN-NEEDS-LIVE`. The dropped-declaration mechanism is CSS-spec-derived and needs no browser.

### L-2 · BLOCKER · `content-visibility: auto` × `offsetHeight` — never-painted sections write the **1200px CSS estimate** into a session-lifetime cache; the CSS comment asserts the opposite

The comment at lines 152-166 is the component's central engineering claim:

> "the `auto` prefix … makes the browser REMEMBER each section's real rendered size **after first paint** … Sections are measured on a post-mount rAF … i.e. **AFTER first paint, so the remembered size is always the real one**. … the estimate only applies to a section that has **never painted (never the measured case)**."

The parenthetical is false. The window deliberately mounts sections that **never paint**:

- `overscanAfterPx: 720` (`PaperView.vue:81`) mounts sections up to 720px below the viewport.
- `warmTargetAfter: 3` / `warmTargetBefore: 2` (`PaperView.vue:83-84`) → `ensureTargetWindow` force-mounts ±2/+3 sections around a nav target (`useVirtualSectionWindow.ts:160-171`), each ~1000px tall, i.e. thousands of px offscreen.
- The e2e budget confirms the window is wide: `MAX_MOUNTED_SECTIONS = 18` (`web/e2e/paper-performance.spec.ts:3`).

For a mounted-but-render-skipped element, CSS Contain 2 is explicit: `contain-intrinsic-size: auto <length>` uses the *last remembered size* **only if the element has been rendered at least once**; otherwise the `<length>`. A section mounted below the relevance window is skipped on its first layout and never paints — so it has no remembered size and reports **1200px** (line 167).

The measurement path then launders that estimate into durable state:

```
PaperArticleWindow:73   :ref="(el) => bindSection(item.id, el)"
  → props.measureSection(id, el)                      (line 35)
useVirtualSectionWindow.ts:154-157  requestAnimationFrame(() => syncMeasuredHeight(id, target.offsetHeight))
useVirtualSectionWindow.ts:127-134  measuredHeights.set(id, 1200); SESSION_HEIGHT_CACHE.set(id, 1200)
useVirtualSectionWindow.ts:70-76    getHeight() prefers measuredHeights ▷ SESSION_HEIGHT_CACHE ▷ item.estimatedHeight
```

Consequences, all source-derived:
1. The content-derived `estimatedHeight` (`flattenPaperSections.ts:73-89`) is **permanently displaced** by a flat 1200 for every never-painted section.
2. `SESSION_HEIGHT_CACHE` is **module-level and never invalidated** (`useVirtualSectionWindow.ts:32`), and is re-seeded into `measuredHeights` on every items-watch pass (`:211-212`). The pollution outlives the component, the route, and any remount — for the whole document session.
3. `buildSectionLayout` (`virtualSectionLayout.ts:27-48`) and therefore `topSpacerPx`/`bottomSpacerPx` and `getOffsetFor` (`:151-161`) are built on that fiction. `getOffsetFor` is what `useScrollNavigation` uses to place a TOC jump — **so a jump computed while any warm-mounted section is still carrying 1200 lands at the wrong offset.** That is exactly the failure the comment says the `auto` prefix "neutralises".
4. `syncMeasuredHeight` also resets the 320ms warm-range release timer (`:132`, `:119-125`) on each change, so churn in these values also extends the forced window.

`requestAnimationFrame` ordering is *not* the bug — the rAF does run after the previous frame's paint. The bug is that "post-mount" ≠ "post-paint" for an element `content-visibility` never painted at all. The comment conflates the two.

**Self-healing note (and why L-4 is coupled to this):** the pollution *is* cured for a given section the moment it scrolls into view — because the function ref fires again on every patch and re-reads a now-real `offsetHeight`. That repair mechanism is precisely the forced-reflow defect in L-4. **The two cannot be fixed independently:** memoising the ref (the obvious L-4 fix) would freeze the 1200px value permanently.

**Falsifier.** If the engine's `content-visibility: auto` relevance margin exceeded the full mounted span, every mounted section would paint and the hazard would vanish. Chromium expands by ~50% of the viewport in each axis — ~450px for a 900px viewport, against `overscanAfterPx: 720` and a warm range spanning several thousand px. A second falsifier: if `measureSection` skipped skipped-sections (e.g. gated on `contentvisibilityautostatechange`, the hook glass-ui itself documents at `utilities/base.css:472-476`) — it does not; it reads `offsetHeight` unconditionally.
Magnitude (how many sections, how large the offset error): `UNPROVEN-NEEDS-LIVE`. Mechanism: spec- and source-derived.

---

## 2. MAJOR

### L-3 · MAJOR · the `#figure` override silently deletes the library's broken-image error posture — at exactly the point where the component's own comment says a 404 is possible

`PaperSectionBlocks` ships a three-way figure render (`:129-143`):

```
<component v-if="effectiveSlots.figure" :is="…"/>           ← host override wins
<div v-else-if="failedImages.has(block.figure.filename)" class="paper-figure-placeholder"/>
<img v-else … @error="onImageError(block.figure.filename)"/>
```

`failedImages` is a `reactive(new Set())` (`:25-29`). Supplying `#figure` (line 84) takes the **first** branch, so both the `@error` handler and the placeholder become unreachable for this app. The override's `<img>` (lines 96-106) carries **no `@error`, no `onerror`, no fallback** — a failed figure renders as the browser's broken-image glyph inside a `<figure>` whose `<figcaption>` still claims a caption.

This interlocks with the component's own comment at lines 41-43: *"`<picture>` does NOT fall back on a 404 — only on an unsupported format."* Correct — and it is the one scenario where the deleted placeholder would have been the safety net. The component identified the hazard and removed the mitigation in the same file.

Second-order: L-1 kills `.paper-figure-placeholder`'s own border/background (`theme.css:642-643`) too — so even restoring the branch would restore an invisible box until L-1 is fixed.

**Falsifier.** If the override's `<img>` carried `@error`, or if an ancestor rendered a placeholder. Neither: the compiled render function for lines 96-106 emits `_createElementVNode("img", { src, alt, width, height, class, style, loading, decoding })` — eight props, no listeners; and `PaperSectionBlocks.vue:129-136`'s `v-if/v-else-if` chain short-circuits above both fallbacks.

### L-4 · MAJOR · the inline `:ref` arrow forces a synchronous layout read per visible section **per patch**, and the parent patches every scroll frame

Two independently verified halves.

**(a) Vue invokes function refs on *every* patch, unconditionally.** `web/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5544` — `if (ref != null && parentComponent) { setRef(ref, n1 && n1.ref, …) }` sits after the type switch in `patch()`, gated only on the vnode carrying a ref. Inside `setRef`, `:1818` — `if (isFunction(ref)) { callWithErrorHandling(ref, owner, 12, [value, refs]) }` — with **no identity comparison**; the `oldRef !== ref` unset branch above (`:1803-1817`) handles only string and `Ref` refs. So `bindSection` runs for every mounted section on every patch. (Line 73's arrow is freshly allocated per render anyway — compiled: `ref: (el) => _ctx.bindSection(item.id, el)`, `ref_for: true`.)

**(b) The repeat path is a forced reflow.** `useVirtualSectionWindow.ts:146-150` — on `elementMap.get(id) === el` it calls `syncMeasuredHeight(id, el.offsetHeight)` **synchronously, inside the patch**, after Vue has already mutated the DOM. Up to `MAX_MOUNTED_SECTIONS = 18` forced style+layout flushes per patch.

**(c) The parent patches on every scroll rAF.** `handleScroll` rAF-throttles `computeWindowState` (`:187-193`), which assigns `range.value = resolveSectionWindow(…)` — and `resolveSectionWindow` returns a **freshly allocated object on every call** (`virtualSectionLayout.ts:94-101`, `:120-128`). `visibleItems` is `items.value.slice(start, end+1)` (`:242-245`) — a **new array every recompute**, so Vue 3.5's `hasChanged` version gate never short-circuits, the prop identity changes, and `PaperArticleWindow` re-renders **once per scroll frame even when the window is identical**.

Net: ~18 forced synchronous layouts per animation frame during any scroll, on the render path of a KaTeX-heavy document. Also note `bindRoot` (line 63) fires per patch too — harmless only because `registerWindowRoot` guards on identity (`PaperView.vue:205`); `bindSection` has no such guard.

**Falsifier.** If Vue skipped identical function refs, (a) fails — the source above shows it does not, and the arrow is not identical regardless. If `measureSection` deferred the repeat read, (b) fails — `:148` is a direct synchronous property read. If `visibleItems` preserved array identity, (c) fails — `.slice()` cannot.
Frame-time cost: `UNPROVEN-NEEDS-LIVE`. Call counts and the reflow trigger: source-derived.

### L-5 · MAJOR · declaring the scoped slots **inside** the `v-for` forces `DYNAMIC_SLOTS` on every section, which cascades into a full unmount+remount of every `<picture>` and every callout on every patch

The chain, each link verified against the tree's own compiler/runtime:

1. `@vue/compiler-core/dist/compiler-core.cjs.js:5183` — `let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0`. Because `<PaperSection>` (line 76) and its `#figure`/`#callout` templates sit inside the `v-for` at line 71, `hasDynamicSlots` is set.
2. Compiling the SFC with the tree's own `@vue/compiler-sfc` emits, for the `PaperSection` vnode: `_: 2 /* DYNAMIC */` and patchFlag **`1032 /* PROPS, DYNAMIC_SLOTS */`**.
3. `runtime-core.esm-bundler.js:4763-4766` — `if (optimized && patchFlag >= 0) { if (patchFlag & 1024) return true }`. `shouldUpdateComponent` **returns `true` unconditionally**: `PaperSection` re-renders on every parent patch even though all five of its props (lines 77-81) are identical.
4. `PaperSection.vue:35`'s `<slot />` → `renderSlot` at `runtime-core:3288` — `validSlotContent && slots._ === 1 ? 64 : -2`. `slots._` is **2**, so the fragment carries patchFlag **`-2` (BAIL)**, and `:6665` — `if (patchFlag === -2) { optimized = false }`.
5. With `optimized === false`, `shouldUpdateComponent` takes the else-branch at `:4781-4786` — `if (prevChildren || nextChildren) { if (!nextChildren || !nextChildren.$stable) return true }`. Compiled slot objects carry `_: 1`, not `$stable`, so this returns **`true`**: `PaperSectionBlocks` re-renders too, despite `:section` being identity-stable.
6. `PaperSectionBlocks` renders the host slots through **`<component :is="() => effectiveSlots.figure!({…})" />`** at `:91`, `:131`, `:184`, and `:226` for the callout. A fresh arrow per render is a fresh vnode `type`; `isSameVNodeType` compares `n1.type === n2.type`, so `patch()` takes the `unmount(n1); mount(n2)` path.

**Result: every `<picture>`/`<img>` and every callout `<router-link>` in the window is destroyed and re-created on each patch — which, by L-4(c), is every scroll frame.** Each remount re-runs `loading="lazy"` evaluation and image decode on a fresh element (`decoding="async"`, line 105), and re-mounts the `router-link` (`_resolveComponent("router-link")`, a full component instance) twice per paper.

Culpability is shared but not diffuse: `:is="() => …"` is latex-paper's bug, but it is **inert until a consumer forces the parent to re-render**, and this component's slot placement is what forces it. The remedy is entirely host-side: extract lines 76-123 into a `<PaperWindowSection :item="item">` child so the slot templates leave the `v-for` scope — `hasDynamicSlots` clears, `_: 1 /* STABLE */` returns, patchFlag drops to `8 /* PROPS */`, and steps 3-6 all bail on identical props.

**Falsifier.** If `_: 2` / `1032` were not emitted — the compiled output above shows both. If Vue treated two structurally identical arrows as the same vnode type — `isSameVNodeType` is reference equality on `type`. If `PaperSectionBlocks` bailed at step 5 — it cannot, because step 4 forces `optimized = false`, which routes around the `patchFlag & 8` dynamic-prop comparison.
Visible flicker: `UNPROVEN-NEEDS-LIVE`. The remount is compiler+runtime-derived.

### L-6 · MAJOR · a second asset-base authority — `${baseUrl}assets/` re-derived here while `PaperContext.assetBase` is already provided and already used by the library on the same path

Line 19 `const baseUrl = import.meta.env.BASE_URL;` then lines 46 / 52 / 53 build `${baseUrl}assets/…`. Meanwhile `PaperView.vue:45` derives the identical `baseUrl` and `:59` publishes `assetBase: \`${baseUrl}assets/\`` into `PAPER_CONTEXT`, which `PaperSectionBlocks` consumes for its own `<img src>` at `:99`, `:139`, `:188`.

So the same document has **two authorities for the figure base URL**, both live, in the same render path — one injected via a provide/inject contract the file is already inside, one recomputed from `import.meta.env`. Divergence scenario: repointing `assetBase` at a CDN (or adding a hash-prefixed asset dir) updates the library's fallback `<img>` and leaves this component's `<picture>` pointed at `${BASE_URL}assets/` — a silent split where half the figures come from one origin and half from another, with no type error and no test to catch it. The component already imports from `@mkbabb/latex-paper/vue`; `inject(PAPER_CONTEXT)` is one line.

**Falsifier.** If `assetBase` were not exported/consumable — it is (`latex-paper/src/vue/context.ts`, `PaperContext`, exported from the same barrel the component already imports from, `src/vue/index.ts:2-3`). If the two strings could not diverge — `PaperView.vue:59` is a free-form template literal with no shared constant.

---

## 3. MINOR

### L-7 · MINOR · `resolveFigure` is called **7×** per figure per render

The compiled render function contains seven `_ctx.resolveFigure(figure.filename)` calls per figure: the two `<source>` `v-if`s, the two `srcset`s, `src`, `width`, `height` (lines 87, 88, 92, 93, 97, 99, 100). Each call runs `.replace(/\.pdf$/…)`, a `Set.has`, a second `.replace(/\.png$/…)`, three template concatenations, and allocates a fresh object (lines 44-59). Seven objects and up to fourteen regex executions per figure per render — multiplied by L-4(c)'s per-frame re-render. A single `computed`-backed `Map` memo, or the `<PaperWindowFigure>` extraction that also fixes L-5, collapses it to one.
**Falsifier.** If Vue cached repeated calls of the same expression within a render — it does not; the seven calls are literal in the emitted code.

### L-8 · MINOR · `FIGURE_DIMENSIONS` and `TRANSCODED_FIGURES` are **the same set by construction**, so `resolveFigure`'s branch structure encodes an independence that does not exist

`figureDimensions.ts:53` — `const TRANSCODED_FIGURES = new Set(Object.keys(FIGURE_DIMENSIONS));`. Therefore `hasModernVariants(png) ≡ (FIGURE_DIMENSIONS[png] !== undefined)`, and:

- in the `if` branch (lines 48-56), `dims?.[0]` / `dims?.[1]` can **never** be `undefined` — the optional chain is dead;
- in the `else` (line 58), `width` / `height` are **always** `undefined` — the branch can never carry dimensions.

Two distinct concepts ("has transcoded siblings", "has known intrinsic size") share one data structure, and the code reads as though they vary independently. The live sets do agree today — verified: all 26 mapped PNGs have `.avif` + `.webp` siblings in `web/public/assets/`; the only two unmapped `.png` files are `fourier.png` and `maintainer-avatar.png`, neither a paper figure; and the 26 map keys match the 26 `\includegraphics` in `paper/fourier_paper.tex` exactly. **So this is latent drift, not a live break** — but the drift is silent in both directions and unguarded:

- map entry without a transcode → a `<source>` 404, which per the component's own comment (line 41) `<picture>` **will not fall back from** → broken figure, and by L-3 no placeholder;
- transcode + rasterisation without a map entry → *both* the modern formats and the CLS reservation vanish at once, with no signal.

There is no build-time assertion, no test, and no generator: `grep -rn "avif" --exclude-dir=node_modules` finds only these two source files and an audit note. The map is hand-maintained against a pipeline that lives nowhere in the repo.
**Falsifier.** If `TRANSCODED_FIGURES` were an independently authored list, the branches would be independent — `:53` derives it from the dimension map's keys.

### L-9 · MINOR · `figure.filename.includes('portrait')` is a substring scan deciding a **dark-mode inversion** policy, with exactly one accidental match

Line 102 selects `paper-portrait` vs `paper-figure`. Those classes are not layout variants — `theme.css:604-608` gives `.paper-figure` a dark-mode `filter: invert(1) hue-rotate(180deg)` (the white-background line-art fix) and `.paper-portrait` (`:610-612`) withholds it. So the predicate really means *"is this raster unsafe to invert."* Encoded as `String.prototype.includes` over a filename, in a template expression, evaluated per figure per render.

Across the live 26-figure set exactly one filename matches: `f21_epicycle_portraits.png` — and it matches by **pluralisation**, not by design. Any future figure whose stem happens to contain the substring silently opts out of dark-mode inversion. The repo already owns a typed per-figure metadata module for precisely this kind of fact (`figureDimensions.ts`, keyed by the same resolved `.png` name the template derives) and does not carry the flag there — so per-figure policy is split between a typed map and an inline string test.
**Falsifier.** If the class were layout-only, "portrait" would be a reasonable proxy — `theme.css:604-608` shows it gates a colour filter. If the predicate were data-driven, drift would be impossible — it is not.

### L-10 · MINOR · `toHTMLElement`'s `ComponentPublicInstance` arm is unreachable, and its `null` return is a **silent de-registration** with no error posture

Lines 21-25. Both call sites bind native elements — the compiled output emits `_createElementBlock("div", { ref: _ctx.bindRoot, … })` and `_createElementBlock("div", { …, ref: (el) => _ctx.bindSection(item.id, el) })` — so a template ref here is always an `HTMLElement` and the `ComponentPublicInstance` branch (and the `ComponentPublicInstance` type import at line 7) is dead.

The dead generality is not free. Should the arm ever be reached, `toHTMLElement` returns `null`, `bindSection` forwards `null`, and `measureSection` interprets `null` as *unmount* — `disconnectSection(id)` (`useVirtualSectionWindow.ts:140-144`) drops the element from `elementMap` while `measuredHeights` keeps the stale height forever. A type mismatch is thus indistinguishable from a legitimate teardown, and the failure is total silence: no warn, no throw, no marker. The error posture for "I was handed something I don't understand" is "pretend the section unmounted."
**Falsifier.** If either ref sat on a component, the arm would be live — the compiled output shows two native `div`s. If `measureSection` distinguished the two nulls — `:141` does not.

### L-11 · MINOR · the per-item wrapper makes `latex-paper`'s inter-section margin **unreachable**

`theme.css:200-202` — `.paper-article .paper-section:not(:last-child) { margin-bottom: 2rem; }`. `PaperSection.vue:17` renders `<section class="paper-section">` as its root, and this component wraps **exactly one** `PaperSection` per `<div class="paper-window-section">` (lines 70-124). The `<section>` is therefore always its wrapper's only — hence last — child, `:not(:last-child)` never matches, and the 2rem inter-section rhythm the library specifies **never applies to any section in the paper**. The remaining gap is whatever the trailing content block happens to carry; the wrapper declares none. A structural CSS contract voided by an interposed div, invisibly.
**Falsifier.** If any wrapper held two sections, or if the rule targeted the wrapper. Neither: the `v-for` body is a single `PaperSection`, and `.paper-window-section` (lines 141-168) declares no margin.
Visual grading belongs to the D axis; the contract breach is structural and belongs here.

### L-12 · MINOR · the wrapper is also the sticky containing block, so the library's two-tier sticky header stack can never form

`theme.css:443-465` designs a two-tier stack: `.section-header--chapter` sticks at `top: 0` (`z-index: 10`) and `.section-header--sub` at `top: 3.5rem` (`z-index: 9`) — i.e. a subsection header parks *below* a still-stuck chapter header. That requires the chapter header's containing block to span its subsections. It does not: `flattenPaperSections` (`flattenPaperSections.ts:91-133`) emits chapters and subsections as **peers** in one flat list, and this component wraps each peer in its own `<div class="paper-window-section">` (line 74) — the nearest block-container ancestor, and therefore the sticky constraint box. A chapter header unsticks the moment its own wrapper scrolls out, leaving the subsection header stuck at 3.5rem with nothing above it. `.deferred-section`'s implied `contain: layout style paint` (glass-ui `utilities/base.css:477-480`) additionally makes each wrapper a stacking context, so the `z-index: 10`/`9` ordering between siblings is inert too.
**Falsifier.** If the wrapper were `display: contents` (no box, no containing block) the stack would survive — it is a normal block with `min-width: 0` (line 142).
Visual confirmation: `UNPROVEN-NEEDS-LIVE`. The containing-block relation is source-derived.

### L-13 · MINOR · two independent estimators of the same quantity, disagreeing 4-5×, neither derived from the other

Line 167 sets `--deferred-section-size: 1200px` as the never-painted section-height estimate. `flattenPaperSections.ts:73-89` already computes a **per-section, content-derived** estimate for the same quantity (heading + depth padding + summed per-block estimates + callout), floored at `320` for depth 0 and `220` deeper. The CSS estimate is a single flat number asserted in a comment as "a long typeset section" with no measurement cited anywhere in the tree. The JS estimate feeds `getHeight` → `buildSectionLayout`; the CSS estimate feeds `offsetHeight` → (by L-2) *also* `getHeight`. The same pipeline is fed by two estimators that disagree by 4-5× at the floor, and L-2 is the mechanism by which the flat one wins.
**Falsifier.** If `--deferred-section-size` were derived from `item.estimatedHeight` (a per-item `:style` binding, which this template already does twice for the spacers, lines 67 and 129) the two would agree by construction. It is a static declaration.

### L-14 · MINOR · easing-token and PRM conventions the sibling file documents are not followed here

`.callout-btn` (line 199) — `transition: transform 0.2s ease, box-shadow 0.2s ease`. The co-located `PaperView.vue` states the convention four times and follows it: `/* A.W3.d — bezier→--ease-out-expo. */` at `:511`, `:598` ("named properties + canonical token, no `transition: all`"), `:652`, `:669`, all using `var(--ease-out-expo)` / `var(--ease-standard)`. Raw `ease` here is the only easing in the `paper/` directory off-token. Additionally `.callout-btn:hover` moves `transform: translateY(-1px)` (line 204) with no `prefers-reduced-motion` guard, in a file whose sibling devotes a 10-line comment block (`PaperView.vue:149-155`) to *not* animating under PRM.
**Falsifier.** If `--ease-out-expo` were unavailable — it is used unqualified across `PaperView.vue` and shipped by glass-ui, which this app imports at `style.css:3`.

### L-15 · MINOR · the glass-ui citation is a silent casualty of the in-flight major bump

Line 148 cites the `.deferred-section` utility at "`styles/utilities.css`". That path was **correct at the HEAD pin**: `glass-ui v3.1.0:src/styles/utilities.css:294-296` carries the rule verbatim, `contain-intrinsic-size` `auto` prefix and all. At the working-tree pin 4.0.0 the utilities file was split into a directory and the rule moved to `styles/utilities/base.css:477-480`; there is no longer a `styles/utilities.css`. So the `^3.1.0`→`^4.0.0` bump broke the citation and nothing flagged it — a reader following it to verify the `auto`-prefix claim (the claim L-2 disproves) now finds nothing, precisely when verification matters most.

This is the *shape* of the risk worth booking, not the typo: the component's most load-bearing comment depends on an upstream file path, across a major version boundary, with no test and no lint. The same bump left the *substance* intact (the rule survived the move unchanged), which is why it went unnoticed.
**Falsifier.** `git show v3.1.0:src/styles/utilities.css | grep -n deferred-section` → `:286-296` (present); `ls web/node_modules/@mkbabb/glass-ui/src/styles/utilities.css` → absent at 4.0.0; `grep -rn "deferred-section" …/glass-ui@4.0.0` → `src/styles/utilities/base.css:477`.

---

## 4. INFO

### L-16 · INFO · **R5-7 extension** — line 71 is a native `<div v-for>` and it is the single largest instance multiplier in the tree

The adjudicated intake row **R5-7** (`intakes/lane-fourier-r3-r6.md:125`, TRUE/ADOPT-AS-FACT, carried to F.W4) and CENSUS ADDENDUM item 5(iii) establish that loop evidence keyed to *component* callsites is blind to native element loops, and name `PaperSidebar.vue:65/87/105` as the exemplar. **`PaperArticleWindow.vue:71` is a second, larger instance of the same class, and it differs in a way that matters:**

- `PaperSidebar`'s three `<li v-for>` loops are **statically bounded** by the section tree (12 top-level entries; the whole TOC).
- This loop iterates `visibleItems`, whose length is a **runtime function of scroll position, measured heights, `overscanBeforePx: 240` / `overscanAfterPx: 720`, and the ±2/+3 warm range** — i.e. not statically bounded at all. The repo's own budget assertion is `MAX_MOUNTED_SECTIONS = 18` (`web/e2e/paper-performance.spec.ts:3`).
- Under a component-callsite-keyed deriver this component contributes **zero loop rows** while the two component callsites inside it (`PaperSection` line 76, `PaperSectionBlocks` line 83) record as multiplicity 1 — so the mounted-subject denominator for the entire paper body is understated by up to 18×, and *every* `MathBlock`/`Theorem`/`CodeBlock`/`figure` instance beneath them inherits the same understatement.

R6's `NATIVE_TEMPLATE_LOOP` family (`nativeTemplateLoops: 16`, R6-6) counts the loop's existence; it does **not** carry multiplicity. F.W4's per-component D/L/C audit needs a *multiplicity* model, not only a loop-presence model, or the paper route's instance denominator stays wrong even after R5-7 is cured. **This is the row to carry.**
**Falsifier.** If the deriver keyed loops to DOM elements rather than component callsites, or if `visibleItems` had a compile-time bound. `grep -n "v-for" PaperArticleWindow.vue` → line 71 only, on a `<div>`; `useVirtualSectionWindow.ts:242-245` computes the slice from mutable runtime state.

### L-17 · INFO · `SESSION_HEIGHT_CACHE` is a module-global keyed on a bare section id

`useVirtualSectionWindow.ts:32` — `const SESSION_HEIGHT_CACHE = new Map<string, number>()` at module scope, written at `:131`, read at `:73`, re-seeded at `:211-212`, never cleared (the `onUnmounted` block at `:233-240` clears `elementMap` and the timers but deliberately not this). Keys are raw slugified section ids (`transform/sections.ts:132`, `slugify(range.title)`), so any second `useVirtualSectionWindow` consumer on the same page sharing an id (`introduction`, `applications`, …) cross-contaminates. Single-paper today, so INFO — but it is the vehicle that makes L-2's 1200px pollution session-durable rather than mount-scoped.
**Falsifier.** If the cache were instance-scoped or namespaced. `:32` is a bare module-level `Map`.

### L-18 · INFO · no responsive `srcset`/`sizes` — up to 4276px of image served into a ≤768px column

The transcodes are 1:1 with the PNGs (`figureDimensions.ts:20-21`), and the PNGs are print rasters: `f21_epicycle_portraits` 4276×1765, `f07_fourier_projection` 3531×981, `f14_dft_matrix` 3530×1175. The rendered box is bounded by `.paper-grid`'s `minmax(0, 48rem)` (`PaperView.vue:562`) and `max-height: 400px` (line 103) — so a 4276px asset paints into at most ~768 CSS px. The `<picture>` (lines 85-107) carries format negotiation but **no width descriptors and no `sizes`**, so every device downloads the print-resolution variant.
**Falsifier.** If the transcodes were downscaled — `figureDimensions.ts:20-21` states they share the PNG pixel grid, and the map's dimensions are the print sizes.
Byte magnitude: `UNPROVEN-NEEDS-LIVE` (no build run).

---

## 5. Superlatives (L-18 both ways)

### S-1 · The `<picture>` 404 reasoning is correct **and** its invariant currently holds

Lines 41-43 state a genuinely non-obvious browser semantic — `<picture>` falls back on unsupported *format*, never on a 404 — and draw the right conclusion: emit `<source>` only for figures known to carry variants. Verified in the tree: all 26 mapped PNGs have `.avif` + `.webp` siblings on disk; the only unmapped PNGs (`fourier.png`, `maintainer-avatar.png`) are not paper figures; the 26 map keys match the 26 `\includegraphics` in `fourier_paper.tex` one-for-one. A comment that states a real hazard *and* whose invariant survives audit.
**Falsifier (run):** set-differenced `*.png` against `*.avif`/`*.webp` in `web/public/assets/` — zero paper-figure gaps in either direction.

### S-2 · The `width`/`height` + `max-height` reservation is CSS-correct, and the attributes are on the right element

`figureDimensions.ts:16-19` claims the attributes supply only the aspect ratio while `max-height: 400px` caps the render. That is exactly how the replaced-element constraint table resolves `width:auto; height:auto; max-width:100%; max-height:400px` against an attribute-derived `aspect-ratio`: when the height constraint binds, the used width becomes `400px × AR`, so the reserved box equals the rendered box and the CLS claim holds. The attributes are on the `<img>` (lines 99-100), not the `<source>`s — the authoritative placement. Correct reasoning, correctly implemented, with the "additive, never breaks an unlisted figure" caveat also true.

### S-3 · `.deferred-section` is **consumed**, not re-implemented, and retuned through the substrate's own documented knob

Line 74 applies glass-ui's canonical class; line 167 retunes it through `--deferred-section-size`, which glass-ui documents as *the* knob (`utilities/base.css:469-470`, "Estimate is token-driven (`--deferred-section-size`, default 30rem)"). The component adds zero `content-visibility` / `contain-intrinsic-size` of its own. The comment's parenthetical that "the glass-ui rule even names fourier γ as a consumer" is **true** — `utilities/base.css:466` reads "the INP-under-load lever (fourier γ, muster, speedtest, words)". This is precisely the substrate-owns-the-recipe discipline the constellation's glass-ui-first precept demands, executed and verifiable. (L-2 attacks the *reasoning about* the recipe; the *adoption* of it is exemplary.)

### S-4 · `:key="item.id"` is the load-bearing correct choice

Line 72. `visibleItems` is a sliding `.slice()` over a fixed array (`useVirtualSectionWindow.ts:244`), so an index key would make every section's vnode change identity on each single-step window advance — remounting the entire article body, destroying KaTeX output and the `content-visibility` last-remembered sizes on every scroll step. Compiled output confirms `128 /* KEYED_FRAGMENT */`. The one identity decision that had to be right, is.

---

## 6. Axis coverage notes (not counted as defects)

**Viz render path.** This component touches **no canvas and no WebGL**. CENSUS §2 records fourier as "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument … )" (`CENSUS-2026-08-03.md:85-86`), and none of the three is reachable from here. Its **sole** contact with the viz path is the `#callout` `<router-link :to="callout.link">` (lines 112-113) — the paper's only in-body entry point to the visualiser. Verified end-to-end: 2 callouts configured (`web/vite.config.ts:10-19`, keys `applications` / `image-reconstruction-via-epicycles`), both keys match live section ids (`slugify` of `\chapter{Applications}` at `fourier_paper.tex:3000` and `\section{Image Reconstruction via Epicycles}` at `:3038`; `transform/sections.ts:132,154`), both link to `/visualize`, which is a live **alias** on `/w/:imageSlug?` → `VisualizationView.vue` (`router/index.ts:68-72`). No broken link, no dead callout config, no dead template. Consistent with intake row **X-2** (9 route records = 7 lazy + 2 redirects, + 1 alias) — this component consumes the alias, the one route kind the census's "8 routes, all lazy" model had no slot for.

**Dynamic-`:is` surface outside the census scope.** Intake row **R3-10** budgets **6 dynamic `:is` families** over fourier's 318 repository members (→ F.W4). This component's render path traverses **5 more that live in `node_modules`** and are therefore outside that denominator: `PaperSection.vue:26` (`'h3' : 'h2'`) and `PaperSectionBlocks.vue:91, 131, 184, 226` (the four arrow-`:is` sites that drive L-5). Four of the five are the highest-consequence dynamic-`:is` sites on the paper route, and the budget cannot see any of them. F.W4's `:is` census should state its member scope explicitly (cf. **X-9**, "publish ONE member-scope law before any percentage") or record the node_modules surface separately.

**Prior-art check.** No row here duplicates the adjudicated intake (`lane-fourier-r3-r6.md`) or the CENSUS/lanes. Explicit contacts: **L-16 extends R5-7 / addendum 5(iii)** (same class, new instance, adds the multiplicity dimension the cured R6 model still lacks); **§6 corroborates X-2**; **§6 qualifies R3-10 / X-9**. **No contradiction of the corpus was found** — where the corpus is silent (the token-format break, L-1) the finding is novel, and the corpus's `hitherto` grep is clean (`grep -rn "hsl(var(" formation/fourier/ intakes/` → 0).

---

## 7. Remediation shape (single coherent move)

Four of the six top rows collapse into one refactor: **extract lines 76-123 into `PaperWindowSection.vue` taking `:item`**, and hoist the figure body into `PaperWindowFigure.vue`.

- L-5 dies: slots leave the `v-for` scope → `hasDynamicSlots` clears → `_: 1 /* STABLE */`, patchFlag `8`, `shouldUpdateComponent` bails on identical `:section` → no more per-frame unmount/remount of `<picture>` and `<router-link>`.
- L-7 dies: `resolveFigure` becomes one `computed` per figure component instead of seven calls per render.
- L-3 gets a home: the extracted figure component is where `@error` belongs.
- L-4 becomes tractable: with the child no longer re-rendering, the parent's per-patch ref call fires far less often — **but do not memoise the ref while L-2 is open**, since the per-patch `offsetHeight` re-read is currently the only thing that repairs the 1200px pollution. Fix L-2 first (gate `measureSection` on `contentvisibilityautostatechange`, the hook glass-ui already documents at `utilities/base.css:472-476`, or skip the write when `offsetHeight` equals the CSS estimate), then L-4.

L-1 is independent and upstream: either latex-paper's `theme.css` moves 42 declarations to bare `var(--x)`, or the consumer publishes the bare-channel aliases `theme.css:3-7` asks for. It is a cross-repo relay (glass-ui BH inbox law applies — the token-format contract is the seam), and it should not be folded into the component refactor.
