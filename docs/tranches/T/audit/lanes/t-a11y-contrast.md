# t-a11y-contrast — the T-5 legibility half + repo-wide text-over-variable-color census

**Lane class**: DEVELOPMENT / forensics — zero product-code changes. **Scope**: T-5's
"properly contrasted color variants" clause + every OTHER text-over-variable-color surface
repo-wide (readouts, menu items, the seal icon, card pills); map each failing surface + the
guard mechanism that should (or does not) cover it; re-verify the standing PRM-expand gap.
**Substrate**: `tranche-t` @ `332f521` (= `cc4f4fa` S-close + the T corpus docs; `git diff
--stat cc4f4fa..HEAD -- src/ demo/ api/` empty, confirmed by sibling lanes). **Method**: (1)
read the library's contrast machinery (`src/units/color/contrast.ts`, `demo/@/lib/
view-accents.ts`, `demo/@/composables/color/useContrastSafeColor.ts`) to find the ONE root
tool and its consumers; (2) `grep`-census every demo site that colors text/icons/borders from
a live or guarded accent; (3) live-probe an OWN dev server (`VITE_API_URL=http://
localhost:59999 npx vite --port 9642 --strictPort`, the owner's `:9000` untouched) via
Playwright MCP — `getComputedStyle` reads of the REAL rendered menu/dock/card backgrounds,
both schemes, at the owner's own reference color (`lab(38% 32 24)`, the brown of the t-20xx
shots); (4) feed those real numbers through the library's OWN `wcagContrastRatio`/
`safeAccentCssString` leaves via `vite-node` (the exact resolution path `demo/@/lib/
color-utils.ts`'s `cssToRawColor` uses) — so every ratio below is re-derivable from the cited
code, not eyeballed; (5) read the producer's PRM-expand source (`../keyframes.js`, read-only)
to re-verify the S.W7 gap-row.

---

## §0 The one library tool, and the ONE thing wrong with every consumer

The repo has exactly one contrast-guard primitive family, and it is correctly built:

- `wcagRelativeLuminance` / `wcagContrastRatio` / `contrastColor` (`src/units/color/
  contrast.ts:29-96`) — the WCAG 2.x metric, CSS Color 5 `contrast-color()`-faithful.
- `computeSafeAccent` / `needsContrastAdjustment` / `safeAccentColor` / `safeAccentCssString`
  (`contrast.ts:99-260`) — an OKLab-lightness-DISTANCE guard (0.35 minContrast, "more
  aggressive than WCAG 4.5:1" per its own docstring) that pushes a foreground color's L away
  from a caller-supplied `bgLightness` until it clears the band.

Both leaves are pure, tested (`test/color-contrast.test.ts`, 20 tests) and take `bgLightness`
as an explicit parameter — the library did its job. **Every consumer in the demo, without
exception, feeds this parameter one of exactly two hardcoded constants**
(`useContrastSafeColor.ts:17-18`):

```ts
export const BG_LIGHTNESS_DARK = 0.15;
export const BG_LIGHTNESS_LIGHT = 0.97;
```

…whose docstring claims these "correspond to the `--background` CSS variable" — light
`hsl(0 0% 100%)`, dark `hsl(224 71% 4%)`. **That claim is false for what the app actually
paints**, and this is the single root cause behind T-5(a) (already deeply diagnosed for the
slider letters by `t-sliders-hierarchy` F-1) and every OTHER failing surface below — it is
NOT a sliders-only defect.

### F-1 — The referent is stale at EVERY level the demo composites at (root cause, live-measured)

**Evidence, live-probed** (`lab(38% 32 24)`, both schemes, own dev server):

| Surface | Mechanism | Measured composited L (OKLab) | Guard's assumed L | Δ |
|---|---|---|---|---|
| `body` background | `style.css:527` `background-color: var(--saved-bg, var(--background))` | `#b37290` → **L ≈ 0.63** (scheme-independent — the atmosphere wash sits ABOVE the theme paper in both schemes) | 0.97 (light) / 0.15 (dark) | **0.34 / 0.48** |
| `.glass-dock` chrome (the toolbar itself) | glass-ui tint + backdrop-filter | light **L ≈ 0.870**; dark **L ≈ 0.376** | 0.97 / 0.15 | 0.10 / **0.23** |
| `DropdownMenuContent` (the Profile / @mbabb menus) | `glass-menu-row`/`glass-floating` | light **L ≈ 0.936** (α 0.808); dark **L ≈ 0.379** (α 0.894) | 0.97 / 0.15 | 0.03 / **0.23** |

