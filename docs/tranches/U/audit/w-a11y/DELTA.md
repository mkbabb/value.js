# U.W-A11Y CONTROLS — DELTA (U-F25 focus · U-F27 target + announcement)

Lane: **U.W-A11Y CONTROLS** (Fable · frontend-design · E-6 designHeavy).
Substrate: branch `tranche-u`; glass-ui pinned `2e559f7a` (E-2 siblings READ-ONLY).
Method: **E-3 born-RED** — each gate written FIRST, watched fail against the LIVE
defect, then cured. Probe-parsimony: static-first; measured off my OWN build on
`:8800` (NEVER `:9000`); element-clipped frames only.

Two defect classes cured, both **Pole A** (the cascade-honest / always-on cure,
not a per-instance patch):

| ID | Class | Pole taken |
|---|---|---|
| U-F25 | gradient-stop keyboard focus paints NOTHING (inline `box-shadow` clobbers the `focus-visible:ring`; `--ring` resolves empty) | **A** — hoist the material lift to the cascade, compose a dual-contrast ring over it, token the ring, add a WHCM `outline` fallback |
| U-F27 | 20px stop dot + raw `aria-valuenow` — sub-24px fine target, unreadable SR announcement | **A** — always-on hit-inflation (visual dot HELD at 20px) + a unit-aware `aria-valuetext` grammar |

---

## Measured DELTAs (live, `:8800`, dpr=2)

### U-F25 · focus ring (BR-1) — both schemes

| Property | BEFORE (RED) | AFTER (GREEN) |
|---|---|---|
| focused `box-shadow` (light) | `…0px 2px 8px` (— `--shadow-sm` alone; NO ring layer) | `rgba(0,0,0,0.85) 0px 0px 0px 1px, rgba(255,255,255,0.92) 0px 0px 0px 3px, color(srgb .11 .098 .09/.06) 0px 2px 8px 0px` |
| focused `box-shadow` (dark) | `…0px 2px 8px` (identical — ring absent both schemes) | identical dual-contrast ring + `--shadow-sm` (scheme-independent by design: the ring reads over ANY stop fill) |
| ring signature | none (`0px 0px 0px (1\|3)px` absent) | inner `0 0 0 1px` dark hairline + outer `0 0 0 3px` light halo — 0-blur/≥1px-spread, distinct from the 8px-blur material lift |
| WHCM (`forced-colors:active`) `outline` | `none` (box-shadow is STRIPPED in WHCM → affordance vanished) | `solid 2px` `Highlight`, offset 2px |

The ring is **robust-neutral** (dark hairline + light halo) so it clears contrast
over any stop colour without depending on `--accent-view` — see the bracket in
`demo/@/styles/focus-ring.css`.

### U-F27 · effective target (BR-3) — visual dot HELD

| Pointer | BEFORE (RED) hit `::before` | AFTER (GREEN) hit `::before` | visual dot |
|---|---|---|---|
| fine | `auto` (coarse-gated → the 20px dot WAS the target; sub-24 WCAG 2.5.8 fail) | **24px** (`max(1.5rem, 100%)`) | **20×20 HELD** (mount box unchanged — no reflow) |
| coarse | 44px (already present) | **44px** (`--touch-target`, 2.75rem — producer referent) | 20×20 HELD |

The fine-pointer inflation is the born-RED win; coarse was already Pole-A-correct
pre-cure (a HARDENING witness, not a strict born-RED flip — see Gates).

### U-F27 · announcement (BR-4) — the raw-float → grammar flip

| slider | BEFORE `aria-valuenow` (announced verbatim by SR) | AFTER `aria-valuetext` |
|---|---|---|
| L | `0.92` | `Lightness 92.0%` |
| a | `0.8552000000000001` (16-digit float — "point eight five five two zero…") | `a axis 88.8` |
| b | `0.58` | `b axis 20.0` |
| α | `0.8270000000000001` | `Alpha 82.7%` |

Grammar = `${channelLabel(space, component)} ${meterText}` — label per channel
unit, disambiguating `b`/`l`/`a` per-space; `%` and unitful values carried from the
existing meter text (no second number source). `aria-label` was left UNCHANGED
("L channel" …) — the reactivity smoke depends on it.

---

## Gates (born-RED witness)

Oracle `e2e/smoke/oracles/o27-focus-affordance.spec.ts` (isolated config
`o27.config.ts`, no managed webServer — reuses `:8800`, never runs the dist-wiping
perf build). Vitest `test/slider-announcement.test.ts` (7/7) covers the pure
formatter.

Born-RED witness (cure files STASHED → un-cured tree):

```
3 failed  — BR-1 ring · BR-3 fine · BR-4 aria-valuetext   (the true born-RED flips)
2 passed  — BR-3 coarse · BR-1 forced-colors              (HARDENINGS, green pre+post)
```

