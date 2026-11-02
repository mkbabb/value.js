# value.js 4.2.0: reference evidence (COHESION §0hf.3, SPEC §7)

The implementation follows `SPEC.md`, the judged spec. This directory holds the independent references the tests are checked against, together with their runs.

| File | What it is |
|---|---|
| `cvd_reference.py` | A frozen copy of `test/support/cvd_reference.py`, the generator of `test/fixtures/cvd/reference.json`. Its sources are colorspacious 1.1.2 and DaltonLens 0.1.5, run under numpy in a pinned venv. |
| `cvd-reference.log` | The generator's stdout: library versions, grid size, the off-grid matrices from both libraries, the Viénot matrices, and the end-to-end uint8 rows. |
| `palette_parity.mjs` | A frozen copy of `test/support/palette_parity.mjs`, the generator of `test/fixtures/cvd/palette-parity.json`. It holds the borrowed dataviz `validate_palette.js`'s own figures. |
| `palette-parity.log` | The parity run's stdout: the validator's own reports for Gregg light, Gregg dark and ECharts 5. |
| `venv-freeze.txt` | `pip freeze` of `~/.dev-logs/value-4.2.0/venv`. |
| `sha256.txt` | Hashes of both fixtures, both generators and the validator script that was read. |
| `measured.txt` | Headline figures measured against the built `dist/` after the gates ran, including the cross-model bound. |
| `gates-x2.txt` | The two full gate runs: typecheck, lint, `npm test` (vitest, `--maxWorkers=2`), and `verify-packed-surface.mjs` on a fresh `npm pack`. |

## Commands

```sh
python3 -m venv ~/.dev-logs/value-4.2.0/venv
~/.dev-logs/value-4.2.0/venv/bin/python -I -m pip install colorspacious==1.1.2 daltonlens==0.1.5 numpy
~/.dev-logs/value-4.2.0/venv/bin/python -I test/support/cvd_reference.py test/fixtures/cvd/reference.json
node test/support/palette_parity.mjs <dataviz skill>/scripts/validate_palette.js test/fixtures/cvd/palette-parity.json
```

Neither generator runs in CI. The fixtures are committed, and these suites read them:

- `test/color-vision.test.ts` (§7 A–E);
- `test/color-metrics.test.ts` (§7 F–G);
- `test/palette-check.test.ts` (§7 H).

## Tolerances

| Check | Tolerance |
|---|---|
| Machado table vs colorspacious | 0 |
| Machado table vs DaltonLens | 1e-12 |
| Matrix application, pre-clip, on the tenths | 1e-12 |
| Matrix application, pre-clip, off the tenths | 1e-9 |
| Post-clip | 1e-6 |
| Viénot vs DaltonLens and a re-derivation | 1e-12 |
| V·V = V | 1e-15 |
| End to end vs DaltonLens `simulate_cvd` | ±1 byte |
| `deltaEOK` vs Ottosson | 1e-7 |
| `contrastRatio` vs atlas `wcagContrast` | 1e-9 |
| `contrastRatio` vs the private predicate | bit-equal |
| `contrastRatio` vs the deleted demo `guardContrast` | bit-equal |
| Palette ΔE ×100 vs validator | 1e-4 |
| Palette contrast vs validator | 1e-9 |
| Palette L and C vs validator | 1e-6 |

## Readings the fixtures settled (SPEC §7: the fixture wins)

1. **Off-grid Machado.** DaltonLens 0.1.5 `Simulator_Machado2009` interpolates with `alpha = severity − lower/10`, which leaves out the ×10. At s = 0.55 it uses alpha = 0.05, where the correct value is 0.5. colorspacious's rule is the correct one, value.js follows it, and the test asserts that the two libraries differ there. Design B's report was right; A had not observed it.
2. **The deutan s = 0.55 seed** in SPEC §7 B is printed at 6 decimals. The exact entries end in 5 at the 7th decimal, so the test compares the seed to 1e-6 and the colorspacious matrix to 1e-12.
3. **The Gregg dark tritan seed label.** SPEC §7 H names `#50A95C↔#069892`, which is pair (1, 4), an all-pairs pair at 0.038677. The adjacent minimum, which is what the default check reports, is `#50A95C↔#5796DB`, pair (1, 2), at 0.038698. The two values agree to 4 decimals (0.0387). The test asserts pair (1, 2).
4. All other SPEC seeds were reproduced by the real libraries:
   - the §7 B linear vectors;
   - the §7 D bytes;
   - the Gregg light and dark worst figures;
   - the `pairs: "all"` failures, dark protan 0.0344 (3, 6) and light deutan 0.0439 (5, 7).
