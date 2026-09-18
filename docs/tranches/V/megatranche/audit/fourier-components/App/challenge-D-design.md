claude-opus-5[1m] (served model id)

# CHALLENGE — `App` · axis D (DESIGN)

**Subject.** `fourier-analysis/web/src/App.vue` (32 lines).
**Substrate.** fourier-analysis working tree, branch `m/w1-bump-migration`, glass-ui pin `^4.0.0` / installed `4.0.0`; producer glass-ui `7.0.0` at `/Users/mkbabb/Programming/glass-ui`.
**Posture.** Component assumed DEFECTIVE until the tree proves otherwise. Read-only throughout; the only write is this file. No browser tooling — every claim is static or source-derived; the three that depend on paint or on a device are marked **UNPROVEN-NEEDS-LIVE** for SS-13.

**Read closure** (App.vue + everything it imports, whole):

| File | LOC | Why in closure |
|---|---|---|
| `web/src/App.vue` | 32 | subject |
| `web/src/components/layout/AppHeader.vue` | 354 | `App.vue:6` |
| `web/src/components/decorative/SvgFilters.vue` | 168 | `App.vue:7` |
| `web/src/lib/colors.ts` | 117 | `App.vue:8` |
| `@mkbabb/glass-ui/tooltip` → `TooltipProvider.vue` | 27 | `App.vue:4` |
| `@mkbabb/glass-ui/toast` → `Toaster.vue` | 143 | `App.vue:5` |
| `vue-router` → `web/src/router/index.ts` | 191 | `App.vue:3` (`RouterView` contract) |
| `web/src/main.ts` + `web/src/style.css` + `web/index.html` | 11 / 143 / 39 | the shell's mount + cascade + document context |
| second-order, read for the header's break surface | — | `DarkModeToggle.vue` (109), `lib/basis-display.ts` (7), `composables/useToast.ts` (38) |

**Tally.** 20 defects · **2 BLOCKER** · 7 MAJOR · 9 MINOR · 2 INFO · **5 superlatives**.

**Corpus folded, not re-invented.** `formation/fourier/CENSUS-2026-08-03.md` (§3a, §5 break surface, lines 104/186/256), `formation/fourier/lane-frontend.md` (§1 shell row line 41, §5 break table, §8 PRM table, §9 carries), `formation/fourier/lane-crud.md`, and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (rows **R3-7**, **R3-7a** cited below). **B-2 contradicts the corpus explicitly** — see its Contradiction clause.

---

## The component, whole

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { TooltipProvider } from "@mkbabb/glass-ui/tooltip";
import { Toaster } from "@mkbabb/glass-ui/toast";
import AppHeader from "@/components/layout/AppHeader.vue";
import SvgFilters from "@/components/decorative/SvgFilters.vue";
import { resolveVizColors } from "@/lib/colors";

onMounted(() => {
    resolveVizColors();
    const observer = new MutationObserver(() => resolveVizColors());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
});
</script>

<template>
    <SvgFilters />
    <TooltipProvider :delay-duration="400" :skip-delay-duration="200">
        <div class="h-dvh flex flex-col bg-background text-foreground paper-texture overflow-hidden">
            <AppHeader />
            <main class="flex-1 min-h-0 flex flex-col overflow-y-auto">
                <RouterView />
            </main>
        </div>
    </TooltipProvider>
    <Toaster />
</template>
```

Thirty-two lines that carry, between them: the app's entire colour resolution, its ground texture, its sole landmark, its only scroll container, its tooltip dwell policy, its toast anchor, and — by omission — its loading state, its error state, its skip navigation, and its route announcement. The shell is small; its blast radius is the product. Six of the twenty defects below are **omissions at this file**, not faults in what it wrote.

---

## BLOCKERS

### B-1 · `resolveVizColors()` writes `#888888` into four of the five brand colours — **today, at the installed pin**

**Severity:** BLOCKER · **Provenance:** `App.vue:11` → `lib/colors.ts:23-53`, `:68-72`

`App.vue:11` calls `resolveVizColors()` on mount. That function (`lib/colors.ts:68-72`) resolves five CSS custom properties through `cssVarToHex` (`:22-54`), which matches exactly four input shapes:

| Branch | `lib/colors.ts` | Pattern |
|---|---|---|
| hex passthrough | `:29` | `raw.startsWith("#")` |
| `hsl(…)` | `:32-37` | `/hsl\(\s*([\d.]+)\s*[ ,]…\)/` |
| bare HSL triplet | `:40-43` | `/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/` |
| `rgb(…)` | `:46-51` | `/rgb\(\s*…\)/` |
| **everything else** | **`:53`** | **`return "#888888"`** |

The installed glass-ui 4.0.0 ships every one of those tokens in **`oklch()`**:

```
node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263  --viz-fourier:   oklch(0.579 0.201 30.4);
                                                              :264  --viz-chebyshev: oklch(0.484 0.163 265.5);
                                                              :265  --viz-legendre:  oklch(0.532 0.180 317.5);
                                                              :267  --viz-green:     var(--section-color-4);
                                                              :245  --section-color-4: oklch(0.551 0.088 171.1);
node_modules/@mkbabb/glass-ui/dist/styles/tokens/dark-arm.css:113-115   (oklch, dark arm)
node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css:145-147 --viz-fourier: light-dark(oklch(…), oklch(…));
```

`--viz-*` is **not** `@property`-registered (`grep -rn "@property" node_modules/@mkbabb/glass-ui/dist/styles/ | grep -i viz` → empty), so `getComputedStyle(documentElement).getPropertyValue("--viz-fourier")` (`lib/colors.ts:23-25`) returns the substituted token stream verbatim — `oklch(0.579 0.201 30.4)`, or under the `light-dark()` arm the even more hostile `light-dark(oklch(…), oklch(…))`. Neither starts with `#`, contains `hsl(`, contains `rgb(`, nor matches the bare triplet anchor. **All four fall through to `:53`.**

Only `--viz-amber` survives, and only by accident: fourier's own `style.css:120` re-declares it as `hsl(35 76% 35%)` for an unrelated WCAG carry, and that literal is the one shape the regex chain catches.

