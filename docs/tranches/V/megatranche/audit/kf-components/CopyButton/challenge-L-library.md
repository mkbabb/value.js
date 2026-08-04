claude-opus-5[1m]

# CHALLENGE · `CopyButton.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/CopyButton.vue` (113 lines, read whole)
**Mode** static, read-only. No dev server, no browser tooling, no installs. Livable-only assertions are marked **UNPROVEN-NEEDS-LIVE** and deferred to SS-13.
**Evidence tree** keyframes.js HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group`. The worktree is dirty in ~40 other files (an in-flight demo/bench change), but `git show HEAD:demo/components/CopyButton.vue | diff -` → **IDENTICAL**: every line number below is HEAD *and* worktree.
**Executed evidence** three `node --input-type=module` probes against the installed `@mkbabb/value.js@4.0.0` subpaths (easing resolution, stylesheet-parse identity). Read-only: no file in any repo was written, mutated, or installed. This file is the single write.

> **This pass SUPERSEDES an earlier L-axis file at this same path** (written 2026-08-04 12:48, same model id). That pass was good work and most of it is **retained here with attribution** (`[prior L seat]`), because I re-verified it against the tree. It missed one thing that reorders the whole document: **the animation this component exists to run throws at construction and has never played**. Its own INFO row L-12 describes that state as a hypothetical failure envelope — it is the actual, unconditional state at HEAD. Three of its rulings are revised below (§5).

**Import closure read** (transitively, to the point the contract is decided): `demo/utils/clipboard.ts` · `src/animation/index.ts` · `load-engine.ts` · `group/{group,lifecycle,entries,waapi}.ts` · `internal/transport/core.ts` · `engine/{animation,options,option-setters,play-lifecycle}.ts` · `engine/css/css-animation.ts` · `compile/adapter.ts` · `compile/easing/{easing-option,easing-registry}.ts` · `constants/{types,defaults}.ts` · `resolve/element-resolve.ts` · `@lucide/vue` (`createLucideIcon.mjs`, `Icon.mjs`) · `@vue/runtime-core` (`setRef`) · `@mkbabb/value.js/{easing,css}` · plus all four call sites, the three sibling copy sites, `demo/app/main.ts`, `demo/kf-engine.ts`, `demo/styles/style.css`, `scripts/lib/console-budget.mjs`, `scripts/observe/demo/live-session.mjs`, `.github/workflows/ci.yml`.

---

## 0. Verdict

| | count |
|---|---|
| defects | **19** |
| **BLOCKER** | **2** |
| MAJOR | 6 |
| MINOR | 7 |
| INFO | 4 |
| superlatives | **5** |
| corpus contradictions | 3 (one of them against the prior L seat) |

The component is well-built Vue wrapped around **a feature that has never executed once**. It reaches the engine through the documented seam, renders a real `<button>`, and carries an AT status sink most demo buttons lack. It also constructs its animations with a timing-function name that does not exist — so every mount throws, `group` is `null` forever, and 45 of its 113 lines are unreachable — and, on the failure path it does reach, it announces a copy that did not happen.

| id | sev | one line |
|---|---|---|
| **B-1** | **BLOCKER** | `timingFunction: "bounceInEase"` (`:42`) resolves to nothing → `new CSSKeyframesAnimation()` **throws at every mount**; `group` never assigned; the whole feedback animation is dead at all 4 call sites |
| **B-2** | **BLOCKER** | `copyText(text)` (`:52`) unawaited + uncaught, success asserted unconditionally → unhandled rejection **and a false "Copied to clipboard" to assistive tech** `[prior L seat L-1]` |
| M-1 | MAJOR | `isCopied` is a write-once latch → the accessible name is permanently wrong; the `label` prop dies after one click `[L-3]` |
| M-2 | MAJOR | `group.respectReducedMotion` never set → the pulse runs under `prefers-reduced-motion: reduce`, and no CSS can stop it `[L-2]` |
| M-3 | MAJOR | zero intrinsic box — unrenderable without an external size; one consumer already documents the workaround in its own CSS `[L-4]` |
| M-4 | MAJOR | `useTemplateRef<HTMLElement>` is false (lucide is functional → `SVGSVGElement`) and the falsity is what makes `tsc` pass `[L-5]` |
| M-5 | MAJOR | `@keyframes fade-out` (`:83-92`) drives **no opacity** → there is no icon swap; two comments describe an unimplemented design |
| M-6 | MAJOR | the one gate that catches B-1 (`live-session` HARD console budget) is nightly-only **and** `npm ci`-blocked by the glass-ui phantom dep — F-1 has already blinded the battery |
| m-1 | MINOR | no `onBeforeUnmount`: the rAF loop and a naked `requestAnimationFrame` outlive the component `[L-6]` |
| m-2 | MINOR | post-`await` `!` on refs Vue nulls at unmount `[L-7]` |
| m-3 | MINOR | `fromString` (a full stylesheet parse ×2 per instance, unmemoized) where `fromKeyframes` needs none `[L-8]` |
| m-4 | MINOR | `g.singleTarget = false` pokes derived state; ordering-fragile; forfeits the WAAPI lane `[L-9]` |
| m-5 | MINOR | repeat click re-announces to AT but drops the icon pulse (`beginPlay` re-entrancy) `[L-10]` |
| m-6 | MINOR | the library test that should have caught B-1 asserts `bounceInEase` is "a real registry curve" and passes for the wrong reason |
| m-7 | MINOR | zero test coverage for a 4-consumer shared leaf |
| i-1 | INFO | `AnimationGroup<any>` — repo-wide pattern, but the one site with closed vars `[L-11]` |
| i-2 | INFO | a rejected engine load is memoized forever and swallowed at boot — the *other* silent-dead-icon path `[L-12]` |
| i-3 | INFO | `liveStatus` is never cleared → a stale past-tense sentence in the a11y tree `[L-13]` |
| i-4 | INFO | `requestAnimationFrame` used as a Vue scheduler where `nextTick` is the house tool |

---

## 1. BLOCKERS

### B-1 · The copy-feedback animation throws at construction and has never run — **NEW, missed by the prior pass**

**Provenance** `CopyButton.vue:40-43`, thrown at `:69` (and again at `:82` were it reached).

```ts
40  const options: Partial<InputAnimationOptions> = {
41      duration: 200,
42      timingFunction: "bounceInEase",     // ← not a curve. Not any curve.
43  };
…
69  const clipboardCheckedAnim = new CSSKeyframesAnimation(options).fromString(…)
```

**The claim.** `"bounceInEase"` resolves to nothing, and the engine's easing resolver is **fail-explicit by design** — `src/animation/compile/easing/easing-option.ts:19-21`: *"Fail-explicit: unresolvable input throws; there is no silent fallback to a default curve."* The throw is in the **constructor**, before `.fromString` is ever entered:

```
new CSSKeyframesAnimation(options)
  → engine/animation.ts:196   setOptions({...defaultOptions, ...this._ctorOptions})
  → engine/option-setters.ts:36  applyTimingFunction
  → engine/options.ts:46      normalizeTimingFunction
  → compile/easing/easing-option.ts:44-58  resolveEasingOption
  → compile/easing/easing-registry.ts:135  throw new TypeError(`Unknown timing function "bounceInEase"`)
  ⇒ rethrown as AnimationOptionError(…, "UNKNOWN_TIMING_FN")
