claude-opus-5[1m] (served model id)

# CHALLENGE — fourier-analysis `App` · axis **C · CONSUMPTION**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/App.vue` (32 lines, read whole).
**Axis.** How this component consumes `@mkbabb/value.js` (0.13.0 pinned), `@mkbabb/keyframes.js` (4.3.0),
`@mkbabb/glass-ui` (^4.0.0 / 4.0.0 installed), and the fourier API (45 operations); props/emits contract
quality; integration seams.

**Read (read-only, whole):** `App.vue` · `main.ts` · `router/index.ts` · `style.css` · `lib/colors.ts` ·
`components/layout/AppHeader.vue` · `components/decorative/SvgFilters.vue` · `components/layout/DarkModeToggle.vue`
(head) · `components/visualization/lib/basis-display.ts` · `components/equation/composables/useCoeffHover.ts`
(§popoverHtml) · `stores/{workspace,gallery,auth}.ts` (setup surfaces) · `components/visualization/gallery/UserSlugBar.vue`
(imports) · `web/package.json` · `web/index.html` · producer `glass-ui/src/components/{tooltip,toast}/index.ts` +
`TooltipProvider.vue` + `toast/Toaster.vue` · installed `glass-ui/dist/styles/{index,cards,tokens.css,tokens/*}` ·
installed `@mkbabb/value.js@0.13.0` (`package.json`, `dist/index.d.ts`, `dist/value.js`) · producer `value.js/package.json`.

**Posture.** Presumed DEFECTIVE until the tree proved otherwise. No browser tooling; every claim below is
static or source-derived. Livable-only consequences are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Tally.** 13 defects — **2 BLOCKER**, 4 MAJOR, 4 MINOR, 3 INFO. **3 superlatives** (each with its own falsifier).

---

## §0 — The one-paragraph verdict

App.vue is 32 lines. It has **one** line of behaviour (`resolveVizColors()`, `:11`) and **one** line of
standing behaviour (a `MutationObserver`, `:13`). Both are wired to the same subsystem, and at the
**currently installed** glass-ui that subsystem is a **net-negative operation**: it overwrites four of the
five hand-picked visualization palette hexes with `#888888`. The capability that would make it correct —
an `oklch()` and a `light-dark()` color parser — is **already installed, in this repo, at the pinned
version**, in the very package this axis is about (`@mkbabb/value.js@0.13.0`), and App.vue imports it zero
times. The component's glass-ui consumption, by contrast, is exemplary and uplift-safe. So: the glass-ui
seam is the best in the file, the value.js seam is the worst thing in the component, and everything else
App.vue does is ambient global side-effect with no typed contract and no error boundary.

---

## §1 — BLOCKERS

### C-1 · [BLOCKER] `resolveVizColors()` — App.vue's sole behaviour — destroys 4 of 5 palette entries at the installed glass-ui

**Provenance.**
- `web/src/App.vue:11` — `resolveVizColors();` inside `onMounted`.
- `web/src/lib/colors.ts:90-95` — the function sets `VIZ_COLORS.{fourier,chebyshev,legendre,amber,green}` from
  `cssVarToHex("--viz-*")`.
- `web/src/lib/colors.ts:22-54` — `cssVarToHex` recognises exactly four input shapes: leading `#`
  (`:29`), `hsl(h[ ,]s%[ ,]l%)` (`:32-38`), a bare Tailwind HSL triplet `^h s% l%$` (`:40-44`), and
  `rgb(r, g, b)` **comma-form only** (`:46-52`). Every other shape falls through to
  **`return "#888888";`** at `:53` (and `:26` when the property is empty).
- Installed producer tokens — `web/node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263-267`:
  ```
  --viz-fourier:   oklch(0.579 0.201 30.4);
  --viz-chebyshev: oklch(0.484 0.163 265.5);
  --viz-legendre:  oklch(0.532 0.180 317.5);
  --viz-amber:     var(--section-color-5);
  --viz-green:     var(--section-color-4);
  ```
- …overridden later in the same cascade by `tokens/light-dark.css:145-147`, inside
  `@supports (color: light-dark(white, black)) { :root { … } }` (`:71-72`):
  ```
  --viz-fourier:   light-dark(oklch(0.579 0.201 30.4),  oklch(0.693 0.151 28.1));
  --viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4));
  --viz-legendre:  light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1));
  ```
  Cascade order is fixed by `dist/styles/tokens.css:27` (`color-radius.css`) → `:32` (`light-dark.css`);
  both target `:root`, so the later declaration wins in every engine that supports `light-dark()`.
