SERVED MODEL: claude-opus-5[1m]

# X.W1.b · THE FIRST MINT, RUN AS A VERIFICATION PASS — and why none of it was committed

**Unit**: X.W1.b · **Date**: 2026-09-17 · **Substrate**: `tranche-u`, product bytes at `13f4ddc2`
**Gates touched**: G-8 · G-9 · G-10 · NG-11 · NG-12

---

## 0 · Why this file exists

The suite and a 207-cell golden set existed in the working tree, **untracked**, from an earlier
sitting of this unit. FM-12 is explicit — *"untracked evidence is not evidence"* — so the first
question this seat had to answer was not *"may these be committed?"* but *"are they true?"*

The act that answers it is the one a mint run cannot perform on itself: **run the goldens as a
verification pass.** `--update-snapshots` writes whatever the browser shows; it has no baseline to
disagree with. Only a second, ordinary run can.

⟨`npx playwright test -c e2e/visual/visual.config.ts --project=visual`⟩ →

```
  28 failed
  188 passed (29.9m)
```

**28 of 216.** None of those 207 goldens was committed. The set was re-minted from zero after the
capture path was cured, and this file is the record of what the verification found — kept because a
defect that is cured and not written down is a defect that returns.

---

## 1 · The 28, classified — every one to a named root

| # | class | cells | root, at the bytes |
|---|---|---|---|
| 1 | **product entropy** | **12** | `useColorGeneration.ts:24` seeds from `Math.random` at mount (IC-15) |
| 2 | **readiness — late module graph** | **4** | pane and dock-icon chunks arrive after `goto`'s `networkidle` (IC-16a) |
| 3 | **readiness — blank frame under host load** | **8** | complete DOM, nothing composited; this seat's own concurrent decode sweeps (IC-16c) |
| 4 | **false baseline already committed** | **2** | two goldens ARE a single flat colour; the product is correct and the golden is not (IC-16b) |
| 5 | **bookkeeping** | **2** | `MANIFEST.json` had never been generated |
| 6 | **missing cell** | **1** | `forced-colors-desktop · mix` had no golden at all — 206 PNGs against a 207-cell derivation |
| | **total** | **28** | |

### Class 1 — entropy · 12 cells

Every `generate` cell in the matrix, and no cell outside it:

```
at-rest    390 light · 390 dark · 1024 light · 1024 dark · 3440 light · 3440 dark
modality   zoom-200 · reduced-motion · forced-colors · rtl-desktop · rtl-mobile · keyboard-focus
```

Differing pixels **33,909 … 46,184**, every bounding box confined to the generated plate. `0 of 12`
passed. Full measurement and the cure at **IC-15**.

### Class 2 — the late module graph · 4 cells

| cell | diff px | bbox | what it is |
|---|---|---|---|
| `at-rest · 390 · picker · about · dark` | 6,230 | [83,28]–[303,69] | the golden's dock has **no home icon**; the page does |
| `keyboard-focus · gradient` | 46,416 | [16,0]–[1005,754] | the focus ring is on a different control |
| `keyboard-focus · admin-audit` | 33,591 | [320,0]–[703,91] | same, confined to the dock band |
| `keyboard-focus · admin-tags` | 30,277 | [338,0]–[685,91] | same |

The last three are downstream of the first: one fewer focusable element in the dock moves where 12
Tab presses land. Cure at **IC-16a**.

### Class 3 — blank frames under host load · 8 cells

Four of them are four **consecutive** cells of the 1024 light arm — `palettes`, `browse`, `extract`,
`atmosphere` — i.e. one window in time, which is the shape of a load effect and not of a product
one. `browse` and `extract` produced no actual at all (the 25 s stabilisation loop never converged
and the cell timed out); `atmosphere` wrote a blank actual with a **complete DOM** in its page
snapshot, 461,548 differing pixels, ratio 0.59.

This seat was running two CPU-heavy PNG decode sweeps against the same machine at that moment. The
arm is recorded honest-RED rather than cured: reproduction on a quiet host found **0 blank in 20**
cold loads and **0 blank in 24** samples under 12× CPU throttle. **IC-16c** carries the full
measurement, the falsified overture hypothesis, and the operational rule.

### Class 4 — the two false baselines · 2 cells

```
at-rest-gradient-gradient-390-dark-…            1 distinct colour
at-rest-admin-admin-tags-palettes-390-dark-…    1 distinct colour
every other cell of the 207                  ≥ 401 distinct colours
```

Read at the bytes over all 207 goldens on an 8-px sampling grid with the counter capped at 401. The
population has **nothing between 1 and 401**.

