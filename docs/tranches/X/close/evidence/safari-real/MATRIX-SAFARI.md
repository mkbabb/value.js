SERVED MODEL: claude-opus-5-5

# X.W11.d · G8 — the real-Safari evidence cell (`safari-app`)

**Cell status: UNMEASURED (owner-scheduled, COHESION §0ei.3).** Every cell in this matrix is UNMEASURED.

## Disclosure (fold W11.18)

| field            | value                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cell             | `safari-app`: real Safari.app driven by `safaridriver` (`docs/tranches/V/megatranche/workflows/safari-real-matrix.js`)                                                                                                                                                                                                                     |
| binary + version | Safari **26.4** (`21624.1.16.11.4`) on macOS **26.4.1**. ⟨`safaridriver --version`⟩ → `Included with Safari 26.4 (21624.1.16.11.4)` · ⟨`defaults read /Applications/Safari.app/Contents/Info CFBundleShortVersionString`⟩ → `26.4` · ⟨`sw_vers -productVersion`⟩ → `26.4.1`. These read the version only. **The binary was not launched.** |
| origin           | the released origin (W11.md G8). **Not reached.**                                                                                                                                                                                                                                                                                          |
| API state        | **Not reached.**                                                                                                                                                                                                                                                                                                                           |
| posture          | No proof and no corroboration. This cell holds no verdict.                                                                                                                                                                                                                                                                                 |
| separate from    | the `webkit-engine` cell at `docs/tranches/X/close/evidence/browser/` (Playwright WebKit, headless). Under I-20 the two cells are never merged. No webkit verdict is copied here, and no webkit verdict stands in for one here.                                                                                                            |

## Why every cell is UNMEASURED

COHESION §0ei.3 (owner law, 2026-10-06), verbatim: _"Safari = WebKit headless (Playwright `webkit`,
Safari's engine) for all automated runs. Real Safari.app has no background mode (safaridriver always
opens and activates a window), so a real-Safari pass is **never** run by a seat; it is an
owner-scheduled act only."_

`safari-real-matrix.js` drives Safari.app through `safaridriver`, and that opens and focuses a window.
So no seat can run this cell. W11.md G8's falsifier says an unrun safari cell _"must read `UNMEASURED` /
`UNREACHABLE-IN-CELL` / `UNVERIFIABLE-HERE`"_, and a green cell needs a per-shot sha256. This cell has
no shots. Every `sha256` and `png` field in the two JSON sidecars is `null`.

## Matrices (sidecars in this directory)

- `ROUTE-MATRIX.json` has **45** cells. The **15** router records (14 declared routes plus the wildcard)
  come from `demo/app/router/index.ts` at run time (fold W11.16). Each runs at three viewports: 390×844,
  1440×900, and the widest the display permits (the driver requests 3440×1440 and the actual clamp is
  recorded). Every `safariVerdict` is `UNMEASURED`.
- `STATE-MATRIX.json` has **9** state cells. Every `safariVerdict` is `UNMEASURED`. The reach column
  also records what the cell can do once the owner runs it:
    - reduced-motion, color-scheme without a toggle, and pointer:coarse are `UNREACHABLE-IN-CELL`, because
      WebDriver classic has no media emulation.
    - forced-colors and print are `UNVERIFIABLE-IN-CELL` (fold S7 / W11.11). For these, only the static
      roster grep over `foundation.css` counts.

## G8 reading

**G8 = UNMEASURED (owner-scheduled, §0ei.3).** It is not GREEN and not RED. A run from the webkit
cell does not inform it. When the owner runs this cell, the run has to be on the released origin with
the API up. Every capture gets force-added (L-7) with its sha256 in the sidecar, and the cell is
compared with its webkit twin column by column. A real-Safari verdict that inverts its webkit twin
triggers the W11.md triumvirate (G8) before anything else.
