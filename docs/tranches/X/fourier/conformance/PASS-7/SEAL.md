# X·F PASS 7 — THE SEAL. VERIFY-ONLY, ZERO EDITS.

**Seat**: X·F round 7 seal seat, 2026-08-29. **Mandate**: verify the round-7 reconcile at the bytes and write this file. **This seat edited nothing** — not a wave, not the canonical, not the certificate, not a prior pass instrument. Every figure below is a command re-run, and every command is published so a successor can falsify it rather than trust it.

**Toolchain**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, absolute `/usr/bin/grep` throughout (the interactive `grep` in this shell is a `ugrep` function and is **not** the instrument), BSD `awk` · `sed` · `sort` · `od` · `shasum` · `git`, and `python3` for the two set-difference derivations. **Base** is named per command.

⊘ **Two byte-states are in play and every figure names which.** **R6** = the round-6 settled state, reachable at commit **`3c12ec3d`**. **R7** = the working tree as the round-7 canonical seat, the re-base seat and the cert-rebase seat left it — what this seat found frozen.

---

## §1 THE HASH GATE — **PASSED, 12 of 12 BYTE-IDENTICAL.**

The first act. Nothing may have moved since the cert seat measured.

⟨cmd⟩ this seat, base repo root:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

Diffed cell-for-cell against `PIN-PURGE-CERT.md` **§ERRATA-R7 → §TABLE-R7**'s fresh table (`:343`–`:355` paste, `:359`–`:372` prefix table):

| # | file | §TABLE-R7 first-12 | this seat | |
|---|---|---|---|---|
| 1 | `waves/F-W0.md` | `c03149fc2f9e` | `c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1` | ✔ |
| 2 | `waves/F-W1.md` | `d03e07468c74` | `d03e07468c7477a775217d933f20e16c22c88e34eeae36be4f7c8ddaacdc12c0` | ✔ |
| 3 | `waves/F-W2.md` | `655a21e7a64d` | `655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65` | ✔ |
| 4 | `waves/F-W3.md` | `bfa4278c5599` | `bfa4278c5599b7866e87865f74b0380b91b27c2af77400f979d610e017f56cad` | ✔ |
| 5 | `waves/F-W4.md` | `0932ced1a4c0` | `0932ced1a4c0fcc22a73e8eb2b942891f55ae5cd352d2f8bba5d12b4089472f2` | ✔ |
| 6 | `waves/F-W5.md` | `2990f5b51056` | `2990f5b510568a469b165ac07cf32d970b227bdc31d8f96139c625d32f05918f` | ✔ |
| 7 | `waves/F-W6.md` | `f16b290bcf62` | `f16b290bcf62bfcdecb831b06ab37d5b42204af0380b48473168712c1ce0a0f0` | ✔ |
| 8 | `waves/F-W7.md` | `16e35d5bb571` | `16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa` | ✔ |
| 9 | `waves/F-W8.md` | `0d464a4a7d3a` | `0d464a4a7d3abe8bdcbaa2fe16248f6cf672c8f836fa03b7a90f61b1df16c6dc` | ✔ |
| 10 | `waves/F-W9.md` | `4972f6a41832` | `4972f6a418322629c73cd8e1ffac331d4ec4ecdab897bbed5bf1a79ceacf9602` | ✔ |
| 11 | `waves/F-W10.md` | `d97a0123bf99` | `d97a0123bf99ceba2f9c97a4a484ba03e482188f478b0e4d0910e32e80910fa9` | ✔ |
| 12 | `conformance/CENSUS-CANONICAL.md` | `f44362757458` | `f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968` | ✔ |

**Twelve of twelve, full 64-hex, no drift. Nothing moved between the cert seat's last byte and this seat's first.**

⊕ **The certificate's R6 anchor also verifies, and this seat checked it rather than accepting it.** ⟨cmd⟩ `for f in F-W0 … F-W10; do git show 3c12ec3d:docs/tranches/X/fourier/waves/$f.md | shasum -a 256 | cut -c1-12; done` ⊕ the same for the canonical → **`d26cc4630f80` · `fc3e28d3a5f8` · `02c5ba9448f5` · `ae589556a1b2` · `d503170c111b` · `a5ce07de3e6d` · `2d9969fb8320` · `c03cf709a963` · `6c1408766fd0` · `459d959db156` · `80eff6ad1a26` · `b6d8d858c387`** — **12 of 12 identical to §TABLE's rows 1–12**, and ⟨cmd⟩ `git show 3c12ec3d:…/PIN-PURGE-CERT.md | shasum -a 256 | cut -c1-12` → **`52264bcce7c9`**, the figure §ERRATA-R7 `:240` publishes. **§TABLE was true of the bytes it named; its expiry clause, not its arithmetic, is what fired — sustained at the bytes.**

