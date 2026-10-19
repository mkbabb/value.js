SERVED MODEL: claude-opus-5-5[1m]

# Glass-forward ask — a strip-scale aurora motion primitive for the gradient selector

**Row**: CC-064 · MT-F041 · gate **e1** (`W6.md` §5 X.W6.e).
**Dated**: 2026-09-22, branch `tranche-u`, against installed `@mkbabb/glass-ui` **7.0.0**.
**Direction**: consumer (value.js) → producer (glass-ui). **glass-ui is READ-ONLY, ALWAYS** — this is a
letter; no byte of the producer tree was written to author it.
**Follows**: the early notice **B-1** in `valuejs-outbound-2026-07-28-o18-watercolor-toggle-loupe.md`
§B — *"If the wave mechanism lands as a variant of your aurora/gradient primitives rather than
demo-side, a follow-up ask will carry the exact shape."* This is that follow-up.
**Authority for the branch**: `W6.md` X.W6.e — *"If the wave mechanism proves to belong inside the
glass gradient/aurora primitive, it leaves as a marked BJ ask (same two-way falsifier as d2)."*
**Machine oracle**: `npx playwright test e2e/smoke/views/gradient.spec.ts -g "gradient selector aurora"`.
It re-runs the census in §2 on every run and **reds the day a fitting primitive ships** — so this letter
cannot outlive the fact that justifies it — and it reds equally if the wave animates the ramp locally.

---

## 1. The mandate, verbatim

Owner, 2026-07-28 (MT-F041): *"let's plan to add a bit of dyannism to the gradient selector--it should
become a SUBTLE aurora insofar as the gradient waves a bit."* Standing constraints (`W6.md` X.W6.e):
consume the shared field/motion law from `@mkbabb/glass-ui/aurora`; **no new animation species**; **no
private rAF loop**; PRM honoured **structurally** (declared inside
`@media (prefers-reduced-motion: no-preference)`), never by leaning on the global reduce guard.

## 2. The census — why no published primitive fits (re-run by the gate)

`@mkbabb/glass-ui` **7.0.0**, 74 published subpaths. `./aurora` (`dist/components/aurora/index.d.ts`,
sha256 `6c9b1bce53361513260ccea723826dd724604d6cc220a58383856f0c1694466d`) publishes:

| export | what it is | fits a strip wave? |
|---|---|---|
| `Aurora` (component) | the full-field painterly background: one WebGL2 canvas sized to its container | **no** — see (a), (b) |
| `useAurora`, `createAurora`, `useCursorInteraction` | the WebGL runtime and its pointer bridge | **no** — the same substrate |
| `resolveRenderMode`, `isSoftwareWebGLRenderer` | the substrate selector (`"webgl" \| "css" \| "auto"`) | — (a guard, not a surface) |
| `deriveAurora`, `paletteToCssGradient`, `cssToOklch`, `flattenPalette`, … | colour helpers: palette derivation and a **static** CSS gradient string | **no** — no motion |
| `auroraFallbackGround`, `sampleAuroraField`, `nucleiFieldStatic` | the **static** first-frame ground | **no** — no motion |
| `DEFAULT_AURORA_CONFIG`, atoms, presets | configuration | — |

And the stylesheet: `grep -rhoE '@keyframes [a-z-]*aurora[a-z-]*' dist` → **0**. The aurora motion
vocabulary exists **only** inside the WebGL runtime.

Three measured facts close the local routes:

- **(a) The CSS substrate is still.** `renderMode.d.ts`: a software rasteriser takes the `"css"`
  substrate — *"the static gradient placeholder"* — by the producer's own safe default, and the named
  escape `forceWebGLUnderSoftwareRaster` exists *"for a deterministic test that ACCEPTS the
  per-composite raster cost"*, not for a product surface. A strip that waves only on a GPU is a strip
  that never waves on the smoke cell and on every GPU-blocklisted device (value.js's own
  `o26-aurora-perceptibility` records the same: the atmosphere is a still under headless GL).
- **(b) A second full-field WebGL canvas per gradient pane** is a second GPU context on the route that
  already hosts the atmosphere's — for a ~40 px strip.
- **(c) The rail's one-axis law forbids moving the ramp.** The gradient rail paints each colour at the
  ordinal its handle sits on (X.W6.a a3/a4; X.W6.c c2: the ghost, the caret and the rail agree to the
  sample). A wave that displaces colour along the axis would put a colour under a handle that does not
  own it. The motion therefore has to live on an axis the ordinal does not — a veil, a luminance drift,
  a silhouette — which is a new primitive, not a configuration of `Aurora`.

A consumer-side cure would therefore mint either a new `@keyframes` species (banned) or a private rAF
loop (banned). **The mechanism belongs to the producer.**

## 3. The ask

A **strip-scale aurora motion primitive** in `./aurora` (or a sibling subpath), one of:

1. **`<AuroraStrip>`** — wraps a caller-supplied background (a CSS gradient string, or `OklchStop[]`)
   and overlays the aurora field's drift as a **veil** that never displaces the caller's colours along
   the strip's long axis (luminance / chroma breathing, or a gently waving silhouette); or
2. **a utility + keyframes pair** (e.g. `glass-aurora-drift`) applicable to any element as an extra
   background layer, with the drift's tempo and amplitude from the motion tokens (`--motion-tempo`,
   the aurora breath).

Either way, the contract we need:

- a **CSS substrate that moves** (no WebGL context per strip), so the wave exists on every renderer;
- motion declared **inside `prefers-reduced-motion: no-preference`** in the producer's own stylesheet
  (still, not merely slowed, under reduce);
- subtle by default (the owner's word), with one documented amplitude knob;
- no colour displacement along the long axis (the one-axis law above).

**Consumer commitment**: value.js composes it on the gradient rail (`GradientStopEditor.vue`'s
`.gradient-rail`) and nowhere else in this wave; the e1 oracle then flips to the composing branch and
measures the motion as a settled-frame delta at a fixed colour.

*Sent by the value.js X-W6 wave (Repair 1), 2026-09-22. Reply folds per E13.*
