claude-opus-5[1m]

# CHALLENGE · `FourierMorphSvg.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/decorative/FourierMorphSvg.vue` (41 lines)
**Method** static + source-derived only; **no browser tooling**. Glass-ui **4.0.0** (the installed pin)
read at `web/node_modules/@mkbabb/glass-ui/`; glass-ui **7.0.0** (producer latest) read at
`/Users/mkbabb/Programming/glass-ui/` (`package.json:3` → `"version": "7.0.0"`) for uplift-break
analysis. All contrast ratios computed from declared token values through OKLab/HSL→sRGB→WCAG 2.x
relative luminance; every figure below is reproducible from the cited token line.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Four hypotheses died to their own
falsifiers and are recorded in §5 rather than banked.

**Supersession note (r2).** An r1 of this file existed at this path from an earlier pass of the same
seat. This r2 **re-derived every r1 claim against the live tree rather than inheriting it** — the
`--color-ring` deletion, the six ring-token consumer sites, the `2.50:1` sun ratio, the `""`-path
contract, the axe route coverage, and the `--accent-red` cross-pin identity were each re-measured
(receipts inline). All nine r1 findings survived re-derivation unchanged in substance; **four new
defects and one new superlative are added** (D-6, D-7, D-11, D-13, S-6), three of which come from
reading the *temporal* seam between `DarkModeToggle`'s theme flip and this component's path/colour
props — a seam r1 touched only as "loading: unhandled".

## §0 · The component's true surface

`FourierMorphSvg` **imports nothing**. Its `<script setup>` (`:19-34`) is a single
`withDefaults(defineProps<…>(), …)` call and nothing else: no composable, no glass-ui subpath, no
icon dependency, no util. Its design surface is therefore exactly three things:

1. its own render contract (`:1-17`) and its three-declaration scoped style (`:36-41`);
2. the one glass-ui **token** it names — `var(--accent-red)` (`:30`);
3. its **two** live consumers, which are what actually give it a body, a size, a background, an
   accessible name (or not), and its motion:
   - `web/src/components/layout/DarkModeToggle.vue:7-12` — mounted in `AppHeader.vue:141`, which
     `App.vue:25` renders outside `<RouterView>`, i.e. **present on every route**;
   - `web/src/components/morph/MorphShapePreview.vue:5-9` — the `/morph` route
     (`router/index.ts:102-104`), which is in `VALID_TABS` (`:29`), i.e. nav-visible, not dev-only.

Call-site census: `grep -rl "FourierMorphSvg" web/src` → exactly those two `.vue` consumers plus the
file itself. There is no third.

A 41-line prop-only renderer cannot be audited on the design axis in isolation: proportion, contrast,
motion and a11y are all *resolved* at the consumer. Every finding is anchored to the line in
`FourierMorphSvg.vue` that creates or fails to prevent the condition, **plus** the consumer line where
it manifests.

