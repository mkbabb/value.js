SERVED MODEL: claude-opus-5[1m]

# X-W2 — Boot boundary and eager payload (Track A · X·V) — EXECUTION RECORD

Spec of record: `docs/tranches/X/waves/W2.md` (SPECIFIED; 4 serial Opus seats, M-23).
Order of record: `EXECUTION-RUNBOOK.md` §1.1 (`X-W0 → X-W2`; `X-W2 → X-W5`), seat law §5.
Rulings consumed: COHESION §0j (the begin-word), §0j.F (branch topology), §0k.1 (pathspec-on-the-commit).
This file is written by **seat 0 (OPEN)**; it stamps no verb. IMPLEMENTED is this wave's own close;
**VERIFIED is X-W11's** (W2.md §State four-verb line).

---

## Open

**Date**: 2026-09-17, seat-0 clock **17:40–17:45 EDT**. Tree `tranche-u`, HEAD `a8d9af99` at open.
Working tree at open: two modified paths, both pre-existing and neither this wave's —
`docs/tranches/V/reformation/CARRY-LEDGER.md` and `scripts/dev/dev.sh` (**CC-021 / §0j.A DR-24: never
staged, NEVER touched**).

### Preconditions, at the bytes AND in the ledger

| condition | source | measurement | verdict |
|---|---|---|---|
| **X-W0 closed** | LEDGER Track A row; runbook §1.1 (*"→ X-W0 first … gates everything"*) | ledger cell reads **CLOSED 2026-09-17 (honest-RED: HG-8's literal byte-diff clause — ESC-N1)**, close `1246f859`, CHECK 3 `d5ac877c`; CHECK 3's own words: *"**no successor is blocked by X-W0**"* | **MET** |
| **X-W1 (re-gate)** — W2.md §State `Opens after` | W2.md §10 `Depends on` | the spec rules its own edge: *"**Not blocking** — G3's pin (ii) and the bench origin make the wave executable today; X-W1 upgrades the receipt's environment, it does not enable the work."* The runbook §1.1 edge table carries **no** `X-W1 → X-W2` edge, and the LEDGER's `opens after` cell for X-W2 reads **X-W0**. X-W1 status = `planned`. | **NOT BLOCKING** (spec's own ruling, cited not presumed) |
| **X-W0's tracked-evidence rule** (CC-012) for `docs/tranches/X/evidence/W2/**` | W2.md §10 | `ls docs/tranches/X/evidence/` → **No such file or directory**. The rule is a *law about how evidence lands* (tracked, not untracked), not a pre-existing directory; unit **c** mints `evidence/W2/` with `BEFORE.json` as a **tracked** file in commit 1. | **MET as a law; the tree is minted by unit c** |
| **COMPLETABLE premise** (§COMPLETABLE): glass 7.0.0 installed, `./blob-config` present, `settled` shipped | `package.json` · the installed tarball | pin `^7.0.0`, installed **7.0.0**; `exports["./blob-config"]` → `dist/blob-config.js`, **245 B**, exporting `BLOB_CONFIG_DEFAULTS · BLOB_CONFIG_KEY · BLOB_HERO · LIGHTNESS_FLOOR_BRACKET · LIGHTNESS_FLOOR_DEFAULT · clampLightnessFloor`; `blob-config.d.ts` re-exports `./components/blob/config`, whose `:1` exports **`BlobConfig`** as a type; `Blob.vue.d.ts:63-64` `settled` / `settledFrame` | **MET, reproduced exactly** |
| **Glass election** (§0i.2 / §0i.5) | COHESION | X-W2 is `Independent of … the entire §1.M glass-coupled bank. No row here waits on Glass 8` (W2.md §10). Installed 7.0.0 is the wave's own substrate; **no bump is this wave's act**. ESC-M1 (registry 9.0.0 live) is the orchestrator's row, not X-W2's. | **NO COUPLING** |
| **`dist/gh-pages` for the byte gates** | W2.md §ENV | absent at open → built read-only by `npm run gh-pages` (`vite build --mode gh-pages`), **exit 0, built in 3.63 s**; `dist/` is `.gitignore`d (`:17`), so the build writes **zero tracked bytes** | **MET** |

**No precondition fails. The wave opens.**

### E13 Step-0 — the four-path mail sweep (seat-0 clock 17:41 EDT)

Swept read-only and compared against **every row** of `docs/tranches/V/coordination/INBOX.md`, with
classification taken from each row's **status cell**, never from a bare `grep -i unread`
(X.P.W0 CHECK 1 **D-1**). `INBOX.md` **self-excluded** (SELF-COUNT law).

1. `docs/tranches/V/` (10 `.md`) + `docs/tranches/V/coordination/` (18 entries) — newest non-self
   `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`, **ours, outbound**, rowed at **O-21**.
   Nothing unrowed.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**
   ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -3` → `BK` (2026-09-17 12:49) · `BJ` (08-03) ·
   `BI` (07-28). **THREE UNROWED LETTERS, all minted today after every prior sweep**:

   | letter | bytes | mtime | sha256[0:12] | `grep -c` in INBOX at the sweep |
   |---|---|---|---|---|
   | `glass-outbound-2026-09-17-valuejs-o20-disposition.md` | 13,567 | 17:13:39 | `2f4d56cdfbc0` | **0** |
   | `glass-outbound-2026-09-17-bbnf-lang-9.0.0-addendum.md` | 3,849 | 17:14:00 | `bc1f952c3cd9` | **0** |
   | `glass-outbound-2026-09-17-constellation-o20-relay.md` | 11,056 | 17:15:00 | `49e8f3f55b88` | **0** |

   (`glass-outbound-2026-08-29-valuejs-o20-ack.md` carries a refreshed mtime of 16:34 today and is the
   **already-rowed I-30** — ⟨cmd⟩ `grep -c` → **16**. That is the X·F `223f951b` erratum's fourth file,
   reproduced here.)
3. `../keyframes.js/docs/tranches/V/coordination/` — 12 entries + `vnext/`; newest
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`, **our own O-21 delivery**. Nothing new
   inbound.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 28 entries, newest by mtime the 2026-08-03
   batch-routing cohort; nothing dated later than our rowed I-27/I-31 pair. Nothing unrowed.

