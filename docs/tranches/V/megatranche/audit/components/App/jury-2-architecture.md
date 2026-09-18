# JUROR-2 — ARCHITECTURE AND ISOMORPHISM · `demo/color-picker/App.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with (SCOPE §0 M-1/M-2, FORMATION-LAWS L-11).
Declared tier and observed tier agree. No inherited or undeclared seat.

**Seat:** JUROR-2 · axis **architecture and isomorphism** — the module lattice, the ownership of
every concept the component touches, and whether the cure is a patch or a transposition.
**Repo:** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD `c654824e` · 2026-07-24.
**Writes:** confined to `docs/tranches/V/megatranche/audit/components/App/`. No source edit landed.

---

## VERDICT — **APOTHEOSIS_REQUIRED**

Not because the challengers found many defects. Because of one fact none of the three found, which
I measured, and which changes the shape of the cure:

> **glass-ui 7.0.0 ships `InstrumentChassis` — a published, exported, styled housing primitive whose
> CSS declares `grid-template-columns: minmax(0, 61.8033989fr) minmax(0, 38.1966011fr)` for
> `golden` and `minmax(0, 66.6666667fr) minmax(0, 33.3333333fr)` for `preview-dominant`, collapses
> to one column through `@container (max-width: 44.9375rem)`, renders no inspector region when the
> inspector slot is empty, and exposes `data-reserve` with `--instrument-stage-reserve` /
> `--instrument-inspector-reserve`. The demo uses it exactly `0` times.**

```
$ python3 -c "import json;print(json.load(open('node_modules/@mkbabb/glass-ui/package.json'))['exports']['./instrument-chassis'])"
{'import': './dist/instrument-chassis.js', 'types': './dist/instrument-chassis.d.ts'}

$ grep -c "instrument-chassis" node_modules/@mkbabb/glass-ui/dist/styles/index.css
1                                                   # @import "../components/instrument-chassis/styles.css"

$ grep -rn "InstrumentChassis\|instrument-chassis" demo/
(no output)
```

Which means `App.vue` + `shell.css` are not "a shell whose proportions are wrong". They are a
**hand-rolled clone of a producer primitive**, and the clone is worse on five independent axes:

| Concern | App.vue + shell.css (today) | glass-ui `InstrumentChassis` (shipping, unused) |
|---|---|---|
| ratio | `repeat(2, minmax(var(--pane-min), 1fr))` — 50/50, measured (`shell.css:137`) | two named typed values, both legal, `proportion` prop |
| narrow collapse | a JS media query driving a **hard `v-if` mount fork** (`App.vue:77` / `:94`) that destroys three KeepAlive caches and both WebGL contexts | `@container (max-width: 44.9375rem)` — a reflow, zero remount |
| empty secondary | a hand-rolled ghost slot: `visibility:hidden; position:absolute; content-visibility:auto` (`App.vue:403-409`) | `t.$slots.inspector ? … : createCommentVNode()` — the region does not exist |
| reserve | none | `data-reserve="none|stage|inspector|both"` + two reserve custom properties |
| boundary lines | none expressible | `boundaries: ("stage-inspector"|"inspector-action")[]` |
| action region | the dock reaches into pane instances by method name through `any` | `.instrument-action` slot, owned by the composition |

And the binding artifact already ruled it, in the exact words my axis needs
(`docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md` §5, producer/consumer seam 1):

> **P122 / one main and producer proportion.** glass-ui owns named regions/phases/material, exact
> `golden`/`preview-dominant` proportions, inspector-absent expansion and stage→inspector→action
> narrow collapse. Regions are landmark-neutral; **value owns the route main and adds no grid CSS.**

`demo/styles/shell.css` declares grid CSS for the scene at `:61` and `:137`. That is the violation,
stated as a lintable property, and it is RED today.

So the cure is a **transposition**, not a patch — and edict 2 makes it mandatory rather than
optional, because a local clone of a shipping producer primitive *is* a dual path.

**But** — and this is the juror's correction to CHALLENGE-D — "transpose the shell onto
InstrumentChassis" is an **arc, not a wave**. Eleven member compositions is exactly the shape
FORMATION-LAW L-1 forbids ("a wave that only makes sense as part of a 40-wave arc is not a wave").
I therefore author **one** wave — the one that is individually completable, born RED today, and
without which every other cure is unsafe — and I FOLD the member transpositions to the waves the
canon already names as their owners (W18/W19/W22/W24), preserving each row's identity.

---

## 1. Adjudication — merging the three challenges into eleven mechanisms

Two challengers describing one mechanism are one defect. After merging, **39 challenger rows
collapse to 11 defects + 1 hypothesis**. Every row below carries a terminal disposition.

### A-1 · BLOCKER · There is no composition root
**Merges:** L-1, L-2, C-1, C-8 (one arm), D-9, C-7, C-6, L-12, L-15
**Mechanism:** an HTML file cannot express a composition root, so the root *component* becomes one.
Boot logic, DI installs, the CSS document graph, the mount-host contract and the route-resolution
assumption all migrate into `App.vue`'s setup, where none of them is typed, ordered, or testable.

**Bytes (mine):**
```
$ find demo -name "main.ts" -o -name "main.js"
(no output)
$ grep -c '<script type="module">' demo/color-picker/index.html   → 1     # inline, MT-F012's P0
$ grep -c '<script type="module" src=' demo/color-picker/index.html → 0
```
`demo/color-picker/index.html:205-213` is the entry; `:226` is `<body class="relative" id="app"
data-paper-field>`; `App.vue:214` runs `useGlobalDark()` and `:219` `provideApiClient()` inside a
component setup, with the ordering contract written in the comment at `:212-213`; `App.vue:199-210`
imports four stylesheets.

**The dependent BLOCKER (C-1) is real and its mechanism is confirmed in bytes by me.** The entry
mounts without `await router.isReady()`, so `useViewManager.ts:43-46` falls back to `"picker"` at
first render, `PaneSlot.vue:74` seeds `liveComponent` at setup, the router then swaps the child and
cancels the `appear` transition — and B3 is armed by that hook **and nothing else**:
```
$ grep -rn "noteLeftPlateSettled" demo/
demo/color-picker/composables/boot/useOverture.ts:206   ← the definition
demo/color-picker/App.vue:90, :109                      ← the ONLY two call sites, both :on-appeared
```
The aggravation the challengers missed: **the identical failure already shipped once in this file
family and was cured for a sibling beat.** `useDockArrival.ts:58-72` carries the fix and the
post-mortem in its own comment — *"awaiting them veiled the dock FOREVER on WebKit-mobile, where no
mount-morph transitionend arrives first — b2 never opened, the blob never mounted; the smoke-safari
project caught it at the W2 close"* — and then falls through on `getAnimations()` emptiness. B3 was
left with no floor. This is not a new defect class; it is an uncured instance of a diagnosed one.

**Status:** UPHELD_REPRODUCED (C's probe: deep-linked `/#/generate` yields marks `[b0,b1,b2]` and no
blob, for the life of the session; control `/#/` yields `[b0,b1,b3,b2,b4]` + blob).
**Disposition:** BUILD — `V·MT-W-ARCH-1` (§4).

**Two juror corrections to the challengers' cures, both settled by measurement:**

