# CHALLENGE-C · `demo/workbenches/mix/MixPane.vue` — implementation (pass C)

> **Passes A and B are preserved verbatim at `challenge-C-implementation-pass-a.md` and
> `challenge-C-implementation-pass-b.md`.** This is an independent third seat. I probed first and
> read the prior passes only after my own measurements had landed; nothing below was copied from
> them. Corroborations are marked **✅ CONFIRMED (3rd seat)**, my own material **NEW**, and the one
> place I could not settle a prior finding is said plainly.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context seat — which
is the tier this seat was explicitly spawned with. The seat is **declared, not inherited**.

---

## Verdict

**DEFECTIVE — BLOCKER.** Three seats, three independent instruments, one conclusion: the Mix
workbench's default mode **cannot accept a single operand in the running application**, and the
convergence choreography the source documents at length **has never once executed as written**.

Pass C's material contribution is not another confirmation. It is the **root cause, dated and
attributable**: the six-seam producer breakage that passes A and B measured from the consumer side
is one producer commit — glass-ui **`490cc46e`** — which deleted `WatercolorDot`'s `tag` prop, its
`:is`/`:type` host binding, and its default `<slot/>` in a single cut. That converts "21 of 23 call
sites drop something" (pass B N-3) from a demo-side census into a **producer-side regression with a
named restore precedent already in glass-ui's own history**, which is exactly what the BH relay
needs to act.

Plus **four findings neither prior pass reached** (P-1…P-4), one of which — the "stable keys"
machinery — is a contrivance that makes the thing it claims to stabilise measurably *less* stable.

| | |
|---|---|
| Repo | `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, brief HEAD `c654824e` |
| glass-ui | `@mkbabb/glass-ui@7.0.0` (`file:` symlink → `/Users/mkbabb/Programming/glass-ui`, `dist/` fresh) |
| Instruments | Playwright MCP against the live dev server `http://localhost:9000`; one real `npx playwright test` run; `node` transcription of the key-derivation code; PIL crop of the shipped audit screenshot; producer-repo `git show`/`git log -S` |
| Source edits | **none.** No file outside `docs/tranches/V/megatranche/audit/components/wb-mix-pane/` was written. |

---

## NEW · R-0 — the root cause: one producer commit cut `tag`, the host binding, and the slot

Passes A and B both establish, from the consumer side, that `WatercolorDot` swallows `tag`,
`@click`, `aria-label`, `title`, `data-mix-target`, and slotted children. Neither names *when or why*.
It is one commit, and it is dated:

```
$ cd /Users/mkbabb/Programming/glass-ui
$ git show 490cc46e -- src/components/watercolor-dot/WatercolorDot.vue | grep '^-' | grep -i 'tag\|slot'
70:-        /** Host tag — `div` (decorative) or `button` (interactive). */
71:-        tag?: "div" | "button";
79:-        tag: "div",
131:-        :is="tag"
133:-        :type="tag === 'button' ? 'button' : undefined"
197:-        <slot />
```

`490cc46e` = **"feat(BI): land the Glass 7 component, motion, material, and public-surface cut."**
Every subsequent touch of the file belongs to the same reduction band:

```
$ git log --oneline -5 -- src/components/watercolor-dot/WatercolorDot.vue
a77ae9fe refactor(reduction): re-true BJ.W-REDUCE-PROPDIET — restore live-consumer props a stale census mis-cut
f04f05d8 refactor(reduction): close BJ.W-REDUCE-PROPDIET — retire dead-config props + record the fresh-census KEEPs
2d1584a5 chore(demeta): scrub wave/tranche/audit/session provenance …
490cc46e feat(BI): land the Glass 7 component, motion, material, and public-surface cut
```

Three things follow, and they are what make this actionable rather than merely explanatory:

1. **The mechanism is a stale consumer census.** `f04f05d8`'s own message names the trap in its own
   words — *"the old arms passed only because Vue drops unknown props (the stale-binding no-op
   trap)"* — and `a77ae9fe` exists **solely to restore props "a stale census mis-cut."** The
   `tag`/slot cut is the same class of error as the ones `a77ae9fe` already reversed, one wave
   earlier, by the producer's own hand. There is a precedent for the repair and it is theirs.
