SERVED MODEL: claude-opus-5[1m]

# X-W1 — EXECUTION RECORD (Track A · X·V) — Re-gate: CI, visual oracle, boot-smoke, deploy truth, landing

**Seat 0 (OPEN)**, 2026-09-17, on the owner's begin-word (COHESION §0j, quoted there verbatim).
Authorities read WHOLE before any byte: `waves/W1.md` (412 L) · `refinement/X-W1-FOLD.md` (1,527 L —
**the reading rule at its §0: W1.md PLUS this addendum, in that order; where they disagree the
addendum governs, and §BoundsDelta is read BEFORE the worktree plan**) · `EXECUTION-RUNBOOK.md`
§1.1 · §2.1 · §3.4 · §5 · `COHESION.md` §0i, §0j, §0k (both), §0l — read to the file end ·
`execution/LEDGER.md`. E-3 throughout: no dated spec, no adjudicated registry byte and no prior
evidence file is edited by this seat; this record and the ledger's own row cells are its sole writes.

---

## Open

### Preconditions, each with its receipt

| # | condition (source) | verdict | receipt |
|---|---|---|---|
| P1 | **X-W0 closes** (`W1.md:6` *Opens after*) | **MET** | `execution/LEDGER.md` Track A row: *"**CLOSED 2026-09-17 (honest-RED: HG-8's literal byte-diff clause — ESC-N1)**"* — X-W0.m's fresh VERIFY-ONLY check, **18/18 hard + 8/8 fold GREEN** at its own clock; close `1246f859`, check-3 `d5ac877c` |
| P2 | **CC-012 track-or-archive** — the evidence trees this wave writes into must be tracked (`W1.md:369-372`) | **MET** | `docs/tranches/X/W0/TRACK-OR-ARCHIVE.md` present; ⟨`grep -n 'oracle slate' docs/tranches/X/W0/TRACK-OR-ARCHIVE.md`⟩ → `:137 **Receiving seat, named once.** X-W1's oracle slate is scripts/ci/oracle-slate.mjs, created at **X.W1.a**` — the runbook §1.1 edge (*"the oracle slate … is handed from W0's registers"*) is discharged at the bytes |
| P3 | **CC-025 completeness cure** — no `264/264` in any gate here (`W1.md:371`) | **MET** | landed at X-W0.c (`58be3626` · `549353fd`, ledger event log). ⟨`grep -c '264/264' waves/W1.md refinement/X-W1-FOLD.md`⟩ → `1` and `1` — **both hits are the prohibition sentence itself** (`W1.md:371`, fold `:1003`), zero gate cells |
| P4 | **CC-021 / DR-24 `scripts/dev/dev.sh`** ruled (`W1.md:168-170`) | **MET** | COHESION §0j.A: *"RETIRED-BY-ASSIGNMENT with the NEVER-touch posture made PERMANENT for tranche X"*. ⟨`git status --porcelain`⟩ shows it dirty and **unstaged**; no seat of this wave touches or stages it |
| P5 | **§0j.F(3)** — `.github/workflows/release.yml` joins X-W1's bounds by dated E-3 addendum; the two `ci(release)` hardening commits ride in | **CONSUMED** | COHESION §0j.F(3), verbatim. Assigned to **unit d** as its first commit (see WO-4) |
| P6 | **§0k.1 RS-1** — DR-14's `siblingFsAllowTransient` DELETE rides **X-W5**'s `vite.config.ts` carve; *"X-W1 owes nothing"* | **CONSUMED** | COHESION §0k.1 RS-1 — §0j.A's X-W1 routing is corrected there; `vite.config.ts` is **not** in this wave's bounds and no unit opens it |
| P7 | **§0k.1** — the two dangling e2e fixture imports of `demo/@/lib/palette/types` → X-W1 (owns `e2e/`) | **CONSUMED** | COHESION §0k.1 final bullet; executed by **unit a** as the G-1 root cure |
| P8 | No product dependency on any other X wave (`W1.md:20-25`, `:372`) | **MET** | X-W2..X-W11 all `planned`; nothing here waits on Glass 8, the parser cut, or the scene chain |

**Not a precondition, recorded so it is not mistaken for one:** X-W0.j's Glass-8 repin (election
**8.0.0**, §0i.2) and its receiving cut X-W4.g are **not** X-W1's act. Unit d installs the *declared*
range (`package.json:83` `^7.0.0`) from the registry; NG-16's o7 re-pin is booked **scheduled-RED**
and goes live **at** the repin (fold R55 SEQUENCING · cross-edge 14), never before.

### E13 Step-0 — the four-path mail sweep (§5.3)

Swept read-only at this seat's clock, compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **status cell**:

| path | newest | result |
|---|---|---|
| `docs/tranches/V/` + `docs/tranches/V/coordination/` | `value-inbox-2026-09-17-o8-o11-amendment-addendum.md` (ours, outbound copy) | 0 unrowed |
| `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir** (⟨`ls -d ../glass-ui/docs/tranches/*/`⟩ → 45 dirs, BK the maximum; BJ, BI, BH older) | three letters of 2026-09-17 17:13–17:15 | **already ROWED** as **I-32 · I-33 · I-34 (UNREAD 2026-09-17)** by Track D's X.P.W2 seat 0 minutes before this sweep (`INBOX.md:105-107`; ledger event log tail) — **0 left unrowed** |
| `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` (our own outbound, mirrored) | 0 unrowed |
| `../sci-report/atlas/docs/tranches/P/coordination/` | 2026-08-03 batch | 0 unrowed |

**Result: 0 unrowed · 0 new `I-n` minted by this seat · 0 UNREAD *in X-W1's scope*.** I-32 is the
only value.js-addressed letter of the three (⟨`head -3 …-valuejs-o20-disposition.md`⟩ → *"**To**:
value.js (X formation mail seat)"*). Its rows were read at the bytes: §A A-1..A-11a, §B B-1..B-7, §C
C-1, §D — **every one lands on producer bytes, on `demo/` product source, or on the bump (X-W0.j /
X-W4.g / X-W7)**; not one names `.github/workflows/**`, `e2e/**`, `test/**` or `scripts/ci/**`. I-33
is addressed to the constellation (§§1–8 = fourier, keyframes, slides, speedtest, atlas, sci-report,
muster, words — **no value.js section**); I-34 to bbnf-lang (its `./search` removal cross-cites
value.js's demo tree — the same four sites §0i.5 budgets at X-EXT-1, re-measured here: ⟨`grep -rln
'glass-ui/search' demo/`⟩ → 4 files). E13's close condition for this wave is therefore satisfiable;
the three rows stay UNREAD under their own routing and are the mail seat's / X-W0.j's, not X-W1's.

**Two standing items carried, neither X-W1's to discharge:** (i) **K-R1** — I-30's banked digest is
stale (the letter's bytes were amended in place at glass `81f7db0d`); filed by Track D to the
orchestrator. (ii) **The npm wall has fallen** — ⟨`npm view @mkbabb/glass-ui version`⟩ → **9.0.0**
(was: absent from the registry at §0i's frontier reading). That is §0i.2's *named re-trigger* for
X-W0.j's census and belongs to the sitting/orchestrator; it changes nothing in X-W1, whose unit d
resolves the declared `^7.0.0` (9.0.0 does not satisfy `^7`).

### Wave-open rulings, minuted (each one the fold or a spec defers to wave-open; none is owner-gated)

- **WO-1 · the `test/` STRIKE — ADOPTED.** Fold §3 strikes `test/` from W1.md's Do-NOT-touch list
  and replaces it with a carve (*create and modify-carve for the unit oracles this addendum names;
  no existing assertion is weakened or deleted except under R2's dead-reference rule with a written
  rationale*). The fold governs where it disagrees with W1.md (fold §0 reading rule); W1.md's bytes
  stand. Refusal would send R5+R6+R10+R11+R12+R21+R22+R23+R24+R33+R45+R53 to the formation boundary
  **as one packet** (fold §6.4a: twelve under predicate B) — the carry pathology this tranche exists
  to kill.
- **WO-2 · R6 (the vitest SFC-mount harness) — ADOPT.** The fold left this an *explicit
  adopt-or-decline at wave-open, minuted either way; a silent adoption is the M-25 defect*. Adopted
  because: (i) the cure is a `plugins` key in `vitest.config.ts` + a devDependency already installed
  and unused (`@vue/test-utils@^2.4.10`, **0 call sites**), not product source — W1.md's Triumvirate
  trigger (a write under `src/`/`demo/`/`api/`) does **not** fire; (ii) `vitest.config.ts` is bounds
  entry 34 and `test/**` is open under WO-1, so the surface is already W1's; (iii) every mounted
  oracle in NG-4/NG-9/NG-10 travels with a decline. **The dissent is preserved verbatim, not
  overruled**: PaletteSlugBar **A-9** — *"nearest home X-W1's gate re-authoring, whose written scope
  does not cover vitest SFC capability."* Riders bound with the adoption: **R7** (any component-mount
  gate stub-strips `Transition` or runs a real browser) and **R53**'s mountability lock (two hard
  `inject(...)!` assertions ⇒ the oracle supplies both injections or is a pure-function seam test; a
  gate that wraps the SFC in `ColorPicker` to make it mount has tested the parent).
- **WO-3 · G-21's standing deploy-age check is a job *in* `ci.yml`, not a new script.** §File Bounds
  admits exactly two `scripts/ci/*` creates (`boot-smoke.mjs`, `oracle-slate.mjs`); a third path
  would be a write outside bounds = ESCALATION. X.W1.a wires the job (inline `gh`/API comparison of
  the newest `deploy-pages` success against the newest close date); X.W1.e falsifies it by
  back-dating the comparison input (G-21's own falsifier). W1.md:276's *"a job X.W1.a wires from
  this unit's script contract"* is honoured with the contract stated in `W1-LOG.md`.
- **WO-4 · §0j.F(3)'s *"the cherry-pick is X-W1's first commit"*, read at its purpose.** The two
  `ci(release)` commits (`e2652f1c` · `44ddaff7`, 1 file) ride into `tranche-u` as **unit d's FIRST
  commit**, which precedes both X-W9's cut and X.W1.e's merge — the ordering the ruling exists to
  secure. Unit d is dispatched in group 2 because its own §X.W1.d mechanism *"run X.W1.c's
  prod-preview gate"* requires unit c's artifact to exist (and G-13/G-16 must run on **one** commit).
  If the orchestrator wants the literal first-commit-of-the-wave, it may hoist d's cherry-pick commit
  ahead of group 1; nothing else in the plan moves. Recorded, not re-ruled (E-3).
- **WO-5 · the two MEASURE-AT-OPEN baselines stay with the units the spec assigns them.** **G-3**:
  *"The first act of X.W1.a is to run it and commit the number"* (`W1.md:123-125`). **G-13**: the
  prod-preview mount state is unit c's first act, *before any cure* — this seat does not run
  `npm run gh-pages` at open because that build **replaces the untracked `dist/`** that `test/**`
  binds to (fold R11: `npm test` has no build hook and nothing refreshes `dist/`), and other Track A
  seats read it. Both are banked below as MEASURE-AT-OPEN, not fabricated.
- **WO-6 · the four ⚠ cross-wave paths.** `e2e/smoke/views/gradient.spec.ts` (W4 `modify` + W6
  `ADD-never-replace`), `e2e/smoke/walk.spec.ts` and `e2e/smoke/mobile/walk.spec.ts` (W5
  `modify-carve`) are written by X-W1 **first** — W5/W6/W7 are all `planned`, so no concurrent
  writer exists; each edit carries a one-line note naming the later wave, per fold cross-edges 2/3.
  `e2e/smoke/oracles/o9-shadow-palette.spec.ts` stays **X-W7's** (fold §3 entry 11): W1 coordinates,
  never writes it — it is excluded from every unit's writable set.

---

## Baseline — born-RED, measured READ-ONLY at `a8d9af99` (2026-09-17), double-run

Every command below was executed from `/Users/mkbabb/Programming/value.js`. Outputs pasted, not
paraphrased. **No cure byte exists at this clock.**

### The 21 hard-gate conditions (`W1.md:299-322`) as amended by fold §2a/§2b

| # | condition | BEFORE verdict | measurement at this clock |
|---|---|---|---|
| G-1 | typecheck covers `e2e/`; zero `demo/@/lib/palette/types` refs | **RED** | `ls -d demo/@/lib/palette` → *No such file or directory*; `grep -rn 'demo/@/lib/palette' e2e/ \| wc -l` → **7** (2 dangling `import type` — `e2e/smoke/fixtures/browse-palettes.ts:19`, `e2e/smoke/admin/fixtures/admin-populated.ts:28` — + 5 comment/prose refs at `admin-populated.ts:13`, `admin-auth.ts:16`, `user-auth.ts:13/:39/:99`); `grep -rn 'e2e' tsconfig*.json eslint.config.* \| wc -l` → **0** |
| G-2 | `e2e-smoke`/`e2e-safari` HARD, no `continue-on-error`, no branch-push substitution | **RED** | `grep -rniE 'lighthouse\|lhci\|playwright\|test:e2e\|boot-smoke' .github/workflows/ \| wc -l` → **0**; `grep -nE '^    [a-z0-9_-]+:$' .github/workflows/ci.yml` → `17:    producer:` · `56:    api:` (**2 jobs**) |
| G-3 | the suite's real pass/fail over 185, committed, **classified** (fold G-3 sharpening) | **MEASURE-AT-OPEN** | collection only is known (`--list` → 185 tests / 71 files at authoring; `find e2e -name '*.spec.ts' \| wc -l` → **71** here). Execution has never been produced by anyone. Unit a's first act (WO-5) |
| G-4 | LHCI runs `lighthouserc.json` unmodified; its four budgets are the pass condition | **RED** | `grep -n maxNumericValue lighthouserc.json` → `:12 cumulative-layout-shift 0.1` · `:13 largest-contentful-paint 2500` · `:14 interaction-to-next-paint 200` · `:15 total-blocking-time 300` — present, read by nothing (G-2's 0) |
| G-5 | the slate fails when a project has no CI job (+ file-level orphans, dead refs, duplicate ordinals — fold) | **RED** | `find . -name 'oracle-slate*' -not -path './node_modules/*' \| wc -l` → **0**; `grep -n 'name:' playwright.config.ts` → **6** projects (`:142 smoke` `:164 smoke-admin` `:176 smoke-mobile` `:194 smoke-reactivity` `:225 smoke-perf` `:252 smoke-safari`), 6 of 6 CI-orphaned |
| G-6 | the three `test.fail()` legs each a real assertion or deleted | **RED** | `grep -rn 'test.fail(' e2e/` → `o26-aurora-perceptibility.spec.ts:57` · `o16-computed-cascade.spec.ts:34` · `perf/o5-boot-pacing.spec.ts:48` (3 live legs) |
| G-7 | the falsifier demonstration (scratch branch reds the e2e job; run URL committed) | **RED** | never demonstrated — D48 waived it by `continue-on-error`, D55(iv) by branch-push substitution; with G-2 = 0 jobs there is nothing to redden |
| G-8 | `e2e/visual/` with goldens COMMITTED, route census × 3 viewports × light/dark | **RED** | `ls e2e/visual` → `ls: e2e/visual: No such file or directory`; `grep -rnE 'toHaveScreenshot\|toMatchSnapshot' e2e/ \| wc -l` → **0** over 71 spec files |
| G-9 | tolerance numeric with rationale; regeneration requires `--accept`, refuses a dirty tree | **RED** | no suite, no `scripts/visual/` |
| G-10 | the suite runs on every push; renderer string read from the LIVE browser (+ emulation labelling) | **RED** | six closes, zero runs (G-2's 0) |
| G-11 | the real-GPU session ran **or** the row is RETIRED with a dated tombstone | **RED** | zero sessions in six closes; `docs/tranches/X/evidence/` does not exist |
| G-12 | `boot-smoke.mjs --mode=dev` passes four assertions on a cold dev boot (+ seed matrix) | **RED** | `ls scripts/ci/` → `verify-packed-surface.mjs` — **`boot-smoke.mjs` absent** (deleted at `6d6d3521`) |
| G-13 | `--mode=prod-preview` at a bare `127.0.0.1`, four assertions (+ seed matrix) | **MEASURE-AT-OPEN** | standing record = `CARRY-LEDGER.md` §F *"gh-pages prod-preview empty mount"*. Unit c's first act (WO-5) |
| G-14 | NV-7 re-classed RED with its root **named** and differentially evidenced | **RED** | booked as a carry, root undiagnosed; no `nv-7-root.md` anywhere in the tree |
| G-15 | `deploy-pages.yml` resolves glass from the registry; no `ref: tranche/BG` | **RED** (condition) | `grep -n 'ref:' .github/workflows/deploy-pages.yml` → `:68 ref: ${{ github.event.workflow_run.head_sha \|\| github.sha }}` · **`:80                  ref: tranche/BG`**; remote head re-verified: `gh api 'repos/mkbabb/glass-ui/contents/package.json?ref=tranche/BG'` → **`5.0.0`**. *Its exports-map citation is GREEN — see GREEN-BEFORE-CURE #1* |
| G-16 | the prod-preview probe runs against a build from the amended workflow's exact steps, GREEN | **RED** | never run post-pin (the pin is live) |
| G-17 | `ci` green on `master`, the `pack producer bytes` step present | **RED** | `gh run list --branch master --workflow ci --limit 5` → **5 of 5 `failure`**; newest `29497700873` 2026-07-16T12:19:32Z |
| G-18 | `tranche-u` merged to `master` (`master..HEAD` reads 0 after) | **RED** | `git log -1 master` → `6abef800` Mon Jul 13 2026; `git rev-list --count master..HEAD` → **559** (the spec's authored 234, re-dated); `origin/master` = `44ddaff7` 2026-07-16, `git rev-list --count master..origin/master` → **140** |
| G-19 | ONE `deploy-pages` run `conclusion: success` · `event: push` · `head_branch: master`, dated in this wave | **RED** | last 40 runs: **39 `skipped` + 1 `failure`**, **0 `success`**; widened to 65 runs (back to 2026-06-19): **4 successes, every one `workflow_dispatch`**, newest `28836880612` 2026-07-07T02:19:20Z — **the push arm has never fired** |
| G-20 | `color.babb.dev` serves v4 (entry asset hash moves) (+ record the PRE-deploy source epoch — fold R38) | **RED** | `curl -s https://color.babb.dev/ \| grep -oE 'assets/[^"]+\.js'` → **`assets/index-D9U9KwTn.js`** (also `rolldown-runtime-QTnfLwEv.js`, `glass-ui-CShs8agU.js`) — byte-identical to the authoring reading, i.e. still the 2026-07-07 artifact |
| G-21 | a standing check reds when the last successful deploy predates the newest close | **RED** | no gate measures deploy age; today the newest success is **72 days** old and 25+ runs outside the default window |

**21 conditions · 19 measured RED at this clock · 2 MEASURE-AT-OPEN (G-3, G-13) assigned to their
units' first acts · 0 GREEN.**

### The fold's new gate candidates — witnesses re-measured read-only

| # | witness re-run here | reading |
|---|---|---|
| NG-1 / R2 (runbook §2.1 gate 8) | `grep -rn 'plate-caption' e2e/ demo/` | **8 rows; 4 live inside an un-skipped `test(...)`** — `e2e/smoke/oracles/o18-contrast-census.spec.ts:654`, `:658`, `:659`, `:680` — against a class deleted at `a68ecdc1`; the other 4 are `demo/` prose comments (`ParseEchoReadout.vue:42`, `PaneHeader.vue:120`, `useContrastSafeColor.ts:318`, `useAtmosphereBoot.ts:86`). `playwright.config.ts:147` `testIgnore` does not carve `oracles/` |
| NG-1 / R2 (o10d) | `grep -n 'readFileSync' e2e/smoke/oracles/o10d-display-voice-census.spec.ts` | `:2` import · **`:453` live call** — reads a `demo/@/...` path deleted at `a61094e3`; throws before any assertion |
| NG-3 / R5 | `ls tsconfig*.json` | `tsconfig.base.json` `tsconfig.demo.json` `tsconfig.json` `tsconfig.lib.json` — **no program covers `test/` or `e2e/`** |
| NG-4 / R6 | `grep -c 'plugins' vitest.config.ts` → **0** · `grep -c 'plugin-vue' vitest.config.ts` → **0** · `grep -rn 'mount(' test/ demo/ --include='*.test.ts' \| wc -l` → **0** | the harness cannot mount an SFC; `@vue/test-utils` installed, zero call sites |
| NG-5 / R8 | `grep -rn 'strictTemplates\|vueCompilerOptions' tsconfig*.json \| wc -l` | **0** — the flag is unset; the 10-diagnostic born-RED split (6 real / 4 noise) is unmeasured in-tree |
| NG-7 / R11 | `grep -n '"pretest"\|"pretypecheck"\|"test"' package.json` | `:64 "pretypecheck": "npm run build"` · `:67 "test": "vitest run"` — **`pretest` ABSENT** |
| NG-14 / R47 | `ls e2e/smoke/oracles/`, `ls e2e/smoke/perf/` | shipped `o22-status-lamp` · `perf/o24-lcp-identity` · `o26-aurora-perceptibility` · `o27-focus-affordance` against W6's created o22/o24/o26/o27 — **four ordinal collisions**, two on files in W1's own bounds |
| NG-15 / R48 | `grep -n 'demo/@' eslint.config.js` → `:235-238`, `:275` · `ls -d demo/@` → *No such file or directory* | every module-lattice rule globs a deleted tree while `--max-warnings=0` reports green |
| NG-16 / R55 | `grep -n 'grain' e2e/smoke/oracles/o7-card-census.spec.ts` | `:104 grain: el.dataset.grain ?? "(none)"` · `:224` the stated law · `:234 .soft(card.grain, …).toBe("true")` — **scheduled-RED**, not yet RED at the installed 7.0.0 |
| R50 | `grep -n 'testDir\|testIgnore' playwright.config.ts` | `:87 ./e2e` root · `:143 ./e2e/smoke` (+`:147` testIgnore) · `:165 admin` · `:177 mobile` · `:195 smoke` · `:226 perf` · **`:253 ./e2e/smoke/safari`** — the `oracles/` subtree is reachable from no WebKit project |

### Producer / environment state at open

`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → **`7.0.0`** ·
exports map: **`./blob:true ./chip:true ./search:true ./forms:true ./input:false ./canvas:true`** ·
`package.json:83` declares `^7.0.0` · `npm view @mkbabb/glass-ui version` → **`9.0.0`** (registry
latest; the PUT wall has fallen — X-W0.j's re-trigger, not X-W1's act) · `git worktree list` → 4
entries (primary `a8d9af99 [tranche-u]`; `~/.codex/worktrees/7e28/value.js`;
`value-css-totality-audit`; `value-xw1-demo-boot`) — **none of the three sibling paths
`/Users/mkbabb/Programming/value-js-x-w1-{b,c,d}` exists yet** (`W1.md:192-199`; the orchestrator
adds them before group 1).

### GREEN-BEFORE-CURE findings (§READINESS R.2: *a PASS before its cure is itself a finding*)

1. **G-15's born-RED *citation* (B13, the exports-map holes) is GREEN at the installed pin.** B13 is
   scoped to glass **5.0.0**; at the installed **7.0.0** both `./blob` and `./chip` are exported
   (measured above), so a gate predicated on their absence cannot go RED. **Already adjudicated at
   fold §6.2 / R56(b)(c): G-15 is read on its resolution clause and its branch-checkout falsifier,
   never on the exports-map cell, unless that cell is re-measured at the pin of the day.** The
   *condition* is RED (`ref: tranche/BG` live at `:80`; the remote head is still 5.0.0). No
   re-litigation; recorded because R.2 requires the finding to be named.
2. **NG-16 (the o7 grain census) is scheduled-RED, not RED.** `data-grain` is still stamped at 7.0.0,
   so `o7-card-census.spec.ts:234` passes today; it goes RED **at** the 8.0.0 repin (X-EXT-5). Fold
   §6.2 states this in the gate cell itself. Booked, not cured (fold R55 SEQUENCING + cross-edge 14).
3. *(restated from P-2, not re-measured as a W1 gate)* runbook §2.1 **gate 10** — the glass
   exports-map parity watch — is **GREEN-at-pin by the runbook's own declaration**, and flips RED at
   the repin (`./forms` → `./input`; measured here as `forms:true input:false`, i.e. the rename has
   **not** landed).

### Divergences from the authored baselines (facts for the units; no ruling is re-opened)

- **B16 · 234 → 559.** `master..HEAD` is 559 commits, not the 234 measured 2026-08-03. G-18's
  falsifier (`git rev-list --count master..HEAD` must read **0** after the merge) is unchanged.
- **B15 · the deploy record has decayed further.** 0 successes inside 40 runs (39 skipped + 1
  failure); the newest success overall is 2026-07-07 (**72 days**) and every success ever recorded in
  the fetched window is `workflow_dispatch` — G-19's premise (*the push arm has never fired*) is
  confirmed at a wider denominator than the spec measured.
- **B19 · the dev stack is DOWN.** `curl -o /dev/null -w %{http_code} localhost:9000` → **000**;
  `localhost:3000` → **000** (authored: `200`/`200`). Units a and c must start the stack themselves;
  a suite failure caused by a dead stack is not a product RED and must not enter G-3's classification.
- **B9 · the fold's R4 runtime-string arm is narrower inside `e2e/` than AAP-34's 10-ref figure.**
  Measured here: `e2e/` holds **7** refs = 2 dangling `import type` + 5 **comment/prose** refs; the
  `/@fs/.../demo/@/lib/palette/api/palettes.ts` string occurs only inside comments
  (`user-auth.ts:39`, `:99`). AAP-34's 10 counts refs beyond `e2e/`. **Consequence for unit a**: G-1's
  runtime-string arm is stated against the wider corpus (and the comment refs corrected), or the
  gate's own cell says which denominator it used — the fold's cure-shape lock stands either way.
- **The registry now holds 9.0.0** (above) — §0i.2's re-trigger; routed to X-W0.j / the orchestrator.

---

## Unit plan

**Six units, the Agents line binding (`W1.md:7`, runbook §5.1): 3 in sub-wave 1, then 3 serial.**
**Model law M-23 (`W1.md:202-203`): every unit here is an implementation seat → Opus.** Groups
honour the owner's concurrency cap (≤2 concurrent) and the fold's binding sequencing; no two
concurrent units share a `modify` path.

| group | units | why this order |
|---|---|---|
| 1 | **c ∥ b** | sub-wave 1 writers, disjoint (`scripts/ci/boot-smoke.mjs` vs `e2e/visual/**` + `scripts/visual/**`). c precedes d because §X.W1.d's mechanism runs c's prod-preview gate |
| 2 | **d** | the `release.yml` cherry-pick (§0j.F(3), WO-4) + the glass-pin cure; G-16 needs c's artifact and must run on the same commit as G-13 |
| 3 | **a** | W1.md's Worktree Plan puts the wirer in sub-wave 2, after integration; fold R1's LOCK makes R2+R3 its *inputs*, executed inside it before the HARD flip |
| 4 | **e** | the landing needs a's green-capable `ci.yml` (G-17) and d's `release.yml` reconciliation |
| 5 | **f** | the real-GPU arm closes last (run-or-tombstone), appending to `W1-LOG.md` after e |

### X.W1.a — CI verification surface (CC-031) + the fold's e2e/unit-tree surface · **opus**

- **Sections**: `W1.md` §Agent Units X.W1.a (`:207-224`) · §Hard Gate G-1..G-7 (`:301-307`) ·
  §Format And Lint Cadence (`:325-334`) · §Commit Plan rows 1 and 5 (`:356-360`) ·
  `X-W1-FOLD.md` §1 R1–R13 (`:83-327`), R20–R33 (`:406-566`), R43/R45/R47–R50 (`:721-843`) ·
  §2a G-1..G-7 sharpenings (`:856-870`) · §2b NG-1..NG-10, NG-14, NG-15 (`:878-894`) ·
  §3 BoundsDelta whole (`:902-967`) · §6.1 R51–R53, R55 (`:1089-1200`) · §6.2 (`:1241-1261`) ·
  §6.3 (`:1263-1274`).
- **Writable**: `.github/workflows/ci.yml` · `playwright.config.ts` · `package.json` (scripts block
  only) · `tsconfig.e2e.json` (create) · `tsconfig.test.json` (create) · `vitest.config.ts` ·
  `e2e/fixtures/palette-envelopes.ts` (create) · `e2e/smoke/**` **except**
  `e2e/smoke/oracles/o9-shadow-palette.spec.ts` · `test/**` · `demo/test/**` (the `demo/test/shell/`
  carve only — never product source) · `scripts/ci/oracle-slate.mjs` (create) ·
  `docs/tranches/X/waves/W1-LOG.md` (create) · `docs/tranches/X/evidence/w1/{baseline,falsifier,slate}/**`.
- **Gates**: G-1 · G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · NG-1 · NG-2 · NG-3 · NG-4 · NG-5 · NG-6 ·
  NG-7 · NG-8 · NG-9 · NG-10 · NG-14 · NG-15 (NG-16 **booked scheduled**, not cured).
- **Locks**: fold R1 **SEQUENCING LOCK** (R2 census + R3 dialect land **before** the HARD flip — they
  are inputs to this unit, not follow-ons) · G-6/R2: `test.skip()` is deferral under a new name and
  discharges nothing · WO-1's `test/` carve (no assertion weakened or deleted except under R2's
  dead-reference rule **with a written rationale**) · WO-2's R6/R7/R53 riders · WO-3 (G-21 is a job in
  `ci.yml`, no third `scripts/ci` path) · commit-plan families 1 and 5 do not split · `o9` is X-W7's ·
  `W1-LOG.md` is created here and appended serially by e then f.
- **Brief**: R1 LOCK order, binding. (1) R2 dead-locator census: every locator/selector/class/path a
  tracked spec names resolves, or the spec is DELETED with a one-line rationale — 16 enumerated
  members incl. `o18:648-690`'s `.plate-caption` and `o10d:453`'s deleted dir. (2) R3 dialect cure at
  o14/o20/o18: both sides through the app's own parser, one encoding. (3) G-1 root cure:
  `tsconfig.e2e.json` + `tsconfig.test.json` into `typecheck`; extract shapes to
  `e2e/fixtures/palette-envelopes.ts`; correct the 5 stale refs. (4) MEASURE-AT-OPEN G-3: run the full
  suite on a built bundle (start the stack — it is down), commit the number with run id + duration,
  every failure CLASSIFIED (dead-locator/dialect/product/unmet-precondition; mix = ENTAILED, R51).
  (5) R6 harness + `pretest`; born-RED batteries NG-8/9/10. (6) ONLY THEN flip HARD: `ci.yml` jobs
  e2e-smoke, e2e-safari, visual, boot-smoke, lhci + the G-21 age job — no `continue-on-error`, no
  branch-push substitution; `oracle-slate.mjs` (project + file orphans + duplicate ordinals); rule the
  3 `test.fail()` legs; G-7 scratch-branch falsifier with its red run URL.

### X.W1.b — Visual regression oracle (CC-030 · CC-029a) · **opus** · worktree `/Users/mkbabb/Programming/value-js-x-w1-b`

- **Sections**: `W1.md` §Agent Units X.W1.b (`:226-240`) · §Hard Gate G-8..G-10 (`:308-310`) ·
  `X-W1-FOLD.md` §1 Band D R34–R37 (`:568-664`) · §2a G-8/G-9/G-10 (`:865-867`) · §2b NG-11, NG-12
  (`:890-891`) · §3 entries 28, 36 (`:946`, `:958`) · §6.1 R54 (`:1140-1166`).
- **Writable**: `e2e/visual/**` (create) · `scripts/visual/regenerate-goldens.mjs` (create) ·
  `docs/tranches/X/evidence/w1/visual/**` · `docs/tranches/X/evidence/w1/instrument-caveats.md`.
  **Read/execute, no write**: `docs/tranches/V/megatranche/audit/visual/capture.mjs` + `REPORT.json`.
- **Gates**: G-8 · G-9 · G-10 · NG-11 · NG-12.
- **Locks**: FM-12 (untracked evidence is not evidence — goldens COMMITTED) · L-19 denominator
  discipline (product-consumer axes; no golden for a combination no user reaches) · R36 (an EMULATED
  modality is labelled emulation and discharges no real-modality obligation; Safari cells labelled per
  cell) · seeded storage / seeded fixtures / forced states are **capture inputs**, never product edits
  — this unit writes no `demo/` byte (W1.md's Triumvirate trigger).
- **Brief**: Author `e2e/visual/` as a Playwright project. Denominator = the ROUTE CENSUS, not the
  5-route sample the six shipped modality matrices share (R34: extract, mix, admin-names, about,
  generate are pane-hosted and reached) × 390/1024/3440 × light/dark, plus R35's non-route arms:
  overlay states, seeded storage, the existing `routeBrowsePalettesDelayed` fixture the visual matrix
  never consumes, and forced states. Tolerance numeric with rationale in the suite header, validated
  by a deliberate visible injection (G-9), never by argument. `regenerate-goldens.mjs` requires
  `--accept` and refuses a dirty tree. Renderer string read from the LIVE browser into every golden
  filename and the header. Commit the NG-12 instrument-caveat register (dev fonts never load
  production faces; `content-visibility` `scrollWidth`; `smallTapTargets` measures paint not target)
  and name R54's four residue-witness cells it discharges.

### X.W1.c — Boot truth, both modes (CC-032) · **opus** · worktree `/Users/mkbabb/Programming/value-js-x-w1-c`

- **Sections**: `W1.md` §Agent Units X.W1.c (`:242-253`) · §Hard Gate G-12..G-14 (`:312-314`) ·
  §MEASURE-AT-OPEN (`:119-127`) · `X-W1-FOLD.md` §1 R14–R17 (`:329-377`), R42 (`:711-717`) ·
  §2a G-12/G-13 (`:868-869`).
- **Writable**: `scripts/ci/boot-smoke.mjs` (create) · `docs/tranches/X/evidence/w1/boot/**` ·
  `docs/tranches/X/evidence/w1/nv-7-root.md`.
- **Gates**: G-12 · G-13 · G-14.
- **Locks**: the prod-preview origin form is **checked** — a bare `127.0.0.1:PORT`, because a sub-path
  origin masks base-path defects · G-13's MEASURE-AT-OPEN reading is pasted **before any cure** ·
  G-13 and G-16 must run on **one** commit (with unit d) · a root asserted without a differential test
  fails G-14; d's pin is a *candidate* until G-16 shows the probe flips.
- **Brief**: Create `scripts/ci/boot-smoke.mjs` taking `--mode=dev|prod-preview` and an origin. First
  act = G-13's MEASURE-AT-OPEN: `npm run gh-pages`, serve `dist/gh-pages` at a bare `127.0.0.1:PORT`,
  paste the mount state (the standing record is CARRY-LEDGER §F's *gh-pages prod-preview empty
  mount*). Four assertions per mode: `#app` has ≥1 element child · a `role=main` landmark exists ·
  `page.on('pageerror')` collected `[]` · ≥1 desktop utility class in the emitted CSS. Per R16/R17
  each mode takes a **seed matrix** (`?color=` greys including black, none-hue lch/oklch, persisted
  and deep-linked seeds), not one default boot — 28/256 greys throw before mount, outside the
  ErrorBoundary. Diagnose NV-7's root **by name** with a differential test into `nv-7-root.md`.
  Falsifier: comment out `app.mount()` in a scratch build → both modes red. R42's artifact census
  rides the same build, free.

### X.W1.d — Deploy dependency truth (CC-034) + the release.yml ride-in · **opus** · worktree `/Users/mkbabb/Programming/value-js-x-w1-d`

- **Sections**: `W1.md` §Agent Units X.W1.d (`:255-264`) · §Hard Gate G-15, G-16 (`:315-316`) · B11,
  B12, B13 (`:93-95`) · `COHESION.md` §0j.F(1)(3) · `X-W1-FOLD.md` §6.1 R56 (`:1202-1239`) · §6.2's
  G-15 sharpening (`:1249-1254`).
- **Writable**: `.github/workflows/deploy-pages.yml` · `.github/workflows/release.yml` (by §0j.F(3)'s
  dated addendum) · `docs/tranches/X/evidence/w1/deploy-pin/**`.
- **Gates**: G-15 · G-16.
- **Locks**: the `release.yml` cherry-pick is this unit's **FIRST commit**, the two commits verbatim,
  one file (§0j.F(3), WO-4) · G-15 is read on its resolution clause + the branch-checkout falsifier,
  **never** on the exports-map cell (R56(b)(c)) · G-16 runs on the **same commit** as G-13 · the
  8.0.0 repin is X-W0.j/X-W4.g's, never this unit's · glass-ui stays READ-ONLY.
- **Brief**: First commit: cherry-pick `e2652f1c` and `44ddaff7` verbatim into `tranche-u` (1 file,
  `.github/workflows/release.yml`; strictly-stronger pack-time identity checks) per COHESION
  §0j.F(3). Then `deploy-pages.yml`: delete the `actions/checkout` of `mkbabb/glass-ui@tranche/BG`
  (`:80`) with its build steps and replace them with the registry install the declared `^7.0.0`
  already implies; retire the stale *"un-pin at the 5.0.0 master landing"* comment (`:76`) — the
  waypoint was skipped and glass went 4.2.0 → 7.0.0 (registry latest is now 9.0.0; the repin is
  **not** this unit's). Prove `./blob` and `./chip` resolve in the deploy build. Then run X.W1.c's
  prod-preview gate against a build produced by the amended workflow's **exact** steps, on the same
  commit G-13 runs on.

### X.W1.e — Landing and deploy-of-record (CC-033) · **opus** · primary tree

- **Sections**: `W1.md` §Agent Units X.W1.e (`:266-278`) · §Hard Gate G-17..G-21 (`:317-321`) ·
  §Commit Plan row 7 (`:362`) · `COHESION.md` §0j.F(1)(2) · `X-W1-FOLD.md` §1 R38–R41 (`:668-709`) ·
  §2a G-17, G-20 (`:870-871`) · §2b NG-13 (`:892`).
- **Writable**: no repo source file — git operations, `gh` probes, `curl` receipts ·
  `docs/tranches/X/evidence/w1/deploy/**` · `docs/tranches/X/waves/W1-LOG.md` (append only, after a).
- **Gates**: G-17 · G-18 · G-19 · G-20 · G-21 · NG-13.
- **Locks**: §0j.F(2) — fast-forward local `master` (140 behind) to `origin/master` **before** the
  merge; every both-changed path resolves to `tranche-u`'s bytes (the eight deleted tests and the
  three deleted `scripts/ci` probes stay deleted; X-W1's `boot-smoke.mjs` is the surviving add),
  `release.yml` already reconciled by unit d; **option D (rebase) is refused** · a green obtained by
  removing or softening the `pack producer bytes` step fails G-17 · a `workflow_dispatch` success does
  not satisfy G-19 · NG-13 asserts **exported-surface** equality, never byte equality (R41's dissent:
  the delta is private `_2` declarations; `^export` = 53 both) · no force-push anywhere.
- **Brief**: Merge `tranche-u` → `master` — **559** commits, not the authored 234 — after
  fast-forwarding local `master` to `origin/master`; `git rev-list --count master..HEAD` must read 0
  after. Green master: the historical failure is the `pack producer bytes` step (already fixed on
  `tranche-u`); any other cause halts to triumvirate. Then confirm ONE `deploy-pages` run with
  `conclusion: success`, `event: push`, `head_branch: master`, dated in this wave — today 0 of the
  last 65 runs are push successes and the newest success is 2026-07-07 (72 days). Re-probe
  `color.babb.dev`: the entry asset must move off `index-D9U9KwTn.js`, and record which source epoch
  the PRE-deploy artifact belonged to (R38). Verify the G-21 age job reds when its comparison input is
  back-dated. Paste every run id.

### X.W1.f — Real-GPU oracle session (CC-029 half b) · **opus** · primary tree

- **Sections**: `W1.md` §Agent Units X.W1.f (`:280-292`) · §Hard Gate G-11 (`:311`) · §Dispositions
  CC-029 (`:67`) · §Archaeology DR-07 row (`:393`).
- **Writable**: `docs/tranches/X/evidence/w1/real-gpu/**` · `docs/tranches/X/waves/W1-LOG.md`
  (append only, after e).
- **Gates**: G-11.
- **Locks**: exactly two terminal states — session receipts **or** a dated tombstone; *"carried to
  X-W11"* / *"scheduled for the next window"* is the third state the gate exists to refuse, and no
  re-framing as a future automated job (that framing has failed six times).
- **Brief**: Book the dated ≤30-minute owner session at wave-open — headed Chrome on the owner's
  machine, walking the four golden routes (Picker, Gradient, Browse, About), capturing N frames plus a
  signed checklist into `docs/tranches/X/evidence/w1/real-gpu/`. If the session has not occurred by
  close, RETIRE the row with a dated `TOMBSTONE.md` quoting DR-07's chain (N X14 → R R8-22 → S → T
  O-3 → U-F54/B8 → V-prime CH-7) and the reason: **named six times, run zero times; naming is not
  discharge.** No seventh carry.

### Standing conditions on the wave (not a unit's)

- **L-18 rider (`W1.md:402-412`)**: gates GREEN does not make the wave ACCEPTED — two quartet
  challenge passes (four Opus skeptics each, hunting this wave's own archaeology: waived falsifiers,
  decorative jobs, branch-scoped greens, tolerance absorption, renderer dishonesty, third-state
  carries) then a **fresh Fable apotheosis** that has not seen the implementation. Dispatched by the
  orchestrator at gate-green; findings land as wave-log entries with dispositions.
- **Triumvirate triggers (`W1.md:129-141`)**: any write under `src/`, `demo/` (beyond the declared
  `demo/test/shell/` carve) or `api/` · master CI still red after the merge for a cause outside
  `.github/workflows/` and the pack step · boot-smoke RED in production preview *after* the CC-034
  pin lands · G-7's falsifier failing to redden a job · any third iteration of golden-flake triage,
  deploy green-chasing, or NV-7 root hunting.
- **VERIFIED is never stamped here** — only X-W11's release close (R-A); this wave advances
  IMPLEMENTED at most.

---

## Unit receipts

*(empty at open — each unit appends its own block with commit hashes, gate transitions and
⟨cmd⟩ → output receipts; concurrent units write only inside their own evidence subdirectory.)*

### X.W1.c

**Boot truth, both modes (CC-032) · G-12 · G-13 · G-14 · opus (`claude-opus-5[1m]`) ·
worktree `/Users/mkbabb/Programming/value-js-x-w1-c`** — 2026-09-17. Base `f62bf82b`; the worktree
was moved to this unit's own script commit `cad51f9e` and every published figure RE-MEASURED there
after a sibling seat's `composables/boot/useAtmosphere.ts` landing moved the entry chunk.
Commits: **`cad51f9e`** (Commit Plan row 3, `ci(boot-smoke)`) · **`d677c30c`** (row 6, evidence).

#### Act 0 — the worktree (the spec's, not yet made)

`W1.md:192-199` assigns this unit `/Users/mkbabb/Programming/value-js-x-w1-c` and charges the
orchestrator with creating it; at dispatch it did not exist (the open baseline says so at `:170-172`).
⟨`git worktree add --detach /Users/mkbabb/Programming/value-js-x-w1-c HEAD`⟩ → `HEAD is now at
f62bf82b`; ⟨`npm ci --no-audit --no-fund`⟩ → `added 438 packages in 7s`. **Detached, never a branch**:
the commits land on `tranche-u` from the primary tree by pathspec, so nothing is owed an integration
step. The worktree's purpose is WO-5's: it carries the `npm run gh-pages` builds so the primary
tree's `dist/` — which `test/**` binds to and other Track A seats read — is never replaced by this
unit. ⟨`node -p "require('…/value-js-x-w1-c/node_modules/@mkbabb/glass-ui/package.json').version"`⟩
→ **`7.0.0`** (the declared `^7.0.0`, from the registry).

#### Act 1 — G-13 MEASURE-AT-OPEN, pasted BEFORE any cure (the unit's first act, WO-5)

⟨`npm run gh-pages`⟩ → rc 0 · a 40-line node static server at `127.0.0.1:0` serving `dist/gh-pages`
· headless chromium `goto(origin + "/")`. Origin `http://127.0.0.1:53042` — **bare**: root path, no
sub-path, no query, no fragment.

```
HTTP: 200
MOUNT STATE: { "appTag": "BODY", "elementChildCount": 6,
               "childTags": ["DIV","DIV","SPAN","DIV","DIV","DIV"],
               "innerHTMLLength": 98826, "mainCount": 1, "styleSheetCount": 8 }
PAGEERRORS: []   FAILED REQUESTS: []
```

**NV-7 DOES NOT REPRODUCE at `f62bf82b`.** Recorded as a **GREEN-BEFORE-CURE** finding
(§READINESS R.2), not as a gate pass. The standing record it is measured against is
`CARRY-LEDGER.md:116-118` — *"the PRODUCTION build previewed at a bare 127.0.0.1 origin mounts
empty (boot-guard/ground-record quirk; dev witness green and canonical)"*. Full record:
`docs/tranches/X/evidence/w1/boot/MEASURE-AT-OPEN-2026-09-17.md`.

#### Act 2 — `scripts/ci/boot-smoke.mjs` (`cad51f9e`, 719 lines, one file)

Restores what `d9c3b9f2` created as inv-N-1 and `6d6d3521` deleted as *"CI-orphaned; W44
routed-mount witness supersedes"* eleven hours before W44 closed booking the empty mount as a carry.
`--mode=dev|prod-preview` + an optional `--origin`; `--build`; `--json`; `--seed` (a triage
diagnostic, never a gate posture — a gate run takes the whole matrix).

- **The origin form is CHECKED, not assumed** (the unit's LOCK): loopback literal, explicit port,
  ROOT path, no query, no fragment. ⟨`--origin=http://127.0.0.1:62922/gh-pages/`⟩ → exit 1,
  *"ORIGIN-FORM: … sub-path /gh-pages/ — a sub-path origin masks base-path defects"*;
  ⟨`--origin=http://localhost:62922`⟩ → exit 1, *"host localhost (want 127.0.0.1)"*.
- **Four assertions per mode, per seed** (`W1.md:248-250`): A1 `#app` ≥1 element child · A2 a
  `role=main` landmark · A3 `pageerror` collected `[]` · A4 ≥1 desktop utility class in the emitted
  CSS, walked out of the **live CSSOM** with its enclosing media condition, never from a file guess.
- **dev** spawns `vite --force` (COLD dep-optimizer cache — one of the three named silencers);
  **prod-preview** serves `dist/gh-pages` from a built-in static server at a bare ephemeral origin,
  with no SPA fallback (the router is `createWebHashHistory`, so a catch-all would hide a real 404).
- Lint/format at the settled bytes: ⟨`npx prettier --check`⟩ → *All matched files use Prettier code
  style!* · ⟨`npx eslint … --max-warnings=0`⟩ → rc 0 · ⟨`git diff --check`⟩ → rc 0.

**Instrument defect found and cured during authoring, recorded because it would have been a false
GREEN:** the first CSSOM walk treated *"has `cssRules`"* as *"is a grouping rule"*. In the nesting
era a plain `CSSStyleRule` carries an empty `cssRules` list, so every style rule was skipped and A4
read `0 desktop utility rule(s)` on a document that has 47. Cured by testing the selector first and
descending after — A4 now reads `47 … @ (width >= 64rem)`.

#### Act 3 — G-14: NV-7's root, NAMED, with its differential test

> **THE ROOT — the Vue bootstrap was an INLINE `<script type="module">` in
> `demo/color-picker/index.html`. Vite's production build does not traverse an inline module as a
> build entry: it emitted the 698-byte modulepreload polyfill shell and dropped the entire
> application module graph, the application stylesheet with it. Dev never had the defect — the
> browser's own ESM loader executes an inline module directly and no build entry is involved.
> Cured at `c4af0ef9` (2026-07-29), CC-002's product cut.**

The differential — **one knob, both sides, at today's bytes**
(⟨`git show c4af0ef9 -- demo/color-picker/index.html demo/color-picker/main.ts | git apply -R -`⟩,
then ⟨`npm run gh-pages`⟩, changing nothing else):

| reading | external entry (as shipped) | inline entry (the one knob) |
|---|---|---|
| emitted assets | **122** | **63** |
| entry chunk | `index-DC7wNDmX.js` — **539,078 B** | `index-Dezn_h7o.js` — **698 B** |
| `modulepreload` links | 5 | **0** |
| application stylesheet | `index-CyBun992.css` | **absent** |
| prod-preview A1 / A2 / A3 / A4 | 6 children / 1 landmark / `[]` / 47 rules | **0 / 0 / `[]` / 0** |
| **prod-preview verdict** | `1/1 PASS` | **`0/1 FAIL`** |
| **dev verdict, same knob** | `1/1 PASS` | **`1/1 PASS`** ← *dev cannot see it* |

Independently reproduced at its own clock: a scratch worktree at **`91fa1368`** (the W44 close, the
commit whose own §F booked the carry) builds the **byte-identical 698-byte entry** `index-Dezn_h7o.js`
and probes `elementChildCount: 0`, `mainCount: 0`, `vueAppPresent: false`, `PAGEERRORS: []`,
`FAILED REQUESTS: []`, `perfMarks: ["overture:b0"]`.

**Two standing claims FALSIFIED, both recorded rather than quietly dropped:**

1. *"boot-guard/ground-record quirk"* (`CARRY-LEDGER.md:117`) — **false**. On the RED arm the guard
   ran to completion: `overture:b0` marked, `--saved-bg` written (`rgb(179, 114, 144)`), every
   `__GROUND_*__` token injected (⟨`sed -n '185,200p' dist/gh-pages/index.html`⟩ → `=== 4`, no
   unreplaced token). It is the one part of the boot that worked.
2. **DR-22 / CC-034's `ref: tranche/BG` glass pin as the *"highest-probability root cause of NV-7"***
   (`DISEASE-REGISTRY.md:327`; `W1.md:314` makes it a *candidate until G-16 shows the probe flips*)
   — **falsified without needing G-16**: every arm of the differential is a LOCAL `npm run gh-pages`
   against the registry's **7.0.0**; `deploy-pages.yml` participates in none of it, and the flip is
   total on the entry form alone. **This does not retire CC-034** — the pin is a real
   deploy-provenance defect and X.W1.d cures it under G-15 for its own reason; only its *claim to be
   NV-7's root* is withdrawn. **Message to X.W1.d**: G-16 is the prod-preview probe against the
   amended workflow's exact steps, and it should be read as that and not as the confirmation of a
   root now identified elsewhere.

Also named: the desktop/CSS-emission chronic (K.W2.6 → M.W2.A → N.W2.B → N.W10.D → R.W2) is **the
same defect** — A4 reads `0 desktop utility rule(s)` on the RED arm because the stylesheet is emitted
by the graph that was dropped. One root, two registry names.
Full record: `docs/tranches/X/evidence/w1/nv-7-root.md`.

#### Act 4 — the falsifier (`W1.md:253`, `:312-313`)

Scratch build, `app.mount("#app")` commented out, **never committed** (⟨`git status --porcelain`⟩
after restore → the unit's own new file alone; tree rebuilt):

| mode | exit | A1 | A2 | A3 | A4 |
|---|---|---|---|---|---|
| `--mode=dev --seed=default` | **1** | **FAIL** 0 children | **FAIL** 0 landmarks | ok `[]` | ok 47 rules |
| `--mode=prod-preview --build --seed=default` | **1** | **FAIL** 0 children | **FAIL** 0 landmarks | ok `[]` | ok 47 rules |

**Both modes red, and red *for their reason*** — A1/A2 only, while A3/A4 stay green and the entry
chunk is still 539,051 B. Recorded: the mount deletion produces **no `pageerror` in either mode**, so
a gate that asserted only "console clean" would have passed this build — which is precisely how this
row's predecessors failed. Full record: `docs/tranches/X/evidence/w1/boot/falsifier-2026-09-17.md`.

#### Act 5 — G-12 / G-13 at `cad51f9e`, double-run, over the R16/R17 seed matrix

Each mode takes a **seed matrix**, not one default boot (fold R16/R17): deep-linked and persisted
achromatic seeds, none-hue `lch`/`oklch`, and a chromatic control. The 28/256 figure was
re-derived at these bytes before the matrix was chosen — ⟨node over `dist/subpaths/color.js`,
256 greys⟩ → **`hsv-powerless greys: 28 of 256`**, members
`[0,3,6,23,26,43,46,50,51,52,62,74,96,122,135,143,157,159,160,161,187,225,228,243,247,248,251,253]`,
and **`none-hue lch/oklch greys: 512 of 512`** (R15's 256/256-in-both figure, confirmed).

| seed | class | dev | prod-preview |
|---|---|---|---|
| `default` | W1.md's literal cold boot | **PASS 4/4** | **PASS 4/4** |
| `deep-link-grey-808080` | CONTROL (grey 128, not powerless) | **PASS 4/4** | **PASS 4/4** |
| `deep-link-black` | R16 (`?color=black`, grey 0) | FAIL `PickerColorError: Missing hsv.h` | FAIL (same, console-only) |
| `deep-link-grey-333333` | R16 (grey 51) | FAIL `Missing hsv.h` | FAIL |
| `persisted-black` | R16, self-perpetuating arm | FAIL `Missing hsv.h` | FAIL |
| `deep-link-lch-none` | R17 | FAIL `Missing lch.h` | **PASS 4/4** |
| `deep-link-oklch-none` | R17 | FAIL `Missing oklch.h` | **PASS 4/4** |
| `persisted-oklch-none` | R17 | FAIL `Missing oklch.h` | **PASS 4/4** |
| **totals** | | **2/8** | **5/8** |

Double-run at `cad51f9e`: dev `2/8` twice, prod-preview `5/8` twice, the same seeds both times (and
`5/8`/`2/8` also at the base `f62bf82b`, four consecutive concordant readings in all). Transcripts:
`boot/run-dev-2026-09-17.txt`, `boot/run-prod-preview-2026-09-17.txt`.

**GATE READINGS, BEFORE → AFTER**

| gate | BEFORE (open baseline) | AFTER | basis |
|---|---|---|---|
| **G-12** — `--mode=dev` passes the four assertions on a **cold dev boot** (`W1.md:312`) | **RED** — `ls scripts/ci/` → `verify-packed-surface.mjs`; `boot-smoke.mjs` absent | **GREEN** on its W1.md condition: `default` **4/4** on `vite --force`; falsifier reds it | `boot/run-dev-2026-09-17.txt` |
| **G-12 · fold R16/R17 seed-matrix arm** | **RED** (no instrument existed) | **BORN-RED, as the fold declares it** — 6 of 8 legs fail; instrument delivered | R16 *"born-RED boot test over the seed matrix"* |
| **G-13** — `--mode=prod-preview` at a **bare `127.0.0.1`** (`W1.md:313`) | **MEASURE-AT-OPEN** | **GREEN** on its W1.md condition: `default` **4/4**; origin form checked and demonstrated refusing a sub-path | `boot/run-prod-preview-2026-09-17.txt` |
| **G-13 · fold R16 seed-matrix arm** | **RED** | **BORN-RED** — 3 of 8 legs fail (the hsv-powerless grey class) | same |
| **G-14** — NV-7 re-classed with its root **named** and differentially evidenced | **RED** — booked as a carry, root undiagnosed, no `nv-7-root.md` in the tree | **GREEN** — root named, differential run both ways at today's bytes AND reproduced at `91fa1368`; two rival claims falsified | `evidence/w1/nv-7-root.md` |
| **R42** (cl.3, MEASURE-AT-OPEN, INFO) | banked on a seat that ran no build | **CLOSED** — 122 assets CONFIRMED · vendor-katex emitted CONFIRMED · **not** in the 5-link modulepreload set CONFIRMED | `boot/artifact-census-r42-2026-09-17.md` |

**The seed-matrix REDs are not this wave's to cure, and are not masked here.** No `test.skip`, no
allowlist, no try/catch, no filtered assertion: `boot-smoke.mjs` exits non-zero on them and names
them. The fold routes the cures — **R16 → X-W9** (*"the `none` protocol must be
unrepresentable-to-forget at the demo boundary"*), **R17 → X-W5 + X-W9** (demo `Result` propagation
+ the library `Result` battery) — and states that **W1 owns the gate and the deploy-matrix state
only**. Consequence for **X.W1.a**, stated so it is a decision and not a surprise: wiring
`boot-smoke` as a HARD job makes CI red until those waves land. That is what a born-RED gate means;
softening it with `continue-on-error` is exactly what G-2 forbids by name.

#### Residuals and escalations

- **NONE at ESCALATION level.** No Triumvirate trigger fired: no write under `src/`, `demo/` or
  `api/` (the two scratch mutations were reverted and the tree left clean); NV-7 root-hunting
  converged on the **second** measurement, not a third.
- **R1 (hand-off to X.W1.a and X.W1.d) — `npm run gh-pages` has an undeclared build input.** There
  is no `pregh-pages` hook (`package.json:62-64` — `prepare` and `pretypecheck` exist, `pregh-pages`
  does not), while the demo reaches the library through the exports map to `dist/subpaths/*.js`.
  Measured: with `npm ci --ignore-scripts` (so `prepare` never ran) the gh-pages build **fails** —
  `[UNLOADABLE_DEPENDENCY] Could not load dist/subpaths/css.js ╭─[ demo/color-session/picker-color.ts:2:50 ]`.
  An artifact built on a *stale* `dist/` therefore has undefined provenance and fails silently rather
  than loudly. `package.json` is **X.W1.a's**; `deploy-pages.yml`'s build steps are **X.W1.d's**.
  Outside this unit's writable set, so recorded, not cured.
- **R2 (recorded finding) — A3 is blind in `prod-preview`.** The same boot crash raises a
  `pageerror` in dev but only a `console.error` in prod (Vue's dev build rethrows to the window; the
  prod build does not). A3 is kept exactly as `W1.md:249` words it; the console is printed beside
  every failing case so the receipt carries the cause, and A1/A2 are the load-bearing assertions.
- **R3 (recorded) — the local static preview emits the demo's own API-origin misconfiguration
  notice** (no `VITE_API_URL`). Environment, not product; reported, never filtered, never an
  assertion input.
- **Unit d coordination (the LOCK: G-13 and G-16 on ONE commit).** The instrument is at
  **`cad51f9e`** and both modes were re-measured there. X.W1.d should run G-16 — and re-run G-13
  beside it — on d's own commit, which contains `cad51f9e`, so the two gates share one commit as the
  lock requires.
- **E13 mail**: no letter in this unit's scope; the wave's open sweep stands (0 unrowed, 0 UNREAD in
  X-W1's scope). `scripts/dev/dev.sh` untouched and unstaged throughout.

### X.W1.b

**Visual regression oracle (CC-030 · CC-029 half a) · G-8 · G-9 · G-10 · NG-11 · NG-12 ·
opus (`claude-opus-5[1m]`)** — 2026-09-17/18. Commits: **`e2347c0e`** (Commit Plan row 2,
`test(e2e/visual)` — 227 files, the suite + 207 goldens + the regeneration script, a family
that does not split) · **`c959b22e`** (row 6, evidence).

**Worktree, recorded as a DIVERGENCE, not glossed.** `W1.md:194` assigns this unit
`/Users/mkbabb/Programming/value-js-x-w1-b`. At this seat's dispatch that path did not
exist and an earlier sitting of this unit had already authored the whole suite **in the
primary tree, untracked**. Minting in a fresh worktree would have photographed a
different `node_modules` and left the primary tree's untracked set to be reconciled by
hand; the disjointness the worktree exists to protect was never at risk (`e2e/visual/**`
and `scripts/visual/**` are this unit's alone, and no sibling seat touched either — 227
untracked paths at open, 227 staged at commit). Recorded here so the departure is on the
record rather than discovered later.

#### Act 0 — the one act a mint cannot perform on itself

The suite and a 207-cell golden set existed untracked. FM-12 is *"untracked evidence is
not evidence"*, so the question was not whether they could be committed but whether they
were TRUE — and `--update-snapshots` has no baseline to disagree with, so only an ordinary
run can answer it.

⟨`npx playwright test -c e2e/visual/visual.config.ts --project=visual`⟩ → **`28 failed ·
188 passed (29.9m)`**

**None of those 207 goldens was committed.** The 28 classify to six named roots, every
one with its measured pixel count and bounding box
(`evidence/w1/visual/FIRST-MINT-VERIFICATION.md`):

| # | class | cells | root at the bytes |
|---|---|---|---|
| 1 | product entropy | **12** | `useColorGeneration.ts:24` seeds from `Math.random` at mount; 33,909–46,184 px each; **0 of 12 passed** |
| 2 | late module graph | 4 | one golden carries a dock with **no home icon** (6,230 px); three `keyboard-focus` cells red downstream (30,277 / 33,591 / 46,416 px) because one fewer focusable moves where 12 Tabs land |
| 3 | blank frames under host load | 8 | complete DOM, nothing composited, under this seat's own concurrent decode sweeps |
| 4 | **false baselines already committed** | 2 | two goldens ARE a single flat colour — the pre-mount ground, ratified as the product's appearance |
| 5 | bookkeeping | 2 | `MANIFEST.json` had never been generated |
| 6 | missing cell | 1 | `forced-colors-desktop · mix` had no golden at all (206 PNGs against a 207-cell derivation) |

Class 4, measured over all 207 on an 8-px grid: exactly those two hold **≤ 8** distinct
colours; **every other cell holds ≥ 401**. The population has nothing in between.

#### Act 1 — the cures, all at the capture, none at the bar

| cure | what it closes |
|---|---|
| `pinEntropy()` — mulberry32 at a fixed seed, on the shared `VISUAL_FIXTURE` context override so no arm can forget it | class 1. Scope measured: ⟨`grep -rn 'Math.random' demo/`⟩ → **5 rows**, 2 the generate composable, 1 a debug gate that is off, 2 pure-generator defaults |
| a second `waitForLoadState("networkidle")` after the `role=main` landmark, in `gotoRoute()` and `showPane()` | class 2 — every pane is a `defineAsyncComponent` and every dock icon a module, so those requests are issued AFTER mount |
| `requireQuiescence()` — the cap is a FAILURE | the mint-time half of class 4. The old reasoning (*"photographed anyway — and then fails loudly against its golden"*) is true on a verification run and **false on a mint run**, and that gap is exactly how the two flat goldens were made |
| `assertRendered()` — proof of life at the shutter, floors **12 descendants / 24 chars** | the DOM half of class 4. Floors measured against the real minima: 1024 → 81/185; 390 → 26/68 |
| `golden-integrity.spec.ts`'s **flat-frame** assertion over the COMMITTED bytes | the byte half of class 4 — the DOM guards refuse to take the picture; this one refuses to keep it |
| `capture.css` **Rule 2** — pin `.spectrum-dot`'s `transform` and `filter` | IC-17, below |

No `test.skip`, no allowlist, no try/catch over a defect, no widened bar, **no `demo/`
byte** — every capture input is an init script, a route mock, an injected stylesheet or a
keypress (R35's cure-shape lock). Class 3 is **RECORDED honest-RED** (IC-16c): it produces
false REDs only, never false greens.

#### Act 2 — re-mint, and the residue's TAIL

⟨`… --update-snapshots`⟩ → `214 passed · 3 failed` (the three manifest guards, mid-run) ·
⟨`--manifest-only`⟩ → 207 goldens · ⟨verification⟩ → **`216 passed · 1 failed`**.

The one failure is the reason `capture.css` grew a Rule 2: `param-sweep · hsl · 1024 ·
light` at **147 differing pixels against the 120 bar**, bbox `[441,301]–[481,342]` — one
element, `.spectrum-dot`, which is glass-ui's `<WatercolorDot animate
:cycle-duration="2000">`.

**It never settles, measured both ways.** Eight cold loads read eight different
transforms; within ONE page, t+0 / t+2 s / t+6 s read three more, with
`getAnimations()` reporting **4–5 running** throughout. `waitForQuiescence` correctly
excludes infinite animations and Playwright's `animations:"disabled"` does not still it.

**A residue whose tail crosses the bar makes the gate flaky, and a flaky gate is a gate
someone turns off.** The bar was not raised. `transform` and `filter` are pinned at
capture time — never position (`left`/`top`, measured static at `424.828px`/`32.4688px`
across all eight loads), never size, never colour. After:
⟨`VJS_VISUAL_MAX_DIFF_PIXELS=0 … -g param-sweep`⟩, double-run → **65 / 53 / 62** px,
identical both times. glass-ui untouched (READ-ONLY always).

#### Act 3 — the runs of record, double-run

| run | result |
|---|---|
| re-mint (post-Rule 2) | **217 passed** (15.2m) |
| **verification A** | **217 passed** (16.0m) |
| **verification B** | **216 passed · 1 failed** (16.2m) |
| B's failing cell, re-run | **3 consecutive passes** |

B's failure is the new guard **catching the class 3 event in the act**, printed by the
guard itself rather than inferred:

```
PROOF OF LIFE FAILED at at-rest__browse__both__1024__dark__real__… :
  main present=false, descendants=0 (floor 12), body text=0 chars (floor 24).
```

`main present=false` — the landmark `gotoRoute` had already waited for and seen visible
was **gone** by the shutter; the error context carries no page snapshot because there was
no accessible content to snapshot. Measured rate of the class across four full runs of the
cured suite: **8/216 under self-inflicted load · 0/217 · 0/217 · 1/217** (IC-16c). The
golden is correct and the event is transient. **It is not cured; it is caught** — and the
alternative, the same event at mint time silently ratified, is now structurally
impossible.

#### Act 4 — G-9's injections, run against the COMMITTED goldens

| injection | pixel gate | digest gate | flat-frame gate |
|---|---|---|---|
| **20×20** (G-9's unit, 400 px painted) | **RED — 394 px measured vs the 120 bar**; the sibling 3440 cell GREEN | **RED — ALTERED**, both digests printed | — |
| **1×1** (the sub-gate's unit) | GREEN — *that is what a 120-px tolerance MEANS* | **RED — ALTERED** | — |
| **whole frame** (the flat guard's own falsifier) | — | — | **RED — `1 distinct colour(s)`**, naming the file |

394 and not 400 because six painted pixels were already within `threshold: 0.15` of
magenta: the gate reports the MEASURED difference, not the size of the edit. After each,
⟨`--restore`⟩ then ⟨`git status --porcelain e2e/visual scripts/visual | wc -l`⟩ → **`0`**,
three times.

**The script's own two clauses, executed rather than read**: ⟨`node
scripts/visual/regenerate-goldens.mjs`⟩ on a clean tree → **exit 2**, *"DRY RUN — nothing
written"*; ⟨`… --accept`⟩ with one byte appended to `e2e/visual/tolerance.ts` → **exit 1**,
*"REFUSED — the working tree is dirty where it can change a pixel."*

**And running it is how a hole IN it was found.** `git()` returned `stdout.trim()`, which
eats the leading space of `git status --porcelain`'s first line, so `dirtyPaths()` cut one
character too many: `ocs/tranches/…`. Harmless on that tree; **not harmless in general** —
an unstaged `demo/App.vue` sorting first arrives as `emo/App.vue`, matches no
`PIXEL_RELEVANT` prefix, and the dirty-tree refusal does not fire. Cured with `gitRaw()`.

**GATE READINGS, BEFORE → AFTER**

| gate | BEFORE (open baseline, `X-W1.md:130-132`) | AFTER | basis |
|---|---|---|---|
| **G-8** — `e2e/visual/` with goldens COMMITTED, route census × 3 viewports × light/dark | **RED** — `ls e2e/visual` → *No such file or directory*; `toHaveScreenshot\|toMatchSnapshot` → **0** over 71 spec files | **GREEN** — **207 goldens committed at `e2347c0e`**; 70 at-rest public + 40 at-rest admin + 84 modality + 13 non-route, derived by `routeArmCellCount()` and asserted by `census-parity.spec.ts`, never typed. FM-12 verified at the bytes: `git check-ignore --no-index` returns 1 (not ignored) for every golden, and the script exits 4 if any is | `MANIFEST.json`; `DENOMINATOR.md` |
| **G-9** — tolerance numeric with rationale; `--accept` + dirty-tree refusal; validated by injection | **RED** — no suite, no `scripts/visual/` | **GREEN** — `maxDiffPixels: 120` · `threshold: 0.15` (TIGHTENED from 0.2), sited 1.8–2.1× above the measured 58–65-px floor and 3.3× below the 400-px injection; **validated by the injection, not by argument** (394 px → RED); refusals exit **2** and **1** | `TOLERANCE.md`; `G9-INJECTION.md` |
| **G-10** — renderer read from the LIVE browser, into every golden and the header; emulation labelled | **RED** — six closes, zero runs | **GREEN** — `renderer.ts` reads `WEBGL_debug_renderer_info` **in-page**; **207 of 207** filenames carry the slug; **179 `real` / 28 `emulated`** (R36: forced-colors and zoom-200 are chromium emulation and discharge no real-modality obligation). CC-029 half b untouched — it is X.W1.f's | `RENDERER.json`; `MANIFEST.json` |
| **G-10 · the "every push" half** | RED | **OWED TO X.W1.a, contract delivered** — `VISUAL_PROJECTS` / `VISUAL_CI_INVOCATION` / `VISUAL_CI_RUNNER` (`macos-15`, load-bearing: `{platform}` is in the golden path because text rasterisation is an OS property) are exported for one spread into `playwright.config.ts`. W1.md §Disjointness forbids this unit writing `ci.yml` or the root config | `visual.project.ts` |
| **NG-11** — the census + the non-route arms | **RED** — six shipped modality arms, the SAME five routes in each | **GREEN** — all **14** router names; `census-parity.spec.ts` re-derives the table from `router/index.ts` and `viewSchema.ts` as TEXT and reds in either direction, which is NG-11's own falsifier standing; R35's arms present: seeded-storage 3 · seeded-fixture 2 (the existing `routeBrowsePalettesDelayed`, consumed rather than re-authored) · seeded-admin 2 · overlay 2 · forced-state 1 · param-sweep 3 | `DENOMINATOR.md` |
| **NG-12** — the caveat register committed; every gate cites its caveat or states none applies | **RED** — no register in the tree | **GREEN** — 17 rows committed, with a citation index closing the clause gate by gate. R37's four inherited (IC-1..IC-4) plus this unit's, of which **IC-15/16/17 are new at this seat** | `instrument-caveats.md` |
| **R54** — the four residue-witness cells | booked, unwitnessed | **DISCHARGED, 4 of 4 named to their goldens**: RW-1 `rtl-desktop-extract-…-real` + `rtl-mobile-extract-…-real`; RW-2 `zoom-200-desktop-extract-…-**emulated**`; RW-3 the same zoom frame, discharged AS FRAME with K-7's "unscrollable" inference left dead and IC-2 named as why no casual geometry number may be taken; RW-4 three `seeded-storage-palettes-populated-…-real`. **Four more CARRIED OPEN with reasons** (O-1 real WHCM needs a Windows host · O-2 the FlagReportDialog · O-3 the `misconfigured` lamp face · O-4 IC-4's paint-time family), because R54's rule is that silence at close is not discharge | `R54-RESIDUE-WITNESS.md` |

#### Residuals, escalations, and what this unit hands on

- **NO ESCALATION.** No Triumvirate trigger fired: no write under `src/`, `demo/` or
  `api/`; no third-iteration flake loop — the two diagnostic loops that ran (the first-mint
  census, the dot's tail) each converged on their first cure, and verification B's failure
  is the **recurrence of a class already diagnosed and recorded as honest-RED**, re-confirmed
  by three green re-runs of the same cell, not a new triage.
- **RESIDUAL 1 — the class-3 blank frame is CAUGHT, not CURED** (IC-16c). Rate on a quiet
  host ≈ 1 in 217; under host load ≈ 1 in 27. Four tranche-X tracks share one machine, so
  the operational rule is recorded where a gate cannot assert it: **mint and verify with
  nothing else heavy running**. A CI run that reds here reds for a named, measured reason.
- **RESIDUAL 2 — `test-results/` is not a durable evidence surface.** It is gitignored,
  shared, and cleaned at the start of every Playwright run; a concurrent sibling track's run
  swept two diff artefacts before they could be read. Later seats: copy out what you need.
- **HAND-OFF to X.W1.a.** (i) The CI job contract above, verbatim, including `macos-15`.
  (ii) G-5's slate will see a **seventh** project named `visual`, which must have a job or
  the slate reds — that coupling is correct, not accidental. (iii) `capture.ts`'s
  `seedAdmin()` expresses `e2e/smoke/admin/fixtures/admin-auth.ts`'s seam at CONTEXT scope
  because the matrix needs it per-route; when X.W1.a owns `e2e/smoke/**` it can export the
  two constants for both callers.
- **E13 mail**: swept at this seat's clock across all four paths — `docs/tranches/V/` +
  `coordination/`, glass-ui **BK**, keyframes.js, atlas. Newest rows unchanged from the
  wave-open sweep (I-32 · I-33 · I-34, already rowed by Track D); **not one names
  `e2e/**`, `.github/workflows/**` or the visual surface**. 0 unrowed, 0 UNREAD in this
  unit's scope.
- `scripts/dev/dev.sh` untouched and unstaged throughout; both commits carry their own
  pathspec on the commit itself; no sibling seat's path entered either index.

### X.W1.d

**Deploy dependency truth (CC-034) + the `release.yml` ride-in · G-15 · G-16 ·
opus (`claude-opus-5[1m]`) · worktree `/Users/mkbabb/Programming/value-js-x-w1-d`** — 2026-09-18.
Gates read at **`2e1fd65f`**, which contains X.W1.c's `cad51f9e` (the LOCK: G-13 and G-16 on ONE
commit). Commits: **`62ccf4a1`** · **`8a7792b9`** (the §0j.F(3) ride-in, one file, verbatim) ·
**`7bc72838`** · **`2e1fd65f`** (Commit Plan row 4, `ci(deploy-pages/glass-pin)`) ·
**`01d38273`** (row 6, evidence). Full record:
`docs/tranches/X/evidence/w1/deploy-pin/G15-G16-2026-09-18.md`.

#### Act 0 — the worktree (the spec's, not yet made)

`W1.md:196` assigns this unit `/Users/mkbabb/Programming/value-js-x-w1-d`; at dispatch it did not
exist (the open baseline says so at `:170-172`). ⟨`git worktree add --detach … 7bc72838`⟩, later
⟨`git checkout --detach 2e1fd65f`⟩ when the census correction landed — **every published figure was
re-measured at `2e1fd65f`**, none inherited from the first mint. Detached, never a branch: the
commits land on `tranche-u` from the primary tree by pathspec.

#### Act 1 — the `release.yml` ride-in, this unit's FIRST commits (COHESION §0j.F(3), WO-4)

Two commits, one file, **verbatim** — replayed and then compared blob-for-blob, not re-authored:

| step | receipt |
|---|---|
| the base is the patches' own parent | ⟨`git rev-parse e2652f1c^:.github/workflows/release.yml`⟩ → `76379dda` = ⟨`git rev-parse HEAD:…`⟩ at open → `76379dda`; zero fuzz, zero conflict |
| `62ccf4a1` | blob `4d5c490e` = `e2652f1c`'s `4d5c490e` |
| `8a7792b9` | blob `4f9cd042` = `44ddaff7`'s `4f9cd042`; ⟨`git diff HEAD:… 44ddaff7:… \| wc -l`⟩ → **`0`** |

Each carries its original subject + body, `(cherry picked from commit …)`, and the session trailer.
**Recorded so the log is not misread:** the two are **not adjacent** — a Track C seat committed
`121dd4f1` between them. Four tracks share this index; the pathspec-on-the-commit discipline is what
makes that harmless.

#### Act 2 — the cure (`7bc72838`, corrected at `2e1fd65f`)

⟨`git diff --stat 7bc72838^ HEAD -- .github/workflows/deploy-pages.yml`⟩ → **52 insertions, 29
deletions**; **11 steps → 8**. Removed: the `actions/checkout` of `mkbabb/glass-ui` at its
`tranche/BG` branch (`:80`) and its build step; the keyframes.js checkout and its build step. Added:
one assertion step. `npm ci` — already present — **is** the registry install the declared `^7.0.0`
implies. The stale *"un-pin at the 5.0.0 master landing"* comment is retired and replaced by what is
true at the bytes, including why the old text was false (the waypoint was skipped; glass went
4.2.0 → 7.0.0).

⟨`git diff 7bc72838^ HEAD -- … | grep -E '^[-+]' | grep -icE 'wrangler|O-25|CLOUDFLARE'`⟩ → **`0`**,
and the same for `workflow_run|conclusion|head_branch|permissions|concurrency` → **`0`**: **the
trigger gate and the shipping half are untouched.**

Two departures, both stated rather than slipped in:

- **The keyframes.js checkout went with glass's**, though `W1.md:258-259` names only glass. Identical
  dead premise, measured by the same instrument (`@mkbabb/keyframes.js: ^6.0.0`, registry-pinned in
  the same lock), and it is what makes the amended job reproducible for G-16 **without writing into a
  sibling repo** — READ-ONLY to this seat. A stated extension of the spec's cure, never a substitute.
- **The nested-workspace layout is kept byte-for-byte**, its comment corrected. It is orthogonal to
  the provenance defect, it is the shape every recorded successful deploy ran under, and unwinding it
  is a structural change no local run can verify while X.W1.e's G-19 depends on this workflow's first
  push-arm success. **Booked as a residual for the X-W11 release close**, not left with a false
  justification.

**WRITE-THEN-MEASURE caught this seat's own error, recorded rather than quietly fixed.** `7bc72838`
wrote B13's census into the comment verbatim (*"`./blob` ×5 sites incl. `useAtmosphere.ts`"*).
Re-measured in a fresh install at the settled bytes, the six-row family has **split across two
subpaths** and the files have moved: `./blob` **2** (`demo/picker/visual/HeroBlob.vue:34,:35`) ·
`./blob-config` **3** (`demo/scenes/blob/BlobPane.vue:12,:13`,
`demo/color-picker/composables/boot/useAtmosphere.ts:36`) · `./chip` **1**
(`…/EasingSpecimenStrip.vue:14`). Fold R56's count and site list hold; the **subpath split** is what
drifted. `2e1fd65f` corrects the comment and widens the assertion to `./blob-config`, so the file's
prose and its code state the same measured thing. **B13 itself is not edited** (E-3) — this is the
dated correction beside it. Also measured: the demo imports **20** glass-ui subpaths (B13 read 18);
**20 of 20 resolve**; the 7.0.0 exports map holds **74** entries.

#### Act 3 — the amended workflow's EXACT steps, run from the file's own bytes

A driver parses `deploy-pages.yml`, takes each build step's `run:` **verbatim**, prints it and
executes it — so *"exact steps"* is a fact, not a transcription
(`deploy-pin/workflow-exact-steps-2026-09-18.txt`). The two shipping steps (wrangler, O-25) are
deliberately not run: they need CF credentials and would cut a **Production** deployment, which
would destroy X.W1.e's G-20 before/after asset-hash probe.

`rm -rf node_modules` → ⟨`npm ci`⟩ **added 438 packages**, rc 0 → ⟨assert step⟩ **exit 0** →
⟨`npm run build`⟩ `✓ built in 2.18s` → ⟨`npm run gh-pages`⟩ `✓ built in 3.29s` → `dist/gh-pages`,
**130 files** (45 JS · 17 CSS), entry `assets/index-Bzkubr2p.js`.
**DIVERGENCE recorded:** node **v26.0.0** locally against the workflow's `node-version: 24` — this
host has no node 24 toolchain (`/opt/homebrew/opt/node@24` is itself v26). The steps reproduce; the
runner's node major does not.

#### Act 4 — `./blob` and `./chip` resolve in the deploy build (the sub-gate, `W1.md:264`)

Proved twice — once by the resolver, once **in the emitted bytes of the artifact that would ship**:

| probe | reading |
|---|---|
| the workflow's assert step | `./blob` → `…/dist/blob.js` · `./blob-config` → `…/dist/blob-config.js` · `./chip` → `…/dist/chip.js` · `@mkbabb/glass-ui 7.0.0 <- https://registry.npmjs.org/…-7.0.0.tgz` · exit **0** |
| ⟨`ls -ld node_modules/@mkbabb/glass-ui`⟩ | a real directory, **not** a symlink; hidden-lockfile `link` unset |
| ⟨`grep -rl '#version 300 es' dist/gh-pages/`⟩ — the `./blob` graph's GLSL | **2 files**: `assets/HeroBlob-ATp0M0T-.js` (the async chunk of the only `./blob` importer) + the entry |
| ⟨`grep -rl 'glass-chip__remove focus-ring' dist/gh-pages/assets/`⟩ — a literal from `dist/chip-*.js` | **1 file**, `assets/_plugin-vue_export-helper-BY3JwTuk.js` |

#### Act 5 — G-15's falsifier, executed on the REAL branch bytes

`tranche/BG` re-measured at this clock: ⟨`gh api 'repos/mkbabb/glass-ui/commits?sha=tranche/BG&per_page=1'`⟩
→ **`f3f3c097`, 2026-07-11**; ⟨`gh api '…/contents/package.json?ref=tranche/BG'`⟩ → **`5.0.0`**, 93
exports entries, `./blob` · `./blob-config` · `./chip` **all false**. The step body is **extracted
from the workflow's own YAML**; each arm is a package root in the session scratchpad — **no sibling
tree is written to and no `node_modules` inside any repo is patched** (glass-ui READ-ONLY, always):

| arm | one knob | exit | message |
|---|---|---|---|
| 1 | resolution reverts to a **linked** sibling | **1** | `… is a link to file:../glass-ui — the deploy must build against the registry` |
| 2 | a non-registry resolution | **1** | `… resolved from file:/some/sibling/tree — not the registry` |
| 3 | **the branch checkout** — the real `f3f3c097` map | **1** | `ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './blob' is not defined by "exports"` |
| control | registry 7.0.0 | **0** | all three subpaths resolve |

**THE FINDING THAT CHANGES WHAT THIS DEFECT WAS — stated loud.** The branch checkout was already
**INERT**: `package-lock.json` pins the registry tarball, so `npm ci` installs 7.0.0 **regardless of
the checked-out sibling**. Measured at the strongest available witness — this worktree sits directly
beside `/Users/mkbabb/Programming/glass-ui`, whose working tree is at **9.0.0**, and `npm ci` still
resolved **7.0.0 from the registry**. So DR-22's defect is **not** *"the deploy builds against
5.0.0"*; it is (i) a **false provenance claim** in a step name (the FM-19 shape) and (ii) **wasted
runner minutes**. That is why no live red could be staged by re-adding the checkout — the measurement
*is* the finding — and why arm 3 demonstrates the falsifier's **mechanism** on the true bytes instead
of faking one. **This independently agrees with X.W1.c's withdrawal** of the pin's claim to be NV-7's
root (`X-W1.md:496-504`): a step that changes no resolution cannot be the root of a build-shape
defect. **CC-034 is not retired by that** — the provenance defect is real and is what G-15 cures.

#### Act 6 — G-16, and the paired G-13 reading on ONE commit

| run | build provenance | result |
|---|---|---|
| **G-16 run 1** | the amended workflow's exact steps | **5/8** seed cases |
| **G-16 run 2** (double-run) | the same artifact, untouched | **5/8**, same seeds |
| **G-13 (paired)** | `boot-smoke --build` at the **same commit** | **5/8**, same seeds |

`default` **PASS 4/4** on both builds; `deep-link-grey-808080`, `deep-link-lch-none`,
`deep-link-oklch-none`, `persisted-oklch-none` PASS; `deep-link-black`, `deep-link-grey-333333`,
`persisted-black` FAIL on both — the **same three** R16 hsv-powerless greys X.W1.c measured at
`cad51f9e`, seed for seed.

**The two builds are the same BYTES, not merely the same verdicts.** ⟨`find dist/gh-pages -type f |
sort | xargs shasum -a 256`⟩ over both, then ⟨`diff`⟩ → **BYTE-IDENTICAL, 130/130 files**
(`deploy-pin/artifact-sha256-2026-09-18.txt`). The paired-lock falsifier — *"passing this while G-13
is red on the same commit means the two builds differ"* — is discharged in its strongest form.
⟨`diff`⟩ of the artifact hashes before and after the probe → **IDENTICAL**: the probe does not mutate
what it measures.

**The three seed REDs are the fold's born-RED arm and are NOT masked.** R16/R17's cures are routed to
**X-W9** and **X-W5 + X-W9** (`X-W1.md:562-569`); `boot-smoke.mjs` exits non-zero and names them.
This unit added no `test.skip`, no allowlist, no try/catch, no filtered assertion, no widened bar.
Their presence is the proof the matrix discriminates: the same three, and only those three, on both
builds.

**GATE READINGS, BEFORE → AFTER**

| gate | BEFORE (open baseline, `X-W1.md:137-138`) | AFTER | basis |
|---|---|---|---|
| **G-15** — `deploy-pages.yml` resolves glass from the registry; no `ref: tranche/BG` | **RED** — `grep -n 'ref:' …` → `:80 ref: tranche/BG`; remote head re-verified **5.0.0** | **GREEN** — ⟨`grep -c 'ref: tranche/BG'`⟩ **1 → 0** · ⟨`grep -c 'repository: mkbabb'`⟩ **2 → 0**; the 2 surviving `tranche/BG` strings are **prose** recording what was retired. Registry resolution proven positively (7.0.0 ← registry tarball, not a link, 20/20 subpaths resolve) and made **structural**: the new step reds the deploy **before** the build. Read per fold R56(b)(c) on the resolution clause + the branch-checkout falsifier, **never** on the exports-map cell | `deploy-pin/G15-G16-2026-09-18.md` §2, §5 |
| **G-15 · the born-RED exports-map *citation*** | **GREEN-BEFORE-CURE** at the installed pin (open finding 1) | **unchanged, and re-measured at the pin of the day** — 7.0.0 exports `./blob` · `./blob-config` · `./chip`; the **branch head** (`f3f3c097`, 5.0.0, 93 entries) exports none of the three. R56(e)'s re-measure-at-repin clause restated for X-W0.j/X-W4.g | §3, §5 |
| **G-16** — the prod-preview probe against a build from the amended workflow's exact steps, GREEN | **RED** — never run post-pin (the pin was live) | **GREEN** on its W1.md condition — `default` **4/4** against a build made by the workflow's own step bytes; **byte-identical (130/130)** to G-13's build at the same commit; **5/8** three times | §6 |
| **G-16 · fold R16/R17 seed-matrix arm** | RED (no instrument, no post-pin build) | **BORN-RED, as the fold declares it** — 3 of 8 fail, identically on both builds; routed to X-W5/X-W9, named, unmasked | `boot-smoke-g16-run{1,2}` |

#### Residuals and escalations

- **NONE at ESCALATION level.** No Triumvirate trigger fired: no write under `src/`, `demo/` or
  `api/`; **boot-smoke prod-preview is GREEN on its condition *after* the pin landed** (the trigger
  is a RED there, which would have falsified the leading NV-7 root — X.W1.c already withdrew that
  claim on other evidence); no diagnostic loop reached a second iteration, let alone a third.
- **RESIDUAL 1 — the nested-workspace layout carries no sibling any more.** Kept byte-for-byte with a
  corrected comment; booked for the **X-W11 release close**. Act 2 states why it was not unwound here.
- **RESIDUAL 2 — the `node-version: 24` divergence** (node v26 locally). Recorded, not papered over.
- **CONSUMED, not cured — X.W1.c's R1 hand-off** (`X-W1.md:576-583`, the undeclared `gh-pages` build
  input). The amended workflow is **immune by construction**: `npm ci` runs `prepare` (which builds
  the library dist) and the explicit `Build value.js dist` step follows it, both before
  `npm run gh-pages`; this seat's runs began from `rm -rf node_modules`. The `pregh-pages` hook lives
  in `package.json`, which is **X.W1.a's** — not cured here.
- **NOT this unit's act — the repin.** ⟨`npm view @mkbabb/glass-ui version`⟩ → **9.0.0**, which does
  not satisfy the declared `^7.0.0`. X-W0.j / X-W4.g own it; R56(e) requires the exports map be
  re-measured **before** any citation of B12/B13 after it.
- **Lint cadence.** **actionlint 1.7.12 installed at this seat** (ABSENT at open) → **exit 0, 0
  findings** on both workflow files and over the whole directory, with `shellcheck` present so the
  `run:` bodies were linted too; ⟨`npx prettier --check`⟩ green on both; ⟨`git diff --check`⟩ rc 0
  before every commit. **The §Format-And-Lint fallback is refused with its reason**: `deploy-pages`'s
  only manual arm is `workflow_dispatch` and wrangler is hard-coded to `--branch=master`, so a
  scratch-branch dispatch cuts a **Production** deployment and would destroy X.W1.e's G-20
  before/after probe. Every `run:` body this unit touched was **executed** from the file's own bytes,
  which is stronger evidence than a lint.
- **HAND-OFF to X.W1.a and X.W1.e.** (i) `deploy-pages.yml` no longer checks out or builds any
  sibling; a CI job that wires the deploy-age check (WO-3, G-21) needs nothing from this file.
  (ii) X.W1.e: the trigger gate, the `if` triple, and the wrangler/O-25 steps are **byte-unchanged**,
  so G-19's push arm fires exactly as authored — what changed is only what the build links.
  (iii) `release.yml` is reconciled with `origin/master` (`8a7792b9` = `44ddaff7`'s bytes), so
  §0j.F(2)'s both-changed-path resolution has nothing left to decide there.
- **E13 mail**: four paths swept read-only at this seat's clock. The newest glass **BK** file is
  `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` — **our own outbound** (Track B's KF.W6 `.b`); the
  newest inbound rows remain **I-32 · I-33 · I-34**, rowed by Track D and routed elsewhere. **0
  unrowed · 0 new `I-n` minted · 0 UNREAD in this unit's scope**; not one row names
  `.github/workflows/**`.
- `scripts/dev/dev.sh` untouched and unstaged throughout; all five commits carry their own pathspec
  **on the commit itself**; no sibling seat's path entered any index of mine.

---

### X.W1.e — Landing and deploy-of-record (CC-033) · **`claude-opus-5[1m]`** · primary tree

*(Appended after the RESUME block's dispatch, per its §Unit plan group 4. Inserted inside
`## Unit receipts`; not one byte of a sibling unit's receipt or of the RESUME record was rewritten.)*

#### Act 0 — CRASH-RECOVERY sweep, before any other act (standing law)

⟨cmd⟩ `git status --porcelain` at `/Users/mkbabb/Programming/value.js` → 15 `M` + 10 `??`, judged
path-by-path against THIS unit's writable set. **Inherited and adopted** (ESC-W1R-1, re-homed to this
unit because a is retired): `docs/tranches/X/waves/W1-LOG.md` (92 L) ·
`docs/tranches/X/evidence/w1/baseline/g3-full-suite-2026-09-18.md` (203 L) ·
`…/baseline/typecheck-born-red-2026-09-18.md` (270 L) · `…/slate/slate-2026-09-18.md` (35 L).
Each was **read whole and judged against `W1.md` §Verification Artefacts before adoption**, and not
one byte was rewritten — each is a killed seat's authored measurement (E-3). ⟨cmd⟩
`git check-ignore -v <the four>` → rc 1 (none ignored); ⟨cmd⟩ `head -1` on each → `SERVED MODEL:
claude-opus-5[1m]`.

**Deliberately NOT adopted**, and named: `e2e/smoke/a11y-control-targets.spec.ts` and
`e2e/smoke/mobile/a11y-control-targets.spec.ts` are **product test surface, not evidence** — outside
this unit's bound, left untracked, returned to the close seat. Every other dirty path (ten
`demo/**` files, `scripts/dev/dev.sh`, the shared ledgers, Track C/D evidence trees) belongs to a
sibling seat: **untouched, never staged**. No stash, no restore, no reset, no `git add -A`.

**Commit `80fe6c75`** — 4 files, 600 insertions, clearly labelled inherited-orphan.

#### Acts 1–4 — the landing (Commit Plan row 7, unsplit)

Performed in an **isolated worktree on `master`** so the primary tree's sibling dirt was never
checked out or staged.

1. ⟨cmd⟩ `git push origin tranche-u` → `eb1b21eb..80fe6c75`; `origin/tranche-u..HEAD` → **0**.
2. ⟨cmd⟩ `git fetch origin master:master` → `6abef800..44ddaff7` — **fast-forward, 140 commits, no
   `+`**, taken FIRST as §0j.F(2) requires. **Option D (rebase) refused, never attempted.**
3. ⟨cmd⟩ `git merge --no-commit --no-ff tranche-u` → **90 conflicts** (10 `UU` · 4 `AA` · 76 `DU`;
   zero `UD`/`DD`), each checked out from `tranche-u`. **Then three more both-changed paths that git
   auto-merged CLEANLY** — `test/math.test.ts`, `…/rescued/deposed-full/src/math.ts`,
   `…/rescued/deposed-full/src/subpaths/CLAUDE.md` — were caught by diffing the merge result against
   `tranche-u` and resolved the same way. §0j.F(2) binds *both-changed* paths, not *conflicted* ones,
   and the distinction was load-bearing: the `test/math.test.ts` blend had produced a **duplicated
   `describe("lerpArray")`**, a merge artifact that would have redded `npm test` for a cause that is
   neither the pack step nor a product defect — the exact false G-17 signal `W1.md:317` forbids.
   Every other §0j.F(2) clause verified **at the blob**: the two `scripts/ci` probes `tranche-u`
   deleted are base==master (`a80e66ee`/`caa1f898`) and stay deleted · `boot-smoke.mjs` base==master
   `197be1b2`, X.W1.c's `70a5e0af` **survives** · `release.yml` base `e60230ca`, master **and**
   `tranche-u` both `4f9cd042` (unit d's `8a7792b9` confirmed identical — nothing left to decide) ·
   word (2)'s `src/v4` relocation is **the entire class** of master-side adds `tranche-u` lacks
   (measured: 13 files, nothing else) and is dropped.
   **Result**: ⟨cmd⟩ `git diff --name-status tranche-u` → **0 paths**; `master^{tree}` ==
   `80fe6c75^{tree}` == `a39ed281`. The merged tree **is** `tranche-u`'s tree.
   **Merge `04d2d808`**, parents `44ddaff7` ⊕ `80fe6c75`.
4. ⟨cmd⟩ `git push origin master` → `44ddaff7..04d2d808`, 2026-09-18T18:41:52Z.

**795 commits** — authored 234 (B16) · open sitting 559 · resume 790 · **this seat 795**.
The merge commit is **not pathspec-scoped, lawfully**: a merge commit cannot take one, the standing
law's rationale is index contamination between the four tracks, and this merge ran in an isolated
index holding nothing but itself. Every other commit of this unit carries its pathspec **on the
commit itself**.

#### Gate readings, BEFORE → AFTER

| gate | before | after | basis |
|---|---|---|---|
| **G-17** | RED (B14) | **RED — ESCALATED** | run `35381701436`; `producer` ×2 die at `npm run lint`, **`pack producer bytes` `skipped`**; structural half PASSES (step `:59`, verify `:71`, **0 live `continue-on-error`**) |
| **G-18** | RED (B16) | **GREEN** | `04d2d808`; `master..HEAD` → **0**; `merge-base --is-ancestor 80fe6c75 master` → YES |
| **G-19** | RED (B15) | **RED** | the `if` triple's success conjunct is false; **no dispatch fired** |
| **G-20** | RED (B17) | **RED** | entry still `index-D9U9KwTn.js`; **R38 settled** — production = `80c58885`, value **3.1.0**, `demo/@` **alive (227)**, glass **`file:../glass-ui`** |
| **G-21** | RED | **GREEN as gate · RED as condition** | 3 arms on the job's own extracted bytes (sha256 `e57e3f5f…`): live exit 1 · back-dated exit 1 · inverted control exit 0 |
| **NG-13** | RED | **exported-equality GREEN · currency RED** | `verify-packed-surface.mjs` exit **0**; `^export` 53 = 53 with **identical name sets**; byte delta = **25 private `_2`** vs 0 |

#### Escalations returned

- **ESC-W1E-1 — G-17/G-19/G-20 unreachable; §Triumvirate Dispatch trigger (i) met exactly.** Master
  is red after the merge for causes outside `.github/workflows/` and the pack step, and **the pack
  step is GREEN when actually run**. Roots measured at master's bytes: `npx eslint .` →
  `55 problems (23 errors, 32 warnings)`, all 23 errors `'return' outside of function` under
  `docs/**` (18 `docs/tranches/V` + **5 `docs/tranches/X` execution chassis from `69987a73`, which
  post-date a's count of 30**). `eslint.config.js` is **X-W8's** modify-carve (fold R48 BOUNDARY
  LOCK). All three routes to a green are forbidden here: the ignore is out of bounds and
  allowlist-shaped; softening fails G-2/G-17 by construction; a `workflow_dispatch` is barred by
  G-19's own falsifier and would destroy G-20's comparison. **Returned with options, not cured.**
- **ESC-W1E-2 — a's G-5 receipt is STALE, and the slate is RED on the shipped tree.**
  `slate-2026-09-18.md` records `SLATE CLEAN — 0 findings` over 80 specs at `ec654158`; the merged
  tree measures **`SLATE RED — 3 finding(s)`** over 81. Cause: `e2e/smoke/crash-battery.spec.ts` was
  added by **`a0df89d9`, X.W1.a's own LAST commit**, after its slate run. Not a merge artifact —
  master's tree hash is identical to `tranche-u@80fe6c75`'s and the concurrent run `35381213268`
  reds identically. NG-8's born-RED battery and G-5/NG-1 **collide by construction**; that is
  X.W1.a's to resolve. **G-5 not re-claimed green by inheritance.**
- **ESC-W1E-3 — G-19's anchor has drifted and reads unsatisfiable.** No `deploy-pages` run can carry
  `event: push`: the workflow's only triggers are `workflow_run` and `workflow_dispatch`, so `gh`'s
  `event` reads `workflow_run` on every gated run. Recorded at the true bytes with the satisfiable
  INTENT (a `workflow_run` run whose **triggering** `ci` run was a master push) so no later seat
  waives it or reaches for a dispatch.
- **ESC-W1R-2 / ESC-W1R-3 stand untouched**: G-7's falsifier evidence and a's per-gate receipt block
  are still owed, are X.W1.a's, and are **not** greened by this unit's adoption of a's artefacts.

#### E13 mail

Four paths swept read-only at this seat's clock (**14:46 EDT**); delta against the 14:2x RESUME
sweep = the O-26 reply alone, **already rowed I-35**. 68 rows; 7 carry `UNREAD` (O-20 · I-30 · I-31 ·
I-32 · I-33 · I-34 · I-35), classification from each row's **status cell**, never a bare
`grep -i unread`; **not one routes to X-W1**. Cross-checked by vocabulary over all four live letters
⟨cmd⟩ `grep -Eic 'deploy-pages|color\.babb\.dev|wrangler|Cloudflare|merge to master|tranche-u|rev-list|deploy-of-record|deploy age'`
→ **0 · 0 · 0 · 0**. **0 UNREAD in this unit's scope**; no status changed, no `I-n`/`O-n` minted.

#### Residuals

- `git diff --check` flags trailing whitespace at `g3-full-suite-2026-09-18.md` `:138 :146 :148 :150
  :152 :174`, every one inside a fence reproducing the Playwright reporter's own bytes. **Not
  trimmed** — altering a quoted measurement to satisfy a whitespace linter falsifies evidence.
- ⟨cmd⟩ `npm pack` was run with `--pack-destination <scratchpad>` rather than ci.yml's bare form,
  solely so no `.tgz` was left untracked in the repo; ⟨cmd⟩
  `git status --porcelain --untracked-files=all -- '*.tgz'` → empty.
- `master..tranche-u` now reads **6**, not 0: three sibling tracks committed to the shared branch
  after the merge. The durable G-18 proof is the ancestry check, not the count.
- `scripts/dev/dev.sh` untouched and unstaged throughout (CC-021). No force-push anywhere. The
  merge worktree was removed at close.

#### A finding AGAINST this seat, recorded loud (E-3) — two defects of my own

**(1) A zsh command substitution polluted commit `730aa9a8`'s message.** Its body was passed in a
double-quoted `-m` string containing backticked terms; zsh executed `` `npm run lint` `` and spliced
**eslint's entire output** into the message. The five staged paths are byte-correct and unaffected —
⟨cmd⟩ `git show --stat 730aa9a8` → 5 files, 508 insertions — but the message is not what it says it
is. **It is NOT repaired by rewrite**: `730aa9a8` is now the parent of a sibling track's commit
`00f473e7`, so amending it would re-hash theirs and break any citation of that SHA. Per E-3 the
correction is **this dated addendum-beside**; the intended message is preserved verbatim in the
amended body carried by this seat's scratchpad and restated in `W1-LOG.md`'s X.W1.e block, whose gate
table is the authoritative record of what that commit landed.

**(2) The attempted `--amend` destroyed a sibling seat's commit message, and was repaired exactly.**
Between `730aa9a8` and the amend, **Track D committed `00f473e7`** (X.P.W3 check-1). `HEAD` had
therefore moved, and `git commit --amend` rewrote **their** commit, replacing their 4-line message
with mine (producing `cb5b62f0`).

Measured before repairing, so the blast radius is stated rather than guessed:
⟨cmd⟩ `git rev-parse 00f473e7^{tree}` == `git rev-parse cb5b62f0^{tree}` == `955b2dd0` — **identical;
not one byte of their work was altered**, and both carried the same parent. Only the message was lost.

Repaired by restoring **the exact original object**, not by re-creating it: ⟨cmd⟩
`git update-ref -m "…" refs/heads/tranche-u 00f473e7 cb5b62f0` — a **compare-and-swap** ref move,
which fails safely had a sibling advanced the branch meanwhile. Chosen over a second `--amend`
precisely because an amend would have minted a *new* SHA and stranded any citation of `00f473e7`.
Preconditions checked first: `HEAD == cb5b62f0`, index-vs-HEAD **0 paths**, and `cb5b62f0` present on
**0 remote branches** (never published). After: ⟨cmd⟩ `git log --oneline -1` → **`00f473e7`** with its
own message, index-vs-HEAD **0 paths**, and the sibling seats' **16 dirty worktree paths preserved**.
**No `reset`, no `stash`, no force-push, and no byte of any sibling's tree touched at any point.**

**The lesson, stated for every later seat on this four-track branch.** The standing law's pathspec
rule protects `git commit` — **`git commit --amend` takes no pathspec and has no such protection**,
and on a shared branch `HEAD` can move between your commit and your amend. **Do not `--amend` here.**
If a message must be corrected, land a dated addendum-beside, which is what E-3 already requires.

---

## RESUME — 2026-09-18 (Track A seat 0, second sitting)

**SERVED MODEL (this seat): `claude-opus-5[1m]`.** This section is **appended, never a rewrite**:
every byte above is a killed sitting's authored record and stays exactly as it was (E-3).

### Why a resume and not an open

`LEDGER.md:29` reads **`OPEN 2026-09-17`** and `execution/A/X-W1.md` exists (964 L before this
block), so the dispatcher's RESUME branch applies. The **2026-09-18 host restart** killed the
sitting mid-flight; three unit worktrees are still on disk at their own detached heads
(⟨cmd⟩ `git worktree list` → `value-js-x-w1-c @ cad51f9e` · `value-js-x-w1-d @ 2e1fd65f`;
`value-js-x-w1-b` **already removed**).

### CRASH-RECOVERY sweep (standing law), run before any other act

⟨cmd⟩ `git status --porcelain` at `/Users/mkbabb/Programming/value.js` → 15 `M` + 10 `??`.
**Judged path-by-path against THIS seat's writable set** (`execution/A/X-W1.md` ·
`execution/LEDGER.md` · `V/coordination/INBOX.md`):

| dirty path | inside seat-0's set? | disposition |
|---|---|---|
| `demo/palettes/**` (8 files) · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` · `demo/shell/dock/layers/SlugEditLayer.vue` | **no** | a sibling seat's (X-W4's `demo/` bound). **Untouched.** |
| `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` · `V/reformation/CARRY-LEDGER.md` · `X/COHESION.md` · `X/parse-that/DIVERGENCE-LEDGER.md` | **no** | sibling tracks' shared ledgers. **Untouched, never staged.** |
| `scripts/dev/dev.sh` | **no** | CC-021, unowned, dirty by standing arrangement. **NEVER touched, never staged.** |
| `docs/tranches/X/waves/evidence/W4/**` (6 `??`) · `V/megatranche/registry/harvest/x-p-w3.json` · `X/fourier/evidence/w1/**` | **no** | Track A **W4** and Track C **F.W1** seats'. **Untouched.** |
| `e2e/smoke/a11y-control-targets.spec.ts` · `e2e/smoke/mobile/a11y-control-targets.spec.ts` | **no** (X.W1.a's bound, not seat 0's) | see **ESC-W1R-1**. |
| `docs/tranches/X/waves/W1-LOG.md` (92 L) · `X/evidence/w1/baseline/g3-full-suite-2026-09-18.md` (203 L) · `…/typecheck-born-red-2026-09-18.md` (270 L) · `…/slate/slate-2026-09-18.md` (2,618 B) | **no** (X.W1.a's bound) | see **ESC-W1R-1**. |

**Zero bytes written by this seat outside its three-path set. No stash, no restore, no reset, no
`git add -A`.**

### Unit census at the bytes — which units are landed, measured not assumed

⟨cmd⟩ `git log --oneline -300 | grep -iE 'x-v/w1\.|X·W1'`, then each artefact probed with
`git cat-file -e HEAD:<path>`:

| unit | commits on `tranche-u` | source artefact proved present at HEAD | receipt block in this record | verdict |
|---|---|---|---|---|
| **X.W1.a** | `75636b16` · `49306a1d` · `ca1a4459` · `ec654158` · `02497fcf` · `a0df89d9` (6) | `tsconfig.e2e.json` · `tsconfig.test.json` · `e2e/fixtures/palette-envelopes.ts` · `scripts/ci/oracle-slate.mjs` · `ci.yml` **365 L with jobs `producer · api · oracle-slate · e2e-smoke · e2e-safari · visual · boot-smoke · lhci · deploy-age`**, and ⟨cmd⟩ `grep -n continue-on-error .github/workflows/ci.yml` → **2 hits, both inside comments (`:26`, `:218`)** — the HARD flip is at the bytes | **absent** | **LANDED, receipt owed** (ESC-W1R-1) |
| **X.W1.b** | `e2347c0e` (the oracle + 207 goldens) · `c959b22e` · `ac3c8b92` (2 doc) | `e2e/visual/**` · `scripts/visual/regenerate-goldens.mjs` | present (`:598`) | **LANDED** |
| **X.W1.c** | `cad51f9e` (integrated) · `d677c30c` · `309981a9` | `scripts/ci/boot-smoke.mjs` | present (`:396`) | **LANDED** |
| **X.W1.d** | `7bc72838` → `2e1fd65f` (integrated) · `8a7792b9` (`release.yml` ride-in) · `01d38273` · `18bd6b0e` | `deploy-pages.yml` — ⟨cmd⟩ `grep -n 'tranche/BG' .github/workflows/deploy-pages.yml` → the only hit is `:83`, **the retired-history comment**; the live steps assert `entry.resolved` matches `^https://registry\.npmjs\.org/` and reject a `link:` | present (`:768`) | **LANDED** |
| **X.W1.e** | **none** | — | absent | **OWED** |
| **X.W1.f** | **none** | — | absent | **OWED** |

**Per the dispatcher's resume law — *a unit whose commits exist is NEVER re-dispatched* — `a`, `b`,
`c` and `d` are returned in `alreadyDone` and omitted from `groups`. Only `e` then `f` are owed.**

### Preconditions, re-verified at this sitting (not inherited)

- **`W1.md:6` — *Opens after: X-W0 (Formation) closes*.** `LEDGER.md:28` reads
  **`CLOSED 2026-09-17 (honest-RED: HG-8's literal byte-diff clause — ESC-N1)`**, X-W0.m's
  VERIFY-ONLY check at **18/18 hard · 8/8 fold GREEN**, close commit `1246f859`. **MET.**
- **Owner begin-word (2026-09-17, COHESION §0j)** — standing; publish/push/pull/deploy authorized.
- **§0i / §0j / §0k.1 / §0k.3 / §0l / §0o read to the file end.** Nothing added since the open
  sitting re-opens an X-W1 cell; the 8.0.0-vs-9.0.0 repin stays **X-W0.j / X-W4.g's**, never
  X.W1.d's (§0i, quoted in the open block above), and X.W4.g stays **CLOSED** at the 1/4 census.

### Baseline: **not re-banked**

The BEFORE baseline belongs to the open sitting and is immutable above (**19 RED · 2
MEASURE-AT-OPEN · 0 GREEN**, with the three GREEN-BEFORE-CURE findings at `:174`). Re-running it
now would measure a *cured* tree and destroy the very comparison it exists for. **Two divergences
recorded beside, for unit `e`'s gates only:**

- **B16 · 234 → 559 → 790.** ⟨cmd⟩ `git rev-list --count master..HEAD` → **790** at `69987a73`
  (the open sitting measured 559; the spec authored 234). Three tracks have committed since.
  G-18's falsifier is unchanged: the count must read **0** after the merge.
- **29 commits unpushed.** ⟨cmd⟩ `git rev-list --count origin/tranche-u..HEAD` → **29**. Unit `e`
  pushes `tranche-u` before it merges, or the merge lands code `origin` has never seen.

### E13 Step-0 — the four-path mail sweep (this sitting's own clock, 14:2x EDT)

Swept read-only and compared against **every row** of `V/coordination/INBOX.md`, classification
from each row's **status cell**, never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**);
`INBOX.md` self-excluded (SELF-COUNT law). Glass **BK** re-confirmed the newest glass tranche dir
(⟨cmd⟩ `ls -dt docs/tranches/*/ | head -6` → `BK/@2026-09-17 20:15 · BJ/ · BI/ · IOS27-MICRO/ ·
BH/ · BG/`). Delta since the 11:00 EDT X-W4-open sweep ⟨cmd⟩
`find <each path> -maxdepth 1 -type f -newermt "2026-09-18 10:55"` → exactly **two**: `INBOX.md`
(ours) and **`../glass-ui/docs/tranches/BK/coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md`@12:17
— unrowed, addressed to value.js by name**.

**ONE new `I-n` minted: `I-35`, UNREAD** (41,738 B · sha256 `9066b6607ff3…`; the O-26 reply,
every row answered by id). Its §0 carries a measurement against us — *"Your installed 7.0.0 is not
the published 7.0.0"* (our `dist/glass-ui.css` **70,109 B** vs the registry's **69,884 B**; scope
hash `data-v-87831917` vs `data-v-defd849d`) — and §4 asks two things: re-install from the
registry and re-take every banked byte figure, and confirm which CSS entry the demo imports.
**Both are Track B (X·KF) acts and neither is X-W1's.** Measured, not asserted: ⟨cmd⟩
`grep -Eic "glass-ui|node_modules|dist/glass-ui.css|data-v-|header-ribbon|TooltipContent|/timeline"
docs/tranches/X/waves/W1.md` → **6** (double-run), enumerated `:57 · :88 · :94 · :257 · :258 ·
:315`; **five are unit `d`'s `deploy-pages.yml` row** — whose cure *deletes* the source checkout in
favour of the registry install, the same direction §0 asks for — and `:88` is a
`-not -path './node_modules/*'` exclusion inside B6's `find`. **Zero** of the six name a `dist`
byte figure, a scope hash, a chunk name, `TooltipContent` or `/timeline`.

Also noted and not hidden: the letter is **untracked at glass HEAD `2113670c`** (⟨cmd⟩
`git -C ../glass-ui status --porcelain -- docs/tranches/BK/coordination/` → `?? …o26-reply.md`) —
authored on disk, not yet committed by its own side. Rowed anyway; E13 rows what is *addressed*.

**Result: 1 unrowed letter found and rowed · 1 new `I-n` (max I-34 → I-35) · 0 UNREAD in X-W1's
scope.** I-32 · I-33 · I-34 route to X-W0.j / X-EXT-1..6; I-35 routes to Track B. `INBOX.md` edit
shape ⟨cmd⟩ `git diff --numstat` → **3 insertions, 0 deletions** — append-only.

### Escalations returned by this seat (neither cured here nor buried)

- **ESC-W1R-1 — X.W1.a's seat died after its source commits and before its evidence.** Four
  authored artefacts sit **untracked** inside `a`'s own §File Bounds and **FM-12 says untracked
  evidence is not evidence**: `docs/tranches/X/waves/W1-LOG.md` (92 L, already carrying its
  `SERVED MODEL` line and the create-here/append-there LOCK), `evidence/w1/baseline/g3-full-suite-2026-09-18.md`
  (203 L), `evidence/w1/baseline/typecheck-born-red-2026-09-18.md` (270 L),
  `evidence/w1/slate/slate-2026-09-18.md` (2,618 B). Two `e2e/smoke/a11y-control-targets.spec.ts`
  files (root + `mobile/`) are likewise untracked inside `a`'s bound. **Disposition**: `a` is not
  re-dispatched, so the adoption is **re-homed to unit `e`**, which is lawful at the *spec's* own
  bounds — `W1.md` §File Bounds gives `docs/tranches/X/evidence/w1/**` to **all** units
  ("subdirectory-partitioned") and names `W1-LOG.md` in `e`'s writable set already; only this
  record's per-unit partition, written by the open seat, is crossed, and its owner is retired.
  `e` reads each file whole, judges every line against the spec, commits what conforms under a
  clearly-labelled inherited-orphan commit and **names the inherited paths in its receipt** — the
  standing CRASH-RECOVERY clause's own words. The two `e2e/` spec files are **product test
  surface**, not evidence: they stay outside `e`'s bound and are returned to the close seat.
- **ESC-W1R-2 — G-7's falsifier evidence was never written.**
  ⟨cmd⟩ `ls -la docs/tranches/X/evidence/w1/falsifier/` → **empty directory**, created 01:35 and
  never filled. `W1.md:253`/`:307` require the scratch-branch falsifier **with its red run URL**.
  G-7 is X.W1.a's gate; a retired seat cannot turn it. **Returned to the wave's close/verify seat
  as an open gate — NOT re-homed, NOT waived, and on no account marked green by inheritance.**
- **ESC-W1R-3 — X.W1.a has no receipt block in this record.** Its six commits are self-describing
  and its ci.yml/tsconfig artefacts are provable at HEAD (table above), but the per-gate BEFORE→AFTER
  transitions for G-1..G-7 and NG-1..NG-15 exist nowhere. Returned with ESC-W1R-2 to the close seat.

### Unit plan for the resume

Unchanged in substance from `## Unit plan` above; **groups 1–3 are spent**, and only the tail runs:

| group | unit | why |
|---|---|---|
| 4 | **X.W1.e** | the landing — `a`'s green-capable `ci.yml` and `d`'s reconciled `release.yml` are both at the bytes; `e` also adopts ESC-W1R-1's orphans |
| 5 | **X.W1.f** | the real-GPU arm closes last (run-or-tombstone), appending to `W1-LOG.md` after `e` |

Serial, never concurrent: both write `docs/tranches/X/waves/W1-LOG.md`.

---

## Close

**CLOSE SEAT (VERIFY-ONLY), 2026-09-18 · `claude-opus-5[1m]` · primary tree.** This seat authored
none of the wave's bytes and cured nothing. Every gate below was **re-run at this seat's own clock**
from `W1.md` §Hard Gate's own GREEN definitions; where a gate could not be re-run without replacing
a shared build artefact, the reading is marked **ADOPTED** and says whose it is — it is never
presented as this seat's measurement. E-3 throughout: not one byte of `W1.md`, of the adjudicated
registry, of any unit's receipt block, of the RESUME block or of any committed evidence file was
edited. This section and the LEDGER's own X-W1 row cells are this seat's sole writes.

**Verdict: PARTIAL.** 14 of 21 hard conditions GREEN · **7 RED** (G-1 · G-5 · G-7 · G-11 · G-17 ·
G-19 · G-20). **IMPLEMENTED is deliberately NOT stamped**, and **VERIFIED stays ✗ — X-W11's** (R-A).

### 1 · Commit roster and bounds — 23 commits, **0 landed wrong**

Every commit was proved to exist (`git log -1`) and its file list read (`git show --stat`) against
its unit's declared writable set in `## Unit plan` above.

| unit | commits | bounds verdict |
|---|---|---|
| **a** | `75636b16` · `49306a1d` · `ca1a4459` · `ec654158` · `02497fcf` · `a0df89d9` | IN — `e2e/smoke/**` (never `o9-shadow-palette.spec.ts`) · `e2e/fixtures/` · `test/**` · `demo/test/shell/**` · `tsconfig.{e2e,test}.json` · `vitest.config.ts` · `ci.yml` · `package.json` · `playwright.config.ts` · `scripts/ci/oracle-slate.mjs` · its evidence subdir |
| **b** | `e2347c0e` (227 files) · `c959b22e` · `ac3c8b92` | IN — the 227 paths of `e2347c0e` resolve to exactly three directories: `e2e/visual`, `e2e/visual/goldens/darwin`, `scripts/visual` |
| **c** | `cad51f9e` · `d677c30c` · `309981a9` | IN — `scripts/ci/boot-smoke.mjs` alone, then `evidence/w1/boot/**` + `nv-7-root.md`, then this record |
| **d** | `62ccf4a1` · `8a7792b9` · `7bc72838` · `2e1fd65f` · `01d38273` · `18bd6b0e` | IN — `release.yml` (§0j.F(3)'s dated addendum) · `deploy-pages.yml` · `evidence/w1/deploy-pin/**` · this record |
| **e** | `80fe6c75` · `730aa9a8` · `92e45233` · `f09ebddc` · `5430f971` ⊕ merge **`04d2d808`** on `master` | IN — `evidence/w1/{baseline,slate,deploy}/**` · `W1-LOG.md` · this record · `LEDGER.md` |
| **f** | **none** | **NOT DISPATCHED** — see G-11 |

⟨cmd⟩ `git show --name-only` over all 23, counting `scripts/dev/dev.sh` → **`0`**. CC-021 held by
every seat. No commit outside a unit's set; no family the spec declares unsplittable was split.

### 2 · Gate table, BEFORE → AFTER, re-run at this seat

BEFORE is the open sitting's immutable baseline (`:121-146`). AFTER is this seat's own reading.

| # | condition | BEFORE | AFTER | this seat's reading |
|---|---|---|---|---|
| **G-1** | typecheck covers `e2e/` **and passes**; zero `demo/@/lib/palette/types` refs | RED | **RED** | ⟨cmd⟩ `npm run typecheck` → **exit 2**. ⟨cmd⟩ `npx tsc -p tsconfig.e2e.json --noEmit \| grep -c 'error TS'` → **14**, **double-run 14**. **All 14 are in `e2e/visual/**`** — `capture.ts(431,52)`, `census-parity.spec.ts` ×7, `golden-integrity.spec.ts` ×3, `modality.visual.spec.ts` ×2. The *coverage* half is GREEN (`package.json:65` runs four programs incl. `tsconfig.e2e.json`, whose `include` is `e2e/**/*.ts`) and the two dangling `import type`s are cured (**no TS2307 for that module in any program**); the three surviving mentions of the path are explanatory prose at `admin-auth.ts:17`, `admin-populated.ts:14`, `palette-envelopes.ts:6`. **The gate fails on its own conjunction: the program exists and does not pass.** See LW-1 |
| **G-2** | `e2e-smoke` + `e2e-safari` HARD; no `continue-on-error`, no branch-push substitution | RED | **GREEN** | ⟨cmd⟩ `grep -nE '^    [a-z0-9_-]+:$' .github/workflows/ci.yml` → **10 jobs** (`producer:33 · api:77 · oracle-slate:102 · e2e-smoke:119 · e2e-safari:149 · visual:183 · boot-smoke:221 · lhci:255 · deploy-age:296`), 365 L. ⟨cmd⟩ `grep -n continue-on-error` → **2 hits, `:26` and `:218`, both inside comment prose**. Trigger is `push: branches: "**"` ⊕ `pull_request` — every branch, no substitution. Both jobs were dispatched on the master push run `35381701436` |
| **G-3** | the suite's real pass/fail over 185, executed and committed | MEASURE-AT-OPEN | **GREEN, run-id clause RESIDUAL** | `evidence/w1/baseline/g3-full-suite-2026-09-18.md`: commit `58d6f731`, started `2026-09-18T04:40:45.654Z`, **duration 1137.5 s**, host darwin/node v26.0.0/`@playwright/test` 1.60.0/workers 1/retries 0 — **187 collected in 72 files · 145 expected · 40 unexpected · 2 skipped · 0 flaky**, every one of the 40 classified. The falsifier's *run ID* clause is unmet **and said so in its own words** (*"LOCAL — no CI run id exists yet"*); a CI witness is now obtainable and is R-CL-10 |
| **G-4** | LHCI runs `lighthouserc.json` **unmodified**; the four budgets are the pass condition | RED | **GREEN** | `ci.yml:255-279` — `npx --yes @lhci/cli@0.15.x autorun --config=value.js/lighthouserc.json`, no flags, no overrides. ⟨cmd⟩ `git log --oneline -- lighthouserc.json` → newest **`0441abaf` 2026-07-07**; **no X-W1 commit touches it** — the re-baselining the falsifier forbids did not happen. Budgets live at `:12-15` (CLS 0.1 · LCP 2500 · INP 200 · TBT 300). On master it **executed and failed at step 6 *"assert the four budgets"*** — the gate is live and the product is over budget, which is a product RED, not a gate defect |
| **G-5** | the slate fails when a project has no CI job | RED | **RED on the shipped tree** | ⟨cmd⟩ `node scripts/ci/oracle-slate.mjs` → **`SLATE RED — 3 finding(s)`, exit 1**. The instrument itself discriminates (`projects declared: 8` = `projects invoked: 8`; 373 literal refs checked; 6 further findings correctly ROUTED to X-W8 as `eslint.config.js` dead globs, not counted against this wave). The 3 findings are **DEAD ATTRIBUTE** rows, all in `e2e/smoke/crash-battery.spec.ts` (`[data-palette-card]`, `[data-extract-swatch]`, `[data-palette-swatch]`). CI agrees: job `oracle slate` concluded **failure**. **ESC-W1E-2 confirmed at a third independent clock** |
| **G-6** | the three `test.fail()` legs each a real assertion or deleted | RED | **GREEN** | ⟨cmd⟩ `grep -rn 'test\.fail(' e2e/` → **10 rows, 0 live calls** — every hit is prose or a recorded ruling. Each named leg carries `X-W1 · G-6 RULING — test.fail() REMOVED; the assertion stands real` (o16 `:32` · o26 `:54` · o5-boot-pacing `:74`). ⟨cmd⟩ `grep -rn 'test\.skip(' <the three>` → **1 hit, o26 `:60`, prose naming `test.skip()` as the forbidden substitution**. The falsifier's failure mode did not occur |
| **G-7** | **falsifier demonstration** — a broken spec on a scratch branch reds the e2e job; run URL committed | RED | **RED** | ⟨cmd⟩ `ls -la docs/tranches/X/evidence/w1/falsifier/` → **an empty directory**, created 01:35 and never filled. No scratch commit hash, no broken-spec diff, no red run URL anywhere in the tree. **ESC-W1R-2 stands, not waived, not green by inheritance.** This is the gate whose whole function is to prove the other CI gates are not decorative |
| **G-8** | `e2e/visual/` with goldens **COMMITTED** | RED | **GREEN** | ⟨cmd⟩ `git ls-files e2e/visual \| wc -l` → **226**; ⟨cmd⟩ `git ls-files 'e2e/visual/goldens/**/*.png' \| wc -l` → **207**. FM-12 satisfied at the index, not asserted |
| **G-9** | tolerance numeric with rationale; `--accept` + dirty-tree refusal; validated by injection | RED | **GREEN** | `e2e/visual/tolerance.ts:118` `maxDiffPixels: tightenedMaxDiffPixels()` · `:120` `threshold: 0.15`, rationale `:14-81`. `G9-INJECTION.md` carries the validation by **measurement** — a 20×20 injection measured **394 px against the 120 bar** (RED), the 1×1 GREEN *because that is what 120 px means*, the whole-frame RED on the flat guard |
| **G-10** | renderer read from the **live** browser into every golden and the header | RED | **GREEN** | ⟨cmd⟩ `git ls-files 'e2e/visual/goldens/**/*.png' \| grep -c 'real\|emulated'` → **207 of 207**. `visual` is a job at `ci.yml:183`, on every push (G-2's trigger) |
| **G-11** | the real-GPU session ran **or** the row is RETIRED with a dated tombstone | RED | **RED — the forbidden third state** | ⟨cmd⟩ `ls docs/tranches/X/evidence/w1/real-gpu` → **`No such file or directory`**; ⟨cmd⟩ `git ls-files docs/tranches/X/evidence/w1/real-gpu \| wc -l` → **0**. No frames, no signed checklist, **and no `TOMBSTONE.md`**. **X.W1.f was never dispatched.** The gate admits exactly two terminal states and the row sits in neither — it sits in *"owed"*, which is the seventh carry DR-07's archaeology exists to refuse. **This is the wave's single cheapest RED to close and the one it must not carry** |
| **G-12** | `boot-smoke --mode=dev` passes the four assertions on a cold dev boot | RED | **GREEN — re-run here** | ⟨cmd⟩ `node scripts/ci/boot-smoke.mjs --mode=dev --seed=default` → `dev: 1/1 seed cases passed`. A1 `#app` 6 element children `[DIV,DIV,SPAN,DIV,DIV,DIV]` · A2 1 landmark `[Color tool panes]` · A3 `[]` · A4 **47 desktop utility rule(s) across 33 sheet(s)**. The fold's R16/R17 seed-matrix arm remains **BORN-RED as the fold declares it** (2/8), routed X-W5/X-W9, unmasked |
| **G-13** | `--mode=prod-preview` at a bare `127.0.0.1`, four assertions | MEASURE-AT-OPEN | **GREEN — ADOPTED (X.W1.c ⊕ X.W1.d)** | `default` **4/4** at `cad51f9e` and again at `2e1fd65f`; origin form **checked** (sub-path → exit 1; `localhost` → exit 1). **Not re-measured at this seat by design**: `npm run gh-pages` replaces the untracked `dist/` that `test/**` binds to and that other Track A seats read (WO-5's own stated reason). Adopted, and named as adopted |
| **G-14** | NV-7 re-classed RED, root **named**, differentially evidenced | RED | **GREEN** | `evidence/w1/nv-7-root.md` tracked at `d677c30c`. Root: the Vue bootstrap was an **inline `<script type="module">`** that Vite's production build does not traverse as an entry — 698 B shell, application graph and stylesheet dropped. Differential, one knob: 122 vs 63 assets · 539,078 B vs 698 B entry · prod-preview `1/1 PASS` vs `0/1 FAIL` · **dev PASS on both arms**. Two rival claims falsified rather than dropped |
| **G-15** | `deploy-pages.yml` resolves glass from the registry; no `ref: tranche/BG` | RED | **GREEN** | ⟨cmd⟩ `grep -n 'tranche/BG\|repository: mkbabb' .github/workflows/deploy-pages.yml` → **one hit, `:83`, inside the retired-history comment**; **zero** sibling checkouts remain. Resolution is made structural — the new step reds the deploy before the build if `entry.resolved` is not a registry URL |
| **G-16** | the prod-preview probe against a build from the amended workflow's **exact** steps | RED | **GREEN — ADOPTED (X.W1.d)** | the workflow's `run:` bodies were parsed out and **executed**, not transcribed; `default` 4/4; the G-16 and G-13 artefacts are **byte-identical, 130/130 files**, so the paired-lock falsifier is discharged in its strongest form. Adopted for the same `dist/` reason as G-13 |
| **G-17** | the `ci` workflow is **green on `master`**, the pack step present | RED | **RED** | master run **`35381701436`** (`event: push`, `head_sha 04d2d808`): `producer / Node 22` **failure** and `/ Node 24` **failure**, both at **step 5 `npm run lint`**; steps 6-10 — `build`, `typecheck`, `test`, **`pack producer bytes`**, **`verify packed runtime and strict declarations`** — all **`skipped`**. Also `oracle slate` failure · `lhci` failure · `deploy-age` failure · `api / Node 22` **success**; `e2e-smoke`, `e2e-safari`, `visual`, `boot-smoke` still **in_progress** at this seat's clock. Lint reproduced here: ⟨cmd⟩ `npx eslint . --max-warnings=0` → **`✖ 55 problems (23 errors, 32 warnings)`**, matching ESC-W1E-1 exactly. **NEW AT THIS SEAT — the escalation names one root and there are two**: `npm run typecheck` is **step 7 of the same job**, and it fails independently (G-1's 14 errors). Curing the lint root alone **does not** green `producer`. See R-CL-5 |
| **G-18** | `tranche-u` merged to `master` | RED | **GREEN** | ⟨cmd⟩ `git merge-base --is-ancestor 80fe6c75 master` → **YES**. Merge **`04d2d808`**, parents `44ddaff7` ⊕ `80fe6c75`. The durable form, not the count — three sibling tracks have committed to the shared branch since |
| **G-19** | ONE `deploy-pages` run `success` · `event: push` · `head_branch: master`, dated in this wave | RED | **RED** | ⟨cmd⟩ `gh run list --workflow deploy-pages.yml --limit 100 --jq '[.[]\|select(.conclusion=="success")]'` → **4 successes ever, all 2026-07-05/07**: three `workflow_dispatch` and **one `workflow_run`** (`28724805140`, 2026-07-05). **Zero in this wave.** The ten newest runs are all `skipped`/`workflow_run`, four of them minted today after the merge. **ESC-W1E-3 corroborated independently**: no run can carry `event: push` because the workflow's only triggers are `workflow_run` and `workflow_dispatch` — the historical `workflow_run` success proves the satisfiable INTENT is the right reading, and no seat may reach for a dispatch |
| **G-20** | `color.babb.dev` serves v4 code | RED | **RED** | ⟨cmd⟩ `curl -s https://color.babb.dev/ \| grep -oE 'assets/[^"]+\.js'` → **`assets/index-D9U9KwTn.js`** · `rolldown-runtime-QTnfLwEv.js` · `glass-ui-CShs8agU.js` — **byte-identical to B17's 2026-08-03 authoring reading**. Blocked behind G-19, which is blocked behind G-17 |
| **G-21** | a standing check reds when the last successful deploy predates the newest close | RED | **GREEN as a gate** | the `deploy-age` job **ran live on master** and printed, from its own bytes: `newest successful deploy : 2026-07-07T02:19:20Z [gh run list …]` · `newest recorded close : 2026-09-18T14:36:11-04:00 [git log -- docs/tranches]` · **`FAIL — production is older than the newest close by 73 day(s)`** → exit 1. **Both override inputs were empty** (`VJS_DEPLOY_AGE_DEPLOY_OVERRIDE:` / `VJS_DEPLOY_AGE_CLOSE_OVERRIDE:` blank in the step env) — both sides were *measured*, and it still reds. *"A check that only reports and never fails"* is refuted at the run log. The **condition** stays RED, which is the gate doing its job |
| **NG-13** | packed-surface equality (exported surface, never bytes) | RED | **SPLIT — ADOPTED (X.W1.e)** | exported-equality GREEN (`verify-packed-surface.mjs` exit 0; `^export` 53 = 53 with identical name sets; the byte delta is **25 private `_2` declarations**, R41's dissent vindicated); currency RED. Adopted as recorded, not re-run |

**Totals at this close: 21 conditions · 14 GREEN · 7 RED · 0 unmeasured.**
Two of the fourteen (G-13, G-16) are ADOPTED with their owners named; twelve were re-run here.

### 3 · Landed-wrong

**Bounds: 0.** No commit wrote outside its unit's writable set; `scripts/dev/dev.sh` appears in
**0 of 23**; `e2e/smoke/oracles/o9-shadow-palette.spec.ts` (X-W7's) was touched by nobody;
`lighthouserc.json`, `src/`, `api/` and `vite.config.ts` hold **0** W1 commits.

Two defects nevertheless landed, neither a bounds breach:

- **LW-1 · the cross-unit typecheck gap (the cause of G-1 RED).** `e2e/visual/**` landed at
  `e2347c0e` (**00:03:12**); `tsconfig.e2e.json`, whose `include` is `e2e/**/*.ts`, landed at
  `75636b16` (**01:33:05**) — ninety minutes later. Unit b's files were therefore pulled into a
  program that did not exist when they were authored, and **unit a could not cure them**: §Disjointness
  gives `e2e/visual/**` to b alone. The 14 diagnostics are **present verbatim in a's own committed
  born-RED baseline** (`typecheck-born-red-2026-09-18.md:144-164`), and that file has **no AFTER
  section** — so the *"and passes"* half of G-1 was never measured by any seat of this wave. The
  defect is a dispatch gap wearing a gate number, exactly the shape X-W2's check-1 named. Owner:
  see R-CL-1.
- **LW-2 · `730aa9a8`'s commit message is not what it says it is.** A zsh command substitution
  spliced eslint's output into the body. The five staged paths are byte-correct
  (⟨cmd⟩ `git show --stat 730aa9a8` → 5 files, 508 insertions). **It is not repairable**: the commit
  is the parent of a sibling track's `00f473e7`. E-3's correction is the dated addendum-beside that
  X.W1.e already wrote at `:1085-1118`, together with that block's standing lesson —
  **`git commit --amend` takes no pathspec and must not be used on this four-track branch.**

### 4 · E13 mail — swept again, at this seat's clock

Four paths re-swept read-only. ⟨cmd⟩ `find <each> -maxdepth 1 -type f -newermt "2026-09-18 14:46"`
→ **empty across all four** — nothing has arrived since X.W1.e's sweep. Glass **BK** re-confirmed the
newest glass tranche dir (⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/ · BJ/ · BI/`).
`INBOX.md` holds **68 rows**; classification taken from each row's **status cell**, never a bare
`grep -i unread`: **7 carry UNREAD** — `O-20` (our own outbound, SENT) · `I-30` · `I-31` · `I-32` ·
`I-33` · `I-34` · `I-35`. Their routing is unchanged and none of it is X-W1's: I-30/I-32/I-33/I-34 →
X-W0.j / X-EXT-1..6 · I-31 → atlas/sci · I-35 → Track B (X·KF).
**0 unrowed · 0 new `I-n`/`O-n` minted by this seat · 0 UNREAD in X-W1's scope.** E13's close
condition is met. `INBOX.md` was not written.

### 5 · Four-verb line

| verb | state at this close | basis |
|---|---|---|
| AUDITED | **YES** (unmoved) | `registry/DISEASE-REGISTRY.md` DR-07..DR-11, DR-22 |
| SPECIFIED | **YES** (unmoved) | `waves/W1.md` ⊕ `refinement/X-W1-FOLD.md` |
| **IMPLEMENTED** | **NOT STAMPED — the wave stays PARTIAL** | `W1.md` §Commit Plan row 8 advances this verb *at a close whose gates are green*. Seven are RED, one of them (**G-7**) being the gate that exists to prove the rest are not decorative and another (**G-11**) sitting in the third state its own gate forbids. Stamping IMPLEMENTED here would be the U-era `G-CLOSE-4` defect this tranche was formed to kill: making the *naming* of an obligation its discharge |
| VERIFIED | **✗** | X-W11's release close alone (R-A). Never this wave's seat |

`W1.md` is a dated spec and is **outside every unit's §File Bounds**; its §State table is therefore
**not edited** (E-3). The verb state of record is this table and the LEDGER row.

### 6 · Residuals, each with a named owner

| # | residual | owner |
|---|---|---|
| **R-CL-1** | **G-1 RED** — 14 `error TS` in `e2e/visual/**`, double-run. The paths belong to **X.W1.b**, whose seat is retired, and to **no open unit's writable set at this clock**. One in-bounds redispatch of b's `e2e/visual/**` closes it; it is not X-W8's and not a lint question | **orchestrator** (redispatch X.W1.b's bound), else X-W11's release battery |
| **R-CL-2** | **G-7 never demonstrated** (ESC-W1R-2) — `evidence/w1/falsifier/` is an empty directory. Not waived, not green by inheritance | **orchestrator** (redispatch X.W1.a's falsifier limb) |
| **R-CL-3** | **G-11 in the forbidden third state** — X.W1.f never dispatched; neither frames nor `TOMBSTONE.md`. The tombstone arm is **one commit** and needs no owner session | **orchestrator** — dispatch X.W1.f, or write the dated tombstone quoting DR-07's chain |
| **R-CL-4** | **G-5 RED on the shipped tree** (ESC-W1E-2) — 3 dead-attribute rows, all from `e2e/smoke/crash-battery.spec.ts` (`a0df89d9`, a's own last commit). NG-8's born-RED battery and G-5/NG-1 collide **by construction**; the slate is right and the battery is right, and the collision is a design question no seat has ruled | **X.W1.a's surface / orchestrator** |
| **R-CL-5** | **G-17 has two roots, not one.** ESC-W1E-1 names the lint root (23 `'return' outside of function` parse errors under `docs/**`; `eslint.config.js` is **X-W8's** modify-carve, fold R48 BOUNDARY LOCK). The second is R-CL-1: `npm run typecheck` is step 7 of the same job. **Both must fall before `producer` can go green**, and only then can `pack producer bytes` run at all | **X-W8** (lint config) ⊕ **R-CL-1's owner** (typecheck) |
| **R-CL-6** | **G-19 · G-20 are strictly downstream of G-17** and cannot be reached from X-W1's writable set. ESC-W1E-3's anchor correction stands on the record so no later seat waives G-19 or cuts a Production deployment by `workflow_dispatch` to manufacture one | **orchestrator / X-W11** |
| **R-CL-7** | **X.W1.a has no receipt block** (ESC-W1R-3) — its six commits are self-describing and its artefacts provable at HEAD, but the per-gate BEFORE→AFTER transitions for G-1..G-7 and NG-1..NG-15 exist nowhere. This close's §2 supplies the AFTER readings for G-1..G-7 only | **orchestrator** |
| **R-CL-8** | `e2e/smoke/a11y-control-targets.spec.ts` and `e2e/smoke/mobile/a11y-control-targets.spec.ts` remain **untracked** (⟨cmd⟩ `git ls-files` → 0 · `git status --porcelain e2e/` → two `??`). They are **product test surface inside X.W1.a's bound**, correctly not adopted by e as evidence. Left untracked by this seat too — a VERIFY-ONLY seat does not mint product test surface | **X.W1.a's surface / orchestrator** |
| **R-CL-9** | `730aa9a8`'s polluted message (LW-2) — corrected by addendum-beside, unrepairable by rewrite | closed as recorded (E-3) |
| **R-CL-10** | **Four CI jobs were still `in_progress`** on run `35381701436` at this seat's clock — `e2e-smoke`, `e2e-safari`, `visual`, `boot-smoke`. Their **first-ever verdicts on master** are owed, and they are the second witness G-3's own evidence names for its run-id clause | **the next seat to read run `35381701436`** |
| **R-CL-11** | The three **R16/R17 seed-matrix REDs** (dev 2/8, prod-preview 5/8) and unit d's two residuals (the nested-workspace layout; the `node-version: 24` vs local v26 divergence) are carried as recorded, unmasked | **X-W5 · X-W9** (seeds) ⊕ **X-W11** (layout) |

### 7 · Escalations standing at close

**ESC-W1E-1** (G-17/G-19/G-20 unreachable; §Triumvirate Dispatch trigger (i) met) — **stands, and is
WIDENED by this seat**: the trigger's premise is confirmed at a second clock and the root count is
corrected from one to two (R-CL-5). **ESC-W1E-2** (a's G-5 receipt stale; slate RED on the shipped
tree) — **stands, confirmed at a third clock by this seat's own run**. **ESC-W1E-3** (G-19's anchor
unsatisfiable as written; the satisfiable INTENT recorded) — **stands, and is corroborated**: the
only `workflow_run` success in the fetched window (`28724805140`) proves the INTENT reading is the
right one. **ESC-W1R-2** (G-7's falsifier) and **ESC-W1R-3** (a's receipt block) — **stand, untouched,
not greened by any adoption**. **ESC-W1R-1** — **DISCHARGED** at `80fe6c75`.

**New at this close: none at ESCALATION level.** No Triumvirate trigger fired at this seat — it wrote
no `src/`, `demo/`, `api/`, `e2e/` or workflow byte, and ran no diagnostic loop. The one trigger that
is live (i) was already returned by X.W1.e and is returned again here, widened rather than absorbed.

### 8 · What this close did not do

It cured nothing — not G-1's 14 diagnostics, not the slate's 3 findings, not the lint root, and it
minted no tombstone for G-11. **No gate was softened to reach a green**: no `continue-on-error` was
added, no allowlist written, no `test.skip()` minted, no bar widened, no `docs/**` ignore added to
`eslint.config.js` (X-W8's carve), and **no `workflow_dispatch` was fired** — which would have cut a
Production deployment against a hard-coded `--branch=master` and destroyed G-20's before/after probe
for every later seat. Seven REDs are returned as seven REDs, each with an owner.

---

## Check 1

**FRESH ADVERSARIAL PASS (L-20, pass 1) · 2026-09-18 · `claude-opus-5[1m]` · VERIFY-ONLY, primary
tree.** This seat authored none of the wave's bytes, cured nothing, and inherited no reading: every
figure below was re-measured at this seat's own clock from the spec's own gate commands. E-3
throughout — not one byte of `W1.md`, `X-W1-FOLD.md`, the runbook, the adjudicated registry, any
unit receipt block, the RESUME block, the Close, or any committed evidence file was edited. This
section and the LEDGER's own X-W1 row cells are this seat's sole writes.

**VERDICT: NOT-CONFORMANT.** Not one claimed GREEN failed to reproduce, no write landed outside
§File Bounds, no masking fallback exists anywhere in the diff, E-3 prints nothing and E13 is clean —
but **three of the seven REDs carry NO relief under the spec's own bytes** (**G-7 · G-11 · G-1**),
and with them **§Goal criterion is unmet at the bytes**. The row is **NOT promoted**; **PARTIAL 
stands**.

### C1.1 · Reproduction — 19 of 21 conditions re-run here, 0 divergences of verdict

| gate | close's AFTER | this seat's own command → output | verdict |
|---|---|---|---|
| G-1 | RED | ⟨`npx tsc -p tsconfig.e2e.json --noEmit \| grep -c 'error TS'`⟩ → **14**, **double-run 14**; by file: `capture.ts` **2** · `census-parity.spec.ts` **7** · `golden-integrity.spec.ts` **3** · `modality.visual.spec.ts` **2**. ⟨`grep -rn 'demo/@/lib/palette' e2e/`⟩ → **3 rows, all explanatory prose** (`admin-populated.ts:14` · `admin-auth.ts:17` · `palette-envelopes.ts:6`), **0 live imports** | **REPRODUCES** |
| G-2 | GREEN | ⟨`grep -nE '^    [a-z0-9_-]+:$' ci.yml`⟩ → 11 lines = `push:4` `pull_request:7` ⊕ **9 jobs** (`producer:33 api:77 oracle-slate:102 e2e-smoke:119 e2e-safari:149 visual:183 boot-smoke:221 lhci:255 deploy-age:296`), 365 L; ⟨`grep -n continue-on-error`⟩ → **2, both comment prose (`:26`, `:218`)**; trigger `push: branches: "**"` ⊕ `pull_request` — no branch substitution. Both jobs dispatched on the master push run | **REPRODUCES** (figure divergence: the close says *"10 jobs"*; there are **9** — see D-6) |
| G-3 | GREEN, run-id RESIDUAL | artifact at the bytes: `58d6f731` · started `2026-09-18T04:40:45.654Z` · duration `1137.5 s` · **187 / 145 expected / 40 unexpected / 2 skipped / 0 flaky**, all 40 classified; run-id cell reads *"LOCAL — no CI run id exists yet"* in its own words | **REPRODUCES** (by artifact; the 19-min suite not re-run here) |
| G-4 | GREEN | `ci.yml:255-279` — `npx --yes @lhci/cli@0.15.x autorun --config=value.js/lighthouserc.json`, no flags, no overrides; ⟨`git log --oneline -- lighthouserc.json`⟩ → newest **`0441abaf`**, **0 X-W1 commits** touch it | **REPRODUCES** |
| G-5 | RED | ⟨`node scripts/ci/oracle-slate.mjs`⟩ → **`SLATE RED — 3 finding(s)`**, ⟨`echo $?`⟩ → **1**; `projects declared: 8` = `projects invoked: 8`; 373 literal refs; **6 routed to X-W8**, not counted; the 3 are DEAD ATTRIBUTE rows in `e2e/smoke/crash-battery.spec.ts` | **REPRODUCES** |
| G-6 | GREEN | ⟨`grep -rn 'test\.fail(' e2e/`⟩ → **10 rows, 0 live calls**. Assertions not narrowed, **widened**: ⟨`git show --numstat ec654158`⟩ → o16 **14+/13−**, o26 **14+/10−**, o5 **13+/8−**; ⟨`grep -c 'expect('`⟩ → 26 · 4 · 4 | **REPRODUCES** |
| G-7 | RED | ⟨`ls -la docs/tranches/X/evidence/w1/falsifier/`⟩ → **`total 0`** (empty, created 01:35); ⟨`git ls-files .../falsifier \| wc -l`⟩ → **0**. No scratch hash, no broken-spec diff, no red run URL anywhere | **REPRODUCES** |
| G-8 | GREEN | ⟨`git ls-files e2e/visual \| wc -l`⟩ → **226**; ⟨`git ls-files 'e2e/visual/goldens/**/*.png' \| wc -l`⟩ → **207** | **REPRODUCES** |
| G-9 | GREEN | `tolerance.ts:105` `MAX_DIFF_PIXELS = 120` · `:120` `threshold: 0.15`, rationale `:14-81`; `G9-INJECTION.md:67` *"394 pixels … are different"* against the 120 bar. **The env override can only TIGHTEN**: `:113 return Math.min(parsed, MAX_DIFF_PIXELS)` — a loosening input is clamped away | **REPRODUCES** |
| G-10 | GREEN | ⟨`git ls-files 'e2e/visual/goldens/**/*.png' \| grep -c 'real\|emulated'`⟩ → **207 of 207**; `visual` is a job at `ci.yml:183` under G-2's every-branch trigger | **REPRODUCES** |
| G-11 | RED | ⟨`ls docs/tranches/X/evidence/w1/real-gpu`⟩ → **`No such file or directory`**; ⟨`git ls-files …/real-gpu \| wc -l`⟩ → **0**. No frames, no checklist, **no `TOMBSTONE.md`** | **REPRODUCES** |
| G-12 | GREEN | ⟨`node scripts/ci/boot-smoke.mjs --mode=dev --seed=default`⟩ at this seat → **`dev: 1/1 seed cases passed`**; A1 `#app` **6** children `[DIV,DIV,SPAN,DIV,DIV,DIV]` · A2 **1** landmark `[Color tool panes]` · A3 `[]` · A4 **47 desktop utility rule(s) across 33 sheet(s)** — identical to the close, at a third clock | **REPRODUCES** |
| G-13 | GREEN (ADOPTED) | **not re-run here, and not re-claimed**: `npm run gh-pages` replaces the untracked `dist/` that `test/**` binds to (WO-5). The close's ADOPTED label is honest and its owner (X.W1.c ⊕ X.W1.d) is named | **ADOPTED, label upheld** |
| G-14 | GREEN | ⟨`git ls-files docs/tranches/X/evidence/w1/nv-7-root.md`⟩ → TRACKED at `d677c30c`; the differential's one knob and both arms are in the committed bytes | **REPRODUCES** |
| G-15 | GREEN | ⟨`grep -n 'tranche/BG\|repository: mkbabb' deploy-pages.yml`⟩ → **one hit, `:83`, inside the retired-history comment**; zero sibling checkouts | **REPRODUCES** |
| G-16 | GREEN (ADOPTED) | not re-run, same `dist/` reason; owner X.W1.d named | **ADOPTED, label upheld** |
| G-17 | RED | ⟨`gh run view 35381701436`⟩ at this seat → `status: in_progress`; `producer / Node 22` **failure** · `producer / Node 24` **failure** · `oracle slate` **failure** · `lhci` **failure** · `deploy-age` **failure** · `api / Node 22` **success**; `e2e-smoke`, `e2e-safari`, `visual`, `boot-smoke` **still in_progress** (R-CL-10 still owed) | **REPRODUCES** |
| G-18 | GREEN | ⟨`git merge-base --is-ancestor 80fe6c75 origin/master`⟩ → **YES**; ⟨`git log -1 --format='%H %P' origin/master`⟩ → `04d2d808` ← `44ddaff7` ⊕ `80fe6c75` | **REPRODUCES** |
| G-19 | RED | ⟨`gh run list --workflow deploy-pages.yml --limit 100 … select(.conclusion=="success")`⟩ → **4 ever**: `28836880612` · `28836569824` · `28723903374` (all `workflow_dispatch`) ⊕ `28724805140` (`workflow_run`, 2026-07-05). **0 in this wave** | **REPRODUCES** |
| G-20 | RED | ⟨`curl -s https://color.babb.dev/ \| grep -oE 'assets/[^"]+\.js'`⟩ → **`assets/index-D9U9KwTn.js`** (+ `rolldown-runtime-QTnfLwEv.js`, `glass-ui-CShs8agU.js`) — byte-identical to B17 | **REPRODUCES** |
| G-21 | GREEN as gate | job log `105719150925` read at the API: `VJS_DEPLOY_AGE_DEPLOY_OVERRIDE:` and `VJS_DEPLOY_AGE_CLOSE_OVERRIDE:` **both blank**, then `newest successful deploy : 2026-07-07T02:19:20Z` · `newest recorded close : 2026-09-18T14:36:11-04:00` · **`FAIL — production is older than the newest close by 73 day(s)`**, job concluded **failure**. Both sides measured, and it reds | **REPRODUCES** |

**19 of 21 re-measured at this seat (17 by command, G-3 and G-9 at their committed artifacts);
G-13 and G-16 left ADOPTED with their owners named, exactly as the close presented them.
Divergences of verdict: 0. The close's 14/21 GREEN · 7 RED split is TRUE at the bytes.**

### C1.2 · Bounds — 23 commits, 325 distinct paths, 0 outside

⟨`git show --name-only --format=` per commit, unioned⟩ → **325** paths. Non-`e2e/` · non-`docs/X` ·
non-`scripts/{ci,visual}` · non-`test/` members, each read against its grant:

| path | grant |
|---|---|
| `.github/workflows/ci.yml` · `deploy-pages.yml` | `W1.md` §File Bounds, `modify` |
| `.github/workflows/release.yml` | **COHESION §0j.F(3)** read at the bytes: *"`.github/workflows/release.yml` joins X-W1's bounds by dated E-3 addendum"* |
| `package.json` | scripts-block carve **held at the diff**: ⟨`git show ec654158 -- package.json`⟩ → **6 insertions / 2 deletions, every line inside `"scripts"`** |
| `playwright.config.ts` · `tsconfig.e2e.json` | `W1.md` §File Bounds |
| `tsconfig.test.json` · `vitest.config.ts` · `test/**` | **fold §3 BoundsDelta** entries 32–34 ⊕ **THE STRIKE** (WO-1, minuted at open) |
| `demo/test/shell/*.test.ts` (3) | fold §3 entry **35**, *"a `demo/test/` carve, not product source, and is declared as such"* |

⟨union grep⟩ → `scripts/dev/dev.sh` **0** · `e2e/smoke/oracles/o9-shadow-palette.spec.ts` **0** ·
`src/` **0** · `api/` **0** · `lighthouserc.json` **0** · `vite.config.ts` **0** ·
`eslint.config.js` **0**. ⟨per-commit grep for `parse-that|COHESION|DEFECT-LEDGER|execution/D/`⟩ →
**0 hits in all 23** — no sibling track's path entered any X-W1 index. **Bounds: CLEAN.**

### C1.3 · Masking — none, and the near-misses were read rather than assumed

⟨union of the twelve code-bearing commits, added lines only⟩: `test.skip(` **0 live** (every hit is
prose naming it as the forbidden substitution) · `test.only` **0** · `continue-on-error` **0 outside
comments** · allowlist **0** · patched `node_modules` **0** · copied producer selector **0** ·
narrowed assertion **0** (the three `test.fail()` rulings each ADD more than they remove, C1.1 G-6).
Four constructs were examined at the bytes rather than pattern-matched:

1. **`oracle-slate.mjs`'s two `catch (err)`** → `process.exit(2)` both times. A failure to load the
   config or collect a project **reds**, it does not skip.
2. **`boot-smoke.mjs`'s `catch`** at the seed loop → `record = { …, pass: false, harnessError }`. A
   thrown probe is a FAILING case, never a silent pass; `context.close().catch(() => {})` is teardown.
3. **`tolerance.ts`'s env override** → `Math.min(parsed, MAX_DIFF_PIXELS)`: the bar can be tightened
   from the environment and **cannot be loosened**. The one mechanism that could have absorbed G-9 is
   structurally one-way.
4. **`o3-headed-gpu-probe.spec.ts:44`'s conditional `test.skip`** → pre-dates this wave
   (⟨`git log -- e2e/smoke/oracles/o3-headed-gpu-probe.spec.ts`⟩ → `120970f0`, T.W0). Not this
   wave's byte; named in `ec654158`'s own body rather than left to be found.

One MINOR construct is recorded below as **D-8**.

### C1.4 · Commit families

Row 1 whole at **`75636b16`** (`tsconfig.e2e.json` ⊕ `tsconfig.test.json` ⊕
`e2e/fixtures/palette-envelopes.ts` ⊕ the fixture cures, 25 files) · row 2 whole at **`e2347c0e`**
(227 files) · row 3 whole at **`cad51f9e`** (1 file) · row 5 whole at **`ec654158`** (7 files) ·
row 7 = merge **`04d2d808`** · row 8 = close **`91b74e43`**. Row 4 landed in **two** commits
(`7bc72838` → `2e1fd65f`), the second being the disclosed WRITE-THEN-MEASURE correction of the
first's census comment — **INFO, not a split of meaning** (D-9). Row 6's evidence is partitioned
per unit, which is what §Disjointness's *"`docs/tranches/X/evidence/w1/**` … subdirectory-partitioned"*
requires of six concurrent seats. **No declared-unsplittable family was split.**

### C1.5 · E-3

⟨`git diff --stat a8d9af99..HEAD -- docs/tranches/X/waves/W1.md docs/tranches/X/refinement/X-W1-FOLD.md docs/tranches/X/EXECUTION-RUNBOOK.md`⟩ → **prints nothing**. The 325-path union contains
**0** `waves/W*.md`, **0** `registry/adjudicated/**`, **0** `refinement/**`, **0** conformance
artefacts. (`registry/adjudicated/**` did move inside that commit range — ⟨`git log --oneline
a8d9af99..HEAD -- …/adjudicated/`⟩ → `a94bc452`, `429bf48b`, **both Track B (X·KF W9)**, in **0**
X-W1 commits.) **E-3 HELD.**

### C1.6 · E13 mail

⟨`find <each of the four paths> -maxdepth 1 -type f -newermt "2026-09-18 14:46"`⟩ → **empty across
all four**; nothing has arrived since the close's sweep. `INBOX.md` **77 table rows**; **7 carry
UNREAD** (`O-20` our own outbound · `I-30` · `I-31` · `I-32` · `I-33` · `I-34` · `I-35`),
classification from each row's status cell. Cross-checked by vocabulary, not by routing prose —
⟨`grep -Eic 'deploy-pages|color\.babb\.dev|\.github/workflows|e2e/visual|boot-smoke|oracle-slate|lighthouserc|tranche-u|merge to master'`⟩ over all four live glass letters → **0 · 0 · 0 · 0**.
**0 UNREAD in X-W1's scope.** `INBOX.md` not written by this seat.

### C1.7 · The four-verb line

`W1.md` §State is **byte-untouched** (C1.5) and still reads `IMPLEMENTED: NO` / `VERIFIED: NO`. The
close did **not** stamp IMPLEMENTED and the LEDGER row reads PARTIAL. With seven REDs live, **not
moving the verb is the lawful act**, and this seat upholds it: §Commit Plan row 8 advances
IMPLEMENTED *at a close whose gates are green*, and VERIFIED is X-W11's alone (R-A).

### C1.8 · §Goal criterion, read at the bytes — **UNMET**

*"…the browser suite, the visual oracle, boot truth in both modes, and the deploy-of-record all
execute automatically, and **each one has been demonstrated capable of turning red**."*

| clause | at the bytes |
|---|---|
| browser suite executes | **YES** — `e2e-smoke` · `e2e-safari` dispatched on the master push run |
| visual oracle executes | **YES** — `visual` job, `macos-15` |
| boot truth both modes executes | **YES** — `boot-smoke` job, whole seed matrix |
| **deploy-of-record executes** | **NO** — G-19: 0 push-arm successes ever; G-20: production still serves the 2026-07-07 artifact |
| **each demonstrated capable of turning red** | **NO for the browser suite** — G-7's demonstration does not exist (C1.1). `oracle slate`, `lhci` and `deploy-age` did conclude **failure** on master, which is evidence those three are not decorative; the e2e arm — the one D48 and D55(iv) waived twice — has no such demonstration |

Two of five clauses false. The criterion is **not** met, and it is not met for the two reasons this
wave's own §Archaeology says have defeated its predecessors.

### C1.9 · HONEST-RED ADJUDICATION (axis 10) — four relieved, three not

**RELIEVED and owner-named** (each relief quoted from the governing bytes):

| red | relief at the spec's own bytes | owner |
|---|---|---|
| **G-17's lint root** — 23 `'return' outside of function` parse errors under `docs/**` | fold §3: *"`eslint.config.js` (R48, X-W8's carve)"* is named in **Files W1 must NOT add**; the slate itself ROUTES all six dead globs to X-W8 and **excludes them from its exit code**. A W1 cure would be an out-of-bounds write | **X-W8** |
| **G-12/G-13/G-16's seed-matrix arms** (dev 2/8 · prod-preview 5/8) | fold R16 → **X-W9**; R17 → **X-W5 + X-W9**; *"W1 owns the gate and the deploy-matrix state only"*. Unmasked at the instrument: `boot-smoke.mjs` exits non-zero and names each failing seed | **X-W5 · X-W9** |
| **NG-8's crash-battery arms** (R14…R19) | the battery's own header routes every arm — R14→X-W7.g · R15→X-W9 · R16→X-W9/X-W5 · R17→X-W5+X-W9 · R18→NO-WAVE-OWNER · R19→X-W5 — and NG-8's falsifier *requires* them to red today | **X-W5 · X-W7 · X-W9** |
| **G-19's ANCHOR** (`event: push` unsatisfiable) | ESC-W1E-3, confirmed here: `deploy-pages.yml`'s only triggers are `workflow_run` ⊕ `workflow_dispatch`, and the one historical success carrying `workflow_run` (`28724805140`) proves the satisfiable INTENT. The **anchor wording** is relieved as a spec-byte finding; **the gate's substance is not** — no push-arm deploy exists, and no dispatch was fired to manufacture one | spec seat / X-W11 |

**NOT RELIEVED — no producer ownership, no spec routing to a successor, no honest-RED the spec names
by id:**

- **G-7.** `W1.md:69` makes it a ***"mandatory one-time falsifier"***; `:307` — *"This gate **is** the
  falsifier"*; §Archaeology — V-prime *"delivered two with **both** falsifiers waived"*, the guardrail
  being *"G-7 makes the falsifier demonstration a gate"*. A gate authored to refuse its own waiver
  cannot be relieved by not being run.
- **G-11.** The gate admits **exactly two** terminal states. §COMPLETABLE's relief is explicit and
  cheap — *"**retires with a tombstone if the session does not happen**"* — and it was **not
  performed**. What exists is the third state (*"owed"*), which `:311`'s falsifier names as the
  failure mode: *"Fails by a third state — 'carried to X-W11', 'scheduled for next window'."*
- **G-1.** The 14 diagnostics are in **`e2e/visual/**`**, files **this wave minted** (`e2347c0e`),
  caught by a program **this wave minted** (`75636b16`), wired into CI by **this wave**
  (`ec654158`). No spec clause routes them anywhere. The close's own §3 LW-1 states it plainly:
  *"the 'and passes' half of G-1 was never measured by any seat of this wave."* A retired seat is a
  dispatch failure, not a relief.

**G-5** is honest and owner-named but likewise unrelieved: the 3 dead-attribute rows come from
`a0df89d9`, X.W1.a's own last commit, and the close itself records that the NG-8 ⊗ G-5/NG-1
collision *"is a design question no seat has ruled"*. **G-17 (typecheck root) · G-19 · G-20** inherit
G-1's and G-7's unrelieved status downstream.

### C1.10 · Successor "Opens after" conjuncts, measured against this wave

| successor | conjunct naming X-W1 | verdict |
|---|---|---|
| **X-W2** | *"Opens after X-W1 (re-gate) — see §10; the byte legs are bench-executable without it"*; §10's admissible pin (i) *"`ubuntu-24.04` via X-W1's restored job"* requires ⟨`gh run list --workflow=ci.yml --limit 1`⟩ `success` | pin (i) **UNAVAILABLE** (G-17 RED); **pin (ii), the wave-open bench, is admissible by the spec's own words** → X-W2 **NOT blocked** |
| **X-W3** | *"Opens after: X-W1 (re-gate: **CI + falsifier demonstration must exist** before born-RED gates can be trusted to flip)"* | **CONJUNCT FALSE.** CI exists; **the falsifier demonstration does not** (G-7). **X-W3 is lawfully BLOCKED by this wave**, and G-7 is the single byte standing between them |
| **X-W4** | *"Opens after: X-W1 (CC-031 restores `e2e-smoke` as a HARD job…)"* | **GREEN** — `e2e-smoke:119`, no `continue-on-error`, every-branch trigger. X-W4's open is lawful (and it is already OPEN) |
| **X-W6 · X-W7 · X-W11** | reached transitively (W6←W5←W4; W7←W3/W4/W6; W11 needs every wave IMPLEMENTED) | W7 inherits X-W3's block; **X-W11 cannot open** while X-W1 is PARTIAL — its conjunct is *IMPLEMENTED*, which this wave has correctly not stamped |

### C1.11 · REGISTER — severity · claim · receipt · cure

| # | sev | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **HIGH** | **G-7's mandatory falsifier was never demonstrated, and nothing in the spec relieves it.** The wave's central assertion — that the restored CI jobs are not decorative — rests on the one gate authored to refuse its own waiver, and that gate is empty | ⟨`ls -la docs/tranches/X/evidence/w1/falsifier/`⟩ → `total 0`; ⟨`git ls-files …/falsifier \| wc -l`⟩ → `0`. `W1.md:69` *"mandatory one-time falsifier"*; `:307` *"This gate is the falsifier"* | Redispatch X.W1.a's falsifier limb ONLY: a scratch branch, a deliberately broken spec, the push, the **red run URL** committed under `evidence/w1/falsifier/`. It also unblocks **X-W3** (C1.10) |
| **D-2** | **HIGH** | **G-11 sits in the third state its own gate forbids.** Neither session nor tombstone — the seventh carry of DR-07, which this wave's §Archaeology exists to end | ⟨`ls docs/tranches/X/evidence/w1/real-gpu`⟩ → `No such file or directory`; ⟨`git ls-files`⟩ → `0`. `:311` falsifier: *"Fails by a third state"* | **One commit.** Write `docs/tranches/X/evidence/w1/real-gpu/TOMBSTONE.md`, dated, quoting DR-07's chain (N X14 → R R8-22 → S → T O-3 → U-F54/B8 → V-prime CH-7) and the reason *"named six times, run zero times; naming is not discharge"*. No owner session required |
| **D-3** | **HIGH** | **G-1 RED on bytes this wave minted.** 14 `error TS` in `e2e/visual/**`, double-run; the *"and passes"* half was measured by no seat of the wave, and it is one of `producer`'s two independent failure roots on master | ⟨`npx tsc -p tsconfig.e2e.json --noEmit \| grep -c 'error TS'`⟩ → `14` ×2. Real diagnostics, not noise: `capture.ts(431,33)` `animationName` absent on `Animation`; `modality.visual.spec.ts(92,56)` `reducedMotion` not in `Fixtures<…>`; 5 × `TS2532 Object is possibly 'undefined'` | One in-bounds redispatch of **X.W1.b**'s `e2e/visual/**` set to type the four files honestly (no `any`, no `@ts-expect-error` blanket, no `exclude` of the subtree from `tsconfig.e2e.json` — each of those would be the masking fallback the standing law names) |
| **D-4** | MEDIUM | **G-5 RED from the wave's own last commit.** `crash-battery.spec.ts` binds `[data-palette-card]` · `[data-extract-swatch]` · `[data-palette-swatch]`, none of which appears in any product or producer byte — the dead-locator disease R2 exists to kill, minted by R2's own wave | ⟨`node scripts/ci/oracle-slate.mjs`; `echo $?`⟩ → `SLATE RED — 3 finding(s)`, exit `1`; all three from `a0df89d9` | Rule the NG-8 ⊗ G-5/NG-1 collision once: either the three attributes are part of a routed cure (then the battery states which wave mints them and the slate learns the *scheduled* class), or the arms bind a locator that exists. Not an allowlist |
| **D-5** | MEDIUM | **Two product-test-surface files inside X.W1.a's bound are still untracked**, so the locally collected suite is not the suite CI collects | ⟨`git status --porcelain e2e/`⟩ → `?? e2e/smoke/a11y-control-targets.spec.ts`, `?? e2e/smoke/mobile/a11y-control-targets.spec.ts`; ⟨`npx playwright test --list`⟩ → **544 tests in 83 files**, of which **6** come from those two files, against **81** tracked specs the slate counts | Track them under X.W1.a's bound (they are in it) or delete them with a rationale. Disclosed by the close as R-CL-8; recorded here as measured, not re-litigated |
| **D-6** | MINOR | The close's G-5/G-2 cell publishes **"10 jobs"**; there are **9** | ⟨`grep -nE '^    [a-z0-9_-]+:$' ci.yml`⟩ → 11 lines, of which `push:` and `pull_request:` are not jobs; the close's own enumeration lists 9. `ec654158`'s body says *"all nine jobs"* | Dated addendum-beside at the next seat to touch the Close; the gate verdict is unaffected |
| **D-7** | MINOR | **G-3 is published GREEN while its falsifier's run-ID clause is unmet** — *"the committed number must carry its run ID and duration"* | `g3-full-suite-2026-09-18.md`: duration `1137.5 s` present, run id cell = *"LOCAL — no CI run id exists yet"* | Mitigated: the evidence states the gap in its own words and R-CL-10 names the owner. Discharged the moment `e2e-smoke` on run `35381701436` reports (still `in_progress` at this seat's clock) |
| **D-8** | MINOR | `ci.yml`'s `deploy-age` job has one silent-green path: `CLOSE_AT="$(git log … \|\| true)"` under `set -euo pipefail`, then `if [ -z "$CLOSE_AT" ]; then echo "no close recorded…"; exit 0` | `ci.yml:5819-5836` region as extracted; the live run shows both inputs measured and the job redding, so the path is unexercised today | Red on an empty `CLOSE_AT` instead of passing, or assert the log query returns ≥1 row. Non-blocking: G-21's falsifier arms were executed and the job reds at the run of record |
| **D-9** | INFO | Commit-plan row 4 landed in two commits (`7bc72838` → `2e1fd65f`) | the second is the disclosed WRITE-THEN-MEASURE correction of the first's subpath census; the cure itself is unsplit | none — recorded so the roster reads true |

**Nothing in D-1..D-9 is a bounds breach, a masking fallback, an E-3 violation or an unreproduced
GREEN. The wave's close is an honest one: it stamped nothing, softened nothing, fired no
`workflow_dispatch`, and returned seven REDs as seven REDs. What it cannot do is make three of those
REDs honest — the spec provides no relief for G-7, G-11 or G-1, and the two cheapest of them (G-11's
tombstone, G-7's falsifier run) are the two the tranche's own archaeology says have been deferred
six and three times before.**

**LEDGER: status left at PARTIAL; the row's check cell records this pass; one event line appended.**

## Repair 1

**REPAIR SEAT (round 1) · 2026-09-18 · `claude-opus-5[1m]` · primary tree, branch `tranche-u`.**
This seat answers Check 1's register D-1..D-9. It cured every defect at ≥MEDIUM that lies inside
X-W1's §File Bounds, both MINORs that carry a one-command cure, and it escalated the one whose cure
does not. E-3 throughout: `W1.md`, `X-W1-FOLD.md`, the runbook, the adjudicated registry, every
committed evidence file, every prior unit receipt, the RESUME block, the Close and Check 1 are
**byte-untouched** — corrections to them are written as dated addenda-beside, never as edits. This
section and one LEDGER event line are this seat's only writes to the record.

**CRASH-RECOVERY (standing law).** ⟨`git status --porcelain`⟩ at open → 14 modified + 4 untracked
paths. **None inside this unit's writable set** was a killed predecessor's partial work: the ten
`demo/**/*.vue` edits, `scripts/dev/dev.sh`, `docs/tranches/V/reformation/CARRY-LEDGER.md`,
`docs/tranches/X/execution/D/X-P-W3.md`, `docs/tranches/X/fourier/RULINGS-F.W2.md` and
`docs/tranches/X/waves/evidence/` all belong to sibling seats and were neither read for adoption
nor touched. **Nothing was stashed, restored or reset.** The two untracked `a11y-control-targets`
specs are treated at **D-5** below.

### R1.0 · The register, answered

| # | sev | disposition | commit | the gate it moves, re-read |
|---|---|---|---|---|
| **D-1** | HIGH | **CURED** — falsifier demonstrated on a scratch branch, never merged | `3d029e44` (scratch, unmerged) ⊕ `dfc65a3e` | **G-7 RED → GREEN** |
| **D-2** | HIGH | **CURED** — dated tombstone, the gate's second terminal state | `20a7b623` | **G-11 RED → GREEN** |
| **D-3** | HIGH | **CURED** — the four files typed honestly; a live no-op found and fixed with them | `9ebb2020` | **G-1 RED → GREEN** |
| **D-4** | MEDIUM | **CURED** — R2 ruling: the arms bind locators that exist | `190a2cd8` | **G-5 RED → GREEN** |
| **D-5** | MEDIUM | **ESCALATED** — the paths are X-W4's by `W4.md:128-129`; a write there is out of bounds | — | G-3/G-5 denominator, unmoved |
| **D-6** | MINOR | **CURED** — dated addendum-beside, below (R1.6) | this section | none (figure only) |
| **D-7** | MINOR | **CURED** — the CI run id arrived and is recorded beside the baseline | `e5dea4a7` | **G-3's run-id clause, discharged** |
| **D-8** | MINOR | **CURED** — the silent-green path now reds | `359af5bb` | **G-21 hardened** |
| **D-9** | INFO | **no cure owed** — recorded by Check 1 so the roster reads true; this seat re-read `7bc72838` → `2e1fd65f` and concurs it is one meaning in two commits, the second a disclosed WRITE-THEN-MEASURE correction | — | none |

**SELF-COUNT, corrected at the table rather than published wrong: CURED 7 · ESCALATED 1 (D-5) ·
NO CURE OWED 1 (D-9, which Check 1 itself dispositions `none`). 7 + 1 + 1 = the register's 9.**
(Commit `54c66b64`'s message and the LEDGER's first cell of this repair both read *"8 of 9 cured"*,
counting D-9 among the cures; a commit message cannot be rewritten in a four-track shared index, so
the correction is recorded here and in the LEDGER cell. No cure and no gate verdict changes.)

### R1.1 · D-1 · G-7 — the falsifier, demonstrated with a control

The gate authored to refuse its own waiver has been paid, at a URL, with a differential. Full
record: `docs/tranches/X/evidence/w1/falsifier/G7-2026-09-18.md` ⊕ the committed diff
`broken-spec-3d029e44.diff` (⟨`git ls-files docs/tranches/X/evidence/w1/falsifier | wc -l`⟩ → **2**;
it read **0** at Check 1, on an empty directory).

**One variable, two runs, same workflow of record.** `e2e/smoke/views/browse-loading.spec.ts` is
byte-identical on `master` and `tranche-u` (⟨`git diff origin/master HEAD -- <path>`⟩ → prints
nothing; last touched at `52acad46`, long before this wave) and it **passed** on master. One
assertion was inverted on a scratch branch — `toHaveCount(0)` → `toHaveCount(1)`, a proposition the
product genuinely satisfies — and the branch was pushed.

| | **control** | **falsifier** |
|---|---|---|
| run · job | `35381701436` · `e2e-smoke` `105719151511` | **`35388604746`** · `e2e-smoke` **`105741411648`** |
| branch / sha | `master` / `04d2d808` | **`x-w1-g7-falsifier`** / **`3d029e44`** |
| collected | `Running 202 tests using 1 worker` | `Running 202 tests using 1 worker` |
| **failed / passed** | **37** / 160 | **38** / 161 |
| `browse-loading.spec.ts` | **absent from the failed list** | **failed — initial ⊕ `retry1` ⊕ `retry2`** |
| conclusion | `failure` | **`failure`** |

**Exactly one more failure, and it is the one that was planted.** The job's own log names it:

```
  30) [smoke] › e2e/smoke/views/browse-loading.spec.ts:16:1 › browse mid-fetch renders
      developing-plate skeletons, never a spinner
    Error: expect(locator).toHaveCount(expected) failed
    Expected: 1
    Received: 0
    > 48 |     await expect(skeletons).toHaveCount(1);
```

**Neither historical waiver was used.** No `continue-on-error` (⟨`grep -c continue-on-error .github/workflows/ci.yml`⟩
→ **2**, both comment prose) — D48's. No branch-push substitution — the trigger is
`push: branches: "**"`, so the scratch branch ran **the same `ci.yml` as master**, unreduced —
D55(iv)'s. And no local run stands in for the CI run: every figure is read from GitHub's API and
the job log.

The scratch branch is evidence, not a proposal: it is **never merged**
(⟨`git log --oneline tranche-u | grep -c 3d029e44`⟩ → **0**).

**G-7: RED → GREEN.** With it, `W3.md:15`'s Opens-after conjunct — *"X-W1 (re-gate: CI + falsifier
demonstration must exist before born-RED gates can be trusted to flip)"* — **measures TRUE**, and
the single byte Check 1 §C1.10 identified as standing between this wave and **X-W3** is gone.

### R1.2 · D-2 · G-11 — the seventh carry, refused

`docs/tranches/X/evidence/w1/real-gpu/TOMBSTONE.md`, dated **2026-09-18**, committed at
`20a7b623` (⟨`git ls-files docs/tranches/X/evidence/w1/real-gpu | wc -l`⟩ → **1**; it read **0**
before, and ⟨`git log --oneline -- docs/tranches/X/evidence/w1/real-gpu`⟩ read **0 commits**, so
X.W1.f had never written a byte).

It quotes DR-07's chain verbatim from the spec (N X14 → R R8-22 → S → T O-3 → U-F54/B8 → V-prime
CH-7), gives the reason the spec dictates — *named six times, run zero times; naming is not
discharge* — and states the cost rather than glossing it: ⟨`git ls-files 'e2e/visual/goldens/**/*.png' | grep -c swiftshader`⟩
→ **207 of 207**, so no frame in this repository was rendered by a real GPU and any driver-only
defect is invisible to this tranche's gates. It also refuses the escape hatch in advance: a session
run after this date is a new row in the wave that hosts it, never a retroactive discharge of
CC-029(b).