```

**Evidence — the name is absent from both resolution branches.** `resolveTimingFunction` (`easing-registry.ts:124-136`) tries (a) `parseTimingFunction` (a CSS literal), then (b) `timingFunctionRegistry` — built from `Object.keys(bezierPresets)` + `"ease-in-bounce"` + nine `DIRECT_NAMES` (`easing-registry.ts:18-47`). Probed against the installed `@mkbabb/value.js@4.0.0`:

```
parseTimingFunction("bounceInEase") → ok = false
easing("bounceInEase")             → ok = false   { code: "easing_name_unknown" }
easing("easeInBounce")             → ok = true                ← the curve that DOES exist
bezierPresets keys: linear, ease, ease-in, ease-out, ease-in-out, smooth-step-3,
   ease-in-sine … ease-in-out-back                            ← no bounceInEase, no alias
```

**Consequence chain, all source-proven.** The throw lands inside `onMounted(async …)` (`:65`); Vue routes the rejected hook through `callWithAsyncErrorHandling` → `handleError` → `console.error` (no `app.config.errorHandler` is installed — `demo/app/main.ts` read whole, 65 lines). Therefore, at HEAD, in every one of the four mount sites (`EasingTarget.vue:35`, `StartingStyleTarget.vue:59`, `KeyframesEditor.vue:82`, `KeyframeCard.vue:26`):

- `group.value` is **never assigned** — `:101` is unreachable;
- `void group.value?.play()` (`:62`) is a permanent no-op — the button never animates;
- **lines 40-43 + 45-49 + 65-102 (45 of 113 lines, 40 %) are dead code**;
- every mount charges the console — including one mount per keyframe row (`KeyframeCard.vue:26`).

**Why nothing caught it.** `InputAnimationOptions["timingFunction"]` is `TimingFunction | Easing | TimingFunctionNames | string | undefined` (`src/animation/constants/types.ts:191-196`) — the bare `| string` arm collapses the literal union, so `tsc` cannot object. And the demo is not typechecked on the merge path anyway (M-6). This is a **library type-design row worth a letter**: deleting `| string` from that union converts B-1 into a compile error at zero runtime cost.

**Independent corroboration (live, from the value.js side).** `docs/tranches/V/audit/R2-01-visual-design.md:57-78` (DP2-02) captured the exact runtime line — `PAGEERROR: AnimationOptionError: Invalid value for animation option "timingFunction": "bounceInEase" — unknown timing function`; `R3-01-fresh-eyes.md:66-87` (FE-1) reproduced the construct-throw; it is dispositioned **EE-01 → BUILD W1** in `docs/tranches/V/DISPOSITIONS.md:69`. My static chain and their browser observation agree, and the line is still in the tree.

**Falsifier.** Dies if any of: (a) the bundled value.js resolves `bounceInEase` (probed: it does not); (b) `resolveEasingOption` has a silent fallback (its own header forbids it, and `easing-registry.ts:135` throws); (c) something between `:66` and `:101` catches the throw (whole hook read: nothing does); (d) `parseTimingFunction` accepts arbitrary idents (probed: it does not). Cheapest live kill: open `/#/easing` and look for `AnimationOptionError` in the console.

