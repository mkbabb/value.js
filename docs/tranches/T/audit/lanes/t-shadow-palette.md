# T fleet · t-shadow-palette — T-13a + T-19: the shadow palette

**Lane**: t-shadow-palette (design · Fable, frontend-design bar) · **Rows**: T-13a (t-2005-53), T-19 (t-2008-34)
**Substrate**: `tranche-t` = master @ `cc4f4fa` (S close) · **Method**: owner-shot re-read → git
archaeology → live probe (own vite on `:9377`, `VITE_API_URL=http://localhost:59999`; owner's `:9000`
untouched) → light + dark computed styles.

---

## §0 Shot re-derivation (mandate map verified)

- **t-2005-53** = the **Extract** view, left pane (`ExtractPane` → `ExtractWorkbench`): "Extract / Pull
  palettes from any image", dashed drop zone, k-slider (5), kC slider (0.5) — and a tall dead region
  below the controls where nothing renders. This is T-13: "What happened to the shadow palette herein?
  And this is too transparent too."
- **t-2008-34** = the **Mix** view → **Palettes tab** with zero saved palettes: the `EmptyState`
  specimen plate ("· NOTHING TO MIX · / No saved palettes yet. / Save two or more palettes, then pour
  them together here."). This is T-19: "This should display a shadow palette instead in all cases."
- Live probe reproduces both pixel-for-pixel at `#/extract` and `#/mix` → Palettes tab (0 saved).
  The mandate's best-effort map holds for both rows.

## §1 FORENSICS — what happened to the shadow palette

"Shadow palette" is not owner-coinage — it is the codebase's own historical name, and the artifact was
killed twice in one wave, ~21 hours before the owner's audit.

| # | Commit | Date | Event |
|---|---|---|---|
| 1 | `ec1b200` | 2026-03-20 | **Birth as a named artifact.** Commit message: "Extract the **shadow palette** placeholder into PaletteCardSkeleton component." Render: `<PaletteCardSkeleton v-else-if="!isProcessing" key="shadow">` (ExtractPane:58) — the undeveloped plate wears the ghost of the palette to come, **at rest, always**. |
| 2 | `65ba2c6` | R.W4 Lane E (T20 dup-shell collapse) | Survives into the ONE `ExtractWorkbench` — always-rendered in the empty state, under the "· undeveloped plate — feed it an image ·" caption (ExtractWorkbench@65ba2c6:162-168). |
| 3 | (pre-S Mix) | — | Mix palettes tab renders `<PaletteCardSkeleton v-if="savedPalettes.length === 0" :count="3" />` (MixSourceSelector@a34d20f^:217) — a shadow palette, though **accidentally eternal** (shimmering, `aria-label="Loading palette"` — a genuinely lying loading state). |
| 4 | `52acad4` | S.W5-1 Lane A, 2026-07-05 | The skeleton re-authored onto the ec1b200 muted-ink register with **three registers**: `shadow` / `specimen` / `developing`. The middle one is speced verbatim as "**the ghost OF a palette**, still clearly shadow" (PaletteCardSkeleton.vue:14-16) — a low-chroma 36°-step hue walk around `--accent-live`. |
| 5 | `e43601c` | S.W5-6 Lane B (extract), 2026-07-05 23:24:42 | **KILL #1** — design-extract F1/F2 ("loading ≠ empty"): "the at-rest PaletteCardSkeleton DELETED from the empty state; the skeleton now renders ONLY while isProcessing"; the second-invitation caption deleted with it. |
| 6 | `a34d20f` | S.W5-6 Lane B (mix), 2026-07-05 23:24:56 | **KILL #2** — design-extract-mix F3 ("the eternal-skeleton silent-handling violation"): the mix empty skeleton replaced with the `EmptyState` text plate ("· nothing to mix ·"). |
| 7 | 2026-07-06 ~20:05 | owner audit | Both absences caught within 3 minutes of each other (t-2005-53, t-2008-34). |

**Forensic verdict**: NOT an accident or merge regression — a deliberate, documented S.W5-6 doctrine
application (Q6 + "loading ≠ empty" + "no silent handling", S.W5.md:46,107), now **owner-overruled**.
The doctrine's error was conflating two axes: the **temporal** axis (is work happening?) with the
**material** axis (what does absence look like?). It read the at-rest ghost as a lying loading state
and cured it by amputation. The owner's mental model — and `ec1b200`'s original design — is that the
shadow palette is not a loading indicator at all: it is **the instrument showing the shape of what it
produces**. The tragic detail: S.W5-1 had already minted the exact register the cure needs
(`specimen`, "the ghost OF a palette") 14 minutes of commits earlier — it shipped with **zero
consumers** and has none today.

---

## §2 Findings

### F-1 · T-13a — Extract's undeveloped plate lost the shadow palette (owner overrule of S.W5-6 F1/F2)

- **Evidence**: t-2005-53 (tall hole below the controls); `ExtractWorkbench.vue:88-93` — skeleton
  gated `v-if="session.isProcessing.value"` only; the kill diff at `e43601c`; live probe `:9377`
  `#/extract` light + dark — `document.querySelector('[data-slot="palette-card-skeleton"]') === null`
  at rest, and the left card's result column is a visual void (~300px of card with no content below
  the kC row at 1440×900).
