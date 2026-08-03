# CHALLENGE-C — `demo/workbenches/extract/ExtractControls.vue` — implementation (pass 4)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit declaration this seat was spawned with. The seat is **declared, not inherited**.

---

## Pin verification

```
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
$ wc -l demo/workbenches/extract/ExtractControls.vue
     151 demo/workbenches/extract/ExtractControls.vue
```

**MATCHES** the glass BJ W4 hold pin byte-for-byte. Consumer edits are FORBIDDEN until Glass 8.
**No source edits land from this seat.** Every artefact I wrote lives under
`docs/tranches/V/megatranche/audit/components/wb-extract-controls/`.

## Relationship to passes 1–3

All three prior passes are preserved verbatim and **carried forward whole**; nothing below retracts
anything above.

| pass | file | status |
|---|---|---|
| 1 | `challenge-C-implementation.pass-1-2026-07-28-prior.md` | superseded by 2/3, C-1..C-11 not retracted |
| 2 | `challenge-C-implementation.pass-2-2026-07-28-prior.md` | C2-1..C2-13 stand |
| 3 | `challenge-C-implementation.pass-3-2026-07-29-prior.md` | XC-1..XC-13 stand |

Pass 4 is **strictly additive and strictly new**. I deliberately did not re-litigate the `inset`
ring (XC-1), the unbound `disabled` (XC-2/C-1), the camera leak (XC-3/C2-1), the debounce double
dispatch (XC-7/C2-3), the orphan labels (XC-9/C-5), or the nameless DockControls (XC-4/C-6). This
pass went after the **runtime lifecycle and the CSSOM write path** — surfaces no prior pass
instrumented — and it found the component doing measurable work for pixels that do not exist, and
a degenerate branch that paints nothing at all.

Four findings are new: **XC4-1, XC4-2, XC4-3, XC4-4**. Two hypotheses I raised were **disproved by
my own measurement** and are recorded as negatives (§*Disproved*), because a challenge seat that
only reports its hits is not measuring, it is arguing.

## Verdict

**DEFECTIVE.** One BLOCKER, two MAJOR, one MINOR new this pass, on top of thirty-seven prior findings.

The governing observation of pass 3 was that this file's comments are a specification its code does
not implement. Pass 4's is narrower and, I think, sharper: **this component has no idea when it is
being looked at.** It cannot tell the developed state from the empty one when it decides what to
paint, it cannot tell a live pick from no pick without painting nothing, and it cannot tell that it
has been unmounted from the document — it keeps re-serialising 17 KB of CSS per second into an
element that `isConnected === false`.

---

## XC4-1 · MAJOR — the KeepAlive-parked component keeps re-rendering while **detached from the document**: 225 CSSOM writes, 100% of them for pixels that do not exist

**NEW this pass.** Pass 2's C2-1 discovered that the pane is `KeepAlive`-cached (and used it to prove
the camera leak). Nobody asked what the *cached* component does with the rest of its life.

**The mechanism.** `demo/shell/PaneSlot.vue:120` wraps the pane in `<KeepAlive :max="max">`. Vue 3's
`KeepAlive` parks a deactivated subtree by moving it into a **detached storage container** — it does
*not* pause the component's render effect. `ExtractControls.vue:123-125` declares

```js
const trackInk = computed(() =>
    cssColor ? safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR) : "var(--ink-muted)",
);
```

`safeCss` (`demo/color-session/useContrastSafeColor.ts:355-361`) reads `ambient.value` and
`isDark.value` inside the computed, so `trackInk` is a subscriber to **the application's hottest
signal** — the live colour. Signal moves → computed invalidates → the parked component re-renders →
`patchStyle` writes to a node that is not in the document.

**Reproduction — `evidence/pass-4/xc4-probe7-parked-cost.mjs`, output `xc4-probe7-parked-cost.txt`.**
Develop the plate (synthetic 22-colour PNG, k driven to 16), pin the rail node, install a
`MutationObserver` on its `style` attribute, navigate to `/#/`, then drive the picker's L/A/B channel
sliders — i.e. the user is working on a completely different route:

```
=== park state ===
{ "inDocument": false, "isConnected": false }

=== PARKED + DETACHED cost while the user drives the colour on ANOTHER route ===
{
 "windowMs": 9699,
 "styleAttrMutations": 225,
 "ALL_while_detached": true,
 "anyWhileConnected": 0,
 "distinctStyleValues": 75,
 "rendersImplied": 75,
 "writesPerSecond": 23.2,
 "charsRewrittenPerSecond": 17435
}
```

