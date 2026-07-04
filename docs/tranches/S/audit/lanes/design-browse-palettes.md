# S audit · Fable design assay — BROWSE + MY PALETTES

Lane: `design-browse-palettes` · AUDIT ONLY · repo @ `c5aa091` (branch `tranche-q`) · dev server `http://localhost:9000`
Evidence dir: `docs/tranches/S/audit/lanes/design-browse-palettes/` (12 shots: light+dark × desktop 1440×900 + mobile 390×844, element crops, 3× zoom).
Register assayed against: the editorial instrument — color-science atlas plate (Fraunces display voice, Fira readout, cartoon-offset shadow, crayon primaries, ink+grain, perceptually-true fields).

User-ledger items owned here: **S-10** (loading grammar + archaeology), **S-17** (inputs), **S-20** (cartoon-card split), the rainbow heading, **S-15** (visual evidence), empty/error states, card menu + dialog hierarchy. Cross-refs noted for S-5/S-8/S-11/S-12/S-18 (owned by sibling lanes).

---

## S-10 — The loading grammar (P1, the flagship finding)

### S-10.1 Git archaeology: the "darker, more unified" treatment the user remembers, and the two-step regression

`git log --follow demo/@/components/custom/palette-browser/PaletteCardSkeleton.vue` → 6 commits. The three that matter:

| Commit | Date | Treatment |
|---|---|---|
| `ec1b200` (birth) | 2026-03-20 | **The remembered iteration.** Strip: solid `hsl(var(--muted))`; metadata: `bg-muted/60`; swatches: `bg-muted/30`. One hue family (muted), opaque, DARK against the field — reads unambiguously as *shadow*. `animate-pulse` on the host. |
| `3d76977` ("design system cohesion pass") | — | **Regression step 1.** Strip diluted to `muted-foreground/10%`; blocks to `bg-foreground/[0.04–0.06]`. Three different alpha rungs → fragmented; near-invisible washes → the unified dark shadow dies here. |
| `4d8ad79` (R.W4 Lane A, U20) | 2026-07-03 | **Regression step 2 (current).** glass-ui `Skeleton surface="glass" variant="shimmer"` — base `color-mix(in oklab, var(--muted) 55%, transparent)` (glass-ui `Skeleton.vue:76-80`) + a white-ish travelling sheen (`muted-foreground` 30%). |

