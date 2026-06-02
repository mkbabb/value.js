# J.WC — Motion & micro-interactions (design refinement spec)

**Lens**: Motion & micro-interactions. **Scope**: page-load orchestration + transitions + micro-interactions via glass-ui motion composables + the platform (View Transitions, scroll-driven, `@starting-style`). **Mode**: SPEC ONLY — no app-src edits, no builds, no git. Refinement, not redesign: the demo is stable on glass-ui; this makes its motion usage more distinctive, idiomatic, and compositor-driven.

**Grounding**: every recommendation cites a real file:line + the specific glass-ui primitive. The installed `node_modules/@mkbabb/glass-ui/dist/` surface was probed directly to confirm each lever ships.

---

## 0. Inventory — what the demo HAS vs what glass-ui SHIPS-but-unused

**The demo's current motion vocabulary** (grounded):

| Surface | File:line | Mechanism | Verdict |
|---|---|---|---|
| Pane swap (mobile/desktop L/R) | `color-picker/App.vue:243-281` | hand-written CSS `translateX(±110%) rotate(±2deg)` enter/leave + `--spring-snappy` | distinctive (the rotate is signature) — KEEP the LOOK, but it is `<Transition>`-only, not VT-aware |
| BrowsePane palette grid | `panes/BrowsePane.vue:46-77` → `palette-browser/PaletteCardGrid.vue` | `v-for` over `PaletteCard`, `contain: content` | **instant pop-in — NO entrance choreography. The headline gap.** |
| Pane header shrink | `panes/PaneHeader.vue:30-98` | native `scroll-timeline: --pane-scroll` + `animation-timeline` | **exemplary** — the one place the demo already speaks scroll-driven CSS. Extend this idiom; don't replace it. |
| Card skeleton | `palette-browser/PaletteCardSkeleton.vue:5-37` | hand-rolled `animate-pulse` + manual `animationDelay: ${i*0.12}s` | works, but the stagger is a literal-delay hack, not a composable |
| Loading state | `panes/BrowsePane.vue:24-29` | bare `<Loader2 animate-spin>` | flat — no skeleton-to-content handoff |
| Card hover | `palette-browser/PaletteCard.vue:7` | `transition-shadow hover:shadow-card-hover` | fine; cartoon-shadow pop is on-brand |
| Expand/rename | `PaletteCard.vue:124-169` | `useHeightTransition` (local) + `rename-slide` CSS | fine |
| HeroBlob mood | `color-picker/visual/HeroBlob.vue:36-83` | WebGL2 metaball RAF + idle/happy/excited mood timers | already the most alive micro-interaction; the model to echo elsewhere |
| Aurora atmosphere | `App.vue:209-215` | `useAurora` (glass-ui) static `AuroraConfig` | static — PRM-honored internally, but inert w.r.t. the picked color |

**glass-ui motion primitives SHIPPED in the installed dist but consumed by ZERO demo files** (confirmed via `grep -rl` over `@/` + `color-picker/`):

- `@mkbabb/glass-ui/motion-core` → `useStaggerReveal`, `useScrollProgress`, `useViewTransition`, `startViewTransition`, `supportsViewTransitions`, `useStagger`, `useIntersectionPause`, **`useYieldToMain` / `yieldToMain`**.
- `@mkbabb/glass-ui/motion` → `useSpringMount`, `useSpring`, `useAnimatedNumber`, `useAnimatedNumberMap`, `useSpringPress`.
- CSS substrate `@mkbabb/glass-ui/styles/.../view-transition.css` ships a token-first `::view-transition-group(.gl-list-item)` group recipe (`--vt-duration`, `--vt-ease`, PRM `animation:none`) — the demo `style.css:23-24` imports `@mkbabb/glass-ui/styles` so this CSS is ALREADY in the cascade, completely unused.
- `--motion-duration-*` / `--motion-delay-*` staged-reveal token family (tokens.css) — `DESIGN.md:78-86` explicitly books these "for future adoption when the demo grows analogous staged-reveal motion." J is that moment.

**`@starting-style` / `allow-discrete`**: `grep` returns ZERO uses anywhere in the demo. Untapped platform lever.

The thesis: the demo hand-rolls (or omits) the exact motion the library already ships, idiomatic and PRM-correct. The refinement is **subtractive on hand-rolled motion, additive on the shipped composables** — and J.W2/J.W3 (the remix/diff feature) supplies the ≥2-consumer justification that makes adopting `useViewTransition`/`useStaggerReveal` overfitting-clean rather than speculative.

---

## AESTHETIC DIRECTION

**"The palette wall breathes; the diff is the choreography."** The demo's identity is already bold — Fraunces display serif, 8px cartoon-offset shadows (`style.css:78`), gold-shimmer featured badges, a living WebGL blob, signature `rotate(±2deg)` pane swaps. What it lacks is **orchestrated arrival and orchestrated change.** Today a browse-grid of palettes appears all-at-once (instant `v-for` paint); a sort/filter re-rank snaps; a remix lands with no visible lineage. The motion direction for J: make **the palette grid a staggered reveal** (the one memorable orchestrated page-load), make **every list mutation a View Transition** (sort, filter, remix-insert, revert), and make **the J.W3 atom-diff a motion event** — added swatches grow in, removed swatches collapse out, changed swatches cross-fade — so the diff reads as a *film of the change*, not a static highlight. One grammar, three consumers, all compositor-driven (transform/opacity only), all PRM-honored by the library's own guards. Keep the cartoon-pop personality; add temporal choreography on top of it. No new font, no new color — pure motion layering on the existing bold base.

