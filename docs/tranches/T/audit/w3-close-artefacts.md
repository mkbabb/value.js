# T.W3 — CLOSE ARTEFACTS (the round-2 gate, consolidated)

**Wave**: T.W3 — THE MATERIAL LADDER · NEUTRALS · INK (W3-1..W3-5 — the CORE lane [W3-1 tokens +
W3-4 header] single-writes the tier tokens + `PaneHeader.vue`; W3-2/W3-3/W3-5 are consumer lanes).
**Closed**: 2026-07-10, branch `tranche-t` (core merged at `d99303f`; the three consumer lanes at
`9b7fbd2`/`e4dd2ee`/`ba0706e`; round-2 head `e1151de`).
**Verdict**: **`complete_with_misses`** — the round-2 CLOSE gate re-ran the 7-row `T.W3.md §Hard
gate` and returned **7 PASS, zero FAIL**. The `_with_misses` qualifier is the round-2 gate being
STRICTER than the boot-lane self-close (event row 142 reported `complete`): two recorded
environment-class items ride the certification, neither a defect — **(a)** the full 6-project
playwright suite was NOT locally re-driven by the round-2 gate (smoke-safari needs a WebKit install;
smoke-perf/mobile carry environmental caveats) → the four named census mints were verified directly,
the full-suite green rests on the lane records + the CI e2e-smoke SUCCESS (run `29131814948`); and
**(b)** the O-11 gate-4 CDP layout-track flake (a single stray Layout event, 6 vs ≤5, under the
concurrent 6-project run's CPU contention) — VERIFIED GREEN in isolation ×3 + self-healed in CI
under retries=2. Both are honest recorded misses (routed / self-healing), zero FAIL, all 7 hard-gate
rows PASS.
**Governing law**: `RATIFICATION-2026-07-09.md §0` verbatim wins (Q4 "The well." · Q18 C3-law +
warm-neutral family · Q10 "Keep." · Q9 header effect-bracket) → `MANDATE-2026-07-06.md §0` + addenda
→ `SYNTHESIS.md` as-hardened §3 (T.W3) + §6.1/§6.2 → `waves/T.W3.md`, with every anchor re-derived
against `audit/w1-move-map.md` (PP-11 — `ShadowPalette` at `palette-browser/card/`, `ink.ts` at
`@composables/color/`).
**This doc consolidates**: the 7 §Hard-gate rows + verdict + evidence **verbatim from the round-2
close gate** (§1) + the `_with_misses` basis (§2) + the gates INDEPENDENTLY re-run at round-2 (§3) +
the four-lane commit map (§4) + the grep captures (§5) + the minor non-gate observations (§6) + the
verification-artefacts index (§7). The lane records are `audit/w3-core-lane-record.md` (W3-1/W3-4 +
the MOB-1 rider adjudication) + `audit/w3-ink-lane-record.md` (W3-5, D6); **this doc is the round-2
gate adjudication over them.**

---

## §1 — The 7-row §Hard gate (verbatim: each row + verdict + evidence, from the round-2 close gate)

> **1. W3-1**: O-7 card-material census green — every pane + fixture resolves to its ONE rung
> (MEMBERSHIP, not fixed alpha), both schemes; the t-mobile F-8 390-frame; the 6 well mints dead
> (grep); raw `bg-black`/`bg-white` dead; the C3 law + exception ledger in DESIGN.md.

**PASS** — I RAN `o7-card-census.spec.ts` (ports 9350/9351, amended tree, HEAD `e1151de`):
**light + dark + 768 (F-7) + 390 (F-8) ALL GREEN** (tests 20-23). Every pane Card
`data-tier=resting` + grain + stamp; wells (dashedWell/mixPlate/perceivedPlate/paletteCard)
byte-equal `--well-bg` + `backdrop none`, both schemes; the perceived double-stamp dead. **6 well
mints DEAD**: consolidated onto ONE `bg-well`/`var(--well-bg)` — stop chip, PaletteCard+Skeleton,
PerceivedSpacePlate, VersionHistoryDrawer, MixResultDisplay, `.dashed-well` (utils.css) all route
the token (grep). raw `bg-black`/`bg-white`/`text-white` DEAD (grep: comments only, 0 `class=`
usage). The C3 LAW + full 9-row exception ledger + material-ladder NORMATIVE + retired-by-name list
all present in `demo/DESIGN.md`.

> **2. W3-2**: O-9 all-cases — zero-result ⇒ ghost + `aria-hidden` + caption carries AT ("never a
> bare text plate"), per host class; error states UNTOUCHED (R7: error ≠ empty).

**PASS** — I RAN `o9-shadow-palette.spec.ts`: **5/5 GREEN** (tests 24-28). Extract live-k ghost
(5→6 segs under k-slider), Mix→Palettes 2 ghosts, PaletteCardGrid My Palettes 3 in-grid ghosts,
Browse empty-commons 3 ghosts — each `aria-hidden=true` + a visible caption for AT + the MOTION leg
(`animationName none`, polled). **error ≠ empty**: the Browse error plate wears NO ghost, plain
register untouched (R7), the sibling My Palettes keeps its 3 ghosts. `ShadowPalette.vue` colocated
at the card family per the move-map.

> **3. W3-3**: the O-7 row for the seated field green; judged beside dashed-well + card in-frame;
> mono is opt-in content-class only.

**PASS** — asserted inside the GREEN O-7 census: the Palettes/Browse `.search-seated` seats resolve
to the well token + `backdrop none`, a solid `--card-edge` hairline (≥1px), the chip stamp present,
`maxWidth none` (the dock 24rem cap dead), width == column within 1px (the F-7 78px-rag class dead),
`fieldFont` NOT mono (content-class voice, mono opt-in only). The **768 F-7 frame GREEN** (test 22)
with judged-beside captures attached.

> **4. W3-4**: O-11 gates 1-6 green (rest floor ∈ [0.45,0.65] · no band · no double-exposure ·
> compositor-only with the CDP layout track FLAT · engine/PRM coherence · one grammar); swell ≤64px;
> the supersession annotations landed.

**PASS** — I RAN `o11-header-gates.spec.ts`: **6/6 GREEN** (tests 1-6). Gate1 rest floor 0.52 ∈
[0.45,0.65] both schemes all 7 panes; Gate2 feather mask present rest+stuck; Gate3 no
double-exposure (≥0.85@48px, =1@64px, swell ≤64px); Gate4 compositor-only pane-* keyframes
transform/opacity only + CDP `devtools.timeline` Layout track FLAT (≤5) under live scrub — **GREEN
this run (5.4s)**, the recorded load-induced flake did NOT reproduce; Gate5 engine/PRM coherence +
all `--pane-scroll` bindings `@supports`-gated; Gate6 one grammar (no rogue in-card sticky).
**Supersession annotations LANDED**: `S/audit/pi/w5a-after/DELTA.md` (W5-2 FORENSICS RIDER) +
`S/waves/S.W5.md:42` both carry the `[SUPERSEDED at T.W3-4 / T.W3-1 R8]` text (record repair).

> **5. W3-5**: O-18 population contrast census green — the 1×1-canvas resolver over the ACTUAL
> consumer selectors vs their REAL parent grounds, both schemes, at `lab(38% 32 24)`;
> `BG_LIGHTNESS_DARK/LIGHT` gone (grep); zero guard-then-alpha on W3's routed set (readout-frac →
> W4).

**PASS** — I RAN `o18-contrast-census.spec.ts` at `lab(38% 32 24)`: **10/10 GREEN both schemes**
(tests 7-16) — slug-pill, profile-trigger, plate-caption (`--ink-muted`), graph-node
resting+hover (fill/ink chain), component-name, about-prose, about-code, `--accent-live` root leg
all ≥ floor. **`BG_LIGHTNESS_DARK/LIGHT` GONE from code** (grep: 8 hits ALL
retirement-citation comments, 0 const/expr usage). guard-then-alpha on the routed set = **0**:
`ParseEchoReadout` cured to `--ink-muted` (no `/NN` ink alpha); the residual `/40`–`/70` hits are
bg/ring/decorative-icon alphas OUTSIDE the routed certified-ink set (the readout-frac cure is W4's,
per h-dag D-4). **3 skipped = the born-RED W4 `test.fixme` rows, by design** (the ink lane record
10/10 corroborated independently).

> **6. The CSS tripwire** [AMENDED-AT-PASS-2]: CSS gz re-measured; **>120 KiB REDS the wave**.

**PASS** — re-measured on a fresh gh-pages build (HEAD `e1151de`). Render-blocking CSS =
`index-BljNrpb3.css`: raw 532,818 B, **GZIP 89,223 B = 87.13 KiB ≤ 120 KiB** (32.87 KiB headroom).
`glass-fonts` (98 KiB gz) is DEFERRED (`media=print onload`; the second link inside `<noscript>` =
non-render-blocking). Growth 86.6→87.1 KiB from the ladder/seat/ink tokens, as recorded. GREEN — no
RED at >120.

> **7. PP-8 repo-wide sweep · PI-1 delta recorded · lint 0 · typecheck 0 · vitest green · e2e green
> (incl. the O-7/O-9/O-11/O-18 mints) · clean `git status`.**

**PASS** — Composite: **PP-8 sweep GREEN** (0 demo files >400 LoC excl `ui/`; PaneHeader /
ShadowPalette / ink.ts / PaletteCard all under cap). **PI-1 Lighthouse delta RECORDED**
(`pi1-delta-ledger.md` W2/W3 CI same-instrument row: LCP 5151 / TBT 4223, honestly RED — the CORRECT
W3 disposition: delta measured+recorded, green is the W9 gate). **lint 0** (exit 0). **typecheck 0**
(vue-tsc lib + demo, exit 0). **vitest 2192/2192 pass, 71 files.** **e2e mints GREEN** (25 passed /
3 skipped, my own run of all four census oracles). `git status` CLEAN. tool-artefact grep over the
touched docs EMPTY.

---

## §2 — The `_with_misses` basis (the round-2 gate stricter than the lane self-close)

The boot-lane self-closed as `complete` (event row 142). The independent round-2 CLOSE gate
certifies **`complete_with_misses`** — the delta is two recorded environment-class items the round-2
gate (not the lane) surfaces, neither a defect, both honestly recorded:

- **(a) The full 6-project suite not locally re-driven** — I independently ran the FOUR named census
  mints (O-7 / O-9 / O-11 / O-18) — ALL GREEN — under `VJS_E2E_PORT=9350 VJS_E2E_PERF_PORT=9351 npx
  playwright test --project=smoke` (owner's :9000 left untouched; 25 passed / 3 skipped, exit 0).
  The full 6-project suite (smoke / admin / mobile / reactivity / perf / safari) green rests on the
  lane records + the integrator's recorded CI e2e-smoke SUCCESS (`29131814948`); smoke-safari needs a
  WebKit install and smoke-perf/mobile carry environmental caveats, so I did not re-drive those
  locally. The mints — the gate deliverables — I verified directly.

- **(b) The O-11 gate-4 CI flake (recorded)** — GREEN in my round-2 run (CDP Layout track flat under
  live scrub, well within ≤5, 5.4s). The integrator's recorded 6-vs-5 flake did NOT reproduce
  (consistent with "load-induced, green in isolation + CI under retries=2"). VERIFIED GREEN in
  isolation ×3 and self-healed in CI under `retries=2` (`29131814948` e2e-smoke SUCCESS). A recorded
  flake, not a defect.

Neither downgrades below CLOSE — all 7 hard-gate rows PASS, zero FAIL. The **3 skips** are the
born-RED W4 `test.fixme` rows (O-18 readout fracs / channel letters / ConfigSliderPane — cure at
W4-3/W4-4, by design); the 2 O-3 headed-GPU skips are the headless class (W2's environment book).
The honestly-RED **Q14 delta** is the tracking instrument's correct W3 state (green is the W9 gate),
not a W3 miss.

---

## §3 — Gates INDEPENDENTLY re-run at round-2 (not the lane's word)

The round-2 gate re-RAN the four census oracles + re-measured the tripwire:

1. **O-7 card census** — RAN light + dark + 768 (F-7) + 390 (F-8): the 6-well-mint retirement is
   REAL by identity (the census asserts dashedWell/mixPlate/perceivedPlate/paletteCard byte-equal
   the ONE `--well-bg` token; grep confirms stop chip + VersionHistoryDrawer + Skeleton also route
   `bg-well`; the only non-token bg-alpha hits are a DESIGN.md retirement comment + an ImageDropZone
   `bg-background/85` hover caption chip — not a plate-well species).
2. **O-9 shadow-palette** — RAN 5/5: the ghost + `aria-hidden` + AT-caption law at all host classes;
   error ≠ empty (R7) held.
3. **O-11 header gates** — RAN 6/6: gate-4 GREEN this run (I did NOT reproduce the recorded 6-vs-5
   flake — the CDP Layout track was flat under live scrub); the load-induced flake self-heals under
   retries.
4. **O-18 contrast census** — RAN 10/10 both schemes at `lab(38% 32 24)`; `BG_LIGHTNESS_DARK/LIGHT`
   grep = retirement comments only (0 code); guard-then-alpha on the routed set = 0.
5. **The CSS tripwire** — re-measured on a fresh gh-pages build: only `index-*.css` is
   render-blocking for JS-enabled users; the two `glass-fonts` links are (a) `media=print onload`
   deferred and (b) inside `<noscript>`. `index` gz = 89,223 B = 87.13 KiB ≤ 120.

The ink lane reported `null` to its orchestrator (a StructuredOutput crash), but its committed
4-commit work is complete + green per `audit/w3-ink-lane-record.md` — integrated as committed green
work, not skipped; the O-18 census the round-2 gate re-ran corroborates it 10/10. The feared
9-typecheck-error integration defect NEVER materialized — typecheck was ALREADY 0 on `d99303f` and
stayed 0 through all three merges.

---

## §4 — Four-lane commit map (the core single-writer lane + three consumer lanes + integration)

**CORE lane** (W3-1 tokens + W3-4 header — the single writer; `audit/w3-core-lane-record.md §1`),
merged at `d99303f`:

| Commit | Item |
|---|---|
| `5f89967` | W3-1 tokens — `--well-bg` (rung-2) · `--stage`/`--on-stage-chrome` (rung-4 warm-stone) · `@theme` bridges |
| `b608b5f` | W3-1 deploy — 9 pane cards → `tier="resting"`; the 6 well mints die onto `bg-well`; O-7 armed; the lane-port seam |
| `ce95c1d` | W3-1 docs — DESIGN.md: THE MATERIAL LADDER (NORMATIVE) + THE C3 LAW + the 9-row exception ledger (Q18) |
| `6f67ff8` | W3-4 — PaneHeader re-authored (constitutive veil, rest floor 0.52, feather every state, swell ≤64px, `@supports` gate); O-11 minted 6/6; the supersession annotations |
| `d99303f` | **merge(T.W3 · material-ladder core lane)** — the ladder + C3 LAW + `--well-bg`/`--stage` · O-7 census + O-11 header gates |

**W3-2 ShadowPalette** consumer lane (merged `9b7fbd2`):

| Commit | Item |
|---|---|
| `a57e0e4` | the D9 shadow-palette species at the three host classes — O-9 all-cases + MOTION leg minted GREEN |
| `9b7fbd2` | **merge(T.W3 · W3-2)** — Extract live-k ghost · Mix ×2 · PaletteCardGrid ×4 · the `specimen` ink walk consumed |

**W3-3 search seat** consumer lane (merged `e4dd2ee`):

| Commit | Item |
|---|---|
| `e72d4e9` | the seated register at the three pane search bars (T-12) — fields on paper wear paper |
| `e4dd2ee` | **merge(T.W3 · W3-3)** — the `.search-seated` register-law opt-in (well fill · card-edge hairline · stamp · dock-cap dies · content voice) |

**W3-5 ink-on-tier** consumer lane (merged `ba0706e`):

| Commit | Item |
|---|---|
| `5e584aa` | THE INK-ON-TIER CONTRACT (D6) — the `BG_LIGHTNESS` constants retired onto live `derivedLightness`; O-18 census minted |
| `d2beef9` | the W3-5 recovery brief + lane record (the §Recovery four-step; the earned catch; the O-18 table) |
| `baba17c` | PaletteCard back under the 400-LoC cap (the D6 comment condensed — PP-8 seam) |
| `cc263b5` | the tier-tint probe scheme/epoch-scoped, never per-frame — the recipe cache |
| `ba0706e` | **merge(T.W3 · W3-5)** — the D6 contract; every routed consumer certified; O-18 population census green |

**Integration close** (post-merge, on `tranche-t`):

| Commit | Item |
|---|---|
| `e1151de` | round-2 integration close — the PI-1 same-instrument CI row (LCP 5151 / TBT 4223) + the W1 backfill + the W3 CLOSED event row |

`utils.css` AUTO-merged (shadow's `.specimen-seg` + search's `.search-seated` = disjoint regions);
**zero conflicts across all three consumer lanes.**

---

## §5 — Grep captures (the gate's own predicates, re-run at round-2)

- **6 well mints retired** — dashedWell/mixPlate/perceivedPlate/paletteCard byte-equal the ONE
  `--well-bg`; stop chip + VersionHistoryDrawer + Skeleton route `bg-well`; the only non-token
  bg-alpha hits = a DESIGN.md retirement comment + an ImageDropZone hover caption chip.
- **raw `bg-black`/`bg-white`/`text-white`** = **0** `class=` usage (comments only).
- **`BG_LIGHTNESS_DARK/LIGHT`** = **8** hits, ALL retirement-citation comments, **0** const/expr.
- **guard-then-alpha on the routed set** = **0** (`ParseEchoReadout` cured to `--ink-muted`; residual
  `/40`–`/70` = bg/ring/decorative-icon alphas outside the certified-ink set).
- **PP-8 caps** — no `demo/` file >400 LoC (PaneHeader / ShadowPalette / ink.ts / PaletteCard under
  cap; PaletteCard at exactly 400 post cap-cure); casts `src` **8**/0 · `api` **1**/0.
- **tool-artefact grep** (`grep -rnE '</?(content|invoke|parameter|antml)'` over the W3 docs) = CLEAN.
- **`git status --porcelain`**: empty (the three consumer branches merged, 0-unique verified,
  worktrees cleaned).

---

## §6 — Minor non-gate observations (NOT misses)

1. **The MOB-1 rider** stays a routed book (from W1) — the CORE lane's §5 adjudication re-affirmed
   NOT-landable this round (App.vue is W2's exclusive single-writer surface + the D8-1
   CI-canary-chain conflict); carried to the T.W4.5 checkpoint / W6 shell lane with the resolution
   sketch. Not a W3 gate row.
2. **The O-11 gate-4 flake** (§2b) is load-induced CPU-contention under the concurrent 6-project run
   — GREEN solo ×3, self-healed in CI under retries=2. A recorded flake, not a defect.
3. **The honestly-RED Q14 delta** is the tracking instrument's CORRECT W3 state — the reveal-only
   law's LCP-identity cure cannot move the CI LCP floor while FCP ≈ 4.3s (the eager-payload mount)
   gates first paint → the W7 payload half; green is the W9 close gate, not a W3 requirement.

---

## §7 — Verification-artefacts index (cited at close, per `T.W3.md §Verification artefacts`)

- **The core lane record** (W3-1/W3-4 + the O-7 census table + the O-11 six-gate record + the MOB-1
  rider adjudication + the §Recovery resume addendum): `audit/w3-core-lane-record.md`.
- **The ink lane record** (W3-5 D6 + the O-18 census table + the earned §Recovery catch):
  `audit/w3-ink-lane-record.md`.
- **The C3 LAW + the 9-row sanctioned-exception ledger + the four-rung material ladder table + the
  "retired by name" list**: `demo/DESIGN.md` (NORMATIVE, Q18-ratified; consistent with the
  RATIFICATION §0 rulings — Q4 "the well", Q5 two-site letterform ramp, Q18 warm neutral family).
- **The oracle mints**: `e2e/smoke/oracles/o7-card-census.spec.ts` · `o9-shadow-palette.spec.ts` ·
  `o11-header-gates.spec.ts` · `o18-contrast-census.spec.ts`.
- **The CSS tripwire measurement**: §1 row 6 (render-blocking `index-*.css` gz = 89,223 B = 87.13
  KiB ≤ 120; `glass-fonts` deferred).
- **The PI-1 W3 (same-instrument CI) delta row**: `pi1-delta-ledger.md:44` (run `29131814948` /
  `ba0706e`; LCP 5151 / TBT 4223, honestly RED, NOISE vs baseline).
- **The supersession annotations (record repair)**: `S/audit/pi/w5a-after/DELTA.md` + `S/waves/S.W5.md:42`.
- **Per-lane commit hashes**: §4 above.
