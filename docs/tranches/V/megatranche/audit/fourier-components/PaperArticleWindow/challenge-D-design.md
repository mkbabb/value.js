claude-opus-5[1m]

# CHALLENGE · `PaperArticleWindow.vue` · axis **D — DESIGN**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperArticleWindow.vue` (212 lines)
**Coordinate** fourier-analysis HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16`, tree `9a66411d16fe4ec564d67367ca55e5f97da2a6d4` — **byte-identical to the coordinate the adjudicated intake lane certifies at row R4-9** (`lane-fourier-r3-r6.md:107`). Target file and `web/src/style.css` are both clean at HEAD (`git status --porcelain` empty for both).
**Pins** glass-ui `^4.0.0` / installed **4.0.0** (producer latest **7.0.0**); latex-paper `^0.2.1` / installed 0.2.1; keyframes `^4.3.0`; value.js `^0.13.0`.
**Method** static + source-derived only. No browser tooling (L-law). Read whole: the target; `@/lib/figureDimensions.ts`; `@mkbabb/latex-paper` `PaperSection.vue` / `PaperSectionBlocks.vue` / `context.ts` / `useVirtualSectionWindow.ts` / **the installed `src/vue/theme.css`** (644 lines); glass-ui 4.0.0 `styles/index.css`, `tokens/{color-radius,dark-arm,light-dark,scheme-motion,scale-paper,offsets-sizing}.css`, `utilities/{base,btn,a11y-overrides}.css`, `typography/utilities.css`, `paper.css`, `glass/surfaces.css`; glass-ui **7.0.0 producer tree** for the uplift ledger; the two consumers `PaperView.vue` + `GalleryCardModal.vue`; `web/src/style.css`; `web/vite.config.ts`; `@vue/runtime-core` `setRef`; and two raster assets read directly (`assets/f20_contour_pipeline.png`, `assets/f21_epicycle_portraits.png`, `assets/f01_title_epicycle.png`).
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Every claim below carries severity + `file:line` provenance + its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways). Three candidate findings were **killed by their own falsifiers** and are recorded in §7 so the kill is auditable.

**Verdict** — **2 BLOCKER · 8 MAJOR · 8 MINOR · 5 INFO = 23 defects; 7 superlatives.**

The component's *own authored surface* is small, careful and unusually well-reasoned — three of the seven superlatives are non-obvious engineering the author got exactly right and documented. The failure is not in what it writes; it is in **what it composes**. This file is the sole emitter of `<PaperSection>` in the application, and the theme it renders into (`@mkbabb/latex-paper/theme`, imported at `PaperView.vue:12`) declares a token contract that glass-ui 4.0.0 **does not satisfy** — 42 colour declarations across the paper surface are invalid-at-computed-value-time and are dropped by every engine. The component does not detect, compensate for, or annotate this. Separately, the component's single largest authored design claim — the 24-line comment at lines 144-166 asserting that the `auto` prefix on `contain-intrinsic-size` neutralises the measurement hazard — is **false for the warm band**, and the falsity is provable from the two files the comment itself names.

---

## §1 · BLOCKERS

### B-1 · The paper's sticky section headers ship with **no background**; the whole latex-paper colour layer is dropped by the engine

**BLOCKER** · root cause: cross-package token-shape contract violation · manifest surface: this component

`@mkbabb/latex-paper/theme` states its contract in its own header, in prose:

> `node_modules/@mkbabb/latex-paper/src/vue/theme.css:1-9`
> `* Requires the consumer to define HSL custom properties:`
> `*   --primary, --foreground, --border, --muted, --muted-foreground,`
> `*   --accent-pink, --section-heading, --card, --radius, --_section-color`

It means *bare HSL component triplets*, because it writes `hsl(var(--card))`, `hsl(var(--border) / 0.5)`, `hsl(var(--foreground) / 0.9)` — **42 such sites in 644 lines** (`grep -c "hsl(var(--"` → 42).

glass-ui 4.0.0 ships **complete colour values**, not triplets:

| token | glass-ui 4.0.0 light | dark | provenance |
|---|---|---|---|
| `--card` | `hsl(36 48% 97%)` | `hsl(24 8% 16%)` | `tokens/color-radius.css:72` · `tokens/dark-arm.css:64` |
| `--border` | `var(--neutral-4)` → `hsl(32 26% 70%)` | `hsl(30 16% 34%)` | `color-radius.css:95,44` · `dark-arm.css:46` |
| `--muted-foreground` | `var(--neutral-5)` → `hsl(30 22% 40%)` | `hsl(34 14% 62%)` | `color-radius.css:85,45` |
| `--section-heading` | `oklch(0.545 0.189 352.8)` | `oklch(0.711 0.123 349.3)` | `color-radius.css:257` — **not even HSL** |

Fourier supplies **zero** triplet overrides: `grep -rnE "^\s*--(card\|border\|foreground\|muted\|muted-foreground\|primary\|section-heading)\s*:\s*[0-9]" web/src/` returns nothing, and `web/src/style.css` is the only CSS file under `src/` (`find src -name "*.css"` → 1 file). `style.css:119-127` sets `--viz-amber` / `--section-color-5` in the **complete-colour** form, confirming the repo's own convention is the glass-ui one.

Therefore `hsl(hsl(36 48% 97%))` is not a parseable `<color>`. Per CSS Custom Properties §Invalid At Computed-Value Time, each such declaration is discarded and the property takes its **inherited** value (inherited properties) or **initial** value (non-inherited ones). The consequences on *this component's* rendered output:

| dropped declaration | provenance | shipped result | design consequence |
|---|---|---|---|
| `.section-header--chapter { background: hsl(var(--card)) }` | theme.css:443-452 | `background-color: transparent` (initial) | **the sticky `top:0` chapter heading is see-through; body copy and KaTeX display blocks scroll visibly *underneath* the heading for the entire treatise.** `.paper-article`'s own `background: var(--card)` (`PaperView.vue:524`) paints *behind all content*, so it cannot mask the scrolling text — an opaque header background is exactly what the sticky recipe requires. |
| `.section-header--sub { background: hsl(var(--card)) }` | theme.css:455-465 | transparent | same, at `top: 3.5rem` |
| `.paper-ref { color: hsl(var(--primary)); border-bottom: 1px dashed hsl(var(--primary)/0.4) }` | theme.css:13-19 | inherits body ink; `border-style` → `none` | see **M-8** |
| `figcaption { color: hsl(var(--muted-foreground)) }` | theme.css:629-635 | inherits body ink | see **M-1** |
| `.paper-figure { border: 1px solid hsl(var(--border)/0.5) }` | theme.css:598-602 | no border | see **m-7** |
| `.paper-proof-block { border-left: 3px solid …; background: hsl(var(--card)/0.6) }` | theme.css:206-212 | no rule, no tint | see **m-6** |
| `.paper-figure-placeholder { border: 1px dashed …; background: hsl(var(--muted)/0.3) }` | theme.css:637-643 | invisible box | see **i-1** |
| `.section-body { color: hsl(var(--foreground)/0.9) }` | theme.css:517-522 | 100% ink, not 90% | tonal flattening of every paragraph |

Note the shorthand mechanics: `border: 1px solid hsl(…)` is a **shorthand containing `var()`** — the entire declaration is IACVT, so `border-style` falls to its initial `none`. Nothing paints. This is stricter than "wrong colour"; the affordance disappears.

**Falsifier** — this claim dies if *any* of: (a) fourier or glass-ui defines a triplet-shaped `--card`/`--border`/`--muted-foreground` reachable at `.paper-article`; (b) `hsl()` accepts a nested `<color>` as its hue argument; (c) the theme import at `PaperView.vue:12` does not resolve to this file. All three were checked: (a) grep returns nothing repo-wide, and `package.json` `"./theme": "./src/vue/theme.css"` is the exact file read; (b) `hsl()` takes `<hue>` = `<number>|<angle>`, and a `<color>` is neither; (c) `PaperView.vue:12` is `import "@mkbabb/latex-paper/theme"`. Falsifier fails. **CONFIRMED.**

**Attribution, honestly** — the root defect is a cross-package contract mismatch, not a line this component wrote. It is filed here because (i) `PaperArticleWindow.vue:76-124` is the **sole** `<PaperSection>` / `<PaperSectionBlocks>` call site in the application, so this file *is* the surface, and (ii) the component actively opts into the broken layer by hand-applying `class="paper-figure"` / `"paper-portrait"` at line 102 — it consumes the theme's vocabulary while compensating for none of it. The one-line cure (`:root { --card: 36 48% 97%; … }` triplet aliases, or an upstream rewrite of theme.css to complete-colour form) discharges B-1, M-1, M-8, m-6, m-7 and i-1 together.

---

### B-2 · Warm-band sections are measured **while render-skipped**, writing the 1200 px estimate into a session-lifetime height cache — the exact hazard the component's own 24-line comment claims to have closed

**BLOCKER** · `PaperArticleWindow.vue:144-167` (the claim) · `PaperArticleWindow.vue:73` (the mechanism) · `PaperView.vue:77-85` (the parameters)

The component asserts, at length:

> `PaperArticleWindow.vue:152-160` — *"The CRITICAL piece is the `auto` prefix … it makes the browser REMEMBER each section's real rendered size after first paint … That neutralises the one hazard here … **Sections are measured on a post-mount rAF (latex-paper `measureSection`), i.e. AFTER first paint, so the remembered size is always the real one.**"*

The load-bearing word is *paint*. `contain-intrinsic-size: auto <estimate>` remembers a size **only once the element has painted at least once**; before that, `offsetHeight` on a render-skipped element returns **the estimate** — here `--deferred-section-size: 1200px` (line 167).

The mounted band is *not* the paint band:

- `PaperView.vue:77-85` configures `overscanAfterPx: 720` and `warmTargetAfter: 3` (`warmTargetBefore: 2`).
- `useVirtualSectionWindow.ts:93-99` passes `warmRange.value` into `resolveSectionWindow`, and `:242-245` computes `visibleItems` as a contiguous `slice(startIndex, endIndex+1)` — **the warm range is unioned into the mounted range**. On any `ensureTargetWindow` (every ToC click, every cross-reference jump, `PaperView.vue:72`), three sections *ahead of the target* are mounted. At the paper's section heights (the component's own estimate is 1200 px) those sit ~1.2-4 k px below the viewport — categorically outside any engine's `content-visibility` relevance margin. They mount **skipped**, and they never paint.
- `measureSection` (`useVirtualSectionWindow.ts:140-158`) then runs one `requestAnimationFrame` after mount and calls `syncMeasuredHeight(id, target.offsetHeight)` — reading **1200**, not the real height.
- `syncMeasuredHeight` (`:127-134`) writes that 1200 into `measuredHeights` **and into `SESSION_HEIGHT_CACHE`**, which is declared at **module scope** (`:32`) and is therefore **page-session-lifetime, surviving every route change** (`:73` and `:211-212` read it back as the layout height).
- There is **no re-measure on paint**. `disconnectSection` (`:136-138`) only deletes from `elementMap`; there is no `ResizeObserver`, and neither latex-paper nor this host listens for `contentvisibilityautostatechange` — **the very event glass-ui's own utility comment prescribes for this**: *"JS HOOK: the engine fires `contentvisibilityautostatechange` { skipped } at the render-skip boundary"* (`glass-ui/src/styles/utilities/base.css:471-476`).

Result: `buildSectionLayout` runs on falsified heights for up to five sections at a time; `topSpacerPx`/`bottomSpacerPx` and `getOffsetFor` (the scroll-offset corrections `useScrollNavigation` consumes, `PaperView.vue:99-106`) are computed from them. A section whose true height is 400 px is booked at 1200 px, so the scroll target overshoots by 800 px — precisely the "corrupt scroll positioning" outcome the comment says is neutralised. The poisoning **persists across navigations** for any section that was warmed but never read.

Even in pure steady-state scrolling the same window opens: `overscanAfterPx: 720` mounts content up to 720 px below the fold, while Chromium's `content-visibility` relevance margin is roughly 50 % of the viewport in each direction (≈450 px at a 900 px viewport) — so the trailing mounted section is skipped at measure time.

**Falsifier** — this dies if any of: (a) `visibleItems` excludes the warm range; (b) `syncMeasuredHeight` guards against a value equal to the intrinsic-size estimate; (c) something re-measures after first paint; (d) `SESSION_HEIGHT_CACHE` is per-instance. Checked: (a) refuted at `useVirtualSectionWindow.ts:93-99` + `:242-245`; (b) refuted — `:128` only does `Math.max(1, Math.round(h))`; (c) refuted — no RO, no `contentvisibilityautostatechange` listener anywhere in either tree; (d) refuted — `:32` is module scope. Falsifier fails. **CONFIRMED.**
The *exact* engine relevance margin (450 px) is engine-defined — that one number is **UNPROVEN-NEEDS-LIVE (SS-13)**. It is not load-bearing: the `warmTargetAfter: 3` arm proves the defect on its own arithmetic.

**Cure** — wire the hook the substrate already documents: on each `.deferred-section`, `el.addEventListener('contentvisibilityautostatechange', e => { if (!e.skipped) props.measureSection(item.id, el) })`. Two lines, no new dependency, and it is the substrate's stated contract.

---

## §2 · MAJOR

### M-1 · Figure captions render at **body ink** — the caption/body typographic hierarchy is gone

**MAJOR** · root = B-1 · theme.css:629-635 · manifested by `PaperArticleWindow.vue:84-108`

`.paper-article figcaption { color: hsl(var(--muted-foreground)) }` is IACVT; `color` is an inherited property, so the caption inherits `.section-body`'s colour — itself IACVT — and lands on the body `--foreground`.

Token-decidable contrast against `--card` (sRGB relative luminance, WCAG 2.x):

| | as authored | as shipped |
|---|---|---|
| light | `--muted-foreground` on `--card` = **5.12 : 1** | `--foreground` on `--card` = **16.52 : 1** |
| dark | — | **14.03 : 1** |

The caption is not *illegible* — it is **over-legible**: 3.2× the authored contrast, at the same ink as the prose it is meant to sit beneath. The surviving differentiators are `font-size: 0.875rem` and `font-style: italic` alone. In a treatise with 25 figures, every caption competes with the body for the same tonal register.

**Falsifier** — dies if `figcaption` sets `color` elsewhere at higher precedence, or if `--muted-foreground` were triplet-shaped. Neither: the sole `figcaption` rule in the tree is theme.css:629; token shape proven in B-1.

### M-2 · `alt` is **raw LaTeX**, and it **duplicates the visible caption verbatim**

**MAJOR · a11y** · `PaperArticleWindow.vue:98`

```
:alt="figure.caption"
```

Two independent defects on one attribute.

**(a) The string is un-rendered TeX.** `PaperFigureData.caption` is the raw parsed caption; the *visible* caption is rendered through `ctx.renderTitle` (`PaperSectionBlocks.vue:146`), whose implementation is `text.replace(/\$([^$]+)\$/g, …renderInline…)` (`latex-paper/src/vue/context.ts:19-25`). The `alt` bypasses it. From `paper/fourier_paper.tex`, essentially every caption carries math or TeX escapes — e.g. `:160` `"…boundary conditions: $u(0, y) = 1$ and $u(x, \pm\pi/2) = 0$."`; `:1177` `"…$\psi_n(x) = c_n H_n(x)e^{-x^2/2}$, each an eigenfunction … eigenvalue $(-i)^n$…"`; `:1676` `"Fej\'{e}r summation (Ces\`{a}ro means)…"`; `:1669` `"The $\approx 9\%$ overshoot…"`. A screen-reader user hears *"dollar u left-paren zero comma y right-paren equals one dollar"* and *"Fej backslash apostrophe brace e brace r"*.

**(b) It is announced twice.** latex-paper renders the host's `#figure` slot **and** its own `<figcaption>` as siblings inside the same `<figure>` — `PaperSectionBlocks.vue:129-147` (verified against the shipped `dist/vue.js:1643-1662`, so this is not a source-vs-dist artefact). The `<figcaption>` is *not* conditional on slot absence. So AT reads the image's `alt` (raw TeX) and then the same caption again, rendered. W3C WAI's figure guidance is explicit that the caption must not be duplicated into `alt`.

