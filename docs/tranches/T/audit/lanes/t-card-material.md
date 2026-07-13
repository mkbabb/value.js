# T lane · t-card-material — the card material system

**Rows**: T-3 + T-11 + T-13b + T-18 + T-24 (the gray/black/white consistency audit).
**Method**: live census on a lane-local dev boot (`VITE_API_URL=http://localhost:59999 npx vite --port 9345 --strictPort`, owner's :9000 untouched), Playwright computed-style probes of every glass/card surface across `#/`, `#/palettes`, `#/mix`, `#/extract`, `#/gradient`, `#/generate`, both schemes (`.dark` root-class arm), judged by eye against the owner shots; source root-caused in `demo/@` and read-only `../glass-ui`.
**Substrate**: `tranche-t` = master @ `cc4f4fa` (S close). All computed values below are measured, not derived.

---

## §0 Shot re-derivation (the mandate map is best-effort; these are read from the images)

| Shot | What it actually shows | Row |
|---|---|---|
| `t-2000-27` | The **picker card's own bottom strip** — the SpectrumCanvas gamut-lens eyebrow (`GAMUT LENS — DISPLAY-P3 / SRGB` + cusp readout, `color-picker/composables/useGamutOverlay.ts:146`) reading on near-raw aurora in dark scheme. The owner's *text* names the About card; the shot evidences that even the **reference** plate's caption region leans muddy — the About card (a full rung *below* it) is far past the floor. | T-3 |
| `t-2004-55` | The My Palettes pane card (dark): host card nearly invisible; the search pill + Current-Palette well render as heavy solid brown slabs floating on aurora. | T-11 |
| `t-2005-53` | The Extract pane card: same wash-ghost host; drop-zone + sliders read directly on aurora. (The missing-shadow-palette half of T-13 is another lane's row; the *material* half is confirmed here.) | T-13b |
| `t-2008-09` | The Mix pane (dark): **five different material weights inside one card** — dark-brown Selected well, dark slab selects, lighter glass CTA, brown result plate, milky-mauve host. | T-18 |

---

## §1 The census (computed `background-color` / `backdrop-filter`, light → dark)

Aurora ground at probe time: `body` `rgb(179,114,144)` (full-chroma pink; the aurora does **not** flip with scheme — dark tokens composite over a *light* backdrop).

### Host plates (the card species)

| Surface | Deployment | Material (light) | Material (dark) | Stamp |
|---|---|---|---|---|
| Picker card | `ColorPicker.vue:6` `tier="resting"` | `oklab(0.885 … / 0.678)` + `blur(8px) saturate(1.4)` | `oklab(0.363 … / 0.742)` + `blur(8px) saturate(1.3) brightness(1.14)` [AMENDED-AT-HARDENING: full computed filter — h-evidence-design-1 H-ED1-1] | `--shadow-cartoon` 8px offset @ 80% ink + grain — **the owner's accepted register** |
| ALL 8 pane cards | `AboutPane.vue:3`, `BrowsePane.vue:2`, `ExtractPane.vue:4`, `GradientPane.vue:20`, `AdminPane.vue:2`, `ConfigSliderPane.vue:100`, `MixPane.vue:62`, `GeneratePane.vue:32`, `PalettesPane.vue:2` — every one `tier="wash" :shadow="false" :grain="false"` | `oklab(0.804 … / 0.356)` + `blur(1px) saturate(1.4)` | `oklab(0.412 … / 0.430)` + `blur(1px) saturate(1.35) brightness(1.18)` [AMENDED-AT-HARDENING — H-ED1-1: the wash tier's `saturate()` AMPLIFIES transmitted aurora chroma, STRENGTHENING T-CM-3/RC-2's mechanism] | none |

### In-plate fixtures (each a separately-minted material)

| Fixture | Recipe home | Measured | Weight vs host |
|---|---|---|---|
| `.dashed-well` (Current-Palette editor `CurrentPaletteEditor.vue:3`, Mix Selected `MixSourceSelector.vue:117`) | demo `styles/utils.css:56-74` — `color-mix(in srgb, var(--card) 75%, transparent)` + `blur(8px)` + `--shadow-cartoon-sm` | `srgb(0.994 0.96 0.926 / 0.75)` L · `srgb(0.207 0.165 0.133 / 0.75)` D — **flat 75% both schemes, no tint compose, no `--glass-level`** | 2.1× host |
| PaletteCard / skeleton | `PaletteCard.vue:19`, `PaletteCardSkeleton.vue:26` — `bg-card/75 backdrop-blur-sm shadow-cartoon-sm` | same 0.75 family (second parallel mint) | 2.1× |
| Generated-palette well | generate pane — `bg-card/75` + blur(8px) (third mint) | `oklab(0.974 … / 0.75)` | 2.1× |
| Eyedropper overlay | `ImageEyedropper.vue:4` `bg-card/75 backdrop-blur-sm` (fourth mint) | 0.75 | — |
| Gradient perceived-space plate | `PerceivedSpacePlate.vue:157` — **opaque** `bg-card` + `shadow-card` (the FULL 8px cartoon stamp) + grain | `rgb(253,245,236)` α=1.0, no blur | **2.8× — an entire cartoon plate nested inside a ghost** |
| Gradient stop chip | `GradientStopEditor.vue:252` opaque `bg-card` | α=1.0 | 2.8× |
| SearchBar pill | glass-ui `.input-bar` (`utilities/components.css:205-212`) — **hard-bound to the FLOATING rung** (`background: var(--glass-bg-floating)` + `blur(13px)`); deployed in-plate at `PalettesPane.vue:12` | `srgb(0.994 0.96 0.926 / 0.80)` L · `srgb(0.207 0.165 0.133 / 0.88)` D | 2.2× / **2.0×** |
| Mix/gradient/generate selects | glass-ui `glass-control-edge` + capsule fill (`select.css:85`) | transparent bg + gradient fill `…/0.58` + `blur(8px)` | 1.6× |
| Mix result plate | `MixResultDisplay.vue:52` `glass-floating` | 0.80 L / 0.88 D + blur(13px) | 2.2× |
| Picker/About space trigger ("Lab") | demo ui select — `bg-transparent`, no blur, no fill | α=0 — naked text | 0× |
| Markdown code/pre/tables | `Markdown.vue:227-262` `bg-muted` (opaque house token) | opaque, consistent — **the one fixture family that already behaves** | — |
| Markdown sticky table header | `Markdown.vue:360` `bg-background` | opaque slab inside a 0.36α card — a hue discontinuity while panes stay wash | — |
| Extract image stage | `ExtractWorkbench.vue:32,42,46` — raw `bg-black`, `from-black/50`, `bg-white/20` | foreign neutrals (unnamed) | — |

### Chrome (floats over the page — correctly glass)

| Surface | Measured |
|---|---|
| Dock (`glass-dock`) | `srgb(0.960 0.854 0.826 / 0.539)` L · `0.578` D + `blur(8px)` |
| Login capsule (`btn-glass glass-capsule`) | gradient fill + `blur(13px) saturate(1.6)` |
| Mix CTA (`glass-deep`) | gradient fill + `blur(14px)` |

**The producer ladder itself is sound and complete**: `--glass-opacity-{wash .30/.38, quiet .50/.58, resting .65/.72, floating .80/.88, overlay .95/.96}` (glass-ui `tokens/glass.css:54-58`, `tokens/dark-arm.css:247-252`), Card tier axis + `surface="cartoon"` register (`Card.vue:41-67`), documented `:root` alpha-retune seam (`tokens/glass.css:43-49`). The defect is **deployment**, in the demo.

---

## §2 Root cause — three structural facts, one physics

**RC-1 · The fleet sits on the bottom rung.** Every pane card is `tier="wash"` — α 0.356/0.430 with a 1px blur. Over a *neutral* backdrop wash reads as quiet paper; over this app's **full-chroma aurora** a 1px blur averages nothing and (1−α) ≈ 60% of raw saturated backdrop transmits — the card is a tint, not a material. The picker at `resting` (0.68/0.74, blur 8px, cartoon stamp) is the only surface that reads as a plate — which is precisely the owner's reference ("more cartoon like the picker card").

**RC-2 · The hierarchy is inverted.** Depth grammar says a host plate carries its fixtures; here every fixture out-materials its host — Mix (dark) stacks **0.43 host < 0.58 selects < 0.75 well < 0.88 result/search < 1.0 gradient-plate** — five weights inside one card, and the gradient pane nests a *complete opaque cartoon plate* inside a ghost. The solid interiors on an invisible frame is exactly the t-2004-55 / t-2008-09 look.

**RC-3 · The well was never a rung.** The ladder has five elevation rungs *up* but no recessed rung *down*, so the demo minted the well four separate times (`.dashed-well`, `bg-card/75 ×3` variants, opaque `bg-card` ×2) — flat alphas that bypass the tint compose, the scheme registers, and `--glass-level`. And glass-ui's `.input-bar` hard-binds the *floating* (popover-weight) rung, so the search pill imports a dialog's material into a card interior.

**The physics that makes this T-24 and not just T-18**: over a saturated backdrop, an alpha spread *is* a hue spread — each rung admits (1−α) of backdrop chroma, so 9 weights render as 4+ different *colors* (pink 0.36 → mauve 0.5 → brown 0.75 → cream 1.0), and the fork **inverts per scheme** (dark tokens over the light aurora ⇒ dark-brown fixtures on milky-mauve hosts — my `mix-dark` probe reproduces t-2008-09 exactly). No neutral re-pick fixes this while the alpha spread stands; "consistent gray/black/white" is achievable only by collapsing the deployment.

---

## §3 THE MATERIAL LADDER (the design — four rungs, every surface named to one)

> Doctrine: **glass earns its blur by floating over live content. A surface that sits *in* a plate is a tone of the plate, not a second pane of glass.** One neutral family (the house warm cream/brown `--card`/`--muted`/`--background`), grays only as `--foreground` tone-mixes, raw `#fff`/`#000` only inside color-math ramps.

| Rung | Material | Deployments |
|---|---|---|
| **1 · PLATE** (the cartoon protagonist) | ONE card species = the picker's exact register: `tier="resting"` (0.68/0.74 + blur 8px) + `shadow` ON (the routed `--shadow-cartoon` 8px stamp) + grain ON | The picker card **and all 8 pane cards** (About, Palettes, Browse, Extract, Mix, Generate, Gradient, Admin). Wash retreats to what it is for: inline chrome over already-material surfaces. |
| **2 · WELL** (in-plate fixture, recessed) | An **opaque tone-step of the plate**, NO backdrop-blur (nothing live behind it to blur — blurring the aurora *through* the host is the mud generator): the `bg-muted`-family pattern the markdown interiors already prove, e.g. `color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)`-class; dashed edge / `--shadow-cartoon-sm` where the affordance calls for it | dashed wells, PaletteCard (+skeleton), generated-palette well, gradient stop editor + perceived-space plate (drops to well weight — the nested-protagonist double-stamp dies), search pill (in-plate), select trigger fills, mix result plate |
| **3 · CHROME** (true glass — floats) | The producer rungs as shipped: `glass-dock`, capsule/`btn-glass`, `glass-deep` CTA, `floating`/`overlay` for popovers, menus, dialogs, drawers | dock, login capsule, Mix CTA, select *content* plates, dialogs, eyedropper overlay (a true overlay — floating is correct *there*) |
| **4 · STAGE** (media ground) | A **named** near-black pair — `--stage` + `--on-stage-chrome` — replacing raw `bg-black`/`bg-white/20`; the veil register for caption strips over plates | extract image stage, spectrum-plate environs, gamut-lens caption strip |

**Consistency corollary (T-24)**: with rungs 1–2 in place, every in-view surface is ≥ ~0.7 effective alpha of ONE neutral family — the hue fork dies *by construction*, in both schemes, without touching the palette.

---

## §4 Findings

**T-CM-1 — The pane fleet is one rung too low; the picker is the only plate.** *(T-3, T-11, T-13b)*
Evidence: §1 host-plate rows — 9 `tier="wash" :shadow="false" :grain="false"` sites vs `ColorPicker.vue:6` `tier="resting"`+stamp; owner shots t-2000-27/t-2004-55/t-2005-53; live light/dark probes (wash α .356/.430, blur 1px).
Root-cause: RC-1.
Owner: **demo** (nine one-attribute deployments; the producer axis already carries the register).
Cure: rung-1 adoption — ONE card species; every pane joins the picker's exact material (resting + cartoon stamp + grain). No new tier, no local alpha overrides.

**T-CM-2 — Fixture-over-host inversion: five weights in one card.** *(T-18)*
Evidence: §1 fixture table; mix-dark probe (0.43 < 0.58 < 0.75 < 0.88 < 1.0); `PerceivedSpacePlate.vue:157` (a full opaque cartoon plate nested in a 0.36α ghost); shot t-2008-09.
Root-cause: RC-2 + RC-3.
Owner: **joint** (demo deployment; producer well-rung packet below).
Cure: the depth law — interior fixtures are rung-2 tone-steps, never heavier glass than their host; heavier-than-host glass is reserved for surfaces that float.

**T-CM-3 — The alpha spread IS the neutral inconsistency.** *(T-24)*
Evidence: §2 physics; both-scheme probes (light: pink/mauve/brown/cream fork; dark: inverted — brown slabs on milky mauve); aurora ground `rgb(179,114,144)` scheme-invariant.
Root-cause: 9 distinct alphas × full-chroma backdrop ⇒ hue ladder.
Owner: **demo** (deployment collapse); a producer *note* on chroma-guard (packet P-3).
Cure: §3 ladder adoption; then the E-24 neutral audit passes by construction. Explicitly NOT a palette re-pick.

**T-CM-4 — The well is minted four times in parallel, all off-ladder.** *(T-18, E-3 no-legacy)*
Evidence: `utils.css:56-74` · `PaletteCard.vue:19` + `PaletteCardSkeleton.vue:26` · `ImageEyedropper.vue:4` · generate well · opaque `bg-card` pair (`PerceivedSpacePlate.vue:157`, `GradientStopEditor.vue:252`) — flat 75%/100% both schemes, no tint compose, no `--glass-level`, no scheme register.
Root-cause: RC-3 (no recessed rung exists to consume).
Owner: **joint** — the rung is a producer ask (packet P-1); the six-site consume is demo.
Cure: ONE named well material; all sites consume it; the parallel mints die.

**T-CM-5 — `.input-bar` hard-binds the floating rung; the search pill imports popover weight into a card interior.** *(T-11, T-12-material)*
Evidence: glass-ui `utilities/components.css:205-212` (`background: var(--glass-bg-floating)`, blur 13px); measured 0.80/0.88 vs host 0.36/0.43; shot t-2004-55; deployed `PalettesPane.vue:12`.
Root-cause: producer recipe fixes the rung; consumer has no seam.
Owner: **producer** (packet P-2) + demo consume.
Cure: parameterize the input-bar material (`--input-bar-bg` seam defaulting to floating — zero-delta for existing consumers); in-plate deployments speak rung 2.

**T-CM-6 — Foreign neutrals inventory (E-24).**
Evidence: `ExtractWorkbench.vue:32,42,46` raw `bg-black`/`from-black/50`/`bg-white/20` (the photographic stage — *legitimate* as a register, unnamed as a token); `Markdown.vue:360` opaque `bg-background` sticky header inside a translucent card; exempt-by-math: `MiniColorPicker.vue:161-162` `#000`/`#fff` spectrum ramps; dev-only: `PointerDebugOverlay.vue:220`.
Owner: **demo**.
Cure: mint `--stage`/`--on-stage-chrome` (rung 4); the sticky header re-tones onto the plate family (moot once T-CM-1 lands but the token should still be house-named). Positive cite: the markdown `bg-muted` interiors are the tone-step pattern rung 2 generalizes.

**T-CM-7 — Shot-map correction for the T corpus.** t-2000-27 is the *picker's* gamut-lens caption strip, not the About card (§0). The About cure is T-CM-1; the caption strip's own legibility (a rung-4 veil question over the spectrum plate) should be handed to the picker/typography lane so it is not lost between rows.

---

## §5 Producer boundary — request packets (E-2; against current glass-ui + forthcoming BG/BH)

- **P-1 · The WELL rung** — the ladder's missing recessed rung: `.glass-well` / `--glass-bg-well` — an **opaque tone-step** (no backdrop-filter), scheme-registered like every rung, with the dashed-edge affordance composable on top. Demand evidence: 6 consumer sites in this repo alone minted it by hand (T-CM-4). Alternative if glass-ui declines: a demo-owned `--well-bg` token derived from house neutrals — but the rung is ladder-shaped and belongs at the root.
- **P-2 · input-bar rung seam** — `--input-bar-bg`/`--input-bar-blur` (default: current floating bind, zero-delta) so a consumer can deploy the bar at rung 2 in-plate (T-CM-5).
- **P-3 · Chroma-guard note** — the tier alpha registers are calibrated over neutral backdrops; over a full-chroma ground the wash/quiet rungs fall below the material floor. Either (a) ratify the documented `:root` `--glass-opacity-*` retune (`tokens/glass.css:43-49`) as the sanctioned consumer path for chromatic-backdrop apps, or (b) offer a per-tier saturate/luminosity compensator. Information-only if (a): value.js's cure is deployment (rung 1), not a retune.

## §6 Interactions the corpus must reconcile

- **T-8 (blob into the card)** — once panes are rung-1 plates with the cartoon stamp, the blob's placement-law revision composites against a *solid* plate; z/overflow decisions should assume the plate, not the ghost.
- **T-23 (header shading at rest)** — the scrolling header band should read as rung-1 plate material (same species), not a fifth weight.
- **T-5 (sliders glass card)** — the owner's "little glass card" around sliders+letters is a rung-2 well by this ladder (in-plate fixture), NOT rung-3 glass; hand the rung name to that lane.
- **T-14 (liquid-glass easings)** — orthogonal; material transitions (hover deepen `shadow-cartoon-sm→md`, `PaletteCard.vue:19`) already ride transition-shadow and survive the ladder unchanged.
- **W5-2/S-20 ("the ONE card species")** — S.W5 unified the *wells* onto bg-card/75 believing that was the card species; the owner's T-3/T-11 verdict re-grounds the species at the picker's rung. This lane's ladder supersedes the S-20 encoding, not contradicts it: one species, correct rung.
