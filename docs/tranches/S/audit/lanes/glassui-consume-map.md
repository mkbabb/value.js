# S · glassui-consume-map — audit lane

**Scope**: exhaustive demo/→glass-ui consume map (by specifier, by binding), cross-checked
against `../glass-ui`'s live 4.2.0 dist + the in-flight BG/BH 5.0.0 reshape (READ-ONLY,
branch `tranche/BG`); verification of the R-tranche relay-letter claims; the REVERSE
under-consumption/reinvention audit. AUDIT ONLY — no product-code edits, no commits.

**Repo state at audit time**: value.js `c5aa091` (branch `tranche-q`); glass-ui `c0176542`
(branch `tranche/BG`, package.json still `4.2.0` — 5.0.0 uncut); dev server live at
`:9000`, dist symlinked (`node_modules/@mkbabb/glass-ui → ../../../glass-ui`), glass-ui
dist last rebuilt **today 16:02** (post-dates the BG commits inspected below — the demo is
running against current BG-branch source, not a stale 4.2.0 snapshot). `npm run typecheck`
at HEAD: **0 errors** (both `tsconfig.lib.json` + `tsconfig.demo.json`) — every specifier +
binding below is currently type-sound.

---

## 1 · The consume map — every specifier demo/ imports

Verified by AST-shaped regex over every `.vue`/`.ts` under `demo/` (both `import` and
`export … from` re-export forms — the `ui/*/index.ts` shadcn-vue shims are `export … from`,
which a naive `import`-only grep misses and which undercounted the binding total in an
earlier pass).

**Demo consumes 18 real specifiers, not 16 and not the R-relay's 17** (see §2 for the
discrepancy). Root + 15 JS/TS subpaths + 3 CSS-only subpaths (`/styles`, `/styles.css`,
`/styles/fonts`) = 18.

