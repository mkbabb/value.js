# CHALLENGE-C · `demo/workbenches/mix/MixPane.vue` — implementation (pass D)

> **Passes A, B and C are preserved verbatim** at `challenge-C-implementation-pass-a.md`,
> `-pass-b.md` and `-pass-c.md`. This is an independent **fourth** seat. I read the component, its
> composables, its stage model, its children and its gates, and took every measurement below on my
> own instruments **before** opening any prior pass. I then read all three and cut everything I had
> found that they had already filed, so this document is not a fourth recitation. What remains is
> marked **NEW** (0 hits across A/B/C, verified by grep), **CORRECTION** (a prior *negative proof*
> that is wrong), or **✅ SECONDED** (their finding, my instrument, my numbers).

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context seat. That is
the tier this seat was explicitly spawned with. **Declared, not inherited.**

---

## Verdict

**DEFECTIVE — BLOCKER.** Four seats, four instrument sets, one conclusion. I re-derived C-1
(unguarded throwing parse), C-2 (dead add affordances), C-3 (the anchor never exists) and the RED
e2e gate from scratch and reached identical results; those are settled and I will not re-argue them.

Pass D's material contribution is three things:

| | |
|---|---|
| **D-1 · CORRECTION + NEW** | The convergence clock's **only lifecycle stop edge is a hook that this pane can never reach.** `MixPane` is `KeepAlive`-cached (`PaneSlot.vue:120-127`), so `onBeforeUnmount(() => loop.stop())` (`useMixingAnimation.ts:187`) never fires on a pane swap, and there is no `onDeactivated`. **All three prior passes cite that hook as part of the "no PRM-RAF epidemic — CLEAN" verdict.** That row of the negative proof is wrong and must be struck. Measured: the pane's DOM survives a full round-trip through another view — `sameCanvasInstance: true`. |
| **D-2 · NEW measurement (cure-deciding)** | Passes A and B established *that* `mode="out-in"` defers the well past `arm()`. Nobody measured *by how much*. It is **~235 ms** (mix #1 = 8 ms, #2 = 242 ms, #3 = 232 ms ≈ `--duration-morph: 0.3s`). That number eliminates the cheap cures (`nextTick`, a deeper `flush`) and forces the structural one. |
| **D-3 · NEW minor + a settled question** | An injection-contract asymmetry inside the pane (`inject(K)!` vs `inject(K)?.` for the *same* key); and a falsification that **narrows pass C's open "environment event"**: a malformed colour resident in `localStorage` does **not** kill any pane at boot — the C-1 crash is confined to the mix *action*. |

Everything else I found independently was already on the record. Convergence log at the end.

| | |
|---|---|
| Repo | `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, brief HEAD `c654824e` |
| glass-ui | `@mkbabb/glass-ui@7.0.0` |
| Instruments | Playwright MCP against the live dev server `http://localhost:9000`; one real `npx playwright test` run; `getImageData` centroid read of the mix canvas; `npx eslint`; tsconfig scan; dist-source read of the producer component |
| Source edits | **none.** Nothing outside `docs/tranches/V/megatranche/audit/components/wb-mix-pane/` was written. The `localStorage` fixture seeded for the C-1 reproduction was removed and the page reloaded (`before: ["Bad Audit","Audit Alpha","Audit Beta"] → after: ["Audit Alpha","Audit Beta"]`). |

---

## D-1 · NEW + CORRECTION · MAJOR — the clock's only lifecycle stop edge is unreachable for this pane

### The correction

All three prior passes affirm the rAF discipline as clean, and all three list the unmount hook as
part of the reason. Pass B's negative-proof table, row *"ungated rAF (PRM-RAF epidemic) → **CLEAN**"*:

> `useMixingAnimation.ts:88-114` rides glass-ui `useRAFLoop` with `pauseWhenHidden: true`, stops at
> `CONVERGE + EPILOGUE`, stops on a missing canvas/stage, **and has `onBeforeUnmount(() => loop.stop())`.**

Pass C seconds it as *"three-seat agreement."* The composable's own comment makes the same claim
(`useMixingAnimation.ts:185-187`):

```ts
// useRAFLoop auto-disposes on scope teardown; this belt-and-suspenders stop
// also halts an in-flight narration if the pane unmounts mid-mix.
onBeforeUnmount(() => loop.stop());
```

**The pane does not unmount mid-mix. It cannot.** `PaneSlot.vue:120-127`:

```vue
<KeepAlive :max="max">
    <component :is="liveComponent" :key="liveKey" :ref="…" v-bind="liveProps" />
</KeepAlive>
```

`KeepAlive` **deactivates** — it moves the subtree to a hidden container and fires
`onDeactivated`, never `onBeforeUnmount`, and never disposes the effect scope. `grep -rn
"onDeactivated\|onActivated" demo/workbenches/mix/` → **0 hits**. So neither the belt nor the
suspenders exist for the one event they were written for.

### Measurement

Palettes mode, two palettes selected, then a full round-trip `#/mix → #/generate → #/mix`:

```json
{ "before": { "sources": 2, "pressed": ["false","true","true","true"], "mixDisabled": false },
  "awayMainText": "Generate Create pleasing random palettes with aesthetic presets. 5 Regenerate …",
  "after":  { "sources": 2, "pressed": ["false","true","true","true"], "mixDisabled": false,
              "sameCanvasInstance": true } }
```

`sameCanvasInstance: true` — the **identical `HTMLCanvasElement` object** survived a full excursion
through another view. The component instance was never torn down; the selection state, the mode and
the enabled verb all persisted. That is `KeepAlive` caching, proven from the DOM, and it is
conclusive: `onBeforeUnmount` did not fire.

### Consequence

The remaining stop edges are (i) the loop's own epilogue self-stop at
`MIX_CONVERGE_MS + MIX_EPILOGUE_MS` (`useMixingAnimation.ts:108-111`), (ii) the loop's
missing-canvas/stage guard (`:92-95`), and (iii) the phase watcher's `"idle"` arm (`:177-180`).
Note what the watcher does **not** handle:

```ts
watch(phase, (next) => {
    if (next === "mixing") { arm(); }
    else if (next === "idle") { loop.stop(); stage = null; clearCanvas(); }
    // "done" — falls through; nothing stops
}, { flush: "post" });
```

So a pane swap during the narration window leaves the loop running against a canvas the user cannot
see, for the remainder of the ≤1.2 s window. **Bounded, self-terminating, no leak — hence MAJOR for
the correction, not for the runtime cost.** `pauseWhenHidden` does not help: it tracks
`document.visibilityState`, which is unchanged by a `KeepAlive` deactivation.

*Reproduction status: the unreachability of the hook is **measured** (above). The specific claim
"the loop keeps ticking while deactivated" is **code-evidenced, not isolated** — my rAF-counter probe
could not separate the mix loop's frames from the shell's, and I will not report a number I did not
cleanly attribute.*

### Cure

Two edits, both smaller than the comment they replace:

1. Make the phase watcher **total** — `if (next === "mixing") arm(); else loop.stop();` — so the
   clock's lifecycle is governed by the one state machine that already owns it, in every direction.
   This deletes an asymmetry rather than adding a hook.
2. Add `onDeactivated(() => loop.stop())` beside the unmount hook, or replace both with it, since
   under `KeepAlive` deactivation is the real teardown edge. **And fix the lying comment** — a
   comment that names an event the component cannot experience is how three audits affirmed a hook
   that never runs.

---

## D-2 · NEW measurement — the `out-in` deferral is ~235 ms, which rules out the cheap cures

Pass A named the mechanism (`C-4`), measured "not rendered at 150 ms", and pass B seconded it from
the layout side. Neither established the arrival time, and the arrival time is what decides the fix.

Instrument: poll `.mix-plate [data-variant="ghost"]` every 8 ms from the Mix click, three
consecutive mixes with a `Reset` between the first pair.

| mix | ghost well first present |
|---|---|
| #1 (plate mounts fresh) | **8 ms** |
| #2 (plate resident, `ghost` flips) | **242 ms** |
| #3 | **232 ms** |

`getComputedStyle(document.documentElement).getPropertyValue('--duration-morph')` → **`0.3s`**.

The 232–242 ms figure is the `vj-morph` *leave* of the outgoing `content` branch
(`MixResultDisplay.vue:60`, `mode="out-in"`), which must complete before the `well` branch is
inserted. `arm()` reads the DOM at `flush: "post"` on the same tick as the phase flip — i.e.
~230 ms early, every mix after the first.

**Why this matters for the repair.** A ~235 ms gap is a *transition*, not a *race*. It is not
closable by `await nextTick()`, by moving the watcher to `flush: "sync"`/`"post"`, or by a
`setTimeout(0)` — all of which are the reflexive fixes for "the element isn't there yet". The only
correct shapes are:

* drive `arm()` from the destination's **own arrival** — the plate emits when its well has entered
  (`<Transition @after-enter>`), and the canvas measures then; or
* **delete `mode="out-in"`** from `MixResultDisplay.vue:60` so the destination is announced in the
  same flush that opens the window — which is what `useMixingAnimation.ts:169-171`'s comment already
  asserts happens.

The second is one attribute and makes the existing comment true. I prefer it, and note it composes
with pass A/B/C's agreed repair (move `data-mix-target` off the `WatercolorDot` and delete the
`mixStage.ts:122-124` masking fallback): with the anchor restored *and* the deferral removed, the
`targetEl ? … : {guess}` branch can be deleted outright and a missing destination becomes loud, as
pass C rightly demands.