**Failure scenario.** App mounts → `onMounted` → `resolveVizColors()` overwrites the sane literals at `lib/colors.ts:78-82` (`#bf4040`, `#3d72b8`, `#9545b8`, `#4d8f66`) with `#888888`. `BasisCanvas.vue:127` strokes the epicycle trail grey; `:172` the epicycle chain; `:257,261` the basis curves and their golden shimmer backdrop; `:326` the epicycle colour. `BasisSelector.vue:176,203` set `--track-color: #888888` on the Fourier and Chebyshev sliders. `EditorControlsDock.vue:123` likewise. `GalleryCardModal.vue:150` renders the coefficient count in grey. The `MutationObserver` at `App.vue:13-17` re-asserts the grey on every dark-mode flip, so the state never self-heals; a theme toggle cannot recover it.

The app is a *colour-coded* study of three orthogonal bases. Four of the five semantic colours are neutral grey, and the one that works does so because of a comment about axe contrast.

**Falsifier (and why it does not fire).**
1. *An `oklch(` branch exists.* `grep -n "oklch" src/lib/colors.ts` → empty.
2. *Some other module re-declares `--viz-*` in a matched shape.* `grep -rn "\-\-viz-[a-z]*\s*:" src/` → **two hits, both `--viz-amber`** (`style.css:120,125`). The other four have no local override.
3. *Consumers ignore `VIZ_COLORS`.* They do not — nine call sites enumerated above.
4. *`getPropertyValue` canonicalises to rgb.* Only for `@property`-registered properties with `syntax: "<color>"`; there is no such registration (checked above), and even a registered `<color>` serialises in Chrome as `oklch(…)`, still unmatched.

**Corroborating stale premise.** `style.css:113-118` states *"glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)`"*. `grep -rn "35 70% 42%" node_modules/@mkbabb/glass-ui/dist/` → **empty**. That comment was written against the `^3.1.0` HEAD pin; the tree moved to oklch under it. The author's mental model of the token layer is HSL; the token layer has been oklch since at least 4.0.0. B-1 is the mechanical consequence of that drift, and the stale comment is independent evidence that the drift went unnoticed.

**The fold, and the honest caveat.** fourier already depends on `@mkbabb/value.js` (`web/package.json:14`), the repo running this audit, which publishes `parseCssColor` — a real CSS Color L4 parser that handles `oklch()`. `lib/colors.ts`'s hand-rolled four-shape matcher is a **shadow of a strictly stronger producer facility**, and belongs on lane-frontend's shadow ledger beside `GlassTimeline`/`EasingPicker` (CENSUS §3a). The caveat is load-bearing: the megatranche's own parser proof gate (2026-07-20, `apotheosis/parser-proof/GATE-VERDICT.md`) recorded **R1 = a live `parseCssColor("oklch()")` shipping crash**. So the fold is a WAVE item gated behind the V·π mini-tranche, **not** a drop-in swap. The cheap interim cure is a fifth branch, or — better and KISS — a 1×1 canvas 2D `fillStyle` round-trip, which resolves any CSS colour the engine understands and is the idiom value.js's own demo already uses.

**UNPROVEN-NEEDS-LIVE:** the painted grey. The token-format-vs-regex mismatch and the fall-through are fully source-decidable; the on-screen consequence follows deductively but wants one SS-13 capture of `/visualize` to bank.

---

### B-2 · `.paper-texture` is definition-absent in glass-ui 7.0.0 — the shell's ground vanishes at F.W1, silently

**Severity:** BLOCKER (uplift) · **Provenance:** `App.vue:24`

`App.vue:24` applies `paper-texture` to the root shell div. It is the app's entire ground register — the quiet paper substrate the constellation record names as the deliberate alternative to an aurora/WebGL backdrop (`glass-ui/docs/tranches/AW/constellation/waves/fourier-L-adopt.md:61`, which cites this very line).

**At the installed pin it exists:**
```
node_modules/@mkbabb/glass-ui/dist/styles/cards.css:10   .paper-texture {
                                                  :11      background-image: var(--paper-clean-texture);
                                                  :13      background-size: var(--paper-texture-size);
                                                  :14      background-blend-mode: multiply;
                                                  :17   :where(.dark) .paper-texture { background-blend-mode: screen; }
```

**At producer 7.0.0 it does not.** `src/styles/cards.css` no longer exists — the file was carved into `src/components/card/styles.css`, which defines `.card*`, `.paper-grid` (`:70`, `:83`, `:105`) and no `.paper-texture`. Exhaustive search:

- `grep -rn "paper-texture" /Users/mkbabb/Programming/glass-ui/src/` → four hits, **zero of them a rule**: the token `--paper-texture-size` (`styles/tokens/offsets.css:91`), two `background-size:` consumers (`styles/glass/grain-overlay.css:40`, `components/dock/styles/dock.css:142`), and one **stale prose reference** at `styles/tokens/scale-paper.css:113` ("…downstream consumer of `.paper-texture`") — the producer's own comment still names a recipe the producer deleted.
- `grep -rn "paper-texture" /Users/mkbabb/Programming/glass-ui/dist --include="*.css"` → three hits, all `--paper-texture-size` / `--paper-clean-texture` usages. **No `.paper-texture{` rule in the shipped bundle.**
- The 7.0.0 `@utility` roster contains `paper-underpaint` and `paper-grain-overlay` (`src/styles/paper.css:100`, `:125`) — and no `paper-texture`.

**Failure scenario.** F.W1 lands the tri-package bump. `vue-tsc -b` passes — a CSS class is not a symbol. Playwright's 29 tests pass — none asserts a background-image. The app boots, and the shell's ground silently flattens to a bare `bg-background` fill. The one visual difference between "a typeset treatise on warm paper" and "a white div" disappears with no gate firing anywhere.

