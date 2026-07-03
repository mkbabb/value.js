# R7-PICKER — the color-picker demo, residual design-mass ledger (Tranche R pass-1 audit)

**Lane**: R7-PICKER · **Date**: 2026-07-02 · **Branch**: `tranche-q` (HEAD `e80b359`, lib 1.2.0)
**Scope**: the flagship perceptual color-picker demo (`demo/color-picker/` + `demo/@/components/custom/color-picker/`), the two untracked frontend-design treatments (`docs/frontend-design/{color-picker,hero-lab}.md`), the N per-pane/hierarchy wave specs (N.W12/13/14/16/17), the one unimplemented O wave (O.W7-demo Parse-Lab + gamut-truth), and the `.w6a-audit*.mjs` / `mix-1440-snapshot.md` probe artifacts.

**Read-only tranche-development audit. No source touched.**

---

## §0 — TL;DR (the three deliverables in one paragraph each)

**(1) Residual design-mass = essentially ALL of it.** The demo picker is in its **pre-N, pre-O.W7 state**. N.W10–W18 (the entire demo/design block, including the picker-bearing waves W12 grand-hierarchy, W13 controls, W14 cards, W16 per-pane, W17 shell/motion) was **RATIFIED 2026-06-15 but NEVER IMPLEMENTED** (`docs/tranches/O/PROGRESS.md:9` — "N demo/design block (N.W10–N.W18): RATIFIED, not yet implemented"). O.W7-demo (Parse-Lab pane + gamut-truth indicator) is **NOT SHIPPED** (`PROGRESS.md:29,58`). Every born-RED line the N specs cite still reads RED against the live tree today (verified below). A Tranche R design block inherits the **full** N picker mass, re-baselined against a moved constellation (glass-ui 4.2.0/BG-executing, not the N-era "BA cut 4.0.0"; value.js 1.2.0, not 0.12.0).

**(2) The two treatments: ADOPT color-picker (verdict-reconciled, grounded, load-bearing); hero-lab is IN-SCOPE but SECOND-priority (amend one over-reach).** Both `docs/frontend-design/*.md` are the TASTE-approved, verdict-reconciled (crayons KEPT, four pillars amplified-not-replaced, signatures as easter-eggs) design POV. Every file:line they cite verifies against current source. The color-picker treatment IS the design spec a Tranche R picker block should execute — it is strictly richer than the N.W12/13/16 prose and folds them in. hero-lab is a real, extant sub-app (`demo/hero-lab/`, 6 components) that is genuinely below-bar and worth a wave, but it is a *secondary* showroom, not the flagship; its one amend is the sRGB-mesh headline must not steal the picker's gamut-truth thunder — coordinate the two.

**(3) O.W7 folds into the picker treatment because they are ONE idea.** The O.W7 "gamut-truth indicator" and the color-picker treatment's "breathing sRGB gamut contour + hatch + `sRGB ⊣` snap-tick" are the **same gamut-visibility thesis**. The O.W7 "Parse-Lab pane" is the input/parse half of that same instrument. R should fuse them: the gamut-truth overlay lands on the KEPT HSL square (treatment §"one unforgettable moment"); the Parse-Lab surface either becomes a picker sub-affordance on `ColorInput`/`useColorParsing` (which already calls `parseCSSColor`) or a lightweight pane — not a separate untethered feature.

---

## §1 — Live-state verification (the born-RED still bites TODAY)

Confirmed against the working tree on `tranche-q` (HEAD `e80b359`):

