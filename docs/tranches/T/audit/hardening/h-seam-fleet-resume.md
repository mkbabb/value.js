# h-seam-fleet-resume — HARDENING SEAM AUDIT of the 18 resumed fleet lanes

**Lane**: `h-seam-fleet-resume` (T HARDENING; ZERO product-code / corpus edits — I REPORT, the
amend pass folds). **Substrate**: `tranche-t` @ `12cb302` (docs-only above `2db417e`; `git diff
tranche-s-close..HEAD -- src/ demo/ api/` empty — every `file:line` below reads the S-close tree).
**Charge**: the 18 fleet lanes re-run after a session-limit wall — for EACH: (1) structural
integrity (complete sections, conclusions present, no mid-sentence truncation, no committed
tool-artefacts), (2) internal + cross-lane consistency, (3) 2-3 spot-verified claims against the
tree. **Adversarial posture**: a clean bill requires evidence; I hunted for what broke, dropped,
went stale, or was papered over across the SIX walls this session hit.

**Headline**: the 18 lanes are, at the *claim* level, remarkably accurate — I spot-verified 40+
concrete `file:line` claims and **every substantive source claim checked out exactly**. There is
NO fabricated evidence and NO mid-sentence truncation. The real seam damage is narrower and
concentrated: **two files carry committed tool-call XML corruption** (the smoking-gun partial-
completion seam), and **one number — the `proof:*` script count — is cited THREE different ways
(11 / 12 / 13) across five lanes, with two lanes self-contradictory in their own body.** These
are exactly the "papered over across interruptions" defects the owner flagged.

---

## §1 — Integrity + spot-check table (all 18 lanes)

Verdict key: **CLEAN** = complete, conclusions present, no truncation/corruption · **CORRUPT** =
committed tool-artefact · spot-checks = concrete claims re-run against the tree this pass.

