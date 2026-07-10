# T.W3 — the CORE lane record (W3-1 + W3-4 · the single writer of the tier tokens + PaneHeader.vue)

**Lane**: T.W3-CORE (Fable + frontend-design; the §3.2 single writer). **Scope**: W3-1 (rung-1
adoption · rung-2 WELL consolidation · rung-4 STAGE · the C3 law + ledger in DESIGN.md) +
W3-4 (header material at rest) + the MOB-1 rider adjudication. W3-2/W3-3/W3-5 are consumer
lanes and consume this lane's token queue (dispatch as the next batch per the E-6 amendment).
**Anchors re-derived** against `audit/w1-move-map.md` (PP-11) at lane open — the pane files,
the palette-browser card family (`card/PaletteCard/`), the gradient tree
(`GradientVisualizer/PerceivedSpacePlate/`), and the markdown home all verified at their
post-W1 coordinates before any edit.

## §1 What landed (per-item commits)

| Commit | Item | Content |
|---|---|---|
| `5f89967` | W3-1 tokens | `--well-bg` (rung-2, D1 bracket default: 8% `--foreground` into `--card`, oklab) · `--stage`/`--on-stage-chrome` (rung-4 warm-stone near-black pair, scheme-invariant, Q18 form) · `@theme` bridges `--color-well`/`--color-stage`/`--color-on-stage-chrome` |
| `b608b5f` | W3-1 deploy | 9 pane cards `tier="wash" :shadow="false" :grain="false"` → `tier="resting"` (defaults: stamp + grain — the picker's exact register); the 6 well mints die onto `bg-well`/`var(--well-bg)` (`.dashed-well` · PaletteCard+Skeleton · perceived-space plate [Q4: drops to well, double-stamp dies] · stop chip · VersionHistoryDrawer); mix result plate floating→well (RC-2); eyedropper overlay → producer `glass-floating` (Q4: stays chrome); ExtractWorkbench stage sites → the STAGE pair; **O-7 armed** (`e2e/smoke/oracles/o7-card-census.spec.ts`); the playwright lane-port seam (`VJS_E2E_PORT`/`VJS_E2E_PERF_PORT`) |
| `ce95c1d` | W3-1 docs | DESIGN.md: §Surfaces → THE MATERIAL LADDER (NORMATIVE, retired-by-name list); §Color → THE C3 LAW + the complete 9-row sanctioned-exception ledger (Q18-ratified, Q10 sub-clause in-row); Z-rank table re-pointed |
| `6f67ff8` | W3-4 | PaneHeader re-authored: constitutive veil (rest floor 0.52), fill/filter = `--glass-bg-resting`/`--glass-blur-resting` (CC-3's bespoke recipe dead — C2's rung expression), feather at every state, swell ≤64px, compositor-only choreography (F3 fork dead), `@supports` SDA gate (F5); Markdown `.toc` sticky band → in-flow well block (F6); **O-11 minted** 6/6; supersession annotations at `S/audit/pi/w5a-after/DELTA.md:25` + `S/waves/S.W5.md:42` (R2 + R8 record repair) |

## §2 The O-7 census record (site → rung, both schemes — membership by identity)

Method: `e2e/smoke/oracles/o7-card-census.spec.ts` (the armed W0-5 scaffold) — 7 user views
(Home/Palettes/Browse/Extract/Mix/Generate/Gradient) × {light, dark} + the t-mobile F-8
390×844 frame (captures attached to the run). Membership = producer `data-tier` stamp for
Cards; `--well-bg` computed-value byte-equality + `backdrop-filter: none` for wells. **PASS
3/3** (2 scheme walks + the 390 frame).

| Site | Rung | Light | Dark |
|---|---|---|---|
| Picker card + all 9 pane cards (About/Palettes/Browse/Extract/Mix/Generate/Gradient live-walked; Admin/ConfigSlider by the identical one-attribute stamp — census A7 discipline) | 1 PLATE | `data-tier="resting"` + grain + stamp ✓ | ✓ |
| `.dashed-well` (Current-Palette editor, Mix Selected) | 2 WELL | `--well-bg` byte-equal, backdrop none ✓ | ✓ |
| PaletteCard / PaletteCardSkeleton (one shared shell) | 2 WELL | ✓ (where mounted) | ✓ |
| Gradient perceived-space plate | 2 WELL | ✓ + `box-shadow: none` (double-stamp dead) | ✓ |
| Mix result plate | 2 WELL | ✓ (where mounted) | ✓ |
| Eyedropper overlay | 3 CHROME | `glass-floating` (Q4) — image-gated; source-verified | — |
| Extract camera stage + veil + chip | 4 STAGE | camera-gated; source-verified + grep gate below | — |

Retirement greps (all residual hits are retirement-citation comments, zero code):
`tier="wash"` → **0** · `bg-card/75` → **0** · opaque `bg-card` utility → **0** ·
`bg-black|bg-white|text-white|text-black|from-black|from-white` → **0** (exemptions per
census: MiniColorPicker `#000`/`#fff` color-math ramps; PointerDebugOverlay dev-only).

**The D1 bracket judgment (h-refine-doctrine F-10)**: `--well-bg` landed at the bracket
DEFAULT (8%) and is judged inside [6%, 10%] at this census by construction (token identity);
the owner eye-judges the point at W8. Producer swap booked (P3 `.glass-well`).

## §3 The O-11 six-gate record (`e2e/smoke/oracles/o11-header-gates.spec.ts` — 6/6 PASS)

| Gate | Assertion | Result |
|---|---|---|
| 1 rest floor | veil (::before) opacity ∈ [0.45, 0.65] at scrollTop 0, 7 views × both schemes | PASS (landed floor **0.52**) |
| 2 no band | feather mask ≠ none at rest AND stuck | PASS |
| 3 no double-exposure | About + Gradient scrubs: monotone from floor; ≥0.85 @48px; =1 @64px (swell ≤64px, decoupled from the 120px shrink) | PASS |
| 4 compositor-only | pane-* keyframes carry ONLY transform/opacity (structural walk) + CDP `devtools.timeline` trace over a live 0→300px scrub AFTER a warm-up pass (first-reveal render work excluded): Layout track flat (≤5; the retired fork forced ~1/frame ≈ 31) | PASS |
| 5 engine/PRM coherence | PRM-emulated rest ≡ normal rest (from-state = base-state by construction) + zero `--pane-scroll` bindings outside `@supports (animation-timeline: scroll())` | PASS |
| 6 one grammar | no in-card sticky beyond `.pane-header`; nothing out-stacks `--z-header` (Home/Palettes/Gradient sweeps; the Markdown `.toc` sticky/z-popover band excised) | PASS |

**The rest-floor arithmetic (Q9, closed-form — no tuning loop)**: the ratified frame is the
EFFECT bracket — rest adds 27–39% card material (= [0.45, 0.65] × the retired 60%-`--card`
veil). The veil now paints the RESTING rung (`--glass-opacity-resting` 0.65 L / 0.72 D);
floor 0.52 composites **33.8% L / 37.4% D** — inside the bracket both schemes, at the
eye-judged center's weight (t-header-shading §3: 0.55 × 60% ≈ 33%). One landing, documented;
the third-iteration loop-halt clause never engaged.

**Interim → P3 books re-affirmed (T.W3 §BOOKS)**: `--well-bg` → `.glass-well` · the demo
feather + rest floor → the P3 rest-floor/bottom-feather knobs (the knob speaks the Q9 EFFECT
bracket's unit) · the floating+tint rung-CLIMB (the Q9 default's stuck endpoint) rides the
same P3 consume — the interim one-channel opacity swell is the compositor-only expression
available without the producer knobs; the swap fires at W7.

## §4 Wave-gate contributions (the composite gate is the integrator's)

- **CSS tripwire**: render-blocking CSS at gate = `index-*.css` **88,667 B = 86.6 KiB gz ≤ 120**
  (baseline 86.5 — the ladder cost ≈ +0.1 KiB; the deferred `glass-fonts` corpus stays
  non-blocking `media=print onload`, per the S.W3-9 split). GREEN.
- **Suites at lane close**: lint 0 · typecheck 0 (lib + demo) · vitest **2171/69** · the
  full 6-project playwright run recorded below (§6).
- **PP-8 spot**: no new file exceeds the demo 400-LoC cap (PaneHeader 174 lines; the census
  spec is e2e, uncapped); zero new `as any`/`as unknown as`.

## §5 THE MOB-1 RIDER ADJUDICATION (deferred from W1 — honest record, no silent skip)

**Read**: `audit/w1-close-artefacts.md §2` (the routed book) + `App.vue:50-51` (the D8-1
note) + `scripts/ci/css-emission-probe.mjs:9-10` + `style.css:460-471` (the D6-03 aspect
exception — post-W3-1 coordinate; this lane's +31 token lines drifted the pre-lane `429-440`
cite, repaired at the §Recovery resume) + `Dock.vue:213` (`lg:hidden`, the width-only dock
witness).

**Adjudication: NOT LANDABLE THIS ROUND — recorded as a routed ask with the blocking cites,
carried to the T.W4.5 checkpoint (where W1 close already routed it).** Two independent
blocks, either sufficient:

1. **The writer law (the hard block)**: MOB-1's stamp + re-key writes `App.vue`'s pane
   wrappers (`App.vue:56,73,89` — the `lg:hidden`/`hidden lg:flex`/`hidden lg:block`
   witnesses live there, and the `isDesktop` breakpoint that would drive the stamp at
   `App.vue:233`). `App.vue` is **T.W2's EXCLUSIVE single-writer surface this round**
   (SYNTHESIS §3 W2: "Single-writer: `app/composables/boot/*` + `App.vue` + `index.html`";
   `T.W3.md §File bounds`: "Do NOT touch … the boot chain (W2's — parallel wave; the ONE
   routed exception above)" — and the M-15 routed exception is the W3-5 ink half, not this).
   A W3-lane `App.vue` write would break the law this lane is itself bound by.
2. **The D8-1 conflict (the ratified-vs-ratified half, adjudicated on the merits)**: the
   D8-1 defect (the producer dist's unlayered emission beating layered demo utilities) was
   CURED at the producer (glass-ui `4b637036`, CURE_OBSERVED, book RETIRED — R FINAL §5),
   so `App.vue:50`'s note does not forbid a witness unification ON ITS FACE; but the `lg:*`
   utilities are ALSO the **CI-pinned canary chain** for the P9 phantom-utility + D8-1
   emission classes (`css-emission-probe.mjs` pins `.lg\:flex`/`.lg\:block` BY NAME and its
   comment block + `style.css:431` cross-reference them). Replacing the witnesses without
   re-pointing the probe kills a standing owner-grievance-class canary; re-pointing it is a
   meta-CI decision that must land WITH the stamp in one commit, not from a lane whose file
   bounds exclude the stamp's host file.

**The routed resolution sketch** (for the T.W4.5 checkpoint / W6 shell lane, once W2 closes
and `App.vue` frees): ONE commit that (a) stamps `data-layout="desktop|mobile"` from the
`isDesktop` compound-query breakpoint (`App.vue:233` — the ONE JS truth), (b) re-keys the
pane wrappers + `.pane-slot-mobile` + `Dock.vue:213` onto `[data-layout]` attribute rules,
(c) kills the `style.css:460-471` D6-03 exception (dies by construction — the CSS witness
IS the JS witness), (d) re-points `css-emission-probe.mjs` at the successor witness rules so
the P9/D8-1 canary function survives the swap, (e) updates the `App.vue:50` D8-1 note to
record the supersession (record repair, per this wave's R2 precedent). The current
mechanism is intact and green meanwhile (both panes reachable at 1024×1366; smoke-mobile
passes — verified at W1 close).

## §6 Suite record at lane close

- `npm run lint` — 0.
- `npm run typecheck` — 0 (lib + demo).
- `npm test` — vitest 2171/69 green.
- `npx playwright test` (all 6 projects, lane ports `VJS_E2E_PORT=9351`): **69 passed /
  3 skipped, exit 0** (the 3 skips = the W0 born-RED-by-design set, unchanged from the W1
  close shape; the +8 vs W1's 61 = the armed O-7 census ×3 + the O-11 gates ×6, net of the
  retired 1-test scaffold). Includes smoke-perf on the fresh gh-pages build and the
  smoke-safari sustained-30s leg.
- Tool-artefact grep over every touched doc (`grep -rnE '</?(content|invoke|parameter|antml)'`)
  — empty at every docs commit (M-1).

## §6b §RECOVERY RESUME ADDENDUM (2026-07-10 — the T.md §8 protocol, run whole)

The session closed after `e04609a` without the lane report; the resume ran the four-step
protocol (brief: `audit/recovery/T.W3-core-brief-2026-07-10.md`). **The whole-census re-drive
earned its keep**: O-11 gate 5's normal-engine read raced the boot reveal (no mount-wait,
unlike gates 1+2) and could pass VACUOUSLY on two empty reads — cured with the sibling gates'
own wait discipline + non-vacuity assertions on both reads (spec-only change; the header
material was correct). Re-certified whole on the cured mint: **O-7 3/3 · O-11 6/6 (9/9
spec-level, targeted re-run) · lint 0 · typecheck 0 · vitest 2171/69 · CSS 88,667 B =
86.6 KiB gz (fresh build, byte-identical) · retirement greps 0 · tool-artefact grep empty**.
The full 6-project suite certification composes the §6 run (69/3, exit 0 — the committed
product tree is byte-identical since) with this resume's whole re-drive of the ONLY amended
spec; a belt-and-braces full re-run was additionally dispatched at resume close. Record
repair folded: the §5 D6-03 cite re-derived to the post-W3-1 coordinate (`style.css:460-471`).

## §7 Hand-off to the consumer batch (W3-2 · W3-3 · W3-5)

The token queue is LANDED and stable: `--well-bg` / `bg-well` (rung-2), `--stage` /
`--on-stage-chrome` (rung-4), the rung-1 stamp fleet, and the PaneHeader material. Consumer
lanes re-derive their anchors against this record; the ShadowPalette (W3-2) seats its ghost
on rung-2 grounds; the search seat (W3-3) judges beside the dashed-well + card in-frame
(both now well/plate — this record's §2 table is the frame); W3-5's O-18 census runs
against the settled tier lightnesses (the well is OPAQUE — its composited lightness is
closed-form, the C5/Q4 determinism dividend).
