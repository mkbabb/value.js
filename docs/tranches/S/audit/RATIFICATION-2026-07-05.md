# S · OWNER RATIFICATION — 2026-07-05 (the §12 gate CLOSES; dispatch OPEN)

The owner ruled on all eleven `S.md §12` rows. Six defaults ratified as speced; five rulings
flip or amplify the spec. This document is the encoding of record: the amender transcribes it
into the corpus (S.md + waves/) verbatim-faithfully; on any divergence, THIS document + the
owner's verbatim text win. The SEEDS.md ratification-time riders fold in the same amendment
pass.

## §0 — The verbatim rulings

> 1. Full idiomatic wiring.
> 2. fix now. Breaking changes are fine: always.
> 3. Excise all legacy code and dependencies.
> 4. Excise.
> 5. Yes.
> 6. Only on true empty.
> 7. full presence on mobile--figure out an idiomatic way. The blob likely needs to be re-built
>    from fist principles, starting with a SOTA assay and archeaological survey of the past
>    implemnetations hiterhto. What's glass-ui got planned? We're going to rename it to "Blob"
>    as well--this will need to be changed in glass-ui.
> 8. Build now.
> 9. Yes. Jzazbz is to be implemented, too.
> 10. Full first-principles re-work of the mixing animation to suffuse intent and beauty. The
>     current implementation is a hack and needs to be replaced with a more elegant solution,
>     that's also safari compat. No fallbacks.
> 11. Yes.

## §1 — Per-row encodings

