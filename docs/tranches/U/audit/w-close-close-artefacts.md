# U.W-CLOSE — CLOSE ARTEFACTS (the tranche-terminal stamp)

**Wave**: U.W-CLOSE (the terminal DAG sink over nine decided waves). **Date**: 2026-07-13.
**Branch**: `tranche-u`. **Run**: `wf_a6f37335-625`. **Verdict**: **CLOSED `complete_with_misses`**
(PP-16) — the five born-RED close gates returned **3 GREEN · 1 GREEN-on-presentation · 1
`complete_with_misses`-with-frame-obligations-NAMED**, and every named residual is recorded with an
external gate; NONE rides UN-DECIDED to a successor tranche.

**What this file is**: the U.W-CLOSE wave close roll-up — the five gate rows + their live evidence,
the enumerated misses, and the **owner-packet inventory** the orchestrator presents at the terminal
report. The row-by-row zero-drop ledger walk lives in `../FINAL.md` (the ledger lane owns it; this
scribe does NOT touch it). The stage-1 packets it consumes: `w-close/book-register.md` (B1..B14 live
re-probe) · `w-close/annex-packet.md` (the owner-attest slate) · `w-close/publish-presentation.md`
(the §13.5 version-cut packet) · `w-close/relay-close.md` (the relay verification).

**Terminal-wave fact** (live-re-probed at this close): all nine upstream waves are CLOSED/decided;
the glass-ui **v5 cut is STILL UNFIRED** (`git -C ../glass-ui tag --list 'v5*'` → EMPTY; glass-ui HEAD
**`cae697cc`** on `tranche/BI` — advanced from `8b0f9acc` at the stage-1 write, still on `tranche/BI`,
still no cut). CLOSE proves the zero-silent-drop contract; it fixes NO defect except the CANON
hygiene-retires the book-register executed (U-F51/F52/F53). An un-taken publish cut is **NOT a miss**
(PP-16 / G-CLOSE-5).

**Precedence** (binds every row): owner verbatim (§13.5) → `audit/registry.md`
(§8/§13.5/§16/§21/§26/§28/§28.3) → `DISPOSITION-LEDGER.md` → `U.md` → `waves/U.W-CLOSE.md`. The
registry WINS on divergence; the owner's verbatim wins above all.

---

## §1 · THE FIVE BORN-RED CLOSE GATES (each ARMED-at-authoring, flipped at close-execution)

