# AuroraPane — CHALLENGE-C (implementation) · PASS 2

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with, explicitly declared, not inherited.

---

## Standing on the prior pass

A pass-1 report existed at this path (written earlier today). It is preserved **verbatim** at
`challenge-C-implementation.pass-1-2026-07-28-prior.md`. This pass is independent: I re-derived
every claim from the tree and from live probes rather than adopting it. The result is
**three corroborations, two material corrections, and six findings pass-1 did not have.**

| pass-1 | this pass |
|---|---|
| C-1 lightnessScheme/lBand shipped-but-unused | **CORROBORATED + EXTENDED** — `hueSpread` and `chromaVariance` are shipped too (4 atoms, not 2) |
| C-2 strip lies about the field | **CORROBORATED + STRENGTHENED** — reproduced live at *two* seeds, Δ up to 44 rgb units |
| C-3 zones ceiling 6 vs 8 | **CORROBORATED** (+ the repo's own test contradicts itself in one `it()`) |
| C-4 `h-9` defeats the control floor; `text-caption` overrides the rung | **HALF CORRECTED** — `h-9` is real (36 vs 60px); **`text-caption` is a DEAD class**, it overrides nothing (measured 16.4px) |
| C-5 labels fail light (3.56), **dark passes at 6.12** | **CORRECTED** — measured against the real painted pixel, **both** schemes fail: light 3.89–3.94, dark 3.50–3.63 |
| C-6/C-7/C-8/C-9/C-10/C-11/C-12 | corroborated, folded in below |
| — | **NEW: C-1 (5-of-7 knobs inert on the css substrate), C-3 (the seam guarantee is itself broken), C-4 (3 of 10 media unreachable), C-9's false-oracle citation, C-11 "Vangogh", C-14 duplicate aria-label** |

---

## Subject, tree state, method

- Subject: `demo/scenes/atmosphere/AuroraPane.vue` (201 lines) + `aurora-atoms.ts`,
  `aurora-harmony-stops.ts`; parent `demo/scenes/ConfigSliderPane.vue`; provider
  `demo/color-picker/composables/boot/useAtmosphere.ts`; resolver
  `demo/color-picker/composables/boot/atmosphere-calibration.ts`; producer door
  `@mkbabb/glass-ui@7.0.0`.
- Tree: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `f36f780c` (the brief named
  `c654824e`; the range between them is docs-only — `AuroraPane.vue` and its two siblings are
  byte-identical across it).
- **9 probes, all committed under `probes/pass2/`, all output pasted in place**: 2 pure-module
  (`node`, direct ESM import of the consumed dist), 7 live headless-Chromium against
  `http://localhost:9000`. Plus the 4 real-Safari matrices in `audit/visual/REPORT.json` and both
  desktop screenshots read by eye.

**Verdict: DEFECTIVE.** Seventeen findings; nine MAJOR, seven of them with a live reproduction.

---

# MAJOR

## C-1 · MAJOR (NEW) — on the CSS substrate **five of the pane's seven knobs are structurally inert**, and nothing says so

`useAtmosphere.ts:158` resolves the render substrate **once at setup**:

```ts
const auroraRenderMode = resolveRenderMode("auto");
```

On a low-power or software-WebGL device it resolves to `"css"`, and the atmosphere becomes
(`useAtmosphere.ts:207-211`) `paletteToCssGradient(resolvedPalette.value)` — **the palette, and
nothing else**. `medium`, `zones.count`, `zones.arrangement`, `noise` and `motion` do not touch
`config.palette`; they drive `nuclei`, the warp fields, the texture pass and the drift fields —
all of which only the shader reads. So on that tier those five knobs are dead by construction.

**AuroraPane never learns this.** It does not inject `auroraRenderMode`, it renders no disabled
state, no notice, no degraded label. Seven controls, five of them permanently no-ops, presented
identically to the two that work.

**Live reproduction with positive controls** (`probes/pass2/p8-control.mjs`, headless Chromium
= SwiftShader ⇒ the `"css"` tier; `motion` first set to `Still` so the field is provably static —
the baseline hashed identically twice):

```
$ node probes/pass2/p8-control.mjs
baseline  {"patch":"a8c89a0286ea4835", "body":"linear-gradient(135deg, rgb(200,70,215) 0%, ...)"}

--- POSITIVE CONTROL: Harmony (a PALETTE atom) ---
  harmony=Monochrome     patchMoved=true   bg=rgb(238, 44, 130) ...
  harmony=Triad          patchMoved=true   bg=rgb(238, 44, 130) rgb(203,166,0) rgb(0,238,179) ...
  harmony=Complementary  patchMoved=true   bg=rgb(238, 44, 130) rgb(199,136,255) ...
--- and the Colour Energy slider (a PALETTE atom) ---
  energy row now "Colour Energy0.060"  patchMoved=true

--- NEGATIVE: the SHAPE atoms ---
  Painterly medium =Watercolor   patchMoved=false
  Painterly medium =Vangogh      patchMoved=false
  Zone arrangement =Centred      patchMoved=false
  Motion register  =Drifting     patchMoved=false
--- NEGATIVE: the Noise slider ---
  noise row now "Noise1"   (0.5 -> 1.0)  patchMoved=false
```

Two independent positive controls move the pixels; five shape knobs leave a **byte-identical** PNG.
`p7-liveness.mjs` confirms the substrate directly: `renderer: "ANGLE (Google, Vulkan 1.3.0
(SwiftShader Device …))"`, `fullPageGradientEl: "BODY.relative"`.

**Scope, stated honestly.** This is the `"css"` tier only. On a real-GPU device (the visual
REPORT's Safari matrices) the WebGL field is armed and those knobs live. But the `"css"` tier is a
**shipped, deliberate** degradation path — `useAtmosphere.ts:148-157` explains at length why it
exists — and this repo already wrote the honesty law for exactly it (`useAtmosphere.ts:283-290`,
"THE NO-FIELD HONEST TERMINAL … never a blank canvas presented as a field"). That law was applied
to the *canvas* and never to the *controls*.

**Mechanism.** A device-tier fact is known at one site and consumed at none; the pane's knob set is
a static literal with no relation to what the live substrate can express.

**Cure (transposition).** `useAtmosphere` already computes `auroraRenderMode`; provide it beside
`AURORA_ATOMS_KEY` (one more `provide`, zero new modules). `SliderSection`/the enum rows carry a
`substrate: "palette" | "field"` tag, and the pane renders the field-only rows disabled with the
one-line reason the composable already writes in prose. Seven honest knobs beats seven knobs of
which five lie.

---

## C-2 · MAJOR (corroborated, strengthened) — the harmony PreviewStrip **lies about the field it previews**; the O-14 truth law is broken at this site

`aurora-harmony-stops.ts:6-8` states the law it must satisfy:

> "THE TRUTH LAW (O-14): the strip a harmony row shows must be byte-identical to the palette
> selecting it yields."

What selecting yields on screen is not `resolveCalibratedAtmosphere(...)`. It is
`guaranteeSeamOffset(resolveCalibratedAtmosphere(...), seed)` — the P9-R3 derive-seam guarantee at
`useAtmosphere.ts:170` and `:181`, which shifts the whole palette's L by up to
`DERIVE_SEAM_FLOOR = 0.06`. `aurora-harmony-stops.ts:38` never applies it.

**Live, two seeds** (`probes/pass2/p4-truth-and-ax.mjs` — opens the Harmony select, reads the
*selected* row's stamped `data-stops`, converts through glass-ui's own `oklchStopToHex`, and
compares against `--saved-bg-0..3`, the material the page actually paints):

```
$ node probes/pass2/p4-truth-and-ax.mjs
===== GUARD-FIRING SEED  seed=oklch(0.5 0.16 10) =====
  STRIP  rgb : [[90,23,98],[148,35,92],[192,71,67],[211,125,54]]
  GROUND rgb : [[105,39,112],[165,52,106],[210,87,81],[228,140,71]]
  IDENTICAL? false   <-- THE STRIP DISAGREES WITH THE FIELD
  per-channel delta: [[-15,-16,-14],[-17,-17,-14],[-18,-16,-14],[-17,-15,-17]]

===== APP DEFAULT-ish SEED  seed=oklch(0.62 0.27 9.8) =====
  STRIP  rgb : [[141,0,155],[211,0,127],[255,77,77],[255,155,77]]
  GROUND rgb : [[160,37,174],[233,44,145],[255,99,95],[255,175,97]]
  IDENTICAL? false
  per-channel delta: [[-19,-37,-19],[-22,-44,-18],[0,-22,-18],[0,-20,-20]]
```

`oklch(0.62 0.27 9.8)` is **the exact seed the O-14 unit oracle uses** (see C-9).

**Extent** (`probes/pass2/p2-seam.mjs`, a 17×5 seed grid × 6 harmonies, both demo functions
transcribed verbatim):

```
strip != field in 210 / 510 (seed x harmony) cases;  max |dL| = 0.0600
```

41% of the seed space. At the app's cold-boot seed the guard does not fire and the strip is exact
(`p3-live.mjs` ground `[[200,70,215],[255,113,177],[255,182,175],[255,234,220]]` ≡ the converted
strip stops) — which is precisely why every gate and every eyeball has passed it.

**Mechanism.** A truth function and its referent were separated when P9-R3 landed in the provider;
the strip module was never re-pointed. Its oracle is structurally incapable of noticing (C-9).

**Cure.** The seam guarantee is *part of the field resolver*, not a decoration on it — but see
**C-3 first**: the resolver it must fold into is itself broken, so this cannot be a one-line
re-point.

---

## C-3 · MAJOR (NEW) — the seam guarantee C-2's cure must consume **does not hold its own guarantee**

`useAtmosphere.ts:88-90` states the contract:

> "Guarantee |field mean L − wax L| ≥ DERIVE_SEAM_FLOOR by shifting the whole derived palette
> uniformly away from the seed … internal spread preserved"

The implementation (`useAtmosphere.ts:99-108`):

```ts
let dir = delta >= 0 ? 1 : -1;
const need = DERIVE_SEAM_FLOOR - Math.abs(delta);
const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;
if (headroom < need) dir = -dir;
const push = dir * (DERIVE_SEAM_FLOOR - dir * delta);
return { ...config, palette: palette.map((stop) => ({ ...stop, L: clamp(stop.L + push, 0.02, 0.98) })) };
```

Two defects, one mechanism — **the headroom test is computed on the MEAN, the clamp is applied per
STOP**:

1. `headroom` asks whether the *mean* can travel `need`. But the clamp bites the *extreme stops*
   first. A palette whose top stop already sits near 0.98 gets that stop pinned while the rest
   shift, so the realised mean displacement is short of `push` and the floor is missed.
2. When `dir` flips, the required travel becomes `FLOOR + |delta|`, not `need = FLOOR − |delta|`.
   The headroom that was checked is not the headroom that is used.

```
$ node probes/pass2/p2-seam.mjs
=== B · does guaranteeSeamOffset actually deliver its own guarantee? ===
  guard FIRED in 1200 cases; guarantee BROKEN in 90 of them
  examples: [{"seed":"oklch(0.77 0 25)","h":"analogous","want":0.06,"got":0.0575}, ... ]

=== C · does the shift preserve the palette's internal spread, as claimed? ===
  guard fired 120 times; internal L-spread CHANGED in 9
  examples: [{"seed":"oklch(0.77 0 25)","spreadBefore":0.32,"spreadAfter":0.31},
             {"seed":"oklch(0.78 0 25)","spreadBefore":0.32,"spreadAfter":0.30}, ...]
```

7.5% of firings silently miss the WCAG-motivated wax↔field standoff the whole mechanism exists to
guarantee, and the "internal spread preserved" sentence is false in 7.5% of firings.

**Why this is an AuroraPane finding.** It is the referent of the pane's only truth-bearing
affordance. Any cure that points `auroraHarmonyStops` at the field resolver (C-2's cure) inherits
this. Attribution is explicit: the code is in `useAtmosphere.ts`, not in the pane.

**Cure.** Clamp-aware, still closed-form: compute the push, apply it, then measure the realised
mean and, if the clamp ate any of it, solve once more against the true per-stop headroom
`min(0.98 − max(L), min(L) − 0.02)`. Two passes, still no iteration — or drop the per-stop clamp
and let the derive domain own the range.

---

## C-4 · MAJOR (NEW) — **3 of the 10 shipped media are unreachable** through this pane, and the type annotation cannot catch it

`AuroraPane.vue:54-62`:

```ts
const MEDIA: AuroraMedium[] = ["smooth","pastel","watercolor","oil","crayon","vangogh","oil-pastel"];
```

The consumed union (`node_modules/@mkbabb/glass-ui/dist/components/aurora/constants/presets.d.ts:52`):

```ts
export type AuroraMedium = "smooth" | "pastel" | "watercolor" | "oil" | "crayon" | "vangogh"
                         | "oil-pastel" | "kuwahara" | "metal" | "metal-gradient";
```

```
$ node probes/pass2/p1-vocabulary.mjs
MEDIA         pane=7 dist=10  MISSING=["kuwahara","metal","metal-gradient"]  EXTRA=[]

  kuwahara        resolved medium=kuwahara        reachable=true  inPaneUI=false   <-- SHIPPED BUT UNREACHABLE IN THE UI
  metal           resolved medium=metal           reachable=true  inPaneUI=false   <-- SHIPPED BUT UNREACHABLE IN THE UI
  metal-gradient  resolved medium=metal-gradient  reachable=true  inPaneUI=false   <-- SHIPPED BUT UNREACHABLE IN THE UI
```

All three resolve cleanly through `resolveAtoms` — not producer-gated, simply never added.

**The mechanism is the annotation.** `MEDIA: AuroraMedium[]` type-checks a *subset* perfectly: a
missing union member is invisible to `tsc`. The other three vocabularies happen to be complete
(HARMONIES 6/6, ARRANGEMENTS 3/3, MOTIONS 3/3 — verified in the same probe), so the drift detector
that would have caught this never existed and nobody noticed the one that drifted.

**Cure.** Make the completeness checkable rather than hoped-for: a `Record<AuroraMedium, true>`
keyed literal (exhaustiveness is then a compile error) whose `Object.keys` feeds the `v-for`. One
construct, no new module, and the next producer medium fails the build instead of vanishing.

---

## C-5 · MAJOR (corroborated) — the Zones slider caps at **6**; the producer ceiling is **8**, and the repo's own test says so in the same `it()`

`AuroraPane.vue:103`: `{ key: "zones.count", label: "Zones", min: 1, max: 6, step: 1 }`.

`aurora-atoms.ts:35-38` justifies the 6 as a hard producer fact ("`MAX_NUCLEI = 6`, presets.ts:346
— a shader `#define`, so a count raise is atom-UNREACHABLE at the consumed dist").

```
$ node probes/pass2/p1-vocabulary.mjs
  zones.count=6   -> resolved nuclei = 6
  zones.count=7   -> resolved nuclei = 7   <-- ABOVE THE PANE SLIDER MAX
  zones.count=8   -> resolved nuclei = 8   <-- ABOVE THE PANE SLIDER MAX
  zones.count=9   -> resolved nuclei = 8
$ grep -n "define MAX_NUCLEI" node_modules/@mkbabb/glass-ui/dist/aurora.js
128:#define MAX_NUCLEI 8
402:#define MAX_NUCLEI 8
```

`demo/test/glass/aurora-bracket.test.ts:108-130` contradicts itself inside one test:

```ts
expect(landed.nuclei.length).toBe(6);   // "the ceiling, fully used"
…
expect(clamped.nuclei.length).toBe(8);  // "Glass 7 raised the ceiling from 6 → 8"
```

The standing owner mandate quoted in that comment is MANDATE §0.5, *"The aurora should have a few
more zones."* It was parked on a ceiling that lifted; two of the three newly-reachable steps remain
unreachable through the UI. The desktop screenshot shows the Zones thumb **pegged at the right
edge** at value 6 — the user is told they are at the maximum.

**Cure.** Do not carry the number in the demo. `resolveAtoms({zones:{count:99}}).nuclei.length`
derives it in one expression; or ask glass-ui to export `MAX_NUCLEI` (a one-const coordination
packet). Either way the literal `6` leaves `AuroraPane.vue`.

---

## C-6 · MAJOR (corroborated, extended) — **four** shipped ramp atoms are believed unshipped; the dark field is the visible cost

The demo asserts, as fact, in three places, that the ramp atoms are producer-gated:

- `useAtmosphere.ts:233-236` — "the atoms door ships no scheme/lBand (GAP-L2, probed at this dist)"
- `atmosphere-calibration.ts:29-35` — "Q2-FULL (P1-GATED …): chroma-adaptive hueSpread [24°,64°] ·
  the +165° counterpoint stop … the dark lBand — all atom-unreachable at the consumed dist"
- `aurora-atoms.ts:31-33` — "the WIDER chroma-adaptive fan … are the Q2-FULL half (P1-gated atoms)"

Measured at the consumed dist, through the demo's own resolver path:

```
$ node probes/pass2/p1-vocabulary.mjs
=== D · the atoms the demo prose calls 'P1-gated / atom-unreachable' ===
  baseline                  meanL=0.6200 hueSpread=341.33 chromaSpread=0.0975
  lightnessScheme:"dark"    meanL=0.3000  CHANGED=true
  lBand:[0.18,0.42]         meanL=0.3000  CHANGED=true
  hueSpread:64              hueSpread=317.33  CHANGED=true
  chromaVariance:1          chromaSpread=0.1855  CHANGED=true
  +chromaCounterpoint:true  chromaSpread=0.1855  CHANGED=false
```

**Four of the five are live.** (Pass-1 found two.) `AuroraPane.vue` exposes none of them, in
`SECTIONS` or in the enum rows, and `DEFAULT_AURORA_ATOMS` carries no key for any.

**The consequence is visible.** `visual/shots/safari-desktop-light/atmosphere.png` and
`safari-desktop-dark/atmosphere.png` — read by eye — carry an **identical** salmon→pink field;
only the card plate darkens. That is verbatim the composition glass-ui's own doc-comment names as
the defect `lightnessScheme` exists to cure:

> "never a washed-pale salmon field with dark cards floating on it (the dark-leg defect)"

`chromaCounterpoint` is a genuine producer no-op at this dist (measured above, `CHANGED=false`
even at `chromaVariance: 1`, against its documented "the deepest ramp stop is pinned to the
sage-whisper pole"). **glass-ui is not ours to edit this formation — that one is a coordination
packet, not a wave.**

**Cure.** `lightnessScheme` is not a knob, it is the shell's state: feed it from `useGlobalDark`'s
`isDark` at the single site the field resolves (`useAtmosphere.ts:170`). That also collapses the
*second*, separate `deriveAurora(seed, {scheme:"dark"})` call at `:243` — which exists only because
the field could not be banded — into one derive path. Two paths become one.

---

## C-7 · MAJOR (half corrected) — `h-9` defeats the coarse-pointer control floor; **`text-caption` is a dead class**

`AuroraPane.vue:122,142,156,170` all pass `class="h-9 text-caption min-w-menu"` to `SelectTrigger`.

**`h-9` is real and harmful.** glass-ui's `SelectTrigger` resolves its height from a responsive
token; `h-9` is a flat `2.25rem` that overrides both the density response and the touch floor:

```
$ node probes/pass2/p3-live.mjs
########## MOBILE iPhone 14 ##########
  (pointer:coarse)=true  --ui-scale='1.5'  --control-floor='2.75rem'
  --control-h-md='max(calc(2.5rem * 1.5), 2.75rem)'      ->  60px
  trigger LEFT spread = 50.1px   heights = 36,36,36,36
########## DESKTOP 1440x900 ##########
  --control-h-md='max(calc(2.5rem * 1), 0px)'            ->  40px
  heights = 36,36,36,36
```

**36px where the design system resolves 60px** on coarse pointers — a 40% shortfall, below the
44px touch guidance, on four of the pane's seven controls. (The visual REPORT's tap-target probe
uses a 24px threshold, so it scores these clean; they are not.)

**`text-caption` is inert — pass-1's claim that it overrides the `text-dropdown` rung is wrong:**

```
$ node probes/pass2/p9-tokens.mjs
 "trigger":            { "height":"36px", "minWidth":"176px", "fontSize":"16.4px" }
 "probe_h9":           { "height":"36px",   "fontSize":"18.608px" }
 "probe_text_caption": { "fontSize":"14.384px" }
 "probe_text_dropdown":{ "fontSize":"16.4px" }
```

In isolation `text-caption` computes 14.384px; on the trigger the computed size is **16.4px** —
`text-dropdown`, the producer's own rung. The class loses the cascade and does nothing. So the pane
carries four per-instance overrides (edict 5), one of which is actively harmful and one of which is
decoration that has never applied. `min-w-menu` is live (176px).

**Cure.** Delete both. If the smaller register is genuinely wanted, that is `size="sm"` — the
shipped prop, which still honours `--ui-scale` and `--control-floor`.

---

## C-8 · MAJOR (corrected) — the four enum-row labels fail WCAG 1.4.3 in **both** schemes

`AuroraPane.vue:194-200`: `.aurora-row-label { … color: var(--muted-foreground); }`

This repo has already ruled against that raw token twice on this very pane's surface
(`demo/shared/ui/PaneHeader.vue:24-29`; `demo/scenes/ConfigSliderPane.vue:190-206`). AuroraPane's
four labels sit inside that same pane and were never re-inked.

Measured by **sampling the actual painted pixel** from a screenshot of the plate immediately below
each label, then WCAG-contrasting the computed ink against it (`probes/pass2/p6-ink-and-knobs.mjs`
— no composite model, no assumed ambient):

```
############ scheme=light ############
   {"text":"Harmony",    "ink":"rgb(112, 89, 66)","plate":"rgb(244,181,217)","fontSize":"16.4px","ratio":3.9, "need":4.5}   <-- BELOW WCAG 1.4.3
   {"text":"Arrangement","ink":"rgb(112, 89, 66)","plate":"rgb(244,181,216)","ratio":3.89,"need":4.5}   <-- BELOW
   {"text":"Medium",     "ink":"rgb(112, 89, 66)","plate":"rgb(244,183,214)","ratio":3.94,"need":4.5}   <-- BELOW
   {"text":"Motion",     "ink":"rgb(112, 89, 66)","plate":"rgb(244,183,213)","ratio":3.94,"need":4.5}   <-- BELOW
   sibling ConfiguratorRow label: {"text":"Colour Energy","color":"rgb(28, 25, 23)"}
############ scheme=dark ############
   {"text":"Harmony",    "ink":"rgb(195, 185, 172)","plate":"rgb(122,74,100)","ratio":3.63,"need":4.5}   <-- BELOW
   {"text":"Arrangement","ink":"rgb(195, 185, 172)","plate":"rgb(122,75,99)", "ratio":3.6, "need":4.5}   <-- BELOW
   {"text":"Medium",     "ink":"rgb(195, 185, 172)","plate":"rgb(122,77,100)","ratio":3.53,"need":4.5}   <-- BELOW
   {"text":"Motion",     "ink":"rgb(195, 185, 172)","plate":"rgb(122,78,99)", "ratio":3.5, "need":4.5}   <-- BELOW
   sibling ConfiguratorRow label: {"text":"Colour Energy","color":"rgb(233, 230, 226)"}
```

16.4px, weight 400 ⇒ WCAG 1.4.3 requires 4.5:1. **Eight failures — four labels × two schemes.**
Pass-1 reported dark as passing at 6.12:1 under a re-implemented composite model; the direct
pixel measurement says 3.50–3.63. Four inches away on the same plate, the sibling
`ConfiguratorRow` label inks at rgb(28,25,23) light / rgb(233,230,226) dark — near-black on light,
near-white on dark — the maximum-contrast choice. The divergence is entirely the token.

**Cure.** The same one-line cure the sibling already took (the certified `--ink-muted` rung); or,
better, per C-10 — stop hand-authoring the row label at all, which deletes this CSS block whole.

---

## C-9 · MAJOR (test truth) — nothing tests this component, the oracle that names it compares it **to itself**, and its cited oracle **does not exist**

```
$ grep -rn "AuroraPane" --include="*.ts" --include="*.vue" . | grep -v node_modules | grep -v ^./docs
demo/shell/usePaneRouter.ts:77   (the only non-prose hit: the async import)
$ grep -rn "aurora-row|Palette harmony|Zone arrangement|Painterly medium|Motion register" e2e/ test/ demo/test/
(no matches)
$ grep -rln "@vue/test-utils|mount(" test/ demo/test/
(no matches — the repo has NO component-mount tests at all)
```

Three separate blindnesses:

1. **No test mounts it.** Nor any component. `usePaneRouter.ts:88` is the sole mount site.
2. **The O-14 unit oracle is self-referential.** `demo/test/glass/aurora-bracket.test.ts:165-184`
   compares `auroraHarmonyStops(atoms, h)` against `resolveCalibratedAtmosphere({...atoms,h}).palette`
   — the *same function the strip itself calls* — and it does so at seed `"oklch(0.62 0.27 9.8)"`,
   the exact seed I proved live diverges from the painted field by up to 44 rgb units (C-2). It is
   structurally incapable of observing the defect.
3. **`aurora-harmony-stops.ts:11-13` cites an oracle that carries no aurora coverage.** It claims
   "the vitest oracle (`test/preview-chips.test.ts`) holds this function strictly equal to a direct
   recompute." That file is 97 lines and its four `it()` blocks are all `sampleInterpolationRamp` /
   `mixColors`:
   ```
   $ grep -n "aurora" test/preview-chips.test.ts   ->  (nothing)
   $ grep -n "it(" test/preview-chips.test.ts
   53: two operands …   65: three operands …   78: every stop serializes paintable …   90: honest absence …
   ```
   The e2e half it names (`o14-preview-truth.spec.ts`, 560 lines) covers the T-10 letterform ramp
   and the T-17 mix chips; it never visits `/#/atmosphere` and never opens the Harmony select.
4. The only e2e that censuses this route (`o18-contrast-census.spec.ts:934,950,959`) selects
   `.config-console .configurator-row …` — the *parent's* rows. The enum rows are provably not in
   there (`p3-live.mjs`: `enum rows inside .console-well? false`), which is why C-8 has ridden
   every close.

**Exact mutations that keep the entire suite green** (the vacuous-gate proof):

| # | Mutation | Result |
|---|---|---|
| M1 | Swap the `@update:model-value` handlers on Medium and Motion (`:155` ↔ `:169`) | GREEN |
| M2 | Delete the whole default-slot `<div>` (`:118-180`) — all four enum controls vanish | GREEN |
| M3 | `SECTIONS[0].defs[2].max: 6 → 1` (Zones becomes a dead slider) | GREEN |
| M4 | Delete `guaranteeSeamOffset` from `useAtmosphere.ts:170`/`:181` | GREEN — **and the O-14 test becomes MORE correct**, because the divergence it cannot see disappears |
| M5 | `function setHarmony() {}` (harmony unwritable) | GREEN |
| M6 | Delete `"vangogh"` and `"oil-pastel"` from `MEDIA` | GREEN — the union annotation accepts any subset (C-4) |

M4 is the proof the oracle's verdict is **inverted** with respect to the law it claims to hold.

**Cure.** One Playwright leg on `/#/atmosphere` that (a) reads each option's `data-stops` — the
strip already stamps them, `PreviewStrip.vue:44` — (b) selects that option, (c) reads
`--saved-bg-0..3`, (d) asserts equality. That is the O-14 law as written, measured against its real
referent, and it fails today. Plus an o18 census leg on `.aurora-row-label`, and a liveness leg
that asserts each knob moves *something* (which would have caught C-1).

---

## C-10 · MAJOR (corroborated) — the pane rebuilds the row primitive its own parent composes; the control column is ragged by 58.7px

`AuroraPane.vue:187-192` hand-rolls `.aurora-row { display:flex; justify-content:space-between }`.
With no label column, each trigger's left edge is a function of its label's text length:

```
$ node probes/pass2/p3-live.mjs      # 1440x900
  {"label":"Harmony",    "labelW":82.1, "trigLeft":318.1,"trigW":897.9}
  {"label":"Arrangement","labelW":129.1,"trigLeft":365.1,"trigW":850.9}
  {"label":"Medium",     "labelW":70.4, "trigLeft":306.4,"trigW":909.6}
  {"label":"Motion",     "labelW":70.4, "trigLeft":306.4,"trigW":909.6}
  trigger LEFT spread = 58.7px      (mobile: 50.1px)
  enum rows inside .console-well? false  (a .console-well exists: true)
```

Plainly visible in `shots/safari-desktop-light/atmosphere.png`: "Analogous", "Scattered", "Smooth",
"Drifting" all start at different x. Meanwhile the *parent* states the law being broken
(`ConfigSliderPane.vue:6-10`):

> "glass-ui already ships `./configurator` with ConfiguratorRow … This component uses
> ConfiguratorRow for each labeled row so the demo composes the existing glass-ui surface rather
> than rebuilding the row primitive."

AuroraPane rebuilds it — and puts the result **outside** the `.console-well` that holds the
sliders, so one pane shows two unrelated row grammars (both screenshots).

**Cure — one transposition that kills C-7, C-8 and C-10 together.** Render the four enum rows as
`<ConfiguratorRow :label="…">` — the primitive already imported one file up — inside the same
`.console-well`. Grid alignment, certified label ink and the tokenized control height all arrive by
construction; `.aurora-row` / `.aurora-row-label` are deleted.

---

# MINOR / INFO

## C-11 · MINOR (NEW) — the pane renders the painter's name as **"Vangogh"**

`AuroraPane.vue:65-70`'s `label()` splits on `-` and title-cases. The producer identifier `vangogh`
has no hyphen, so it survives as one word. Live DOM, the Medium dropdown as it actually renders:

```
$ node probes/pass2/p7-liveness.mjs
1 · the exact option text the pane's label() emits (Medium)
  ["Smooth","Pastel","Watercolor","Oil","Crayon","Vangogh","Oil Pastel"]
```

**Mechanism.** A mechanical identifier→prose transform standing in for a display-name map. It is
correct for 6 of 7 by luck of spelling and will mis-render each of the three media C-4 says are
missing too (`metal-gradient` → "Metal Gradient" is fine; `kuwahara` is a surname and will read as
a bare token).

**Cure.** The vocabulary should carry its own display name. The `Record<AuroraMedium, string>` that
C-4's cure introduces for exhaustiveness *is* that map — one construct fixes both, and `label()`
(a 6-line generic string-masher, an owner-edict-3 contrivance) disappears.

## C-12 · MINOR (corroborated) — three fallback constants disagree with the defaults they shadow

`AuroraPane.vue:74,76,82`:

```ts
const arrangement = () => atoms.zones?.arrangement ?? "composed";   // DEFAULT is "scattered"
const motion      = () => atoms.motion ?? "breathing";              // DEFAULT is "drifting"
function setArrangement(v) { const count = atoms.zones?.count ?? 4;  // DEFAULT count is 6
```

All three are stale, left by the T-32 rider and U33 (documented at `aurora-atoms.ts:39-45` and
`:59-62`). They are currently unreachable — `useAtmosphere.ts:128` seeds every key via
`structuredClone(DEFAULT_AURORA_ATOMS)` and `resetDefaults` uses `Object.assign`, which never
deletes — but they are exactly the masking fallback owner edict 2 forbids: were `zones` ever
absent, changing *arrangement* would silently drop the count 6 → 4.

**Reproduction: NONE — a latent/dead-path defect, labelled as such.**

**Cure.** The one source of truth is imported two lines above: `atoms.harmony ??
DEFAULT_AURORA_ATOMS.harmony`, etc. No hand-copied literal survives.

## C-13 · MINOR (corroborated) — 12px-wide slider thumbs; the coarse cure covers only the block axis

```
$ node probes/pass2/p3-live.mjs
DESKTOP: slider thumbs: [{"label":"Colour Energy","w":12,"h":24},{"label":"Noise","w":12,"h":24},{"label":"Zones","w":12,"h":24}]
MOBILE : slider thumbs: [{"label":"Colour Energy","w":12,"h":44},{"label":"Noise","w":12,"h":44},{"label":"Zones","w":12,"h":44}]
```

These are **3 of the 7** small-tap-target defects `REPORT.json` attributes to `/#/atmosphere` in all
four Safari matrices. `ConfigSliderPane.vue:218-229` extends the hit area on the **block** axis only
(`block-size: max(100%, var(--dock-touch-target))`); the inline axis stays 12px everywhere, so WCAG
2.5.8's 24×24 fails on desktop and mobile alike. Shared mechanism with `ConfigSliderPane` /
glass-ui's `Slider`; AuroraPane owns the three rows.

## C-14 · MINOR (NEW) — a duplicated `aria-label` on a role-less wrapper

Observed while driving the Noise slider (Playwright strict-mode violation, which is the evidence):

```
locator('[aria-label="Noise"]') resolved to 2 elements:
  1) <span data-slot="slider" aria-label="Noise" class="glass-slider" …>      <-- no role
  2) <span tabindex="0" role="slider" aria-label="Noise" aria-valuenow="0.5" …>
```

`ConfigSliderPane.vue:145` sets `:aria-label="def.label"` on `<Slider>`; glass-ui forwards it to
both the root wrapper and the thumb. An `aria-label` on a role-less generic is ignored by AT
(harmless) but it is a duplicated name in the automation surface and an ARIA misuse. Attribution:
`ConfigSliderPane` + glass-ui, with AuroraPane's three `SECTIONS` defs as the rows in question.
**A coordination packet if glass-ui owns the forwarding.**

## C-15 · MINOR (corroborated, HYPOTHESIS) — `inject(...)!` with no default is a white-screen trapdoor

`AuroraPane.vue:42`: `const atoms = inject(AURORA_ATOMS_KEY)!;` — no default, and every template
expression dereferences it. Mounted outside `useAtmosphere`'s provider, setup yields `undefined`
and the first render throws — the `inv-N-1` white-screen class `useAtmosphere.ts:122-126` guards
against elsewhere. **Reproduction: NONE today** — `usePaneRouter.ts:88` is the only mount site.
Labelled a hypothesis. It becomes real the moment anyone writes the component test C-9 asks for.
**Cure:** `inject(AURORA_ATOMS_KEY, structuredClone(DEFAULT_AURORA_ATOMS))` — the default is
already in the file's own imports, so it costs nothing and is not a compat shim.

## C-16 · MINOR (corroborated) — two `as unknown as` casts hand the dot-path sliders an untyped key space

`AuroraPane.vue:111,113` cast both `atoms` and `DEFAULT_AURORA_ATOMS` to `Record<string, unknown>`.
`SliderDef.key` is a bare `string` and `ConfigSliderPane.writePath` (`:66-73`) walks it unchecked,
so a typo `"zones.cont"` compiles and ships, silently creating a junk key or throwing
`Cannot set properties of undefined` if an intermediate segment is absent. The pane's own knob names
are the one thing the atom type could have checked, and the cast is what stops it.

Also under this head, edict 7: `harmony`/`arrangement`/`medium`/`motion` (`:73-76`) are plain
functions re-invoked on every render rather than `computed`. (Not a `defineModel` hazard — the pane
has none.)

## C-17 · INFO — the dead-looking ternary

`AuroraPane.vue:90`: `atoms.medium = kind === "smooth" ? { kind } : { kind };` — both branches are
byte-identical at runtime. It is a real TS **narrowing** device against the medium-discriminated
`AuroraAtoms` union (`atoms.d.ts:155-167`), so it is not dead code — but it reads as dead code and
its comment (`:86-88`) explains an `amount` distinction the expression does not make. Delete the
comment or replace the construct with an explicit narrowing that says what it is.

---

## Negative proofs — hazard classes I checked and found SOUND

I was told the implementation is defective. These are **not** how:

1. **No rAF, no listeners, no observers, no timers, no async, no cleanup surface.** AuroraPane is
   fully declarative: one `inject`, four handlers, one const array. The PRM-RAF epidemic, leaked
   listeners, unbounded growth and missing-cleanup classes are *structurally absent*, not merely
   unobserved. (Per the brief, the aurora rAF loop is glass-ui's and was verified by the root.)
2. **No `defineModel`, no `ValueUnit`, no `stableHue`, no `parseCssColor`, no WebGL, no reka-ui
   slider pointer-capture surface** in this file. Every named local hazard is off this component.
3. **A hypothesis of mine, REFUTED.** I suspected `aria-label` on the four `SelectTrigger`s would
   suppress the current value from the accessibility tree. It does not — the raw CDP node
   (`probes/pass2/p5-ax-raw.mjs`) shows `role: "combobox"`, `name: "Palette harmony"` (nameFrom
   `aria-label`), **`value: {"type":"string","value":"Analogous"}`**, `hasPopup=listbox`,
   `expanded=false`. Name and value are both exposed. Recording the refutation because a seat that
   only reports its confirmed guesses is not measuring.
4. **WCAG 2.5.3 Label in Name passes** on all four rows: "Harmony" ⊂ "Palette harmony",
   "Arrangement" ⊂ "Zone arrangement", "Medium" ⊂ "Painterly medium", "Motion" ⊂ "Motion register".
5. **The PreviewStrip does not pollute option names or typeahead.** `PreviewStrip.vue:39` is
   `aria-hidden="true"`; live, all six options carry `"ariaLabel":null` with clean text
   (`"Analogous"`, `"Split Complementary"`, …) and `"stripAriaHidden":"true"`.
6. **The strip is not palette-blind** — the chronic C2 disease does not manifest here.
   `distinct data-stops: 6 of 6` on the live open dropdown, desktop and mobile.
7. **Focus is restored on Escape.** `p3-live.mjs` section E: `focus after Escape: Palette harmony`,
   both matrices. Keyboard opening via Enter works; six options render.
8. **Reset is correct and does not clobber the picker colour.** Live: after exercising every enum
   knob, Reset restores `["Analogous","Scattered","Smooth","Drifting"]` — exactly
   `DEFAULT_AURORA_ATOMS`. `structuredClone` at both `useAtmosphere.ts:128` and
   `ConfigSliderPane.resetDefaults` means the module-level default is never aliased or mutated, and
   it carries no `seed`, so the colour survives.
9. **Zero page errors, zero console errors, zero horizontal overflow** on `/#/atmosphere` across all
   four real-Safari matrices (`REPORT.json`) and across every one of my seven live runs (the only
   console line is the app-wide `VITE_API_URL` dev-config warning). **`namelessButtons: 0`** on this
   route; all four triggers carry `aria-label`.
10. **`verbatimModuleSyntax` is honoured** — all four type-only import groups (`AcceptableValue`,
    the four aurora atom types, `SliderSection`) are `import type` (`AuroraPane.vue:25,26,34`).
11. **`demo/ui/select` is a pure re-export of glass-ui** (`export { Select, SelectTrigger, … } from
    "@mkbabb/glass-ui"`) — edict 4 is honoured at the import, whatever C-7 does to it downstream.
12. **The strip recompute is not a perf defect.** `SelectContent` genuinely unmounts when closed, so
    the six-candidate resolve is paid only while the menu is open; the "zero rest cost" claim at
    `AuroraPane.vue:36-38` holds.
13. **HARMONIES, ARRANGEMENTS and MOTIONS are complete** against the consumed unions (6/6, 3/3, 3/3).
    Only MEDIA drifted (C-4).

---

## Family grouping — four mechanisms generate fifteen of the seventeen findings

- **A producer fact frozen in consumer prose, never re-probed after the Glass 7 adoption** —
  C-4 (3 media), C-5 (`MAX_NUCLEI`), C-6 (4 ramp atoms), C-12 (default drift). The demo
  hand-maintains duplicates of producer capabilities and there is no drift detector; W44
  re-verified the *build*, not the *claims*. C-4 shows the type annotation cannot serve as one.
- **A truth function separated from its referent, guarded by an oracle pointed the wrong way** —
  C-2, C-3, C-9. The O-14 law is stated in prose in four places and enforced against the wrong
  side in all of them; one cited oracle does not exist.
- **A hand-rolled surface where a shipped primitive exists** — C-7, C-8, C-10, C-11. One 14-line CSS
  block, one class string and one 6-line string-masher re-derive `ConfiguratorRow`, the control
  tokens and a display-name map, worse, and carry the alignment, contrast and typography defects
  with them.
- **A capability known at one site and consumed at none** — C-1. `auroraRenderMode` is computed and
  never told to the surface whose entire job is to expose what the substrate can do.

## Strongest defect

**C-2** — the harmony strip, the pane's only truth-bearing affordance, disagrees with the field it
claims to preview in 210 of 510 measured seed×harmony cases and at both live seeds I drove (Δ up to
44 rgb units per channel), violating a law the file itself states in its own header; and the oracle
that names that law compares the strip to itself, at the exact seed where the divergence is largest,
so the gate is *inverted* — M4 (deleting the seam guarantee) makes the test pass harder while making
the product worse. C-3 then shows the resolver the strip must be re-pointed at is itself broken in
7.5% of firings, so this is not a one-line re-point but a real repair.

**C-1 is the most surprising** and would be my pick if scope were unrestricted: on the shipped
software-WebGL tier, five of the seven knobs this pane exists to offer are byte-verified no-ops
with no honesty signal — in an app that already wrote the honest-terminal law for exactly that tier.

---

## Probe index (all committed, all re-runnable)

| file | what it proves |
|---|---|
| `probes/pass2/p1-vocabulary.mjs` | C-4 (media drift), C-5 (zones ceiling 8), C-6 (4 ramp atoms live) |
| `probes/pass2/p2-seam.mjs` | C-2 (210/510 grid), C-3 (90/1200 broken guarantee, 9/120 spread crush) |
| `probes/pass2/p3-live.mjs` | C-7 (36 vs 60px), C-10 (58.7/50.1px spread), C-13 (12×24 thumbs), negatives 5–7, 9 |
| `probes/pass2/p4-truth-and-ax.mjs` | C-2 live at two seeds vs `--saved-bg-*` |
| `probes/pass2/p5-ax-raw.mjs` | negative proof 3 (the refuted a11y hypothesis) |
| `probes/pass2/p6-ink-and-knobs.mjs` | C-8 (8 contrast failures, light + dark, pixel-sampled) |
| `probes/pass2/p7-liveness.mjs` | C-1 substrate identification, C-11 ("Vangogh"), negative proof 8 |
| `probes/pass2/p8-control.mjs` | C-1 with two positive controls — the result that makes the nulls mean something |
| `probes/pass2/p9-tokens.mjs` | C-7's correction (`text-caption` is dead) |
