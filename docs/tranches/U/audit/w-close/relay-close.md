# U.W-CLOSE — THE RELAY-CLOSE VERIFICATION (read-only, at sibling HEADs)

*Assembled by the U.W-CLOSE annex+publish+relay lane (2026-07-13). This doc PROVES the relay half is
REAL: it confirms the three relay obligations landed at the siblings' HEADs + the producer's
THEN-CURRENT active inbox, by **read-only greps at sibling HEADs**. **Foreign-tree fence: NO new
communiqué, NO foreign-tree edit.** CLOSE proves the relay half; it does not open a new one.*

**Precedence**: owner verbatim → `audit/registry.md` (§28.3 · §B.2 BI→BH bridge) → `DISPOSITION-LEDGER.md`
→ `U.md` → `waves/U.W-CLOSE.md`.

**Standing edict (E-2 / the BH/BI relay fond)**: EVERY component/glass-ui-level change is relayed to
the active glass-ui inbox at root. The owner edict names **BH** as the relay-of-record channel; the
producer's **live coordination dir is BI**. This verification records the HONEST split and confirms no
obligation is stranded.

---

## §0 · STATE AT CLOSE (verified read-only, 2026-07-13)

| Fact | Value (verified this close) | Command |
|---|---|---|
| glass-ui **v5 trigger** | **UNFIRED** — empty | `git -C ../glass-ui tag --list 'v5*'` → EMPTY |
| glass-ui sibling HEAD | `8b0f9acc` (branch `tranche/BI`) | `git -C ../glass-ui rev-parse --short HEAD` |
| keyframes sibling HEAD | `f794def9` (tags to `v5.2.0`; HEAD past it, **no tag past `v5.2.0`**) | `git -C ../keyframes.js rev-parse --short HEAD` |
| value.js branch / npm | `tranche-u` · published **3.1.0** | — |

---

## §1 · THE THREE RELAY OBLIGATIONS — LANDED vs STILL-BOOKED

### Obligation 1 — the U-formation BH communiqué · **LANDED (STILL PRESENT at close)**

- **File**: `../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md` —
  **PRESENT** (24,763 B).
- **Lineage**: formation content landed at glass-ui HEAD **`17e0f522`** (registry §28.3); the
  **U.W-A11Y-wave ADDENDUM was appended** per `w-a11y-close-artefacts.md §5` (SUPPLEMENTS, never
  supersedes — the six A11Y-6 rows). The file's most-recent-touch commit is **`bfa01512`** ("docs(BH
  · inbox): value.js U.W-A11Y producer-relay addendum (a11y-wave asks)") — the A11Y addendum, NOT a
  displacement of the formation content. Grep confirms the addendum is present (12 `A11Y` mentions).
- **Verdict**: **LANDED — STILL PRESENT at close.** The formation communiqué (with §2a U-F4 + §2b the
  9 carried-forward T producer reds incl. T-52) AND the A11Y-wave addendum both live at BH.

### Obligation 2 — the U.W-ADOPT co-land ADDENDUM · **STILL-BOOKED (cut-gated)**

- **State**: the glass-ui v5 cut is **UNFIRED**. Per `waves/U.W-ADOPT.md §7`, the co-land addendum is
  written to the foreign tree **ONLY at the fired cut** — in the UNFIRED arm the ordering spec lives
  in the value.js tree (`w-adopt/coland/coland-ordering.md §6`), NOT the foreign tree (foreign-tree
  fence). The BI dir holds a **`-colands-preview.md`** (the preview record), NOT the fired addendum.
- **Verdict**: **STILL-BOOKED (cut-gated), NOT missing.** The addendum lands at the fired cut; until
  then the value.js-side ordering spec IS the gate (M1 — the value.js-side record is the gate; an ack
  is a bonus). Record STILL-BOOKED.

### Obligation 3 — the keyframes co-migration · **STILL-BOOKED (cut-gated; ties B1/B2)**

- **State**: keyframes at `f794def9`, tags to **`v5.2.0`** (no tag past it — the U-F28 PRM fix is
  FIXED at HEAD but unreleased). The **`^3.1.0` runtime `dependencies` pin-widen** + the
  **backward-color raw-oklab convention gate** (surface 4, PRESERVED under Locus-P) both ride the
  value.js cut. The ONE import rename (`parseCSSSubValue → parseCSSValues`, `parse-flatten.ts:2,119`)
  co-lands at the cut.
- **Verdict**: **STILL-BOOKED (cut-gated).** No keyframes source is touched today (E-3 — the migration
  executes for real at U.W-ADOPT from `publish-packet.md §3`). Ties Bind (c) / G-ADOPT-4b. Record
  STILL-BOOKED.

---

## §2 · THE PRODUCER'S ACTIVE INBOX — BI is LIVE NOW (the §B.2 BI→BH bridge)