Both are the pre-mount ground gradient, committed as the product's appearance. The live pages are
correct — the verification run's ACTUAL frames for both cells render the full pane — so these two
cells were a gate asserting, on every future push, that the product should look like its own boot
screen. This is the exact failure mode a mint run is structurally unable to catch, and it is why
`golden-integrity.spec.ts` now carries a flat-frame assertion over the committed bytes.

### Classes 5 and 6 — bookkeeping · 3 cells

`MANIFEST.json` was named by `renderer.ts`, by `golden-integrity.spec.ts` and by
`regenerate-goldens.mjs`, and had never been written, so both digest gates failed with *"no manifest
entry for platform darwin"*. And the mint was one cell short of its own derivation: 206 PNGs against
`routeArmCellCount()` + the modality and non-route arms = 207. The missing cell was
`forced-colors-desktop · mix`; the verification run wrote it as a *"snapshot doesn't exist"* failure,
which is the only reason the count reached 207 before the re-mint.

---

## 2 · What was done about it

| finding | disposition |
|---|---|
| Class 1 | **CURED** at the capture — `pinEntropy()`, mulberry32 at a fixed seed, on the shared fixture context (IC-15) |
| Class 2 | **CURED** — a second `networkidle` after the landmark, in `gotoRoute()` and `showPane()` (IC-16a) |
| Class 3 | **RECORDED honest-RED** — an instrument property of a shared host; false REDs only, never false greens (IC-16c) |
| Class 4 | **CURED at two layers** — `requireQuiescence()` + `assertRendered()` refuse to take the photograph; `golden-integrity.spec.ts`'s flat-frame test refuses to keep it (IC-16b) |
| Class 5 | **CURED** — the manifest is generated from the settled bytes and committed |
| Class 6 | **CURED** by the re-mint, and the count is now derived and asserted, never typed |
| the 207 goldens | **DISCARDED** — re-minted from zero. No cell was kept and **no tolerance was widened** to accommodate any of the above |

The tolerance is unchanged at `maxDiffPixels: 120` / `threshold: 0.15`. Every one of the 28 failures
was cured, recorded or discarded at its cause; not one was absorbed by the bar. That distinction is
the whole of G-9, and this file is the receipt that it was honoured under pressure — the pressure
being that raising one number would have turned 28 reds green in a single edit.

---

## 3 · A twenty-ninth defect, found by RUNNING the guard rather than reading it

G-9's second clause is that `scripts/visual/regenerate-goldens.mjs` *"requires `--accept` and
refuses a dirty tree."* Running the refusal — rather than reading the code that implements it —
printed this:

```
  5 dirty path(s) outside the pixel-relevant scope — reported, not blocking:
    ocs/tranches/V/reformation/CARRY-LEDGER.md          ← the leading `d` is missing
    docs/tranches/X/evidence/w1/instrument-caveats.md
    …
```

**The root, at the bytes.** `git status --porcelain` emits a two-column status field and a space;
the first column of an *unstaged modification* is a SPACE:

⟨`git status --porcelain | od -c`⟩ → `        M       d   o   c   s   /  …`

The script's `git()` helper returned `stdout.trim()`, which eats that leading space **on the first
line only**, and `dirtyPaths()` then cut three characters from a line carrying two of prefix.

**Why that is a hole and not a cosmetic defect.** On this tree the mangled path was harmless — a
`docs/` file is outside `PIXEL_RELEVANT` either way. It is not harmless in general: with an unstaged
`demo/` or `src/` edit sorting first, `demo/App.vue` arrives as `emo/App.vue`, matches no
`PIXEL_RELEVANT` prefix, and **the refusal that is the entire point of the script does not fire** —
goldens regenerate over an uncommitted product edit and the reviewer's `git diff` no longer says
what was ratified. A dirty-tree guard defeated by alphabetical order is the decorative-gate disease
in miniature, which is the disease this wave exists to end.

**Cured** by reading status through a `gitRaw()` that strips only the trailing newline; the trimming
helper stays for the outputs where leading whitespace is not data. Re-run at the settled bytes:

```
  5 dirty path(s) outside the pixel-relevant scope — reported, not blocking:
    docs/tranches/V/reformation/CARRY-LEDGER.md
    …
REFUSED — the working tree is dirty where it can change a pixel.
    e2e/visual/
    scripts/visual/
```

Recorded here because it is the same lesson as the 28 above, one layer up: **a gate that has never
been executed is not a gate.** The first mint's goldens had never been verified; this script's
refusal had never been run.
