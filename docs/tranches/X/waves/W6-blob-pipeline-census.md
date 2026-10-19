SERVED MODEL: claude-opus-5[1m]

# X.W6.h — the HeroBlob chroma pipeline census

**Row**: CC-061 · MT-F032 · gate **h2** (`W6.md:291`).
**Dated**: 2026-09-19, branch `tranche-u`, against the installed
`@mkbabb/glass-ui@7.0.0` and the working tree.
**Authority**: `W6.md:284` — _"measure the pipeline before cutting — the row's own law … The
cure cuts at the measured stripper, not at the first plausible one."_
**Machine oracle**: `node docs/tranches/X/gates/gate-blob-pipeline.mjs`. Every figure below is
re-derived by that gate on every run and the gate reds if any one of them drifts from the bytes.

---

## 0. The verdict, first

**The spec's three candidate strippers were measured. None of them is a stripper.**

Every stage of the pipeline delivers **100.0% of the chroma sRGB allows at the lightness it lands
on**. The chroma the owner is missing is not being thrown away by a stage — it is **not
representable**: at the owner's own case the current colour sits **12.94× outside the sRGB gamut at
its own lightness**.

What the stages differ in is **which lightness they land on**, and that difference is worth **7.1×**
in delivered chroma. That — the lightness policy, not a stripper — is where `.h` must cut.

---

## 1. The pipeline as it actually runs

Read at the bytes, `HeroBlob.vue`:

| #   | stage                    | site                                                                                                                                | what it does to chroma                        |
| --- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 0   | the seed                 | `cssColorOpaqueFrame` → `cssToOklch(css)` (`:119`)                                                                                  | parse only, no loss                           |
| 1   | **the base-colour clip** | `<Blob :color="cssColorOpaque">` (`:15`) → the producer's `defaultBlobColorResolver`, measured to be `oklchToGammaRgb ∘ cssToOklch` | per-channel clip into gamma sRGB              |
| 2   | **the palette derive**   | `deriveBlobPalette(css, {stopCount:4, harmony:"analogous", chromaCeiling: max(0.16, seed.C)})` (`:120-125`)                         | picks four (L,h) and saturates each           |
| 3   | the lightness floor      | `floorStops(...)` (`:62-77`)                                                                                                        | **writes `L` only** — `{...s, L: clamp(...)}` |
| 4   | the upload format        | `.map(oklchStopToHex)` (`:126`)                                                                                                     | 8-bit hex quantisation                        |
| 5   | the shader               | `uBaseColor` + `uPalette[4]`, both **gamma sRGB `vec3`** (producer `blob.js`), with an in-shader hue-preserving `gamutClampOklch`   | consumes an already-sRGB payload              |

---

## 2. Candidate 1 — the 1×1-canvas 2D resolver · **OFF THE CHROMA PATH**

`W6.md:284` names `useContrastSafeColor.ts:101-102` (`fillStyle` + `fillRect(0,0,1,1)`) as a
candidate. It is a real sRGB clamp and it was measured in a real browser — but **it is not on the
blob's chroma path at all.**

`HeroBlob.vue:42` imports exactly one name from that module, `resolveSurfaceLightnessLive`, and its
sole consumer is `floorStops`, which returns `{ ...s, L: clamp(s.L + push, 0.02, 0.98) }` — **`C` and
`h` are passed through untouched**. A resolver that can only move lightness cannot strip chroma.
The gate re-checks both facts structurally on every run (leg L4), so the day someone routes colour
through that door the census is wrong **on the record** rather than quietly.

**The browser reading, taken anyway** (banked at `W6-evidence/blob/canvas-clamp-2026-09-19.txt`,
chromium, `about:blank`, the dual-ground draw copied from `useContrastSafeColor.ts:99-110`):

| seed                      | canvas →           | C after | ΔC     |
| ------------------------- | ------------------ | ------- | ------ |
| `lab(92% 88.8 20)`        | `rgb(255 143 200)` | 0.14949 | −45.1% |
| `oklch(0.65 0.30 150)`    | `rgb(0 186 0)`     | 0.23260 | −22.5% |
| `color(display-p3 0 1 0)` | `rgb(0 255 0)`     | 0.29483 | −20.0% |
| `oklch(0.55 0.37 328)`    | `rgb(210 0 216)`   | 0.28244 | −23.7% |

This **reproduces `W6.md:291`'s figure** — the spec measured `rgb(255 143.38 199.64)` → C 0.14868
and −45.4%; the difference is the 8-bit quantisation of a `getImageData` read against the spec's
fractional triple. The spec's arithmetic was right. Its **attribution** was not: the identical clamp
the spec attributes to `useContrastSafeColor.ts` is performed on the blob's path by the **producer's
own** `defaultBlobColorResolver`, which measures byte-for-byte the same — `oklchToGammaRgb(seed)` →
`[1, 0.5608, 0.7843]` → `rgb(255 143 200)`.

---

## 3. Candidate 2 — `deriveBlobPalette` / `cssToOklch` · **NOT A STRIPPER (measured)**

The raw numbers invite the conclusion that this is the stripper: seed C **0.27245**, derived stops
**0.08795 · 0.03877 · 0.00971 · 0.00988** — a 67.7% loss on the best stop and 96.4% on the worst.

**That reading is false, and this is the census's central measurement.** Against the sRGB chroma
ceiling at each stop's _own_ (L, h) — binary-searched with `gamutMapStop` as the oracle:

| stop | L      | h      | C       | sRGB ceiling at (L,h) | headroom used |
| ---- | ------ | ------ | ------- | --------------------- | ------------- |
| 0    | 0.8683 | 345.83 | 0.08795 | 0.08795               | **100.0%**    |
| 1    | 0.9283 | 1.83   | 0.03877 | 0.03877               | **100.0%**    |
| 2    | 0.9800 | 17.83  | 0.00971 | 0.00971               | **100.0%**    |
| 3    | 0.9800 | 33.83  | 0.00988 | 0.00988               | **100.0%**    |

Re-measured at three further seeds (`oklch(0.65 0.30 150)`, `color(display-p3 0 1 0)`,
`oklch(0.55 0.37 328)`): **100.0% of ceiling at every stop of every seed**. `deriveBlobPalette`
throws nothing away. It is already painting the most saturated colour sRGB has at the lightness it
chose.

**The consumer's one declared chroma lever is inert.** `HeroBlob.vue:124` passes
`chromaCeiling: Math.max(0.16, seed.C)`. Measured at ceilings **0.27245 · 0.400 · 1.000** the derived
chroma is byte-identical — because each stop is already at its gamut ceiling, so a ceiling above it
never binds. Raising that number can never make the blob more vibrant. (Gate leg L6 re-measures the
inertness every run and reds if a producer release ever makes the lever live.)

---

## 4. Candidate 3 — the shader's HSV perturbation · **DOWNSTREAM, AND ALREADY sRGB**

`uBaseColor` and `uPalette[MAX_BLOB_STOPS]` are declared `vec3` and documented in the producer's own
shader source as _"uploaded GAMMA sRGB, like `uBaseColor`"_. The shader additionally carries a
hue-preserving inward `gamutClampOklch` (16-step bisection, `L` and `h` fixed) — it can only ever
**reduce** chroma, never restore it.

So the shader receives an already-clamped sRGB payload through an sRGB-typed uniform. **No consumer
change can deliver wide-gamut chroma through this interface**; the interface is the ceiling. Stage 4
(`oklchStopToHex`) measures a maximum round-trip error of **|ΔC| ≤ 4.09e-4** — four orders of
magnitude below the deltas above, so the hex upload format is not the stripper either.

---

## 5. Where the chroma actually goes — and therefore where `.h` cuts

At the owner's case, `lab(92% 88.8 20)`:

| what                                                  | L          | C delivered | note                                                                              |
| ----------------------------------------------------- | ---------- | ----------- | --------------------------------------------------------------------------------- |
| the seed                                              | 0.9583     | 0.27245     | **12.94× outside sRGB at its own lightness**                                      |
| hue-**and**-lightness-preserving map (`gamutMapStop`) | 0.9583     | **0.02105** | the honest ceiling if L is held                                                   |
| the per-channel clip (stage 1)                        | **0.7862** | **0.14949** | 7.1× the above — by _moving L_                                                    |
| the palette derive's best stop (stage 2)              | 0.8683     | 0.08795     | 4.2× the above — by moving L                                                      |
| the palette derive's worst stops                      | 0.9800     | 0.00971     | the derive's own L ramp lands two of four stops where sRGB has **no chroma left** |

**The finding.** Chroma at the hero is a **function of the lightness each stage lands on**, and
nothing else. The one operator that ships the blob's palette toward L 0.98 — where the ceiling
collapses to ~0.01 — is the derive's analogous L ramp off a seed already at L 0.958, and the one
lightness operator the **consumer** owns on that path is **`floorStops` in `HeroBlob.vue`**
(in this wave's §4 bounds).

**What this census forbids.** `.h` may not cut at the 1×1-canvas resolver (off the path), at
`oklchStopToHex` (4.09e-4), or at the shader (sRGB-typed, clamp-only). Those were the three plausible
cuts and all three are measured wrong.

**What it says about h1.** `W6.md:290` asks that _"the painted blob's dominant chroma is within a
stated ΔC of the current colour's, at a high-chroma current colour"_, and `W6.md:293`'s own falsifier
reads _"h1 fails at any current colour whose chroma exceeds sRGB, which is exactly the owner's
case."_ Measured: at the owner's case the current colour's chroma exceeds sRGB by **12.94×**, and the
canvas the blob paints into is sRGB-typed at the producer's uniform. **h1 as written is unsatisfiable
on this canvas for the case it names** — no ΔC statement can be met. That is a finding for `.h` and
for X-W10's canon, not a licence: it is recorded here, the gate does not consume it, and **h1 stays
RED**.

---

## 6. Machine block — every figure the gate re-derives

```census
seed.C = 0.27245044
seed.L = 0.95832172
seed.ceiling = 0.02105312
seed.outsideFactor = 12.94109519
clip.C = 0.14948961
clip.L = 0.78617438
clip.headroomPct = 99.99999935
derive.maxC = 0.08794842
derive.minC = 0.00971201
derive.headroomPct = 99.99999883
hex.maxDeltaC = 0.00040912
gamutMap.C = 0.02105312
lever.inert = true
```

---

## 7. Scope, honestly stated (L-18 target 3)

- Every figure is **headless against the installed tree** (STALE-SERVER law, `W6.md:148`) except the
  §2 browser table, which is a chromium `about:blank` reading with its own banked transcript.
- The claim _"100.0% of ceiling"_ is scoped to **`deriveBlobPalette` at `harmony:"analogous"`,
  `stopCount:4`**, the only call shape `HeroBlob.vue` makes, measured at **four** seeds. It is not a
  claim about every harmony the producer ships.
- The claim _"the 1×1-canvas resolver is off the chroma path"_ is scoped to **`HeroBlob.vue`**. The
  resolver is used elsewhere in the picker for contrast work; this census says nothing about those.
- **No motion, bundle, perf or safari-app property is claimed** (`W6.md:369`).
