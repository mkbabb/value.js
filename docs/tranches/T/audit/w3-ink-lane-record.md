# T.W3 — THE INK LANE RECORD (W3-5 · D6 THE INK-ON-TIER CONTRACT)

**Lane**: W3-5 (consumer lane beside the W3-1/W3-4 core; consumed — never
minted — the core's tier tokens). **Spec of record**: `SYNTHESIS.md §2 D6` +
`§3` W3-5 row + `§6.1` O-18; `T.W3.md` W3-5 row; `audit/lanes/t-a11y-contrast.md`
F-1..F-4. **Recovery**: this lane resumed from an uncommitted session-wall
partial — `recovery/T.W3-ink-brief-2026-07-10.md` carries the four-step audit
and the resume's earned catch (the pre-mount probe race).

## §1 The contract, as landed

*The referent is a property of the surface the text sits on, never a global
constant* (D6, verbatim). The mechanism:

- **`demo/@/composables/color/ink.ts`** (NEW, pure, Vue-free) — the ONE place
  a surface becomes a contrast referent:
  - `resolveSurfaceLightness(surface, ambientL, dark, tint?)` — the D1 rung
    vocabulary (`page · resting · floating · well · chrome`); live tint when
    measurable, else the INTERIM static producer model (§5 books).
  - `certifyAccentInk(css, surfaceL, floor=4.5)` — the library's OKLab
    distance guard (`computeSafeAccent`) → gamut-map → **WCAG floor WALK** to
    `floor + 1.25` headroom: a pass by construction, never a distance
    heuristic against an assumed number (the `resolveSealInk`/`--seal-ink`
    exemplar generalized). Original string kept when already clear (fidelity).
  - `resolveMutedInk(surfaceL, dark)` — **de-emphasis as a designed RUNG**
    (F-4's cure): foreground stepped φ⁻¹-complement (0.382) toward the
    surface, floor-clamped at 4.5 — "quieter" and "illegible" can never
    collapse into the same number.
  - `contrastInkFor(fillCss)` — WCAG-maximal ink derived from a live FILL's
    own luminance (the F-3 split's second, dependent guard).
- **`useContrastSafeColor.ts`** — `BG_LIGHTNESS_DARK/LIGHT` (0.15/0.97, the
  F-1 FALSE referent vs measured composited 0.376–0.936) **RETIRED**. The
  page referent is the atmosphere's live `derivedLightness` (M-15, threaded
  by the boot writer); tier-seated ink keys on its rung via
  `useSafeAccentFn(surface)`. The **live tier-tint instrument**: a hidden
  in-cascade probe resolves the rung's painted recipe (token `color-mix` and
  all) through a 1×1-canvas dual-ground draw; the dock band probes the
  mounted `.glass-dock` itself. A **probe epoch** (bumped per consumer
  `onMounted`) re-drives reads once the document is connected — the resume's
  earned catch (recovery brief §2).
- **`useAtmosphereBoot.ts`** (the ONE M-15-sanctioned boot thread; W2 closed):
  atmosphere FIRST → guard consumes `derivedLightness` → provides
  `INK_AMBIENT_KEY` → stamps `--accent-live`, **`--ink-muted`** (the certified
  plate de-emphasis rung), and **`--ink-ambient-l`** (the PUBLISHED page
  referent — guard and census read the SAME number by construction; the D6
  "tiers publish effective lightness" stake executed demo-side for the page
  tier).

## §2 The routed sites (the "every consumer" set, cured)

| Site | Finding | Cure |
|---|---|---|
| `ProfileSection.vue:50,60` → certified | A11Y-F2 (raw pick as ink, ≤1.28:1 dark) | trigger = `useSafeAccentFn("chrome")` (the dock band's own thinner α), slug pill = `("floating")` |
| `MobileMenuDropdown.vue:43` | A11Y-F2 (mobile twin) | `useSafeAccentFn("floating")`, verbatim the desktop cure |
| `ColorNutritionLabel.vue:110-113` | F-3 (fg-guard reused as bg fill — 1.57:1 at the owner color, light) | roles SPLIT: hover commits `nodeFill` (the live color as DATA, C3) + `nodeInk = contrastInkFor(fill)` together; the channel-name TEXT role certifies on the resting rung |
| `ParseEchoReadout.vue:11,15,40` | F-4 (guard-then-alpha: `/70` over an under-floor muted ink) | both spans + the gamut verdict wear `--ink-muted`; the eyebrow keeps its quiet read through case + tracking, never opacity |
| `SpectrumPlateCaption.vue` | F-10/t-2001-51 (3.84/3.36:1) | joins the `--ink-muted` rung |
| `useMarkdownColors.ts:7-8` | h-wave-w2-w3 S1 (local `BG_LIGHTNESS` shadow-duplicate) | live resting referent via `resolveSurfaceLightnessLive` + `certifyAccentInk` (the bare `computeSafeAccent` distance-stop retired); `Markdown.vue` inline code joins `--md-color-accent` (the O-18-measured 1.2:1 `text-primary` chip ink dies) |
| `PaletteCard.vue:274` | F-1 blast radius + the Q4 ruling ("PaletteCard = well") | `useSafeAccentFn("well")` — closed-form opaque referent |
| every other `safeAccent` consumer (§2 census: `ComponentSliders`, `ColorInput`, `Dock.vue`, `CurrentPaletteEditor`, `AdminUsersPanel`, `ColorSpaceSelector`, `ActionBarLayer`) | F-1 blast radius | cured BY CONSTRUCTION through the retired-constant path (page referent = live ambient); no per-site patch, exactly as the lane doc priced |

**Boot-side half** (M-15): verified LANDED via W2's queue before threading —
`useAtmosphere.ts` exposes `derivedLightness` (:127, :344); `useViewAccents.ts`
consumes it as the WCAG referent (:71-105). W3-5 threaded the exposed value
and owned the non-boot consumers only.

## §3 The oracle (O-18) — the population census

`e2e/smoke/oracles/o18-contrast-census.spec.ts` — the 1×1-canvas resolver run
as a CENSUS over the ACTUAL consumer selectors against their REAL parent
grounds (ancestor `backgroundColor` stack α-composited over the PUBLISHED
`--ink-ambient-l` ground; effective ink = color × color-α × ancestor opacity
chain), both schemes via `colorScheme` emulation, at the owner's literal
reference `lab(38% 32 24)`. Enter/morph animations are settle-POLLED (a
transient ancestor fade converges; a genuinely failing ink never does).
**Supersedes `accent-contrast-guard.spec.ts`** (adjacent-only root-token
oracle — the O-18 row's own "accent-contrast-guard generalized"; its root
leg survives as the census's `--accent-live` graphics-floor row, re-keyed on
the live ground). The W4-owned roster rows (readout fracs · channel letters ·
ConfigSliderPane, h-dag D-4) are minted **BORN-RED `test.fixme`** — un-fixme
at W4-3/W4-4.

**Result: 10/10 both schemes** (+3 born-red W4 rows skipped by design).

## §4 The census table (settled values, owner color, 2026-07-10)

| row | selector | light ink/ground → ratio | dark ink/ground → ratio |
|---|---|---|---|
| profile-trigger (chrome) | `[data-o18="profile-trigger"]` | rgb(45 35 33) / rgb(176 171 166) → **6.73** | rgb(255 241 239) / rgb(101 92 86) → **5.91** |
| slug-pill (floating) | `.slug-pill` | rgb(83 72 70) / rgb(215 207 201) → **5.71** | rgb(255 241 239) / rgb(77 68 61) → **8.66** |
| spectrum-plate-caption (`--ink-muted`) | `.plate-caption` | rgb(65 61 59) / rgb(184 179 174) → **5.15** | rgb(201 198 194) / rgb(78 70 65) → **5.39** |
| parse-echo verdict (`--ink-muted`, identity-joined) | `.gamut-verdict` | = token (membership by identity, O-7 discipline) | = token |
| graph-node resting | `[data-o18="graph-node"]` | rgb(28 25 23) / rgb(215 211 207) → **11.74** | rgb(233 230 226) / rgb(64 57 54) → **9.09** |
| graph-node hovered (fill+derived ink) | same, `:hover` | white / rgb(142 66 53) → **7.04** | white / rgb(142 66 53) → **7.04** |
| component-name (resting) | `[data-o18="component-name"]` | rgb(112 39 27) / rgb(184 179 174) → **5.05** | rgb(255 172 156) / rgb(78 70 65) → **5.08** |
| about-prose (rung-1 plate) | `.markdown-body p` | rgb(28 25 23) / rgb(184 179 174) → **8.39** | rgb(233 230 226) / rgb(78 70 65) → **7.37** |
| about-code | `.markdown-body … code` | rgb(112 39 27) / rgb(246 243 239) → **9.52** | rgb(255 172 156) / rgb(31 28 25) → **9.39** |
| `--accent-live` root leg | root token vs live ground | ≥3 (1.4.11 graphics floor) PASS | PASS |

Pre-cure forensics (the earned catch): profile-trigger light read **3.59**
under the static-model referent — the live-probe epoch cure moved it to 6.73.

## §5 Books serviced (books-never-gates)

- **The P3/P5 tier-lightness contract row** — `ink.ts` threads TODAY'S known
  composited values (producer literals parsed through the library at module
  init + the lane-measured floating tint + the shipped rung alphas) and the
  LIVE probe reads the painted recipe; BOTH die into the producer-published
  tier lightnesses at W7 (the `CERTIFY_HEADROOM` constant dies with them).
- The `--ink-ambient-l` publication is the demo-side execution of the same
  stake for the page tier.

## §6 Gates + greps at lane close

- O-18: **10/10 both schemes** (§3); `BG_LIGHTNESS_DARK/LIGHT`: **0 in code**
  (citation comments only); guard-then-alpha on the W3-5 routed set: **0**.
- `npm run lint` **0** · `npm run typecheck` **0** (lib + demo) · vitest
  **2192/71 green** (incl. `test/ink.test.ts` — the ambient-band-sweeping
  probe: the fixed-referent blind spot the guard-leaf tests carry is exactly
  what it refuses to rebuild).
- Full 6-project playwright at lane close: see the close addendum below.

## §7 Residuals (named, honest)

- **`ProfileSection.vue:130`** — the @mbabb wordmark's `text-foreground/70`
  hover-restore register (S.W7-6 designed): NOT a named F-2/F-3/F-4 site and
  its section's casing is booked to W7-6; joins the F-4 population sweep with
  the W4 rows rather than being improvised here.
- The two `.glass-wash` CC-1 sites stay producer-root (P8) per the standing
  no-workaround clause — consume note already recorded by the core lane.
- `test/units/color/color-contrast.test.ts` keeps 0.97/0.15 as LEAF-level
  probe endpoints (the leaf's math is referent-agnostic); the annotation names
  the retirement so the numbers can never be re-read as app referents.