- `--viz-green` is `var(--section-color-4)`, defined at `color-radius.css:245` /
  `light-dark.css:130` — again `oklch(…)` / `light-dark(oklch(…), oklch(…))`.
- **No `@property` registration exists for any `--viz-*` or `--section-color-*`**:
  `grep -n -- "viz-fourier|viz-amber|section-color" dist/styles/tokens/property-regs.css` → **0 hits**
  (the file carries 16 `@property` rules, none of them these). Unregistered custom properties compute to
  their **token stream with `var()` substituted** — they are not coerced to `rgb()`, and `light-dark()`
  is not resolved. So `getComputedStyle(document.documentElement).getPropertyValue("--viz-fourier")`
  returns the literal string `light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))`
  (or, on a pre-`light-dark()` engine, `oklch(0.579 0.201 30.4)`).

**The defect.** Neither string starts with `#`, matches `hsl(`, matches `^h s% l%$`, nor matches
`rgb(r, g, b)`. Both fall to `colors.ts:53`. Therefore, the instant `App.vue:11` runs:

| entry | default at `colors.ts:78-82` | after `resolveVizColors()` |
|---|---|---|
| `fourier` | `#bf4040` | **`#888888`** |
| `chebyshev` | `#3d72b8` | **`#888888`** |
| `legendre` | `#9545b8` | **`#888888`** |
| `green` | `#4d8f66` | **`#888888`** |
| `amber` | `#b37a2d` | `#9d6415` ✓ (survives — see below) |

`amber` survives **only by accident of a local override**: fourier's own `web/src/style.css:119-121`
(`:root`) and `:123-126` (`.dark`) re-declare `--viz-amber: hsl(35 76% 35%)` / `hsl(37 73% 67%)` for an
unrelated WCAG reason (the `D.W4.d` carry, comment at `style.css:113`), and those rules sit after the
`@import "@mkbabb/glass-ui/styles"` at `style.css:3`. It is the `hsl()` arm at `colors.ts:32-38` that
catches it. `--viz-green` was **not** given the same rescue: the override block sets `--viz-amber` and
`--section-color-5` only (`style.css:120-121`, `:125-126`) — never `--section-color-4` — so green falls.

Downstream, this is the whole visualization: `BasisCanvas.vue:127,172,326`, `canvas-drawing/epicycles.ts:258,283`,
`canvas-drawing/labels.ts:89`, `BasisSelector.vue:176,203`, `EditorControlsDock.vue:123`,
`HarmonicLevelGrid.vue:25,48`, `GalleryCardModal.vue:150`, `basis-display.ts:4-6`.

**Severity rationale.** App.vue's only executable statement makes the product strictly worse than doing
nothing. Deleting `App.vue:11` would *restore* the correct palette. That is the definition of a blocker on
a consumption axis.

**Falsifier (and why it does not fire).** The claim dies if any one of: (a) a `@property` registration for
`--viz-*` exists with `syntax:"<color>"` → checked, absent; (b) the token is `hsl()`/`rgb()`/hex at the
installed version → checked, it is `oklch()`/`light-dark()`; (c) fourier overrides `--viz-fourier`
locally as it does `--viz-amber` → checked, `grep -n -- "--viz-" web/src/style.css` yields only
`--viz-amber` and `--section-color-5`; (d) `cssVarToHex` has a fifth arm → read whole, it does not.
Even under (a), a registered `<color>` serialises as `oklch(…)`, which `cssVarToHex` still cannot parse —
the blocker survives its strongest falsifier.

**UNPROVEN-NEEDS-LIVE (SS-13).** The *rendered* consequence — grey epicycles/basis paths on the live
canvas — is a browser observation. The code path to `#888888` is static and confirmed.

**Corpus.** CENSUS-2026-08-03.md:174 already records "`web/src/lib/colors.ts`, no `oklch()` arm" — but
scores it as a **style/spec** carry ("the exact deletion target of W.L5 item 2"). **I contradict the
severity, not the fact:** at the installed glass-ui this is not a to-spec cleanup, it is a live shipping
color regression, and it is authored *by App.vue*.

---

### C-2 · [BLOCKER] The cure is already installed and unimported — value.js 0.13.0 parses **both** failing forms; App.vue imports value.js zero times

