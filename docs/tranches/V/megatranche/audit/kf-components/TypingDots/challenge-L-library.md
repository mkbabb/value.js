claude-opus-5[1m]

# CHALLENGE · `TypingDots.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/TypingDots.vue` (125 L)
**Mode** static, read-only. No installs, no dev server, **no browser tooling** (owner law). Every claim below is derived from the tree; anything that needs a running page is marked **UNPROVEN-NEEDS-LIVE** and handed to the SS-13 visual audit.
**Substrate** keyframes.js `master`. `git log -- TypingDots.vue` → last touched `5377d2e2 refactor(U.F): transpose value.js heavy consumers onto subpaths` (the file predates the current HEAD by a tranche).
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Several candidate defects were **investigated and killed** before publication — they are recorded in §4 so the next auditor does not re-walk them. A false defect is worse than a missed one.

**Tally — defects 16 · blockers 0 · superlatives 6.**

Dependency closure read whole (all read-only): the component; its sole consumer `EditorStartScreen.vue`; `shell/index.ts`; `demo/kf-engine.ts`; `demo/app/main.ts`; sibling `AnimatedText.vue`, `CopyButton.vue`, `useIconSpin.ts`; and — on the library side — `src/animation/index.ts`, `load-engine.ts`, `orchestration/stagger.ts`, `engine/animation.ts`, `engine/css/css-animation.ts`, `engine/play-lifecycle.ts`, `engine/options.ts`, `internal/reduced-motion.ts`, `internal/transport/core.ts`, `physics/playback.ts`, `constants/defaults.ts`, `constants/types.ts`, `compile/frame-compiler.ts`, `compile/easing/{easing-option,easing-registry}.ts`, `easing.ts`, `waapi/{eligibility,emission,waapi-options,densify,delegation}.ts`, plus the installed `node_modules/@mkbabb/value.js/dist/subpaths/easing.{d.ts,js}`.

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| **D-1** | The `count` prop is read **once, non-reactively**; a `count` change renders un-driven dots and **orphans live animations on detached nodes**. | **MAJOR** |
| **D-2** | **Nothing on the merge path can red on this file.** No `vue-tsc` exists in the repo; `check:lib` is `src/`-only; `test:lib` excludes `test/demo/**`; the only demo-building job is nightly-gated. | **MAJOR** |
| **D-3** | The file's three magic numbers each cite `proof:typing-dots` clauses (b)/(c)/(d). **That gate is retired and unimplemented**, and the component has **zero** tests. | **MAJOR** |
| D-4 | `iterationCount: infinite` + non-zero `delay` → the engine **re-applies the delay every iteration**; the stagger degrades to unbounded phase drift on the rAF lane. | MINOR |
| D-5 | N dots → N independent `RAFPlayback` loops, where `stagger`'s own docblock demonstrates the `AnimationGroup` one-loop pairing. | MINOR |
| D-6 | `REST_OPACITY` (TS) and `opacity: 0.2` (scoped CSS) are the same number authored twice with no binding. | MINOR |
| D-7 | `.typing-dot { display: inline-block }` is **dead** — flex items are blockified. | MINOR |
| D-8 | Two `prefers-reduced-motion` authorities inside one `<h1>`; the header claims the hand-mirrored `@media` block died, and the sibling still carries it. | MINOR |
| D-9 | A `steps()` easing over 2 segments is the **pathological input** to the WAAPI densify — the full 16-stop budget is spent per segment per dot, synchronously, in the hero's first-paint window. | MINOR |
| D-10 … D-16 | floating promise · redundant `.delays()` arg · v-for ref-order assumption · partial barrel · duplicated inline-unit concern · glass-ui **F-1** bite · silent error posture. | INFO |
| **S-1 … S-6** | LIGHT/HEAVY type discipline · the late-resolve unmount guard · **the PRM delegation VERIFIED end-to-end** (closes lane-frontend §6.5) · degradation-by-construction · S3 string discipline · `noUncheckedIndexedAccess` hygiene. | **superlative** |

**Hitherto corpus.** This challenge **upholds** `lane-frontend.md` **S-8** ("JUSTIFIED BESPOKE, do not replace") — nothing below argues for a glass-ui substitution; the dogfood rationale survives every probe. It **closes** `lane-frontend.md` **§6.5**'s open item (see **S-3**: the PRM delegation the census could not verify statically is now verified, in full, by source). It **sharpens** `lane-frontend.md` **F-1** (see **D-15**: F-1's blast radius on the merge path is *nightly-only*, which is why nothing has noticed). It cites `lane-library.md` §3.3 (the LIGHT/HEAVY boundary) at **S-1**.

---

## 1. What the component is

Three `<span>`s, each carrying its own `CSSKeyframesAnimation<{opacity:number}>` looping `0.2 → 1 → 0.2` over a fixed 1200 ms cycle, phase-offset by `stagger(3, {each:160, from:"first"})`. The glyph is static text; only a number is interpolated. It is the demo's **inv-ζ seam** — the hero's own ellipsis running on the library under test.

The design intent is sound and, on the evidence, well-reasoned. The defects below are all in the **contract**, the **enforcement**, and two **engine-consumption seams** — not in the concept.

---

## 2. DEFECTS

### D-1 — the `count` prop is a construction-time read pretending to be reactive · **MAJOR**

