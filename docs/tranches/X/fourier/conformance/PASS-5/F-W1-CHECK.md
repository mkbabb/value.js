# PASS-5 · F-W1-CHECK — fresh adversarial spec check (L-18/L-20, pass 5, post-CENSUS-FREEZE)

**Seat**: fresh, pass-5, did not author `waves/F-W1.md` and did not author any prior pass (R4-4's two-key falsifier satisfied).
**Date**: 2026-08-29.
**Subject**: `docs/tranches/X/fourier/waves/F-W1.md` — the atomic tri-package uplift.
**Operand of record (sole census)**: `conformance/CENSUS-CANONICAL.md` §2's `### F.W1 —` roster, **verbatim and entire**.
**Toolchain**: `bash` + `/usr/bin/grep` (BSD grep 2.6.0-FreeBSD) · `/usr/bin/sed` (BSD) · `/usr/bin/awk` (awk 20200816). **Every ⟨cmd⟩ in this file was run through the absolute BSD paths**, because the interactive shell aliases `grep` to `ugrep 7.8.4` (which advertises `-P:pcre2jit`) — a seat that re-runs the spec's receipts through the alias is not testing the pinned toolchain. No `-P`, no `\K`, no lookaround anywhere in this check.

**Hashes at check time** (`shasum -a 256`, first 12 hex):

| file | hash |
|---|---|
| `waves/F-W1.md` | `a1302689aaa3` |
| `conformance/CENSUS-CANONICAL.md` | `a450b8e9f80e` *(matches the spec's R4-8.3 pin)* |
| `carry/F-W1-CARRY.md` | `0d0b091e86ca` *(matches)* |
| `waves/F-W3.md` | `a89c3386f3f8` *(matches)* |
| `waves/F-W0.md` | `282f0c120cd4` *(spec pins `69b05ccbb320` — **STALE**)* |
| `waves/F-W2.md` | `578dba1fb42e` *(spec pins `6fc843820033` — **STALE**)* |
| `waves/F-W4.md` | `39e1a60b3fc9` *(spec pins `71f3b640d51e` — **STALE**)* |

---

## §0 What this check did, and the one thing it refused to do

The census axis is mechanical this round and the check ran it mechanically. It did **not** re-cut a detector, did **not** publish a rival denominator, and did **not** re-grade a record. It took the canonical's F.W1 roster whole, tested each id for BOOKING or CITATION in the spec **record-qualified**, and separately spot-audited the canonical itself against the frozen `registry/adjudicated/` bytes.

**The refusal that matters**: the spec's own §6·R4a discloses that a `grep -F` presence probe over bare id tokens "proves the *bytes are present* and does **not** prove the **(record, id) pair** is booked." This check treats that disclosure as the specification of the test it must actually run. Run naively, the presence probe **greens all 362 ids** — including ids with literally zero word-boundary occurrences in the file. That result is published below precisely so it cannot be mistaken for closure.

---

## §1 Axis 1 — the roster, booked / cited / escaped

### §1.1 The operand reproduces exactly

⟨cmd⟩ (cwd `docs/tranches/X/fourier/conformance/`)
`/usr/bin/awk '/^### F\.W1 — /{f=1;next} f&&/^### F\.W2 /{exit} f&&/^- /{print}' CENSUS-CANONICAL.md | wc -l` → **65**
⟨cmd⟩ the same awk with the parenthetical-summing END block → **362**
⟨cmd⟩ the roster command piped `| tr -cd '\140' | wc -c` → **724** ( = 362 backtick-quoted ids)

All three of the spec's §6·R4 reproduction receipts return their printed values. Further, the 65 roster lines pasted at `waves/F-W1.md:516-580` are **byte-identical** to the canonical:

⟨cmd⟩ `/usr/bin/sed -n '516,580p' waves/F-W1.md > spec-roster.txt; diff canon-fw1.txt spec-roster.txt` → **no output**. The spec's "pasted whole, byte-identical" claim is TRUE and re-verified by a non-author seat.

### §1.2 The naive probe greens — and that is the finding, not the result

⟨cmd⟩ excluding the pasted roster block (`/usr/bin/awk 'NR<516 || NR>580' waves/F-W1.md > specnr.txt`), then for each of the 362 pairs `/usr/bin/grep -Fq -- "$id" specnr.txt`:

| class | count |
|---|---|
| SPEC (present by bytes, roster paste excluded) | **362** |
| CARRY | 0 |
| NEITHER | 0 |

Published so no later seat re-earns it: **a bare-token presence probe cannot fail against this file** now that §6·R4b/§6·R4c name all 47 formerly-non-SPEC ids. The probe is retired as a closure instrument here.

### §1.3 The record-qualified run

Two discriminators were built from the canonical itself (never from a check file):

- **Homonym field.** ⟨cmd⟩ over the canonical §1 per-record tables (`/usr/bin/awk -F'|'` extracting `banked id | aliases | routing | home` for all **4269** rows): of the 362 F.W1 ids, **178 tokens are globally unique** across the corpus and **184 are ambiguous** — 41 distinct tokens recur across records (`K-1` ×6 · `R-5` ×4 · `K-8` ×4 · `C-4` ×4 · `C-11` ×4 · `i-4` ×3 · `R-4` ×3 · `R-1` ×3 · `K-5` ×3 · `D-1` ×3 · `C-13` ×3 …).
- **Record-name reach.** ⟨cmd⟩ for each of the 65 canonical records, `/usr/bin/grep -Fq -- "$record" specnr.txt`. **Six canonical records are never named anywhere in the spec body**: `fr-AdminUserList` · `fr-EquationPanel` · `fr-FrequencyGraph` · `fr-MobileFloatingToc` · `fr-PaperSearchInput` · `fr-Tooltip`.

Every ambiguous pair without a same-line record+id co-occurrence (75 pairs) was then adjudicated by hand against the spec's cell text and, where needed, against the frozen record. **Result:**

| disposition | count | basis |
|---|---|---|
| **BOOKED** (a §2/§5 cell holds the identity, attributable) | **302** | |
| **CITED** (explicit citation-to-holder dispositions of canonical F.W1 rows) | **36** | §6·R4b's CARRY class (11, verified 11 by member count) + §6·R4c's CITED class (25, verified 25) |
| **ESCAPED** (no attributable booking or citation) | **24** | enumerated at §1.4 |
| total | **362** | |

The **24 escapes are a floor, not a ceiling.** A further ~15 pairs in the `R-1` / `R-5` / `K-8` / `K-9` / `C-4` / `C-6` / `C-11` / `K-5` / `F-1` / `F-3` families have exactly one plausible spec occurrence shared between two or three canonical records; at most one of each set can be the booked identity, and the spec record-qualifies none of them. They are declared here as an unresolved tail rather than counted, because counting them would require re-grading the records — which is not this seat's act.

### §1.4 The 24 escapes, named

Each is a canonical F.W1 row (`CENSUS-CANONICAL.md` §2) with **no attributable booking or citation** in `waves/F-W1.md`.

| # | escaped id | why the spec's byte-match does not book it |
|---|---|---|
| 1 | `fr-AdminAuditLog S-4` | **Zero word-boundary occurrences.** ⟨cmd⟩ `/usr/bin/grep -oE '[^A-Za-z0-9-]S-4[^0-9]' specnr.txt` → **∅**. Every `S-4` byte-match in the file is the interior of `SS-4`. Registry bytes (`fr-AdminAuditLog.md:122`): the `./pagination` retirement measured at "4.0.0's 80 keys AND 7.0.0's 66-at-re-measure … (the fact F.W1 needs)". The spec's `AA-11` cell paraphrases the same mechanism and books a different identity — the anti-rename defect M-25 names. |
| 2 | `fr-AdminFlaggedPanel FR-AFP-2` | Single occurrence, inside WU-C's ellipsis *"`FR-AFP-2 … fr-EasingCurvePreview` is prose, **never the roster**"*, with the roster declared to be §6·R1 — which does not contain it (see D-6). Registry (`fr-AdminFlaggedPanel.md:45`) routes it **F.W1** with the directive *"book only this file's nine prop sites"*; its own kill row calls the under-sizing *"the corpus's most consequential error (would under-size F.W1)"*. |
| 3 | `fr-AdminFlaggedPanel K1` | Single word-boundary occurrence in the whole spec: G4's *"two banked rulings contradict (`fr-PaperSearch K1` vs PSM-24/R-3)"* — a **different record's** K1, and one the canonical does not home at F.W1 at all (`fr-PaperSearch` (1): `MISS-A6`). |
| 4 | `fr-MobileFloatingToc F-1` | Record never named. The file's one `F-1` is WU-L's *"the ERESOLVE is the uncommitted M.W1a bump (F-1(i))"*, a third sense. Registry (`:45`): F-1 ≡ the stale-`web/dist` emission hinge, *"→ F.W1 pre-gate"* — G4's own subject, carried as a mechanism and not as an identity. |
| 5 | `fr-MobileFloatingToc i-4` | Same record, never named. Every `i-4` in the spec is record-qualified to `fr-BasisSelector` (G4, §2·R2b.6) — correctly, and to the exclusion of this row. Registry (`:92`): *"→ **F.W1 pre-gate rider (F-1)**"*. |
| 6 | `fr-EquationPanel D-14` | Record never named. The spec's `D-14` homonym-disarm names exactly two senses (WU-I's MPC `var()`-fallback row and `fr-PaperSearch D-14`) and the canonical homes a **third** here. Registry (`:48`): *"D-14+D-L18 (Metric drops `color` + the pill plate at 8.0.0) — F.W1"* — the mechanism is at WU-H's `D·D-M10`, the identity nowhere. |
| 7 | `fr-EditorControlsDock R-8` | All three `R-8` occurrences are the PASS-1 **ruling** id (*"R-8's canonical citation form"*, *"Canonical citation form per R-8"*). Registry (`:29`): R-8 is the `VIZ_COLORS → #888888` fold. Mechanism carried at WU-E; identity absent. |
| 8 | `fr-PaperArticleWindow R-9` | Occurrences are `R-9.1` (ruling) and `fr-CanvasControlsDock R-9/K-9` — a spelling the canonical does not home at F.W1 (`fr-CanvasControlsDock` (7) carries no `R-9`). |
| 9 | `fr-BasisSelector R-6` | The file's one `R-6` is `fr-App R-6` (§6·R4c) — and `fr-App` (15) carries no `R-6` in the canonical. |
| 10 | `fr-GalleryView R-6` | Same single occurrence; two canonical rows, one non-canonical spelling. |
| 11 | `fr-App R-4` | Every `R-4` is a RULINGS-1 token (`R-4 sibling`, `R-4a`, `R-4b`). |
| 12 | `fr-GalleryDraftsSection R-4` | As above. |
| 13 | `fr-BasisCanvas R-2` | Every `R-2` is a ruling token (`R-2a`/`R-2c`/*"R-2's partition law"*). |
| 14 | `fr-GalleryInfiniteGrid R-2` | As above. |
| 15 | `fr-AppHeader S-8` | Single occurrence is G20's detector clause *"prose routing walked back to its enclosing row id (S-8)"* — a detector-axis label, not this record's superlative row. |
| 16 | `fr-DarkModeToggle C-3` | The spec's `C-3` is WU-L's cva/clsx/reka-ui manifest row, which the registry attributes to `fr-PaperSearchInput C-3` (`:46`, *"Route F.W1"*). |
| 17 | `fr-EditorControlsDock L-2` | The spec's `L-2` is WU-M's pencil-boil empty-loop rAF row = `fr-SvgFilters L-2`. |
| 18 | `fr-CoefficientsSpectrum i-4` | See #5 — every `i-4` is record-qualified to `fr-BasisSelector`. |
| 19 | `fr-PaperSearchInput C-8` | Every `C-8` is WU-L's `C-1 = C-8` peer-graph identity. Registry (`:74`): this C-8 is *"MINOR, FOLD → banked PSM-33 … rides the F.W1 rename ×35"* — and `PSM-33` appears only inside §6·R1, which R4-3.4 struck as an operand. |
| 20 | `fr-AdminUserList FR-AUL-53` | Single occurrence inside WU-N's ellipsis, self-disclaimed *"is prose, never the roster"* → §6·R1, which omits it. Registry (`:96`): eight `lucide-vue-next` imports, home **F.W1**. |
| 21 | `fr-ImageUpload F8` | ⟨cmd⟩ `/usr/bin/grep -oE 'F8[^0-9]' specnr.txt` → **6 hits, all `F8-`** (i.e. `F8-REACH-01+02`, an F.W0 id). The homonym is never disarmed; the fold target (`fr-ContourPreview` row 23) *is* carried, which is what keeps this MINOR. |
| 22 | `fr-AnimationControls R-14` | Every `R-14` in the file is `fr-SliderControl R-14` — itself a leg, see D-9. |
| 23 | `fr-GlassTimeline C-18` | Every `C-18` byte-match is the interior of `C-18.2` (`fr-FourierShapeExtractor`'s pencil-boil row). |
| 24 | `fr-EquationView vue-tsc` | Filed as a **canonical** defect (C-2 below) and counted here only because R4-10 makes the canonical the sole operand: the token cannot be booked as an identity because it is not one. |

---

## §2 Axis 2 — receipt reality (BSD toolchain, ≥10 samples)

**Forbidden-construct sweep first.** ⟨cmd⟩ `/usr/bin/grep -c -- 'grep -P\|grep -rP\|grep -oP\|\\K\|(?=\|(?!' F-W1.md` → **0**. No `-P`, no `\K`, no lookaround, no over-long interval. **R4-2.1–2 holds.**

**Twenty-nine receipts re-run.** Twenty-seven reproduce exactly; two do not.

### §2.1 Reproduced (27)

| # | ⟨cmd⟩ (base) | printed | re-run |
|---|---|---|---|
| 1 | G20/§6·R4 roster `awk` (conformance/) | 65 lines | **65, byte-identical** |
| 2 | §6·R4 parenthetical sum `awk` | 362 | **362** |
| 3 | §6·R4 backtick count `tr -cd '\140' \| wc -c` | 724 | **724** |
| 4 | G20 arm (i) `grep -lE 'F[.·–-]W[0-9]*/?W?1([^0-9]\|$)' fr-*.md \| wc -l` (`$R`) | 66 | **66** |
| 5 | G20 arm (i) `grep -hE … \| wc -l` (`$R`) | 681 | **681** |
| 6 | G5 `grep -c 'btn-pill' styles/components.css glass-ui.css` (glass dist) | 0 / 0 | **0 / 0** |
| 7 | G5 `grep -rln 'btn-pill' … \| wc -l` (`$F`) | 8 | **8** |
| 8 | G19/§2·R2d `grep -rn 'variant="outline"' web/src \| wc -l` | 30 | **30** |
| 9 | §2·R2d `grep -rln 'variant="outline"' web/src \| wc -l` | 16 | **16** |
| 10 | §2·R2d `grep -rn 'variant="ghost"' web/src \| wc -l` | 49 | **49** |
| 11 | §2·R2b.1 `grep -rn 'variant="default"' web/src \| wc -l` | 4 | **4** |
| 12 | §2·R2b.1 `grep -rn 'variant="solid"' web/src \| wc -l` | 0 | **0** (measured negative kept) |
| 13 | §2·R2b.1 `grep -rnE 'emphasis\|ButtonEmphasis\|iconOnly' web/src \| wc -l` | 0 | **0** |
| 14 | G6 `sed -n '102p' scripts/e2e.sh` | `    npx --prefix web vite web --port "$WEB_PORT" --strictPort &` | **exact** |
| 15–20 | G10's six pipe-free `grep -n` on both twins | `:55` · `:61/:64/:69` · `:66` — `:362`+`:425` · `:365/:368/:373` · `:370` | **all six exact, including the disclosed second `overflow: hidden` at `:425`** |
| 21 | §2·R3a `git show v7.0.0:…/a11y-overrides.css \| grep -c 'pointer: coarse'` (`$P`) | 2 | **2** |
| 22 | §2·R3a `… \| sed -n '135,138p'` | `@utility touch-hit-area {` … `@media (pointer: coarse) {` | **exact** |
| 23 | §2·R3d `git grep -l 'valueText' v7.0.0 -- src` | ∅ | **∅ (exit 1)** |
| 24 | §2·R3d `git grep -n 'valueText' v8.0.0 -- …/Slider.vue` | `:49` · `:369` | **exact** |
| 25 | §2·R3d `git grep -l 'controlLabelable' v7.0.0 v8.0.0 -- src` | 4 paths | **exact 4** |
| 26 | G1 `grep -o 'SUBSTRATE-LEDGER\.md.\{4\}\*\*create\*\*' F-W0.md` | `` SUBSTRATE-LEDGER.md` \| **create** `` | **exact** *(despite F-W0's stale hash)* |
| 27 | §E-3·R4's pipe-free `awk` ragged-table sweep over `F-W1.md` | NO OUTPUT | **NO OUTPUT** (tables render; the sweep is genuinely runnable) |

Additionally the **11 cross-sibling quotation receipts** (§2·R2a.2's `CP-ROW-` set → `CP-ROW-` ⊕ `CP-ROW-40`; §2·R2b.2's two F-W2 spans; §2·R2b.4's `GM-19 is never certified`; §2·R2b.5's and §2·R2b.7's F-W10 spans; §2·R3b's two F-W2 spans; §2·R3-1's three F-W3 spans) and the **19 frozen-corpus `grep -o`/`sed -n` receipts** at §2·R2a/b, §2·R3a/d and §2·R4a/b **all reproduce**. The `-P`-free, pipe-escaped idiom the round-4 seat adopted survives being pasted out of its table cells — verified by pasting, not by assertion.

### §2.2 Did NOT reproduce (2) — both convict

**R-1 · `waves/F-W1.md:188` (WU-N, the lucide budget of record).** The cell publishes ⟨cmd⟩ `grep -rn "lucide-vue-next" src/ | wc -l` → **35**.

⟨cmd⟩ (cwd `$F` = `/Users/mkbabb/Programming/fourier-analysis`, the round-4 declared product base) `/usr/bin/grep -rn "lucide-vue-next" src/ | wc -l` → **0**, exit 1.
⟨cmd⟩ (same base) `/usr/bin/grep -rn "lucide-vue-next" web/src | wc -l` → **35**.
⟨cmd⟩ `ls -d $F/src` → `/Users/mkbabb/Programming/fourier-analysis/src` — **the directory exists**.

This is worse than an unrunnable command. `$F/src` is a *real but different* tree, so the receipt **resolves silently and returns a wrong-but-plausible zero** instead of erroring. It fails R4-2.4 (*one command, one base*) — the base under which it produces 35 is `$F/web`, which §2·R4's receipt-base block does not declare — and it is the same class the round-4 purge seat cured at §2·R2a.3 for a different receipt while leaving this one standing. The figure it certifies is the **35-site lucide rename**, a named limb of the twelve-limb atomic transaction (§4 step 4) and a §1 bounds line.

**R-2 · `waves/F-W1.md:400` (§2·R3's opening note).** The note publishes ⟨cmd⟩ `grep -l 'K-24' waves/*.md carry/*.md` → **"`waves/F-W2.md` alone"**.

⟨cmd⟩ (cwd `$X` = `docs/tranches/X/fourier/`) `/usr/bin/grep -l 'K-24' waves/*.md carry/*.md` → `waves/F-W1.md` **and** `waves/F-W2.md`.

The round that pasted "alone" is the round that added the second member (§2·R3b, thirteen lines below, which publishes the correct two-member set and even annotates *"disclosed not trimmed: `waves/F-W1.md` is THIS ROW"*). The file therefore carries, side by side, a receipt asserting a one-member set and a receipt proving a two-member set. This is **byte-for-byte the PASS-3 D-2 class** — a self-descriptive receipt falsified by its own round — which `§E-3·R3` row 2 minutes as cured and R3-3.10 claims to have killed by outlawing the shape. The shape survived: `grep -l` is set-membership, which R3-3.10 *permits*, and the defect is in the **prose gloss** ("alone") that freezes the set's cardinality. R3-3.10 killed the count; it did not kill the count word.

---

## §3 Axis 3 — M-25 depth (locks by banked id, aliases beside heads)

**Strong where round 4 wrote it.** Every §2·R4a/b row carries a banked head with its aliases beside it — `fr-GalleryMarquee GM-6 (= D-11)` · `fr-FullscreenViewer FV-24 (= D-20)` · `fr-FourierShapeExtractor L·S-1 (aliases D·S-1 · C·S-1)` · `fr-GalleryInfiniteGrid FR-GIG-3 (= D-6 / C-12)` · `fr-FourierMorphDemo FMD-12 (= D-13)` — and each is record-qualified. Cross-checked against the canonical §1 alias column: **no alias mangle found in the round-4 rows.**

**Locks carry their banked ids.** B-1's disclosure LOCK (re-cut at R4-4.1), G10's twin lock, MPC-31's ONE-CUT LAW (carried as its bytes with a ⟨cmd⟩), KILL-6, LAW-3 (restored to `WITH-or-AFTER` with PAW-30 named), the PIN-LAW (`CP-ROW-29` ≡ `fr-ContourPreview` row 29), FR-GIG-5's NON-CREDIT LOCK, WU-K's EXECUTION LOCK, HLG-41's ORDERING EDICT, D/M-8's witness-ordering lock. **All ten name a banked id; none is prose-only.** G10's twin lock in particular now states the DEFECT's scope symmetrically on both twins rather than a file-shaped span, and the six re-measurements pasted at the gate all reproduce (§2.1 rows 15–20). This axis HOLDS.

**Weak in §2 proper.** WU-A..WU-S carry compound heads that fuse banked ids with aliases and with other records' ids without record-qualification: `D-1/BC-1/C-1`, `D-2/BC-5/C-3`, `L-7 · m-9 · M-β6 · M-α5`, `PAW-33 / C-19 / MF-12 / C-15+C-16 / C-13`, `FR-AFP-19 / FR-AFP-20 / FR-AFP-27 / FR-AFP-44 / M-6`. The spec's own R-5 law (*"an unqualified `D-M3` is not an identity"*) is applied to exactly two tokens (`D-M3`, `i-4`) and to no others, while the canonical shows **41 tokens recurring across records** inside this wave's own roster. Eleven of the twenty-four escapes at §1.4 are a direct consequence.

**One qualified-identity gap worth naming on its own**: WU-C's `D-M3` — *the Button budget of record, 87 / 36 / 35* — is disarmed only against `fr-ExportModal D-M3`. It is `fr-PaperSearchInput D-M3` (registry `:51`, *"Adjudicated blast radius: 87 template `variant=` sites · 36 `size="icon"` · 35 files … Route F.W1"*), and the spec never says so. The wave's single most-cited figure sits under an unqualified token in a file that legislates against unqualified tokens.

---

## §4 Axis 4 — gates

| test | result |
|---|---|
| G20 leg (b) LHS = canonical operand only | **PASS** — the LHS is `CENSUS-CANONICAL.md` §2's F.W1 roster, hash-pinned, and the pasted copy is byte-identical (§1.1). The round-3 inline detector is retained as *the derivation the canonical applied*, not re-cut per run. |
| G20 leg (a) LHS = the CARRY's 105 row ids | **PASS** — not the `fr-NAME:LINE` anchor family (§E-3·R1 records why). |
| No gate cites a check file as an operand | **PASS** — PASS-1 §2 and PASS-2 §4 survive only as named prior runs; §6·R1 is struck as an operand at R4-3.4. |
| Portable commands (R4-2) | **PASS** on the flag law; **FAIL** on R4-2.4 at one site (§2.2 R-1). |
| Reachable GREEN | **PASS** — every gate's condition is an artefact that can come to exist (a close report, an adopted hash, a build, a ruling). G15's three legs and G19's seven rulings are owner/execution acts, not authoring acts; no gate is satisfiable by this file's prose. |
| Born-RED with a named witness | **PASS** — all twenty; G15 and G20 were re-cut at round 1 and the verification verb struck. |
| **G20's claim surface is complete** | **FAIL** — see D-12. |

---

## §5 Axis 5 — posture

| item | result | receipt |
|---|---|---|
| F.W1 transaction whole | **PASS** | ⟨cmd⟩ `grep -o 'The roster is TWELVE limbs and stays twelve'` → returns. The `:276` pin holds; the G5 landing cell is a limb's resolution, not a thirteenth limb. |
| W7 ∅ closed | **PASS** | ⟨cmd⟩ `grep -c 'F\.W7' F-W1.md` → **0**. The canonical's own §0.1 verifies no record routes F.W7 corpus-wide; the spec asserts nothing against it. |
| SS-4 flags | **PASS** | cross-edge 10 declares the NON-edge and hands SS-4's inline rulings to SS-4's own spec. |
| Tree READ-ONLY | **PASS** | §State's execution gate and §E-3·R4's attestation; this check opened no file for write in any of the four trees. |
| `Status: planned` | **PASS** | `:8`. |
| Zero VERIFIED | **PASS** | `:21` `VERIFIED \| NO`. The one `flips GREEN` byte-match is inside §E-3·R1's erratum **striking** that wording. |
| RULINGS-4 applied | **PARTIAL** | R4-4.1 (G10 revocation) · R4-6.1 (`./easing` qualification) · R4-3.4 (§6·R1 re-base) · R4-2 (portable commands) · R4-8.3 (hash pins) all landed and re-verified here. **R4-10's own duty line for this wave — *"book/cite all 362 incl. the R4-6 legs at their holders"* — is not met in either direction** (24 escapes; ≥11 legs booked rather than cited). |

---

## §6 Spot-audit of the CANONICAL against `registry/adjudicated/` bytes

Nine records sampled (five required). **Seven confirm the canonical.** Two convict it. *A canonical error is filed against the canonical and is not the spec's defect.*

**Confirmed:** `fr-MobileFloatingToc F-1`/`i-4` (`:45`/`:92`, both *"→ F.W1 pre-gate"*) · `fr-EquationPanel D-14` (`:48`, *"— F.W1"*) · `fr-Tooltip FR-TT-24` (`:58`, *"→ **F.W3** (framing) **+ F.W1** (break-surface note)"* ⇒ canonical home F.W3 legs F.W1, correct) · `fr-AdminUserList FR-AUL-53` (`:96`, home **F.W1**) · `fr-PaperSearchInput C-3`/`C-8`/`D-M3` (`:46`/`:74`/`:51`, all *"F.W1"*) · `fr-FrequencyGraph K-1` (`:84`, the version-lying-window relay) · `fr-AdminFlaggedPanel FR-AFP-2` (`:45`, home F.W1).

**C-1 — CANONICAL ERROR, MAJOR. `fr-ImageUpload D:M-3` is mis-homed at F.W1.**
Canonical §1 row: `` `D:M-3` | `C:C-9` | `F.W1` · `F.W3/W4` | **F.W1** <sub>legs: F.W3/W4</sub> ``.
Registry bytes, ⟨cmd⟩ `/usr/bin/grep -n 'D:M-3' fr-ImageUpload.md` → `:38` — *"`./progress` … is exported at the **installed 4.0.0 pin** — my node read. **NOT an F.W1 item (K-12).** → **F.W3/W4** (adopt `glass-ui/progress`; also closes roster 24)."*
The row's **only arrow names `F.W3/W4`**; the `F.W1` token appears solely inside an express **negation**. Canonical §0.1's HOME rule is explicit — *"the home is the first wave token its own **arrow** names"* — so the derivation took a positional first token over an arrow-named one and inverted a record's stated negative into a home. This is precisely §0.3's divergence class 2 (*"Home inversions against §0.1's first-arrow rule"*); the round-4 hostile re-derivation covered ten records and `fr-ImageUpload` was not among them. **Consequence**: the F.W1 roster is inflated by one row, and `waves/F-W1.md` §6·R4c — which quotes the record correctly (*"the record's own verdict is 'NOT an F.W1 item (K-12) → F.W3/W4'"*) and then cites it anyway because the canonical homes it — is **right about the record and obedient to a wrong operand**. Amend by ruling per R4-10's amendment clause; the spec is not at fault here.

**C-2 — CANONICAL ERROR, MINOR. `fr-EquationView vue-tsc` is a manufactured identity.**
Registry bytes, ⟨cmd⟩ `/usr/bin/grep -nE '(^|[^A-Za-z0-9-])vue-tsc([^A-Za-z0-9-]|$)' fr-EquationView.md` → `:179` — the head is *"**`vue-tsc -b` fallthrough admission of `variant="glass"` at the uplift** — decide by a scratch typecheck at F.W1"*. The canonical atomised the **first token of a prose head** into a banked id. `vue-tsc` is not id-shaped under §0.1's own separator semantics, and this is §0.3's divergence class 1 (*"axis-stripped / manufactured identities"*) — again in a record the round-4 re-derivation did not cover. It also makes the roster untestable at that row: `vue-tsc` occurs four times in `F-W1.md` as a **tool name**, so any presence probe greens it for free.

---

## §7 Defects, worst first

| # | severity | defect | receipt |
|---|---|---|---|
| D-1 | **MAJOR** | **24 canonical F.W1 rows ESCAPE** — no attributable booking or citation. R4-10: *"an id absent from both booking and citation is that wave's escape."* Eleven of the twenty-four are greened only by tokens from the **RULINGS namespace** (`R-2a`, `R-4 sibling`, `R-5`, `R-8`, `R-9.1`) or by another record's homonym. | §1.4 table; ⟨cmd⟩ `/usr/bin/grep -oE '[^A-Za-z0-9-]S-4[^0-9]' specnr.txt` → ∅ |
| D-2 | **MAJOR** | **The `R-n` collision class is undisarmed.** The spec's own ruling ids occupy `R-1..R-10`, the same namespace as 13 canonical F.W1 rows across 11 records. The spec disarms `D-M3` and `i-4` by name and leaves this entire family unqualified — and it is the family that supplies escapes #7–#15. | `fr-EditorControlsDock R-8` vs *"canonical citation form, R-8"*; `fr-PaperArticleWindow R-9` vs *"R-9.1, the one-line form"* |
| D-3 | **MAJOR** | **A receipt that resolves to the wrong tree and returns a plausible wrong answer.** `F-W1.md:188`'s `grep -rn "lucide-vue-next" src/ \| wc -l` → 35 returns **0** at the declared base `$F`, because `$F/src` exists and is a different tree. Violates R4-2.4. Certifies the 35-site lucide limb of the atomic transaction. | §2.2 R-1 |
| D-4 | **MAJOR** | **A self-invalidating banked receipt survives into pass 5.** `F-W1.md:400`'s `grep -l 'K-24' …` → *"`waves/F-W2.md` **alone**"* now returns two members, and §2·R3b thirteen lines later publishes the two-member set. Byte-for-byte the PASS-3 D-2 class that §E-3·R3 minutes as cured: R3-3.10 outlawed the count, not the count **word**. | §2.2 R-2 |
| D-5 | **MAJOR** | **Fabrication: `FR-IC-17` is booked while the canonical homes it TERMINAL (∅).** R4-10: TERMINAL/UNROUTED ids *"are NOT wave debts"*; §2·R1a books it as a DISCHARGE REGISTER row and §2·R2a.1 re-denominates the register around it. | ⟨cmd⟩ canonical §1 `fr-InfoCard \| FR-IC-17` → `**TERMINAL (∅)**` |
| D-6 | **MAJOR** | **Five §2 cells route their fold rosters to §6·R1, which names none of the six endpoints they spell.** WU-C (`FR-AFP-2 … fr-EasingCurvePreview`), WU-E (`fr-App B-1 … fr-GalleryView C·C-1`), WU-I, WU-L, WU-N (`FR-AUL-53 … fr-ImageUpload`) each say *"the elided ids are NAMED … see §6·R1"*; **zero of the six named endpoints appear in §6·R1's 42.** R4-3.4 struck §6·R1 as an operand and re-based the roster to §6·R4 — and left all five in-body pointers aimed at the struck section. | `F-W1.md:75/95/141/171/188` vs `:506` |
| D-7 | **MAJOR** | **Fabrication ×3: `fr-PaperSearch D-14 · D-15 · D-17` booked at §2·R1a as *"Three token limbs of the F.W1 re-ink"* while the canonical homes all three UNROUTED.** Same clause as D-5. | canonical §1 `fr-PaperSearch` → three `**UNROUTED**` rows |
| D-8 | **MAJOR** | **G20's claim surface excludes round 4.** `:266` reads *"§6 + §6·R1 + §2·R1 + §2·R2 + **§2·R3** are the claim the run tests"*, and `:500`'s closing sentence names *"repair rounds 1, 2 and 3"*. **§2·R4 and §6·R4 — the round's eleven bookings, four citations and the entire canonical roster — are outside the claim the gate tests.** The one gate that could catch a round-4 escape is pointed away from round 4's own work. | `F-W1.md:266`, `:500` |
| D-9 | **MAJOR** | **Legs booked as rows, against R4-10's second clause and against this spec's own round-4 practice.** `fr-Tooltip FR-TT-24` (canonical **F.W3** legs F.W1) is booked inside WU-F's `FR-TT-5/-6/-9/-14/-24` **and** in §6's roster. Same shape: `fr-SliderControl R-14` (F.W3), `fr-EquationView M-TL` and `D·D-M3` (F.W4), `fr-CanvasOverlayButton FR-COB-28` (F.W0), `fr-CoefficientsPanel FR-CP-33` (F.W3), `fr-BasisSelector m-6` · `fr-CollapsibleSection m-7` · `fr-NotationPills FR-NP-6` (F.W3). §2·R4a **cited** two structurally identical legs to their holders *with hashes* in the same round — the law was applied to the four PASS-4 escapes and never swept back over §2·R1–R3. | canonical §1 home column for each; §2·R4a's PP-NOSHADOW/D-03 rows as the contrast |
| D-10 | **MAJOR** | **CANONICAL ERROR — `fr-ImageUpload D:M-3` homed F.W1 against the record's express *"NOT an F.W1 item (K-12) → F.W3/W4"*,** inverting canonical §0.1's own first-arrow HOME rule. Filed against `CENSUS-CANONICAL.md`, not the spec; amend by ruling. Roster inflated by one. | §6 C-1 |
| D-11 | **MINOR** | **Three of six R4-8.3 sibling hash pins are stale** (`F-W0` `69b05ccbb320`→`282f0c120cd4`; `F-W2` `6fc843820033`→`578dba1fb42e`; `F-W4` `71f3b640d51e`→`39e1a60b3fc9`). All eleven quotations pinned to them still reproduce, so the mechanism worked as designed — but the pins now assert a state that no longer holds, and a later seat reading them as current inherits exactly the F-W8-167 class the rider was built to kill. | §0 hash table; §2.1's eleven cross-sibling re-runs |
| D-12 | **MINOR** | **R4-8.3's hash list omits `F-W10.md`** while §2·R2b.5 and §2·R2b.7 both quote it. The claim *"Every cross-file quotation this spec carries … is pinned to these hashes"* is false for two live quotations. | `F-W1.md:437` vs `:375`/`:377` |
| D-13 | **MINOR** | **CANONICAL ERROR — `fr-EquationView vue-tsc` is a manufactured identity** atomised from a prose head's first token; it is also untestable, since `vue-tsc` occurs four times in the spec as a tool name. | §6 C-2 |
| D-14 | **MINOR** | **The budget of record sits under an unqualified token.** WU-C's `D-M3` (87/36/35) is `fr-PaperSearchInput D-M3`; the HOMONYM-DISARMED cell names only `fr-ExportModal D-M3` and never its own record — in a file whose R-5 law says an unqualified `D-M3` is not an identity. | registry `fr-PaperSearchInput.md:51`; `F-W1.md:77` |
| D-15 | **MINOR** | **Six canonical records are never named in the spec body**: `fr-AdminUserList` · `fr-EquationPanel` · `fr-FrequencyGraph` · `fr-MobileFloatingToc` · `fr-PaperSearchInput` · `fr-Tooltip`. Four of the twenty-four escapes are theirs, and the roster line for `fr-MobileFloatingToc` is unhomed **entire**. | ⟨cmd⟩ per-record `grep -Fq` over `specnr.txt` |
| D-16 | **MINOR** | **An unresolved homonym tail of ~15 further pairs** (`R-1` ×3, `R-5` ×4, `K-8` ×4, `K-9` ×2, `C-4` ×4, `C-6` ×2, `C-11` ×4, `K-5` ×3, `F-1` ×2, `F-3` ×2) where one spec occurrence is shared between two or three canonical records and none is record-qualified. Declared, not counted — resolving them requires re-grading records, which is not a check seat's act. | §1.3 |
| D-17 | **MINOR** | **The presence probe published at §6·R4a is now structurally incapable of failing.** Re-run at the settled bytes with the pasted roster excluded, it returns **SPEC 362 · CARRY 0 · NEITHER 0**, because §6·R4b/c name every formerly-non-SPEC id. The spec discloses the probe's limit honestly; it does not disclose that the limit has become total. | §1.2 |
| D-18 | **INFO** | **G7's reconciliation set is stated as SIX figures but the canonical's own budget row supplies a seventh reading** — `fr-PaperSearchInput D-M3`'s *"+9/+2 comment-resident, +17 non-Button"* is carried at `D-M3` and at `FR-COB-2` with different groupings. Not a contradiction; a counting-unit that G7's *"state the counting unit beside every figure"* law would have it spell. | registry `fr-PaperSearchInput.md:22`/`:51` |
| D-19 | **INFO** | **`fr-ImageUpload F8` collides with `F8-REACH-01+02`** (an F.W0 id the spec uses six times) and the collision is never disarmed. The fold target (`fr-ContourPreview` row 23) *is* carried at WU-F, which is why this stays INFO rather than joining D-1's MAJOR core. | ⟨cmd⟩ `/usr/bin/grep -oE 'F8[^0-9]' specnr.txt` → 6 × `F8-` |
| D-20 | **INFO** | **`fr-AdminAuditLog S-4`'s export-key figures disagree with WU-G's.** S-4 measures *"4.0.0's 80 keys AND 7.0.0's **66**-at-re-measure"*; WU-G's Census FE cell states *"**80** @ 4.0.0 · **74** @ v7 TAG · **70** @ 8.0.0"*. Both are the corpus's own; neither is reconciled, and the row that carries the dissenting figure is escape #1 — so the disagreement is invisible to the spec. | registry `fr-AdminAuditLog.md:122`; `F-W1.md:123` |

---

## §8 What VERIFIED CLEAN

Recorded so the next round does not re-earn it, and so the convictions above are read at their true weight.

1. **The census freeze works.** The operand is hash-stable (`a450b8e9f80e`, matching the spec's pin), reproduces to the byte, and the spec's pasted copy is byte-identical. Four passes of oscillating denominators (357 → 404 → 430) end here. G20 leg (b)'s LHS is finally an artefact and not a per-run derivation.
2. **Receipt reality is strong.** 27 of 29 sampled ⟨cmd⟩s reproduce exactly on the pinned BSD toolchain, including all nineteen frozen-corpus receipts, all eleven cross-sibling quotations (three against *stale-hashed* siblings — the words did not move), all six G10 twin re-measurements, all six producer `git` reads, and the pipe-free `awk` ragged-table sweep. **Zero `-P`, zero `\K`, zero lookaround.**
3. **R4-4.1's G10 revocation is sound at the product bytes.** The twins' five landmarks re-measure exactly as the gate prints them, including the disclosed second `overflow: hidden` at `ContourSettings.vue:425` that makes a bare class-free range unsafe. The manufactured-by-a-cure defect of pass 4 is genuinely closed, symmetrically, on both twins.
4. **R4-6.1's `./easing` package-qualification is real and correct.** `@mkbabb/value.js/easing` and `glass-ui@v7.0.0`'s `./easing` are both live at the target and the installed 4.0.0 producer exports neither — G12's subject is now unambiguous.
5. **M-25 depth holds in the round-4 rows.** Eleven bookings, four citations, aliases beside every head, no alias mangle against the canonical's alias column.
6. **Posture is clean.** `planned`; VERIFIED = NO; no green stamp anywhere (the one `flips GREEN` match is inside the erratum that strikes it); no F.W7 assertion; SS-4's inline rulings left to SS-4; all four trees READ-ONLY.
7. **The count words check out.** §6·R4b = 11 members. §6·R4c = 11 BOOKED + 25 CITED = 36. 315 + 11 + 36 = 362. §6·R1 = 42 (45 `·` separators less the three interior `·` in `D·D-2`, `L·I-1`, `C·I-1`). No count word in this file contradicts the list beside it.

---

## §9 Verdict

**DEFECTIVE.**

The wave is not defective in its *engineering* — the gates are born-RED with real witnesses, the locks carry their banked ids, the receipts run, and the round-4 repairs are sound where they land. It is defective in the one axis the census freeze exists to close: **R4-10 was applied forward and never backward.** The four PASS-4 escapes were disposed against the canonical with exemplary discipline — booked when the canonical homes them, cited to a named holder with a hash when it does not — and that same law was never run over the file's own §2·R1, §2·R2 and §2·R3 bookings, nor over the roster the canonical actually publishes. The result is a two-sided failure of exactly the shape R4-10 predicts: **24 escapes** on one side, **≥11 legs and 4 non-debts booked as rows** on the other, and a gate (G20) whose declared claim surface stops one round short of the work that would have caught either.

One further finding is filed against the operand and not the wave: the canonical homes `fr-ImageUpload D:M-3` at F.W1 over the record's express refusal, inverting the canonical's own first-arrow rule. `waves/F-W1.md` quotes that record correctly and cites it anyway, because the canonical is the law — which is the correct behaviour under R4-10 and the reason the amendment must come by ruling.

| metric | value |
|---|---|
| roster size (canonical F.W1) | **362** |
| booked | **302** |
| cited | **36** |
| escaped | **24** *(floor; ~15 further pairs unresolved at D-16)* |
| receipts re-run | **29** (27 reproduce · 2 convict) |
| canonical errors filed against the canonical | **2** |
| verdict | **DEFECTIVE** |

*No verification verb is stamped in this file. This is a check, not a close.*