| # | Specifier | Bindings (unique names) | Live in 4.2.0 dist? | 5.0.0 disposition |
|---|---|---|---|---|
| 1 | `@mkbabb/glass-ui` (root) | 88 — `Alert*`(3)·`Avatar*`(3)·`Badge`+`badgeVariants`+type·`Button`+`buttonVariants`+type·`Card*`(5)·`Checkbox`·`Collapsible*`(3)·`Dialog*`(9)·`DropdownMenu*`(14)·`HoverCard*`(3)·`Label`·`Popover*`(3)·`RadioGroup*`(2)·`Select*`(10)·`Separator`·`Sheet*`(9)·`Skeleton`·`Slider`·`Switch`·`Tooltip*`(4)·`copyToClipboard`·`useTouchGate` | YES (all 88 resolve; verified against `dist/glass-ui.js`) | **`./api` DROPS at 5.0.0** — its 203 symbols re-home onto owning subpaths (200 pure path-swap, 3 gain a new home: `Surface`→`/card`, `MenuItemVariants`→`/command`, `ControlSize`→`/forms`). None of the 88 root bindings above ride `/api` today (confirmed: these are all root-barrel-native, not `/api`-only) — **this specifier is unaffected by the `/api` fold**, a genuine zero-migration row. |
| 2 | `/aurora` | 11 — `useAurora`·`resolveAtoms`·`deriveAurora`·`resolveRenderMode`·`paletteToCssGradient`·`AuroraHarmony`·`AuroraMedium`·`AuroraMotionAtom`·`AuroraZoneArrangement`·type `AuroraAtoms` | YES | No planned rename. `AuroraConfig` slider descriptor via `/configurator` is a **carried GAP-5 ask** (F-3, recorded on `BH.B4e`, not yet landed). |
| 3 | `/color` | 2 — `deriveBlobPalette`·`oklchStopToHex` | YES | No planned rename. `uSatColor[]` / `bodyLightness` / `lightnessFloor` widen is the **HIGH-severity GAP-1 ask**, seated as `F9.R1 BG.W-BLOB-SATELLITE-SHADE` (named owner+cut, unlanded as of this audit — `grep uSatColor ../glass-ui/dist` = 0, re-verified). |
| 4 | `/configurator` | 1 — `ConfiguratorRow` | YES | No planned rename. |
| 5 | `/confirm-dialog` | 1 — `ConfirmDialog` | YES | No planned rename. |
| 6 | `/controls` | 1 — `DarkModeToggle` | YES | No planned rename. |
| 7 | `/dark` | 1 — `useGlobalDark` | YES | No planned rename. |
| 8 | `/dock` | 9 — `GlassDock`·`DockLayerGroup`·`DockLayer`·`DockIconButton`·`DockDropdownTrigger`·`DockSelectTrigger`·`DockSeparator`·`useLayerTransition`·`useOptionalDockContext` (×16 import *sites*, per the R relay's own count) | YES | No rename. **Carries a chronic unshipped ask**: `clampLabel` prop on `DockSelectTrigger` — filed since tranche **N** (7+ tranches ago, `docs/tranches/N/audit/lanes/C7.md:184`, `coordination/Q.md §3`), still absent from `../glass-ui/src/components/custom/dock/DockSelectTrigger.vue` at HEAD (verified: no `clampLabel` in `defineProps`). The demo carries a **documented workaround** (`Ad-18` marker, `DockViewSelect.vue:49-51`, `[&>span]:line-clamp-none` overriding the internal `line-clamp-1` on the trigger's label span) that this directly explains **S-7** (pill caret cropped — the un-overridden sibling sites never got the Ad-18 treatment). See §3 finding F1. |
| 9 | `/dom` | 1 — `useBreakpoint` | YES | No rename. |
| 10 | `/easing` | 3 — `EasingPicker`·`EasingPickerMode`·`EasingPickerValue` | YES | No rename. Composes exactly the 5 value.js exports the R-relay recorded (`CSSCubicBezier`·`steppedEase`·`bezierPresets`·`jumpTerms`·`parseSteps`) — verified live at `../glass-ui/src/components/custom/easing/`. **GAP-8 producer a11y defect** (preset `SelectTrigger` has no accessible name) folded onto `W-DESHADCN`, unlanded as of this audit. |
| 11 | `/forms` | 1 — `Input` | YES | No rename. **Under-consumed** — see §4 F1 (6 hand-rolled `<input>` sites bypass it entirely; this is S-17's direct root cause). |
| 12 | `/goo-blob` | 4 — `BLOB_CONFIG_DEFAULTS`·`BLOB_CONFIG_KEY`·`GooBlob`·type `BlobConfig` | YES | **RENAMES to `/blob` at 5.0.0** (R-relay GAP-2, **RULED, ACCEPTED**: subpath-only rename, all 4 symbols **STAY BYTE-IDENTICAL** — `GooBlob`/`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`/`BlobConfig` keep their names, they already carry `BLOB` not `GOO_BLOB`). Pinned to the `BH.B2.1-swap` export-reshape regen row (R14). 4 import sites re-point the specifier only — mechanical, one-line-per-site. |
| 13 | `/search` | 1 — `SearchBar` | YES | No rename. |
| 14 | `/styles` | CSS import (`style.css:52`) | YES | No rename. |
| 15 | `/styles.css` | CSS import (`style.css:53`) | YES | No rename. Real specifier — do not conflate with #14. |
| 16 | `/styles/fonts` | CSS import (`style.css:58`) | YES | **NOT COUNTED in the R-relay's "17-specifier" table — a genuine 18th specifier the table must also carry.** See §2. |
| 17 | `/tabs` | 1 — `SegmentedTabs` | YES | No rename (already migrated off compound `ui/Tabs` at R.W2, per BA.W-TABS which shipped **in 4.2.0**, not the 5.0.0 cut — this migration is already historical/closed, correctly noted "done" by the R relay). |
| 18 | `/watercolor-dot` | 1 — `WatercolorDot` | YES | No rename. |

**Aggregate**: 126 unique named bindings across the 15 JS/TS specifiers (root dominates at
88; `/dock` next at 9; `/aurora` at 11). All 126 resolve cleanly against the live dist
(spot-checked every binding with `grep -q "export.*\bNAME\b"` against the matching
`dist/<subpath>.js`; the 5 "misses" — `AlertVariants`, `AuroraHarmony`/`AuroraMedium`/
`AuroraMotionAtom`/`AuroraZoneArrangement`, `BlobConfig` — are all `import type` sites,
correctly absent from the `.js` runtime and confirmed present in the `.d.ts` barrel chain).

---

## 2 · Verifying the R-books

**`goo-blob → blob`**: CONFIRMED RULED at the glass-ui BG reply (`docs/tranches/BG/
coordination/VALUEJS-R-RELAY-2026-07-04.md:108`, echoed at `BH.PLAN.md:101` as rename
row "R14", pinned to the `BH-B2.1-swap` regen). Subpath-only; symbols stay. **Not yet
landed** — current dist still ships `dist/goo-blob.d.ts`/`.js` (verified: no `dist/blob.*`
exists). The demo's 4 import sites (`useAtmosphere.ts`, `HeroBlob.vue` via `useAtmosphere`,
`BlobPane.vue`) will need the one-line specifier swap when BG cuts 5.0.0. This is a clean,
low-risk, single-PR migration — no symbol churn, no behavior change.