**Provenance.**
- `TypingDots.vue:15` — `<span v-for="i in count" …>` — the template read **is** reactive.
- `TypingDots.vue:61-63` — `const delays = stagger(props.count, {…}).delays(props.count);` — a **plain module-scope read** at `setup()`. Not a `computed`, not inside a `watch`.
- `TypingDots.vue:71-101` — `onMounted` builds `anims` **once**. There is no `watch(() => props.count, …)` anywhere in the file.
- `TypingDots.vue:32-33` — the prop's own doc: *"How many dots to render **+ drive**"*. The contract promises both halves; only the render half is wired.

**Failure.** Set `count` from 3 → 5: two new spans mount with the scoped `opacity: 0.2` and **never animate** (nothing constructs their animations). Set `count` from 3 → 2: Vue unmounts the third span, but `anims[2]` still holds a live `CSSKeyframesAnimation` whose `RAFPlayback` keeps rescheduling (`physics/playback.ts:113-151`) and whose WAAPI handle keeps running — writing `opacity` to a **detached node** for the remaining lifetime of the component. `dotEls.value` updates; nothing ever reads it again. That is a genuine loop + compositor-animation leak, not merely a stale visual.

**Why it has not bitten.** The single consumer passes no props — `EditorStartScreen.vue:29` renders `<TypingDots />` bare, taking the `count: 3` default. The defect is **latent in the public surface**, not live.

**Falsifier.** Any of: (a) a `watch`/`computed` on `count` appearing in the file; (b) the props being re-declared as construction-time-only (e.g. documented as such, or collapsed to a single non-prop constant since no consumer varies them); (c) evidence that Vue tears down the orphaned animation — it does not, `anims` is a plain array in `setup()` scope and only `onBeforeUnmount` (`:103-107`) touches it.

**Note the compound.** `count` and `glyph` are *both* unused by the only consumer. A speculative props surface that is also half-broken is the worst of both: delete the props (KISS, per the standing `feedback_kiss_no_contrivance` law) **or** make `count` genuinely reactive. Do not leave it as-is.

---

### D-2 — nothing on the merge path can red on this file · **MAJOR**

**Provenance.**
- `package.json` `scripts` (full enumeration): `check = tsc --noEmit && tsc --noEmit -p tsconfig.test.json`; `check:lib = tsc --noEmit -p tsconfig.lib.json`; `test:lib = vitest run --project library`. There is **no** `vue-tsc` script.
- `vue-tsc` is **absent from `package.json` entirely** — `grep -rn "vue-tsc"` across the repo hits only `package-lock.json:3733,3736` (a *peer-dependency descriptor of some other package*, never installed as a devDep) and one `docs/tranches/S/…/CRITIQUE.json:95` line that already names the hazard: *"add bare-tsc/no-vue-tsc caveat clause."*
- Plain `tsc` does not typecheck `.vue` SFCs. `tsconfig.json` `include: ["src/", "demo/"]` therefore covers `demo/**/*.ts` only; **every `<script setup>` in the tree is invisible to it**.
- `.github/workflows/ci.yml:42,44,46,48` — the merge-path job runs `check:lib` (which is `tsconfig.lib.json`, `src/` only), `build:lib`, `test:lib`, `proof:publish`. **`npm run check` — the only script that even glances at `demo/`— is not in CI at all.**
- `vitest.config.ts` (per `lane-library.md` §5) splits `library` (excludes `test/demo/**`) from `demo`. CI runs `test:lib` → **`test/demo/**` never executes on the merge path.**
- `.github/workflows/ci.yml:53-55` — the *only* job that builds the demo is `demo-correctness`, guarded `if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'`.

**Failure.** A change to `TypingDots.vue` that breaks its types, its engine contract, or its render passes CI. The `tsconfig.json` `paths` block goes to considerable length (a 12-line comment at `tsconfig.json:16-30`) unifying the type realm for `@mkbabb/keyframes.js` so the demo's barrel imports resolve to source — **machinery whose only `.vue` consumer would be `vue-tsc`, which is not installed.** The care is real; the enforcement is absent.

**Falsifier.** Install `vue-tsc` and find it already wired somewhere I did not grep (I searched `*.json`, `*.yml`, `*.yaml`, `*.mjs`, `*.ts` outside `node_modules`); or show a CI job that runs `npm run check` or `npm test` (all projects) on push/PR.

**Scope honesty.** This is a repo-level exposure surfaced *through* this file, not a defect authored in it. It is filed MAJOR because it is the reason D-1, D-3, D-4 and D-7 could all accrete unobserved, and because it makes the type-correctness recorded in **S-6** an accident rather than a guarantee.

---

### D-3 — the file's safety argument rests on a retired gate; the component has zero tests · **MAJOR**

**Provenance.** The component cites `proof:typing-dots` three times, each time as the *reason* for a specific constant:
- `TypingDots.vue:44-46` — *"1.2s total holds under **proof:typing-dots (d)**'s ≤1.6s ceiling with margin."*
- `TypingDots.vue:47-50` — *"the left-to-right ramp … the reader's eye expects (**proof:typing-dots (b)**)."*
- `TypingDots.vue:51-53` — *"Rest opacity NEVER 0 (the perceptual fix + **proof:typing-dots (c)**'s ≥0.15 floor)."*

