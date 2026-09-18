SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 — the PRM census amendment, **as a DRAFT** (G-KFW9-5's amendment half)

**Seat** `.e` · **2026-09-17** · **Authority** `docs/tranches/X/keyframes/waves/KF-W9.md` §Gates
**G-KFW9-5** + §Bounds `:69`/`:70` (the two access cells, read at the true bytes — see §0 below) ·
**Measured by** `.b`, at `evidence/W9/PRM-ENUMERATION.md`, over the pinned substrate `55e9bf0d`.

> **THIS FILE WRITES NO CENSUS BYTE, AND THAT IS THE POINT.**
> `CENSUS-2026-08-03.md` and `lane-frontend.md §6.5` are **read-only, both paths** (§Bounds `:70`).
> The lane file is additionally **never rewritten** — it stays dated evidence of what was believed on
> 2026-08-03. This draft is the text the `evidence/W9/**` create row authorises; **placing it into the
> census is not this wave's act**, and nothing here is written as though it already were.

---

## 0 · Bounds, verified at the true bytes before a word was drafted

The dispatch cited the adjudicated-record **CELL SPLIT** row at `:70` and the
`SS-13-CAPTURE-RECEIPT.md` row at `:81`. At the file's own bytes, ⟨`grep -n` on `KF-W9.md`⟩:

| cited | true | what actually sits at the cited offset |
|---|---|---|
| §Bounds CELL SPLIT `:70` | **`:69`** | `:70` is the **adjacent** row — `CENSUS-2026-08-03.md` · `lane-frontend.md §6.5`, *"read-only (both paths)"* |
| §Bounds capture-receipt `:81` | **`:77`** | `:81` is **§Disjointness** |
| §Gates `:220-244` | **`:220-244`** | resolves exactly; G-KFW9-5 at `:228`, G-KFW9-13 at `:242` |

**Both drifted anchors are recorded, not worked around**, and the INTENT is taken at the true bytes —
which, for this file, is the *stronger* reading: `:70` is precisely the row that makes the census
read-only and sends the amendment here. (`:69`'s own parenthetical already says so: *"there the
amendment lands as a **DRAFT** under the `evidence/W9/**` create row … so the census file's
`read-only` is never breached and no split is owed"*.)

---

## 1 · What the amendment targets, quoted at its byte

**`CENSUS-2026-08-03.md:141`** — *"PRM coverage conscientious but mechanism-split (10 CSS blocks, 2
raw `matchMedia`, 1 `useMediaQuery`) with 2 delegation sites unverified (**FE** §6.5)"*.

**`lane-frontend.md:462`** — *"### 6.5 `prefers-reduced-motion` — 13 enforcement sites across 12
files"*. Re-read at this seat, ⟨`sed -n '462p'`⟩ → **unchanged**; this seat wrote no byte of it.

Two of the census clause's three limbs are **already discharged at the census's own hand** (§(iii),
D-4: the `§6.5` pointer is correct and is the only such surface in that file; the *"2 delegation sites
unverified"* limb is DISCHARGED with the `KeyframeTimeline.vue:94` wrong-vendor-file caveat carried).
**The limb this amendment reaches is the third: the mechanism split's arithmetic.**

---

## 2 · THE DRAFT — the text proposed for the census row

> **PRM enumeration — amends this row, and supersedes `lane-frontend.md §6.5`'s tally as the figure of
> record (X.KF.W9, 2026-09-17, measured at `55e9bf0d`).**
>
> §6.5's *"13 enforcement sites across 12 files (10 CSS + 3 JS)"* and this row's *"(10 CSS blocks, 2
> raw `matchMedia`, 1 `useMediaQuery`)"* are superseded **by measurement, not by correction-in-place**:
> both files stay dated evidence of what was believed on their dates.
>
> **Enforcement — 14 sites / 14 files / FOUR mechanisms**: 10 CSS `@media` blocks · 2
> `window.matchMedia` (`useCubeDemo.ts:164`, `useSequenceInstrument.ts:31`) · 1 `useMediaQuery`
> (`EasingTarget.vue:234`) · **1 `usePreferredReducedMotion` (`AmigaScene.vue:58`, read at `:107`) —
> the fourth mechanism neither file counts** — **plus 4 engine-flag `respectReducedMotion` sites that
> §6.5 counts nowhere** (`useSceneSwap.ts:45`, `TypingDots.vue:91`, `AnimationVisualizer.vue:147`, and
> the stored default `animationOptionsStore.ts:49`).
>
> **Both numerals in "13 across 12" are wrong, in opposite directions**: 13 counts the engine flag at
> zero and misses the fourth mechanism; 12 under-counts the files by two — the 14 sites sit in 14
> distinct files (`EasingTarget.css` and `EasingTarget.vue` are two files, not one).
>
> **Motion — 51 sites**: **42 engine** · 7 CSS keyframe-driven · 1 rAF loop · 1 timer tour · **0 direct
> WAAPI**. **36 of 42 engine instances carry no flag at all** (engine default `false`,
> `constants/defaults.ts:87`); **3 carry `true` in their own bag**; **3 carry `true` via the stored
> default and are INERT**, because their play path is a group whose own `respectReducedMotion`
> (`group/group.ts:57`, consumed at `group/lifecycle.ts:80`) is never set. **`0 of 42` uses the numeric
> intensity form the adjudicated cure names.**
>
> **Six of the ten CSS blocks gate `transition` in files with no local `animation` property** —
> compliance authored over a layer that has no motion in it.
>
> Full enumeration, counting rules and reproducing commands:
> `docs/tranches/X/keyframes/evidence/W9/PRM-ENUMERATION.md`.

---

## 3 · What this draft does NOT claim

1. **It does not re-grade any of the seventeen banked rows.** `PRM-ENUMERATION.md §3` resolves them
   against the enumeration; resolution is not re-booking, and no id moves.
2. **It does not decide the unification.** The intensity form is **KF.W5's** (engine half) and
   **KF.W6's** (tokenization half) — G-KFW9-6's CLOSES hands them the constraint as a declared
   sequencing obligation, booked at both ends. This wave measures.
3. **It does not claim the census is now amended.** The census row is unwritten until a hand with a
   grant over `CENSUS-2026-08-03.md` writes it. **That hand is not this wave's** — §Bounds `:70` is
   unambiguous, and the draft's whole reason for existing is that the grant is missing by design.
4. **It does not re-pin the substrate.** Every figure is measured at `55e9bf0d`; `PRM-ENUMERATION.md §5`
   prices a re-pin at **four line numbers** (`EasingTarget.vue:234`→`:241`; three in `useSquareDemo.ts`)
   and rules nothing about which ref the wave holds.

---

## 4 · Residual, with its owner named

**OWNER: whoever holds the write grant on `docs/tranches/V/megatranche/formation/keyframes/CENSUS-2026-08-03.md`.**
The amendment text of §2 is complete, measured and double-run, and is blocked on exactly one thing: a
seat with that grant. **No KF.W9 seat has it, and none took it.** Until then the figure of record for
the PRM census is `evidence/W9/PRM-ENUMERATION.md`, cited by path — which is the LAW B shape (the claim
lives in the freshest measuring artifact, cited by path and date, and the older files keep their dates).

**G-KFW9-5 reading at this seat: GREEN stands, on its own terms.** The gate's CLOSES is *"ONE
enumeration of every demo motion with flag state + layer … replacing §6.5; each of the seventeen rows
resolves against it; the census row amends, the lane file stays dated evidence."* The enumeration
exists and is one (`.b`); the rows resolve; the lane file is untouched at the byte (re-read here); and
**the amendment is drafted and placed where the bounds send it, by the seat the bounds name.**
