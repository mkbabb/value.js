SERVED MODEL: claude-opus-5-5

# X-W7R — value.js repins glass-ui ^7.0.0 → 10.0.1 — execution record

Spec: `docs/tranches/X/waves/W7R.md` (12 lines, read whole). Authority: COHESION §0bs (minting ruling), §0bt (ADJACENT-LINE RULE; order X-W7 → **X-W7R** → X-W12), §0bz (OA-48 → X-W7R `.d`), §0cb R-5 (10.0.1 cures no docket row by credit; the repin retires stale pin surface; a landing repin wave is minted when BL names 11.0.0).

## Open

- **Date**: 2026-09-23 (seat 0, `claude-opus-5-5`; execution under the 2026-09-17 begin-word).
- **Crash-recovery**: `git status --porcelain` → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` · `?? test/css/equivalence/` — none inside X-W7R's writable set (dev.sh = standing unowned row; the other two belong to sibling tracks). 0 inherited edits.
- **Precondition "X-W7 CLOSED"**: LEDGER row X-W7 → `CLOSED 2026-09-17 (honest-RED: G3, G11, G14-grep, CI-npm-test C-5/NG-6)`, promoted at CHECK 1 RESUME round 3 (commit `a994800c` = HEAD). **MET.** G14-grep is honest-RED routed *to this wave* (§0bt: "G14 dismiss grep (discharged at X-W7R)").
- **Producer**: `npm view @mkbabb/glass-ui dist-tags` → `{ latest: '10.0.1' }`; glass CHANGELOG headings `## 10.0.1 — 2026-09-22` (:3) · `## 10.0.0 — 2026-09-22` (:27) · `## 9.0.0 — 2026-08-29` (:207) · `## 8.0.0 — 2026-08-09` (:310).
- **Spec shape note**: W7R.md carries no §File Bounds / §Gates table; the writable sets below derive from its unit text + §0bs "migrate each consumer at the root" + the measured consumer surface (`grep -rl "@mkbabb/glass-ui" demo src e2e test scripts api` → demo 86 · e2e 10 · scripts 1 [`scripts/ci/oracle-slate.mjs`]; config: `vite.config.ts`, `tsconfig.json`, `tsconfig.demo.json`, `tsconfig.lib.json`). Edits beyond them ride the §0bt ADJACENT-LINE RULE.

