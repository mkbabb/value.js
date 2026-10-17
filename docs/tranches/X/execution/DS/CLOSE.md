# X-DS CLOSE: adversarial cross-app review, second close (2026-10-17)

This replaces the first close (2026-10-16, `2963ab0ee`; still in git history). Since that close, the chassis raised `MAX_PASSES` from 16 to 20 (`8e12bce41`) so value.js and fourier could reach the clean-critic stopping rule. A further workflow round then ran on all three apps:
- keyframes.js: its eighth redeploy, passes 1–11. Passes 1–4 replayed earlier redeploys' critics; the new evidence is `keyframes/pass-50..56`.
- value.js: passes 1–6 (evidence in `value/pass-0N/<seat>-2026-10-1x/`);
- fourier: passes 1–13 (evidence in `fourier/pass-NN/f<N>c/`).

This seat tried to **refute** the claim that the three apps now meet the X-DS canon (`waves/X-DS.md`, read with addendum (a), COHESION §0ek). It did three things:
- read each app's final frames beside its pass-00 frames;
- re-ran every gate ×2 on today's heads;
- put the census and the residuals in one place.

Every browser was headless (§0ei), and every run went through `~/.claude/guard/guarded`. The gate logs are in `evidence/DS/close/r2-2026-10-17/`.

## Verdict

**CONSUMER-CONFORMANT on lighting in all three apps. The census is HONEST-RED, held by glass (O-87 FLAT-LIGHTING / O-88 DOCK-COLLAPSE-MOTION) and by owner rulings that are still owed. X-DS does NOT close GREEN, and the stopping rule is met by fourier only.**

- **Lighting allowance: met by every consumer.** In the final frames, no consumer-owned gloss, glow, stacked shadow, decorative control gradient, idle shimmer or floating glyph is left on chrome. Every row the census still counts belongs to one of three owners: glass's material, glass's dock, or an identity loop that waits on an owner ruling. The consumer census rows did not move this round, and none came back.
- **No identity was lost** (§0dm). The pass-00 identity marks are all in the final frames:
  - value.js: the wine and aurora field, Fraunces display, the italic space name, the 8px cartoon stamp, the hero bead, and the Palettes ramp title;
  - keyframes.js: the cube's face hues, the rainbow play bubble, the serif poster headline and its wave, and the Amiga ball;
  - fourier: the coral trace, the script-F wordmark, Computer Modern type and the paper grid.
- **The stopping rule** ("ends when a pass's critic finds nothing above trivial, and not before pass 12"):
  - **fourier: MET.** Pass 13's critic (F13C) named **0** findings, after 12 cured passes.
  - **keyframes.js: NOT MET.** Pass 11's critic (C11) named 3 findings: KF-C11-01, focus landing inside a parked peek's clipped body at 390, and KF-C11-02/-03, the heatmap legend's line reading. Its cure seat stopped mid-flight. That seat's hunks are **uncommitted** in the keyframes tree, and its probe is in `keyframes/pass-56/`, also untracked. These are layout and focus rows, not lighting.
  - **value.js: NOT MET.** The round ended at pass 6. Pass 6's critic (VC6) named a medium row, VC6-01 (the dock menus overlapped the dock plate), which is cured and measured at `b84fda97d`. No clean critic pass has followed.
- **Gates:**
  - Type-checks are 0 ×2 in all three apps, at today's heads.
  - The heavy suites were stopped by the kernel zone watchdog (13.2M; **the owner must reboot the Mac**). Each app's last cure seat ran its own ×2 at these heads, and those reads stand with standing reds only.
  - Before the stop, the close's own value.js e2e failed 16 tests. 14 are the standing X-W10 cells, and the other 2 are worktree artefacts.
  - Every red has a named owner, and none is an X-DS regression.

## Refutation attempt: what the final frames still show