---

## §2 THE RECONCILE, SPOT-VERIFIED — **45 edits read at the bytes; 44 land clean, 1 residue filed at §6.**

### §2.1 The re-homes — **30 of the 49 read one at a time; all 49 closed mechanically. ZERO still booked.**

⟨cmd⟩ this seat, `python3`, base `conformance/`: every `CENSUS-CANONICAL.md` §1 row carrying `errata R6 E6-3`, with its record resolved from the enclosing `### fr-` header and its old home parsed from the row's own `read home **F.Wn**` clause.

→ **49 rows.** By old home: **F.W1 28 · F.W3 9 · F.W4 5 · F.W2 4 · F.W0 2 · F.W5 1**. By disposition: **TERMINAL (∅) 48 · UNROUTED 1**. **This reproduces E6-3's published delta cell exactly** (`F.W0 −2 · F.W1 −28 · F.W2 −4 · F.W3 −9 · F.W4 −5 · F.W5 −1 · TERMINAL +48 · UNROUTED +1`), and the UNROUTED one is `fr-GalleryCardModal K-2`, the identity fold E6-3 names.

**Thirty read at the bytes, with the canonical's E6-3 block read for each and the spec row printed beside it.** The disposition idiom is uniform: the booking is **struck** with `~~· \`id\`~~` *inside* the register line, the record's `(n)` is **re-based downward**, and a `<sub>` note carries the E6-3 citation and the date.