| Treatment / spec claim | Cited site | Verified TODAY |
|---|---|---|
| HSL square painted by plain `linear-gradient(#fff, hsl(h))` over `to top #000` | `SpectrumCanvas.vue:208-217` | ✅ present verbatim (`:216-217`); no gamut overlay anywhere |
| Slider thumb hardcoded `border-2 border-gray-200 bg-transparent` (token-contract violation) | `ComponentSliders.vue:93` | ✅ present verbatim `:93`; raw-reka fork, not glass-ui `spectrum` |
| `ComponentSliders.vue` over the 400-LoC cap | — | ✅ **418 LoC** (`wc -l`) |
| Hero numbers at raw `text-4xl`, `flex-wrap`, not a φ rung, not tabular | `ColorComponentDisplay.vue:3` | ✅ `class="flex h-fit text-4xl w-full … gap-x-2 flex-wrap font-normal"` |
| Font split-brain: demo sets `--font-display` runtime var (a measured no-op) | `style.css:64` | ✅ `--font-display: "Fraunces", serif;` still authored at the dead var |
| Layout frozen at `--desktop-pane-max-w: 30rem` (480px card / ~1000px cap) | `style.css:132` region | ✅ token present; `--max-width-desktop-pane` derived `:78` |
| No `--gamut-edge` / `--gamut-hatch` / `--accent-live` / `--card-edge` tokens | `style.css :root` | ✅ **zero hits** for all four — capability-absent |
| No Parse-Lab pane; `parseCSSColor` only in `ColorInput` internals | O.W7 | ✅ no `*parse*`/`ParseLab` component; `useColorParsing.ts:4,30` calls it internally (the pane is still absent) |
| Cartoon shadow language live | `style.css:114-117` | ✅ `--shadow-cartoon: 8px 8px 0 …` present |

**What DID land from N (do not re-do):** the **aurora derive-from-color atmosphere** (N.W5.B) is wired — `App.vue:106-112` imports `useAurora`/`deriveAurora`/`AuroraAtoms` from `@mkbabb/glass-ui/aurora`, `:146` computes `safeAccentCss` via `useContrastSafeColor`, `:216` "Aurora atmosphere — THE palette made atmosphere". So the picker treatment's §BACKGROUND clause 1 ("keep the picker-seeded aurora") is **already satisfied** — only the graticule-grain layer is residual. (Treatment's App.vue line refs `:229-262` are stale — aurora refactored to `:3-7,:216` — substance holds.)

**Dev-boot note:** `npm run dev -- --port 9407 --strictPort` **failed to boot** — rolldown dep-optimization error on `../glass-ui/node_modules/@mkbabb/keyframes.js/dist/sequence-C_DCiOIQ.js` (a stale sibling-repo `file:../glass-ui` transitive keyframes dist). This is the constellation-resolution artifact the N-audit flagged ("demo unbootable"), not a picker defect. Audit done statically; the source state is unambiguous.

---

## §2 — Residual design-mass ledger (per-U-finding × per-N-wave-item)

Because N.W10–W18 never executed, the ledger is the N picker mass in full. Grouped by the wave that owns it; each row = what a Tranche R picker design block must still do. "U#" = `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md`.

### N.W12 — the grand hierarchy (keystone; the stage the picker plays on)
- **U1-fonts (font root)** — cure the `@theme inline` split-brain at the SOURCE (`--font-stack-display`, NOT the dead `--font-display` runtime var `style.css:64`); import `@mkbabb/glass-ui/styles/fonts`; make `document.fonts.check('… "Fraunces"')` true. Today no display rung paints real Fraunces. **RESIDUAL — full.**
- **U1-gray (accent axis + dark ladder)** — mint `--accent-live` = `safeAccentColor(...)` (the library fn at `src/units/color/contrast.ts:90`, already computed for the dock); re-point `--primary` (today ≡ `--foreground` light arm, chroma 0); warm-step the dark ladder; de-navy `--border`/`--input` (hue-217 → hue-24). **RESIDUAL — full** (only the aurora tint half of atmosphere landed via N.W5).
- **U32 (layout)** — the container-query clamp rewrite: `--pane-min/--pane-max` φ tokens, `container-type: inline-size` + `cqi`, delete the 10 `lg:max-w-desktop-pane` self-clamps (incl. `ColorPicker.vue`), the portrait aspect-law. **RESIDUAL — full.**
- **U31 (card-lock law)** — codify tabular-nums + `ch` reservation so the hero numbers never reflow the card (application is W16.A). **RESIDUAL.**
- **U17/U19/U24/U26 (depth grammar)** — codify Z0–Z4 rank table + six laws; mint `--card-edge`. **RESIDUAL.**

