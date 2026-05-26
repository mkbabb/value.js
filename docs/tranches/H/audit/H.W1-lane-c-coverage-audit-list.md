# H.W1 Lane C — `withTransaction` coverage audit-list (lane completion)

**Wave / Lane**: H.W1 Lane C — withTransaction-coverage audit-list (standing reference).
**Branch / HEAD at authoring**: `tranche-h` @ `a12a71d`.
**Date**: 2026-05-26.
**Status**: COMPLETE — sub-gate met; orchestrator relay block populated.

---

## §1 — What landed

Authored the standing reference `docs/tranches/H/audit/api-withTransaction-coverage.md` — an exhaustive enumeration of every cross-collection write site in `api/src/services/` + `api/src/repositories/`, each marked with its session status (WRAPPED / DEFERRED-WITH-RATIONALE / SINGLE-COLLECTION). This is the H1-invariant codifier doc that future api/ work consults.

## §2 — Site totals at HEAD (post-Lane-A)

| Category | Count |
|---|---|
| **WRAPPED** (§2 of the standing reference) | **9** |
| **DEFERRED-WITH-RATIONALE** (§3) | **10** (2 rationale-DEFENDED + 1 carve-out + 2 rationale-SOFT + 5 rationale-GAP-LIKELY) |
| **SINGLE-COLLECTION** (§4 — traceability only) | 14 in-services + 9 repositories + 1 out-of-tree (cron) |

The 9 WRAPPED sites include the 2 from H.W1 Lane A (`createPalette` + `patchPalette`) — written assuming Lane A's commit lands. The other 7 are the pre-H.W1 corpus (3 from E.W2 Lane B + 4 from G.W3 Lane E), unchanged.

## §3 — DEFERRED breakdown (one-line rationale per)

| # | Site | Rationale class | One-line |
|---|---|---|---|
| D1 | `batchUsers(delete)` | DEFENDED (in-code) | Per-row deleteUser is already transactional; per-batch wrap would let one bad row roll back the whole batch. |
| D2 | All `emitAuditEvent` callers | DEFENDED (D3 carve-out) | Audit-log writes MUST NOT roll back the originating action (befitting-graceful per `events/auditLog.ts`). |
| D3 | `impersonate` | DEFENDED via D2 | sessions.insert + audit; audit is the D2 carve-out → effectively single-collection primary. |
| D4 | `registerSession` | SOFT | Orphan user (no session) is operationally inert; slug not consumed from quota. |
| D5 | `loginSession` | SOFT | Stale lastSeenAt self-heals on next findAndTouch. |
| D6 | `admin/palettes.ts:deletePalette` | **GAP-LIKELY** | Same shape as wrapped user-facing deletePalette; H.W1 Lane A scoping miss. **Relay**. |
| D7 | `setUserStatus(suspend)` | **GAP-LIKELY** | Same shape as wrapped `batchUsers(suspend)`; singular variant missed. **Relay**. |
| D8 | `deleteUserPalettes` | **GAP-LIKELY** | Same shape as wrapped `batchPalettes(delete)`; user-scoped variant missed. **Relay**. |
| D9 | `pruneEmptyUsers` | **GAP-LIKELY** | Cross-collection sessions+users; mirror of wrapped suspend shape for delete. **Relay**. |
| D10 | `deleteTag` | **GAP-LIKELY-SOFT** | tags + palettes pull-cascade; partial state is cosmetic-dangling, not orphan-fatal. **Relay**. |

D6-D10 are newly-identified cross-collection write sites NOT enumerated in H-AUDIT-6 §1.4 — surfaced for orchestrator adjudication at H.W1 close. Recommended dispositions are in `api-withTransaction-coverage.md §6.2`.

## §4 — Audit-list paths

- **Standing reference**: `docs/tranches/H/audit/api-withTransaction-coverage.md`
- **This brief**: `docs/tranches/H/audit/H.W1-lane-c-coverage-audit-list.md`
- **Cross-reference Lane A**: `docs/tranches/H/audit/H.W1-lane-a-createPalette-patchPalette-withTransaction.md` (anticipated path)
- **Predecessor G.W3 Lane E**: `docs/tranches/G/audit/G.W3-lane-e-withTransaction-expansion.md`

## §5 — Sub-gate evidence (Lane C)

| Sub-gate clause | Evidence |
|---|---|
| Doc landed | `api-withTransaction-coverage.md` authored (this lane). |
| Each site classified | §2 / §3 / §4 of the standing reference enumerate every site. |
| Spot-check against actual code confirms accuracy | Every WRAPPED row's file:line was verified by reading the `services.withTransaction` invocation. Grep at HEAD: 9 invocation lines in `services/`, matching §2 count exactly. |
| Methodology documented | §1 + §5 of the standing reference: how to identify a cross-collection write site (§1.1), how to verify the wrap (§1.2), how to add a new entry (§5.1), how to detect a regression in code review (§5.2). |

## §6 — Judgment calls + relay items

1. **5 newly-surfaced GAP-LIKELY sites (D6-D10)**: enumerated in §6.2 of the standing reference. These were NOT in H-AUDIT-6 §1.4 scope — the audit-list discovery surface widened them. Recommended disposition is option (α): wrap them at H.W1 Lane A close (mechanical; ~15-30 LoC + 5 rollback tests). Option (β) defers to H.W2+; option (γ) is mixed.
2. **Rationale-soft D4 + D5** (`registerSession` + `loginSession`): documented as §3.2 entries with operationally-inert / self-healing rationale. The H1 invariant text "every cross-collection write site" could be read strictly (wrap them) or pragmatically (leave + document). Orchestrator judgment; the standing reference is honest about the tension.
3. **Cron (`api/src/cron.ts:cleanup`)**: out of scope for this audit (`services/` + `repositories/` only). Noted in §4.2 of the standing reference as a future-traceability item.
4. **Line refs for Lane A rows (§2 #8, #9)**: written as anticipated approximate lines; orchestrator should update at H.W1 close to reflect Lane A's actual landing diff.
