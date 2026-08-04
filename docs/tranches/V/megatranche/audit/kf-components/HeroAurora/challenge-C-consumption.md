claude-opus-5[1m]

# CHALLENGE — `HeroAurora.vue` · axis C (CONSUMPTION)

**Target** `keyframes.js/demo/components/instrument/shell/HeroAurora.vue` (128 lines, HEAD `8281638c`)
**Axis** how this component consumes keyframes.js (library) and glass-ui (design system): subpath choices, shadow-component debt, value.js transitive exposure, props/emits contract, sibling seams.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim carries a falsifier; four of my own hypotheses died against theirs and are recorded in §4 rather than filed.
**Method** read-only source + type + runtime evidence. Two compiler runs and four `node` executions against the *installed* artifacts (`node_modules/@mkbabb/glass-ui@7.0.0`, `node_modules/@mkbabb/value.js@4.0.0`); probe scripts lived in the session scratchpad, nothing in any repo was written or mutated. No browser tooling — every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for SS-13.

**Verdict: 13 defects (2 BLOCKER · 4 MAJOR · 5 MINOR · 2 INFO), 5 superlatives.** The headline is not a style quibble: **the component's single named design intent — "the cursor-as-light interactivity axis is ON" (`HeroAurora.vue:57-59`) — is dead in the shipped build, on three independent grounds, and I executed the library to prove the first one.** The second blocker is that the file arms WebGL eagerly on the home hero while its own comment four lines away claims it does the opposite.

---

## 1. Ledger

| id | sev | claim | anchor |
|---|---|---|---|
| **D-1** | BLOCKER | glass-ui is a phantom dependency; all three of this file's imports resolve only by accident of the current `node_modules` | `HeroAurora.vue:37-41` |
| **D-2** | BLOCKER | `initStrategy: 'eager'` arms the GPU on the home-hero boot path — the opposite of the rationale 20 lines above it, no in-tree justification, the ruled Q14 class | `HeroAurora.vue:28` vs `:8` |
| **D-3** | MAJOR | `interactivity: { light: true }` is silently DROPPED by `resolveAtoms` because the `medium` atom is absent — executed proof | `HeroAurora.vue:70` |
| **D-4** | MAJOR | Even carried, `light` is inert under this ground: crayon never relights, `impasto` is pinned 0, `uLightDir` is `.frag`-only while `renderMode="auto"` prefers WebGPU | `HeroAurora.vue:29,72` |
| **D-5** | MAJOR | No `vue-tsc` anywhere: `npm run check` passes green while the SFC holds a real `TS2345`. The SFC/glass-ui seam is wholly unchecked — and has already cost a shipping page-error | `package.json:37-38`, `ci.yml:41-42` |
| **D-6** | MAJOR | The file cites two `proof:*` oracles as its guards, three times. Neither exists | `HeroAurora.vue:5,18,44` |
| **D-7** | MINOR | Aurora's two documented failure doors (`onInitError`, `@rendererStatus`) are both unwired, and the app installs no Vue `errorHandler` — init failure is fully silent | `HeroAurora.vue:24-30` |
| **D-8** | MINOR | `resolveAtoms` throws synchronously in `setup()` for a `var()` / non-opaque / `color-mix()` seed; no guard, no handler → white-screen. Latent behind a literal today | `HeroAurora.vue:64` |
| **D-9** | MINOR | `setCursor(x, y, 1)` — undocumented magic literal, above the library default `0.8`, the one dial the "more subtle" amendment left at maximum | `HeroAurora.vue:94` |
| **D-10** | MINOR | Scoped-CSS `dvh`/`dvw` + `@supports` duplicates what the sibling gets from utilities and what the shell already owns — two fallback sites to keep in sync | `HeroAurora.vue:113-127` |
| **D-11** | MINOR | Version prose is two majors stale ("Aurora 5.x", "P-HERO prototype") against installed glass-ui 7.0.0; a 7.0.0-era library canon is spread over a 5.x-era atom set | `HeroAurora.vue:15-17,84` |
| **D-12** | INFO | `PAPER_WASH_GROUND` clobbers the `saturation` limb of the `colorEnergy` knob (0.913 → 0.92, measured). Immaterial today; the knob is 3/4 wired | `HeroAurora.vue:72` |
| **D-13** | INFO | Zero props / zero emits: the library's per-route `opacityCeiling` *prop* is frozen to a module const. Defensible and documented, but the host cannot influence its own backdrop | `HeroAurora.vue:46` |

