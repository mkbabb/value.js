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
