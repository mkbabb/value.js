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

1. **In-session cron — TORN DOWN by owner order 2026-07-17** ("kill any remaining crons"),
   after the formation-era `ba1d0311` (:23) and execution-era `4f129d93` (:41) each served
   their span. No cron is re-created unless the owner orders one. Mail vigilance now rests
   ENTIRELY on the wave Step-0 sweeps (V-PRIME §2 — every wave opens with the four-path
   sweep; no wave closes with UNREAD mail in scope) plus layers 2–3 below.
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
| I-9 | 2026-07-17 | glass | `../glass-ui/docs/tranches/BI/coordination/glass-outbound-2026-07-17-q060-glass7-live.md` — **GLASS 7.0.0 IS LIVE** (npm provenance, tag `v7.0.0`, HEAD `4ab12128`; 82→74 keys, corrected removal list; peers value`^4`+kf`^6` = the wedge exit; `--legacy-peer-deps` never). §3 value.js row confirms OUR five sites at their post-W43 homes + asks the `^7.0.0` pin be DECLARED (= our B2/3b duty). **§7 two defects SHIP in the tag** (glass-owned BJ born-RED waves): V-A95 aurora reverse-drag black-slab; Chip/Badge orphaned dist CSS (our `/toggle-chip`→`<Chip>` site renders incomplete glass until their fix — visual residual, not an adoption blocker) | FOLDED | **W44** (owner adoption order 2026-07-17 — "7.0.0 is deployed… adopt it"; D58 records the order superseding the fuller handoff tuple; self-verified registry evidence substitutes) |
| I-10 | 2026-07-17 | keyframes | `keyframes-inbox-2026-07-17-glass7-consumed-wl-marked.md` (THIS dir) — the §D-expected consume-confirmation ARRIVED: kf landed exact glass `7.0.0` on immutable kf 6.0.0, value 4.0.0 exact-pinned, registry-only, no force flags — the P127 wedge exited on their edge too; demo 14/14. AND the O-4 reply: all WL verdict rows marked terminal — **D-GAP-6 DECLINE ACCEPTED** (they adopt `sampleBezier` only if a future 4.1 ships it); RF-18 census-split recorded ENACTED (`add20b7e`). No asks; no row owed | FOLDED (swept at W44 close; both §D keyframes expectations DISCHARGED — CARRY-LEDGER §D amended; the D-GAP-6 conditional joins the SCI-1 4.1 vehicle note) |
| I-8 | 2026-07-17 | atlas | `ATLAS-INBOUND-2026-07-17-two-atlas-disambiguation.md` (tranche root) — two-atlas census correction: `CONSUMER-CUT.md` §1/§3's atlas row describes the STALE standalone checkout (1.x-era master); the ACTIVE atlas (sci-report subtree, `p/totality`) is ALREADY fully migrated to value 4.0.0 (`b066b2b..092df4f` — zero bare-root/`/parsing`/`/units` imports; `srgbToOKLab`/`oklabToRgb255` gone), so the downstream atlas BUILD row costs zero migration; sci-report (the app) deliberately holds the OLD trio and crosses to value 4 ATOMICALLY at its glass-7 consume — no early bump. No reply owed. | FOLDED | **W40** Step-0 fold (CONSUMER-CUT atlas-row truth fix rides the canon-truth step) + **W56** (downstream refresh posture: active-lineage discharged; any standalone row scoped stale-archive; no sci-report early bump); O-3 gains a one-line receipt ACK |

## Outbound

| # | Date | To | Letter | Status |
|---|---|---|---|---|
| O-0 | 2026-07-15 | glass | `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-15-v-formation.md` — the pre-E13 producer bundle (P019/P122/P047/P051/P092) | SENT pre-ledger; rowed for totality — O-1's re-formation notice covers it ("substance unchanged") |
| O-1 | 2026-07-17 | glass | `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-17-v-reformation.md` — ACK I-1/I-2/I-4 + re-formation notice + E11 result (non-evidentiary) | **SENT** at formation close (convergence chain step 1) |
| O-2 | 2026-07-17 | keyframes | `../keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-17-formation-exchange.md` — bilateral formation exchange + direct answers to their IN-ATLAS-2/IN-ATLAS-3 | **SENT EARLY** at owner signal ("keyframes is set to begin") — formation-input timing overrode the at-close default; their naming grammar (`<SENDER>-INBOUND-*` in `coordination/`) adopted over the planned root-level name. One-packet law honored: any correction from our final clean-passes rides the first WL verdict letter, not a fresh packet |
| O-3 | 2026-07-17 | atlas | `../sci-report/atlas/docs/tranches/P/coordination/2026-07-17-valuejs-v-reformation-ack.md` — crossing ACK + SCI-1/2/3 = WL rows; §3 rewritten pre-send: the `^3.1.0` pin question was ANSWERED by I-8 (stale standalone checkout; deliberate sci-report hold) — now a resolved receipt-ACK, no question outstanding | **SENT** at formation close (convergence chain step 1); carries I-8's receipt ACK |
| O-4 | 2026-07-17 | keyframes | `../keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-17-wl-verdicts.md` — WL covenant DECIDE verdicts: §B decline-move/confirm-shipped-on-`/css`, §C decline-with-rationale (concept deleted), §D confirm-shipped (no new code), §E confirm-shipped-in-4.0.0 (no 5.0); §I **D-GAP-6 DECLINE** (blessed compose-from-`/math` pattern) + D-GAP-1/5 closure ACKs (quart/quint verified easing.ts:50-55) + FAM-14 negative-result recorded; RF-18 census-split recommendation (one row, sent once). Does NOT re-send the O-2 exchange | **SENT** 2026-07-17 (WL discharge; verified read-only vs the settled 4.0.0 tree) |
| O-5 | 2026-07-17 | atlas | `../sci-report/atlas/docs/tranches/P/coordination/2026-07-17-valuejs-wl-sci-verdicts.md` — WL SCI DECIDE verdicts: **SCI-1 SHIP-4.1** (`mixColorsInto`/`toRgba8Into` into-variants, un-dated/execution-gated, evidence tuple owed at the cut), SCI-2 DECLINE (bless consumer-clamp via `/math` `clamp`), SCI-3 DECLINE (bless unwrap-at-init); RF-16 `^3.1.0` recorded-closed (O-3/I-8); nothing else owed on immutable 4.0.0 | **SENT** 2026-07-17 (WL discharge) |
| O-6 | 2026-07-17 | glass | `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-17-glass7-adopted-plus-three-marks.md` — W44 adoption confirmation (island dead; lock registry-only; `^7.0.0` DECLARED = their §3 ask discharged; routed mount GREEN under 7.0.0 — a full-surface consumer proof) + the ≤3-mark batch: **M1** DarkModeToggle lost its passive arm (we ship a decorative glyph; ask: passive variant or MIGRATION note) · **M2** `useLayerTransition` removed w/o public successor (local shim in ActionBarLayer; ask: public content-swap composable or bless) · **M3** Chip orphaned-CSS consumer evidence for their §7/BJ row (no ask). Replies, if any, fold per CARRY-LEDGER §F (M1/M2→W47) | **SENT** 2026-07-17 (W44 close; the standing BH/BI relay edict) |
