# h-books-folds — BOOKS + FOLDS zero-drop re-verification (T HARDENING)

**Lane**: `h-books-folds` (hardening / adversarial · ZERO product-code + ZERO corpus edits — REPORT only).
**Substrate**: `tranche-t` @ `fb330bb` (hardening HEAD). **Charge**: re-verify E-4 zero-drop across the
seams of six interrupted sessions — `T.md §7` (BOOKS table) + the E-4 fold table of record
(`SYNTHESIS §7`, transcribed from `t-deferred-census`) **vs** `S/FINAL.md §5` (the 23-book table the
`tranche-s-close` tag counts). Every row must route (a T wave / a trigger / a maintainer disposition
with rationale); CHRONIC flags must be correct (≥2-tranche); the GAP rows (L2/L5/ARM/PRM-expand) +
X1/X2 + RP-2 + S-3 + L20 must all be present and correctly waved.

**Method**: enumerated `S/FINAL.md §5:103-125` (23 rows) → mapped each to `t-deferred-census §2`
(A1-A10/C1-C5/L1-L3/H1-H4/S-3) → `SYNTHESIS §7:541-564` (22 rows) → `T.md §7.1:367-390` +
`§7.2:394-408` + the `§5:328-336` CHRONIC delineation. Cross-checked every wave assignment against the
live wave docs (`waves/T.W0-W9.md`) and the packet series against `letters/GLASSUI-T-ASKS.md`
(P1-P10 + §KF). Provenance of the two disputed chronic sub-items re-verified against `R/FINAL.md` and
`S/audit/w9-close-probes.md §6`.

---

## VERDICT — near-clean bill on ROUTING; a chronic-DELINEATION seam

**The 23-book routing is FAITHFUL, zero book-drop.** All 23 `S/FINAL.md §5` rows are present in both
`SYNTHESIS §7` and `T.md §7.1`, each routed to a real wave item (verified to exist in the wave docs) or
a maintainer/trigger disposition with rationale. The transcription `census §2 → SYNTHESIS §7 → T.md
§7.1` is row-for-row lossless (22 collapsed rows, every collapse legitimate: A2+A3, A8+A9, H1+H2,
C3+C4+C5). The four off-ledger E-4 folds (`proof:*`→W0-2, doc-truth→W0-4/W9, oracle-blindness→W0-5) are
correctly added. The discharged-in-S set is recorded for zero-drop. **Every task-named row is present
and correctly waved** (evidence in §APPENDIX below).

**The one real seam is in the CHRONIC delineation, not the routing.** The census `§5` roll-call names
**15** ≥2-tranche items; `T.md §5:328-336` + the `SYNTHESIS §7`/`T.md §7.1` inline flags carry only
**13**. The two dropped are the R-origin chronic **sub-items of A10** (`GLASSUI-S-ASKS`) — the
`/easing` GAP-3 subpath-watch and the **EasingPicker SelectTrigger accessible-name a11y defect**. Both
survive as ROUTED items (P9-J3 and, implicitly, P7-L7) but lose their CHRONIC flag; the a11y one also
loses its substantive naming. This is exactly the transcription class the interrupted-session charge
targets: `SYNTHESIS §7` was built from the census `§2` fold table (where A10 is one "mixed" row), not
the census `§5` roll-call (where the sub-items are individually chronic), so the sub-item chronic flags
never made it into the operative corpus. Separately, one RECENT item (`kf resolveEasing`) is over-flagged
CHRONIC by cluster-labeling.

Counts: **MUSTFIX 0 · SHOULDFIX 2 · NOTE 3.**

---

## MUSTFIX

*(none — the book-routing is faithful; no inherited S book is dropped or mis-waved.)*

---

## SHOULDFIX

