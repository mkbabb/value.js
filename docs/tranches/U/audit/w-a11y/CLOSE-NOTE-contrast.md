# U.W-A11Y CONTRAST lane — CLOSE NOTE (U-F26 · the rendered-tier accent re-guard)

**Lane**: the U.W-A11Y CONTRAST lane (U-F26 `dark-accent-below-floor` — the per-view accent
resolver certified its WCAG floor against the wrong referent). **Date**: 2026-07-13.
**Disposition**: `complete_with_misses` — the born-RED BR-2 flipped RED→GREEN (both schemes,
π-frames + DELTA); the dominant mechanism is fully cured at root; one residual (the dock-icon on
the live mid-tint dock chrome) is a **U-F12-rooted** breach, measured + booked, not the accent
re-guard's to close.

Served on **:8808** (`VJS_E2E_PORT=8808`, project `smoke`) per the lane brief.

---

## §The defect (measured, not asserted)

The per-view accent resolver DID walk a WCAG 1.4.11 ≥3:1 floor — but the WRITER
(`useViewAccents`) passed it the **page ambient** (`derivedLightness`) as the referent, while the
RAMP path passed the **live-probed surface** (`resolveSurfaceLightnessLive`). The default seed is a
light pink (`lab(92% 88.8 20)`), so the derived field — hence the page ambient — is LIGHT
(`--ink-ambient-l ≈ 0.76`) in BOTH schemes; the resting/floating rungs composite the dark card tint
AWAY from that mid ambient down to L ≈ 0.37 (dark). Certifying a dark-scheme accent against the mid
ambient walked it to a **mid-relative** lightness that, on the real dark tier, breached its own
claimed floor:

| | referent | resolved `--accent-view` | WCAG on the rendered resting plate |
|---|---|---|---|
| **BEFORE** | page ambient (`derivedLightness` ≈ 0.76) | `oklch(0.4075 0.1054 9.8)` (mid-dark pink) | **1.19:1** ✗ (the "Tools 1.89" class) |
| **AFTER** | live surface (`surfaceL`, the resting rung ≈ 0.42) | `oklch(0.8175 0.1054 9.8)` (light pink) | **4.31:1** ✓ |

A second, smaller mechanism (the gray-at-lightness proxy vs. the actual chromatic surface color):
a chromatic tier at a given OKLab L has a different WCAG relative luminance than a gray at that L.
Measured **negligible for the real low-chroma warm-brown card (Δ < 0.01 ratio)**; material only for
saturated surfaces (a vivid-blue tier diverges ≈0.19). So the dominant lever is the
ambient→surface-**lightness** referent (Pole A); the surface-**color** referent is the precision
seam the library leaf opens (Pole B).

## §The cure — Pole A (primary) + Pole B (library leaf, minted)

**ONE live-surface contrast referent across ramp AND accent** (the elegant transposition, E-3).

- **Pole A — unify onto the live-surface probe** (the breach fix): `useViewAccents.ts` threads
  `surfL` (the resting rung the ramp already uses) into the accent call, NOT `derivedLightness`.
  One-line semantic correction; `derivedLightness` remains a transitive watch dep (it feeds
  `surfaceL`). Ramp + accent now share ONE ground by construction.
- **Pole B — `safeAccentAgainstSurface` minted in `src/units/color/contrast.ts`** (a value.js
  export): the WCAG-contrast-RATIO floor walk against a **surface COLOR** (not a lightness, not a
  ΔL heuristic). It closes the compounding gap the brief named — `computeSafeAccent` enforces an
  OKLab lightness DISTANCE that does not map monotonically to the WCAG ratio. `resolveViewAccent`'s
  step-5 now CONSUMES it (the demo carries no inline WCAG walk; `resolveViewAccent`'s output is
  byte-preserved for a given referent — verified against the ramp/resolver suites). The demo passes
  `publicOklch(surfaceL, 0, 0)` today (the honest degenerate for a probe that resolves to L); the
  surface-COLOR seam is now IN the library for the e2e census + glass-ui to pass a real color.

