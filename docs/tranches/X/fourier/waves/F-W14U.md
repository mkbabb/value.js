# F.W14U — the fourier UI-audit rows, whole

**Minted by:** COHESION §0cl (2026-09-23). **Opens after:** F.W14 CLOSED. **Model:** Opus 5.5, every seat. **Record:** `docs/tranches/X/execution/C/F-W14U.md`. **Tree:** `/Users/mkbabb/Programming/fourier-analysis`, branch `m/w1-bump-migration`.

## Why
The owner ordered a full UI audit of every page (OA-37). The fourier register, `docs/tranches/X/audit/UI-AUDIT-fourier.md`, holds 256 rows. F.W14 `.u` dispositioned 88: 33 cured, 4 cured by `.t` or `.h`, 48 GLASS rows routed (O-59/O-63) and 3 SERVER rows routed. **168 are owed**, including BROKEN F-9 and F-14, plus 24 SPLIT consumer halves. The owner's standard for every row is "glass-ui idiomatic, rounded properly, good design hierarchy and usage of space".

## Units
- **The open seat reads the `.u` receipt** in `execution/C/F-W14.md` and the register whole. It lists every owed row by id and groups the rows by page family, following the register's own page sections. It then mints one unit per family, named `F.W14U.<family>`. Each unit takes a set of files disjoint from the others, so groups whose file sets are disjoint may run in parallel. Units that share a file run serially.
- BROKEN rows go first, in their family's unit. The SPLIT consumer halves go with their family.
- **Per row:**
  - a served-page frame before the cure (headed, 1440 and 390, in the themes the row names)
  - the cure at the root, with glass idiom and no local copy of a glass surface
  - a falsifier that reads RED before the cure and GREEN after, twice
  - a frame after the cure
  - the row's disposition written into the unit's receipt
- **GLASS rows** are relay-only. Cite O-59, or add a dated addendum beside O-59 for a newly found glass half.
- **Bounds:** `web/**` and `web/e2e/**` (additive). **`api/**` is granted** for the server rows: F-35, F-83, F-112, F-39 and F-46's server half. Also the value.js receipt and INBOX rows. The ADJACENT-LINE RULE applies.

## Close
- All 256 UIA-F rows are dispositioned. Each is either CURED with its falsifier ×2, or routed by id: GLASS to O-59/O-63, SERVER to its api cure.
- Full e2e at `--workers=1`, twice, with the load recorded. REDs stay within the named baseline set plus the honest-RED ids.
- `vue-tsc -b` 0. `vitest` GREEN.
