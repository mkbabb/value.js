SERVED MODEL: claude-opus-5-5[1m]

# Glass-forward ask — the blob's colour resolver and WebGL2 drawing buffer declare `display-p3`

**Row**: CC-061 · MT-F032 · gate **h1** (`W6.md` §5 X.W6.h, as restated by COHESION §0z **E6** and the
`W6.md` addendum 2026-09-19).
**Dated**: 2026-09-22, branch `tranche-u`, against installed `@mkbabb/glass-ui` **7.0.0** and the
read-only producer tree at `../glass-ui` (`9.0.0`, HEAD `9025efe2`).
**Direction**: consumer (value.js) → producer (glass-ui). **glass-ui is READ-ONLY, ALWAYS** — this is a
letter; no byte of the producer tree was written to author it.
**Authority**: COHESION §0z E6 — *"The root cure widens the ceiling, not the tolerance: the blob's colour
resolver and its WebGL2 drawing buffer declare `display-p3` where the display offers it
(`matchMedia('(color-gamut: p3)')`, `gl.drawingBufferColorSpace`, a `display-p3` 2D resolver canvas) and
fall to sRGB otherwise."* `W6.md` §3a — a cure that needs a glass-ui change *"halts and files the ask, it
does not grow local mechanics."* Check 2 (2026-09-22) register #2 names this letter as owed.

---

## 1. The owner's words and what the consumer half measured

Owner, OM-6: *"The blob current color is not nearly vibrant enough."* The h2 census
(`W6-blob-pipeline-census.md`, `48d95650`) measured no stripper: every stage delivers 100.0% of the
chroma **sRGB** allows at the lightness it lands on, and the owner's seed `lab(92% 88.8 20)` is
**12.94×** outside sRGB at its own lightness. The ceiling is the drawing buffer's gamut.

The consumer half of E6 is now an oracle: `npx playwright test e2e/smoke/webgl-blob-idle.spec.ts -g
"hero blob carries current chroma" --project=smoke` (headless chromium, `(color-gamut: p3)` read and
printed → **srgb**) — painted dominant chroma vs the current colour's chroma css-color-4 §13
gamut-mapped to sRGB, stated ΔC 0.04. **GREEN ×2** at three seeds (ΔC 0.0258 / 0.0050–0.0066 /
−0.0204–−0.0255); the ×0.3 ghost negative control reds at −0.108 / −0.173
(`W6-evidence/blob/h1-*.txt`). So on an sRGB buffer the blob already carries all the chroma the buffer
can hold. What the owner is missing on a P3 display is the chroma between the sRGB and the P3 ceilings
— and only the producer can paint it.

The headroom P3 would add, at held L and h (css-color-4 §13, the library's `mapColorToGamut`):

| seed | C, sRGB-mapped | C, display-p3-mapped | gain |
|---|---|---|---|
| `lab(92% 88.8 20)` (OM-6) | 0.02105 | 0.02768 | +31% |
| `oklch(0.65 0.3 150)` | 0.17901 | 0.24975 | +40% |
| `oklch(0.55 0.37 328)` | 0.25325 | 0.27659 | +9% |

⟨cmd⟩ `node --input-type=module -e "…mapColorToGamut(p,'srgb'|'display-p3')…"` against `dist/subpaths/color.js`.

## 2. The census — the producer paints sRGB at three sites (read-only)

| # | site | today |
|---|---|---|
| 1 | the base-colour resolver — `glass-ui/src/components/blob/composables/blobSimulation.ts:78` | `oklchToGammaRgb(cssToOklch(css))` — a per-channel clip into **gamma sRGB** (at the OM-6 seed: L 0.958 → 0.786, hue 9.83° → 349.50°) |
| 2 | the WebGL2 context — `glass-ui/src/composables/glass/webgl/useWebGLCanvas.ts:178` | `canvas.getContext("webgl2", contextAttrs ?? undefined)`; **no `drawingBufferColorSpace`** is ever set, so the buffer is the default `"srgb"` |
| 3 | the shader uniforms — `uBaseColor` + `uPalette[MAX_BLOB_STOPS]` (installed `dist/blob.js`) | `vec3`, documented *"uploaded GAMMA sRGB"*, plus the in-shader `gamutClampOklch` (sRGB bisection) |

⟨cmd⟩ `grep -rl drawingBufferColorSpace node_modules/@mkbabb/glass-ui/dist | wc -l` → **0** (7.0.0).
⟨cmd⟩ `(cd ../glass-ui && grep -rn drawingBufferColorSpace src | wc -l)` → **0** (9.0.0, `9025efe2`).
⟨cmd⟩ `grep -rn 'getContext("webgl2"' demo/ | wc -l` → **0** — the consumer owns no GL context; no
consumer byte can declare the buffer's colour space.

## 3. The ask

One primitive-level change, sRGB-safe by construction:

1. **Buffer.** Where `matchMedia("(color-gamut: p3)").matches` and the context supports it, set
   `gl.drawingBufferColorSpace = "display-p3"` (and `unpackColorSpace`) on the blob's WebGL2 context —
   and the WebGPU twin's `colorSpace: "display-p3"` in `configure()` — else keep `"srgb"`.
2. **Resolver.** Resolve the base colour and the palette stops into **the buffer's space**, gamut-mapped
   by css-color-4 §13 (L and h held, chroma reduced), never by a per-channel clip — the clip moves L
   and rotates hue (site 1's reading).
3. **Uniforms + clamp.** Declare the uniforms' space as the buffer's, and bound `gamutClampOklch` by
   the buffer's gamut rather than sRGB.
4. **Expose it.** Surface the buffer's resolved space on the `Blob` instance (e.g. `colorSpace:
   "srgb" | "display-p3"`), so a consumer oracle reads it instead of inferring it from media queries.

**Falsifier (two-way, like d2/e1).** The consumer oracle reads `drawingBufferColorSpace` off the
blob's own WebGL2 context on every run and gamut-maps its target to **that** space. Once this ships,
on a P3 display the target becomes the P3-mapped chroma and the arm must stay within ΔC 0.04 of it; if
the producer declares P3 but still clips through sRGB, the painted chroma stays at the sRGB ceiling
and the arm goes RED against the P3 target. The letter cannot pass on prose. (Caveat: a P3 cell must
also read its frame in P3; headless chromium's screenshot is sRGB, which is right for this cell.)

## 4. What this letter does NOT claim

No safari-app property (I-20), no perf or bundle property (`W6.md:369`), and no reading on a real P3
display: headless chromium reports `(color-gamut: p3)` → false, so this cell measures the sRGB half
only. The consumer does not gamut-map on its own side of the `<Blob :color>` seam either. At the
OM-6 seed that would swap the producer clip's C 0.149 at L 0.786 for C 0.021 at L 0.958 — a *less*
vibrant bead — and it did not move h1's core reading (measured 0.0477 → 0.0481 in the working tree,
never committed). A cure that works against the owner's words is not a cure.