**Fix.** One word — `"easeInBounce"` (or `"ease-in-bounce"`, or a `cubic-bezier()` literal). Demo-owned. No library change required, though see the `| string` note.

**Reordering effect.** B-1 is upstream of M-2, M-5, m-1, m-3, m-4 and m-5 — every one of those is a property of an animation that does not currently run. They are **latent, not moot**: the one-word fix arms all of them simultaneously. Repair B-1 and re-run this axis before shipping.

---

### B-2 · Fire-and-forget copy: an unhandled rejection, and a **false success announcement to assistive tech** `[prior L seat L-1 — retained, re-verified]`

**Provenance** `CopyButton.vue:51-63`; `demo/utils/clipboard.ts:3-8`.

```ts
51  const handleClick = () => {
52      copyText(text);                              // not awaited, not caught, not even void-ed
54      isCopied.value = true;                       // unconditional
57      liveStatus.value = "";
58      requestAnimationFrame(() => {
59          liveStatus.value = "Copied to clipboard";  // unconditional
60      });
62      void group.value?.play();
```

`copyText` is `async` with a bare `await navigator.clipboard.writeText(text)`, so every failure mode becomes a rejected promise: absent `navigator.clipboard` (insecure context) → `TypeError`; `NotAllowedError` on a denied permission, an unfocused document (normative in the Clipboard API), or a cross-origin frame without `allow="clipboard-write"`. Line 52 attaches no handler.

Two shipped consequences: an `unhandledrejection` (nothing in the file or `demo/app/main.ts` catches it), and — the reason this is BLOCKER rather than MAJOR — **the component lies on the channel it built to be honest**. The `role="status" aria-live="polite"` region (`:15`), whose comment at `:13-14` names it the AT-truth channel, announces *"Copied to clipboard"* to a screen-reader user whose clipboard is unchanged, and `isCopied` (`:54`) flips the accessible name to the copied state at the same moment.

The repo is not short of the right posture; CopyButton is the sole outlier among four `copyText` consumers:

| site | posture |
|---|---|
| `instrument/shell/useShareState.ts:30-40` | `try { await copyText(url, …) } catch { router.replace fallback + toast.info("URL updated — copy from address bar") }` |
| `instrument/keyframes/KeyframesStringControls.vue:133-167` | `try { await copyText(…) } catch (e) { toast.error("Export CSS failed 🔧", {description: (e as Error).message}) }` |
| `KeyframesStringControls.vue:173-177` | `await copyText(…)` — rejection propagates to the caller |
| **`CopyButton.vue:52`** | **bare call; no `await`, no `.catch`, no `void`; success asserted unconditionally** |

The file demonstrably knows the floating-promise idiom — it writes `void group.value?.play()` on line 62. Line 52, the one that can actually fail, does not even get the `void`.

**Falsifier.** Dies if an app-level `unhandledrejection` handler surfaces copy failure *and* something reverts `isCopied`/`liveStatus` (grepped `main.ts` + `App.vue`: no hits); or if `copyText` is rewritten to return a boolean; or if `writeText` provably cannot reject in a supported browser (it can). **Non-claim:** I do *not* claim failure is common on the deployed HTTPS origin — the defect is that the failure path is unmodelled and mis-announced.

---

## 2. MAJOR

### M-1 · `isCopied` is a write-once latch — the accessible name is permanently wrong `[L-3]`
**Provenance** `:4`, `:32`, `:54`. `grep -rn "isCopied" demo/` → exactly three lines: declaration, `aria-label` read, write. Nothing resets it — no timer, no watcher, no completion hook. After one click the button is named `"Copied to clipboard"` **forever**, while (post-B-1) the glyph returns to the clipboard within 200 ms: the visible affordance and the accessible name diverge permanently, and the `label` prop (`:29` — the whole reason `EasingTarget.vue:38` passes `label="Copy easing literal"`) is dead after first use. The live region is a *separate*, correctly re-armed channel; `isCopied` is a second state machine for the same event with no reset arc. **Falsifier:** produce any reset path — the file is self-contained and has none.