Frames read (all 1440 and 390, light and dark):
- **keyframes.js:** `keyframes/pass-00/` against `keyframes/pass-55/after/`, covering every route: home, cube, easing, spring, sequence, amiga and square.
- **value.js:** `value/pass-00/` against `value/pass-04/redispatch-2026-10-16/` (the newest full 36-cell route set). Blob and atmosphere come from `value/pass-06/vc6-2026-10-17/`, the newest cells.
- **fourier:** `fourier/pass-00/` against the newest frame of each route:
  - `pass-08/critic-f8c/` for /morph, /paper and /w;
  - `pass-10/f10c/` for /gallery;
  - `pass-12/f12c/` for /equation and /v.

| app | what I could still find | owner | consumer-cureable? |
|---|---|---|---|
| keyframes.js | Closed Selects (direction, fill mode, "Custom") show an **up** caret. Input fields are cream beside grey Select fills in light. | glass, **O-87** (KF-C5p-01, KF-C1-10) | no |
| keyframes.js | The Bezier ghost staircase, and the preset reading "Custom" at `ease`. Stage and pane plates carry a dark halo and blur bands; in light, a stacked cast under the Spring, Sequence and Easing plates. | glass, **O-87** (KF-R6C4-04, KF-C1-09, KF-C10x-G1) | no |
| keyframes.js | The rainbow play bubble's plate and halo. The collapsed dock tile and its halo. | glass, **O-87 / O-88** (KF-C10x-G2) | no |
| keyframes.js | Home's looping title wave and hero dots (census: 80 looping animations on chrome). | **owner DESIGN-RULING owed** (KF-C3-02, §0dm) | no; nothing was stripped |
| keyframes.js | **Cleared against pass-00:** the cube's faces are flat. Pass-00 had a specular radial sheen on every face at 1440 and 390, and the subject census reads 0/0/0/0. The owner's floating eye is now a labelled "Preview" verb. Each pane wears a titled ConfiguratorLayer. | (cured) | — |
| value.js | The hero bead's specular body and double drop. The disabled Mix primary is a tan plate. The colour-space menu is an 8-layer floater. The 390 dock lozenge bulges. | glass, **O-87 / O-88** (V1C-G2, VC6-G1, P9R-G2) | no |
| value.js | The 8px dark offset stamp under every pane: it is the canon's one stamp (V1C-09), so it is identity. Its dark register is still open. | **owner DESIGN-RULING owed** (VC6-04 / V12-01, P6-B1) | nothing ships without the ruling |
| value.js | The Palettes title's ramp in dark (violet to rose to orange) reads 2.65–2.82:1 on real pixels against its 3:1 floor. It is identity content (P4R-01), but it is measured under its floor. | **consumer, ink model** (P4R-01-R) | yes, by an ink-model unit; see residual 3 |
| value.js | **Cleared against pass-00:** the Definition slab, the slider well's capsule rim, the dev-misconfigured pill and the mono caps section labels are gone. One rule voice runs through About, Blob and Atmosphere. The dock menus now hang below the dock (VC6-01). | (cured) | — |
| fourier | Plated primaries (Compute, Export, Replace image) cast a halo, cream in dark. The transport's pause bubble has a halo, and its "1 ×" floats. The 390 dock is doubled. | glass, **O-87 / O-88** (DS-F2R-G1/G2, DS-F8C-G3, DS-F3C-G2) | no |
| fourier | The indeterminate Progress ("Computing…") is a gleam on a dark rail. The resting panels have a hover specular disc. The Select's fill differs from the field's. A coarse text Button outranks its caption. | glass, **O-87** (F15X-C1 glass half, DS-F8C-G2, DS-F3C-G4, DS-F6C-G1) | no |
| fourier | **Cleared against pass-00:** the Easing selects' warm gradient wash, the bevelled card stamps and the idle loops are gone (chrome loops 3 → 0). /morph reads one card row with harmonic tiles. /v and /equation show one compute-failure line per surface (F11C, F12C). | (cured) | — |
| fourier | (environment, not canon) The final /gallery frames show script-F placeholders where pass-00 showed thumbnails. The cure seat served a private, empty `BLOB_DIR`. The glyph is centred in its frame, so it is not a floating glyph. | — | — |