**225 style-attribute mutations. `anyWhileConnected: 0`. Every single write landed on a detached
node.** 75 distinct values over 9.7 s = **7.7 re-renders per second, off-screen, indefinitely.**

Independently reproduced earlier in the pass with a different driver and a different route order
(`evidence/pass-4/xc4-probe1-parked-recompute.mjs` → `xc4-probe1-parked-recompute.txt`):

```
=== AFTER route change to /#/ — is the rail still in the document? ===
{ "railStillInDocument": false, "isConnected": false, "railInDomQuery": false }

=== PARKED-RAIL style mutations while OFF the extract route ===
{ "totalMutations": 144, "anyWhileDetached": 144, "distinctStyles": 48 }
```

144 of 144. Same conclusion, twice, from two independent harnesses.

**The cost.** Pass 2's C2-2 measured `trackInk` at **1.30 ms per evaluation**. At the 7.7 re-renders/s
measured here, that is **≈10 ms of main-thread work per second of colour interaction — burned by a
component the user cannot see, on a route they are not on.** Stated as a bound, not a claim: I
measured the *rate* (7.7/s, 17,435 chars/s of CSSOM serialisation); the 1.30 ms per-evaluation figure
is pass 2's and I did not re-measure it.

**Failure scenario.** Visit `/#/extract` once — the app's own default landing flow reaches it in one
dock click. Return to the picker and drag a channel slider. From then until page unload, every frame
of every colour gesture also certifies an OKLab-guarded ink and re-serialises 752 characters of CSS
into a `<div>` in a detached storage container. Visit all nine `KeepAlive :max` panes and the
application accumulates nine such subscribers. Nothing frees them; `KeepAlive` is doing exactly its
job.

**Mechanism.** The certification is subscribed to a global signal but scoped to a local surface.
There is no activation predicate anywhere in the chain: `useSafeAccentFn` has no notion of visibility,
`trackInk` has no notion of visibility, and `KeepAlive` deliberately preserves reactivity.

**Proposed cure — architectural, not a patch.** Activation is a *pane-host* fact, and `PaneSlot`
already owns it — it is the only thing that knows which pane is live (`liveKey`, `PaneSlot.vue:100`).
The transposition is for the host to `provide()` an `isActive` ref and for the ink instrument to
gate on it, so *every* parked plate stops certifying, not just this one:

```js
// useContrastSafeColor.ts — one gate, all consumers
const active = inject(PANE_ACTIVE_KEY, shallowRef(true));
function safeCss(css, floor) {
    if (!active.value) return lastCertified;   // parked: hold the last certified value
    …
}
```

This is the right cure rather than `onDeactivated`-flag-per-component precisely because it is
*one* place: the defect is not that ExtractControls forgot a hook, it is that the ink instrument has
no concept of an audience. A per-component `onActivated`/`onDeactivated` pair would fix this file and
leave the other eight panes to rediscover it.

---

## XC4-2 · MAJOR — the invariant paint and the variant paint share one style object, and Vue's `patchStyle` does not diff: the 634-char gradient is re-serialised on every tick

**NEW this pass.**

`ExtractControls.vue:22` puts three things in one object:

```html
:style="{ background: gradient, backgroundColor: trackInk, boxShadow: `inset 0 0 0 1.5px ${trackInk}` }"
```

`gradient` is the **quantizer's output** — it changes at most once per 300 ms debounced worker round
trip, and in practice once per image. `trackInk` is **the live colour signal** — it changes at frame
rate. They are bound as one unit.

**Vue does not diff style objects.** `node_modules/@vue/runtime-dom/dist/runtime-dom.cjs.js:445`:

```js
function patchStyle(el, prev, next) {
  …
  for (const key in next) {
    …
    const value = next[key];
    if (value != null) {
      if (!shouldPreserveTextareaResizeStyle(el, key, …)) {
        setStyle(style, key, value);          // ← unconditional
      }
    } …
  }
```

`prev[key]` is consulted only inside `shouldPreserveTextareaResizeStyle`, a `<textarea>`-only special
case. **Every key in the new object is written to the CSSOM on every patch, changed or not.**

