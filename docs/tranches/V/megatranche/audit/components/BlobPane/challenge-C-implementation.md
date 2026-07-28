# BlobPane — CHALLENGE-C (implementation)

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the model this seat was
explicitly spawned with. Declared, not inherited.

- Subject: `demo/scenes/blob/BlobPane.vue` (130 lines) + its sole child `demo/scenes/ConfigSliderPane.vue`
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Live probes: 13 Playwright runs against `http://localhost:9000` (scripts under
  `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/BPC-probe*.mjs`)
- Verdict: **DEFECTIVE**. The component is a 31-slider tuning console in which **1 of 10 sampled
  sliders actually changes the thing it tunes.** Everything else here is downstream of that.

---

## The strongest defect, stated once

`/#/blob` presents 31 sliders whose stated purpose is to "Tune metaball geometry, membrane,
lit-glass surface, and satellite behavior." Ten of them were driven to a domain extreme in
isolation — each from a **fresh page load**, identical protocol, with a noise floor measured on the
same canvas 400 ms earlier. The subject is the only `<Blob>` instance in the app
(`demo/picker/visual/HeroBlob.vue:13`, the sole `<Blob` in `demo/`).

```
$ node scratchpad/BPC-probe11.mjs
label          noisePx changePx atom
Smooth K             1     5110   membrane.smoothK 0.05 -> 0.45
Warp                 0        5   membrane.warpAmp 0.35 -> 1.0
Noise Amp            1        8   membrane.noiseAmp 0.038 -> 0.10
Body Radius          1        6   geometry.bodyRadius 0.22 -> 0.08  [HERO-OVERRIDDEN]
Orbit Radius         1        6   geometry.orbitRadius 0.17 -> 0.48  [HERO-OVERRIDDEN]
Satellites           1        5   geometry.satelliteCount 3 -> 0
Core Glow            1        7   surface.coreGlow 0.06 -> 1.0
Iridescence          1        5   surface.iridescence 0.09 -> 1.0
Hue Range            1        6   color.hueRange 5 -> 60
Attraction           1        7   interaction.pointerAttraction 0.35 -> -1.0
```

`changePx` = pixels on the 181×181 (32,761 px) `.goo-blob-canvas` whose max-channel delta exceeds
20. `Smooth K` moves **5110 px (15.6 % of the canvas)**. The other nine move **≤ 8 px (0.02 %)** —
inside the 0–1 px noise floor, three orders of magnitude below the one control that works. The
working control is the proof the harness, the timing, and the renderer's repaint path are all sound;
the nine nulls are therefore findings, not measurement failure.

---

## Findings

### BPC-1 · BLOCKER · Nine of ten sliders do not reach the render

**Evidence** — the table above (`BPC-probe11.mjs`), plus a second, independent confirmation that the
value is not merely awaiting a repaint:

```
$ node scratchpad/BPC-probe13.mjs
Core Glow before: 0.06
Core Glow after End: 1
Core Glow after round-trip: 1   (1 => no reload, state survived)

$ node scratchpad/BPC-probe12.mjs
after route-away+back — diff between (sliders maxed) and (untouched): 2 px of 32761
```

Run A maxed `surface.coreGlow`, `surface.iridescence` and `color.hueRange`, then forced a KeepAlive
re-activation (`/#/blob → /#/palettes → /#/blob`, same-document, config verified surviving at
`aria-valuenow=1`). `onActivated` in HeroBlob.vue:246-250 calls `noteBlobActivity()` **and**
`blobRef.value?.resume()` — the strongest wake the app has. Against an untouched control run the
settled frames differ by **2 px**. The values are in the config and are not lost; they never reach
the shader.

**Mechanism (two roots, both real):**

1. **Construction.** `demo/picker/visual/HeroBlob.vue:154-171` builds the config the engine actually
   receives:
   ```ts
   const heroConfig = computed<BlobConfig>(() => ({
       ...appBlobConfig,
       geometry: { ...appBlobConfig.geometry, bodyRadius: 0.325, orbitRadius: 0.4,
                   satelliteRadius: 0.09, eccentricity: 0.03 },
       surface: { ...appBlobConfig.surface, fissionAmp: HERO_FISSION_AMP },
       color:   { ...appBlobConfig.color, paletteStops: heroStops.value },
       quality: isLgViewport.value ? appBlobConfig.quality : "half",
   }));
   ```
   Four of BlobPane's five Geometry sliders write atoms that are **discarded by literal on the very
   next line**. `Body Radius`, `Sat Radius`, `Orbit Radius`, `Eccentricity` cannot ever affect the
   render — no wake, no repaint, no timing changes that. This root needs no measurement; it is
   arithmetic.
