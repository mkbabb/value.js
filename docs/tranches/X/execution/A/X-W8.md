SERVED MODEL: claude-opus-5-5

# X-W8 — execution record (Track A · X·V) — Shadcn and graph subtraction

Spec: `docs/tranches/X/waves/W8.md` (534 lines, read whole; its addenda 2026-09-22 ×2, 2026-09-23 ×4 read).
Rulings of record: COHESION §0k.3 **S-1** (DockCommand registry + A3's cure land at X-W8) · **S-4**
(UserSortMenu register = X-W10's; G-9 deletes the dead attribute) · **S-8** (MT-CSP-1 homed X-W6) ·
§0ao / §0ba / §0bb / §0bc (`DOCK-SCROLL-MORPH`) / **§0bd** (`.f .g .h` ABSORBED by X-W12; X-W8 executes
`.a–.e` and `.i` only) · §0bc (Opus 5.5 for every seat) · §0de (glass 10.1.0 everywhere — the spec's
"7.0.0" owner set reads as the installed **10.1.0**, 68-key exports map) · §0fb/§0fd (guard law).

## Open

- Date: 2026-10-17 (wave date of record 2026-09-17). Seat 0, `claude-opus-5-5`. HEAD `d17dece5a`
  (2026-10-17 06:11:40 -0400). Mode: FRESH OPEN (LEDGER row read `planned`; no prior record).
- Crash-recovery: ⟨`git status --porcelain -- <this seat's writable set> demo eslint.config.js
  package.json components.json docs/tranches/V/ARCHITECTURE.md`⟩ → only `?? demo/app/.vite-critic-9216/`
  (an untracked Vite cache left by a critic seat; outside every unit's set; not touched). No inherited edits.

### Preconditions (bytes AND ledger)

| precondition | LEDGER | bytes |
|---|---|---|
| X-W5 CLOSED | `:41` CLOSED 2026-09-17 (honest-RED incl. A3 → X-W8, C3 → X-W8 `.i`, C7 → `.h`) | record `A/X-W5.md:4769` routes A3's cure here (S-1) |
| X-W6 CLOSED | `:34` CLOSED 2026-09-17 | gradient SCC reads 0 at the oracle (below) — X-W6.c's leaf landed |
| X-W7 CLOSED | `:35` CLOSED 2026-09-17 (C-5/NG-6 owned by X-W8 `.i`) | — |
| X-W12 CLOSED (§0bd: X-W8 opens after X-W12) | `:38` CLOSED 2026-09-17 | — |
| X-W12U CLOSED (W12U.md:4 Blocks X-W8) | `:39` CLOSED 2026-09-17 (CHECK 10, `d17dece5a`) | — |
| X-W7L CLOSED (W7L.md:4 Blocks X-W8) | `:37` CLOSED | glass pin ⟨`grep '"@mkbabb/glass-ui"' package.json`⟩ → `10.1.0`; installed `10.1.0` |
| X-W0 typed graph authority | X-W0 CLOSED | `docs/tranches/V/megatranche/workflows/graph-v3.mjs` present (1328 lines); `--print-sccs` exit 0 ×2, digest identical |

All preconditions hold. **Not blocked.**

### E13 Step-0 mail sweep

Paths: value `docs/tranches/V/` + `V/coordination/` · glass newest tranche dir ⟨`ls -dt glass-ui/docs/tranches/*/ | head -3`⟩ →
**BL** BK BJ (BK is no longer the newest; BL has no `coordination/`) — swept BL + BK/coordination ·
keyframes `docs/tranches/V/coordination/` · atlas `sci-report/atlas/docs/tranches/P/coordination/`.
⟨`find <path> -maxdepth 1 -type f -newer docs/tranches/V/coordination/INBOX.md`⟩ (INBOX mtime Oct 17 02:24) →
glass `BL/FORMATION-PROGRESS.md` only (glass's own resume cursor, not a letter addressed to value.js);
0 on every other path. **0 unrowed · 0 UNREAD in scope.** Sweep line appended to INBOX.md.

## Baseline

BEFORE readings, read-only at HEAD `d17dece5a` (2026-10-17). Heavy commands through
`~/.claude/guard/guarded --light`. Raw outputs pasted below the table.

| gate | BEFORE | reading |
|---|---|---|
| G-1 census | **RED** | `docs/tranches/X/waves/W8-census.md` absent |
| G-2 barrels | **GREEN-BEFORE-CURE** | ⟨`find demo/ui -name index.ts \| wc -l`⟩ → 0; `demo/ui` absent — deleted at X-W12U.k `2ae7344d2` ("the 19 demo/ui shims deleted, 96 imports re-pointed to subpaths"). `demo/shared/ui/` holds 10 real `.vue` components, not re-export barrels |
| G-3 owners | **RED (narrowness clause)** | verbatim spec grep → **96** / **53** files — every hit is now an `@mkbabb/glass-ui/<subpath>` specifier (the regex `[^'"]*ui/(button…)` matches `glass-ui/button`); filtering `@mkbabb/glass-ui/` → **0** local-barrel imports. Typecheck exit 0. BUT **9** root-barrel statements import `useClipboard`/`writeClipboard`, which ship at the narrower `./dom` subpath (10.1.0 `dist/dom.js:238`) → not narrowest. Root-only at 10.1.0 (no subpath in the 68-key map): `Alert*`, `Skeleton`, `Accordion*` (relay "alert-skeleton-subpaths" 2026-10-13 already in BK) |
| G-4 config/deps | **RED** | `components.json` present; ⟨`grep -c 'demo/@' eslint.config.js`⟩ → **8** (`:266-269`, `:290` comment, `:306-307`, `:317` message); `clsx` + `tailwind-merge` in `package.json` (2) and lockfile (2); `tw-animate-css` declared (1) |
| G-5 cn/debounce | **RED** | `cn(` call sites 0; `demo/shared/utils.ts` present (exports `cn` + the demo's `debounce`); debounce importers now **11** (not 7): GradientCodeEditor · useExtractSession · usePaletteWiring · useAtmosphere · useColorParsing · useColorUrl · useColorNameResolution · useColorPersistence · useColorPipeline · AdminAuditPanel · useAdminUsers |
| G-6 lint | **RED (ban clause)** | ⟨`npm run lint`⟩ → **exit 0** (GREEN-BEFORE: `eslint.config.js:42` ignores `docs/**`, wider than the spec's `docs/tranches/**`); **no** `no-restricted-imports` ban on the deleted barrel paths (`:207` bans only glass-ui from `src/`) → clause 3 RED; falsifier not yet demonstrable |
| G-7 SCCs | **RED (2 of 4)** | ⟨`node …/graph-v3.mjs --print-sccs`⟩ ×2 exit 0, sha `e068f1de5125a9a7` both: `[runtime] Dock` + `[load] Dock` (`shell/dock/Dock.vue` ↔ `index.ts`) · `[load] Markdown` (`scenes/about/markdown/Markdown.vue` ↔ `index.ts`). **gradient trio and Admin/provider seven-node: ABSENT (0) — GREEN-BEFORE-CURE** (X-W6.c leaf types; the admin tree moved to `demo/palettes/admin/**`). Also listed: 1 `[ownership]` lattice + 10 `[ownership.pair]` directory-level components (one named `CPE L-24 · palettes ↔ shell owner=X-W8`) — directory-granularity, not module SCCs; the gate's 0 runtime / 0 type-inclusive reads the file-level classes |
| G-8 shim | **RED (count clause, prose only)** | ⟨`grep -cE 'useLayerTransition\|SUB_LAYER_CROSSFADE_MS' demo/shell/dock/layers/ActionBarLayer.vue`⟩ → **1** (`:99`, a comment naming the retired successor); `<DockCrossfade` → **3**. The shim code is gone; the gate's literal count is 1 |
| G-9 Button/Skeleton | **GREEN-BEFORE-CURE (attribute clause)** | PaginationBar / UserSortMenu / AdminListSkeleton (now `demo/palettes/admin/**`): `variant=` 0, `surface=` 0. The null-DELTA pair is not committed (moot: no attribute left to delete) |
| G-10 dead surface | **RED (1 of 5 + refs)** | `ColorComponentDisplay.vue:87` `update: [value, component]` emit still declared (RED); `ActionToolbar.vue` deleted at `c00004924` (canProposeName prop/binding + clearHover/defineExpose GONE); `ActionBarLayer.vue:48,241` `colorInputRef` (2 hits, check read-in-script at unit time); `actionToolbarRef` 0; `GradientPane.vue` inject gone (X-W6.a) |
| G-11 PointerDebugOverlay | **RED** | file moved to `demo/picker/debug/PointerDebugOverlay.vue`; `aria-controls` 0 (disclosure rebuilt — clause discharged); `execCommand` result unchecked (`:132-134`); no try/finally around `appendChild`/`removeChild` (`:130-133`); two `setTimeout` (`:123`, `:135`) with no `onUnmounted`/`onScopeDispose`/`clearTimeout`; 3 `<button>` at `:49,:55,:58`, 0 `type="button"` |
| G-12 admin latch | **RED (test clause)** | `useDockAdminMode.ts:36` `isAdminMode = computed(...)` — DERIVED already (UIA-V-59) → clause 1 GREEN-BEFORE; no test drives `/#/` → `/#/atmosphere` → `back()` (⟨`grep -rln useDockAdminMode test demo/test e2e`⟩ → 0) |
| G-13 chrome rung | **RED** | probe re-rooted on `.dock-plate` (`useContrastSafeColor.ts:159-164`, X-W7L.i) but `resolveLiveTint(): SurfaceTint \| undefined` and `ink.ts:51` `RUNG_STEP.chrome: -1` still exist — the silent static fallback is representable; sole consumer `ProfileSection.vue:33` |
| G-14 LoC cap | **RED** | `ARCHITECTURE.md:944` still asserts ≤ 400 and excludes `demo/@/components/ui/`; `max-lines` in eslint 0. Demo >400 at HEAD: GradientStopRail.vue 1013 · space-catalog.ts 687 · usePaneRouter.ts 643 · PaletteInspector.vue 595 · BrowsePane.vue 564 · App.vue 511 · byte-exact.test.ts 501 · AdminUsersPanel.vue 494 · useContrastSafeColor.ts 491 · MixSourceSelector.vue 470 |
| G-15 preservation | GREEN | ⟨`npm run typecheck`⟩ exit 0; ⟨`npm run lint`⟩ exit 0 (product tree included) |
| G-W8-i1 (.i) | **RED** | ⟨`grep -rEo 'isWide\|isLgViewport' demo/`⟩ → 6 hits: ExtractWorkbench.vue:230,309 · ConsoleRail.vue:73,123 · HeroBlob.vue:71,189; canaries ⟨`npx vitest run test/spectrum-luma.test.ts demo/test/shell/reka-binding-idiom.test.ts --maxWorkers=2`⟩ → **2 failed \| 5 passed** (C-5 · NG-6). `DockStatusLamp.vue` absent (C7's file deleted upstream — strike at `.i`) |
| W5-BTN-INTERACTIVE-DEAD (.d) | **RED** | `btn-interactive` in `demo/shell/dock/ColorInput.vue` + `demo/palettes/browser/card/CurrentPaletteEditor.vue` |
| W5-READY-DEAD (.d) | discharged | §0bb: discharged at `16852e03` — `.d` confirms and strikes |
| A3 / C2 (S-1 → X-W8) | **RED of record** | `DockCommand` registry: 0 sites (`demo/shell/usePaneRouter.ts:392`, `useSceneTargets.ts:164` comments name it as X-W8's) |
| DOCK-SCROLL-MORPH (§0bc) | honest-RED by id | no compact-on-scroll dock in installed glass 10.1.0 dock declarations; O-55 |

### Pasted outputs

```
$ node docs/tranches/V/megatranche/workflows/graph-v3.mjs --print-sccs | grep -v ownership -A2 (file-level classes)
[load] size=2 Markdown owner=X.W8.c
    · demo/scenes/about/markdown/Markdown.vue
    · demo/scenes/about/markdown/index.ts
[load] size=2 Dock owner=X.W8.c
    · demo/shell/dock/Dock.vue
    · demo/shell/dock/index.ts
--
[runtime] size=2 Dock owner=X.W8.c
    · demo/shell/dock/Dock.vue
    · demo/shell/dock/index.ts
$ npx vitest run test/spectrum-luma.test.ts demo/test/shell/reka-binding-idiom.test.ts --maxWorkers=2
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  test/spectrum-luma.test.ts > spectrumLuma — the shared plate regime > C-5 · BORN-RED — the selected stroke clears 3:1 against the field at every hue
 FAIL  demo/test/shell/reka-binding-idiom.test.ts > NG-6 · the reka binding-correctness canary > a `:checked` binding drives NOTHING — the stale-binding class, caught
 Test Files  2 failed (2)
      Tests  2 failed | 5 passed (7)
$ npm run lint  -> exit 0 (no findings printed)
$ npm run typecheck -> exit 0
```

## Unit plan

Order binding (W8.md §Disjointness `:126-131`: b → c → d → e serial; addenda: `.i` serial after `.h`,
`.h` absorbed by X-W12 §0bd). One unit per group, each commits before the next dispatches. Every seat
Opus 5.5 (§0bc; spec Agents line "5 serial (Opus seats)"). Path drift since 41450f02 is bound by the
census, not the spec's prose: the admin tree now lives at `demo/palettes/admin/**`;
`PointerDebugOverlay.vue` at `demo/picker/debug/`; `ActionToolbar.vue` is deleted (`c00004924`).

| # | unit | spec sections | gates |
|---|---|---|---|
| 1 | `X.W8.a` census | §Agent Units X.W8.a `:146-155` · §Hard Gate G-1 `:208-225` · §Archaeology `:478-489` | G-1 |
| 2 | `X.W8.b` barrel + config subtraction | X.W8.b `:157-168` · G-2..G-6, G-9 `:227-306` · §Scope 2-5 | G-2 · G-3 · G-4 · G-5 · G-6 · G-9 |
| 3 | `X.W8.c` SCC closure | X.W8.c `:170-180` · G-7 `:308-327` | G-7 |
| 4 | `X.W8.d` dead surface/state/ink | X.W8.d `:182-195` · G-8, G-10..G-13 `:328-406` · addenda §0ba/§0bb (`W5-BTN-INTERACTIVE-DEAD`, `W5-READY-DEAD` strike) | G-8 · G-10 · G-11 · G-12 · G-13 |
| 5 | `X.W8.dc` DockCommand registry (A3/C2) | COHESION §0k.3 **S-1** (`:1494`) · W5.md A3 `:247` / C2 `:269` · ADDENDUM §0bc `DOCK-SCROLL-MORPH` (dock owner's row) | A3 · C2 · DOCK-SCROLL-MORPH (honest-RED by id, O-55) |
| 6 | `X.W8.e` joint cap ruling | X.W8.e `:197-206` · G-14 `:408-425` | G-14 |
| 7 | `X.W8.i` W5/W6/W12U carries | ADDENDUM 2026-09-22 (second, §0aq) · §0bb `J4-SHORT-LANDSCAPE-BLOB` · COHESION `:2692` · X-W12U routes (C-5/NG-6, 844×390 CLS) · `O12-3-HOVER-GPU` (§0az) | G-W8-i1 · o29 blob limb flips GREEN |

Close (separate seat, not a unit): G-15 full suite + `W8-CLOSE.md` + the L-18 rider's passes.

Writable sets (from §File Bounds, census-bound):
- `.a`: `docs/tranches/X/waves/W8-census.md` (create) · this record (receipt).
- `.b`: `components.json` (delete) · `eslint.config.js` (the `demo/@/**` globs `:266-269,:306-307` + their dead-alias messages; barrel ban) · `package.json` · `package-lock.json` (drop `clsx`, `tailwind-merge`) · `demo/shared/utils.ts` (delete) · `demo/shared/debounce.ts` (create) · the 11 debounce importers · the 9 root-barrel `useClipboard`/`writeClipboard` statements → `@mkbabb/glass-ui/dom` (GradientEasingEditor · GradientVisualizer · MixResultDisplay · MixPane · GenerateControls · ConfigSliderPane · ColorInput · PaletteInspector · useSwatchActions) · `docs/tranches/X/waves/W8-witness/**`.
- `.c`: `demo/shell/dock/index.ts` · `demo/shell/dock/Dock.vue` · `demo/scenes/about/markdown/index.ts` · `Markdown.vue` · a new `demo/scenes/about/markdown/types.ts` · `W8-witness/**`.
- `.d`: `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue` · `demo/shell/dock/layers/ActionBarLayer.vue` · `demo/picker/debug/PointerDebugOverlay.vue` · `demo/shell/dock/composables/useDockAdminMode.ts` + one new back-navigation test · `demo/color-session/useContrastSafeColor.ts` · `demo/color-session/ink.ts` · `demo/shell/dock/menus/ProfileSection.vue` · `demo/shell/dock/ColorInput.vue` + `demo/palettes/browser/card/CurrentPaletteEditor.vue` (`btn-interactive` only) · `W8-witness/**`.
- `.dc`: `docs/tranches/X/waves/W8.md` (dated ADDENDUM append only — §0k.3's "first docs act") · `demo/shell/usePaneRouter.ts` · `demo/shell/useSceneTargets.ts` · `demo/shell/useSceneActions.ts` · `demo/shell/dock/**` (the mobile seat) · one new `demo/test/shell/` registry test · `W8-witness/**`.
- `.e`: `docs/tranches/V/ARCHITECTURE.md` (`:943-945` only) · `eslint.config.js` (max-lines ratchet) · `W8-witness/**`.
- `.i`: `demo/workbenches/extract/ExtractWorkbench.vue` · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` · `demo/picker/visual/HeroBlob.vue` · `demo/picker/controls/spectrumLuma.ts` (+ its two consumers `useSpectrumPlateStyle.ts`, `ComponentSliders.vue`) · the NG-6 subject sites the canary names · `demo/shell/shell.css` (J4 arrangement rule) · `e2e/smoke/oracles/o29-scene-contracts.spec.ts` (flip `test.fail` only) · `W8-witness/**`.

Locks: serial a → b → c → d → dc → e → i (shared modify paths: `eslint.config.js` b/e; `demo/shell/dock/**` c/d/dc; `ColorInput.vue` b/d). Never edit `demo/styles/foundation.css`, the `watercolor-dot` sites, the `--slider-track-bg` CSS sites, `.github/**`, `src/**`, `tsconfig.demo.json`, `scripts/dev/dev.sh`. A GREEN-BEFORE gate is recorded closed with the measurement, and nothing is cut for it.

## Unit receipts


### X.W8.a

Seat `claude-opus-5-5`, 2026-10-17. Spec sections read: W8.md whole (534 lines); record header → Unit
plan; COHESION §0j `:1217` + later addenda located by grep (no ruling past §0bd/§0de touches `.a`).

**Acts, in order**
1. Crash-recovery ⟨`git status --porcelain -- docs/tranches/X/waves/W8-census.md docs/tranches/X/execution/A/X-W8.md`⟩
   → empty. No inherited edits.
2. Product-byte identity of the two SHAs: ⟨`git diff --stat d17dece5a f79a79e14 -- demo src package.json`⟩ → empty;
   ⟨`git status --porcelain -- demo src`⟩ → only `?? demo/app/.vite-critic-9216/` (0 census hits; untouched).
3. The four G-1 commands run VERBATIM at `f79a79e14`, twice (separate invocations): **0 / 96 / 53 / 0** both runs.
   Filter ⟨`… | grep -vc "@mkbabb/glass-ui/"`⟩ → **0** local-barrel statements (all 96 are producer subpaths).
4. Enumerated: the 53 files (per-file counts; groups palettes 20 · workbenches 8 · shell 7 · shared 6 ·
   picker 5 · scenes 5 · app 1 · test 1); the 96 by subpath (sum 96); the **11** `debounce` importers;
   the **9** root-barrel `useClipboard`/`writeClipboard` statements (`./dom` exports both at 10.1.0,
   `dist/dom.js:238`); the 7 root-only statements (Accordion/Alert/Skeleton — no subpath in the 68-key map).
5. Moved paths verified at bytes: admin → `demo/palettes/admin/**` (15 files); `PointerDebugOverlay.vue` →
   `demo/picker/debug/`; `ActionToolbar.vue` deleted `c00004924` (121 lines); `demo/ui/**` deleted `2ae7344d2`;
   `usePalettePorts.ts` unmoved.
6. tw-animate-css retention receipt: glass `dist/styles/utilities/btn.css` `sheet-animate` `@apply`s
   `animate-in/out`, `fade-in/out`; glass peerDependency `tw-animate-css ^1.2.5`; demo authors 0 such classes.
7. 90/48 and 107/49 marked **UNREPRODUCED** (no recorded command, L-9); 92/48 @ `41450f02` superseded by the bytes.
8. Wrote `docs/tranches/X/waves/W8-census.md` (243 lines, line 1 SERVED MODEL) in four appends; `git diff --check` clean.

**Commit** — `17090b54a` docs(x-w8): the C-16 residue census — recorded commands, 0/96/53/0 at f79a79e14
(§Commit Plan 1; body names both superseded figures UNREPRODUCED). Subject reads 0/96/53/0, not the
plan's 19/92/48/0 placeholder, because `<SHA>`'s numbers are the measured ones.

**Gate** — G-1: RED (artifact absent) → **GREEN** (⟨`ls docs/tranches/X/waves/W8-census.md`⟩ present; four
commands verbatim + outputs + SHA; file list enumerated; 90/48 + 107/49 UNREPRODUCED). Falsifier: re-run at
`f79a79e14` → any number ≠ 0/96/53/0.

**Bounds binding for later units (census-bound, input to `.b`)** — the spec's "48 consumer files" row is
empty at the bytes (0 local-barrel imports); `.b`'s narrowness set = the 9 clipboard statements; the
debounce set = 11 files; Button/Skeleton consumers live at `demo/palettes/admin/{UserSortMenu.vue,panels/PaginationBar.vue,panels/AdminListSkeleton.vue}`.
§Triumvirate bounds-expansion trigger NOT tripped (53 ≤ 55, all under `demo/**`, no impure barrel).

**Residuals** — none for `.a`. **Escalations** — none. **Adjacent edits** — none.

### X.W8.b

Seat `claude-opus-5-5`, 2026-10-17. Spec sections read: W8.md whole (534 lines; X.W8.b `:157-168`,
G-2..G-6 + G-9 `:227-306`, §Scope 2-5); this record header → Unit plan + the `.a` receipt; COHESION
§0j onward located by grep (no ruling past §0bd/§0de names `.b`; §0de reads the owner set as glass 10.1.0).

**Acts, in order**
1. Crash-recovery ⟨`git status --porcelain -- <the .b writable set>`⟩ → empty. No inherited edits.
2. Measured at bytes (HEAD `76111e871`): `components.json` present (shadcn-vue CLI config, three stale
   fields); `demo/shared/utils.ts` = `cn` (0 call sites) + `debounce` (11 importers, all `…/shared/utils"`);
   ⟨`grep -rnE "(useClipboard|writeClipboard).*from ['\"]@mkbabb/glass-ui['\"]" demo`⟩ → 9; glass 10.1.0
   `exports["./dom"]` → `dist/dom.d.ts` → `composables/dom/useClipboard.d.ts` declares both symbols; the
   68-key map has no narrower key (⟨`Object.keys(exports).filter(/dom|clip|compos/)`⟩ → `['./dom']`);
   eslint `:251-335` = the two U.W-DEMO objects (G-DEMO-3b over `demo/app/**`+`demo/@/{components,lib}/**`;
   G-DEMO-1/3a/3b over `demo/@/composables/**`), every pattern on the `@components` alias (0 importers);
   no producer dist imports `clsx`/`tailwind-merge` (⟨`grep -rlE "from ?['\"](clsx|tailwind-merge)['\"]"
   node_modules/@mkbabb/{glass-ui,keyframes.js}/dist`⟩ → empty); no other lockfile package depends on them.
3. `git rm components.json demo/shared/utils.ts`; `demo/shared/debounce.ts` = utils.ts lines 7-end
   VERBATIM (doc comment + function; git records it R088 from utils.ts); 11 importers re-pointed
   `shared/utils"` → `shared/debounce"` (⟨`grep -rn 'shared/utils' demo src test e2e | wc -l`⟩ → 0).
4. The 9 clipboard statements re-pointed to `@mkbabb/glass-ui/dom` (GradientEasingEditor ·
   GradientVisualizer · MixResultDisplay · MixPane · GenerateControls · ConfigSliderPane · ColorInput ·
   PaletteInspector · useSwatchActions). Root-barrel residue ⟨`grep -rnE "from ['\"]@mkbabb/glass-ui['\"]" demo`⟩
   → 7, all root-only at 10.1.0: Accordion* (GradientEasingEditor) · Alert* + Skeleton (Markdown.vue ×2) ·
   Skeleton (PaletteCardSkeleton · AdminListSkeleton · AdminTagsPanel · VersionHistoryDrawer).
5. `eslint.config.js`: the two dead objects replaced by ONE `files: ["demo/**/*.ts","demo/**/*.vue"]`
   `no-restricted-imports` ban — groups `**/ui/<family>` for all 19 deleted families (segment-exact, so
   `@mkbabb/glass-ui/<x>` and `demo/shared/ui/*` pass). `docs/**` ignore kept (`:42`, already wider than
   `docs/tranches/**`). ⟨`grep -c 'demo/@' eslint.config.js`⟩ → 0; ⟨`grep -c '@components' eslint.config.js`⟩ → 0.
6. ⟨`guarded --light -- npm uninstall clsx tailwind-merge`⟩ → package.json −2, lockfile −23;
   ⟨`grep -c '"clsx"\|"tailwind-merge"\|node_modules/clsx"\|node_modules/tailwind-merge"' package.json package-lock.json`⟩ → 0 / 0;
   ⟨`grep -c tw-animate-css package.json`⟩ → 1 (retained).
7. G-6 falsifier (committed `docs/tranches/X/waves/W8-witness/G-6-lint-falsifier.txt`, 31 lines): prepended
   `import { Button } from "../ui/button";` to `demo/shared/debounce.ts` → ⟨`npm run lint`⟩ **exit 1**,
   `'../ui/button' import is restricted from being used by a pattern. G-6 (X.W8.b): …  no-restricted-imports`;
   file restored from a scratch copy (⟨`git diff --stat -- demo/shared/debounce.ts`⟩ → empty) → lint **exit 0**.
8. Gates (all via `~/.claude/guard/guarded`): ⟨`npm run typecheck`⟩ exit 0 · ⟨`npm run lint`⟩ exit 0 ×2 ·
   ⟨`npx eslint demo src api e2e test --max-warnings=0`⟩ exit 0 · ⟨`npm run test -- --maxWorkers=2`⟩ ×2:
   run 1 `9 failed | 1225 passed (1234)`, run 2 `7 failed | 1227 passed (1234)`. The 7 stable failures are
   none of this unit's: `spectrum-luma` C-5 + `reka-binding-idiom` NG-6 (baseline RED, owned by `.i`) and
   5 in `test/ink.test.ts` (D6 ×2, T-35 ×3) whose whole import graph (`demo/color-session/ink.ts` + the
   `@mkbabb/value.js/{color,css}` self-alias → `src/**`) is byte-identical to HEAD (⟨`git diff --stat HEAD --
   test/ink.test.ts demo/color-session/ink.ts src`⟩ → empty) — PRE-EXISTING at `76111e871`. Run 1's two extra
   (`plate-mass` G20 · N-17) pass in isolation and in run 2 → machine-load flake.

**Commit** — `62bc3fbde` refactor(demo/ui): delete the 19 shadcn barrels; consumers import their real
glass-ui owner (§Commit Plan 2; 26 paths; body carries deletion + dependency + config surfaces and the
tw-animate-css retention receipt).

**Gates BEFORE → AFTER**
| gate | BEFORE | AFTER |
|---|---|---|
| G-2 | GREEN-BEFORE-CURE (0 barrels, `demo/ui` absent since `2ae7344d2`) | **GREEN** — ⟨`find demo/ui -name index.ts \| wc -l`⟩ 0; no `index.ts` in the diff; nothing cut |
| G-3 | RED (9 non-narrowest clipboard imports) | **GREEN** — local-barrel 0 (verbatim grep 96 = all producer subpaths); clipboard root imports 0; typecheck 0; 7 root-only statements recorded (no subpath at 10.1.0) |
| G-4 | RED (components.json; `demo/@` 8; clsx+tw-merge 2/2) | **GREEN** — components.json absent; `demo/@` 0; clsx/tailwind-merge 0/0; tw-animate-css 1 + receipt (glass `btn.css` `sheet-animate` @applies `animate-in/out`/`fade-in`, ⟨`grep -c`⟩ 1 line; glass peer `tw-animate-css ^1.2.5`) |
| G-5 | RED (utils.ts present) | **GREEN (own clauses)** — `cn(` 0; utils.ts absent; 11/11 importers → `shared/debounce` (⟨`grep -rln 'shared/debounce"' demo \| wc -l`⟩ 11). `npm run test` exit 1 on the 7 pre-existing failures above |
| G-6 | RED (ban clause) | **GREEN** — lint exit 0; docs ignored; ban on 19 paths; falsifier exit 1 naming the ban |
| G-9 | GREEN-BEFORE-CURE (`variant=`/`surface=` 0) | **GREEN** — ⟨`grep -cE 'variant=' PaginationBar.vue UserSortMenu.vue`⟩ 0 0; ⟨`grep -cE 'surface=\|variant=' AdminListSkeleton.vue`⟩ 0; no attribute to delete → no paint delta possible; null-DELTA pair not taken (nothing cut) |

**Residuals** — (r1) `test/ink.test.ts` 5 RED pre-existing at `76111e871`, outside this unit's bounds and
concern; for the wave close / its owner (`demo/color-session/ink.ts` last touched `abfeb8a39` V16). (r2) C-5 ·
NG-6 stay `.i`'s. (r3) the 7 root-only glass statements ride the BK relay "alert-skeleton-subpaths".
**Escalations** — none. **Adjacent edits** — none. **Inherited paths** — none.

### X.W8.c

Seat `claude-opus-5-5`, 2026-10-17. Spec sections read: W8.md whole (534 lines; X.W8.c `:170-180`,
G-7 `:308-327`); this record header → Unit plan + the `.b` receipt; COHESION §0j onward located by grep
(⟨`grep -n 'W8\.c' COHESION.md`⟩ → only §0fc `X.P.W8.cust`, another track; no ruling names this unit).

**Acts, in order**
1. Crash-recovery ⟨`git status --porcelain -- demo/shell/dock demo/scenes/about/markdown docs/tranches/X/waves/W8-witness <this record>`⟩
   → empty. No inherited edits.
2. Anchors at bytes (HEAD `d68a010c4`): `Dock.vue:4` `import { GlassDock, DockLayerGroup, DockLayer } from "./";`
   + `:5` the same subpath for `DockControl, DockSeparator`; `dock/index.ts` re-exports the three glass
   symbols + `Dock` — ⟨`grep -rnE "from ['\"][^'\"]*dock/?['\"]" demo test e2e`⟩ (glass excluded) → sole
   importer `demo/app/App.vue:206 { Dock }`. `Markdown.vue:40` `import type { DocModule } from "./";`;
   `markdown/index.ts` holds `DocModule`/`DocItem`; other consumers ⟨`grep -rn 'DocModule\|DocItem' demo test e2e`⟩ → 0
   (`AboutPane.vue:118` takes `{ Markdown }` only). Anchors match the spec's INTENT (line numbers drifted).
3. BEFORE oracle ⟨`guarded --light -- node docs/tranches/V/megatranche/workflows/graph-v3.mjs --print-sccs`⟩ ×2 →
   exit 0 / exit 0, sha256/16 `2528e824d3f07f88` both; file-level lines: `[load] Markdown` · `[load] Dock` ·
   `[runtime] Dock` (3). Banked `W8-witness/G-7-graph-before.txt` (55 lines).
4. Cure. Dock: `Dock.vue` imports `GlassDock, DockLayerGroup, DockLayer, DockControl, DockSeparator` from
   `@mkbabb/glass-ui/dock` in ONE statement (merged with `:5`; prettier-wrapped); `dock/index.ts` = the one
   line `export { default as Dock } from "./Dock.vue";`. Markdown: new leaf `markdown/types.ts` (the two
   declarations, bytes verbatim); `index.ts` = `export { default as Markdown }` + `export type { DocModule,
   DocItem } from "./types";`; `Markdown.vue:40` → `from "./types"`. Gradient trio + Admin/provider: 0 at
   baseline (X-W6.c leaf; admin tree moved) → recorded closed, nothing cut. No forwarding directory, no new
   module beyond the spec's named types module.
5. AFTER oracle ×2 → exit 0 / exit 0, sha256/16 `27d38866c7fae674` both; file-level lines **0**
   (classes per `graph-v3.mjs:461-472`: `[runtime]` = RUNTIME_KINDS, `[load]` = + type/dynamic edges).
   Banked `W8-witness/G-7-graph-after.txt` (46 lines). Re-measured at the committed bytes → `27d38866c7fae674`.
6. Falsifier: reinserted `import { GlassDock, DockLayerGroup, DockLayer } from "./";` after `Dock.vue:3`
   (scratch copy kept) → oracle prints `[load] size=2 Dock` + `[runtime] size=2 Dock` (RED, both classes);
   restored from the copy (⟨`git diff --stat`⟩ shows only the cure) → digest `27d38866c7fae674`, 0 lines.
   Banked `W8-witness/G-7-graph-falsifier.txt` (16 lines).
7. Gates (guarded): ⟨`npm run typecheck`⟩ exit 0 · ⟨`npx eslint demo src api e2e test --max-warnings=0`⟩ exit 0 ·
   ⟨`npm run lint`⟩ exit 0 · ⟨`git diff --check`⟩ clean · ⟨`npm run test -- --maxWorkers=2`⟩ run 1
   `7 failed | 1227 passed (1234)` — the SAME 7 the `.b` receipt books pre-existing (ink.test.ts D6 ×2 + T-35 ×3;
   C-5; NG-6), none in this unit's import graph.
   Run 2 identical: `7 failed | 1227 passed (1234)`, same 7 names.

**Commit** — `9b92f36c9` refactor(demo/graph): close the four measured SCCs by ownership, not forwarding
(§Commit Plan 3; 8 paths: the 5 product files + the 3 `W8-witness/G-7-*` transcripts; body required, carried).

**Gates BEFORE → AFTER**
| gate | BEFORE | AFTER |
|---|---|---|
| G-7 | RED — 2 of 4 clusters: `[runtime]`+`[load]` Dock, `[load]` Markdown (3 file-level lines, ×2 identical); gradient + Admin/provider GREEN-BEFORE-CURE (0) | **GREEN** — 0 `[runtime]`, 0 `[load]` (×2 identical + at commit); each former cluster has one owner (Dock symbols → `@mkbabb/glass-ui/dock`; Markdown types → leaf `types.ts`); no forwarding directory; falsifier RED-then-restored, banked |

**Residuals** — (r1) the oracle's `[ownership.pair] CPE L-24 · palettes ↔ shell owner=X-W8` and the 9-dir
`[ownership]` lattice are DIRECTORY-granularity rows, not module SCCs; G-7's clauses read file-level classes
(as the baseline records) and no file in this unit's set carries those edges — named for the wave close, not cut
here. (r2) the 7 pre-existing vitest REDs per the `.b` receipt (r1/r2). (r3) the oracle exits 0 whether or not
components exist — RED is read from the printed `[runtime]`/`[load]` lines, as the falsifier transcript states.
**Escalations** — none. **Adjacent edits** — none. **Inherited paths** — none.

### X.W8.d

Seat `claude-opus-5-5`, 2026-10-17. Spec sections read: W8.md whole (534 lines; X.W8.d `:182-195`, G-8 and
G-10..G-13 `:328-406`, addenda §0ba/§0bb); this record header → Unit plan + the `.c` receipt; COHESION
⟨`grep -n 'W5-READY-DEAD\|BTN-INTERACTIVE\|X.W8.d' COHESION.md`⟩ → `:2951` (§0ba: both ids routed to `.d`),
`:2960` (`W5-READY-DEAD` discharged at `16852e03`; `.d` confirms and strikes).

**Acts, in order**
1. Crash-recovery ⟨`git status --porcelain -- demo/picker demo/shell/dock demo/test/shell demo/color-session
   demo/palettes/browser/card docs/tranches/X/waves/W8-witness <this record>`⟩ → empty. No inherited edits.
2. **G-8.** ⟨`grep -nE 'useLayerTransition|SUB_LAYER' ActionBarLayer.vue`⟩ → 1 (`:99`, a comment naming the
   retired composable); code already gone, `<DockCrossfade` ×3 (1 tag + 2 comments). Comment reworded to
   "the local layer-transition shim" — count 0. Motion arm (Dock.md G-B): bounded chromium probe
   `W8-witness/probe-g8-g13.mjs` (1 browser, 1 context per scheme, closed in `finally`), guarded, against
   `npx vite --port 9248` (lane-local port — :9000 is the shared dev port; same tree, same dev build; server
   stopped after). ×3 AFTER runs, both schemes: at the first rAF ≥ 60 ms (65–89 ms) BOTH faces carry a
   `[data-crossfading]` ancestor, opacities intermediate (e.g. light is-leaving 0.625 / is-active 0.375);
   14–17 moving frames over a ~30→270 ms window; **snap frames inside motion 0**. Clause reading recorded
   in the witness: the rest frame before the click and the settled frames after are endpoints, a snap is an
   extreme frame INSIDE the motion window. Falsifier (`:active="activeSubLayer"` → `active="actions"`,
   scratch, byte copy restored, `cmp` identical) → no `[data-crossfading]`, 0 moving frames (RED).
   Banked `W8-witness/G-8-G-13-probe.txt`.
3. **G-10.** `ColorComponentDisplay.vue:87` `update: [value, component]` deleted; parent counterpart
   `ColorPicker.vue:63` `@update="(v, c) => updateColorComponentDebounced(v, c)"` deleted (the lock's named
   case — ColorPicker binds @update; the debounced updater keeps 2 live callers `:231`, `:418`).
   `ActionBarLayer.vue:48` `colorInputRef` (2 hits: declaration + template `ref`, never read in script)
   deleted with `:241 ref="colorInputRef"`. Already absent at baseline (recorded, nothing cut):
   `canProposeName` prop + `:can-propose-name` binding and `clearHover`/`defineExpose` (ActionToolbar.vue
   deleted `c00004924`; the 12 surviving `canProposeName` hits are the live input-arm field, `keys.ts:109,258`),
   `actionToolbarRef` 0, `GradientPane.vue` inject (X-W6.a; 1 hit, its comment).
4. **G-11.** `PointerDebugOverlay.vue`: `ok = document.execCommand("copy")` gates `flashCopied()`; the
   append/select/exec/remove is `try { … } finally { removeChild }`; the two `setTimeout` arms share ONE
   handle `copiedReset` (cleared on re-copy and in `onScopeDispose`); `type="button"` on the 3 action buttons.
   `aria-controls` 0 at baseline (clause discharged). Falsifier suite `W8-witness/G-11/pointer-debug-copy.test.ts`
   (+ harness `vitest.config.ts` beside it, include REPLACED to the witness dir) mounts the real SFC:
   ⟨`npx vitest run --config docs/tranches/X/waves/W8-witness/G-11/vitest.config.ts`⟩ at HEAD bytes
   (`git show HEAD:<file>`, restored, `cmp` identical) → **4 failed (4)**; at the cure → **4 passed (4)**.
   Banked `W8-witness/G-11-falsifier.txt`.
5. **G-12.** `useDockAdminMode.ts:36` already a `computed` (UIA-V-59) — clause 1 GREEN-BEFORE, no byte cut.
   New `demo/test/shell/dock-admin-mode.test.ts`: the real `useViewManager` over a vue-router memory history
   (same path stack + `back()` listener path as the app's hash routes, without jsdom's async traversal —
   the first web-hash draft read `/atmosphere` after `back()`, measured, replaced): anonymous `/` →
   `/atmosphere` → `back()` → `isAdminMode` false at every step; the authed arm vitest-stubbed (labelled
   UNVERIFIABLE-HERE per the spec). → 2 passed. Falsifier: the stored latch (ref seeded from the view + a
   one-way watch) reintroduced in scratch → **2 failed** (`expected true to be false`); restored, `git diff`
   empty → 2 passed. Banked `W8-witness/G-12-latch-falsifier.txt`.
6. **G-13.** `ink.ts`: `"chrome"` deleted from `InkSurface` and `RUNG_STEP` (the static rung); new
   `resolvePaintedLightness(ambientL, tint: SurfaceTint)` — the measured-only referent, tint REQUIRED.
   `useContrastSafeColor.ts`: the `chrome` branch of `resolveLiveTint` deleted; `paintedColor(el)` factored
   from the veil walk; `resolveDockPlateTint(from): SurfaceTint` (non-optional) climbs from the consumer's
   element and at each ancestor reads its own paint or its `:scope > .dock-plate` layer's (glass paints the
   band on that child, `position:absolute; inset:0; z-index:-1`, never on `.glass-dock`) — unmeasurable
   throws; `useChromeAccentFn(host)` certifies against it (cached per host × scheme × probe epoch; before
   `host` mounts it makes no ink claim). `ProfileSection.vue:33` → `useChromeAccentFn(sectionRoot)` on its own
   root. Browser readings (×3, both schemes): `.dock-plate` `color(srgb 0.204 0.148 0.083 / 0.1)` light,
   `/ 0.14` dark; `.glass-dock` `rgba(0,0,0,0)`; Login trigger inline ink `oklch(0.3046 0.1218 9.83)` /
   `oklch(0.9583 0.0211 9.83)` — defined (the spec's α 0.5392/0.5776 were glass-7 cells; 10.1.0's veil reads
   0.10/0.14). Compile falsifier (`useSafeAccentFn("chrome")`, `resolveSurfaceLightness("chrome", …)`,
   `resolvePaintedLightness(0.5, undefined)` in scratch) → 3 × TS2345, exit 2 (`W8-witness/G-13-compile-falsifier.txt`).
   Runtime falsifier (walk re-pointed at the unpainted `.glass-dock` only) → `useChromeAccentFn: no painted
   dock band above the host element` thrown, trigger ink absent (RED; in `G-8-G-13-probe.txt`).
7. **W5-BTN-INTERACTIVE-DEAD.** ⟨`grep -rc btn-interactive node_modules/@mkbabb/glass-ui/dist`⟩ → 0 files;
   demo CSS 0 rules (the atom left glass at `490cc46e3`, "land the Glass 7 … public-surface cut"). Class deleted
   at `ColorInput.vue:71,81` and `CurrentPaletteEditor.vue:85,88,114`, with the three comments that claimed it.
   ⟨`grep -rEn 'class="[^"]*btn-interactive' demo`⟩ → 0. Motion question rides O-52 R-2 (§0ba).
8. **W5-READY-DEAD — confirmed and STRUCK.** ⟨`git show --stat 16852e03`⟩ → `demo/shell/useViewManager.ts`
   −9 ("drop useViewManager's dead `ready` ref"); ⟨`grep -cw ready demo/shell/useViewManager.ts`⟩ → 0. No byte.
9. Gates (guarded): ⟨`npm run typecheck`⟩ exit 0 · ⟨`npx eslint demo src api e2e test --max-warnings=0`⟩ exit 0 ·
   ⟨`npm run lint`⟩ exit 0 · ⟨`git diff --check`⟩ clean (+ new files: 0 trailing-space lines) ·
   ⟨`npm run test -- --maxWorkers=2`⟩ ×2 → `7 failed | 1229 passed (1236)` both, the SAME 7 the `.b`/`.c`
   receipts book (ink.test.ts D6 ×2 + T-35 ×3; C-5; NG-6); +2 = the new G-12 suite. ⟨`VJS_E2E_PORT=9249 guarded
   --timeout 44 -- npx playwright test --project=smoke --workers=1`⟩ (21.9 min) → **283 passed / 14 failed /
   2 skipped**; the 14 by name ⊂ the X-W12U `.q2` banked `cl1` 16 (`W12U-evidence/q2/logs/cl1-smoke.log.txt`;
   ⟨`comm -13` over both failure lists with `:line:col` stripped (o18 drifted +1 line)⟩ → **0 new**; `comm -23`
   → o18 admin-pill (dark) and o22 captions, passing now). None in this unit's
   graph except o18's file, whose profile-trigger chrome row PASSED.

**Commit** — `15932a93a` refactor(demo/dock,picker): retire the layer-transition shim and the dead
surface/state/ink (§Commit Plan 4; 18 paths: 9 product, 1 adjacent test, 1 new test, 7 witness; body names
each deleted site and its parent counterpart).

**Gates BEFORE → AFTER** (AFTER re-read at the committed bytes)
| gate | BEFORE | AFTER |
|---|---|---|
| G-8 | RED (count 1, prose; motion arm unbanked) | **GREEN** — count 0, `<DockCrossfade` ≥ 1; motion arm ×3 both schemes: `[data-crossfading]` on both faces at +60 ms, snap 0; falsifier RED |
| G-10 | RED — `update` emit + `@update` binding; `colorInputRef` unread | **GREEN** — emit 0, `@update=` on CCD 0, `colorInputRef` 0; canProposeName-prop / clearHover / actionToolbarRef / GradientPane inject 0 (GREEN-BEFORE) |
| G-11 | RED — 5 of 6 (aria-controls discharged) | **GREEN** — execCommand checked, try/finally, handle cleared in `onScopeDispose`, `type="button"` ×3; falsifier 4/4 RED at HEAD, 4/4 GREEN cured |
| G-12 | RED (test clause; latch already derived) | **GREEN** — `ref(` 0 in the composable; back-navigation suite 2/2; falsifier 2/2 RED |
| G-13 | RED — `chrome` in `InkSurface` + `RUNG_STEP`, `SurfaceTint \| undefined` | **GREEN** — `chrome` 0 in ink.ts; fallback call sites = 3 × TS2345; live band tint defined (α 0.10 / 0.14), Login ink defined; unpainted re-point RED |
| W5-BTN-INTERACTIVE-DEAD | RED — 5 class sites | **GREEN** — 0 class sites; 0 rules in glass dist / demo CSS |
| W5-READY-DEAD | discharged `16852e03` | **STRUCK** — confirmed: `ready` 0 in `demo/shell/useViewManager.ts` |

**Residuals** — (r1) the 7 pre-existing vitest REDs (`.b` r1/r2) and the 14 pre-existing smoke REDs (all in
the X-W12U banked 16), neither in this unit's bounds. (r2) G-8 tail: after the motion settles (~270 ms) the
leaving face keeps `is-leaving` at opacity 0 under `[data-crossfading]` until ~550 ms — the producer's settle
window, glass-owned, not a snap; named for the close, no relay opened (no defect measured). (r3) G-13's
eventual RETIREMENT against glass's `--glass-tint-source/strength` stays BLOCKED-ON TR#47 (CC-107), untouched.
(r4) `useChromeAccentFn` makes no ink claim before its host mounts (one pre-mount render inherits the trigger's
default ink; the template-ref write re-drives before paint).
**Escalations** — none.
**Adjacent edits** (COHESION §0bt) — `test/ink-real-composite.test.ts:109` (the rung table named the deleted
`chrome: -1`; now asserts the published `--glass-veil-dock` recipe k = −1 instead) and `:161`/`:197-199` (the
sweep's `"chrome"` surface now resolves through `resolvePaintedLightness` with the published band fixture
`dockBand(dark)`); same concern (the oracle asserting the rung this unit deletes), no assertion removed,
16/16 pass. `demo/picker/ColorPicker.vue:63` is the lock's named parent counterpart (in the writable set).
**Inherited paths** — none.

### X.W8.dc

Seat `claude-opus-5-5`, 2026-10-17. Spec sections: COHESION §0k.3 **S-1** (`:1494`) · W5.md **A3** `:247` / **C2** `:269` · W8.md ADDENDUM 2026-09-23 third (§0bc `DOCK-SCROLL-MORPH`). Opens after `.d` (`2d3ac4fd0`).

**Acts, in order**
1. Crash-recovery ⟨`git status --porcelain -- docs/tranches/X/waves/W8.md demo/shell docs/tranches/X/waves/W8-witness docs/tranches/X/execution/A/X-W8.md demo/test/shell`⟩ → empty. **Inherited paths — none.**
2. First docs act (S-1): dated E-3 ADDENDUM 2026-10-17 (fifth) appended to `W8.md` — mechanism, files, gates A3 · C2 · REG, `DOCK-SCROLL-MORPH`. Commit `0f2d34e61`.
3. Anchors measured at true bytes (INTENT recorded): S-1's rationale anchor `usePaneRouter.ts:206-212` "`paneRefs.*.value?.…` optional chaining" is DRIFTED — ⟨`grep -n 'paneRefs' demo/shell/usePaneRouter.ts`⟩ → 0; X-W4 already replaced the refs with the typed target registry (`useSceneTargets.ts`, `readScenePaneTarget`). What S-1's registry still had to retire at HEAD: the command set reached the dock as a hand-carried optional prop (`App.vue:65 :scene-actions` → `Dock.vue:31 sceneActions?: SceneActionSet | null`), i.e. no provide/inject registry existed (`DockCommand` 0 sites; `usePaneRouter.ts:392`, `useSceneTargets.ts:164` comments named it X-W8's). The command path carries no breakpoint predicate (one `Dock.vue` renders at every width since X-W5.c); `bindPane` already narrowed to the three S-1 members (`PANE_INSTANCE_MEMBERS`).
4. Registry cure: `useSceneActions.ts` exports `DOCK_COMMAND_KEY: InjectionKey<ComputedRef<SceneActionSet | null>>` and `injectDockCommands()` (throws when unprovided — a wiring defect fails loud, never a quietly empty seat), and `provide`s the ONE built set where it is built; `usePaneRouter` stops returning `sceneActions` (calls the builder for its provide); `Dock.vue` drops the `sceneActions` prop and injects; `useSceneTargets.ts` / `usePaneRouter.ts` doc comments restated to the landed registry. `bindPane` untouched (still `applyExternalColor`/`commitEdit`/`cancelEdit`); no instance-ref command dispatch introduced.
5. REG test `demo/test/shell/dock-command-registry.test.ts`: a shell host calls `useSceneActions` at `/generate` with a counting `regenerate`; a `desktop` and a `mobile` seat inject; both hold the very provided computed (`toBe`) and both presses drive the same handler (1 → 2). Falsifier ⟨provide line commented out; `npx vitest run demo/test/shell/dock-command-registry.test.ts --maxWorkers=2` (guarded --light)⟩ → `1 failed | 1 passed`, `Error: DOCK_COMMAND_KEY is not provided…`; file restored byte-identical (cp from backup) — `W8-witness/dc-registry-falsifier.txt`.
6. `DOCK-SCROLL-MORPH` (read-only): ⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `10.1.0`; ⟨`grep -n -iE 'scroll|progress|rim|compact'` over `dist/components/dock/{composables/useDockShellProps,index,GlassDock.vue}.d.ts` `| wc -l`⟩ → `0`; ⟨`grep -rn collapseOnScroll dist --include='*.d.ts'`⟩ → only `useDockSearch.d.ts` (the search seam's opt-in shrink+fade over `useScrollChrome`) + `useScrollChrome.d.ts` — not a compact-on-scroll dock; ⟨`grep -n -iE 'radius|clip|dock' dist/components/scroll-progress-rim/*.d.ts | wc -l`⟩ → `0` (rim standalone, not radius-clipped to the dock); glass ⟨`grep -n N-7a ../glass-ui/docs/tranches/BL/LEDGER.md`⟩ → `:292 | N-7a | … | OPEN | BUILD | W-0.8 | … compact-on-scroll and the rim as an opt-in plate seat`. ⇒ **honest-RED by id, O-55**; no consumer copy written — `W8-witness/dc-dock-scroll-morph.txt`.
7. A3 / C2 probe: dev server ⟨`guarded --light --timeout 90 -- npx vite --port 9000 --strictPort`⟩ (HTTP 200) then ⟨`guarded --timeout 5 -- node docs/tranches/V/megatranche/audit/probes/app-wave/app-shell-truth-probe.mjs`⟩ (UNMODIFIED) → `[guarded] waiting for headroom (kernel zone data.kalloc.1024 at 13.2M (panics near 20.8M): reboot the Mac)`; ⟨`tail -1 ~/.claude/guard/log/zone.log`⟩ → `inuse=13325429`. Machine law (kernel zone watchdog): heavy runs refused ≥ 13M — heavy work stops, the owner reboots. The queued probe was stopped before admission (0 browsers launched); the dev server stopped; :9000 free. **A3 and C2 are UNMEASURED at both the before and the after bytes** — `W8-witness/dc-A3-C2-unmeasured.txt`.
8. Gates (guarded --light): ⟨`npm run typecheck`⟩ exit 0 · ⟨`npx eslint demo src api e2e test --max-warnings=0`⟩ exit 0 · ⟨`git diff --check`⟩ clean · ⟨`npx vitest run demo/test/shell --maxWorkers=2`⟩ → `1 failed | 33 passed (34)`, the 1 = NG-6 (`reka-binding-idiom`, pre-existing, `.i`'s) · REG ⟨`npx vitest run demo/test/shell/dock-command-registry.test.ts`⟩ ×2 at the committed bytes → `2 passed (2)` both · ⟨`grep -rn 'scene-actions=\|sceneActions' demo/app/App.vue demo/shell/dock | wc -l`⟩ → 0. Full `npm run test` / `test:e2e` NOT run (heavy; zone-refused).

**Commits** — `0f2d34e61` docs(x-w8): addendum (S-1 → X.W8.dc) · `639892d53` refactor(demo/shell,dock): the DockCommand provide/inject registry (9 paths: 5 product incl. 1 adjacent, 1 new test, 3 witness).

**Gates BEFORE → AFTER**
| gate | BEFORE | AFTER |
|---|---|---|
| REG (registry, S-1) | RED — `DockCommand` registry 0 sites; set prop-carried App → Dock | **GREEN** — provided once, injected by the dock seat; test 2/2 ×2; falsifier RED |
| A3 dock-action-parity | RED of record `{mobileChanged:false, desktopChanged:true}` (X-W5); not re-read — zone-refused | **UNMEASURED** (zone-refused; re-run the probe unmodified after reboot) |
| C2 mobile liveness | RED of record `specimenChanged:false`; not re-read | **UNMEASURED** (same) |
| DOCK-SCROLL-MORPH | honest-RED by id (baseline) | **honest-RED by id, O-55** (glass 10.1.0 ships none; BL N-7a OPEN at W-0.8) |

**Residuals** — (r1) A3/C2 owe one guarded run of the unmodified probe after the owner's reboot (`mobileRegen390.dockChanged` and `desktopRegen1440.dockChanged` both `true`); statically every region reports through the one mount path (X.W5.a `bindPane` at `App.vue:152`), so the generate target registers at 390 and the injected set's `generate.regenerate` is `ready` there — a prediction, not a reading. (r2) `Dock.vue` `onStartSlugEdit`/`onCopySlug` still call `slugEditRef.value?.…` — a dock-internal layer handle, not a scene command and not S-1's registry; named for the close, not cut here. (r3) The full vitest / e2e suites are owed at close (zone-refused).
**Escalations** — the kernel-zone block (owner act: reboot) gates A3/C2's measurement; no spec escalation.
**Adjacent edits** (§0bt) — `demo/app/App.vue:65` (the deleted `sceneActions` prop's parent binding `:scene-actions`) and `:347` (the router destructure no longer carries `sceneActions`); same concern, no assertion removed.
**Inherited paths** — none.
