# R3-GLASSUI — the glass-ui frontier mapped for value.js alignment

**Lane:** R3-GLASSUI · **Pass:** 1 · **Date:** 2026-07-02 · **Read-only** (tranche-dev; no source touched).

**One-line verdict:** The N-era value.js asks did NOT drop — glass-ui's **BA tranche ABSORBED all
six BA-VJS riders + Register-B + C-2 + C-3 and LANDED them** (verified in `dist/` at 4.2.0). The
constellation moved past the letter's "re-pin to BA 4.0.0" framing: value.js already resolves
glass-ui via a **`file:../glass-ui` link** (`package.json:127`) = live 4.2.0, and its demo has
**already adopted the 4.0.0 breaks** (tabs `variant="pill"`, WatercolorDot, goo-blob consume).
**Exactly ONE N ask remains genuinely unshipped: C-1 / BA-VJS-5 `uSatColor[]`** (`grep uSatColor
dist/` = 0), booked to a "4.x point release" that never cut. The live frontier risk is now
**5.0.0 (BG+BH joint cut)**: the `goo-blob → blob` rename + the `/api` export reshape **WILL
break value.js**, which consumes `@mkbabb/glass-ui/goo-blob` directly (`App.vue:115`).

---

## §0 Grounding — what value.js actually consumes from glass-ui

value.js resolves glass-ui by **local file link**, not a semver pin: `package.json:127`
`"@mkbabb/glass-ui": "file:../glass-ui"` (devDep) → on-disk **4.2.0**. There is NO published
`^4.0.0`/`^3.13.0` pin anywhere. The N-era Register-E "re-pin 3.13.0 → 4.0.0" ask is therefore
**structurally moot** — value.js floats on whatever glass-ui HEAD is on disk.

**Distinct glass-ui subpaths value.js imports** (grep over `demo/`):
`(root)`, `/aurora`, `/color`, `/configurator`, `/confirm-dialog`, `/controls`, `/dark`,
`/dock`, `/dom`, `/forms`, **`/goo-blob`**, `/search`, `/styles`, `/styles/animations`,
`/tabs`, `/watercolor-dot`.

