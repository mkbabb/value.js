SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.b` — G-KFW9-7 · THE TWO-DIRECTION PRM PAIR, SUBSTRATE NAMED

**Wave** X.KF.W9 (Track B) · **unit** `.b` · **2026-09-17** · substrate **`55e9bf0d`** (SUBSTRATE-PIN §1).

The gate: *"CLOSES: **P-9 + U-1 in ONE pass, substrate NAMED** (HEAD = rAF lane, dots stop;
worktree/origin-master = WAAPI lane, dots keep pulsing). The pair decides the unification's shape."*

**The pass is ONE pass because it is ONE surface.** Measured here and not inherited: the RELEASE
direction's dots and the ENGAGEMENT direction's dots are the **same DOM node** —
`EditorStartScreen.vue:29` `<span class="hero-dots"><TypingDots /></span>` (import at `:63`), inside the
hero `<h1 class="hero-display …">` at `:27`, i.e. **on the LCP heading**. KF-EST-11 and KF-TD-1 are two
questions about one instance, which is why the gate forbids splitting them.

**Status: the live pass is UNMEASURED — the capture band is blocked at this seat** (`DESKTOP-CELL-B.md`).
What is published here is (1) the whole static substrate of both directions, re-derived at the pin, and
(2) the ONE-PASS protocol with its discriminator and falsifier, so the pass is unambiguous the moment the
band opens. **No direction is reported as witnessed.**

---

## 1 · THE INSTRUMENT — the dots, at their bytes

`demo/components/instrument/shell/TypingDots.vue`, read at `55e9bf0d`:

| coordinate | byte |
|---|---|
| `:46` | `const CYCLE_MS = 1200;` |
| `:53` | `const REST_OPACITY = 0.2;` |
| `:61` | `const delays = stagger(props.count, { each: STEP_MS, from: "first" }).delays(` |
| `:86` | `const anim = new CSSKeyframesAnimation<{ opacity: number }>({` |
| `:87-91` | `duration: CYCLE_MS,` · `delay: delays[i] ?? 0,` · `iterationCount: "infinite",` · `timingFunction: "steps(4, jump-none)",` · **`respectReducedMotion: true,`** |
| `:92-96` | `.fromKeyframes({ "0%": { opacity: REST_OPACITY }, "50%": { opacity: 1 }, "100%": { opacity: REST_OPACITY } })` |
| `:97-99` | `anim.setTargets(el); anim.play(); anims.push(anim);` |

**`REST_OPACITY = 0.2` is KF-EST-11's "frozen at 0.2", located at its byte** — the `100%` frame *is*
`opacity: 0.2`, so the engine's gated snap-to-final lands the dots exactly there. The row's mechanism is
not a description; it is this constant.

**The file's own docblock states the contract this gate tests** (`:82-85`): *"The engine owns the loop;
`respectReducedMotion` routes the PRM resting frame through the shared `withReducedMotion` authority
(replacing the old hand-mirrored `@media` block)."* The demo removed its CSS mirror and delegated to the
engine — so **if the engine's live-flip path does not reach this lane, nothing else will.**

---

## 2 · DIRECTION A — **RELEASE** (KF-EST-11's P-9): `reduce` → `no-preference`

**The banked mechanism**: *"on reduce→no-preference the CSS wave re-arms, the engine dots never do (PRM
evaluated once at `play()`)."*

**Static substrate, re-derived:**

- The **CSS wave** is `AnimatedText.vue:100` `animation: charLift var(--wave-cycle, 3.6s) infinite both`,
  gated by the `@media (prefers-reduced-motion: reduce)` block at `:121` → `:123 animation: none`. A media
  query is **continuously evaluated by the UA**: on release, the block stops matching and the declaration
  returns. **Re-arming is the CSS layer's default behaviour and costs no code.**
- The **engine dots** take their PRM decision inside `play()` — `strategies.ts:109-110`'s
  `beginPlay(anim._playback, () => withReducedMotion(anim.options.respectReducedMotion, …))`. `play()` is
  called **once**, at mount (`TypingDots.vue:98`). There is no `watch` on the media query in the file
  (⟨`grep -n 'watch\|useMediaQuery\|matchMedia' TypingDots.vue`⟩ → no PRM watcher; the only
  `prefers-reduced-motion` token in the file is the **prose** at `:121`).
- The engine's only re-evaluation path is the per-tick flip at `frame.ts:131-137` — **and that path runs
  only while a rAF loop is ticking**. An animation already snapped to its final frame has no loop, so
  **there is no code path by which a released preference re-arms it.**

**PREDICTION, falsifiable**: with the page loaded under `reduce` and the preference then released,
**AnimatedText's per-char wave resumes and the dots stay at `opacity: 0.2`, permanently.**
**FALSIFIER**: if the dots resume, the row dies and the asymmetry is not real.
**DISCRIMINATOR**: the two elements are adjacent inside the same `<h1>` — one frame contains both, so the
comparison cannot be confounded by page state, theme or timing.

---

## 3 · DIRECTION B — **ENGAGEMENT** (KF-TD-1's U-1): `no-preference` → `reduce`, live

**The banked mechanism**: *"on the SHIPPING (WAAPI-delegated) lane a live flip to reduce is NEVER
observed (`snapToReducedMotion`'s sole caller is `playFrame`, the rAF lane; `shadowTick` never consults
`withReducedMotion`); the library docblock asserts the opposite verbatim."*

**Every anchor re-derived at the pin this seat — whole outputs:**

⟨`git grep -n 'snapToReducedMotion' 55e9bf0d -- src/ demo/ test/ scripts/`⟩ →
```
src/animation/engine/play-lifecycle/frame.ts:14:import { snapToReducedMotion } from "./strategies";
src/animation/engine/play-lifecycle/frame.ts:137:        snapToReducedMotion(anim);
src/animation/engine/play-lifecycle/index.ts:11: *                    snapToReducedMotion / play
src/animation/engine/play-lifecycle/index.ts:23: * `renderFrame`/`cancelWAAPI`/`snapToReducedMotion` (DD-3) and the file-local /
src/animation/engine/play-lifecycle/strategies.ts:7: * snap (`snapToReducedMotion`), and the `play()` front-door that arbitrates
src/animation/engine/play-lifecycle/strategies.ts:10: * back-edge. `snapToReducedMotion` is a module-internal cross-file export (kept
src/animation/engine/play-lifecycle/strategies.ts:76:export function snapToReducedMotion<V extends Vars>(
```
**ONE call site** (`frame.ts:137`); the other five hits are the import, two barrel-docblock mentions, one
module-docblock mention and the declaration. `frame.ts:137` sits inside `playFrame` (decl `:121`) — **the
rAF lane**.

⟨`git grep -c 'withReducedMotion' 55e9bf0d -- src/animation/waapi/delegation.ts`⟩ → **exit 1, no hits.**
⟨`git grep -n 'shadowTick' 55e9bf0d -- src/animation/waapi/delegation.ts`⟩ →
```
src/animation/waapi/delegation.ts:53:    const shadowTick = (now: number): boolean | Promise<boolean> => {
src/animation/waapi/delegation.ts:64:    animation.playback.loop(shadowTick);
```
**`shadowTick` never consults `withReducedMotion`. The claim stands at the frontier.**

**The docblock that asserts the opposite**, `strategies.ts:66-75`, read verbatim this seat — its closing
sentence, which is the assertion under test:

> *"The WAAPI lane snaps via the same path: the up-front gate already routes reduced-motion away from
> WAAPI, and a live flip on a WAAPI animation cancels the compositor handles before settling."*

Its declaration follows at `:76` `export function snapToReducedMotion<V extends Vars>(`.

### 3.1 · Which lane do the dots actually take? — the chain, measured, with its one undecided link

| link | byte | reading |
|---|---|---|
| WAAPI is opt-**out**, not opt-in | `constants/defaults.ts:86` `useWAAPI: true,` | the default is WAAPI |
| the demo never overrides it | ⟨`grep -rn 'useWAAPI' demo/`⟩ → **0 hits** | the dots inherit `true` |
| the play front door branches on it | `strategies.ts:117` `if (anim.options.useWAAPI) {` | enters the WAAPI branch |
| …then on eligibility | `strategies.ts:118-123` `const elig = isWAAPIEligible(anim); if (elig.eligible) { … return playViaWAAPI(anim); } anim.waapiIneligibleReason = elig.reason; return playRAF(anim);` | **the one undecided link** |

`isWAAPIEligible` (`src/animation/waapi/eligibility.ts`) rejects for: no DOM targets (`:114`), no
`Element.animate` (`:117-119`), custom transform function (`:131-133`), non-uniform per-frame timing
(`:145-147`), *"easing has no faithful CSS twin"* (`:176-178`), WebKit + `linear()` easing (`:193-195`),
layout-dependent units (`:251-253`), color interpolation (`:257-259`); otherwise `{ eligible: true }`
(`:266`). The dots animate **`opacity`** with **`steps(4, jump-none)`** — no layout unit, no color, no
custom renderer, and `steps(4, jump-none)` is a CSS easing with an exact twin. **Every enumerated
rejection reads as not-applicable, but this seat does not adjudicate the predicate by reading it** — it is
decided at run, and §4 reads it **from the running page** rather than predicting it.

**This is the SUBSTRATE INVERSION made precise** (ruling 1): at the disqualified `8281638c` the corpus was
measured on the rAF lane, where a live flip *does* converge (`frame.ts:137`); at `origin/master` the lane
is WAAPI-by-default and the flip has no path. **The lane, not the preference, decides the outcome — so
every capture in this pair names its substrate or proves nothing.**

**PREDICTION, falsifiable**: with the page loaded under `no-preference` and the preference then engaged,
**the dots keep pulsing** (no snap to `opacity: 0.2`) while any CSS-layer motion under a `@media` block
snaps immediately.
**FALSIFIER**: if the dots snap, either the lane is rAF at this substrate (read it, §4.3) or the WAAPI
lane does consult the gate — and the docblock at `strategies.ts:66-75` is then **true**, which kills the
row.

---

## 4 · THE ONE-PASS PROTOCOL — owed, not run

Cell **`safari-app/desktop`**. Substrate named on every frame. One page load, one preference toggle
sequence, four frames — **no probe double-spent** (S-8), and the pair is never split across loads.

1. **F1** — load `/` (the editor start screen) under **no-preference**. Frame: the `<h1>` whole,
   AnimatedText wave + dots both live.
2. **F2** — **engage** `reduce` while the page is live (macOS System Settings ▸ Accessibility ▸ Display ▸
   Reduce motion; the OS toggle, never a devtools emulation — this is the *real Safari* cell and an
   emulated preference is a different cell). Frame after ≥ 2 × `CYCLE_MS` (2.4 s). **DIRECTION B.**
3. **F3** — **release** to no-preference, page still live. Frame after ≥ 2.4 s. **DIRECTION A.**
4. **F4** — reload under `reduce` (the up-front gate rather than the live flip) — the control that
   separates *"the live flip has no path"* from *"PRM does not reach this animation at all"*.

**4.3 · Read the lane, do not infer it.** In the same session, before F2:
`document.getAnimations().filter(a => a.effect?.target?.closest?.('.hero-dots'))` — a **non-empty** result
proves the WAAPI lane (native `Animation` objects exist); an **empty** result proves the rAF lane. The
engine's own diagnostic `anim.waapiIneligibleReason` (set at `strategies.ts:123`, cleared at `:120`) is
the corroborating read where the instance is reachable. **The lane is a measurement, not a prediction.**

**DISCRIMINATOR for the pass as a whole**: AnimatedText (CSS layer) and TypingDots (engine layer) are in
the **same heading**, so each frame carries its own control. A frame in which *both* change, or *neither*
changes, discriminates nothing and must be re-shot.
**FALSIFIER**: any frame that does not name substrate ref + sha + cell, or that is taken against a
bundle whose provenance is not a named ref, voids the pair.

---

## 5 · Gate reading

**G-KFW9-7: RED → RED (correctly).**

**BEFORE** (wave-open witness): *"neither direction witnessed."*
**AFTER at this seat**: still neither direction witnessed — **the gate closes on ONE LIVE PASS and this
seat took none.** What changed is that the pass is now fully specified against measured bytes: both
directions' mechanisms re-derived at the pin (7 anchors, whole outputs), the single shared surface
identified (`EditorStartScreen.vue:29` → the LCP `<h1>`), the lane chain measured to its one undecided
link with a **runtime** reader for it, and a four-frame protocol with a discriminator and a falsifier.

*A gate whose subject is "was this observed?" cannot be closed by any amount of reading. It is not closed
here, and the register says so in the same breath as it publishes the reading.*