---

## D-3 · NEW · MINOR — two contradictory contracts for one injection key, inside one component tree

`MixPane.vue:15-16` asserts the injections exist:

```ts
const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(LIBRARY_PORT_KEY)!;
```

Its own child guards the *same* key (`MixSourceSelector.vue:33-34`):

```ts
const pm = inject(LIBRARY_PORT_KEY);
const savedPalettes = computed(() => pm?.savedPalettes.value ?? []);
```

One key, two contracts, in a parent/child pair. The `!` is an assertion to the type-checker that
nothing enforces: if the port is ever unprovided, `onSave` (`MixPane.vue:43`,
`pm.createPalette(...)`) is a raw `TypeError` — and per the settled C-1 finding, an uncaught throw
in this pane's click path takes the whole pane down. The child's defensive form silently declares
the opposite belief.

**Edict violation:** one-path / no masking fallback — `pm?.…?? []` is a masking fallback if the port
is genuinely required, and the `!` is a lie if it is not.

**Cure.** Decide once, at the seam. If `LIBRARY_PORT_KEY` is a hard precondition (it is — the pane's
Save verb is meaningless without it), express it as one: a `usePaletteLibraryPort()` helper that
injects and throws a **named** precondition error, consumed by both files. Delete the `!` and the
`?.` together.