- **Root cause**: `e43601c` applied "loading ≠ empty" as "empty = **nothing**". Composition breaks
  twice: the card's lower half is a hole (the plate that used to develop there is gone), and the
  k-slider now manipulates an invisible future — turn k with no image loaded and *nothing on the
  surface responds*.
- **Owner**: demo.
- **Cure direction**: §3, per-surface (a).

### F-2 · T-19 — the Mix palettes-tab empty state replaced the shadow palette with a text plate (owner overrule of S.W5-6 F3)

- **Evidence**: t-2008-34 = live match (probe screenshot identical in composition);
  `MixSourceSelector.vue:216-225` (`EmptyState` + the S.W5-6 F3 comment); the kill at `a34d20f`; the
  pre-state at `a34d20f^:217` (`:count="3"`).
- **Root cause**: the pre-S state was genuinely defective — an eternal shimmer + `aria-label="Loading
  palette"` promised work that would never complete. `a34d20f` cured the lie by removing the material
  instead of correcting the semantics. The owner wants the material back, honest.
- **Owner**: demo.
- **Cure direction**: §3, per-surface (b).

### F-3 · The register that IS the shadow palette exists, unconsumed

- **Evidence**: `PaletteCardSkeleton.vue:79-83` — `variant?: "shadow" | "specimen" | "developing"`;
  the `specimen` recipe at `:95-107` (`@supports`-guarded oklch hue-walk mixed into `--skeleton-ink`).
  Consumers (grep, full tree): `variant="developing"` ×4 (`BrowsePane.vue:36,111`,
  `PaletteBrowseTab.vue:11,61`); default `shadow` ×1 (`ExtractWorkbench.vue:89`, processing-gated);
  **`variant="specimen"` ×0**.
- **Root cause**: intra-wave coordination miss — S.W5-1 (Lane A) built the vocabulary; S.W5-6 (Lane B)
  deleted the only two surfaces that would have worn it, in the same wave.
- **Owner**: demo.
- **Cure direction**: the restoration consumes (and completes) this register rather than minting a
  parallel one — §3.

### F-4 · The all-cases census: three palette-shaped empty surfaces, three different treatments