| # | record · id | canonical E6-3 disposition | spec row, at the bytes |
|---|---|---|---|
| 1 | `fr-AdminFlaggedPanel K1` | F.W1 → TERMINAL | `F-W1:551` — `(11)` … ~~`· K1`~~ ⊕ note |
| 2–3 | `fr-AnimationControls K-13 · K-14` | F.W1 → TERMINAL | `F-W1:553` — `(6)` … ~~`· K-13 · K-14`~~ ⊕ note |
| 4 | `fr-App K-9` | F.W1 → TERMINAL | `F-W1:554` struck ⊕ note |
| 5 | `fr-BasisCanvas K-1` | F.W1 → TERMINAL | `F-W1:556` — `(13)` … ~~`· K-1`~~ ⊕ note |
| 6 | `fr-CanvasControlsDock K-8` | F.W1 → TERMINAL | `F-W1:558` struck ⊕ note |
| 7 | `fr-ContourPreview KILL-6` | F.W1 → TERMINAL | `F-W1:564` struck ⊕ note |
| 8 | `fr-ConvergenceTimeline K-8` | F.W1 → TERMINAL | `F-W1:568` — `(1)` … ~~`· K-8`~~ ⊕ note |
| 9 | `fr-EditorControlsDock K-9` | F.W1 → TERMINAL | `F-W1:572` struck ⊕ note |
| 10 | `fr-EquationModeToggle K-1` | F.W1 → TERMINAL | `F-W1:574` struck ⊕ note |
| 11 | `fr-EquationView K-17` | F.W1 → TERMINAL | `F-W1:577` struck ⊕ note |
| 12 | `fr-ExportModal K-16` | F.W1 → TERMINAL | `F-W1:578` — `(8)` … ~~`· K-16`~~ ⊕ note |
| 13 | `fr-FourierMorphDemo K-8` | F.W1 → TERMINAL | `F-W1:579` struck ⊕ note |
| 14 | `fr-FrequencyGraph K-1` | F.W1 → TERMINAL | `F-W1:582` — `(1)` … ~~`· K-1`~~ ⊕ note |
| 15–16 | `fr-GalleryCardModal K-8 · K-10` | F.W1 → TERMINAL | `F-W1:587` — `(7)` … ~~`· K-8 · K-10`~~ ⊕ note |
| 17 | `fr-GalleryDraftsSection K-6` | F.W1 → TERMINAL | `F-W1:588` struck ⊕ note |
| 18–19 | `fr-GalleryInfiniteGrid K-1 · K-12` | F.W1 → TERMINAL | `F-W1:590` struck ⊕ note |
| 20 | `fr-GalleryView K11` | F.W1 → TERMINAL | `F-W1:593` — `(2)`: `R-6` · `FR-GV-18` ~~`· K11`~~ ⊕ note. **This is §4.2's worked instance and it now reads exactly as the canonical does.** |
| 21–22 | `fr-ImageUpload K-12 · K-15` | F.W1 → TERMINAL | `F-W1:596` — `(2)` … ~~`· K-12 · K-15`~~ ⊕ note |
| 23 | `fr-MorphPhaseConfig K-5` | F.W1 → TERMINAL | `F-W1:599` struck ⊕ note |
| 24–25 | `fr-PaperArticleWindow K-20 · K-24` | F.W1 → TERMINAL | `F-W1:602` — `(6)` … ~~`· K-20`~~ · `PAW-51` ~~`· K-24`~~ ⊕ note; **⊕ `F-W1:402`, the `§2·R3a` heading itself struck**: `### §2·R3a — ~~fr-PaperArticleWindow K-20 BOOKED~~ — **DISPOSED, NOT BOOKED**` |
| 26–27 | `fr-SliderControl K-1 · K-3` | F.W1 → TERMINAL | `F-W1:610` — `(4)` … ~~`· K-1 · K-3`~~ ⊕ note |
| 28 | `fr-BasisSelector K-12` | F.W3 → TERMINAL | `F-W3:724` — `(30)` ending `m-22` ~~`· K-12`~~ ⊕ note. **§4.2's second worked instance, closed.** |
| 29 | `fr-ContourSettings K-9` | F.W3 → TERMINAL | `F-W3:731` struck ⊕ note |
| 30 | `fr-ConvergenceTimeline K-6` | F.W3 → TERMINAL | `F-W3:734` — `(12)` … ~~`· K-6`~~ ⊕ note |
| 31–32 | `fr-EasingCurvePreview K-3 · K-11` | F.W3 → TERMINAL | `F-W3:736` — `(11)` … ~~`· K-3 · K-11`~~ ⊕ note |
| 33 | `fr-ConvergenceLegend K-7` | F.W2 → TERMINAL | `F-W2:374` — `\| 11 \| ~~fr-ConvergenceLegend K-7~~ — **CITED, NOT BOOKED** \| F.W2 → **TERMINAL (∅)** \|` |
| 34 | `fr-ConvergencePlot K-11` | F.W2 → TERMINAL | `F-W2:379` — same idiom, row 16 |
| 35–36 | `fr-EquationView K-5 · K-6` | F.W2 → TERMINAL | `F-W2:385` · `:386` — same idiom, rows 22/23 |
| 37 | `fr-GalleryView K7` | F.W0 → TERMINAL | `F-W0:248` — `\| **fr-GalleryView** (1) \| FR-GV-28 … ~~· K7 (= L-13) → row 15 fold list~~ \|` ⊕ note |
| 38 | `fr-ContourPreview KILL-3` | F.W4 → TERMINAL | `F-W4:305` · `:315` struck ⊕ note |
| 39 | `fr-EquationResult K-10` | F.W4 → TERMINAL | `F-W4:32` · `:317` · `:319` struck ⊕ note |
| 40 | `fr-SpeedSelect K-11` | F.W4 → TERMINAL | `F-W4:112` struck ⊕ note |
| 41 | `fr-ConvergencePlot K-13` | F.W5 → TERMINAL | `F-W5:288` — `(2)`: `C-7` ~~`· K-13 → F7`~~ · `R6-8` ⊕ note; ⊕ `F-W5:226`, the **F7 lock cell** itself struck to *"carries NO canonical F.W5 row and books none"* |

*(The table lists 41 spec rows for 30 numbered records because seven records carry two re-homes on one line; `fr-ConvergenceLegend K-10` and `fr-MorphShapePreview K-13` are the two §4.2 recorded as **not co-located at F.W4**, and they remain not co-located — verified by absence.)*

⊘ **The idiom is right, not merely present.** The strike keeps the identity legible where the record put it (`~~· \`K-11\`~~` inside the register line, never a deletion), the `(n)` moves with it, and the `<sub>` names E6-3 and the date. **Nothing was silently dropped**, which is the failure mode a strike-based reconcile exists to prevent.

### §2.2 The denominator re-bases — **all six, at the new totals, each with a dated chase note.**

⟨cmd⟩ base `conformance/`: `/usr/bin/grep -nE '^### F\.W[0-9-]+ — ' CENSUS-CANONICAL.md` → the operand, seven blocks:

`:4841` **F.W0 55** · `:4873` **F.W1 330** · `:4941` **F.W2 23** · `:4959` **F.W3 919** · `:5021` **F.W4 1007** · `:5078` **F.W5 27** · `:5126` **F.W9 16**, ⊕ `F.W5-W8` **89**. **Sum of wave-duty = 55+330+23+919+1007+27+89+16 = 2466**, the figure `PASS-7/CHECK.md` §2.2 published.

