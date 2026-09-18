# X·F PASS 12 — FRESH ADVERSARIAL WHOLE-CORPUS CHECK (L-18/L-20)

**Seat:** PASS-12 CHECK, hostile, verify-only. **Date:** 2026-08-30.
**Base:** repo root `/Users/mkbabb/Programming/value.js`; wave-relative commands run from
`docs/tranches/X/fourier/waves/`; `$C = ../conformance/CENSUS-CANONICAL.md`;
`$R = docs/tranches/V/megatranche/registry/adjudicated/`. Pinned BSD toolchain
(`/usr/bin/grep` · `/usr/bin/awk` · `/usr/bin/sed` · `/usr/bin/python3` · `shasum`), addressed
absolutely wherever the receipt under test addressed it absolutely.
**Operand:** the 11 `waves/F-W*.md` · the frozen `CENSUS-CANONICAL.md` · `PIN-PURGE-CERT.md`
(incl. §ERRATA-R7/R9/R10/R11) · `PASS-11/SEAL.md` · `PASS-11/CHECK.md` · the 66 `fr-*.md` at `$R`
(carries `F-W1-CARRY` + `F-W4-CARRY` only).
**ZERO edits to any spec, the canonical, the certificate, any record or any prior pass artefact.
This file is the only artefact this seat wrote. No product source was opened.**

> ## VERDICT: **NOT CONFORMANT. One HIGH.**
> `hashesClean = true` · `rosterEscapes = 0` · `fabricated = 0` · `liveStaleCanonicalMagnitudes = 1` · `selfCountLiveMembers = 1`
>
> The bar required zero BLOCKER/CRITICAL/HIGH. **`F-W10:363` asserts, twice and in the present
> indicative, that the frozen canonical's `F.W9` roster is **17 rows**, and that the canonical homes
> `R2-7` (`fr-PaperArticleWindow`) **at F.W9**. The canonical reads `### F.W9 — **16 rows**` and homes
> `R2-7` in `TERMINAL (∅)`. There is no chase on the line.** Both limbs fall to the *same* erratum
> (E5-16), so the sentence is one defect counted twice. This is the escape `PASS-11/SEAL.md` filed as
> **LW-R11-a** and left uncured; **the bytes have not moved since** — this seat's re-hash proves it —
> and this seat re-derived the conviction independently, from the canonical's own roster bodies,
> before opening the seal's finding.
>
> Everything else the round owed is genuinely closed. **Ten of the eleven pass-11 register items are
> discharged at the bytes**; the roster closes at zero by boundary-exact subtraction *and* by
> record-level paste diff; fabrication is zero at id level; every superseded digest is chased; every
> coordinate resolves. The tail below is one MEDIUM with a stated mitigation and two MINOR/INFO.

---

## §1 — FIRST ACT: THE RE-HASH. **CLEAN. 13 / 13.**

⟨cmd⟩ `shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md`

**Every digest is byte-identical to `PASS-11/SEAL.md` §1 and §8.** Not one prefix differs.

| file | SEAL §8 | this seat | file | SEAL §8 | this seat |
|---|---|---|---|---|---|
| `F-W0` | `1f5a93c90ed7` | ✓ | `F-W6` | `e83dcad051f5` | ✓ |
| `F-W1` | `ab2437af09e0` | ✓ | `F-W7` | `75a08eeee03a` | ✓ |
| `F-W2` | `77854a06b2ee` | ✓ | `F-W8` | `d8237cf6b11e` | ✓ |
| `F-W3` | `be86ae410118` | ✓ | `F-W9` | `b265bf677869` | ✓ |
| `F-W4` | `2fb6e6d637bb` | ✓ | `F-W10` | `9415e4c93e57` | ✓ |
| `F-W5` | `40bcad59cd2b` | ✓ | **`CENSUS-CANONICAL.md`** | **`f44362757458`** | ✓ **FROZEN, 4th round** |
| | | | `PIN-PURGE-CERT.md` | `024943b69d11` | ✓ |

⊙ **Line-count corroboration.** ⟨cmd⟩ `/usr/bin/wc -l waves/F-W*.md` → F-W0 **596** · F-W1 **735** ·
F-W2 **465** · F-W3 **912** · F-W4 **470** · F-W5 **433** · F-W6 **634** · F-W7 **359** · F-W8 **374** ·
F-W9 **557** · F-W10 **515**; **total 6050**, and `6050 − 61 = 5989`, the pre-append figure `F-W0`
§R11-4 publishes. **Every figure reproduces §ERRATA-R11·d and SEAL §1 exactly.**

▲ **Consequence, stated plainly:** because not one byte has moved, **every landed-wrong item
`PASS-11/SEAL.md` §6 recorded is live at these bytes by construction.** This seat did not inherit
them — each was re-derived below from the canonical first — but the arithmetic of the situation
admits no other outcome.

---