Superlatives **S-1..S-5** in §3. Killed hypotheses in §4.

---

## 2. Findings

### D-1 · BLOCKER — the phantom dependency, at this file's import site

**Provenance** `HeroAurora.vue:37-41`:
```ts
import { Aurora, PAPER_WASH_GROUND, resolveAtoms } from "@mkbabb/glass-ui/aurora";
```
`package.json` (read whole, HEAD `8281638c`): `dependencies` holds exactly one entry, `@mkbabb/value.js: "4.0.0"` (`:68-70`). No `@mkbabb/glass-ui` in `dependencies`, `devDependencies`, or an `optionalDependencies` block — the key is gone entirely. `grep -n "glass-ui" package-lock.json` → zero matches. `node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"`, a real directory.

**Corpus** This is **F-1** (`lane-frontend.md:15,54`), confirmed unchanged at HEAD; I am not re-litigating it, only recording that this file is one of its 42 importers and that all three of its named imports die with it. One addition the lane did not need but this axis does: the *declaration* history is legible — `a59d3a22` moved `optionalDependencies: {"@mkbabb/glass-ui": "5.0.0"}` → `"6.0.0"`; a later commit removed the key while the installed artifact went to 7.0.0. So the pin drifted **two majors past its last written form** and then lost its writing.

**Adjacent** `@mkbabb/pencil-boil@^0.9.2` is a declared glass-ui *peer* and is not installed at all (`ls node_modules/@mkbabb/` → `glass-ui, parse-that, value.js`). `.npmrc` `legacy-peer-deps=true` absorbs it silently (lane-frontend, same section).

**Falsifier** Any of: a `glass-ui` entry in `package.json` or `package-lock.json` at HEAD; a workspace/`file:` link; a vite `resolve.alias` entry for `@mkbabb/glass-ui`. I checked all three — `vite.config.ts:37-59` aliases `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets`. No glass-ui arm. The claim stands.

---

### D-2 · BLOCKER — `initStrategy: 'eager'` on the home hero, against its own comment

**Provenance** `HeroAurora.vue:28`:
```html
:runtime-options="{ initStrategy: 'eager' }"
```
`HeroAurora.vue:8`, twenty lines above, in the same comment block that justifies the component:
> "Aurora owns the rAF-coalescing, the PRM-safe CSS-gradient substrate (renderMode "auto"), the decorative DPR budget, **and the lazy WebGL arm past first paint**."

The code disables exactly the thing the sentence credits.

**What eager actually does.** `dist/components/aurora/composables/runtime.d.ts:36-46` states the contract in the library's own words:
> `"deferred"` (default) — … "The Vue wrapper `useAurora` schedules that acquisition past first paint on an idle tick, gated on canvas visibility — so the shader compile-link never lands on the consumer's first-paint critical path."
> `"eager"` — acquisition starts immediately. **"Capture / thumbnail-baking consumers"** then await `armAsync()`.

The shipped wrapper, `dist/aurora.js` (`useAurora`, region at offset ~182165):
```js
let v = n.mode === "capture" || n.initStrategy === "eager";
…
onMounted(() => {
  c = createAurora(t, o(), { initStrategy: "deferred", ...n, … });
  if (v) { b(); return; }                       // ← eager: arm now, and RETURN
  p = useIntersectionPause(e, { pause: …("off-screen-io"), resume: … }, …);
  u = watch(p.isIntersecting, e => { … requestIdleCallback(() => …b()) }, { immediate: true });
});
```
So `eager` buys, on the home route's mount: (a) adapter → device → configure → shader compile-link on the boot path instead of an idle tick, and (b) an **early return that never installs `useIntersectionPause`**, so the `off-screen-io` suspension seam is silently forfeited for the life of the mount (the substrate's own `tab-hidden` / content-visibility owners survive; only the pre-arm intersection gate is lost).

**Why this is a blocker and not a preference.** `grep -rn "initStrategy" demo/ scripts/ docs/ test/` returns **exactly one line — this one**. There is no verdict, no gate, no capture consumer, no comment anywhere in the repo that asks for it. `scripts/gates/visual/index.mjs` (`proof:owner-golden`) and `scripts/run-demo-roster.mjs` contain zero occurrences of `aurora`, so the "a screenshot gate needs a deterministic armed frame" defence — the only legitimate reading of `eager` — has no support in the tree. And the repo family carries a **ruled escalation for precisely this class**: Q14 (LCP 5141 / TBT 5988, the eager-WebGL-blob boot blocker).