I found **no consumer-owned lighting violation that the critics missed**. The only consumer-open visual row is P4R-01-R, which is a contrast row and was already stated by its seat.

## Census, before and after

Each app has its own census script, so the numbers compare within an app, not across apps. **No census row moved this round:** keyframes pass 55 = pass 49, value pass 6 = pass 16, and fourier pass 12 = pass 16, in every tally.

### keyframes.js (`scripts/ds-census.mjs --widths 1440,390`, 28 cells; `keyframes/pass-00/census.json` to `keyframes/pass-55/census.json`)

| row | before | after | owner of the remainder |
|---|---:|---:|---|
| static hits (box-shadow, inset, drop-shadow, gradient, loop) | 38 | 16 | consumer focus and selection rings; content gradients |
| chrome: shadow elements / layers | 700 / 1844 | 310 / 938 | glass |
| chrome: max layers on one element | 6 | 6 | glass (`.glass-resting`) |
| chrome: non-floating shadow elements | 510 | 192 | glass |
| chrome: inset highlights | 708 | 416 | glass |
| chrome: backdrop blur | 360 | 278 | glass |
| chrome: control gradients | 164 | 54 | glass |
| chrome: looping animations | 80 | 80 | owner ruling KF-C3-02 (wave, dots) and O-88 (TypingDots) |
| chrome: text-shadow / drop-shadow / filter blur | 0 / 0 / 0 | 0 / 0 / 0 | — |
| **subject (the cube): shadow elements / insets / drop-shadow / gradient fills** | 56 / 96 / 4 / 96 | **0 / 0 / 0 / 0** | — |

The gate is RED, with 6 of 12 checks GREEN. The 6 REDs are glass rows or the owed loop ruling.

### value.js (`value/pass-00/census-before.json`, 36 cells, to `value/pass-06/vc6-2026-10-17/census-after.json`, 1440, 18 cells)

The before and after runs cover different cell counts, so the consumer column is the like-for-like read. Pass 4 measured the consumer at 36 cells too: 116 layers and 0 loops.

| row | before | after | after: consumer part |
|---|---:|---:|---:|
| static: box-shadow declarations / layers | 27 / 40 | 17 / 21 | — |
| static: inset highlights / drop-shadow filters | 2 / 4 | **0 / 0** | — |
| static: looping keyframes / lighting-token definitions / Tailwind shadow utilities | 3 / 4 / 11 | 1 / 2 / 1 | — |
| computed: box-shadow layers | 1860 (consumer 729) | 904 | **116** (single-layer stamps) |
| computed: multi-layer elements | 396 (consumer 190) | 178 | **0** |
| computed: inset highlights | 491 (consumer 93) | 368 | **0** |
| computed: drop-shadows / control gradients | 16 / 36 | 8 / 22 | 0 / 0 |
| computed: looping animations | 65 (all consumer) | **0** | 0 |
| computed: max layers on one element / floater max layers | 6 / — | 6 / 8 | glass |

The gate is RED, and every row over the allowance is glass's (O-87).

### fourier (`scripts/ds-census.mjs`, 7 routes)

**Before** is the canon note's NOW column (`fourier-canon.md`, `2935a81`). The file `pass-00/census-before.json` holds keyframes' census by mistake; that was disclosed at pass 1. **After** is `pass-12/f12c/census-after.json`.