The gate does not exist:
- `package.json` scripts — the only `proof:*` entries are `proof:publish` and `proof:owner-golden`. No `proof:typing-dots`, no `proof:demo-smoke`.
- `find scripts/gates -type f` → 7 files, all under `surface/` and `visual/`. Nothing typing-dots-shaped.
- `scripts/lib/` → `agent-surface.mjs`, `console-budget.mjs`, `demo-driver.mjs`. The `scripts/lib/typing-dots-harness/` fixture that `docs/tranches/U/audit/lane-23-scripts-tooling-backend.md:88` records is **gone**.
- The retirement is documented: `docs/tranches/U/waves/U.E.md:139` folds `proof:typing-dots` (with four siblings) into `proof:demo-smoke` + owner-golden. `docs/tranches/T/audit/lanes/29-gate-oracle-gap.md:255` had already ruled *"`proof:typing-dots` / `proof:dogfood-hero` — re-spec with the new hero."* The re-spec never landed as a script.

And there is no test either: `grep -rn "TypingDots" test/` → **zero hits**. `test/demo/` holds 22 test files across `app/`, `instrument/`, `reference-data/`, `scenes/`, `state/` — **none** touches `components/instrument/shell/`.

**Failure.** All three constants (`CYCLE_MS`, `STEP_MS`, `REST_OPACITY`) are load-bearing for accessibility and legibility claims, are justified in prose by clause letters of a gate that cannot run, and are guarded by nothing — see D-2 for why even a re-instated gate would need a CI home. A future editor reading `:44-46` will believe `1.2s` is enforced. It is not.

**Falsifier.** Produce a runnable `proof:typing-dots` (or the `proof:demo-smoke` successor asserting clauses b/c/d) reachable from `package.json` or a workflow; or produce a test that reds when `REST_OPACITY` is set to `0`.

---

### D-4 — an infinite loop phased by `delay` drifts: the engine re-applies `delay` every iteration · **MINOR**

**Provenance (engine mechanism, cited in full).**
- `TypingDots.vue:88-90` — `delay: delays[i] ?? 0` + `iterationCount: "infinite"`. Dots 1 and 2 carry `delay` 160 ms and 320 ms.
- `engine/play-lifecycle.ts:130-145` `onEnd` — on every iteration boundary: `anim._playback.startTime = undefined;`, and (with `iterationCount = Infinity`, so `iteration >= Infinity - 1` is false) `iteration += 1`.
- `engine/play-lifecycle.ts:160-174` `advanceTo` — `if (anim._playback.startTime === undefined) { const pending = onStart(anim); … }`. `startTime` was just cleared, so **`onStart` runs again**.
- `engine/play-lifecycle.ts:118-124` `onStart` — `if (anim.options.delay > 0) { anim._playback.paused = true; return sleep(anim.options.delay).then(…) }`.

There is no first-iteration guard anywhere in the module. `delay` is therefore **re-waited on every iteration**, not applied once as CSS `animation-delay` is.

**Failure, per lane.**
- **rAF lane** (`playRAF`, `play-lifecycle.ts:268-275`): dot *i*'s effective period is `1200 + delays[i]` ms → 1200 / 1360 / 1520. The intended fixed `. → ·· → ···` march (`TypingDots.vue:47-49`) becomes an unbounded relative phase drift; after ~8 cycles dot 2 is a full cycle behind dot 0, and the "march" reads as scatter that periodically re-syncs. **UNPROVEN-NEEDS-LIVE** as a *visual* claim; the code path is CONFIRMED-by-source.
- **WAAPI lane** (the live-browser path — see below): the compositor receives `{ delay, iterations: Infinity }` once (`waapi/waapi-options.ts:100-107`) and paints correctly. But the shadow tick (`waapi/delegation.ts:52-63`) drives `advanceTo` through the same re-delay, so `animation.iteration` and every `animationiteration` event drift monotonically away from the compositor's true iteration. Nothing in the demo consumes them, so the observable damage here is nil today.

**Which lane runs.** I verified WAAPI eligibility all the way down. `defaults.ts:85` `useWAAPI: true`. `easing.ts:39` `CSS_FUNCTION_EASING = /^(cubic-bezier\(|steps\(|linear\(|step-start$|step-end$)/` matches `steps(4, jump-none)` → `cssTwinFor` returns a twin, so `eligibility.ts:167-172` (the "no faithful CSS twin" refusal) does not fire; `eligibility.ts:196-198`'s WebKit hold is `linear(`-specific and does not fire; both compiled frames share one `Easing` object so `eligibility.ts:142-148`'s uniformity check passes; `opacity` is a bare number with no unit, so the layout-unit refusal does not fire. **The animation is WAAPI-eligible in every browser.** The rAF lane is reached only where `Element.animate` is absent (jsdom, ancient UAs).

**Severity rationale.** MINOR, not MAJOR: the visible defect lives on a fallback lane that supported browsers do not take. It is filed because the component's *central visual claim* is only true by accident of WAAPI winning, and because the engine contract it leans on (`delay` = a one-time phase offset) is not the contract the engine implements.

**Falsifier.** A test showing `onStart` is not re-entered per iteration; or a guard in `play-lifecycle.ts` zeroing `delay` after iteration 0; or a demonstration that `advanceTo` is never reached with `startTime === undefined` after the first `onEnd`.