## §2 — AXIS 1: THE ROSTER. **CLOSED AT ZERO. `rosterEscapes = 0`.**

### §2.1 Boundary-exact subtraction

⟨cmd⟩ `/usr/bin/awk '/^\| home \| rows \|/,/^\| \*\*TOTAL\*\*/' "$C"`, summed mechanically:

| band | members | sum |
|---|---|---|
| **WAVE-DUTY** | F.W0 55 · F.W1 330 · F.W2 23 · F.W3 919 · F.W4 1007 · F.W5 27 · F.W5-W8 89 · F.W9 16 | **2466** ✓ |
| relay / packet / SS-* | GLASS-RELAY 22 · NWO 32 · NWO→SS-13 3 · NWO→SS-3 27 · NWO→SS-5 3 · SS-1 5 · SS-13 134 · SS-2 7 · SS-3 9 · SS-4 3 · SS-5 2 · SS-6 1 · SS-7 1 | **249** |
| **TERMINAL (∅)** | | **1220** ✓ |
| **UNROUTED** | | **307** ✓ |
| **TOTAL** | | **4242** ✓ |

**`4242 − 2466 − 1220 − 307 = 249`, and 249 is exactly the enumerated relay/packet/SS band. The
subtraction closes at ZERO — no residue, no double-count.**

### §2.2 The rosters re-derived from their own bodies, before any spec was opened

⟨cmd⟩ per home, `/usr/bin/awk -v H="### <home> — " 'index($0,H)==1{f=1;next} /^### /{f=0} f && /^- \*\*/'`
over `$C`, counting record bullets and summing each bullet's parenthesised row count. **All 23 homes
agree with the §3 table exactly**:

| home | rows | records | | home | rows | records |
|---|---|---|---|---|---|---|
| F.W0 | **55** | 29 | | GLASS-RELAY | **22** | 16 |
| F.W1 | **330** | 65 | | NWO (packet) | **32** | 21 |
| F.W2 | **23** | 15 | | NWO→SS-13 | **3** | 3 |
| F.W3 | **919** | 59 | | NWO→SS-3 | **27** | 22 |
| F.W4 | **1007** | 54 | | NWO→SS-5 | **3** | 2 |
| F.W5 | **27** | 11 | | SS-1..SS-7 | **28** | 21 |
| F.W5-W8 | **89** | 31 | | **TERMINAL (∅)** | **1220** | 66 |
| F.W9 | **16** | **15** | | **UNROUTED** | **307** | 48 |

⊙ **§1 ≡ §3, independently:** ⟨cmd⟩ `grep -oE '^### fr-[A-Za-z]+ — target .*· \*\*[0-9]+ rows\*\*' "$C"`
→ **66 record headers summing to 4242**, equal to the §3 TOTAL. The census is internally closed on
both halves.

⊙ **§4.3 re-derived:** ALIASES **2780** beside **4242** banked ids; an atomiser mints up to **2779**
bookings — the canonical states all three at `:5450`–`:5500`; expanded ids **4287**, NO-WAVE-OWNER
**88**, records censused **66**.
⊙ **§4.2 re-derived, both arms:** `778 ⊕ 86 = 864` ✓; and the five criterion-negatives' own canonical
§1 headers — `fr-BasisCanvas` **79** · `fr-ContourEditorCanvas` **73** · `fr-EquationResult` **46** ·
`fr-GalleryAdminBanner` **52** · `fr-FourierMorphSvg` **32** (chased from 33 at E6-1) — sum to
**282** ✓, the E6-5-corrected figure and not the inherited 289.

### §2.3 The canonical-row paste sweep — ZERO MISMATCHES

| spec | block | canonical | spec | `diff` |
|---|---|---|---|---|
| `F-W1` §6·R4 | `:549–633` | 65 records / **330** | 65 records / **330** | **ZERO MISMATCHES** ✓ |
| `F-W3` §X.1-v5 | `:715–790` | 59 records / **919** | 59 records / **919** | **ZERO MISMATCHES** ✓ |

⊙ **Id-level, not merely count-level.** ⟨cmd⟩ the F-W1 paste stripped of `~~…~~` strikes and
`<sub>` chases, `grep -oE '\`[^\`]+\`'`, `sort -u`, `comm` against the canonical F.W1 roster's own
id set: **284 canonical ids · 284 spec live ids · `comm -13` = 0 (fabrication) · `comm -23` = 0
(escape).** Departures are struck in place with their reason inline, never deleted (E-3).

⊙ `F-W4` pastes no per-record roster; it books through the (a)/(b)/(c)/(d) crosswalk register,
measured at §5 instead.

### §2.4 Fourteen E6-3 dispositions spot-read at BOTH ends (charge: ≥8)

