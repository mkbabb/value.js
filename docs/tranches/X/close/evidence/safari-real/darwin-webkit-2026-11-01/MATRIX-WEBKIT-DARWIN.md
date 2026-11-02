SERVED MODEL: claude-opus-5-5

# X.W11.g8w — the darwin real-GPU WebKit witness, G8's cell of record (2026-11-01)

Ruled by W11.md ADDENDUM (sixth) `:533` (§0ge.3: G8 retired under the machine law; this witness is the cell of record) and COHESION §0gz.3(ii). Idiom: `darwin-webkit-2026-10-28/runs/*.meta`. Every run went through `~/.claude/guard/guarded --exclusive webkit` with `--workers=1 --retries=0`, one browser per run, on a dedicated server pair (`VJS_E2E_PORT=9611/9612`). Wrappers: `run-projects.sh`, `run-lastfailed.sh`, `run-o2-repeat.sh`, `run-o2-once.sh`. Each `runs/<name>.meta` holds HEAD, the queue/end load and the exit code. The executed count is read from each run's JSON reporter (`results[-1].status` per test), apart from the exit code.

This cell is WebKit on darwin with a hardware renderer. It is never merged with the Chromium cell (I-20). The Chromium readings below are each cure's stated gate, kept in their own column.

## Runs

| run                                                     | HEAD                                                         | command (beyond the guard + `--workers=1 --retries=0`)                        | listed | executed | passed    | failed                            | exit | load start → end |
| ------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------ | -------- | --------- | --------------------------------- | ---- | ---------------- |
| `webkit-projects` (baseline)                            | `8dceeb3d9`                                                  | `--project=smoke-safari --project=oracles-safari`, cold optimizer cache       | 196    | 196      | 191       | 5 (2 failed · 3 timedOut)         | 1    | 20.94 → 17.79    |
| `lastfailed-r1`                                         | `8dceeb3d9`                                                  | `--last-failed`                                                               | 5      | 5        | 1 (o2:44) | 4 (w7)                            | 1    | 16.44 → 19.79    |
| `lastfailed-r2`                                         | `8dceeb3d9`                                                  | `--last-failed` (the 4 w7 legs)                                               | 4      | 4        | 0         | 4 (w7)                            | 1    | 19.79 → 23.20    |
| `o2-repeat8-before`                                     | `8dceeb3d9`                                                  | `--project=oracles-safari --repeat-each=8 o2-real-hydration-coldload.spec.ts` | 8      | 8        | 5         | 3                                 | 1    | 20.52 → 22.92    |
| `o2-repeat8-after`                                      | cure in tree (`20c57926b`)                                   | the same                                                                      | 8      | 8        | 8         | 0                                 | 0    | 19.62 → 22.59    |
| `o2-repeat8-after-r2`                                   | cure in tree (`20c57926b`)                                   | the same                                                                      | 8      | 8        | 8         | 0                                 | 0    | 20.44 → 18.67    |
| `o2-mutant-never-presents`                              | cure + a never-presenting mutant (reverted, never committed) | `--repeat-each=1`                                                             | 1      | 1        | 0         | 1                                 | 1    | 18.32 → 16.55    |
| Chromium gate `chromium-gate-o2.log` (own column, I-20) | cure in tree                                                 | `guarded --timeout 20 -- … --project=smoke --repeat-each=4` (port 9621)       | 4      | 4        | 4         | 0                                 | 0    | —                |
| `webkit-projects-final` (re-read at the final bytes)    | `20c57926b` (clean product tree)                             | `--project=smoke-safari --project=oracles-safari`, cold optimizer cache       | 196    | 196      | 192       | 4 (2 failed · 2 timedOut, all w7) | 1    | 18.62 → 15.47    |

The meta files record HEAD `8dceeb3d9` for the cured runs because the cure was in the working tree before it was committed as `20c57926b`. The committed bytes are the tested bytes (⟨`git diff 20c57926b -- e2e/smoke/oracles/o2-real-hydration-coldload.spec.ts`⟩ is empty).