2. **The consumers were never migrated.** value.js adopted Glass 7 whole (W44, "GREEN-WITH-RESIDUALS")
   with 25 surviving `tag="…"` bindings across 12 demo files. Two of them are the Mix pane's only
   add affordances.
3. **Nothing could have caught it.** Vue drops unknown props silently; `inheritAttrs: false`
   swallows the listeners; `vue-tsc` does not type-check attribute fall-through on an
   `inheritAttrs:false` component; and the one gate that names the missing thing (the mix e2e) is
   red and unenforced. There is no diagnostic anywhere in the chain — which is why a **whole
   workbench** could sit dead through a tranche close.

**Relay-ready statement for the glass-ui BH inbox:** *`490cc46e` cut `WatercolorDot`'s `tag` prop,
its `:is`/`:type` host binding, and its default `<slot/>`. Consumers were not migrated; the
constellation census is 21-of-23 call sites degraded, 5 of them fully dead controls (pass B N-3).
Per the `a77ae9fe` precedent (live-consumer props restored after a stale census mis-cut), either
restore the interactive host or ship a migration note — the current state is a silent
capability removal, and Vue gives consumers no signal.*

**Cure preference (and I disagree gently with the reflex to restore `tag`).** The dot is
*decorative pigment*; interactivity is the consumer's business. The better shape is the one
`MixSourceSelector.vue:127-159` already uses for chips: a real `<button>` that **wraps** the dot,
with the dot left `pointer-events:none` (it already is) so the button owns the hit area and the
name. Restoring `tag` fixes 23 call sites the cheap way; wrapping fixes them the right way and
leaves the producer's surface smaller. Either beats the status quo; the relay should say so.

---

## NEW · P-1 · MAJOR — the "stable keys for TransitionGroup" machinery is *anti*-stable

`MixSourceSelector.vue:78-98` spends a module-scoped counter, a `Map`, and a pruning `watch` on
keys derived from `` `${sc.css}::${i}` `` — i.e. **the index**. Every removal shifts every survivor
into a new map slot and mints a brand-new key.

Faithful transcription of `:79-98` + `useMixingState.removeColor` (`:59-61`), run:

```
$ node /…/scratchpad/keychurn.mjs
initial        ["red","blue","lime"] keys = [ 0, 1, 2 ]
after remove#0 ["blue","lime"]       keys = [ 3, 4 ]
```

Under `<TransitionGroup name="vj-enter">` (`MixSourceSelector.vue:120-124`) removing **one** chip
therefore plays a leave transition on **all three** and an enter transition on **both survivors** —
the exact opposite of the stated purpose ("Stable keys for TransitionGroup", `:78`). Naive
`:key="i"` would patch survivors in place and animate nothing spurious; a true identity key would
animate exactly the removed chip. Twenty lines of state produce an outcome strictly worse than
either.

*Reproduction status:* the code path is transcribed and run (above); the **on-screen** consequence
is not reproducible today because R-0/C-2 make it impossible to add a chip at all. It becomes live
the moment the add affordance is repaired — i.e. it is a defect that will be *unmasked* by the
blocker fix, which is precisely when nobody is looking for it.

**Mechanism.** An index-derived key wearing the costume of an identity key, laundered through a
`Map` + counter + watcher. **Edict violation: KISS / no contrivance.**

**Cure.** Mint identity where the object is born: `useMixingState.addColor` (`:55-57`) already
constructs the `SelectedColor` — give it `id` (a monotonic counter in the composable is enough; no
`crypto.randomUUID()` needed for a client-only list) and key on `sc.id`. Delete the map, the
counter, the watcher, and the computed. Net −20 lines, and the transition becomes true.

---

## NEW · P-2 · MINOR — `MIN_COLORS = 1` manufactures a dead end

`MixSourceSelector.vue:36-39`:

```ts
const MIN_COLORS = 1;
const canRemoveColor = computed(() => selectedColors.length > MIN_COLORS);
```