E6-3's ledger — F.W0 −2 · F.W1 −28 · F.W2 −4 · F.W3 −9 · F.W4 −5 · F.W5 −1 = **−49**;
TERMINAL **+48** · UNROUTED **+1** = **+49**; wave-duty 2515 → **2466**. **Balances exactly.**

**End 1 — the canonical**, extracted from §2's roster bodies (never from the errata prose): each id
below sits in its declared home and in **no wave-duty roster at all**:
`fr-App K-9` · `fr-CanvasControlsDock K-8` · `fr-ContourPreview KILL-6` · `fr-ConvergencePlot K-13` ·
`fr-ConvergenceTimeline K-8` · `fr-EasingCurvePreview K-11` · `fr-EquationModeToggle K-7` ·
`fr-GalleryCardModal K-8` · `fr-GalleryView K7` · `fr-PaperArticleWindow K-20` · `fr-PathPreview K7` ·
`fr-SliderControl K-1` · `fr-SpeedSelect K-11` → **TERMINAL (∅)**; `fr-GalleryCardModal K-2` →
**UNROUTED**. **14 of 14 verify; wave-home hit count 0 for every one.**

**End 2 — the frozen records at `$R`**: all 14 records exist and each carries its id
(hits 1–8 per record). **14 of 14 present.**

**`rosterEscapes = 0` · `fabricated = 0`.**

---

## §3 — AXIS 2: THE PASS-11 REGISTER (11 ITEMS), EACH TESTED AT THE BYTES

| # | item | this seat's ⟨cmd⟩ at the settled bytes | verdict |
|---|---|---|---|
| **D-1** | `F-W4` `1014` unchased ×4 | ⟨cmd⟩ `awk '/1014/{c=gsub(/chased\|re-based\|1007\|round-7\|repair round\|read 1014/,"&"); print NR": "c}'` → `:7` **11** · `:297` **5** · `:349` **6** · `:374` **9** · `:455` **5** — **every site chased**. Masthead `:7` now reads `` `F.W4` = 1007 rows across 54 records ``; gate `:374` reads `` `F.W4` (1007 rows, 54 records) ``; `grep -c 1007` **3 → 7** | **CLOSED** |
| **D-2** | `F-W3` §4.3 olds unchased ×3 | live: `2780` **2** (`:32` `:784`) · `4242` **3** (`:32` `:703` `:784`) · `2779` **1** (`:32`); olds `2768`/`4269`/`2767` co-occur on the same three lines inside R11 chase notes | **CLOSED** |
| **D-3** | `F-W4:349` self-falsified arithmetic | `:349` now publishes **`29 + 71 + 907 = 1007`**, with `29 + 72 + 913 = 1014` preserved as the chased superseded reading | **CLOSED** |
| **D-4** | `F-W2:248` self-count member | ⌧ **verbatim arm still false — 86, not 84.** See **P12-2** | ⌧ **OPEN** |
| **D-5** | `F-W10:338` displaced coordinate | ⟨cmd⟩ `grep -nE '(^\|[^A-Za-z0-9])L-16([^A-Za-z0-9]\|$)' F-W10.md` → `191 193 244 276 291 296 297 301 303 338 442`; `awk 'NR!=338' \| grep -c` → **10**. `419 + 23 = 442` ✓ | **CLOSED** |
| **D-6** | `F-W10:467` self-count member | `grep -n "§2.5a-iii's 1[34]"` → `:314 :442 :467`, values **14 · 14 · 14**; `awk 'NR!=467' \| grep -c` → **2**; `23+36+16+14 = 89` ✓ | **CLOSED** |
| **D-7** | `F-W8:324` ten-under-a-label-of-nine | `grep -n 'C:C-23' F-W8.md` → eleven: `20 25 27 40 78 81 165 246 267 322 324`; the label now reads **"the other ten"**, `11 − 1 = 10` ✓ | **CLOSED** |
| **D-8** | `F-W9:289` coordinate drift | `grep -n '9 e2e never enter the audit tab' F-W9.md` → **`185 289 461`**, and `:289` cites exactly those with `:178 :282 :452` retained as the chased prior reading | **CLOSED** |
| **D-9** | `F-W7:16` residue short by two | the probe is **re-scoped to `docs/tranches/X/fourier/waves/`** and returns `F-W7.md` **alone**; the cure is structural, not a re-count — *"a residue list scoped to `docs/` is falsified by every future instrument that quotes the string, including the check that files the defect"* | **CLOSED — and correctly** |
| **D-10** | `PASS-10/SEAL.md` §3.2 unit mismatch | instrument-level, prior artefact, E-3: recorded, not patchable by any corpus edit | **CLOSED by disclosure** |
| **D-11** | `FR-NP-32` literal probe returns 1 | `grep -cF '(≡ M1' F-W10.md` → **1**; `awk 'NR!=446' \| grep -cF` → **0**. The sole hit is the retired bare spelling inside its own `~~…~~`; the live form `FR-NP-32 (≡ fr-PaperSidebar M1)` stands at `:128` `:161` `:475`. **The self-excluding probe is the lawful gate; a bare `grep -cF` would convict lawful bytes** (§ERRATA-R11·b) | **CLOSED (INFO)** |