2. **Propagation.** `geometry`/`surface`/`color` are re-spread into **plain** snapshot objects
   inside the computed, while `membrane`, `satellites` and `interaction` pass through as the live
   `reactive` proxy. The one slider that works (`membrane.smoothK`) is on the proxy side. That the
   other two proxy-side atoms (`warpAmp`, `noiseAmp`) still read 5 px and 8 px says the producer's
   uniform re-pack covers `smoothK` and not them. Both halves need the producer's read; the demo
   half is the snapshot.

**Proposed cure (transposition, not patch).** glass-ui already exports the hero register as a
first-class preset — `BLOB_HERO: BlobConfig`, `node_modules/@mkbabb/glass-ui/dist/components/blob/presets.d.ts:16`,
reachable from `@mkbabb/glass-ui/blob`. HeroBlob.vue does not import it and hand-rolls a *different*
overlay (`BLOB_HERO` ships `orbitRadius 0.3 / satelliteRadius 0.1 / eccentricity 0.04 / smoothK 0.06`;
HeroBlob hard-codes `0.4 / 0.09 / 0.03`). The idiomatic shape: the app config is seeded from
`BLOB_HERO`, the hero renders `:config="appBlobConfig"` **unoverlaid**, and any deviation the hero
wants becomes a named preset in the producer that BlobPane can *select*. Then every slider is by
construction the thing the engine reads, and the pane stops lying. This also discharges edict 4
(glass-ui is the design system — reuse its primitives) and edict 2 (no duplicate path).

---

### BPC-2 · BLOCKER · The tuning surface is inert after 5.3 s, and a config write is not "activity"

**Evidence** — three `.goo-blob-canvas` captures taken while moving `Satellites` 3→0→4 are
**byte-identical**:

```
$ md5 -q BPC3-P0-parked.png BPC3-P1-sat0-PARKED.png BPC3-P2-sat4-PARKED.png
7b1795bd8ba912fb2e0aba26fd29c173
7b1795bd8ba912fb2e0aba26fd29c173
7b1795bd8ba912fb2e0aba26fd29c173
   shot BPC3-P0-parked.png at 9.60s
   shot BPC3-P1-sat0-PARKED.png at 11.72s
   shot BPC3-P2-sat4-PARKED.png at 13.85s
   shot BPC3-W0-after-colour-wake.png at 15.50s   <-- differs
```

A frame-by-frame sweep shows the loop decaying to zero well before that:

```
$ node scratchpad/BPC-probe10.mjs
t=1.17s diffPx=9 · t=1.86s diffPx=6 · t=2.32s diffPx=2 · t=2.53s diffPx=0 · … · t=3.50s diffPx=0
```

**Mechanism.** `demo/picker/visual/HeroBlob.vue:211-226`: `BLOB_IDLE_MS = 2000`,
`SLEEPY_POSE_MS = 3300`; `noteBlobActivity()` is called from exactly three places — the
`cssColorOpaque` watch (HeroBlob.vue:266), the `savedColorStrings.length` watch (HeroBlob.vue:290),
and `onActivated` (HeroBlob.vue:246). **A blob-config write is not an activity source.** So the one
pane in the app whose entire reason to exist is live tuning drives a renderer that parks 5.3 s after
arrival and stays parked through every slider drag. The only thing that wakes it is changing the
*colour* — which is the one input the pane does not own.

**Proposed cure.** The idle gate's activity set must include the surface it is gating. One watcher
in HeroBlob — `watch(() => appBlobConfig, noteBlobActivity, { deep: true })` — makes the gate honest
without touching the producer. (The producer's `settled`/park-from-quiescence seam, already booked
as GAP-L5 in HeroBlob.vue:200-210, is the durable version; the demo half is one line.)

---

### BPC-3 · MAJOR · `/#/blob` never shows the pane on a phone

**Evidence** — same URL, two viewports, live:

```
$ node scratchpad/BPC-probe6.mjs
mobile-390    {"hash":"#/blob?…","paneSliders":0, "textLen":68}
desktop-1440  {"hash":"#/blob?…","paneSliders":31,"textLen":750}
```

