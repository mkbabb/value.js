# AuroraPane — CHALLENGE-C (implementation)

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with, declared, not inherited.

---

## Subject & method

- Subject: `demo/scenes/atmosphere/AuroraPane.vue` (201 lines) + its two colocated modules
  `aurora-atoms.ts`, `aurora-harmony-stops.ts`, its parent `demo/scenes/ConfigSliderPane.vue`,
  its provider `demo/color-picker/composables/boot/useAtmosphere.ts`, and the producer door
  `@mkbabb/glass-ui@7.0.0 /dist/components/aurora/composables/atoms.d.ts`.
- Repo state: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `32b4040e`
  (the brief named `c654824e`; the tree advanced during the formation — AuroraPane and its
  siblings are byte-identical across the range, `git log --oneline` shows only docs commits).
- Probes actually run (all pasted below in-place): 4 headless-Chromium live runs against
  `http://localhost:9000`, 4 `vite-node` pure-module runs, 1 `vue-tsc -p tsconfig.demo.json`,
  1 `vitest run demo/test/glass/aurora-bracket.test.ts`, and the 4 real-Safari matrices in
  `docs/tranches/V/megatranche/audit/visual/REPORT.json` + both desktop screenshots read by eye.

**Verdict: DEFECTIVE.** Twelve findings; five MAJOR, of which four carry a live reproduction.

---

## C-1 · MAJOR — the dark-scheme field is still light-band, and the cure is a SHIPPED atom the demo believes is producer-gated

**Evidence.** glass-ui 7.0.0 ships two lightness atoms on the atoms door:

`node_modules/@mkbabb/glass-ui/dist/components/aurora/composables/atoms.d.ts` (interface
`AuroraAtomsBase`):

```
lightnessScheme?: "light" | "dark";   // "shifts the WHOLE ramp into the luminous-dark band
                                      //  [0.18, 0.42] ... never a washed-pale salmon field
                                      //  with dark cards floating on it (the dark-leg defect)"
lBand?: readonly [number, number];    // "an explicit derived L band ... OVERRIDES lightnessScheme"
```

Both are live and reachable through the demo's own calibrated resolver:

```
$ npx vite-node scratchpad/probe4.mts
no scheme        mean L = 0.6600 0.500,0.607,0.713,0.820
lightnessScheme dark    = 0.3000 0.180,0.260,0.340,0.420
lBand [0.18,0.42]       = 0.3000 0.180,0.260,0.340,0.420
REACHABLE at the atoms door? true true
```

`demo/color-picker/composables/boot/useAtmosphere.ts:233-236` asserts the opposite, as fact:

> "The FIELD itself remains light-band in dark — the atoms door ships no scheme/lBand (GAP-L2,
> probed at this dist: seed-atom resolution clobbers a base-palette override) — that half rides
> packet P1 and the W7 re-verify"

That is FALSE at the consumed dist. `AuroraPane.vue` — the file whose own header calls itself
"the ≤7-knob consumer-facing surface" — exposes neither atom in `SECTIONS` (lines 97-106) nor in
the four enum rows (lines 117-180), and `DEFAULT_AURORA_ATOMS` (aurora-atoms.ts:53-71) carries
neither key.

**The consequence is visible.** `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/atmosphere.png`
and `.../safari-desktop-dark/atmosphere.png` share an **identical** salmon→pink field; only the
card plate darkens. That is precisely the composition glass-ui's own doc-comment names as the
defect the atom exists to cure.

**Reproduction.** `npx vite-node` on the three-line probe above; or open
`http://localhost:9000/#/atmosphere` in a dark-scheme context and compare the field to light.

**Mechanism.** A stale producer-capability claim frozen in a consumer comment, never re-probed
after the Glass 7 adoption (W44). The pane's knob vocabulary is a hand-maintained duplicate of a
producer union with no drift detector.

**Cure (transposition, not patch).** `useAtmosphere` feeds `lightnessScheme` from `useGlobalDark`'s
`isDark` at the ONE place the field is resolved (`useAtmosphere.ts:170`), which makes the ground
banding at `useAtmosphere.ts:237-247` — currently a second, *separate* `deriveAurora(seed,{scheme:"dark"})`
call that exists only because the field could not be banded — collapse into the same source. Two
derive paths become one. AuroraPane then exposes the band as a knob only if the owner wants it
tunable; the scheme itself is not a knob, it is the shell's state.