| row | before | after |
|---|---:|---:|
| static: drop-shadow filters / infinite animations / Tailwind shadows | 3 / 2 / 1 | **0 / 0 / 0** |
| static: box-shadow declarations | 8 | 7 (focus and selection rings) |
| computed: box-shadow elements / layers | 426 / 1117 | 386 / 978 (glass) |
| computed: multi-layer stacks / inset highlights | 335 / 333 | 292 / 292 (glass) |
| computed: backdrop blur | 300 | 208 (glass) |
| computed: decorative gradients on controls | 2 | **0** |
| computed: looping animations on chrome | 3 | **0** |

The gate is RED, and every remaining row is glass's.

## Pass counts

### This round (the workflow lanes: findings named, then cured)

| app | passes | named | cured | last critic | per pass (named/cured) |
|---|---:|---:|---:|---|---|
| keyframes.js | 11 | 58 | 35 | C11: 3 named, cure uncommitted | 17/13 · 5/6 · 3/4 · 5/0 · 7/1 · 3/1 · 4/3 · 3/2 · 4/2 · 4/3 · 3/– |
| value.js | 6 | 32 | 24 | VC6: 2 named, 1 cured | 14/10 · 4/4 · 4/4 · 4/2 · 4/3 · 2/1 |
| fourier | 13 | 48 | 15 | **F13C: 0 named** | 16/0 · 6/0 · 6/1 · 2/0 · 3/3 · 2/1 · 2/1 · 4/2 · 2/2 · 2/2 · 1/2 · 2/1 · 0/– |

A finding that is named but not cured is one of three things:
- a glass row, held on O-87 / O-88;
- an owner ruling;
- a refusal on measurement, recorded with its reason in the app's receipt (`keyframes.md`, `value.md`, `fourier.md`).

Fourier's low cure count is mostly glass: passes 1, 2 and 4 named only glass rows. A pass's cured count can be larger than its named count when a cure seat also closes a row carried from an earlier pass.

### All X-DS loops

| app | passes run | evidence |
|---|---:|---|
| keyframes.js | 56 pass directories over eight redeploys (≥ 12 in each of the last two) | `keyframes/pass-01..56` |
| value.js | 16 (first close) + 6 (this round) | `value/pass-01..16` and the dated seats inside them |
| fourier | 16 (first close) + 13 (this round) | `fourier/pass-01..16` and the `f<N>c/` seats inside them |

Every app ran at least the 12 passes the spec requires.

## Gates at close (×2; logs in `evidence/DS/close/r2-2026-10-17/`)

**The close's own ×2 is INCOMPLETE because the host stopped it.** At 08:07, `guarded` refused the heavy slot with *"kernel zone data.kalloc.1024 at 13.2M (panics near 20.8M): reboot the Mac"*. `zone.log` shows 13.16M at 07:46 and 13.38M at 08:06. Under the machine law, every heavy run stopped there, and only `--light` type-checks ran after it. **The owner must reboot the Mac before the heavy gates are re-run.** The scripts are ready: `gates.sh`, `fourier/e2e-run.sh` and `fourier/vite-private.mjs`.

Each row gives both reads for its app: this close's own, and the last cure seat's ×2. The cure seat's ×2 was taken at the same app head, or one commit behind, as noted in the row.

