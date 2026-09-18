# X·KF CONFORMANCE PASS 1 — UNION ADJUDICATION

**Seat**: union adjudication (cross-wave axes the per-wave seats cannot see) · 2026-08-28
**Inputs**: the 11 per-wave check files in this directory (all read whole) · the 11 wave specs at `docs/tranches/X/keyframes/waves/` · `carry/KF-W6-CARRY.md` · COHESION §0b (KF.W3 → SS-1 by dated assignment) · seat receipts for KF-W0..KF-W9
**Instruments**: the checks' own receipts, plus union-level greps re-executed this seat (KAD-15/16/20 landings, KF-CB-37 zero-home, `build:gh-pages` counts, per-spec KF-AV-28 map, CubeTarget #21/#30/#39 absence, W4 row-29 split text). Sole write = this file.

**UNION VERDICT: DEFECTIVE — 11 of 11 wave specs DEFECTIVE.**
**122 deduped defects** (2 BLOCKER · 1 CRITICAL · 8 HIGH · 41 MAJOR · 9 MEDIUM · 42 MINOR · 11 LOW · 8 INFO) · **32 program-level partition escapes** (rows routed and carried by NO wave) · **6 undeclared double-homings** · KF.W4 sequencing head breached by exactly one spec (KF-W9) · KF.W3 stays unscheduled everywhere (HOLDS program-wide).

---

## §0 · Per-wave census roll-up (from the 11 checks)