---

### D-5 — N dots, N rAF loops, where the library's own docblock shows the one-loop pairing · **MINOR**

**Provenance.**
- `TypingDots.vue:86-99` — one `CSSKeyframesAnimation` per dot; `engine/animation.ts:69` gives each its own `readonly playback = new RAFPlayback()`. Three dots ⇒ three independent generation-guarded rAF chains (`physics/playback.ts:113-151`), plus three shadow-tick loops on the WAAPI lane (`waapi/delegation.ts:63`) and three compositor animations.
- `orchestration/stagger.ts:15-23` — the primitive's **own** usage example is exactly this problem, solved the other way:
  ```ts
  const delay = stagger(items.length, { each: 50, from: "center" });
  const group = new AnimationGroup(items.map((el, i) => ({ animation: fadeIn(el), options: { delay: delay(i, items.length) } })));
  ```
- `orchestration/stagger.ts:5-8` states the design contract the component half-adopts: *"stagger is a pure delay distribution computed ONCE … then handed to the substrate that already carries it — **`AnimationGroup`'s per-child `delay`**."*
- The demo already has the precedent in a sibling: `CopyButton.vue:96-97` builds two animations and drives them from **one** `AnimationGroup`.

**Failure.** The component adopts half of a two-part library idiom: `stagger` without its stated substrate. Cost is three loop owners where one suffices — and, more importantly, an inconsistent dogfood: the file that exists to *show the library off* declines the library's own multi-target compositor.

**Caveat (honest).** `AnimationGroup` is a genuinely different lifecycle (`managed: true` children; `KeyframesAnimation.play()` **throws** on a managed animation — `play-lifecycle.ts:364-368`), so this is *evaluate*, not *mechanical swap*, and it may interact with D-4. Filed MINOR for that reason.

**Falsifier.** Show that `AnimationGroup` cannot phase-offset infinite children (i.e. its per-child `delay` does not survive `iterationCount: Infinity`), which would justify the N-loop shape outright.

---

### D-6 — `REST_OPACITY` authored twice, bound once · **MINOR**

**Provenance.** `TypingDots.vue:53` `const REST_OPACITY = 0.2;` (consumed at `:93` and `:95`) and `TypingDots.vue:123` `opacity: 0.2;` in the scoped block. Two authorities for one number, in one file, with no binding between them.

**Failure.** Changing the TS constant alone leaves the pre-first-frame paint, the PRM resting paint's *underlying* value, and (per D-3) the retired ≥0.15 floor claim silently inconsistent. The comment at `:119-124` explicitly makes the CSS literal load-bearing for two distinct behaviours — which is precisely why it must not be a free-floating duplicate.

**Fix shape (KISS, no new indirection).** Bind it: `:style="{ opacity: REST_OPACITY }"` on the dot, or a single `--typing-dot-rest` custom property set from the constant. Do not add a token file.

**Falsifier.** Evidence that the CSS literal is deliberately independent (e.g. a design rule that the static rest and the animated rest must be allowed to differ) — the comment at `:119-124` argues the opposite.

---

### D-7 — `display: inline-block` on a flex item is dead CSS · **MINOR**

**Provenance.** `TypingDots.vue:111-115` — `.typing-dots { display: inline-flex; align-items: baseline; }`. `TypingDots.vue:117-118` — `.typing-dot { display: inline-block; }`. Every `.typing-dot` is a direct child of `.typing-dots` (`:14-18`, the only markup in the file), hence a flex item — and CSS Flexbox §4 blockifies flex items, so the declared `display` is discarded.

**Failure.** Dead code that reads as intentional layout. A reader will believe the dots are inline-block and reason about line-box behaviour that does not apply.

**Falsifier.** A render of `.typing-dot` outside a `.typing-dots` container — there is none; the class appears in exactly one template and the style block is `scoped`.

---

### D-8 — two `prefers-reduced-motion` authorities inside one `<h1>` · **MINOR**

**Provenance.**
- `TypingDots.vue:83-85` — the header claims the win: *"respectReducedMotion routes the PRM resting frame through the shared `withReducedMotion` authority (**replacing the old hand-mirrored `@media` block**)."*
- `EditorStartScreen.vue:28-30` — the same `<h1>` hosts `<AnimatedText :text="title" />` and `<span class="hero-dots"><TypingDots /></span>`.
- `AnimatedText.vue:100` — `animation: charLift var(--wave-cycle, 3.6s) infinite both;` (a pure CSS `@keyframes`), and `AnimatedText.vue:121-123` — the hand-mirrored `@media (prefers-reduced-motion: reduce) { … animation: none; }` the sibling's header says was replaced.

**Failure.** One composite headline, two motion substrates and two PRM mechanisms with different semantics (engine snap-to-rest vs. CSS `animation: none`). `lane-frontend.md` §6.5 already flagged the demo's PRM coverage as *"conscientious but inconsistent in mechanism"* across three JS query styles; this is the same disease at the tightest possible scope — **inside a single element**. It also softens the inv-ζ claim at `TypingDots.vue:8-10` (*"the demo's signature animation IS the library, not pure CSS"*): the hero's *other* signature animation, one span away, is pure CSS.

**Falsifier.** A ruling that `AnimatedText` is deliberately excluded from the inv-ζ dogfood (`lane-frontend.md` S-5 records an owner constraint on per-char granularity, but that concerns `TypewriterText` substitution, not the CSS-vs-engine choice).