**Falsifier** Show me either (i) a capture/bake consumer of this mount that must `renderAt` synchronously, or (ii) a measured first-paint trace where eager and deferred are within noise on the home route. Either kills it. The *magnitude* of the LCP/TBT cost is **UNPROVEN-NEEDS-LIVE**; the doc-contradiction and the forfeited intersection gate are proven from source and need no browser.

---

### D-3 · MAJOR — `interactivity: { light: true }` is dropped on the floor

**Provenance** `HeroAurora.vue:62-73`, and the claim it is supposed to implement, `:57-59`:
> "The cursor-as-light interactivity axis is ON (Aurora's own wired axis — the light follows the cursor inside the field, everywhere on the page, no partiality)."

**Executed proof (runtime).** Running the file's config literal verbatim against the installed bundle:
```
$ node → import { resolveAtoms, PAPER_WASH_GROUND } from ".../glass-ui/dist/aurora.js"
interactivity = {"swirl":true,"amplitude":0.5}
light present?  false
medium = crayon | impasto = 0
with medium atom -> interactivity = {"light":true,"swirl":true,"amplitude":0.5}
```
The mechanism is one line of `resolveAtoms` (`dist/aurora.js`, atoms region):
```js
let r = e.medium?.kind !== void 0 && e.medium.kind !== "smooth" ? e.interactivity.light : void 0;
n.interactivity = { ...(r === void 0 ? {} : { light: r }), …, swirl: t.swirl ?? true, amplitude: … };
```
`light` is carried **only when the `medium` atom is present and non-smooth**. `HeroAurora` never passes a `medium` atom — it installs `medium: "crayon"` through the `...PAPER_WASH_GROUND` config spread at `:72`, one layer *below* the atoms door. The door therefore sees no medium, drops `light`, and the crayon that arrives a microsecond later never re-opens it.

**Executed proof (types).** The same literal, compiled against glass-ui 7.0.0's `.d.ts` under the repo's own compiler options:
```
probe.ts(5,21): error TS2345: Argument of type '{ seed: string; …; interactivity: { light: true; }; }'
  is not assignable to parameter of type 'AuroraAtoms | undefined'.
    Property 'medium' is missing … but required in type
    '{ medium: { kind: "pastel" | … | "crayon" | … }; interactivity?: AuroraPainterlyInteractivityAtom; }'.
```
The type system was *designed* to catch this exact mistake — `AuroraAtoms` is a discriminated union whose smooth arm types `light?: never` (`atoms.d.ts:81-89`) precisely so a light-on-smooth authoring cannot compile. It caught it. Nothing was listening (D-5).

**What survives.** Not nothing: `swirl` defaults `true`, and `isAuroraPointerEnabled` (`runtime.d.ts:127`, shipped as `Y`) reads
`e.interactivity?.swirl === true || (e.medium !== "smooth" && e.interactivity?.light === true)` — so the pointer path is enabled and `uCursorStrength` still drives the field swirl. The handler at `:86-95` is **not** dead code. What is dead is the *named* axis: the cursor no longer moves the light.

**Falsifier** Produce a run of `resolveAtoms` with this exact atom literal where the resolved config carries `interactivity.light`. I ran it; it does not. Alternatively, show the WebGL frame loop reading `light` from somewhere other than the resolved config — it does not: `if (o().interactivity?.light) { … uniform3f(r.uLightDir, …) }` is the only writer.

---

### D-4 · MAJOR — the light axis is unreachable through this ground anyway

D-3's obvious repair — add `medium: { kind: "crayon" }` to the atoms — restores `light: true` in the config **and still produces no light.** Three independent facts, all from the shipped bundle:

1. **The crayon body never relights.** `mediumCrayon` (`dist/aurora.js`, GLSL region ~64628) is documented as "DRY wax pigment on paper tooth … **NO sheen, NO burnish film**" and its body reads `uStrokeAnisotropy`, `uStrokeScale`, `uStrokeAmount`, tooth noise and broken-colour only. `relightImpasto` — the sole consumer of `uLightDir` — is called from the oil / van-Gogh / oil-pastel bodies, never from crayon. `main()`'s dispatch is `uMedium == 4 → mediumCrayon` (~102124).
2. **`impasto` is pinned to 0** by `PAPER_WASH_GROUND` (`presets.d.ts:315`, `readonly impasto: 0`) — measured in the executed run above. The impasto relight has a zero-amplitude height field to catch.
3. **`uLightDir` does not cross to the primary backend.** The bundle says so twice, in the library's own words: *"a phantom `uLightDir` read would be flat on the WGSL primary — `uLightDir` is `.frag`-only"* (~139312). And `renderMode="auto"` (`HeroAurora.vue:29`) resolves per `Aurora.vue.d.ts:60-69` to the GPU path where *"the runtime prefers WebGPU and supports WebGL2"*. On the browser the demo actually ships to, the cursor-as-light uniform is not in the struct.

