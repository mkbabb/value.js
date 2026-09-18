# CHALLENGE-C (round 2) — `GradientEasingEditor.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the tier this seat
was explicitly spawned with. Declared, not inherited.

> **Filename note.** `challenge-C-implementation.md` already exists in this directory (r1,
> 2026-07-27 18:14, 34 kB). This round is written as `-r2` rather than overwriting it — the
> convention this directory already uses for `challenge-L-library-r2.md` / `-r3.md`. r1's evidence
> is preserved intact. Where r2 reaches the same conclusion by an independent route I say so;
> where r2 finds something r1 did not, or re-grades r1, I say that too.

---

## Subject and surface read

| file | lines | role |
|---|---|---|
| `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` | 295 | the accordion + readout rail + disclosure (the subject) |
| `demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts` | 74 | the per-interval row derivation |
| `demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts` | 230 | the tile catalogue + identity functions |
| `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` | 215 | the selection strip |
| `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` | 116 | the `<EasingPicker>` seat |
| `demo/workbenches/gradient/composables/useGradientCSS.ts` | 334 | sampling law + `serializeIntervalRamp` |
| `demo/workbenches/gradient/composables/useGradientInterpolation.ts` | 56 | `interpolateStopColors` |
| `demo/workbenches/gradient/composables/useGradientModel.ts` | 193 | model + `updateInterval` |
| `demo/color-session/useContrastSafeColor.ts` | 376 | `useSafeAccentFn` → `certifyAccentInk` |

**Verdict: DEFECTIVE.** One BLOCKER (independently reproduced), five MAJORs — two of which r1 did
not report at all, one of which r1 graded MINOR and the profiler says is the single largest
main-thread consumer on the route.

---

## C2-1 — BLOCKER · Three of the twenty-seven shipped specimen tiles destroy the Gradient pane, **silently**

### Reproduction (deterministic, default app state, two stops, fresh page)

`scratchpad/probe14.mjs` — full source in *Probe artefacts* below.

```
BEFORE: {"heads":1,"code":"cubic-bezier(0, 0, 1, 1)"}
ease-out-sine    -> clicked {"heads":1,"code":"cubic-bezier(0.39, 0.575, 0.565, 1)","easingSection":true,"paneText":599}
ease-in-back     -> clicked {"heads":0,"code":null,"easingSection":false,"paneText":102}
ease-out-back    -> MISSING {"heads":0,"code":null,"easingSection":false,"paneText":102}
ease-in-out-back -> MISSING {"heads":0,"code":null,"easingSection":false,"paneText":102}

ALL ERRORS: [ "CONSOLE: [value.js] value.js dev is MISCONFIGURED: … " ]
```

One click on the `back` family's first tile takes the easing bench from 1 head to 0 and the pane
body text from 599 characters to 102. The subsequent tiles are `MISSING` because the subtree they
lived in no longer exists. This independently reproduces r1's C-1.

### Mechanism — proved numerically, not inferred

`scratchpad/probe15.mjs`, importing the live modules through the dev server:

```json
{
 "ease-in-back":     {"quad":[0.6,-0.28,0.735,0.045], "mid":-0.0636, "rampMin":-0.0969, "rampMax":1,      "midThrows":"Gradient color mix failed: color_progress_out_of_range"},
 "ease-out-back":    {"quad":[0.175,0.885,0.32,1.275],"mid":1.0676,  "rampMin":0,       "rampMax":1.0868, "midThrows":"Gradient color mix failed: color_progress_out_of_range"},
 "ease-in-out-back": {"quad":[0.68,-0.55,0.265,1.55], "mid":0.6067,  "rampMin":-0.0923, "rampMax":1.0927, "midThrows":null},
 "ease-out-sine":    {"quad":[0.39,0.575,0.565,1],    "mid":0.7357,  "rampMin":0,       "rampMax":1,      "midThrows":null}
}
```

`useSpecimenRows.ts:52-59` computes the row's ink from the curve's **midpoint**:

```ts
const fn = easingFnOf(interval);
const mid = interpolateStopColors(s0.cssColor, s1.cssColor, fn(0.5), model.interpolationSpace, model.hueMethod);
```

An overshoot/undershoot curve is *designed* to leave `[0, 1]` — that is what "back" means. `fn(0.5)`
is `-0.0636` for `ease-in-back` and `1.0676` for `ease-out-back`. `interpolateStopColors`
(`useGradientInterpolation.ts:36-37`) hands that straight to `mixColors` and converts the library's
`Result` rejection into a **throw**:

```ts
const mixed = mixColors(c0, c1, t, { space, hue: hueMethod });
if (!mixed.ok) throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
```

The throw happens inside a `computed` that the template's `v-for` reads during render
(`GradientEasingEditor.vue:112`), so it takes down the whole `GradientVisualizer` subtree.

