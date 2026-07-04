# S-4 — BLOB technical root-cause + greenfield verdict

**Lane** S / blob-greenfield-tech · **Mode** AUDIT-ONLY (no product edits, no commits) ·
**HEAD** value.js `c5aa091` (branch tranche-q) · glass-ui `dba0ddb` (branch tranche/BG) ·
**Live** probed against `http://localhost:9000` (Chrome 149, WebGPU present, 72 Hz display) ·
**Screens** `~/Downloads/Screenshot 2026-07-04 at 15.47.12.png` + `16.14.00.png` (user);
`.playwright-mcp/blob-initial.png` (this lane).

---

## 0. The headline — WHERE the blob lives, and the verdict

**The blob is NOT in value.js. It is a mature glass-ui producer component.** The demo's
`goo-blob/` fork was extirpated at N.W5.A (`demo/CLAUDE.md`: "DELETED (N.W5.A) — the 1270-LoC
flat-HSV fork is extirpated"). The live hero consumes `@mkbabb/glass-ui/goo-blob` through a
**62-LoC** thin shell (`demo/@/components/custom/color-picker/visual/HeroBlob.vue`). The engine
is **3634 LoC** across `../glass-ui/src/components/custom/goo-blob/` — a **dual-backend**
(WebGPU `metaball.wgsl` primary + WebGL2 `metaball.frag` fallback) SDF metaball system with a
circumplex mood FSM, a deterministic satellite phase-machine, a demand-parked render loop,
context-loss self-heal, and an existing 261-line `RESEARCH.md` recording ~30 tranches
(AT→BG) of tuning. The demo resolves glass-ui from its **built `dist/`** (symlink
`node_modules/@mkbabb/glass-ui -> ../../../glass-ui`; `dist/goo-blob.js` mtime is NEWER than
src — dist is current).

### VERDICT: REDRESS, do not reinvent. (Contra the S-4 "likely ground-up reinvention.")

The user's instinct is understandable from the *appearance* (a tiny half-clipped puck with no
visible satellites reads as broken), but the evidence contradicts a rebuild:

- The **SDF/smin math core is correct and gate-green** (RESEARCH.md §0: IQ-2024 normalized smin,
  tetrahedron SDF-gradient normal, premultiplied-alpha; 12 `proof:blob-*` locks). Reinventing
  re-solves solved problems — the exact "chronic re-tune / re-sweep trap" RESEARCH.md §0 warns
  against ("CHRONIC across AT→AU→AV→AW→AX").
- The **motion doctrine is SOTA** (RESEARCH.md §0: de-synced multi-sine breath, critically-damped
  pointer spring `response 0.18 / ζ 1.0`, symplectic-Euler click impulse, Codrops 15-sphere
  pseudopod). Verified live: at rest the body is dead-stable (centroid jitter **0.015 px** on a
  96-px sample over 120 frames).
- A rebuild in the demo would **re-violate at-the-root (S-21) and the glass-ui-first edict**
  (`feedback_glass_ui_first_class.md`) — the very reason N.W5.A killed the demo fork.

The defects S-4 names are **scale + placement + demand-park + tuning + a Safari frame-pacing
risk** — a bounded redress, mostly in the producer plus a thin layer of demo layout. Detail below.

---

## 1. Live reproduction — what the probes actually show

All numbers measured live via injected rAF probes (Playwright MCP, isolated browser; the
resident chrome-devtools session was untouched).

| Probe | Result | Reading |
|---|---|---|
| **At-rest centroid jitter** | 0.015 px mean / 0.05 px max (96-px sample, 120 frames) | Body is stable at rest — NO literal "spazz" on idle desktop. |
| **At-rest bbox** | 26×26 on 96-sample ⇒ **~76 px visible body** on a 282-px canvas / 176-px wrapper | Body fills only **~43%** of its footprint. Confirms "too small". |
| **At-rest satellites** | bbox never exceeds body (26×26 held over 4.6 s) | **Zero distinct satellites at rest** — confirmed. Root cause §3-P1. |
| **Pure rAF cadence (no readback)** | idle **77.8 fps** / pointer-storm **71.3 fps** | Framerate is FINE on this desktop. The "spazz" is NOT a desktop-Chrome fps collapse. |
| **Area churn under pointer-storm** | area **561 → 1429 px** (2.5×), per-frame Δ up to **226 px** | Body deforms ±35%/frame under interaction — large relative churn on a 76-px mark. §3-P0. |
| **Color tracking** | rendered RGB matched the live picker color (green oklch → RGB 105,174,68) | Color feed WORKS. (An early green/pink mismatch was my own probe changing the URL — retracted.) |
| **Live GPU surfaces** | `atmosphere-canvas` (full-viewport WebGL) **+** `goo-blob-canvas` both live | **TWO** concurrent GPU surfaces. Safari-contention vector, §3-P0. |
| **navigator.gpu** | present ⇒ **WebGPU path armed** on Chrome | Safari takes the WebGL2 fallback → different, less-exercised path. §3-P0. |

