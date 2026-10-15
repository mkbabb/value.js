SERVED MODEL: claude-opus-5-5

#### Sitting 3 (2026-10-15, seat 0, `claude-opus-5-5`) — the re-run rounds finished, the failures classified

- **Why sitting 2 stopped.** ⟨`last -5`⟩ → `console Wed Oct 14 10:54 - 13:24`; ⟨`ls /Library/Logs/DiagnosticReports | grep WindowServer`⟩ → `WindowServer-2026-10-14-132418.ips`, whose ⟨`grep -o '"ktriageinfo"…'`⟩ reads `VM - (arg = 0x1) vm_map_copyout_kernel_buffer failed` and `EXC_CRASH SIGABRT`. The machine did not reboot (⟨`uptime`⟩ → up 5 days). WindowServer aborted when a kernel buffer copy-out failed under VM pressure, and that ended the GUI login and every session in it. The guard's own header (2026-10-15 rewrite) records the state around it: hours at load 50–136 on 18 cores, 1,200+ processes, swap near full. Seven `com.apple.WebKit.WebContent.Development` crash reports were written between 13:19 and 13:21. This seat's s3 `smoke` round was running then, on Chromium only. The WebKit stacks belonged to other sessions. At this sitting's open: load 13, memory free 64 %, swap 87–89 %, 1,280–1,340 processes.
- **Crash recovery.** ⟨`git status --porcelain`⟩ over this unit's set gave: `q/failures.mjs` and `q/tally.mjs` modified, and the s2/s3 logs, results and runner scripts untracked. All of it is sitting 2's work (`run-guarded.sh`, `run-perf-guarded.sh`, `rerun-chain.sh`, `rerun-ids.sh`) and is adopted here. Sitting 1's `receipt-part1.md`/`-part2.md` drafts were adopted and folded into this receipt. One outside-set orphan family also belongs to `.q`: six `e2e/smoke/**` specs carrying `(X-W12U .q)` comments, mtimes 10-13 16:28–16:46, and `demo/test/palettes/plate-mass.test.ts` (10-13 17:08). See *Escalations*. The other dirty `demo/**` paths are X-DS's (10-09 pass-9 orphans, and the 10-14 12:21–12:26 VC3-01 work in `playwright.config.ts`, `n-fixtures/browser.ts`, `MixConfigBar.vue` and `PalettesPane.vue`). This seat did not touch them, and every reading below ran over them.
- **Instrument (sitting 3).** These are sitting 2's guarded runners, changed in three ways:
  1. `run-guarded.sh` takes the machine-wide WebKit lock (`guarded --exclusive webkit`, new on 10-15) for any `*safari*` project, and its default timeout is the guard law's 45 min (sitting 2 had 120).
  2. `Q_INNER=1` runs a step unguarded inside one batch.
  3. `q-batch.sh` and `q-run.sh` admit the remaining rounds as two guarded batches: C (Chromium, no lock) and W (WebKit, `--exclusive webkit`).

  The reason for the batches was measured. `q-chain.sh`'s q1 `oracles-safari` step waited **1 h 51 min** for a guard slot (13:02 → 14:34). In that time three other sessions' 20–170 min runs (glass-ui BL harnesses and others) held all three slots. The guard's `acquire_slot` polls every 5 s and keeps no queue, so a single poller can starve. This seat stopped its own starved chain (⟨`kill <its guarded pid> <its sh pid>`⟩; recorded in `logs/q1-chain.txt`) and folded what remained into the batches. No process of another seat was touched.

