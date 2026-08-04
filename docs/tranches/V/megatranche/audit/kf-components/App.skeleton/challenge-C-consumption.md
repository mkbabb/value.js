claude-opus-5[1m]

# CHALLENGE — `App.skeleton` (SceneSkeleton) · axis C = CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.skeleton.vue` (101 lines)
**Sole consumer:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue:97` (`<SceneSkeleton />`, import at `:143`)
**Date:** 2026-08-04 · **Mode:** static, source- and built-artifact-derived. No browser tooling (lane law). Livable-only claims carry `UNPROVEN-NEEDS-LIVE` for SS-13.

---

## 0. Import closure (the whole surface this axis has to judge)

`App.skeleton.vue` has **zero imports** — no `<script>` import statement, no `@import` in its `<style scoped>` block. Its entire consumption surface is:

| kind | what it reaches for | line |
|---|---|---|
| library (`@mkbabb/keyframes.js`) | **nothing** | — |
| design system (`@mkbabb/glass-ui`) | **nothing** by import; 5 bare `var(--…)` token reads | `:56, :59, :63, :64, :75` |
| value.js (transitive) | **nothing** | — |
| sibling components | consumed by exactly one: `App.vue:97` | — |

So the axis reduces to two questions: *are the five token reads real?* and *is the hand-rolled plate the right relationship to a design system that already ships the primitive?* Both were tested against the **shipped build artifact** `/Users/mkbabb/Programming/keyframes.js/dist/gh-pages/assets/index-CL_QYCiO.css` (571 KB, dated Jul 16 09:11, post-dating the source's Jul 15 17:38 mtime — representative), not against source intent.

**Corpus fold:** this is census row 101 (`lane-frontend.md:172`) and shadow **S-6** (`lane-frontend.md:365`, AMBER, "keep the layout, delegate the plate"). I confirm S-6's direction and contradict its *grade* (§D-5). F-1 (`lane-frontend.md:15,54`) is load-bearing for every remediation below.

---

## DEFECTS

### D-1 · `--shadow-glass` is a **dead token**; the "glass plate" is not glass — **MAJOR**

`:64` `box-shadow: var(--shadow-glass, 0 1px 2px rgb(0 0 0 / 0.04));`

`--shadow-glass` **does not exist** anywhere in glass-ui 7.0.0. The design system publishes the elevation ladder under two names, neither of which is the bare one:

```
node_modules/@mkbabb/glass-ui/dist/styles/tokens/glass-fx.css : --glass-shadow-{wash,quiet,resting,floating,overlay}
node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css   : --shadow-glass-{wash,quiet,resting,floating,overlay}
grep -rn -- "--shadow-glass:" node_modules/@mkbabb/glass-ui/dist  →  0 hits
```

And empirically, in the shipped demo bundle:

```
grep -c -- "--shadow-glass:"          index-CL_QYCiO.css → 0
grep -o -- "--shadow-glass-[a-z]*:"   index-CL_QYCiO.css → (nothing; the bridges were tree-shaken as unused)
```

So the plate **always** paints the hardcoded fallback: a 4 %-black, 1 px, 2 px-blur hairline. On the dark arm (`tokens/dark-arm.css`) a 4 % black shadow against a dark ground is invisible; the plate has *no elevation at all*, in either theme. The docblock's "glass-plate shimmer" (`:6`) and the CSS comment "a glass surface silhouette" (`:50`) are therefore unfunded claims: this component names the design system's glass language and receives none of it. The failure is silent by construction — a `var()` fallback produces no build error, no lint hit, no runtime warning.

**Falsifier:** any `:root`-reachable `--shadow-glass:` declaration in the shipped cascade (grep the built CSS, or a live `getComputedStyle(document.documentElement).getPropertyValue('--shadow-glass')` returning non-empty) kills this claim outright.

**Note (a claim I ran and killed):** I expected the same silent-fallback failure for `--color-muted` / `--color-border` / `--color-foreground` / `--radius-lg`, since glass-ui declares those bridges inside `@theme inline` (`bridges.css:1`) and Tailwind v4's `inline` semantics exist precisely so the bridge need not be emitted. The built artifact refutes it — `--color-border:var(--border);--color-foreground:var(--foreground);--color-muted:var(--muted)` **is** emitted to the theme rule. Those four reads resolve; the plate *is* theme-aware. Only the shadow is dead. Recording the dead claim because the falsifier is what did the work.

---

### D-2 · The sheen animates a **non-compositable** property; the primitive it shadows does not — **MAJOR**

`:80-82` `background-size: 220% 100%; animation: scene-skeleton-sweep 1.6s …; will-change: background-position;`
`:86-91` the keyframes move `background-position` from `140% 0` → `-40% 0`.

glass-ui's own `Skeleton` solves the identical problem the compositor way:

```
glass-ui.css: .skeleton[data-v-cd03d0b0]:after{
  animation: skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) ease-in-out infinite;
  will-change: transform; transform: translate(-110%) }