With exactly one colour selected the remove button is **permanently disabled**, so a wrongly-added
colour cannot be removed in the pane at all — the only escape is the dock's Tools ▸ Clear
(`usePaneRouter.ts:220`). Nothing requires the floor: `canMix` needs ≥ 2 (`useMixingState.ts:50-53`)
and `addColor` has no lower bound. The comment calls it a "source guard" ("remove needs ≥ 1
remaining") but no rule anywhere needs one remaining. It is an invented constraint whose only
effect is a stuck state.

**Cure.** Delete `MIN_COLORS` and `canRemoveColor`. Removal to zero is legal; `canMix` already
gates the verb, and the empty state is the pane's own designed opening screen.

---

## NEW · P-3 · MINOR — root-barrel glass-ui imports in a lazily-loaded pane

`MixPane.vue:12` — `import { writeClipboard } from "@mkbabb/glass-ui";`
`MixResultDisplay.vue:5` — `import { useClipboard } from "@mkbabb/glass-ui";`

Both reach the **root barrel**, while every other glass-ui import in the same two files correctly
uses a subpath (`@mkbabb/glass-ui/dock`, `/watercolor-dot`). Measured:

```
$ python3 -c "import json;print(json.load(open('node_modules/@mkbabb/glass-ui/package.json'))['exports']['.'])"
{'types': './dist/index.d.ts', 'import': './dist/glass-ui.js', 'default': './dist/glass-ui.js'}
$ ls -la node_modules/@mkbabb/glass-ui/dist/glass-ui.js  →  25239 B
$ grep -c '^import\|^export' node_modules/@mkbabb/glass-ui/dist/glass-ui.js  →  47
$ ls -la node_modules/@mkbabb/glass-ui/dist/dom.js       →   4179 B   ('./dom' exports both functions)
```

The root entry statically pulls 47 chunk modules; `./dom` is 4 179 B and exports exactly
`writeClipboard` + `useClipboard`. The pane is `defineAsyncComponent`-loaded
(`usePaneRouter.ts:75`), so this is one of the few places a barrel actually costs something.
**Honest bound:** Rollup may tree-shake most of it in the production build; the dev-server module
cost is unconditional and the discipline break is unconditional. **Cure:** `@mkbabb/glass-ui/dom`
in both files. (This also folds into pass A's C-8 clipboard finding — one import site, one owner.)

---

## NEW · P-4 · MAJOR (measurement-integrity) — the visual REPORT's `/#/mix` a11y census is structurally blind to this component

`REPORT.json` records for `/#/mix`, identically across all four Safari matrices,
`namelessButtons: 1` and 8 (desktop) / 4 (mobile) `smallTapTargets`. I enumerated them:

```json
[{"w":160,"h":23,"tag":"input","label":""},
 {"w":22,"h":22,"tag":"button","label":"Switch to slug"},
 {"w":22,"h":22,"tag":"button","label":"Generate new slug"},
 {"w":22,"h":22,"tag":"button","label":"Cancel"},
 {"w":12,"h":24,"tag":"span","label":"L channel"}, … ]
```

**Every one is shell chrome. Not a single row comes from the Mix pane.** The reason is structural:
the capture visits `/#/mix` at rest, and `selectedColors = ref([])` (`useMixingState.ts:42`), so
zero chips — and therefore zero remove buttons — existed at capture time. The pane's real
contribution is invisible to the instrument:

`MixSourceSelector.vue:152-158` — per selected colour, up to `MAX_COLORS = 12`:

```vue
<button class="absolute -top-1 -right-1 w-4 h-4 … opacity-0 group-hover:opacity-100 …"
        :disabled="!canRemoveColor || undefined" @click="emit('removeColor', i)">
    <X class="w-2.5 h-2.5" />
</button>
```

* **nameless** — icon-only, no `aria-label`, no `title`, no text → empty accessible name;
* **16 × 16 CSS px** (`w-4 h-4`) → below the 24 px floor the probe measures;
* **`opacity-0` until `group-hover`** → on touch there is no hover, so the only way to remove a
  colour on mobile Safari is to tap an *invisible* 16 px target.

So the census under-reports by up to **12 nameless sub-24 px buttons** on this route alone. This is
a finding about the *audit rig*, not only the component: **a route captured at rest cannot certify a
component whose defective surface only exists after interaction.** `STATES.json` exists next to
`REPORT.json`; the mix pane needs a "two colours selected" state in it, or its a11y numbers are
decoration.

**Cure (component).** `aria-label="Remove {{ sc.css }}"`, a ≥ 24 px hit area (keep the 16 px visual,
expand the target with padding or an inset `::before`), and
`@media (hover: none) { opacity: 1 }` so touch users can see what they must tap.
**Cure (rig).** Add the interacted state to `STATES.json` and re-run.

---

## ✅ CONFIRMED (3rd seat) — the two blockers, on my own instruments

### C-2 · the add affordances are inert

Live `page.evaluate` at `http://localhost:9000/#/mix`:

```json
{ "addByLabel": 0,                        // [aria-label="Add current color to the mix"] → ZERO
  "dots": [ { "tag":"SPAN", "cls":"add-slot-ghost w-11 h-11 …",
              "ariaHidden":"true", "ariaLabel":null, "title":null,
              "pointerEvents":"none", "hasSvgChild":false, "rect":{"w":48,"h":48} } ] }
```

Click at the slot's centre:

```json
{ "addSlotRect":{"x":828,"y":324,"w":48,"h":48},
  "elementFromPoint":{"tag":"DIV","cls":"swatch-row flex items-center gap-2.5 flex-wrap"},
  "chipsBefore":0, "chipsAfter":0 }
```

The dot is not hit-testable — `elementFromPoint` returns its **parent**. The "From palettes"
swatches (`:211-221`) are the same:
`{"paletteSwatchCount":4,"firstSwatch":{"tag":"SPAN","pe":"none","ariaLabel":null},"chipsAfter":0}`.

Full button census of the pane in colours mode — nothing that can add an operand, and the one verb
disabled forever:

```json
[{"t":"Colors"},{"t":"Palettes"},{"t":"From palettes2"},
 {"t":"OKLab","aria":"Color space"},{"t":"Shorter","aria":"Hue method"},
 {"t":"Mix","disabled":true}]
```

The discarded `<Plus>` (pass B N-2) is visible in the shipped audit artefact itself —
`…/visual/shots/safari-desktop-light/mix.png`, cropped 3× at the "Selected" well: a dashed
silhouette with **no glyph inside**. It has been in the evidence tree the whole time.

### C-3 · the convergence never sees its destination

Fourteen samples at ~100 ms across a complete palettes-mode mix (the mode that still works):

| t (ms) | `[data-mix-target]` | `.mix-plate--ghost` | `.mix-plate` |
|---:|---:|---:|---:|
| 101 | **0** | 1 | 1 |
| 503 | **0** | 1 | 1 |
| 806 | **0** | 1 | 1 |
| 907 | **0** | 0 | 1 |
| 1412 | **0** | 0 | 1 |

Zero at **every** sample — the anchor does not exist at any point in the window, so
`mixStage.ts:121-124`'s fallback is not an edge case, it is the only path. Pass B's centroid
measurement (pixel-identical to `{clientWidth/2, scrollHeight*0.7}`) and my DOM measurement
(the anchor is never in the document) are the same fact from two directions.

I add the **edict framing**, which neither prior pass states: the `targetEl ? … : {guess}` ternary
is a **masking fallback** — forbidden by the standing no-legacy/no-masking edict — and it is
*exactly why* a total structural break produced a plausible-looking animation for a whole tranche.
The repair is not only "put the anchor somewhere safe"; it is **delete the fallback branch**, so the
absence of a destination is loud. `collectStage` already returns `null` for "no sources" and `arm()`
already settles honestly on `null` (`useMixingAnimation.ts:149-154`) — the honest path exists and is
being bypassed.

### C-3′ · the gate is RED at HEAD

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget

    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      > 42 |     await expect(addSlot).toBeVisible();
  1 failed
```

`e2e/smoke/safari/mix-flow.spec.ts:29-33` carries the identical assertion on WebKit → also red.

### C-1 · the throwing parse — confirmed, with the exact frame

In-page, against the running server:

```json
{ "lab(92% 88.8 20 / 82.7%)": "ok", "#aa3344": "ok", "oklab(0.5 0 0)": "ok",
  "oklch()": "TypeError: Cannot read properties of undefined (reading 'replace')" }
```

```
TypeError: Cannot read properties of undefined (reading 'replace')
  at ae (…/dist/subpaths/css.js:265:17)
  at T  (…/dist/subpaths/css.js:354:13)
  at parsePickerColor (…/demo/color-session/picker-color.ts:157:17)
  at Module.parseColorIn (…/demo/color-session/color-utils.ts:5:28)
```

Unguarded call sites on the mix path: `useMixingState.ts:87`; `demo/palettes/mix.ts:78,86,94-97`;
`mixStage.ts:99-100` (inside `pigmentRamp`) plus the explicit `throw`s at `mixStage.ts:106` and
`color-utils.ts:18`. `MixPane.vue` has no `try`/`catch` anywhere.

I add one sharpening to pass A/B's C-1: the **worst** of those sites is `mixStage.ts:99-100`,
because `arm()` runs from a `flush:"post"` watcher (`useMixingAnimation.ts:171-183`) — i.e. **after**
`animationPhase` is already `"mixing"` (`useMixingState.ts:100`). A throw there escapes the watcher,
`loop.start()` never runs, `settledFired` stays `false`, and the machine strands in `mixing`
**permanently**: `startMix` re-entry-guards at `:83`, the plate stays ghosted at `opacity:.55`, and
the plate's own **Reset** button only exists in the *non-ghost* branch
(`MixResultDisplay.vue:76,136-142`). The only escape is the dock. *Labelled HYPOTHESIS —
mechanism read from source; I could not reproduce it live because C-2 blocks the colours path and
the palettes path throws earlier, inside `startMix`, before the phase flips.*

---

## ⚪ Not settled by me

* **Pass A's C-7** (keyboard operability of the `overflow-y-auto` Card at a scrolling viewport) —
  pass B asked a third seat to settle it. **I did not probe it either.** It remains
  un-corroborated after three seats; a fourth should either measure it or the fleet should retire
  it as unverified. I will not confirm what I did not measure.
* **An environment event, recorded so it cannot mislead a later seat.** Late in my session *every*
  pane on the running dev server — Mix **and** Generate — began booting into the shell error
  boundary with `Cannot read properties of undefined (reading 'replace')`, with `localStorage`
  restored to its original four keys. Because it reproduces on **Generate**, it is **not** a
  MixPane defect and I do not report it as one; the most likely cause is a mid-session sibling
  `dist` rebuild. **All measurements above were taken before that state.** I flag it because a
  later seat that meets this symptom could easily mis-attribute it to C-1 — it is not C-1.
* **Concurrency hazard, seconded.** Pass B reports the shared MCP browser being re-navigated
  mid-probe by concurrent seats. I hit the adjacent form of it (a probe returning `about:blank`
  mid-sequence). Pass B's isolated-context discipline is the right instrument; the fleet should
  adopt it as standing law for browser-driving seats.

---

## Test truth — one mutation neither prior pass lists

Confirmed independently: zero unit/component coverage under `demo/workbenches/mix/`;
`test/mix-v4.test.ts` is 3 tests over `mixColorSequence` alone. Adding to pass A's and pass B's
mutation tables:

| mutation | unit suite green? | e2e (if C-2 were fixed) green? |
|---|---|---|
| **`MIX_CONVERGE_MS = 900 → 2400`** (`mixStage.ts:24`) | ✅ | ✅ — `views/mix.spec.ts` allows 2500 ms and the Safari leg 8000 ms, so the documented **"≤ 1.2 s choreography wall clock (§6.2 gate)"** is asserted nowhere. The spec's own docblock claims this bound is what it proves; it is not. |
| **hard-code `"shorter"` for `hueMethod` in `startMix`** (`useMixingState.ts:89`) | ✅ | ✅ — both specs match only `/^oklab\(/`, so the mixed **value** is never asserted and any arithmetic error in the pane's core operation is invisible |
| **delete `mixPalettes`' `repeat` + `distribute` branches** (`demo/palettes/mix.ts:80-99`) | ✅ | ✅ — nothing covers `mixPalettes`; the e2e never enters palettes mode |

I second pass A's canvas-pixel landing oracle and pass B's headless `useMixingState` suite, and add:
the choreography-budget claim needs its own assertion (measure the click→ink interval and bound it
at 1.2 s + slack), or delete the claim from the spec docblock. A prose gate is not a gate.

---

## Negative proof — checked and clean

I re-ran the hazard list independently and reached the same verdicts as pass B on every row, so I
will not restate the table. Worth recording as *three-seat* agreement: **no PRM-RAF site**
(`useMixingAnimation.ts:88-114` — `useRAFLoop`, `pauseWhenHidden`, epilogue stop, missing-canvas
stop, `onBeforeUnmount` stop; `respectReducedMotion:false` is deliberate and correct because
`arm()` *completes* rather than pauses); **no `defineModel`**; **no `ValueUnit`**; **no HSV
round-trip**; **no reka slider**; **no WebGL** (Canvas2D radial gradients only, no `ctx.filter` —
the "Safari-true by construction" docstring is accurate); **the one-clock law holds in
measurement** (my ghost→inked transition landed between 806 ms and 907 ms against
`MIX_CONVERGE_MS = 900`); **palettes-mode controls are correct** (native `<button type="button">`
with `aria-pressed` + real `aria-label`; measured `"Select palette Audit Alpha"` and
`[data-mix-source]` 0 → 2) — which is the pattern C-2's repair should copy; **`MixConfigBar`'s
lazy-ramp claim holds**; **`mixPalettes` emits `position` on every colour**
(`demo/palettes/mix.ts:142`); and **`createSlug` appends a UUID suffix**
(`demo/palettes/utils.ts:14-16`), so the slug-keyed `addPalette`/`removePalette`/`isPaletteSelected`
cannot collide — I formed a slug-collision hypothesis and killed it by reading the code.

**The architecture is not the defect.** Three seats now agree on that. The one-clock law is real,
the phase machine is small and guarded, the stage model is cleanly separated from the clock. Every
blocker is a **seam**: a partial function handed to a click handler, and a producer contract
silently violated at six attribute/slot seams by one dated commit.

---

## Ranked repair order (pass C — deltas from pass B's list in bold)

1. **R-0 as the head of item 1.** Pass B's item 1 (wrap `WatercolorDot` in real `<button>`s, move
   `data-mix-target` onto an element the producer cannot swallow, delete the `mixStage.ts:122-124`
   fallback) is right and I second it whole — but it should be **opened with the `490cc46e` relay**,
   because 5 dead controls repo-wide is a producer regression with a producer precedent
   (`a77ae9fe`), and the demo-side fix should not be shipped as though it were 23 local bugs.
2. C-1 + N-1 — make `startMix` total; guard `createPalette` against the zero-colour artifact.
   **Add:** the `mixStage.ts:99-100` frame is the one that strands the phase machine, so the repair
   must include the `try/catch → settle honestly` arm in `arm()`, not only a guard in `startMix`.
3. The landing oracle + a headless `useMixingState` suite. **Add:** a wall-clock assertion for the
   ≤ 1.2 s claim, and hard-gate the mix e2e in CI so a red convergence spec cannot ship again.
4. C-4 / C-5 — hoist the anchor out of both `mode="out-in"` transitions.
5. **P-1 before it is unmasked** — fix the key derivation in the *same* change as item 1, because
   item 1 is what makes chips addable again and therefore what makes P-1 visible.
6. C-6 / N-4 (`role="status"` + real text for palette results), then **P-4's `STATES.json` entry**
   so the a11y census can actually see this pane, then **P-2**, **P-3**, C-8…C-13, N-5, N-6.
7. C-7 — still unmeasured after three seats. Measure it or retire it.

---

## Strongest single defect

**C-2 / R-0** — the Mix workbench's colours mode cannot accept a single operand in the running
application, and the cause is one dated producer commit that removed the interactive host from
under 23 call sites without a compile-time or runtime signal of any kind:
`aria-label` count **0**, host `<span aria-hidden="true">`, `pointer-events: none`,
`elementFromPoint` returns the parent, click → **0 chips**, `Mix` button `disabled: true` forever,
and the pane's own e2e fails at `expect(addSlot).toBeVisible()`.
