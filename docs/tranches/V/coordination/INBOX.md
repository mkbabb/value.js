# V′ MAIL — the tranche inbox/outbound ledger (E13)

**The law (E13, owner-ruled 2026-07-17; V-PRIME §1 L7):** every wave OPENS with an inbox sweep
of the four landing paths below; new mail gets a row here (status UNREAD) BEFORE any other work;
a wave may not CLOSE with UNREAD mail addressed to its scope. Mail is MARKED, never merely
remembered — relay-received is never terminal (D37): a letter counts only once rowed here.

Sweep paths (ours + the three counterparties):

- `docs/tranches/V/` + `docs/tranches/V/coordination/` — inbound letters landing in OUR tree
  (`GLASS-INBOUND-*`, `ATLAS-INBOUND-*`, keyframes replies)
- `../glass-ui/docs/tranches/BI/coordination/` — glass outbound / constellation packets
- `../keyframes.js/docs/tranches/V/coordination/` — the keyframes exchange (their
  `<SENDER>-INBOUND-*` grammar; the tranche root is NOT a mail path)
- `../sci-report/atlas/docs/tranches/P/coordination/` — atlas relay (sci-report routes via atlas)

Status vocabulary: **UNREAD → READ → FOLDED** (content landed in an owning wave/row) and/or
**ACKED** (reply sent). W41's archival of an original never touches its row — the row is the
durable mark.

## Durability (E13 robustness — three layers, honest about what survives what)

1. **In-session cron** `E13 MAIL SWEEP` — EXECUTION era, job `4f129d93` (hourly, off-minute
   :41): sweeps the four paths, rows new mail UNREAD (append-only), replies "MAIL: quiet" and
   touches nothing when empty. Replaced the formation-era `ba1d0311` at convergence
   (2026-07-17, `reformation/FORMATION-CLOSED.md`). Platform-scoped to the live session
   (crons cannot persist to disk; 7-day auto-expiry) — it survives rate-limit stalls and idle
   time, NOT session death; any fresh session re-creates it while the tranche is open. Its
   teardown sentinel is `reformation/TRANCHE-CLOSED.md`, written at W56's canon-terminal close.
2. **This ledger** — the on-disk truth. Any session, including one born after a crash, resumes
   the mail state from here alone.
3. **User memory** (`feedback-mail-inbox-law.md`) — loads into every future value.js session and
   instructs the opening sweep. Crash/session-wall survival lives in layers 2+3, by design.

## Inbound