The owner edict names **BH** as the relay-of-record channel; the producer's **live coordination dir**
is **BI**. This is the §B.2 BI→BH bridge nuance — the record must reflect that BI is where the producer
is CURRENTLY active, and redirect accordingly.

### BI (`../glass-ui/docs/tranches/BI/coordination/`) — the LIVE producer dir (5 valuejs files)

| File | Landed commit | Content |
|---|---|---|
| `VALUEJS-T-COMMUNIQUE-2026-07-11.md` | (T-era) | the T-campaign communiqué (carried into BI) |
| `valuejs-inbox-2026-07-13-bi-dist-breakage.md` | `c66b5354` | the E-2 relay — consumer-observed BI dist breakage @ `da051943` (the substrate-pin evidence) |
| `valuejs-inbox-2026-07-13-colands-preview.md` | (BI) | the co-land PREVIEW record |
| `valuejs-inbox-2026-07-13-u-w-lib-invariant.md` | **`6c3e1609`** | the U.W-LIB invariant addendum — composite Locus-P (no co-migration; spectrum-walk PRESERVED) + U-F29 loud-fail/parseCSSValues + U-F34 renames + MAJOR cut owner-held |
| `valuejs-inbox-2026-07-13-u-w-visual.md` | `dd9af7cf` | the U.W-VISUAL producer-material addendum (relay) |

### BH (`../glass-ui/docs/tranches/BH/coordination/`) — the formation + A11Y channel

| File | Commit | Content |
|---|---|---|
| `valuejs-inbox-2026-07-12-u-formation.md` | formation `17e0f522`; A11Y addendum `bfa01512` | the formation communiqué (§2a U-F4, §2b T producer reds) + the appended A11Y-wave addendum (§A11Y-1..6) |

### The HONEST SPLIT (recorded, not stranded)

- **formation + A11Y** live at **BH** (the relay-of-record channel the owner edict names).
- **LIB-invariant (`6c3e1609`) + VISUAL addendum (`dd9af7cf`) + dist-breakage (`c66b5354`) +
  colands-preview** live at **BI** (the LIVE dir where the producer is CURRENTLY active).
- **The redirect**: at the fired cut, the co-land ADDENDUM lands in the **THEN-active** coordination
  dir (BI now, or whatever tranche the producer has advanced to), SUPPLEMENTING — never superseding —
  the BH formation communiqué + the BH A11Y addendum + the BI letters.

**No obligation is stranded**: every relay row is either LANDED at its channel (formation@BH,
A11Y@BH, LIB-invariant@BI, VISUAL@BI, dist-breakage@BI) or STILL-BOOKED cut-gated (co-land addendum,
keyframes co-migration). The BI→BH bridge is recorded so the successor lands the fired-cut addendum in
the live dir.

---

## §3 · FOREIGN-TREE FENCE — HONORED (NO new communiqué authored)

This verification is **read-only greps at sibling HEADs**. **CLOSE authored NO new communiqué and made
NO foreign-tree edit.** The relay half is proven REAL by confirming what is already landed; a NEW
relay is NOT opened at close (the fired-cut addendum is the successor's, executed at the owner-gated
cut). E-2 / M1: the value.js-side record IS the gate; the sibling-HEAD confirmation is the proof, not
a new dispatch.

---

## §4 · RELAY-CLOSE OUTCOME SUMMARY

| Obligation | Channel | State at close |
|---|---|---|
| U-formation communiqué | BH (`17e0f522`) | **LANDED — STILL PRESENT** (+ A11Y addendum `bfa01512`) |
| U.W-LIB invariant addendum | BI (`6c3e1609`) | **LANDED** (the LIVE dir) |
| U.W-VISUAL producer addendum | BI (`dd9af7cf`) | **LANDED** (the LIVE dir) |
| BI dist-breakage relay | BI (`c66b5354`) | **LANDED** (the substrate-pin evidence) |
| U.W-A11Y-wave addendum | BH (`bfa01512`) | **LANDED** (appended to the formation file) |
| U.W-ADOPT co-land addendum | (THEN-active, BI) | **STILL-BOOKED — cut-gated** (foreign edit only at the fired cut) |
| keyframes co-migration | keyframes dev channel + pin-widen | **STILL-BOOKED — cut-gated** (ties B1/B2) |

**BI is the producer's LIVE inbox** (5 valuejs files, activity 2026-07-13); **BH is the
relay-of-record channel** (formation + A11Y). The two cut-gated obligations ride forward with the
cut-execution residual (PP-16) — the glass-ui v5 cut is UNFIRED. **Zero silent drops. Foreign-tree
fence honored.**

---

**Precedence chain** (restated): owner verbatim → `audit/registry.md §28.3 / §B.2` → `DISPOSITION-LEDGER.md`
→ `U.md` → `waves/U.W-CLOSE.md` → this verification. CLOSE proves the relay half is REAL by read-only
confirmation; it opens no new communiqué.
