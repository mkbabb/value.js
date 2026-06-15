# N.W14 — CARDS + skeletons + empty states: PaletteCard first-class, the depth grammar applied, glassy skeletons, empty-state CTAs (the watercolor-ghost interim → W18)

**Status: RATIFIED** (the WAVES-2 second block ratified 2026-06-15 — `EXECUTION-ORCHESTRATION.md §0`/`§5`).
No longer PLANNED.

**Round:** R3 (the design body — `EXECUTION-ORCHESTRATION.md §2`). Runs beside N.W13 (controls),
N.W15 (perf), N.W16 (per-pane), N.W17 (shell/motion/pops). **Consumes W12.D's depth laws +
`--card-edge` mint + W12.B's de-navy `--border`** (the keystone precedes the body — DAG `WAVES-2.md:276-287`).
Carries one `WatercolorDot variant="ghost"` interim that dies at the W18 BA-cut consume.

**Disposition:** IMPL split (Fable) — most lanes unilateral; only the watercolor-ghost half (lane E)
is BA-gated (`WAVES-2.md:34`).

**Idiom:** matches `N.md §4` + `WAVES-2.md` + the N.W10/N.W11 wave-spec precedent — §-structured,
hard-gate-per-lane, file:line-grounded; every claim cites a `demo/` file:line, an audit-lane §, or a
command+output run TODAY against the working tree / built `dist/gh-pages` / installed glass-ui 3.13.0
(inv ε). **DEVELOPMENT doc — nothing implemented; no source/test/CI edits.** Every anchor is a SPEC
binding-site, not a change.

---

## §0 — One-paragraph reading

The demo's palette card is a hardcoded class string with no variant axis, its loading state is a
SEPARATE 35-LoC file (`PaletteCardSkeleton.vue`) that hand-mirrors the card anatomy and drifts, its
content cards stack THREE depth cues (a hard `8px 8px` cartoon offset + a navy `--border` hairline +
the wash pane's own scroll-fade) so the user reads "shadow FIGHTING / too extreme / black hairline
wrong" (U17/U24/U26), its skeletons are murky `--muted-foreground 10%` bones over near-black (U20a),
its empty states are gray italic mono whispers in a color app (D3 §7) — one of them a dock primitive
misused as a body button (`BrowsePane.vue:37`) — and `MixSourceSelector.vue:148` carries a bare
`watercolor-swatch` class that resolves to NO reachable rule (the live inv-N-7 phantom). N.W14 makes
PaletteCard a first-class component with a `material="glass|cartoon|flat"` axis and `skeleton` as a
STATE of the same shell (zero-drift, the file deleted), applies W12.D's depth grammar (one shadow
voice; the cartoon budget = plates + ≤1 protagonist/pane; hover lifts never lurch; hairlines glassy
via `--card-edge`), re-authors the skeleton onto glass-ui `<Skeleton variant="shimmer">` with bones
that CARRY COLOR (a skeleton in a color app promises color), and re-grammars the empty states into
display-ramp headlines + WatercolorDot-ghost pops tinted from the live color + real glass-ui `<Button>`
CTAs. The wave is demo-owned design work; its π evidence (before/after element pairs) is gated behind
N.W10.D's cascade kill (the desktop must render first). One ghost half — the PROPER watercolor-shaped
ghost outline — rides an interim (a dashed grammar) until the W18 BA-cut consumes
`WatercolorDot variant="ghost"`, at which point the interim dies.

---

## §Provenance — the audit lanes + file:line roots

| Source | What it provides | Locus |
|---|---|---|
| User audit **U24** | "Shadow too extreme; hairline border wrong; the palette component → FIRST-CLASS in-repo component with variants (skeleton, glass)" — the headline W14 ask, owner = demo | `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md:62` |
| User audit **U17** | "Palettes card + many cards not rounded properly; shadow FIGHTING issue; cards = glass cards WITH cartoon shadows" | `LEDGER.md` U17 row |
| User audit **U19** | "Components not rounded per the design language (two separate panes)" | `LEDGER.md` U19 row |
| User audit **U20** | "Skeletons too BLACK — should be glassy like glass-ui skeletons; the slider = a glass slider, but SPECTRUM glass" (W14 owns the skeleton half U20a; the slider half U20b = W13.A) | `LEDGER.md:50` |
| User audit **U26** | "Black hairline wrong (should be glassy); shadow too extreme again" (border-token root = W12.B) | `LEDGER.md` U26 row |
| User audit **U18** | "The dashed outline = a dashed/GHOST variant of the watercolor dot — abstracted to glass-ui" | `LEDGER.md` U18 row |
| User audit **U22** | "'Not a proper watercolor ghost'; UI needs refinement" | `LEDGER.md` U22 row |
| Lane **U-cards** | the depth-grammar yardstick + the full card selector census + the U17/U24/U26 shadow-fighting root + the U18 watercolor-ghost diagnosis + the dashed-idiom inventory | `docs/tranches/N/audit/lanes2/U-cards.md` (full lane) |
| Lane **D3** | the per-pane work-orders: §1 PaletteCard material/skeleton axes, §3 skeletons glassy, §7 empty-state CTA grammar, D3-9 sticky bar | `docs/tranches/N/audit/lanes2/D3.md:1-99,229-266` |
| Lane **D6** | the depth grammar: the Z0–Z4 rank table + the six laws + the `--card-edge` mint ownership (minted at W12.D, consumed here) | `docs/tranches/N/audit/lanes2/D6.md:126-164` |
| Lane **D7** | WO-D7-3 the empty-state pops (watercolor-dot ghosts tinted from the live color — merged into D3 §7) | `docs/tranches/N/audit/lanes2/D7.md:72-76` |
| WAVES-2 §N.W14 | the ratified lane table A–E + the hard gate | `docs/tranches/N/WAVES-2.md:124-138` |
| WAVES-2 §4 (inv deltas) | inv-N-7 VIOLATED-at-HEAD, closes at W14.E; the precise unreachable-scoped-emission mechanism | `docs/tranches/N/WAVES-2.md:317-323` |
| WAVES-2 §5 (coverage) | U17/U19/U24/U26 → W14.B; U24 → W14.A; U20 → W14.C; U18/U22 → W14.E (→ W18.A); the LP3-7 `v-memo` carry | `docs/tranches/N/WAVES-2.md:341-352` |
| EXECUTION-ORCHESTRATION §2 | R3 placement; the W10.D gate-opener precondition (the cascade kill is the substrate every later design gate stands on) | `docs/tranches/N/EXECUTION-ORCHESTRATION.md:56-83` |

**Source-tree roots (the live defects + the live substrate, all verified 2026-06-15 at `tranche-f-handoff`):**