So the component pairs a **recessive dry-crayon ground** with a **directional-impasto interaction axis**, and the two are mutually exclusive by construction. This is the deeper defect: D-3 is a wiring mistake, D-4 is a design contradiction that a wiring fix cannot resolve. The honest repairs are to change the medium (to `oil`/`vangogh`/`oil-pastel`, abandoning the paper-wash register), or to delete the `light` atom and the sentence at `:57-59` and keep the swirl the cursor actually drives.

**Falsifier** Any of: a `relightImpasto` call reachable from `uMedium == 4`; a non-zero `impasto` in the resolved config; a `uLightDir` (or equivalent) lane in the WGSL uniform struct. I looked for all three — the WGSL struct's lanes are enumerated at ~128839 (`scalars0..3`, `cursor` carrying `uMetalPolish`/`uMetalHeightScale` in its free `.z/.w`) and carry no light direction. A live rendering that visibly relights from the cursor on this config would kill the whole finding at once — **UNPROVEN-NEEDS-LIVE** only in that direction.

---

### D-5 · MAJOR — the SFC/glass-ui seam is typechecked by nothing

**Provenance** `package.json:37-38`:
```json
"check":     "tsc --noEmit && tsc --noEmit -p tsconfig.test.json",
"check:lib": "tsc --noEmit -p tsconfig.lib.json",
```
`grep -rn "vue-tsc" package.json .github/workflows/` → **no matches.** Plain `tsc` does not parse `.vue`; `tsconfig.json:47` includes `["src/", "demo/"]` but every `<script setup>` in that tree is invisible to it. CI (`ci.yml:41-42`) runs only `check:lib`, whose config is scoped to `src/` (`tsconfig.lib.json:11`) with the comment at `:3-8` stating the reason outright — *"a clean runner type-checks ONLY the publishable surface (`src/`) — never the demo, whose later consumer commit imports registry Glass."* The demo job builds `gh-pages` (esbuild transpile, no typecheck) and runs the roster.

**Executed proof.** From the repo root, read-only:
```
$ npm run check
> tsc --noEmit && tsc --noEmit -p tsconfig.test.json
$ echo $?   → 0
```
Green — while `HeroAurora.vue:63-71` holds the `TS2345` reproduced in D-3.

**This is not hypothetical damage.** `13530f70 fix(demo/aurora): remove retired cursor-velocity call for Glass 5.0` removed `injectCursorVelocity` from *this file*, and its message records how the break was found: *"the hosted 5.3.2 roster isolated the failure to this removed method"* — i.e. a **shipping page-error caught by a live browser battery**, on a call any typechecker would have rejected at the version bump. The same gate hole is now hiding D-3, which the browser battery *cannot* catch because dropping `light` throws nothing.

**Falsifier** A `vue-tsc` invocation anywhere in the repo, or a CI step that typechecks `demo/`. Neither exists at HEAD. (Note this is a repo-level gate defect surfaced *by* this file; I file it here because it is the direct enabling cause of D-3 and of the already-shipped `injectCursorVelocity` regression, both located in these 128 lines.)

---

### D-6 · MAJOR — the guards the file names do not exist

**Provenance** three citations inside this file:
- `:5` — "the forbidden second occurrence — H.W9's lesson; **`proof:no-hand-rolled-cursor-tracker`** stands guard"
- `:18` — "asserted by **`proof:cursor-light-subtle`** (OWNER) — raising it past the amendment REDs the oracle"
- `:44` — "**`proof:cursor-light-subtle`** asserts this literal + the template binding"

plus a fourth in the host, `App.vue:44`.

**Evidence** `package.json` declares exactly two proof scripts (`:50-51`): `proof:publish` → `scripts/gates/surface/index.mjs`, `proof:owner-golden` → `scripts/gates/visual/index.mjs`. `ls scripts/gates/` → `surface`, `visual`. `grep -rn "cursor-light\|subtle\|opacity-ceiling\|aurora" scripts/gates/ scripts/run-demo-roster.mjs` → **zero matches.** The `docs/tranches/T/stage-manifests/home.json:9` row that names `aurora-cursor-light … proof:cursor-light-subtle` is a prose artifact: `run-demo-roster.mjs` (122 lines) contains no reference to `stage-manifest`, `manifest`, or `clause`.