Load-bearing consumer sites:
- **Hero blob** ← `@mkbabb/glass-ui/goo-blob` (`demo/color-picker/App.vue:115` —
  `BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS`; `demo/CLAUDE.md:78` confirms the 1270-LoC own fork was
  DELETED at N.W5.A and the hero now consumes glass-ui's `goo-blob` OKLCh superset). **This makes
  C-1/uSatColor and the 5.0.0 goo-blob→blob rename directly load-bearing.**
- **Aurora backdrop** ← `@mkbabb/glass-ui/aurora` (`App.vue:112`).
- **Dock** ← `@mkbabb/glass-ui/dock` (`DockIconButton`/`DockSeparator` —
  `gradient/GradientVisualizer.vue:12`, `mix/MixResultDisplay.vue:3`).
- **Tabs** ← `@mkbabb/glass-ui/tabs` `SegmentedTabs variant="pill"`
  (`panes/PaneSegmentedControl.vue:7`, `mix/MixSourceSelector.vue:105`).
- **WatercolorDot** ← `@mkbabb/glass-ui/watercolor-dot`
  (`mix/MixResultDisplay.vue:6`, `palette-browser/CurrentPaletteEditor.vue:166`).
- The full `ui/` re-export layer (`demo/@/components/ui/*/index.ts`) proxies Card/Tabs/Select/
  Slider/Dialog/Dropdown/etc straight from the glass-ui root barrel.

---

## §1 Alignment matrix — every value.js-relevant glass-ui item, 4.x → BG/BH/5.0.0

Legend: **LANDED** = shipped in 4.2.0 dist (verified) · **OPEN** = still unshipped · **WAIT** =
in flight in BG/BH toward 5.0.0, value.js verifies at the cut.

| # | glass-ui item | owning wave | state @4.2.0 | value.js action |
|---|---|---|---|---|
| 1 | **Dock nested-group measure `to:0px`** (BA-VJS-1) | BA W-DOCK-MORPH-INSITU | **LANDED** — "THE BA-VJS-1 FIX (from:40→to:242 four-cycle; DOCK_SPRING byte-untouched)" (`BA/FINAL.md:44`) | ADOPT (already live via file-link); re-verify the value.js nested-DockLayerGroup dock morphs full-span |
| 2 | **Select collision-bound + inner-scroll** (A-2/WO-1, Register B) | BA W-EMISSION | **LANDED** — `dist/styles/select.css` now carries a backing `--reka-popper-available-height` rule; `@source "../*.js"` fixed (`dist/styles/index.css:260`) | ADOPT; retire the value.js interim (see §5) |
| 3 | **Slider `size` axis ships real CSS** (A-3) | BA W-EMISSION | **LANDED** — `--slider-track-height` now emitted into `dist/glass-ui.css` + `dist/styles/index.css` | value.js can migrate `ComponentSliders` raw-reka → glass-ui `variant="spectrum"` (its own N.W15 work, unblocked) |
| 4 | **P9 emission gate / dead `@source`** (Register B) | BA W-EMISSION | **LANDED** — `@source "../*.js"` scans the flat JS bundles; producer-side emission gate born-RED→GREEN (`proof:emission`) | ADOPT; value.js's inv-N-7 "zero phantom classes" is the consumer-side mirror |
| 5 | **SelectTrigger font-rung prop** (A-2/WO-3, BA-VJS-4) | BA W-MENU-GLASS | **LANDED** — "the SelectTrigger font-rung" (`BA/FINAL.md:48`); trigger+items resolve `--dropdown-text` at one scale | value.js should retire `ColorSpaceSelector.vue:17` trigger-only override onto the prop (§5) |
| 6 | **Aurora `breathing` register honest** (A-4, BA-VJS-2) | BA W-STAGE | **LANDED** — "the breathing register honest" (`BA/FINAL.md:63`); non-zero nucleiDrift/paletteDrift | value.js keeps `breathing` default by choice (`panes/keys.ts:28`); interim-revert to `drifting` now optional, not owed |
| 7 | **SegmentedTabs pill-centering** (A-5, BA-VJS-3) | BA W-TABS | **LANDED** — "BA-VJS-3 centering; segmented/overflow/multi-select/ui-Tabs-public RETIRED" (`BA/FINAL.md:50`) | ADOPTED — demo already on `variant="pill"` (`PaneSegmentedControl.vue:7`) |
| 8 | **`<WatercolorDot variant="ghost">`** (C-2) | BA W-EMISSION | **LANDED** — `variant?: "solid"\|"ghost"` (`src/.../watercolor-dot/WatercolorDot.vue:49`; `dist/watercolor-dot.js`) | ADOPTED — demo imports it (`MixResultDisplay.vue:6`); value.js's dashed-CSS empty-slot can now use the ghost |
| 9 | **Published `<EasingPicker>`/`<EasingConfigurator>`** (C-3) | BA W-FOURIER-STUDIO (generalized) | **LANDED** — `/easing` subpath: `EasingPicker.vue` + `EasingConfigurator.vue` (`dist/easing.js` consumes value.js `CSSCubicBezier, bezierPresets, parseSteps, steppedEase`) | **NOT YET CONSUMED** — value.js still forks `gradient/EasingSelector.vue` (§5). ADOPT candidate |
| 10 | **`uSatColor[]` per-satellite derived color** (C-1, BA-VJS-5) | booked "4.x" (never cut) | **OPEN** — `grep uSatColor dist/` = 0; W-VIZ-SUITE:508 keeps the GL color-seam fence closed; BG WS5 rebuilt the blob but left this out | **RELAY (§4 GAP-1)** — value.js's hero blob (glass-ui `/goo-blob`) cannot derive satellite shades until this lands |
| 11 | **A′ perf: GooBlob zombie 2nd canvas + PRM/visibility gate** (A′-1, A′-2) | value.js-SIDE (its demo GooBlob) mostly; glass-ui `/goo-blob` producer half | mixed | value.js owns its demo mount discipline; if the leak is inside glass-ui `useMetaballRenderer`, RELAY (§4 GAP-4) |
| 12 | **A′ perf: card-shrink keyframes animate layout props** (A′-3) | card keyframes owner | verify @4.2.0 | WAIT/verify — check `card-*-shrink` are compositor-safe in current dist |
| 13 | **A′ perf: dock `--dock-morph-t` cascade cost + aurora DPR cap** (A′-4, A′-5) | BA W-GLASS-CAL / useAurora | partial | value.js keeps its demo-side defer-arm; verify dock morph fps on the nested dock |
| 14 | **goo-blob → blob rename** (BH R14 / DIRECTIVE WS5-02) | **BH B2.1-swap @ 5.0.0** | **PENDING** — `dist/goo-blob.js` still ships; DIRECTIVE WS5-02 = "PARTIAL (rebuild landed; rename UNADDRESSED)" | **RELAY (§4 GAP-2)** — `App.vue:115` imports `/goo-blob`; the 5.0.0 rename to `/blob` BREAKS it |
| 15 | **`/api` fold + subpath regen (export reshape)** | **BH B2 @ 5.0.0** | PENDING | **RELAY (§4 GAP-3)** — value.js consumes 15 subpaths; the cut-notes must name every rename (atlas register-D / F-4) |
| 16 | **BG aurora-metal (uMedium 8/9 ladder)** | BG WS5 (executing) | in flight (`5cf8e8f0`) | WAIT — value.js `/aurora` (`App.vue:112`) + AuroraPane tuning may shift; verify at cut |
| 17 | **BG dock-fission / cap-scroll-fade / persistent-cut** | BG WS2 (executing/DONE) | landing | WAIT — value.js `/dock` uses DockIconButton/DockSeparator (leaf primitives, likely stable); persistent-cut removes the ℱ/Fourier egg atop docks (not a value.js consumer) |
| 18 | **BG viz-resize-adopt (backing==round(gBCR×dpr))** | BG WS5 | in flight (`34d3d22c`) | WAIT — relevant only if value.js consumes glass-ui viz leaves (it does not directly; own SpectrumCanvas) |
| 19 | **Peer floor bumps `@mkbabb/value.js ^1.0.0→^1.1.1`, kf `^5.0.0→^5.1.0`** | BH B2.1-swap @ 5.0.0 | PENDING | NO ACTION — glass-ui-side edit; value.js publishes 1.2.0 (⊇ 1.1.1), already satisfies. F-2's `^0.10.0` staleness is superseded |
| 20 | **Skeleton glass** (D-1) | BA W-SURFACE-AXIS scope 6 | **LANDED** | value.js may re-author bespoke `palette-browser/PaletteCardSkeleton.vue` onto `<Skeleton surface="glass">` (optional, §5) |
| 21 | **Dialog `variant`→`surface`** | BA W-SURFACE-AXIS scope 3 | **LANDED** (clean break) | verify value.js Dialog consumers pass no dead `variant=` (grep shows Button/Badge variants only — clean) |

---

## §2 Fate of every N-era value.js ask (BA-VJS-1..6 + registers)

The N2 letter (`glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md`) was
**folded EXECUTED into BA, docs-only, 2026-06-12** (`BA/PROGRESS.md:185`), then IMPLEMENTED across
BA's 30 waves. Fate ledger:

| ask | N2 register | BA disposition | shipped @4.2.0? |
|---|---|---|---|
| **BA-VJS-1** dock nested measure `to:0` | A-1 | W-DOCK-MORPH-INSITU (§F2 booking re-scoped first-mount→deterministic-nested) | **YES** — from:40→to:242 (`BA/FINAL.md:44`) |
| **BA-VJS-2** aurora breathing dead | A-4 | W-STAGE rider (motion table, outside GL fence) | **YES** (`BA/FINAL.md:63`) |
| **BA-VJS-3** tabs pill mis-centered | A-5 | W-TABS acceptance row (`useTabIndicator.ts:102/120`) | **YES** (`BA/FINAL.md:50`) |
| **BA-VJS-4** SelectTrigger font-rung | A-2/WO-3 | W-MENU-GLASS rider | **YES** (`BA/FINAL.md:48`) |
| **BA-VJS-5** `uSatColor[]` | C-1 | W-GOO-REDRESS **arm B — BOOKED to 4.x** (`BA/FINAL.md:38,256`) | **NO — still open** |
| **BA-VJS-6** StepsEditor → EasingPicker | C-3 | W-FOURIER-STUDIO generalized → published `/easing` primitive | **YES** — `dist/easing.{js,d.ts}` |
| Register B — dead `@source` / emission | B | W-EMISSION (`db1e5688`) + born-RED emission gate | **YES** — `@source "../*.js"`, slider/select CSS emitted |
| A-2/WO-1 Select collision-bound | A-2 | W-EMISSION | **YES** — backing rule in `dist/styles/select.css` |
| A-3 Slider size axis | A-3 | W-EMISSION | **YES** — `--slider-track-height` in `dist/glass-ui.css` |
| C-2 WatercolorDot ghost | C-2 | W-EMISSION | **YES** — `variant "solid"\|"ghost"` |
| A′-1..A′-6 perf cluster | addendum | rode W-GLASS-CAL / W-STAGE / useAurora | **PARTIAL** — the two GooBlob-specific ones (zombie canvas, PRM gate) are value.js-demo-side; verify producer half |
| Register D confirmations | D | Skeleton glass (W-SURFACE-AXIS), Dialog surface, menu-glass | **YES** — value.js adopts at leisure |
| Register E re-pin | E | W-CLOSE adopt-book | **MOOT** — value.js uses `file:` link, not a semver pin |
| F-1 dts-emitting build:watch | N.md §8 | cut-ceremony | glass-ui-side; verify |
| F-2 value.js version ranges | N.md §8 | cut-ceremony | superseded — value.js@1.2.0, glass-ui peer bump to `^1.1.1` planned BH B2.1-swap |
| F-3 AuroraConfig slider descriptor | N.md §8 | — | check if `/configurator` (value.js consumes it) exposes the AuroraConfig section descriptor |
| F-4 `.retired-classes.txt` + changelog rename discipline | N.md §8 | W-CLOSE MIGRATION by-name | **binds the 5.0.0 cut** — the goo-blob→blob + subpath renames must be by-name (GAP-2/3) |

**Bottom line:** 5 of 6 BA-VJS riders + all of Register-B + C-2 + C-3 SHIPPED. **Only BA-VJS-5 /
C-1 (`uSatColor`) is outstanding**, plus the 5.0.0 rename/reshape breaks that were never
value.js's to fix but are its to survive.

---

## §3 What changed under the N wave specs (which pinned "BA 4.0.0" — now stale)

- **The pin model changed.** N.W18's plan ("re-pin to BA 4.0.0", `inv-N-6`) assumed a published
  semver pin. value.js is on a `file:` link → floats to 4.2.0. The whole N.W10–W18 demo-adopt
  block was **RATIFIED but NEVER IMPLEMENTED** (`O/PROGRESS.md:9`), yet the demo shows the
  4.0.0 breaks were absorbed piecemeal anyway (tabs pill, watercolor, goo-blob consume — most
  likely during the Q "W1-Lane-I-valuejs" constellation reconciliation). So N's adopt block is
  **partially superseded by facts on the ground, partially still owed** (easing primitive
  consume, interim-arm retirements — §5).
- **The cut target moved 4.0.0 → 5.0.0.** BA cut 4.0.0; BB..BF shipped 4.1/4.2; BG+BH now ride a
  **joint 5.0.0** (`BH/PLAN.md §2`). Every "waits on the BA cut" clause in N docs should read
  "the surfaces already landed at 4.0.0–4.2.0; the NEXT break is 5.0.0."
- **C-1 slipped its window.** N booked `uSatColor` to "a 4.x point release" (`W-VIZ-SUITE.md:508`).
  4.1 and 4.2 cut without it; BG WS5 rebuilt the blob (`BG.W-BLOB-KINEMATICS-LEAF`) and STILL
  left it out (DIRECTIVE WS5-02 PARTIAL). It is now effectively a **5.0.0-or-later** ask that no
  wave owns — the single most important relay.

---

## §4 GAPS TO RELAY — draft relay-letter skeleton to the active glass-ui (BG/BH) agent

> Framing: value.js is the pure sink; it writes no glass-ui code. These are need-shaped asks, each
> grounded in a value.js consumption site + the glass-ui current state. BG owns `src/`; BH owns the
> 5.0.0 export reshape + cut ceremony — route each ask to its owner.

### GAP-1 — `uSatColor[]` is the one N ask never shipped (C-1 / BA-VJS-5) · HIGH
- **value.js need:** the hero blob consumes glass-ui `/goo-blob` (`demo/color-picker/App.vue:115`;
  own fork deleted N.W5.A per `demo/CLAUDE.md:78`). Satellites render from the SAME palette field
  as the body → imperceptible; `deriveBlobPalette` promises "satellites take the lighter in-family
  stops" but the renderer never honors it per-source.
- **glass-ui state:** `grep uSatColor dist/` = **0**. Booked to "4.x" at `W-GOO-REDRESS` arm B
  (`BA/FINAL.md:256`), explicitly out-of-scope at `BB/waves/W-VIZ-SUITE.md:508`, still absent after
  BG WS5's blob rebuild (DIRECTIVE WS5-02).
- **Ask:** land the C-1 spec (`uSatColor[MAX_SATS]` uniform + per-source weighted smin cross-fade +
  `uploadBlobUniforms.ts` satellite←`paletteStops[(i%(stopCount-1))+1]` + optional
  `satelliteShadeSpread`) at 5.0.0 — the blob is being rebuilt in BG WS5 anyway, so the color-seam
  widen is a natural rider, not a fresh excavation. If it cannot ride 5.0.0, **re-book explicitly
  with an owner** (it has silently fallen through three cuts).
- **Companion:** `bodyLightness`/`lightnessFloor` on `deriveBlobPalette` so a near-white seed still
  yields a perceptible body.

### GAP-2 — the `goo-blob → blob` rename WILL break value.js at 5.0.0 · HIGH
- **value.js need:** `App.vue:115` imports `{ BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from
  "@mkbabb/glass-ui/goo-blob"`. The BH B2.1-swap R14 rename (`goo-blob → blob`, `dist/blob.js`,
  no alias — the 5.0.0 free break) drops the `/goo-blob` subpath.
- **glass-ui state:** `dist/goo-blob.js` still ships; DIRECTIVE WS5-02 = rename UNADDRESSED;
  `BH/PLAN.md §4 B2.1-swap` schedules it "pinned to THIS regen row" with "ONE MIGRATION row."
- **Ask:** name value.js by-name in the 5.0.0 MIGRATION row for the `/goo-blob → /blob` rename
  (the atlas register-D / F-4 discipline), so value.js re-points `App.vue:115` in lock-step at the
  cut. Confirm whether `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`/`GooBlob` symbol names also change.

### GAP-3 — the 5.0.0 `/api` fold + subpath regen must name every value.js subpath it moves · MED
- **value.js need:** value.js imports **15 distinct subpaths** (§0). Any rename/removal in the BH B2
  export reshape (`/api` drop + `src/subpaths/` regen) silently breaks a consumer.
- **glass-ui state:** BH B2 is a clean-break reshape at 5.0.0 (`BH/PLAN.md §7`); "200 of 203 /api
  symbols are pure import-path swaps" but the 3 orphan re-homes + any subpath renames could hit
  value.js.
- **Ask:** the 5.0.0 cut-notes owe value.js a by-name table of every subpath value.js consumes that
  is renamed/moved/dropped — `aurora, color, configurator, confirm-dialog, controls, dark, dock,
  dom, forms, goo-blob→blob, search, styles, tabs, watercolor-dot`. Same discipline as the BA
  adopt-book §2.

### GAP-4 — the GooBlob producer-side perf half (A′-1/A′-2) · MED, verify-first
- **value.js need:** value.js's hero renders glass-ui `/goo-blob`; N2 A′-1 (zombie 2nd canvas) +
  A′-2 (no visibility/PRM gate) were traced on the value.js demo but the RENDERER is glass-ui's
  (`useMetaballRenderer`). value.js's inv-N-9/inv-N-12 want the producer half closed.
- **glass-ui state:** BG WS5 rebuilt the blob — verify whether the rebuilt `useMetaballRenderer`
  now single-canvas + IntersectionObserver/`document.hidden`/PRM-gated.
- **Ask:** confirm the BG-rebuilt blob mounts exactly one canvas and pauses its RAF off-viewport /
  on `document.hidden` / under `prefers-reduced-motion`. If not, land it in BG WS5.

### GAP-5 — cut-ceremony carries (F-1, F-3, F-4) · LOW
- **F-1:** dts-emitting `build:watch` (value.js visual lanes flapped twice on dts-less dist). Verify
  glass-ui's watch emits declarations always.
- **F-3:** an `AuroraConfig` slider-section descriptor value.js's AuroraPane consumes via
  `/configurator` — confirm it's exposed.
- **F-4:** `.retired-classes.txt` currency + a changelog line per subpath/symbol rename at the 5.0.0
  cut (value.js's inv-N-10 abrogation sweep reads it). If MIGRATION.md by-name tables are the
  substitute, RECORD the substitution.

---

## §5 value.js-side follow-through (NOT glass-ui asks — value.js's own R-tranche work)

These are interim arms value.js still owes ITSELF now that the producer fixes landed at 4.0.0–4.2.0
(all deferred by the never-implemented N.W10–W18 block):

1. **Consume the published `/easing` primitive.** value.js still forks
   `demo/@/components/custom/gradient/EasingSelector.vue` (imports only vue/reka + local composable);
   glass-ui now publishes `EasingPicker`/`EasingConfigurator` (`dist/easing.js`) that consume
   value.js's own `bezierPresets`/`CSSCubicBezier`. C-3 landed — the fork can retire. (The stale
   comment `EasingSelector.vue:41` "h-9 pending glass-ui SelectTrigger size prop" is doubly stale:
   the prop landed at BA W-MENU-GLASS.)
2. **Retire the trigger-only font override.** `ColorSpaceSelector.vue:17` still hand-overrides only
   the trigger (`sm:text-display`) — the desync WO-3/BA-VJS-4 diagnosed. Re-point onto the
   SelectTrigger font-rung prop (landed).
3. **Skeleton glass (optional).** `palette-browser/PaletteCardSkeleton.vue` bespoke
   (`bg-foreground/[0.04]` over `bg-card`) → `<Skeleton surface="glass">` (D-1, landed).
4. **Slider migration (unblocked).** `ComponentSliders` raw-reka → glass-ui `variant="spectrum"`
   with a real `--slider-track-bg` — the A-3 fix unblocks value.js's N.W15 consumption.
5. **breathing default** — now honest producer-side; reverting the value.js `panes/keys.ts:28`
   `breathing` default to `drifting` is OPTIONAL (value.js deliberately kept the wispier breathing).

---

## §6 Sources (load-bearing cites)

- glass-ui pin: `value.js/package.json:127` (`file:../glass-ui`), `:112-113` (parse-that ^0.13.0,
  self value.js ^1.0.2).
- N2 letter: `glass-ui/docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md` (registers A–F,
  the fold-by-batch deadline table).
- BA outcomes: `glass-ui/docs/tranches/BA/FINAL.md:38,42,44,48,50,63,256` (W-GOO-REDRESS arm-B book,
  W-EMISSION, W-DOCK-MORPH-INSITU, W-MENU-GLASS, W-TABS, W-STAGE); `BA/PROGRESS.md:185-218` (the
  six-rider fold).
- dist verification (4.2.0): `dist/styles/index.css:260` (`@source "../*.js"`); `dist/glass-ui.css`
  + `dist/styles/index.css` (`--slider-track-height`); `dist/styles/select.css`
  (`--reka-popper-available-height`); `dist/easing.js` (EasingPicker consuming value.js);
  `dist/watercolor-dot.js` + `src/.../WatercolorDot.vue:49` (`variant`); `grep uSatColor dist/` = 0.
- 5.0.0 frontier: `glass-ui/docs/tranches/BH/PLAN.md §2,§4 (B2/B2.1-swap R14),§7`;
  `BG/DIRECTIVE-LEDGER.md:166` (WS5-02 rename PARTIAL); `BB/waves/W-VIZ-SUITE.md:508` (uSatColor
  booked-out); git log `5cf8e8f0`/`34d3d22c`/`9b156fe8` (BG aurora-metal / viz-resize / dock-cap).
- value.js consumers: `demo/color-picker/App.vue:104,112,115`; `demo/CLAUDE.md:78`;
  `panes/PaneSegmentedControl.vue:7`; `mix/MixSourceSelector.vue:105`; `mix/MixResultDisplay.vue:3,6`;
  `gradient/GradientVisualizer.vue:12`; `gradient/EasingSelector.vue:41`;
  `color-picker/display/ColorSpaceSelector.vue:17`; `panes/keys.ts:28`;
  `palette-browser/PaletteCardSkeleton.vue`.
- N block status: `value.js/docs/tranches/O/PROGRESS.md:8-10` (N.W10–W18 ratified, not implemented).
