# t-perf-implications — the §6.2 perf surface of every T finding

**Lane class**: forensics / development-only (zero product-code changes). **Scope**: the T
mandate's design findings do not get a perf-neutral pass by default — this lane evaluates each
one's actual frame/bundle/main-thread surface against the **§6.2 standing budgets**
(`docs/tranches/S/FINAL.md §6.2`) plus the **first-ever instrumented Lighthouse figures**
(`t-ci-lighthouse-record.md`, run `28836873580`), and drafts the gate riders the T waves need.
**Substrate**: `tranche-t` = master @ `cc4f4fa` + the T corpus docs (`git diff --stat cc4f4fa..HEAD
-- src/ demo/ api/` empty — confirmed by sibling lanes, re-spot-checked here). **Method**: (1)
read `t-transitions-liquid` (T-14), `t-blob-hero` (T-8), `t-load-sync` (T-1), `t-coloc-{components,
composables-lib,src,backend}` (E-1), `t-ci-lighthouse-record`, `t-oracle-gaps` in full — this lane
does not re-derive their design content, it evaluates the PERF AXIS across all of them. (2) A
fresh, independently-reproduced measurement of the built `dist/gh-pages` artifact (this session,
same head) to corroborate the recorded §6.2/Lighthouse numbers rather than merely cite them. (3)
Read the standing perf oracles (`e2e/smoke/perf/*.ts`, the mobile blob gate, the idle-park spec)
line-by-line to find the exact metric shape each T finding lands on.

---

## §0 The standing law + a fresh corroborating measurement

**§6.2 budgets** (`S/FINAL.md`): drag p50 ≤20ms · view-switch first-frame ≤100ms (long task
≤50ms) · idle p50 ≤13ms (blob mounted) · 0 long tasks · JS eager gzip ≤280 KiB · render-blocking
CSS gzip ≤120 KiB. Standing status at S close: JS eager **RE-BASELINE** (347.9 KiB, 68 KiB over —
**RP-2, still open**), CSS **MET** (86.5 of 120, 33.5 KiB headroom), frame budgets **carried
green** (drag 8.3ms, view-switch 8.3ms/idle 8.3ms at W7 close).

**Independent re-measurement, this session** (`dist/gh-pages`, built same head, gzip -9 by hand —
not the recorded artifact, a fresh one): `index-DaD-HY3x.js` 602,599 B raw / 203.7 KiB gz ·
`glass-ui-B9nmGSix.js` 380,512 B raw / 109.5 KiB gz · 5 small shared chunks statically imported
from the entry (`dispatch`, `color-utils`, `packrat-entry`, `createLucideIcon`,
`useDocumentVisibility`, `prng` — 11.8+21.5+4.7+1.6+0.28+0.23 KiB gz) → **JS eager total 347.7
KiB gz** (vs the recorded 347.9 — matches within gzip-level noise, so the RP-2 deficit is live,
not stale). `index-CBcZXjoo.css` 88,590 B gz = **86.5 KiB** (matches exactly). `vendor-katex`
(258.9 KiB raw / 74.6 KiB gz) and `vendor-highlight` (32 KiB raw / 11.7 KiB gz) confirmed **lazy**
— real static `import{...}from` bindings only inside `AboutPane`/`katex-*` and `GradientPane`
chunks respectively; their filenames also appear inside the entry chunk, but only as string
literals in a Vite `__vitePreload` dependency-manifest array (modulepreload hints fired at the
moment the async import actually triggers, NOT an eager fetch) — checked so this lane does not
manufacture a false regression finding out of a build-tooling artifact.

**The first-ever production Lighthouse figures** (`t-ci-lighthouse-record.md`, run
`28836873580`, sha `80c5888`, simulated mobile/slow-4G/4x-CPU): **LCP 5563 ms (≤2500 gate, ~2.2×
over)** · **TBT 5618 ms (≤300 gate, ~19× over)** · perf score 0.36. These landed the SAME week as
this mandate and are the only page-level (not single-interaction) main-thread measurement that
exists anywhere in the repo. Every finding below is read against BOTH registers — the
per-interaction §6.2 e2e gates AND this page-level field-budget-on-lab-data figure — because they
are the same artifact measured at two different apertures, and the T corpus's design lanes
currently reason about only the first.

---

## §1 Findings

