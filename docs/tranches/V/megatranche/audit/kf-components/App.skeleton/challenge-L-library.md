claude-opus-5[1m]

# CHALLENGE — `App.skeleton` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.skeleton.vue` (101 lines: 25 script / 76 style)
**Sole consumer** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue:97` (`<SceneSkeleton />`, import at `:143`)
**Read whole, plus every import-adjacent file**: `App.vue`, `main.ts`, `demo/kf-engine.ts`, `demo/app/scene/scenes.ts`, `demo/styles/style.css`, `demo/styles/layout.css`, `demo/styles/design-idioms.css`, `demo/components/instrument/shell/TypingDots.vue`, `demo/components/instrument/timeline/components/TimelineHoverPreview.vue`, `scripts/build/vite/critical-css.ts`, and the installed `node_modules/@mkbabb/glass-ui@7.0.0` dist (read-only evidence).

The component imports **nothing** — no Vue runtime API beyond the compiler macros, no glass-ui module, no keyframes.js symbol. Its entire dependency surface is (a) five CSS custom properties and (b) the Vue SFC compiler. That is what makes it interesting on this axis: it *looks* self-contained and is not.

**Tally — defects 10 (0 BLOCKER / 3 MAJOR / 7 MINOR), superlatives 4, retracted candidates 1.**

Every claim below carries a falsifier. One candidate defect was killed by its own falsifier and is recorded as retracted (§R) rather than dropped, because a false defect is worse than a missed one.

---

## 0. The decisive probe

The component is a hand-copy of a primitive that is **already installed on disk**. `@mkbabb/glass-ui@7.0.0` ships `Skeleton`, and its compiled stylesheet is:

```css
/* node_modules/@mkbabb/glass-ui/dist/glass-ui.css  (minified; locator = the `.skeleton[data-v-cd03d0b0]` selector) */
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{content:"";background:linear-gradient(105deg, transparent 24%, color-mix(in oklab, var(--foreground) 10%, transparent) 48%, transparent 72%);position:absolute;inset:0}
@media (prefers-reduced-motion:no-preference){.skeleton[data-v-cd03d0b0]:after{animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) ease-in-out infinite;will-change:transform;transform:translate(-110%)}}
@keyframes skeleton-scan-cd03d0b0{to{transform:translate(110%)}}
@media (prefers-reduced-transparency:reduce){.skeleton[data-v-cd03d0b0]{background:var(--muted)}}
@media (forced-colors:active){.skeleton[data-v-cd03d0b0]{opacity:.18;background:canvastext}.skeleton[data-v-cd03d0b0]:after{display:none}}
```

Against `App.skeleton.vue:51–99`:

| | `App.skeleton.vue` | glass-ui `.skeleton` |
|---|---|---|
| plate | `position:relative; overflow:hidden` (`:52,:55`) | `position:relative; overflow:hidden` |
| sheen | absolutely-positioned child, `inset:0` (`:69–70`) | `:after`, `position:absolute; inset:0` |
| gradient angle | **`105deg`** (`:72`) | **`105deg`** |
| highlight color | `color-mix(in oklab, var(--color-foreground) 8%, transparent)` (`:75`) | `color-mix(in oklab, var(--foreground) 10%, transparent)` |
| animated property | `background-position` (paint) (`:81,:85–92`) | `transform` (compositable) |
| `will-change` | `background-position` (`:82`) | `transform` |
| PRM polarity | animate always, override on `reduce` (`:81,:95`) | animate only under `no-preference` |
| duration | hardcoded `1.6s` (`:81`) | `var(--duration-shimmer, 2.4s)` |
| isolation | — | `isolation: isolate` |
| forced-colors | — | explicit arm |
| reduced-transparency | — | explicit arm |

`105deg` + `color-mix(in oklab, <foreground-token> N%, transparent)` is not convergent evolution. This is the primitive, retyped, minus five of its arms. It hardens lane-frontend **S-6** (`lane-frontend.md:365`) from AMBER to a byte-level match, and it is the spine of L-2/L-4/L-5/L-10 below.

---

## 1. DEFECTS

### L-1 — MAJOR — the announced a11y contract is not deliverable, and it is the designated *house spec*

**Where** `App.skeleton.vue:14–16` (docblock), `:30–34` (markup).

The docblock asserts the component "is marked `aria-busy` so assistive tech announces the loading state" (`:16`). The markup cannot do that, for two independent reasons:

1. **`aria-busy="true"` suppresses, it does not announce.** ARIA's definition of `aria-busy` is that assistive technologies *wait* for the modification to complete before exposing it; on a live region the announcement is deferred until `aria-busy` flips to `false`. This element's `aria-busy` is a **static string literal** (`:31`) — it is never `false`, and the node is destroyed when `<Suspense>` resolves (`App.vue:90–99`). The gate never opens.
2. **The live region has no content to announce.** `role="status"` (`:30`) is a live region; live regions announce *content changes*, not the accessible name. The only child is `aria-hidden="true"` (`:34`), and its only descendant is an empty `<span>` (`:35`). The region's accessible content is the empty string for its entire lifetime. `aria-label` (`:32`) names the region for a user who navigates to it; it is not the live announcement.

`aria-busy` also belongs on the element **being modified** — here that is `.scene-host` (`App.vue:84–89`), the container whose children swap — not on the transient placeholder inside it.

**Why MAJOR and not MINOR** — this is not one component's private mistake. Two independent U-tranche authorities pin *these exact three attributes* as the mandatory pattern every future skeleton must copy:

- `keyframes.js/docs/tranches/U/waves/U.G.md:253–254` — "a11y per the SceneSkeleton contract (role=status, aria-busy, PRM static plate — SceneSkeleton.vue:28–99, **the house skeleton spec**)"
- `keyframes.js/docs/tranches/U/audit/lane-24-design-restructure-system.md:77–79` — "The skeleton inherits SceneSkeleton's **already-correct** a11y contract (role=status, aria-busy, prefers-reduced-motion static plate)"

U-24.2 mandates a `<Name>.skeleton.vue` per lazily-delivered module (`lane-24:416`). Every one of them is instructed to reproduce a live region that structurally cannot speak. A defect designated as a spec is a defect with a fan-out.

**Falsifier** — an NVDA / JAWS / VoiceOver speech capture that announces "Loading scene" (or any string) on `<Suspense>` fallback mount for this component, **or** normative ARIA text establishing that `aria-busy="true"` does not gate live-region announcement. Either kills it. (The spec half is source-derived and needs no browser; the capture half is `UNPROVEN-NEEDS-LIVE` and belongs to SS-13.)

**Smallest cure** — put the string inside the region (`<span class="sr-only">{{ label }}</span>`) and either drop `aria-busy` or hoist it onto `.scene-host` in `App.vue` where the swap actually happens.

---

### L-2 — MAJOR — verbatim duplication of an installed primitive, reimplemented worse on five axes

**Where** `App.skeleton.vue:51–99` vs `node_modules/@mkbabb/glass-ui/dist/glass-ui.css` `.skeleton[data-v-cd03d0b0]` (§0 table).

Not a "similar idea" — the same gradient angle, the same oklab `color-mix` over the foreground token, the same `overflow:hidden` plate with an absolutely-positioned `inset:0` sheen. The local copy drops: compositable animation, motion-opt-in polarity, `isolation`, the `forced-colors` arm, the `prefers-reduced-transparency` arm, and the `--duration-shimmer` token.

**This confirms lane-frontend S-6 and sharpens its recommendation.** S-6 (`lane-frontend.md:365–381`) says "keep the layout, delegate the plate." Two facts from the installed tree qualify that:

- **The delegation drops the a11y attributes.** glass-ui's `Skeleton` explicitly strips them from fallthrough: `.filter(([e]) => e !== "role" && !e.startsWith("aria-"))` (compiled in `dist/data-table-CAfBfNkn.js`), and renders `<div data-slot="skeleton" aria-hidden="true">`. It is a *decorative* primitive by construction. Delegating the plate is safe **only** because the plate is already `aria-hidden` here — but a careless swap of the whole component silently deletes `role="status"`.
- **`Skeleton` has no subpath and its runtime rides the data-table chunk.** 73 export subpaths exist; none is `./skeleton` (only `./data-table`). The compiled component sits in `dist/data-table-CAfBfNkn.js` (20 037 bytes) alongside `DataTablePagination`. Whether a consumer bundler shakes `Skeleton` free of the DataTable family is `UNPROVEN` (not measured; no build run under lane law).

**Therefore the honest remediation is not "swap"** — it is **port the five missing arms into the local plate** (L-4, L-5, L-10 below are exactly those arms), or ship the swap only after measuring the chunk cost. The stage-geometry composition genuinely is demo-owned, as S-6 says.

**Falsifier** — show that `105deg` + `color-mix(in oklab, var(--*foreground) N%, transparent)` + `overflow:hidden`-plate-plus-`inset:0`-sheen is a generic web idiom that many independent skeletons share (making the match coincidental), **or** show a git history in which `App.skeleton.vue` predates glass-ui's `Skeleton` and glass copied *it*. Either would recast this as convergence rather than duplication. (History note: the only commit touching this path is `969990f6`, a rename/re-home, so the file's authorship predates the current tree — I did not resolve the ordering.)

---

### L-3 — MAJOR — glass-token dependency that is invisible to an import-graph audit (the F-1 bite), plus one token that resolves from nowhere

**Where** `App.skeleton.vue:56, 59, 63, 64, 75`.

The component reads five custom properties. Where each actually resolves (probed against the installed tree and `demo/styles/`):

| line | reference | resolves from | if absent |
|---|---|---|---|
| `:56` | `var(--radius-lg, 0.75rem)` | glass-ui `dist/styles/components.css` `:root{… --radius-lg: 0.5rem …}` | falls back to **`0.75rem` — 50 % larger than the real token** |
| `:59` | `var(--color-muted, oklch(0.96 0 0))` | glass-ui `dist/styles/theme/bridges.css` → `var(--muted)` (`dist/styles/tokens/color-radius.css`) | light-only literal |
| `:63` | `var(--color-border, oklch(0.9 0 0))` | glass-ui `theme/bridges.css` → `var(--border)` | light-only literal |
| `:64` | `var(--shadow-glass, 0 1px 2px rgb(0 0 0 / 0.04))` | **NOTHING** | always the literal |
| `:75` | `var(--color-foreground, oklch(0.2 0 0))` | glass-ui `theme/bridges.css` → `var(--foreground)` | light-only literal |

Three findings ride here:

1. **`--shadow-glass` does not exist.** Repo-wide probe over `demo/**` and `node_modules/@mkbabb/glass-ui/dist/**` for `--shadow-glass` followed by a non-`-`/non-alpha character returns exactly **one** hit: the consumption site itself (`App.skeleton.vue:64`). glass-ui ships `--shadow-glass-resting`, `-floating`, `-overlay`, `-quiet`, `-wash` — the bare name is not among them. The declaration is a permanently dead token reference; the comment's "glass surface silhouette" (`:50`) is delivered by a hardcoded `0 1px 2px rgb(0 0 0 / 0.04)` that no design-system retheme can ever reach.
2. **`--radius-lg`'s fallback contradicts the token it shadows** (`0.75rem` written, `0.5rem` real). A fallback whose value disagrees with the live token is worse than no fallback: it makes the degraded state silently *different* rather than obviously broken.
3. **This is where lane-frontend F-1 bites a file that F-1's own method cannot see.** F-1 (`lane-frontend.md:15, 54–70`) establishes `@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json` — I re-verified: `keyframes.js/package.json` has `dependencies: {"@mkbabb/value.js":"4.0.0"}` and **zero** glass entries in `devDependencies`. The census's blast-radius method is import-based ("42 demo files import from `@mkbabb/glass-ui`", "21 `.vue` with no glass-ui import" — `lane-frontend.md:78–84`). `App.skeleton.vue` is one of those 21. It has no glass import and is nevertheless **4/5 glass-token-dependent**; nothing in `demo/styles/*.css` defines `--color-muted`, `--color-border`, `--color-foreground`, or `--radius-lg`. So the real F-1 blast radius is strictly larger than the import census reports, and this file is a witness.

**Contradiction of the corpus, stated explicitly:** `lane-frontend.md` §3 measures glass coupling by import lines. That undercounts. A cascade-level probe (custom-property reads with no demo-local definition) is the honest second half of that census.

**Falsifier** — a definition of `--shadow-glass` (exact name) anywhere in the loaded cascade, or a demo-local definition of `--color-muted` / `--color-border` / `--color-foreground` / `--radius-lg`. Any one of those kills the corresponding row. For the `--radius-lg` mismatch: a glass-ui build where `--radius-lg` is `0.75rem`.

*Checked and NOT claimed:* I tested whether `scripts/build/vite/critical-css.ts:25–60` (which defers the entire main stylesheet via `media="print" onload`) exposes the light-only fallbacks during the deferred window. It does **not** — the component's own scoped rules live in the same deferred `index-*.css` as the glass tokens, so both arrive atomically. No claim made.

---

### L-4 — MINOR — `will-change: background-position` is a no-op hint, and it is never cleared

**Where** `App.skeleton.vue:82`; PRM arm `:95–100`.

`will-change` earns its cost by pre-promoting an element for a property the compositor can actually run: `transform`, `opacity`, `filter`, `backdrop-filter`. `background-position` is neither compositable nor stacking-context-creating, so `will-change: background-position` allocates bookkeeping and buys nothing — the sweep still repaints on the main thread every frame. The primitive this file copies gets it right: `will-change: transform` alongside a `transform`-driven scan (§0).

Second half: the PRM arm (`:96–99`) resets `animation` and `background` but leaves `will-change` declared, so a reduced-motion user carries a permanent hint for a property that never changes.

**Falsifier** — a shipping engine that promotes or composites on `will-change: background-position` (a DevTools *Layers* panel showing a dedicated compositing layer attributed to that hint, or an *Animations* panel entry marking the `background-position` animation as compositor-run). Either kills it.

---

### L-5 — MINOR — PRM polarity is motion-by-default; the primitive it copies is motion-opt-in

**Where** `App.skeleton.vue:81` (unconditional `animation`) + `:95–100` (`@media (prefers-reduced-motion: reduce)` override).

glass-ui gates the same animation the other way — `@media (prefers-reduced-motion: no-preference) { … animation … }`. The difference is the failure mode: with an opt-in gate, any environment that cannot evaluate the query (no media-query support for the feature, a stripped/partial cascade, a print or capture context) gets **no motion**; with a `reduce` override, the same environment gets **motion**. For an accessibility accommodation the safe default is the accommodating one.

This is small, and it is *not* free of a counter-argument: `reduce`-override is the more common idiom in the wild and is correct in every browser that supports the query (all current ones). I file it because the file directly duplicates a primitive that chose the safer polarity, so the divergence is a regression relative to its own source.

**Falsifier** — evidence that the `reduce`-override form and the `no-preference`-gate form are equivalent in every environment the demo targets (i.e. no target can render the sheet but not evaluate `prefers-reduced-motion`). That would reduce this to pure style.

---

### L-6 — MINOR — inv-ζ: a raw CSS `@keyframes` in the demo that *is* the engine's dogfood surface, with the usual defense already dead

**Where** `App.skeleton.vue:81, 85–92, 95–100`.

The house idiom is stated at `demo/components/instrument/shell/TypingDots.vue:1–13, 23–28, 86–96`:

> "a dedicated substrate that CAN stagger: N explicit dot `<span>`s, each driven by its OWN engine animation — **the inv-ζ seam (the demo's signature animation IS the library, not pure CSS)**"

and `TypingDots.vue:83–85` records the exact second half this file re-hand-rolls:

> "`respectReducedMotion` routes the PRM resting frame through the shared `withReducedMotion` authority (**replacing the old hand-mirrored `@media` block**)."

`App.skeleton.vue` is a hand-rolled CSS `@keyframes` plus a hand-mirrored `@media (prefers-reduced-motion)` block — both of the things TypingDots retired.

**The natural defense is that the engine isn't resident while a chunk is loading. The tree kills it.** `demo/app/main.ts:50–54` does `void Promise.all([warmKfEngine()…, fontsDecoded]).finally(() => app.mount("#app"))` — the heavy engine surface is fully resolved **before `app.mount()`**, and `demo/kf-engine.ts:45–57` throws if read earlier. Any `<Suspense>` fallback paints strictly after mount, so `CSSKeyframesAnimation` (with `iterationCount:"infinite"`, `respectReducedMotion:true` — the exact TypingDots recipe) is in hand every time this component renders.

**Why MINOR, not MAJOR** — there is standing precedent for booking exactly this shape as a cohesion nit rather than a defect: `keyframes.js/docs/tranches/I/audit/recap-deferred.md:270` books the cube `idle-bob` raw `@keyframes` as "**BOOK** (demo, inv-ζ cohesion). Not a user defect; a cohesion nit." I hold the same severity for consistency. Note also the honest counter-pressure: an engine-driven sheen would mean a JS-driven animation on the *loading* path, and the docblock's "content-independent chrome" (`:14`) is a reasonable, if unstated-as-such, carve-out.

**Falsifier** — a written inv-ζ carve-out for loading/placeholder chrome anywhere in `keyframes.js/docs/` (I searched `inv-ζ`/`inv-zeta` across `demo/` and `docs/` and found the discipline stated but no chrome exemption), **or** evidence that `warmKfEngine()` can be unresolved at the time a `<Suspense>` fallback first paints.

---

### L-7 — MINOR — dead parameterization: the only prop is never passed and could not be heard if it were

**Where** `App.skeleton.vue:18–24` (the `label` prop + default), `:32` (its only use), `App.vue:97` (`<SceneSkeleton />`, no attributes).

One consumer, zero call sites pass `label`. The default `"Loading scene"` is the only value the component has ever rendered. And per L-1 the attribute it lands on is on a live region that never announces, so the parameter is dead in both directions — no producer, and a consumer (AT) that can't read it.

I verified the macro form itself is **fine** — compiling the SFC with `@vue/compiler-sfc` (`compileScript(..., {inlineTemplate:true})`) emits `props:{ label:{type:String, required:false, default:"Loading scene"} }` and binds `"aria-label": __props.label`, so leaving `withDefaults(...)` unassigned (`:18`) is correct Vue and **not** a defect. Only the deadness is.

**Falsifier** — any call site passing `label`, in this repo or a planned per-module skeleton (U-24.2's `<Name>.skeleton.vue` roster would supply one; today none exists).

---

### L-8 — MINOR — three docblock claims the tree falsifies, one of them self-contradicted

**Where** `App.skeleton.vue:5, 12–15, 94`.

1. **"THE *shared* loading placeholder"** (`:5`) — it is shell-private with exactly one consumer. This is settled corpus, not opinion: lane-20 F-7 ("consumed **only** by `app/App.vue`", `lane-20-demo-app-shared-tier.md:182–191`) and lane-32 F3 ("a single-member shared tier that is actually shell-private", `lane-32-target-tree-synthesis-scout.md:186–191`). The re-home has since landed (see P-2); the word "shared" is the residue of the tier that was deleted.
2. **"matching the stage geometry"** (`:5`) — the plate is `min(100%, 42rem) × min(100%, 24rem)` (`:53–54`). The stage it stands in is sized by `demo/styles/layout.css:49–51`: `--work-area-max-width: clamp(72rem, 94vw, 160rem)`, `--work-area-max-height: clamp(44rem, 88dvh, 120rem)`. The plate's ceiling is **below the stage's floor on both axes** (42rem < 72rem; 24rem < 44rem), so on any desktop viewport the placeholder is strictly smaller than the content it stands in for, guaranteeing a size jump at resolve. The tokens the component would need are already declared and available; it hardcodes instead.
3. **"a static *dimmed* plate for reduced-motion users"** (`:15`, echoed at `:94` "a calm, static dimmed plate") — the PRM arm (`:96–99`) touches only `.scene-skeleton__sheen`; it sets `animation:none; background:none`. The plate's own background, border, and shadow are untouched. Nothing dims; the sheen simply vanishes.

Claim 2 is also **self-contradicted inside the same docblock**: `:12–13` concedes "the VISUAL treatment (shimmer feel, **shape fidelity**) is an appearance disposition deferred to T.M2 / T.D's glass language." The deferral is honest and I credit it — but it means `:5` should not assert the match as a present-tense fact.

**Falsifier** — a second consumer (kills 1); a stage whose rendered box is ≤ 42rem × 24rem on the demo's target viewports, or a token binding I missed (kills 2); a rule that dims the plate under `prefers-reduced-motion` (kills 3).

---

### L-9 — MINOR — the bare-text loading node the docblock claims to have retired is still live elsewhere in the same demo

**Where** `App.skeleton.vue:7–9` vs `demo/components/instrument/timeline/components/TimelineHoverPreview.vue:21`.

The docblock: "It REPLACES the bare `<span>Loading scene…</span>` text-flash (VERDICT #19 perceived-perf sibling) — **a COMPONENT, not a raw text node**." T.F8's structural clause is "fallback ≠ bare text" (`:11`).

In the same tree:

```vue
<div v-if="loading" class="text-muted-foreground text-admin-label">
    Capturing...
</div>
```

A raw text loading node, unstyled by any skeleton, with no `role`/`aria-live` of any kind. The T.F8 contract holds at exactly one site. This is scope-adjacent rather than a fault *inside* `App.skeleton.vue`, which is why it is MINOR — but it falsifies the docblock's framing of the pattern as retired, and it is the concrete gap U-24.2 named ("give the Monaco panes their skeletons", `lane-24:416`).

**Falsifier** — a ruling that `TimelineHoverPreview`'s "Capturing…" is a *progress* affordance rather than a loading placeholder and therefore out of T.F8's scope; or a skeleton already wired for that site that I missed.

---

### L-10 — MINOR — no `forced-colors` and no `prefers-reduced-transparency` arm; the primitive it duplicates ships both

**Where** `App.skeleton.vue:51–65` (plate), `:68–83` (sheen); missing arms per §0.

The plate's entire visual identity is three properties that forced-colors mode overrides or drops: a translucent `background` `color-mix(… 70%, transparent)` (`:57–61`), a `color-mix` `border` (`:62–63`), and a `box-shadow` (`:64`) — and `box-shadow` is on the forced-color-properties list that UAs force. The sheen is a `background-image` gradient (`:71–79`). glass-ui's primitive handles this explicitly (`opacity:.18; background:canvastext` on the plate, `display:none` on the sheen) and separately handles `prefers-reduced-transparency: reduce` by dropping to an opaque `var(--muted)`. This copy has neither arm, so a forced-colors user plausibly gets a plate with no perceptible silhouette — and, per L-1, no announcement either. That pairing is why I file it rather than waiving it as a narrow-audience nit.

**Exact rendering is `UNPROVEN-NEEDS-LIVE`** — I am not claiming the plate is invisible; I am claiming the arms are absent and the house primitive judged them necessary. Hand to SS-13.

**Falsifier** — a forced-colors (Windows HCM / `chrome://flags` emulation) capture showing a legible plate silhouette, or a global `forced-colors` rule in `demo/styles/` or glass-ui's `accessibility.css` that already covers a generic translucent plate. Either kills it.

---

## 2. SUPERLATIVES (L-18 runs both ways)

### P-1 — teardown-free by construction: the leak surface is empty

**Where** the whole `<script setup>`, `App.skeleton.vue:18–24`.

Twenty-five script lines, of which seventeen are the docblock. No `onMounted`, no `onBeforeUnmount`, no timer, no listener, no observer, no engine handle, no `ref`, no import. For a component that **mounts and unmounts on every scene switch** (`App.vue:90–99`, keyed `<Suspense>`), that is the strongest possible teardown posture: there is nothing to forget to clean up, and no unmount-during-async window to guard.

The contrast is in the same repo and is instructive rather than pejorative — `TypingDots.vue` needs an `unmounted` latch (`:69`), a post-await re-check (`:76`), and an `onBeforeUnmount` stop-and-drain loop (`:103–107`) precisely *because* it takes the engine path. On the LIBRARY axis this is a real trade the file wins, and it is the honest counterweight to L-6: the inv-ζ cure would import a lifecycle hazard this component currently does not have.

**Falsifier** — any leak or retained handle attributable to this component (a heap snapshot showing retained `.scene-skeleton` nodes across scene switches would do it). I expect none; the mechanism forbids it.

---

### P-2 — the census recommendation actually LANDED

**Where** the file's own path, `demo/app/App.skeleton.vue`, and `App.vue:143` (`import SceneSkeleton from "./App.skeleton.vue"`).

Four independent U-tranche documents proposed the same re-home: lane-20 F-7 (`:182–191`), lane-32 F3 (`:186–191`), `U.B.md:139` (B9) and `pass3-research-one-component-home.md:175–186, 237`. Verified in the live tree: `demo/@` does not exist, `demo/components/skeletons/` does not exist, and the file sits beside its sole consumer under the `<Name>.skeleton.vue` naming clause U-24.2 specified. A single-member kind-bin was dissolved and the recommendation closed. Colocation on this axis is *correct*, and worth saying out loud in a document otherwise full of what is wrong.

**Falsifier** — a surviving `components/skeletons/` directory, or a second consumer outside `app/` that makes the shell-private placement wrong.

---

### P-3 — the decorative subtree is correctly excluded from the a11y tree

**Where** `App.skeleton.vue:34`.

`aria-hidden="true"` on `.scene-skeleton__plate` keeps the shimmer chrome out of the accessibility tree, so no AT user meets an unlabeled generic group with an empty span inside it. glass-ui's own `Skeleton` makes the identical judgement (`aria-hidden="true"` hardcoded on its root). The instinct — *decorative chrome is not content* — is right.

**Honest caveat, stated rather than hidden:** this is also the mechanism that leaves the L-1 live region empty. The instinct is correct; the composition around it is not. The fix is additive (an `sr-only` string as a *sibling* of the hidden plate), not a retraction of this attribute.

**Falsifier** — a reading in which the plate carries information (it does not; it is content-independent by the docblock's own `:14`).

---

### P-4 — token-relative color in oklab, not hardcoded alpha

**Where** `App.skeleton.vue:57–63, 75`.

Every colour is `color-mix(in oklab, <theme token> N%, transparent)` rather than a baked `rgba()`. Because glass-ui bridges `--color-muted`/`--color-border`/`--color-foreground` onto the live `--muted`/`--border`/`--foreground` (`dist/styles/theme/bridges.css`) and re-declares those under `.dark` (`dist/styles/theme/dark.css`), the plate tracks light/dark for free with **zero** dark-mode rules in this file. Mixing in `oklab` (perceptual) rather than `srgb` is the correct choice for a translucency ramp and matches the primitive.

**Falsifier** — a rendered dark-mode capture in which the plate does not follow the theme (would mean the bridge does not reach these properties). Marked `UNPROVEN-NEEDS-LIVE` for the visual; the token chain itself is source-verified.

---

## R. RETRACTED CANDIDATE (killed by its own falsifier)

**R-1 — "the sheen is off-plate for most of the cycle; `ease-in-out` is applied backwards."** I derived the sweep geometry from `:80–81, 85–92`. With `background-size: 220% 100%`, the background-position percentage resolves as `(W − 2.2W) × p`, so the image's left edge travels from `−1.68W` (at `140%`) to `+0.48W` (at `−40%`); the highlight core (50 % of the image) therefore travels from `−0.58W` to `+1.58W`, i.e. `2.16W` of travel to cross a `1W` plate. Under `ease-in-out` the slow phases land off-plate, leaving the bright core visible for roughly 28 % of each 1.6 s cycle.

**The falsifier fired.** glass-ui's primitive has the *same* proportions — `translate(-110%) → translate(110%)` on an `inset:0` pseudo-element is `2.2W` of travel for a `1W` plate, also `ease-in-out`, also with the band centred at ~48 %. The geometry is the house design, not a local error; a "defect" that condemns the reference implementation identically is not a defect of this file. **Retracted.** The arithmetic survives only as corroboration in §0 that this is a hand-copy, and as an open question for the *design* axis (whether the shared idiom is right at all), not for L.

---

## 3. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| `lane-frontend.md:365` **S-6** (`App.skeleton` → `Skeleton`, AMBER, 101 lines) | **CONFIRMED and hardened** at L-2 with byte-level provenance (`105deg` + oklab `color-mix` over the foreground token). Two qualifications S-6 does not carry: glass's `Skeleton` **strips `role`/`aria-*`** from fallthrough, and it has **no `./skeleton` subpath** — its runtime ships inside the 20 KB `data-table` chunk. Recommendation shifts from "delegate the plate" to "port the five missing arms, or measure the chunk first." |
| `lane-frontend.md:15, 54–70` **F-1** (glass-ui phantom dependency, RED) | **CONFIRMED** (`package.json` deps = `{"@mkbabb/value.js":"4.0.0"}`, zero glass in devDeps) and **CONTRADICTED on method** at L-3: F-1's blast radius is measured by *import lines*, which counts this file among the "21 `.vue` with no glass-ui import" while it is 4/5 glass-token-dependent through the cascade. The census needs a custom-property arm. |
| `lane-frontend.md:387` **S-8** (`TypingDots`, JUSTIFIED BESPOKE — the inv-ζ dogfood seam) | Used as the **house-idiom yardstick** at L-6 (engine `@keyframes` + `respectReducedMotion` replacing the hand-mirrored `@media`) and as the **honest counterweight** at P-1 (the engine path costs a lifecycle guard this file does not pay). |
| `lane-library.md` | No `skeleton` mention (probed). The parse-seam findings do not reach this component; it consumes no parser surface. |
| `U/waves/U.G.md:253–254`, `U/audit/lane-24…md:77–79` ("the house skeleton spec", "already-correct a11y contract") | **CONTRADICTED** at L-1. The designated-correct contract is not deliverable, and the designation gives it fan-out. |
| `U/audit/lane-20…md:182–191` F-7, `lane-32…md:186–191` F3 (mislocated singleton) | **CLOSED** — recorded as superlative P-2; the re-home landed. Only the word "shared" in the docblock survives it (L-8.1). |
| `I/audit/recap-deferred.md:270` (cube `idle-bob` raw `@keyframes` → BOOK, cohesion nit) | **Precedent applied** to hold L-6 at MINOR rather than inflate it. |

## 4. Handoff to SS-13 (live)

Three claims are marked `UNPROVEN-NEEDS-LIVE` and are the only ones a browser can settle: L-1's screen-reader capture, L-4's compositing-layer attribution, L-10's forced-colors render. Everything else in this document is source- or spec-derived and is falsifiable without a browser.
