claude-opus-5[1m]

# Challenge · `FourierMorphDemo` · axis D (DESIGN)

**Target** `fourier-analysis/web/src/components/morph/FourierMorphDemo.vue` (330 lines)
**Read whole, read-only:** the target + `MorphShapePreview.vue` (175) · `MorphPhaseConfig.vue` (212) ·
`HarmonicLevelGrid.vue` (286) · `decorative/FourierMorphSvg.vue` (41) · `composables/useFourierMorph.ts` (230) ·
`composables/useMorphConfig.ts` (97) · `lib/easings.ts` (126) · `lib/colors.ts` (117) · `lib/svg-fourier.ts` ·
`assets/fourier-paths/{sun,moon}.json` · `src/style.css` (143) · `src/App.vue` · `src/router/index.ts` ·
`web/package.json` · the **installed** `@mkbabb/glass-ui@4.0.0` dist (button/slider/select recipes,
`styles/tokens/*`, `styles/cards.css`, `styles/utilities/a11y-overrides.css`) · the **producer HEAD**
`glass-ui@7.0.0` source (`src/components/{button,slider,select}/`) as the F.W1 target.

**No browser tooling.** Every claim below is static or source-derived. Three claims that need a live
frame are marked **UNPROVEN-NEEDS-LIVE (SS-13)** and are excluded from nothing — they are still
counted, but their falsifier names the exact probe.

**Counting convention.** `defects` = every finding at every severity (33). `blockers` = the
BLOCKER subset (3). `superlatives` = 7. L-18 runs both ways: each superlative carries its own
falsifier and I checked each one; two candidate superlatives were killed by their falsifiers and are
recorded in §5 so the next reader does not re-mint them.

**Verdict.** The component is assumed defective until the tree proves otherwise, and the tree does
not. It is a *legible* surface — one breakpoint, one clamp funnel, honest scrollers — sitting on
three structural failures: **the primary action has no accessible name**, **the entire per-slider
colour system is dead CSS against both the pinned and the target glass version**, and **the glass
`Button` prop axis this file uses does not exist at 7.0.0**. Under the old pin the page also renders
three tiles that are pixel-identical by construction and a slider whose top half does nothing.

---

## §0 · Corpus fold (what I inherit, what I extend, where I contradict)

| Corpus row | Held | My use |
|---|---|---|
| `CENSUS-2026-08-03.md:102-104` — the uplift break surface = `metric-badge ×7`, `hover-card/-popover ×4`, dock members ×3, `ToastVariant` | ADOPTED | **EXTENDED**: the census's break list is subpath- and type-shaped. It misses a *prop-axis* break — `Button.variant` / `size="default"` — which fires 3× in this one component (D-3). Not a contradiction of a stated fact; a gap in the enumeration. |
| `CENSUS-2026-08-03.md:184-186` — F.W1 = atomic glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 | ADOPTED | Every "will break / will improve" call below is scoped to that one transaction. |
| `lane-frontend.md:171-175` — the morph family LOC table; `:276-281` the glass import inventory | ADOPTED verbatim | Line counts re-verified against the tree (330/212/286/175/41 — all match). |
| `lane-frontend.md` [FE §8] — "18 reduced-motion references, but the two rAF clocks themselves are ungated" | ADOPTED | **EXTENDED to a third clock**: `useFourierMorph.morphTo` is a rAF clock too (keyframes.js with `useWAAPI:false`), also ungated, and it is the *entire purpose* of this route (D-8). |
| `lane-frontend.md:382` — all `glass-scrubber` / `glass-track` occurrences in the tree are **prose comments only**; the one live selector is `GlassTimeline.vue:103` | ADOPTED, and this is the strongest corroborating row I have | The lane proved the *class names* are prose. I prove the neighbouring **custom properties** (`--slider-scrub-*`) are prose too — dead against 4.0.0 *and* 7.0.0 (D-2). The lane stopped one token short. |
| `lane-docs.md:398-403` — `cssVarToHex` has four regex arms and **no `oklch()` arm**, `#888888` fallthrough at `colors.ts:52`; deletion target of W.L5 | ADOPTED | **EXTENDED from a deletion target to a live visual defect** at a named call site: `HarmonicLevelGrid.vue:25,48` feed `VIZ_COLORS.chebyshev` into the slider tint, and glass-ui 4.0.0 ships `--viz-chebyshev` as `oklch()` → the value is literally `#888888` (D-14). |
| intake `lane-fourier-r3-r6.md` **R3-10** (TRUE) — six live dynamic-`:is` families, registry carried four; the four include **`FourierMorphDemo:72`** | ADOPTED | `:72` is this component's `<component :is="copied ? Check : ClipboardCopy">`. My D-9 (silent clipboard failure) is the *state* behind that `:is` — the icon family the registry tracks can never reach its failure arm because there is no failure arm. |
| intake `lane-fourier-r3-r6.md` **R3-12** (TRUE) — 35 open-family records collapse to 28; the duplicated rows include **`MorphPhaseConfig` easingNames** | ADOPTED | Confirms the easing family is double-counted; I do not re-derive it. Relevant to m-3 (this component *also* duplicates its chip markup, a second physical duplication in the same subtree). |
| intake **X-2** — 9 route records, not 8; `/morph` is one of the 7 lazy component routes | ADOPTED | Used only to confirm `/morph` is a lazily-imported top-level route with `meta.title`/`meta.description` (`router/index.ts:102-110`). |

**Where the tree disagrees with nothing above** — I found no corpus claim about this component that the
tree contradicts. The one *near*-contradiction is the census's break-surface enumeration, which I
extend rather than overturn: the four listed breaks are all real and none of them touch this file.

---

## §1 · BLOCKERS (3)

### D-1 · BLOCKER · The page's primary action has no accessible name
`MorphShapePreview.vue:4-10` · `FourierMorphSvg.vue:2-16`

```
<button class="morph-button cartoon-card" @click="$emit('toggle')" :disabled="disabled">
    <FourierMorphSvg :path="currentPath" :stroke-width="4.5" view-box="0 0 200 200" />
</button>
```

The button's only child is `FourierMorphSvg`, whose root `<svg>` (`FourierMorphSvg.vue:2-7`) carries no
`<title>`, no `role`, no `aria-label`, no `aria-labelledby`, and is not `aria-hidden`. There is no
text node, no `sr-only` span, no `title` attribute anywhere in the subtree. The accessible name of the
sole shape-toggle on `/morph` computes to the empty string. A screen-reader user reaches a 120–180px
control announced as "button", with no way to learn that it morphs sun↔moon, and no other affordance
on the page performs the toggle.

**Severity rationale.** Not "an a11y nit": this is the single action the route exists to expose. The
adjacent chips (`MorphShapePreview.vue:31-42`) *name the current shape* — the information exists in
the DOM two elements away and is never wired to the control.

**Falsifier.** Any of: an `aria-label`/`aria-labelledby`/`title` on the `<button>` or on `<svg>`; a
visually-hidden text node inside the button; an `<title>` element inside the SVG. Probe:
`grep -n "aria-label\|aria-labelledby\|<title\|sr-only" MorphShapePreview.vue FourierMorphSvg.vue`
→ **0 hits**, both files, whole file. Verified.

