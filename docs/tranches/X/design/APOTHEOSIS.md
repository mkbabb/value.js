SERVED MODEL: claude-opus-5-5

# X-W10 design canon — the apotheosis (unit X.W10.c)

The fresh arbiter seat for `W10.md` §5 X.W10.c. It authored neither `draft-fable.md` (`.a`,
`d7f568252`) nor `draft-opus.md` (`.b`, `4636f8101`). The spec's Fable seat is served by Opus 5.5
(COHESION §0bc). The open rulings it consumes are landed beside the spec in
`docs/tranches/X/waves/W10-ADDENDUM-2026-10-17-open.md` (`1f4fdf996`, act 0).

**Duty (L-14).** Try to refute both drafts against the tree, rather than average them. A claim
survives into `demo/DESIGN.md` only if it reproduces at the bytes. Each refutation below gives the
claim, the command and the output, and says what the canon does instead.

**Tree.** value.js `tranche-u` at `1f4fdf996` plus its working tree. glass-ui is read as shipped,
`node_modules/@mkbabb/glass-ui` **10.1.0**, and as prose at `../glass-ui/DESIGN.md` (HEAD
`d3326e846`; both drafts read `6bd161a2c`; every producer cite is by section name, so the move
does not stale them).

---

## 1. Refutations of the Fable-seat draft (`draft-fable.md`)

### RF-A1 — the condensed padding ratio (load-bearing: it is the ratio G-5 measures)

**Claim (§3.2):** the condense's block-start padding flips `--card-pad` → `--card-gap`, i.e.
`--space-body` → `--space-atom`, "so the padding ratio is **½ or ⅔** depending on which pair is in
force".

**Bytes:** the pane header pins both tokens at every width, so the `--space-*` pairs never reach it.

- ⟨`grep -n "\[--card-pad:1rem\]" demo/shared/ui/PaneHeader.vue`⟩ → `23: class="pane-header px-4 sm:px-6 pb-(--pane-header-gap) [--card-pad:1rem] sticky top-0 z-header"`
- ⟨`grep -n "^    --card-gap: 0.5rem;" demo/shared/ui/PaneHeader.vue`⟩ → `196:    --card-gap: 0.5rem;` (X-DS pass 7, VC7-03: "holds the desktop rung (0.5rem) at every width")
- ⟨`tr '}' '\n' < node_modules/@mkbabb/glass-ui/dist/components/card/scroll.css | grep 'data-condensed="true"\]{padding'`⟩ → `.card-header--shrink[data-condensed="true"]{padding-block-start: var(--card-gap);`

The pane header's flip is **1rem → 0.5rem = ½ at every width**, not "½ or ⅔". Neither value is a
φ rung, so the draft's conclusion holds and its premise does not. **The canon** states one ratio
(÷ φ, one rung of the spacing ladder, on both spacing channels) and names the pinned tokens as the
place where `.d`'s cure lands. The pinned `--card-gap` serves two roles: the title-to-caption gap
and the condensed padding. The canon separates them.

### RF-A2 — "deleting the global guard would expose 17 keyframes" (load-bearing: it sequences `.d`)

**Claim (§5.4):** the global reduce guard "can be retired once R-1's migration has covered every
demo-owned keyframe. Deleting it before then would expose the 17 keyframes outside a
`no-preference` block."

**Bytes:** glass already ships the same guard on `*`, inside `@layer components`. For
`!important` declarations, a layered rule outranks an unlayered one. The demo's unlayered block
therefore already loses to glass's block, and deleting it exposes nothing.

- ⟨`head -c 220 node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`⟩ → `@layer components{@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration: 0.01ms !important;animation-iteration-count: 1 !important;transition-duration: 0s !important;}}`
- The demo's own carve-out comment states the same cascade fact (`demo/styles/animations.css`, "Reduced-motion overlay opacity carve-out": "glass's own PRM guard … now beats any unlayered consumer `!important`").
- The one declaration the demo's block adds, `scroll-behavior: auto`, has no target. ⟨`git grep -n "scroll-behavior" -- demo ':!demo/DESIGN.md'`⟩ → only the guard itself (plus an `overscroll-behavior`). glass's only `scroll-behavior: smooth` already sits inside `@media (prefers-reduced-motion: no-preference)` (`dist/styles/scroll-choreography.css`). CSS `scroll-behavior` also does not govern `scrollIntoView({ behavior: "smooth" })`, and that call has 2 sites (`PaletteInspector.vue`, `ComponentSliders.vue`).