**Falsifier** — dies if the parser pre-renders `caption` to plain text (it does not — the figcaption re-renders it through KaTeX, which would be a no-op on pre-rendered text), or if `<figcaption>` were suppressed under a slot (it is not — `v-if` is on `caption || number` only). **CONFIRMED.**

**Cure** — `alt=""` (the caption is the accessible description, and it is adjacent), or a distinct short description. Not the raw caption.

### M-3 · The dark-mode figure-inversion heuristic is **exactly backwards** on the two figures where it matters

**MAJOR** · `PaperArticleWindow.vue:102` + theme.css:598-613 + the assets themselves

```
:class="figure.filename.includes('portrait') ? 'paper-portrait' : 'paper-figure'"
```

`.paper-figure` gets `filter: invert(1) hue-rotate(180deg)` under `.dark` (theme.css:604-608); `.paper-portrait` does not. The intent is sound: invert white-background line plots, leave photographs alone. The **discriminator** is a substring test on the filename, and exactly one asset in the corpus matches it (`ls assets/ | grep -i portrait` → `f21_epicycle_portraits.*` only). I read both decisive assets:

- **`assets/f21_epicycle_portraits.png`** (4276×1765) — matches `'portrait'` → **not inverted**. It is a three-panel **matplotlib line plot on solid white**: cyan contours, grey gridlines, black axis ticks. The only photographic content is three ~200 px engraving insets in the lower-left corner of each panel, together well under 5 % of the area. In dark mode this renders as a **full-width white slab** inside a `hsl(24 8% 16%)` article — and, per B-1/m-7, with no border either.
- **`assets/f20_contour_pipeline.png`** (2600×2920) — does **not** match → **inverted**. Its panel (a) is a large photographic engraving of Fourier occupying roughly a quarter of the whole figure. Inverted, it becomes a **photo negative**: white hair, black face, on a black-turned-white plate.