| File:line | What lives there |
|---|---|
| `demo/@/components/custom/palette-browser/PaletteCard.vue:5-13` | the hardcoded class string — NO material/variant axis (lane A) |
| `demo/@/components/custom/palette-browser/PaletteCard.vue:7` | `'group rounded-card border border-border bg-card overflow-hidden transition-shadow hover:shadow-card-hover cursor-pointer'` — the navy hairline + the none→`hover:shadow-card-hover` 10px lurch (lanes A, B) |
| `demo/@/components/custom/palette-browser/PaletteCardSkeleton.vue` (35 LoC) | the SEPARATE skeleton file: `border border-border bg-card` (`:2`), raw `animate-pulse` bones (`:6,16,22`), `--muted-foreground 10%` murky bones (`:9`) — the drift source + the murky-bone defect (lanes A, C) |
| `demo/@/components/custom/gradient/GradientVisualizer.vue:122` | `class="h-20 sm:h-24 rounded-card border border-border bg-card overflow-hidden shadow-card"` — the worst cartoon fighter (hard `shadow-card` on an inner swatch inside a wash pane) (lane B) |
| `demo/@/components/custom/gradient/GradientVisualizer.vue:139,209,225` | three `border-border` hairlines (lane B census) |
| `demo/@/components/custom/gradient/GradientCodeEditor.vue:138` | `rounded-lg border-border/40` — the U24 heavy-black CSS card; a raw `rounded-lg` off-grammar radius (lane B) |
| `demo/@/components/custom/mix/MixResultDisplay.vue:31` | `rounded-xl` glass-floating ring — a raw off-grammar radius role (lane B) |
| `demo/@/components/custom/palette-browser/PaletteCardGrid.vue:13-18` | the empty-state whisper: `text-center text-muted-foreground py-8 fira-code text-mono-small italic` (`:15`) — gray italic mono, no headline, no pop, no CTA (lane D) |
| `demo/@/components/custom/palette-browser/EmptyState.vue` | the 8-admin-consumer whisper component upgraded with a `tone="quiet|invite"` axis (lane D) |
| `demo/@/components/custom/panes/BrowsePane.vue:24-29` | the `Loader2` spinner loading state — a register mismatch (list-shaped waits want list-shaped skeletons) (lane C) |
| `demo/@/components/custom/panes/BrowsePane.vue:36-43` | the error CTA = text inside a `DockIconButton` (a dock primitive misused as a body button) (lane D) |
| `demo/@/components/custom/panes/BrowsePane.vue:49` | `empty-text="No published palettes found."` — the browse whisper (lane D) |
| `demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteControlsBar.vue:2` | `sticky top-0 z-bar bg-card pb-2` — opaque sticky bar over a glass list; D3-9 → translucent + blur (lane D) |
| `demo/@/components/custom/mix/MixSourceSelector.vue:148` | `class="… watercolor-swatch border-2 border-dashed border-primary/30 …"` — the bare `watercolor-swatch` phantom + a dashed circle add-slot (lanes E; inv-N-7) |
| `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:3,83,295,305` | `.dashed-well` wrapper (`:3`), a `rounded-full border-2 border-dashed` add-slot (`:83`), `outline:2px dashed` editing affordances (`:295,305`) — the second dashed idiom (lane E) |
| `demo/@/styles/utils.css:56` | `.dashed-well` definition (minted N.W5.E) — the dashed grammar root (lane E) |
| `demo/@/components/custom/panes/{Extract,Palettes}Pane.vue` + 5 more | the 7 PaletteCard consumers that must pass a material (lane A) |

---

## §State-verified — the defect/absence proven TODAY (2026-06-15)

Every claim below is a command run against the working tree / built `dist/gh-pages/assets/` /
installed `node_modules/@mkbabb/glass-ui` at glass-ui 3.13.0 (value.js 0.12.0). No repo edits.

### SV-1 — PaletteCard has no material axis; the skeleton is a SEPARATE drifting file (lane A, U24) — LIVE

```
$ sed -n '5,13p' demo/@/components/custom/palette-browser/PaletteCard.vue
        'group rounded-card border border-border bg-card overflow-hidden transition-shadow hover:shadow-card-hover cursor-pointer',
$ wc -l demo/@/components/custom/palette-browser/PaletteCardSkeleton.vue   →  35
$ grep -c "animate-pulse" demo/@/components/custom/palette-browser/PaletteCardSkeleton.vue   →  4
$ grep -rln "<PaletteCard" demo/@/components/custom | wc -l   →  (7 consumer sites: Browse/Palettes/Extract/ImagePaletteExtractor/GenerateControls/PaletteSavedTab/PaletteBrowseTab)
```

**Confirmed:** the card hardcodes ONE class string (no `material`/`skeleton` prop); the loading state
is a hand-mirrored 35-LoC sibling file with 4 raw `animate-pulse` bones that drifts independently
(its swatches `rounded-badge`, its hairline `border border-border` — `PaletteCardSkeleton.vue:2,22`).
Born-RED: there is no variant axis and no single-shell skeleton state today (D3 §1; U-cards §1.B).

### SV-2 — The depth-cue stacking (lane B, U17/U24/U26) — LIVE

```
$ grep -n "shadow-card\|border-border" demo/@/components/custom/gradient/GradientVisualizer.vue
122:  class="h-20 sm:h-24 rounded-card border border-border bg-card overflow-hidden shadow-card"
139:  <hr class="border-border" />
209:  <hr class="border-border" />
225:  <hr class="border-border" />
$ grep -n "hover:shadow-card-hover\|border-border" demo/@/components/custom/palette-browser/PaletteCard.vue
7:  'group rounded-card border border-border bg-card overflow-hidden transition-shadow hover:shadow-card-hover cursor-pointer',
```

**Confirmed:** `GradientVisualizer.vue:122` carries a hard `shadow-card` (the `8px 8px 0 0` cartoon
offset, U-cards §0) on an inner swatch sitting inside a `tier="wash" :shadow=false` pane — two depth
systems on one surface (U17 "fighting"). `PaletteCard.vue:7` goes `none → hover:shadow-card-hover`
(the 10px lurch, D6 law 3) AND carries `border border-border` (the dark-mode `hsl(217.2 32.6% 18%)` =
`rgb(31,42,61)` navy hairline, U-cards §0 — U26 "black hairline wrong"). Born-RED: the three-cue stack
is the class string today.

### SV-3 — Off-grammar radii (lane B, U19) — LIVE

```
$ grep -rho "rounded-\(lg\|xl\|2xl\)" demo/@/components/custom | sort | uniq -c
   4 rounded-lg
   2 rounded-xl
   4 rounded-2xl
```