| spec | §4.1 said it published | at R7 | old figure survives where | |
|---|---|---|---|---|
| `F-W0.md` | **57** at `:7` `:25` `:62` `:111` `:132` | **55 rows**, 8 sites | 1 site, `:225`, inside a **round-5-dated** parenthetical (§6 obs. A) | ✔ |
| `F-W1.md` | **358** over 65 records | **330 rows**, 4 sites; `:266`/`:548` receipts re-run to **330 / 660 / 65** | `358` → **0 live**; only inside the `:548` strike note | ✔ |
| `F-W2.md` | **27** at `:32` `:56` `:270` `:354` | **23 rows**, 4 sites | `**27 rows**` → **0 occurrences** | ✔ |
| `F-W3.md` | **928** at 14 sites | **919**, 21 occurrences | `928` → 5 occurrences, **all five inside dated chase notes** (`:19` `:28` `:416` `:707` `:901`) | ✔ |
| `F-W4.md` | **1012**, `:293`/`:295` | **1007**, 3 occurrences | `1012` → 3, **all three inside chase notes** (`:293` `:295` `:297`) | ✔ |
| `F-W5.md` | **28** at `:9` `:265` `:279` | **27 rows** ⊕ `27+89 = 116` | `28` inside the chase notes only | ✔ |

⊕ **The cross-wave publication at `F-W3:787` re-based too** — the one site that restated three other waves' figures. It now reads *"`F.W0`'s **55**, `F.W1`'s **330**, `F.W2`'s **23**, `F.W5`'s 27, the `F.W5-W8` band's **89** and `F.W9`'s **16**"* with the chase note *"read 57 · 358 · 27 · 28"*. **§4.1's cross-contamination site is the one most likely to be missed and it was not missed.**

⊕ **The stale aggregate is gone.** ⟨cmd⟩ base `waves/`: `/usr/bin/grep -c '2515' F-W*.md` → **0 in 11 of 11**. §4.1's *"wave-duty asserted across the specs = 2515"* no longer has a source.

### §2.3 The subtraction, **re-derived by this seat at the new totals — it closes at ZERO.**

Not re-read from the check: re-derived. ⟨cmd⟩ this seat, `python3`, parsing the canonical §2 `F.W1` block and testing each id against `waves/F-W1.md` with **both flanks required to be outside `[A-Za-z0-9_-]`**:

```
F.W1 roster lines (records): 65
F.W1 declared row sum:       330
F.W1 backtick tokens:        330
per-record (n) vs token-count mismatches: []
F.W1 ids tested: 330   STRICT MISSES: 0
```

**330 declared = 330 tokens = 330 found. `330 − 330 = 0`. It closes at ZERO.**

⊕ **Four more forward subtractions, unasked, because one roster proves one roster**: `F.W0` **55 → 0 misses** · `F.W2` **23 → 0** · `F.W5` **27 → 0** · `F.W9` **16 → 0**. `F.W4` returns **68** misses — **the identical, already-adjudicated population** `PASS-7/CHECK.md` §2.2 resolved as 36 record-prefix compounds ⊕ 32 elision-chain members (idioms 1–3 at `F-W4:344`/`:345`); it is not a new escape and this seat re-measured it only to confirm the count did not move.

⊕ **And the REVERSE direction — the one §4.2 and §4.3 failed on — run mechanically, with no special case.** ⟨cmd⟩ this seat, `python3`: parse the spec's own transcribed registers (`F-W1` §6·R4, `F-W3` §X.1-v5), **strip `~~…~~` struck spans and `<sub>` errata notes**, and diff record-for-record against the live canonical block:

| register | spec books / canonical does NOT home | canonical homes / spec lacks | `(n)` mismatches | live-id sum vs canonical |
|---|---|---|---|---|
| `F-W1` §6·R4 | **0** *(was 29)* | **0** *(was 1)* | **0** | **330 = 330**, 65 = 65 records |
| `F-W3` §X.1-v5 | **0** *(was 9)* | **0** | **0** | **919 = 919**, 59 = 59 records |

**§4.2's 38 register-proven bookings are cured, and §4.3 is cured with them: this differ needed no special case for the band row, and a differ that needs no special case is a differ someone will run.**

### §2.4 The `F-W1` band spelling — **cured; the single survivor is the quotation of the defect.**

⟨cmd⟩ base `waves/`: `/usr/bin/grep -c 'FM-4..FM-16 (13 ids)' F-W1.md` → **1** (PASS-6 and PASS-7 both measured **3**). All three sites read at the bytes:

- **`:548`** — live text now reads `` `FM-4..FM-16` `` <sub>band = 13 ids</sub>, the canonical's cured E6-2 form, followed by ⟨*re-spelled at round-7 reconcile, 2026-08-29 … it read `FM-4..FM-16 (13 ids)`, the multiplicity inside the backtick span*⟩. **The one surviving malformed token is inside that quotation.**
- **`:580`** — the §6·R4 register line: `` `FM-4..FM-16` `` <sub>band = 13 ids</sub>. Cured.
- **`:636`** — the CITED-by-carried-identity list: same cured form. Cured.

⊘ **Adjudicated LAWFUL, and on the canonical's own precedent.** This is exactly the E6-2 restatement idiom the canonical uses at `CENSUS-CANONICAL.md:179`: *"here the quotation IS the receipt — re-spelling it would leave each errata row asserting it cured a spelling the row no longer exhibits, which destroys the evidence rather than the defect."* **Dated evidence is not rewritten (E-3).** The proof that the cure is real is §2.3's reverse diff: the band row matched mechanically, in both directions, with no special case.

### §2.5 The census re-pins — **live pins of the superseded digest: ZERO. All 8 survivors adjudicated one at a time.**

⟨cmd⟩ this seat, base `waves/`:

```
/usr/bin/grep -o '3e0a9acb3381' F-W*.md | wc -l   →  8   (§4.4 measured 39)
/usr/bin/grep -o 'b6d8d858c387' F-W*.md | wc -l   →  0
/usr/bin/grep -o 'f44362757458' F-W*.md | wc -l   →  39
/usr/bin/grep -c 'f44362757458' F-W*.md           →  11 of 11 specs
```

**The 39 live pins moved to the current digest — count preserved exactly, 39 → 39, 11 of 11.** `f44362757458` is row 12 of §TABLE-R7 and §1 above proves it is the canonical's actual digest at these bytes. **`b6d8d858c387` is 0 and correctly so**: it was the *round-6* transient the specs never pinned; the canonical moved again under the round-7 seat, and `f44362757458` is what a spec must now cite.

**The eight survivors, adjudicated individually — every one is E-3 history, none is a pin:**

| # | site | the text | verdict |
|---|---|---|---|
| 1–2 | `F-W2:446` | `` ~~`3e0a9acb3381`~~ → **`f44362757458`** `` in the old→new cell, ⊕ *"(was `a450b8e9f80e`, then `3e0a9acb3381`)"* | **LAWFUL** — struck ⊕ provenance narrative |
| 3 | `F-W3:787` | inside an errata parenthetical: *"the canonical's pin moves `a450b8e9f80e` → `3e0a9acb3381` (round 5) → **`f44362757458`**"* | **LAWFUL** — dated movement record |
| 4–5 | `F-W4:295` | *"THE PIN DID ITS JOB. The census moved at the §0.4 errata round (`a450b8e9f80e` → `3e0a9acb3381`) and again at the §0.5 errata round (`3e0a9acb3381` → **`f44362757458`**)"* | **LAWFUL** — the mechanism reporting on itself; the live operand in the same ⟨cmd⟩ is `f44362757458` |
| 6 | `F-W6:55` | `` ~~`a450b8e9f80e`~~ → ~~`3e0a9acb3381`~~ → **`f44362757458`** `` | **LAWFUL** — struck chain |
| 7 | `F-W7:60` | identical struck chain | **LAWFUL** |
| 8 | `F-W9:340` | identical struck chain | **LAWFUL** |

**Live-pin occurrences of a superseded census digest across the eleven specs: ZERO. `PASS-7`'s D-1 bar — *zero superseded digest pins* — is MET.**

⊕ **The certificate's own two R7 claims about these bytes, re-run and sustained.** §TABLE-R7 `:329` publishes *"total 12-hex tokens across the eleven → 156 (R6: 148)"*. ⟨cmd⟩ `/usr/bin/grep -oE '[0-9a-f]{12}' F-W*.md | wc -l` → **156** at R7 and **148** at R6. §ERRATA-R7 LW-1's ▲ publishes *"77 sites / 83 occurrences / 11 of 11"*. ⟨cmd⟩ → **77 · 83 · 11**. **Both exact.**

---

## §3 THE FOUR LW ERRATA — **all four re-run from their own published commands. ALL FOUR STATE TRUE FIGURES.**

The certificate's §ERRATA-R7 does not get to certify itself. This seat re-ran each correction at the byte-state the correction names.

### LW-1 — corrected `forty-three` → **42 citation sites**. **TRUE.**