### SF-1 — The EasingPicker SelectTrigger accessible-name a11y defect (census A10, CHRONIC R→S→T) is folded WITHOUT delineation: not named in any T packet, CHRONIC flag lost
**Severity**: SHOULDFIX (MUSTFIX-adjacent — a real, producer-owned, prod-visible a11y defect).
**Evidence**:
- The defect is real and chronic. `R/FINAL.md:113`: *"EasingPicker preset SelectTrigger accessible-name
  defect (producer-owned; combobox announces only 'linear'; the old fork's combobox was named) | the
  glass-ui fix; carried by the relay letter | **OPEN (relay item 8)**."* Carried R→S→T.
- The census carries it by name + flags it CHRONIC. `t-deferred-census.md:96` (A10) folds *"the R-relay
  **EasingPicker SelectTrigger a11y (relay item 8)**"* into the packet set; `:217` flags it CHRONIC
  (`R.W4→S→T`, producer, T-PACKETS/T-ADOPT).
- **The corpus drops the name.** `grep -i "EasingPicker\|SelectTrigger"` over `T.md` = **0 hits**. The
  only EasingPicker fold is `letters/GLASSUI-T-ASKS.md:58` / `SYNTHESIS §4 P7`: *"L7 **EasingPicker v2**
  carried + net-new: container-query stage law … `chrome` prop … `preset?` … declarative
  `autoplay`/`playing` door … travel-dot rest + PRM at source."* — **the accessible-name a11y contract
  is not in that list.** "L7 carried" carries L7 (the `defineExpose(playTravel)` PRM rider,
  `w9-close-probes.md:294`), which is a *different* ask from relay item 8. `P10` (`:61`) names only the
  SelectTrigger *size* ladder (typography), not a11y.
**Why it bites**: a producer implementing "EasingPicker v2" to the P7-L7 spec-list has no line telling
it the combobox accessible-name must be fixed — the exact defect can survive the v2 delivery. E-4
(*"ALL deferred items … delineated and folded"*) requires the delineation, not just the implicit
subsumption a full redesign might grant.
**Corpus location**: `letters/GLASSUI-T-ASKS.md:58` (P7-L7) · `SYNTHESIS.md §4 P7` · absent from
`T.md §7` entirely.
**Proposed amendment**: add to P7-L7's net-new list an explicit line — *"the SelectTrigger
**accessible-name** contract (R-relay item 8, CHRONIC R→S→T: the preset combobox announces only 'linear'
— name it from the active preset)"* — and add "EasingPicker a11y (relay item 8)" to the `T.md §5`
CHRONIC delineation.

### SF-2 — The `/easing` GAP-3 subpath-watch is routed but its CHRONIC flag is dropped; `T.md §5` delineates 13 of the census's 15 chronic items
**Severity**: SHOULDFIX.
**Evidence**:
- Census flags it CHRONIC. `t-deferred-census.md:216`: *"**`/easing` GAP-3 subpath watch** (in A10) |
  R.W4→S→T | producer | T-ADOPT MIGRATION walk."* Provenance confirmed `R/FINAL.md:220` (the R relay
  finalized *"…`/easing` GAP-3 watch…"*).
- It IS routed (no item-drop): `T.md §7.2:406` — *"`/easing` 17th-subpath GAP-3 verify-watch | the WS12
  export regen | P9-J3 row"*; `SYNTHESIS §4 P9 J3`; `letters/GLASSUI-T-ASKS.md:60` J3. **But no CHRONIC
  flag** appears at any of these sites, nor in the `T.md §5` CHRONIC roll-call.
- Net delineation gap: `T.md §5:328-336` names as CHRONIC exactly {glass-ui adopt, CI un-pin, L17,
  GAP-L5, X1, X2, Color.try, S.H3 Pratt, proof:\*, the FN-7/kf/CH cluster} = 13 distinct items.
  `t-deferred-census §5:203-217` names **15**. The two missing are SF-1's a11y item and this GAP-3 watch
  — both R-origin sub-items of A10, both lost because `SYNTHESIS §7` transcribed the census **§2** fold
  table (A10 = one "mixed" row, `:96`) rather than the **§5** chronic roll-call.
**Corpus location**: `T.md §5:328-336` (the CHRONIC delineation, omits both) + `T.md §7.2:406` (routed,
unflagged).
**Proposed amendment**: append to `T.md §5`'s CHRONIC sentence — *"· the two R-relay A10 sub-items
(`/easing` GAP-3 subpath-watch · EasingPicker SelectTrigger a11y; both R.W4→S→T)"* — restoring the
census `§5` roll-call's chronic granularity that the `§2`-derived fold table flattened.

---

## NOTE

