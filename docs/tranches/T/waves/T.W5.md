# T.W5 — MOTION LIQUID (T-14: the two-channel law structural; the PI-5 split)

**Name**: W5 — Motion Liquid (ALL card transitions onto the liquid-glass easing curves)
**Opens after**: T.W4.5 (round 4 — the DAG amended at ratification: W4 → **W4.5 the
mid-tranche checkpoint** → { W5 · W6 }, cascade 1; runs PARALLEL with T.W6 — the cross-wave file clauses in
§File bounds govern the shared-file rows).
**Spec of record**: `audit/SYNTHESIS.md §3` (the T.W5 block) · SYNTHESIS §1.2 T-14 row · §2 D7
(THE LIQUID-EASING FAMILY, STRUCTURAL) · `audit/lanes/t-transitions-liquid.md` §0 (the liquid
family, stated once) + **§2 (the per-transition retune table — titled there "the spec the wave
implements")** + F6 (the KEEP set) · SYNTHESIS §6.2 (view-switch ≤100ms + the per-wave CSS-byte
tripwire — W5 is a named tripwire wave) · PI-5 (`t-perf-implications` — the two-tranche split).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the
T.md charter clause, restated here so the rule is self-evident in-file; `MANDATE-2026-07-06.md §0`
+ addenda win over both).
**Agents**: ≤3 — ONE single-writer motion lane over the family files + the O-16 census agent;
Fable + frontend-design on the design surface; opus/sonnet fanout in batches of three (E-6).
**Hard gate**: composite (§Hard gate) — O-16 computed-cascade census (owned rows green; the R1
row honest EXPECTED-RED with the PKT-1 cite) · view-switch ≤100ms budget re-run · the KEEP set
(F6) untouched · Tranche B strictly PKT-3-gated · CSS gz ≤120 KiB tripwire.
**Status**: RATIFIED 2026-07-09 — PENDING, gated on T.W4.5 close (round 4; the pre-ratification
"gated on T.W4" reading is SUPERSEDED by cascade 1 — the checkpoint sits between).

---

## §Goal criterion

The two-channel law structural (SYNTHESIS §3 T.W5 Goal, verbatim). Expanded per D7: spatial =
spring at ITS OWN clock, effects = bezier — INHERITED, not per-site. Cards adopt the producer
cartoon register (`<Card surface="cartoon">`/atoms); interactive scales ride
`--transition-liquid-spatial`; the pane swap moves to `--spring-snappy` @ its own clock with the
exit strictly shorter; skeleton→content settles through `vj-morph`.

## §Completion criterion

O-16 census green on every owned row (the R1 row honest EXPECTED-RED with its packet cite until
PKT-1 lands); view-switch ≤100ms budget re-run green; the KEEP set (F6) untouched; Tranche B
(R6/R7) left untouched — never retimed on layout properties — until PKT-3 lands; per-row gates
below. (SYNTHESIS §3 T.W5 Gate, verbatim-faithful.)

---

## §The PI-5 two-tranche split (binding)

- **Tranche A** (this wave executes): retune rows **R1–R5 / R8 / R9–R11** — incl. the card
  cartoon adoption (R4) and the skeleton→content settle (R8).
- **Tranche B** (PKT-3-gated, this wave does NOT execute): rows **R6/R7** — the compositor
  collapse/expand re-cuts. EXPLICITLY GATED on PKT-3 (the producer compositor recipe): the sites
  are left untouched and NEVER retimed on layout properties until it lands (PI-5). The book row
  (`T.md §7.2`) carries the gating; books never gates (PP-5).
- **R1's producer gate**: the bare-utility default goes live THE DAY PKT-1 lands (the dist
  `components.css` `:root` 150ms clobber dies at the producer root); the demo's existing `@theme`
  alias (`style.css:119`) becomes live again with zero demo work. The O-16 R1 row stays
  EXPECTED-RED with the packet cite until then — the red is never weakened, never worked around.

## §Scope (t-transitions-liquid §2, transcribed verbatim — the retune table of record; anchors are pre-W1-move, re-derived at wave-open per PP-11)