---

## C-2 · MAJOR — the harmony PreviewStrip LIES about the field it previews (the O-14 truth law is violated at this site)

`aurora-harmony-stops.ts:2-13` states the law it must satisfy:

> "THE TRUTH LAW (O-14): the strip a harmony row shows must be byte-identical to the palette
> selecting it yields."

What selecting yields **on screen** is not `resolveCalibratedAtmosphere(...)`. It is
`guaranteeSeamOffset(resolveCalibratedAtmosphere(...), seed)` — the P9-R3 derive-seam guarantee at
`useAtmosphere.ts:92-110`, which uniformly shifts the whole palette's L by up to `DERIVE_SEAM_FLOOR
= 0.06` whenever the field mean L would land within 0.06 of the wax L.
`aurora-harmony-stops.ts:38` never applies it.

**Live reproduction — one URL:**

```
$ node scratchpad/live3.mjs      # headless chromium, 1440x900
URL seed  : oklch(0.5 0.16 10)
STRIP  (AuroraPane 'Analogous' row): oklch(0.35 0.136 323.568) | oklch(0.4567 0.1568 354.5227) | ...
STRIP  rgb : [[90,23,98],[148,35,92],[192,71,67],[211,125,54]]
GROUND (--saved-bg-*, the painted field material): #692770 | #a5346a | #d25751 | #e48c47
GROUND rgb : [[105,39,112],[165,52,106],[210,87,81],[228,140,71]]
IDENTICAL?  false   <-- THE STRIP LIES ABOUT THE FIELD
```

Navigate to `http://localhost:9000/#/atmosphere?space=oklch&color=oklch(0.5%200.16%2010)`, open
the Harmony select, and the *currently-selected* row's strip is 15 rgb units darker per channel
than the field behind it.

**Extent.** Re-running the verbatim `guaranteeSeamOffset` over a 14×5 seed grid × 4 harmonies:

```
$ npx vite-node scratchpad/probe3.mts
strip != painted in 140 / 280 (seed x harmony) cases; max |dL| = 0.0600
```

Half the seed space. (At the app's *default* seed the guard does not fire, which is why every
gate and every eyeball has passed it — `live2.mjs` confirms strip rgb ≡ ground rgb there.)

**Mechanism.** A truth function and its referent were separated when P9-R3 landed in the
provider; the strip module was never re-pointed. The unit oracle cannot see it (see C-6).

**Cure.** The seam guarantee is the *field resolver*, not a decoration on it. Export one
`resolveAtmosphereField(atoms)` from `boot/atmosphere-calibration.ts` that composes
`resolveCalibratedAtmosphere` ∘ `guaranteeSeamOffset`, and make `useAtmosphere` and
`aurora-harmony-stops` both consume it. One resolver, two consumers — the same shape the O-14
`palettes-ramp` leg already uses.

---

## C-3 · MAJOR — the Zones slider caps at 6; the producer ceiling is 8 at Glass 7

`AuroraPane.vue:103`:

```ts
{ key: "zones.count", label: "Zones", min: 1, max: 6, step: 1 },
```

`aurora-atoms.ts:35-40` justifies the 6 as a hard producer fact:

> "`count: 6` IS the producer ceiling (`MAX_NUCLEI = 6`, presets.ts:346 — a shader `#define`, so a
> count raise is atom-UNREACHABLE at the consumed dist; the ceiling lift is a producer book"

The consumed dist says otherwise:

```
$ grep -n "define MAX_NUCLEI" node_modules/@mkbabb/glass-ui/dist/aurora.js
128:#define MAX_NUCLEI 8
402:#define MAX_NUCLEI 8

$ npx vite-node scratchpad/probe.mts
  zones.count=6 -> resolved nuclei = 6
  zones.count=7 -> resolved nuclei = 7
  zones.count=8 -> resolved nuclei = 8
  zones.count=9 -> resolved nuclei = 8
```

The repo's own test already knows (`demo/test/glass/aurora-bracket.test.ts:117-119`: "Glass 7 raised
the ceiling from 6 → 8") and asserts `clamped.nuclei.length === 8`. The slider was never followed.

