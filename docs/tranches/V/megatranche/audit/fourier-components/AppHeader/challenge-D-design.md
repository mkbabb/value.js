claude-opus-5[1m]

# CHALLENGE — `AppHeader.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/layout/AppHeader.vue` (354 lines)
**Date** 2026-08-04 · **Pin** `@mkbabb/glass-ui@^4.0.0` installed (`web/package.json:13`), producer latest **7.0.0**
**Method** static + source-derived only. No browser. Contrast computed from resolved token values by hand (WCAG 2.x relative-luminance); every such number carries its arithmetic. Livable-only claims marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** component assumed DEFECTIVE until the tree proves otherwise. Every claim carries its own falsifier; superlatives carry theirs too (L-18 runs both ways).

**Read whole (read-only):** the target; `layout/DarkModeToggle.vue`; `visualization/gallery/UserSlugBar.vue`; `App.vue`; `router/index.ts`; `src/style.css`; `index.html`; `public/fonts.css`; `stores/workspace.ts` (head); `stores/gallery.ts` (adminMode); and the installed `@mkbabb/glass-ui@4.0.0` surface — `dist/button-BNDWhAZb.js`, `dist/menuItemVariants-DWRQXBxJ.js`, `dist/dropdown-menu-BJ7E9js_.js`, `dist/HoverCardContent-DkMaQzH5.js`, `dist/components/ui/hover-card/*.d.ts`, `dist/styles/{tokens,theme,typography,utilities,menu,fonts}/**`; plus `reka-ui/dist/HoverCard/{HoverCardTrigger.js,utils.js}` and producer `glass-ui@7.0.0` `package.json` + `src/components/popover/*`.

**Tally** 26 defects (4 BLOCKER · 9 MAJOR · 8 MINOR · 5 INFO) · 6 superlatives.

---

## 0. Corpus fold (hitherto — cited, not re-derived)