**I could NOT reproduce a dramatic spazz on desktop Chrome.** The user is on macOS and hammers
"MUST work on Safari" (S-4, S-22). The literal spazz is Safari-conditional; the missing repro
vehicle is the existing `smoke-safari` project (iPhone-14 WebKit + the sustained-30 s
context-loss probe). This is called out as the P0 verification gap, not hand-waved.

---

## 2. Root-routing map (at-the-root discipline)

| Concern | Root | File(s) |
|---|---|---|
| Scale / footprint / corner placement | **value.js demo** (legit per-consumer layout) | `HeroBlob.vue:15` (`w-24 lg:w-[11rem]`), `ColorPicker.vue:18-22` (`absolute -top-14 -right-12`) |
| Satellites invisible at rest; orbit-separation at hero scale | **glass-ui producer** | `useBlobSatellites.ts` `isQuiescent`; `constants.ts` `ORBIT_*`; `types.ts` `geometry.orbitRadius` |
| Area churn / stretch aggressiveness on a small mark | **glass-ui producer** | `useMetaballRenderer.ts:245-258` (decel-kick), `useBlobPointer.ts` stretch |
| Safari WebGL2 dual-surface contention | **glass-ui producer** | `useAtmosphere.ts:58` renderMode; `useGpuSubstrate.ts` backend pick |
| Demand-park first-frame 50 ms catch-up lurch | **glass-ui producer** | `useMetaballRenderer.ts:225` (`Math.min(rawDtMs, 50)`) |
| `goo-blob → blob` rename | **glass-ui producer @ 5.0.0** | subpath `src/subpaths/goo-blob.ts` |
| API CORS (S-11, incidental) | **api** (dev CORS) | live console: `api.color.babb.dev/colors/approved` blocked, `Allow-Origin: https://color.babb.dev` ≠ localhost |

---

## 3. Root-cause ranking of the "spazz"

### P0 — Safari WebGL2 dual-surface contention + the demand-park 50 ms catch-up lurch  · glass-ui producer
The page runs **two** concurrent GPU surfaces (measured §1): the full-viewport aurora
(`atmosphere-canvas`, WebGL2) **and** the blob. On Chrome the blob takes the **WebGPU** path
(`navigator.gpu` present, `useGpuSubstrate.ts` picker), so the two surfaces use *different*
backends and don't fight for one WebGL2 context. **On Safari both are WebGL2** — two live
contexts contending, exactly the pressure the `smoke-safari` sustained-context-loss probe was
built to catch. Under contention frame pacing degrades; the renderer clamps every frame delta to
50 ms (`useMetaballRenderer.ts:225 dtMs = Math.max(0, Math.min(rawDtMs, 50))`) and advances the
*whole* simulation — springs, orbit phase, FBM scroll — by that clamped step. A run of long
frames turns the smooth follow into a sequence of 50-ms lurches: the documented
"delayed-then-lurching / quick and jittery" behaviour the code comments already chase
(`GooBlob.vue:194-212`, `useMetaballRenderer.ts:215-225`). On a 76-px mark every lurch is a
visible jump ⇒ reads as "spazzing out". **This is the leading Safari-specific hypothesis and the
P0 to verify on WebKit.**
*Routing:* producer — force the blob to the WebGL2 path OR make the aurora resolve `renderMode:"css"`
whenever the blob holds a live GL context, so at most one full-cost GPU surface exists at a time
(the X6 single-canvas discipline, applied cross-component).

### P0 — Area/stretch churn is too aggressive for the hero's rendered scale  · glass-ui producer
Measured ±35%/frame body-area churn (561→1429 px) under interaction. The renderer folds a
pointer **decel-kick** into the body-pulse spring every frame the flick decelerates
(`useMetaballRenderer.ts:245-258`: `pointer.click(min(0.5, decel*4 + burst*0.2))`), *on top of*
the critically-damped follow spring, *on top of* satellite emerge/absorb. Three deformation
sources summing on a 76-px mark = a busy, unstable silhouette. Tuning was calibrated against a
larger studio render (RESEARCH.md plates); at the demo's tiny hero scale it over-reads.
*Routing:* producer — scale the decel-kick + stretch by rendered footprint, or damp the summed
deformation ceiling.