### N.W13 — controls (the picker's control surface)
- **U15/U20b (spectrum slider)** — delete the raw-reka fork (`ComponentSliders.vue:75-106`), consume glass-ui `Slider variant="spectrum"` fed a real gradient; the decompose lands ≤400 LoC by construction (today 418). **RESIDUAL — full.**
- **thumb live-color** — the thumb must PAINT the current color (today `gray-200` at `:93`). **RESIDUAL.**
- **U14 (channel-letter centering)** — letters sit 9–12px above track centers (drift grows down the rail); center by construction. **RESIDUAL.**
- **U13 (veil capsule rail)** — restore the hairline-veil capsule around the space/component section WITHOUT resurrecting the carousel. **RESIDUAL.**
- **U28 interim (slider too thin)** — `[data-size]` scoped CSS track-thickness interim (P9 dead-size-axis); **DIES at the glass-ui producer fix** (was W18/BA — now re-target the CURRENT glass-ui cut, see §5). **RESIDUAL — re-baseline.**
- **U7/U8/U23/U30a (color-space dropdown)** — one `text-display-2` rung trigger; specimen-row menu (per-space live conversion line + `WatercolorDot` swatch); bounded `max-h-[min(24rem,60dvh)]` scroll interim; the audacious catalog treatment. **RESIDUAL — full.** (This is the treatment's A2 "space switch as a moment.")
- **D8 a11y** — focus ring must PAINT on every keyboard control (paints on ONE today); no nameless buttons; gradient-stop keyboard operability. **RESIDUAL.**

### N.W14 — cards (touches the picker's plate + About card)
- Depth grammar applied (one shadow voice, cartoon budget = plates + ≤1 protagonist), glassy `--card-edge` hairlines, glass-ui `Skeleton variant="shimmer"` bones that carry color, empty-state CTAs. Picker-adjacent (the resting `Card tier="resting"` the overlay sits inside). **RESIDUAL.**

### N.W16 — per-pane: the picker HERO (the densest picker residual)
- Hero numbers → φ display rung + card-lock (from `text-4xl`), the blob/number collision fixed (`ColorPicker.vue:4,22` grid; `HeroBlob.vue:8` `w-[7rem]` lands top-center colliding with the numbers), the `text-title sm:text-display` space-trigger cascade no-op fixed. **RESIDUAL — full; this is the picker's core per-pane wave.**

### N.W17 — shell/motion (picker chrome)
- Orchestrated load (the treatment's `plate-land` + `paint-in` + stagger three-beat), the 12→3 transition-family collapse, spring-clock, view-select moment, per-view accent. Picker-adjacent (the plate placement + space-switch cross-fade). **RESIDUAL.**

### O.W7-demo — Parse-Lab + gamut-truth (see §4)
- Parse-Lab pane consuming `parseCSSColor`/`parseCSSValue` live; the sRGB gamut-truth indicator. **RESIDUAL — full, and folds into the picker treatment.**

**Zero-drop note:** nothing in the N picker mass has been discharged except the aurora atmosphere (N.W5.B). The ledger is therefore ~complete-carry, minus one row.

---

## §3 — Verdict on the two frontend-design treatments

### `docs/frontend-design/color-picker.md` → **ADOPT (as the R picker design spec).**
- **Grounded**: every cited line verifies (§1 table). Not stale on substance (only App.vue aurora line-refs drifted).
- **Verdict-reconciled**: §"Design verdict reconciliation" already reverses the crayon-kill and the square-replacement over-reaches; it KEEPS the HSL/HSV square as the substrate and adds perception as an OVERLAY (contour + hatch + isostep graticule), KEEPS the crayon/rainbow primaries as proportioned accents. This is exactly the binding-precept posture (no legacy, KISS, glass-ui-first, refine-not-abrogate).
- **Strictly richer than the N prose it overlaps**: it folds N.W12 (fonts/accent/layout), N.W13-A2 (the space-switch moment), N.W16-A (hero-number readout rhythm + card-lock) into ONE coherent editorial-instrument POV with a signature ("the breathing gamut on the square you already know"). Where N.W16 only says "fix the blob collision + φ the numbers," the treatment gives the *readout rhythm* (int/frac/unit split, tabular figures) and the *plate-land motion* — real design mass N never authored.
- **Amend (minor)**: (a) refresh the App.vue aurora line-refs to `:3-7,:216`; (b) the "small canvas/WebGL overlay for the gamut contour" is net-new render surface — R must decide the cheap path (a memoized `color-mix`/CSS mask vs a 2D canvas) and gate it under the existing rAF; (c) sequence it AFTER the N.W12 font/accent keystone (the treatment's own §"implementation plan" already respects this — the overlay tokens `--gamut-edge/--gamut-hatch` land in `style.css :root`).

### `docs/frontend-design/hero-lab.md` → **AMEND + ADOPT; IN-SCOPE but SECOND-priority.**
- **hero-lab IS extant**: `demo/hero-lab/` (App.vue, hero-lab.css, `index.html`, 6 components — `WebGLAtmosphereHero`, `CanvasAtmosphereHero`, `WebGL/CanvasTileHero`, `HeroPanel`, `HeroControls`, `lib/{helpers,palettes,types}`). The treatment's audit is accurate: no font `<link>` in `index.html` (Times/Courier fallback), grey-on-grey `hero-lab.css:4-8` wash, sRGB `mixHex` swatch math, doc-site furniture layout. Genuinely below-bar.
- **In-scope for R?** YES as a distinct wave — it is a real surface the fleet ships and it violates the "dogfood the perceptual engine in your own chrome" thesis harder than any other page. But it is a *secondary showroom*, not the flagship; the picker is the priority.
- **The one AMEND (a real over-reach to temper)**: the hero-lab §"one unforgettable moment" is the `sRGB ↔ oklch` "watch the grey die" mesh toggle — a gamut/perceptual-truth demonstration. The picker treatment's signature is ALSO a perceptual-truth demonstration (the gamut contour). Two pages both claiming "the perceptual-truth reveal" **dilutes both**. R must assign lanes: **picker owns the *gamut boundary* (where color runs out); hero-lab owns the *interpolation path* (how hue travels — sRGB grey-death vs oklch arc).** They are complementary halves of the thesis; keep them distinct so neither is a re-run of the other. Everything else in the hero-lab treatment (font-load fix as highest-leverage, the oklch mesh promotion, PAPER-pillar graticule, crayon-datum calibration ticks) is adopt-as-written.

---

## §4 — O.W7 (Parse-Lab + gamut-truth) folds into the picker treatment

**They are the same gamut-visibility idea, split across input and output.** O.W7-demo (`O.md:153`, `PROGRESS.md:29`) has two halves:

1. **gamut-truth indicator** — surface whether the current color is inside/outside the sRGB (or target-space) gamut. This is **byte-for-byte the picker treatment's §"one unforgettable moment"**: trace the sRGB gamut boundary as a hairline contour over the KEPT square, hatch the unreachable margin, and surface the `sRGB ⊣` snap-tick when a drag pushes past the edge. value.js already ships the math (`Color` + sRGB conversion + `gamutMap` at `src/units/color/gamut.ts` — the Ottosson analytical mapper). **Fold: the gamut-truth indicator IS the picker's overlay.** One implementation, on the square, tokenized via `--gamut-edge`/`--gamut-hatch`.

2. **Parse-Lab pane** — a surface that runs `parseCSSColor`/`parseCSSValue` live and shows the parse result. `useColorParsing.ts:4,30` already calls `parseCSSColor` inside `ColorInput`, but there is no *dedicated* teaching/lab surface (the O.W7 born-RED is "pane absent; zero `parseCSSColor` calls **on the route**" as a distinct Parse-Lab route). **Fold options for R** (pick the KISS one, do not build a contrived new god-pane):
   - **(a) enrich `ColorInput` / `useColorParsing`** so the picker's own input echoes the parsed AST + the gamut verdict inline (the input IS the parse-lab) — smallest, most idiomatic;
   - **(b) a lightweight Parse-Lab pane** only if the O.W7 teaching intent (show parse of arbitrary CSS *values*, not just colors — `parseCSSValue('linear(...)')`) demands more than a color input.
   - Either way the **gamut-truth verdict is shared** between the Parse-Lab surface and the picker overlay — one `isInGamut(color, space)` computation, one visual vocabulary.

**Net**: R should NOT ship O.W7 as a bolt-on. It is the *parse+gamut* seam of the editorial-instrument picker. The gamut contour (output side) + the parse echo (input side) close the loop: "you typed/dragged this color; here is its parsed truth and here is where it sits against the reachable volume." That IS the treatment's thesis — "perceptual color truth made visible."

---

## §5 — The `.w6a-audit*.mjs` + `mix-1440-snapshot.md` artifacts (what they measured)

Untracked probe scripts from the **N.W6a truth-shot audit** (dated Jun 12; write to `docs/tranches/N/audit/impl/shots/w6`). They drive Playwright (chromium, viewport 1440×900) against a running demo on **port 9401** and capture the born-RED design state the N waves were specced to cure:

- **`.w6a-audit.mjs`** (the main probe, 168 lines): (1) guards title=="color picker"; (2) **the desktop-layout BUG** — both `.pane-wrapper`s are `lg:hidden`/`hidden lg:flex` at ≥64rem, so it injects a SHIM (`display:flex !important`) to force the intended dual-pane — this is the **W10.D cascade-kill / D6-02 "desktop blank/clamped"** class the truth-shots document; (3) surface census (bg/backdrop/shadow/radius/border of left+right cards); (4) typography census (font-family/size/weight of the space-selector, value heading, About headline); (5) slider census (bg/size/border/shadow per `[role=slider]`); (6) EditDrawer reachability probe; (7) **thumb live-color probe** (keyboard-drives a slider, reads thumb `backgroundColor` before/after — the N.W13 "thumb paints the live color" gate, born-RED: `gray-200` never changes); (8) motion census (`document.getAnimations()` count/names — the N.W17 "no orchestrated load" evidence); (9) mobile 390×844 truth-shot; (10) full font-size census of the left pane.
- **`.w6a-audit2..5.mjs`** — the follow-up narrower probes (surface/typo/drawer/mobile refinements; 2–3 KB each).
- **`mix-1440-snapshot.md`** — a Playwright **accessibility-tree snapshot of the Mix pane at 1440** (nav dock + "Mix" heading + Colors/Palettes tabs + Color-space/Hue-method comboboxes + disabled Mix button). It records the a11y structure the N per-pane work is measured against.

**Bearing on R**: these are the N-era *before* measurements. They confirm (a) the desktop dual-pane layout is broken without a shim at 1440 (the U32/W10.D root), (b) the slider thumb does not carry live color, (c) zero orchestrated load motion. A Tranche R picker block should **re-run equivalent probes AFTER the design lands** (they are the falsifiable oracle), but must first fix the boot (§1 dev-boot failure) and re-target the port. They also encode the **1440 dual-pane display bug** as a still-open P0 the R layout wave (N.W12.C successor) must close.

---

## §6 — What a Tranche R design block must do (synthesis)

1. **Re-baseline the N picker specs against the current constellation.** The N specs assume glass-ui "BA cut 4.0.0" and value.js 0.12.0; reality is glass-ui **4.2.0 with BG executing** (aurora-metal, dock-fission, dock-cap-scroll-fade — likely *supersedes* several N dock/slider interims) and value.js **1.2.0**. Every `[data-*]`/`interim … DIES at W18` row (U28 slider-thickness, U8 dropdown-bound, U7 font-rung, easing-configurator) must be re-checked: **has the current glass-ui cut already landed the producer fix?** If so the interim is skipped, not carried.
2. **Execute the color-picker treatment as the picker design spec** — it folds N.W12 (fonts/accent/layout keystone) + N.W13-A2 (space-switch) + N.W16-A (hero readout) + O.W7 (gamut overlay) into one POV. Sequence: font/accent keystone → gamut overlay (the signature) → slider/dropdown/readout → orchestrated load.
3. **Fuse O.W7 into the picker** (§4): one shared `isInGamut`/gamut-boundary computation → the square overlay (output) + the parse echo (input). Do NOT ship a detached Parse-Lab.
4. **hero-lab as a second wave** (§3 amend): fix the font-load first (highest leverage), promote the grey wash to an oklch mesh, and **keep hero-lab's "interpolation path / grey-death" signature distinct from the picker's "gamut boundary" signature** so the two showrooms are complementary, not redundant.
5. **Fix the boot** (§1 rolldown/keyframes sibling-dist error) before any before/after π gate is honest.

---

## §7 — Open questions for the R lead
- Has the current glass-ui (4.2.0 / BG) already shipped the slider track-thickness token (U28), the bounded SelectContent (U8), and the font-rung prop (U7)? If yes, those N interims are void — R consumes directly.
- Is the 1440 dual-pane `lg:hidden` display bug (the shim in `.w6a-audit.mjs`) still live post-BG, or did a glass-ui/demo change already cure it? (The dev-boot failure blocked live confirmation this pass.)
- Does R want hero-lab in the SAME tranche as the picker, or a follow-on? (It is a distinct sub-app; bundling risks diluting the picker focus.)