- **Evidence** (live + source):
  1. **Extract** undeveloped plate — nothing (F-1).
  2. **Mix → Palettes tab** — `EmptyState` text plate (F-2).
  3. **`PaletteCardGrid.vue:15-21`** empty prop → `EmptyState` text plate — worn by **four** hosts:
     `BrowsePane`, `PalettesPane` ("· EMPTY PLATE · / No saved palettes yet." — confirmed live in the
     Extract view's right pane), `PaletteSavedTab`, `PaletteBrowseTab`.
- The dashed-ghost vocabulary already speaks at **dot** scale — `EmptyState.vue:30-32` (three seeded
  `WatercolorDot variant="ghost"`), the mix add-slot ghost (`MixSourceSelector.vue:150-165`) — but
  never at **card** scale, the scale where the absent content actually lives.
- **Root cause**: no state-grammar rule binds "what shape does absence take"; each surface improvised.
- **Owner**: demo.
- **Cure direction**: the shadow-palette rule, §3 — one rule, all palette-shaped surfaces.

### F-5 · A11y semantics block naive restoration

- **Evidence**: `PaletteCardSkeleton.vue:27-28` — `role="status"` + `aria-label="Loading palette"`.
- **Root cause**: re-wiring the loading component into empty states as-is would re-commit the exact
  lie S.W5-6 F3 cured (AT would announce a load that isn't happening). The S kill was right about the
  semantics and wrong about the material; the restoration must split the **species**, not just the
  visuals.
- **Owner**: demo.
- **Cure direction**: separate empty-species semantics — ghost `aria-hidden`, the caption carries the
  text for AT; `role="status"` only where a status exists (§3).

### F-6 · T-13b — the Extract surface too transparent (evidence hand-off to the T-18/T-24 lane)

- **Evidence**: `ExtractPane.vue:4` — `Card tier="wash"`, the **lightest** glass rung ("wash —
  lightest (~0.30α): inline workspace chrome" — glass-ui `Card.vue:28`, a rung documented for chrome,
  not a protagonist pane). Live computed on the pane card: `background-color:
  oklab(0.804 0.005 0.012 / 0.356)`, `backdrop-filter: blur(1px) saturate(1.4)`, border
  `1px solid oklab(… / 0.09)`. Dark probe: the same 0.356α wash reads as a mud-brown smear over the
  (still-bright) field — card/field separation near zero in both schemes.
- **Root cause**: the S.W5-2 ONE-card-species grammar (`d8de145`) seated pane bodies on `wash`,
  calibrated before the S.W6 high-chroma aurora landed underneath it. A 0.356α, 1px-blur plate cannot
  hold a page-level surface over that field.
- **Owner**: joint — the tier *choice* is demo; the rung *sizing* is producer. This is the same defect
  family as T-3/T-11/T-18; the neutrals-consistency lane (T-24) owns the gestalt cure. This lane's
  contribution: the computed numbers above, and the constraint that whatever rung the pane lands on,
  the shadow palette's ink recipe (`--skeleton-ink`, `bg-card/75`) reads against it in both schemes.

---

## §3 THE RULING + the restoration design

### The shadow-palette rule (T-19, generalized)

> **Wherever a surface's absent content is a palette, the empty state displays a shadow palette — the
> ghost of the artifact to come, at the artifact's own scale — in ALL cases.** The text plate may
> caption the ghost; it never substitutes for it. Error states are exempt (error ≠ empty stands, Q6
> plain register untouched).

"All cases" binds per-surface: a palette-shaped surface **never** renders a naked text plate — not on
first visit, not after deletion-to-zero, not on any tab/filter permutation that empties it.

### The four-species state grammar (how "loading ≠ empty" survives the restoration)

The S doctrine's true content was never "empty must be textual" — it was "never promise work that
isn't happening." Re-cut the distinction along the **motion** axis and both the doctrine and the owner
are satisfied:

| State | Species | Material | Motion |
|---|---|---|---|
| true empty | **shadow palette** | dashed ghost, accent-tinted (`specimen` ink recipe) | **STILL** — motion promises work; empty promises nothing |
| known-imminent (local compute) | `shadow` register | flat unified ink | 6s breath |
| network wait | `developing` register | ink + accent seams | shimmer sweep |
| error | plain register | destructive glyph + Fira truth | none |

Stillness makes the empty species honest by construction (and PRM-safe for free). The lie the S wave
cured stays cured; the material it amputated returns.

### The species, materially

- **One new empty-species artifact carrying the historical name — `ShadowPalette`** — colocated with
  the palette-card family per E-1. It **consumes, not duplicates**: PaletteCard's bones (strip → meta
  row → swatch row, the same grammar so the ghost reads "a palette belongs here", never a foreign grey
  box — the S.W5-1 insight, kept) + the `specimen` ink recipe (F-3's orphan finally consumed, its
  accent hue-walk letting the ghost breathe the app's living color without impersonating content).
- **The dashed edge is the load-bearing distinction**: lift the established ghost vocabulary
  (WatercolorDot `variant="ghost"`, the drop zone's dashed border) from dot scale to card scale —
  dashed hairline card edge instead of the skeleton's solid `border-card-edge`. Skeleton = *the card
  developing* (solid, opaque, animated). Shadow palette = *the card imagined* (dashed, quiet, still).
  On the Extract surface the dashes rhyme with the drop zone above — the whole empty state becomes one
  dashed invitation family.
- **Semantics** (F-5): the ghost is `aria-hidden`; the seated caption (the existing
  eyebrow/display/hint vocabulary from `EmptyState`) carries the text for AT. No `role="status"`, no
  "Loading" label — nothing is loading.
- **Motion**: none at rest. Permitted response-motion only: an ink-in/dash-walk on hover of the paired
  CTA — motion as response, never as idle.

### Per surface

- **(a) Extract** (`ExtractWorkbench`): the empty state = drop zone + shadow palette, always at rest.
  `:count` rides the k-slider **live** — turn k with no image and the ghost re-segments: the k-slider
  becomes legible before any image exists, and the instrument shows its output shape (the strongest
  argument that this ghost is instrument-truth, not decoration). `isProcessing` swaps ghost →
  `developing` skeleton **in place** — same geometry, so developing is a material change, not a layout
  jump; the developed `PaletteCard` lands in the same seat. The column's hole (F-1) dies as a
  consequence, not as a goal.
- **(b) Mix → Palettes tab** (`MixSourceSelector`): **two** shadow palettes — the count IS the copy
  ("save two or more, then pour them together"); the "· nothing to mix ·" caption seats beneath them.
  The selection-ring affordance may ghost on hover to teach the interaction. In all cases: the tab
  never falls back to a naked text plate.
- **(c) `PaletteCardGrid`** (Browse / Palettes / SavedTab / BrowseTab): the empty branch renders
  shadow palettes **in the grid cells** (grid geometry preserved — absence occupies the same space
  presence would), caption seated in-grid, the existing CTA slot surviving on the caption. One change,
  four hosts cured.
- **Error branches everywhere: untouched.**

### Doctrine reconciliation (for the T corpus to encode)

- **Q6 RATIFIED-NARROWED survives** — the specimen-plate *annotation* class still lives only on true
  empty; the shadow palette is not an annotation, it is the plate itself.
- **"loading ≠ empty" survives** — re-cut along the motion axis (table above).
- **S.W5-6 F1/F2/F3 are OWNER-OVERRULED on material, upheld on semantics** — encode as an explicit
  overrule row (the T-10/W7-4 pattern), citing `e43601c` + `a34d20f` as the reverted deltas and F-5 as
  the part that must NOT revert.
- **E-2 producer note**: no glass-ui ask is required — the `Skeleton` + `WatercolorDot` ghost
  primitives suffice. IF the corpus wants the dashed card-ghost as a producer surface (a
  `Card surface="ghost"` sibling to `cartoon`/`veil`), that is a request-packet *candidate*, not a
  blocker.

## §4 Interactions with sibling lanes

- **T-13b / T-3 / T-11 / T-18 / T-24**: the wash-rung transparency evidence (F-6 computed styles)
  hands off to the neutrals-consistency lane; this lane constrains only that the shadow palette's ink
  must read on whatever rung the panes land on, light and dark.
- **E-1 colocation**: `ShadowPalette` colocates with the card family it ghosts.
- **W5-1 producer seams** (`--skeleton-shimmer-delay`/`-tint`, letter L9): untouched — they belong to
  the `developing` species only.
- **T-26/T-25 (accent variance)**: the specimen hue-walk reads `--accent-live`
  (`oklch(0.620 0.272 9.834)` at probe time) — the ghost inherits whatever the variance-bracket lanes
  decide, by construction.

## Appendix — probe rig

Own vite `:9377` (`VITE_API_URL=http://localhost:59999 npx vite --port 9377 --strictPort`), owner's
`:9000` untouched. Probes: `#/extract` + `#/mix`→Palettes, light + `html.dark`, 1440×900. Computed
styles via `getComputedStyle` (values inline in F-6); session screenshots (extract-light/dark,
mix-palettes-empty-light/dark) were session-local probe artifacts, not committed — the owner shots at
`audit/owner-screenshots/` remain the evidence of record.