`ease-in-out-back` survives the midpoint (0.6067) but its ramp reaches −0.0923 / 1.0927, so
`sampleCoalescedStops` (`useGradientCSS.ts:199-208`, same unclamped `mixColors` → throw) takes the
same subtree down through `openIntervalRamp` / `coalescedCSS` instead. All three `back` tiles are
fatal; they are 3 of the 27 tiles this component ships as first-class press targets — **11 % of the
gallery**.

### What r1 did not report: the crash is invisible to every automated console gate

`probe15.mjs` listens on `pageerror` *and* every `console` type. After the click that zeroes the
bench:

```
heads after click: 0
MESSAGES: ["DEBUG [vite] connecting...", "DEBUG [vite] connected.", "ERROR Failed to load resource: … 404 …"]
```

**Zero page errors. Zero component console errors.** The app installs an error handler that
swallows it. Consequences that matter to this formation:

- `docs/tranches/V/megatranche/audit/visual/REPORT.json` records `"consoleErrors": []` and
  `"pageErrors": []` for `/#/gradient` in all four Safari matrices — the visual audit's error gate
  **cannot see this class of defect at all**, on this route or any other.
- Any future `expect(consoleErrors).toEqual([])` clause (o17 lines 124, 211 use exactly this
  idiom) is blind to a total subtree collapse.

### Proposed cure — gestalt, not a patch

The defect is a *contract* mismatch, not a missing `Math.min`. `mixColors` models progress as a
closed `[0,1]` domain; CSS easing models output as an **open** range (`cubic-bezier` y is
unconstrained by spec, `linear()` likewise). The demo has been treating an easing *output* as a mix
*progress* without ever stating which domain wins.

Transpose it: give the gradient tree one **eased-progress boundary** — a single named function
(`easedProgress(fn, t): number`) that is the only place an easing output becomes a mix progress, and
have it clamp to `[0,1]` there, once, with the reason recorded in its own doc. Every caller
(`useSpecimenRows`, `sampleCoalescedStops`, `GradientVisualizer.colorAtPosition`) routes through it.
That also states the design truth honestly: CSS gradients cannot render an overshoot either — the
browser clamps colour interpolation the same way — so clamping is *fidelity*, not a fudge. If the
owner instead rules that overshoot must be visible, then the boundary is where the extrapolation
(not the throw) lives, and it is still one place.

---

## C2-2 — MAJOR · `FAMILY_ORDER` silently deletes 6 of the library's 30 presets; those curves then lie about their own name

**r1 does not report this.**

### Evidence

`easingCatalogue.ts:174`:

```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
```

`familyLabelFor` (`:160-172`) derives the family from the preset name by regex, so
`bezierPresets` yields **ten** families. `buildFamilies()` (`:176-195`) builds a tile for *every*
preset key, then discards whole families at `:191`:

```ts
return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(...)
```

Replaying the exact derivation over the real `PRESETS` table (`src/easing.ts:34-65`) —
`scratchpad/fam.mjs`:

```
families derived from presets: css, cubic, sine, quad, quart, quint, expo, circ, back, steps
FAMILY_ORDER kept          : css, sine, quad, cubic, expo, circ, back, steps
DROPPED FAMILIES           : quart, quint
tiles rendered: 27  bezier presets covered: 24 of 30
  UNREACHABLE: ease-in-quart     -> cubic-bezier(0.895, 0.03, 0.685, 0.22) -> tileIdFor()=null -> name "custom"
  UNREACHABLE: ease-out-quart    -> cubic-bezier(0.165, 0.84, 0.44, 1)     -> tileIdFor()=null -> name "custom"
  UNREACHABLE: ease-in-out-quart -> cubic-bezier(0.77, 0, 0.175, 1)        -> tileIdFor()=null -> name "custom"
  UNREACHABLE: ease-in-quint     -> cubic-bezier(0.755, 0.05, 0.855, 0.06) -> tileIdFor()=null -> name "custom"
  UNREACHABLE: ease-out-quint    -> cubic-bezier(0.23, 1, 0.32, 1)         -> tileIdFor()=null -> name "custom"
  UNREACHABLE: ease-in-out-quint -> cubic-bezier(0.86, 0, 0.07, 1)         -> tileIdFor()=null -> name "custom"
```

Confirmed against the live DOM (Playwright MCP `browser_evaluate` on `/#/gradient`):

```json
{"tileNodeCount": 27, "hasQuart": false, "hasQuint": false}
```

And confirmed against the producer's own preset menu, which the seat sits *next to*
(`scratchpad/probe2.mjs`):

```
PRESET MENU OPTIONS: 30 ["linear","ease","ease-in","ease-out","ease-in-out","smooth-step-3",
"ease-in-sine",…,"ease-in-quart","ease-out-quart","ease-in-out-quart","ease-in-quint",
"ease-out-quint","ease-in-out-quint",…,"ease-in-out-back"]
```

### The user-visible failure (`scratchpad/probe3.mjs`)

Open the authoring stage, pick a preset from the `<EasingPicker>`'s own menu:

