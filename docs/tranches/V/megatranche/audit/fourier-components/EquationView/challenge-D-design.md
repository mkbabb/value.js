claude-opus-5[1m] (served model id)

# CHALLENGE — `EquationView.vue` · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationView.vue` (469 lines)
**Substrate.** fourier HEAD `cd26c653` / tree `9a66411d` (census ADDENDUM §1, re-verified); glass-ui **installed 4.0.0**, producer **7.0.0** (`/Users/mkbabb/Programming/glass-ui` `package.json:version`, tag `v7.0.0` present).
**Method.** Static + source-derived only. No browser. Every colour/geometry figure below is computed from token literals in the installed dist or from the 7.0.0 producer tree; anything that needs a live paint is marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Read whole.** Target + `FunctionInput.vue`, `EquationResult.vue`, `EquationModeToggle.vue`, `ConvergencePlot.vue`, `EqCoefficientsPanel.vue`, `NotationPills.vue`, `InfoCard.vue`, `composables/useCoeffHover.ts`, `composables/useEquationCache.ts`, `lib/equation/{api,types,notation}.ts`, `ui/tooltip/Tooltip.vue`, `src/style.css`, and the glass-ui 4.0.0 dist token/recipe sheets + the 7.0.0 producer sources cited inline.

**Prior corpus folded** (cited, not re-derived): `formation/fourier/lane-frontend.md` §3/§5/§8; `formation/fourier/CENSUS-2026-08-03.md` §3a, §5, C-4; `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` R3-7a, R5-7, R6-5.

**Verdict.** The component is **DEFECTIVE on the design axis and does not clear the bar.** It carries five blocking defects — one of which (D-B1) is a *provable geometric collision on every touch device*, and one of which (D-B5) is an **uplift break the census does not enumerate**. It also carries five genuine superlatives, two of which are better than anything the sibling components in its own directory manage.

Tally: **29 defects (5 BLOCKER · 14 MAJOR · 9 MINOR · 1 INFO) · 5 superlatives.**

---

## §0 — The census-extension headline (read this first)

The formation's break surface for F.W1 is enumerated at `lane-frontend.md:470-483` and re-stated at `CENSUS-2026-08-03.md:102-106`: *metric-badge ×7 files, hover-card/-popover ×4, dock members ×3, `ToastVariant`, lucide ×35, pencil-boil*.

**That enumeration is incomplete for this component in two ways, both established below:**

1. **`Button`'s entire `variant`/`size` axis is retired at 7.0.0** and is definition-absent from `ButtonProps`. The census never names it because an `exports` keyset diff cannot see it — `./button` still ships, only its *prop surface* changed (the census itself names this class of blindness at `lane-frontend.md:485`: "Member-level removals from keys that otherwise survive"). EquationView carries 1 site; its immediate subtree carries 8 more. → **D-B5**.
2. **`MetricBadge`'s `color` prop has no successor on 7.0.0's `Metric`.** `lane-frontend.md:472` disposes metric-badge as "→ `./metric` (`Metric`) … another prop pass is due" — but `MetricProps` (producer `src/components/metric/types.ts:22-25`, extending `MetricTextProps`/`MetricValueProps` at `:16-21`) declares `value · unit · placeholder · loading · label · context · class · size · orientation` and **no `color` and no `tone`**. The energy-tier colour signal is not "a prop pass"; it is *destroyed* unless re-expressed. → **D-M10**.

Both rows belong in the F.W1 budget.

---

## §1 — BLOCKERS

### D-B1 · The equation card's control band collides with itself on every coarse-pointer device
**Severity: BLOCKER** · `EquationView.vue:276, 430-434` · `EquationResult.vue:88-93` · `EquationModeToggle.vue:42-47`