**Provenance.**
- `web/src/App.vue:1-8` — the complete import list. `@mkbabb/value.js` appears **zero** times.
- `web/package.json:18` → `"@mkbabb/value.js": "^0.13.0"` (glass-ui at `:14`, keyframes at `:15`).
- Installed `web/node_modules/@mkbabb/value.js/package.json` → `"version": "0.13.0"`, `exports` keys: **`.`** (root only).
- Installed `dist/index.d.ts` exports, from the sole root entry:
  `parseCSSColor`, `CSSColor`, `type ParsedColorUnit` (from `./parsing/color`);
  `Color, RGBColor, HSLColor, OKLABColor, OKLCHColor, …` (from `./units/color`);
  `color2, gamutMap, mixColors` (`./units/color/dispatch`);
  `normalizeColorUnit, colorUnit2` (`./units/color/normalize`);
  `oklabToRgb255, gamutMapSRGB, rawOklchToOklab` (`./units/color/gamut`).
- `dist/value.js` — `grep -c "oklch"` → **31**; the parser carries a literal `light-dark` arm:
  `… $a = H("light-dark").next(t(e.lazy(() => no).skip(Da), e.lazy(() => no)).trim(…` .

**The defect.** The two exact syntaxes that break `cssVarToHex` (C-1) — `oklch()` and `light-dark()` — are
**both** handled by the color parser of the package that is already in `web/node_modules`, already in
`web/package.json:18`, and already imported by four sibling files in the same
repo (`lib/easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — the
census's "5 sites, easing-only"). fourier ships a **117-line hand-rolled fork of a capability it has
installed**, and App.vue is the sole caller that activates the broken half of that fork.

**Sequencing contradiction with the corpus (stated explicitly).** CENSUS-2026-08-03.md:184-189 sequences
**F.W1** (atomic tri-package uplift glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0) **before** **F.W2**
("value.js consumption to spec — … delete the `colors.ts` hand-rolled arms"). **That ordering is wrong for
this leg.** The color-parsing capability exists at **0.13.0**, so the `colors.ts` deletion is landable
today, alone, with no uplift and no participation in the tri-package deadlock (lane-frontend.md §5
"🔴 THE RESOLUTION DEADLOCK"). What *is* correctly gated behind F.W1 is the **specifier** half: producer
`value.js@4.0.0`'s `exports` keys are `./color ./value ./css ./easing ./math ./transform ./quantize` — **the
root `.` is gone** — so the five bare-root specifiers become a hard break at 4.0.0 and only then. Two
distinct legs, currently fused into one wave row. Splitting them lets the live C-1 regression be cured
immediately instead of waiting on the riskiest transaction in the formation.

**The right shape (noted, not prescribed).** A `parseCSSColor`-based resolver still cannot read
`light-dark()` out of an *unregistered custom property* by string, because both arms are present in the
token stream. The KISS route is to stop reading the custom property and read a **used value** instead —
assign `color: var(--viz-fourier)` to a probe element, read back the engine-resolved serialisation, and
hand that to `parseCSSColor`. That is one function, and it deletes `cssVarToHex`/`hslToHex`/`rgbToHex`
(`colors.ts:22-74`) outright.

**Falsifier (and why it does not fire).** Dies if (a) 0.13.0's exports lack a color parser → read the
whole `dist/index.d.ts`, it does not; (b) `oklch`/`light-dark` are absent from the 0.13.0 bundle → grepped
the shipped `dist/value.js`, both present; (c) App.vue or `colors.ts` already imports value.js →
`grep -n "value.js" web/src/App.vue web/src/lib/colors.ts` → 0 hits. **Honest caveat that survives:** the
value.js memory ledger records `R1 = live parseCssColor("oklch()") shipping crash` at the value.js
**tranche-U head**, not at 0.13.0. This challenge asserts only that the 0.13.0 **surface** exists and
declares both arms; the *runtime* behaviour of `parseCSSColor("oklch(0.579 0.201 30.4)")` at 0.13.0 is
**UNPROVEN-NEEDS-LIVE** and must be executed before F.W2 commits to it. If it crashes at 0.13.0 too, C-2
converts from "unimported cure" to "the parser mini-tranche V·π is the real prerequisite" — the blocker
stands either way, only its remedy moves.

---

## §2 — MAJOR

### C-3 · [MAJOR] The palette contract is unreachable by design for one consumer class — module-time capture beats `onMounted` resolution, permanently

**Provenance.** `web/src/components/visualization/lib/basis-display.ts:1-7`:
```ts
import { VIZ_COLORS } from "@/lib/colors";
export const basisDisplay: Record<string, {icon:string;label:string;color:string}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre },
};
```
This is a **plain object literal**, not a `computed`/getter. The three `.color` fields are read **once, at
module evaluation**. `main.ts:10` — `router.isReady().then(() => app.mount("#app"))` — guarantees the
initial route's chunk (and everything it imports, including `basis-display.ts`) has evaluated **before**
`App.vue` ever mounts, and therefore before `App.vue:11` runs.

**The defect.** App.vue publishes a contract — "the palette is resolved at mount and re-resolved on theme
flip" (`App.vue:12` comment) — that this consumer cannot honour. `basisDisplay` freezes the hardcoded
defaults and never updates, so **App.vue's `MutationObserver` (`:13-17`) is a no-op for it forever**.
Composed with C-1 the result is *internally incoherent within a single canvas frame*:
`canvas-drawing/labels.ts:39` paints `cfg.color` (→ frozen `#bf4040` red) while `labels.ts:89` paints
`VIZ_COLORS.fourier` (→ `#888888` grey), and `BasisCanvas.vue:257` strokes `cfg.color` while `:326` uses
`VIZ_COLORS.fourier`. Two colours for one basis, in the same draw call.