### E13 Step-0 mail sweep (2026-09-23)
- Newest glass tranche dir by mtime: **BL** (BL has no `coordination/`; BK/coordination is where outbound lands — confirmed still the live coordination path). Last glass commits `7362b3bf` (= I-44) · `26f92470` (glass-internal cursor) · `9831f0e4` (= I-43).
- `find <four paths + glass BL> -newer INBOX.md -type f` → only glass-internal BL audit captures (`BL/audit/captures/R3-02/*`, `BL/design/structure/pass-1/SPECS.md`) — not addressed to value.js.
- value.js V/ + V/coordination newest = INBOX.md itself; keyframes V/coordination newest `INBOUND-LEDGER.md` (rowed); atlas P newest 2026-07-27 (rowed).
- **Result: 0 unrowed, 0 new UNREAD.** Ledger tail I-44 (READ; awaiting BL's outbound reply). Sweep line appended to INBOX.md.

## Baseline (read-only, 2026-09-23, HEAD `a994800c`, load avg 18.19/32.89/39.27)

| gate | owner | command | BEFORE | expected after |
|---|---|---|---|---|
| B1 pin exact 10.0.1 | `.m` | `grep -n '"@mkbabb/glass-ui"' package.json` + lock `node_modules/@mkbabb/glass-ui` version | **RED** — `88: "@mkbabb/glass-ui": "^7.0.0"`; lock `"version": "7.0.0"`; installed `7.0.0` | `"10.0.1"` exact, lock + installed 10.0.1 |
| B2 G14 dismiss grep (W7.md §G14, honest-RED routed here by §0bt) | `.m` | `grep -rn 'dismiss="deliberate"' demo/ \| grep -v node_modules \| wc -l` | **RED** — `0` (and `grep -rn 'dismiss=' demo/` → 0) | ≥ the four destructive seats, with the W7 G14 network oracles still GREEN |
| B3 vue-tsc demo | `.m` | `npx vue-tsc -p tsconfig.demo.json --noEmit` ×2 | GREEN-at-7.0.0 — EXIT 0 ×2 (5.06 s) | EXIT 0 ×2 at 10.0.1 |
| B4 vitest | `.m` | `npx vitest run` | `Test Files 2 failed \| 67 passed (69)` · `Tests 2 failed \| 910 passed (912)` — the 2 are the banked honest-RED C-5 (`test/spectrum-luma.test.ts`, → X-W4 R23/X-W8 .i) and NG-6 (`demo/test/shell/reka-binding-idiom.test.ts`, → X-W8 .i) | the same 2 honest-RED only; 0 new failures |
| B5 smoke `--workers=1` with load | `.m` | `npx playwright test <smoke projects> --workers=1` | cited, not re-run at open (probe parsimony §5.2): X-W7 CHECK 1 RESUME round 3 reproduced browser 47/47 at 7.0.0 | GREEN at 10.0.1 with load avg recorded |
| B6 D1 headed real-GPU ×2 | `.m` | the X-W5 D1 headed read ×2 | cited: X-W5 honest-RED `D1 headless`; headed read owed at 10.0.1 | headed ×2 recorded |
| B7 glass-row re-read table | `.v` | served `:9000` headed | not yet measured (rows open at 7.0.0: DOCK-SCROLL-MORPH · DOCK-MORPH-ROOT · I3-SEED-SIZE · G3-FALLTHROUGH-TYPES · O12-3-HOVER-GPU · O-56 G-3 blob · O-57 R-2 `.cartoon-cast`) | each CURED-BY-REPIN (evidence) or still-live (stays with BL) |
| B8 OA-41/OA-48 dock morph | `.d` | served headed frame series | RED by owner docket (OA-41, OA-48; KFA-53 blur held through settle at 7.0.0) | 0 blurred-text frames after settle, no wrap-then-snap, token durations — or BL-owned residue with the 10.0.1 measurement |

Green-before-cure: none among the cure gates (B1, B2 RED; B3/B4 are regression floors, GREEN by design).
Note (§0cb R-5): 10.0.1 is not credited in advance as curing any glass row; `.v` reads each at the bytes.

## Unit plan

Strictly serial (W7R.md "Units (serial)"; orchestrator note): **[X.W7R.m] → [X.W7R.v] → [X.W7R.d]**. 3 units, every seat Opus 5.5 (`opus`). ESCALATED units do not halt the wave. Pathspec commits only; never `scripts/dev/dev.sh`.

| unit | model | spec | writable | gates | locks |
|---|---|---|---|---|---|
| `X.W7R.m` | opus (effort high) | W7R.md §Units `.m` (:10); §Why (:6-7); COHESION §0bs, §0bt (G14 discharge), §0cb R-5 | `package.json` · `package-lock.json` · `demo/**` · `e2e/**` · `scripts/ci/oracle-slate.mjs` · `vite.config.ts` · `tsconfig.json` · `tsconfig.demo.json` · `tsconfig.lib.json` · record · `docs/tranches/X/evidence/X-W7R/**` | B1 · B2 (+ W7 G14 network oracles GREEN) · B3 ×2 · B4 · B5 · B6 ×2 | pin + lock + migration = one commit family (never a pin commit that leaves demo RED); no shims, no deep imports, no node_modules patch; glass-ui READ-ONLY |
| `X.W7R.v` | opus | W7R.md §Units `.v` (:11); §0cb R-5 | record · `docs/tranches/X/evidence/X-W7R/**` · (new relay only if a row is new) `docs/tranches/V/coordination/INBOX.md` append | B7 (table of 7 ids, each CURED-BY-REPIN w/ evidence or still-live → BL) | VERIFY-ONLY on product bytes; bounded headed probes; the G3 strict probe count at 10.0.1 |
| `X.W7R.d` | opus | W7R.md §Units `.d` (:12); COHESION §0bs (OA-41), §0bz (OA-48) | `demo/@/components/custom/dock/**` · `demo/styles/**` · record · `docs/tranches/X/evidence/X-W7R/**` | B8 (0 blurred-text frames after settle, no wrap-then-snap, token durations) ×2 headed | consumer-side only; any glass-owned residue → BL with the 10.0.1 measurement (relay row, not a frontend hack) |

### Briefs
- **`.m`**: Read glass CHANGELOG `../glass-ui/CHANGELOG.md` :1-≈420 (10.0.1, 10.0.0, 9.0.0, 8.0.0) + any migration notes whole. Pin `"@mkbabb/glass-ui": "10.0.1"` exact (devDependency position as-is), `npm install`, lock at 10.0.1. Migrate each breaking change at its consumer root: the dismiss axis (`dismiss="deliberate"` at the four W7 destructive seats → discharges G14 grep), dock API, surface classes, renamed exports, Button `emphasis`/`tone`. No shims/deep imports. vue-tsc demo 0 ×2; vitest = the 2 banked honest-RED only; smoke `--workers=1` with load recorded; D1 headed real-GPU ×2. One commit family; receipt lists adjacent edits.
- **`.v`**: Serve `:9000` headed at 10.0.1. Re-read each glass-owned honest-RED/relay id — DOCK-SCROLL-MORPH, DOCK-MORPH-ROOT, I3-SEED-SIZE (shader-free derive at 10.0.1?), G3-FALLTHROUGH-TYPES (strict probe count), O12-3-HOVER-GPU, O-56 G-3 blob, O-57 R-2 `.cartoon-cast`. Each → CURED-BY-REPIN (frame/count evidence under `evidence/X-W7R/`) or still-live (stays with BL). Table in the record. No credit by presumption (§0cb R-5). Product bytes read-only.
- **`.d`**: OA-41/OA-48 at 10.0.1 on value.js's dock: headed frame series of small↔large morph ×2; measure blurred-text frames after settle (0), wrap-then-snap (none), durations on tokens. Cure consumer-side causes at the root in the dock dir; what still fails is BL's — record the 10.0.1 measurement and relay row. Receipt with frames.

## Unit receipts


### X.W7R.m

SERVED MODEL: claude-opus-5-5 · seat 2026-09-23 · effort high · spec W7R.md §Units `.m` (:10) read whole; COHESION §0bs/§0bt/§0cb R-5 consumed.

**Crash-recovery.** ⟨`git status --porcelain`⟩ → ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M scripts/dev/dev.sh` · `?? docs/tranches/X/keyframes/evidence/W13U/repair-c4/` · `?? test/css/equivalence/` — 0 paths inside this unit's writable set; 0 inherited edits. (Mid-seat a sibling track staged `test/css/equivalence/** → bench/css-equivalence/**` renames in the shared index; untouched — every commit here is pathspec.)

**Producer read.** `../glass-ui/CHANGELOG.md` 10.0.1 (:3) · 10.0.0 (:27) · 9.0.0 (:207) · 8.0.0 (:310); `../glass-ui/MIGRATION.md` §10.0.0 (:8) · §9.0.0 (:376) · §8.1.0 (:580) · §8.0.0 (:731-1516) — the break tables read at the bytes; every consumer edge was then located by measurement, not by the notes alone (three independent instruments: `vue-tsc` for import/type breaks; a token diff — every `--name` the consumer reads that glass `v7.0.0:src` declared and the installed 10.0.1 `dist` does not — for CSS-contract breaks; the build/test runs for runtime/utility breaks).

#### Acts, in order

1. **Pin.** `package.json:88` `"@mkbabb/glass-ui": "^7.0.0"` → `"10.0.1"` (exact, devDependency position kept); ⟨`npm install`⟩ → `changed 1 package`; lock `node_modules/@mkbabb/glass-ui` `7.0.0` → `10.0.1` (`integrity sha512-cevbnaY/…`), peer set now `vue-component-type-helpers ^3.0.3` (present) and no `embla`/`pencil-boil`; ⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `10.0.1`.
2. **Type/import breaks** — ⟨`npx vue-tsc -p tsconfig.demo.json --noEmit`⟩ at the bare repin → EXIT 2, **16 × TS2307**, three removed doors:
   - `@mkbabb/glass-ui/watercolor-dot` (11 importers) — glass MIGRATION §8.0.0 *Deleted — WatercolorDot*: "the ornament itself RELOCATED to value.js … copy … out of your pinned 7.0.0 package and into your own tree". Relocated whole from `git -C ../glass-ui show v7.0.0:src/components/watercolor-dot/*` into **`demo/shared/ui/watercolor-dot/`** (`WatercolorDot.vue` byte-identical but for one comment · `useWatercolorBlob.ts` with `useRAFLoop` re-pointed to the public `@mkbabb/glass-ui/motion-core` door · `prng.ts` = glass's `mulberry32`/`hashString` leaf + the two border-radius helpers · `index.ts` exporting `WatercolorDot` only). The 11 importers re-point to the relative path (the demo's convention; `PaneHeader`/`EmptyState` precedent). No shim: nothing re-exports under the old name, no deep import. `.watercolor-swatch` / `data-testid="watercolor-swatch"` unchanged, so `o15-dock-register` / `o14-preview-truth` read the same DOM.
   - `@mkbabb/glass-ui/search` (4 files, 5 sites) — §9.0.0: `SearchBar` DELETED, "the `.input-bar` recipe … composes with your own input element". Each site now composes `<div class="input-bar search-seated">` (the slug bar: `<form class="input-bar">` with `@submit.prevent` on the form itself) + lucide `Search`/`LogIn` glyph at `size-(--search-icon-size)` + `<input type="search" class="input-bar-field">` carrying its own `v-model`/`aria-label`/`placeholder`; slotted controls stay as siblings. The slug bar's `searchBarRef.value?.inputRef` becomes a direct `slugInputRef` on the input. Precedent: `PaletteRenameInput.vue` already composed the recipe this way.
   - `@mkbabb/glass-ui/forms` (`demo/ui/input/index.ts:1`) — §8.0.0 export re-cut: `./forms` → `./input`.
   After: ⟨`npx vue-tsc -p tsconfig.demo.json --noEmit`⟩ → EXIT 0.
3. **Template-prop breaks (silent — `vue-tsc` does not type templates strictly here, so each was read off the 10.0.1 `.d.ts`).**
   - **The dismiss axis (discharges W7 G14's grep).** 10.0.1 `DialogContent` publishes `dismiss?: "free" | "deliberate" | "locked"` and no `showClose` ("the old boolean close knob folds into it"; `DialogContent.vue.d.ts:3-14`). All six confirm seats carried the 7.0.0 spelling `:show-close="false"` (Esc · outside, no ✕) → **`dismiss="deliberate"`**: `AdminNamesPanel.vue:148` · `AdminTagsPanel.vue:157` · `AdminUsersPanel.vue:211` · `AdminFlaggedPanel.vue:179` · `BrowsePane.vue:187` (Repair 1's fifth seat) · `PalettesPane.vue:124`. Their comments that promised the re-spelling "at the repin" now state it. ⟨`grep -rn 'show-close' demo | wc -l`⟩ → `0`.
   - **Side placement.** `VersionHistoryDrawer.vue:3` `<DialogContent placement="right">` — 10.0.1 `DialogContent` has no `placement`; the side surface is `SheetContent side` (§8.0.0: Drawer folded whole into Sheet, "`<Dialog>` + `<SheetContent side…>`"). → `<SheetContent side="right">` from `@mkbabb/glass-ui/sheet` inside the same `<Dialog>`.
   - **Dock layer switcher.** `Dock.vue:166` `:show-rail="false"` → `:show-switcher="false"` (§8.0.0 *The dock's "rail" vocabulary is struck*; same boolean, same default).
   - **Layer fight.** `MigratePalettesDialog.vue:3` drops `rounded-dialog` — §10.0.0 names this exact class: under `@layer components` it now beats the library's dialog corner (24 → 16 px); the seven other dialog seats carry no corner class, so the one seat that fought the register stops fighting it.
4. **CSS-contract breaks (token diff).** ⟨names read in `demo e2e scripts/ci/oracle-slate.mjs` ∩ declared in glass `v7.0.0:src` − present in 10.0.1 `dist`⟩ → 36 names; minus the relocated `--watercolor-*` (6), the consumer-declared `--seal-ink`, bare prefixes and comment-only mentions, the live reads and their migrations:
   - `--radius-input` → `--radius-media` (§8.0.0 table: "byte-for-byte the same value") — `GradientEasingEditor.vue:321`.
   - `--ease-spring`, `--spring-snappy`, `--spring-smooth`, `--spring-bouncy` (+ `-duration`) → **`--spring-present`** (§8.0.0 *The `--ease-spring-*` family went whole*: "`--ease-spring` and `--ease-spring-snappy` were `--spring-snappy`, which is now `--spring-present` (or `--spring-dock` for dock motion); `-smooth` and `-bouncy` also land on `--spring-present`") — `animations.css`, `overture.css`, `ColorPicker.vue`, `PaneSlot.vue`, `ColorInput.vue`, `CurrentPaletteEditor.vue`, `GradientStopEditor.vue`, `ImageEyedropper.vue:308`, `DESIGN.md`; **`Dock.vue`'s `vj-settle` → `--spring-dock`** (dock motion). The two oracles that resolve the rule's own token re-point with it (`o16-computed-cascade.spec.ts` reads `--spring-present-duration`; `cold-nav-scene-enter.spec.ts` comment).
   - `--slider-track-bg` → `--glass-slider-track-background` (§8.0.0 *The Slider/Progress track seam is typed and split*: "Old Slider writers … move to"; `background` grammar) — `ComponentSliders.vue`, `ConfigSliderPane.vue`, `ExtractControls.vue`, `GenerateControls.vue`, `DESIGN.md`; oracle/comment lines in `o18-contrast-census.spec.ts`, `a11y-select-title.spec.ts`.
   - `--glass-bg-{resting,floating,quiet}` readers → `--glass-plate-{resting,floating,quiet}` (0 declarations of the old names at 10.0.1; the plate rungs are the colour-valued rung fills `glass-plate` composes) — `picker/header.css:62`, `PaneHeader.vue:101`, `useContrastSafeColor.ts:51-52` (the live contrast probe's `TIER_BG_TOKEN`), `o18-contrast-census.spec.ts:531,852` (the same probe).
   - `ComponentSliders.vue` `.sliders-console` wrote `--glass-bg-quiet: color-mix(card 42%/50%)` to lower the veil's α one step; at 10.0.1 `[data-surface="veil"]` sets `--glass-veil-tier: var(--glass-veil-quiet)` and `glass-plate` reads the tier → **`--glass-veil-tier: var(--glass-veil-wash)`** (the ladder's own next-lower rung; it re-resolves per scheme, so the `.dark` arm folds away).
5. **Utility breaks (build).** ⟨`npx vite build --mode gh-pages`⟩ → `BUILD_EXIT 1`, `Cannot apply unknown utility class 'text-xs'` (`Markdown.vue`) — glass `theme/bridges.css` sets `--text-xs: initial; --text-sm: initial` (glass `35a30fbb`, BJ.W-TYPE-CODEMOD: "a residual `text-sm`/`text-xs` [is] a BUILD-VISIBLE unknown utility … the codemod migrated every call-site onto the named √φ rungs"; **no MIGRATION row** — relay item, below). This also broke the e2e perf `webServer` (it builds `dist/gh-pages`), which is why the first smoke launch exited before test 1. Migrated onto the named rungs by glass's own codemod map (`text-sm → text-small`, `text-xs → text-caption`): `Markdown.vue:241,366,372,377`, `ColorInput.vue:354`, `ActionFeedback.vue:8` (template class — silently unstyled otherwise). After: `BUILD_EXIT 0`.
6. **Runtime breaks the unit tests caught.** ⟨`npx vitest run`⟩ at acts 1-5 → 4 files / 6 tests failed + 1 unhandled error; beyond the 2 banked ids:
   - `demo/test/extract/extract-controls.test.ts` ×3 — 10.0.1 `DockControl` keeps a disabled control PRESENT and FOCUSABLE via `aria-disabled` ("never the native `disabled` stamp", `DockControl.vue.d.ts:41-47`). The three assertions re-read the producer's disabled contract (`aria-disabled === "true"` / `not.toBe("true")`); no assertion removed.
   - `demo/test/palettes/admin-destructive.test.ts` — `TypeError: a.value[i]?.scrollIntoView is not a function` (10.0.1's tab strip scrolls the pressed tab into view; jsdom ships no `Element.prototype.scrollIntoView`). The suite already stubs jsdom's missing `matchMedia`/`ResizeObserver` in its `beforeEach`; the same idiom adds a no-op `scrollIntoView` and deletes it in `afterEach`.
   - `demo/test/generate/generate-rail.test.ts` EC-10 — a 5 s timeout on the cold dynamic import at load 209.50; ⟨`--testTimeout=60000`⟩ → 2/2 in 4.18 s. Load, not the repin (the X-W1 readiness watch); nothing edited.
7. **Dock posture (from the smoke run).** 10.0.1 `GlassDock` folds `startCollapsed`/`alwaysExpanded`/`collapseDelay` onto `collapse: false | "closed" | "open"` (MIGRATION §9.0.0 *`GlassDock`'s props fold onto `collapse`*; `collapseDelay` → "Drop it. Every dock idles for one window, 3600 ms"). The dock mounted COLLAPSED ("Expand dock"), so `Select view`, `Profile` and the status lamp were absent. `Dock.vue:159-165` → `:collapse="isDesktop ? 'open' : false"`; `ConfigSliderPane.vue:164` `:always-expanded="true"` → `:collapse="false"`. Found by a strict-props probe (`vueCompilerOptions.checkUnknownProps` in a scratch tsconfig, isolated tree): 161 TS2353, of which the removed PROPS were these two plus `Card :grain` (`ComponentSliders.vue:29`, removed library-wide at 8.0.0 → dropped) and `EasingPicker :readout` (`EasingAuthoringStage.vue:98`; glass `1bc09dde` cut EasingPicker's 7 props to 4, no successor → dropped). The rest are attribute fallthrough (`aria-*`, `data-*`, `title`) or were already inert at 7.0.0 (`Slider size`, `Button variant` = §0cb G-2, X-W12's).
8. **Motion by intent (o16's exit law).** Mapping every retired rung to `--spring-present` (0.2 s settle) made the pane-swap ENTER equal its LEAVE (0.2 = 0.2, o16 "exit law: leave < enter"). §8.0.0 says the old spellings "map by intent, not by name": the pane swap (animations.css, 0.44 s `--spring-snappy`) and the overture plate-land (440 ms) are panel travel → **`--spring-panel`** (0.45 s settle); the overture dock entrance → `--spring-dock`; o16's R2 leg and `cold-nav-scene-enter`'s comment re-point with the rule. o16 then GREEN.
9. **Oracle file moved.** `a11y-select-title.spec.ts` B3 read the producer's slider vocabulary from `dist/glass-ui.css`; 10.0.1 ships it at `dist/components/slider/styles.css` (0 `--slider-*` names left in `glass-ui.css`). Re-pointed; B3 GREEN.
10. **Instrument isolation.** Mid-seat a sibling track rewrote `src/css/**` (`D src/css/grammar.ts`, new `src/css/bbnf/*`), which the demo imports; the first two smoke launches ran on that moving tree (vite HMR "Failed to reload" storms, `PaneChunkError: Failed to fetch dynamically imported module`) and were stopped as non-readings. Every gate reading below comes from **isolated trees** under the scratchpad: `iso` = ⟨`git archive HEAD | tar -x`⟩ at `56394291` + this unit's paths (⟨`npm ci`⟩ → glass `10.0.1`); `base` = the same archive untouched (glass `7.0.0`). `api/node_modules` symlinked read-only for `vue-tsc`.

#### THE STOP — a HIGH the repin introduces that no consumer-root cure in this unit's grant reaches

⟨headless probe, `iso` dev server, `/#/?space=oklch&color=oklch(0.55 0.18 260)` with a stored green⟩ → `main` absent; console `[value.js] unhandled failure (vue · setup function) Error: Ink certification failed: contrast_unreachable at certify (demo/color-session/ink.ts:66) ← resolveMutedInk (ink.ts:116) ← ConsoleRail.vue:48`. The same URL on `base` (7.0.0) boots clean. This is why `url-color-precedence`, `webgl-blob-idle` (oklch 0.55 0.37 328) and the O-18 identity leg fail.

Root, measured on the painted elements (⟨`getComputedStyle`⟩, light, `--glass-level: 1` both trees):

| element | 7.0.0 | 10.0.1 |
|---|---|---|
| the resting plate (`.glass-resting.card`) | `oklab(0.928 0.006 0.013 / 0.664)` — a translucent CREAM card | `color(srgb 0.204 0.148 0.083 / 0.14)` — a translucent dark-INK tint |
| the sliders veil (`[data-surface="veil"]`) | `color(srgb 0.954 0.921 0.888 / 0.443)` | `color(srgb 0.204 0.148 0.083 / 0.1)` |

Glass 8's veil ladder paints every rung as `color-mix(in srgb, oklch(from var(--glass-veil-ink) l c h / <rung α>) calc(var(--glass-level) * 100%), var(--card))`, and `--glass-veil-ink` is `oklch(0.17 0.03 70)`: at the demo's `--glass-level: 1` a plate is no longer a cream card but a 10-14 % brown wash over the backdrop. The certified-ink instrument (`useContrastSafeColor.ts` + `ink.ts`, the O-18 contract) composites against that paint and finds no ink that meets its floor, and `certify` throws inside a render (a picker-subtree crash, not a paint delta). Holding the veil at the quiet rung and reverting the act-4 token mapping in `iso` both still throw (probed), so the cause is the material recut itself, not a spelling this unit chose. MIGRATION §8.0.0 states it outright: "The old TINT mix has no hand-composed equivalent: `--glass-bg-resting`, `--glass-tint-source` and `--glass-tint-strength` all have 0 declarations".

Re-deriving value.js's plate material (which `--glass-level`, which rung, whether plates stay cream on the veil ladder) and re-deriving the certified-ink model against it is a **design ruling plus an instrument re-authoring** (the O-18 / ink.ts contract, `ink.ts`'s static 7.0.0 model `PRODUCER_TINTS`), not a rename. The lock says "never a pin commit that leaves demo RED". A render crash is RED. **So the unit does not land.** Per METHOD, I did not substitute a local cure (a try/catch around `certify`, a clamp, a copied producer selector are each a HIGH).

#### Disposition — the family is banked, not committed

- The whole family (pin + lock + 47 tracked files + the 4 relocated `watercolor-dot` files) is one patch: **`docs/tranches/X/evidence/X-W7R/m-repin-10.0.1-migration.patch`** (1965 lines, 51 `diff --git` sections). ⟨`git archive HEAD | tar -x` into a clean dir; `git init`; `git apply --check <patch>`⟩ → `APPLY_CHECK_OK`. Resume: `git apply <patch> && npm install`, then cure THE STOP.
- The working tree is restored for exactly this unit's paths: ⟨`git checkout -- <the 47 paths>`; `rm -r demo/shared/ui/watercolor-dot`; `npm install`⟩ → glass `7.0.0` installed; ⟨`git status --porcelain -- package.json package-lock.json demo e2e`⟩ → empty; ⟨`npx vue-tsc -p tsconfig.demo.json --noEmit`⟩ → EXIT 0. No sibling path touched; nothing staged by this seat except the record + evidence commit.
- Smoke classification: `docs/tranches/X/evidence/X-W7R/m-smoke-classification.md`. D1 frames: `m-D1-headed-run{1,2}.json`.

#### Gates (BEFORE → AFTER; readings at the patch bytes in `iso` unless marked)

| gate | before | at the patch | on the tree after restore |
|---|---|---|---|
| B1 pin | RED `^7.0.0` / 7.0.0 | GREEN `"10.0.1"` exact · lock `10.0.1` · installed `10.0.1` | RED (restored; not landed) |
| B2 G14 dismiss grep | RED 0 | GREEN — `dismiss="deliberate"` ×6 (the four Admin seats + BrowsePane + PalettesPane); W7 G14 network oracle `w7-destructive-seats` passed in the `iso` full run (not in the 71 failures) | RED 0 (not landed) |
| B3 vue-tsc demo ×2 | EXIT 0 ×2 | ⟨`npx vue-tsc -p tsconfig.demo.json --noEmit`⟩ ×2 → EXIT 0 ×2 (0 errors) | EXIT 0 |
| B4 vitest | 910/912, the 2 banked | ⟨`npx vitest run`⟩ → `Test Files 2 failed \| 65 passed (67)` · `Tests 2 failed \| 908 passed (910)` — only C-5 `spectrum-luma` + NG-6 `reka-binding-idiom`; 0 new (the 912→910 count delta is the sibling's `test/css/equivalence/**` → `bench/**` move, absent from the `iso` archive) | unchanged |
| B5 smoke `--workers=1` | cited 47/47 subset | **RED**: full 281 → `71 failed · 2 skipped · 1 did not run · 207 passed` (43.8 m, load 59.50→21.73); of the 71, **45 fail on `base` 7.0.0 too** (pre-existing at HEAD; the smoke suite is not GREEN at 7.0.0), after the in-seat cures **15 remain repin regressions** (listed in the classification file; THE STOP drives the O-18/url-color/blob rows) | n/a |
| B6 D1 headed real GPU ×2 | cited | GREEN ×2 — `PROBE_HEADED=1` against a `vite build --mode gh-pages` of the MAIN tree at 10.0.1 (renderer `ANGLE Metal, Apple M5 Max`; `pass: true` ×2; →/gradient 2/47 · 1/50, →/extract 0/54 · 1/54, →/mix 0/53 · 0/54, →/generate 0/54 · 1/54, median 17 ms all hops, animated true; load at launch 73.89 / 73.5). Caveat: that build carried the sibling's in-flight `src/css/**`, so it is a reading of the repin's scene-swap budget, not of the patch bytes alone | n/a |

#### Residuals (all measured at 10.0.1; none cured by the repin itself, §0cb R-5)

- **RES-m-1 (THE STOP)** — the plate/veil material recut vs value.js's certified-ink instrument → render crash (`contrast_unreachable`) + the O-18 rows (About prose 2.91:1 on the probed rung ground; identity leg C 0.009 < 0.037). Needs a design ruling on value.js's plate material at 10.0.1 and a re-derivation of `useContrastSafeColor.ts` / `ink.ts` (`TIER_BG_TOKEN`, `PRODUCER_TINTS`); the patch's act-4 mapping `--glass-bg-* → --glass-plate-*` is an interim spelling that must be re-judged in that re-derivation.
- **RES-m-2** — `--glass-tint-source` / `--glass-tint-strength` (`foundation.css:282-283,793,829`; `a11y-modality-support` BR-6/7 read the consumer's own root declaration): glass removed the frost-tint channel with "no hand-composed equivalent"; the accent temperature on the glass is lost at 10.0.1. Design ruling (with RES-m-1).
- **RES-m-3** — `--dropdown-menu-font` (`foundation.css:428`) has 0 occurrences in 10.0.1 (removed with no MIGRATION row); DropdownMenu panels lose the mono voice. Same shape as the Select half already ruled at X.W5.b N13 (delete-or-ask). Producer seam ask → BL.
- **RES-m-4** — `--slider-thumb-bg` / `--slider-thumb-border-color` (the value-aware thumb feed in `ComponentSliders.vue:201-202`): 10.0.1's spectrum thumb paints `background: transparent; border: 2px solid var(--background)` with no seam; reaching `.slider-thumb` from the consumer would be a copied producer selector. Producer seam ask → BL.
- **RES-m-5** — the O-7 census reads the producer's `data-tier` / `data-grain` stamps; 10.0.1 `Surface`/`Card` stamp neither (tier is a class; grain is gone library-wide). The oracle's instrument needs re-authoring (its grain leg has no subject left) — an oracle-contract change, not an adjacent line.
- **RES-m-6** — `views/gradient.spec.ts:612` (e1) requires the dated aurora ask to name the INSTALLED glass version; the ask (`W6` evidence, dated 2026-09-22, "7.0.0") is immutable (E-3) and outside this grant → a dated addendum by the ask's owner at the landing.
- **RES-m-7** — the remaining smoke regressions without a diagnosed root in this seat: `o15-dock-register:87` (Tools hover capsule shadow `none` at settled rest), `readout-seam:86,150` (two painted lines at the reference color), `w7-inspector-rows:86` (the Edit-tags dialog checkbox never "stable" — a continuous transform), `mobile/blob-presence-mobile:56` (`scrollWidth` 406 vs 390 at the phone band), `reactivity-instant:42` (2 s wait under load; timing class). Each is listed with its reproduction in the classification file.
- **Glass relay items (for `.v`/BL, not filed by this seat)** — the `text-xs`/`text-sm` un-registration (glass `35a30fbb`) and the `DialogContent` `placement`/`showClose` fold into `SheetContent side` / `dismiss` both shipped with NO MIGRATION row; `--dropdown-menu-font` and the slider-thumb seams (RES-m-3/4) likewise.
- **Adjacent edits (in the banked patch only; none landed)**: `demo/test/extract/extract-controls.test.ts:53-78` (the producer's `aria-disabled` contract), `demo/test/palettes/admin-destructive.test.ts:89-99` (jsdom `scrollIntoView` stub, the suite's own idiom), `e2e/smoke/a11y-select-title.spec.ts:520-525` (the producer stylesheet path), `e2e/smoke/oracles/o16-computed-cascade.spec.ts` R2 leg + `cold-nav-scene-enter.spec.ts:43` (the rule's token re-pointed with the rule), `o18-contrast-census.spec.ts:531,852` (the probe token, see RES-m-1).

#### Escalation

**ESC-W7Rm-1 (ESCALATED, HIGH).** The specified cure cannot land at the bytes: glass 8's veil-ladder material recut turns value.js's resting plates and the sliders veil from translucent cream (α 0.66 / 0.44) into a 10-14 % dark-ink wash at the demo's `--glass-level: 1`. The certified-ink instrument then throws in render (`contrast_unreachable`, `ConsoleRail.vue:48` → `ink.ts:116`). That is a picker crash on 10.0.1 that the 7.0.0 tree does not have. The lock forbids a pin commit that leaves demo RED, and no consumer-root rename in this grant reaches the cause. Asks: (1) a design ruling on value.js's plate material on the 10.0.1 veil ladder (the `--glass-level` / rung / cream-plate question, together with RES-m-2); (2) a grant for re-deriving `demo/color-session/{useContrastSafeColor,ink}.ts` and re-authoring the O-7/O-18 oracles to the 10.0.1 stamps; (3) BL relay of RES-m-3/4 and the missing MIGRATION rows. After those, re-apply the banked patch (APPLY_CHECK_OK at HEAD `56394291`) and re-read B1–B6. `.v` and `.d` can read their rows on an `iso`-style tree built from the patch, but the served app crashes at some picks until RES-m-1 is cured.

### X.W7R.v

SERVED MODEL: claude-opus-5-5 · seat 2026-09-23 · spec W7R.md §Units `.v` (:11) read whole (16 lines, incl. the §0cf addendum); COHESION §0cb R-5 (:3134), §0cf (GLASS-VEIL-GREY rider) and §0bs..§0ch read; `.m`'s receipt (ESC-W7Rm-1) consumed.

**Crash-recovery.** ⟨`git status --porcelain`⟩ → ` M .github/workflows/ci.yml` · ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M docs/tranches/X/execution/C/F-W14.md` · ` M scripts/dev/dev.sh` · `?? docs/tranches/X/keyframes/evidence/W13R/` · `?? docs/tranches/X/parse-that/evidence/W7-research/` — 0 paths inside this unit's writable set; 0 inherited edits.

**E13 mail.** ⟨`find glass BK/coordination, glass BL, value V/coordination, keyframes V/coordination -newer INBOX.md -type f`⟩ (glass-internal `audit/captures` excluded) → 0 files; ⟨`grep -n UNREAD INBOX.md | tail`⟩ → only sweep lines; ledger tail I-46 (READ). **0 UNREAD in scope.** Sweep line appended to INBOX.md.

**The precondition drift (recorded, INTENT kept at the true bytes).** The brief says "serve `:9000` headed at glass 10.0.1". At the bytes: (1) `.m` did NOT land the repin (ESC-W7Rm-1) — the product tree installs glass **7.0.0** (`package.json:88` `^7.0.0`), so no row can read CURED-BY-REPIN on the served product; (2) `:9000` is held by another process on the main tree (⟨`ps -o command= -p 50026`⟩ → `node …/value.js/node_modules/.bin/vite --port 9000 --strictPort`) and did not answer (`page.goto` 30 s timeout, `curl` hung) — not this seat's server, not restarted. INTENT at the true bytes: every row was measured on **two served isolated trees side by side, headed, real GPU** — `iso` = `git archive 56394291` + `evidence/X-W7R/m-repin-10.0.1-migration.patch` (the banked `.m` family, glass **10.0.1** installed, ⟨`node -p require('…/glass-ui/package.json').version`⟩ → `10.0.1`) on `:9017`, and `base` = the same archive untouched (glass **7.0.0**) on `:9018`; both are `.m`'s own instrument trees (scratchpad, product bytes untouched; ⟨`find iso/demo iso/e2e iso/src -newer m-repin-10.0.1-migration.patch -type f`⟩ → 0, the iso tree still equals the patch bytes). Renderer on every page read: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` (REAL-GPU). Hence the table's verdict vocabulary: **still-live → BL** or **CURED-AT-10.0.1 (patch bytes) — credit only at the landing repin** (§0cb R-5: no credit by presumption; a cure measured at unlanded bytes is not a cure of the product).

#### Acts, in order (⟨cmd⟩ → output; every figure double-run)

1. **G3 strict probe count.** ⟨`{extends tsconfig.demo.json, vueCompilerOptions.strictTemplates:true}` → `npx vue-tsc -p <probe> --noEmit`⟩ ×2 per tree → `base r1/r2 EXIT 2 · 284 errors / 64 files` (byte-identical outputs; = X-W7's close reading 284/64) · `iso r1/r2 EXIT 2 · 279 errors / 64 files` (byte-identical). Codes: base `276 TS2353 + 8 TS2322`, iso `271 TS2353 + 8 TS2322`. `onClick` ×110 and `title` ×15 unchanged across versions; the Button target type changed only its `tone` spelling (`"success" | …` → `ButtonTone`). Target-type fold: **60** of iso's 271 TS2353 land on *native* element types (`…HTMLAttributes & ReservedProps`, e.g. `App.vue(9,30) 'data-view'`), not on a glass component — see residual RES-v-2. Evidence `v-g3-strict-probe.txt`, `v-g3-iso-r1-diagnostics.txt`.
2. **I3 derive-only seed size.** ⟨glass 10.0.1 `package.json` exports filtered `/aurora|derive/`⟩ → `./aurora` only (no derive-only / shader-free subpath). ⟨`wc -c dist/aurora.js`; `grep -o '#version'`⟩ → `203503 B`, `#version ×3`. ⟨`esbuild --bundle --minify --format=esm` (externals vue, @vueuse/core, @mkbabb/value.js) of `import { deriveAurora, paletteToCssGradient } from "@mkbabb/glass-ui/aurora"`; `gzip -9 | wc -c`⟩ ×2 → **base 7.0.0 52 610 B** ×2 · **iso 10.0.1 52 781 B** ×2, both `#version ×2 · uniform ×81` (the shader sources survive tree-shaking at both versions) vs the 12 288 B budget. Evidence `v-static-reads.txt` §I3.
3. **DOCK-SCROLL-MORPH API read.** ⟨`grep -n '?:' dist/components/dock/composables/useDockShellProps.d.ts`⟩ (10.0.1 `DockProps`) → 6 props: `fitContent · backdropMode · shape · orientation · collapse · backgroundCanvas` — no scroll source / compact-on-scroll input (O-55 R-1); ⟨GlassDock slots⟩ → `persistent · default · collapsed · search` — no rim seat; ⟨`grep -ci dock scroll-progress-rim/types.d.ts`⟩ → `0` (O-55 R-2: the rim is still standalone). Evidence `v-static-reads.txt` §DOCK-SCROLL-MORPH.
4. **O12-3-HOVER-GPU, headed real GPU ×2 at 10.0.1.** The X.W5.c3 instrument of record (`scratchpad/c3-o12-gpu-headed.config.ts`: `channel:"chromium"`, `headless:false`, no swiftshader args, 1280×720, o12 only), re-pointed at the iso tree (`v-o12-headed.config.ts`). ⟨`VJS_E2E_PORT=5297 npx playwright test -c w7rv-o12-headed.config.ts --reporter=line`⟩ ×2 → run 1 `[o12-hover] 1.37/255` · run 2 `1.38/255` against the 6/255 floor (O-12·3 FAILED ×2; ·1+2, ·4 `p50=16.7ms REAL-GPU`, ·5 `ratio 0.999` PASS ×2; `3 passed / 1 failed` ×2; load 8.15→8.00, 8.00→8.76). 7.0.0 of record: 0.30 / 0.53 (X-W5 c3.5). Evidence `v-o12-iso-r{1,2}.txt`.
5. **Served-page probe, headed real GPU, ×2 per tree** (`v-probe.ts`, one bounded session per run: boot `/` light 1440×900 → 8 s emerge/park → cascade walk → dock plate → blob idle → dock morph). ⟨`node w7rv-probe.ts http://localhost:{9017,9018} <label> <out>`⟩ → `v-probe-{iso,base}-r{1,2}.json`, `pageErrors: []` all four.
   - **O-57 R-2 `.cartoon-cast`.** Served cascade selector hits: base 7.0.0 `.cartoon-cast` **4** (all scoped `.liquid-enter.is-cel > .cartoon-cast`, from `demo/styles/foundation.css`'s glass import) · iso 10.0.1 **6** = the same 4 **plus the bare `.cartoon-cast` rules** (`{--cast-travel: calc(6px * var(--motion-weight) * var(--cartoon-press-t…)}`, `{--motion-weight: 0; transition: none}`) ×2 runs; `.cartoon-surface` 1 at both (`v-cartoon-probe.ts` selector dump). Root at the dist: 10.0.1 `./styles` → `styles/index.css` → `@import "./glass.css"` → `@import "./glass/glass-atom.css"` (⟨`grep -c glass-atom dist/styles/glass.css`⟩ → `1`); 7.0.0 ships no `styles/glass.css`, so `glass-atom.css` never entered the consumer's import. **Reachable at 10.0.1.**
   - **O-56 G-3 blob.** Parked hero blob, no pointer, mean-abs frame diff over the bead box at 1 s steps (the o12 D4 metric): base 7.0.0 `1.168, 0.920, 0.827` / `1.244, 0.928, 0.850` · iso 10.0.1 `2.690, 1.732, 1.214` / `2.179, 1.828, 1.354`. 10.0.1 idles ~1.5-2× livelier, and it decays toward the park. Every reading is below the 6/255 visibility floor, so the blob still reads as not animated.
   - **DOCK-MORPH-ROOT (O-56 G-1).** The small↔large morph is driven by `Toggle action bar` (483.5/471.5 ↔ 326 px; located by a trial of the dock's controls, `v-probe.ts:94`). A rAF sampler ran for 1.5 s per transition and counted three things: the dock's rect, descendants with a non-zero `filter: blur`, and text-bearing descendants with a non-unit transform scale.
     - At 10.0.1 ×2, both directions show exactly **1 distinct width** across 91 frames. The first sampled frame already holds the end width, so the box re-sizes in one frame with 0 interpolated frames: `largeToSmall 326`, `smallToLarge 483.5`.
     - `framesBlur 0` and `framesScaledText 0`. The morph is a snap, not a morph, which is glass's measured G-1: "DockCrossfade resizes the box in one frame".
     - 7.0.0 behaves the same: 1 distinct width in 3 of 4 transitions, and the fourth has 2 widths, 471.5 then 326 (a one-step snap).
     - `.d` owns the OA-41 frame series and the timing detail.
6. **GLASS-VEIL-GREY rider (§0cf; `.m` did not record it).** The light-theme `.dock-plate` computed `background-color` was read ×2 per tree:
     - base 7.0.0: `color(srgb 0.931 0.846 0.816 / 0.5392)` with `backdrop-filter: blur(7px) saturate(1.2)`. This is the cream frost. The addendum's 0.328 was read on the main tree, not this archive.
     - iso 10.0.1: `color(srgb 0.204 0.148 0.083 / 0.1)` with `blur(16px) saturate(1.2)`. This is the dark-ink veil, and it composites grey.
     - **The plate turns grey at 10.0.1. Recorded honest-RED `GLASS-VEIL-GREY` (O-62, already relayed §0cf, I-45 banked at glass `2ede8e0e`), with no local override.** It is the same mechanism as `.m`'s THE STOP.

#### B7 — the glass-owned row table (served headed, real GPU; iso 10.0.1 patch bytes vs base 7.0.0)

| id (relay) | instrument | 7.0.0 (base) | 10.0.1 (iso, ×2) | verdict |
|---|---|---|---|---|
| `DOCK-SCROLL-MORPH` (O-55 R-1/R-2) | 10.0.1 `DockProps` / GlassDock slots / rim types | no scroll input; rim standalone | 6 props, none a scroll source; 4 slots, no rim seat; rim types name no dock (0) | **still-live → BL** |
| `DOCK-MORPH-ROOT` (O-56 G-1) | rAF sampler over the `Toggle action bar` small↔large morph | 1 distinct width in 3/4 transitions (one-frame snap) | 1 distinct width ×4 transitions (483.5↔326 in one frame); blur frames 0, scaled-text frames 0 | **still-live → BL** (the box snaps; `.d` holds the OA-41 series) |
| `I3-SEED-SIZE` (O-53 R-1) | exports map + esbuild derive-only seed, gzip -9 | 52 610 B; shaders retained | no derive/shader-free subpath (`./aurora` only); 52 781 B ×2, `#version ×2 · uniform ×81` retained; budget 12 288 B | **still-live → BL** (10.0.1 ships no shader-free derive) |
| `G3-FALLTHROUGH-TYPES` (O-57 R-1) | strict probe (`strictTemplates:true`) `vue-tsc` | 284 / 64 ×2 | **279 / 64** ×2 (−5; `onClick` 110, `title` 15 unchanged) | **still-live → BL** (glass fallthrough still untyped) |
| `O12-3-HOVER-GPU` (X-W8 `.i`; blob mood) | o12 O-12·3 headed real GPU (c3 instrument) | 0.30 / 0.53 of record | **1.37 / 1.38** /255 vs floor 6 | **still-live** (below the floor; row stays with X-W8 `.i` + BL blob) |
| O-56 G-3 blob | parked-blob idle frame diff (D4 metric), 1 s steps | 1.17→0.83 / 1.24→0.85 | 2.69→1.21 / 2.18→1.35 | **still-live → BL** (livelier, still sub-floor and decaying to park; the consumer half, the HeroBlob wall-clock park, is X-W12's) |
| O-57 R-2 `.cartoon-cast` | served-cascade selector walk + dist import chain | 4 hits, all scoped `.liquid-enter.is-cel > …`; bare `.cartoon-cast` unreachable | 6 hits = +2 bare `.cartoon-cast` rules via `styles/index.css → glass.css → glass/glass-atom.css` | **CURED-AT-10.0.1 (patch bytes)**. Not credited: the repin is unlanded (ESC-W7Rm-1, §0cb R-5), so the product stays live at 7.0.0 until the landing repin re-reads it |
| (rider §0cf) `GLASS-VEIL-GREY` (O-62) | light `.dock-plate` computed bg | cream `/ 0.5392` | dark-ink `color(srgb 0.204 0.148 0.083 / 0.1)` | **honest-RED recorded** (the plate turns grey at 10.0.1) |

**B7 reading: 7/7 ids measured at 10.0.1 (×2), each with a verdict and its evidence. 0 are CURED-BY-REPIN on the product, because the repin did not land. At the patch bytes, 1 cures (O-57 R-2) and 6 stay live with BL.** Seat-0's "not yet measured" is now measured.

#### Gates (BEFORE → AFTER)

| gate | before | after |
|---|---|---|
| B7 glass-row table | not measured | **GREEN as an instrument** (the table is complete: 7/7 rows measured ×2, headed on the real GPU, with evidence). By row, 6 are still-live → BL and 1 is CURED-AT-10.0.1 but uncredited. No row is credited CURED-BY-REPIN, because the repin is unlanded (ESC-W7Rm-1). |

Product bytes: 0 touched (⟨`git status --porcelain -- demo src e2e package.json package-lock.json`⟩ → empty). Commits: the record + evidence only, pathspec.

#### Residuals

- **RES-v-1**: the landing repin re-reads this table on the product. The O-57 R-2 cure credits there, and so does the GLASS-VEIL-GREY / THE STOP pair. This rides whatever wave lands the repin (ESC-W7Rm-1's ruling, or the 11.0.0 landing wave per §0cb R-5).
- **RES-v-2 (G3 attribution, for the orchestrator)**: 60 of the 271 strict TS2353 rows at 10.0.1 (59 of 276 at 7.0.0) target *native* element attribute types (`HTMLAttributes & ReservedProps`: `data-view`, `data-testid`, …), not glass components. That share of G3's residual is not glass-owned fallthrough. It is a strict-template / `data-*` typing class on value.js's own markup, and it needs a separate owner before `strictTemplates` can flip even after glass types its surface. Measured, not re-ruled.
- **RES-v-3**: `.m`'s "glass relay items (for `.v`/BL)" are still unfiled: the `text-xs`/`text-sm` un-registration, the `DialogContent` `placement`/`showClose` fold without a MIGRATION row, `--dropdown-menu-font`, and the slider-thumb seams. Filing needs a `docs/tranches/X/relay/` letter plus the glass BK mirror, and both are outside this seat's writable set. They are returned to the orchestrator; no INBOX row was minted without a letter.
- The `:9000` holder (pid 50026, main tree) was unresponsive during the seat and was left untouched.

#### Escalation

None of this seat's own. The unit's verdicts are delivered at the true bytes, and the gap to "CURED-BY-REPIN on the served product" is `.m`'s ESC-W7Rm-1, already escalated.

### X.W7R.d

SERVED MODEL: claude-opus-5-5 · seat 2026-09-23 · spec W7R.md read whole (21 lines, incl. both 2026-09-23 addenda); §Units `.d` (:12); COHESION §0bs OA-41 (:3064), §0bz OA-48 (:3103), §0cb R-5, §0cf, §0ci R-5 (the hold on 7.0.0), §0cj consumed; `.m` and `.v` receipts consumed (ESC-W7Rm-1; `.v`'s DOCK-MORPH-ROOT row hands the OA-41 series to this unit).

**Crash-recovery.** ⟨`git status --porcelain`⟩ → ` M .github/workflows/ci.yml` · ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M docs/tranches/X/execution/C/F-W14.md` · ` M scripts/dev/dev.sh` · `?? docs/tranches/X/keyframes/evidence/W13R/` · `?? docs/tranches/X/parse-that/evidence/W7-research/`. None is inside this unit's writable set, so there are 0 inherited edits.

**Anchor drift (INTENT kept at the true bytes).** The writable set names `demo/@/components/custom/dock/**`, which does not exist: ⟨`ls demo/@`⟩ → `No such file or directory`. ⟨`find demo -iname '*dock*'`⟩ → `demo/shell/dock/` (Dock.vue, ActionBarToggle.vue, DockViewSelect.vue, …). The dock dir at the true bytes is `demo/shell/dock/**`. `demo/styles/**` exists as named. This unit wrote to neither, because no consumer-side cause was found (see below).

**The precondition drift, as `.v` found it.** The product tree is held on glass **7.0.0** by §0ci R-5. The 10.0.1 reading is therefore taken on `.v`'s isolated trees, served headed on the real GPU:
- `iso` = `git archive 56394291` + the banked `m-repin-10.0.1-migration.patch`, with glass 10.0.1 installed, on `:9017`.
- `base` = the same archive at 7.0.0, on `:9018`.
- ⟨`git diff --stat 56394291 HEAD -- demo/shell/dock demo/styles`⟩ → empty. The dock bytes in both trees are HEAD's dock bytes.

#### Acts, in order (⟨cmd⟩ → output; every figure double-run)

1. **The morph's driver, read at the 10.0.1 dist.** ⟨`grep -n 'dock-morph-t\|data-morphing' dist/dock.js`⟩ → `useDockMorph` (:398-437). The small↔large morph is a JS spring that writes `--dock-morph-t` per frame, using the `dock` preset (⟨`springPresets-*.js`⟩ → `response: .3, dampingFraction: .88, settleBand: .02`). The endpoints come from `dockMorphMeasure` (:450-460), which writes `--dock-collapsed-px` / `--dock-expanded-px`. `morph.css` has no authored blur, and `crossfade.css` clip-paths the face content by `--dock-morph-t`. The token is ⟨served `getComputedStyle(.glass-dock)`⟩ → `--spring-dock-duration: calc(0.21s * 1)` at 10.0.1 and `calc(0.19s * 1)` at 7.0.0.
2. **The consumer's surface, read.** ⟨`grep -nE 'blur|filter|will-change|scale\(|transition|animation' demo/shell/dock/**.vue demo/styles/*.css`⟩ finds no consumer rule on `.glass-dock`, `.dock-face*`, `--dock-*-px` or `--dock-morph-t`. The dock-local motion is `.dock-settle`, the view-switch beat, which is not part of this morph. The seal is a fixed-intrinsic `aspect-ratio: 1` composition. Hover rules and `ColorInput`'s drop-shadow are the only other motion.
3. **The instrument**, `evidence/X-W7R/d-morph-probe.ts`. Its method:
   - Headed `chromium`, 1440×900, light theme, 8 s park.
   - A rAF sampler records, per frame, the dock box, its class, `data-morphing` and `--dock-morph-t`.
   - For every visible text leaf and glyph, it also records the ancestor-chain `filter: blur(>0)`, the effective scale, and the line boxes of the leaf's own text nodes.
   - After settle, it clips 4 crops at +0/+120/+300/+600 ms and compares them with a +1500 ms reference by mean-abs diff and by gradient-energy sharpness. A crop reads blurred below 0.95 of the reference.
   - A CDP screencast captures the frame series.
   - Six transitions, one per producer writer: c1 idle-collapse (the first since boot), c1 hover-expand, c2 idle-collapse (the second), c2 click-expand with the pointer resting, c3 outside-click collapse, and c3 click-expand with the pointer leaving at once. The layer morph (Tools ↔ Back) is the cross-read of `.v`'s DOCK-MORPH-ROOT.
   - Two instrument corrections were measured in-seat and are recorded in the probe:
     (a) A free-running sampler starved the producer's idle collapse, and the dock never collapsed in 12 s. The sampler now arms on the dock's first `class` / `data-morphing` mutation.
     (b) A range over an icon+text span counted the icon as a second "line" on `Login`, which gave a false wrap. Line boxes are now read per text node.
4. **Runs** (load avg at launch 8.9 and 31.9): ⟨`node w7rd-probe.ts http://localhost:9017 iso <out>`⟩ ×2 and ⟨`… :9018 base …`⟩ ×2. All four runs reported `ANGLE Metal Renderer: Apple M5 Max` and `pageErrors: []`.
   - Results: `d-result-{iso,base}-r{1,2}.json`, with the per-frame series.
   - Summary: `d-summary.txt`. ⟨`python3 w7rd-table.py`⟩ was run twice, and ⟨`diff`⟩ → `DOUBLE-READ-IDENTICAL`.
   - Frames: `evidence/X-W7R/d-frames/{iso,base}-r{1,2}/`, with 441/442/445/444 screencast JPEGs and 8 settled PNGs per run (44 MB). They stay local and git-excluded (⟨`.git/info/exclude`⟩ += `docs/tranches/X/evidence/X-W7R/d-frames/`), which is the §0ci R-4 frame practice. They are cited here, not committed.
5. **The consumer bisect for the first-collapse snap** (scratch `iso` only, then restored). With Dock.vue's `:collapse="isDesktop ? 'open' : false"` replaced by a constant `collapse="open"`, the first collapse still reads `distinctW 3` (547 ms held at 483 px, then a snap). So the snap is not the consumer's binding.
   - ⟨`w7rd-vars.ts`, the served inline style⟩ at boot → `--dock-collapsed-px: 64px; --dock-expanded-px: 483px`.
   - At the first collapse +150 ms → **`--dock-collapsed-px: 483px`**, width 483.
   - At +1050 ms → `56px`, width 56.
   - The producer's measure caches the root's still-expanded width as the collapsed endpoint when the class flips (`dockMorphMeasure`, `e === "layout" && (o.value ? c = m : l = m)`). The spring therefore travels 483→483, and the box snaps to 56 at settle.
   - At 7.0.0 the same first collapse travels to the stale default 64 px and then snaps 64→56. That is the producer's G-1 "stale endpoint", which 10.0.1 makes worse.

#### B8 — the small↔large morph, headed real GPU ×2 (from `d-summary.txt`, settled bytes)

| measure | 10.0.1 (`iso`, r1 / r2) | 7.0.0 (`base` = the held product, r1 / r2) |
|---|---|---|
| blurred-text frames **after settle** (DOM, text leaves: ancestor `blur(>0)`) | **0** in all 8 transitions per run (6 small↔large + 2 layer), ×2 runs | 0 in all 8 per run, ×2 runs |
| blurred crops after settle (sharpness < 0.95 of the +1500 ms ref) | **0 / 24 · 0 / 24** (min ratio 0.977 / 0.978) | 0 / 24 · **3 / 24** (r2 c2 idle-collapse: 0.942-0.950, the post-settle softness of OA-41/OA-48) |
| blurred-text frames **during** the morph | 0 in every transition | 6 (collapse) / 4 (expand) per transition, both runs (glass 7.0.0's authored morph blur, KFA-53) |
| wrap frames / wrap-then-snap | **0 / none** in every transition ×2 | 0 / none ×2 |
| scaled text after settle, pointer off the dock | **0** | 0 |
| scaled text after settle, pointer resting on the dock (c1 hover, c2 click-rest) | 42 / 46 frames, `dock-icon-button.glass-specular-track` Tools @ **1.098-1.100**. This is the producer DockControl hover lift under the resting pointer, not morph residue: the crop sharpness holds at 0.977-1.009 | 45 / 49, same lift |
| distinct widths, first collapse since boot | **3**: held 483 px for 547 / 550 ms, then a one-frame snap to 56 | 14: travels to the stale 64 px, then snaps 64→56 at settle |
| distinct widths, every other small↔large transition | 17-18 (a real interpolation) | 14-15 |
| `data-morphing` span (spring on, until settle) | **539.7-551.9 ms** | 492.9-501.6 ms |
| first frame at the end width (visible travel) | 239.9-250.5 ms (the first collapse is 547.0 / 549.8, the snap) | 192.9-200.4 ms (the first collapse is 501.6 / 499.8) |
| the token | `--spring-dock-duration` = **0.21 s** | 0.19 s |
| layer morph (Tools ↔ Back; `.v`'s DOCK-MORPH-ROOT cross-read) | 2 widths, 483.5↔326 in one frame, 0 blur | the same |

**Reading.**
- At 10.0.1, "0 blurred-text frames after settle" and "no wrap-then-snap" are **GREEN ×2**. The during-morph blur the product shows today (4-6 frames at 7.0.0, plus the post-settle softness in 1 of 2 runs) is **gone at the 10.0.1 patch bytes**. It is uncredited: the repin is held (§0ci R-5, ESC-W7Rm-1), so the product keeps it until X-W7L lands.
- "Token durations" is **RED and glass-owned**. The spring holds `data-morphing` for ≈ 545 ms, 2.6× the 0.21 s token. The visible travel alone takes ≈ 248 ms, 1.2× the token. The spring's `dock` preset (`response .3 · damping .88 · settleBand .02`) is not bound to `--spring-dock-duration`, and no consumer prop sets it (10.0.1 `DockProps` = `fitContent · backdropMode · shape · orientation · collapse · backgroundCanvas`).
- The **first-collapse snap** is glass-owned. It is new-worse at 10.0.1 (act 5).

#### Consumer-side causes

**0 found, so 0 product edits.** The dock dir (`demo/shell/dock/**` at the true bytes) and `demo/styles/**` carry no rule on the morph's surface (act 2). The one consumer binding the morph reads, `collapse`, was bisected in scratch and does not cause the snap (act 5). Every failing residue lives in `useDockMorph` / `dockMorphMeasure` / the spring preset. Under the lock, a consumer "cure" would mean priming the collapsed endpoint or overriding `--dock-*-px`, and either would be a frontend hack over a producer defect. Neither was done. ⟨`git status --porcelain -- demo/shell/dock demo/styles package.json package-lock.json`⟩ → empty.

#### Gates (BEFORE → AFTER)

| gate | before | after |
|---|---|---|
| B8 OA-41/OA-48 dock morph, headed ×2 at 10.0.1 | RED by owner docket; 7.0.0 blur held (KFA-53) | **GREEN on its measurable clauses at the 10.0.1 patch bytes ×2**: after settle, 0 blurred-text frames (DOM 0 in 8/8 transitions per run, pixel 0/24 small↔large crops per run; ×2 runs) and 0 wrap-then-snap. **The glass-owned residue is recorded with the 10.0.1 measurement** (the gate's BL clause): token durations RED (≈545 ms `data-morphing` / ≈248 ms travel vs 0.21 s), and the first-collapse snap (3 widths, 483→56 in one frame). On the held product (7.0.0) the blur persists: 4-6 during-morph frames, and 3/24 soft post-settle crops in 1 of 2 runs. It cures at the landing repin (X-W7L), uncredited now (§0cb R-5) |

#### Residuals (glass-owned → BL; relay row **O-56 G-1**, `docs/tranches/X/relay/X-V-BK-OWNER-DOCKET-2026-09-23.md:14`, "Dock morph", with O-55; the dock design family)

- **RES-d-1 · first-collapse stale endpoint (G-1, measured at 10.0.1).** The first small-going morph since boot writes `--dock-collapsed-px: 483px`, which is the root's own still-expanded width, cached by `dockMorphMeasure`'s layout pass at the class flip. The spring then runs 547-550 ms with zero travel, and the box snaps 483→56 in one frame ("jittery"). Every later collapse measures 56 and interpolates (17 widths). At 7.0.0 the same moment travels to the default 64 px and snaps 64→56. Glass's round-2 G-1 names the stale endpoint on the first *expand*; the 10.0.1 reading here is the first *collapse*, and it is worse. Evidence: `d-result-iso-r{1,2}.json` `c1-large-to-small-idle-first`; frames `d-frames/iso-r*/c1-large-to-small-idle-first-f*.jpg`.
- **RES-d-2 · morph duration off-token (OA-41 "slow").** `useDockMorph` drives the morph with the `dock` spring preset (`response .3, damping .88, settleBand .02`) in JS. It is not bound to `--spring-dock-duration` (0.21 s at 10.0.1): `data-morphing` spans 539.7-551.9 ms, and the visible travel reaches the endpoint at 239.9-250.5 ms, then a ~300 ms sub-pixel overshoot tail (`--dock-morph-t` 1.0028 peak) keeps the attribute, the clip-path and the `will-change` on. At 7.0.0: 493-502 ms vs 0.19 s. No consumer prop reaches it.
- **RES-d-3 · the layer morph (Tools ↔ Back) still snaps** (2 widths, one frame) at both versions. This is `.v`'s DOCK-MORPH-ROOT row, re-read here ×2 and unchanged.
- **Not a residue (recorded so no one re-files it):** the 1.098-1.100 scale on the resting-pointer control after an expand is the producer's DockControl hover lift (`dock-icon-button`), and the text stays sharp (sharpness 0.977-1.009). With the pointer off, 0 scaled frames.
- **Filing.** The 10.0.1 figures above are a dated addendum to O-56 G-1. Writing it (`docs/tranches/X/relay/**` plus the glass BK mirror plus an INBOX row) is outside this unit's writable set, so it is **returned to the orchestrator** as `.v`'s RES-v-3 was. No local override, no relay minted without its letter.

#### Escalation

None of this unit's own. The specified cure ("cure consumer-side causes at the root in the dock dir; what still fails is BL's with the 10.0.1 measurement") executed at the true bytes. There were 0 consumer causes, and the residue was measured and named for BL. The gap between the patch bytes and the product is `.m`'s ESC-W7Rm-1, already ruled (§0ci R-5 hold).

**Self-count** (⟨python3 over `d-result-*.json`⟩): per run 8 transitions (6 small↔large + 2 layer), 24 post-settle crops over the 6. `afterBlurText` sums iso-r1 0 · iso-r2 0 · base-r1 0 · base-r2 0; blurred crops iso-r1 0 · iso-r2 0 · base-r1 0 · base-r2 3. Screencast frames 441 · 442 · 445 · 444.

Commits: this receipt + evidence (`d-morph-probe.ts`, `d-result-{iso,base}-r{1,2}.json`, `d-summary.txt`), pathspec only. Frames stay local. The scratch servers `:9017`/`:9018` were stopped at close.

## Close (2026-09-23, CLOSE SEAT, VERIFY-ONLY, `claude-opus-5-5`, HEAD `24e64df8`)

**Crash-recovery**: `git status --porcelain` → ` M .github/workflows/ci.yml` · ` M docs/tranches/V/reformation/CARRY-LEDGER.md` · ` M docs/tranches/X/execution/B/KF-W13R.md` · ` M docs/tranches/X/execution/C/F-W14.md` · ` M scripts/dev/dev.sh` · `?? docs/tranches/X/keyframes/evidence/W13R/` · `?? docs/tranches/X/parse-that/evidence/W7-research/`. None is in X-W7R's writable set (they belong to sibling tracks, and dev.sh is the standing unowned row). 0 inherited edits.

**Governing ruling**: W7R.md ADDENDUM (b) = COHESION §0ci R-5. ESC-W7Rm-1 is ruled a **hold on glass 7.0.0**. The 10.0.1 repin and its migration stay banked as the committed patch `d49d2238`. The close returns the tree to the committed 7.0.0 pin, and 10.0.1 is never committed here. GLASS-VEIL-GREY (O-62) is honest-RED for this wave. X-W7L mints at BL's cut and applies the banked patch on top of the veil cure.

### Commit roster (⟨`git show --stat`⟩, each checked against its unit's writable set)

| unit | commit | paths | in bounds |
|---|---|---|---|
| `.m` | `d49d2238` | record + `evidence/X-W7R/{m-D1-headed-run1,2.json, m-repin-10.0.1-migration.patch, m-smoke-classification.md}` (5 files, +2503) | yes |
| `.v` | `2f40a015` | record + `evidence/X-W7R/v-*` (12) + `docs/tranches/V/coordination/INBOX.md` (+1, an append lawful for `.v`) (14 files) | yes |
| `.d` | `24e64df8` | record + `evidence/X-W7R/d-*` (5) (7 files) | yes (`.d` touched no dock/styles bytes: 0 consumer causes) |

**Landed-wrong: none.**

### Gates (BEFORE → AFTER; the close's own readings on the tree at HEAD `24e64df8`, load 18.94–27.16)

| gate | BEFORE (baseline) | AFTER (close reading) | state |
|---|---|---|---|
| B1 pin | `^7.0.0` / lock 7.0.0 / installed 7.0.0 | ⟨`grep -n '"@mkbabb/glass-ui"' package.json`⟩ → `88: "@mkbabb/glass-ui": "^7.0.0"`; lock `7.0.0`; installed `7.0.0`; ⟨`git diff --quiet HEAD -- package.json package-lock.json`⟩ → clean. At the patch bytes `.m` read 10.0.1 exact. | **honest-RED as ruled** (§0ci R-5 hold: the tree is on the committed 7.0.0 pin, which is the close act of ADDENDUM (b), already true, no write needed) → X-W7L |
| B2 G14 dismiss grep | 0 | ⟨`grep -rn 'dismiss="deliberate"' demo/ \| grep -v node_modules \| wc -l`⟩ → `0` on the tree. At the patch bytes: ×6, with the w7-destructive-seats network oracle passing (`.m`). | **honest-RED** → X-W7L (banked in the patch) |
| banked patch | n/a | ⟨`git apply --check docs/tranches/X/evidence/X-W7R/m-repin-10.0.1-migration.patch`⟩ → exit 0 (applies cleanly at HEAD `24e64df8`) | GREEN (X-W7L's input is intact) |
| B3 vue-tsc demo | EXIT 0 ×2 | ⟨`npx vue-tsc -p tsconfig.demo.json --noEmit`⟩ → EXIT 0, EXIT 0 | GREEN (regression floor at 7.0.0) |
| B4 vitest | 2 failed \| 910 passed (912) | ⟨`npx vitest run`⟩ ×2 → `Test Files 2 failed \| 65 passed (67)` · `Tests 2 failed \| 908 passed (910)` both runs; the 2 = `test/spectrum-luma.test.ts` C-5 (born-RED) + `demo/test/shell/reka-binding-idiom.test.ts` NG-6, the banked honest-RED only. The count moved 912→910 with sibling-track tree changes, not from this wave (this wave committed no test bytes). | GREEN (0 new) |
| B5 smoke `--workers=1` | cited 47/47 at 7.0.0 | cited, not re-run (probe parsimony §5.2; the tree's product bytes are unchanged by this wave: the three commits touch docs/evidence/INBOX only). At the patch bytes `.m` read 71 failed / 207 passed, 45 already failing at 7.0.0, 15 repin regressions. | honest-RED at 10.0.1 → X-W7L; the 7.0.0 tree is unchanged |
| B6 D1 headed ×2 | owed | cited from `.m`: pass true ×2, ANGLE Metal / Apple M5 Max, median 17 ms (`m-D1-headed-run{1,2}.json`), at the patch bytes | GREEN at the patch bytes (re-read at X-W7L) |
| B7 glass-row table | not measured | cited from `.v` (`2f40a015`): 7/7 measured ×2 headed; 6 still-live → BL; O-57 R-2 CURED-AT-10.0.1, uncredited | GREEN as an instrument; rows defer to X-W7L |
| B8 dock morph | RED (OA-41/48) | cited from `.d` (`24e64df8`): 0 blurred-text frames after settle, 0 wrap-then-snap ×2 at the patch bytes; 0 consumer causes; the residue is glass's (O-56 G-1) | GREEN on its measurable clauses at the patch bytes; the product stays on 7.0.0 |
| GLASS-VEIL-GREY (§0cf) | light frost at 7.0.0 | `.v`: dark-ink `color(srgb 0.204 0.148 0.083 / 0.1)` at 10.0.1; relayed as O-62 (`glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-glass-veil-grey.md` present) | **honest-RED** (O-62) as ADDENDUM (b) rules |

### E13 mail sweep (close)
⟨`find <value V/coordination · keyframes V/coordination · glass BK/coordination · glass BL> -newer INBOX.md -type f`⟩ → value 0 · keyframes 0 · BK/coordination 0 · BL: glass-internal only (`FORMATION-PROGRESS.md`, `design/structure/{RULINGS,REGISTRY}.md`, `audit/round-4/R4-01.md`, `pass-1/D1-F-critique.md`, `audit/captures/R4-01/*`; glass `519b0f27` BL cursor). None is addressed to value.js. Ledger tail I-46 READ. **0 unrowed, 0 UNREAD in scope.**

### Residuals (named owners)
- **X-W7L** (mints at BL's cut, §0ci R-5): apply `m-repin-10.0.1-migration.patch` on top of the veil cure; re-read B1, B2, B5 (the 15 repin regressions in `m-smoke-classification.md`), B6, and the B7/B8 rows on the product; credit O-57 R-2 there; RES-m-1..7 (`.m`), RES-v-1.
- **BL / glass (O-62)**: GLASS-VEIL-GREY, the veil-ladder plate recut that makes the certified-ink instrument throw `contrast_unreachable` (ESC-W7Rm-1, the HIGH, held by ruling).
- **BL (O-55/O-56/O-53/O-57 R-1)**: the 6 still-live B7 rows; RES-d-1 (first-collapse stale endpoint) and RES-d-2 (morph off-token, ~545 ms vs `--spring-dock-duration` 0.21 s), RES-d-3.
- **Orchestrator (relay filing, unfiled; outside every unit's writable set)**: RES-v-3 (`text-xs`/`text-sm` un-registration, the `DialogContent` `placement`/`showClose` fold without a MIGRATION row, `--dropdown-menu-font`, slider-thumb seams) and `.d`'s O-56 G-1 10.0.1 addendum. ⟨`grep -rln 'dropdown-menu-font\|showClose' docs/tranches/X/relay/`⟩ → 0: still unfiled at close.
- **X-W12**: proceeds on 7.0.0 (§0ci R-5); the 13 dead Button variant bindings (§0cb G-2); the HeroBlob wall-clock park (O-56 G-3 consumer half); RES-v-2 G3 attribution (60 native-attribute rows are value.js's own).

### Escalations
- ESC-W7Rm-1 (HIGH): **ruled** (§0ci R-5, hold on 7.0.0). No open escalation remains with this wave.

### Four-verb line
| verb | state at this close | basis |
|---|---|---|
| AUDITED | YES (unmoved) | §0bs minting |
| SPECIFIED | YES (unmoved) | `waves/W7R.md` + ADDENDA (a), (b) |
| **IMPLEMENTED** | **YES — 2026-09-23, as ruled** | ADDENDUM (b) reshapes the wave into hold-and-bank: the patch is committed (`d49d2238`) and applies cleanly, B7/B8 are measured ×2, and the tree is on the 7.0.0 pin. B1/B2/B5 at 10.0.1 and GLASS-VEIL-GREY are honest-RED and routed to X-W7L / O-62 |
| VERIFIED | ✗ | the spec designates no stamp to this seat |

**LEDGER**: X-W7R → `IMPLEMENTED 2026-09-17` (honest-RED per §0ci R-5); commits `d49d2238 · 2f40a015 · 24e64df8` + this close.