| Gate | What it guards | State at close | Evidence cite |
|---|---|---|---|
| **G-CLOSE-1** — zero-drop ledger-walk (E-4 completion proof) | every ledger row → a `FINAL.md` disposition-with-evidence + the Family-audit invariant | **GREEN** | `npm run proof:close-ledger` → **GATE GREEN** live at close: §A **77/77** families walked/matched, §B chronic **6/6**, §B.1 carried-books **3/3**, §C.1 orphans (boot-G · CC-1 · L8 · W8-2) present, §BOOKS + §attested-not-verified + §owner-reserved present; Family-audit invariant confirmed (F1..F77 each once; F6/F55 split-homed; F18/F19 → W8-census; F20/F59/F60 retire; F54 the annex). Regenerable (`scripts/gates/proof-close-ledger.mjs`, CI-wired via `test:dist` — the LoC-precept pattern, not a hardcoded checklist). `FINAL.md` landed `a113eeb`. |
| **G-CLOSE-2** — book re-probe | every §BOOKS entry carries a LIVE re-probe outcome in `FINAL.md`, not an inherited wave-doc claim | **GREEN** | `w-close/book-register.md` (`adf0327`) + `FINAL.md §BOOKS`: **B1..B14 all live-re-probed**, one compact purpose-built probe each (probe-parsimony). Tally: **LANDED** 3 (B4 settle-guard · B5 barrel-parity/size-graph · B9 ESLint boundary) · **STILL-BOOKED** 2 (B1 kf next-tag · B6 born-RED register) · **complete_with_misses** 2 (B2 v5-cut · B8 headed-GPU annex) · **DECISION-PENDING-OWNER** 3 (B3 Q14 · B7 CI-teeth · B14 publish) · **attested-not-verified / deploy-dependent-flagged** 3 (B11 NCSU · B12 headers · B13 impersonation/token) · **RATIFIED-with-rationale** 1 (B10 up-imports) · RETIRED-on-re-probe 0. **14/14, zero silent drops**; no book asserted green from a headless/VPN/deploy-pending probe. |
| **G-CLOSE-3** — U-F61 attested-not-verified flags | `FINAL.md` flags EACH of the four single-sourced claims with its TRUE status + cross-reference | **GREEN** | `FINAL.md §attested-not-verified`: all four flagged, none laundered — (1) **X2 NCSU-301** attested-not-verified (VPN-gated), ties U-F41/B11; (2) **CI TBT red** 2-core-CI-only pure-ledger (local 187/188 ms GREEN), ties U-F3/B3; (3) **born-RED cure-ownership** still-armed (O-16/O-26/O-5 ship RED; O-26 can NEVER flip on software-GL), ties U.W-ORACLE/B6; (4) **deploy-webhook** attested-from-artefacts, network-unverified. |
| **G-CLOSE-4** — real-GPU visual annex attest (U-F54) | the §2 owner-eye still-reds (U-F5..F13) + U-F7 carry owner-attested frames, NEVER a headless assertion | **`complete_with_misses` — frame obligations NAMED** | `w-close/annex-packet.md` (`928c81f`): the owner-attest slate ASSEMBLED — **11 owner-attest rows + 1 HG6 taste stub**, every VERDICT field **EMPTY for the owner**. The owner has NOT attested in-window (owner-attestation is the owner's terminal act, not the scribe's). Per G-CLOSE-4 + PP-16: closes `complete_with_misses` with each row's **exact frame obligation NAMED** (§1 VISUAL-7 real-GPU/owner-eye · §2 A11Y OA-1/OA-2 `-before`-paired aesthetic · §3 ADOPT OA-B1/OA-B2 CUT-GATED · §4 u-f12 Pole A/B · §5 U-F7 T-58 mandate · §6 HG6). **NOT headless-greened** — the registry logged TWO demonstrated headless false-reds on EXACTLY these surfaces (U-F4 `overture.css` · U-F13 PRM confound, §21). |
| **G-CLOSE-5** — publish-presentation (owner-held §13.5) | the PUBLISH packet is PRESENTED to the owner WITH the landed fix | **GREEN (presented-with-landed-fix)** | `w-close/publish-presentation.md` (`928c81f`) + `w-lib/publish-packet.md`: the fix **LANDED** (LIB slate 20/20 GREEN · vitest 2312/2312 · `proof:lib-correctness` 10/10); semver class **FORCED MAJOR** (number owner-decides, `4.0.0` recommended); both `^3.1.0` floors named (glass-ui PEER + keyframes RUNTIME `dependencies`); the **FOUR** consumer surfaces (registry §28 wins over R6's three) provably **preserved-or-co-migrated, ZERO co-migrants** (Locus-P). §13.5 forbids the unilateral cut → the cut is DECISION-PENDING-OWNER. **An un-taken cut is NOT a miss** (PP-16 / G-CLOSE-5): the fix landed + the cut sequenced + owner-held. |

**Gate tally**: G-CLOSE-1 · G-CLOSE-2 · G-CLOSE-3 = **GREEN** (3); G-CLOSE-5 = **GREEN-on-presentation**
(1); G-CLOSE-4 = **`complete_with_misses` with frame obligations NAMED** (1). **0 FAIL · 0 fabricated
green · 0 headless false-green.** The one non-GREEN gate (G-CLOSE-4) is honestly `complete_with_misses`
because the owner-attestation is the owner's terminal act — the scribe presents the slate, never
fake-judges a GPU gestalt.

---

## §2 · THE MISSES (`complete_with_misses` — each DECIDED, each external-gate NAMED, none re-booked UN-DECIDED)

CLOSE is the terminal wave: nothing rides to a **later U wave**. The residuals below are legitimately
external-gated, DECIDED, and each carries its named gate. The disease-row law holds — a family DECIDED
here does not ride un-decided to a successor tranche.

| # | Residual | Disposition | External gate NAMED |
|---|---|---|---|
| M1 | **glass-ui 5.0.0 cut execution** (U-F2/F68/F77 · B2) | DECIDED build; cut owner-/USER-gated, **UNFIRED** | the owner-gated `v5*` tag (empty at close). Adopt-EVENT ordering authored (7-pin retirement + lock-refresh + boot-smoke + named BI-acceptance constraints). |
| M2 | **VPN-gated NCSU on-wire re-verify** (U-F41 → U-F61 · B11) | attested-not-verified; ties X2 | the NCSU VPN; the `[U-F41-DEPLOY]` action item LANDED. NEVER asserted green. |
| M3 | **deploy-dependent live confirmations** (U-F39 headers · U-F36 impersonation · U-F38 token-at-rest · B12/B13) | deploy-dependent-flagged; repo artefacts (born-RED tests + `_headers`/fix) LANDED | the CF-Pages deploy. `curl -sI color.babb.dev` → HTTP/2 200, **nosniff ONLY** on the wire (CSP/HSTS/X-Frame-Options ABSENT pre-deploy) — recorded honestly, never green pre-deploy. |
| M4 | **owner-un-attested annex frames** (U-F54 / U-F7 + the §2 still-reds · B8 · G-CLOSE-4) | `complete_with_misses`, frame obligations NAMED | a real-GPU/owner frame, NEVER headless (§21 two logged false-reds). 11 rows presented, VERDICTs EMPTY. |
| M5 | **the library-correctness version cut** (U-F77 / §13.5 · B14) | fix LANDED + packet PRESENTED; cut owner-held | the coupled owner event. **An un-taken cut is NOT a miss** (PP-16). |
| M6 | **U-F3 Q14 LCP escalate** (B3) | DELIVERED-as-structural-fact; resolved to **ESCALATE** | the producer cut in-window (Pole A → G-PERF-3 GREEN) OR an owner-ruled re-scope (Pole B); `lighthouserc.json:13` untouched (Q14 verbatim — never a gate re-baseline). LCP 5141 CI (~2×), RP-2 331.0 KiB JS-eager producer-gated on the unfired adopt. |
| M7 | **CI-teeth blocking-vs-soft posture** (B7) | DECISION-PENDING-OWNER; no owner ruling on record | default **SOFT-but-OWNED** (per U.W-ORACLE); the Pole-A hard-subset promotion PREPARED-but-RESERVED. Presented, not decided (no fabricated ruling). |
| M8 | **U-F28 keyframes next-tag retire** (B1 · WATCH) | STILL-BOOKED | a keyframes tag **> 5.2.0** (disk at `v5.2.0`, no tag past it; **0** direct value.js kf imports = a standing GREEN structural fact). |
| M9 | **the two cut-gated relay obligations** (relay-close §1) | STILL-BOOKED cut-gated | the fired cut — the co-land ADDENDUM + the keyframes co-migration land in the THEN-active producer dir at the cut (foreign-tree fence: no new communiqué at close). |

**PP-16 statement**: gates-pass-goal-unmet closes `complete_with_misses`. CLOSE's own five born-RED
gates (G-CLOSE-1..5) are the close-work; the residuals above are external-gated, DECIDED, and named. No
UN-DECIDED family, chronic, or prompt-recap row rides to a successor tranche — E-4's discharge holds
through close. The two CANON deferrals from the book-register (U-F52 `u-gestalt` 51 MB load-bearing
π-frame evidence PRESERVED; U-F53 the one live PERF-tail worktree, 4-clause-failing) are proof-backed
deferrals, NOT drops.

---

## §3 · THE OWNER-PACKET INVENTORY (what the orchestrator presents at the terminal report)

The owner-reserved slate — **PRESENTED, never proxied, never ruled here**. Every document below leaves
its VERDICT/decision field EMPTY for the owner. The coupled owner event (ratify U + close T as ONE:
master-merge+tag · Q14 ack · T.W8 HG6 verdict) is the owner's; CLOSE assembles the packet and presents.

| # | Owner decision | Packet file (absolute-relative to repo root) |
|---|---|---|
| P1 | the tranche close of record (the zero-drop walk) | `docs/tranches/U/FINAL.md` |
| P2 | **the version cut / npm publish** (§13.5 — semver MAJOR forced, number owner-decides) | `docs/tranches/U/audit/w-close/publish-presentation.md` + the full packet `docs/tranches/U/audit/w-lib/publish-packet.md` |
| P3 | **the owner-attest annex slate** (11 rows + HG6 stub, all VERDICT EMPTY) | `docs/tranches/U/audit/w-close/annex-packet.md` |
| P4 | **the B3 / B7 / B14 owner decisions** (Q14 Pole A/B · CI-teeth posture · publish) | `docs/tranches/U/audit/w-close/book-register.md` |
| P5 | the relay-close verification (BI live inbox; BH relay-of-record; two cut-gated obligations) | `docs/tranches/U/audit/w-close/relay-close.md` |
| P6 | **the U-F3 Q14 LCP escalate** structural fact (both bracket poles) | `docs/tranches/U/audit/w-perf/u-f3-escalate.md` |
| P7 | **the T.W8 HG6 taste verdict** (empty stub — the coupled owner event) | `docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md` |
| P8 | this wave close roll-up (the five gate rows + misses + this inventory) | `docs/tranches/U/audit/w-close-close-artefacts.md` |

The **standing v5 probe**: `git -C ../glass-ui tag --list 'v5*'` — on fire post-close, the cut executes
per the co-land ordering (`w-adopt/coland/coland-ordering.md §6`) as its OWN owner event; the unpin is
orchestrator-owned; the version cut stays OWNER-HELD.

---

## §4 · RELAY-CLOSE VERIFICATION (E-2 · read-only at sibling HEADs · no new communiqué)

`w-close/relay-close.md` (`928c81f`) proved the relay half REAL by read-only greps. **Live re-verified at
this close** (the stage-1 doc recorded glass-ui HEAD `8b0f9acc`; the producer has since advanced):

| Fact | Stage-1 record | Live at this close | Effect |
|---|---|---|---|
| glass-ui v5 trigger | UNFIRED | **UNFIRED** (`v5*` EMPTY) | cut-gated obligations still ride forward |
| glass-ui HEAD | `8b0f9acc` (`tranche/BI`) | **`cae697cc` (`tranche/BI`)** — ADVANCED, still no cut | the producer advanced WITHIN `tranche/BI`; the "redirect if advanced" case |
| the U-formation BH communiqué | present @ BH | **STILL PRESENT** (24 763 B) | Obligation 1 LANDED, survives the HEAD advance |
| BI live valuejs inbox | 5 valuejs files | **5 valuejs files** (unchanged) | BI remains the producer's LIVE inbox |
| keyframes HEAD / last tag | `f794def9` / `v5.2.0` | **`f794def9` / `v5.2.0`** (unchanged) | B1/M8 gate holds (no tag past 5.2.0) |

**The three relay obligations**: (1) the U-formation communiqué — **LANDED, STILL PRESENT** at BH
(+ the A11Y-wave addendum `bfa01512`); (2) the U.W-ADOPT co-land addendum — **STILL-BOOKED cut-gated**
(foreign edit only at the fired cut); (3) the keyframes co-migration — **STILL-BOOKED cut-gated** (ties
B1/B2). **The honest split recorded**: formation + A11Y @ **BH** (the relay-of-record channel the owner
edict names); LIB-invariant (`6c3e1609`) + VISUAL (`dd9af7cf`) + dist-breakage (`c66b5354`) +
colands-preview @ **BI** (the producer's LIVE dir). **BI is still the producer's THEN-CURRENT active
inbox** — the HEAD advance `8b0f9acc`→`cae697cc` stayed within `tranche/BI`, so no redirect target
change; the fired-cut addendum lands in the THEN-active dir at the cut. **Foreign-tree fence HONORED**:
CLOSE authored NO new communiqué and made NO foreign-tree edit. No obligation stranded.

---

## §5 · CLOSE HONESTY STATEMENT (the anti-close-class-lie discipline)

The five born-RED gates were each ARMED at authoring (the close-work un-done) and flipped only at
close-execution: G-CLOSE-1 GREEN (the ledger walk is machine-verified, 77/77, zero drops, re-run live
this close); G-CLOSE-2 GREEN (14 books live-re-probed, one compact probe each); G-CLOSE-3 GREEN (four
single-sourced claims flagged, none laundered); G-CLOSE-5 GREEN-on-presentation (the packet PRESENTED
with the landed fix, the cut owner-held); G-CLOSE-4 `complete_with_misses` with frame obligations NAMED
(the owner-attest slate PRESENTED, VERDICTs EMPTY, NEVER headless-greened). **No gate fabricated a red;
no gate pretend-flipped a GPU visual green; no deploy-pending/VPN-gated/off-instrument state was
asserted green.** The owner-reserved slate (the version cut, the annex attestation, the u-f12 bracket,
the CI-teeth posture, the T.W8 HG6 verdict, the Q14 Pole A/B) is PRESENTED with its true state + named
gate — never proxied, never a fabricated ruling.

**Tranche U closes `complete_with_misses` (PP-16).** The zero-silent-drop contract is PROVEN
(`proof:close-ledger` GREEN); the honest caveats are FLAGGED; the semver-loaded publish decision is
PRESENTED WITH the landed fix; the real-GPU annex is POINTED at the owner — against a real-GPU/owner
frame, never a headless assertion. **All ten waves are decided; zero silent drops.**

---

**Precedence chain** (restated): owner verbatim (§13.5) → `audit/registry.md`
(§8/§13.5/§16/§21/§26/§28/§28.3) → `DISPOSITION-LEDGER.md` → `U.md` → `waves/U.W-CLOSE.md` → this
roll-up. The registry wins on divergence; the owner's verbatim wins above all. CLOSE proved the
contract, flagged the caveats, presented the decisions, and handed the owner packet.