### PI-1 — The T mandate's entire "more richness" program lands on a production build already ~19× over its own interactivity budget, with zero named acceptance criterion for holding that flat [P0 — the framing finding]

- **Evidence**: `t-ci-lighthouse-record.md` — TBT 5618ms vs ≤300ms gate (measured 3× in the run
  of record, all ≥5618ms); LCP 5563ms vs ≤2500ms. Root payload named there: `index.js` 601.6 KiB +
  glass-ui 380.5 KiB + vendor-katex 258.9 KiB — corroborated live in §0. Meanwhile the T corpus's
  own findings are additive: T-8 asks for MORE blob/satellite compute; T-1 asks for a
  choreographed multi-beat entrance; T-6 asks for a MORE visible gradient netting register; T-17
  asks for dropdowns with live color-preview swatches; T-14 retunes durations LONGER in places
  (0.3s squeezed → a spring's true 0.4s settle, R2). None of the 24 T-# rows or the two structural
  edicts (E-1/E-2) name "does this change total main-thread or GPU work" as an acceptance axis —
  every design lane's acceptance criteria are taste/geometry/contrast, not cost.
- **Root cause**: the Lighthouse instrumentation is BRAND NEW (`t-ci-lighthouse-record.md`: "no
  capture ever existed" before this week) and was authored in an operational/CI lane running
  parallel to, not integrated with, the 20+ design lanes that generated T-1..T-29. The design
  corpus and the perf corpus are contemporaneous but disjoint.
- **Owner**: joint — demo (every design lane whose cure adds render/compute work) + the T
  synthesis pass (the structural gap: no cross-cutting cost ledger exists).
- **Cure direction (gestalt)**: the T plan's synthesis stage adds a **standing cost ledger**
  alongside the taste ledger — for every implementation wave, a required row: "main-thread work
  delta (measured, not asserted) vs the Lighthouse run of record." This is not a new gate number
  (the LCP/TBT budgets are themselves under owner-adjudication per `t-ci-lighthouse-record.md`'s
  own "open adjudication" note — lab-mobile thresholds on a KaTeX+WebGL SPA may need
  re-specification, not just chasing) — it is a discipline: no wave ships a richness increase
  without a same-commit Lighthouse re-run showing the delta, honestly recorded whether it moves
  the needle or not (the existing "honestly red, no gate weakened" posture, extended to every T
  wave rather than only the close gate).

### PI-2 — T-1's "gate appearance, not timing" entrance law is designed with zero reference to which DOM node IS the Lighthouse LCP candidate — the same mechanism that fixes "arrival order" can trivially worsen "arrival speed"

- **Evidence**: `t-load-sync.md` §3 law 3/4 ("every deferred element reserves its footprint at
  beat time and MATERIALIZES through the house grammar on completion... no element may pop"; "each
  beat arms on the PRIOR beat's completion event") + the beat sheet (B1 plates 180–740ms, B2 field
  ≤1.2s, B4 blob ≤1.5s). Nowhere in that lane, `t-title-typography`, or `t-card-material` is the
  actual Lighthouse LCP element identified. The production LCP is already 5563ms (~2.2× over) with
  the CURRENT (uncoordinated, "pops"-style) arrival; the proposed cure changes WHEN elements
  materialize but the two candidate mechanisms it names — "gated" (mount-held until a beat fires,
  e.g. `v-if`/async-chunk-resolved) vs "reveal" (already-painted DOM, opacity/transform overlay
  only) — have OPPOSITE effects on LCP. A `v-if`-gated About card (LS-4's own proposed cure: give
  it the same `vj-morph` entrance the picker card has) DELAYS the paint of whatever text Lighthouse
  is currently crediting as LCP; a reveal-only treatment does not.
- **Root cause**: "arrival choreography" (motion design, judged by eye) and "arrival latency"
  (Lighthouse LCP, judged by a lab timer) were audited by different lanes in the same week and
  never reconciled — the design lane's own vocabulary ("materializes," "arms," "pops") does not
  distinguish the two mechanisms because from a MOTION perspective they look identical (something
  appears with a transition); from a PERF perspective they are opposite interventions.
- **Owner**: joint — demo (the beat-sheet implementation choice) + the LS-7 real-GPU probe lane
  (already mandated to instrument cold-load; extend its scope one line).
- **Cure direction (gestalt)**: before the load-sync wave implements ANY beat, identify the
  actual LCP element (`PerformanceObserver('largest-contentful-paint')` on the built bundle, both
  schemes) and bind it to a **reveal-only** contract as a named law: whichever beat owns the LCP
  candidate must paint its DOM at B0 (pre-paint or immediately at mount, unconditional on chunk/
  idle timing) and treat its OWN beat-transition purely as a post-paint visual overlay (opacity/
  transform on already-rendered content) — never a mount gate. Every OTHER beat may use either
  mechanism freely; only the LCP-owning one is constrained. This is a one-line addition to
  `t-load-sync.md` §3's law list, not a competing design — the perf lane's contribution is naming
  the constraint the choreography lane didn't know it needed.

### PI-3 — T-8's ink-law derive is NEW per-pick compute inside the exact fan-out the drag-frame-budget gate measures (12ms of headroom); the broader hover/satellite work has no frame-budget gate of its own at all

- **Evidence**: `e2e/smoke/perf/drag-frame-budget.spec.ts` docstring — the gate drives "the L-
  channel slider scrub... which fans a single channel change out to the spectrum + all four
  channel tracks + the numeric readout + the aurora seed + **the blob palette** every step," §6.2
  ≤20ms p50, **measured 8.3ms on the built bundle (12ms of headroom before the gate reds)**.
  `t-blob-hero.md` F-4's cure direction threads a NEW per-derive contrast floor into that exact
  path: "the hero derive threads a contrast floor against the plate — |ΔL(bead body, card
  plate)| ≥ a named threshold, **consumer-computed**" — i.e. one more computation added to the
  SAME coalesced derive this gate already measures at 8.3/20ms. Separately, `t-blob-hero.md` §3's
  whole choreography table (Approach/Attention/Play/Celebration beats — new satellite-emergence
  math, curvature-bounded deformation, a legibility-floor swell) runs during pointer hover/drag,
  which is a state **neither** of the two standing blob-adjacent gates measures:
  `idle-frame-budget.spec.ts` explicitly measures the PARKED state only (≤13ms p50, blob mounted
  but idle ≥2000ms); `drag-frame-budget.spec.ts` measures the SPECTRUM canvas scrub, with the
  blob's cost folded in only as a downstream consumer of the coalesced color derive, not as its
  own hover-interaction measurement (pointer-move-driven satellite/deformation math is a
  DIFFERENT, uncoalesced code path per `HeroBlob.vue:26-28`'s `@pointermove` binding).
- **Root cause**: the two existing blob-adjacent gates were authored (W3) to answer "does the
  color fan-out stay cheap" and "does the idle park hold" — both real, both still needed — but
  neither was ever meant to cover "is the NEW interactive-hover render path itself cheap," because
  that path didn't have this much work in it yet. T-8 is precisely the mandate that adds it.
- **Owner**: joint — producer (the engine-side satellite/deformation compute, GAP-L5 rows A–D) +
  demo (the ink-law derive, the consumer-side hover moment bindings).
- **Cure direction (gestalt)**: (a) the ink-law contrast-floor solve must be a closed-form ΔL
  check (not an iterative gamut-style search) specifically BECAUSE it now lives inside a
  12ms-headroom gate — state this as a hard constraint on the F-4 cure, not a performance nicety;
  re-run `drag-frame-budget.spec.ts` on the built bundle the moment the ink-law lands, before any
  other T-8 work, as a canary. (b) mint a NEW standing gate — a hover-active/satellite-emergent
  frame-budget spec, sibling to `idle-frame-budget.spec.ts`, that drives a sustained
  `pointermove` sweep over the blob (mirroring `t-blob-hero.md`'s own `t8-hover-probe.mjs` method,
  promoted from a session script to a standing spec per `t-oracle-gaps.md` §2.7 Mint 3) and
  asserts a frame p50 ceiling for that state — the one interactive register T-8 targets that no
  gate currently owns.

### PI-4 — T-8's own cure kills the exact per-viewport constants two HARD e2e gates are keyed to; landing it without re-deriving those gates in the same commit makes the suite red for the wrong reason

- **Evidence**: `t-blob-hero.md` §2/F-9 — "the 8rem/1.75rem hand arm DIES," replaced by ONE
  formula (`--blob-fp: clamp(9rem, 26cqi, 13rem)`) "at every viewport." But
  `e2e/smoke/mobile/blob-presence-mobile.spec.ts` is a HARD gate (not soft-ceiling'd) whose
  assertions are literally keyed to the dying arm: `expect(box.width).toBeGreaterThanOrEqual(180)`
  / `.toBeLessThanOrEqual(240)`, commented explicitly as "the <lg canvas width (8rem-law floor)"
  and "(desktop-law leak ceiling)." The SEAT law's own cqi formula at a 390px viewport yields a
  DIFFERENT footprint than 8rem, so this spec fails by construction the moment T-8 lands — not
  because containment regressed, but because the oracle is asserting a law the wave deliberately
  retires. Separately: the settle/park-latency contract (`t-blob-hero.md` §3 row C, "the park
  countdown keys off the engine's `settled` signal, never wall-clock") interacts with a constant
  — `BLOB_IDLE_MS`/`N` = 2000ms, `PARK_SETTLE_MS` = N+1500, `SAMPLE_WINDOW_MS` = N+500 —
  **independently duplicated in three files** (`idle-frame-budget.spec.ts`,
  `blob-presence-mobile.spec.ts`, `webgl-goo-blob-idle.spec.ts`), each with a comment asking the
  next editor to "keep in lock-step" by hand, no shared constant. If satellite-orbit-to-completion
  genuinely needs a longer settle before park (plausible: row C's own text implies quiescence must
  wait for a "visible orbit" to actually complete), the wave must edit three files identically or
  the `SAMPLE_WINDOW_MS must exceed N` runtime-asserted contract (already a documented `expect(...)
  .toBeGreaterThan(N)` in `idle-frame-budget.spec.ts`) becomes internally consistent but WRONG
  everywhere it isn't updated.
- **Root cause**: the mobile gate's numeric floor/ceiling were authored as the PROOF that the
  <lg hand-arm law was live (W6-4) — a correct oracle for a law the SAME mandate now reverses;
  the park-latency constant was never centralized because the idle-park mechanism was authored
  once (W3-3) and copy-pasted into two later specs (W6-4 mobile, T-8's predecessor) rather than
  imported from one source.
- **Owner**: demo (both the SEAT implementation and its oracle's re-derivation are one unit of
  work — E-1's own "no legacy" law forbids leaving a stale magic-number assertion standing).
- **Cure direction (gestalt)**: (a) `blob-presence-mobile.spec.ts`'s width bound is re-derived
  from the SEAT formula at build/runtime (compute the expected canvas width from `--blob-fp`'s
  resolved cqi value at the test's own viewport, assert against THAT, not a hand-typed 180/240)
  — this is the containment-identity mint `t-oracle-gaps.md` §2.7 Mint 1 already names, restated
  here as a HARD prerequisite, not a nice-to-have, because the current gate is not merely
  incomplete, it actively asserts the wrong law once T-8 lands. (b) centralize
  `BLOB_IDLE_MS`/derived windows as ONE exported constant (e.g. a fixture module `e2e/smoke/
  fixtures/blob-timing.ts`) imported by all three specs, so a future settle-timing change is a
  one-file edit with three call sites, not a three-file hand-sync — this is exactly the class of
  duplication the T-8 park-only-from-settled cure (row C) is about to stress-test.

### PI-5 — T-14's own diagnosis (F4: layout-triggering "morphs") is the ONE row in the retune table whose SEQUENCE matters for the frame budgets; retuning its curve/duration before its property lands a regression from the cure itself

- **Evidence**: `t-transitions-liquid.md` F4 — `vj-morph`/`vj-celebrate` collapse legs animate
  `max-height` (`animations.css:104-139`), the dock action-bar slot animates
  `grid-template-columns` (`Dock.vue:295-305`); F4's own text: "a layout-driven collapse
  re-layouts every frame — the jitter arm of §0.3's 'too jittery'... these 'morphs' are
  constitutionally spring-less." The retune table (§2) lists R6/R7 ("compositor collapse per
  PKT-3 recipe; curves unchanged") as ORDINARY rows alongside R2–R5/R9/R11 (pure curve/clock
  fixes) — nothing in the table's presentation flags that R6/R7 have a HARD producer-recipe
  dependency (PKT-3, not yet answered) while the others don't.
- **Root cause**: the retune table is organized by transition SITE, not by perf-dependency class;
  a reader implementing "the T-14 wave" in table order has no signal that R2–R5/R9/R11 are safe to
  land immediately while R6/R7 are blocked on an unresolved producer packet, and that landing a
  LONGER settle duration on a still-layout-triggering property (the exact anti-pattern the wave
  exists to fix elsewhere) makes the SAME property re-layout for MORE frames, not fewer.
- **Owner**: demo (wave sequencing) + producer (PKT-3, the compositor collapse recipe).
- **Cure direction (gestalt)**: split the T-14 implementation wave into two tranches by
  perf-dependency, not by cosmetic grouping — Tranche A (R1–R5, R9–R11: pure
  curve/clock/channel-law fixes, zero property-type change, safe against every §6.2 budget
  immediately) ships first; Tranche B (R6/R7: the compositor-collapse rows) is EXPLICITLY GATED on
  PKT-3 landing (or an equivalent in-repo `interpolate-size`/`calc-size()`/JS-measured-transform
  recipe) — until then, R6/R7 are left UNTOUCHED (not retuned) rather than retimed on the wrong
  property, because retiming a layout-thrashing collapse to a longer, truer spring clock is a
  strict regression against the "0 long tasks" / idle-p50 budgets on any view that fires one mid-
  measurement (the admin list expand, the dock action-bar toggle) — worse than leaving it at the
  current (already-bad, but at least short) 0.3s decelerate.

### PI-6 — The colocation edict's mass file movement is chunk-graph-neutral by construction; its own named collision-mitigation (barrel-per-promoted-folder) is the one part that genuinely risks the JS/CSS budgets, because Vue SFC scoped CSS cannot be tree-shaken through a re-export chain

- **Evidence**: `vite.config.ts:259-270` — the ONLY explicit chunk-splitting rule
  (`codeSplitting.groups`) matches `test: /node_modules[\\/](katex|highlight)/` — regexes over
  installed-package paths, untouched by any move under `demo/@/components/custom/`. The REST of
  the chunk graph is Rolldown's automatic per-`import()`-boundary splitting, keyed to the 11
  actual dynamic-import call sites (`usePaneRouter.ts`'s 9 `defineAsyncComponent`s,
  `AboutPane.vue`'s 11 per-space markdown imports, `ColorPicker.vue:124`'s `HeroBlob`) — none of
  which the colocation census (`t-coloc-components.md`) proposes moving or converting. A pure
  path-rewrite codemod (move file, update every importer's specifier to the new path, same module
  identity) is therefore chunk-graph-NEUTRAL: confirmed by re-deriving Rolldown's actual splitting
  inputs from the built artifact in §0, not asserted from documentation alone. **The one named
  risk is self-inflicted**: `t-coloc-components.md` §5's own mitigation for the "dozens of
  identically-named `composables/`/`constants.ts`/`index.ts` files" collision hazard is "mandate
  that every promoted folder re-exports through a local `index.ts` so cross-tree imports name the
  folder, not the leaf." If that convention is implemented as blanket `export * from "./Foo.vue"`
  (or a barrel that re-exports every sibling in a cluster, e.g. the proposed `palette-browser/
  card/index.ts` covering `PaletteCard`+`PaletteCardMenu`+`PaletteCardSwatches`+…, F4/F7), every
  consumer that imports through the barrel pulls the WHOLE cluster's module graph — and Vue's SFC
  compiler emits each component's `<style scoped>` as a side-effecting CSS import with no export
  binding, which Rollup/Rolldown's tree-shaking cannot remove even when the JS export it's
  attached to goes unused. This lands on a CSS gate with only **33.5 KiB of headroom** (86.5 of
  120) and a JS-eager gate **already 68 KiB over its own ceiling** (347.7 KiB confirmed live, §0)
  — i.e. a large mechanical refactor (§5's own blast-radius table: ~60+ internal +9 external sites
  for `palette-browser/` alone) executing with zero margin for the exact regression class barrels
  are famous for.
- **Root cause**: the colocation lane's mitigation was designed for NAVIGABILITY (basename
  collisions, editor/grep ambiguity) — a real problem — without considering that the fix
  (barrel-per-folder) and the bundle-size budget pull in opposite directions once the barrel
  re-exports more than the caller needs.
- **Owner**: demo (the wave that executes the codemod + authors the barrel convention).
- **Cure direction (gestalt)**: the barrel convention is **named re-exports only, never `export *`**
  — each promoted folder's `index.ts` re-exports exactly the symbols external consumers use today
  (traceable from the same reverse-dependency census `t-coloc-components.md` already built), never
  the whole sibling cluster; internal siblings within the SAME feature continue to import each
  other by direct leaf path (no barrel indirection needed inside one feature). As a **gate rider**
  for the colocation wave specifically: a bundle-diff assertion — gzip bytes per NAMED chunk
  (`index`, `glass-ui`, any pane chunk touched), measured on `dist/gh-pages` immediately before and
  after the codemod, asserted unchanged within a small noise band (e.g. ±2%) — because nothing in
  the current suite (§6.2's frame-budget specs measure INTERACTION cost, not bundle bytes; the
  JS/CSS gzip rows are checked only at close) would catch a barrel-driven bloat until the next
  incidental Lighthouse run. This is a NEW standing check this lane recommends minting, not a
  restatement of an existing one.

---

## §2 Per-T-finding perf-surface reconciliation (the requested table)

| T-# | Perf surface | §6.2 / Lighthouse interaction | Verdict |
|---|---|---|---|
| **T-1/T-25** (load sync) | Cold-boot arrival timing/order | No standing gate for cold-boot at all; the ONLY page-level measurement is the Lighthouse LCP/TBT figures (already failing). The beat-sheet's "gate, don't pop" law can cut either way for LCP depending on mechanism (mount-gate vs reveal-only) — **PI-2**. | Needs an LCP-identity check + a reveal-only law for the LCP-owning beat before implementation. |
| **T-8** (blob hover/satellite) | Per-frame CPU (JS FSM/derive) + GPU (shader/uniform) cost, both idle-parked and hover-active | Idle-parked: governed by the ≤13ms p50 gate (headroom: 13 − 8.3 = 4.7ms before red). Hover-active: **ungated** (PI-3). The ink-law derive lands inside the drag-gate's 12ms headroom (PI-3). The SEAT's cqi footprint formula invalidates the mobile gate's hard-coded bounds (PI-4). | Mint a hover-frame-budget gate; keep the ink-law derive closed-form; re-derive the mobile gate + centralize the park-latency constant in the SAME commit. |
| **T-14** (all card transitions → liquid curves) | Per-frame layout vs compositor cost on collapse/morph legs; click-to-first-frame on pane swap | View-switch first-frame (≤100ms) survives R2/R3 UNCHANGED as long as the W3-4 one-frame-deferred-mount mechanism is preserved (confirmed compatible — the lane's own F2 cure direction already keeps it). R6/R7 (layout-triggering collapses) are the one perf-dependent row — **PI-5**. | R1–R5/R9–R11 ship freely; R6/R7 gated on PKT-3 (or left untouched, not retimed). |
| **E-1 colocation** (all lanes) | Chunk-graph topology; CSS/JS eager-bundle bytes | Neutral by construction for pure path-rewrites (confirmed against the built artifact, §0/PI-6). The ONE risk is the lane's own barrel-per-folder mitigation, landing on a CSS gate with 33.5 KiB headroom and a JS gate already 68 KiB over. | Named re-exports only; mint a bundle-diff gate rider for the colocation wave. |
| **T-6** (gradient netting intensity) | New Tailwind-JIT utility classes; a `getComputedStyle` hatch-vs-paper luma delta at runtime (cheap, per `t-oracle-gaps` §2.12's proposed mint) | Marginal CSS-byte cost only (a handful of utility classes); no frame-budget surface (`background-image`/gradient repaint, not layout). | Low risk; roll into PI-1's cost-ledger discipline for cumulative CSS-byte tracking across all 24 T-# visual rows, not a standalone gate. |
| **T-2/T-7** (1.5× golden-scale type) | One-time reflow on font-size change; NOT a continuously-animated property | No §6.2 surface (not a per-frame or per-interaction cost). | Perf-neutral; no rider needed. |
| **T-17** (dropdown color-preview swatches) | New live-color DOM per option, rendered inside the dropdown's existing open/close spring | Adds DOM/paint work proportional to option count at OPEN time only (not continuous); interacts with T-14's popover-open register (`--spring-snappy`, already a keep-set row per F6), not a new curve. | Low risk if swatches are static color chips (no per-frame animation); flag only if a future pass adds live-updating previews (e.g. following an active drag) — would then join the T-8/PI-3 hover-gate discussion. |

---

## §3 The T-wave perf gate riders (drafted)

These are additions to the standing suite the T corpus's implementation waves should carry as
prerequisites or same-commit companions — not new design, just the enforcement mechanism for the
findings above:

1. **Hover-active/satellite-emergent blob frame budget** (new spec, sibling to
   `idle-frame-budget.spec.ts`) — sustained `pointermove` sweep, assert a frame p50 ceiling for the
   blob's interactive-hover state specifically (today's suite has idle-parked and drag-fan-out-only
   coverage — PI-3).
2. **Mobile blob-presence gate re-derivation** — `blob-presence-mobile.spec.ts`'s canvas-width
   bound computed FROM the SEAT formula's resolved `--blob-fp` at the test viewport, not a
   hand-typed 180/240 literal tied to the dying 8rem arm (PI-4).
3. **Centralized blob park-timing fixture** — one exported `BLOB_IDLE_MS`/derived-window module
   consumed by all three duplicating specs (`idle-frame-budget.spec.ts`,
   `blob-presence-mobile.spec.ts`, `webgl-goo-blob-idle.spec.ts`), so T-8's settled-seam park
   rewire (row C) is a one-file timing edit, not a three-file hand-sync (PI-4).
4. **LCP-element identity + reveal-only law check** — before the load-sync wave lands, a
   `PerformanceObserver('largest-contentful-paint')` probe on the built bundle names the current
   LCP candidate in both schemes; the wave's beat-sheet binds that element to B0-unconditional
   paint + reveal-only transition (not mount-gating) as an explicit acceptance row (PI-2).
5. **Colocation bundle-diff gate** — gzip bytes per named chunk (`index`, `glass-ui`, each pane
   chunk touched by a move), measured on `dist/gh-pages` immediately before/after the E-1 codemod,
   asserted flat within ±2% noise — catches a barrel-driven eager-bundle bloat at the moment it's
   introduced rather than at the next incidental Lighthouse run (PI-6).
6. **T-14 sequencing gate (process, not code)** — the retune table (§2 there) is split into two
   PRs/commits by perf-dependency class (curve/clock-only rows vs the two PKT-3-gated
   layout-property rows), so CI cannot land a longer settle duration on a still-layout-triggering
   collapse as a single undifferentiated "T-14 wave" commit (PI-5).
7. **Per-wave Lighthouse delta discipline** — every T implementation wave that adds render/compute
   richness re-runs the LHCI harness against its own build and records the delta (up or down)
   against run `28836873580`, honestly, regardless of whether it moves the still-open LCP/TBT
   adjudication (PI-1). Not a pass/fail gate (the budget/preset pairing itself is under
   adjudication per `t-ci-lighthouse-record.md`) — a recorded-delta discipline, so the corpus never
   again discovers "zero instrumented runs ever existed" after 20+ waves of additive richness.

---

## §4 Cross-refs

- `t-ci-lighthouse-record.md` — the source of the Lighthouse figures this whole lane is read
  against; that lane's own "open adjudication" note (budget/preset pairing may need
  re-specification for a lab-simulated-mobile KaTeX+WebGL SPA) is NOT re-litigated here — this
  lane treats the measured deltas as the fact, the target-number debate as that lane's to own.
- `t-oracle-gaps.md` §2.7/§1 — the standing-oracle census this lane's gate riders (§3 items 1–2)
  are restatements/promotions of (Mint 1/Mint 3 there); cited, not duplicated in full.
- `t-blob-hero.md`, `t-transitions-liquid.md`, `t-load-sync.md` — the three design lanes whose
  cure directions this lane evaluates for cost; no design content re-derived, only the perf axis.
- `t-coloc-components.md` §5 — the barrel-collision mitigation this lane's PI-6 both depends on
  and adds a constraint to (named re-exports, not `export *`).
- `t-coloc-src.md` §0/§4 — the library tier's OWN chunk-budget invariant
  (`scripts/proof-subpath-budget.mjs`, the parse-that-free subpath guarantee) is a separate,
  already-covered mechanism (a different build, `vite.library.ts`, not `vite.config.ts`'s
  `gh-pages` mode) — noted here only to confirm this lane's chunk-graph analysis is demo-scoped
  and does not need to re-derive that lane's library-side guarantee.