| Corpus row | Where it lands here |
|---|---|
| `lane-frontend.md:176` — AppHeader 354 LOC, "nav `DropdownMenu` + `HoverCard` + `Button`" | Inventory confirmed verbatim. |
| `lane-frontend.md:473` — **`./hover-card` removed**, 2 imports, one of them `AppHeader.vue:20`; folds at 5.0.0 `BI.W-OVERLAY-UNION` → `<Popover>` | §5 **U-1**. This lane ADDS the substantive part the census row does not carry: the replacement's `trigger` default is `"click"`, so the naive swap silently changes the interaction AND collides with the logo's own click handler. |
| `CENSUS-2026-08-03.md:102-104` — the uplift break surface (`metric-badge` ×7, `hover-card`/`-popover` ×4, dock members ×3, `ToastVariant`) | AppHeader touches exactly ONE row of that surface (`hover-card`); `metric-badge` / `hover-popover` / dock members / `ToastVariant` are **absent** from this component. Recorded as a negative in §5 so F.W1 does not budget them here. `ToastVariant` reaches the header only *transitively* via `UserSlugBar.vue:7` → `useToast.ts:3`. |
| `lane-frontend.md:619` — the 8 `prefers-reduced-motion: reduce` blocks; `layout/DarkModeToggle.vue:104` is one, **AppHeader is not** | §3 **S-5** — and the absence is CORRECT, not a defect. Falsified my own first hypothesis: glass-ui 4 ships a library-wide PRM kill (`utilities/a11y-overrides.css:6-16`) that reaches AppHeader's unlayered transitions through `!important`. Claim withdrawn before it was made; the verification is recorded as a superlative. |
| `lane-frontend.md:419-421` — DarkModeToggle is a SHADOW of 7.0.0's `./dark-mode-toggle`; "keep, but reconcile" | §5 **U-3**. AppHeader is the sole mount site and the sole owner of `--toggle-size`, so the reconciliation lands here. |
| `lane-frontend.md:602` — style.css entry contents incl. the `--viz-amber` WCAG darken to ≈4.6:1 and the `:focus-visible` ring block that names **`AppHeader.vue:174-177` as "the only pre-W4 conformant site"** | §3 **S-3** (superlative — the header set the app-wide pattern) and §2 D-B3 (the *other* amber-family token, `--tier-featured`, got no such darken). |
| intake `lane-fourier-r3-r6.md` **R3-10** — six live dynamic `:is` families; the registry carries four, two of which are **`AppHeader:117`** and **`AppHeader:130`** | Both re-verified live at `:117` `<component :is="activeTabData.icon" …>` and `:130` `<component :is="tab.icon" …>`. **No contradiction.** Design consequence recorded at D-M9 (the `:117` instance is the sole site where the amber icon overrides the trigger's hover color). |

**Contradictions with the corpus: none.** Everything below is either a fresh find or a sharpening of a cited row.

---

## 1. Aristotelian reading — what the component is *for*, and whether its proportions serve it

A masthead does three things: it *names* the work, it *locates* you inside it, and it *offers* the two or three actions that outrank the page. AppHeader attempts all three. Its failures cluster with unusual precision at the first two:

- The **name** is rendered in two typefaces, neither of which is the one the app vendors and preloads (D-B2).
- The **location** indicator has no visible text at any viewport (D-B1) and reports the wrong section on the app's saved-visualization route (D-B4).
- The **actions** are the only limb that works — and even there the sole state affordance (admin) is a gold glyph at 1.5:1 (D-B3).

The proportional system is the second story. The header mixes five gap values (0.25 / 0.375 / 0.5 / 0.625 / 1 rem) and three radii (0.4375 / 0.5 / 9999 rem-px), of which two radii are off every rung glass-ui ships. Worse, the responsive rhythm is *inverted*: the mobile header computes taller than the desktop header, and the desktop header shrinks 12.5% at a breakpoint the header does not itself declare (D-m3). Aristotle's mean is not a midpoint — it is the size *appropriate to the thing*. A masthead that grows as the viewport shrinks has lost the relation.

---

## 2. Findings

### BLOCKER

---

**D-B1 — The primary navigation control has no visible text label. At any viewport. Ever.**
`AppHeader.vue:118` renders `<span class="nav-trigger-label">{{ activeTabData.label }}</span>`. `AppHeader.vue:201-204` declares:

```css
.nav-trigger-label {
    display: none;
    color: var(--viz-amber);
}
```

There is no second declaration. The `@media (min-width: 640px)` block at `:218-222` touches only `.nav-trigger`; the one at `:245-258` touches only `.logo-mark` / `.logo-text` / `.header-divider` / `.dark-mode-toggle`. The author plainly intended the mobile→desktop reveal that `.logo-text` receives at `:249-251` (`display: inline`) — the `color: var(--viz-amber)` on a permanently-hidden span is the fingerprint of the missing twin.

Net effect: the app's only navigation control is a 24px amber glyph plus a chevron, with the section name — the single most useful word in the header — suppressed. `activeTabData.label` is computed (`:43`), bound (`:118`), and discarded.

*Provenance*: `AppHeader.vue:118`, `:201-204`, `:218-222`, `:245-258`.
*Falsifier*: a `.nav-trigger-label` rule elsewhere restoring `display`. Refuted by enumeration — `grep -rn "nav-trigger-label" web/src/` returns exactly two lines, `:118` (template) and `:201` (the sole rule). A global (unscoped) rule could not win regardless: Vue's scoped compiler emits `.nav-trigger-label[data-v-…]` at 0-2-0 against a bare class's 0-1-0.
*Severity rationale*: BLOCKER. Not a polish item — the component's stated job (tell the user where they are) is unperformed in 100% of sessions.

---

**D-B2 — The masthead does not render in the brand face, and its two halves render in two unrelated fallback faces.**
`AppHeader.vue:67-69`:

```html
<span class="logo-mark cm-serif font-semibold tracking-tight …">
    <span class="fourier-f">&#x2131;</span><span class="logo-text">ourier analysis</span>
</span>
```

Three independent resolutions, each verified to its declaration site:

1. **`.cm-serif` → generic `serif`.** `glass-ui/dist/styles/typography/utilities.css:65-67` defines `@utility cm-serif { font-family: var(--font-serif-math, serif); }`. `--font-serif-math` is defined **nowhere** — `grep -rn "font-serif-math" web/src/ web/index.html glass-ui/dist/styles/` returns exactly one line, the consumption at `utilities.css:66`. So "ourier analysis" resolves to the OS generic serif (Times New Roman / Times), not Computer Modern.

2. **`.fourier-f` → a font that cannot render the glyph.** `utilities.css:77-85` defines `@utility fourier-f { font-family: var(--font-display); font-style: italic; font-size: 1.35em; font-weight: 700; … }`. `theme/bridges.css:67` binds `--font-display: var(--font-stack-display)`; `tokens/scheme-motion.css:44` binds `--font-stack-display: var(--font-stack-text)`; `:43` resolves that to `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif` — **a sans**. And both Plus Jakarta `@font-face` blocks in `glass-ui/dist/styles/fonts.css` carry a `unicode-range` that **excludes U+2131** (block A: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`; block B: `U+0100-02BA, … U+2113, U+2C60-2C7F, U+A720-A7FF` — note `U+2113` and `U+2122` are in range, `U+2131` is not). The browser therefore never downloads or uses PJS for this character; it falls through to `"Plus Jakarta Sans Fallback"` → `system-ui` → `sans-serif`. Both PJS faces also declare `font-style: normal` only, so `font-style: italic` at `utilities.css:79` is a **synthetic oblique**, and `font-weight: 700` on a last-resort fallback is a **synthetic bold**.

3. **Computer Modern is vendored, preloaded — and orphaned.** `public/fonts.css:14-40` declares four real `@font-face` rules for `"Computer Modern Serif"` (regular/bold/italic/bold-italic, url-backed). `index.html:12-14` `<link rel="preload">`s three of them on **every route**. `src/style.css:13-15` binds them to `--font-sans`. `grep -rn "font-sans" web/src/` returns exactly two lines — both inside `style.css` itself (the comment at `:6` and the declaration at `:14`). **Zero DOM consumers.** Three woff files are fetched with `rel=preload` priority on every page load for a family nothing renders.

Consequence: the word "Fourier" is split mid-word across a synthetically-obliqued fallback sans and a generic serif, in an app whose entire visual thesis is the typeset paper.

*Provenance*: `AppHeader.vue:67-69`; `glass-ui/dist/styles/typography/utilities.css:65-67`, `:77-85`; `theme/bridges.css:67-68`; `tokens/scheme-motion.css:43-44`; `glass-ui/dist/styles/fonts.css` (PJS `unicode-range`); `web/public/fonts.css:14-40`; `web/index.html:12-14`; `web/src/style.css:6,13-15`.
*Falsifier* (three, all must fail): (a) a `--font-serif-math` declaration anywhere — refuted by whole-tree grep; (b) U+2131 inside a PJS `unicode-range` — refuted by direct enumeration of both ranges above; (c) any `font-sans` application site — refuted by grep. The one thing NOT statically decidable is which concrete face the OS supplies for U+2131 (macOS will find one via Apple Symbols; Windows/Android may render tofu) — that specific rendering is **UNPROVEN-NEEDS-LIVE (SS-13)**; the resolution chain above is not.
*Severity rationale*: BLOCKER. The masthead is the highest-leverage typographic surface in the product and it is mis-resolved in all three of its font bindings, while the correct faces sit vendored and preloaded.

---

**D-B3 — Admin badge: ~1.52:1 in light mode (WCAG 1.4.11 floor is 3:1), and no accessible name.**
`AppHeader.vue:137-139` / `:261-271`:

```html
<div v-if="galleryStore.adminMode" class="admin-badge" title="Admin mode active">
    <Shield :size="14" />
</div>
```
```css
.admin-badge {
    background: color-mix(in srgb, var(--tier-featured) 10%, transparent);
    color: var(--tier-featured);
}
```

`glass-ui/dist/styles/tokens/color-radius.css:270` — light `--tier-featured: oklch(0.841 0.173 84.2)`. Converted (OKLCH→OKLab→LMS³→XYZ D65→linear sRGB, R clipped at 1.0): **≈ rgb(255, 191, 0)**, Y = 0.5868.
`tokens/color-radius.css:57` + `:40` — `--background: var(--neutral-0) = hsl(40 30% 98%)` = rgb(251, 250, 248), Y = 0.9566.
Badge plate = 10% tier-featured over that = rgb(251, 244, 223), Y = 0.9208.

**Contrast(glyph, plate) = (0.9208 + 0.05) / (0.5868 + 0.05) = 0.9708 / 0.6368 = 1.524 : 1.**
(Against the bare page it is 1.581:1 — no better.)

The Shield is a **graphical object required to understand content** (it is the *only* signal that destructive admin affordances are live). WCAG 2.2 SC 1.4.11 requires ≥3:1. It clears 51% of the requirement. Separately, the icon has no accessible name: `title` on a non-interactive `<div>` is not a reliable accname source, `lucide-vue-next` emits a bare `<svg>` with no `<title>` and no `aria-hidden`, and there is no `role="img"` + `aria-label`.

This is the more damning half: `src/style.css:113-127` shows the team already ran exactly this analysis for the sibling amber token (`--viz-amber` darkened `hsl(35 70% 42%)` → `hsl(35 76% 35%)` "≈ 4.6:1 (clears AA)"). `--tier-featured` sits in the same hue neighbourhood, is used the same way, and got no such treatment.

*Provenance*: `AppHeader.vue:137-139`, `:261-271`; `glass-ui/dist/styles/tokens/color-radius.css:270`, `:57`, `:40`; `web/src/style.css:113-127` (the precedent).
*Falsifier*: a darker light-mode `--tier-featured` override in fourier. Refuted — `grep -rn "tier-featured" web/src/` returns nothing; the only fourier token override in `style.css:119-127` is `--viz-amber` / `--section-color-5`. Second falsifier: the dark arm. It passes comfortably (`tokens/dark-arm.css:141`, light glyph on `hsl(24 9% 4%)` page) — **this is a light-mode-only failure**, which is why a dark-mode-only review would miss it.
*Severity rationale*: BLOCKER. A privilege indicator that is invisible in the default theme is worse than absent — it manufactures false confidence that the state is being communicated.

---

**D-B4 — The current-section indicator lies on the saved-visualization route, because it matches a prefix that can never be the settled path and misses the one that can.**
`AppHeader.vue:34-41`:

```ts
if (route.path === "/visualize" || route.path.startsWith("/s/") || route.path.startsWith("/w/")) return "/visualize";
…
return "/paper";   // ← the catch-all
```

The router (`web/src/router/index.ts`) declares:
- `:58` `path: "/v/:visualizationSlug"`, `name: "visualization"` — a **terminal** route rendering `VisualizationView.vue`. **Not matched by any branch of `activeTab`.**
- `:117-118` `path: "/s/:slug"`, `redirect: (to) => \`/w/${to.params.slug}\`` — a **redirect-only** route. `route.path` can never settle on `/s/…`; by the time any component reads `useRoute()`, the redirect has resolved to `/w/…`. **The `startsWith("/s/")` test at `:36` is dead code.**
- `:112` `path: "/demo/shape-extractor"` — also unmatched.

So on `/v/<slug>` — the canonical address of a *saved* visualization, and the destination of every share link — the header falls to `return "/paper"` and displays the Paper icon as the current section. Same on `/demo/shape-extractor`. There is no catch-all route, so unknown paths render the header claiming "Paper" over a blank `<main>`.

The `/s/` → `/w/` rename is dated in-tree: `router/index.ts:53-57` carries the `B.W4 — one slug per noun (CRUD-CONTRACT §1)` comment introducing `/v/`. AppHeader was never migrated.

*Provenance*: `AppHeader.vue:34-41` (esp. `:36`, `:40`); `web/src/router/index.ts:53-57`, `:58-59`, `:112-114`, `:117-118`.
*Falsifier*: a navigation guard rewriting `/v/…` to `/w/…` before the header reads it. Refuted — the only guards are `beforeResolve` (`:131`, view-transition bracketing, returns `undefined`) and `afterEach` (`:165`, title/meta). Neither rewrites. Second falsifier: `/v/` being unreachable in practice — refuted by `router/index.ts:5` and `VisualizationView.vue:303`, which both document `/w/`↔`/v/` as a live swap pair.
*Severity rationale*: BLOCKER on the design axis. The current-state affordance is the header's reason to exist; on a first-class, share-linkable route it reports a false answer with full confidence.

---

### MAJOR

---

**D-M2 — Wrong z-rung, via an escape hatch, when the named rung exists.**
`AppHeader.vue:54` — `class="… z-[var(--z-overlay)] …"`.

`glass-ui/dist/styles/tokens/scheme-motion.css:333-350` publishes the registry: `--z-bar: 30`, **`--z-header: 35`**, `--z-dock: 40`, `--z-panel: 45`, `--z-overlay: 50`. `theme/bridges.css:231-244` bridges every rung into the Tailwind `--z-index-*` namespace under the literal heading `Z-index → z-* utilities`, including `:238 --z-index-header: var(--z-header);` — so `class="z-header"` is a real, mintable utility. Sibling rungs are already generated in glass-ui's own build (`dist/styles/components.css`: `.z-dock`, `.z-hovercard`, `.z-modal`, `.z-overlay`, `.z-popover`, `.z-toast`, `.z-tooltip`).

AppHeader takes neither the correct rung nor the named syntax. It claims 50 — the **overlay/scrim** rung — tying with three live fourier surfaces: `PaperView.vue:477` `.paper-progress-track` (`position: sticky; z-index: var(--z-overlay)`), `PaperView.vue:505` `.teleport-overlay` (`position: fixed; inset: 0; z-index: var(--z-overlay)`), and `VisualizationView.vue:146` (`z-[var(--z-overlay)]`, the full-viewport drag scrim). At an equal z-index the outcome is decided by DOM order alone; all three render inside `<RouterView>`, i.e. after `<AppHeader>` (App.vue:25-28), so **every one of them wins the tie**. A header whose stacking outcome is an accident of tree order has no stacking contract.

*Provenance*: `AppHeader.vue:54`; `glass-ui/dist/styles/tokens/scheme-motion.css:333-350`; `theme/bridges.css:231-244` (esp. `:238`); `dist/styles/components.css` (generated `.z-*` rungs); `PaperView.vue:477`, `:505`; `VisualizationView.vue:146`.
*Falsifier*: `--z-header` not existing at this pin, or the bridge living outside `@theme` (which would not mint a utility). Both refuted — the token is at `scheme-motion.css:338` and the bridge is inside the `@theme inline` block opened at `bridges.css:12`. Third falsifier: 50 being *deliberate* to sit above the dock — refuted by the tie, which 35 would not produce and which no comment claims.

---

**D-M1 — `sticky` + the overlay z-rung + `backdrop-blur` are all inert: nothing ever scrolls beneath this header.**
`AppHeader.vue:54`:

```html
<header class="app-header sticky top-0 z-[var(--z-overlay)] bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
```

`App.vue:24-28`:

```html
<div class="h-dvh flex flex-col … overflow-hidden">
    <AppHeader />
    <main class="flex-1 min-h-0 flex flex-col overflow-y-auto">
```

The header's nearest scroll container is the `h-dvh … overflow-hidden` div. That div is exactly viewport-height and cannot scroll; `<main>` is the scroller and is the header's *sibling*, not its ancestor. `position: sticky` only engages when its scrollport scrolls — this one never does. The header is simply the first row of a fixed-height flex column.

Every affordance layered on top of that premise is therefore doing no work:
- `sticky top-0` — a no-op.
- `z-[var(--z-overlay)]` — nothing to stack against in normal flow (the ties at D-M2 come from `position: fixed` siblings that escape the column, so the wrong rung still bites; it just bites for a different reason than the author intended).
- `bg-background/90` / `supports-[backdrop-filter]:bg-background/60` + `backdrop-blur-md` — translucency exists so content can be *read through* as it passes under. Nothing passes under. What actually gets blurred is the parent's static `paper-texture` (`App.vue:24`, recipe at `glass-ui/dist/styles/cards.css:10`) — a per-frame `backdrop-filter` compositing pass over an unmoving texture.

*Provenance*: `AppHeader.vue:54`; `App.vue:24-28`; `glass-ui/dist/styles/cards.css:10`.
*Falsifier*: a second mount site where AppHeader sits inside a real scroller. Refuted — `grep -rn "AppHeader" web/src/` returns only the `App.vue:6` import and the `App.vue:25` usage. Second falsifier: `overflow-hidden` not creating the scrollport — irrelevant either way; an `overflow-hidden` box *is* a scroll container, it simply never scrolls, and if it were not one, the next ancestor is the never-scrolling document root.
*Note*: the visual result (a 60% scrim over the paper texture) is not itself ugly. The finding is that four coupled declarations encode a scroll-aware design contract the layout cannot honour, and one of them (`backdrop-filter`) charges GPU rent for it.

---

**D-M3 — The menu-item override re-introduces the exact cascade trap glass-ui documents in prose.**
`glass-ui/dist/styles/menu.css:7-21` (verbatim, the file's own header):

> **── The cascade-trap pre-empt (the AZ dock-rail `@layer`-loses-to-utility trap) ──**
> `.interactive-item:hover` (utilities/base.css, `@layer components`) paints a flat `color-mix(--accent 50%)` hover background. An **UNLAYERED** Tailwind `hover:bg-accent` utility would win over BOTH (the trap). The CVA's glass arm therefore DROPS the flat-accent utilities entirely […] **NEVER re-add an unlayered flat-accent utility to the glass arm — it would re-introduce the trap.**

`dist/menuItemVariants-DWRQXBxJ.js` confirms the arm: base `"interactive-item relative flex w-full cursor-default select-none items-center text-dropdown outline-none …"`, `variants.surface.glass: "glass-menu-row"`, `defaultVariants: { surface: "glass", indicator: "none" /* px-2 */, density: "comfortable" /* py-1.5 */ }`. `DropdownMenuItem` takes that default; AppHeader passes no `surface`.

`AppHeader.vue:317-338` then declares, in the component's **unscoped** `<style>` block (no `@layer`):

```css
.nav-dropdown-item { padding: .5rem .75rem; border-radius: .5rem; background: none;
    color: color-mix(in srgb, var(--foreground) 60%, transparent);
    font-family: var(--font-serif); font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: background .12s ease, color .12s ease; outline: none; }
.nav-dropdown-item:hover,
.nav-dropdown-item[data-highlighted] { background: color-mix(in srgb, var(--foreground) 6%, transparent); … }
```

Unlayered declarations beat every `@layer` (CSS Cascade 5 §6.4.4) regardless of specificity. So this block overrides, in one stroke: `.glass-menu-row`'s glass hover plate (the trap, verbatim — a flat foreground wash over the library's oklab-tinted glass), `px-2 py-1.5` (the `indicator`/`density` rungs), `text-dropdown` (the menu typography rung, `bridges.css:30`), and `cursor-default`. The component does not extend the design system; it replaces it and takes the documented trap with it.

Compounding: `font-family: var(--font-serif)` (`:326`) resolves via `bridges.css:68` → `--font-stack-text` → **`"Plus Jakarta Sans", …, sans-serif`**. The declaration's *name* says serif; its *value* is a sans. The menu therefore renders in a different face from the masthead it hangs under (D-B2) — two unrelated fallback voices in one header.

*Provenance*: `AppHeader.vue:305`(unscoped block opens), `:317-338`, `:326`; `glass-ui/dist/styles/menu.css:7-21`; `dist/menuItemVariants-DWRQXBxJ.js`; `theme/bridges.css:30`, `:68`; `tokens/scheme-motion.css:43`.
*Falsifier*: the block being layered after all (Vue would have to emit `@layer` — it does not; SFC `<style>` content is injected verbatim, and `@reference "tailwindcss"` at `:148` is a compile-time no-emit directive that appears only in the *scoped* block anyway). Second falsifier: `DropdownMenuItem` not composing `glass-menu-row` at 4.0.0 — refuted by `menuItemVariants-DWRQXBxJ.js:11`.
*Legitimate part*: portaled content genuinely cannot be reached by scoped styles (reka teleports `DropdownMenuContent` to `<body>`), so an unscoped block is the right *mechanism*. The defect is its content, not its existence — see S-6.

---

**D-M4 — WCAG 2.5.3 Label in Name: the visible label and the accessible name share zero words.**
`AppHeader.vue:59-69` — `role="button"` + `aria-label="Go to paper"` on the wrapper; visible text inside is `ℱourier analysis`. The `aria-label` overrides the content, so a speech-input user saying the words they can see ("Fourier analysis") cannot activate the control. SC 2.5.3 requires the accessible name to *contain* the visible label text; the overlap here is empty. At <640px `.logo-text` is `display: none` (`:229-231`) so the visible label degrades further, to a single glyph.

The correct shape is to keep the visible text as the name and add the destination as supplementary (`aria-label="Fourier analysis — go to paper"` or a plain `<RouterLink>` whose text *is* the name).

*Provenance*: `AppHeader.vue:59-69`, `:229-231`, `:246-251`.
*Falsifier*: the element not being a UI component with a visible text label. Refuted — `role="button"` + `tabindex="0"` makes it exactly that, and the text is inside it.

---

**D-M5 — `role="button"` handles Enter but not Space; Space scrolls the page instead.**
`AppHeader.vue:59-66`:

```html
<div class="logo-trigger …" role="button" tabindex="0"
     aria-label="Go to paper"
     @click.stop="router.push('/paper')"
     @keydown.enter="router.push('/paper')">
```

The ARIA `button` role contract (and native `<button>` behaviour) requires activation on **both** Enter and Space. Only `.enter` is bound. A keyboard user who focuses the logo and presses Space gets the default action for Space on a non-form element — the document scrolls. There is also no `.prevent`, so even the Enter path leaves the default unsuppressed.

This is hand-rolling a native element badly: the entire block reduces to `<RouterLink to="/paper">`, which supplies role, keyboard contract, focus, right-click/middle-click, and a real `href` for free.

*Provenance*: `AppHeader.vue:59-66`.
*Falsifier*: a Space handler on an ancestor, or `HoverCardTrigger` supplying one. Refuted — `reka-ui/dist/HoverCard/HoverCardTrigger.js` binds only `onPointerenter`/`onPointerleave`/`onFocus`/`onBlur`, and no ancestor in `App.vue` binds keys.

---

**D-M6 — The nav trigger misses glass-ui's own coarse-pointer touch floor, by omitting one prop.**
`glass-ui/dist/styles/utilities/a11y-overrides.css:115-122`:

```css
@media (pointer: coarse) {
    [data-size="icon"], .expandable-container__trigger, .segmented-tabs__trigger {
        min-block-size: var(--touch-target, 2.75rem);
        min-inline-size: var(--touch-target, 2.75rem);
    }
}
```

`--touch-target: 2.75rem /* 44px */` (`tokens/offsets-sizing.css:461`), documented at `:454-460` as "canonical WCAG 2.5.5 (44px) touch-target floor". `Button` emits `data-size` from its `size` prop (`dist/button-BNDWhAZb.js`, `"data-size": r.size`). `AppHeader.vue:112-116` passes **no `size`** → the attribute is absent → the floor never matches.

Measured box, from the component's own declarations: `.nav-trigger { padding: 0.25rem }` (`:174`) + `.nav-trigger-icon { height: 1.5rem }` (`:194-195`) = `2rem`. Root font-size is `1.125rem` below 768px (`style.css:40-43`), so **2rem = 36px** block-size — 82% of the 44px floor. The logo trigger (`:59-70`) has no min-dimension at all.

Note the asymmetry that proves the mechanism works when used: the two `size="icon"` Buttons in `UserSlugBar.vue:91-111` *do* receive `data-size="icon"` and *are* lifted to 44px on touch — inside a `py-0.5` pill in the same header row. Whether that lift distorts the pill's geometry is **UNPROVEN-NEEDS-LIVE (SS-13)**; the nav trigger's exemption is not.

*Provenance*: `AppHeader.vue:112-116`, `:174`, `:193-199`, `:59-70`; `glass-ui/dist/styles/utilities/a11y-overrides.css:115-122`; `tokens/offsets-sizing.css:454-461`; `dist/button-BNDWhAZb.js`; `web/src/style.css:40-43`; `UserSlugBar.vue:91-111`.
*Falsifier*: a scoped `min-height` on `.nav-trigger`. Refuted — `:170-182` declares display/align/gap/padding/radius/border/background/color/cursor/transition/tap-highlight and no sizing floor. Second falsifier: `--ui-scale` lifting the icon on coarse pointers — refuted, because `.nav-trigger-icon` hardcodes `1.5rem` rather than reading `--ui-glyph` (`= calc(1rem * var(--ui-scale))`, `offsets-sizing.css:177`), which is a second-order conformance defect in its own right: the header opts *out* of the library's coarse-pointer comfort axis.

---

**D-M7 — The attribution card and both external links are unreachable on touch, and the same tap navigates away.**
`reka-ui/dist/HoverCard/utils.js`:

```js
function excludeTouch(eventHandler) {
    return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
}
```

`reka-ui/dist/HoverCard/HoverCardTrigger.js` wraps **both** `onPointerenter` and `onPointerleave` in `excludeTouch`. glass-ui 4's `HoverCard` is a bare pass-through of reka (`dist/components/ui/hover-card/HoverCard.vue.d.ts` types the props as `HoverCardRootProps`, nothing else). So on a touch device the card never opens by pointer, and the two links inside it — the maintainer profile (`AppHeader.vue:87-93`) and the project repository (`:98-104`) — have no other entry point in the app.

Worse, the trigger's *own* tap fires `@click.stop="router.push('/paper')"` (`:64`). If the tap also focuses the `tabindex="0"` div (Chrome Android does; iOS Safari generally does not for non-form elements — **UNPROVEN-NEEDS-LIVE, SS-13**), `onFocus` opens the card into a route change that immediately unmounts it. Either way, touch users get navigation, never attribution.

*Provenance*: `AppHeader.vue:57-106` (esp. `:64`, `:87-93`, `:98-104`); `reka-ui/dist/HoverCard/utils.js`; `reka-ui/dist/HoverCard/HoverCardTrigger.js`; `glass-ui/dist/components/ui/hover-card/HoverCard.vue.d.ts`.
*Falsifier*: the links existing elsewhere in the app. Not refuted for the repo link in general, but refuted **for the header** — this component offers no other path. Second falsifier: keyboard users being equally locked out — **refuted, deliberately**: `HoverCardTrigger` binds a raw `onFocus` (not touch-excluded) and `HoverCardContentImpl.js` runs `getTabbableNodes` + `DismissableLayer` to fold the content into the tab sequence. Keyboard access works. The gap is touch-specific, which is why it survives desktop review.
*Uplift note*: this is the one place the F.W1 uplift **improves** matters — see §5 U-1.

---

**D-M8 — No navigation landmark, no `aria-current`, no skip link.**
Three related omissions in the app's primary navigation region:

1. **No `<nav>`.** `AppHeader.vue:53-144` is `<header>` → `<div class="header-inner">` → controls. `<header>` correctly maps to `role="banner"` here (it is not nested in `article`/`aside`/`main`/`nav`/`section` — `App.vue:24` is a plain `div`), but the navigation itself has no landmark. The codebase knows the pattern: `PaperSidebar.vue:50` is `<nav … aria-label="Table of contents">`. AppHeader is the outlier.
2. **No `aria-current`.** The active item is signalled only by `color: var(--viz-amber)` + an 8% tint (`:340-343`) — a colour-only distinction (WCAG 1.4.1) and inaudible to assistive tech. `aria-current="page"` on the matching `DropdownMenuItem` is the one-attribute fix.
3. **No skip link.** A sticky-looking header with five focusable controls precedes `<main>` on every route. `App.vue:26` already provides the target element; `grep -rn "skip" web/src/ web/index.html` returns nothing.

*Provenance*: `AppHeader.vue:53-144`, `:123-132`, `:340-343`; `App.vue:24-28`; `PaperSidebar.vue:50`.
*Falsifier*: `role="menu"`/`menuitem` making `aria-current` inapplicable. Partly true — APG's Navigation Menu Button pattern does use `menuitem` — but the pattern's own guidance is to mark the current page, and nothing prevents it. The `<nav>` and skip-link legs stand unqualified.

---

**D-M9 — The nav trigger's hover state is very nearly invisible, because its two coloured children opt out of it.**
`AppHeader.vue:184-186` — `.nav-trigger:hover { color: color-mix(in srgb, var(--foreground) 70%, transparent); }`.

But `.nav-trigger-icon` sets `color: var(--viz-amber)` (`:197`) and `.nav-trigger-label` sets `color: var(--viz-amber)` (`:203`, and is `display: none` anyway per D-B1). The only descendant that inherits `currentColor` is `.nav-trigger-chevron` — a 1rem lucide glyph already held at `opacity: 0.5` (`:209`). So the entire hover affordance on the header's principal control is: one 16-18px chevron moving from effective alpha 0.50 to effective alpha 0.35.

Compounding, `background: none` at `:177` is unlayered and therefore kills the glass-ui `ghost` variant's own hover plate (`dist/button-BNDWhAZb.js`: `ghost: "bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12 …"`), which would have supplied a legible 8%-foreground wash for free.

*Provenance*: `AppHeader.vue:170-186`, `:193-204`, `:206-212`; `dist/button-BNDWhAZb.js` (ghost arm).
*Falsifier*: the `filter: drop-shadow(… --viz-amber 40% …)` at `:198` changing on hover. Refuted — it is declared once on `.nav-trigger-icon` with no hover variant. Second falsifier: `active:` states covering it — the base CVA's `active:scale-(--scale-press-btn)` does survive (scale is not overridden), so *press* feedback exists; *hover* is the gap.

---

### MINOR

---

**D-m1 — 24 lines of dead CSS (7% of the file), one block of which references a token that does not exist at this pin.**
`AppHeader.vue:278-301` declares `.share-pop-{enter,leave}-{active,from,to}` and `.fade-{enter,leave}-{active,from,to}`. The template (`:53-145`) contains **no `<Transition>` element at all** — `grep -n "Transition" AppHeader.vue` returns nothing. There is no share button either; the comment at `:278` ("Share button enter/leave") documents a feature that has left the component.

Additionally `:280` reads `transition: opacity .25s var(--ease-standard), transform .3s var(--ease-apple-spring);`. `--ease-apple-spring` is **not defined at glass-ui 4.0.0** — `grep -rl "ease-apple-spring" node_modules/@mkbabb/glass-ui/` matches only `README.md`, never a stylesheet, and no fourier file declares it. An unresolvable `var()` makes the whole shorthand *invalid at computed-value time*, so the declaration would fall back to `initial` (`transition: none`) if it ever ran. Four other live fourier sites carry the same latent break (`GallerySearchBar.vue:188-189`, `VisualizationView.vue:426`, `GalleryCard.vue:196`, `:295`) — those are outside this component's scope but share the root cause, and they are **not** dead code.

*Provenance*: `AppHeader.vue:278-301`; `node_modules/@mkbabb/glass-ui/**` (token absent outside README).
*Falsifier*: a `<Transition name="fade">` or `name="share-pop"` reaching these class names from a parent — impossible for `share-pop`/`fade` here, since both rule sets live in the **scoped** block (`:147-302`) and would only match elements carrying this component's `data-v` hash, i.e. elements in this template. There are none.

---

**D-m2 — Two off-scale radii, and a broken concentric relationship.**
`glass-ui/dist/styles/theme/radius.css:15-47` publishes the ladder: `--radius-xs/sm: 4px`, `--radius-md: 6px`, `--radius: 0.625rem` (10px), `--radius-xl: 12px`, `--radius-2xl: 1rem`, `--radius-3xl: 1.5rem`, `--radius-pill: 9999px`; aliases `--radius-control: var(--radius-md)`, `--radius-button: var(--radius)`, `--radius-panel: var(--radius-xl)`.

AppHeader declares `border-radius: 0.4375rem` (7px) at `:175` and `0.5rem` (8px) at `:322`. Neither is a rung; 7px falls between `--radius-control` (6) and `--radius-button` (10), and both override `btn-pill`/`rounded-panel` from the primitives.

The 8px is also geometrically wrong for its position: `.nav-dropdown-item` sits inside `DropdownMenuContent`'s `rounded-panel` (12px) with `.nav-dropdown { padding: 0.5rem }` (`:313-315`). Concentric corners require *inner = outer − padding* = 12 − 8 = **4px**. At 8px the item's corner is twice its correct curvature and will visibly mismatch the container's at the four corners.

*Provenance*: `AppHeader.vue:175`, `:313-315`, `:322`; `glass-ui/dist/styles/theme/radius.css:15-47`; `dist/dropdown-menu-BJ7E9js_.js` (`rounded-panel` on the content).
*Falsifier*: `--radius-panel` not being 12px — refuted (`radius.css:33` → `--radius-xl` → `:20` `12px`).

---

**D-m3 — Inverted responsive proportion, plus a 12.5% height discontinuity at a breakpoint the header does not declare.**
Two independent rem systems collide:

- `src/style.css:40-50` — `html { font-size: 1.125rem }` (root `rem` resolves against the initial 16px, so **18px**), stepping to `1rem` (**16px**) at **`min-width: 768px`**.
- `AppHeader.vue:161-167` — the header's own responsive step is at **`min-width: 640px`**, where it sets `height: 3.5rem`.

Consequences, all arithmetic from the declarations:

| Band | root px | header height | source |
|---|---|---|---|
| <640px | 18 | `min-height: 2.75rem` = 49.5px *(fiction — see below)* | `:158` |
| 640–767px | 18 | `height: 3.5rem` = **63px** | `:163` |
| ≥768px | 16 | `height: 3.5rem` = **56px** | `:163` |

So the desktop header silently loses 7px (12.5%) crossing 768px, for no design reason — the discontinuity is an artefact of two components disagreeing about where "desktop" starts.

And `min-height: 2.75rem` at `:158` never binds on mobile. `.dark-mode-toggle { --toggle-size: 2.5rem }` (`:241-243`) → `DarkModeToggle.vue:76-79` `width/height: var(--toggle-size, 5rem)` = **45px**, plus `padding: 0.5rem` top and bottom (`:157`) = **63px** actual. The declared 49.5px floor is decorative. Net: **the mobile header (63px) is taller than the desktop header (56px)** — the inverse of the intended proportion, and 13% of a 480px-tall phone viewport spent on chrome.

*Provenance*: `AppHeader.vue:153-167`, `:241-243`, `:255-257`; `DarkModeToggle.vue:76-87`; `web/src/style.css:40-50`.
*Falsifier*: `html { font-size: 1.125rem }` resolving against something other than 16px. Refuted — `rem` on the root element resolves against the initial value per CSS Values 4 §5.1.1. Second falsifier: some other rule capping the header. Refuted — `grep -n "app-header\|header-inner" web/src/` returns only the declarations in this file.

---

**D-m4 — A dead media-query rule, byte-identical to the base it "overrides".**
`AppHeader.vue:218-222`:

```css
@media (min-width: 640px) {
    .nav-trigger { padding: 0.25rem; }
}
```

`:174` already declares `padding: 0.25rem` unconditionally. The block changes nothing. Its existence suggests the responsive padding step was reverted and the shell left behind — which, next to D-B1's missing reveal in the *sibling* media query, points at an incomplete edit to this exact region.

*Provenance*: `AppHeader.vue:174`, `:218-222`.
*Falsifier*: an intervening rule changing `.nav-trigger` padding between `:174` and `:218` — none exists (`:184-216` touch `:hover`, `:focus-visible`, and the three child classes only).

---

**D-m5 — Dead store binding that eagerly instantiates a 471-line store with a deep watcher, on every route.**
`AppHeader.vue:49` — `const workspaceStore = useWorkspaceStore();`. `grep -n "workspaceStore" AppHeader.vue` returns exactly that line; the identifier is never read in script or template (contrast `galleryStore`, `:50`, used at `:137`).

`stores/workspace.ts` is 471 lines and registers setup-time effects: `onScopeDispose` at `:74` and `watch([contourSettings, animationSettings], scheduleDraftSave, { deep: true })` at `:108`. Because AppHeader mounts once at app boot on **every** route (`App.vue:25`), this pulls the workspace store, `@/lib/api`, and `@/lib/draftStorage` into the header's dependency graph and arms a deep watcher on `/paper`, `/gallery`, `/equation` and `/morph` — routes that never touch a workspace.

*Provenance*: `AppHeader.vue:49`; `stores/workspace.ts:1-16` (imports), `:74`, `:108`, 471 lines total; `App.vue:25`.
*Falsifier*: template usage via auto-unwrapping. Refuted by grep over the whole SFC. Second falsifier: Pinia singleton semantics making the cost one-time — true, and it is why this is MINOR rather than MAJOR; the cost is one-time-at-boot, not per-route. The *dead binding* stands regardless.

---

**D-m6 — Two inert utilities and one duplicated declaration on the logo.**
- `AppHeader.vue:60` — `class="logo-trigger relative shrink-0"`. `relative` establishes a containing block for absolutely-positioned descendants; the element's only child is the `.logo-mark` span (`:67-69`), which is statically positioned. Inert.
- `cursor: pointer` is declared twice for the same box: `cursor-pointer` on the inner span (`:67`) and `.logo-trigger { cursor: pointer }` (`:274-276`).

*Provenance*: `AppHeader.vue:60`, `:67-69`, `:274-276`.
*Falsifier*: an absolutely-positioned descendant appearing via a slot — there is no slot.

---

**D-m7 — Hand-rolled divider at 1.45:1, where the library ships two purpose-built options.**
`AppHeader.vue:233-239` — `.header-divider { width: 1.5px; background: color-mix(in srgb, var(--foreground) 18%, transparent); }`.

Light mode: `--foreground: hsl(24 10% 10%)` = rgb(28,25,23) (`tokens/color-radius.css:58`); at 18% over `--background` rgb(251,250,248) → rgb(211,210,208), Y = 0.6451 vs page Y = 0.9566 → **1.448 : 1** at 1.5px wide. Purely decorative separators are WCAG-exempt, so this is a *design* finding, not an a11y one: a structural divider that reads at 1.4:1 does not divide.

glass-ui ships both a `Separator` component (`dist/Separator-BArl4OaB.js`) and a `twin-line-divider` utility (`dist/styles/utilities/btn.css:38`), plus the `--border` token the app already uses (`style.css:109`).

*Provenance*: `AppHeader.vue:233-239`, `:252-254`; `glass-ui/dist/styles/tokens/color-radius.css:58`, `:40`; `dist/Separator-BArl4OaB.js`; `dist/styles/utilities/btn.css:38`.
*Falsifier*: the divider sitting on the darker `--card` rather than `--background`. Refuted — the header's own background is `bg-background/*` (`:54`).

---

**D-m8 — An unnamespaced global class, and a 1rem override that had a utility.**
`AppHeader.vue:305-309` opens a non-scoped `<style>` and declares `.hover-card-content { min-width: 17rem; }` — a maximally generic name, injected app-wide and permanent (the header never unmounts). It is currently collision-free (`grep -rn "hover-card-content" web/src/` returns only `:72` and `:307`), but nothing defends that.

The override itself widens glass-ui's `HoverCardContent` from its `w-64` base (`dist/HoverCardContent-DkMaQzH5.js`: `"z-hovercard w-64 rounded-panel border glass-floating p-4 …"`) by exactly 1rem. 17rem = 68 × 0.25rem = the `w-68` utility, which could have been passed inline alongside the existing `class="hover-card-content"` with no global rule at all. Same for `.nav-dropdown { min-width: 12rem }` (`:311-315`) vs the primitive's `min-w-32`.

*Provenance*: `AppHeader.vue:72`, `:305-315`; `dist/HoverCardContent-DkMaQzH5.js`; `dist/dropdown-menu-BJ7E9js_.js`.
*Falsifier*: scoped styles reaching portaled content — genuinely impossible (reka teleports to `<body>`), which is why the *block* is justified (S-6) and only its naming and its two width rules are not.

---

### INFO

---

**D-i1 — Register clash in the attribution card's closing line.**
`AppHeader.vue:104` — `View project on GitHub` followed by U+1F389 (party-popper emoji). The card's own preceding line is `Fourier analysis &amp; orthogonal decomposition` (`:94`), set in italic. The product is an academic treatise with a typeset paper as its centrepiece; the emoji is the only such mark in the header and reads as a leftover. (Same register question, different component: `UserSlugBar.vue:132` placeholder `your-slug-here` + U+1F40C.) Judgement, not defect — filed INFO.

---

**D-i2 — Three different identities for one person inside a 40px block.**
`AppHeader.vue:81` `alt="mkbabb"` · `:93` link text `@mbabb` · `:88` `href="https://github.com/mkbabb"`. A screen reader traverses "mkbabb, link, @mbabb". Additionally the avatar is decorative *because* the name is adjacent — `alt=""` is the correct value; a non-empty alt duplicates the label.

---

**D-i3 — Synthetic weight and tightened fit on the masthead.**
`AppHeader.vue:67` applies `font-semibold` (600) and `tracking-tight` (−0.025em). `public/fonts.css:14-40` ships Computer Modern at 400 and 700 only — so 600 would synthesise even if `--font-serif-math` were wired (D-B2), and today it synthesises against whatever generic serif the OS supplies. Negative tracking on a serif at 20-27px also fights the face's designed fit; serifs generally want default or positive tracking at display sizes.

---

**D-i4 — State coverage: an abandoned transition, and no error/loading surface.**
`AppHeader.vue:137` — the admin badge appears and disappears via bare `v-if`, with no `<Transition>`, while an unused `.fade-*` enter/leave pair sits 157 lines below in the same file (`:294-301`, see D-m1). The pairing is hard to read as anything but an intent that was written and then not wired.

Header-region state coverage more broadly: **empty** — covered (logged-out renders the login affordance, `UserSlugBar.vue:115-126`); **loading** — `loggingIn` drives `:disabled` only (`:142`, `:149`), no spinner or busy semantics; **error** — routed entirely to toasts (`:42`, `:57`), so a failure leaves the header itself unchanged. Nothing in AppHeader proper has any of the three.

---

**D-i5 — The resting menu-item label clears AA by 0.5%, on a translucent surface.**
`.nav-dropdown-item { color: color-mix(in srgb, var(--foreground) 60%, transparent) }` (`:325`) over `--popover` = `--card` = `hsl(36 48% 97%)` = rgb(251,248,244) (`tokens/color-radius.css:74`, `:72`):
composite rgb(117,114,111), Y = 0.16970; surface Y = 0.94332 → **4.522 : 1** against the 4.5:1 AA floor for normal text (the item is 1rem / 500).
Dark arm: fg `hsl(48 10% 90%)` over `--popover: hsl(24 8% 16%)` → rgb(157,155,151) on rgb(44,40,38) → **5.179 : 1**. Comfortable.

The light margin is 0.5%. The surface is not opaque — `DropdownMenuContent` carries `glass-floating` (`dist/dropdown-menu-BJ7E9js_.js`), whose element-level oklab tint (`menu.css:24-45`) darkens over light backgrounds. Whether the composited surface stays at or above `--popover`'s luminance is **UNPROVEN-NEEDS-LIVE (SS-13)**; if it darkens at all, this crosses under. Filed INFO rather than MINOR precisely because the nominal computation passes.

---

## 3. Superlatives (L-18 — these are claims too, and carry falsifiers)

**S-1 — The self-hosted avatar is a small masterpiece of restraint.** `AppHeader.vue:74-85`: a five-line comment stating the *policy* ("restores the zero-third-party-origins posture — no avatars.githubusercontent.com handshake/beacon"), the *convention* ("the repo's committed-raster convention"), and the *arithmetic* ("80px source for 2× density in the 40px h-10 box"); then `width="80" height="80"` intrinsic attributes against a `h-10 w-10` CSS box (aspect-ratio derived → zero CLS), `decoding="async"`, and `shrink-0`. Every one of the four things that go wrong with avatars is pre-empted, and the reasoning is legible to the next reader.
*Falsifier*: the file not existing (would make the `alt` the rendered content). Not statically checkable from this repo view — `${baseUrl}assets/maintainer-avatar.png` is resolved at build; flagged **UNPROVEN-NEEDS-LIVE (SS-13)** rather than asserted either way. The *authoring* is exemplary regardless.

**S-2 — `@click.stop` on the two hover-card anchors is a precise event-boundary, not a reflex.** `:93` and `:104`. The card is a descendant of `.logo-trigger`, which binds `@click.stop="router.push('/paper')"` (`:64`); without the inner stops, clicking either external link would also fire the logo's navigation and race the new tab. Two characters, exactly where the composition needs them.
*Falsifier*: the card being portaled outside the trigger, making the stops dead. Portaling moves the DOM but **not** Vue's synthetic event propagation, which follows the component tree — so the stops are load-bearing. Verified against `reka-ui/dist/HoverCard/HoverCardContent.js` (uses `HoverCardPortal`).

**S-3 — This component authored the app's focus-visible convention, and the tree says so.** `:188-191` uses `:focus-visible` (not `:focus`), a 2px `var(--ring)` outline, and `outline-offset: 2px`. `web/src/style.css:129-135` then names it: *"Mirrors the canonical pattern at AppHeader.vue:174-177 (the only pre-W4 conformant site)"*, and propagates it to four other components. A header that sets the standard for the rest of the app is doing more than its own job.
*Falsifier*: the cited line range being stale (the rule now sits at `:188-191`, four lines below the cited `:174-177`) — a drifted citation, not a wrong one; the rule is unmistakably the same. Second falsifier: `--ring` being undefined — refuted (`tokens/color-radius.css:102` light, `dark-arm.css:90` dark).

**S-4 — The chevron rotation is driven by the primitive's own state, with no duplicated ref.** `:214-216` — `.nav-trigger[data-state="open"] .nav-trigger-chevron { transform: rotate(180deg); }`. reka writes `data-state` on the trigger; the component reads it in CSS. No `isOpen` ref, no `@update:open` handler, no possibility of the arrow disagreeing with the menu. The disciplined version of a very commonly botched detail.
*Falsifier*: `DropdownMenuTrigger as-child` not forwarding `data-state` onto the `Button`. Refuted — reka's `Primitive` merges its attrs onto the as-child element, and the sibling `HoverCardTrigger.js` shows the same `"data-state"` binding pattern explicitly.

**S-5 — PRM is correctly inherited, not re-implemented — and I verified it rather than flagging its absence.** `lane-frontend.md:619` lists 8 local `prefers-reduced-motion` blocks; AppHeader has none, and its `transform 0.2s` chevron transition (`:211`) looks like an omission. It is not. `glass-ui/dist/styles/utilities/a11y-overrides.css:6-16` declares `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { transition-property: opacity, color, background-color, border-color, box-shadow !important; transition-duration: 0.1s !important; } }` — `!important` beats unlayered scoped declarations unconditionally, so the chevron's `transform` is stripped from the transition list and snaps, while the colour transitions (`:180`, `:330`) correctly survive. The component gets the *nuanced* PRM behaviour for free and would have regressed it by writing a local `transition: none`.
*Falsifier*: the blanket not reaching scoped styles. Refuted by the cascade rules for `!important` (CSS Cascade 5 §6.4.4: important declarations reverse layer order and always outrank normal ones, layered or not).

**S-6 — The unscoped style block carries its justification inline, per rule.** `:304-311` — `<!-- Global style for portaled components -->`, then `/* @global — portaled glass-ui HoverCardContent */` and `/* @global — portaled glass-ui DropdownMenuContent */` above the two rule groups. Vue's scoped-style limitation with teleported content is a real and non-obvious constraint, and the next reader is told *which* primitive each escape serves. The mechanism is right; only its contents are not (D-M3, D-m8).
*Falsifier*: the content not actually being portaled, making the escape gratuitous. Refuted — `dist/HoverCardContent-DkMaQzH5.js` and `dist/dropdown-menu-BJ7E9js_.js` both compose reka's `*Portal`.

---

## 4. Cross-cutting: the pattern behind the pattern

Eleven of the 26 findings share one mechanism: **an unlayered scoped/global declaration overriding a `@layer`-ed design-system rule**. D-M3 (glass-menu-row), D-M9 (ghost hover plate), D-M6 (`--ui-glyph`), D-m2 (`btn-pill` / `rounded-panel`), D-m7 (`Separator`), D-m8 (`w-64` / `min-w-32`), plus the `focus-ring` / `cursor-pointer` / `text-dropdown` / `px-2 py-1.5` / `transition-control` duplications noted in passing.

Every one of them wins its cascade fight *by accident of layering*, not by intent. The author was not overriding the library on purpose eleven times; they were writing plain CSS in a file where plain CSS silently outranks everything glass-ui ships. The library saw this coming and wrote it down — `menu.css:7-21`, quoted in full at D-M3 — and the warning did not reach the consumer.

**The remedy is one structural change, not eleven patches**: wrap both `<style>` blocks in `@layer components` (or `@layer glass-overrides` declared after glass-ui's layers). That restores normal specificity arbitration, makes each override an argument rather than an accident, and would have surfaced most of these as visible conflicts during authoring.

---

## 5. F.W1 tri-package uplift ledger (glass ^4.0.0 → 7.0.0)

Every surface in this component that the uplift will **break** or **improve**, against the census break-surface rows.

| # | Surface | Today (4.0.0) | At 7.0.0 | Disposition |
|---|---|---|---|---|
| **U-1** | `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mkbabb/glass-ui/hover-card"` — `AppHeader.vue:16-20` | subpath exists | **REMOVED.** Producer `package.json` exports confirm `./hover-card` absent, `./popover` present. Census row: `lane-frontend.md:473` (folds at 5.0.0 `BI.W-OVERLAY-UNION`). | **HARD BREAK.** And the naive swap is wrong twice over: producer `src/components/popover/Popover.vue:13-41` defaults `trigger: "click"`, so `<Popover>` without `trigger="hover"` turns the attribution card into a click-target — **colliding with the logo's own `@click.stop="router.push('/paper')"` at `:64`**. The migration MUST pass `trigger="hover"`. Timing also shifts: reka HoverCard's defaults (700ms open / 300ms close) → Popover's `openDelay: 250` / `closeDelay: 150`. |
| **U-2** | `import { … } from "lucide-vue-next"` — `AppHeader.vue:8`, 7 icons (`Shield`, `ChevronDown`, `FileText`, `Eye`, `LayoutGrid`, `Sigma`, `Shuffle`) | `lucide-vue-next@^1.0.0` (devDep) | glass-ui 7 peers `@lucide/vue@^1.16.0`. Census: 35 sites repo-wide. | **RENAME SWEEP.** 1 import line here. Watch the two dynamic `:is` families at `:117` / `:130` (intake **R3-10**) — a partial rename leaves those resolving to `undefined` at runtime with no compile error. |
| **U-3** | `DarkModeToggle` mount + `--toggle-size` ownership — `AppHeader.vue:141`, `:241-243`, `:255-257` | local SFC (109 LOC, sun↔moon Fourier morph) | 7.0.0 adds `./dark-mode-toggle`. Census `lane-frontend.md:419-421`: "**keep**, but reconcile against the 7.0.0 props/tokens rather than let it drift." | **RECONCILE.** AppHeader is the sole mount site and the sole `--toggle-size` setter, so the reconciliation lands in this file. Note `DarkModeToggle.vue:99` uses `var(--color-ring)` while `AppHeader.vue:189` uses `var(--ring)` — one of the two is on the wrong side of the Tailwind bridge; reconcile them together. |
| **U-4** | `Button variant="ghost"` — `AppHeader.vue:112-113` | ghost arm present (`dist/button-BNDWhAZb.js`) | `./button` survives at 7.0.0. | **VERIFY.** Subpath safe. The ghost *arm*'s class list must be re-diffed — D-M9's finding is that `.nav-trigger` already suppresses it, so a silent arm change would be invisible until the suppression is lifted. |
| **U-5** | `DropdownMenu*` — `AppHeader.vue:10-15` | `./dropdown-menu` | survives at 7.0.0. | **VERIFY.** But `menuItemVariants` is the thing to diff, not the subpath: D-M3's override is written against the 4.0.0 recipe (`px-2 py-1.5 / text-dropdown / glass-menu-row`). Fix D-M3 **before** the uplift and this row becomes free. |
| **U-6** | Peer floors reachable from this component | `value.js@0.13.0`, `keyframes.js@4.3.0` | 7.0 peers `value.js@^4.0.0`, `keyframes.js@^6.0.0`. `DarkModeToggle.vue:20` → `useFourierMorph` → `loadAnimationEngine` (keyframes). | **ATOMIC.** Per census `lane-frontend.md` §"THE RESOLUTION DEADLOCK": `keyframes.js@4.3.0` optional-depends `glass-ui: ~4.0.0`, so the three bumps are one transaction. AppHeader participates through the toggle. |
| **U-7** | `type ToastVariant` | not imported here | definition-absent at 7.0.0 (census `:102-104`) | **TRANSITIVE ONLY.** Reaches this component via `UserSlugBar.vue:7` → `composables/useToast.ts:3`. Not an AppHeader edit; noted so F.W1 does not double-count it. |
| **U-8** | `./metric-badge`, `./hover-popover`, `DockIconButton`, `DockDropdownTrigger` | — | — | **NEGATIVE — absent from this component.** Confirmed by reading the whole import block (`:1-20`). Recorded so the uplift budget is not inflated for AppHeader. |

**Uplift improves:** exactly one thing — **D-M7**. Producer `Popover.vue:59-60` computes `isCoarsePointer` and adapts a `trigger="hover"` surface to tap on touch devices, which is precisely the capability reka's `excludeTouch` denies today. The migration, done correctly (`trigger="hover"` + resolving the click collision at `:64`), makes the attribution card reachable on touch for the first time.

---

## 6. Ranked remediation

| Rank | Finding(s) | Cost | Why first |
|---|---|---|---|
| 1 | **D-B1** | 3 lines | The header's core job, restored by one `display: inline` in an existing media query. Highest ratio in the file. |
| 2 | **D-B4** | 2 lines | `/s/` → `/v/`. A one-token edit that stops the header lying on every shared link. |
| 3 | **D-B3** | 1 token + 1 attr | Darken light `--tier-featured` (the `--viz-amber` precedent at `style.css:113-127` is a working template) and add `role="img"` + `aria-label`. |
| 4 | **D-B2** | ~4 lines | Declare `--font-serif-math: "Computer Modern Serif", …` and give `.fourier-f` a family that covers U+2131. Unblocks four vendored, preloaded, currently-orphaned faces. |
| 5 | **§4 layering** | 2 lines | Wrap both `<style>` blocks in `@layer components`. Converts D-M3 / D-M9 / D-m2 / D-m7 / D-m8 from accidents into decisions, and pre-empts the same class of defect for every future edit. |
| 6 | **D-M4 + D-M5** | net −8 lines | Replace the `div[role=button]` with `<RouterLink to="/paper">`. Deletes code and fixes two WCAG failures. |
| 7 | **D-M1 + D-M2** | 1 class | `sticky top-0 z-[var(--z-overlay)] backdrop-blur-md` → decide: either make `<main>`'s scroll the header's (real sticky), or drop the treatment and take `z-header`. Do not keep paying for it. |
| 8 | **D-M8** | ~6 lines | `<nav aria-label="Primary">` + `aria-current="page"` + a skip link to the `<main>` that already exists. |
| 9 | **D-m1, D-m4, D-m5, D-m6** | −30 lines | Pure deletion. Do last; do all at once. |

---

## 7. Disposition

**Component verdict: DEFECTIVE on the design axis.** Four blockers, and they are not peripheral — they land on the masthead's typography, the navigation label, the current-section indicator, and the sole privilege badge, i.e. on all three things a header is for.

The component is nonetheless *well-authored in its instincts*: the avatar block, the event-boundary stops, the data-attribute-driven chevron, and the focus-visible convention it exported to the rest of the app are better than the codebase average. The failures are overwhelmingly **cascade-mechanical** (§4) and **token-resolution** (D-B2, D-B3, D-m1) — the marks of a component written correctly against a design system whose seams were not visible from inside the file.

**Carries:**
- → **F.W1** — U-1 (the `trigger="hover"` + click-collision pair) is the only uplift row here needing design judgement rather than a rename. U-3's `--ring` / `--color-ring` split should ride along.
- → **F.W4** — intake **R3-10**'s six dynamic `:is` families: `:117` and `:130` re-verified live here; budget both under U-2.
- → **SS-13 (live)** — five items only: the `maintainer-avatar.png` build path (S-1); the concrete OS fallback face for U+2131 (D-B2 leg 2); the `glass-floating` composited surface luminance vs `--popover` (D-i5); the coarse-pointer 44px lift inside the `py-0.5` slug pill (D-M6); and iOS-Safari focus-on-tap for `div[tabindex="0"]` (D-M7).
- → **glass-ui BH inbox** (standing relay, `feedback-glassui-bhbi-relay`): two producer-side asks fall out of this challenge — (a) light-mode `--tier-featured` fails 1.4.11 as a foreground at 1.52:1 and wants the same rebaseline `--viz-amber` already received; (b) `@utility cm-serif` reads `var(--font-serif-math, serif)` against a variable the library never declares, so the utility silently no-ops for every consumer that does not know to define it.