**`/tabs`**: CONFIRMED CLOSED, correctly so. The compound `ui/Tabs` retirement (BA.W-TABS)
shipped in the **4.2.0 line already** (historical, not part of the pending 5.0.0 reshape);
value.js migrated to `SegmentedTabs` at R.W2 per its own books. The R-relay's note "now
`SegmentedTabs`-only; value.js migrated at R.W2" is accurate — no open item here.

**`/easing` — the "17th specifier"**: CONFIRMED it joined the consumed set at R.W4 and is
correctly flagged as needing a MIGRATION-table row. **However the R-relay's count of "17"
(16 + easing) undercounts by one**: `/styles/fonts` (`demo/@/styles/style.css:58`) is a
real, distinct exports-map key (`"./styles/fonts": { "types": "./dist/styles/fonts.d.ts",
... }`) separate from both `/styles` and `/styles.css`, consumed for the Plus Jakarta Sans
+ Fira Code woff2 corpus — and it never appears in either the R-relay's 16-row table or the
BG reply's confirmation ("root + 15 subpaths + `/easing` the 17th, `/styles.css` included").
Neither reply names `/styles/fonts` at all. **This is a real gap in the very MIGRATION-table
discipline GAP-3 was designed to guarantee** (the by-name table exists precisely to prevent
"the compound-`Tabs` removal shipped with no MIGRATION row" class of defect — an unnamed
18th specifier is the same class of risk one degree quieter, since a CSS-only import
dropping silently degrades typography rather than crashing the build). **Recommend**: file
a one-line addendum to the BG/BH thread naming `/styles/fonts` as the 18th row before
`BH.B4e`'s 203-row table is authored (it is not yet authored — `MIGRATION.md:1` still reads
`# MIGRATION—v0.9.x → v1.0 → v2.0` with zero `## 5.0.0` content, confirmed live).

---

## 3 · Forward findings (ranked)

**F1 — P1 · `clampLabel` on `DockSelectTrigger` — chronic unshipped producer ask, directly
explains S-7.** `docs/tranches/N/audit/lanes/C7.md:184` files it; `demo/@/components/
custom/dock/DockViewSelect.vue:49-51` (Ad-18 marker) carries the consumer-side workaround
(`[&>span]:line-clamp-none`) at exactly one call site. Every OTHER `DockSelectTrigger`
consumer (verified: `PalettesPane`'s pill selector per S-7's screenshot) has no such
override and inherits the raw `line-clamp-1` truncation glass-ui's `dock.css` bakes onto
the trigger's internal label span — the caret gets clipped when the label wraps/truncates
oddly. **Root-routing: glass-ui producer** (`src/components/custom/dock/
DockSelectTrigger.vue` needs the `clampLabel?: boolean` prop the N-tranche ask specified;
demo's `Ad-18` workaround is a stopgap, not a fix, and should NOT be replicated at more call
sites — that would be spreading a workaround instead of fixing the root, precept-violating).
**Candidate wave-item**: re-file the ask against `BH.B2`/`BG` (it predates BG/BH and has
never landed across ~7 tranches — this is the kind of "silent slip" GAP-1's ratified
"hard ask, not a soft re-book" posture exists to prevent; recommend the same posture here).

