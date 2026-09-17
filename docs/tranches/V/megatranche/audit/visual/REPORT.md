# X.KF.W9 — Safari visual audit, keyframes.js demo · PER-CELL RESULTS

**SKELETON published by seat `.a`, 2026-09-17. 0 captures.** `.b`/`.c`/`.d` fill their own cells;
`.e` folds. Machine form: `REPORT.json`.

**Substrate**: keyframes.js `master` == `origin/master` == `55e9bf0d2391bbc6d9871bb3f0555a6225daae92`
(disqualified `8281638c` preserved by ref at `kf-sacred-snapshot-2026-09-17` = `6d280ee7`).

**Denominator**: **590** = 565 enumerated + 25 prose-carried, over 58 adjudicated records.
Published at `docs/tranches/X/keyframes/evidence/W9/SURFACE-LIST.md`. The Kronecker
**73,568** is **REJECTED** (B18-26: inherit the numerator, reject the denominator) and is
named here only as the thing rejected.

## What this file replaced, and why

The bytes here until now were the **2026-07-24 value.js-route corpus** — *"4 matrices × 15 routes =
60 captures"*, origin `http://localhost:9000`, API-less. **That corpus is G-KFW9-3's born-RED
witness**: value.js routes, pre-X, **zero real-Safari execution against any keyframes.js tree**. It was
never a kf-scoped surface list. **Nothing is destroyed**: the prior bytes are in git at `c0078d96` and
recover with `git show c0078d96:docs/tranches/V/megatranche/audit/visual/REPORT.md`.

## Cell ledger (I-20) — all ten cells, every run, never absent

An **absent** cell is how a `webkit-engine` reading ends up in a `safari-app` column by default. So
every cell appears with a state, and the only three an unrun cell may say are `UNMEASURED` ·
`UNREACHABLE-IN-CELL` · `UNVERIFIABLE-HERE`. **Green without a per-shot `sha256` FAILS.**

| cell | column | driver required | seat | state | captures |
|---|---|---|---|---|---:|
| `safari-app/desktop` | safari-app | `safaridriver` | `.b` | **UNMEASURED** | 0 |
| `safari-app/ios-device` | safari-app | `safaridriver-ios` | `.c` | **UNMEASURED** | 0 |
| `safari-app/ios-simulator` | safari-app | `safaridriver-simulator` | `.c` | **UNMEASURED** | 0 |
| `webkit-engine` | webkit-engine | `playwright-webkit` | `.b` | **UNMEASURED** | 0 |
| `chromium` | chromium | `playwright-chromium` | `.b` | **UNMEASURED** | 0 |
| `chromium/emulated-forced-colors` | chromium | `playwright-chromium` | `.d` | **UNMEASURED** | 0 |
| `windows/real-HCM` | windows | `windows-host` | `.d` | **UNMEASURED** | 0 |
| `at/voiceover-safari` | at | `voiceover+safaridriver` | `.d` | **UNMEASURED** | 0 |
| `at/nvda` | at | `windows-host` | `.d` | **UNMEASURED** | 0 |
| `at/jaws` | at | `windows-host` | `.d` | **UNMEASURED** | 0 |

### OP-4 capability record — owed PER CELL, never inherited

**`safari-app/desktop` is the only cell with a reading**, taken by `.a` in a real Safari 26.4 /
macOS 26.4.1 session (`safari:useSimulator: false`): **all three `.media` strings PARSE** and
round-trip byte-identical, so that column is **not foreclosed by UA capability** for forced-colors,
reduced-transparency or reduced-motion. It is a **baseline**, and it binds **only** that cell.

## The registers (published with the surface list, G-KFW9-12)

| register | figures | file |
|---|---|---|
| negative | **6 records · 11 probes · 4 traps** | `evidence/W9/NEGATIVE-REGISTER.md` |
| escalation | **13 armed triggers over 12 records** (3 can reach BLOCKER) | `evidence/W9/ESCALATION-REGISTER.md` |

**A retired probe re-entering the surface list is a GATE FAILURE.** **A probe satisfied by both
hypotheses is a SPEC DEFECT, not a measurement.** Both are mechanized in `capture.mjs`
(`assertNotRetired` / `assertProbeTerminal`), not merely asked for.

## Probe tally

| state | count |
|---|---:|
| EXECUTED | 0 |
| RETIRED | 0 |
| UNREACHABLE-IN-CELL | 0 |
| **UNMEASURED** | **590** |

## STANDING BLOCKER FOR THE CAPTURE BAND — OP-5

The `dist/gh-pages` bundle **does not exist**. It was destroyed **2026-09-17 15:26:18** by npm's
`prepare` → `build:lib`, whose production build writes to a **self-emptying** bare `dist/` — triggered
by a sibling seat's install in the kf tree (the `vue-tsc`/`eslint` devDependencies now dirty in
`package.json`). **No kf source byte changed** (`git diff --name-only -- src/ demo/` → 0).

`.b`/`.c`/`.d` cannot photograph a served demo until a gh-pages build exists again. **`.a` does not
rebuild**: a rebuild writes into the kf tree, which §Bounds forbids outright — *"Do NOT touch — any
keyframes.js byte"* — and S-13 makes that a **bounds expansion → triumvirate, never a quiet build**.
Full booking at `evidence/W9/SUBSTRATE-PIN.md` §7.
