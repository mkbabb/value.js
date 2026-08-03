# Value v7 quiescent capture terminal mechanics RED — root intake

**Date:** 2026-08-02

**Verdict:** `TERMINAL_CAPTURE_MECHANICS_RED / NO_RETRY / NO_CLEANUP`

**Authority and credit:** `NONE / 0`

## Owner release

The capture-only owner release is one regular mode-`0644`, nlink-1 JSON file,
26,173 bytes, SHA
`32da65a2a831d4d335f3a23664ca33ef5f78709662826117dc8da8bed0dc7bf3`:

`/Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-OWNER-RELEASE-2026-08-02.json`

It authorizes one root-owned pre-authoring capture at an absent coordinate,
not v7 source. Its intended packet is seven regular files, 310 source members,
35 governing members, two identical read passes, checksum last, and no
post-checksum writes. Product, parser, Browser, Safari, Simulator, API, Docker,
package, release, rebind, admission, authority, and credit remain zero.

## Frozen failed root

Root:

`/Users/mkbabb/Documents/Codex/2026-08-02/value-mobile-safari-v7-quiescent-governing-capture/outputs`

The root now contains exactly one regular mode-`0644`, nlink-1 file and no
child directories, symlinks, or special nodes:

| File | Bytes | SHA-256 |
|---|---:|---|
| `capture-value-mobile-v7.mjs` | 18,133 | `2b7d03a1ccfba0f412964de5fd137316cf9c4280c33eec1623ac785116bb6315` |

No `SOURCE-MEMBERS.json`, `GOVERNING-MEMBERS.json`, raw receipt, manifest,
human receipt, or checksum file exists.

## First RED

The source uses `lstatSync(path, { bigint: true })`, so `stat.mode` is a
BigInt. Its first preflight calls `statRegular` on the retained source at line
318. `modeToken` at lines 89–90 evaluates:

`stat.mode & 0o7777`

That mixes BigInt and Number operands. The sole construction invocation exited
1 with `Cannot mix BigInt and other types, use explicit conversions` before
line 320 could read the owner release. Therefore:

- source members read: 0/310;
- governing members read: 0/35;
- read passes completed: 0/2;
- read-only git capture commands run: 0/16;
- derived capture artifacts written: 0/6;
- v7 source bytes written: 0; and
- product or external-state writes: 0.

The invocation stream was returned only in tool output and was not persisted
inside the packet, so no independent raw-stream file identity is claimed.

## Terminal ruling

The release's first-RED law applies. The one-file root is preserved without
patch, rerun, cleanup, checksum repair, reseal, replacement, or v7 inference.
The capture is not accepted; v7 source remains forbidden and absent. A later
capture attempt requires a separate explicit owner/root ruling for a fresh
non-overlapping coordinate. That ruling must bind this exact failed source and
require BigInt-safe stat masking before the first write. No successor is
authorized by this intake.

Value remains registry 44/44 specified, controls implemented 0/44, retentions
0/1,892, source closure 0/5, current subject passes 0/12, independent D2
0/887, Apple execution zero/OPEN, and cross-repository slots 0/5. Parser
remains paused at 14/34.