**Neither survivor is a drop-in.** `paper-underpaint` (`paper.css:100-119`) is `position: fixed; inset: 0; z-index: -1` — a full-viewport underlay, not a class you put on a `h-dvh` flex container; dropping it on `App.vue:24`'s div would `position: fixed` the entire app shell. `paper-grain-overlay` (`:125-150`) adds `position: relative; isolation: isolate` plus an `::after` — mounting it on the app root mints a stacking context at the top of the tree, which must be checked against the sticky header (`AppHeader.vue:54`, `z-[var(--z-overlay)]` = 50) and every portaled overlay before adoption. Both also swap the texture register from `--paper-clean-texture` (one raster layer) to the two-layer `--paper-grain-relief`/`--paper-grain-tooth` pair — a different *look*, not a rename.

**Contradiction with the hitherto corpus, stated explicitly.** `CENSUS-2026-08-03.md:104` and `:186` enumerate the F.W1 break surface as *"metric-badge ×7 files, hover-card/-popover ×4, dock members ×3, `ToastVariant`"*, and lane-frontend §5's break table is likewise entirely **import-shaped**. That enumeration is *complete for the JS/TS symbol layer and silent on the CSS class layer*. `.paper-texture` is the App-shell instance of a break class the census does not model. The precedent is already in fourier's own tree and proves the failure mode: `style.css:107-112` carries an `@utility cartoon-card` shim resurrecting a class glass-ui removed at C.W5 across 25 sites — discovered, per the comment, only after the fact. **Carry to F.W1: a CSS-class census (`grep` every glass-ui-owned class fourier applies, diff against the 7.0.0 `@layer components` + `@utility` roster) before the bump, not after.**

**Falsifier.** `grep -rn "@utility paper-texture\|\.paper-texture\s*{" /Users/mkbabb/Programming/glass-ui/{src,dist}` returning a rule would kill this finding outright. It returns nothing.

---

## MAJOR

### M-1 · The nav trigger's label is `display:none` at every viewport — the current section is never legible

**Severity:** MAJOR · **Provenance:** `AppHeader.vue:118`, `:201-204`, `:218-222`

```
:118   <span class="nav-trigger-label">{{ activeTabData.label }}</span>
:201   .nav-trigger-label {
:202       display: none;
:203       color: var(--viz-amber);
:204   }
```

`grep -rn "nav-trigger-label" src/` returns **exactly two hits** — the template and this rule. Nothing ever restores it.

The intended pattern is two rules below, and it is correct there: `.logo-text { display: none }` (`:229-231`) is restored to `display: inline` inside the `min-width: 640px` block (`:249-251`). The `min-width: 640px` block that should carry the label's restore is `:218-222` — and it contains only `.nav-trigger { padding: 0.25rem }`, **byte-identical to the base rule at `:174`**. A no-op media query sitting exactly where the restore belongs is the fingerprint of a dropped edit.

**Failure scenario.** The app's primary navigation control — the sole way to move between `/paper`, `/visualize`, `/gallery`, `/equation`, `/morph` — renders as an amber 24px icon plus a 16px chevron at 50% opacity. A sighted user cannot read which of the five sections they are in from the header, at any window size. The five icons (`FileText`, `Eye`, `LayoutGrid`, `Sigma`, `Shuffle`, `:27-31`) do not disambiguate "Visualize" from "Morph" or "Paper" from "Equation" without prior learning. `color: var(--viz-amber)` at `:203` is a dead declaration on a `display:none` box.

That the author wrote `:aria-label="`Navigate — current section ${activeTabData.label}`"` (`:115`) proves the section name was understood to be load-bearing — screen-reader users get it; sighted users do not.

**Falsifier.** Any other stylesheet setting `.nav-trigger-label`'s display — the grep above rules it out, and the class is scoped-styled so a global rule would need the exact name; none exists.

### M-2 · No skip link; `<main>` is not a focus target

**Severity:** MAJOR · **Provenance:** `App.vue:26`

`<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">` carries no `id`, no `tabindex="-1"`, no accessible name. `grep -rn "skip-link\|Skip to\|skipLink" src/ index.html` → **empty**.

**Failure scenario.** WCAG 2.4.1 *Bypass Blocks* (Level A) fails. Every keyboard user, on every route load, tabs through the logo trigger (`:59`, `tabindex="0"`), the nav dropdown trigger (`:112`), the admin badge region, `UserSlugBar`, and `DarkModeToggle` before reaching content. On `/paper` — a full typeset treatise — that is the cost of every re-entry.

**Falsifier.** An `.sr-only` skip anchor anywhere in the shell. glass-ui already ships the primitive (`dist/styles/components.css:48` defines `.sr-only`), so the cure is three lines at `App.vue:24` and an `id="main"` at `:26`. Nothing of the sort exists.

### M-3 · No focus management and no route announcement on navigation

**Severity:** MAJOR · **Provenance:** `App.vue:27` (`RouterView`), `router/index.ts:150-165`

The router does the right minimum: `applyRouteMeta` (`:152-165`) sets `document.title` per route and maintains `meta[name=description]`. Nothing more happens. There is no focus reset into `<main>`, and no `aria-live` route announcer anywhere: `grep -rn "aria-live" src/` → empty; `grep -n "focus()" src/App.vue src/router/index.ts` → empty.

**Failure scenario.** A screen-reader user opens the nav dropdown, arrows to "Gallery", presses Enter. `onTabSelect` (`AppHeader.vue:45-47`) pushes the route; reka closes the menu and returns focus to the trigger; the entire `<main>` subtree is replaced. The user's focus is still on a collapsed dropdown trigger in the header, with no signal that the page changed and nothing to arrow into. `document.title` changing is announced by *some* browser/SR pairs and is the accepted floor — but no pair supplies the missing focus move. With M-2 (no skip link) and i-2 (five of eight routes have no `<h1>`), there is no landing target even if the user goes looking.

**Falsifier.** A `router.afterEach` that focuses an element, a `<RouterView v-slot>` keyed focus wrapper, or a live region. The `afterEach` at `:167-190` does meta, view-transition release, and `localStorage` tab persistence — no focus, no announcement.

App.vue is the only seat in the tree that can host this; it is the component that owns `<main>`.

### M-4 · Zero loading state and zero error state for eight lazily-loaded routes

**Severity:** MAJOR · **Provenance:** `App.vue:26-28`; `router/index.ts:46,60,72,83,94,104,115`