---

### D-9 — a `steps()` easing over two segments is the pathological input to the WAAPI densify · **MINOR**

**Provenance.**
- `TypingDots.vue:91-96` — `timingFunction: "steps(4, jump-none)"` with keyframes at `0% / 50% / 100%` → **2 compiled segments**.
- `waapi/emission.ts:33-35` — `multiSegment = animation.frames.length > 1` (true); `bakeCurve = multiSegment && canDensifyWAAPISlots(animation)` — the single numeric `opacity` slot passes `densify.ts:69-87`, so **`bakeCurve` is true**.
- `waapi/waapi-options.ts:84-88` — multi-segment ⇒ effect `easing: "linear"`; the curve is *baked into keyframes* instead.
- `waapi/densify.ts:135-153` — per segment, `scanChannelRanges` takes **65** `interpFrames` samples. `densify.ts:229-303` then runs a best-first refinement with a budget of `WAAPI_MAX_SUBSEGMENT_STOPS = 16` (`densify.ts:44`), each iteration costing one midpoint sample plus two re-scored candidates × two quarter-point probes (`densify.ts:170-190`).
- The step function is the worst case for the predicate: chord-to-curve error across an interval **containing a discontinuity** is ~half the jump height *regardless of interval width*, so it can never fall below `WAAPI_CHORD_TOLERANCE = 0.005` (`densify.ts:57`). The `worstIdx === -1` early exit at `densify.ts:262` is therefore **unreachable** here — the budget is spent in full, on every segment, for every dot.

**Failure.** Roughly `65 + 2 + 16·5 ≈ 150` synchronous `interpFrames` evaluations *per segment*, ×2 segments, ×3 dots ≈ **900 sampler calls plus ~900 `Map` allocations** (`densify.ts:88-118` allocates a fresh `ChannelSample` per probe), all inside `play()` inside `onMounted` — i.e. on the main thread during the hero's first paint. For a decorative ellipsis.