⟨cmd⟩ this seat, R6 bytes materialised via `git show 3c12ec3d:…` into a scratch tree, base that tree:

```
/usr/bin/grep -n 'PIN-PURGE-CERT.md §TABLE' F-W*.md | awk -F: '{print $1":"$2}' | sort -u | wc -l
```

→ **42**. ⟨cmd⟩ `grep -o … | wc -l` → **44** occurrences. ⟨cmd⟩ `grep -lF … | wc -l` → **9** specs. Per-file sites: **F-W0 8 · F-W1 4 · F-W2 10 · F-W3 1 · F-W4 1 · F-W6 5 · F-W7 7 · F-W8 1 · F-W9 5** (F-W5 and F-W10 zero) — **the certificate's distribution, cell for cell.** 8+4+10+1+1+5+7+1+5 = 42. ✔ **And the tell holds: 43 is neither 42 nor 44.**

### LW-2 — corrected `6 digests` → **5 digests / 4 specs**. **TRUE.**

⟨cmd⟩ this seat, R6 bytes, the certificate's own loop over D-1's ten superseded digests, one at a time:

| digest | specs | occ |
|---|---|---|
| `a89c3386f3f8` | `F-W0` · `F-W1` · `F-W9` | 3 |
| `a1302689aaa3` | `F-W0` | 1 |
| `5cc3346db23e` | `F-W0` | 1 |
| `39e1a60b3fc9` | `F-W3` · `F-W9` | 2 |
| `bb58dc400cff` | `F-W9` | 1 |
| `282f0c120cd4` · `132c03192176` · `e9a9c3016f4c` · `c8c6d1d7f136` · `1e3698adf4ff` | **∅ extinct** | 0 |

**FIVE survive, in EIGHT occurrences, across `{F-W0, F-W1, F-W3, F-W9}` = FOUR specs.** ✔ *"4 specs"* and *"history position only"* both stand; the tabular `6` was the error and §RESIDUE (b)'s enumeration was right.

### LW-3 — the false corpus-wide universal, withdrawn and enumerated. **TRUE, and this is the one that mattered.**

**(i)** ⟨cmd⟩ `git show --numstat --format= 3c12ec3d -- docs/tranches/X/fourier/waves` → adds **=** deletes for ten: `F-W0` 8/8 · `F-W1` 4/4 · `F-W10` 5/5 · `F-W2` 10/10 · `F-W3` 1/1 · `F-W5` 14/14 · `F-W6` 6/6 · `F-W7` 7/7 · `F-W8` 1/1 · `F-W9` 10/10 — and **`F-W4.md` 9/3.** ⟨cmd⟩ `git show --format= --unified=0 3c12ec3d -- …/F-W4.md | /usr/bin/grep -E '^@@'` → **`@@ -11,0 +12,6 @@`** ⊕ `-140 +146` · `-289 +295` · `-456 +462`, three pure substitutions. **A six-line insertion after `:11`, exactly as stated.**

**(ii)** ⟨cmd⟩ base `waves/`, R7: `awk 'NR>=642 && NR<=673 && /^\|/' F-W1.md | wc -l` → **26**, line numbers `646 647 648 … 670 671`. **The D-11 coordinates still resolve.**

**(iii)** ⟨cmd⟩ R7: `sed -n '338p' F-W4.md` → `- **\`GM-6\` — the ENABLING F.W1 rider…**`, an unrelated row; the suffix-elision-chain content `PASS-6/CHECK.md:66` named is at **`:344`**. ⟨cmd⟩ `sed -n '458p' F-W4.md | od -c` → `0000000 \n` — **a blank line**; the §Y.3 residual-string declaration is at **`:464`**. **Both broken, both by exactly +6.** ✔

### LW-4 — corrected `five struck halves at :48–:52` → **FOUR, at `:48`–`:50` and `:52`**. **TRUE.**

⟨cmd⟩ base `waves/`, R7 **and** R6, identical both times:

```
/usr/bin/grep -noE '[0-9a-f]{12}' F-W6.md | awk -F: '$1>=44 && $1<=52'
```

→ `:44` carries **11** tokens; then `:48 d4f47eb3ec4f` · `:49 cd64d6580098` · `:50 839d9964010b` · `:52 eda1fab4e865`. ⟨cmd⟩ `… | awk -F: '$1>=48 && $1<=52 {print $1}' | sort -u | wc -l` → **4** at R7, and `48 49 50 52` at R6. **`:51` carries no 12-hex token**: this seat read it — `` | `waves/F-W3.md` | **pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)** … | `` — **the purge's own work, exactly as LW-4 explains.** ⊕ **`11 ⊕ 4 = 15`, the row's published occurrence total, is EXACT**, so the class arithmetic never depended on the miscount. ✔