| app (head) | type-check | unit tests | e2e (headless, 1 worker) |
|---|---|---|---|
| value.js `08ef4d5ab` | **Close:** `npm run typecheck` 0 ×2 in the clone worktree, and 0 ×2 in attempt 1. | **Close, attempt 1:** run 2 read 1227/1234, exactly the standing 7: ink D6 ×2 and T-35 ×3, spectrum-luma C-5, reka NG-6. Run 1 read 1225/1234: the same 7, plus `plate-mass` G20 and N-17 at 390, which died on "execution context destroyed" as Vite's cold dependency cache reloaded the page. The clone-worktree rerun was refused (zone). **Seat ×2** (VC6, `b84fda97d`): 1227/1234 ×2, the same 7. | **Close, attempt 1:** the full `smoke` + `smoke-admin` + `smoke-mobile` (331 tests) gave 313 passed, 16 failed, 2 skipped. **14 of the 16 are the standing X-W10 cells.** The other 2 are worktree artefacts from symlinked `node_modules`: B3's file walker read a symlink as a file (EISDIR), and R19 logged KaTeX font 403s from outside Vite's allow list. Run 2 was stopped to re-seat the worktree, and the rerun was refused (zone). **Seat ×2** (VC6): 19 specs, 109 passed / 5 failed ×2, the same standing o18 cells. |
| keyframes.js `8e34f482` | **Close:** `npm run check` 0 ×2, in a clean worktree. | **Seat ×2** (C10x, at this head): `vitest --project demo` 941/941 ×2; `npm run lint` 0 ×2. The close's own run was refused (zone). | keyframes.js has no e2e suite. |
| fourier `2e11542` | **Close:** `vue-tsc -b` 0 ×2. | **Seat ×2** (F12C, at this head): vitest 116/116 ×2. The close's own run was refused (zone). | **Seat ×2** (F12C): 9 specs (the /v Basis and stage-state set plus both visual specs), 77/77 ×2, on a private API (`COMPUTE_CONCURRENCY=1`) behind a private Vite. The close's full-suite run (60 specs) was refused (zone). |

Between the gated heads and today's heads, value.js gained one code commit after VC6: `9b92f36c9`, the X-W8 `.c` graph SCC closure. That commit carries its own G-7 receipt (`cac84202a`), and this close's attempt 1 ran on top of it. The other two apps' heads are the gated ones.

**No visual golden was re-baselined.** The value.js e2e wrote its evidence frames inside the throwaway worktree only.

## Residuals and owners

### Consumer-open (each with a named owner)

1. **keyframes.js r8 pass 11 (KF-C11-01..03).**
   - **Owner:** the X-DS keyframes lane, a re-dispatch of its pass-11 cure seat.
   - **State:** the dead seat's hunks sit uncommitted in the keyframes tree: `demo/components/instrument/pane/ControlsPaneWrapper.vue` (focus-in opens the sheet and a parked port rests at its top) and `demo/scenes/spring/SpringHeatmap.vue`. Its probe and AFTER frames are in `evidence/DS/keyframes/pass-56/`, untracked; only `test-demo-1.log` exists.
   - **What it owes:** the next seat adopts or discards those hunks by id and commits its own receipt. Then a fresh critic pass is owed for the stopping rule.
   - This close did **not** touch them, and it gated keyframes at `8e34f482` in a clean worktree. The `KeyframeTimeline.vue` hunk in the same tree belongs to another seat.
2. **value.js stopping rule: one clean critic pass.** Owner: **the X-DS value lane** (pass 7). The round ended after VC6-01's cure.
3. **value.js P4R-01-R** (the dark Palettes title at 2.65–2.82:1 against a 3:1 floor).
   - **Owner:** the ink-model unit **O-62 (a) INK-VEIL-MIDBAND**.
   - **Cause:** the root is D6's mean-ambient referent. The fix is to certify display ink against the local field under its site, or the owner rules the margin.
4. **value.js standing test reds.**
   - `test/ink.test.ts` ×5 (D6 ×2, T-35 ×3) belongs to **O-62 (a)**.
   - spectrum-luma C-5 and reka NG-6 belong to **X-W8 `.i`**.
   - The e2e cells (o18 ×5, o19 ×4, o26, o28, webgl-blob-idle ×2, o23:225) are homed by id to **X-W10** (`waves/W10-ADDENDUM-2026-10-16-cprime.md` §1).