The standing owner mandate this blocks is quoted in the same comment: MANDATE §0.5, *"The aurora
should have a few more zones."* It was parked on a ceiling that has since lifted. Two of the three
reachable steps are unreachable through the UI.

**Reproduction.** The probe above; or drag Zones on `/#/atmosphere` — it stops at 6.

**Mechanism.** A producer constant hardcoded in a consumer literal, with the justification frozen
in prose rather than derived.

**Cure.** glass-ui exports the ceiling implicitly through `resolveAtoms`' clamp. The pane should
not carry the number at all: derive `max` once — `resolveAtoms({zones:{count:99}}).nuclei.length` —
or ask glass-ui to export `MAX_NUCLEI` (a coordination packet, one const). Either way the literal
`6` leaves the demo.

---

## C-4 · MAJOR — `class="h-9"` on the four Select triggers defeats the design system's coarse-pointer scaling

`AuroraPane.vue:122,142,156,170` all pass `class="h-9 text-caption min-w-menu"` to `SelectTrigger`.

glass-ui's `SelectTrigger` ships a `size` prop that resolves to a token
(`dist/select-BcBAyLXA.js`): `size:"sm" → h-(--control-h-sm)`, default → `h-(--control-h-md)`.
Those tokens are (`dist/styles/tokens/sizing.css`):

```
--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));
--control-h-md: max(calc(2.5rem  * var(--ui-scale)), var(--control-floor));
@media (pointer: coarse) { :root { --ui-scale: 1.5; --control-floor: var(--touch-target, 2.75rem); } }
```

`h-9` is a flat `2.25rem`. It overrides both the `--ui-scale` density response and the
`--control-floor` touch floor. Measured on a real coarse-pointer profile:

```
$ node scratchpad/live4.mjs     # playwright devices["iPhone 14"]
  (pointer:coarse) matches : true
  --ui-scale               : 1.5
  --control-floor          : 2.75rem
  --control-h-md (default) : max(calc(2.5rem * 1.5), 2.75rem)      ->  60px
  AuroraPane Select triggers (hardcoded h-9 = 2.25rem):
    {"label":"Harmony","h":36,...,"cls":"h-9"}
    {"label":"Arrangement","h":36,...,"cls":"h-9"}
    {"label":"Medium","h":36,...,"cls":"h-9"}
    {"label":"Motion","h":36,...,"cls":"h-9"}
```

**36px where the design system resolves 60px** — a 40% shortfall, and below the 44px touch
guidance, on four of the pane's seven controls. The visual REPORT's tap-target probe uses a 24px
threshold, so it reports these as clean; they are not.

`text-caption` is likewise a real bridged utility (`glass-ui/dist/styles/theme/bridges.css`:
`--text-caption: var(--type-caption)`) overriding the trigger's own `text-dropdown` rung — a
second per-instance override of a root-level token, on the same four elements.

**Mechanism.** Owner edict 5 ("style at the root component level, never per-instance overrides")
violated four times over; the override silently disables a responsive token the producer authored
precisely so consumers would not hand-size controls.

**Cure.** Delete `h-9` and `text-caption`. If the pane genuinely wants the smaller register, that
is `size="sm"` — the shipped prop, which still honours scale and floor.

---

## C-5 · MAJOR — the four enum-row labels ride the raw `--muted-foreground` this repo already condemned; measured **3.56:1** in light

`AuroraPane.vue:194-200`:

```css
.aurora-row-label { ... color: var(--muted-foreground); }
```

The repo has already ruled on that token, twice, on this very pane's own surface:
`demo/shared/ui/PaneHeader.vue:24-29` ("never raw `--muted-foreground`, which measured 4.29:1 on the
TRUE header ground") and `demo/scenes/ConfigSliderPane.vue:190-206` (T.W8 boot-A: the config
population re-inks to the certified `--ink-muted` rung). AuroraPane's four labels sit inside that
same pane and were never re-inked.

Measured live, o18-census model (composite the ancestor background stack over the published
`--ink-ambient-l`, then WCAG-contrast the ink against it):

