# Tranche S · Lane — glass-ui BG+BH assay: the forthcoming-at-5.0.0 map, S-ledger producer-half routing, prune set, and BG collisions

**Author:** glassui-bg-bh-assay lane · **Date:** 2026-07-04 · **Mode:** AUDIT-ONLY (tranche development)
**Sibling under assay:** `../glass-ui` @ `c0176542` (branch `tranche/BG`, version **4.2.0** → cutting **5.0.0** jointly BG+BH). READ-ONLY.
**value.js @** `c5aa091` (branch `tranche-q`), consuming glass-ui via `file:../glass-ui` (deliberate Q4 pin — every dist rebuild lands on value.js's next build, no version ceremony).

---

## 0 · TL;DR routing table (every S-finding with a producer half)

| S | Surface | Producer surface exists? | Landed / forthcoming | ROUTE-AT-ROOT verdict |
|---|---------|--------------------------|----------------------|-----------------------|
| S-1 | color-space dropdown as pure title | No glass-ui primitive; value.js-local `ColorSpaceSelector.vue` | n/a | **value.js demo** (DRY the two call-sites; not a producer ask) |
| S-2 | slider thumb black / border thick | **YES** `@mkbabb/glass-ui/slider` (`Slider`+`sliderVariants`) — de-shadcn'd + `liquid-fill` register | Slider redesign **PARTIAL** (WS4-11); `BG.W-LIQUID-FILL` **landed** `98b76451`; de-shadcn WS4/WS10 | **glass-ui producer** — value.js consumes local shadcn today; adopt `/slider` at 5.0.0 |
| S-16 | slider hover (like gradient picker) | same `/slider` + `motion` axis (`BG.W-MOTION-AXIS` landed `f2683796`) | landed axis; hover polish rides de-shadcn | **glass-ui producer** (hover states on the redesigned Slider) |
| S-3 | channel-letter rail = mini-dock/carousel w/ ring | **YES** `/dock` fission + `/carousel` | dock-fission **DECIDE** wave (`BG.W-DOCK-FISSION-WIRE`) not yet landed | **glass-ui producer** (the rail primitive) **+ value.js demo** (wire it) |
| S-8 | collapsed dock = WatercolorDot+icon, no text, perfect circle | **YES** `/dock` collapsed-state + `/watercolor-dot` | dock-shrink **PARTIAL** (WS2-10); collapsed-circle recurs | **glass-ui producer** (collapsed contract) **+ value.js demo** (compose Dot+icon) |
| S-10 | skeleton/shadow palette loading variants; sequential shimmer | Skeleton axis (`SkeletonSurface`→`Surface`) exists; no palette-variant | not specced producer-side | **value.js demo** (palette-shaped skeleton is app-specific) **+ optional glass-ui** knob |
| S-13 | EasingPicker refine + a11y + animated | **YES** `/easing` (`EasingPicker`) — value.js consumes it LIVE | a11y fix **booked** in `W-DESHADCN` (relay item 8, ACCEPTED) | **glass-ui producer** (a11y + preset polish); animation host is value.js |
| S-15 | edge aliasing/dithering (dots, palettes, glass) | **YES** `BG.W-CORNER-ALIAS-KILL` + `BG.W-GLASS-CLIP-DISCIPLINE` | CORNER-ALIAS **landed** `3fcad1a0`; CLIP-DISCIPLINE in WS3 | **glass-ui producer** (verify at adopt) **+ value.js demo** for local canvas dots |
| S-17 | inputs not rounded | **YES** `@mkbabb/glass-ui/forms` (`Input`) — de-shadcn'd | de-shadcn WS4/WS10 | **glass-ui producer** — value.js consumes local shadcn `@components/ui/input` today |
| S-18 | aurora not deriving H+C from color | **YES** `/aurora` `deriveAurora` — ALREADY varies H+C | dist LIVE, rich knob-set | **value.js demo** (wiring defect — see §3.S18; NOT a producer gap) |
| S-20 | cartoon-card glassiness inconsistency | **YES** `Card` surface/`cartoon` axis (`BG.W-CARTOON-INK-GAMUT` landed, `BG.W-CARTOON-CARD` family) | cartoon-ink landed; single-root Card BOOKED (ATLAS-N C2) | **glass-ui producer** (Card cartoon+glass tier) **+ value.js demo** (pick ONE variant) |
| — | S-4 blob satellites `uSatColor[]` | **YES (NEW)** `F9.R1 BG.W-BLOB-SATELLITE-SHADE` | **NAMED OWNER + CUT** at 5.0.0 (relay item 1 ACCEPTED) | **glass-ui producer** — the hard ask, now seated |

---

## 1 · The forthcoming-at-5.0.0 map

glass-ui is mid-BG-execution on branch `tranche/BG`; **`origin/master` stays 4.2.0-era until the 5.0.0 cut** (`6afe14c5`). The joint cut = **BG close (through WS12) + BH restructure**. What value.js's `file:` dist gets at that cut:

### 1a · Dock fission surfaces (BG WS2 + the D13 headline)
- **`BG.W-DOCK-DECOMPOSE`** — `GlassDock.vue` 711L → colocated fission-wiring; `container-type` clamp designed out.
- **`BG.W-DOCK-FISSION-WIRE`** — the DECIDE: wire ≥2 real fission surfaces or retire; `railProjection.fadeMinAlpha` floor; DRY the goo bridge onto ONE `GooFilter`.
- **`BG.W-DOCK-MORPH-UNIFY`** — 5 `SpringProgress` sites → ONE `useDockSpring` factory; `dockLayerFlip.ts`; `proof:dock-fission` F1.
- **`BG.W-DOCK-INPLACE-MORPH`** (D13) — in-dock button flips REAL dock V↔H in place via liquid teardrop; deletes modal + synthetic + VT-crossfade.
- **`BG.W-SIRI-ISLAND` / `BG.W-SIRI-DOCK-INTEGRATION`** — new `/siri-island` published subpath (WS6 +1); the "Search or Ask" pill composes existing `useDockSearch`.
- Dock **collapsed/shrink** (WS2-10) is **PARTIAL** — "perfect CIRCLE not oval" + "shrunken icon aligned" still owed. **`density`→`size` rename** (`BH.W-SIZE-UNIFY`, landed `9ff29402`): `compact→sm/comfortable→md/spacious→lg/audacious→xl`; `DockDensity` DELETED — **a by-name break value.js's 16 `/dock` sites must absorb**.

### 1b · De-shadcn (BG WS4 sweep + WS10 deep census)
- **`BG.W-DESHADCN-SWEEP`** (WS4, WS10's W0 precondition) — registers `proof:de-shadcn`, clears 7 form violations.
- **`BG.W-DESHADCN-CENSUS`** — full 233-file sweep, raw-tw-palette + opacity-NN arms.
- **`BG.W-DESHADCN-TOKEN-REPLACE`** — token-first register; **`--ring`→`--focus-ring-color` clean-break rename** (no alias); ToastClose→destructive; ai-amber→`--accent-ai`.
- **`BG.W-DESHADCN-MATERIAL`** — grouped-inset Select elevation-inversion; Switch static `color-mix(in oklab)`.
- **`BG.W-DESHADCN-GATE`** — lock `proof:no-shadcn-default`, WebKit-dark Playwright project.
- **Binding bar:** ZERO default shadcn/reka/tailwind style survives. **This is the S-2/S-16/S-17/S-20 producer engine** — the de-shadcn'd Slider/Input/Card are what value.js adopts.

### 1c · BorderProgress + liquid-fill
- **BorderProgress** (10–14px border) + **CompletionSeal** (earned-gold) — cross-repo component asks recorded **ADDRESSED** (WS4-23). Live subpaths.
- **`BG.W-LIQUID-FILL`** — **LANDED `98b76451`** (`462f562e` src): extracts Slider glass-cylinder fill as ONE shared `liquid-fill` register, `proof:liquid-fill` GREEN. This is the Slider fill mechanism S-2/S-16 want.

### 1d · Sheet / menu / axes work (BH grammar waves)
- **`BH.W-AXIS-GRAMMAR`** — mint `src/components/ui/_shared/axes.ts` (`Size`/`Orientation`/`Motion`/`Surface`); homonym kills (GlassPanel `variant`→`tier`; `CardSurface`/`SkeletonSurface`/`BadgeVariants['surface']` fold onto `Surface`; `cartoon` becomes Card-local; `TabsIndicator surface`→`plate`). New **types-only `/axes` subpath**.
- **`BH.W-SIZE-UNIFY`** — the `default`→`md` + `density`→`size` clean-break (see 1a).
- **`BH.W-MOTION-AXIS`** — **LANDED `f2683796`**: 7-boolean motion scatter → ONE `motion` axis (`full`/`reduced`/`off`) across Card/Dialog/Sheet/Slider/SegmentedTabs/DockLayerGroup. Sheet + menu ride the same reshape.
- Overlay/Sheet enter: `BG.W-OVERLAY-ENTER-PAINT` is **PENDING** (dual-engine FAIL, fix owed `dba0ddb4`); `BG.W-DRAWER-PAINT-BIND` **DONE** `c0176542`.

### 1e · The `components.css` layer cure — **LANDED**
- D8-1 `layer(components)` cure: `dist/styles/index.css:266` reads `@import "./components.css" layer(components);` ✓ (`4b637036`), second site `dist/styles/deferred.css:34` cured `67dedcf1`. value.js's book is **RETIRED** (relay item 7). No forthcoming work; confirmation only.

### 1f · Paper-texture pipeline (BG WS9)
- **`BG.W-PAPER-GRAIN-REAL`** — replace grey feTurbulence speckle (reads metallic) with warm `feDiffuseLighting` LIT tooth; azimuth locked to `--glass-key-direction`.
- **`BG.W-PAPER-SUFFUSE`** — ONE warm-lit source across ~12 surfaces; DELETE `--paper-clean-texture`; KEEP `--paper-aged-texture`.
- **`BG.W-PAPER-GRAIN-OPTIN`** (landed direction) — demoted universal 0.22 grain → per-surface opt-in. **This is the S-6 netting/hatch producer lever** (see §3.S6). WS9 is only **64%** (lit-tooth cross-engine determinism unproven; Safari `lighting-color` colorspace risk).

### 1g · Export reshape (BH B2 — the 5.0.0 consumer break, exactly)
- **Drop `./api`** (203 symbols re-home; value.js does NOT consume `/api` — zero break).
- **`goo-blob → blob` SUBPATH rename** — value.js's `App.vue:115` + `useAtmosphere.ts:32` re-point; **symbols STAY** (`GooBlob`/`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`). ONE MIGRATION row (relay item 2 RULED).
- **17-specifier by-name MIGRATION table** committed on `BH.B4e` (relay item 3 ACCEPTED) — includes `/easing` (17th).
- **Peer floor** rides to `@mkbabb/value.js ^1.1.1` at `BH.B2.1-swap` (gated: cannot lead to `^2.0.0` while keyframes deps `value ^1.2.0` — relay item 6). **value.js published 2.0.0 and awaits keyframes' value^2 adopt.**

---

## 2 · S-ledger producer-half routing (evidence + verdict, ranked)

### P0 — the hard asks + the at-root primitives value.js is NOT consuming

**S-2 / S-16 / S-17 — Slider + Input are LOCAL shadcn, not glass-ui.**
- Evidence: `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:110` → `import { Slider } from "@components/ui/slider"`; `demo/@/components/custom/palette-browser/{AdminPaletteOps,CurrentPaletteEditor,AdminAuthGate}.vue` → `import { Input } from "@components/ui/input"`.
- glass-ui **already publishes** `/slider` (`Slider`+`sliderVariants`, `dist/slider.js`) and `/forms` (`Input`, `dist/forms.js`) as 4.2.0 subpaths — de-shadcn'd + `liquid-fill`-backed at 5.0.0.
- **The black-thumb / thick-border / no-rounding defects live in value.js's vendored shadcn tree**, which S-21 ("all component changes AT THE ROOT — glass-ui or here, never per-instance") forbids patching per-instance.
- **VERDICT: glass-ui producer is the root** — value.js should ADOPT `@mkbabb/glass-ui/slider` + `/forms#Input` at the 5.0.0 event and DELETE the local `@components/ui/{slider,input}`. This is the single largest at-root win in the ledger. **Candidate wave-item S.W-ADOPT-GLASS-FORMS.** No producer letter needed (the surface exists); the de-shadcn/hover polish is already BG-owned. If value.js's spectrum-slider needs the "squircle track, thinner thumb" special case, that IS booked producer-side in WS4-11 ("spectrum = value.js") — verify at adopt, letter only if it regresses.

**S-4 — blob satellites `uSatColor[]`.**
- The ONE tranche-N ask that never shipped, three silent slips deep (`grep uSatColor dist/` = 0, re-verified at R-close). value.js hero blob `demo/color-picker/App.vue:115` cannot derive satellite shades.
- **NOW SEATED:** `F9.R1 BG.W-BLOB-SATELLITE-SHADE` (relay item 1 ACCEPTED, NAMED OWNER + CUT) — per-satellite GL color-seam widen + `bodyLightness`/`lightnessFloor` on `deriveBlobPalette`, riding the 5.0.0 blob rebuild; byte-identical default paint.
- **VERDICT: glass-ui producer — already booked.** No new letter. value.js's U3 residual closes at the consume. **The blob perf half (single-canvas/IO/PRM) is CONFIRMED landed** (relay item 4). value.js's S-4 "spazzes/too small/clipped" is then split: the *satellite absence* + *anchor-bias wander* are producer (F9.R1 + the item-9 anchor-bias option); the *placement/clip at card corner* is likely value.js-demo host CSS (verify at adopt).

### P1 — producer surfaces that exist but need polish/wiring

**S-13 — EasingPicker refine + a11y + animated.**
- value.js consumes `<EasingPicker>` LIVE: `GradientVisualizer.vue:13-14,294`, `useGradientModel/useGradientCSS`. The EasingSelector fork is DELETED.
- **Producer a11y defect already booked:** relay item 8 (ACCEPTED) — the preset SelectTrigger reads `combobox: linear` (value, no label); folded onto `W-DESHADCN` accessible-name arm. Fires "landed @ commit."
- **VERDICT: glass-ui producer** for the a11y label + preset-menu polish (the `bezierPresets` "smooth-step-3" + 15 tightened rows flow through automatically at value.js 2.0.0). The **animation/preview host** is value.js-demo (the gradient pane animates the curve). S-13's "made functional like keyframes.js's easing facility" — cross-check keyframes.js `/easing` (tranche S dev'd, 5.1.0); the curve MATH is 100% value.js (`CSSCubicBezier`/`steppedEase`/`bezierPresets`/`jumpTerms`/`parseSteps`, the 5-export contract glass-ui `/easing` composes). **Candidate: S.W-EASING-PANE-ANIMATE (demo)** + verify the producer a11y fix at its commit.

**S-3 — channel-letter rail as mini-dock/carousel with ring.**
- value.js rail is a local column (not glass-ui). glass-ui owns `/dock` (fission) + `/carousel`.
- **VERDICT: split.** The "mini glass-ui dock" primitive with a ring-in-modified-current-color is a glass-ui **producer** capability (the dock-fission rail + `railProjection`), but the ring-hue derivation reads value.js's `--accent-view` one-resolver law (relay item 9). **Route:** consume the fissioned dock/carousel rail at 5.0.0; wire the accent-ring value.js-side. If glass-ui's rail lacks a "letter-rail" variant, that is a **paired-authorship inbox letter** candidate — but dock-fission is a DECIDE wave (not yet landed), so BOOK it against the adopt event rather than letter now.

**S-8 — collapsed dock = WatercolorDot + icon, no text, perfect circle.**
- value.js dock: `demo/@/components/custom/dock/{Dock,DockViewSelect}.vue`; consumes `/watercolor-dot` (11 sites) + `/dock` (16 sites).
- glass-ui dock-shrink (WS2-10) is **PARTIAL** — "perfect CIRCLE not oval" + aligned shrunken icon still owed producer-side.
- **VERDICT: glass-ui producer** for the collapsed-state geometry contract (circle, no-oval, icon-align); **value.js demo** composes WatercolorDot + icon into that slot and removes the clipped "Pal" text. The text-clip is a value.js-demo host defect. **Route:** book against dock-fission adopt; the collapsed-circle producer fix is already an open WS2 residual.

**S-20 — cartoon-card glassiness inconsistency.**
- glass-ui `BG.W-CARTOON-INK-GAMUT` (landed — warm-brown in-gamut `--cartoon-ink`) + `BG.W-DOCK-CAST-RETIRE`; the single-root **Card** consolidation is BOOKED (ATLAS-N C2). `cartoon` becomes a Card-local axis (`BH.W-AXIS-GRAMMAR`).
- **VERDICT: glass-ui producer** owns the Card cartoon+glass tier tokens; **value.js demo** picks ONE variant for both cards (the "one cartoon one not" is a demo call-site inconsistency — S-21 root discipline: set the tier at the Card root, not per-instance). **Candidate: S.W-CARD-CARTOON-UNIFY (demo)** consuming the 5.0.0 Card axis.

**S-15 — edge aliasing/dithering.**
- **`BG.W-CORNER-ALIAS-KILL` LANDED `3fcad1a0`** (dual-engine PASS) + `BG.W-GLASS-CLIP-DISCIPLINE` (WS3, `contain:paint` narrowed selector, Safari-26 sign-off).
- **VERDICT: glass-ui producer — largely cured; verify at adopt.** value.js's watercolor-dot + canvas-drawn palette edges (e.g. `gamutOverlayPaint.ts`, `spectrumLuma.ts`) are **value.js-demo** canvas aliasing — a separate DPR/antialiasing audit lane (S-24 core-library scope). Route the glass-component edges to the producer cure; route the canvas dots to a demo DPR pass.

### P2 — demo-owned (no producer half, or producer already rich)

**S-18 — aurora doesn't derive H+C from color.**
- **The producer surface is ALREADY RICH.** `dist/aurora.js` `deriveAurora` exposes `hue/hueDir/huePath/hueSeed/hueShift/hueSpread/hueStreak/chroma/chromaEasing/chromaFalloff/energy/harmony/lightness/lightnessSpread/vividness` — it varies H AND C, not just L.
- value.js wires it at `demo/@/composables/color/useAtmosphere.ts:26` (`deriveAurora`, `AURORA_ATOMS_KEY`, `seed` atom). The comment (`:6-17`) says the seed re-derives the full OKLCh palette on every atom/seed change.
- **VERDICT: value.js demo wiring defect — NOT a producer gap.** If the aurora "does not update from the current color at all," the seed→`deriveAurora` reactive path is broken in `useAtmosphere` (the seed write is the one validated boundary, `:41-45`; a throw on un-parseable seed could be silently swallowing updates — a precept violation if so). **Candidate: S.W-ATMOSPHERE-SEED-REACTIVE (demo, P1)** — audit the seed→derive→upload chain; the "weak effect" is a `vividness`/`chroma` default, tunable via `AuroraPane` knobs already provided. **No glass-ui letter.**

**S-1 — the two color-space dropdowns inconsistent + restyle as pure title.**
- Both are value.js-local: `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue` (picker) + the About-pane variant. No glass-ui primitive involved.
- **VERDICT: value.js demo** — DRY the two call-sites onto ONE `ColorSpaceSelector` (S-21 root), strip the pill bg, set Fraunces + caret. **Candidate: S.W-COLORSPACE-TITLE (demo).** The x/y counter text (S-14 "— 06 / 16") is the same component family — same wave.

**S-10 — skeleton/shadow palette loading variants.**
- glass-ui has a `SkeletonSurface`→`Surface` axis (`BH.W-AXIS-GRAMMAR`) but no palette-shaped skeleton (app-specific).
- **VERDICT: value.js demo** owns palette-shaped skeleton + sequential-per-area shimmer + the "darker/more unified shadow palette." Optional glass-ui knob (skeleton shimmer-delay) is a *maybe-letter* only if ≥2 consumers want it (glass-ui's speculative-surface bar, per ATLAS-N C1 ruling). **Candidate: S.W-PALETTE-SKELETON (demo).**

**S-6 — expand the gradient netting/hatch (perceived-space display).**
- Producer lever: `BG.W-PAPER-GRAIN-OPTIN` / `BG.W-PAPER-SUFFUSE` (per-surface warm-tooth grain). But the "netting" over a *perceived color space* is a value.js-domain viz.
- **VERDICT: value.js demo/src** (the perceptual-space render is value.js color math + a demo canvas); glass-ui's paper-grain is a texture *option* it can layer, not the mechanism. **Candidate: S.W-PERCEPTUAL-NET (demo/src).**

---

## 3 · What value.js can PRUNE when 5.0.0 lands

1. **`demo/@/components/ui/slider/` (local shadcn)** — DELETE; adopt `@mkbabb/glass-ui/slider`. Kills S-2/S-16 at root. (Verify the spectrum-slider special case survives — WS4-11 books it producer-side.)
2. **`demo/@/components/ui/input/` (local shadcn)** — DELETE; adopt `@mkbabb/glass-ui/forms#Input`. Kills S-17 at root.
3. **`@mkbabb/glass-ui/goo-blob` specifier** → re-point to `@mkbabb/glass-ui/blob` at `App.vue:115` + `useAtmosphere.ts:32` (symbols unchanged). Mechanical MIGRATION-row swap.
4. **`@mkbabb/glass-ui/tabs`** (3 sites) — already `SegmentedTabs`-only post-R.W2; confirm no compound-`Tabs` residual (the class of failure that left the demo unbuildable in the 4.x break).
5. **Any value.js-local satellite-shade fallback** in the hero blob — once `uSatColor[]`/`bodyLightness`/`lightnessFloor` land (F9.R1), delete the workaround (precept: no fallback once the real surface exists).
6. **`--ring` bare-token consumers** in demo (if any) → `--focus-ring-color` (clean break, no alias). Grep value.js demo for bare `--ring` before the cut.
7. **`density=` props** on any value.js `/dock` or `/configurator` consumer → `size=` (`compact→sm` etc.); `DockDensity`/`ConfiguratorDensity` types DELETED.
8. **A11y `aria-label` workaround** on the EasingPicker trigger, if value.js added one — remove once relay item 8 lands producer-side.

---

## 4 · Collisions with BG's in-flight work (they commit ~every 10 min)

**Latest BG HEAD at assay: `c0176542`** (`BG.W-DRAWER-PAINT-BIND` dual-engine DONE), preceded by `dba0ddb4` (`BG.W-OVERLAY-ENTER-PAINT` FAIL→PENDING). BG is in the **paint-verification phase** (dual-engine Chrome+Safari sign-off of already-src-landed waves). git working tree: only `docs/` paint-log churn + `.wkshot` scratch.

Collision risks for tranche S:
- **S must not touch glass-ui `src/` or `dist/` at all** (READ-ONLY sibling; foreign-tree fence is literal — glass-ui edits ZERO sibling files and expects the same). Every S producer-half is a **book against the 5.0.0 adopt event** or a **paired-authorship inbox letter**, never a value.js-side glass-ui edit.
- **The 5.0.0 cut is not yet made** — `origin/master` is 4.2.0-era (`6afe14c5`). value.js's `file:` dist tracks `tranche/BG` HEAD, so **partially-landed waves (paint-pending) may already be in the consumed dist** while their dual-engine sign-off is incomplete. Any S live-probe against localhost:9000 that hits a glass-ui glass/dock/paint surface may catch a mid-flight state — cite the glass-ui HEAD when you do.
- **Peer-floor timing:** value.js published **2.0.0**, but glass-ui's floor rides only to `^1.1.1` at 5.0.0 (gated on keyframes' `value ^1.2.0`). **The `^2.0.0` bump rides keyframes' value^2 adopt** — flagged to keyframes, not yet done. S should NOT assume glass-ui declares `value ^2.0.0` at the 5.0.0 cut; the file: pin means resolution works regardless, but the manifest will read `^1.1.1`.
- **BH export-reshape is `[WS12]`** — tail of BG. The 17-specifier MIGRATION table + `goo-blob→blob` rename are provisional until the post-WS12 re-derive. S's prune-set (§3 items 3,6,7) fires at that table's publication, not before.
- **No open value.js asks are blocking** — the relay (all 9 items) was answered/dispositioned by BG on 2026-07-04; the master-lockfile ask is CURED (`6afe14c5`). value.js's adopt-event book fires on glass-ui's cut; nothing gates on further glass-ui reply.

---

## 5 · Candidate wave-items for tranche S (producer-routed, ranked)

| # | Item | Route | S-findings | Trigger |
|---|------|-------|-----------|---------|
| S.W-ADOPT-GLASS-FORMS | Adopt `/slider`+`/forms#Input`, delete local shadcn | demo (consume) | S-2,S-16,S-17 | 5.0.0 de-shadcn cut |
| S.W-BLOB-SAT-CONSUME | Consume `uSatColor[]`+`bodyLightness`+`lightnessFloor`; delete fallback | demo (consume) | S-4 | F9.R1 cut |
| S.W-EASING-PANE-ANIMATE | Animate curve host; verify producer a11y label | demo + verify producer | S-13 | now (demo) / item-8 commit |
| S.W-ATMOSPHERE-SEED-REACTIVE | Fix seed→deriveAurora reactive chain; tune vividness/chroma | demo | S-18 | now |
| S.W-COLORSPACE-TITLE | DRY the 2 dropdowns → pure-title Fraunces variant; drop x/y counter | demo | S-1,S-14 | now |
| S.W-CARD-CARTOON-UNIFY | Consume 5.0.0 Card cartoon+glass tier; pick ONE variant | demo (consume) | S-20 | 5.0.0 |
| S.W-DOCK-COLLAPSE-CONSUME | Consume collapsed-circle + WatercolorDot+icon slot; drop text | demo (consume) | S-8 | dock-fission cut |
| S.W-RAIL-MINIDOCK | Consume fissioned dock/carousel rail; wire accent-ring | demo (consume) | S-3 | dock-fission cut |
| S.W-PALETTE-SKELETON | Palette-shaped skeleton + sequential shimmer + unified shadow | demo | S-10 | now |
| S.W-PERCEPTUAL-NET | Expand netting over perceived color space | demo/src | S-6 | now |
| S.W-EDGE-DPR-AUDIT | Canvas DPR/antialias pass for dots/palettes | demo/src | S-15 | now |

**No paired-authorship inbox letter is warranted right now** — every producer half is either already booked (S-4/F9.R1, S-13/item-8, S-8 collapsed-circle WS2 residual, S-2/S-17 de-shadcn) or a value.js-demo defect (S-18, S-1, S-10). The ONE candidate letter — a dock "letter-rail" variant for S-3 — should be BOOKED against the dock-fission DECIDE wave and only sent if that wave's landed rail lacks the variant (glass-ui's no-speculative-surface bar, ATLAS-N C1).
