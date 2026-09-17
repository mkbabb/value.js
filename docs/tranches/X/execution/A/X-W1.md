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
