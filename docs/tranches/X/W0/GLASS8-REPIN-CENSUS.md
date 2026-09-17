SERVED MODEL: claude-opus-5[1m]

# The Glass-8 Repin Census — X-W0.j (CC-003's trigger · CC-109 · CC-116 · CC-117)

**Unit**: X-W0.j · Track A (X·V) · wave X-W0 · **Seat**: Opus (`claude-opus-5[1m]`), group 3
**Spec**: `docs/tranches/X/waves/W0.md` §Agent Units `:208–213` · §Scope 10 `:33` · §Blocked rows `:55` ·
**HG-18** `:325–332` · **§ADDENDUM 2026-08-30** `:413–489` · §Commit Plan row 9 `:379`
**Fold layer**: `docs/tranches/X/refinement/X-W0-FOLD.md` — **G-A** `:477–484` · rows **W0.3** `:138` ·
**W0.4** `:153` · **W0.18** `:413` · **W0.19** `:430`
**Rulings consumed, never re-opened**: COHESION **§0i.2** (the election) · **§0i.5** (the erratum) ·
`EXECUTION-RUNBOOK.md` **§3.2**
**Date of this census**: **2026-09-17**. **HEAD at open**: `456c3422` ⟨`git log --oneline -1`⟩.
**Clock at open**: `2026-09-17 13:35:51 EDT` ⟨`date "+%Y-%m-%d %H:%M:%S %Z"`⟩.

---

## §0 · THE VERDICT WORD

> ## **FAIL** — at the elected target **8.0.0**, the census reads **1 of 4**.
>
> **X-W4.g stays CLOSED. The bank stays shut. No byte of the cut is performed here.**
> A FAIL is a **complete, dated result, not a deferral** (`W0.md:12`, `:211`).

Stated at the second polarity as the §ADDENDUM clause 1 requires — **the verdict names which target it
is a verdict about**:

| candidate | tag → commit | conditions met | verdict |
|---|---|---:|---|
| **8.0.0 — THE ELECTED TARGET** (COHESION §0i.2) | `v8.0.0` → `17a11bc5` | **1 / 4** | **FAIL** |
| 9.0.0 — the recorded successor fact (not elected) | `v9.0.0` → `d4f7b24f` | **0 / 4** | FAIL |

Conditions 1–3 read the **installed tree**, which is one tree at one clock, so they are
candidate-invariant today. Condition 4 is **target-relative** (§ADDENDUM clause 3) and is the only
condition whose reading differs between the two candidates — and it differs **against** 9.0.0, which
corroborates §0i.2 at bytes §0i.2 did not cite. See §2.4.

---

## §1 · THE ELECTED TARGET — CITED, NOT RE-ELECTED

The election is **not this unit's to make and is not made here**. It was ruled at the owner's
2026-09-17 sitting under delegation:

> **COHESION `§0i.2` · X-W0.j — the glass election for value.js: 8.0.0, registry-pinned (`v8.0.0` @
> `17a11bc5`).** *"**Ruled: 8.0.0.** Receipts: (1) PIN-LAW's registry half is satisfiable only at
> 8.0.0 — the registry holds 8.0.0 and does not hold 9.0.0; (2) §EXTERNAL X-EXT-1..6 were minted
> against the 8.0.0 letter (I-28) and their receiving cells … are sized for it; (3) **9.0.0 removes
> `./search` whole, and value.js consumes it at four live sites** …; (4) the runbook's own law at
> §3.2 — *"an owner electing 9.0.0 knows it elects a tag."* Nothing here elects a tag."*

**§0i.5's erratum is carried, as this unit is instructed to carry it** (E-3: receipt (3) stands as
written; the erratum corrects it beside):