```
ease-out-quint => {"headName":"1 → 2custom","readout":"cubic-bezier(0.23, 1, 0.32, 1)","pressedTiles":[]}
ease-in-quart  => {"headName":"1 → 2custom","readout":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","pressedTiles":[]}
```

A curve with a canonical name, selected **by that name**, from the catalogue this module's own
header calls "the SAME catalogue the glass-ui `<EasingPicker>`'s preset menu speaks (never a second
mint)" (`easingCatalogue.ts:15-17`), is labelled `custom` in the closed row and presses no tile. The
component's central §6/§7 law — *"CLOSED ROWS are specimen labels: … the curve's NAME (`custom` when
unnamed)"* (`GradientEasingEditor.vue:4-6`) — is violated for 20 % of the library's presets.

The header comment is not merely stale; it is **false at HEAD**, and it is the only thing asserting
the parity that `FAMILY_ORDER` breaks.

Secondary: `buildFamilies()` runs `bezierTile()` — `CubicBezier(...)` plus a 49-sample
`glyphPath()` — for all six discarded presets at module evaluation, then throws the results away.
Cheap (measured `glyphPath` = 6.4 µs/call) but it is dead work that exists only because the drop is
implicit.

### Proposed cure

Delete `FAMILY_ORDER` as a *filter*. A hand-maintained allow-list that silently swallows anything
the library adds is the defect; it will break again the next time `bezierPresets` grows. Make it a
**sort key over the derived set**, so the catalogue is total by construction:

```ts
const FAMILY_RANK = new Map([...]);        // ordering only
const rank = (f: string) => FAMILY_RANK.get(f) ?? FAMILY_RANK.size;   // unknown families sort last, never vanish
return [...byFamily.keys()].sort((a, b) => rank(a) - rank(b)).map(...)
```

Then the invariant "`SPECIMEN_TILES` covers every `bezierPresets` key" is *structural*, and the unit
test in C2-6 can assert it by enumeration instead of by `> 20`.

---

## C2-3 — MAJOR · `useSpecimenRows` is 60 % of all main-thread JS during a Gradient-**direction** drag

**r1 graded this MINOR (its C-6, "+22 % script/tick"). The CPU profiler says it is the single
largest consumer on the route.** Re-grading to MAJOR with inclusive-time evidence.

### The coupling

`useSpecimenRows` takes the whole model as a getter and dereferences it inside one monolithic
computed (`useSpecimenRows.ts:42-73`):

```ts
return computed<SpecimenRow[]>(() => {
    const model = modelState();            // ← tracks props.modelState identity
    …
    ink: safeCss(mid),                     // ← tracks ambient.value + isDark.value + probeEpoch
});
```

`modelState` (`useGradientModel.ts:102-109`) is a computed returning a **fresh object literal** on
every change to `type`, `direction`, `stops`, `intervals`, `interpolationSpace`, or `hueMethod`. So
dragging the **Direction** slider — a pure render-orientation knob that cannot change any curve, any
endpoint colour, or any ink — re-derives every row: `glyphPath` (49 samples), `interpolateStopColors`,
and `certifyAccentInk` (a WCAG floor **walk**).

### Measurement (Chrome DevTools Protocol `Profiler`, 100 µs sampling, inclusive time)

`scratchpad/probe13.mjs` — 60-move pointer drag of `[role="slider"][aria-label="Gradient direction"]`
(verified to move: `direction 90 → 270`).

| stops | intervals | busy JS | `useSpecimenRows` computed **inclusive** | of which `certifyAccentInk` | `useGradientCSS` (the work the drag *does* require) |
|---:|---:|---:|---:|---:|---:|
| 2 | 1 | 504 ms | **67.3 ms** (13.4 %) | 64.2 ms | 11.3 ms |
| 20 | 19 | 1441 ms | **869.3 ms** (60.3 %) | 810.5 ms | 19.8 ms |

At 20 stops the easing bench's incidental re-derivation costs **44× the gradient serialization the
drag actually needs**, and **14.5 ms per direction tick** — 87 % of a 16.7 ms frame budget before
anything else runs.

Isolated bench at the *live* surface lightness (`--ink-ambient-l` = 0.79), real row inks,
200 repetitions (`scratchpad/probe11.mjs`):

```
HONEST DERIVATION BENCH: {"surfaceL":0.79,"rows":19,"msPerFullSpecimenRowsRecompute":19.04}
```

Component costs (`scratchpad/bench.mjs`, 2000 iterations each, through the dev-server modules):

```
glyphPath          0.0064 ms/call
interpolateStopColors 0.0062 ms/call
certifyAccentInk   1.6849 ms/call     ← 99.2 % of the per-row cost
```

