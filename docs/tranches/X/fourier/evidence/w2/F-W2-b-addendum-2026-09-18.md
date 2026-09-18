SERVED MODEL: claude-opus-5[1m]

# X.F.W2 unit `.b` — DATED ADDENDUM-BESIDE, 2026-09-18

**Authority**: the owner's begin-word 2026-09-17 (`docs/tranches/X/COHESION.md` §0j).
**Standing**: an **E-3 ADDENDUM-BESIDE**. It amends **nothing**. `docs/tranches/X/fourier/waves/F-W2.md`
(dated 2026-08-28, repair rounds 1–12), `docs/tranches/V/megatranche/audit/probes/fourier-vizcolor-oklch.mjs`,
`docs/tranches/X/fourier/RULINGS-F.W2.md` and every adjudicated record are **IMMUTABLE and are not
edited by this unit**. Where a figure below diverges from a dated spec, the spec's bytes stand and this
file records the divergence **beside** them.

**Substrate.** fourier `f7fa1e3` on `m/w1-bump-migration`, worktree **0 dirty** ⟨cmd⟩
`git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | /usr/bin/wc -l` → `0`.
fourier installs `@mkbabb/value.js` **4.0.0**, `@mkbabb/glass-ui` **8.0.0**, `@mkbabb/keyframes.js`
`^6.0.0`. Every figure was **measured after this unit's edits had landed** and **reproduced on a second
run** (WRITE-THEN-MEASURE).

---

## §A — The `--viz-*` probe, RE-GROUNDED (finding F-1's root cure, colour half)

**The dated probe is not patched, not silenced, not skipped and not allowlisted.** It keeps its bytes and
stays a true reading of the pre-uplift tree. At today's tree it is stale in two independent ways, both
measured:

1. it **transcribes** the five token texts from `glass-ui@4.0.0` into its own source (`:47-57`), and
   fourier now installs **8.0.0** — a transcription is a frozen claim, not a reading; and
2. it **simulates `cssVarToHex`** (`:33-44`), the four-regex resolver `3bac3d5` **deleted** — ⟨cmd⟩
   `/usr/bin/grep -n 'cssVarToHex\|hslToHex\|rgbToHex' /Users/mkbabb/Programming/fourier-analysis/web/src/lib/colors.ts`
   → *(no output)*.

Its `5/6 tokens collapse to the #888888 fallback` is therefore **neither GREEN nor RED at this tree: it
is stale**, and a gate read off it would be read off a probe measuring a function that no longer exists.

The re-grounded probe is published **beside** it, dated, at
`docs/tranches/X/fourier/evidence/w2/fourier-vizcolor-oklch-2026-09-18.mjs`. It asks the same question at
today's bytes, in three legs — ⟨cmd⟩ `node docs/tranches/X/fourier/evidence/w2/fourier-vizcolor-oklch-2026-09-18.mjs`
→ **exit 0**, double-run byte-identical:

| leg | the dated probe | the re-grounded probe | measured |
|---|---|---|---|
| 1 | five token texts **typed into the probe** from a 4.0.0 read | the producer's **shipped** declarations, read from glass-ui 8.0.0's own three token files ⊕ fourier's own `style.css`, parsed by value.js's own `parseStylesheet` | **5 `--viz-*` tokens**, both arms, printed with their authored text |
| 2 | a transcription of the deleted regex resolver | **what value.js resolves WITHOUT a cascade** | **5 context-free · 4 require the engine** |
| 3 | — (the dated probe has no live leg) | the **used value** of each token at both schemes, read through a real probe element, converted by `parseCssColor` + `toRgba8` exactly as the landed `colors.ts` does | **0/10 collapse to `#888888`**; distinct hues **light 5/5, dark 5/5** |

**Leg 2 is the measurement that retires the string-matching resolver by construction rather than by
assertion.** The four tokens that need the engine are not a parser weakness — they are not colours:

```
CASCADE   :root  --viz-fourier    light-dark(oklch(0.579 0.201 30.4),oklch(0.693 0.151 28.1))  ->  css_syntax (["CSS color"])
CASCADE   :root  --viz-green      light-dark(oklch(0.551 0.088 171.1),oklch(0.776 0.105 172.6))  ->  css_syntax (["CSS color"])
```

and, for the alias arm, value.js names the reason in its own diagnostic vocabulary — ⟨cmd⟩
`node -e "…parseCssColor('var(--section-color-5)')"` → `ok:false`, code **`color_context_required`**,
expected **`["context-free color"]`**. **No parser reaches the right `light-dark()` arm without the
engine, because which arm is correct is a fact about the document, not about the string.** That is
R-ii's partition — *the producer resolves the cascade, value.js parses and converts the string the
cascade returns* — arrived at by measurement rather than by citation.