**Hardware renderer.** The projects' own renderer-reading specs print `renderer=Apple GPU` ×4, `renderer=Apple GPU gradientFallback=false` ×1 and `renderer=REAL-GPU` ×3 in `runs/webkit-projects.log`. These specs read `UNMASKED_RENDERER_WEBGL` and branch on it (software-GL placeholder vs real-GPU), so the reading is recorded, not asserted here; `dual-webgl-atmosphere.spec.ts:157` does assert the real WebGL substrate (`gradientFallback=false`). The route × viewport sweep that asserts the renderer per cell (`darwin-webkit-2026-10-28/webkit-witness.mjs`) was not re-run in this unit: its cells are not in the 16/196 set and the brief names the projects run.

## Against the 10-28 16/196 set (R12-5)

Baseline at `8dceeb3d9`: 5 of 196 red, against 16 of 196 at `624af6b0b` (`darwin-webkit-2026-10-28/runs/webkit-projects.meta`).

| 10-28 red                          | 11-01 baseline                        | landings since 10-28 on the row's bytes (cross-reference; ancestry checked, not bisected)             |
| ---------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `o18:769` · `o18:823` · `o18:1049` | GREEN                                 | the `.wk2` / `.ink` / `.ref` / `.n2` landings (`3364319e5` · `fdabf7599` · `8573b45ca` · `a6f6d2bc5`) |
| `o21:148` · `o21:193` · `o21:440`  | GREEN                                 | `b1989512e` (O-103b engine-fact form, Chromium the gate)                                              |
| `o28:114`                          | GREEN                                 | `2527a8d20` (O-103b engine-fact form)                                                                 |
| `o30:111`                          | GREEN                                 | no commit to the spec since 10-28; demo landings since (`git log 624af6b0b..8dceeb3d9 -- demo`)       |
| `o33:152` ×3                       | GREEN                                 | `0efa59b49` (AX-tree leg split by instrument, `@chromium-instrument`)                                 |
| `o33:255` ×2                       | GREEN                                 | `16c9b3700` (WebKit full-keyboard traversal key)                                                      |
| `w7:53` · `w7:91` · `w7:121`       | `w7:53` · `:85` · `:101` · `:121` RED | none: honest-RED on O-106 (below)                                                                     |

New in the baseline: `o2-real-hydration-coldload:44` (cured below). `w7:85` and `w7:101` are new reds in the same O-106 family (all six legs `:53 :85 :91 :101 :107 :121` are named on O-106); `w7:91` passed here.

## Each baseline red

### `o2-real-hydration-coldload:44` — harness; CURED (`20c57926b`)

- **Reproduced.** 1 of 1 in the baseline, then passed in `lastfailed-r1`; ⟨`--repeat-each=8`⟩ at `8dceeb3d9` → 3 of 8 red, each `field absent on natural cold load (cssPlaceholder=false, draws=0)`. The hydration legs (restored `--saved-bg` = persisted, trace = `[persisted]`) were GREEN in every red run.
- **Root.** The oracle read `canvasPresents` once, the instant `--saved-bg` settled. On the Apple GPU cell the atmosphere's first frame is an overture beat that lands after that, so the read raced it. The cured leg logs the gap: **9–158 ms** across 16 runs (`o2-repeat8-after*.log`), with 1–4 draws counted. The field does present; the product holds. This is not a WebKit fact either: the read had no settle at all.
- **Cure.** The leg is an `expect.poll` under the spec's own 8 s bound (its other legs already poll at 8000). No timeout was raised, no retry was added, and the leg is not skipped or engine-scoped.
- **After.** WebKit 8/8 ×2. Chromium gate (`--project=smoke`) 4/4, on the CSS-placeholder path (`cssPlaceholder=true`). Final full run: GREEN, presenting 20 ms after settle.
- **Falsifier.** A mutant that never presents reds `field absent on natural cold load within 8 s` (`o2-mutant-never-presents`). It was reverted before the commit.

