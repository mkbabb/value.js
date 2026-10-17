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

