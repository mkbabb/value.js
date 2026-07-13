# t-oracle-gaps — the standing-oracle coverage census for the T mandate

**Lane class**: forensics / development-only (zero product-code changes). **Scope**: for every
T-# finding, does a re-runnable, standing oracle (vitest or the Playwright smoke fleet) exist
that would catch a regression on that exact surface — and if not, what is the PRECISE shape of
the oracle T's implementation waves must mint. Also: the standing suite's post-close health.
**Substrate**: `tranche-t` @ `e12fd09` (= master `cc4f4fa`, the S close, + T corpus docs only;
`git diff --stat cc4f4fa..HEAD -- src/ demo/ api/` empty — confirmed by the sibling plan-audit
lanes, re-spot-checked here). **Method**: (1) read the two `t-plan-audit-{1,2}` lanes in full —
they already classify every finding as A/B/C/D against the S gates and name several oracle
defects (F3/F4 in part 1; F6/F9/F12/F14/F16/F17/F18 in part 2); this lane does not re-derive
those classifications, it **operationalizes** them plus covers the remaining findings into
mintable gate specs. (2) `grep`-census every T-relevant surface across `e2e/` + `test/` for an
existing assertion (file:line evidence below; a negative grep is itself the finding). (3) Read
every design lane's own oracle language (several already hand-author gate lists — cited
verbatim, not restated). (4) Run `npm test` (vitest) and `npx playwright test --project=smoke`
once each, live, and record the result.

---

## §0 What "a standing oracle" looks like here (the precedent shapes, read from the tree)

Four precedents recur across the suite; T's new gates should be recognizable instances of one
of them, not a fifth pattern:

| Precedent | File | Shape |
|---|---|---|
| **Resolver-level, library-anchored** | `test/view-accents.test.ts` | Calls the SAME pure function the UI consumes (`resolveViewAccent`), asserts a named numeric floor (`GRAPHICS_CONTRAST_FLOOR`) shared with the library's own WCAG leaf — the oracle and the implementation share the metric, not the pipeline. |
| **Format-agnostic live-DOM color read** | `e2e/smoke/accent-contrast-guard.spec.ts` | A 1×1 canvas resolves ANY computed color string (`oklch()`, `lab()`, hex) to sRGB bytes, then asserts a luminance/ratio threshold — sidesteps parsing every CSS color-4 syntax by hand. |
| **Real-path cold-load + settle-polled state** | `e2e/smoke/atmosphere-cold-load.spec.ts`, `url-color-precedence.spec.ts` | Seeds a precondition (`addInitScript` localStorage), navigates, `expect.poll`s a computed custom property to its terminal value — but (per F3/F12 below) the seed can substitute for real hydration, which is exactly the trap T must not repeat. |
| **Engine-honest, ceiling-not-target on software GL** | `e2e/smoke/perf/*-frame-budget.spec.ts` | Detects the renderer (`detectRenderer`/`isSoftwareGL`), asserts the TIGHT §6.2 budget only on real GPU, a generous freeze/liveness ceiling on SwiftShader — honest about what CI can and cannot measure, rather than silently downgrading the whole gate (though F4 shows even this has a permanence gap: the tight number is a hand-run snapshot, not a schedule). |

The oracle-shape lesson the plan-audit lanes already named (F3, F6, F12, F18): a green gate is
worthless if its predicate answers an EASIER, adjacent question (draw-issuance for pixel-truth;
one named surface for a population; a seeded session for real hydration; non-authoring coherence
for owner taste). Every new mint below states which axis it must NOT proxy away.

---

## §1 Post-close standing-suite health (run record, this session)

- **`npm test` (vitest)**: **68 files / 2158 tests — ALL GREEN** (3.51s wall). No regressions on
  the source tree the T lanes are all reading (confirms the sibling lanes' "zero source drift"
  claim from the test side, not just `git diff`).