**Leg 3 is GREEN and this unit claims none of it** (FR-GIG-5). G3's green owner is **F.W1** (the banked
`fr-BasisCanvas` D-1/BC-1/C-1 identity, landed at `3bac3d5`/`538db90`). What `.b` owns is the deletion of
the arms that caused the RED, and the probe that can tell the difference.

**Live leg 3, verbatim**:

```
  ok   light --viz-fourier    used=oklch(0.579 0.201 30.4)  -> #d73523
  ok   light --viz-chebyshev  used=oklch(0.484 0.163 265.5) -> #3156b9
  ok   light --viz-legendre   used=oklch(0.532 0.18 317.5)  -> #9541af
  ok   light --viz-green      used=oklch(0.551 0.088 171.1) -> #30826b
  ok   light --viz-amber      used=rgb(157, 101, 21)        -> #9d6515
  ok   dark  --viz-fourier    used=oklch(0.693 0.151 28.1)  -> #eb7366
  ok   dark  --viz-chebyshev  used=oklch(0.718 0.107 268.4) -> #88a1e7
  ok   dark  --viz-legendre   used=oklch(0.739 0.134 318.1) -> #ce8ee1
  ok   dark  --viz-green      used=oklch(0.776 0.105 172.6) -> #66ccaf
  ok   dark  --viz-amber      used=rgb(232, 185, 109)       -> #e8b96d
```

**The banked `#888888` reading is answered, not argued with**: the pre-uplift probe said Fourier =
Chebyshev = Legendre = grey (K-12); at the adopted pin they are `#d73523` · `#3156b9` · `#9541af`.
**The probe is REQUIRED to look**: if the app is unreachable it exits **2 INCONCLUSIVE** and never 0 — a
probe that passes when it cannot see is the defect F-1 names.

---

## §B — G12: the π probe pair, and exactly what it witnesses

**Four artefacts, at §2a's own create paths, force-added past `.gitignore:34 *.png`** (⟨cmd⟩
`/usr/bin/sed -n '34p' /Users/mkbabb/Programming/value.js/.gitignore` → `*.png`):
`docs/tranches/V/megatranche/audit/probes/app-wave/fourier-viz-{light,dark}-{before,after}.png`,
1280×900 at `deviceScaleFactor: 2`, ONE headed evaluate per phase, both schemes in one pass — **probe
parsimony binding** (owner edict): two browser launches in total, before and after, and no exploratory
navigation.

**The R-5 cascade lock, confirmed on the readback of every frame**:

| scheme | `--viz-fourier` as the cascade declares it | expectation | verdict |
|---|---|---|---|
| light | `light-dark(oklch(0.579 0.201 30.4),oklch(0.693 0.151 28.1))` | *`light-dark(` in LIGHT* | **met** |
| dark | `oklch(0.693 0.151 28.1)` | *`oklch(` in DARK* | **met** |

**"The divergence, not the greyness, is the diagnostic" — the chrome is correctly coloured in the same
frame**: the brand ink measured in-frame is `rgb(157, 101, 21)` light and `rgb(232, 185, 109)` dark, i.e.
`--viz-amber` at each pin, in the same evaluate that read the instrument.

**Three things this pair does NOT witness, stated rather than implied:**

1. **The gate's DELTA cell — *"four grey curves → four distinct hues"* — is F.W1's delta, discharged at
   `3bac3d5` before F.W2 opened.** It is not re-capturable as a "before" at this seat without reverting
   a landed commit, which no gate licenses. §A's leg 3 is the honest witness of that delta, and it is
   green.
2. **The curves themselves are not in frame.** `/equation` computes through the FastAPI backend, which
   requires MongoDB; the docker daemon is down at this host — ⟨cmd⟩ `docker info` → *"Cannot connect to
   the Docker daemon"* — and booting a database is not a parsimonious probe. The frames carry the
   chrome, the token cascade and the app shell; the compute panel reads *"Computation failed"*, and that
   is visible in both phases rather than cropped out.
3. **The amber cut's own pixels are not in frame either.** `ContourEditorCanvas` renders only behind
   `store.contour`, which is backend-extracted. §C measures that cure numerically instead, at the live
   cascade.

**What the pair DOES prove is the wave's own goal criterion.** The before and after frames are
**byte-identical** — ⟨cmd⟩
`shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/probes/app-wave/fourier-viz-*.png`
→ `29a469008cf5a94f…` for **both** light frames and `baea05f51e1ef60c…` for **both** dark frames.
The ACT(2) migration (`hexToRgba` deleted, five call sites joined on one source)
changes **no pixel** of the shimmer surfaces it touches: *"the curve and colour a user sees is provably
the one that shipped before."* A pair that differed here would have been the defect.

**Residual, declared OUTBOUND to SS-13 (UNPROVEN-NEEDS-LIVE), never worked around**: the contour
editor's nine cured paint sites and the convergence plot's curves want a live frame with backend data.
That is SS-13 item 1's own posture (*"G12's π probe pair … probe parsimony is binding"*) and it travels
as this unit's residual, not as a claim.

---