```

Two distinct costs follow from the divergence:

1. `background-position` is not a compositor-animatable property. Every frame of a 1.6 s infinite loop **rasterises the whole plate** — `min(100%, 42rem) × min(100%, 24rem)`, i.e. up to 672 × 384 CSS px of gradient. This burns main-thread/raster budget during the **one moment the budget is already gone**: the `<Suspense>` fallback is on screen precisely while a lazy scene chunk is being fetched, parsed and executed (`App.vue:90-99`, `scenes.ts:106`).
2. `will-change: background-position` (`:82`) is **inert-to-harmful**: Chromium promotes a layer for `will-change` only on compositable properties (transform/opacity/filter/backdrop-filter). Declaring it on a paint-only property buys no layer and no avoided repaint, while still being a standing hint. It is cost with no purchase.

The built artifact confirms the source ships as written: `will-change:background-position;background-size:220% 100%;animation:1.6s ease-in-out infinite scene-skeleton-sweep-b3f6999c` (`index-CL_QYCiO.css`).

**Falsifier:** a Chromium performance trace over a **cold** scene swap showing no raster/paint work attributable to `.scene-skeleton__sheen`, or showing the sweep running off-main-thread, kills this. `UNPROVEN-NEEDS-LIVE` for the *magnitude*; the mechanism (property is paint-only; `will-change` on paint-only properties promotes nothing) is deterministic from the source.

---

### D-3 · The a11y contract is **inverted** — `aria-busy` suppresses the announcement the docblock claims it produces — **MAJOR**

```
:30  role="status"
:31  aria-busy="true"
:32  :aria-label="label"
:34  <div class="scene-skeleton__plate" aria-hidden="true">
:16  docblock: "is marked `aria-busy` so assistive tech announces the loading state"
```

Three facts compose into "nothing is announced":

1. `role="status"` is an implicit `aria-live="polite"` region. What a live region announces is its **contents**, not its accessible name.
2. The region's only descendant is `aria-hidden="true"` (`:34`). There is no announceable content — the region is empty to AT.
3. WAI-ARIA 1.2 `aria-busy="true"` means *"this element is being modified; assistive technologies may want to wait until the modifications complete before exposing them"*. The node is **unmounted while still `aria-busy="true"`** (the `<Suspense>` fallback branch is destroyed on resolve, `App.vue:90-99`) — busy never clears, so the region never fires even if it had content.

The name on `:32` therefore reaches AT only via an incidental focus/virtual-cursor visit, not via the live-region path the docblock asserts. The house already has the correct idiom in-tree: the sr-only text mirror in `AnimatedText.vue:7-8` (census S-5, `lane-frontend.md:~350`).

This is **not** a regression against the thing it replaced (a bare `<span>Loading scene…</span>`, `:8`, announced nothing either) — it is a *false claim of a cure*, which is worse in a docblock that the U-tranche restructure lane already canonised as "the house a11y contract" (`docs/tranches/U/audit/lane-24-design-restructure-system.md:77-78` cites this component's `role=status` / `aria-busy` as the pattern for others to copy). The defect propagates by citation.

**Falsifier:** an NVDA or VoiceOver session announcing "Loading scene" (or any string) when a **cold** scene swap raises the fallback. `UNPROVEN-NEEDS-LIVE` on the SR observation; the `aria-busy` semantics are spec-derived and the `aria-hidden` emptiness is source-derived.

---

### D-4 · The props contract carries the **wrong prop**: `label` is dead, `stageMode` is missing — **MAJOR**

```
:18-24  withDefaults(defineProps<{ label?: string }>(), { label: "Loading scene" })
App.vue:97   <SceneSkeleton />          ← label NEVER passed, at the only call site
App.vue:199  const stageMode = computed(() => currentScene.value.stageMode)
App.vue:34   :stage-mode="stageMode"    ← handed to EditorShell, 63 lines above
```

The one prop the component exposes is never supplied by its one consumer — dead surface, and (per D-3) vacuous even if supplied. Meanwhile the fact that actually governs what the placeholder should *look* like is computed in the same setup scope and passed to a sibling in the same template, but not here.

`stageMode` is a required, three-valued discriminant on every scene descriptor (`demo/app/scene/scenes.ts:71`), and `EditorShell.vue:153` documents its meaning: `subject` = "a stage behind the sheet" with **no content card**; `editor`/`storyboard` = "keep a content card". The distribution:

```
scenes.ts:132,141,149,157  stageMode: "subject"      ← 5 of 8 (incl. the default at :132)
scenes.ts:165              stageMode: "editor"
scenes.ts:173,185          stageMode: "storyboard"
```

The skeleton paints one fixed silhouette for all three: a centred `min(100%,42rem) × min(100%,24rem)` card (`:52-54`). For the **majority** mode the resolved scene has no card, so the fallback→content swap replaces a card with a bare stage — a silhouette discontinuity at exactly the moment the component exists to smooth. The docblock's "matching the stage geometry" (`:6`) and "echoing a scene's stage panel" (`:50`) are false for 5 of 8 destinations by the descriptor table alone.

**Falsifier:** show that `subject`-mode scenes do in fact render a ~42 × 24 rem card at the same inset as the plate (read the scene roots + `EditorShell` target slot geometry); if they do, the single silhouette is correct and this claim dies.

---

### D-5 · S-6 confirmed and **upgraded**: the sheen is a *copy* of a primitive whose CSS the bundle already pays for — **MAJOR** (census graded it AMBER/"evaluate")

The census (`lane-frontend.md:365-381`) records the shadow and recommends "keep the layout, delegate the plate". Three pieces of evidence the census did not price move this off the discretionary list.

**(a) It is a copy, not a convergent invention.** Put the two side by side:

```
demo   :71-79   linear-gradient(105deg, transparent 0%, transparent 35%,
                  color-mix(in oklab, var(--color-foreground, oklch(0.2 0 0)) 8%, transparent) 50%,
                  transparent 65%, transparent 100%)