**F2 — P1 · The channel-letter rail (S-3) already tried + rejected the wrong glass-ui
primitive, and never tried the right one.** `ComponentSliders.vue:309-312`: "Channel label
rail (N.W1.A — replaces the non-existent GlassCarousel) … The carousel primitive was a
category error (C1 P0-2); the rail is a static 3–5 item navigational index." This is
correct as far as it goes (glass-ui's actual `Carousel`/`CarouselContent`/`CarouselItem`
family, `dist/carousel.d.ts`, is genuinely paged/scrollable-content-shaped, not a static
tablist — the N.W1.A rejection was sound). **But the rail then hand-rolls, from raw CSS,
exactly the primitive glass-ui already ships for "a static N-item navigational index with
roving keyboard focus + an active highlight": `<SegmentedTabs>`**, which as of BA.W-TABS
(already shipped, 4.2.0) is "ONE engine, TWO materials (`pill`/`underline`), ONE
`orientation` axis (`horizontal`|`vertical`)" — `orientation="vertical"` is live
(`../glass-ui/src/components/custom/tabs/SegmentedTabs.vue:92,117,144`). The demo ALREADY
consumes `SegmentedTabs` elsewhere (`PaneSegmentedControl.vue`) but never explored the
vertical orientation for this rail. The user's own framing — "almost like a mini glass-ui
dock" — additionally points at `DockIconButton`'s ring-on-active treatment
(`--dock-ring`, already consumed at `DockViewSelect.vue:55`) as the exact "ring in a
modified variant of the current color" idiom requested. **Root-routing: value.js demo**
(no glass-ui gap — both `SegmentedTabs orientation="vertical"` and the dock ring idiom
already exist and are already consumed elsewhere in this same app; this is a same-repo
reuse miss, not a producer ask). **Candidate wave-item**: re-home the channel rail onto
`<SegmentedTabs variant="underline" orientation="vertical">` (or a `DockIconButton`-styled
column) instead of the bespoke `.channel-rail-item` CSS block (~35 lines of hand-rolled
hover/focus/active states this would retire).

**F3 — P2 · `Input` (`/forms`) is a 1-binding under-consumption; 6 sites hand-roll
`<input>`, directly explaining S-17.** See §4 F1 (full detail; cross-listed here because it
is as much a consume-map gap as a design one).

**F4 — P2 · The `/styles/fonts` 18th-specifier gap (§2) should be filed before `BH.B4e`
authors the 203-row table**, or the by-name MIGRATION table GAP-3 exists to guarantee will
itself ship incomplete — a small, low-cost, high-leverage fix given the table doesn't exist
yet on disk.

**F5 — P2 · `.space-capsule.veil-surface` — the ONE consumer of glass-ui's veil-tier
primitive is also the site S-1 asks to have its chrome removed entirely.** Grep confirms
`veil-surface` (glass-ui's `src/styles/glass/surface-axis.css` primitive — an intentionally
low-chrome "hairline veil capsule" tier) has exactly one consumer in the whole demo tree:
`ColorSpaceSelector.vue`'s `.space-capsule` wrapper div — the same component both the picker
card and the About page render (confirmed: `AboutPane.vue` imports and renders the
identical `ColorSpaceSelector.vue`, not a second fork — so **S-1's "two inconsistent
dropdowns" is not two implementations diverging; it is one shared component whose visual
result differs by call-site context** (About wraps it inline inside `<PaneHeader>`'s title
slot; the picker renders it standalone) — worth the other visual-runtime lane confirming
which CSS cascade/context difference (font-family inheritance from the heading vs. the
card) actually produces the "wrong face" the user saw, since it is NOT a second `veil-
surface` misuse). **Root-routing: value.js demo** — S-1 wants zero pill/background, i.e.
drop `.space-capsule.veil-surface` from `ColorSpaceSelector.vue` outright (pure typography +
caret) rather than restyling it; this is a full removal of the ONE `veil-surface` call site
in the app, not a producer ask.