**Root cause, precisely.** `style.css:527`'s `body` rule makes `--background` a mere FALLBACK
behind `--saved-bg` — the atmosphere's live, per-pick derived base stop (`useAtmosphereBoot.ts`
§3, boot-written in `index.html`). The guard's docstring describes the fallback, not what is
ever actually rendered once the atmosphere has run (i.e. essentially always, post-first-paint).
Every glass surface downstream (dock chrome, menu popovers, in-plate cards — the T-3/T-11/
T-13/T-18/T-24 "too transparent/inconsistent" family) composites the SAME live tint at its own
alpha, landing at its own lightness — never the two flat constants. **There is no true neutral
background left in this app for the guard to assume.**

**Owner**: demo (the two-constant contract; `useContrastSafeColor.ts:17-18`). **Cure direction
(gestalt, not a third constant)**: the atmosphere composable (`useAtmosphere`, threaded through
`useAtmosphereBoot.ts`) already derives the live base-stop color every frame before writing
`--saved-bg` — it is the ONE place that knows the real ambient lightness. Retire the two
hardcoded constants; thread the atmosphere's own derived-lightness (a `computed` alongside
`auroraCssGradient`) into `useContrastSafeColor`/`useSafeAccentFn` as the guard's `bgLightness`,
so every consumer (§1 below) inherits the correct referent from ONE source instead of guessing
a page-level number that was never true post-boot. Where a consumer sits on a NAMED surface
tier with its own knowable composited lightness (a card, a menu — the F-4 "little glass card"
direction `t-sliders-hierarchy` F-4 already specs) the guard should key on THAT tier's lightness,
not the page ambient either — the referent is a property of the surface the text sits on, never
a global constant. This is the producer-adjacent "ink-on-tier contract" `t-sliders-hierarchy`
F-6 already requests as a packet (per-tier effective-surface-lightness published by the tier
owner) — this lane's finding is the repo-wide proof that request is load-bearing everywhere,
not just the sliders.

---

## §1 The unguarded class — raw picked color as text/border, ZERO guard call (menu items)

**T-5's brief names "menu items" explicitly; this is where they live.**
`ProfileSection.vue` (desktop @mbabb/Profile dock section) and its mobile twin
`MobileMenuDropdown.vue` both set the picked color DIRECTLY as text ink — no
`safeAccentCss`/`safeCss` call anywhere in either file:

```
ProfileSection.vue:50   :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"  (slug-pill, in DropdownMenuLabel)
ProfileSection.vue:60   :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"  (the "Profile" Button, outline variant)
MobileMenuDropdown.vue:43  :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"  (slug-pill)
```

`ProfileSection.vue:43-45`'s own comment ("the live-color identity stays via `:style`") shows
this was a DELIBERATE choice for the button, not an oversight — but it was never checked
against the surface it actually paints onto.

### F-2 — measured, both schemes, against the REAL live menu background