Every route is `component: () => import(…)`. `App.vue` wraps `<RouterView/>` in a bare `<main>`: no `<Suspense>`, no `onErrorCaptured`, no `router.onError`, no `app.config.errorHandler`.

```
$ grep -rn "onError\|errorHandler\|onErrorCaptured\|Suspense" web/src/
(empty)
```

**Failure scenario (error).** The app deploys under a configurable base path (`vite.config.ts`, `base: process.env.VITE_BASE_URL || "/"`) with content-hashed chunks. A user with a warm tab navigates after a redeploy; the old chunk URL 404s; the dynamic `import()` rejects. vue-router's navigation fails, `<RouterView/>` renders nothing, and the user is left with a rendered header above a permanently blank main region — no message, no retry, no reload prompt, no console-visible affordance. This is the single most common production SPA failure mode and the shell has no answer to it.

**Failure scenario (loading).** First navigation on a slow link shows the same silhouette — header, then nothing — for the duration of the chunk fetch, with no skeleton or spinner. The manual chunk split (`vite.config.ts:40-56`, recording an 854 kB pre-split index) means these are not trivial fetches.

**Falsifier.** Any of the four handlers existing, or a route-level `<Suspense>` inside a view. The grep is exhaustive over `src/` and returns nothing. This is the axis's *state coverage (empty/error/loading)* row, and at the shell it is empty in both directions.

### M-5 · `role="button"` div activates on Enter but not Space — and on touch the attribution card is unreachable

**Severity:** MAJOR · **Provenance:** `AppHeader.vue:59-70`

```
:59   <div class="logo-trigger relative shrink-0" role="button" tabindex="0"
:63        aria-label="Go to paper"
:64        @click.stop="router.push('/paper')"
:65        @keydown.enter="router.push('/paper')">
```

ARIA APG requires a `role="button"` to activate on **both** Enter and Space; only Enter is bound. reka's `HoverCardTrigger` wraps it with `as-child` (`:58`), which forwards to the child and adds no activation keys — its own default (`as: "a"`, confirmed at `node_modules/reka-ui/dist/HoverCard/HoverCardTrigger.js`, `props.as.default = "a"`) is overridden, so the rendered element stays a plain `<div>` with no native semantics.