Corroborated by the visual audit (`audit/visual/REPORT.md:157`): `safari-mobile-light /#/blob` text
= 69 chars vs `safari-desktop-light /#/blob` = 713; tap-target count 8 vs 39. The mobile screenshot
`audit/visual/shots/safari-mobile-light/blob.png` shows the segmented control with **"Picker"**
selected while the route is `/#/blob`.

**Mechanism.** `demo/shell/viewSchema.ts:179-186` declares `blob: { left: "color-picker", right: "blob", … }`
and **omits `defaultPaneIndex`**. `demo/shell/useViewManager.ts:65` resolves
`currentConfig.value.defaultPaneIndex ?? 0` → the left slot → the picker. The schema's own doc
comment (viewSchema.ts:88-96) says *"The content-first dual views (palettes/mix) name their default
HERE (1 = the content pane)"*, and `palettes` (line 122) and `mix` (line 150) — the identical
`left: "color-picker"` shape — both set `defaultPaneIndex: 1`. `blob` is the same shape and was
missed.

**Proposed cure.** `defaultPaneIndex: 1` on the `blob` entry (and audit `atmosphere`/`about` for the
same omission). Better: make the field required for any config whose `left !== <the view's own name>`,
so the type system enumerates the content-first views instead of a comment doing it.

---

### BPC-4 · MAJOR · The compile-time guard silently deletes every OPTIONAL numeric atom

BlobPane.vue:19-48 carries a 30-line comment asserting that the double `-?` "keeps every member a
bare string dot-path", explicitly citing optional nested members. It does the opposite: it drops
them.

**Evidence** — the guard reproduced verbatim against the shipped `BlobConfig`
(`scratchpad/BPC-guard.ts`), then typechecked:

```
$ npx tsc --noEmit --ignoreConfig --strict --target es2022 --module esnext \
      --moduleResolution bundler --skipLibCheck scratchpad/BPC-guard.ts
BPC-guard.ts(55,5): error TS2322: Type '"color.lightnessFloor"' is not assignable to type 'NumericAtomPath'.
```

Line 55 is `"color.lightnessFloor"` — a real, documented, bracketed tunable
(`BlobColor.lightnessFloor?: number`, bounded `[0.12, 0.20]` by `LIGHTNESS_FLOOR_BRACKET`, shipped
default `0.15`). Adding a slider for it is a **compile error**.

**Mechanism.** The conditional tests `BlobConfig[A][K] extends number` — the *pre-`-?`* indexed
access, which for an optional member is `number | undefined`, and `number | undefined extends number`
is false → `never`. `-?` strips the modifier on the mapped result's own keys; it does not change
what the check sees.

**Proposed cure.** `NonNullable<BlobConfig[A][K]> extends number` (or map over
`Required<BlobConfig[A]>`). One token; and delete the comment, which documents behaviour the code
does not have.

---

### BPC-5 · MAJOR · The guard is bypassable by construction, and the bypass crashes the pane

**Evidence** — in the same typecheck run, these three entries inside a `SliderSection[]` produced
**zero errors** (only line 55 errored):

```ts
{ key: "geometry.bodyRadiuz", label: "Typo",         min: 0, max: 1, step: 0.01 },
{ key: "surface.lit",         label: "Boolean atom", min: 0, max: 1, step: 1 },
{ key: "totally.made.up",     label: "Nonexistent",  min: 0, max: 1, step: 1 },
```

`SliderDef.key` is `string` (ConfigSliderPane.vue:28), so any raw object literal skips `s()` and the
guard entirely. (Positive note: routed *through* `s()`, both `@ts-expect-error` markers fired — the
guard does catch a typo and a boolean atom. It is the shape, not the logic, that leaks.)

**Runtime consequence.** A key that misses at runtime returns `undefined` from `readPath`
(ConfigSliderPane.vue:57-64, correctly guarded) and is then handed to
`fmt` — `Number.isInteger(undefined)` is `false`, so it evaluates `undefined.toFixed(3)`:
**TypeError at ConfigSliderPane.vue:85, and the whole pane fails to render.** `writePath`
(lines 66-73) has the mirror hazard: a missing intermediate segment yields
`Cannot set properties of undefined`. *(Reproduction for the crash itself: NONE — all 31 shipped
keys resolve. This is the coupled consequence of the proven bypass, labelled as such.)*