**Rowing — a concurrency fact, recorded honestly.** All three read **unrowed at 17:41** (the table
above is this seat's own measurement). Between this seat's read and its write, the **Track D X.P.W2
seat-0 sweep rowed all three** as **I-32 · I-33 · I-34, every one UNREAD**. Re-measured after the
collision: ⟨cmd⟩ `grep -c` → **1** for each. **This seat therefore rowed nothing and duplicated
nothing** — four tracks share this ledger, and the second writer's correct act is to verify, not to
re-row. The prepared rows were discarded; only the dated **sweep line** was appended at the file end.
**Tail state: 0 unrowed.**

**X-W2 scope reading, stated so nothing is inherited silently**: none of the three letters touches an
X-W2 surface — ⟨cmd⟩ `grep -Eic "blob|settled|eager|metaball"` → **1 · 0 · 2**, and every hit is
`defaultBlobColorResolver` inside I-32's *"Not restated here"* CUT-CANDIDATE block (which its own bytes
say *"none touches a value.js surface"*) or a **slides**-repo cell in I-34; ⟨cmd⟩
`grep -rn defaultBlobColorResolver demo/ src/ | wc -l` → **0** in this tree. **X-W2 opens, and will
close, with ZERO UNREAD mail in its own scope.** I-32's disposition is the orchestrator's by its own
Owner cell (the bump-conditional rows route to X-W0.j/X-W4.g; B-5's 15 imports and A-5's one word to
X-W7/X-W10); I-33's `./search` fact is already budgeted at **X-EXT-1 / §0i.5**; I-34 is Track C's.

---

## Baseline — the born-RED gates, run READ-ONLY at wave-open

Environment (§ENV honoured: **every byte number is from disk over the BUILT `dist/gh-pages`; no
dev-server number appears anywhere below** — MT-F011):

**PIN STRING (G3 admissible pin (ii), minted here and binding on BEFORE.json/AFTER.json):**
`macOS 26.4.1 (25E253) · Apple M5 Max · node v26.0.0 · @playwright/test 1.60.0 · Chromium headless (SwiftShader) · serve-built.mjs :8091`

| gate | born status (spec) | measured at open | verdict |
|---|---|---|---|
| **G1** blob barrel absent from the eager set | BORN-RED | entry chunk `index-DC7wNDmX.js`: `smin` **42** · `metaball` **17** · `satellite` **50** (occurrences); `rg -c` over the six eager chunks → **109 / 0 / 0 / 0 / 0 / 0**. `HeroBlob-DKx66VkD.js` = **2,026 B**, `smin`/`metaball` **0**, **not** in the modulepreload set. `grep -rn 'glass-ui/blob"' demo/ \| wc -l` → **5**; `grep -rn blob-config demo/ src/ \| wc -l` → **0** | **RED — as born** |
| **G2** eager JS gzip ≤ 280 KiB | BORN-RED | eager JS modules **6**; `raw= 979024  gz= 313601 = 306.3 KiB` against the bar **286,720 B** (double-run, identical) | **RED — as born** |
| **G3** p75 TBT ≤ 300 ms, N≥20 | BORN-RED (pilot N=5: 359 ms desktop / 734 ms mobile-4×) | **UNRUNNABLE AT OPEN BY CONSTRUCTION** — its command is `e2e/smoke/perf/eager-payload.spec.ts`, which **unit c creates**. This is exactly why the spec orders unit **c** FIRST (*"the baseline must predate the cure"*). The pilot table stands as the spec's own banked born-RED; the pin string above is minted for the canonical run. | **UNRUNNABLE-AT-OPEN** (cf. P-2 gate 21) |
| **G4** p75 LCP ≤ 2500 ms, N≥20 | **MEASURE-AT-OPEN** (spec-declared, not born-RED) | same instrument, same reason | **MEASURE-AT-OPEN**, unchanged |
| **G5** the wall-clock park → the shipped `settled` seam | BORN-RED | `HeroBlob.vue:211-212` `const BLOB_IDLE_MS = 2000;` / `const SLEEPY_POSE_MS = 3300;`; `:209` still reads *"booked at the 5.0.0 adopt"*; producer seam present at `Blob.vue.d.ts:63-64`; `rg "BLOB_IDLE_MS\|SLEEPY_POSE_MS" demo/ e2e/` → **20 hits across 6 files** | **RED — as born** |
| **G6** the o5 spike leg tells today's truth | BORN-RED | `grep -n "test.fail()" e2e/smoke/perf/o5-boot-pacing.spec.ts` → **`48:    test.fail();`**; the header still binds the red to *"the payload cure is W7's"* — a dead V-prime wave | **RED — as born** |
| **G7** the zero-reading telemetry artefact superseded | BORN-RED | `PERF.json` (2026-07-24, 2,893 B) present with `"lcp": 0, "fcp": 0, "tbt": 0`; **`PERF-X-W2.json` ABSENT**; `git diff --stat -- …/PERF.json` → **0 lines** (F-7 intact) | **RED — as born** |
| **G8** `BLOB_HERO` consumed or tombstoned | BORN-RED | `grep -rn BLOB_HERO demo/ src/ \| wc -l` → **0**; the symbol **does** ship (`dist/blob-config.js:2`) | **RED — as born** |

