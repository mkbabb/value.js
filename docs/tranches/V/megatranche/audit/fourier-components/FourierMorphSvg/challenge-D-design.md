claude-opus-5[1m]

# CHALLENGE · `FourierMorphSvg.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/decorative/FourierMorphSvg.vue` (41 lines)
**Method** static + source-derived only. No browser tooling. Glass-ui **4.0.0** (installed) read at
`web/node_modules/@mkbabb/glass-ui/`; glass-ui **7.0.0** (producer latest) read at
`/Users/mkbabb/Programming/glass-ui/` (`package.json.version` → `7.0.0`) for uplift-break analysis.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Three hypotheses died to their own
falsifiers and are recorded in §5 rather than banked as findings.

## §0 · The component's true surface

`FourierMorphSvg` imports **nothing** (`<script setup>` is `withDefaults(defineProps<…>(), …)` and
nothing else — `:19-34`). It has no composable, no glass-ui subpath, no icon dep. Its design surface
is therefore exactly three things:

1. its own render contract (`:1-17`) and scoped style (`:36-41`);
2. the one glass-ui **token** it names — `var(--accent-red)` (`:30`);
3. its two live consumers, which are what actually give the component a body, a size, a background,
   an accessible name (or not), and its motion:
   - `web/src/components/layout/DarkModeToggle.vue:7-12` — app-wide, mounted in `AppHeader`;
   - `web/src/components/morph/MorphShapePreview.vue:5-9` — the `/morph` route
     (`src/router/index.ts:102-104`, and in `VALID_TABS` at `:29`, i.e. nav-visible, not dev-only).

A 41-line prop-only renderer cannot be audited on the design axis in isolation: proportion, contrast,
motion and a11y are all *resolved* at the consumer. Every finding below is anchored to the line in
`FourierMorphSvg.vue` that creates or fails to prevent the condition, plus the consumer line where it
manifests.