The heuristic gets both of them wrong, in opposite directions. `assets/f01_title_epicycle.png` (read: pure cyan line art on white) confirms the *general* rule is right — which is what makes the two misses a design defect rather than a design absence.

**Falsifier** — dies if f21 is predominantly photographic (it is not: three small insets on a white plot field) or if f20 contains no photograph (it contains a large one). Both refuted by direct read of the bytes. **CONFIRMED.**

**Cure** — the classification belongs in `figureDimensions.ts` beside the dimensions it already curates, as an explicit per-figure `invertInDark: boolean`, not a filename substring. The map is already the per-figure metadata home and is already keyed by the same resolved `.png` name (`figureDimensions.ts:22-49`).

### M-4 · `.callout-btn` is a **divergent twin** — the same CTA exists twice, with contradictory recipes, under one shared class name and one shared global rule

**MAJOR · design-system coherence + glass-ui conformance** · `PaperArticleWindow.vue:112-119, 188-206` vs `GalleryCardModal.vue:181-190, 246-256`

The identical affordance — the ornamental ℱ, the words *"Open Visualizer"*, a trailing `ArrowRight` — is authored twice in this application:

| | `PaperArticleWindow.vue:112-119` | `GalleryCardModal.vue:181-190` |
|---|---|---|
| element | `<router-link class="callout-btn">` | `<Button variant="outline" size="lg" class="callout-btn …">` |
| chassis | **hand-rolled CSS**, zero glass-ui imports | **glass-ui `<Button>`**, `.callout-btn` as a thin skin |
| fill | `background: var(--primary)` (solid) | `color-mix(… --foreground 3% …)` (near-transparent plate) |
| radius | `9999px` pill | `<Button variant=outline>` default |
| border | none | `2px` |
| hover | `translateY(-1px)` + deepened shadow | background/border tint step |
| press | **none** | `<Button>` / `btn-interactive` scale |