**The canon** rules that the carve (`W10.md` §3 item 5) is lawful now, with no prerequisite. It
also books the two JS smooth-scroll sites as a reduced-motion defect that the guard never reached
(residual RS-2).

### RF-A3 — the condensed title ratio is 1/√φ (minor)

**Claim (§3.2):** the title "drops from `--type-body × 2.058` to `--type-body × 1.618`, a ratio of
1/√φ".

**Bytes:** the pane title's rest size is not the producer rung.
⟨`grep -n "pane-title-size:" demo/shared/ui/PaneHeader.vue`⟩ →
`--pane-title-size: max(var(--type-title), var(--type-display-1));` (X-DS pass 9, V9C-02). The
condensed rung is `--type-heading`. The ratio is 1/√φ only where display-1 floors at the title
rung. That holds on phones; at desktop widths display-1 rises above it and the step is larger.
**The canon** states the title step as "rest rung → `--type-heading`". It does not state a fixed
ratio.

### RF-A4 — Golden Glass enters the material table (OP-3 guard)

**Claim (§2.4):** rung 3 CHROME is listed with "Golden Glass (§1.2, MARK) is this rung".

This enacts a MARK through a normative table, which is the failure that G-1's falsifier names
(GOLDEN GLASS "stated as enacted law rather than a mark"). **The canon** keeps the chrome rung's
law free of the term. The MARK names the rung it would bind, and it binds only if the owner
ratifies it.

---

## 2. Refutations of the Opus-seat draft (`draft-opus.md`)

### RF-B1 — the warm veil's light/dark arms are swapped (load-bearing: GOLDEN GLASS lineage)

**Claim (§1.3, lineage 1):** `--glass-plate-floating` mixes "a veil ink of `oklch(0.17 0.03 70)`
light / `oklch(0.28 0.035 70)` dark".

**Bytes:** the arms are the other way round.

- ⟨`tr ';' '\n' < node_modules/@mkbabb/glass-ui/dist/styles/tokens/glass.css | grep -n "glass-veil-ink\|glass-veil-base"`⟩ → `1::root{--glass-veil-ink: oklch(0.28 0.035 70)` · `2:--glass-veil-base: 0.14`
- ⟨`tr ';' '\n' < node_modules/@mkbabb/glass-ui/dist/styles/tokens/dark-arm.css | grep -n "glass-veil-ink\|glass-veil-base"`⟩ → `71:--glass-veil-ink: oklch(0.17 0.03 70)` · `72:--glass-veil-base: 0.18`

Light is `oklch(0.28 0.035 70)` at base 0.14, so the floating veil is 0.14 + 0.04 = 0.18. Dark is
`oklch(0.17 0.03 70)` at base 0.18. Fable's §1.2 has the arms right. **The canon** carries the
measured pair. The definition is a MARK, but the lineage it rests on must be true. A swapped arm
would mean the owner is asked to ratify a dark-mode ink as the light-mode material.

### RF-B2 — "one shadow voice holds per element, not per scene" (load-bearing: it would mint a producer letter)

**Claim (§2.2, and "Claims … refuted" item 3):** the producer's cartoon and modal rungs cast
down-left while the demo's stamp casts down-right, so the scene has two lights. The draft leaves
open whether a live surface paints one.

**Bytes:** no rendered surface paints either down-left rung at HEAD.

- ⟨`git grep -c "shadow-modal\|shadow-cartoon-md\|shadow-cartoon-sm\|shadow-cartoon-lg\|cartoon-cast" -- demo ':!demo/DESIGN.md'`⟩ → `demo/palettes/inspector/PaletteInspector.vue:2` (a comment recording the V1-02 strike) · `demo/test/palettes/palette-card-layout.test.ts:2` (asserting absence)
- ⟨`grep -rl "shadow-modal" node_modules/@mkbabb/glass-ui/dist | grep -v tokens`⟩ → `dist/styles/utilities/components.css` only, which is the `@utility shadow-modal` declaration and has no component consumer. No `dist/components/**` file names it.