| # | Lane | Integrity | Spot-checks (all ✓ unless noted) |
|---|---|---|---|
| 1 | t-plan-audit-1 | CLEAN | banner `App.vue:115` ✓ · `color.ts` 718 / `dispatch.ts` 518 ✓ · logerp `math.ts:78` ✓ · ICtCp `spaces.ts:416` / Jzazbz `:445` ✓ |
| 2 | t-plan-audit-2 | CLEAN (honest 2-pass recovery; §2.1/§3.1/§8 all present) | F20 `PaletteCard.vue:49` text-subheading ✓ · F22 `style.css:119` alias + dist clobber grep=1 ✓ · F13 `panes/keys.ts:46-47` analogous/0.7 ✓ · §8.3 self-corr `ColorSpaceSelector:35` ✓ |
| 3 | t-deferred-census | **CORRUPT** (F1 below) | proof 12 npm / 11 mjs / 0 CI ✓ · CLAUDE.md "5 projects" `:28,:89` ✓ · BG pins ✓ |
| 4 | t-prompts-recap | CLEAN (tag-label NOTE F8) | `DEFAULT_INPUT_COLOR` `index.ts:36` ✓ · `HeroBlob.vue:47` GooBlob import ✓ · `PaletteDialogHeader:99` excise ✓ |
| 5 | t-precepts-recap | **CORRUPT** (F2 below) | CLAUDE.md `:111`/`:113` caps ✓ · MANDATE §0 `:58-61` / E-1 `:140-144` / E-3 `:147-149` ✓ |
| 6 | t-contradictions | CLEAN | `DockViewSelect` entryAccent ✓ · blob-fp corner-break `ColorPicker.vue` ✓ · `variant="specimen"` = 0 consumers ✓ |
| 7 | t-coloc-backend | CLEAN (F3 count bug) | models.ts 265 LoC / 34 importers ✓ · api/test 37 ✓ · 11 proof-*.mjs ✓ · generate-favicon dead ✓ |
| 8 | t-coloc-components | CLEAN (F9 within-lane tension) | custom/ 146 files / 20,501 LoC ✓ EXACT · F8 orphans = 0 importers ✓ · `useAdminUsers:14` ✓ |
| 9 | t-coloc-composables-lib | CLEAN (F6 count bug) | auth 4 / color 6 / palette 13 ✓ · **root 7 (lane says 6)** ✗ |
| 10 | t-coloc-src | CLEAN (test-count NOTE F10) | exports = 8 keys ✓ · smoking-gun `useGamutOverlay:43`/`SearchFilterBar:146` ✓ · `transform/CLAUDE.md:9` inline-LoC ✓ · **test files 68 (lane says 70)** |
| 11 | t-legacy-sweep | CLEAN (F4 self-contra proof count) | type-trio `constants.ts:340-344` dead ✓ · `globals` unused ✓ · `savedPalettes` void `:56` ✓ |
| 12 | t-card-color-census | CLEAN (F7 summary miscount) | `ColorPicker:6` tier=resting ✓ · `ExtractWorkbench:32` bg-black ✓ · `PaneHeader:71` 60%/blur12 ✓ |
| 13 | t-api-state | CLEAN | **`.atomDiff` grep = write-only** ✓ · `client.ts` DEFAULT_REMOTE ✓ · `index.ts:189` cast ✓ · 26-vs-27 index doc-nit ✓ |
| 14 | t-oracle-gaps | CLEAN | `gradient.spec.ts:57` flake ✓ · vitest 68 files ✓ · negative-greps reproducible |
| 15 | t-mobile-audit | CLEAN | `App.vue:232-233` isDesktop aspect law ✓ · `Dock.vue:213` lg:hidden toggle ✓ · `viewSchema:152-153` gradient map ✓ · `useViewManager:64` switchView ✓ |
| 16 | t-perf-implications | CLEAN | `blob-presence-mobile:85-86` 180/240 bounds ✓ · RP-2 347.7≈347.9 ✓ · LCP/TBT figures cross-cite `t-ci-lighthouse-record` |
| 17 | t-a11y-contrast | CLEAN (sibling-hash NOTE F12) | `useContrastSafeColor:17-18` 0.15/0.97 ✓ · `ProfileSection:50,60` ✓ · `resolveSealInk:184` ✓ · PRM defect still live at kf HEAD ✓ |
| 18 | t-docs-truth | CLEAN (F5 self-contra proof count) | DESIGN.md:259 30/44 vs style.css:316-317 25/32 ✓ · subpaths 7 ✓ · assets/docs 11 ✓ |

**16/18 structurally clean; 2/18 carry committed tool-call corruption. All spot-checked source
claims verified.** The single "wrong-tree" claim I found (composables root count) is F6.

---

## §2 — MUSTFIX

### F1 — MUSTFIX · `t-deferred-census.md` has leaked tool-call XML committed into the file body
- **Evidence**: `docs/tranches/T/audit/lanes/t-deferred-census.md` lines **257-258** are the
  literal closing tags `</content>` and `</invoke>` — the tail of the Write tool call that
  authored the file, committed into the corpus body. `grep -nE '</?(content|invoke)'` isolates
  exactly these two lines.
- **Why it's a seam**: this is the signature of a partial-completion / resumed-write that was
  committed without stripping the tool wrapper — precisely the class the owner's "six walls"
  concern targets. The prose conclusion (§6 "Coverage ledger… Discharged-in-S retired") IS intact
  and complete on line 256; only the two trailing tags leaked.
- **Location**: `t-deferred-census.md:257-258`.
- **Proposed amendment**: delete lines 257-258. No content is lost; the file ends correctly at 256.

### F2 — MUSTFIX · `t-precepts-recap.md` has the identical leaked tool-call XML
- **Evidence**: `docs/tranches/T/audit/lanes/t-precepts-recap.md` lines **468-469** = `</content>`
  and `</invoke>`. Same corruption class as F1 (these are the ONLY two files in the 18 that hit
  the grep). Prose ends correctly at line 467 (§G sources list); tags are pure trailing garbage.