**10 of 11 closed. D-4 is not.**

---

## §4 — AXIS 3: THIS SEAT'S OWN NUMERIC CONTEXT PROBE, RUN TO EXHAUSTION, PER-FILE COUNTS PUBLISHED

⊘ **The structural item `PASS-11/SEAL.md` §6 said was owed** — *"a context probe must be run to
exhaustion over every spec, and its per-file hit count published, or a seat cannot tell a clean file
from an unvisited one"* — **is discharged here.** The probe is built from the authority list of §2
above and **never from a list of known-bad values**; the stale generations are derived from the
canonical's own errata annotations, not inherited from any check.

**Pass A — anchor coverage** (`canonical` within 160 chars of `roster`/`rows`/`records`), per file:
F-W0 **11** · F-W1 **10** · F-W2 **9** · F-W3 **6** · F-W4 **11** · F-W5 **14** · F-W6 **11** ·
F-W7 **2** · F-W8 **19** · F-W9 **9** · F-W10 **11** — **113 lines, every spec visited, none zero.**

**Pass B — the stale-generation family** `17 · 28 · 90 · 1014 · 1012 · 57 · 56 · 926 · 928 · 362 ·
358 · 2515 · 4269 · 4262 · 2768 · 1190 · 4322 · 2767` at word boundary before ` rows`/` records`/`-row`,
each occurrence read with a ±320-character chase window:

| file | occurrences | unchased | disposition |
|---|---|---|---|
| F-W0 | 7 | 1 | `:126` *"a 28-row dirty tree"* — `git worktree`, **not a census magnitude** ✓ |
| F-W1 | 1 | 0 | ✓ |
| F-W2 | 0 | 0 | ✓ |
| F-W3 | 6 | 2 | `:416` `:648` *"603 / 57 records"* — the atomiser detector grid's own denominators, **not census homes** ✓ |
| F-W4 | 4 | 0 | ✓ — **all four `1014` sites chased (D-1)** |
| F-W5 | 0 | 0 | ✓ |
| F-W6 | 8 | 0 | ✓ — the round-8 re-based `28`/`90` sites |
| F-W7 | 3 | 1 | `:261` *"Cross-edges (**17 rows, counted**: 15 declared edges + the F.W1 sequencing-lock row + the F.W9/W10 row)"* — **self-enumerated, arithmetic closes, own table** ✓ |
| F-W8 | 5 | 1 | `:163` *"Carry — **28 rows**"* — **verified by self-count**: the §3 block holds 33 pipe-rows − 5 separators = **28 data rows** ✓ |
| F-W9 | 1 | 1 | `:503` *"GAB-13, **28 rows** re-measured"* — the dirty-tree measurement, same referent as `F-W0:126`; **not a census magnitude** ✓ |
| **F-W10** | **5** | **2** | ⌧ **`:363`, twice — THE ESCAPE. See P12-1.** |

**40 occurrences · 8 unchased-window · 7 correctly non-canonical · ONE live stale canonical
magnitude, at a single line, stated twice.**

⊙ **Quoted canonical row headings, re-run:** ⟨cmd⟩ `grep -ho '### F\.W…— \*\*[0-9]* rows\*\*'` over the
eleven → **24**, matching SEAL §4.7. Four bear superseded spellings — `F.W0 **57 rows**` (F-W0:225),
`F.W4 **1014 rows**` (F-W7:291), `F.W5 **28 rows**` ×2 (F-W6:476, F-W8:20) — and **all four carry an
on-line chase**, verified individually. ⟨cmd⟩ `grep -hoE '[0-9]+ records'` → **157**, matching.

### §4.1 This seat's own self-count probe. **ONE LIVE MEMBER.**

⟨cmd⟩ a python sweep over all eleven for receipts of the form `grep -c '<pat>' <own file>` whose
`<pat>` also occurs literally on the publishing line with no `NR!=` exclusion → **15 candidates**:
`F-W0:21` `:37` `:182` `:457` · `F-W1:363` · `F-W2:24` ×2 · `F-W3:359` `:885` · `F-W4:143` `:214` ·
`F-W7:359` · `F-W8:36` · `F-W10:287` ×2. **Fourteen are on the round-10 law's enumerated lawful list**
(self-excluding · struck-to-a-classification · retired-by-law-convicted-in-the-citing-cell ·
figure-expressly-not-banked · self-enumerated). The fifteenth, `F-W4:214`, is **not on the list and is
nonetheless lawful**: it re-pastes a *cross-file* receipt against `F-W3` and publishes no count over
its own file; the `L-26` token appears only inside a description of round 2's superseded
`grep -rln` shape, which the cell itself convicts. Its own-file `L-26` census is 9 lines
(`213 214 215 216 222 308 333 374 408`) and is nowhere claimed.