```
$ node scratchpad/live5.mjs
=== LIGHT ===
  --ink-ambient-l: 0.79
  AuroraPane .aurora-row-label (raw --muted-foreground):
    {"text":"Harmony","color":"rgb(112, 89, 66)","fontSize":"16.4px","ratio":3.56}   <-- BELOW 4.5:1
    {"text":"Arrangement", ... "ratio":3.56}   <-- BELOW 4.5:1
    {"text":"Medium",      ... "ratio":3.56}   <-- BELOW 4.5:1
    {"text":"Motion",      ... "ratio":3.56}   <-- BELOW 4.5:1
  sibling ConfigSliderPane .configurator-row label (certified rung):
    {"text":"Colour Energy","color":"rgb(28, 25, 23)","ratio":13.52}
=== DARK ===
  AuroraPane .aurora-row-label ... "ratio":6.12          (dark passes)
```

16.4px, not large text ⇒ WCAG 1.4.3 requires 4.5:1. **3.56:1, light scheme, four labels.** On the
same plate, four inches away, the sibling population measures 13.52:1 — the divergence is entirely
the token choice.

*Measurement caveat, stated honestly:* the composite model is my faithful re-implementation of
`e2e/smoke/oracles/o18-contrast-census.spec.ts`'s `censusElement`, not that function itself; the
absolute value could shift a little under the canonical implementation. The **relative** fact — two
populations on one plate, one at 13.52:1 and one at 3.56:1, differing only by certified-vs-raw
token — is not model-dependent.

**Cure.** Same one-line cure the sibling already took: the certified `--ink-muted` rung. Better,
per C-6: stop hand-authoring the row label at all (see C-7's cure, which deletes this CSS block).

---

## C-6 · MAJOR (test truth) — nothing tests this component; the one oracle that names it is self-referential

```
$ grep -rn "Palette harmony|Zone arrangement|Painterly medium|Motion register|aurora-row" e2e/ test/ demo/test/
(no matches)
```

- **No test mounts `AuroraPane.vue`.** `grep -rn "AuroraPane" test/ demo/test/ e2e/` returns only
  prose in comments.
- The only e2e that visits the route (`e2e/smoke/oracles/o18-contrast-census.spec.ts:929` and
  `:1164`) censuses `.config-console .configurator-row` — the *parent's* rows. It never selects
  `.aurora-row`, which is why C-5 has ridden every close.
- `demo/test/glass/aurora-bracket.test.ts:165-184` (the O-14 leg) compares
  `auroraHarmonyStops(atoms,h)` against `resolveCalibratedAtmosphere({...atoms,h}).palette` — the
  **same function the strip itself calls**. It can never observe the seam offset, i.e. it is
  structurally blind to C-2.

**Exact mutations that keep the whole suite green:**

| # | Mutation | Result |
|---|---|---|
| M1 | Swap the `@update:model-value` handlers on the Medium and Motion rows (`AuroraPane.vue:155` ↔ `:169`) | GREEN — vitest 1600+, all e2e |
| M2 | Delete the entire default-slot `<div>` (lines 118-180) — all four enum controls vanish | GREEN |
| M3 | `SECTIONS[0].defs[2].max: 6 → 1` (Zones becomes a dead slider) | GREEN |
| M4 | Delete `guaranteeSeamOffset` from `useAtmosphere.ts:170`, or set `DERIVE_SEAM_FLOOR = 0.5` | GREEN — and the O-14 strip test *gets more correct*, because the divergence it cannot see disappears |
| M5 | `setHarmony` → `function setHarmony(){}` (harmony becomes unwritable) | GREEN |

M4 is the vacuous-gate proof: the oracle's verdict is *inverted* with respect to the law it claims
to hold.

**Cure.** One Playwright leg on `/#/atmosphere` that (a) reads each option's `data-stops` (the
strip already stamps them — `PreviewStrip.vue:44`), (b) selects that option, (c) reads
`--saved-bg-0..3`, and asserts equality. That is the O-14 law as written, measured against the real
referent, and it fails today. Plus an o18 census leg on `.aurora-row-label`.

---

## C-7 · MAJOR — the pane rebuilds the row primitive its own parent composes; the control column is ragged by 58.7px

`AuroraPane.vue:187-192` hand-rolls `.aurora-row { display:flex; justify-content:space-between }`.
With no label column, each trigger's left edge is a function of its label's text length:

```
$ node scratchpad/live2.mjs      # 1440x900
  {"label":"Harmony",    "labelW":82.1, "trigLeft":318.1,"trigW":897.9}
  {"label":"Arrangement","labelW":129.1,"trigLeft":365.1,"trigW":850.9}
  {"label":"Medium",     "labelW":70.4, "trigLeft":306.4,"trigW":909.6}
  {"label":"Motion",     "labelW":70.4, "trigLeft":306.4,"trigW":909.6}
  trigger LEFT edges: 318.1, 365.1, 306.4, 306.4   SPREAD = 58.7px
  trigger WIDTHS    : 897.9, 850.9, 909.6, 909.6   SPREAD = 58.7px
```

and on mobile (`live4.mjs`): `trigger LEFT spread = 50.1 px`. Four stacked controls that read as a
column are misaligned by ~59px. This is plainly visible in
`shots/safari-desktop-light/atmosphere.png` — "Analogous", "Scattered", "Smooth", "Drifting" all
start at different x.

Meanwhile the *parent* file states the law being broken, `ConfigSliderPane.vue:6-10`:

> "HARDEN-4 §5.1: glass-ui already ships `./configurator` with ConfiguratorRow + useConfiguratorState.
> This component uses ConfiguratorRow for each labeled row so the demo composes the existing
> glass-ui surface rather than rebuilding the row primitive."

AuroraPane rebuilds it. Compounding: the four enum rows sit **outside** the `.console-well` that
holds the sliders (`ConfigSliderPane.vue:110` renders `<slot/>` before the `v-if="sections.length"`
well at `:118-122`), so one pane shows two unrelated row grammars — visible in both screenshots.

**Mechanism.** Owner edicts 3 (KISS/no contrivance) and 4 (glass-ui is the design system) violated
by a 14-line CSS block that re-derives a shipped primitive worse.

**Cure — one transposition that kills C-4, C-5 and C-7 together.** Render the four enum rows as
`<ConfiguratorRow :label="…">` — the primitive already imported two files up — inside the same
`.console-well` as the sliders. The grid alignment, the certified label ink, and the tokenized
control height all arrive by construction, and `.aurora-row` / `.aurora-row-label` are deleted.

---

## C-8 · MINOR — three fallback constants disagree with the defaults they shadow

`AuroraPane.vue:73-76, 82`:

```ts
const arrangement = () => atoms.zones?.arrangement ?? "composed";   // DEFAULT is "scattered"
const motion      = () => atoms.motion ?? "breathing";              // DEFAULT is "drifting"
function setArrangement(v) { const count = atoms.zones?.count ?? 4;  // DEFAULT count is 6
```

```
$ npx vite-node scratchpad/probe.mts
  DEFAULT arrangement: scattered  AuroraPane fallback: 'composed'
  DEFAULT motion: drifting  AuroraPane fallback: 'breathing'
  DEFAULT zones.count: 6  AuroraPane setArrangement fallback count: 4
```

All three are stale — left behind by the T-32 rider (`arrangement` composed→scattered) and U33
(`motion` breathing→drifting) documented at `aurora-atoms.ts:41-45` and `:59-62`. Today they are
unreachable (`useAtmosphere.ts:128` seeds every key via `structuredClone(DEFAULT_AURORA_ATOMS)` and
`ConfigSliderPane.resetDefaults` uses `Object.assign`, which never deletes). But they are exactly
the "masking fallback" owner edict 2 forbids: were `zones` ever absent, changing *arrangement*
would silently drop the count 6→4.

**Reproduction:** NONE — this is a latent/dead-path defect, labelled as such.

**Cure.** There is one source of truth for these values and it is imported two lines above:
`atoms.harmony ?? DEFAULT_AURORA_ATOMS.harmony`, etc. No hand-copied literal survives.

---

## C-9 · MINOR — 12px-wide slider thumbs; the coarse-pointer cure covers only the block axis

The pane's three `SECTIONS` defs produce three slider thumbs. Measured:

```
$ node scratchpad/live2.mjs
=== B  slider thumbs (WCAG 2.5.8 min 24x24) ===
  {"label":"Colour Energy","w":12,"h":24}   <-- BELOW 24px
  {"label":"Noise","w":12,"h":24}           <-- BELOW 24px
  {"label":"Zones","w":12,"h":24}           <-- BELOW 24px
```