- **`npx playwright test --project=smoke`**: **38/39 green, 1 red** on the full run —
  `e2e/smoke/views/gradient.spec.ts:57` *"stop add (bar click mints the ramp color), drag, and
  touch-true remove"* — `expect(pct).toBeGreaterThan(60)` received `0` (the dragged handle's
  aria-label percent read as 0 after the drag). **Re-run in isolation: PASSES** (15.2s, 1 worker).
  This is the config's own documented **host-CPU-contention flake class**
  (`playwright.config.ts` `workers: 1` rationale names color-space-switching /admin-walk/
  palette-feature/color-approve/color-reject as the known members under 2+-worker contention) —
  not a fresh regression, but a **new member of that class**, and notably it sits on the exact
  gradient-rail surface `t-gradient-surfaces` (T-6/T-21) found genuinely defective (rail
  render-string coupling, border-tile bleed). Recorded for the T corpus: (a) the suite is
  healthy — nothing here blocks T design work; (b) the gradient-rail wave should either confirm
  this stays a pure timing flake once its geometry cure lands, or — if the drag-to-aria-label
  path shares the render-string coupling F11/finding-4 names — re-verify it is not a symptom of
  the same defect under contention-induced timing shifts.

Both runs used the repo's own harness (`vitest`, `npx playwright test`), no product-code touched.

---

## §2 The gap census — by finding, grep-verified

Legend: **NONE** = zero standing assertion on the surface (grep-negative, cited). **PROXY** = an
oracle exists but certifies an easier/adjacent predicate (a Class-A gate per the plan-audit
taxonomy). **AT-RISK** = an oracle exists and is GREEN today, but T's own cure retires the thing
it certifies — the oracle must be re-authored in lockstep with the cure or it dangles on dead
code / re-fails the wrong reason. **ADJACENT-ONLY** = a real oracle exists nearby but does not
reach the finding's actual axis.

### §2.1 Load-sync + boot quality — T-1, T-25, T-26, T-27 (NONE / PROXY, the largest cluster)

- **Existing**: `atmosphere-cold-load.spec.ts` seeds `localStorage` via `addInitScript` (a
  synthetic precondition) then polls `--saved-bg` + a draw-call proxy for canvas presence
  (`webgl-appearance.ts` — F3 in `t-plan-audit-1` already proves `readPixels` was silently
  swapped for `drawArrays` counting). Neither the ORDER of the five clock families
  (`t-load-sync` §1.3) nor the ACTUAL rendered hue is asserted; grep for `hueSpread`,
  `colorEnergy`, `breathPeriod`, `WEBBING` anywhere in `e2e/`/`test/` = **zero hits**.
- **PROXY-1 (color-truth)**: mint a settle-stamped `readPixels` oracle that survives
  `preserveDrawingBuffer:false` (an explicit rAF fence at a known post-hydration frame, or a
  `preserveDrawingBuffer:true` test-build path) asserting the sampled centre pixel's hue family
  matches the DERIVED seed within a ΔE tolerance — not "non-black." This is F3's own cure
  direction (`t-plan-audit-1` §3), restated here as the mint T-1/T-25/T-27 all need.
- **PROXY-2 (real hydration, not a seeded session)**: the cold-load spec must drive the SAME
  `addInitScript`-free path a real returning user takes — i.e. assert against the natural
  `restoreFromStorage`/`useColorUrl` hydration timing, not a pre-seeded localStorage snapshot
  read before any app script runs. This is exactly F12's diagnosis (`t-plan-audit-2` §3): "the
  e2e seeded the session differently than real hydration… a green integration gate that doesn't
  drive the integrated timeline." Without this, a hydration-order regression (LS-2 in
  `t-load-sync`) can ship green forever.
- **NONE (order-invariance)**: no harness anywhere asserts that beat ORDER (ground → plates →
  field → instrument → ornament) holds when the CPU clock stretches — the exact `t-load-sync` §3
  law 4 ("order by gating, not by timing"). Nearest infrastructure: the perf harness's CDP
  long-task observer (`frame-budget.ts`) already knows how to attach to a page's timing; extend
  it (or a sibling `boot-choreography.spec.ts`) with a DOM-mark timeline probe + CDP CPU
  throttle, asserting beat N's mark always precedes beat N+1's regardless of throttle factor.