**Severity + honesty.** MINOR, and the **absolute cost is UNMEASURED** — no browser tooling was permitted, and 900 evaluations of a one-property animation may well be sub-millisecond. The claim I am willing to defend is *structural*: the component picked the one easing family for which the densify's early-exit is provably unreachable, and it did so for a first-paint element in the LCP window. Given the tranche's standing LCP history (memory: T's Q14 escalation, LCP 5141 / TBT 5988), that is worth one measurement.

**Fidelity is NOT a defect here** (killed candidate, recorded): the baked stops converge on each discontinuity by bisection, so the compositor's piecewise-linear fill approximates the jumps with ~19 ms ramps — imperceptible. I do **not** claim a stepped-vs-smooth divergence between the WAAPI and rAF lanes.

**Falsifier.** A `performance.measure` around `play()` showing the densify costs < 1 ms for all three dots — which would retire this to INFO. Or a change making `bakeCurve` false for this shape.

---

### D-10 — floating `play()` promise; the siblings all write `void` · INFO

`TypingDots.vue:98` — `anim.play();`. `play()` is `async` and *can* reject: `play-lifecycle.ts:364-368` (`managed`) and `:373` (`assertNoUnresolvedNamedSelector`). Neither is reachable here — no group owns these animations and there are no named selectors — so this is a hygiene finding, not a live hazard. Note that the `onMounted` body itself is safe (Vue routes a rejected async lifecycle hook through `callWithAsyncErrorHandling`), but a `play()` rejection escapes that channel because the promise is neither awaited nor returned. Both siblings do it properly: `CopyButton.vue:62` `void group.value?.play();`, `useIconSpin.ts:26` `void animation.play();`. There is **no eslint config in the repo** (`ls eslint.config*` → no match; `lint = depcruise src`), so `no-floating-promises` cannot catch it. **Falsifier** — an eslint config outside the paths I checked.

### D-11 — `.delays(props.count)` re-passes an argument `stagger` already defaults · INFO

`TypingDots.vue:61-63` — `stagger(props.count, {…}).delays(props.count)`. `stagger.ts:151-152` captures `defaultTotal` from the first argument and `stagger.ts:173` defaults `delays(total = defaultTotal)`. `.delays()` is exact and equivalent. Trivial, but it is the kind of noise that makes a reader hunt for a distinction that is not there. **Falsifier** — a case where the two counts legitimately differ (there is none: both read `props.count`).

### D-12 — the v-for template-ref array order is assumed, not guaranteed · INFO

`TypingDots.vue:55` `useTemplateRef<HTMLElement[]>("dotEls")`, consumed at `:78` as `els.forEach((el, i) => … delays[i] …)`. Vue's documented contract for refs inside `v-for` is that **the ref array is not guaranteed to match the source order**. A permutation would scramble the monotone `from: "first"` ramp into an arbitrary phase assignment — the exact property `TypingDots.vue:57-59` says the reader's eye depends on. **Falsifier (strong, and I expect it to hold)** — Vue 3.5's `setRef` appends in patch order for a static, keyed `v-for` over a constant integer, so in practice the order holds; this is filed INFO precisely because the risk is documentary rather than observed. The cheap immunisation is to key the delay off the loop index in the template (`:data-i="i-1"`) or to build the animation inside a per-dot ref callback.

### D-13 — the `shell/` barrel is partial, and the escape hatch is already in use · INFO

`shell/index.ts` exports 4 of the directory's 8 SFCs (`EditorShell`, `EditorHeader`, `EditorStartScreen`, `SharePopover`); `TypingDots`, `AnimatedText`, `HeroAurora`, `KeyboardShortcutsModal` are absent. A "private leaves stay unexported" reading is defensible for `TypingDots` (its only import is the relative `EditorStartScreen.vue:63`) — but `HeroAurora` falsifies that reading: `App.vue:138` imports two components *from the barrel* and `App.vue:142` imports `HeroAurora` by **deep path** on the next line. So the barrel's membership rule is not "public surface"; it is unstated. **Falsifier** — a documented rule for barrel membership in this directory.

### D-14 — the "unbreakable inline unit" concern is asserted twice, in two files, by two mechanisms · INFO

`EditorStartScreen.vue:160-163` — `.hero-dots { display: inline-block; white-space: nowrap; }`, documented as *"one unbreakable inline unit … the dots never wrap apart."* `TypingDots.vue:111-115` — `.typing-dots { display: inline-flex; }`, whose default `flex-wrap: nowrap` plus the absence of inter-item whitespace already guarantees the same thing. The outer `white-space: nowrap` is redundant against the inner flex container. Harmless; recorded because two files now co-own one invariant. **Falsifier** — a case where `.typing-dots` renders outside `.hero-dots`; there is none.

### D-15 — where lane-frontend **F-1** bites this glass-free component · INFO

`TypingDots.vue` imports **no** glass-ui — it is one of the 21 glass-free `.vue` files in `lane-frontend.md` §3. It is nonetheless exposed twice:

1. **Buildability.** Per F-1, `@mkbabb/glass-ui` is absent from `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` is load-bearing for the whole cascade, so a lockfile-faithful `npm ci` cannot build the demo *at all* — this component included, glass-free or not.
2. **Its own import specifier.** `TypingDots.vue:27-28` imports from `@mkbabb/keyframes.js`, which resolves only through the vite **self-alias**, and that alias's stated justification is glass-ui: `vite.config.ts:28-36` (quoted in `lane-frontend.md` §8) — *"the self-alias dedupes glass-ui onto the SAME keyframes instance the demo uses."* Fixing F-1 must not remove the alias, or this file's import breaks.

**A sharpening of F-1, not a contradiction.** F-1 deduces *"`npm ci` is currently broken."* The obvious objection is that `.github/workflows/ci.yml:67` runs `npm ci` and CI is presumably green. That objection **fails**: `ci.yml:53-55` gates the only `npm ci`-plus-demo-build job behind `schedule || workflow_dispatch`, and `deploy-pages.yml` consumes a `last-demo-green` tag rather than the merge run. So an F-1 breakage is invisible on every push and PR and would surface only on a nightly. **This explains why nothing has noticed** — and it means F-1's remediation cannot be validated by "CI is green." **Falsifier** — a successful nightly `demo-correctness` run at a SHA after the glass-ui declaration was removed would falsify F-1's deduction outright; that is a cheap, decisive probe and I recommend it before the F-1 wave.

### D-16 — silent no-op error posture · INFO

`TypingDots.vue:73` — `if (!els) return;` with no diagnostic. There is also no `els.length === props.count` reconciliation: a partial ref population would silently drive a subset. The library's own posture is *fail-explicit* throughout (`engine/options.ts:1-15`: *"present-but-malformed input THROWS a typed `AnimationOptionError`"*; `easing.ts:67-69`: *"never an unhandled rejection, never a silent identity fallback"*), and `CSSKeyframesAnimation` even carries a structured `diagnostics` channel (`engine/animation.ts:100-104`). The dogfood component consults none of it. Mitigated — genuinely — by **S-4**. **Falsifier** — a demo-wide convention that mount-time ref-misses are silent (I found none; `useIconSpin.ts:23` takes the same silent-return shape, so a convention may exist de facto).

---

## 3. SUPERLATIVES (L-18 runs both ways)

### S-1 — textbook LIGHT/HEAVY discipline; the type import is the one shape that compiles · **exemplary**

`TypingDots.vue:27` `import type { CSSKeyframesAnimation } from "@mkbabb/keyframes.js";` + `:28` `import { loadAnimationEngine, stagger } from "@mkbabb/keyframes.js";` + `:75` `const { CSSKeyframesAnimation } = await loadAnimationEngine();`.

This is not merely conventional — it is the **only** shape that works. `src/animation/index.ts:283` re-exports the class as `export type { KeyframesAnimation, CSSKeyframesAnimation } from "./engine"` — **type-only**. A value import of `CSSKeyframesAnimation` from the barrel would not resolve. And `load-engine.ts:1-10` states the contract the component honours exactly: the `typeof import()` reference is erased, so the LIGHT barrel keeps *"no eager parser/color edge."* Consequence: the hero's first-paint component adds **zero** eager value.js weight to the static graph (`lane-library.md` §3.3 — `load-engine.ts:124` is *the* value.js firewall), while `stagger` rides the LIGHT surface legitimately (`stagger.ts:10-13`: *"LIGHT module … pulls no parser/color graph"*). Both halves of the boundary, correct, in three lines. **Falsifier** — find an eager value.js edge reachable from this file's static imports; there is none.

### S-2 — an explicit late-resolve / early-unmount race guard · **exemplary**

`TypingDots.vue:67-69` (`let unmounted = false;` with the reason written down), `:76` (`if (unmounted) return;` immediately after the await), `:104` (`unmounted = true` first thing in `onBeforeUnmount`). Plus `:72` captures `dotEls.value` **before** the await, so the null-guard at `:73` is meaningful rather than decorative.

Unmount-during-async-init is the classic leak in this codebase's own history — `test/demo/scenes/scene-raf-leak.test.ts:1-16` records four scene owners that leaked rAF loops perpetually because their cleanup hung off a hook that never fired. This component closes the race up front, by hand, and says why. `onBeforeUnmount` is sufficient here (the demo uses a keyed `<Suspense>` with **no** `KeepAlive` — `useSceneVisibilityPause.ts:5-7`), so the hook choice is correct too. **Falsifier** — a `KeepAlive` ancestor, which would make `onBeforeUnmount` skip on deactivation; there is none.

### S-3 — the PRM delegation is **correct**, verified end-to-end — this closes `lane-frontend.md` §6.5 · **exemplary + census correction**

`lane-frontend.md` §6.5 listed this file under **Gaps**: *"`TypingDots.vue:121` only mentions PRM in prose (deferring to the engine's resting state) … Neither carries a local guard — correct if the delegation holds, **unverified statically**."* The delegation **holds**. Full chain:

1. `TypingDots.vue:91` `respectReducedMotion: true` → `engine/options.ts:151-161` `normalizeBoolean` accepts it (overriding `defaults.ts:86` `respectReducedMotion: false`).
2. `play-lifecycle.ts:375-381` → `internal/reduced-motion.ts:153-162` `withReducedMotion(true, snap, run)` → under an active query, `snap`.
3. `snap` = `playReducedMotion` (`play-lifecycle.ts:320-330`) → `anim.fillForwards()` → `engine/animation.ts:329-331` → `interpFrames(duration = 1200, true)`.
4. At `t = 1200` the active compiled frame is `50%→100%`, `scaled = 1` (`interpolate.ts:249`), `eased = frame.timingFunction.fn(1)`.
5. **The near-miss:** `steppedEase(4, "jump-none")` computes `(floor(t·4) + 0) / 3`, which at `t = 1` is `4/3` — an *overshoot*. Left unclamped it would lerp `1 → 0.2` past the endpoint to `≈ −0.07`, i.e. **the PRM rest paint would blank the dots to `opacity: 0`** — the exact perceptual failure the component was built to cure. The installed value.js clamps it: `node_modules/@mkbabb/value.js/dist/subpaths/easing.js:238` — `Math.max(0, Math.min(1, (Math.floor(e * n) + a) / i))`.
6. Therefore `eased = 1`, the paint is exactly `REST_OPACITY = 0.2`, and the prose at `TypingDots.vue:119-124` is **precisely right**: *"the engine snaps to the resting frame, which the keyframe's 0%/100% sets to REST_OPACITY → readable."*

A prose claim about a delegated behaviour, three modules and one npm package away, that survives a full trace including a clamp it never mentions. Rare. **Falsifier** — a value.js release that drops the clamp in `steppedEase`; a pin-worthy dependency on `@mkbabb/value.js@4.0.0`'s exact behaviour (`package.json` pins it EXACT, per `lane-library.md` §1 — so the dependency is already held).

### S-4 — degradation by construction · **exemplary**

`TypingDots.vue:117-124` — the scoped `opacity: 0.2` is chosen so the dots are *readable before the first engine frame*. Combine with the failure modes: a chunk-load failure inside `loadAnimationEngine()` (`main.ts:50` already `.catch(() => undefined)`s the warm), a `play()` rejection, an unmount race, a PRM snap, an `els` null-return (**D-16**) — **every** path lands on visible static dots. The component cannot produce a blank ellipsis. That is the actual cure for the H-era bug the header describes at `:2-5`, and it is achieved without a single runtime guard.

### S-5 — S3 discipline: no string ever reaches an interpolation slot · **exemplary**

`TypingDots.vue:8-11` and `:15-17` — the glyph is static `<span>` text content; the keyframes carry `opacity` only. The engine's numeric fast path (`interpolate.ts:263-275`, the SoA `lerpArray` fold over `Float64Array` endpoints) is therefore taken, and the flex-item structure means the three dots interpolate independently. `aria-hidden="true"` at `:14` keeps a perpetually-mutating decorative loop out of the `<h1>`'s accessible name — which matters, because the sibling `AnimatedText.vue` (per `lane-frontend.md` §4) had to hand-roll an sr-only mirror to solve the same problem. Here it is solved by not creating it.

### S-6 — strict-mode hygiene on a surface nothing typechecks · **exemplary (and the sharpest evidence for D-2)**

`tsconfig.json:8-9` sets `noUncheckedIndexedAccess: true` and `exactOptionalPropertyTypes: true`. `TypingDots.vue:88` writes `delay: delays[i] ?? 0` — the `??` that `noUncheckedIndexedAccess` demands. `TypingDots.vue:65` types the accumulator `CSSKeyframesAnimation<{ opacity: number }>[]`, which satisfies `Vars` (`constants/types.ts:39-41`) and flows correctly through `fromKeyframes`'s `return this`. Every type in the file is right.

And **none of it is checked** — see D-2. The author wrote to a standard the toolchain never verified. That is the strongest argument in this document for installing `vue-tsc`: the discipline is already there and deserves a guard.

---

## 4. Candidate defects INVESTIGATED AND KILLED

Recorded so the next auditor does not re-walk them, and so this challenge's tally is honest.

| Candidate | Why it is **not** a defect |
|---|---|
| "Should use `demo/kf-engine.ts`'s warmed `kfEngine()` instead of `loadAnimationEngine()`." | `kf-engine.ts:12-14` explicitly blesses the per-site pattern: *"Most demo sites await `loadAnimationEngine()` directly at their point of need."* 12 demo sites do. And `main.ts:50` awaits `warmKfEngine()` before `app.mount()`, so the barrel promise is already memoized — the await costs a microtask, not a fetch. **Idiomatic.** |
| "Should use the library's `typingCursor` preset (`presets/catalog.ts:181-189`, `steps(2, jump-start)`, `iterationCount: Infinity`) instead of hand-authoring." | `presets/catalog.ts` → `classicData.typingCursorKeyframes` animates **`border-right-color`** — a caret, not opacity dots. Not a substitute; substituting would break the ≥0.15 opacity floor outright. |
| "The `mirrors CopyButton.vue:24` citation at `TypingDots.vue:24` is false (CopyButton is one-shot, not infinite, and uses `AnimationGroup`)." | `CopyButton.vue:24` **is** the `loadAnimationEngine` import line, so the citation reads correctly as "mirrors that import idiom." The parenthetical is ambiguous, not wrong. Too weak to file. |
| "Should register with `useSceneVisibilityPause` (the B-3 CWV/battery policy)." | That composable is explicitly **scene**-scoped (`useSceneVisibilityPause.ts:5-7`: *"the active scene's rAF/WebGL loop … exactly ONE scene mounted at a time"*); `TypingDots` is chrome. And both rAF and compositor animations are already suspended by the UA in a hidden tab. **No defect.** |
| "`onBeforeUnmount` is the wrong hook; the repo's canonical dispose seam is `onScopeDispose`." | `scene-raf-leak.test.ts:1-16` re-homed cleanup off `onDeactivated` (a `KeepAlive`-only hook that never fired), not off `onBeforeUnmount` — which fires on every real unmount. With no `KeepAlive` in the tree, the hook is sufficient. |
| "The WAAPI densify smooths the `steps()` cadence into a ramp — a stepped-vs-smooth divergence between lanes." | Bisection converges on each discontinuity; with a 16-stop budget the residual ramps are ~19 ms. Imperceptible. Only the *cost* survives, as **D-9**. |
| "`iterationCount: 'infinite'` may not normalize." | `engine/options.ts:56-62` explicitly accepts `"infinite"` → `Infinity`, and `onEnd`'s `iteration >= iterationCount - 1` is correctly false forever. **Works.** |
| "`setTargets` after `fromKeyframes` mis-orders the parse." | `_defaultTransform` (`engine/animation.ts:155-156`) reads `this.targets` at *call* time, and `setTargets` re-runs `bindTargets` (`:465-472`). Order is safe, and it preserves `usesDefaultRenderer` identity, which is what keeps WAAPI eligible. |
| "Module too large / god-module." | 125 L, one concern, ~40 L of code. **Goldilocks.** (The ~48 % comment density carries three stale gate citations — that is **D-3**, not a size defect.) |
| "Should be replaced by glass-ui `Pulse`/`PagerDots`." | Upholds `lane-frontend.md` **S-8**: replacing it removes library coverage. **Keep.** Every probe in this challenge reinforces that verdict. |

---

## 5. Recommended order

1. **D-2** first — install `vue-tsc`, add it to `check`, and put `check` (or a demo-scoped twin) on the **merge path**. Nothing below is verifiable until a change to this file can red something.
2. **D-3** — re-spec `proof:typing-dots` clauses (b)/(c)/(d) as a `test/demo/instrument/` test (cheap: three assertions over the constants + the `stagger` monotonicity), or **delete the three citations**. Do not leave prose citing a retired gate.
3. **D-1** — decide the props contract: delete `count`/`glyph` (no consumer varies them) or make `count` reactive. Deleting is the KISS answer.
4. **D-6, D-7, D-11** — one-line hygiene, land together.
5. **D-4, D-5** — the engine seam. D-4 wants a ruling *in the library* (is `delay` a one-time phase offset or a per-iteration wait?); D-5 depends on that answer.
6. **D-9** — one `performance.measure`. Retire to INFO or act.
7. **D-8** — the hero's PRM/motion-substrate split; belongs with any `AnimatedText` wave (`lane-frontend.md` S-5), not here.
8. **D-15** — before the F-1 wave, run the decisive nightly probe named above.

---

## Provenance note

Every library claim is sourced from `/Users/mkbabb/Programming/keyframes.js/src/` and `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/value.js/dist/` — read-only. Every demo claim is sourced from `/Users/mkbabb/Programming/keyframes.js/demo/`. No file in keyframes.js, value.js, or glass-ui was written, mutated, or executed; no installs, no dev servers, no browser tooling. The only write performed by this lane is this document.