> `D-9` proposes deleting `class="relative"` from `<body>` as "dead weight" and moving
> `data-paper-field` onto `.app-layout`. **Both arms are REFUTED.**
> ```
> $ node <scratchpad>/j2-body.mjs
> { "bodyPosition": "relative", "appIsBody": true,
>   "bodyChildren": [ {"tag":"DIV","cls":"","pos":"absolute"},          ← a teleport host
>                     {"tag":"DIV","cls":"app-layout","pos":"relative"},
>                     {"tag":"SPAN",…}, {"tag":"DIV",…}, {"tag":"DIV",…}, {"tag":"DIV",…} ],
>   "absoluteBodyChildren": 1,
>   "atmosphereCanvasOffsetParent": "app-layout" }
> ```
> One `position: absolute` **direct child of `<body>`** exists — `class="relative"` is its containing
> block and is live. D-9 is right that the *canvas* does not need it (`offsetParent` is
> `.app-layout`) and wrong that the attribute is dead. And `data-paper-field` must dominate the
> body-portalled dialogs, which are `.app-layout`'s **siblings**, not its descendants
> (`index.html:216-224` states exactly this): moving it onto `.app-layout` would silently re-arm the
> producer's orphan-card warm field-floor for every portalled dialog.
> **L-2's cure is the correct one, and it is exactly one attribute wide:**
> `<body class="relative" data-paper-field><div id="app"></div></body>`.
> C-8's arms (a) `data-paper-field` and (b) `class="relative"` are **RETIRED** with this rationale;
> C-8's arm (c) — the prepaint contract — is UPHELD into A-1.

> `L-3` proposes relocating `injectGroundTokens` into `plugins/`. **The cure is REPLACED**, because
> the canon already ordered the mechanism's death, by name:
> `VISUAL-CONSTITUTION.md` §6.2 — *"`groundRecordInject`, `__GROUND_*__`, the stop cache, and the
> initial `deriveAurora` twin all die in the same cut"*, and *"One synchronous same-origin
> **external classic script** runs in `<head>` … it uses no inline code, `eval`, import, arbitrary
> CSS parser, or **build-time token injection**, and therefore works under `script-src 'self'`."*
> Relocating the plugin would preserve a mechanism the constitution retires. The build→app edge is
> not fixed by moving the import; it is fixed by **deleting the injector**. Measured scope of the
> deletion (larger than L-3 assumed — the tokens are in the *critical CSS*, not only the script):
> ```
> $ grep -rn "__GROUND_" demo/ vite.config.ts plugins/ | grep -v node_modules | wc -l
> 20      # incl. index.html:102-106 @property initial-value, :113 <meta theme-color>
> ```

### A-2 · BLOCKER · The shell reaches into leaf panes; registration is a per-call-site prop
**Merges:** L-8 (the root), D-1, C-2 (the mobile symptom), C-3 (the wrong-ref symptom), D-13 (the
enabling type erasure), C-5 (dies with it)
**Mechanism:** the dependency points from the shell **into** the leaf. The shell names nine private
methods on three workbench instances through `any` refs with optional calls, and the instance
capture is a prop (`:on-mount`) each call site may or may not pass — so liveness desynchronises
with every `v-if` branch, and the identity of "which pane is mounted" has two disagreeing sources
(`currentConfig.left`, the incoming view, vs `PaneSlot.liveKey`, the rendered one).

**Bytes (mine):**
```
$ grep -c 'ref<any>' demo/color-picker/App.vue                              → 3   (:317,318,319)
$ grep -c ': any' demo/color-picker/App.vue                                 → 2   (:323,330)
$ grep -c 'paneRefs\.[a-z]*\.value?\.' demo/shell/usePaneRouter.ts          → 9   (:196-222)
demo/shell/PaneSlot.vue:52   onMount?: (instance: any) => void;
demo/shell/PaneSlot.vue:124  :ref="onMount ? (el: any) => onMount!(el) : undefined"   ← a NEW arrow every render
demo/color-picker/App.vue:83-91   the mobile PaneSlot — no :on-mount
demo/color-picker/App.vue:105, :131  the two desktop slots — :on-mount
```
Measured consequence, twice, independently: D's `p3.mjs` (`mobile-390 specimenChanged:false` vs
`desktop-1440 specimenChanged:true`, zero errors either side) and C's `probe-actionbar2.mjs` (dock
Regenerate at 390 px leaves the generate seed `f16915bd → f16915bd`; the pane's own button on the
same page yields `f16915bd → e04dde63`). Nine named, enabled dock controls are inert on mobile.

**Status:** UPHELD_REPRODUCED.
**Disposition:** BUILD — `V·MT-W-ARCH-2` (§5, named sibling).
**Structure over gates (FORMATION-LAW L-8):** the cure is not "add the missing `:on-mount`". It is
to make the wrong thing **unrepresentable** — invert the edge. `demo/shell/actionBar.ts` exports
`ACTION_BAR_KEY: InjectionKey<Ref<DockActionBar | null>>`; each workbench calls
`useProvidedActionBar({ label, icon, actions })` in its own setup, naming its own handlers in its
own file. Then `usePaneRouter`'s 40-line `actionBar` computed, `PaneActionRefs`, all three `ref<any>`,
both `any` callbacks, `PaneSlot.onMount`, `colorPickerRef` **and** `App.vue:164`'s `ColorPicker`
import all delete. C-5's edict-8 violation is cured by deletion, not by `import type`.

> **C-5's bundle rationale is DISMISSED.** C claims the un-`type`d import "puts the picker's module
> graph into App's eager chunk for a type". `demo/shell/usePaneRouter.ts:21` imports `ColorPicker`
> as a genuine runtime value, and `App.vue:187` imports `usePaneRouter` — the picker is eager
> regardless, so the `import type` edit would change zero bytes of the graph. The **edict-8
> violation itself stands** (`grep -n ColorPicker demo/color-picker/App.vue` → `164, 223, 294`;
> `:223` is the sole use and it is a type position).

### A-3 · BLOCKER · A local chassis recipe stands in for a shipping producer primitive
**Merges:** D-2, D-3, D-7, D-10, D-12
**Mechanism:** the shell owns region composition — ratio, collapse rule, empty-secondary handling,
stacking, entrance timing — for eleven differently-composed members, through one hand-rolled recipe.
The producer ships that housing (see the verdict table above). This is a **dual path** in the
strictest reading of edict 2, and it is why D-1/D-7/D-10/D-12 exist at all.

**Bytes (mine, measured live at 1440×900 on three routes):**
```
$ node <scratchpad>/j2-arch.mjs
/#/            gridCols "512px 512px"  share 50.0000%  chassisNodes 0
/#/generate    gridCols "512px 512px"  share 50.0000%  chassisNodes 0
/#/admin/users gridCols "512px 512px"  share 50.0000%  chassisNodes 0
GA-6 /#/              share=50%  nearest legal=61.8033989  delta=11.80pp  -> FAIL
GA-6 /#/generate      share=50%  nearest legal=61.8033989  delta=11.80pp  -> FAIL
GA-6 /#/admin/users   share=50%  nearest legal=61.8033989  delta=11.80pp  -> FAIL
```
`/#/admin/users` measuring exactly half is the sharpest single row: `VISUAL-CONSTITUTION.md:218`
says *"Each Admin route uses the full main width: the current Palettes companion, right label and
resulting mobile pane selector are **removed rather than restyled**"* — five routes, `512px` each.
Source: `demo/styles/shell.css:133-138`, comment `/* Equal columns always (the kept 1fr↔1fr
invariant) */`. Thirteen of fourteen `VIEW_MAP` rows carry a companion (`viewSchema.ts:107,116,126,
135,144,154,163,181,190,199,208,217,226`); `:172` (`/atmosphere`) is the only `right: null`.

