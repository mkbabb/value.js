SERVED MODEL: claude-opus-5-5[1m]

# X.F.W10S — the Track C supplement wave (execution record)

Spec: `docs/tranches/X/fourier/waves/F-W10.md` §ADDENDUM 2026-09-21 (`:519-576`) — the unit spec —
read with the file WHOLE; ruling of record COHESION **§0aj** (`:2368-2416`, minted the wave) and
§0ak (X-W11 only; nothing binds this wave). Sitting of record 2026-09-17 (the owner's begin-word,
COHESION §0j); this seat's clock 2026-09-22. Seat 0 = OPEN, VERIFY-AND-BANK: zero product bytes,
zero fourier-analysis bytes, zero glass-ui bytes written.

## Open

**Date**: 2026-09-22 (seat clock) · sitting of record 2026-09-17.

**Crash-recovery (seat law)**: ⟨cmd⟩ `git status --porcelain` (value.js) → 17 dirty paths, **none**
inside this seat's writable set (`execution/C/F-W10S.md` absent · `LEDGER.md` clean · `INBOX.md`
clean); the dirty `demo/**` · `e2e/smoke/**` · `CARRY-LEDGER.md` · `execution/A/X-W5.md` ·
`execution/B/KF-W13S.md` rows are sibling seats' (untouched) and `scripts/dev/dev.sh` is the
unowned standing row (never touched). ⟨cmd⟩ `git -C ../fourier-analysis status --porcelain` →
`?? .worktrees/` only — **outside** `.b`'s writable set (`web/src/**` + two specs): no inherited
partial work on any unit; `.b` must leave `.worktrees/` alone. ⟨cmd⟩ `git -C ../glass-ui status
--porcelain` → empty (branch `master`, HEAD = origin `e3587ec8`).

**Preconditions ("Opens after F.W10 CLOSED (honest-RED)")**:

| Precondition | Receipt | Holds |
|---|---|---|
| F.W10 CLOSED | LEDGER `:73` → `CLOSED 2026-09-20 (honest-RED: G-F10-3 · G-F10-10; SPLIT …)` | YES |
| F.W9 CLOSED (rows never rewritten) | LEDGER `:72` → `CLOSED 2026-09-17 (honest-RED: …)` ⟵ CHECK 2 | YES |
| F.W10S row minted | LEDGER `:74` → `F.W10S … planned … 4 (.a ∥ .b → .c → .d); Opus` | YES |
| `.a` operand present | `CENSUS-ADDENDUM-2026-08-25.md` exists (33,881 B); `execution/C/F-W10.md` CK-1..CK-5 at `:2191-2195`; COHESION §5 F.W10 boundary entry `:840` | YES |
| `.b` operand present | fourier branch `m/w1-bump-migration`, HEAD `cef242d`; ⟨cmd⟩ `rev-list --count origin/m/w1-bump-migration..HEAD` → **0**, `HEAD..origin/…` → **0** (C2-M2 discharged, §0aj) | YES |
| `.c` operand present | `docs/tranches/X/coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md` (O-23) + `value-to-glassui-2026-09-DD-fw4-relay.md` (O-32) exist; INBOX rows O-23 `:109`, O-32 `:119`; E-F9b-2 at `execution/C/F-W9.md:1039`; ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ \| head -3` → **BK · BJ · BI** (BK newest) | YES |

Owner-gated items: none re-opened — every one is RULED at §0aj (G-F9-5/8/11/17 ⊕ E-F9b-4 → `.b`;
CK-1..4 → `.a`; G-F10-12 ⊕ E-F9b-2/CK-5 → `.c`; C2-M2 DISCHARGED; G-F9-15/19/23(b) and
G-F10-1/-2 → OWNER CLOSE REPORT; G-F10-3/-4 → X-W11 per §0ak; C2-M3 = LEDGER committed ALONE).

**E13 Step-0 mail sweep** (four landing paths, read-only, this seat's clock): ⟨cmd⟩ `find <path>
-maxdepth 1 -type f -newermt "2026-09-20 00:00" ! -name INBOX.md` → (1) `docs/tranches/V/` →
`ARCHITECTURE.md` only (Track A canon, not a letter, addressed to no one); `V/coordination/` →
**empty**; (2) `../glass-ui/docs/tranches/BK/coordination/` (BK re-confirmed newest) → **empty**;
(3) `../keyframes.js/docs/tranches/V/coordination/` → **empty**; (4)
`../sci-report/atlas/docs/tranches/P/coordination/` → **empty**. Every item older than that line
is already rowed (last sweep `INBOX.md:367`, 2026-09-20, KF.W13S OPEN; highest rows I-39 · O-46).
**Unrowed items addressed to value.js: 0 → no new I-row minted.** A dated sweep line is appended at
the INBOX tail.

## Baseline (BEFORE; read-only; born-RED expected on every gate)

| Gate | Unit | ⟨cmd⟩ | BEFORE | Reading |
|---|---|---|---|---|
| G-S-1 | .a | `grep -c 'lane-frontend.md:183' docs/tranches/V/megatranche/formation/fourier/CENSUS-ADDENDUM-2026-08-25.md` ×2 | **0 · 0** | RED (born-RED as the spec states "was 0") |
| G-S-1 (ids) | .a | `grep -c 'L-INFO-2\|PP-CENSUS' …CENSUS-ADDENDUM-2026-08-25.md` | **1** (the Scope row's "FLAGGED, NOT BOOKED" mention only; no dated section) | RED |
| CK-2/CK-3 | .a | `tail -n 15 execution/C/F-W10.md \| grep -c '1074\|nine'` | **0** (no addendum-beside yet; CK rows at `:2192-2193` only) | RED |
| CK-4 | .a | `awk 'NR>=840 && NR<=900 && /CK-/' docs/tranches/X/COHESION.md \| wc -l` | **0** | RED |
| G-F9-17 | .b | `cd ../fourier-analysis/web && npx vue-tsc --noEmit -p tsconfig.json` ×2 | `src/components/visualization/ContourEditorCanvas.vue(42,9): error TS6133: 'dragging' is declared but its value is never read.` · exit **2** (both runs) | RED |
| G-F9-8 | .b | `grep -c "test.fixme(" web/e2e/visualization-ux.spec.ts web/e2e/visualization-crud.spec.ts` | **ux 4 · crud 1** (ux `:151 :178 :249 :371`; crud `:664`) → 0 of 5 un-fixme'd | RED |
| G-F9-5 · G-F9-11 · E-F9b-4 | .b | full-stack Playwright (`contrast-floor.spec.ts` · `fullscreen.spec.ts` · `coarse-pointer.spec.ts:105`) | **NOT RUN at seat 0** — no fourier stack is listening (⟨cmd⟩ `lsof -iTCP -sTCP:LISTEN` → no api/web ports); banked RED cited from F.W9 CHECK 2 (`execution/C/F-W9.md:3418+`, C2-M1 `:3554`: the dialog never opens; G-F9-5 `:3526`) and §0aj's measured figures (20.8px · 40.0px). `.b` brings the stack up and measures BEFORE itself | RED (banked) |
| G-S-2 | .c | `ls ../glass-ui/docs/tranches/BK/coordination/ \| grep -i 'fourier\|fw4\|nwo1'` | **empty** — neither letter present in glass-ui | RED |

**greenBeforeCure: none** — every gate measured or banked RED before its cure.

## Unit plan

Groups (spec addendum `:521-523` + §0aj Mechanism): **[`.a` ∥ `.b`] → [`.c`] → [`.d`]**, dispatched
at most one concurrent (chassis maxUnits 1): `.a` → `.b` → `.c` → `.d`. `.a` and `.b` write
disjoint trees (value.js docs vs fourier `web/src`); the shared `execution/C/F-W10S.md` is
append-only per unit receipt. Every unit **Opus**; the chassis's fresh check follows `.d`.
**Standing locks for every unit**: pathspec-on-the-commit; **C2-M3 (§0aj): `LEDGER.md` committed
ALONE in its own commit immediately after editing**; E-3 (F.W9/F.W10 CLOSED rows and dated
records never rewritten — append/addenda-beside only); glass-ui product bytes READ-ONLY (mail is
the one lawful write, `.c` only); `scripts/dev/dev.sh` never touched.

| Unit | Model | Sections | Writable | Gates | Locks / families |
|---|---|---|---|---|---|
| `F.W10S.a` | opus | F-W10.md ADDENDUM §F.W10S.a `:526-536`; §0aj bullet 2; F-W10 record CK-1..CK-4 `:2191-2194`; COHESION §4.2 rows 65/76 (source text) | `docs/tranches/V/megatranche/formation/fourier/CENSUS-ADDENDUM-2026-08-25.md` · `docs/tranches/X/execution/C/F-W10.md` (append only) · `docs/tranches/X/COHESION.md` (§5 F.W10 boundary entry, one sentence) · `docs/tranches/X/execution/C/F-W10S.md` · `docs/tranches/X/execution/LEDGER.md` | G-S-1 (≥1, double-run; both ids present) · CK-2/CK-3 addenda present · CK-4 sentence present | verbatim quotation from §4.2; Scope row never rewritten (dated line beside) |
| `F.W10S.b` | opus | F-W10.md ADDENDUM §F.W10S.b `:538-557`; §0aj bullet 1 | fourier-analysis: `web/src/**` · `web/e2e/visualization-ux.spec.ts` · `web/e2e/visualization-crud.spec.ts` (fixme removal only); value.js: `docs/tranches/X/execution/C/F-W10S.md` | G-F9-5 · G-F9-8 (n of 5, named) · G-F9-11 · G-F9-17 · E-F9b-4 (two controls ≥44px) — each double-run on a LIVE stack | one commit per head (cure + its spec together); push `m/w1-bump-migration`; every other `web/e2e/*.spec.ts` READ-ONLY; no skip/ts-ignore/loosened assertion/copied producer locator; leave `?? .worktrees/` untouched |
| `F.W10S.c` | opus | F-W10.md ADDENDUM §F.W10S.c `:559-570`; §0aj bullet 3; CK-5 `execution/C/F-W10.md:2195`; E-F9b-2 `execution/C/F-W9.md:1039` | `../glass-ui/docs/tranches/BK/coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md` · `../glass-ui/docs/tranches/BK/coordination/value-to-glassui-2026-09-DD-fw4-relay.md` · `docs/tranches/V/coordination/INBOX.md` · `docs/tranches/X/execution/C/F-W9.md` (append only) · `docs/tranches/X/execution/C/F-W10S.md` | G-S-2 (`cmp` exit 0 ×2 on the verbatim copies, glass-ui sha on remote via `git ls-remote`, INBOX status lines present) | glass-ui commit by pathspec of the two letters ONLY; push glass-ui master; INBOX rows never rewritten (dated line beside) |
| `F.W10S.d` | opus | F-W10.md ADDENDUM §F.W10S.d `:572-576`; §0aj Mechanism | `docs/tranches/X/execution/C/F-W10S.md` · `docs/tranches/X/execution/LEDGER.md` · `docs/tranches/V/coordination/INBOX.md` (sweep line) | every gate above re-run double; bounds audit; E13 close sweep | verify-only; F.W10 ACCEPTED stamped only if G-S-1 GREEN ∧ `.b`'s five gates GREEN, else CLOSED honest-RED with residue by id; operator items to OWNER CLOSE REPORT |

## Unit receipts


### F.W10S.a

**Seat**: Opus (`claude-opus-5-5[1m]`) · clock 2026-09-22 · spec F-W10.md ADDENDUM §F.W10S.a `:526-536`
⊕ COHESION §0aj bullet 2 ⊕ `execution/C/F-W10.md` CK-1..CK-4 `:2191-2194` ⊕ COHESION §4.2 rows 65/76.

**Crash-recovery**: ⟨cmd⟩ `git status --porcelain | grep -E 'CENSUS-ADDENDUM|execution/C/F-W10|COHESION.md|LEDGER.md'`
→ **∅** (no match in the writable set; the one line the loose pattern could have caught was
`CARRY-LEDGER.md`, and the pattern did not match it either). **Inherited paths: none.**

**Anchors at the true bytes (all held; no drift)**: §4.2 row 65 = COHESION `:524`, row 76 = `:544`;
the addendum's FR-AFP-51 section ends `:271`, Scope row *"FLAGGED, NOT BOOKED"* at `:312`; F-W10 record
`C.1` `:1921-1922`, `C.2` G-F10-3 cell `:1950`, `C.7` `:2048`; §5 F.W10 boundary entry `:840-879`.

**Acts, in order**

1. **CK-1 cured: census errata landed.** A new dated section **§6.5-ERRATA-S** inserted into
   `CENSUS-ADDENDUM-2026-08-25.md` directly after FR-AFP-51 (before `---`/§6.7). It quotes §4.2 rows 65 and 76
   VERBATIM (copied from the bytes with `sed -n '524p;544p'`, not retyped), quotes the two banked corpus
   lines (`fr-BasisSelector.md:92` and `fr-PathPreview.md:31`), and states the corrections to
   `lane-frontend.md:87` and `:183/:366/:369/:444/:565`. The lane doc is not touched. Separately, a
   dated table row (`↳ … 2026-09-22`) was inserted **beside** the Scope row at `:312`, and the Scope
   row itself is untouched. ⟨cmd⟩ `git show --stat 5065843c` → **53 insertions(+), 0 deletions**.
   Verbatim check: ⟨cmd⟩ `grep -cxF "> $(sed -n 524p COHESION.md)" …` → **1**, and the same check
   for `:544` → **1**. → commit **`5065843c`**.
2. **CK-2 and CK-3 re-measured, then filed as addenda-beside** at the `execution/C/F-W10.md` tail,
   under a new `## Addenda-beside 2026-09-22` heading. `C.1`, `C.2` and `C.7` are not rewritten.
   CK-2: ⟨cmd⟩ cwd `fourier-analysis/web`, run twice: `node …/fourier-value-import-drift.mjs > out 2> err; echo $?; wc -c < out`
   → **exit 1 · 1074**, both runs. CK-3: ⟨cmd⟩ run twice over `C.1`'s 26 shas:
   `git show --name-only --format='' <sha> | sort -u | wc -l` → **9 · 9**, and `dev.sh` is not in the union.
   → commit **`9ed2dd07`**.
3. **CK-4 cured with one sentence.** One dated line appended at the end of COHESION §5's F.W10
   boundary entry (after `:879`): it records that `h` ran, that CK-1 is cured by `F.W10S.a`, and that
   ACCEPTED is still `F.W10S.d`'s to stamp. ⟨cmd⟩ `git show --stat a572d15f` → **1 insertion**.
   → commit **`a572d15f`**.

**Gates, BEFORE → AFTER (each AFTER reading taken twice from the settled bytes)**

| Gate | ⟨cmd⟩ | BEFORE (seat 0) | AFTER run 1 · run 2 | Verdict |
|---|---|---|---|---|
| G-S-1 | `grep -c 'lane-frontend.md:183' CENSUS-ADDENDUM-2026-08-25.md` | 0 · 0 | **4 · 4** | **GREEN** (≥1) |
| G-S-1 (ids) | `grep -c 'L-INFO-2'` / `grep -c 'PP-CENSUS'` (same file) | 1 (Scope row only) | **5 · 5** / **5 · 5** | **GREEN**: both ids in the dated section |
| CK-2/CK-3 | `tail -n 25 execution/C/F-W10.md \| grep -c '1074\|nine'` | 0 | **4 · 4** | **GREEN** |
| CK-4 | `awk 'NR>=840 && NR<=882 && /CK-/' COHESION.md \| wc -l` | 0 | **1 · 1** | **GREEN** |

**E-3 held**: all three commits are insertion-only (53 · 22 · 1 lines added, 0 deleted — ⟨cmd⟩ `git show --shortstat --format="" 5065843c 9ed2dd07 a572d15f`).
⟨cmd⟩ `git diff --stat HEAD~3 HEAD -- …/lane-frontend.md …/registry/` → **∅**.

**Residuals**: none owned by this unit. `LEDGER.md`'s F.W10 row still reads *"26 commits over 8 files"*;
per E-3 it is **not rewritten**, and CK-3's addendum-beside names the correct figure.
**Escalations**: none.

### F.W10S.b

**Seat**: Opus (`claude-opus-5-5[1m]`) · clock 2026-09-22 · spec F-W10.md ADDENDUM §F.W10S.b `:538-557`
⊕ COHESION §0aj bullet 1 (§0ak read to the file end; it binds X-W11 only, nothing here).

**Crash-recovery**: ⟨cmd⟩ `git -C ../fourier-analysis status --porcelain` → `?? .worktrees/` only (outside
the writable set; left alone). ⟨cmd⟩ `git status --porcelain docs/tranches/X/execution/C/F-W10S.md` → ∅.
**Inherited paths: none.** Branch `m/w1-bump-migration`, HEAD `cef242d` = origin at open.

**Live stack (every e2e reading below)**: `mongod` (scratchpad dbpath, :27017) ⊕ ⟨cmd⟩ `scripts/e2e.sh
--no-tests` → uvicorn :8000 healthy · vite :3000. Probes were driven from a scratchpad Playwright
config (`testDir` in the scratchpad); a first probe file briefly written under `web/e2e/` (untracked,
outside the writable set) was moved out within the same minute and never staged — recorded, not hidden.

**Acts, in order**

1. **G-F9-17: cured.** The anchor held at the true bytes: `ContourEditorCanvas.vue:42`, where `const { dragging, …
   } = usePointDrag(…)` was the only occurrence of `dragging`. I removed the binding from the destructure; no
   `@ts-ignore` was added. ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json` → exit **0**, and ⟨cmd⟩ `npm run build`
   (`vue-tsc -b && vite build`) → exit **0 · 0**. → **`01eb722`**.
2. **G-F9-5: cured at the token.** Before the cure, ⟨cmd⟩ `playwright test e2e/visualization-ux.spec.ts -g "/equation is"`
   → **1 failed**, one `[serious] color-contrast` node: `.eq-toggle-icon--mono`, the inactive `SegmentedTabs`
   option, ink `#8b7257` on the track composite `#e9e0d7` = **3.46:1**. The cause is in the tokens. The producer's
   inactive-tab ink reads `--muted-foreground`, and glass-ui already re-binds that token to `--on-glass-muted-strong`
   on its capsule family (`styles/glass/ladder.css`, `:where(.feedback-tone,.glass-capsule)`). That selector list
   leaves out `.glass-capsule-track`, so the pill track was painted in the page's muted register (`--neutral-5`).
   The cure extends the producer's own binding to that surface, at token scope: `:where(.glass-capsule-track){
   --muted-foreground: var(--on-glass-muted-strong) }` in `@layer glass-overrides` (`web/src/style.css`). It covers
   every capsule track and both arms, and it is not an instance override. The omission itself is the producer's
   (GLASS-RELAY). AFTER: **1 passed · 1 passed**. → **`f45901e`**.
3. **G-F9-11 / C2-M1: two root defects cured; one producer residual remains.** BEFORE: ⟨cmd⟩ `playwright test
   e2e/fullscreen.spec.ts` → **1 failed** at `:63`, dialog not found. That reproduces C2-M1. I split the mechanism
   with scratchpad probes. Instrumenting Vue's invokers showed the real click reached the button's `svg`, while the
   button's `onClick` never ran. ⟨CDP `DOMDebugger.getEventListeners`⟩ found a capture-phase `click` listener on
   `.glass-dock`: glass-ui's press guard (`dock.js` `ze()`), which calls `stopPropagation`+`preventDefault` on a
   click whose press began while the dock carried `data-morphing`. A timeline probe measured hover start at
   **9 ms**, dock expansion (`data-morphing` set) at **4043 ms**, pointerdown and click at **4355 ms**, and the morph
   settling at **4650 ms**. It also logged a `pageerror` *"Transition was aborted because of timeout in DOM update"*.
   The chain had three links:
   - (a) **Root cure, `web/src/router/index.ts`.** The view-transition update callback was released on a double
     `requestAnimationFrame`. rAF cannot fire while the browser suppresses rendering for that same callback, so
     every `/visualize`→`/w/` upload froze the page until the **4 s** DOM-update timeout. Hover was dropped for that
     long, and the dock expanded late. The callback is now released on `nextTick`, the `RouterView` commit.
     AFTER: the pageerror is gone, the expansion lands at **489 ms**, and the click at **856 ms** still falls
     before the morph settles at **1047 ms**.
   - (b) **Root cure, `FullscreenViewer.vue`.** With a click forced after the morph settled (scratchpad copy of the
     spec only), the dialog opened. It measured **512×46** (not fullscreen), and `.fs-controls` intercepted the
     `Exit fullscreen` click, which is `LW-2`'s mechanism. The cause: `DialogContent` is teleported and never
     carries this file's scope attribute, so the `.fs-dialog` rules in `<style scoped>` matched nothing. I moved
     them to an unscoped sheet and added `translate: none`, because the chassis centres with the `translate`
     longhand. A first attempt placed them in `@layer glass-overrides`. The measured result was that the chassis's
     card seat is **unlayered** `:where([data-slot="dialog-content"])` (`inline-size`, `translate`), which beat the
     layer, so the rules stay unlayered. AFTER (probe): dialog **1280×720**, `Exit fullscreen` is the hit target,
     and the probe flow **1 passed**.
   - (c) **RESIDUAL, producer-owned (escalated, not cured).** ⟨cmd⟩ `playwright test e2e/fullscreen.spec.ts` (spec
     untouched, locator unchanged) → **1 failed · 1 failed** at `:63`. The spec's `click()` lands mid-morph, and
     glass-ui's press guard discards it by design. The same guard swallowed a mouse click on the editor dock's
     `#persistent` "Save contour" during this seat's Invariant 19 probe: the pointer's approach hover-expands the
     dock, and the press then lands mid-morph. `GlassDock` exposes no prop that governs the guard. Neither
     `web/src` nor this unit's writable set holds a lawful cure; `fullscreen.spec.ts` is READ-ONLY here.
   → **`c2000a7`** (router ⊕ viewer, one head).
4. **E-F9b-4: cured at the component token.** BEFORE: ⟨cmd⟩ `playwright test --project=mobile-chromium
   e2e/coarse-pointer.spec.ts` → **1 failed** (`:105`: *About Fourier analysis → 20.8px · Dark mode → 40.0px*),
   3 passed. The cure is in `AppHeader.vue`. `--toggle-size` becomes `max(rung, var(--control-floor, 0px))` at both
   breakpoints, using the producer's own `max(scaled, floor)` shape; `--control-floor` is `0px` for a fine pointer
   and `--touch-target` (2.75rem) for a coarse one. The logo trigger's box takes `min-inline-size`/`min-block-size:
   var(--control-floor, 0px)`, so fine-pointer geometry is unchanged. AFTER: **4 passed · 4 passed**. Regression
   check: ⟨cmd⟩ `e2e/shell-header.spec.ts` (chromium) → **4 passed**. → **`8e98bb8`**.
5. **G-F9-8: 4 of 5 un-fixme'd, each named; 1 producer-owned and returned.** I ran every fixme'd keystone from a
   scratchpad copy with `fixme` removed. None of the notes' booked `aria-hidden-focus` (`ConfiguratorLayer`)
   reproduced at the 8.0.0 pin (`K-13`/`LC-2`'s prediction, now measured). What the runs did find:
   - **ux `:151` keystone 1 (workspace default) · ux `:178` keystone 2 (Configurator-open) · ux `:249` keystone 4
     (AnimationControls dropdown-open).** Keystones 1 and 2 had exactly one serious node each: `nested-interactive`
     on `#glass-dock-…-summary`. glass-ui 8.0.0 makes the auto-posture collapsed summary the dock's disclosure
     (`role="button"`), and this app kept its mini Play/Pause inside `#collapsed`. Keystone 4 was already clean. The
     cure is in `AnimationControls.vue`: the play control moves to `#persistent` (never inert, rendered at both
     poles; the precedent is `EditorControlsDock.vue`'s Save), the expanded duplicate is removed (one action, one
     control), and it sizes to the dock posture (`play-btn--mini` while collapsed). I removed the three `fixme`s and
     replaced their rationales with dated cure notes (LC-2's own cure: *"delete the fixme AND its rationale"*).
     → **`4a94aa7`**.
   - **ux `:371` Invariant 19 (`save_contour_then_recompute`).** The named defect reproduced and was worse than
     booked. `saveContourPoints` nulled `epicycleData`/`basesData`, and the next ContourSettings trigger then
     **re-extracted** the contour from the image (`POST …/extract-contour` ~220 ms after the save), so a saved edit
     could be replaced by a fresh extraction. The cure is in `workspace.ts`: the save recomputes the saved contour
     once, inside its own `computing` bracket, and keeps the previous frame until results land. The booked body
     depended on a `window.__store` / `window.__computeCount` seam that was never built, and it called
     `saveContourPoints()` with no points. I re-drove the test through the product (editor → Save → back, by
     keyboard) and kept every assertion: canvas live, controls unperturbed, and one compute pass, counted from the
     network and pinned to the saved hash. Born-RED check: the test measured **1 failed** (`+ …/extract-contour`)
     with the store cure reverted, and **1 passed** with it re-applied. → **`aca2580`**.
   - **crud `:664` (workspace default @ 3 viewports): STAYS `fixme`, returned as producer-owned.** Un-fixme'd on the
     live stack: laptop and desktop **passed** (×2); mobile **failed** (×2), one `[serious] color-contrast` node.
     That node is the `SegmentedTabs variant="underline"` inactive "Controls" tab: ink `#8b7257` on `--background`
     `#fbfaf8` = **4.33:1**. The ink is glass-ui's `.segmented-tab` recipe, `color-mix(--muted-foreground,
     --glass-capsule-warm 12%)` over its own page background. No consumer token governs it (unlike the capsule-track
     case in act 2), so this is a producer rung (GLASS-RELAY). I restored the `fixme`, so the file carries zero
     bytes of change. The escalation id is **not** written into the note: the lock allows only fixme removal in
     this spec, which conflicts with the addendum's "escalation id written into the note". That conflict is
     returned, not resolved by improvising.

**Gates, BEFORE → AFTER** (live stack; each AFTER double-run from the settled bytes at `aca2580`)

| Gate | ⟨cmd⟩ | BEFORE | AFTER run 1 · run 2 | Verdict |
|---|---|---|---|---|
| G-F9-17 | `npm run build` (`vue-tsc -b && vite build`) | exit 2 (banked seat 0: TS6133 `(42,9)`) | exit **0 · 0** | **GREEN** |
| G-F9-5 | `playwright test e2e/visualization-ux.spec.ts` (the `/equation` keystone, `:194` at HEAD) | 1 failed (3.46:1, one node) | passed · passed | **GREEN** (witness = the `/equation` axe keystone) |
| G-F9-5 (spec's leg) | `playwright test e2e/contrast-floor.spec.ts` | 3 failed (light 19/38) | 3 failed · 3 failed (light **19/38**, dark **10/38**, re-derivable list) | **RED — not G-F9-5's pairs**; see Residual R-2 |
| G-F9-8 | full-stack run of each keystone, `grep -c "test.fixme(" …ux… …crud…` | 0 of 5 (ux 4 · crud 1) | ux **9 passed · 9 passed**; `test.fixme(` → ux **0**, crud **1** | **4 of 5**: ux `:151` · `:178` · `:249` · `:371`; crud `:664` returned |
| G-F9-11 | `playwright test e2e/fullscreen.spec.ts` (spec and locator unchanged) | 1 failed `:63` | 1 failed · 1 failed `:63` | **RED — producer residual** (act 3c) |
| E-F9b-4 | `playwright test --project=mobile-chromium e2e/coarse-pointer.spec.ts` | 1 failed (20.8px · 40.0px), 3 passed | 4 passed · 4 passed | **GREEN** |

**Regression sweep (read-only against the suite)**: I ran ⟨cmd⟩ `playwright test --workers=4` (both projects) once at
`aca2580` → **91 passed · 13 failed · 3 skipped**. The 13 failures:
- contrast-floor ×3.
- gallery-admin-a11y ×4 and visual-checkpoint ×4, 11 in all. I served `cef242d` from a scratchpad `git worktree` on
  :3001 against the same API: the same 11 fail there with **identical** pixel counts (57/59/60/3736). They are
  pre-existing, and not moved by this unit.
- fullscreen ×1 (act 3c).
- equation-interaction ×1 under 4-worker load. It passes in isolation ×3 and under ⟨cmd⟩ `--repeat-each=6
  --workers=4` → **6 passed**, so it is a load flake, not a regression.

**Side effect, cleaned**: that sweep's `visual-baseline.spec.ts` (`π capture [before]`) **rewrote 21 tracked
PNGs** under fourier `docs/tranches/J/audit/screenshots/before/`, which is outside the writable set. They were
this seat's own run artifacts (the tree was clean at open). I restored them by exact pathspec (`git checkout --
<those 21 paths>`), and ⟨cmd⟩ `git status --porcelain` → `?? .worktrees/` only. The sweep was **not** re-run.

**Commits (fourier-analysis, `m/w1-bump-migration`, one per head; pushed)**: `01eb722` (G-F9-17) · `f45901e`
(G-F9-5) · `c2000a7` (G-F9-11) · `8e98bb8` (E-F9b-4) · `4a94aa7` (G-F9-8 k1/k2/k4) · `aca2580` (G-F9-8 Inv-19).
⟨cmd⟩ `git push origin m/w1-bump-migration` → `cef242d..aca2580`; ⟨cmd⟩ `git ls-remote origin
refs/heads/m/w1-bump-migration` → `aca25800…`; `rev-list --count origin/…..HEAD` → **0**.

**Residuals**
- **R-1 · G-F9-11 (producer, ESCALATED).** glass-ui's dock press guard (`dock.js` `ze()` → `onClickCapture`)
  discards any click whose press began while the dock had `data-morphing`. Hover-expansion starts that morph, and it
  runs about 560 ms. A real click that arrives right after the control becomes visible is therefore swallowed. That
  covers `fullscreen.spec.ts`'s click and, as measured here, a mouse click on the editor dock's `#persistent` Save.
  `web/src` holds no lawful cure (`GlassDock` exposes no knob for the guard), and the spec that could wait for the
  settle is READ-ONLY for this unit. There are two lawful routes: a glass-ui relay (the guard should not discard a
  press whose target is stable in the arriving layer, or `#persistent` content), or a spec-owner act on
  `fullscreen.spec.ts` that awaits the settle. Both `web/src` defects under C2-M1 are cured: the 4 s freeze and the
  non-fullscreen viewer.
- **R-2 · `contrast-floor.spec.ts` (not this unit's pairs).** It stays RED on 19/38 light and 10/38 dark F.W4 pairs,
  plus 6 un-derived expressions. Their owners are F.W4 `.a/.b/.c/.d/.e` and a GLASS-RELAY rung. The spec's own `owner`
  column names them, and none is the `/equation` node. G-F9-5's axe witness is GREEN. The spec leg the addendum
  quotes ("`contrast-floor.spec.ts` green") is impossible inside `.b`'s cure, so it is returned, not substituted.
- **R-3 · crud `:664` (producer, ESCALATED).** It stays `fixme`: mobile `SegmentedTabs` underline inactive ink
  measures 4.33:1 on `--background`, and that ink is the producer's recipe (GLASS-RELAY). Laptop and desktop are
  green. The note is **unamended**, because the lock "crud spec = fixme removal only" contradicts the addendum's
  "escalation id written into the note". The id is carried here and in the return instead: **`E-F10S-b1`** (dock
  press guard, R-1) · **`E-F10S-b2`** (underline segmented-tab ink, R-3).
- **Relay rows owed (mail, not this unit's write):** the capsule-track muted binding omission (act 2's upstream
  half), `E-F10S-b1` and `E-F10S-b2`. Each goes to glass-ui BK by the lawful mail path.

**Escalations**: `E-F10S-b1` (G-F9-11 producer press guard) · `E-F10S-b2` (crud:664 producer underline ink ⊕ the
crud note-lock conflict) · R-2 (contrast-floor leg outside `.b`).
**Bounds audit**: fourier writes = `web/src/{components/visualization/ContourEditorCanvas.vue, style.css,
router/index.ts, components/visualization/FullscreenViewer.vue, components/layout/AppHeader.vue,
components/visualization/AnimationControls.vue, stores/workspace.ts}` ⊕ `web/e2e/visualization-ux.spec.ts`, all
inside the writable set; `visualization-crud.spec.ts` net **0 bytes**. value.js write = this record only. glass-ui
was untouched. `scripts/dev/dev.sh` was untouched.

## Close

**Seat**: `.d` VERIFY-ONLY (Opus, `claude-opus-5-5[1m]`) · clock 2026-09-22 · spec F-W10.md ADDENDUM §F.W10S.d
`:572-576`. Cured nothing. **Crash-recovery**: ⟨cmd⟩ `git status --porcelain` (value.js): no dirty path inside
this seat's writable set (`F-W10S.md` · `LEDGER.md` · `INBOX.md` all clean); the 20 sibling-dirty rows and
`scripts/dev/dev.sh` were left alone. fourier → `?? .worktrees/` only (left alone). **Inherited: none.**

**Unit dispatch reading**: `.a` DONE · `.b` ESCALATED (receipt `8e695c9f`) · **`.c` NEVER DISPATCHED** — no
`### F.W10S.c` receipt in this record; ⟨cmd⟩ `ls ../glass-ui/docs/tranches/BK/coordination/ | grep -i
'fourier\|fw4\|nwo1'` → **empty** (BK still newest: ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1` → `BK/`).

### Bounds audit (⟨cmd⟩ `git show --stat` per commit)

| Unit | Commit | Paths | In writable set |
|---|---|---|---|
| .a | `5065843c` | `CENSUS-ADDENDUM-2026-08-25.md` (+53) | YES |
| .a | `9ed2dd07` | `execution/C/F-W10.md` (+22, append) | YES |
| .a | `a572d15f` | `COHESION.md` (+1) | YES |
| .a | `8b51351f` | `execution/C/F-W10S.md` (+51) | YES |
| .a | `5b5ec858` | `execution/LEDGER.md` (+1, alone per C2-M3) | YES |
| .b | fourier `01eb722` | `web/src/components/visualization/ContourEditorCanvas.vue` | YES |
| .b | fourier `f45901e` | `web/src/style.css` | YES |
| .b | fourier `c2000a7` | `web/src/components/visualization/FullscreenViewer.vue` · `web/src/router/index.ts` | YES |
| .b | fourier `8e98bb8` | `web/src/components/layout/AppHeader.vue` | YES |
| .b | fourier `4a94aa7` | `web/src/components/visualization/AnimationControls.vue` · `web/e2e/visualization-ux.spec.ts` | YES |
| .b | fourier `aca2580` | `web/src/stores/workspace.ts` · `web/e2e/visualization-ux.spec.ts` | YES |
| .b | `8e695c9f` | `execution/C/F-W10S.md` (+161) | YES |

**Landed-wrong: none.** `visualization-crud.spec.ts` carries 0 bytes of change; glass-ui untouched by this wave.

### Gates, re-run by this seat (BEFORE → AFTER; live stack for every e2e reading)

Live stack: `mongod` (scratchpad dbpath, :27017) ⊕ ⟨cmd⟩ `scripts/e2e.sh --no-tests` (uvicorn :8000 · vite :3000),
fourier HEAD `aca2580` = origin (⟨cmd⟩ `git ls-remote origin refs/heads/m/w1-bump-migration` → `aca25800…`); torn
down after; ⟨cmd⟩ `git -C ../fourier-analysis status --porcelain` → `?? .worktrees/` only.

| Gate | ⟨cmd⟩ | BEFORE (seat 0 / banked) | AFTER run 1 · run 2 (this seat) | Verdict |
|---|---|---|---|---|
| G-S-1 | `grep -c 'lane-frontend.md:183' CENSUS-ADDENDUM-2026-08-25.md`; ids `grep -c L-INFO-2` / `PP-CENSUS` | 0 · 0; ids 1 (Scope row only) | **4 · 4**; L-INFO-2 **5 · 5**, PP-CENSUS **5 · 5** | **GREEN** |
| CK-2/CK-3 | `tail -n 25 execution/C/F-W10.md \| grep -cE '1074\|nine'` | 0 | **4 · 4** | **GREEN** |
| CK-4 | `awk 'NR>=840 && NR<=882 && /CK-/' COHESION.md \| wc -l` | 0 | **1 · 1** | **GREEN** |
| G-F9-17 | `cd web && npm run build` (`vue-tsc -b && vite build`) | exit 2 (TS6133 `(42,9)`) | exit **0 · 0** | **GREEN** |
| G-F9-5 | `playwright test e2e/visualization-ux.spec.ts --project=chromium` (the `/equation` axe keystone inside) | 1 failed (3.46:1) | **9 passed · 9 passed** | **GREEN** (axe witness) |
| G-F9-5 spec leg | `playwright test e2e/contrast-floor.spec.ts` | 3 failed | **3 failed · 3 failed** | **RED** — R-2 (F.W4 owners ⊕ GLASS-RELAY rung) |
| G-F9-8 | `grep -c "test.fixme(" web/e2e/visualization-{ux,crud}.spec.ts` ⊕ the ux run above | ux 4 · crud 1 (0 of 5) | ux **0** · crud **1**; ux 9 passed ×2 | **4 of 5** — ux `:151` `:178` `:249` `:371`; crud `:664` RED (E-F10S-b2) |
| G-F9-11 | `playwright test e2e/fullscreen.spec.ts --project=chromium` (spec untouched) | 1 failed `:63` | **1 failed · 1 failed** at `fullscreen.spec.ts:63:30` (`toBeVisible` — element not found) | **RED** — E-F10S-b1 (glass-ui dock press guard) |
| E-F9b-4 | `playwright test e2e/coarse-pointer.spec.ts --project=mobile-chromium` | 1 failed (20.8px · 40.0px) | **4 passed · 4 passed** | **GREEN** |
| G-S-2 | `ls ../glass-ui/docs/tranches/BK/coordination/ \| grep -i 'fourier\|fw4\|nwo1'`; `cmp` ×2 | empty | **empty · empty** — no copy exists to `cmp`; no INBOX LANDED line | **RED** — `.c` undispatched |

**Tally (self-count)**: GREEN 6 (G-S-1 · CK-2/CK-3 · CK-4 · G-F9-17 · G-F9-5 axe · E-F9b-4); PARTIAL 1 (G-F9-8, 4/5);
RED 3 (G-F9-5 spec leg · G-F9-11 · G-S-2).

### E13 close sweep

⟨cmd⟩ `find <path> -maxdepth 1 -type f -newermt "2026-09-22 00:00" ! -name INBOX.md` → value.js `V/`: empty ·
`V/coordination`: empty · glass-ui `BK/coordination`: `glass-outbound-2026-09-22-consumers-10.0.0.md` — addressed to
slides + atlas (the 10.0.0 name cut), NOT to value.js, already swept at `INBOX.md:374` · keyframes.js
`V/coordination`: empty · atlas `P/coordination`: empty. **UNREAD in scope: 0.** A dated sweep line is appended at the
INBOX tail.

### Residuals (by id, with named owners)

- **G-S-2 / `.c` (UNDISPATCHED)** — O-23 + O-32 not carried into glass-ui BK; the CK-5 erratum beside E-F9b-2
  (`execution/C/F-W9.md`, O-32 copy tail) not appended; INBOX LANDED lines absent. Owner: **F.W10S.c** (chassis must
  dispatch it; this seat cures nothing).
- **E-F10S-b1 · G-F9-11** — glass-ui dock press guard (`dock.js` `ze()` `onClickCapture`) discards a press begun
  during `data-morphing`. Owner: **glass-ui BK (GLASS-RELAY via `.c`'s mail hop)** or the `fullscreen.spec.ts` spec
  owner (await settle). Both `web/src` roots under C2-M1 are cured (`c2000a7`).
- **E-F10S-b2 · G-F9-8 crud `:664`** — mobile `SegmentedTabs variant="underline"` inactive ink 4.33:1 (producer
  recipe). Owner: **glass-ui BK (GLASS-RELAY)**; the crud note-lock vs addendum conflict → **the spec owner (COHESION
  ruling)**.
- **R-2 · `contrast-floor.spec.ts`** (3 failed ×2) — F.W4 pairs (light 19/38 · dark 10/38) — owners **F.W4
  `.a/.b/.c/.d/.e` ⊕ a GLASS-RELAY rung**; not G-F9-5's `/equation` node.
- **Relay rows owed** (mail): the capsule-track `--muted-foreground` binding omission (act 2 upstream half) ·
  E-F10S-b1 · E-F10S-b2 → glass-ui BK by the lawful mail path (`.c`-class hop).
- **OWNER CLOSE REPORT (listed, not cured, per spec)**: G-F9-15 · G-F9-19 · G-F9-23(b) (operator items) · G-F10-1 /
  G-F10-2 (fourier-ledger verbs).

### Escalations

`E-F10S-b1` · `E-F10S-b2` (carried from `.b`) · `E-F10S-d1` (this seat): **`.c` was never dispatched** — G-S-2 is
unmeasurable-green by construction until the carriage hop runs.

### State / four-verb

The spec's `.d` stamps F.W10 **ACCEPTED only if G-S-1 GREEN ∧ `.b`'s five gates GREEN**. G-S-1 is GREEN; `.b` reads
3 GREEN (G-F9-17 · G-F9-5 axe · E-F9b-4) + G-F9-8 4/5 + G-F9-11 RED. **F.W10 is NOT stamped ACCEPTED; its row stays
CLOSED honest-RED** (never rewritten). F.W10S four-verb: AUDITED YES · SPECIFIED YES · **IMPLEMENTED PARTIAL** (`.a`
whole; `.b` 4 of 5 heads + 4 of 5 keystones; `.c` not run) · VERIFIED NO (this seat is not designated to stamp it;
the chassis's fresh check follows).

**Close verdict: PARTIAL** — remains: `.c` (G-S-2) · E-F10S-b1 (G-F9-11) · E-F10S-b2 (crud `:664`) · R-2.

## Check 1

**Seat**: L-20 fresh adversarial pass 1 · VERIFY-ONLY · `claude-opus-5-5[1m]` · clock 2026-09-22 · sitting of record
2026-09-17. **Crash-recovery**: ⟨cmd⟩ `git status --porcelain` (value.js) → no dirty path inside this seat's writable
set (`F-W10S.md` · `LEDGER.md`); sibling rows and `scripts/dev/dev.sh` left alone. fourier → `?? .worktrees/` only
(left alone). **Inherited: none.**

**Verdict: NOT-CONFORMANT** — one HIGH (G-S-2 RED with no relief: `.c` never dispatched). Every GREEN the close claims
reproduces at this seat's own commands; the three producer/successor-owned REDs are relieved and owner-named.

### Axis 1 / 9 — the close's GREENs, re-run by this seat (double; live stack: `mongod` scratchpad dbpath :27017 ⊕
`scripts/e2e.sh --no-tests` uvicorn :8000 · vite :3000, fourier HEAD `aca2580`; torn down after, tree clean)

| Gate | ⟨cmd⟩ | Close claims | This seat, run 1 · run 2 | Reproduces |
|---|---|---|---|---|
| G-S-1 | `grep -c 'lane-frontend.md:183'` / `L-INFO-2` / `PP-CENSUS` on `CENSUS-ADDENDUM-2026-08-25.md` | 4 · 5 · 5 | **4·5·5 · 4·5·5** | YES |
| CK-2/CK-3 | `tail -n 25 execution/C/F-W10.md \| grep -cE '1074\|nine'` | 4 | **4 · 4** | YES |
| CK-4 | `awk 'NR>=840 && NR<=882 && /CK-/' COHESION.md \| wc -l` | 1 | **1 · 1** | YES |
| G-F9-17 | `cd web && npm run build` | exit 0·0 | **exit 0 · exit 0** | YES |
| G-F9-5 (axe) ⊕ G-F9-8 ux | `playwright test e2e/visualization-ux.spec.ts --project=chromium` | 9 passed ×2 | **9 passed (28.0s) · 9 passed (29.5s)** | YES |
| E-F9b-4 | `playwright test e2e/coarse-pointer.spec.ts --project=mobile-chromium` | 4 passed ×2 | **4 passed · 4 passed** | YES |
| G-F9-8 count | `grep -c "test.fixme(" visualization-{ux,crud}.spec.ts` | ux 0 · crud 1 | **0 · 1** (crud `:664`) | YES |
| G-F9-11 (RED) | `playwright test e2e/fullscreen.spec.ts --project=chromium` | 1 failed `:63` ×2 | **1 failed · 1 failed** at `fullscreen.spec.ts:63` | YES (RED) |
| contrast-floor (RED) | `playwright test e2e/contrast-floor.spec.ts` | 3 failed ×2 | **3 failed · 3 failed** | YES (RED) |
| G-S-2 (RED) | `ls ../glass-ui/docs/tranches/BK/coordination/ \| grep -i 'fourier\|fw4\|nwo1'` | empty | **empty** (BK still newest) | YES (RED) |

Self-count: 7 claimed GREEN rows re-run, 7 reproduce; 3 RED rows re-run, 3 reproduce RED; 0 divergences.

### Axes 2–8

- **(2) Bounds** — ⟨cmd⟩ `git show --stat` on `fdf58303` `5065843c` `9ed2dd07` `a572d15f` `8b51351f` `5b5ec858`
  `8e695c9f` `e620ffee` `53bdd391` `a58d113b` (value.js) and fourier `01eb722` `f45901e` `c2000a7` `8e98bb8` `4a94aa7`
  `aca2580`: every path inside its unit's writable set; `visualization-crud.spec.ts` 0 bytes; glass-ui untouched;
  ⟨cmd⟩ `git log fdf58303^..HEAD -- scripts/dev/dev.sh` → empty. **Clean.**
- **(3) Masking** — ⟨cmd⟩ non-comment `-/+` lines of `4a94aa7`/`aca2580` on `visualization-ux.spec.ts`: `4a94aa7`
  changes only `test.fixme(`→`test(` ×3 (the −130 are the fixme notes); `aca2580` REWRITES the Invariant-19 keystone
  body (window-hook `__computeCount`/`__store` probes → network witnesses: save 2xx, exactly one
  `/compute/bases` + one `/compute/epicycles` for the saved hash, controls unchanged, canvas visible). No skip, no
  ts-ignore, no allowlist, no copied producer selector, no node_modules patch. See MINOR-1.
- **(4) Families** — one commit per head in fourier (cure ⊕ its spec together); LEDGER committed alone (C2-M3). **Held.**
- **(5) E-3** — ⟨cmd⟩ `git diff --stat fdf58303^..HEAD -- docs/tranches/X/fourier/waves/
  docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/fourier/conformance/ execution/C/F-W9.md` → only
  Track A `X-W6` evidence files (`docs/tranches/X/waves/…`, commits `e6bd7fe5`/`980bbfc4`, not this wave); this wave's
  `F-W10.md`/`COHESION.md`/`CENSUS-ADDENDUM` hunks are insertion-only (`@@ -2224,3 +2224,25` · `@@ -877,6 +877,7` ·
  `@@ -270,6 +270,58` / `@@ -310,6 +362,7`). **Held.**
- **(6) Mail** — INBOX `:376` close sweep UNREAD 0; no newer letter to value.js. **Clean.** (The relay rows OWED
  outbound are MEDIUM-1, not UNREAD.)
- **(7) Four-verb** — IMPLEMENTED PARTIAL / VERIFIED NO; F.W10 NOT stamped ACCEPTED (lawful: `.b`'s five not all GREEN).
- **(8) Goal at the bytes** — `.a` MET; `.b` MET for 4 heads + 4/5 keystones, the rest producer-owned; **`.c` NOT MET**
  (the carriage hop the spec assigns to this wave was never run).

### Register

| Sev | Claim | Receipt | Cure |
|---|---|---|---|
| **HIGH** | G-S-2 RED with NO relief: `F.W10S.c` (spec addendum `:559-570`; COHESION §0aj → unit `.c`) was never dispatched — the carriage hop is this wave's own act (mail = the one lawful glass-ui write), neither producer-owned nor routed to a successor. | ⟨cmd⟩ `grep -n '^### F.W10S.c' F-W10S.md` → none; `ls ../glass-ui/docs/tranches/BK/coordination/ \| grep -i 'fourier\|fw4\|nwo1'` → empty; no INBOX LANDED line beside O-23/O-32; no CK-5 erratum beside E-F9b-2. | Dispatch `F.W10S.c` exactly per spec (`cp` ×2 + `cmp`, erratum ×2, glass-ui pathspec commit + push, INBOX dated lines), then re-close `.d` and run Check 2. |
| MEDIUM | The producer reliefs for E-F10S-b1 · E-F10S-b2 (and the capsule-track `--muted-foreground` binding half of act 1) rest on relay mail that is OWED, not sent — Close "Relay rows owed". | Close `:370-371`; glass-ui BK listing carries no such letter. | Carry them in the `.c`-class hop (lawful mail path) in the same dispatch. |
| MINOR | Invariant-19 keystone (`visualization-ux.spec.ts:290`) is re-authored, not merely un-fixme'd; the original "within one rAF" clause is not asserted. Substance is kept (one compute per kind asserted exactly), and the old probes read hooks the product never exposed. | `git show aca2580 -- web/e2e/visualization-ux.spec.ts`. | Record the re-authoring as a disclosed deviation in `.c`/Check 2; no code change owed. |
| MINOR | crud `:664` stays fixme without the escalation id written into its note (spec act 5), because `.b`'s writable set limits crud to "fixme removal only". Disclosed, routed to the spec owner. | `grep -n E-F10S web/e2e/visualization-crud.spec.ts` → none; receipt `:284-290`. | COHESION ruling on the note-lock conflict. |
| INFO | `workspace.ts` recompute uses `Promise.allSettled` — each `runCompute*` owns its own error state; not a mask around a defect. | `aca2580` hunk `@@ -282`. | none |

### Axis 10 — honest-RED adjudication (every RED gate, at the spec bytes)

| Gate | Relief | Owner named in the residual register | Relieved? |
|---|---|---|---|
| G-F9-11 (`fullscreen.spec.ts:63`) | Producer-owned: glass-ui dock press guard (`dock.js` `ze()` `onClickCapture`) discards a press begun under `data-morphing`; both `web/src` roots cured (`c2000a7`); `GlassDock` exposes no governing prop; spec locator must stay UNCHANGED. Spec §F.W10S.b forbids a consumer patch. | E-F10S-b1 → glass-ui BK (GLASS-RELAY) | YES (relay mail owed — MEDIUM) |
| G-F9-8 crud `:664` | Producer-owned by the spec's own clause: "a keystone whose defect is producer-owned (glass-ui) STAYS fixme … and is returned" — `SegmentedTabs variant="underline"` inactive ink 4.33:1. | E-F10S-b2 → glass-ui BK | YES (note-id MINOR; relay owed) |
| G-F9-5 spec leg (`contrast-floor.spec.ts`, 3 failed) | Not this wave's gate: the addendum's G-F9-5 act is "the single `/equation` contrast node" (axe witness GREEN); the spec file's pairs are F.W4's. | R-2 → F.W4 `.a–.e` ⊕ GLASS-RELAY | YES |
| **G-S-2** | **None** — `.c` is this wave's own unit; no producer, no successor routing, no named honest-RED id in the spec. | "F.W10S.c (chassis must dispatch it)" | **NO → HIGH** |

**Honest-RED set (relieved):** G-F9-11 · G-F9-8 (crud `:664`) · contrast-floor spec leg (R-2). **Unrelieved:** G-S-2.

**Successor conjuncts.** No wave declares "Opens after F.W10S"; the addendum makes F.W10's ACCEPTED stamp the only
downstream effect, and its conjunct (G-S-1 GREEN ∧ `.b`'s five GREEN) holds only at G-S-1 — F.W10 lawfully stays CLOSED
honest-RED. OWNER CLOSE REPORT items (G-F9-15 · G-F9-19 · G-F9-23(b) · G-F10-1/-2) and X-W11's G-F10-3/-4 (§0ak) are
not gated by this wave. Nothing is unlawfully blocked; the wave itself is blocked on its own `.c`.

**LEDGER**: status NOT promoted (stays PARTIAL); one event line appended, committed ALONE (C2-M3).

## Repair 1

**Seat**: REPAIR round 1 (Opus, `claude-opus-5-5[1m]`) · clock 2026-09-22 · sitting of record 2026-09-17. Register = `## Check 1`.
The spec was read whole (`F-W10.md`, §ADDENDUM 2026-09-21 governs), together with COHESION §0aj. **Crash-recovery**:
⟨cmd⟩ `git status --porcelain`. value.js: no dirty path in this seat's writable set (`F-W10S.md` · `F-W9.md` · `INBOX.md` ·
`LEDGER.md`). The sibling rows and `scripts/dev/dev.sh` were left alone. fourier: `?? .worktrees/` only, left alone. glass-ui:
`BK/coordination/` had no dirty letter paths (its product-tree dirt belongs to the glass-ui session and was left alone).
**Inherited: none.**

### F.W10S.c — the carriage hop, dispatched here (cures HIGH-1 and MEDIUM-1)

Bounds: spec §F.W10S.c `:559-570`. This seat wrote exactly the writable set: the two BK letter copies · `INBOX.md` ·
`F-W9.md` (append only) · this record.

1. **BK re-confirmed newest at this seat's clock.** ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ | head -1` → `BK/`.
2. **Verbatim copy.** Both letters were copied with `cp` from `docs/tranches/X/coordination/`. ⟨cmd⟩ `cmp <src> <dst>` → exit
   **0 · 0** for O-23 and exit **0 · 0** for O-32. The two copies were committed alone in glass-ui by pathspec →
   **`b249b586`** (+473; 2 files).
3. **Erratum ×2 (CK-5).** The first was appended at the O-32 copy's tail: "ERRATUM 2026-09-22 … beside `E-F9b-2`", naming
   reka-ui `FocusGuards` (not the `Metric` tile) as the `aria-hidden-focus` payload. The second was appended to
   `execution/C/F-W9.md` → value.js **`0e021210`** (+4, append only).
4. **MEDIUM-1: the relay rows owed ride the same hop.** A dated "ADDENDUM 2026-09-22" was placed in the same O-32-copy
   tail. It carries `A-1` (the capsule-track `--muted-foreground` binding omission, act 2's upstream half), `A-2` =
   `E-F10S-b1` (the dock press guard) and `A-3` = `E-F10S-b2` (the underline `SegmentedTabs` inactive ink, 4.33:1), each with
   its measured figures and an ask. **Disclosed choice**: `.c`'s writable set names only the two letter paths, so the rows
   ride the O-32 copy's tail and no third file was minted. That keeps them in the lawful mail path with no new channel.
   glass-ui commit, by pathspec of that one file → **`46eec459`** (+16).
5. **The verbatim bytes survive the append.** ⟨cmd⟩ `git -C ../glass-ui show b249b586:<O-32 path> | cmp - <src>` → exit **0**;
   ⟨cmd⟩ `head -c 14508 <O-32 copy> | cmp - <src>` → exit **0** (14508 = ⟨cmd⟩ `wc -c < <src>`). O-23's copy is unappended:
   worktree `cmp` → exit **0**.
6. **Push.** ⟨cmd⟩ `git -C ../glass-ui push origin master` → `e3587ec8..46eec459 master -> master`. ⟨cmd⟩ `git ls-remote
   origin refs/heads/master` → `46eec459…` (double-run, identical). **Disclosure**: glass-ui local `master` was 2 ahead
   of origin at open (`695d4925` · `72d8bd96`), and the glass-ui session committed `6875b1b3` between this seat's two
   commits. A fast-forward push of `46eec459` necessarily publishes those three glass-ui-session commits (no rewrite, no
   tag, no force). This seat did not author them or touch their paths.
7. **INBOX.** Two dated status lines, "beside O-23" and "beside O-32" (LANDED, glass-ui shas), were appended at the tail.
   Rows `:109`/`:119` are not rewritten → value.js **`d0077db6`** (+4).

### Defect → cure → commit

| Check 1 row | Cure | Commit(s) | Verdict |
|---|---|---|---|
| **HIGH** G-S-2 RED, `.c` undispatched | `.c` dispatched exactly per spec (steps 1–7 above) | glass-ui `b249b586` · `46eec459` (pushed) · value.js `0e021210` · `d0077db6` | **CURED**: G-S-2 GREEN (below) |
| **MEDIUM** relay rows owed (E-F10S-b1 · E-F10S-b2 · capsule-track binding) | carried in the same mail hop as rows `A-1`/`A-2`/`A-3` of the O-32 copy's dated addendum | glass-ui `46eec459` (pushed) | **CURED** (sent; producer disposition is glass-ui's act) |
| **MINOR** Invariant-19 keystone re-authored; "within one rAF" clause not asserted | **Recorded here as a DISCLOSED DEVIATION.** `visualization-ux.spec.ts:290` (fourier `aca2580`) was re-authored, not merely un-fixme'd. The booked body read `window.__store` / `window.__computeCount` hooks that `web/src` never exposed (⟨cmd⟩ `git grep __computeCount cef242d -- web/src` → 0, per Check 1). It is now driven through the product, and it asserts save 2xx, exactly one `/compute/bases` and one `/compute/epicycles` for the saved hash, unchanged controls, and a live canvas. The "within one rAF" timing clause is **not asserted**. The substance (one compute per kind) is kept. No code change is owed | this record | **CURED (disclosure)** |
| **MINOR** crud `:664` note lacks the escalation id | **not curable in bounds.** `.b`'s writable set allows `visualization-crud.spec.ts` "fixme removal only", and `.c`/Repair have no fourier write at all. The id `E-F10S-b2` is carried in this record, in the Close, and now in the producer letter (`A-3`) | — | **ESCALATED** (COHESION ruling on the note-lock conflict) |
| INFO `Promise.allSettled` in `workspace.ts` | none owed | — | stands |

### Gates re-read (every gate a cure could move, double-run at the settled bytes)

| Gate | ⟨cmd⟩ | Check 1 | Repair 1 run 1 · run 2 | Verdict |
|---|---|---|---|---|
| G-S-2 (presence) | `ls ../glass-ui/docs/tranches/BK/coordination/ \| grep -ci 'nwo1\|fw4'`; BK newest `ls -dt …/*/ \| head -1` | 0 | **2 · 2**; `BK/` · `BK/` | GREEN |
| G-S-2 (O-23 identity) | `cmp <BK copy> <src>` | — | exit **0 · 0** | GREEN |
| G-S-2 (O-32 identity) | `git show b249b586:<path> \| cmp - <src>`; `head -c 14508 <copy> \| cmp - <src>` | — | exit **0 · 0**; **0 · 0** | GREEN (verbatim at the carriage commit; verbatim prefix under the dated tail) |
| G-S-2 (remote) | `git -C ../glass-ui ls-remote origin refs/heads/master`; `merge-base --is-ancestor 46eec459 origin/master` | — | `46eec459` · `46eec459`; exit **0 · 0** | GREEN |
| G-S-2 (INBOX) | `grep -c 'Status 2026-09-22 beside O-23\|… beside O-32' INBOX.md` | 0 | **2 · 2** | GREEN |
| CK-5 erratum (F-W9) | `grep -c 'ERRATUM 2026-09-22 (X.F.W10S.c' execution/C/F-W9.md` | 0 | **1 · 1** | GREEN |
| G-S-1 (unmoved) | `grep -c 'lane-frontend.md:183' CENSUS-ADDENDUM-2026-08-25.md` | 4 | **4 · 4** | GREEN |
| CK-2/CK-3 (unmoved) | `tail -n 25 execution/C/F-W10.md \| grep -cE '1074\|nine'` | 4 | **4 · 4** | GREEN |
| CK-4 | Check 1's window `awk 'NR>=840 && NR<=882 && /CK-/'` → **0 · 0**. That is **instrument drift, not regression**: sibling seats' later COHESION insertions moved the `.a` sentence from `:883` to **`:887`**. Re-read at the baseline's own window `NR>=840 && NR<=900` → **1 · 1**; ⟨cmd⟩ `git show HEAD:docs/tranches/X/COHESION.md \| grep -n 'Dated 2026-09-22, \`X.F.W10S.a\`'` → `:887`, inside §5 (`:724`) | 1 | **1 · 1** (at the 840–900 window) | GREEN |
| `.b` gates (G-F9-5 · G-F9-8 · G-F9-11 · G-F9-17 · E-F9b-4) | not movable by this repair: zero fourier bytes written. ⟨cmd⟩ `git -C ../fourier-analysis rev-parse --short HEAD` → `aca2580` ×2; porcelain `?? .worktrees/` only; `grep -c "test.fixme("` → ux **0** · crud **1** ×2 | banked, Check 1 | unmoved ×2 | cited from Check 1 (7/7 GREENs reproduced; RED G-F9-11 · crud `:664` · R-2) |

**Tally (self-count)**: 10 rows. 9 read GREEN (the G-S-2 legs ×5 · CK-5 · G-S-1 · CK-2/CK-3 · CK-4). 1 row is the `.b` gates,
cited unmoved from Check 1.

### State after Repair 1

**`.c` is DONE and G-S-2 is GREEN.** The wave's remaining REDs are the relieved, producer- or successor-owned set:
G-F9-11 (`E-F10S-b1`, now relayed as `A-2`) · crud `:664` (`E-F10S-b2`, relayed as `A-3`) · R-2 (`contrast-floor.spec.ts`,
F.W4 owners ⊕ GLASS-RELAY). The `.d` stamp conjunct (G-S-1 GREEN ∧ `.b`'s five GREEN) still fails at G-F9-11 and G-F9-8,
so **F.W10 is NOT stamped ACCEPTED**. Its row stays CLOSED honest-RED and is not rewritten. F.W10S four-verb: IMPLEMENTED
PARTIAL → **YES for `.a` and `.c`, PARTIAL for `.b`** · VERIFIED NO (the chassis's Check 2 follows).
**Escalation**: `E-F10S-r1` = Check 1 MINOR-2. The crud `:664` note-lock (writable "fixme removal only") conflicts with
spec act 5's "escalation id written into the note". The spec owner (COHESION) must rule on it.
**LEDGER**: status not promoted. One event line was appended and committed ALONE (C2-M3).

## Check 2

**Seat**: L-20 fresh adversarial pass 2 · VERIFY-ONLY · `claude-opus-5-5[1m]` · clock 2026-09-22 · sitting of record
2026-09-17. This seat authored no byte of the wave's cures, receipts, Close, Check 1 or Repair 1. **Crash-recovery**:
⟨cmd⟩ `git status --porcelain` (value.js) → no dirty path inside this seat's writable set (`F-W10S.md` · `LEDGER.md`);
sibling rows and `scripts/dev/dev.sh` left alone. fourier → `?? .worktrees/` only (left alone). **Inherited: none.**

**Verdict: CONFORMANT-HONEST-RED** — 0 BLOCKER / CRITICAL / HIGH. Every GREEN the close and Repair 1 claim reproduces at
this seat's own commands. The three remaining REDs are relieved and owner-named (axis 10). Check 1's HIGH (G-S-2) is
cured at the bytes and on the glass-ui remote.

### Axis 1 / 9 — GREENs re-run by this seat (double; live stack: `mongod` scratchpad dbpath :27017 ⊕ `scripts/e2e.sh --no-tests` → uvicorn :8000 · vite :3000; fourier HEAD `aca2580` = `origin/m/w1-bump-migration`; torn down after, porcelain `?? .worktrees/` only)

| Gate | ⟨cmd⟩ | Run 1 · Run 2 | Verdict |
|---|---|---|---|
| G-S-1 | `grep -c 'lane-frontend.md:183'` / `L-INFO-2` / `PP-CENSUS` on `CENSUS-ADDENDUM-2026-08-25.md` | 4/5/5 · 4/5/5 | GREEN |
| CK-2/CK-3 | `tail -n 25 execution/C/F-W10.md \| grep -cE '1074\|nine'` | 4 · 4 | GREEN |
| CK-4 | `awk 'NR>=840 && NR<=900 && /CK-/' COHESION.md \| wc -l` (sentence at `:887`) | 1 · 1 | GREEN |
| CK-5 erratum | `grep -c 'ERRATUM 2026-09-22 (X.F.W10S.c' execution/C/F-W9.md` | 1 · 1 | GREEN |
| G-S-2 | BK newest (`ls -dt`) → `BK/`; `cmp` O-23 copy → 0 · 0; `git show b249b586:<O-32> \| cmp - <src>` → 0 · 0; `head -c <src bytes> <O-32 copy> \| cmp` → 0 · 0; `merge-base --is-ancestor 46eec459 origin/master` → 0 · 0; `ls-remote` → `46eec459…`; INBOX `Status 2026-09-22 beside O-23\|O-32` → 2 · 2 | as listed | GREEN |
| G-F9-17 | `npx vue-tsc -b` (web) ×2; `npm run build` ×1 | exit 0 · 0; build exit 0 | GREEN |
| G-F9-5 (axe witness) ⊕ G-F9-8 ux ×4 | `playwright test e2e/visualization-ux.spec.ts --project=chromium` | 9 passed · 9 passed | GREEN |
| G-F9-8 count | `grep -c "test.fixme(" web/e2e/visualization-{ux,crud}.spec.ts` | ux 0 · crud 1 | 4 of 5 (crud `:664` RED, relieved) |
| E-F9b-4 | `playwright test e2e/coarse-pointer.spec.ts --project=mobile-chromium` | 4 passed · 4 passed | GREEN |
| G-F9-11 | `playwright test e2e/fullscreen.spec.ts --project=chromium` (spec untouched) | 1 failed · 1 failed at `:63:30` | RED (relieved) |
| G-F9-5 spec leg | `playwright test e2e/contrast-floor.spec.ts --project=chromium` | 3 failed · 3 failed (pairs · light · dark) | RED (relieved) |

**Tally (self-count)**: 11 rows. 8 GREEN gates reproduced (G-S-1 · CK-2/CK-3 · CK-4 · CK-5 · G-S-2 · G-F9-17 · G-F9-5
axe · E-F9b-4); G-F9-8 4 of 5 reproduced; 2 RED rows reproduced (G-F9-11 · contrast-floor). No claimed GREEN failed.

### Axes 2–8

- **(2) Bounds.** ⟨cmd⟩ `git show --numstat` on every value.js commit: `fdf58303` (record + INBOX sweep) · `5065843c`
  CENSUS-ADDENDUM +53/-0 · `9ed2dd07` F-W10.md +22/-0 · `a572d15f` COHESION +1/-0 · `5b5ec858` LEDGER +1 · `0e021210`
  F-W9.md +4/-0 · `d0077db6` INBOX +4/-0 · `8e695c9f` `e620ffee` `0ddd9a32` `ee08d720` record only. fourier
  `git diff --stat cef242d..aca2580` → 7 `web/src/**` files plus `web/e2e/visualization-ux.spec.ts`, and
  `visualization-crud.spec.ts` untouched. glass-ui `b249b586` (the 2 letters) · `46eec459` (the O-32 copy only). All of
  them are inside the unit writable sets. `git log fdf58303^..HEAD -- scripts/dev/dev.sh` → empty.
- **(3) Masking.** ⟨cmd⟩ `git diff cef242d..aca2580 | grep -E '^\+.*(skip|fixme|ts-ignore|ts-expect|catch|allowlist|eslint-disable|force: *true)'`
  → comment lines only. There is no `test.skip`, no `@ts-ignore`, no try/catch around a defect, and no node_modules patch.
  `Promise.allSettled` in `workspace.ts` is not a mask: each `runCompute*` owns its own error state (INFO, as Check 1
  found). The `style.css` capsule-track re-binding is judged below as a MINOR.
- **(4) Families.** One fourier commit per head (`01eb722` G-F9-17 · `f45901e` G-F9-5 · `c2000a7` G-F9-11 · `8e98bb8`
  E-F9b-4 · `4a94aa7` + `aca2580` G-F9-8, each with its spec change in the same commit). LEDGER edits were committed ALONE
  (C2-M3). glass-ui has one carriage commit and one tail commit. Nothing is split.
- **(5) E-3.** ⟨cmd⟩ `git diff --stat fdf58303^..HEAD -- docs/tranches/X/fourier/waves/ docs/tranches/V/megatranche/registry/adjudicated/ docs/tranches/X/fourier/conformance`
  → **empty**. The dated records touched (`F-W10.md`, `F-W9.md`, CENSUS-ADDENDUM, INBOX) show `-0` deletions, so they are append-only.
- **(6) Mail.** ⟨cmd⟩ `find <4 paths> -maxdepth 1 -type f -newermt "2026-09-22 00:00" ! -name INBOX.md` → value.js `V/` ·
  `V/coordination` · keyframes.js · atlas all **empty**. glass-ui BK holds the two carried letters (this wave's own) and
  `glass-outbound-2026-09-22-consumers-10.0.0.md`, which is addressed to slides and atlas and already swept at `INBOX.md:374`.
  **UNREAD in scope: 0.**
- **(7) Four-verb.** AUDITED YES · SPECIFIED YES · IMPLEMENTED YES for `.a` and `.c`, with the relieved residue for `.b`
  · VERIFIED YES (this check). F.W10 is correctly **not** stamped ACCEPTED, because the §F.W10S.d conjunct fails at
  G-F9-11 and G-F9-8. F.W10's row was not rewritten.
- **(8) Goal at the bytes.** The census errata landed. The four `web/src` heads were cured at their roots: the unused
  binding was removed; the capsule-track token was bound; the teleported-root styles were unscoped and the rAF freeze was
  replaced by `nextTick`; and `--control-floor` was applied. Four of five keystones were un-fixme'd on a live run. Both
  letters were carried verbatim and pushed. That meets the goal except for the relieved residue.

### Register

| Sev | Claim | Receipt | Cure |
|---|---|---|---|
| MINOR | Addendum act (1) states "`contrast-floor.spec.ts` green". The spec still fails 3 tests ×2, so the literal clause is unmet. Its relief is that the instrument is G-F4-CONTRAST-FLOOR, already on F.W4's honest-RED set, and the head act (the single `/equation` node) is GREEN at its axe witness. | contrast-floor run above; LEDGER `:68` F.W4 honest-RED lists `G-F4-CONTRAST-FLOOR`; `visualization-ux.spec.ts:194` `/equation` passed ×2 | F.W4 owners ⊕ GLASS-RELAY (R-2); no F.W10S act owed |
| MINOR | G-F9-5's cure re-binds `--muted-foreground` on the producer class `:where(.glass-capsule-track)` inside the consumer's `@layer glass-overrides`. This consumer-side token act compensates for a producer omission. §0aj and the addendum sanction it ("a token act at the root, never a per-instance override"), and the upstream half was relayed as `A-1`. | fourier `f45901e` `web/src/style.css`; glass-ui `46eec459` row A-1 | Retire the rule when glass-ui adds the track to its capsule list; the relay is sent |
| MINOR | The Invariant-19 keystone was re-authored and the "within one rAF" timing clause is not asserted. The replacement asserts something stronger (exactly one compute per kind, pinned to the saved hash). This is disclosed at Repair 1. | `git diff cef242d..aca2580 -- web/e2e/visualization-ux.spec.ts` | none owed (disclosed deviation stands) |
| MINOR | The crud `:664` note does not carry its escalation id, because the writable set says "fixme removal only". This spec-internal conflict is escalated as `E-F10S-r1`. | `sed -n 655,672p web/e2e/visualization-crud.spec.ts`: stale LC-2 rationale, no `E-F10S` | COHESION ruling on `E-F10S-r1` |
| INFO | G-F9-11's relief rests on the standing law (glass-ui is READ-ONLY; producer rows ride mail). §0aj ruled C2-M1 a `web/src` defect, and both `web/src` roots were cured (`c2000a7`). The residual is a different mechanism: the producer press guard discards a press begun under `data-morphing`. `GlassDock` exposes no prop for it, and the spec is read-only. | `.b` receipt act 3(c); `fullscreen.spec.ts:63:30` ×2; relay `A-2` | glass-ui BK (A-2) or the spec owner |
| INFO | The glass-ui fast-forward push published three glass-ui-session commits. There was no rewrite and no force, and Repair 1 disclosed it. | Repair 1 step 6 | none |

### Axis 10 — honest-RED adjudication (every RED gate, at the spec bytes)

| Gate | Relief | Owner named | Relieved? |
|---|---|---|---|
| G-F9-11 (`fullscreen.spec.ts:63`) | **Producer-owned**: it can go green only upstream (glass-ui dock press guard) or through the spec owner, because the spec is READ-ONLY for every unit and its locator must stay unchanged. Both `web/src` roots are cured. A consumer patch would be a gate failure. | `E-F10S-b1` → glass-ui BK (relayed `A-2`, `46eec459`) | YES |
| G-F9-8 crud `:664` | **Producer-owned by the spec's own clause**: "a keystone whose defect is producer-owned (glass-ui) STAYS fixme … and is returned". The defect is the underline `SegmentedTabs` inactive ink, 4.33:1. | `E-F10S-b2` → glass-ui BK (relayed `A-3`); note-id conflict → `E-F10S-r1` (COHESION) | YES |
| G-F9-5 spec leg (`contrast-floor.spec.ts`) | **Owned by F.W4** by that wave's own honest-RED (`G-F4-CONTRAST-FLOOR`), and the `/equation` node is GREEN | R-2 → F.W4 owners ⊕ GLASS-RELAY | YES |

**Honest-RED set:** G-F9-11 · G-F9-8 (crud `:664`) · G-F9-5 contrast-floor leg. **Unrelieved: none.**

**Successor conjuncts.** No wave declares "Opens after F.W10S". The addendum's only downstream effect is F.W10's
ACCEPTED stamp, and its conjunct (G-S-1 GREEN ∧ `.b`'s five GREEN) holds only at G-S-1. F.W10 therefore stays CLOSED
honest-RED, lawfully. X-W11 ("everything") gains this close; G-F10-3/-4 go to X-W11 per §0ak and are not gated here.
Operator items (G-F9-15 · G-F9-19 · G-F9-23(b)) and G-F10-1/-2 go to the OWNER CLOSE REPORT. No successor is unlawfully
blocked.

**LEDGER**: the F.W10S status is set to `CLOSED 2026-09-17 (honest-RED: G-F9-11 · G-F9-8 crud:664 · G-F9-5
contrast-floor leg)`. One event line is appended, and the LEDGER is committed ALONE (C2-M3).