**F.W1.** Neither breaks nor improves — glass 7.0.0 cannot name a raw `<button>` the consumer owns.
But note the shape: 7.0.0's `Button` has `iconOnly` documented as *"Square geometry for an accessibly
named icon command"* (`glass-ui/src/components/button/Button.vue:24-25`), i.e. the producer has the
seat and this control declines it by not being a `Button` at all (see D-11).

---

### D-2 · BLOCKER · The whole per-slider colour system is dead CSS — at 4.0.0 **and** at 7.0.0
`FourierMorphDemo.vue:31,41,51` → `MorphPhaseConfig.vue:29,205-211` · `HarmonicLevelGrid.vue:25,48,207-214`

The parent threads a colour per phase:

```
FourierMorphDemo.vue:31   slider-color="var(--accent-red)"    (Settle Out)
FourierMorphDemo.vue:41   slider-color="var(--accent-pink)"   (Morph)
FourierMorphDemo.vue:51   slider-color="var(--accent-red)"    (Settle In)
```

which lands as `:style="{ '--track-color': sliderColor ?? 'var(--accent-red)' }"`
(`MorphPhaseConfig.vue:29`) and is consumed by:

```
MorphPhaseConfig.vue:207-210 / HarmonicLevelGrid.vue:210-213
    --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 30%, transparent);
    --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 45%, transparent);
    --slider-scrub-thumb-bg:        var(--track-color);
    --slider-scrub-thumb-bg-hover:  var(--track-color);
```

**No such custom properties exist.** The installed 4.0.0 dist defines and reads exactly ten slider
knobs — `--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-bg`,
`--slider-thumb-border-color`, `--slider-thumb-shadow`, `--slider-thumb-size`, `--slider-thumb-spring`,
`--slider-track-bg`, `--slider-track-height` — none with a `scrub` infix, and none with a `-hover`
arm. The live consumption is
`.slider-range[data-v-534634a7]{background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent)}`
and `.slider-thumb{background:var(--slider-thumb-bg,transparent)}`. So **all four sliders on `/morph`
paint at `var(--primary)`**: the red/pink/red phase coding — which is the *only* thing tying the three
config cards to the red/pink info-chips at `MorphShapePreview.vue:165-174` — never renders. The
`sliderColor` prop (`MorphPhaseConfig.vue:85`) is dead API; three lines of the parent template are
inert.

**F.W1 does NOT cure this.** Producer HEAD 7.0.0 (`glass-ui/src/components/slider/Slider.vue:543,751`)
still reads `--slider-range-bg` / `--slider-thumb-bg`; `grep -rn -- "--slider-scrub-" glass-ui/src/`
→ **0**. The uplift *does* add the hover seat the dead pair was reaching for
(`--slider-thumb-hover-ring-color`, plus `--slider-thumb-border-w`, `--slider-touch-target`,
`--slider-target-floor`), so **F.W1 improves the destination** — but the rename
(`scrub-range-bg` → `range-bg`, `scrub-thumb-bg` → `thumb-bg`, `*-hover` → `thumb-hover-ring-color`)
is a fourier-side edit that F.W1 must carry explicitly or the colour system stays dead through the
uplift.

**Falsifier.** Any occurrence of `--slider-scrub-` in a stylesheet that the app loads. Probes:
`grep -rn -o "slider-scrub[a-z-]*" node_modules/@mkbabb/glass-ui/dist/` → **0**;
`grep -rn -o -- "--slider-scrub-[a-z-]*" ~/Programming/glass-ui/src/` → **0**. Verified both ends.
(The comment at both sites — *"A.W2.c — glass-scrubber per-instance retint hook"* — is the tell:
`lane-frontend.md:382` already proved every `glass-scrubber` **class** in this tree is prose. The
**properties** are prose too.)

---

### D-3 · BLOCKER · `Button variant=… size="default"` is a hard break at 7.0.0 — 3 sites in this component, **not in the census break surface**
`FourierMorphDemo.vue:71,75` · `HarmonicLevelGrid.vue:56-58`

Under the pin (`glass-ui@4.0.0`) `Button` is a CVA recipe with
`variant: default|solid|primary-audacious|gold-audacious|destructive|outline|secondary|accent|ghost|glass|glass-wash|ai|link`
and `size: default|xs|sm|lg|icon|icon-sm` (`dist/button-BNDWhAZb.js`). At producer HEAD the recipe is
gone and the prop axis is renamed:

```
glass-ui/src/components/button/Button.vue:15-31
    export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
    export type ButtonSize     = Extract<Size, "xs" | "sm" | "md" | "lg">;
    export interface ButtonProps extends PrimitiveProps {
        emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
        iconOnly?: boolean;  loading?: boolean;  …          // NO `variant`
    }
```

`grep -n "variant" glass-ui/src/components/button/Button.vue` → **0**; `buttonVariants` is not
exported anywhere in 7.0.0 src. So at F.W1:

* `variant="default"` / `variant="outline"` — not a prop; becomes a stray fallthrough attribute.
* `size="default"` — **not in `ButtonSize`** → `vue-tsc` error, ×3 in this file alone.
* Silent visual re-tier: every one of these buttons falls back to `emphasis:"secondary"`, `tone:"neutral"`,
  `size:"md"`.

The census's enumerated break surface (`CENSUS-2026-08-03.md:102-104`) is **subpath**- and
**type**-shaped: `metric-badge`/`hover-card`/`hover-popover` removals, dock member removals,
`ToastVariant` absence, the lucide rename, pencil-boil. It does not carry a prop-axis row. `./button`,
`./slider` and `./select` all survive at 7.0.0 (`exports` map checked) — so the *import* line passes
and the *props* fail, which is the worst shape for a mechanical uplift: nothing greps as a removed
subpath. `lane-frontend.md:213` counts **35 `@mkbabb/glass-ui/button` imports**; if the `size="default"`
idiom is as uniform elsewhere as it is here, this is a repo-scale row, not a component row.

**F.W1 also IMPROVES here:** 7.0.0's `loading` prop (`Button.vue:26-27`, *"Marks an in-flight command
and suppresses activation until it settles"*) is the exact missing affordance for D-7 and D-9.

**Falsifier.** A `variant` prop, a `"default"` member of `ButtonSize`, or a compat shim in 7.0.0.
Probes: the `ButtonProps` interface above (no `variant`); `ButtonSize = "xs"|"sm"|"md"|"lg"` (no
`"default"`); `grep -rn "buttonVariants" glass-ui/src/` → **0**. Verified.

---

## §2 · MAJOR (14)

### D-4 · MAJOR · `#60a5fa` bound indicator fails WCAG 1.4.11 (2.45:1 / 2.40:1 vs the required 3:1)
`HarmonicLevelGrid.vue:203-204, 256-259`

```
.level-input:focus  { border-color:#60a5fa; box-shadow:0 0 0 2px rgba(96,165,250,.15); }
.grid-cell.is-bound { border-color:#60a5fa; box-shadow:0 0 0 1.5px rgba(96,165,250,.2); }
```

