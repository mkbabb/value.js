SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.a` — THE I-20 CELL ROSTER · the roster of record

**Gate**: G-KFW9-2 (cell separation). **Seat**: `.a`, 2026-09-17.
**Authority**: `docs/tranches/X/keyframes/waves/KF-W9.md` §Surface-list protocol 4 (the ten cells) ·
§Gates G-KFW9-2 · §H *I-20 (cell separation)* · §Sequencing S-13 (the harness-redesign trigger).

---

## 0 · Why this file exists, stated as the defect it closes

**I-20 has fired TWICE.** Its law: **`webkit-engine` ≠ `safari-app`**, and a verdict read in one column
and written into the other is *a gate failure, not a shortcut*. The harness could not express the
distinction at all before this seat — measured, not asserted:

⟨`grep -c 'safari-app\|webkit-engine\|ios-device\|ios-simulator' …/audit/visual/capture.mjs …/states.mjs`⟩
→ `capture.mjs:0` · `states.mjs:0` **(the born-RED witness, wave record §Baseline)**

A harness that cannot name a cell emits rows that are *ambiguous between an engine and an app*. Every
such row is a candidate for the exact substitution the law forbids. **The cure is not a convention: it
is a throw.** `assertCell()` in both files rejects a row whose driver does not match its cell, so a
playwright reading cannot wear a `safari-app` label even by accident.

---

## 1 · THE TEN CELLS — the roster, whole

| # | cell id | column | driver that must actually be driving | notes |
|---|---|---|---|---|
| 1 | `safari-app/desktop` | `safari-app` | `safaridriver` | real Safari on macOS. **OP-3 MET at this seat** (SUBSTRATE-PIN §4) |
| 2 | `safari-app/ios-device` | `safari-app` | `safaridriver` on a paired iOS device | `.c`'s cell; discharges S-8 family (v) whole |
| 3 | `safari-app/ios-simulator` | `safari-app` | `safaridriver --use-simulator` | **NOT interchangeable with (2)** — `safari:useSimulator` is carried on every row |
| 4 | `webkit-engine` | `webkit-engine` | playwright `webkit` | the engine, never the app. A verdict here NEVER enters a `safari-app` column |
| 5 | `chromium` | `chromium` | playwright `chromium` | |
| 6 | `chromium/emulated-forced-colors` | `chromium` | playwright `chromium` + `forcedColors: "active"` | **an emulation labelled as WHC is the I-20 failure by name** (S-13) |
| 7 | `windows/real-HCM` | `windows` | a Windows host in real High Contrast Mode | no Windows host ⇒ **UNREACHABLE-IN-CELL with the bound stated**, never an emulation wearing the label |
| 8 | `at/voiceover-safari` | `at` | VoiceOver + `safaridriver` | **runs INSIDE this wave by ruling** — COHESION §0j.C **KF-AT**; `.d`'s arm; no new lane is minted |
| 9 | `at/nvda` | `at` | NVDA on a Windows host | |
| 10 | `at/jaws` | `at` | JAWS on a Windows host | |

**Cross-column law, mechanized**: a row's `cell` fixes its `column`. `assertCell(cell, driver)` throws
`I-20 CELL VIOLATION` when the driver does not belong to the cell. There is no flag that disables it.

---

## 2 · WHAT AN UNRUN CELL MAY SAY — and what it may never say

Exactly three vocabularies, and **silence is not one of them**:

| verdict | means | required beside it |
|---|---|---|
| `UNMEASURED` | the cell exists and was not run | — |
| `UNREACHABLE-IN-CELL` | a UA capability or a missing host forecloses it | **the capability or host, named** (OP-4's law: *by UA capability, not by omission*) |
| `UNVERIFIABLE-HERE` | the observation cannot discriminate in this cell | the discriminator that fails |

**`GREEN` is not in the list unless the row carries a per-shot `sha256`.** G-KFW9-2's own close
condition: *"green without per-shot sha256 FAILS"*. `assertShot()` enforces it.

---

## 3 · OP-4 — THE PER-CELL CAPABILITY RECORD (owed per cell, never inherited)

Every cell records the **three `.media` strings**, evaluated *inside that cell*:

```
matchMedia('(forced-colors: active)').media
matchMedia('(prefers-reduced-transparency: reduce)').media
matchMedia('(prefers-reduced-motion: reduce)').media
```

A query the UA cannot parse serialises as `not all`. A row reporting `UNREACHABLE-IN-CELL` on a
capability ground **must point at its own cell's reading**, not at another cell's.

### 3.1 `safari-app/desktop` — MEASURED AT THIS SEAT, 2026-09-17

Session `7BB393EF-45A2-4EB5-9B01-C12155925F97`, Safari **26.4** / macOS **26.4.1** (25E253),
`safari:useSimulator: false`:

```json
{"fc":"(forced-colors: active)",
 "prt":"(prefers-reduced-transparency: reduce)",
 "prm":"(prefers-reduced-motion: reduce)",
 "fcMatch":false,"prtMatch":false,"prmMatch":false,
 "ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Safari/605.1.15",
 "dpr":2,"iw":800,"ih":600}
```

**All three PARSE** — each `.media` round-trips byte-identical to its input; none serialises `not all`.
**Therefore the `safari-app/desktop` column is NOT foreclosed by UA capability** for forced-colors,
reduced-transparency or reduced-motion, and a row reporting `UNREACHABLE-IN-CELL` there must name a
reason that is **not** capability.

The three `*Match` values are `false` — the host is not currently *in* any of those modes. That is a
**baseline**, not a finding: `.b`/`.d` set the mode and re-read inside their own runs.

**This is the desktop reading and it binds nothing else.** `.b` re-takes it in its own session; `.c`
takes `ios-device` / `ios-simulator`; `.d` takes `hcm` / `at`. **No cell inherits another's.**

---

## 4 · THE SUBSTRATE STAMP CARRIED ON EVERY ROW

```
SUBSTRATE = { repo: "keyframes.js",
              ref: "master == origin/master",
              sha: "55e9bf0d2391bbc6d9871bb3f0555a6225daae92" }
```

Overridable only by `--substrate-sha=` **at the command line**, so a run against a different substrate
is *declared* rather than silently inherited. `bundleSha256` is **required at capture time** and is
supplied by `--bundle-sha=` (see SUBSTRATE-PIN §3: the built bundle this seat found at open was
destroyed by a sibling's `npm install` at 15:26:18 and the field cannot be pre-filled honestly).

---

## 5 · THE HARNESS BOUND — stated so it is not crossed quietly

`docs/tranches/V/megatranche/workflows/safari-real-matrix.js` is **EXECUTE, NO WRITE** — shared
apparatus with **X-W11 G8** at **SEPARATE cells**. Neither lane consumes the other's captures.

> **A cell label that cannot be expressed in `capture.mjs`/`states.mjs` is a harness redesign shared
> with X-W11 G8 → S-13 TRIUMVIRATE, never a quiet edit.**

Every one of the ten labels above **is** expressible in `capture.mjs`/`states.mjs` as carved — that is
the measurement that keeps the trigger unarmed, and it is re-checkable by the `ROSTER_DIGEST` guard:
each file hashes its own `CELLS` literal at run time and aborts if the two diverge. **The roster is
duplicated in two files because §Bounds makes those two files the only writable harness surface;
divergence is therefore made DETECTABLE rather than trusted.**
