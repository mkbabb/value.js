SERVED MODEL: claude-opus-5[1m]

# X.W1.b · THE TOLERANCE — measured, not argued (G-9)

**Unit**: X.W1.b · **Date**: 2026-09-17/18 · **Substrate**: `tranche-u` — Stages 1-4 measured against this matrix's FIRST mint at `f62bf82b`; Stage 5 and the shipped goldens at `e2347c0e`
**Renderer** (read from the live browser): `ANGLE (Google, Vulkan 1.3.0
(SwiftShader Device (LLVM 10.0.0) (0x0000C0DE)), SwiftShader driver)`
**Platform**: darwin · **DPR**: 1 · **Channel**: chromium (full build, new headless)

G-9, verbatim: *"Tolerance is stated numerically with rationale;
`scripts/visual/regenerate-goldens.mjs` requires `--accept` and refuses a dirty
tree."* Its falsifier: *"Set tolerance high enough to absorb a visible change → a
hand-injected 20px block passes. **The tolerance is validated by that injection,
not by assertion.**"*

And the Archaeology row that put G-9 on the board: **D.W4's 0% pixel-drift gate
was NOT EXECUTED** — *"pixel-isomorphic by construction"*, to preserve a 120-min
cap — and the substituting analysis then conceded two non-isomorphic changes.
The guardrail W1.md draws: *"a tolerance is validated by a deliberate visible
change, never by argument."*

This file is the measurement. `G9-INJECTION.md` is the validation.

---

## 1 · Why the unit is ABSOLUTE pixels, not a ratio

The matrix spans a **15× area range** — 390×844 = 329,160 px against 3440×1440 =
4,953,600 px. A `maxDiffPixelRatio` that is strict at 390 is 15× slacker at 3440,
so one number would mean two things and the same visible defect would red on a
phone and pass on an ultrawide. G-9's own unit — a 20-px block — is absolute.
The bar is therefore absolute, and one number means one thing everywhere.

---

## 2 · The measurement stages, and what each one cured

Every figure below is differing-pixel counts between independent cold captures of
the SAME page with identical inputs, decoded with this repo's own
`node:zlib`-only decoder (`e2e/smoke/fixtures/frame-diff.ts` `decodePng`) — the
repo depends on no image codec, which that file already records.

**SUBSTRATE NOTE (IC-13).** Stages 1–4 were measured before the substrate defect
of `../instrument-caveats.md` IC-13 was found: the dev server under them carried
no `VITE_API_URL`, so the app was in its `misconfigured` state. Each stage's
FINDING is a property of the capture, not of the app's data — WebGL surfaces that
never still, a boot choreography that outruns a fixed settle, a frozen-clock
quiescence predicate, a half-pixel layout tie — and every one of them was cured at
the capture rather than absorbed. The stages are kept because they are the record
of those cures.

**DATED CORRECTION (2026-09-18).** This paragraph previously ended *"the bar is
sized on Stage 5, which is the same strict protocol re-run on the clean
substrate"* — and **no Stage 5 existed in this file**; it was a forward reference
to a re-measurement that had not been made. A Stage 5 now exists and it is NOT
that re-run: it is the strict re-measurement that found the residue's TAIL
crossing the bar and cured it at the capture. The honest statement of what sizes
the number is therefore: **the floor is 58–65 px, the largest residue observed
across every strict run of this matrix, Stage 3's 58 and Stage 5's 65**; the bar
sits 1.8–2.1× above it and 3.3× below G-9's injection; and no figure from Stages
1 or 2 is load-bearing, because each of those had a curable cause.

### Stage 1 — raw `page.screenshot`, fixed 6 s settle, no capture inputs

| viewport | scheme | d(run1,run2) | d(run2,run3) |
|---|---|---|---|
| 390 | light | 2 022 | 1 146 |
| 390 | dark | 1 104 | 1 112 |
| 1024 | light | 503 | 775 |
| 1024 | dark | 106 | 129 |
| 3440 | light | **135 255** | **135 265** |
| 3440 | dark | 45 282 | 501 |

This is what a suite that reached for a tolerance instead of a cause would have
had to absorb. At 3440 it is **338× G-9's 20-px unit**.

### Stage 2 — `capture.css` quiesce of the two live WebGL surfaces (IC-5)

| viewport | scheme | d(run1,run2) |
|---|---|---|
| 3440 | light | 48 923 |
| 3440 | dark | 1 116 |

A ~2.8× reduction at the worst cell — the aurora and blob are a large part of the
residue, but not all of it.

### Stage 3 — `waitForQuiescence` (IC-7's signature predicate) + `toHaveScreenshot`'s stabilisation loop

Strict re-run of the minted matrix at `VJS_VISUAL_MAX_DIFF_PIXELS=0`:

| cell | differing pixels | bbox | what it is |
|---|---|---|---|
| 1024 picker light | 24 | [304,303]–[331,328] | `.spectrum-dot` |
| 1024 picker dark | 4 | [304,308]–[306,326] | `.spectrum-dot` |
| 390 blob dark | 8 | [225,360]–[250,381] | `.spectrum-dot` |
| 3440 picker dark | 58 | [1500,686]–[1521,712] | `.spectrum-dot` |
| **3440 picker light** | **10 719** | [1205,457]–[2246,1073] | **the whole card, shifted 1 px** |

Most cells reached **0**. The two residues left are one small (a sub-pixel dot)
and one large — and the large one is not jitter. It is the half-pixel LAYOUT TIE
of IC-11: `.pane-container--dual` lands at exactly `y = 457.5` in every run, and
Chrome breaks the LayoutUnit tie ±0.484 px non-deterministically, moving the
entire 512×608 card by one device pixel.

**10 719 px is 27× G-9's 20-px unit.** A bar sized to absorb it would absorb the
injection that validates it. It is not absorbed; it is cured, at
`ensureOffLayoutTie`.

### Stage 4 — `ensureOffLayoutTie` applied — the floor the bar is sized against

Same strict protocol, on the re-minted 3440 arm — the hardest viewport, 28 cells.
The captured image height reads **1441**, not 1440: the tie guard fired, and the
cure is visible in the artefact itself.

⟨`VJS_VISUAL_MAX_DIFF_PIXELS=0 npx playwright test -c e2e/visual/visual.config.ts --project=visual -g 3440`⟩
→ **`5 failed · 23 passed (3.9m)`**

| result | cells |
|---|---|
| **byte-exact, 0 differing pixels** | **23 of 28** |
| residue ≤ 60 px | 5 of 28 |

Bounding boxes, read from the diff artefacts with the same decoder:

| cell | differing pixels | bbox | size |
|---|---|---|---|
| 3440 blob light | 23 | [1497,684]–[1524,711] | 28×28 |
| 3440 palettes dark | 29 | [1499,686]–[1520,711] | 22×26 |
| 3440 picker dark | 52 | [1496,688]–[1524,710] | 29×23 |

**Three of the five bounding boxes, not five** — and the reason is recorded
rather than rounded over: `test-results/` is gitignored, shared, and cleaned at
the start of every Playwright run, and a CONCURRENT SIBLING TRACK's run cleared
it before the remaining two artefacts were read. The five COUNTS are from this
run's own reporter output; the three boxes are from artefacts read before the
sweep. (Operational note for later seats: four tracks share one checkout, so
`test-results/` is not a durable evidence surface — copy out what you need.)

All three boxes are the SAME element — `.spectrum-dot`, the picker's position
marker — and all three are its antialiased edge landing a sub-pixel apart.
Stage 3's whole-card 10,719-px shift is **gone**: it was the layout tie, and it
was cured rather than absorbed.