5. **Owner DESIGN-RULINGs (§0dm).** These are banked, and no seat cured them:
   - keyframes.js: the home loops (KF-C3-02), the hero seat (OD-4), the dashed and solid selection idioms, and the T.D4 sans labels;
   - value.js: P5C-02 (P5-B1), VC6-04 / V12-01 (P6-B1, the dark stamp register), VC5-01 and VC4-09 (A5), V2C-15 / V16-07 (the header veil), and VC6-T1 / VC6-T2 (held by A5 and V7C-04);
   - fourier: ESC-DS-F10X-C2, the tone arm of DS-F12X-C1, DS-F3R-C4 and DS-F6X-T2;
   - keyframes.js KF-C10x-01 (the 1440x1080 port trade): refused on measurement and held for the owner or the next critic.
6. **The close's heavy ×2.**
   - **Owner act first:** the owner reboots the Mac (kernel zone at 13.2M).
   - **Then:** the X-DS close seat re-runs `evidence/DS/close/r2-2026-10-17/gates.sh`. That covers value.js vitest and full e2e ×2, keyframes lint and test ×2, and fourier vitest and full e2e ×2.
7. **fourier DS-F4-C1 / F5-C2** (the /paper description terms).
   - The cure is already in latex-paper: `5be04ae` and `0be0e33`.
   - It waits on an owner act, **publishing latex-paper 0.3.0** (npm E401). fourier then bumps `^0.2.1`.

### Glass (held under O-87, never overridden locally)

All of these are **re-judged at the glass 10.2.0 repin**. The addenda are in `relay/X-ALL-BK-FLAT-LIGHTING.md`.

- **O-87 FLAT-LIGHTING**
  - **keyframes.js:**
    - KF-C10x-G1, the re-witness at glass 10.1.0 of: the cartoon stamp under open menus and their bloom; the Input and Select fill split; closed carets rotated 180deg; the capsule halo in dark; the play-bubble plate; the resting-plate blur bands; the EasingPicker ghost staircase and its "Custom" label; the dark stage-plate halo;
    - the earlier ids it folds: KF-C1-01/02/09/10/11, KF-C5p-01/02/03, KF-R6C4-04 and KF-C16-G1 (a–f).
  - **value.js:**
    - VC6-G1: the 6-layer menu stack, the disabled primary's under-shadow, the bead's specular, and the scrubber thumb VP5-03;
    - the standing rows V1C-G1/G2/G4, P4R-02/03, V7R-01/02, V8C-03/04, P9R-G1/G3, V12-G1 to V16-G1, and the pass-16 addenda.
  - **fourier:**
    - DS-F-G1..G6, DS-F2R-G1, DS-F3C-G1/G3/G4, DS-F4X-G1/G2, DS-F5C-G1/G2, DS-F6C-G1, DS-F8C-G1/G2/G3;
    - the glass half of F15X-C1.
- **O-88 DOCK-COLLAPSE-MOTION**
  - keyframes.js: KF-C10x-G2 (the collapsed tile and its halo; TypingDots also sits under KF-C3-02);
  - value.js: VC6-G1's dock half (the 390 plate bulge and the collapsed seal), V1C-G3, P9R-G2, P5C-01 and V7R-04;
  - fourier: DS-F2R-G2, DS-F3C-G2 and the F5X-G1 family.

Nothing was written to the glass inbox by this seat.

## Host

- Every run was serial and went through `guarded`: `--light` for the type-checks, and the full guard with `--rss-gb` and `--timeout` for vitest and e2e.
- value.js and keyframes.js were gated in detached worktrees at their heads, so other seats' dirty hunks were excluded. Both worktrees are now removed.
- The value.js e2e used its own Playwright server on :9293. Attempt 1's symlinked `node_modules` was replaced with APFS clones for the rerun.
- **The kernel zone watchdog stopped the heavy gates at 13.2M** (see Gates). The owner must reboot the Mac before anyone re-runs them.
- The frame review used ImageMagick montages of committed frames only, kept in the session scratchpad. No browser was launched for the review.
- Nothing of this seat's is left running.
- **Not touched:** the keyframes tree's uncommitted hunks (residual 1 and another seat's `KeyframeTimeline.vue`), value.js `scripts/dev/dev.sh`, and every other seat's dirty file.