**Corpus fold.** `formation/fourier/lane-frontend.md:179` books this file as "Path-only SVG renderer,
41 LOC" and `:369` as "Bespoke with no glass-ui analogue" — both confirmed, no contradiction.
`lane-frontend.md:419-421` + `CENSUS-2026-08-03.md:95` classify `DarkModeToggle` as a **CHARACTERFUL
SHADOW** ("keep, but reconcile against the 7.0.0 props/tokens rather than let it drift"). **D-2 below
is the concrete, costed instance of that reconcile-or-drift warning** — the drift is already load-bearing
and already breaks. The adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` was
searched for `MorphSvg|DarkModeToggle|MorphShapePreview|accent-red|reduced-motion|aria-label|svg`:
**zero hits**. No row of the 38/52-TRUE set overlaps this component; nothing here contradicts it.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The component offers no accessible-name affordance, and its `/morph` consumer ships a nameless button

**Claim.** `FourierMorphSvg` renders a bare `<svg>` with **no `role`, no `aria-label`, no `<title>`,
no `aria-hidden`, and no prop to supply any of them** (`:2-16`; the prop set at `:21-27` is
`path | viewBox | strokeColor | strokeWidth`). At `MorphShapePreview.vue:4-10` the component is the
**sole child** of a `<button>` that itself carries no `aria-label`, no `title`, and no text node:

```
MorphShapePreview.vue:4   <button class="morph-button cartoon-card" @click="$emit('toggle')" :disabled="disabled">
MorphShapePreview.vue:5-9     <FourierMorphSvg :path="currentPath" :stroke-width="4.5" view-box="0 0 200 200" />
MorphShapePreview.vue:10  </button>
```

The button's accessible name computes to the empty string. **WCAG 2.2 §4.1.2 Name, Role, Value
(Level A) failure** on the primary — and only — interactive control of a routed, nav-visible page.

**Provenance.** `FourierMorphSvg.vue:2-16` (no a11y attribute emitted) · `MorphShapePreview.vue:4-10`
(no name supplied) · `src/router/index.ts:29,102-104` (`/morph` is real and nav-visible).

**Why it was never caught.** The repo *does* own `@axe-core/playwright` (`package.json` devDeps), but
`AxeBuilder` is instantiated in exactly two specs — `e2e/visualization-ux.spec.ts` and
`e2e/visualization-crud.spec.ts` — and the ux spec navigates `page.goto("/visualize")`
(`visualization-ux.spec.ts:47`) under tags `wcag2a, wcag2aa, wcag21a, wcag21aa` (`:29`). **`/morph`
is never axe-scanned.** Axe's `button-name` rule would fire here on first contact.

**Falsifier (applied, survived).** *Could Vue's fallthrough save it?* `FourierMorphSvg` has a single
root element, so a consumer-supplied `aria-label` would land on the `<svg>` via `$attrs`. Two reasons
this does not rescue the finding: (a) **the consumer supplies none** — `MorphShapePreview.vue:5-9`
passes only `:path`, `:stroke-width`, `view-box`, verified by reading the whole tag; and (b) even
supplied, `aria-label` on an `<svg>` **without `role="img"`** is not reliably exposed, because `<svg>`
has no stable implicit ARIA role across engines — `role="img"` is the standard remedy and the
component neither sets it nor allows it to be set meaningfully. The contrasting consumer proves the
component *can* be driven correctly: `DarkModeToggle.vue:5` puts a live `:aria-label` on its **button**
(`isDark ? 'Switch to light mode' : 'Switch to dark mode'`) rather than on the SVG — the right pattern,
absent at the other call site.

**Falsify me.** Show either (i) an `aria-label`/`aria-labelledby`/`title` reaching
`MorphShapePreview.vue:4`'s button in the live tree, or (ii) an axe run over `/morph` returning zero
`button-name` violations. Either kills D-1.

**Repair shape (not a patch — the fix belongs at F.W-frontend).** Add an optional `title?: string` prop
that emits `role="img"` + `<title>{{title}}</title>` when present and `aria-hidden="true"` when absent
(the honest default for a decorative renderer), then name the `/morph` button at the consumer.

---

### D-2 · BLOCKER · The F.W1 tri-package uplift silently deletes this control's focus ring — a CSS-token break the census break surface does not carry

**Claim.** `DarkModeToggle.vue` — the app-wide host of `FourierMorphSvg` — kills the UA focus outline
and re-establishes it from a glass-ui token that **glass-ui 7.0.0 deletes**:

```
DarkModeToggle.vue:94-96    .sun-moon-toggle:focus         { outline: none; }
DarkModeToggle.vue:98-101   .sun-moon-toggle:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }
```

At the **old pin** this resolves: `glass-ui@4.0.0/src/styles/theme/bridges.css:80` →
`--color-ring: var(--ring);`, with `--ring` at `tokens/color-radius.css:102` (`hsl(24 10% 10%)`) and
`tokens/dark-arm.css:90` (`hsl(48 10% 70%)`). The ring works today.

At **7.0.0 the bridge is gone by deliberate design.** `glass-ui@7.0.0/src/styles/theme/bridges.css:93-97`
now carries only a tombstone comment where the declaration stood:

> "The shadcn `--color-ring` @theme bridge (the `ring`/`outline-ring`/`text-ring` utility surface) is
> **DELETED, clean break**. The house focus accent is the `--focus-ring-color` token / the
> `.focus-ring` box-shadow utility…"

and `glass-ui@7.0.0/src/styles/tokens/color-radius.css:155-161` records the same for the base token —
"The house focus-accent register, **off the shadcn `--ring` token (clean break, no alias — the
de-shadcn break)**" — introducing `--focus-ring-color` in its place. Verified mechanically:
`grep -rn -- "--color-ring" /Users/mkbabb/Programming/glass-ui/src/` returns **only those two comment
lines**, zero declarations; `grep -rn -- "^\s*--ring\s*:" src/styles/tokens/*.css` at 7.0.0 returns
**empty**.

**The failure mode is total, not graceful.** `var(--color-ring)` with **no fallback** makes the
`outline` declaration *invalid at computed-value time*; per CSS Variables §3, an IACVT declaration
behaves as `unset`, which for the `outline` **shorthand** unsets every longhand — and
`outline-style`'s initial value is `none`. The ring does not degrade to a default colour; **it
disappears.** Because `:focus { outline: none }` at `:94-96` is a static declaration that stays valid,
the UA fallback is already gone. Post-uplift the sun↔moon toggle — present in the header of **every
route** — becomes **completely un-focus-indicatable**. **WCAG 2.2 §2.4.7 Focus Visible (Level AA)
failure**, app-wide.

**No local or framework rescue.** fourier defines neither token itself
(`grep -rnE -- "--(color-)?ring\s*:" web/src/` → **empty**), and Tailwind v4's default theme does not
ship `--color-ring` (`grep -n -- "--color-ring\s*:" node_modules/tailwindcss/theme.css` → **empty**).
glass-ui is the sole provider.

**Blast radius beyond this component** — 6 sites / 5 files read a ring token glass 7 deletes:

| site | declaration | post-uplift result |
|---|---|---|
| `layout/DarkModeToggle.vue:99` | `outline: 2px solid var(--color-ring)` | ring **gone** (this component's host) |
| `style.css:140` | `outline: 2px solid var(--ring)` | ring **gone** — and this is the D.W4.d global block that retrofitted rings onto `.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card` (`style.css:136-142`) → **4 more classes silently lose theirs** |
| `layout/AppHeader.vue:189` | `outline: 2px solid var(--ring)` | ring **gone** |
| `visualization/ImageUpload.vue:200` | `outline: 2px solid var(--ring)` | ring **gone** |
| `gallery/GalleryCard.vue:222` | `border-color: var(--ring)` | IACVT → `unset` → initial `currentcolor` (degrades, still drawn) |
| `gallery/GalleryCard.vue:223` | `box-shadow: 0 0 0 2px color-mix(… var(--ring) …)` | IACVT → `unset` → `none`, **gone** |

**Contradiction with the corpus — explicit, and the reason this is a BLOCKER.**
`CENSUS-2026-08-03.md:102-105` enumerates the uplift break surface as: `metric-badge` ×7 files,
`hover-card` ×2, `hover-popover` ×2, dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1),
**`ToastVariant` definition-absent → hard typecheck break**, `lucide-vue-next → @lucide/vue` ×35,
pencil-boil `0.4.1→^0.11.2`. **Every listed item is a JS/TS import or type break.** The ring-token
deletion is a **CSS custom-property break**: invisible to `vue-tsc`, invisible to the build, invisible
to the 29 Playwright specs (none assert a focus outline), and — because axe never visits `/morph` and
`focus-visible` styling is not in axe's automatic rule set anyway — invisible to the a11y net too.
`CENSUS:256-258` already warns "[P2] Uplift lands with no unit-test net… the break surface is an order
of magnitude above" — D-2 is a concrete member of that unmeasured remainder, and it is exactly the
class of break the census's typecheck-shaped framing cannot see. **The break surface must be extended
with a token-level column before F.W1 executes.**

**Falsifier (applied, survived).** I checked whether the token merely *moved*: it did not — 7.0.0
renames the register to `--focus-ring-color` and the producer's own comments call it a "clean break,
no alias". I checked whether fourier or Tailwind backstops it: neither does. I checked the sibling
tokens this component actually depends on and they *do* survive (see S-5) — so this is a specific
deletion, not me mis-reading a wholesale token-file reorganisation.

**Falsify me.** Show a `--color-ring` or `--ring` **declaration** (not comment) anywhere in glass-ui
7.0.0's shipped styles, or a fourier-local definition landing before F.W1. Either kills D-2.

---

## §2 · MAJOR

### D-3 · MAJOR · The morph has no `prefers-reduced-motion` gate anywhere in its stack

**Claim.** The animation this component exists to display is entirely ungated for reduced motion.
`useFourierMorph.ts` (read whole, 230 lines) contains **no `matchMedia`, no `prefers-reduced-motion`,
no PRM branch**; `morphTo` (`:145-213`) unconditionally runs three sequential
`keyframes.js Animation` phases — settle-out → morph → settle-in, 150+50+150 = **350 ms default**
(`DEFAULT_MORPH_CONFIG:59-68`) — mutating `currentPoints` every frame, which flows to
`currentPath` (`:81`) and thence to this component's `:d` (`FourierMorphSvg.vue:9`). `FourierMorphSvg`
itself has no PRM affordance either: its scoped style (`:36-41`) is three declarations with no
`@media` block, and it offers no static/reduced render path.

The consumer's PRM block is a **decoy**: `DarkModeToggle.vue:104-108` reduces only
`transition: none` on the button's `transform` — the *hover lift*. The path morph, which is the
actual motion, is untouched. Under `prefers-reduced-motion: reduce` the full 350 ms epicyclic
sun↔moon morph still plays on every theme toggle, on every page.

**Provenance.** `useFourierMorph.ts:145-213` (no gate) · `:59-68` (350 ms) ·
`FourierMorphSvg.vue:9,36-41` (no gate) · `DarkModeToggle.vue:104-108` (gates the wrong property) ·
`MorphShapePreview.vue:5-9` (same, larger: a 120→180 px shape).

**This is an inconsistency, not a considered exemption — the codebase gates PRM everywhere else.**
`src/router/index.ts:9-13` defines `prefersReducedMotion()` and gates the View-Transitions route morph
on it, with the comment "*Gate (inv-29): only when `document.startViewTransition` exists **AND the user
has not requested reduced motion***". The sibling file in this very directory,
`decorative/SvgFilters.vue:7-9,24,36`, JS-gates its boil animators on
`matchMedia("(prefers-reduced-motion: reduce)").matches`. `lane-frontend.md:616-619` inventories the
whole app's PRM posture — 1 JS gate (`SvgFilters`) + 8 CSS `reduce` blocks (incl.
`DarkModeToggle.vue:104`) — and **`useFourierMorph` appears in neither column**. The corpus's own
census corroborates the hole.

**Severity discipline.** WCAG 2.2 §2.3.3 Animation from Interactions is **Level AAA**, the motion is
user-initiated, non-looping, and short. That is why this is MAJOR and not a BLOCKER. It remains a real
design-system conformance gap in a codebase that has explicitly adopted the gate elsewhere.

**Falsify me.** Point to a PRM branch in `useFourierMorph.ts`, in `lib/easings.ts`'s resolution path,
or inside `keyframes.js`'s `Animation` that collapses duration to 0 under `reduce`. Any one kills D-3.

---

### D-4 · MAJOR · `DarkModeToggle`'s hardcoded sun colour fails non-text contrast in light mode, and bypasses the token system entirely

**Claim.** `DarkModeToggle.vue:30-31` hardcodes two literal RGB triples and lerps between them
(`lerpColor`, `:39-44`) into this component's `strokeColor` prop (`:10`), which becomes
`style="color: rgb(...)"` on the `<svg>` (`FourierMorphSvg.vue:6`) and thence the stroke via
`currentColor` (`:11`):

```
DarkModeToggle.vue:30   const SUN_COLOR  = [232, 136, 69]  as const; // #E88845
DarkModeToggle.vue:31   const MOON_COLOR = [192, 132, 252] as const; // #c084fc
```

`strokeColor` at rest is `SUN_COLOR` when `!isDark` (`:46-51`, `lerpColor(SUN, MOON, 0)`). Computed
against the resolved page surface — `--background: var(--neutral-0)` (glass-ui@4
`tokens/color-radius.css:57,40`) = `hsl(40 30% 98%)` = `rgb(251,250,248)`; the header is
`bg-background/90` over the same (`AppHeader.vue:54`):

| state | stroke | surface | WCAG contrast | §1.4.11 (3:1) |
|---|---|---|---|---|
| **light mode (sun shown)** | `#E88845` | `rgb(251,250,248)` | **2.51:1** | ❌ **FAIL** |
| light mode, morph midpoint | `rgb(212,134,161)` | `rgb(251,250,248)` | 2.62:1 | ❌ FAIL |
| dark mode (moon shown) | `#c084fc` | `hsl(24 9% 4%)` = `rgb(11,10,9)` | 7.48:1 | ✅ pass |

The graphic is the **entire** visual affordance of the control (the button has no label, no icon
besides this SVG, no border, `background: transparent` — `:76-87`), so §1.4.11 Non-text Contrast
(Level AA) applies squarely: this is a graphical object required to understand and operate the
control. **The light-mode arm fails at 2.51:1 against a 3:1 floor** — and light is the default arm.

**The token bypass is the design-axis root cause.** These are raw literals in a repo whose entire
palette is glass-ui tokens. They cannot respond to theme, cannot be corrected by the light/dark arms,
and cannot be swept by a token audit. Compare the repo's own precedent: `style.css:117-124` books a
**D.W4.d light-mode `--viz-amber` darken** for exactly this reason — glass-ui's light `--viz-amber`
measured ≈3.54:1, was overridden to `hsl(35 76% 35%)` ≈4.6:1, with the dark arm left alone, and a
companion glass-ui carry held as a coordination ask. **`#E88845` is the same defect at a worse ratio
(2.51 vs 3.54) and was never booked** — because it is a JS literal, not a CSS token, so the D.W4.d
contrast sweep could not see it. Note the asymmetry the literals create: `MOON` is annotated
"matches `VIZ_COLORS.legendre`" (`:31`) — i.e. it *shadows* a token that exists — while `SUN` matches
nothing at all.

**Falsifier (applied, partially survived — stated honestly).** *Is this decorative, exempting it from
1.4.11?* No — it is the sole visual of an operable control, which the exemption explicitly does not
cover. *Is the toggle over a non-`--background` surface?* `AppHeader.vue:54` is
`bg-background/90 … supports-[backdrop-filter]:bg-background/60`; at 60% alpha the effective backdrop
is still page background (same token) plus blur, so the computed ratio holds to within rounding.
**UNPROVEN-NEEDS-LIVE (SS-13):** the exact composited backdrop under `backdrop-blur-md` when
non-background content scrolls beneath the header is not statically decidable; the ratio could move in
either direction for arbitrary scrolled content. The **2.51:1 figure against the declared token is
exact and reproducible**; only the scrolled-content edge case needs a live probe.

**Falsify me.** Recompute `#E88845` against `hsl(40 30% 98%)` and get ≥3:1, or show the sun arm is
never rendered in light mode. Either kills D-4.

---

### D-5 · MAJOR · The `path` contract has no empty state, and the app-wide toggle provably renders blank on first paint

**Claim.** `path` is a **required, non-optional `string`** (`FourierMorphSvg.vue:23`) bound straight to
`<path :d="path">` (`:9`) with no guard, no `v-if`, no fallback, and no skeleton. The empty string is
not a hypothetical: `pointsToSvgPath` **returns `""` by design** for degenerate input —
`src/lib/svg-fourier.ts:51`: `if (points.length < 2) return "";` — and `useFourierMorph` initialises
`currentPoints` to `[]` (`useFourierMorph.ts:80`), so `currentPath` (`:81`) is `""` until `setShape`
runs.

At `DarkModeToggle.vue:58-60`, `setShape` is called in **`onMounted`**. Vue's initial render therefore
commits with `path === ""`, and `<path d="">` paints **nothing**. The header toggle is a blank
40 × 40 px hole (`--toggle-size: 2.5rem`, `AppHeader.vue:242`; `2.75rem` at the breakpoint, `:256`)
for at least one frame on every cold load — a nameless, invisible, still-clickable button. Because
`strokeColor` also resolves through the `phase === "idle"` branch during that window (`:46-51`), there
is no visual cue of any kind.

**Provenance.** `FourierMorphSvg.vue:9,23` (unguarded required prop) · `lib/svg-fourier.ts:51`
(`""` is a designed return) · `useFourierMorph.ts:80-81` (initial `[]` → `""`) ·
`DarkModeToggle.vue:58-60` (`onMounted`, i.e. post-first-render) · `AppHeader.vue:242,256` (size).

**State-coverage verdict for the axis.** Empty: **unhandled** (renders nothing). Loading: **unhandled**
— and this component genuinely *has* a loading state, because `morphTo` awaits a **dynamically imported
engine** on first use (`useFourierMorph.ts:39-44,149`, the I-tranche `loadAnimationEngine()` lazy
boundary), so the very first toggle click waits on a network/parse round-trip with **no indicator at
all** on the header control. `MorphShapePreview` at least surfaces `:disabled` + `cursor: wait`
(`:118-120`) — `DarkModeToggle` has neither, it just silently drops the click via the
`phase !== "idle"` early-return (`:63`). Error: **unhandled** — `morphTo` is `async` and awaited at
`DarkModeToggle.vue:71` with **no `.catch`**; if `loadAnimationEngine()` rejects (chunk 404 after a
redeploy — a live risk this repo has already been bitten by, cf. `docs/tranches/I/FINAL.md:20`
"the static import **broke at runtime** under keyframes 2.2.0 → HARD-FIX"), the rejection is an
unhandled promise rejection and the toggle is left permanently mid-phase.

**Falsifier (applied, survived).** *Does the pre-paint theme bootstrap fill this?* `index.html:22-32`
(cited at `lane-frontend.md:610`) sets the theme *class* before paint, but nothing computes Fourier
points — those require `prepareFourierShape` + `interpolateAtHarmonicLevel`, both invoked only from
`onMounted`. *Is `onMounted` early enough?* No: `onMounted` fires **after** the initial VDOM is
mounted to the DOM, so the empty frame is committed by construction. **UNPROVEN-NEEDS-LIVE (SS-13):**
whether the blank frame is *perceptible* (1 frame vs several) depends on JSON parse + coefficient
evaluation cost for `sun.json`/`moon.json`; the **existence** of at least one blank committed frame is
proven statically, its **duration** is not.

**Falsify me.** Show `setShape` (or an equivalent synchronous seed) running before first render —
`setup()` body, a `path` default, or SSR-serialised state. Any of those kills D-5.

---

## §3 · MINOR

### D-6 · MINOR · Inline `style` on the root makes stroke colour unstylable by consumers

`FourierMorphSvg.vue:6` writes `:style="{ color: strokeColor }"` — an **inline** declaration, which
outranks every author stylesheet rule short of `!important`. A consumer therefore **cannot** recolour
the stroke from CSS: `.morph-button:hover .fourier-morph-svg { color: … }` is dead on arrival. The
consequence is visible in `MorphShapePreview.vue:108-112`, where hover restyles `border-color` and
`box-shadow` but leaves the shape — the actual subject of the card — chromatically inert, and where
`:disabled` (`:118-120`) alters only the cursor, so a disabled control looks identical to an enabled
one. `.sun-moon-toggle:hover` (`:89-92`) likewise can only scale, never tint. The design-axis cost:
hover/active/disabled/focus feedback on this component is restricted to the *frame*, never the *figure*.

**Falsifier (applied, survived, severity reduced accordingly).** A consumer *can* drive colour through
the reactive prop, and `DarkModeToggle.vue:46-56` does exactly that — so this is a friction/encapsulation
defect, not a functional blocker. It is booked MINOR for that reason. The clean shape is a
`--fourier-morph-color` custom property with the prop as fallback, which restores CSS reach without
losing the prop API.
**Provenance.** `FourierMorphSvg.vue:6` · `MorphShapePreview.vue:108-120` · `DarkModeToggle.vue:89-92`.

### D-7 · MINOR · Stroke weight is not normalised, so optical line weight jumps 1.8× across the `/morph` breakpoint

`strokeWidth` is applied raw in user units (`FourierMorphSvg.vue:12`) with no
`vector-effect="non-scaling-stroke"`, so it scales with the box. `MorphShapePreview` passes `4.5` into
a `0 0 200 200` viewBox (`:6-8`) inside a button that is `120 px` with `0.625rem` padding
(`:91-98`) and `180 px` with `1rem` padding at `≥640 px` (`:100-106`). Content box → `100 px` then
`148 px`; rendered stroke → `4.5/200 × 100 = 2.25 px` then `4.5/200 × 148 = 3.33 px`, and against the
`180 px` outer box the drawn figure grows 1.8×. The line weight of a *line drawing* therefore changes
materially at the breakpoint rather than holding a constant optical rhythm — an Aristotelian proportion
break: the part does not keep its ratio to the whole as the whole is re-scaled.

**Falsifier (applied, survives only weakly — hence MINOR).** Uniform scaling of a figure *including*
its stroke is the correct treatment if the intent is "zoom the drawing", and that is defensible for a
morph preview. The finding stands as a **latent** proportion hazard rather than a certain defect,
and it is sharpened by the fact that the two consumers pass wildly divergent weights into the *same*
nominal viewBox — `14` (`DarkModeToggle.vue:9`) vs `4.5` (`MorphShapePreview.vue:7`), a 3.1× spread —
with nothing in the component's API (no size token, no ratio, no doc on `:26`) to relate weight to
render size. That absence is the real defect: the component publishes no proportion contract.
**Provenance.** `FourierMorphSvg.vue:12,26` · `MorphShapePreview.vue:6-8,91-106` · `DarkModeToggle.vue:9`.

### D-8 · MINOR · Morph phase is never announced, and the `/morph` button steals its own focus

Adjacent to the component but on its axis. `MorphShapePreview.vue:14-16,31-33` renders a live-changing
`phase` chip (`idle → settle-out → morph → settle-in`) with **no `aria-live`, no `role="status"`** —
the entire state readout of the demo is silent to assistive tech, in both the desktop and mobile chip
blocks (the markup is duplicated at `:13-26` and `:30-43`, so a fix must land twice, and a naive
`aria-live` on both would double-announce). Compounding: the button binds `:disabled="disabled"`
(`:4`) driven by `isAnimating` (`FourierMorphDemo.vue:18`), so **activating it disables it** — a
keyboard user's focus is dropped to `<body>` mid-interaction and must be re-tabbed after every morph.
**Provenance.** `MorphShapePreview.vue:4,13-43` · `FourierMorphDemo.vue:14-19`.

---

## §4 · INFO

### D-9 · INFO · Prop-type asymmetry closes the token door on `strokeWidth`

`strokeColor?: string` (`:25`) accepts a CSS variable and defaults to one (`:30`), but
`strokeWidth?: number` (`:26`) is numeric-only (`:31` default `3`), so a consumer cannot pass
`var(--stroke-md)` or `calc()`. Given the 3.1× spread between the two live call sites (D-7), the one
prop that most wants tokenisation is the one that forbids it. Widening to `number | string` costs
nothing — SVG `stroke-width` accepts both. **Provenance.** `FourierMorphSvg.vue:25-26,30-31`.

---

## §5 · Hypotheses that died to their own falsifiers (L-18 discipline — recorded, not banked)

1. **"`--accent-red` is undefined; the default stroke silently inherits."** *Refuted.* Defined in
   glass-ui@4 at `tokens/color-radius.css:258` (light `oklch(0.574 0.216 27.5)`),
   `tokens/dark-arm.css:111` (dark `oklch(0.644 0.165 22.9)`), and `tokens/light-dark.css:142`
   (`light-dark()` arm). The default resolves correctly. → became **S-3/S-5**.
2. **"`var(--color-ring)` is already undefined; the toggle has no focus ring today."** *Refuted at the
   old pin* — `glass-ui@4/src/styles/theme/bridges.css:80` defines it. The finding survived only when
   re-aimed at **7.0.0**, where it is deleted. → became **D-2**. This is the audit's most important
   methodological note: the defect is invisible unless both pins are read.
3. **"No `width`/`height`/`aspect-ratio` means an unpredictable box."** *Refuted.* An `<svg>` with a
   `viewBox` and no width/height attributes carries an intrinsic aspect ratio; with `display: block`
   (`:38`) it fills the inline axis and derives its block size from the ratio. Both consumers wrap it
   in a square box, so the geometry is correct. Not a defect.

---

## §6 · Superlatives (L-18 runs both ways — each with its falsifier)

**S-1 · The `color` + `currentColor` indirection is the right primitive.** `:style="{ color: … }"` on
the root (`:6`) with `stroke="currentColor"` (`:11`) means the stroke is token-addressable, inheritable
by any future child element, and **degrades gracefully**: because `color` is an inherited property, an
invalid `strokeColor` yields IACVT → `inherit`, so the shape still paints in the ambient text colour
rather than vanishing. Contrast this directly with **D-2**, where the same IACVT rule applied to the
non-inherited `outline` shorthand yields `outline-style: none` and total loss. The component picked the
property whose failure mode is benign. *Falsifier:* the inline placement is separately a real cost —
booked honestly as **D-6**. The primitive is right; the delivery mechanism is not.

**S-2 · `overflow: visible` is a considered, correct choice, not a leftover.** `:39`. SVG strokes are
centred on the path, so half of `stroke-width` falls outside the geometry; at
`DarkModeToggle.vue:9`'s `stroke-width="14"` in a `200`-unit viewBox that is 7 units — **3.5% of the
box clipped on every edge** under the UA default `overflow: hidden`, visibly flattening the crescent's
extremes. `overflow: visible` is precisely the fix. *Falsifier:* it does let the graphic paint outside
its box; at the real header size (`2.5rem` = 40 px, `AppHeader.vue:242`) the bleed is
`14/200 × 40 / 2 = 1.4 px` per side, and `.sun-moon-toggle` is `flex-shrink: 0` in a gapped header row
(`DarkModeToggle.vue:86`), so no overlap occurs. The choice is sound at the sizes actually shipped.

**S-3 · The default stroke colour clears non-text contrast in BOTH arms — the only colour path here
that does.** `var(--accent-red)` (`:30`) against `--card` (`hsl(36 48% 97%)` light,
`hsl(24 8% 16%)` dark — the `cartoon-card` background, `style.css:107-111`) measures **4.62:1 light /
4.07:1 dark**, clearing §1.4.11's 3:1 with headroom and in fact clearing §1.4.3's 4.5:1 in light.
`MorphShapePreview` — which takes the default (`:5-9` passes no `stroke-color`) — is therefore
contrast-correct, while `DarkModeToggle`, which **overrides** it with literals, is not (**D-4**).
The component's default is better than what its consumer substitutes. *Falsifier:* ratios computed
from declared token values via the OKLab→sRGB→WCAG chain; they hold for the declared surface, and the
scrolled-backdrop edge case remains UNPROVEN-NEEDS-LIVE as in D-4.

**S-4 · Zero glass-ui import surface ⇒ zero exposure to the census break surface.** The `<script setup>`
block (`:19-34`) has **no import statement of any kind**. Checked one by one against
`CENSUS-2026-08-03.md:102-105`: `metric-badge` — not imported; `hover-card` / `hover-popover` — not
imported; dock members (`DockIconButton`, `DockDropdownTrigger`) — not imported; `ToastVariant` — not
referenced; `lucide-vue-next` — no icons; `pencil-boil` — not used (its `useLineBoil` lives in the
sibling `decorative/SvgFilters.vue:178`, not here). Under the F.W1 tri-package transaction
(`CENSUS:106-110`: glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0, atomic) this file's **module graph
delta is exactly nil**. `lane-frontend.md:369` classes it "bespoke with no glass-ui analogue" — here
that bespokeness is an asset. *Falsifier:* nil **import** exposure is not nil **token** exposure —
D-2 is precisely a token-level break reaching this component through its host, and it is why S-4 must
be read as scoped to the module graph, not as "uplift-safe" tout court.

**S-5 · The one glass-ui token this component names is byte-identical across the uplift.**
`--accent-red` at 7.0.0: `tokens/color-radius.css:321` `oklch(0.574 0.216 27.5)` ·
`tokens/dark-arm.css:154` `oklch(0.644 0.165 22.9)` · `tokens/light-dark.css:169` the matching
`light-dark()` pair — **identical values to 4.0.0** (`:258` / `:111` / `:142` respectively), and the
`--color-accent-red` bridge survives too (`glass-ui@7/src/styles/theme/bridges.css:200`, cf.
`@4:184`). The sibling `--accent-pink` used by `MorphShapePreview.vue:172-173` likewise survives
unchanged (`@7 color-radius.css:319` / `dark-arm.css:152`). **`FourierMorphSvg.vue:30`'s default needs
no migration.** *Falsifier:* verified against glass-ui 7.0.0 **source** on disk
(`/Users/mkbabb/Programming/glass-ui`, `package.json.version` → `7.0.0`), not against a changelog;
if the published 7.0.0 artifact diverges from that working tree the claim would need re-checking —
though the same caveat then applies, in the opposite direction, to D-2's stronger and more consequential
deletion evidence.

---

## §7 · Verdict

**9 defects · 2 BLOCKERS · 5 superlatives.**

The 41 lines are, on their own, close to correct: a good colour primitive (S-1), a deliberate overflow
choice (S-2), a contrast-passing and uplift-stable default (S-3/S-5), and zero module-graph exposure to
the F.W1 transaction (S-4). The component's real defect is one of **contract**, not of code: it
publishes no accessible-name affordance (D-1), no reduced-motion affordance (D-3), no empty/loading
state (D-5), no proportion contract (D-7), and — by inlining `style` — no CSS reach (D-6). A prop-only
renderer that declines to constrain its consumers gets the consumers it deserves, and both live call
sites duly violate a different WCAG criterion: `/morph` ships a nameless button (D-1, §4.1.2 A),
and the header toggle ships a 2.51:1 sun (D-4, §1.4.11 AA).

**The finding that must travel furthest is D-2.** It is not a defect of this component but of the
uplift plan, surfaced through this component's host: glass-ui 7.0.0's documented "de-shadcn clean
break" deletes `--ring` and the `--color-ring` bridge, silently removing focus indicators from
**6 sites across 5 files plus the 4 classes served by `style.css`'s global block** — with no typecheck
error, no build error, no test failure, and no axe coverage on the affected routes. The census break
surface (`CENSUS:102-105`) is composed exclusively of import- and type-level breaks and therefore
cannot see it. **Recommendation: F.W1 must add a CSS-custom-property column to the break surface and
sweep the full set of glass-ui tokens fourier reads before the tri-package transaction lands**; the
ring register is demonstrably not the only token that moved between 4.0.0 and 7.0.0, and it is the one
whose failure mode is silent, total, and an AA regression.