So the sentence "raising it past the amendment REDs the oracle" is false. `HERO_AURORA_OPACITY_CEILING` (`:46`) is guarded by nothing; the "no hand-rolled cursor tracker" invariant is guarded by nothing. This matters beyond tidiness: a reader auditing this file is told twice that a machine is watching, which is exactly the belief that lets D-3 and D-4 sit unexamined. It is also consistent with the standing owner ruling that retired the grep-based `proof:*` idiom — the gates were deleted; these citations were not.

**Falsifier** Point me at either named script, or at any executable clause registry that resolves those two ids. I grepped `scripts/`, `package.json`, and `demo/`; the only hits are the four prose citations themselves.

---

### D-7 · MINOR — both documented failure doors unwired

`Aurora.vue.d.ts:28-31`: *"Device/context and shader setup failures remain explicit through `rendererStatus`. Pass `onInitError` (or install Vue's app error handler) to receive the attributed error as well."* The component (`:24-30`) passes neither, and `grep -rn "errorHandler\|rendererStatus\|onInitError" demo/` returns **nothing** — no app-level handler either. The shipped fallback chain (`Aurora.vue` setup, ~187874) is `i.onInitError ?? i.runtimeOptions?.onInitError ?? appContext.config.errorHandler` → all three undefined → `n.onInitError?.(t)` is a no-op, the status lands in a ref nobody reads, and the emit fires into no listener.

Consequence: an init failure on the home hero degrades to the palette ground — a *good* fallback, and precisely why it is invisible — with **zero** console attribution. The demo roster's page-error clause cannot see a failure that raises no error. Severity is MINOR because the visual outcome is a designed graceful degrade, not a break; it is a defect because the library named two doors and the consumer took neither.

**Falsifier** An `app.config.errorHandler` in `demo/main.ts` or equivalent, or any `@renderer-status` listener. Neither exists.

---

### D-8 · MINOR — the seed is one token from a synchronous white-screen (the value.js transitive row)

`resolveAtoms` runs inside `<script setup>` (`:62`), i.e. during `setup()`, unguarded. Its seed path reaches value.js: glass-ui's `cssToOklch` → `dist/value-DMhh2R94.js`, which is 877 bytes of exactly this:
```js
import { parseCssColor as t } from "@mkbabb/value.js/css";
function i(e, r) {
  let i = t(e);
  if (!i.ok) throw new n(r, i.diagnostics);
  if (i.value.alpha !== 1) throw new n(r, { code: "color_non_opaque", alpha: i.value.alpha });
  return i.value;
}
```
Executed against the installed pair (glass-ui 7.0.0 + value.js 4.0.0):
```
"#7c5ce6"                        -> ok
"var(--accent-kf)"               -> THREW GlassColorError: cssToOklch: color_context_required
"#7c5ce680"                      -> THREW GlassColorError: cssToOklch: color_non_opaque
"color-mix(in oklch, red, blue)" -> THREW GlassColorError: cssToOklch: css_syntax
```
A throw in `setup()` with no app `errorHandler` (D-7) fails the render of App's whole subtree. The hazard is live-adjacent rather than latent-abstract because the file's own comment (`:54-56`) names `--accent-kf` as the hue it is tracking — tokenising the seed is the natural next edit, and it is the edit that white-screens the home route.

**Corpus contradiction/extension.** `lane-library.md §4.6` enumerates the demo's parse consumers by *direct call* — `useSquareTumble.ts:22 parseCssColor(css)` is flagged as "the known R1 crash surface". `HeroAurora` is absent from that census and correctly so by its own criterion: it never writes `parseCssColor`. But it reaches the identical seam **transitively through glass-ui**, and the failure posture there is a fourth variant beyond §7.5's catalogue of five (absorb / throw-TypeError / swallow / throw-AnimationOptionError / throw-TypeError): *throw a foreign library's `GlassColorError` from inside a Vue `setup()`*. Any kf-side `parse()` façade the lane proposes will not cover this route.

**Falsifier** Show a try/catch, a non-literal seed guard, or an app error boundary. None exists. (Note: the throw is currently unreachable — the seed is a compile-time hex literal. Severity MINOR reflects that.)

---

### D-9 · MINOR — `setCursor(x, y, 1)`

