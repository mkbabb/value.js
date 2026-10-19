SERVED MODEL: claude-opus-5-5

# X-W10 — Close report (Track A, VERIFY-ONLY close seat, 2026-10-18)

The spec is `docs/tranches/X/waves/W10.md` (§8: "the nine gates with RED-before / GREEN-after outputs
pasted"). The execution record is `docs/tranches/X/execution/A/X-W10.md`, whose `## Close — attempt 3`
section carries the same table plus the commit roster, residuals and escalations. This seat cured
nothing. Every AFTER reading below was taken in this seat at HEAD `589285bd1` and run twice.

## Gates — BEFORE (spec 2026-08-03 · attempt-3 baseline) → AFTER (this seat, ×2)

| gate | BEFORE | AFTER (close seat, ×2 unless stated) | verdict |
|---|---|---|---|
| **G-1** THREE-LAWS-STATED | `grep -ic` × 4 authorities: 0 in all 12 cells | `demo/DESIGN.md`: golden glass 4 · breath of life 6 · momentum 4; one heading each (`:68` `### 1.1 BREATH OF LIFE — law §1` · `:113` `### 1.2 MOVEMENT OF MOMENTUM` · `:163` `### 1.3 GOLDEN GLASS — MARK (OP-3)…not enacted`); "MARK" ×4 inside §1.3 | **GREEN** |
| **G-2** ONE-DESIGN-DOC | 0 cross-cites in 12 cells; registry cites 0 | registry: `CARRY-CUT-LEDGER.md` cites `demo/DESIGN.md` (also `DEFECT-LEDGER.md`); demo source comments 8 (`PaneHeader.vue:219,223` · `header.css:37` · `animations.css:64,208` · `foundation.css:329` · `ColorComponentDisplay.vue:135` · `button-voice.test.ts:4`); satellites tombstoned (G-9) | **GREEN** |
| **G-3** CANON-ANCHORS-LIVE | `demo/@` 5 · `style.css` 15 · `[ -d demo/@ ]` NO | `demo/@` **0** · `style.css` **0** · line-number anchors **0**; 63 distinct backticked path anchors, 62 resolve; the 63rd (`demo/ui/*`, `:1086`) is prose recording the shims' retirement at X.W12U.k, not an anchor | **GREEN** |
| **G-4** PRM-NO-PREFERENCE | spec: reduce == no-pref, transform scrubs (0.311 WebKit / 0.618 Chromium); attempt 3: GBC-1 (transform retired at `94ec8d527`) | `prm-scroll-timeline.mjs` unmodified, `guarded --exclusive webkit`: `webkit rm=reduce none -> none` · `webkit rm=no-preference none -> none` · `chromium rm=reduce none -> none` · `chromium rm=no-preference none -> none` (`close/g4-close-run1.txt`; the four lines `diff`-identical to `.d`'s `g4-after-run{1,2}.txt`). Static: `prefers-reduced-motion: reduce` in animations.css · header.css → `0 · 0`; `vj-*` families 3 | **GREEN** (see run-2 note) |
| **G-5** CONDENSE-SPACING-REGISTER | 1440: block 112.56→87.75, gap Δ 0 (RED); 390: no condensed state | `g5-measure.mjs` (`.d`'s instrument, unmodified) at the owner's :9000 dev server. Run 2 (`close/g5-close-run2.log`, `guarded --timeout 15`): `1440x900 /admin/users cond=true top=200 | block 112.56->53.05 | padTop 16->9.888 | gap 25.888->16 | desc inflow true->false` (both strictly smaller; 9.888/16 = 0.618 and 16/25.888 = 0.618, the canon's 1/φ, Law P-2) · `390x844 /admin/users cond=false range=0 doc=200 | block 100.25->100.25` · `390x844 / picker cond=false | block 119.09->119.09`; the text is `diff`-identical to `.d`'s `g5-after-run2.txt`. Run 1 (`guarded --timeout 8`, load ~30) was killed at the timeout (exit 124) after writing its four `/admin/users` frames and before printing; all four frames are sha256-identical to `.d`'s `g5-after-run1/` (1440 condensed `d55ef725…` · 1440 rest `aef110f4…` · 390 condensed `6475d865…` · 390 rest `5068f1ca…`) | **GREEN at 1440×900 · RED at 390×844 (ESC-W10d-1)** |
| **G-6** SHADOW-GEOMETRY + ELEVATION | `grep -ic elevation` 0·0·0·0; three zero-blur layers, OM-2 BL 483/960 | canon: `grep -ic elevation` DESIGN.md **7** (Laws M-1..M-3) · VC 1 (the tombstone's map line) · PA 0 · PC 0; consumers of `cartoon-cast|cartoon-surface` in demo: 0 live (PaletteInspector `:38` comment, `palette-card-layout.test.ts:66,78` assert absence). Pixel limb: `g6-corner-witness.mjs` ×2 (`close/g6-close{1,2}`). Run 2 printed, at 1440×900 and 390×844, rest and hover: `radius=16px cardShadow=none casters=0 cartoonCast=0 cartoonSurface=0 overflow=visible bg=oklab(0.216128 0.00350075 0.00518669 / 0.08)`, so the WELL is unchanged. Run 1 hit its 12-minute guard at load ~30 (exit 124) after writing its frames. All 8 close frames (both runs, 4 cells each) are `cmp`-identical to `.e`'s `g6-run2/`, whose corner diff read 0/960 cast pixels in every ring | **GREEN** (discharged by deletion `d104cd5fc`; nested-spread cure unapplied, no surface) |
| **G-7** PRODUCER-CONTRACT-CITATION | bare OBC 7 · VC 2 · demo 0; cites 0 | bare **0 · 0 · 0**; `§L6` cites OBC 7 · VC 3 | **GREEN** |
| **G-8** DR-13 BUNDLE TERMINAL | SelectTrigger 13/12 `h-9`; Ad-18 2; mono 0; `.underline-tabs` live | SelectTrigger 11 · h-9 0 · Ad-18 0 · mono 0 · underline-tabs 0 · clampLabel 0; 5-row survivor table, 5 terminal verbs (receipt `.f`) | **GREEN** |
| **G-9** SATELLITE FOLD | 0 tombstones | tombstones VC 1 · CP 1 · TI 1; canon names PA as evidence 1 · PC as data contract 1; "standing inventory" cites in demo 0 | **GREEN** |

Static battery (G-7/G-8/G-9) ran ×2 → `cmp` IDENTICAL:
```
G-7 bare OBC=0 VC=0 demo=0 ; cites OBC=7 VC=3
G-8 SelectTrigger=11 h9=0 Ad18=0 mono=0 underline=0 clampLabel=0
G-9 tombstones VC=1 CP=1 TI=1 ; canon names PA-evidence=1 PC-data=1 ; inventory-cited-as-standing=0
```
§7 cadence at close: `guarded --light -- npm run typecheck` → exit 0 (lib · demo · test · e2e);
`guarded --light -- npm run lint` (`eslint . --max-warnings=0`) → exit 0.

§7 vitest: `guarded -- npx vitest run --maxWorkers=2` → **5 failed · 1237 passed (96 files, 1 failing)**. All five failures are in `test/ink.test.ts` (D6 `resolveMutedInk` light/dark · T-35 cream-collapse ×3). They are outside this wave: the import graph is `demo/color-session/ink.ts` plus `@mkbabb/value.js/{color,css}`, and ⟨`git log 6eb8f0268..HEAD -- demo/color-session/ink.ts test/ink.test.ts`⟩ → no W10 commit. No W10 commit touches `src/`, `test/` or `demo/color-session/`. This is residual **R-close-1**, owned by the orchestrator, on the standing INK lineage (X-W12U honest-RED "npm-test standing", O-62 (a)).

## Commit roster (act 1 — each `git show --stat` read; every path inside its unit's writable set)

| unit | commits | paths touched (read from `git show --name-only`) | in bounds |
|---|---|---|---|
| open (seat 0) | `8ecc9c457` | record · LEDGER · INBOX sweep line | yes |
| `.a` | `d7f568252` · `7ff6a7c66` | `docs/tranches/X/design/draft-fable.md` (create) · record | yes |
| `.b` | `4636f8101` · `ac3059090` | `docs/tranches/X/design/draft-opus.md` (create) · record | yes |
| `.c` | `1f4fdf996` · `3bb272f05` · `b14c70a15` | `waves/W10-ADDENDUM-2026-10-17-open.md` · `demo/DESIGN.md` · `design/APOTHEOSIS.md` · `W10/frames/` (html, mjs, 4 PNGs) · `CARRY-CUT-LEDGER.md` (adjacent, G-2 registry limb) · record | yes |
| `.d` | `b5727dcb7` · `8baacf7e7` · `fb6846dee` | `demo/shared/ui/PaneHeader.vue` · `demo/styles/animations.css` · `demo/picker/header.css` · `evidence/W10/` only (26 files) · record | yes |
| `.e` | `91ae758e9` · `14c807338` | `evidence/W10/g6-*` only (16 files; 0 outside) · record | yes |
| `.f` | `8f04b4d5d` · `ad68bdedd` | VC · OBC · `frontend-design/color-picker.md` · `transition-inventory.md` · `foundation.css` · `DockViewSelect.vue` + adjacent `Dock.vue` · `demo/DESIGN.md` · `animations.css` (§0bt, each listed in its receipt) · record | yes (see LW-1) |
| `.g1` | `db364be64` · `17f79ca0c` · `7a2895bf6` | `ColorComponentDisplay.vue` · `e2e/smoke/oracles/readout-seam.spec.ts` (+8 comment lines) · record | yes |
| `.h` | `ca36fed0b` · `589285bd1` | `evidence/W10/homed/` only (31 files; 0 outside) · record | yes |

**LW-1 (note, not a defect):** `.f`'s two adjacent edits land on `demo/DESIGN.md` (`.c`'s path) and
`demo/styles/animations.css` (`.d`'s path). §0bt forbids paths "another unit in the same group owns";
`.c` and `.d` were earlier, already-committed groups at concurrency 1, so no concurrent ownership was
crossed. Recorded; nothing landed wrong.

## Escalations (carried, not decided here)

- **ESC-W10d-1** (G-5 at 390×844). At phone width no header condenses, before or after: glass
  `<CardHeader shrink>` reads only its `.card-scroll-host`'s `scrollTop`, and every host is unbounded
  in one track (the document scrolls). This is a scope reveal under §3a (a hard-gate failure that a
  local edit cannot recover). Owner: the orchestrator. The decision is whether a phone condense
  exists at all (a canon ruling against PaneShell's one-track law) or whether G-5's 390 limb is
  re-scoped.
- **ESC-W10-g1-1** (W6 g1, homed here by §0aq). The one surviving interval, 24px
  `figure.spectrum-figure → div.glass-quiet.card` with no scale derivation, is declared at
  `demo/picker/seat.css:84` by X-DS (`082e1abbd`, V1C-09). That is outside `.g1`'s set. Owner: X-DS
  value pass, or the orchestrator.
- **ESC-W10-h-1** (rows E1–E19, `evidence/W10/homed/DISPOSITION.md` §8). These are the 14 RED (c′)
  cells, ATMOS-DRAG's falsifier at the built origin, the G11 and X-W8 visual goldens (220 failing,
  9 passing ×2), the 12 WebKit-only cells, XP-19 (7 sites) and R-6's nginx and certbot. Owners are
  named per row: the demo cure seats, the X-W1 harness, glass by mail (E8, E17) and X-W11 (E18).

## Residuals (named owners)

| id | residual | owner |
|---|---|---|
| RS-2 | JS `scrollIntoView({behavior:"smooth"})` ignores PRM (`PaletteInspector.vue`, `ComponentSliders.vue`) | orchestrator → a demo cure seat |
| RS-3 | literal `hover:scale-110` (`ColorInput.vue`, `MixSourceSelector.vue`) against the ≤1.03 hover bracket | orchestrator → a demo cure seat |
| RS-4 | raw gold used as chrome ink (`DockViewSelect.vue`, `Dock.vue`, `ProfileSection.vue`) | orchestrator → a demo cure seat |
| RS-5 | the app-level seed chroma ceiling and the sRGB hex clamp (OM-6) | orchestrator |
| RS-6 / R-d2 | the reduce overlay opacity fade, now observable (`0s` under reduce) | glass, by mail |
| R-d1 | `vj-*` transitions and other transform transitions sit outside `no-preference`; glass's layered guard zeroes them, not the code's structure (canon R-1) | orchestrator |
| R-d3 | the scroll-anchoring flip loop: `overflow-anchor: none` belongs on `.card-scroll-host` | glass, by mail (producer note) |
| R-e1 | the plate's glass under-shadow falls left (−1.5px) against the stamp's down-right (canon M-3) | glass, by mail |
| R-f2 | 7 touched files already failed Prettier at HEAD | a later formatting pass |
| R-f3 | `OPTICAL-BENCH-COMPOSITIONS.md` stays the live composition record | next formation |
| R-f4 | `GradientStopRail.vue:111,482` keep history cites of the tombstoned VC §5.2 | orchestrator |
| R-f5 | VC §6.2 seed latch has no canon home | orchestrator |
| R-g1-1 | `demo/DESIGN.md` §6.2 `:1016` still says the readout "locked at 2 lines"; the bytes lock 1 | `.c` successor or the next canon edit |
| R-h1..h3 | the `w12-drag` real-GPU reading at the built origin · O-26 on a real GPU · C10-1 not measured | ESC-W10-h-1 owners |
| R-e2 / R-f1 | the §4b worktrees `value-js-x-w10-{d,e,f}` were never created; the units ran at concurrency 1 in the main tree | recorded, harmless |
| R-close-1 | `test/ink.test.ts` 5 failing (D6 resolveMutedInk ×2, T-35 ×3); no W10 commit in its import graph | orchestrator (standing INK lineage, O-62 (a)) |
| CC-112 | φ token publication | glass bank, BLOCKED-ON glass TR#78 (spec §2c, §10) |

## E13

Swept at close: value V/ + V/coordination · glass BL (newest) + BK/coordination · keyframes
V/coordination · atlas P/coordination. The atlas path now lives at `sci-report/atlas/docs/tranches/P/coordination`,
because the standalone `atlas/` checkout has no `docs/`. Files newer than INBOX.md (mtime 2026-10-17 20:18):
- VC and OBC: `.f`'s own edits, not mail.
- glass `BL/FORMATION-PROGRESS.md`: glass's own log.
- glass `BK/coordination/ATLAS-TO-GLASS-2026-10-17-U-BATCH.md` and `…-10-18-U-BATCH-ADDENDUM-1.md`: atlas → glass.
- keyframes `ATLAS-INBOUND-2026-10-18-spring-settle-float.md`: atlas → keyframes.

`grep -ci "value.js\|value-js"` → 0 in each of the three letters. **0 unrowed · 0 UNREAD in scope.**

## Four-verb state

Gates-green at this wave's close stamps **IMPLEMENTED** (spec §9 and §12). VERIFIED is X-W11's to
stamp. This close reads **PARTIAL**, because G-5's 390×844 limb is RED on ESC-W10d-1. The other eight
gates and the 1440 limb of G-5 are GREEN. Every unit's commits have landed. ACCEPTED waits on L-18's
two quartet passes.

G-4 run 2: G-4 run 2 never ran. It waited 2 h 48 min in the machine-wide `--exclusive webkit` queue, behind sibling repos' runs (glass BL pass-7, sci-report h4), and this seat stopped its own waiter (PID 14890) before close. `close/g4-close-run2.txt` holds only the wait line. G-4's second reading of record is therefore `.d`'s banked `g4-after-run2.txt`, which run 1 matches byte-for-byte.