Computed (sRGB relative luminance, WCAG 2.x formula) against the light-arm tokens
`--background = --neutral-0 = hsl(40 30% 98%)` and `--card = hsl(36 48% 97%)`:

| pair | ratio | required | verdict |
|---|---|---|---|
| `#60a5fa` vs `--background` | **2.45:1** | 3:1 (1.4.11 non-text) | FAIL |
| `#60a5fa` vs `--card` | **2.40:1** | 3:1 | FAIL |

`is-bound` is the **only** indication of which two tiles are the low/high harmonic bounds — the state
the entire card exists to set. It is also the only raw hex in a file that otherwise runs on tokens
(`--accent-red`, `--foreground`, `--card`, `--muted-foreground`), so it neither adapts to dark mode nor
answers to any theme override.

**Falsifier.** A different resolved `--background`/`--card`, or a second non-colour channel carrying
`is-bound`. Checked: the light arm is `tokens/color-radius.css:40` / `:72`, overridden by nothing in
`fourier/web/src/style.css` (which only re-tints `--viz-amber`/`--section-color-5`); the `is-bound`
class sets **only** `border-color` + `box-shadow` — no shape, weight, glyph, or label change. Verified.

### D-5 · MAJOR · In the default state the "active level" ring is invisible — `.is-bound` wins the cascade over `.active`
`HarmonicLevelGrid.vue:251-259` · defaults at `useFourierMorph.ts:59-68` · `useMorphConfig.ts:27-39`

```
251  .grid-cell.active   { border-color: var(--accent-red); box-shadow: 0 0 0 2px …accent-red…; }
256  .grid-cell.is-bound { border-color: #60a5fa;           box-shadow: 0 0 0 1.5px …blue…; }
```

Equal specificity (`0,2,0` + the same scope attribute); `.is-bound` is declared **later**, so it wins
whenever a tile is both. That is the boot state, deterministically:
`DEFAULT_MORPH_CONFIG.highLevel = 50`; `onMounted → morph.setShape(sunShape)` sets
`harmonicLevel = config.highLevel = 50` (`useFourierMorph.ts:92`); `nearestActiveLevel` =
`nearestLevel(sun.levels, 50)` = **50** (sun/moon `levels` = `[1,2,3,5,8,12,18,25,35,50]`, verified from
the JSON); `previewLevels` contains 50. So on first paint the active tile *is* a bound tile and its red
ring is overpainted blue.

**Falsifier — and it partially bites.** A surviving non-colliding indicator: the `<span class="grid-label">`
takes `grid-label-active` independently (`HarmonicLevelGrid.vue:76-81, 281-284`) giving
`color: var(--accent-red); font-weight:600`. That is a real fallback and it is why this is MAJOR, not
BLOCKER — the *ring* collapses, the *label* survives, and the label's weight change is a non-colour
channel (so WCAG 1.4.1 is satisfied). What is lost is the 2px ring that reads at grid scale; the label
is 12–14px mono at the bottom of a 48–64px tile.

### D-6 · MAJOR · Phase chips fail WCAG AA for normal text (3.91:1 and 3.43:1 vs 4.5:1)
`MorphShapePreview.vue:147-174`

```
.info-chip                        { @apply text-sm; font-weight:500; background: color-mix(in srgb, var(--muted) 60%, transparent); color: var(--foreground); }
.info-chip.settle-out,.settle-in  { background: color-mix(in srgb, var(--accent-red)  12%, transparent); color: var(--accent-red); }
.info-chip.morph                  { background: color-mix(in srgb, var(--accent-pink) 12%, transparent); color: var(--accent-pink); }
```

Light arm, `--accent-red = oklch(0.574 0.216 27.5)`, `--accent-pink = oklch(0.613 0.197 353.8)`
(`tokens/light-dark.css:140-142`), chip background = the 12% mix composited over `--background`:

| chip | ratio | required | verdict |
|---|---|---|---|
| `settle-out` / `settle-in` (red on red-12%) | **3.91:1** | 4.5:1 | FAIL |
| `morph` (pink on pink-12%) | **3.43:1** | 4.5:1 | FAIL |
| neutral chip (`--foreground` on muted-60%) | 16.21:1 | 4.5:1 | PASS — the shape/level/duration chips are fine |

The two failing chips are exactly the ones that carry live state. Note the contrast *falls* as the
information becomes more important.

**Falsifier — checked, does not save it.** "Large text" exemption needs ≥18.66px **bold** or ≥24px;
these are `text-sm` (0.875rem) mobile / `text-base` (1rem) at ≥640, weight **500** — normal text under
1.4.3 on both arms. The 12% wash *raises* the background luminance slightly, which is why red lands
below its 4.71:1 on the bare page: the tint makes it worse, not better. Verified by computation.

### D-7 · MAJOR · The engine-load gap: `disabled` lies, a second click double-fires, and there is no loading state
`FourierMorphDemo.vue:127-135` · `useFourierMorph.ts:145-169`

```
FourierMorphDemo.vue:127  async function handleToggle() {
128      if (isAnimating.value) return;              // isAnimating = phase !== "idle"  (:113)
132      isMoon.value = !isMoon.value;               // flips BEFORE any await
134      await morph.morphTo(from, to);
useFourierMorph.ts:149        const Animation = await getAnimationCtor();   // dynamic import()
useFourierMorph.ts:169        phase.value = "settle-out";                   // ONLY here does isAnimating go true
```

Between the click and the resolution of `loadAnimationEngine()` (a real network chunk on first use —
`useFourierMorph.ts:33-44` documents the deliberate lazy boundary), `phase` is still `"idle"`, so
`isAnimating` is `false`, so `:disabled="isAnimating"` (`FourierMorphDemo.vue:18`) leaves the button
live. A second click passes the guard, **flips `isMoon` back**, and starts a second concurrent
`morphTo` — two animation chains writing `currentPoints`/`phase`, with `stopAnim()` racing them. There
is no spinner, no skeleton, no `aria-busy`, no dimming: the loading state of the page's only action is
*visually indistinguishable from idle*.

**Falsifier.** A guard that fires before the await (a `pending` ref, an early `phase` write, a
`disabled` bound to something other than `phase`). Checked: `isAnimating` is derived solely from
`phase` (`:113`); `phase` is first written at `useFourierMorph.ts:169`, strictly after the `await` at
`:149`. Verified.
**Whether the second click lands in practice is timing-dependent → UNPROVEN-NEEDS-LIVE (SS-13):**
throttle to Slow-3G, click twice inside the chunk fetch, assert `isMoon` and the drawn path disagree.
The *structural* defect (no loading state at all) is proven statically and needs no probe.
**F.W1 improves:** 7.0.0 `Button.loading` "suppresses activation until it settles" — the exact seat.

### D-8 · MAJOR · No reduced-motion gate on the morph itself; glass-ui's global blanket covers only CSS
`useFourierMorph.ts:145-213` · `FourierMorphDemo.vue:127-135` · counter-evidence `router/index.ts:15-17`