**Measured payload — `evidence/pass-4/xc4-probe6-parked-developed.mjs`, developed at k=16:**

```
=== developed rail — payload size ===
{ "k": "16", "gradientLen": 634, "inlineAttrLen": 752 }
```

**Measured write ratio — `xc4-probe7-parked-cost.txt`:** `225 styleAttrMutations / 75
distinctStyleValues` = **exactly 3.0 writes per render**, and the style object has exactly three keys.
The ratio is the proof: all three are written every time, including the 634-character
`linear-gradient(...)` that did not change.

Aggregate: **17,435 characters of CSS text re-serialised per second** (`charsRewrittenPerSecond`),
of which ~84% is a gradient string being rewritten to its own current value.

**Failure scenario.** A user with a developed 16-colour plate drags the hue. Every frame, the browser
re-parses a 634-character gradient — sixteen `oklch()` colour parses per frame — to arrive at the
value it already had. This is the same k-means output being re-lexed 23 times a second.

**Mechanism.** Two paint channels with lifetimes three orders of magnitude apart are welded into one
reactive unit by an object literal. The `:style` object is the coupling.

**Proposed cure — split the lifetimes, which the markup already wants.** The rail is already a
dedicated element whose *only* job is to carry the gradient (pass 2's C2-9 notes it is a hand-rolled
`.slider-track`). Give the two channels two bindings so the hot one cannot drag the cold one:

```html
<div class="… rail-gradient" :style="{ background: gradient }" />
<div class="… rail-ink"      :style="{ backgroundColor: trackInk, boxShadow: … }" />
```

— or, better and simpler, hand `trackInk` to CSS as a custom property (`:style="{ '--rail-ink':
trackInk }"`) and let the stylesheet consume it, so the changing value is one short token write and
the gradient stays where it belongs. Under edict 5 (root-level styling) the custom-property form is
the idiomatic one, and it composes with XC-10's hoist of `--btn-hover-color`.

---

## XC4-3 · BLOCKER — `trackInk`'s degenerate is an **unguarded** `var(--ink-muted)`, and `--ink-muted` has no CSS declaration anywhere: in the no-pick state the rail paints **nothing** — no fill, no ring

**NEW this pass.** This is the strongest defect I found, and it is four characters away from the
`inset` keyword pass 3 named — on the same line's value chain, in the branch pass 3 did not exercise.

**The code.** `ExtractControls.vue:123-125`:

```js
const trackInk = computed(() =>
    cssColor ? safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR) : "var(--ink-muted)",
);
```

The comment two lines above (`:116-117`) calls this "**the degenerate fallback** when no live pick
threads." It is not a fallback. It is a bare token reference.

**`--ink-muted` has no CSS declaration in the repository.** Its sole definition site is a JavaScript
stamp inside a watcher:

```
$ grep -rn -- "--ink-muted:" demo src
$                                        ← no output: zero CSS declarations

$ grep -rn 'setProperty("--ink-muted"' demo src
demo/color-picker/composables/boot/useAtmosphereBoot.ts:103:            document.documentElement.style.setProperty("--ink-muted", css);
```

So before `useAtmosphereBoot`'s watcher runs — or in any tree that does not mount it — `var(--ink-muted)`
is a **guaranteed-invalid** substitution. Per CSS Custom Properties §3, that makes the declaration
*invalid at computed-value time*: the property computes to `unset`, which for the non-inherited
`background-color` is `initial` = **transparent**, and for `box-shadow` is **none**.

**Reproduction — `evidence/pass-4/xc4-probe5-killshot.mjs`, output `xc4-probe5-killshot.txt`.** A
side-by-side A/B in the live cascade: two elements under a host with `--ink-muted: initial` (the
guaranteed-invalid state), one painted with the declarations line 22 emits *as written*, one with the
fallback form this same file uses at line 149:

```
=== B · `--ink-muted` — definition sites and the degenerate's paint ===
{
 "inlineStampOnRoot": "oklch(44.687157993053% 0.003861589952 34.629978305623deg)",
 "DEGENERATE_AS_WRITTEN_line124": {
   "backgroundColor": "rgba(0, 0, 0, 0)",
   "boxShadow": "none"
 },
 "WITH_FALLBACK_as_line149_writes_it": {
   "backgroundColor": "rgb(124, 102, 80)",
   "boxShadow": "rgb(124, 102, 80) 0px 0px 0px 1.5px inset"
 },
 "VERDICT": "RAIL PAINTS NOTHING — no fill, no ring"
}
```