**Failure scenario (keyboard).** A keyboard user tabs to the wordmark, presses Space expecting activation, and the page scrolls instead (Space's default on a non-button). Nothing navigates.

**Failure scenario (touch), compound.** `grep -rn "github.com" src/` returns **exactly two hits, both inside this hover card** — `:88` (the maintainer profile) and `:99` (the project repo). They are the app's only outbound attribution links. reka's `HoverCard` opens on `pointerenter` behind an `excludeTouch` guard (imported at `HoverCardTrigger.js` line 5) and on focus. On a phone, tapping the wordmark fires `@click.stop="router.push('/paper')"` (`:64`) and navigates away. The maintainer credit and the repository link are, in practice, desktop-hover-only.

**Falsifier.** A `@keydown.space.prevent` binding, a global keydown delegate, or a `<button>`/`<RouterLink>` in place of the div — none present. A second GitHub link elsewhere (a footer, an About view) would defuse the compound half — the grep says there is none.
**UNPROVEN-NEEDS-LIVE:** the exact touch behaviour of `excludeTouch` + focus-on-tap across iOS Safari and Chrome Android. The `excludeTouch` import and the competing `@click` navigation are source-decidable.

### M-6 · The safe-area inset is applied to the wrong box, and it defeats the shell's own overflow lock

**Severity:** MAJOR · **Provenance:** `App.vue:24`, `App.vue:26`, `style.css:20-26`, `index.html:5`

The shell is a viewport-locked app frame: `h-dvh … overflow-hidden` (`App.vue:24`), with `<main>` (`:26`, `overflow-y-auto`) as the sole scroll container — a deliberate and good decision. `index.html:5` opts into the display cutout with `viewport-fit=cover`. Then:

```
style.css:20-21   html, body { … min-height: 100dvh; }
style.css:24-26   body { padding-bottom: env(safe-area-inset-bottom); }
```

The inset is on `<body>` — **outside** the shell. Two consequences follow from the box model alone:

1. **It does not do its job.** The scrolling content lives inside `<main>`, whose box is bounded by the `h-dvh` shell. Body padding is applied *below* that box, so the last line of a scrolled paper section still lands under the home indicator. The intended protection never reaches the content it was written for.
2. **It reintroduces exactly what `overflow-hidden` was there to prevent.** `body` becomes `100dvh + inset` tall against `html { min-height: 100dvh }`, so the document's scrollHeight exceeds the viewport by precisely the inset. The page gains a phantom document-level scroll — the rubber-band the shell's `overflow-hidden` exists to suppress. `100dvh` already resolves against the full cutout-inclusive viewport under `viewport-fit=cover`; the padding is purely additive.

**Falsifier.** `#app` or `body` carrying `overflow: hidden` would suppress (2) — `grep -rn "#app" src/` → empty, and `style.css` sets no overflow. The shell using `h-[calc(100dvh-env(safe-area-inset-bottom))]`, or `<main>` carrying `pb-[env(safe-area-inset-bottom)]`, would fix (1) — the class list at `App.vue:24,26` is verbatim above and does neither.
**UNPROVEN-NEEDS-LIVE:** the phantom-scroll magnitude (device, orientation and DPR dependent). The box arithmetic is source-decidable.

### M-7 · The toast anchor is inherited, and on mobile the inherited default covers the header

**Severity:** MAJOR · **Provenance:** `App.vue:29`; `node_modules/@mkbabb/glass-ui/dist/Toaster-Bm_HQSpc.js`; `dist/styles/tokens/scheme-motion.css:341,347`

`App.vue:29` mounts `<Toaster />` with no `position`. The installed default is `bottom-right` (`props: { position: { default: "bottom-right" } }` in the dist bundle), whose viewport class composes to:

```
fixed top-0 z-toast flex max-h-screen w-full   flex-col-reverse   p-4   sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col   md:max-w-[420px]
```

Every anchoring token in that string is `sm:`-prefixed. **Below 640px none of them apply**, so the viewport is `fixed top-0 w-full p-4` — full-bleed across the top of the screen. `--z-toast: 160` against the header's `--z-overlay: 50` (`scheme-motion.css:347`, `:341`; the header claims it at `AppHeader.vue:54`), so the toast paints over the entire `AppHeader`. There is no safe-area handling anywhere in the component (`/safe-area/.test(dist)` → `false`).

**Failure scenario.** A user on a phone saves a visualization. `useToast.ts:24-28` fires a success toast. It lands full-width at the top of the screen, occluding the wordmark, the nav trigger, and the dark-mode toggle for the toast's duration. The same user on a laptop gets a 420px card in the bottom-right corner. The anchor flips *sides of the screen* across one breakpoint — a discontinuity the shell never chose and, at 32 lines, never noticed it was choosing.

**Falsifier.** An explicit `position` at `App.vue:29` (`top-center` is the coherent choice for a header-bearing app; `bottom-center` if the intent is to stay clear of the header) makes the anchor deliberate. It is absent. Also false if the app never toasts — `useToast.ts:21-29` routes every error/info/success through this Toaster.

This defect is the exact inverse of superlative **S-4** one line above it in the same template: `TooltipProvider` had its producer defaults interrogated and overridden; `Toaster`, on the next line, had them inherited whole.

---

## MINOR

### m-1 · `prefers-reduced-motion` is sampled once at setup and never again

**Severity:** MINOR · **Provenance:** `SvgFilters.vue:7-9`, `:20-21`, `:24`, `:36`

```
:7   const reducedMotion =
:8       typeof window !== "undefined" &&
:9       window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

A plain `const`, evaluated once at component setup. `SvgFilters` mounts with `App` and never unmounts, so this is a boot-time snapshot for the session's lifetime. `grep -n "addEventListener" src/components/decorative/SvgFilters.vue` → none.

**Failure scenario.** A user enables *Reduce Motion* mid-session — commonly *because* the title boil is bothering them. The two boil animators keep writing `baseFrequency` at ~6.7fps and ~6.25fps until the page is reloaded. The repo already knows the live-query form: `router/index.ts:15-17` defines `prefersReducedMotion()` as a function and re-evaluates per navigation. `@vueuse/core` (`package.json:16`) ships `useMediaQuery`, which is the one-line KISS cure.

**Second-order.** `useLineBoil(boilOffsets.length, 150)` and `useLineBoil(wobbleOffsets.length, 160)` (`:20-21`) keep **ticking** under reduce — only the DOM write is skipped, by the early returns at `:24` and `:36`. Two timers plus two watcher wakeups every ~155ms produce no visual effect at all. lane-frontend §8's PRM table credits `SvgFilters.vue:7-9,24,36` as a JS gate; the credit is right about the paint and silent about the clock.

### m-2 · The `MutationObserver` is never disconnected and is not narrowed

**Severity:** MINOR · **Provenance:** `App.vue:13-17`

```
:13   const observer = new MutationObserver(() => resolveVizColors());
:14   observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
```

`grep -n "onUnmounted\|disconnect" src/App.vue` → empty. The `attributeFilter` is good hygiene; the missing teardown is not. Two costs: (a) in dev, every HMR edit of `App.vue` adds another observer over the same node, each firing a full re-resolve; (b) each firing performs five synchronous `getComputedStyle(document.documentElement)` reads (`lib/colors.ts:23-25` × the five calls at `:69-73`) — a forced style recalculation per `<html>` class mutation, from *any* source, not only the dark toggle.

**Failure scenario.** Bounded in production, because App unmounts only on teardown — this is filed MINOR, not MAJOR, for exactly that reason. It is a leak-shaped idiom in the one component where the shape is harmless, which is how the idiom propagates to components where it is not.

**Falsifier.** An `onUnmounted(() => observer.disconnect())`, or a `useMutationObserver` from `@vueuse/core` (already a dependency, and it auto-disposes on scope teardown). Neither present.

### m-3 · Hover feedback on the primary nav control dims it, and reaches almost nothing

**Severity:** MINOR · **Provenance:** `AppHeader.vue:184-186`, `:193-199`, `:206-212`

```
:184   .nav-trigger:hover { color: color-mix(in srgb, var(--foreground) 70%, transparent); }
```

Two faults in one rule. First, the direction is inverted: hover **reduces** the control's ink to 70% alpha. Hover should raise salience, not lower it; a control that fades when you point at it reads as *disabling*, not *ready*. Second, it reaches nothing: `.nav-trigger-icon` sets its own `color: var(--viz-amber)` (`:197`), the label is `display:none` (M-1), so `currentColor` on this element resolves only through `.nav-trigger-chevron`, already at `opacity: 0.5` (`:209`). Net hover delta ≈ a 30% alpha change on a half-transparent 16px glyph.

**Failure scenario.** A pointer user hovers the app's main navigation affordance and gets no perceptible feedback that it is interactive. The rule block at `:170-191` has no background, no scale, no border, no shadow on hover.

**Falsifier.** Any additional hover channel on `.nav-trigger` — the block is quoted in full in the read closure and has none. (`:188-191` correctly supplies `:focus-visible`, which is why this is MINOR rather than MAJOR: the keyboard affordance is intact.)

### m-4 · Twenty-four lines of dead motion CSS, documenting a component that is gone

**Severity:** MINOR · **Provenance:** `AppHeader.vue:278-301`

`.share-pop-enter-active`, `.share-pop-leave-active`, `.share-pop-enter-from`, `.share-pop-leave-to` (`:279-292`) and `.fade-enter-active`/`.fade-leave-active`/`.fade-enter-from`/`.fade-leave-to` (`:294-301`) are Vue `<Transition>` name-classes. The template (`:53-145`) contains **no `<Transition>` element at all**. The comment at `:278` — *"Share button enter/leave (A.W3.d — bezier→`--ease-apple-spring`)"* — documents a share button that no longer exists in this file, and the tranche-provenance annotation makes the dead code read as maintained.

**Failure scenario.** The next author reads `:278-292`, believes the header owns a share affordance with a tuned spring curve, and either preserves it through a refactor or hunts for the missing markup. Both cost time; neither produces pixels.

**Falsifier.** `grep -n "Transition" src/components/layout/AppHeader.vue` over the template range → nothing.

### m-5 · No `prefers-reduced-motion` carve in the header, against an otherwise explicit repo policy

**Severity:** MINOR · **Provenance:** `AppHeader.vue:180`, `:206-216`

`.nav-trigger { transition: color 0.15s ease }` (`:180`) and `.nav-trigger-chevron { transition: transform 0.2s ease }` (`:211`) driving a 180° rotate at `:214-216`. `grep -n "prefers-reduced" src/components/layout/AppHeader.vue` → **none**.

The repo's policy is not implicit: lane-frontend §8 enumerates eight `@media (prefers-reduced-motion: reduce)` blocks across eight components, plus one at `style.css:92`, plus three JS gates, and `GalleryMarquee.vue:126-128` names the provenance (*"D.W4.c … WCAG 2.3.3 / A3 #9 finding"*). The header — the one chrome element present on all eight routes — is the gap.

Filed MINOR because a 180° chevron rotation over 200ms is small, non-parallax, non-vestibular motion; the defect is the policy hole, not the pixels.

**Falsifier.** A reduce block anywhere in the two `<style>` blocks (`:147-302`, `:305-354`) — there is none.

### m-6 · Token-bypass cluster in the header's geometry

**Severity:** MINOR · **Provenance:** `AppHeader.vue:157`, `:175`, `:234`

Three hand-picked magnitudes where glass-ui exposes a scale:

| Site | Value | Off what |
|---|---|---|
| `:157` | `padding: 0.5rem 0.625rem` | 10px is off the 4px `--spacing` rhythm (8 / 12 are the neighbours) |
| `:175` | `border-radius: 0.4375rem` | 7px, while glass-ui ships a `--radius-*` family (`dist/styles/theme/radius.css`) |
| `:234` | `width: 1.5px` on `.header-divider` | a sub-device-pixel rule at DPR 1 — the rasteriser either snaps it to 1px or renders a blurred 2px, non-deterministically across zoom levels |

**Failure scenario.** Aristotelian proportion is a property of a *system*: the header's inline rhythm (10px mobile / 24px desktop) does not divide against the rhythm every other surface in the app inherits from `--spacing`, so the header's optical margin reads as "nearly aligned" with the content below it rather than aligned. The 1.5px divider is the visible one: at DPR 1 it is a hairline that changes weight when the user zooms.

**Falsifier.** Any of the three matching a glass-ui token. None do. (glass-ui itself uses `1.5px` deliberately on `.dock-plate`'s border — but that rule sits over a `backdrop-filter` plate that hides the rasterisation; a bare divider has no such cover.)

### m-7 · Touch-target proportion is inverted between breakpoints

**Severity:** MINOR · **Provenance:** `AppHeader.vue:241-243`, `:255-257`, `:170-181`, `:261-271`

```
:241   .dark-mode-toggle { --toggle-size: 2.5rem; }                        /* base = MOBILE  → 40px */
:255   @media (min-width: 640px) { .dark-mode-toggle { --toggle-size: 2.75rem; } }  /* ≥640 = POINTER → 44px */
```

The mobile-first base is the **touch** case and gets the **smaller** target; the ≥640px case is the **pointer** case and gets the larger. Touch needs the bigger hit area; the sizes run backwards. `DarkModeToggle.vue:1-14` renders a bare `<button class="sun-moon-toggle">` sized entirely by `--toggle-size`, so there is no compensating padding.

Neighbours: `.nav-trigger` computes to 1.5rem icon + 2 × 0.25rem padding = **2rem (32px)** at every viewport (`:174`, `:194-195`); `.admin-badge` is **1.75rem (28px)** (`:264-266`). All three clear WCAG 2.5.8 AA (24px); all three miss the 44px AAA / Apple HIG floor — on the device class where the floor exists.

**Falsifier.** A pseudo-element hit-area extension or padding on any of the three. `DarkModeToggle.vue`'s template is quoted above and has none; `.admin-badge` (`:261-271`) is a fixed-size flex box; `.nav-trigger`'s only padding is the 0.25rem.

### m-8 · Legend and curve disagree — `basisDisplay` snapshots `VIZ_COLORS` before `App.vue:11` ever runs

**Severity:** MINOR · **Provenance:** `lib/basis-display.ts:1-7`; `App.vue:11`; `lib/colors.ts:77-86`

```ts
import { VIZ_COLORS } from "@/lib/colors";
export const basisDisplay: Record<string, {icon:string; label:string; color:string}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },     // ← read at module evaluation
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre },
};
```

`VIZ_COLORS` is a `reactive()` object (`lib/colors.ts:77`), but `basisDisplay` reads three properties into a **plain object literal at module-evaluation time** — before `App.vue:11`'s `onMounted` runs, and outside any reactive effect. The legend is frozen at the initial literals (`#bf4040`, `#3d72b8`, `#9545b8`, `lib/colors.ts:78-80`).

