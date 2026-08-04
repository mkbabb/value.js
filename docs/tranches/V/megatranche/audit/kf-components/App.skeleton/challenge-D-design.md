claude-opus-5[1m]

# CHALLENGE · `App.skeleton` (SceneSkeleton) · axis D — DESIGN

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.skeleton.vue` (101 lines, `<script setup lang="ts">` + scoped `<style>`)
**Sole call site:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue:97` (`<SceneSkeleton />`, inside the keyed `<Suspense>` `#fallback` at `:90`)
**Imports:** **none.** The component has zero `import` statements. Its dependency surface is therefore (a) the CSS custom properties it reads and (b) the layout box its consumer hands it — both read below.
**Mode:** static, read-only. No installs, no dev server, no browser. Every colour ratio is computed from token declarations on disk; every geometry claim is computed from the clamp expressions on disk.
**Corroborating artifact:** `/Users/mkbabb/Programming/keyframes.js/dist/gh-pages/assets/index-CL_QYCiO.css` — a **real built demo bundle** (Jul 16 09:11, post-dating the component's Jul 15 mtime). Used to settle token-emission questions that are otherwise undecidable from source. This is the strongest evidence available without a browser and it kills two claims I would otherwise have filed (see §Killed).

**Tally: 16 defects (1 BLOCKER · 5 MAJOR · 5 MINOR · 5 INFO) · 4 superlatives.**

---

## 0. What the component claims about itself

The docblock (`:2–17`) makes four falsifiable design promises. All four are tested below.

| # | Claim | line | verdict |
|---|---|---|---|
| C-1 | "a glass-plate shimmer **matching the stage geometry**" | `:6` | **FALSE** — D-5 |
| C-2 | "it honors `prefers-reduced-motion` (**a static dimmed plate** for reduced-motion users)" | `:15` | **FALSE** — D-1 (nothing is dimmed; the plate is *un*changed and the only visible element is deleted) |
| C-3 | "is marked `aria-busy` **so assistive tech announces the loading state**" | `:16` | **FALSE** — D-2 (`aria-busy` is the attribute that *suppresses* the announcement) |
| C-4 | "a COMPONENT, not a raw text node" (the T.F8 structural contract) | `:9` | **TRUE** — SUP-2 |

Three of four self-claims are contradicted by the component's own body. That is the shape of this challenge: the *structure* is right, the *design* is not, and the docblock asserts the design is right.

---

## 1. BLOCKER

### D-1 · BLOCKER · the `prefers-reduced-motion` branch erases the only perceptible element, leaving no loading affordance at all

`App.skeleton.vue:94–100`

```css
@media (prefers-reduced-motion: reduce) {
    .scene-skeleton__sheen {
        animation: none;
        background: none;   /* ← deletes the gradient, not just the motion */
    }
}
```

`background: none` removes the sheen's entire paint, not merely its travel. What remains for a reduced-motion user is `.scene-skeleton__plate` alone (`:51–65`) and nothing else — no text (the docblock at `:8` records that the `<span>Loading scene…</span>` text node was deliberately deleted), no progress indicator, no pulse, no opacity change.

**Is what remains perceptible?** Computed from the token declarations, over the demo's stage field (`EditorShell.vue:3` carries `bg-background` → `var(--background)`):

*Light arm* (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css`): `--background: var(--neutral-0)` = `hsl(40 30% 98%)` → sRGB (251.4, 250.4, 248.4), rel. luminance **0.9600**. `--muted: var(--neutral-1)` = `hsl(38 26% 95%)` → (245.6, 243.1, 239.0). Plate = `color-mix(… 70%, transparent)` composited = 0.7·muted + 0.3·bg = (247.3, 245.3, 241.8), L = **0.9173**.

> **plate fill vs. page background = (0.9673)/(0.9673 − wait, compute) → (0.9600+0.05)/(0.9173+0.05) = 1.0100/0.9673 = `1.044 : 1`**

`--border: var(--neutral-4)` = `hsl(32 26% 70%)` → (198.4, 179.8, 158.6), at 80% over the plate = (208.2, 192.9, 175.2), L = **0.5990**.

> **plate border vs. plate = 0.9673/0.6490 = `1.49 : 1`** · **border vs. page = 1.0100/0.6490 = `1.56 : 1`**

*Dark arm* (`tokens/dark-arm.css` redefines the neutrals; `--background`/`--muted`/`--border` follow by `var()` indirection): `--background` = `hsl(24 9% 4%)` L = 0.003091; plate = 0.7·`hsl(28 12% 11%)` + 0.3·bg → L = 0.008109.

> **dark plate fill vs. page = 0.058109/0.053091 = `1.095 : 1`** · **dark border vs. plate = `2.10 : 1`**

So under reduced motion the entire loading state is a fill at **1.04:1** (light) / **1.10:1** (dark) — below any perceptual floor — bounded by a 1px hairline at **1.49:1** / **2.10:1**, both under WCAG 2.2 SC 1.4.11's 3:1 for "visual information required to identify user interface components and states."

**Why this is a BLOCKER and not a MAJOR:** it is the *compound* with **D-2**. The sighted reduced-motion channel conveys nothing (this finding) and the assistive-tech channel conveys nothing (D-2, the `aria-busy` suppression). There is no third channel — there is no text. For a reduced-motion screen-reader user, and for a reduced-motion sighted user, the async-scene boundary is indistinguishable from a broken app. That is precisely the "BLANK viewport, B.W3's headline blocker" failure mode that `App.vue:76–79` records as the reason the `<Suspense>` boundary is shaped the way it is.

**The design system already solved this, in the demo's own bundle.** glass-ui 7.0.0's `Skeleton` inverts the query — the animation is *opt-in* under `no-preference`, so the reduced-motion path keeps a fully opaque plate **and** a static gradient band:

```
dist/gh-pages/assets/index-CL_QYCiO.css
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{content:"";background:linear-gradient(105deg, transparent 24%, color-mix(in oklab, var(--foreground) 10%, transparent) 48%, transparent 72%);position:absolute;inset:0}
@media (prefers-reduced-motion:no-preference){.skeleton[data-v-cd03d0b0]:after{animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) ease-in-out infinite;will-change:transform;transform:translate(-110%)}}
```

Note `background: var(--muted)` — **opaque**, contrast against `--background` = (0.9600+0.05)/(0.8873+0.05) ≈ 1.08:1 in light… *(also low — see the honest caveat in D-4)* — but critically the `::after` gradient band is present at `translate(0)` in the reduced-motion path, giving a static highlight that is the "dimmed plate" C-2 promises and never delivers.

**Falsifier (SS-13 visual audit).** Screenshot the demo at `prefers-reduced-motion: reduce` during an async scene swap. If a reduced-motion user can identify a loading placeholder — because the fixed `.grid-background` graph-paper ink (`layout.css:238–259`, a `position: fixed inset-0` overlay under the stage) is attenuated to 30% inside the plate and that attenuation reads as an edge — this drops to MAJOR. I have deliberately *not* claimed "blank screen": the grid attenuation is a real, un-modelled signal, and my flat-field computation cannot decide it. What I *have* proved is that the plate's own fill contributes 1.04:1 and its border 1.49:1, and that every deliberate loading signal in the component is switched off.

---

## 2. MAJOR

### D-2 · MAJOR · `aria-busy="true"` on the `role="status"` live region is the attribute that *prevents* the announcement the docblock promises; and the region has no content to announce anyway

`App.skeleton.vue:27–37`

```html
<div class="scene-skeleton" role="status" aria-busy="true" :aria-label="label">
    <div class="scene-skeleton__plate" aria-hidden="true">
        <span class="scene-skeleton__sheen" />
    </div>
</div>
```

Two independent failures of the same announce path:

**(a) `aria-busy` suppresses, it does not announce.** WAI-ARIA 1.2 `aria-busy`: an element is "being modified" and assistive technologies "MAY want to **wait** until the modifications are complete before exposing them to the user." The APG live-region pattern is: set `aria-busy="true"` → mutate → set `aria-busy="false"`, and the announcement fires on the *transition to false*. Here `aria-busy` is a static literal (`:31`) that never flips: when the scene resolves, `<Suspense>` **destroys** the fallback (`App.vue:88–96`). The region goes from busy to non-existent. The un-busy transition never happens, so the queued announcement never flushes. The docblock's causal claim at `:16` — "marked `aria-busy` **so** assistive tech announces the loading state" — inverts the attribute's semantics.

**(b) the region is empty.** `role="status"` is a live region with implicit `aria-live="polite"`; live regions announce their **contents**, not their accessible name. The only descendant here is `aria-hidden="true"` (`:34`), and there is no text node anywhere in the template — the docblock at `:8` records that the text node was removed on purpose. The region's announceable content is the empty string. `aria-label` supplies a *name*, which a live region does not read out on mutation.

**(c) compounding:** the fallback is present on **first render** of the keyed `<Suspense>` (`App.vue:90`, `:key="activeSceneKey"`). Live regions do not announce content that is already in the DOM when the region is created; they announce subsequent mutations. Even with (a) and (b) fixed, an initially-mounted `role="status"` is announced by no major screen reader.

**Fix shape:** delete `aria-busy` from the fallback (it belongs on the container *receiving* content, i.e. `.scene-host` in `App.vue:83`, toggled false in `onSceneResolved`), and put the label in the DOM as a visually-hidden text node inside the region rather than on `aria-label`. glass-ui already ships `.sr-only` (`node_modules/@mkbabb/glass-ui/dist/styles/components.css:1`), and the demo's own `AnimatedText.vue:7–8` already uses exactly this sr-only-mirror idiom — so the correct pattern exists **twice** in reach and was not used here.

**Falsifier:** an NVDA/JAWS/VoiceOver trace showing "Loading scene" spoken when the fallback mounts. If any of the three announces it, (b)/(c) are wrong and this drops to MINOR (with (a) surviving as a spec-conformance nit).

---

### D-3 · MAJOR · `var(--shadow-glass, …)` references a token that does not exist — the hardcoded 4 %-black fallback is permanent, and invisible in dark mode

`App.skeleton.vue:64`

```css
box-shadow: var(--shadow-glass, 0 1px 2px rgb(0 0 0 / 0.04));
```

`--shadow-glass` is declared **nowhere**:

```
$ grep -rn -- "--shadow-glass:" demo/ dist/gh-pages/assets/*.css
(no output)
$ grep -rho -- "--shadow-glass:[^;]*" node_modules/@mkbabb/glass-ui/dist/
(no output)
```

glass-ui's actual glass-elevation tokens are **suffixed** (`dist/styles/theme/bridges.css`): `--shadow-glass-wash`, `--shadow-glass-quiet`, `--shadow-glass-resting`, `--shadow-glass-floating`, `--shadow-glass-overlay` — plus the general `--shadow-sm/md/lg/xl` and `--glass-material-rim` in `dist/styles/tokens/shadow.css`. The author reached for the *stem* of a five-member family and got a phantom. There is no build step that catches this: an undefined custom property with a fallback is valid CSS and fails silently forever.

**Design consequence.** The permanent fallback is `rgb(0 0 0 / 0.04)` — a pure-black 4 % shadow with a 2px blur.
- *Light:* over `--background` (L 0.9600) a 4 % black shadow at 2px blur is at the very edge of perceptibility; the plate has effectively no elevation.
- *Dark:* over `--background` = `hsl(24 9% 4%)` (L 0.003) a black shadow is **strictly invisible** — the shadow is darker than nothing can be against a near-black field.

So the docblock's "a **glass** surface silhouette echoing a scene's stage panel" (`:50`) resolves, in both themes, to *a flat rectangle*. The one declaration carrying the word "glass" is the one that never fires. This is the design claim of the component defeated by a typo-class error.

**Falsifier:** a computed-style read showing `box-shadow` resolving to anything other than `0 1px 2px rgba(0,0,0,0.04)` — i.e. some cascade elsewhere defines `--shadow-glass`. I searched the demo tree, the glass-ui dist, and the *shipped built bundle*; all three are empty.

---

### D-4 · MAJOR · the plate fill is 1.04 : 1 against the page — the "glass plate" does not read as a surface in either theme

Computations in D-1. Summarised:

| measure | light | dark | threshold |
|---|---|---|---|
| plate fill vs. page background | **1.044 : 1** | **1.095 : 1** | — (no SC; perceptual floor ≈1.1–1.2:1) |
| plate border vs. plate fill | **1.49 : 1** | **2.10 : 1** | 3 : 1 (SC 1.4.11) |
| plate border vs. page background | **1.56 : 1** | **2.30 : 1** | 3 : 1 (SC 1.4.11) |
| sheen peak vs. plate (motion on) | **1.17 : 1** (ΔL\* ≈ 6.2) | **1.22 : 1** (ΔL\* ≈ 8.7) | — |

The `70%`/`80%` transparency multipliers at `:57–63` are the cause: `--muted` is already only ΔL\* ≈ 1.7 from `--background` in the light arm (both are near-white neutrals by design — `--neutral-1` vs `--neutral-0`), and mixing it *further* toward transparent halves what little separation existed. The design intent (a subtle glass wash) is defensible; the execution multiplies two subtleties and lands under the floor.

**Note the asymmetry this produces:** with motion enabled, the sheen (ΔL\* 6.2–8.7) is **more visible than the plate that contains it**. The user perceives a travelling ghost band with no container — the inverse of the intended "plate with a highlight sweeping over it."

**Honest scoping.** SC 1.4.11 has an exception for purely decorative content, and one can argue a skeleton is decoration rather than a "component or state." I do not think that argument survives the docblock — `:16` declares this *is* a state indicator ("so assistive tech announces the **loading state**") — but a reviewer may rule otherwise, in which case this is a taste finding at 1.04:1 rather than a conformance finding. It is filed MAJOR on the *perceptual* claim (the plate does not read), which is independent of how 1.4.11 is scoped.

**Falsifier:** measure the rendered plate against the rendered stage in the live demo (SS-13). If the fixed `.grid-background` graph-paper ink attenuation inside the plate lifts the perceived edge above the flat-field number, the *perceptual* half weakens — but the flat-field ratios themselves are arithmetic and are not falsifiable by observation.

---

### D-5 · MAJOR · "matching the stage geometry" is false at every viewport the demo targets — the plate is a fixed 42 × 24 rem island in a stage ≥ 72 × 44 rem

Docblock `:6` "a glass-plate shimmer **matching the stage geometry**"; `:50` "a glass surface silhouette **echoing a scene's stage panel**." Body `:53–54`:

```css
width:  min(100%, 42rem);   /* 672px cap */
height: min(100%, 24rem);   /* 384px cap */
```

The stage the fallback occupies is the work-area card (`demo/styles/layout.css:49–51`):

```css
--work-area-max-width:  clamp(72rem, 94vw, 160rem);   /* 1152px … 2560px */
--work-area-max-height: clamp(44rem, 88dvh, 120rem);  /*  704px … 1920px */
--work-area-height:     min(100dvh, var(--work-area-max-height));
```

At the **smallest** desktop work area the plate covers 42/72 = **58 % of width** and 24/44 = **55 % of height** — 32 % of the area. At a 2560px-wide panel the layout comment at `layout.css:44–46` says the card "fills ~50 %W/66 %H" of a 5K display; the plate stays pinned at 672 × 384 and drops to a single-digit area fraction. The skeleton→scene swap is therefore a **large** geometric expansion at every desktop size, which is exactly the perceived-performance harm the docblock cites as its reason to exist ("VERDICT #19 perceived-perf sibling", `:8`).

**Proportion (Aristotelian).** 42:24 = **1.75 : 1** = 7:4. The demo's layout language is explicitly φ-driven — `layout.css:60` `--phi: 1.618`, `:66–67` `--work-area-vertical-bias-top: 0.382 /* 1/φ² */` with the comment "the subject parks above optical centre… the golden bias." 1.75 is neither φ (1.618), nor 16:9 (1.778), nor 3:2 (1.5). It is a round-numbers pick (`42rem`, `24rem`) in a layout system that reasons in φ and in `clamp()`. Two arbitrary constants in a file whose neighbours are all derived.

**Fix shape:** drop the caps and let the plate fill the stage cell (`width: 100%; height: 100%` inside the existing `clamp()` padding), or derive them from the same `--work-area-*` tokens the stage uses. Either makes C-1 true.

**Falsifier:** measure a resolved scene's stage panel in the live demo. If any of the seven scenes (`scenes.ts:129–182`: home/cube/amiga/square/easing/spring/sequence) renders a stage panel at ~672 × 384 with a 1.75 aspect, C-1 is true *for that scene* and this drops to MINOR-scoped-to-the-other-six. Note that the single fallback serves all seven scenes, which have visibly different stage shapes (a 3D cube stage, a Three.js canvas, an easing sidebar+target split), so "matching" cannot be simultaneously true for more than one of them regardless.

---

### D-6 · MAJOR · bespoke re-implementation of glass-ui `Skeleton`, whose CSS the demo **already ships, unused** — and the DS version is strictly better on five design axes

*(Folds and hardens `lane-frontend.md` **S-6**, which rated this AMBER/"evaluate" on the grounds that "the *stage-geometry composition* is legitimately demo-owned; the **shimmer plate underneath it is the primitive**." I agree with the split and I am raising the severity, because the census did not read the DS skeleton's CSS. Reading it changes the verdict: this is not a stylistic preference, it is five concrete regressions.)*

The demo's shipped bundle already contains glass-ui's `Skeleton` styles, because `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` pulls `dist/styles/index.css` which ends `@import "../glass-ui.css"`:

```
$ grep -l "skeleton\[data-v-cd03d0b0\]" dist/gh-pages/assets/*.css
index-CL_QYCiO.css
```

The demo therefore **pays the bytes for the DS skeleton and renders a worse one on top.** Side by side:

| axis | glass-ui `Skeleton` (in the bundle) | `App.skeleton` | ref |
|---|---|---|---|
| plate fill | `background: var(--muted)` — **opaque** | `color-mix(--color-muted 70%, transparent)` → 1.04:1 | D-4 |
| sheen mechanism | `::after` + `transform: translate(-110% → 110%)` — **compositable** | `background-position: 140% → -40%` on a real `<span>` — **paint every frame** | D-7 |
| motion clock | `var(--duration-shimmer, 2.4s)` — **tokenised** | hardcoded `1.6s` | D-8 |
| reduced motion | `@media (prefers-reduced-motion: no-preference)` **opt-in**; static gradient band survives | `@media (…: reduce)` deletes the gradient | D-1 |
| reduced transparency | `@media (prefers-reduced-transparency: reduce) { background: var(--muted) }` | absent | D-10 |
| forced colours | `@media (forced-colors: active) { opacity:.18; background: canvastext } … :after{display:none}` | absent | D-10 |
| stacking hygiene | `isolation: isolate` | absent (harmless here) | — |
| radius token | `var(--radius-input)` (semantic) | `var(--radius-lg, .75rem)` (scale, dead fallback) | D-11 |
| extra DOM node | none (`::after`) | one `<span>` (`:35`) | — |

**Recommended shape** (consistent with S-6's "keep the layout, delegate the plate"): keep `.scene-skeleton` (the flex centring + fluid padding + the a11y wrapper, once D-2 is fixed) and replace `.scene-skeleton__plate`/`__sheen` with `<Skeleton class="…" />` from the root barrel — `export * from "./components/skeleton"` in `dist/index.d.ts`. Net: ~50 lines of CSS deleted, six design defects (D-1, D-4, D-7, D-8, D-10, D-11) close at once.

**Blocked on `lane-frontend.md` F-1.** The census proved `@mkbabb/glass-ui` is a **phantom dependency** — absent from `package.json` *and* `package-lock.json`, present in `node_modules` at 7.0.0. Adding a *new* glass-ui import to this file deepens a dependency edge that `npm ci` cannot reconstruct. F-1 must land first; that is the census's own wave order (§10 step 1) and I do not contradict it.

**Falsifier:** show that `Skeleton` cannot fill its parent (it takes only `class`, per `dist/components/skeleton/Skeleton.vue.d.ts` — `{ class?: HTMLAttributes["class"] }`, no size props), so `.scene-skeleton__plate`'s sizing cannot be expressed. It can — sizing is passed through `class`, which is the primitive's entire prop surface *by design*.

---

## 3. MINOR

### D-7 · MINOR · `will-change: background-position` — permanent, and on a property no browser can promote

`App.skeleton.vue:82`. Two problems compounded:

1. **It cannot help.** Compositor-accelerated properties are `transform`, `opacity`, and (partially) `filter`. `background-position` is a **paint** property: every frame of `scene-skeleton-sweep` repaints the full plate — up to 672 × 384 px = 258 k px, at 60 fps, forever, on a boundary that exists precisely because the main thread is already busy parsing a lazy chunk. `will-change` on a non-promotable property yields no layer.
2. **It is never removed.** MDN's `will-change` guidance is explicit that the property is a transient hint and that setting it declaratively-and-permanently is an anti-pattern (it asks the browser to hold optimisation state indefinitely). Here it is a static declaration on an `infinite` animation, so the hint is live for the entire lifetime of every fallback mount.

The DS does it correctly one file away: `will-change: transform` on a `translate()` animation (D-6 table).

**Falsifier:** a DevTools performance trace of an async scene swap showing no measurable paint cost from `.scene-skeleton__sheen`, and/or a layer-borders capture showing the sheen promoted. **UNPROVEN-NEEDS-LIVE** for the *magnitude*; the *mechanism* (background-position is a paint property; will-change is declared statically) is settled from source.

---

### D-8 · MINOR · hardcoded `1.6s ease-in-out`, and `@keyframes scene-skeleton-sweep` duplicates a `@keyframes` already loaded in the same cascade

`App.skeleton.vue:81, 85–92`.

**Duration.** glass-ui ships shimmer clocks (`dist/styles/tokens/scheme-motion.css`): `--duration-shimmer-fast: 3s`, `--duration-shimmer: 5s`, `--duration-metal: 6s`, plus the general `--duration-instant/control/fast/normal/slow/panel/xl/xxl`. The DS skeleton uses `var(--duration-shimmer, 2.4s)`. This component picks `1.6s` — between 1.5× and 3× faster than every shimmer in the design system, with no token reference, so a system-wide motion-tempo change (e.g. the `.motion-calm` scheme visible in `scheme-motion.css`) does not reach it.

**Duplication.** `dist/styles/animations.css` — loaded into the demo via `style.css:3` — already defines:

```css
@keyframes shimmer      { 0% { background-position:  250% 0 } 100% { background-position: -250% 0 } }
@keyframes shimmer-sweep{ 0% { background-position: -200% 0 } 100% { background-position:  200% 0 } }
```

`scene-skeleton-sweep` (`:85–92`, `140% 0` → `-40% 0`) is the *same idiom on the same property in the same direction* as `shimmer`, redefined locally with different constants. Per `lane-frontend.md` §6.4 the demo owns only 9 `@keyframes` total; this is one of them, and it is a re-derivation of an imported one.

**Falsifier:** show that `140% → -40%` at `background-size: 220% 100%` produces a sweep geometry that `shimmer`'s `250% → -250%` cannot reach by adjusting `background-size` alone. (It can — the two parameters are interchangeable.)

---

### D-9 · MINOR · three parallel token-naming conventions inside 101 lines, and the `--color-*` triplet is a 1-of-1 deviation from the entire demo

This is the flat-namespace hazard `lane-frontend.md` §6.3 names ("Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own"), manifesting inside one file. The component reaches glass-ui through **three different naming systems**:

| line | reference | system | resolves? |
|---|---|---|---|
| `:56` | `--radius-lg` | glass-ui `@theme` (`dist/styles/theme/radius.css`) | yes |
| `:59, :63, :75` | `--color-muted`, `--color-border`, `--color-foreground` | Tailwind v4 bridge, `@theme inline` (`dist/styles/theme/bridges.css`) | yes — *see §Killed* |
| `:64` | `--shadow-glass` | **none** | **no** — D-3 |

Two of three names for the same colour exist simultaneously (`--muted` in `tokens/color-radius.css`, `--color-muted` in `theme/bridges.css`), and the demo has already chosen — decisively:

```
$ grep -rho "var(--color-[a-z0-9-]*" --include="*.vue" --include="*.css" demo/ | sort | uniq -c
     73 var(--color-progress          ← demo-owned token
      2 var(--color-slider-track      ← demo-owned token
      2 var(--color-gold              ← demo-owned token
      1 var(--color-muted             ← App.skeleton.vue:59
      1 var(--color-foreground        ← App.skeleton.vue:75
      1 var(--color-border            ← App.skeleton.vue:63
$ grep -rho "var(--foreground)\|var(--border)\|var(--background)\|var(--muted\b" --include="*.vue" --include="*.css" demo/ | sort | uniq -c
     26 var(--foreground)
     17 var(--border)
     11 var(--background)
      3 var(--muted
```

Every `--color-*` reference in the demo that resolves to a *glass-ui* colour is in this one file, one occurrence each. The demo's own `--color-*` names (`--color-progress`, `--color-gold`, `--color-slider-track`) are demo-authored tokens — so this file's three names sit in the demo's own prefix space while pointing at glass-ui's, which is the exact collision shape §6.3 warns about. Consistency argues for `var(--muted)` / `var(--border)` / `var(--foreground)`; so does the DS skeleton, which uses the bare names.

**Falsifier:** find a fourth site in `demo/` using `var(--color-muted|border|foreground)`. The grep above is exhaustive over `.vue` and `.css`.

---

### D-10 · MINOR · no `forced-colors` and no `prefers-reduced-transparency` branch — both of which the DS skeleton carries

`App.skeleton.vue` has exactly one `@media` block (`:95`). Absent:

- **`@media (forced-colors: active)`.** In forced-colors mode `background-color` is forced to `Canvas` and `box-shadow` to `none`. The plate's identity is *entirely* `background` + `box-shadow` + a `color-mix` border; what survives HCM is a 1px border in the forced border colour around an empty box, with a gradient sheen whose paint behaviour under forced colours is UA-variable. glass-ui's skeleton handles this explicitly: `@media (forced-colors:active){ .skeleton{opacity:.18;background:canvastext} .skeleton:after{display:none} }` — it substitutes a *system* colour so the placeholder survives, and kills the sheen so it cannot fight it. glass-ui's global `accessibility.css` forced-colors block covers only `[aria-current]/[aria-selected]/[aria-pressed]/[aria-checked]/[data-state]` and `[aria-invalid]` — **it does not reach `role="status"`**, so there is no inherited coverage here.
- **`@media (prefers-reduced-transparency: reduce)`.** The plate is built from two `color-mix(… , transparent)` washes; a user who has asked for reduced transparency gets the washes anyway. The DS skeleton restores `background: var(--muted)` opaque under this query. `tokens/shadow.css` shows glass-ui treats `prefers-reduced-transparency` as a first-class query (it re-weights `--cartoon-ink-*` under it), so this is house style, not an exotic ask.

**Falsifier:** a Windows HCM / `forced-colors: active` emulation showing the plate legible. **UNPROVEN-NEEDS-LIVE** for the rendering; the *absence of the queries* is settled from source (one `@media` in the file).

---

### D-11 · MINOR · the `--radius-lg` fallback `0.75rem` is dead **and** wrong, and `--radius-lg` is the wrong token for a "stage panel" silhouette

`App.skeleton.vue:56` `border-radius: var(--radius-lg, 0.75rem);`

`--radius-lg` **is** declared, so `0.75rem` never renders. It is declared **twice**, at different values, in the shipped bundle:

```
dist/gh-pages/assets/index-CL_QYCiO.css
  … --radius-lg:var(--radius) …   ← glass-ui theme/radius.css, in @layer theme,      --radius: .625rem
  … --radius-lg:.5rem …           ← glass-ui prebuilt components.css, imported layer(components)
```

`@layer theme` first appears at byte 14 283 and `@layer components` content at 152 875, so `components` is the later-declared layer and wins for equal-specificity `:root` declarations → the plate renders at **0.5rem = 8px**, or 0.625rem = 10px if the layer order resolves the other way. Either way it is **not** the 12px the source advertises — a 33–50 % shape error against author intent, invisible to review because the wrong number is the one written down.

Separately, `--radius-lg` is the generic scale step. The surfaces this plate claims to echo have *semantic* radii (`dist/styles/theme/radius.css`): `--radius-panel: var(--radius-xl)` = 12px, `--radius-card: var(--radius-2xl)` = 1rem, `--radius-dock-card: var(--radius-3xl)` = 1.5rem. A silhouette that stands in for a stage panel should carry `--radius-panel`; the DS skeleton uses `--radius-input`. The chosen token is the one that echoes nothing.

*(The double `--radius-lg` declaration is a glass-ui packaging defect — its prebuilt `components.css` `:root` re-declares Tailwind's stock `--radius: .25rem` / `--radius-lg: .5rem` over its own theme's `.625rem` — and is out of scope for this component. It is named here only because it is the reason the rendered corner is unknowable from this file alone.)*

**Falsifier:** a computed-style read of `.scene-skeleton__plate` returning `border-radius: 12px`.

---

## 4. INFO

### D-12 · INFO · the `label` prop is dead API

`:18–24` declares `withDefaults(defineProps<{ label?: string }>(), { label: "Loading scene" })`. The sole call site, `App.vue:97`, is `<SceneSkeleton />` — no binding. The prop, its default, its JSDoc (`:20`), and the `:aria-label` binding (`:32`) exist to serve zero callers, and (per D-2) the attribute they feed does not participate in the announcement anyway. Under the standing `feedback_kiss_no_contrivance` law this is speculative surface. **Falsifier:** a second `<SceneSkeleton>` mount anywhere; `grep -rn "SceneSkeleton" demo/` returns exactly three lines (docblock, import, mount).

### D-13 · INFO · no error or timeout state — a rejected chunk shimmers forever

The docblock calls this "**THE** shared loading placeholder" (`:5`), a totalising claim, but the component models one state. `App.vue:90`'s `<Suspense>` has `@resolve` and no `onErrorCaptured` / `errorCaptured` anywhere in the file, so a failed dynamic import leaves Vue's Suspense pinned in `#fallback`: the shimmer runs indefinitely with no error affordance, no retry, no timeout escalation. Strictly this boundary is `App.vue`'s to own, which is why this is INFO and not MAJOR — but the component's own framing ("THE shared loading placeholder") is what invites the state-coverage question. **Falsifier:** an `onErrorCaptured` on an ancestor of `App.vue`'s `<Suspense>`; `grep -rn "onErrorCaptured\|errorCaptured" demo/app/App.vue` → no output.

### D-14 · INFO · no logical-direction handling — but the tree has no RTL surface, so this conforms to local convention

`padding` (`:47`), `linear-gradient(105deg, …)` (`:72`), and the `140% → -40%` sweep (`:86–91`) are all physical-direction. In RTL the shimmer would sweep against the reading direction and the gradient's 105° rake would mirror-mismatch. **I am not filing this as a defect:** the demo has zero RTL surface (`grep -rn 'dir="rtl"\|\[dir=' demo/` → no output) and uses logical properties at only 6 sites tree-wide. The component is consistent with its tree. Recorded so a future RTL wave has the site. **Falsifier:** none needed — it is a forward note.

### D-15 · INFO · the shimmer is hand-rolled CSS in the repo whose thesis is that its animation *is* the library

`lane-frontend.md` **S-8** records the demo's inv-ζ seam: "the demo's signature animation IS the library, not pure CSS" (`TypingDots.vue:1–9`), and §1 counts 68 engine-consuming files. This component's motion is a plain CSS `@keyframes`. **The docblock pre-empts the objection** (`:14`, "The shimmer is content-independent chrome") and I accept the defence: a `<Suspense>` fallback must paint before the lazy chunk resolves, and keeping it dependency-free is a defensible boot-cost argument (the engine *is* in the main bundle via the `@src` alias, so availability is not the reason — cost and simplicity are). Recorded as an inv-ζ inconsistency with a stated justification, not as a defect. **Falsifier:** none — this is a ruling request, not a claim.

### D-16 · INFO · `overflow: hidden` on the plate is inert

`:55`. The sheen is `position: absolute; inset: 0` (`:69–70`) and can never exceed the plate's box; `background-size: 220%` does not overflow the element (backgrounds are clipped to the padding box regardless). The declaration is copied from an idiom where it *is* load-bearing — the DS skeleton's `::after` uses `translate(±110%)` and genuinely overflows — but here it guards nothing. Harmless; it becomes correct the moment D-7's fix (transform-based sweep) lands, so it is best left in place. **Falsifier:** a rendering where the sheen paints outside the plate's rounded corners.

---

## 5. SUPERLATIVES (L-18, running the other way)

### SUP-1 · the docblock separates its structural contract from its visual disposition, and names a forwarding address

`:11–13`:

> "The STRUCTURAL contract is what T.F8 pins (fallback ≠ bare text, no stage-gating icon-spinner); the VISUAL treatment (shimmer feel, shape fidelity) is an appearance disposition **deferred to T.M2 / T.D's glass language**."

This is unusually honest engineering prose. It states what was ratified, what was *not*, and where the unratified part is due — so this entire challenge's visual half (D-1, D-3, D-4, D-5, D-11) lands inside a scope the component **already declared open**. Most components under audit assert completeness; this one filed its own exception in advance, and that materially changes how the findings should be triaged.

*Tempering (L-18 cuts both ways):* the prose is written in tranche-internal cipher — "T.F8 (the skeletons tier; lane 13 rec 8)", "VERDICT #19 perceived-perf sibling", "T.M2 / T.D" — none of which is resolvable from within the keyframes.js tree. A reader outside the tranche corpus cannot act on the deferral it so carefully records, which costs the honesty most of its practical value. And the honesty does not extend to C-2/C-3 (`:15–16`), which assert reduced-motion and screen-reader correctness flatly — those are the two claims that turn out to be false (D-1, D-2).
**Falsifier:** find "T.M2" / "lane 13 rec 8" defined anywhere in `keyframes.js`.

### SUP-2 · the T.F8 structural contract is met exactly

The one thing this component was commissioned to do (C-4), it does. `App.vue:97` renders a component, not `<span>Loading scene…</span>`; there is no stage-gating icon-spinner; the boundary is the bare `<Suspense>` the surrounding comment (`App.vue:73–82`) says it must remain. 101 lines, **zero imports**, one prop, four DOM nodes. No god module, no wrapper indirection, no new shared directory — squarely inside `feedback_kiss_no_contrivance` and `feedback_no_god_modules`. Every defect above is a *quality* finding inside a correct *shape*, which is the cheaper of the two failure modes to repair.
**Falsifier:** find a text-node or spinner fallback still live at the scene boundary.

### SUP-3 · `aria-hidden="true"` on the decorative subtree is exactly right

`:34`. The plate and its sheen are chrome and carry no information; hiding them from the accessibility tree is the correct call, and it is the call most hand-rolled skeletons get wrong (they leave decorative boxes exposed and flood the tree). The a11y *instinct* in this file is sound — it is the wiring around it (D-2) that fails. Worth stating plainly, because a fix for D-2 must **not** disturb this line.
**Falsifier:** show that the plate carries information the AT user needs.

### SUP-4 · breakpoint-free fluid padding, and zero contribution to the namespace hazard

`:47` `padding: clamp(1rem, 4vw, 3rem)` — one declaration, no media queries, no breakpoint stair-step, and it is idiomatic for this tree (`layout.css:49–51` sizes the entire work area with `clamp()`). Separately: the component **defines no custom properties at all**. Against `lane-frontend.md` §6.3's 98 unprefixed demo tokens sharing a flat global namespace with glass-ui's, this file adds exactly zero to the collision surface — it is a pure consumer. (Its *consumption* is inconsistent — D-9 — but the hazard the census flagged is about declaration, and here the count is 0.)
**Falsifier:** find a `--custom-property:` declaration in the file. There are none.

---

## 6. Claims I killed before filing

Recorded because a false defect is worse than a missed one, and because two of these are the obvious first-pass findings on this file.

**KILLED-1 · "`--color-muted` / `--color-border` / `--color-foreground` are Tailwind `@theme inline` names that are never emitted as custom properties, so all three `color-mix()` calls silently fall back to the hardcoded light-mode `oklch()` values and the component is theme-blind."**
This was my leading hypothesis: `dist/styles/theme/bridges.css` declares them inside `@theme **inline**`, and glass-ui's own prebuilt `components.css` `:root` emits *no* `--color-*` at all (only `--radius-*`, `--text-*`, `--spacing`, `--animate-spin`, `--container-lg`), while its utilities compile to `var(--foreground)` rather than `var(--color-foreground)` — every static signal pointed at non-emission and therefore at a dark-mode-broken plate. **The built demo bundle falsifies it:**

```
$ grep -o -- "--color-muted:[^;]*;\|--color-foreground:[^;]*;\|--color-border:[^;]*;" dist/gh-pages/assets/*.css
--color-border:var(--border);
--color-foreground:var(--foreground);
--color-muted:var(--muted);
```

All three are emitted in the demo's own Tailwind pass and resolve through to the theme-aware bare tokens. **The component is theme-correct.** The three `oklch()` fallbacks (`:59`, `:63`, `:75`) are dead code — light-mode-only values that would be wrong in dark if they ever fired — but they never fire, so this is not a defect; it survives only as the naming-consistency finding D-9.

**KILLED-2 · "`height: 100%` on `.scene-skeleton` (`:46`) has no definite containing block, so the percentage resolves to `auto` and the plate collapses."**
The chain is definite: `App.vue:83–85` `<div class="scene-host h-full w-full">` → `EditorShell.vue:74` `<main class="grid place-items-center place-self-stretch">` → `EditorShell.vue:3` `class="… grid h-dvh max-h-dvh …"`. `h-dvh` is a definite root height, `place-self-stretch` propagates it through the grid item, `h-full` carries it to the host. No collapse.

**KILLED-3 · "the demo violates the glass-ui import boundary by hand-rolling a skeleton."**
Not a boundary violation — `lane-frontend.md` **F-6** establishes the import boundary is clean (0 local `ui/` copies, 0 direct `reka-ui` imports), and this file has zero imports of any kind. The finding is *shadowing* (D-6), which is a different and lesser charge, and it is exactly where the census (S-6) put it.

---

## 7. Disposition

**Order of repair.** D-2 and D-3 are one-line fixes that close a MAJOR each and are independent of everything else — land them first. D-1 (the BLOCKER) closes as a side-effect of D-6 (adopt the DS `Skeleton` plate), which also closes D-4, D-7, D-8, D-10 and D-11 — but D-6 is **gated on `lane-frontend.md` F-1** (declare `@mkbabb/glass-ui@7.0.0` and regenerate the lock; `npm ci` cannot currently reconstruct the tree). If F-1 slips, D-1 has a standalone 3-line fix: invert the query to `no-preference`, drop `background: none`, and make the plate fill opaque. D-5 is a spec question (what should the fallback's geometry be?) and wants the T.M2/T.D ruling the docblock is already waiting on (SUP-1).

**No file in `keyframes.js` was written, mutated, or executed.** No installs, no dev server, no browser. The only write performed by this lane is this document.