**The file contradicts itself, nine lines apart.** `:149`, in this component's own `<style>` block:

```css
.plate-ink { color: var(--ink-muted, var(--muted-foreground)); }
```

Guarded. And so is every other consumer in the repository — `ExtractWorkbench.vue:291`,
`ImageDropZone.vue:110`, `ConfigSliderPane.vue:202,205`, `ColorComponentDisplay.vue:200,205,211`,
`PaneHeader.vue:123`, `EmptyState.vue:103`, `ColorSpaceSelector.vue:309`. **Ten guarded sites; line
124 is the outlier**, and it is the only one of them that carries a *graphics* obligation rather than
a text one.

**Failure scenario.** The degenerate branch is the *no-live-pick* path, which is precisely the boot
window and precisely the state a first-time visitor sees. In that window the rail is not
de-emphasised — it is **absent**: no fill, no certified hairline, a 24 px transparent hole where the
k control's track should be, with a 12 px thumb floating in it. This is the born-RED blank class the
W44 close cured elsewhere in this tree, reintroduced through an unguarded token.

**Honest scope.** In the snapshot I probed, a live pick *was* threading, so the degenerate was not
taken (`evidence/pass-4/xc4-probe5-killshot.txt` §B-reachability:
`railInlineMentionsInkMuted: false`). What is **measured fact** is (a) the branch exists in the
source, (b) `--ink-muted` has zero CSS declarations, and (c) the declarations that branch emits paint
nothing when the token is unstamped. What I did **not** capture is a live frame in which all three
coincide. I therefore file the *mechanism* as CONFIRMED and the *field occurrence* as unreproduced.

**Proposed cure.** The gestalt cure is not to add a fallback to the template string — it is that
**a raw CSS token has no business being a value in a certified-ink computation.** `trackInk`'s two
branches return incommensurable things: branch one returns a *resolved colour* certified against a
measured surface; branch two returns a *deferred token reference* certified against nothing. The
degenerate belongs in `ink.ts` beside `GRAPHICS_CONTRAST_FLOOR`, as a resolved constant the guard
can actually certify:

```ts
// ink.ts — the degenerate is a colour, not a promise of one
export const MUTED_INK_DEGENERATE = "…";   // certified, resolvable, testable
```

The one-line stopgap, if the wave must be minimal, is `var(--ink-muted, var(--muted-foreground))` —
matching line 149 and the ten other sites. But that only makes this file consistent with itself; it
leaves a token reference inside a value the O-18 census believes it has certified.

---

## XC4-4 · MINOR — one control row, two paint machineries: the kC track eases its certified ink over 200 ms, the k rail snaps

**NEW this pass.**

Both sliders are handed the **same** `trackInk` value — the k rail via an inline `background-color`
(`:22`), the kC track via the `--slider-track-bg` custom property (`:75`). They do not respond to a
change of it the same way.

**Measured — `evidence/pass-4/xc4-probe4-asymmetry.mjs`, output `xc4-probe4-asymmetry.txt`:**

```
=== BEFORE — the two elements' transition declarations ===
{
 "k_rail":   { "transitionProperty": "all",                       "transitionDuration": "0s" },
 "kC_track": { "transitionProperty": "background, border-color",  "transitionDuration": "0.2s, 0.2s" }
}
```

The kC track's transition comes from glass-ui's own recipe
(`glass-ui/dist/glass-ui.css`, `.slider-track`: `transition: background var(--duration-fast)
var(--ease-standard), border-color …`). The k rail is a bare `<div>` — its `transition-property: all`
is the CSS **initial value**, not a rule; I verified no stylesheet grants it a transition:

```
=== matching rules that set a transition on the rail ===
[]
```

(`xc4-probe3-rail-transition.txt` — every `document.styleSheets` rule that sets a transition and
matches the rail: none.)

**Consequence.** On any change to the live pick, the k rail's fill and ring jump instantly while the
kC track's fill eases for 200 ms. Two members of one cluster, carrying one ink, moving at different
speeds — the visual signature of two different components, which is exactly the impression pass 2's
C2-9 diagnosed structurally (a hand-rolled rail beside a real `.slider-track`). Here it is measurable
in the time domain.

