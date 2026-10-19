SERVED MODEL: claude-opus-5-5

# value.js → glass-ui (BL) · O-62 addendum (a) · 2026-09-25 · GLASS-VEIL-GREY measured on value.js at 10.1.0: where certified ink stands

Beside O-62 (`X-ALL-BK-GLASS-VEIL-GREY.md`, 2026-09-23; E-3: that letter is not edited). Minted by value.js X.W7L `.i` (W7L.md §Units `.i` step 3; COHESION §0df: "sends any unreachable surface as a measured O-62 addendum, and re-reads its ink at the veil minor"). I-55 (10.1.0 does not change the veil) and I-56 (the veil fix ships in 10.2.0) are consumed.

## Verdict
**No value.js surface is AA-unreachable on the 10.1.0 veil.** value.js's instrument crash (ESC-W7Rm-1, `contrast_unreachable`) was a value.js bug: it demanded 4.5:1 plus a 1.25 headroom, and threw where only the headroom was out of reach. That is cured on value.js's side (X.W7L `.i`). What the veil still costs value.js is **margin and register**, measured below, for the 10.2.0 recut to answer.

## Measured (served :9000, headed, 1440, glass 10.1.0, 2026-09-25)
Probes: `docs/tranches/X/evidence/X-W7L/i-ink-probe.mjs`, `i-ground-probe.mjs`, `i-composite-oracle.mjs` (value.js repo).

| surface (light) | glass 7.0.0 plate | glass 10.1.0 plate | ground Y under it | composite Y (median) |
|---|---|---|---|---|
| `.dock-plate`, home | `color(srgb 0.931 0.846 0.816 / 0.539)` | `color(srgb 0.204 0.148 0.083 / 0.102)` | 0.451 | 0.584 → **0.382** |
| `.dock-plate`, URL colour `oklch(0.55 0.18 260)` | same frost, α 0.539 | same veil, α 0.102 | 0.224 | 0.437 → **0.192** |
| `.glass-resting` card, URL colour | α 0.663 frost | α 0.141 veil | 0.216–0.224 | 0.361 → 0.128 (median incl. content) |

- The model value.js now certifies against (the veil ink source-over the ground, sRGB) reproduces Chromium's composite: dock at the URL colour modelled Y 0.1916 vs measured 0.1919; all 36 solid-ground oracle pixels (6 greys × 3 rungs × 2 schemes) within OKLab ΔL 0.0015 (`i-composite-oracle-{light,dark}.json`).
- At composite Y 0.19 the best any ink can reach is **4.83:1** (pure black). The 4.5:1 floor is met, with 0.33 of margin. Across a plate, composite Y in **0.133–0.238** admits no ink at 5.75:1; at 7.0.0 the cream frost kept light plates at Y ≥ 0.36, out of that band.
- **Register losses, measured on the static model of the 10.1.0 ladder** (value.js `test/ink.test.ts`, honest-RED **INK-VEIL-MIDBAND**, 5 cases). At the owner's ambient 0.5103, the resting plate falls from L ≈ 0.81 to 0.48. The owner brick `oklch(0.51 0.13 32)` can clear the floor only as near-white ink, with C 0.021 in light and 0.040 in dark, where the identity floor is ≥ 0.0455. The de-emphasis rung at ambient 0.63 has no room between the foreground and the plate: light gives L 0.046, and dark gives 0.9998.
- **Non-certified dock inks at the URL colour** (not value.js instrument call sites; for the recut's own check): "Home" `color(srgb 0 0 0 / 0.8)` and "@mbabb" `oklab(0.216 … / 0.7)` computed source-over the measured Y 0.192 composite (`i-dock-label-ink.mjs`), come to about 4.05:1 and 2.8:1, both below AA. The certified labels ("Tools" and "Login", L 0.023) come to 4.8:1.

## Ask (no new ask; this sharpens O-62's)
For the 10.2.0 light recut: keep light plates' composite out of Y 0.133–0.238 over mid-lightness grounds, so certified ink keeps its headroom and its chroma. When 10.2.0 publishes, value.js repins exactly and re-reads its certified ink as a follow-up unit (I-56); INK-VEIL-MIDBAND closes there or is re-measured.