The same computed also tracks `ambient.value` (`useContrastSafeColor.ts:356`, injected
`INK_AMBIENT_KEY` = the atmosphere's `derivedLightness`), whose own module comment states *"the
AMBIENT is what moves per frame"* (`useContrastSafeColor.ts:229-232`). Every rAF-coalesced tick of
the picked colour therefore pays the same 19 ms at 19 intervals.

### Proposed cure

Split the computed along its real dependency seams instead of memoizing the symptom:

1. **Identity** (`label`, `css`, `name`, `glyph`, `tileId`, `c0`, `c1`) depends only on
   `(stops[i], stops[i+1], intervals[i])` — derive it per row, so an untouched interval's 49-sample
   glyph is never rebuilt.
2. **Ink** depends only on `(c0, c1, space, hue, ambient, dark)` — a five-key memo in front of
   `certifyAccentInk` collapses the 19 walks to the number of *distinct* endpoint pairs, and to zero
   when only `direction` moved.
3. Stop passing `modelState` wholesale. `useSpecimenRows` needs `interpolationSpace` and `hueMethod`,
   nothing else. Narrow getters (`() => modelState.interpolationSpace`) end the over-invalidation at
   the source — `type` and `direction` stop being dependencies by construction, which is stronger
   than any cache.

---

## C2-4 — MAJOR · Every interval mounts a full `<EasingPicker>` and a full 27-tile strip, though at most one row can ever be shown

r1 measured this at 8 stops (its C-5). r2 extends the curve to 20 and adds the listener count.

`scratchpad/probe9.mjs`, `/#/gradient`, gradients pasted through the code editor:

| stops | intervals | pane elements | `[data-testid="easing-picker"]` | `[data-specimen]` tiles | document nodes | JS event listeners |
|---:|---:|---:|---:|---:|---:|---:|
| 2 | 1 | 511 | 1 | 27 | 6 076 | 1 241 |
| 8 | 7 | 1 705 | 7 | 189 | 11 468 | 2 997 |
| 20 | 19 | 4 093 | **19** | **513** | 21 817 | **6 389** |

`scratchpad/probe8.mjs` confirms only one is ever reachable:

```
8 stops: openPanels ["easing-interval-0:flex","…-1:none","…-2:none","…-3:none","…-4:none","…-5:none","…-6:none"]
         tunePanels ["easing-authoring-0:none", … all "none"]
```

Two independent causes in the template:

- `GradientEasingEditor.vue:143-147` — the panel is `v-show`, so all N strips (`27 × N` chips, each
  with its own `FadingScroll` port and `useMediaQuery` matchMedia listener) mount.
- `GradientEasingEditor.vue:203-213` — the authoring stage is `v-show="tuneOpen[row.index]"` with the
  inner `v-if` gated on `intervals[row.index]` (always true), so **every** row boots a full
  `<EasingPicker>` even with zero tune panels disclosed. At 20 stops that is 18 producer components
  and 486 chips that no user can reach, at +199 elements per hidden row.

The docstring defends `v-show` for the picker on state-continuity grounds
(`GradientEasingEditor.vue:16-18`: "Picker instances stay ALIVE (v-show, never v-if) … no
remount/echo discipline"). That reasoning is sound for the **open** row and false for the other
N−1: their state is `intervals[i]`, which lives in the model, not in the picker.

### Proposed cure

The continuity the comment protects is already owned by the model. Render the disclosed body for
the open row only (`v-if="openInterval === row.index"`), and mount the authoring stage on first
disclosure (`v-if="tuneOpen[row.index]"`), keeping it alive thereafter. Closed rows keep their
head — the specimen label, which is the whole closed-row design — at ~15 elements instead of ~199.

---

## C2-5 — MAJOR · Disclosure state is keyed by array index, so it both dead-locks and resurrects

r1's C-4 covers positional interval *identity* under a mid-ramp insert. This is a different,
directly observable failure of the same root: `openInterval` (`:61`) and `tuneOpen`
(`:84`) are keyed by index and are **never reconciled** with the collection.

### Reproduction (`scratchpad/probe8.mjs`, verbatim output)

```
8 stops:                      expandedHeads ["true","false","false","false","false","false","false"]
after opening row6 + its tune: expandedHeads ["false","false","false","false","false","false","true"]
                               tunePanels    [… "easing-authoring-6:block"]
shrunk to 3 stops:             rows 2   expandedHeads ["false","false"]          ← NO ROW IS OPEN
                               tunePanels ["easing-authoring-0:none","easing-authoring-1:none"]
re-grown to 8 stops:           rows 7   expandedHeads ["false",…,"true"]         ← row 6 OPEN again
                               tunePanels [… "easing-authoring-6:block"]         ← its tune OPEN again
```

Two defects:

1. **Dead state.** With `openInterval = 6` and only two rows, `openInterval === row.index` is false
   for every row: the accordion collapses entirely and stays that way. The component's own contract
   says a row is always open (`:61` seeds `0`; the docstring's whole anatomy is "CLOSED ROWS … / The
   OPEN ROW"), and o17 codifies it — `openEasingBench` at
   `e2e/smoke/oracles/o17-easing-composition.spec.ts:40-41` comments *"The bench mounts with row 0
   open"*. Nothing clamps `openInterval` when `intervals` shrinks. The realistic user path is the
   stop editor's Remove control (`useGradientModel.removeStop`), not a paste.
2. **Resurrection.** `tuneOpen` is never pruned — `toggleTune` (`:87`) only ever *adds* keys — so a
   stale `true` at index 6 re-applies to whatever interval later occupies index 6. After the
   re-grow above, row 6 is a different interval, with different endpoint colours, whose curve
   `applyCSS` re-seeded to `linear` (`gradientParse.ts:292-297`); its authoring stage is
   nevertheless open because a *previous* interval at that index once was.

### Proposed cure

Stop keying UI state by index. `GradientStop` already carries a stable `id`
(`useGradientModel.ts:34`); an interval is identified by its bounding pair, so key both `openInterval`
and `tuneOpen` by `stops[i].id` (the interval's left anchor — stable across inserts, removals and
reorders). Then a removed stop takes its disclosure state with it, no clamp is needed, no key can
resurrect, and r1's C-4 re-hosting disappears in the same move — one change, three defects.

---

## C2-6 — MAJOR · The only unit gate covering this component asserts less than its own title, and every mutation that shipped keeps it green

### The gate

`test/gradient-v4-consume.test.ts:55-58` — verified green at HEAD:

```
$ npx vitest run test/gradient-v4-consume.test.ts
 ✓ test/gradient-v4-consume.test.ts (3 tests) 10ms
```

```ts
it("builds every easing specimen from valid Result values", () => {
    expect(SPECIMEN_TILES.length).toBeGreaterThan(20);
    expect(SPECIMEN_TILES.every((tile) => !tile.glyph.includes("NaN"))).toBe(true);
});
```

Title says **every**. Assertion says **> 20**. Actual is 27. The title's claim has 6 counter-examples
already shipped (C2-2) and the assertion cannot see them.

### The exact mutations that keep every gate green

1. **Delete `"circ"` and `"expo"` from `FAMILY_ORDER`** (`easingCatalogue.ts:174`). Six more named
   presets vanish from the selection surface and start reading `custom`. `SPECIMEN_TILES.length`
   becomes 21 > 20 → green. o17 only ever touches `ease-out-back` (`:117`, `:189`) and `step-end`
   (`:121`), both in kept families → green. **This is precisely the mutation that already shipped
   for `quart`/`quint`.**
2. **Make `glyphPath` return a constant** (`easingCatalogue.ts:66-74`), e.g. `"M 0 0 L 1 1"`. Every
   portrait becomes the same diagonal. `!glyph.includes("NaN")` → green; o17 never inspects a `d`
   attribute → green. The gallery's entire thesis — *"recognize a curve by its shape"*,
   `EasingSpecimenStrip.vue:182-186` — is untested.
3. **Make `useSpecimenRows`' `ink` return `null` always** (`useSpecimenRows.ts:69`). Every specimen
   falls back to `--muted-foreground`; the §8 "one ink per specimen" law dies. No gate reads
   `--motion-accent` on a specimen row (o18's `.specimen-name` / `.specimen-caption` selectors
   belong to the Generate plate, not this component) → green.

### And the one gate that *would* catch C2-1 never runs

```
$ ls .github/workflows/ ; grep -rn "playwright\|e2e" .github/workflows/
ci.yml  deploy-pages.yml  release.yml
(no matches)
```

o17 clicks `[data-specimen='ease-out-back']` at line 117 and line 189 — it must be RED at HEAD, and
CI has no Playwright step at all. r1 reported this; r2 re-verifies it because it is the reason a
BLOCKER shipped.

### Proposed cure

Replace the arithmetic assertion with the invariant it was trying to express, and add the two
assertions whose absence let a BLOCKER through:

```ts
// totality — every library preset has a tile (kills C2-2 by enumeration)
expect(new Set(SPECIMEN_TILES.map(t => t.css)))
    .toEqual(new Set([...Object.values(bezierPresets).map(bezierLiteral), ...STEPS_LITERALS]));
// round-trip identity — every tile names itself back (kills the "custom" lie)
for (const t of SPECIMEN_TILES) expect(specimenNameFor({ ...linearInterval(), css: t.css })).toBe(t.id);
// domain safety — every catalogued curve is renderable at every sample (kills C2-1 at unit scale)
for (const t of SPECIMEN_TILES) expect(() => serializeIntervalRamp(modelWith(t), 0)).not.toThrow();
```

The third is the one that matters: it is a *unit* test, so it runs in CI today, and it fails on
`ease-in-back` in milliseconds without a browser.

---

## C2-7 — MINOR · A failed copy is silent; a successful one is never announced

`GradientEasingEditor.vue:94-103`:

```ts
const { status: copyStatus, copy } = useClipboard({ resetMs: 1400 });
async function copyLiteral(index: number, css: string) { copiedIndex.value = index; await copy(css); }
```

The producer's `useClipboard` (`node_modules/@mkbabb/glass-ui/dist/useClipboard-D36OTaeT.js`) sets
`status = "failure"` and invokes `onCopyError?.(reason)` on `no-api` or `clipboard-api` rejection.
The seat passes no `onCopyError` and never reads `"failure"` — `copiedRow` (`:96-98`) maps anything
that is not `"success"` to `null`. A denied-permission or non-secure-context copy is therefore
**indistinguishable from not having clicked**.

On success the only signal is the button's own accessible name flipping
`Copy cubic-bezier(…)` → `Copied` (`:181`) — a name change on the focused element, which AT does not
reliably re-announce, with no `aria-live` region anywhere on the route to carry it. Corroborates
r1's C-7.

Cure: this is the design system's job, not the seat's. glass-ui already owns the confirmation state
machine; it should own the announcement — a `<FeedbackMark>`-style status node with
`role="status"` seated by the producer, consumed here, so all 88 components inherit one copy voice
instead of 88 silent ticks.

---

## C2-8 — MINOR · The seat styles the producer's private internals, with `!important` (edicts 4 + 5)

`EasingAuthoringStage.vue:88-115` reaches into `<EasingPicker>` with four `:deep()` rules, two of
them `!important`:

```css
.easing-authoring :deep([data-testid="easing-picker"]) { grid-template-columns: 1fr; }
.easing-authoring :deep(.glass-card) { background: var(--well-bg); box-shadow: none; backdrop-filter: none; … }
.easing-authoring :deep(svg[role="img"]) { block-size: auto !important; aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important; … }
```

`data-testid` is a *test* hook being used as a *style* hook, and `.glass-card` is producer-private.
This is per-instance override of a design-system component (edict 5) and a variant authored in
`demo/` instead of glass-ui (edict 4). The file documents the debt honestly
(`:14-27`, "the overrides retire at the adopt", "recorded on the P7 EasingPicker-v2 packet"), so it
is filed rather than hidden — but it is live at HEAD, and note that r1 reports the `svg[role="img"]`
selector is already **dead** against glass-ui 7.0.0 (the node is now `role="group"`), which would make
the `!important` overrides no-ops while still violating the edicts.

---

## C2-9 — MINOR · rAF fan-out: one uncancelled frame request per authoring emission

`EasingAuthoringStage.vue:57-67`:

```ts
function onAuthored(v) { requestAnimationFrame(syncVbRatio); emit("authored", v); }
onMounted(syncVbRatio);
watch(() => value.css, () => requestAnimationFrame(syncVbRatio), { flush: "post" });
```

A bezier drag emits `update:model-value` per `pointermove`. Each emission schedules an rAF **and**
propagates to the parent → `updateInterval` → new `value.css` → the watcher schedules a *second*
rAF for the identical read. No handle is retained, so nothing is cancelled or coalesced: a one-second
drag queues ~120 `querySelector` + `viewBox.baseVal` reads and up to 120 writes to `vbRatio`, each a
potential re-render. Not the PRM-RAF loop epidemic (these are one-shots and the null-guard at `:50`
makes post-unmount execution harmless), but it is unmanaged fan-out for work that is idempotent
per frame.

Cure: one stored handle, cancel-then-schedule; and delete the `onAuthored` rAF entirely — the
`watch` on `value.css` already covers every geometry change, since the docstring's own premise is
that *"Every geometry change routes through an emission"* (`:55-56`).

---

## C2-10 — MINOR · `toggleTune` clones the whole record on every press, and never prunes it

`GradientEasingEditor.vue:84-88`:

```ts
const tuneOpen = ref<Record<number, boolean>>({});
function toggleTune(index: number) { tuneOpen.value = { ...tuneOpen.value, [index]: !tuneOpen.value[index] }; }
```

`ref` on a plain object is already deeply reactive in Vue 3; `tuneOpen.value[index] = !…` is
sufficient and idiomatic (edict 7, edict 3 — the spread is contrivance). The clone also guarantees
monotonic growth, which is the mechanical half of C2-5's resurrection.

---

## C2-11 — INFO · The readout-rail buttons sit exactly on the WCAG 2.5.8 floor

Measured live (Playwright MCP, `/#/gradient`, desktop):

```json
"railBtns": [{"w":24,"h":24,"label":"Copy cubic-bezier(0, 0, 1, 1)"},
             {"w":24,"h":24,"label":"Author a custom curve"}]
```

`padding: 0.3125rem` (5 px) + `w-3.5` icon (14 px) = exactly 24 × 24 (`:269-280`). It passes AA
(2.5.8, 24 px minimum) with zero headroom and fails AAA (2.5.5, 44 px). One token change to the
icon or the padding silently drops the component into the visual audit's `smallTapTargets` bucket.
For reference, this component contributes **0** of the 6 small tap targets the audit records for
`/#/gradient` (`REPORT.json` — they are the slug controls, a bare `input`, and the two 20 × 20
gradient stop handles, all `GradientStopEditor`/dock).

Specimen tiles measure 45.2 × 43.8 / 44 × 43.8 — comfortably clear.

---

## Negative proofs — hazards checked and found ABSENT

Each was tested, not assumed.

| hazard | verdict | evidence |
|---|---|---|
| `defineModel()` stale async round-trip | **absent** | the component uses none; the whole tree is `defineProps` + `emit` (`:42-50`). The parent's `updateInterval` mutates `intervals.value` synchronously (`useGradientModel.ts:134-140`). No local `shallowRef` cache is needed. |
| oklch→HSV hue drift / `stableHue` | **N/A** | no HSV roundtrip anywhere in this tree; all colour work is oklch-native through `parseColorIn`/`mixColors`. |
| `ValueUnit` nesting accumulation | **absent** | no `ValueUnit` construction in the subject or any of its four composables (`grep -rn "ValueUnit" demo/workbenches/gradient/` → no matches). |
| reka-ui slider pointer-capture leak | **N/A** | this component owns no slider. The two `[role="slider"]` nodes inside the disclosed stage are the producer's bezier handles. |
| ungated rAF **loop** (PRM-RAF epidemic) | **absent** | the only rAFs are the two one-shots in C2-9. No self-rescheduling loop; nothing to gate on `prefers-reduced-motion`. Reduced motion *is* honoured where it matters: `EasingSpecimenStrip.vue:47,74` switches `scrollBy` behaviour off `useMediaQuery("(prefers-reduced-motion: reduce)")`. |
| WebGL context loss / eager boot | **N/A** | no WebGL in this tree. The one `consoleError` on the route matrix is `/#/` ("WebGL: context lost"), not `/#/gradient`. |
| idle re-render churn / runaway reactivity | **absent** | MutationObserver over `#easing-interval-0` (subtree, childList, attributes, characterData) for 3 001 ms at rest: **0 mutations**, head likewise 0. |
| duplicate DOM ids from `easing-interval-${index}` | **absent** at HEAD | live query for duplicate ids returned `[]`; the component is instantiated once. Latent if it is ever mounted twice — the ids are not instance-scoped (`useId()` would be the idiomatic cure). |
| horizontal page overflow from the strip | **absent** | `REPORT.json` `overflowX: 0` on all four matrices. The 12 `bleeding` entries on `/#/gradient` are all this component's (`div.strip-row`, `div.strip-family`, `span.family-eyebrow`, `div.family-tiles`, `button.glass-chip.glass-capsule` ×3, `svg`, `path`, `span.tile-label`) — expected for a deliberate `FadingScroll` inline scroller, clipped by the port, not a page bleed. |
| `NaN` in a rendered glyph path | **absent** | live query `headGlyphHasNaN: false`; unit assertion holds for all 27 tiles. |
| `verbatimModuleSyntax` (edict 8) | **compliant** | all five files audited: `EasingPickerValue`, `SpecimenTile`, `GradientInterval/ModelState/Stop`, `ComputedRef`, `EasingFunction`, `JumpPosition`, `BezierPoints`, `JumpTerm` — every type-only import carries `import type`. Zero violations. |
| god module (edict 1) | **compliant** | 295 lines, four extracted collaborators, no growth into a monolith. |
| animations deleted (edict 6) | **compliant** | the W5-9 autoplay drive was *replaced* by the live ramp strip and documented at `:20-25`, not silently removed; the `aspect-ratio` morph is tokenized (`--duration-normal`, `--ease-standard`) with a global PRM carve-out. |
| accordion keyboard operability | **compliant** | the head is a real `<button type="button">` with `aria-expanded` + `aria-controls` (`:117-142`); the tune toggle likewise (`:187-197`); the ramp carries `role="img"` + a distinguishing `aria-label` (`:155-156`); the strip is a labelled `role="group"` of real buttons. Focus uses the house register (`--focus-ring-shadow`), never a bespoke outline. |

---

## Ranked summary

| id | severity | defect | evidence |
|---|---|---|---|
| C2-1 | **BLOCKER** | 3 of 27 shipped tiles (`back` family) destroy the Gradient pane — `fn(0.5)` = −0.0636 / 1.0676 leaves `mixColors`' `[0,1]` domain and the demo turns the `Result` into a throw inside a render-read computed; **and the crash emits zero page/console errors**, blinding every automated gate incl. this formation's visual audit | probe14 (`heads 1→0`, `paneText 599→102`), probe15 (numeric + `color_progress_out_of_range` + empty error log); `useSpecimenRows.ts:52-59`, `useGradientInterpolation.ts:37`, `useGradientCSS.ts:206-208` |
| C2-2 | MAJOR | `FAMILY_ORDER` silently drops `quart` + `quint`: 24 of 30 presets tiled; the other 6 are unreachable and render as `custom`; the module header's parity claim is false | `easingCatalogue.ts:174,191`; fam.mjs enumeration; live DOM `27 tiles / hasQuart:false`; probe2 (`30` menu options); probe3 (`"1 → 2custom"` for `ease-out-quint`, `ease-in-quart`) |
| C2-3 | MAJOR (r1 had MINOR) | one monolithic computed couples the WCAG ink walk to the whole `modelState`: **60.3 % of all busy JS** during a Direction drag at 20 stops (869.3 ms / 1441 ms; 14.5 ms per tick) vs 19.8 ms for the serialization the drag needs | probe13 CDP inclusive profile; probe11 (19.04 ms/recompute at live `surfaceL` 0.79); bench (`certifyAccentInk` 1.6849 ms/call) |
| C2-4 | MAJOR | every interval mounts a full `<EasingPicker>` + 27-tile strip though one row shows: 20 stops → 4 093 pane elements, 19 pickers, 513 tiles, 6 389 listeners | probe9 table; probe8 (`tunePanels` all `none`); `:143-147`, `:203-213` |
| C2-5 | MAJOR | index-keyed `openInterval`/`tuneOpen` **dead-lock** (shrink ⇒ no row open at all, contra `:61` + o17:40) and **resurrect** (re-grow ⇒ row 6 + its tune re-open on a different interval) | probe8 verbatim `expandedHeads` / `tunePanels` sequence; `:61,84-88` |
| C2-6 | MAJOR | vacuous gate: `it("builds **every** easing specimen")` asserts `length > 20` against 27; three green-keeping mutations named, one of which already shipped; and the only e2e that would catch C2-1 has **no CI step** | `test/gradient-v4-consume.test.ts:55-58` (green); `o17:117,189`; `grep playwright .github/workflows/` → empty |
| C2-7 | MINOR | copy failure silent (`onCopyError` unused, `"failure"` unread), success unannounced, no `aria-live` | `:94-103,181`; `useClipboard-D36OTaeT.js` |
| C2-8 | MINOR | `:deep()` + `!important` styling of producer internals via a `data-testid` hook (edicts 4, 5) | `EasingAuthoringStage.vue:88-115` |
| C2-9 | MINOR | two uncancelled rAFs per authoring emission for one idempotent read | `EasingAuthoringStage.vue:57-67` |
| C2-10 | MINOR | `toggleTune` record clone (edicts 3, 7) + never pruned | `:84-88` |
| C2-11 | INFO | rail buttons exactly 24 × 24 — AA floor, zero headroom | live measurement |

### The strongest defect

**C2-1.** A first-class, visually prominent press target — one of 27 tiles in a gallery whose stated
thesis is "recognize a curve by its shape" — deletes the entire workbench on a single click, in the
default two-stop state, with no error surfaced anywhere. Everything else on this list degrades the
component; this one removes it.

### The most *interesting* defect

**C2-2 with C2-6.** The catalogue's totality was asserted in a comment and gated by
`length > 20`. Prose carried the invariant; arithmetic guarded it; the two disagreed by six presets
and nothing noticed. That is the shape of the failure, not an instance of it — and it is the same
shape as C2-1 (a domain contract stated in prose, enforced nowhere) and C2-5 (an "always one row
open" contract stated in a docstring and an e2e comment, enforced nowhere). Three of the six
non-trivial findings are the same mechanism: **an invariant that lives in a comment**.

---

## Probe artefacts

All scripts under
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`,
run against the live dev server at `http://localhost:9000`, repo at `tranche-u` / `c654824e`.
No repository source was modified by this seat.

| script | what it decides |
|---|---|
| `fam.mjs` | replays `familyLabelFor` + `FAMILY_ORDER` over the real `PRESETS` table → the 6 dropped presets (C2-2) |
| `probe.mjs` | DOM/picker/tile counts at 2 vs 8 stops (C2-4) |
| `probe2.mjs` | the producer preset menu's 30 options (C2-2) |
| `probe3.mjs` | preset-menu selection → `"1 → 2custom"` (C2-2) |
| `probe8.mjs` | disclosure-state dead-lock + resurrection across shrink/re-grow (C2-5) |
| `probe9.mjs` | DOM / node / listener growth at 2 / 8 / 20 stops (C2-4) |
| `bench.mjs` | per-call cost of `glyphPath`, `interpolateStopColors`, `certifyAccentInk` (C2-3) |
| `probe11.mjs` | honest 19-row recompute at the live `--ink-ambient-l`; verified direction drag (C2-3) |
| `probe13.mjs` | CDP `Profiler` inclusive-time attribution, 1 vs 19 intervals (C2-3) |
| `probe14.mjs` | the `back`-family pane destruction, with full error capture (C2-1) |
| `probe15.mjs` | numeric proof of the out-of-range mechanism + the silent-failure proof (C2-1) |

Read-only browser probes throughout: navigation, `evaluate`, one pointer drag, tile clicks. No app
state was persisted.