## §C — B1's contrast cure, measured at the live cascade

The banked cure — *"`stroke="var(--viz-amber)"`, alpha via `stroke-opacity` → 4.625:1 at both pins"* —
re-measured at the **adopted** glass 8.0.0 pin, composited over `--card` (the surface both contour
components paint on), sRGB relative luminance, WCAG 2 ratio:

| | light | dark |
|---|---|---|
| `--card` (used) | `rgb(253,245,236)` | `rgb(53,42,34)` |
| the retired inline amber at `0.85` | **1.627:1** | 5.724:1 |
| `--contour-stroke` at `0.85` (the spline stroke as shipped) | **3.469:1** | 6.013:1 |
| `--contour-stroke` at full alpha (the control-point stroke) | **4.517:1** | 7.699:1 |

**SC 1.4.11's 3:1 non-text bar is cleared at the shipped alpha in both schemes**, where the retired
literal failed it in light by a factor of two. **Two divergences from the banked figures, recorded and
not averaged** (D-19): the bank's **1.660:1** reproduces here as **1.627:1** and its **4.625:1** as
**4.517:1 at full alpha** — both measured against glass **8.0.0**'s `--card`, where the bank measured
against **4.0.0**'s. The *direction, the magnitude and the ruling are unchanged*; only the third digit
moved, and it moved because the pin did.

---

## §D — Findings this unit adds to the record

- **F-b1 · value.js 4.0.0's `parseStylesheet` rejects the legacy comma form `rgba(r,g,b,a)`.** Minimal
  repro, at fourier's own installed copy — ⟨cmd⟩
  `node -e "…parseStylesheet('.dark{--x: rgba(0,0,0,0.3);}')"` → `ok:false`, `css_syntax`, `expected:
  ["scalar"]`, `actual: "rgba(0,0,0,0.3)"`; the modern `rgb(0 0 0 / 0.3)` form parses clean. It is not a
  custom-property quirk: `.dark{color: rgba(0,0,0,0.3);}` fails identically. Live consequence, measured:
  glass-ui 8.0.0's `dist/styles/tokens/dark-arm.css` (5,205 chars) does not parse, on its **first**
  declaration. **This is a value.js-side reciprocal for the X·V / V·π parser-seam program (§6b's row),
  not a fourier defect and not a gate of this unit** — routed to `.d`, which owns G9/G18 and the filing;
  `.b` claims no GREEN from it. The re-grounded probe reports the failure in its own output rather than
  swallowing it.
- **F-b2 · the 4.0.0 corrupt-stylesheet tail is GONE at the adopted pin.** `parseStylesheet` on
  glass-ui 8.0.0's `dist/styles/index.css` → **ok: true**, 1,514 chars — the file is now an `@import`
  manifest, not the 13,833-char sheet whose tail was prose (G14/G18's `css_syntax` at chars
  12396–13833). **F.W0 and F.W1 own those gates; this is context for their record, claimed by nobody
  here.**
- **F-b3 · "mint `--contour-stroke` once" landed as ONE token declared at TWO roots, and the reason is
  measured.** §2a's bounds name exactly two files and no stylesheet, and the two components have **no
  shared ancestor**: `ContourEditorCanvas` mounts under `VisualizationView.vue:204` **and** standalone
  under `FullscreenViewer.vue:115`, while `ContourPreview` mounts under `VisualizationView.vue:257`
  only — ⟨cmd⟩ `/usr/bin/grep -rn "ContourPreview\|ContourEditorCanvas" /Users/mkbabb/Programming/fourier-analysis/web/src/`.
  A single `:root` mint inside either SFC would make the other component's colour depend on an unrelated
  module being loaded — the invisible coupling this wave exists to kill. **ONE token, ONE definition
  (`var(--viz-amber)`), NINE cured sites, TWO declaration sites**, each at the root of an independently
  mountable surface. Recorded as a divergence from the spec's word *once*, with its reason, rather than
  quietly satisfied.
- **F-b4 · `fr-ContourPreview` row 22's banked *ten* against the tree's nine** stands as the banked
  divergence it is (R-i §1.4.2; F-6 in the wave record). This unit cured **nine** — ⟨cmd⟩
  `/usr/bin/grep -c 'hsl(40' …/ContourPreview.vue …/ContourEditorCanvas.vue` → `1` + `8` before,
  `0` + `0` after — and **minted no eleventh reading**.
- **F-b5 · the wave's `colors.ts` figures moved again and are restated at the measured value** (G-12,
  no superseded figure carried forward as current): the spec's **117** lines became **182** at F.W1's
  `3bac3d5` and are **192** after this unit's commit — ⟨cmd⟩
  `/usr/bin/wc -l < /Users/mkbabb/Programming/fourier-analysis/web/src/lib/colors.ts` → `192`. The file
  grew while its hand-rolled colour surface shrank: two exported arms deleted, one residual declared
  with its deletion date, and the rest is the docblock that names the date.
