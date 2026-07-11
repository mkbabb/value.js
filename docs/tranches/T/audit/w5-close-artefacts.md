# T.W5 — CLOSE ARTEFACTS (the round-4 gate, consolidated)

**Wave**: T.W5 — MOTION LIQUID (T-14; the PI-5 two-tranche split — ONE single-writer motion lane
over the liquid-easing family files + the O-16 census agent).
**Closed**: 2026-07-11, branch `tranche-t` (the motion-liquid lane merged at `f23b97b`; the
round-4 CLOSE gate re-ran at HEAD `abff923`).
**Verdict**: **`complete_with_misses`** — the round-4 CLOSE gate re-ran the 8-row `T.W5.md §Hard
gate` and returned **7 PASS + 1 MISS-RECORDED, zero FAIL**. The lone MISS is row 8's e2e
all-project run: 132 passed / 3 failed, the 3 reds ALL forensically non-W5, non-product (a
documented reka-ui Select detach flake + two stale gradient specs vs the owner-ordered W6-lane
re-authored surfaces) — recorded, adjudicated, and routed (Lane G spec-update / Lane E
spec-retirement), zero W5 motion regressions. The other five projects
(admin/mobile/reactivity/safari/perf) are green; row 8's static half (lint 0 · typecheck 0 ·
vitest 2222/2222 · 0 demo file >400 LoC) is PASS.
**Governing law**: `RATIFICATION-2026-07-09.md §0` verbatim wins → `MANDATE-2026-07-06.md §0` +
addenda (§0.5 = T-30/31/32; §0.6 = the 2026-07-11 owner audit, T-48 = W5's own charge: the card
transitions judged FRAME-BY-FRAME against the liquid principles) → `SYNTHESIS.md` as-hardened §3
(T.W5) + §2 D7 (THE LIQUID-EASING FAMILY) + §6.2 → `waves/T.W5.md`, with every anchor re-derived
against `audit/w1-move-map.md` (PP-11 — the family resolved to `color-picker/App.vue`,
`@styles/animations.css` [enter legs only], `@styles/style.css` [motion region ~86-150],
`palette-browser/card/PaletteCard.vue`, `controls/CurrentPaletteEditor.vue`,
`controls/ComponentSliders/*`, `color-picker/ColorInput.vue`, `color-picker/ColorPicker.vue`,
`BrowsePane.vue` + `PaletteBrowseTab.vue` + `PaletteCardSkeleton.vue`, `PaletteDialog.vue`).
**This doc consolidates**: the 8 §Hard-gate rows + verdict + evidence **verbatim from the round-4
close gate** (§1) + the `_with_misses` basis (§2) + the motion-family commit map (§3) + the booked
swaps PKT-1..4 carried (§4) + the CSS gz + PI-1 state (§5) + the grep captures + verification-
artefacts index (§6). This doc is the round-4 gate adjudication over the lane's own commits.

---

## §1 — The 8-row §Hard gate (verbatim: each gate row + verdict + evidence, from the round-4 close gate)

> **1. O-16 computed-cascade census**: every owned row's computed transition duration/curve ≡ its
> liquid-target column (CSSOM walk over the ACTUAL interactive surfaces — the only oracle class
> that catches a dist clobber); the **R1 row honest EXPECTED-RED with the PKT-1 cite** until the
> producer lands it — the red carried, never weakened, never demo-worked-around.

**PASS** — the O-16 computed-cascade census RE-RUN in the amended tree (HEAD `abff923`) via
`e2e/smoke/oracles/o16-computed-cascade.spec.ts` — the "O-16 W5 census" test GREEN both light AND
dark. Every owned row computes to its liquid-target column: **R2** enter transform 0.4s
`linear(spring-snappy)`; **R3** leave opacity+transform 0.2s cubic-bezier; **R4** translate/scale
0.3s `linear(cartoon-punch)` + box-shadow 0.3s cubic-bezier; **R5** btn/send scale 0.45s
`linear(smooth)` + rail-item transform 0.16s `linear(spring-press)`; **R8** vj-morph transform
0.4s `linear(snappy)`; **R11** pane-shell transform 0.45s linear. **R9** logged
HANDED-ACROSS→W6-2, **R10** discharged-by-excision. The **R1 EXPECTED-RED intact**: `[O-16] :root
--default-transition-duration = 150ms` — the clobber is LIVE in
`../glass-ui/dist/styles/components.css` (PKT-1 NOT landed; the `file:` pin unchanged); the spec's
`test.fail()` + the PKT-1/P2 cite in the assertion message are preserved. Owned rows === targets;
R1 red carried, not weakened.