**Status:** UPHELD_REPRODUCED (my measurement, three routes) + UPHELD_BY_BYTES (the producer
primitive exists and is unused).
**Disposition:** the **shell half** — deleting `.pane-container*`, `.pane-wrapper--left/--right/
--ghost`, the `[data-layout]` display witnesses, the `v-if` breakpoint fork, `mobilePaneIndex`,
`PaneSegmentedControl.vue` and `PaneSlot.vue` — is BUILD in `V·MT-W-ARCH-3`. The **eleven member
compositions** FOLD to the waves the binding artifact already assigns them (OPTICAL-BENCH §6: *"W18
authors eighteen separately named low-fi→real-render pairs"*; VISUAL-CONSTITUTION §3.1: W18 About,
W19 route/Dock/title/focus, W24 Admin, W26 Mix, W27 Gradient/Easing), with each row's original id
preserved. That is a FOLD to a **named owner in a binding artifact**, not a re-booking.

### A-4 · MAJOR · Scroll ownership is inverted — the document never scrolls
**From:** D-8 (sole)
**Mechanism:** a viewport-locked shell (`height: 100dvh; overflow: hidden`, `shell.css:19-28`)
displaces the document scroller into per-card wells behind a `backdrop-filter` carrier. Measured by
D on all three matrices: `docScrollable 0 / bodyScrollable 0`; desktop `/#/` reports one scroller,
`div.glass-resting.card +7251px`. Canon §3 law 6 requires mobile to be *one document-scrolling*
sequence. It is not the chassis's concern — it is the shell's own two-band grid.
**Status:** UPHELD_REPRODUCED. **Disposition:** BUILD — `V·MT-W-ARCH-3` (`min-height: 100dvh` +
`position: sticky` on grid row 1; `--dock-band-min-h` already satisfies §3 law 4 structurally).

### A-5 · MAJOR · One route lattice, three partial homes, two masking fallbacks
**Merges:** L-4, L-5
**Bytes (mine):**
```
$ grep -c 'viewSchema' demo/color-picker/router/index.ts   → 0     # the header claims it was retired at D.W3 Lane D
$ grep -c 'name: "'    demo/color-picker/router/index.ts   → 14
$ grep -rn "meta\.admin\|meta?\.admin" demo/               → (no output)   # 5 producers, 0 consumers
demo/shell/useViewManager.ts:43-46   return isViewId(name) ? name : "picker";     ← masking fallback
demo/shell/usePaneRouter.ts:81-95    componentFor(name: string | null) … return ColorPicker;  ← masking fallback
```
`viewSchema.ts:52-66` already defines `LeftPane`/`RightPane` as closed unions and `componentFor`'s
only callers pass exactly those (`:165`, `:171`) — the union is available and discarded, which is
why the author had to write a catch-all return.
**Status:** UPHELD_BY_BYTES. **Disposition:** BUILD — `V·MT-W-ARCH-1`.
**Ordering note (mine):** deleting the `?? "picker"` fallback is only *safe* after `await
router.isReady()` lands — otherwise the fallback's removal converts a wrong render into a boot
crash. That coupling is why A-1 and A-5 are **one** wave, not two.

### A-6 · MAJOR · Provide-scope ≠ use-scope; `usePalettePorts` is a god provider
**Merges:** L-6, L-7
**Bytes (mine):** `demo/palettes/usePalettePorts.ts` — 275 lines; `providePalettePorts` constructs
and provides fifteen composables (`:4-19` imports, all invoked in the body). `App.vue:188` →
`usePaletteWiring.ts:24` → `usePalettePorts`. `usePaneRouter.ts:69-78` makes all ten panes
`defineAsyncComponent`. The pane split is real for the views and void for the logic: the five admin
ports are constructed at the root on an anonymous visitor's first paint.
**Status:** UPHELD_BY_BYTES **on the static half only**.

> **L-6's live 238-module measurement is DISMISSED as bundle evidence.** FORMATION-LAW L-12:
> *"Performance and bundle claims are measured against the **built** artifact — never the dev
> server."* The dev server serves unbundled ESM, so **every** static import is a separate resource
> by construction; the measurement cannot distinguish "eager in the bundle" from "a module exists".
> The **structural** claim survives independently and needs no probe: `providePalettePorts` is
> *called* at the root, so its fifteen constituents are reachable-and-invoked and cannot be
> tree-shaken at any setting. L-6's and C-6's collateral finding — that `App.vue:168-175` books a
> residual on `"sideEffects": "./demo/**"` — is separately UPHELD:
> `python3 -c "import json;print(json.load(open('package.json'))['sideEffects'])"` → `False`.

**Disposition:** BUILD — `V·MT-W-ARCH-5`, whose gate must run against the **built** artifact, which
means it cannot open until A-1 lands (MT-F012 makes the current build application-free). Recorded as
an explicit ordering edge, not a deferral.

### A-7 · MAJOR · One module, two execution lifetimes; the build depends on app internals
**From:** L-3 (cure replaced — see A-1)
**Bytes (mine):** `vite.config.ts:15` imports `injectGroundTokens` from
`./demo/color-picker/composables/boot/ground`. `ground.ts` is 146 lines carrying a browser runtime
contract and a node build-time HTML transform.
**Status:** UPHELD_BY_BYTES. **Disposition:** BUILD — `V·MT-W-ARCH-1`, by **deletion** (canon §6.2),
not relocation.

### A-8 · MAJOR · The shell owns the landmark half of a contract and none of the identity half
**Merges:** D-4, C-4, D-11
**Bytes (mine, live, three routes at 1440×900):**
```
$ node <scratchpad>/j2-arch.mjs
/#/            h1=0 h1InMain=0 main=1 skip=0 polite=0
/#/generate    h1=0 h1InMain=0 main=1 skip=0 polite=0
/#/admin/users h1=0 h1InMain=0 main=1 skip=0 polite=0
$ grep -rln '<h1' demo/                    → (no output)
```
Corroborated by the tracked matrix (`audit/visual/REPORT.md`, `h1` column = 0 across all 60
captures). `VISUAL-CONSTITUTION.md:85`: *"Each route has one H1 and exactly one stable main
landmark, **owned by the shell**"*; `:118`: *"The shell `<main>` and route H1 are stable nodes"*.
Four of the seven rows of the §5.1 focus table resolve to "destination H1" — a node that does not
exist. D-11 is the same hole seen from the router: `router/index.ts:37` redirects unknown routes to
`/` with no polite status (`politeStatus: 0`, measured) and no H1 to focus, and `REPORT.md:133` vs
`:119` shows `/#/does-not-exist` and `/#/` at byte-identical text length `859`.
**Status:** UPHELD_REPRODUCED. **Disposition:** BUILD — `V·MT-W-ARCH-3`. One source, three sinks:
`router/useDocumentTitle.ts:62` already composes the route identity; it feeds `<title>`, the `<h1>`,
and the redirect status.