---

## TOP REFINEMENTS (surface → glass-ui lever)

### 1. Palette grid: staggered reveal on load + filter (the one orchestrated page-load)
**Surface**: `panes/BrowsePane.vue:46-77` + `PaletteCardGrid.vue` — cards currently paint instantly via `v-for`.
**Lever**: `useStaggerReveal` (`@mkbabb/glass-ui/motion-core`). Apply on the grid so cards rise + fade in on a transform/opacity cascade (compositor-only) when `displayedBrowse` first resolves and on each filter/search result swap. Drive the per-item delay off the shipped `--motion-delay-*` family (DESIGN.md:78 books exactly this), NOT a literal `${i*0.1}s` — which also lets `PaletteCardSkeleton.vue:5-37` retire its hand-rolled `animationDelay` hack and reuse the same cascade for skeleton→content continuity. This is THE memorable arrival; everything else is supporting.

### 2. List mutations as View Transitions: sort / filter / remix-insert / revert
**Surface**: `BrowsePane.vue` re-rank + insert sites — `onFork` (`:166-180`, prepends the remix to `remotePalettes`), `onRevert` (`:192-199`), sort/filter handlers (`:243-258`). Today these mutate the array and the DOM jumps.
**Lever**: `useViewTransition` / `startViewTransition` (`motion-core`) + the **already-imported-but-unused** `view-transition.css` group recipe. Tag each `PaletteCard` root (`PaletteCard.vue:5`) with `view-transition-class: gl-list-item; view-transition-name: pal-<slug>` and wrap each array mutation in `startViewTransition(() => mutate())`. Cards slide to their new ranks, the remix grows into slot 0, a reverted card morphs in place — FLIP for free, token-tuned via `--vt-duration`/`--vt-ease`, PRM-degraded by the library. This is the ≥2-consumer justification the J plan needs (sort + remix + revert + diff = 4 consumers), turning VT adoption from overfit into idiomatic. (NB: enforce the runtime MANDATORY — exactly one element per `view-transition-name` per state, keyed by slug.)

### 3. The J.W3 atom-diff render as MOTION, not just a static highlight
**Surface**: `demo/@/components/.../PaletteDiff.vue` (NEW per `J.W1-palette-remix.md §7`) — currently specced as CSS Custom Highlight ranges (amber/green/red underlays) only.
**Lever**: layer `useStaggerReveal` + `@starting-style` over the highlight. `added` swatches enter via `@starting-style { transform: scaleY(0) }` → grow in (green); `removed` ghost-slots collapse out (red strike); `changed` swatches cross-fade old→new color. Stagger the ops left-to-right so a multi-op remix plays as a short film. This makes the diff *legible at a glance through motion* and composes with — does not replace — the CSS Highlight spec (highlight = the persistent state, motion = the transition into it). a11y leaf unchanged (`§7` `aria-label` per op carries the semantics for AT; motion is decorative reinforcement).

### 4. Replace App.vue's hand-rolled pane CSS-transition with `useViewTransition` (keep the signature rotate)
**Surface**: `App.vue:243-281` — 40 lines of hand-written `pane-left`/`pane-right` enter/leave keyframes.
**Lever**: `useViewTransition` for the pane swap, preserving the `translateX(±110%) rotate(±2deg)` look as the `::view-transition-old/new` animation (tokenized through `--vt-*`). VT cross-roots the swap (the outgoing pane's content can morph toward the incoming) where `<Transition mode="out-in">` (`PaneSlot.vue:35`) hard-cuts. Net: fewer hand-rolled lines, the same bold rotate personality, one motion grammar shared with refinement #2. Lower-priority (the current transition is already distinctive) — adopt only if #2 lands first so the grammar is shared.

### 5. INP-correct extraction handoff: `useYieldToMain` + skeleton continuity
**Surface**: `BrowsePane.vue:24-29` (bare spinner) + the palette-extraction hot path the J plan already targets with `scheduler.yield()` (`J.md §3 W1-perf`).
**Lever**: glass-ui ships `useYieldToMain`/`yieldToMain` (`motion-core`) — the feature-detected `scheduler.yield()` wrapper the J.W2 perf leaf calls for, already in the dist. Pair it with a skeleton→content cross-fade (reuse #1's stagger on `PaletteCardSkeleton`) so the grid never flashes a bare spinner: skeleton cards reveal-stagger in, then dissolve into real cards as extraction yields. Motion masks the latency the yield introduces — the micro-interaction and the perf lever are the same gesture. Consumes a glass-ui primitive instead of hand-rolling `scheduler.yield` (per the demo's glass-ui-first-class convention, CLAUDE.md:208).

**PRM posture**: every lever above degrades correctly for free — `view-transition.css` ships `@media (prefers-reduced-motion) { animation: none }`, `useStaggerReveal`/`useSpringMount` honor the query internally, and the demo's blunt global guard (`animations.css:32-41`) already neutralizes residual CSS. No new PRM code required; #3's `@starting-style` block needs a one-line PRM carve-out mirroring `animations.css:50-60`.

---

## FILE WRITTEN
`/Users/mkbabb/Programming/value.js/docs/tranches/J/design/WC-design-motion.md`
