SERVED MODEL: claude-opus-5-5

# X.P.W8 Repair 1 (2026-10-13) — ESC-W8lg1-1: diagnosis evidence and the fresh L-G1 ×2 read on the final bytes

Dated evidence beside `../l-g1/` (the `.lg1` read of 2026-10-09, immutable). Record: `docs/tranches/X/execution/D/X-P-W8.md`, section "RESUME 2026-10-09 — Repair 1 (2026-10-13 …)".

## Files

| file | what | how it was made |
|---|---|---|
| `verdict-agreement.{mjs,txt}` | per entry: how many `acc` sources the product refuses and how many `rej` sources it accepts (on `5408b73e7`) | a copy of `bench/paired/_build/_diag2.mjs` (imports `./retired.mjs`, `./product.mjs`, `../common.mjs`; run from `_build/`) |
| `color-mix-verdicts.{mjs,txt}` | both arms' verdicts on the rej `parseCssColor` sources that open `color-mix(` / `light-dark(` | copy of `_build/_diag.mjs` |
| `bucket-diag.mjs` | the per-bucket cost instrument: one Firefox page, both arms, sources grouped by leading form, k sized to ≥ 8 ms, the least of 15 interleaved passes per arm | scratch instrument (diagnosis only; not a gate reader) |
| `bucket-firefox-parseCssColor-rej.txt` | Firefox, rej `parseCssColor`, `.e` bytes | `node bucket-diag.mjs firefox parseCssColor rej` |
| `bucket-firefox-parseCssColor-acc.txt` | Firefox, acc `parseCssColor`, `.e` bytes | `… firefox parseCssColor acc` |
| `bucket-firefox-parseCssColor-acc-candidate-hexColor.txt` | the same with `hexColor` patched in the bundle to the single-integer reading (the cure, measured before it was written to `src/`) | `… acc` against `_build/_candidate.mjs` |
| `hexcolor-identity.{mjs,txt}` | the patched bundle and the rebuilt product bundle answer the 29,944 corpus sources identically | copy of `_build/_cand-check.mjs` |
| `bootstrap-read-final.txt` | the bootstrap reader's full output over the read of record | `node bench/paired/bootstrap.mjs bench/records/W8r1/final/node/*.json bench/records/W8r1/final/browser/*.json` |
| `bootstrap-read-e-bytes.txt` | the same over the instrument-only reads taken on `.e`'s bytes (BEFORE the product cure) | `… bench/records/W8r1/browser/*.json` |

The records themselves are under `bench/records/W8r1/` (`final/` = the read of record; `browser/` = the reads on `.e`'s bytes; `browser/superseded/` = the killed 2026-10-09 seat's reads and this seat's aborted logs; `gates/` = the stay-GREEN gate outputs), with `MANIFEST-r1.sha256`.