| wave | routedTotal | booked | escaped | local verdict | defect register |
|---|--:|--:|--:|---|---|
| KF-W0 | 95 | 61 | 34 | DEFECTIVE | 7 MAJ · 5 MIN |
| KF-W1 | 6 | 6 | 0 | DEFECTIVE | 3 MAJ · 3 MIN · 2 INFO |
| KF-W2 | 47 | 28 | 19 | DEFECTIVE | 6 MAJ · 4 MIN |
| KF-W3 | 24 | 9 (+5 excl.) | 10 | DEFECTIVE | 2 BLOCKER · 5 MAJ · 6 MIN |
| KF-W4 | 104 | 100 | 4 | DEFECTIVE | 1 CRIT · 6 MAJ · 8 MIN |
| KF-W5 | 43 | 43 | 0 | DEFECTIVE | 4 MAJ · 7 MIN · 1 INFO (register; the check's own "3 MAJOR" tally is short by one) |
| KF-W6 | 390 | 377 | 13 | DEFECTIVE | 4 MAJ · 6 MIN · 3 INFO |
| KF-W7 | 148 | 145 | 3 | DEFECTIVE | 2 MAJ · 4 MIN · 1 INFO |
| KF-W8 | 32 | 32 | 0 | DEFECTIVE | 3 HIGH · 3 MED · 5 LOW |
| KF-W9 | 167 | 157 | 10 | DEFECTIVE | 5 HIGH · 7 MED · 7 LOW |
| KF-W10 | 31 | 31 | 0 | DEFECTIVE | 4 MAJ · 4 MIN · 2 INFO |
| **Σ** | **1087** | **989** | **93** | | **130 raw filings** |

routedTotals sum to 1087 with dual-routed rows (KF.W2/W3, KF.W6/W7, W5/W8 splits, …) counted at each end by design; the distinct-row union is smaller. The 93 per-wave escapes decompose at the union level (§1).

---

## §1 · PARTITION — the whole-registry routing map

**Law applied**: a row routed to any wave must land in ≥1 wave as a row, a spelled-out fold-identity, or an exclusion-with-named-owner. Escaped-by-ALL-waves = program defect. Carried by 2+ waves without a declared cross-edge = double-homing (§2).

### 1.1 Decomposition of the 93 per-wave escapes

| class | count | content |
|---|--:|---|
| **HARD PROGRAM ESCAPES** (carried by no wave) | **32** | §1.2 |
| landed at a sibling wave (partition holds; local spec still defective) | 25 | §1.3 |
| degraded landings (content carried by mechanism; id / rider / magnitude broken) | 31 | §1.4 |
| duplicate filings of one row by two seats (W2 E2≡W3 E-07 · W2 E7≡W3 E-10) | 2 | counted once in the 32 |
| not-live occupants (killed / refused; enumeration defects only) | 2 | kf-SpringTrace S-9 killed-as-stated · kf-SharePopover S-9 refused |
| routed out of the X·KF partition | 1 | kf-CubeScene C-L-2 residual → V·π parser program (cross-repo, lawful) |

### 1.2 The 32 hard program escapes — id for id (each is a program defect)

**KF.W0-routed, landed nowhere (12)** — the census-F-1/SCH-1 fold family whose ids AND travel-riders both drop (W0 §2.B + E-3):
1. kf-DemoGlobalChrome D-5/L-3/C-2 (the `./toast` S-9 fold; the swap verdict is census-owned and the census mint never receives it)
2. kf-EasingTarget KF-ET-3 (rider: 4+3 specifiers; sole consumer of `/fading-scroll` + `/toggle-group`)
3. kf-EasingSidebar KF-ES-33 (rider: 3 subpath edges)
4. kf-EasingScene KF-ES-15 (rider: 7 entry points)
5. kf-KeyframesEditor KF-KE-16 (rider: `/dark`+`/forms` blast radius)
6. kf-TimingFunctionPanel KF-TFP-29 (rider: the KF-CO-17 4.0.1-prose cell)
7. kf-AnimatedText KF-AT-7, declaration leg
8. kf-ChannelOptions L·B-3 discharge half (the reconciliation half is carried)
9. kf-ChromeDock L/B-1
10. kf-CSSPasteDialog F-1 row C-11/L-I1 ("all six component imports ride it" — also absent at W6)
11. kf-KeyframesAddDialog F-1 row L-5/C-11 (same clause — absent at W6)
12. kf-KeyframeCardList L-9 = C-D-7 = C-D-9

**KF.W2/W3 boundary, escaped BOTH parser waves (4)** — each spec assumed the other held the negatives; neither does:
13. kf-DemoGlobalChrome C-10 (*"recorded so parser waves skip this file"* — the instruction is addressed to exactly the two waves that dropped it)
14. kf-SquareScene C S-C (*"worth citing upward when the parser wave lands"*)
15. kf-KeyboardShortcutsModal C-§1/R-B R1-negative (*"Do not re-file"*)
16. kf-SpringTrace D-12 = L-6 = C-4 (the silent-swallow parser posture; also missing from G-W2-1's posture count)

**KF.W4-routed (1)**:
17. kf-SpringTrace D-1's `:48-49` comment truth ("rides the fix" — a sequencing rider, dropped from carry row 29)

**KF.W6-routed (6)**:
18–20. kf-CubeTarget **#21 · #30 · #39** (bolded terminal routing manifest `:100`; grep across all 11 specs + CARRY re-run this seat → **0 hits**)
21. kf-SquareInstrument D-20 (producer-truth correction + the BG-6 BH-relay ask — absent from G-W6-14's relay inventory)
22. kf-CubeScene D-20 ("rides any touching wave"; W6 touches CubeScene.vue and owns the stale-vendor-premise class; not booked)
23. kf-SequencePlayhead flat-namespace datum

**KF.W9-routed (9)** — seven of them the AT/announcement arm S-12 announces (*"≥8 records"*) and §F does not carry:
24. kf-SpringTarget D-5 (aria-hidden half)
25. kf-SpringTarget D-6 (no heading/landmark/name)
26. kf-SpringTarget D-14 — **its cure lock "one binding, with N-4" dies with it (M-25)**
27. kf-SpringTarget N-4
28. kf-SequenceAxis D-12 + the kf-SequenceTarget relay (a cross-record obligation received by no one)
29. kf-SpringHeatmap D-m8
30. kf-PlaybackRibbon D-12's demo-side stopgap
31. kf-SequenceScene D17/D18-unit fold — **a sequencing lock ("SEQUENCED after banked N-1") with no home in any §Sequencing**
32. kf-CSSCodeEditor KF-CE-47's witness arm (SS-13/KF.W9; the EDITOR-UNIT cure half waits on unauthored KF.W12)

### 1.3 Escapes that LAND at a sibling (25) — the partition works where the local spec failed

- **KF-W7's entire escape set lands**: KAD-15 / KAD-16 / KAD-20 are booked at KF-W6 (1 hit each in spec AND CARRY, re-verified this seat). W7's "No CARRY row is dropped" stays false locally; no bytes are lost program-wide.
- **KF-W3's eight non-duplicate escapes all land at KF-W2** (KF-APP-56=B1, EditorShell C-19=B9, CubeAxisLines C·§4=B8, KF-KE-54=B10, TimelineTrack SUP-3=B16, ChannelOptions C·S-4=B17, ChannelControls C-L-1=B23, CubeTarget #11=B22) — the dotted `KF.W2/W3` class parked on the W2 side.
- **Six of KF-W0's escapes land at W6/W7**: the KF-AV-28 S-9 row (W7's intake, H5) · CSSPasteDialog R-5 (W6) · KSM C-9→S-10 (W6) · KF-SKEL-7 (W6, and by id in the CARRY) · the two KF-W6-CARRY §CrossEdges corrections (`App.vue:176`, `--dock-margin` — carried as W6's own G-W6-2/G-W6-1 witnesses). The declared W6→W0 edge stays unanswered at W0 (W0 D-6).
- **Four of KF-W2's** land at W3/W5 (KSC C-2 = W3 B-05 · SquareScene D-27/L-7/C-9 = W3 C-5 · AmigaScene S+2 = W3 B-01 · KF-ET-2's cure-lock inside W5 B-22).
- **KF-AV-28** (W4 E4, W9 E-10) lands at W7 (defining lock, ×7) + W8 (×1).
- **ChannelControls D-7 + L-4** (W6 E-2): booked by id at W4 row 29 — but W4's own disposition routes "all other arms → KF.W6", and W6 carries nothing. Landed at W4's table; the W4→W6 limb is an unreciprocated edge (§2.3).

### 1.4 Degraded landings (31) — content carried, trail broken

W0 §2.C's 13 F-1-fold ids (content in C-1's mechanism, ids ungreppable) + W0 E-32 · W2's 8 R1 verified-negative register cells (the G-W2-5 boundary census misses them; no live defect content) + W2's 2 posture/consumer cells (KSC D-6/L-BL-3/C-1, KF-TFP-20 — NO-WAVE-OWNER at the bank) · W6's 5 alias drops (L-m7 · L-M-3/C-B-1 · D-C6/ND-10) · W4's 2 (the ~40-name `proof:*` magnitude; the `proof:sequence-rows-draggable` liveness measurement — partially convicted at W9 via ST-1).

### 1.5 Ownership holes that are ACTS, not rows (zero-homed acts)

- **KF-CB-37** (the only banked KF.W8 *move*): W8 R-1 hands the act to "KF.W6's reshell commit" on a reciprocal declaration that does not exist — **0 hits in KF-W6.md AND KF-W6-CARRY.md, re-verified this seat**; the CARRY bounds CopyButton.vue as *modify*, not move. G6 is born RED with no wave holding the act.
- **`engine/animation.ts`** (the second structural instance of W5's D-6): W5 declares it W8's; `grep engine/animation KF-W8.md` → 0; W8's R-4 pushes its own half to KF.W10 — the "one rename programme, two waves: do not split mid-cure" lock is now split across three waves with one instance carried by none.
- **The NO-WAVE-OWNER packet set is unclosed**: W1 asserts 16 packets (unreceipted), W0 enumerates 15, W9 enumerates a different 14, W10 books NWO-TERMINAL-SWEEP as BLOCKER-to-close with "the amiga packet + the orientation/a11y cluster unclaimed", and W4 — the homing authority — homes two lists that omit the **transport/ribbon packet** and the **drag-seam packet** entirely (W4 D-5). No cardinality is true; two packets have no proposed home at all.

---

## §2 · DOUBLE-HOMING — rows carried by 2+ waves

### 2.1 Declared and clean (the partition's working seams — no defect)

KAD-13 and KF-SKEL-16 (W5→W7, reciprocated ×2 each) · KF-AT-26's four-leg split (a)(b)(d)→W6 / (c)→W8 / (e)→W10 with identity guards at both W8 and W10 · KeyframeTimeline C-12 (W8 "publish-or-relocate" + W4 gate arm, split declared both ends) · KF-CE-12's four-wave arm split (W2 R1-ingress / W3 rider / W4 gate arm / W8 terminal — arm-split locks quoted verbatim) · KSC C-8 (W5 surface / W8 colocation, explicit split lock) · TD-19's typecheck/test halves · THP MISSED-3 carried at W7 as a two-wave binding law · KF-AT-8 (W5 B-1 ↔ W6, reciprocated at CARRY:356).

### 2.2 Undeclared double-homings (6) — each a union defect

1. **KF-KE-24** — W6 §Carry books it (L235) while W6 §Bounds forecloses it (`KeyframesEditor.vue … KF-KE-21/-23/-30/… only`) and the registry routes it →KFED-UNIT with a KF.W6 rider. Two claims on one row, contradictory inside one spec (W6 D-B1).
2. **KF-KE-32** — same file, same contradiction.
3. **TimelineCaret L-7** — banked →KF.W7 (booked W7 P6); W4 claims the cure site in-wave (§Bounds :61 + G-KFW4-4 witness) with no declared cross-wave re-open (W4 D-14).
4. **ST-1's cure bytes** (`SequenceTarget.vue:97` + `css:163-167`) — W9's G-KFW9-10 lands the edit while W9's own S-11 homes the sequence packet to proposed KF.W11 "sequenced after the KF.W4 gate" and S-13 fences it as a triumvirate trigger.
5. **Census slot S-10** — triple-claimed: KSM C-9's seat-ruled renumber, KF-KE-21's booked ask, kf-SquareInstrument C-12 — while W0's C-17 (the single-motion mint that must resolve it) enumerates a roster short by six claimants (W0 D-1).
6. **The KF.W4-PROSE class boundary** — W4 row 29/30 holds the seven ChannelControls ids and routes "all other arms → KF.W6"; W6's taxonomy line claims every non-`proof:*` limb; the two specs apply the split rule to opposite effect on D-7/L-4's rationale block (W6 files it as its own escape; W4 holds the id; W6 received nothing). The split RULE is doubly owned; at least one limb falls between.

*(Related but declared: the W2↔W8 serializer-publication ordering (MISS-β2/C-12) is declared at both ends yet circular — each spec conditions its gate on the other; no orderer exists (W8 D-6). The W0↔W4 proof-script-roster denominator is declared DISPUTED at W4 OP-3 with the deciding banked measurement uncarried (W4 D-6/E2).)*

### 2.3 Declared-but-unreciprocated edges (the "silent drop at the receiving end")

- **W5 → W6**: ten of twelve §Excluded re-homes have 0 hits at KF-W6.md AND the CARRY (KF-SS-4/-6/-31/-38 · KF-ET-33/-35 · KF-ES-36 · KF-SKEL-9/-20 · KAD-17). Controls prove the instrument (KAD-1 = 12/12).
- **W6-CARRY §CrossEdges → W0**: `App.vue:176` correction, `--dock-margin` census, KF-SKEL-7's coupling arm — unanswered at W0 (W0 D-6).
- **W6/W7/W5 → W8**: four inbound edges neither booked nor declined at W8 (import-granularity half KF-KC-37+SP-18+KF-KE-53 · SpringTrace C-3's implementation edge · `ingest/cssom.ts` colocation · B-16 shadow-name) (W8 D-4).
- **W10 → W1**: KF-W10 hard-blocks on KF.W1 three times (Opens-after, OP-3, §6 B); W1's reciprocity paragraph never names it (W1 D-1).
- **W9 → W6**: KF-EST-4's cure routed to W6; 0 hits in the CARRY (W9 D-14).
- **W4 → W6**: the non-authority arms of row 29 (incl. ChannelControls D-7/L-4's limb) — W6 received none of them by id.

---

## §3 · HEAD + GATE — the two program-wide posture axes

### 3.1 KF.W4 sequencing head (`KF-W4.md:193` — "No repair packet and no UNIT may open before G-KFW4-1 lands")

| spec | posture | finding |
|---|---|---|
| W0 | HOLDS | substrate wave; routes the demo-typecheck arm to W4; repeats "after KF.W0 + KF.W4" on every UNIT |
| W1 | HOLDS | orthogonal MAIL HEAD (COHESION §2), reciprocated by W4 :206 |
| W2 | HOLDS | OP-4 defers the KFED-UNIT call-site edit behind the head |
| W3 | HOLDS | OP-6 hard; L-3 "KF.W4 BEFORE THE REPIN" |
| W5 | **PARTIAL BREACH** | the front-load exemption's typecheck half is sound; the test half is not — G-XSS (the only BLOCKER gate) is unobservable without W4's CI wiring, and OP-6's "no gate here waits on KF.W4" is false for it (W5 D-2/D-3) |
| W6 | HOLDS | six enumerated bindings at L374, incl. two ATOMIC BUNDLEs |
| W7 | HOLDS | depends-on for verification, not authoring |
| W8 | HOLDS, exemplary | "KF.W8 authors no type gate"; shared-file race ordered W4-first |
| W9 | **BREACH — the program's one hard violation** | G-KFW9-10 lands a packet-owned affordance edit while OP-6 declines W4 as a precondition; W9's own S-11 sequences that packet "after the KF.W4 gate" and its own S-13 makes the edit a mandatory triumvirate trigger (W9 D-4) |
| W10 | HOLDS (weakly) | satisfied transitively by "Opens after KF.W2..W9 IMPLEMENTED"; the head law never named (W10 D-10, INFO) |

Also union-visible: the head declaration's own witness list is miscounted ("six banked records", lists nine, one unsourced — W4 D-10), and W4's G-KFW4-1 instrument wave carries the CRITICAL G-8 unsatisfiability (W4 D-1) — the head everyone defers to is itself the least closable wave.

### 3.2 KF.W3 GATED via PLAW-BIND, never scheduled

**HOLDS in all 11 specs.** No spec schedules W3 work, promises a cut date, or creates a direct parse-that→keyframes edge. W1 (NON-EDGE declaration), W5 (no pre-empt of the 4.0.0→4.1 repin), W6 (0 tokens), W9 (0 tokens; the one parser row excluded → V·π), W10 ("W10 RECORDS, never schedules") are exemplary. Three prose-grade blemishes, no scheduling breach: W4 R-2 calls the repin-bound memo deletion a "dated end" (it is condition-bound under PLAW-BIND — W4 D-13); W8 routes KF-CE-12's R1 arm to "KF.W2/W3" without flagging W3's GATED posture (W8 D-11); W3's own OP-3/cross-edge is stale against COHESION §0b (2026-08-28), which CURED the ownership gap by assignment to SS-1 and names KF-W3.md itself (W3 D-05). §0b covers KF.W3 only — W10's SPECIFIED precondition (an owner for KF.W10) remains open, and W10 self-stamps against it (W10 D-9).

---

## §4 · ARITHMETIC — routedTotals vs the taxonomy counts

Given taxonomy counts (check order): W0 237 · W1 0 · W2 22 · W3 14 · W4 142 · W5 60 · W6 424 · W7 181 (+ W8/W9/W10 unstated). Corpus token counts (grep `KF.Wn`, W1-check §1a, re-derived): 252 · 0 · 23 · 13 · 153 · 62 · 424 · 188 · 48 · 262 · 15.

| wave | taxonomy | routed | delta mechanism |
|---|--:|--:|---|
| W0 | 237 | 95 | tokens/hit-lines ≠ distinct ids. 238 matched lines split: 33 roster routings + 76 prose routings + discarded boilerplate (the "W0 Substrate Settle · W1 Mail Cure …" taxonomy recital sits in ~30 records) + repeated §B-12 law cites → 95 distinct ids. |
| W1 | 0 | 6 | **namespace collision, fully explained**: census-taxonomy KF.W1 (Mail Cure) has ZERO registry rows (confirmed 4 ways); the 6 are `KF.W1-DEP` (lane-frontend §10, 18 tokens) — all one identity, census F-1 — booked as fold + exclusion. A third namespace ("BUILD W1", 6 hits) routes to W0. |
| W2 | 22 | 47 | census WIDER than the token: dotted `KF.W2/W3`, "parser lane/waves" prose, posture cross-refs, R1-class cells "recorded so parser waves skip this file" — W2 declared itself census-of-record for the R1 class. 48 `KF.W2-TABS` tokens excluded (collapse into W6 by binding ruling — undeclared in W2, its D-8). |
| W3 | 14 | 24 | same widening: 19 canonical + 5 `KF.W3-SHIM` family (12 tokens; excluded → W6 with riders intact). |
| W4 | 142 | 104 | −30 `KF.W4-PROSE` tokens (R-1 splits the class W4/W6), − sequencing references ("sequenced after the KF.W4 gate", "trivial under the gate"), − kill-register rows; 29 table rows + 166 prose lines reduce to 104 ids. |
| W5 | 60 | 43 | −16 routing-law preambles, −2 false positives (`P.W5.S3`, `R.W5` — tranche ledger tokens), −3 `KF.W5-PARTIALS` (superseded taxonomy → W6, G-TAX verified 3 header hits / 0 rows). |
| W6 | 424 | 390 | the check order's "424-row CARRY" framing was WRONG (corrected by the W6 seat): 424 = literal token count; 435 routed row-blocks → 390 distinct (record,id) units → the CARRY's 201 rows by fold/merge consolidation. 54 contributing records confirmed both ways. |
| W7 | 181 | 148 | 222 raw `\bW7\b` hits → 160 routing bullets → 148 terminal ids; − boilerplate, − `J.W7a/c` (tranche-J), + 8 `KF.W6-TIMELINE` tokens are W7's under the old numbering; 7 `KF.W7-TOKENS` = naming schism, 3 rows excluded-with-reason. |
| W8 | — (48 tokens) | 32 | 67 hit-lines classified; fold-transitivity closed (ids folded to W8-terminal identities without typing W8); +3 census-derived non-registry rows, declared as such. |
| W9 | — (262 tokens) | 167 | 296 raw hits → terminal dispositions only; below row level sits the SS-13 residue aggregate ≈588 (563 enumerated + 25 prose) — independently re-derived exact by the W9 seat, the program's best-evidenced denominator. |
| W10 | — (15 tokens) | 31 | **the only INVERTED delta**: 4 registry rows (from 47 hit-lines, mostly preamble) + **27 non-registry obligations** (8 Codex-lane · 15 FOLD-FORWARD §B · 2 mechanism-homed · 2 ledger/branch) that carry no registry token at all. Tier-1..5 method, 0 escapes. |

**No delta is unexplained.** Every gap is one of four mechanisms: (a) token-vs-id inflation (boilerplate recitals, law cites, multi-token rows), (b) namespace collisions (`KF.W1-DEP`, `KF.W2-TABS`, `KF.W3-SHIM`, `KF.W4-PROSE`, `KF.W5-PARTIALS`, `KF.W6-TIMELINE`, `KF.W7-TOKENS` — the superseded lane-frontend §10 sketch colliding with the census taxonomy), (c) semantic widening by the census-of-record waves (W2/W3), (d) non-registry obligation tiers (W8 census rows, W9 SS-13 aggregate, W10's ledger tiers).

---

## §5 · UNION DEFECT REGISTER — fold + dedupe

**Arithmetic**: 130 raw filings across 11 checks → **−10 cross-filed dedupes** → 120 → **+2 union-level defects** (U-1, U-2) → **122**.

Dedupes (one program defect each, filed N times):
- **P-1 · KF-AV-28 rider dropped** — filed 6× (W2 D-7 · W3 D-13 · W4 D-4 · W6 D-P1 · W9 D-7 · W10 D-4). Re-verified this seat: only W7 (×7) and W8 (×1) carry it; 0 in the other nine specs. Six of those carry rows the rider governs. (−5)
- **P-2 · `build:gh-pages` phantom script** — filed 2× (W0 D-2 · W9 D-1); 7 + 3 citation sites re-verified; the script exists at no coordinate (real: `npm run gh-pages`). Four records' byte-offset trust hangs on it. (−1)
- **P-3 · phantom per-wave CARRY ledgers** — filed 4× (W2 D-9 · W3 D-08 · W5 D-11 · W7 D2). Five specs assert "N rows carried, 0 dropped" against ledgers that do not exist in-tree; only KF-W6-CARRY.md exists. The zero-drop provenance chain for W2/W3/W4/W5/W7 is unauditable — and W7's D1 and W3's D-02 are exactly the failures those ledgers would have caught. (−3)
- **P-4 · the "kf-SquareScene law" provenance chain** — filed 2× (W2 D-1 invented-authority · W8 D-10 unanchored cite). The label is real but minted at KF-W6.md:128 over KF-CE-41; W2 invokes it as banked, W8 cites it without the minting anchor. (−1)

Union-level additions:
- **U-1 · MAJOR · 32 rows routed and carried by NO wave** (§1.2) — the program-partition defect the per-wave seats each saw only one side of. Clusters: the W0 fold-rider family (12), the W2↔W3 mutual-assumption hole (4), the W9 AT arm (7 of 9), the W6 manifest trio (#21/#30/#39).
- **U-2 · MAJOR · 6 undeclared double-homings** (§2.2) — including the KF.W4-PROSE split rule owned to opposite effect by W4 and W6, and the S-10 census-slot triple-claim.

### Ranked worst-10 (the register's head)

| # | sev | wave | defect |
|---|---|---|---|
| 1 | BLOCKER | KF-W3 | §Excluded E-12 bans any reachability claim at `useSquareTumble.ts:22` on K-6's authority, while the spec's own carried C-5 (kf-SquareScene D-27/L-7/C-9, MAJOR: five throws in the rAF frame BRICK the loop) and the frontier `!ok → throw` bytes establish it; C-4 and C-5 contradict inside one §Carry, unreconciled — the spec forbids the gate that can fail for its intended reason (L-19 inverted). |
| 2 | BLOCKER | KF-W3 | 10 of 19 canonical routed ids escape (47.4% carriage), six of them the UNREACHABLE-with-mechanism rows that ARE G-KF3-7's call-map denominator — a map authored without them cannot know what completeness is. (Union mitigation: 8 land at W2; 2 escape both — §1.2 #13/#14.) |
| 3 | CRITICAL | KF-W4 | G-KFW4-8 (citation census) is unsatisfiable in-wave: the command covers every `proof:*`/baseline/allowlist citation while the spec names nine targets and the bank enumerates ≥6 further dead-citation families (one 16-hits-across-13-files), every cure site outside §Bounds where any write trips the triumvirate — the staged-red disease on the declared sequencing head itself. |
| 4 | HIGH | KF-W9 | The measure-vs-cure identity crisis + the program's only hard KF.W4-head breach: the preamble/OP-2/S-11 say measure, §Goal/§Bounds/G-KFW9-8/-9/-10 say cure; G-KFW9-10 lands a packet-owned behaviour edit before the head, in a component W9's own S-11 declines and S-13 fences — the triumvirate fires by construction. |
| 5 | HIGH | PROGRAM (W8×W6) | KF-CB-37 — the only banked W8 move — is handed to W6 by R-1 on a reciprocal declaration that does not exist (0 hits in KF-W6.md and the 201-row CARRY, re-verified); the act is owned by neither wave and G6 is born RED with no actor. |
| 6 | HIGH | PROGRAM (W0+W9) | Gates in two waves close on `npm run build:gh-pages`, a script that exists at no coordinate (7 + 3 citation sites); OP-5's witness-refresh law and G-0.10/G-KFW9-14 cannot be executed as written; four records' byte-offset trust hangs on the refresh. |
| 7 | HIGH | PROGRAM (W5×W8×W6) | The structure programme is split against its own lock: W5's "one rename programme, two waves — do not split mid-cure" ends up across three waves (W5 renames · W8 declines to W10 · `engine/animation.ts` carried by none), the 16-vs-8 stutter denominator schism is unresolved, and ten of twelve W5 re-homes plus four W6/W7/W5-declared inbound W8 edges have no slot at their destination. |
| 8 | MAJOR | PROGRAM | KF-AV-28 — the standing supersession rider on every NO-WAVE-OWNER row at three records, KF.W7's self-declared defining lock — is dropped by six of the specs that carry rows it governs (W2 W3 W4 W6 W9 W10); a W7 SWAP verdict can discharge rows those waves are spending cures on. |
| 9 | MAJOR | KF-W0 | 34 of 95 routed ids escape, headed by the S-9/S-10 shadow-census collision: C-17's single-motion mint is short six claimants while the registry already holds a seat-ruled renumber colliding with two booked S-10s — a triple-claim on one census slot that the mint exists to prevent. |
| 10 | MAJOR | PROGRAM | The NO-WAVE-OWNER packet partition is unclosed: 16 (W1, unreceipted) vs 15 (W0) vs 14 (W9) vs set-open (W10 BLOCKER); the homing authority (W4) homes two lists that omit the transport/ribbon and drag-seam packets entirely — two packets have no proposed home anywhere. |

**Register tail (11–122, by cluster, all retained from the per-wave checks)**: the counting waves' self-miscounts (W5 44≠42 with G-SCOPE unsatisfiable · W9 68≠69 · W6-CARRY gloss 55≠54 · W10 register ordinals · W2 G-W2-1's 8-postures-as-gate short ≥3 · W9 negative-register 8/6/11) · W10's three non-reproducing self-measurements (G-4 grep field 5→22 files · stale-HEAD proof roster under an origin/master stamp · the sibling-spec roster two-thirds false) · W1's unreceipted "16 packets" + missed W10 reciprocity + self-satisfying G-KF1-11 · W2's K-6 bank misstatement and invented-law gate · W3's self-satisfying G-KF3-1, fail-open G-KF3-8/9 (7 real gates, not 9), stale OP-3 vs COHESION §0b · W4's unbounded gate fixtures (5), pathless bounds rows (4 + `<config>` placeholder), stale `scripts/gates/` inventory (2 vs 9 at the frontier), D:D-8 unresolvable id, row-27 id/claim mismatch · W6's minted KF-SP-3 (breaks "ids keep their banked names for life"), §Bounds-vs-§Carry contradiction on KeyframesEditor.vue, W6-AUTH-1's unbanked re-shaping of four adjudicated cure-shapes (its facts TRUE at the dist — the correction belongs at the bank), G-W6-8 "RED by construction", G-W6-14's pathless relay · W7's two self-refuting G15 witnesses, minted PR-CAUTION/L-15-PROTECTED, three incompatible runnability preambles · W8's fifth live barrel (transport/index.ts) outside G4's "all four", G7 discharging three NO-WAVE-OWNER rows another owner holds, W2-OP-6 circular ordering · W9's OP-2-forbids-§Bounds-writes, dangling `kf-ControlsPaneWrapper D-3+M-1` fold-identity, forced-colors zero-to-nonzero impossibility under its own edict · W0's phantom `e2e/` witness (G-0.4/FE-3), dead-gate roster short 3 sites, dropped fold riders, mis-cited C-9 source id · plus the MINOR/LOW/INFO tail as filed.

---

## §6 · What HOLDS program-wide (recorded so pass 2 does not re-litigate)

1. **Measurement discipline is real everywhere.** Every check re-executed witnesses; the overwhelming majority reproduce byte-exact (W0's ~30 RED baselines, W1's 11/12 gates + drift table, W2's full anchor table, W3's §6 table, W6's three re-run gates, W7's 18 line counts, W8's 7/7 gates, W9's denominator and gate table, W10's substrate constants). Zero fabricated citations were found in any spec.
2. **E-3 + STATUS is clean in all 11**: zero VERIFIED stamps, status `planned` everywhere, no product source opened, addenda-not-patch honoured.
3. **KF.W3 stays gated program-wide**; the PLAW-BIND fence held under 11 independent adversarial reads.
4. **Two census axes are airtight**: W5 (43/43), W8 (32/32), W10 (31/31, five-tier method), W1 (6/6 + a true ∅-column finding) — the escape disease is concentrated in W0, W2/W3, W6's seams, and W9's AT arm.
5. **The W6 CARRY instrument works**: 201 rows / 54 records confirmed by independent enumeration; the id-keyed control greps (KAD-1 = 12/12) prove the counting instruments sound.

---

## §7 · Structured summary (mirrors the StructuredOutput call)

- **verdict**: DEFECTIVE — 11/11 wave specs DEFECTIVE
- **defectCount**: 122 (130 raw − 10 cross-filed dedupes + 2 union-level)
- **partitionEscapes**: 32 (§1.2, id-for-id)
- **doubleHomed**: 6 (§2.2)
- Head axis: KF.W4 head breached once (KF-W9), partially strained once (KF-W5); KF.W3 unscheduled HOLDS everywhere.

*Union seat, PASS-1. This file is the pass's only union write; nothing here stamps any wave. E-3: a check record, not a spec amendment.*