These are **3 of the 7** small-tap-target defects the visual REPORT attributes to `/#/atmosphere`
in all four matrices (`REPORT.json`, rows `safari-*-*/#/atmosphere`: `{"w":12,"h":24,"tag":"span",
"label":"Colour Energy"}` etc.; mobile shows `{"w":12,"h":44}`). The mobile height comes from
`ConfigSliderPane.vue:218-229`, which extends the hit area on the **block** axis only
(`block-size: max(100%, var(--dock-touch-target))`) — the inline axis stays 12px in every matrix,
so WCAG 2.5.8's 24×24 minimum fails on both desktop and mobile.

Shared mechanism with `ConfigSliderPane` / the glass-ui `Slider`; AuroraPane owns the three rows.

**Cure.** The same hit-area extension on the inline axis (`inline-size: max(100%, 24px)` on the
thumb), authored where the block-axis one already lives — or, correctly, in glass-ui's Slider
(coordination packet).

---

## C-10 · MINOR — `inject(...)!` with no default is a white-screen trapdoor (HYPOTHESIS)

`AuroraPane.vue:42`: `const atoms = inject(AURORA_ATOMS_KEY)!;` — no default, and every template
expression dereferences it (`atoms.harmony`, `atoms.zones?.count`, `auroraHarmonyStops(atoms, h)`).
Mounted outside `useAtmosphere`'s provider the setup returns `undefined` and the first render
throws — the `inv-N-1` white-screen class `useAtmosphere.ts:122-126` explicitly guards elsewhere.

**Reproduction:** NONE today — `usePaneRouter.ts:88` is the only mount site and it always sits under
App.vue. Labelled a hypothesis. It becomes real the moment anyone writes the component test C-6
asks for.

**Cure.** `inject(AURORA_ATOMS_KEY, structuredClone(DEFAULT_AURORA_ATOMS))` — the default already
exists in the file's own imports, so this costs nothing and is not a compat shim.

---

## C-11 · MINOR — two `as unknown as` casts hand the dot-path sliders an untyped key space

`AuroraPane.vue:111,113`:

```
:config="(atoms as unknown) as Record<string, unknown>"
:defaults="(DEFAULT_AURORA_ATOMS as unknown) as Record<string, unknown>"
```

`vue-tsc -p tsconfig.demo.json --noEmit` passes (verified: exit 0, no output) — because the casts
erase the atom type. `SliderDef.key` is a bare `string`; `ConfigSliderPane.writePath` (`:66-73`)
walks it unchecked. A typo `"zones.cont"` compiles, ships, and either silently creates a junk key
or — if the intermediate segment is absent — throws `Cannot set properties of undefined`. The pane's
own knob names are the one thing the atom type could have checked, and the cast is what stops it.

Also under this head, edict 7 (idiomatic Vue 3.5): `harmony`/`arrangement`/`medium`/`motion`
(`:73-76`) are plain functions re-invoked on every render rather than `computed`.

**Cure.** `SliderDef.key` becomes a generic keyed on the config type, so `SECTIONS` is checked
against `AuroraAtoms` and both casts disappear. (Not a `defineModel` hazard — the pane has none.)

---

## C-12 · INFO — dead-looking ternary, and `fmt()` is total only inside its domain

`AuroraPane.vue:90`: `atoms.medium = kind === "smooth" ? { kind } : { kind };` — both branches are
byte-identical at runtime. It is a TS **narrowing** device against the `AuroraAtoms` medium/
interactivity discriminated union (`atoms.d.ts`), so it is not dead code — but it reads as dead
code and its comment (":86-88") explains an `amount` distinction the expression does not make.

`aurora-harmony-stops.ts:26-28`: `v.toFixed(4).replace(/\.?0+$/,"")`. Exhaustively probed — total
and correct across every value the palette can produce, and across every harmony × 6 boundary seeds
including `#000000`, `#ffffff`, achromatic `#808080`:

```
$ npx vite-node scratchpad/probe.mts
=== P2 ... malformed/throwing = 0
=== P3  fmt(0)="0" fmt(1)="1" fmt(100)="100" fmt(0.0001)="0.0001" fmt(-12.5)="-12.5"
        fmt(1e+21)="1e+21"  fmt(NaN)="NaN"  fmt(Infinity)="Infinity"
```

The last three emit unpaintable CSS but are unreachable (the resolver clamps L/C/h). INFO only.

---

## Negative proofs — what I checked and found SOUND