**Pole choice rationale**: Pole A is the deterministic breach-mover (1.19→4.31). Pole B is minted
BECAUSE the brief prefers the elegant library primitive AND it gives glass-ui the WCAG-ratio guard
to adopt (RELAY, below) — and it is CONSUMED (no orphan export; barrel-parity gate green).

**Export surface**: `safeAccentAgainstSurface` added to `src/units/color/contrast.ts`, the color
subsystem barrel (`index.ts`), the root barrel (`src/index.ts`), and the `/color` subpath
(`subpaths/color.ts`) — root ⊇ every subpath symbol (`proof:barrel-parity` GREEN). Dist rebuilt;
`proof:subpath-budget` (/color still parse-that-free, 11/11) + `proof:lib-correctness` GREEN.

## §BR-2 — the born-RED gate (flipped RED→GREEN)

a11y is deterministic (the U.W-A11Y thesis — no GPU confound), so the flip IS the machine pass:

1. **vitest `test/units/color/color-contrast.test.ts`** (+4 rows) — the `safeAccentAgainstSurface`
   leaf: the ΔL guard passes a case whose true WCAG ratio breaches (RED) → the leaf clears it
   (GREEN); the referent-is-a-COLOR divergence; fidelity no-op; both-tier reach.
2. **vitest `test/view-accents.test.ts`** (+3 rows) — the feasibility leg: reproduces the boot
   cascade (`certifyAccentInk` → `resolveViewAccent`) for the default seed; the SURFACE referent
   clears ≥3:1 on its surface (both schemes); the PAGE-AMBIENT referent BREACHES on the real dark
   surface (the recorded defect) while the SAME cascade with the surface referent clears.
3. **e2e `o18-contrast-census.spec.ts`** (+ the U-F26 accent-view leg, both schemes) — boots the
   DEFAULT SEED (the coverage the OWNER-color census never reached): `--accent-view` composited vs
   its rendered resting rung ≥3:1 (HARD, both schemes GREEN); the dock icon wears the CERTIFIED
   `--accent-view` (identity leg — no raw un-guarded accent survives, HARD); the dock-chrome floor
   logged as a U-F12 booking (diagnostic, not a hard gate — see §residual).

**π-frames + DELTA** (`docs/tranches/U/audit/w-a11y/pi/accent-contrast-default-{light,dark}.png`) —
deterministic, headless-rendered from the live-measured resolver outputs on the live composited
grounds: **dark 1.19:1 ✗ → 4.31:1 ✓**; light 7.14 → 6.63 (never breached — the fix is a
no-regression there, ambient≈surface both light). Referent DELTA: gray-at-page-ambient →
live-probed surface.

**Full verification**: `npm test` 2326 pass · `typecheck` clean (lib + demo) · `lint` clean ·
`test:dist` all gates GREEN.

## §The residual — the dock icon on the live MID-TINT dock chrome (→ U-F12)

The e2e consumer leg surfaced a genuine residual the token leg missed: the dock view-select ICON
(`color: var(--accent-view)`, a WCAG 1.4.11 graphic) reads **2.26:1** on its LIVE dock ground in
dark. Ground truth (live probe, dark, default seed): the resting rung composites DARK
(`rgb(53,42,33)` tint, α 0.72 → L ≈ 0.37) but the **dock band composites to a muddy warm-brown MID
lightness** (`rgb(108,82,73)` tint, α 0.58 → the composited ground ≈ `rgb(137,122,117)`, WCAG
luminance ≈ 0.20). That mid-brown IS the **U-F12 `dark-scheme-derived-tint-muddiness`** the registry
names ("compounds U-F6/U-F26 — a candidate for the owner's judgment at formation").

On that mid ground, feasibility analysis (measured) shows **no chromatic accent clears 3:1 while
serving BOTH tiers with ONE token**: certifying against the mid chrome forces either a near-white
identity-collapse (`certifyAccentInk` → `oklch(0.9583 0.0211 9.8)`, C ≈ 0.02 — the cream collapse)
or a resting-breaking dark (`resolveViewAccent(…, 0.55)` → `oklch(0.215 …)`, which then reads
2.15:1 on the resting plate). The dock icon is therefore NOT the accent re-guard's floor to close —
its ROOT is U-F12 giving the dark dock a PROPER dark tier; once that lands, the resting-certified
accent clears the dock coherently (the brief's own U-F26↔U-F12 coupling — "the three dark-scheme
reds share the derivation surface, cure coherently"). **BOOKED to U-F12** (measured, named, in the
census as a logged diagnostic — not silently dropped, not falsely gated green).