Live evidence (`skeleton-extract-light.png`, matching the user's shot `~/Downloads/Screenshot 2026-07-04 at 16.14.30.png`): on the light warm-pink field the blocks render as **near-white cream slabs** — they read as *content* (white cards), not *absence* — and the frozen shimmer gradient bakes a metallic bevel into each block. The strip's 5 segments each catch the sheen at a different offset → fragmented, exactly the opposite of "unified". The user's memory is accurate and the target is named: **`ec1b200`'s all-muted, opaque, single-family treatment** — modernized, not resurrected verbatim.

**ROOT-ROUTING:** split. glass-ui producer — `--skeleton-glass-bg` is already the tunable seam (`Skeleton.vue:74-80`); it needs a *darker* demo-side value, not a producer change; the *sheen tint* however is hardcoded `muted-foreground/30%` in the producer (`Skeleton.vue:97-101`) and should become a `--skeleton-shimmer-tint` token. value.js demo — `PaletteCardSkeleton.vue` re-points `--skeleton-glass-bg` to a muted-ink rung (e.g. `color-mix(in oklab, var(--muted-foreground) 22%, var(--muted))`, one family, both schemes).

### S-10.2 The shimmer stagger is DEAD CODE — all shimmers sweep in unison (P1, measured)

`PaletteCardSkeleton.vue:20,27,37` sets inline `animationDelay: ${i * 0.12}s` **on the Skeleton host**. That worked for the old `animate-pulse` (a host animation). The R.W4 shimmer variant's animation lives on the **`::after` pseudo-element** (glass-ui `Skeleton.vue`: `.skeleton-shimmer::after { animation: skeleton-shimmer-slide 1.5s linear infinite }`), and `animation-delay` does not propagate host→pseudo.

Measured live (`#/extract`, getComputedStyle per skeleton):

```
host:  animation-name: none        animation-delay: 0.12s … 0.6s   ← the stagger lands on NOTHING
after: skeleton-shimmer-slide      animation-delay: 0s             ← every sweep in sync
```

The user's ask — "shimmers should run SEQUENTIALLY per palette area" — is structurally impossible today.

**ROOT-ROUTING: glass-ui producer.** The `::after` must read a custom property: `animation-delay: var(--skeleton-shimmer-delay, 0s)` (and optionally `--skeleton-shimmer-duration`). Custom properties DO inherit into pseudo-elements, so the demo's per-block inline `--skeleton-shimmer-delay` then works. Demo consume: replace the dead `animationDelay` with the var, choreographed as one wave: strip segments L→R (0 → n·0.12s), then title (+0.1s), then swatches L→R — the plate "develops" top-to-bottom like an exposure.

### S-10.3 Browse never uses the skeleton at all — three generic spinners (P1)

The skeleton grammar exists but **both browse surfaces load with a bare `Loader2` spinner** — the definitional generic furniture:

- `demo/@/components/custom/panes/BrowsePane.vue:24-29` — `Loader2 animate-spin` centered in a 120px void.
- `PaletteDialog/components/PaletteBrowseTab.vue:5-11` — same spinner.
- `PaletteBrowseTab.vue:50-57` — "Loading more..." caption + a *third* spinner.

`PaletteCardSkeleton`'s only consumers are `ExtractWorkbench.vue:168` and `MixSourceSelector.vue:213` (grep-verified). The component was *born* in the browse family's directory and never wired to browse. Additionally `:grid-class="sortLoading ? 'opacity-50' : ''"` (`BrowsePane.vue:57`) snaps opacity with no transition.

**ROOT-ROUTING: value.js demo.** Both browse surfaces render `PaletteCardSkeleton × pageSize` during `browsing`; `loadingMore` appends 2–3 skeleton cards instead of the spinner+caption row; the `Loader2` import dies from both files.

### S-10.4 Palette VARIANTS of shadow + skeleton (design item)

The user wants the skeleton itself to speak palette. Concrete candidates (all consume the existing accent axis, no new color paths — inv-N-3):

1. **Specimen-tint skeleton** — strip segments tinted with a low-chroma OKLCH hue rotation around `--accent-live` (fixed L ≈ 0.62 light / 0.38 dark, C ≈ 0.03): the ghost *of a palette*, still clearly shadow. One `color-mix(in oklch, oklch(from var(--accent-live) …) …)` recipe, per-segment `--i` custom property.
2. **Shadow variant (the `ec1b200` register)** — flat unified muted-ink blocks, `variant="breath"` (glass-ui's 6s rung) for the known-imminent wait; used by Extract's undeveloped plate.
3. **Developing-plate variant** — variant 1 + the S-10.2 sequential sweep; used by Browse (unknown-duration network wait).

**ROOT-ROUTING:** demo (`PaletteCardSkeleton.vue` gains a `variant` prop: `shadow | specimen | developing`); glass-ui only ships the two token seams above (delay + sheen tint). No fork of Skeleton.

---

## The My-Palettes rainbow heading vs the register (P1)

`PalettesPane.vue:4` — `<span class="capitalize pastel-rainbow-text">My Palettes</span>`.

Recipe: `demo/@/styles/utils.css:35-49` — a **fixed** six-stop pastel ramp (`oklch(72–85% 0.14–0.18 …)`) clipped to text. Three consumers: `PalettesPane.vue:4`, `DockViewSelect.vue:97`, `PaletteDialogHeader.vue:37`.

Assay (evidence `browse-light-desktop.png`, `browse-dark-desktop.png`, `palettes-light-mobile.png`, user shot 16.23.57):
- **Contrast failure.** L≈0.75–0.85 pastel stops over the light header wash (~L 0.90): estimated WCAG ratio **≈ 1.1–1.5:1** for every stop. "My" (pastel pink on pink glass) borders on invisible in light mode. In dark it improves but stays under 3:1 for the yellow/green stops.
- **Off-register.** The page's voice is ink Fraunces + crayon primaries *proportioned*; a six-hue candy ramp across the single largest text element is the sticker aesthetic the register excludes — and it ignores the tranche-R per-view accent axis entirely (fixed hues, no `--accent-live`, no scheme guard).
- It is also the *only* rainbow moment on the page — nothing else earns it, so it reads as decoration, not information.

**ROOT-ROUTING: value.js demo** — the one recipe root `utils.css:35` (S-21 satisfied; all 3 consumers inherit). Two admissible cures, pick one at design time:
(a) **Excise** — the heading joins every other pane title (ink, display voice); the palette-ness is already carried by the cards themselves.
(b) **Re-derive** — an `oklch(from var(--accent-live) …)` 3-stop analogous ramp, lightness clamped per scheme to the ink floor (≤ 0.45 light / ≥ 0.78 dark), i.e. "the picked color, unfolded" — informative, contrast-safe, accent-axis-true.

---

## S-20 — Cartoon-card inconsistency + "a bit more glassy" (P1)

The user's two-card shot (16.23.57) is `CurrentPaletteEditor` vs a saved `PaletteCard`, and the split is real (evidence: `current-palette-editor-light.png`, `palettes-pane-light.png`, `card-expanded-dark.png`):

| Surface | Shell | Shadow | Glass |
|---|---|---|---|
| Current Palette editor | `.dashed-well` (`utils.css:56-68`): 1.5px dashed `--card-edge`, `muted/35%` wash, **inset** shadow | none (recessed) | translucent but blur-less |
| Saved PaletteCard | `PaletteCard.vue:11`: solid hairline, **opaque `bg-card`**, `shadow-cartoon-sm → md` hover | cartoon | none — opaque cream punches a hole in the pane's glass plate |
| PaletteCardSkeleton | `bg-card/60` (`PaletteCardSkeleton.vue:9`) | cartoon-sm | half-glass — a THIRD register |

Three sibling surfaces in one pane, three depth grammars. The ask — "both cartoon cards, a bit more glassy" — resolves as:

**ROOT-ROUTING: value.js demo, both at their single class roots (S-21 clean).**
- `PaletteCard.vue:11` — `bg-card` → a glass rung (`bg-card/75 backdrop-blur-sm` or the glass-ui Card `tier` prop if the depth fleet exposes one) — ONE edit, every card instance (browse, palettes, mix, extract, dialog) inherits.
- `utils.css .dashed-well` — keep the dashed edge (it means "in-progress", a real semantic distinction) but join the cartoon family: swap the inset shadow for `shadow-cartoon-sm` + the same `bg-card/*` glass base, so it reads as *the same card species, unpinned* rather than a foreign tray.
- `PaletteCardSkeleton.vue:9` then matches PaletteCard by construction (same shell classes — consider extracting the shell class string to one place if a third consumer appears; not before, per KISS).

---

## S-17 — Inputs (P1)

glass-ui `Input` is pill-radius by design (AW.W25: "single-line controls (Input, SelectTrigger) keep the pill") and the demo's `ui/input/index.ts` correctly re-exports it. The unrounded read in the user's shot (16.20.27) is a **per-instance downgrade** — an S-21 violation at:

- `CurrentPaletteEditor.vue:118` — `class="text-mono-small h-8 flex-1 rounded-input bg-background border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0"`. This strips the pill (`rounded-input` = `--radius` = 10px → near-square at h-8), replaces the glass well with opaque `bg-background`, halves the border, and **suppresses the focus ring** (an a11y regression on top of the taste one). Live confirm: `current-palette-editor-light.png` — a flat beige rectangle on the glass plate.
- `PaletteRenameInput.vue:8-14` — raw `<input>` with ad-hoc classes inside the glass-ui `.input-bar` recipe. The pill container is right (evidence `card-rename-light.png` — this one reads well), but the field skips `.input-bar-field` (glass-ui `components.css:234-251`), forking font-size/placeholder styling by hand.

**ROOT-ROUTING: value.js demo.** Delete the override list at `CurrentPaletteEditor.vue:118` (keep only layout classes `flex-1`); add `input-bar-field` at `PaletteRenameInput.vue:12` and drop the duplicated classes. Zero glass-ui work needed — the producer is already correct.

---

## Empty/error states — SIGNAL LOST register (P1 dark / P2 light)

The R.W4 specimen-plate `EmptyState` is genuinely in-register (ghost dots seeded by the live accent, Fira eyebrow, Fraunces line — `browse-light-desktop.png` is one of the best moments on the page). Defects:

1. **Dark-mode eyebrow illegibility (P1).** `EmptyState.vue:13` — `text-muted-foreground/70` at mono-caption over dark glass: in `browse-dark-desktop.png` and `browse-dark-mobile.png` "· SIGNAL LOST ·" is effectively invisible (est. < 2:1). The 0.7 alpha on an already-muted token is a double attenuation. ROOT: demo `EmptyState.vue` — drop the `/70`, let `--muted-foreground` (scheme-tuned by the producer) speak.
2. **"Tap to retry" (P2).** `BrowsePane.vue:41-47` — pointer-language on desktop, and the CTA is a `DockIconButton` — a dock atom semantically mis-planted in a pane body, rendering as a bare amber text run with no affordance edge (evidence: both browse shots). ROOT: demo — glass-ui `Button variant="outline"` pill, copy "Retry" (device-neutral).
3. **Dialog browse tab loses the register (P2).** `PaletteBrowseTab.vue:14-15` passes no `empty-eyebrow`/`empty-hint` → the commons empty state falls back to "· empty plate ·" (the *saved* grammar). BrowsePane says "· the commons ·". Same state, two labels. ROOT: demo — pass the same eyebrow/hint pair.

---

## Card menu + dialog hierarchy (P1 menu / P2 dialog)

- **PaletteCardMenu** (`card-menu-light.png`): the reka-ui/shadcn `DropdownMenuContent` renders as a flat cream sheet — no glass, no cartoon edge, generic radius; it is the most "default-shadcn" surface left on these two pages. The *content* hierarchy is good (name label, K-INV5 `OFFLINE` small-caps annotation at `PaletteCardMenu.vue:35-39` is exactly the register). The demo already tokenizes `--dropdown-menu-font: var(--font-mono)` (`style.css:232`) — the surface tokens are the missing half. **ROOT-ROUTING: glass-ui producer** — the dropdown surface should read the glass panel recipe via tokens (`--dropdown-menu-bg/border/shadow`) the same way select does; demo `ui/dropdown-menu` is vendored (do-not-hand-edit), so the cure is the token seam or a glass-ui re-export (the `ui/alert` precedent).
- **Menu trigger** (`PaletteCard.vue:116-121`): a 4×4 `MoreHorizontal` in a `p-1` hit area ≈ 24px — under the 44px floor on touch; on mobile (`palettes-light-mobile.png`) it is the smallest target on the card. ROOT: demo — `p-2` + larger glyph, or the glass-ui icon-button atom.
- **Rename duplication** (P2, `card-rename-light.png`): while the rename input is open the card *title row stays rendered* directly above it — the same string twice, dashed-underlined above and selected inside the input. ROOT: demo `PaletteCard.vue` — hide the title span while `renaming`.
- **Delete-all ConfirmDialog** (`delete-all-dialog-light.png`): glass + Fraunces title + Fira body — in-register; flat hairline edge only (no cartoon rung — acceptable at the modal tier, note only). The *trigger* is the issue: an always-visible filled-red circular icon button at the list head (`PalettesPane.vue:36-43`) — the highest-chroma element on the whole pane guards its rarest, most destructive action. Prominence inversion (P2). ROOT: demo — demote into the card-menu/toolbar overflow or an outline-destructive ghost.

---

## Superfluity + craft cluster (S-12 discipline applied to these pages) — P2

1. **"1 colors"** — `CurrentPaletteEditor.vue:20` has no singular form. Confirmed live *and* in the user's own shot (16.23.57). One-line fix; craft signal disproportionate to cost.
2. **Triple count** — the header Badge `3` (`PalettesPane.vue:5`), the toolbar line "3 palettes" (`PalettesPane.vue:32-34`), and each card's per-palette count badge. The toolbar line exists only to left-balance the delete-all button — excise it (the header Badge is the canonical count).
3. **Twin search bars** — in the browse view both panes render `placeholder="Search palettes..."` side-by-side (`BrowsePane.vue:7`, `PalettesPane.vue:10`) — ambiguous scope. Differentiate: "Search the commons…" / "Search your palettes…".
4. Cross-ref (extract lane owns): "· undeveloped plate — feed it an image ·" (`ExtractWorkbench.vue:166`) — the user explicitly wants this class of annotation excised; it sits directly above the S-10 skeleton in the evidence shot.

---

## Type-hierarchy observation — the display voice never reaches the top of these pages (P2, design-ratification item)

On Browse/My-Palettes the **largest** text (pane titles "Browse"/"My Palettes" — `PaneHeader.vue:3`, `text-heading` = size-only rung; card names — `PaletteCard.vue:36`, `text-subheading`) speaks Jakarta body, while *smaller* elements (empty-state display line, "Current Palette" label) speak Fraunces. The atlas-plate hierarchy runs upside down: the plate's biggest labels are the least atlas. This is a *consequence* of the R.W3 three-voice law ("Fraunces for display rungs only") — the law is coherent, but on these two pages no display rung exists at all, so the register's display voice is absent above the empty state. **Recommendation for ratification:** pane titles adopt `font-display` (they are each pane's display moment); card names stay body (they are data, not display). ROOT: demo `PaneHeader.vue:3` — one site, all 9 panes inherit.

---

## S-15 — Aliasing evidence (mechanism owned by the root-cause lane)

- `swatch-zoom3x.png` (3× CSS zoom, re-rendered vector): WatercolorDot swatch edges carry a ~2px speckled fringe (turbulence-displaced edge pixels) + a chroma halo on the magenta dot. Present at 1× as edge dirt on every dot in `card-expanded-dark.png`.
- User shot 16.13.52 (card corner): stair-stepping along the card's top-left radius where the color strip clips against `overflow-hidden` + the cartoon shadow — note `PaletteColorStrip.vue` is plain divs (no filter), so the card-corner artifact is radius-clip AA, a *separate* mechanism from the dot fringe. Two mechanisms, not one.
- ROUTING: dot fringe → glass-ui producer (WatercolorDot filter raster); card-corner clip → value.js demo compositing (evidence handed to the S-15 root-cause lane).

## S-11 — API evidence (cross-ref)

Console (captured log, `.playwright-mcp/console-…log`): `BASE_URL` defaults to `https://api.color.babb.dev` (`api/client.ts:34-35`) → CORS preflight rejects `localhost:9000` (`Access-Control-Allow-Origin: https://color.babb.dev`). Every browse/publish path is dead in local dev unless `VITE_API_URL` is set. This is why Browse shows SIGNAL LOST on the dev server. ROOT candidates (S-11 lane's call): dev-mode default → local api origin, or a Vite dev proxy, or the api CORS allowlist gains localhost — the first is precept-cleanest (no prod change for a dev concern).

## Other cross-refs logged for sibling lanes

- **S-8**: `card-menu-light.png` top edge incidentally captures the collapsed dock rendering "Gra" text clipped over the WatercolorDot.
- **S-18**: `browse-dark-*.png` — dark panes over the unchanged bright-pink aurora read as mud; the aurora ignores the scheme flip entirely.
- One unreproduced anomaly: during probing the view once flipped `#/browse → #/gradient` with no view action taken (observed in `card-menu-light.png`); a follow-up scripted reproduce (menu open, Escape, add-color) did NOT trigger it. Not filed as a finding; noted for the S-9 transitions lane.

---

## Candidate wave-items (ranked)

| # | Item | Root | Size |
|---|---|---|---|
| W-1 | **Loading-grammar suite**: glass-ui `--skeleton-shimmer-delay` + `--skeleton-shimmer-tint` seams; PaletteCardSkeleton darker unified base (`ec1b200` register) + `shadow|specimen|developing` variants + sequential choreography; browse surfaces consume skeletons, all 3 `Loader2` sites die | glass-ui (2 token seams) + demo | M |
| W-2 | **Card-grammar unification**: PaletteCard glassy (`bg-card/75`+blur), `.dashed-well` joins the cartoon family, skeleton shell matches | demo (2 class roots) | S |
| W-3 | **Rainbow-recipe cure**: excise or re-derive `.pastel-rainbow-text` from `--accent-live` with scheme-guarded lightness (3 consumers, 1 recipe) | demo `utils.css` | S |
| W-4 | **Input consume**: strip `CurrentPaletteEditor.vue:118` overrides (incl. the focus-ring suppression), `input-bar-field` in PaletteRenameInput | demo | XS |
| W-5 | **Menu surface**: dropdown glass tokens (select parity) + trigger hit-area | glass-ui producer | S |
| W-6 | **Register polish**: eyebrow contrast (drop `/70`), "Retry" CTA as Button, dialog-tab eyebrow parity, hide title during rename | demo | XS |
| W-7 | **Superfluity excision**: "1 colors" plural, toolbar count line, twin placeholders, delete-all demotion | demo | XS |
| W-8 | **Ratify**: pane titles adopt the display voice (three-voice-law amendment, one PaneHeader site) | demo (+ design sign-off) | XS |

All recommendations are root-fixes (S-21): every multi-consumer defect is cured at its single recipe/component root; no per-instance patches, no fallbacks, no new shared dirs.