The scene has one light today. The two-light case is latent: it is a published utility that
nothing consumes. **The canon** states the one-light law, so that the latent case is a defect on
arrival. It sends no producer letter, because no measured surface would carry one.

### RF-B3 — the hover step is "a lift of at most 2px, or a firmer edge" (partial)

**Claim (§1.1 table):** the hover rung MUST show "a lift of at most 2px, or a firmer edge, or
both".

**Bytes:** that is true of the palette card (⟨`grep -n "hover: hover" demo/palettes/inspector/PaletteInspector.vue`⟩ → `575:@media (hover: hover) {`). It is too narrow for the house as a whole.

- Icon-sized controls answer hover by the producer scale: ⟨`grep -rhoE "\-\-scale-hover:[^;]*" node_modules/@mkbabb/glass-ui/dist/styles | sort -u`⟩ → `--scale-hover: 1.08`.
- Two demo sites hover by a literal `hover:scale-110`: `demo/shell/dock/ColorInput.vue` and `demo/workbenches/mix/MixSourceSelector.vue`.
- Read literally, the draft's clause outlaws the producer's icon register.

**The canon** splits the rung by size. A plate, card, row or field answers hover by tint, firmer
edge, or a lift of at most 2px, and never by scale. An icon-sized control answers by the
producer's `--scale-hover`, never by a literal scale (residual RS-3: the two literal sites).

### Claims of `.b` that survived refutation (carried)

Each reproduced at the bytes:

- **The WELL is translucent.** `foundation.css:392` is `color-mix(in oklab, var(--foreground) 8%, transparent)`. Both drafts agree.
- **The dark shadow ink is pinned darker.** `foundation.css:633` is `color(srgb 0.11 0.098 0.09)`.
- **The global guard duplicates glass's layered guard.** This is the premise of RF-A2.
- **The φ ladder and the producer atom ladder are both legal interval sources.**
- **The blob's `chromaCeiling: 0.16` comes with no stated reason.** `useAtmosphere.ts` carries none.
- **Six `tier="resting"` plate sites.**

### RF-AB — refuted in BOTH drafts: "the blob ramp is capped at an absolute `chromaCeiling: 0.16`" (load-bearing: the OM-6 mechanism)

**Claim** (Fable §4, "The measured gap behind OM-6", and Opus §4.2): the hero blob's ramp is derived
with an absolute `chromaCeiling: 0.16` (`useAtmosphere.ts`). That is offered as the reason the
blob is "not nearly vibrant enough".

**Bytes:** the blob the person sees derives its own ramp, and that ramp floors the ceiling at the
seed's own chroma.

- ⟨`git grep -n "chromaCeiling" -- demo`⟩ → `demo/app/composables/boot/useAtmosphere.ts:430: chromaCeiling: 0.16,` · `demo/picker/visual/HeroBlob.vue:119: chromaCeiling: Math.max(0.16, seed.C),`
- ⟨`git grep -ln "appBlobConfig\|blobConfig" -- demo ':!demo/DESIGN.md'`⟩ → only `useAtmosphere.ts` and `HeroBlob.vue`. `HeroBlob.vue` copies the app ramp once, as its first-frame seed (`shallowRef([...appBlobConfig.color.paletteStops])`). It replaces that copy on every reseed (`reseedHeroStops`), so the ramp the person sees is HeroBlob's.

So the user's own colour is not capped below its chroma on the visible blob. The absolute 0.16
binds only the app-level ramp, which is a first-frame seed. The OM-6 limb that survives at the
bytes is the sRGB serialisation (`oklchStopToHex` on both paths), plus the lightness floor that
`floorStops` applies against the plate. **The canon** states C-1/C-2 as law (A-12). RS-5 is
re-aimed: the absolute ceiling on the app-level seed is a stated-reason defect, and the visible
vibrancy question is the hex clamp, a producer type question.

---

## 3. The arbiter's rulings: what the canon states, and why