---

## D-4 · NEW (falsification) — pass C's "environment event" is **not** a stored-colour artifact

Pass C recorded, under *"Not settled by me"*, that late in its session every pane — Mix **and**
Generate — began booting into the shell error boundary with
`Cannot read properties of undefined (reading 'replace')`, and attributed it tentatively to a
sibling `dist` rebuild.

That is the exact string C-1 produces. The obvious competing hypothesis is that an earlier seat
seeded a malformed colour into the shared `color-palettes` store and did not clean up, poisoning
every pane that parses saved palettes at boot. **I tested it and it is false.**

With `{ css: "oklch()" }` resident in `localStorage` as swatch 1 of a saved palette, freshly
reloaded:

```json
{ "palettes": { "dead": false, "text": "… My Palettes3 (3 saved) Save, organize, and share your colors. Start a new palette Bad" },
  "generate": { "dead": false, "text": "Generate Create pleasing random palettes with aesthetic presets. 5 Regenerate seed: 997759e8 …" },
  "browse":   { "dead": false, "text": "Browse Discover palettes from the community. …" },
  "gradient": { "dead": false, "text": "Gradient Build gradients with per-interval easing and CSS output. …" },
  "mix (before any Mix click)": { "dead": false, "text": "… Mix colors and palettes together. Colors Palettes Selected FROM PALETTES 3 …" } }
```

Every pane boots. Mix itself boots and *lists* the poisoned palette. Nothing parses a stored colour
eagerly; the throw only fires when the **Mix verb runs**.

Two consequences, both useful:

1. **Pass C's anomaly stays open**, with one candidate eliminated. A later seat meeting it should
   look at the producer `dist` symlink, not at storage.
2. **C-1 has a containment boundary none of the prior passes established.** The crash is confined to
   the mix *action* — it is not a boot-poisoning class. That lowers the blast radius of C-1 without
   lowering its severity: pressing the pane's one verb still destroys the pane, as I re-measured
   below.

---

## ✅ SECONDED on my own instruments — the settled findings

Compressed deliberately; the argument is made in passes A–C. These are my independent numbers only.

**C-2 · the add affordances are inert.** Live DOM of `MixSourceSelector.vue:164-176`'s add slot:

```json
{ "tagName": "SPAN", "ariaHidden": "true", "ariaLabel": null, "hasTitle": null,
  "pointerEvents": "none", "childTags": ["svg","SPAN"],
  "elementFromPointTag": "DIV.swatch-row flex items-center gap-2.5 flex-wrap",
  "sourcesAfterProgrammaticClick": 0 }
```

`elementFromPoint` at the slot's own centre returns its **parent**; a programmatic `.click()`
(bypassing `pointer-events:none` entirely) adds nothing, because `@click` was never bound. The
`<Plus>` child is absent from `childTags`. Same for the "From palettes" swatches:
`paletteSwatchTags: ["SPAN:-","SPAN:-"]`.

Producer source, read from the shipped artifact
(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js:78-137`): `inheritAttrs: !1`, props are
`{color, variant, animate, cycleDuration, range, seed}` — **no `tag`** — the render is always
`o("span", { "aria-hidden": "true", …, style: { …, pointerEvents: "none" } }, [svg, ghostStroke])`
with **no `<slot/>`**, and only `attrs.class` / `attrs.style` are forwarded. Pre-7 source
(`.claude/worktrees/glass-ui-pinned/…/WatercolorDot.vue:52-53,115,214`) had `tag?: "div"|"button"`,
`<component :is="tag">` and `<slot />`. Pass C's `490cc46e` attribution is consistent with both
artifacts.

**C-3 · the anchor never exists.** `[data-mix-target]` polled every 30 ms across a complete 1.8 s
mix: **0 at every sample** (`targetFirstSeen: null`).

**C-3 landing miss.** Canvas read back with `getImageData` at t = 880 ms (`MIX_CONVERGE_MS` = 900),
alpha-weighted centroid over α > 40:

```json
{ "canvasBitmap": {"w":510,"h":702}, "poolPixels": 609,
  "poolCentroidCssPx":       {"x":255,"y":491},
  "fallbackTargetPredicted": {"x":255,"y":539},
  "plateRectRelCard":        {"x":25,"y":584,"w":462,"h":171},
  "firstDotCentreRelCard":   {"x":64,"y":653} }
```

`arm()` ran at `scrollHeight` 702 → `510/2 = 255`, `702 × 0.7 = 491.4`. The measured centroid is
**(255, 491)** — the `mixStage.ts:124` fallback, to the pixel. The true destination is **(64, 653)**;
the plate spans y 584…755. **Δ ≈ 250 CSS px.** The pool settles in empty space above and right of
the plate and dissolves there. (Pass B measured this from the same direction; the numbers agree.)

**C-1 · the throwing parse, and what it costs.** In-page against the running module:

| input | `parseColorIn(s, "oklab")` |
|---|---|
| `"oklch()"` | **`TypeError: Cannot read properties of undefined (reading 'replace')`** |
| `""`, `"not-a-color"`, `"oklch(0.5 0.1)"`, `"rgb(NaN 0 0)"`, `"rgb(Infinity 0 0)"`, `"hsl(1e400 50% 50%)"` | `PickerColorError: Invalid CSS color` |
| `"color(display-p3 1 0 0)"`, `"oklch(-0 0 0)"`, `"#ff0000"` | ok — negative zero is handled |

Seeded one saved palette with `{css:"oklch()"}` as swatch 1, selected it plus a good palette, pressed
Mix:

```json
{ "snapAfterFirstMix":  { "plateExists": false, "ghost": false, "resetBtn": false },
  "snapAfterSecondMix": { "plateExists": false, "ghost": false, "resetBtn": false },
  "paneText": "This panel hit an unexpected error.\n\nCannot read properties of undefined (reading 'replace')\n\nTry again" }
```

**The entire pane is torn down** and every selection lost, for one bad swatch of one operand.

I add one piece of leverage the prior passes did not use: **the repo already has the cure, in a
sibling consumer of the same function.** `demo/color-session/color-chips/sample.ts:58-65`:

```ts
if (operandsCss.length < 2) return null;
for (const css of operandsCss) {
    try { operands.push(parseColorIn(css, space)); }
    catch { return null; }
}
```

The preview-ramp sampler — reading the *same* strings, through the *same* function, in the *same*
pane's config bar — guards. `startMix` (`useMixingState.ts:85-98`) does not. So this is not a missing
technique; it is a declined one, three files away.

**C-3′ · the gate is RED at HEAD.**

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' })
             .getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      > 42 |     await expect(addSlot).toBeVisible();
  1 failed
```

`e2e/smoke/safari/mix-flow.spec.ts:29-32` carries the identical locator → also red.

---

## Convergence log — independently re-derived, already filed, **not** re-argued

Recorded so the fleet can see four-seat agreement without four copies of the argument, and so
nothing I found is silently dropped:

| I found, independently | Already filed as |
|---|---|
| No `aria-live` / `role="status"` anywhere in the pane; measured `liveRegions: []`; result arrives 900 ms after the click on a rAF clock (WCAG 2.2 SC 4.1.3) | A/B/C **C-6 / N-4** |
| `MixPane.copyResult` discards `writeClipboard`'s `{ok, reason}` while `MixResultDisplay` uses `useClipboard` with a status ref — two clipboard paths, the dock one silent on failure. (Checked: `writeClipboard` never rejects — `dist/useClipboard-D36OTaeT.js` returns a Result. It is a silent-failure bug, not a rejection bug.) | A **C-8**, C **P-3** |
| Index-derived "stable keys" (`` `${sc.css}::${i}` ``) re-key every survivor on removal | C **P-1** |
| Zero unit coverage for `useMixingState` / `mixStage` / `useMixingAnimation`; the e2e asserts nothing about the canvas. Mutations that stay green: constant target in `collectStage`; delete the `drawStage` call; `MIX_CONVERGE_MS` 900 → 2400 (spec bound is 2500 ms) | A/B **test truth**, C's mutation table |
| Dead `computed` import at `MixPane.vue:2`; `npx eslint … → exit 0`; no `noUnusedLocals` in any tsconfig | A **C-11**, B seconded |
| Result never invalidated when space / hue / strategy / selection change after settle | A **C-12** |
| Result-plate actions named by `title` alone (28 × 28 px, passes the ≥24 px floor); "Copy color" even for palette results | A/B |
| Negative proofs: no `defineModel`, no `ValueUnit`, no HSV round-trip, no reka slider, no WebGL, `verbatimModuleSyntax` clean, `demo/ui/*` are pure glass-ui re-export barrels, `createSlug` UUID-suffixes so slug-keyed dedup cannot collide, `MixConfigBar`'s lazy-ramp claim holds (no listbox in the DOM at rest) | A/B/C — **all seconded**, except the one row corrected in D-1 |
| Hypothesis I formed and **killed by measurement**: that `canvas.style.height = parent.scrollHeight` on an abspos child of the scroller would ratchet `scrollHeight` upward across repeated mixes. Measured `770 → 770` across four consecutive mixes; canvas bitmap 510 × 702 = 1.37 MB, re-armed not accumulated. **No unbounded growth.** | new negative; consistent with B's `scrollableBy: 0` |

---

## Repair-order delta from pass C

Pass C's ordering is right and I adopt it whole. Three insertions:

1. **Into item 1** (the `WatercolorDot` repair + anchor relocation + delete the `mixStage.ts:122-124`
   fallback): also **delete `mode="out-in"` from `MixResultDisplay.vue:60`**. D-2 shows the anchor
   fix alone leaves mixes 2..n on the fallback by ~235 ms, and the two edits are in the same file,
   in the same breath.
2. **New, between items 2 and 3: D-1.** Make the phase watcher total and add `onDeactivated`. It is
   two lines, it is in the file item 2 already opens, and — more importantly — it is a **standing
   audit hazard**: a `KeepAlive`-cached pane whose composables clean up on `onBeforeUnmount` is a
   pattern, and this repo mounts *every* pane inside `KeepAlive` (`PaneSlot.vue:120`). The fleet
   should sweep the other workbench composables for the same shape before closing.
3. **Into item 6: D-3** (one injection contract), alongside P-2/P-3.

---

## Strongest single defect

Unchanged from pass C, and I second it on my own instruments: **C-2 / R-0** — the Mix workbench's
colours mode cannot accept a single operand in the running application. `aria-label` count **0**,
host `<span aria-hidden="true">` with `pointer-events: none`, `elementFromPoint` returns the parent,
programmatic click → **0 chips**, the `<Plus>` glyph discarded, `Mix` disabled forever, and the
pane's own e2e fails at `expect(addSlot).toBeVisible()`.

**Strongest defect original to pass D: D-1** — the clock's only lifecycle stop edge is a hook a
`KeepAlive`-cached pane can never reach, and three prior audits cited that hook as evidence the
lifecycle was clean. The lesson generalises past this component: *a comment naming an event the
component cannot experience is indistinguishable, to a reviewer, from a guarantee.*