glass  glass-ui.css  linear-gradient(105deg, transparent 24%,
                  color-mix(in oklab, var(--foreground) 10%, transparent) 48%, transparent 72%)
```

Same `105deg` sweep angle, same `color-mix(in oklab, <foreground> N%, transparent)` idiom, same reduced-motion kill. `105deg` is a fingerprint — three-stop shimmer gradients are conventionally `90deg`/`120deg`. The demo diverges only in stop positions (8 % vs 10 % ink) and in the animation technique, and the technique it chose is the worse one (D-2).

**(b) The primitive's CSS is already in the shipped bundle.** `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` → `dist/styles/index.css` → `@import "../glass-ui.css"`, which carries the Skeleton rules unconditionally. Verified in the built artifact:

```
grep -c "skeleton-scan"                        index-CL_QYCiO.css → present
grep -o "\.skeleton\[data-v-cd03d0b0\]{[^}]*}" index-CL_QYCiO.css →
  .skeleton[…]{isolation:isolate;border-radius:var(--radius-input);background:var(--muted);…}
  .skeleton[…]{opacity:.18;background:canvastext}      ← forced-colors-safe reduced-motion arm
```

The demo therefore **ships the primitive's stylesheet as dead weight and then ships a second, slower reimplementation of it**. That is not a refactor opportunity; it is duplicated payload plus a downgrade.

**(c) The swap is cheaper than the census assumed.** `Skeleton` has **no subpath**: glass-ui 7.0.0 exposes 73 subpath exports and `./skeleton` is not among them (`./progress`, `./pulse`, `./surface` are), and `dist/components/skeleton/` ships **only** `.d.ts` — no `.js`. The runtime lives in the root barrel: `dist/glass-ui.js` → `… lt as Separator, Te as Skeleton, ut as Slider …`. I expected that to be a cost (the root barrel is the demo's heaviest import shape, 31 hits per `lane-frontend.md:101`) — **it is not**: glass-ui declares `"sideEffects": ["*.css"]` and the barrel is a pure re-export chain over per-chunk modules, so Rollup shakes it. The remediation's only real cost is D-6-shaped token reconciliation.

**Consequential caveat:** glass-ui's `Skeleton` accepts `{ class?: HTMLAttributes["class"] }` and **nothing else** (`dist/components/skeleton/Skeleton.vue.d.ts`) — zero aria surface. The census's "keep the layout, delegate the plate" split is therefore exactly right and must be honoured literally: delegating the whole component would *lose* the (broken-but-present, see D-3) a11y wrapper.

**Falsifier:** show that `Skeleton`'s rendered geometry cannot be composed into the centred stage plate without more demo CSS than the 30 lines it replaces, or show the `.skeleton` rules are *not* in the demo bundle (which would make (b) false and drop this back to AMBER).

---

### D-6 · Radius provenance: a Tailwind default where the design system publishes a semantic token — **MINOR**

`:56` `border-radius: var(--radius-lg, 0.75rem);`

`--radius-lg` is not a glass-ui design decision — it is Tailwind v4's generic scale rung, and glass-ui re-points it. Both declarations land in the shipped bundle:

```
index-CL_QYCiO.css : --radius-lg:.5rem;     (Tailwind default)
index-CL_QYCiO.css : --radius-lg:var(--radius);   (glass-ui)
```

so the plate resolves to `.5rem` or `var(--radius)` depending on cascade order — **never** the `0.75rem` the author wrote as the fallback. The shape that paints is not the shape in the source.

Meanwhile the design system publishes semantic surface radii for exactly this: `--radius-panel: var(--radius-xl)`, `--radius-card: var(--radius-2xl)`, `--radius-field`, `--radius-input` — and glass-ui's own `Skeleton` reads `--radius-input`. A component whose stated job is "echoing a scene's stage panel" (`:50`) should read the panel token, not a generic rung, or the two drift silently the next time the panel radius is retuned.

**Falsifier:** show `--radius-lg` resolves to `0.75rem` in the shipped cascade, or show that no semantic radius token corresponds to the stage panel's actual radius.

---

### D-7 · "**THE** shared loading placeholder" is not shared — one consumer, and siblings still text-flash — **MINOR**

`:5` claims the role of *the* shared placeholder. The tree has exactly one importer (`App.vue:143`), and the sibling async/loading seams do not use it:

- `demo/components/instrument/timeline/components/TimelineHoverPreview.vue:17` — `<div v-if="loading" class="text-muted-foreground text-admin-label">Capturing...</div>`: a bare text node, i.e. **the exact "text-flash" idiom** `:8` says this component retired.
- `demo/components/instrument/transport/index.ts:8-12` — `AnimationControlsGroup`, `TransportDock`, `KfPillTabs` are `defineAsyncComponent`s with no `loadingComponent`; `ChannelControls.vue:252` lazily loads `KeyframesStringControls` likewise. None sit under a `<Suspense>` (the only `<Suspense>` in the demo is `App.vue:90`), so those boundaries render *nothing* while pending.

`scenes.ts:227` documents the deliberate choice for scenes ("the descriptors carry no `loadingComponent`" because the Suspense slot owns it) — that is coherent for scenes and says nothing about the other three async boundaries. The docblock over-claims scope for a component with one call site.

**Falsifier:** a second importer of `App.skeleton.vue` anywhere in `demo/`.

---

### D-8 · No delay / minimum-display guard on the seam — the cured flash may be reintroduced — **MINOR** · `UNPROVEN-NEEDS-LIVE`

`App.vue:90` `<Suspense :key="activeSceneKey" @resolve="onSceneResolved">` carries no `timeout`, and the skeleton carries no `delay` gate of its own. Any suspension raises the plate, including a near-instant one — and the app deliberately pre-warms chunks (`scenes.ts` `warmScene`, exported and used at `App.vue:160`). Curing a text-flash (`:8`) with a shimmer-flash is a smaller defect in prettier clothes, not a cure. The conventional guard is `defineAsyncComponent({ loadingComponent, delay: 150 })` — an idiom this repo's own `DESIGN.md:192` already names.

**Falsifier — and it may well fire:** once `defineAsyncComponent`'s loader has resolved, the wrapper's setup returns synchronously and `<Suspense>` never enters the pending branch, so a warmed swap would paint no fallback at all. Measuring one warmed swap (fallback painted frames = 0) kills this claim. Filed MINOR precisely because the falsifier is live-only and plausible.

---

### D-9 · Zero keyframes.js consumption in the demo of keyframes.js — **INFO** (already ruled; folded, not re-litigated)

The library's flagship demo hand-rolls a raw CSS `@keyframes` (`:85`, census-tabulated at `lane-frontend.md:451`) for its loading motion, consuming none of the engine. The library even ships the machinery to adopt exactly this rule — `src/animation/ingest/cssom.ts` (`fromStyleSheets`, docblock: *"walks `document.styleSheets`, filtering to `CSSKeyframesRule`"*, and flagged **"HEAVY (value.js-bearing)"** at `src/animation/ingest/index.ts:4`) — and **no demo file calls it**:

```
grep -rn "fromStyleSheets\|fromLiveAnimations\|adoptRunning\|resolveLiveKeyframes" demo test/demo → 0 hits
```

I grade this INFO rather than a defect because the house has already ruled the identical sibling case: `docs/tranches/I/audit/recap-deferred.md:270` books the cube `idle-bob` raw `@keyframes` as *"BOOK (demo, inv-ζ cohesion). Not a user defect; a cohesion nit."* And `TypingDots.vue:1-9` (census S-8, `lane-frontend.md:387`) shows where the dogfood line was drawn: the *signature subject* animation is the engine; content-independent chrome is not required to be. A loading placeholder that must animate while the engine's chunk is still loading is the strongest possible case for staying pure CSS.

**Falsifier:** an inv-ζ statement of scope that covers chrome as well as subjects would upgrade this to a defect; the two rulings above say it does not.

---

### Negative finding — **no R1 / value.js exposure here** (stated explicitly, per axis)

The R1 class (`parseCssColor("oklch()")` shipping crash) is **not reachable** from this component:

- zero imports → no static path to `@mkbabb/value.js`;
- the component's `oklch(…)` and `color-mix(…)` literals (`:57-63, :75`) live only in a scoped stylesheet and are resolved by the UA's CSS engine, never handed to a JS parser;
- the one path by which demo-authored CSS *could* enter value.js — the CSSOM ingest walk (`src/animation/ingest/cssom.ts`) — has no demo caller (grep above). Even if it did, this component's `@keyframes` body is `background-position: 140% 0 / -40% 0`: no colour token, no `oklch()`, no `color-mix()`.

Recording the absence rather than silence, because "no exposure" is a load-bearing result on this axis.

---

## SUPERLATIVES (L-18 both ways)

### S★1 · The only class of demo file that survives F-1 — **genuine**

F-1 (`lane-frontend.md:15,54`) is RED: `@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json` while 7.0.0 sits installed, so `npm ci` on a clean checkout leaves 42 demo files unresolvable. `App.skeleton.vue` is one of the 21 `.vue` files with no glass-ui import — it renders, correctly, under a broken install. Its token reads degrade gracefully by construction (every `var()` carries a fallback, `:56, :59, :63, :64, :75`) rather than erroring. Zero imports is *also* the reason it consumes nothing (D-5) — but the resilience is real and should be named, not silently traded away when S-6 lands.

**Falsifier:** any transitive import (including a `@import` inside its style block) — there is none; `<style scoped>` is self-contained.

### S★2 · The reduced-motion arm is **complete**, not decorative — **genuine**

`:95-100` kills **both** the animation *and* the gradient (`animation: none; background: none`). The common failure is `animation: none` alone, which freezes a bright highlight mid-sweep permanently across the plate. This implementation leaves a calm, uniform plate, matching the docblock's stated intent (`:15`) exactly. It is 1 of 13 PRM enforcement sites the census tabulates (`lane-frontend.md:467`) and one of the few that removes the artefact rather than the motion only.

**Falsifier:** show a residual visible highlight under `prefers-reduced-motion: reduce` — `background: none` on the sheen makes that impossible without a second paint source, and there is none. (glass-ui's arm is still *better*: it adds `opacity:.18; background:canvastext`, a forced-colors-safe ground the demo lacks. Worth folding into any S-6 swap.)

### S★3 · Its a11y **scaffolding exceeds the primitive's**, which is why S-6 must not be a wholesale swap — **genuine, with the D-3 caveat**

glass-ui's `Skeleton` exposes `{ class?: HTMLAttributes["class"] }` and nothing else — no role, no `aria-busy`, no label. This component at least reaches for a status role, a busy flag, a name, and `aria-hidden` on the decorative subtree (`:30-34`). The *wiring* is inverted (D-3), but the intent and the shape of the contract are ahead of the design system's, and the U-tranche lane cited it as house pattern (`lane-24-design-restructure-system.md:77-78`). The correct remediation is: fix D-3 here, delegate only the plate, and relay the aria gap **upstream to glass-ui** per the standing BH/BI relay law — the primitive should not be shipping an announcement-less loading affordance.

**Falsifier:** an aria surface in glass-ui's `Skeleton` runtime or CSS — there is none in `Skeleton.vue.d.ts` and none in the `.skeleton[data-v-cd03d0b0]` rules.

---

## Ledger

| id | severity | claim | anchor |
|---|---|---|---|
| D-1 | MAJOR | `--shadow-glass` dead token; plate has no glass elevation, invisible on dark arm | `:64` |
| D-2 | MAJOR | sheen animates paint-only `background-position`; `will-change` inert; primitive uses `transform` | `:80-82, :86-91` |
| D-3 | MAJOR | `aria-busy` on `role=status` suppresses the announcement the docblock claims; region has no content | `:16, :30-34` |
| D-4 | MAJOR | `label` prop dead at the only call site; `stageMode` (5/8 scenes = no card) never plumbed | `:18-24`, `App.vue:34,97,199` |
| D-5 | MAJOR | S-6 upgraded: verbatim-shaped copy of a primitive whose CSS the bundle already ships | `:71-79` |
| D-6 | MINOR | `--radius-lg` is a Tailwind rung, not the semantic panel/card token; authored `.75rem` never paints | `:56` |
| D-7 | MINOR | "THE shared placeholder" has one consumer; siblings still text-flash | `:5`, `TimelineHoverPreview.vue:17` |
| D-8 | MINOR | no delay/min-display guard; flash possibly reintroduced — `UNPROVEN-NEEDS-LIVE` | `App.vue:90` |
| D-9 | INFO | zero engine dogfood; already BOOKed by house ruling — folded, not re-litigated | `:85` |
| — | — | **negative:** R1 / value.js not reachable (no imports, no ingest caller) | — |
| S★1 | — | survives F-1; every `var()` carries a fallback | `:56-75` |
| S★2 | — | PRM arm removes the artefact, not just the motion | `:95-100` |
| S★3 | — | a11y scaffolding ahead of the primitive → relay the gap upstream | `:30-34` |

**Counts:** defects 9 · blockers 0 · superlatives 3.

**No BLOCKER.** Nothing here crashes, breaks the build, or blocks a release: the component renders, degrades gracefully, and its worst faults are a silently-unfunded visual claim (D-1), a wasted frame budget at a bad moment (D-2), an a11y contract that promises what it suppresses (D-3), and a silhouette that mismatches the majority of its destinations (D-4). The one repo-level RED that touches it — F-1 — it is immune to, and any S-6 remediation inherits F-1 as a hard prerequisite (`lane-frontend.md:612`).
