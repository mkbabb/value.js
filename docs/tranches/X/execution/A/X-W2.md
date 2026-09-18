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

### X.W2.a — the blob-config boot cut

**SERVED MODEL**: `claude-opus-5[1m]`. **Seat clock**: 2026-09-17, **18:20–18:52 EDT**. Branch `tranche-u`,
HEAD at open `14bf76a8`.
**Sections executed exactly**: W2.md §3 scope 1–2 (L25–26) · §5 `### X.W2.a` (L91–96) · §6 **G1** (L118–133) ·
§6 **G2**'s prediction line (L145) · §9 row 2 (L275).
**Rulings consumed**: COHESION §0j (the begin-word) · **§0k.1 pathspec-on-the-commit** · §0j.A **DR-24**
(`scripts/dev/dev.sh` NEVER touched — never read for write, never staged; it is still ` M` in the tree and
appears **0** times in this unit's commit) · §0j.E/§0i.2 (no glass bump is this wave's act — the installed
**7.0.0** is the substrate, untouched) · E-3 throughout (no dated spec, registry or prior-evidence byte
edited; `W2.md` untouched, its §State edit reserved for unit **d**; unit **c**'s receipts above are read,
never revised). COHESION read to the file end (**896 lines**, through §0l); no §0m+ addendum exists.
**Writable set honoured, exactly**: `demo/color-picker/composables/boot/useAtmosphere.ts` ·
`demo/scenes/blob/BlobPane.vue` · this record. **`e2e/smoke/perf/serve-built.mjs` and
`scripts/perf/eager-bytes.mjs` were EXECUTED and never opened for write**
(⟨cmd⟩ `git status --porcelain -- e2e/smoke/perf/serve-built.mjs scripts/perf/eager-bytes.mjs` → **empty**).

#### Acts, in order

**a.0 · MEASURE BEFORE EDITING — every anchor verified at true bytes.** The spec's three line anchors were
read before a byte moved, and **all three hold exactly** (no drift, so no INTENT-at-true-bytes was needed):

```
⟨cmd⟩ sed -n '36p' demo/color-picker/composables/boot/useAtmosphere.ts
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
⟨cmd⟩ sed -n '12,13p' demo/scenes/blob/BlobPane.vue
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
import type { BlobConfig } from "@mkbabb/glass-ui/blob";
```

**All four symbols verified present on the 245 B `./blob-config` subpath at the installed 7.0.0**, by
command rather than by the brief's say-so:
⟨cmd⟩ `cat node_modules/@mkbabb/glass-ui/dist/blob-config.js` → `export { … BLOB_CONFIG_DEFAULTS,
BLOB_CONFIG_KEY, BLOB_HERO, … }` over `./presets-5myqNv59.js`;
⟨cmd⟩ `cat …/dist/blob-config.d.ts` → `export * from "./components/blob/config"`, whose **`:1`** reads
`export type { … BlobConfig, … } from "./types"`. So `BLOB_CONFIG_KEY` · `BLOB_CONFIG_DEFAULTS` (values) and
`BlobConfig` (type) are all reachable. ⟨cmd⟩ `node -e "…package.json exports"` → `"./blob-config"` →
`{types: ./dist/blob-config.d.ts, import: ./dist/blob-config.js}`, version **7.0.0**.

**G1 and G2 baselines re-measured at THIS seat's clock, on the pre-cure `dist/gh-pages` unit c handed over**
— seat 0's and unit c's readings **reproduce to the byte**: `eager JS modules 6 · raw 979,024 · gz 313,601`,
and across **every one of the six eager chunks** (enumerated from the instrument's own module list, never
from a typed list): `index-DC7wNDmX.js` **smin 42 · metaball 17 · satellite 50**, the other five **0 · 0 · 0**.
⟨cmd⟩ `grep -rn 'glass-ui/blob"' demo/ | wc -l` → **5** (seat-0's F-1 spelling defect reproduced: the spec's
§6 block writes 3, its own parenthetical enumerates 5); ⟨cmd⟩ `grep -rn blob-config demo/ src/ | wc -l` → **0**.

**a.1 · The cure, exactly as specified — two repoints, three lines, nothing else.** modify-carve honoured to
the line:

| file | line | before → after |
|---|---|---|
| `useAtmosphere.ts` | **36 only** | `@mkbabb/glass-ui/blob` → `@mkbabb/glass-ui/blob-config` (`BLOB_CONFIG_KEY`, `BLOB_CONFIG_DEFAULTS`) |
| `BlobPane.vue` | **12 only** | same specifier change, same two symbols |
| `BlobPane.vue` | **13 only** | same specifier change, `type BlobConfig` |

⟨cmd⟩ `git diff --stat` → `useAtmosphere.ts | 2 +-` · `BlobPane.vue | 4 ++--` = **3 insertions, 3 deletions,
2 files**. **`HeroBlob.vue:34-35` is unit b's file and STAYS on `./blob`** — it appears in no diff, no stage
and no commit of this unit. ⟨cmd⟩ `git diff --check` → clean.

**a.2 · §7 cadence, run BEFORE the byte reading because of unit c's c-F4.**
⟨cmd⟩ `npm run typecheck` (`vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json --noEmit`)
→ **exit 0, GREEN** — the repointed specifier type-resolves on both projects, which is the first proof that
`BlobConfig` survives the move.
⟨cmd⟩ `npx eslint demo/color-picker/composables/boot/useAtmosphere.ts demo/scenes/blob/BlobPane.vue --max-warnings=0`
→ **exit 0** — this unit's two modified files are clean.
⟨cmd⟩ `npm run lint` (repo-wide) → **exit 1, 50 problems (18 errors, 32 warnings)** — **unit c's c-F5
PRE-EXISTING baseline, reproduced to the number**. Measured, not assumed: the **30** offending files were
extracted from the report and **100% of them** live under `docs/tranches/V/`
(⟨cmd⟩ `grep -vc '^docs/tranches/V/' <file list>` → **0**), all unmodified at HEAD
(⟨cmd⟩ `git status --porcelain -- docs/tranches/V/megatranche docs/tranches/V/apotheosis` → **empty**), and
**neither file this unit touched appears anywhere in the report** (⟨cmd⟩ `grep -c "useAtmosphere.ts\|BlobPane.vue"`
→ **0**). `docs/tranches/V/**` is outside W2.md §4, so curing it here would be an **ESCALATION-by-write**;
carried as unit c's residual 1, not re-opened.

**a.3 · Rebuild, then measure — WRITE-THEN-MEASURE, double-run across TWO independent clean builds.**
c-F4 is real and was obeyed: `npm run typecheck` runs `pretypecheck` → `npm run build`, which empties `dist/`,
so the artifact was rebuilt **after** the cadence and before any figure was read.
⟨cmd⟩ `npm run gh-pages` → exit 0, **"✓ built in 5.09s"** (build 1) and exit 0, **"✓ built in 4.92s"** (build 2,
an independent clean build). `dist/` is `.gitignore`d; **zero tracked bytes moved by either build**.

```
⟨cmd⟩ node scripts/perf/eager-bytes.mjs        (×3: build 1 twice, build 2 once)
eager JS modules: 6
    ./assets/index-DOE-kt2B.js                            raw=446664  gz=147313  (entry-module)
    ./assets/rolldown-runtime-QTnfLwEv.js                 raw=694     gz=423     (modulepreload)
    ./assets/vue.runtime.esm-bundler-DVtiiGpU.js          raw=109837  gz=41722   (modulepreload)
    ./assets/usePointerVelocityField-DsIf7yyq-DJWUkmi3.js raw=41005   gz=15199   (modulepreload)
    ./assets/_plugin-vue_export-helper-xmicxnVE.js        raw=262271  gz=65969   (modulepreload)
    ./assets/css-h0A6KHoK.js                              raw=26139   gz=10187   (modulepreload)
eager JS   raw= 886610  gz= 280813 = 274.2 KiB   (bar 286720 B) -> GREEN
render-block CSS raw= 518949  gz= 88177 = 86.1 KiB   (measured, NOT gated — unchanged by this cut)
TOTAL eager gz= 368990 = 360.3 KiB
```

⟨cmd⟩ `diff run1 run2` (with `generatedAt` excluded) → **IDENTICAL**; build 2's independent run →
**`eagerJsGz=280813 raw=886610 verdict=GREEN margin=5907`**, identical again. **Three readings, two builds,
one number.**

**a.4 · The enforcing gate re-run from the spec file, not from prose.**
⟨cmd⟩ `npx playwright test --project=smoke-perf e2e/smoke/perf/eager-payload.spec.ts -g "G2"` → **exit 0,
1 passed**:
`[X-W2 G2] eager JS modules=6 raw=886610 gz=280813 (274.2 KiB) bar=286720 B → GREEN`.
The same command unit c recorded as **1 failed at 313,601 B** now passes at 280,813 B, through an
**unmodified** instrument and an **unmodified** bar. That is the gate failing and passing for its intended
reason (**L-19**), on the same bytes, two hours apart.

**a.5 · G1 satisfied BY THE IMPORT GRAPH — and the grep was WIDENED, never narrowed.**
The L-18 rider names this seat's exact temptation (*"whether the eager-graph assertion in G1 was satisfied by
an import change or by a narrowed grep"*). So: the eager set was enumerated **from the instrument's own module
list**, and `rg` was run for **all three** tokens over **every one of the six chunks**, on both builds.

| token | eager set BEFORE | eager set AFTER | what the residual IS, traced by command |
|---|---|---|---|
| `smin` | **42** | **0** | the SDF smooth-union — the engine's signature. ⟨cmd⟩ `rg -o smin node_modules/@mkbabb/glass-ui/dist/blob.js \| wc -l` → **42**; `…/presets-5myqNv59.js` → **0**. It occurs in the barrel and nowhere else, and it is **gone**. |
| `metaball` | **17** | **3** | **not the engine**: all three are GLSL source **comments** — ⟨cmd⟩ `rg -o '.{0,60}metaball.{0,60}'` → `// … (mirrors metaball.frag.ts:252-255)` ×2 and `// MANDATORY OETF … (mirrors metaball.frag.ts:278)`. ⟨cmd⟩ `rg -ln "mirrors metaball.frag.ts" node_modules/@mkbabb/glass-ui/dist/` → **`aurora.js`** + `components/aurora/constants/shaders/brush.glsl.d.ts`. They belong to **`@mkbabb/glass-ui/aurora`**, a different barrel on a different boot-path import (`useAtmosphere.ts:30-31`) that **W2.md §3 does not scope**. |
| `satellite` | **50** | **3** | **not the engine**: `satelliteCount` · `satelliteRadius` · `satellites` — the **field names of `BLOB_CONFIG_DEFAULTS`** in ⟨cmd⟩ `rg -c "satelliteCount\|satelliteRadius" …/presets-5myqNv59.js` → **4**. `presets-5myqNv59.js` is **`./blob-config`'s own dependency**, and §6 G2's prediction line budgets it eager in so many words (*"a 1,581 B / 782 B gz `presets` module"*). Keeping it is the cure working, not the cure leaking. |

**Every residual occurrence is accounted for to its producing module; none is the WebGL2 metaball engine.**
Stated plainly for the hostiles: unit **a**'s §5 sub-gate is spelled `rg -c "smin|metaball" <eager chunks> → 0`,
and its literal reading is **0 · 3**, not **0 · 0** — because the spec's token list cannot distinguish the blob
barrel's shader from an **aurora** comment that cites the blob shader's filename. **The asserted property is
what G1 actually states — *"no module reachable from the eager entry graph imports `@mkbabb/glass-ui/blob`"* —
and that is GREEN by the import graph.** The divergence is recorded here rather than cured by editing the
token list, which would be the narrowed grep the rider forbids.

Import-graph truth, at the source and at the artifact:

```
⟨cmd⟩ grep -rn 'glass-ui/blob"' demo/           5 lines -> 2 lines, BOTH HeroBlob.vue (:34, :35) — unit b's
⟨cmd⟩ grep -rn blob-config demo/ src/           0 lines -> 3 lines (the three repointed sites)
⟨cmd⟩ rg -c smin dist/gh-pages/assets/*.js      -> HeroBlob-D8K-tUyl.js:41   (and NOTHING else)
⟨cmd⟩ grep -c 'HeroBlob-D8K-tUyl' dist/gh-pages/index.html   -> 0
```

**The barrel landed exactly where §5 predicted it would.** HeroBlob's lazy chunk went **2,026 B →
94,593 B** (gz 34,292), now carries `smin` ×41, and is referenced **zero** times by `index.html` — it is
neither the entry nor any `modulepreload`. ⟨cmd⟩ the index's eager JS refs enumerate exactly the six measured
chunks and no seventh. **Falsifier intact**: restore a static `from "@mkbabb/glass-ui/blob"` edge in any
boot-path module and `smin` returns to the eager set — the property is a graph fact, re-testable by anyone.

**a.6 · The correctness question the byte gates are structurally blind to, asked and answered.**
An import repoint can green every byte gate and silently kill a provide/inject seam. `useAtmosphere`
**provides** `BLOB_CONFIG_KEY` (now **eager**, from `./blob-config`) and `HeroBlob` **injects** it (now
**lazy**, still from `./blob`). The key is ⟨cmd⟩ `rg -o 'Symbol\([^)]*\)' …/presets-5myqNv59.js` →
**`Symbol("blobConfig")`** — so two module instances would mean two Symbols and a dead `inject`.

