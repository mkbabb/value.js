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

### X.W8.e

Seat `claude-opus-5-5`, 2026-10-17. Spec sections: W8.md X.W8.e `:197-206` · G-14 `:408-425`. Opens after `.dc` (`62fdd2b3b`). COHESION §0j → file end grepped for DR-17 / DR-18 / CC-082 / CC-090 / `max-lines` / LoC: no later ruling overrides the spec; W9.md `:150` names this unit's carve as "`.e` wires the CC-082 `max-lines` ratchet" and `:156` its region (disjoint from X-W4's / X-W9's objects).

**Ruling — (ii) WIRED.** Rationale: (i) deletion leaves "no god modules" with no number and no check — canon would stop asserting an unmeasured figure but nothing would hold the line; (ii) makes the canon sentence and the tool say the same thing, can only descend, and is GREEN at HEAD by construction (G-14 scope guard: the breaches' cures are X-W5/X-W6's and X-W9's, not this wave's). Exactly one: the sentence is restated, not deleted.

**Acts, in order**
1. Crash-recovery ⟨`git status --porcelain -- docs/tranches/V/ARCHITECTURE.md eslint.config.js docs/tranches/X/waves/W8-witness docs/tranches/X/execution/A/X-W8.md`⟩ → empty. **Inherited paths — none.**
2. Anchors at true bytes: ⟨`grep -n '400' docs/tranches/V/ARCHITECTURE.md`⟩ → `:944` only (anchor holds, the sentence spans `:943-945`); ⟨`grep -c max-lines eslint.config.js`⟩ → 0. Spec's src figures (`stylesheet.ts` 899 …) and api "0 over 350" are DRIFTED — re-measured below (INTENT: pin at the measured worst at true bytes).
3. Band measurement, double-run ⟨`find <band> -type f \( -name '*.ts' -o -name '*.vue' \) -not -path '*/node_modules/*' -not -path '*/dist/*' [| api: grep -v/-E __tests__] | xargs wc -l | sort -rn | head -1`⟩ ×2 identical → demo `1013 GradientStopRail.vue` · src `672 src/transform/path.ts` · api/src modules `357 api/src/modules/palette/service/crud-list.ts` · api/src `__tests__` `539 …/palette-versions.test.ts`. Band choices: src = `src/**/*.ts` (W9.md G16's band; the two BBNF-generated `.js` under `src/css/bbnf/generated/` are emitted, not authored); api split product/tests so the tests' 539 does not loosen the modules' pin (every api test lives under `__tests__/`: ⟨`find api/src -name '*.test.ts' -not -path '*/__tests__/*' | wc -l`⟩ → 0); demo has 0 tracked `.js` (the untracked `.vite-critic-9216/` cache is `.js`, outside the band glob).
4. Count parity: ⟨`npx eslint <the four worst files> --rule 'max-lines: [error, 356]'`⟩ → `File has too many lines (539|357|1013|672)` = `wc -l` exactly; ⟨GradientStopRail at max 1012 / 1013⟩ → exit 1 / 0.
5. Wired: four `max-lines` objects in `eslint.config.js` (inserted before the X-W4 D2 object, which must stay last for its own rule) — demo `{ts,vue}` 1013 · `src/**/*.ts` 672 · `api/src/**/*.ts` ignoring `**/__tests__/**` 357 · `api/src/**/__tests__/**/*.ts` 539.
6. Restated `ARCHITECTURE.md` §Colocation idiom (`:943-947`; diff hunk `@@ -943,3 +943,5 @@` only): the cap is the wired descend-only ratchet with the four pins; the `demo/@/components/ui/` exclusion dropped. ⟨`grep -c '400 LoC' docs/tranches/V/ARCHITECTURE.md`⟩ → 0 · ⟨`grep -c 'demo/@/components/ui' …`⟩ → 0. X-W9's `:657` region untouched.
7. Falsifier: one file one line over each pin (`demo/__w8e_falsifier.ts` 1014 · `src/…` 673 · `api/src/…` 358 · `api/src/__tests__/…` 540) ⟨`npm run lint`⟩ (guarded --light) → 4 `max-lines` errors, exit 1; files removed → exit 0. Transcript `docs/tranches/X/waves/W8-witness/e-max-lines-falsifier.txt`.
8. Gates (guarded --light): ⟨`npm run lint`⟩ ×2 → exit 0 / 0 · ⟨`npm run typecheck`⟩ exit 0 · ⟨`npx eslint demo src api e2e test --max-warnings=0`⟩ exit 0 · ⟨`git diff --check`⟩ clean.

**Commits** — `df5737679` docs(x-w8): rule the demo/src LoC cap — wired (3 paths: `eslint.config.js`, `docs/tranches/V/ARCHITECTURE.md`, the witness).

**Gates BEFORE → AFTER**
| gate | BEFORE | AFTER |
|---|---|---|
| G-14 LoC cap | RED — `:944` asserts ≤ 400 (+ excludes the deleted `demo/@/components/ui/`); `max-lines` 0 | **GREEN** — (ii): sentence restated to the wired ratchet; 4 `max-lines` pins; lint exit 0 ×2; falsifier RED (4 errors) committed |

**Residuals** — the ratchet pins the breaches, it does not cure them: demo 1013 (X-W5/X-W6 owners), src 672 (X-W9 CC-090 split), api modules 357 (> the retired 350 figure; no owner named in this wave — named for the close). Lowering a pin rides the unit that lands the split.
**Escalations** — none.
**Adjacent edits** (§0bt) — none.
**Inherited paths** — none.

### X.W8.i

Seat `claude-opus-5-5`, 2026-10-17. Spec: W8.md ADDENDUM 2026-09-22 (second, §0aq) · ADDENDUM 2026-09-23 (second, §0bb `J4-SHORT-LANDSCAPE-BLOB`) · COHESION `:2692` · §0az `O12-3-HOVER-GPU` · X-W12U routes (C-5/NG-6, 844×390 CLS C10-1). Opens after `.e` (`3ecc1535f`).

**Acts, in order**
1. Crash-recovery ⟨`git status --porcelain -- <the .i writable set>`⟩ → empty. **Inherited paths — none.**
2. Anchors at true bytes ⟨`grep -rEn 'isWide|isLgViewport' demo --include='*.vue' --include='*.ts'`⟩ → 6: `ExtractWorkbench.vue:230,309` · `ConsoleRail.vue:73,123` · `HeroBlob.vue:71,189` (spec's `:226/:118/:71` DRIFTED; INTENT at true bytes).
3. Cure (one layout, no viewport fork): ExtractWorkbench — `layout === 'split' ? 'aside' : 'default'` (the aside spine is sized for the half column, the same measure a phone's stacked column gives); ConsoleRail — `side="left"` declared once, glass Tooltip's `avoidCollisions: !0` (`dist/tooltip-*.js:67`) flips it where left has no seat (t-mobile F-5); HeroBlob — `quality: appBlobConfig.quality` at every width (producer clamps backing DPR ≤ 2, `dist/color.glsl-*.js:4-7`; a uniform `half` would break o12 O-12·5's 0.6 backing floor at 1440). The three `useBreakpoint` imports deleted.
4. ⟨`grep -rEo 'isWide|isLgViewport' demo/ --include='*.vue' --include='*.ts' | wc -l`⟩ → **0**. ⟨`npm run typecheck`⟩ (guarded --light) exit 0 · ⟨`npm run lint`⟩ exit 0 · ⟨`npx eslint <3 files> --max-warnings=0`⟩ exit 0 · ⟨`git diff --check`⟩ clean · targeted vitest over every suite importing the three SFCs (6 files) → `101 passed` ×2 (`W8-witness/i/vitest-targeted.txt`).
5. C-5 measured: ⟨`npx vitest run test/spectrum-luma.test.ts`⟩ → RED, white stroke 45° 1.65 · 60° 1.07 · 120° 1.37 · 180° 1.25 :1. The oracle's `strokeContrast(h,1,1)` selects the stroke by `spectrumFieldIsLight(1,1)` (no hue argument) and the same file's M-12 pin asserts `spectrumFieldIsLight(1,1) === false`. At s=v=1 white fails at [45,60,120,180] and black fails at [240] (`W8-witness/i/c5-ng6-unsatisfiable.txt`) — **no (s,v) predicate, however cured, can pass**; the hue-aware cure needs the oracle to pass hue and the M-12 pin restated = a test/assertion edit outside the writable set. **ESCALATED, not substituted.**
6. NG-6 measured: the failing case mounts glass-ui `Checkbox` with `{checked:true}` and expects `data-state="checked"` (reads `unchecked`) — a property of the READ-ONLY producer, not of any demo binding. ⟨`grep -rn ':checked\|update:checked\|v-model:checked' demo --include='*.vue'`⟩ → **0** (the SearchFilterBar subject site is gone since X.W12U.s2's TagChipSet; `demo/test/palettes/checkbox-contract.test.ts` holds the consumer ledger). No demo edit can flip it. **ESCALATED.**
7. C7 struck with the measurement: ⟨`find demo -name 'DockStatusLamp*' | wc -l`⟩ → 0; ⟨`grep -rn DockStatusLamp demo | wc -l`⟩ → 0; deleted at `8b5b48347` (X-W12U .k2). **C7 STRUCK.**
8. J4 / o29 blob limb: ⟨`git log -3 -- e2e/smoke/oracles/o29-scene-contracts.spec.ts`⟩ → the `test.fail` marker is ALREADY retired at `177301823` (X-W12U .q2: "Expected to fail, but passed" at `5731fe6ce`); the limb gates plain. Nothing to flip; no `shell.css` rule cut ahead of a measurement. Re-measure ⟨`VJS_E2E_PORT=8371 guarded --timeout 15 -- npx playwright test o29 -g "short landscape" --project=smoke --workers=1`⟩ → **guard-refused**: `[guarded] waiting for headroom (kernel zone data.kalloc.1024 at 13.5M (panics near 20.8M): reboot the Mac)`; stopped, no browser started (`zone.log` 08:16:57 inuse=13470925). **UNMEASURED this seat.**
9. O12-3-HOVER-GPU: o12's leg 3 was RESTATED by X-W12U.b under COHESION §0dm ESC-W12d-1 (`o12-blob-seat.spec.ts:46-62`: the hero no longer parks and is `pointer-events-none` with no pointer host, so the 6/255 hover-wake premise is gone; the leg now bounds idle frame cost). The floor this id was registered against no longer exists in the oracle. The real-GPU read is headed-only, and headed browsers are banned by machine law (2026-10-14). **Reading: SUPERSEDED-BY-RULING (§0dm); no hover byte owed.** This is not a GREEN reading.
10. 844×390 CLS (C10-1): the source is the colour-space select chevron (`svg.lucide<control-surface`, in-pane, 0.00001, base 0.00128). Re-reading it needs `reveal-run.sh` over a built `dist/gh-pages` plus a browser, and the guard refuses that at 13.5M. Its source is outside this unit's writable set. **UNMEASURED; the residual carries.**
11. Full ⟨`npx vitest run --maxWorkers=2`⟩ ×2: not runnable as a heavy run under the zone watchdog. The known reds are C-5 + NG-6 (escalated above), so the gate cannot read GREEN regardless.

**Commits** — `82bd72d2f` refactor(demo/picker,extract): delete the three C3 viewport layout forks (5 paths: the 3 SFCs + 2 witness files).

**Gates BEFORE → AFTER**
| gate | BEFORE | AFTER |
|---|---|---|
| G-W8-i1 grep | RED 6 hits / 3 files | **GREEN** 0 |
| G-W8-i1 full vitest ×2 | RED (C-5, NG-6) | **RED**: C-5 + NG-6 escalated; full run guard-refused (zone 13.5M) |
| C-5 | RED | **RED: ESCALATED** (unsatisfiable inside bounds, witnessed) |
| NG-6 | RED | **RED: ESCALATED** (producer property; 0 demo subject sites) |
| J4-SHORT-LANDSCAPE-BLOB | marker retired `177301823` | **UNMEASURED** (guard-refused) |
| O12-3-HOVER-GPU | 1.37/255 of record | **SUPERSEDED** by §0dm restatement (headed read banned) |
| 844×390 CLS | 0.00001 | **UNMEASURED** (guard-refused; carries) |
| C7 | file absent | **STRUCK** (0 files, 0 refs, `8b5b48347`) |

**Escalations** — ESC-W8i-1 (C-5): the oracle's M-12 pin plus its 2-arg `strokeContrast` make 3:1-at-every-hue unsatisfiable for any `(s,v)` predicate. Ask: grant `test/spectrum-luma.test.ts` to pass hue through a hue-aware `spectrumFieldIsLight(h,s,v)`, with the M-12 pin restated over the new model, or rule the assertion's owner. ESC-W8i-2 (NG-6): the failing case asserts that glass-ui's Checkbox honours a `checked` prop. That is producer-owned and contradicts the file's own third case. Ask: rule the assertion an owner's (W1.a) re-author to "stale prop drives NOTHING" (`'unchecked'`), or relay it to glass. ESC-W8i-3 (host): the kernel zone is at 13.5M and the owner must reboot before J4 / CLS / the full vitest ×2 can be read.
**Adjacent edits** (§0bt) — none.
**Inherited paths** — none.

## Close

Close seat `claude-opus-5-5`, 2026-10-17, VERIFY-ONLY (cures nothing). HEAD at open `740da7fcf`. Spec read
whole once; record read header → Unit plan, the `.i` receipt (last section), and the `.d/.dc/.e` gate tables by grep.
Crash-recovery ⟨`git status --porcelain -- docs/tranches/X/execution/A/X-W8.md docs/tranches/X/execution/LEDGER.md docs/tranches/X/waves/W8-CLOSE.md`⟩ → empty; no inherited edits.
Host: ⟨`tail -1 ~/.claude/guard/log/zone.log`⟩ → `08:21:59 inuse=13482496`; ⟨`timeout 40 guarded --timeout 30 -- npx vitest run --maxWorkers=2`⟩ →
`[guarded] waiting for headroom (kernel zone data.kalloc.1024 at 13.5M …): reboot the Mac)` → exit 124. **Every heavy arm is guard-refused this seat.**

### Act 1 — commit roster and bounds audit (⟨`git show --stat --format= <sha>`⟩ per commit)

| unit | commits | paths vs writable set |
|---|---|---|
| `.a` | `17090b54a` census · `76111e871` receipt | census + record only — IN BOUNDS |
| `.b` | `62bc3fbde` · `ce77d32e2` | 26 paths: components.json, eslint.config.js, package{,-lock}.json, shared/{utils→debounce}.ts, the 11 debounce importers, the 9 clipboard sites, G-6 witness — IN BOUNDS |
| `.c` | `9b92f36c9` · `cac84202a` | dock/{Dock.vue,index.ts}, markdown/{Markdown.vue,index.ts,types.ts}, 3 G-7 witness — IN BOUNDS |
| `.d` | `15932a93a` · `2d3ac4fd0` | 18 paths; `test/ink-real-composite.test.ts` declared adjacent (§0bt); `demo/picker/ColorPicker.vue:63` (G-10's named parent `@update` binding) is NOT in the Unit-plan `.d` list and NOT under the receipt's "Adjacent edits" (the receipt calls it "in the writable set") — lawful under §0bt as the parent counterpart G-10 itself names, but **mis-recorded** (MINOR, landed-wrong of record) |
| `.dc` | `0f2d34e61` addendum · `639892d53` · `62fdd2b3b` | shell/{usePaneRouter,useSceneTargets,useSceneActions}.ts, dock/Dock.vue, new registry test, 3 witness; `demo/app/App.vue` declared adjacent — IN BOUNDS |
| `.e` | `df5737679` · `3ecc1535f` | eslint.config.js, ARCHITECTURE.md, witness — IN BOUNDS |
| `.i` | `82bd72d2f` · `740da7fcf` | the 3 SFCs + 2 witness — IN BOUNDS |

No commit touches `scripts/dev/dev.sh`, `foundation.css`, `.github/**`, `src/**`, `tsconfig.demo.json`, glass-ui.

### Act 2 — every gate re-run at this seat (HEAD `740da7fcf`, ×2 unless noted)

Grep arms, run twice (one-line form): ⟨G-1 four commands⟩ → `0 96 53 0` both runs; local-barrel filter `grep -v '@mkbabb/glass-ui/'` → 0;
root-barrel clipboard statements → 0; root `from '@mkbabb/glass-ui'` → 7 (Accordion*/Alert*/Skeleton — no subpath at 10.1.0);
`grep -c 'demo/@' eslint.config.js` → 0; clsx/tailwind-merge in package.json 0, lockfile 0; `tw-animate-css` 1; components.json, demo/ui, shared/utils.ts absent;
shared/debounce importers 11; shim grep 0, `<DockCrossfade` 3; forks grep 0; `max-lines` 5. ⟨`node …/graph-v3.mjs --print-sccs`⟩ ×2 → exit 0, `[runtime]`/`[load]` lines **0**,
sha256/16 `27d38866c7fae674` both (= `.c`'s after digest). `npm run typecheck` exit 0 · `npm run lint` exit 0 · `npx eslint demo src api e2e test --max-warnings=0` exit 0 — each ×2 (run 2: tc 0 · lint 0 · product eslint 0).
Targeted ⟨`guarded --light -- npx vitest run test/ink.test.ts test/spectrum-luma.test.ts demo/test/shell/reka-binding-idiom.test.ts demo/test/shell/dock-admin-mode.test.ts demo/test/shell/dock-command-registry.test.ts test/ink-real-composite.test.ts --maxWorkers=2`⟩ ×2 → `7 failed | 42 passed (49)` both:
ink.test.ts D6 ×2 + T-35 ×3, C-5, NG-6 — the standing 7; the G-12 suite, the REG suite and ink-real-composite all pass.

| gate | BEFORE (baseline `d17dece5a`) | AFTER (this seat) |
|---|---|---|
| G-1 census | RED | **GREEN** — census present, line 1 SERVED MODEL, 3 UNREPRODUCED marks; commands reproduce 0/96/53/0 |
| G-2 barrels | GREEN-BEFORE (`2ae7344d2`) | **GREEN** — 0 barrels, demo/ui absent, no new forwarding index |
| G-3 owners | RED (9 root clipboard) | **GREEN** — 0 local-barrel; 0 root clipboard; typecheck 0; 7 root-only rows ride BK relay `alert-skeleton-subpaths` |
| G-4 config/deps | RED | **GREEN** — components.json absent; `demo/@` 0; clsx/twm 0/0; tw-animate-css kept w/ receipt |
| G-5 cn/debounce | RED | **GREEN on clauses 1-3**; clause 4 `npm run test` **RED/UNMEASURED** (full suite guard-refused; standing 7 RED in targeted run) |
| G-6 lint | RED (ban) | **GREEN** — lint exit 0 ×2; ban present (`eslint.config.js:268`); falsifier committed (`W8-witness/G-6-lint-falsifier.txt`) |
| G-7 SCCs | RED (Dock, Markdown) | **GREEN** — 0 runtime / 0 load ×2; before/after/falsifier banked |
| G-8 shim | RED (count 1) | **GREEN (static)** — 0 / 3; motion arm banked by `.d` (`G-8-G-13-probe.txt`), not re-driven (heavy, zone-refused) |
| G-9 Button/Skeleton | GREEN-BEFORE | **GREEN** — 0 attributes; null-DELTA moot (no attribute deleted this wave) |
| G-10 dead surface | RED | **GREEN** — `update` emit 0, `@update=` 0, colorInputRef/actionToolbarRef 0, clearHover 0 |
| G-11 overlay | RED | **GREEN** — aria-controls 0, execCommand checked in try/finally, `onScopeDispose(clearTimeout)`, `type="button"` ×3 |
| G-12 latch | RED (test) | **GREEN** — `ref(` 0; back-navigation suite passes ×2 |
| G-13 chrome rung | RED | **GREEN** — `chrome` only in a comment in ink.ts; compile falsifier banked by `.d` |
| G-14 LoC cap | RED | **GREEN** — wired ratchet (`max-lines` ×5 incl. comment), `400 LoC` 0, `demo/@/components/ui` 0 in ARCHITECTURE.md, lint 0 |
| G-15 preservation | GREEN (tc/lint) | **PARTIAL** — typecheck/lint/product-eslint 0; `npm run test` + `npm run test:e2e` + visual pairs **UNMEASURED** (guard-refused) |
| G-W8-i1 | RED | grep **GREEN** 0; full vitest ×2 **RED** (C-5, NG-6 escalated) |
| REG (S-1) | RED | **GREEN** — registry suite passes ×2 |
| A3 / C2 | RED of record | **UNMEASURED** (heavy probe, zone-refused) |
| J4 · 844×390 CLS | — | **UNMEASURED** (zone-refused) |
| DOCK-SCROLL-MORPH | honest-RED | **honest-RED by id, O-55** |
| W5-BTN-INTERACTIVE-DEAD | RED | **GREEN** — 0 class sites (5 hits are comments + `demo/DESIGN.md:248,258` prose) |
| W5-READY-DEAD · C7 | — | **STRUCK** |

### Act 3 — §Verification Artefacts as written

`W8-census.md` present. `W8-witness/` holds: G-6 lint falsifier · G-7 before/after/falsifier · G-8 +60 ms phase samples and
G-13 computed-style readings (`G-8-G-13-probe.txt`, `probe-g8-g13.mjs`) · G-11 falsifier suite · G-12 latch falsifier ·
G-13 compile falsifier · G-14 ratchet falsifier (`e-max-lines-falsifier.txt`) · `.dc` registry falsifier + A3/C2-unmeasured + scroll-morph · `i/` C-5/NG-6 witness.
**Absent**: the G-9 null-DELTA pairs (moot — no attribute existed to delete; GREEN-BEFORE at `2ae7344d2`) and the G-15 before/after visual pairs (heavy, guard-refused).
`W8-CLOSE.md` created by this seat (dispositions, four-verb state, every gate's final cell).

### Act 4 — E13 sweep

⟨`find <path> -maxdepth 1 -type f -newer docs/tranches/V/coordination/INBOX.md`⟩ (INBOX mtime 06:17) over value `V/` + `V/coordination` ·
glass BL (newest, ⟨`ls -dt`⟩ → BL BK BJ) + BK/coordination · keyframes `V/coordination` · atlas `P/coordination` →
value `V/ARCHITECTURE.md` (`.e`'s own commit `df5737679`, not mail) · glass `BL/FORMATION-PROGRESS.md` (glass's resume cursor, not a letter); 0 elsewhere.
**0 unrowed · 0 UNREAD in scope.** Sweep line appended to INBOX.md.

### Residuals (named owners)

- R1 `npm run test` full ×2 and G-W8-i1's full-vitest arm — the standing 7: ink.test.ts D6 ×2 + T-35 ×3 → INK-VEIL-MIDBAND, O-62 (a) (LEDGER X-W12U/X-W7L rows); C-5 → ESC-W8i-1, NG-6 → ESC-W8i-2 (owner ruling on the oracle owner; NG-6 producer-side → glass relay).
- R2 UNMEASURED heavy arms — `npm run test:e2e`, G-8 motion re-drive, G-15 visual pairs, A3/C2 probe, J4 o29 short-landscape, 844×390 CLS: owner act **reboot** (ESC-W8i-3; zone 13.48M ≥ 13M), then a RESUME close seat re-reads them.
- R3 DOCK-SCROLL-MORPH honest-RED by id → O-55 (glass BL N-7a).
- R4 7 root-barrel statements (Accordion*/Alert*/Skeleton) → BK relay `alert-skeleton-subpaths`.
- R5 `demo/DESIGN.md:248,258` still names `btn-interactive` as a consumed producer atom (stale canon after W5-BTN-INTERACTIVE-DEAD) → X-W10 (canon owner), MINOR.
- R6 L-18 rider (two gestalt passes + Fable arbiter) owed before ACCEPTED → the X-W8 CHECK seats.

### Escalations

Carried, not new: ESC-W8i-1 (C-5), ESC-W8i-2 (NG-6), ESC-W8i-3 (host reboot). No new escalation from this seat.

### Landed-wrong (recorded, not fixed)

- LW-1 (MINOR): `15932a93a` edits `demo/picker/ColorPicker.vue:63` (G-10's named parent binding) without listing it under the `.d` receipt's "Adjacent edits"; the receipt line `:389` calls it "in the writable set", but the Unit-plan `.d` list does not carry it. Lawful under §0bt; the record is wrong, not the bytes.

### Four-verb

| verb | state |
|---|---|
| AUDITED | YES |
| SPECIFIED | YES |
| IMPLEMENTED | **PARTIAL** — every subtraction landed; G-5/G-15/G-W8-i1 suite clauses RED (standing 7) or UNMEASURED (guard-refused) |
| VERIFIED | NO (not this seat's stamp; L-18 rider owed) |

**Verdict: PARTIAL** — static/compile/lint/graph gates GREEN ×2; the suite and every heavy arm remain on R1/R2.

## Check 1

L-20 fresh adversarial pass 1, VERIFY-ONLY, `claude-opus-5-5`, 2026-10-17, HEAD `af19a20b1`. Spec read whole once; record read
header → Unit plan, the `.i` receipt, and § Close. Crash-recovery ⟨`git status --porcelain -- <record> <LEDGER> W8-CLOSE.md`⟩ → empty.
Host ⟨`tail -1 ~/.claude/guard/log/zone.log`⟩ → `08:27:01 inuse=13491884` (≥ 13M): every heavy arm stays guard-refused this seat too.

### Axis readings

1. **Claimed GREENs reproduce: 17 of 17.** ⟨G-1 four commands ×2⟩ → `0 96 53 0` both, local-barrel filter 0; root `@mkbabb/glass-ui` imports 7 (Accordion* ×1 · Alert* ×1 · Skeleton ×5; installed 10.1.0, 68 keys, no alert/skeleton/accordion subpath); root clipboard 0 · components.json / demo/ui / shared/utils.ts absent · `demo/@` 0 · clsx/twm 0/0 (and absent from node_modules) · tw-animate-css 1 · shared/debounce importers 11 · ⟨graph-v3 `--print-sccs` ×2 (guarded --light)⟩ → exit 0, `[runtime]`/`[load]` 0, sha256/16 `27d38866c7fae674` both (= `.c` after) · shim 0 / `<DockCrossfade` 3 · `update` emit 0, `@update=` 0 in ColorPicker, refs/clearHover 0 · overlay: `type="button"` ×3, execCommand result gates `flashCopied`, append/remove in try/finally, one timer cleared on `onScopeDispose` · `isAdminMode = computed(` · `chrome` rung only in a comment; chrome probe throws when unmeasurable (loud) · `400 LoC` 0, `demo/@/components/ui` 0, 4 `max-lines` pins = measured worsts (demo 1013 GradientStopRail · src 672 path.ts) · forks grep 0 · `btn-interactive` class sites 0 (3 comment hits). ⟨`guarded --light -- npm run typecheck` / `npm run lint`⟩ ×2 → `tc=0 lint=0` both runs. Targeted ⟨vitest over ink · spectrum-luma · reka-binding-idiom · dock-admin-mode · dock-command-registry · ink-real-composite, `--maxWorkers=2`⟩ → `7 failed | 42 passed (49)` — identical to Close; G-12 and REG suites pass.
2. **Bounds**: ⟨`git show --stat` × 16 commits⟩ — every path inside its unit's set or a declared adjacent, except `demo/picker/ColorPicker.vue:63` (`15932a93a`, LW-1 of record, lawful §0bt parent binding, mis-recorded). `scripts/dev/dev.sh`: 0 commits in range.
3. **No masking**: `ink-real-composite.test.ts` drops the deleted `chrome` rung from the rung loop and ADDS a token assertion + a measured-band fixture — re-pointed, not narrowed. The overlay's clipboard `catch` is the pre-existing feature fallback, not a defect mask. No `test.skip`, allowlist, node_modules patch.
4. **Commit families**: one product commit per unit + receipt, plus `.dc`'s dated addendum — §Commit Plan held.
5. **E-3**: ⟨`git diff --stat 17090b54a~1..HEAD -- registry/adjudicated/ CONFORMANCE-2026-08-03.md waves/ (minus census/witness/close)`⟩ → only `W8.md | 2 ++` = `0f2d34e61`'s dated ADDENDUM (0 deleted lines) — lawful addendum-beside per the file's own addenda practice.
6. **Mail**: ⟨`find <6 paths> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 on every path; 0 table rows with status UNREAD.
7. **Four-verb**: IMPLEMENTED PARTIAL / VERIFIED NO — lawful (no premature stamp).
8. **Goal criterion at the bytes**: forwarding layer, config/dep residue and the four SCCs are gone and nothing replaced them — MET.
9. **Published figures** (0/96/53/0 · 11 · 7 · 1013/672/357/539 · 7 failed | 42 passed) reproduce.

### Axis 10 — RED gates adjudicated at the spec bytes

| gate | relief at the spec bytes | owner named | reading |
|---|---|---|---|
| `npm run test` ink.test D6 ×2 + T-35 ×3 (G-5 cl.4 / G-15) | out-of-wave, pre-existing: INK-VEIL-MIDBAND → O-62 (a), the X-W7L/X-W12U honest-RED rows; G-15 is preservation and the composition is unchanged (X-W12U Close 8 `:3386` "INK-VEIL-MIDBAND ×5 · C-5 · NG-6") | yes | **HONEST-RED** |
| DOCK-SCROLL-MORPH | ADDENDUM §0bc: "otherwise the row closes honest-RED by id with O-55" | yes (O-55) | **HONEST-RED** |
| 7 root-barrel statements (G-3 narrowness) | no subpath exists in installed 10.1.0 — producer-owned (BK relay `alert-skeleton-subpaths`) | yes | GREEN at the spec's own clause (narrowest *published*) |
| **C-5 · NG-6 (G-W8-i1 full-vitest ×2)** | **NONE.** COHESION §0aq `:2692-2694` and the W8 ADDENDUM route both canaries INTO `.i` "cured at their roots (test-owned, W1.a born-RED) … Bounds: the named files"; X-W7 / X-W7L / X-W12U all closed honest-RED by routing them HERE. ESC-W8i-1/-2 are open escalations with no ruling in COHESION (⟨`grep -n 'ESC-W8i' COHESION.md`⟩ → 0) | escalation only, no ruling | **UNRELIEVED RED** |
| A3 · C2 (`.dc`, S-1's gates) · `npm run test:e2e` · G-15 visual pairs · J4 o29 · 844×390 CLS (C10-1 → `.i` per X-W12U Check 10) | none at the spec bytes; host-blocked (zone ≥ 13M, ESC-W8i-3 owner reboot) | owner act named, not a relief | **UNMEASURED — cannot be adjudicated GREEN or honest** |
| G-8 motion arm | banked ×2 by `.d` (`G-8-G-13-probe.txt`, guarded, before the zone wall) | — | GREEN of record (not re-driven) |

### Register

| severity | claim | receipt | cure |
|---|---|---|---|
| HIGH | G-W8-i1's full-vitest ×2 arm is RED on C-5 + NG-6 with no relief at the spec bytes; this wave is their terminal owner by route | targeted vitest `7 failed \| 42 passed` (C-5, NG-6 among them); §0aq `:2694`; ESC-W8i-1/-2 unruled | owner rules ESC-W8i-1/-2 (C-5: hue-aware oracle + M-12 pin restated; NG-6: W1.a re-author or glass relay), then an `.i` re-sit cures at the root and the full suite reads ×2 |
| HIGH (verification gap; no byte defect inferred) | S-1's A3/C2, `test:e2e`, G-15 visual pairs, J4, 844×390 CLS never measured | `dc-A3-C2-unmeasured.txt`; zone 13.49M at this seat | owner reboot (ESC-W8i-3); RESUME close seat measures them, then Check 2 |
| MEDIUM | the Unit-plan `.i` writable set omits the two canary test files, though §0aq says "test-owned … Bounds: the named files"; the escalation's "outside the writable set" premise is therefore contestable | record Unit plan `.i` row vs COHESION `:2694` | the ESC-W8i-1/-2 ruling settles whether a re-author is inside `.i`'s bounds |
| MINOR | LW-1: `ColorPicker.vue:63` edit not listed under `.d` adjacent edits | `git show --stat 15932a93a` | record addendum (already logged by Close) |
| MINOR | `demo/DESIGN.md:248,258` stale `btn-interactive` canon | Close R5 | X-W10 (canon owner) |
| INFO | 7 root-barrel imports have no subpath at 10.1.0 | exports map 68 keys | BK relay `alert-skeleton-subpaths` |

**Honest-RED set (relieved)**: ink D6/T-35 ×5 → O-62 (a) · DOCK-SCROLL-MORPH → O-55.
**Unrelieved**: C-5 · NG-6 (G-W8-i1). **Unmeasured**: A3 · C2 · test:e2e · G-15 pairs · J4 · 844×390 CLS.

### Successors

X-W10 `Opens after` "X-W5..X-W9 stable": X-W8 conjunct **RED** (not CLOSED) → lawfully BLOCKED. X-W11 "X-W0…X-W10 IMPLEMENTED": X-W8 IMPLEMENTED = PARTIAL → lawfully BLOCKED.

**Verdict: NOT-CONFORMANT** — every claimed GREEN reproduces (17/17), bounds/E-3/mail/masking clean, but one HIGH unrelieved RED (C-5/NG-6) and the S-1 gates unmeasured. LEDGER status not promoted; event line appended.

## Repair 1

REPAIR SEAT round 1, `claude-opus-5-5`, 2026-10-17, HEAD `ff9182149`. Spec read whole once; record read header → Unit plan, the `.i`
escalation line (`:480`), § Check 1. Crash-recovery ⟨`git status --porcelain -- <record> <LEDGER> <.i set>`⟩ → empty; no inherited edits.
Host ⟨`tail -1 ~/.claude/guard/log/zone.log`⟩ → `08:32:02 inuse=13500093` (≥ 13M): heavy arms stay guard-refused at this seat.
Ruling search ⟨`grep -rn 'ESC-W8i' COHESION.md LEDGER.md INBOX.md`⟩ → LEDGER `:42`, `:958` only (this wave's own rows); **0 rulings**.

| # | Check 1 defect | cure / disposition | commit | gate re-reading |
|---|---|---|---|---|
| 1 | HIGH — G-W8-i1 full-vitest RED on C-5 + NG-6, unrelieved | **ESCALATED, not cured.** The register's cure is an owner ruling (ESC-W8i-1 hue-aware `spectrumFieldIsLight(h,s,v)` + M-12 pin restated; ESC-W8i-2 W1.a re-author vs glass relay). COHESION carries no ruling; flipping NG-6's `toBe("checked")` or re-pinning C-5's M-12 oracle without it would be an assertion rewrite in place of a cure (masking) | — | ⟨`guarded --light -- npx vitest run test/spectrum-luma.test.ts demo/test/shell/reka-binding-idiom.test.ts --maxWorkers=2`⟩ ×2 → `2 failed \| 5 passed (7)` both (C-5, NG-6) — unchanged |
| 2 | HIGH — A3/C2, test:e2e, G-15 pairs, J4 o29, 844×390 CLS unmeasured | **ESCALATED** (ESC-W8i-3 owner reboot): guard refuses heavy runs at kernel zone ≥ 13M; zone now 13,500,093 | — | not runnable this seat |
| 3 | MEDIUM — `.i` writable set omits the two canary files vs §0aq `:2694` "Bounds: the named files" | **ESCALATED** with #1: COHESION `:2693-2694` names the canaries "cured at their roots (test-owned, W1.a born-RED)"; whether re-authoring a W1.a assertion is a root cure or an assertion change is exactly the question ESC-W8i-1/-2 put to the owner — this seat does not self-grant it | — | — |
| 4 | MINOR — LW-1 `ColorPicker.vue:63` unlisted adjacent edit | **CURED by this addendum (E-3: the `.d` receipt bytes untouched).** `.d` adjacent edits, addendum-beside: `demo/picker/ColorPicker.vue:63` — ⟨`git show 15932a93a -- demo/picker/ColorPicker.vue`⟩ → `-  @update="(v, c) => updateColorComponentDebounced(v, c)"` (1 deletion): the parent binding of the deleted `ColorComponentDisplay` `update` emit (G-10's "no dangling counterpart"), lawful under §0bt | this commit | ⟨`grep -c '@update=' demo/picker/ColorPicker.vue`⟩ → 0 |
| 5 | MINOR — `demo/DESIGN.md:248,258` stale `btn-interactive` canon | **ROUTED** to X-W10 (canon owner); `demo/DESIGN.md` is outside every W8 unit's File Bounds | — | — |
| 6 | INFO — 7 root-barrel imports, no subpath at 10.1.0 | no act (G-3 holds at "narrowest published"); BK relay `alert-skeleton-subpaths` stands | — | — |

Cured 1 (LW-1). Escalated 3 (ESC-W8i-1/-2 ∪ MEDIUM; ESC-W8i-3). No product byte written. Row stays PARTIAL.

## Check 2

L-20 fresh adversarial pass 2, VERIFY-ONLY, `claude-opus-5-5`, 2026-10-17, HEAD `60ae706cb`. Spec read whole once; record read
header → Unit plan, § Close, § Check 1, § Repair 1. Crash-recovery ⟨`git status --porcelain -- docs/tranches/X/execution/`⟩ → empty.
Host ⟨`tail -1 ~/.claude/guard/log/zone.log`⟩ → `08:42:04 inuse=13518970`; ⟨`timeout 25 guarded --timeout 30 -- true`⟩ →
`[guarded] waiting for headroom (kernel zone data.kalloc.1024 at 13.5M …): reboot the Mac)` — every heavy arm stays guard-refused.
Ruling search ⟨`grep -n 'ESC-W8i' COHESION.md LEDGER.md INBOX.md`⟩ → LEDGER `:42,:958,:959` only — **still 0 rulings**. No commit since Repair 1.

### Axis readings

1. **Claimed GREENs reproduce: 17 of 17** (×2). ⟨G-1 four commands⟩ → `0 96 53 0` both runs, local-barrel filter 0 · root `@mkbabb/glass-ui` 7, root clipboard 0 ·
   components.json / demo/ui / shared/utils.ts absent · `demo/@` 0 · clsx/twm `package.json:0 package-lock.json:0` · tw-animate-css 1 · shared/debounce importers 11 ·
   ⟨`guarded --light -- node …/graph-v3.mjs --print-sccs`⟩ ×2 → exit 0, `[runtime]`/`[load]` 0, sha256/16 `27d38866c7fae674` both · shim 0 / `<DockCrossfade` 3 ·
   `update:` emit 0, `@update=` 0, refs 0, `clearHover` 0 · overlay `type="button"` 3, `onScopeDispose|onUnmounted` 2, `finally` 1 · `isAdminMode = computed(` ·
   `chrome` in ink.ts only at `:13` (comment) · `400 LoC` 0, `demo/@/components/ui` 0, `max-lines` 5 · `btn-interactive` 3 hits, all comments ·
   forks grep 0 · ⟨`npm run typecheck`⟩ 0 ×2 · ⟨`npm run lint`⟩ 0 ×2 · ⟨`npx eslint demo src api e2e test --max-warnings=0`⟩ 0 ·
   targeted ⟨`guarded --light -- npx vitest run <the 6 files> --maxWorkers=2`⟩ ×2 → `7 failed | 42 passed (49)` both (D6 ×2 · T-35 ×3 · C-5 · NG-6; G-12 + REG suites pass).
2. **Bounds**: ⟨`git show --stat` on the six product commits⟩ — every non-`demo/` path is a declared row (components.json, eslint.config.js, package{,-lock}.json,
   ARCHITECTURE.md, `test/ink-real-composite.test.ts` adjacent); ⟨`git log 17090b54a~1..HEAD -- scripts/dev/dev.sh foundation.css .github src tsconfig.demo.json`⟩ → 0.
3. **Masking**: ⟨`git show <product commits> | grep '^+.*(\.skip(|\.only(|test\.fail|eslint-disable|@ts-ignore|@ts-expect-error)'`⟩ → 0. Check 1's reading of ink-real-composite stands.
4. **Commit families**: one product commit per unit + receipt + `.dc` addendum — §Commit Plan held.
5. **E-3**: ⟨`git diff --stat 17090b54a~1..HEAD -- registry/adjudicated/ CONFORMANCE-2026-08-03.md waves/ (minus census/witness/close)`⟩ → `W8.md | 2 ++` only (`0f2d34e61`'s dated addendum).
6. **Mail**: ⟨`find <6 paths> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 every path; the 6 `| UNREAD |` grep hits are sweep lines quoting the pattern (`:610-619`), 0 UNREAD rows.
7. **Four-verb**: IMPLEMENTED PARTIAL / VERIFIED NO — lawful.
8. **Goal criterion at the bytes**: MET (forwarding layer, config/dep residue, the SCCs gone; nothing replaced them).
9. **Figures**: 0/96/53/0 · 11 · 7 · `7 failed | 42 passed` reproduce; D6/T-35 pre-date the wave (X-W12U `B3` `:29` same five).

### Axis 10 — RED gates at the spec bytes

| gate | relief | owner | reading |
|---|---|---|---|
| ink.test D6 ×2 + T-35 ×3 (G-5 cl.4 / G-15) | pre-existing, out-of-wave: INK-VEIL-MIDBAND → O-62 (a); G-15 is preservation and the composition is unchanged | O-62 (a) | **HONEST-RED** |
| DOCK-SCROLL-MORPH | ADDENDUM §0bc "closes honest-RED by id with O-55" | O-55 | **HONEST-RED** |
| C-5 · NG-6 (G-W8-i1 full vitest ×2) | **none** — COHESION §0aq `:2693-2694` routes both INTO `.i` "cured at their roots"; this wave is the terminal owner; ESC-W8i-1/-2 unruled | escalation only | **UNRELIEVED RED** |
| A3 · C2 (S-1) · test:e2e · G-15 pairs · J4 o29 · 844×390 CLS | none at the spec bytes; host-blocked (zone 13.52M, ESC-W8i-3 reboot) | owner act, not a relief | **UNMEASURED** |

### Register

| severity | claim | receipt | cure |
|---|---|---|---|
| HIGH | G-W8-i1 full-vitest arm RED on C-5 + NG-6, no relief at the spec bytes (unchanged since Check 1) | targeted vitest `7 failed \| 42 passed` ×2; ESC-W8i rulings 0 | owner rules ESC-W8i-1/-2; an `.i` re-sit cures at the root; full suite ×2 |
| HIGH (verification gap) | S-1's A3/C2, test:e2e, G-15 pairs, J4, 844×390 CLS never measured | zone 13,518,970; guard waits for headroom | owner reboot (ESC-W8i-3); RESUME close seat measures; Check 3 |
| MEDIUM | `.i` Unit-plan writable set vs §0aq "Bounds: the named files" (canary files) | Check 1 row 3 | settled by the ESC-W8i-1/-2 ruling |
| MINOR | `demo/DESIGN.md:248,258` stale `btn-interactive` canon | Close R5 | X-W10 |
| INFO | 7 root-barrel imports, no subpath at 10.1.0 | 68-key map | BK relay `alert-skeleton-subpaths` |

LW-1 cured at Repair 1 (verified: `@update=` 0). **Honest-RED (relieved)**: ink D6/T-35 ×5 → O-62 (a) · DOCK-SCROLL-MORPH → O-55.
**Unrelieved**: C-5 · NG-6. **Unmeasured**: A3 · C2 · test:e2e · G-15 pairs · J4 · 844×390 CLS.

### Successors

X-W9 (`Opens after` X-W0 only) — unaffected. X-W10 "X-W5…X-W9 stable": X-W8 conjunct RED → lawfully BLOCKED. X-W11 "X-W0…X-W10 IMPLEMENTED": X-W8 PARTIAL → lawfully BLOCKED.

**Verdict: NOT-CONFORMANT** — 17/17 claimed GREENs reproduce; bounds, E-3, mail, masking, families clean; the C-5/NG-6 HIGH stands unrelieved and the S-1 + heavy arms stay unmeasured. LEDGER status not promoted; event line appended.

## Repair 2

REPAIR SEAT round 2, `claude-opus-5-5`, 2026-10-17, HEAD `f0836ed91`. Spec read whole once; record read header → Unit plan, the `.i`
receipt tail (`:470-483`), § Repair 1, § Check 2. Crash-recovery ⟨`git status --porcelain -- docs/tranches/X/execution/ docs/tranches/X/waves/W8.md`⟩ → empty; no inherited edits.
Host ⟨`tail -1 ~/.claude/guard/log/zone.log`⟩ → `08:42:04 inuse=13518970`; ⟨`timeout 20 guarded --timeout 30 -- true`⟩ →
`[guarded] waiting for headroom (kernel zone data.kalloc.1024 at 13.5M (panics near 20.8M): reboot the Mac)` — heavy arms still guard-refused.
Ruling search ⟨`grep -rn 'ESC-W8i' COHESION.md LEDGER.md INBOX.md`⟩ → LEDGER `:42,:958,:959,:960` only (this wave's own rows) — **0 rulings**.
Bounds re-read ⟨`sed -n 2692,2694p COHESION.md`⟩ → "the two vitest canaries C-5 / NG-6 cured at their roots (test-owned, W1.a born-RED) · nothing else. Bounds: the named files."

| # | Check 2 defect | cure / disposition | commit | gate re-reading |
|---|---|---|---|---|
| 1 | HIGH — G-W8-i1 full-vitest RED on C-5 + NG-6 | **ESCALATED, not cured (ESC-W8i-1/-2 stand).** Even granting the canary files in bounds (row 3), no root cure exists inside them without an owner ruling: C-5's M-12 pin with its 2-arg `strokeContrast` is unsatisfiable for any `(s,v)` predicate (`.i` receipt `:480`), so passing requires restating the oracle; NG-6's failing case asserts glass-ui Checkbox honours `checked` (producer-owned; 0 demo subject sites), so passing requires flipping `toBe("checked")` or a glass change. Both are assertion rewrites or a sibling-repo act — masking / out-of-repo under the standing law | — | ⟨`guarded --light -- npx vitest run test/spectrum-luma.test.ts demo/test/shell/reka-binding-idiom.test.ts --maxWorkers=2`⟩ ×2 → `Tests  2 failed \| 5 passed (7)` both (C-5, NG-6) — unchanged |
| 2 | HIGH — A3/C2, test:e2e, G-15 pairs, J4 o29, 844×390 CLS unmeasured | **ESCALATED** (ESC-W8i-3, owner reboot): zone 13,518,970 ≥ 13M; the guard refuses every heavy arm | — | not runnable this seat |
| 3 | MEDIUM — `.i` writable set vs §0aq "Bounds: the named files" | **ESCALATED with #1.** The bytes do name the canaries inside `.i`'s bounds; the premise "outside bounds" is therefore withdrawn as the reason — the operative reason is row 1's (no root cure without restating an oracle or a producer act). The owner's ESC-W8i-1/-2 ruling settles which | — | — |
| 4 | MINOR — `demo/DESIGN.md:248,258` stale `btn-interactive` canon | **ROUTED** to X-W10 (canon owner); outside every W8 unit's bounds and another unit's row, so §0bt adjacency does not reach it | — | — |
| 5 | INFO — 7 root-barrel imports, no subpath at 10.1.0 | no act; BK relay `alert-skeleton-subpaths` stands | — | — |

Cured 0. Escalated 3 (ESC-W8i-1/-2 ∪ MEDIUM; ESC-W8i-3). No product byte written. Row stays PARTIAL.

## Check 3

L-20 fresh adversarial pass 3, VERIFY-ONLY, `claude-opus-5-5`, 2026-10-17 08:46 EDT, HEAD `dcb3bef98`. Spec read whole once; record read
header → Unit plan, the `.i` receipt tail, § Close, § Check 1/2, § Repair 1/2. Crash-recovery ⟨`git status --porcelain -- docs/tranches/X/execution/`⟩ → empty.
Host ⟨`zprint data.kalloc.1024`⟩ → `13539815` in use; ⟨`timeout 25 guarded --timeout 30 -- true`⟩ → `[guarded] waiting for headroom (kernel zone
data.kalloc.1024 at 13.5M (panics near 20.8M): reboot the Mac)` exit 124 — every heavy arm is still guard-refused. ⟨`git log dcb3bef98..HEAD`⟩ → 0 commits since Repair 2.
Ruling search ⟨`grep -rn 'ESC-W8i' COHESION.md INBOX.md`⟩ → 0 — **ESC-W8i-1/-2/-3 still unruled**.

### Axis readings

1. **Claimed GREENs reproduce: 17 of 17** (×2, this seat's own commands). ⟨G-1 four commands⟩ → `0 96 53 0` both · local-barrel 0 · root `@mkbabb/glass-ui` 7 · root clipboard 0 ·
   components.json / demo/ui / shared/utils.ts absent (3/3) · `demo/@` 0 · clsx/twm `0 0` · tw-animate-css 1 · debounce importers 11 · shim `0` / `<DockCrossfade` `3` · forks 0 ·
   ⟨`guarded --light -- node …/graph-v3.mjs --print-sccs`⟩ ×2 → exit 0, `[runtime]`/`[load]` 0, sha256/16 `27d38866c7fae674` both · `update:` 0, `@update=` 0, refs 0, clearHover 0 ·
   overlay `type="button"` 3, dispose 2, `finally` 1, `aria-controls` 0 · `isAdminMode = computed(` (`:36`) · `chrome` in ink.ts only at `:13` (comment) · `400 LoC` 0, `demo/@/components/ui` 0, `max-lines` 5 ·
   ⟨`npm run typecheck` · `npm run lint` · `npx eslint demo src api e2e test --max-warnings=0`⟩ (guarded --light) → `0 0 0` both runs ·
   targeted ⟨`guarded --light -- npx vitest run <the 6 files> --maxWorkers=2`⟩ ×2 → `Tests  7 failed | 42 passed (49)` both (D6 ×2 · T-35 ×3 · C-5 · NG-6; G-12 + REG suites pass).
2. **Bounds**: no new commit since Check 2; ⟨`git log 17090b54a~1..HEAD -- scripts/dev/dev.sh foundation.css .github src tsconfig.demo.json`⟩ → 0. Prior per-commit `--stat` audits stand.
3. **Masking**: none new; Check 2's added-line grep (skip/only/test.fail/eslint-disable/ts-ignore) stands at 0.
4. **Commit families**: held.
5. **E-3**: ⟨`git diff --stat 17090b54a~1..HEAD -- registry/adjudicated/ waves/ (minus census/witness/close)`⟩ → `W8.md | 2 ++` only (dated addendum `0f2d34e61`).
6. **Mail**: ⟨`find <6 paths> -maxdepth 1 -type f -newer INBOX.md`⟩ → 0 every path; UNREAD rows 0.
7. **Four-verb**: IMPLEMENTED PARTIAL / VERIFIED NO — lawful.
8. **Goal criterion at the bytes**: MET (forwarding layer, config/dep residue, the four SCCs gone; nothing replaced them).
9. **Figures**: 0/96/53/0 · 11 · 7 · `7 failed | 42 passed` reproduce.

### Axis 10 — RED gates at the spec bytes (independent reading)

| gate | relief | owner | reading |
|---|---|---|---|
| ink.test D6 ×2 + T-35 ×3 (G-5 cl.4 / G-15) | pre-existing, out-of-wave: INK-VEIL-MIDBAND → O-62 (a) | O-62 (a) | **HONEST-RED** |
| DOCK-SCROLL-MORPH | ADDENDUM §0bc "closes honest-RED by id with O-55" | O-55 | **HONEST-RED** |
| C-5 (G-W8-i1) | none — §0aq `:2693-2694` routes it INTO `.i` "cured at their roots (test-owned) … Bounds: the named files"; `.i` witnessed it unsatisfiable without restating the M-12 pin (an oracle change only the owner may rule) | ESC-W8i-1, unruled | **UNRELIEVED RED** |
| NG-6 (G-W8-i1) | a producer-property reading (glass Checkbox `checked`) would be producer relief, but no glass relay row and no ruling exist, and §0aq names it test-owned and routed here | ESC-W8i-2, unruled | **UNRELIEVED RED** |
| A3 · C2 (S-1) · test:e2e · G-15 pairs · J4 o29 · 844×390 CLS | none at the spec bytes; host-blocked (zone 13.54M) | owner reboot ESC-W8i-3 — an act, not a relief | **UNMEASURED** |

### Register

| severity | claim | receipt | cure |
|---|---|---|---|
| HIGH | G-W8-i1 full-vitest arm RED on C-5 + NG-6, no relief at the spec bytes (third pass, unchanged) | targeted vitest `7 failed \| 42 passed` ×2; ESC-W8i rulings 0 | owner rules ESC-W8i-1/-2; `.i` re-sit cures at the root; full suite ×2 |
| HIGH (verification gap) | S-1 A3/C2, test:e2e, G-15 pairs, J4, 844×390 CLS never measured | zone 13,539,815; guard exit 124 | owner reboot (ESC-W8i-3); RESUME close seat measures; Check 4 |
| MEDIUM | `.i` writable set vs §0aq "Bounds: the named files" | Check 1 row 3; Repair 2 row 3 | settled by the ESC-W8i-1/-2 ruling |
| MINOR | `demo/DESIGN.md:248,258` stale `btn-interactive` canon | Close R5 | X-W10 |
| INFO | 7 root-barrel imports, no subpath at 10.1.0 | 68-key map | BK relay `alert-skeleton-subpaths` |

**Honest-RED (relieved)**: ink D6/T-35 ×5 → O-62 (a) · DOCK-SCROLL-MORPH → O-55. **Unrelieved**: C-5 · NG-6. **Unmeasured**: A3 · C2 · test:e2e · G-15 pairs · J4 · 844×390 CLS.

### Successors

X-W9 (`Opens after` X-W0) unaffected. X-W10 "X-W5…X-W9 stable": X-W8 conjunct RED → lawfully BLOCKED. X-W11 "X-W0…X-W10 IMPLEMENTED": X-W8 PARTIAL → lawfully BLOCKED.

**Verdict: NOT-CONFORMANT** — 17/17 claimed GREENs reproduce; bounds, E-3, mail, masking, families clean; C-5/NG-6 HIGH unrelieved; S-1 + heavy arms unmeasured (host zone ≥ 13M). Further check/repair rounds cannot move this row until the owner rules ESC-W8i-1/-2 and reboots (ESC-W8i-3). LEDGER status not promoted; event line appended.
