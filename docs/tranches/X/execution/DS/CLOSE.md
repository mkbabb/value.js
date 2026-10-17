# X-DS CLOSE: adversarial cross-app review (2026-10-16)

The seat's job was to try to refute the claim that value.js, keyframes.js and fourier now meet the X-DS canon (`waves/X-DS.md`, read with addendum (a), COHESION §0ek). The check:
- Each app's final frames were read beside its pass-00 frames.
- The gates were re-run ×2 on today's heads.
- The census was put in one table.

Every browser run was headless (§0ei), and every run went through `~/.claude/guard/guarded`. Gate logs are in `evidence/DS/close/<app>/`.

## Verdict

**CONSUMER-CONFORMANT; the census is HONEST-RED, held by glass (O-87 FLAT-LIGHTING / O-88 DOCK-COLLAPSE-MOTION) and by owner rulings that are still owed. X-DS does NOT close GREEN.**
- **Consumer allowance: met in all three apps.** No consumer-owned gloss, glow, stacked shadow, decorative control gradient, idle shimmer or floating glyph is left on chrome. In each app, every row the census still counts traces to glass's material, glass's dock, or an identity motion that waits on an owner ruling.
- **No identity was lost** (§0dm). The same identity marks survive in pass-00 and in the final frames:
  - value.js: the wine and aurora field, the Fraunces display face, the italic space name, the 8px cartoon stamp and the hero bead;
  - keyframes.js: the cube's face hues, the rainbow play bubble, the serif poster headline and its wave;
  - fourier: the coral trace, the script-F wordmark, Computer Modern type and the paper grid.
- **The stopping rule** ("ends when a pass's critic finds nothing above trivial") holds only for keyframes:
  - **keyframes.js:** its last critic, C16, named two trivial rows.
  - **fourier:** its last critic, F16X, named one alignment row, which was cured, and one optional trivial row.
  - **value.js:** its last critic, V16, named a high row and a medium row (opened-dialog ink, admin caps). Both are cured and measured, but no clean critic pass has followed.
  - On a strict reading, value.js and fourier each owe one more critic pass with no cure attached.
- **The gates are not strictly GREEN ×2.** Each red below is a standing row with a named owner, and none is an X-DS regression (see Gates).

## Refutation attempt: what the final frames still show

