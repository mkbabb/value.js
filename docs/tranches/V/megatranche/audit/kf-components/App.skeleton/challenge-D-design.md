claude-opus-5[1m]

# CHALLENGE · `App.skeleton` (SceneSkeleton) · axis D — DESIGN

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.skeleton.vue` (101 lines; `<script setup lang="ts">` + scoped `<style>`)
**Sole call site:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue:97` — `<SceneSkeleton />` inside the keyed `<Suspense>` `#fallback` at `:90`; imported at `:143`
**Imports:** **none.** Zero `import` statements. Its dependency surface is (a) the CSS custom properties it reads and (b) the layout box its consumer hands it — both read below.
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Every contrast ratio is computed from token declarations on disk; every geometry claim from the clamp expressions on disk.

**Authoritative artifacts.** Two, and the distinction matters (it corrected me twice):
- `keyframes.js/dist/gh-pages/assets/index-CL_QYCiO.css` — a **real built demo bundle** (Jul 16 09:11, post-dating the component's Jul 15 mtime). Settles token-*emission* questions otherwise undecidable from source.
- `keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — glass-ui **7.0.0 as installed**. This, not `/Users/mkbabb/Programming/glass-ui/src`, is what the demo actually consumes. The producer's working tree has moved ahead of it; I cite the installed copy throughout.

**Corpus folded:** `formation/keyframes/lane-frontend.md` — **S-6** (this component, AMBER), **F-1** (glass-ui phantom dependency, RED), **§3.1** (`/skeleton` among the 52 unreached subpaths), **S-8** (the inv-ζ dogfooding seam). U-tranche `lane-32:186` (F3) and `lane-20:182` (F-7) on this file's shell-private status.

**Tally: 17 defects (1 BLOCKER · 6 MAJOR · 8 MINOR · 2 INFO) · 5 superlatives · 3 hypotheses killed before filing.**

---

## 0. What the component claims about itself

The docblock (`:2–17`) makes four falsifiable design promises. All four are tested.

| # | claim | line | verdict |
|---|---|---|---|
| C-1 | "a glass-plate shimmer **matching the stage geometry**" | `:5–6` | **FALSE** — D-5 |
| C-2 | "it honors `prefers-reduced-motion` (**a static dimmed plate**)" | `:15` | **FALSE** — D-1; nothing is dimmed and the only visible element is deleted |
| C-3 | "is marked `aria-busy` **so assistive tech announces** the loading state" | `:16` | **FALSE** — D-2; `aria-busy` is the attribute that *suppresses* the announcement |
| C-4 | "a COMPONENT, not a raw text node" (the T.F8 structural contract) | `:9` | **TRUE** — S-2 |

That is the shape of this challenge: the **structure** is right, the **design** is not, and the docblock asserts that the design is right.

---

## 1. BLOCKER

### D-1 · BLOCKER · the `prefers-reduced-motion` branch erases the only perceptible element, leaving no loading affordance at all

`App.skeleton.vue:94–100`:
```css
@media (prefers-reduced-motion: reduce) {
    .scene-skeleton__sheen {
        animation: none;
        background: none;   /* ← deletes the paint, not just the travel */
    }
}
```

`background: none` removes the sheen's entire gradient, not merely its motion. What remains for a reduced-motion user is `.scene-skeleton__plate` (`:51–65`) alone — no text (the docblock at `:8` records that the `<span>Loading scene…</span>` was deliberately deleted), no pulse, no opacity change, no progress.

**Is the residue perceptible?** Computed from token declarations. The backdrop is the page background: `styles/style.css:216` applies `@apply bg-background text-foreground` to body, `--background: var(--neutral-0)`, and nothing in the stage chain repaints it — `AnimationControlsGroup.css` declares no `background`, and `.scene-host` (`App.vue:358–372`) declares none.

Token values, `glass-ui/dist/styles/tokens/color-radius.css`:

| token | light | dark |
|---|---|---|
| `--neutral-0` → `--background` | `hsl(40 30% 98%)` | `hsl(24 9% 4%)` |
| `--neutral-1` → `--muted` (plate, α .70) | `hsl(38 26% 95%)` | `hsl(28 12% 11%)` |
| `--neutral-4` → `--border` (α .80) | `hsl(32 26% 70%)` | `hsl(30 16% 34%)` |

WCAG relative-luminance contrast, plate composited at α=0.70 over the page and border at α=0.80 (`:57–63`):

| pair | light | dark |
|---|---|---|
| **plate fill vs page** | **1.04 : 1** | **1.12 : 1** |
| **border vs page** | **1.63 : 1** | **2.46 : 1** |

A reduced-motion user is shown a 1.04:1 fill bounded by a 1.63:1 hairline — i.e. a **blank viewport** — for the entire duration of a lazy chunk fetch, parse and evaluate, with no text and no announcement (D-2). The failure mode is indistinguishable from a hung app, which is precisely the perceived-performance regression the component was built to fix (`:8`).

The installed producer solves this correctly and by construction: its `::after` gradient paints **unconditionally** and only the *travel* is gated, inside `@media (prefers-reduced-motion: no-preference)`. A PRM user there still gets a static diagonal band — texture without motion. Here, PRM honesty is implemented as feature deletion, which is the one thing reduced-motion must never mean.

**Falsifier:** a tinted or glass surface painting between `.scene-host` and the page background would raise both ratios — I grepped the stage chain and found none, but I did not render. Dies if 1.63:1 border-only is empirically sufficient to read as "loading". *Exact on-screen ratios are UNPROVEN-NEEDS-LIVE (SS-13); the token-derived computation stands independently.*

---

## 2. MAJOR

### D-2 · MAJOR · `aria-busy="true"` is the attribute that *prevents* the promised announcement — and the region has no content to announce anyway

`:28–33` renders `role="status" aria-busy="true" :aria-label="label"`; `:16` claims this makes AT "announce the loading state."

Three independent mechanisms converge on **silence**:

1. **`aria-busy` inverts the claim.** Per WAI-ARIA, `aria-busy="true"` instructs assistive tech to *defer* exposing changes until it becomes `false`. It is a suppression flag, not an announcement flag.
2. **The live region is empty.** `role="status"` implies `aria-live="polite"`, and live regions announce **content changes** — not their accessible *name*. `aria-label` supplies a name. The region's sole child (`:34`) is `aria-hidden="true"`, so there is no content to announce even if it fired.
3. **`aria-busy` never flips to `false`.** `<Suspense>` resolves by *unmounting* the fallback, so the suppression is never lifted; the deferred update is discarded with the node.

Net: a screen-reader user receives no loading announcement at all. Note the installed producer takes the opposite, coherent position — its `Skeleton` is `aria-hidden="true"` and *strips* caller-supplied `role`/`aria-*`, deliberately pushing announcement to the owner. This component accepted that responsibility and implemented it inertly.

**Falsifier:** a screen-reader transcript announcing "Loading scene" on scene switch. The announcement itself is UNPROVEN-NEEDS-LIVE; the `aria-busy` semantics and the empty-region structure are source-proven regardless.

---

### D-3 · MAJOR · `var(--shadow-glass, …)` references a token that does not exist

`:64` — `box-shadow: var(--shadow-glass, 0 1px 2px rgb(0 0 0 / 0.04));`

`--shadow-glass` is declared **zero** times across the installed `glass-ui/dist`, the producer's `glass-ui/src`, and the demo's seven stylesheets — and is emitted **zero** times in the built bundle. It is a near-miss of a real family: `theme/bridges.css` defines `--shadow-glass-wash`, `--shadow-glass-quiet`, `--shadow-glass-resting`, `--shadow-glass-floating`, `--shadow-glass-overlay` (backed by `--glass-shadow-*` in `tokens/shadow.css`). The author wrote the family **prefix**.

So every render permanently uses the inline `0 1px 2px rgb(0 0 0 / 0.04)` — a 4 %-black hairline that is invisible against the 1.04:1 light plate and *wrong-signed* in dark mode, where the house glass shadows are not plain black. The one component in the demo that calls itself "a glass-plate shimmer" (`:6`) and "a glass surface silhouette" (`:50`) is the one component that never successfully reads a glass token.

**Falsifier:** any runtime-loaded stylesheet declaring `--shadow-glass`. Absent from all of them.

---

### D-4 · MAJOR · the plate does not read as a surface in either theme — 1.04:1 fill, and no edge reaches the 3:1 non-text bar

The ratios computed in D-1 are a defect in their own right, independent of the PRM branch. For a *non*-PRM user the moving sheen supplies a motion cue, so the component is degraded rather than broken — hence MAJOR, not BLOCKER — but the static silhouette still fails WCAG 1.4.11 (3:1 for non-text elements required to understand state) in **both** themes: **1.63:1** light and **2.46:1** dark at the strongest edge.

The sheen itself is the aggravator. `:75` mixes `--foreground` at **8 %**; peak sheen against its own plate computes to **1.08 : 1** (light). The installed producer uses **10 %** over an *opaque* `var(--muted)` plate; this component uses 8 % over a plate already thinned to 70 %, compounding both reductions. Two independent decisions each push the same direction, and nothing pushes back.

**Falsifier:** an intervening tinted surface (see D-1), or an explicit project waiver of non-text contrast for transient loading chrome.

---

### D-5 · MAJOR · "matching the stage geometry" is false — `42rem × 24rem` are magic numbers that appear nowhere else in the tree

`:53–54` sets `width: min(100%, 42rem); height: min(100%, 24rem)`, justified by "matching the stage geometry" (`:5–6`) and "echoing a scene's stage panel" (`:50`).

`grep -rn "42rem\|24rem"` across the entire demo returns **only these two lines** (the one other `24rem`, `layout.css:24`, is an unrelated easing-dropdown max-height). No stage, panel, or scene is 42 × 24 rem.

Meanwhile the demo owns a fully tokenised, explicitly golden-ratio proportion system at `styles/layout.css:43–70` — `--work-area-max-width: clamp(72rem, 94vw, 160rem)`, `--work-area-max-height: clamp(44rem, 88dvh, 120rem)`, `--phi: 1.618`, and a `0.382 : 0.618` (1/φ² : 1−1/φ²) vertical bias — consumed by `AnimationControlsGroup.css:7` and `EditorStartScreen.vue:90,121`. **This component references none of it.** Its aspect (42/24 = 1.75) matches neither the work-area floor (72/44 ≈ 1.64) nor any scene.

Real scenes fill the host — `SquareScene.vue:12` (`grid h-full w-full place-items-center`), `EasingScene.vue:2` (`flex h-full w-full`) — so the skeleton predicts a bounded 1.75 card where an unbounded stage will appear. Worse, the magic number is likely **inert** where it was meant to bind: `.controls-layout` is a rail·stage·rail grid with rails at `clamp(20rem, 26cqi, 30rem)`, so at the 72rem work-area floor the stage cell is narrower than 42rem and `min(100%, 42rem)` collapses to `100%`. The number encodes no verified intent at either end.

**Falsifier:** a scene or stage token measuring 42 × 24 rem, or a design note deriving them. Neither exists. Dies if the plate is *meant* as a deliberately abstract card — in which case C-1 in the docblock is the defect instead.

**Explicitly NOT claimed:** that the skeleton's dead-centering (`:42–44`) conflicts with the φ² bias. That bias positions the *work-area card*; skeleton and resolved scene both centre within that card equally, so there is no swap-time discontinuity. Filing it would have been a false defect.

---

### D-6 · MAJOR · bespoke re-implementation of the glass-ui `Skeleton` whose CSS the demo **already downloads and never uses**

Folds and sharpens **lane-frontend S-6** ("AMBER, 101 lines … keep the layout, delegate the plate"). The census established that `Skeleton` is root-barrel-exported and that `/skeleton` sits among the 52 unreached subpaths. I confirm both, and add the design delta the census did not enumerate.

The demo imports the full glass-ui stylesheet (`styles/style.css:3`), so `.skeleton`'s rules — including its `skeleton-scan` keyframes — are **already in the cascade at runtime, paid for, and dead**. Against the installed 7.0.0, the bespoke copy is strictly weaker on five design seams:

| seam | installed glass-ui `Skeleton` | `App.skeleton.vue` |
|---|---|---|
| motion property | `transform: translate(110%)` — compositable | `background-position` — not (D-8) |
| `@media (forced-colors: active)` | `opacity: .18` + `::after` suppressed | **absent** (D-11) |
| `@media (prefers-reduced-transparency: reduce)` | opaque `var(--muted)` | **absent** (D-12) |
| PRM arm | gates *travel*, keeps the band | deletes the band (D-1) |
| duration | `var(--duration-shimmer, 2.4s)` → 5s token | hardcoded `1.6s` (D-9) |

S-6's recommendation — "keep the layout, delegate the plate" — is correct and I endorse it: the stage composition is legitimately demo-owned; the plate is the primitive. Adopting it discharges D-1, D-3, D-8, D-11, D-12 and most of D-4 in one move.

I do **not** extend this to deleting the component. The `<Suspense>` wrapper (role, layout, padding) is a real demo concern — the same reasoning S-8 used to *keep* `TypingDots`.

**Falsifier:** a `Skeleton` API that cannot express a full-bleed stage plate; or census **F-1** resolving by *removing* glass-ui rather than declaring it, which would invert this finding entirely.

---

### D-7 · MAJOR · no error or timeout state anywhere — a rejected chunk shimmers forever, and `scenes.ts` documents the opposite

`App.vue:90–99` wraps the scene in a bare `<Suspense>` whose `#fallback` is this component. `grep -rn "onErrorCaptured\|errorCaptured\|app.config.errorHandler"` across the **entire demo** returns nothing, and `app/scene/scenes.ts` passes neither `errorComponent` nor `timeout` to `defineAsyncComponent`.

A bare `<Suspense>` does **not** surface async errors; it requires `onErrorCaptured` on an ancestor, and none exists anywhere. A failed dynamic import therefore leaves Vue pinned in `#fallback`: this component shimmers **indefinitely**, `aria-busy="true"` permanently asserted (D-2), with no error affordance, retry, or escalation. Offline, flaky-network, and stale-deploy (hashed chunk 404 after redeploy) all land in this identical silent state.

`scenes.ts:113–114` asserts the opposite — "a rejected warm is swallowed (the real mount surfaces the error via `<Suspense>`)". That is true of the *warm* path and false of the *mount* path it explicitly cites.

**I file this MAJOR rather than INFO** — a prior pass scored it INFO on the reasoning that the boundary is `App.vue`'s to own. I disagree on two grounds: (a) this component is the *rendered terminal state* of the failure, so the state-coverage gap is realised here regardless of who owns the fix; (b) the docblock's own totalising claim, "**THE** shared loading placeholder" (`:5`), asserts a scope that covers exactly one of {loading, error, timeout} and is contradicted by D-15 besides.

**Falsifier:** an `onErrorCaptured` on any ancestor of the `<Suspense>`, a router-level boundary, or a service-worker retry. All absent by grep.

---

## 3. MINOR

### D-8 · MINOR · animating `background-position` is a non-compositable full-surface repaint, and `will-change` cannot help it

`:80–82`. `background-position` is not compositor-accelerated: every frame repaints the whole plate on the main thread. `will-change: background-position` cannot promote it — there is no layer-level fast path to promote it *to* — so the hint costs memory and buys nothing; it is also permanent for the component's lifetime. The installed producer animates `transform: translate(110%)`, which *is* compositable.

Timing sharpens it: this animation runs **only** while a lazy chunk is being fetched, parsed and evaluated — exactly when the main thread is most contended. The loading indicator competes with the load it indicates.

Local corroboration that this repo treats stage-footprint repaint as first-order: `App.vue:361–372` documents T.G1, "THE BLUR DE-LAYER — the perf keystone", measuring continuous stage paint against glass `backdrop-filter` re-rasterisation as "VERDICT #19 root cause #1".

**Falsifier:** that same T.G1 contract composites the scene-host *outside* any `backdrop-filter` ancestor, so the chrome-blur coupling is likely spared — I do not claim it. What survives is the per-frame main-thread paint of the plate. A profile showing negligible cost drops this to INFO.

---

### D-9 · MINOR · hardcoded `1.6s`, and `@keyframes scene-skeleton-sweep` re-derives a `@keyframes` already loaded in the same cascade

**Duration.** `:81` hardcodes `1.6s`. The tokens exist (`tokens/scheme-motion.css`): `--duration-shimmer: 5s`, `--duration-shimmer-fast: 3s`. The installed DS skeleton reads `var(--duration-shimmer, 2.4s)` → **5s**. This component runs ~3× faster than the house skeleton clock, untokenised, so a system-wide tempo change (the `.motion-calm` scheme in the same file) cannot reach it, and the two skeleton idioms visibly disagree wherever both appear.

**Duplication.** `dist/styles/animations.css` — loaded via `style.css:3` — already ships `@keyframes shimmer` and `@keyframes shimmer-sweep`, both driving `background-position` on the same axis. `scene-skeleton-sweep` (`:85–92`) is the same idiom on the same property in the same direction, redefined locally with different constants.

**Falsifier:** show that `140% → -40%` at `background-size: 220%` reaches a sweep geometry the shipped `shimmer` cannot, by adjusting `background-size` alone. It can — the two parameters are interchangeable.

*Not claimed:* the `ease-in-out` + `infinite` seam discontinuity. The producer does the same; that is house idiom, not a defect of this file.

---

### D-10 · MINOR · the `--color-*` triplet is a 1-of-1 deviation across the whole demo — a live tripwire, though not currently tripped

`:59, :63, :75` read `var(--color-muted)` / `var(--color-border)` / `var(--color-foreground)`. Across the demo, the raw `var(--muted)` / `var(--foreground)` / `var(--border)` appear at **22** `.vue` sites; the `--color-*` form for those three appears in **exactly one file — this one**. The producer's own components never use it.

`--color-*` is the *Tailwind utility* namespace (`bg-muted`, `border-border`), bridged in `theme/bridges.css` via `@theme **inline**`; the theme layer proper is `--muted` / `--border` / `--foreground`. It resolves today only because the bridge happens to be emitted (see §5, KILLED-1). It is one `@theme inline` emission change away from silently falling through to the hardcoded **light-mode** literals at `:59, :63, :75` — theme-blindness in dark mode. Not a bug today; a tripwire with a light trigger.

**Falsifier:** a project convention endorsing the bridge form in hand-authored CSS. The 22:1 ratio and the producer's own practice both say otherwise.

---

### D-11 · MINOR · no `forced-colors` branch

No `@media (forced-colors: active)` exists in `:40–101`. In forced-colors mode the plate's `color-mix` fill is overridden to the forced canvas, collapsing the silhouette to the border alone, while the sheen's gradient is not reliably suppressed. The installed producer handles both halves (`opacity: .18` on the tile, `::after` suppressed) — establishing this as the house standard rather than my invention.

**Falsifier:** exact forced-colors rendering is UNPROVEN-NEEDS-LIVE (SS-13). The *absence of the branch* and the divergence from the producer's own skeleton contract are source-proven.

---

### D-12 · MINOR · no `prefers-reduced-transparency` branch

The plate is deliberately translucent at both `:57–61` and `:62–63` (two `color-mix(…, transparent)` calls). A user requesting reduced transparency gets none. The installed producer ships `@media (prefers-reduced-transparency: reduce) { .skeleton { background: var(--muted); } }`. Note the fixes coincide: honouring this would *also* lift the plate to an opaque `--muted`, materially improving D-4.

**Falsifier:** a global reduced-transparency handler in `styles/` — none across the demo's seven stylesheets.

---

### D-13 · MINOR · the `--radius-lg` fallback is dead code encoding the wrong value

`:56` — `border-radius: var(--radius-lg, 0.75rem)`. The token **does** resolve, so `0.75rem` never applies — but it is not what resolves either. The built bundle emits `--radius-lg` **twice**: `var(--radius)` (glass-ui `theme/radius.css`, `--radius: 0.625rem`) and `.5rem` (Tailwind v4's default theme). The real corner is therefore **0.625rem or 0.5rem** by cascade order — never the declared 0.75rem. The fallback documents an intent the component does not have and implies a verification that did not occur. (The value it wanted is available as `--radius-xl` / `--radius-strip`.) Separately, `--radius-lg` is the *control* rung; a stage-panel silhouette wants `--radius-panel` or `--radius-card`.

**Falsifier:** cascade ordering resolving to something else again — either way, not 0.75rem.

---

### D-14 · MINOR · the `label` prop is dead API

`:18–24` declares `label?: string` defaulting to `"Loading scene"`. The sole call site (`App.vue:97`) passes nothing, so the default is the only value ever used — and per D-2 the attribute it feeds never participates in an announcement. The prop, its JSDoc (`:20`), its default (`:23`) and its binding (`:32`) serve zero callers and produce zero audible output. Doubly dead, and the `feedback_kiss_no_contrivance` shape.

**Falsifier:** a second `<SceneSkeleton>` mount. `grep -rn "SceneSkeleton" demo/` returns exactly three lines: docblock, import, mount.

---

### D-15 · MINOR · the docblock carries a false superlative, a stale tier, and five unresolvable references

Sixteen lines (`:2–17`) — ~16 % of the file — that misstate the tree:

- **`:5` "THE shared loading placeholder"** — false. One consumer. U-tranche `lane-32:186` (F3, MAJOR) and `lane-20:182` (F-7) both ruled it *shell-private*, and U.B9 re-homed it here accordingly. The prose survived the move that refuted it.
- **`:3` "the skeletons tier"** — stale. That tier was deleted by the same re-homing (`U.B.md:139`); the file now lives at `app/App.skeleton.vue`. It names a directory that no longer exists.
- **`:3, :8, :12` — "T.F8", "lane 13 rec 8", "VERDICT #19", "T.M2", "T.D"** — five references unresolvable from inside keyframes.js.
- **Register** — "THE shared…", "It REPLACES…", "a COMPONENT, not a raw text node" (`:9`): shouting caps litigating a decision no reader is contesting. The one genuinely load-bearing sentence (`:11–13`, structural contract vs appearance disposition) is buried under it.

**Falsifier:** a docs convention mandating tranche-id provenance headers in demo SFCs. Even granting that, "shared" and "the skeletons tier" are factually dead against the current tree.

---

## 4. INFO

### D-16 · INFO · hand-rolled CSS motion in the repo whose thesis is that its animation *is* the library

`lane-frontend.md` **S-8** records the inv-ζ seam — "the demo's signature animation IS the library, not pure CSS" (`TypingDots.vue:1–9`) — and counts 68 engine-consuming files. This component's motion is a plain CSS `@keyframes`. **The docblock pre-empts the objection** (`:14`, "content-independent chrome") and I accept the defence: a `<Suspense>` fallback must paint *before* the lazy chunk resolves, and keeping it dependency-free is a defensible boot-cost argument. Recorded as an inv-ζ inconsistency **with a stated justification**, not as a defect. Ruling request, not a claim.

### D-17 · INFO · physical-direction only — but the tree has no RTL surface, so this conforms

`padding` (`:47`), `linear-gradient(105deg, …)` (`:72`) and the `140% → -40%` sweep are all physical. In RTL the shimmer would sweep against the reading direction. **Not filed as a defect:** `grep -rn 'dir="rtl"\|\[dir=' demo/` returns nothing — the demo has zero RTL surface, and the installed producer's skeleton is equally LTR-hardcoded. The component is consistent with both its tree and the design system. Recorded so a future RTL wave has the site.

---

## 5. Hypotheses killed before filing

**KILLED-1 — "the `--color-*` triplet is never emitted, so all three `color-mix()` calls fall back to hardcoded light literals and the component is theme-blind."** This was my expected headline. `--color-muted` is declared **nowhere** in `glass-ui.css`, nor in Tailwind v4's default theme, and the producer's own `Skeleton` reads the unprefixed `var(--muted)` — three converging signals. **But** `theme/bridges.css` carries `@theme inline { --color-muted: var(--muted); … }`, and the built bundle **emits all three** (`--color-muted:var(--muted);`). The chain terminates at `--neutral-1: light-dark(hsl(38 26% 95%), hsl(28 12% 11%))` — genuinely theme-aware. **No dark-mode bug exists.** Residue survives only as the D-10 tripwire. I record this because the same near-miss reasoning yields a confident, wrong BLOCKER.

**KILLED-2 — "`height: 100%` on `.scene-skeleton` (`:46`) has no definite containing block, so `min(100%, 24rem)` resolves to `auto` and the plate collapses to zero height."** The chain is definite: `.controls-layout` sets `height: min(100dvh, var(--work-area-max-height))` (`AnimationControlsGroup.css:8`), and `.scene-host` carries `h-full` (`App.vue:86`). Tailwind preflight's global `border-box` also means the `clamp()` padding at `:47` cannot overflow. No collapse.

**KILLED-3 — "hand-rolling a skeleton violates the glass-ui import boundary."** It does not: `lane-frontend.md` **F-6** records zero local `ui/` copies and zero direct `reka-ui` imports — the boundary is clean. Re-implementing a primitive is a *reuse* defect (D-6), not a boundary breach. Filing it as a boundary violation would have misdiagnosed the fix.

---

## 6. Superlatives (L-18, running the other way)

### S-1 · the PRM branch exists at all, and is written correctly as a gate
`:94–100`. Most hand-rolled skeletons ship an infinite shimmer with no PRM arm whatsoever. The instinct is right and the gate is mechanically sound — later rule, equal specificity, deterministic win. D-1 faults the *execution* (`background: none` overshoots into deletion), not the impulse, which was applied unprompted.

### S-2 · the T.F8 structural contract is met exactly
C-4 is the one self-claim that holds. The fallback is a real component with a real box, not a bare text node; `App.vue:96–98` wires it at the `#fallback` slot with no wrapping `<Transition>` or `<KeepAlive>` — respecting the hard-won constraint documented at `App.vue:74–83`. The structural half of this component is correct and was correct on arrival.

### S-3 · the sweep geometry is arithmetically correct
Verified rather than assumed. With `background-size: 220% 100%` (`:80`) and position running `140% → -40%` (`:85–92`), the percentage-positioning identity `offset = P × (W − 2.2W)` places the highlight centre (50 % of a 2.2 W image = 1.1 W) at **−0.58 W** at start and **+1.58 W** at end — a complete traverse with clean off-screen entry and exit. No dead frames, no mid-plate pop. The dimensions at `:53–54` are unmoored (D-5); these constants are not.

### S-4 · `overflow: hidden` is load-bearing — and I contradict a prior pass that called it inert
`:55`. A prior audit filed this as an inert declaration on the reasoning that the sheen is `inset: 0` and "backgrounds are clipped to the padding box regardless." That conflates two boxes. The sheen is a **separate element** (`:35`, `:68–70`) with its own background; a parent's `border-radius` (`:56`) does **not** clip a descendant's paint unless `overflow` is other than `visible`. Without `overflow: hidden` the sheen's square gradient would paint over all four rounded corners of the plate. The declaration is correct, necessary, and stays correct after a transform-based fix (D-8) lands.

### S-5 · breakpoint-free fluid padding, and zero contribution to the flat `--kf-*` namespace hazard
`:47` uses `clamp(1rem, 4vw, 3rem)` — continuous response with no media query, the right idiom for chrome that must look deliberate at every stage width. And the component declares **zero** custom properties of its own: for a demo whose namespace hazard is a flat, ever-growing `--kf-*` surface, adding a component that consumes tokens and contributes none is the correct citizenship, even where the specific tokens it reaches for are wrong (D-3, D-10, D-13).

---

## 7. Disposition

The structure is sound and the intent is consistently better than the execution. One BLOCKER (D-1) makes the component invisible to reduced-motion users; D-4 makes it near-invisible to everyone; D-2 makes it silent to screen readers. All three are the *same* defect wearing three coats: **the component was never verified against a rendered surface, only against a specification.** D-3 (a token that does not exist), D-13 (a fallback that never applies and is wrong anyway) and D-5 (dimensions found nowhere else in the tree) are the fingerprints of that.

**Cheapest high-yield move:** adopt the installed glass-ui `Skeleton` for the plate per S-6 — its CSS is already downloaded and dead in the cascade (D-6) — discharging D-1, D-3, D-8, D-11, D-12 and most of D-4 at once. That leaves the genuinely demo-owned residue: the wrapper's a11y (D-2), the error arm (D-7), and the geometry (D-5).

**Sequencing constraint:** gated on census **F-1** — glass-ui is currently a *phantom* dependency (absent from both `package.json` and `package-lock.json` while 7.0.0 sits installed). Any new glass-ui import deepens an undeclared coupling that `npm ci` cannot reconstruct. **Declare the dependency first**, then delegate the plate.