Both producer subpaths import the **same specifier**: ⟨cmd⟩ `head -c 600 …/dist/blob.js` →
`import { a as r, i, n as a, o, r as s, t as c } from "./presets-5myqNv59.js";` — byte-identical to
`blob-config.js`'s own presets import. At the artifact: ⟨cmd⟩ `rg -o 'Symbol\([^)]{0,20}blobConfig[^)]{0,20}\)'
dist/gh-pages/assets/*.js` → **exactly ONE match, in `index-DOE-kt2B.js`**, and ⟨cmd⟩
`rg -o 'from"\./[^"]*"' …/HeroBlob-D8K-tUyl.js` → **`from"./index-DOE-kt2B.js"`**. **One Symbol, one
instance, imported by the lazy chunk from the eager entry: identity preserved.**

Confirmed at **runtime**, not only at the bytes — **ONE** bounded cold load of the BUILT bundle on
`serve-built.mjs :8091` (§5.2 probe parsimony; the scratchpad probe is outside the repo and wrote no tracked
byte; **no figure from it enters any gate**):

```
{ "probe": { "appText": 4872, "canvases": 2, "heroBlobCanvas": true },
  "consoleErrors": [ "[value.js] value.js dev is MISCONFIGURED: http://localhost:8091 has no VITE_API_URL …" ],
  "pageErrors": [] }
```

**Zero page errors; `#app` rendered 4,872 characters; the hero blob's canvas is present** — so the lazy chunk
loaded, its `inject(BLOB_CONFIG_KEY)` resolved against the eager provide, and the engine rendered. The single
console error is the app's own pre-existing `VITE_API_URL`/CORS dev-config warning against a `localhost`
origin, structurally unrelated to this cut.

**a.7 · Commit — one commit, two files (§9 row 2; the declared lock).**
`13f4ddc2` `perf(x-w2/boot): drop the glass blob barrel from the eager graph via ./blob-config`, body = **the
byte delta** as §9 requires. ⟨cmd⟩ `git show --stat --format="" HEAD` → **exactly 2 files**
(`useAtmosphere.ts` 2 +-, `BlobPane.vue` 4 ++--), **zero sibling-seat contamination** — the pathspec was on
the commit itself (§0k.1), and at this seat's clock the shared index also held Track D's untracked
`docs/tranches/X/parse-that/algebra/`, an untracked `e2e/visual/`, and the standing ` M` rows on
`docs/tranches/V/reformation/CARRY-LEDGER.md` and **`scripts/dev/dev.sh`** — **none of which entered**
(⟨cmd⟩ `git log -1 --name-only | grep -c dev.sh` → **0**). The message was passed with `-F <file>` for the
same reason unit c recorded (backticks and apostrophes in the body); the pathspec form and the
`Claude-Session` trailer are unchanged, and ⟨cmd⟩ `git log -1 --format=%b | tail -1` confirms the trailer landed.

#### Gate readings, BEFORE → AFTER (this unit's own clock)

| gate | at unit open | at unit close | note |
|---|---|---|---|
| **G1** the glass blob barrel is absent from the eager module set | **RED** — `smin` **42** · `metaball` **17** · `satellite` **50** in the entry chunk; 5 `glass-ui/blob` import sites, 3 on the boot path; 0 `blob-config` sites | **GREEN by the asserted property** — `smin` **0** across all six eager chunks; the barrel now lives ONLY in the unpreloaded lazy chunk `HeroBlob-D8K-tUyl.js` (2,026 B → **94,593 B** measured here; the 2,026 B is the baseline's own figure for `HeroBlob-DKx66VkD.js`, cited from §6 G1 and this record's Baseline, not re-measured after the rebuild overwrote it — `smin` ×41, gz 34,292); boot-path `glass-ui/blob` import sites **3 → 0** (the 2 survivors are HeroBlob's, unit b's file, already lazy) | Satisfied by the **import graph**, with the grep **widened** to all three tokens over all six chunks. Literal sub-gate tally `smin\|metaball` = **0 · 3**, the 3 traced to `@mkbabb/glass-ui/aurora`'s GLSL comments — recorded, not grep-narrowed. |
| **G2** eager JS gzip ≤ 286,720 B (the realized delta) | **RED** 313,601 B (−26,881 B over the bar) | **GREEN** 280,813 B = **274.2 KiB** (+5,907 B under the bar) | **Realized delta −32,788 B gz** (raw −92,414 B). Bar **untouched**; instrument **unmodified**; three readings across two independent clean builds, byte-identical. |

**The realized-vs-predicted line (§6 G2 L145), which the L-18 rider names as a first hostile target.**
Predicted: the whole `./blob` subpath at **35,461 B gz**, giving an upper-bound post-cut eager total of
**278,140 B** (this record's F-2 arithmetic; the spec's own 278,124 B differs only by F-2's 16 B gzip delta).
**Realized: −32,788 B gz → 280,813 B**, i.e. **92.5%** of the predicted saving, landing **2,673 B ABOVE the
predicted ceiling** and **5,907 B BELOW the bar**. The shared-subchunk assumption was therefore mildly
optimistic, and the honest reading is that **not every byte of `./blob` was exclusive to the eager set**:
`./blob-config`'s own `presets-5myqNv59.js` (1,581 B raw / 782 B gz) stays eager **by the prediction line's
own budget**, and the remainder was already shared with modules that remain eager. Recorded as a measurement,
**not** reconciled by moving anything: **the bar is byte-identical to its wave-open value and no seat edited it.**

**§3a triumvirate: NOT triggered, and the trigger's own words are why.** *"If eager JS gzip remains > 280 KiB
once the barrel leaves the eager set, the barrel was not the dominant term."* It does not remain above:
280,813 B = **274.2 KiB** against the 280 KiB / 286,720 B bar. **The barrel WAS the dominant term** — the
budget was over by **26,881 B** (313,601 − 286,720) and this one cut removed **32,788 B**, i.e. **122%** of
what was needed, the 5,907 B excess being precisely today's margin. No triumvirate, and (§11 guardrail 1) no
re-baseline: **S.W3's failure mode was not repeated, because the number moved to the bar instead.**

*(Self-count correction, caught by this seat's own write-then-measure pass before the record was committed:
the sentence above first read "89.6% of the 36,881 B the budget was over by". **Both figures were wrong** —
the overage is **26,881 B**, not 36,881 B, and a saving of 32,788 B against it is **122%**, not 89.6%. The
corrected arithmetic is above and every gate figure it rests on — 313,601 · 280,813 · 286,720 — is unchanged
and twice-measured. Recorded rather than silently fixed, per the SELF-COUNT law.)*

#### Findings banked by this unit (no gate moved, no bar touched)

- **a-F1 · G1's token list cannot distinguish the blob barrel from the AURORA barrel.** Three of the six
  residual eager-set matches are `@mkbabb/glass-ui/aurora`'s GLSL **comments** citing `metaball.frag.ts` by
  filename. A future seat reading `rg -c "smin|metaball" → 0` as G1's definition would be forced either to a
  false RED or to a narrowed grep. **The discriminating token is `smin`**, and its exclusivity was measured
  rather than assumed: ⟨cmd⟩ a loop of `rg -o smin` over **every** top-level module of the installed
  `@mkbabb/glass-ui/dist/*.js` reports exactly **one** non-zero file — **`blob.js: 42`** — and nothing else,
  `presets-5myqNv59.js` included (**0**). Offered to unit **d**'s `AFTER.json` and
  to the L-18 passes as the durable spelling of G1's property. **No spec byte was edited** (E-3).
- **a-F2 · The `satellite` residual is `BLOB_CONFIG_DEFAULTS`' own field names and must NOT be cured.** The
  config object legitimately describes satellites; the cure imports it **on purpose**. A seat chasing
  `satellite → 0` would be chasing the wave's intended eager payload.
- **a-F3 · The cut is worth ~1.4× more raw than gz** (−92,414 B raw vs −32,788 B gz): the shader/engine text
  compresses well. Any future budget stated in **raw** bytes would read a much larger win than the gated gz
  figure. Recorded so no later document quotes the raw delta as the gate's.
- **a-F4 · The provide/inject seam is a single shared `Symbol`, and this is load-bearing.** If a future
  bundler-config change (e.g. manual chunking — explicitly outside §4) ever duplicated `presets-5myqNv59.js`
  into both the eager entry and the lazy blob chunk, `BLOB_CONFIG_KEY` would become **two** Symbols and the
  hero's `inject` would silently return `undefined` while **every byte gate stayed green**. The invariant to
  assert if anyone ever wants one: **exactly one `Symbol(\`blobConfig\`)` in the whole output.** Today: one.
- **a-F5 · c-F4 confirmed independently** — `npm run typecheck` destroyed `dist/gh-pages` at this seat too,
  exactly as unit c warned. The order used here (cadence → rebuild → measure) is the one units **b** and **d**
  should keep. The tree is handed on with `dist/gh-pages` **built and present** (build 2).

#### Residuals

1. **a-F1's token-list imprecision** — for unit **d**'s `AFTER.json`/`DELTA.md` wording and the L-18 passes.
   It is a **spelling** matter in the gate's evidence block, never a change of the asserted property, and E-3
   forbids editing §6's bytes; a dated addendum-beside is the only lawful cure if one is wanted.
2. **The 2,673 B gap between the predicted ceiling (278,140 B) and the realized figure (280,813 B)** — banked
   for the hostiles with its arithmetic above. The margin to the bar is **5,907 B**, so the cut is green but
   **not** by a wide margin: any future boot-path import of a heavy subpath reds G2 again, which is exactly
   G2's stated falsifier working.
3. **c-F5's pre-existing repo-wide lint red**, reproduced unchanged (50 problems / 30 files, all
   `docs/tranches/V/**`, all unmodified). Out of bounds here; carried.

**Escalations: none.** No §3a trigger fired: **no write outside §4** (three paths, all in this unit's writable
set; `HeroBlob.vue` untouched; `vite.config.ts`, `src/**`, `demo/shell/usePaneRouter.ts` and
`node_modules/@mkbabb/glass-ui/**` never opened); **no budget re-baseline** (the bar is byte-identical to
wave-open and the number moved to meet it); **no TBT question** (unit d's); **no `settled` question** (unit
b's); and **no third measure→edit→measure pass** — this unit performed **one** edit, then measured.
**No workaround, no masking fallback**: no `try`/`catch`, no `test.skip`, no allowlist, no producer-selector
copy, and **no local patch of `node_modules`** — the cure is the spec's own two import repoints and nothing else.

**Verb stamped: none.** This unit cuts and measures; IMPLEMENTED is the wave's own close and VERIFIED is
X-W11's. The tree is handed to unit **b** with `dist/gh-pages` built and present, `HeroBlob.vue` untouched and
still on `./blob` as §5 requires, and this unit's three paths the only ones it ever wrote.

### X.W2.b — the quiescence park · **ESCALATED (§3a "Quiescence does not park")**

**SERVED MODEL**: `claude-opus-5[1m]`. **Seat clock**: 2026-09-17, **18:55–20:05 EDT**. Branch `tranche-u`,
HEAD at open `48d921e4`, HEAD at close `67064eed` (sibling tracks committed alongside; nothing of theirs
entered this unit's commit).
**Sections executed exactly**: W2.md §3 scope 3–4 (L27–28) · §3 scope 8 (L32) · §5 `### X.W2.b` (L98–103) ·
§6 **G5** (L169–185) · §6 **G8** (L208–217) · §7 (L258) · §9 row 3 (L276).
**Rulings consumed**: COHESION §0j (the begin-word) · **§0k.1 pathspec-on-the-commit** · §0j.A **DR-24**
(`scripts/dev/dev.sh` never read for write, never staged; it is still ` M` in the tree and appears **0**
times in this unit's commit) · §0j.E/§0i.2 (no glass bump is this wave's act; the installed **7.0.0** is the
substrate and `node_modules/@mkbabb/glass-ui/**` was opened **read-only**, never patched) · E-3 throughout
(no dated spec, registry or prior-evidence byte edited; `W2.md` untouched — its §State edit is unit **d**'s;
units **c** and **a**'s receipts above are read, never revised). COHESION read to the file end (**896 lines**,
through §0l); no §0m+ addendum exists.
**Writable set honoured**: of the seven paths granted, **exactly one was written** —
`docs/tranches/X/execution/A/X-W2.md` (this record). `demo/picker/visual/HeroBlob.vue` was written, measured,
and **reverted to HEAD** (below); `e2e/smoke/fixtures/blob-timing.ts` and the four consumer specs were
**never opened for write** (⟨cmd⟩ `git status --porcelain -- e2e/` → only the pre-existing untracked
`e2e/visual/`, a sibling seat's, untouched).

#### Acts, in order

**b.0 · MEASURE BEFORE EDITING — every anchor verified at true bytes.** Three of the four hold; one drifted
and is recorded rather than presumed:

```
⟨cmd⟩ grep -n "BLOB_IDLE_MS = |SLEEPY_POSE_MS = |5.0.0 adopt" demo/picker/visual/HeroBlob.vue
209:// the 5.0.0 adopt) restores the tight park by consulting the engine's     ← the dead book, as spec'd
211:const BLOB_IDLE_MS = 2000;
212:const SLEEPY_POSE_MS = 3300;
⟨cmd⟩ grep -n "settled" node_modules/@mkbabb/glass-ui/dist/components/blob/Blob.vue.d.ts
63:    settled: Readonly<import("vue").Ref<boolean, boolean>>;                 ← EXACT, as spec'd
64:    settledFrame: Readonly<...BlobSettledFrame | null...>;
⟨cmd⟩ rg -n "BLOB_IDLE_MS|SLEEPY_POSE_MS" demo/ e2e/ | wc -l   → 26      (×2, settled bytes)
⟨cmd⟩ rg -ln … | wc -l                                          → 5       (×2)
⟨cmd⟩ rg -ln "blob-timing" e2e/                                 → the four consumer specs, exactly
```

- **ANCHOR DRIFT, recorded (E-3 — no spec byte edited).** §6 G5's evidence block quotes
  `sed -n '213,214p'` for the two constants; at true bytes they are **`:211-212`**. Two lines, no change of
  substance; this seat worked the **true** bytes. Seat 0's Baseline row already reads `:211-212`, so the
  record is self-consistent and only §6's quoted `sed` range drifts.
- **The erratum's 26/5 is reproduced exactly**, not the superseded 20/6. `o12-blob-seat.spec.ts` names
  neither constant and is a consumer **through the fixture's exports** — which is precisely why the §5 lock
  ("commit 3 must not split") exists.

**b.1 · The cure, implemented EXACTLY as §5 `### X.W2.b` specifies.** Not a variant, not a superset:

| §5 clause | what landed in the working tree |
|---|---|
| *"bind `HeroBlob.vue`'s template ref to the Blob instance's `settled`"* | `const engineSettled = computed(() => blobRef.value?.settled === true)` |
| *"watch it to drive `blobPaused` / `:paused`"* | `watch(engineSettled, (settled) => { if (settled) blobPaused.value = true; })`; `:paused="blobPaused"` unchanged |
| *"delete `BLOB_IDLE_MS`, `SLEEPY_POSE_MS`, `idleTimer`, `poseTimer`"* | all four deleted, with the `onScopeDispose` timer-clearing block and its now-unused import |
| *"and the 'booked at the 5.0.0 adopt' comment"* | deleted with the wall-clock rationale block it sat in |

**One typed fact worth the record**: `Blob.vue.d.ts:63` declares `settled: Readonly<Ref<boolean>>`, but the
**consumer-side** read is a plain `boolean` — Vue's expose proxy (`proxyRefs`) unwraps exposed refs, so
`blobRef.value?.settled.value` is a type error and `blobRef.value?.settled` is the binding. Measured, not
guessed: ⟨cmd⟩ `npm run typecheck` → `HeroBlob.vue(212,61): error TS2551: Property 'value' does not exist on
type 'boolean'` on the first form, **exit 0 GREEN** on the second. Reactivity is preserved (the proxy reads
the ref underneath), and the built bundle proves the wiring survived minification: ⟨cmd⟩
`rg -o '.{0,80}settled.{0,40}' dist/gh-pages/assets/HeroBlob-XNw6eD7v.js` →
`A=u(!1);e(f(()=>d.value?.settled===!0),e=>{e&&(A.value=!0)})` — the ref, the computed, the watcher.

**b.2 · WRITE-THEN-MEASURE — and the park DOES NOT ENGAGE.** Five independent observations, two instruments,
on the **BUILT** bundle over `serve-built.mjs :8091` (§ENV: no dev-server number appears in this block):

| instrument | runs | window | result |
|---|---|---|---|
| draw-plateau probe (`instrumentWebglDraws` idiom, per-canvas WebGL2 draw counting) | **3** | 45 s each, after one spectrum click | draws never plateau: **769 / 618 / 618** draws accrued, last increment at **45,068 / 45,053 / 45,018 ms** — i.e. at the end of the budget, every run |
| state probe (the same counter + a temporary `data-x-settled` / `data-x-paused` / `data-x-mood` reflection of the component's own state) | **2** | 60 s + 75 s | `settled` reads **`false` at every sample**; `paused` reads **`false` at every sample**; draws climb monotonically to **1,019** and **1,671** |

⟨cmd⟩ (75 s state probe, transitions only)
```
 7s draws=0    settled=false paused=false mood=idle
20s draws=148  settled=false paused=false mood=sleepy
37s draws=565  settled=false paused=false mood=excited     ← no user input has occurred
38s draws=595  settled=false paused=false mood=sleepy
49s/50s · 58s/59s · 71s/72s   → the same one-second `excited` flip, ~every 9–12 s
LAST {"t":75203,"draws":1671,"settled":"false","paused":"false","mood":"sleepy"}
settled EVER true: false
```

`prefers-reduced-motion` is **excluded as a cause by measurement**, not by assumption: ⟨cmd⟩
`page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)` → **`false`** under both the
explicit `reducedMotion: "no-preference"` context and the harness default, and `settled` is false in both.
One canvas, one host: ⟨cmd⟩ `document.querySelectorAll('[data-testid="goo-blob-canvas"]').length` → **1**, so
the hero is the measured canvas and no second Blob is being read by mistake.

**b.3 · THE ROOT CAUSE, isolated by a controlled counterfactual (the §3a-mandated "measured reason").**
The diagnostic loop was **HALTED AT ITS THIRD PASS** per §3a; what follows is the halting pass's own finding
plus one counterfactual, and **no fourth attempt at a cure was made**.

The producer's predicate is ⟨cmd⟩ `sed -n '1399p' node_modules/@mkbabb/glass-ui/dist/blob.js` →
`h = () => e.mood.isSettled() && e.pointer.isAtRest() && e.satellites.isQuiescent()`. Its three conjuncts,
read at the installed 7.0.0's bytes and against the measurements above:

1. **`pointer.isAtRest()` — TRUE, structurally.** The hero is decorative (no `pressLabel`), so the producer
   computes its hit element as `null` (`p = pressLabel && !disabled && !paused` → `false`) and
   `useBlobPointer` attaches **no** listeners. Nothing can make the pointer active.
2. **`mood.isSettled()` — TRUE only between the fission kicks.** Measured: the mood reaches `sleepy` at ~20 s
   and holds — **except** for a one-second `excited` flip every 9–12 s with **zero user input**. Traced to
   its only possible source: `⟨cmd⟩ rg -n "onPinch" …/blob.js` → `e.satellites.onPinch((t) => e.pointer.click(t))`,
   and in the satellite tick `!d.snapFired && e >= .42 && (d.snapFired = !0, l?.(…))` — **the fission snap
   enters the mood FSM through the `clicked` channel**, where `d("excited", {source:"auto"})` answers it with
   `s = 900` (the excited hold) and arousal 1. Arousal 1 drops `mergeRate` to 0.3
   (`mergeRate = lerp(2, 0.3, arousal)`), which shortens the colony's global event cooldown from
   `3000 × 1.83 = 5,490 ms` to `900 ms` — so the kick makes the colony busier, which makes more fissions,
   which kick again. **A self-sustaining excitation loop, driven by the hero's own armed `fissionAmp = 0.6`
   (WR-2 / T-49c).**
3. **`satellites.isQuiescent()` — the STRUCTURAL blocker, and it survives the counterfactual.** With
   `HERO_FISSION_AMP` temporarily set to **0** (a diagnostic edit, rebuilt, measured, **reverted**), the
   mood flips **vanish** — ⟨cmd⟩ the 75 s probe reports `mood=idle → sleepy` at ~40 s and **no `excited`
   sample at all**, confirming conjunct 2's diagnosis exactly — and yet **`settled EVER true: false`**,
   `paused EVER true: false`, 538 draws over 75 s. So the remaining blocker is conjunct 3:
   `isQuiescent()` requires **every** satellite in the `orbiting` phase simultaneously, while the colony's
   own arithmetic forbids it in the resting state: the merge chain is
   `mergeDuration 1800 + absorbedDuration ≤ 4000 + emergeDuration 2200` = **6,000–8,000 ms**, and the global
   inter-event cooldown at sleepy's `mergeRate 1.83` is `3000 × 1.83` = **5,490 ms**. **The cooldown is
   SHORTER than the chain it gates**, so a fresh satellite event can always begin before the previous one
   ends, and the 3-satellite colony is never wholly orbiting. `settled` is therefore not merely slow — on
   this configuration it is **unreachable**.

**b.4 · The gate-reading pair, run from the gate's own command (L-19: it must fail for its intended reason).**
`webgl-blob-idle.spec.ts` is the park's draw-plateau oracle; it runs in the `smoke` project.

```
⟨cmd⟩ npx playwright test --project=smoke e2e/smoke/webgl-blob-idle.spec.ts    # WITH the §5 cure in tree
1 failed — "blob drew 56 frames over 2500ms of true idle — the render loop is NOT parked"
           Expected: <= 5   Received: 56
⟨cmd⟩ (same command, after `git checkout -- demo/picker/visual/HeroBlob.vue`)  # at HEAD, wall clock intact
1 passed (30.2s)
```

**That pair is the whole escalation in two lines**: today's green rests on the 5.3 s stopwatch, and the
shipped quiescence seam does not replace it on this configuration. The specs are **not** vacuous — they are
sensitive to the park, which is the very property G5's falsifier asks for (*"stub `settled` to never settle
and the four park specs must red"*). Here `settled` is **held false by the engine itself**, and the spec
**reds** — the falsifier's asserted property is therefore **satisfied by measurement**, from the wrong side
of the gate.

**b.5 · The tree, handed back CLEAN.** The cure was reverted with a pathspec checkout of **this unit's own
uncommitted file** (`git checkout -- demo/picker/visual/HeroBlob.vue`) — **no stash, no `reset --hard`, no
force-push**, and no sibling seat's path touched. ⟨cmd⟩ `git status --porcelain -- demo/ e2e/` → the single
pre-existing untracked `e2e/visual/` (a sibling's), nothing else. **The fixture and the four consumer specs
were never edited**, because a quiescence-derived `PARK_SETTLE_MS` over a trigger that is still the wall
clock would be an incoherent artefact — the §5 lock ("commit 3 is ONE commit and MUST NOT SPLIT") is
honoured by landing **none** of it rather than half of it. `scripts/dev/dev.sh` untouched (DR-24);
`node_modules/@mkbabb/glass-ui/**` read-only throughout — **no local patch of the producer was made or
contemplated**; the scratchpad probes live outside the repo and wrote **zero** tracked bytes.

**b.6 · G8 — `BLOB_HERO` RULED: TOMBSTONE, with the measured rationale (the gate's second arm).**
Born-RED reproduced: ⟨cmd⟩ `grep -rn "BLOB_HERO" demo/ src/ | wc -l` → **0**; the symbol does ship
(⟨cmd⟩ `grep -c BLOB_HERO node_modules/@mkbabb/glass-ui/dist/blob-config.js` → **1**). The consumption arm
was evaluated at the bytes before it was declined — `BLOB_HERO` is `BLOB_CONFIG_DEFAULTS` overlaid with
`geometry{satelliteCount 4, orbitRadius .3, satelliteRadius .1, eccentricity .04}` ·
`membrane{smoothK .06}` · `color{lightnessFloor .15}`, against the hero's live register
`geometry{bodyRadius .325, orbitRadius .4, satelliteRadius .09, eccentricity .03}` over the **injected app
config**. Two independent disqualifiers, each measured:

1. **It would sever a live seam.** `heroConfig` spreads `appBlobConfig` — the `reactive` object
   `useAtmosphere.ts:381` provides and **`BlobPane` live-tunes**. Taking `BLOB_HERO` as the base replaces
   that object with a frozen module constant, and BlobPane's tuning stops reaching the hero. That is a
   functional regression, not an adoption.
2. **The residual delta is DESIGN CONTENT, which this wave may not carry.** Netting out the four geometry
   atoms the hero already overrides, adopting `BLOB_HERO` changes `satelliteCount` **3 → 4** and
   `membrane.smoothK` **.05 → .06** — a fourth satellite in the hero colony and a softer union. W2.md
   §State's **Model law M-23** is explicit: *"This wave carries no design content; the design canon is
   X-W10."*

**The one-line tombstone, for unit d to carry into the wave close (G8's asserted property):**

> **`BLOB_HERO` — TOMBSTONED at X-W2.** The hero's register is an overlay on the app-wide `BLOB_CONFIG_KEY`
> object that `BlobPane` live-tunes, so adopting the frozen preset as its base would sever that seam; the
> residual delta (`satelliteCount` 3→4, `membrane.smoothK` .05→.06) is design content, and design content
> is X-W10's by M-23. Re-trigger: X-W10's design canon may adopt it as the hero's base **in the same ruling
> that re-homes the live-tuning seam**.

G8's falsifier — *"a third close that neither consumes nor tombstones. Silence fails."* — is answered: this
is the word, with its measurements, and it is not silence.

**b.7 · §7 cadence.** Each line says **which tree** it was run against, because this unit's product edit was
measured and then reverted — a cadence claim over bytes that no longer exist would be worthless.

⟨cmd⟩ `npm run typecheck` (`vue-tsc -p tsconfig.lib.json` **and** `-p tsconfig.demo.json`) →
**exit 0 GREEN with the cure in tree** (and it is what caught the `Readonly<Ref>`-vs-unwrapped-`boolean`
binding in b.1), **exit 0 GREEN again on the landed tree** after the revert.
⟨cmd⟩ `npx eslint demo/picker/visual/HeroBlob.vue e2e/smoke/fixtures/blob-timing.ts --max-warnings=0` →
**exit 0** on the landed tree. **No eslint claim is made about the reverted cure** — it was not run against
those bytes, and this line says so rather than implying it.
⟨cmd⟩ `npm run lint` (repo-wide, landed tree) → **exit 1, 50 problems (18 errors, 32 warnings)** — unit c's
**c-F5** pre-existing baseline, **reproduced to the number** a third time; the offending files are all under
`docs/tranches/V/**`, unmodified, outside W2.md §4. Carried, not cured (a write there is an
ESCALATION-by-write).
⟨cmd⟩ `npm test` (vitest, landed tree) → **26 test files, 348 tests, ALL PASSED** (4.42 s). §7 orders this
run after unit **b** *because spec code imports the fixture's constants*; this unit changed **no** fixture
constant and **no** spec byte, so the run is a confirmation that the tree it hands on is unmoved — which is
exactly the claim an escalating seat owes.
⟨cmd⟩ `git diff --check` and `git diff --check --cached` → **clean** before the commit.

**b.8 · E13, in this unit's scope.** ⟨cmd⟩ `ls -lt ../glass-ui/docs/tranches/BK/coordination/ | head -6` →
the same three 2026-09-17 letters seat 0 swept, already rowed **I-32 · I-33 · I-34** by the Track D seat;
**no letter minted since**. None touches an X-W2 surface (seat 0's measurement, re-read here). **Zero unread
mail in this unit's scope.**

#### Gate readings, BEFORE → AFTER (this unit's own clock)

| gate | at unit open | at unit close | note |
|---|---|---|---|
| **G5** the wall-clock park is replaced by the shipped `settled` seam | **RED** — `:211-212` the two constants live; `:209` the dead book; `rg … demo/ e2e/` → **26 hits / 5 files**; producer seam present at `Blob.vue.d.ts:63-64` | **RED — ESCALATED, unchanged at the bytes.** The cure was written, typechecked, built and measured; **`settled` never reads true** (5 runs, 2 instruments, 45–75 s windows, software-GL, built origin), so the park never engages and `webgl-blob-idle` **reds**. The cure is **reverted**; `rg … demo/ e2e/` is still **26 / 5** | §3a trigger **"Quiescence does not park"** fired, verbatim. **The wall clock was NOT restored** — it was never removed from the landed tree. **No substitute trigger was invented.** |
| **G8** `BLOB_HERO` is consumed or tombstoned | **RED** — `grep -rn BLOB_HERO demo/ src/ \| wc -l` → **0**, three closes of silence | **GREEN by the tombstone arm** — the ruling is written above with its two measured disqualifiers and its re-trigger, and is handed to unit **d** for the close line G8 names as its home | The consumption arm was **evaluated and declined on measurement**, not skipped. G8 is discharged the moment unit d carries the line; the word exists now and is quotable. |

#### Findings banked by this unit (no gate moved, no bar touched, no producer byte patched)

- **b-F1 · MAJOR · PRODUCER · the shipped `settled` seam is UNREACHABLE on the hero's configuration.**
  `isQuiescent()` demands every satellite simultaneously `orbiting`, while the resting colony's own numbers
  forbid it: merge chain **6,000–8,000 ms** (1800 + ≤4000 + 2200) against a global inter-event cooldown of
  `3000 × mergeRate(sleepy 1.83)` = **5,490 ms**. A gate on a cooldown shorter than the run it gates cannot
  starve. **Measured, not derived alone**: with fission disarmed and the mood held `sleepy`, `settled` is
  still false after 75 s. This is the row that must reach glass-ui via the BH/BI relay.
- **b-F2 · MAJOR · PRODUCER · the fission snap enters the mood FSM through the USER-CLICK channel.**
  `satellites.onPinch(t => pointer.click(t))` makes the engine's own ornamental beat indistinguishable from
  a user click; the FSM answers `excited` (arousal 1) for 900 ms + transition, which drops `mergeRate` to
  0.3, which shortens the event cooldown to 900 ms, which produces more fissions. At any `fissionAmp > 0`
  the engine excites itself indefinitely. **Measured**: a 1 s `excited` flip every 9–12 s with zero input,
  gone entirely at `fissionAmp = 0`. An autonomous animation event should not occupy the `clicked` channel.
- **b-F3 · the manual-mood latch is a THIRD, independent path to the same starvation.** `setMood(m)` from a
  consumer passes `source: "manual"`, which latches the FSM's manual flag; it is cleared **only** by a click
  or a pointer-active edge — neither of which a decorative (hit-layer-less) Blob can ever produce. So the
  demo's own `setMood("excited")` on a scrub would pin `isSettled()` false forever. **The deleted wall-clock
  code called `setMood("sleepy")` at the idle threshold**, i.e. the old demo pose was itself blocking the
  read it was booked to be replaced by. Any future quiescence park must also retire the consumer's mood
  writes or receive a producer-side expiry.
- **b-F4 · the park's replacement cannot be sized from the wall clock's numbers.** The fixture's
  `PARK_SETTLE_MS = 2000 + 3300 + 800 = 6,100 ms` is a mirror of HeroBlob's constants. The quiescence
  trigger's analytic floor is already **8,500 ms** (auto-sleepy at `idleMs > 6000` + the 2,500 ms sleepy
  transition, both producer constants), before any satellite term — so **no re-derivation of that fixture is
  honest until b-F1 is answered**, and this unit deliberately left it alone rather than mint a number over a
  trigger that does not fire.
- **b-F5 · `prefers-reduced-motion` is a SEPARATE hole, banked not chased.** Under PRM the producer skips
  `mood.update`, so the FSM's `idleMs` never advances and `isSettled()` reads false by construction — a
  fourth starvation path, and the one that matters most for the users PRM exists to serve. Measured only to
  the extent of excluding PRM as *this* run's cause (`matchMedia(reduce)` → false); recorded for the
  triumvirate because a quiescence park that never parks under PRM would be a regression against the
  constellation's PRM-honesty law.
- **b-F6 · c-F4 / a-F5 confirmed a third time** — `npm run typecheck` destroys `dist/gh-pages`
  (`pretypecheck` → `npm run build`). Every byte reading in this unit was taken after an explicit
  `npm run gh-pages`.

#### Residuals

1. **G5 is the escalation itself** — unchanged at the bytes, with the cure measured and reverted. §5's
   sub-gate (`rg … → 0` **and** the four park specs green) is **unreachable through the specified mechanism**
   until b-F1 is answered.
2. **The fixture re-derivation and the four consumer-spec adoptions are UNSTARTED, by choice** — they are
   one indivisible commit with the HeroBlob cure (§5's lock), and landing them alone would red four specs
   against a trigger that does not exist.
3. **Two producer rows (b-F1, b-F2) owe the BH/BI relay.** They are **not** the §D producer note W2.md
   scope 9 charges unit **d** with (that note records the seam as *shipped*; these record it as
   *unreachable*), and `glass-ui` is READ-ONLY always — so they are authored in-bounds here and handed to
   the orchestrator for routing, never written into `../glass-ui/**`.
4. **c-F5's pre-existing repo-wide lint red**, reproduced unchanged. Out of bounds; carried.

#### Escalation — §3a **"Quiescence does not park"**, the trigger quoted and met

> *"**Quiescence does not park.** If `settled` never goes true within the fixture window on the software-GL
> renderer, triumvirate. Do **not** restore the wall clock; a wall-clock park is the disease."*

**Met literally.** `settled` never goes true in **45 s, 60 s and 75 s** windows — every one of them far past
the 6,100 ms fixture window — on the software-GL (SwiftShader) renderer, against the **built** bundle, across
**five** runs and **two** instruments, with PRM excluded by measurement and the cause isolated by a
controlled counterfactual. Per §3a the dispatch is **mandatory triumvirate (research + plan augment +
redress)** and **"the orchestrator may not redispatch the failing unit alone."**

**What this seat did NOT do, each forbidden act named so the record is checkable:** it did not restore or
re-introduce a wall clock (the landed tree still carries the original one, untouched); it did not invent a
substitute trigger (a draw-count plateau, a `settledFrame` proxy, an intersection read); it did not lower
`HERO_FISSION_AMP` to buy quiescence (the counterfactual was reverted, and at 0 it does not park either); it
did not patch `node_modules/@mkbabb/glass-ui/**`; it did not add a `try`/`catch`, a `test.skip`, an
allowlist, or a timeout raise to mask the red; it did not re-baseline any gate; and it did not land a
half-commit of the fixture family.

**What the triumvirate needs from the producer, stated as the shape of a cure rather than a demand:** either
(i) `isQuiescent()` gains a definition the resting colony can actually reach (the cooldown must exceed the
chain it gates, or quiescence must be defined over the colony's *aggregate* rest rather than a simultaneous
all-orbiting instant), or (ii) the fission snap leaves the `clicked` channel and the manual-mood latch gains
an expiry for hit-layer-less Blobs, or (iii) the Blob exposes a *park-worthy* read distinct from `settled`.
Any of the three makes W2.md §5's mechanism executable **as written**; none of them is a value.js byte.

**Verb stamped: none.** This unit measures and escalates; IMPLEMENTED is the wave's own close and VERIFIED
is X-W11's. The tree is handed on with `HeroBlob.vue` **byte-identical to HEAD**, the fixture and four specs
untouched, `dist/gh-pages` built and present, and this record the only path this unit wrote.

---

## Close

**SERVED MODEL**: `claude-opus-5[1m]`. **Seat**: X-W2 CLOSE (Track A), **VERIFY-ONLY — this seat cured
nothing**. **Clock**: 2026-09-17, **19:00–19:40 EDT**. Branch `tranche-u`, HEAD at open `6c783f39`.
**Sections executed**: W2.md §State (the four-verb line + Hard Gate) · §6 **G1–G8**, every gate re-run at
this seat's own clock against its own command · §7 cadence · §8 Verification Artefacts · §9 Commit Plan ·
§11 guardrails.
**Rulings consumed**: COHESION §0j (the begin-word) · §0k.1 (pathspec-on-the-commit) · §0j.A **DR-24**
(`scripts/dev/dev.sh` never read for write, never staged — it appears **0** times in any X-W2 commit,
⟨cmd⟩ `git log fc7489d5^..HEAD --name-only --format="" | sort -u | grep -c dev.sh` → **0**) · **E-3**
(no dated spec, registry or prior-evidence byte edited; units c/a/b's receipts above are read, never
revised; the one §6 spelling correction lands below as a **dated addendum-beside**).

### VERDICT — **PARTIAL** (`complete_with_misses`, and one unit UNRUN)

Two of the four planned units landed (**c**, **a**); unit **b** **ESCALATED** under §3a and landed no
product byte by design; unit **d** **NEVER RAN**. §11 guardrail 2 — *"There is no `escalate` arm — G2/G3
pass or the wave closes `complete_with_misses` with the measured number"* — is met on its own terms (G2
passes, G3 does not, and the measured number is published below with the bar untouched). But
`complete_with_misses` understates this close: **five of §8's seven verification artefacts do not exist**,
because the unit that authors them was never dispatched. **The wave is PARTIAL.**

### The gate table, BORN → CLOSE (every reading taken by this seat, against the gate's own command)

| gate | born (spec §6) | **at close, measured here** | verdict |
|---|---|---|---|
| **G1** blob barrel absent from the eager module set | **BORN-RED** — entry chunk `smin` 41/42 · `metaball` 17 · `satellite` 19/50 | **GREEN by the asserted property.** ⟨cmd⟩ a loop of `rg -o` for all three tokens over **each of the six eager chunks enumerated by the instrument's own module list** → `smin` **0 · 0 · 0 · 0 · 0 · 0`. ⟨cmd⟩ `rg -c smin dist/gh-pages/assets/*.js` → **one file only, `HeroBlob-CK6WV_Kd.js:41`**; ⟨cmd⟩ `rg -o 'HeroBlob-[A-Za-z0-9_-]+' dist/gh-pages/index.html \| sort -u \| wc -l` → **0** (neither entry nor `modulepreload`). Source side: ⟨cmd⟩ `grep -rn 'glass-ui/blob"' demo/` → **2 lines, both `HeroBlob.vue` (:34, :35)** — the lazy component, unit b's file; the **three boot-path sites are gone**; ⟨cmd⟩ `grep -rn blob-config demo/ src/ \| wc -l` → **3** | **GREEN** |
| **G2** eager JS gzip ≤ 286,720 B | **BORN-RED** 313,585 (spec) / **313,601** (measured at open) | **GREEN — 280,811 B = 274.2 KiB, margin 5,909 B.** Instrument double-run on one clean build, ⟨cmd⟩ `diff` with `generatedAt` excluded → **identical**. Enforcing gate re-run from the spec file, not from prose: ⟨cmd⟩ `npx playwright test --project=smoke-perf … -g "G2"` → **1 passed**, `[X-W2 G2] eager JS modules=6 raw=886610 gz=280811 (274.2 KiB) bar=286720 B → GREEN`. **The bar is byte-identical to its wave-open value; no seat edited it (§11 guardrail 1).** | **GREEN** (see the Hard-Gate qualifier below — the *receipt* clause is half-met) |
| **G3** p75 TBT ≤ 300 ms, N≥20, one pinned class | **BORN-RED** (N=5 pilot: 359 desktop / 734 mobile-4×) | **RED. Double-run at N=20 per config on the banked pin**: `desktop-unthrottled` **220 ms** / **218 ms** (GREEN both) · `mobile-4x-cpu` **616 ms** / **529 ms** (**RED both**). Strict Lighthouse window reads **0** on every leg, as unit c's window ruling predicted. §3a's *"TBT still red after the cut"* trigger **FIRES** | **RED** |
| **G4** p75 LCP ≤ 2500 ms, N≥20, same class | **MEASURE-AT-OPEN** | **GREEN on both configs in both runs**: desktop **952 / 816 ms**, mobile-4× **1,136 / 780 ms**. The carried Q14 figures (5,141 ms CI / ~4,919 ms local) are **not reproduced** and stand **SUPERSEDED — never met**, exactly as §6 G4 wrote in the open | **GREEN** |
| **G5** the wall-clock park replaced by the shipped `settled` seam | **BORN-RED** | **RED — ESCALATED.** ⟨cmd⟩ `rg -n "BLOB_IDLE_MS\|SLEEPY_POSE_MS" demo/ e2e/ \| wc -l` → **26**, ⟨cmd⟩ `rg -ln … \| wc -l` → **5** — unchanged from the open, to the number. ⟨cmd⟩ `sed -n '209,212p' demo/picker/visual/HeroBlob.vue` still reads the dead book and the two constants. §3a **"Quiescence does not park"** fired at unit b and the wall clock was **not** restored (it was never removed from the landed tree) | **RED — ESCALATED to the mandatory triumvirate** |
| **G6** the o5 spike leg tells today's truth | **BORN-RED** | **RED — UNRUN.** ⟨cmd⟩ `grep -n "test.fail()" e2e/smoke/perf/o5-boot-pacing.spec.ts` → **`48:    test.fail();`**, and `:27` still binds the red to the dead V-prime *"W7"* prophecy. Unit **d**, which owns this gate, was never dispatched | **RED — UNRUN** |
| **G7** the zero-reading telemetry artefact superseded | **BORN-RED** | **RED — UNRUN.** ⟨cmd⟩ `test -f docs/tranches/V/megatranche/audit/telemetry/PERF-X-W2.json` → **ABSENT**. **F-7 is intact**: ⟨cmd⟩ `git diff --stat -- …/PERF.json` → **0 lines**, the original untouched — so the gate's own falsifier does **not** fire; it is the successor that does not exist | **RED — UNRUN** |
| **G8** `BLOB_HERO` consumed or tombstoned | **BORN-RED** (`grep -rn BLOB_HERO demo/ src/` → 0, three closes of silence) | **GREEN by the tombstone arm.** ⟨cmd⟩ `grep -rn "BLOB_HERO" demo/ src/ \| wc -l` → **0** (the consumption arm was evaluated at the bytes and declined); the one-line tombstone is unit b's, **carried into this close verbatim below**, which is where G8's asserted property says it lives. *"Silence fails"* — this is not silence | **GREEN** |

**Tally at close: 4 GREEN (G1 · G2 · G4 · G8) · 4 RED (G3 measured-RED · G5 ESCALATED · G6 UNRUN ·
G7 UNRUN).** 0 gates were moved; 0 bars were touched; 0 greps were narrowed.

### The §State **Hard Gate**, clause by clause — **NOT MET**

> *"eager JS gzip ≤ 280 KiB **with a before/after receipt** · p75 TBT ≤ 300 ms **and** p75 LCP ≤ 2500 ms
> over N≥20 on ONE pinned runner class · the glass blob barrel absent from the eager module set · the
> wall-clock park replaced by the shipped `settled` seam"*

| clause | status |
|---|---|
| eager JS gz ≤ 280 KiB | **GREEN at the bytes** (280,811 B = 274.2 KiB) |
| …**with a before/after receipt** | **HALF-MET** — `BEFORE.json` exists and is tracked; **`AFTER.json` does not exist** (unit d). A byte gate whose *receipt* clause is unsatisfied is not a discharged Hard-Gate clause, and this close declines to read it as one |
| p75 TBT ≤ 300 ms on one pinned class | **RED** (mobile-4× 616 / 529 ms) |
| p75 LCP ≤ 2500 ms on one pinned class | **GREEN** (952 / 816 · 1,136 / 780 ms) |
| barrel absent from the eager module set | **GREEN** |
| wall-clock park → `settled` | **RED — ESCALATED** |

### Commit roster — **9 commits, all in bounds, 0 landed wrong**

Every commit's file set was read with ⟨cmd⟩ `git show --stat --format="" <sha>` and compared against the
writing seat's §4 / unit-plan writable set. Every one carries its `Claude-Session` trailer
(⟨cmd⟩ `git log -1 --format=%B <sha> | grep -c 'Claude-Session:'` → **1**, ×8).

| # | sha | seat | files | in bounds? |
|---|---|---|---|---|
| 1 | `fc7489d5` | seat 0 OPEN | `INBOX.md` (E13 grant) · `execution/A/X-W2.md` · `execution/LEDGER.md` | ✅ |
| 2 | `188870c2` | seat 0 erratum | the record alone | ✅ |
| 3 | `eaa70162` | **unit c, §9 row 1** | `BEFORE.json` · `eager-payload.spec.ts` · `eager-bytes.mjs` — **exactly 3**, the declared unsplittable family | ✅ |
| 4 | `33de6349` | unit c receipts | the record alone | ✅ |
| 5 | `4ca55e5d` | unit c post-commit confirmation | the record alone | ✅ |
| 6 | `13f4ddc2` | **unit a, §9 row 2** | `useAtmosphere.ts` · `BlobPane.vue` — **exactly 2** | ✅ |
| 7 | `48d921e4` | unit a receipts | the record alone | ✅ |
| 8 | `6c783f39` | unit b receipts (**escalation; no product byte**) | the record alone | ✅ |
| 9 | `91dc6e56` | **close seat, §9 row 5 (partial)** | the record · `LEDGER.md` · `W2.md` §State Status · `INBOX.md` sweep line — **exactly 4**, ⟨cmd⟩ `git show --stat` verified, zero sibling contamination | ✅ |
| 10 | *this self-reference* | close seat | `LEDGER.md` + this row — the close sha the close could not carry | ✅ |

**The modify-carve was honoured to the line.** ⟨cmd⟩ `git show 13f4ddc2 -- <the two files>` → **three
changed lines and no others**: `useAtmosphere.ts:36`, `BlobPane.vue:12`, `BlobPane.vue:13`, each a bare
`@mkbabb/glass-ui/blob` → `@mkbabb/glass-ui/blob-config` specifier swap with the imported symbols unmoved.

**§9's plan, against what landed**: rows **1** and **2** landed; row **3** (the hero park) **did not land**
— unit b escalated and, honouring §5's *"commit 3 is ONE commit and must not split"*, landed **none** of
the six-file family rather than half of it; row **4** (the o5 re-measure) **did not land**; row **5** (the
close) is this commit, **partial by its own admission**.

**Nothing landed wrong.** ⟨cmd⟩ `git diff --stat a8d9af99..HEAD -- demo/picker/visual/HeroBlob.vue
e2e/smoke/fixtures/blob-timing.ts e2e/smoke/webgl-blob-idle.spec.ts e2e/smoke/oracles/o12-blob-seat.spec.ts
e2e/smoke/mobile/blob-presence-mobile.spec.ts e2e/smoke/perf/idle-frame-budget.spec.ts
e2e/smoke/perf/o5-boot-pacing.spec.ts e2e/smoke/perf/serve-built.mjs docs/tranches/X/waves/W2.md` →
**empty**: unit b's revert is clean to the byte, `serve-built.mjs` is unmodified as §4 requires, and the
wave file was untouched until this close.
*(⟨cmd⟩ `git diff --stat a8d9af99..HEAD -- src demo e2e scripts api vite.config.ts` additionally lists
`scripts/ci/boot-smoke.mjs` — that is **X-W1's** `cad51f9e`, landed by a sibling track inside the same
commit range and **not** in any X-W2 commit. Named so the range is not mistaken for this wave's footprint.)*

### §8 Verification Artefacts — run as written, **2 of 7 present**

| artefact | state |
|---|---|
| `evidence/W2/BEFORE.json` | **PRESENT**, tracked at `eaa70162`, 34,020 B, valid JSON, carries the pin verbatim |
| `evidence/W2/AFTER.json` | **ABSENT** — unit d |
| `evidence/W2/DELTA.md` | **ABSENT** — unit d |
| `evidence/W2/o5-remeasure.txt` | **ABSENT** — unit d |
| `telemetry/PERF-X-W2.json` | **ABSENT** — unit d |
| the dated §D producer note (glass 7.0.0 ships the seam), filed per the BH/BI relay | **ABSENT** — unit d. **Non-gating by CC-035** (*"Producer half = one dated §D letter, never a gate"*), so it cannot block this close; it is owed all the same |
| commit hashes for units a–d | **PARTIAL** — a ✅ `13f4ddc2` · c ✅ `eaa70162` · b **none by design** (escalation) · d **none** |

### §7 cadence, re-run at close

⟨cmd⟩ `npm run typecheck` (`vue-tsc -p tsconfig.lib.json` **and** `-p tsconfig.demo.json`) → **exit 0**.
⟨cmd⟩ `npm test` (vitest) → **26 test files, 348 tests, ALL PASSED** (5.28 s).
⟨cmd⟩ `npx eslint scripts/perf/eager-bytes.mjs e2e/smoke/perf/eager-payload.spec.ts
demo/color-picker/composables/boot/useAtmosphere.ts demo/scenes/blob/BlobPane.vue --max-warnings=0` →
**exit 0** — **all four files this wave wrote are clean**.
⟨cmd⟩ `npm run lint` (repo-wide) → **exit 1, 50 problems (18 errors, 32 warnings)** — unit c's **c-F5**
pre-existing baseline, **reproduced to the number a fourth time**; every offending file is under
`docs/tranches/V/megatranche/**` or `docs/tranches/V/apotheosis/**`, outside W2.md §4. Carried, not cured.
⟨cmd⟩ `git diff --check` and `git diff --check --cached` → **clean**.

### Findings of the close (this seat's own; no gate moved, no bar touched, nothing cured)

- **cl-F1 · MAJOR · THE BENCH IS NOT QUIESCENT, AND G3's PIN STRING DOES NOT PIN THAT.** Measured at this
  seat: ⟨cmd⟩ `uptime` → load averages **19.46 · 26.40 · 30.24 · 32.38 · 37.12 · 74.18** across the close's
  runs, with ⟨cmd⟩ `ps -Ao pcpu,comm -r` showing a **sibling** Playwright Chromium GPU helper at **852 %
  CPU** and a sibling WebKit Playwright live — the owner's four-workflow cap, running. The consequence is
  not hypothetical: **G3 `desktop-unthrottled` reads 220 / 218 ms at close against unit c's pre-cure
  58 ms**, i.e. the number rose **~3.8×** *after* a 32,788 B gz eager cut, with **zero** product bytes
  changed on that leg (⟨cmd⟩ `git log 13f4ddc2..HEAD -- src demo api vite.config.ts package.json` →
  **empty**). G4 moves the same way (desktop 952/816 ms against 268 ms). Meanwhile the **byte** legs, read
  from disk, are load-independent and reproduce exactly. **Therefore the BEFORE/AFTER CWV pair §8 owes
  cannot be formed from unit c's `BEFORE.json` and any run taken under the four-track cap** — the two
  halves would differ by machine load, not by the cure, and a DELTA.md built from them would publish a
  fiction. G3's admissible pin (ii) records `sw_vers`, the CPU brand, node and Playwright versions; it
  records **nothing about machine quiescence**, and a runner class that cannot be held still is not a
  pinned class. **Owner**: X-W1 (pin (i), the `ubuntu-24.04` job) or a dated quiescent-bench sitting.
  **This does not move G3's verdict**: mobile-4× is RED at **616** and at **529** ms, and was RED at unit
  c's 386 ms too — every reading on that leg, at every load, exceeds 300 ms.
- **cl-F2 · the `gh-pages` build is not byte-reproducible across runs, though its raw total is.** Same
  tree, no product commits since unit a: **raw 886,610 — identical at both seats**; gz **280,813** (unit a)
  vs **280,811** (here, double-run identical), and **every emitted chunk hash differs**
  (`index-DOE-kt2B` → `index-hke8LSdx`, `_plugin-vue_export-helper-xmicxnVE` → `-Cq0YdSzc`,
  `HeroBlob-D8K-tUyl` → `HeroBlob-CK6WV_Kd`). Raw is stable because the hashes are the same *length*; gz
  drifts a few bytes because the hash text compresses differently. **2 B against a 5,909 B margin is
  immaterial to the verdict and material to the receipt**: DELTA.md must publish the eager-gz delta with a
  stated ±few-byte build tolerance, not to the byte. **Owner**: unit d.
- **cl-F3 · `webgl-blob-idle.spec.ts` is load-flaky at this bench, and when it fails it fails on the
  CANVAS, not on the park.** First close run, load ~30: **RED**, `getByTestId('goo-blob-canvas')`
  **not attached within 8,000 ms** — and the error context shows the app itself rendered (the
  `navigation "Application navigation"` node is present), so the page booted and the *hero engine* did not
  arrive. Re-run at load 19.46: **PASSED (18.5 s)**, reproducing unit b's *"1 passed"* at HEAD. Recorded
  because a seat reading only the first run would have filed a false regression against unit a's cut — and
  because the cut **does** make the hero's engine a lazily fetched 94,593 B chunk where it was previously
  resident in the eager entry, which is a live mechanism if this ever reproduces at a quiescent bench.
  **Owner**: X-W1's pinned runner for the re-read; **not cured here** (VERIFY-ONLY).
- **cl-F4 · `o12-blob-seat.spec.ts:139` (O-12·3, the hover-mood frame-diff floor) is RED at this bench and
  UNDETERMINED as to cause.** Three runs: hover response **0.05/255** and **0.01/255** against the
  **6/255** floor, plus one `toBeAttached` failure at load 26. Its three sibling legs in the same file
  (O-12·1, ·4, ·5) **passed** in the same invocation. It is **not** an X-W2 gate; unit b never opened it;
  no product byte outside the two import repoints moved in this wave. This seat **declines to call it
  either a pre-existing red or a wave-induced one** — the bench cannot answer the question today. **Owner**:
  **X-W5**, which §ENV already charges with the o12 / o24 re-read after the mobile-viewport fact lands.
  **Re-trigger**: one run at a quiescent bench, or on X-W1's `ubuntu-24.04` job.
- **cl-F5 · unit d is executable today and is blocked only by dispatch.** Its inputs all exist: the cut is
  landed, `BEFORE.json` is tracked, the instrument runs, and `o5-boot-pacing.spec.ts` is untouched. It does
  **not** depend on unit b's escalated cure — G6 measures the o5 spike leg after the *payload* cure (landed
  at `13f4ddc2`), and G7 writes a telemetry successor. §9 merely *orders* d after b; nothing in §5 or §10
  gates it on b. **The single largest miss of this wave is a dispatch gap, not a technical one.**

### Dated addenda-beside (E-3 — §6's bytes are not edited)

- **2026-09-17, close seat — F-1, carried as seat 0 promised.** §6 **G1**'s evidence block writes
  ⟨cmd⟩ `grep -rn "glass-ui/blob\"" demo/ | wc -l` → **3** while its own parenthetical enumerates **five**
  lines across three files. Measured at wave-open: **5 lines / 3 files**. Measured at close, after the cut:
  **2 lines / 1 file**. A **spelling** defect in the evidence block; the asserted property, the born-RED
  verdict and the falsifier are untouched. **No §6 byte was edited.**
- **2026-09-17, close seat — the §6 G5 `sed` anchor.** §6 **G5** quotes `sed -n '213,214p'` for the two
  constants; at true bytes they are **`:211-212`** (unit b measured this and worked the true bytes). Two
  lines, no change of substance. **No §6 byte was edited.**
- **2026-09-17, close seat — a-F1, the G1 token list.** Unit **a**'s §5 sub-gate is spelled
  `rg -c "smin|metaball" <eager chunks> → 0`; its literal reading at close is **0 · 3**, the three being
  `@mkbabb/glass-ui/aurora`'s GLSL **comments** citing `metaball.frag.ts` by filename. The discriminating
  token is **`smin`**, measured exclusive to `blob.js` across every top-level module of the installed
  producer. Recorded as the durable spelling of G1's property; **the token list was not narrowed and no
  spec byte was edited.**

### G8 — the tombstone, carried into the close verbatim (this is the line G8's asserted property asks for)

> **`BLOB_HERO` — TOMBSTONED at X-W2.** The hero's register is an overlay on the app-wide
> `BLOB_CONFIG_KEY` object that `BlobPane` live-tunes, so adopting the frozen preset as its base would
> sever that seam; the residual delta (`satelliteCount` 3→4, `membrane.smoothK` .05→.06) is design
> content, and design content is X-W10's by M-23. Re-trigger: X-W10's design canon may adopt it as the
> hero's base **in the same ruling that re-homes the live-tuning seam**.

### Escalations carried out of this wave

1. **§3a "Quiescence does not park" — G5 (unit b).** `settled` is **unreachable** on the hero's
   configuration: `isQuiescent()` requires every satellite simultaneously `orbiting`, while the resting
   colony's merge chain (1,800 + ≤4,000 + 2,200 = **6,000–8,000 ms**) exceeds the global inter-event
   cooldown (`3000 × mergeRate(sleepy 1.83)` = **5,490 ms**). Measured across 5 runs / 2 instruments /
   45–75 s windows on software-GL against the built origin, with PRM excluded by measurement and the cause
   isolated by a reverted counterfactual at `HERO_FISSION_AMP = 0`. **Dispatch is the mandatory triumvirate
   (research + plan augment + redress); §3a forbids redispatching unit b alone.** **Owner: the X
   orchestrator.**
2. **§3a "TBT still red after the cut" — G3 (this close).** *"p75 TBT > 300 ms post-cure means the blocking
   work is not the barrel parse; halt and research."* p75 TBT is **616 / 529 ms** on `mobile-4x-cpu` at
   N=20, twice. The trigger is **FIRED and recorded, not discharged**: this seat is VERIFY-ONLY and halts,
   as the trigger instructs. **It must be read together with cl-F1** — the bench was saturated, so the
   *magnitude* is not trustworthy, but the *verdict* is: every reading on that leg at every load exceeds
   the bar. **Owner: the X orchestrator**, at a quiescent bench or on X-W1's pinned runner.

### Residuals, each with a named owner

1. **G5's triumvirate** (above) — **X orchestrator**. Blocks §5's unit-b sub-gate, the fixture
   re-derivation and the four consumer-spec adoptions, all deliberately unstarted.
2. **G3's triumvirate** (above) — **X orchestrator**.
3. **Unit d, entire**: G6, G7, `AFTER.json`, `DELTA.md`, `o5-remeasure.txt`, `PERF-X-W2.json`, the §D
   producer note, and the W2.md four-verb `IMPLEMENTED` stamp. **Owner: X.W2.d** — dispatchable today
   (cl-F5), subject to cl-F1's bench caveat for any CWV figure it publishes.
4. **b-F1 and b-F2, the two producer rows** (`isQuiescent()` unreachable; the fission snap entering the
   mood FSM through the `clicked` channel) — owed to the **glass-ui BH/BI relay**. `glass-ui` is
   **READ-ONLY always**; these are authored in-bounds in unit b's receipts and route through the **X
   formation mail seat**, never into `../glass-ui/**`.
5. **b-F5**, `prefers-reduced-motion` as a fourth starvation path — **the triumvirate**, banked not chased.
6. **c-F5's pre-existing repo-wide lint red** (50 problems / 30 files, all `docs/tranches/V/**`, all
   unmodified, committed 2026-07-27 at `c0078d96`) — **X-W11 or a V-lane seat**. A write there from this
   wave is an ESCALATION-by-write.
7. **cl-F1's bench-quiescence defect** — **X-W1** (pin (i)) / the orchestrator's concurrency cap.
8. **cl-F4's undetermined O-12·3 red** — **X-W5**.
9. **G2's margin is 5,909 B**, not a wide one: any future boot-path import of a heavy subpath reds it
   again — which is G2's stated falsifier working, not a weakness of the cure.
10. **`AFTER.json` must carry `BEFORE.json`'s pin string verbatim**, or §6's delta gate is not comparing
    like with like; and per the runbook it stays **non-terminal until X-W5's A1/A2 land**.

### E13 — the four-path sweep at this seat's clock (19:2x EDT), read-only

⟨cmd⟩ `/usr/bin/find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-17 18:53'` over all five paths
(the four ⊕ the atlas **Q**-lane extension): `docs/tranches/V/coordination/` → **`INBOX.md` alone**
(self-excluded, SELF-COUNT law) · `../glass-ui/docs/tranches/BK/coordination/` → **nothing**
(BK re-confirmed the newest glass tranche dir) · `../sci-report/atlas/docs/tranches/P|Q/coordination/` →
**nothing** · `../keyframes.js/docs/tranches/V/coordination/` → **ten paths, every one a false positive**:
a Track C git operation rewrote that whole directory at **19:08** (⟨cmd⟩ `git -C ../keyframes.js log -1`
→ `3e81f500` X.KF.W4; a first listing mid-operation showed **2** entries and a re-read showed **13**, the
same set seat 0 swept). Not one file is new: the newest by **content** date is
`VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`, **our own O-21 delivery**, already rowed.
**Result: 0 unrowed · 0 new `I-n` minted · 0 new `O-n` minted.**

**0 UNREAD in X-W2's scope**, re-measured at the letters' **current** bytes (glass re-saved all three at
17:43; the rows are the durable mark — D37): ⟨cmd⟩ `grep -Eic "blob|settled|eager|metaball"` over
I-32 / I-33 / I-34 → **1 · 2 · 0**, and **every hit is `defaultBlobColorResolver`**, which
⟨cmd⟩ `grep -rn defaultBlobColorResolver demo/ src/ | wc -l` → **0** places nowhere in this tree.
`grep -c HeroBlob` → **0 · 0 · 0**; `grep -c blob-config` → **0 · 0 · 0**. The three `UNREAD` status cells
are **Track D's rows**, routed by their own Routing cells to **X-W0.j / the X formation mail seat**, and
are **not rewritten here** (append-only). Two standing items carried unchanged, neither X-W2's: **K-R1**
(I-30's stale digest) and the **9.0.0 re-trigger** — both the orchestrator's.

### The four-verb line — what this close moves, and what it does not

§State: *"Thereafter this wave's own close stamps **IMPLEMENTED** — **gates green, bytes landed**;
**VERIFIED** is stamped only at X-W11's release close."*

**IMPLEMENTED is NOT stamped.** The condition §State attaches to it is unmet on both halves: the gates are
**4 GREEN / 4 RED**, and unit d's bytes did **not** land. This close therefore moves the wave's §State
**Status** field to `PARTIAL` and leaves the four-verb line reading `IMPLEMENTED: no.` — because that is
the measurement. A close that stamped IMPLEMENTED here would be the U-close disease named in §11's own
archaeology: *"naming the obligation counted as satisfying it."*

**VERIFIED is untouched** and remains X-W11's, against its browser / real-Safari and consumer-tuple
receipts.

**What the wave nevertheless achieved, stated plainly**: the four-close Q14 chronic **ends as §2a defines
the end** — *"the gate becomes executable by one agent at one bench"*. Before this wave the byte gate had
no command and the CWV gates had no instrument; today `node scripts/perf/eager-bytes.mjs` and
`e2e/smoke/perf/eager-payload.spec.ts` answer both, the eager payload is **32,790 B gz lighter and under
its untouched bar**, the barrel is out of the eager graph by an import-graph fact, and the carried
5,141 / 4,919 ms LCP figures are **superseded by measurement** rather than re-booked. What did not happen
is the park, the o5 verdict, the telemetry successor and the AFTER receipt.

---

## Check 1

**FRESH ADVERSARIAL CHECK (L-20, pass 1) — VERIFY-ONLY.** **SERVED MODEL**: `claude-opus-5[1m]`.
**Seat clock**: 2026-09-17, **19:24–19:33 EDT**. Branch `tranche-u`, HEAD at check `49d7c24c`.
This seat **authored none of this wave's bytes** — not seat 0's, not unit c's, a's or b's, not the
close seat's. It cured nothing, moved no gate, touched no bar and narrowed no grep. Every figure
below is this seat's **own** measurement, taken from the gate's **own command** over its **own**
fresh `npm run gh-pages`, and every count is double-run.

### VERDICT — **NOT-CONFORMANT** · 2 HIGH · 1 MEDIUM · 1 MINOR · 2 INFO

**All eight §6 gate verdicts reproduce exactly** (4 GREEN · 4 RED), **all four claimed GREENs
reproduce**, and **bounds · masking · E-3 · commit families · mail · the four-verb line are clean**.
The verdict turns on **axis 10 alone**: of the four REDs, **G5 and G3 are honest-RED under the
spec's own relief**, and **G6 and G7 are not relieved by anything the spec says** — their cure is
in-bounds to **X.W2.d, a unit of this very wave**, which was never dispatched. A RED whose cure sits
inside the wave's own unrun unit is a real defect, not an honest red; the close's own **cl-F5** says
so in its own words (*"unit d is executable today and is blocked only by dispatch … the single
largest miss of this wave is a dispatch gap, not a technical one"*). This is the same shape this
tranche's F.W5 CHECK 1 and KF.W4 CHECK 1 both returned NOT-CONFORMANT for, and it is returned the
same way here.

### Axis 1 — every claimed GREEN, re-run at this seat's own command

| gate | the close's claim | **this seat's independent reading** | reproduces? |
|---|---|---|---|
| **G1** barrel absent from the eager set | GREEN by the import graph; `smin` 0 across all six eager chunks | ⟨cmd⟩ a loop of `grep -o` for all three tokens over **each of the six eager chunks the instrument itself enumerates** → `smin` **0 · 0 · 0 · 0 · 0 · 0**. ⟨cmd⟩ `grep -c smin dist/gh-pages/assets/*.js` (all emitted JS) → **one file only, `HeroBlob-CK6WV_Kd.js:41`**. ⟨cmd⟩ `grep -o 'HeroBlob-[A-Za-z0-9_-]*' dist/gh-pages/index.html \| sort -u \| wc -l` → **0** — neither entry nor `modulepreload`. Source side: ⟨cmd⟩ `grep -rn 'glass-ui/blob"' demo/` → **2 lines, both `HeroBlob.vue` (:34, :35)**; ⟨cmd⟩ `grep -rn blob-config demo/ src/ \| wc -l` → **3** | **YES** |
| **G2** eager JS gz ≤ 286,720 B | GREEN 280,811 B, margin 5,909 B, bar untouched | ⟨cmd⟩ `node scripts/perf/eager-bytes.mjs` ×2 on one fresh build → **`eager JS raw= 886610 gz= 280811 = 274.2 KiB (bar 286720 B) -> GREEN`**, 6 modules; ⟨cmd⟩ `diff` of the two JSON records with `generatedAt` excluded → **no output**. Enforcing gate re-run from the spec file: ⟨cmd⟩ `npx playwright test --project=smoke-perf … -g "G2"` → **1 passed**, `[X-W2 G2] … gz=280811 (274.2 KiB) bar=286720 B → GREEN`. **The bar in both `eager-bytes.mjs:58` and `eager-payload.spec.ts:82` is `286720`, byte-identical to §6's** | **YES — to the byte** |
| **G4** p75 LCP ≤ 2500 ms, N≥20 | GREEN, desktop 952/816 · mobile-4× 1,136/780 ms | ⟨cmd⟩ `npx playwright test … -g "G3/G4"`, **N=20 per config at this seat's own clock**: `desktop-unthrottled` **p75 LCP 684 ms** · `mobile-4x-cpu` **p75 LCP 1,080 ms** — **GREEN on both, against a 2,500 ms bar**. The pin string the spec **computes** reproduced verbatim: `macOS 26.4.1 (25E253) · Apple M5 Max · node v26.0.0 · @playwright/test 1.60.0 · Chromium headless (SwiftShader) · serve-built.mjs :8091` | **YES** (a third independent N=20 reading; the carried Q14 5,141 / 4,919 ms figures are again **not reproduced**) |
| **G8** `BLOB_HERO` consumed or tombstoned | GREEN by the tombstone arm | ⟨cmd⟩ `grep -rn "BLOB_HERO" demo/ src/ \| wc -l` → **0**; the one-line tombstone with its two measured disqualifiers and its X-W10 re-trigger is carried **verbatim in the close**, where G8's asserted property says it lives. *"Silence fails"* — this is not silence | **YES** |

### Axis 1 (cont.) — every RED the close left, re-run the same way

| gate | reading at this seat | matches the close? |
|---|---|---|
| **G3** p75 TBT ≤ 300 ms | `mobile-4x-cpu` **p75 TBT 786 ms** at N=20 (desktop **202 ms**, GREEN). **A third independent reading above the bar** — 386 (unit c) · 616 / 529 (close) · **786** (here). Every reading on that leg, at every machine load, exceeds 300 ms | **YES — RED** |
| **G5** wall-clock park → `settled` | ⟨cmd⟩ `grep -rn "BLOB_IDLE_MS\|SLEEPY_POSE_MS" demo/ e2e/ \| wc -l` → **26**, ⟨cmd⟩ `grep -rln … \| wc -l` → **5**; ⟨cmd⟩ `sed -n '205,215p' demo/picker/visual/HeroBlob.vue` still carries the *"booked at the 5.0.0 adopt"* dead book and `const BLOB_IDLE_MS = 2000;` / `const SLEEPY_POSE_MS = 3300;` | **YES — RED, unchanged at the bytes** |
| **G6** the o5 spike leg tells today's truth | ⟨cmd⟩ `grep -n "test.fail()" e2e/smoke/perf/o5-boot-pacing.spec.ts` → **`48:    test.fail();`**; `:27` still binds the red to *"the payload cure is W7's"* — a dead V-prime wave | **YES — RED, UNRUN** |
| **G7** the telemetry successor | ⟨cmd⟩ `ls docs/tranches/V/megatranche/audit/telemetry/` → **`PERF.json` + `perf-probe.mjs` only; `PERF-X-W2.json` ABSENT**. **F-7 intact**: ⟨cmd⟩ `git diff --stat a8d9af99..HEAD -- …/PERF.json` → **0 lines** | **YES — RED, UNRUN** |

**Gate verdicts reproduced: 8 of 8. Claimed GREENs that failed to reproduce: 0.**

### Axis 2 — bounds · Axis 4 — families · Axis 5 — E-3

- **10 commits, every one in bounds.** ⟨cmd⟩ `git show --stat --format=""` per sha: `fc7489d5` (INBOX ⊕ record ⊕ LEDGER) · `188870c2` · `eaa70162` (**exactly the 3-file unsplittable instrument family**) · `33de6349` · `4ca55e5d` · `13f4ddc2` (**exactly 2 files**) · `48d921e4` · `6c783f39` · `91dc6e56` (record ⊕ LEDGER ⊕ W2.md §State ⊕ INBOX) · `1174dfdc` (the close's own sha, the self-reference the close could not carry).
- **The modify-carve is exactly three lines and every one is a bare specifier swap.** ⟨cmd⟩ `git show 13f4ddc2 --format="" -- <the two files> | grep -E '^[+-][^+-]'` → six lines, three `-`/`+` pairs, `@mkbabb/glass-ui/blob` → `@mkbabb/glass-ui/blob-config`, **imported symbols unmoved**. ⟨cmd⟩ `git diff --stat 13f4ddc2^ 13f4ddc2 -- src demo api vite.config.ts package.json package-lock.json` → **2 files, 3 insertions, 3 deletions and nothing else**.
- **`scripts/dev/dev.sh` appears 0 times.** ⟨cmd⟩ `git log fc7489d5^..1174dfdc --name-only --format="" | sort -u | grep -c dev.sh` → **0**, and it is still ` M` and unstaged in the tree.
- **Every path §4 reserves is byte-untouched.** ⟨cmd⟩ `git diff --stat a8d9af99..1174dfdc -- demo/picker/visual/HeroBlob.vue e2e/smoke/fixtures/blob-timing.ts e2e/smoke/webgl-blob-idle.spec.ts e2e/smoke/oracles/o12-blob-seat.spec.ts e2e/smoke/mobile/blob-presence-mobile.spec.ts e2e/smoke/perf/idle-frame-budget.spec.ts e2e/smoke/perf/o5-boot-pacing.spec.ts e2e/smoke/perf/serve-built.mjs vite.config.ts src demo/shell/usePaneRouter.ts` → **0 lines**. Unit b's revert is clean to the byte.
- **Families not split.** §9 row 1's three files landed in ONE commit; row 2 in one; **row 3 landed as NOTHING rather than as half** (§5's *"commit 3 is ONE commit and must not split"*, honoured by landing none of the six-file family); rows 4–5 are the miss registered below.
- **E-3 held.** ⟨cmd⟩ `git diff --stat a8d9af99..1174dfdc -- docs/tranches/V/megatranche/registry/` → **0 lines**. `docs/tranches/X/waves/W2.md` moved **one line** — the §State `Status` field, exactly the §4 grant (⟨cmd⟩ `git show 91dc6e56 -- docs/tranches/X/waves/W2.md` → `-**Status**: planned` / `+**Status**: **PARTIAL …**`). **No §6 byte was edited**; the three corrections ride as dated addenda-beside, as E-3 requires.

### Axis 3 — masking fallbacks: **none found**

Both created files were read **whole** at this seat (`scripts/perf/eager-bytes.mjs` 296 L ·
`e2e/smoke/perf/eager-payload.spec.ts` 498 L), and the product diff is three specifier characters.
**No `test.skip`, no added `test.fail()`, no allowlist, no copied producer selector, no patched
`node_modules`, no silently narrowed assertion.** The two constructs a hostile would reach for, each
checked and each cleared:

1. **The instrument's one `try`/`catch`** (`eager-bytes.mjs:288-295`) is the CLI's error boundary: it
   reports `exit 2` for *"could not measure"* and wraps **nothing** that could hide a defect — the
   collector **throws** on a missing artifact (`:126`) and on an index that references a file that is
   not on disk (`:199`). A born-RED reading exits 0 **by design**, because the enforcing gate is the
   spec file, and this seat proved that pairing lives: the same command read RED at 313,601 B for
   unit c and GREEN at 280,811 B here, through an unmodified instrument and an unmodified bar (L-19).
2. **The TBT window is WIDENED, not narrowed.** The gated window is `[navigationStart,
   observationEnd]`; Lighthouse's strict `[FCP, TTI]` reads **2 ms desktop / 4 ms mobile-4×** at this
   seat's own N=20 — i.e. **G3 would be GREEN on both legs under the canonical window**, and the
   implementing seat gated the **harder** one and published the softer one beside it. That is the
   opposite of masking, and it is why G3 is still a live failing gate. See INFO-1.
- **`expect.soft`** in the G3/G4 leg accumulates all four verdicts in one run; any soft failure still
  fails the test — proved here: the run exited **1 failed** on the mobile TBT leg.

### Axis 6 — mail · Axis 7 — the four-verb line · Axis 9 — published figures

- **Mail: 0 UNREAD in X-W2's scope, reproduced independently.** The three live `UNREAD` rows are
  **I-32 · I-33 · I-34**, Track D's, routed by their own cells to X-W0.j / the X formation mail seat.
  Scope probe re-run at the letters' current bytes: ⟨cmd⟩ `grep -Eic "blob|settled|eager|metaball"` →
  **1 · 2 · 0** (disposition · constellation-relay · bbnf), and ⟨cmd⟩ `grep -rn defaultBlobColorResolver demo/ src/ | wc -l`
  → **0** places every hit nowhere in this tree. ⟨cmd⟩ `ls -lt ../glass-ui/docs/tranches/BK/coordination/ | head -5`
  → **no letter minted since 17:43**.
- **The four-verb line moved lawfully — by NOT moving.** §State's condition for IMPLEMENTED is
  *"gates green, bytes landed"*; the gates are 4/4 and unit d's bytes never landed, so the close left
  `IMPLEMENTED: no.` and moved only the `Status` field. **VERIFIED is untouched and remains X-W11's.**
  Stamping IMPLEMENTED here would have been §11's own U-close disease (*"naming the obligation counted
  as satisfying it"*); the close declined it, and that is the correct act.
- **Published figures reproduce.** eager JS `raw 886,610` / `gz 280,811` / 6 modules (double-run
  identical); the pin string verbatim; CLS **0.0193** desktop / **0.0000** mobile, reproducing the §6
  pilot exactly; ⟨cmd⟩ `npm test` → **26 files, 348 tests, ALL PASSED**, the close's figure to the
  number. The close's own **cl-F2** is confirmed: gz reads **280,811** here and **280,813** at unit a
  on identical product bytes, every chunk hash differing — 2 B against a 5,909 B margin.
- **cl-F3 re-read, and it clears the cut.** ⟨cmd⟩ `npx playwright test --project=smoke e2e/smoke/webgl-blob-idle.spec.ts`
  → **1 passed (29.5 s)**. The hero's engine still parks and still renders as a lazily fetched
  94.6 KB chunk, so the close's load-flake diagnosis holds and **unit a's cut broke nothing the park
  oracle can see**.

### Axis 8 — the spec's own goal criterion (§2a), at the bytes

> *"…the boot path of the built demo no longer pays for the WebGL2 metaball engine it does not use at
> boot, **and** … the boot cost is thereafter a measured number with a named environment rather than
> an escalation."*

**First half: MET at the bytes, verified independently** — the engine is out of the eager graph
(`smin` 0 × 6 chunks; the barrel alone in an unpreloaded chunk `index.html` names 0 times) and the
eager set is 32,790 B gz lighter under an untouched bar. **Second half: MET IN PART.** The number and
its environment exist and are re-runnable by one agent at one bench — this seat re-ran both from the
shell and from the spec file — which is exactly what §2a calls the end of the Q14 chronic. But the
boot cost **is still an escalation at G3** (§3a's *"TBT still red after the cut"* fired), and the
before/after **pair** §State's Hard Gate names cannot be formed at all, because `AFTER.json` does not
exist. §2a is therefore **not fully met**, and the close says so rather than claiming otherwise.

### Axis 10 — HONEST-RED ADJUDICATION, gate by gate

**RELIEVED — the honest-RED set (2): G5 · G3.**

- **G5 — RELIEVED, twice over: PRODUCER-OWNED and named by the spec's own relief arm.**
  §3a spells the arm verbatim: *"**Quiescence does not park.** If `settled` never goes true within the
  fixture window on the software-GL renderer, triumvirate. Do **not** restore the wall clock."* Unit b
  met that trigger literally (5 runs / 2 instruments / 45–75 s windows against the built origin, PRM
  excluded by measurement, the cause isolated by a reverted `HERO_FISSION_AMP = 0` counterfactual),
  and the root cause is **inside the producer**: `isQuiescent()` requires every satellite
  simultaneously `orbiting` while the resting colony's merge chain (6,000–8,000 ms) exceeds the
  5,490 ms cooldown that gates it. **`glass-ui` is READ-ONLY always**, so a consumer-side cure would
  be precisely the substitute trigger the spec forbids — a green bought by a masking fallback. The
  landed tree keeps the original wall clock **because it was never removed**, not because it was
  restored, and this seat measured that (`26 / 5`, unchanged). **Owner named in the register**:
  residual 1 → the X orchestrator's mandatory triumvirate; residual 4 → b-F1/b-F2 to the glass-ui
  BH/BI relay. **HONEST-RED.**
- **G3 — RELIEVED by §11 guardrail 2, which names the disposition by its own words.**
  *"There is no `escalate` arm — G2/G3 pass or the wave closes `complete_with_misses` with the
  measured number."* That is the spec authoring this exact outcome in advance. The measured number is
  published (616 / 529 at close; **786 at this seat**), the bar is byte-identical to wave-open, and
  §3a's *"TBT still red after the cut … halt and research"* is the spec's own routing of what happens
  next. **Owner named in the register**: residuals 2 and 7 → the X orchestrator, at a quiescent bench
  or on X-W1's pinned `ubuntu-24.04` runner. **HONEST-RED.**

**UNRELIEVED (2): G6 · G7 — see D-1 and D-2.** Neither is producer-owned; neither is routed to a
later wave by any byte of the spec; neither is an honest-RED the spec names by id. §5's
`### X.W2.d` and §9 rows 4–5 route both to a unit **of this wave**. The register names an owner —
*"**Owner: X.W2.d** — dispatchable today"* — but **X.W2.d is not a successor**, and an owner inside
the wave is the definition of an undischarged obligation, not of a relief.

### The defect register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **HIGH** | **G6 is an UNRELIEVED RED**: the o5 spike leg still tells a dead wave's truth, and the spec routes the cure to X.W2.d — a unit of this wave that was never dispatched | ⟨cmd⟩ `grep -n "test.fail()" e2e/smoke/perf/o5-boot-pacing.spec.ts` → `48:    test.fail();`; `:27` still reads *"the payload cure is W7's (L20 `/blob/config` + GAP-L5 — the Q14 chain). Re-measure at the W7 adopt; flip then"* — the V-prime W7 that this wave **is**. §6 G6's own words: *"A stale prophecy naming a dead wave is not an acceptable third state."* The close concurs at cl-F5: *"unit d is executable today and is blocked only by dispatch"* | Dispatch **X.W2.d** (nothing gates it — G6 measures the o5 leg after the *payload* cure, landed at `13f4ddc2`, and §5/§10 gate it on nothing): re-run `o5-boot-pacing`, then **either** delete `test.fail()` (leg green) **or** rewrite `:20-38` with today's median / max-ratio and today's diagnosed cause, and write `docs/tranches/X/evidence/W2/o5-remeasure.txt` with the `[O-5]` console line |
| **D-2** | **HIGH** | **G7 is an UNRELIEVED RED**: the 2026-07-24 all-zero telemetry receipt is still the only telemetry file in the tree, and its dated successor was never written | ⟨cmd⟩ `ls docs/tranches/V/megatranche/audit/telemetry/` → `PERF.json` · `perf-probe.mjs` — **`PERF-X-W2.json` ABSENT**. F-7 **is** intact (⟨cmd⟩ `git diff --stat a8d9af99..HEAD -- …/PERF.json` → 0 lines), so the gate's own falsifier does not fire; what fails is the successor's non-existence, which is the gate's asserted property (*"a dated successor (`PERF-X-W2.json`) **exists**"*) | Dispatch **X.W2.d**: write `docs/tranches/V/megatranche/audit/telemetry/PERF-X-W2.json` — the dated successor, carrying the pin string and this wave's own CWV readings — **never** by editing `PERF.json` (append-never-rewrite, F-7) |
| **D-3** | **MEDIUM** | **The §State Hard Gate's *"with a before/after receipt"* clause is unsatisfiable as the wave stands**, and §8 is **2 of 7**: `AFTER.json`, `DELTA.md`, `o5-remeasure.txt`, `PERF-X-W2.json` and the dated §D producer note are all absent, so G2's GREEN publishes a number without its pair | ⟨cmd⟩ `ls docs/tranches/X/evidence/W2/` → **`BEFORE.json` alone** (34,020 B, tracked at `eaa70162`, pin verbatim — CC-012 honoured for the one artefact that exists). The close registers this itself and declines to read the clause as discharged | Dispatch **X.W2.d**; and note the close's **cl-F1** constraint at the bytes: a CWV `AFTER.json` taken under the four-track cap cannot be differenced against unit c's `BEFORE.json` (this seat's own desktop p75 TBT reads **202 ms** against unit c's pre-cure **58 ms** on **zero** changed product bytes). The **byte** halves are load-independent and pair cleanly today; the **CWV** halves need X-W1's pinned runner or a dated quiescent-bench sitting. The §D note is **non-gating by CC-035** and cannot block a close, but it is owed to the BH/BI relay all the same |
| **D-4** | **MINOR (mitigated)** | **cl-F1 reproduced independently: the bench is not quiescent and G3's pin (ii) pins nothing about that.** The pin string is a machine *identity*, not a machine *state* | ⟨cmd⟩ `uptime` across this seat's runs → load averages **19.36 · 27.26 · 37.09 · 40.91**. On identical product bytes the mobile-4× p75 TBT reads **386** (unit c) · **616 / 529** (close) · **786** (here) and desktop **58 → 220 / 218 → 202** | **Mitigation, and why it does not block**: the byte gates are read from disk and reproduce **to the byte** at every load, and **every** mobile-4× reading at **every** load exceeds the 300 ms bar, so G3's RED is load-robust even though its magnitude is not. **Owner already named** (residual 7 → X-W1's pin (i) / the orchestrator's concurrency cap) |
| **INFO-1** | INFO | The gated TBT window is `[navigationStart, observationEnd]`, not Lighthouse's `[FCP, TTI]` against which `lighthouserc.json`'s 300 ms bar is defined | This seat's own N=20: `p75 TBT[FCP,end]` = **2 ms** desktop / **4 ms** mobile-4× — **G3 would read GREEN on both legs under the canonical window**. The substitution is declared in the spec file's docstring, in `BEFORE.json`'s `windowRuling`, and in the close | **No act owed** — the seat gated the **stricter** window and published the softer one beside it every run. Recorded here so that **no successor may flip G3 GREEN by silently reverting to the strict window**: that would be the narrowed assertion this check exists to catch |
| **INFO-2** | INFO | One warm-up load per config is discarded from the p75 | `eager-payload.spec.ts:364-368` — measured, logged, and kept in the record as `warmup`; never deleted | **No act owed** — disclosed, not silent, and immaterial at today's margins (G4's is >1,400 ms; G3's mobile leg is RED with and without it) |

### What this check does NOT find

Stated because a check that finds only what it looked for is not a check. **No** write outside
§4 · **no** `scripts/dev/dev.sh` byte · **no** split family · **no** re-baselined bar (`286720` in
both wave-written files, byte-identical to §6) · **no** narrowed grep (the token census was *widened*
to all three tokens over all six chunks, and this seat re-ran it that way; the residual `metaball` ×3
are `@mkbabb/glass-ui/aurora`'s GLSL comments — ⟨cmd⟩ `grep -rl "mirrors metaball.frag.ts" node_modules/@mkbabb/glass-ui/dist/`
→ **`aurora.js`** + `brush.glsl.d.ts` — and the residual `satellite` ×3 are
`BLOB_CONFIG_DEFAULTS`' own field names, `satelliteCount:3, satelliteRadius:.082`, which the §6 G2
prediction line budgets eager in so many words) · **no** patched `node_modules` · **no** dev-server
number anywhere (MT-F011 is enforced structurally by `builtOrigin()`, which **fails the test** unless
the port is `serve-built.mjs`'s) · **no** UNREAD mail in scope · **no** false IMPLEMENTED stamp.
**The close's honesty is not in question anywhere in this register.** What is in question is that a
wave with two never-attempted Hard-Gate legs and five of seven verification artefacts missing is not
yet a closed wave.

### Successor readiness — the "Opens after" conjuncts, stated

- **X-W5** (`W5.md:6`) opens after **X-W4** · **X-W2** · X-W0's track-or-archive act. **X-W4 is
  `planned`**, so X-W5 is blocked on that conjunct regardless of this wave. On the **X-W2** conjunct:
  the runbook §1.1 edge reads *"Boot cost is measured before shell composition rewrites it; **W2's
  `AFTER.json` is non-terminal until W5's A1/A2 land**"* — the boot cost **is** measured (instrument
  + pin + two N=20 sittings), so the edge's substance is served, but the artefact the edge names by
  name **does not exist**. **X-W5 is lawfully blocked today, on X-W4 outright and on X-W2's missing
  `AFTER.json` in the artefact the edge itself names.**
- **X-W11** (`W11.md:6`) opens after *"X-W0 … X-W10 are **IMPLEMENTED**"*. **X-W2 is not
  IMPLEMENTED** and its close deliberately declined the stamp, so **X-W11 is lawfully blocked by this
  wave**, exactly as §10's *"CC-035 and CC-036 cannot reach VERIFIED in the release table without
  this wave's receipts"* anticipated.

### The act this check takes

Per the bar, **the LEDGER Track A `X-W2` status cell is NOT moved to CLOSED** — the wave remains
**PARTIAL** — and a dated event line is appended to the append-only §Event log. Nothing else in the
ledger is touched; no gate, bar, grep, spec byte or prior receipt was moved by this seat.

---

## Repair 1

**REPAIR SEAT, round 1 — the wave's FIRST curing seat since unit a.** **SERVED MODEL**:
`claude-opus-5[1m]`. **Seat clock**: 2026-09-17, **19:36–20:1x EDT**. Branch `tranche-u`, HEAD at open
`57a65fc6`. **Register consumed**: §Check 1's defect register — **D-1 (HIGH) · D-2 (HIGH) ·
D-3 (MEDIUM) · D-4 (MINOR, mitigated) · INFO-1 · INFO-2**.
**The act**: **X.W2.d was dispatched.** CHECK 1's verdict was that two REDs sat unrelieved because the
unit that cures them was never run, and the close agreed with itself at `cl-F5` — *"unit d is
executable today and is blocked only by dispatch … the single largest miss of this wave is a dispatch
gap, not a technical one."* This seat ran it. **E-3 held**: no dated spec, registry, conformance
artefact or prior receipt was edited; §Baseline, §Unit receipts, §Close and §Check 1 are byte-untouched
above, and the two §4-granted living fields (`W2.md` §State `Status`, the LEDGER row) moved by
**appending**, never by rewriting.

### D-1 (HIGH) — G6 · **CURED**

**Cure idiom taken**: §6 G6's **second arm**, because the spec forbids the seat to choose:
*"The spec's own assertion (`maxDelta ≤ 3 × median`) decides it; the seat may not choose the verdict,
only report it."* The assertion returned **RED**, so `test.fail()` **stays** and the header now carries
today's numbers and today's cause. **`SPIKE_RATIO` (3), `DROP_RATIO` (2), `DROP_FRACTION_MAX` (0.1) and
the `frames.length > 10` precondition are BYTE-UNCHANGED** — ⟨cmd⟩
`grep -n "SPIKE_RATIO = \|DROP_RATIO = \|DROP_FRACTION_MAX = \|toBeGreaterThan(10)"` → `69:const
SPIKE_RATIO = 3;` · `70:const DROP_RATIO = 2;` · `71:const DROP_FRACTION_MAX = 0.1;` ·
`90: expect(frames.length, "no boot frames captured").toBeGreaterThan(10);`. Nothing narrowed, nothing
skipped, no ratio raised.

**Today's measurement, from the spec's own command** (⟨cmd⟩ `npx playwright test --project=smoke-perf
e2e/smoke/perf/o5-boot-pacing.spec.ts`, **ten sittings**, host load 12.88–36.29). Nine of ten failed at
the spec's own **precondition** (`no boot frames captured`); the one that reached the assertion printed:

> `[O-5] renderer=ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0) (0x0000C0DE)),
> SwiftShader driver) frames=12 median=140.7ms max=2625.0ms (18.7× median) dropped=3 (25.0%)`

— **median 140.7 ms · max-ratio 18.7× (bar 3×) · dropped 25.0 % (bar ≤ 10 %)**. Both legs RED; the
pile-up leg, GREEN at the W2-3 reading (5.3 %), is red here.

**Today's diagnosed cause, and it is NOT the payload.** Four probes of the same collector plus a
`PerformanceObserver('longtask')` census (a scratchpad probe — **no repo byte was written for it and no
product or spec file was modified to take it**):

| probe | host load | frames | median | max | ratio | dropped | max-gap span |
|---|---|---:|---:|---:|---:|---|---|
| P1 | 46.63 | 10 | 141.7 ms | 2450.0 ms | 17.3× | 3 (30.0 %) | [262, 2712] ms |
| P2 | 43.86 | 11 | 140.8 ms | 2625.1 ms | 18.6× | 3 (27.3 %) | [173, 2798] ms |
| P3 | 25.49 | 11 | 141.8 ms | 2524.9 ms | 17.8× | 3 (27.3 %) | [180, 2705] ms |
| P4 | 22.79 | 7 | 150.0 ms | 2733.0 ms | 18.2× | 2 (28.6 %) | [273, 3006] ms |

- the whole 4,000 ms window holds **exactly ONE main-thread long task — 139–238 ms**, the Vue mount,
  ending by 250 ms. The prophecy's *"ONE eager-payload mount task (the 347.9 KiB gz eager index —
  RP-2)"* is now that task, against an eager set this wave made **32,790 B gz lighter**;
- **ZERO long tasks lie INSIDE the max frame gap — 4 of 4 probes**, 0 ms of 2,450–2,733 ms;
- the gap is stable **±6 % across host load 22.8 → 46.6**, so it is **not** host noise either;
- the hero engine is **not** a candidate: within 4,000 ms the JS resource census contains **no**
  HeroBlob chunk and `goo-blob-canvas` count is **0**; a timing probe put both at **4–8 s**
  (`t≈4000ms canvas=0 chunks=[]` → `t≈8000ms canvas=1 chunks=["HeroBlob-CK6WV_Kd.js"]`).

**Therefore**: a **~2.5 s presentation-side rAF / BeginFrame stall carrying no main-thread work**, on a
headless software-GL compositor. §ENV already owns that boundary — *"Headless Chromium is software-GL
(SwiftShader) … the real-GPU oracle is CC-029 / X-W1, not this wave"* — and §6 G6 itself routes the
**disposition** of the marker: *"X-W1 (CC-031) rules the disposition of the three `test.fail()` legs as
a class; X-W2 executes the payload cure and supplies the measurement for this one."* Payload cure:
unit a, `13f4ddc2`. Measurement: this seat. **The forbidden third state — a stale prophecy naming a
dead wave — no longer exists in the tree**: ⟨cmd⟩ `grep -c "payload cure is W7's\|Re-measure at the W7
adopt" e2e/smoke/perf/o5-boot-pacing.spec.ts` → **0**.

**Recorded beside it, NOT cured**: the 4,000 ms window yields only **7–12 rAF frames** on SwiftShader,
which is why the spec's own `frames.length > 10` guard fails in **9 of 10** sittings and the legs are
usually not evaluated at all at this bench. **Lowering that guard would be the narrowed assertion this
wave's law forbids**, so it stands and the fact is published.

**Commit**: `1129d22e` — `e2e/smoke/perf/o5-boot-pacing.spec.ts` (+39/−9) ·
`docs/tranches/X/evidence/W2/o5-remeasure.txt` (147 lines). Exactly 2 files.

### D-2 (HIGH) — G7 · **CURED**

`docs/tranches/V/megatranche/audit/telemetry/PERF-X-W2.json` **now exists** — 151 lines, dated
2026-09-17, carrying the pin string **verbatim** (asserted by equality in the generator, not by eye),
four rows (two configs × two N=20 sittings), the G3/G4 verdicts, the bench-quiescence caveat, and an
explicit **reader warning** that the 2026-07-24 zero rows are the MT-F012 empty-mount build's honest
zeros and **not a boot measurement**.

**F-7 held, and was measured rather than promised**: ⟨cmd⟩ `git diff --stat --
docs/tranches/V/megatranche/audit/telemetry/PERF.json` → **0 lines**, and ⟨cmd⟩ `ls -la` shows
`PERF.json` still at its **Jul 24 14:21** mtime beside the new file. The successor supersedes by
existing; the original was never opened for write. **G7 → GREEN.**

**Commit**: `6a5fea76` (the receipts family, below).

### D-3 (MEDIUM) — the Hard Gate's *"with a before/after receipt"* clause, and §8 · **CURED as far as the bench permits, with the residue named**

§8 was **2 of 7**. It is now **7 of 7**: `BEFORE.json` · **`AFTER.json`** · **`DELTA.md`** ·
**`o5-remeasure.txt`** · **`PERF-X-W2.json`** · **the dated §D producer note** · the unit commit hashes
(**a** `13f4ddc2` · **c** `eaa70162` · **b** none by design · **d** `1129d22e` + `6a5fea76`).

**The byte half of the pair IS formed and IS differenced** — it is load-independent and read from disk:

| | BEFORE (unit c) | AFTER (this seat) | delta |
|---|---:|---:|---:|
| eager JS gz **(GATED)** | 313,601 B | **280,811 B** | **−32,790 B** |
| eager JS raw | 979,024 B | 886,610 B | −92,414 B |
| verdict vs the untouched 286,720 B bar | RED (+26,881) | **GREEN** (5,909 under) | — |

and the **realized-vs-predicted line §8 names** is published rather than rounded away: §6 G2 predicted
a **35,461 B** gz cut; the realized cut is **32,790 B = 92.5 %** of it, landing **2,671 B above the
predicted ceiling** and **5,909 B under the BAR**. Directionally right, quantitatively 7.5 %
optimistic, cause stated (gzip's non-additivity over a re-chunked graph). §3a's *"budget still red
after the cut"* trigger did **not** fire; **no re-baseline was available, attempted or needed**, and
the bar reads `286720` in both wave-written files, byte-identical to §6's.

**This seat also WIDENED the close's own `cl-F2` rather than repeat it.** The post-cure eager JS gz now
has **four** independent readings on **zero** changed product bytes — 280,813 (unit a) · 280,811
(close · CHECK 1 · repair build 1) · **280,803** (repair build 2, taken after the §7 cadence destroyed
`dist/gh-pages` — `b-F6` confirmed a fourth time). Raw is exactly 886,610 B in all four. The close
recorded the drift as **±2 B from two samples**; **it is a 10 B band from four**, and `DELTA.md` and
`AFTER.json` publish the corrected band rather than the narrower one.

**The CWV half is NOT formed, deliberately, and that is the honest act.** CHECK 1's D-3 said the pair
could not be taken under the four-track cap; this seat reproduced the reason and did not manufacture
the pair anyway:

| sitting | host load | desktop p75 TBT | mobile-4× p75 TBT | mobile-4× p75 LCP |
|---|---|---:|---:|---:|
| unit c, **PRE-cure** | not recorded | **58 ms** | **386 ms** | 608 ms |
| close ×2 | ~19–37 | 220 / 218 ms | 616 / 529 ms | 1,136 / 780 ms |
| CHECK 1 | 19.4–40.9 | 202 ms | 786 ms | 1,080 ms |
| **repair sitting 1** | **31.3 → 52.2** | **124 ms** | **1,282 ms** | **2,028 ms** |
| **repair sitting 2** | **12.1 → 36.7** | **101 ms** | **655 ms** | **972 ms** |

On a build **32,790 B gz lighter** with **zero** changed product bytes, the desktop p75 TBT went **up**
from 58 ms and has never returned to it. Differencing those halves would publish a fiction, so
`AFTER.json` carries `pairing.cwvHalf.differenceable: false` with the measured reason, both halves are
published **whole** with their host loads, and `DELTA.md` states the non-differenceability, its cause,
and its owner. **What IS published is load-robust**: G3 **RED** on `mobile-4x-cpu` at every reading at
every load (including the **pre-cure** 386 ms), **GREEN** on desktop in all five post-cure sittings;
G4 **GREEN** on all ten post-cure legs. **Owner of the missing quiescent pair**: X-W1's pinned
`ubuntu-24.04` job (G3 pin (i)) or a dated quiescent-bench sitting — the close's **residual 7**,
carried and **not** discharged here.

**The §D producer note is authored**, 93 lines, dated, recording at the installed bytes that glass-ui
**7.0.0** already ships `settled` (`Blob.vue.d.ts:63`), `settledFrame` (`:64`) and `./blob-config`
(245 B, six exports) — **explicitly non-gating per CC-035** (*"Producer half = one dated §D letter,
never a gate"*). It is authored **in-bounds** under `evidence/W2/` because **`glass-ui` is READ-ONLY
always**; **delivery** to the BH/BI inbox is the **X formation mail seat's** act (the close's
residual 4), and this seat does **not** claim to have delivered it. Unit b's **b-F1** and **b-F2** ride
as separate rows the note names and refuses to collapse into itself — that note records the seam as
*shipped*; b-F1/b-F2 record it as *unreachable*, and they are different letters.

**Commit**: `6a5fea76` — `AFTER.json` · `DELTA.md` · `PERF-X-W2.json` · the §D note. Exactly 4 files.

### D-4 (MINOR, mitigated) — **reproduced a third time, and its one-command cure is not available to this seat**

The register's own cure text is a **mitigation**, not an act: *"the byte gates … reproduce to the byte
at every load, and EVERY mobile-4× reading at EVERY load exceeds the 300 ms bar, so G3's RED verdict is
load-robust even though its magnitude is not. **Owner already named** (residual 7 → X-W1's pin (i) /
the orchestrator's concurrency cap)."* This seat re-measured it (⟨cmd⟩ `uptime` across every run: load
averages **12.12 · 12.88 · 13.59 · 13.68 · 13.92 · 15.93 · 16.66 · 17.81 · 20.78 · 22.79 · 25.49 ·
31.27 · 32.37 · 32.55 · 35.26 · 35.76 · 36.29 · 36.70 · 43.86 · 46.63 · 52.19**) and **widened the
evidence**: the mobile-4× p75 TBT census is now **386 · 616 · 529 · 786 · 1,282 · 655 ms** and the
desktop census **58 · 220 · 218 · 202 · 124 · 101 ms**, on identical product bytes. **No act is owed
in-bounds**: pinning machine *state* means X-W1's `ubuntu-24.04` job or a quiescent bench, both outside
W2.md §4. Recorded in `AFTER.json.benchQuiescence`, in `PERF-X-W2.json.caveat` and in `DELTA.md` §2 so
that no successor reads a magnitude here as a product figure. **Not an escalation** — its owner was
already named in the close's register and nothing new is discovered; it is a carried residual.

### INFO-1 / INFO-2 — **no act owed, and none taken**

INFO-1: the gated TBT window is `[navigationStart, observationEnd]`, the **stricter** one; the strict
Lighthouse `[FCP, TTI]` window reads **0–1 ms** on both legs in both of this seat's sittings
(`p75TbtLighthouseWindow` = 1 desktop / 0 mobile in sitting 1; 0 / 0 in sitting 2), i.e. **G3 would
read GREEN under the canonical window** and the seat that built the instrument gated the harder one.
This seat **did not touch the window**, and records CHECK 1's warning intact: no successor may flip G3
GREEN by silently reverting to the strict window. INFO-2: the one discarded warm-up load per config is
still measured, logged and kept (`warmup` in both sittings' records).

### Gates re-read after the cures (every gate a cure could move, WRITE-THEN-MEASURE, double-run)

| gate | reading at REPAIR 1 | verdict | moved by this seat? |
|---|---|---|---|
| **G1** | `smin` **0 · 0 · 0 · 0 · 0 · 0** over the six eager chunks; ⟨cmd⟩ `grep -c smin dist/gh-pages/assets/*.js` → one file only (`HeroBlob-CK6WV_Kd.js:41`, and `HeroBlob-DqLA8laX.js:41` on the rebuild); `index.html` names it **0** times; source `glass-ui/blob"` → **2**, both `HeroBlob.vue`; `blob-config` → **3** | **GREEN** | no — re-read only |
| **G2** | **280,811 B** (274.2 KiB), margin **5,909 B**, instrument double-run identical excluding `generatedAt`; the enforcing spec re-run from the spec file in **both** CWV sittings → `1 passed`, `bar=286720 B → GREEN` | **GREEN** | no — re-read only |
| **G3** | mobile-4× **1,282 / 655 ms**; desktop **124 / 101 ms**; N=20 per config per sitting | **RED** (honest-RED per CHECK 1 axis 10, §11 guardrail 2) | no — **not cured, not claimed cured** |
| **G4** | **356 / 2,028 / 324 / 972 ms** against a 2,500 ms bar | **GREEN** | no — re-read only |
| **G5** | untouched at the bytes; producer-owned escalation under §3a *"Quiescence does not park"* | **RED — ESCALATED** | no — out of this repair's register |
| **G6** | second arm executed; header carries median **140.7 ms**, max-ratio **18.7×** and today's cause; dead-W7 prophecy count **0**; receipt `o5-remeasure.txt` | **GREEN by its asserted property** (the leg itself stays honestly RED; disposition is X-W1's by G6's own text) | **YES — cured** |
| **G7** | `PERF-X-W2.json` present, dated, pin verbatim; `PERF.json` diff **0 lines**, mtime unmoved | **GREEN** | **YES — cured** |
| **G8** | ⟨cmd⟩ `grep -rn "BLOB_HERO" demo/ src/ \| wc -l` → **0**; the close's tombstone stands, re-stated in the §D note with its X-W10 re-trigger | **GREEN** | no — re-read only |

**Tally after repair: 6 GREEN (G1 · G2 · G4 · G6 · G7 · G8) · 2 RED (G3 measured-RED · G5 ESCALATED).**
**0 gates moved by narrowing, 0 bars touched, 0 greps narrowed, 0 assertions weakened.**

**The §State Hard Gate is still NOT MET** — G3 and G5 are its unmet clauses, and the *"with a
before/after receipt"* clause is met on its **byte** half and published-with-its-limit on its **CWV**
half. **IMPLEMENTED is therefore still NOT stamped**: §State attaches it to *"gates green, bytes
landed"*, and the gates are not all green. Unit d's bytes **did** land, which is the half this repair
moved. **VERIFIED remains X-W11's and is untouched.**

### §7 cadence, re-run at this seat

⟨cmd⟩ `npm run typecheck` (`vue-tsc -p tsconfig.lib.json` **and** `-p tsconfig.demo.json`) → **exit 0**.
⟨cmd⟩ `npm test` (vitest) → **26 test files, 348 tests, ALL PASSED** — the close's and CHECK 1's figure
to the number, a third time.
⟨cmd⟩ `npx eslint e2e/smoke/perf/o5-boot-pacing.spec.ts scripts/perf/eager-bytes.mjs
e2e/smoke/perf/eager-payload.spec.ts --max-warnings=0` → **exit 0**.
⟨cmd⟩ `npm run lint` (repo-wide) → **exit 1, 50 problems (18 errors, 32 warnings)** — `c-F5`'s
pre-existing `docs/tranches/V/**` baseline, reproduced to the number a **fifth** time, and ⟨cmd⟩
`grep -cE "evidence/W2|PERF-X-W2|o5-boot-pacing"` over the lint output → **0**, i.e. **not one of this
seat's five new or modified paths appears in it**. Carried, not cured: a write there is an
ESCALATION-by-write.
⟨cmd⟩ `git diff --check` and `git diff --check --cached` → **clean, exit 0** both.

### Bounds, families and the index

**Every write is inside X.W2.d's §4 writable set.** `e2e/smoke/perf/o5-boot-pacing.spec.ts`
(modify-carve) · `docs/tranches/X/evidence/W2/**` (create) ·
`docs/tranches/V/megatranche/audit/telemetry/PERF-X-W2.json` (create) · `docs/tranches/X/waves/W2.md`
(the §State Status field only, exactly the §4 grant) · this record and the LEDGER (the execution
surface). **`scripts/dev/dev.sh` was never read for write and appears 0 times** — ⟨cmd⟩
`git log 1129d22e^..HEAD --name-only --format="" | sort -u | grep -c dev.sh` → **0**, and it is still
` M` and unstaged in the tree. **`docs/tranches/V/megatranche/audit/telemetry/PERF.json` was never
opened for write** (F-7). **No `src/` byte, no `api/` byte, no `vite.config.ts`, no `.github/`, no
`lighthouserc.json`, no `node_modules/@mkbabb/glass-ui/**` — and no `../glass-ui/**` byte of any kind.**

**Three commits, each pathspec-scoped on the commit itself, each carrying its `Claude-Session`
trailer, and none sweeping a sibling track's staged paths** (four tracks share this index):
`1129d22e` (2 files) · `6a5fea76` (4 files) · this record's own commit (3 files: this record,
`W2.md` §State, `LEDGER.md`). **§9's row 4 landed as row 4; row 5 landed split by MEANING, not by
family** — the receipts are one commit and the record/status/ledger are another, and no family §5 or §9
declares unsplittable was divided.

### What this repair did NOT do — stated, because a repair that reports only its wins is not a repair

1. **G3 is not cured and is not claimed cured.** §3a's *"TBT still red after the cut — halt and
   research"* remains **fired**, the triumvirate remains the orchestrator's, and this seat published a
   **worse** mobile number (1,282 ms) than the close's without touching the bar.
2. **G5 is not touched.** It is unit b's producer-owned escalation, outside this register.
3. **The CWV before/after pair is not formed**, for the measured reason above. Owner: X-W1 / a
   quiescent bench.
4. **The §D note is authored but not delivered.** Delivery is the X formation mail seat's act.
5. **b-F1 / b-F2 are not relayed** — same routing, same owner; this seat only re-stated them so the
   note could refuse to collapse them into itself.
6. **The `frames.length > 10` precondition is not adjusted**, though it fails 9 of 10 sittings.
   Adjusting it would be a narrowed assertion.
7. **`c-F5`'s repo-wide lint red is not cured** — out of bounds.
8. **IMPLEMENTED is not stamped**, because the gates are not all green.

### E13 — the four-path sweep at this seat's clock (19:58 EDT), read-only

⟨cmd⟩ `/usr/bin/find <path> -maxdepth 1 -name '*.md' -newermt '2026-09-17 19:33'` over all five paths
(the four ⊕ the atlas **Q**-lane extension): `docs/tranches/V/coordination/` → **`INBOX.md` alone**
(self-excluded, SELF-COUNT law) · `../glass-ui/docs/tranches/BK/coordination/` → **nothing** ·
`../sci-report/atlas/docs/tranches/P|Q/coordination/` → **nothing** ·
`../keyframes.js/docs/tranches/V/coordination/` → **nothing**. **0 unrowed · 0 new `I-n` · 0 new `O-n`
minted.**

**0 UNREAD in X-W2's scope.** The live `UNREAD` rows are **O-20** (an outbound sweep note, not inbound
mail), **I-30** (glass 9.0.0 pin / K-R1, the orchestrator's), **I-31** (atlas Q pass-2, whose Routing
cell already reads **FOLDED at the X-W0 close**) and **I-32 · I-33 · I-34** (Track D's, routed by their
own cells to X-W0.j / the X formation mail seat). Scope probe re-run at the letters' **current** bytes:
⟨cmd⟩ `grep -Eic "blob|settled|eager|metaball"` → I-30 **0** · I-31 **0** · I-32 **1** · I-33 **2** ·
I-34 **0**, and ⟨cmd⟩ `grep -Eio` shows **every one of the three hits is `defaultBlobColorResolver`**,
which ⟨cmd⟩ `grep -rn defaultBlobColorResolver demo/ src/ | wc -l` → **0** places nowhere in this tree.
`HeroBlob`, `blob-config` and `settled` → **0** in all five. **No row was rewritten by this seat**
(append-only).

### The act this repair takes on the ledger

The Track A `X-W2` status cell is **NOT moved to CLOSED** — the wave remains **PARTIAL**, because G3
and G5 are unmet Hard-Gate clauses and IMPLEMENTED is unstamped. The cell's existing text is left
standing and the repair's outcome is **appended** to it; a dated event line is appended to the
append-only §Event log. Nothing else in the ledger is touched.

---

## Check 2

**FRESH ADVERSARIAL CHECK (L-20, pass 2) — VERIFY-ONLY.** **SERVED MODEL**: `claude-opus-5[1m]`.
**Seat clock**: 2026-09-17, **20:05–20:2x EDT**. Branch `tranche-u`, HEAD at check `111f75eb`.
This seat **authored none of this wave's bytes** — not seat 0's, not unit c's, a's, b's or d's, not
the close seat's, not CHECK 1's, not REPAIR 1's. It cured nothing, moved no gate, touched no bar,
narrowed no grep and edited no prior receipt. Every figure below is this seat's **own** measurement,
taken from the gate's **own** command over its **own** fresh `npm run gh-pages`, double-run where the
measurement admits it.

### VERDICT — **CONFORMANT-HONEST-RED** · honest-RED set **{G3 · G5}** · 0 BLOCKER/CRITICAL/HIGH · 2 MINOR (mitigated) · 1 INFO

**All eight §6 gate verdicts reproduce** (6 GREEN · 2 RED) and **all six claimed GREENs reproduce at
this seat's own commands**. Bounds · masking · commit families · E-3 · mail · the four-verb line are
clean, and the §2a goal criterion is met on its own operative clause at the bytes. CHECK 1's two
HIGHs (**D-1 G6**, **D-2 G7**) are **cured at the bytes** and its MEDIUM (**D-3**, §8 2-of-7) is
**cured to 7 of 7** with its one unformable half published-with-its-limit rather than manufactured.
The two surviving REDs are each **relieved by the spec's own relief and owner-named in the register**.

### Axis 1 — every gate, re-run at this seat's own command

| gate | the record's claim | **this seat's independent reading** | reproduces? |
|---|---|---|---|
| **G1** barrel absent from the eager set | GREEN by the import graph; `smin` 0 across all six eager chunks | ⟨cmd⟩ a loop of `grep -o` for **all three** tokens over **each of the six eager chunks the instrument itself enumerates** → `smin` **0 · 0 · 0 · 0 · 0 · 0**. ⟨cmd⟩ `grep -c smin dist/gh-pages/assets/*.js` over **every** emitted JS → **one file only, `HeroBlob-DqLA8laX.js:41`** (94,593 B). ⟨cmd⟩ `grep -o 'HeroBlob-[A-Za-z0-9_-]*' index.html \| sort -u \| wc -l` → **0**: neither entry nor `modulepreload`. Source: ⟨cmd⟩ `grep -rn 'glass-ui/blob"' demo/` → **2 lines, both `HeroBlob.vue` (:34, :35)**; `blob-config` → **3** | **YES** |
| **G2** eager JS gz ≤ 286,720 B | GREEN 280,811 B within a measured 10 B build band | ⟨cmd⟩ `node scripts/perf/eager-bytes.mjs` ×2 on one fresh build → **`eager JS raw= 886610  gz= 280803 = 274.2 KiB (bar 286720 B) -> GREEN`**, 6 modules, margin **5,917 B**; the two JSON records `diff` **identical except `generatedAt`** (compared programmatically). `raw` is **886,610 exactly**, the wave's figure at every seat. My gz is **280,803** — the *exact* value REPAIR 1 published as build 2 of its four-build band, so the band is confirmed by a **fifth** independent build. Enforcing gate re-run from the spec file: ⟨cmd⟩ `npx playwright test --project=smoke-perf … eager-payload.spec.ts` → **`✓ [X-W2 G2] … gz=280803 (274.2 KiB) bar=286720 B → GREEN`, 1 passed**. **The bar reads `286720` in `eager-bytes.mjs:58` and `eager-payload.spec.ts:82`, byte-identical to §6's** | **YES** |
| **G3** p75 TBT ≤ 300 ms, N≥20 | RED (mobile-4× 1,282 / 655 ms) | **N=20 per config at this seat, host load 54–65**: `desktop-unthrottled` **223 ms** (GREEN) · `mobile-4x-cpu` **1,137 ms** (**RED**). A **seventh** independent reading above the bar: 386 · 616 · 529 · 786 · 1,282 · 655 · **1,137**. Exactly **one** soft failure in the run, and it is this leg | **YES — RED** |
| **G4** p75 LCP ≤ 2500 ms, N≥20 | GREEN on all ten post-cure legs | **same run, same pin**: desktop **772 ms** · mobile-4× **2,484 ms** — **GREEN on both** against the 2,500 ms bar. The pin the spec **computes** reproduced verbatim: `macOS 26.4.1 (25E253) · Apple M5 Max · node v26.0.0 · @playwright/test 1.60.0 · Chromium headless (SwiftShader) · serve-built.mjs :8091`. The carried Q14 **5,141 CI / ~4,919 local** are **again not reproduced** | **YES** (see MINOR-1: the mobile leg's margin is **16 ms** at this load) |
| **G5** wall-clock park → `settled` | RED — ESCALATED, unchanged at the bytes | ⟨cmd⟩ `grep -rn "BLOB_IDLE_MS\|SLEEPY_POSE_MS" demo/ e2e/ \| wc -l` → **26**, ⟨cmd⟩ `grep -rln … \| wc -l` → **5** — unchanged to the number. Producer side reproduced at the installed bytes: ⟨cmd⟩ `sed -n '1399p' node_modules/@mkbabb/glass-ui/dist/blob.js` → `h = () => e.mood.isSettled() && e.pointer.isAtRest() && e.satellites.isQuiescent()`, and ⟨cmd⟩ `grep -n settled …/Blob.vue.d.ts` → `63: settled` · `64: settledFrame` | **YES — RED** |
| **G6** the o5 spike leg tells today's truth | GREEN by its **second** arm | ⟨cmd⟩ `grep -c "payload cure is W7's\|Re-measure at the W7 adopt" e2e/smoke/perf/o5-boot-pacing.spec.ts` → **0** — the forbidden third state is gone from the tree. The header carries today's **median 140.7 ms · max 2,625.0 ms = 18.7× · dropped 25.0 %** and today's **cause** (a ~2.5 s presentation-side rAF/BeginFrame stall holding **zero** long tasks, 4 of 4 probes), with `test.fail()`'s disposition routed to X-W1 (CC-031) **by G6's own text**. **Nothing narrowed**: ⟨cmd⟩ `grep -n "SPIKE_RATIO = \|DROP_RATIO = \|DROP_FRACTION_MAX = \|toBeGreaterThan(10)"` → `69:3` · `70:2` · `71:0.1` · `90:>10`, byte-unchanged. Receipt `o5-remeasure.txt` present (9,192 B) carrying the **verbatim `[O-5]` console line** at `:57` | **YES** |
| **G7** the telemetry successor | GREEN | ⟨cmd⟩ `ls -la docs/tranches/V/megatranche/audit/telemetry/` → **`PERF-X-W2.json` 7,489 B present**, dated, pin **byte-identical to BEFORE/AFTER** (compared programmatically), beside `PERF.json` **still at its Jul 24 14:21 mtime**. **F-7 intact**: ⟨cmd⟩ `git diff --stat a8d9af99..HEAD -- …/PERF.json` → **0 lines** | **YES** |
| **G8** `BLOB_HERO` consumed or tombstoned | GREEN by the tombstone arm | ⟨cmd⟩ `grep -rn "BLOB_HERO" demo/ src/ \| wc -l` → **0**; the one-line tombstone with its two measured disqualifiers and its X-W10 re-trigger is carried **verbatim in §Close**, where G8's asserted property says it lives | **YES** |

**Gate verdicts reproduced: 8 of 8. Claimed GREENs that failed to reproduce: 0.**

### Axis 2 — bounds · Axis 4 — families · Axis 5 — E-3

- **14 X-W2 commits, 15 distinct paths, every one in bounds.** ⟨cmd⟩ `git show --name-only --format="" <each of fc7489d5 188870c2 eaa70162 33de6349 4ca55e5d 13f4ddc2 48d921e4 6c783f39 91dc6e56 1174dfdc 57a65fc6 1129d22e 6a5fea76 111f75eb> | sort -u` → the two §4 product files · the two created instruments · `o5-boot-pacing.spec.ts` · the five `evidence/W2/**` artefacts · `PERF-X-W2.json` · `W2.md` · the record · `LEDGER.md` · `INBOX.md`. The last three are the runbook §1.1 / §5.3 execution-and-mail surface; **everything else is literally §4's writable set**. No `src/`, no `api/`, no `.github/`, no `lighthouserc.json`, no `vite.config.ts`, no `usePaneRouter.ts`, no `node_modules/`, no `../glass-ui/**`.
- **`scripts/dev/dev.sh` appears 0 times** — ⟨cmd⟩ the same union `| grep -c dev.sh` → **0**, and it is still ` M` and unstaged in the tree at this seat.
- **The modify-carve holds to the line.** ⟨cmd⟩ `git show --stat 13f4ddc2` → `useAtmosphere.ts | 2 +-` · `BlobPane.vue | 4 ++--` = **2 files, 3 insertions, 3 deletions**, each a bare specifier swap.
- **Families not split.** §9 row 1 = **3 files in ONE commit** (the declared unsplittable instrument family) · row 2 = **2 files in one** · row 3 landed as **nothing rather than half** (§5's *"commit 3 is ONE commit and must not split"*, honoured by an escalating unit) · row 4 = `1129d22e` (2 files) · row 5 split **by meaning** — receipts (`6a5fea76`, 4 files) and record+status+ledger (`111f75eb`, 3 files) — and **no family §5 or §9 declares unsplittable was divided**.
- **E-3 held, and the sibling noise is named so the range is not misread.** ⟨cmd⟩ `git diff --stat a8d9af99..HEAD -- docs/tranches/V/megatranche/registry/ docs/tranches/X/COHESION.md docs/tranches/X/waves/` lists 16 `registry/adjudicated/kf-*.md`, `COHESION.md` and `W2.md`. **Not one of those 16 + COHESION is in ANY X-W2 commit** (the union above) — they are Track B's and the orchestrator's, landed in the same range. **X-W2's only spec-path write is `W2.md`, and it is one line, twice: the §State `Status` field** — exactly §4's grant (⟨cmd⟩ `git show 91dc6e56 -- …/W2.md` and `git show 111f75eb -- …/W2.md` → `@@ -6,7 +6,7 @@`, the `**Status**:` line alone, both times). **No §6 byte was edited**; the four corrections ride as dated addenda-beside. `PERF.json` **0-line diff**.

### Axis 3 — masking fallbacks: **none found**

The whole product/spec diff was scanned line-by-line — ⟨cmd⟩ `git diff a8d9af99..HEAD -- demo/ e2e/ scripts/perf/ | grep '^+' | grep -inE "skip|fixme|try *\{|catch|ignore|disable|allowlist|timeout: *[0-9]{5,}|\.only\(|node_modules"` — and every hit was opened:

1. **No `catch` exists in either spec file.** The `try` at `eager-payload.spec.ts:176` closes at `:275` with **`} finally {`** — browser-context cleanup, not an error swallow.
2. **The instrument's one `try`/`catch`** (`eager-bytes.mjs:288–295`) is the CLI boundary; the collector **throws** at `:127` and `:199` on a missing artifact or a dangling index reference, so it cannot go green by measuring nothing — and the spec asserts `eagerJs.count > 0` and an entry-module `> 0` besides.
3. **`skippedRemoteRefs` is a report, not an allowlist**: ⟨cmd⟩ at this seat it is **`[]`**, as is `duplicateRefs`; the single `excludedCss` row is the `media="print"` async swap, **published with its bytes** (132,943 / 100,417) rather than dropped.
4. **The TBT window is WIDENED, not narrowed** — this seat's own N=20 reads `p75 TBT[FCP,end]` = **0 ms** desktop / **2 ms** mobile-4×, i.e. **G3 would be GREEN on both legs under Lighthouse's canonical window** and the implementing seat gated the harder one and published the softer beside it. That is the opposite of masking; see INFO-1.
5. **No `test.skip`, no `.only`, no added `test.fail()`** (o5's marker is **born-RED, pre-existing**, and its four bars are byte-unchanged), **no copied producer selector, no patched `node_modules`, no silently narrowed assertion, no raised timeout hiding a red.** `expect.soft` accumulates verdicts and softens nothing — this seat's run exited **1 failed** on exactly the mobile TBT leg.

### Axis 6 — mail · Axis 7 — the four-verb line · Axis 9 — published figures

- **Mail: 0 UNREAD in X-W2's scope, probed independently at the letters' current bytes.** The six live `UNREAD` rows are **O-20** (outbound), **I-30**, **I-31**, **I-32**, **I-33**, **I-34**. ⟨cmd⟩ `grep -Eic "blob|settled|eager|metaball"` over all five referenced letters → **0 · 0 · 1 · 2 · 0**, and ⟨cmd⟩ `grep -Eio` shows **every one of the three hits is `defaultBlobColorResolver`**, which ⟨cmd⟩ `grep -rn defaultBlobColorResolver demo/ src/ | wc -l` → **0** places nowhere in this tree. `HeroBlob` and `blob-config` → **0** in all five. No row was rewritten by this seat.
- **The four-verb line moved lawfully — by NOT moving.** §State attaches IMPLEMENTED to *"gates green, bytes landed"*; the gates are **6/2**, so `IMPLEMENTED: no.` stands and only the `Status` field moved. **VERIFIED is untouched and remains X-W11's.** Stamping either here would be §11's own archaeology repeating; the wave declined, twice.
- **Published figures reproduce.** `raw` **886,610 B exactly** · gz **280,803 B**, the *exact* fifth confirmation of REPAIR 1's four-build 10 B band (280,803–280,813) — and the record publishes the **wider** band from four samples rather than the close's narrower two, which is the correction running the right way. Pin **verbatim** in `BEFORE.json`, `AFTER.json` and `PERF-X-W2.json` (compared programmatically, not by eye). CLS **0.0193** desktop / **0.0000** mobile, the §6 pilot exactly. ⟨cmd⟩ `npm test` → **26 files, 348 tests, ALL PASSED**, to the number a fourth time. ⟨cmd⟩ `npm run typecheck` → **exit 0**. ⟨cmd⟩ `npx eslint` over **all five** wave-written code paths `--max-warnings=0` → **exit 0**. ⟨cmd⟩ `npm run lint` repo-wide → **exit 1, 50 problems (18 errors, 32 warnings)**, **30 files, 100 % under `docs/tranches/V/`** (⟨cmd⟩ `grep -vc '^docs/tranches/V/'` → **0**) and **0** of this wave's paths in it — `c-F5` reproduced a **sixth** time, still out of bounds. ⟨cmd⟩ `git diff --check` / `--cached` → **clean**.
- **§8 is 7 of 7, self-counted here**: `BEFORE.json` 34,020 B · `AFTER.json` 70,335 B · `DELTA.md` 10,089 B · `o5-remeasure.txt` 9,192 B · `PERF-X-W2.json` 7,489 B · the dated §D note 6,909 B · unit hashes (**a** `13f4ddc2` · **c** `eaa70162` · **b** none by design · **d** `1129d22e` + `6a5fea76`). All five evidence files are **tracked** (⟨cmd⟩ `git ls-files docs/tranches/X/evidence/W2/` → 5 rows — CC-012 honoured), and each carries its `SERVED MODEL` receipt, the three JSON artefacts as the object's first key per the `bench-baseline.json` precedent.

### Axis 8 — the spec's own goal criterion (§2a), at the bytes

> *"…the boot path of the built demo no longer pays for the WebGL2 metaball engine it does not use at
> boot, **and** … the boot cost is thereafter a measured number with a named environment rather than
> an escalation. The four-close Q14 chronic ends **because the gate becomes executable by one agent at
> one bench** — not because the number improved."*

**MET at the bytes, on the criterion's own operative clause, verified by this seat doing the thing.**
The engine is out of the eager graph by an import-graph fact this seat re-derived from the
instrument's own module list (`smin` 0 × 6; the barrel alone in a chunk `index.html` names **0** times)
and the eager set is **32,790 B gz lighter under a bar no seat edited**. The boot cost is now a
measured number with a named environment: this seat ran it **from the shell** (`node
scripts/perf/eager-bytes.mjs`) **and from the spec file** (`npx playwright test --project=smoke-perf`),
at one bench, alone, with the pin **computed** rather than typed. That is precisely what §2a defines
as the chronic's end. The clause *"rather than an escalation"* is **not** fully discharged — G3 is
still an escalation — but §11 guardrail 2 authors that exact outcome in advance (*"G2/G3 pass or the
wave closes `complete_with_misses` with the measured number"*), the number is published, and the wave
refuses the IMPLEMENTED stamp. **No relief is being invented here: the shortfall IS the honest-RED
already registered as G3, not a second, hidden one.**

### Axis 10 — HONEST-RED ADJUDICATION, gate by gate

**RELIEVED — the honest-RED set (2): G3 · G5. Nothing else is RED.**

- **G5 — RELIEVED on TWO independent grounds: producer-owned, and named by the spec's own relief arm.**
  §3a spells it verbatim: *"**Quiescence does not park.** If `settled` never goes true within the
  fixture window on the software-GL renderer, triumvirate. Do **not** restore the wall clock; a
  wall-clock park is the disease."* Unit b met that trigger literally (5 runs / 2 instruments /
  45–75 s windows against the **built** origin, PRM excluded by measurement, cause isolated by a
  reverted `HERO_FISSION_AMP = 0` counterfactual) and the root cause is **inside the producer** —
  reproduced at this seat's own read of the installed bytes, `blob.js:1399`'s three-conjunct predicate
  and the colony arithmetic that makes `isQuiescent()` unreachable (merge chain 6,000–8,000 ms against
  a 5,490 ms gating cooldown). **`glass-ui` is READ-ONLY always**, and every cure shape unit b names is
  a producer byte — *"none of them is a value.js byte."* A consumer-side green would be the substitute
  trigger §3a forbids, i.e. a masking fallback. The landed tree keeps the original wall clock **because
  it was never removed**, and this seat measured that (**26 / 5**, unchanged). **Owners named**: close
  residual 1 → the X orchestrator's **mandatory triumvirate** (§3a forbids redispatching unit b alone);
  residual 4 → **b-F1 / b-F2 to the glass-ui BH/BI relay**; residual 5 → b-F5 (PRM) to the same
  triumvirate. **HONEST-RED.**
- **G3 — RELIEVED by §11 guardrail 2, which names this disposition in the spec's own words.**
  *"There is no `escalate` arm — G2/G3 pass or the wave closes `complete_with_misses` with the measured
  number."* The number is published at every sitting (386 · 616 · 529 · 786 · 1,282 · 655 · **1,137**
  here), the bar is **byte-identical to wave-open in both wave-written files**, and §3a's *"TBT still
  red after the cut … halt and research"* is the spec's own routing of the next act — which the wave
  performed by halting, not by curing. **This is not a re-baseline**: S.W3's failure mode is the one
  thing §11 forbids and no seat came near it. **Owners named**: close residuals 2 and 7 → the X
  orchestrator, at a **quiescent bench** or on **X-W1's pinned `ubuntu-24.04` job (G3 pin (i))**.
  **HONEST-RED.**

**FORMERLY UNRELIEVED, NOW CURED (2): G6 · G7.** CHECK 1's D-1 and D-2 convicted these because their
cure sat inside this wave's own never-dispatched unit **d**. REPAIR 1 dispatched it. Both are GREEN at
this seat's own commands, by their **asserted properties** and not by a narrowed one: G6's header
carries today's numbers and today's diagnosed cause with all four bars byte-unchanged and the dead-W7
prophecy at **0** occurrences; G7's successor exists, dated and pinned, with `PERF.json` untouched to
the mtime. **The register's two HIGHs are discharged at the bytes.**

### The defect register

| id | severity | claim | receipt | cure |
|---|---|---|---|---|
| **MINOR-1** (mitigated) | **MINOR** | **G4's mobile-4× leg reproduces GREEN by 16 ms.** At this seat's host load the p75 LCP reads **2,484 ms** against the 2,500 ms bar — GREEN, but the margin is a function of bench state that G3's pin (ii) does not pin (it records machine *identity*, never machine *quiescence*). A reader must not take G4's GREEN as a wide one | ⟨cmd⟩ `uptime` across this seat's run → load averages **34.74 · 65.62 · 62.97 · 54.20**, with the owner's four-workflow cap running. ⟨cmd⟩ the run's own line: `[X-W2 CWV mobile-4x-cpu] N=20 p75 LCP=2484ms`. The post-cure mobile census is now **1,136 · 780 · 1,080 · 2,028 · 972 · 2,484 ms** — **GREEN at all six**, and the spread is 3.2× on **zero** changed product bytes | **Mitigation, and why it does not block**: the verdict reproduces GREEN at every post-cure sitting including this saturated one, and the owner is **already named** — close residual 7 → **X-W1's pin (i)** / the orchestrator's concurrency cap, the same owner `cl-F1` and CHECK 1's **D-4** carry. This seat adds only that the fragility now touches **G4** and not merely G3's magnitude, and says so rather than letting a 16 ms margin read as comfort |
| **MINOR-2** (mitigated) | **MINOR** | **The §D producer note and the two producer rows carry no outbound `O-n` row in `INBOX.md`**, so the relay obligation lives only in the record's residual register and not on the durable mail ledger E13 names | ⟨cmd⟩ `grep -n "PRODUCER-NOTE\|§D producer" docs/tranches/V/coordination/INBOX.md` → **no row**; `6a5fea76` landed the note under `evidence/W2/` and touched no `INBOX.md` byte. The note itself is real and dated (6,909 B, glass 7.0.0's `settled` / `settledFrame` / `./blob-config` recorded at the installed bytes) | **Mitigation, and why it does not block**: **CC-035 declares this letter explicitly non-gating** (*"Producer half = one dated §D letter, **never a gate**"*), **`glass-ui` is READ-ONLY always** so physical delivery is not this wave's act to take, and the record names the owner three times — close residual 4 (**the X formation mail seat**) and REPAIR 1's own *"did NOT do"* items **4** and **5**. The obligation is stated, not hidden; rowing it outbound is the mail seat's act and is recommended, not owed by this wave |
| **INFO-1** | INFO | The gated TBT window is `[navigationStart, observationEnd]`, not Lighthouse's `[FCP, TTI]` against which `lighthouserc.json`'s 300 ms bar is defined | This seat's own N=20: `p75 TBT[FCP,end]` = **0 ms** desktop / **2 ms** mobile-4× — **G3 would read GREEN on both legs under the canonical window**. The substitution is declared in the spec file, in `BEFORE.json`/`AFTER.json`'s `windowRuling`, in the close and in CHECK 1 | **No act owed** — the seat gated the **stricter** window and published the softer one beside it every run. CHECK 1's warning is **re-affirmed and carried**: no successor may flip G3 GREEN by silently reverting to the strict window; that would be the narrowed assertion these checks exist to catch |

### What this check does NOT find

Stated because a check that finds only what it looked for is not a check. **No** write outside §4 ·
**no** `scripts/dev/dev.sh` byte in any of the 14 commits · **no** split family · **no** re-baselined
bar (`286720` byte-identical in both wave-written files and in §6) · **no** narrowed grep — this seat
re-ran the token census **widened** to all three tokens over all six chunks and traced **every**
residual to its producing module by reading the bytes around it: the three `metaball` hits are
`@mkbabb/glass-ui/aurora`'s GLSL **comments** (*"(mirrors metaball.frag.ts:252-255)"* ×2,
*"(mirrors metaball.frag.ts:278)"*) and the three `satellite` hits are
`BLOB_CONFIG_DEFAULTS`' own field names (`satelliteCount:3, satelliteRadius:.082`), which §6 G2's
prediction line budgets eager in so many words · **no** patched `node_modules` · **no** sibling-tree
write · **no** dev-server number (MT-F011 is enforced structurally by `builtOrigin()`, which **fails
the test** unless the port is `serve-built.mjs`'s, and `playwright.config.ts:225-231` binds
`smoke-perf` to that origin) · **no** UNREAD mail in scope · **no** false IMPLEMENTED or VERIFIED
stamp · **no** prior receipt edited by REPAIR 1 (§Baseline, §Unit receipts, §Close and §Check 1 are
byte-untouched above this line).

### Successor readiness — the "Opens after" conjuncts, stated

- **X-W5** (`W5.md:6`) opens after **X-W4** · **X-W2** · X-W0's track-or-archive act.
  **The X-W2 conjunct is GREEN.** Runbook §1.1's edge reads *"Boot cost is measured before shell
  composition rewrites it; **W2's `AFTER.json` is non-terminal until W5's A1/A2 land**"* — the boot
  cost **is** measured (instrument + computed pin + six N=20 sittings) **and `AFTER.json` now exists**,
  tracked at `6a5fea76`, written explicitly non-terminal exactly as the edge requires. CHECK 1's
  blocking finding on this conjunct is **discharged**. **X-W0's conjunct is GREEN** (ledger: CLOSED).
  **X-W4 is `planned`**, so **X-W5 remains lawfully blocked — on X-W4 alone, no longer on X-W2.**
- **X-W11** (`W11.md:6`) opens after *"X-W0 … X-W10 are **IMPLEMENTED**"*. **X-W2 is not IMPLEMENTED**
  and this wave twice, deliberately, declined the stamp. **X-W11 is lawfully blocked by this wave**,
  exactly as §10 wrote it (*"CC-035 and CC-036 cannot reach VERIFIED in the release table without this
  wave's receipts"*) — and the two clauses standing between X-W2 and IMPLEMENTED are the honest-RED
  pair **G3 · G5**, both owner-named above.

### The act this check takes

Per the bar — **zero BLOCKER/CRITICAL/HIGH, every claimed GREEN reproduced, and every remaining RED
relieved under axis 10 and owner-named** — the LEDGER Track A `X-W2` status cell moves to
**CLOSED 2026-09-17 (honest-RED: G3 · G5)** by minimal in-place replacement of its leading status
token, the CHECK 2 outcome is appended to the same cell, and a dated event line is appended to the
append-only §Event log. **The wave is CLOSED, not IMPLEMENTED**: closing the wave's ledger row records
that its execution and adjudication are complete; the four-verb `IMPLEMENTED` stamp stays unmoved
because §State's condition (*"gates green, bytes landed"*) is unmet at G3 and G5, and **VERIFIED
remains X-W11's**. Nothing else in the ledger is touched; no gate, bar, grep, spec byte or prior
receipt was moved by this seat.
