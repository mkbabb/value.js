SERVED MODEL: claude-opus-5[1m]

# X.W1.b · R54 — THE RESIDUE-WITNESS REGISTER, CELL BY CELL

**Unit**: X.W1.b · **Date**: 2026-09-17 · **Substrate**: `tranche-u` @ `f62bf82b`

R54 collects four corpus residue items *"whose ONLY discharge is an X-W1 matrix
cell"*. Its CURE-SHAPE LOCK is the rule this file is written to:

> a residue-witness cell is discharged by a **captured frame with its modality
> labelled** (R36's law: an emulated modality is labelled emulation and
> discharges no real-modality obligation), **or it is carried forward still
> open. Silence at close is not discharge.**

R54 also says what these rows are NOT: *"They are not defect rows and must not be
counted as such."* Nothing below is booked as a defect. Each is an obligation on
this unit, named, with its verdict.

The structural reason all four were open is one thing, measured in `census.ts`:
the six shipped modality arms each held the same five routes — adminusers, blob,
browse, gradient, picker — and `extract` is in none of them. Three of the four
residues below are extract residues. **Widening the modality arms to the route
census is what discharges them**; no cell was authored to serve a residue.

---

## RW-1 · ⟨wb-extract-imagedropzone · R-21⟩ — the physical corner pin under RTL