**Confirmed:** the raw Tailwind radii (`rounded-lg`/`rounded-xl`/`rounded-2xl`) bypass the role-bearing
house tokens (`rounded-card`/`panel`/`input`) — the literal U19 "not rounded per the design language"
sites (U-cards §1.C; D3 anchors `GradientCodeEditor.vue:138` `rounded-lg`, `MixResultDisplay.vue:31`
`rounded-xl`). Born-RED: the off-grammar radii are live.

### SV-4 — The skeleton bones are murky, not glassy/colorful (lane C, U20a) — LIVE

```
$ grep -n "muted-foreground\|animate-pulse\|border-border" demo/@/components/custom/palette-browser/PaletteCardSkeleton.vue
2:  <div class="rounded-card border border-border bg-card overflow-hidden">
6:    class="h-full animate-pulse"
9:    backgroundColor: 'color-mix(in srgb, var(--muted-foreground) 10%, transparent)',
16:  <div class="h-5 w-32 rounded-md bg-foreground/[0.06] animate-pulse" />
```

**Confirmed:** strip bones are `--muted-foreground 10%`, meta/swatch bones `bg-foreground/[0.04–0.06]`
— grayscale over the near-black `bg-card`, the murky void U20a names ("skeletons too BLACK"). The bones
carry NO color, in a color app. `BrowsePane.vue:24-29` uses a `Loader2` spinner for the same logical
wait (the register mismatch). Born-RED: the bones are gray today.

### SV-5 — Empty states are gray italic mono whispers; a dock primitive is misused as a body button (lane D, D3 §7) — LIVE

```
$ grep -n "muted-foreground\|italic\|fira-code\|DockIconButton" demo/@/components/custom/palette-browser/PaletteCardGrid.vue demo/@/components/custom/panes/BrowsePane.vue
PaletteCardGrid.vue:15:  class="text-center text-muted-foreground py-8 fira-code text-mono-small italic"
BrowsePane.vue:36:  <span class="text-mono-small text-muted-foreground">{{ pm.browseError.value }}</span>
BrowsePane.vue:37:  <DockIconButton …>          ← a dock primitive as a body "Retry" button
BrowsePane.vue:49:  empty-text="No published palettes found."
BrowsePane.vue:114:import { DockIconButton } from "@mkbabb/glass-ui/dock";
```

**Confirmed:** the saved-palette empty state is gray italic Fira mono with no headline/pop/CTA
(`PaletteCardGrid.vue:15`); the browse error renders text inside a `DockIconButton`
(`BrowsePane.vue:37`) — a dock chrome primitive pressed into body-button service (D3 §7). The sticky
controls bar is opaque `bg-card` (`PaletteControlsBar.vue:2`, D3-9). Born-RED: the whisper grammar +
the misuse are live.

### SV-6 — The `watercolor-swatch` phantom (lane E, inv-N-7) — LIVE on the installed glass-ui dist

The demo uses a BARE `watercolor-swatch` class:
```
$ grep -rn "watercolor-swatch" demo/@/components/custom/mix/MixSourceSelector.vue
148:  class="… watercolor-swatch border-2 border-dashed border-primary/30 …"
$ grep -rn "\.watercolor-swatch" demo/@/styles/    →  (none — the demo defines no rule)
```
glass-ui ships `.watercolor-swatch` ONLY SFC-scoped (a `[data-v-…]` attribute selector), unreachable
from a bare consumer class:
```
$ grep -rEo "[.][a-z-]*watercolor-swatch[^,{ ]*" node_modules/@mkbabb/glass-ui/dist/glass-ui.css | sort | uniq -c
   2 .watercolor-swatch[data-v-316c227e]
   1 .watercolor-swatch.watercolor-animated[data-v-316c227e]
   1 .watercolor-swatch[data-v-316c227e]:active
   1 .watercolor-swatch[data-v-316c227e]:focus-visible
   1 .watercolor-swatch[data-v-316c227e]:hover
   1 .watercolor-swatch[data-variant=ghost][data-v-316c227e]
   1 .watercolor-swatch[data-variant=ghost][data-v-316c227e]:hover
```

**Confirmed:** every emitted `.watercolor-swatch` rule carries `[data-v-316c227e]` (the WatercolorDot
SFC scope hash — note this differs from WAVES-2's audit-HEAD-cited `cb0117af` because the installed
3.13.0 differs from the audit HEAD; the MECHANISM is identical). A bare `watercolor-swatch` on a demo
`<div>` matches NONE of these scoped selectors → the class is a live no-op (the P9 phantom inv-N-7
forbids). Born-RED on the installed dist. **Precision (the K1-F2 mechanism, `WAVES-2.md:446-450`):**
the violation is NOT "glass-ui defines no rule" (it does) — it is that the SFC-scoped emission is
unreachable from the demo's bare class.

### SV-7 — The W14.E ghost is ALREADY shipped by glass-ui 3.13.0 (the interim-vs-consume refinement) — LIVE

```
$ grep -c "data-variant=ghost\[data-v-316c227e\]" node_modules/@mkbabb/glass-ui/dist/glass-ui.css   →  2
$ node -e "import('./node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js').then(m=>console.log(Object.keys(m).join(', ')))"
WatercolorDot, hashString, mulberry32, radiiToCSS, randomRadii, useWatercolorBlob
$ node -e "import('./node_modules/@mkbabb/glass-ui/dist/glass-ui.js').then(m=>console.log('root WatercolorDot:', 'WatercolorDot' in m))"   →  false
```

**Confirmed + REFINES the WAVES-2 hand-off:** the installed glass-ui 3.13.0 ALREADY emits a
`[data-variant=ghost]` watercolor-swatch rule and exports `WatercolorDot` via the
`@mkbabb/glass-ui/watercolor-dot` SUBPATH (not the root barrel). WAVES-2 §N.W14.E filed the proper
watercolor ghost as the X-GU C-2 ask "consumed at W18." The 3.13.0 dist suggests the ghost VARIANT may
already be available pre-BA via the subpath component — so the W18 consume becomes a VERIFY-and-adopt
(does the shipped ghost render the PRNG-silhouette stroke the user wants, U22 "not a proper watercolor
ghost"?) rather than a wait-for-net-new. The W14.E interim still lands (a harmonized dashed grammar +
the phantom kill); the §Hand-off records the refined consume edge. (Born-RED for the interim: the bare
phantom + the two-idiom split are live, SV-6 + SV-8.)

### SV-8 — The two-idiom dashed split (lane E, U18/U22) — LIVE

```
$ grep -rn "border-dashed\|dashed-well\|rounded-full border-2 border-dashed" \
     demo/@/components/custom/mix/MixSourceSelector.vue \
     demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue
MixSourceSelector.vue:115:  <div class="dashed-well">                         ← the square recessed well
MixSourceSelector.vue:148:  class="… watercolor-swatch border-2 border-dashed border-primary/30 …"  ← circle add-slot
CurrentPaletteEditor.vue:3:   class="dashed-well"                             ← same well idiom
CurrentPaletteEditor.vue:83:  class="… rounded-full border-2 border-dashed border-primary/30 …"     ← circle twin
CurrentPaletteEditor.vue:295: outline: 2px dashed …                           ← editing affordance
```