**The one live member is `F-W2:248`, whose receipt shape (`grep -oE … | sort -u | wc -l`) this probe
does not reach and which §5.1 measures directly. `selfCountLiveMembers = 1`.**

---

## §5 — AXIS 4: RECEIPT REALITY. **≥25 ⟨cmd⟩ RECEIPTS RE-RUN, INCLUDING EVERY ROUND-11 RE-CUT. `fabricated = 0`.**

### §5.1 `F-W2:248` — the paired figures ⌧ **THE VERBATIM ARM DOES NOT REPRODUCE**

| ⟨cmd⟩ | published by R11 | this seat |
|---|---|---|
| `grep -oE '⟨cmd⟩ \`[^\`]*\`' F-W2.md \| sort -u \| wc -l` | **84** | **86** ⌧ |
| `… \| grep -c '/Users/'` | 16 | **16** ✓ |
| `awk 'NR!=248' F-W2.md \| grep -oE … \| sort -u \| wc -l` | 81 | **81** ✓ |
| `… \| grep -c '/Users/'` | 16 | **16** ✓ |
| `comm -23` verbatim vs self-excluding | *"exactly **3**"* | **5** ⌧ |

**The five delta members, enumerated:** `` ⟨cmd⟩ `)***⟩ The four bases are named below…` `` ·
`` ⟨cmd⟩ `/usr/bin/awk 'NR!=248' F-W2.md | /usr/bin/grep -oE '⟨cmd⟩ \` `` (**the self-excluding probe the
cure itself added**) · `` ⟨cmd⟩ `/usr/bin/grep -oE '⟨cmd⟩ \` `` · `` ⟨cmd⟩ `grep -n 'grep -[a-z]*P' F-W2.md` `` ·
`` ⟨cmd⟩ `grep -no '[.]{0,[0-9]*}' F-W2.md` ``. **Two of the five are bytes the R11 chase note
introduced.** See **P12-2**.

### §5.2 Every other round-11 re-cut — **REPRODUCES**

| ⟨cmd⟩ | published | this seat |
|---|---|---|
| `grep -nE '…L-16…' F-W10.md` | eleven coords ending `442` | **identical** ✓ |
| `awk 'NR!=338' \| grep -c` | 10 | **10** ✓ |
| `grep -n "§2.5a-iii's 1[34]" F-W10.md` | `314 442 467`, `14·14·14` | **identical** ✓ |
| `grep -n '9 e2e never enter the audit tab' F-W9.md` | `185 289 461` | **identical** ✓ |
| `grep -nE '…L-26…' F-W9.md` | `119 304 505` | **identical** ✓ |
| `awk 'NR!=505' F-W9.md \| … \| grep -c 'fr-VisualizationView'` | 0 | **0** ✓ |
| `sed -n '783p' F-W3.md` | blank | **blank (1 byte)** ✓ |
| `grep -n 'F\.W9/W10' F-W3.md` | `815` | **`815`**, the `fr-AdminFlaggedPanel FR-AFP-42` row ✓ |
| `grep -rl "trie ruling stays inline" …/waves/` | `F-W7.md` alone | **alone** ✓ |
| `grep -o '^### F\.W4 — \*\*1007 rows\*\*' "$C"` | the heading | **exact** ✓ |
| the superseded `1014` heading form | 0 | **0** ✓ |
| `grep -c 'criterion negative → F.W4' "$C"` ⊕ names | 5 ⊕ five | **5** ⊕ `fr-BasisCanvas` `fr-ContourEditorCanvas` `fr-EquationResult` `fr-FourierMorphSvg` `fr-GalleryAdminBanner` ✓ |
| `… \| grep -o '\*\*fr-ContourEditorCanvas\*\* (40)'` | the string | **exact** ✓ |
| `sed -n '56p' fr-ContourEditorCanvas.md` | the `L-5` MAJOR row | **exact** ✓ |
| `grep -n 'C:C-23' F-W8.md` | eleven | **identical** ✓ |
| `grep -nF 'fr-PaperSearchDropdown' "$C"` | `:5428` | **`5428`**, inside `### UNROUTED` at **`5386`** ✓ |
| `grep -cF '(≡ M1' F-W10.md` / `awk 'NR!=446'` | 1 / 0 | **1 / 0** ✓ |
| quoted canonical headings / `N records` | 24 / 157 | **24 / 157** ✓ |

### §5.3 Superseded-digest chase audit — **CLEAN**

⟨cmd⟩ a per-line sweep over all eleven for the eleven superseded pin digests
(`3e0a9acb3381` `a450b8e9f80e` `01c9cd8efcd5` `c03149fc2f9e` `655a21e7a64d` `93bc1ebc4a24`
`7b427c227275` `16e35d5bb571` `16d587cb7d77` `66030d34992d` `d3fa14c669dd`) →
**27 occurrences, and ZERO lack a same-line chase or the live `f44362757458` beside them.**