**Falsifier.** Dies if `basisDisplay` were reactive (a `computed`/getter) — it is not; or if
`basis-display.ts` evaluated after App's `onMounted` — impossible given `main.ts:10` + a lazy route whose
component graph is fully evaluated by `router.isReady()`.

### C-4 · [MAJOR] Resolution is hooked at the wrong lifecycle point — the tree already documents the race in prose instead of fixing it

**Provenance.** `App.vue:10-11` puts `resolveVizColors()` in the **root component's** `onMounted`. Vue
invokes `mounted` **child-first**; every VIZ_COLORS consumer is a descendant of App. There are **12
importing files** (`grep -rn "import { VIZ_COLORS" web/src/`): `BasisCanvas.vue:6`, `BasisSelector.vue:7`,
`ContourSettings.vue:5`, `EditorControlsDock.vue:8`, `GalleryCard.vue:9`, `GalleryCardModal.vue:9`,
`HarmonicLevelGrid.vue:91`, `useCoeffHover.ts:9`, `basis-display.ts:1`, `canvas-drawing/epicycles.ts:5`,
`canvas-drawing/labels.ts:4`, `golden-shimmer.ts:8` — every one of them reachable, and drawable, against
**unresolved defaults** before `App.vue:11` has run.

The tree concedes it in writing — `components/equation/composables/useCoeffHover.ts:61-65`:
> "…the STATIC.golden constant is the canonical fallback used when `resolveVizColors` has not yet run
> (mounted before paint)." → `const amber = VIZ_COLORS.amber || VIZ_COLORS.golden;`

**The defect.** A known ordering hazard has been absorbed as a per-consumer workaround idiom rather than
removed at the source. The resolution is a **pure global bootstrap** with no component dependency: it
belongs in `main.ts` before `app.mount()` (or as a tiny `app.use()` plugin), where it would run exactly
once, before any consumer exists, and the `|| VIZ_COLORS.golden` guard at `useCoeffHover.ts:65` could be
deleted. Hosting it in a 32-line root SFC's `onMounted` is the one placement that guarantees the race.

**Falsifier.** Dies if Vue fired parent `mounted` before child `mounted` (it does not), or if no consumer
read the palette during its own mount — `BasisCanvas.vue` registers an `IntersectionObserver` at `:435`
and schedules `drawFrame()` from watchers at `:378/402/418`, all inside its own mount window.

### C-5 · [MAJOR] `<SvgFilters />` is mounted app-wide and **all four of its filters are referenced nowhere** — while it burns two perpetual `pencil-boil` clocks

**Provenance.** `App.vue:22` mounts `SvgFilters` unconditionally as the first root node, on every route.
`components/decorative/SvgFilters.vue` defines exactly four `<filter>` ids: `title-boil` (`:69`),
`wobble-celestial` (`:96`), `paper-grain` (`:122`), `canvas-grain` (`:150`).

```
$ grep -rn "title-boil\|wobble-celestial\|paper-grain\|canvas-grain" web/ \
      --exclude-dir=node_modules --exclude-dir=dist \
      | grep -v "src/components/decorative/SvgFilters.vue"
(no output)
$ grep -rhno "url(#[a-z-]*)" web/src/
(no output)
$ grep -rho "url(#[a-z-]*)" web/node_modules/@mkbabb/glass-ui/dist/styles/
(no output)
```
**Zero consumers**, in fourier's source, in fourier's HTML/CSS, and in glass-ui's shipped stylesheet.