### A-9 · MAJOR · Domain accretion at the shell root
**From:** D-14
**Bytes:** `App.vue:152-157` mounts `MigratePalettesDialog` unconditionally as a permanent shell
child. `VISUAL-CONSTITUTION.md:224`: recovery *"is **never** rendered as an empty library, silent
reset, **migration choice**, **overlay**, or companion pane"* — this mount is two of the five named
prohibitions at once. Edict 1: the shell owns landmarks and routing, not the palette domain's
recovery flow.
**Status:** UPHELD_BY_BYTES. **Disposition:** FOLD → **W22** (OPTICAL-BENCH §4, "Unsupported/corrupt
storage recovery … W15 owns detection/export/reset semantics; W22 owns the rendered recovery
composition"), row id `D-14` preserved. The **shell-side deletion** (the mount at `App.vue:152-157`
and the `../palettes/browser/dialog` barrel import at `:176`) is BUILD in `V·MT-W-ARCH-3` — the
shell may stop mounting it before W22 authors the article, because A-9's defect is the *mount*.

### A-10 · MAJOR · Ambient motion has no lifecycle seam
**From:** D-5
**Bytes:** measured sustained rAF at t=8.5s→14.6s: 261.0/s desktop-light, 284.0/s desktop-dark,
259.5/s mobile-390 (D's `probe-overture.mjs`). `grep -rniE "animation-play-state|pauseAnim|isPaused"
demo/` → empty. `VISUAL-CONSTITUTION.md:145` requires termination within five seconds **or** one
persistent, announced, remembered still/pause control. Neither arm is satisfied; the reduced-motion
arm is (`rafPer1500ms: 0`), but an OS preference is not the control §6 demands.
**Status:** UPHELD_REPRODUCED. **Disposition:** BUILD — `V·MT-W-ARCH-3`. The control gates **both**
renderers through the `OVERTURE_KEY` beats `App.vue:297` already provides, so "paused" tears the rAF
loops down rather than zeroing opacity (§6: *"Paused, parked and offscreen mean no animation work"*).

### A-11 · MAJOR · Success-only beat DAG — no terminal `unavailable`, no state-checked floor
**Merges:** D-6, C-1's second arm, L-13 (the same undeclared-surface mechanism)
**Bytes (mine):** `useOverture.ts:206-226` — `b3` flips only inside `noteLeftPlateSettled`, whose
only two call sites are `:on-appeared` props (`App.vue:90`, `:109`). The PRM arm (`:195-197`) is the
only other writer. The sibling beat has the floor and the post-mortem (`useDockArrival.ts:58-72`).
B4 gates on `b3Complete && b2` (`:154`) with no failed/unavailable arm. Asymmetrically, the aurora
canvas has a context-loss contract (`useAtmosphere.ts:288,298,301`) and those are the **only**
`webglcontextlost` matches in the tree; the blob has none — so the headline interval reserves ~230
CSS px for an ornament that may never arrive (`REPORT.md:119` `canvas=1`, `consoleErr=1` "WebGL:
context lost", settle 18905 ms, vs `:134` `canvas=2`, settle 3515 ms — same route, same viewport
class, different scheme).
L-13 is the same mechanism at the type level: `useAtmosphereBoot` returns
`{ auroraCssGradient, auroraArrived }` while silently `provide`-ing three keys, so the owner of a
watcher is discoverable only from prose — and the prose has drifted (`grep -c "watch(" App.vue` → 0,
while `BlobPane.vue:9` and `aurora-atoms.ts:16-18` both cite "App.vue's watch").
**Status:** UPHELD_REPRODUCED (D-6's four observations; C-1's marks).
**Disposition:** BUILD — `V·MT-W-ARCH-4`.

### H-1 · HYPOTHESIS · Forced colors
**From:** D-15, self-labelled. WebKit does not honour Playwright's `forcedColors` emulation, so
`shots/forced-colors-desktop/picker.png` proves nothing. The admissible source fact stands:
`foundation.css:678` has one `@media (forced-colors: active)` block and none of the shell's
selectors appear in it.
**Status:** HYPOTHESIS. **Disposition:** BUILD **as a measurement**, not as a cure —
`ENGINE=chromium node docs/tranches/V/megatranche/audit/visual/states.mjs` is a π obligation of
`V·MT-W-ARCH-3`. If it confirms, the shell's surfaces join the `foundation.css:678` roster in the
same wave; if it refutes, the row RETIREs with the capture as its rationale.

### Minors, each disposed
| id | defect | status | disposition |
|---|---|---|---|
| L-9 | 195-line global-keyframes sheet inside `composables/` (edict 6) | UPHELD_BY_BYTES | BUILD `W-ARCH-1` — `git mv` to `demo/styles/overture.css` + one `@import` in `foundation.css`; a **move, never a deletion** |
| L-10 | `picker-shell` — a class applied once, defined nowhere (`grep` → 1 hit, the consumer) | UPHELD_BY_BYTES | BUILD `W-ARCH-3` — dies with `usePaneRouter.leftProps` |
| L-11 | root-barrel `useClipboard` while `/dom` is used one line below (`dist/composables/dom/index.d.ts:6`) | UPHELD_BY_BYTES | BUILD `W-ARCH-1` — App's import block is rewritten there |
| L-12 | two owners of "read the colour out of the URL"; `appliedFromUrl` is a dead conjunct — **verified by me**: both readers require *both* `space` and `color` (`hydrate.ts:56-60`, `useColorUrl.ts:26-29`), so `appliedFromUrl ⟹ source==="url"`, and `App.vue:378` already gates on the latter | UPHELD_BY_BYTES | BUILD `W-ARCH-1` — `hydrate.ts` deletes outright |
| L-13 | ownership in prose, drifted (`grep -c "watch(" App.vue` → 0) | UPHELD_BY_BYTES | FOLD → A-11 / `W-ARCH-4` |
| L-14 | local `useLayerTransition` + a `void opts.containerEl` parity shim (edicts 2+4) | UPHELD_BY_BYTES · **cure REPLACED** | BUILD `W-ARCH-2` |
| L-15 | `demo/color-picker/` is the entry, `demo/picker/` is the feature — the name signals the inverse | UPHELD_BY_BYTES (INFO) | BUILD `W-ARCH-1` — rename to `demo/app/`; `main.ts` lands there anyway |
| C-5 | type-only import not `import type` (edict 8) | UPHELD_BY_BYTES · rationale dismissed | BUILD `W-ARCH-2` — cured by **deletion** |
| C-6 | booked residual resting on a contradicted manifest fact | UPHELD_BY_BYTES | BUILD `W-ARCH-1` — the comment deletes with the import block |
| C-7 | every boot rewrites the address bar; `useColorPipeline.ts:50-52` clamps unconditionally | UPHELD_REPRODUCED | BUILD `W-ARCH-1` |
| C-9 | zero tests mount `App.vue`; O-4 only visits `/` — vacuous gates | UPHELD_BY_BYTES (INFO) | BUILD `W-ARCH-4` — parametrise O-4 over `/#/gradient` |

> **L-14's cure is REPLACED, and this is the row FORMATION-LAW L-4 was written about.** The local
> comment says glass-ui *"offers no public composable successor"* and proposes a relay. But a
> **component** successor is exported today:
> ```
> $ grep -n "DockCrossfade" node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts
> 5:export { default as DockCrossfade } from "./DockCrossfade.vue";
> ```
> MT-F013 already records this as a bank that rotted into a live dual path — *"Glass shipped
> `DockCrossfade` in the very version we adopted; nobody re-evaluated"*. The cure is therefore
> **compose `<DockCrossfade>` and delete the local shim**, in `W-ARCH-2`, not relay for a composable
> that will never come. Do not re-bank this row.

### Dismissed outright
| id | dismissed claim | refuting bytes |
|---|---|---|
| D-9 (cure arm) | `class="relative"` on `<body>` is dead weight and must be deleted | `j2-body.mjs`: `absoluteBodyChildren: 1` — one `position:absolute` direct child of `<body>` uses it as its containing block. `atmosphereCanvasOffsetParent: "app-layout"` confirms only the *canvas* is independent of it. |
| D-9 (cure arm) | `data-paper-field` moves onto `.app-layout` | `index.html:216-224` + `j2-body.mjs` `bodyChildren`: the portalled dialogs are `.app-layout`'s **siblings** (4 of 6 body children), so the stamp would stop dominating them and the producer's orphan-card field-floor would re-arm for every dialog. |
| C-8 (arms a,b) | App.vue must own a single root carrying its own field stamp and positioning | same two rows. RETIRED with rationale; arm (c) upheld into A-1. |
| L-3 (cure) | move `injectGroundTokens` into `plugins/` | `VISUAL-CONSTITUTION.md` §6.2: *"`groundRecordInject`, `__GROUND_*__` … all die in the same cut"* and *"no … build-time token injection"*. Relocation preserves a retired mechanism. |
| L-6 (evidence) | `totalEagerModules: 238` on the dev server proves a bundle defect | FORMATION-LAW L-12; the dev server serves unbundled ESM, so the count is a module count, not a chunk property. The static/structural half is upheld separately. |
| C-5 (rationale) | the un-`type`d import drags the picker into App's eager chunk | `usePaneRouter.ts:21` imports `ColorPicker` as a runtime value; `App.vue:187` imports `usePaneRouter`. Eager either way. |
| L-14 (cure) | relay to glass-ui for a public content-swap composable | `dist/components/dock/index.d.ts:5` exports `DockCrossfade` at 7.0.0 — the successor already shipped (MT-F013). |

---

## 2. Concept ownership — the isomorphism table

Every concept `App.vue` touches, its owner today, and its right owner. This is the seat's product.

| Concept | Owner today | Right owner | Why |
|---|---|---|---|
| composition root (createApp, plugin installs, DI installs, CSS root) | `index.html:205-213` inline module **+** `App.vue:214,219,199-210` | `demo/app/main.ts` | a component cannot express a composition root; today's contract is ordering convention in a comment |
| mount container | `<body id="app">` — also the portal host | `<div id="app">` inside `<body class="relative" data-paper-field>` | one node cannot be both the mount container (whose children `mount()` clears) and the portal host |
| frame-zero scheme + ground | inline `<script>` + build-injected `__GROUND_*__` | `demo/app/prepaint.js` — external classic, zero injection | canon §6.2 + CSP `script-src 'self'` |
| ground constants for build injection | `boot/ground.ts` (two lifetimes) via `vite.config.ts:15` | **nobody — deleted** | canon §6.2 retires the mechanism, not just its location |
| first colour value | `boot/hydrate.ts` (TS precedence) **and** the prepaint script (JS precedence) | the frozen `window.__VALUE_GROUND_BOOT__`, consumed once | §6.2: *"does not repeat scheme/URL/storage precedence"* |
| live URL↔model sync | `useColorUrl` (plus a dead boot-time read) | `useColorUrl`, live sync only | one owner per phase (L-12) |
| route table | `router/index.ts` (14 literals) | derived from `viewSchema.VIEW_MAP` | one lattice |
| view→component | `usePaneRouter.componentFor` (10-arm chain + catch-all) | `viewSchema` `PaneConfig.scene`, closed-union `Record` | exhaustiveness becomes a type error |
| unknown route | `useViewManager` `?? "picker"` **and** router catch-all | the router alone, announced | a masking fallback is not a state |
| region housing: ratio · collapse · empty-secondary · reserve · boundary · action | `shell.css` + `App.vue` `v-if` + ghost slot | glass-ui `InstrumentChassis` | the producer ships all six; the clone gets all six wrong |
| which pane is mounted | `currentConfig.left` **and** `PaneSlot.liveKey` | nobody — the question stops existing | panes publish; the shell never asks |
| dock action metadata + handlers | `usePaneRouter:188-228` (9 duck-typed reaches) | each workbench, via `ACTION_BAR_KEY` | the edge must point down |
| palette ports | `usePalettePorts` — 15 composables at the root | 3 scoped providers (`main.ts` / `BrowsePane` / `AdminPane`) | provide-scope = use-scope |
| route identity (`<title>`, `<h1>`, redirect status) | `<title>` only | the shell, from `useDocumentTitle`'s one source | §4.1: *"owned by the shell"* |
| scroll | the shell (`overflow: hidden`) | the document | §3 law 6 |
| ambient-motion lifecycle | nobody (start-only) | the shell, gating `OVERTURE_KEY` | §6 |
| beat terminality (`unavailable`, floors) | nobody | `useOverture` | a gate with only a success edge cannot say "it is not coming" |
| storage recovery | `App.vue:152-157` (an overlay at the shell root) | the Library scene, inside `<main>` | §7 + edict 1 |
| global keyframes | `composables/boot/overture.css` | `demo/styles/overture.css` | edict 6 |

---

## 3. The target lattice — what exists afterward, what each owns, which edges are legal

```
demo/
  app/                          ← RENAMED from color-picker/ (L-15). THE ENTRY, and only that.
    index.html                  <head>: critical ground CSS using --ground-seed-token-{light,dark}
                                        <script src="./prepaint.js"></script>          classic, external
                                        <script type="module" src="./main.ts"></script>
                                <body class="relative" data-paper-field>
                                  <div id="app"></div>
                                  <div id="boot-error" hidden>…§6.2 static semantic region…</div>
                                </body>
                                ZERO inline executable script. ZERO __GROUND_*__ tokens.
    prepaint.js                 the §6.2 frame-zero latch: scheme resolution, seed selection,
                                data-ground-state / -schema / -store, freezes __VALUE_GROUND_BOOT__.
                                No import, no eval, no build-time injection. CSP-clean.
    main.ts                     THE COMPOSITION ROOT — twelve readable lines:
                                  import "../styles/foundation.css"        (the ONE sheet)
                                  initGlobalDark()
                                  const app = createApp(App, { boot: window.__VALUE_GROUND_BOOT__ })
                                  app.use(router)
                                  await router.isReady()                   ← kills C-1 outright
                                  app.provide(API_CLIENT_KEY, createApiClient())
                                  app.provide(SESSION_PORTS_KEY, createSessionPorts())
                                  app.mount("#app")
    App.vue                     ~110 lines. THE SHELL, and nothing else:
                                  <a class="skip-link" href="#route-main">   (first tabbable)
                                  <canvas class="atmosphere-canvas" …>
                                  <nav class="dock-band"><Dock/></nav>
                                  <main id="route-main" tabindex="-1">
                                    <h1>{{ routeIdentity }}</h1>
                                    <p role="status" aria-live="polite">{{ routeStatus }}</p>
                                    <ErrorBoundary><RouteScene/></ErrorBoundary>
                                  </main>
                                OWNS: landmarks · route identity · focus seat · polite status ·
                                      error boundary · canvas mount · OVERTURE_KEY provide ·
                                      the ambient still/pause control.
                                OWNS NOT: grid CSS · breakpoints · pane instance refs ·
                                      domain dialogs · CSS imports · app-level installs ·
                                      URL/storage precedence.
    router.ts                   routes DERIVED from shell/viewSchema. No literals. No meta.admin.

  shell/                        THE FRAME — one home for every shell concern
    viewSchema.ts               THE ONE LATTICE. Each row: { path, title, proportion,
                                  scene: () => Promise<Component> }. Routes, scene resolution and
                                  dock metadata all read here; adding a view is one edit.
    RouteScene.vue              the single-scene mount: <component :is> + KeepAlive + Transition.
                                  No breakpoint. No left/right. No :on-mount.
    actionBar.ts                ACTION_BAR_KEY + useProvidedActionBar() — panes publish, shell injects
    useViewManager.ts           route → ViewId. No `?? "picker"`.
    ErrorBoundary.vue           (moved from the entry)
    dock/                       ActionBarLayer composes <DockCrossfade> — local shim deleted
    boot/                       (moved from color-picker/composables/boot/)
      useOverture.ts            beats carry terminal arms + state-checked floors
      useDockArrival.ts  useAtmosphereBoot.ts  useAtmosphere.ts  useViewAccents.ts
      view-accents.ts  atmosphere-calibration.ts
      useDevicePixelSnap.ts  usePaletteWiring.ts  (reduced to the one cross-cutting logout rule)

  workbenches/<x>/<X>Pane.vue   composes <InstrumentChassis :proportion="…"> with #stage /
                                  #inspector / #action, and calls useProvidedActionBar() naming
                                  its own handlers in its own file.
  palettes/
    ports/session.ts            always-on   → provided by main.ts
    ports/browse.ts             → provided by BrowsePane.vue   (already an async boundary)
    ports/admin.ts              → provided by AdminPane.vue    (already an async boundary)
    PalettesPane.vue            owns the §7 recovery article inside <main>
  styles/
    foundation.css              THE barrel; one @source glob; + @import "./overture.css"
    overture.css                (moved, never deleted — edict 6); role-keyed delay tokens
    shell.css                   band grid only. min-height:100dvh + sticky row 1.
                                NO grid-template-columns for the scene.

plugins/
    vite-source-export.ts  vite-defer-glass-fonts.ts
    (no ground-token plugin; vite.config.ts imports nothing under demo/)
```

### The dependency law — stated so it can be linted

```
plugins/          →  (nothing under demo/)                  today VIOLATED: vite.config.ts:15
demo/app/         →  demo/shell/, demo/styles/              the entry knows the frame
demo/shell/       →  glass-ui subpaths, demo/shared/        never a feature's internals
feature trees     →  demo/shell/actionBar.ts (publish only), glass-ui/<subpath>,
                     @mkbabb/value.js/<subpath>, demo/shared/
feature ⇢ shell   :  FORBIDDEN except by publishing to a declared InjectionKey
any → glass-ui root barrel : FORBIDDEN — subpaths only     today VIOLATED: App.vue:191
```

### Deletions, named explicitly (edict 2: clean breaks, no shims, no dual paths)

**Files deleted outright**
1. `demo/shell/PaneSegmentedControl.vue` (52 L) — the global pane selector §4.2 retires by name
2. `demo/shell/PaneSlot.vue` (129 L) — superseded by `RouteScene.vue`; its `onMount` seam is the A-2 mechanism
3. `demo/color-picker/composables/boot/hydrate.ts` (130 L) — the second precedence engine (§6.2)
4. `demo/color-picker/composables/boot/ground.ts` (146 L) — `groundRecordInject`/`__GROUND_*__` die (§6.2)

**Symbols and blocks deleted**
5. `usePaneRouter.componentFor` (`:81-95`) — 10-arm chain **and** its `return ColorPicker` catch-all
6. `usePaneRouter` `actionBar` computed (`:188-228`, 40 L) + `PaneActionRefs` + all 9 duck-typed reaches
7. `useViewManager.ts:43-46` `isViewId(name) ? name : "picker"` — the masking fallback
8. `useViewManager` `mobilePaneIndex` + `paneOverride` (`:59-70`) — the retired left/right view state
9. `router/index.ts` 14 literal route rows + `meta: { admin: true }` ×5 (0 consumers, measured)
10. `App.vue:317-319` three `ref<any>` + `:323-332` both `onDesktop*Mount` + `:347` the `paneRefs` argument
11. `App.vue:223` `colorPickerRef` and `:164` the `ColorPicker` import (C-5 dies by deletion)
12. `App.vue:41-42` the two-statement template handlers with the magic index `1`
13. `App.vue:199-210` all four CSS imports; `:214` `useGlobalDark()`; `:219` `provideApiClient()`
14. `App.vue:152-157` the `MigratePalettesDialog` mount + `:176` the `dialog/` barrel import
15. `App.vue:168-175` the ten-line rationale resting on `sideEffects: "./demo/**"` (measured `false`)
16. `App.vue:403-409` the `.pane-wrapper--ghost` scoped block
17. `shell.css` `.pane-container`, `.pane-container--dual`, `.pane-wrapper--left/--right`, the three `[data-layout]` display witnesses, `.dock-mobile-panes`
18. `overture.css:18-19` `--overture-left-delay` / `--overture-right-delay` → one role-keyed token
19. `usePaneRouter.ts:134` the `picker-shell` class token
20. `ActionBarLayer.vue:54-82` the local `useLayerTransition` incl. `void opts.containerEl`
21. `useColorUrl.ts:70` the boot-time `applyUrlToModel()` + the `appliedFromUrl` return
22. `vite.config.ts:15` + `:150-155` the `groundRecordInject` plugin and its import
23. `index.html:102-106,113,177-196` every `__GROUND_*__` token site

**God modules killed, by measurement**
- `usePaneRouter.ts` — 231 L, four concerns (component registry · prop assembly · slot projection ·
  dock action metadata; its own header boasts of folding `useGenericActionBar` in). Dissolved:
  registry+props → `viewSchema`; slots → `RouteScene`; actions → the panes. **File deleted.**
- `usePalettePorts.ts` — 275 L, 15 composables at one scope. Split three ways by lifetime.
- `App.vue` — 417 L, twelve concerns → ~110 L, four.

---

## 4. THE WAVE — `V·MT-W-ARCH-1` · The composition root and the one route lattice

Chosen by the FORMATION-LAW L-1 test — *"if this were the only wave that ever executed, would the
tree be better and would the wave be closed?"* — **yes**: it cures MT-F012's P0 (the production
bundle has had no application in it), C-1's session-killing BLOCKER on 10 of 14 routes, the
build→app-internals edge, and the three-table route lattice. Every other wave in §5 is safer after
it and none of them is blocked from being *written* by it.