**Corpus fold.** `formation/fourier/lane-frontend.md:179` books this file as "Path-only SVG renderer,
41 LOC" and `:369` as "Bespoke with no glass-ui analogue" — both re-confirmed, no contradiction.
`lane-frontend.md:419-421` + `CENSUS-2026-08-03.md:95` classify `DarkModeToggle` as a **CHARACTERFUL
SHADOW** of glass-ui 7.0.0's own `dark-mode-toggle/DarkModeToggle.vue` — "keep, reconcile". **D-2 is
the concrete, costed instance of that reconcile-or-drift warning**: the drift is already load-bearing
and already breaks. `lane-frontend.md:616-619`'s PRM inventory is folded verbatim into D-3 (and
extended: it under-counts by one host, see D-3's second half). The adjudicated intake
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md` was searched for
`MorphSvg|DarkModeToggle|MorphShapePreview|accent-red|reduced-motion|aria|svg|contrast`: **zero hits**.
No row of the 38/52-TRUE set reaches this component; the nearest is **X-5** ("66 SFC" — AGREE,
exact), whose denominator includes this file. Nothing here contradicts the intake; nothing here
duplicates it.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · No accessible-name affordance, and the `/morph` consumer ships a nameless button

**Claim.** `FourierMorphSvg` renders a bare `<svg>` with **no `role`, no `aria-label`, no `<title>`,
no `aria-hidden`, and no prop to supply any of them** — the prop set at `:21-27` is exactly
`path | viewBox | strokeColor | strokeWidth`. At `MorphShapePreview.vue:4-10` the component is the
**sole child** of a `<button>` carrying no `aria-label`, no `title`, and no text node:

```
MorphShapePreview.vue:4   <button class="morph-button cartoon-card" @click="$emit('toggle')" :disabled="disabled">
MorphShapePreview.vue:5-9   <FourierMorphSvg :path="currentPath" :stroke-width="4.5" view-box="0 0 200 200" />
MorphShapePreview.vue:10  </button>
```

The button's accessible name computes to the empty string. **WCAG 2.2 §4.1.2 Name, Role, Value
(Level A) failure** on the primary — and only — interactive control of a routed, nav-visible page.

**Provenance.** `FourierMorphSvg.vue:2-16` (no a11y attribute emitted) · `:21-27` (no a11y prop) ·
`MorphShapePreview.vue:4-10` (no name supplied) · `router/index.ts:29,102-104` (`/morph` is real and
nav-visible).

**Why it was never caught.** The repo owns `@axe-core/playwright`, but `AxeBuilder` is instantiated in
exactly two specs (`grep -rl AxeBuilder e2e/` → `visualization-ux.spec.ts`, `visualization-crud.spec.ts`)
and the ux spec navigates `page.goto("/visualize")` (`visualization-ux.spec.ts:47`). **`/morph` is
never axe-scanned.** Axe's `button-name` rule fires here on first contact.

**Falsifier (applied, survived).** *Could Vue's fallthrough save it?* The component has a single root,
so a consumer-supplied `aria-label` would land on the `<svg>` via `$attrs`. Two reasons that does not
rescue it: (a) **the consumer supplies none** — `MorphShapePreview.vue:5-9` passes only `:path`,
`:stroke-width`, `view-box`, verified by reading the whole tag; and (b) even supplied, `aria-label` on
an `<svg>` **without `role="img"`** is not reliably exposed, since `<svg>` has no stable implicit ARIA
role across engines. The contrasting consumer proves the component *can* be driven correctly:
`DarkModeToggle.vue:5` puts a live `:aria-label` on its **button** — the right pattern, absent at the
other call site.

**Falsify me.** Show (i) an `aria-label` / `aria-labelledby` / `title` reaching
`MorphShapePreview.vue:4`'s button in the live tree, or (ii) an axe run over `/morph` returning zero
`button-name` violations. Either kills D-1.

**Repair shape (not a patch — belongs to F.W-frontend).** Optional `title?: string` prop emitting
`role="img"` + `<title>` when present, `aria-hidden="true"` when absent (the honest default for a
component whose directory asserts "decorative"), then name the `/morph` button at the consumer.

---

### D-2 · BLOCKER · The F.W1 tri-package uplift silently deletes this control's focus ring — a CSS-token break the census break surface cannot see

**Claim.** `DarkModeToggle.vue` — the app-wide host of `FourierMorphSvg` — kills the UA focus outline
and re-establishes it from a glass-ui token that **glass-ui 7.0.0 deletes**:

```
DarkModeToggle.vue:94-96    .sun-moon-toggle:focus         { outline: none; }
DarkModeToggle.vue:98-101   .sun-moon-toggle:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }
```

At the **old pin** this resolves — `glass-ui@4/dist/styles/theme/bridges.css` carries
`--color-ring: var(--ring)`, with `--ring` at `tokens/color-radius.css` (`hsl(24 10% 10%)`) and
`tokens/dark-arm.css` (`hsl(48 10% 70%)`). The ring works today.

At **7.0.0 the bridge is gone by deliberate design**, and the producer says so in its own comments.
Re-measured this pass:

```
$ grep -rn -- "--color-ring" /Users/mkbabb/Programming/glass-ui/src/
src/styles/theme/bridges.css:93          /* The shadcn `--color-ring` @theme bridge (the `ring`/…   ← COMMENT
src/styles/tokens/color-radius.css:159   …the theme-bridge `--color-ring`…                          ← COMMENT
$ grep -rnE -- "^\s*--ring\s*:" /Users/mkbabb/Programming/glass-ui/src/styles/
(empty)
$ grep -rn -- "--focus-ring-color:" /Users/mkbabb/Programming/glass-ui/src/styles/
tokens/color-radius.css:161  --focus-ring-color: hsl(24 10% 10%);
tokens/dark-arm.css:133      --focus-ring-color: hsl(48 10% 70%);
tokens/light-dark.css:142    --focus-ring-color: light-dark(hsl(24 10% 10%), hsl(48 10% 70%));
```

**Two comment lines, zero declarations.** The register was renamed to `--focus-ring-color` with the
producer's own words "clean break, no alias — the de-shadcn break".

**The failure mode is total, not graceful.** `var(--color-ring)` with **no fallback** makes the
`outline` declaration *invalid at computed-value time*; per CSS Variables §3 an IACVT declaration
behaves as `unset`, which for the `outline` **shorthand** unsets every longhand — and
`outline-style`'s initial value is `none`. The ring does not degrade to a default colour; **it
disappears**. Because `:focus { outline: none }` (`:94-96`) is a static declaration that stays valid,
the UA fallback is already gone. Post-uplift the sun↔moon toggle — in the header of **every route**
(`App.vue:25` → `AppHeader.vue:141`) — becomes **completely un-focus-indicatable**. **WCAG 2.2 §2.4.7
Focus Visible (Level AA) failure, app-wide.**

**No local or framework rescue.** fourier defines neither token
(`grep -rnE -- "--(color-)?ring\s*:" web/src/` → **empty**; the six hits in `web/src` are all
*consumers*), and Tailwind v4's default theme does not ship `--color-ring`. glass-ui is the sole
provider.

**Blast radius beyond this component** — 6 read sites / 5 files, re-enumerated this pass:

| site | declaration | post-uplift result |
|---|---|---|
| `layout/DarkModeToggle.vue:99` | `outline: 2px solid var(--color-ring)` | ring **gone** (this component's app-wide host) |
| `style.css:140` | `outline: 2px solid var(--ring)` | ring **gone** — and this is the **D.W4.d global block** (`style.css:133-143`) that retrofitted rings onto `.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card` → **4 more classes silently lose theirs** |
| `layout/AppHeader.vue:189` | `outline: 2px solid var(--ring)` | ring **gone** |
| `visualization/ImageUpload.vue:200` | `outline: 2px solid var(--ring)` | ring **gone** |
| `gallery/GalleryCard.vue:222` | `border-color: var(--ring)` | IACVT → `unset` → initial `currentcolor` (degrades, still drawn) |
| `gallery/GalleryCard.vue:223` | `box-shadow: 0 0 0 2px color-mix(… var(--ring) 35% …)` | IACVT → `unset` → `none`, **gone** |

The `style.css:133-143` comment makes the loss doubly pointed: that block exists *because* D.W4.d
found the app had exactly one conformant focus site and retrofitted four more. **The uplift undoes
D.W4.d wholesale**, plus the two sites D.W4.d cited as already-correct.

**Contradiction with the corpus — explicit, and the reason this is a BLOCKER.**
`CENSUS-2026-08-03.md` §9 items 3–4 enumerate the uplift break surface as: `metric-badge` ×7 files,
`hover-card` ×2, `hover-popover` ×2, dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1),
**`ToastVariant` definition-absent → hard typecheck break**, `lucide-vue-next → @lucide/vue` ×35,
pencil-boil `0.4.1→^0.11.2`. **Every listed item is a JS/TS import or type break.** The ring-token
deletion is a **CSS custom-property break**: invisible to `vue-tsc`, invisible to the build, invisible
to the 29 Playwright specs (none assert a focus outline), and — because axe never visits `/morph` and
`:focus-visible` colouring is not in axe's automatic rule set anyway — invisible to the a11y net too.
CENSUS §9 item 11 already concedes "no unit-test runner… `vue-tsc -b` is the only gate"; D-2 is a
concrete member of that unmeasured remainder, and exactly the class of break a typecheck-shaped
framing cannot see. **The break surface must gain a token-level column before F.W1 executes.**

**Falsifier (applied, survived).** I checked whether the token merely *moved*: it did not — 7.0.0
renames the register and the producer's own comment says "clean break, no alias". I checked whether
fourier or Tailwind backstops it: neither does. I checked the sibling tokens this component actually
depends on and they **do** survive byte-identical (S-5) — so this is a specific deletion, not a
mis-read of a wholesale token reorganisation.

**Falsify me.** Show a `--color-ring` or `--ring` **declaration** (not comment) anywhere in glass-ui
7.0.0's shipped styles, or a fourier-local definition landing before F.W1. Either kills D-2.

---

## §2 · MAJOR

### D-3 · MAJOR · The morph has no `prefers-reduced-motion` gate anywhere in its stack, and one of the two hosts gates nothing at all

**Claim.** The animation this component exists to display is entirely ungated.
`useFourierMorph.ts` (read whole, 230 lines) contains **no `matchMedia`, no `prefers-reduced-motion`,
no PRM branch**; `morphTo` (`:145-213`) unconditionally runs three sequential `keyframes.js Animation`
phases — settle-out → morph → settle-in, `150+50+150 = 350 ms` default (`DEFAULT_MORPH_CONFIG:59-68`)
— mutating `currentPoints` every frame, which flows through `currentPath` (`:81`) to this component's
`:d` (`FourierMorphSvg.vue:9`). `FourierMorphSvg` itself has no PRM affordance: its scoped style
(`:36-41`) is three declarations with no `@media` block, and it offers no reduced render path.

`DarkModeToggle`'s PRM block is a **decoy**: `:104-108` reduces only `transition: none` on the
button's `transform` — the *hover lift*. The path morph, the actual motion, is untouched.

**New this pass — the second host gates nothing.** `MorphShapePreview.vue` (read whole, 175 lines)
contains **zero** `prefers-reduced-motion` blocks, yet declares
`transition: border-color .2s, box-shadow .2s, transform .15s` (`:97`) plus
`:hover { transform: scale(1.02) }` (`:108-112`) and `:active { transform: scale(0.98) }` (`:114-116`)
— and inherits a *further* ungated motion layer from glass-ui, since `.cartoon-card` → `@apply
cartoon-surface` (`style.css:108-112`) resolves to
`transition: translate var(--duration-normal) var(--spring-smooth), box-shadow …` with a
`&:hover:not(:disabled) { translate: var(--lift-sm) … }` (`glass-ui@4/dist/styles/cards.css:33-49`).
So the `/morph` host stacks **three** ungated animations on the one control, while the header host
gates the one thing that barely matters. `lane-frontend.md:616-619`'s PRM inventory lists
`DarkModeToggle.vue:104` among its 8 CSS `reduce` blocks and **lists `MorphShapePreview` nowhere** —
the corpus's own table corroborates the hole from both ends.

**This is inconsistency, not a considered exemption.** `router/index.ts:9-13` defines
`prefersReducedMotion()` and gates the View-Transitions route morph on it, commenting "*only when
`document.startViewTransition` exists AND the user has not requested reduced motion*". The sibling
file in this very directory, `decorative/SvgFilters.vue:7-9,24,36`, JS-gates its boil animators on
`matchMedia("(prefers-reduced-motion: reduce)").matches`. `useFourierMorph` appears in neither column
of the corpus inventory.

**Severity discipline.** WCAG 2.2 §2.3.3 Animation from Interactions is **Level AAA**, the motion is
user-initiated, non-looping, and short. Hence MAJOR, not BLOCKER. It remains a real design-system
conformance gap in a codebase that has explicitly adopted the gate elsewhere — and CENSUS §9 item 9
already books a "[P3] Reduced-motion gap" for two *other* clocks (`stores/animation.ts`,
`ConvergencePlot`); **this is a third clock that book does not name.**

**Falsify me.** Point to a PRM branch in `useFourierMorph.ts`, in `lib/easings.ts`'s resolution path,
or inside `keyframes.js`'s `Animation` that collapses duration to 0 under `reduce`. Any one kills D-3.

---

### D-4 · MAJOR · The header toggle's hardcoded sun colour fails non-text contrast in light mode, and bypasses the token system entirely

**Claim.** `DarkModeToggle.vue:30-31` hardcodes two literal RGB triples and lerps between them
(`lerpColor`, `:39-44`) into this component's `strokeColor` prop (`:10`), which becomes
`style="color: rgb(…)"` on the `<svg>` (`FourierMorphSvg.vue:6`) and thence the stroke via
`currentColor` (`:11`):

```
DarkModeToggle.vue:30   const SUN_COLOR  = [232, 136, 69]  as const; // #E88845
DarkModeToggle.vue:31   const MOON_COLOR = [192, 132, 252] as const; // #c084fc — matches VIZ_COLORS.legendre
```

`strokeColor` at rest is `SUN_COLOR` when `!isDark` (`:46-51`). Resolved surface:
`--background: var(--neutral-0)` (`glass-ui@4/dist/styles/tokens/color-radius.css:57,40`) =
`hsl(40 30% 98%)` = `rgb(251,250,248)`; dark arm `hsl(24 9% 4%)` = `rgb(11,10,9)`
(`dark-arm.css:42`). The header is `bg-background/90` over that same token (`AppHeader.vue:54`).

| state | stroke | surface | WCAG contrast | §1.4.11 (3:1) |
|---|---|---|---|---|
| **light mode, at rest (sun shown)** | `#E88845` | `rgb(251,250,248)` | **2.50:1** | ❌ **FAIL** |
| light mode, morph midpoint | `rgb(212,134,161)` | `rgb(251,250,248)` | 2.61:1 | ❌ FAIL |
| dark mode, at rest (moon shown) | `#c084fc` | `rgb(11,10,9)` | 7.49:1 | ✅ pass |

The graphic is the **entire** visual affordance of the control — the button has no label, no icon
besides this SVG, no border, `background: transparent` (`:76-87`) — so §1.4.11 Non-text Contrast
(Level AA) applies squarely: a graphical object required to understand and operate the control.
**The light arm fails at 2.50:1 against a 3:1 floor, and light is the default arm** (`index.html:22-32`
defaults to light absent a stored preference).

**The token bypass is the design-axis root cause.** These are raw JS literals in a repo whose entire
palette is glass-ui tokens. They cannot respond to theme, cannot be corrected by the light/dark arms,
and cannot be swept by a token audit. Compare the repo's own precedent, 20 lines away in the same
stylesheet: `style.css:114-131` books a **D.W4.d light-mode `--viz-amber` darken** for exactly this
reason — glass-ui's light `--viz-amber` measured ≈3.54:1, overridden to `hsl(35 76% 35%)` ≈4.6:1, dark
arm untouched, with a glass-ui carry held as a coordination ask (CENSUS §9 item 8). **`#E88845` is the
same defect at a worse ratio (2.50 vs 3.54) and was never booked** — because it is a JS literal, not a
CSS token, so the D.W4.d contrast sweep structurally could not see it. Note the asymmetry the literals
create: `MOON` is annotated "matches `VIZ_COLORS.legendre`" (`:31`) — it *shadows* a token that
exists — while `SUN` matches nothing at all.

**Falsifier (applied, partially survived — stated honestly).** *Is this decorative, exempting it from
1.4.11?* No — it is the sole visual of an operable control, which the exemption explicitly excludes.
*Is the toggle over a non-`--background` surface?* `AppHeader.vue:54` is
`bg-background/90 … supports-[backdrop-filter]:bg-background/60`; at 60% alpha the effective backdrop
is still page background (same token) plus blur, so the ratio holds to within rounding.
**UNPROVEN-NEEDS-LIVE (SS-13):** the exact composited backdrop under `backdrop-blur-md` when
arbitrary content scrolls beneath the header is not statically decidable; the ratio could move either
way. The **2.50:1 figure against the declared token is exact and reproducible**; only the
scrolled-content edge case needs a live probe.

**Falsify me.** Recompute `#E88845` against `hsl(40 30% 98%)` and get ≥3:1, or show the sun arm is
never rendered in light mode. Either kills D-4.

---

### D-5 · MAJOR · The `path` contract has no empty state, and the app-wide toggle provably renders blank on first paint

**Claim.** `path` is a **required, non-optional `string`** (`FourierMorphSvg.vue:23`) bound straight
to `<path :d="path">` (`:9`) with no guard, no `v-if`, no fallback, no skeleton. The empty string is
not hypothetical — it is a **designed return value**:

```
lib/svg-fourier.ts:51   if (points.length < 2) return "";
useFourierMorph.ts:80   const currentPoints: Ref<[number, number][]> = ref([]);
useFourierMorph.ts:81   const currentPath = computed(() => pointsToSvgPath(currentPoints.value));
```

so `currentPath` is `""` until `setShape` runs — and at `DarkModeToggle.vue:58-60` `setShape` is
called in **`onMounted`**, which fires *after* the initial VDOM is mounted. Vue's first render
therefore commits with `path === ""`, and `<path d="">` paints **nothing**. The header toggle is a
blank `40 × 40 px` hole (`--toggle-size: 2.5rem`, `AppHeader.vue:242`; `2.75rem` at the breakpoint,
`:256`) for at least one committed frame on every cold load — a nameless, invisible, still-clickable
button.

**State-coverage verdict for the axis.**
*Empty*: **unhandled** — renders nothing, silently.
*Loading*: **unhandled**, and the component genuinely *has* a loading state, because `morphTo` awaits
a **dynamically imported engine** on first use (`useFourierMorph.ts:39-44,149` — the documented
keyframes-2.2.0 lazy boundary), so the very first toggle click waits on a network/parse round-trip
with **no indicator at all** on the header control. `MorphShapePreview` at least surfaces `:disabled`
+ `cursor: wait` (`:118-120`); `DarkModeToggle` has neither — it silently drops the click via the
`phase !== "idle"` early-return (`:63`). (And that return is itself not armed during the load window
— see **D-7**.)
*Error*: **unhandled** — `morphTo` is `async` and awaited at `DarkModeToggle.vue:71` with **no
`.catch`**; if `loadAnimationEngine()` rejects (a chunk 404 after redeploy — a failure mode this repo
has already been bitten by, cf. `docs/tranches/I/FINAL.md`'s keyframes-2.2.0 runtime break), it is an
unhandled rejection and the toggle is left permanently mid-phase with the guard closed.

**Falsifier (applied, survived).** *Does the pre-paint theme bootstrap fill this?* `index.html:22-32`
(cited at `lane-frontend.md:610`) sets the theme *class* before paint, but nothing computes Fourier
points — those need `prepareFourierShape` + `interpolateAtHarmonicLevel`, invoked only from
`onMounted`. *Is `onMounted` early enough?* No, by construction. **UNPROVEN-NEEDS-LIVE (SS-13):**
whether the blank frame is *perceptible* (1 frame vs several) depends on JSON parse + coefficient
evaluation cost for `sun.json` / `moon.json`; the **existence** of at least one blank committed frame
is proven statically, its **duration** is not.

**Falsify me.** Show `setShape` (or an equivalent synchronous seed) running before first render —
`setup()` body, a `path` default, or SSR-serialised state. Any of those kills D-5.

---

### D-6 · MAJOR · NEW · The first theme toggle paints the *outgoing* glyph in the *incoming* colour — and that frame fails contrast in one direction

**Claim.** `DarkModeToggle.handleToggle` flips the theme **before** it starts the morph, and the morph
does not begin until after an `await`:

```
DarkModeToggle.vue:68   morphingToDark.value = !isDark.value;
DarkModeToggle.vue:69   toggleDark();                     ← theme class flips NOW, synchronously
DarkModeToggle.vue:71   await morph.morphTo(from, to);
useFourierMorph.ts:146  stopAnim();
useFourierMorph.ts:149  const Animation = await getAnimationCtor();   ← real async gap on first use
useFourierMorph.ts:169  phase.value = "settle-out";                    ← phase set only AFTER it
```

Inside that gap `phase` is still `"idle"`, so `strokeColor` takes its idle branch
(`DarkModeToggle.vue:47-51`) and returns the colour of the **new** theme — while `path` is still the
**old** shape, because `currentPoints` is untouched until the first tick. The rendered result:

| first-ever toggle | glyph (path) | stroke colour | background | frame reads as | contrast |
|---|---|---|---|---|---|
| light → dark | **sun** | `#c084fc` (moon purple) | dark | a **purple sun** on a dark page | 7.57:1 ok |
| dark → light | **moon** | `#E88845` (sun orange) | light | an **orange moon** on a light page | **2.53:1 ❌ §1.4.11** |

This is a *paintable* frame, not a microtask artefact: `getAnimationCtor()` (`:39-44`) resolves a real
dynamic `import()` on first use, which is a macrotask-scale boundary, so the browser paints inside it.
(On subsequent toggles the promise is already resolved and the continuation runs in the same microtask
checkpoint as Vue's flush, so no paint occurs — the defect is **first-toggle-scoped**, which is
precisely the moment a user is learning what the control does.)

**Design reading.** The control's *only* semantics are "which glyph is showing". For the duration of a
chunk fetch it shows the glyph of the mode you just left, tinted with the colour of the mode you just
entered — an indicator that is simultaneously wrong on shape and wrong on colour-pairing. The dark→light
direction additionally lands the sub-3:1 orange from D-4 onto a *moon*, so D-4's failure is not confined
to the resting state.

**Provenance.** `DarkModeToggle.vue:62-72` (order: flip, then await) · `:46-56` (`strokeColor`'s idle
branch keys off `isDark`, not off the path) · `useFourierMorph.ts:146-169` (phase set after the await)
· `FourierMorphSvg.vue:6,9` (the component faithfully renders whatever mismatched pair it is handed).

**Falsifier (applied, survived).** *Does the `phase === "idle"` branch ever see the pre-flip `isDark`?*
No — `toggleDark()` at `:69` mutates the same ref `strokeColor` reads at `:48`, and Vue flushes that
change before the awaited continuation resumes. *Is the gap real on every toggle?* No, and I say so
above; the claim is scoped to the first. *Could the component defend itself?* Partly — it could accept
the colour as a function of the path's own progress rather than of ambient theme state; that it takes
two independent, unvalidated props (`path`, `strokeColor`) with no coupling contract is the
component-side share of this defect.

**Falsify me.** Show `phase` being set to a non-idle value **before** the `await` at
`useFourierMorph.ts:149`, or show `strokeColor` keying off `morphProgress` rather than `isDark` in the
idle branch. Either kills D-6.

---

### D-7 · MAJOR · NEW · The re-entrancy guard is not armed across the lazy-engine await, so a double-click on the first toggle can leave the glyph permanently contradicting the theme

**Claim.** `DarkModeToggle.vue:63` guards re-entry with `if (morph.phase.value !== "idle") return;` —
but D-6 established that `phase` stays `"idle"` for the whole duration of the first
`loadAnimationEngine()` resolve (`useFourierMorph.ts:149` precedes `:169`). **The guard is open exactly
when the operation is slowest.** A second click inside that window passes the guard and:

1. calls `toggleDark()` a second time (`:69`) — the theme returns to where it started;
2. starts a second `morphTo`, whose first act is `stopAnim()` (`:146`), which calls
   `currentAnim.stop()`; `keyframes@4.3.0`'s engine implements
   `stop() { …, this.playback.stop(), this.reset(), this._resolvePlay(), … }`
   (`node_modules/@mkbabb/keyframes.js/dist/engine-BKm1GcJT.js:327-328`, and the second class at
   `:937-938`) — **it resolves the pending `play()` promise**, so pipeline A does *not* die: it
   advances to its next phase and keeps writing.
3. Both pipelines then interleave writes to `currentPoints`, `phase`, `harmonicLevel` and
   `morphProgress`, each stopping the other's animation, until whichever finishes last writes
   `phase = "idle"` and its own terminal shape (`useFourierMorph.ts:196-212`).

Because **nothing re-syncs the glyph to `isDark` afterwards** — `DarkModeToggle` has exactly one
`setShape` call and it is inside `onMounted` (`:58-60`); there is no `watch(isDark, …)` — the losing
pipeline's terminal shape can persist. The user is left looking at a **moon in light mode** (or a sun
in dark mode) with the guard reopened, and the only way out is another toggle, which flips the theme
again. For a control whose entire job is to indicate mode, that is a durable false indicator, not a
transient one.

**Provenance.** `DarkModeToggle.vue:62-72` (guard, double `toggleDark`, no post-morph re-sync) ·
`useFourierMorph.ts:146-149` (guard-relevant await ordering) · `:169,182,196,210-212` (phase writes) ·
`keyframes.js/dist/engine-BKm1GcJT.js:327-328,937-938` (`stop()` resolves `play()`).

**Falsifier (applied, survived).** *Does `stop()` leave the awaiting promise hanging, so pipeline A
simply dies?* I checked the shipped engine rather than assuming: `_resolvePlay()` is called on both
`stop()` implementations, so the promise **does** resolve and A survives — which makes the interleave
real rather than speculative. *Is the window reachable by a human?* Only on the first toggle of a
session, and only if the engine chunk takes longer than the double-click interval — but that window is
exactly the one with **no loading affordance at all** (D-5), so a second click is the natural user
response. *Does `MorphShapePreview` share the defect?* No — `FourierMorphDemo.vue:113,128,138` derives
`isAnimating` and passes `:disabled="isAnimating"` (`:18`), which at least hardens the pointer path
(though it inherits the same phase-timing weakness, and see D-10 for what the disable costs).
**UNPROVEN-NEEDS-LIVE (SS-13):** the *probability* of landing in the window depends on chunk latency;
the *reachability* is proven statically from the ordering.

**Falsify me.** Show a guard that closes before the `await` (an `isMorphing` ref set synchronously in
`handleToggle`, or `phase` set before `getAnimationCtor()`), or a `watch` that re-seeds the shape from
`isDark` after any morph. Either kills D-7.

---

## §3 · MINOR

### D-8 · MINOR · Inline `style` on the root makes stroke colour unstylable by consumers

`FourierMorphSvg.vue:6` writes `:style="{ color: strokeColor }"` — an **inline** declaration, which
outranks every author stylesheet rule short of `!important`. A consumer therefore **cannot** recolour
the stroke from CSS: `.morph-button:hover .fourier-morph-svg { color: … }` is dead on arrival. The
consequence is visible at `MorphShapePreview.vue:108-112`, where hover restyles `border-color` and
`box-shadow` but leaves the shape — the actual subject of the card — chromatically inert; and at
`:118-120`, where `:disabled` alters only the cursor, so a disabled control looks identical to an
enabled one. `.sun-moon-toggle:hover` (`:89-92`) likewise can only scale, never tint. **Design-axis
cost: hover / active / disabled / focus feedback on this component is confined to the *frame*, never
the *figure*.**

**Falsifier (applied, survived; severity reduced accordingly).** A consumer *can* drive colour through
the reactive prop, and `DarkModeToggle.vue:46-56` does exactly that — so this is a friction and
encapsulation defect, not a functional block. The clean shape is a `--fourier-morph-color` custom
property with the prop as its fallback, which restores CSS reach without losing the prop API.
**Provenance.** `FourierMorphSvg.vue:6` · `MorphShapePreview.vue:108-120` · `DarkModeToggle.vue:89-92`.

### D-9 · MINOR · No proportion contract: relative stroke weight differs 3.1× between the two hosts

`strokeWidth` is applied raw in user units (`FourierMorphSvg.vue:12`) with no
`vector-effect="non-scaling-stroke"`, so it scales with the box — and the component publishes nothing
relating weight to render size (`:26` is the bare `strokeWidth?: number`, no doc line). Worked from the
tree:

| host | rendered box | scale | `strokeWidth` | rendered stroke | **stroke ÷ box** |
|---|---|---|---|---|---|
| `DarkModeToggle` | 40 px (`AppHeader.vue:242`), padding 0 (`:82`) | 0.20 | **14** (`:9`) | 2.80 px | **7.00 %** |
| `MorphShapePreview` < 640 px | 120 px − 2×0.625rem = 100 px (`:91-98`) | 0.50 | **4.5** (`:7`) | 2.25 px | **2.25 %** |
| `MorphShapePreview` ≥ 640 px | 180 px − 2×1rem = 148 px (`:100-106`) | 0.74 | **4.5** | 3.33 px | **2.25 %** |

The same line drawing is therefore rendered at **7 % relative weight in the header and 2.25 % on the
`/morph` page** — a 3.11× incoherence — while in *absolute* terms the 40 px glyph (2.80 px) is drawn
nearly as heavily as the 148 px one (3.33 px). Aristotelian proportion break: the part does not hold
its ratio to the whole as the whole is re-scaled, and nothing in the API relates the two.

**Falsifier (applied, survives only weakly at the breakpoint — hence MINOR).** Uniform scaling of a
figure *including* its stroke is the correct treatment if the intent is "zoom the drawing", which is
defensible *within* `MorphShapePreview` (its 2.25 % is in fact constant across its own breakpoint —
the honest reading is that its internal proportion is **correct**). The defect is therefore **between**
hosts, not within one: the component publishes no size↔weight contract, so two call sites picked
weights 3.11× apart into an identical viewBox. **Provenance.** `FourierMorphSvg.vue:12,26` ·
`MorphShapePreview.vue:6-8,91-106` · `DarkModeToggle.vue:9` · `AppHeader.vue:242,256`.

### D-10 · MINOR · Morph phase is never announced, and the `/morph` button steals its own focus

Adjacent to the component, on its axis. `MorphShapePreview.vue:13-26` and `:30-43` render a
live-changing `phase` chip (`idle → settle-out → morph → settle-in`) with **no `aria-live`, no
`role="status"`** — the entire state readout of the demo is silent to assistive tech. The markup is
**duplicated** for the desktop/mobile arms, so a fix must land twice and a naive `aria-live` on both
would double-announce (both arms are in the DOM at all times; only `display` differs, `:124-145`).
Compounding: the button binds `:disabled="disabled"` (`:4`) driven by `isAnimating`
(`FourierMorphDemo.vue:113,18`), so **activating it disables it** — a keyboard user's focus is dropped
to `<body>` mid-interaction and must be re-tabbed after every morph.
**Provenance.** `MorphShapePreview.vue:4,13-43,124-145` · `FourierMorphDemo.vue:18,113`.

### D-11 · MINOR · NEW · The D.W4.d focus-ring sweep enumerated classes by hand and missed `.morph-button` — and the uplift inverts the result

`style.css:133-143` retrofits the house focus ring onto exactly four hand-listed classes
(`.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`), with a comment naming the
canonical site it mirrors (`AppHeader.vue:174-177`, "the only pre-W4 conformant site").
**`.morph-button` is not in the list**, and `MorphShapePreview.vue` declares no `:focus` or
`:focus-visible` rule of its own (`grep -n focus src/components/morph/*.vue` → only
`HarmonicLevelGrid.vue:202` and `MorphPhaseConfig.vue:188`, neither this control). The primary control
of the `/morph` route is thus the one place the sweep did not reach.

Today this is benign — nothing suppresses the UA outline for `.morph-button` (glass-ui's
`cartoon-surface` sets only `border-width`, `box-shadow`, `translate`, `transition`;
`glass-ui@4/dist/styles/cards.css:33-49` — **no `outline` declaration**), so the browser default ring
still draws. It is booked because it is (a) an *inconsistency* — the same control gets a token ring on
four sibling surfaces and a UA ring here, which will not match the house `2px + 2px offset`; and (b)
**inverted by D-2**: post-uplift the four enumerated classes **lose** their rings while `.morph-button`
keeps its UA default. The sweep's beneficiaries become its victims and its omission becomes the only
survivor.

A second, smaller ordering fragility in the app-wide host: `.sun-moon-toggle:hover { outline: none }`
(`DarkModeToggle.vue:89-92`) and `.sun-moon-toggle:focus-visible { outline: 2px … }` (`:98-101`) have
**identical specificity** (0,2,0); the focus ring survives a hovered-and-focused element only because
it appears later in source order. Deleting or reordering the hover rule silently removes the ring.

**Falsifier (applied, survived).** *Does something else give `.morph-button` a token ring?* I grepped
the global block, the SFC, and the glass-ui utility it composes — nothing. *Does `cartoon-surface`
suppress the UA outline (which would promote this to MAJOR today)?* No — read the utility body; there
is no `outline` declaration, so the finding stays MINOR at the old pin.
**Provenance.** `style.css:133-143` · `MorphShapePreview.vue:4,91-120` ·
`glass-ui@4/dist/styles/cards.css:33-49` · `DarkModeToggle.vue:89-101`.

---

## §4 · INFO

### D-12 · INFO · Prop-type asymmetry closes the token door on `strokeWidth`

`strokeColor?: string` (`:25`) accepts a CSS variable and defaults to one (`:30`), but
`strokeWidth?: number` (`:26`) is numeric-only (`:31`, default `3`), so a consumer cannot pass
`var(--stroke-md)` or `calc()`. Given the 3.11× spread between the two live call sites (D-9), the one
prop that most wants tokenisation is the one that forbids it. Widening to `number | string` costs
nothing — SVG `stroke-width` accepts both. **Provenance.** `FourierMorphSvg.vue:25-26,30-31`.

### D-13 · INFO · NEW · Two of the three defaults are dead, and the `viewBox` constant is triplicated

The component declares three defaults (`:28-32`). Measured against the complete call-site census (§0,
exactly two consumers):

| default | value | exercised by | status |
|---|---|---|---|
| `viewBox` | `"0 0 200 200"` (`:29`) | neither — `MorphShapePreview.vue:8` and `DarkModeToggle.vue:11` **both pass the identical literal** | **dead**, and the magic constant now lives in **three** files |
| `strokeColor` | `var(--accent-red)` (`:30`) | `MorphShapePreview` (passes no `stroke-color`) | live — and correct, see **S-3** |
| `strokeWidth` | `3` (`:31`) | neither (`4.5` and `14`) | **dead** |

Design cost: the one default that documents a real design decision (the 200-unit design grid the
`fourier-paths/*.json` assets are authored in) is restated at every call site instead of being
inherited, so the grid can drift per-consumer with no compile error; and `strokeWidth: 3` is a
never-rendered number that reads as guidance while guiding nothing (cf. D-9's missing proportion
contract). **Falsifier:** if a third consumer existed that took the defaults, the "dead" verdict would
fall — `grep -rl "FourierMorphSvg" web/src` returns exactly the two hosts plus the file itself.
**Provenance.** `FourierMorphSvg.vue:28-32` · `MorphShapePreview.vue:6-8` · `DarkModeToggle.vue:9,11`.

---

## §5 · Hypotheses that died to their own falsifiers (L-18 discipline — recorded, not banked)

1. **"`--accent-red` is undefined; the default stroke silently inherits."** *Refuted.* Defined in
   glass-ui@4 at `tokens/color-radius.css:258` (light `oklch(0.574 0.216 27.5)`),
   `tokens/dark-arm.css:111` (dark `oklch(0.644 0.165 22.9)`), and `tokens/light-dark.css:142`. The
   default resolves. → became **S-3 / S-5**.
2. **"`var(--color-ring)` is already undefined; the toggle has no focus ring today."** *Refuted at the
   old pin* — `glass-ui@4/dist/styles/theme/bridges.css` defines it. The finding survived only when
   re-aimed at **7.0.0**. → became **D-2**. The audit's key methodological note: **this class of defect
   is invisible unless both pins are read.**
3. **"No `width`/`height`/`aspect-ratio` means an unpredictable box."** *Refuted.* An `<svg>` with a
   `viewBox` and no width/height attributes carries an intrinsic aspect ratio; with `display: block`
   (`:38`) it fills the inline axis and derives its block size from that ratio. Both consumers wrap it
   in a square, explicitly-sized box (`DarkModeToggle.vue:78-79`, `MorphShapePreview.vue:92-93,101-104`),
   so the geometry is determinate. Not a defect.
4. **NEW · "The double-click interleave hangs pipeline A forever, permanently disabling the toggle."**
   *Refuted by reading the shipped engine.* `stop()` calls `_resolvePlay()`
   (`keyframes.js/dist/engine-BKm1GcJT.js:327-328,937-938`), so the awaited promise resolves and A
   continues. The defect is real but its shape is **interleave and false final state**, not deadlock —
   booked accordingly as **D-7 (MAJOR)** rather than as a blocker.

---

## §6 · Superlatives (L-18 runs both ways — each with its falsifier)

**S-1 · The `color` + `currentColor` indirection is the right primitive.** `:style="{ color: … }"`
(`:6`) with `stroke="currentColor"` (`:11`) makes the stroke token-addressable, inheritable by any
future child, and **benign under failure**: because `color` is an inherited property, an invalid
`strokeColor` is IACVT → `inherit`, so the shape still paints in the ambient text colour rather than
vanishing. Contrast **D-2**, where the same IACVT rule applied to the non-inherited `outline`
*shorthand* yields `outline-style: none` and total loss. The component picked the property whose
failure mode is survivable. *Falsifier:* the **inline** placement is separately a real cost, booked
honestly as **D-8**. The primitive is right; the delivery mechanism is not.

**S-2 · `overflow: visible` is a considered, correct choice, not a leftover.** `:39`. SVG strokes are
centred on the path, so half of `stroke-width` falls outside the geometry; at `DarkModeToggle.vue:9`'s
`stroke-width="14"` in a 200-unit viewBox that is 7 units — **3.5 % of the box clipped on every edge**
under the UA default `overflow: hidden`, visibly flattening the crescent's extremes. `overflow:
visible` is precisely the fix. *Falsifier:* it does let the graphic paint outside its box; at the
shipped header size (40 px) the bleed is `14/200 × 40 / 2 = 1.4 px` per side, and `.sun-moon-toggle`
is `flex-shrink: 0` (`:86`) in a gapped header row, so no overlap occurs. Sound at the sizes actually
shipped.

**S-3 · The default stroke colour clears non-text contrast in BOTH arms — the only colour path here
that does.** `var(--accent-red)` (`:30`) against `--card` — the `cartoon-card` background
(`style.css:108-112`), `hsl(36 48% 97%)` light / `hsl(24 8% 16%)` dark — measures **4.62:1 light /
4.07:1 dark** (light `oklch(0.574 0.216 27.5)` → `rgb(219,36,36)`; dark `oklch(0.644 0.165 22.9)` →
`rgb(224,92,92)`), clearing §1.4.11's 3:1 with headroom and in fact clearing §1.4.3's 4.5:1 in light;
against `--background` it is 4.69:1. `MorphShapePreview` — which takes the default (`:5-9` passes no
`stroke-color`) — is therefore **contrast-correct**, while `DarkModeToggle`, which overrides it with
literals, is not (**D-4**). *The component's default is better than what its consumer substitutes.*
*Falsifier:* ratios computed from declared token values via OKLab→sRGB→WCAG; they hold for the declared
surface, and the scrolled-backdrop edge case remains UNPROVEN-NEEDS-LIVE as in D-4.

**S-4 · Zero glass-ui import surface ⇒ zero exposure to the census break surface.** The `<script
setup>` block (`:19-34`) contains **no import statement of any kind**. Checked item by item against
CENSUS §9 items 3–4: `metric-badge` — not imported; `hover-card` / `hover-popover` — not imported;
dock members (`DockIconButton`, `DockDropdownTrigger`) — not imported; `ToastVariant` — not referenced;
`lucide-vue-next` — no icons; `pencil-boil` — not used (its `useLineBoil` lives in the sibling
`decorative/SvgFilters.vue`, not here). Under the F.W1 tri-package transaction (glass 4→7 ∧ keyframes
4.3→6 ∧ value 0.13→4.0, atomic) **this file's module-graph delta is exactly nil** — notable because
its *stack* is maximally exposed (`useFourierMorph.ts:14` imports `loadAnimationEngine` from
keyframes, the middle leg of the deadlock). `lane-frontend.md:369` classes it "bespoke with no
glass-ui analogue"; here the bespokeness is an asset. *Falsifier:* nil **import** exposure is not nil
**token** exposure — D-2 is precisely a token-level break reaching this component through its host, so
S-4 must be read as scoped to the module graph, not as "uplift-safe" tout court.

**S-5 · The one glass-ui token this component names is byte-identical across the uplift.**
`--accent-red` at 7.0.0: `tokens/color-radius.css:321` `oklch(0.574 0.216 27.5)` ·
`tokens/dark-arm.css:154` `oklch(0.644 0.165 22.9)` · `tokens/light-dark.css:169` the matching
`light-dark()` pair — **identical values to 4.0.0** (`:258` / `:111` / `:142`), and the
`--color-accent-red` bridge survives too (`@7 theme/bridges.css:200`, cf. `@4:184`). The sibling
`--accent-pink` used by `MorphShapePreview.vue:171-174` likewise survives unchanged. **`:30`'s default
needs no migration** — a clean, cheap row for the F.W1 ledger. *Falsifier:* verified against glass-ui
7.0.0 **source on disk**, not a changelog; if the published artifact diverges from that working tree
the claim needs re-checking — though the same caveat then applies, in the opposite direction, to D-2's
stronger and more consequential deletion evidence.

**S-6 · NEW · The header host labels the *action*, not the *state* — the correct toggle idiom, applied
live.** `DarkModeToggle.vue:5` binds `:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark
mode'"`. This is the WAI-ARIA-APG-endorsed treatment for a mode switch that changes what it does: it
avoids the double-negative of a state label ("Dark mode" — is it on, or does it turn on?) and avoids
mislabelling a mode switch as a pressed-state toggle. It also matches the repo's own written a11y
rationale elsewhere — `EasingPicker.vue:9-15` chooses `role="menuitemradio"` + `aria-checked` with the
comment "`aria-pressed` would mislabel a radio as a toggle" (banked at CENSUS §8). Two independent
controls, one consistent and *articulated* doctrine. *Falsifier:* the competing school prefers a stable
label plus `aria-pressed`, so that the accessible name does not change under the user; that reading is
defensible, but it is a stylistic dispute, whereas `MorphShapePreview`'s **absent** name (D-1) is not.
Booked as a superlative because the doctrine here is deliberate, documented in a sibling file, and
correctly applied to the **button** rather than to the SVG — which is exactly the pattern D-1 asks the
other call site to adopt.

---

## §7 · Verdict

**13 defects · 2 BLOCKERS · 6 superlatives.**

The 41 lines are, in themselves, close to correct: a good colour primitive (S-1), a deliberate overflow
choice (S-2), a contrast-passing and uplift-stable default (S-3 / S-5), zero module-graph exposure to
the F.W1 transaction (S-4). **The component's defect is one of *contract*, not of code.** It publishes
no accessible-name affordance (D-1), no reduced-motion affordance (D-3), no empty/loading/error state
(D-5), no proportion contract (D-9), no coupling contract between the two props that must agree
(D-6), no CSS reach (D-8), and two of its three defaults are never exercised (D-13). A prop-only
renderer that declines to constrain its consumers gets the consumers it deserves — and both live call
sites duly violate a different WCAG criterion: `/morph` ships a nameless button (D-1, §4.1.2 A) and the
header toggle ships a 2.50:1 sun (D-4, §1.4.11 AA), plus a first-toggle frame that is wrong on shape,
wrong on colour, and — in the dark→light direction — sub-3:1 as well (D-6).

**The temporal seam is the newly-opened front.** D-6 and D-7 both descend from one ordering decision at
`DarkModeToggle.vue:68-71`: the theme is flipped **synchronously**, the indicator is updated **after an
await**, and the re-entrancy guard is keyed to a phase that is not set until after that await. Anything
the F.W-frontend wave does to this component should close that seam at the same time — the cheapest
shape is a synchronous `isMorphing` guard plus setting `phase` before `getAnimationCtor()`, which kills
D-7 outright and shrinks D-6 to a single non-painted microtask.

**The finding that must travel furthest is D-2.** It is not a defect of this component but of the
**uplift plan**, surfaced through this component's app-wide host: glass-ui 7.0.0's documented
"de-shadcn clean break" deletes `--ring` and the `--color-ring` bridge, silently removing focus
indicators from **6 read sites across 5 files, plus the 4 classes served by `style.css`'s D.W4.d global
block** — with no typecheck error, no build error, no test failure, and no axe coverage on the affected
routes. The census break surface is composed exclusively of import- and type-level breaks and therefore
structurally cannot see it. **Recommendation: F.W1 must add a CSS-custom-property column to the break
surface and sweep the full set of glass-ui tokens fourier reads before the tri-package transaction
lands.** The ring register is demonstrably not the only thing that moved between 4.0.0 and 7.0.0
(`--accent-red` moved line numbers but not values — S-5 — which is precisely why a line-diff is not a
sweep), and it is the one whose failure mode is silent, total, and an AA regression on every route.