> **2. View-switch ≤100ms budget re-run** green (§6.2) under the retuned swap.

**PASS** — the view-switch ≤100ms budget re-run GREEN:
`e2e/smoke/perf/view-switch-frame-budget.spec.ts:34` (smoke-perf, built-bundle server on lane port
8891) passed — "first frame ≤100ms / long task ≤50ms" asserts its software-GL-aware ceiling
(renderer=SwiftShader; the strict real-GPU numeric annotated per `w3-frame-budget-measure.md`).
Not among the 3 failures.

> **3. The KEEP set (F6) untouched** — diff-scope proof (zero hunks on the F6 rows).

**PASS** — the KEEP-set (F6) zero-hunk proof over the W5 lane diff (`git diff f23b97b^1...f23b97b^2`).
The ONLY `animations.css` hunk is scoped `.pane-wrapper--left/right > .vj-enter-{enter,leave}-active`
(owned R2/R3) at lines ~247-278; the comment itself states "the un-scoped vj-enter family above is
the F6 KEEP set, untouched". No modification to un-scoped `vj-enter`, `vj-morph`/`vj-celebrate`
enter definitions (still at 104-166), the glass-ui reveal/dock/tabs registers, the atmosphere
arrival fade, or the PRM guard chain. Diff refs to KEEP families are only (a) the scoped owned
hunk, (b) DESIGN.md documentation of the KEEP set, (c) the census probe that READS
`vj-morph-enter-active`.

> **4. Tranche B untouched**: R6/R7 sites carry NO retime and NO layout-property re-cut (diff
> proof); the `T.md §7.2` book rows carry the PKT-3 gating.

**PASS** — Tranche-B (R6/R7) no-touch diff proof. **R6** collapse legs live at
`animations.css:104-166` (the `vj-morph`/`vj-celebrate` `max-height` transition blocks) — the W5
hunk is at 247-278, so R6 carries NO retime and NO layout-property re-cut. **R7** (`Dock.vue`) is
UNTOUCHED by the W5 lane (`git diff --stat` empty for `Dock.vue` and `style.css`). The `T.md §7.2`
book row (line 495: "W5 Tranche B (R6/R7 compositor collapses) | PKT-3 lands | left untouched,
never retimed on layout props") carries the PKT-3 gating; books never gates.

> **5. Exit law**: the pane-swap leave strictly shorter than the enter; no exit overshoots
> (computed capture on both legs).

**PASS** — exit-law computed capture (both schemes): R3 leave `maxLeave` = 0.2s (`--duration-fast`)
STRICTLY < R2 enter transform 0.4s (`--spring-snappy-duration`); both leave legs are
`cubic-bezier(0,0,.2,1)` (`--ease-out`), never a spring/overshoot on the exit. The census gate-5
assertion (`maxLeave < enter`) passed light and dark. The outgoing plate is gone before the
incoming spring overshoot lands (F2 collision cured).

> **6. CSS tripwire**: CSS gz re-measured at gate; >120 KiB REDs the wave (§6.2, pass-2).

**PASS** — CSS gz tripwire: fresh `npm run gh-pages` build; `index-*.css` raw 537825, gzip =
90118 bytes = **88.00 KiB ≤ 120 KiB** (32 KiB headroom). Matches the integrator's 87.99 KiB
figure. Well under the wave-redding threshold.

> **7. PP-8 repo-wide sweep** (caps · legacy grep · as-any ledger regenerated) + PI-1 Lighthouse
> delta recorded.

**PASS** — PP-8 sweep CLEAN: caps 0 `demo/*.vue|ts` (excl `ui/`) >400 LoC, 0 `api/src` >350; the
as-any ledger regenerated — `src/` 0 real `as any` (the one grep hit is a comment at
`parsing/index.ts:509`) + 8 `as unknown as` (the S baseline), `api/src` 0/1; no legacy/back-compat
shim added by the W5 diff (only "shimmer" false-positives). **PI-1**: the round-4 ledger row IS
recorded in `audit/pi1-delta-ledger.md` (run 29154102743 / `d4e0032`, FLAT-vs-W4 expectation, CSS
86.75→87.99 KiB); the CI run COMPLETED with the ONLY red being the by-design gh-pages Lighthouse
HARD gate (Q14) — e2e-smoke / e2e-safari / build-and-test ×2 / boot-smoke all SUCCESS. RESIDUAL
(non-redding, W5 is not a named Q14 gate — only W2/W7/W9): the numeric LCP/TBT 3-sample spread is
still "in-flight" in the ledger row; the completed run's gh-pages job now permits that append.

> **8. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e all-project green (6) ·
> no `demo/` file >400 LoC.**

**MISS-RECORDED** — lint 0 (exit 0), typecheck 0 (exit 0), vitest 2222/2222 (73 files) green, 0
demo files >400 LoC — all PASS. The e2e all-project run (6 projects, lane ports 8890/8891): **132
passed / 3 failed**; the 3 reds are ALL in the smoke project and ALL forensically non-W5,
non-product: (1) `color-space-switching.spec.ts:8` = the documented reka-ui Select "element not
stable → detached from DOM" flake (`playwright.config.ts` names this exact spec; retries=0 local vs
CI retries=2) — CONFIRMED flake by isolated re-run (1 passed, no retry); (2) `gradient.spec.ts:34` =
a stale spec, regex `/H \d+°/` vs the W6 Lane-G re-authored plate's hue-RANGE label "H 145–265°";
(3) `gradient.spec.ts:183` = a stale spec, waits for the old "Steps" SegmentedTabs pill that W6
Lane-E's T-47 easing re-author removed (O-17 easing-composition is the new truth and PASSED). None
is W5-owned (W5's R9 was handed to W6-2); the other 5 projects (admin/mobile/reactivity/safari/perf)
are green. **MISS-RECORDED, not FAIL**: the reds are recorded + adjudicated + routed (Lane G
spec-update / Lane E spec-retirement), zero W5 motion regressions.

---

## §2 — The `_with_misses` basis (one honest miss, routed)

The round-4 gate returned 7 PASS + 1 MISS-RECORDED. The `_with_misses` qualifier is the ONE
recorded item on row 8: the three e2e reds. Each is NOT a W5 motion regression:

- **`color-space-switching.spec.ts:8`** — a documented reka-ui Select detach flake, named in
  `playwright.config.ts`; local retries=0 surfaces it where CI retries=2 self-heals. Confirmed a
  flake by isolated re-run (1 passed, no retry).
- **`gradient.spec.ts:34`** — a STALE spec: its `/H \d+°/` regex predates the W6 Lane-G hue-swept
  envelope plate (the landed label is a hue RANGE, "H 145–265°"). Routed → Lane G gradient-spec
  truth-update.
- **`gradient.spec.ts:183`** — a STALE spec: it clicks the old "Steps" SegmentedTabs pill that W6
  Lane-E's T-47 first-principles easing re-author removed. O-17 is the new truth and PASSES. Routed
  → Lane E spec-retirement.

All three trace to owner-ORDERED re-authored W6 surfaces (the §0.6 riders), NOT to W5's motion
lane. W5's own R9 was handed across to W6-2 (recorded in both wave logs; W5's O-16 census still
owns the R9 verification). No gate weakened.