- **Location**: `t-precepts-recap.md:468-469`.
- **Proposed amendment**: delete lines 468-469.

---

## §3 — SHOULDFIX (the `proof:*` count is the load-bearing cross-lane defect)

**Ground truth (re-run this pass)**: `package.json` holds **exactly 12** `proof:*` npm scripts
(`grep -cE '"proof:[^"]+"' package.json` = 12, lines 86-97), backed by **11** `scripts/proof-*.mjs`
files (the 12th, `proof:grammar-2026`, runs vitest, not an `.mjs`), invoked by **0** CI/dev/deploy
sites. Two lanes state this correctly (deferred-census §4.1 "12"; plan-audit-1 F1 "12"). Three do
not, and two of those contradict themselves in their own body — the fold MUST reconcile to
**"12 npm scripts / 11 `.mjs` files"** everywhere.

### F3 — SHOULDFIX · `t-coloc-backend.md` F7 says "13 `proof:*` scripts" (actual 12) + "19" scripts/ files (actual 18)
- **Evidence**: F7 (line ~179) — *"still wired as **13** `proof:*` scripts in the root
  package.json"*; actual = 12. Same F7 opens *"`scripts/` (**19** files)"*; `ls scripts/ | wc -l`
  = 18. (F7's "11 proof-*.mjs" IS correct.)
- **Location**: `t-coloc-backend.md` §F7 (the "13" and "19").
- **Proposed amendment**: `13`→`12`; `19`→`18`.

### F4 — SHOULDFIX · `t-legacy-sweep.md` F5 is self-contradictory: "13" in title/headline/summary, "12" in its own body
- **Evidence**: F5 headline (`:124`), §0 headline (`:26-28`), and the summary table (F5 row) all
  say *"**13** `proof:*` npm scripts"*; but the F5 body (`:135`) says *"(**12** scripts backing 11
  files under `scripts/` + one vitest-driven entry)"* and enumerates exactly 12 names. The body is
  right; the headline/summary "13" is wrong AND internally contradicts the body.
- **Location**: `t-legacy-sweep.md` §0 headline, F5 title (`:124`), summary-table F5 row.
- **Proposed amendment**: `13`→`12` at all three headline/summary sites (body already correct).

### F5 — SHOULDFIX · `t-docs-truth.md` F4 says "11 `proof:*` scripts" but enumerates 12
- **Evidence**: §0 finding #4 (`:36-38`) and F4 (`:148`) + F4 root-cause (`:157`) + summary table
  all say *"**11** live `proof:*` scripts"*; F4's own enumeration (`:148-151`) then lists **12**
  names (css-parity … progress-honesty). Third distinct wrong count in the fleet (11), and
  self-contradictory with its own list.
- **Location**: `t-docs-truth.md` §0 #4, F4 (`:148`), F4 root-cause, summary table.
- **Proposed amendment**: `11`→`12` at all four sites (the 12-name enumeration is the correct one).

### F6 — SHOULDFIX · `t-coloc-composables-lib.md` §1 inventory undercounts the root composables (says "root 6 / 29 total"; tree = 7 / 30)
- **Evidence**: §1 table + §0 header state *"`demo/@/composables/` | 29 (auth 4, color 6, palette
  13, **root 6**)"*. `ls demo/@/composables/*.ts` = **7** (prng, useDevicePixelSnap, useFilteredList,
  usePaneRouter, useSafeStorage, useViewManager, viewSchema) → total **30**, not 29. The lane's OWN
  §2 table enumerates all 7 root rows, and `t-docs-truth.md` F11 independently confirms *"7 root
  files exist; 6 are documented"* — so the §1 header contradicts both the tree and its own §2 body.
- **Location**: `t-coloc-composables-lib.md` §0 CL-6 framing + §1 inventory table (the "29" / "root 6").
- **Proposed amendment**: `29`→`30`, `root 6`→`root 7`.