**R.2 — GREEN-BEFORE-CURE: none.** Every runnable gate reads RED at its own clock; the two
non-runnable legs are non-runnable for a reason the spec itself states, not because they passed.

### Pasted outputs (quote-by-command)

```
⟨cmd⟩ npm run gh-pages                                  → exit 0, "✓ built in 3.63s"
⟨cmd⟩ node <read-only eager probe> (scratchpad, NOT scripts/perf/eager-bytes.mjs)
eager JS modules: 6
    ./assets/index-DC7wNDmX.js                          raw=539078  gz=180098
    ./assets/rolldown-runtime-QTnfLwEv.js               raw=694     gz=423
    ./assets/vue.runtime.esm-bundler-DVtiiGpU.js        raw=109837  gz=41722
    ./assets/usePointerVelocityField-DsIf7yyq-DOaJWa17.js raw=41005 gz=15202
    ./assets/_plugin-vue_export-helper-BtWAjjFb.js      raw=262271  gz=65969
    ./assets/css-h0A6KHoK.js                            raw=26139   gz=10187
eager JS   raw= 979024  gz= 313601 = 306.3 KiB   (bar 286720 B) -> RED
render-block CSS (index-CyBun992.css ALONE) raw= 518949  gz= 88177 = 86.1 KiB   (measured, NOT gated)
TOTAL eager gz= 401778 = 392.4 KiB

⟨cmd⟩ grep -rn 'glass-ui/blob"' demo/
demo/scenes/blob/BlobPane.vue:12:import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
demo/scenes/blob/BlobPane.vue:13:import type { BlobConfig } from "@mkbabb/glass-ui/blob";
demo/picker/visual/HeroBlob.vue:34:import { Blob, BLOB_CONFIG_KEY } from "@mkbabb/glass-ui/blob";
demo/picker/visual/HeroBlob.vue:35:import type { BlobConfig } from "@mkbabb/glass-ui/blob";
demo/color-picker/composables/boot/useAtmosphere.ts:36:import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";

⟨cmd⟩ node -e "… gzipSync over the installed tarball"
node_modules/@mkbabb/glass-ui/dist/blob.js          raw=103031  gz=35461
node_modules/@mkbabb/glass-ui/dist/blob-config.js   raw=245     gz=190
node_modules/@mkbabb/glass-ui/dist/presets-5myqNv59.js raw=1581  gz=782
```

### Findings banked at the baseline (facts for the units; **no gate moved, no bar touched**)

- **F-1 · G1's `3` is a spelling defect, not a divergence of substance.** The spec's born-RED block
  writes `grep -rn "glass-ui/blob\"" demo/ | wc -l` → **3** while its own parenthetical enumerates
  **five** lines across three files. Measured today: **5 lines / 3 files**. The asserted property and
  the RED verdict are untouched. **Corrected by dated addendum-beside at close (E-3), never by editing
  §6's bytes.**
- **F-2 · the G2 baseline reproduces to 16 bytes.** `raw` is **identical** (979,024); `gz` reads
  **313,601** here against the spec's **313,585** (a gzip-implementation delta across node versions,
  0.005%). The bar (286,720 B) is **fixed at wave-open and is not editable by any implementing seat**
  (§11 guardrail 1). **Realized prediction to beat: 313,601 − 35,461 = 278,140 B = 271.6 KiB.**
- **F-3 · the render-blocking CSS figure must exclude `<noscript>`.** `index.html:212-213` emits the
  glass-fonts stylesheet **twice** — once `media="print" onload=…` (async) and once inside
  `<noscript>`. A naive "stylesheet link that is not `media=print`" filter double-counts it
  (188,594 B gz instead of 88,177 B gz). **Unit c's instrument must strip `<noscript>` blocks before
  collecting stylesheets.** CSS is measured-not-gated either way (§ENV).
- **F-4 · the `satellite` occurrence count drifted** (19 → 50) while `smin` (41 → 42) and `metaball`
  (17 → 17) held. Non-zero is non-zero; G1's falsifier is the import graph, not the tally.
- **F-5 · `scripts/perf/` does not exist**; unit c mints the directory with its one file.

---

## Unit plan