## §W8 error-detail residue — disposition

The T.W8 close-`complete_with_misses` error-detail sub-3:1 (2.72:1, `microchrome-error.p1` /
P11-R3) was **already LANDED in T.W8** (`1705345`): the detail line adopted `--ink-muted` (the
certified de-emphasis rung, floor-clamped against the live resting plate — 4.52 light / 5.73 dark).
Verified live in source: `EmptyState.vue`'s detail line wears `.plate-ink` =
`var(--ink-muted, …)`. It already rides the SAME live-surface ink contract this U-F26 cure unifies
onto — **no re-guard needed** (no style.css token change; the modality lane owns style.css and was
not asked).

## §Anchor-drift correction (the brief's stale wave-doc anchors)

The wave doc / registry cite `view-accents.ts:159-174/:161/:78` and `viewSchema.ts:78-88`. The real
anchors (S.W7 slim + U.W-DEMO relocation): the pure resolver `resolveViewAccent` lives at
`demo/@/composables/color/view-accent.ts` (the OLD `demo/color-picker/composables/boot/view-accents.ts`
is now 55 lines holding only `resolveSealInk`); `GRAPHICS_CONTRAST_FLOOR = 3` at `:89`; the gray
proxy was at `:172`; the WCAG walk at `:170-185`. The writer's referent bug was at
`useViewAccents.ts:134`. `viewSchema.ts:88` is `accentHueShift`. The lane brief's own "ANCHOR DRIFT"
correction was accurate; recorded here for the record.

## §π path discrepancy (flagged per brief)

The wave-doc §π says `audit/pi/w-a11y/`; the ACTUAL shared lane dir (where every U.W-A11Y sibling
deposits) is **`docs/tranches/U/audit/w-a11y/pi/`**. Used the actual dir. Flagged.

## §RELAY availability ask (Pole B minted → for the modality lane's SINGLE BH addendum)

Per E-2 / the brief, the SINGLE BH addendum is written by the MODALITY lane; this lane does NOT
touch the foreign glass-ui tree. Recorded here + in this lane's structured output for the modality
lane to fold:

> **value.js → glass-ui AVAILABILITY note (not coordination-blocking)**: value.js now exports
> **`safeAccentAgainstSurface(L, C, H, surface: Color, floor, step?, maxSteps?)`** from
> `@mkbabb/value.js` and `@mkbabb/value.js/color` — a WCAG-2.x contrast-RATIO accent floor walk
> against a **surface COLOR** (hue-preserving, gamut-clamped per step; the rendered-tier referent,
> superseding a gray-at-lightness proxy and the ΔL-distance `computeSafeAccent` for
> floor-certification). glass-ui's own contrast paths (any accent-on-glass certification) MAY adopt
> it. Ships with the U.W-LIB library-correctness cut's version decision (booked).

## §Files touched (this lane's scope)

- `src/units/color/contrast.ts` — minted `safeAccentAgainstSurface`.
- `src/units/color/index.ts` · `src/index.ts` · `src/subpaths/color.ts` — export surface (barrel parity).
- `demo/@/composables/color/view-accent.ts` — step-5 consumes the leaf; referent param `bgL`→`surfaceL` (semantic).
- `demo/color-picker/composables/boot/useViewAccents.ts` — Pole A (thread `surfL`, drop the ambient referent).
- `test/units/color/color-contrast.test.ts` · `test/view-accents.test.ts` — born-RED gates.
- `e2e/smoke/oracles/o18-contrast-census.spec.ts` — the U-F26 default-seed accent-view leg.
- `docs/tranches/U/audit/w-a11y/pi/accent-contrast-default-{light,dark}.png` + this note.

NOT touched (per fence): `GradientStopEditor.vue`, `ComponentSliders.vue`, `style.css`,
`index.html`, admin/authed surfaces. `viewSchema.ts` read-only. glass-ui tree untouched.