- **NONE (pacing/jitter, T-27)**: F4 (`t-plan-audit-1` §4) already diagnoses this precisely: the
  §6.2 budgets are unreachable under SwiftShader by construction, so the standing `smoke-perf`
  project asserts only freeze ceilings; the tight numbers are a one-time manual snapshot. T needs
  a **software-invariant pacing oracle** — inter-frame-delta VARIANCE or dropped-frame ratio,
  which is renderer-independent even when absolute p50 is not — as a new sibling in
  `e2e/smoke/perf/`, not a retune of the existing freeze ceiling.
- **NONE (variance-bracket, T-26)**: once the L2/A3 producer atoms ship (`hueSpread`,
  `colorEnergy`, scheme `lBand`), nothing asserts the derived field sits INSIDE the owner's
  bracket (analogous/0.7 < target < triad/0.82). Mint per the resolver-level precedent
  (`view-accents.test.ts`'s shape): call the atmosphere's own atom-resolution function directly,
  assert `hueSpread`/`colorEnergy` land inside the bracket's numeric envelope — a pure-function
  test, zero DOM.

### §2.2 Card-material ladder consistency — T-3, T-11, T-13b, T-18, T-24 (NONE — confirmed by grep)

- **Existing**: `grep -rn "card-material\|glass-opacity\|tier=\"wash\"" e2e/ test/` = **zero
  hits**. `t-plan-audit-2` F6 names this explicitly: *"the close inherited no card-alpha oracle,
  so W9's sweeps… could not catch it either… T-24 IS the missing gate."*
- **Mint**: a **card-material census oracle** — enumerate every `Card`-consuming pane (About,
  Browse, Palettes, Extract, Mix, Generate, Gradient, Admin, ConfigSlider) plus the named in-plate
  fixtures (`t-card-material` §1's table), read `background-color` + `backdrop-filter` via
  `getComputedStyle`, and assert each resolves to the ONE named rung (`plate`/`well`/`chrome`/
  `stage`) the T-24 ladder defines — not a fixed alpha, a RUNG-MEMBERSHIP test, both schemes, all
  9 panes. Shape: closest to `accent-contrast-guard.spec.ts`'s format-agnostic color read, but run
  as a CENSUS loop over a surface list rather than one fixed selector — this is the structural
  gap (`t-plan-audit-2`'s "named-site-gated, population-never-gated" pathology) the new oracle
  exists specifically to close.

### §2.3 Search seat + Tabs pilling — T-12, T-20 (NONE)

- **Existing**: `grep -rn "input-bar\|segmented-indicator\|SegmentedTabs\|bouncy-track" e2e/
  test/` = **zero hits**.
- **T-20 mint**: a geometry oracle — `indicatorBox ≈ activeButtonBox` (within ε px) across
  breakpoints × orientation × scheme × the anchor-vs-JS-fallback engine fork, exactly the
  acceptance clause `t-search-tabs` finding 4 already states in prose ("the indicator box ≡ the
  active button's box at every breakpoint × orientation × scheme × engine"). Shape: a
  `boundingBox()` comparison spec, sibling to `view-switch-frame-budget.spec.ts`'s geometry-probe
  style but asserting congruence instead of a duration.
- **T-12 mint**: fold into the §2.2 census (the search bar's rung membership per host pane is the
  same predicate, one more row).

### §2.4 Shadow-palette presence — T-13, T-19 (NONE — confirmed by grep, both the artifact AND the states)

- **Existing**: `grep -rn "ShadowPalette\|variant=\"shadow\|EmptyState\|No saved palettes\|NOTHING TO MIX\|EMPTY PLATE" e2e/`
  = **zero hits** in every case. `browse-loading.spec.ts` is the only nearby oracle and it locks
  the MID-FETCH (`developing`) state ("never a spinner") — orthogonal to and unaffected by the
  T-19 cure (confirmed: it never routes to a zero-result state, so this oracle is safe, not
  at-risk). The TRUE-EMPTY state has no standing assertion anywhere.
- **Mint**: a "palette-shaped-surface-in-all-cases" oracle, one spec per host (Extract's
  undeveloped plate, Mix→Palettes-tab-zero, `PaletteCardGrid`'s four consumers) — force the
  zero-result precondition (the existing `routeBrowsePalettesDelayed`-class fixture pattern,
  resolved empty instead of delayed), then assert (a) a ghost/shadow-palette DOM node is present
  (never a naked text-only `EmptyState`), (b) it is `aria-hidden`, (c) the caption text is present
  for AT. Direct sibling of `browse-loading.spec.ts`'s "never a spinner" shape, applied to "never
  a bare text plate."

### §2.5 Title/readout golden-scale + tabular locks — T-2, T-7, T-15 (NONE for the population axis; ADJACENT-ONLY for reactivity)

- **Existing**: `reactivity-instant.spec.ts` touches `ColorComponentDisplay` but only for
  wall-clock reactivity (drag → readout updates ≤ 50/100ms) — it says nothing about size, family,
  weight, contiguity, or per-space line count. `grep -rn "readoutReservation\|one line\|tabular-nums"
  e2e/ test/` = zero hits outside that one adjacency. The W4-2 gate text ("Lab inks ONE line at
  1440") that `t-title-typography` F4 says is superseded was never itself an automated
  assertion — there is nothing to retire in the suite, only in prose.
- **Mint 1 (host-independence)**: a resolver-shape oracle — assert
  `ColorSpaceSelector`'s computed `font-family`/`font-style`/`font-weight`/`font-size` are
  IDENTICAL across the picker host and the About host (kills the W4-1 weight-inheritance bug
  class — F2 in `t-title-typography` — structurally, by making host-divergence itself the
  red condition, not a specific weight number).
- **Mint 2 (per-space line-count lock, T-7)**: a POPULATION census — for each of the 17 catalog
  spaces + hex, render the readout at the 32rem stress width and assert the rendered line count
  equals the derived lock (`t-title-typography` F6's table: kelvin/hex/etc. = 1, rgb/hsl/lab/etc.
  = 2) — this literally IS the re-authored replacement for the retired single-surface "Lab, one
  line" spot-check the mandate names as superseded.
- **Mint 3 (tabular-digit-advance, F5)**: assert equal per-glyph advance width for `"0"`..`"9"`
  under `tabular-nums` on the shipped Fraunces build — CLAUDE.md's own "Tabs-class named-drift
  catch-all" idiom (`boot-smoke`) is the precedent shape this finding explicitly invokes; this is
  a font-asset regression class (self-hosting can silently regress to a non-`tnum` build) that
  only a rendered-advance measurement catches, never a CSS-declaration grep.
- **Mint 4 (T-15, family census)**: assert `PaletteCard`'s title computed `font-family` is
  Fraunces (the display voice), swept across every card-population site (Browse, Palettes,
  Mix-source-picker, admin) — one census, not a single-card spot-check, per F20's own diagnosis
  ("no gate censused 'every title surface speaks the display voice'").

### §2.6 Header shading at rest — T-23 (the corpus's OWN pre-specified gate — cite verbatim, mint only)

`t-header-shading` §4 already authored the complete gate list and states outright: **"e2e
coverage today: ZERO (`grep pane-header e2e/` = none)."** This is the single most fully
pre-specified oracle in the whole T corpus — no further design needed here, only the mint:

1. Rest-alpha floor: computed veil opacity ≥ the ratified floor at `scrollTop=0`, all 9 panes,
   both schemes.
2. No-band: bottom feather present at rest AND stuck; no hard box edge either scheme.
3. No-double-exposure: at no scroll offset does header ink composite over passing content below
   the ink-contrast floor (probe 24/48/80px on About + Gradient).
4. Compositor-only: zero layout-channel animation on the scroll timeline (CDP Layout track flat).
5. Engine/PRM coherence: rest appearance identical on SDA and non-SDA engines and under PRM.
6. One grammar: no in-card sticky surface paints an opaque un-feathered band or out-stacks
   `--z-header`.

### §2.7 Blob placement + hover — T-8 (PROXY — the existing gate certifies geometry a defect can hide inside)

- **Existing**: `webgl-goo-blob.spec.ts` asserts bbox ≥100×100 + not-off-screen (the S-4 smudge
  floor) — real, and it must be KEPT. But F14 (`t-plan-audit-2` §3) proves the geometry gate went
  green while the About-card burial the same wave claimed to kill was still visibly present —
  "the burial gate was self-certified against a demo-geometry screenshot, not the About host the
  owner actually looks at." The gate answers "is the blob big enough and on-screen," not "is it
  SEATED where the SEAT law says."
- **Mint 1 (containment identity)**: assert orbit-reach (`orbitRadius + satelliteRadius`) ≤ 0.5
  of the wrapper AND the wrapper's `top`/`right` resolve to `--blob-seat` — `t-blob-hero`'s own
  seat arithmetic (§2), turned into a computed-property + geometry assertion, replacing the old
  bbox-only predicate with the SEAT law's actual numbers.
- **Mint 2 (z/occlusion)**: `elementFromPoint` at the satellite band's reach never resolves to
  `glass-dock`/`dock-layer-item-host` — promote `t-blob-hero`'s own occlusion-probe method (F-2)
  from a one-off scratchpad script into a standing spec.
- **Mint 3 (hover-mood legibility)**: a frame-diff metric (mean abs RGB delta, the
  `active-probe.cjs` method already built for this lane) asserting a NAMED minimum delta on
  hover-in across mood transitions — today only a session-local probe script, not a gate.

### §2.8 Menu voice reversal — T-10 (AT-RISK — a green oracle that must SHRINK, not just gain a row)

- **Existing**: `test/view-accents.test.ts` (13 tests) is green today and asserts, among other
  things, that all 9 `PRIMARY_VIEW_SHIFTS` resolve chromatically-distinct, ≥3:1-contrast tokens —
  i.e. it certifies the CORRECTNESS of the exact per-item-hue machinery `t-nav-dropdowns` F4 says
  must be EXCISED (`resolveViewAccentTokens`, `PRIMARY_VIEW_SHIFTS`, `PRIMARY_VIEW_IDS`,
  `entryAccent`) once the menu goes ink. This is the two-directional form of an oracle gap: not
  "nothing tests it," but **"the standing oracle is a live invariant on code T is about to
  delete."**
- **Mint/retire together**: when T-10 lands, this test file must SLIM in the same commit — the
  "nine primary views"/"achromatic picks fan out chromatically"/"low-C floor" tests either delete
  (if `PRIMARY_VIEW_SHIFTS` is gone) or re-target `resolveViewAccent`'s CURRENT-view-only call
  shape (which survives per F4). Leaving the 13-test file untouched after the excise means either
  (a) a compile break (importing a deleted export) or (b) — worse — the test silently keeps
  passing against dead code nobody renders, exactly the zero-consumer pattern F9 already found
  once (the `specimen` skeleton variant). `t-nav-dropdowns` F4 already names the slim target
  ("the 13-test oracle… slims to the current-accent + seal-ink rows").
- **T-17 mint (previews, separate from the reversal)**: `grep` for preset/harmony preview chips
  in `e2e/` = zero. Mint a byte-identity oracle: the preview chip's rendered stops must equal
  `generatePalette(count, preset, harmony, seed)`'s live output — F5's own "truth law." Shape:
  `test/round-trip.test.ts`'s byte-identity pattern, generalized from a pure-function test to a
  live-DOM-chip-vs-pure-function comparison.

### §2.9 Outline die-rim + pseudo-dropdown clip — T-28, T-29 (NONE)

- **Existing**: `grep -rn "dock-seal\|action-bar-toggle" e2e/ test/` = **zero hits**.
- **T-28 mint**: if abrogated (the lane's own recommendation) — a NEGATIVE watch: computed
  `.dock-seal` border-style resolves to `none` (an E-3 legacy-resurrection guard, the same class
  as a "this selector must stay dead" regression lock). If the fitted alternative ships instead —
  a ring-traces-silhouette geometry assertion (ring radius samples track the WatercolorDot's own
  `activeBorderRadius` within a small tolerance, not a fixed circle).
- **T-29 mint**: a settle-state assertion — after the presence-slot's `transitionend`, computed
  `overflow` on `.action-bar-toggle-inner` is `visible` and the hover capsule's shadow renders
  whole (bounding box exceeds the old clip box by the measured overhang) — the exact measured
  quantities `t-outline-dropdown-clip` §2 already recorded (4.3px L/R, 1.6px T/B) turned into an
  assertion instead of a one-off probe.

### §2.10 Liquid-glass motion cascade — T-14 (NONE for the computed-cascade axis — the exact axis that hid the defect)

- **Existing**: nothing asserts computed `transition-duration`/`timing-function` anywhere in
  `e2e/`/`test/`. This matters because F22 (`t-plan-audit-2` §2.1) shows the failure mode
  PRECISELY: the W3-5 `@theme` alias was asserted (previously, informally) by TOKEN — but a
  producer dist clobber (`layer(components)` re-declaring the Tailwind default) wins the cascade
  silently, so a token-level check would still be green today. Only a **computed-style** read
  catches it.
- **Mint**: a computed-cascade census — for a fixed list of interactive surfaces (card hover,
  slider thumb, dock icon, pane swap), assert `getComputedStyle(el).transitionDuration` /
  `.transitionTimingFunction` equal the HOUSE tokens (`--duration-fast`/`--ease-standard` or the
  relevant spring), not the Tailwind `150ms cubic-bezier(.4,0,.2,1)` literal. Shape: promote
  `t-transitions-liquid`'s own live CSSOM-walk method (already how F1 was found) from a
  session probe into a standing spec — this is the one gate in this whole census that must
  assert a COMPUTED CASCADE OUTCOME rather than a source-level token, because the defect class
  lives exactly in cascade order, not in any one file's declared value.

### §2.11 Easing pane composition — T-22 (NONE at the UI level; library round-trip only)

- **Existing**: `test/easing.test.ts`, `test/parsing-easing.test.ts`,
  `test/easing-export-stability.test.ts` exercise the LIBRARY's easing math and serialization —
  real, but nothing drives the `GradientEasingEditor`/`EasingPicker` DOM at all (`grep -rln
  "EasingPicker\|GradientEasingEditor" e2e/` = zero).
- **Mint**: a composition oracle on the live component — (a) canvas aspect-ratio ≈ 1 across
  container widths (kills the 132px-in-288px letterbox, `t-easing-pane` finding 2's own numbers);
  (b) a material census inside the row (no more than ONE cartoon-stamped surface, per finding 3);
  (c) travel-dot rest-state: no `cx="1"`/`cx="0"` doubled-endpoint dot after playback settles
  (finding 4); (d) one-literal law: the head shows a preset NAME when named, the raw
  `cubic-bezier(...)` literal only when custom, never both simultaneously with the readout
  (finding 6).

### §2.12 Remaining rows (T-4, T-5, T-6, T-9, T-16, T-21) — NONE / ADJACENT-ONLY

- **T-4/T-5 (channel strip + contrast)**: no oracle asserts the sliders' rendered contrast ratio
  anywhere (`grep -rn "wcagContrastRatio" e2e/` = zero — the library function is only vitest-side
  today). Mint: a per-surface luminance/ratio probe (the `accent-contrast-guard.spec.ts` shape,
  generalized to the console sub-card's ACTUAL computed ground rather than a fixed constant) plus
  a live-readout-presence assertion for T-4's channel-strip meter.
- **T-6 (gamut-ink netting)**: zero references to `gamut-ink`/`WEBBING` anywhere in `e2e/`/`test/`
  (confirmed). Mint: a computed hatch-vs-paper luma-delta assertion (`getComputedStyle` read + a
  1×1-canvas resolve, cheap) with a floor derived from `t-gradient-surfaces`' judged envelope
  (light ≥59/255, dark ≥45/255 after the recalibration) — currently nothing prevents this
  register from silently drifting back toward "subtle" on a future retune.
- **T-9 (banner → dock lamp)**: `DevMisconfigBanner` itself has no standing spec today (`grep -rn
  "DevMisconfigBanner\|misconfigured" e2e/` = zero) despite being a deliberately-designed W0-1
  affordance. Mint (once the re-home lands): an oracle on the NEW surface — the dock status lamp
  renders the correct variant (`misconfigured` filled / `unavailable` open-ring / absent) under
  each precondition, `import.meta.env.DEV`-gated, using the same `addInitScript`-precondition
  shape `atmosphere-cold-load.spec.ts` already demonstrates.
- **T-16 (Regenerate placement)**: zero structural assertion that the button is a DOM descendant
  of the palette-plate root rather than a sibling. Mint: a trivial containment check
  (`locator("button", {name:"Regenerate"})` resolves inside the `PaletteCard`/plate root, not
  beside it) — cheapest oracle in this whole census, currently entirely absent.
- **T-21 (gradient rail geometry)**: the existing §6.1 round-trip spec (7/7 green,
  `gradient.spec.ts`) is real but — per F11 (`t-plan-audit-2` §2) — its assertions sit "outside"
  the rail-length/border-tile-bleed/rung-ruler defects `t-gradient-surfaces` found; it never
  reads rail pixel geometry. Mint: a silhouette-extent oracle (ramp paint reaches the exact
  border-box edges, no border-tile bleed at either terminus — the pixel-precise defect
  `t-gradient-surfaces` finding 5 measured) and a rung-row extent oracle (interior-only vs.
  full-span, per finding 6's grammar decision). **Also note** (§1): this exact spec file is the
  one that redenned under contention this session — any new geometry assertions added here should
  be written to tolerate the same host-CPU class the config already isolates other specs against
  (or graduate into a serialized project if timing-sensitive).

---

## §3 The cross-cutting reading (why this shape, not 29 unrelated gaps)

The gaps cluster into exactly the two failure modes the plan-audit lanes already diagnosed at
the META level (F18/F6/F12): **(a) a named-surface gate that never became a population census**
(card-material, title-voice, motion-cascade, tabs-pilling all read as "the ONE site was checked,
the population never was"), and **(b) a real-path gate substituted for an easier proxy**
(draw-calls for pixels, a seeded session for hydration, a token declaration for a computed
cascade outcome, bbox for seat-law arithmetic). Every mint above is one of these two repairs
applied to a specific surface — there is no third failure shape in this census. Three findings
(T-23, T-8's occlusion probe, T-26's bracket) are **already fully specified in prose** by their
own design lanes and need no further design, only authorship; the rest need the shape stated
here before a wave can implement them. One finding (T-10/`view-accents.test.ts`) is the census's
only **AT-RISK** row — a currently-green oracle that must shrink in the same commit as its
cure, or it either breaks the build on a deleted export or, worse, keeps certifying dead code.

**E-7 binds directly here**: the hardening/critique wave's "coherence pre-filter, owner
ratification as terminal authority" model (`t-plan-audit-2` F18's cure direction) is necessary
but not sufficient — a coherence review cannot see a cascade clobber or a population gap either;
only a MEASURED census can. The oracles this lane names are what makes E-7's critique passes
re-runnable rather than another one-time non-authoring taste snapshot.

---

## §4 Method notes

- All grep census commands run from repo root against the live `e2e/` and `test/` trees at this
  head; negative results (zero hits) are the load-bearing evidence for every **NONE** verdict and
  are individually reproducible.
- The vitest and Playwright runs in §1 used the repo's own scripts (`npm test`,
  `npx playwright test --project=smoke`) with zero product-code changes; the owner's `:9000` was
  never touched (the smoke fleet boots its own `:8090`/`:8091` per `playwright.config.ts`).
- This lane deliberately does not re-derive per-surface root causes (colors, geometry, contrast
  numbers) already established by the 18 sibling design lanes — every number cited above is
  attributed to its authoring lane.