**Four units, SERIAL** (§State `Agents: 4 serial`; §4a *"Four units, serial. No two units hold
`modify` or `modify-carve` on the same path"*). **Every seat is Opus** — §State Model law **M-23**:
*"Every seat here is implementation → Opus. This wave carries no design content."*
Declared order (§5's own heading): **c (FIRST — the baseline must predate the cure) → a → b → d.**
Peak concurrency **1**; the orchestrator commits between units so each opens on a clean tree.

Every unit also appends its receipts to **this file** (`docs/tranches/X/execution/A/X-W2.md`) under
`## Unit receipts` — the execution-artefact path granted by runbook §1.1, as X-W0 CHECK 3 traced.
`docs/tranches/V/coordination/INBOX.md` is likewise a §5.3 grant, used only by the mail act.

### Group 1 — `X.W2.c` · the eager-payload instrument

- **Model**: opus · **Sections**: §5 `### X.W2.c` (L84–89) · §6 G2 (L134–147) · G3 (L148–161) ·
  G4 (L162–168) · §ENV (L220–227) · §8 (L260–268) · §9 row 1 (L274)
- **Writable**: `scripts/perf/eager-bytes.mjs` (create) · `e2e/smoke/perf/eager-payload.spec.ts`
  (create) · `docs/tranches/X/evidence/W2/BEFORE.json` (create) · this record
- **Execute-no-write**: `e2e/smoke/perf/serve-built.mjs`
- **Gates**: G2 (instrument + born-RED reading) · G3 · G4 · sub-gate `BEFORE.json`
- **Locks**: commit 1 alone (`perf(x-w2/instrument): …`), body carries the born-RED table; the three
  files land together — a BEFORE.json without its instrument is unreproducible.

### Group 2 — `X.W2.a` · the blob-config boot cut

- **Model**: opus · **Sections**: §3 scope 1–2 (L25–26) · §5 `### X.W2.a` (L91–96) · §6 G1 (L118–133) ·
  §6 G2's prediction line (L145) · §9 row 2 (L275)
- **Writable**: `demo/color-picker/composables/boot/useAtmosphere.ts` (modify-carve, **line 36 only**) ·
  `demo/scenes/blob/BlobPane.vue` (modify-carve, **lines 12–13 only**) · this record
- **Gates**: G1 · G2 (the realized delta)
- **Locks**: commit 2 alone (`perf(x-w2/boot): …`), body carries the byte delta. `HeroBlob.vue:34-35`
  is **unit b's file and stays on `./blob`** — do not touch it here.

### Group 3 — `X.W2.b` · the quiescence park

- **Model**: opus · **Sections**: §3 scope 3–4 (L27–28) · §3 scope 8 (L32) · §5 `### X.W2.b` (L98–103) ·
  §6 G5 (L169–185) · §6 G8 (L208–217) · §7 (L258) · §9 row 3 (L276)
- **Writable**: `demo/picker/visual/HeroBlob.vue` · `e2e/smoke/fixtures/blob-timing.ts` ·
  `e2e/smoke/webgl-blob-idle.spec.ts` · `e2e/smoke/oracles/o12-blob-seat.spec.ts` ·
  `e2e/smoke/mobile/blob-presence-mobile.spec.ts` · `e2e/smoke/perf/idle-frame-budget.spec.ts` ·
  this record
- **Gates**: G5 · G8 (the ruling; this unit owns the only hero path)
- **Locks**: commit 3 is **one commit and must not split** — the fixture's exports are imported by all
  four consumer specs, so a split commit reds the suite at an intermediate state.

### Group 4 — `X.W2.d` · the re-measure, the o5 verdict, the receipts

- **Model**: opus · **Sections**: §3 scope 7, 9, 10 (L31, L33–34) · §5 `### X.W2.d` (L105–110) ·
  §6 G6 (L186–196) · G7 (L197–207) · §8 (L260–268) · §9 rows 4–5 (L277–278) · §11 (L288–299)
- **Writable**: `e2e/smoke/perf/o5-boot-pacing.spec.ts` (modify-carve) ·
  `docs/tranches/X/evidence/W2/**` (AFTER.json · DELTA.md · o5-remeasure.txt · the §D producer note) ·
  `docs/tranches/V/megatranche/audit/telemetry/PERF-X-W2.json` (create) ·
  `docs/tranches/X/waves/W2.md` (**the §State Status field + the four-verb line ONLY**) ·
  `docs/tranches/V/coordination/INBOX.md` (§5.3 grant, the outbound row for the §D note) · this record
- **Gates**: G6 · G7 · the AFTER re-read of G1/G2/G3/G4 + the DELTA table
- **Locks**: commit 4 (`test(x-w2/o5): …`) and commit 5 (`docs(x-w2): close …`) — one meaning each.
  **`PERF.json` is append-never-rewrite (F-7): it is superseded by a NEW file, never edited.**
  **AFTER.json is NON-TERMINAL until X-W5 A1/A2 land (runbook §1.1) — it is written, not stamped.**

### Standing law for every unit

`npm run lint` (`eslint . --max-warnings=0`) **and** `npm run typecheck` after **each** unit and again
before close; `npm test` (vitest) after unit **b**; `git diff --check` before every commit (§7).
Pathspec **on the commit itself** (§0k.1); `scripts/dev/dev.sh` never staged; sibling trees READ-ONLY,
`glass-ui` READ-ONLY **always** — the §D producer note is authored **in-bounds** under
`docs/tranches/X/evidence/W2/` and rowed outbound in `INBOX.md`; **any physical delivery into
`../glass-ui/**` is an ESCALATION returned to the orchestrator, never a sibling-tree write** (the note
is declared **non-gating** by CC-035, so it can never block this close).
§3a triumvirate triggers, unchanged and binding: a write outside §4 · a still-red budget after the cut
(**re-baselining is FORBIDDEN** — it is S.W3's exact failure mode) · a still-red TBT · `settled` that
never settles on software-GL (**do NOT restore the wall clock**) · any third measure→edit→measure pass.

---

## Errata (E-3: dated addenda-beside; the figures above keep their bytes)

- **2026-09-17, seat 0, same sitting — SELF-COUNT correction to G5's baseline row.** The G5 cell above
  reads *"20 hits across 6 files"*. That **20** was read off a display truncated by `| head -20` — a
  self-count defect by this seat, caught by the write-then-measure double-run. **The true figure, twice
  measured on settled bytes**: ⟨cmd⟩ `rg -n "BLOB_IDLE_MS|SLEEPY_POSE_MS" demo/ e2e/ | wc -l` → **26**
  (×2), ⟨cmd⟩ `rg -l … | wc -l` → **5** (×2), the five being `demo/picker/visual/HeroBlob.vue` ·
  `e2e/smoke/fixtures/blob-timing.ts` · `e2e/smoke/webgl-blob-idle.spec.ts` ·
  `e2e/smoke/mobile/blob-presence-mobile.spec.ts` · `e2e/smoke/perf/idle-frame-budget.spec.ts`.
  `e2e/smoke/oracles/o12-blob-seat.spec.ts` imports the fixture but names **neither** constant, which
  is why the file count is 5 and not 6 — and it is still one of unit **b**'s four consumer specs,
  because its dependency is on the fixture's exports (⟨cmd⟩ `rg -ln blob-timing e2e/` → exactly the
  four the spec names). **G5's verdict does not move: RED, and the target of the cure is `rg … → 0`.**
  Unit **b** asserts against **26 → 0**, not 20 → 0.
- No other figure in this record is affected; the byte gates, the pin string and the unit plan stand.

---

## Unit receipts

_(appended by each unit as it lands)_

### X.W2.c — the eager-payload instrument (runs FIRST; the baseline predates the cure)

**SERVED MODEL**: `claude-opus-5[1m]`. **Seat clock**: 2026-09-17, **17:50–18:16 EDT**. Branch `tranche-u`.
**Sections executed exactly**: W2.md §5 `### X.W2.c` (L84–89) · §6 **G2** (L134–147) · **G3** (L148–161) ·
**G4** (L162–168) · §ENV (L220–227) · §8 (L260–268) · §9 row 1 (L274).
**Rulings consumed**: COHESION §0j (the begin-word) · **§0k.1 pathspec-on-the-commit** · §0j.A DR-24
(`scripts/dev/dev.sh` NEVER touched — it was never staged and never read for write) · E-3 throughout
(no dated spec, registry or prior-evidence byte was edited; the wave file `W2.md` is untouched by this
unit, as §4 reserves its §State edit for unit **d**).
**Writable set honoured, exactly**: `scripts/perf/eager-bytes.mjs` · `e2e/smoke/perf/eager-payload.spec.ts` ·
`docs/tranches/X/evidence/W2/BEFORE.json` · this record. **`e2e/smoke/perf/serve-built.mjs` was executed
and never opened for write** (⟨cmd⟩ `git status --porcelain -- e2e/smoke/perf/serve-built.mjs` → empty).

#### Acts, in order

**c.1 · The artefact, built clean before anything was measured.**
⟨cmd⟩ `npm run gh-pages` → **exit 0, "✓ built in 4.22s"**. `dist/` is `.gitignore`d (`:17`), so the build
moved **zero tracked bytes**.

**c.2 · The instrument — `scripts/perf/eager-bytes.mjs` (created; `scripts/perf/` minted, finding F-5).**
It parses `dist/gh-pages/index.html`, **strips every `<noscript>` block FIRST**, then collects the
`<script type="module">` entry + every `rel="modulepreload"` href + every render-blocking
`rel="stylesheet"`, resolves each to its emitted file and `zlib.gzipSync`es it **from disk at the default
level**, emitting the JSON record on stdout and the human summary on stderr. It **reports** the budget
verdict and never throws on one — the enforcing gate is the spec file, so a born-RED baseline run is a
successful measurement rather than a tool failure (exit 2 is reserved for "could not measure").

*F-3 discharged at the mechanism, not the instance.* ⟨cmd⟩ `grep -n "modulepreload|<script|stylesheet|noscript" dist/gh-pages/index.html`
→ `:205` entry · `:206-210` five modulepreloads · `:211` the blocking stylesheet · **`:212` the same
glass-fonts sheet as `media="print" onload=…` (async swap)** · **`:213` the same sheet again inside
`<noscript>`**. Measured both ways at the bytes: render-block CSS **88,177 B gz** with the strip, and
`88,177 + 100,417 = ` **188,594 B gz** without it — **F-3's predicted naive figure, reproduced to the
byte**. The async copy is excluded by its `media` attribute and **reported** under `excludedCss`, never
silently dropped; duplicate refs are folded but listed under `duplicateRefs`.

*Byte reading, triple-run across TWO independent clean builds:*

```
⟨cmd⟩ node scripts/perf/eager-bytes.mjs          (×3: build 1 twice, build 3 once)
eager JS modules: 6
    ./assets/index-DC7wNDmX.js                            raw=539078  gz=180098  (entry-module)
    ./assets/rolldown-runtime-QTnfLwEv.js                 raw=694     gz=423     (modulepreload)
    ./assets/vue.runtime.esm-bundler-DVtiiGpU.js          raw=109837  gz=41722   (modulepreload)
    ./assets/usePointerVelocityField-DsIf7yyq-DOaJWa17.js raw=41005   gz=15202   (modulepreload)
    ./assets/_plugin-vue_export-helper-BtWAjjFb.js        raw=262271  gz=65969   (modulepreload)
    ./assets/css-h0A6KHoK.js                              raw=26139   gz=10187   (modulepreload)
eager JS   raw= 979024  gz= 313601 = 306.3 KiB   (bar 286720 B) -> RED
render-block CSS raw= 518949  gz= 88177 = 86.1 KiB   (measured, NOT gated)
    excluded (async): ./assets/glass-fonts-DH5GtBvs.css  raw=132943  gz=100417  media=print
TOTAL eager gz= 401778 = 392.4 KiB
```

⟨cmd⟩ `diff run1.json run2.json` → **one line, `generatedAt`**. `raw` is **identical to the spec's
2026-08-03 reading** (979,024) and `gz` reproduces it **to 16 B** (313,585 → 313,601), i.e. seat 0's F-2
holds unchanged at this seat's clock.

**c.3 · The gate — `e2e/smoke/perf/eager-payload.spec.ts` (created, in the `smoke-perf` project by
`testDir`).** Two tests. **G2** runs the instrument *as its own command* (`execFileSync`) so the asserted
number is byte-identical to the one a reviewer gets from the shell, and asserts `eagerJsGz ≤ 286720`.
**G3/G4** drive **N=20** cold-cache loads of `#/` per config — a **fresh browser context per load** plus
CDP `Network.setCacheDisabled` (so neither HTTP cache nor `localStorage` carries between loads) — at
`desktop-unthrottled` 1440×900 and `mobile-4x-cpu` 390×844 with CDP `Emulation.setCPUThrottlingRate 4`,
and assert p75 TBT ≤ 300 ms and p75 LCP ≤ 2500 ms per config.

Four things the file makes structural rather than promised:
- **MT-F011 is enforced, not asserted in prose**: `builtOrigin()` reads the project's `baseURL` and
  **fails the test** unless its port is the `serve-built.mjs` port. No dev-server number can enter.
- **N can only be RAISED** (`Math.max(20, X_W2_CWV_N)`) — a gate whose sample size can be lowered from
  outside is not a gate.
- **The pin string is computed, never typed** (`sw_vers` + `machdep.cpu.brand_string` + node + the
  installed `@playwright/test` + the measured renderer + the origin port), with the `os`-read branch for
  G3's admissible pin (i). It reproduced **seat 0's minted pin verbatim**:
  `macOS 26.4.1 (25E253) · Apple M5 Max · node v26.0.0 · @playwright/test 1.60.0 · Chromium headless (SwiftShader) · serve-built.mjs :8091`
- **F-3 is wired as a falsifier**: the spec fails if any stylesheet is counted as BOTH render-blocking and
  async — the exact shape the `<noscript>` strip cures. If the strip regresses, this reds.
- The bars are **the spec's own bytes**, and ⟨cmd⟩ `grep -n "total-blocking-time|largest-contentful-paint" lighthouserc.json`
  → `:13 2500` · `:15 300` confirms G3/G4's cited LHCI bars are **byte-identical** to the constants used.

**c.4 · The runs.** Four, each recorded because two of them changed the instrument:

| run | what happened | act taken |
|---|---|---|
| 1 | **G2 born-RED as specified.** G3/G4 could not launch: `browserType.launch: Executable doesn't exist … chromium-1223` | **Root-cause cure, not a workaround**: ⟨cmd⟩ `npx playwright install chromium` → `Chrome for Testing 148.0.7778.96 (playwright chromium v1223)`. A toolchain fetch into `~/Library/Caches/ms-playwright`; **zero repo bytes**, and it is the same "the root owns its toolchain" shape §0l E-1 ruled for X.P.W2. |
| 2 | warmup read **TBT = 0 ms** under a `task.start >= fcp` filter | **A defect in my own instrument, not a product fact**: that filter DROPS a task that straddles FCP instead of clipping it. Replaced with Lighthouse's `calculateSumOfBlockingTime` (clip to window, contribute `clipped − 50`). Run aborted rather than banked. |
| 3 | full N=20×2 — **still 0 ms on both legs**, while **CLS reproduced the §6 pilot exactly** (0.0193 desktop / 0 mobile) and transfer/resources reproduced within ~5% / 2 rows | Re-derived the windows **offline from the run's own recorded long-task rows** (no new browser run): desktop one boot task `start 16.1 dur 126` → ends 142 against **FCP 324**; mobile `start 54.7 dur 429` → ends 484 against **FCP 620**. `p75 TBT [FCP,end] = 0/0`; `p75 TBT [0,end] = 77/391`. **Cause found: `FCP === LCP` on this product — nothing paints until Vue mounts, so the boot's blocking work has ENDED by first paint.** |
| 4 | the banked baseline, with both windows measured | banked into `BEFORE.json` |

**The window ruling, stated because it is a choice and not a default.** Lighthouse defines TBT over
[FCP, TTI]. On this product that window reads **0 ms on both configs** and is therefore *structurally
blind to exactly the cost this wave exists to cut* — and a gate that cannot see its own defect is not a
gate (**L-19**). So the **GATED** figure is blocking time over **[navigationStart, observationEnd]**, and
the strict-window figure is **reported beside it every run** as `p75TbtLighthouseWindow`. The window was
chosen for **VISIBILITY, not verdict**, and the choice **cost this seat the reproduction it would have
preferred**: it turns the desktop leg **GREEN**, and both legs land **below** the §6 G3 N=5 pilot. That
divergence is **recorded as a finding**, not reconciled by picking a window. `observationEnd` stands in
for TTI (this harness derives no trace-based interactive point) and is written per sample as
`windowEndMs`, so the substitution is auditable rather than implied.

**c.5 · `docs/tranches/X/evidence/W2/BEFORE.json` (created; `docs/tranches/X/evidence/` minted, tracked —
CC-012: untracked evidence is not evidence).** 34,020 B, valid JSON, **composed mechanically** from the
instrument's live stdout plus the spec's own `X_W2_CWV_OUT` record — **no figure in it was transcribed by
hand**; the one prose sentence that names two measured numbers interpolates them from the same objects.
It carries the pin **verbatim**, the origin kind, the route, the cold-cache method, N, the settle window,
all 40 per-load samples with their long-task rows, and the three gate blocks with `bornStatus`,
`asserted`, `measured`, `bar`, `verdict`. **Line 1 reads `{ "SERVED MODEL": "claude-opus-5[1m]",`** — the
seat receipt is the object's first key, sharing line 1 with the opening brace, because a bare receipt line
would make the artifact unparseable and its whole purpose is to be read by machine against AFTER.json.
That is the **`docs/tranches/X/parse-that/evidence/W1/bench-baseline.json` precedent, followed exactly**,
and the file says so in its own `note`.

**c.6 · §7 cadence.**
⟨cmd⟩ `npm run typecheck` (`vue-tsc -p tsconfig.lib.json` **and** `-p tsconfig.demo.json`) → **exit 0, GREEN.**
⟨cmd⟩ `npx eslint scripts/perf/eager-bytes.mjs e2e/smoke/perf/eager-payload.spec.ts --max-warnings=0` →
**exit 0** — **this unit's two created files are clean.**
⟨cmd⟩ `npm run lint` (repo-wide) → **exit 1, 50 problems (18 errors, 32 warnings)** — **PRE-EXISTING and
outside this wave's bounds.** Every one of the **30** offending files lives under
`docs/tranches/V/megatranche/**` or `docs/tranches/V/apotheosis/**`, all **unmodified at HEAD**
(⟨cmd⟩ `git status --porcelain -- docs/tranches/V/megatranche docs/tranches/V/apotheosis` → **empty**), and
they were committed **2026-07-27** (`c0078d96`). **Neither created file appears anywhere in the report**
(⟨cmd⟩ `grep -n "eager-bytes.mjs|eager-payload.spec.ts" lint.log` → no match). `docs/tranches/V/**` is not
in W2.md §4's writable set, so curing it here would be an **ESCALATION-by-write**; it is recorded as a
residual instead.
⟨cmd⟩ `git diff --check` and `git diff --check --cached` → **clean** before the commit.

**c.7 · Commit — one commit, the three files together (§9 row 1; the declared lock).**
`eaa70162` `perf(x-w2/instrument): eager-module-set gzip probe + N≥20 CWV collection; born-RED baseline`,
body = the born-RED table. ⟨cmd⟩ `git show --stat --format="" HEAD` → **exactly 3 files**
(`BEFORE.json` 1,091 + · `eager-payload.spec.ts` 498 + · `eager-bytes.mjs` 296 +), **zero sibling-seat
contamination** — the pathspec was on the commit itself per §0k.1, and at this seat's clock the tree also
held Track B's untracked `docs/tranches/X/keyframes/…` files and an untracked `e2e/visual/`, **none of
which entered**. The message was passed with `-F <file>` rather than repeated `-m` because the body
carries backticks and apostrophes that the shell would otherwise interpret; the pathspec form and the
`Claude-Session` trailer are unchanged.

#### Gate readings, BEFORE → AFTER (this unit's own clock)

| gate | at unit open | at unit close | note |
|---|---|---|---|
| **G2** eager JS gzip ≤ 286,720 B | **RED** 313,601 B (6 modules, raw 979,024) | **RED** 313,601 B — *unchanged, and correctly so* | This unit measures; **X.W2.a** cures. Predicted post-cut ceiling **278,140 B = 271.6 KiB** (313,601 − 35,461). |
| **G3** p75 TBT ≤ 300 ms, N ≥ 20 | **UNRUNNABLE-AT-OPEN** (its command did not exist) | **RUNNABLE, and run**: desktop **58 ms GREEN** · mobile-4× **386 ms RED** | The wave's stated reason for running `c` first is discharged: the gate now has a command. |
| **G4** p75 LCP ≤ 2500 ms, N ≥ 20 | **MEASURE-AT-OPEN** | **MEASURED: desktop 268 ms · mobile-4× 608 ms — GREEN on both** | The carried Q14 figures (5141 CI / ~4919 local) are **not reproduced** and stand **SUPERSEDED, never met**, exactly as §6 G4 predicted. |
| **sub-gate** `BEFORE.json` exists, dated, names its runner class, reproduces §6 within tolerance on a clean `npm run gh-pages` | absent | **MET on three of four columns, RED on one — stated, not smoothed** | dated ✓ · pin ✓ · G2 reproduces the spec's `raw` **exactly** and its `gz` **to 16 B** ✓ · CLS/transfer/resources reproduce the §6 G3 pilot ✓ · **TBT does NOT reproduce the pilot** (58 vs 359; 386 vs 734) ✗ — see finding **c-F2**. |

Full per-config table at the banked pin:

| config | p75 LCP | p75 TBT (gated) | p75 TBT [FCP,end] | p75 FCP | p75 CLS | p75 longest task | median long tasks | transfer (uncompressed, diagnostic) | resources |
|---|---|---|---|---|---|---|---|---|---|
| `desktop-unthrottled` 1440×900 | 268 ms | **58 ms** | 0 ms | 268 ms | 0.0193 | 108 ms | 1 | 2,123,044 B | 21 |
| `mobile-4x-cpu` 390×844 ×4 | 608 ms | **386 ms** | 0 ms | 608 ms | 0.0000 | 414 ms | 2 | 1,802,516 B | 13 |

**R.2 — GREEN-BEFORE-CURE: one, named.** `G3 desktop-unthrottled` reads **58 ms against a 300 ms bar**
before any cure. It is reported as GREEN-BEFORE-CURE rather than quietly counted as a win, and the wave's
byte gate is untouched by it.

#### Findings banked by this unit (no gate moved, no bar touched)

- **c-F1 · The `smoke-perf` project could not launch at all before this unit.** `chromium-1223` was absent
  from the Playwright cache, so **every** e2e gate in this repo — X-W1's and X-W2's alike — was
  unrunnable, not merely this one. Cured by installing the pinned browser. **Any sibling seat that reads a
  "green" e2e result without this install has read a launch failure, not a pass.**
- **c-F2 · MAJOR-for-the-record · the §6 G3 pilot's TBT is NOT reproduced at N=20, on either window.**
  Gated window: **58 ms** desktop (pilot 359) and **386 ms** mobile-4× (pilot 734) — both **below** the
  pilot, by 301 ms and 348 ms. Strict Lighthouse window: **0 / 0**. Meanwhile **CLS reproduces exactly**
  (0.0193 / 0) and transfer/resources reproduce within ~5% and 2 rows, so the harness is measuring the
  same page. **W2.md records no TBT arithmetic for its N=5 pilot**, so this seat cannot say which sum the
  pilot took and **declines to guess**: the divergence is banked for **unit d** and the **L-18 challenge
  passes**. What is *not* in doubt: the mobile leg is **RED at N=20 on the gated window**, so G3 remains a
  live, failing, falsifiable gate.
- **c-F3 · `FCP === LCP` on both configs, at every sample.** Nothing contentful paints until Vue mounts.
  This is the structural fact behind c-F2's strict-window zeros and it is **X-W5's** to act on if anyone
  wishes to (the §ENV block already forwards the mobile-viewport amputation to X-W5); **X-W2 does not
  touch it**.
- **c-F4 · `npm run typecheck` DESTROYS `dist/gh-pages`.** `pretypecheck` → `npm run build` (production,
  `outDir: dist`, Vite's default `emptyOutDir`) empties `dist/`. Measured: `test -f dist/gh-pages/index.html`
  → **NO** immediately after a green typecheck. **Units a, b and d must therefore run `npm run gh-pages`
  AFTER the §7 cadence and before any byte reading**, or measure a stale/absent artifact. `dist/` is
  gitignored, so nothing tracked moves either way. This unit rebuilt (`✓ built in 3.91s`) and took a
  **third** instrument reading on that fresh build: **identical to the byte** — the tree is left with
  `dist/gh-pages` present for unit **a**.
- **c-F5 · repo-wide `npm run lint` is PRE-EXISTING RED** (18 errors / 32 warnings across 30
  `docs/tranches/V/**` files, unmodified, committed 2026-07-27 at `c0078d96`). Out of W2.md §4's bounds;
  recorded, not cured. The §7 cadence is satisfied for this unit by the scoped run (exit 0) plus this
  dated statement of the repo-wide baseline.

#### Residuals

1. **c-F5's pre-existing repo-wide lint red** — a wave-level or X-W11-level row; a write into
   `docs/tranches/V/**` from this wave would be an ESCALATION.
2. **c-F2's pilot divergence** — for unit d's DELTA.md and the L-18 hostiles, who are already told to
   target "whether any number anywhere in the receipts came from a dev-server origin". They may also
   target the window ruling; it is written above in full, with its cost to this seat stated.
3. **`BEFORE.json` is the BEFORE half only.** AFTER.json (unit d) **must** carry the identical
   `runnerClass.pin` string, or §6's delta gate is not comparing like with like. Per the runbook,
   AFTER.json stays **non-terminal until X-W5's A1/A2 land**.

**Escalations: none.** No §3a trigger fired: no write outside §4, no budget re-baseline (the bar is
untouched and the byte gate is still RED at 313,601 B), no third measure→edit→measure diagnostic pass was
started after the window ruling landed, and no `settled` question belongs to this unit.

**Verb stamped: none.** This unit measures and instruments; IMPLEMENTED is the wave's own close and
VERIFIED is X-W11's.

**Post-commit confirmation, 2026-09-17 18:17 EDT — stated because the file changed after its measured
run.** Between run 4 and the commit this seat edited `eager-payload.spec.ts`'s **docstring only**, so that
the file cites the banked verdicts and the window ruling instead of restating run-specific figures that
would rot. **No executable byte changed after the measurement**, and the committed bytes were re-proved,
not assumed: ⟨cmd⟩ `npx playwright test --project=smoke-perf e2e/smoke/perf/eager-payload.spec.ts --list`
→ **`Total: 2 tests in 1 file`** (`:282` G2 · `:338` G3/G4), and ⟨cmd⟩ `… -g "G2"` re-run against the
committed tree → `[X-W2 G2] eager JS modules=6 raw=979024 gz=313601 (306.3 KiB) bar=286720 B → RED`,
**1 failed, for its intended reason and at the same number**. The tree is handed to unit **a** with
`dist/gh-pages` built and present, `e2e/smoke/perf/serve-built.mjs` unmodified, and this unit's four paths
the only ones it ever wrote.
