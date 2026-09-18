# Session coverage — 2026-07-29

## Purpose

This manifest separates session artifacts that were found, sampled, or deeply
audited. It prevents a prompt archive or a lexical census from being reported
as a full session adjudication.

## Exact census

| source | artifacts found | deep receiver | present coverage |
|---|---:|---|---|
| Codex artifacts whose recorded cwd is value.js | 689 | six user-root tasks were independently identified; three roots are preserved in the handoff manifest | LOCATED |
| Codex explicit subagent artifacts | 677 of the 689 | no all-artifact disposition ledger | LOCATED |
| Codex non-subagent artifacts | 12 of the 689 | six explicit user roots; older metadata is less definite | SAMPLED |
| Claude value.js top-level roots | 11 | latest active root read through its terminal quota event | SAMPLED |
| Claude recursive JSONL artifacts | 3,504 | no all-artifact disposition ledger | LOCATED |
| Latest Claude root subagent logs | 2,088 | current workflow and tail evidence sampled directly | SAMPLED |
| Latest Claude workflow journals | 18 | terminal state and failure modes inspected | DEEP |
| Latest Claude workflow records | 19 | terminal state and failure modes inspected | DEEP |
| Handoff manifest root rollouts | 3 | 181 canonical prompt events, 180 unique prompt bodies, 2,861 agent messages; source and archive hashes matched | DEEP |
| Most recent root-message theme sample | 110 roots | lexical recurrence counted across ten governing themes | SAMPLED |
| Frozen newest Codex session files | 100 | exactly S001–S100 with unique paths/IDs, full SHA-256, role, directive, terminal evidence, disposition, receiver, and tag | DEEP |
| All Claude value.js top-level roots | 11 | exactly H101–H111 with the same audit columns | DEEP |

The durable three-root archive is
[`HANDOFF-MANIFEST.json`](../../apotheosis/pi/formation/session-audit/HANDOFF-MANIFEST.json).
It is sound for those three roots and makes no claim over all 689 Codex or
3,504 Claude artifacts.

## Latest halted Claude root

The current root log is:

`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e.jsonl`

It ends on repeated `weekly limit · resets Aug 1 at 6am` responses. No audit
workflow process is alive. The terminal workflow records say `completed` while
their children contain quota errors:

| band | terminal child states | requested/run | quota failures |
|---|---|---:|---:|
| workbenches | 36 done, 21 error | 19/11 | 20 weekly, 1 session |
| palettes | 22 done, 74 error | 32/6 | 70 weekly, 4 session |

The wrapper's outer `completed` state is false. The corrected completeness
validator no longer turns it into active coverage.

## Repeated owner instruction sample

The latest 110 roots yielded these literal theme counts:

| theme | roots |
|---|---:|
| tranche or wave | 65 |
| consumer or gestalt | 58 |
| legacy or clean break | 56 |
| KISS or contrivance | 48 |
| durability or session wall | 28 |
| colocation or modularization | 21 |
| shadcn | 13 |
| browser | 12 |
| model routing | 11 |
| frontend design | 10 |
| écoute-moi | 10 |

These counts corroborate the governing concerns. They do not disposition each
session.

## Closed 111-session boundary

The frozen boundary is
[`SESSION-ROOT-DEEP-BATCH-2026-07-29.md`](./SESSION-ROOT-DEEP-BATCH-2026-07-29.md):
100 newest actual Codex session files plus all 11 Claude top-level roots.
Prompt events are recurrence evidence, not session rows. New sessions append
only when they postdate the frozen cutoff or change a receiver.

Each future row must still name:

1. the user's instruction and any repeated edict;
2. the session's claimed close;
3. source, test, browser, or peer-repo evidence;
4. one terminal ruling or a surviving carry;
5. the later session that superseded it, when one exists.

The pass stops rereading a root when its instruction, close, and terminal
disposition already have a durable receiver. Repetition changes recurrence
weight; it does not create another implementation item.