| # | Date | From | Letter | Status | Owner |
|---|---|---|---|---|---|
| I-1 | 2026-07-16 | glass | `GLASS-INBOUND-2026-07-16-clipboard-primitive.md` | FOLDED | **W44** (direct `writeClipboard` adoption; the adapter sketch DECLINED) |
| I-2 | 2026-07-16 | glass | `GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md` | FOLDED | **W40-S5** (canon rows) + **W44** (manifest + acceptance shape) |
| I-3 | 2026-07-16 | atlas / sci-report | `ATLAS-INBOUND-2026-07-16-consumer-crossing-report.md` (+ the owner relay of the same 3 spec inputs) | FOLDED | **WL** (SCI-1/2/3 DECIDE rows; RF-27) |
| I-4 | 2026-07-17 | glass | `../glass-ui/docs/tranches/BI/coordination/glass-outbound-2026-07-17-constellation-install-truth.md` (`b43b9f91`) | FOLDED | **W44** (provenance correction, Q060 delta cross-check, `--legacy-peer-deps` ban); packet §4 marks value.js "no action owed either direction" |
| I-5 | 2026-07-17 | owner relay | "keyframes is set to begin" — sweep found their V FORMED + RATIFIED (OD-V1, IMPL AUTHORIZED) with `EXECUTION-HANDOFF.md` fresh; their `coordination/INBOUND-LEDGER.md` rows IN-ATLAS-2 (exact-pin ruling awaits OUR patch-cadence confirmation) and IN-ATLAS-3 (callable-easing fence) awaited value.js input; no letter addressed to us in their tree yet — their value-packet ships at their formation close (expect it; the cron rows it) | ACTED | **O-2 sent early** in direct answer (cadence confirmed: no 4.x scheduled, earliest = WL/SCI-1 minor; exact-pin DELIBERATE endorsed; easing fence mirrored) |
| I-6 | 2026-07-17 | keyframes | `keyframes-inbox-2026-07-17-v-formation.md` (THIS dir) — their V-formation packet: §1 rail alignment (no ask); §2 exact-pin ruled DELIBERATE independently (converged with our O-2 answer — crossed in flight, no conflict, no supplement owed; veto window open, we endorse); §3 D-GAP-1 DELIVERED + D-GAP-5 retired-superseded + **D-GAP-6 ship-or-decline requested**; §4 FAM-14 negative result (no Value-4 registry gap) | FOLDED | **WL §I** (rewritten to the V-era truth: D-GAP-6 = the sole open ruling; the verdict letter ACKs 1/5 + records FAM-14) |
| I-7 | 2026-07-17 | keyframes | `keyframes-inbox-2026-07-17-v-execution-open.md` (THIS dir) — execution opens (OD-V1); no action owed; expect a consume confirmation here at the Glass 7 tag; standing ask = the D-GAP-6 ruling (their W12 records answers) | FOLDED | **WL §I** (same row); the Glass-tag consume confirmation will be rowed on arrival |
| I-8 | 2026-07-17 | atlas | `ATLAS-INBOUND-2026-07-17-two-atlas-disambiguation.md` (tranche root) — two-atlas census correction: `CONSUMER-CUT.md` §1/§3's atlas row describes the STALE standalone checkout (1.x-era master); the ACTIVE atlas (sci-report subtree, `p/totality`) is ALREADY fully migrated to value 4.0.0 (`b066b2b..092df4f` — zero bare-root/`/parsing`/`/units` imports; `srgbToOKLab`/`oklabToRgb255` gone), so the downstream atlas BUILD row costs zero migration; sci-report (the app) deliberately holds the OLD trio and crosses to value 4 ATOMICALLY at its glass-7 consume — no early bump. No reply owed. | READ | **W40** Step-0 fold (CONSUMER-CUT atlas-row truth fix rides the canon-truth step) + **W56** (downstream refresh posture: active-lineage discharged; any standalone row scoped stale-archive; no sci-report early bump); O-3 gains a one-line receipt ACK |

## Outbound

| # | Date | To | Letter | Status |
|---|---|---|---|---|
| O-0 | 2026-07-15 | glass | `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-15-v-formation.md` — the pre-E13 producer bundle (P019/P122/P047/P051/P092) | SENT pre-ledger; rowed for totality — O-1's re-formation notice covers it ("substance unchanged") |
| O-1 | 2026-07-17 | glass | `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-17-v-reformation.md` — ACK I-1/I-2/I-4 + re-formation notice + E11 result (non-evidentiary) | **SENT** at formation close (convergence chain step 1) |
| O-2 | 2026-07-17 | keyframes | `../keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-17-formation-exchange.md` — bilateral formation exchange + direct answers to their IN-ATLAS-2/IN-ATLAS-3 | **SENT EARLY** at owner signal ("keyframes is set to begin") — formation-input timing overrode the at-close default; their naming grammar (`<SENDER>-INBOUND-*` in `coordination/`) adopted over the planned root-level name. One-packet law honored: any correction from our final clean-passes rides the first WL verdict letter, not a fresh packet |
| O-3 | 2026-07-17 | atlas | `../sci-report/atlas/docs/tranches/P/coordination/2026-07-17-valuejs-v-reformation-ack.md` — crossing ACK + SCI-1/2/3 = WL rows; §3 rewritten pre-send: the `^3.1.0` pin question was ANSWERED by I-8 (stale standalone checkout; deliberate sci-report hold) — now a resolved receipt-ACK, no question outstanding | **SENT** at formation close (convergence chain step 1); carries I-8's receipt ACK |
