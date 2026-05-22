# G — glass-ui deep audit (value.js-side actions)

**Lane**: deep-audit peer (value.js-side). **Posture**: READ-ONLY across peers; WRITE only this artefact.
**Self**: `/Users/mkbabb/Programming/value.js`, branch `tranche-g`, HEAD `0b9832c` (`docs(tranche-g/w0-close): user ratification received — G.W0 closed, G.W1 unblocked`, 2026-05-21 15:35).
**Peer**: `/Users/mkbabb/Programming/glass-ui`, branch `master`, HEAD `3822f48` (`feat(package): publish 17 sub-barrel entries + absorb 6 speedtest-local tokens (FD1 TRANSPOSITION 5)`, 2026-05-21 15:30).
**Audit window**: post-G-AUDIT-4 (which anchored glass-ui at `e150e2f`), pre-G.W1 dispatch.
**Baseline**: `docs/tranches/G/audit/G-AUDIT-4-cross-repo-state.md` + `docs/tranches/G/coordination/Q.md` §2.1 (user-ratified Metaballs renegotiation).

---

## §1 — Tranche state

### §1.1 — glass-ui tranche directory inventory

`ls /Users/mkbabb/Programming/glass-ui/docs/tranches/` enumerates:
```
AB AB+1 AB+2 C D D-II E F H I J K L M N O P Q V
```

**No `AJ` directory at the tranche-letter level. No `AK` directory either.** (Confirms G-AUDIT-4 §2.4: AJ + AK operate as wave-cohorts under the post-Q HEAD train; no successor-tranche scaffolding has been authored.) The most recently CLOSED tranche directory is `Q` (W6 close, `e2e4b0d`/v1.9.1, 2026-05-18). The `V` directory is the pre-existing V-tranche scaffold from May 9.

### §1.2 — Drift from G-AUDIT-4 anchor

G-AUDIT-4 anchored glass-ui at `e150e2f` (33 unpushed commits). Today's HEAD is `3822f48` — **+5 commits since G-AUDIT-4**. The five new commits all carry `AK-W1/W2/W6-α` tags:

| SHA | Commit |
|---|---|
| `3822f48` | `feat(package): publish 17 sub-barrel entries + absorb 6 speedtest-local tokens (FD1 TRANSPOSITION 5)` |
| `28c8d7d` | `refactor(instrument-chassis): gate slot+divider emission on $slots presence` (AK-W2-β1) |
| `ebafee1` | `feat(aurora): opacity-ceiling prop` (AK-W6-α phase 1, G-AK-D11) |
| `db8fda0` | `feat(instrument-rail): instrument-rail primitive` (AK-W2-α, G-AK-D9) |
| `6dc3c28` | `feat(animations): declare scrim-breath keyframe` (AK-W1-α, G-AK-D14 Path B) |

The chronic-unpushed front now stands at **38 commits unpushed** (was 33 at G-AUDIT-4). Contraction posture re-verified: `find src -iname 'DockGroup*' -o -iname 'ProgressiveSidebar*'` → 0 results. **INTACT.**

### §1.3 — Cross-repo coordination references in glass-ui docs

`grep -rn "feedback_library_gaps" /Users/mkbabb/Programming/glass-ui/docs/` returns one match: `docs/tranches/K/waves/W-S.md:20` — historical, no value.js mention. Glass-ui does NOT carry an open lane for value.js coordination at this snapshot.

---

## §2 — AJ shipped surface deep-walk (per-commit value.js consumer impact)

The 13 AJ commits during F's window + the 5 AK commits since G-AUDIT-4 (all on the unpushed train, all live to value.js via the `file:../glass-ui` link). Per-commit value.js consumer impact:

| # | SHA | Publisher API change | Value.js demo consumes today? | Outdated adaptation? |
|---|---|---|---|---|
| 1 | `5d47bfd` | `MetaballCanvas` `positioning="viewport"\|"local"` prop | NO (demo uses local `goo-blob/GooBlob.vue`, not `MetaballCanvas`) | Demo's `useMetaballRenderer.ts` is a shadow implementation. |
| 2 | `a7b6b3d` | `MetricRow` `--metric-row-value-color` + `--metric-row-unit-color` split | NO (no `MetricRow`/`MetricStack` consumer in demo) | n/a — no consumer surface |
| 3 | `f7fc5eb` | `GlassDock` `variant="instrument-strip"` chassis-strip preset | NO (demo only uses `variant` defaults on `GlassDock`) | n/a (informational; demo's dock register is the canonical pill) |
| 4 | `fb4a10a` | glass blur tier — dock 14px + quiet 10px (token refine) | YES (transitively — demo imports `GlassDock`) | No demo change required (token defaults flow through) |
| 5 | `46c9fce` | Progress intake-pulse + discharge-glow keyframe refine | NO (no demo `Progress` consumer) | n/a |
| 6 | `0492ccb` | Shimmer canon checkpoint comment block (no API change) | n/a (comment-only) | n/a |
| 7 | `cd9d14d` | `cn()` tailwind-merge conflict bucket fix | YES (transitive — demo uses `cn()` via re-import of `@utils/cn`) | No demo change; behaviour-only fix |
| 8 | `4e60045` | `MetaballCanvas` `:duration` prop + `@retire` event + `useMetaballs({duration, onRetire})` | NO | Demo's `goo-blob` has no retire envelope — but no consumer site needs it (HeroBlob is permanent) |
| 9 | `b46547f` | `DialogContent` `:scrim-animation` cascade prop | NO (demo `MigratePalettesDialog` / `FlagReportDialog` use default scrim) | n/a — no scrim-breath consumer in demo |
| 10 | `d318704` | `Progress` `:disable-crescendo` prop | NO | n/a |
| 11 | `70b90c8` | `--motion-stagger-tight/default/relaxed` tokens + `motionStagger` TS canon | NO (demo has no stagger sites) | n/a |
| 12 | `e54256b` | `useViewportReady(host)` IO+rIC composable at `@mkbabb/glass-ui/dom` | NO (demo has no consumer; closest analogue is `useMetaballRenderer.ts:84` reduced-motion read, which isn't viewport-gated) | n/a — demo's heavy widgets don't lazy-mount |
| 13 | `e150e2f` | `useBreakpoint(query)` reactive matchMedia wrapper at `@mkbabb/glass-ui/dom` | **NO — but 4 demo sites hand-roll the exact pattern** (see §4) | **YES — 4 ad-hoc `matchMedia` subscribe-on-mount sites mirror the composable verbatim** |
| 14 | `6dc3c28` | `@keyframes scrim-breath` declared at publisher canon | NO (consumer-side keyframe wasn't being declared either) | n/a |
| 15 | `db8fda0` | `<InstrumentRail variant :ratio :bezel-hairlines :divider-rule>` primitive at `@mkbabb/glass-ui/instrument-rail` | NO (no consumer surface for cockpit-ratio rails) | n/a |
| 16 | `ebafee1` | `Aurora :opacity-ceiling` prop (`--aurora-opacity-ceiling` clamp) | **NO — but demo uses `useAurora` composable; the prop is on `<Aurora>` SFC** | Demo `App.vue:213` uses `useAurora` directly, not `<Aurora>` SFC, so opacity-ceiling is bypassed |
| 17 | `28c8d7d` | `InstrumentChassis` gates `<header>`/`<footer>` on `$slots` | NO | n/a |
| 18 | `3822f48` | 17 sub-barrel entries published + 6 token additions | YES (demo already uses 6+ subpaths) | Verify any token additions overlap value.js's interest |

**Headline**: the only AJ/AK ship with a **directly named outdated consumer-side adaptation in value.js's demo** is **#13 `useBreakpoint`** (4 hand-rolled matchMedia call sites). All other AJ/AK ships are either orthogonal to the demo's surface or land via subpaths the demo doesn't reach.

---

## §3 — Metaballs renegotiation deep-walk (per-sub-ask AJ status)

Per `coordination/Q.md` §2.1, user ratified 2026-05-21 that AJ-W1-β `positioning` + AJ-W4-γ `:duration` ACCEPT the original positionSource + duration sub-clauses. The remaining sub-asks re-scoped to 5-6 items.

**Source files read for verification**:
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/metaballs/MetaballCanvas.vue` (208 LoC SFC)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/metaballs/useMetaballs.ts` (~430 LoC composable)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/metaballs/types.ts` (62 LoC types)

### §3.1 — Per-sub-ask status table

| # | Original ask | AJ surface name | Status verdict | Evidence |
|---|---|---|---|---|
| 1 | `positionSource` | `positioning="viewport"\|"local"` | **ACCEPTED (per §2.1)** — fully overlapping | `MetaballCanvas.vue:25-32`; `types.ts:23` `MetaballPositioning` literal-union |
| 2 | `duration` | `:duration` (with `@retire` event) + `useMetaballs({duration, onRetire})` | **ACCEPTED (per §2.1)** — fully overlapping; AJ's idiom is richer (declarative envelope + emit, replaces consumer-side setTimeout) | `MetaballCanvas.vue:36-66`; `useMetaballs.ts:128-160` |
| 3 | pointer input (cursor-tracking blob influence) | NONE | **OPEN** — no `pointer-source`, no `pointer` prop, no cursor sampling in `useMetaballs.ts` | `grep -n "pointer\|cursor" useMetaballs.ts` → 0 matches |
| 4 | per-blob opacity | NONE (per-blob alpha is shader-internal; only `bgAlpha` is configurable) | **OPEN** | `types.ts:30-55` `MetaballConfig` has no `opacities[]` field |
| 5 | HSV color perturbation | NONE | **OPEN** — shader uses CSS color resolution (`cssColorToRgb`) but no per-blob H/S/V deltas | `useMetaballs.ts:18-31` color resolver is RGB-only |
| 6 | WebGL context-loss recovery | NONE (composable doesn't subscribe `webglcontextlost` / `webglcontextrestored`) | **OPEN** | `grep -n "contextlost\|contextrestored" useMetaballs.ts` → 0 matches |
| 7 | `mode="layout"` | Likely **SUBSUMED by `positioning="local"`** — the `local` register drops `fixed/inset-0/-z-10` so the canvas reads as a plain inline element sized by its container, which is what `mode="layout"` was asking for | `MetaballCanvas.vue:97-99` canvasClasses computed |
| 8 | `pauseOnHidden` | NONE explicitly, but `useMetaballs.ts:288+` includes a `useVisibilityState`/page-hide path? — verified absent. The `isReducedMotion` freeze affects orbit phase, not loop suspension. Tab-hidden continues to drive rAF. | `useMetaballs.ts:render` has no `document.hidden` gate |

### §3.2 — MOOT / OPEN / NEW classification

**MOOT (resolved by AJ)** — 2 items:
- `positionSource` → use `positioning`
- `duration` → use `:duration` + `@retire`

**LIKELY-MOOT (subsumed by AJ shape, needs user re-confirm)** — 1 item:
- `mode="layout"` → fold into `positioning="local"` (the layout register the value.js ask wanted is the same drop-of-viewport-cover trio AJ shipped)

**OPEN (verified absent in AJ shipped surface)** — 4 items:
- pointer input (cursor-tracking)
- per-blob opacity
- HSV color perturbation
- WebGL context-loss recovery
- `pauseOnHidden`

**NEW SUB-ASKS that emerge from AJ's shipped surface** — 2 items:
- (NEW-A) Composable-level `useMetaballs` does NOT expose its `dispose()` API externally; consumers wanting to retire-then-re-arm in-place (without `v-if` remount) cannot do so. The retire envelope is one-shot per mount. Demo's `useMetaballRenderer.ts` exposes both `start()` + `stop()` — AJ's composable should match that shape if it wants to fully retire the demo's local wrapper.
- (NEW-B) `MetaballCanvas` no longer exposes `isSupported` (M.W2 Lane A F-ε-3 fix retired the expose in favor of `isWebGLSupported()` helper at module scope). Consumers wanting to render alternative content when WebGL is unsupported now call `isWebGLSupported()` at setup. Demo's `GooBlob.vue` template would need this signal if extirpation reaches the SFC layer.

---

## §4 — Demo consumer-side state

### §4.1 — glass-ui imports inventory

`grep -rn "from ['\"]@mkbabb/glass-ui" /Users/mkbabb/Programming/value.js/demo/` → **68 imports across the demo tree**. By subpath:
- Root barrel (`@mkbabb/glass-ui`): 22 import sites (Card, Tabs, Slider, Dialog, Popover, etc. + `copyToClipboard` + `useTouchGate`)
- `/aurora`: 1 site (`useAurora`, `DEFAULT_AURORA_CONFIG`, `AuroraConfig` — `App.vue:107`)
- `/configurator`: 1 (`ConfigSliderPane.vue:21`)
- `/confirm-dialog`: 2 (`PalettesPane.vue`, `DeleteAllConfirm.vue`)
- `/controls`: 1 (`DarkModeToggle`)
- `/dark`: 1 (`useGlobalDark`)
- `/dock`: 9 (`DockIconButton`, `GlassDock`, `DockLayerGroup`, `DockLayer`, `DockSelectTrigger`, `DockDropdownTrigger`, `useOptionalDockContext`)
- `/forms`: 1 (`Input`)
- `/glass-carousel`: 1 (`ComponentSliders.vue`)
- `/search`: 5 (`SearchBar`)
- `/tabs`: 2 (`BouncyTabs`)
- (… plus the ~22 root-barrel re-exports listed above as the bulk; see `demo/@/components/ui/*/index.ts`)

**Zero imports of**: `@mkbabb/glass-ui/dom` (NEW; AJ-W6), `@mkbabb/glass-ui/metaballs`, `@mkbabb/glass-ui/instrument-rail` (NEW; AK-W2), `@mkbabb/glass-ui/metric-stack`, `@mkbabb/glass-ui/instrument-chassis`, `@mkbabb/glass-ui/progress`.

### §4.2 — TODO/XXX/FIXME comments referencing glass-ui

Single hit:
- `/Users/mkbabb/Programming/value.js/demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16`
  - `<!-- TODO(glass-ui): migrate to Button size="icon-sm" once shipped (Ad-5) -->`
  - Status: still OPEN — `Button size="icon-sm"` is ask #7 in Q.md and was verified absent at G-AUDIT-4 §2.2 (button index has only `default | xs | sm | lg | icon`). PaletteSlugBar.vue:18-26 + 27-35 hand-roll two `<button class="p-0.5 rounded-sm ...">` icon-button shapes pending the rung.

### §4.3 — Hand-rolled matchMedia subscribe sites (useBreakpoint candidates)

Verified by `grep -rn "matchMedia" /Users/mkbabb/Programming/value.js/demo/`:

| Site | Query | Pattern | useBreakpoint candidate? |
|---|---|---|---|
| `demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue:126` | `(min-width: 640px)` | Full subscribe-on-mount + tear-down-on-unmount; uses `isWide` ref + `addEventListener("change")` + `removeEventListener` | **YES — verbatim match** |
| `demo/@/components/custom/panes/ExtractPane.vue:120` | `(min-width: 640px)` | Same subscribe/tear-down pattern; `isWide` ref | **YES — verbatim match** |
| `demo/@/components/custom/palette-browser/composables/useHoverPopover.ts:4` | `(hover: hover)` | Module-scope snapshot (not subscribed) | **YES — promote to reactive** (currently stale on display-mode change) |
| `demo/@/components/custom/palette-browser/composables/useCardMenu.ts:5` | `(hover: hover)` | Default-arg snapshot | **YES — promote to reactive** |
| `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:86` | `(prefers-reduced-motion: reduce)` | Module-scope snapshot at setup | YES — but value.js owns the metaballs renderer; AJ's `useMetaballs.ts` already subscribes natively |
| `demo/color-picker/index.html:41` | `(prefers-color-scheme: dark)` | Inline boot-script (pre-Vue) — NOT a useBreakpoint candidate | NO — outside Vue scope |
| `demo/hero-lab/components/*.vue` (4 sites) | `(prefers-reduced-motion: reduce)` | Setup-time snapshot | YES — but hero-lab is an isolated playground tree; lower priority |
| `demo/hero-lab/lib/helpers.ts:171` | `(pointer: coarse)` | Setup-time snapshot | YES — same hero-lab caveat |

**Headline**: **4 high-value demo sites** (`ImagePaletteExtractor.vue`, `ExtractPane.vue`, `useHoverPopover.ts`, `useCardMenu.ts`) match AJ-W6-β `useBreakpoint`'s verbatim contract; the first two even mirror the speedtest-origin shape (subscribe-on-mount + cleanup-on-unmount). All 4 are reachable today via `import { useBreakpoint } from "@mkbabb/glass-ui/dom"`.

### §4.4 — Demo's shadow-implementations of glass-ui asks

| Shadow component | Glass-ui successor | Status |
|---|---|---|
| `demo/@/components/custom/goo-blob/` (343-LoC `useMetaballRenderer.ts` + `GooBlob.vue` + 4 composables) | `@mkbabb/glass-ui/metaballs` `MetaballCanvas` + `useMetaballs` | Subpath EXPORTS LIVE (verified `dist/metaballs.js` + `dist/metaballs.d.ts` exist + `./metaballs` in package.json exports). But the demo's renderer is feature-richer (HSV perturbation, mood FSM, satellites, pointer tracking) — those are exactly the 4 OPEN Metaballs sub-asks (§3.1). Extirpation gated on glass-ui shipping the re-scoped subset. |
| `demo/@/components/custom/watercolor-dot/` (10 consumer sites per `coordination/Q.md` ask #3) | `BlobDot` primitive (ask #3) | UNSHIPPED at glass-ui. No subpath, no source file. |
| `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:18-35` (2 hand-rolled icon buttons) | `<Button size="icon-sm">` (ask #7) | UNSHIPPED at glass-ui. |
| `demo/@/components/custom/palette-browser/composables/useHoverPopover.ts` (`CAN_HOVER` snapshot) | `useBreakpoint("(hover: hover)")` (AJ-W6-β shipped) | **Subpath LIVE** — adoption-ready. |

### §4.5 — `useAurora` composable vs `<Aurora>` SFC opacityCeiling

`demo/color-picker/App.vue:212-215` consumes `useAurora` directly with its own `<canvas ref="atmosphereCanvas">`:

```ts
const auroraConfig = reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG));
useAurora(atmosphereCanvas, () => auroraConfig, { onInitError: ... });
```

The AK-W6-α `opacityCeiling` prop landed on the **`<Aurora>` SFC**, not on the composable signature. The demo's path through `useAurora` directly does NOT consume `--aurora-opacity-ceiling` and never will unless the demo migrates to `<Aurora>` SFC. **This is a CARRY-FORWARD-WITH-SHARPER-TRIGGER candidate**: glass-ui could either (a) lift `opacityCeiling` into `useAurora`'s options bag, OR (b) demo migrates to `<Aurora>` SFC (mechanical; loses no functionality). The demo currently uses a hero/dial register at full saturation, so this is informational only — no quiet-route consumer.

---

## §5 — value.js-side actions surfaced

### §5.1 FOLD-INTO-G candidates (numbered)

The following are value.js-side mechanical transpositions that can land within G's existing wave plan without requiring peer authorship. Each names FILE + LINE + proposed change.

#### FOLD-1 — Adopt `useBreakpoint` at 4 demo sites

- **Sites**:
  - `demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue:123-131` — replace `mediaQuery = window.matchMedia(...) + addEventListener + removeEventListener` block (~9 LoC) with `const { matches: isWide } = useBreakpoint("(min-width: 640px)")` (1 LoC).
  - `demo/@/components/custom/panes/ExtractPane.vue:117-125` — identical replacement.
  - `demo/@/components/custom/palette-browser/composables/useHoverPopover.ts:4` — replace module-scope `CAN_HOVER` constant with `useBreakpoint("(hover: hover)").matches` inside the composable; cures the staleness on display-mode changes.
  - `demo/@/components/custom/palette-browser/composables/useCardMenu.ts:5` — replace default-arg snapshot with reactive `useBreakpoint("(hover: hover)").matches`.
- **Import**: `import { useBreakpoint } from "@mkbabb/glass-ui/dom"` (subpath LIVE; verified `dist/dom.js` + `./dom` export).
- **Net**: ~30 LoC removed; 4 ad-hoc subscribe/teardown blocks retire; cure the 2 stale-snapshot composables.
- **Fits**: G.W1 Lane (mechanical demo-side consumer migration; aligns with `feedback_glass_ui_first_class.md` mandate — glass-ui is the design system, demo consumes idiomatically).
- **No-risk**: SSR-safe (composable returns permanently-false ref outside browser); scope-disposed automatically.

#### FOLD-2 — Replace `PaletteSlugBar.vue` icon-button TODO with idiomatic Button surface NOW

The TODO at `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16` waits on `Button size="icon-sm"`. Two paths:
- (a) wait for glass-ui to ship `icon-sm` (ask #7);
- (b) **adopt `size="icon"` + `class="h-6 w-6"` shim** at the demo site to retire the hand-rolled `<button class="p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 ...">` (`PaletteSlugBar.vue:18-26` + 27-35) so the demo at least uses glass-ui's `<Button>` component shell, not a raw HTML `<button>`.
- **Site**: `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:18-26` (submit button), `:27-35` (cancel button).
- **Net**: 2 hand-rolled icon-button shapes retire to `<Button variant="ghost" size="icon" class="h-6 w-6">`; the TODO line moves to a follow-up trigger ("when `icon-sm` ships, drop the `class="h-6 w-6"` shim"); the demo stops pretending to be its own design system.
- **Fits**: G.W1 Lane (mechanical demo cleanup; aligns with `feedback_glass_ui_first_class.md`).
- **Risk**: minor — visual diff if `size="icon"` defaults to a larger footprint than `p-0.5`. Verifiable in dev server.

#### FOLD-3 — Update G-AUDIT-5 + `coordination/Q.md` ask #1 wording to reflect LIVE Metaballs subpath

G-AUDIT-5 §6 explicitly stated `MetaballCanvas` "is NOT exported from glass-ui's `package.json` exports map" as a blocker for the `WatercolorDot` 10-site extirpation. **This is STALE.** `package.json` line for `./metaballs`:
```
"./metaballs": { "types": "./dist/metaballs.d.ts", "import": "./dist/metaballs.js" }
```
The subpath is LIVE (verified `dist/metaballs.{js,d.ts}` both exist). The actual blocker for `WatercolorDot` extirpation is NOT the subpath — it's the **functional shortfall**: `WatercolorDot` is an organic-dot primitive (single-blob, deterministic from seed), not a multi-blob metaball canvas. `MetaballCanvas` is the wrong successor for `WatercolorDot`; `BlobDot` (ask #3) remains the right successor and IS still unshipped.
- **Site**: `docs/tranches/G/audit/G-AUDIT-5-library-demo-architecture.md` §6 (lines 199-211) + `docs/tranches/G/coordination/Q.md` §2 ask #3 wording.
- **Net**: correction of a factually wrong shipped-state claim; sharpens the `BlobDot` ask's blocker condition (no longer conflated with `MetaballCanvas`-as-Metaballs question).
- **Fits**: G.W1 Lane (documentation correction; in-scope for the audit-quality housekeeping G already absorbed via the 21-item Q.md ledger).

#### FOLD-4 — Adopt `MetricRow` value/unit color cascade if a value.js metric surface emerges

Currently moot — no demo consumer surface uses `<MetricRow>` / `<MetricStack>`. Recommended action: **register as a forward-looking compatibility note** rather than a wave-action. Document in `coordination/Q.md` §2 as "if value.js adds a metric/stats surface in G/H, prefer `@mkbabb/glass-ui/metric-stack` + the new `--metric-row-value-color/--metric-row-unit-color` cascade over hand-rolled rows." **NOT a FOLD-INTO-G action** — promoted to RAISE-AS-NEW-ASK §5.3 NEW-2 below as a forward registration.

#### FOLD-5 — Cure HSV-color-perturbation OPEN sub-ask as renegotiation deliverable

The Metaballs renegotiation (§2.1) leaves 4 OPEN sub-asks; the HSV-color-perturbation one (§3.1 #5) is the only one with prior art at value.js's tree (`useMetaballRenderer.ts` shader applies per-blob HSV deltas — value.js HAS the implementation). A natural folding: **value.js authors a draft proposal/spec for the HSV-perturbation prop shape** (named `colorPerturbation?: { hueDeltaDeg, satDelta, valDelta }` per-blob array, mirroring the existing `useMetaballRenderer` shape) and lodges it at `docs/tranches/G/coordination/Q.md` §2 ask #1 as a sub-ask sharper-trigger. **Not a code change** — a coordination-doc deliverable that gives glass-ui's next AK/A-l-tranche a concrete API to adopt instead of an ambiguous "HSV color perturbation" line item.
- **Site**: `docs/tranches/G/coordination/Q.md` §2.1 sub-ask table — append a "Proposed API surface" column for the 4 OPEN sub-asks.
- **Net**: sharper handoff to glass-ui maintainer; reduces the renegotiation round-trip.
- **Fits**: G.W1 Lane (coordination-doc authorship; same authorship-class as G-AUDIT-* deliverables).

### §5.2 CARRY-FORWARD with sharpened triggers

#### CF-1 — Aurora opacityCeiling: lift to `useAurora` options OR demo migrates to `<Aurora>` SFC

Current state: `App.vue:213` uses `useAurora` directly; AK-W6-α landed `opacityCeiling` on the `<Aurora>` SFC. Demo's use is hero-register full-saturation — no quiet-route consumer needs the clamp. **Trigger**: when demo adds a non-hero Aurora consumer (form pane, dense-text route, admin overlay), either path closes the gap. Default disposition: **PEER-AUTHORSHIP** preferred (lift to composable; mirrors how the composable already owns the runtime options) — record as Q.md ask under §2 with "(c) re-check trigger: when value.js adds a quiet-route Aurora consumer OR glass-ui ships composable-side `opacityCeiling`."

#### CF-2 — Glass-ui Metaballs ship the 4 OPEN sub-asks (pointer/per-blob-opacity/HSV/context-loss + pauseOnHidden)

CARRY-FORWARD per `coordination/Q.md` §2.1 ratification. **Sharpened trigger**: G adopts FOLD-5 (publish proposed API surfaces for each of the 4 OPEN sub-asks) → glass-ui's next non-AK tranche-open lands them with the value.js-proposed shape. Without sharpened triggers, the renegotiation can drift indefinitely.

#### CF-3 — `BlobDot` organic-dot primitive (ask #3, 10 consumer sites)

CARRY-FORWARD unchanged from `coordination/Q.md` §2 ask #3. **Sharpened trigger**: when glass-ui's next tranche-open dispatches a primitive-authorship lane, value.js submits the `WatercolorDot.vue` shape (props: `:color`, `:tag`, `:seed`, `:class`) as the proposed `BlobDot` contract. Same idiom-handoff as FOLD-5.

### §5.3 RAISE-AS-NEW-ASK

#### NEW-1 — Aurora composable surfaces `opacityCeiling` option (glass-ui-side ask)

The AK-W6-α `opacityCeiling` prop is SFC-only. A consumer that uses `useAurora` (e.g. demo `App.vue:213`) cannot reach the clamp without migrating to the `<Aurora>` SFC. RAISE to glass-ui: lift `opacityCeiling` into `AuroraRuntimeOptions` (or a separate `AuroraConfig` field) so composable-direct consumers see the same lever. The argument: the composable IS the API surface for non-trivial integrations (per `useAurora`'s own docstring); a prop-only opt-in violates the composable's expressive parity.
- **File**: `glass-ui/src/components/custom/aurora/composables/useAurora.ts` (lift the `--aurora-opacity-ceiling` write from `Aurora.vue:68` into the composable's `setOpacityCeiling()` API).
- **Driver**: value.js demo's `useAurora`-direct path.

#### NEW-2 — Forward-register `<MetricStack>` / `<MetricRow>` for future value.js metric surface

If G or a future tranche introduces a stats/metric surface (e.g. a "Color stats" panel: dominant-color counts, palette-saturation averages), the publisher canon is `@mkbabb/glass-ui/metric-stack` + the new `--metric-row-value-color` / `--metric-row-unit-color` cascade (AJ-W1-γ-pub `a7b6b3d`). RAISE as a **forward registration in `coordination/Q.md` §2** so the consumer-side decision doesn't drift into a hand-rolled row component.

#### NEW-3 — Confirm `mode="layout"` Metaballs sub-ask is subsumed by `positioning="local"`

Per §3.1 #7, the value.js-asked `mode="layout"` register and AJ's `positioning="local"` register both achieve "canvas reads as a plain inline element sized by its container, no viewport-cover". This needs a one-line user-ratification ("yes, `positioning='local'` covers what `mode='layout'` was asking for") to retire the sub-ask cleanly. RAISE for user decision in the next ratification window; if confirmed, MOOT-and-retire.

### §5.4 RETIRE-MOOT

#### MOOT-1 — `positionSource` Metaballs sub-ask (already ratified)

Per `coordination/Q.md` §2.1 ratification; this audit re-verifies the AJ-W1-β shape (`positioning="viewport"|"local"`) is the in-shipped surface. **No further action.**

#### MOOT-2 — `duration` Metaballs sub-ask (already ratified)

Per `coordination/Q.md` §2.1 ratification; this audit re-verifies the AJ-W4-γ shape (`:duration` + `@retire` event + `useMetaballs({duration, onRetire})`) is the in-shipped surface. AJ's idiom is RICHER than the original ask (declarative envelope + emit + retire-event bridge replaces the consumer-side `setTimeout` pattern). **No further action.**

#### MOOT-3 — G-AUDIT-5 "`MetaballCanvas` not in glass-ui exports" finding

Per §4.4 + FOLD-3 evidence: `./metaballs` subpath IS in `package.json` exports AND `dist/metaballs.{js,d.ts}` both exist. The G-AUDIT-5 finding is STALE. **Action**: correction lands via FOLD-3.

---

## §6 — Contract-v2 §2.1 status

Re-verified at G-AUDIT timestamp:
- `/Users/mkbabb/Programming/glass-ui/dist/glass-ui.css` exists (43,090 bytes, 2026-05-21 16:02).
- `grep -c '@font-face' dist/glass-ui.css` → **0**.
- `grep -c 'url(' dist/glass-ui.css` → **0**.

**Verdict**: Contract-v2 §2.1 font-asset residual **STILL OPEN at the same posture as F close + G-AUDIT-4**. The published CSS has zero `@font-face` declarations and zero `url()` references. Consumers must still self-load fonts; value.js's `siblingFsAllowTransient` cannot retire until glass-ui ships font-inlining. **No change.** Disposition unchanged: PEER-AUTHORSHIP, (c) re-check trigger = glass-ui's `dist/glass-ui.css` next-publish.

---

## §7 — Glass-ui pushability

### §7.1 — 38 commits unpushed (was 33 at G-AUDIT-4)

The chronic-unpushed front grew by +5 since G-AUDIT-4. All 5 new commits are AK-tranche work that landed during the G open window. Local `master` is at `3822f48`; `origin/master` remains at `4b16de7`.

### §7.2 — Pushability blockers

`git status` is presumably clean (not directly probed in this lane — out-of-scope per READ-ONLY mandate; the most recent commit timestamps suggest active maintainer work, not blocked state). The 38-commit front includes:
- 16 AJ-tranche feature ships (cohesive set, presumably ready)
- 5 AK-tranche feature ships (newest; some carrying `(AK-W2-β1)` "precondition for chassis-spine hoist" — suggests downstream W2-β2 work in flight)
- The W8/W9/W10/W12 modernization sweep (TS 6, Vite 8, Rolldown — same chunky sweep keyframes.js carries)

**Push blocker hypothesis**: glass-ui maintainer is likely waiting for either (a) AK-W2-β2 chassis-spine hoist to complete the `28c8d7d` precondition's downstream, OR (b) an AK-tranche-close ratification gate before pushing the whole train. **Not a value.js-side action.**

### §7.3 — Effect on value.js's consumer experience

**Zero effect at runtime** — value.js's `package.json` declares `"@mkbabb/glass-ui": "file:../glass-ui"`, so the consumer reads the local working tree, NOT the npm-published version. All 38 unpushed commits are LIVE to value.js's demo today. This is exactly the same posture as F close.

**Effect on third-party consumers** (downstream of value.js): if value.js publishes a release tag (or a `dist/` snapshot) that depends on a glass-ui shape not yet on npm, those consumers will see resolution failures. Value.js currently has no third-party-consumer-facing glass-ui dependency (the demo isn't published as a library), so this is informational.

### §7.4 — Disposition

CARRY-FORWARD as **informational only** — value.js's working consumer experience is unaffected; the only sharpened-trigger condition is "if value.js publishes a tagged release that names a glass-ui shape only LIVE on the local file-link, third-party consumers will break." Not in scope for G's plan.

---

## §8 — Synthesis & disposition tally

### §8.1 — Per-disposition tally

| Disposition | Count | Items |
|---|---|---|
| **FOLD-INTO-G** | 5 | FOLD-1 (useBreakpoint adoption, 4 sites), FOLD-2 (PaletteSlugBar Button shim), FOLD-3 (G-AUDIT-5 correction), FOLD-4 (forward register MetricRow — promoted to NEW-2), FOLD-5 (publish HSV sub-ask API proposal) |
| **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | 3 | CF-1 (Aurora opacityCeiling), CF-2 (Metaballs 4 OPEN sub-asks), CF-3 (BlobDot 10-consumer) |
| **RAISE-AS-NEW-ASK** | 3 | NEW-1 (useAurora opacityCeiling option), NEW-2 (forward-register MetricStack), NEW-3 (confirm mode="layout" subsumption) |
| **RETIRE-MOOT** | 3 | MOOT-1 (positionSource ratified), MOOT-2 (duration ratified), MOOT-3 (G-AUDIT-5 stale finding) |
| **TOTAL surfaced** | **14 items** | |

### §8.2 — Headline findings

1. **G-AUDIT-5 carries a stale "MetaballCanvas not in glass-ui exports" finding.** The `./metaballs` subpath IS in glass-ui's `package.json` exports AND `dist/metaballs.{js,d.ts}` artefacts exist. The `WatercolorDot` extirpation blocker is the wrong-successor framing, not the missing-subpath one. FOLD-3 corrects this.

2. **`useBreakpoint` (AJ-W6-β) has 4 directly-named consumer-side adoption sites in value.js's demo** — 2 with verbatim subscribe-on-mount patterns matching the speedtest origin shape. This is the single highest-value FOLD-INTO-G action surfaced: ~30 LoC retire and 2 stale-snapshot composables become reactive. Subpath `@mkbabb/glass-ui/dom` is LIVE.

3. **Metaballs renegotiation gives 4 OPEN sub-asks + 2 NEW sub-asks from AJ's surface.** Value.js owns the prior art for the HSV-color-perturbation sub-ask (in `useMetaballRenderer.ts`). FOLD-5 proposes value.js publishes draft API surfaces for the 4 OPEN sub-asks so glass-ui's next tranche has a concrete shape to adopt instead of an ambiguous handoff.

4. **Glass-ui drifted +5 commits since G-AUDIT-4** (38 unpushed total, was 33). The new commits are AK-tranche work (InstrumentRail, Aurora opacityCeiling, scrim-breath keyframe, InstrumentChassis $slots gating, 17 sub-barrel publishing). None block value.js's G plan; the InstrumentRail + Aurora opacityCeiling surfaces add value-bearing primitives that the demo doesn't currently consume but will register as forward options.

5. **Contract-v2 §2.1 font residual UNCHANGED.** Zero `@font-face`, zero `url()` in `dist/glass-ui.css`. PEER-AUTHORSHIP.

6. **Pushability**: 38 commits unpushed; not a value.js-side blocker (file:link adoption is live). Operator-action gated.

### §8.3 — Recommended FOLD-INTO-G inserts to `coordination/Q.md` §6 ledger

Append 3 new ledger items (preserves the 21-item enumeration):

| # | Item | Origin | Disposition | (c) trigger |
|---|---|---|---|---|
| 22 | useBreakpoint adoption at 4 demo sites (`ImagePaletteExtractor.vue`, `ExtractPane.vue`, `useHoverPopover.ts`, `useCardMenu.ts`) | G-PEER-GLASS-UI FOLD-1 | **FOLD-INTO-G.W1 Lane** (mechanical demo consumer migration) | G.W1 close |
| 23 | `PaletteSlugBar.vue` icon-button shim to `<Button variant="ghost" size="icon" class="h-6 w-6">` | G-PEER-GLASS-UI FOLD-2 | **FOLD-INTO-G.W1 Lane** (mechanical demo cleanup; replace 2 raw `<button>` shapes with glass-ui Button shells; TODO comment becomes shim-removal trigger when ask #7 ships) | G.W1 close |
| 24 | G-AUDIT-5 §6 stale-finding correction (Metaballs subpath IS live) + sharpen `BlobDot` ask #3 blocker condition | G-PEER-GLASS-UI FOLD-3 / MOOT-3 | **FOLD-INTO-G.W1 Lane** (audit-doc correction) | G.W1 close |
| 25 | Publish proposed API surfaces for 4 OPEN Metaballs sub-asks (pointer, per-blob opacity, HSV perturbation, context-loss + pauseOnHidden) in `coordination/Q.md` §2.1 | G-PEER-GLASS-UI FOLD-5 / CF-2 sharpener | **FOLD-INTO-G.W1 Lane** (coordination-doc authorship) | G.W1 close |
| 26 | Lift `useAurora` to accept `opacityCeiling` option (glass-ui-side ask) | G-PEER-GLASS-UI NEW-1 | **RAISE-AS-NEW-ASK** (glass-ui peer authorship) | Re-check at glass-ui's next non-AK tranche-open |
| 27 | Forward-register `@mkbabb/glass-ui/metric-stack` + new value/unit color cascade as the publisher canon for any future value.js metric/stats surface | G-PEER-GLASS-UI NEW-2 | **CARRY-FORWARD as forward-registration** | Re-check on first value.js metric/stats surface authorship |
| 28 | User-ratification: confirm Metaballs `mode="layout"` ↔ AJ `positioning="local"` subsumption | G-PEER-GLASS-UI NEW-3 | **RATIFICATION REQUESTED** | User decision; if confirmed, retire from ask #1 sub-list |

### §8.4 — Authority

Pinned: `audit/G-AUDIT-4 §2` (peer HEAD), `coordination/Q.md §2.1` (user-ratified Metaballs renegotiation), `feedback_glass_ui_first_class.md` (glass-ui-is-the-design-system mandate), `feedback_library_gaps.md` (publisher-side absorption of hand-rolled patterns), the per-commit reads of all 18 AJ + AK ships listed in §2, and the source-file reads at `glass-ui/src/components/custom/metaballs/{MetaballCanvas.vue, useMetaballs.ts, types.ts}` + `glass-ui/src/composables/dom/{useBreakpoint.ts, useViewportReady.ts}` + `glass-ui/src/components/custom/aurora/Aurora.vue` + `glass-ui/package.json` exports map + `glass-ui/dist/{metaballs.js, metaballs.d.ts, glass-ui.css}` artefact verification.

**Lane verdict**: DEEP AUDIT COMPLETE. 14 items surfaced; 5 FOLD-INTO-G candidates ready for G.W1 Lane dispatch; 3 NEW peer-authorship asks raised; 3 RETIRE-MOOT confirmations land via FOLD-3 + (per `coordination/Q.md §2.1`) prior user ratification.