### M-2 · `respectReducedMotion` is never set, and only the **group** field can set it `[L-2 — retained, sharpened]`
**Provenance** `:40-43`, `:95-101`; `group/group.ts:60`; `group/lifecycle.ts:78-95`; `constants/defaults.ts:86`.
The group's PRM gate is a group field defaulted `false` and consulted only on the group path (`lifecycle.ts:79-81`, `withReducedMotion(group.respectReducedMotion, …)`). The prior seat's sharpening is correct and I re-verified it: **putting the flag in `options` would not work** — the child-options arm (`engine/play-lifecycle.ts:213-221`) is on the standalone `playFrame` path, which a managed child never takes (`group._frame` → `advanceTo` → `renderMultiTarget` never reads child options). `group.respectReducedMotion = true` is the only lever, and it is one line at `:96`.
The aggravating factor is specific to a JS animation library: the pulse is written as **inline style per frame** (`group/entries.ts:91-100` → each child's `interpFrames`), so none of the demo's four `@media (prefers-reduced-motion: reduce)` blocks (`EasingTarget.css:48`, `SequenceTarget.css:238`, `SquareScene.css:136`, `ControlsPaneWrapper.css:144`) can suppress it. The house idiom is the opposite at four sites: `demo/state/animationOptionsStore.ts:49`, `TypingDots.vue:91`, `AnimationVisualizer.vue:147`, `app/transition/useSceneSwap.ts:45`.

### M-3 · Zero intrinsic box — a styling contract that leaks to every consumer `[L-4]`
**Provenance** `:5`, `:104-113`; `EasingTarget.css:68-74`.
Both icons and the `sr-only` span are `position: absolute`, so the `inline-block` button has no in-flow content and collapses to 0×0 unless sized externally; `height/width: 100%` of a zero box is zero. All four consumers compensate — three with utilities (`w-6 h-6`, `h-6 w-6`, `shrink-0 w-4 h-4`), one with a stylesheet rule whose comment documents the trap **from the outside**: *"CopyButton's icons are absolutely-positioned at 100% — the button needs an intrinsic box here."* A default `w-4 h-4` on the root (still overridable through class fallthrough) makes the contract self-evident. **Falsifier:** find a size default in the component or a shared base class — neither exists.

### M-4 · `useTemplateRef<HTMLElement>` is a type lie, and the lie is load-bearing for the build `[L-5]`
**Provenance** `:37-38`, `:98-99`; `@lucide/vue/dist/lucide-vue.d.ts:10`; `@vue/runtime-core:1765`; `group/group.ts:195`.
Lucide icons are **functional** components (`createLucideIcon.mjs`: `(props, {slots, attrs}) => h(Icon, …)`; d.ts: `FunctionalComponent<LucideProps>`), and Vue resolves a template ref on a functional vnode to `vnode.el` — the rendered `<svg>` — because `shapeFlag & 4` (STATEFUL_COMPONENT) is false (`runtime-core:1765`). So the runtime value is `SVGSVGElement`, which does **not** extend `HTMLElement`. The annotation is what makes `setTargets(...targets: HTMLElement[])` (`group.ts:195`, `engine/animation.ts:465`) typecheck: annotating honestly would turn the build red. It is laundering a real contract gap — *the engine does not model SVG targets and this component animates SVG targets* — and it survives only because the paint path reaches for `.style.setProperty`, which `SVGElement` happens to expose. Any future narrowing (`instanceof HTMLElement`, `offsetWidth`, a layout read in `resolve/element-resolve.ts`) breaks this call site silently, with no test to catch it (m-7). The SVG `transform-box`/`transform-origin` *rendering* question is **UNPROVEN-NEEDS-LIVE**; I claim only that the declared type is false and that its falsity is what passes the build.

### M-5 · `@keyframes fade-out` fades nothing — there is no icon swap — **NEW**
**Provenance** `:82-93`, against the design claims at `:13-14` and `:33-34`.

```
83  @keyframes fade-out {
84      0%, 100% { transform: scale(1);
86                                       ← blank line where a declaration was removed
88      50%      { transform: scale(1.25);
90                                       ← blank line where a declaration was removed
```

The keyframe **named** `fade-out` carries a transform channel only. `renderMultiTarget` paints each child onto its own target (`group/entries.ts:91-100`), so the `Clipboard` glyph's opacity is never driven: it stays fully visible for the entire 200 ms while `ClipboardCheck` (whose `fade-in` *does* drive opacity 0→1→0, overriding its `opacity-0` class inline) ghosts in **on top of it** — both `position: absolute; height/width: 100%` in the same box (`:105-112`). The two blank lines at `:86`/`:90`, exactly where `opacity` declarations belong, are the scar of a deletion that left the name and the comments' promise standing. Consequently `:14` (*"the icon swap is the sighted feedback"*) and `:34` (*"The sighted feedback is the icon swap"*) describe behavior the keyframes do not implement — and M-1's unreset `isCopied` was plausibly meant to be that swap's state.
**Falsifier.** The source claim dies only if `renderMultiTarget` cross-writes sibling vars — it does not (`entries.ts:96` calls `interpFrames` per child). The *perceptual* claim (superimposed line art reads as a muddle, not a swap) is **UNPROVEN-NEEDS-LIVE** → SS-13, gated behind B-1.

### M-6 · F-1 has already blinded the one gate that catches B-1 — **NEW**
**Provenance** `.github/workflows/ci.yml:54-77` (verified at HEAD via `git show`); `scripts/demo-roster.mjs:5-12`; `scripts/lib/console-budget.mjs:96-103`; `scripts/observe/demo/live-session.mjs:796,1198,1407,1531-1542`; census **F-1**.

The repo has exactly the right gate. `live-session.mjs` sweeps **every routed scene** (`:796`, plus dedicated `#/easing` legs at `:1198`,`:1407`) under a **HARD, zero-tolerance** console budget — `pageerror` / `unhandledrejection` / any `console.error` → `tier: "HARD"` (`console-budget.mjs:96-103`), `ERROR BUDGET BLOWN` on any charge (`live-session.mjs:1531-1542`). B-1 emits a `console.error` on `#/easing` and `#/spring`. It should be unshippable. Two independent reasons it never fires:

1. **Off the merge path.** The roster job is `if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'` (`ci.yml:55`) — nightly/manual only, deliberately (`ci.yml:69-71`: *"does not block library merges"*). The merge-path job runs `check:lib` (tsconfig.lib.json → `src/` only, so **demo/ is never typechecked**), `npm test`, `proof:publish`.
2. **The nightly cannot even build.** Its first step is `npm ci` (`ci.yml:66`) — and I re-verified F-1 myself: `grep -c glass-ui package-lock.json` → **0**; installed `@mkbabb/glass-ui` → **7.0.0**; `@mkbabb/value.js@4.0.0` declares `dependencies: {}`, so it is not transitive. A lockfile-faithful install has no glass-ui, and `npm run gh-pages` dies at `demo/styles/style.css:3` before a browser opens.

So the phantom dependency is not merely a future-checkout hazard: **it has already disarmed the observation battery**, which is the most economical explanation for a `pageerror`-class defect surviving in a repo that gates on `pageerror === 0`.
**Falsifier.** Dies if a glass-ui entry is found in `package-lock.json` (re-grepped: none), or if the roster runs on `push`/`pull_request` (the `if:` says otherwise), or if the nightly is currently green — and if it *is* green, the budget is failing to charge, which is a worse finding, not a better one. One `gh run list --workflow=ci.yml` settles it.

---

## 3. MINOR

**m-1 · No unmount teardown `[L-6]`.** `:58-60`, `:65-102`; `group/group.ts:88` (`readonly playback = new RAFPlayback()`). Two ungated schedulers, neither cancelled: the group's rAF loop keeps ticking after unmount (bounded at ~200 ms by `done`, writing `style.setProperty` to detached SVG nodes — exactly what `group.stop()` at `group.ts:374` exists for), and the `requestAnimationFrame` handle at `:58` is discarded, its callback writing `liveStatus` on a torn-down instance. The in-repo exemplar is one directory over: `TypingDots.vue:104-107` (`onBeforeUnmount` → `anim.stop()` for each). **Falsifier:** dies if `RAFPlayback.loop` self-cancels on detachment (no detachment probe exists) or if the group provably cannot be playing at unmount (a scene switch inside the 200 ms window is exactly that case).

**m-2 · Post-`await` non-null assertions `[L-7]`.** `:98-99` assert `clipboardChecked.value!` / `clipboard.value!` after `await loadAnimationEngine()`. Vue nulls template refs at unmount (`runtime-core:1766`, `isUnmount ? null : refValue`), so on an early unmount both assertions are false and `setTargets(null!)` stores `targets = [null]` — no throw, just a permanently inert group. The window is small (`main.ts:50-53` awaits `warmKfEngine()` before `mount()`, so the memoized promise is settled and the `await` costs a microtask hop or two), but `!` is the wrong tool, and the repo's own answer is `TypingDots.vue:68-76` (`let unmounted = false` + `if (unmounted) return`).

**m-3 · `fromString` where `fromKeyframes` suffices — and the parse is not memoized `[L-8, re-verified; corrects a claim I nearly made]`.** `:69-93`. `fromString` → `resolveKeyframes` → `parseSource` → `parseStylesheet` — the **full CSS stylesheet grammar**, run unconditionally (`compile/adapter.ts:219-225`, `:266-284`; no cache anywhere on that path). I probed value.js directly: two `parseStylesheet` calls on byte-identical source return **distinct ASTs with distinct declaration objects** — there is no result memo. So every CopyButton instance pays two full stylesheet parses at mount, over module-constant text carrying no stylesheet syntax at all (two stops, two properties, no `@property`, no sibling style rule, no `var()`/`calc()`); `KeyframeCardList` renders one CopyButton per keyframe row, so an N-frame animation pays 2N parses in one flush. `fromKeyframes` (`css-animation.ts:131-146`) never touches `resolveKeyframes` — it is what the sibling uses (`TypingDots.vue:88-95`), at the cost of expanding the `0%, 100%` comma selector into two keys.
*Counter-weight, stated honestly:* authoring **real CSS** and letting the engine parse it is the library's headline dogfood, and there is genuine product value in the demo's own affordance riding the same path a consumer's `@keyframes` text takes. That is why this is MINOR and not MAJOR — but the value is a *demo* value, and it should be a deliberate, commented choice rather than an accident. (The "memoized parse cache" phrase at `css-animation.ts:205-208` refers to guarding shared value instances **inside** a parse, not to a result cache; do not read it as memoization of `fromString`.) **Cost figure is UNPROVEN-NEEDS-LIVE** — I assert the structure, not milliseconds.

**m-4 · `g.singleTarget = false` pokes derived state `[L-9 — retained; it overturns a superlative I had drafted]`.** `:95-99`. `singleTarget` is *derived*: the constructor computes `animations.every(a => a.targets[0] === animations[0]?.targets[0])` (`group.ts:159-161`), which over two target-less children is `undefined === undefined` → `true`, so line 96 exists only to undo it. The prior seat's proposed fix is correct and I verified it against the constructor: **call each child's `setTargets` *before* constructing the group** and the derivation yields `false` on its own, deleting line 96 and the ordering hazard with it. As written, correctness of the multi-target render rests on a hand-written assignment to an undocumented public field (`group.ts:73` — the only bare field in that class with no JSDoc) in the right order; drop line 96 and both animations silently composite onto the first icon. Named consequence: `singleTarget === false` is a hard refusal in the native-lowering gate (`group/waapi.ts:28-31`), so despite `useWAAPI: true` being the engine default (`constants/defaults.ts:85`) the pulse never lowers to `Element.animate` — correct in kind (it avoids a split-brain), but an unstated consequence of a poked field, and it compounds M-2: an unlowered, PRM-unguarded rAF loop. *(The one genuine credit here — two icons on **one** `RAFPlayback` owner rather than two loose `play()` calls — is real, and survives the fix: constructing the group after the child `setTargets` calls keeps the single transport.)*

**m-5 · Repeat click: AT re-arms, the icon does not `[L-10]`.** `:13-14`, `:33-34`, `:55-62`; `internal/transport/core.ts:12-16`. `beginPlay` is re-entrant — *"every caller observes one held promise until settlement"* — so a second click inside 200 ms returns the held promise and **does not replay**. Meanwhile `:55-60` goes out of its way to clear-then-reset the live region *specifically so a repeat copy re-announces*. The two feedback channels have opposite repeat semantics, and the inverted one is the channel the comments call "the sighted feedback". Fix: `group.stop()` (rewinds + resolves) before `play()`, or gate on `group.playing()`.

**m-6 · The library test that should have caught B-1 encodes the false belief — NEW.** `test/orchestration/orchestration-api.test.ts:143-146`: *"`easeOutCubic` / `bounceInEase` are real registry curves but map to NO css twin"* → `expect(cssTwinFor("bounceInEase")).toBeUndefined()`. It passes for the wrong reason — `cssTwinFor` returns `undefined` for *unknown* names too — so a green library test now certifies a dead name. **Falsifier:** show `bounceInEase` in `timingFunctionEntries` (`easing-registry.ts:36-47`): it is not there, and §1's probe confirms value.js rejects it.

**m-7 · Zero test coverage — NEW.** `grep -rn "CopyButton" test/ scripts/` → **no hits**. A shared leaf with four consumers, a clipboard side effect, an engine dependency, an aria-live region and an SVG-target type lie has no unit test and (per M-6) no reachable browser observation. `docs/tranches/U/audit/lane-20-demo-app-shared-tier.md:61-73,234` already classifies it as a genuine cross-tier shared leaf — precisely the tier that earns a test.

---

## 4. INFO

- **i-1 · `AnimationGroup<any>` (`:49`) `[L-11]`.** Repo-wide pattern (13 sites), so not an outlier — recorded only because CopyButton is the **one** of the thirteen whose vars are statically known and closed (`{ transform: string; opacity: number }`); every other site is a heterogeneous scene-machine seam where `any` is defensible. Free win for any `Vars`-tightening pass.
- **i-2 · A rejected engine load is memoized forever `[L-12]`.** `load-engine.ts:123` memoizes with `??=`, so one transient chunk failure disables the engine for the session; `main.ts:50` swallows the warm's rejection (`warmKfEngine().catch(() => undefined)`) and mounts anyway. This is the *second* path to a permanently dead icon — B-1 is the one actually taken today. Not CopyButton's defect; it is the failure envelope the component sits inside, and it means the cheerful `:45-48` comment ("resolves within microtasks of mount") has an unmodelled other branch.
- **i-3 · `liveStatus` is never cleared (`:35`, `:59`) `[L-13]`.** After the first copy the `sr-only` span holds "Copied to clipboard" for the session. Screen readers expose `sr-only` text in browse mode, so a stale past-tense sentence sits permanently in the a11y tree beside a button whose name is *also* permanently past-tense (M-1). Individually trivial; together the component's a11y surface describes an event rather than an affordance.
- **i-4 · `requestAnimationFrame` as a Vue scheduler (`:58-60`) — NEW.** `nextTick` is the house tool; rAF here is a second scheduler with an unretained handle (see m-1). It *works* — Vue flushes on the microtask queue before the rAF callback, so the `""` write does land first — which is why this is INFO, not a defect of correctness.

**Checked and NOT defects** (recorded so no later pass re-litigates them) — the prior seat's list, spot-verified and endorsed: the shared `options` object across both animations is safe (`_ctorOptions` is only ever spread — `engine/animation.ts:195-196`, `css-animation.ts:200`; zero mutations across 4 sites); second and later plays work (`group.settle()` → child `settle()` resets `startTime`/`t`/`done`, and the `managed` flip is inert because the group drives `advanceTo`/`interpFrames` directly); fill-mode needs no handling (default `fillMode: "forwards"`, `constants/defaults.ts:83`, meets symmetric `0%,100%` frames — see S-3); `role="status"` + `aria-live="polite"` is redundant but is the recommended belt-and-braces form; the component does **not** set `outline-none`, so the UA focus ring survives (its toolbar sibling `KeyframesEditor.vue:87-92` does — CopyButton is on the correct side).

---

## 5. Contradictions of the hitherto corpus

### C-1 · `lane-frontend.md` S-7 (`:385`) is **factually wrong** about the mechanism — CONFIRMED (prior seat's C-1, independently re-verified)
The census claims CopyButton *"build[s] `@keyframes fade-in`/`fade-out` as runtime JS template strings **and inject[s] them** — style-injection from script, bypassing the cascade entirely."* **Nothing is injected.** Traced end to end: `:69,82` → `fromString` (`css-animation.ts:169`) → `resolveKeyframes` (`:176`) → `parseSource`/`parseStylesheet` (`adapter.ts:219-225`) — a **parse**, returning `{ast, issues}` → `addFrame` → template frames → at play time `target.style.setProperty` per frame (`compile/value-ast.ts:386-397`, driven by `group/entries.ts:91-100`). No `<style>` element, no `insertRule`, no `adoptedStyleSheets`, no document-level `@keyframes`. The only CSSOM write on the class is `registerProperties` / `registerPropertyDescriptors` (`css-animation.ts:246`, feature-detected), which this input — carrying no `@property` rules — makes a strict no-op. The consequence clause is inverted too: inline declarations are the highest-priority normal origin, i.e. maximally *inside* the cascade and element-scoped, not bypassing it. **The kernel of truth survives as m-3** (wrong seam, not injection). Recommend striking `lane-frontend.md:452-453` from the "runtime JS string injection" table and re-filing under the parse-seam blast radius (`lane-library.md §4.6`).

### C-2 · `lane-frontend.md` F-1 **does** bite this component — REVERSES the prior L seat's C-2
The prior pass ruled the phantom-dep blast radius here "nil" on the strength of the import list. The import list is right; the ruling is wrong on two counts:

1. **Cascade coupling.** The component's only colour declaration, `text-foreground` (`:5`), is a Tailwind v4 utility generated from `--color-foreground`, which is defined **only** in `node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css` (`@theme inline { … --color-foreground: var(--foreground); … }`), arriving via `demo/styles/style.css:3 @import "@mkbabb/glass-ui/styles"`. Without the phantom package the utility is never generated. Zero glass-ui *imports*, real glass-ui *cascade* dependency.
2. **Gate coupling — the material one (M-6).** F-1 blocks `npm ci` in the only job that runs the HARD `pageerror` budget, which is the only mechanism that would have caught B-1. The phantom dep is therefore *causally upstream* of the blocker in this very file.

I agree with the prior seat's operative recommendation (do not sweep CopyButton into an F-1 remediation that would *add* a glass-ui import it currently lacks) — but the row must not be marked "F-1: no exposure". It is exposed at the cascade and, decisively, at the gate.

### C-3 · The prior L pass's headline verdict is superseded
Its §0 reads *"a good piece of Vue with one untruthful failure path."* At HEAD the component also has a **dead** primary path: B-1 means the animation whose construction, grouping, targeting and playback occupy 40 % of the file has never executed. Its own INFO L-12 imagines that state as a failure envelope ("leaving `group` null forever and the button a dead icon with no signal to anyone") without testing whether the state is already true. It is. Recording this as the lane's own lesson: **resolve every string that crosses a fail-explicit API against the registry it is checked by** — the union type (`| string`, `constants/types.ts:194`) guarantees the compiler will not do it for you.

---

## 6. Superlatives (L-18, running the other way)

**S-1 · Textbook LIGHT/HEAVY boundary consumption `[prior seat S-1, endorsed]`.** `:23-24` imports the heavy-side *types* (`AnimationGroup`, `InputAnimationOptions`) with `import type` — erased under `verbatimModuleSyntax` — and only `loadAnimationEngine` as a value; a value-import of `AnimationGroup` would drag value.js's parser and colour graph onto the LIGHT static barrel and redden `proof:boundary`. It uses the **published barrel specifier**, never a deep `@src/animation/*` path (the ED-3 dogfood inversion, `demo/kf-engine.ts:5-11`). And it picks the right accessor: `kf-engine.ts:12-20` states that most demo sites should await `loadAnimationEngine()` at their point of need and that `kfEngine()` is the *one* ergonomic seam for the scene-machine hot path — a leaf with an async mount is exactly the former. *(This is also why I do **not** file "should have used `kfEngine()`" as a defect, though the synchronous accessor would incidentally delete m-2's `!` assertions — the trade is real but the documented posture is the file's.)* **Falsifier:** dies on any `@src` edge or heavy value-import in `:20-25` (there is none), or if `kf-engine.ts` were the mandated path for all sites (its header says the opposite).

**S-2 · A real `<button type="button">` root `[prior seat S-2]`.** `:2-3`. Native keyboard activation, focus, and role with zero ARIA; `type="button"` blocks implicit form submission. It also earns free membership in the toolbar's roving-tabindex cohort — `useToolbarKeyboard.ts:40-47` collects `container.querySelectorAll("button")` with no per-item registration, and its header names CopyButton as one of the three items it is agnostic to. Worth protecting explicitly if S-7's glass-`Button` reshell ever lands.

**S-3 · Symmetric `0%, 100%` frames retire fill-mode reasoning `[prior seat S-3]`.** `:70-79`, `:83-92`; `constants/defaults.ts:83` (`fillMode: "forwards"`). Both blocks put the identical declaration at `0%` and `100%`, so the engine's forwards fill leaves the icons exactly where they started — no completion handler, no `reset()`, no inline-style cleanup, no fill-mode option. A one-directional authoring of the same pulse would have needed all four. Small, deliberate, load-bearing.

**S-4 · `void group.value?.play()` — correct, named fire-and-forget `[prior seat S-4]`.** `:62`. The optional chain covers the window before the engine resolves (and is the sole reason B-1 degrades into a dead animation instead of a `TypeError` on every click), and the explicit `void` marks the promise as deliberately unawaited — the idiom the library uses itself (`load-engine.ts:128`). It is also the sharpest indictment of B-2: the file knows how to name a floated promise and does it correctly on line 62, while line 52 floats the failure-bearing one bare.

**S-5 · Vue 3.5 reactive props destructure keeps `text` live — NEW.** `:27-30`. `const { text, label = … } = defineProps<…>()` compiles to `__props.text` at the read site, so `handleClick` (`:52`) copies the **current** text rather than a setup-time snapshot. That matters here concretely: `StartingStyleTarget.vue:59` binds `:text="compiledEntryCss || copyableCss"` and `KeyframeCard.vue:26` binds `:text="frameString"` — both continuously recomputed. The classic stale-capture bug is structurally absent. **Falsifier (runs both ways):** on vue < 3.5, or with `propsDestructure` disabled, this same line would be a copy-the-wrong-string BLOCKER — `package.json` pins `vue ^3.5.35`, where the transform is default-on.

---

## 7. Repair order

1. **B-1** — `"bounceInEase"` → `"easeInBounce"`. One word; arms every latent finding below it; matches value.js disposition **EE-01 → BUILD W1**. *Library follow-up letter:* drop `| string` from `InputAnimationOptions["timingFunction"]` (`constants/types.ts:194`) so the next one is a compile error; fix the stale test at `orchestration-api.test.ts:143` (m-6) in the same commit.
2. **B-2 + M-1 + i-3** — one edit: make `handleClick` `async`, `await copyText` inside `try`, set `isCopied`/`liveStatus` only on success, add the failure branch (the `useShareState.ts:30-40` pattern), and reset both on `group.finished` (`group.ts:317`).
3. **M-5** — restore the missing `opacity` declarations in `fade-out` (or rename it honestly), then hand the result to SS-13.
4. **M-2 + m-1 + m-2 + m-4** — one edit at `:95-101`: call each child's `setTargets` **before** `new AnimationGroup(...)` (deleting the `singleTarget` poke), add `g.respectReducedMotion = true`, add the `unmounted` guard and `onBeforeUnmount(() => group.value?.stop())`.
5. **M-3** — give the root a default `w-4 h-4`; drop the redundant consumer sizes at leisure.
6. **m-7** — one component test at last: mount, click, assert `writeText` called, assert the announcement is not made when `writeText` rejects.
7. **M-6 / C-2** — not demo-owned. Belongs with the F-1 letter: declare + lock glass-ui, then decide whether the roster earns a merge-path seat. Until then, treat *every* browser-observable claim in this tranche as unobserved.

**Law compliance.** keyframes.js was read only; the three `node` probes imported installed package code and wrote nothing. No dev server, no Playwright, no DevTools MCP, no installs. This file is the single write. Livable-only assertions are marked UNPROVEN-NEEDS-LIVE and deferred to SS-13: the superimposed-glyph reading (M-5), the SVG `transform-box`/`transform-origin` render (M-4), the wall-clock parse cost (m-3), and the 16 px target sites' spacing exception (M-3).