| # | Tr. | Transition (site) | Current (computed, live) | Liquid target | Channel law |
|---|---|---|---|---|---|
| R1 | A† | Bare-utility default (37 files / ~46 sites) | 150ms `cubic-bezier(.4,0,.2,1)` (the F1 dist clobber) | `--duration-fast` + `--ease-standard` via the RE-ARMED `@theme` alias (PKT-1 first) | EFFECTS default |
| R2 | A | Pane swap ENTER (`.pane-wrapper--* > .vj-enter-enter-active`, `App.vue:393-398`) | transform 0.3s `--spring-smooth` (squeezed generic clock) | `--spring-snappy` @ `--spring-snappy-duration` (or the PKT-2 preset @ its own clock) | SPATIAL |
| R3 | A | Pane swap LEAVE | opacity 0.2s + transform 0.3s `--ease-accelerate` | opacity + transform `--duration-fast` `--ease-out` — exit strictly shorter than enter | EFFECTS/exit |
| R4 | A | Card hover (`PaletteCard.vue:19` + kin) | box-shadow only, 150ms flat | producer cartoon register: translate/scale `--ease-cartoon-punch` @ `--duration-normal`, shadow `--ease-standard`, press squash + caster — via `<Card surface="cartoon">`/atoms, not utilities | SPATIAL+EFFECTS split |
| R5 | A | Interactive scale hovers (`channel-rail-item` `ComponentSliders.vue:338`, editor buttons `CurrentPaletteEditor.vue:68,71,93`, send-btn `ColorInput.vue:327`) | transform on `--ease-standard` @ 0.15–0.2s | `--transition-liquid-spatial` @ `--spring-smooth-duration` (inherit via the producer interactive atoms); press legs `--spring-press` @ 0.16s | SPATIAL |
| R6 | **B** | `vj-morph`/`vj-celebrate` collapse legs (`animations.css:104-166`) | `max-height` 0.3s decelerate (layout) | compositor collapse per the PKT-3 recipe; curves unchanged | SPATIAL (P5) |
| R7 | **B** | Dock action-bar slot (`Dock.vue:295-305`) | `grid-template-columns` 0.3s `--ease-standard` | the same PKT-3 compositor recipe or the `--spring-dock` morph grammar | SPATIAL (P5) |
| R8 | A | Skeleton→content (Browse, dialog tab, extract — `BrowsePane.vue:29-38`, `PaletteBrowseTab.vue`, `PaletteCardSkeleton.vue:42-69`) | hard `v-if` cut | `vj-morph` settle (out-in / TransitionGroup + `.vj-morph-move`), shimmer hand-off; stagger via the PKT-4 seams | SPATIAL enter |
| R9 | A‡ | Gradient stop handle (`GradientStopEditor.vue:227`) | snappy curve on 0.3s generic clock | `--spring-snappy` @ `--spring-snappy-duration` | SPATIAL |
| R10 | A | PaletteDialog scrim (`PaletteDialog.vue:310`) | 0.55s ease-standard | join the 0.4s bloom clock (one moment, one clock) | EFFECTS |
| R11 | A | `.pane-shell` nudge (`ColorPicker.vue:341`) | transform 0.3s `--ease-standard` | `--transition-liquid-spatial` @ `--spring-smooth-duration` | SPATIAL |
| — | — | **KEEP set (F6)** — `vj-morph`/`vj-celebrate` enters · un-scoped `vj-enter` · the glass-ui reveal/dock/tabs registers · atmosphere arrival fade · PRM guard chain | already canon-true | **no change; do not re-litigate** | — |

† R1 = zero demo writes (the packet is the cure; the demo alias already exists).
‡ R9's file belongs to W6's gradient lane this round — see the cross-wave clause below.

**Plus the two F7 design-call KEEP rows, stated so they stop reading as strays** (F7.3/F7.4,
verbatim intent): `DockViewSelect.vue:154` `--accent-view` 0.55s stately sweep = deliberate
(W7-4's surviving voice) and `ImageEyedropper.vue:251` tracked-canvas bezier = canon "tracked =
bezier" — both recorded in the DESIGN.md motion table, not retimed.

**Boundary note (no double-writes)**: T-27's **jitter half** (frame pacing — the paint-hole
44→315ms pile-up chain) is routed by the synthesis to **W2-1..3 + P1** and gated by O-5 THERE
(SYNTHESIS §1.2 T-27); W5 does not own it. W5's only contribution to the jitter story is the F4
layout-morph retirement — which is Tranche B and stays PKT-3-gated.

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `src/` write; any `../glass-ui`/`../keyframes.js` write (PKT-1..4 are
  letter rows, never demo forks); any Tranche-B site edit before PKT-3 lands;
- **non-local gate failures**: an O-16 owned row red that traces to a NEW dist-clobber class
  (producer letter, never a demo cascade arms-race — the F1/PKT-1 lesson); the view-switch
  ≤100ms budget regressing under the retuned swap (root-cause vs the R2/R3 clock pairing before
  any curve change); a KEEP-set row found non-canon (contradicts F6 → resolve against the live
  tree before elevation, S lesson 1);
- **loop halt**: the third iteration of any curve/clock tuning loop halts and routes (taste
  brackets belong to W8/the owner, not to lane iteration).