`:94` passes a bare `1` for a parameter typed `strength?: number` (`presets.d.ts:223`) whose shipped default is `0.8` (`dist/aurora.js`: `function b(e, t, n = .8)`). Nothing in the file says why. `uCursorStrength` is not decorative — it scales the field rotation directly (`ang = w * uCursorStrength * 2.1`, ~96718, i.e. ~120° at the cursor centre at strength 1) plus a gravity pinch. The OD-2 amendment ("more subtle", owner verbatim) was implemented on the opacity ceiling alone (`:14-19`, `:46`); the one interaction dial in the file sits 25% *above* the library default with no comment.

**Partial defence, stated honestly:** glass-ui's own `useCursorInteraction` also calls `setCursor(o, c, 1)` (~190295), so `1` is not out-of-band for the library. But that call site is the *nuclei-editor overlay* — a deliberately legible authoring affordance, not a recessive hero wash. Severity MINOR, and the defect is the undocumented literal on a file whose entire amendment history is about restraint, not the number itself.

**Falsifier** A comment or verdict fixing `1`; or a measurement showing strength `1` and `0.8` are perceptually equal on this config (**UNPROVEN-NEEDS-LIVE**).

---

### D-10 · MINOR — the sizing block duplicates two other owners

`:113-127` hand-rolls `height: 100dvh; width: 100dvw` plus an `@supports not (height: 100dvh)` `vh/vw` fallback — on a `fixed inset-0` element (`:21`) that is already viewport-sized by its offsets. The sibling that this layer is deliberately ordered against does the same job with utilities: `EditorShell.vue:13` — `class="grid-background pointer-events-none fixed inset-0 h-dvh w-dvw"` — and the *shell* owns the `@supports` fallback for both itself and the grid (`EditorShell.vue:~200-220`). So the fallback logic now lives in two files with two idioms, and `HeroAurora`'s copy is scoped CSS the shell's block cannot reach.

No observable effect today: `100dvw` over-constrains the fixed box (a specified width wins over `right: 0`), which on a classic-scrollbar desktop would make the layer wider than the inset box — but the shell is `w-dvw overflow-hidden` (`EditorShell.vue:3`) so the document never scrolls, and a fixed element's overflow contributes no scrollable area regardless.

**Falsifier** A horizontal scrollbar or a visible clip attributable to this block would upgrade it; a live layout where removing the block changes nothing would confirm the redundancy. Both **UNPROVEN-NEEDS-LIVE**; the duplication itself is proven from the two files.

---

### D-11 · MINOR — the prose is pinned to Glass 5, the artifact is Glass 7

`:84` — "Cursor velocity bursts are no longer a **public Aurora 5.x surface**". `:15-17` — the calibration is described against "the P-HERO prototype". Installed: **7.0.0**. Two majors of drift with no re-audit, and the drift is not cosmetic — the `light` gating that produces D-3 lives in `resolveAtoms`'s medium check, and 7.0.0's atoms door is documented as carrying `BI.W-FIELD-CORE (FC6/T-38)` medium-gating and a `BI.W-AURORA-VIBRANCY (GAP-L2)` knob set (`lightnessScheme`, `lBand`, `hueSpread`, `chromaVariance`, `chromaCounterpoint`) that did not exist when this file was authored. The `...PAPER_WASH_GROUND` spread at `:72` is itself a 7.0.0-era library canon (`presets.d.ts:294-306`, "BA.W-ATLAS-RECONCILE A-4a") laid over a 5.x-era atom set.

I deliberately do **not** claim the `light` drop is a 6/7 regression — I cannot read glass-ui 5.0.0 from this tree. **Falsifier for that sub-claim:** install/inspect glass-ui 5.0.0's `resolveAtoms`; if its light carry was unconditional, D-3 becomes a silent cross-major regression and D-5 becomes its enabling cause a second time. What *is* proven is the version-prose mismatch and that nothing re-derived the calibration across two majors.

---

### D-12 · INFO — the `colorEnergy` knob is 3/4 wired through this spread

Measured, both sides:
```
saturation BEFORE PAPER_WASH_GROUND = 0.913     (= clamp(lerp(0.85, 1.2, 0.18), 0.6, 1.3))
saturation AFTER  PAPER_WASH_GROUND = 0.92      (the ground's readonly literal)
valueVariance = 0.058   breathDepth = 0.05      (survive)
```
The atoms door advertises `colorEnergy` as one scalar co-varying *saturation + valueVariance + breath + temperature* (`atoms.d.ts:100-106`), explicitly because "moving any one alone reads as a defect". The `:72` spread severs the saturation limb. **Δ = 0.007 today — immaterial**, which is why this is INFO and not the MAJOR I first drafted (see §4.2). It is still a real seam: any future retune of `colorEnergy` will move three of four axes and silently leave saturation at 0.92.

