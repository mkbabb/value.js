SERVED MODEL: claude-opus-5[1m]

# ESC-W9e-SHARMA-NO-SUBJECT — the 34-pair Sharma table has no subject on the 4.x surface

**Raised by**: X-W9.e (oracle truth, coverage truth, packed-surface truth).
**Against**: `W9.md` §Agent Units `X.W9.e` :254-255 — *"restore external reference vectors for the
v4 conversion API … **plus the 34-pair Sharma CIEDE2000 table**"*.
**Status**: cure **named, not performed**. No substitution was made; nothing was skipped, stubbed,
allow-listed or wrapped. The rest of the unit landed.

---

## 1. What the instruction asks for

The Sharma, Wu & Dalal (2005) supplementary dataset is the 34-pair **certification table for a
CIEDE2000 implementation**: each row is `[L1,a1,b1, L2,a2,b2, ΔE00]`. Its subject is a function that
takes two CIE Lab colours and returns a colour-difference scalar. The U.W-ORACLE lane's record
(`docs/tranches/U/audit/oracle/color-anchors/README.md`, §U-F73) names that subject explicitly:
`deltaE2000`, imported by `test/units/color/color-difference.test.ts` from
`@src/units/color/difference`.

## 2. The subject does not exist on the 4.x surface — measured

⟨cmd⟩ `grep -rniE "ciede|delta_?e|colou?rDifference" src/ | wc -l` → **0**

⟨cmd⟩ `node -e` over `dist/subpaths/color.js` — the complete runtime export list of `./color`
(23 names, sorted):

```
a98Rgb convertColor displayP3 hsl hsv hwb ictcp interpolateHue jzazbz kelvin lab lch
linearSrgb mapColorToGamut mixColors oklab oklch prophotoRgb rec2020 rgb safeAccentColor
toRgba8 xyz
```

**None is a colour-difference metric.** Nor is one present on any of the other six subpaths:
`./value` (1), `./css` (19), `./easing` (16), `./math` (9), `./transform` (3), `./quantize` (2) —
73 runtime names in total, enumerated in `coverage-by-export.md`.

The deletion is dated and attributable, not an oversight of this wave:

⟨cmd⟩ `git log --oneline --all --diff-filter=D -- src/units/color/difference.ts`
```
164343c1 feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees
7334c793 feat(package-v4): cut the exact-seven immutable capability surface
```

⟨cmd⟩ `git show 7334c793 --stat -- src/units/color/difference.ts test/units/color/color-difference.test.ts`
```
 src/units/color/difference.ts             | 243 ------------------------------
 test/units/color/color-difference.test.ts | 193 ------------------------
 2 files changed, 436 deletions(-)
```

`deltaE2000` left the tree **with its module** at the exact-seven cut, fifteen months before this
wave's spec was authored. The spec's sentence was written against the U-era surface the README
describes, and the README is an immutable audit record (E-3) that still describes it truthfully for
its own epoch.

## 3. Why no substitute was written

Three shapes were considered and each is a defect this wave exists to outlaw:

1. **Transcribe CIEDE2000 into the test file and assert the 34 pairs against it.** The table would
   then certify the *test's own* arithmetic; value.js would not appear in the assertion at all. That
   is an oracle with no subject — L-19 contrivance, and the exact mirror of the circular oracle at
   `v4-color-behavior.test.ts:66` that this unit's G18 exists to delete. Writing one while deleting
   the other would be incoherent.
2. **Ship `deltaE2000` on `./color` so the table has something to bind.** Adding a public export is
   a **surface decision**, not a test repair. `src/color/**` is not in this unit's writable set, the
   4.1 ship list is `X-W9.f`'s and is closed (`SCI-1`, `toHex`, `easingNames()`, memoised `easing()`,
   the restored analytic arms), and G22/G29 bind that list. An implementer may not widen it.
3. **Carry the 34 rows as inert data with no assertion.** A committed table no gate reads is dead
   weight the close would have to discover; it also invites a later seat to bind it to a re-derived
   expectation.

## 4. The cure, named

One of the following, and it is an **adjudication**, not an implementer's act:

- **(i)** Rule the Sharma clause **SUPERSEDED-BY-THE-V4-CUT** by dated addendum-beside: the class it
  covers (colour difference) left the published surface at `7334c793`, so its oracle leaves with it.
  G18 is then read on its own falsifier — *"re-derive an expected value from the implementation; the
  anchor file's committed vectors no longer bind"* — which this unit turns GREEN with four external
  families (culori `xyz65`, culori `lab`-D50, Ottosson OKLab, culori `itp`), each measured binding.
- **(ii)** Name a writer for a **`deltaE2000` (or `deltaEOK`) export on `./color`** and fold it into
  `X-W9.f`'s one dated cut, with the 34-pair table landing beside it as that export's certification.
  This adds a name to the 4.1 surface and therefore touches G21/G22/G29's tuple and `X-W9.i`'s
  packets; it is a ship decision with consumer consequences.

Until it is ruled, the Sharma half of §X.W9.e's mechanism is **unperformed and recorded**, and no
number, table or assertion stands in its place.