**G-11: RED → GREEN by its second terminal state.** The third state — *owed*, *carried*,
*scheduled* — is gone from the tree.

### R1.3 · D-3 · G-1 — 14 → 0, and the defect the 14 were reporting

⟨`npx tsc -p tsconfig.e2e.json --noEmit | grep -c 'error TS'`⟩ → **0**, **double-run 0**.
⟨`npm run typecheck`⟩ (four programs: `tsconfig.lib.json` · `tsconfig.demo.json` ·
`tsconfig.test.json` · `tsconfig.e2e.json`) → **exit 0**, **double-run exit 0**, `grep -c 'error TS'`
→ **0**. The three surviving `demo/@/lib/palette` mentions are the same explanatory prose Check 1
measured; **0 live imports**. Both halves of G-1's conjunction now hold.

None of the four cures is a waiver. **No `any`, no `as any`, no `@ts-expect-error`, no
`@ts-ignore`, no `eslint-disable`, and `e2e/visual` was not excluded from `tsconfig.e2e.json`'s
`include`** — the third would have re-cut the exact B10 hole G-1 exists to close
(⟨union of this seat's added lines, `grep -cE 'test\.skip\(|test\.only|: any|as any|@ts-expect-error|@ts-ignore|continue-on-error|eslint-disable'`⟩ → **1 hit, and it is prose** in the G-3 addendum
naming `continue-on-error` as the thing that is absent).

| file | diagnostics | the cure, and why it is the root |
|---|---|---|
| `capture.ts` | 2 × TS2339 | `document.getAnimations()` is typed as the base `Animation`; `animationName` belongs to `CSSAnimation`, `transitionProperty` to `CSSTransition`, and a script-driven animation has neither. Feature-tested with `in` rather than cast — `instanceof CSSAnimation` would narrow too, but those globals are absent in WebKit and the helper is shared with the safari arms. Runtime behaviour for CSS animations and transitions is unchanged (the properties were always present on the objects); only the both-absent case moves, from the string `undefined` to the animation's stable `id` |
| `census-parity.spec.ts` | 7 (3 × TS2322 · 2 × TS2532 · TS2677 · TS2345) | one `required<T>()` helper earns what `noUncheckedIndexedAccess` cannot know and **throws the divergence sentence this guard exists to report**, instead of asserting it away with `!` or absorbing it with `?? ""`; the three union readers fold into `unionBody`/`unionMembers`; the `RightPane` predicate names `NonNullable<CensusRightPane>` and the `Set` is keyed on `string` so it can still be asked about a pane the census has never heard of — which is the one question the test exists to ask |
| `golden-integrity.spec.ts` | 3 × TS2532 | the three channels are read as values and a mid-pixel truncation is **named and thrown**. This was not cosmetic: `undefined << 16` is `0`, so a truncated golden would have silently counted as one more black pixel and could have pushed a flat frame over the 16-colour floor — a defect of exactly the class this file exists to catch |
| `modality.visual.spec.ts` | 2 × TS2353 | **the two diagnostics were reporting a live no-op** — see below |

**The `census-parity` refactor is behaviour-identical, measured not assumed.** Old and new readers
run side by side against the live `demo/color-picker/router/index.ts` and `demo/shell/viewSchema.ts`
in one node process: `routerNames` **identical, n=14** · `viewIds` **identical, n=14** ·
`rightPanes` **identical, n=4**. The guard asserts exactly what it asserted before; only its failure
mode improved.

**The finding the 14 were hiding.** `reducedMotion` and `forcedColors` are not test options in the
installed Playwright: ⟨`grep -c reducedMotion node_modules/playwright/types/test.d.ts`⟩ → **1**, and
that hit is a doc example showing the key nested *inside* `contextOptions`;
⟨`grep -rn 'reducedMotion\|forcedColors' node_modules/playwright/lib/`⟩ → **0**;
`_combinedContextOptions` — the one place a context's options are assembled — enumerates every
option fixture it reads and names neither. Written at the top level they are accepted, ignored, and
the arm runs anyway. Measured with a two-arm differential probe at this seat (chromium,
`about:blank`, one run):

```
AS-WRITTEN         {"reduced":false,"forced":false}
VIA-CONTEXTOPTIONS {"reduced":true,"forced":true}
```

Both arms were off. **28 committed goldens — 14 `reduced-motion-desktop` + 14
`forced-colors-desktop` — therefore do not witness what their own filenames claim**, and with the
cure in place the `visual` job reds on exactly those 28 until they are re-minted. That RED is
honest and it is the correct state: the stale goldens are the false evidence, not the failure. The
re-mint is **owed, named and owner-assigned** in
`docs/tranches/X/evidence/w1/visual/MODALITY-NO-OP-2026-09-18.md`, with the reason it could not
happen at this seat measured rather than asserted: `regenerate-goldens.mjs` refuses a tree dirty in
any pixel-relevant path, and ten uncommitted `demo/**/*.vue` edits belonging to sibling seats are
exactly that. A worktree does not escape it — `reuseExistingServer` points the suite at the same
product source. Minting there would have ratified a sibling's half-finished edit as the product's
appearance, which is the condition G-9's dirty-tree refusal exists to prevent.

**G-1: RED → GREEN**, and the wave's own §3 LW-1 — *"the 'and passes' half of G-1 was never
measured by any seat of this wave"* — is discharged by measurement, not by argument.

### R1.4 · D-4 · G-5 — the dead-locator ruling, and two more the slate could not see

The collision is ruled by R2's **second** arm: neither attribute belongs to a routed cure — nothing
in the fold mints `data-palette-card`, `data-extract-swatch` or `data-palette-swatch` at any wave —
so the arms bind the live hook instead. **No allowlist, no exemption list, no `SCHEDULED` class.**

⟨`grep -rl <literal> demo/ src/ node_modules/@mkbabb/glass-ui/dist`⟩ per literal → **0 files**
apiece for all three. Two further members of the same two selector lists are dead and die with
them, neither visible to the slate:

- **`.palette-card`** — the only class in the tree is `.palette-card-grid`
  (`PaletteCardGrid.vue:4`), and class tokens match exactly.
- **the CSS tag selector `article`** — ⟨`grep -rn '<article' demo/ --include='*.vue'`⟩ → **0**;
  `PaletteCard.vue:22` carries `role="article"` on a `<div>`, which a tag selector never matches.

So **both selector lists matched nothing under any product behaviour**, which made NG-8's falsifier
unreadable: an arm that cannot pass however its cure lands is not born-RED, it is unfalsifiable.
R14's recovery leg now binds `getByRole("article")` — what `views/browse-loading.spec.ts` already
binds — and R18's palette leg binds `[aria-label^="Color swatch "]`, stamped by
`SwatchHoverMenu.vue:18/:33` through `ExtractWorkbench.vue:145` → `PaletteCardSwatches.vue:25`.

**What run `35381701436`'s own log says about the two arms — read, not assumed:**

- **R14 fails at `crash-battery.spec.ts:60`**, `await expect(main(page)).toBeVisible()` — *before*
  the cured line. Its RED is untouched by this cure.
- **R18 fails AT the dead locator**, `crash-battery.spec.ts:294:7`:
  *"Locator: `getByRole('main', { name: 'Color tool panes' }).locator('.extract-swatch, [data-extract-swatch], [data-palette-swatch]').first()` — element(s) not found"*. The assertion
  immediately above it — the uploaded image is visible — **passed**. So R18 was redding for a
  selector that could not match under any behaviour, and nobody could tell whether the extract flow
  it prosecutes is broken at all.

That second reading is stated plainly because it cuts both ways. After the cure R18's verdict
becomes informative for the first time: if the flow does develop a palette the arm will **green**,
and under NG-8's own falsifier — *"a battery that greens without its cure landing means the arm was
authored to the cure, not to the defect"* — that is a finding about R18's authorship, to be
reported by the next `e2e-smoke` run rather than pre-empted here. A dead locator that manufactures
a RED is not a born-RED gate; it is R2's disease wearing a gate's clothes.

⟨`node scripts/ci/oracle-slate.mjs`; `echo $?`⟩ → **`SLATE CLEAN — 0 findings (6 routed, named
above)`, exit 0** — **double-run byte-identical** (⟨`diff -q`⟩ prints nothing). The 6 X-W8 lint
globs are untouched and still ROUTED, excluded from the exit code as before. **G-5: RED → GREEN.**

**Disclosed, not exploited — an instrument gap this cure sits inside.** The slate's E3 reads only
`[data-…]` attribute selectors and E4 only `name: "…"` literals, so it **cannot see** the
`[aria-label^=…]` binding this cure introduces; its silence about that binding is not evidence.
Extending E3 to `aria-label` was measured and **declined as unsound**: of the 8 distinct
`[aria-label…]` literals in `e2e/` (15 sites), **3 are composed at runtime from templates**
(`l component value` ← `${channel} component value`; `Gradient stop at 80%` ←
`Gradient stop at ${pct}%`; `Perceived-space…`) and appear in **0** product bytes verbatim, so the
naive extension would red on live locators — a false positive is a worse instrument than a blind
spot. It is the same class the slate already reports rather than exempts (*"67 dynamic
(template/regex/variable) references are UNCHECKABLE by this instrument"*). A template-aware
extension is a design question for a later wave, recorded here rather than silently benefited from.
The new binding's runtime confirmation rides the next `e2e-smoke` run.

### R1.5 · D-5 · ESCALATED — the two untracked specs are X-W4's, not X-W1's

The defect is real and reproduces: ⟨`git status --porcelain e2e/`⟩ → `?? e2e/smoke/a11y-control-targets.spec.ts`
· `?? e2e/smoke/mobile/a11y-control-targets.spec.ts`; the slate reads **tracked e2e specs 81 ·
collected by ≥1 83**, so the locally collected suite is still not the suite CI collects.

**But its premise is measurably wrong, and the correction is what makes it an escalation.** Both the
Close (R-CL-8) and Check 1 (D-5) call these *"product test surface inside X.W1.a's bound"*. At the
bytes they are **X-W4's**:

| ⟨command⟩ | output |
|---|---|
| `grep -n 'a11y-control-targets' docs/tranches/X/waves/W4.md` | **`:128 \| e2e/smoke/a11y-control-targets.spec.ts \| create \|`** · **`:129 \| e2e/smoke/mobile/a11y-control-targets.spec.ts \| create \|`** (+ `:236`, `:378` A1's gate command, `:457` commit-plan row 2) |
| `grep -n 'a11y-control-targets' docs/tranches/X/waves/W1.md` | **0** |
| `grep -n 'a11y-control-targets' docs/tranches/X/refinement/X-W1-FOLD.md` | **0** — and §3's 36 additions plus §6.3's single 37th (`o7-card-census.spec.ts`) name neither |
| the files' own first lines | *"X-W4 · X.W4.a — SHELL CONTROL TARGETS, NAMES AND THE SIZE AXIS (gates A1 · A3 · A4)"* … *"W4.md §4 File Bounds admits exactly these two paths"* |

X-W1's §Disjointness grants X.W1.a *"`e2e/smoke/**` **fixtures** + `test.fail()` specs"* — these are
neither. **A `git add` of them from this seat would be a write outside §File Bounds, and a `rm` of
them would destroy an open sibling wave's work.** X-W4 is **OPEN** on this same track
(`LEDGER.md:33`), so the cure has a live owner.

> **ESCALATION ESC-W1R-1 → X-W4 (X.W4.a) / orchestrator.** Track or delete
> `e2e/smoke/a11y-control-targets.spec.ts` and `e2e/smoke/mobile/a11y-control-targets.spec.ts` under
> **W4.md:128-129**, which admits both as `create`. Until then the suite CI collects is 81 tracked
> specs while the tree collects 83, and the 6 tests in those two files are measured by nothing.
> R-CL-8's and D-5's *"inside X.W1.a's bound"* is corrected by this dated addendum-beside; the
> defect they name is upheld in full.

### R1.6 · D-6 · the job census — dated addendum-beside

The Close's G-5/G-2 cell publishes **"10 jobs"**. **There are 9.** The Close is immutable (E-3), so
the correction lives here:

⟨`python3 -c "import yaml; print(len(yaml.safe_load(open('.github/workflows/ci.yml'))['jobs']))"`⟩ →
**9** — the YAML parser's own count, not a grep's — enumerated `producer · api · oracle-slate ·
e2e-smoke · e2e-safari · visual · boot-smoke · lhci · deploy-age`. ⟨`grep -cE '^    [a-z0-9_-]+:$' .github/workflows/ci.yml`⟩
→ **11**, of which `push:` (`:4`) and `pull_request:` (`:7`) are trigger keys at the same
indentation, not jobs. `ec654158`'s own commit body already said *"all nine jobs"*, and Check 1's
own enumeration lists nine. **No gate verdict is affected.**

### R1.7 · D-7 · G-3's run-id clause — discharged by arrival

`docs/tranches/X/evidence/w1/baseline/g3-ci-run-id-2026-09-18.md` (commit `e5dea4a7`) records the
second witness the baseline itself named as owed, **without editing the baseline** (E-3):

**run `35381701436` · job `e2e-smoke` id `105719151511` · `push` / `master` / `04d2d808` ·
2026-09-18T18:42:11Z → 19:38:21Z · conclusion `failure` · `Running 202 tests using 1 worker` →
`37 failed · 3 flaky · 2 skipped · 160 passed (55.0m)`.**

Scope, commit and retry policy differ from the local baseline (5 chromium projects at `04d2d808`,
`retries: 2`, versus all six projects at `58d6f731`, `retries: 0`), and the difference is tabulated
rather than conflated; the baseline's 187/145/40/2 classification is not re-opened. This reading
also discharges the `e2e-smoke` half of **R-CL-10**.

### R1.8 · D-8 · the one silent-green path in the job that refuses silent greens

`ci.yml`'s `deploy-age` step read `if [ -z "$CLOSE_AT" ]; then echo "no close recorded…"; exit 0`.
Its input is `git log … -- docs/tranches || true` under `set -euo pipefail`, so a **broken** query
(path moved, subject grammar changed, shallow checkout) arrives as an empty string rather than a
failure, and the job passed on it. It now **reds**, with the reason in the message.

Differential at this seat: ⟨the live command⟩ → `2026-09-18T16:01:09-04:00`; ⟨the same command with
the path moved⟩ → **empty** — which is precisely the reading that used to pass.
⟨`actionlint .github/workflows/ci.yml .github/workflows/deploy-pages.yml`⟩ → **exit 0, no output**.
The live inputs are unchanged, so `deploy-age`'s behaviour at the run of record is unchanged and
**G-21 stays GREEN-as-gate**, now without a fail-open branch beneath it.

### R1.9 · Gate re-readings — WRITE-THEN-MEASURE, every figure double-run

| gate | before (Check 1) | after, at this seat's own command | verdict |
|---|---|---|---|
| **G-1** | RED — 14 `error TS`, `npm run typecheck` exit 2 | ⟨`npx tsc -p tsconfig.e2e.json --noEmit \| grep -c 'error TS'`⟩ → **0**, double-run **0**; ⟨`npm run typecheck`⟩ → **exit 0**, double-run **exit 0** | **RED → GREEN** |
| **G-5** | RED — `SLATE RED — 3 finding(s)`, exit 1 | ⟨`node scripts/ci/oracle-slate.mjs; echo $?`⟩ → **`SLATE CLEAN — 0 findings (6 routed)`, exit 0**, double-run byte-identical | **RED → GREEN** |
| **G-7** | RED — evidence dir empty, 0 tracked files | control `35381701436` vs falsifier `35388604746`, same job and same 202 tests: **37 failed → 38**, the delta being the planted assertion, named in the log at `browse-loading.spec.ts:48:29`; both runs' conclusion `failure`; scratch branch never merged | **RED → GREEN** |
| **G-11** | RED — neither frames nor tombstone | ⟨`git ls-files docs/tranches/X/evidence/w1/real-gpu \| wc -l`⟩ → **1** (`TOMBSTONE.md`, dated 2026-09-18) | **RED → GREEN** |
| **G-3** | GREEN, run-id clause RESIDUAL | run id `35381701436`, job `105719151511`, duration `55.0m`, conclusion `failure` — recorded beside the baseline | **residual discharged** |
| **G-21** | GREEN as gate | unchanged at the live inputs; the fail-open branch removed; `actionlint` exit 0 | **GREEN, hardened** |
| **G-8 · G-10** | GREEN | ⟨`git ls-files 'e2e/visual/goldens/**/*.png' \| wc -l`⟩ → **207**, all renderer-labelled — unmoved by this seat | **GREEN** |
| lint | 23 `docs/**` parse errors (G-17's root, X-W8's carve) | ⟨`npm run lint`⟩ → **exit 1 · 55 problems (23 errors, 32 warnings)** — **all 23 under `docs/**`**, `0` from any file this seat touched; ⟨`npx eslint <this seat's 5 files> --max-warnings=0`⟩ → **exit 0** | unmoved, still X-W8's |
| **G-17 · G-19 · G-20** | RED | not moved by this seat, and not claimed: G-17's lint root is `eslint.config.js`, X-W8's carve; G-19's push arm and G-20's served bytes need a deploy this repair does not perform | **RED, owners unchanged** |

### R1.10 · Self-audit — bounds, masking, E-3, E13

- **Bounds.** ⟨union of this seat's commits' `--name-only`⟩ → **9 distinct paths**:
  `.github/workflows/ci.yml` (§File Bounds, `modify`) · `e2e/visual/` ×4 (X.W1.b's `create` set) ·
  `e2e/smoke/crash-battery.spec.ts` (NG-8's battery, minted by X.W1.a at `a0df89d9` and inside the
  325-path union Check 1 §C1.2 measured **CLEAN**) · `docs/tranches/X/evidence/w1/**` ×3 (`create`).
  ⟨union grep⟩ → `src/` **0** · `demo/` **0** · `api/` **0** · `test/` **0** ·
  `lighthouserc.json` **0** · `scripts/dev/dev.sh` **0** · any sibling track's index **0**.
  The scratch branch's single commit touches one path, `e2e/smoke/views/browse-loading.spec.ts`,
  and **is never merged**.
- **Masking.** 0 live `test.skip(` · 0 `test.only` · 0 `any` · 0 `@ts-expect-error` · 0
  `@ts-ignore` · 0 `eslint-disable` · 0 `continue-on-error` · 0 allowlists · 0 patched
  `node_modules` · 0 narrowed assertions. Every cure adds a way to fail: a thrown divergence
  sentence, a thrown truncation, a locator that can resolve, a job that reds on an empty input.
- **E-3.** ⟨`git diff --stat` over `waves/W1.md`, `refinement/X-W1-FOLD.md`, `EXECUTION-RUNBOOK.md`
  since Check 1⟩ → **prints nothing**. `g3-full-suite-2026-09-18.md`, `MANIFEST.json`,
  `TOLERANCE.md`, `G9-INJECTION.md`, the Close and Check 1 are unedited; all three corrections this
  seat makes (the modality no-op, the run id, the job census, the D-5 premise) are **addenda-beside**.
- **E13 mail.** Four paths swept read-only at this seat's clock —
  ⟨`find <each> -maxdepth 1 -type f -newermt "2026-09-18 14:46"`⟩ → **empty across all four**
  (`docs/tranches/V/coordination` · `../glass-ui/docs/tranches/BK/coordination` ·
  `../keyframes.js/docs/tranches/V/coordination` · `../sci-report/atlas/docs/tranches/P/coordination`).
  BK re-confirmed the newest glass tranche dir. **0 unrowed · 0 new `I-n` minted · 0 UNREAD in
  X-W1's scope.** `INBOX.md` not written by this seat.

### R1.11 · What is still RED, and whose it is

**G-17 · G-19 · G-20** stand RED with the owners Check 1 named — the lint root is X-W8's
`eslint.config.js` carve, and the deploy arms need a `deploy-pages` run this repair does not
perform. **G-13 · G-16** stay ADOPTED with X.W1.c ⊕ X.W1.d named. Two new REDs are minted by this
seat's own honesty and are named rather than absorbed: the **28 stale modality goldens** (owner:
the first seat that can run the regeneration on a pixel-clean tree) and **ESC-W1R-1** (owner:
X-W4). The four-verb line is **not** advanced: `IMPLEMENTED` stays `NO`, and `VERIFIED` remains
X-W11's alone.

---

## Check 2

**FRESH ADVERSARIAL PASS (L-20, pass 2) · 2026-09-18 · `claude-opus-5[1m]` · VERIFY-ONLY, primary
tree, branch `tranche-u`.** This seat authored none of the wave's bytes, cured nothing, and
inherited no reading: every figure below was re-measured at this seat's own clock from the spec's
own gate commands, and every count double-run. E-3 throughout — not one byte of `W1.md`,
`X-W1-FOLD.md`, the runbook, the adjudicated registry, any unit receipt block, the RESUME block,
the Close, Check 1 or Repair 1, or any committed evidence file was edited. This section and the
LEDGER's own X-W1 row cells are this seat's sole writes.

**CRASH-RECOVERY (standing law), run before any other act.** ⟨cmd⟩ `git status --porcelain` →
13 `M` + 3 `??`. **Not one path is inside this seat's writable set** (`execution/A/X-W1.md` ·
`execution/LEDGER.md`): ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/A/X-W1.md
docs/tranches/X/execution/LEDGER.md` → **empty**. The ten `demo/**/*.vue` edits, `scripts/dev/dev.sh`
(CC-021, NEVER touched, never staged), `docs/tranches/V/reformation/CARRY-LEDGER.md`,
`docs/tranches/X/execution/C/F-W2.md`, `docs/tranches/X/waves/evidence/` and the two untracked
`a11y-control-targets` specs (X-W4's, per R1.5) all belong to sibling seats: **untouched, never
staged, nothing stashed, restored or reset.** No inherited partial work to adopt.

**VERDICT: CONFORMANT-HONEST-RED.** **18 of 21 conditions GREEN · 3 RED (G-17 · G-19 · G-20), each
relieved at the spec's own bytes and owner-named.** Nineteen conditions were re-run at this seat's
own commands with **0 divergences of verdict**; G-13 and G-16 stay **ADOPTED** with their owners
named, exactly as the Close presented them. Check 1's three unrelieved REDs — **G-7 · G-11 · G-1** —
and **G-5** are **GREEN at this seat's own commands, not by inheritance**. Bounds clean over 37
commits / 331 paths; 0 masking constructs; E-3 prints nothing; 0 UNREAD in X-W1's scope.
**The row is PROMOTED.**

### C2.1 · Reproduction — 19 of 21 re-run here, 0 divergences of verdict

| gate | claimed | this seat's own command → output | verdict |
|---|---|---|---|
| **G-1** | GREEN (Repair 1) | ⟨`npx tsc -p tsconfig.e2e.json --noEmit \| grep -c 'error TS'`⟩ → **0**, **double-run 0**; ⟨`npm run typecheck`⟩ (four programs) → **exit 0**, **double-run exit 0**, `grep -c 'error TS'` → **0** both times. ⟨`grep -rn "from ['\"].*demo/@/lib/palette" e2e/`⟩ → **0 live imports**; the 3 surviving mentions are prose in `palette-envelopes.ts` · `admin-auth.ts` · `admin-populated.ts`. **Both halves of the conjunction hold** | **REPRODUCES** |
| **G-2** | GREEN | ⟨`python3 -c "import yaml; …len(d['jobs'])"`⟩ → **9** — `producer · api · oracle-slate · e2e-smoke · e2e-safari · visual · boot-smoke · lhci · deploy-age` (the YAML parser's count, not a grep's; D-6's correction upheld). ⟨`grep -n continue-on-error .github/workflows/ci.yml`⟩ → **2, `:26` and `:218`, both comment prose**. Trigger `push: branches: "**"` ⊕ `pull_request` — every branch, no substitution | **REPRODUCES** |
| **G-3** | GREEN, run-id discharged | `g3-full-suite-2026-09-18.md` at the bytes: `58d6f731` · `2026-09-18T04:40:45.654Z` · **1137.5 s** · 187/145/**40**/2/0, all 40 classified with an owner per class. The second witness re-read at GitHub's own API by this seat: job `105719151511` log → `Running 202 tests using 1 worker` → **`37 failed · 3 flaky · 2 skipped · 160 passed (55.0m)`** — byte-for-byte R1.7's figures | **REPRODUCES** |
| **G-4** | GREEN | `ci.yml:255-279` — `npx --yes @lhci/cli@0.15.x autorun --config=value.js/lighthouserc.json`, **no flags, no overrides**. ⟨`git log --oneline -- lighthouserc.json`⟩ → newest **`0441abaf`** (2026-07-07, pre-wave); **0** X-W1 commits touch it — the re-baselining the falsifier forbids did not happen. On master it **executed and failed at step `assert the four budgets`**: the gate is live, the product is over budget | **REPRODUCES** |
| **G-5** | GREEN (Repair 1) | ⟨`node scripts/ci/oracle-slate.mjs`; `echo $?`⟩ → **`SLATE CLEAN — 0 findings (6 routed, named above)`, exit 0**; **double-run byte-identical** (⟨`diff -q`⟩ prints nothing). The 6 ROUTED rows are the `eslint.config.js` dead globs, each naming **X-W8** in the instrument's own output, and each excluded from the exit code | **REPRODUCES** |
| **G-6** | GREEN | ⟨`grep -rn 'test\.fail(' e2e/`⟩ → **10 rows**; ⟨`grep -rnE '^\s*test\.fail\(' e2e/`⟩ → **0 live calls**. Every hit is prose or a recorded ruling | **REPRODUCES** |
| **G-7** | GREEN (Repair 1) | **Re-read at GitHub's API by this seat, both runs, not from the record.** Control `35381701436` job `105719151511` (`master`/`04d2d808`): `Running 202 tests` → **37 failed · 3 flaky · 2 skipped · 160 passed**; ⟨`grep -c 'browse-loading' <log>`⟩ → **0**. Falsifier `35388604746` job `105741411648` (branch **`x-w1-g7-falsifier`**, sha **`3d029e44`**, `event: push`): `Running 202 tests` → **38 failed · 1 flaky · 2 skipped · 161 passed**; ⟨`grep -c 'browse-loading'`⟩ → **8**, listed as failure **#30** at `browse-loading.spec.ts:48:29` with `Expected: 1 / Received: 0`. **Exactly one more failure and it is the planted one.** ⟨`git ls-files …/falsifier \| wc -l`⟩ → **2** (it read **0** at Check 1). Scratch branch never merged | **REPRODUCES** |
| **G-8** | GREEN | ⟨`git ls-files e2e/visual \| wc -l`⟩ → **226**; ⟨`git ls-files 'e2e/visual/goldens/**/*.png' \| wc -l`⟩ → **207**. FM-12 satisfied at the index | **REPRODUCES** |
| **G-9** | GREEN | `tolerance.ts:105` `MAX_DIFF_PIXELS = 120` · `:120` `threshold: 0.15` with its rationale; `:113` `return Math.min(parsed, MAX_DIFF_PIXELS)` — **the env override can only TIGHTEN**. `G9-INJECTION.md`'s validation is by measurement (394 px against the 120 bar), not by argument | **REPRODUCES** |
| **G-10** | GREEN | ⟨`git ls-files 'e2e/visual/goldens/**/*.png' \| grep -c 'real\|emulated'`⟩ → **207 of 207**; `visual` is a job at `ci.yml` under G-2's every-branch trigger. *(The modality-label defect Repair 1 disclosed is treated at **D-2**; it moves no gate)* | **REPRODUCES** |
| **G-11** | GREEN (Repair 1) | ⟨`git ls-files docs/tranches/X/evidence/w1/real-gpu \| wc -l`⟩ → **1** (`TOMBSTONE.md`; it read **0** at Check 1). Read whole at this seat: **dated 2026-09-18**, quotes `W1.md` §X.W1.f and §COMPLETABLE verbatim, carries DR-07's six-close chain (⟨`grep -cE 'N X14\|R8-22\|U-F54\|CH-7'`⟩ → **3** distinct chain anchors), states the cost by measurement (⟨`git ls-files 'e2e/visual/goldens/**/*.png' \| grep -c swiftshader`⟩ → **207 of 207**, so no frame here was rendered by a real GPU), and refuses the escape hatch in advance. **The second terminal state, not the third** | **REPRODUCES** |
| **G-12** | GREEN | ⟨`node scripts/ci/boot-smoke.mjs --mode=dev --seed=default`⟩ at this seat → **`dev: 1/1 seed cases passed`**; A1 `#app` **6** element children `[DIV,DIV,SPAN,DIV,DIV,DIV]` · A2 **1** landmark `[Color tool panes]` · A3 `[]` · A4 **47 desktop utility rule(s) across 33 sheet(s)** — identical at a fourth clock | **REPRODUCES** |
| **G-13** | GREEN (ADOPTED) | **not re-run here and not re-claimed**: `npm run gh-pages` replaces the untracked `dist/` that `test/**` binds to and that sibling Track A seats read (WO-5's own stated reason). Owner X.W1.c ⊕ X.W1.d named | **ADOPTED, label upheld** |
| **G-14** | GREEN | ⟨`git ls-files docs/tranches/X/evidence/w1/nv-7-root.md`⟩ → TRACKED at `d677c30c`; the differential's one knob and both arms are in the committed bytes | **REPRODUCES** |
| **G-15** | GREEN | ⟨`grep -n 'tranche/BG\|repository: mkbabb' .github/workflows/deploy-pages.yml`⟩ → **one hit, `:83`, inside the retired-history comment**; **0** sibling checkouts | **REPRODUCES** |
| **G-16** | GREEN (ADOPTED) | not re-run, same `dist/` reason; owner X.W1.d named | **ADOPTED, label upheld** |
| **G-17** | RED | ⟨`gh run list --branch master --workflow ci --limit 5`⟩ → newest `35381701436` (`event: push`, `04d2d808`), `status: in_progress`. Jobs: `producer / Node 22` **failure** · `producer / Node 24` **failure** · `oracle slate` **failure** · `lhci` **failure** (at step **`assert the four budgets`**) · `deploy-age` **failure** · `e2e-smoke` **failure** · `api / Node 22` success; `e2e-safari`, `visual`, `boot-smoke` **still `in_progress`**. Lint reproduced here: ⟨`npx eslint . --max-warnings=0`⟩ → **`✖ 55 problems (23 errors, 32 warnings)`**, and ⟨eslint `-f json`, errors bucketed by directory⟩ → **`{'docs/tranches': 23}`, total 23 — every one under `docs/**`** | **REPRODUCES** |
| **G-18** | GREEN | ⟨`git merge-base --is-ancestor 80fe6c75 origin/master`⟩ → **YES**; ⟨`git log -1 --format='%H %P' origin/master`⟩ → `04d2d808` ← `44ddaff7` ⊕ `80fe6c75` | **REPRODUCES** |
| **G-19** | RED | ⟨`gh run list --workflow deploy-pages.yml --limit 100 --jq '[.[]\|select(.conclusion=="success")]'`⟩ → **4 successes ever**, all 2026-07-05/07: `28836880612` · `28836569824` · `28723903374` (`workflow_dispatch`) ⊕ `28724805140` (`workflow_run`). **0 in this wave.** No dispatch was fired by any seat to manufacture one | **REPRODUCES** |
| **G-20** | RED | ⟨`curl -s https://color.babb.dev/ \| grep -oE 'assets/[^"]+\.js'`⟩ → **`assets/index-D9U9KwTn.js`** (+ `rolldown-runtime-QTnfLwEv.js`, `glass-ui-CShs8agU.js`) — byte-identical to B17's 2026-08-03 authoring reading | **REPRODUCES** |
| **G-21** | GREEN as gate | the `deploy-age` job concluded **failure** on the master run of record with both overrides blank. Repair 1's D-8 hardening read at the bytes: `ci.yml`'s step now **`exit 1`** on an empty `CLOSE_AT` with its reason printed, where it used to `exit 0` — the one fail-open path in the job that exists to refuse fail-open is gone. ⟨`actionlint`⟩ was exit 0 at that seat | **REPRODUCES** |

**19 of 21 re-measured at this seat (17 by command, G-3 and G-9 at their committed artifacts, both
cross-checked at GitHub's API); G-13 and G-16 left ADOPTED with their owners named.
Divergences of verdict: 0. The state at the bytes is 18 GREEN · 3 RED.**

### C2.2 · Bounds — 37 commits, 331 distinct paths, 0 outside

⟨`git show --name-only --format=` over all 37 X-W1 commits, unioned and sorted⟩ → **331** paths.
⟨union grep⟩ → `registry/adjudicated/` **0** · `docs/tranches/X/waves/W*.md` **0** · `refinement/`
**0** · `scripts/dev/dev.sh` **0** · `src/` **0** · `api/` **0** · `lighthouserc.json` **0** ·
`vite.config.ts` **0** · `eslint.config.js` **0** · `o9-shadow-palette` **0**. The members outside
`e2e/` · `docs/tranches/X/` · `test/` · `scripts/{ci,visual}/` · `.github/workflows/` ·
`demo/test/` are exactly six, each read against its grant: `package.json` (scripts-block carve,
verified at the diff by Check 1) · `playwright.config.ts` · `tsconfig.e2e.json` (§File Bounds) ·
`tsconfig.test.json` · `vitest.config.ts` (fold §3 BoundsDelta 32–34 ⊕ WO-1/WO-2) ·
`docs/tranches/V/coordination/INBOX.md` (E13's durable ledger, append-only). Repair 1's own nine
paths re-read here per commit: `ci.yml` · `e2e/visual/` ×4 · `e2e/smoke/crash-battery.spec.ts` ·
`evidence/w1/` ×3. **Bounds: CLEAN.**

### C2.3 · Masking — none; the near-misses read at the bytes, not pattern-matched

⟨union of Repair 1's six commits, added lines only⟩: `test.skip(` **0** · `test.only` **0** ·
`: any` **0** · `as any` **0** · `@ts-expect-error` **0** · `@ts-ignore` **0** · `eslint-disable`
**0** · `continue-on-error` **3 — every one prose** (two quoting D48's waiver by name, one a
⟨grep⟩ receipt) · `allowlist` **1 — prose**, the MODALITY register naming it as a forbidden cure ·
`node_modules/` **4 — prose**, all inside ⟨grep⟩ receipts against Playwright's own types; **no
`node_modules` byte is patched**. Three constructs were read whole rather than grepped:

1. **`9ebb2020`'s G-1 cure.** Four files typed by *adding* failure modes, never by suppressing
   them: `required<T>()` **throws** the divergence sentence the census guard exists to report;
   `golden-integrity.spec.ts` **throws** on a mid-pixel truncation (`undefined << 16` is `0`, so the
   old code would have counted a truncated golden as one more black pixel); `capture.ts`
   feature-tests `animationName`/`transitionProperty` with `in` rather than casting, because
   `instanceof CSSAnimation` is unavailable in WebKit where the same helper runs. `e2e/visual` was
   **not** excluded from `tsconfig.e2e.json` — that exclusion would have re-cut the exact B10 hole
   G-1 exists to close.
2. **`190a2cd8`'s G-5 cure is not an allowlist and not a narrowing.** It replaces two locator unions
   in which *every member was dead* (`article, [data-palette-card], .palette-card` and
   `.extract-swatch, [data-extract-swatch], [data-palette-swatch]`) with the live hooks
   `getByRole("article")` and `[aria-label^="Color swatch "]`. Re-measured here:
   ⟨`grep -rl <literal> demo/ src/ node_modules/@mkbabb/glass-ui/dist`⟩ → **0 files** for each dead
   member. An arm that could not pass under any product behaviour is not born-RED; after the cure
   both arms can pass **and** fail, which is strictly more assertion, not less.
3. **`359af5bb`'s G-21 hardening removes a green, it does not add one** — the empty-`CLOSE_AT`
   branch now `exit 1`.

**No masking fallback anywhere in the diff.**

### C2.4 · Commit families

Row 1 whole at `75636b16` · row 2 whole at `e2347c0e` (227 files) · row 3 whole at `cad51f9e` ·
row 4 in two commits (`7bc72838` → `2e1fd65f`, the disclosed WRITE-THEN-MEASURE correction — INFO,
one meaning) · row 5 whole at `ec654158` · row 6 partitioned per unit as §Disjointness requires ·
row 7 = merge `04d2d808` · row 8 = close `91b74e43`. Repair 1's six commits are **one meaning each**
(tombstone · run-id addendum · falsifier · G-1 typing ⊕ its own disclosure file · G-5 ruling ·
G-21 hardening) and none belongs to a declared-unsplittable family. **No family was split.**

### C2.5 · E-3

⟨`git diff --stat a8d9af99..HEAD -- docs/tranches/X/waves/W1.md docs/tranches/X/refinement/X-W1-FOLD.md docs/tranches/X/EXECUTION-RUNBOOK.md`⟩ → **prints nothing**. The 331-path union holds **0**
`registry/adjudicated/**`, **0** `waves/W*.md`, **0** `refinement/**`, **0** conformance artefacts.
Every correction this wave has made to an immutable surface — D-6's job census, the modality no-op,
the G-3 run id, D-5's premise, the SELF-COUNT of Repair 1's register — is a **dated addendum-beside**.
**E-3 HELD.**

### C2.6 · E13 mail

Four paths swept read-only at this seat's clock. ⟨`find <each> -maxdepth 1 -type f -newermt
"2026-09-18 16:05"`⟩ → only `docs/tranches/V/coordination/INBOX.md` (this ledger, touched by a
sibling track's `c096c8ab`; self-excluded under the SELF-COUNT law); the glass **BK**, keyframes.js
and atlas paths return **empty**. BK re-confirmed the newest glass tranche dir (⟨`ls -dt
../glass-ui/docs/tranches/*/ | head -3`⟩ → `BK/ · BJ/ · BI/`). `INBOX.md` holds **70 `I-n`/`O-n`
rows**; classification from each row's **status cell**, never a bare `grep -i unread`: **7 carry
UNREAD** — `O-20` (our own outbound, SENT) · `I-30` · `I-31` · `I-32` · `I-33` · `I-34` · `I-35`,
the same seven the Close, Check 1 and Repair 1 read. Cross-checked by **vocabulary at the letters
themselves**, not by their routing prose: ⟨`grep -Eic
'deploy-pages|color\.babb\.dev|\.github/workflows|e2e/visual|boot-smoke|oracle-slate|lighthouserc|tranche-u|merge to master|deploy-of-record'`⟩
over all four live glass letters → **0 · 0 · 0 · 0**. **0 unrowed · 0 new `I-n`/`O-n` minted by
this seat · 0 UNREAD in X-W1's scope.** `INBOX.md` was not written.

### C2.7 · The four-verb line — moved lawfully

`W1.md` §State is **byte-untouched** (C2.5) and still reads `IMPLEMENTED: NO` / `VERIFIED: NO`; the
spec is a dated file outside every unit's §File Bounds, so the verb state of record is this record's
table and the LEDGER row (the Close's own ruling at `:1371`).

| verb | state at Check 2 | basis |
|---|---|---|
| AUDITED | **YES** (unmoved) | `registry/DISEASE-REGISTRY.md` DR-07..DR-11, DR-22 |
| SPECIFIED | **YES** (unmoved) | `waves/W1.md` ⊕ `refinement/X-W1-FOLD.md` |
| **IMPLEMENTED** | **YES — carried by the `CLOSED` status set at this check** | `LEDGER.md:7-9`'s own vocabulary: `IMPLEMENTED` = *"every unit's commits landed; close record written"* (true: all six units' obligations are at the bytes, `f`'s tombstone arm landing at `20a7b623`), and `CLOSED` = *"verify-only close + fresh check CONFORMANT"*, which this pass is. The Close withheld the verb **at seven REDs, three of them unrelieved**; that condition no longer holds |
| VERIFIED | **✗** | X-W11's release close alone (R-A). Never this wave's seat, and this seat does not stamp it |

### C2.8 · §Goal criterion, read at the bytes — four of five clauses TRUE (was three at Check 1)

| clause | at the bytes |
|---|---|
| browser suite executes | **YES** — `e2e-smoke` · `e2e-safari` dispatched on the master push run |
| visual oracle executes | **YES** — `visual` job, every-branch trigger |
| boot truth both modes executes | **YES** — `boot-smoke` job, the whole seed matrix |
| **each demonstrated capable of turning red** | **YES — the clause Check 1 read FALSE.** G-7's differential is now at a URL: one planted assertion, same 202 tests, same workflow, **37 → 38 failures**, the delta named in the job's own log. `oracle slate`, `lhci`, `deploy-age` and `e2e-smoke` all concluded **failure** on master; the visual oracle's redness was demonstrated by G-9's 394-px injection and boot-smoke's by the mount-deletion falsifier |
| **deploy-of-record executes** | **NO** — G-19 (0 push-arm successes) and G-20 (production still serves the 2026-07-07 artifact). **This is exactly the honest-RED set of C2.9 and nothing else**: the one unmet clause is accounted for, gate by gate, by REDs that carry the spec's own relief |

### C2.9 · HONEST-RED ADJUDICATION (axis 10) — three REDs, all three relieved and owner-named

| red | relief at the governing bytes, quoted | owner |
|---|---|---|
| **G-17** *(root a — lint)* | ⟨eslint `-f json`, errors by directory⟩ → **23 of 23 under `docs/tranches`**. `X-W1-FOLD.md:815` **BOUNDARY LOCK**: *"`eslint.config.js` is **X-W8's `modify-carve`**"*, and `:964` lists it among the files W1 must not add; `W8.md:79` carries it as `modify-carve` and `W8.md:42` names the cure (*"delete the six dead `demo/@/**` file globs"*). **A W1 cure is an out-of-bounds write.** The slate itself ROUTES all six dead globs to X-W8 **in its own output** and excludes them from its exit code | **X-W8** |
| **G-17** *(root b — LHCI budgets)* | the `lhci` job **executed** and failed at its own step `assert the four budgets` — a PRODUCT-performance RED, not a gate defect (G-4 is GREEN on its own condition). `W1.md:378-379` §Dependencies routes the performance surface out of this wave: *"**Blocks**: **X-W2** (CC-036's p75-LCP-over-N≥20 gate needs LHCI …; CC-035's eager-bytes delta needs G-13's prod-preview build)"* | **X-W2** (CC-035 · CC-036) |
| **G-17** *(root c — the e2e arms)* | the master `e2e-smoke` run's 37 failures are the born-RED product arms this wave's own instruments exist to expose. `g3-full-suite-2026-09-18.md`'s classification routes the PRODUCT class *"X-W2 / X-W4 / X-W6 / X-W7; NOT X-W1"*; the fold routes R16 → X-W9, R17 → X-W5 + X-W9, and NG-8's header routes R14 → X-W7.g · R15/R16 → X-W9 · R18 → NO-WAVE-OWNER · R19 → X-W5. **NG-8's own falsifier REQUIRES them to red today** | **X-W5 · X-W7 · X-W9 · X-W2/X-W4/X-W6** |
| **G-17** *(root d — typecheck, slate)* | **CURED**, at `9ebb2020` and `190a2cd8`, measured GREEN at this seat. They are on `tranche-u` and absent from master's tree, which predates them — recorded as **D-3** below, not as relief | cured (X-W1) |
| **G-19** | strictly downstream of G-17 (the `deploy-pages` `if` requires `workflow_run.conclusion == 'success'`), **plus** ESC-W1E-3's anchor defect re-confirmed here at the bytes: `deploy-pages.yml`'s only triggers are `workflow_run` ⊕ `workflow_dispatch`, so **no run can ever carry `event: push`**; the one historical `workflow_run` success (`28724805140`) fixes the satisfiable INTENT. The Close's residual **R-CL-6** names the owner and forbids manufacturing one by dispatch — **and no seat fired one** | **orchestrator / X-W11** (R-CL-6) |
| **G-20** | strictly downstream of G-19 — *"Blocked behind G-19, which is blocked behind G-17"* (Close §2). R38's PRE-deploy source epoch is on the record (`80c58885`, value 3.1.0, glass `file:../glass-ui`), so the before/after probe is intact for whoever lands the deploy | **orchestrator / X-W11** (R-CL-6) |

**No RED is laundered.** G-17's four measured roots are enumerated here rather than left at the
Close's single one; three carry spec-byte relief to a named successor and the fourth is cured.
G-19 and G-20 are the deploy arm, which no byte inside X-W1's §File Bounds can reach, and the spec
anticipates exactly this condition by name (`W1.md:136-138`, Triumvirate trigger (i)) — **ESC-W1E-1
stands, returned and widened, never absorbed.**

### C2.10 · Successor "Opens after" conjuncts, measured against this wave

| successor | conjunct naming X-W1 | verdict at these bytes |
|---|---|---|
| **X-W2** | `W2.md:6` *"Opens after: X-W1 (re-gate) — see §10; the byte legs are bench-executable without it"* | pin (i) (`ci` success) UNAVAILABLE, **pin (ii) admissible by the spec's own words** → **NOT blocked** (row already CLOSED honest-RED) |
| **X-W3** | `W3.md:15` *"Opens after: X-W1 (re-gate: **CI + falsifier demonstration must exist** before born-RED gates can be trusted to flip)"* | **CONJUNCT NOW TRUE — the block Check 1 identified is GONE.** CI exists (9 hard jobs) and the falsifier demonstration exists at run `35388604746` with its control. **X-W3 is lawfully UNBLOCKED by this wave** |
| **X-W4** | `W4.md:6` *"Opens after: X-W1 (CC-031 restores `e2e-smoke` as a HARD job …)"* | **GREEN** — `e2e-smoke` is a job, no `continue-on-error`, every-branch trigger. Open is lawful (already OPEN) |
| **X-W6 · X-W7** | reached transitively (`W6.md:4` ← X-W5; `W7.md:6` ← X-W3 ⊕ X-W4 ⊕ X-W6) | X-W7's X-W3 leg is **no longer blocked by X-W1**; both remain gated on their own predecessors, none of which is X-W1's to move |
| **X-W11** | `W11.md:6` *"Opens after: X-W0 … X-W10 are **IMPLEMENTED** (four-verb law; not 'closed', not 'reported')"* | **X-W1's conjunct is now TRUE** (C2.7). X-W11 stays blocked on X-W3 · X-W5..X-W10, all `planned` — **not on this wave** |

### C2.11 · REGISTER — severity · claim · receipt · cure

| # | sev | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **MEDIUM** | **The G-21 deploy-age job SELF-BLOCKS the deploy it exists to force, and no seat has named it.** `deploy-age` is a job *inside* `ci`; `deploy-pages` ships only when `github.event.workflow_run.conclusion == 'success'` for that same `ci` run. So: stale deploy → `deploy-age` reds → `ci` reds → `deploy-pages`'s `if` is false → no deploy → the deploy stays stale. **G-19 and G-20 are therefore unreachable through the push arm by a mechanism THIS WAVE built**, and will stay so after X-W8's lint cure, X-W2's budgets and every product arm lands. The record routes G-19/G-20 to *"orchestrator / X-W11"* without telling that owner a bootstrap act is required | `.github/workflows/deploy-pages.yml:51-55` (the `if` triple) ⊕ `ci.yml`'s `deploy-age` job, which ran live and **exit 1** with both overrides blank. ⟨`grep -rniE 'circular\|deadlock\|bootstrap\|self-block' <the record> <W1-LOG.md> <evidence/w1/>`⟩ → **0 hits on this mechanism**. WO-3 records *why* the check is a job in `ci.yml` (§File Bounds admits only two `scripts/ci/*` creates) but not the consequence | Dated addendum-beside naming the bootstrap: **one** `VJS_DEPLOY_AGE_DEPLOY_OVERRIDE` repo-var set to the intended deploy date, or one deliberate `workflow_dispatch`, breaks the cycle once and the push arm is self-sustaining thereafter. At **X-W11**, move the age check out of the workflow whose greenness gates the deploy, or make its input the deploy this run would produce. **Not** `continue-on-error`, which G-2 forbids by name |
| **D-2** | **MEDIUM** | **28 committed goldens do not witness what their filenames claim, and their re-mint has no wave-level owner.** Repair 1 measured that `reducedMotion`/`forcedColors` are silent no-ops as top-level test options and moved both under `contextOptions`; the 14 `reduced-motion-desktop` + 14 `forced-colors-desktop` cells were therefore minted with the modality OFF, and the `visual` job now reds on exactly those 28. The disclosure is exemplary; the owner is a **condition** (*"the first seat that can run … on a pixel-clean tree"*), not a wave or unit id | **Independently re-measured at this seat**, Playwright **1.60.0**: ⟨`grep -nE '^\s+(reducedMotion\|forcedColors\|colorScheme\|contextOptions)\??:' node_modules/playwright/types/test.d.ts`⟩ → **`colorScheme` (`:7084`) and `contextOptions` (`:7508`) ONLY** — neither `reducedMotion` nor `forcedColors` is a top-level option; ⟨`grep -rn 'reducedMotion\|forcedColors' node_modules/playwright/lib/`⟩ → **0**. `MODALITY-NO-OP-2026-09-18.md:105-110` carries the owner as a condition | Name a wave in the residual register — an in-bounds redispatch of X.W1.b's `e2e/visual/**` set, or X-W11's release battery — and re-mint with ⟨`node scripts/visual/regenerate-goldens.mjs --accept -g "reduced-motion-desktop\|forced-colors-desktop"`⟩ on a pixel-clean tree. The evidence file already forbids the four masking alternatives by name |
| **D-3** | MINOR | **Repair 1's cures are on `tranche-u` only; master's tree predates them, and the record does not say so.** G-17 is therefore re-measured against **uncured** bytes: master still carries the 14 `e2e/visual` diagnostics and the 3 slate findings that `9ebb2020` and `190a2cd8` closed | ⟨`git log -1 --format='%H %P' origin/master`⟩ → `04d2d808` ← `44ddaff7` ⊕ `80fe6c75`; every repair commit post-dates `80fe6c75`. R1.9's G-17 row says only *"not moved by this seat"* | One line in the residual register: master will not green on those two roots until a further landing, which is the same landing G-17's other three roots need. Mitigated — G-17 stays RED on X-W8's and X-W2's roots regardless, so no verdict turns on it |
| **D-4** | MINOR | **ESC-W1E-1's root census for G-17 is narrower than the run of record.** The escalation and R-CL-5 enumerate the `producer` job's roots (lint, typecheck); the run also fails at `lhci`, `e2e-smoke`, `oracle slate` and `deploy-age`, each an independent bar to *"the `ci` workflow is green on `master`"* | run `35381701436` job list, re-read here: six failing jobs, one success, three still `in_progress` | C2.9's table above is that census, written as a dated addendum-beside. The Close's and Check 1's cells are immutable and are not edited |
| **D-5** | MINOR | **Four CI jobs on the run of record are still `in_progress`** hours later — `e2e-safari`, `visual`, `boot-smoke` (and the run itself). Their first-ever verdicts on master remain owed; R-CL-10's `e2e-smoke` half was discharged by Repair 1, the other three were not | ⟨`gh run view 35381701436`⟩ at this seat → `status: in_progress`, those three jobs `in_progress` | R-CL-10 already names the owner (*the next seat to read run `35381701436`*). Non-blocking: no gate's GREEN depends on them, and G-17 is RED on six other jobs |
| **D-6** | INFO | The two untracked `a11y-control-targets` specs remain untracked at this clock; Repair 1's R1.5 correctly re-routed them to **X-W4** at the spec bytes | ⟨`git status --porcelain e2e/`⟩ → two `??`; `W4.md:128-129` admits both as `create`; ⟨`grep -c 'a11y-control-targets'`⟩ over `W1.md` and the fold → **0** and **0** | none owed here — ESC-W1R-1 is live against X-W4, which is OPEN on this track |

**Nothing in D-1..D-6 is a bounds breach, a masking fallback, an E-3 violation, or an unreproduced
GREEN. Zero BLOCKER · zero CRITICAL · zero HIGH.** The three defects Check 1 returned as HIGH —
G-7's undemonstrated falsifier, G-11's forbidden third state, G-1's 14 diagnostics on bytes this
wave minted — are each **cured at the bytes and re-measured GREEN by this seat's own commands**,
and the two cures that could have been bought cheaply (an `exclude` of `e2e/visual` from the
typecheck program; a `test.skip` of the two modality arms) were **refused in writing and are absent
from the diff**. What remains RED is the deploy arm and the lint/perf/product roots beneath it, all
of them outside this wave's §File Bounds and all of them named to a successor.

**LEDGER: status promoted to `CLOSED 2026-09-17 (honest-RED: G-17 · G-19 · G-20)` — the status
token is the tranche's own execution-epoch form, as `X-W0`'s and `X-W2`'s rows carry it; this check
ran at its own clock on **2026-09-18**, which the appended event line dates. One event line
appended; the row's other cells are left as their authoring seats wrote them (E-3).**