**BORN: RED.** All eight gates fail against `c654824e`, with the failures pasted below, run by me.

### Gates

**GA-1 — the build configuration imports nothing under `demo/`.**
```
$ grep -c 'from "\./demo/' vite.config.ts ; # required 0
1
  15:import { injectGroundTokens } from "./demo/color-picker/composables/boot/ground";
```
*Product asserted:* the node build graph and the browser runtime graph are disjoint module sets.
*Input that turns it RED:* any `import … from "./demo/…"` in `vite.config.ts`.

**GA-2 — the entry HTML carries zero inline executable script.**
```
$ grep -c '<script>' demo/color-picker/index.html              → 1   # required 0
$ grep -c '<script type="module">' demo/color-picker/index.html → 1   # required 0
$ grep -c '<script type="module" src=' demo/color-picker/index.html → 0   # required 1
$ grep -rn "__GROUND_" demo/ vite.config.ts plugins/ | grep -v node_modules | wc -l → 20  # required 0
```
*Product asserted:* the entry is a module Vite can see and Rolldown cannot drop, and the prepaint
runs under `script-src 'self'` with no build-time token substitution (§6.2).
*Input that turns it RED:* re-inlining either script, or re-introducing a `__GROUND_*__` token.

**GA-3 — the built gh-pages artifact contains the application.** *(the MT-F012 product gate; L-2's
own exemplar — `exit 0` is not a gate)*
```
$ npm run gh-pages && node -e '
   const fs=require("fs"),p="dist/assets";
   const e=fs.readdirSync(p).filter(f=>/^index-.*\.js$/.test(f));
   const big=e.filter(f=>fs.statSync(p+"/"+f).size>50000);
   if(!big.length) { console.error("FAIL: entry chunk is application-free"); process.exit(1); }'
```
*RED today, by committed measurement* (`registry/ROOT-FINDINGS.md:247,495-504`):
```
     698  index-Dezn_h7o.js       ← the ENTRY        BOOTED-marker=NO   ← app code GONE
```
698 bytes, entirely Vite's modulepreload polyfill IIFE, content hash byte-identical to a stock-Vite
inline-entry repro. *Not re-run by this seat* (a full demo build); cited under FORMATION-LAW L-6 as
a committed artifact with pasted output.
*Input that turns it RED:* returning the entry to an inline `<script type="module">`.