---

## §3 — The motion-family commit map (the R2..R11 landings, one lane)

| Row(s) | Commit | One line |
|---|---|---|
| R2 + R3 | `de2d22e` | the pane swap onto `--spring-snappy` @ its OWN clock — exit strictly shorter, `--duration-fast` `--ease-out` |
| R4 | `ab539bc` | PaletteCard adopts the producer cartoon register — cartoon-surface atom + caster child + `useLiquidPress` press drive |
| R5 + R11 | `2f4623e` | interactive scales onto the producer liquid-spatial register — btn-interactive atoms, `--spring-press` press leg, `.pane-shell` spring nudge |
| R8 | `f5f4d22` | skeleton→content settles through `vj-morph` — the Browse wall's hard `v-if` cut dies; stagger stays dormant on the PKT-4 seams |
| R10 + KEEP calls | `8d1b06d` | the liquid two-channel motion table of record — R10 discharged by excision + the two F7 KEEP calls stated |
| App.vue queue → W6-6 | `011918f` | the DevMisconfigBanner MOUNT leaves App.vue — the ONE round-4 App.vue writer (the banner FORM dies at W6-6) |
| R4 compile fix | `3df3a25` | unquote the in-attribute comment — double quotes inside `:class` terminated the attribute value at prod-compile (vue-tsc tolerated; rolldown did not) |
| O-16 census | `27f54cc` | the owned-rows computed-cascade census — per-row duration/curve ≡ liquid target, both schemes |
| PP-8 cap cure | `a47afa7` | PaletteCardMeta colocated lift — the R4 press wiring pushed PaletteCard past 400 (400→428) |
| lane merge | `f23b97b` | R2/R3/R4/R5/R8/R10/R11 + O-16 census onto `tranche-t` |