**Proposed cure — the one that collapses BPC-4, BPC-5 and the double cast together.** Make
`ConfigSliderPane` generic over its config:
`defineProps<{ config: T; sections: SliderSection<T>[]; defaults: T; … }>()` with
`SliderDef<T>.key: NumericAtomPath<T>`. Then the guard lives once, applies to AuroraPane for free,
cannot be bypassed by a literal, and BlobPane.vue:124/126's
`(cfg as unknown) as Record<string, unknown>` double casts — which are what threw the type away in
the first place — both disappear along with the 30-line comment.

---

### BPC-6 · MAJOR · 31 sub-24 px targets; this pane *is* the app's tap-target outlier

**Evidence** — measured on every pane slider thumb (`BPC-probe1.mjs`, desktop 1440×900):

```
TOTAL operable: 60 | sliders: 35 | pane sliders: 31
SMALL(<24px): 42 | inside .config-console: 31
  Body Radius   w=12 h=24 …   (all 31 rows identical: w=12 h=24)
```

`audit/visual/REPORT.md:41` records `safari-desktop-light /#/blob: 39` small tap targets — every
other route is 4-8. 39 = **31 (this pane) + 8 (the shell baseline)**. WCAG 2.2 SC 2.5.8 asks for
≥ 24×24 CSS px and has **no pointer-type exemption**; ConfigSliderPane.vue:218-230 gates its cure
behind `@media (pointer: coarse)` **and** extends `block-size` only — the 12 px width is never
addressed on any device.

**Proposed cure.** Root-level, in glass-ui's slider recipe (edict 5): the thumb's hit area is a
`::before` of `min(100%, 24px)` inline **and** block, unconditional on pointer type, with the visual
thumb kept at 12 px. One token in the design system, not 31 rows in the demo.

---

### BPC-7 · MAJOR · Duplicate accessible names — measured, and it broke my own probe

**Evidence:**

```
DUP pane slider names: [["Noise Freq",2],["Noise Speed",2]]
  Noise Freq   min=0.5 max=10  now=3.5    (membrane.noiseFreq)
  Noise Freq   min=0.5 max=8   now=2      (color.colorNoiseFreq)
  Noise Speed  min=0   max=0.5 now=0.08   (membrane.noiseSpeed)
  Noise Speed  min=0   max=0.3 now=0.05   (color.colorNoiseSpeed)
```

Authored at BlobPane.vue:71-72 and 83-84. This is not theoretical: name-based targeting — exactly
what voice control and a screen reader's "activate <name>" do — is ambiguous here, and it aborted a
probe run of mine outright:

```
locator.focus: Error: strict mode violation: getByRole('slider', { name: 'Speed' })
resolved to 3 elements: … aria-label="Noise Speed" … aria-label="Noise Speed" … aria-label="Speed"
```

**Proposed cure.** Section-qualify the name, not the visible label:
`aria-label = "${section.title} ${def.label}"` in ConfigSliderPane (one line, fixes AuroraPane too),
which also makes "Speed" (tempo) unambiguous against "Noise Speed".

---

### BPC-8 · MAJOR · `interaction.stretch` is a slider the producer's own contract forbids

`node_modules/@mkbabb/glass-ui/dist/components/blob/types.d.ts:186-204` on `BlobInteraction.stretch`:

> "…a live readback measured **0 % body-aspect change between `stretch=0` and `stretch=1.5`**. It is
> NOT a primary axis… Kept … but DEMOTED — **the demo no longer surfaces it as a top-level slider**
> (the flick blurb is honest-down to match)."

`BlobPane.vue:104` surfaces it: `s("interaction.stretch", "Stretch", 0.0, 1.5, 0.05)` — over exactly
the `0 → 1.5` domain the producer measured as null. A tenth dead control, and a stale-consumer
finding against a producer ruling the pane's own header block claims to be tracking.

---

### BPC-9 · MAJOR · VACUOUS GATE — BlobPane has no test, and the one blob test pins the defect

```
$ grep -rn "#/blob" e2e/          →  (no matches)
```

`e2e/smoke/oracles/o18-contrast-census.spec.ts` is the only spec that exercises `ConfigSliderPane`,
and both of its tests navigate to `/#/atmosphere` (lines 929 and 1164). No vitest file mounts
BlobPane. `test/picker-blob-config.test.ts` is a **source-regex** test that asserts the exact
literals causing BPC-1:

```ts
expect(radii).toEqual([0.325]);
expect(source).toMatch(/^\s*orbitRadius:\s*0\.4,$/m);
expect(source).toMatch(/^\s*satelliteRadius:\s*0\.09,$/m);
expect(source).toMatch(/^\s*eccentricity:\s*0\.03,$/m);
```

— i.e. the suite actively *defends* the overrides that make four sliders inert.

**The exact green-keeping mutation:** replace `const SECTIONS: SliderSection[] = [ … ]` with `[]`.
`v-if="sections.length > 0"` (ConfigSliderPane.vue:119, 163) hides both the console and the action
bar; the pane renders a bare header; **vitest and playwright stay 100 % green.** The entire
131-line component can be emptied without a single test noticing.

**Proposed cure.** One e2e oracle that is the pane's reason to exist: navigate `/#/blob`, capture
`.goo-blob-canvas`, drive each slider to a domain extreme, assert a pixel delta above the measured
noise floor. That oracle is born-RED at 9 of 10 today, which is precisely the point.

---

### BPC-10 · MINOR · Reset and Copy JSON are silent

- `resetDefaults` (ConfigSliderPane.vue:92-94) rewrites all 31 values with **no announcement and no
  focus management**. Measured: the only `aria-live` regions on `/#/blob` are the picker's four
  channel readouts, all `aria-live="off"`; `.config-console` has none.
  ```
  values before reset: 0.45,4,0.082,…
  values after  reset: 0.22,3,0.082,…   (correct restore, zero errors — see BPC-13)
  ```
- `copyAsJson` (lines 88-90) **discards the result**. `writeClipboard`
  (`node_modules/@mkbabb/glass-ui/dist/useClipboard-D36OTaeT.js:3-15`) never throws; it returns
  `{ ok: false, reason: "no-api" }` when `navigator.clipboard?.writeText` is absent. The repo
  explicitly supports LAN device testing over plain http (`vite.config.ts` `server.host: true`) —
  the insecure-origin case — where the button silently does nothing forever.

**Proposed cure.** glass-ui ships `useClipboard` with a `status` ref and an `onCopyError` hook (same
file, lines 16-51) — consume it and drive the button's own state; add a polite live region for the
reset. Root-level, no demo-local toast.

---

### BPC-11 · MINOR · Reset clobbers the palette feed the header comment says it is protecting

`Object.assign(config, structuredClone(defaults))` replaces `config.color` **wholesale**, restoring
the baked `["#b5947f","#d4b27d","#dad6b1"]` over the derived ramp. The re-derive watch
(`demo/color-picker/composables/boot/useAtmosphere.ts:388-401`) is keyed on `atmosphereColor`, not
immediate-refiring, so the value stays stale until an unrelated colour change. BlobPane.vue:8-9
justifies omitting a `paletteStops` slider on the grounds that it *is* that live feed — and then
hands `BLOB_CONFIG_DEFAULTS` to a reset that overwrites it.