**GA-4 — the route table has exactly one home.**
```
$ grep -c 'viewSchema' demo/color-picker/router/index.ts → 0    # required >= 1
$ grep -c 'name: "'    demo/color-picker/router/index.ts → 14   # required 0
$ grep -rn "meta\.admin\|meta?\.admin" demo/             → (no output)   # 5 producers, 0 consumers
```
*Product asserted:* adding a view is one edit; forgetting one is a type error, not a silent picker.
*Input that turns it RED:* a route name literal in `router.ts`, or a `VIEW_MAP` key with no route.

**GA-5 — no masking fallback survives in view resolution.**
```
$ grep -n '? name : "picker"' demo/shell/useViewManager.ts
43:    const currentView = computed<ViewId>(() => {
45:        return isViewId(name) ? name : "picker";
$ grep -n 'return ColorPicker;' demo/shell/usePaneRouter.ts
94:    return ColorPicker;
```
Both required absent. *Product asserted:* an unknown view is a navigation event, never a
substituted render. *Input that turns it RED:* any `?? "picker"` / catch-all `return` in the
resolution path. **Structure, not gate (L-8):** the closed union makes the catch-all unwritable.

**GA-6 — the route is TRUE at first render (the C-1 product gate).**
```
$ node -e '…playwright…' # cold-load /#/gradient, read performance marks + first-mounted scene
```
*RED today*, C's `probe-b3.mjs`, pasted:
```
DEEPLINK /#/generate  marks ["overture:b0","overture:b1","overture:b2"]   blob false
  after hash-nav to /#/   marks unchanged, picker present, blob STILL absent
CONTROL  cold-load /#/  marks ["overture:b0","overture:b1","overture:b3","overture:b2","overture:b4"]  blob true
```
Mechanism verified in bytes by me (`useOverture.ts:206` + its only two call sites `App.vue:90,109`).
*Product asserted:* the first-mounted scene equals the final scene on every route, and `overture:b4`
fires on all fourteen. *Input that turns it RED:* removing `await router.isReady()` from `main.ts`.

