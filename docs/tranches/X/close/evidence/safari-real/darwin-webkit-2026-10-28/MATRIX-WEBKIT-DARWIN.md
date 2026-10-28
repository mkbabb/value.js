SERVED MODEL: claude-opus-5-5

# X.W11.d — the darwin real-GPU WebKit witness at the released library `@mkbabb/value.js@4.1.0` (2026-10-28)

**The cell of record for WebKit (COHESION §0ge.2), and the discharge of the retired G8 (§0ge.3).** This is a dated addendum-beside (E-3). `../MATRIX-SAFARI.md`, `../ROUTE-MATRIX.json` and `../STATE-MATRIX.json` (2026-10-18, every cell UNMEASURED) are immutable and not edited.

**I-20 cell separation.** This cell is Playwright WebKit, run headless on this darwin host. It is **not Safari.app**, and the G8 Safari.app pass is retired by the machine law, so no SAFARI column is filled from it. No verdict is copied into it from the Chromium cell (`../../browser/release-4.1.0-2026-10-28/`), and none is copied out of it.

## Disclosure

| field              | value                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| library            | the released 4.1.0. Its registry `package/dist` is byte-identical to the worktree build this cell served (`../../browser/release-4.1.0-2026-10-28/library-identity.sha256.txt`, diff exit 0).                                                                                                                                                                                |
| tree               | a clean detached worktree at HEAD `624af6b0b` (code tree `d1ef4e580`).                                                                                                                                                                                                                                                                                                       |
| origin             | **local-preview.** No deploy of record exists (`.dep` HELD, §0go.1). Projects: the root config's `vite` dev server (lane 8390). Witness sweep: the worktree's `npm run gh-pages` bundle at a bare loopback origin.                                                                                                                                                           |
| engine             | Playwright 1.60.0, WebKit **26.4**, headless, darwin arm64. No GL flags are set.                                                                                                                                                                                                                                                                                             |
| real-GPU, measured | per cell, `webkit-witness.mjs` reads the live WebGL2 `UNMASKED_RENDERER_WEBGL` → **`Apple GPU`** in 45/45 cells (`ROUTE-SWEEP.json#renderers` = `["Apple GPU"]`). This is an assertion, so a software renderer would turn the cell red. The projects' own renderer-reading specs print `renderer=Apple GPU (real-GPU)` and `renderer=REAL-GPU` (`runs/webkit-projects.log`). |
| machine law        | each run went through ⟨`guarded --exclusive webkit`⟩ (one WebKit run machine-wide) with `--workers=1`, one browser per run and one context per cell, closed in `finally`. No headed browser and no window capture.                                                                                                                                                           |
| API                | local palette API up, `commit: dev`.                                                                                                                                                                                                                                                                                                                                         |

## Executed counts, apart from the exit code

| run                          | command                                                                                                                                                                                                    | report                         | listed | executed | passed | failed | exit | verdict   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------ | -------- | ------ | ------ | ---- | --------- |
| projects                     | ⟨`guarded --exclusive webkit --timeout 90 -- npx playwright test --workers=1 --project=smoke-safari --project=oracles-safari`⟩ (admitted 15:46:23, ended 16:09:44 EDT; queued 15:20:55 on the webkit lock) | `runs/webkit-projects.json.gz` | 196    | 196      | 180    | 16     | 1    | **RED**   |
| · `smoke-safari` (iPhone 14) |                                                                                                                                                                                                            |                                | 4      | 4        | 4      | 0      |      | GREEN     |
| · `oracles-safari`           |                                                                                                                                                                                                            |                                | 192    | 192      | 176    | 16     |      | **RED**   |
| route × viewport witness     | ⟨`SWEEP_ROOT=<wt> SWEEP_DIST=<wt>/dist/gh-pages guarded --exclusive webkit --timeout 30 -- node webkit-witness.mjs route-sweep`⟩                                                                           | `route-sweep/ROUTE-SWEEP.json` | 45     | 45       | 45     | 0      | 0    | **GREEN** |

Witness stdout: `{"routerRecords":15,"expectedCells":45,"executed":45,"passed":45,"failed":0,"assertionsReached":270,"zeroNodeAssertions":0}`. That is 6 assertions per cell: the 5 BROWSER-LIVE assertions of `route-sweep.mjs` plus the hardware-renderer assertion. Sidecar ⟨sha256 of each PNG against `cells[].sha256`⟩ → `sha-match 45 mismatch 0`, and `pageerrors` total 0. All 45 PNGs are force-added (L-7).

## The 16 `oracles-safari` reds (measured here; one run, `retries` 0)

The column "also red in the Chromium cell" is a **cross-reference only**. It is computed by matching titles between the two reports. It changes neither cell's verdict, and no verdict moves across.

| spec : line                                | test                                                                              | also red in the Chromium cell               |
| ------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------- |
| `o18-contrast-census:769`                  | O-18 census (light) › graph nodes, the F-3 fill/ink chain                         | yes                                         |
| `o18-contrast-census:823`                  | O-18 census (light) › markdown About body                                         | yes                                         |
| `o18-contrast-census:1049`                 | O-18 W6.5 (light) › the IDENTITY leg                                              | no (WebKit only)                            |
| `o21-gradient-rail:148`                    | one axis: every handle centre sits where the ramp paints its own ordinal          | no                                          |
| `o21-gradient-rail:193`                    | forward and inverse maps are inverse                                              | yes                                         |
| `o21-gradient-rail:440`                    | keyboard grammar is total                                                         | no                                          |
| `o28-atmosphere-coldload:114`              | the first painted atmosphere is the seeded pick's                                 | no                                          |
| `o30-space-catalog-truth:111`              | every offered space states its own facts                                          | yes                                         |
| `o33-dock-actionbar-b05:152` ×3            | bar-less routes: the Tools slot is inert (`/atmosphere` · `/browse` · `/extract`) | `/atmosphere` yes; `/browse`, `/extract` no |
| `o33-dock-actionbar-b05:255` ×2            | 0133: the Tools focus ring clears 3:1                                             | yes (both)                                  |
| `w7-destructive-seats:53` · `:91` · `:121` | G14 · N-6 destructive Admin seats (color-name · tag · user-disclosure palette)    | no                                          |

Totals: 7 also red in the Chromium cell and 9 WebKit-only. Per-test messages are in `runs/webkit-projects.log` and `runs/webkit-projects.json.gz`.

## Verdict

**darwin real-GPU WebKit witness: MEASURED, and RED on 16 of 196 executed project tests. The route × viewport witness is GREEN 45/45**, on a hardware renderer (`Apple GPU`) measured in every cell. Origin label: **local-preview** (no deploy of record). This cell neither inverts nor confirms the Chromium cell; each is read in its own columns.