**Labelled HYPOTHESIS — the uncertified intermediate.** `trackInk` is certified for its *endpoint*:
`safeCss` walks the colour until it clears the 3:1 graphics floor against the resting plate. A CSS
`transition` paints the sRGB interpolation between the previous endpoint and the new one, and
**contrast is not convex along an sRGB interpolation** — two colours both ≥3:1 against a ground can
have intermediates below it. If so, the kC track paints under-floor ink for up to 200 ms on every
colour change, invisible to the O-18 census (which samples a settled state). **I could not reproduce
this.** `/#/extract` has exactly two sliders and both are this component's own
(`xc4-probe3-rail-transition.txt` §"all sliders on /#/extract"), and the `?color=` URL contract did
not re-drive the live pick from that route (`xc4-probe4-asymmetry.txt`:
`distinctRailValues: 1`). The desync is **proved by declaration**; the uncertified-intermediate
consequence is **a hypothesis with no reproduction**, and I mark it so.

**Proposed cure.** Whichever way the cluster is meant to read, it should read *one* way. Since the
rail is a reimplementation of the thing the kC slider gets for free (C2-9), the cure is the same
transposition: retire the hand-rolled rail in favour of the k `Slider`'s own
`--slider-track-bg`, and the transition question resolves itself because there is only one track
recipe left. That is a Glass-8-adjacent change and belongs in the blocked wave beside XC3-9.

---

## Disproved — hypotheses I raised and my own measurement killed

A challenge seat that reports only its hits is arguing, not measuring. These were live theories,
probed, and refuted.

| # | hypothesis | why I raised it | measurement that killed it |
|---|---|---|---|
| D-1 | the k rail's `transition-property: all` animates its certified fill and ring, restarted at frame rate so the paint never settles | `getComputedStyle` reported `transition-property: all` on the rail (`xc4-probe2`) | `transition-duration: 0s` — `all` is the CSS **initial value**, and a full `document.styleSheets` sweep found **zero** rules granting the rail a transition (`xc4-probe3-rail-transition.txt`). The rail does not transition. **Refuted.** |
| D-2 | the parked component is *idle*-hot — it burns main thread continuously after the route is visited | XC4-1's 23 writes/s looked like a free-running loop | 6 s of idle observation, **visible** and **parked**: `mutations: 0` in both (`xc4-probe6-parked-developed.txt`). The component is **signal**-hot, not idle-hot. XC4-1 is narrowed accordingly and stated only for windows where the colour signal moves. **Refuted as stated; the corrected form is XC4-1.** |
| D-3 | `import { Slider } from "../../ui/slider"` is a legacy alias / dual path (edict 2) while `DockControl` comes straight from `@mkbabb/glass-ui/dock` in the same file | `demo/ui/slider/index.ts` is literally one line: `export { Slider } from "@mkbabb/glass-ui";` | It is the **repo-wide idiom**, not this file's deviation: 5 consumers go through the barrel (`GradientVisualizer`, `GenerateControls`, `ExtractControls`, `ConfigSliderPane`, `ComponentSliders`), **0** import `Slider` directly, and `demo/ui/` holds 19 such barrels. Consistent house style. **Not a defect.** Pass 3's edict-4 PASS was right. |

---

## Test truth — three killing mutations no prior pass names

Pass 1's C-10, pass 2's C2-13 and pass 3's XC-5 each supply mutation tables; these three are
disjoint from all of them and target the **value contract** rather than the paint.

| # | mutation to `ExtractControls.vue` | why every gate stays green |
|---|---|---|
| **j** | `:max="16"` → `:max="8"` on the k slider (`:29`) | The only e2e that touches k is `o9-shadow-palette.spec.ts:147-158`, which presses `ArrowRight` once (5→6) and `ArrowLeft` once (6→5). Nothing anywhere asserts the ceiling. The quantizer's k domain is silently halved. |
| **k** | `:step="0.1"` → `:step="0.5"` on the kC slider (`:73`) | **The kC slider has no test of any kind.** `grep -rn "Chroma weight" e2e test` returns only this file. `o18-contrast-census.spec.ts:1106` samples `[data-o18="extract-kc"] .slider-track`'s *colour* and never its value. Chroma weighting drops from 16 settings to 4, unobserved. |
| **l** | delete `aria-label="Chroma weight"` (`:69`) | The repo's own nameless-control probe is `visual/capture.mjs:102`: `document.querySelectorAll('button,[role="button"]')`. **`[role="slider"]` is not in the selector.** The thumb becomes genuinely nameless and the audit that reports `/#/extract` as the application's worst route for accessible names cannot see it. |