Two problems compound:

1. **The user meets both.** A solid primary pill and an outline plate do not read as the same action. There is one CTA in this product; it has two visual identities.
2. **The class name collides.** Vue's scoped hashes keep the two *recipes* apart, but `web/src/style.css:136-143` is a **global, unscoped** rule that governs `.callout-btn:focus-visible` for **both** — written, per its own comment (`style.css:129-135`), for "the TOC link classes + the gallery card". One a11y rule, two contradictory chassis, neither author aware of the other. `GalleryCardModal.vue:246` even documents its `.callout-btn` as *"`<Button variant="outline" size="lg">` chassis"* — a description that is simply false of the other definition.

The sibling proves the idiomatic path exists and is already in use in this repo: build on glass-ui `<Button>`, skin with a thin local class.

**Falsifier** — dies if the two are visually reconcilable, or if the name collision is impossible. Neither: the recipes are read above, and `style.css:138` is unlayered and unscoped, so it applies to every `.callout-btn` in the document. **CONFIRMED.**

### M-5 · `style="max-height: 400px"` — an inline, unoverridable absolute cap that starves the tall figures inside a 688 px measure

**MAJOR · proportion (Aristotelian)** · `PaperArticleWindow.vue:103`

The article measure is fixed: `PaperView.vue:562` gives `grid-template-columns: 220px minmax(0, 48rem)` and `:532-534` gives `.paper-article { padding: 2rem 2.5rem }` — content width **768 − 80 = 688 px** at ≥640 px. With the aspect ratio supplied by the `width`/`height` attributes (line 99-100) and `height: auto` from theme.css:624-627, the `max-height: 400px` binds for every portrait-ish figure:

| figure | intrinsic | rendered | unused measure |
|---|---|---|---|
| `f01_title_epicycle` | 1213 × 1731 | **280 × 400** | 408 px (59 %) |
| `f19_epicycle_convergence` | 2035 × 2332 | **349 × 400** | 339 px (49 %) |
| `f20_contour_pipeline` | 2600 × 2920 | **356 × 400** | 332 px (48 %) |
| `f12_laurent_annulus` | 1728 × 1611 | **429 × 400** | 259 px (38 %) |

`f20` is a **four-panel** figure whose panels carry axis tick labels and legends; at 356 px wide each panel is ~170 px across and its tick numerals fall below one CSS pixel of x-height. Half the available measure sits empty beside it. This is the inverse of the proportion the page otherwise keeps: the caption is deliberately bound to `max-width: 32rem` (theme.css:629-635) to hold a comfortable reading measure, while the figure — the thing being read — is bound to less than that.

Worse, it is an **inline `style` attribute**: it outranks every author stylesheet, so it cannot be retuned by a media query, a container query, a print stylesheet, a `prefers-reduced-*` arm, or any downstream token. The two classes on the same element (`max-w-full rounded-lg shadow-sm`, line 101) are cascade-reachable; this one is not. Everything else in the file that carries a magic length is either a documented token retune (`--deferred-section-size`, line 167) or a `clamp()` (line 176). This is the one hard-coded, unreachable number.

**Falsifier** — dies if the rendered widths do not fall short (arithmetic above is exact given the two attributes plus `height: auto`), or if the inline style is overridable (it is not, absent `!important`). **CONFIRMED.** The *perceptual* claim about tick-label legibility is arithmetic, not measurement, and stands as stated.

**Cure** — `max-block-size: min(60svh, 34rem)` in the scoped block, so tall figures use the viewport and the cap is reachable by the cascade.

### M-6 · The per-item wrapper makes **every** section a `:last-child` — the inter-section rhythm is dead

**MAJOR · spacing** · `PaperArticleWindow.vue:70-124` vs theme.css:200-202

```css
.paper-article .paper-section:not(:last-child) { margin-bottom: 2rem; }   /* theme.css:200-202 */
```

The component emits **one wrapper per item**, each containing **exactly one** `<PaperSection>`:

```
<div v-for="item in visibleItems" :key="item.id" … class="paper-window-section deferred-section">
    <PaperSection …>            ← the only element child
```

Every `.paper-section` is therefore the last (and only) child of its own wrapper; `:not(:last-child)` **never matches**; **no section ever receives its 2 rem bottom margin.** Sections abut with zero separation — the only remaining vertical break between one section's last paragraph and the next section's heading is `.section-body { margin-top: 1.25rem }` (theme.css:517), which sits *after* the heading, not before it.

Second, compounding arm: `content-visibility: auto` (line 74) implies `contain: layout style paint`, which blocks margin-collapse through the wrapper. Even if a margin existed it would no longer collapse with a neighbour's — so the authored rhythm is unreachable in both directions.

**Falsifier** — dies if a wrapper can hold ≥2 `.paper-section` children, or if the selector were `:not(:last-of-type)` scoped to `.paper-article`, or if a scoped rule restored the gap. All refuted: the `v-for` is one-to-one (lines 70-124); the selector is read above; `PaperArticleWindow.vue:141-168` sets only `min-width` and the intrinsic-size token on `.paper-window-section`. **CONFIRMED.**

**Cure** — one line in the component's own scoped block: `.paper-window-section + .paper-window-section { margin-top: 2rem }`. The component created the wrapper; the component owns the rhythm it displaced.

