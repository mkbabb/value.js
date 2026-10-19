SERVED MODEL: claude-opus-5-5

# X.P.W8.lg1 — the L-G1 ×2 read under COHESION §0ev.1 (2026-10-09)

Raw records: `bench/records/W8lg1/` (MANIFEST.sha256 there). Reader: `bench/paired/bootstrap.mjs`. Receipt: `docs/tranches/X/execution/D/X-P-W8.md` § "X.P.W8.lg1".

## Method

- **Bytes timed:** `.e`'s final bytes, `5408b73e7` (`src` tree `516e50f0…`, identical at HEAD `6c2750f76`). `node bench/paired/build.mjs` → `srcDirty ""`, `bankedManifestOk 79/79`; `_build/product.mjs` sha256 `b7c2348f…`, `_build/retired.mjs` sha256 `a65bcc4c…`, `src/css/bbnf/generated/grammar.js` sha256 `78afc105…`.
- **Instrument:** `bench/paired/bench.mjs` (node, one fresh process per cell) and `bench/paired/browser.mjs` (Chromium, WebKit, Firefox via Playwright, headless). Their timing is unchanged. One edit was strictly required: `browser-page.mjs` now returns the cell's raw per-round samples (`raw: t`), after timing has finished. Node cells already banked `raw`.
- **Reads ×2:** node read 1 = arm order as declared (`rev 0`), read 2 = reversed (`rev 1`). Browser `reps 2`, where rep 1 reverses the arms.
- **Rounds:** 31. A cell whose bound straddles 1.0 is re-read ×2 at more rounds (61 or 101). At 101, a straddle is RED.
- **Gate per cell and read:** the median of the per-round paired ratios (product/retired) is < 1.0, AND the 95 % percentile-bootstrap upper bound of that median is < 1.0. The bootstrap uses B = 10,000 resamples and is seeded: seed = 20261009 ^ fnv1a(cell key). `ub` is the 97.5th percentile, which is the upper end of the two-sided 95 % interval and the stricter reading. The one-sided 95th percentile `ub95` is printed beside it.
- **Load:** every cell records `uptime` before and after.
- **Read of record per rep:** at that rep's largest banked round count, take attempt 0. This is the instrument's first read at that position, taken without selection. `browser.mjs` re-runs a position whose retired spread is ≥ 1.6× (up to 3 re-runs). Those attempts are reported as "strict" in the table and are never chosen among.

## Result (2026-10-09; full table in `bootstrap-read.txt`; machine-readable form in `bench/records/W8lg1/bootstrap-gate.json`)

| engine | cells | GREEN ×2 | RED (straddle at 101) | 1-min load over its reads |
|---|---|---|---|---|
| node | 15 | 15 (`rej parseCssColor` read 2 needed 61 rounds) | 0 | 441.5–493.6 |
| Chromium 31 rounds | 15 | 15 (every attempt GREEN) | 0 | 443.0–475.2 |
| WebKit 31 rounds | 15 | 15 (every attempt GREEN) | 0 | 441.5–493.6 |
| Firefox | 16 | 9, including the W7-carried whole `parseCssScalar` (GREEN on all 8 attempts at 101) | **7**: acc `parseCssColor` · acc `parseCssScalar` · acc `parseStylesheet` · rej `parseCssColor` · rej `parseCssValue` · rej `parseKeyframeSelector` · rej `parseStylesheet` | 112.9–659.4 |

Every node, Chromium and WebKit cell is GREEN ×2. Seven Firefox cells straddle at 101 rounds, so under §0ev.1 they are **RED**, and they are escalated to a cure unit (ESC-W8lg1-1).

Firefox detail:
- The retired-pass spread over the 112 reads at 101 rounds runs up to 131×; one of them is under 1.6×.
- Two raw passes measured 0 ms. Both were in non-record attempts of acc `parseKeyframeSelector`, at k = 64.
