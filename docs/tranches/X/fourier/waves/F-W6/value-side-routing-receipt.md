SERVED MODEL: claude-opus-5[1m]

# F.W6 — VALUE-SIDE ROUTING RECEIPT (Track C · X·F) — **FW6-G16's whole artefact**

**Authored by unit `i`, 2026-09-18** (seat clock; the wave's sitting date is 2026-09-17 — see the
register's date erratum for unit `e`). Authority: `docs/tranches/X/fourier/waves/F-W6.md` **§1 bounds
row 3** — *"CREATE — V-α / V-β / V-γ / ⊙ TA-4 named to the value.js API row. **FW6-G16's whole
artefact.**"* — and **§2.10 ROUTED OUT** (4 rows) with **§3 FW6-G16**.

**What this file is, and is not.** It is the *routing* of four value-side obligations to the **value.js
API row**, each citing **the authority that actually holds it**. It stamps **nothing** on the value tree
and **takes no credit for any cure** (spec §2.10, first paragraph). Zero value.js `api/src` or `src`
bytes move by this wave, measured at open and re-measured at close (§5). Every figure below is read from
the settled bytes and **double-run**; every quotation enters as pasted `grep`/`sed` output with a ⟨cmd⟩
note (R2-1-LAW).

**Bases** (spec §0.2's base block): `V=/Users/mkbabb/Programming/value.js` ·
`M=$V/docs/tranches/V/megatranche` · `W=$V/docs/tranches/X/fourier/waves` · `H=$V/docs/tranches/X/COHESION.md`.
Engine **`/usr/bin/grep`** — the spec's pinned binary; bare `grep` is ugrep in this shell and silently
differs (§0.2).

---

## §1 The routing law, at its corrected addresses (R2-2)

Two authorities, quoted separately, never fused.

**(a) The census's own wave sketch — census §4, item 7** (the address is *"§4, item 7"*; the census has
no sub-numbered `§4.7` heading, which is the round-2 correction R2-2 makes at three sites):

⟨cmd⟩ `/usr/bin/sed -n '200,202p' $M/formation/fourier/CENSUS-2026-08-03.md` →

```
7. **F.W6 · provenance defect burn-down** — fourier F-α (deepen the chain), F-β (PATCH recompute +
   clearable palette_slug), F-γ (redact the breadcrumb); value-side V-α/V-β/V-γ routed to the
   value.js API row per the contract (value-tree edits are NOT fourier-wave gates).
```

**(b) COHESION §2 — *The cross-sub-tranche dependency graph*, the SS-4 row** (the sentence lives in
**§2**, not §1 — the same R2-2 correction):

⟨cmd⟩ `/usr/bin/grep -n "neither side's edits gate the other's" $H` →
`69:- **SS-4 contract co-signature → F.W5 ∥ X·V API row**: neither side's edits gate the other's`

**Consequence, stated once**: the four rows below are **routed, not burned**. A value-tree edit performed
by this wave would not be a cure — it would be the gate failure `FW6-G16` exists to catch.

---

## §2 The TWO authorities that hold the four obligations — and why one does not cover all four

Spec §1 bounds row 3 is explicit: *"**The receipt cites TWO authorities, because one does not cover all
four (R2-1b, correction of record)**"*. Both are re-measured at this seat's clock against the **live**
bytes, not against the spec's paste.

### §2.1 Authority (a) — `F-W5.md` §4's `F.W5 → value.js API row` edge row: **V-β · V-γ · TA-4**

⟨cmd⟩ `/usr/bin/grep -n 'value.js API row' $W/F-W5.md` returns six lines; the **edge row** is the one at
`:405` (its line number is the command's *output*, never this file's address for it — R3-3.10):

> `| **F.W5 → value.js API row** | value-side obligations, never fourier defects | V-β compound version
> `_id` + the two-histories test (G2) · V-γ attribution (`userSlug` null ⇒ no version row, E18) · TA-4
> per G4's ruling · fork born-visibility (`forks.ts:76`) + create-visibility test (G5) · G18's
> value-side probe · D9 reconciliation: value.js persists 3-state visibility (`public`/`unlisted`/`private`,
> `model.ts:61`) — the obligation list reconciles it, the contract does not silently overwrite it |`

**Membership, measured per token, double-run** — ⟨cmd⟩ `/usr/bin/sed -n '405p' $W/F-W5.md | /usr/bin/grep -c '<token>'`:

| token | count at `:405` | reading |
|---|---|---|
| `V-β` | **1** | itemized |
| `V-γ` | **1** | itemized |
| `TA-4` | **1** | itemized |
| **`V-α`** | **0** | **NOT itemized — see §2.3** |

`F-W5.md` at this seat's clock: ⟨cmd⟩ `shasum -a 256 $W/F-W5.md | cut -c1-12` → **`26aebcdc7bac`**. The
spec's §0.3 carries no numeric pin for this sibling (*"pinned per PIN-PURGE-CERT.md §TABLE"*); the stamp
above is **this seat's**, recorded so a later reader can tell movement from a stale quotation. The words
quoted were re-read at these bytes.

### §2.2 Authority (b) — lane-crud §2's R-2 row: **V-α**

⟨cmd⟩ `/usr/bin/sed -n '161p' $M/formation/fourier/lane-crud.md` →

> `**value.js defect V-α — revert writes no version row but still increments the counter.**`

⟨cmd⟩ `shasum -a 256 $M/formation/fourier/lane-crud.md | cut -c1-12` → **`3bcc387cbb2a`**, a
**character-match** to the spec's §0.3 immutable pin. The one authority this receipt leans on alone has
**not moved**.

### §2.3 V-α's NON-MEMBERSHIP, asserted and measured — no list membership is manufactured

The spec orders this stated rather than papered over (**FW6-G16's GREEN**: *"asserting no list membership
for V-α"*). Three measurements, each double-run:

1. **V-α is absent from the edge row** — ⟨cmd⟩ `/usr/bin/sed -n '405p' $W/F-W5.md | /usr/bin/grep -c 'V-α'` → **0**.
2. **The phantom leg stays struck** — round 1 cited an *"F.W5 §6c itemized obligation list"*. ⟨cmd⟩
   `/usr/bin/grep -l '§6c' $W/F-W5.md` → **no output, exit 1 — `F-W5.md` is not a member of the matching
   set** (set-membership, never a banked count of a moving file: R3-3.10). The citation is not repaired,
   re-addressed or replaced by a nearby heading; it is **dropped**, and V-α stands on lane-crud alone.
3. **The two authorities are cited separately, never fused.** A single operand *"F.W5's obligation list"*
   covering all four is **struck** (R2-1b). This receipt makes no claim that V-α appears in any F-W5 list.

▲ **Why this matters beyond bookkeeping**: manufacturing membership would re-open R2-1b, and would hand a
later seat a citation that its own `grep` refutes — the exact class this spec spent four repair rounds
retiring. The honest shape is *two homes, each named, each speaking for what it holds*.

---

## §3 The four obligations, named to the **value.js API row**

**Read-only measurement discipline.** Every mechanism below was re-read at the value tree's **live bytes**
at this seat's clock (2026-09-18) by `grep`/`sed`/`ls` — reads only. Where the spec's anchor has drifted,
the **INTENT is recorded at the true bytes** and the drift is minuted as a dated addendum-beside; the spec
is **not edited** (E-3).

### V-α — *revert writes no version row but still increments the counter* · P1

| | |
|---|---|
| **Routed to** | the **value.js API row** |
| **Authority that HOLDS it** | **lane-crud §2's R-2 row** (§2.2 above) — an `F-W5.md` §0 bounds authority. **NOT** F-W5 §4's edge row (§2.3) |
| **F.W6's act** | **none.** Routed; burned nowhere in this wave |
| **Cure-shape (elsewhere)** | the value.js API row's act — `revertToVersion` must write a version row (or the counter must stop moving), and a test must assert it |

**Mechanism, re-measured read-only at the live bytes** (`$V/api/src/modules/palette/service/versions.ts`):

- ⟨cmd⟩ `/usr/bin/grep -n 'computeContentHash\|versionCount\|createVersionRecord\|findByHash' …/service/versions.ts`
  → `:38 const hash = computeContentHash(name, colors);` · `:40 …paletteVersions.findByHash(` ·
  `:137 const newHash = computeContentHash(version.name, version.colors);` ·
  `:148 await createVersionRecord(` · `:172 $inc: { versionCount: 1 },`.
- The revert path computes `newHash` **by the same expression** that minted `version._id` at creation
  (`:38` ≡ `:137`), so `newHash === version._id` **always**; `createVersionRecord` then hits
  `findByHash` → found → returns the hash **before any insert**, while the palette update runs
  `$inc: { versionCount: 1 }` unconditionally at `:172`.
- **The suite's only revert case is still the negative one** — ⟨cmd⟩ `/usr/bin/grep -n 'revertToVersion'
  …/__tests__/palette-versions.test.ts` → `:83 it("revertToVersion throws NotFoundError on missing palette", …)`.
  The spec's `:83` anchor **reproduces exactly**.

**Every spec anchor for V-α reproduces at the live bytes.** No drift to minute.

### V-β — *`PaletteVersion._id` is GLOBAL; two palettes with identical `(name, colors)` share ONE version row* · P1

| | |
|---|---|
| **Routed to** | the **value.js API row** |
| **Authority that HOLDS it** | **F-W5 §4's `F.W5 → value.js API row` edge row** (§2.1) — *"V-β compound version `_id` + the two-histories test (G2)"* |
| **F.W6's act** | **none.** Routed; burned nowhere in this wave |
| **Cure-shape (elsewhere)** | adopt fourier's compound per-entity `_id` (`f"{viz_slug}:{set_hash}"`) **plus a test asserting two same-content palettes keep separate histories — none exists today** (G2's stated GREEN condition) |

**Mechanism, re-measured read-only:**

- ⟨cmd⟩ `/usr/bin/sed -n '84,88p' …/palette/model.ts` → `export interface PaletteVersion {` ·
  `/** _id is the content-hash. */` · `_id: string;` — the spec's `model.ts:85-86` anchor reproduces.
- ⟨cmd⟩ `/usr/bin/grep -n 'computeContentHash' …/palette/hash.ts` →
  `:8 export function computeContentHash(name: string, colors: PaletteColor[]): string {` — **folds
  `name` + `colors` only, never `paletteSlug`**.
- ⟨cmd⟩ `/usr/bin/grep -n 'findByHash\|insertIfAbsent' …/repository/paletteVersion.ts` →
  `:13 findByHash(hash: string, session?: ClientSession)` — **no slug scope** — and `:39 async insertIfAbsent(`
  whose early return is at ⟨cmd⟩ `/usr/bin/sed -n '39,50p'` → `if (existing) return version._id;`.
- ⌧ **Anchor addendum-beside (dated 2026-09-18)**: the spec's `:44-47` window for the early return
  brackets a line the live file puts at **`:47`**; the spec's `repository/paletteVersion.ts:13-15` and
  `hash.ts:8-17` windows reproduce. **Mechanism unchanged; the INTENT is recorded at the true bytes.**

### V-γ — *attribution is CONDITIONAL; an unattributable edit writes no version row at all* · P1

| | |
|---|---|
| **Routed to** | the **value.js API row** |
| **Authority that HOLDS it** | **F-W5 §4's edge row** (§2.1) — *"V-γ attribution (`userSlug` null ⇒ no version row, E18)"* |
| **F.W6's act** | **none.** Routed; burned nowhere in this wave |
| **Cure-shape (elsewhere)** | the value.js API row; **composes with F.W5 E18 — AA-10 and V-γ are the two halves of one R-7 clause with two burn seats** (spec §2.10). The AA-10 half is **CITED to F.W4** at this wave's register (REST-16) and booked nowhere here |

**Mechanism, re-measured read-only:**

- ⟨cmd⟩ `/usr/bin/sed -n '60,61p' …/palette/model.ts` → `userSlug: string | null;` — **nullable**,
  against fourier's required non-null `owner_slug`. The spec's `model.ts:60` anchor reproduces exactly.
- ⟨cmd⟩ `/usr/bin/grep -rn 'if (userSlug)' …/palette --include='*.ts'` → **two sites**:
  `service/crud.ts:118` and `service/versions.ts:147`. The third guard the spec names is the
  **compound** form at ⟨cmd⟩ `/usr/bin/sed -n '204p' …/service/crud.ts` → `if (contentChanged && userSlug) {`.
- ⌧ **Anchor addendum-beside (dated 2026-09-18)**: the spec §2.10 reads *"an `if (userSlug)` guard fronts
  the version write at crud.ts:119, crud.ts:204 and versions.ts:147"*. At the live bytes the three
  guards are **`crud.ts:118`** (one line up from the spec's `:119`), **`crud.ts:204`** (exact, and in the
  compound form `if (contentChanged && userSlug)`), **`versions.ts:147`** (exact). **Three guards, three
  sites, mechanism unchanged** — one anchor drifted by one line and one is compound rather than bare.
  Recorded beside; the spec is not edited.

### TA-4 ⊙ — *the diff layer is one-sided* · **P0, census risk 3** — **RULED**

| | |
|---|---|
| **Routed to** | the **value.js API row** |
| **Authority that HOLDS it** | **F-W5 §4's edge row** (§2.1) — *"TA-4 per G4's ruling"* |
| **F.W6's act** | **none.** Routed; burned nowhere in this wave |
| **Disposition** | ▲ **RULED RE-SCOPE — `F-SS4REST R1`.** Not a restoration ask. See §4 |

**Mechanism, re-measured read-only at this seat's clock** — the excision is intact and the hashing half
still ships:

- ⟨cmd⟩ `/usr/bin/grep -rln 'atomdiff\|atomDiff' $V/api/src $V/src` → **one hit, a test comment** —
  `api/src/modules/palette/__tests__/palettes-forks.test.ts`.
- ⟨cmd⟩ `ls $V/api/src/lib` → `No such file or directory` — the path `J-diff-shape.md §2.5` mandates
  (`lib/crud/atomdiff.ts`) does not exist; T.W1/TA-4 excised it.
- The hashing half survives and still reaches the wire — ⟨cmd⟩ `/usr/bin/grep -n 'atomSetHash' …/palette/format.ts`
  → `:45 atomSetHash: string;` · `:87 atomSetHash: computeAtomSetHash(rest.colors),` — and the tree says so
  in its own words: ⟨cmd⟩ `/usr/bin/sed -n '39,43p' …/palette/hash.ts` → *"(The `/diff` read + the
  atom-diff algebra that once also consumed it were excised at T.W1 — TA-4.)"*.

**Every spec anchor for TA-4 reproduces at the live bytes.** No drift to minute.

---

## §4 TA-4 is **RULED RE-SCOPE**, and this receipt records it as such — never as a restoration ask

The spec wrote TA-4 as ⊙ **OWNER-GATED** with two branches (*"the owner rules RESTORE (a TA-4 reversal),
or v2 re-scopes value.js out EXPLICITLY with §6 re-authored to a one-sided verdict"* — G4), and attached a
standing consequence: *"any cross-repo diff assertion this burn-down makes is **UNFALSIFIABLE until G4
closes**"*.

**G4 has closed.** ⟨cmd⟩ `/usr/bin/sed -n '688,690p' $H` →

> `**F-SS4REST** — **R1 (TA-4)**: **RE-SCOPE value.js out of the diff clause** (a one-sided §6 verdict,`
> `stated explicitly) — `atomdiff.ts` is wholly excised from value.js and restoring it is value-side`
> `authoring that would couple value.js's release train to the fourier contract (the §0i.1 logic).`

**What that fixes here, stated exactly:**

1. **TA-4 is recorded as RULED RE-SCOPE (`F-SS4REST R1`), a one-sided §6 verdict** — and this receipt
   **asks for no restoration**. Asking would be re-opening a ruling this wave consumes and does not re-rule
   (spec §3 FW6-G18: *"F.W6 consumes, never re-rules"*).
2. **`atomdiff.ts` stays wholly excised.** The measured state in §3 (one test-comment hit; no
   `api/src/lib`) is the **ruled** state, not a defect awaiting a cure. No probe is manufactured over an
   absent file (spec §2.10: *"F.W6 … **manufactures no probe over an absent file**"*).
3. **The *"UNFALSIFIABLE until G4 closes"* hedge is RETIRED, and retired by the ruling rather than by this
   seat's judgement.** The declared consequence — *"F-β's `set_hash` recompute reaches `/diff`"* — now has
   a determinate answer: value.js has **no** `/diff` surface to reach, by ruling, so the cross-repo
   assertion is not unfalsifiable but **inapplicable on this side**. §6's verdict is one-sided by decree.
4. **SS-4's standing edict is discharged in the RE-SCOPE branch, not the PREREQUISITE branch.** The spec's
   §4 SS-4 edge requires SS-4 to *"name the TA-4 value-side atomdiff restoration as PREREQUISITE **or**
   re-scope explicitly"*. The ruling takes the second branch **explicitly**, which is the disjunct's own
   requirement; nothing is left implied.

▲ **The one thing this receipt does NOT do**: it does not re-author `J-diff-shape-v2.md` §6 to its
one-sided verdict. That is the contract's own surface, owned by F.W5 (`F-W5.md` §1a), and is outside this
wave's §1 bounds. **The ask travels in unit `i`'s courier letter (bounds #4) as a commissioned act, where
every other cross-repo ask of this wave travels.**

---

## §5 **ZERO VALUE-TREE BYTES** — FW6-G16's standing condition, measured at open and at close

The gate fails if **any** value-tree byte moves. Two measurements, both double-run, both at the
*settled* bytes:

| when | ⟨cmd⟩ | reading |
|---|---|---|
| **at the fold** (spec §2.10, 2026-08-28) | `git diff --stat -- api/src src` | **empty** |
| **at the wave's open** (seat 0, 2026-09-17 22:56 EDT) | `git diff --stat -- api/src src` · `git status --porcelain -- api/src src \| wc -l` | **empty** · **0** |
| **at this unit's close** (2026-09-18) | `git diff --stat -- api/src src \| wc -l` · `git status --porcelain -- api/src src \| wc -l` | **0** · **0** (double-run: 0 · 0) |

Every value-side measurement in §3 above is a **read** — `grep`, `sed`, `ls`, `shasum`. Reads are what
D-19 MEASURE-AT-OPEN requires and what the routing law permits; the law forbids **edits**, and none was
made. The exclusion is stated at spec §5 in its own row: *"**Any value-tree byte** (`$V/api/src`, `$V/src`)
for V-α/V-β/V-γ/TA-4 … **FW6-G16 fails if any byte moves**"*.

---

## §6 What this receipt does **not** claim

- **No credit for any cure.** All four rows are **branch 1** under the spec's §2.11b derivation law —
  *"it is not F.W6's; route by its own arm … and record the routing"* — and §2.11c BLOCK B's `§2.10` line
  reads **`1` ×4 — routed OUT to the value.js API row; zero value-tree bytes, receipt at bounds #3**.
- **No fourier byte.** `/Users/mkbabb/Programming/fourier-analysis` is **READ-ONLY, always**; this receipt
  writes none of it and asks by letter.
- **No ruling.** R1's RE-SCOPE is **consumed**, not re-decided; the other eight rulings travel on their own
  rows in the burn register.
- **No membership manufactured.** §2.3's three measurements are the whole of what this file asserts about
  where V-α lives.
- **No reciprocal written from this end.** The value.js API row's reciprocal edge is **REQUESTED** in the
  courier letter, not written here (spec §4: *"The reciprocal edge is REQUESTED from that end, not written
  here"*); `COHESION.md` is bounds-excluded and F.W6 does not write the spine.

---

## §7 Provenance stamps — every sibling this receipt reads, at this seat's clock

| file | `shasum -a 256 … \| cut -c1-12` | against the spec's §0.3 pin |
|---|---|---|
| `formation/fourier/lane-crud.md` | **`3bcc387cbb2a`** | **character-match — unmoved** (the V-α authority) |
| `formation/fourier/CENSUS-2026-08-03.md` | **`4f9d9f72140a`** | pinned `684de3d8a8a0` — **MOVED**; see the addendum below |
| `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md` | **`7188830b5164`** | pinned `c61b3ed01141` — **MOVED**; read by this receipt nowhere |
| `waves/F-W5.md` | **`26aebcdc7bac`** | no numeric pin in §0.3 (*"per PIN-PURGE-CERT.md §TABLE"*); this seat's stamp |
| `../COHESION.md` | **`683dd6d099c2`** | §0.3 reads `956e71a83e32` — **MOVED** (the spine has been written since; §0j is the ruling surface this wave consumes) |
| `../conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | **character-match** to §0.1's frozen census pin |

⌧ **ADDENDUM-BESIDE, dated 2026-09-18 — two §0.3 "immutable" pins have moved, and the quotations were
re-verified rather than trusted.** The spec's §0.3 law is *"A later reader whose `shasum` differs knows the
sibling moved and re-runs rather than trusting"*, and this seat did exactly that. `CENSUS-2026-08-03.md`
moved at ⟨cmd⟩ `git log --oneline -1 -- …/CENSUS-2026-08-03.md` → **`ca5b7441` 2026-09-17 *"docs(X·F):
CENSUS + lane-frontend errata addenda; COHESION §1/§2"*** — an **addenda-beside** landing, which is what
E-3 prescribes and not an edit over the frozen text. **The routing-law quotation at `:200-202` reproduces
byte-true at the moved file** (§1 above, re-run at this seat, double-run identical), so **no operand of
this receipt moves**. `INTAKE-ADJUDICATION-2026-08-03.md` also moved; **this receipt reads it nowhere**, so
the stamp is recorded for the next seat and nothing here rests on it. The **one** authority this receipt
leans on alone — `lane-crud.md`, V-α's home — is **character-matched and unmoved**.

---

**Close.** FW6-G16's GREEN condition, restated and answered:

> *"The receipt (bounds #3) names the value.js API row per obligation and **cites the authority that
> actually holds each one** — the F-W5 §4 edge row for V-β/V-γ/TA-4, lane-crud §V-α for V-α, **asserting
> no list membership for V-α** — and `git diff --stat` over `$V/api/src` + `$V/src` shows **zero** bytes
> moved by this wave (measured empty at the fold — it must still be empty at close)."*

Four obligations named to the value.js API row (§3) · two authorities cited, never fused (§2) · V-α's
non-membership asserted and measured three ways (§2.3) · TA-4 recorded as **RULED RE-SCOPE** and never as
a restoration ask (§4) · **zero value-tree bytes at open and at close, double-run** (§5).