#### Act 3 · the whole `--workers=1` smoke and the §0ev.2 rounds: what was read, and what was not
- **The whole run of record is sitting 2's s2** (10-14 11:14 → 13:00; HEAD `c7beb41ec`/`3666479cd`/`2be200dc3` as the tree moved; load 30–157). ⟨`grep -E '^\s+[0-9]+ (failed|passed|skipped|did not run)' logs/s2-*.log.txt`⟩:

  | project | passed | failed | other |
  |---|---|---|---|
  | `smoke` | 229 | 62 | 2 skipped |
  | `smoke-admin` | 21 | 0 | |
  | `smoke-mobile` | 7 | 0 | |
  | `smoke-safari` | 4 | 0 | |
  | `smoke-perf` | — | 7 | |
  | `smoke-reactivity` | — | 1 | 1 did not run |
  | `oracles-safari` | 111 | 55 | |

  ⟨`node failures.mjs results/s2-smoke.json`⟩ → `COUNT passed=230 failed=50 timedOut=11 skipped=2 total=293` (the list reporter's 62 = 50 + 11 + 1 interrupted-at-end).
- **Re-run 1.**
  - s3 (10-14 13:11–13:21, load 31–41): `smoke-reactivity` 1/1 passed. `smoke-perf` 3/7 passed. `smoke` reached 9 of its 50 ids: 3 ✓ and 6 ✘. The session then died at 13:24 (WindowServer).
  - q1 (this sitting, 12:30–12:43, **load 11–27**, HEAD `2229dc7ab`): the other 41 `smoke` ids → ⟨`node failures.mjs results/q1-smoke.json`⟩ `COUNT passed=10 failed=42 timedOut=5 total=57` (parametrised titles expand the 41 ids to 57 tests).
  - q1 `smoke-perf` (12:59–13:02, load 11→20, HEAD `39e0a55de`): `drag-frame-budget` ✓; `eager-payload` G2, G3/G4 and `o5-boot-pacing` ✘ (re-run 2 of those three).
- **Re-runs 2 and 3 were NOT read, and the `oracles-safari` 45 were never re-run.**
  - Admission was starved first: 1 h 51 min for a guard slot, then batch C was not admitted from 14:35 to 16:46.
  - Then the host re-entered the pre-crash regime: ⟨`sysctl -n vm.loadavg`⟩ 81–133 sustained from 15:15; ⟨`sysctl vm.swapusage`⟩ `used = 8841.44M` of 10240M; 1,331 processes; CrowdStrike Falcon at 84–100 % CPU. That is the same signature as the 10-14 WindowServer abort.
  - This seat would not queue more heavy runs into it. It stopped its own unadmitted runner at 16:46 (`logs/q1-chain.txt`). No test was killed mid-run.
- **The addendum (e) WebKit re-read.**
  - s2: `smoke-safari` dual-webgl-atmosphere ✓ ×2 (11:16–11:17, load 44–47) and `oracles-safari` o3 ✓ ×2 (dark, light; ~12:59, load ≈ 60), both on the tree carrying sitting 1's `/#/` cure of `dual-webgl-atmosphere.spec.ts`.
  - Sitting 1 (10-13, load 118–126): o3 ✘ r2 and ✘ r3, cause *Test timeout* at the cold load.
  - Read of record: **one GREEN read each at load 44–60. The 3× re-read is owed.** It is the W batch, never admitted.

#### Act 4 · classification of every s2 failure: cause read from the q1/s2 traces (`logs/q1-trace-causes.txt`, `logs/s2-trace-causes.txt`, `logs/s2-safari-trace-causes.txt`) and the bytes
**LOAD-FLAKE (passed on a re-run; the failed run's trace shows a starved action, not a wrong page).** Reported, never masked:
- `a11y-control-targets:352` · `a11y-modality-support:86` · `a11y-web-modality:33`: s3 ✓.
- `reactivity-instant:42`: s3 ✓.
- `o11-header-gates:220` · `o14-preview-truth:361,:373,:440` · `o15-dock-register:50` · `webgl-blob:13`: q1 ✓.
- `o18-contrast-census:992,:1296`: one of their two parametrised cells ✓ in q1.
- `perf/drag-frame-budget:33`: s2/s3 timed out at load 55 on a 7.1 s canvas evaluate and 4 s mouse moves; q1 ✓ at load 11. It ran with sitting 1's `/#/` address cure (see *Escalations*).

**DETERMINISTIC (failed s2 + its re-run at load 11–27, so not load). The cause is read, and the cure lies OUTSIDE this unit's writable set.** Stale oracles, against bytes that landed in later waves:
- `a11y-select-title:304,:393` waits for `h3.pane-header-title`. The title is `h${level}` with default 2 (X.W5.a, `PaneHeader.vue:41,57`).
- `w12-about-clip:124` ×3 reads `region.firstElementChild` as the card. Since `.k2`'s PaneShell (A2-VA-L1-1, `ca65ae049`) that child is the `.pane-shell` wrapper, whose `overflow` is `visible visible`; the card (`PaneShell.vue:33`) is `overflow-hidden`. `o7-card-census:190 ×2, :438` (`(none)` for rung) is the same class.
- `o10-type-locks:73` and `o17-easing-composition:121 ×2, :147` are strict-mode violations: `.pane-shell .space-trigger` and `#easing-authoring-0 svg` now resolve to 2 elements.
- `o10d-display-voice-census:217,:264` expect `line-clamp`. The specimen name truncates by design since X.W7.c (`9250dd192`, G12 priority-collapse).
- `o22-status-lamp:80` expects `.dock-status-lamp`. That class now renders only from the dock seat (`.k2` A2-VA-L1-9, `8b5b48347`).
- `scene-action-contract:172 ×3` expects `unavailable` on mobile. X-W5's `bindPane` cured the registration the oracle encodes as absent, so the bar reads `ready`.
- `walk:17` and `o20-generate-plate:60` name a "Generation preset" combobox. The label is `Preset` since CC-047 (`583715162`).
- `views/gradient:613` asserts a docs letter's text (`glass-ui **10.1.0**`).
- `o29-scene-contracts:109` gets an extra `undefined:null` region.
- `o15-dock-register:87,:125` read glass 7-era dock padding (`8px 12px` vs glass 10.1.0's `4px`).
- `w7-inspector-rows:86,:130` and `w7-mutation-visibility:43`: verbs and rows moved (`palette.save` no longer in the inspector set; the seeded row's xpath never resolves).
- `o14-preview-truth:294` ×2: the click on "Select view" never lands (pending 25–28 s at load 22–27).
- `o27-focus-affordance:103` (target 24 vs `< 22`) and `:321` (no `option "Picker"`).
- `w12-dock:358` (the focus-visible frame).

The Chromium-only APIs in `oracles-safari` are the same class: `o4-order-invariance:41` (CDP) and `o11-header-gates:220` (tracing) carry no engine guard.

**DETERMINISTIC, product or producer readings (owner rows, not oracle drift):**
- `o23-specimen-gamut-honesty:225`: the specimen prints `hsl(346deg -1295% 103.7%)`, and `parseCssColor` clamps the negative saturation to 0. The parser behaviour is `src/**`, which W12U.md §1 forbids.
- `o18-contrast-census:712` (5.74 vs the walked 5.75), `:1296` (`--color-gold` ceiling 2.10:1; the oracle names "X-W10's treatment decision") and `:1321` (profile-menu rows, the census's own "learns them" leg).
- `o19-netting-luma:71` ×4: luma delta 1.6–14 vs ≥ 45/59.
- `o22-specimen-legibility:76`: caption 539 px > 438 px.
- `o26-aurora-perceptibility:52`: field delta 0.000 over 10 s.
- `o28-atmosphere-coldload:114`: first paint ΔE 0.159.
- `webgl-blob-idle:210` ×2: painted chroma 0.138/0.177 vs 0.179/0.253.
- `w12-drag:75` / `w12u-p-drag:205`: "collector dead" means 6–11 frames per 2 s drag. That is not a dead collector: the `smoke` project is SwiftShader by config (`playwright.config.ts:76`), and the 1440 page paints at ~5 fps there (p50 175–259 ms). The `> 10` frame floor is a software-GL floor the soft path does not relieve. The refresh-relative gate of record is the real-GPU leg (Act 1, GREEN).
- perf (re-run ×2, failing all three):
  - `eager-payload` G2: s3 `eager JS gzip 329373 B > 286720 B`; q1 could not read it, because the private build leaves no `dist/gh-pages` at the repo root.
  - `eager-payload` G3/G4: q1 `mobile-4x-cpu p75 TBT 1040 ms > 300 ms`.
  - `o5-boot-pacing`: q1 `1925 ms = 33.5× median`.

  These are X-W2 bars "fixed at wave-open", whose own text names a §3a triumvirate, not a re-baseline.
- **None of these is a `demo/**` root cure this unit can land without design or ruling authority.** The contrast and gold ink are X-W10's (per the oracle). Netting and aurora are atmosphere design. The parser is `src/**`. The perf bars are X-W2's.

#### Act 5 · typecheck · lint (this sitting): GREEN ×2
- ⟨`guarded --light -- npx vue-tsc -p tsconfig.{lib,demo,test}.json --noEmit; … tsc -p tsconfig.e2e.json --noEmit`⟩:
  - r1 (12:18, load 12, HEAD `5546aa900`) → `lib EXIT 0 · demo EXIT 0 · test EXIT 0 · e2e EXIT 0`.
  - r2 (12:25, load 23, HEAD `03219c6c9`) → the same four `EXIT 0` (`logs/q-typecheck-r{1,2}.log.txt`).
- ⟨`guarded --light -- npx eslint . --max-warnings=0`⟩ → r1 (12:21, HEAD `c2a1c49a9`) `LINT EXIT 0` · r2 (12:23, HEAD `03219c6c9`) `LINT EXIT 0` (`logs/q-lint-r{1,2}.log.txt`).
- An earlier lint read at 12:19 printed the exit of `tail`, not of eslint. It is superseded and kept only as `logs/q-lint-r1.log.txt`'s predecessor line.
- **`npm test` ×2 was NOT read this sitting.** It is a heavy run, and it would have queued behind the same starved slots into a load-81–133 host. Sitting 1's vitest pair (10-13, `logs/vitest-r{1,2}.log.txt`, load 87–648) stands as the last reading. It is not a reading at the current HEAD.

#### Residuals
- Re-runs 2 and 3 for `smoke` and `oracles-safari`; re-run 1 for `oracles-safari`'s 45; the WebKit 3× re-read; and `npm test` ×2. All are owed to a host where admission is possible: `batch C` / `batch W` are ready as `q-run.sh`.
- LEDGER: not edited. The row stays PARTIAL.

#### Escalations
- **ESC-W12Uq-1 (bounds).**
  - About 30 deterministic smoke and oracles failures (Act 4, "stale oracles") are cured only in `e2e/smoke/**`. This unit's writable set grants `demo/**` alone, "only for a test failing all 3 runs".
  - W12U.md §1 grants `e2e/smoke/**` only for new `w12u-*` specs, and the §0bt adjacent rule excludes "a different concern". Re-pointing ~20 oracle files at the bytes of X.W5.a / X.W7.c / `.k2` / CC-047 / X-W5 is a different concern.
  - A ruling is needed: a smoke-oracle re-baseline unit (or a grant to `.q`) for the listed files.
- **ESC-W12Uq-2 (orphans of this unit outside its set).** Sitting 1 of `.q` left uncommitted edits, named `(X-W12U .q)` in their comments:
  - `e2e/smoke/admin/a11y-authed-admin.spec.ts`
  - `e2e/smoke/admin/flows/color-reject.spec.ts`
  - `e2e/smoke/admin/flows/tag-delete.spec.ts`
  - `e2e/smoke/mobile/blob-presence-mobile.spec.ts`
  - `e2e/smoke/perf/drag-frame-budget.spec.ts`
  - `e2e/smoke/safari/dual-webgl-atmosphere.spec.ts`
  - `demo/test/palettes/plate-mass.test.ts`

  They are the stale-address / re-homed-path / confirm-dialog cures of the same class as ESC-W12Uq-1, and s2 read the affected tests GREEN with them in the tree (`smoke-admin` 21/21, `smoke-mobile` 7/7, `smoke-safari` 4/4, `drag-frame-budget` q1 ✓). This seat did NOT commit them: six are outside its set, and the seventh fixes a test that never failed three runs. It did not revert them either (§0ex). They wait for the ESC-W12Uq-1 ruling.
- **ESC-W12Uq-3 (owner/product rows).** The Act 4 "product or producer" list needs its named owners:
  - X-W10 (gold ink / contrast)
  - the atmosphere design rows (o19 / o26 / o28 / webgl-blob-idle)
  - `src/**` parser clamp vs the o23 oracle
  - X-W2 §3a (G2 / G3-G4 / o5)
  - the software-GL frame floor of `w12-drag` / `w12u-p-drag`
- **ESC-W12Uq-4 (host).** The §0ev.2 protocol cannot finish while the guard's slot admission starves and the host sits at load 81–133 with swap 8.8 / 10 GB. This is the 10-14 WindowServer-abort signature.
  - The guard keeps no admission queue: `acquire_slot` is a 5 s non-blocking poll.
  - The machine-wide load is other sessions'.
  - A FIFO admission in `~/.claude/guard/guarded`, which is user-level and not a repo path, is the owner's to rule.