**GA-7 — one precedence engine, one URL reader.**
```
$ test -f demo/color-picker/composables/boot/hydrate.ts && echo PRESENT   → PRESENT   # required absent
$ grep -n 'const appliedFromUrl' demo/color-session/useColorUrl.ts        → 70        # required absent
```
*Product asserted:* the app consumes the frozen `__VALUE_GROUND_BOOT__` and never re-derives
URL→storage→default in TypeScript (§6.2), and `useColorUrl` owns the live sync only.
*Input that turns it RED:* a second reader of `space`/`color` at boot.

**GA-8 — a clean boot does not rewrite the address bar (C-7).**
```
$ node -e '…playwright, fresh context, empty storage, goto /#/generate, read location.href…'
```
*RED today*, C's measurement, pasted: settles at
`http://localhost:9000/#/generate?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` with empty
localStorage and a bare hash. Mechanism: `useColorPipeline.ts:50-52` re-assigns `model.value`
unconditionally for the domain clamp, and the identity-based watcher at `useColorUrl.ts:79-82`
`router.replace`s it.
*Product asserted:* `location.href` after a clean boot equals the href requested.
*Input that turns it RED:* any identity-changing model write during setup.

### π obligations (FORMATION-LAW L-7 — committed witnesses)
| # | matrix | route | selector | committed capture path |
|---|---|---|---|---|
| π-1 | `safari-desktop-light` 1440×900 | `/#/gradient` cold | `.hero-blob-anchor`, `performance.getEntriesByType("mark")` | `audit/visual/shots/arch1-deeplink-gradient/{before,after}.png` |
| π-2 | `safari-mobile-light` 390×844 | `/#/browse` cold | `.hero-blob-anchor` | `audit/visual/shots/arch1-deeplink-browse/{before,after}.png` |
| π-3 | built artifact (**not** the dev server — L-12) | `dist/index.html` | `<script type="module" src>` + entry chunk size | `audit/probes/arch1-entry-manifest.txt` |
| π-4 | `safari-desktop-light` | `/#/does-not-exist` | `location.href`, `document.title` | `audit/visual/shots/arch1-404/{before,after}.png` |
All four force-added past `.gitignore:34 *.png`, or the claim is not made.

### DELTA obligations
1. **Deep-link overture** — `/#/gradient` marks `[b0,b1,b2]` + no blob → `[b0,b1,b3,b2,b4]` + blob
   present. *Named delta:* timing/mount — the first-mounted scene changes from `ColorPicker` to
   `GradientPane`, so the `appear` transition completes instead of being cancelled.
2. **Entry chunk** — `index-Dezn_h7o.js` 698 B, `BOOTED-marker=NO` → an entry chunk >50 KB whose
   graph reaches `App.vue`. *Named delta:* the artifact contains the application.
3. **Address bar** — `/#/generate` → `/#/generate?space=lab&color=…` on a clean boot →
   `/#/generate` unchanged. *Named delta:* zero `router.replace` during setup.