**THE MEASURED FLOOR IS 58 px** — the largest residue observed across every
strict run of this matrix (Stage 3's `3440 picker dark`). Nothing larger survives
the capture inputs.

### Stage 5 — the residue's TAIL crossed the bar, and was cured rather than absorbed

Stages 1–4 were measured against the matrix's FIRST mint. When that mint was run
as an ordinary verification pass it returned **28 failures of 216**, every one
traced to a named root (`FIRST-MINT-VERIFICATION.md`), and the capture path was
cured accordingly. The verification pass of the CURED matrix then returned
**216 passed · 1 failed** — and the one failure is the reason this stage exists:

⟨`param-sweep · hsl · 1024 · light`⟩ → **147 pixels (ratio 0.01) are different**

against a bar of 120. The bounding box, read from the artefacts with this repo's
own decoder, is `[441,301]–[481,342]` — a 41×42 box holding one element:
`.spectrum-dot`, the same element every Stage 3/4 residue named.

**It is not jitter and it does not settle.** Eight cold loads read eight
different transforms, and within ONE page t+0 / t+2 s / t+6 s read three more,
with `getAnimations()` reporting 4–5 running throughout. The dot is glass-ui's
`<WatercolorDot animate :cycle-duration="2000">` — a perpetual animation by
design (**IC-17** carries the full measurement).

**A residue whose tail crosses the bar makes the gate FLAKY**, and the two ways
out of that are not equal:

- raise the bar to 160 — one character, 28 reds to green, and the gate stops
  being able to see a 150-px regression anywhere in the matrix forever;
- quiesce the perpetual animation at the capture, as `capture.css` Rule 1
  already does for the two perpetual WebGL surfaces, and declare what that costs.

The second was taken. `capture.css` Rule 2 pins `transform` and `filter` on
`.spectrum-dot` — not its position (`left`/`top`, measured static at
`424.828px`/`32.4688px` across all eight loads), not its size, not its colour.

⟨`VJS_VISUAL_MAX_DIFF_PIXELS=0 … -g param-sweep`⟩, double-run, after the rule →
**65 / 53 / 62** differing pixels, identical both times.

| | before Rule 2 | after Rule 2 |
|---|---|---|
| worst param-sweep cell | **147** | **65** |
| against the bar (120) | **RED** | GREEN, 1.8× headroom |
| the bar itself | 120 | **120 — unmoved** |

**THE FLOOR STANDS AT 58–65 px** across every strict run of this matrix, and the
bar was not touched at any point in the arc that produced this file.

---

## 3 · The numbers

```ts
maxDiffPixels: 120        threshold: 0.15        stabilisationTimeoutMs: 25_000
```

**`maxDiffPixels: 120`** — sited between two measurements, not chosen:

```
      58–65                   120                          400
   measured floor          THE BAR              G-9's 20×20 injection
   (antialiasing;            1.8–2.1×             3.3× above the bar
    the dot's wobble         above the floor
    is quiesced, IC-17)
```

- **1.8–2.1× above the measured floor**, so a correct page does not red. A bar at the
  floor is a bar that reds on correct pages, and a gate that reds on correct
  pages is a gate someone turns off — this wave's Archaeology in one sentence.
- **3.3× below G-9's unit**, so the smallest change G-9 names cannot pass at ANY
  viewport. Validated by injection, not by this paragraph: see `G9-INJECTION.md`.
- In area terms 120 px is a region no larger than **11×11**, which at 3440×1440
  is 0.0024% of the frame. That is not a thing a human calls a visible change; it
  is sub-pixel text rasterisation and one antialiased dot edge.

**`threshold: 0.15`** — per-pixel YIQ colour distance below which two pixels
count as equal. **Tightened from Playwright's 0.2 default, not loosened.** This UI
is built on near-neutral glass surfaces where a real regression can be a small
ΔE; a slack per-pixel threshold hides exactly that class while the pixel COUNT
still reads green. The pair (0.15, 120) is what the injection validates.

**`stabilisationTimeoutMs: 25_000`** — how long `toHaveScreenshot` may keep
re-shooting for two consecutive equal frames. The 3440 cells take ~8 s end to
end; 25 s leaves room for a cold chunk transform without letting a
never-settling cell hang the suite. **It is not a tolerance and it absorbs
nothing** — a cell that never stills times out and reds.

### The one-pixel clause, and why it gets a different instrument

W1.md §X.W1.b's sub-gate asks that *"a one-pixel hand-edit to one golden turns
the suite red."* At `maxDiffPixels: 120` a one-pixel edit does not, and no bar
that reds on one pixel can sit above a 58-px floor. The two requirements are not
reconcilable in one instrument, and pretending otherwise would mean either a
flaky gate or an unmet clause.

So the clause gets the instrument it actually needs.
`e2e/visual/golden-integrity.spec.ts` recomputes every golden's sha256 against
`MANIFEST.json`. A one-pixel hand-edit changes the digest and reds it; so does a
silently added or deleted golden. The two gates are complementary:

| what changed | which gate reds |
|---|---|
| 20 px of the PRODUCT | the pixel comparison (G-9) |
| 1 px of a GOLDEN | the integrity digest (the sub-gate) |
| a golden added or removed silently | the integrity digest (FM-12's family) |

Both receipts are in `G9-INJECTION.md`.

---

## 4 · The override can only TIGHTEN

`VJS_VISUAL_MAX_DIFF_PIXELS` exists so the floor above can be re-measured on any
machine by demanding byte equality. It is clamped to the authored constant in
`e2e/visual/tolerance.ts`: a value above it is ignored.

There is no environment variable, flag or config key in this suite that can make
the gate more permissive than the number in that file. A relaxable gate is a
decorative one — the disease this wave's Archaeology names by its two historical
shapes, D48's `continue-on-error` and D55(iv)'s branch-push substitution — and it
is not re-armed here in a new costume.

`RENDERER.json`, written beside the goldens from the live browser, records
`authoredMaxDiffPixels` — **the bar**, and only the bar. An earlier draft also
recorded the *effective* value so a reader could see when a run had been
tightened; that made the committed record move with an environment variable, and
a record of the bar that changes when the bar has not changed is not a record of
the bar. The file states the constant; the override that can only tighten it
lives in `e2e/visual/tolerance.ts` and is not written into the record. The whole
finding, with the two sibling determinism defects it travelled with, is
`../instrument-caveats.md` **IC-12**.

---

## 5 · What may NOT be used as tolerance rationale

R37's instrument register (`../instrument-caveats.md`) states which corpus
figures are disqualified. Per the fold's §2a G-9 sharpening — *"R37's instrument
register states which corpus figures may NOT be used as tolerance rationale"* —
the following were available and were NOT used:

- **any dev-server typography reading** (IC-1: the font-defer transform guards a
  dead path, so dev never loads the production faces);
- **any `scrollWidth`-derived overflow figure** (IC-2: `content-visibility: auto`
  reports the `contain-intrinsic-size` placeholder);
- **any `smallTapTargets` figure** (IC-3: the probe measures paint, not target);
- **every Stage 1–3 residue above**, because each had a curable cause. A bar
  sized to a curable cause has stopped measuring anything.

Every figure sizing the bar is this unit's own, measured at this clock, from the
settled bytes, double-run.