**Falsifier** Killed my own stronger version of this claim by arithmetic; the residue survives because the override is structural, not numeric.

---

### D-13 · INFO — the props/emits contract

There is none: zero props, zero emits, one `useTemplateRef`. For a single-consumer leaf mounted once (`App.vue:45-47`, inside `v-if="isHome"`) that is the right shape, and the host documents the delegation (`App.vue:43-44`, "The subtlety bound lives in HeroAurora"). Recorded as INFO for one consequence only: the library models `opacityCeiling` as a **per-route prop** (`Aurora.vue.d.ts:72-86` — "Quiet content-over-aurora routes … opt in to `0.5`"), and this consumer freezes it to a module const, so a second mount or a route-varying register would require editing the component rather than the call site. Not a defect at one mount. **Falsifier** a second `<HeroAurora>` mount — there is exactly one (`grep -rn "HeroAurora" demo/` → `App.vue:43,46,142`).

---

## 3. Superlatives (L-18 runs both ways — each with its falsifier)

**S-1 · Zero shadow-component debt, and it says why.** `HeroAurora` appears nowhere in the S-1..S-8 shadow census (`lane-frontend.md:264-397`); it is row 128 of the importer census (`:191`) as a plain consumer of `Aurora`/`PAPER_WASH_GROUND`/`resolveAtoms`. The file opens by *naming the temptation it refused* (`:2-6`): "glass-ui's PUBLIC Aurora primitive as the home hero's ambient background, **not** a hand-rolled `--mouse-x` wash (the forbidden second occurrence — H.W9's lesson)". Against a census that found 1 385 lines of shadow across seven components, a hero backdrop that reaches for the library primitive is the behaviour the census wants. *Falsifier:* a bespoke gradient/canvas fallback hiding in the file — there is none; the `<style scoped>` block is 15 lines of sizing.

**S-2 · The pointer handler out-engineers the library's own composable, and proves it.** `:86-95` does `clientX / window.innerWidth` with **zero** DOM geometry reads, justified against a named recurrence guard (`:76-79`, T-CL-3, the read-after-write `getBoundingClientRect + setProperty` pattern). The library's stock alternative, `useCursorInteraction`, calls `t.getBoundingClientRect()` inside its `pointermove` (`dist/aurora.js` ~190295). For a `fixed inset-0` full-viewport layer the rect is *definitionally* the viewport, so the consumer's version is both cheaper and exactly equivalent. Declining a library composable is usually a smell; here it is correct and the file argues it from first principles. *Falsifier:* a layout where the aurora layer is not viewport-coincident (a transformed ancestor, a non-fixed remount) would make the bespoke math wrong — `App.vue:45` mounts it in `EditorShell`'s `#backdrop` slot whose parent is `relative`, not a fixed-containing-block, so the coincidence holds.

**S-3 · Subpath discipline.** `:37-41` imports from `@mkbabb/glass-ui/aurora`, a real entry in the package's exports map (`{types: "./dist/aurora.d.ts", import: "./dist/aurora.js"}`), not the root barrel that would drag the whole design system through the demo's graph. Consistent with the rest of the demo (`App.vue:145` `@mkbabb/glass-ui/tooltip`). *Falsifier:* a root-barrel import in this file — none.

**S-4 · The seed really is on the brand axis — I tried to kill this and failed.** Measured against the installed bundle:
```
cssToOklch("#7c5ce6")            = { L 0.580, C 0.200, h 289.35° }
--accent-kf  light               =   oklch(0.56 0.17 295)
--accent-kf  dark                =   oklch(0.74 0.13 305)
derived ramp hues                = 263.63, 280.78, 297.93, 315.08
```
Δh from the light token is **5.6°**, ΔL 0.02, ΔC 0.03; and the analogous ramp spans 263.6–315.1°, **bracketing both theme tokens** (295 and 305). The claim at `:54-57` — "the seed sits on the OD-6 violet accent axis … the wash previews the blessed hue, both themes" — survives its falsifier intact, including the "both themes" half, which I expected to break on the theme-invariant literal. (`style.css:130-131` is the token source.) *Falsifier:* a retune of `--accent-kf` past the ramp's ±25.7° bracket would silently break it, and nothing watches — but today the claim is true and measured.

