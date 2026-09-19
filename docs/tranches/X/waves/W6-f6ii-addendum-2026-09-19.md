SERVED MODEL: claude-opus-5[1m]

# W6 — dated addendum beside `W6.md`: f6(ii)'s `1e-6` constant

**Beside**: `docs/tranches/X/waves/W6.md:259` (gate **f6**, arm **(ii)** — the anti-projection lock).
**Never a rewrite of it.** ⟨cmd⟩ `git diff --stat -- docs/tranches/X/waves/W6.md` → prints nothing at
this seat. E-3 holds: the dated spec is byte-untouched and this file is the addendum-beside.
**Written at**: X-W6 **Repair 1**, wall clock **2026-09-19**, branch `tranche-u`.
**Answers**: `## Close` → *Escalations returned* **#2**; `## Check 1` → defect **4** (MINOR).

---

## 1. What `W6.md` asks, verbatim

⟨`W6.md:259`⟩:

> **(ii)** printed CSS coordinates must still satisfy
> `convertColor(parseCssColor(caption).value,'lab') ≈ model colour` to **1e-6** — GREEN today (≤1e-10)
> and it goes RED the moment anyone folds `mapColorToGamut` into the formatter

## 2. Why `1e-6` cannot be tested as written — the arithmetic, not an opinion

`1e-6` was measurable on **2026-08-03** because the caption then printed **fifteen significant
digits**. That caption is the defect `W6.md:257` books as **f4**:

> 16 of 18 overflow, worst **758px in a 234px box**; failing input
> `rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)`

f4's cure is *"one digit policy sized to the 234px caption box"* (`W6.md:247`). At the settled bytes
that policy prints **four significant figures** — ⟨cmd⟩ the o23 census at this seat prints the same
row as `rgb(385.3 143.4 199.6 / 82.7%)`, and ⟨cmd⟩ `node docs/tranches/X/gates/gate-specimen-grammar.mjs`
reports `longest 50/52 chars`.

Four significant figures carry a half-step of **5e-4 relative**. Recovering a Lab coordinate to
**1e-6** absolute from coordinates quantised at 5e-4 relative is arithmetically impossible: it needs
roughly ten significant figures or more, i.e. **the fifteen-digit caption f4 declares a defect**.

> **f6(ii) at `1e-6` and f4 are jointly unsatisfiable. Exactly one of them can hold, and `W6.md` asks
> for both.** This is a contradiction *inside the spec*, not a seat's evasion — which is why `.f`
> returned it rather than marking its own homework, and why the close left it unratified.

## 3. What the shipped oracle actually tests — three legs, and where the constant lives

`e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts`, read at the bytes at this seat:

| leg | assertion | tolerance |
|---|---|---|
| **(ii)(b)** `:274-284` | every printed coordinate sits within what the **digit policy alone** can account for: `abs(channel − truth) ≤ policyResolution(truth)` | **DERIVED, not chosen** — `policyResolution(t) = max(5e-5, 5e-4·abs(t))·1.001 + 1e-12` (`:158-160`) is the four-significant-figure half-step itself. A projected coordinate is a *different number*, not a rounded one, so it cannot sit inside its own digit budget |
| **(ii)(d)** `:291-303` | a row **MARKED** out-of-gamut must still **print** coordinates outside that gamut | **ZERO tolerance of any kind.** This is the single assertion a projection cannot survive: projecting *is* moving the printed number inside the bound |
| **(ii)(c)** `:286-289` | the same claim restated in Lab: `delta ≤ LAB_RECOVERY_BOUND` where `LAB_RECOVERY_BOUND = 1.0` (`:119`) | **the one wave-authored constant** — and it is **redundant** given (b) and (d) |

**The ruling therefore turns on a fact the escalation did not have**: the property `W6.md:259` names
is tested **exactly, at (ii)(b) and (ii)(d), with no constant this wave authored**. The self-authored
number lives only on a redundant third leg.

## 4. The figures, re-measured at this seat and double-run

⟨cmd⟩ `npx playwright test e2e/smoke/oracles/o23-specimen-gamut-honesty.spec.ts --project=smoke`,
run **twice**, byte-identical both times:

```
X.W6.f f6(ii) — worst un-projected Lab recovery 7.517e-1 (hsl); bound 1; clipped control (hex) 4.061e+1
  1 passed
```

Census both runs: **10 MARKED / 8 in-gamut** over 18 rows; `css` 14 · `channels` 4.
⟨cmd⟩ `git status --porcelain` after both runs → **no `W6-evidence/` frame modified** (o23 is
hermetic; the close's INFO-8 non-hermeticity is `o21-space-catalog-truth` / `o24-specimen-dot-identity`,
not this spec).

- honest worst case (hsl, the least finely resolved row — its saturation is far outside 0..1): **0.7517**
- run's own **positive control**, the hex row, whose 8-bit sRGB encoding *forces* a clip: **40.61**
- separation: **54×**, and `CLIPPED_CONTROL_FLOOR = 10` (`:126`) is asserted in the **breaking**
  direction at every run (`:266-270`) — the control must stay **above** 10 or the gate fails.

## 5. Ruling

1. **The property is RATIFIED.** Anti-projection is measured and is RED-able, exactly, at legs
   **(ii)(b)** and **(ii)(d)**, neither of which carries a tolerance this wave chose. `.f`'s
   substitution was **forced by §2's arithmetic**, not selected for convenience.
2. **The `1e-6` constant is RESTATED, not substituted away.** Its lawful form at the settled bytes is
   **`policyResolution(truth)`** — the digit policy's own half-step. `1e-6` was never a property; it
   was the numeric shadow of a fifteen-digit caption, and f4 deletes that caption by order of the
   same spec. A constant that only exists while a named defect exists dies with the defect.
3. **Leg (ii)(c) survives as a redundant readout**, not as the gate's evidence. Its `1.0` is
   admissible because (a) it is bracketed by two *measured* numbers printed at every run
   (0.7517 and 40.61), (b) it is not load-bearing — (b) and (d) already fail first — and (c) the run
   carries a live positive control asserted in the breaking direction. Were `1.0` deleted tomorrow,
   f6(ii) would lose no discriminating power.
4. **The falsifier `W6.md:259` names is intact and is demonstrated every run.** *"It goes RED the
   moment anyone folds `mapColorToGamut` into the formatter"* — the hex row **is** that mutation,
   shipped deliberately as the control: it reads 40.61, i.e. **4× `CLIPPED_CONTROL_FLOOR` and 54× the
   honest worst case**. The gate is not one that cannot fail.

**f6 stands GREEN**, on (ii)(b) + (ii)(d) as its evidence and (ii)(c) as its readout.

## 6. Standing, and what this addendum does NOT do

- This is a **repair-seat ruling on a returned escalation**, published with its arithmetic and its
  two double-run figures so a challenger adjudicates it rather than discovers it. The **L-18
  two-quartet challenge pass** may revisit it; nothing here forecloses that, and clause 3 names the
  exact line to attack (`LAB_RECOVERY_BOUND = 1.0`).
- It does **not** edit `W6.md` (E-3), does not flip any four-verb line, and does not relieve any other
  gate. `## Close`'s *landed-wrong* finding **3** is answered; findings **1**, **2** and **4** are not.