**Failure scenario.** Two failures, and they survive each other's fixes. *Today:* the legend shows the three brand hues while the canvas strokes `#888888` (B-1) — the legend actively lies about the curve. *After B-1 is fixed:* the legend still shows the hard-coded literals while the canvas shows the resolved token values, which differ (`#9545b8` vs `oklch(0.532 0.180 317.5)` ≈ a visibly different violet), and the legend still never re-tints on a dark-mode flip while every canvas does.

Filed here rather than under a `basis-display` challenge because `lib/colors.ts` is `App.vue`'s import and this is the failure mode of the export contract `App.vue:11` is the sole writer of: a `reactive()` export whose consumers are not all reactive readers.

**Falsifier.** `basisDisplay` being a `computed`/`reactive` — it is a `Record<…>` object literal, quoted in full above.

### m-9 · Stale brand-cohesion comment in the header's most characterful element

**Severity:** MINOR · **Provenance:** `DarkModeToggle.vue:30-31`; `lib/colors.ts:16`, `:80`

```
:30   // Sun: warm orange   Moon: legendre purple
:31   const MOON_COLOR = [192, 132, 252] as const; // #c084fc — matches VIZ_COLORS.legendre
```

It does not match. `VIZ_COLORS.legendre` is `#9545b8` (`lib/colors.ts:80`) and resolves from `--viz-legendre` = `oklch(0.532 0.180 317.5)`. `#c084fc` is `STATIC.rainbow[4]` (`lib/colors.ts:16`) — a different palette entirely, and one that is never section-derived.