> **COHESION `§0i.5`.** *"The four `SearchBar` import sites are **already budgeted for removal**:
> §EXTERNAL **X-EXT-1** … lands their removal inside the X-W4.g atomic cut. So 9.0.0's `./search`
> export removal is **not an additional break** once the cut lands; receipt (3) overstated it. **The
> ruling does not move**: receipts (1) registry-pinned vs tag-only, (2) the six §EXTERNAL rows sized
> at 8.0.0, and (4) the audited hash (`17a11bc5`; no seat has audited `d4f7b24f`'s bytes) carry it
> alone."*

§0i.2's own re-entry clause is recorded so the next census reads it rather than re-deriving it:
*"**9.0.0 is recorded as the successor fact** and re-enters X-W0.j's enumeration as a candidate the
moment `npm view @mkbabb/glass-ui version` returns 9.0.0 (that is the re-trigger; the census re-runs,
nothing is pre-decided)."* At this census's clock that command returns **8.0.0** (§3), so the
re-trigger has **not** fired.

---

## §2 · THE FOUR CONDITIONS — MEASURED VALUE BESIDE PASS/FAIL, PER CANDIDATE

CC-003's four machine-checked conditions, verbatim from the ledger row
(`registry/CARRY-CUT-LEDGER.md:55`) and from `W4.md:298–301`:

> *installed `@mkbabb/glass-ui` major **≥ 8** AND `./watercolor-dot` **absent** from packed exports AND
> the **consumer-painted indicator slot (TR#84)** present in declarations + packed exports AND the
> Glass receipt names its keyboard/orientation/motion contract — all four machine-checked before the
> writer opens product source.*

All four probes run **read-only**. `package.json` and `node_modules/@mkbabb/glass-ui/**` were
**read/hashed only** (spec §File Bounds "Do NOT touch"); `../glass-ui` is READ-ONLY always. **Every
figure below is double-run** (WRITE-THEN-MEASURE).

### §2.1 · Condition 1 — installed major ≥ 8

⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩
```
7.0.0
```
Double-run: `7.0.0` · `7.0.0`. The declared pin, ⟨`grep -n '@mkbabb/glass-ui' package.json`⟩:
```
83:        "@mkbabb/glass-ui": "^7.0.0",
```

| candidate | required | **measured** | |
|---|---|---|---|
| **8.0.0** | major ≥ 8 | **7.0.0**, pin `^7.0.0` | **FAIL** |
| 9.0.0 | major ≥ 8 | **7.0.0**, pin `^7.0.0` | **FAIL** |

**Reading note (§ADDENDUM clause 2, carried verbatim in force):** `major ≥ 8` *"is satisfied by either
candidate; **satisfying it does not elect one**. The elected target is a recorded datum of the census,
not an inference from the predicate."* Today the predicate is satisfied by **neither**, which is a
stronger statement than the note anticipates and does not change it.

### §2.2 · Condition 2 — `./watercolor-dot` absent from the packed exports

⟨`node -p "Object.keys(require('./node_modules/@mkbabb/glass-ui/package.json').exports).filter(k=>/watercolor/.test(k)).join(',')||'ABSENT'"`⟩
```
./watercolor-dot
```
Double-run: `./watercolor-dot` · `./watercolor-dot`. This is HG-18's own falsifier firing as designed
— *"pass the census on a partial condition … and probe 2 prints the subpath, naming the failure."* The
subpath is printed. Its packed target, ⟨`node -p "JSON.stringify(require('./node_modules/@mkbabb/glass-ui/package.json').exports['./watercolor-dot'])"`⟩:
```
{"types":"./dist/watercolor-dot.d.ts","import":"./dist/watercolor-dot.js"}
```
Export-surface size at this pin: **74** subpaths ⟨`node -p "Object.keys(…exports).length"`⟩.

| candidate | required | **measured** | |
|---|---|---|---|
| **8.0.0** | `ABSENT` | **`./watercolor-dot` PRESENT** | **FAIL** |
| 9.0.0 | `ABSENT` | **`./watercolor-dot` PRESENT** | **FAIL** |

**Consumer-side consequence, measured at this clock (context for the FAIL branch, not a fifth
condition)** ⟨`grep -rn 'glass-ui/watercolor-dot' demo/ | wc -l`⟩ → **11**;
⟨`grep -rln 'glass-ui/watercolor-dot' demo/ | wc -l`⟩ → **11** (double-run **11** / **11**) — eleven
import sites across eleven SFCs, exactly the set `W4.md:310–318` sizes the cut for:
`MixSourceSelector.vue` · `MixResultDisplay.vue` · `GenerateControls.vue` · `ImageEyedropper.vue` ·
`ConsoleRail.vue` · `SpectrumCanvas.vue` · `Dock.vue` · `EmptyState.vue` · `ColorSpaceSelector.vue` ·
`SwatchHoverMenu.vue` · `CurrentPaletteEditor.vue`. **X.W4.g's G1 born-RED (11) reproduces exactly at
2026-09-17.** No byte of it is touched here.

### §2.3 · Condition 3 — the TR#84 consumer-painted indicator slot, in declarations **and** packed exports

**Declarations half** ⟨`grep -rn indicator node_modules/@mkbabb/glass-ui/dist --include='*.d.ts' | grep -ic slot`⟩
```
0
```
Double-run: `0` · `0`. The token `indicator` *does* occur in the `.d.ts` surface — but every
occurrence is the **traveling selection indicator** (`useSelectionIndicator.d.ts`,
`useSelectionGroup.d.ts`, `useDragMorph.d.ts`, the `--tab-indicator-*` fallbacks), which is a
producer-owned motion writer, not a consumer-paintable slot. **Zero declarations pair `indicator` with
a slot.**

**Packed-exports half** — probed at the two surfaces that would carry it:
⟨`grep -o 'renderSlot' node_modules/@mkbabb/glass-ui/dist/select.js | wc -l`⟩ → **0** ·
⟨`grep -o 'indicator' … select.js | wc -l`⟩ → **0** ·
⟨`grep -o 'hideIndicator' … select.js | wc -l`⟩ → **0** ·
⟨`grep -o 'select-dot-color' … select.js | wc -l`⟩ → **0**.

| candidate | required | **measured** | |
|---|---|---|---|
| **8.0.0** | slot present in decls **and** packed exports | **0 decls · 0 packed-export hits** | **FAIL** |
| 9.0.0 | slot present in decls **and** packed exports | **0 decls · 0 packed-export hits** | **FAIL** |

The consumer-side witness and producer coupling this condition carries are recorded at **§7 (fold
W0.18)**.

### §2.4 · Condition 4 — the receipt names its keyboard / orientation / motion contract (TARGET-RELATIVE)

**§ADDENDUM clause 3 governs this condition and is quoted in force:** *"the receipt required is the
receipt **of the elected target**. … **Neither substitutes for the other**, and an 8.0.0 receipt does
not discharge a 9.0.0 election."*

**The 8.0.0 receipt (the elected target's).** Two artefacts, both read-only:

1. The value.js-addressed letter, **INBOX I-28**:
   `../glass-ui/docs/tranches/BJ/coordination/glass-outbound-2026-08-09-value.js-8.0.0-addendum.md`
   ⟨`wc -c`⟩ → **7,514 B** · ⟨`shasum -a 256 … | cut -c1-12`⟩ → **`22b83a975e4b`** · mtime
   `2026-08-25 11:38`. Measured for the contract words: ⟨`grep -ci keyboard`⟩ → **0** ·
   ⟨`grep -ci orientation`⟩ → **0** · ⟨`grep -ci motion`⟩ → **0**. **This letter alone does NOT satisfy
   condition 4** — it is a consumer-edge addendum (`./forms`→`./input`, `grain`, the `SearchBar` §5
   relay), not the release receipt.
2. The release receipt: `../glass-ui/MIGRATION.md` **§8.0.0**, `:114–624` (511 lines, 35,572 B of the
   248,767 B file). Measured over exactly that range ⟨`awk 'NR>=114 && NR<=624' … | grep -ci <word>`⟩:
   **keyboard 2 · orientation 2 · motion 1**, at these absolute lines:

   ```
   :198  | `pulse` | `motion` — `"full"` (default) breathes the live `active` state; `"off"` opts
         down. Liveness is an axis of this component, never a second component. Reduced motion
         always wins. |
   :252  - **`<Metric orientation>` is `<Metric posture>`** — `inline | stacked | cell | row`.
   :262  things now carry three names: a vertical dock is `<GlassDock orientation="vertical">`,
   :433  keyboard contract; there is no drop-in replacement for `variant="scrubber"` and none is
   :599  lifts one rung while a descendant holds keyboard focus, the grain overlay is gone with its
   ```

   **All three contract words are named. Condition 4 PASSES at the elected target.**

**The 9.0.0 receipt (the non-elected candidate's).** The ACK (**INBOX I-30**) names its own datum:
*"`MIGRATION.md` §9.0.0 is the re-read datum"*. Measured over exactly that section, `:8–49`
⟨`awk 'NR>=8 && NR<=49' ../glass-ui/MIGRATION.md | grep -ci <word>`⟩: **keyboard 0 · orientation 0 ·
motion 0**. The section is headed *"9.0.0 — UNRELEASED (in flight; not on the registry)"*.

| candidate | required | **measured** | |
|---|---|---|---|
| **8.0.0** | the target's receipt names keyboard / orientation / motion | `MIGRATION.md` §8.0.0 — **keyboard 2 (`:433`, `:599`) · orientation 2 (`:252`, `:262`) · motion 1 (`:198`)** | **PASS** |
| 9.0.0 | the target's receipt names keyboard / orientation / motion | `MIGRATION.md` §9.0.0 (`:8–49`, the ACK's named datum) — **keyboard 0 · orientation 0 · motion 0** | **FAIL** |

**This is a finding, recorded because it was measured and not inherited.** The wave record's open
measurement read condition 4 as *"receipts **EXIST** for both candidates … → PASS"* — a
**receipt-existence** reading. Measured at the condition's own words, **existence is not the test**:
the receipt must *name the contract*. At 8.0.0 the verdict is unchanged (PASS, now on the contract
words rather than on existence). At 9.0.0 it **flips to FAIL**, which is why the 9.0.0 row reads 0/4
here and 1/4 in the open baseline. **No ruling moves**: 8.0.0 is the elected target and its condition 4
passes either way; the datum strengthens §0i.2's receipt (4) at bytes §0i.2 did not cite. The
divergence is stated rather than reconciled silently, per HG-18's own *"a census recorded without its
four measured values is not a verdict."*

### §2.5 · The tally

| # | condition | **8.0.0 (elected)** | 9.0.0 (not elected) |
|---|---|---|---|
| 1 | installed major ≥ 8 | **FAIL** — `7.0.0`, pin `^7.0.0` | FAIL — `7.0.0` |
| 2 | `./watercolor-dot` absent | **FAIL** — `./watercolor-dot` present | FAIL — present |
| 3 | TR#84 slot in decls + packed exports | **FAIL** — `0` decls, `0` packed hits | FAIL — `0` / `0` |
| 4 | the target's receipt names kbd/orient/motion | **PASS** — 2 / 2 / 1 at `MIGRATION.md` §8.0.0 | FAIL — 0 / 0 / 0 at §9.0.0 |
| | **CENSUS** | **1 / 4 → FAIL** | **0 / 4 → FAIL** |

**The census PASSES only if all four pass** (HG-18 `:326`). It does not.

---

## §3 · THE §ADDENDUM DATUM — RECORDED BESIDE THE FOUR, NOT A FIFTH CONDITION, DOES NOT GATE

§ADDENDUM clause 4, in force verbatim: *"**A NEW MEASURED DATUM, RECORDED BESIDE THE FOUR — not a
fifth condition.** … **This does not gate the census** — HG-18 stays a four-condition gate and its
falsifier is untouched. It exists so that an owner electing 9.0.0 is **electing a tag and knows it**."*

| candidate | ⟨`npm view @mkbabb/glass-ui@<t> version`⟩ | ⟨`git -C ../glass-ui tag --list v<t>`⟩ | ⟨`git -C ../glass-ui rev-parse --short=8 'v<t>^{commit}'`⟩ | state |
|---|---|---|---|---|
| **8.0.0** | `8.0.0` | `v8.0.0` | **`17a11bc5`** | **REGISTRY-RESOLVABLE** |
| 9.0.0 | `npm error 404  The requested resource '@mkbabb/glass-ui@9.0.0' could not be found or you do not have permission to access it.` | `v9.0.0` | **`d4f7b24f`** | **TAG-ONLY** |

⟨`npm view @mkbabb/glass-ui version`⟩ → **`8.0.0`** — `latest` is 8.0.0; 9.0.0 is absent from the
registry's version list.

**Caution recorded once, at the bytes.** ⟨`git -C ../glass-ui show-ref --tags | grep -E 'v8\.0\.0|v9\.0\.0'`⟩
returns `478aa462…` and `6d71e663…` — those are the **annotated-tag objects**, not the commits. The
ruled hashes resolve only through `^{commit}`: `17a11bc5` and `d4f7b24f`, exactly as §0i.2 and I-30
state them. A seat reading `show-ref` or a bare `rev-parse` would report two hashes that match no
ruling and conclude a drift that does not exist. Stated so the next census does not.

**Why this datum stands where it does.** §0i.2's receipt (1) — *"PIN-LAW's registry half is satisfiable
only at 8.0.0"* — is **corroborated at this seat's own clock, 18 days after the ruling**: the registry
resolves 8.0.0 and 404s 9.0.0. The publish wall is an **owner act**, not glass work
(§0i.5: *"the cure is an owner act (re-mint the token / `npm login`, then `npm publish` off the
`v9.0.0` tag tree …), not glass work"*). Nothing in this census asks for it, and nothing in this
census waits on it.

---

## §4 · WHAT THE FAIL DOES — AND WHAT IT FORBIDS

1. **X-W4.g stays CLOSED.** `W4.md:288` — *"CLOSED unless X-W0.j's census returns PASS."*
   `W4.md:151` — *"in the FAIL branch every row below is untouchable and the `watercolor-dot`
   exclusion at the foot of this section is absolute."*
2. **The bank stays shut.** Spec §Blocked rows `:55` names **seven cut rows** — CC-003, CC-044,
   CC-105, CC-106, CC-113, CC-114, CC-115 — that *"stay banked and land at X-W4.g."*
3. **Not one byte of the cut is performed here.** §Triumvirate Dispatch bullet 5: *"performing any
   part of the atomic cut here — a `watercolor-dot` deletion, a shim, a copied selector — invalidates
   the wave."* This unit created exactly one file, `docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md`, and
   wrote no other byte. See §11.
4. **X-W4's glass-independent partition (.a–.d) is unaffected**, either way (`W0.md:391`).
5. **X-W11's release table transposes this verdict** (`W0.md:211`): *"On FAIL … this verdict is what
   X-W11's release table transposes."* It is dated 2026-09-17 and is not to be inherited undated.

### §4.1 · Eleven, or seven? — both figures stated, neither silently elected

The spec says the trigger gates *"eleven banked rows"* (`W0.md:210`) and the §ADDENDUM says a FAIL
*"leaves X-W4.g closed and the eleven §1.M rows banked"* (`:471`). §Blocked rows `:55` names **seven**.
Measured at the ledger: ⟨`grep -n 'BLOCKED-ON.*11' registry/CARRY-CUT-LEDGER.md`⟩ →
`:270 | BLOCKED-ON | **11** (CC-003, CC-044, CC-105, CC-106, CC-107, CC-110, CC-111, CC-112, CC-113,
CC-114, CC-115) |`.

**The two figures are both true of different sets, and the difference is four rows whose trigger is
not this census:**

| row | its own trigger, at the ledger's bytes | gated by THIS census? |
|---|---|---|
| CC-107 | *"**BLOCKED-ON TR#47's dock publish**"* (`:219`) | **no** |
| CC-110 | *"**BLOCKED-ON TR#47's resolution**"* (`:222`) | **no** |
| CC-111 | *"**BLOCKED-ON that publication**"* (TR#68, `:223`) | **no** |
| CC-112 | *"**BLOCKED-ON TR#78's canon publication**"* (`:224`) | **no** |

So: **11** is the §1.M BLOCKED-ON total; **7** is the set this census's FAIL holds shut. The four above
stay banked on their own producer triggers and are **neither released nor further blocked** by this
verdict. Recorded as a finding for the wave, not as an edit to any spec byte (E-3).

---

## §5 · **G-A** — THE FAIL BRANCH, ENUMERATED BY ID (the gate this census turns beside HG-18)

> **Fold `X-W0-FOLD.md` §2 G-A, verbatim:** *"**G-A · SHARPENS HG-18 — the FAIL branch is enumerated,
> not merely recorded.** The census file names, by row id, every adjudicated disposition that is
> trigger-gated on it, with its FAIL home. … *Falsifier*: drop one id and the set-difference against
> `grep -o 'X[-.]W4\.g' registry/adjudicated/*.md` names the missing row. *Why it fails for its
> intended reason*: a FAIL that says only "the bank stays shut" leaves 62 bookings homeless."*

### §5.1 · The denominator, measured at this census's clock

⟨`grep -ro 'X[-.]W4\.g' docs/tranches/V/megatranche/registry/adjudicated/*.md | wc -l`⟩ → **62**
(double-run **62**).
⟨`… | grep -rl … | wc -l`⟩ → **10** records.
⟨`grep -roc 'X[-.]W4\.g' …/*.md | grep -v ':0$'`⟩ — the per-record split:

```
AboutPane.md:2   AuroraPane.md:3   EmptyState.md:7   wb-extract-imageeyedropper.md:7
wb-extract-controls.md:9   wb-mix-resultdisplay.md:4   wb-mix-pane.md:5
wb-mix-animationcanvas.md:10   wb-generate-pane.md:7   wb-mix-sourceselector.md:8
```
`2+3+7+7+9+4+5+10+7+8` = **62**. The fold's born-RED figure — *"corpus-wide **62 `X-W4.g`
dispositions across 10 records**"*, measured 2026-08-28 — **reproduces exactly, 20 days on**.

The 62 occurrences sit at **54 distinct sites**
⟨`grep -rn 'X[-.]W4\.g' …/*.md | cut -d: -f1,2 | sort -u | wc -l`⟩ → **54**, double-run **54**;
**7 lines** carry the token more than once ⟨`grep -rno … | cut -d: -f1,2 | sort | uniq -c | awk '$1>1'`⟩,
contributing **8** extra occurrences (one line ×3, six lines ×2). **54 + 8 = 62.** Both numbers are
published so the set-difference closes on either: **41 occurrences are id-bearing dispositions** and
**21 are non-row sites** (instruments blocks, route legends, wave-authority headers, closing-verdict
restatements, reader-assessment prose), enumerated below with the same rigour because the falsifier
greps occurrences, not rows. **41 + 21 = 62.** Distinct row ids: **32**.

### §5.2 · The enumeration — every id, every site, every FAIL home

`ROW` = an id-bearing adjudicated disposition. `LEGEND` / `HEADER` / `INSTRUMENTS` / `VERDICT` /
`NOTE` / `ASK` / `KILL` = a non-row site. `×n` = occurrences on that one line.

#### `adjudicated/AboutPane.md` — 2 occurrences · 1 row id

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:64` | **AB-15** | ROW | *"`ColorSpaceSelector.vue:64` ships `hide-indicator` … **DISPOSITION: X-W4.g — CC-113 (A-18 …)**"* | **CC-113 stays BLOCKED-ON in §1.M** — AboutPane mints no `*-CLUSTER`; the row's home is the bank itself (`CARRY-CUT-LEDGER.md:225`) |
| `:164` | AB-15 (restated) | VERDICT | *"the indicator row banks at **X-W4.g/CC-113**"* | same — CC-113, banked |

#### `adjudicated/AuroraPane.md` — 3 occurrences · 2 row ids

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:35` | **R-8** | ROW (ruling table) | *"X-W8 lists `ConfigSliderPane.vue:202` under CC-105 BLOCKED-ON the 8.0.0 repin with receiving surface X-W4.g — the CSP G-PAINT ruling and the CC-105 booking **must be reconciled by the X-W0 sitting**, not silently by either wave."* | **the X-W0.g owner sitting** (the CC-105 ⇄ G-PAINT reconciliation), **not** a cluster |
| `:79` | **AP-17** | ROW | *"Identity = CSP C-3/D-3/D-4/D-14 → **G-PAINT single cut**; the CC-105/X-W4.g BLOCKED booking tension is recorded for the X-W0 sitting."* | **the CSP G-PAINT register** (the identity's home) **+ the sitting** |
| `:173` | AP-17 (§4) | NOTE | *"two live registers claim the `--slider-track-bg` sites — one BLOCKED-ON the 8.0.0 repin with receiving surface X-W4.g, one ruling the paint demo-curable now … flags the reconciliation to the X-W0 sitting rather than silently electing either."* | **the sitting** |

#### `adjudicated/EmptyState.md` — 7 occurrences · 2 row ids

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:9` | — | HEADER (§Wave authority) | *"**X-W4.g** (trigger-gated on the X-W0.j census) holds the WatercolorDot impostor seats and the `WatercolorSwatch.vue` successor"* | header, not a row (fold's own class at `X-W0-FOLD.md:697`) |
| `:48` ×3 | **ES-15** (MAJOR) | ROW | *"WatercolorDot 7.0.0 renders NO slot, so every child passed to it silently drops — three shipped sites lose their glyph"* | **NO-WAVE-OWNER** — EmptyState mints no `*-CLUSTER`; `:126` books exactly *"**1 → X-W4.g**"*, and on FAIL it books nowhere else |
| `:53` | **ES-20** (MINOR) | ROW | *"`tag="div"` ×3 passed to a prop glass-ui 7.0.0 deleted … the repo-wide sweep is the standing glass-7 `tag=` residue identity (CSS-adj L-8) now embodied in **X-W4.g**"* | **the standing glass-7 `tag=` identity stays banked** (≡ EY-27 ≡ ES-20 ≡ CPE L-12 ≡ CSS L-8) |
| `:98` | ES-15's producer question | ASK | *"the consumer-side cure is X-W4.g's `WatercolorSwatch`/seat split either way"* | **glass BH relay** (producer end); the consumer end stays banked |
| `:126` | ES-15 (restated) | VERDICT | *"**1 → X-W4.g** (trigger-gated impostor/no-slot boundary, Dock limb noted to X-W5)"* | as `:48` |

#### `adjudicated/wb-extract-controls.md` — 9 occurrences · 3 row ids

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:8` | — | INSTRUMENTS | the arbiter's static-only instruments block | n/a |
| `:12` | headline 1 | HEADLINE | *"**The pinned file has no owner in tranche X.** … The only named receiving surface for ANY of its bytes is CC-105 … → **X-W4.g**, trigger-gated on the X-W0.j Glass-8 repin census, **and W4.g's own bounds table omits the file** — a spec inconsistency the formation boundary must reconcile."* | **NO-WAVE-OWNER** + the receiving-bounds delta at **§6** |
| `:13` | headline 2 | HEADLINE | *"**CC-105/X-W4.g is the receiving surface for the whole track-material cluster** (rail div, ring, thumb tokens, tier differentiation)"* | **NO-WAVE-OWNER** |
| `:35` | route legend | LEGEND | *"**X-W4.g/CC-105** = banked, census-gated; **NO-WAVE-OWNER** = booked for the next formation boundary"* | **defines this record's FAIL home** |
| `:40` | **EC-2** | ROW | *"the ring is the fill, and when it isn't, it paints on the wrong referent"* | **NO-WAVE-OWNER** (fold W0.4 classes EC-2 ESCAPE) |
| `:41` | **EC-3** | ROW | *"the sole value carrier of both axes is a producer-default thumb — transparent fill, `--background`-coloured border"* | **NO-WAVE-OWNER** (W0.4 ESCAPE) |
| `:63` | **EC-22** | ROW | *"no tier differentiation between the protagonist and the support axis … → **X-W4.g via CC-105** (+ X-W10 canon awareness)"* | **NO-WAVE-OWNER**; the X-W10 canon-awareness limb is unaffected by the census |
| `:153` | reader assessment | ASSESSMENT | *"neither read the X wave files, so neither knew CC-105 already owns the track sites, **that X-W4.g is census-gated**, or that the pinned file has no owner at all"* | meta; no booking |
| `:160` | closing verdict | VERDICT | *"**3 to X-W4.g via CC-105** (the track-material cluster: ring, thumb/value-carrier, tier split)"* | **NO-WAVE-OWNER** (= EC-2 · EC-3 · EC-22) |

#### `adjudicated/wb-extract-imageeyedropper.md` — 7 occurrences · 3 row ids

Its FAIL home is named in its own route legend, `:34`: *"**EY-CLUSTER** = the eyedropper
interaction/render cluster (this record's NO-WAVE-OWNER booking, sibling to wb-extract-pane's session
cluster)."*

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:6` | — | INSTRUMENTS | the installed-7.0.0 `watercolor-dot.js` probe block | n/a |
| `:10` | headline 1 | HEADLINE | *"**The interaction core has NO owning wave.** … The only bounds hit in all of tranche X is X.W4.g's *trigger-gated, face-only* carve (closed unless X-W0.j's census PASSes)."* | **EY-CLUSTER** |
| `:47` | **EY-7** | ROW | *"the confirmation pulse fires once per MOUNT and is silent forever after — the `@animationend` reset is never attached"* | **EY-CLUSTER** (W0.4 ESCAPE) |
| `:70` | **EY-27** | ROW | *"dead `tag="div"` on WatercolorDot … the repo-wide `tag=` sweep is ONE identity …; **this site dies in X.W4.g**"* | **EY-CLUSTER**; the `tag=` identity stays banked |
| `:75` ×2 | **EY-32** | ROW | *"the specimen dot's silhouette re-randomises on every sample — a writhing swatch during hover, a hard shape-cut per move under PRM"* | **EY-CLUSTER** (rides EY-7/EY-27); its PRM limb is also fold G-C's |
| `:163` | closing verdict | VERDICT | *"**2 rows to X.W4.g** (trigger-gated face carve: EY-7, EY-27, with EY-32 riding)"* | **EY-CLUSTER** |

#### `adjudicated/wb-generate-pane.md` — 7 occurrences · 4 row ids

Its FAIL home is stated in its own route legend, and it is the corpus's most explicit FAIL-branch
sentence — `:38`: *"**X-W4.g rows are trigger-gated** (CLOSED unless the X-W0.j Glass-8 census PASSes
— **on FAIL they join the cluster**); **NO-WAVE-OWNER** rows are booked for the next formation
boundary. **GEN-CLUSTER** = GeneratePane.vue · useColorGeneration.ts · generate-color.ts · …"*

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:38` | route legend | LEGEND | quoted above | **defines GEN-CLUSTER as the FAIL home** |
| `:43` ×2 | **GEN-2** (**BLOCKER**) | ROW | *"the per-swatch copy verb does not exist at runtime and the pane's entire colour output is erased from the accessibility tree"* | **GEN-CLUSTER** |
| `:52` | **GEN-8** | ROW | *"the count slider's thumb is a 12px transparent ring over arbitrary user colour — the component's one true tap-target failure"* (the CC-105 rail limb) | **GEN-CLUSTER** |
| `:75` ×2 | **GEN-28** | ROW | *"WatercolorDot's silhouette seed is captured once at setup while its colour is watched … Cosmetic while GEN-2 keeps the dots inert; **moot if X-W4.g deletes the dot**. → **glass-ui BH relay**"* | **glass BH relay** (producer end, unaffected by the census) + **GEN-CLUSTER** (consumer end) |
| `:108` | **K-14** | KILL | *"P051 … rules the button/tag branch REMOVED in the clean major … **X-W4.g's mechanism ratifies the local-seat cure** and CC-044 forbids the forwarding ask."* | the kill stands on its own; **no booking is owed** and none is invented |

#### `adjudicated/wb-mix-animationcanvas.md` — 10 occurrences · 6 row ids

Its FAIL home is stated in its own closing verdict, `:167`: *"**3 riding X.W4.g trigger-gated (falling
to MX-CLUSTER if the census never fires)**"*.

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:7` | — | INSTRUMENTS | the installed-7.0.0 node probe block | n/a |
| `:33` | **MX-41** (severity ruling) | ROW (ruling table) | *"LATENT: the colors add path is dead (MX-3), so no chip can exist today — **the row goes live the day X.W4.g revives the add seats**, which is exactly why the same wave must carry both."* | **MX-CLUSTER** |
| `:43` | **MX-1** (**BLOCKER**) | ROW | *"`[data-mix-target]` cannot render; every convergence lands on a fabricated target ~194 px from the well, behind a masking fallback"* | **MX-CLUSTER** |
| `:47` | **MX-2** | ROW | *"on every `done → mixing` re-mix the anchor is structurally absent at measure time — independent of the attribute drop, fatal to all three corpus cures"* | **MX-CLUSTER** |
| `:48` | **MX-3** | ROW | *"both e2e specs gating this component are structurally unsatisfiable, and NO CI job runs playwright at all"* | **MX-CLUSTER**; its CI limb rides **X-W1**, which the census does not gate |
| `:57` ×2 | **MX-32** | ROW | *"the palette mix result — the only arm a real user can reach — has NO text alternative"* | **MX-CLUSTER** |
| `:59` ×2 | **MX-41** | ROW | *"the chip remove control is a nameless, 16 px, hover-revealed button"* | **MX-CLUSTER** |
| `:167` | closing verdict | VERDICT | quoted above | **MX-CLUSTER — named in the record's own bytes** |

#### `adjudicated/wb-mix-pane.md` — 5 occurrences · 4 row ids

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:27` | route/bounds legend | LEGEND | *"**X.W4.g is trigger-gated** (impostor-seat carve `:168`/`:215` + face-only MixResultDisplay); X.W4.d holds the shell dispatch"* | **MX-CLUSTER** |
| `:31` | **C-1 ≡ D-5(A) ≡ DC-2's premise** | ROW (fold) | *"→ **MX-1 + MX-3 + ES-15 + PreviewRamp R-1/R-11** (BLOCKER at home) … **Routes stand: MX-CLUSTER + X.W4.g (trigger-gated) + X-W6.j**"* | **MX-CLUSTER** — in-record, explicit |
| `:35` | **DD-5** | ROW (fold) | *"→ **MX-41** (MAJOR-latent, nameless 16 px hover-only remove) → X-W6.j / X.W4.g"* | **X-W6.j / MX-CLUSTER** |
| `:72` | **MP-4** | ROW | *"the add-slot ghost is doubly enrolled in the forced-colors tier-1 exemption … contractually prevented from WHCM rescue"* | **MX-CLUSTER** |
| `:73` | **MP-5** | ROW | *"the chip remove button carries `z-popover` … → rides **MX-41** (X-W6.j / X.W4.g)"* | **X-W6.j / MX-CLUSTER** |

#### `adjudicated/wb-mix-resultdisplay.md` — 4 occurrences · 2 row ids

Its route legend, `:37`, defines the home: *"**MX-CLUSTER** = NO-WAVE-OWNER booking (mixStage.ts ·
useMixingState.ts · **MixResultDisplay.vue beyond the X.W4.g import+face carve** · ErrorBoundary.vue ·
**demo/palettes/mix.ts** · …)"*.

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:37` | route legend | LEGEND | quoted above | **defines MX-CLUSTER** |
| `:41` | **MR-1** (**BLOCKER**, FOLD → MX-1) | ROW | *"`data-mix-target` (`:69`) stamped on a WatercolorDot and dropped … the convergence anchor cannot exist. → **MX-CLUSTER · X.W4.g · X-W6.j**"* | **MX-CLUSTER** |
| `:50` | **MR-10** (MAJOR, FOLD → MX-32) | ROW | *"the palette arm has NO text alternative; `:title` dies on the producer surface; entire accessible text = "Result". → **MX-CLUSTER / X.W4.g**"* | **MX-CLUSTER** |
| `:140` | closing verdict | VERDICT | the round-8 terminal disposition paragraph | **MX-CLUSTER** |

#### `adjudicated/wb-mix-sourceselector.md` — 8 occurrences · 6 row ids

| site | id | class | the disposition, at its bytes | **FAIL home** |
|---|---|---|---|---|
| `:6` | — | INSTRUMENTS | the static-only instruments block | n/a |
| `:32` ×2 | **MSS-1** (**BLOCKER**) | ROW | *"**CONFIRMED (BLOCKER) · IDENTITY-FOLD → CC-044 + X.W4.g.** Every interactive WatercolorDot in the file is inert; colors mode — the DEFAULT mode — cannot accept a colour."* | **CC-044 stays BLOCKED-ON** (`:55` cut row) **+ MX-CLUSTER** |
| `:57` | **MSS-19** | ROW | *"IDENTITY-FOLD → **MX-41** (X-W6.j / X.W4.g). The 16 px, nameless, hover-revealed remove control"* | **X-W6.j / MX-CLUSTER** (rides MX-41) |
| `:58` | **MSS-20** | ROW | *"CONFIRMED (MINOR, structural half) → X.W4.g. At n=0 the well's only mark is a 2 px dashed hairline whose colour IS the user's live picker colour — the sole affordance's non-text contrast has no floor by construction."* | **MX-CLUSTER** |
| `:59` | **MSS-21** | ROW | *"CONFIRMED (MINOR) → X-W6.j + X.W4.g. The colors-mode empty state was designed … but carries no copy … and, per MSS-1, no working affordance."* | **X-W6.j** (the copy limb, ungated) **+ MX-CLUSTER** |
| `:60` | **MSS-22** | ROW | *"CONFIRMED (MINOR) → X.W4.g. Nine dead utilities on the add slot, not five … Revive or die with the seat."* | **MX-CLUSTER** |
| `:61` | **MSS-23** | ROW | *"CONFIRMED (MINOR) → X.W4.g. `.add-slot-ghost` is a byte-identical scoped twin of `CurrentPaletteEditor.vue:286-290`, both centring a child the producer cannot render"* | **MX-CLUSTER** |

### §5.3 · The set-difference closes — self-count

| record | occurrences enumerated above | ⟨`grep -roc`⟩ | |
|---|---:|---:|---|
| `AboutPane.md` | 1 + 1 = **2** | 2 | ✓ |
| `AuroraPane.md` | 1 + 1 + 1 = **3** | 3 | ✓ |
| `EmptyState.md` | 1 + 3 + 1 + 1 + 1 = **7** | 7 | ✓ |
| `wb-extract-controls.md` | 1+1+1+1+1+1+1+1+1 = **9** | 9 | ✓ |
| `wb-extract-imageeyedropper.md` | 1 + 1 + 1 + 1 + 2 + 1 = **7** | 7 | ✓ |
| `wb-generate-pane.md` | 1 + 2 + 1 + 2 + 1 = **7** | 7 | ✓ |
| `wb-mix-animationcanvas.md` | 1+1+1+1+1+2+2+1 = **10** | 10 | ✓ |
| `wb-mix-pane.md` | 1+1+1+1+1 = **5** | 5 | ✓ |
| `wb-mix-resultdisplay.md` | 1+1+1+1 = **4** | 4 | ✓ |
| `wb-mix-sourceselector.md` | 1 + 2 + 1+1+1+1+1 = **8** | 8 | ✓ |
| **TOTAL** | **62** | **62** | **✓ — nothing dropped** |

**The 32 distinct row ids stranded by this FAIL**, in one line so the set-difference is one grep:

> AB-15 · R-8 · AP-17 · ES-15 · ES-20 · EC-2 · EC-3 · EC-22 · EY-7 · EY-27 · EY-32 · GEN-2 · GEN-8 ·
> GEN-28 · K-14 · MX-1 · MX-2 · MX-3 · MX-32 · MX-41 · C-1≡D-5(A)≡DC-2 · DD-5 · MP-4 · MP-5 · MR-1 ·
> MR-10 · MSS-1 · MSS-19 · MSS-20 · MSS-21 · MSS-22 · MSS-23

**Five FAIL homes, no sixth, nothing homeless:**

| FAIL home | ids it receives |
|---|---|
| **MX-CLUSTER** (NO-WAVE-OWNER; defined `wb-mix-resultdisplay.md:37`) | MX-1 · MX-2 · MX-3 · MX-32 · MX-41 · MP-4 · MP-5 · MR-1 · MR-10 · MSS-1 · MSS-19 · MSS-20 · MSS-21 · MSS-22 · MSS-23 · C-1≡D-5(A)≡DC-2 · DD-5 |
| **EY-CLUSTER** (NO-WAVE-OWNER; defined `wb-extract-imageeyedropper.md:34`) | EY-7 · EY-27 · EY-32 |
| **GEN-CLUSTER** (NO-WAVE-OWNER; defined `wb-generate-pane.md:38`) | GEN-2 · GEN-8 · GEN-28 (consumer end) |
| **NO-WAVE-OWNER, unclustered** (`wb-extract-controls.md:35` legend; `EmptyState.md` mints no cluster) | EC-2 · EC-3 · EC-22 · ES-15 · ES-20 |
| **The §1.M bank / the X-W0.g sitting** (not a cluster — these rows die banked, not homeless) | AB-15 → **CC-113** · AP-17 + R-8 → the **CSP G-PAINT register + the sitting** · MSS-1's fold limb → **CC-044** · K-14 → a standing kill, no booking owed |

**G-A is GREEN**: every one of the 62 is named, with a home, and the falsifier's grep returns the same
62 this file enumerates.

---

## §6 · FOLD **W0.3** — THE RECEIVING-BOUNDS DELTA (owed on FAIL exactly as on PASS)

> **Fold W0.3, verbatim:** *"**The census fires a receiving surface whose bounds omit the file the
> booking names.** · **MAJOR (spec inconsistency)** … the census's PASS branch emits a
> **receiving-bounds delta** — every file CC-105 (and the §1.M bank) names that X-W4.g does not hold —
> or the PASS is unexecutable. **On FAIL the row still stands: the bank's contents are mis-bounded
> either way.**"*

**Re-measured at this census's clock, read-only.** CC-105's subject is *"our 4 `--slider-track-bg`
sites"* (`CARRY-CUT-LEDGER.md:217`). ⟨`grep -rn 'slider-track-bg' demo/ src/`⟩ → **8** hits, of which
**5 are live bindings** and **3 are comment restatements**:

| site | live? | held by **X.W4.g**'s bounds table (`W4.md:159–172`)? | in **any** X wave's bounds? |
|---|---|---|---|
| `demo/workbenches/generate/GenerateControls.vue:305` | live | **file held** — but as *"modify-carve — impostor seat `:203`"*, a **different line**; `:305` is outside the named carve | X-W4 (`.b`, `.g`), X-W8 (**as an exclusion**) |
| `demo/workbenches/extract/ExtractControls.vue:32` | live | **NO** | **NO** |
| `demo/workbenches/extract/ExtractControls.vue:75` | live | **NO** | **NO** |
| `demo/scenes/ConfigSliderPane.vue:202` | live | **NO** | X-W8 (**as an exclusion**) — the identity sits at the CSP **G-PAINT** register (AuroraPane R-8) |
| `demo/picker/controls/ComponentSliders/ComponentSliders.vue:197` | live | **NO** (`ConsoleRail.vue` is held; `ComponentSliders.vue` is not) | X-W4, X-W8 (**as an exclusion**) |
| `ExtractControls.vue:60` · `ConfigSliderPane.vue:197` · `ComponentSliders.vue:192` | comment | — | — |

**The ×4 / ×5 figure, both stated, neither silently elected** (runbook §3.2's own posture for X-EXT-4:
*"mail says ×4, the tree measures 5 — both figures stated, neither silently elected"*): **4 files**
carry the sites, and the **tree measures 5 live sites** because `ExtractControls.vue` carries two.
Both readings are correct about different nouns.

**`ExtractControls.vue` is held by no X wave's bounds — reproduced at 2026-09-17.**
⟨`grep -rl 'ExtractControls' docs/tranches/X/waves/W*.md`⟩ → `W7.md` · `W8.md`, and **both are prose,
not bounds**:
- `W7.md:539` — *"(`ExtractControls.vue:29 :max="16"`)"*, a comparand inside another row's text;
- `W8.md:106` — inside W8's **out-of-bounds** list: *"The `--slider-track-bg` style sites
  (`GenerateControls.vue:305`, `ExtractControls.vue:32,75`, `ConfigSliderPane.vue:202`,
  `ComponentSliders.vue:197`) — CC-105, BLOCKED-ON **X-W0's 8.0.0 repin census event**, receiving
  surface **X-W4.g**. The slider *import line* in those files is in bounds; **the CSS var is not**."*

W8 therefore **names all five sites and explicitly excludes them**, routing them to X-W4.g — whose own
bounds table does not carry `ExtractControls.vue`, `ConfigSliderPane.vue` or `ComponentSliders.vue` at
all. **The fold's MAJOR reproduces exactly: on a PASS the cut would be unexecutable against three of
its four subject files.**

**Two further bank subjects, measured while the delta was taken:**

| bank row | its subject | held by X.W4.g? | in any X wave's bounds? |
|---|---|---|---|
| **CC-106** | `useSliderAnnouncements.ts` | **NO** | cited in `W4.md:89`, `:314` as a **banked** row, not as a bounds entry |
| **CC-115** | the `coalesce-metric.ts` consumer seam | **NO** | ⟨`grep -rl 'coalesce-metric' waves/W*.md`⟩ → **NONE** |

**Disposition (this unit's, at its own bound).** The delta is **measured and published here**, which is
all X-W0.j may lawfully do: `W4.md` is not in this unit's writable set and no byte of it is touched
(§11). It is **routed to the X-W0.g sitting** — which already holds the kindred CC-105 ⇄ G-PAINT
reconciliation from AuroraPane `:35`/`:173` — and it is a **precondition on any future PASS**: a census
that fires X-W4.g without this delta cured fires a cut that cannot legally touch its own subject.
Recorded, not cured, and not silently elected either way.

---

## §7 · FOLD **W0.18** — CONDITION 3'S CONSUMER WITNESS AND ITS PRODUCER COUPLING

> **Fold W0.18, verbatim:** *"condition 3 is satisfied only if 8.0.0 lets a consumer **paint** the
> indicator — not merely hide the gutter. The census records the measured value; the producer question
> rides the standing BH relay at X-W9's coordination step. **X-W0 writes no relay byte.**"*

Re-measured at this census's clock, read-only, at the installed 7.0.0 bytes:

⟨`grep -rn 'select-dot-color' node_modules/@mkbabb/glass-ui/dist`⟩
```
dist/select-BcBAyLXA.js:283:  style: { "background-color": "var(
                                  --select-dot-color,
                                  var(--glass-accent, currentColor)
                              )" }
```
⟨`grep -rn 'glass-accent' node_modules/@mkbabb/glass-ui/dist/styles | grep initial-value`⟩
```
dist/styles/tokens/property-regs.css:1:  @property --glass-accent { syntax: "<color>"; inherits: true;
                                         initial-value: transparent; }
```

**The chain can never fall through.** `--glass-accent` is a **registered** `@property` with
`initial-value: transparent`, so the third fallback (`currentColor`) is unreachable: unless a consumer
sets `--select-dot-color`, the selected option's marker paints **transparent** — zero pixels, for every
consumer. That is AuroraPane's AP-2/AP-26/K-13 finding, reproduced here at its own bytes rather than
inherited from the record.

**Why it binds this condition.** Probe `:2.3` returned `0` declarations and `0` packed hits — a slot
that does not exist cannot be painted. W0.18's point is the stronger one: **even the existing gutter is
unpaintable by a consumer at 7.0.0**, so condition 3 measures the right thing and would still measure
the right thing at 8.0.0. The cure direction is already ruled in-record — AP-26's rider: *"the house
direction (VC:90's ColorSpaceSelector precedent) is the producer gutter WITH a real marker, so the
terminal cure is AP-2's token + packet, and the interim must be reverted when the marker inks."*

**This unit writes no relay byte.** The producer question rides the standing glass-ui BH relay at
**X-W9's coordination step**, per W0.18 and per the standing BH/BI relay law. glass-ui is READ-ONLY.

---

## §8 · FOLD **W0.19** — THE SIX CORROBORATIONS, CITED AND **NOT** INHERITED

> **Fold W0.19, verbatim:** *"Conditions 1/2 carry six independent corroborations from six HEADs; **the
> census may cite them and must not inherit them.**"* · **lock (HG-18's own words):** *"**MEASURE-AT-OPEN
> and again at close — the verdict is dated, never inherited.**"*

The six cited seats — CurrentPaletteEditor ⟨`2f6cf70e`⟩ · EmptyState ⟨`ddf2d5f8`⟩ ·
wb-extract-imageeyedropper ⟨`1994eb53`⟩ · wb-generate-pane ⟨`954b255c`⟩ · wb-mix-animationcanvas
⟨`9c779130`⟩ · the fold seat ⟨2026-08-28⟩ — are **context for the verdict's stability, never the
verdict**. This seat re-ran their claims itself, on
`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` (4,560 B, sha256 `db2de914e6978214`):

| claim | ⟨probe⟩ | **measured 2026-09-17** | reproduces? |
|---|---|---|---|
| `inheritAttrs` false | `grep -o 'inheritAttrs[^,}]*'` | **`inheritAttrs: !1`** | ✓ |
| zero slots | `grep -o 'renderSlot' … \| wc -l` | **0** | ✓ |
| `aria-hidden` hardcoded | `grep -o 'aria-hidden[^,}]*'` | **`aria-hidden": "true"` ×3** | ✓ |
| `pointer-events` hardcoded | `grep -o 'pointerEvents[^,}]*'` | **`pointerEvents: "none"`** | ✓ |
| no `tag` prop | `grep -o '"tag"' … \| wc -l` | **0** | ✓ |
| class/style-only forwarding | `grep -o 'useAttrs' … \| wc -l` | **1** (`useAttrs()`, read for `class`/`style` only) | ✓ |
| `./watercolor-dot` in packed exports | §2.2 | **present** | ✓ |

**Six-for-six, plus the export — no drift across 2026-08-04 → 2026-09-17.**

**One honest spelling correction, recorded rather than smoothed over.** The corroborating seats quote
the minified form `inheritAttrs:!1`; the installed bytes read `inheritAttrs: !1` (one space). A literal
grep for the quoted spelling returns **0** and would read as a drift. It is not one — the dist at this
pin is unminified and the **fact is identical**. Stated so that a later seat re-running the quoted
string does not mint a phantom regression. W0.19's own correction — *"the 'fifth independent
verification' claim appears twice"* — is carried unchanged; this census claims no ordinal.

---

## §9 · THE ROWS THIS CENSUS DISCHARGES

### §9.1 · **CC-109** — discharged BY THE VERDICT

Ledger `:221`, verbatim: *"| CC-109 | G-4 (thumb glyph geometry) | glass | already seated
producer-side (TR#31 W2-F + #35; ≡ A-11) | **FOLD → the glass seat** — value action = consume at the
8.0.0 repin census; **no value wave row** |"*.

**Its entire value action is this census** (`W0.md:211`: *"CC-109 and CC-116 are discharged by the
verdict itself — the ledger §1.M gives their value action as exactly this census"*). The census has
been held, on **2026-09-17**, and returns **FAIL at the elected target 8.0.0**. **CC-109 is
DISCHARGED**: its producer verdict stands as received, it mints **no value wave row**, and its consume
step is held by the same FAIL that holds the bank — i.e. it is discharged *as a ledger row*, and the
consumption it points at happens inside X-W4.g whenever a later census PASSes. Nothing about CC-109 is
deferred; the row is closed by the act it named.

### §9.2 · **CC-116** — discharged BY THE VERDICT

Ledger `:228`, verbatim: *"| CC-116 | I-21 remainder (A-1 · A-4 · A-6 · A-7 · A-8 · A-9 · A-11 · A-12 ·
B-1..B-6 · D-1) | glass | producer-seated rows with no independent value-side act (or already covered:
B-6≡CC-080's duty, A-14≡CC-115, A-11≡CC-109) | **FOLD → the glass TR seats** — value action = the
single 8.0.0 repin census; **each verdict stands as received, zero silent drops on the 31/31** |"*.

**DISCHARGED by the same verdict.** The eighteen named producer rows have **no independent value-side
act** — the single census *is* the act, and it has been held and dated. **The 31/31 receipt verdicts
stand as received, with zero silent drops**: this census reverses none of them, re-opens none of them,
and drops none of them. The three already-covered identities keep their homes (B-6 ≡ CC-080's duty ·
A-14 ≡ CC-115 · A-11 ≡ CC-109).

### §9.3 · **CC-117** — THE TERMINAL WORD, STATED ONCE

`W0.md:211`, verbatim: *"**CC-117's terminal word, stated once**: evidence-only, **FOLD → coordination
INBOX row I-24**, no value act and no X wave row; X-W11 G1's 117-row walk reads it from this line."*

> ### CC-117 — **EVIDENCE-ONLY · FOLD → coordination INBOX row I-24 · NO VALUE ACT · NO X WAVE ROW.**

Corroborated at the ledger's own bytes, `:229`: *"| CC-117 | five 08-02 peer-repo intakes + Glass Row 8
(provenance row 27) | prov | every byte claim verified character-for-character; cross-repo dependency
state trustworthy as written | **FOLD → coordination INBOX row I-24** (the ledger pointer stands;
content authoritative in place; adopted as evidence, not as work) |"*. And the receiving row exists —
⟨`grep -n '^| I-24 \|^| I-24a ' docs/tranches/V/coordination/INBOX.md`⟩:
```
93:| I-24 | 2026-08-…
95:| I-24a | 2026-08-…
```
`INBOX.md:93` is I-24, **RECONCILED 2026-08-03**, with its own undercount correction rowed beside it at
`:95` as **I-24a** (16 files, not 5 — per-claim adjudication commissioned, master ledger at
`audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md`). **The fold target is present and live; the
FOLD is not a pointer into nothing.**

**Stated once. It is not restated anywhere else in this file, and X-W11 G1's 117-row walk reads it from
the line above.**

---

## §10 · MEASURE-AT-CLOSE — THE SAME FOUR PROBES, RE-RUN

HG-18 `:331`: *"**MEASURE-AT-OPEN and again at close** — the verdict is dated, never inherited."*
Re-run at close, after this file's bytes were settled, on the same read-only surfaces.

**Clock at close**: `2026-09-17 13:47:17 EDT` ⟨`date "+%Y-%m-%d %H:%M:%S %Z"`⟩. **HEAD at close**:
`e12eeb91` — moved from `456c3422` while this unit ran, by **concurrent sibling seats** (X-W0 group 3
and the Track C/D seats commit to the same branch); no commit of this unit's is among them.

| # | probe | at open (13:35 EDT) | **at close (13:47 EDT)** | moved? |
|---|---|---|---|---|
| 1 | `…glass-ui/package.json').version` | `7.0.0` | **`7.0.0`** | no |
| 1b | pin, `package.json:83` | `^7.0.0` | **`^7.0.0`** | no |
| 2 | watercolor subpath filter | `./watercolor-dot` | **`./watercolor-dot`** | no |
| 3 | indicator-slot `.d.ts` decls | `0` | **`0`** | no |
| 4 | `MIGRATION.md` §8.0.0 kbd/orient/motion | `2 / 2 / 1` | **`2 / 2 / 1`** | no |
| 4′ | `MIGRATION.md` §9.0.0 kbd/orient/motion | `0 / 0 / 0` | **`0 / 0 / 0`** | no |
| datum | `npm view @mkbabb/glass-ui version` | `8.0.0` | **`8.0.0`** | no |
| datum | `npm view @mkbabb/glass-ui@9.0.0 version` | `404` | **`404`** | no |
| G-A | `grep -ro 'X[-.]W4\.g' …/adjudicated/*.md \| wc -l` | `62` / 10 records | **`62` / 10 records** | no |

**The close verdict equals the open verdict: 1/4 at 8.0.0, 0/4 at 9.0.0 — FAIL, dated 2026-09-17.**

---

## §11 · WHAT THIS UNIT DID NOT DO

§Triumvirate Dispatch bullet 5 forbids performing any part of the cut under this census, and
`W0.md:211` confines the unit to recording a verdict. Verified at the bytes:

- **Zero product bytes written.** This unit created exactly **one** file,
  `docs/tranches/X/W0/GLASS8-REPIN-CENSUS.md`, and modified nothing else but the wave record.
- **No `watercolor-dot` deletion, no shim, no copied selector, no wrapper.** All 11 import sites stand
  untouched (§2.2's measurement is a `grep`, not an edit).
- **`package.json` and `node_modules/@mkbabb/glass-ui/**` were read and hashed only.** No install, no
  repin, no `npm` write command was issued; the only `npm` invocations were `view` (read-only).
- **`../glass-ui` was read only** (`MIGRATION.md`, the BJ/BK coordination letters, `git tag`/`rev-parse`
  — all read commands). No relay byte written (§7).
- **`docs/tranches/X/waves/W4.md` was read, never written** — the §6 bounds delta is published here and
  routed, not cured.
- **`scripts/dev/dev.sh` never touched, never staged.**

---

## §12 · SELF-COUNT AND RESIDUALS

**Self-count.** This file publishes these figures, each read from settled bytes and double-run:
**62** X-W4.g occurrences · **10** records · **54** distinct sites (+**8** extras on **7** lines = 62) ·
**41** id-bearing + **21** non-row = 62 · **32** distinct row ids · **5** FAIL homes ·
**11** watercolor-dot importers · **5** live
`--slider-track-bg` sites in **4** files · **74** packed export subpaths · **0** indicator-slot
declarations · **2 / 2 / 1** contract words at `MIGRATION.md` §8.0.0 · **0 / 0 / 0** at §9.0.0 ·
**1/4** at the elected target · **0/4** at the non-elected candidate.

**Residuals — named, not carried silently.**

1. **R-j1 · The `glass8-census-2026-08-XX.txt` artefact is not banked by this unit, by bounds.**
   §Verification Artefacts (`W0.md:361`) names `docs/tranches/X/artefacts/W0/glass8-census-2026-08-XX.txt`.
   That path is **not in §File Bounds**, and §Disjointness `:117` confines this unit to
   *"`X/W0/GLASS8-REPIN-CENSUS.md` only"*. ⟨`ls docs/tranches/X/artefacts/W0/`⟩ → **No such file or
   directory** — no seat of this wave has banked there. **Every one of the four probes is pasted
   verbatim with its output in §2 and re-run in §10**, so HG-18's evidentiary requirement is met inside
   this file; the *banking* of the sidecar is left to the wave's close seat rather than written out of
   bounds. Reported, not taken.
2. **R-j2 · Condition 4's reading moved under measurement** (§2.4). The open baseline read it as
   receipt-**existence** (PASS for both candidates); measured at the condition's words it is
   receipt-**content** (PASS at 8.0.0, FAIL at 9.0.0). The elected target's verdict is unchanged; the
   9.0.0 row reads 0/4 here against 1/4 in the open baseline. Recorded so the divergence is a dated
   finding rather than an unexplained delta between two of this wave's own files.
3. **R-j3 · The receiving-bounds delta (§6) is a MAJOR that a FAIL does not cure.** Three of CC-105's
   four subject files are held by no X-W4.g bounds row, and `ExtractControls.vue` by no X wave at all.
   Routed to the **X-W0.g sitting** beside AuroraPane R-8's kindred CC-105 ⇄ G-PAINT reconciliation,
   and standing as a **precondition on any future PASS**.
4. **R-j4 · The 11-vs-7 bank arithmetic (§4.1)** — stated, both figures, with the four rows whose
   trigger is a different producer event named. No spec byte edited (E-3).

---

## §13 · THE SENTENCE THIS CENSUS EXISTS TO MAKE TRUE

The wave's Archaeology names the disease: *"the 8.0.0 repin census, cited as the trigger for eleven
banked rows across five wave files and **owned by none** — 'the receiving wave' was a pointer with no
referent."*

**On 2026-09-17 the census had an owner, ran its four conditions read-only at the installed bytes,
named its elected target, returned FAIL at 1-of-4, and gave all 62 of its stranded bookings a home by
id.** X-W4.g is closed for a stated reason, on a stated date, by a named unit. That is the whole of
what X-W0.j owed, and it owes nothing further.