The two drafts converge on most of the law. Neither shared a skeleton: Fable's numbered law ids
(M-1…, P-1…) against Opus's titled clauses; Fable's `§R` receipts appendix against Opus's
"Receipts" table; mtimes `20:31` and `20:43`. Where they converged, the convergence was re-read
at the bytes. Where they differed, the bytes decided, and the result is ruled below.

| #    | Question                                     | Ruling                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ground                                                            |
| ---- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| A-1  | Section order                                | three laws → material/elevation → proportion/derivation → chroma fidelity → motion → product surfaces → anti-patterns, after one _Authority_ preamble                                                                                                                                                                                                                                                                                                                               | `W10.md` §5 X.W10.c; G-9 requires the canon's _Authority_ section |
| A-2  | **BREATH OF LIFE**                           | Law §1. It carries the owner's sentence verbatim, the five-rung ladder, and the PRM clause (state stays, travel goes). The hover floor is a **MARK (OP-4)**.                                                                                                                                                                                                                                                                                                                        | both drafts; brief §1.2                                           |
| A-3  | Hover by size                                | Plates, cards, rows and fields answer hover by tint, firmer edge, or a lift of at most 2px, never by scale. Icon-sized controls answer by the producer's `--scale-hover`, never by a literal scale.                                                                                                                                                                                                                                                                                 | RF-B3                                                             |
| A-4  | **MOVEMENT OF MOMENTUM**                     | It is the producer's _Liquid Weight is Universal_ law (glass `DESIGN.md` §L4 — Motion Tiers; the spec's `:113` reads that law at `d3326e846`). The rename is stated. The driver/observer carve is a **MARK (OP-2)**. The curve is one parameter, `observer-curve` ∈ {`calm`, `weighted`}. Its default is the shipped `vj-morph` pairing, which is an inherited fact, not a pick.                                                                                                    | both drafts; Fable's parameter name adopted                       |
| A-5  | **GOLDEN GLASS**                             | A **MARK (OP-3)**, not law. The measured lineage is carried with the light/dark arms correct (RF-B1). There are four negative constraints: not grey, not metallic, not bright or shiny (raw gold never carries ink; `--ink-gold` is the certified form), and no glow. It is not written into any normative table (RF-A4).                                                                                                                                                           | both drafts; RF-A4, RF-B1                                         |
| A-6  | Elevation semantics                          | **The elevation / one-silhouette law, for `.e`:** a cast shadow claims "above". There are two registers, **in-chrome** (no cast; a hairline or tone step) and **free-floating** (the glass tier's one quiet shadow), plus the plate stamp as identity. A multi-layer cast MUST be inset copies of one outer silhouette. One light, falling down-right.                                                                                                                              | both drafts; RF-B2                                                |
| A-7  | The WELL's word                              | "opaque tone-step" → **unblurred translucent tint of its plate**                                                                                                                                                                                                                                                                                                                                                                                                                    | both drafts; `foundation.css` `--well-bg`                         |
| A-8  | Interval sources                             | The φ ladder (`--phi-0..4`) and the producer's `--space-*` ladder are both legal. Every interval cites which one it reads. A rung, or the sum of two rungs, is lawful. Flex slack is a defect.                                                                                                                                                                                                                                                                                      | Opus §3.1 + Fable P-1                                             |
| A-9  | **The condense spacing ratio, for `.d`**     | At the condensed state, the block-start padding and the title→content gap each step **one φ rung down, a ratio of 1/φ ≈ 0.618** (padding `1rem` = `--phi-2` → `--phi-1` = 0.618rem; gap `--pane-header-gap` = `--phi-3` → `--phi-2`). The caption's box leaves layout, so it contributes 0 to the block size. The title steps from its rest rung to `--type-heading`.                                                                                                               | RF-A1; RF-A3                                                      |
| A-10 | PRM carve                                    | Delete both blunt blocks (`W10.md` §3 item 5), now with no prerequisite (RF-A2). Under reduce, an overlay's state change reads instantly, and the state still shows. A 150ms opacity fade under reduce is lawful (Law R-2), but its home is the producer guard, as a glass row, not a consumer counter-override.                                                                                                                                                                    | RF-A2; L-8                                                        |
| A-11 | Position-mapped scrubs                       | A scroll-mapped opacity or mask needs no PRM gate. A scroll-mapped transform does.                                                                                                                                                                                                                                                                                                                                                                                                  | both drafts; `PaneHeader.vue` "THE SWELL"                         |
| A-12 | Chroma                                       | The user's own colour (the blob body stop, spectrum plates, swatches) is reduced only at the gamut edge, by the library's gamut map. A derived stop MAY carry a ceiling only if it is relative to the cusp at its hue and its reason is written at the call.                                                                                                                                                                                                                        | Fable C-1/C-2 + Opus §4.2                                         |
| A-13 | **S-4 · `UserSortMenu.vue` register**        | **`quiet` wins.** It is a member of glass's shipped `ButtonEmphasis` (`"primary" \| "secondary" \| "quiet" \| "text"`, `dist/components/button/Button.vue.d.ts`); "ghost" is not, so the alternative has no producer spelling. The house register for icon-only triggers is `emphasis="quiet"` (25 sites).                                                                                                                                                                          | COHESION §0k.3 S-4; re-stamp in §4                                |
| A-14 | The stale `btn-interactive` canon (W8-CLOSE) | The atom left glass at `490cc46e`. The demo deleted its dead classes (X.W8.d, W5-BTN-INTERACTIVE-DEAD), and the press question rides glass row O-52 R-2. The canon stops naming the atom as an inherited law. The interactive-scale row now reads "no producer press atom; seat geometry only, pending O-52 R-2".                                                                                                                                                                   | W8-CLOSE "Residual owners"; `ColorInput.vue` comments             |
| A-15 | Gold in chrome ink                           | Chrome that paints gold as **ink** MUST paint `--ink-gold`. Raw `--color-gold` is a non-text accent only. This rules the X-DS O18-1296 question. The cure sites (`DockViewSelect.vue`, `Dock.vue`, `ProfileSection.vue`) sit in no W10 unit's set (residual RS-4).                                                                                                                                                                                                                  | X-DS pass 15 (V15-01); Golden Glass constraint 3                  |
| A-16 | Per-verb seat                                | **S-2 (a)**: the dock set is the action surface. Route-local verbs retire into it.                                                                                                                                                                                                                                                                                                                                                                                                  | COHESION §0k.3 S-2                                                |
| A-17 | The current canon's surviving law            | Carried whole, re-anchored to live paths. That covers the three-voice law, card-lock, material ladder, Z-rank and the six depth laws, C3 and its ledger, the accent axis, gamut pairs, the alpha checker, the dark ladder, the dock-atop band, layout tokens, the aspect law, container queries, the ConsoleRail touch-floor exception, the pane-swap mode note, the bespoke literals, and the anti-pattern roster. Every X-DS pass 11/14/15/16 clause is kept verbatim in meaning. | X-DS concurrency lock                                             |
| A-18 | Dropped as stale (measured)                  | glass Family B `--motion-duration-*` (0 hits in glass 10.1.0) · `--duration-sparkle` (0) · `swatch-pop 0.65s` (now `--duration-fast`) · `PaletteControlsBar` / `PaletteDialogHeader` (no file) · `z-bar` (0 demo consumers) · every `demo/@/…` and `style.css` cite (no such path) · the `PaletteCard.vue` rows (deleted)                                                                                                                                                           | `git ls-files`, `grep -rl`                                        |

---

## 4. S-4 re-stamp of X-W8 G-9's baseline (COHESION §0k.3 S-4: "whichever … lands second")

X-W8 landed first. Its G-9 read GREEN-BEFORE-CURE: there was no dead attribute to delete, and the
null-DELTA pair was moot. X-W10 lands second, with `quiet` ruled (A-13). The re-stamped baseline,
read at the settled bytes:

- ⟨`grep -cE 'variant=' demo/palettes/admin/panels/PaginationBar.vue demo/palettes/admin/UserSortMenu.vue`⟩ → `PaginationBar.vue:0` · `UserSortMenu.vue:0`
- ⟨`grep -cE 'surface=|variant=' demo/palettes/admin/panels/AdminListSkeleton.vue`⟩ → `0`
- ⟨`grep -n 'emphasis=' demo/palettes/admin/UserSortMenu.vue`⟩ → `8:                emphasis="quiet"`

G-9's baseline is unchanged: `variant=` 0 · 0 · 0, and the ruled register `emphasis="quiet"` is
present at `UserSortMenu.vue:8`. `quiet` is the shipped register, so no paint changes and no
DELTA pair is owed. A green G-9 is not cited as the cure of D-5's design limb (S-4); that limb is
this ruling.

## 5. Residuals the canon names, with owners (none is cured by this unit)

| id   | Residual                                                                                                                                       | Sites                                                                                                                               | Owner                                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| RS-1 | the condense register (A-9): padding and gap one φ rung down, the caption's box out of layout                                                  | `demo/shared/ui/PaneHeader.vue`, `demo/picker/header.css`                                                                           | X.W10.d (G-5)                                                      |
| RS-2 | `scrollIntoView({ behavior: "smooth" })` ignores reduced motion                                                                                | `demo/palettes/inspector/PaletteInspector.vue`, `demo/picker/controls/ComponentSliders/ComponentSliders.vue`                        | no W10 unit holds these files; carried to the orchestrator by id   |
| RS-3 | literal `hover:scale-110` instead of `--scale-hover`                                                                                           | `demo/shell/dock/ColorInput.vue`, `demo/workbenches/mix/MixSourceSelector.vue`                                                      | as RS-2                                                            |
| RS-4 | raw `--color-gold` as chrome ink (O18-1296)                                                                                                    | `demo/shell/dock/DockViewSelect.vue`, `demo/shell/dock/Dock.vue`, `demo/shell/dock/menus/ProfileSection.vue`                        | as RS-2 (`DockViewSelect.vue` is `.f`'s for the Ad-18 marker only) |
| RS-5 | the app-level seed ramp's absolute `chromaCeiling: 0.16`, with no reason stated; and the sRGB hex clamp on both blob ramps (A-12, OM-6, RF-AB) | `demo/app/composables/boot/useAtmosphere.ts`, `demo/picker/visual/HeroBlob.vue` (the clamp: glass's stop type, a producer question) | as RS-2                                                            |
| RS-6 | an opacity fade under reduce, homed in the producer guard (A-10)                                                                               | glass `dist/styles/utilities/a11y-overrides.css`                                                                                    | glass relay (a producer row; a letter, not a demo edit)            |
| RS-7 | the pixel witness for one silhouette (A-6), re-pointed at the successor surface                                                                | `demo/palettes/inspector/PaletteInspector.vue` / `demo/shared/ui/PaletteSpecimen.vue`                                               | X.W10.e (G-6)                                                      |

## 6. Frames (OP-1 substitute, §0k.2)

The frames are `docs/tranches/X/W10/frames/canon-frames.html`, rendered at 390 and 1280 by one
guarded Playwright pass (`render.mjs` in the same folder). Each plate is keyed to a design-gate
row: G-1 (the three laws), G-6 (elevation registers, one silhouette, one light) and G-5 (the
condense ratio A-9). The frames are a specimen of the canon's law. They are not a screenshot of
the app, which belongs to the `.d` and `.e` witnesses.

Rendered in one guarded pass (`~/.claude/guard/guarded --timeout 10 -- node docs/tranches/X/W10/frames/render.mjs`,
exit 0, one headless-shell browser, four contexts each closed in `finally`). sha256 (first 16 hex):

| frame | sha256 |
|---|---|
| `canon-frames-390-light.png` | `672ca04c7f2a9f7e` |
| `canon-frames-1280-light.png` | `3196081b3db78378` |
| `canon-frames-390-dark.png` | `8244bf45c2a26c34` |
| `canon-frames-1280-dark.png` | `34f472eda7c07da2` |

The renderer's `emptySheets=4` line is a `file://` artefact: reading `cssRules` on a `file:`
stylesheet throws, and the probe counts the throw. The frames show the glass tokens applied (the
cream `--card` plate and the dark arm), so the count is not evidence of a load failure.