⊘ **All four corrections are sustained at the bytes, and all four are count-shaped or wording-shaped: none moves a home, a booking, a roster, a gate or a digest.**

---

## §4 THE ARITHMETIC, CLOSED

| quantity | value | how |
|---|---|---|
| hash rows re-verified vs §TABLE-R7 | **12 / 12** | §1, full 64-hex |
| R6 anchor rows re-verified vs §TABLE | **12 / 12** ⊕ cert `52264bcce7c9` | §1 |
| E6-3 re-homes enumerated from the canonical | **49** (48 TERMINAL, 1 UNROUTED) | §2.1 |
| re-homes read at the bytes, one at a time | **30 records / 41 struck spec rows** | §2.1 |
| re-homes still BOOKED at the old home | **0** | §2.3 reverse diff |
| denominator re-bases verified | **6 of 6** ⊕ the `F-W3:787` cross-wave site | §2.2 |
| forward roster subtractions re-derived here | **F.W1 · F.W0 · F.W2 · F.W5 · F.W9 → 0 misses each** | §2.3 |
| reverse register diffs re-derived here | **F-W1 0/0/0 · F-W3 0/0/0** | §2.3 |
| wave-duty sum at the canonical | **2466** | §2.2 |
| band-spelling sites cured | **3 of 3**; 1 surviving token = the E-3 quotation | §2.4 |
| live pins of a superseded census digest | **ZERO** (39 → 0) | §2.5 |
| old-digest survivors adjudicated | **8 of 8, all lawful history** | §2.5 |
| LW errata re-run and sustained | **4 of 4** | §3 |
| **reconcile edits spot-verified** | **45** | §2 |
| **landed wrong** | **1**, LOW, filed below | §5 |

---

## §5 LANDED WRONG — **ONE, LOW, and it books nothing.**

### LW-R7-a · **LOW — `F-W1` §2·R3b did not receive the parallel disposition its twin §2·R3a received.**

E6-3 re-homed **both** `fr-PaperArticleWindow K-20` and `fr-PaperArticleWindow K-24` from F.W1 to **TERMINAL (∅)**, and the register at `F-W1:602` strikes both. The reconcile also struck the **section heading** for the first:

> `F-W1:402` — `### §2·R3a — ~~fr-PaperArticleWindow K-20 BOOKED~~ — **DISPOSED, NOT BOOKED** <sub>re-homed TERMINAL per E6-3 (2026-08-29)…</sub>`

**Its twin was left in the live voice:**

> `F-W1:408` — `### §2·R3b — \`fr-PaperArticleWindow K-24\`'s F.W1 LEG ANSWERED (ruling R3-2.2 item 2, second half; PASS-3 escape #4, INFO)`

⊘ **Why it is LOW and not HIGH, stated exactly.** The section **books nothing**, and says so in its own body at `:412`: *"the identity is F.W2's and is **NOT re-booked here** … **`waves/F-W1.md` is THIS ROW**, which answers a leg and **books no identity**."* Under each spec's citation rule an id spelled outside the register is a citation, so **no roster, denominator, gate or booking is touched**, and §2.3's mechanical reverse diff — the instrument §4.2 was filed on — returns **0** for this record. **This is a legibility residue, not an over-claim: the heading's `F.W1 LEG` phrasing reads as a wave duty in a file whose every other K-20/K-24 surface now reads as struck.**

⊕ **A second-order note carried, not cured**: the heading also sits over a body asserting K-24's home is **F.W2**, while E6-3 read its home as **F.W1 → TERMINAL**. That disagreement **pre-dates round 7** and round 7 neither created nor widened it; this seat records it so no successor reads §2.3's zero as clearing it.

**Cure shape for the next seat, bounded:** one heading, strike + `<sub>` note, matching `:402`'s form exactly. **Zero census cells, zero registers, zero counts.**

---

## §6 OBSERVATIONS — recorded, NOT graded as defects

**A · `F-W0:225` still spells `57 rows` inside a round-5-dated parenthetical.** The line's live citation reads `` §2 → `### F.W0 — 55 rows` `` with the round-7 chase note; the `57` sits in ⟨*re-based at repair round 5: … §2's header now reads `### F.W0 — **57 rows**`*⟩. **That is a dated statement about round 5 and E-3 forbids rewriting it.** All eight live F.W0 sites read **55**. Recorded only because a successor skimming for `57` will find it and should read it as history.