Mutation **l** is the indictment worth carrying: `/#/extract` contributes 3 of the application's 18
`namelessButtons` and **2 of its 6 `smallTapTargets`** — and the two tap-target rows are this
component's slider thumbs, by name:

```json
{ "w": 12, "h": 24, "tag": "span", "label": "Number of colors" },
{ "w": 12, "h": 24, "tag": "span", "label": "Chroma weight" }
```

(`visual/REPORT.json`, `safari-desktop-light` and `-dark`; `{"w":12,"h":44}` on both mobile matrices.)
The probe that measures their *size* has no counterpart that measures their *name*.

---

## Local hazards — checked this pass, NEGATIVE

Only hazards I tested myself this pass; passes 1–3 have their own negative tables and I do not repeat
theirs.

| hazard | result | evidence |
|---|---|---|
| the mount-epoch trap the ink composable itself warns about (`useContrastSafeColor.ts:69-78`: a consumer folding the live probe into its OWN computed "must register the mount bump from its setup, or its first probe result caches") — `trackInk` is exactly that shape | **NEGATIVE.** `useSafeAccentFn` calls `bumpProbeEpochOnMount()` in its own setup (`useContrastSafeColor.ts:347`), so the consumer inherits it transitively. The documented trap does not apply. | `useContrastSafeColor.ts:345-348` |
| `trackInk` fails to re-drive on a theme flip (a computed reading DOM without a reactive dep) | **NEGATIVE.** `safeCss` reads `isDark.value`, `ambient.value` and — through `resolveLiveTintCached` — `probeEpoch.value` during evaluation, so all three are tracked. | `useContrastSafeColor.ts:245-249, 355-361` |
| the rail steals pointer events from the slider (an `absolute inset-0` sibling under a `relative` control) | **NEGATIVE.** `.glass-slider` is `position: relative` and later in DOM order, and its `.slider-track` is `height: calc(var(--slider-thumb-size,1rem) * 1.5)` = 24 px = the rail's `h-6`. The slider covers the rail exactly; no dead zone. | `glass-ui.css` `.glass-slider[data-variant=spectrum] .slider-track`; `ExtractControls.vue:18-34` |
| the spectrum track's `--slider-track-bg` override is inert (variant hard-sets its own background) | **NEGATIVE.** `.glass-slider[data-variant=spectrum] .slider-track { background: var(--slider-track-bg, var(--secondary)) }` — the override is the documented input and it lands. Measured live: `trackBgVar: "oklch(54.51…% 0.218… 9.834…deg)"`, `paintedBg` identical. | `xc4-probe2-transition-floor.txt` §0 |
| page/console errors on the route | **NEGATIVE.** `pageErrors: []` across all seven probes; `REPORT.json` `/#/extract` shows `consoleErrors: []`, `pageErrors: []`, `overflowX: 0` in all four matrices. | every `evidence/pass-4/*.txt` |
| `verbatimModuleSyntax` violation (edict 8) | **NEGATIVE.** All six imports are value imports — `computed`, three icons, two glass-ui components, `Slider`, `useSafeAccentFn`, `GRAPHICS_CONTRAST_FLOOR`. No type-only import is miswritten, and none is needed. | `ExtractControls.vue:96-101` |

---

## Edict scorecard (pass-4 deltas only)

| # | edict | pass-4 verdict |
|---|---|---|
| 2 | no legacy code | **PASS on the import path** — D-3 refuted; the `demo/ui/` barrel is the repo idiom (5 consumers, 0 direct). Pass 3's XC-11 concern about the dead `var(--muted)` degenerate stands and is *compounded* by XC4-3: the file has two unguarded token strings in value position. |
| 5 | root-level styling | **FAIL, additionally** — XC4-2: the ink is pushed through an inline `:style` object per render when a custom property consumed by the stylesheet would write one short token. |
| 7 | idiomatic Vue 3.5 | **PARTIAL** — reactive props destructure is correct, `defineModel` is correctly avoided (pass 3). But the component has no activation awareness inside a `KeepAlive` host (XC4-1), which in Vue 3 is a required consideration, not an optional one. |

---

## Blocked wave — `W·XC4-EXTRACT-CONTROLS` (extends `W·XC3-EXTRACT-CONTROLS`)