**Failure scenario.** The header's signature element — the sun↔moon Fourier morph that CENSUS §3a singles out as fourier's *characterful* shadow ("keep, reconcile") — is tuned against a colour the semantic palette does not hold, while its comment asserts cohesion. Anyone re-tuning the palette will trust the comment and leave the toggle behind.

**Falsifier.** `grep -n "9545b8\|c084fc" src/lib/colors.ts` → `#c084fc` at `:16` (inside `rainbow`), `#9545b8` at `:80` (legendre). Two different constants.

---

## INFO

### i-2 · Five of eight routes render inside `<main>` with no `<h1>`

**Severity:** INFO (route-owned; carried) · **Provenance:** `App.vue:26`

`grep -rn "<h1" src/` → three hits: `PaperView.vue:353`, `FourierMorphDemo.vue:5`, `FourierShapeExtractor.vue:3`. `/visualize`, `/v/:visualizationSlug`, `/w/:imageSlug`, `/gallery`, `/equation` mint no top-level heading. Filed INFO because the heading belongs to the view, not the shell — but it compounds M-3 exactly: an SR user gets neither a focus move nor a heading to land on. **Carry to the per-route component challenges** (`VisualizationView`, `GalleryView`, `EquationView`).

### i-3 · `.admin-badge` has no accessible name

**Severity:** INFO · **Provenance:** `AppHeader.vue:137-139`

```
:137   <div v-if="galleryStore.adminMode" class="admin-badge" title="Admin mode active">
:138       <Shield :size="14" />
```

A `title` on a non-interactive, non-focusable `<div>` is inconsistently exposed to assistive tech and is unreachable by keyboard or touch. The lucide `<Shield>` contributes no name. A user in admin mode who cannot see the icon has no way to learn that a privileged mode is active — and `galleryStore.adminMode` changes what the gallery surfaces do. Filed INFO rather than MINOR because it is a state indicator, not a control; the cure is an `aria-label` plus `role="status"`, or an `.sr-only` span. **Falsifier:** an `aria-label`/`sr-only` on the element — neither present.

---

## Falsifiers that ran and cleared (L-18, the other direction)

**F-1 · Dropdown item contrast — CHECKED, PASSES BOTH ARMS.** `.nav-dropdown-item { color: color-mix(in srgb, var(--foreground) 60%, transparent) }` (`AppHeader.vue:325`) at 1rem/500 over `--popover`. Computed from the installed tokens:

| Arm | fg | popover | composite | ratio |
|---|---|---|---|---|
| light | `hsl(24 10% 10%)` ≈ rgb(28,25,23) (`color-radius.css:58`) | `hsl(36 48% 97%)` ≈ rgb(251,248,244) (`:72,74`) | rgb(117,114,111), L=0.1697 vs 0.9418 | **4.52 : 1** ✓ AA |
| dark | `hsl(48 10% 90%)` ≈ rgb(232,231,227) (`dark-arm.css:60`) | `hsl(24 8% 16%)` ≈ rgb(44,40,38) (`:65`) | rgb(157,155,151), L=0.3285 vs 0.0219 | **5.26 : 1** ✓ AA |

The suspicion (60% alpha ink on a menu) does **not** convict. Two riders worth banking: the light arm clears 4.5:1 by ~0.4%, i.e. essentially no margin; and the panel is a glass surface (translucent fill + `backdrop-filter` + a grain `::after` at `mix-blend-mode: overlay`), so the true composite backdrop is not the opaque `--popover` — over a dark canvas the light-arm ratio can fall under 4.5. **UNPROVEN-NEEDS-LIVE:** an SS-13 contrast probe with the nav menu open over `/visualize`.

**F-2 · The `cartoon-card` shim survives the uplift — CHECKED, SAFE.** `style.css:107-112` re-binds the C.W5-removed `.cartoon-card` onto `@apply cartoon-surface`. `cartoon-surface` is still a live `@utility` at producer 7.0.0 (present in the 7.0.0 `@utility` roster). The shim is not a second B-2. It remains a held upstream carry (CENSUS §9 row 8), but it will not break at F.W1.

---

## Superlatives

### S-1 · One `<main>`, and only one, across 66 SFCs and 8 routes

`grep -rn "<main" src/` → **exactly one hit: `App.vue:26`.** No view mints a competing or nested landmark, and none sets `role="main"`. The single commonest SPA landmark defect — duplicate `main` elements from per-view layout wrappers — is absent *by construction*, because the shell claimed the landmark and every view accepted the constraint. In a codebase with eight lazily-loaded route components authored across multiple tranches, that discipline held. **Falsifier:** a second `<main>` or a `role="main"` anywhere — the grep is exhaustive and returns one.

### S-2 · `<Toaster/>` is correctly hoisted out of the glass shell

`App.vue:29` places `<Toaster/>` as a root sibling — outside the `TooltipProvider` and outside the `h-dvh … overflow-hidden` div. This is precisely the guard the producer documents at `glass-ui/src/components/toast/Toaster.vue:110-120`: *"any ancestor with `backdrop-filter` (or `filter`/`transform`/`will-change`) establishes a CONTAINING BLOCK for fixed descendants, so the viewport's `bottom-0`/`right-0` resolve against the glass card, not the viewport."* `AppHeader.vue:54` is exactly such an ancestor (`backdrop-blur-md`). The component's `ToastPortal` also teleports to `<body>` (confirmed present in the installed 4.0.0 dist), so this is belt-and-braces — but the placement is independently right, and it is right for the reason the producer names. **Falsifier:** `<Toaster/>` nested inside the shell div, where a less careful author would put it. It is not.

