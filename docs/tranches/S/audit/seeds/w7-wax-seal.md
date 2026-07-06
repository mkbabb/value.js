# Seed w7-wax-seal — the collapsed-dock wax-seal morph (S.W7 item W7-1; S-8)

**Verdict: VIABLE** (with two suggested spec amendments, non-blocking).
Prototyped in the isolated worktree `wf_01c28a82-3c2-4` (cut from tranche-q HEAD `7cd45c4`); nothing lands on mainline except this report + patch.

## §Intent

SYNTHESIS §3.9 item **W7-1** (verbatim spec of record; `S.W7.md` transcribes it): "the wax seal (S-8): WatercolorDot in the live color filling the circle + the view icon inked over it (ink/foreground — the dot IS the accent …), `vj-morph` keyed by view; label span + chevron DELETED, icon un-gated from `sm:hidden`; gold treatment when `isAdminMode`. … the seal's hairline rim ADOPTS `--accent-view` — the continuity carrier the expanded trigger's ring will ALSO wear under W7-4 … No single element ever animates live→view-hue." Anchors `Dock.vue:217-230`; evidence lane design-dock-shell P0-1.

## §What was built

| File:line (worktree) | What |
|---|---|
| `demo/@/components/custom/dock/Dock.vue:214-240` (template `#collapsed`) | The seal: `.dock-seal` (circular die-rim wrapper, `--accent-view` hairline) → `WatercolorDot` (`.dock-seal-wax`, live `cssColorOpaque`, `tag="div"`, `seed="top-dock"`) → view icon in the dot's **default slot** (`.dock-seal-ink`), swapped by `<Transition name="vj-morph" mode="out-in" :key="view">` with `--vj-morph-scale: 1.25` (old impression lifts off, new stamp presses in). Label span + chevron **deleted**; icon un-gated from `sm:hidden`. Admin: `.dock-seal--admin` gold rim + existing `gold-shimmer-icon` class on the ink. |
| `Dock.vue:283-337` (scoped styles) | `.dock-seal` (block 100%, aspect 1, grid-center, 2px pad, 9999px radius, 1px rim `color-mix(in oklab, var(--accent-view) 60%, transparent)`); `.dock-seal--admin` gold rim; `.dock-seal-wax` (fill + grid-center + the **ink regime**: `color: oklch(from var(--watercolor-color) clamp(0.03, calc((0.62 - l) * infinity), 0.98) 0.02 h)` — the icon INHERITS its ink, flipped light/dark off the wax's own L, hue-traced C 0.02); `.dock-seal-ink` 55% square. |
| `demo/@/components/custom/dock/DockViewSelect.vue:52-66` | The morph-clause seam: trigger `--dock-ring` re-wired live-safeAccent → `var(--accent-view)` (one hue held across collapse↔expand). **Inert today — `--dock-ring` has NO consumer in the producer src or dist (verified in SYNTHESIS at glass-ui HEAD `c03ab942`; re-confirmed against installed dist 4.2.0): the ring CONSUME lands in glass-ui** (producer ask; the demo half is now spec-shaped). |

Dock.vue 325 LoC, DockViewSelect.vue 140 LoC — both under the 400 cap. Zero producer (`../glass-ui`) writes, zero `src/` writes.

### Transform-only strategy (exactly how)

Three layers, no layout animation authored anywhere in the seed:

1. **The box morph is the producer's** (glass-ui dock: `dockMorphMeasure` FLIP-measured endpoints on the `--dock-morph-t` scalar; corner-radius + opt-in `clip-path` interpolation, compositor-only per BC.W-LIQUID-MORPH; summary-content reveal cross-fades opacity on the incoming scalar — dist `styles/dock/morph.css`, `density.css`). The seed's contribution: the collapsed slot is now a **fixed-intrinsic-size composition** (block 100% / aspect-ratio 1 → constant 40×40 in the producer's square summary pane), so the collapsed morph endpoint is **view-invariant** — the old per-view label width ("Home" 45.8px vs "Palettes") that varied the measured endpoint and hard-clipped to "Ho" (P0-1) is gone; nothing to re-measure, nothing to clip.
2. **The stamp swap** (view change while collapsed) is `vj-morph` = opacity + transform only (the family's from/to states are `translate/scale` + opacity; the `max-height` arm resolves `none` unset). Probed live: the full class lifecycle fired (`vj-morph-leave-from/-active/-to` then `-enter-from/-active/-to`, mode out-in).
3. **The wax's liveness** is the WatercolorDot's own compositor transform wobble (producer-guaranteed; `animate` left **false** — a seal is still wax; hover nudge is built in).

### Live probe results (Vite dev in-worktree :9001, Chromium via Playwright MCP)

- Collapsed 1440 light: dock 59×59, summary 40×40, seal 40×40, wax 34×34, ink 18.7×18.7; `summary.textContent === ""`, no chevron node; **scrollWidth 40 / clientWidth 40 — zero overflow** (baseline defect: 70/40, the "Ho" clip).
- Rim computed `oklab(0.62 0.269 0.046 / 0.6)` = `--accent-view` @60% ✓; after `#/gradient` (shift 240) the rim turned to `oklab(0.25 -0.038 0.032 / 0.6)` and the ink swapped to the rainbow icon — **the rim follows the view axis, the wax stays live, no element animated live→view-hue** (the wax color binding never changes with view).
- Ink flip both ways: light wax `lab(92 88.8 20)` → ink `oklch(0.03 0.02 9.84)` (dark, hue-traced); dark pick `oklch(0.25 0.05 260)` → ink `oklch(0.98 0.02 260)` (light) ✓.
- 1280×800 (the P0-1 repro viewport): collapsed, sw/cw 40/40, no text ✓. Dark scheme: seal renders, rim unchanged (scheme-independent axis) ✓.
- Reduced motion (emulated): animations 0.01ms (demo guard); transitions governed by glass-ui's stronger `:not([data-allow-motion])` PRM regime — `transition-property: opacity, color, background-color, border-color, box-shadow !important; duration 0.1s !important` (transform EXCLUDED) → the stamp swap degrades to a 100ms pure cross-fade, zero spatial motion. Honored by construction (all seal motion is CSS-driven).
- Typecheck (vue-tsc lib+demo) clean before AND after; eslint 0 on both changed files.
- Admin not live-probed (needs the admin auth fixture); intended render: gold rim (`--color-gold` @75%) + gold-shimmer ink over live wax — wax stays live under admin (the one law, no carve-out), matching the DockViewSelect precedent of gold-as-treatment.

### SAFARI-TRUE (what was avoided and why)

- **No drawing context at all**: WatercolorDot is expressly a CSS/SVG primitive (no Canvas2D/WebGL — no `ctx.filter`, the known WebKit no-op). Its wet edge is an internalised SVG turbulence filter that **rasterizes once and never re-rasterizes per frame** (the producer's own USER-DEFECTS §H Safari guarantee; liveness is compositor `transform` only).
- **No new CSS support floor**: the ink flip uses OKLCh **relative color syntax + channel calc** — the SAME floor (Safari 16.4+) the shipped `--accent-view` derivation (`style.css:175`) already stands on; `calc(infinity)` is Safari 15.4+; `color-mix`/`aspect-ratio` already ubiquitous in the tree. Radius uses `9999px` (the producer's own idiom), not `calc(infinity*1px)`.
- **No filter chains on animated elements**: the only filters are the producer's cached displacement + the static one-shot `drop-shadow` on admin ink. No `backdrop-filter` additions, no `mix-blend-mode`, no new `@property` registrations.

## §Learnings

1. **The icon belongs INSIDE the WatercolorDot's default slot** (it has one, verified in dist): the host's `filter: var(--watercolor-filter)` then displaces the icon with the same wet edge (~1.3px) — the impression reads pressed-into-wax, and hover/wobble moves wax+ink as ONE object. A sibling overlay would split them.
2. **Ink by inheritance kills the specificity fight**: setting the flip `color` on the WAX and letting the icon inherit means `gold-shimmer-icon` (direct color) wins under admin with zero `!important`/ordering games — and adds NO third shimmer-recipe copy (W7-7's consolidation untouched).
3. **The host already publishes `--watercolor-color`** — the ink regime needs no second color binding (DRY; one seam).
4. **The collapsed state is unreachable below 1024px**: `Dock.vue:111` sets `:always-expanded="!isDesktop"` — hard-gate 1's "at every viewport" is satisfied vacuously <1024px. The old `sm:hidden` gating meant the collapsed icon literally never painted anywhere (640–1023 no collapse; ≥1024 icon hidden) — consistent with P0-1.
5. **The demo's 0.01ms PRM guard is dead-lettered for TRANSITIONS** by glass-ui's `:not([data-allow-motion])` `!important` regime (animations still 0.01ms). Not a defect — the producer regime is the better PRM grammar (keeps 100ms fades, kills transforms) — but the demo comment at `animations.css:177-193` overstates its own reach.
6. Worktree ops: the demo dev server needs the library `dist/` built in-worktree (glass-ui/keyframes dist consume value.js by bare specifier through the self-alias) — `npm run build` first, then `npm run dev`; a dev server started before dist exists caches the failed resolution and needs a restart.

## §Risks retired

- **R1 (the P0-1 grammar collision)**: the seal fits the producer's circle with zero overflow at 1440 AND 1280 — measured, not asserted. The collapsed grammar (dot + inked icon, no text/chevron) is buildable purely in the consumer slot; glass-ui KEEP confirmed (no producer change needed for W7-1 proper).
- **R2 (the morph-clause chromatic handoff)**: rim-on-`--accent-view` + wax-on-live is implementable with no element ever animating live→view-hue; the rim provably follows the view axis while the wax binding stays live. The trigger-ring half is confirmed **to-be-built in glass-ui** (`--dock-ring` consumer absent from dist 4.2.0 — the demo seam is re-wired and inert, exactly the spec's "demo seam re-wired + producer consume asked" shape).
- **R3 (transform-only / no layout thrash)**: the fixed-intrinsic seal makes the collapsed endpoint view-invariant; all seed-authored motion is opacity/transform; the residual width-relayout inside the producer's expand morph is the PRE-EXISTING P1-7 mechanism (perf lane / producer), not introduced or worsened here.
- **R4 (Safari)**: no WebKit-unsupported dependency introduced (see §SAFARI-TRUE); the support floor is unchanged from the already-shipped tree.
- **R5 (reduced motion)**: degrades to a 100ms cross-fade with zero spatial motion, by the existing two-tier guard — no seed-side PRM code needed.

## §Spec amendments suggested

1. **W7-1 (ink token unification, exact appended sentence)** — after "…use ink/foreground over the dot, the dot IS the accent", append: "the seal's ink resolves as ONE token (`--seal-ink`) — the seed's CSS relative-color flip (threshold L 0.62 off `--watercolor-color`) is the proven interim shape; W7-4's library resolver MAY absorb it as a 10th written token so the flip threshold is library-derived, not a CSS literal." (Rationale: the 0.62 literal sits adjacent to W7-4's "no hand-tuned accent literals" law; fold it into the same resolver pass.)
2. **S.W7 §Hard gate 1 (viewport clause, exact edit)** — "at every viewport" → "at every viewport where the collapsed state is reachable (the demo pins `always-expanded` below 1024px, `Dock.vue:111`; below that the gate is vacuous unless W7-2 changes the mobile collapse posture)."

## §Replay

```sh
cd /Users/mkbabb/Programming/value.js   # or any worktree of it at tranche-q HEAD
git apply docs/tranches/S/audit/seeds/w7-wax-seal.patch
npm run build      # dist/ must exist for the demo dev server (self-alias)
npm run dev        # then: hover the dock, move away, wait ~5s for collapse
```

Expected: the collapsed dock is a 59px circle holding a 40px seal — live-color watercolor wax filling it, the current view's icon inked over it in flipped ink, a hairline `--accent-view` rim, no text, no chevron; switching views (e.g. `#/gradient`) stamps the new icon in on `vj-morph` and turns the rim hue while the wax holds the live color; `npm run typecheck` exits 0.

Evidence screenshots (session-local, not committed): scratchpad `seal-shots/` — collapsed light/dark/dark-pick/gradient-view/1280 + expanded light/dark.