Meanwhile `SvgFilters.vue:20-21` starts two `useLineBoil` clocks from `@mkbabb/pencil-boil` (`:3`)
— `useLineBoil(boilOffsets.length, 150)` and `useLineBoil(wobbleOffsets.length, 160)`, both arrays of
length 8 (`:12`, `:16`) — and `:47-48` watches both to write `baseFrequency` attributes onto filters
nobody uses. That is ≈13 reactive updates/second, for the life of the tab, on every route including
`/paper` and `/gallery`.

**Sub-defect (PRM gate misplaced).** The reduced-motion check lives in the *appliers*
(`SvgFilters.vue:24`, `:36` — `if (reducedMotion || !svgRef.value) return;`), not in the *clocks*. Under
`prefers-reduced-motion: reduce` the two `useLineBoil` timers keep ticking and keep invalidating reactive
watchers; only the DOM write is skipped. This is the same class of gap lane-frontend.md §8 flags for
`stores/animation.ts` and `ConvergencePlot.vue` — and it is a third instance the lane did not name.

**Falsifier.** Dies if any filter id is referenced anywhere — searched all of `web/` outside
`node_modules`/`dist` (covering `.vue`, `.ts`, `.css`, `.html`) plus glass-ui's shipped CSS, including a
generic `url(#…)` sweep that would catch a differently-spelled reference; zero hits. Also dies if
`useLineBoil` self-gates on PRM — the component would then not need its own `reducedMotion` const at
`:7-9`, which it has. **UNPROVEN-NEEDS-LIVE (SS-13):** the actual per-frame cost is a runtime measurement;
the dead-reference finding is static and airtight.

### C-6 · [MAJOR] The mount seam has zero error handling — a single failed lazy chunk yields a permanently blank page

**Provenance.**
- `main.ts:10` — `router.isReady().then(() => app.mount("#app"));` (mount is **parked behind** route resolution).
- `router/index.ts` — every route component is a lazy `() => import(…)` (`:46`, `:61`, `:73`, `:84`, `:94`, `:104`, `:114`).
- `web/index.html:35` — `<div id="app"></div>` is the entire body content; there is no server-rendered shell.
- `grep -rn "onError\|errorHandler\|onErrorCaptured\|Suspense" web/src/` → **0 hits, whole tree.**
- `App.vue:26-28` — `<main>` wraps a bare `<RouterView />` with no fallback slot, no `<Suspense>`, no
  loading or error state.

**The defect.** A rejected dynamic `import()` on the *initial* navigation (the classic stale-hash case
after a deploy — and `web/Dockerfile:31-42` serves JS with `Cache-Control: public, immutable, expires 1y`,
which makes stale-chunk misses a designed-in possibility) rejects `router.isReady()`, so `app.mount()`
**never runs**. The user gets an empty `<div id="app">`: no header, no `<Toaster />`, no retry, no
console-visible product surface. App.vue is the component that would host the boundary and does not.
Cost of the floor: one `router.onError` + one `app.config.errorHandler`.

**Falsifier.** Dies if a global handler exists (grep says none), or if `router.isReady()` swallowed
component-load rejection (it does not — vue-router rejects `isReady()` on a failed initial resolution
unless an `onError` handler is registered), or if the mount were unconditional (it is parked, `main.ts:10`).
**UNPROVEN-NEEDS-LIVE (SS-13):** the blank-page outcome under a real chunk 404.

---

## §3 — MINOR

### C-7 · [MINOR] The `MutationObserver` is never disconnected, is unfiltered, and costs five style resolutions per firing
`App.vue:13-17` creates the observer and never stores it beyond the closure; `App.vue` has **no
`onUnmounted`** (the file is 32 lines, read whole). It filters `attributeFilter: ["class"]` on
`documentElement` — i.e. it fires on **any** `class` mutation on `<html>`, not only the dark-mode flip.
Each firing calls `resolveVizColors()` → five separate `cssVarToHex` calls → **five separate
`getComputedStyle(document.documentElement)` invocations** (`colors.ts:23`), each a forced style
resolution. The lifecycle leak is benign in production (App is the root, never unmounted) but real under
Vite HMR, where re-executing `<script setup>` registers a second observer while the first is never
disconnected. *Falsifier:* an `onUnmounted`/`observer.disconnect()` anywhere in App.vue — absent; or a
single hoisted `getComputedStyle` in `colors.ts` — absent (`:23` is inside `cssVarToHex`).