**S-5 · The decorative-layer hygiene is complete.** `aria-hidden="true"` + `pointer-events-none` on the wrapper (`:20-23`, corroborated by `docs/tranches/V/audit/R1-13-a11y.md:153`); `useEventListener` for scope-tied teardown with the rationale named (`:101-103`); `pointerType !== "mouse"` early-out with its reason (touch `pointermove` fires only mid-drag and would fight scene gestures, `:84-85`); both listeners `{ passive: true }`. *Falsifier:* a focusable node or a pointer target inside the layer — the subtree is one `<div>` wrapping Aurora's own `aria-hidden` placeholder + canvas.

---

## 4. Killed hypotheses (recorded so no one re-files them)

**4.1 · "The R1 parser-crash class is reachable here."** It is not — twice over. The seed is a compile-time hex literal, *and* the installed value.js does not exhibit the crash:
```
parseCssColor("#7c5ce6")              -> ok
parseCssColor("oklch(0.62 0.19 295)") -> ok
parseCssColor("oklch(62% 0.19 295)")  -> ok
parseCssColor("rgb(0 0 0 / 50%)")     -> ok (alpha 0.5)
parseCssColor("var(--accent-kf)")     -> not ok (diagnostic, no throw)
```
Against `node_modules/@mkbabb/value.js@4.0.0` as pinned by `package.json:69`. **This explicitly contradicts the framing of R1 as a live `parseCssColor("oklch()")` shipping crash when applied to this repo's pinned artifact** — whatever R1 reproduces against, it is not value.js 4.0.0's `./css` subpath. The genuine transitive exposure at this file is the *diagnostic-to-throw* conversion in glass-ui's bridge, filed honestly as D-8.

**4.2 · "`PAPER_WASH_GROUND` clobbers the authored atoms."** Drafted as a MAJOR, demoted to INFO by measurement. The ground carries **no palette and no nuclei** by design (`presets.d.ts:294-320`), so `seed`/`harmony`/`zones`/`noise`/`motion` all survive the spread untouched. The only intersection is `saturation` (0.913 → 0.92) — see D-12.

**4.3 · "The seed is off the accent axis by ~31°."** False, and instructive: I first read `palette[0].h = 263.63` as the seed anchor. It is the *first ramp stop*, not the anchor. The anchor is 289.35° (S-4). A confident 31° hue-mismatch finding would have been wrong.

**4.4 · "The Aurora root won't fill the wrapper."** False. `Aurora.vue`'s compiled root is `class="aurora-root block h-full w-full overflow-hidden"` with `h-full w-full` on both the placeholder and the canvas, and glass-ui's stylesheet ends with `@source "../*.js"` (`dist/styles/index.css`), which scans `dist/aurora.js` so the consumer's Tailwind v4 build generates those utilities. Both halves of the sizing seam are handled by the library.

**4.5 · "`InstanceType<typeof Aurora>` won't see `setCursor`."** False. The exposed shape is the second type argument of the generated `DefineComponent` (`Aurora.vue.d.ts:89-100`) and includes `setCursor`, `clearCursor`, `setCursorRadius`, `renderAt`, `pause`, `resume`, `isArmed`, `rendererStatus`. `:48` is correct — and, note, would have been *checked* had anything checked it (D-5).

---

## 5. Repair sketch (non-binding, ordered by dependency)

1. **D-1 first.** Declare `@mkbabb/glass-ui: 7.0.0` and regenerate the lock — per `lane-frontend.md:612`, nothing below is reproducible until it lands.
2. **D-5 next**, because it is the sensor for everything else: a `vue-tsc --noEmit` over `demo/` wired into the demo CI job. It fails today on `HeroAurora.vue:63-71` alone, which is the point.
3. **D-4 is a decision, not a patch** — the owner has to choose between the paper-wash ground and the cursor-as-light axis; they cannot coexist. Whichever loses, the comment at `:57-59` and the atom at `:70` move together.
4. **D-2** wants a one-token deletion plus a live before/after trace on the home route.
5. **D-6** wants the three phantom citations struck or the two oracles rebuilt — not both silently left standing.

The seed atom accepts `string | OklchStop` (`atoms.d.ts:96-97`), so if a future wave wants the wash pinned to the token rather than a hand-picked hex, the on-axis form is `seed: { L: 0.56, C: 0.17, h: 295 }` — no CSS string, no `parseCssColor`, and D-8 disappears with it.