Frames read:
- keyframes.js: `keyframes/pass-00/` against `keyframes/pass-49/after/` (the seventh redeploy's pass 16).
- value.js: `value/pass-00/` against `value/pass-16/`.
- fourier: `fourier/pass-00/` against `fourier/pass-16/` (/morph). The other fourier routes come from the newest full-route set, `fourier/pass-12/critic-f12x/`, plus `fourier/pass-15/f15x/` for the busy states.

| app | what I could still find | owner of it | consumer-cureable? |
|---|---|---|---|
| keyframes.js | The collapsed dock is a square tile. Its `TypingDots` loop at idle, and the play bubble has a halo. | glass, **O-88** | no (no local shim, §0el) |
| keyframes.js | Closed Selects show an up caret (`in-data-[state=open]:rotate-180` matches the open ConfiguratorLayer). Inputs are cream-filled beside transparent Selects. The fields are pill-shaped. | glass, **O-87** | no |
| keyframes.js | `.glass-resting` stage plates: backdrop blur over the grid, a 5-layer stack, and a dark halo in dark mode. The dark secondary Button (Import, Apply CSS) has a halo. The Bezier ghost staircase. The preset reads "Custom" at `ease`. | glass, **O-87** | no |
| keyframes.js | Home has 80 looping animations: the headline `charLift` wave and the hero dots. | **owner DESIGN-RULING owed** (KF-C5-13 / KF-C3-02, §0dm) | no; nothing was stripped |
| keyframes.js | **Cleared:** the cube is now flat-faced (no specular sheen; compare `pass-00/cube-1440-dark`). The owner's floating eye now sits in a labelled "Preview" verb. The ribbon's verbs follow one yield rule. | (cured) | — |
| value.js | The hero bead has a specular body and a double drop. The 390 dock lozenge spills past the dock edge. The disabled Mix primary is a tan plate. The colour-space select is an 8-layer floater with a gradient wash. | glass, **O-87 / O-88** | no |
| value.js | The 8px dark offset stamp under every pane and the spectrum is the canon's one stamp (V1C-09), so it is identity, not slop. Its dark register (Pole A at 1.22:1, Pole B framed) is still open. | **owner DESIGN-RULING owed** (VC6-04 / V12-01, P6-B1) | one knob, framed; nothing ships without the ruling |
| value.js | The resting header veil. | **owner** (V2C-15 / V16-07) | no |
| value.js | **Cleared against pass-00:** the Definition slab, the slider well's capsule rim and the dev-misconfigured pill are gone. The About headings have one rule voice. | (cured) | — |
| fourier | Plated primaries (Compute, Export) cast a cream halo in dark. The stage toolbar has a doubled plate and ring. The transport pause bubble has a halo, and its "1 ×" floats. | glass, **O-87** (DS-F2R-G1 / F6X-G1 / F8X-G1, F3C-G2) and **O-88** (F2R-G2 / F5X-G1) | no |
| fourier | `.glass-floating` hover specular centred at 50 % 50 %. `.glass-opaque` still blurs. The indeterminate Progress has a white `plus-lighter` sweep on a near-black rail. The Select's fill differs from the field's. | glass, **O-87** (F4X-G1, F7X-G1, F15X-C1 glass half, F3C-G4) | no |
| fourier | **Cleared against pass-00:** the Easing selects' warm gradient wash, the bevelled card stamps and the idle loops are gone (consumer looping animations 3 → 0). /morph now reads one label column. | (cured) | — |

I found **no consumer-owned violation that the critics missed**. Everything left in the frames is listed above, and each item is either a held glass row or an owner ruling.

## Census, before and after

Each app has its own census script, so the numbers compare within an app, not across apps.

### keyframes.js (`scripts/ds-census.mjs --widths 1440,390`, 28 cells)

Sources: `keyframes/pass-00/census.json` (2026-10-06) and `keyframes/pass-49/census.json` (2026-10-16).

| row | before | after | owner of the remainder |
|---|---:|---:|---|
| static: box-shadow declarations / layers | 20 / 25 | 5 / 2 | consumer (focus rings and selection) |
| static: inset highlights | 7 | **0** | — |
| static: drop-shadow filters | 4 | **0** | — |
| static: gradient fills | 7 | 5 | content (colour, gradient editors) |
| chrome: shadow elements / layers | 700 / 1844 | 310 / 938 | glass |
| chrome: max layers on one element | 6 | 6 | glass (`.glass-resting`) |
| chrome: inset highlights | 708 | 416 | glass |
| chrome: backdrop blur | 360 | 278 | glass |
| chrome: control gradients | 164 | 54 | glass |
| chrome: looping animations | 80 | 80 | owner ruling (wave, dots) and O-88 (TypingDots) |
| **subject (the cube): shadows / insets / drop-shadow / gradients** | 56 / 96 / 4 / 96 | **0 / 0 / 0 / 0** | — |

Gate: RED. The 12 checks are now 6 GREEN and 6 RED, up from 2 GREEN. All 6 remaining REDs are glass rows or the owed loop ruling.

### value.js (`census-before.json` → `census-after.json`)

The before run covered 1440 and 390 (36 cells); the after run covered 1440 only (18 cells). The consumer column is therefore the like-for-like read. Pass 4 measured the consumer at 36 cells: 116 layers, 0 loops.

| row | before (36 cells) | after (18 cells) | after: consumer part |
|---|---:|---:|---:|
| static: box-shadow declarations / layers | 27 / 40 | 17 / 21 | — |
| static: inset highlights | 2 | **0** | — |
| static: drop-shadow filters | 4 | **0** | — |
| static: looping keyframes | 3 | 1 | — |
| static: lighting-token definitions | 4 | 2 | — |
| static: Tailwind shadow utilities | 11 | 1 | — |
| computed: box-shadow layers | 1860 (consumer 729) | 904 | **116** (single-layer stamps) |
| computed: multi-layer elements | 396 (consumer 190) | 178 | **0** |
| computed: inset highlights | 491 (consumer 93) | 368 | **0** |
| computed: drop-shadows | 16 | 8 | 0 |
| computed: gradient fills on controls | 36 | 22 | 0 |
| computed: looping animations | 65 (all consumer) | **0** | 0 |
| computed: max layers on one element | 6 | 6 | glass |
| overlay: floater max layers | — | 8 | glass |

Gate: RED, and every row that is over is glass-owned (O-87).

### fourier (`scripts/ds-census.mjs`, 7 routes)

**Before** is the canon note's NOW column (`fourier-canon.md`, `2935a81`, 28 cells). `pass-00/census-before.json` holds keyframes' census by mistake (this was disclosed at pass 1). **After** is `pass-16/census-after.json`.

| row | before | after |
|---|---:|---:|
| static: drop-shadow filters / infinite animations / Tailwind shadows | 3 / 2 / 1 | **0 / 0 / 0** |
| static: box-shadow declarations | 8 | 7 (focus and selection rings) |
| computed: box-shadow elements / layers | 426 / 1117 | 386 / 978 (glass) |
| computed: multi-layer stacks | 335 | 292 (glass) |
| computed: inset highlights | 333 | 292 (glass) |
| computed: backdrop blur | 300 | 208 (glass) |
| computed: decorative gradients on controls | 2 | **0** |
| computed: looping animations on chrome | 3 | **0** |

Gate: RED, and every remaining row is a glass row.

## Pass counts

These are the passes the workflow lanes recorded: findings named, then findings cured.

| app | passes | findings named | cured | evidence |
|---|---:|---:|---:|---|
| keyframes.js | 16 (seventh redeploy; 49 pass directories across all redeploys) | 68 | 47 | `keyframes/pass-34..49` |
| value.js | 16 | 65 | 52 | `value/pass-01..16` |
| fourier | 16 | 61 | 28 | `fourier/pass-01..16` |

Each app ran at least 12 passes, as the spec requires. A finding that is not cured is a glass row (held), an owner ruling, or a refusal recorded with its reason in the app's receipt (`keyframes.md`, `value.md`, `fourier.md`).

## Gates at close (×2; logs in `evidence/DS/close/`)

| app | type-check | unit tests | e2e (headless, 1 worker) |
|---|---|---|---|
| keyframes.js `95965819` | `npm run check` 0 ×2; `npm run lint` 0 ×2 | demo vitest 940/941 ×2. The 1 failure is a **flake**: `r4dock-share-fallback` (2), which reads the selection range before the field's focus handler selects the text. Alternating isolated reruns passed 3 of 5 on both `57fb241a` and `95965819`, and nothing in the diff between them reaches the test. | keyframes.js has no e2e suite. |
| value.js `35b7b71c8` | `npm run typecheck` 0 ×2 | vitest 1227/1234 ×2. The 7 failures are the standing set, identical in both runs: ink D6 ×2 and T-35 ×3, then spectrum-luma C-5 and reka NG-6. | `smoke`, pass 16's 24 specs: 138 passed and 6 failed ×2. The 6 are identical in both runs and are the standing o18 (c′) cells. `smoke-admin`, 8 specs: 20/20 ×2. |
| fourier `a48bd7b` | `vue-tsc -b` 0 ×2 | vitest 116/116 ×2 | pass 16's 18 specs, chromium and mobile-chromium, on its own API at :8017 (`COMPUTE_CONCURRENCY=1`) behind vite at :3137: run A 182/182, run B 182/182. |

No visual golden was re-baselined.

## Residuals and owners

### Consumer-open (named owner)

1. **keyframes.js `r4dock-share-fallback` flake.**
   - Owner: **KF.W13X `.r4dock`** (UIA-KF-321, the seat that wrote it at `c68d86ac`).
   - Fix: the test should wait for the selection, not only for focus.
2. **value.js standing vitest set.**
   - `test/ink.test.ts` ×5 belongs to **O-62 (a) INK-VEIL-MIDBAND**.
   - spectrum-luma C-5 and reka NG-6 belong to **X-W8 `.i`** (COHESION, standing 7).
3. **value.js e2e o18 (c′) cells.** These six cells are homed by id to **X-W10** (`waves/W10-ADDENDUM-2026-10-16-cprime.md` §1, rows 1–6): o18-contrast-census :713 dark, :993 light, :1297 ×2 and :1322 ×2.
4. **Owner DESIGN-RULINGs (§0dm), banked and not cured by any seat:**
   - keyframes.js: the home loops (KF-C5-13 / KF-C3-02); the hero headline's overlap of the cube at 1440 (KF-C9-06, OD-4); the dashed and solid selection idioms (KF-C22-04, KF-C9-08).
   - value.js: P5C-02 (P5-B1); VC6-04 / V12-01 (P6-B1, the dark stamp register); VC5-01 and VC4-09 (A5); V2C-15 / V16-07 (the header veil).
   - fourier: ESC-DS-F10X-C2 (gallery measure against au1 L3-6); DS-F12X-C1's tone arm (against HLG-37); DS-F3R-C4 (script-F on both chips); DS-F6X-T2 (`auto-fill`).
5. **fourier DS-F4-C1 / F5-C2 (/paper description terms).**
   - The cure is already done at the root: latex-paper `5be04ae` and `0be0e33`.
   - It waits on an owner act, **publishing latex-paper 0.3.0** (npm E401). fourier then bumps `^0.2.1`.
6. **One more clean critic pass.**
   - Owed by **value.js X-DS** (after V16's high and medium cures) and by **fourier X-DS** (after F16X-C1), under the stopping rule.

### Glass (held under O-87, not overridden locally)

- **O-87 FLAT-LIGHTING** holds these glass rows, all re-judged at the **glass 10.2.0 repin**. No consumer overrides them, and the addenda are in `relay/X-ALL-BK-FLAT-LIGHTING.md`.
  - **keyframes.js:** KF-C16-G1 (a–f).
  - **value.js:**
    - the standing rows V16-G1, V15-G1, V14-G1, V13-02 and V13-T1, V12-G1, P9R-G1 and P9R-G3, V7R-01 and V7R-02, P4R-02 and P4R-03;
    - pass 16's addenda: the light modal plate, the destructive own-tint, and the SegmentedTabs indicator.
  - **fourier:** DS-F2R-G1 / F6X-G1 / F8X-G1, F4X-G1 / F5X-G2, F7X-G1, F3C-G1 / F9X-G1, F3C-G3, F3C-G4 with its light twin, F4X-G2, the F15X-C1 glass half, and DS-F-G1 / G3.
- **O-88 DOCK-COLLAPSE-MOTION** (also re-judged at the 10.2.0 repin):
  - keyframes.js: KF-C16-G1 (g);
  - value.js: P9R-G2, P5C-01 and V7R-04;
  - fourier: DS-F2R-G2 / F5X-G1 and F3C-G2.

## Host

- Every run was serial and went through `guarded`: `--light` for the type-checks and unit tests, and the full guard for e2e.
- value.js e2e used its own server on :9190.
- fourier e2e used `evidence/DS/close/fourier/e2e-close.sh`, with its own API on :8017 and vite on :3137, both stopped by its trap. The `web/e2e/screenshots/f-w14` frames were restored after each run.
- A temporary keyframes worktree (`.worktrees/close-57fb`) was removed.
- Nothing of this seat's is left running.
