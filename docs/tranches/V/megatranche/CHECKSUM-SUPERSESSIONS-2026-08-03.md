# CHECKSUM SUPERSESSIONS — 2026-08-03 (M-22 ¶5; provenance ledger rows 6/7; F-7)

Dated `.sha256` packets are append-never-rewrite. Neither packet below is edited; both are
superseded as VERIFICATION AUTHORITIES by git history: the C-02 evidence commit **`338c513b`**
committed the entire Codex chain as-is, so every chain byte now has an immutable git object ID.
Verification henceforth = `git show <rev>:<path> | shasum -a 256`, never a rewritten seal.

| packet | state on disk 2026-08-03 | ruling |
|---|---|---|
| `RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256` | **5 OK / 1 FAILED** — `apotheosis/pi/HANDOFF.md` pinned `4775251e…`/41,897 B, actual `160cf37b…`/76,719 B. Cause: Codex pinned a LIVE Claude-owned file (C-12). | SUPERSEDED-BY-GIT. The gate itself discriminates (adversarial verdict #2) — this RED is preserved as information, not repaired. `pi/HANDOFF.md` is classed LIVE-CLAUDE-OWNED — MAY NOT BE PINNED (C-12 resolution). |
| `CONSTELLATION-EIGHT-HOUR-CHECKSUMS-2026-08-03.sha256` | **20 OK / 4 FAILED** — four pinned files rewritten by a Codex session 75 minutes after sealing, never re-issued (F-3). | SUPERSEDED-BY-GIT. The four post-seal rewrites are visible in `338c513b`'s content vs the seal — exactly the retroactive-edit visibility C-02 was designed to create. |
| `CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-2026-08-02.sha256` | **75 OK / 0 FAILED** (re-verified twice: fleet + adjudicator spot-check #6) | STANDS — the corpus's strongest artifact. Git supersession applies prospectively; this packet remains the pause-boundary witness. |

## Addendum — the closure receipt's ledger pins (row-23 relabel, 2026-08-03 late)

| packet | state | ruling |
|---|---|---|
| `coordination/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-2026-08-03.json` — `hydrationLedgerSha256` (`70627096…`) + `completenessLedgerSha256` (`1c7da6f0…`) | STALE by design: the provenance-ledger row-23 relabel regenerated both ledgers (51 rows: status/source columns only — every axis hash byte-identical; split = 46 REPORT-AUTHORED + 5 UNWITNESSED-DIRECT, independently confirming K-4/C-04) | SUPERSEDED-BY-GIT. The receipt is not edited; the relabel commit's git objects are the living pins. The receipt's OTHER rows (the 48-row report manifest sha256s) remain verified 48/48 OK and STAND. |