### M-7 · `.interactive-callout` declares **two** emphasis devices and lands **both** below perceptual threshold

**MAJOR · surface design, token-decidable** · `PaperArticleWindow.vue:179-186`

```css
border: 1px solid var(--border);
background: color-mix(in srgb, var(--muted) 25%, transparent);
```

Computed from glass-ui 4.0.0 tokens (`--muted` = `--neutral-1`; composited over `.paper-article`'s `--card`):

| | tint vs card | 1 px border vs card |
|---|---|---|
| light | **1.01 : 1** | **1.90 : 1** |
| dark | **1.04 : 1** | **2.08 : 1** |

A 25 % mix of `hsl(38 26% 95%)` into `hsl(36 48% 97%)` is a **1 % luminance step** — the tint is a no-op gesture. In dark mode it inverts sign (`--muted` L 11 % is *darker* than `--card` L 16 %), so the callout **recedes** where it is meant to advance. That leaves the hairline as the sole boundary, at 1.90/2.08 : 1 — below the 3 : 1 floor WCAG 2.1 SC 1.4.11 sets for boundaries that carry meaning.

The callout is the paper's only interactive interruption — the one place the treatise hands the reader to the application. Its entire visual claim rests on `text-align: center` and a sub-threshold hairline.

**Falsifier** — dies if `--muted`/`--card`/`--border` differ from the values read, or if the arithmetic is wrong. Values are cited to line; ratios were computed from sRGB relative luminance with the standard WCAG formula. Note the SC 1.4.11 framing is **advisory** — a decorative container boundary is arguable as a "user interface component" — but the 1.01 : 1 tint is not arguable at all. **CONFIRMED.**

### M-8 · Every cross-reference in the paper renders as **plain body text** — the click affordance is invisible

**MAJOR · a11y + affordance** · root = B-1 · theme.css:13-24 · consumed at `PaperView.vue:87-97`

```css
.paper-article .paper-ref {
    color: hsl(var(--primary));                                  /* IACVT → inherits body ink */
    border-bottom: 1px dashed hsl(var(--primary) / 0.4);         /* IACVT → border-style: none */
    cursor: pointer;                                             /* survives */
}
```

Both visual signals are dropped; only `cursor: pointer` and `text-decoration: none` survive. `useClickDelegate({ selector: ".paper-ref", … })` (`PaperView.vue:88-97`) is wired and working — so every `\ref`/`\eqref` in the treatise is a **live, navigable target that looks exactly like the prose around it**. There is no colour, no underline, no weight change; the only discovery path is hovering and noticing the cursor, which is unavailable to touch and to keyboard users entirely, and the elements are `<span>`s (not links), so they are not in the tab order or the AT links list.

WCAG 1.4.1 (Use of Colour) is the *authored* posture — colour plus a dashed rule. Shipped, there is neither.

**Falsifier** — dies if `.paper-ref` is styled elsewhere at higher precedence (grep across `web/src` + both packages: theme.css:13-24 is the only `.paper-ref` colour rule), or if the token shape were triplet (refuted in B-1). **CONFIRMED.**

---

## §3 · MINOR

**m-1 · The one file in `components/paper/` with zero tokened easing.**
`PaperArticleWindow.vue:199` — `transition: transform 0.2s ease, box-shadow 0.2s ease`. glass-ui ships `--ease-standard` / `--ease-out-expo` (`tokens/scheme-motion.css:216,219`) and `--duration-fast: 0.2s` (`:67`). Four of the five other files in the directory use them (`PaperView.vue:512,655,673`; `PaperSidebar.vue:198,230`; `MobileFloatingToc.vue:246,348,384`; `PaperSearch.vue:371`), and `PaperView.vue`'s comments record the migration by ledger id (*"A.W3.d — bezier→`--ease-out-expo`"*, `:511,652,670`) and even the rule (*"named properties + canonical token, no `transition: all`"*, `:598`). This file has exactly one transition and it is 0/1 tokened — the only file in the directory with no tokened easing at all. **Falsifier:** dies if `ease` is the canonical value — it is not; the tokens exist and are used 9× next door.

**m-2 · The button ignores three shipped interaction contracts.**
`PaperArticleWindow.vue:203-206` gives hover only. (a) **No `:active`** — the sibling `.overlay-btn` has one (`PaperView.vue:614-616`), and glass-ui ships `.tap-squish` (`utilities/base.css:258-270`) and `btn-interactive` (`utilities/btn.css:184+`) precisely for this. (b) **No `@media (hover: hover)` guard** — on touch, `:hover` latches after a tap, so the button stays lifted with its deepened shadow after the user returns from `/visualize`. (c) **Uses the `transform` shorthand**, whereas glass-ui's stated doctrine is individual transform properties (*"Individual-transform identity base (AQ.W3 §W3.2) — `scale: 1` at rest"*, `glass/surfaces.css:62-64`), specifically so recipes compose without clobbering; a `transform: translateY(-1px)` would wipe any composed `scale`. **Falsifier:** dies if the recipes do not exist — all three are cited to line in the installed 4.0.0.

**m-3 · The ornamental ℱ pollutes the link's accessible name.**
`PaperArticleWindow.vue:116` — `<span class="fourier-f">ℱ</span>` is a bare U+2131 SCRIPT CAPITAL F inside the `<router-link>`. The link's accessible name computes to *"ℱ Open Visualizer"*, announced by most AT as *"script capital F, Open Visualizer"*. The `<ArrowRight>` beside it is **not** a defect — lucide-vue-next auto-applies `aria-hidden="true"` when no a11y prop and no default slot are present (`lucide-vue-next/dist/cjs/lucide-vue-next.js:76`) — which makes the untreated ℱ the sole naming pollutant, and makes the omission conspicuous. **Falsifier:** dies if `@utility fourier-f` sets `speak: none` or similar — it does not (`glass-ui typography/utilities.css:80-88`: family, style, size, line-height, alignment, weight, display).

**m-4 · The global focus rule carries a latent radius pop.**
`web/src/style.css:138-143` — `.callout-btn:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; border-radius: inherit }`. On this button, `border-radius: inherit` resolves to the **parent's** `0.75rem` (`.interactive-callout`, line 183), not the button's own `9999px` (line 196) — so if it wins, the pill squares off on keyboard focus. Specificity ties at (0,2,0) against the scoped `.callout-btn[data-v-…]`, so the outcome is decided by emitted CSS order; under Vite's module-graph ordering (`main.ts` imports `style.css` before the SFCs) the scoped rule should win, making the declaration **dead**. Either way the line is wrong: dead code or a visible pop. **Falsifier:** dies if `border-radius: inherit` on a focus rule is required for outline shaping — it is not; `outline` already follows the element's own `border-radius`. Emitted order marked **UNPROVEN-NEEDS-LIVE (SS-13)**; the disjunction (dead ∨ harmful) holds regardless.

**m-5 · The footer spacer is not coupled to the overlay it exists to clear.**
`PaperArticleWindow.vue:175-177` — `height: clamp(3.5rem, 8vh, 5rem)`. Its job is to keep the treatise's last line out from under `.paper-bottom-overlay` (`PaperView.vue:568-580`). That overlay's height is `0.75rem + max(2rem) + calc(0.75rem + env(safe-area-inset-bottom))` ≈ **56 px + SAI**. The spacer carries **no `env(safe-area-inset-bottom)` term**. On a 390 × 844 notched viewport (SAI-bottom 34 px): overlay ≈ 90 px, spacer `8vh` = 67.5 px → the last **~22 px** of the final line sits under the page-indicator pill. Secondary: `vh` where the repo otherwise uses dynamic units (`style.css:21` `100dvh`, `PaperView.vue:464` `100dvw`). **Falsifier:** dies if the overlay is ≤56 px (it is not, on any inset device) or if `body { padding-bottom: env(safe-area-inset-bottom) }` (`style.css:25`) already covers it — it does not: the overlay's own padding **double-counts** SAI inside the already-inset box, so the overlap grows rather than shrinks. Exact rendered overlay height marked **UNPROVEN-NEEDS-LIVE (SS-13)**; the structural miss (no SAI term, no coupling to the overlay) is proven from source.

**m-6 · Proof blocks ship unstyled.**
Root = B-1. theme.css:206-212 — `border-left: 3px solid hsl(var(--border))` and `background: hsl(var(--card) / 0.6)` are both IACVT; only `margin`, `padding` and `border-radius` survive. The `\begin{proof}` environment — a first-class structure of the treatise, rendered through `PaperSectionBlocks.vue:157-212` under this component — becomes an indented block with no rule, no tint and no boundary. Only `.paper-proof-label { font-weight: 700; font-variant: small-caps }` (theme.css:214-218) still distinguishes it. **Falsifier:** as B-1.

**m-7 · Figure frames and the error placeholder are invisible.**
Root = B-1. `.paper-figure` and `.paper-portrait` both declare `border: 1px solid hsl(var(--border) / 0.5)` (theme.css:598-613) — both IACVT, both dropped. `.paper-figure`'s `background: white` survives, so light-mode plots keep a plate but lose their edge; `.paper-portrait` (the one figure at line 102's `'portrait'` branch) has **neither** background nor border, compounding M-3's white slab. `.paper-figure-placeholder` (theme.css:637-643) loses both its dashed border and its tint, leaving a zero-affordance 4:3 void. **Falsifier:** as B-1.