Cure restored → **5/5 GREEN** (18.5s). The 2 always-green rows are honest: the
coarse `::before` already existed (Pole A merely made it unconditional) and the UA
supplies a default focus `outline` under WHCM — BR-1-forced-colors asserts our
`outline` SURVIVES the cure (the box-shadow ring is stripped in WHCM), a
regression guard rather than a defect flip.

| Gate | Guards | Status |
|---|---|---|
| BR-1 ring | focus paints a dual-contrast ring, non-empty light colour, ≠ resting | RED→GREEN |
| BR-1 WHCM | ring survives as `outline` ≥2px under `forced-colors:active` | guard (green) |
| BR-3 fine | effective target ≥24px, visual dot HELD 20×20 | RED→GREEN |
| BR-3 coarse | effective target ≥44px (producer referent) | guard (green) |
| BR-4 | every channel slider exposes human-readable `aria-valuetext`, not a ≥10-digit float | RED→GREEN |

Mount guards o10/o11/o21: **16/16 GREEN** — zero mount-box regression (the 20px dot
and slider geometry are untouched; the cure is additive `::before` + attribute).

---

## Files (this lane owns)

Product:
- `demo/@/styles/focus-ring.css` (NEW) — `--focus-ring-inner/-outer` token recipe + the robust-neutral bracket.
- `demo/color-picker/App.vue` — `import "@styles/focus-ring.css"` (global: a `:root` token must exist regardless of which control mounts).
- `demo/@/components/custom/gradient/GradientVisualizer/GradientStopEditor.vue` — removed the inline `box-shadow` + Tailwind `focus-visible:ring`/`ring-primary` that clobbered the ring; hoisted `--shadow-sm` to the cascade; added the `:focus-visible` dual-contrast ring, the WHCM `outline` fallback, and the always-on `::before` hit-inflation.
- `demo/@/components/custom/color-picker/controls/ComponentSliders/composables/sliderAnnouncement.ts` (NEW) — pure `channelLabel` + `sliderValueText` formatter.
- `demo/@/components/custom/color-picker/controls/ComponentSliders/composables/useSliderAnnouncements.ts` (NEW) — DOM-patch composable (sets `aria-valuetext` on the reka thumb post-flush).
- `demo/@/components/custom/color-picker/controls/ComponentSliders/ComponentSliders.vue` — wires the composable.

Gates + audit:
- `e2e/smoke/oracles/o27-focus-affordance.spec.ts` (NEW) — the born-RED oracle (5 assertions).
- `test/slider-announcement.test.ts` (NEW) — formatter unit suite (7).
- `docs/tranches/U/audit/w-a11y/{o27.config.ts, capture.mjs}` (NEW) — isolated oracle config + π-capture.
- `docs/tranches/U/audit/w-a11y/pi/gradient-focus-{light,dark}-{before,after}.png`, `gradient-focus-forced-colors-after.png` — the visual RED→GREEN witness (force-added; `*.png` is gitignored — minimal load-bearing set, tap-target frames omitted as visually null since the hit area is a transparent `::before`).

---

## RELAY asks (for the single BH addendum — modality lane to fold)

1. **Producer `Slider` `aria-valuetext` prop-through.** glass-ui `Slider` forwards
   only `aria-label`; it exposes NO `aria-valuetext` prop, so the demo DOM-patches
   the reka thumb post-mount (`useSliderAnnouncements`). ASK: add an
   `aria-valuetext` (or per-thumb `valueText(v)`) prop to the glass-ui `Slider`
   thumb so consumers stop reaching into the thumb node. Until then the DOM-patch
   is the honest cure and stays. (glass-ui `2e559f7a`, E-2 READ-ONLY.)

2. **`--focus-ring-inner/-outer` as a producer token.** The dual-contrast ring
   recipe is demo-local (`focus-ring.css`). If glass-ui adopts a canonical
   focus-ring token pair, the demo recipe should collapse onto it. Filed as a
   forward-look, not a blocker.

---

## Flags

- **pi-path discrepancy** — the wave doc §π names `audit/pi/w-a11y/`; the
  orchestrator law names `audit/w-a11y/pi/`. This lane used **`audit/w-a11y/pi/`**
  (orchestrator law wins). Flagged for reconciliation so the two references agree.

- **Cross-lane ADOPT blocker (informational — NOT this lane's to fix).** U.W-LIB
  renamed exports (`parseCSSSubValue`→`parseCSSValues`, `rawOklab…`→`rawOklab2…`,
  etc.); the pinned glass-ui/keyframes dist still imports the old names, so a clean
  demo boot needs the ADOPT reconcile. This lane measured against a LOCAL dist
  compat-shim (`dist/value.js`, UNTRACKED — never committed) purely to boot the
  probe; the shim is disposable and does not enter any commit.