## §File bounds · disjointness · worktrees

| Surface | Files (pre-move anchors; re-derive via the W1 MOVE-MAP) | Access |
|---|---|---|
| swap + families | `App.vue` (the pane-swap transition block) · `animations.css` (enter legs only — collapse legs are Tranche B, untouched) · `style.css` (motion region **@~86-150 ONLY — the round-4 region split [AMENDED-AT-HARDENING — h-dag D-3]: W5 owns the motion region, W6-Lane-G owns the netting @254-261, the surviving accent @223-224 is READ-ONLY everywhere**) | modify |
| cards + interactives | `PaletteCard.vue` · `CurrentPaletteEditor.vue` · `ComponentSliders` (rail-item leg) · `ColorInput.vue` · `ColorPicker.vue` (`.pane-shell` leg) | modify |
| skeleton settle | `BrowsePane.vue` · `PaletteBrowseTab.vue` · `PaletteCardSkeleton.vue` | modify |
| coherence rows | `PaletteDialog.vue` (scrim clock) · DESIGN.md (motion-table rows) | modify |

**Cross-wave single-writer clauses (round 4, W5 ∥ W6)**:

- `App.vue` has ONE round-4 writer: **this wave** (the swap legs). W6-6's banner-mount removal
  (one line, `App.vue:115` pre-move) lands through this wave's App.vue queue — recorded in both
  wave logs.
- `Dock.vue` belongs to **W6's dock+nav lane** (W6-7/W6-8). R7 is PKT-3-gated anyway; if PKT-3
  lands inside round 4, the R7 hunk coordinates through the W6 dock+nav queue (the S.W5
  PaletteCard precedent) — never two writers.
- `GradientStopEditor.vue` belongs to **W6's gradient lane** (W6-2 re-authors the paint stack).
  The R9 retime rides INSIDE W6-2's re-author — W5 hands the row across (recorded in both wave
  logs); W5's O-16 census still owns the row's verification.

Do NOT touch: `src/`, `../glass-ui`, `../keyframes.js`, `docs/precepts/`, the boot chain (W2's,
closed), the tier tokens + `PaneHeader.vue` (W3's, closed), W6's lanes' files beyond the clauses
above. The lane runs in its own sibling worktree cut from the wave head; anchors re-derived at
wave-open against the W1 MOVE-MAP (PP-11).

## §Hard gate (verbatim-faithful to SYNTHESIS §3 T.W5)

1. **O-16 computed-cascade census**: every owned row's computed transition duration/curve ≡ its
   liquid-target column (CSSOM walk over the ACTUAL interactive surfaces — the only oracle class
   that catches a dist clobber); the **R1 row honest EXPECTED-RED with the PKT-1 cite** until the
   producer lands it — the red carried, never weakened, never demo-worked-around.
2. View-switch ≤100ms budget re-run green (§6.2) under the retuned swap.
3. The KEEP set (F6) untouched — diff-scope proof (zero hunks on the F6 rows).
4. Tranche B untouched: R6/R7 sites carry NO retime and NO layout-property re-cut (diff proof);
   the `T.md §7.2` book rows carry the PKT-3 gating.
5. Exit law: the pane-swap leave strictly shorter than the enter; no exit overshoots (computed
   capture on both legs).
6. **CSS tripwire**: CSS gz re-measured at gate; >120 KiB REDs the wave (§6.2, pass-2).
7. PP-8 repo-wide sweep (caps · legacy grep · as-any ledger regenerated) + PI-1 Lighthouse delta
   recorded.
8. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e all-project green (6 at authoring [AMENDED-AT-HARDENING — M-26: the stale "5-project" corrected drift-proof; W0-4 fixes the CLAUDE.md source]) · no `demo/`
   file >400 LoC.

## §No-workaround prohibitions (binding)

- **NO demo cascade arms-race** for R1 — no `@layer components`-or-later re-declare (E-3; D7:
  "NO demo cascade arms-race"); the producer packet is the only cure.
- **NEVER retime R6/R7 on layout properties** (PI-5) — left untouched until PKT-3.
- **No per-site `transition-transform` utilities** for spatial legs — inheritance via the
  producer interactive atoms/register, never re-implementation (PR-2/PR-3).
- **Do not re-litigate the KEEP set** — F6 is canon (D7).
- **PR-7**: preserve animations — move/tokenize/retime per the table, never delete.
- **Springs never ride generic clocks** (the per-spring-clock law, §0 of the lane): a normalized
  spring `linear()` on `--duration-*` is the named anti-pattern, not a tuning option.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each row batch and before close;
`npx playwright test` (incl. the O-16 census spec) at close; the CSS gz measurement at gate. The tool-artefact grep `grep -rnE '</?(content|invoke|parameter|antml)'` over the wave's touched docs MUST be empty before any docs commit (the §Recovery seam class — M-1).

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the O-16 census output (per-row computed
duration/curve, before/after) incl. the R1 EXPECTED-RED record with packet cite; the view-switch
budget trace; mid-flight swap frame captures (the F2 evidence class, re-shot post-retune); the
KEEP-set diff-scope proof; the Tranche-B no-touch diff proof; the CSS gz figure; the PP-8 sweep
outputs; the PI-1 Lighthouse delta row; per-batch commit hashes.

## §Commit plan

Row-scoped commits: pane swap (R2+R3, one commit — one moment, one clock) / card cartoon
adoption (R4) / interactive scales (R5+R11) / skeleton settle (R8) / coherence rows (R10 + the
two stated KEEP calls); a Tranche-B book-status commit (no code); the census + close commit; a
wave status commit.

## §Recovery (STANDING — the `T.md §8` completion-brief rider binds every dispatch AND resume of this wave; PP-14/PP-15 operationalized) [AMENDED-AT-HARDENING — M-29/h-exec-recovery]

The four-step protocol (audit-partial → patch-brief at `audit/recovery/T.W<n>-<lane>-brief-<date>.md` → resume-from-work-order → seam-audit-at-close) is standing law in `T.md §8`; E-6 batches-of-three is the prevention half, this rider the cure. This wave's type-specific deltas:

**Partial signatures**: one row-batch landed without its census verification; a KEEP-set row
"helpfully" re-touched (itself a defect — F6 is canon); a Tranche-B site touched before PKT-3.
**Resume specifics**: audit the lane's committed row-batches against the §Commit plan; the O-16
census re-runs over ALL owned rows at resume (not just the resumed batch); the Tranche-B no-touch
diff proof re-runs as the partial-detector.

## §Dependencies

- **Depends on**: T.W4.5 closed (the ratification-amended DAG: W4 → W4.5 → {W5 · W6}, cascade
  1 — the checkpoint's remediations are this wave's settled ground); the W1 MOVE-MAP (PP-11
  re-anchoring);
  W3's settled ladder (R4's cartoon register judges against it).