Fed through `wcagContrastRatio` (the exact library leaf) against the live-probed menu
background (F-1's table), for a representative color spread:

| test color | light (menu L≈0.936) | dark (menu L≈0.379) |
|---|---|---|
| owner brown `lab(38% 32 24)` | 7.62:1 pass | **1.28:1 — invisible** |
| deep navy `lab(20% 5 -30)` | 11.31:1 pass | **1.16:1 — invisible** |
| near-black `lab(8% 0 0)` | 11.95:1 pass | **1.22:1 — invisible** |
| saturated red `lab(50% 70 40)` | 5.26:1 pass | **1.86:1 — fail** |
| mid gray `lab(50% 0 0)` | **4.38:1 — fail** | **2.23:1 — fail** |
| pale mint `lab(92% -10 8)` | **1.01:1 — invisible** | 9.64:1 pass |
| near-white `lab(96% 0 0)` | **1.11:1 — invisible** | 10.85:1 pass |

**The pattern, not a cherry-picked case**: any dark pick (roughly the darker half of OKLab L)
fails catastrophically in dark mode, and any light pick fails catastrophically in light mode —
because the menu surface's own composited L (0.379 dark / 0.936 light) sits close to one end of
the range, and the guard NEVER RAN. This is structural, not an edge case: the "Profile" button
border+text and the account slug-pill go functionally invisible for roughly half of all
achievable picks, in the scheme where the menu itself is darkest/lightest — precisely the T-5
complaint, reproduced on the account menu instead of the sliders.

**Owner**: demo. **Cure direction**: these are exactly the class F-1's fix repairs by
construction — route both `:style` sites through the SAME guarded accent (`useSafeAccentFn`'s
`safeCss`, already imported and used two files away in `ComponentSliders.vue`/`PaletteCard.vue`)
fed the corrected menu-tier referent. No bespoke per-component contrast math; one call, like
every other guarded site.

---

## §2 The guarded-but-wrong-referent class — the F-1 defect's blast radius

Every other `safeAccent`/`safeCss` consumer in the tree calls the guard correctly but inherits
F-1's stale constant, so the "fix" under-corrects. Full census (`grep -rn "safeAccent\b"
demo/`):

| Site | What it inks | Surface it actually sits on |
|---|---|---|
| `ComponentSliders.vue:181` (`labelColor`) | the L/A/B/α letters | the sliders rail — **deeply diagnosed by `t-sliders-hierarchy` F-1** (measured 1.01:1 dark — this lane does not re-litigate it, only confirms it is the SAME root cause, not a sliders-local one) |
| `ColorInput.vue:68,75` | the space-convert `ArrowRight` icon stroke | the color-input bar chrome |
| `ColorNutritionLabel.vue:50` | the "Components" section label ink | the About-card Alert/plate (F-3 below is a SECOND, distinct bug on this same component) |
| `PaletteCard.vue:274` → `PaletteCardSwatches.vue:10` | the user-slug pill text+border | the palette card (`bg-card/75` translucent, itself a T-3/T-11/T-24 "too transparent" surface) |
| `Dock.vue:139` | the edit-commit `Check` icon | the dock toolbar |
| `Dock.vue:191,193` | the `GenericActionBar` fallback icon **and TEXT label** (`text-small font-display`) | the dock toolbar |
| `CurrentPaletteEditor.vue:69` | a `Check` icon | the palette editor card |
| `AdminUsersPanel.vue:83,154` | admin slug pills (×2) | the admin panel card |

**Quantified, same method as F-2** (guard fired against the WRONG 0.15/0.97 constants, then
measured against the REAL menu/card background from F-1):

| test color | light — guarded, measured vs real bg | dark — guarded, measured vs real bg |
|---|---|---|
| owner brown | 7.61:1 pass | **1.44:1 — still fails** (guard barely moved it: assumed target 0.15+0.35=0.50 vs the real 0.379 floor it should have cleared) |
| deep navy | 11.31:1 pass | **1.72:1 — still fails** |
| near-black | 11.95:1 pass | **1.63:1 — still fails** |
| pale mint | **3.41:1 — still fails** (assumed 0.97, real 0.936 — small residual) | 9.64:1 pass |
| near-white | **3.47:1 — still fails** | 10.86:1 pass |

The dark-mode column is the tell: the guard computed a target lightness against an assumed
0.15 floor that is 0.23 darker than the real 0.379 surface, so it stops correcting well short of
actual legibility — a guarded site can still read as broken, and superficially looks "handled"
in the source (a `safeAccent` call sits right there) while failing live. This is worse than the
unguarded class in one sense: it is not even visible by grep-for-missing-guard; it requires the
live measurement this lane performed.

**Owner**: demo (F-1's fix repairs all of these in one motion — no per-site patch list).

---

## §3 F-3 — the double-duty contract violation: a FOREGROUND-safe value reused as a BACKGROUND fill

`ColorNutritionLabel.vue:110-113` (the About card's conversion-graph hover highlight):

```html
<div :style="{ backgroundColor: hoveredPath.includes(space) ? nodeHighlightColor : '' }" …>
    {{ space }}
</div>
```

`nodeHighlightColor` (line 193-196) IS `safeAccent` — a value the guard certified safe **as
foreground text against the page background**. Here it is applied as a **background fill**,
with the node's own text (`{{ space }}`) left at the ambient, unmodified `--foreground` ink. The
guard's entire contract (push L away from a background) is inverted: nothing anywhere checks
that the FIXED `--foreground` ink survives sitting ON TOP of this now-colored fill.

**Measured** (library leaves, both schemes, at the owner's own brown + two other representative
picks):

| pick | light: ink vs highlighted-node bg | dark: ink vs highlighted-node bg |
|---|---|---|
| owner brown `lab(38% 32 24)` | **1.57:1 — fail** | 6.58:1 pass |
| mid-lightness `lab(50% 20 20)` (guard no-ops — L sits outside the 0.35 band from 0.97) | **2.56:1 — fail** | 4.51:1 pass (borderline) |
| light pastel `lab(80% 10 -10)` | **3.40:1 — fail** | **1.40:1 — fail** |

At the owner's own reference color, hovering a conversion-graph node in light mode paints the
node's fill at a lightness the fixed dark ink cannot read against — 1.57:1, worse than several
of the F-2 "invisible" rows.

**Root cause**: a single computed (`nodeHighlightColor`) is asked to serve two incompatible
roles (foreground ink AND background fill) with one guard call. **Owner**: demo. **Cure
direction**: split the roles — a background-fill highlight needs its OWN guard call whose
`bgLightness` referent is irrelevant (it isn't foreground text) and whose OUTPUT then becomes
the referent for a second, dependent guard on the node's ink (which must stop being the fixed
`--foreground` the moment the tile's fill goes live-colored) — i.e. the exact certified-ink
chain `t-sliders-hierarchy` F-1's cure direction specs (surface-keyed ink, computed against the
surface's ACTUAL effective lightness, never a role-mismatched reuse of a foreground guard).

---

## §4 F-4 — the alpha-post-multiply erosion (a second, compounding fault-class, repo-wide)

Independently of F-1-F-3, several fixed-ink text rungs multiply a CSS `opacity` on top of an
already-thin ink, over the SAME translucent/tinted cards the T-3/T-11/T-13/T-18/T-24 findings
call "too transparent" — eroding whatever margin existed:

- `ComponentSliders.vue:337` `.channel-rail-item { opacity: 0.6 }` + the range annotations
  (`opacity-50`) — **already measured by `t-sliders-hierarchy`** (2.17-2.94:1 light, 1.01-2.54:1
  dark; cross-referenced, not re-measured here).
- `ColorComponentDisplay.vue` (the picker's own headline readout — the literal "readouts"
  named in this lane's brief): `.fig-frac { opacity: 0.55 }` (line 150), `.fig-unit { opacity:
  0.5 }` (line 155), `.fig-comma { opacity: 0.4 }` (line 161) — all riding `--card-foreground`
  (otherwise-fixed ink) atop the SAME translucent picker card the sliders sit in.
- `ParseEchoReadout.vue:11,15,40` — the Parse-Lab echo under the color input, `text-
  muted-foreground/70` (line 11: a FURTHER 30% opacity multiply on top of `--muted-foreground`,
  which `t-sliders-hierarchy` already measured at only 3.84:1 light / 3.36:1 dark for the
  sibling `SpectrumPlateCaption.vue` — both below the 4.5:1 small-text floor before this
  component's extra `/70` erodes it further).

**Root cause**: opacity is applied as a de-emphasis DEVICE (fraction demoted, unit muted,
comma quiet) without ever checking the certified ink still clears the floor once alpha-composed
over the card's actual ground — the same "guard-then-alpha" antipattern `t-sliders-hierarchy`
F-1 names, recurring independently at the readout and the parse echo. **Owner**: demo. **Cure
direction**: de-emphasis becomes a designed RUNG of the certified-ink system (F-1's cure), never
post-hoc opacity — a `mix-toward-surface` step that is floor-clamped by `wcagContrastRatio`, so
"quieter" and "illegible" can never collapse into the same number.

---

## §5 The oracle census — what the standing suite covers, and what it structurally cannot

| Oracle | Covers | Blind to |
|---|---|---|
| `test/view-accents.test.ts` (13 tests) | the 9 nav-menu view accents ≥3:1 WCAG (incl. achromatic C≈0) + the seal-ink (2 tests, WCAG-maximal black/white) | everything NOT nav/seal — i.e. every surface in §1-§4 |
| `e2e/smoke/accent-contrast-guard.spec.ts` | the ROOT `--accent-live` token's own luminance at the DEFAULT pick, both schemes — an ADJACENT-ONLY oracle (it reads a CSS custom property off `document.documentElement`, never a consumer DOM element) | every actual consumer site (`ProfileSection`, `MobileMenuDropdown`, `PaletteCard`/`PaletteCardSwatches`, `ColorInput`, `ColorNutritionLabel`, `Dock.vue`'s icons+label, `CurrentPaletteEditor`, `AdminUsersPanel`, `ComponentSliders`) |
| `test/color-contrast.test.ts` (20 tests) | the guard LEAF's own math (`computeSafeAccent`/`needsContrastAdjustment`/`safeAccentCssString`) in isolation, using the SAME two hardcoded `DARK_BG`/`LIGHT_BG` constants the demo does | cannot catch F-1 by construction — the test supplies its own bgL exactly matching the demo's stale assumption, so a correct-math/wrong-referent bug is invisible to it twice over |

**Grep-confirmed zero coverage** (`grep -rln "ProfileSection\|MobileMenuDropdown\|slug-pill\|
PaletteCardSwatches\|ColorNutritionLabel\|nodeHighlightColor\|ParseEchoReadout" e2e/ test/`):
one incidental hit (`e2e/smoke/admin/admin-populated.spec.ts:26`, a presence check — "every
seeded slug renders" — asserts nothing about color). **`npm test`: 68 files / 2158 tests, all
green** — none of them exercise any surface this lane found failing; the suite's health says
nothing about this defect class.

**Mint direction** (shape, not a script): a format-agnostic live-DOM oracle in the
`accent-contrast-guard.spec.ts` shape (a 1×1-canvas color resolver, already proven
format-agnostic across `oklch()`/`lab()`/hex), but run as a CENSUS over the actual consumer
selectors (`.slug-pill`, the readout's `.fig-frac`/`.fig-unit`, the conversion-graph node,
the sliders' channel letters) against their REAL parent background — not the root token. This
is the same "population, not one named site" gap shape `t-oracle-gaps` §2.2/§2.5 already names
for the card-material and title-typography censuses; this lane's census is that oracle's row
list for the contrast axis specifically.

---

## §6 PRM-expand re-verification (the a11y half of this lane, not contrast)

The mandate asks this lane to re-verify the S.W7 gap-row: "the dock never expands under
`prefers-reduced-motion`" (`docs/tranches/S/FINAL.md:109`, `w7-furniture-records.md §1`) — a
genuine a11y regression (WCAG 2.3.3-adjacent: a user who has opted into reduced motion gets a
STUCK collapsed dock, not a snap-to-expanded, i.e. PRM users lose functionality the non-PRM path
has).

**Re-verified, source-level, this session** (`../keyframes.js` @ `5addc4a`, dated 2026-07-07 —
today; read-only, per the mandate):

```ts
// keyframes.js/src/animation/physics/spring/managed-play.ts:48-59
withReducedMotion(
    spring.respectReducedMotion,
    // Snap to target at zero velocity — one emit, no loop.
    () => spring.snap(),                                    // ← PRM arm: NO onFrame call
    () => {
        if (spring.settled) {
            onFrame?.(spring.value, spring.velocity);       // ← non-PRM settled arm: DOES call onFrame
            return;
        }
        springStartLoop(spring);
    },
);
```

**Still stands, byte-for-byte the documented defect.** The PRM arm's docstring even claims "one
emit, no loop" (line 40) but the code never emits — `spring.snap()` settles the value with no
`onFrame?.()` call, so the dock orchestrator's per-frame writer (`--dock-morph-t`) never
receives the settled value and the box holds its collapsed 44px indefinitely under PRM.
`git log -- managed-play.ts` shows only the S.B5 lift (a pure carve, no logic change) since the
gap was recorded — **not cured**. Downstream effect on THIS lane's scope: any text/content that
only becomes visible/legible on dock EXPANSION (the account Profile section, the `@mbabb` menu
trigger label, `GenericActionBar`'s text) is unreachable via tap-to-expand for a PRM user —
compounding with §1/§2's contrast failures rather than mitigating them (a PRM user cannot even
reach the expanded state to attempt reading the low-contrast text).

**Owner**: producer (keyframes.js). **Routing**: already correctly filed as a producer request
packet by `t-request-packets` (§"PRM-expand"); this lane's contribution is the independent
re-confirmation that it is UNCHANGED, with the exact current line numbers, so the T corpus does
not need a second investigation to know the packet is still live.

---

## §7 Findings summary (owners + cure directions)

| # | Finding | Owner | Cure direction |
|---|---|---|---|
| F-1 | The guard's `bgLightness` referent (`BG_LIGHTNESS_DARK/LIGHT = 0.15/0.97`) is false for every actual composited surface (body 0.63, dock chrome 0.376-0.870, menu content 0.379-0.936) because `style.css:527` makes `--background` a fallback behind the atmosphere's live `--saved-bg` | demo | Thread the atmosphere's own live derived-lightness (or the consuming surface's own tier lightness) into the guard; retire the two constants repo-wide, one source of truth |
| F-2 | Raw unguarded picked color as text/border in `ProfileSection.vue`/`MobileMenuDropdown.vue` — catastrophic (≤2.2:1) for roughly half of all picks per scheme | demo | Route through the SAME `useSafeAccentFn` every sibling component already uses |
| — | Guarded-but-under-corrected class (`ComponentSliders`, `ColorInput`, `PaletteCard`/`Swatches`, `Dock.vue`, `CurrentPaletteEditor`, `AdminUsersPanel`) — F-1's blast radius, still fails post-guard in the scheme where the referent gap is largest (dark) | demo | Same fix as F-1; no per-site patch |
| F-3 | `ColorNutritionLabel.vue` reuses a foreground-certified guard output as a background fill, leaving fixed ink on top uncertified (1.57:1 at the owner's own color, light mode) | demo | Split the roles; chain a second, dependent ink-guard off the fill's own resolved lightness |
| F-4 | Alpha-post-multiply erosion on readout fractions/units/commas and the parse-echo caption, compounding the same "guard-then-alpha" fault `t-sliders-hierarchy` names for the sliders | demo | De-emphasis as a certified-ink rung, never post-hoc opacity |
| F-5 | Standing oracle covers ONLY nav (9 views) + seal-ink; the guard-leaf unit tests share the same wrong-referent blind spot; every consumer site in §1-§4 has zero live coverage | demo (test authorship) | A population-census live-DOM oracle (format-agnostic canvas resolver, per-surface, real parent bg) — shape only, per `t-oracle-gaps` |
| F-6 | PRM-expand (dock never expands under `prefers-reduced-motion`) re-verified UNCHANGED at `keyframes.js` `managed-play.ts:48-59`, dated today | producer (keyframes.js) | Already packet-filed by `t-request-packets`; this lane confirms it is still live, unblocking downstream reads/labels for PRM users |

**The exemplar already in the repo** (cite, don't re-derive): `resolveSealInk` /
`--seal-ink` (`demo/@/lib/view-accents.ts:184-199`, consumed at `Dock.vue:354`) is the ONE
site in the whole tree that does this correctly end-to-end — it resolves ink from the ACTUAL
surface it sits on (the wax, not a page constant) via the library's WCAG-maximal
`contrastColor()` leaf, guaranteeing a pass by construction rather than a distance heuristic
against an assumed number. F-1's cure direction is this same shape, generalized: key every
guard call on the surface's own resolved lightness, never a hardcoded page constant.
