# Cohort wave specification — glass-ui 3.2.0 + keyframes.js 3.0.0

> **Mode: planning-only. NO code.** The cross-repo cohort spec the value.js-K tranche
> co-authors under paired-authorship (`coordination/glass-ui.md`; glass-ui open,
> fourier closed). Schedule + DAG: `audit/path-forward-2026-06-03-postW2.md §2`.
> Both peers are **actively worked-on**; this spec folds the value.js-K asks into
> their live tranches, it does not open new ones.

---

## Part A — glass-ui 3.2.0 (folds into glass-ui tranche **AS**)

glass-ui is on its **AS** sequence (HEAD `756acc…`+, `@3.1.1`; AS.W0–W2 done, W3–W6
planned). The value.js-K asks fold along three seams: **W-A → AS.W2** (gate-integrity,
where `proof:resolution` lives), **W-D/W-LIFT/W-DERIVE/W-ASKS → AS.W5** (the
re-derived primitive bundle), **the 3.2.0 publish → AS.W6**.

### W-A — contract-v2 resolution restoration (AS.W2, the headline; lands FIRST)
- Strike the `development` key from **all 68 exports** (revert the `6d3e151`
  exports-half) → `proof:resolution` **GREEN**. *Keep* the inv-K-2 OKLab-dedup half of
  `6d3e151` (sound, independent).
- Finish the K.W1 §3 peerDep promotion glass-ui half-did: **remove `@mkbabb/value.js`
  from `devDependencies`**, keep it **only** in `peerDependencies` (it is currently
  duplicated — `package.json:624` + `:607`; the §2.4 phantom-devDep residue). Refresh
  the `vitest.config.ts:9-13` "phantom devDep" note to "direct peerDependency,
  resolved via the exports map to dist".
- Make **`build:watch` emit dts** (combined JS + dts watch) so value.js's dist-resolved
  typecheck stays fresh — the W3 keystone correction (`build:watch` is JS-only today;
  dts is a separate `emit-types` step). This is the publisher-side half of K.W2.5 §3.

### W-D — dock-interaction focus-reachability (AS.W5)
The `:inert`-predicate realignment (NOT new CSS — that already ships at
`dock.css:420-424`): key `:inert` on `visualExpanded` (`GlassDock.vue:332,338` are on
raw `expanded`, diverging from `.layer-active`'s `visualExpanded` in always-expanded
mode); gate `layersVtStyle` (`:181-188`) behind reduced-motion + non-headless; no-op
the FLIP (`useLayerTransition`) under PRM. **This unblocks value.js's 16 dock-Select
e2e specs** (the green re-verify is a value.js K.W3 gate, after consuming 3.2.0).

### W-LIFT — the primitive lifts (AS.W5)
- **Metaballs = GooBlob** → `src/components/custom/goo-blob/` (subpath
  `@mkbabb/glass-ui/goo-blob`); **BlobDot = WatercolorDot** → `…/watercolor-dot/`.
- The **required injected color-resolver** seam (inv-K-3) — **NO value.js default** in
  the primitive (the demo injects `parseColorUnitToRgb01`).
- **D1 — the OKLCh GLSL shader** replacing the HSV `rgb2hsv/hsv2rgb` perturbation
  (`metaball.frag.glsl:93-106,146-157`) + the **edge-glow re-tune** (the `hsv.z`
  block at `:154-155` → an OKLab-L lift; W3 sub-risk). **Highest-risk item** (GLSL has
  no test runner — visual + a hue-stability gate at low chroma); book a separable
  follow-on commit if the kinematics+D2+D4 move lands first.
- the demand-driven RAF gate (D4), the shared WebGL bootstrap (`compileShader` etc.),
  and the **prng** prerequisite — all lifted glass-ui-side, value.js-free.

### W-DERIVE — `deriveAuroraPalette` producer (AS.W5)
Author `deriveAuroraPalette(baseRgb, opts): OklchStop[]` in
`aurora/composables/color.ts` on the post-dedup value.js OKLCh core (an analogous-fan
in OKLCh; consumes `srgbToOKLab`). Export from the aurora barrel. **Ships in 3.2.0 only
if value.js K.W4 commits a live consumer** (the VAL-1 ≥2 gate); else VAL-1 KILL.

### W-ASKS — the 4 net-new asks (AS.W5)
`Select size`, `DockSelectTrigger clampLabel`, `TooltipContent variant=mono`, `Button
size=icon-sm`. (Tabs-underline already ships; BlobDot/Metaballs subsumed by W-LIFT.)