`.info-anchor` pins the tier/info button with a hard `right: 3.25rem` (`:432`). That number is a fine-pointer arithmetic constant: `0.5rem` (the copy button's own `right`, `EquationResult.vue:91`) + one control width + a gap. It hard-codes the geometry of a button that lives in a **different component**.

The width it encodes is not constant. glass-ui 4.0.0 renders `size="icon"` as `h-(--control-h-md) w-(--control-h-md)` (`dist/button-BNDWhAZb.js:71`), and `--control-h-md` is *scaled*:

```
dist/styles/tokens/offsets-sizing.css:136  --ui-scale: 1;
dist/styles/tokens/offsets-sizing.css:148  --control-floor: 0px;
dist/styles/tokens/offsets-sizing.css:151  --control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor));
dist/styles/tokens/light-dark.css:17-21    @media (pointer: coarse) { :root {
                                             --ui-scale: var(--ui-coarse-scale, 1.5);
                                             --control-floor: var(--touch-target, 2.75rem); } }
```

So on any primary-coarse pointer: `--control-h-md = max(2.5rem × 1.5, 2.75rem) = 3.75rem = 60px`.

Measured from the card's right padding edge:

| element | span (coarse) | z-index |
|---|---|---|
| copy button (`EquationResult .copy-pos`, `right: 0.5rem`) | **8 → 68 px** | `--z-controls` = 20 |
| info button (`.info-anchor`, `right: 3.25rem`) | **52 → 112 px** | `--z-bar` = 30 |

**The info button overlaps the copy button by 16px and, being at z-30 over z-20, steals that 16px of the copy button's hit target.** (`--z-controls: 20` / `--z-bar: 30` — `dist/styles/tokens/scheme-motion.css`.)

Vertically the same scaling breaks the stage: the buttons occupy `8 → 68px` while `EquationResult`'s `.eq-scroll-region` starts its content at `padding-top: 2rem` = 32px (`EquationResult.vue:64`) inside a card that is only `10rem` tall (`:387`). **36px of equation glyphs render behind the control band.** On fine pointers the same arithmetic still yields a 12px overlap (`8 + 40 = 48` vs `32`).

Third-order: `.eq-toggle-btn { height: 2.25rem }` (`EquationModeToggle.vue:46`) is a raw literal that does **not** ride `--ui-scale`, so on touch a 36px control sits in the same 8px-inset band as two 60px controls.

**Falsifier.** The claim dies if the app overrides the comfort axis. It does not: `grep -rn -- "--ui-scale|--ui-coarse-scale|--control-floor|--control-h-md" web/src/` → **empty**. It also dies if `(pointer: coarse)` never matches on the devices this view targets — but `:187-192` mounts a `lg:hidden` Controls/Canvas tab bar that exists for exactly those devices. The precise *painted* overlap is **UNPROVEN-NEEDS-LIVE (SS-13)**; the token arithmetic is not.

**Cure.** Delete `right: 3.25rem`. Put the two controls in one flex row anchored `top-2 right-2` with `gap-2` — one owner, one measure, scale-agnostic.

---

### D-B2 · The info button has no accessible name
**Severity: BLOCKER** · `EquationView.vue:276-280`

```html
<Button variant="glass" size="icon" class="info-anchor">
    <svg class="size-[18px]" …><circle …/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
</Button>
```

No `aria-label`, no `title`, no visually-hidden text, no `aria-labelledby`. `HoverCardTrigger as-child` (`:275`) forwards reka's trigger attributes, none of which is a name. This is a hard `button-name` failure (WCAG 4.1.2), and it is a **gate the repo already owns** — `@axe-core/playwright ^4.11.3` is in devDependencies (`lane-frontend.md:630`).

**It is also an internal inconsistency, not an oversight class.** Three sibling icon-only controls in the same tree *are* named: `EquationResult.vue:42` (`title="Copy LaTeX"`), `EquationPanel.vue:87` (`aria-label="Close equation panel"`), `CanvasOverlayButton.vue:20` (`:aria-pressed`). The convention exists; this call site diverges from it.

**Falsifier.** Dies if glass-ui's `Button` injects a fallback name — it does not (`Button.vue` v7.0.0 `:50-70`, and the 4.0.0 `dist/components/ui/button/Button.vue.d.ts` prop surface, carry no naming path). Dies if the axe run excludes this route — the e2e set is `visual-baseline.spec.ts` + `paper-performance.spec.ts` (`lane-frontend.md:630`), so it plausibly *is* excluded, which makes the gate untripped rather than the defect absent.

---

### D-B3 · The tier and energy colours fail WCAG AA on the popover ground — against the repo's own written contrast law
**Severity: BLOCKER** · `EquationView.vue:284-297` · `lib/equation/notation.ts:15-48` · `src/style.css:113-127`

The tier pill (`:284-291`) paints `color: tierInfo.color` at `text-sm font-semibold` (14px/600 — **not** WCAG "large text", which needs ≥18.66px bold or ≥24px). `MetricBadge :color="eColor"` (`:296`) paints the same three literals. Both sit inside `.info-hovercard`, whose ground the file itself sets to `var(--popover)` (`:462`) = `hsl(36 48% 97%)` in light mode (`dist/styles/tokens/light-dark.css:99`).

Computed sRGB contrast (relative luminance per WCAG 2.x, from the literals — no browser needed):

| literal | site | L | ratio vs `--popover` | AA 4.5:1 |
|---|---|---|---|---|
| `hsl(142 71% 45%)` | `notation.ts:25,45` (symbolic / ≥0.99 energy) | 0.4071 | **2.17 : 1** | ✗ |
| `hsl(38 92% 50%)` | `notation.ts:31,46` (identified / ≥0.95) | 0.4412 | **2.02 : 1** | ✗ |
| `hsl(0 84% 60%)` | `notation.ts:37,47` (spline / <0.95) | 0.2275 | **3.58 : 1** | ✗ |

(`L(--popover)` = 0.9422.) The pill additionally tints its own background with `color-mix(… 15%, transparent)` of the same hue (`:287`), which lowers every figure further — for the green arm to roughly **2.0 : 1** (approximate: `color-mix` composites in gamma space; the un-tinted figure above is the ceiling).

**Why this is a blocker and not a taste note.** The repo has a *written, executed* contrast law covering exactly this class:

> `style.css:113-118` — "D.W4.d — light-mode `--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 against `--background` — **fails WCAG AA for normal text**. The override darkens to `hsl(35 76% 35%)` ≈ 4.6:1 (clears AA)."

The author measured 3.54:1 as unacceptable and fixed it — then shipped 2.02:1 and 2.17:1 in the same view, hard-coded as HSL literals in a module (`notation.ts`) that bypasses the token layer entirely.

**Falsifier.** Dies if the pill is exempt as "large text" (it is not: 14px/600) or if `--popover` resolves darker (dark arm is `hsl(24 8% 16%)`, `dist/styles/tokens/dark-arm.css:65` — there the same three literals *pass*, so the defect is light-mode-only, which is precisely why an unmeasured eye misses it). Dies if these are decorative — they are the sole carrier of the tier semantics ("Exact" / "Conjectured" / "Approximate"), so they are content.

---

### D-B4 · An entire loading state has zero visual representation, and its failure path is silently swallowed
**Severity: BLOCKER** · `EquationView.vue:57, 130-147, 177-181`

```ts
:57   const loading = computed(() => computing.value || simplifying.value);   // ← NEVER READ
:143  } catch (e) { if (!isAbortError(e)) { /* silent */ } }
```

`loading` is computed and **never referenced in the template** (verified: the template reads `computing`, `error`, `result`, `components`, `tierInfo` — never `loading`). The unified busy state was designed and never wired.

Consequence chain, all from the source: the user drags the *Display terms* slider or picks a notation → `watchDebounced` (`:177-181`, 200ms) → `doSimplify` → `simplifying = true` → **nothing in the UI changes** (no spinner, no dimming, no stale marker) → if the request fails, the `catch` at `:143` discards the error → `displayLatex` and `displayEnergy` keep their previous values → **the equation card now displays a series in the wrong notation, at the wrong term budget, with the wrong energy figure, and asserts nothing.** `lastDisplayKey` is not advanced on failure (`:140` is inside the `try` success path), so a subsequent identical change re-fires — but every intervening frame is a confident lie.

Contrast `doCompute`, which does surface its error (`:121-124` → the banner at `:243-246`). The two API calls in one component have opposite error postures.

**Falsifier.** Dies if `simplifying` has any other consumer — `grep`: it is written at `:135`/`:145` and read only at `:57`. Dies if simplify cannot fail — it is a network POST through the shared `apiFetch` core (`lib/equation/api.ts:51-54`).

**Cure.** Read `loading` (that is what it is for): dim `.eq-card` + `aria-busy` while `simplifying`, and give the simplify failure the same banner the compute failure gets.

---

### D-B5 · `Button`'s `variant`/`size` axis is definition-absent at 7.0.0 — an uplift break the census does not enumerate
**Severity: BLOCKER (F.W1 gating)** · `EquationView.vue:8, 276` · producer `glass-ui` tag `v7.0.0` `src/components/button/Button.vue:15-40`

Installed 4.0.0 (`dist/components/ui/button/index.d.ts:2-5`):

```ts
variant?: "link"|"default"|"solid"|"primary-audacious"|"gold-audacious"|"destructive"|"outline"
        |"secondary"|"accent"|"ghost"|"glass"|"glass-wash"|"ai"
size?:    "default"|"xs"|"sm"|"lg"|"icon"|"icon-sm"
```

Producer 7.0.0 (`git show v7.0.0:src/components/button/Button.vue`, verified at the tag, not at working HEAD):

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  type?; disabled?; class?;
}
```

`variant` is gone entirely; `ButtonSize` has no `"icon"` member. `MIGRATION.md:511` records only the *type* removal (`/button`: `ButtonVariants` → the typed `ButtonProps`/`ButtonEmphasis`/`ButtonSize`) and **the string `emphasis` appears nowhere in MIGRATION.md** (`grep -n "emphasis" MIGRATION.md` → empty) — the producer's own migration guide does not carry a call-site rename table for this component. The consumer is therefore migrating blind.

Two failure modes, and the *worse* one is the silent one:

- `size="icon"` is a hard type error (`"icon"` ∉ `ButtonSize`) — `vue-tsc` catches it, and `vue-tsc -b` is the build (`web/package.json` `"build"`).
- `variant="glass"` is an **undeclared prop**. If vue-tsc's template check rejects unknown component attributes it is a second hard error; if it admits them as fallthrough it lands on the DOM as an inert `variant="glass"` attribute and the button silently repaints as `emphasis="secondary" size="md"` — non-square geometry, which then breaks `.info-anchor`'s `right: 3.25rem` (D-B1) a *second* way. Either branch is a break; the fallthrough branch is undetectable by the only gate the repo has.

Blast radius from EquationView's own subtree: `EquationView.vue:276`, `EquationResult.vue:39-40`, `EquationModeToggle.vue:12-13,21-22`, `FunctionInput.vue:144-145,159-160,190-191`, `NotationPills.vue:20-21`. **9 call sites in the equation family alone**; `lane-frontend.md:260-311` lists `Button` imported in **19 files** repo-wide.

**Cure (from the 7.0.0 source, `Button.vue:45-49`).** `glassMaterial` is now automatic when `tone === "neutral" && emphasis ∈ {primary, secondary}` — so `variant="glass" size="icon"` → `icon-only` (default `emphasis="secondary"` already paints glass), `variant="ghost"` → `emphasis="quiet"`, `variant="outline"` → `emphasis="quiet"` or `secondary` per weight, `variant="default"` → `emphasis="primary"`.

**Falsifier.** Dies if the working-HEAD Button API is 8.0.0-only development and 7.0.0 shipped `variant`. Checked at the tag: it did not. Dies if fourier pins below 7 forever — but the tri-package deadlock (`lane-frontend.md:487-495`, census §5 risk 1) makes 4→7 the only forward move.

---

## §2 — MAJOR

### D-M1 · The equation stage is a fixed 160px box with no vertical escape
`:386-390` (`height: 10rem; overflow: hidden`) over `EquationResult.vue:61-68` (`overflow-x: auto` only, `min-height: 4.5rem`, `padding: 2rem 1rem 1rem`) and `:77-86` (`.katex` at `1.4em`, `1.8em` ≥768px), with `:deep(.katex-display){ overflow: visible !important }` (`:73`). Vertical overflow escapes the scroll region by design and is then **clipped by the card with no scrollbar and no scale-to-fit**. The `expanded` mode (`eqMode`, `:43`) renders up to `budget` terms — a trig or polar expansion with stacked fractions exceeds `160 − 32 = 128px` readily. The design offers no recovery: the user cannot scroll, cannot resize, cannot switch the card to auto-height. Exact truncation threshold: **UNPROVEN-NEEDS-LIVE (SS-13)**; the absence of any vertical escape path is structural and proven.

### D-M2 · On mobile the `/equation` route opens with the equation hidden
`:44` `const mobileView = ref<…>("controls")` + `:219` + `:437-441` (`.panel-inactive { display: none }` under 1024px). First paint on a phone shows the *inputs*, never the artifact the route is named for. The equation card, the tier badge, the energy figure and the convergence plot are all one tab away, and nothing on the Controls pane previews them. Falsifier: dies if the tab state is restored from cache — it is not (`useEquationCache.ts:10-17` persists six input fields; `mobileView` is not among them).

### D-M3 · Coefficient inspection is mouse-only; on touch the tier and energy readouts are unreachable anywhere in the view
`:252-253` binds `@mousemove`/`@mouseleave` only; `useCoeffHover.onMouseMove` (`:28-47`) requires a `MouseEvent` and `.closest(".eq-coeff")`. There is no keyboard path (the `.eq-coeff` spans are KaTeX output, not focusable — `:414-419` gives them `cursor: pointer` and a hover recipe but no `tabindex`, no `role`, no `:focus-visible`), and no touch path. Compounding: the tier + energy block lives only inside a `HoverCard` (`:274-304`), and FunctionInput's energy figure lives only inside a `Tooltip` `#content` (`FunctionInput.vue:198-210`) — **so on a touch device the energy-captured percentage is rendered nowhere in the equation view at all.**
**This one improves under the uplift** — 7.0.0's overlay union auto-promotes coarse-pointer hover to tap-toggle (`MIGRATION.md:960-962`: "Coarse-pointer hover auto-promotes to tap-toggle"). Book it as a *benefit* row for F.W1 alongside the `hover-card → Popover` cost row (`lane-frontend.md:473`).