| Q | Ruling | Disposition | Encoding |
|---|---|---|---|
| Q1 | "Full idiomatic wiring." | **DEFAULT RATIFIED (WIRE)** | The full affordance: `publish`/`unpublish` client wrapper + card-menu visibility control + the create-wrapper rename, one pass, as speced. "Full idiomatic" bars a minimal-stub wiring — the visibility affordance is a designed surface, not a checkbox bolt-on. |
| Q2 | "fix now. Breaking changes are fine: always." | **FLIP** (was comment-fix + book) | The `logerp` reorder to `(a, b, t)` lands in W1 NOW, all consumers migrated at root, no compat shim. **Cascade: the W1 cut becomes 3.0.0** (§2.1). **Standing precept minted** (§2.5): breaking changes are ALWAYS acceptable — never book a correct fix out of version timidity; cut the major. |
| Q3 | "Excise all legacy code and dependencies." | **DEFAULT RATIFIED (EXCISE), BROADENED** | `color-soa.ts` excised at the W1 cut (now 3.0.0) with the zero-consumer evidence recorded. Broadening: the ruling covers legacy CODE **and DEPENDENCIES** — W0 adds a dependency-ledger sweep (§2.4); every legacy/zero-consumer dep found is excised in-tranche, not booked. |
| Q4 | "Excise." | **DEFAULT RATIFIED** | The rainbow heading recipe dies at all 3 consumers. The on-record `--accent-live` ramp alternative is NOT taken. |
| Q5 | "Yes." | **DEFAULT RATIFIED** | Pane titles adopt the display voice; the three-voice law is amended as speced (one `PaneHeader.vue` site, 9 panes). |
| Q6 | "Only on true empty." | **DEFAULT RATIFIED, NARROWED** | The specimen-plate annotation class survives ONLY on TRUE EMPTY states — the owner's ruling drops error states from the default's "empty/error". Error surfaces speak the plain register. Never a second invitation; never duplicated on-screen. |
| Q7 | "full presence on mobile… re-built from first principles… SOTA assay and archaeological survey… rename it to 'Blob'." | **FLIP** (was ABSENT at <lg) + **AMPLIFIED** + **PRODUCER RENAME** | Three parts, §2.2. |
| Q8 | "Build now." | **FLIP** (was KEEP-BOOKED) | The R-4 raytrace gamut map builds in W1 as a new library item: implemented, tested against the Ottosson analytical mapper as the oracle, documented. The book is discharged by construction. |
| Q9 | "Yes. Jzazbz is to be implemented, too." | **DEFAULT RATIFIED + WIDENED** | ICtCp promotes at W1-6 as speced. **Jzazbz is ADDED as a new W1 item** — full space class + parsing + dispatch wrapper + tests (its PQ-variant transfer math is net-new, unlike ICtCp's already-shipped path; scope it honestly). |
| Q10 | "Full first-principles re-work… suffuse intent and beauty… safari compat. No fallbacks." | **DEFAULT RATIFIED, AMPLIFIED** | The W5 mix-animation item is re-graded from "re-author" to **first-principles re-work**: the current pour choreography is REPLACED, not repaired. Intent: the animation narrates the mix (convergence lands AT the result plate). Beauty is a gate, not a garnish — Fable design lane + the frontend-design bar. Safari-true by construction (no `ctx.filter`, no WebKit-unsupported dependency, NO degraded fallback path — one implementation, every engine). The ≤1.2s / one-clock gates stand. |
| Q11 | "Yes." | **DEFAULT RATIFIED** | vue-router 5 in S: W0-7 scopes, W2-7 lands (LAST in W2), the objective de-scope bound stands as written. |

## §2 — Cascades and new work

### §2.1 The W1 cut is **3.0.0** (was 2.1.0)
Q2's `logerp` reorder and Q3's `color-soa.ts` excision are both public-API breaks; semver
honesty makes the W1 publish a major. Amend by name everywhere the corpus says "2.1.0"
(S.md wave slate, waves/S.W1.md throughout, W8/W9 references, `letters/KF-COURTESY.md`
"dispatched with the 2.1.0 cut" → "with the 3.0.0 cut"). The Q3 excision evidence line
("EXCISE at 2.1.0") re-stamps to 3.0.0. MIGRATION table discipline applies: the 3.0.0 cut
ships a by-name breaking-change table (logerp signature; color-soa removal; anything the
W0 dependency sweep excises from the public surface).

### §2.2 Q7 — the blob: presence, genesis, rename
1. **Full presence on mobile (FLIP)**: the blob is PRESENT at every viewport. "Figure out an
   idiomatic way" = W6 design work with perf as a hard gate: the seed proved the 390px
   clipped-smudge and that hidden-but-mounted holds a live GL context — so mobile presence must
   be designed (footprint, placement, overflow discipline, GL lifecycle), not toggled. The
   seed's Q7 mount-gate rider is OBSOLETE as a cure (it implemented absence); its overflow
   measurements and GL-lifecycle findings carry as constraints. The ≥lg grown-footprint law
   stands; a <lg presence law is NEW W6 design scope.
2. **Blob genesis (first-principles rebuild)**: NEW research item **W0-8 — the blob SOTA assay +
   archaeological survey**: (a) archaeology — every prior implementation hitherto (value.js
   SVG-goo era → the demo WebGL2 metaball GooBlob → glass-ui's WebGPU+WebGL2 producer engine),
   what each did well, what killed it; (b) SOTA assay — the current art (SDF smooth-min fields,
   marching/analytic metaballs, WebGPU compute, stylized NPR goo, perf envelopes on mobile
   GPUs); (c) a genesis brief that feeds the JOINT rebuild: the producer engine is glass-ui's
   (L5), value.js owns the consumer contract + the demo's compositional law. Artifact:
   `docs/tranches/S/audit/blob-genesis.md`. W6's blob items consume it; the glass-ui letter
   carries it as the shared ground.
3. **Rename GooBlob → `Blob` (producer change)**: NEW letter item — component name, subpath
   (`/goo-blob` → `/blob`, which the R-era GAP-2 rename table already anticipated), types,
   CSS seams. Lands in glass-ui at their 5.0.0 cut; value.js consumes the rename at W8
   (adopt-event). The demo's own consumer surface migrates by name, no alias kept.

### §2.3 Q8/Q9 — new W1 library items
- **W1-(new) raytrace gamut map (R-4)**: build now; the Ottosson analytical mapper is the test
  oracle (agreement within stated tolerance on the shared domain); document where raytrace
  diverges and why that's the point.
- **W1-(new) Jzazbz**: space class + parsing + dispatch + tests, alongside ICtCp (W1-6). Both
  ride the 3.0.0 cut.
The amender assigns concrete item numbers consistent with waves/S.W1.md's existing numbering.

### §2.4 Q3 broadening — the dependency ledger
W0 gains a dependency-excision sweep: every runtime + dev dependency justified by a live
consumer or excised (the R-era keyframes-devDep analysis is the model; the §3.4 file: pin
policy is NOT reopened). Artifact: a short ledger in the W0 evidence packet; excisions land
in-wave.

### §2.5 Standing precept (Q2's "always")
"Breaking changes are fine: always." — encoded into S.md §13 as a process lesson-precept:
when correctness and API honesty call for a break, CUT THE MAJOR; booking a known-wrong
surface forward out of version timidity is the anti-pattern. (Semver discipline itself is
unchanged — breaks are still majors, majors are still cheap.)

## §3 — Letter cascade (GLASSUI-S-ASKS, at dispatch)
The dispatcher re-stamps the verified glass-ui HEAD and folds, beyond the two seed riders
already recorded in SEEDS.md (Select-chevron dead code; GooBlob pointer shaping → L5):
1. **The `Blob` rename** (§2.2.3) — owner-ratified, by-name.
2. **The joint blob genesis** (§2.2.2) — L5 upgraded from "redress asks" to a first-principles
   co-rebuild grounded in the W0-8 genesis brief; the producer owns the engine, value.js owns
   the consumer contract; the mobile full-presence requirement (§2.2.1) is a producer-visible
   constraint (perf envelope on mobile GPUs).
3. The Q7 flip itself (full presence every viewport) so the producer's perf ceiling work
   targets the real requirement.

## §4 — What does NOT change
The wave DAG and rounds (§3.1) stand — the new items slot into existing waves (W0, W1, W5,
W6) without re-sequencing. The perf budgets, oracle slate, god-module census verdicts, letter
discipline, books table, and the L1/L2/L4 hard-gate hedges all stand as ratified. SYNTHESIS.md
remains the spec of record as amended BY THIS ENCODING (the amendment pass edits the corpus
docs, not SYNTHESIS itself — this document + SEEDS.md are the deltas of record, mirroring how
pass-amendments were recorded in-loop).