### P1 — Satellites are invisible at rest (the "no satellite blobs")  · glass-ui producer
`geometry.satelliteCount` default is **3** (`types.ts:324`), yet the static hero shows a bare
sphere (probe: bbox never exceeds the body at rest). Two compounding causes: (1) the demand-gate
parks the loop when every satellite is `orbiting` (`useBlobSatellites.ts:400 isQuiescent`), so a
resting blob freezes the satellites at whatever phase they hold — often `absorbed` (opacity 0) or
mid-`merging`; (2) at hero scale `orbitRadius 0.30 × POS_SCALE 0.625` puts satellites so close to
the body that the smin band **merges them into the silhouette** — they become membrane bumps, not
distinct beads. A living hero mark should keep its satellites *visibly* orbiting. The park-at-rest
is a battery optimization that costs the component its whole identity in a static frame.
*Routing:* producer — either don't park while `satelliteCount > 0` (gently orbit forever — see
perf budget §5, it's cheap) OR guarantee the rest pose freezes satellites at a visible, separated
orbit position; and widen the hero `orbitRadius` so beads clear the body skin.

### P1 — Too small + half-clipped at the card corner  · value.js demo
`HeroBlob.vue:15` sizes `w-24 lg:w-[11rem]` (96 / 176 px). `ColorPicker.vue:20` places it
`absolute -top-14 -right-12` (−56/−48 px) so ~half the footprint hangs off the corner; the
visible body is ~76 px (43% of footprint). Sub-`lg` the Card is `overflow-x-hidden`
(`ColorPicker.vue:6`) so the mobile puck is genuinely **clipped** (matches shot 16.14.00). The
"material hero" reads as a stray dot beside a large card.
*Routing:* demo — grow the footprint, reduce the negative inset so the body is fully on-card, and
reconcile the mobile `overflow-x-hidden` clip (the header already reserves `pr-24 lg:pr-36`).

### P2 — Reveal-bloom re-fire  · RULED OUT
Hypothesized park→wake re-triggering the entrance brightness-bloom (a "pop" spazz). **Not the
cause:** `createCanvasLifecycle.ts:135` `revealFired` guard makes it strictly one-shot ("an
IO/CV re-reveal of an already-seen viz is a silent re-attach").

### P2 — Color-change storm fan-out  · glass-ui producer / demo (monitor)
Every picker color change fans out to: `satelliteSystem.reseed()` (`GooBlob.vue:172`),
`refreshResolvedColors()`, a substrate `wake()` (`useMetaballRenderer.ts:402-403`), **and** the
aurora `deriveAurora` deep-watch (`useAtmosphere.ts:84-95`) driving the *other* GPU surface.
During a slider drag this is a per-frame storm across both surfaces. Not proven to spazz on
desktop, but it compounds the P0 contention on Safari.

---

## 4. Greenfield research — SOTA for this scale (audited against HEAD)

The engine is already at/beyond the public frontier on the axes that matter; this section
records what a from-scratch build would have to re-derive (and thus should not), plus the two
genuinely open frontier items.

- **Render path.** 2D screen-space single-pass SDF (`O(W·H·N)`, no overdraw, no raymarch step
  loop) is the *permanent* floor for a flat UI mark (RESEARCH.md §0). Raymarched 3D metaballs
  buy nothing here and cost per-fragment loops. **Keep.**
- **smin field.** IQ-2024 normalized quadratic smin with circular variants + dome-Z gradient
  lift for fake volume — correct and locked. **Keep.**
- **Edge AA (ties to S-15 aliasing).** The blob edges via `fwidth`/derivative AA on the SDF
  isoline — resolution-independent, the right tool (RESEARCH.md §0). This is the *good* pattern
  S-15 should generalize to the watercolor dots + palette edges (which alias because they lack
  it). **MSAA is the wrong axis** for an SDF field — derivative-AA on the analytic distance is
  cheaper and sharper than multisampling a discontinuous coverage. Confirm the blob's `antialias:false`
  context attr (`useMetaballRenderer.ts:333`) is intentional (it is — AA is in-shader, MSAA off).
- **Satellite orbital mechanics.** The current model is an eccentric-orbit + per-satellite wobble
  + a phase FSM (orbit→merge→absorb→emerge, plus the opt-in mercury fission)
  (`useBlobSatellites.ts` + `satelliteKinematics.ts`). This is richer than the SOTA reference
  (Codrops decaying-radius pseudopods) and deterministic per-seed. The only frontier gap is
  **visible-orbit tuning at small scale** (§3-P1), not the mechanics.
- **Safari WebGL2 constraints.** WebGPU on Safari is nascent (Safari 18/26 gated), so Safari
  takes the WebGL2 fallback. Historical constraints on file (MEMORY): iOS Safari smaller JS
  stack (the ValueUnit recursion overflow at ~294 frames, fixed) and context-loss under sustained
  load. The live risk today is **two WebGL2 contexts** (aurora + blob). The substrate already has
  context-loss self-heal (`useGpuSubstrate.ts`); the missing discipline is capping concurrent
  full-cost surfaces (§3-P0).
- **Single-canvas discipline (X6).** Each viz owns its context via the shared substrate; there is
  no per-viz `getContext` (the single-bootstrap contract, `useMetaballRenderer.ts:75`). The gap
  is cross-component: nothing coordinates aurora + blob to avoid two live contexts on Safari.
- **Perf budget.** Live: aurora ~329 k px/frame (full-viewport) + blob ~24 k px/frame; the blob
  is <7% of the GPU cost — the aurora dominates. An always-orbiting blob (killing the park, §3-P1)
  costs one 24 k-px SDF pass/frame — trivially affordable; the *aurora* is the surface that must
  yield on Safari, not the blob.

**Two open frontier items (from RESEARCH.md, still standing):** the default identity
(warm-cream vs the observed charcoal — largely mooted here since the demo feeds a live palette)
and the ~50-field `BlobConfig` over-parameterization (a ≤12-atom ceiling was decided but the
surface persists — `BlobPane.vue` still drives ~30 dot-path sliders).

---

## 5. Architecture verdict + sketch

**No re-architecture. A targeted redress on the existing substrate.** The layering is already
correct: SFC (`GooBlob.vue`) → mood/pointer/satellite systems → shared `resolveFrame` → dual
backend via `useGpuSubstrate`. The changes:

1. **Cap concurrent full-cost GPU surfaces (producer, P0).** Introduce a substrate-level policy so
   the aurora resolves `renderMode:"css"` while a focal viz (blob) holds a live WebGL2 context —
   OR pin the blob to WebGL2 and give it context priority. One expensive surface at a time. Verify
   on `smoke-safari`.
2. **Scale-aware deformation (producer, P0).** Damp the summed decel-kick + stretch + satellite
   excursion by rendered footprint so a small hero doesn't over-churn.
3. **Living satellites at rest (producer, P1).** Don't park while `satelliteCount>0` (a 24 k-px
   pass is cheap) or freeze the rest pose at a visible, body-clearing orbit; widen hero
   `orbitRadius`.