### §5.4 Coordinate resolution — **18 / 18, ZERO DEAD**

⟨cmd⟩ `grep -ohE 'F-W[0-9]+\.md\`?:\`?[0-9]+'` over the corpus → 18 distinct addresses; **every one
is within its target file's length and resolves to the content its citing sentence names**:
`F-W0:199` (Q8) · `:204` (Q13 `PP-REDGATE`) · `:209` (Q18 residue) · `F-W1:1` `:7` `:272` `:276` `:363` ·
`F-W2:149` · `F-W3:783` (blank, correctly) `:815` · `F-W5:114` `:153` `:251` · `F-W7:218` ·
`F-W10:114`. **The single canonical-coordinate citation, `CENSUS-CANONICAL.md:393`, resolves.**
**Zero dead canonical coordinates.**

### §5.5 Fabrication

**ZERO.** §2.3's id-level `comm` returns the empty set in both directions on the largest pasted
roster (284/284). Every ⟨cmd⟩ re-run above produced output at the bytes; **no receipt in this corpus
was found to cite a file, line, id or string that does not exist.**

---

## §6 — AXIS 5: GATES AND POSTURE. **CLEAN.**

| gate | ⟨cmd⟩ / reading | verdict |
|---|---|---|
| canonical operands only | every magnitude traced to `$C` §1/§2/§3/§4; no spec measures the census from another spec | ✓ |
| portable commands | `grep -P` → **0**; the one `[.]{0,[0-9]*}` occurrence is `F-W2:248`'s **declared-negative** probe (returns nothing, which is its point); `\b` appears in 10 receipts and **BSD `grep -E` honours it** — ⟨cmd⟩ `printf 'FR-TT-1x\nFR-TT-1\n' \| /usr/bin/grep -cE '\bFR-TT-1\b'` → **1** | ✓ |
| no false universals in current voice | 9 bolded `EVERY`/`ALL` universals, each scope-declared; `F-W10:363`'s fabrication-test universal carries its REST-71 scope correction inline | ✓ |
| count-words match lists | ⌧ **one exception**: `F-W2:248`'s *"sixty-eight of the eighty-four"* — see **P12-2**. All others check | ⌧ 1 |
| F.W1 transaction whole | `F-W1:276` states the atomic tri-package transaction as **ONE change (G6)** — producer bump lockstep + Button rewrite + `copied`→`status` + lucide rename + G10 deletions + FR-EQC-7 | ✓ |
| W6/W7/W10 zero-roster postures | ⟨cmd⟩ `grep -c '^### F.W6 — ' "$C"` / `F.W7` / `F.W10` → **0 · 0 · 0**; `F-W10:363` states it in terms (*"Since F.W10's canonical roster is empty…"*) | ✓ |
| FR-NP-32 canonical form | live form ×3, retired bare spelling ×1 **inside its own strike**; self-excluding probe → **0** | ✓ |
| SS-4 flags inline | present in all eleven (14–46 mentions per file) | ✓ |
| fourier tree READ-ONLY | ⟨cmd⟩ `git status --short docs/tranches/X/fourier/` → the round-11 repair's own modified paths ⊕ untracked `PASS-11/SEAL.md`. **This seat wrote `PASS-12/CHECK.md` and nothing else** | ✓ |
| E-3 | no chase note deleted; every superseded reading preserved beside its cure | ✓ |
| zero `VERIFIED-YES` | `grep -c 'VERIFIED-YES'` → **0** across all eleven | ✓ |
| status planned | `status: planned` ×3; no wave claims execution | ✓ |
| no product source opened | this seat opened only the operand set named in the header | ✓ |

⊙ **Licensed E-3 history — checked and deliberately NOT re-filed:** `F-W8:40`'s `28 ⊕ 89 = 117`;
the quote-time digests in dated errata rows carrying chased sub-notes; the strike-quoted retired
spellings including the one lawful `(≡ M1` inside `~~…~~` at `F-W10:446`; `F-W0:225`'s round-5
`57 rows` minute; `F-W0:545`/`:564`'s superseded-generation list; `F-W10:322`'s round-4
`4278 → 4269`; `F-W6:476`/`:526`/`:601`; `F-W8:20`; `F-W7:291`; `F-W3:17`.

⊙ **Non-perturbation of this write.** The one probe in the corpus that was ever directory-scoped
(`F-W7:16`) was re-scoped to `waves/` at round 11; this file sits in `conformance/PASS-12/` and
cannot enter it. Every other self-count probe is scoped to a single wave file.

---

## §7 — THE DEFECTS

### ⌧ **P12-1 — HIGH. `F-W10:363` publishes a superseded canonical magnitude in the present tense, unchased, and a set-membership that is false on the same erratum.**