**m-8 · Callout text is the one authored string that bypasses the paper's renderer.**
`PaperArticleWindow.vue:111` — `{{ callout.text }}` (mustache interpolation), where every other authored string on this surface goes through `renderTitle`/`v-html` (`PaperSectionBlocks.vue:63,106,146`; `PaperSection.vue:30`). The two configured callouts (`web/vite.config.ts:10-19`) happen to be math-free — *"Upload an image and watch epicycles trace its contour"* — so nothing is broken **today**. But the config is prose-authored and un-typed against TeX; the first `$\mathcal{F}$` in a callout renders as literal source. An inconsistency in the render contract, filed now because the cost of fixing it later is a user-visible regression. **Falsifier:** dies if callouts are contractually plain text — nothing in `latexPaperPlugin`'s options or `PaperSectionData.callout` says so.

---

## §4 · INFO

**i-1 · The error state is silently discarded by the slot override.** latex-paper guards its default figure `<img>` with `@error="onImageError(filename)"` and a `failedImages` reactive set that swaps in `.paper-figure-placeholder` (`PaperSectionBlocks.vue:93-103, 133-143`). Supplying the `#figure` slot **replaces that whole branch** (`:129-132`), and the host's `<img>` (line 96-106) carries **no `@error`**. A 404 or decode failure therefore renders the browser's broken-image glyph plus raw-TeX alt text, in place of the designed placeholder. (Which, per m-7, is itself currently invisible — so the correct cure is both.) Cross-links M-2 and m-7.

**i-2 · `resolveFigure()` is called seven times per figure per render.** Lines 87, 88, 92, 93, 97, 99, 100 each re-invoke it; each call runs two regex `.replace()`s, a `Set.has`, and allocates a fresh object. Seven identical results discarded six times, for every figure in the mounted window, on every patch. A `v-for`-scoped `const f = resolveFigure(figure.filename)` (or a `computed` map) collapses it. Primarily a P-axis item; noted here because it sits inside the render path the window re-runs on every scroll tick.

**i-3 · The inline-arrow `:ref` defeats latex-paper's fast path — but loses no data.** `PaperArticleWindow.vue:73` — `:ref="(el) => bindSection(item.id, el)"` allocates a new function identity per item per render. I checked Vue's behaviour rather than assuming it: `@vue/runtime-core/dist/runtime-core.cjs.js:1799-1813` unsets only **string** and **Ref** old-refs — a **function** old-ref is never invoked with `null` — and `:1814-1816` then calls the new function with the element on every patch. So `measureSection` re-runs per mounted section per patch, taking the `current === el` branch (`useVirtualSectionWindow.ts:147-150`) and forcing a synchronous `offsetHeight` layout read each time. No height is lost. **This is the disciplined kill of a tempting "measurement corruption" finding** — the corruption claim is false; the forced-layout claim is true and minor. Note the author already knew the idiom: `bindRoot` is hoisted to a stable setup-scope function (line 27) and passed bare at line 63; only `bindSection` could not be, because it closes over `item.id`. A memoised per-id binder map is the fix.

**i-4 · No empty / loading / error state at the component level.** With `visibleItems: []` the component renders three empty `<div>`s and nothing else — no skeleton, no `aria-busy`, no message. In practice unreachable: `paperSections` comes from the build-time `virtual:paper-content` module (`web/src/lib/paperContent.ts:7`), so it is never absent or pending. Recorded for completeness of the state-coverage sweep, at INFO precisely because the tree proves it unreachable.