I was told the implementation is defective. These specific hazard classes are **not** how:

1. **No rAF, no listeners, no observers, no timers, no async, no cleanup surface.** AuroraPane is
   fully declarative: `inject` + four handlers + one const array. The PRM-RAF epidemic, leaked
   listeners, unbounded growth and missing-cleanup classes are *structurally absent*, not merely
   unobserved. (Per the brief, the aurora rAF loop is glass-ui's and was verified by the root.)
2. **No `defineModel`, no `ValueUnit`, no `stableHue`, no `parseCssColor`, no WebGL, no reka-ui
   slider pointer-capture surface** in this file. Every named local hazard is off this component.
3. **The parse-crash class does not reach here.** All 6 harmonies × 6 boundary seeds (incl.
   `#000000`, `#ffffff`, achromatic, `oklch(0 0 0)`, `oklch(1 0 0)`) → `malformed/throwing = 0`,
   every stop a well-formed `oklch(L C H)` (probe P2).
4. **The strip is not palette-blind** (the chronic C2 disease does not manifest here). All six
   harmonies produce pairwise-distinct strips on chromatic seeds — `DISTINCT STRIPS: 6 of 6` for
   both `oklch(0.62 0.27 9.8)` and `oklch(0.7 0.18 145)` (probe2). Live DOM confirms six distinct
   `data-stops` on the open dropdown (`live.mjs`, section C).
5. **The `#description` slot is real and renders.** glass-ui's `SelectItem.vue.d.ts` declares it;
   the built component renders it outside `SelectItemText` (so typeahead/`textValue` are unpolluted);
   live: 6/6 options carry a visible 41.9×16.4px strip with painted segments.
6. **The strip recompute is not a perf defect.** 0.556 ms for all six candidates
   (10 799 resolves/s, probe P4), and `SelectContent` genuinely unmounts when closed
   (`grep -c forceMount select-BcBAyLXA.js` → 0), so the "zero rest cost" claim at
   `AuroraPane.vue:36-38` holds.
7. **Reset does not clobber the picker colour.** `resetDefaults` (`ConfigSliderPane.vue:92-94`) is
   `Object.assign(config, structuredClone(defaults))` and `DEFAULT_AURORA_ATOMS` carries no `seed`,
   so the seed survives — as documented. `structuredClone` at both `useAtmosphere.ts:128` and the
   reset means the module-level default is never aliased or mutated.
8. **Zero page errors, zero console errors, zero horizontal overflow** on `/#/atmosphere` across
   all four real-Safari matrices (`REPORT.json`), and zero in my Chromium runs apart from the
   app-wide `VITE_API_URL` dev-config warning.
9. **`verbatimModuleSyntax` is honoured** — all four type-only imports (`AcceptableValue`, the four
   aurora atoms, `SliderSection`) are `import type`. **Zero nameless buttons** on this route
   (`REPORT.json`: `namelessButtons: 0`); all four triggers carry `aria-label`, and focus returns to
   the trigger on Escape (`live.mjs` section E: `{"active":"Palette harmony"}`).

---

## Family grouping

Three mechanisms generate ten of the twelve findings:

- **Stale producer facts frozen in consumer prose** — C-1 (`lightnessScheme` "not shipped"),
  C-3 (`MAX_NUCLEI = 6`), C-8 (default drift). The demo hand-maintains duplicates of producer
  capabilities with no drift detector, and the Glass 7 adoption (W44) re-verified the *build*, not
  the *claims*.
- **Hand-rolled surface where a shipped primitive exists** — C-4, C-5, C-7. One 14-line CSS block
  and one class string re-derive `ConfiguratorRow` and the control-height tokens, worse, and take
  the alignment and contrast defects with them.
- **A truth function separated from its referent** — C-2 and its blind oracle C-6. The law is
  stated in prose in three places and enforced against the wrong side.

## Strongest defect

**C-1** — the dark-scheme atmosphere is still light-band because the demo believes a producer atom
is unshipped that glass-ui 7.0.0 ships and that a three-line probe proves reachable
(mean L 0.66 → 0.30). It is the most visible defect (half of every route's rendering), it is
name-checked as "the dark-leg defect" in the producer's own doc-comment, the cure is already in the
tree, and it collapses a duplicated derive path rather than adding one.
