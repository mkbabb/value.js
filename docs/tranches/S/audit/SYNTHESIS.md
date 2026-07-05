# Tranche S — SYNTHESIS (draft specification)

**Author**: the S synthesizer (Fable) · **Date**: 2026-07-04 · **Mode**: tranche development only — nothing here modifies source.
**Substrate**: value.js @ `b5f94bc` (branch `tranche-q`; 2.0.1 on the registry; R closed, R.W7 wire finishing in parallel).
**Corpus**: the 33 audit lanes at `docs/tranches/S/audit/lanes/*.md` (each cited below by slug), `docs/tranches/R/{R.md,FINAL.md}`, the precepts corpus (`docs/precepts/instructions/`), the owner's S-1..S-24 findings ledger.
**Binding disciplines**: cross-lane contradictions resolved against the LIVE tree before elevation (R lesson 1) · producer-owned items route to letters/adopt-books, never demo forks (S-21) · books never gates · paired goal/completion at tranche + wave + item level · NO legacy/workarounds/fallbacks · Fable + frontend-design for all design waves · π paired visual archives on every visual wave · LEAN authoring.
**AMENDED-AT-PASS-2** (2026-07-04, the S pass-2 amender): all 13 pass-1 mustFix discharged + every dissent dispositioned (§11); pass-1 record at `audit/PASS1-VERDICT.md`. Substantive amendments: W1-8 widened to the census's full SPLIT-WORTHY set; the eager-load budget restated as two owned gates (new W3-9); S.W5 laned; W4-1/W7-1 re-specced at treatment depth; L1 provenance re-pinned to the verified HEAD; the NCSU-alias retirement booked (§7.3); Q4 FLIPPED to EXCISE.
**AMENDED-AT-PASS-3** (2026-07-04, the S pass-3 discharger): pass-2 scored mean 95.7 / min 92 with 2 residual mustFix, both discharged — the W1-8 cap-exception clause now also names `units/utils.ts` (§3.3 gate riders) and the W7-1 morph clause is reframed as design intent with every exists-today claim live-verified against glass-ui HEAD `c03ab942` + the demo tree (§3.9); both pass-2 dissents folded (L2 atom-naming disambiguation, L1 dispatch-time re-stamp corollary), 0 rejected; pass-3 record at §11 (the pass-2 verdict was delivered in-orchestration — no PASS2-VERDICT.md exists on disk; §11's pass-3 block is the durable record).

---

## §0 — Verdict

**S is the refinement-consummation + architectural-transposition tranche.** R built the instrument
and published 2.0.0/2.0.1; the owner then probed it live and filed 24 findings the R gates were
structurally blind to (`e2e-coverage-gaps`: every oracle asserts DOM presence, text, or a numeric
threshold — none asserts rendered appearance, hover paint, clipping, frame cadence, or Safari).
The 33-lane fleet root-caused all 24 against the live tree. The shape of S that falls out:

1. **Fix the oracles first** (S.W0) so S's own work cannot ship invisible regressions again —
   smoke-safari into CI, Lighthouse hard, canvas-appearance assertions, the standing π matrix.
2. **One library wave** (S.W1 → publishes **2.1.0**) — the booked `srgbToLinear` defect fires on
   this minor by its own trigger; plus the parsing P0s (`round()` crash, extract depth-walk),
   cache bounds, and the two src surfaces the design waves consume (`sampleOKLChSliceBoundary`,
   `resolveEasing`, gamut-guarded accent helper).
3. **One architectural-transposition wave** (S.W2) — the color-state spine collapses from ~11
   scattered watchers / 2 model copies / 2 unordered persistence channels to ONE explicit
   `useColorPipeline` graph; the demo's 3 module-singletons gain a DI seam (`useApiClient`); the
   api service layer's split-brain (30 `Context`-taking fns) unifies onto `Services`-in. KISS,
   idiomatic Vue 3.5 + Hono — no framework invention.
4. **One perf wave with numeric gates** (S.W3) — the measured numbers become budgets: slider-drag
   p50 49.8ms→≤20ms, view-switch first frame 254.7ms→≤100ms, eager cold-load 543KB → the two
   owned gates (JS ≤280KB eager · render-blocking CSS ≤120KB; the §6.2 pass-2 restatement).
5. **Four Fable design waves** (S.W4 picker+docs · S.W5 suffusion II · S.W6 atmosphere+hero ·
   S.W7 dock+shell) — excision and consistency, not reinvention (`design-admin`'s closing line
   generalizes: "the lane's work is excision and consistency").
6. **The blob is NOT reinvented.** The S-4 "ground-up reinvention" instinct is REFUTED by
   `blob-greenfield-tech`: the engine is a mature 3634-LoC glass-ui producer component (WebGPU +
   WebGL2, own RESEARCH.md, gate-locked math). value.js's half is consume/config/placement; the
   producer redress (satellites-at-rest, scale-aware deformation, single-GPU-surface policy,
   `uSatColor[]`) is a paired-authorship letter + the adopt-event consume.
7. **The aurora is NOT rewired.** S-18's "does not update at all" decomposes into FOUR compounding
   defects with the wiring provably INTACT (`aurora-derive-audit` measured live H/C/L tracking):
   (a) cold-boot stale seed + a normalized-persistence corruption (`design-blob-atmosphere-vision`
   P0-1, `useAppColorModel.ts:74-78`); (b) localStorage clobbers the URL color
   (`state-color-pipeline` P0-1); (c) the dark L-band is unreachable through the atoms door
   (producer G-1 ask); (d) the default derive is lightness-dominant (28° hue spread — tuning). And
   on Safari the WebGL aurora **never runs at all** — the shader fails to compile on WebKit
   (`safari-truth` P0, 3 GLSL defects — verified live at glass-ui HEAD `a633784f`; provenance
   spans `5cf8e8f0`..`BG.W-AUR-METAL-FINISH`), so every Safari session has only
   ever seen the flat CSS fallback. The honest composite: boot truth + precedence + scheme +
   tuning + the producer shader fix. Not a rebuild.
8. **The api story**: dev is broken-by-CORS under bare `npm run dev` (prod-pointing BASE_URL
   footgun; `api-broken-rootcause`) — S ships the honest dev-backend (`npm run dev` boots the
   full stack via `scripts/dev.sh`; `dev:web-only` named explicitly; origin-honest failure, never
   the false "backend unreachable"). X1 (prod deploy) is R.W7's, nearly closed — S.W0 verifies it.
9. **The LIVE-PRODUCER coordination reality is a first-class constraint**: glass-ui commits ~every
   10 minutes on `tranche/BG`; the `onTransitionEnd` abrogation was caught by CI TODAY off a stale
   local dist. S carries the producer-drift discipline forward: CI stays pinned to `tranche/BG`
   until the 5.0.0 master landing (un-pin book), the abrogation tripwire keeps its dts half,
   `boot-smoke` cold stays the named-export catch-all, every live probe cites the glass-ui HEAD,
   and S touches ZERO glass-ui files (foreign-tree fence).

**Tranche goal criterion**: the app the owner probed on 2026-07-04 — with its 24 findings — becomes
the app those findings describe as intended: every finding landed at its root or explicitly
booked/killed with rationale; the library at 2.1.0 with the dark-band defect cured; the spine one
explicit graph; performance inside numeric budgets; Safari a first-class verified target.
**Tranche completion criterion**: FINAL.md reconciles §9's zero-drop ledger row-by-row; all wave
gates evidence-backed; the S oracle slate (smoke-safari in CI, hard Lighthouse, frame budgets,
π matrix) green at close; 2.1.0 published + tagged; master merged.

---

## §1 — The findings → wave challenge table

Every owner finding lands in EXACTLY ONE wave item (its anchor); split producer halves live in the
§7 letter, cited from the same item. Full dispositions in §9.

| S | One-line root truth (evidence lane) | Anchor item |
|---|---|---|
| S-1 | ONE component (`ColorSpaceSelector.vue`), two ambient contexts; trigger never owns `font-display`; the pill is the demo's only `veil-surface` consumer (dropdown-select-consistency §2; glassui-consume-map F5) | **W4-1** |
| S-2 | Producer slider skin (black 2px thumb border, scheme-blind; elsewhere thumbs paint 0-width) + demo ink alphas; root consume = `/slider` at 5.0.0 (design-picker P1-4; glassui-bg-bh-assay §2) | **W4-3** |
| S-3 | Same-repo reuse miss: `SegmentedTabs orientation="vertical"` already ships and is already consumed elsewhere; the channel-color conceit is degenerate by construction (glassui-consume-map F2; design-picker P1-6) | **W4-5** |
| S-4 | REDRESS not reinvent — producer engine sound; defects = scale/placement/demand-park/tuning + Safari dual-WebGL2 contention hypothesis (blob-greenfield-tech) | **W6-4** |
| S-5 | Lowercase in source; `text-mono-caption` (the eyebrow utility) bakes uppercase — wrong utility at one site (`ProfileSection.vue:99`) (legacy-sweep-demo-components F6) | **W7-6** |
| S-6 | The liked netting is measurement-paint; expand as the perceived-space L×C plate + iso-ΔE rungs, consuming a new src slice-boundary sampler (design-gradient P1-6) | **W5-8** |
| S-7 | The photographed clip is the COLLAPSED pill's (expanded never clips, measured); the sibling-site truncation root is the 7-tranche-unshipped `clampLabel` producer ask (design-dock-shell P0-1; glassui-consume-map F1) | **W7-2** |
| S-8 | Collapsed slot stuffs dot + text + chevron into a producer-correct perfect circle; the wax-seal grammar (dot + inked icon, no text) is the cure (design-dock-shell P0-1) | **W7-1** |
| S-9 | Not the transitions — EVERY color interaction: unthrottled color→atmosphere fan-out (~16 gamut-maps/change, 60×/s → 20fps) + mount stalls inside the swap (perf-transitions P0-1/P1-1) | **W3-1** |
| S-10 | The remembered treatment is `ec1b200` (all-muted, opaque); the shimmer stagger is DEAD CODE (delay lands on the host, animation lives on `::after`); browse never uses the skeleton at all (design-browse-palettes S-10.1–.3) | **W5-1** |
| S-11 | Broken-by-CORS: bare `npm run dev` → prod BASE_URL → preflight rejected → latch trips; the honest path (`scripts/dev.sh`) exists but is unreachable from npm (api-broken-rootcause) | **W0-1** |
| S-12 | A per-page superfluity table: counters, duplicated invitations, truncating subtitles, hint lines, toolbar counts, the rainbow one-off (all design lanes) | **W5-7** |
| S-13 | glass-ui `EasingPicker` ships its own documented play-button defect (`btn-pill`×`glass-btn` = the ~40px clipped blob) + no loop; the gradient page never demonstrates what the ease does to the gradient (design-gradient P0-2/P1-5; motion-animation-inventory §4) | **W5-9** |
| S-14 | One eyebrow line + one per-row index, same file as S-1 — dies in the same edit (design-picker P1-3) | **W4-1** |
| S-15 | THREE mechanisms: composited-corner clip AA (A) · 8-bit banding exposed by the grain-plane retirement (B) · WatercolorDot sRGB SVG-filter on Safari (C); the user's grain-DPR and canvas-DPR hypotheses RULED OUT (aliasing-dithering) | **W5-10** |
| S-16 | Thumb hover 8%-alpha halo is imperceptible; the liked gradient "grow" hover is DEAD CSS (inline transform shadows the utility) (design-picker P1-5) | **W4-3** |
| S-17 | Producer Input is correct; 6 hand-rolled `<input>` sites + one per-instance pill-stripping override (incl. a suppressed focus ring) bypass it (glassui-consume-map F3; design-browse-palettes S-17) | **W5-3** |
| S-18 | Four-defect composite, wiring INTACT (see §0.7) — cold seed + persistence precedence + scheme atom + derive tuning (+ the Safari shader P0, letter L1) | **W6-1** |
| S-19 | The hero readout pays a 144px reservation for a blob that never overlaps it; Lab structurally wraps at every viewport (design-picker P1-1, measured 599px need > 525px avail) | **W4-2** |
| S-20 | Three sibling surfaces, three depth grammars (editor dashed-well / opaque card / half-glass skeleton); ALSO contaminated by the luma-bucket flip painting light-scheme mud (design-browse-palettes S-20; design-dock-shell P0-3) | **W5-2** |
| S-21 | The root-routing discipline itself — binding on every item in this spec, not a finding | precept |
| S-22 | Safari is currently a fiction: aurora shader never compiles on WebKit; mix uses unsupported `ctx.filter`; smoke-safari NEVER runs in CI; the suite's console gate doesn't watch shader-compile warns (safari-truth; e2e-coverage-gaps) | **W0-2** |
| S-23 | The budget regime (§6): measured numbers become hard gates; the two P0 taxes are the un-coalesced fan-out and the eager 543KB-gzip shell (perf-transitions; perf-general) | **W3-2** |
| S-24 | Library: one numerical P1 (`srgbToLinear`, duplicated in `gamut.ts`), two parsing P0s (`round()` crash, extract depth-walk), a dead-message `fail()`, unbounded caches, 7 duplicate scanners, god-module drift, 2 dead public exports (lib-color/lib-parsing/lib-core/legacy-sweep-src/parse-that lanes) | **W1-1** |

---

## §2 — Design POV continuity

**The editorial instrument CARRIES.** R.W3/R.W4's register — Fraunces display voice, Fira readout,
cartoon-offset shadow, crayon primaries proportioned, ink+grain, perceptually-true fields — is not
re-litigated. The lanes verified the bones repeatedly: the gamut-truth overlay + detent stack
("the app's most instrument-true surface"), the three-family motion grammar (verified in source),
the extract stat voice, the admin Users/Flagged row grammar, the ConfirmDialog. S's design work is
**excision and consistency against the standing register**, plus completing the surfaces the
register never reached (browse/palettes titles, admin chrome, the gradient code editor).

What RECALIBRATES:

1. **Copy register** — the specimen-plate annotation class survives ONLY on true empty/error
   states; duplicated invitations ("undeveloped plate — feed it an image" under a drop zone that
   already invites), inventory counters ("— 06 / 16", per-row indices, "3 palettes" toolbar
   lines), and truncating always-visible subtitles are excised (Q6 ratifies the boundary).
2. **The display voice reaches the pane tops** — pane titles adopt `font-display` at the ONE
   `PaneHeader.vue:3` site (both design lanes independently converged; Q5).
3. **One accent voice per surface** — the heading hue-carousel (h2/h3/mark at +0°/+40°/+20°)
   yields to an accent-derived one-ink L/C ladder; the fixed pastel rainbow is EXCISED from
   titles (Q4, pass-2 flip — letterforms speak one ink; hue-variation belongs to color-data
   surfaces); the dock speaks ONE voice (`--accent-view` on navigation, live accent on chrome;
   the view-select menu becomes the color-wheel legend).
4. **Fail-explicit becomes a design register too** — error ≠ empty everywhere (admin panels
   rendering "No users found." over a dead backend is the trust-costing case, `design-admin` F-2);
   loading ≠ empty (extract's shimmer-at-rest; mix's eternal skeleton).
5. **The dark scheme becomes real** — today it is half a scheme: the field/dock stay light while
   plates flip (S-18's scheme half + the luma-bucket coin-flip). W6/W7 + letter items L2/L4 close it.
6. **Performance is a taste constraint** (S-23): a moment that drops a quarter-second is worse
   than no moment (design-dock-shell P1-6's verdict binds all motion work).

---

## §3 — The wave slate

### §3.1 DAG + rounds

```
S.W0 ──┬── S.W1 (library, 2.1.0) ──┬── S.W3 (perf) ──┬── S.W5 (suffusion II) ──┬── S.W7 (dock+shell) ── S.W9 (close)
       └── S.W2 (transposition) ───┴── S.W4 (picker+docs) ─┴── S.W6 (atmosphere+hero) ┘
S.W8 (5.0.0 ADOPT) — trigger-gated on the glass-ui BG/BH cut; slots into whatever round is
current when it fires; NOT on the critical path (books never gates).
```

Rounds: **0**: W0 · **1**: W1 ∥ W2 · **2**: W3 ∥ W4 · **3**: W5 ∥ W6 · **4**: W7 · **close**: W9.
W3 follows W2 (the coalesced token sink lands with the pipeline; W3 measures against it). W4
follows W2 (shared ColorPicker files). W5 needs W1 (`sampleOKLChSliceBoundary`, `resolveEasing`).
W6 needs W2 (boot-seed integrity rides the pipeline). W7 needs W1 (gamut-guarded accents) + W3
(sequencing mechanisms). Max 6 agents/wave. All of W4–W7 are Fable + frontend-design lanes with
π paired baseline/close archives.

**Intra-round ordering (pass-2)** — the parallel claims hold only with these two notes: **round
1** — W1-6's `safeAccentCssString` is W1's FIRST landing (a one-function patch with no dependence
on the rest of W1); W2-2 is sequenced LAST in W2 and dispatches only after that export exists in
the tree (every other W1/W2 pair is genuinely order-free). W2-7 (vue-router 5) is ALSO sequenced
LAST in W2, so a scope blow-up can't stall the wave's other closures (mirrors W1-8's own
sequenced-LAST discipline). **Round 2** — single-writer on `ColorPicker.vue`: W4-2's header
re-composition (the structural diff) lands FIRST; W3-4 rebases its pane-swap hunks atop it — the
two fleets never hold simultaneous open diffs against the same file.

### §3.2 S.W0 — SUBSTRATE: dev truth + oracle floor + hygiene

**Goal**: no S work ships against a broken dev loop or a blind gate. **Completion**: `npm run dev`
round-trips palettes locally; smoke-safari runs in CI; Lighthouse hard; the record-only book
discharges written; hygiene items landed with clean `git status`.

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W0-1 | **Dev-backend truth** (S-11): `npm run dev` delegates to `scripts/dev.sh up` (local api + mongo rs0 + `VITE_API_URL` + dev CORS); explicit `dev:web-only`; origin-honest failure in the availability path (detect the unset-env + localhost + cross-origin-prod precondition → loud dev-misconfig message, never "backend unreachable"); demo/CLAUDE.md + root CLAUDE.md Build section updated. **REJECTED**: adding localhost to prod `ALLOWED_ORIGINS` (recorded so it isn't proposed as a shortcut) | `package.json:71`, `client.ts:34-35`, `scripts/dev.sh:279-296`, `availability.ts` | api-broken-rootcause |
| W0-2 | **Oracle floor** (S-22/S-23 process half): (a) `--project=smoke-safari` in CI; (b) Lighthouse `continue-on-error` → hard-fail against a captured baseline; (c) `"shader compile failed"`/`"init failed"` substrings into `sustained-30s.spec.ts` CONSOLE_FAIL_SUBSTRINGS; (d) WebGL canvas-appearance assertions (readPixels non-blank + bbox ≥N + not-clipped-past-card) in the 2 existing WebGL specs | `.github/workflows/ci.yml:247,256,328`; `e2e/smoke/safari/sustained-30s.spec.ts:~62` | e2e-coverage-gaps §4 P0; safari-truth |
| W0-3 | **X1 verify** (R.W7 residue): confirm prod serves R-era api (`/health` lineage stamp, `/diff`, `/publish` 200); if the webhook is still dead, repair + deploy (`scripts/deploy.sh api`). **NCSU-alias probe rides this item** (the owner's "no ncsu alias" directive, X2): probe `mbabb.fi.ncsu.edu/colors/` — it still answered 200 at R close; while it does, the §7.3 X2 book stays OPEN. The retirement itself is maintainer-on-host, NOT S agent work (§7.3 row carries the exact on-host op + trigger) | prod probes in api-crud F-6; `api/apache-vhost.conf:19-27` | api-broken-rootcause S-11.B; api-crud-audit |
| W0-4 | **Record-only book discharges**: parse-that `^1.0.0` re-pin DISCHARGED (2.0.1 `a7eabcc`), color2Into currency DISCHARGED, D8-1 watch-line FULLY CURED (`deferred.css:34` now layered) — S's §7 books table supersedes R §5 (R's record is closed history; do not edit it) | — | deferred-books-census §1 |
| W0-5 | **CHANGELOG `[2.0.0]` entry** (transcription from R/FINAL.md §6 — the 2.0.1 letter left it explicitly to us) + CLAUDE.md `as unknown as` ledger cure (hardcoded "2" is false; actual 8 sites, all the same accepted erasure class — replace the count with a regenerable-count note, the LoC-precept pattern) + CLAUDE.md Dependencies line still records parse-that `^0.13.0` against the live `^1.0.0` re-pin (W0-4's discharged book) — same doc-truth sweep | `CHANGELOG.md:3`; CLAUDE.md §Conventions + §Dependencies | deferred-books-census; legacy-sweep-src |
| W0-6 | **Dead-surface excision**: BBNF grammars + `*.bbnf?raw` decl + stale doc rows (zero consumers; the equivalence test died at D-close) · AdminPanel quartet (~245 LoC, zero importers, one file a DRY twin) · dead `Shield,Tag` imports · `.gold-shimmer-icon` dead selector | `src/parsing/grammars/`, `src/vite-env.d.ts:3`; `AdminPanel.vue` + 3; `Dock.vue:238` | parse-that-audit §3; design-admin F-6/F-12 |
| W0-7 | **vue-router 5 scope probe** (the census headline: trigger FIRED 2026-05-28, unactioned ≈5 weeks): enumerate the breaking-change surface against actual router usage; the migration itself lands W2-7 | `demo/package.json:167` | deferred-books-census §2 |

### §3.3 S.W1 — LIBRARY: the 2.1.0 wave (S-24)

**Goal**: the library's one numerical defect cured structurally, the parsing P0s closed, the
memory-growth vector capped, and the two src surfaces the design waves consume shipped.
**Completion**: 2.1.0 published + tagged; vitest green incl. NEW dark-band + independent-oracle
regressions; the okhsl dodged sweep band reinstated; parse caches bounded; PT-E letter dispatched.

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W1-1 | **`srgbToLinear` decode-threshold fix** (the booked defect — its "next minor" trigger fires HERE): guard → `SRGB_TRANSITION`; **delete `gamut.ts`'s inline twin** (the "circular dep" justification is stale — `transfer.ts` is a 0-import leaf) + `clamp` from `../../math`; dark-band goldens (`rgb(1..10/255)→XYZ.Y` hand-computed) + a self-inverse roundtrip test that does NOT reuse the library as oracle (the current `gamut-boundary.test.ts` oracle is circular); reinstate `test/okhsl.test.ts`'s dodged domain | `transfer.ts:30`; `gamut.ts:25-52`; `okhsl.test.ts:63-79` | lib-color-audit P1×2; legacy-sweep-src P0 |
| W1-2 | **`round()` optional-strategy crash** (spec-legal CSS throws): the two-branch idiom already proven at `index.ts:197-205` (the branch implementation; :188-196 is its explanatory comment); retire the test comment that carves around it | `src/parsing/math.ts:144-154`; `grammar-2026-values.test.ts:38-46` | lib-parsing-audit F-1 |
| W1-3 | **Extract depth-walk**: route `extractStyleRules`/`extractAnimationOptions` through the existing `itemChildren` recursion (silent empty results for nested at-rules today) | `extract.ts:135-144,253-264` | lib-parsing-audit F-2 |
| W1-4 | **`fail(message)` → `mergeErrorState`** (3 authored messages currently discarded); `.eof()` swap in stylesheet.ts | `parsing/utils.ts:305-309`; `stylesheet.ts:847-854` | lib-parsing-audit F-4/F-9 |
| W1-5 | **Bound the 7 unbounded memoize caches** (`parseCSSColor` et al. — the code-provable memory-growth vector under drag; the LRU machinery + the `COMPUTED_MEMO_MAX_ENTRIES` precedent already exist in-file) | 7 sites listed at perf-general §4 | perf-general P1; lib-parsing F-6 |
| W1-6 | **New src surfaces (consumed downstream)**: `sampleOKLChSliceBoundary(hue, columns)` (the L×C cusp polyline for W5-8 — the demo never re-derives gamut geometry) · canonical `resolveEasing(string→TimingFunction)` (feeds W5-9; kf/glass-ui converge on it later) · `safeAccentCssString` (retires the demo's hand-denorm blocks, W2) · **ICtCp public space class** if Q9 ratifies (the matrix math already shipped inside `deltaEITP`; cheapest net-new space ever — parsing + `color2()` dispatch + roundtrip goldens + `color2Into` currency) | `boundary.ts`; `easing.ts`+`parsing/easing`; `contrast.ts:185`; `difference.ts:143` | design-gradient P1-6; lib-core P2-4; state-color P1-4; deferred-books §4 |
| W1-7 | **Public-surface hygiene** (land as N small commits, not one — the sub-fixes are independent): `color-soa.ts` excise-or-gate per Q3 (orphan API, phantom consumer) · `reverseCSSIterationCount` wired to its inline twin (keep the export — published API) · `logerp` per Q2 · **`unpackMatrixValues` 2D-branch DEFECT**: the live code emits nonsense atan2-derived rotateX/rotateY for a planar `matrix()` transform (`utils.ts:304-306` — `rotateY = atan2(-c, a)`, `rotateX = atan2(b, d)`); the fix is to return 0 for the two out-of-plane rotations (this bullet is the defect-to-cure, NOT current behavior) · `ch`-unit `getContext` null-narrow (kill the blanket catch masking a null-deref) · `flattenObject` O(N²) flatten-after-loop · `toFixed` trailing-zero consistency · docstring truth (vh/cqw "computed" claim is false — correct or wire) | lib-core P1-1/P1-2/P2-1/-3/-5/-6; legacy-sweep-src P1/P2 | lib-core-value-audit; legacy-sweep-src |
| W1-8 | **God-module round (src)** — every split cohesion-driven (concern boundaries, not LoC chops), per the census: `STYLE_NAMES` → data module; **`color/index.ts` (968 LoC) gets BOTH lifts** — `serialize.ts` (~200 LoC apply-path serializers; lib-color) AND `spaces.ts` (the 15 near-identical space subclasses, ~400 LoC; census) — base `Color<T>`, the `ColorChannel` brand, and `ch()`/`channelOf()`/`setChannel()` stay in `index.ts` as the barrel, mirroring the G.W1 Lane B `conversions/` split one level down (the serialize-only lift would have left the file ~750 LoC, still over the cap); **`units/utils.ts` (722)**: the DOM-touching container-query/writing-mode/font-metric block (~140 LoC — the census's "genuinely mixed concerns" verdict, the only DOM code in the file) → `units/dom-metrics.ts`; the generic flatten/unflatten stays where CLAUDE.md documents it (a root-utils fold is a recorded future decision, not assumed); **`units/normalize.ts` (550)**: the ResizeObserver layout-epoch cache (~165 LoC, :89-254) → `units/layout-cache.ts` — the documented `as unknown as` irreducible travels with it (the CLAUDE.md ledger cite updates in the same commit); `constants.ts` named-color table → `color-names.ts`; `dispatch.ts` comment-diet (NO structural split — the runtime is cohesive; verdict from lib-color); the 7 hand-rolled scanners consolidate onto a generalized `balancedText` StopPredicate in utils; `stylesheet.ts` (864)/`color.ts` (854) decomposition is scoped-but-sequenced LAST (recursive-grammar risk; tests before/after each extraction; do not split under time pressure) | god-module-dry-census §1; lib-parsing F-3/F-5 | god-module-dry-census; lib-color P2; lib-parsing |
| W1-9 | **PT-E dispatch**: the parse-that 1.1.0+ ask letter — scoped per-parse diagnostics (cures the structurally-dead `ParseDiagnostic.expected`), combinator-inference tightening, Pratt-stays-dormant on the record; pair with the value.js-side decision on the dead `expected` field | parse-that-audit §4 | parse-that-audit |

Gate riders: fresh-build `.d.ts` guard; `color2Into` currency through any new space; boundary
goldens untouched by the srgb fix except the expected near-black fixtures (enumerate the moved
fixtures in the commit message — never silently regolden); **post-W1 cap check** (pass-2;
exception clause completed at pass 3): no `src/` file >500 LoC (the cap both god-module lanes
invoke) — if the sequenced-LAST parsing decompositions (`stylesheet.ts`/`color.ts`) are
deliberately stopped short, OR `units/utils.ts` remains over-cap after its enumerated W1-8 lift
(the ~140-LoC DOM block out of 722 leaves ≈582 — over-cap BY CONSTRUCTION while the
flatten/unflatten root-fold stays the recorded deferred decision, so this row fires unless that
fold is separately taken up), the cap exception is RECORDED at wave close as a ledger row, never
a silent miss.

### §3.4 S.W2 — ARCHITECTURAL TRANSPOSITION (the spine) — detail in §5

**Goal**: the color-state spine becomes ONE explicit derivation graph; the demo's runtime
capabilities gain the same DI seam color-state already has; the api service layer speaks one
signature. **Completion**: `useColorPipeline` owns the one model + one derivation set + declared
persistence precedence + one token sink; a shared URL-color e2e proves URL-wins; `useApiClient`
provided at App root with zero direct singleton imports; 0 api service fns take `Context`;
vue-router 5 migrated; typecheck + suites green.

Items W2-1..W2-9 in §5.

### §3.5 S.W3 — PERFORMANCE (S-9/S-23) — budgets in §6

**Goal**: every color interaction and view swap lands inside the §6 budgets on real hardware.
**Completion**: the frame-budget e2e specs (W0-2's floor + this wave's 3 transition-family specs)
green at the §6 numbers; the eager-shell re-measure shows JS ≤280KB gzip eager (W3-2) AND
render-blocking CSS ≤120KB gzip (W3-9) — the two owned gates that replace the former ≤420KB
composite (§6.2 pass-2 restatement); π before/after motion captures archived.

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W3-1 | **rAF-coalesce the color fan-out** (the tranche's #1 perf fix; lands with/atop W2's pipeline sink): one derive per frame for aurora seed + blob palette + `--accent-live`; last color of a frame wins. Coalescing does not break S-18 — the seed still tracks | `useAtmosphere.ts:84-95,108-122`; `App.vue:158-164` | perf-transitions P0-1 |
| W3-2 | **Eager-shell deferral, JS half** (S-23 anchor): FIRST task = a per-chunk gzip census of the eager graph (the gate's arithmetic must be owned, not assumed — the 78KB cut from 358KB has to name its chunks); then HeroBlob / aurora canvas behind idle-callback/first-interaction (`scheduleAfterFirstPaint` idiom already demonstrated in glass-ui `useAurora.ts:79-108`) + whatever the census names next. PointerDebugOverlay is dev-only tooling with zero end-user exposure (motion-animation-inventory:181) — its deferral is DX hygiene worth ~0 production bytes, NOT a budget lever (pass-2 honesty fix). Gate: JS ≤280KB gzip eager; the CSS half is W3-9's | `App.vue:1-60`; perf-general §2 | perf-general P0 |
| W3-3 | **Blob idle-gate (demo half)**: drive the renderer's existing `paused` flag on inactivity; single-frame repaint on color/pointer wake (producer per-frame CPU profile = letter L5). The idle threshold N is stated in the spec file, and the §6.1 frame-budget spec's sampling window MUST exceed N — else the ≤13ms idle gate fails on correct true-idle behavior (pass-2 coordination note) | `useMetaballRenderer.ts:158,413` (consume side) | perf-transitions P0-2 |
| W3-4 | **Pane-swap payload**: defer heavy in-pane content one frame past enter (KEEP simultaneous mode — the `fceed47` cure stands); kill the layout-property transitions (`height/margin/padding` on `.pane-wrapper`, `margin` on `.pane-shell`); `will-change:transform` scoped to `*-active` only; `content-visibility:auto` on parked panes; right-size `KeepAlive :max` to the non-admin view count | `App.vue:269-273,64`; `ColorPicker.vue:314-318` | perf-transitions P1-1/-2/-3; motion §6 |
| W3-5 | **Motion retunes**: view-swap spring → ~0.3s; dock hover-morph off `--duration-panel` onto its own ~0.2-0.25s token (one token currently serves two very different jobs); Tailwind `@theme` `--default-transition-duration/timing` aliased to the house tokens (21-file bare-utility census inherits at the root); orchestrated-open trim to ~0.7-0.9s (design call inside the wave) | motion-animation-inventory §9 | motion-animation-inventory |
| W3-6 | **Mix clock + Safari-true pour**: ONE authored clock (phase machine reads the canvas's own duration constants, or completion events); `ctx.filter` (unsupported on WebKit) replaced with Safari-true primitives; total ≤1.2s per Q10; reveal lands AT the result plate; generic spinner rows deleted (the animation IS the progress) | `useMixingState.ts:86-104`; `useMixingAnimation.ts:65-68,114` | motion §3 P0-M; design-extract-mix F6 |
| W3-7 | **Hue-sweep invalidation scoping**: retire the `:root`-inherited `--view-hue-shift` transition tax once W7-4's JS-side per-view tokens land (sequenced note; the mechanism decision is here, the consume is W7) | `style.css:175-177` | design-dock-shell P1-7 |
| W3-8 | **RAF-loop discipline**: `useMixingAnimation`/`useInertiaGesture` onto glass-ui `useRAFLoop` (`pauseWhenHidden`+PRM free); the one stray `matchMedia` PRM call → `useBreakpoint` | god-module §2.3/2.4 | god-module-dry-census |
| W3-9 | **CSS critical-path diet** (S-23's CSS half — OWNED here at pass 2, no longer an ambiguous rider): (a) consume glass-ui's already-published critical/deferred style split — `/styles/critical` (render-blocking early: tokens + glass ladder + typography + theme, ~46% of the producer monolith gzip) + `/styles/deferred` (non-blocking tail), union byte-complete off the producer's SOLE `src/styles/critical-partition.mjs` manifest (cut at glass-ui BC.W-CSS-CRITICAL) — in place of the wholesale `@import` at `style.css:52-58`; (b) the one-time Tailwind coverage/cssnano unused-rule pass perf-general §5 itself names actionable — quantify then purge the shadcn-vue vendor residue vs glass-ui vs live demo CSS. Gate: render-blocking CSS ≤120KB gzip; any producer-owned remainder the coverage pass exposes routes to the letter (an L16-adjacent ask), never a silent miss | `demo/@/styles/style.css:1-66`; glass-ui `src/styles/critical-partition.mjs` | perf-general §5 P2 (promoted); glass-ui BC.W-CSS-CRITICAL |

### §3.6 S.W4 — THE INSTRUMENT, REFINED (Fable: picker + docs/About)

**Goal**: the picker card's remaining furniture excised and its hero typography inked on one line;
the docs pages become true atlas plates (complete code, real inline code, owned faces).
**Completion**: π paired archive shows — capsule gone, both hosts identical, Lab readout one line
at 1440, all 11 docs pages ship complete snippets (build-failing guard), inline-code chips
restored; taste bar reviewed by a non-authoring agent.

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W4-1 | **Title-as-component** (S-1 + S-14): kill the `veil-surface` capsule + eyebrow counter + per-row index; the space name becomes the plate TITLE — a bare `SelectTrigger variant="ghost"` whose class list OWNS `font-display italic` (host-independent face, the `DockViewSelect.vue:54` pattern), safeAccent ink, size riding the producer `size="audacious"` rung. **The full affordance grammar, bound** (pass-2 — the flagship gets treatment, not a fragment): **rest** — the small inked caret is the ONLY affordance; no background, border, radius, padding rhythm, or shadow survives the excision — the title sits directly on the field like every other piece of plate typography. **hover** — the editorial link grammar: an ink-shift (safeAccent deepening toward full strength) and/or a 1px underline in the same ink at ~3px offset, entering as ink, not as surface; the letterforms never move, and NO treatment may re-grow a surface — any hover that paints a background/veil is a regression of this exact item (design-picker P1-2's own clause, folded verbatim). **focus-visible** — the existing C5 focus register (`:169-174`) unchanged: ring, never pill. **open** — the caret rotates 180° on the house micro duration; the title HOLDS its hover ink while open; all glass belongs to the SelectContent specimen catalog (which stays — WatercolorDot rows + live conversions are good instrument work); the surface is the dropdown's, never the title's. About provides `COLOR_MODEL_KEY` so the specimen rows are identical in both hosts (the parity half of S-1); both hosts get THIS grammar verbatim — zero per-instance overrides (S-21) | `ColorSpaceSelector.vue:5,9-11,22-36,72,151-166`; `AboutPane.vue:8-16` | design-picker P1-2/-3; dropdown-select §2; design-docs-about P1-1/-2/-3 |
| W4-2 | **Header re-composition** (S-19): blob reservation scoped to the title row only; readout spans the full header; per-space line-count lock from the reservation table (not a blanket 2); optional `cqi` display rung | `ColorPicker.vue:29`; `ColorComponentDisplay.vue:93-99`; `readoutReservation.ts:26-41` | design-picker P1-1 |
| W4-3 | **Spectrum-thumb ink + hover, demo half** (S-2/S-16): soften ink alphas (0.8→~0.55 black leg; 0.9→~0.8 white); fix the gradient dead-hover (fold hover scale into the inline transform — the class utility is shadowed). Producer halves (border-w token, hover recipe scale 1.06 + tint-15 + `cursor:grab`, spectrum-without-bg loud failure) = letter L6; root consume of `/slider` = W8 | `ComponentSliders.vue:188-193`; `GradientStopEditor.vue:124,134` | design-picker P1-4/-5; design-extract F14 |
| W4-4 | **Docs source-export P0**: the extractor's first-brace scan truncates 15/18 destructured-param conversions to one invalid line, and the prettier catch silently ships the fragment — scan past the balanced param list (or real TS parse), make prettier failure THROW, add a per-page snippet golden | `plugins/vite-source-export.ts:89,131-133` | design-docs-about P0-1 |
| W4-5 | **Channel rail re-home** (S-3): `ComponentSliders`' hand-rolled rail (~35 lines of bespoke CSS + 40 lines of tablist nav) onto `<SegmentedTabs orientation="vertical">` (already shipped, already consumed elsewhere in this app); WatercolorDot active ring in the safeAccent-modified current color (the existing register, no new recipe); `α` breaks the L/A/B/A collision; the channel-color conceit retired (degenerate by construction). **First task in-wave** (pass-2): verify against the live component that SegmentedTabs' native sliding-pill active indicator can yield to the WatercolorDot ring — ONE active indicator, never two competing — before any adoption CSS is authored; on failure the letter-rail book fires immediately, not as an afterthought. A producer "letter-rail" variant is BOOKED against the dock-fission DECIDE only if the vertical variant proves insufficient | `ComponentSliders.vue:9-40,152-182,219-261,310-344` | glassui-consume-map F2; design-picker P1-6 |
| W4-6 | **Docs math pipeline**: delete the classless-`<code>`→KaTeX hijack (inline code is extinct on all 11 pages today); explicit math authoring; `htmlAndMathml` output + ship KaTeX fonts; Safari verify; the stateful treewalker-regex `lastIndex` fix | `useMarkdownHighlighting.ts:38-41,74-98,94` | design-docs-about P1-6/P2-1/P3 |
| W4-7 | **Pane register**: `PaneHeader` gains `font-display` (Q5; all 9 panes inherit); the About sticky band shrinks with the de-capsuled selector participating (167px→≤ one title line) | `PaneHeader.vue:3,47-51`; `AboutPane.vue:23,29` | design-docs-about P1-4/-7; design-browse type-hierarchy |
| W4-8 | **Code-plate + dark truth**: ONE house hljs token theme (crayon primaries, Fira) consumed by gradient + markdown, GitHub css imports deleted, head-injection swap killed; both markdown composables onto `useGlobalDark` (three dark stores today, one observed wrong-theme paint); heading ink one-accent L/C ladder (no per-level hue spin); φ tokens promoted to `style.css`; Definition/Type dedupe. **The register boundary, stated** (pass-2): letterforms speak ONE ink — an L/C ladder on the single accent hue, everywhere headings render; hue-variation belongs to color-DATA surfaces (dots, ramps, palette strips), never to type. Q4's EXCISE flip applies this same law to the pane title | `GradientCodeEditor.vue:11-12,32-46`; `useMarkdownColors.ts:15,43-45`; `useMarkdownHighlighting.ts:5-6,111` | design-gradient P1-8; design-docs P2-2/-3/-5/-7 |

### §3.7 S.W5 — SUFFUSION II (Fable: browse/palettes/extract/mix/generate/gradient/admin)

**Goal**: one loading grammar, one card species, one input species, honest empty/error states, the
superfluity table excised, the gradient page's correctness holes closed, admin on-register.
**Completion**: π paired archives per page; the three `Loader2` browse sites dead; zero hand-rolled
`<input>`; the gradient round-trip atomic + explicit-failure; admin populated-fixture specs green;
per-item gates below.

**Lane structure (pass-2 — the R.W4 precedent applied; ≤6 agents total, each lane independently
gated)**: **Lane A — browse/palettes/admin grammar unification**: W5-1, W5-2, W5-3, W5-4, W5-5,
W5-12, plus W5-13 as Lane A's own second agent (the api/product-truth half is non-visual and runs
beside the grammar work, not inside it). **Lane B — extract/mix/generate**: W5-6. **Lane C —
gradient correctness + visual + aliasing**: W5-8, W5-9, W5-10, W5-11. W5-7 (the superfluity
table) executes PER-LANE — each lane excises its own pages' rows; no lane waits on another's
excisions. Each lane closes on its own π archive + item gates; the wave closes when all three
lanes do.

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W5-1 | **Loading-grammar suite** (S-10): skeleton base re-pointed to the `ec1b200` register (muted-ink family, one `color-mix` recipe, both schemes); `variant: shadow|specimen|developing` on `PaletteCardSkeleton`; the sequential "developing plate" choreography via the producer's `--skeleton-shimmer-delay`/`--skeleton-shimmer-tint` seams (letter L9 — the stagger is structurally dead until the `::after` reads a custom property); Browse + dialog + admin lists consume skeletons; all 3 `Loader2` sites die; a delayed-route fixture pins the state for e2e | `PaletteCardSkeleton.vue:9,20-37`; `BrowsePane.vue:24-29,57`; `PaletteBrowseTab.vue:5-11,50-57` | design-browse S-10; design-admin F-13 |
| W5-2 | **Card-grammar unify** (S-20): `PaletteCard` → glass rung (`bg-card/75` + blur, or the Card tier at W8); `.dashed-well` keeps the dashed edge (in-progress semantics) but joins the cartoon family; skeleton shell matches by construction; pane-plate grammar unified at the PaneShell root (the shell half) | `PaletteCard.vue:11`; `utils.css:56-68` | design-browse S-20; design-dock-shell P2-11 |
| W5-3 | **Input consume** (S-17): the 6 hand-rolled `<input>` sites + `PaletteRenameInput`'s `.input-bar-field` + strip `CurrentPaletteEditor.vue:118`'s override list (incl. the suppressed focus ring — an a11y regression); admin's 4 square inputs in the same sweep | sites at glassui-consume-map §4-F1; `CurrentPaletteEditor.vue:118` | glassui-consume-map; design-browse S-17; design-admin F-7 |
| W5-4 | **Menu + trigger dedup**: the triplicated icon-button recipe onto `<Button iconOnly variant="ghost">`; 2 missing `aria-label`s; ProfileSection's 3 hand-rolled buttons onto glass-ui Button; form-select grammar (`class="h-9"` → `size="sm"` ×11; 3 missing gradient `aria-label`s; bare-noun naming); dropdown glass-surface tokens = letter L11 | dropdown-select §4-5 | dropdown-select-consistency |
| W5-5 | **Empty/error register**: error ≠ empty plates in EVERY panel (admin's silently-costumed backend-down state is the P0 case); eyebrow contrast (drop the `/70` double-attenuation); "Retry" as a real Button; dialog-tab eyebrow parity; per-context eyebrows (Q6); Flagged's grey-italic defector onto EmptyState; `palette:null` says "palette deleted" | `EmptyState.vue:13`; `BrowsePane.vue:41-47`; design-admin F-2/F-11 | design-browse; design-admin |
| W5-6 | **Extract + Mix + Generate recomposition**: extract — plate copy deleted, empty-state de-shimmered, hover veil → edge affordance (the one surface whose colors must never lie), ONE proportional strip w/ the stat folded into the card header, eyedropper centered; mix — Button-primary-over-wash verified at the producer root (letter L6 rider), honest palettes-tab empty state (the eternal-skeleton silent-handling violation), `useColorGeneration` moved home, mix↔gradient shared vocabulary to a neutral home; generate — palette plate as hero, real Regenerate action, count slider carries the ramp (the extract k-slider pattern) | design-extract F1-F8, F11-F16 | design-extract-mix-generate |
| W5-7 | **Superfluity excision** (S-12, the per-page table): "1 colors" plural · triple count · twin search placeholders · delete-all demotion · rainbow recipe per Q4 · truncating select subtitles (generate/mix/gradient ×5) · gradient hint line (once gestures are self-evident) · detent `⊣` glyph · doubled config-pane labels · audit naked `12` · names-badge sum · title-during-rename | rows cited per lane | all design lanes |
| W5-8 | **The perceived-space plate** (S-6): the L×C slice at the running hue, gamut-truth hatch outside sRGB (+ the paper-ink second net for wide interpolation spaces), the coalesced ramp as an inked trajectory with stops ON the path, iso-ΔE_OK rungs on the editing rail (easing's perceptual effect becomes visible netting); dissolves the duplicated hero-preview/stop-bar pair; the hatch painter + ink probe lift to ONE home; consumes W1-6's `sampleOKLChSliceBoundary` — ZERO new demo math | `GradientVisualizer.vue:167-172`; `gamutOverlayPaint.ts` | design-gradient P1-6/P2-16 |
| W5-9 | **Easing pane v2** (S-13): demo half — per-interval live ramp strip (the gradient page's "ball": what `steps(4,end)` does to green→blue, visible in-row), first-row auto-trace on open, consume W1-6's `resolveEasing`; producer half (play-button un-blob, loop seam, curve-glyph presets, travel-dot rest, PRM) = letter L7 | `GradientVisualizer.vue:253-303`; `useEasingPicker.ts:111,239-249` | design-gradient P1-5; motion §4 |
| W5-10 | **Aliasing demo halves** (S-15): PaletteCard strip corner via mask/radius-inherit (drop the card `overflow-hidden` clip); the big washes opt back into the producer grain register as dither; more mid-stops on the largest washes; verify no pane subtree rests on a permanent compositing transform. Producer halves (mask-clip primitive, `paletteToCssGradient` dither, WatercolorDot Safari edge) = letter L10 | `PaletteCard.vue:11`; aliasing lane §A/§B | aliasing-dithering |
| W5-11 | **Gradient correctness P0s**: atomic `applyCSS` (complete-model-or-null; ≥2 valid stops; no unconsumed tokens; the dead `parseError` ref wired or excised — explicit destructive border + one-line Fira verdict); code-editor truce (never rewrite while focused; preserve authored literals); stop-editor rework (dblclick/warp truce, touch remove, end-handle geometry, z-tier); radial `circle at` silent-drop → model-or-reject; `resolution` dead affordance inlined | `useGradientModel.ts:144-154`; `useGradientCSS.ts:125-236`; `GradientCodeEditor.vue:102-117,109,139`; `GradientStopEditor.vue:32-63,96-134` | design-gradient P0-1/P1-3/-4/P2-14/-17 |
| W5-12 | **Admin on-register**: glass-ui Tabs adoption sweep (7 raw-reka sites — carries the F-1 min-width overflow cure: the moderation flow is INOPERABLE on mobile today); danger grammar (shift-click bypass EXCISED — no special-cases; per-row red quieted to ink-at-rest; Dismiss/delete weighted; disabled-delete dropped); machine strings in Fira not italic display; taxonomy seams (atmosphere/blob out of the admin menu or the asymmetric watch fixed; gold identity on the collapsed dock rides W7-1); slug middle-truncation; populated-fixture e2e (the suite's admin surface only ever sees empty envelopes today) | `AdminNamesPanel.vue:5,78`; `AdminUsersPanel.vue:81-89,237-254`; `useDockAdminMode.ts:27,51-55`; `admin-auth.ts:25-26` | design-admin F-1/F-4/F-8/F-9/F-12/F-13/F-14 |
| W5-13 | **Palette CRUD truth**: visibility per Q1 (wire publish/unpublish + a visibility affordance, or excise the dead 3-state machine); Browse pagination past 50 (wire `nextCursor` — the N.W3.D keyset machinery is entirely unused for its primary purpose); `/remix` wire-or-retire; the 10 zero-consumer wrappers wired-or-deleted; `publishPalette` naming collision resolved with Q1; envelope drift (3 missing optional fields typed); dead `offset` plumbing dropped; tag-edit ETag threading | api-crud F-1..F-9 | api-crud-audit |

### §3.8 S.W6 — ATMOSPHERE + HERO (Fable: aurora + blob; S-4/S-18)

**Goal**: the first painted frame derives from the boot color; dark mode gets the dark field; the
field varies H AND C legibly; the blob reads as the picked color made flesh with a legible
satellite show. **Completion**: cold-load e2e at a URL color paints the derived field first frame,
light + dark; dark-field L band ≤0.42 **once letter L2 lands — if the producer door hasn't landed
in-window, the miss is RECORDED as the wave's producer-gap row and the band re-verifies at the W8
adopt** (the same fallback W6-4's satellite gate already carries; books never gates — the
L2-dependent halves of W6-2/W6-3 carry this identical hedge, §7.1 hard-gate map); a static hero
screenshot shows ≥2 distinct satellite beads (post-producer-cut, else the demo-geometry half's own
gate); π archives light/dark × cold/live.

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W6-1 | **Cold-boot seed integrity** (S-18 anchor): fix the normalized-persistence corruption (`syncColorToStorage` persists the NORMALIZED unit's string — re-parsed as CSS it is the stale hot-pink the user sees every cold load); the first aurora frame derives from the boot color or nothing paints; `--saved-bg` becomes the derived base stop (boot → first frame is one material). Rides W2-1's precedence fix (the URL-clobber half) | `useAppColorModel.ts:74-78`; `useAtmosphere.ts:84-95` | design-blob-atmosphere P0-1; state-color P0-1 |
| W6-2 | **Scheme threading** (dark truth): consumer passes `useGlobalDark` → the atoms door once G-1 lands (letter L2 — `AuroraAtoms` lacks a `scheme` atom; `deriveAurora`'s `scheme`/`lBand` levers already exist and are dead code from the door); the dark L band `[0.18,0.42]` becomes reachable; interim: no demo shim (no-workarounds — the producer fix is the fix); an L2 miss in-window → record + re-verify at W8 (§7.1 hard-gate map — the wave still closes) | `atoms.ts:102-139` (producer); `useAtmosphere.ts:60-65` | aurora-derive P1; design-admin F-3; design-blob-atmosphere P0-2 |
| W6-3 | **Field derivation richness** (S-18's H/C half): chroma-adaptive hue spread (24°+40°·(1−C/0.3), clamp [24°,64°]) · C bell with an 0.04 floor (no dead-gray zones; neutral seeds stay alive) · scheme-banded L · richer default harmony (design call in-wave) · the CSS element layers CAPPED AT FOUR (three exist; the dock halo is the ONLY net-new; any 5th is excised); `hueSpread`/chroma-variance atoms = letter L2 | `keys.ts:22-33`; §3 brief in design-blob-atmosphere | aurora-derive P1; design-blob-atmosphere §3 |
| W6-4 | **Blob hero redress, demo half** (S-4 anchor — REDRESS, not reinvent): footprint `clamp(9rem,18cqi,13rem)`, visible bead ≥96px; corner-break placement LAW owned by the pane slot (bead center on the radius origin, ≥40% overflow, nothing paints over it — kills the About-card burial with zero z hacks); mobile all-or-nothing per Q7; ramp ceiling tracks the picked C (the 0.16 ceiling literally cannot show the advertised ink); mood FSM KEPT and bound to real app moments (scrub→excited, save→happy drip, idle→sleepy-as-contained-pose); PRM = static single-frame render. Producer halves (satellites-at-rest, scale-aware deformation, single-GPU-surface policy, HERO preset, chord-dent, DPR, `uSatColor[]`) = letter L5 + the W8 consume | `HeroBlob.vue:15`; `ColorPicker.vue:18-22`; `useAtmosphere.ts:100,112-116` | blob-greenfield-tech §5; design-blob-atmosphere §2 |
| W6-5 | **Safari verification**: the missing WebKit blob repro stood up on `smoke-safari` (the literal spazz was NOT reproducible on desktop Chrome; the dual-WebGL2-contention hypothesis needs the WebKit vehicle); aurora re-verify post-L1 shader cure; the centroid-in-wrapper spazz assertion | `smoke-safari` project | blob-greenfield S-blob-5; safari-truth |
| W6-6 | **Config-pane redress**: `ConfigSliderPane` single-label (the doubled sans+mono rows), the floating action pill un-occluded, readouts paired with labels; crayon Slider variant + ConfiguratorRow label API = letter L14 | `ConfigSliderPane.vue` | design-blob-atmosphere P1-7 |

### §3.9 S.W7 — DOCK + SHELL (Fable; S-5/S-7/S-8 + accent system)

**Goal**: the collapsed dock becomes the wax seal; the mobile dock fits; the shell's light scheme
stops coin-flipping to mud; navigation speaks one gamut-guarded chromatic voice.
**Completion**: collapsed dock renders dot + inked icon (no text/chevron) at every viewport; the
390px overflow trigger reachable; all 9 view accents ≥3:1 post-gamut-map incl. achromatic picks;
view-switch beat sequenced (no settle-into-stall); π archives — the light/dark × collapsed/expanded
quadrant must confirm the W7-1 seal↔trigger chromatic handoff reads intentional, not jarring.
W7-3/W7-6/W7-7 verify through the π-archive review DELIBERATELY (§6.1's correct-sized instrument
for this finding class — a design decision, not an exemption from close-time verification).

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W7-1 | **The wax seal** (S-8): WatercolorDot in the live color filling the circle + the view icon inked over it (ink/foreground — the dot IS the accent, per the lane's own ruling that `--accent-view` is wrong for the ICON), `vj-morph` keyed by view; label span + chevron DELETED, icon un-gated from `sm:hidden`; gold treatment when `isAdminMode` (the collapsed dock currently carries zero admin identity). **Chromatic reconciliation with W7-4 — the morph clause** (pass-2; reframed as design intent at pass 3, existing-surface claims live-verified; the seal and the expanded trigger speak different sources, so the collapse/expand morph gets a DESIGNED handoff, never an accidental hue slide): the seal's hairline rim ADOPTS `--accent-view` — the continuity carrier the expanded trigger's ring will ALSO wear under W7-4. What exists TODAY, verified against the live trees (glass-ui HEAD `c03ab942`): the demo sets `--dock-ring` to the LIVE safeAccent on the trigger (`DockViewSelect.vue:55`), but that custom property has NO consumer anywhere in the producer src or dist — the trigger ring is itself to-be-built (the demo seam re-wired to `--accent-view` + the producer consume verified or asked), not an existing surface; the collapsed dot already paints the live color (`Dock.vue:218`), and the collapsed icon currently paints `--accent-view` (`Dock.vue:225`) — the ink-icon ruling above retires that. The DESIGN: the wax (the dot fill) keeps speaking live, the icon moves to ink, and across the `vj-morph` the rim is the continuity carrier — it is designed to grow into the expanded trigger's `--accent-view` ring, one hue held the whole way; the live-color wax exits WITH the seal under the morph's cross-fade and re-appears only where live accent legitimately speaks (Tools/Login chrome, per W7-4's voice map). No single element ever animates live→view-hue. The light/dark × collapsed/expanded π quadrant (Completion) confirms the handoff reads intentional | `Dock.vue:217-230` | design-dock-shell P0-1; design-admin F-5; legacy-sweep-components F5 |
| W7-2 | **Mobile dock fit** (S-7): the main-layer composition cut at <sm (segmented control icon-or-shorter as a root-level variant; a separator pair dropped); the ⋮ overflow trigger (dark toggle + share) back inside the aperture; producer ask — `dock-scroll-x` overflow must fail visibly, never silently clip (letter L13); `clampLabel` RE-ESCALATED as a hard ask (7+ tranches; the Ad-18 workaround must not spread) | `Dock.vue:137-211`; `DockViewSelect.vue:49-51` | design-dock-shell P0-2; glassui-consume-map F1 |
| W7-3 | **Luma truth** (the P0-3 coin flip): producer cure — the backdrop sampler must never resolve luma 0 from an unreadable WebGL canvas (letter L4); demo threads `backgroundCanvas` consistently; NO consumer shim. This finding contaminates S-20 and every dark-legibility report — re-verify those π archives after the cure; an L4 miss in-window → record + re-verify at W8 (§7.1 hard-gate map) | glass-ui `useGlassBackdropLuminance` | design-dock-shell P0-3 |
| W7-4 | **Gamut-guarded per-view accents** (the eat-your-own-dogfood fix): rotate hue THEN gamut-map to the cusp + re-guard L via the library (`gamut.ts` + `contrast.ts`), written as 9 static tokens per accent change; low-C floor so the axis survives achromatic picks (today mix 2.74:1, generate 2.77:1 fail the 3:1 graphics floor; all 9 rotations collapse to one gray at C≈0); ONE dock voice — trigger speaks `--accent-view`, menu items speak THEIR OWN view hues (the menu becomes the navigation's color-wheel legend), Tools/Login stay live-accent; the rainbow menu one-off dies (with Q4) | `style.css:166-177`; `DockViewSelect.vue:55,87,97` | design-dock-shell P1-4/-5 |
| W7-5 | **View-select sequencing** (S-9's beat half): dock settle + icon morph first (cheap), pane mount deferred a frame behind the travel; the moment must never land into a 254.7ms frame (consumes W3-4's deferral mechanics). Wave-close verification asserts the FULL swap, not only the newly-cheap first frame — the deferred mount's cost lands in frame 2+ and still counts against the §6.2 view-switch long-task ≤50ms row (pass-2: the ≤100ms first-frame gate re-sequences the beat; it must not be validated by watching only the part that got cheap) | `Dock.vue:84-91`; PaneSlot | design-dock-shell P1-6 |
| W7-6 | **Dock furniture** (S-5 anchor): `@mbabb` onto a non-transforming mono utility; Login/Profile onto glass-ui Button; the Tools chevron-that-isn't-a-dropdown resolved (real popover or layer-swap affordance); Tools load-order flicker cured; the unowned idle `#/gradient→#/browse` navigation investigated + the collapsed-layer pointer-interception fixed (clicks misdirect to navigation today) | `ProfileSection.vue:42-47,84-101`; `Dock.vue:153-175`; design-gradient P1-12 | design-dock-shell P1-8/-9; design-gradient P1-12 |
| W7-7 | **Shell dedup**: `.gold-shimmer-icon` lifted to `utils.css` (byte-identical twins); the 3 gold-shimmer recipes consolidated (letter L15 evaluates ONE producer primitive); dark-scheme aurora inversion closes via W6-2 (cross-ref, not a second fix) | `Dock.vue:238`; god-module §2.1/2.2 | god-module-dry-census |

### §3.10 S.W8 — THE 5.0.0 ADOPT EVENT (trigger-gated; fires on the BG/BH joint cut)

**Goal**: the adopt-event book executes as one mechanical, verified walk. **Completion**: the
by-name MIGRATION walk green (typecheck 0, boot-smoke cold, e2e 5-project); local shadcn
slider/input DELETED onto `/slider` + `/forms`; CI un-pinned from `tranche/BG` at the master
landing.

The walk (from `glassui-consume-map §5` — the demo consumes **18** specifiers, not the relay's 17;
`/styles/fonts` is the unnamed 18th, letter L12 files the addendum before BH.B4e authors the
203-row table): `goo-blob`→`/blob` (3 files, symbols byte-identical) · `density`→`size` prop walk ·
bare `--ring` grep → `--focus-ring-color` · `/slider` + `/forms#Input` adopt + local-shadcn
deletion (kills S-2/S-16/S-17 at the true root; verify the spectrum special case, WS4-11) ·
`uSatColor[]`/`bodyLightness`/`lightnessFloor` consume + any interim satellite fallback DELETED ·
dock-fission rail evaluate (the S-3 letter-rail decision point) · Card cartoon+glass tier consume
(W5-2 re-points) · corner-alias + clip-discipline verify at adopt · EasingPicker a11y verify (relay
item 8) · `clampLabel` Ad-18 workaround retired · aurora-metal re-verify · U6 dock-fission verify ·
GAP-4 blob perf verify. 14 of 18 specifiers are zero-migration rows — the adopt is genuinely small.

### §3.11 S.W9 — CLOSE

**Goal**: the tranche's own gates are proven to hold against the live tree — the close is a
verification act, not a paperwork act. **Completion**: every §9 ledger row reconciled with
evidence cites; every open book (§7.3) re-verified against the live world; the repo-wide sweeps
(caps, legacy, `as any`) re-run; FINAL.md authored; master merged + tagged.

FINAL.md; §9 ledger reconciled row-by-row; ι integrity sweep; π tranche-level reconciliation; the
spec-status recheck lane (R-10 `if()`/`random()`, R8-23 timeline longhands, R-5 rec2100 — the
"~late-2026" guess is mid-window and was never live-verified); relay/letter dispositions recorded;
master merge + tag; the S books table (§7.3) handed to the successor.

---

## §4 — The library / api / parse-that slate

**Library (S.W1, → 2.1.0)**: §3.3. The publish note must name the srgb fix as output-changing for
near-black (≤2/255, 8-bit 1..10 band) and enumerate the regoldened fixtures. ICtCp rides Q9.
**Deliberately NOT done**: R-8 gamut-relative spaces (KILLED by pass-2 measurement — stands);
sibling-index/count, device-cmyk, ICC profiles (recorded non-goals); R-7 HCT/CAM16 (no demand);
R-4 raytrace (unblocked but demand-less, Q8); Pratt calc() transposition (parse-that-audit: the
2-tier fold "does not clear a KISS/DRY bar" — do NOT pull forward).

**api**: the service-layer unification (W2-8), the CRUD product-surface truth (W5-13), X1 verify
(W0-3). The api's own invariants re-verified clean by `api-crud-audit` §0 (224/224; H1 14/14;
L boundary holds) — no api re-architecture beyond the split-brain cure.

**parse-that**: 1.0.0 consumption verified clean end-to-end (`parse-that-audit` §1 — packrat
arming is a realized pure win at 82ns/parse; the 4 `.chain()` sites provably falsy-seed-immune).
Outbound motion is the PT-E letter only (W1-9). No parse-that source is touched on value.js's
account.

---

## §5 — Architecture transposition (S.W2 detail)

Seeded by `architecture-di-boundaries` + `state-color-pipeline` + `god-module-dry-census`.
Doctrine: elegance/simplicity/performance; the graph becomes data instead of watch-registration
order; idiomatic Vue 3.5 provide/inject and plain `Services`-in functions — **no framework
invention** (KISS; `feedback_kiss_no_contrivance`).

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W2-1 | **`useColorPipeline`**: ONE model (the picker's second `shallowRef` copy retired or reduced to a pure injected consumer — resolve the `defineModel` staleness at the source, per no-backwards-compat); ONE derivation set (`cssColor`/`cssColorOpaque`/`savedColorStrings`/`safeAccentCss` — deleting the byte-identical `cssColorOpaque` twin and the DIVERGED `savedColorStrings` twin); **persistence precedence declared: URL-hash-wins-on-load**, localStorage the fallback only when the hash carries no color (the P0: shared links are non-authoritative today — localStorage clobbers AND rewrites the hash); one `applyTokens` sink for the 4 root-token writes; keep the composable ≤400 LoC | `useColorModel.ts:39-65,69-108,154-163`; `useAppColorModel.ts:18-37,74-91`; `App.vue:131-177` | state-color-pipeline P0-1/P1-1/-2/-3/P2-2 §3 |
| W2-2 | **src-side accent stringification**: both hand-denorm blocks (`C*0.5`, `H*360` magic literals) replaced by W1-6's `safeAccentCssString`; verify+fix the light-mode near-white contrast-guard miss (P2-1: the guard demonstrably did not fire on the default pick). **Sequenced LAST in W2** — consumes W1-6's export (intra-round ordering, §3.1) | `useContrastSafeColor.ts:34-59,82-93` | state-color P1-4/P2-1 |
| W2-3 | **`Normalized`/`Display` brand evaluation** (the E4 class): 24+30 callsites track norm/denorm by positional booleans; a phantom brand (the `ColorChannel` precedent) retires the class. Evaluate + decide in-wave; land if the diff stays mechanical | `normalize.ts:57,73` | state-color P1-4 |
| W2-4 | **`useApiClient()` + `API_CLIENT_KEY`**: one provider owning `{request, adminRequest, sessionToken(ref), availability, baseUrl}`; the 3 module singletons collapse behind the SAME seam color-state uses; the 2 direct `apiAvailability` importers inject; quantize worker gains an optional `workerFactory` param | `client.ts:35-37`; `availability.ts:26`; `ApiOfflineChip.vue:15`; `PaletteCardMenu.vue:159`; `useImageQuantize.ts:11-14` | architecture-di §3/§6 |
| W2-5 | **Browse-actions dedup** (the realized copy-paste-then-diverge): `BrowsePane`'s hand-rolled `onFork`/`onTierChange`/`onTagsChange`/`onClearFilters` collapse onto the one host-agnostic composable; the forkCount increment ported into the shared fn; the silent `console.warn`-only fork catch routed through the same `showFeedback` its own file already uses | `BrowsePane.vue:158-197,260-275`; `useDialogBrowseActions.ts:29-64` | legacy-sweep-components F1/F2 |
| W2-6 | **Composable hygiene**: `ColorModel.savedColors: ParsedColorUnit[]` (the `| any` union collapses the field to `any[]`; 4 casts die); `useSlugMigration` onto `ApiProblem.status` (all three authored messages are unreachable today — the substring branches match nothing); the two unbounded 50ms polls capped + give-up log; `useCustomColorNames` dev-gated diagnostic; the lateral-import lifts (mix/extract/generate → palette-browser primitives to a neutral home) | `color-picker/index.ts:33`; `useSlugMigration.ts:76-82`; `usePaletteManagerWiring.ts:74-99` | legacy-sweep-composables; architecture-di §2b |
| W2-7 | **vue-router 4→5** (the fired book): migrate per W0-7's scope probe. **Sequenced LAST in W2** (§3.1); a disproportionate probe result de-scopes to a book per Q11's objective bound without stalling the wave's other closures | `demo/package.json:167` | deferred-books-census §2 |
| W2-8 | **api service-signature unification**: all 30 `Context`-taking fns across `services/{admin,color,session}` → `fn(services: Services, actor, …)`; routes pass `c.var.services` + the resolved actor; mirrors the `palette/*` tier that already proves the shape. Mechanical; the single largest boundary win | `services/color/proposals.ts:31`; `services/admin/users.ts:45,108,150` et al. | architecture-di §2d/§6 |
| W2-9 | **Copy hoists + typed accessors**: the 3 dynamic `copyToClipboard` imports hoisted static; a typed `ColorSpace`-keyed accessor retires the `as any` lookups in `useSliderGradients`; the `'#888'` empty-palette literal named | legacy-sweep-components F7/F8/F10 | legacy-sweep-demo-components |

**Wave gate**: a URL-color e2e (cold load with populated localStorage → the URL color WINS, field +
accent + readout agree); grep gates — 0 direct `apiAvailability` imports, 0 `Context` params under
`services/`, 0 `savedColors` casts; typecheck + vitest + e2e green; no new file >400 LoC.

---

## §6 — Oracle upgrades + perf budgets

### §6.1 The oracle slate (from `e2e-coverage-gaps` §4 — adopted with its cost-honesty intact)

**P0 (S.W0)**: smoke-safari in CI · Lighthouse hard-fail vs baseline · WebGL canvas-appearance
assertions (readPixels + bbox + not-clipped) · shader-compile console substrings in sustained-30s.
**P1 (land with the waves that need them)**: the **standing π interaction-state matrix** — 5-8
named states (slider `:hover`, dock collapsed, skeleton mid-fetch via delayed-route fixture,
About-vs-picker selector side-by-side, light+dark) × 3 viewports, a versioned wave-close artifact
reviewed by a NON-authoring agent — a review artifact, NOT a pixel-diff gate · frame-budget specs
for the 3 transition families (numeric p95 assertions) · a ~15-line `toOverflowContainer` matcher
on the dock pills + picker readout · populated-fixture admin specs · a gradient interaction spec
(stop add/remove/drag, round-trip, easing — every W5-11 P0 was reachable by a 5-line spec).
**REJECTED, by name, so nobody re-proposes them**: a full per-component pixel-snapshot suite; an
auto-thresholded visual-diff CI gate; per-hover-state spec sprawl. All three are the `proof:*`
mistake in a new costume. S-5/S-12/S-14-class findings remain irreducibly a review task — the π
matrix is the correct-sized instrument for them.

### §6.2 Perf budgets (measured baseline → gate; enforced at S.W3 close, re-run at S.W9)

| Metric | Baseline (measured) | Gate | Lane |
|---|---|---|---|
| Slider-drag frame p50 (color fan-out) | 49.8ms (~20fps, 31/44 janked) | **≤20ms**, 0 long tasks >50ms in-drag | perf-transitions |
| Idle picker frame p50 (blob mounted) | 18.6ms (54fps) | **≤13ms** (the blob-off floor is 11.5) | perf-transitions |
| View-switch first post-click frame | 254.7ms | **≤100ms** | design-dock-shell |
| View-switch long task | 183ms | **≤50ms** | perf-transitions |
| Eager cold-load (JS+CSS gzip) | ≈543KB (358 JS + 184 CSS) | Two owned gates (pass-2 — the former ≤420KB composite is RETIRED as unowned arithmetic): JS eager **≤280KB** (W3-2) · render-blocking CSS **≤120KB** (W3-9: glass-ui critical/deferred split + coverage purge); total transferred is measured + recorded, not gated | perf-general |
| Idle rAF loops, ungated | 2 (watercolor zombie ~50Hz; blob ~100Hz) | **0** un-gated (producer L3 + W3-3) | perf-general |
| Parse-cache bound | `Infinity` ×7 | `maxCacheSize` set ×7 | perf-general |
| Pane-swap spring / dock hover | 0.45s / 0.55s | ~0.3s / ≤0.25s | motion; perf-transitions |
| Mix choreography wall clock | 2.9s (with mid-growth jump-cuts) | ≤1.2s, one clock | motion §3; Q10 |

Numbers were captured at dpr=1 on an M5 Max dev build — retina doubles fragment work and the
release build changes constants; gates are re-measured on the built bundle at wave close, and any
gate re-baselining is recorded, never silent (R lesson 3).

---

## §7 — Cross-repo slate + books

### §7.1 The glass-ui letter (GLASSUI-S-LETTER → the BG/BH inbox; the live agent cures same-day — D8-1 + master-lockfile precedents)

| L# | Ask | Severity | Ground |
|---|---|---|---|
| L1 | **WebKit aurora shader compile** — 3 GLSL defects, **verified live at HEAD `a633784f`; provenance spans `5cf8e8f0`..`BG.W-AUR-METAL-FINISH`** (pass-2 re-pin: the metal-finish work widened `structureTensorField` vec3→vec4 for the `.w` metal-gradient lane, so two of the three defects are introduced/widened by the LATER work — inspect the CURRENT tree, not the older commit): `flat` reserved-keyword local (`metal-medium.glsl.ts:103`); stale `vec3` forward decl of `structureTensorField` (`flow.glsl.ts:20`) against the `vec4` definition (`mediums.glsl.ts:43`); `vec4`→`vec3` assign (`brush.glsl.ts:330`). Every Safari user has only ever seen the CSS fallback. + a WebKit GLSL compile-smoke gate in glass-ui CI. **Dispatch-time corollary** (pass-3): the dispatching agent re-stamps the verified HEAD at dispatch — `a633784f` was the pass-2 stamp; the producer moves daily (glass-ui stood at `c03ab942` when pass 3 amended this spec) | **P0** | safari-truth |
| L2 | **AuroraAtoms door**: a lightness-scheme (+`lBand`) atom threaded `resolveAtoms→deriveAurora` (the levers exist — `deriveAurora` already carries `scheme:"light"\|"dark"` + `lBand`, `color.ts:168/:174` — the door doesn't); `hueSpread` + a cross-stop chroma-variance atom. **Naming** (pass-3): NOT bare `scheme` — the atoms door already speaks "scheme" for the HUE axis (`harmony` is documented as "the hue scheme", `atoms.ts:106-107`); `lightnessScheme`/`lBand` suggested so the two axes stay unambiguous — the final name is the producer's call | P1 | aurora-derive; design-blob-atmosphere G-1 |
| L3 | **`useWatercolorBlob` zombie rAF** → rebuild on the library's own `useRAFLoop` (`pauseWhenHidden` + PRM are first-class there; the animate-mode tick runs forever, invisible under PRM) | **P0** | perf-general §3b |
| L4 | **Backdrop-luma truth**: never resolve luma 0 from an unreadable WebGL canvas — hold the declarative bucket or fail explicitly (the light shell coin-flips to mud today) | **P0** | design-dock-shell P0-3 |
| L5 | **Blob redress**: single-full-cost-GPU-surface policy (aurora↔blob backend coordination — the Safari dual-WebGL2 vector); scale-aware deformation ceiling (±35%/frame measured churn); satellites-at-rest (no-park-while-count>0 or visible-orbit rest pose) + the cross-engine satellites-missing regression; canvas DPR scaling; exported HERO preset; arousal-scales-orbit; chord-dent verify. (`uSatColor[]` F9.R1 already NAMED-OWNER+CUT — verify at W8, no re-ask) | P0/P1 | blob-greenfield §5/§6; safari-truth P1 |
| L6 | **Slider**: `--slider-thumb-border-w` token (default 1.5px); spectrum hover recipe (scale 1.06 + `--surface-tint-15` + `cursor:grab`); spectrum-without-bg fails loudly; Button-primary-over-wash verify (the Mix verb reads permanently disabled) | P1 | design-picker W-C; design-extract F5/F8b |
| L7 | **EasingPicker v2**: `btn-pill`×`glass-btn` co-occurrence fix (the library's own docs name this exact defect); travel-dot rest state; the loop seam landed (kf Oscillator or minimal); curve-glyph preset menu; PRM gate; MOTION_CURVES README truth. (a11y label already relay item 8) | P0(defect)/P1 | design-gradient P0-2/P2-20; motion §4 |
| L8 | **`clampLabel` on DockSelectTrigger — RE-ESCALATED as a hard ask** (named owner + cut; 7+ tranches, 4th booking; the Ad-18 workaround must not spread) | P1 | glassui-consume-map F1 |
| L9 | **Skeleton seams**: `::after` reads `--skeleton-shimmer-delay` (+duration) — custom properties inherit into pseudo-elements, the current host `animationDelay` is structurally dead; `--skeleton-shimmer-tint` token | P1 | design-browse S-10.2 |
| L10 | **Aliasing**: mask-based corner clip for composited glass surfaces (ONE primitive rule); dither in `paletteToCssGradient` + confirm shader-side dither; WatercolorDot Safari sRGB wet-edge recalibration | P1/P2 | aliasing-dithering |
| L11 | Dropdown-menu glass surface tokens (`--dropdown-menu-bg/border/shadow`, select parity) | P2 | design-browse |
| L12 | **`/styles/fonts` = the 18th specifier** — one-line addendum before BH.B4e authors the 203-row MIGRATION table (the table's own discipline demands it) | P2, time-sensitive | glassui-consume-map §2 |
| L13 | Dock: collapsed-circle WS2 residual confirm; `dock-scroll-x` overflow fails visibly; hover-morph off `--duration-panel` onto a hover-grade token | P1/P2 | design-dock-shell; motion §9 |
| L14 | `ConfiguratorRow` label API (consumers can't double-label) + crayon-register Slider variant | P2 | design-blob-atmosphere G-5 |
| L15 | Gold/admin shimmer: evaluate ONE producer primitive for the 3 demo recipes (only if it clears the ≥2-consumer bar) | P2 | god-module §2.2 |
| L16 | `backdrop-filter` `-webkit-` prefix: pick one policy across the 10 stylesheets (2 prefix, 8 don't) | P2 | safari-truth |

**Letter discipline**: asks only — S touches ZERO glass-ui files; every item cites file:line in the
producer tree; items already booked producer-side (F9.R1, relay item 8, de-shadcn, dock-shrink
WS2-10) are VERIFY-AT-CUT rows, not re-asks.

**Hard-gate map (pass-2)** — three letter items gate consuming-wave completion criteria, named
here so the dependency is explicit rather than discovered at wave close: **L2 → W6-2/W6-3** (the
dark L band + H/C atoms), **L4 → W7-3** (luma truth), **L1 → W6-5** (Safari aurora re-verify).
Each consuming criterion carries the same explicit fallback: record the producer miss at wave
close as the wave's producer-gap row + re-verify at the W8 adopt — no demo shims, no silently
failed gates (books never gates). Every other letter item is off every wave's critical path.

### §7.2 Other dispatches

**parse-that (PT-E, W1-9)**: scoped per-parse diagnostics (HIGH — unlocks real error messages for
kf's `ResolvedKeyframes.diagnostics`); combinator-inference tightening (MED); Pratt stays dormant
(record). **kf**: no ask; a courtesy note that value.js now hosts the canonical `resolveEasing`
(W1-6) for eventual convergence, and that the EasingPicker loop seam (L7) may consume the kf
Oscillator — glass-ui↔kf coordination, value.js only records it. **fourier**: nothing new (FN
charter delivered at R.W6; CH-13 quiescence book unchanged).

### §7.3 The S books table (supersedes R FINAL.md §5)

| Book | Trigger | Disposition |
|---|---|---|
| glass-ui 5.0.0 adopt event | the BG/BH joint cut | **→ S.W8** (trigger-gated wave; §3.10 walk) |
| CI checkout un-pin from `tranche/BG` | the 5.0.0 master landing | KEEP-BOOKED (the R.W7 `102b37b` book carries) |
| `srgbToLinear` decode defect | next output-changing minor | **FIRES at S.W1** (2.1.0) |
| vue-router 4→5 (K-W5RT) | stable v5 — **FIRED 2026-05-28** | **FOLDED → W2-7** |
| parse-that `^1.0.0` re-pin · color2Into currency · D8-1 watch-line | — | **DISCHARGED** (W0-4 records; census §1) |
| R-6 ICtCp | "after ΔE-ITP shares the math" — **CLEARED** | **FOLDS → W1-6** per Q9 (Jzazbz stays deferred — unrelated math) |
| `Color.try()` | demand for a non-throwing parse | KEEP-BOOKED; soft demand signal recorded (11 demo try-wraps) — does not clear the bar |
| K-W3DIFF PaletteDiff render | first version-compare surface | KEEP-BOOKED; alt-exit (stop persisting `atomDiff`) decided with Q1's outcome at W5-13 |
| S.H3 Pratt consume-edge | parse-that presents the sketch | KEEP-DORMANT — do NOT pull forward (parse-that-audit §4.3) |
| CH-10 · CH-13 · R8-23 · R-5 · R-10 | as recorded | KEEP-BOOKED; **spec-status recheck lane at S.W9** (the "~late-2026" guess is mid-window, never live-verified) |
| R-4 raytrace N-gamut | UNBLOCKED (R-1 settled) but demand-less | KEEP-BOOKED per Q8 |
| FN-7 doc-relocation | fourier-N execution | KEEP-BOOKED (de-urgented; in-tree note holds) |
| `usePaletteStore` schema migration | first `version` bump past 1 | NEW BOOK (silent reset-to-empty is a latent landmine; legacy-sweep-composables P3) |
| S-3 letter-rail producer variant | the dock-fission DECIDE wave's landed rail lacks it | NEW BOOK (only if W4-5's SegmentedTabs re-home proves insufficient) |
| kf `resolveEasing` convergence | kf's next easing-surface touch | NEW BOOK (courtesy-note record) |
| **X2 — NCSU-alias retirement** (owner order "no ncsu alias"; R.W7 residue — the alias still answered 200 at R close) | **maintainer on the NCSU VPN / on-campus** (the R.W7 finding: SSH to `mbabb.fi.ncsu.edu` times out off-campus, so the op is unreachable from a normal agent session — a named human trigger, not a wait) | NEW BOOK (maintainer-on-host; pass-2 — this row is the directive's explicit home). Exact on-host op, per `api/apache-vhost.conf:19-27`: remove the `mbabb.fi.ncsu.edu/colors/` proxy block from the NCSU box's Apache vhost + let its DNS/cert lapse, AFTER confirming `color.babb.dev` serves HEAD lineage (W0-3's probe). Verification = the alias URL going dark (non-200); the observation amends this row + R/FINAL.md's X2 record. W0-3 re-probes the alias each time it runs — while it answers 200, this book stays OPEN |

---

## §8 — Q-TABLE (owner-ratification; data-armed; recommended defaults)

| Q | Question | Data | Recommended default |
|---|---|---|---|
| Q1 | **Palette visibility intent**: wire `publish`/`unpublish` + a visibility affordance, or excise the unreachable 3-state machine? | Every demo-created palette is permanently `public`; `unlisted` has ZERO write sites; the verb pair is built + 11-test-green but has no client wrapper; the demo's `publishPalette` is actually create (api-crud F-4/F-2) | **WIRE** — one wrapper + a card-menu visibility control; rename the create-wrapper in the same pass. Excise only if "public-only forever" is the actual product stance |
| Q2 | **`logerp` arg-order**: reorder t-last to match `lerp` (breaking) or comment-fix now + book the reorder? | `logerp(10,20,.5)` silently returns ≈0; the "Canonical (a,b,t)" comment is violated by its own file; a reorder is semver-major (lib-core P1-2) | **Comment-fix + document now; BOOK the reorder for 3.0.0** (don't force a major for one signature) |
| Q3 | **`color-soa.ts`**: excise the orphan public API or keep gated? | Shipped in 2.0.0 for a kf consumer that never adopted it (0 hits in kf src/dist); its own doc names an unmet grounding gate; internal interp has its own SoA plan (lib-core P1-1) | **EXCISE at 2.1.0** with the zero-consumer evidence recorded — the constellation is the whole consumer universe and it's empty; re-introduce only behind a real kf consume-edge |
| Q4 | **The rainbow heading recipe** (3 consumers: `PalettesPane.vue:4` "My Palettes", `DockViewSelect.vue:97` — dies with W7-4 regardless, `PaletteDialogHeader.vue:37`): excise, or re-derive from `--accent-live`? | Fixed pastel ramp ≈1.1-1.5:1 contrast in light; ignores the accent axis; the page's only rainbow moment (design-browse); **and W4-7 lands in this SAME tranche unifying all 9 pane titles to the ink display voice — a re-derived ramp would keep exactly ONE title a chromatic exception among 8 ink siblings** | **EXCISE** (pass-2 FLIP from RE-DERIVE, on register coherence with W4-7/W4-8: letterforms speak one ink; hue-variation belongs to color-data surfaces — dots, ramps, palette strips — never to type; the browse lane's own option (a)). The 3-stop analogous `oklch(from var(--accent-live)…)` ramp stays ON RECORD as the owner's alternative if the moment must survive — relocated to a color-data surface, never a title |
| Q5 | **Pane titles adopt the display voice** (three-voice-law amendment; one `PaneHeader.vue:3` site, 9 panes) | Both design lanes independently converged; today the largest text on Browse/Palettes speaks Jakarta while smaller elements speak Fraunces — the hierarchy reads inverted | **YES** |
| Q6 | **Empty-state copy register**: where does the specimen-plate annotation class survive? | User ruled the extract plate copy superfluous; "· EMPTY PLATE ·" prints twice simultaneously; the eyebrow grammar is also "one of the best moments on the page" (browse) | Survives ONLY on true empty/error states, per-context eyebrows, never as a second invitation and never duplicated on-screen |
| Q7 | **Blob on mobile**: full presence (~7rem, corner-breaking) or absent at <lg? | The current `w-24` puck is a clipped smudge (canvas overflows the 390px viewport); the design brief names the middle forbidden (design-blob-atmosphere §2) | **ABSENT at <lg** — perf + the evidence; full presence ≥lg at the grown footprint |
| Q8 | **R-4 raytrace gamut map**: build now that its R-1 dependency settled? | Unblocked but zero demand signal in the S ledger or demo code (census §4) | **KEEP-BOOKED** — don't build without demand |
| Q9 | **Promote ICtCp to a public color space at 2.1.0?** | The matrix math (XYZ→LMS crosstalk, PQ, LMS′→ICtCp) already shipped inside `deltaEITP` at 2.0.0; only the class + parsing + dispatch wrapper remain — "the cheapest net-new space value.js has ever added" (census §4) | **YES** — fold into W1-6; Jzazbz stays deferred (unrelated math) |
| Q10 | **Mix animation**: re-author ≤1.2s Safari-true, or keep the 2.9s choreography with the clock fixed? | The current pour uses WebKit-unsupported `ctx.filter` (silent degradation), jump-cuts at ~40% visual completion every mix, gates an instant computation behind 2.9s, and converges on nowhere (design-extract F6; motion §3) | **RE-AUTHOR** ≤1.2s, one clock, reveal lands at the result plate |
| Q11 | **vue-router 5 in S?** | The trigger fired 2026-05-28 (now 5.1.0 `latest`); 8-tranche-old book; surface scan found no obvious blockers but a real scope probe hasn't run (census §2) | **YES, in S** — W0-7 scopes, W2-7 lands (sequenced LAST in W2, §3.1). **Objective de-scope bound** (pass-2 — "disproportionate" gets a number): the probe finding >1 breaking-change class requiring non-mechanical rewrites (typed routes / data loaders / memory-history semantics) OR an estimated migration diff >300 LoC books it instead; under both bounds it lands |

---

## §9 — Zero-drop fold ledger

### §9.1 S-1..S-24 (anchor items per §1)

S-1→W4-1 · S-2→W4-3(+L6, W8) · S-3→W4-5(+book) · S-4→W6-4(+L5, W8) · S-5→W7-6 · S-6→W5-8(+W1-6) ·
S-7→W7-2(+L8) · S-8→W7-1 · S-9→W3-1 (family W3-1..W3-5, W7-5) · S-10→W5-1(+L9) · S-11→W0-1(+W0-3,
W5-5) · S-12→W5-7 · S-13→W5-9(+L7, W1-6) · S-14→W4-1 · S-15→W5-10(+L10) · S-16→W4-3(+L6) ·
S-17→W5-3(+W8) · S-18→W6-1 (composite: W2-1, W6-2, W6-3, L1, L2) · S-19→W4-2 · S-20→W5-2(+W7-3,
W8) · S-21→binding precept (every item) · S-22→W0-2 (fixes: L1, W3-6, W6-5, L10c, L16) ·
S-23→W3-2(+W3-9, the pass-2 CSS half) + the §6.2 budget regime · S-24→W1-1 (family W1-1..W1-9).
**Zero drops.**

### §9.2 Every lane P0/P1 → disposition

(P2s fold per-lane-judgment, not uniformly — the exclusions were verified non-drops at pass 1.)

| Lane | P0/P1 finding | Disposition |
|---|---|---|
| design-picker | P1-1..P1-6 | W4-2 · W4-1 · W4-1 · W4-3/L6 · W4-3/L6 · W4-5 |
| design-dock-shell | P0-1 · P0-2 · P0-3 · P1-4 · P1-5 · P1-6 · P1-7 · P1-8 · P1-9 | W7-1 · W7-2 · W7-3/L4 · W7-4 · W7-4 · W7-5 · W3-7 · W7-6 · W7-6 (clampLabel→L8; Tools grammar→W7-6) |
| design-gradient | P0-1 · P0-2 · P1-3..P1-12 | W5-11 · L7 · W5-11 · W5-11 · W5-9 · W5-8 · W4-8(mono-code rung rider) · W4-8 · W6-2/W5-7(labels) · L6(thumbs) · W5-7 · W7-6(idle nav) |
| design-browse-palettes | S-10.1-.4 · rainbow · S-20 · S-17 · empty-dark · menu | W5-1/L9 · W5-7+Q4 · W5-2 · W5-3 · W5-5 · W5-4/L11 |
| design-extract-mix-generate | F1..F10 (P1) | W5-6 (F1,2,3,4,7,8) · L6 (F5,F14) · W3-6/Q10 (F6) · W6-2/-3 (F9) · W0-1 (F10); P2 F11-F18 → W5-6/W5-7/W2-6 |
| design-docs-about | P0-1 · P1-1..P1-7 | W4-4 · W4-1 · W4-1 · W4-1 · W4-7 · W7-6(S-5 anchor) · W4-6 · W4-7 |
| design-admin | F-1..F-14 | W5-12 (F-1,4,7,8,9,11,12,13) · W0-1/W5-5 (F-2) · W6-2 (F-3) · W7-1 (F-5) · W0-6 (F-6) · W7-6 (F-10) · W5-12+§6.1 (F-14) |
| design-blob-atmosphere-vision | P0-1 · P0-2 · P1-3..P1-7 | W6-1 · W6-2/L2 · W6-4/L5 · W6-4 · W6-4 · W6-3 · W6-6/L14 |
| aurora-derive-audit | 2×P1 | W6-2/L2 · W6-3/L2 (non-findings recorded: wiring INTACT — do not rebuild) |
| blob-greenfield-tech | S-blob-1..7 | L5 (1,2,3) · W6-4 (4) · W6-5 (5) · L5-deferred ≤12-atom (6, rides the producer's own decided ceiling) · W0-1 (7) |
| safari-truth | P0 shader · P1 blob · P2 prefix | L1+W0-2(gate) · L5+W6-5 · L16 |
| api-broken-rootcause | S-11.A/.B/.C | W0-1 · W0-3 · W0-1 (the localhost-in-prod-CORS shortcut REJECTED, recorded) |
| api-crud-audit | F-4(P0) · F-1 · F-3 · F-5 · F-6 | W5-13+Q1 · W5-13 · W5-13 · W5-13 · W0-3; P2 F-2/F-7/F-8/F-9 → W5-13 |
| architecture-di-boundaries | A1 · A2 · B1 · B2 · B3 | W2-8 · W0-1 · W2-4 · W4-1 · W6-2/L2; C1-C4 → W2-6/W2-4/W4-1/keep |
| state-color-pipeline | P0-1 · P0-2 · P1-1..P1-5 | W2-1 · W0-1 · W2-1 · W2-1 · W2-1 · W2-2/W2-3 · W6-3 (P2-1→W2-2; P2-2→W2-1) |
| god-module-dry-census | §2.1-2.6 + src table | W7-7 · W7-7/L15 · W3-8 · W3-8 · W4-1 · W5-1/L9; src splits → W1-8 |
| legacy-sweep-src | srgb P0 · ledger P0 · P1 dead export · P2 ch-unit · P2 god | W1-1 · W0-5 · W1-7 · W1-7 · W1-8 |
| legacy-sweep-demo-components | F1/F2 P0 · F3-F6 P1 · F7-F10 P2 | W2-5 · W4-1(F3,F4) · W7-1(F5) · W7-6(F6) · W2-9(F7,F8,F10); F9 = the L8/W8 book |
| legacy-sweep-demo-composables-lib | savedColors P1 · slug-status P1 · polls P2 · names-catch P2 · store P3 | W2-6 ×4 · the `usePaletteStore` NEW BOOK |
| lib-color-audit | 2×P1 · P2s | W1-1 (both) · W1-8 (splits/diet) · W1-7 (SPSA seed — optional rider) |
| lib-core-value-audit | P1-1 · P1-2 · P2-1..P2-6 | W1-7+Q3 · W1-7+Q2 · W1-7 · W1-8 · W1-7 · W1-6(resolveEasing) · W1-7 · W1-7 |
| lib-parsing-audit | F-1/F-2 P0 · F-3..F-6 P1 | W1-2 · W1-3 · W1-8 · W1-4 · W1-8(scanners) · W1-5; F-7→W0-6(BBNF)+memory-fix · F-8 comment · F-9→W1-4 |
| parse-that-audit | P1 dead-expected · P1 Parser<any> · PT-A..E | W1-9+PT-E · W1-8(ParsedNode optional) · W0-6 · W1-9 · W1-2 · optional · W1-9 |
| perf-general | P0 zombie · P0 eager · P1 caches · P2 CSS | L3 · W3-2 · W1-5 · **W3-9** (pass-2: the coverage pass promoted from ambiguous rider to owned item); dev fan-out = informational (do NOT pre-bundle glass-ui — the K.W2.5 lesson) |
| perf-transitions | P0-1 · P0-2 · P1-1..P1-4 · P2-1 | W3-1 · W3-3+L5 · W3-4 · W3-4 · W3-4 · W3-5 · settle-to-static aurora = design call inside W6-3 |
| motion-animation-inventory | P0-M · S-13 · M3-M6 | W3-6 · W5-9/L7 · W3-5 · W3-5/L13 · W3-4 · W9(inventory patch, docs). Pass-2 note: the lane's "perf-transitions P1-7" cite is a PHANTOM (that lane numbers P1-1..P1-4); the finding it names — the 0.55s dock hover-morph — is captured at W3-5 + letter L13. Successors: do not chase P1-7 |
| aliasing-dithering | A P1 · B P1 · C P2 | W5-10+L10 (all three; user hypotheses RULED OUT stays on record) |
| dropdown-select-consistency | 2×P0 · 4×P1 · P2s | W4-1 ×2 · W5-4 ×3 · W5-4(buttons)/W7-6(casing — the S-5 anchor per §1/§9.1; pass-2 citation fix) · W5-4(size/naming/labels) |
| e2e-coverage-gaps | P0 1-3 · P1 4-6 | W0-2 · §6.1 (π matrix, frame budgets, overflow matcher); the named rejections carried verbatim |
| glassui-bg-bh-assay / consume-map | routing table · F1-F5 | adopted wholesale as §7.1/§3.10's ground truth; F1→L8 · F2→W4-5 · F3→W5-3 · F4→L12 · F5→W4-1 |
| traceability-prompts | §9 rows 1-5 | 1→W4/W5/W7 (this spec) · 2→W8 · 3→W0-1 + W0-3(alias probe) + the §7.3 X2 book (pass-2 — the NCSU-alias retirement's explicit home) · 4→W1-8/W5+the standing repo-wide sweep posture (S's close gate re-runs the caps repo-wide, not touched-surfaces-only) · 5→N/A-NO-TRACE stands (orchestrator restates from the live session if it matters to ratification) |
| deferred-books-census | findings 1-8 | 1→W2-7/Q11 · 2→W1-6/Q9 · 3→W0-4 · 4→W0-5 · 5→W1-1 · 6→Q8 · 7→W9 recheck lane · 8→resolved (S-11 ≠ K-INV5 residual: the latch is correct; the root is the dev entrypoint — W0-1) |

### §9.3 Census verdicts (deferred-books-census) — adopted / overridden

ADOPTED: all §1 discharges (W0-4) · K-W5RT FOLD (W2-7) · R-6 FOLD (Q9) · CHANGELOG FOLD (W0-5) ·
srgb KEEP-BOOKED-then-fires-at-W1 (adopted with the census's own "bundle the DRY fix in the same
commit" rider) · R-4 KEEP+flag (Q8) · spec-recheck lane (W9) · S-11/K-INV5 collision resolved
(§9.2). OVERRIDDEN: none. KILLS carried: R-8 mechanism · sibling-index/count · device-cmyk · ICC.

---

## §10 — Process lessons carried

1. **Resolve cross-lane contradictions against the LIVE tree before elevating either claim** (R
   lesson 1). Exercised in this synthesis: the aurora composite (§0.7), the S-3 rail
   (SegmentedTabs-vertical exists → same-repo reuse, not a producer ask), the S-10 shimmer seam
   (the MEASURED dead-delay claim elevated over the "tune within the primitive" read), the S-11
   entrypoint verdict (the root-cause lane's design fix over the env-note read).
2. **"Wave closes green" ≠ "the repo stays green."** R.W3 closed green against its own π pair and
   the S-ledger reopened six picker rows under live owner probing. S's answer is structural: the
   §6.1 standing π matrix reviewed by a NON-authoring agent, budgets as numbers, smoke-safari in
   CI — and S's close gate re-runs the repo-wide sweeps (caps, legacy, `as any`), not just touched
   surfaces (traceability §9.4).
3. **The producer moves daily — treat drift as a designed-for condition.** CI stays pinned to
   `tranche/BG` until the 5.0.0 master landing (un-pin book); the abrogation tripwire keeps its
   dts half; `boot-smoke` cold is the named-export catch-all; every live probe cites the glass-ui
   HEAD; partially-landed producer waves may be in the consumed dist — probes note it. Pass-2
   corollary: lane-level "verified at HEAD" claims are spot-re-verified against the synthesis's
   own pinned substrate at wave-open, not trusted at their original audit-time stamp.
4. **Books discharge silently unless someone re-checks.** Three books fired post-R-close
   undetected, and vue-router's trigger sat fired for five weeks. S.W9 re-verifies every open book
   against the live world before close (the census pattern becomes a close-gate step).
5. **Test comments are not filings.** The `round()` crash and the okhsl dodged band were both
   documented in test comments that carved AROUND the defects — a green gate over a known bug.
   S's rule: a known divergence gets a ledger row or a fix, never a carve-out comment alone.
6. **Rate-limit recovery pattern stands** (R lesson 10): recover the work-order from the lane
   journal, re-dispatch a completion lane, row-scope the commits.
7. **Shared-browser contention corrupts probes.** Multiple S lanes documented sibling agents
   driving the same Playwright session (one lane nearly booked a phantom routing defect from it).
   Standing rule: live probes run in isolated contexts; anomalies observed under sharing are
   disclosed, not filed.
8. **Bounded numbers beat vibes, and their baselines get recorded** (R lessons 3/6): every §6.2
   budget carries its measured baseline; re-baselining is an on-record event.

---

## §11 — Pass-2 dispositions (2026-07-04)

Pass-1 scored mean 86 / min 72 with 13 mustFix + 16 dissents (`audit/PASS1-VERDICT.md`). Every
mustFix is DISCHARGED; every dissent is dispositioned below. **REJECTED: none** — every dissent
was either folded (cheap) or absorbed by a mustFix cure.

### mustFix (13/13 discharged)

| # | Critic · defect | Cure landed at |
|---|---|---|
| 1 | completeness · NCSU-alias retirement had no home | §7.3 X2 NEW BOOK (maintainer-on-NCSU-VPN trigger + the exact `apache-vhost.conf:19-27` on-host op) + the W0-3 probe rider |
| 2 | root-routing · L1 pinned to stale `5cf8e8f0` | §7.1 L1 + §0.7 re-pinned: verified at HEAD `a633784f`, provenance spans `5cf8e8f0`..`BG.W-AUR-METAL-FINISH`, vec3→vec4 widening context stated |
| 3 | design-register · W7-1 vs W7-4 chromatic contradiction | W7-1 morph clause: view hue rides the seal RIM (the continuity carrier into the trigger's `--accent-view` ring); the live wax cross-fades out with the seal; no element animates live→view-hue; π quadrant confirms (W7 Completion) |
| 4 | design-register · W4-1 under-specced for a flagship | W4-1 re-specced at treatment depth: rest (caret-only, zero surface) / hover (ink-shift/underline, never surface re-grow — P1-2's clause folded verbatim) / focus-visible (C5 ring) / open (caret 180°, glass belongs to the dropdown) |
| 5 | architecture · W1-8 serialize-only lift leaves 968→~750 | W1-8: BOTH lifts (serialize.ts AND spaces.ts); barrel keeps base+brand+helpers; cap-check gate rider added |
| 6 | architecture · census's utils.ts/normalize.ts splits dropped | W1-8 names both: `units/dom-metrics.ts` (722→DOM block out) + `units/layout-cache.ts` (550→epoch cache out); flatten/unflatten explicitly stays (recorded non-assumption) |
| 7 | architecture · W6 L-band bar unhedged on L2 | §3.8 Completion + W6-2: record-the-miss + re-verify-at-W8 fallback (the W6-4 pattern); §7.1 hard-gate map |
| 8 | architecture · W9 missing Goal/Completion pair | §3.11 gains both sentences |
| 9 | feasibility · W2-2⊣W1-6 breaks "W1 ∥ W2" | §3.1 intra-round ordering: W1-6 helper lands FIRST in W1; W2-2 sequenced LAST in W2 (+ item notes) |
| 10 | feasibility · CSS budget half had no mechanism | NEW W3-9 (glass-ui `/styles/critical`+`/styles/deferred` consume off `critical-partition.mjs` + the coverage/purge pass); §6.2 row restated as two owned gates; W3-2's PointerDebugOverlay non-lever honesty fix |
| 11 | feasibility · W5 oversized, no lane split | §3.7 laned A (browse/palettes/admin + CRUD-truth agent) / B (extract/mix/generate) / C (gradient + aliasing); W5-7 executes per-lane; independent gates |
| 12 | feasibility · round-2 double-writer on ColorPicker.vue | §3.1 single-writer note: W4-2 lands first, W3-4 rebases |
| 13 | evidence · W1-7 unpackMatrixValues clause read as current-behavior | W1-7 reworded: the live atan2 nonsense is the DEFECT; return-0 is the fix |

### Dissents (16/16 dispositioned, 0 rejected)

- **completeness/S-5 ledger row** — FIXED: §9.2 dropdown row now reads W5-4 ×3 + W5-4(buttons)/W7-6(casing).
- **completeness/P2 tier** — NOTED in the §9.2 header (per-lane-judgment, verified non-drops).
- **completeness/phantom perf-transitions P1-7** — FIXED: successor warning in the §9.2 motion row.
- **root-routing/letter hard-gates** — FOLDED: §7.1 hard-gate map (L2/L4/L1 → W6-2·W6-3/W7-3/W6-5) + per-item fallbacks.
- **root-routing/CLAUDE.md parse-that `^0.13.0`** — FOLDED into W0-5's doc-truth sweep.
- **design/Q4 vs W4-7** — ACCEPTED, Q4 FLIPPED to EXCISE (register coherence; the ramp stays on record as the owner's relocated alternative).
- **design/W4-5 SegmentedTabs indicator** — FOLDED: verify-live-first-task clause; letter-rail book fires on failure.
- **design/W4-8 vs Q4 hue boundary** — FOLDED: the boundary stated in W4-8 (letterforms one ink; hue belongs to color-data), and the Q4 flip dissolves the surface-level conflict.
- **architecture/W7 completion catch-all** — FOLDED: §3.9 Completion names W7-3/6/7's π-review verification as deliberate.
- **architecture/W1-7 grab-bag** — FOLDED: "land as N small commits" note.
- **architecture/reconciliation track record** — praise; no action.
- **feasibility/W2-7 density** — FOLDED: sequenced LAST in W2 + Q11 objective de-scope bound (>1 non-mechanical class OR >300 LoC).
- **feasibility/W7-5 metric redefinition** — FOLDED: full-swap assertion clause on W7-5 (frame-2+ cost counts against the ≤50ms long-task row).
- **feasibility/W3-3 threshold coordination** — FOLDED: N-vs-sampling-window note on W3-3.
- **evidence/W1-2 line range** — FIXED: cite tightened to `index.ts:197-205`.
- **evidence/lane HEAD-currency** — FOLDED: §10 lesson 3 corollary (spot-re-verify at wave-open).

## §11a — Pass-3 dispositions (2026-07-04)

Pass-2 scored mean 95.7 / min 92 with exactly 2 residual mustFix + 2 cheap dissents. The pass-2
verdict was delivered in-orchestration (no `PASS2-VERDICT.md` on disk — this block is the durable
record; `PASS1-VERDICT.md` remains the pass-1 record).

### mustFix (2/2 discharged)

| # | Critic · defect | Cure landed at |
|---|---|---|
| 1 | completeness(96) · the §3.3 W1-8 cap-check was internally inconsistent for `units/utils.ts`: the enumerated lift extracts only the ~140-LoC DOM block (722 − 140 ≈ 582, still >500) while the exception clause named only `stylesheet.ts`/`color.ts` — a guaranteed silent miss | §3.3 gate riders: the cap-exception clause now ALSO names `units/utils.ts` (the deferred flatten/unflatten root-fold as the stated reason), symmetric to the stylesheet.ts/color.ts treatment — the ledger row fires by construction, never silently |
| 2 | evidence(92) · the §3.9 W7-1 morph clause asserted producer/trigger surfaces as present-tense fact ("the ring the trigger already wears (`--dock-ring` → `--accent-view`)", the rim "grows into…") | §3.9 W7-1 reframed with design-intent verbs (the rim ADOPTS `--accent-view`; it "is designed to grow into" the trigger's ring); every exists-today claim live-verified at pass 3 (glass-ui HEAD `c03ab942`: `--dock-ring` has NO consumer in producer src or dist — the demo sets it to LIVE safeAccent at `DockViewSelect.vue:55`; the collapsed dot is live at `Dock.vue:218`; the collapsed icon paints `--accent-view` at `Dock.vue:225`) and cited, or reworded as to-be-built |

### Dissents (2/2 folded, 0 rejected)

- **L2 atom naming vs the existing hue-"scheme" language** — FOLDED: §7.1 L2 now flags bare
  `scheme` as ambiguous against the atoms door's `harmony` ("the hue scheme", `atoms.ts:106-107`,
  verified live) and suggests `lightnessScheme`/`lBand`; the final name stays the producer's call.
- **L1 dispatch-time currency** — FOLDED: §7.1 L1 gains the corollary — the dispatching agent
  re-stamps the verified HEAD at dispatch; `a633784f` was the pass-2 stamp (glass-ui stood at
  `c03ab942` when pass 3 amended this spec).