**Confirmed:** three distinct dashed idioms coexist — the `.dashed-well` recessed square
(`utils.css:56`), the circle `border-2 border-dashed` add-slot (two near-identical twins), and the
`outline:2px dashed` editing affordance. Born-RED: the un-harmonized split + the phantom are live
(U18/U22; U-cards §1.D).

### SV-9 — The cross-wave gate-opener born-RED roots (W10.C / W10.D), proven on the live built demo

W14's π gate (the before/after element pairs) is structurally blind until N.W10 lands — the cascade
kill means the desktop never renders, so any in-viewport / element-shot evidence is meaningless
(`EXECUTION-ORCHESTRATION.md:56-62`; inv-N-11). Both W10 roots are born-RED TODAY:

**The cascade kill (W10.D, U11's true root) — LIVE on the BUILT demo artifact:**
```
$ BD=dist/gh-pages/assets/index-OigTVKLL.css   # the SHIPPED demo CSS
$ grep -oE "@layer [a-z, -]*\{" $BD            →  properties / theme / base / components / utilities
# but the display utilities are emitted OUTSIDE every @layer block (strip the balanced @layer blocks, then):
$ python3 strip-layers.py $BD | grep -oE "\.(hidden|flex|block|grid)\{[^}]*\}"
.block{display:block}  .flex{display:flex}  .grid{display:grid}  .hidden{display:none}
```
The shipped `dist/gh-pages/assets/index-OigTVKLL.css` emits `.hidden{display:none}` (and `.flex`,
`.block`, `.grid`) UNLAYERED — and the glass-ui styles entry it imports ships its utilities unlayered
too (`node_modules/@mkbabb/glass-ui/dist/styles/components.css` → `@layer` count = 0, `.hidden{display:none}`
bare). Per css-cascade-5 an unlayered rule beats ALL layered rules, so the demo's layered responsive
`lg:*` utilities (which drive the desktop dual-pane) are overridden → the desktop never renders
(D8-1 / U-DOCK §2). **Born-RED on the live built demo, not merely the source.**

**The save-data-loss P0 (W10.C) — LIVE in source:**
```
$ grep -n "ensureUser\|createPalette\|onCurrentPaletteSaved" demo/@/composables/palette/usePaletteActions.ts
59:  async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
60:    await ensureUser();
61:    const palette = deps.createPalette(name, colors);
```
`onCurrentPaletteSaved` awaits `ensureUser()` BEFORE `createPalette` — a down/failing backend aborts
the LOCAL write and the palette is silently destroyed (D7 §3.4; the local-first contract inverted).
**This directly bounds W14's empty-state CTA wiring (lane D)**: the "Add color → save" CTA must land
the local-first save FIRST (W10.C), then the W14 empty-state grammar is honest. Born-RED: the
await-order is the data-loss path today.

---

## §Goal

**Goal criterion.** The demo's card surfaces speak ONE coherent depth grammar. PaletteCard is a
first-class, variant-bearing component (`material="glass|cartoon|flat"`, `skeleton` a state of the
same shell — zero drift); every content card reads as a glass plate with at most ONE shadow voice and
a glassy `--card-edge` hairline (never navy); hover lifts grow from a resting base (never the
none→10px lurch); skeletons are glass-ui shimmer bones that CARRY COLOR (a skeleton in a color app
previews color, not absence); empty states are colorful invitations — display-ramp headline +
WatercolorDot-ghost pops tinted from the live color + a real glass-ui `<Button>` CTA — never gray
italic mono whispers, never a dock primitive misused as a body button; and the dashed idioms are
harmonized onto one grammar with the bare `watercolor-swatch` phantom killed (inv-N-7 closes).

**Completion criterion.** All §Hard-gate clauses verify against artefacts: the π element-pair
before/after evidence (vs u12/u16/u17/u21/u23) shows the card grammar applied; `PaletteCardSkeleton.vue`
is absent from the tree; the 7 consumers pass a material; the cartoon DOM census per route is within
the `plates + ≤1 protagonist/pane` budget; zero `border-border` on content cards; zero raw
`rounded-lg/xl/2xl` on the card surfaces; skeleton bones are color-tinted glass-ui shimmer; the empty
states carry headline + pop + CTA with the DockIconButton misuse retired; the bare `watercolor-swatch`
phantom grep returns ZERO (inv-N-7 closes); the `v-memo` list contract lands with the card (LP3-7).
The π gate is captured AFTER N.W10.D's cascade kill (the desktop renders).

---

## §Scope — the lanes, each at the gestalt seam

The wave touches exactly the demo card/skeleton/empty-state/dashed surfaces + the depth-grammar
application sites + the dashed-grammar styles. It consumes W12.D's `--card-edge` mint + the six laws +
W12.B's de-navy `--border` (it does NOT mint them). No library source, no test/CI edits.
(DEVELOPMENT doc — SPEC bounds, not an implementation.)

| Lane | Work | Anchors | Seam |
|---|---|---|---|
| **A — PaletteCard first-class (U24)** | `material="glass"\|"cartoon"\|"flat"` (default `glass`) + `skeleton` as a STATE of the SAME shell (same radii/strip/meta/swatch geometry — zero drift possible); `PaletteCardSkeleton.vue` DELETED; the 7 consumers pass a material; `cartoon` = the ONE protagonist per pane (extract/generate result), NEVER list rows; the `v-memo` list contract (LP3-7) lands WITH it | `PaletteCard.vue:5-13`; `PaletteCardSkeleton.vue` (dies); the 7 consumers (SV-1) | the componentization seam — one shell, one variant axis; the skeleton is a state, not a sibling |
| **B — Depth sweep (U17/U19/U26)** | `border-border` navy → `--card-edge` on content cards (W12.D mint); cartoon OFF inner swatches (`GradientVisualizer.vue:122` the worst fighter → glass-resting recipe); hover = grow-from-base + `translate(-2px,-2px)` (the none→10px lurch banned, D6 law 3); the raw `rounded-lg/xl/2xl` → role tokens; the `--radius-input` 4-vs-8 drift DECIDED + documented | `GradientVisualizer.vue:122,139,209,225`; `PaletteCard.vue:7`; `MixResultDisplay.vue:31`; `GradientCodeEditor.vue:138` | the depth-grammar application seam — apply W12.D's Z-tiers + six laws; one shadow voice per element |
| **C — Skeletons glassy (U20a)** | Re-author the §A `skeleton` state onto glass-ui `<Skeleton variant="shimmer">` (root-barrel export, SV verified); bones CARRY COLOR — strip segments tinted `color-mix(in oklab, <cssColorOpaque> 10–16%, transparent)` STEPPED by index (a skeleton in a color app promises color); the browse `Loader2` spinner → 3 staggered skeleton cards; refine onto `surface="glass"` at the BA pin (W-SURFACE-AXIS → W18.A) | `PaletteCardSkeleton.vue` (dies into the §A state); `BrowsePane.vue:24-29` | the loading-register seam — list-shaped waits get list-shaped color-bearing bones |
| **D — Empty states → CTAs with pops** | ONE grammar (D3 §7 + D7-3 merged): display-ramp headline, a `WatercolorDot` ghost trio tinted from the LIVE color, a real glass-ui `<Button>` CTA (palettes → "Add `<color chip>`" wiring `pm.emitAddColor(cssColorOpaque)`; browse → "Retry" + "Publish yours →"; extract → "Upload an image" + "Use the camera"); mono micro DEMOTED to subline; admin `EmptyState.vue` keeps `tone="quiet"` (panes pass `invite`); the `DockIconButton`-as-body-button misuse RETIRED; sticky `PaletteControlsBar` → translucent + blur (D3-9) | `PaletteCardGrid.vue:13-18`; `EmptyState.vue`; `BrowsePane.vue:36-49`; `PaletteControlsBar.vue:2` | the absence-state seam — the degraded product still advertises color (the product IS color) |
| **E — Dashed-ghost interim (U18/U22)** | Harmonize the TWO dashed idioms (the square `.dashed-well` vs the circle add-slot twin vs the `outline:2px dashed` affordance) onto ONE dashed grammar + KILL the bare `watercolor-swatch` phantom (inv-N-7 closes); the PROPER watercolor ghost (`WatercolorDot variant="ghost"` — the PRNG silhouette as stroke) is the FILED X-GU C-2 ask, consumed/verified at W18 (the interim dies there) | `MixSourceSelector.vue:115,148`; `CurrentPaletteEditor.vue:3,83,295,305`; `utils.css:56` | the dashed-grammar seam — one idiom now, the ghost variant at the pin; the phantom dies |

**Note on lane E vs W18.** The W14.E interim is the harmonized dashed grammar + the phantom kill — both
demo-unilateral, both born-RED today (SV-6, SV-8). The PROPER watercolor-shaped ghost is the BA-gated
half (`WAVES-2.md:34` "watercolor-ghost = BA"); SV-7 REFINES it from a net-new ask to a verify-and-adopt
(glass-ui 3.13.0 already ships a `data-variant=ghost` rule). §Hand-off binds the consume edge.

---

## §Hard gate — FALSIFIABLE, born-RED-witnessable on a named defect tree TODAY

The wave closes when ALL clauses verify against artefacts. Each is falsifiable and born-RED today (per
the SV-N probes). For lane E's ghost half the born-RED is the **capability-present-but-unreachable**
sense (the demo's bare class is a phantom — SV-6 — the rule is unreachable, not absent). P6 posture
(the π / measured-evidence discipline) is named per clause. **This rides N.W14's WAVES-2 gate verbatim**
("π element pairs vs u12/u16/u17/u21/u23; `PaletteCardSkeleton.vue` absent from tree; cartoon census
per route within budget; zero `border-border` on content cards", `WAVES-2.md:136-137`) — the clauses
below decompose it.

| # | Clause | Falsifiable test | Born-RED today | P6 posture |
|---|---|---|---|---|
| **HG-A1** | PaletteCard has a `material="glass\|cartoon\|flat"` axis + `skeleton` state; `PaletteCardSkeleton.vue` is ABSENT from the tree; the 7 consumers pass a material | `test ! -f …/PaletteCardSkeleton.vue`; `grep -L material` over the 7 consumers = empty | YES — SV-1: the file exists (35 LoC), no material axis | **deletion/presence proof** (the file-absence inverts) |
| **HG-A2** | `cartoon` material appears at most ONCE per pane (the protagonist budget, D6 law 2); the `v-memo` list contract (LP3-7) is present on the card list | a DOM census per route asserting `material="cartoon"` count ≤ 1; grep `v-memo` on the list | YES — SV-2: cartoon is on inner swatches (every fighter), no budget enforced | **per-route DOM census** — the count is the measured property |
| **HG-B1** | ZERO `border-border` on content cards (PaletteCard, GradientVisualizer swatch, the CSS card) — the `--card-edge` mint consumed instead | `grep -rn "border-border" demo/@/components/custom/{palette-browser,gradient}` over the card sites = 0 | YES — SV-2: `PaletteCard.vue:7` + `GradientVisualizer.vue:122,139,209,225` carry navy | **grep-absence proof** (the navy hairline inverts to `--card-edge`) |
| **HG-B2** | ONE shadow voice per element (D6 law 1); no `none → hover:shadow-card-hover` lurch — hover grows from a resting base WITH a translate (D6 law 3) | the π hover-state element pair (rest→hover) showing grow-from-base, not materialize; grep the banned `none → 10px` recipe gone | YES — SV-2: `PaletteCard.vue:7` `hover:shadow-card-hover` from none; `GradientVisualizer.vue:122` stacks cartoon + navy + wash | **π before/after element pair** (rest + hover states) |
| **HG-B3** | ZERO raw `rounded-lg/xl/2xl` on the card surfaces — role tokens (`rounded-card/panel`) instead; the `--radius-input` drift documented | `grep -rho "rounded-\(lg\|xl\|2xl\)"` over the card sites = 0; the drift decision in `demo/DESIGN.md` | YES — SV-3: 10 raw-radius occurrences live | **grep-census** + **doc reconciliation** |
| **HG-C** | Skeleton bones are glass-ui `<Skeleton variant="shimmer">` and CARRY COLOR (strip tinted `color-mix(… <cssColorOpaque> …)` stepped); the browse `Loader2` spinner → 3 staggered skeleton cards | the π skeleton element pair (vs u16) showing color-bearing shimmer bones; grep `Loader2` gone from `BrowsePane`; the tint expression present | YES — SV-4: `--muted-foreground 10%` murky gray bones + `Loader2` spinner | **π before/after element pair** (vs u16 the black void) |
| **HG-D** | Empty states carry display-ramp headline + WatercolorDot-ghost pop + a real `<Button>` CTA; the mono micro is the SUBLINE only; the `DockIconButton`-as-body-button misuse is RETIRED; the sticky bar is translucent+blur | the π empty-state element pair (vs u12) showing headline+pop+CTA; grep `DockIconButton` gone from the browse error CTA; `PaletteControlsBar` no longer `bg-card` opaque | YES — SV-5: gray italic mono whisper + the DockIconButton misuse + opaque sticky bar | **π before/after element pair** (vs u12 the whisper) |
| **HG-E1** | The bare `watercolor-swatch` phantom grep returns ZERO — inv-N-7 CLOSES (every demo class resolves to a reachable rule) | `grep -rn "\bwatercolor-swatch\b" demo/@/components` over BARE classes = 0 (either consumed via `WatercolorDot` or harmonized into the dashed grammar) | YES — SV-6: `MixSourceSelector.vue:148` bare class, unreachable scoped emission | **grep-absence proof** (the phantom inverts) |
| **HG-E2** | The dashed idioms are harmonized onto ONE dashed grammar (the square well + the circle add-slot + the editing affordance speak one voice) | the π dashed element pair showing one harmonized idiom across the three sites | YES — SV-8: three distinct dashed idioms live | **π element pair** across the three sites |
| **HG-gate-opener** | The π element-pair evidence (HG-B2/C/D/E2) is captured AFTER N.W10.D's cascade kill lands — until the desktop renders, in-viewport element shots are structurally blind (inv-N-11) | the π captured against a rendering desktop (W10.D `display ≠ none @1440` assert green) | YES — SV-9: the built demo emits unlayered `.hidden{display:none}` → desktop dead | **cross-wave precondition** — W10.D is the substrate gate |

**The gate-opener precondition (cross-wave, BINDING).** Per `EXECUTION-ORCHESTRATION.md:56-62`, W10 is
the gate-opener: until the cascade kill (SV-9) closes, the desktop dual-pane never renders, so EVERY
W14 π element-shot (the rest/hover/skeleton/empty/dashed pairs) is structurally blind — the same
blindspot class kf-K's cold-axis invariant names. W14's SOURCE-SHAPE gates (HG-A1, HG-B1, HG-B3,
HG-E1 — file deletions, grep-absences, presence of the material axis) are demo-INDEPENDENT and provable
WITHOUT the demo rendering. Only the VISUAL π pairs sit behind W10.D. The source gates do not wait;
the π does.

---

## §No-workaround — the named forbidden shortcuts for THIS wave

- **NO glass-ui `PaletteCard`.** The user said FIRST-CLASS **in-repo** (`LEDGER.md:62`). PaletteCard is
  demo-owned (it composes domain data — a `Palette` model); glass-ui gets NO PaletteCard (KISS,
  `feedback_kiss_no_contrivance`). glass-ui supplies only consumed PRIMITIVES (`<Skeleton>`, `<Button>`,
  `<WatercolorDot>`). Authoring a PaletteCard into glass-ui is forbidden — it is not a generic primitive.
- **NO second skeleton FILE.** The skeleton is a STATE of the SAME PaletteCard shell (same material prop,
  same radii/strip/meta/swatch geometry) — `PaletteCardSkeleton.vue` is DELETED, not refactored beside
  the card (no legacy beside its replacement; the drift source SV-1 is structurally eliminated, not
  patched). Keeping the sibling file "in case" is the forbidden shortcut.
- **NO new shadow/edge/radius tokens.** The `--card-edge` mint, the Z0–Z4 tiers, and the six laws are
  OWNED by W12.D (`D6.md:126-164`); W14 CONSUMES them. Minting a second `--card-edge`-class token here
  is forbidden (one mint, owned at the keystone — `WAVES-2.md:92`). The de-navy `--border` retune is
  W12.B's; W14 does not re-tune `--border`.
- **NO stacking depth cues to "fix" the fighting.** The U17/U24/U26 defect is THREE cues on one element
  (cartoon + navy + wash). The fix is ONE shadow voice (D6 law 1), not a softer-but-still-stacked
  compromise. Adding a fourth cue (an inset ring on top of the cartoon) is the anti-fix.
- **NO cartoon on list rows.** The cartoon `8px 8px` offset is reserved for the Z3 protagonist (≤1 per
  pane) + the Z1 plates (D6 law 2). Putting `material="cartoon"` on every browse/saved row reintroduces
  the exact U17 fighting (every row going 0→10px over a wash pane). The list rows are `glass` (Z3').
- **NO gray skeleton bones.** A skeleton in a color app promises COLOR (D3 §3). Re-authoring onto
  `<Skeleton>` but keeping `--muted-foreground`/`bg-foreground` grayscale bones is the forbidden
  half-fix — the bones MUST tint from `cssColorOpaque` (SV-4 inverts).
- **NO whisper empty states; NO dock primitive as a body button.** Demoting the empty state to a quieter
  gray italic is the anti-fix — the absence state is an INVITATION (headline + pop + CTA, D3 §7). The
  `DockIconButton` is retired from the browse error CTA, replaced by a real `<Button>` (it is dock chrome,
  not a body control — using it as one is the misuse the wave retires, not preserves).
- **NO empty-state CTA wired BEFORE the W10.C save fix.** The palettes "Add color → save" CTA must land
  the local-first save FIRST (W10.C, SV-9) — wiring a celebratory CTA on top of the data-loss path is
  forbidden (the celebration would fire while the save silently destroys the palette).
- **NO faking the watercolor ghost with a plain dashed circle.** The W14.E interim is a HARMONIZED dashed
  grammar (honest interim, dies at W18), NOT a claim that the dashed circle IS the watercolor ghost
  (U22 "not a proper watercolor ghost"). The proper PRNG-silhouette ghost is `WatercolorDot variant="ghost"`,
  consumed at W18 — the interim does not impersonate it.
- **NO `file:` link / vendored copy across the spine.** The `WatercolorDot variant="ghost"`,
  `<Skeleton>`, and `<Button>` are consumed as PUBLISHED glass-ui dependencies (3.13.0 now, the BA cut at
  W18) — NEVER a `file:` link to glass-ui's WIP tree, NEVER a vendored copy in the demo (contract-v2;
  `cross-repo-dev-resolution.md §2.4`). The demo resolves glass-ui's `dist/` through the `exports` map.

---

## §Folds — the rows this wave discharges (each citing its audit lane + finding-id)

| Row | Finding / lane | Lane here | Discharge |
|---|---|---|---|
| **U24** — "shadow too extreme; hairline border wrong; palette → FIRST-CLASS in-repo component with variants (skeleton, glass)" (the headline W14 ask) | `LEDGER.md:62`; U-cards §1.B; D3 §1 | **A** (+ **B** for the shadow/hairline half) | the `material`/`skeleton` axis lands; `PaletteCardSkeleton.vue` deleted; the de-extreme shadow + glassy edge via lane B |
| **U17** — "shadow FIGHTING; cards = glass cards WITH cartoon shadows" | `LEDGER.md` U17; U-cards §0,§3; D6 laws 1–2 | **B** | one shadow voice; cartoon reserved to plates + ≤1 protagonist; the `GradientVisualizer.vue:122` fighter routed to glass-resting |
| **U19** — "components not rounded per the design language (two separate panes)" | `LEDGER.md` U19; U-cards §1.C,§4 | **B** | the raw `rounded-lg/xl/2xl` swept onto role tokens; the inner-vs-outer radius ladder reconciled |
| **U20a** — "skeletons too BLACK — should be glassy like glass-ui skeletons" (the skeleton half of U20; the SPECTRUM-glass slider half U20b = W13.A) | `LEDGER.md:50`; D3 §3 | **C** | glass-ui `<Skeleton variant="shimmer">` bones that carry color; the browse spinner → staggered skeleton cards |
| **U26** — "black hairline wrong (should be glassy); shadow too extreme again" (the `--border` token root retune = W12.B) | `LEDGER.md` U26; U-cards §3; D6 law 4 | **B** | `border-border` navy → `--card-edge` on content cards (the W12.B de-navy `--border` keeps structural chrome) |
| **U18** — "the dashed outline = a dashed/GHOST variant of the watercolor dot" | `LEDGER.md` U18; U-cards §1.D | **E** (interim) → **W18.A** (consume) | the dashed grammar harmonized + the phantom killed NOW; the proper `WatercolorDot variant="ghost"` consumed at the BA pin (SV-7 refines to verify-and-adopt) |
| **U22** — "not a proper watercolor ghost; UI needs refinement" | `LEDGER.md` U22; U-cards §1.D | **E** (interim) → **W18.A** (consume) | the interim does not impersonate the ghost; the proper ghost lands at W18 |
| **inv-N-7** — zero phantom classes (VIOLATED at HEAD: the bare `watercolor-swatch`, `MixSourceSelector.vue:148`) | `WAVES-2.md:317-323`; `N.md:199-200`; SV-6 | **E** | the bare phantom killed; inv-N-7 CLOSES at W14.E; `PROGRESS.md`'s stale "zero phantom classes ✓" W5-row amended (the WAVES-2 §4 amendment) |
| **LP3-7** — the `v-memo` list contract on the PaletteCard list | `WAVES-2.md:130`; L-PERF3 | **A** | the `v-memo` key lands WITH the first-class card (the perf contract rides the componentization) |
| **D3-9** — sticky `PaletteControlsBar` opaque → translucent+blur | D3 §8 row D3-9; `PaletteControlsBar.vue:2` | **D** | the sticky bar goes `bg-card/70 backdrop-blur` so scrolled glass cards don't die at an opaque edge |

**NOT folded here (explicitly routed elsewhere — zero drops, P-Inv 28):**
- **U20b** (the SPECTRUM-glass slider) → **N.W13.A** (the slider primitive consume) — the slider half of
  U20 is the U-CONTROLS lane's primitive, not a card surface (`WAVES-2.md:348`; D3 §3 cross-ref).
- **The `--border` dark de-navy retune** + the `--card-edge` MINT → **N.W12.B/D** (the keystone) — W14
  CONSUMES them, does not mint/retune (`D6.md:149-154`; `WAVES-2.md:90,92`).
- **The display-ramp / PaneHeader rung promotion** (the empty-state HEADLINE rung) → **N.W12.E** — W14
  consumes the W12.B/E rungs for the headline (D3 §7 "the W6.B rungs"; `WAVES-2.md:93`).
- **The save-data-loss P0** (the CTA's local-first save) → **N.W10.C** — W14's empty-state "Add color"
  CTA depends on it being fixed first (SV-9; §No-workaround).
- **D3-4** (the kC chromaWeight placebo) + **D3-5/6** (extract dominant hero + dup-shell collapse) →
  **N.W16.A/D** (the per-pane corpus) — extract functional/structural work, not a card-grammar lane
  (D3 §8 rows D3-4/5/6).

---

## §Hand-off — the BINDING cross-wave + cross-repo boundaries

### Cross-wave (within N)

| Boundary | Direction | Binding contract |
|---|---|---|
| **N.W12.D → N.W14 (B)** | W12 lands FIRST | W14.B CONSUMES the `--card-edge` mint + the Z0–Z4 rank table + the six laws (`D6.md:126-164`) — minted ONCE at W12.D, applied here. W14 does NOT mint them. The keystone precedes the body (DAG `WAVES-2.md:276-287`). |
| **N.W12.B → N.W14 (B)** | W12 lands FIRST | W14.B consumes the de-navy `--border` retune (`hsl(217.2 32.6% 18%)` → warm) for structural chrome; content cards get `--card-edge`. W14 does not re-tune `--border`. |
| **N.W12.E → N.W14 (D)** | W12 lands FIRST | W14.D's empty-state HEADLINE consumes the W12.E display-ramp rungs (`font-display`, ~`text-heading` 700; D3 §7). The headline rung is W12.E's; W14 applies it. |
| **N.W10.D → N.W14 (π)** | W10 lands FIRST | The cascade kill (SV-9) MUST close before W14's π element pairs are meaningful — until the desktop renders, in-viewport element shots are structurally blind (inv-N-11). W14's SOURCE gates (HG-A1/B1/B3/E1) are demo-independent; only the π pairs wait. |
| **N.W10.C → N.W14 (D)** | W10 lands FIRST | The empty-state "Add color → save" CTA depends on the local-first save fix (SV-9). W14.D wires the CTA; W10.C makes the underlying save honest. The CTA must not celebrate on the data-loss path. |
| **N.W13.A ∥ N.W14** | siblings, R3 | The U20 split: W14.C owns the skeleton half (U20a), W13.A owns the SPECTRUM-glass slider half (U20b). No file overlap (PaletteCard/skeleton vs ComponentSliders). |
| **N.W16 ∥ N.W14** | siblings, R3 | The extract functional/structural work (D3-4/5/6 → W16.A/D) is OUT of W14's card-grammar scope; W14 supplies the `material="cartoon"` protagonist shell, W16 fills the extract pane content. |

### Cross-repo (the acyclic spine — glass-ui one tranche ahead, PUBLISHED-consume)

| Boundary | Direction | Binding contract |
|---|---|---|
| **glass-ui 3.13.0 → N.W14 (A/C/D)** | glass-ui publishes; value.js demo consumes | `<Skeleton variant="shimmer">`, `<Button>`, `<WatercolorDot>` are consumed from the PUBLISHED glass-ui 3.13.0 dist (root barrel for Skeleton/Button — SV verified `Skeleton`/`Button` in `glass-ui.js`; WatercolorDot via the `@mkbabb/glass-ui/watercolor-dot` subpath — SV-7). NEVER a `file:` link or a vendored copy (contract-v2; `cross-repo-dev-resolution.md §2.4`). |
| **glass-ui BA cut (4.0.0) → N.W14.E → N.W18.A** | glass-ui publishes BA; value.js consumes one beat behind | The PROPER watercolor ghost (`WatercolorDot variant="ghost"`) is the FILED X-GU **C-2** ask, consumed at W18.A (`WAVES-2.md:223` "watercolor ghost (U18/U22 close; the W14.E interim DIES)"). **SV-7 REFINES the ask:** glass-ui 3.13.0 ALREADY emits a `[data-variant=ghost]` watercolor-swatch rule and ships `WatercolorDot` via the subpath — so the W18 consume is a VERIFY-and-ADOPT (does the shipped ghost render the PRNG-silhouette stroke U22 asks for?), not a wait-for-net-new. The W14.E interim (harmonized dashed grammar + phantom kill) lands NOW and DIES at the W18 consume. |
| **glass-ui Skeleton `surface="glass"` (W-SURFACE-AXIS) → N.W18.A** | BA-gated refinement | W14.C re-authors onto `<Skeleton variant="shimmer">` NOW; the `surface="glass"` refinement (the frosted skeleton surface) is the BA-pin refinement consumed at W18.A (`WAVES-2.md:223` "Skeleton `surface="glass"`"). W14.C's interim is `variant="shimmer"` with color-tinted bones; the surface upgrade lands at the pin. |
| **The ownership boundary** | demo / primitive | The demo owns PaletteCard (domain composition), the empty-state grammar, the dashed-well, the depth-grammar APPLICATION. glass-ui owns the PRIMITIVES (Skeleton, Button, WatercolorDot) + the `variant="ghost"` shape. value.js does NOT author primitives into glass-ui (`N.md §8` — asks, not value.js writes; inv-16). |

### The interim-death ledger (what dies at W18, named)

| W14 interim | Dies at | On consuming |
|---|---|---|
| The harmonized dashed grammar (W14.E) | W18.A | `WatercolorDot variant="ghost"` (verify-and-adopt per SV-7) |
| The `variant="shimmer"` skeleton color-tint (W14.C) | W18.A | Skeleton `surface="glass"` (W-SURFACE-AXIS) |

The W18 hard gate greps the named interims → 0 (`WAVES-2.md:230` "zero interim shims surviving").

---

## §Design-decisions — trade-offs RESOLVED

1. **First-class IN-REPO, not in glass-ui.** RESOLVED: PaletteCard is demo-owned (`LEDGER.md:62` "FIRST-CLASS
   **in-repo**"). It composes a domain `Palette` model — not a generic primitive — so glass-ui gets NO
   PaletteCard (KISS). glass-ui supplies the consumed primitives only. The variant axis lives on the
   demo component.

2. **Skeleton as a STATE, not a sibling file.** RESOLVED: the loading state is a `skeleton` prop on the
   SAME shell (same material/radii/geometry) — `PaletteCardSkeleton.vue` is DELETED. The 35-LoC sibling
   file (SV-1) drifts independently (its swatches/paddings already diverge); a state-of-the-shell makes
   drift structurally impossible (zero-drift by construction, D3 §1). The alternative (keep the file,
   re-author its bones) preserves the drift seam — rejected (no legacy beside its replacement).

3. **Three materials, not a binary glass/cartoon.** RESOLVED: `glass` (default, list rows + dialog),
   `cartoon` (the ≤1 protagonist per pane — extract/generate result), `flat` (dense admin/dialog rows,
   honest density register). The cartoon `8px 8px` offset is the user's "glass cards WITH cartoon shadows"
   (U17) — but ONLY on the protagonist; the U17 fighting was every list row going 0→10px. Three rungs
   map to the Z1/Z3/Z3'/flat tiers of D6's table (`D6.md:130-138`).

4. **The cartoon budget is a build-failure gate, not a guideline.** RESOLVED: D6 law 2 — a per-viewport
   DOM census exceeding `plates + ≤1 protagonist/pane` is a failure (HG-A2). The census is the measured
   property (P6), not a prose convention — the fighting recurs the instant cartoon spreads to list rows,
   so the budget is enforced by count.

5. **Skeleton bones carry COLOR.** RESOLVED: in a color app the skeleton previews color, not absence
   (D3 §3) — strip segments tinted `color-mix(in oklab, <cssColorOpaque> 10–16%, transparent)` stepped
   by index. The murky `--muted-foreground 10%` grayscale (SV-4) is the antithesis (u16's black void).
   The honest move is the live color in the skeleton's key.

6. **Empty states are invitations, not whispers.** RESOLVED: headline (display ramp) + pop (WatercolorDot
   ghost trio tinted from the live color) + a real `<Button>` CTA (D3 §7 + D7-3 merged). The gray italic
   mono whisper (SV-5) is demoted to the SUBLINE only (the house pairing: audacious display + mono
   annotation). Admin lists keep `tone="quiet"` (dense lists shouldn't shout) via the `tone` axis —
   panes pass `invite`. The degraded product still advertises color because color IS the product.

7. **The DockIconButton misuse is RETIRED, not relabeled.** RESOLVED: `BrowsePane.vue:37` presses a dock
   chrome primitive into body-button service (SV-5). The fix is a real glass-ui `<Button>` (already
   consumed via `PaletteSlugBar`) — the dock primitive is for the dock, the body CTA is a Button. Keeping
   the DockIconButton with a tweaked style is the anti-fix.

8. **The dashed ghost: interim NOW, consume at W18 (verify-and-adopt).** RESOLVED: W14.E harmonizes the
   three dashed idioms (SV-8) onto one grammar + kills the bare phantom (SV-6, inv-N-7 closes) — both
   demo-unilateral. The PROPER watercolor-shaped ghost is glass-ui-owned (`WatercolorDot variant="ghost"`,
   X-GU C-2). SV-7 found glass-ui 3.13.0 ALREADY ships a `data-variant=ghost` rule + the subpath
   component — so the W18 consume is a verify-and-adopt (does it render the PRNG silhouette U22 wants?),
   not a wait-for-net-new. The interim dies at the consume. The interim does NOT impersonate the ghost
   (U22 "not a proper watercolor ghost") — it is an honest dashed placeholder until the real shape lands.

9. **The library wave runs BEFORE its π is visible.** RESOLVED (the W10.D precondition): W14's SOURCE
   gates (file deletions, grep-absences, the material axis, the phantom kill) are demo-independent and
   provable by tree probe TODAY (HG-A1/B1/B3/E1). The π VISUAL pairs (rest/hover/skeleton/empty/dashed)
   sit behind W10.D's cascade kill — until the desktop renders, in-viewport element shots are
   structurally blind (inv-N-11; SV-9). So W14 runs in R3 beside everything, its source gates green
   immediately, its π captured once the desktop renders. The card correctness does not wait on W10; the
   visual confirmation does.