### C-8 · [MINOR] `App`'s own header forces eager construction of an entirely unused Pinia store on every route
`AppHeader.vue:49` — `const workspaceStore = useWorkspaceStore();` — and the identifier appears **nowhere
else in the file** (`grep -n "workspaceStore" AppHeader.vue` → `:49` only; the template uses
`galleryStore.adminMode` at `:137`). Because Pinia stores are lazy, this line is what *forces* the
workspace store into existence at app boot, on **every** route including `/paper` and `/gallery` where no
workspace exists: `stores/workspace.ts:34` `useRouter()`, ~20 refs, an `onScopeDispose` (`:74`) and a
`deep: true` watcher over `[contourSettings, animationSettings]` (`:108`). App.vue mounts `AppHeader` at
`:25`, so this is on App's boot path. *Falsifier:* a template or script reference to `workspaceStore` —
none; or a side-effect-free store setup — it registers a deep watcher and a scope-dispose hook.

### C-9 · [MINOR] A hardcoded triplet in App's header subtree documents a palette match that is false at both ends
`DarkModeToggle.vue:31` — `const MOON_COLOR = [192, 132, 252] as const; // #c084fc — matches VIZ_COLORS.legendre`.
`VIZ_COLORS.legendre`'s default is `#9545b8` (`colors.ts:80`); `#c084fc` is a member of `STATIC.rainbow`
(`colors.ts:13-16`), a different entry. After C-1 fires, `legendre` becomes `#888888`, so the comment is
wrong before *and* after resolution. A third hardcoded literal (`SUN_COLOR` `#E88845`, `:30`) has no
palette anchor at all. This is the same fork-the-palette pattern as `colors.ts` itself, one level down.
*Falsifier:* `#c084fc === VIZ_COLORS.legendre` at any point in the program — it is neither the default nor
the resolved value.

### C-10 · [MINOR] `<Toaster />` sits outside `<TooltipProvider>` — a provide/inject boundary in the root template
`App.vue:31` renders `<Toaster />` as a sibling *after* `</TooltipProvider>` (`:30`). Producer
`glass-ui/src/components/toast/Toaster.vue` is not a `<Teleport>` (grep for `Teleport` → none) — it is a
`position`-anchored fixed layer (`:19-20`, default `"bottom-right"`), so *visual* placement is fine. But
Vue `provide`/`inject` follows the **component tree**, so any toast content that renders a
`Tooltip`/`TooltipTrigger` would resolve no provider. Low blast radius given the current `toast(message,
type)` string API (`composables/useToast.ts`), but it is a latent contract edge authored at the root.
*Falsifier:* a `Teleport` in `Toaster.vue` (would not help — teleport moves DOM, not injection context), or
a second `TooltipProvider` inside the toast subtree — `grep -rn "TooltipProvider" web/src/` returns
**only** `App.vue:4,23,30`.

---

## §4 — INFO (axis completeness — the seams that are *absent*, recorded so F.W-planning does not re-derive them)

### C-11 · [INFO] keyframes 4.3 is reachable from App only transitively, through exactly one edge
App.vue imports `@mkbabb/keyframes.js` zero times. The App subtree's **sole** keyframes edge is
`App.vue:25` → `AppHeader.vue:6` (`DarkModeToggle`) → `DarkModeToggle.vue:20` (`useFourierMorph`) →
`composables/useFourierMorph.ts:14` `import { loadAnimationEngine, type Animation } from "@mkbabb/keyframes.js"`.
That single edge is nevertheless *inside* the atomic tri-package transaction (lane-frontend.md §5), so the
app's persistent header cannot be uplifted independently of it. Recorded for F.W1 budgeting.