**The bytes**, twice on one line and in the present indicative:

> *"…the F.W9-roster reconciliation named in the next breath (**26 cut identities against a 17-row
> canonical roster**, the `C:D-11` / `L:L-i2` / `R2-7` divergences…)"*

> *"…the §2.2 table cuts **26 identities** while the canonical's **F.W9 roster is 17 rows**, and the
> two sets are not nested — the canonical homes `C:D-11` (fr-ContourPreview), `L:L-i2`
> (fr-ImageUpload) and **`R2-7` (fr-PaperArticleWindow) at F.W9**…"*

…and it is offered as *"the canonical figures measured"*, *"stated from this end, in terms"*.

**The frozen canonical.** `### F.W9 — **16 rows** *(errata round 5, 2026-08-29: read 17; `R2-7` →
TERMINAL at E5-16)*` — **16 rows across 15 records**, re-derived at §2.2 above by summing the roster
body, before this finding was read anywhere. ⟨cmd⟩ the F.W9 roster body carries
`fr-PaperArticleWindow (2): PAW-34 · PAW-50` and **no `R2-7`**; `R2-7` sits in **`TERMINAL (∅)`**
(`$C` `:3391`, `:3956`, `:5371`). **The one erratum that took 17 → 16 is the erratum that moved
`R2-7`** — the two halves are the same defect counted twice.

**Why no licence covers it.**
1. **No chase on the line.** ⟨cmd⟩ a ±320-character window over both occurrences finds no chase token.
   The single `re-based` on `:363` is inside the byte-true R4-10 quotation *"F-W9 | F.W9 → 17 |
   masthead re-based"* — the ruling's words about a **duty**, not a chase on the operand.
2. **The file already knows.** ⟨cmd⟩ `grep -c '16 rows' F-W10.md` → **0**; yet `:494` chases the very
   same spread — *"the 26-vs-17 F.W9 roster spread ⟨*16 at E5-16*⟩"*. **The cure exists 131 lines
   below and was not applied here.**
3. **The twin contradicts it.** `F-W9:109` prints ⟨cmd⟩ `grep -o '^### F\.W9 — \*\*16 rows\*\*' "$C"` →
   `### F.W9 — **16 rows**` as a verbatim receipt. **F-W9 is right about F-W9's own roster and F-W10
   is wrong about it.**
4. **It is unilaterally curable.** ⟨cmd⟩ `grep -c 'F.W9 roster is 17 rows'` → `F-W9.md` **0** ·
   `F-W10.md` **1**. The sentence is `F-W10`'s own prose, outside the shared §2.2 splice; **no Δ=∅
   lock stands between a round-13 seat and the cure.**
5. **Round 11 wrote this file twice and did not reach it** — cures landed at `:338` and `:467`;
   `:363` sits between them.

▲ **What survives:** the substantive conclusion — that the two sets are not nested and the
reconciliation is F-W9's duty under R4-10 — and the `C:D-11` / `L:L-i2` homings. **What must move:
the magnitude (17 → 16), the `R2-7` limb, and the cut count's denominator.**

⊘ **Class.** R11-1's instrument was right and its **run was incomplete**: this line matches the
declared context-anchor list on four anchors at once (`canonical` · `roster` · `rows` · `records`).
A sweep built to find exactly this walked past it. **This seat's §4 discharges the per-file
hit-count remedy the seal prescribed** — F-W10 is now demonstrably *visited*, and the escape is
demonstrably *the last one of its family*.

### ⌧ **P12-2 — MEDIUM. `F-W2:248`'s verbatim arm publishes a pre-write measurement. Third consecutive round.**

Published **84** distinct / *"sixty-eight of the eighty-four"* / *"exactly **3**"*; the bytes read
**86** / **70** / **5**. The **self-excluding arm is exact in all three figures** (81 · 16 · 65) and
both absolute-path counts are exact (16 · 16). Two of the five delta members are bytes **the R11 chase
note itself introduced**, including the self-excluding probe the cure added.

⊘ **The law, one word short.** R11-5 law 4 reads *"a cure that inserts lines re-bases every coordinate
at-or-below its insertion point in the same edit."* The generalisation owed is: **a cure that edits
bytes its own receipt COUNTS must re-measure the count after the write, not only re-base the
coordinates.** `F-W10:467` — same round, same class — made that generalisation and reproduces
perfectly (§5.2).

⊙ **Mitigation, stated.** **The substantive claim holds in every reading** — most commands run from a
declared base rather than an absolute path: 68/84 published, **70/86** live, **65/81** self-excluding.
The declared exclusion, the R3-3.8 both-forms requirement and the diagnosis are all correct.
**Only one arm of one receipt is false, and the paragraph around it is right.** Recurrence for the
record: round 10 published 83 / *sixty-seven*; round 11 published 84 / *sixty-eight*; the bytes read
**86 / seventy**.