**The residue**, verbatim: *"D-15 — physical `right-1.5` corner pin; RTL lands at
inline-start… survived both a relocation and a value change. **NO-WAVE-OWNER**
(the rtl modality capture that would witness it is A-4's hole, routed X-W1)."*
R54 adds that this is the **NWO limb** it contributes to the round-1 roster.

**VERDICT: DISCHARGED — two frames, both labelled `real`.**

| golden | arm | fidelity |
|---|---|---|
| `rtl-desktop-extract-both-1024-light-real-<renderer>.png` | `rtl-desktop` | real |
| `rtl-mobile-extract-both-390-light-real-<renderer>.png` | `rtl-mobile` | real |

Both are minted by `e2e/visual/modality.visual.spec.ts`, whose `rtl-*` arms run
`dir="rtl"` applied POST-load — the mechanism MT-F022 requires
(*"documentElement is null at addInitScript time"*), inherited verbatim rather
than rediscovered. `dir` is the genuine signal, so the cells are `real`, not
`emulated`.

**The CURE stays NO-WAVE-OWNER.** This unit witnesses the pin; it does not move
it. A frame is the discharge R54 asks for, and it is the whole discharge.

---

## RW-2 · ⟨wb-extract-workbench · residue 5⟩ — zoom-200 clipping of `code.fira-code`

**The residue**, verbatim: *"`code.fira-code` clipped in all four state arms…
WCAG 1.4.4 consequence sound **if the measurement holds**; needs one confirming
instrument — **an X-W1 golden input** alongside XW-18's matrix absence."*

**VERDICT: DISCHARGED — one frame, labelled `emulated`, and the label matters.**

| golden | arm | fidelity |
|---|---|---|
| `zoom-200-desktop-extract-both-720x450-2-light-emulated-<renderer>.png` | `zoom-200-desktop` | **emulated** |

The arm reproduces 200% zoom as a half viewport at 2× DPR — the mechanism
`states.mjs` names and this unit inherits. That is the CSS-pixel consequence of
zoom (reflow at 1.4.4's threshold) and **not** real browser zoom, which is a
different transform. Under R36 the cell is therefore labelled `emulated` in its
own filename, and the honest reading is:

- **CONFIRMED by this frame**: whether `code.fira-code` clips at the reflow
  width the residue names. That is the "one confirming instrument" asked for.
- **NOT confirmed by this frame**: that real browser zoom produces the identical
  raster. A real-zoom cell is not in this matrix and is not claimed.

---

## RW-3 · ⟨wb-extract-imageeyedropper · residue 2⟩ — the geometry amounts

**The residue**, verbatim: *"the 200% arm's 2381.9/378 px… the 96 px
pinned/unpinned readout reflow, the ~60 px letterbox band. The 'unscrollable'
inference is DEAD (K-7); **the amounts await the X-W1 matrix**."* R54 records it
with its own kill: *"W1 captures amounts, it does not revive K-7's inference."*

**VERDICT: DISCHARGED AS FRAME — and the limit of that is stated, not implied.**

The same `zoom-200-desktop-extract-…-emulated-…` golden of RW-2 is the capture.
What it delivers is a **photographed** extract surface at the 200% reflow width,
from which the letterbox band and the readout reflow are visible and measurable
by a reader.

What it does NOT deliver is a **numeric** re-measurement. This suite compares
pixels; it takes no `getBoundingClientRect` reading, deliberately — and IC-2 in
`../instrument-caveats.md` is why that matters: under `content-visibility: auto`,
`scrollWidth` reports the `contain-intrinsic-size` placeholder, so a geometry
number taken casually on this app is a false green. A seat that wants the amounts
as figures rather than as a frame must read IC-2 first.

**K-7's "unscrollable" inference stays DEAD.** Nothing here revives it, and this
frame is not evidence for it.

---

## RW-4 · ⟨SwatchHoverMenu · residue 7⟩ — the `≡`-POINTER to R35

**The residue**, verbatim: *"…then prescribed the exact seeding fix that
**becomes X-W1's matrix input**."* R54 is explicit that this is a citation
closure and nothing more: *"The seeding fix itself is already banked as SH-28 at
R34/R35; this pointer closes the residue's citation, nothing more."*

**VERDICT: DISCHARGED — the seeding fix is a live capture input, with frames.**

| golden | arm | fidelity |
|---|---|---|
| `seeded-storage-palettes-populated-both-1024-light-real-<renderer>.png` | `seeded-storage` | real |
| `seeded-storage-palettes-populated-both-1024-dark-real-<renderer>.png` | `seeded-storage` | real |
| `seeded-storage-palettes-populated-palettes-390-light-real-<renderer>.png` | `seeded-storage` | real |

`seedSavedPalettes()` writes a `{version, palettes[]}` envelope into
`color-palettes` before the first page script runs, and the spec ASSERTS the seed
reached the pane before photographing it — a populated arm that photographs an
empty state under a populated name is the false green R35 exists to end. The same
seed is what U-9 ≡ SH-28 ≡ A-3 asked for: *"a seeded populated-state
`/#/palettes` capture variant — without it this component's entire defective
surface is invisible to the visual matrix."*

---

## CARRIED OPEN — not discharged, and not silent

R54's rule admits exactly two states. These are in the second one.

| # | cell | why it is not reachable here | where it is recorded |
|---|---|---|---|
| **O-1** | A real forced-colors (`windows/real-HCM`) cell — EC-8 residue 8's *"a real forced-colors cell belongs in X-W1's golden matrix"* | this harness drives chromium; `forcedColors: "active"` is `chromium/emulated-forced-colors`, and labelling it otherwise is the I-20 failure by name. A real cell needs a Windows host | IC-6 |
| **O-2** | A-32's FlagReportDialog overlay (~8 states × 4 matrices, 0 of 60 captures) | double-gated on an authenticated session AND a moderation action against a real palette. The `overlay` arm captures the dock view-select overlay — the reachable member of the class — not this dialog | IC-10 |
| **O-3** | DSL-2's `misconfigured` lamp face | fires only with `VITE_API_URL` UNSET on a loopback origin with a cross-origin BASE_URL. `visual.config.ts` SETS it, precisely so no cross-origin production fetch perturbs a golden (inv-K-5). The `forced-state` arm captures the `unavailable` latch — a different face, named as such | IC-10 |
| **O-4** | IC-4's second half — *is the painted family Fraunces* | every golden is a dev-server golden, and IC-1 proves dev never loads the production font corpus. The `param-sweep` frames answer whether the cascade reaches `.font-display`; they cannot answer which face paints | IC-1, IC-4 |

**Totals: 4 R54 residue cells — 4 DISCHARGED (3 by frames minted for the census
widening, 1 by a seeded capture input) · 4 further cells CARRIED OPEN with their
reasons.** No cell is reported by silence.
