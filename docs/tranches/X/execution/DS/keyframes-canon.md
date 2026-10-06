# keyframes canon: the original styles, recovered (X-DS archaeology)

Wave: `waves/X-DS.md` (COHESION §0ej). App: keyframes.js, `demo/**`. Repo HEAD read: `master` @ `b857284e` (glass-ui 10.1.0).
The owner names the original UI "flatly lit and proper design". This note says what that UI was, maps it onto today's glass tokens, and lists the lighting added since.

**Method.** Nothing was checked out into the working tree. Source was read with `git show` / `git log`. Three historical **gh-pages deploy commits** (built output, already in the repo's history) were extracted with `git archive` into the session scratchpad and served statically. Every capture used real Chrome, new-headless (§0ei: `channel: "chrome"`, `headless: true`).
- Reference frames: `evidence/DS/keyframes/reference/`.
- BEFORE frames: `evidence/DS/keyframes/pass-00/` (every route × light/dark × 1440/390, plus `census.json`).

**About `kf-sacred-snapshot-2026-09-17`.** That branch is the owner's hand record of 2026-09-17: `6d280ee7` holds 252 tracked modifications and `24a323a9` holds four orphaned src drafts. It sits on glass-era code (`8281638c`, glass 6), so it records the owner's hand on the current layout. It is **not** the pre-glass look. The pre-glass styles are on the same branch's ancestry, and the dates are below.

## The reference points

| ref | source commit | gh-pages build | what it is | frames |
|---|---|---|---|---|
| **ORIGIN-24** | `1acf25c6` (2024-07-19, branch `grouping`); styling overhaul `6ab701ae` (2024-07-11); the Card set at `44fdc036` / `275ca38a` (2024-06-30 / 07-06) | `b61a9410` (deploy of `84028c71`, 2024-07-02) | The original demo: shadcn (radix-vue), SCSS, one cube page | `reference/ref-2024-07-b61a9410-{1440,390}-{light,dark}.png` |
| **ORIGIN-26** | `99508ea0` (2026-02-26, the 1.0.x modernization: TW4 + reka-ui, **same visual language**) | `577a406b` | The best-preserved flat original. It has the controls card. | `reference/ref-2026-02-577a406b-*.png`, **`ref-2026-02-577a406b-1440-light-controls.png`** (the canonical frame) |
| PRE-GLASS-LAST | `17adae29` (2026-03-25, parent of glass's arrival at `6961b8f5`) | `689c96b7` (deploy of `bb367b52`, 2026-03-20) | Last build before glass-ui. The editor shell has arrived and Instrument Serif has replaced Fraunces (`f967f594`, 03-08). The card shadow is tokenised to a softer 4px hard offset (`83722dd4`, 03-16). | `reference/ref-2026-03-689c96b7-*.png` |

**ORIGIN-24 and ORIGIN-26 set the canon.** They are the same design: 1.0.0 (`79a81bc2`) carried the 2024 Card, cube and tokens over unchanged. PRE-GLASS-LAST is the start of the drift, shown for proportion only.

## Recovered canon → today's glass tokens

| axis | ORIGIN (cited) | maps to today's token / disposition |
|---|---|---|
| **page** | `--background: 0 0% 100%` / dark `222.2 84% 4.9%` (shadcn slate). A flat page with a 1rem **checker/grid** backdrop (`.grid-background`, cube `App.vue`) and three **dashed axis lines** (`.axis-line { border: 1px dashed var(--color); opacity: .75 }`, x red / y green / z blue). | `--background` (glass's warm paper is today's identity; keep it). Keep the graph grid and the dashed axes as the stage ground: they are content, flat by construction. |
| **card / panel** | `Card.vue` (`1acf25c6`…`9309723f`): `rounded-lg` (later `-xl`) **`border-4 border-gray-700`** `bg-card`, plus **one hard offset `shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]`**: zero blur, one layer, no inset. `83722dd4` (03-16) tokenised this to `--shadow-card: 4px 4px 0 0 hsl(var(--shadow)/.5)` (dark `.85`) with `border-2 border-border`. | **The flat-lit stamp: one hard, zero-blur, neutral offset under a solid ink border.** Today: glass Card `tier="quiet"` + `.cartoon-surface` wears **`--shadow-cartoon-md/-lg` = three stacked offsets** (`-3/-5/-7px`, `-4/-7/-11px`), plus the glass control edge's inset catch-light. Disposition: the stack is the excess. The canon is **one** layer (`--shadow-cartoon` = `-3px 3px 0 0 var(--cartoon-ink-lead)` is the single-layer glass token that already exists), and the **border carries the separation**. The stack is glass-owned (`tokens/shadow.css`), so it goes to **O-87**. The demo's own `design-idioms.css:180` `.cartoon-surface:has(:focus-visible) { box-shadow: var(--shadow-cartoon-lg) }` is ours and should rung down to the single layer. |
| **border** | Card: 4px `gray-700` ink (ORIGIN), then 2px `--border` (`83722dd4`). Inputs and selects: shadcn `border border-input` 1px, square-ish `rounded-md`. Everything else: `* { @apply border-border }` 1px hairline. | Card: the ink border is the identity stroke. Map it to `--border` at glass's card width (2px), or `--cartoon-ink` where an ink stroke is wanted. Controls: the 1px `--border` hairline, **no inset edge stack** (glass `glass-control-edge` = 3–4 inset layers on every input/button: O-87). |
| **radius** | `--radius: 0.5rem`; card `lg` 8px (later `xl` 12px); inputs and buttons `rounded-md` 6px; the play CTA `rounded-lg`. | `--radius-card` (glass: `--radius-2xl` = 16px) is rounder than the original. Read the ladder at ORIGIN's proportion: card about 12px, field about 6–8px. Glass's `--radius-control: var(--radius-pill)` turns fields into **pills**. The original fields were rectangles (see the `-controls` frame). Proportion note for glass (O-87 rider), not a local override. |
| **shadow at rest** | **None at rest** (computed census of ORIGIN-26 and ORIGIN-24, home, 4 pages each: `shadowEls 0`, `insetHighlights 0`, `backdropBlur 0`). With the controls open, the only shadows are the Card's one hard offset, the shadcn `shadow-sm` on outline buttons (1px/3px neutral) and `shadow-md` on the progress ball. | At most one quiet neutral layer, only on a truly floating surface (menu, popover, the dock). Cards take the single hard stamp (above) or the border alone. **No glow on balls**: the original ball had a neutral `shadow-md`; today's `--ball-glow` is a 35% tinted `0 2px 10px` glow. |
| **inset highlight** | none anywhere | none. Today: 708 inset-highlight layers on chrome over the 28 pass-00 pages. Glass-owned (control edge, liquid fill, segmented track): O-87. Demo-owned: `SquareScene.css:126/161/185/233/262` (`inset 0 1px 0 white 22–30%`) and `CubeTarget.css:177` (`.face-lacquer`). |
| **blur** | none (no backdrop-filter, no filter blur) | Glass material blur is glass's register (O-87). The demo adds no blur. |
| **fills** | flat shadcn tokens (`bg-primary`, `bg-secondary`, `bg-card`, `bg-background`). Controls are flat. The **one gradient on a control is the rainbow play CTA** (`.rainbow`, `AnimationControlsGroup.vue:100`, `w-12 h-8 rounded-lg`), which is identity. | Flat `--muted` / `--secondary` / `--card`. Keep the rainbow play button (identity, §0dm). Today's 164 control gradients over 28 pages are all **glass's** `control-surface` two-layer `linear-gradient(tint), linear-gradient(face)` fills (O-87). The census counts the rainbow CTA (`.rainbow-vivid` / `.rainbow-pastel`) apart, as identity. |
| **cube (3D subject)** | `cube/App.vue` (`1acf25c6`): six **flat faces**, each `backgroundColor: side.color` (the crayons, `rgba(255,0,0,.8)`…`rgba(0,255,255,.8)`), `rounded-lg`, a numeral in display type (`fraunces text-5xl font-bold`), and an optional `.rainbow-wrapper` overlay (animated 124° rainbow, opacity .75) as the face's *content*. **No lighting model, no specular, no inset bevel, no veil.** | Revive: **flat crayon faces with at most a small fixed tonal step per face** (X-DS canon). Remove `.face-lacquer` (145° white→black gloss gradient + 2 inset highlights, `CubeTarget.css:166-178`, born `4686aa46` 2026-06-17), `.face-relit` (radial specular `rgba(255,255,255, .05+.5·lit)` + `--background` veil, `CubeTarget.css:201-212`, same commit) and the orientation-coupled `useCubeRelit.ts` key light. They are the "lit 3D" shading the owner names. The `--specular` / `--shade` material register (`design-idioms.css:68-69`) exists only to feed them, so it goes with them. |
| **ghost / preview dot** | The ORIGIN playback row shows the start dot, the solid ball, and the **end-state as a dashed circle** (`-controls` frame, lower row), with nothing attached to it. | The dashed ghost is canon. The **eye** that today floats at its top-right corner (`PreviewToggle.vue`, absolute, born `6e8fc989` 2026-09-24, OA-61) is the owner's "floating meaninglessly" glyph. It has no frame and no row in the original, so it needs a home: a labelled control in the ribbon row, or none. |
| **density** | Controls card: `p-6`, label column in **Fira Code** (`duration`, `delay`, `iterations`…), 40px fields (`h-10`) in a 2-col label/field grid, a 3-button row (pause / restart / delete) as outline buttons, the ball row below. Bottom toolbar: a flat white strip `p-6 … border-none rounded-lg`, with the scene select, reset, delete and the rainbow CTA. | Keep the label/field grid (today's `.labeled-field-grid`, `--pane-label-col`). Field height ~40px at fine pointer. The bottom transport stays flat (no plate glow). |
| **type** | Display **Fraunces** (`.fraunces`, headline + numerals) → Instrument Serif since `f967f594` (2026-03-08, the owner's own change, and today's `--font-display`). Mono **Fira Code** for labels, values and the brand. | `--font-display` (Instrument Serif) and `--font-mono` (Fira Code). **Keep (identity, §0dm).** Glass's `--font-stack-text` (Plus Jakarta Sans) carries body text. The original labels were mono, which is a density/identity note and not a lighting one. |
| **headline** | `.depth-text`: a hard **5-step 1px offset emboss** plus 7 soft layers (`utils.scss`), with `dot-fade` dots after "animation". It is the one ORIGIN text-shadow (census: `textShadow 22`/page, all on the headline chars). | Today it is gone (`textShadow 0`). Like fourier's `.depth-text`, it is **not revived**: it is ORIGIN's single affectation and the canon forbids text-shadow. If the owner wants the emboss back, that is a §0dm DESIGN-RULING. |
| **motion** | The headline's char/dot loop (`loopingAnimations 22`/page on the start screen), the rainbow cube overlay loop (7/page, subject), and the scrub/demos. No looping on controls. | Allowed: the subject's own motion and the start screen's headline wave (identity, analogous to ORIGIN's dot-fade; `AnimatedText.vue:165` `charLift … infinite`, 80 counts, all on home). Not allowed: any loop on controls/chrome (`TypingDots.vue`, 12 counts, the hero/start dots: owner-ruling call with the headline wave; `spring-settle-pulse` glow, `SpringTarget.vue:868`). |
| **identity hues** | the crayon six (`--face-n`), axis RGB, the rainbow CTA palette, ppmycota violet `248 88% 71%` | Keep every one (§0dm). |

## Lighting census (`keyframes.js/scripts/ds-census.mjs`)

Computed half: each route × light/dark × 1440/390 in headless Chrome. "chrome" is UI. "subject" is the demo object (`.cube`, `.graph`, `[data-subject]`, canvas). Monaco's own 1px guide shadows are skipped as foreign content.

| computed, chrome | ORIGIN-24 `b61a9410` (home ×4) | ORIGIN-26 `577a406b` (home ×4) | **NOW `b857284e`** (7 routes ×4 = 28 pages) |
|---|---:|---:|---:|
| elements with box-shadow | 0 | 0 | **700** (25/page) |
| shadow layers (max on one element) | 0 (0) | 0 (0) | **1844 (6)** |
| shadows on non-floating surfaces | 0 | 0 | **510** |
| inset highlight layers | 0 | 0 | **708** |
| backdrop blur | 0 | 0 | **360** |
| gradient fills on controls (the rainbow CTA counted apart as identity) | 0 | 0 (+4 CTA) | **164** (+28 CTA) |
| text-shadow | 88 (the headline) | 88 (the headline) | 0 |
| looping animations on chrome | 88 (headline) | 88 (headline) | 80 (headline wave) |
| **subject** shadows / inset / drop-shadow | 0 / 0 / 0 | 0 / 0 / 0 | **56 / 96 / 4** (cube lacquer; axis glow; spring glows) |

The allowance is **RED** today (`pass-00/census.json` → `allowance`). Per route (chrome elements with shadow, summed over 4 frames): home 8 · cube 90 · amiga 94 · square 94 · **easing 294** · spring 74 · sequence 46. The max stack is 6 on every scene route.

Static half (demo-owned only, `demo/**` CSS + Vue): 20 `box-shadow` decls / 25 layers, **7 inset highlights**, 4 `drop-shadow` filters, 7 gradient fills, 1 looping animation, 1 Tailwind `shadow-sm`.

## Lighting present now that the original did not have

**Demo-owned (cure in X-DS passes, at the root):**
1. **Cube lacquer + re-light**: `.face-lacquer` gloss gradient + 2 inset highlights (`CubeTarget.css:166-178`); `.face-relit` radial specular + `--background` veil (`:201-212`); `useCubeRelit.ts` key light; `--specular` / `--shade` register (`design-idioms.css:68-69`). Born `4686aa46` (L.W11, 2026-06-17).
2. **Axis-lock glow**: `filter: drop-shadow(0 0 calc(var(--axis-active)*6px) …)` (`CubeAxisLines.vue:162`, `97afd328`). The original axes were plain dashed lines.
3. **Ball glows**: `.progress-ball` / `.curve-ball` `0 2px 10px` tinted `--ball-glow 35%` (`design-idioms.css:207,234`, `cd6dae6f`); `AnimationVisualizer.vue:357` 2-layer glow + `shadow-sm` (`:51`); `playback-idiom.css:83,105` (ring + glow, hover glow); `SequenceTarget.css:138` velocity-scaled `--seq-glow` halo (`4686aa46`).
4. **Spring glows**: `SpringTarget.vue:871` (`spring-settle-pulse` drop-shadow keyframe) and `:948`; `SpringTrace.vue:382`; `SpringHeatmap.vue:638` (ring + 8px glow); `StartingStyleTarget.vue:348` (`0 8px 32px` tinted halo).
5. **Square scene bevels**: `SquareScene.css:120` (subject-fill → white 8% top-light gradient) and the `inset 0 1px 0 white 22–30%` catch-lights at `:126, :161, :185, :233, :262`, plus the `0 0 1.5rem .25rem` halo at `:233` (`4686aa46`).
6. **Cartoon focus lift**: `design-idioms.css:180` raises the card to the 3-layer `--shadow-cartoon-lg` on `:has(:focus-visible)`.
7. **The floating eye**: `PreviewToggle.vue` (`6e8fc989`) is unanchored. Not lighting, but the owner's named defect, and part of the same frame.
8. **Chrome loops**: `TypingDots.vue` (`084feb92`) and the home `charLift` wave (`8d71fdaa`, `AnimatedText.vue:165`). The headline wave is identity-adjacent (ORIGIN had dot-fade), so this is an owner-ruling call and not an automatic cure.

**Glass-owned (honest-RED here; relayed under O-87 FLAT-LIGHTING, never overridden locally):**
- `glass-control-edge` on every field, button, select, number field, segmented track and slider range: 3–5 layers (`inset 0 1px 0 rgba(255,255,255,.1)`, `inset 0 -1px` shade, `inset 1px 0` side shade, plus the drop). This is the bulk of the 708 inset highlights and the max-6 stacks.
- `control-surface` two-layer gradient fills on toggle-group items and select triggers: all 164 control gradients. The only other gradient Button is the rainbow CTA, which is identity.
- `--shadow-cartoon-md/-lg` three-layer stamps on `.card.cartoon-surface` / `code-well` (the original was one layer).
- `glass-resting` / `glass-quiet` card material: inset rim plus drop on `square-stage`, `easing-target`, `spring-target` and `seq-target` (5 layers).
- `--shadow-dock` `0 0 12–20px` halo on the dock plate (on every page).
- `switch__thumb` `0 4px 16px`; `--glass-blur-*` backdrop on resting cards (360 counts). The canon keeps blur on floating chrome only.
- `--radius-control: var(--radius-pill)`: pill fields, where the original had rectangles (proportion rider).

## The canon, stated for the passes

1. Cards sit on the page with a **solid border** and at most **one hard, zero-blur, neutral offset** (the ORIGIN stamp). No stacked stamps, no inset rim, no blur on a resting card.
2. Controls are **flat** (token fill, 1px hairline, no gradient, no inset edge), with near-rectangular fields at ORIGIN proportion. The rainbow play CTA is the one sanctioned gradient control (identity).
3. The **cube is six flat crayon faces** with a numeral, a small fixed tonal step per face at most, and dashed RGB axes. No gloss, no specular, no veil, no axis glow.
4. **Balls and markers are flat discs.** A neutral `shadow-sm` at most, never a tinted glow. The end-state stays a **dashed ghost circle**, with nothing hovering on it.
5. **Type and hues are kept**: Instrument Serif display, Fira Code mono, the crayon six, axis RGB, the rainbow palette, ppmycota violet.
6. **Motion**: the subjects and the scrub keep theirs. No loop on any control. The home headline wave is an owner call.