### ⌧ **P12-3 — MINOR. `F-W7:101` attributes a MIXED-GENERATION pair to a single frozen ruling.**

⟨*REST-37: R4-5 makes F.W5 **(28)** and F.W5-W8 **(89)** two distinct canonical denominators; this
file states the band correctly elsewhere and the two sentences did not agree*⟩. **`28` is R4-5-era
F.W5, superseded at E6-3 (→ 27); `89` is the LIVE F.W5-W8, whose R4-5-era reading was 90 (superseded
at E5-15).** The pair is true of no state of the operand: either `28 · 90` (R4-5) or `27 · 89`
(frozen).

⊙ **Mitigations, stated.** It is a **dated `REST-37` repair minute** whose subject is the
*distinctness* of two denominators, not their values; its live-figure companion shows the seat was
not asserting a current census reading; and `F-W7` states the band correctly at `:217`, `:244` and
`:295`. **Not counted among the live stale magnitudes.** ⌧ But ⟨cmd⟩ `grep -c 'F-W7:101'` over the
eleven specs, the certificate and `PASS-11/CHECK.md` → **0 hits**: it is on **no** round's
"read and deliberately NOT cured" list. **It needs a ruling, not a rediscovery.**

### ⊙ **P12-4 — INFO (against an instrument, not the corpus). `PASS-11/SEAL.md` §2's count-word is one ahead of its list.**

The seal closes *"29 authority values … 8 row totals · 8 record counts · **8 §3 aggregates** · 3 §4.3
magnitudes · 2 §4.2 arithmetics"*. Its §3-aggregate sentence enumerates **seven** — records censused
66 · ROWS 4242 · expanded 4287 · ALIASES 2780 · NO-WAVE-OWNER 88 · TERMINAL 1220 · UNROUTED 307 — with
**wave-duty 2466** named only in the ▲ note below. The eighth is real and verified; **only its
placement makes the list read short.** E-3: recorded here, patched nowhere.

---

## §8 — WHAT THIS SEAT CHECKED AND FOUND CLEAN

The re-hash (13/13, canonical frozen a fourth round) · the corpus line-count arithmetic (6050 / 5989) ·
boundary-exact roster subtraction (residual **0**) · all 23 roster bodies against §3 · §1 ≡ §3 at 66
records / 4242 · §4.2 both arms (864 = 778 ⊕ 86; 282) · §4.3 all three magnitudes · two canonical-row
paste diffs (**zero mismatches**) · id-level fabrication/escape `comm` (284/284, **0/0**) · fourteen
E6-3 dispositions at both ends · ten of eleven pass-11 register items · 24 quoted canonical headings
incl. four superseded-with-chase · 157 `N records` claims · 27 superseded digests, **all chased** ·
18 coordinates, **zero dead** · 15 self-count candidates, **14 lawful by enumeration and the 15th
lawful on inspection** · portability (`grep -P` 0; `\b` proven on BSD) · zero `VERIFIED-YES` ·
status planned · zero-roster postures · F.W1 transaction whole · SS-4 inline · tree read-only ·
E-3 throughout.

---

## §9 — THE BAR

**CONFORMANT requires zero BLOCKER/CRITICAL/HIGH, hashes clean, roster closed, fabrication zero, and
a tail of MINOR-or-below with stated mitigations.**

Four of five conditions are met, and met well: **hashes clean · roster closed at zero ·
fabrication zero · the tail (P12-2 MEDIUM, P12-3 MINOR, P12-4 INFO) each carries a stated
mitigation.** Eleven rounds of monotone convergence are real and visible in the bytes.

**The fifth is not met.** `F-W10:363` is a **HIGH**: a superseded magnitude and a false
set-membership about the **sole census operand**, asserted in current voice, unchased, in a file that
carries the correct chase 131 lines lower, contradicted by its own twin, and unilaterally curable.
`PASS-11/SEAL.md` filed it; the bytes have not moved; this seat convicted it again from the canonical
outward.

> ### **NOT CONFORMANT.**
> `hashesClean = true` · `rosterEscapes = 0` · `fabricated = 0` · `defects = 1 HIGH · 1 MEDIUM · 1 MINOR · 1 INFO`
>
> **A round-13 append is owed, and it is small: the three-token cure at `F-W10:363` (17 → 16, the
> `R2-7` limb, the denominator), the post-write re-measure at `F-W2:248` (84 → 86, sixty-eight →
> seventy, 3 → 5), and a ruling on `F-W7:101`.** Nothing structural remains: the per-file hit-count
> discipline the seal prescribed is discharged in §4 of this file, and it found the escape.

⊙ **E-3 observed.** Nothing above was patched into any spec, into `CENSUS-CANONICAL.md`, into
`PIN-PURGE-CERT.md`, or into any `PASS-*` artefact. This check is a reading of them and never an
amendment to them.