### C-12 · [INFO] Zero fourier-API client edges in App's own body; R6-8's operation↔client coupling is **not reachable** from this component
`App.vue` makes no network call and imports no client module. The nearest edges in its subtree are
user-gesture-gated: `AppHeader.vue:7` → `UserSlugBar.vue:6` → `stores/auth.ts` (`login`/`logout`/`register`,
`UserSlugBar.vue:37,63`), and `stores/auth.ts:14-16` reads `localStorage` only — **no boot-time request**.
`stores/gallery.ts` likewise performs no API call at store construction (`:39` `adminMode = ref(false)`).
So the adjudicated finding **R6-8** ("an API-operation record that embeds derived client back-references
cannot attribute a defect to one side of the seam", intake row R6-8, verdict TRUE, CARRY → F.W5) has **no
leaf in this component**, and **R3-7c** (36 client edges / 9 gap operations of 45) is likewise
unreachable here. The honest reading: App is API-inert; its whole coupling budget is spent on
CSS-token↔color-parser (C-1) and on the mount seam (C-6).

### C-13 · [INFO] The props/emits contract is empty because the entire contract is ambient
`App.vue` declares no `defineProps`, no `defineEmits`, no `defineExpose`, no `defineSlots` — correct for a
root. But the contract it *does* publish is four untyped, untestable global side effects:
(1) one `provide` via `<TooltipProvider>` serving 35 downstream callsites (`:23`);
(2) a `MutationObserver` on `document.documentElement` (`:13`);
(3) mutation of a module-level `reactive` singleton (`:11` → `VIZ_COLORS`);
(4) four global SVG `<filter>` ids injected into the document (`:22`).
None is expressible in the SFC's type surface, none is unit-testable (`vitest` is ABSENT — lane-frontend.md
§9 item 11 — the only automated gate is 8 Playwright specs + `vue-tsc -b`), and three of the four are
defective above (C-1, C-5, C-7). The 32-line root is not "trivially small"; it is where four untyped
global contracts are declared with no place to assert them.

---

## §5 — SUPERLATIVES (L-18 runs both ways — each with its falsifier)

### S-1 · ★ App.vue's glass-ui import surface is **uplift-clean across the entire 4.0.0 → 7.0.0 break**
`App.vue:4` `import { TooltipProvider } from "@mkbabb/glass-ui/tooltip"` and `:5`
`import { Toaster } from "@mkbabb/glass-ui/toast"`. Verified against the **producer at 7.0.0**:
`glass-ui/src/components/tooltip/index.ts:16-19` still exports `TooltipProvider` (+ `TooltipProviderProps`);
`glass-ui/src/components/toast/index.ts:15` still exports `Toaster`. Both props App.vue passes survive
byte-for-byte: producer `TooltipProvider.vue:5-9` declares `delayDuration` and `skipDelayDuration`. Neither
subpath nor symbol appears anywhere in lane-frontend.md §5's break table (which names `metric-badge` ×7,
`hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` ×1).
In a 95-statement / 21-subpath / 51-file glass-ui consumer surface with 11 broken import sites, App.vue is
**0-for-2 broken**. *Falsifier:* removal or rename of `TooltipProvider`/`Toaster` at producer 7.0.0, or a
prop-name change — checked all three at the producer source; none. *Honest edge:* App's immediate child
`AppHeader.vue:20` **does** import the removed `./hover-card`, so App is clean but sits one hop from a break.

### S-2 · ★ `paper-texture` is consumed from glass-ui rather than forked — the correct posture, in a file whose sibling stylesheet forks two other things
`App.vue:24` applies `paper-texture` alongside `bg-background text-foreground`. The recipe is genuinely
upstream: `glass-ui/dist/styles/cards.css:10-19` owns `.paper-texture` (`background-image:
var(--paper-clean-texture)` + `background-size: var(--paper-texture-size)` + `background-blend-mode:
multiply`, with a `:where(.dark)` arm at `:17-19`), over tokens `--paper-clean-texture`
(`tokens/scale-paper.css:80`) and `--paper-texture-size` (`tokens/offsets-sizing.css:92`). The producer even
names this consumer: `tokens/scale-paper.css:73-76` — *"Canonical subtle paper-texture opacity — restored
from fourier-original … downstream consumer of `.paper-texture`."* Contrast the two **live upstream carries
authored in the very next file**: `style.css:98-112` resurrects `@utility cartoon-card` (declaration at
`:107`; 25 application sites) after glass-ui deleted it at C.W5, and `style.css:113-127` re-declares
`--viz-amber` in both arms. App.vue chose
the consumption path where its own stylesheet chose the fork path — twice. *Falsifier:* `.paper-texture`
absent from the installed glass-ui, making the class a phantom — grepped `dist/styles/`, it is present and
tokenised.