### S-3 · Zero third-party origins, honoured all the way down to the header's avatar

`index.html:10-13` preloads three same-origin Computer Modern faces; `:19` links a self-hosted `/fonts.css`; `main.ts:5` bundler-imports KaTeX's stylesheet so it ships fingerprinted and same-origin (with `style.css:53-62` recording, in full, why the earlier `local()`-only `@font-face` overrides were a *phantom* that silently degraded the regular weight — a deleted defect documented rather than quietly removed). The header's hover card completes it: `AppHeader.vue:74-85` serves the maintainer avatar from `${baseUrl}assets/`, with a comment retiring the `avatars.githubusercontent.com` handshake, and ships `width`/`height`/`decoding="async"` with an 80px source in a 40px box for 2× density — four things most avatars get wrong, right. **Falsifier:** any `http(s)://` subresource in the shell closure. The only external URLs are the two `target="_blank" rel="noopener noreferrer"` GitHub anchors (`:88`, `:99`) — navigations, not subresources.

### S-4 · `TooltipProvider` is interrogated, not inherited — and tuned to the measured callsite density

`App.vue:23` passes `:delay-duration="400" :skip-delay-duration="200"` against producer defaults of **700 / 300** (`glass-ui/src/components/tooltip/TooltipProvider.vue:13-16`). Both are overridden, both downward, and both correctly: intake row **R3-7a** (ADOPT-AS-FACT, re-derived live) measures **35 Tooltip callsites over 9 consumers** — `CanvasControlsDock` 6, `ContourSettings` 6, `EditorControlsDock` 10, `AnimationControls` 4. On an instrument surface that dense, 700ms reads as unresponsive and 300ms of skip-grace makes scanning a control dock feel gated; 400/200 is fast enough for a dock and slow enough not to fire on pointer transit. This is the one place in the shell where a producer default was measured against the app's own geometry rather than accepted. **Falsifier:** the props being absent, or set equal to the defaults — neither. **The contrast is one line away:** `<Toaster/>` at `:29` inherits its default whole, to the app's cost (M-7). The shell knows how to interrogate a default; it did it once out of two chances.

### S-5 · Brand utilities are consumed from the producer, not forked — in the one place forking is most tempting

`AppHeader.vue:67` applies `cm-serif`, `:68` applies `fourier-f` to the ℱ glyph, `:91` applies `fira-code`. All three are producer `@utility` recipes, present in **both** pins: `4.0.0 dist/styles/typography/utilities.css:65, 69, 77`, and all three survive to 7.0.0 (`fourier-f` is in the current producer `@utility` roster). glass-ui carries a *fourier-specific* glyph utility upstream, and fourier consumes it rather than re-declaring the font stack in a scoped block — the glass-ui-first precept honoured on the app's own wordmark, which is the single most fork-prone surface in any consumer. **Falsifier:** a local `.cm-serif`/`.fourier-f` declaration. `grep -rn "\.cm-serif\|\.fourier-f" src/` → one hit, `PaperArticleWindow.vue:208`, and it is a *descendant* selector (`.callout-btn .fourier-f`) styling the producer utility in context, not redefining it. The distinction is the whole point, and the tree gets it right.

---

## Carries

| # | Finding | Home | Note |
|---|---|---|---|
| C-1 | **B-1** viz palette collapses to `#888888` | **F.W-COLOR (new, P0)** | Live at the installed pin — this is not an uplift defect, it ships today. Interim cure: an `oklch(` branch or a canvas round-trip in `lib/colors.ts`. Strategic cure: fold onto value.js `parseCssColor` — **gated on V·π** (parser-proof R1). |
| C-2 | **B-2** `.paper-texture` absent at 7.0.0 | **F.W1 (P0), scope expansion** | The census break surface is import-shaped only. **Add a CSS-class census** before the bump: grep every glass-ui-owned class fourier applies, diff against the 7.0.0 `@layer components` + `@utility` roster. `.cartoon-card` (`style.css:107`) is the precedent; `.paper-texture` is the second instance found by reading one 32-line file. |
| C-3 | **M-2/M-3/M-4** shell a11y + state coverage | **F.W3 (P1)** | Four omissions, one seat: skip link + `id`/`tabindex` on `<main>`, `afterEach` focus move + live region, `router.onError` + `app.config.errorHandler` + a chunk-failure surface. All land in `App.vue` and `router/index.ts`. |
| C-4 | **M-1** dead nav label | **F.W3 (P1)** | Two-line fix at `AppHeader.vue:218-222`; the no-op media query is the marker. |
| C-5 | **M-5/M-7/m-3/m-7** header affordances | **F.W3 (P2)** | Space-key activation + a touch path to the attribution links; an explicit `Toaster position`; a real hover channel; un-invert the toggle sizes. |
| C-6 | **M-6** safe-area on the wrong box | **F.W3 (P2)** | Move the inset from `body` to `<main>` (or into the `h-dvh` calc). |
| C-7 | **m-1/m-5** PRM coverage | joins CENSUS §9 row 9 (P3) | The existing carry names `stores/animation.ts` + `ConvergencePlot.vue`; **add** `SvgFilters.vue` (static capture + ungated clocks) and `AppHeader.vue` (no reduce block). |
| C-8 | **m-8/m-9** palette cohesion | **F.W-COLOR (P2)** | `basisDisplay` must be `computed`; `MOON_COLOR` reconciled against the real legendre token or its comment corrected. |
| C-9 | **m-2/m-4/m-6** hygiene | **F.W3 (P3)** | Observer teardown; delete 24 lines of dead transition CSS; three magnitudes onto tokens. |
| C-10 | **F-1** light-arm menu contrast at 4.52:1 over glass | **SS-13 live probe** | Source-decidable arithmetic says pass with ~0.4% margin; the glass composite is not source-decidable. |

**SS-13 live-probe list (three items):** B-1's painted grey on `/visualize`; M-6's phantom scroll on a notched iOS device; F-1's menu contrast over a dark canvas. Everything else above is decided by the tree.