**PI-5 split honoured**: Tranche A rows (R1–R5 / R8 / R9–R11) landed; Tranche B rows (R6/R7) are
PKT-3-gated and left untouched (§1 gate row 4). Springs never ride generic clocks (the per-spring-
clock law): every spatial leg carries its own `linear(...)` at its own duration token.

---

## §4 — Booked swaps carried (books, never gates — the interim→producer swap set)

| Book | Trigger | Disposition carried at W5 close |
|---|---|---|
| **PKT-1** (R1 dist-clobber) | the day the packet lands at the glass-ui root | R1 goes live with ZERO demo writes (the `@theme` alias already exists at `style.css`); the O-16 R1 row stays EXPECTED-RED with the cite until then. **NOT landed** — the 150ms `:root` clobber is LIVE in `../glass-ui/dist/styles/components.css`; the `file:` pin unchanged (glass-ui npm 4.2.0). If PKT-1 lands via the `file:`-pin before W7, the row is re-run + greened in-wave. |
| **PKT-2** (the ~0.3s preset spring-clock) | producer preset lands | the pane swap landed on arm (i) — `--spring-snappy` @ its own clock (the preset did not answer first); recorded on the book row. |
| **PKT-3** (Tranche B R6/R7 compositor recipe) | producer compositor recipe | R6/R7 left untouched, never retimed on layout properties. **The book row SPLIT** (h-wave-w4-w5 S2): **R7** (`Dock.vue`) fires in-round via the W6 dock queue if PKT-3 lands in round 4; **R6** (`animations.css` — W5's own now-frozen file) fires at **W7-or-successor** (W5 cannot re-open its own closed file; no conditional self-authority). |
| **PKT-4 / L9** (skeleton stagger seams) | producer shimmer reads the seams | the settle landed WITHOUT the stagger; the demo's `--skeleton-shimmer-delay/-tint` writes stay; the stagger goes live when the producer shimmer reads them (5th-carry class — verified at W7). |

**The two F7 design-call KEEP rows** stated in the motion table (never retimed): `DockViewSelect`
`--accent-view` 0.55s stately sweep (W7-4's surviving voice) · `ImageEyedropper` tracked-canvas
bezier (canon "tracked = bezier").

---

## §5 — CSS gz + PI-1 Q14 state

- **CSS gz tripwire**: fresh `npm run gh-pages`; `index-*.css` gzip = 90118 B = **88.00 KiB ≤ 120**
  (32 KiB headroom). The round-4 integration figure is 87.99 KiB (immaterial instrument variance).
- **PI-1 Q14**: the round-4 ledger row is recorded in `audit/pi1-delta-ledger.md` (run
  29154102743 / `d4e0032`) — expected FLAT vs W4 (the motion lane moves no eager payload; CSS
  86.75→87.99 KiB = +1.2 KiB the lamp/bench/plate tokens). Budgets stay honestly RED. **W5 is NOT
  a named Q14 gate row** (only W2/W7/W9 adjudicate the budgets), so the in-flight LCP/TBT numeric
  append does NOT red the wave; the completed run's gh-pages job permits that append.

---

## §6 — Grep captures + verification-artefacts index

- **Tool-artefact grep** (`grep -rnE '</?(content|invoke|parameter|antml)'`) over the wave's
  touched docs: EMPTY (the §Recovery seam class — M-1).
- **PP-8 caps**: 0 `demo/*.vue|ts` (excl `ui/`) >400 · 0 `api/src` >350.
- **as-cast ledger**: `src/` 0 real `as any` (the one hit is a comment) + 8 `as unknown as` (S
  baseline) · `api/src` 0 `as any` / 1 `as unknown as`.
- **Verification artefacts** (this close): the O-16 census output (per-row computed
  duration/curve, both schemes, incl. the R1 EXPECTED-RED record with the PKT-1 cite) · the
  view-switch budget trace · the KEEP-set zero-hunk diff proof · the Tranche-B no-touch diff proof ·
  the exit-law computed capture · the CSS gz figure · the PP-8 sweep outputs · the PI-1 round-4
  ledger row · the per-row commit hashes (§3).

**Hand-off**: W8's critique passes judge the settled motion against D7 + the owner's verbatim line
("more inline with our liquid glass easing curves") and the §0.6 T-48 charge (the card transitions
FRAME-BY-FRAME against the liquid principles — the :206 pane-swap-spring settle-wait routed to W8
T-48 is the named residual). W7 re-verifies the PKT rows at the cut and fires the Tranche-B (R6)
and R1 books if still open. The O-16 census joins the standing slate.