### N-1 — `kf resolveEasing` (census C4 = RECENT, 1-tranche) is over-flagged CHRONIC by cluster-labeling
`t-deferred-census.md:105` (C4) classifies it *"recent (S NEW book)"* — first booked S-era (KF-COURTESY
`ad1b811`), so S→T = one tranche, NOT ≥2. But the corpus sweeps it into a `(CHRONIC)` cluster: `T.md
§5:333` names *"the FN-7/**kf-resolveEasing**/CH-10/CH-13/R8-23/R-5/R-10 … set"* inside the CHRONIC
sentence, and `T.md §7.1:389` / `SYNTHESIS §7:563` label the whole `FN-7 · kf resolveEasing · CH-…` row
`(CHRONIC)`. The other cluster members (FN-7, CH-10, CH-13, R8-23, R-5/R-10) are genuinely chronic; only
`kf resolveEasing` is the recent free-rider. Harmless to routing (it's KEEP-BOOKED→W9 either way) but
strictly a mis-flag against the census's own careful classification. **Amendment**: qualify the row —
*"(CHRONIC except kf `resolveEasing`, recent per census C4)"* — or move kf resolveEasing to its own
recent KEEP-BOOKED row.

### N-2 — The RP-2 clear-triad is split across rows; the `§7.1` L20/RP-2 book row omits GAP-L5 from its "land together" clause
The census requires the JS-eager re-baseline to clear only when THREE land together: `t-deferred-census
§6:244` — *"RP-2 clears only if A8(L20)+A6(GAP-L5)+A9 land together … otherwise carries a 3rd tranche."*
The corpus splits this: `T.md §7.1:375` reads *"L20 `/blob/config` + RP-2 … land TOGETHER or the
re-baseline carries a 3rd tranche"* — naming only **L20+RP-2**; `waves/T.W7.md:66` (P-3) correctly reads
*"**L20 + GAP-L5** must land TOGETHER or the re-baseline carries a third tranche."* The W7 gate carries
the correct binding, so this is not a functional drop — but the `§7.1` book row understates the triad (a
reader consulting only the BOOKS table would think L20+RP-2 alone clears it). **Amendment**: make the
`§7.1` row *"L20 + GAP-L5 + RP-2 land TOGETHER …"* to match W7 P-3 and census §6.

### N-3 — (cross-lane confirmation, not re-reported) X1/X2 firing-op source mis-cite
The X1/X2 residuals route correctly to W9 (`T.md §7.1:378-379` → W9 residual + O-25; census C1/C2 →
T-CLOSE; all present and correctly waved). Independent of routing, `waves/T.W9.md:9/63/187` cite the
X1/X2 *verbatim firing ops* as `S/FINAL.md §7` — but §7 is "Process lessons"; the maintainer ops live in
`S/FINAL.md §8` and the book rows in `§5`. **Already reported as MUSTFIX by `h-wave-w8-w9`** — recorded
here only to confirm it does NOT indicate a books/folds routing drop (the X1/X2 fold itself is sound).

---

## APPENDIX — the task-named rows, each verified present + correctly waved

| Row | Present in `T.md §7` | Wave/route | Wave item verified live | CHRONIC status |
|---|---|---|---|---|
| GAP-L2 (variance atoms) | §7.1:372 | P1 + W7 | `letters:52` P1 variance-atoms door; `T.W7.md:69` P-6 re-verify | recent (census A4 — aurora-derive lineage noted, defensibly not flagged) ✓ |
| GAP-ARM | §7.1:371 | P1 + **W2-1** demo half + W7 | `T.W2.md:50` (W2-1 hydration-before-derivation, arm gap = producer P1) | recent (census A5) ✓ |
| GAP-L5 (blob halves) | §7.1:373 | P6 + W4-5/W2-4 demo + W7 | `T.W4.md:62` W4-5 seat; `T.W2.md:53` W2-4 emerge; `T.W7.md:69` | **CHRONIC K→N→M→S→T** ✓ correctly flagged |
| PRM-expand | §7.1:374 | KF note + W7 | `letters:63-67` §KF separate keyframes dispatch; `T.W7.md:69` | recent S.W7 (census A7) ✓ not flagged, correct; §KF honors "never the glass-ui packet" fence |
| X1 (prod api deploy) | §7.1:378 | W9 residual + O-25 | `T.W9.md:63-66,85` X1 restated + O-25 guard | **CHRONIC 2nd carry** ✓ |
| X2 (NCSU alias) | §7.1:379 | W9 residual | `T.W9.md:36,123` X2 restated verbatim | **CHRONIC oldest order** ✓ |
| RP-2 | §7.1:375 | P9 + W7 (re-measure) | `T.W7.md:66` P-3 RP-2 re-measure; §6.2 budget | recent (see N-2 on the triad) ✓ |
| S-3 (letter-rail) | §7.1:377 | **P5** (MANDATED by T-5) + W4-4 interim | `letters:56` P5 rail primitive; `T.W4.md:61` W4-4 seal-recipe ring | joint, FIRED (census §2.6) ✓ |
| L20 (`/blob/config`) | §7.1:375 | P9 + W7 | `letters:60` P9-J2; `T.W7.md:66` P-3 | recent S.W3 (census A8) ✓ |

All nine present, routed to real wave items, dispositions rationaled. Zero book-drop across the 23-row
`S/FINAL.md §5` table.

## VERDICT DISSENT (recorded at the amend pass — VERDICT §5-D6)

SF-1 (EasingPicker a11y, "MUSTFIX-adjacent") **stays SHOULDFIX** — the P7 dispatch has not fired,
so the fold window is open; the accessible-name contract is now named in the P7 row and MUST land
before W0-1 dispatches the letter (the sequencing note rides M-33's packet edits). SF-2/N-2 folded.