4. **Footprint + placement (demo, P1).** Grow the hero, pull it fully on-card, fix the mobile clip.
5. **Config atom ceiling (producer, deferred).** Land the decided ≤12-atom `BlobConfig`; retire
   the `BlobPane` slider sprawl in step.

**Where it LIVES:** stays in the **glass-ui producer** (correct per S-21 / glass-ui-first). The
`goo-blob → blob` rename at glass-ui 5.0.0 is a producer-side subpath/re-export change; the demo's
only coupling is the import specifier in `HeroBlob.vue:36`, `BlobPane.vue:12`, `useAtmosphere.ts:32`
— a booked adopt-event, not a blob rewrite. Do NOT repatriate the blob into value.js.

---

## 6. Candidate wave-items

- **S-blob-1 (P0, producer):** single-full-cost-surface policy (aurora↔blob backend coordination);
  born-RED on a `smoke-safari` two-context stress probe.
- **S-blob-2 (P0, producer):** scale-aware deformation ceiling (decel-kick + stretch + satellite
  excursion damped by footprint); measured against the ±35%/frame churn baseline recorded here.
- **S-blob-3 (P1, producer):** living satellites at rest — no-park-while-`satelliteCount>0` OR
  visible-orbit rest pose + widened hero `orbitRadius`; falsifier: a static hero screenshot shows
  ≥2 distinct satellite beads.
- **S-blob-4 (P1, demo):** hero footprint + on-card placement + mobile un-clip
  (`HeroBlob.vue` / `ColorPicker.vue`).
- **S-blob-5 (P0-verify):** stand up the missing Safari/WebKit blob repro on `smoke-safari` — the
  literal spazz was NOT reproducible on desktop Chrome; WebKit is the required vehicle.
- **S-blob-6 (deferred, producer):** ≤12-atom `BlobConfig` + `BlobPane` slider retirement.
- **S-blob-7 (incidental, api):** dev CORS — `api.color.babb.dev` sends
  `Allow-Origin: https://color.babb.dev`, blocking localhost (S-11 corroboration).

---

## 7. Honesty ledger
- Desktop Chrome did **not** reproduce a literal spazz; the Safari repro is an open P0 (S-blob-5),
  and the P0 contention root-cause is the leading *hypothesis*, evidence-grounded (two live GPU
  surfaces measured; WebGPU-vs-WebGL2 backend split confirmed) but **not yet WebKit-verified**.
- The green/pink color "decoupling" I first suspected was **my own probe** mutating the URL color —
  retracted; color tracking is correct.
- All fps/jitter/area numbers are from injected rAF probes; the *first* dt figures (25 fps) were
  contaminated by per-frame `getImageData` GPU readback and are discarded in favour of the
  readback-free cadence probe (72 fps).