The subject is PINNED at SHA-256 `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28`
(verified above). **No source edits land from this formation.**

### Exact release condition

Identical to pass 3's, restated so this wave is self-contained. The wave opens when **all four** hold:

1. `@mkbabb/glass-ui@8.0.0` is published and the value.js dependency range admits it;
2. the glass **BJ W4 hold** is lifted by its owner (the pin is BJ's, not this tranche's);
3. `shasum -a 256 demo/workbenches/extract/ExtractControls.vue` **still equals**
   `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` at wave open — any drift means
   the file changed under the hold and the wave **re-audits before it executes**;
4. XC4-0 (below) is GREEN — the gate lands *before* the cure, so XC4-3 is born-RED, not born-asserted.

### Steps

| # | cures | change | pinned-file edits | blocked by |
|---|---|---|---|---|
| **XC4-0** | XC4-3 | o18 extract graphics leg: assert the rail paints a non-transparent fill **and** a non-`none` box-shadow with `--ink-muted` forced guaranteed-invalid (`--ink-muted: initial` on an ancestor). Born-RED today — verified by `xc4-probe5-killshot.mjs`. | **none** — `e2e/` is unpinned | **nothing — lands now** |
| **XC4-1s** | XC4-1 | `PANE_ACTIVE_KEY` provided by `PaneSlot`; `useSafeAccentFn` holds its last certified value while parked | **none** — `PaneSlot.vue` + `useContrastSafeColor.ts` are unpinned | **nothing — lands now**, and it cures all nine panes, not this one |
| **XC4-2s** | XC4-2 | split the rail's `:style` — gradient on its own binding, ink as a custom property consumed by the stylesheet | 1 line | pin only |
| **XC4-3s** | XC4-3 | `MUTED_INK_DEGENERATE` resolved constant in `ink.ts`; `trackInk`'s degenerate returns a colour, not a token reference | 1 line here + 1 export | pin only |
| **XC4-4s** | XC4-4 | retire the hand-rolled rail for the k `Slider`'s own `--slider-track-bg` (folds C2-9) | rail markup | **requires Glass 8** (the spectrum track recipe is glass-ui's) |
| **XC4-5s** | mutations j/k/l | e2e: k-ceiling assertion, a kC value walk, and extend `visual/capture.mjs`'s nameless selector to `[role="slider"],[role="switch"]` | **none** | **nothing — lands now** |

**Scheduling note.** XC4-0, XC4-1s and XC4-5s need nothing from glass-ui and nothing from the pin.
XC4-1s in particular is the highest-leverage unblocked change in this whole three-pass record: it is
a change to two unpinned files that removes off-screen certification work from **every** KeepAlive'd
pane in the application, and it lands today.

**Relay to glass-ui BJ (standing formation invariant).** Adding to pass 3's relay: the
`.slider-track` `transition: background` recipe interacts badly with a consumer that drives
`--slider-track-bg` from a frame-rate signal (XC4-4) — glass-ui should either document that
`--slider-track-bg` is a settled-value input, or exempt it from the transition. No consumer can fix
this from outside.

---

## Strongest defect

**XC4-3.** `trackInk`'s degenerate branch — the one the file's own comment calls "the degenerate
fallback when no live pick threads" — returns the bare string `var(--ink-muted)`. That token has
**zero CSS declarations in the repository**; its only definition is a JavaScript `setProperty` inside
a boot watcher (`useAtmosphereBoot.ts:103`). When it is unstamped, both declarations the rail emits
from it are invalid at computed-value time, and the measured result is:

```
"DEGENERATE_AS_WRITTEN_line124": { "backgroundColor": "rgba(0, 0, 0, 0)", "boxShadow": "none" }
"WITH_FALLBACK_as_line149_writes_it": { "backgroundColor": "rgb(124, 102, 80)", "boxShadow": "rgb(124, 102, 80) 0px 0px 0px 1.5px inset" }
"VERDICT": "RAIL PAINTS NOTHING — no fill, no ring"
```

The same file guards the same token correctly nine lines later, and so do ten other consumers across
the demo. The fallback that exists to guarantee the component is visible when nothing else is
available is the one path on which it becomes invisible — and the cure is not a fallback but the
recognition that a deferred token reference cannot be a value in a computation whose entire purpose
is to return a *certified* colour.