**i-5 · The substrate's own JS hook is unwired.** glass-ui's `.deferred-section` comment prescribes the `contentvisibilityautostatechange` pairing (`utilities/base.css:471-476`) and names fourier γ as the consumer it was written for. Neither this host nor `useVirtualSectionWindow` listens for it. It is the direct cure for **B-2** and is filed separately because it is also the general remedy for any future rAF-driven work inside these sections.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

**S-1 · Zero F.W1 break surface — the cleanest uplift posture of any component in the paper directory.**
The census break list is *removed subpaths in live use* (`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2), *removed dock members* (`DockIconButton` ×2, `DockDropdownTrigger` ×1) and *`ToastVariant` definition-absent → hard typecheck break* (`CENSUS-2026-08-03.md:102-105`, restated as the F.W1 cure list at `:184-186`). **This file imports none of them — it imports no glass-ui symbol at all.** Its three glass-ui *CSS* surfaces were each checked against the 7.0.0 producer tree and all three survive: `.deferred-section` is **byte-identical** (4.0.0 `utilities/base.css:477-480` → 7.0.0 `utilities/base-misc.css:174-177`, same two declarations, same `30rem` default; file moved, rule unchanged); `@utility cm-serif` and `@utility fourier-f` both survive (7.0.0 `typography/utilities.css:77,89`); `--border: var(--neutral-4)` keeps its shape (7.0.0 `tokens/color-radius.css:96`). **Falsifier:** dies if any consumed surface is renamed or removed at 7.0.0 — all four were grepped in the producer tree at `51cfdfaf`. *Corollary, and it cuts the other way:* because `--border` keeps its complete-colour shape at 7.0.0, **the tri-package uplift will not cure B-1** — see §6.

**S-2 · The CLS discipline is genuinely correct, and correct for a non-obvious reason.**
Lines 99-100 set `width`/`height` from `FIGURE_DIMENSIONS`, supplying the intrinsic aspect ratio; theme.css:624-627's `height: auto` keeps the presentational-hint from fixing the height and distorting the image; `max-width: 100%` + the inline `max-height` then resolve through the CSS 2.1 §10.4 min/max algorithm with the ratio preserved. The reserved box is right **before decode**. That matters more here than in ordinary markup: `useVirtualSectionWindow` builds its spacer math and scroll-offset corrections from `offsetHeight`, so an un-dimensioned image would not merely shift the page — it would corrupt the scroll model. `figureDimensions.ts:1-21` states exactly this reasoning. **Falsifier:** dies if the attributes were overridden by a CSS `height` (only `height: auto` exists) or if `FIGURE_DIMENSIONS` were incomplete for the corpus — all 25 `fNN_*.png` assets are keyed (`figureDimensions.ts:22-49` vs `ls assets/*.png`, exact 1:1 for the figure set).

**S-3 · `content-visibility: auto`, not `hidden` — and retuned by scoped token over global utility.**
Choosing the `auto` rung keeps the skipped subtree in the accessibility tree and reachable by find-in-page, where `.deferred-section--cached` (`content-visibility: hidden`) would remove it. The retune is done exactly right: the **global** utility supplies the recipe; the component sets only `--deferred-section-size` inside its **scoped** rule (line 167), so the substrate owns the mechanism and the host owns one number. This is the conformance idiom the design-system docs ask for, executed without a single override. **Falsifier:** dies if the scoped custom property failed to reach the global rule — it cannot; the property is set on the same element the global class matches. (That the *number* 1200 px then leaks through an unguarded measurement is B-2 — a defect of the measurement path, not of this retune.)

**S-4 · The `<picture>` fallback reasoning is correct and non-obvious, and it is documented.**
Lines 38-59 + 85-95: AVIF/WebP `<source>`s are emitted **only** for figures known to carry variants, because `<picture>` falls back on unsupported *format*, never on a *404*. Most authors learn this from a production incident. `hasModernVariants` is derived from the same map that supplies the dimensions (`figureDimensions.ts:52-57`), so the two can never drift. **Falsifier:** dies if `<picture>` did fall back on 404 (it does not) or if the variant set could diverge from the dimension set (it cannot — one `Set` built from the other's keys).

**S-5 · Where the component owns its own colours, contrast clears AA and AAA — in both schemes.**
Computed from glass-ui 4.0.0 tokens: the callout body copy (`text-muted-foreground` over the callout tint over `--card`) is **5.06 : 1** light / **5.91 : 1** dark; the button label (`--primary-foreground` on `--primary`) is **16.82 : 1** light / **7.15 : 1** dark (dark `--primary` is `oklch(0.739 0.134 318.1)` → sRGB ≈ `rgb(206 142 225)`). AA normal-text is cleared four times over; AAA on three of four. **Falsifier:** dies if the token values or the luminance arithmetic are wrong — values cited to line, ratios computed with the standard WCAG 2.x relative-luminance formula. *This is the counter-weight to M-7:* the component's **ink** choices are sound; only its **surface** choices are sub-threshold.

**S-6 · Reduced motion is covered — and the component's motion is the exact shape the substrate's blanket handles.**
The component declares no PRM guard, but it does not need one: glass-ui's `utilities/a11y-overrides.css:6-17` restricts `transition-property` under `prefers-reduced-motion: reduce` to `opacity, color, background-color, border-color, box-shadow` with `!important`, dropping `transform` entirely. The hover lift therefore **snaps** (no spatial motion) while the shadow still cross-fades — the nuanced behaviour the substrate is aiming for. **Falsifier:** dies if the component used `animation` rather than `transition` and escaped the property allow-list — it does not (`grep animation` in the scoped block → nothing); and the same block's `animation-duration: 0.01ms !important` would have caught it anyway. Credit is shared with the substrate; recorded because the component chose the transition shape that composes with it.

**S-7 · `<router-link>` for a navigation CTA.**
Line 112-119 uses a real `<router-link>` (→ `<a href>`), not a click-handled `<div>` or `<button>`. Middle-click, ⌘-click, open-in-new-tab, "copy link address" and the AT links list all work. Its own divergent twin does not: `GalleryCardModal.vue:184-186` uses `<Button … @click="emit('open-visualizer', …)">` for what is also a navigation. **Falsifier:** dies if the destination were not a route — `vite.config.ts:13,17` gives `link: "/visualize"` for both callouts, a router path.

---

## §6 · F.W1 tri-package uplift ledger (glass 4 → 7 ∧ keyframes 4.3 → 6 ∧ value 0.13 → 4.0)

Answering the standing ask: *which surfaces does the uplift break, and which does it improve?*

| surface consumed | at 4.0.0 | at 7.0.0 | uplift verdict |
|---|---|---|---|
| glass-ui **named imports** | none | none | **NEUTRAL — zero break.** Not on the census break list (`CENSUS:102-105`) in any of its four arms. |
| `.deferred-section` | `utilities/base.css:477-480` | `utilities/base-misc.css:174-177`, byte-identical | **NEUTRAL** |
| `@utility cm-serif` (line 111) | `typography/utilities.css:65` | `typography/utilities.css:77` | **NEUTRAL** |
| `@utility fourier-f` (lines 116, 208) | `typography/utilities.css:80` | `typography/utilities.css:89` | **NEUTRAL** |
| `--border` / `--muted` / `--primary` / `--primary-foreground` / `--ring` | complete colours | complete colours (`7.0.0 tokens/color-radius.css:96`) | **NEUTRAL — and therefore B-1 SURVIVES THE UPLIFT.** The tri-package bump does **not** cure the latex-paper token-shape collapse. B-1 needs its own remedy, on the fourier or latex-paper side. **This is the finding F.W1 planning most needs.** |
| `.callout-btn` (hand-rolled, M-4) | — | — | **DIVERGENCE WIDENS.** Its `GalleryCardModal` twin rides glass-ui `<Button>` and will inherit every 7.0.0 improvement — `btn-interactive`'s spring press cluster, `--focus-ring-shadow`, the coarse-pointer 44 px floor (`a11y-overrides.css:127-134`), the forced-colors `Highlight` outline rung (`:82-92`). The paper's hand-rolled pill inherits **none**. The two CTAs are visually divergent today (M-4); after F.W1 they diverge in *behaviour* as well. **Fold M-4's cure into F.W1, not after it.** |
| `@mkbabb/latex-paper` `^0.2.1` | — | — | **OUT OF SCOPE, IN SCOPE FOR B-1.** latex-paper is not in the tri-package transaction, so B-1 is not carried by F.W1 unless explicitly added. Its theme's shadcn-era triplet contract (`theme.css:1-9`) is incompatible with glass-ui's complete-colour tokens at **both** 4.0.0 and 7.0.0 — a **fourth** package the constellation has to reconcile. |

**Net:** this component is the *cheapest* file in `components/paper/` to carry through F.W1 (zero import churn, zero utility churn) and simultaneously the file that proves F.W1 **is not sufficient** — the largest defect on its surface is orthogonal to the version bump and would survive it untouched.

---

## §7 · Corpus fold, contradictions, and killed candidates

**Folded, not re-invented.** The hitherto corpus contains exactly **one** row on this component: `formation/fourier/lane-frontend.md:158` — `| components/paper/PaperArticleWindow.vue | 212 | Article viewport |`. LOC confirmed exact (212). The purpose gloss is accurate but under-describes it: this is not only the viewport, it is the **sole `<PaperSection>` / `<PaperSectionBlocks>` call site in the application**, which is why the whole latex-paper theme surface adjudicates here.

**Adjudicated intake rows cited:**
- **R4-9** (`lane-fourier-r3-r6.md:107`, TRUE / ADOPT-AS-FACT, *"the load-bearing row"*) — HEAD `cd26c653…` / tree `9a66411d…`. Independently re-derived at the top of this challenge: **exact match**. Every finding here is at the audited coordinate; nothing is stale-at-HEAD.
- **X-5** (`:156`) — 66 SFC. Consistent with the component inventory this challenge traversed.
- **R3-7a** (`:79`, CARRY-TO-WAVE → F.W3) — the `ui/tooltip` thin-adapter migration budget. Cited as the **precedent shape** for M-4's cure: the same "thin local skin over a glass-ui primitive" disposition, here applied to `.callout-btn`.

**Contradictions:** none. No adjudicated intake row and no census row touches `PaperArticleWindow.vue`'s rendered design, the latex-paper theme's token contract, the figure inversion heuristic, or the virtual-window measurement path. Every finding in §1-§4 is **net-new to the corpus**. The census's break-surface enumeration (`CENSUS:102-105`) is confirmed *complete for this file* — i.e. this challenge agrees with it and adds the observation that completeness of the *import* break surface does not imply the file is uplift-clean, because its worst defect is token-shaped and version-invariant.

**Candidates killed by their own falsifiers** (recorded so the discipline is auditable):

1. **"`<picture>` + `max-width: 100%` overflows the article column."** The classic percentage-against-an-inline-parent trap. Killed: theme.css:615-622 makes `figure` a `display: flex; flex-direction: column; align-items: center` container, so `<picture>` is blockified as a flex item and its cross size resolves to `fit-content` clamped by the 688 px inner width; the `<img>`'s `max-width: 100%` then resolves against a definite 688 px. No overflow. Not filed.
2. **"The `ArrowRight` icon needs `aria-hidden`."** Killed: `lucide-vue-next/dist/cjs/lucide-vue-next.js:76` spreads `{ "aria-hidden": "true" }` whenever no a11y prop and no default slot are given. Not filed — and its absence is what makes m-3 (the untreated ℱ) the sole naming pollutant.
3. **"The inline `:ref` arrow drops measured heights and corrupts the spacer math."** Killed by reading Vue rather than assuming it: `runtime-core.cjs.js:1799-1813` never invokes a **function** old-ref with `null`, and `disconnectSection` (`useVirtualSectionWindow.ts:136-138`) would not clear `measuredHeights` even if it did. Downgraded to **i-3** (a forced layout read per patch) — the true, smaller claim.

**UNPROVEN-NEEDS-LIVE register (SS-13)** — three items, none load-bearing on any severity:
- **B-2**, the ~450 px engine relevance margin for `content-visibility: auto`. The `warmTargetAfter: 3` arm proves B-2 without it.
- **m-4**, the emitted CSS order between `style.css` and the SFC scoped block. The finding is a proven disjunction (dead code ∨ visible radius pop) either way.
- **m-5**, the rendered pixel height of `.paper-bottom-overlay` on a notched device. The structural miss — no `env(safe-area-inset-bottom)` term, no coupling to the overlay — is proven from source.