### S-3 · ★ One `TooltipProvider`, hoisted to the root, serving 35 callsites over 9 consumers — zero duplication
`grep -rn "TooltipProvider" web/src/` → exactly three lines, all in `App.vue` (`:4`, `:23`, `:30`). My
independent whole-tree count of `<Tooltip` open tags is **36**, distributed
`EditorControlsDock 10 · CanvasControlsDock 6 · ContourSettings 6 · AnimationControls 4 · FunctionInput 2 ·
PaperSidebar 2 · CoefficientsSpectrum 2 · BasisSelector 2 · VisualizationView 1` = **35 over 9 consumers**,
plus **1** inside the local adapter `components/ui/tooltip/Tooltip.vue`. This reproduces intake row
**R3-7a** (verdict TRUE, "35 Tooltip callsites over nine consumers", CARRY → F.W3) **exactly**, including
its parenthetical about the local adapter — a fourth independent confirmation of that figure. The single
hoisted provider with explicit non-default timings (`400`/`200` vs producer defaults `700`/`300`,
`TooltipProvider.vue:13-16`) is the correct topology: one shared skip-delay group, no nested providers to
fragment it. *Falsifier:* a second `TooltipProvider` anywhere in the tree, or a consumer relying on a
different delay group — grep returns only App.vue's three lines, and no consumer passes tooltip-timing props.

---

## §6 — Corpus disposition (fold / sharpen / contradict)

| corpus row | this challenge |
|---|---|
| **R3-7a** (35 Tooltip / 9 consumers, TRUE, → F.W3) | **FOLD + 4th independent confirmation** — reproduced exactly (S-3), including the local-adapter +1. |
| **R3-7c** (36 client edges, 9 gap ops of 45, TRUE, → F.W5) | **NOT REACHABLE** from App — no client edge in its body (C-12). |
| **R6-8** (operation record embeds client back-refs; non-isolable seam, TRUE, → F.W5) | **NOT REACHABLE** from App (C-12). Recorded so a per-component sweep does not manufacture a false leaf here. |
| **R5-7** (deriver blind to native template loops, TRUE, → F.W4) | App.vue has **zero** `v-for` — neither component nor native. No leaf either way; consistent with the intake's model. |
| lane-frontend.md:41 (describes App's shell + `MutationObserver` as working) | **SHARPENED, not contradicted** — the mechanism is correctly described; the lane did not test the producer token *format* against the parser's arms. At the installed glass-ui the mechanism runs and is net-negative (C-1). |
| lane-frontend.md §6 ("Palette resolved once at app boot … re-resolved on `.dark` toggle") | **CONTRADICTED in two ways** — it is not resolved *before* consumers (C-4), and it is not re-resolved for `basis-display.ts` *ever* (C-3). |
| lane-frontend.md §5 (`value.js` peer floor: 5 sites, easing-only) | **FOLD + extend** — the 5 bare-root specifiers are *correct at 0.13.0* (installed `exports` = `{"."}`); they break only at 4.0.0, whose `exports` drops `.` for 7 subpaths. App.vue carries **none** of them. |
| lane-frontend.md §8 (PRM coverage gap: `stores/animation.ts`, `ConvergencePlot.vue`) | **EXTENDED** — a **third** ungated clock pair, mounted by App at the root on every route: `SvgFilters.vue:22-23` (C-5). |
| CENSUS-2026-08-03.md:174 ("117-line hand-rolled regex file, no `oklch()` arm") | **SEVERITY CONTRADICTED** — recorded as a spec/deletion target; it is a **live shipping regression** at the installed producer, authored by `App.vue:11` (C-1). |
| CENSUS-2026-08-03.md:184-189 (F.W1 tri-package **then** F.W2 colors) | **SEQUENCING CONTRADICTED** — the `colors.ts` leg is landable at 0.13.0 today, independent of the tri-package deadlock; only the *specifier* leg is genuinely gated on F.W1 (C-2). |

---

## §7 — Method and limits

Read-only throughout. The **only** write made by this lane is this file. No product source in
`fourier-analysis`, `glass-ui`, or `value.js` was modified; `scripts/dev/dev.sh` untouched. Evidence
gathered with `grep`/`sed`/`find`/`ls`/`node -e` over the three trees plus fourier's `web/node_modules`
(installed producer artifacts). **No browser tooling was used** — every claim is static or source-derived,
and the four livable-only consequences are marked **UNPROVEN-NEEDS-LIVE (SS-13)**: the rendered grey
palette (C-1), the runtime behaviour of `parseCSSColor("oklch(…)")` at 0.13.0 (C-2), the per-frame cost of
the two dead boil clocks (C-5), and the blank-page outcome under a real stale-chunk 404 (C-6).