4. **404** — `/#/does-not-exist` renders text length 859 identical to `/#/` with no announcement →
   destination title + one polite status naming the redirect. *Named delta:* announcement, not
   geometry. *(the H1 half lands in `W-ARCH-3`; this wave delivers the status region's writer.)*

### ENV and what it cannot see (FORMATION-LAW L-12)
GA-1/2/4/5/7 are static reads of the working tree — blind to runtime behaviour.
GA-6/GA-8 run against the vite dev server at `:9000` — **structurally blind to every bundle
property**, which is precisely why GA-3 exists and runs against `dist/`.
GA-3 runs against the built artifact — blind to dev-only transition behaviour (`PaneSlot.vue:12-23`
records a real dev-vs-build divergence in this exact area, so neither environment may stand alone).

### COMPLETABLE (the L-1 one-wave test, answered)
Yes. Files touched: `demo/app/{index.html,prepaint.js,main.ts,router.ts,App.vue}` (renamed tree),
`demo/shell/useViewManager.ts`, `demo/shell/viewSchema.ts`, `demo/color-session/useColorUrl.ts`,
`demo/color-session/useColorPipeline.ts`, `vite.config.ts`, `demo/styles/{foundation,overture}.css`,
plus four deletions. No other wave must land first. The tree is strictly better if this is the only
wave that ever runs: the production deploy stops shipping an empty page.

### CARRIES
`L-1 BUILD` · `L-2 BUILD` · `L-3 BUILD (cure replaced)` · `L-4 BUILD` · `L-5 BUILD` ·
`L-9 BUILD` · `L-11 BUILD` · `L-12 BUILD` · `L-15 BUILD` · `C-1 BUILD` · `C-6 BUILD` ·
`C-7 BUILD` · `C-8 (arm c) BUILD, arms a+b RETIRE` · `D-9 BUILD (cure corrected)` ·
`MT-F012 BUILD (this wave is its cure)`.

### BANKS (each with a runnable re-trigger — FORMATION-LAW L-4)
| bank | re-trigger command |
|---|---|
| the §6.2 `SeedToken` grammar/diagnostics/invalid-default arm is **not** in this wave | `grep -c 'data-ground-state' demo/app/prepaint.js` — when 0, the latch wave has not run |
| `demo/DESIGN.md` cites `demo/@/styles/style.css`, stranded by the W43 rename | `grep -c '@/styles/style.css' demo/DESIGN.md` → non-zero means still stranded |

---

## 5. The sibling waves — named, so nothing is re-booked

Each is individually completable and born RED. I author their identity and gates; I do not
author their bodies (that is the next seat's work, and L-1 forbids me from pretending otherwise).

| wave | defects | born-RED gate, RED today |
|---|---|---|
| `V·MT-W-ARCH-2` — **invert the action-bar edge** | A-2 (D-1, C-2, C-3, D-13, L-8), C-5, L-14 | `grep -c 'ref<any>' demo/app/App.vue` → **3**; `grep -c 'paneRefs\.[a-z]*\.value?\.' demo/shell/usePaneRouter.ts` → **9**; `grep -c useLayerTransition demo/shell/dock/layers/ActionBarLayer.vue` → **≥1**. Product: renaming `regenerate` in `GeneratePane.vue` is a compile error, not a dead button. |
| `V·MT-W-ARCH-3` — **the single-scene shell** | A-3 shell half, A-4, A-8 (D-4/C-4/D-11), A-9 shell half, A-10, D-15 measurement, L-10 | `grep -n 'grid-template-columns' demo/styles/shell.css` → **`:61`, `:137`**; `node j2-arch.mjs` → `share=50% delta=11.80pp FAIL`, `h1=0 skip=0 polite=0 chassis=0 FAIL` on all three routes. |
| `V·MT-W-ARCH-4` — **terminal beats** | A-11 (D-6, C-1 arm 2, L-13), C-9 | `grep -c 'goto("/")' e2e/smoke/oracles/o4-order-invariance.spec.ts` → **1** and no non-picker-left route; B3 has one arming path (`grep -rn noteLeftPlateSettled demo/` → 2 call sites, both `:on-appeared`). |
| `V·MT-W-ARCH-5` — **DI scope = use scope** | A-6 (L-6, L-7) | `grep -c "^import { use" demo/palettes/usePalettePorts.ts` → **15**. Product gate runs against `dist/` chunk membership — **opens only after `W-ARCH-1`**, because today's build has no application in it to measure. |
| **FOLD → W18/W19/W24/W26/W27** | A-3's eleven member compositions (D-2's per-route rows), each `<InstrumentChassis>` with its bound `proportion` | owned by `OPTICAL-BENCH-COMPOSITIONS.md` §6 by name; row ids `D-2`, `D-3`, `D-7`, `D-10`, `D-12` preserved verbatim |
| **FOLD → W22** | A-9's recovery article (`D-14`) | `VISUAL-CONSTITUTION.md:224` + OPTICAL-BENCH §4 assign W22 the rendered composition |

---

## 6. Answer to the seat's question

> *What does `App.vue` assume about how it is mounted, and would a correct entry make any of that
> assumption unnecessary?*

Seven assumptions. A correct entry dissolves **five**, makes the sixth expressible, and reduces the
seventh to its irreducible core:

| # | assumption | after `main.ts` + `<div id="app">` |
|---|---|---|
| 1 | `app.use(router)` already ran | **dissolved** — one declared line |
| 2 | the route may not be resolved yet, and my beat DAG will survive that | **dissolved** — `await router.isReady()`; C-1's BLOCKER dies |
| 3 | I am the CSS document root | **dissolved** — one `import` in `main.ts` |
| 4 | I am the only component that will ever run `useGlobalDark()` + `provideApiClient()`, and I run before `Dock` | **dissolved** — app-level DI at app level, mount-order-independent |
| 5 | URL→storage→default precedence must be re-run in TypeScript | **dissolved** — `createApp(App, { boot })` hands over the frozen object; `hydrate.ts` deletes |
| 6 | my container is `<body>` | **expressible** — you cannot give Vue its own container while `mount()` lives inside the HTML that declares the body |
| 7 | a pre-module guard already stamped the scheme and the ground | **irreducible, but narrowed** — §6.2 makes it an *external classic* script with no build-time injection, so the logic is mirrored once and every value it compares against is a CSS custom property both sides read |

And one it does **not** dissolve, which is where the challengers over-reached: `class="relative"` and
`data-paper-field` correctly stay on `<body>`, because the portal hosts are the app root's siblings —
measured, one `position:absolute` body child, four portal hosts. The correct cut is exactly one
attribute wide.

---

## 7. Dissent

**Against CHALLENGE-D, on shape.** D's gestalt — *"every finding except D-5, D-6, D-9 and D-14 is a
consequence of one premise, which is why the cure is a transposition"* — is right about the premise
and wrong about the unit. Eleven member compositions is an arc. FORMATION-LAW L-1 exists because
this repository has shipped 380 of 1,005 commitments (38%), and the standing 193-wave formation sits
at 2%. Authoring "transpose the shell onto InstrumentChassis" as one wave would produce the
thirteenth arc wearing a wave's name. The shell half is one wave; the members are the canon's
already-named waves. I hold this against D and expect JUROR-3 to weigh it.

**Against CHALLENGE-L, on evidence discipline.** L's strongest structural finding (A-6) is measured
with an instrument that is structurally blind to the property claimed — dev-server resource counts as
a bundle claim. The finding survives on its static half, but the number does not, and a wave that
inherited "238 eager modules" as its baseline would author a gate it cannot make RED against `dist/`.
FORMATION-LAW L-12 is not decoration.

**Against CHALLENGE-C, on scope.** C's ordering (`main.ts` first) is correct and I adopt it. But C-8
concludes *"a correct entry fixes C-1 outright but does NOT fix C-8"* and then proposes a cure that
my measurement refutes on two of its three arms. The split root contract is real; two thirds of the
split are **correct**, and a wave executing C-8 verbatim would break the portalled dialogs' field
contract and one absolutely-positioned portal host. Recorded as a dissent because C-8 and D-9 agree
with each other and both are wrong.

**No dissent on severity.** All three challengers found real defects on their axis, and the two
BLOCKERs (A-1's C-1 arm, A-2) reproduce. The premise of guilt was, this time, correct.

---

*Report: `docs/tranches/V/megatranche/audit/components/App/jury-2-architecture.md`*
*Seat: JUROR-2 (architecture and isomorphism) · subject `demo/color-picker/App.vue` · `tranche-u` / `c654824e`*
*Probes (read-only, scratchpad): `j2-arch.mjs` (proportion · h1 · landmark · chassis census, 3 routes @1440×900), `j2-body.mjs` (mount-host / portal-host adjudication).*
*No source edit landed from this seat. All writes confined to this directory.*
