# F-W7 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 1)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W7.md` (276 lines, mtime 2026-08-28 12:21)
**Corpus authority**: the 66 `fr-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (count verified = 66)
**Carry authority admitted**: `docs/tranches/X/fourier/carry/F-W1-CARRY.md` (W1) and `F-W4-CARRY.md` (W4) — the ONLY two carry ledgers in tree (`find docs/tranches/X -iname "*CARRY*"`)
**Method**: ID-keyed census (X·P terminal method) + M-25 depth trace + gate-witness reproduction + E-3/status + posture axes. Every probe below was run read-only by this seat 2026-08-28. Zero product bytes written; zero fourier bytes written; the only write is this file.

**VERDICT: DEFECTIVE.**

---

## §1 — ID-KEYED CENSUS

### 1a. Direct routings to F-W7 across the 66 records

```
$ cd docs/tranches/V/megatranche/registry/adjudicated
$ grep -n -iE "F\.W7|F-W7|FW7" fr-*.md
fr-Tooltip.md:10   … kf-TimelineHoverPreview (MISSED-1 ariaLabel cure @ KF.W7) …
fr-Tooltip.md:32   … prescribes the same `ariaLabel` cure at KF.W7 against glass 7.0.0 …
```

Both hits are the substring `KF.W7` — a **keyframes** cross-repo relay note, not an X·F routing.

Widened to any `W7` token:

```
$ grep -noE ".{80}W7.{80}" fr-*.md
fr-ConvergenceLegend.md:83   … "sampleColorRamp M.W7 book dischargeable-on-adopt" …   (fourier's own M-tranche)
fr-GalleryMarquee.md:73      … base.css AV.W16 TW7 clause …                          (a glass-ui producer clause)
fr-Tooltip.md:10, :32        KF.W7                                                   (keyframes)
```

Routing-target distribution over the whole corpus (`grep -ohE "F\.W[0-9]+(/W[0-9]+)*(–W[0-9]+)?"`):

| target | occurrences |
|---|---|
| F.W4 | 1128 |
| F.W3/W4 | 1010 |
| F.W1 | 839 |
| F.W3 | 246 |
| F.W5 | 173 |
| F.W0 | 153 |
| **F.W5–W8** (band) | 72 (+ hyphen-form; 148 routing lines across 49 records) |
| F.W2 | 68 |
| F.W9/W10 | 54 |
| F.W1/W2 | 5 |
| **F.W7** | **2 — both `KF.W7`** |
| F.W0/W1 | 2 |
| F.W1/W3 | 1 |

> **`routedTotal` = 0.** No adjudicated row id in any of the 66 records carries a terminal disposition to F-W7.
> **`bookedCount` = 0.** Nothing to book.
> **The spec's own claim reproduces exactly.** §5a asserts: *"Routing re-verified this fold seat 2026-08-28: `grep -n "F\.W7" fr-*.md` over all 66 returns `fr-Tooltip.md:10` and `:32` only — `KF.W7`, a keyframes cross-repo note, not a routing. Pure greenfield confirmed."* **CONFIRMED, byte for byte.** This is the spec's strongest single passage.

### 1b. The band denominator (F.W5–W8), and why it is not F.W7's

148 routing lines across 49 records route to the four-wave band `F.W5–W8`. The band's home is F.W5: `F-W5.md` §2 agglomerates **128 CARRY rows** into the §A–§G clause tables, and F-W7 §5d records the split correctly (*"the F.W5–W8 union, where **F.W5 took the band row**"*). F-W7's obligation over the band is cite-not-book (G-F7-8), and it discharges that obligation in shape — but with mis-keyed ids (§2 below).

### 1c. Escape — 1

| escaped id | record · bytes | why it is F.W7's and where it should have landed |
|---|---|---|
| **L-5** (MAJOR) | `fr-ContourEditorCanvas.md:56` — *"Unbounded deep-reactive undo stack over a 1024-point default (all 36 lines read: no cap, slice+push, deep copies at 4 sites; `points` is `ref` not `shallowRef`; 4096 reachable) … **ADJUDICATED → F.W3/W4 (cap + structural sharing candidate)**"* | This is the corpus's **ONE true, non-substring hit** for R-4's own six-term probe, and it names **structural sharing** as an adjudicated cure candidate over a flat coordinate bag — F.W7's exact subject. F-W7 §5 does not carry it, §8 does not exclude it, and §5a/§8 assert the opposite of its existence (see D-7). Its *routing* is F.W3/W4, so it is not a routing escape; it is an **exclusion-without-reason escape** from §8, whose stated purpose is *"each is named so a later reader cannot mistake absence for oversight."* |

Receipts:

```
$ grep -rniE "trie|prefix.?tree|radix|patricia|structural.?sharing|delta.?compress" fr-*.md | wc -l
147
$ grep -rniE "\btrie\b|prefix.?tree|\bradix\b|patricia|structural.?sharing|delta.?compress" fr-*.md
fr-ContourEditorCanvas.md:56:- **L-5 — MAJOR.** Unbounded deep-reactive undo stack …
```

**146 substring artefacts + 1 true hit.** F-W7 §5a N-2 and §8 both say *"60+ lines, **every one of them a substring artefact**"*.

---

## §2 — NO INVENTION / M-25 DEPTH: the 14 carried rows, traced id-for-id

`✓` trace verified against the banked bytes · `✗` mis-keyed or refuted.

| # | §  | carried row (as written) | banked source | trace |
|---|---|---|---|---|
| 1 | 5a | **R-4 ≡ E16 ≡ G7** ⊙ | `F-W5.md:153` §E16 "Trie disposition"; `F-W5.md:226` G7 ⊙; lane-crud §2 R-4; CENSUS §4 sketch 8 | ✓ identity; ✗ section pointers (D-11); ✗ dissent quote (D-2) |
| 2 | 5a | **P-10 (F.W7 limb)** ⊙ | `F-W3.md:289` S-6 — *"Declared-not-carried edge: **F.W7's anti-tree KISS guardrail stays inline in F.W7.**"*; `F-W3.md:395` — *"Explicitly declared as an edge, not carried — it stays inline in F.W7 (S-6)"* | ✓ **verbatim exact, both anchors** |
| 3 | 5a | **N-1 ⟨NEW⟩⟨CC⟩** guardrail not bilateral | this seat's measurement | ✓ **reproduced exactly**: `atomdiff.py:1` = *"authored once (fourier), adopted twice (value.js twin)"*; `:7` = ``lib/crud/atomdiff.ts``; `:12-14` = the flat-BAG guardrail; `grep -rniE "merkle\|flat bag\|not a tree" $V/api/src $V/src` → **1 hit**, `api/src/modules/palette/hash.ts:6` *"(Merkle property)"* |
| 4 | 5a | **N-2 ⟨NEW⟩** probe noisy AND blind | this seat's measurement | ✗ **REFUTED in both figures** (D-7) |
| 5 | 5b | **S-8 (+ K-13 co-sign)** | `fr-AdminAuditLog.md:126` — *"an absence-proof must enumerate the surface, not query one name for it"*; `fr-GalleryAdminBanner.md:90` K-13 — *"26 occurrences / 17 files"* | ✓ **verbatim exact, both**. Four counter-witnesses re-run: `image_storage.py:269-283` = `compute_contour_hash` on ordered pairs ✓ exact (real path `$F/api/services/`); `database.py:98` = `create_index("content_hash")` **plain** ✓ exact; `hash.ts:8-17` + `findByHash {_id: hash}` ✓ exact; ImageUpload roster 12/23 + m-15 ✓ |
| 6 | 5c | **TA-4 ≡ E3** ⊙ ‡ | `F-W5.md:140` §E3 "Diff-clause participation" ✓ | ✓ id; probes reproduce **exactly** (`grep -rn "atomdiff\|atomDiff" $V/api/src $V/src` → 1 comment hit at `palettes-forks.test.ts:9`; `ls $V/api/src/lib` → *No such file or directory*); ✗ its `J-diff-shape.md §6` witness is a **phantom file** (D-9) |
| 7 | 5c | **V-β ≡ E1** | `F-W5.md:138` §E1 "Compound per-entity version identity" ✓ | ✓ **strongest row in the spec**. `hash.ts:8-17` folds `{name, colors}` only, never `paletteSlug`; `paletteVersion.ts:13-14` `findByHash` → `{_id: hash}` unscoped; `:47` early-returns on hit. All three reproduce **exactly** |
| 8 | 5c | **C-25 ≡ E12** | `fr-ContourSettings.md:43` B-4 ✓ exact | ✗ **F-W5 homes this at `E13`** (`F-W5.md:150` "Cache identity ⊇ consumed fields \| B-4 (ContourSettings) = C-1 ∘ C-25 / R6-8 ⊕ i-7 ⊕ m-18"). F-W5's real `E12` (`:149`) = "Debounced mirror vs synchronous save \| MISSED-E (EasingPicker save-race)" |
| 9 | 5c | **N-3 ⟨NEW⟩⟨CC⟩** stamping instant | `fr-ContourSettings.md:126` (S-3), `:43` (B-4), `:69` (M-12) | ✓ **all three verbatim exact**, incl. *"lastComputedKey records the scheduling fact, not the result fact … stamped from LIVE refs after the awaits"* |
| 10 | 5d | **K-3 ⊕ C-2 ≡ E11** ‡ | `fr-ContourEditorCanvas.md:48` (C-2), `:105` (K-3 KILLED), `:139` (*"MOVE A POINT FIRST"*) — all ✓ verbatim exact | ✗ **F-W5 homes C-2 at `E17`** (`F-W5.md:154` "Image bounds on write ‡ \| C-2 (ContourEditorCanvas)"). F-W5's real `E11` (`:148`) = "Easing domain hoisted to the operation \| RESOLVER (D-10·L-4·C-D-4) ⊕ L/M-3" |
| 11 | 5d | **m-15 ⊕ roster 12 ⊕ roster 23** | `fr-GalleryDraftsSection.md:80`; `fr-ImageUpload.md:22/:46/:57/:90/:124`; `F-W5.md:106` §C2 carries m-15 ✓; dissent at `fr-ImageUpload.md:124` ✓; `fr-VisualizationView.md:78/:151` L-8 precedent ✓ | ✓ **every anchor exact; both dissents genuinely CARRIED, not merely cited** |
| 12 | 5d | **B-2 ⊕ FR-GV-1 ≡ E5** ‡ | `F-W5.md:142` §E5 "Create idempotency and dedupe" ✓; `fr-GalleryDraftsSection.md:40` ✓; `fr-GalleryView.md:34` ✓ | ✓ **exact** |
| 13 | 5e | **SS-C-1 ≡ E8 ⊕ SS-C-2 ≡ E9 ⊕ M-β4 / L·m-6 ≡ E10/B4** | `fr-SpeedSelect.md:44/:45` ✓ exact; `fr-BasisCanvas.md:54` BC-20 ✓ exact (*"`duration` ref(20000) with **zero writers**"*) | ✗✗ **two mis-keys**: F-W5 homes **SS-C-1 at `E7`** (`:144` "PATCH atom coverage + `set_hash` recompute \| F-β ⊕ **SS-C-1 write leg**") and **SS-C-2 inside `E8`** (`:145` "AnimationSettings — the three-way reconciliation \| BC-9/C-6/D-20 ⊕ **SS-C-2**"). F-W5's real `E9` (`:146`) = "One shape, one name \| C-7 (BasisCanvas)". `E10` ✓ correct — but F-W5:147 itself ends *"**Distinct from B4's**…"*, so F-W7's pairing "E10/B4" contradicts the home clause's own separation |
| 14 | 5e | **OG-F1 (+ D-19, X-1)** | `INTAKE-ADJUDICATION-2026-08-03.md` §4 (real path `docs/tranches/V/megatranche/audit/codex-provenance/`) ✓; `fr-PaperSidebar.md:15/:29` M1 ✓ exact; `fr-GalleryAdminBanner.md:6` GAB-13 ✓ exact | ✓ **all three git probes reproduce exactly** (see §3) |

### 2a. Cure-shape locks / sequencing riders / dissents

| lock | carried? |
|---|---|
| ▲ K-3 upsert arm killed — *"never revive it in a design rationale"* | ✓ §5d + §7b + §8 |
| ▲ C-2 witness recipe — *"MOVE A POINT FIRST"* | ✓ §5d + §7b, verbatim against `:139` |
| ▲ E1 unscoped-content-keying is a defect generator | ✓ §5c + §7b |
| ▲ C-25 superset obligation | ✓ substance; ✗ quote is **not verbatim** (D-14) and clause id wrong (D-3) |
| ▲ M-12 snapshot/result stamping (4th key lock, new) | ✓ §5c N-3 + §7b |
| ▲ SS-C-2 do not size over dead fields | ✓ §5e + §7b |
| ▲ m-15 **CROSS-REFERENCED, NOT MERGED** with F-4 | ✓ §5d + §7b, verbatim |
| ▲ FR-GIG-5 no-credit bar | ✓ substance (`fr-GalleryInfiniteGrid.md:47` verified); ✗ pointer says F-W5 §1b, actual §0b (D-11) |
| ▲ BC-20 `duration = ref(20000)` stays banked | ✓ §5e + §7b |
| ▲ D-19 no anchor cited as live pre-F.W0 | ✓ §3, §5e, §6 G-F7-7, §7c |
| **Dissent 1** — the trie-vs-KISS dissent | ✗ **quote fabricated** (D-2) |
| **Dissent 2** — `fr-ImageUpload.md:124` R1's MAJOR | ✓ CARRIED with its re-grade trigger (SS-13 item 5) |
| **Dissent 3** — `fr-CoefficientsPanel`/`fr-VisualizationView` L-8 severity-follows-consequence | ✓ cited correctly as the overruling precedent |

### 2b. Named locks from the check brief — do they bind F.W7?

Verified NOT F.W7's, each with its real home, so their absence here is correct:
`fr-PaperSearchModal` same-commit riders + **MPC-31** + **FR-MSP-6** → land at **F.W3** (`F-W3.md:393`); **PAW-44/LAW-3** → **F.W4's** (`F-W3.md:393`, *"same-commit rider class … its row lands with F.W4's restore work"*); **FR-NP-32** corrupt-dist sequencing → **F.W0's** (`F-W3.md:394`, *"the corrupt-dist settle … F.W0's (S-1)"*; `F-W1.md:317` names FR-NP-32's dist emitter fix in the non-credit list); **F.W3's four anti-cures** and **F.W4's derivation-law preamble + NEGATIVE ROSTER** → their own waves. F-W7 §7c/§8's negative declarations (SS-6 zero glass rows, X·P forbidden edge, SS-13 exports zero) are consistent with this. **CLEAN on this axis.**

---

## §3 — GATES: 11, born-RED, witness reproduction

| gate | witness reproduces? |
|---|---|
| **G-F7-1** ⊙ | **PARTIAL ✗.** `$F/api/lib/crud/atomdiff.py` **EXISTS**; `sed -n '1,15p'` returns the guardrail at `:12-14` exactly. But the second half of the witness — *"`F-W5.md` §3 verbatim: **'No trie design absent G7's ruling'**"* — is **fabricated** (D-1) |
| **G-F7-2** | **PARTIAL ✗.** Named records real and verbatim-exact; **N-2's noise measurement is false** (D-7) |
| **G-F7-3** | **✓ EXACT.** `grep -rn "atomdiff\|atomDiff" $V/api/src $V/src` → 1 comment hit, `…/palettes-forks.test.ts:9`; `ls $V/api/src/lib` → *No such file or directory* |
| **G-F7-4** | **✓ EXACT.** `hash.ts:8-17` folds `{name, colors}`, no `paletteSlug`; `paletteVersion.ts:13-14` → `{_id: hash}`, no slug scope |
| **G-F7-5** | **PARTIAL ✗.** `fr-ContourSettings.md:43` reproduces; the clause pointer (E12) and the "verbatim" wording are both wrong (D-3, D-14) |
| **G-F7-6** | **✓.** `fr-SpeedSelect.md:45` exact; F-W5 §E10 disposition genuinely UNSTATED |
| **G-F7-7** | **✓ EXACT, all three.** `git -C $F status --porcelain \| wc -l` → **28**; `rev-parse --short=8 HEAD` → **cd26c653** on `m/w1-bump-migration`; `cat-file -t 14d83356` → **fatal: Not a valid object name**. `fr-PaperSidebar` M1 and GAB-13 verbatim-exact |
| **G-F7-8** | **PARTIAL ✗.** Artefact path declared, L-19-clean (a written set-difference, not a script; precedent `F-W5.md:277` §6 item 1 "G19: run the set-difference both directions" verified). But its eight-identity roster carries **four wrong ids** (D-3), so the set-difference would run against a key set F.W5 does not use |
| **G-F7-9** | **✓.** `COHESION.md:83` verbatim: *"Every census wave-sketch id (KF.W0–W10, F.W0–W10) maps to a full spec **or** a terminal kill"* |
| **G-F7-10** ⟨added⟩ | **✓ EXACT.** One hit, `hash.ts:6` *"(Merkle property)"*; `atomdiff.py:7` names the excised `lib/crud/atomdiff.ts` |
| **G-F7-11** ⟨added⟩ | **✗ REFUTED BY ITS OWN COMMAND** (D-5) |

**L-19 (proof-scripts presumed contrivance): CLEAN.** F-W7 declares no proof script anywhere. §10 explicitly demotes `npm run typecheck/test/lint` to a **tripwire** — *"a delta in any of them means the wave escaped its bounds and is itself the failure signal"* — which is the correct posture, not a contrivance. Every artefact is a markdown document.

**Paths declared to-be-created (§2a) — all four are `create` with an explicit path.** ✓ Correct discipline; `design/R4-variant-storage.md` correctly marked CONDITIONAL-on-ruling and *"never created"* on the AGAINST branch.

**Paths declared as existing immutable witness-holders — two are PHANTOM**: `docs/tranches/J/design/J-diff-shape.md` (D-9) and `docs/tranches/X/fourier/contract/**` incl. `OWNER-RULINGS-F.W5.md` (D-10).

---

## §4 — E-3 + STATUS: **CLEAN**

- `grep -n "VERIFIED" F-W7.md` → line 24 only: `| VERIFIED | **NO** | — stamped only at X·F's sub-tranche release close |`. **Zero VERIFIED stamps.**
- `**Status**: planned` (§1 line 17); `IMPLEMENTED | **NO**`; every unit's sub-gate is prospective; §6 "Close" absent by design (docs wave).
- Line 7 declares in terms: *"**EXECUTION IS NOT AUTHORIZED BY THIS FILE.** Nothing opens, writes, builds, or runs product source in either repo until the owner's begin-word. `/Users/mkbabb/Programming/fourier-analysis` is **READ-ONLY, always** — this wave writes zero fourier bytes. Specifying is not doing."*
- **The spec opened no product source.** Every fourier-side witness is `sed -n`, `git status`, `git rev-parse`, `git cat-file` — read-only, verified by re-run. Every value-side witness is `grep`/`ls`/`sed`. §2a's Do-NOT-touch list covers `fourier-analysis/**` whole-tree, all product source both repos, all 66 records, `COHESION.md`, sibling wave files, producer trees, `scripts/dev/dev.sh`, `package.json`.
- Past-tense verbs appear only about this seat's own read-only measurement, which §2a explicitly licenses (*"Read-only measurement is permitted and is the only thing this spec did"*). **No execution verb in current voice.**

---

## §5 — POSTURE AXES

| axis | verdict |
|---|---|
| **F.W1 is ONE atomic land-or-lose transaction** | **PARTIAL ✗ (D-13).** §7c states it as three limbs (producer bump + 162-site prop rewrite + copied→status triple, else four zero-console-error e2e gates go red — FR-EQR-3) and carries the FR-GIG-5 non-credit lock correctly. It omits the vaul-vue manifest gate (`F-W1.md:172` FR-EQC-7), the RE-PIN act at the adopted commit hash (`F-W1.md:60` WU-A / `:247` G1 — *"nothing below sizes before it"*), and the P0 CSS-class census (`F-W1.md:84` WU-D / G5). No limb is let land separately *by* F.W7 — it declares "NO GATING either direction" — but a three-of-six restatement of a land-or-lose transaction is exactly the shape that normalises a partial landing |
| **F.W0's pre-gates precede everything; its anchor table is what later waves quote** | **SUBSTANTIVELY ✓, POINTER ✗ (D-15).** F.W0 is declared a HARD predecessor in §1, §3a, §5e, §6 G-F7-7, §7c, §10, §11, with an explicit HALT arm. But F-W0.md now exists and publishes **G-11** — *"ONE corrected anchor table published; every later wave quotes it"* (`F-W0.md:199`), landing in `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (`:63`). F-W7 names neither, because it asserts F-W0.md does not exist |
| **SS-4 waves flag owner rulings INLINE, never presume them** | **✓ EXEMPLARY.** §4 is a standing inline OWNER RULING block with the question stated, the honest default carried verbatim and *not contradicted*, a three-branch cost table including the NO-RULING branch (*"The wave cannot open"*), ⊙ on every owner-gated row and gate, unit **b** blocked until the owner speaks, and P-10's routing honoured (*"no second ruling file"*). §1a's XOR goal criterion — *"Both is a defect. Neither is a defect"* — and *"A completed wave is not the same thing as a wave that produced a design"* are the best lines in the file |
| **F.W10's SPLIT gate stays honestly split** | **N/A here, but the edge is undeclared from both ends (D-16).** `grep -n "F\.W7" F-W10.md` → 0 hits; F-W7 §7c declares no F.W9/W10 edge, although G-F7-9's terminal disposition is precisely what `F-W10.md:105` §2.3 *"Substrate + terminal-disposition verification"* exists to verify |
| **Split-verdict discipline** | **✓.** §6's preamble — *"a gate closes for F.W7 when *this wave's* obligation is discharged; it goes GREEN only when its named owner lands the change. **F.W7 never claims a GREEN it did not execute**"* — with a GREEN-owner column naming `owner`, `F.W0`, `F.W5`, and the value.js API row separately from F.W7 itself |

---

## §6 — DEFECT REGISTER (16)

**D-1 · CRITICAL — a fabricated verbatim prohibition founds the wave's owner gate.**
§3 and §6 G-F7-1 both quote F-W5 as binding law: *"**No design byte absent G-F7-1's ruling** (F-W5 §3, verbatim and binding on this wave: **'No trie design absent G7's ruling'**)"* and *"`F-W5.md` §3 verbatim: **'No trie design absent G7's ruling'**"*.
Receipt: `grep -rn "No trie design" docs/tranches/X/` → **`F-W7.md:73` and `F-W7.md:160` only**. `F-W5.md` contains no such sentence, and has no §3 "Prohibitions" — `F-W5.md:212` `## 3. Gates — 22, all born-RED`. G-F7-1's born-RED witness and §3's whole Prohibitions block rest on a sentence that exists nowhere but this spec.

**D-2 · CRITICAL — a fabricated dissent at a blank-line anchor, cited twice as PRESERVED.**
§5a: *"**DISSENT RECORDED AND PRESERVED** (F-W10.md:106, intake CARRY): 'the trie requirement collides head-on with a standing KISS guardrail present in BOTH trees — owner ruling precedes design'; the same line names `atomdiff.py:12-14` **the incumbent**."* Re-cited at §8 as "F-W10:106".
Receipt: `sed -n '104,108p' F-W10.md` → `:105` is `### §2.3 Substrate + terminal-disposition verification (F.W0 RULES; F.W10 VERIFIES, never re-rules)`, **`:106` is a blank line**, `:107` is a table header. `grep -rn "collides head-on" docs/tranches/X/` → **`F-W7.md:115` only**. `grep -n "atomdiff" F-W10.md` → `:114`, `:261` — neither carries that text. The M-25 dissent-preservation duty is discharged against a quote that does not exist.

**D-3 · CRITICAL — anti-rename violation: four F.W5 clause ids mis-keyed, contaminating the zero-re-booking gate.**
Live `F-W5.md` §2 clause table vs F-W7's bookings:

| F-W7 books | F-W5 actual (line) | F-W5's real occupant of the id F-W7 used |
|---|---|---|
| C-25 ≡ **E12** | **E13** (`:150`) "Cache identity ⊇ consumed fields \| B-4 = C-1 ∘ C-25 / R6-8 ⊕ i-7 ⊕ m-18" | E12 (`:149`) "Debounced mirror vs synchronous save \| MISSED-E (EasingPicker save-race)" |
| C-2 ⊕ K-3 ≡ **E11** | **E17** (`:154`) "Image bounds on write ‡ \| C-2 (ContourEditorCanvas)" | E11 (`:148`) "Easing domain hoisted to the operation \| RESOLVER ⊕ L/M-3" |
| SS-C-2 ≡ **E9** | inside **E8** (`:145`) "AnimationSettings — the three-way reconciliation \| BC-9/C-6/D-20 ⊕ SS-C-2" | E9 (`:146`) "One shape, one name \| C-7 (BasisCanvas)" |
| SS-C-1 ≡ **E8** | **E7** (`:144`) "PATCH atom coverage + `set_hash` recompute \| F-β ⊕ SS-C-1 write leg" | — |

Propagates into G-F7-5's witness, **G-F7-8's eight-identity roster** (`E1, E3, E5, E8, E9, E10/B4, E11, E12`), §7c's CITED-NOT-BOOKED row, §7c's `F.W5 §E12` clause-inheritance row, and §8's exclusion list. The gate that exists to prove ∅ re-booking in both directions would run its set-difference over a key set F.W5 does not use — and would return ∅ against the wrong operand.

**D-4 · MAJOR — §5's "11 of 11, zero drops" is a miscount; the table holds 14 rows.**
`§5` heading: *"Carry — the agglomerated rows (**11 of 11**, zero drops)"*; §1: *"**11 rows** · 9 gates · 15 cross-edges … 11 of 11 rows carried"*; §1 Hard gate: *"11 conditions in §6"*.
Receipt: `sed -n '111,149p' F-W7.md | grep -cE "^\| \*\*"` → **14**. (§6 gates = 11 ✓; §7c edges = 16 = 15 + the F.W1 lock row ✓.) The fold provenance opens by claiming it *repaired* Draft A's self-counts (*"Draft A's self-counts ('10 rows · 14 cross-edges', 'four rows added') were miscounts and are repaired here"*) — and then states its own by a different wrong number. The "zero drops" assertion is the census axis's own claim and it is stated over an uncounted table.

**D-5 · MAJOR — G-F7-11's born-RED witness is refuted by re-running its own command; one "owed" reciprocal is already DECLARED.**
Witness: *"`ls $V/docs/tranches/X/fourier/waves/` → F-W2/W3/W4/W5/W8/W9/W10 + this file — **F-W0 and F-W6 do not exist**, so their reciprocals cannot yet."* Repeated in §1 and in §7c's two "owed" cells.
Receipt: `ls` returns `F-W0.md F-W1.md F-W2.md F-W3.md F-W4.md F-W5.md F-W6.md F-W7.md F-W8.md F-W9.md F-W10.md` — **11 files**, incl. F-W0.md and F-W6.md (and F-W1.md, also unlisted). `F-W6.md:182` **DECLARES the edge**: `| **F.W7** | **F.W6 must NOT pre-empt** | ⊙ G7/E16 unruled; F.W6 carries the documented default …`, and `:201` again. F-W6.md's own §1 was written at 12:20, before F-W7.md at 12:21. F.W0's reciprocal *is* genuinely owed (`grep -n "F\.W7" F-W0.md` → 0), but for a false reason.

**D-6 · MAJOR — the CARRY authority this spec is folded against does not exist for W7.**
The fold provenance (*"verified row-for-row against the CARRY authority"*), §2a (*"Reconciliation against the CARRY `boundsFiles`"*), §5 (*"11 of 11 rows carried"*), §6 (*"9 carried from the CARRY verbatim in id"*), §7c (*"all 15 CARRY edges"*), §5a (*"the CARRY (**'Both trees carry the guardrail VERBATIM'**)"*) and §5c (*"the CARRY dismissed `:126`"*) all cite a per-wave CARRY ledger.
Receipt: `find docs/tranches/X -iname "*CARRY*"` → `fourier/carry/F-W1-CARRY.md`, `fourier/carry/F-W4-CARRY.md`, `keyframes/carry/KF-W6-CARRY.md` — **nothing for W7**. `grep -c "F\.W7"` → **0** in both fourier carry files. Every count and every verbatim CARRY quotation in this spec is unauditable in tree. (Mitigation of record: F-W0/W5/W6/W8/W9 cite "the CARRY" the same way — this is a lane-wide convention, not a W7 invention. It is nonetheless unauditable and, per the trial's stated rule, a phantom.)

**D-7 · MAJOR — N-2, a ⟨NEW⟩ row this seat minted, is false in both figures, and its universal claim conceals the corpus's one true hit.**
§5a N-2 and §8: *"the six-term probe re-run over the 66 `fr-*.md` returns **60+ lines, every one of them a substring artefact**"* / *"60+ substring artefacts across the 66 records"*.
Receipt: total = **147**, not "60+". True hits = **1**, not 0 — `fr-ContourEditorCanvas.md:56` L-5 (MAJOR), which names **structural sharing** as an adjudicated cure candidate. N-2 is the concrete case G-F7-2 is built on; it is stated as a measurement and it does not reproduce.

**D-8 · MAJOR — escape: `fr-ContourEditorCanvas` L-5 is neither carried nor excluded.**
The one adjudicated row in the corpus that names R-4's own subject as a cure candidate — *"1024-point default … deep copies at 4 sites … ADJUDICATED → F.W3/W4 (cap + **structural sharing** candidate)"* — appears in no §5 row and in no §8 exclusion. Its routing is F.W3/W4, so this is not a booking error; it is a hole in §8, whose declared purpose is that *"a later reader cannot mistake absence for oversight."* It also directly qualifies the spec's own §12 framing (*"R-4 is the one census requirement with **no material on either tree**"*) — the registry already holds a structural-sharing cure candidate over a flat coordinate bag.

**D-9 · MAJOR — `J-diff-shape.md` is cited as a live immutable witness holder and does not exist.**
§2a lists *"`docs/tranches/J/design/J-diff-shape.md` (v1, IMMUTABLE) — **E-1/E-3 immutable beside the spec**; they hold the witnesses, and rewriting one destroys the evidence a gate cites."* §5c's TA-4 row makes it load-bearing for G-F7-3: *"`J-diff-shape.md §6`'s close-gate assumes **both** probes exist; value.js's cannot run."*
Receipt: `ls docs/tranches/J/design/` → `J.W1-palette-remix.md`, `WC-design-atmosphere-a11y.md`, `WC-design-layout.md`, `WC-design-motion.md`, `WC-design-typo-color.md`. `find $V -name "J-diff-shape*"` → **nothing**. (The name is real — `atomdiff.py:9` binds to it — but the document is absent from the tree.)

**D-10 · MEDIUM — `contract/**` and `OWNER-RULINGS-F.W5.md` are listed among the immutable witness-holding paths and do not exist.**
§2a: *"`docs/tranches/X/fourier/contract/**` (F.W5's, **incl. `OWNER-RULINGS-F.W5.md` — cited, never a second ruling file**)"*, inside the block asserting *"they hold the witnesses"*. Re-asserted at §4, §5a, §7c, §8 (*"`contract/OWNER-RULINGS-F.W5.md` is cited and never extended"*).
Receipt: `find docs/tranches/X/fourier -type d` → `carry`, `waves`, `conformance` — no `contract/`. `find docs -name "OWNER-RULINGS*"` → only `V/apotheosis/OWNER-RULINGS-2026-07-20.md`. F-W5 §1a declares these as **creates**; F-W7 lists them as existing. A path cannot simultaneously be "cited today" and "not yet authored" — the correct form is the one F-W7 uses for its own outputs (`create`).

**D-11 · MEDIUM — six wrong section pointers into F-W5.**
F-W7 writes *"F-W5 §4 §E16 + §5 G7 + §3 Prohibitions"* (§1 evidence + §5a), *"F-W5 §4 §E1/§E5/§E8/§E9/§E10/§E11/§E12 (home)"*, *"F-W5 §4 §E3 + §5 G4"*, and *"FR-GIG-5's lesson, adopted as the standing bar at **F-W5 §1b**"*.
Receipt: `grep -nE "^#{2,3} " F-W5.md` → `§0 State` · `§0b What this wave is NOT` · `§1 Bounds` · **`§1b Do NOT touch`** · `§2 Carry` (holds every §A–§G clause incl. all E-clauses) · `§3 Gates` · `§4 Cross-edges` · `§5 Carried by citation` · `§6 Close`. The FR-GIG-5 bar is at **§0b**: *"F.W5 claims credit for none of them — FR-GIG-5's lesson adopted as a standing bar."*

**D-12 · MEDIUM — "F-W5.md §6c" re-stamped as this seat's own fold-time read.**
§1 and §7c: *"**F-W8.md:202 re-records that F-W5.md §6c declares NO edge to F.W7**"*, inside a paragraph asserting *"every value-side and fourier-side probe in the draft was re-run read-only by this seat 2026-08-28 and every figure reproduced."*
Receipt: `F-W5.md:277` `## 6. Close (unit e checklist — all planned)` — a five-item list, no §6c. The cross-edge table is §4 (`:245`), and it does declare no F.W7 edge (verified) — so the **substance holds and the pointer is inherited stale from F-W8.md:202** while being presented as re-verified.

**D-13 · MEDIUM — F.W1's atomic transaction restated with three of its six limbs.** See §5 above. Missing: the vaul-vue manifest gate (`F-W1.md:172` FR-EQC-7 — *"the regenerated lock DROPPED `vaul-vue` (REQUIRED peer, statically imported by the root barrel, 7 edges)"*), the RE-PIN at the adopted commit hash (`F-W1.md:60` WU-A / `:247` G1 / `:273` *"nothing sizes before the tag + hash cell fills"*), and the P0 CSS-class census (`F-W1.md:84` WU-D / G5).

**D-14 · MEDIUM — the C-25 clause quoted twice as "verbatim" is not verbatim.**
F-W7 §6 G-F7-5 and §7c: *"an operation's cache identity must be a SUPERSET of the fields consumed"* — labelled *"C-25 verbatim"* and *"Clause-level inheritance, verbatim"*.
Receipt: `F-W5.md:150` reads **"SUPERSET of the *request* fields the operation consumes"**. Substantively equivalent; but a clause declared to bind *"verbatim"* must be transcribed verbatim, and its home id is E13, not E12 (D-3).

**D-15 · MINOR — the F.W0 edge names neither G-11 nor the substrate ledger.** `F-W0.md:199` publishes *"G-11 — ONE corrected anchor table published; **every later wave quotes it**"*, landing in `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (`F-W0.md:63`). F-W7 §7c and §10 refer to "the F.W0 re-grounding receipt" generically and mark the reciprocal owed on the false ground that F-W0.md does not exist (D-5).

**D-16 · MINOR — no F.W9/W10 edge, declared from either end.** §7c enumerates 15 CARRY edges + the F.W1 lock row and no F.W9/W10 row; `grep -n "F\.W7" F-W10.md` → 0. G-F7-9's XOR terminal disposition is exactly the object of `F-W10.md:105` §2.3 *"Substrate + terminal-disposition verification (F.W0 RULES; F.W10 VERIFIES, never re-rules)"*, so the edge is real and undeclared on both sides.

---

## §7 — WHAT SURVIVES INTACT (recorded so the repair does not overshoot)

1. **The routing census is honest and reproduces byte for byte** — zero fr-record rows route to F.W7; the `KF.W7` false-positive disposition is exactly right, and `fr-CanvasOverlayButton.md:64` is confirmed a table header (`| id | merged ids | claim (adjudicated, compressed) | disposition |`).
2. **Every product-source probe reproduces exactly**, both trees: `atomdiff.py:1/:7/:12-14/:38`; `visualization.py:241-245` (the five atoms, `animation_settings` fourth); `model.ts:88` (`colors: PaletteColor[]`); `hash.ts:6/:8-17`; `paletteVersion.ts:13-14/:47`; `image_storage.py:269-283`; `database.py:98`; the three git substrate probes (28 / `cd26c653` / `fatal`).
3. **N-1 is a genuine, correctly-scoped correction of the founding evidence** — the bilateral-guardrail premise really is false as stated, and the finding is correctly held to *"not that the guardrail is void"*, with the incumbent preserved.
4. **§4's inline ruling discipline is exemplary** for an SS-4 wave, including the NO-RULING branch.
5. **The no-credit posture is thorough**: §1b, §5's per-row "books ZERO", §7b, §8, G-F7-8 — F.W7 claims credit for nothing it did not author.
6. **The HALT arms are real**: F.W0 failing to re-ground halts the wave; G-F7-8 non-empty after two passes dispatches the triumvirate; the census disagreeing a third time halts.
7. **L-19 clean** — no proof scripts; the tripwire framing of `typecheck/test/lint` is correct.
8. **E-3/status clean** — zero VERIFIED stamps, planned everywhere, no product source opened, fourier read-only in every witness.

---

## §8 — TALLY

| metric | value |
|---|---|
| adjudicated row ids routing to F-W7 (**routedTotal**) | **0** |
| of those, booked by the spec (**bookedCount**) | **0** |
| escaped (**escapedCount**) | **1** — `fr-ContourEditorCanvas` L-5 |
| rows the spec carries | 14 (declared 11) |
| carried rows tracing cleanly to a banked id | 10 of 14 |
| carried rows mis-keyed against their stated F.W5 home | 4 (C-25, C-2⊕K-3, SS-C-1, SS-C-2) |
| gates | 11 declared, 11 present, all born-RED |
| gate witnesses reproducing exactly | 6 of 11 (G-F7-3/4/6/7/9/10) |
| gate witnesses partially refuted | 4 (G-F7-1/2/5/8) |
| gate witnesses fully refuted | 1 (G-F7-11) |
| fabricated verbatim quotations | 2 (D-1, D-2) |
| phantom paths cited as existing witness holders | 3 (`J-diff-shape.md`, `contract/**`, `OWNER-RULINGS-F.W5.md`) + the W7 CARRY |
| **verdict** | **DEFECTIVE** |

**Repair order** (smallest cut first): D-3 and D-11 are one mechanical re-key against live `F-W5.md`; D-5, D-12 and D-15 are one re-measurement of the now-populated `waves/` directory; D-1 and D-2 must be **struck or re-sourced** — a wave whose owner gate rests on a sentence that exists nowhere cannot be put to the owner; D-8 is one §8 row; D-4 is one count.