### F7 — SHOULDFIX · `t-card-color-census.md` §4 summary counts do not match their own enumerated site lists
- **Evidence**: §4's CHROME row is labeled **"8"** but enumerates **9** sites
  (`B5,F1,F3,F4,F8,F10,F11,F12,F13`); the WELL row labeled **"15"** enumerates ~18 tokens. For a
  lane whose whole value is being the *mechanical* census, the roll-up must equal the rows it rolls
  up. (The individual §1 rows are correct — this is a §4 arithmetic seam only.)
- **Location**: `t-card-color-census.md` §4 summary table (CHROME "8", WELL "15").
- **Proposed amendment**: recount each rung against its enumerated list (CHROME → 9) or restate the
  intended de-dup rule that makes the labels correct.

---

## §4 — NOTES (recorded; not counted; the amend pass may fold or leave)

- **F8 · prompts-recap mislabels the substrate tag.** `t-prompts-recap.md` header + §5 call the
  substrate *"`cc4f4fa` (= the S close, tag `tranche-s-close`)"*. `git rev-parse tranche-s-close` =
  `5bb2d59`, NOT `cc4f4fa` (cc4f4fa is a docs-HEAD). deferred-census + plan-audit-2 correctly
  disambiguate ("`tranche-s-close` = `5bb2d59` ≠ the mandate's cited `cc4f4fa`, both diff-empty").
  Source-diff is empty so the substance is fine; the *label* equating cc4f4fa with the tag is wrong.
- **F9 · coloc-components within-lane tension on `SortFilterMenu`.** F4 lists `SortFilterMenu` inside
  a live *"search/filter cluster (4)"*, while F8 + §3.2 correctly classify it a **zero-importer
  DROP** (verified: only doc-table references, no code importer). F4's cluster-of-4 double-counts a
  file the same document elsewhere deletes. (F8's DROP verdict itself is SOUND — vindicated.)
- **F10 · coloc-src "70 test files" reads 68.** §5 asserts *"All **70** test files sit directly in
  `test/`"*; `ls test/*.test.ts` = 68 (69 total dir entries). Off-by-~2 count; the "flat, not
  mirrored" finding stands.
- **F11 · fleet-wide substrate-hash divergence (cosmetic, expected).** The 18 lanes stamp FIVE
  distinct HEADs — `cc4f4fa`, `e12fd09`, `1e31b5e`, `332f521`, `30cc2bd` — because the docs-HEAD
  advanced as the corpus accreted. ALL assert `src/demo/api` diff-empty vs `tranche-s-close`
  (`5bb2d59`), so every lane read the IDENTICAL source. Not a defect; a one-line synthesis note
  ("all lane substrates are docs-only-divergent from `5bb2d59`") would spare a reader the confusion.
- **F12 · READ-ONLY sibling hashes are stale (findings still hold).** `../glass-ui` HEAD is now
  `6605e1dd` (deferred-census/prompts-recap cite `c3ea22a8`); `../keyframes.js` is now `cf9b268`
  (a11y cites `5addc4a`). Both advanced since the run. I re-verified the load-bearing sibling claims
  at CURRENT HEAD: glass-ui still exports only `./goo-blob` (no `Blob`, `package.json:545`); the a11y
  PRM defect is still live (`managed-play.ts` PRM arm `spring.snap()` with no `onFrame` at current
  HEAD). Expected READ-ONLY drift — the cited hashes are stale snapshots, not errors.

---

## §5 — Verdict

The resumed fleet survived its six walls with its *evidentiary substance intact* — no fabrication,
no truncation, and (plan-audit-2 especially) a **model honest two-pass recovery** that names its
own death, verifies its cites, and closes a zero-drop coverage ledger. The seam damage is: (a) two
files with committed tool-call XML (**F1/F2, MUSTFIX** — trivial 2-line strips), and (b) a cluster
of count/label inconsistencies of which the **`proof:*` script count (11/12/13 across five lanes,
two self-contradictory) is the load-bearing one** — a single number the fold must reconcile to
"12 npm / 11 mjs" before it propagates into the T charter as three different facts.
**mustFix = 2 · shouldFix = 5.**