### `w7-destructive-seats:53 · :85 · :101 · :121` — producer; honest-RED on O-106, never greened

- RED in 4 runs at 2 HEADs: baseline · `lastfailed-r1` · `lastfailed-r2` · final. `:53` fails `expect(dialog).toBeVisible()`. `:85`, `:101` and `:121` time out at 30 s on the accept button's `dblclick`, which resolves `<button disabled … data-press-armed …>` and reads "element is not stable": that is the leaving dialog. Both shapes are O-106's open-then-dismiss (the trailing press of the opening double activation lands on the scrim, and `deliberate` honours it as an outside press). The 10-28 run showed both shapes too (`darwin-webkit-2026-10-28/runs/webkit-projects.log:755-766`).
- Home: INBOX **O-106** (SENT 2026-10-19). Glass has rowed it in `BL/audit/INBOUND.md:79`, "placed in W-E.4 (popper/dialog)". It lifts at the glass repin that carries the rung. No consumer cure is lawful (O-106: `locked` changes the Esc canon; a consumer timer copies producer behaviour). `w7-destructive-seats.spec.ts` is unchanged, with 0 skips.
- No new mail row: the producer row and its numbers already ride O-106, and these readings repeat its measured shape.

## Verdict

**Darwin real-GPU WebKit witness (G8's cell of record): MEASURED at `20c57926b`. 196 listed, 196 executed, 192 passed and 4 red. Every red is `w7-destructive-seats`, honest-RED on O-106 and not counted green.** The renderer is recorded as `Apple GPU` (hardware). Against the 10-28 set, 16 reds are now 4. The one new non-producer red (`o2:44`) was cured at its root in the oracle and read GREEN ×2 plus once in the final run. Origin label: **local dev server** (`vite`, `VJS_E2E_PORT=9611`), not the deploy of record. This cell neither inverts nor confirms the Chromium cell.

## ADDENDUM 2026-11-02 — re-read at HEAD `e18c26504` (X-W11 Repair 2, RESUME eighteenth; E-3: the bytes above are untouched)

- Command: ⟨`sh run-projects.sh repair2-head-r1`⟩, which is the exact `.g8w` command (`guarded --exclusive webkit --timeout 90 -- npx playwright test --workers=1 --retries=0 --project=smoke-safari --project=oracles-safari`). The meta `runs/repair2-head-r1.meta` records `HEAD e18c26504…` · queued `2026-11-01 23:52:05` · `exit 1 end 2026-11-02 01:51:24`. Most of that time was the machine-wide `ex-webkit` lock wait; the suite itself ran `15.4m`.
- The product bytes at HEAD are `.cnm2`'s `288786ed3`. ⟨`git diff --stat 20c57926b e18c26504 -- demo e2e src test`⟩ → 12 files (the `1ccd03f06` / `.cnm2` moves), all after `.g8w`'s reading.
- Count, read from `runs/repair2-head-r1.json.gz` ×2 (⟨`gzip -dc … | python3 -I -c "…['stats']"`⟩) → `expected 195 · unexpected 4 · flaky 0 · skipped 0` ×2; per-test walk → `passed 195 · failed 1 · timedOut 3` = **199 executed**. The executed count is asserted apart from the exit code. The denominator rose from 196 to 199 with `.cnm2`'s o18 legs.
- Reds (4): `w7-destructive-seats.spec.ts:53` failed, and `:85 :101 :121` timed out. That is the same 4 legs and the same shape as `.g8w`, so it is the fifth red run. They stay honest-RED on **O-106** and are not counted green. **Non-w7 reds: 0**, so no root cure is owed.
- The renderer is recorded as `Apple GPU (real-GPU)` (log `[O-1]`, `[O-26]`, `[O-3 dark]`).
- Console noise: `Importing a module script failed` appears 7× in the dev-server log, against 5× in `webkit-projects-final.log`. It is the same class as the banked run, and no test it touches failed.

**Verdict at HEAD `e18c26504`: MEASURED. 199 executed, 195 passed and 4 red, all w7 / O-106 honest-RED.**