- **Producer books it rides (never gates)**: PKT-1 (R1 goes live), PKT-2 (the ~0.3s preset — the
  decision between `--spring-snappy`@own-clock and the new preset is recorded either way), PKT-3
  (Tranche B), PKT-4/L9 (the settle lands WITHOUT the stagger until the producer reads the
  seams).
- **Blocks**: T.W8 (round barrier — W8 opens only after every design wave closes).

## §BOOKS opened/serviced (books-never-gates)

- **O-16 R1 row EXPECTED-RED → PKT-1** (T.md §7.2): goes live the day the packet lands; the red
  carries the cite. If PKT-1 lands via the file:-pin before W7, the row is re-run and greened
  in-wave (recorded).
- **W5 Tranche B → PKT-3** (T.md §7.2), **the R6/R7 book row SPLIT** [AMENDED-AT-HARDENING —
  h-wave-w4-w5 S2]: **R7** (`Dock.vue`) fires in-round via the W6 dock queue if PKT-3 lands in
  round 4; **R6** (`animations.css` — W5's own frozen file) fires at W7-or-successor (W5 cannot
  re-open its own closed file; no conditional self-authority).
- **PKT-2 spring-clock hole**: the pane swap lands on arm (i) (`--spring-snappy` @ its own
  clock) unless the ~0.3s preset answers first; the decision recorded on the book row.
- **PKT-4/L9 skeleton stagger seams**: the demo's `--skeleton-shimmer-delay/-tint` writes stay;
  the stagger goes live when the producer shimmer reads them (5th-carry class — verified at W7).

## §Evidence packets consumed

`audit/lanes/t-transitions-liquid.md` (the lane of record: §0 family, §1 F1–F7, §2 retune table,
§3 packet rows) · `audit/lanes/t-perf-implications.md` (PI-5 + the view-switch budget rider) ·
`audit/SYNTHESIS.md` §1.2 T-14 / §2 D7 / §6.2 · `letters/GLASSUI-T-ASKS.md` P2 (PKT-1..4 as
dispatched).

## §Hand-off

W8's critique passes judge the settled motion against D7 + the owner's verbatim line ("more
inline with our liquid glass easing curves"); W7 re-verifies the PKT rows at the cut and fires
the Tranche-B and R1 books if still open. The motion-table rows minted here (incl. the two
stated KEEP calls) bind every later surface; the O-16 census joins the standing slate.