`grep -rn "prefers-reduced-motion\|reducedMotion" src/components/morph/ src/composables/useFourierMorph.ts src/composables/useMorphConfig.ts src/components/decorative/FourierMorphSvg.vue` → **0 hits**.
The morph is a rAF chain (`keyframes.js` with `useWAAPI:false`, `useFourierMorph.ts:127-133`) that
mutates `currentPoints` every frame for `settleOutMs + morphMs + settleInMs` — 350ms by default,
**up to 2400ms** at the slider ceiling (3 × 800ms, `MorphPhaseConfig.vue:24-25`). It is spatial,
continuous, and it is the route's whole point.

**Falsifier — this one materially narrowed the claim.** glass-ui ships a global PRM blanket
(`dist/styles/utilities/a11y-overrides.css:6-31`):
`*:not([data-allow-motion]){transition-duration:.1s!important; transition-property:opacity,color,background-color,border-color,box-shadow!important}`
plus `animation-duration:.01ms!important`. That **does** neutralise every CSS transition in these
three files (the hover scales stop animating; they snap, which is acceptable — an instantaneous
transform is not "animation"). So the *CSS* half of a naive "everything is ungated" claim is FALSE and
I do not make it. What the blanket cannot reach is JS that writes geometry directly: `morphTo` runs
identically under `prefers-reduced-motion: reduce`. The correct behaviour — jump to
`setShape(to)` — is one branch, and **the idiom already exists in this tree**:
`router/index.ts:15-17` `const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches`.
It is declined at the one component that most needs it. Folds `lane-frontend.md` [FE §8]; extends it
from "the two rAF clocks" to a third.

### D-9 · MAJOR · No error state anywhere, and the producer's error channel is explicitly declined
`useMorphConfig.ts:55-58, 69-75` · `FourierMorphDemo.vue:71-74` · `useFourierMorph.ts:149`

Two failure modes, zero design:

1. **Clipboard.** `useClipboard({ resetMs: 2000 })` is constructed without `onCopyError`, and
   `copyToClipboard()` calls `copy(toJSON())` discarding the returned `Promise<CopyResult>`. The
   producer's own contract (`dist/composables/dom/useClipboard.d.ts`) says: *"`{ ok: false, reason }`
   naming the channel that failed — the failure is REPORTED, never silently swallowed"*, with three
   named reasons (`clipboard-api` / `exec-command` / `no-api`, e.g. a non-secure-context deploy). On
   failure `copied` stays `false`, the label stays **"Export"**, and the user's only signal is the
   absence of a change they may not have been watching for. The app mounts `<Toaster />`
   (`App.vue:31`) and ships `composables/useToast.ts` — the channel exists and is unused.
2. **Engine chunk.** If `loadAnimationEngine()` rejects (stale-hash 404 after a redeploy — the
   canonical failure for a lazily-imported chunk), `morphTo` rejects, `handleToggle` is `async` with
   no `try`/`catch` and no caller awaiting it → unhandled rejection. `isMoon` has *already* flipped
   (`:132`), so the shape chip reads "Moon" while the SVG still draws Sun, `phase` stays `"idle"`
   forever, and the button remains enabled and permanently inert. A cached-`enginePromise` design
   (`useFourierMorph.ts:38-44`) means the rejected promise is **memoised**: every subsequent click
   re-rejects. There is no retry, no message, no degraded path.

**Falsifier.** A `try`/`catch`, an `onCopyError`, an error ref, a `v-if="error"` branch, or a
`.catch()` on either call site. `grep -n "catch\|error\|Error" FourierMorphDemo.vue useMorphConfig.ts`
→ **0** in both. Verified.

### D-10 · MAJOR · Eight unlabeled controls: `<label>` with no `for`, not wrapping
`MorphPhaseConfig.vue:9-19, 35-39` · `HarmonicLevelGrid.vue:7-16, 30-39`

```
MorphPhaseConfig.vue:9    <label class="config-label">Duration</label>
MorphPhaseConfig.vue:10       <input type="number" … />          ← sibling, no id/for
MorphPhaseConfig.vue:35   <label class="config-label">Easing</label>
MorphPhaseConfig.vue:36-39    <Select><SelectTrigger class="w-full">…  ← no aria-label/-labelledby
HarmonicLevelGrid.vue:7   <label class="level-label">Low</label>
HarmonicLevelGrid.vue:8-16    <input type="number" … />
HarmonicLevelGrid.vue:30  <label class="level-label">High</label>
```

No `for`, no `id`, no wrapping — so these are inert `<label>` elements, decorative text. Per instance:
the Duration number field and the Easing combobox are nameless; `MorphPhaseConfig` is instantiated
**3×** (`FourierMorphDemo.vue:26,36,46`) → 6 nameless controls, plus Low and High = **8**. A screen
reader hears "spin button, 150" three times with nothing distinguishing Settle Out from Morph from
Settle In. The combobox is worse: nameless *and* its value is a rendered SVG curve.

**Falsifier — checked, and it saves only the sliders.** The four `Slider`s *do* carry `aria-label`
(`MorphPhaseConfig.vue:27`, `HarmonicLevelGrid.vue:23,45`) and glass-ui 4.0.0 forwards
`$attrs["aria-label"]` onto the `role="slider"` thumb (`dist/slider-DQ95MET2.js`, the `SliderThumb`
render) — so the sliders are genuinely named (that is superlative S-2). The number fields and the
`Select` are not, and no `aria-labelledby` points at the `<label>`s.
**F.W1 improves:** 7.0.0 ships a `LabeledField` component (`glass-ui/src/components/labeled-field/`)
and its `Slider` even emits a dev-time warning naming it (`Slider.vue:287-295`) — the canonical cure.

### D-11 · MAJOR · Three glass `Button`s re-skinned to the metal; the emitted `data-variant`/`data-size` then lie
`FourierMorphDemo.vue:286-329` · `HarmonicLevelGrid.vue:228-259`

Vue SFC `<style scoped>` is **unlayered**; Tailwind v4 utilities live in `@layer utilities`, and
glass-ui's component-utility rules ship unlayered at specificity `0,1,0`
(`dist/styles/components.css`, `grep -c "@layer"` → **0**). A scoped `.btn-export[data-v-…]` is
`0,2,0` and unlayered, so it beats **everything** the recipe contributes. Net effect:

| recipe contribution (4.0.0) | overridden by | outcome |
|---|---|---|
| `btn-pill` → `border-radius: var(--radius-pill)` | `border-radius:.5rem` (`:290`, `:314`, `HLG:233`) | pill geometry gone |
| `variant:"default"` → `glass-wash btn-glass` | `background: var(--foreground)` (`:293`) | glass tier gone; flat solid |
| `text-[length:var(--control-text)]` | `@apply text-base` (`:296`, `:321`, `HLG` label) | control type scale gone |
| `font-medium` | `font-weight:600` / `500` (`:297`, `:322`) | weight axis gone |
| `active:scale-(--scale-press-btn)` | `.btn-export:active{transform:scale(.97)}` (`:306-308`) | the token `--scale-press-btn` hardcoded to `.97` |
| `px-4 py-2 has-[>svg]:px-3` | `padding:.5rem 1rem` (`:289`, `:313`, `HLG:232`) | responsive padding gone |