**B · `F.W4`'s 68 strict misses persist and are the same 68.** Not a finding — the adjudicated record-prefix and elision-chain idiom population from `PASS-7/CHECK.md` §2.2. This seat re-measured the count to confirm it did not move under the reconcile. It did not.

**C · The certificate's expiry clause is now live against itself.** §TABLE-R7 states its twelve rows are true of the frozen bytes and of no later state. **This seal wrote no wave, no census and no certificate byte**, so §TABLE-R7 is **still the operand** as of this seal. **The next seat to write a spec voids it and owes the next append.**

---

## §7 WHAT THIS SEAT DID NOT DO

1. **It edited nothing.** No wave, no `CENSUS-CANONICAL.md`, no `PIN-PURGE-CERT.md`, no prior pass instrument. LW-R7-a is filed here and cured nowhere.
2. **It did not re-audit the census itself.** §1 · §2 · §3 internal consistency is `PASS-7/CHECK.md` §2.1's measurement; this seat consumed it and re-derived only the roster subtractions above.
3. **It measured 30 of the 49 re-homes by reading, and 49 of 49 by machine.** The nineteen not individually printed are covered by §2.3's two register diffs and by the co-location sweep; **this seat does not claim to have read every one of the 49 spec rows with its own eyes.**
4. **It did not audit `:NNN` addresses outside the four LW-3 coordinates.** LW-3(iv)'s eleven displaced `F-W4` coordinates in the PASS-2/3/4 instruments remain **UNAUDITED**, as the certificate says.
5. **It did not re-run the other 22 receipts** of `PASS-7/CHECK.md` §5. Only the four LW commands, the pin sweeps, the hash gates and the subtractions.
6. **A hash proves only that bytes did not move.** It does not prove a paste was produced by its command — `F-W9:505`/REST-54 remains the programme's own counter-example — and **no seal issues its own conformance.**

---

⊘ **VERDICT OF THIS SEAT, stated narrowly.** The round-7 reconcile **landed**: `PASS-7/CHECK.md` §4.1 (BLOCKER), §4.2 (HIGH), §4.3 (HIGH) and §4.4 (HIGH) are all **CURED at the bytes** — six denominators re-based, 49 re-homes disposed with zero still booked, the band spelling cured to a mechanically-diffable form, and superseded census pins driven to **ZERO**. §4.5's four counts are **corrected and all four sustained**. **One LOW residue (LW-R7-a) is open.** This seat certifies the verification, not the pass.

---

## §8 THE HASH TABLE — THE ABSOLUTE LAST ACT OF THIS WRITE

⟨cmd⟩ this seat, 2026-08-29, base **repo root `/Users/mkbabb/Programming/value.js`**, BSD `shasum`, taken **AFTER** every byte of §1–§7 above and with **nothing written after it**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1  docs/tranches/X/fourier/waves/F-W0.md
d03e07468c7477a775217d933f20e16c22c88e34eeae36be4f7c8ddaacdc12c0  docs/tranches/X/fourier/waves/F-W1.md
d97a0123bf99ceba2f9c97a4a484ba03e482188f478b0e4d0910e32e80910fa9  docs/tranches/X/fourier/waves/F-W10.md
655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65  docs/tranches/X/fourier/waves/F-W2.md
bfa4278c5599b7866e87865f74b0380b91b27c2af77400f979d610e017f56cad  docs/tranches/X/fourier/waves/F-W3.md
0932ced1a4c0fcc22a73e8eb2b942891f55ae5cd352d2f8bba5d12b4089472f2  docs/tranches/X/fourier/waves/F-W4.md
2990f5b510568a469b165ac07cf32d970b227bdc31d8f96139c625d32f05918f  docs/tranches/X/fourier/waves/F-W5.md
f16b290bcf62bfcdecb831b06ab37d5b42204af0380b48473168712c1ce0a0f0  docs/tranches/X/fourier/waves/F-W6.md
16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa  docs/tranches/X/fourier/waves/F-W7.md
0d464a4a7d3abe8bdcbaa2fe16248f6cf672c8f836fa03b7a90f61b1df16c6dc  docs/tranches/X/fourier/waves/F-W8.md
4972f6a418322629c73cd8e1ffac331d4ec4ecdab897bbed5bf1a79ceacf9602  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
4fc65bbd1d9b548fb01d18550194349c3a00274adf598dddc19012b04d5537b6  docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**THIRTEEN ROWS. Rows 1–12 are byte-identical to §TABLE-R7 and to §1 of this seal. Row 13 is the certificate itself, hashed here for the first time — `4fc65bbd1d9b`, the post-`§ERRATA-R7` state.**