### W-PROOF — the proof:* sweep (AS.W2)
Sweep the **overfit** `proof:*` battery per the retired-idiom decision — **but KEEP
`proof:resolution`** (the contract-v2 gate that *caught* this very violation; it is
structural, not overfit). Be precise per script: keep `proof:resolution`; sweep the
grep-class ones (theme/phantom-classes/vt-names/consumers-static/etc.).

### AS.W6 — the single 3.2.0 publish
One `3.1.1 → 3.2.0` cut, **made against the published value.js 0.11.0** (Part-B), so
the aurora `cssToOklch` cast (`color.ts:122`) deletes *in this cut* (not a 3.2.1). The
dist carries W-A + W-D + W-LIFT + W-DERIVE\* + W-ASKS + the aurora cast-delete. Publish
via the changesets + `--provenance` flow.

---

## Part B — keyframes.js 3.0.0 (folds into keyframes tranche **A**)

keyframes is at **2.2.0** (the grand-audit flagged this as a **breaking-change-shipped-
as-MINOR semver violation**). 3.0.0 is the **correction**, not new feature work.

- **3.0.0-i — the semver correction.** Cut `3.0.0` for the already-shipped breaking
  change. **Changesets-driven** + `--provenance` (the constellation publish discipline).
- **3.0.0-ii — WAAPI `linear()` is ALREADY SHIPPED** (`waapi.ts:171` is a `?? "linear"`
  fallback once spring `linear()` stops reach the easing field; `springTimingFunction.ts:117`
  + the engine test exist). **Not** pending work — record it as landed, not a 3.0.0 ask.
- **3.0.0-iii — vue-router 5 anchor.** keyframes is already on `vue-router ^5.0.7`;
  it **leads** the ESM-major; value.js K.W5's router 4→5 bump *follows* it (the SOLE
  keyframes-gated value.js item).
- **3.0.0-iv — native CF Pages migration** (off the legacy GH-Pages `peaceiris` path;
  the grand-audit deploy finding).
- **VAL-9 is KILLED** (the spring emitter `springLinearStops`/`springTimingFunction`
  already ships and glass-ui consumes it via `regen-spring-tokens.mjs`) — keyframes
  3.0.0 needs **no** "spring emitter" work; do not invent it.
- **keyframes `A.md` AMENDMENT needed**: it does not yet carry the 3.0.0 semver verdict,
  the CF-Pages migration, or the VAL-9-already-ships disposition. File the amendment in
  the keyframes A tranche.

---

## Part C — the cross-repo dependency chain (the load-bearing serial spine)

```
value.js 0.11.0 (Part-B: parseCSSColor tighten + parseColorUnitToRgb01)
        │  (glass-ui consumes from the REGISTRY — a true publish gate)
        ▼
glass-ui 3.2.0 (AS.W6, cut against 0.11.0; aurora cssToOklch cast-delete rides it)
        │  (value.js DEMO consumes via the file: SYMLINK → version-tag gate, not a dev-blocker)
        ▼
value.js K.W3b / K.W4 (consume 3.2.0 dist: blob primitives, deriveAuroraPalette)
```

**Acyclic** (the only cross-repo *library* edge is `glass-ui → value.js(lib)`; the
demo→glass-ui edge is demo-only). During co-development, `dev.sh
SIBLING_WATCH_BUILDS=(../glass-ui)` + the dts-watch give the demo a fresh local dist —
the publishes are **version-tag** gates for the demo leg, a **true publish** gate only
for the glass-ui→value.js typing-fix leg (glass-ui consumes value.js's registry copy).

**keyframes back-edge note:** keyframes carries `optionalDependencies['@mkbabb/glass-ui']:
file:../glass-ui` (a symlink in the install graph) — this is an install-graph edge, not
a *publish* edge; the publish DAG stays acyclic across the lib/demo split. Re-verify at
co-dev that no `npm install` resolution loop bites.

---

## Part D — cohort close

The glass-ui peer tranche (AS) closes **paired** with value.js K.W6 OR records a named
successor. The value.js v1.0.0 release-gate (K.W6) requires value.js's `exports` be the
contract-v2 3-key shape (`proof:resolution` green) — no `development` fossil shipped to
npm. The glass-ui `dist/glass-ui.css @font-face` inline (P5) discharges the last
`fs.allow` residual (K.W2.5 §1).