The component still emits `data-variant="default"` / `data-size="default"` (the 4.0.0 `Button`
forwards both onto the host), so the DOM advertises a design-system tier it does not render — hostile
to any future visual-regression or token audit that keys on those attributes. This is the
`feedback_glass_ui_first_class` inversion: the variant is used as a *hook to override*, not as a
choice. The correct shape is either an existing variant (`ghost`/`solid`) or a new variant upstream.

**Falsifier.** If scoped CSS lost to the utilities, the overrides would be no-ops and the buttons would
render glass. It does not: unlayered always beats layered regardless of specificity, and
`components.css` carries no `@layer`. Verified. **Survivor:** `focus-ring` is untouched by any scoped
rule (no `outline`/`box-shadow` on `.btn-export`/`.btn-reset`), so keyboard focus still renders — the
one recipe contribution that survives.

### D-12 · MAJOR · `.grid-cell` keeps the recipe's fixed control height while stacking ~2× that in content
`HarmonicLevelGrid.vue:54-58, 228-240, 261-272`

`<Button … size="default">` contributes `h-(--control-h-md)` and `.grid-cell` never declares `height`,
so the fixed height survives while the scoped rule turns the button into a centred column of
`svg (48px / 64px ≥640) + gap .125rem + label (text-sm) + padding .375rem×2 + border 1.5px×2`.

`--control-h-md = max(2.5rem × var(--ui-scale), var(--control-floor))`
(`tokens/offsets-sizing.css:151`); `--ui-scale:1` fine-pointer, **1.5** on `(pointer: coarse)` with
`--control-floor: 2.75rem` (`tokens/light-dark.css:19-20`). Root font is `1.125rem` below 768px
(`style.css:40-43`).

| context | `--control-h-md` | content height | overflow |
|---|---|---|---|
| phone, coarse (<640) | 3.75rem ≈ **67.5px** | ≈ **89px** | ≈ 22px, split top+bottom |
| laptop, fine (≥640, <768) | 2.5rem ≈ **45px** | ≈ **101px** | ≈ 56px |

`btn-pill` supplies `justify-content:center`, `.grid-cell` supplies `flex-direction:column;align-items:center`
and no `justify-content`, so the stack centres and spills **both** edges: the SVG into the
`.levels-controls` margin above, the `n=` label into the `padding-bottom:.375rem` scrollbar gutter
below. `size="default"` is simply the wrong axis for a tile — a tile is not a control-height command.

**Falsifier, and it is the honest one.** This requires the JIT arbitrary utility `h-(--control-h-md)`
to be emitted in the consumer's build. glass-ui backstops that with `@source "../*.js"`
(`dist/styles/index.css:222`) pointing at the 150+ compiled chunks that carry the recipe strings, and
`button-BNDWhAZb.js` does contain the literal. I could **not** confirm emission from the checked-in
build: `web/dist/` is gitignored and stale (Jun 12) — it predates the Jun 17 glass-ui 4.0.0 install and
contains **0** occurrences of `control-h-md`, `--ui-scale`, `--control-floor` or `--ui-glyph`, i.e. it
was built against an older token set and proves nothing either way. I did not rebuild (the law permits
one write, my challenge file).
→ **UNPROVEN-NEEDS-LIVE (SS-13):** load `/morph`, read `getComputedStyle($0).height` on a `.grid-cell`;
if it equals `--control-h-md` the overflow is live. **The conformance half needs no probe**:
`size="default"` on a 48–64px column tile is wrong whether or not today's build happens to drop the
utility, and F.W1 (which changes `size` to `"md"` by default, D-3) re-rolls that dice.

### D-13 · MAJOR · `.btn-icon` pins the lucide glyphs off-token at 15px
`FourierMorphDemo.vue:72, 76, 280-284`

```
.btn-icon { width:15px; height:15px; flex-shrink:0; }
```

The recipe sizes button glyphs `[&_svg:not([class*=size-])]:size-(--ui-glyph)`, and
`--ui-glyph = calc(1rem * var(--ui-scale))` (`tokens/offsets-sizing.css:177`) → 18px fine-pointer at
the mobile root, **27px** on a coarse pointer. `.btn-icon` contains no `size-` substring, so the
arbitrary variant targets it — and the scoped unlayered rule then pins it to 15px. 15px is off every
scale in the system (not a rem multiple, not 4-aligned, not a token). Consequence on a phone: the
button height obeys the 44px touch floor while its icon stays 15px — an optical mismatch that grows
with `--ui-scale`, which is precisely the axis `--ui-glyph` exists to keep in lockstep.
Same falsifier caveat as D-12 for the *emission* of `size-(--ui-glyph)`; the **off-token pin** is
unconditional and is the finding.

### D-14 · MAJOR · The level sliders are tinted `#888888` — `cssVarToHex` has no `oklch()` arm
`HarmonicLevelGrid.vue:25, 48` · `lib/colors.ts:22-53, 90-96` · `App.vue:10-18`

`:style="{ '--track-color': VIZ_COLORS.chebyshev }"`. `resolveVizColors()` (called at `App.vue:11` and
on every theme flip) sets `VIZ_COLORS.chebyshev = cssVarToHex("--viz-chebyshev")`. That function has
exactly four arms — hex `:29`, `hsl()` `:31-36`, bare-HSL triplet `:39-42`, `rgb()` `:45-50` — and a
`return "#888888"` fallthrough at `:52`. glass-ui 4.0.0 ships
`--viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4))`
(`tokens/light-dark.css:146`, after `tokens/color-radius.css:264` in the binding cascade order
declared at `tokens.css:26-34`), and the property is **not** `@property`-registered
(`tokens/property-regs.css` registers only progress/phase/specular/glass-level/ui-scale), so
`getComputedStyle().getPropertyValue()` returns the unparsed token text. → `#888888`, in both themes,
with no theme adaptation.

The internal proof is in fourier's own file: `style.css:119-127` re-declares `--viz-amber` as
`hsl(35 76% 35%)` — which **does** parse. So `VIZ_COLORS.amber` works while `fourier`, `chebyshev` and
`legendre` all silently resolve grey. Folds `lane-docs.md:398-403` (which books `cssVarToHex` as a
W.L5 *deletion* target) and extends it to a live rendering consequence at a named call site. Moot in
practice only because D-2 makes the value unread — but the two defects mask each other, and fixing
D-2 alone would ship grey sliders.

### D-15 · MAJOR · Three tiles are identical by construction; the High slider's top half is a dead range
`HarmonicLevelGrid.vue:40-49, 53-83` · `useMorphConfig.ts:27-39` · `lib/svg-fourier.ts:125-131`

`computePreviewLevels` seeds a hard-coded candidate list
`[1,2,3,5,8,12,18,25,35,50,75,100]` (`useMorphConfig.ts:30`). Both shipped shapes stop at 50:
`sun.json`/`moon.json` `levels = [1,2,3,5,8,12,18,25,35,50]` (read from the JSON). And
`interpolateAtHarmonicLevel` clamps: `const clamped = Math.max(levels[0], Math.min(maxLevel, harmonicLevel))`
(`svg-fourier.ts:130-131`). Therefore `getPath(50)`, `getPath(75)` and `getPath(100)` return the **same
point array**, and the strip ends in three pixel-identical tiles labelled `n=50`, `n=75`, `n=100`.