Latent in the app only because HeroBlob shadows `paletteStops` with its own `heroStops`
(HeroBlob.vue:169) — which independently falsifies BlobPane.vue:8-9: the `useAtmosphere` derive runs
on **every** colour change (`atmosphereColor` = `cssColorOpaque`, not the rAF-coalesced frame ref —
`useAtmosphereBoot.ts:128`) and nothing consumes it past mount. *(Attribution: `useAtmosphere.ts` /
`HeroBlob.vue`, surfaced by BlobPane's claim. INFO-grade for this seat.)*

---

### BPC-12 · MINOR · Eight numeric atoms unreachable, and the gap forced a hard-coded literal

The pane exposes 31 of the 39 numeric atoms on `BlobConfig`. Absent: `morphT` (the config's own doc
calls it *"The sole flat↔dressed surface axis"*), `surface.fissionAmp`, `surface.shadowSoftness`,
`surface.iridHue`, `surface.iridSpeed`, `surface.sssPower`, `color.lightnessFloor` (unreachable by
BPC-4), `geometry.canvasSize`. The enum/boolean atoms `surface.lit`, `surface.shadow`,
`membrane.merge`, `quality` are absent too — ConfigSliderPane's default slot exists for exactly this
and AuroraPane uses it (ConfigSliderPane.vue:12-14); BlobPane passes nothing.

The cost is concrete: because the pane cannot reach `fissionAmp`, HeroBlob.vue:161 hard-codes
`const HERO_FISSION_AMP = 0.6` with a 20-line comment explaining that the shipped default of `0`
left "the whole fission branch DEAD at the hero". A tuning pane that cannot tune the axis is why a
magic number exists in a sibling component.

---

### BPC-13 · INFO · Negative evidence (checked, sound — do not re-litigate)

- **Range/default coherence: clean.** All 31 sliders' `[min, max]` bracket their shipped
  `BLOB_CONFIG_DEFAULTS` value; measured `aria-valuemin/max/now` for all 31 match the source
  (`BPC-probe1.mjs` output) — no clamp-on-mount, no silent write.
- **Reset is correct.** Before/after value strings show an exact restore to defaults; no error.
- **No errors from this route.** 0 page errors, 0 console errors (the one console line is the
  dev-server `VITE_API_URL` misconfiguration notice, not this component). Matches
  `REPORT.md:127/142` — `pageErr 0`, `consoleErr 0` for `/#/blob` on all four Safari matrices.
- **Perf is fine.** 40 keyboard steps on one slider: 672 ms wall, **0 long tasks**, 4 DOM mutations
  per step. The 31-row single-component render is not a hot spot.
- **Keyboard/ARIA basics are right.** Every pane slider is `tabindex="0"`,
  `role="slider"`, `aria-orientation="horizontal"`, with correct `aria-valuemin/max/now`.
- **PRM/rAF:** no ungated loop in this component; per the seat brief `useMetaballRenderer`'s
  reduced-motion single-frame path is verified upstream. Nothing manufactured here.
- **Local hazard sweep:** no `defineModel`, no `ValueUnit` wrapping, no oklch→HSV roundtrip, no
  pointer-capture handling, no WebGL boot — the pane holds no model of its own. None apply.
- **`verbatimModuleSyntax`:** correct — `import type { BlobConfig }` (line 13) and
  `import type { SliderSection }` (line 15).
- **The guard's positive half works:** routed through `s()`, a typo and a boolean atom both fail the
  typecheck (both `@ts-expect-error` markers fired, no unused-directive errors).

---

## Edict compliance

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | **PASS** — 131 lines, one job |
| 2 | No legacy / dual paths | **FAIL** — HeroBlob forks `BLOB_HERO` instead of consuming it (BPC-1); `interaction.stretch` is a retired axis still shipped (BPC-8) |
| 3 | KISS, no contrivance | **FAIL** — a 30-line comment defending a 13-line type that is both wrong (BPC-4) and bypassable (BPC-5), existing only because the props were cast to `Record<string, unknown>` |
| 4 | glass-ui is the design system | **FAIL** — `BLOB_HERO` (`presets.d.ts:16`) is shipped and unused; `useClipboard`'s status/error surface is shipped and unused |
| 5 | Root-level styling | **PASS** for the pane; the tap-target cure (BPC-6) belongs in glass-ui's slider recipe, not here |
| 6 | Animations never deleted | **PASS** — none owned |
| 7 | Idiomatic Vue 3.5 | **PASS** with a note — `inject(BLOB_CONFIG_KEY)!` (line 17) is a non-null assertion over a contract nothing enforces; a missing provider renders `undefined` into `fmt` and crashes the pane (same class as BPC-5). Not reachable in-app. |
| 8 | `verbatimModuleSyntax` | **PASS** |

---

## Ranked repair order

1. **BPC-1** — retire the hero's private overlay in favour of `BLOB_HERO`; the pane's writes must be
   the config the engine reads. Nothing else in this file matters until a slider moves the blob.
2. **BPC-2** — add the config write to the idle gate's activity set (one `watch` in HeroBlob).
3. **BPC-9** — land the born-RED pixel-delta oracle so 1 and 2 can never silently regress.
4. **BPC-3** — `defaultPaneIndex: 1` on the `blob` view.
5. **BPC-5 + BPC-4** — make `ConfigSliderPane` generic; the double cast, the 30-line comment, the
   optional-atom hole and the literal bypass all fall out together.
6. **BPC-6, BPC-7** — root-level in glass-ui: unconditional 24 px hit area; section-qualified
   accessible names.
7. **BPC-8, BPC-10, BPC-11, BPC-12** — drop `Stretch`; consume `useClipboard`'s status; stop
   resetting the derived palette; surface the missing atoms (incl. the enum row via the default
   slot) so `HERO_FISSION_AMP` can stop being a literal.

---

*Probe scripts and captured frames:
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/BPC-probe{1..13}.mjs`,
`BPC-guard.ts`, `BPC{2,3}-*.png`. Read-only session; no source file was modified.*