---

## 4 · The REVERSE table — glass-ui primitives under-consumed or reinvented

| Primitive (glass-ui) | Demo consumption | Verdict | Evidence |
|---|---|---|---|
| **`Input` (`/forms`)** | 1 named-import site (`ui/input/index.ts`); used directly in only 3 files (`AdminAuthGate.vue`, `AdminPaletteOps.vue`, `CurrentPaletteEditor.vue`) | **UNDER-CONSUMED — root cause of S-17.** 6 other text-input sites hand-roll a raw `<input>` with bespoke Tailwind (`bg-transparent border-none outline-none …`), which is exactly why they render un-rounded / off-system: `ImageDropZone.vue:23`, `AdminAuditPanel.vue:5,11`, `AdminTagsPanel.vue:17,23`, `PaletteRenameInput.vue:8`, `SearchFilterBar.vue:84`, `dock/layers/SlugEditLayer.vue:81`. | grep census, read `PaletteRenameInput.vue` (confirms hand-rolled `class="… bg-transparent border-none outline-none …"`, no glass-ui `Input`). |
| **`Carousel`/`CarouselContent`/`CarouselItem`/`CarouselPager` (`/carousel`)** | **0 imports anywhere in demo/** | Reinvented-then-rejected once already (see F2) — the rejection was correct (Carousel ≠ static index), but the search stopped there instead of trying `SegmentedTabs` vertical. No current legitimate carousel/rail use-case is going unserved by this gap; flag as a **process note**, not a live defect: any future paged-content surface (e.g. a swatch-strip "next/prev" browse) should reach for `/carousel` before hand-rolling. | grep: zero hits for `glass-ui/carousel` or bare `Carousel` outside the rejected-comment reference. |
| **`Skeleton` variants (`pulse`/`shimmer`/`breath`) + `surface` (`glass`/`opaque`)** | Well-consumed — `PaletteCardSkeleton.vue` already uses `surface="glass" variant="shimmer"` with a per-item `animationDelay` stagger (`i * 0.12s` / `i * 0.1s`) | **GOOD — not a gap.** This directly answers half of S-10 (palette-loading shimmer already IS the glass-ui shimmer register, already staggered per-swatch). What S-10 additionally wants — "shimmers should run SEQUENTIALLY per palette AREA" (strip → metadata → swatches, not all three regions firing at once) and "darker, more unified" shadow tone — is a *timing/tone* tune within the existing consumed primitive, not a new-primitive ask. Root-routing: value.js demo (`PaletteCardSkeleton.vue` delay offsets + `--skeleton-glass-bg` tuning), not glass-ui. | Read `PaletteCardSkeleton.vue` in full; read glass-ui `src/components/ui/skeleton/Skeleton.vue` (confirms the 3-variant/2-surface contract, `BA.W-SURFACE-AXIS`). |
| **`ConfirmDialog` (`/confirm-dialog`)** | 3 consumers (`PalettesPane.vue`, `AdminUsersPanel.vue`, `DeleteAllConfirm.vue`); no bare `window.confirm(...)` found anywhere in demo/ | **GOOD — not a gap.** Reasonable coverage of the destructive-action surface; not a candidate for this wave. | grep census across demo/. |
| **`DockSelectTrigger` `clampLabel`** | N/A — the prop doesn't exist yet | **Producer gap**, see F1. | — |
| **veil tiers (`.veil-surface`)** | 1 consumer, and it is the site S-1 wants stripped of chrome | **Over-applied-then-unwanted**, see F5 — not literally "under-consumed" but flagged because the task named veil tiers as a candidate axis; the finding is the opposite direction (a single misplaced application, not a missed one). | grep across `demo/@/**/*.{vue,css}`. |
| **Select `variant="ghost"` (trigger de-chroming)** | Already used correctly at `ColorSpaceSelector.vue:29` (`variant="ghost" size="audacious"`) — the *trigger* itself is already chromeless; the pill look in the screenshots comes entirely from the wrapping `.space-capsule.veil-surface` div, not from `SelectTrigger`. | **Not a gap** — reinforces F5's diagnosis: removing the wrapper, not re-theming the trigger, is the S-1 fix. | Read `ColorSpaceSelector.vue` in full. |

---

## 5 · MIGRATION table skeleton — the 5.0.0 adopt event (value.js side)

For `BH.B4e`'s eventual 203-row producer table, value.js's own by-name walk (the mechanical
half of the adopt) is exactly these rows — this is the skeleton the tranche-S implementation
wave should execute against once glass-ui cuts 5.0.0:

| # | Specifier / symbol | Change | value.js file(s) to touch | Risk |
|---|---|---|---|---|
| 1 | `@mkbabb/glass-ui/goo-blob` → `@mkbabb/glass-ui/blob` | subpath rename, symbols byte-identical | `demo/@/composables/color/useAtmosphere.ts` (2 imports), `demo/@/components/custom/panes/BlobPane.vue` (1 type import) | LOW — mechanical string swap, 3 files |
| 2 | `peerDependencies.@mkbabb/glass-ui` in `demo`/root `package.json` | glass-ui's own value.js peer floor stays `^1.2.0` at BG.W-CUT (NOT `^2.0.0` — gated on keyframes.js's own value peer, currently `^1.2.0`, flagged to keyframes) — **no value.js-side action**, informational only | — | — |
| 3 | `/easing` MIGRATION row | confirm 5-export contract (`CSSCubicBezier`/`steppedEase`/`bezierPresets`/`jumpTerms`/`parseSteps`) stays cited; no consumer change | none (verify-only) | NONE |
| 4 | `/styles/fonts` MIGRATION row | **currently unnamed in either side's table — file the addendum (§2)** before treating the 203-row table as complete | `demo/@/styles/style.css:58` (no code change; verify the row exists) | LOW but currently a **process gap** |
| 5 | `uSatColor[]` / `bodyLightness` / `lightnessFloor` on `deriveBlobPalette` | new params land at `F9.R1 BG.W-BLOB-SATELLITE-SHADE` — value.js's `useAtmosphere.ts` derives satellite shades once this lands (currently absent — `grep uSatColor` = 0) | `demo/@/composables/color/useAtmosphere.ts` | MED — feature-gated on producer landing, not yet actionable |
| 6 | `EasingPicker` preset `SelectTrigger` accessible name | producer a11y fix, folded onto `W-DESHADCN`, unlanded | none (consume-only; re-run the a11y snapshot at `docs/tranches/R/audit/R.W4-visual-runtime/a11y/` once producer ships) | LOW |
| 7 | `clampLabel` on `DockSelectTrigger` | still unfiled-as-landed after 7+ tranches (F1) — **re-escalate**, do not silently re-book a 4th time | `demo/@/components/custom/dock/DockViewSelect.vue:49-51` (retire the `Ad-18` workaround once landed) | LOW once producer ships |
| 8 | `.retired-classes.txt` / by-name discipline (GAP-5 F-4) | producer ceremony, no value.js action | — | — |
| 9 | `AuroraConfig` slider descriptor via `/configurator` (GAP-5 F-3) | producer ceremony, carried on `BH.B4e`, no value.js action yet | — | — |
| 10 | dts-emitting `build:watch` (GAP-5 F-1) | producer tooling, no value.js action | — | — |

**Everything else (14 of the 18 specifiers) is a zero-migration row** — confirmed no
rename/deprecation lands on `/aurora`, `/color`, `/configurator`, `/confirm-dialog`,
`/controls`, `/dark`, `/dock` (besides the F1 prop-add, additive-only), `/dom`, `/forms`,
`/search`, `/styles`, `/styles.css`, `/tabs`, `/watercolor-dot`, or the 88-binding root
barrel. The 5.0.0 adopt for value.js is genuinely small: **1 mechanical rename (row 1) + 1
documentation gap to close (row 4) + 3 producer-side asks to re-verify at cut (rows 5, 6,
7)** — the rest is confirmation, not code.

---

## 6 · Under-consumption / reinvention table (candidate wave-items)

| # | Finding | Root-routing | Priority | Candidate wave-item |
|---|---|---|---|---|
| 1 | 6 hand-rolled `<input>` sites bypass glass-ui `Input` (F3/S-17) | value.js demo | **P1** | Migrate `ImageDropZone.vue`, `AdminAuditPanel.vue` (×2), `AdminTagsPanel.vue` (×2), `PaletteRenameInput.vue`, `SearchFilterBar.vue`, `dock/layers/SlugEditLayer.vue` onto `<Input>` from `@components/ui/input` |
| 2 | Channel-letter rail hand-rolls what `SegmentedTabs orientation="vertical"` (+ dock ring idiom) already provides (F2/S-3) | value.js demo | **P1** | Re-home `ComponentSliders.vue`'s `.channel-rail-item` block onto `<SegmentedTabs variant="underline" orientation="vertical">` |
| 3 | `clampLabel` on `DockSelectTrigger` — chronic 7+-tranche unshipped ask (F1/S-7) | **glass-ui producer** | **P1** | Re-escalate with the same "hard ask, named owner+cut" posture GAP-1 used, not a 5th soft re-book |
| 4 | `.space-capsule.veil-surface` wrapper is the ONE veil-tier consumer and the exact site S-1 wants de-chromed (F5/S-1) | value.js demo | **P1** | Drop the capsule wrapper from `ColorSpaceSelector.vue`; keep `SelectTrigger variant="ghost"` (already correct); the "two inconsistent dropdowns" report is one shared component rendering differently by call-site context — confirm+fix the About-vs-picker cascade delta in the same pass |
| 5 | `/styles/fonts` unnamed in either side's specifier count (F4/§2) | **glass-ui producer** (table authorship) + value.js (file the addendum) | **P2** | One-line addendum to the BG/BH coordination thread before `BH.B4e` authors the 203-row table |
| 6 | `goo-blob → blob` rename ready to execute once BG cuts | value.js demo (consumer re-point) | **P2** (blocked on producer cut) | 3-file specifier swap, zero symbol changes |
| 7 | `Carousel` family (0 consumers) — not currently a defect, flag for future paged-content use | value.js demo (process note) | **P2 (informational)** | None actionable now; note in design-idiom catalog so a future rail/paged-swatch surface reaches for `/carousel` before reinventing |

---

**Summary of method**: full-repo AST-shaped regex census of every `import`/`export …
from` referencing `@mkbabb/glass-ui*` in `demo/`; every binding cross-checked against
`../glass-ui/dist/*.js` (runtime) and `.d.ts` (types) at the live symlinked dist (rebuilt
today, post-dates the BG commits read); the R-tranche relay letter + BG's reply read in
full and independently re-verified (not taken on faith) against current glass-ui source —
one real gap found (`/styles/fonts`, §2) and one real ambiguity resolved (S-1's "two
dropdowns" is one component, not two, §3 F5). `npm run typecheck` 0 errors at HEAD confirms
none of this is currently broken — all findings are forward-looking (5.0.0 adopt
mechanics) or same-repo reuse gaps (the reverse table), not live regressions.