The same clamp makes the High slider's declared range `:max="100"` (`:44`) inert above 50: dragging
51→100 changes the label and nothing else — half the travel of a primary control is a no-op. Clicking
the `n=75` or `n=100` tile routes through `handlePreviewClick` (`FourierMorphDemo.vue:143-145`), sets
`highLevel` past the data ceiling, and calls `morph.setLevel(shape, level)` which re-renders the
identical path. A grid whose whole rhetorical job is *"watch fidelity increase with n"* ends on a
plateau it presents as three more steps.

**Falsifier.** A shape asset with levels above 50, or a preview list derived from `shape.data.levels`
instead of a constant. Neither: both JSONs verified; `computePreviewLevels(lowLevel, highLevel)` takes
no shape argument. Verified. (Note the two domains are already crossed: `:levels` is *preview* levels,
`:active-level` is a *shape* level via `nearestLevel` — `FourierMorphDemo.vue:60,61,115-120`.)

### D-16 · MAJOR · The hero card's cartoon lift snaps while its shadow eases — a `transition` shorthand drops `translate`
`MorphShapePreview.vue:91-98` · `dist/styles/cards.css:33-48`

`cartoon-surface` (the recipe behind fourier's `.cartoon-card` shim, `style.css:107-111`) animates the
lift on the **`translate` longhand**, deliberately:

```
cards.css:33-48   translate: 0;
                  transition: translate var(--duration-normal) var(--spring-smooth),
                              box-shadow var(--duration-normal) var(--ease-standard);
                  &:hover:not(:disabled){ translate: var(--lift-sm) var(--lift-sm);
                                          box-shadow: var(--shadow-cartoon-lg); }
```

`.morph-button` then replaces that whole list with a shorthand that omits `translate`:

```
MorphShapePreview.vue:97   transition: border-color .2s ease, box-shadow .2s ease, transform .15s ease;
```

Scoped, unlayered, `0,2,0` → wins. The hover still *applies* `translate: var(--lift-sm)` (that comes
from the utility's `:hover` block, untouched) but with no transition entry it **jumps instantly**,
while `box-shadow` eases over 0.2s. The signature cartoon lift de-syncs: the card teleports, the
shadow follows. On the largest, most-photographed element on the page.

**Falsifier — and the file contains its own control.** If the mechanism were wrong, `.config-card` and
`.levels-card` (also `.cartoon-card` hosts) would show the same break — they do **not**, because
neither declares `transition` at all (`MorphPhaseConfig.vue:110-118`, `HarmonicLevelGrid.vue:137-147`),
so they inherit the utility's list intact and lift correctly. One site breaks, two sites prove the
mechanism. Verified. I also checked the obvious wrong version of this claim — that
`transform: scale(1.02)` (`:111`) clobbers the lift — and it is **FALSE**: `cartoon-surface` uses the
`translate` longhand precisely so the two compose. Not claimed.

### D-17 · MAJOR · Motion-token bypass: 7 `transition` declarations, 0 tokens
`FourierMorphDemo.vue:299, 323` · `MorphShapePreview.vue:97` · `MorphPhaseConfig.vue:178` · `HarmonicLevelGrid.vue:192, 239, 278`

Every duration and easing in this subtree is a literal: `.15s`/`.2s`/`.1s`, `ease` / bare. The cascade
already carries `--duration-fast`, `--duration-normal`, `--ease-standard`, `--spring-smooth`
(observably live — they appear in the compiled `.btn-pill` rule). Consequences, in order of severity:
(a) it is the direct mechanism of D-16 — hand-writing the shorthand is what dropped `translate`;
(b) three different hover durations across four hover states of the same page (`.2s` hero card,
`.15s` buttons/inputs, `.1s` tile press) with no rationale, so the interaction rhythm has no
hierarchy; (c) a producer-side motion retune (`--duration-*`) moves the whole app and leaves `/morph`
behind. Verified by reading all seven declarations.

---

## §3 · MINOR (12)

**m-1 · Heading level skip.** `<h1 class="demo-title">` (`FourierMorphDemo.vue:5`) → `<h3>`
(`MorphPhaseConfig.vue:3`, `HarmonicLevelGrid.vue:3`). No `<h2>` anywhere on `/morph` (the route
renders `FourierMorphDemo` alone inside `App.vue`'s `<main>`, `:26`; `AppHeader` contributes no
heading — `grep -n "<h1\|<h2" App.vue AppHeader.vue` → **0**). Falsifier: an `h2` in the shell. None.

**m-2 · Machine identifiers as UI copy.** The status chip prints `phase` raw
(`MorphShapePreview.vue:14-16, 31-33`): the user reads `settle-out`, `settle-in`, `idle` — kebab-case
internal enum members from `useFourierMorph.ts:31`. The chips are also the only status surface and
carry no `aria-live`, so the state changes are invisible to a screen reader even when named. Falsifier:
a label map. None exists (contrast `EASING_LABELS`, `lib/easings.ts:29-52`, which does exactly this
correctly for the sibling concept).

**m-3 · Chip markup authored twice.** `MorphShapePreview.vue:13-26` (`desktop-info`) and `:30-43`
(`mobile-info`) are the same four chips, duplicated verbatim, toggled by `display:none` at 640px
(`:124-145`). Four bindings kept in sync by hand. (`display:none` does remove the hidden copy from the
a11y tree, so this is maintenance debt, not a double-announcement bug — falsifier applied.)

**m-4 · "Export" does not export.** `FourierMorphDemo.vue:71-74` copies `JSON.stringify(config)` to the
clipboard. The word promises a file; the icon (`ClipboardCopy`) tells the truth; the label overrides
the icon. Confirmation is the label swap to "Copied", visual-only and unannounced. (This is the
`:is` family the intake's **R3-10** tracks at `FourierMorphDemo:72`.)

**m-5 · The easing preview clips exactly where it matters.** `easingCurvePath`
(`lib/easings.ts:112-126`) maps `y = 18 − v·16` into a `0 0 40 20` box. The "Back" presets overshoot
(`v ≈ 1.1` / `−0.1`) → `y ≈ 0.4` / `19.6`; with `stroke-width="1.5"` (`MorphPhaseConfig.vue:52`) the
stroke edge lands at `−0.35` and `20.35`. The `.easing-preview` `<svg>` sets no `overflow: visible`
(`:198-202`) — unlike its sibling `FourierMorphSvg.vue:37-40`, which does. So the overshoot lobes,
which are the entire semantic difference between "Back Out" and "Ease Out", are the part that clips.
Falsifier: `overflow:visible` on `.easing-preview`, or an easing set without overshoot. Neither.

**m-6 · The action row breaks the page axis.** `.export-row { justify-content: center }`
(`FourierMorphDemo.vue:273-278`) under a left-aligned, full-bleed 960px column — every other element
is left-aligned or stretched. Two centred buttons at the bottom read as a modal footer on a document
page.

**m-7 · Two breakpoint systems, 128px apart.** All 14 media queries in the three files use
`min-width: 640px`; the app steps the **root font size** at 768px (`style.css:40-50`: `1.125rem` →
`1rem`). Between 640 and 767 the layout is desktop and the type is mobile. It also inverts the title:
`.demo-title` goes `@apply text-2xl` → `font-size: 2rem` at ≥640 (`:222-227`), i.e. **36px** at the
18px root, then **32px** once the root drops at 768 — the title shrinks as the viewport grows.
(Falsifier applied and it killed a companion claim: Tailwind v4 line-heights are unitless ratios —
`--text-2xl--line-height: calc(2 / 1.5)`, `tailwindcss/theme.css:358` — so the hard `font-size`
override does **not** cramp the leading. Not claimed.)

**m-8 · Spinner-stripped number fields fall short of the AAA target size.** `.num-input` /
`.level-input` strip both webkit spin buttons and `-moz-appearance` (`MorphPhaseConfig.vue:179-186`,
`HarmonicLevelGrid.vue:193-200`), leaving a `3.5rem × ≈34.5px` field (text-base 1rem/1.5 at the 18px
root + `.125rem` padding + `1.5px` borders). That clears **WCAG 2.5.8 AA (24×24)** and fails
**2.5.5 AAA (44×44)**. glass-ui's coarse-pointer floor does not reach it — it targets
`[data-size="icon"]`, `.expandable-container__trigger`, `.segmented-tabs__trigger` only
(`utilities/a11y-overrides.css:115-122`). MINOR rather than MAJOR because the paired `Slider` is a
fully-labelled, `touch-hit-area`-equipped alternate path to the same value.

**m-9 · Control boundaries at ~1.3:1.** `.num-input`/`.level-input` border = `color-mix(--foreground 15%)`
on `--background` = **1.36:1**; `.grid-cell` border = `color-mix(--foreground 12%)` on `--card` =
**1.28:1** — both far under 1.4.11's 3:1, and the inputs' `background: var(--background)` equals the
page, so that hairline is the *only* thing marking a text field. Context that keeps this MINOR: the
`--border` token itself is only ~1.9:1 against the page, so the system is already low — but these
sites deliberately go **lower** than the token they could have used.

**m-10 · The busy state is a cursor.** `:disabled="isAnimating"` (`FourierMorphDemo.vue:18`) renders as
`.morph-button:disabled{cursor:wait}` and nothing else (`MorphShapePreview.vue:118-120`) — no opacity,
no `aria-busy`, no label change. Meanwhile the grid tiles and both level sliders stay fully live-looking
(hover lift, pointer cursor) while `handlePreviewClick` silently `return`s for the whole animation
(`FourierMorphDemo.vue:138`). Dead clicks with a hover response — the worst combination.

**m-11 · Empty first frame, and no empty state at all.** `currentPoints` initialises `[]`
(`useFourierMorph.ts:80`) and `pointsToSvgPath` returns `""` for `points.length < 2`
(`svg-fourier.ts:51`), so the 120/180px hero card paints empty until `onMounted → setShape`
(`FourierMorphDemo.vue:123-125`). One frame in practice, but it exposes the larger gap: there is no
designed empty, loading, or error state anywhere in the three files — the component assumes its two
bundled JSON assets and a resolving dynamic import, always.
→ **UNPROVEN-NEEDS-LIVE (SS-13)** for whether the empty frame is perceptible (paint-order dependent);
the absence of state design is proven statically.

**m-12 · Overflow suppressed rather than resolved.** `.demo-page { overflow-x: hidden; min-width: 0 }`
(`FourierMorphDemo.vue:186,191`). The one element that genuinely overflows already owns its scroller
(`HarmonicLevelGrid.vue:218-226`), so this is a page-level clamp that can only ever hide a *future*
overflow silently. It also mints a scroll container on the route root.

---

## §4 · INFO (4)

**i-1 · `class="grid"` collides with a Tailwind utility name.** `HarmonicLevelGrid.vue:53` names a
flex row `grid`; Tailwind's `.grid{display:grid}` is generated in `@layer utilities` and the scoped
`.grid[data-v-…]{display:flex}` (`:218`) wins **only** because scoped SFC CSS is unlayered. Correct
today, one refactor (a layer directive, a `:deep`, a move to a global sheet) from silently flipping the
strip to a grid. Rename to `.level-strip`.

**i-2 · `as any` at the data boundary.** `prepareFourierShape(sunData as any)` / `(moonData as any)`
(`FourierMorphDemo.vue:99-100`) — the two casts that would have caught D-15 (the level ceiling) at the
type level.

**i-3 · Per-frame path recomputation in the grid.** `getPath(level)` is a plain template call
(`HarmonicLevelGrid.vue:66, 129-132`), so every change to `activeLevel` re-runs
`interpolateAtHarmonicLevel` + `pointsToSvgPath` for all 12 tiles — a lerp over the full point array
plus a Catmull-Rom→Bézier serialisation, ×12, several times during a 350ms morph (as
`nearestActiveLevel` steps through `[50,35,25,18,12,8,5]`). Belongs to the perf axis; listed here
because the symptom, if any, is *motion quality* on the very animation this page sells.
→ **UNPROVEN-NEEDS-LIVE (SS-13):** performance trace across one toggle; look for long tasks inside the
morph window.

**i-4 · No-op declaration.** `.demo-subtitle` sets `margin-bottom: 0` at ≥640
(`FourierMorphDemo.vue:238`) but never sets a margin-bottom in its base rule, and Tailwind preflight
zeroes `<p>` margins. Dead line.

---

## §5 · SUPERLATIVES (7) — L-18 both ways

**S-1 · One clamp, two input paths.** Both ways to set a value funnel through a single validator:
`emitDuration` (`MorphPhaseConfig.vue:93-96`), `emitLow`/`emitHigh` (`HarmonicLevelGrid.vue:109-117`).
The slider reaches it via a getter/setter computed that adapts glass's array model to a scalar and
routes the setter *back through the same clamp* — `set: (arr) => emitDuration(String(arr[0] ?? 50))`
(`MorphPhaseConfig.vue:99-102`; `HarmonicLevelGrid.vue:120-127`). Falsifier: a slider path that writes
`emit("update:duration", arr[0])` directly, bypassing the bounds. It does not — verified at all three
adapters. This is the correct shape and it is rarer than it should be.

**S-2 · Every slider is accessibly named, and the naming survives F.W1.** `aria-label="Duration (ms)"`
(`MorphPhaseConfig.vue:27`), `"Low harmonic level"` / `"High harmonic level"`
(`HarmonicLevelGrid.vue:23,45`). This is only a superlative if the label reaches the element that
carries `role="slider"` — falsifier applied: glass-ui 4.0.0 forwards `$attrs["aria-label"]` onto
`SliderThumb` explicitly (`dist/slider-DQ95MET2.js`), not merely onto the wrapper. And 7.0.0 hardens
it — forwards `aria-label`, `aria-labelledby` **and** `aria-describedby` (`Slider.vue:382-384`) and
warns in DEV when a single-thumb slider is nameless (`:287-295`). The four sliders are the only
correctly-named controls on the page (cf. D-10).

**S-3 · The easing picker shows the curve, not the name.** `MorphPhaseConfig.vue:41-57` renders an
inline SVG of the actual sampled function as each option's content. Falsifier — the risk is that a
custom node breaks the trigger's value display: checked, glass-ui's `SelectItem` wraps its default slot
in reka's `SelectItemText` (`dist/SelectScrollDownButton-C1jb3b3K.js`), so the selected curve is echoed
into the trigger and `stroke="currentColor"` inherits the trigger's colour. The affordance *is* the
semantics. (Its one flaw is m-5, the clipped overshoot — which is a bug in the frame, not the idea.)

**S-4 · An honest horizontal scroller.** `HarmonicLevelGrid.vue:218-226`: `overflow-x:auto` +
`overflow-y:hidden` + `scrollbar-width:thin` + a `padding-bottom` gutter so the scrollbar never covers
the tiles + `-webkit-overflow-scrolling:touch`. Falsifier: if the tiles were `<div @click>` the strip
would be keyboard-unreachable — they are real `Button`s (`:54-65`), so Tab moves through them and the
browser auto-scrolls the focused tile into view for free.

**S-5 · Frame-adjacency snapping, not numeric distance.** `handlePreviewClick`
(`FourierMorphDemo.vue:148-169`) decides which bound a mid-range click should move by **index distance
in the preview array**, with a numeric fallback when a level is off-grid (`:161-169`). This is the
correct perceptual model: the tick scale is non-uniform (`1,2,3,5,8,12,18,25,35,50` — gaps from 1 to
15), so numeric distance would bias almost every mid-grid click toward `low`. Falsifier: on a uniform
scale the two rules agree and the extra code would be contrivance — the scale is not uniform, verified
from the JSON. Someone thought about this.

**S-6 · One breakpoint, applied whole.** All 14 media queries across the three files are
`min-width: 640px`, and each steps padding *and* gap *and* type *and* SVG size together
(`FourierMorphDemo.vue:195,208,222,235,250,264`; `MorphShapePreview.vue:77,100,135,158`;
`MorphPhaseConfig.vue:114`; `HarmonicLevelGrid.vue:142,267`). Falsifier: a stray second breakpoint in
the component tree — there is none; the only other one is the app-global 768px root-font step, which
is exactly the seam booked as m-7.

**S-7 · `useClipboard` adopted with provenance.** `useMorphConfig.ts:55-58` replaces a hand-rolled
`ref` + 2s timeout + `onUnmounted` cleanup with the producer composable, with a comment naming the
wave and the reason. Falsifier: the error arm is declined (D-9), so this is a *partial* adoption — but
the timer-lifetime correctness it buys is real and it is the right direction.

**Two candidate superlatives KILLED by their own falsifiers** (recorded so they are not re-minted):
(i) *"the hero button composes `transform: scale` with the cartoon `translate` lift"* — true, and it
is the producer's design (`cards.css:36-38` uses the longhand deliberately), not the consumer's
achievement; the consumer in fact broke the timing (D-16).
(ii) *"CSS motion is reduced-motion-safe"* — true, but it is glass-ui's global blanket
(`utilities/a11y-overrides.css:6-31`) doing the work; this component contributes zero PRM handling and
the part the blanket cannot reach is ungated (D-8).

---

## §6 · The F.W1 ledger for this component

| surface | under the pin (glass 4.0.0) | after the tri-package uplift | net |
|---|---|---|---|
| `@mkbabb/glass-ui/button` subpath (`FourierMorphDemo.vue:86`, `HarmonicLevelGrid.vue:89`) | live | **survives** (`exports["./button"]` present at 7.0.0) | — |
| `@mkbabb/glass-ui/slider`, `/select` (`MorphPhaseConfig.vue:72-73`, `HarmonicLevelGrid.vue:90`) | live | **survives**; `Select*` member set unchanged; `SliderVariant = "standard"\|"spectrum"` unchanged | — |
| `Button variant=… size="default"` ×3 | works | **BREAKS — `vue-tsc`** (`variant` gone; `"default"` ∉ `ButtonSize`) | **D-3, not in the census break list** |
| `--slider-scrub-*` retint ×2 files | already dead | **still dead** (7.0.0 keeps `--slider-range-bg`/`--slider-thumb-bg`) | **D-2 — F.W1 must carry the rename** |
| slider hover tint | no seat exists | **IMPROVES** — 7.0.0 adds `--slider-thumb-hover-ring-color`, `--slider-thumb-border-w`, `--slider-touch-target`, `--slider-target-floor` | the `-hover` pair finally has a real target |
| loading affordance | absent (D-7, D-9) | **IMPROVES** — 7.0.0 `Button.loading` | one-prop cure |
| control labelling (D-10) | 8 nameless controls | **IMPROVES** — 7.0.0 `LabeledField` + a DEV warning naming it (`Slider.vue:287-295`) | canonical seat arrives |
| slider aria forwarding (S-2) | forwarded to thumb | **IMPROVES** — `+aria-labelledby`, `+aria-describedby` | — |
| `lucide-vue-next` → `@lucide/vue` | `ClipboardCopy`, `Check`, `RotateCcw` (`FourierMorphDemo.vue:87`) | **BREAKS** — 1 of the census's 35 rename sites | census `:104`, already booked |
| `keyframes.js` engine boundary (`useFourierMorph.ts:14,149`) | `loadAnimationEngine()` @ 4.3.0 | 4.3→6 is inside the atomic transaction; `loadAnimationEngine` must be re-verified at 6.0.0 | census `:186`; `lane-frontend.md:479` |
| glyph sizing (D-13), tile height (D-12) | pinned off-token | uplift re-rolls both (`size` default becomes `"md"`) | fix before, not after |
| `metric-badge` / `hover-card` / `hover-popover` / dock members / `ToastVariant` | — | **not consumed by this component** (verified: zero imports in all five read files) | census rows land elsewhere |

**Ordering ask for F.W1:** cure D-2 (the property rename) and D-3 (the prop axis) **in the same
transaction**, because the uplift changes the `Button` defaults that D-11/D-12/D-13's scoped overrides
are silently compensating for. Landing the version bump without them converts three MAJORs into a
visual regression with no failing test to catch it — `lane-frontend.md` [FE §0, §9] records **vitest
ABSENT**, and the only `/morph` coverage in the tree is `e2e/visual-baseline.spec.ts:30-59`, which
*captures* screenshots at three viewports and asserts nothing.

---

## §7 · Roll-up

| severity | n | ids |
|---|---|---|
| BLOCKER | 3 | D-1 (nameless primary action) · D-2 (dead slider colour system, 4.0 **and** 7.0) · D-3 (Button prop-axis break at F.W1) |
| MAJOR | 14 | D-4 … D-17 |
| MINOR | 12 | m-1 … m-12 |
| INFO | 4 | i-1 … i-4 |
| **defects** | **33** | |
| superlatives | 7 | S-1 … S-7 (+2 killed by falsifier, §5) |
| UNPROVEN-NEEDS-LIVE (SS-13) | 3 | D-12 (tile height emission) · D-7 (double-click race timing) · i-3 (morph-window long tasks); m-11 partially |