### D-M4 · `.info-hovercard` overpaints the library surface, defeats the glass material, and hard-codes a shadow that vanishes in dark mode
`:456-468`. The global block re-implements the popover surface from raw tokens: `background: var(--popover)` **opaque**, `border: 1.5px solid var(--border)`, `border-radius: 0.5rem`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)`. glass-ui's `HoverCardContent` already carries the `glass-floating` recipe (`dist/HoverCardContent-DkMaQzH5.js` contains `glass-floating`), so the consumer paints an opaque plate over the design system's one differentiating material.
The shadow is the sharper defect: `rgba(0,0,0,0.12)` over a dark-arm `--popover` of `hsl(24 8% 16%)` is **invisible** — the surface loses its elevation entirely in dark mode. **The same file, 66 lines earlier, gets this right**: `.coeff-popover` uses `box-shadow: 0 4px 12px color-mix(in srgb, var(--foreground) 8%, transparent)` (`:400`), which inverts correctly. Two shadows, one file, one token-correct.

### D-M5 · `InfoCard.vue` is an orphan whose exact content this file re-inlines — and the copies have already drifted
`InfoCard.vue` (43 lines) renders the tier pill + `MetricBadge` + `Info` + description. `EquationView.vue:283-302` re-inlines that block verbatim. **`InfoCard` has zero consumers** (`grep -rn "InfoCard" web/src/` → only its own definition). The copies have drifted: `unit="% energy"` (`:294`) vs `unit="% energy captured"` (`InfoCard.vue:33`); `class="size-3.5"` (`:300`) vs `class="h-3.5 w-3.5"` (`InfoCard.vue:38`). Two prose registers and two sizing idioms for one component. This also *doubles* the D-B3 contrast blast radius and the D-M10 uplift cost.

### D-M6 · Loading and error regions carry no live-region semantics
`:221-226` (spinner + "Computing…") has no `role="status"` / `aria-live="polite"` / `aria-busy`. `:229-234` and `:243-246` ("Computation failed", "Error: …") have no `role="alert"` / `aria-live="assertive"`. Compute is asynchronous and user-initiated (`FunctionInput.vue:147` and `:102` Enter-to-compute) — a screen-reader user presses Compute and receives no announcement of start, completion, or failure. The spinner `div` (`:223`) is also un-labelled decoration with no `aria-hidden`.

### D-M7 · The error banner uses a raw palette colour at ~2.5:1, truncates unrecoverably, and offers no retry
`:243-246`. `text-red-400` is Tailwind v4 `oklch(70.4% 0.191 22.216)` (`node_modules/tailwindcss/theme.css:14`) — OKLab `L=0.704` ⇒ `Y ≈ 0.349` ⇒ **≈ 2.5 : 1** against the `--card` ground (`hsl(36 48% 97%)`, `Y = 0.942`) — failing AA at `text-sm font-medium`, and doing so with a **raw palette literal** while glass-ui ships the semantic register (`dist/styles/feedback-tone.css`, `.feedback-tone-destructive`, plus `--destructive`). `border-red-500/30` and `bg-red-500/5` are the same class of bypass. Separately, `truncate` on the message span (`:245`) ellipses long API errors with **no `title`, no expand, no wrap** — the user is told an error occurred and denied its text. And neither error surface offers a retry affordance.

### D-M8 · Reduced-motion is unhandled in this file, while its own sibling handles it
No blanket exists: glass-ui gates PRM **per recipe** (`dist/styles/animations.css:239,279,369`; `menu.css:122`; `glass-specular-track.css:34`), never globally; the consumer's only PRM block (`style.css:92-96`) covers `[data-state="active"][role="tabpanel"]` alone. Unguarded here:

| site | motion |
|---|---|
| `:444-447` `.pop-*` | opacity + `translateY` + `scale` on the coefficient popover |
| `:449-452` `.slide-down-*` | 300ms opacity + `translateY(-8px)` on the coefficients panel |
| `:466` `.info-hovercard` | `animation: tooltip-in 0.15s var(--ease-out-expo)` — and `tooltip-in` has **no** `@media reduce` redefinition in glass-ui (`dist/styles/animations.css:41-50`), unlike `scrim-breath` at `:239-243` which does |

**The same author gated the equivalent surface one file over**: `ConvergencePlot.vue:405-409` wraps `.curve-tooltip { animation: none }` in `@media (prefers-reduced-motion: reduce)`. The discipline exists and stops at this file's boundary.
Inherited, and attributable here because this file is the mounting authority: `ConvergencePlot.vue:324` autostarts `playing.value = true; startLoop()` in `onMounted` **unconditionally**, and the rAF clock is never PRM-gated (census `lane-frontend.md:624` books exactly this: "the autoplay epicycle animation runs at full rate under `prefers-reduced-motion: reduce`"). `EquationView:309-316` is the only mount point in this route.

### D-M9 · The mobile panel toggle hides the canvas but does not stop it
`:437-441` hides the inactive panel with `display: none`, keeping both subtrees **mounted**. `ConvergencePlot`'s loop (`:57-70`) reads `if (!playing.value) return; … draw(); rafId = requestAnimationFrame(tick);` — `draw()` early-returns on a zero-size rect (`:85`) but **`tick` re-schedules unconditionally**. rAF throttles on document visibility, not element visibility, so switching to the Controls tab leaves a 60fps no-op loop burning the main thread on precisely the least capable devices. `v-if` (or forwarding a `paused` prop) costs one character more. Census `lane-frontend.md` §8 already banks "off-screen rAF gating" as a known idiom in this codebase — it is simply not applied here.

### D-M10 · `MetricBadge :color` has no successor on 7.0.0 `Metric` — the energy signal dies in the uplift
`:292-297` (and `InfoCard.vue:29-34`, `EquationPanel.vue:77-82` — 3 of the 7 files in census C-4). `MetricBadgeProps.color` is documented at 4.0.0 (`dist/components/custom/metric-badge/MetricBadge.vue.d.ts`: "Color applied to the value when it's non-empty"). 7.0.0's `MetricProps` (`src/components/metric/types.ts:16-25`) has **neither `color` nor `tone`**. Migrating per `lane-frontend.md:472` therefore silently flattens the green/amber/red energy encoding to default foreground — losing the *only* at-a-glance quality signal on the surface. Cure options: pass a class and style `.metric__value` (the class is emitted, `Metric.vue:32`), or promote the three literals into tokens and re-key. Either way this is design work in F.W1, not a rename. *(Bonus: 7.0.0's `Metric` gains `loading` + `aria-busy` (`Metric.vue:12,26`), which would cure half of D-B4 for free.)*

### D-M11 · The file hand-inlines an icon it has already imported
`:11` `import { Info } from "lucide-vue-next"` — used at `:300`. `:277-279` then hand-writes `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`, which is **byte-identical to lucide's `Info`** (`node_modules/lucide-vue-next/dist/esm/icons/info.js:10-14`). One glyph, two mechanisms, 3 lines apart in the render tree — and the inline copy is the one that will be missed by the `lucide-vue-next → @lucide/vue` sweep (`lane-frontend.md:479`, 35 sites).

### D-M12 · Two mechanisms for one job, and the hand-rolled one has no pressed semantics
`:188-191` uses `SegmentedTabs variant="underline"` for a 2-way toggle (Controls/Canvas). `:270` uses the hand-rolled `EquationModeToggle` for a 2-way toggle (Σ/expanded). Same job, same file, two mechanisms.
The hand-rolled one is also the inaccessible one: `EquationModeToggle.vue:10-30` renders two `<Button>`s whose only state signal is a CSS class (`.is-active`) and whose only label is `title=`. **No `aria-pressed`, no `role="radiogroup"`/`radio`, no `aria-label` on the group.** The active mode is conveyed by colour alone (`:63-66`, `color: var(--viz-amber)` + an 8% wash) — WCAG 1.4.1. The repo's canonical seat is written down and used elsewhere: `BasisSelector.vue:144` + `:269` (`.basis-toggle[aria-pressed="true"]`), `CanvasOverlayButton.vue:20`, `GallerySearchBar.vue:70,120`. And `notation.ts:5-7` documents the pattern in prose ("`<Button variant="outline" size="sm">` with `aria-pressed` driving an instance-scoped tint") — a comment that `NotationPills.vue:17-32` also fails to honour.

### D-M13 · Mobile gutter inversion: the outer margin is one third of the inner gap
`:336` `.eq-grid { @apply … p-1 gap-1 }` → 4px outer padding and 4px column gap, while `:374` `.eq-panel-left { … gap-3 }` → 12px between the cards *inside* it, and the cards themselves are `px-3 py-2` (12/8px, e.g. `EqCoefficientsPanel.vue:12`, `FunctionInput.vue:93`). Containment demands the outer measure be ≥ the inner; here it is a third of it, so the cards read as bleeding off the viewport rather than being held by it. The mis-registration is visible: the mobile tab bar above is `px-3` (`:187`) = 12px, so the tab strip's left edge sits **8px inboard of the card borders directly beneath it**. Desktop is correctly proportioned (`:342-345`, `0.5rem` padding / `0.5rem` gap / `0.75rem` bottom) — only the mobile branch inverts.

### D-M14 · The scroll-fade is a false affordance, a shipped primitive re-implemented by hand, and wrong in dark mode
`:364-371`. `.eq-panel-left-wrap::after` paints `linear-gradient(to bottom, transparent, var(--background))`, 2.5rem tall, `z-index: 2`, **unconditionally** — it does not know whether the panel overflows, and it does not retract at scroll end. A permanent "there is more below" signal that lies whenever there is not.
It is also chromatically wrong: it fades to `--background`, but what sits under it is a **card** (`--card`). Light: `hsl(40 30% 98%)` vs `hsl(36 48% 97%)` — a small mismatch. **Dark: `hsl(24 9% 4%)` vs `hsl(24 8% 16%)`** (`dist/styles/tokens/dark-arm.css:42,64`) — the fade drags the bottom 40px of a card toward near-black, reading as a smudge rather than a fade-out.
And glass-ui ships the state-aware primitive **at both pins** — `./fading-scroll` is present in the 4.0.0 exports map *and* the 7.0.0 one, with the exact semantics ("Feather the end edge **while trailing overflow remains**", `dist/components/custom/fading-scroll/FadingScroll.vue.d.ts:6`). `MIGRATION.md:2624` names it as the canonical seat for this pattern. The hand-rolled shim is a shadow of a shipped, better component — and it is available today, under the old pin, with no uplift required.
Minor rider: the fade is 40px tall over a 32px scroll runway (`:374` `pb-8`), so the last 8px of real content sits under the gradient even at full scroll-bottom.

---

## §3 — MINOR

- **D-m1 · The comfort axis is ignored by the toggle.** `EquationModeToggle.vue:46` `height: 2.25rem` and `:69,75` `font-size: 16px / 11px` are raw literals that do not ride `--ui-scale`; the neighbouring glass buttons do (D-B1). 11px is also below the 12px floor the library's own type ladder documents (`MetricBadge.vue.d.ts`: "sm 11px / md 12px").
- **D-m2 · `isDesktop` is dead.** `:45` `useMediaQuery("(min-width: 1024px)")` feeds `:196`/`:219` `&& !isDesktop`, but `.panel-inactive` is *only defined inside* `@media (max-width: 1023px)` (`:437-441`). The JS guard can never change the outcome, and it duplicates the breakpoint in two languages that must now be kept in sync by hand. Delete the composable and the import (`:3`).
- **D-m3 · One un-tokenized easing, in the file that claims the migration is done.** `:418` `transition: color 0.12s ease, background 0.12s ease` — the bare `ease` keyword, while `:443` announces "A.W3.d — bezier→token" and `:444-452` duly use `var(--ease-standard)`/`var(--ease-in)`. The sibling got it right too (`EquationModeToggle.vue:52`). One line missed; the comment now overstates.
- **D-m4 · Durations are raw seconds.** `0.15s / 0.1s / 0.3s / 0.2s / 0.12s` (`:418, 444-452`) while glass-ui publishes `--duration-fast`/`--duration-normal` (used by its own recipes, `dist/styles/cards.css:41-42`). The easing half of the token migration landed; the duration half did not.
- **D-m5 · Session restore is partial and silently changes the reading.** `useEquationCache.ts:10-17` persists `expression · domainStart · domainEnd · nHarmonics · budget · notation`. It does **not** persist `eqMode` (`:43`) or `autoHarmonics` (`:42`). On reload the display flips back to Σ, and auto-harmonics flips back on — so `vizHarmonics` (`:53-55`) recomputes as `min(effectiveN, nHarmonics)` and the *Harmonics* slider (`FunctionInput.vue:183`) shows a different number than the user left, with no indication anything changed.
- **D-m6 · Compute with an empty expression is a dead button.** `:92-93` `const expr = expression.value.trim(); if (!expr) return;` — no validation message, no toast, no field state, and `FunctionInput.vue:143-151`'s Compute button carries no `:disabled`. The control appears live and does nothing.
- **D-m7 · Double elevation on the coefficient popover.** `:394` composes `glass-floating` (which carries its own elevation recipe) and `:400` then stacks a second `box-shadow`.
- **D-m8 · Two measures in one breakpoint band.** At 768–1023px the left panel is capped and centred (`:355-357`, `max-width: 480px; margin: 0 auto`) while the right panel has no cap (`:379-383`) and runs to the 4px gutter. Switching tabs changes the content measure.
- **D-m9 · Forced layout on every mousemove over the card.** `useCoeffHover.ts:29,36-37` runs `.closest()` plus **two** `getBoundingClientRect()` calls per qualifying move, unthrottled, on the element that also hosts a KaTeX subtree. Smoothness impact: **UNPROVEN-NEEDS-LIVE (SS-13)**; the read-per-move is structural.

## §4 — INFO

- **D-i1 · Two `v-html` sinks, both KaTeX with `trust: true`.** `:264` (`popoverHtml`) and `ConvergencePlot.vue:353`. Content is numeric-derived, so no live injection vector is claimed — but `useCoeffHover.ts:65,79,87,92` interpolates `VIZ_COLORS.amber` **into a KaTeX `\color{…}` command string**, i.e. a runtime-resolved token value reaches a command position with `trust: true` enabled (`:100`). Worth a note in the F.W4 model even though the current source is a closed set of hex strings.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

- **D-S1 · `overflow-x: visible; overflow-y: clip` is the *correct* spelling, and almost nobody writes it.** `:357-358`. CSS Overflow 3 coerces `visible` → `auto` only when the other axis is neither `visible` nor `clip`; `visible` + `clip` is the one legal mixed pair, so it survives uncoerced. The intent — let the coefficient popover and hover cards escape horizontally while the panel clips vertically — is delivered exactly. The naive spelling (`overflow-x: visible; overflow-y: auto`) silently degrades to `auto`/`auto` and would have produced a spurious horizontal scrollbar plus a clipped popover. This is a genuinely expert line.
- **D-S2 · The reactive-ordering hazard is fixed *and named at the site*.** `:116-119`: "Capture display key BEFORE effectiveN triggers the vizHarmonics→budget chain, so a subsequent doSimplify can detect the budget changed." The hazard is real (`:151-159` watches `vizHarmonics` and mutates `budget`, which `displayKey()` at `:85-87` reads), the fix is one statement reordered, and the comment explains *why* rather than *what*. This is the single best line of engineering prose in the file.
- **D-S3 · Both status banners are `shrink-0` in a `min-h-0` column.** `:239, 243` `shrink-0` against `:308` `flex-1 min-h-0` and `:380` `min-h-0 min-w-0 flex-1`. The convergence plot absorbs every pixel of slack and the transient banners never squeeze — correct flex hygiene that most stacked panels get wrong by omitting `min-h-0` and then wondering why the canvas will not shrink.
- **D-S4 · `SegmentedTabs variant="underline"` is the one surface in the file that survives 4→7 byte-identically.** `:188`. Producer 7.0.0 `src/components/tabs/index.ts:1-4` keeps exactly two materials, "pill (default, the glass material) · underline (the paper ink-mark)", and `./tabs` is in both export maps. Correct primitive, correct altitude, zero uplift cost — and it is the *only* glass import in this file of which that is true (`hover-card` removed, `metric-badge` removed, `button` prop-axis retired).
- **D-S5 · The prose is precise where precision is hard.** The empty state (`:322-324`) reads "Enter a function to see its Fourier series" set in `cm-serif italic` — register-matched to the paper aesthetic the whole app is built around, not the generic "No data". `Computing…` / `Recomputing…` (`:224, 241`) use U+2026, and the *re*-compute case gets its own honest verb. And the tier vocabulary it renders (`notation.ts:24-42`) is intellectually honest in a way most product copy is not: **"Conjectured — A closed-form pattern was detected by fitting numerical coefficients to rational functions of n. The formula matches but is not proven."** That sentence refuses to overclaim. It should survive any redesign untouched.

---

## §6 — Disposition (which wave owns what)

| wave | rows |
|---|---|
| **F.W1** (tri-package uplift) | **D-B5** (Button `variant`/`size` — *add to the census break surface*), **D-M10** (`Metric` has no `color` — *amends `lane-frontend.md:472`*), D-M3-benefit (coarse-hover → tap-toggle is a *gain*), D-M11 (the inline SVG will be missed by the lucide sweep) |
| **F.W3** (shadow retirement) | **D-M14** (`::after` → `<FadingScroll>`, available at *both* pins), D-M5 (`InfoCard` orphan — extract or delete), D-M12 (`EquationModeToggle` → `SegmentedTabs`); rides R3-7a's `ui/tooltip` budget (35 callsites / 9 consumers; FunctionInput contributes 2) |
| **F.W4** (per-component audit) | **D-B1**, **D-B2**, **D-B3**, **D-B4**, D-M1, D-M2, D-M4, D-M6, D-M7, D-M8, D-M9, D-M13, all §3 MINORs. D-M8/D-M9 join the census's ungated-rAF row (`lane-frontend.md:624`) — glass-ui 7's `DockBackgroundToggle` is the canonical seat. D-i1 joins R6-8's "model must not embed derived back-references" discipline. |
| **glass-BH inbox** (standing relay) | D-M4 (consumers are overpainting `HoverCardContent` — is the `glass-floating` default reaching portaled content?), D-B3 (the tier/energy literals want a *tokenized* semantic-status ramp that clears AA on the light arm; the repo already carries one such override at `style.css:113-127`), D-B5 (MIGRATION.md carries **no** `variant`→`emphasis` call-site table; `grep -n "emphasis" MIGRATION.md` → empty) |

---

*Read-only challenge. Zero product source touched in any repo; the single write is this file. All colour and geometry figures are computed from source literals and installed/producer token sheets — no browser was used. Claims requiring a live paint are marked UNPROVEN-NEEDS-LIVE (SS-13).*
