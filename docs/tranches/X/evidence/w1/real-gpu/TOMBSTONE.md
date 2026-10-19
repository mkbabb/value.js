SERVED MODEL: claude-opus-5[1m]

# G-11 · TOMBSTONE — the real-GPU oracle, RETIRED

**Date of retirement: 2026-09-18.** Written by the X-W1 REPAIR SEAT (round 1), primary tree,
branch `tranche-u`, against Check 1 defect **D-2**.

## The verdict

**CC-029 half (b) — the real-GPU oracle session — is RETIRED at this wave's close. It did not
run. It is not carried.**

This file is the gate's second terminal state, taken deliberately, in the open, with the cost
stated. `W1.md`'s §Agent Units X.W1.f names it exactly:

> **If the session has not occurred by close, the row is RETIRED with a tombstone quoting DR-07's
> chain (N X14 → R R8-22 → S → T O-3 → U-F54/B8 → V-prime CH-7) and the reason: named six times,
> run zero times, naming is not discharge.** No seventh carry, and no re-framing as a future
> automated job — that framing has failed six times.

and §COMPLETABLE:

> The one owner-held item (X.W1.f, the real-GPU session) is scheduled at wave-open and **retires
> with a tombstone if the session does not happen** — it cannot block the close.

## DR-07's chain — six closes, six namings, zero sessions

| # | close | the form the obligation took there |
|---|---|---|
| 1 | **N · X14** | booked as a real-GPU oracle obligation |
| 2 | **R · R8-22** | re-booked; carried forward |
| 3 | **S** | carried forward |
| 4 | **T · O-3** | carried forward |
| 5 | **U · F54 / B8** | carried forward — and U's `G-CLOSE-4` made *naming* the obligation the
  discharge, so the close passed by re-naming the row (`W1.md` §Archaeology) |
| 6 | **V-prime · CH-7** | carried forward |
| 7 | **X-W1** | **STOPS HERE.** Retired by this tombstone, not carried |

**The reason, in the spec's own words: named six times, run zero times; naming is not discharge.**

## What is being given up, stated rather than glossed

The row asked for ONE bounded owner session — ≤30 minutes, headed Chrome on real silicon, walking
the four golden routes, N frames plus a signed checklist. It did not happen in this wave's window,
and no seat can manufacture it: the machine, the display and the owner's hand are the instrument.

What the tranche therefore does **not** have, and must not claim:

1. **No frame in this repository was rendered by a real GPU.** Every one of the 207 committed
   goldens under `e2e/visual/goldens/` carries `swiftshader` in its own filename
   (⟨`git ls-files 'e2e/visual/goldens/**/*.png' | grep -c swiftshader`⟩ → **207**), which is
   G-10's renderer-honesty doing its job: the matrix says out loud that it is a software-GL
   matrix.
2. **Any defect visible only under a real GPU driver is invisible to this tranche's gates** —
   driver-specific blending, real compositor timing, WebGL/WebGL2 paths that SwiftShader
   emulates rather than executes. CC-029 half (a) covers the software-GL half and says so in its
   labels; half (b) is what covered the rest, and it is now retired unmet.
3. **The `o3-headed-gpu-probe` conditional skip stands unrelieved by this file.** It pre-dates
   this wave (`120970f0`, T.W0) and is named in `ec654158`'s body; the tombstone does not discharge
   it and does not pretend to.

## Why retirement, and not a seventh carry

Because the gate admits exactly two terminal states, and the third state is the disease:

> **G-11 falsifier** (`W1.md:311`): *"Fails by a third state — 'carried to X-W11', 'scheduled for
> next window'. Only run-or-tombstone closes it."*

A seventh carry would be the cheapest act available and the one the wave's whole §Archaeology
exists to forbid. The honest act is to say the session did not happen, record what that costs, and
stop re-minting the obligation as if re-naming it were progress.

## If the owner later runs the session

It does not reopen this row. A real-GPU session run after this date is **new evidence under a new
row in the wave that hosts it** — frames land beside this tombstone in this directory, and the
wave that books them books them as its own, not as a retroactive discharge of CC-029(b). The
tombstone is dated so that the boundary is legible: everything before 2026-09-18 is retired;
anything after is somebody's fresh obligation, honestly minted.

## Provenance

- Gate: **G-11** (`W1.md` §Hard Gate row 11, CC-029 half b).
- Unit: **X.W1.f** — dispatched zero times in this wave (⟨`git log --oneline -- docs/tranches/X/evidence/w1/real-gpu`⟩ → empty before this commit).
- Raised as: **Check 1 · D-2**, HIGH — *"G-11 sits in the third state its own gate forbids."*
- Cure performed: this file, one commit, no owner session required.
