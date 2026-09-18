claude-opus-5[1m]

# CHALLENGE · `SequencePlayhead.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequencePlayhead.vue` (87 lines)
**Tree HEAD:** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE**.
**Import closure read whole:** `@mkbabb/value.js/math` (`node_modules/@mkbabb/value.js/dist/subpaths/math.js` + `.d.ts`) — that is the component's *entire* import list. Seam files read whole: `SequenceTarget.vue`, `SequenceTarget.css`, `SequenceAxis.vue`, `SequenceScrubber.vue`, `SequenceScene.vue`, `useSequenceDemo.ts`, `useSequenceInstrument.ts`, `sequenceKeys.ts`, `demo/styles/style.css`, `demo/styles/design-idioms.css` (idiom block), `demo/DESIGN.md`, plus the glass-ui 7.0.0 installed `dist/` export surface.

**Verdict: 11 defects · 0 blockers · 5 superlatives.**

This is a *good* component that consumes almost nothing and therefore has almost nothing to get wrong on the import graph — and it is precisely there that the census under-reads it. Its real consumption surface is not its one import. It is **five inherited CSS custom properties, two copied geometry constants, and one design-system token that no import graph can see.** Only one of those eight edges is compiler-checked.

---

## 0. Headline

| # | Finding | Sev |
|---|---|---|
| C-1 | The horizontal sweep domain is hand-derived from `--track-inset` while the ruler it must index is grid-placed at `grid-column: 2` over a parent whose **column-gap is 0** → a 0.75rem (12px) registration error. `grid-column: unset` (`:25`) is an explicit opt-out of the one mechanism that makes it correct by construction. | **MAJOR** |
| C-2 | The true input contract is 1 typed prop + **5 undeclared inherited custom properties** + 2 copied parent constants; 2 of the 5 tokens are consumed with **no fallback** while the other 3 have one. | **MAJOR** |
| C-3 | `demo/DESIGN.md:53–57` makes the playhead cap a named `--specular` consumer and forbids the literal; `--specular` was never defined and `:63–64` ship raw `white`. | **MAJOR** |
| C-4 | The header's `no per-frame JS` claim (`:8`) is false — `progress` is a Vue ref written every frame; this is the one motion element in the scene the engine does **not** paint. | **MAJOR** |
| C-5 | `top: calc(0.75rem + 1.25rem)` (`:26`) hardcodes the **desktop** axis height; `SequenceAxis` compresses under `max-width:1023px` with no matching override here. | MINOR |
| C-6 | `clamp(progress,0,1)` (`:10`) is a provable no-op and does not guard the one input that breaks the CSS. | MINOR |
| C-7 | `--playhead-p` is unregistered while its structural twin `--ball-p` is `@property`-registered "so the bloom INTERPOLATES". | MINOR |
| C-8 | The 32px comet `::after` extends left of the track origin into the 3.25rem label column, unclipped, at the progress the scene rests at. | MINOR |
| C-9 | Import-invisible glass-ui edge: `--radius-pill` (`:48`) resolves only from `glass-ui/dist/styles/theme/radius.css`. | MINOR |
| C-10 | `will-change: transform` (`:51`) is unconditional and permanent on a never-unmounted element whose other animated property it cannot help. | INFO |
| C-11 | `z-index: var(--z-seq-playhead)` (`:31`) consumes a scene-local z token outside the single-sourced glass-ui `--z-*` scale. **Prior in-repo ruling stands — no new defect.** | INFO |

---

## 1. Consumption surface, measured

### 1.1 What it imports — one edge, and it is the safe one

```
demo/scenes/sequence/SequencePlayhead.vue:15
    import { clamp } from "@mkbabb/value.js/math";
```

That is the whole import list. No `@mkbabb/keyframes.js`, no `@kf-engine`, no `@mkbabb/glass-ui`, no `reka-ui`, no `vue` runtime import beyond the compiler macro.

**`/math` is a declared value.js 4.0.0 subpath** (`node_modules/@mkbabb/value.js/package.json` exports → `./math` → `dist/subpaths/math.js`), and `@mkbabb/value.js: "4.0.0"` is a declared `dependencies` entry of keyframes.js (`package.json:69`; corroborated by lane-library §1). The edge is legitimate and lockfile-backed — note the contrast with **lane-frontend F-1**, where the glass-ui edge is not.

**R1 is unreachable from here — proven, not asserted.** `dist/subpaths/math.js` is 1110 bytes and contains **zero import statements** (`grep -o 'from"[^"]*"' math.js` → empty). It is nine self-contained numeric functions; `clamp` is literally `Math.min(Math.max(e,t),n)`. The value.js CSS parser graph — and with it the R1 `parseCssColor("oklch()")` shipping crash class — has no path into this component. Compare the sibling `scenes/square/useSquareTumble.ts:2`, which imports `parseCssColor` from `/css` and which lane-library §4 names "the known R1 crash surface". SequencePlayhead is on the right side of that line.

*Falsifier:* a non-empty import list in `dist/subpaths/math.js`, or a `/math` re-export that reaches `/css`. Neither exists in the installed 4.0.0.

**No, it cannot get `clamp` from keyframes.js.** I checked, because the obvious challenge is "the demo is the library's proving ground, why is it reaching past the library?" — `src/animation/internal/leaves.ts:28` does `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math"` (lane-library **LEG-3**), but `src/animation/index.ts` does **not** re-export `leaves` (the only match for `internal/leaves` in the barrel is the doc comment at `:9`), and `dist/keyframes.d.ts` declares no `clamp`. The direct value.js edge is forced. **Not a defect** — recorded so the next auditor does not re-file it.

### 1.2 What it consumes that no import graph shows

| edge | site | source of truth | typed? | fallback? |
|---|---|---|---|---|
| prop `progress` | `:17` | `SequenceTarget.vue:70` | **yes** | n/a |
| `--track-inset` | `:28` | `SequenceTarget.css:39` | no | **NO** |
| `--z-seq-playhead` | `:31` | `SequenceTarget.css:22` | no | **NO** |
| `--ball-tone` | `:47,50,62,63,64,81` | `SequenceTarget.css:8` / `.seq-row` inline | no | yes → `--color-progress` |
| `--seq-glow` | `:49,50,81,84` | `SequenceTarget.css:10,29` | no | yes → `0` |
| `--scrub-dir` | `:78` | `SequenceTarget.css:24` + `SequenceTarget.vue:63` | no | yes → `1` |
| `--radius-pill` | `:48` | **glass-ui** `dist/styles/theme/radius.css` | no | **NO** |
| `--color-progress` | `:47,50,62,63,64,81` | `demo/styles/style.css:163` | no | n/a (terminal) |
| pad-top `0.75rem` | `:26` | copy of `SequenceTarget.css:45` | no | n/a |
| axis height `1.25rem` | `:26` | copy of `SequenceAxis.vue:23,25` | no | n/a |

Eight cross-file dependencies; **one** survives a rename check by the compiler. lane-frontend §3 counts this file among "21 `.vue` with no glass-ui import" — accurate as an import census, and an under-read of the coupling: row 7 is a hard glass-ui dependency.

---

## 2. Defects

### C-1 (MAJOR) — the sweep domain is hand-derived; the ruler it indexes is grid-placed. They are 12px apart.

**Claim.** `.seq-playhead-track`'s horizontal domain and `.seq-axis`'s cannot both be right, and the playhead's is the one derived by hand.

**Evidence — the geometry, all from the tree.**

```
SequenceTarget.css:36–47   .seq-stage { position: relative; display: grid;
                             grid-template-columns: var(--label-col) 1fr;   /* 3.25rem 1fr */
                             gap: 0.5rem 0;                                 /* row 0.5rem, COLUMN 0 */
                             padding: 0.75rem 1rem 1rem; border: 1px … }
SequenceTarget.css:37–39   --label-col: 3.25rem; --col-gap: 0.75rem;
                           --track-inset: calc(var(--label-col) + var(--col-gap));   /* = 4rem */
SequenceAxis.vue:22        .seq-axis { grid-column: 2; }        (direct child — SequenceTarget.vue:66)
SequencePlayhead.vue:25    grid-column: unset;                  /* → auto */
SequencePlayhead.vue:28–29 left: calc(1rem + var(--track-inset));  right: 1rem;
```

`.seq-playhead-track` is `position: absolute` with all grid-placement properties `auto`, inside a `position: relative` grid container. Its containing block is therefore the grid container's **padding box** — by the general rule for a relatively-positioned containing block, and independently by CSS Grid §10.1 ("if a grid-placement property is `auto`, its corresponding edge is the padding edge of the grid container"). Both routes give the same box, so the `1rem` in `:28` correctly crosses `.seq-stage`'s padding. *That part is right, and I checked it precisely because it looks wrong.*

Take the padding-box left edge as x = 0:

| edge | x |
|---|---|
| content-box left (padding-left `1rem`) | `1rem` |
| parent grid **column 2** start (`3.25rem` + column-gap **0**) | `4.25rem` |
| `.seq-axis` left — it *is* column 2 | **`4.25rem`** |
| `.seq-playhead-track` left (`1rem + 4rem`) | **`5rem`** |
| both right edges (`right:1rem` ≡ content-box right) | aligned ✓ |

**Δ = 0.75rem = 12px at progress 0**, decaying linearly to 0 at progress 1 (the right edges do agree, so the domain is also 12px narrower: `100cqw` = P−6rem against a column of P−5.25rem).

`--track-inset` adds `--col-gap` (0.75rem). The parent grid's column-gap is **zero** (`gap: 0.5rem 0`). The 0.75rem lives only in `.seq-row`'s subgrid (`SequenceTarget.css:73 column-gap: var(--col-gap)`), so `--track-inset` describes the **row** geometry, not the **stage** geometry — and the axis ruler is stage geometry.

**The disjunction (this is what makes the finding airtight).** Whether `.seq-track` (column 2 of the `.seq-row` subgrid) starts at `4.25rem` or `5rem` depends on how the subgrid's own gutter resolves against a zero-gutter parent — a question I decline to settle statically. But the two branches exhaust the space:

- subgrid gutter shifts the row: handles start at `5rem`, playhead agrees with the **handles** and is 12px off the **ruler**;
- it does not: handles start at `4.25rem`, playhead is 12px off **both**.

Either way the cluster carries a 12px registration error, and in every branch the playhead is a party to it. The component's own comment (`:21–22`) claims it rides "the SAME axis the handles ride"; `SequenceAxis.vue:3–5` claims the ticks "resolve against the track width". At most one of those two claims is currently true.

**Root cause, and why it is a consumption finding.** `:25` `grid-column: unset` is a no-op on a grid child (`unset` on a non-inherited property = `initial` = `auto`) whose only effect is to *guarantee* the padding-box containing block — after which `:28–29` re-derive the column geometry by hand from a token that describes a different grid. Placing the box with `grid-column: 2` would make the containing block the column-2 grid area itself, delete `left`/`right` entirely, make `100cqw` exactly the column width, and remove `--track-inset` from the contract. The component opts out of the mechanism that would make it correct by construction and then reimplements it approximately.

**Falsifier.** In a live page: `getBoundingClientRect().left` of `.seq-axis` vs `.seq-playhead-track`. Δ ≈ 12px confirms; Δ = 0 kills the claim (and would mean I have misread `gap: 0.5rem 0` or the containing block). **UNPROVEN-NEEDS-LIVE for the pixel measurement; the arithmetic above is fully source-derived.**

---

### C-2 (MAJOR) — five undeclared token inputs; two of them unfallbacked, and both fail hard

Three inherited tokens are read defensively — `var(--ball-tone, var(--color-progress))` (`:47,50,62,63,64,81`), `var(--seq-glow, 0)` (`:49,50,81,84`), `var(--scrub-dir, 1)` (`:78`), plus the locally-set `var(--playhead-p, 0)` (`:46`). This is exactly the pattern `design-idioms.css:161–165` documents for the promoted `.progress-*` idiom ("so a per-scene ANCESTOR sets it without shadowing"). Good.

Two are not:

```
:28   left: calc(1rem + var(--track-inset));
:31   z-index: var(--z-seq-playhead);
```

Both are declared in a **different file** (`SequenceTarget.css:39`, `:22`), reachable only by inheritance, and neither is typechecked, grep-gated, or covered by any `proof:` clause (`grep -rn "SequencePlayhead\|seq-playhead"` across `src/ test/ scripts/ demo/` returns only the four self-references and two doc mentions — the component has **no test and no gate**).

Failure mode if either declaration is renamed or the parent DOM nesting changes: the substitution is empty, the declaration becomes invalid-at-computed-value-time, and the property takes its initial value —

- `left: auto` → the abspos box falls back to its static position and the sweep domain collapses;
- `z-index: auto` → the playhead loses its layer relative to `--z-seq-handle: 2` on the balls and handles.

Neither produces a build error, a type error, or a console warning. Contrast the *declared* prop at `:17`, which a rename would red immediately. The asymmetry is the finding: 1 of 6 value inputs is under the compiler; the component chose fallbacks for the three cosmetic tokens and omitted them on the two structural ones.

**Falsifier.** A repo-wide rule that resolves demo custom properties statically (a Stylelint `custom-property-pattern` + declaration registry, a `proof:` clause naming these tokens), or a fallback on `:28`/`:31`. `grep -rn -- "--z-[a-z-]*:" demo/` returns three declarations total; no such rule exists.

---

### C-3 (MAJOR) — the design codex names this component as a `--specular` consumer; the token does not exist and the literal it forbids ships

```
demo/DESIGN.md:53–57
  * **Material is not a crayon.** Lighting gets a named material register:
    `--specular` is a foreground/highlight mix and `--shade` is a
    background/shadow mix. Cube face sheen/shade gradients and the sequence
    playhead cap consume these roles. A literal is permitted only inside the
    material token definition; a new lighting effect consumes the pair.

SequencePlayhead.vue:63  border-top:  1px solid color-mix(in srgb, var(--ball-tone, …) 30%, white);
SequencePlayhead.vue:64  border-left: 1px solid color-mix(in srgb, var(--ball-tone, …) 30%, white);

$ grep -rn -- "--specular:" demo/ node_modules/@mkbabb/glass-ui/dist/styles/tokens.css   → (no output)
```

The codex names *this component's cap* by name as the consumer. The register was never created. The component ships the bare `white` keyword the same paragraph forbids outside a token definition. These two lines are the file's only untokenized color out of eight color productions.

This is the open tail of **U-tranche `lane-25-design-demo-coherence.md` F7**, which flagged the same two lines as MINOR ("defensible as material… the one class of color the codex cannot currently name") and proposed the `--specular`/`--shade` pair. The proposal landed **in the codex** and not **in the stylesheet**, which inverts the finding: it is no longer an unnamed material, it is a *named* material with a missing definition and a live violation. F7's own concern — "the white-specular reads differently against the dark theme's near-black stage than the light theme's cream" — remains live: `white` does not respond to `.dark`.

**Falsifier.** A `--specular` declaration anywhere in `demo/styles/` or the glass-ui token sheets. Grep says none. (Or a ruling that DESIGN.md:53–57 is aspirational — but it is written in the imperative alongside the pinned-crayon law that `proof:crayon-preserved` enforces.)

**Severity note.** I am promoting this above lane-25's MINOR only because the codex text changed underneath it. If the owner rules DESIGN.md non-binding, this drops back to MINOR.

---

### C-4 (MAJOR) — "no per-frame JS" is false, and this is the one motion element the engine does not paint

```
SequencePlayhead.vue:6–8
     Reads --playhead-p (set inline) + --ball-tone/--seq-glow/--scrub-dir/
     --track-inset (inherited …). Pure CSS over the engine's `progress` — no
     per-frame JS.
```

The mechanism:

```
useSequenceDemo.ts:171        const progress = ref(0);
useSequenceDemo.ts:179–181    const syncFromSequence = () => { progress.value = clamp(sequence.progress, 0, 1); };
useSequenceDemo.ts:192–196    useSweepScene({ frame: () => { syncFromSequence(); return machine.status.value === "playing"; }, … })
SequenceTarget.vue:70         <SequencePlayhead :progress="demo.progress.value" />
SequencePlayhead.vue:10       :style="{ '--playhead-p': clamp(progress, 0, 1) }"
```

`progress` is a Vue ref written on **every frame** of the mirror loop. Each write invalidates `SequenceTarget`'s render effect, re-renders `SequencePlayhead`, diffs its style object, and calls `style.setProperty("--playhead-p", …)`. That is per-frame JS on the scene's hottest path, at 60Hz, through the full reactivity → VNode → `patchStyle` chain.

The genuinely JS-free path exists three lines away and this component does not use it:

```
SequenceTarget.vue:184–188   onMounted(() => { for (…) demo.childAnims[i]!.setTargets(el); … })
SequenceTarget.css:186       "--ball-p (the engine's inline write)"
```

Every lane traveller is an engine render target; the engine writes `--ball-p` straight to the element with no Vue in the loop. The **master** playhead — the element the file calls "THE PHOSPHOR MASTER PLAYHEAD" (`:2`) — is the sole exception.

**What I am NOT claiming.** This does *not* violate inv ζ: the mirror rides the engine's own `RAFPlayback.loop` (`useSequenceDemo.ts:42–45, 184–187`), not a hand-rolled rAF, and there is no second writer. The defect is narrower and certain: **the comment states a mechanism the code does not implement**, on a hot path, in a repo whose thesis is "the demo IS the library". A maintainer reading `:8` will believe the playhead is free. It is not, and it is the one element in the scene that could trivially be made so (a sixth engine target, or `sequence` writing `--playhead-p` on the stage).

**Falsifier.** Show `demo.progress` is not written per frame — e.g. that `useSweepScene`'s `frame` is throttled. `useSequenceInstrument.ts` and `useSequenceDemo.ts:188–204` show no throttle; `composables/useThrottledReadout.ts` exists in the tree and is **not** used here.

---

### C-5 (MINOR) — the vertical constant is desktop-only; the source of that constant is responsive

```
SequencePlayhead.vue:26   top: calc(0.75rem + 1.25rem);   /* frame pad-top + axis ruler height */

SequenceAxis.vue:24–25    .seq-axis { height: 1.1rem; margin-bottom: 0.15rem; }     → outer 1.25rem ✓
SequenceAxis.vue:43–48    @media (max-width: 1023px) { .seq-axis { height: 0.95rem; margin-bottom: 0; } }  → outer 0.95rem
```

`SequencePlayhead.vue` carries **no** media query. Below 1024px the ruler's outer height drops by 0.30rem and the playhead's top offset does not follow: the line's top edge sits **4.8px lower than intended**, eating into the 0.5rem row-gap above `.seq-rows`.

Note what this proves about the seam: the author *did* tokenize the one horizontal constant (`--track-inset`) and *did not* tokenize either vertical one, so the file demonstrates the correct pattern and its violation within four lines of each other. The repair is the same as C-1's — grid placement, or an `--axis-outer` token owned beside `.seq-axis`.

**Falsifier.** A `.seq-axis` height override elsewhere in the cascade that restores 1.25rem below 1024px, or a matching media query on `.seq-playhead-track`. `grep -rn "seq-axis" demo/` returns only `SequenceAxis.vue` and `SequenceTarget.css:221,239`, neither of which sets height.

---

### C-6 (MINOR) — the clamp is a provable no-op, and does not guard the input that would actually break

`:10` `clamp(progress, 0, 1)` where `progress` is `demo.progress.value`.

The **only** writer of that ref is `syncFromSequence` (`useSequenceDemo.ts:179–181`), which already applies the identical clamp. Every other path into it (`scrub` `:281`, `setProgress` `:200`/`:404`/`:429`, `reseatRow` `:346`) clamps before calling it. This is the *third* clamp on the same scalar in the same render — source, then `SequenceScrubber.vue:34`, then here.

More usefully: the guard does not cover the one value that would break the CSS. `clamp` is `Math.min(Math.max(e,t),n)` (`dist/subpaths/math.js`), so `clamp(NaN,0,1) === NaN`; `--playhead-p: NaN` makes `calc(var(--playhead-p,0) * 100cqw - 50%)` invalid, the `transform` declaration IACVT, and the line snaps to the track origin. (I checked reachability: `sequence.duration` is bounded below by `ROW_DURATION = 900` with `ROW_COUNT = 5` fixed, so NaN is not reachable in this scene today — which is exactly why the clamp is dead weight rather than a live bug.)

Defensive clamping at a leaf boundary is a defensible habit; I am filing MINOR, not MAJOR, and would accept "keep it" as a ruling. What is not defensible is the *appearance* of a guard where none exists.

**Falsifier.** Any writer of `demo.progress.value` that does not clamp. I read every one.

---

### C-7 (MINOR) — `--playhead-p` is unregistered; its structural twin is registered on purpose

```
SequenceTarget.css:13–18
  /* L.W11 S7 — register --ball-p so the bloom INTERPOLATES between engine frames. */
  @property --ball-p { syntax: "<number>"; inherits: true; initial-value: 0; }
```

`--playhead-p` gets no such registration anywhere (`grep -rn -- "--playhead-p" demo/` → three hits, all inside this file). Two consequences: the playhead position can never be transitioned or interpolated between mirror samples the way the lane bloom explicitly can; and an invalid write falls all the way to IACVT (C-6) instead of to a registered `initial-value: 0`. `@property` is a document-level at-rule and would work equally well declared in this file's scoped block, so there is no structural reason for the omission.

**Falsifier.** An `@property --playhead-p` in the glass-ui cascade or `demo/styles/`. None exists.

---

### C-8 (MINOR) — the comet overruns the label column at the progress the scene rests at

```
:70–85  .seq-playhead::after { right: 50%; width: 32px; transform-origin: right center;
          transform: scaleX(var(--scrub-dir,1)); background: linear-gradient(to left, …);
          opacity: calc(0.5 + var(--seq-glow,0) * 0.5); }
```

Anchored at the 2px line's centre and extending 32px in the trailing direction. At progress 0 the line sits at the track origin, so the trail extends 32px **left** of it — into the `3.25rem` (52px) label column, over `.seq-row-label` ("1" / "@0ms", `SequenceTarget.vue:85–88`). Nothing clips it: `.seq-stage` and `.seq-storyboard` set no `overflow`; the nearest clip is the `Card` at `SequenceTarget.vue:8`, far outside. Resting opacity is 0.5 and the gradient's hot end is a 28% tint of `--ball-tone`, so this is faint, not loud — but the scene **mounts at progress 0** (`useSequenceDemo.ts:442`, `SequenceTarget.vue:192`), so it is the first frame every visitor sees.

A `clip-path: inset(0)` or `overflow: hidden` on `.seq-playhead-track` is the one-line fix and costs nothing else, because the track already spans exactly the region the trail should live in.

**UNPROVEN-NEEDS-LIVE** for the perceptual severity. The geometry is source-derived; only "does it read as a smudge" needs eyes.

---

### C-9 (MINOR) — an import-invisible, version-sensitive glass-ui dependency

```
:48  border-radius: var(--radius-pill);

$ grep -rn -- "--radius-pill:" demo/                                          → (no output)
$ grep -n  -- "--radius-pill" node_modules/@mkbabb/glass-ui/dist/styles/theme/radius.css → :1
```

The token exists **only** in glass-ui, reached through `demo/styles/style.css:3 @import "@mkbabb/glass-ui/styles"`. So this component has a hard runtime dependency on glass-ui 7.0.0's token sheet that appears in no import statement, no `package.json`, and no typecheck — and lane-frontend §3 accordingly files it under "21 `.vue` with no glass-ui import".

The exposure is real but bounded, and I want to be precise about which failure it is *not*: under **lane-frontend F-1** (glass-ui absent from `package.json` and `package-lock.json`) a clean `npm ci` breaks the whole demo at `style.css:3`, loudly — this component is not special there. The exposure that *is* special is a glass-ui major that renames or drops `--radius-pill`: `border-radius` goes IACVT, the line and the diamond cap lose their radius, and nothing in the build, the typecheck, or the import graph says a word.

**Falsifier.** A demo-side `--radius-pill` declaration, or a fallback (`var(--radius-pill, 9999px)`) on `:48`. Neither present. Using the token rather than a `9999px` literal is *correct* design-system consumption (see S-5); the finding is that the correct choice is unguarded.

---

### C-10 (INFO) — permanent `will-change`

`:51` `will-change: transform` on an element that mounts with the scene and never unmounts, alongside `.cascade-chase` (`SequenceTarget.css:217`) and five `.seq-ball`s (`:201`) — seven permanently-promoted layers in one scene. The standing guidance is that `will-change` is a hint to be applied around a transition and released. Additionally, the element's *other* animated property is `box-shadow` (`:49–50`, driven by `--seq-glow`), which repaints the promoted layer and is not helped by a `transform` hint.

Filed INFO, not MINOR: the transform *is* continuous while playing, so the promotion is defensible; and the cost is unmeasurable without a live trace. **UNPROVEN-NEEDS-LIVE.**

---

### C-11 (INFO) — scene-local z token: prior ruling stands, no new defect

`:31` `z-index: var(--z-seq-playhead)` consumes a token declared at `SequenceTarget.css:22`. `demo/styles/style.css:20–40` states the demo's stacking order "is single-sourced from glass-ui's `--z-*` scale… There is **NO** demo-local z-scale", naming exactly one exception (`--z-behind`, CubeTarget). `grep -rn -- "--z-[a-z-]*:" demo/` returns three declarations: `--z-behind` (sanctioned), `--z-seq-playhead`, `--z-seq-handle`.

**Already adjudicated in-repo.** `docs/tranches/R/audit/demo-styling.md` F8 raised precisely this and ruled: "No change to the style.css global contract is needed (these are stacking-context-relative, not global rungs)". I re-checked and agree — the values 1/2 order two siblings, they are not global rungs. I am **not** re-filing it. The only live residue is the missing fallback, already counted once under C-2.

Recorded so the next auditor does not double-count it. (Note also that `.seq-stage` sets no `z-index` and no `isolation`, so these two rungs are not confined by a local stacking context — a latent, currently harmless, detail.)

---

## 3. Superlatives (L-18 runs both ways)

### S-1 — the only one of the demo's three playheads on the compositor-correct idiom

```
SequencePlayhead.vue:46   transform: translateX(calc(var(--playhead-p,0) * 100cqw - 50%));
```

The producer's own doctrine, stated verbatim in the primitive that would replace it:

```
glass-ui/dist/components/timeline/ScrubberTimeline.vue.d.ts
  "travel rides a `useSpring`/SpringProgress position written to
   `transform: translateX()` (NEVER `style.left` — Safari composites
   transform, not left)"
```

The two sibling playheads do the forbidden thing: `TimelineCaret.vue:4` `:style="{ left: \`${position}%\` }"`, and this scene's own row handles at `SequenceTarget.vue:98` `:style="{ left: \`calc(${…} * 100%)\` }"`. SequencePlayhead independently arrived at the design system's rule and pairs it with `container-type: inline-size` (`:35`) so `cqw` resolves against the right axis. **Genuine, and it is the reason C-1 is a 12px offset rather than a layout thrash.**

*Falsifier both ways:* a `left`/`right` animated property on this element (there is none — `:28–29` are static), or evidence that glass-ui has retired the doctrine (the 7.0.0 d.ts states it).

### S-2 — correct a11y division with the sibling that owns the value

`:9` `aria-hidden="true"` on the whole track. The master clock's value is announced exactly once, by the element that is actually operable:

```
SequenceScrubber.vue:22–26   role="slider"  aria-label="Scrub the sequence master playhead"
                             :aria-valuenow="Math.round(demo.progress.value * 100)"
```

A decorative mirror of an announced value that also announced itself would be a duplicate-announcement defect. This one does not. *Falsifier:* remove the scrubber and the progress becomes unannounced — but the scrubber is unconditionally rendered at `SequenceTarget.vue:127`.

### S-3 — the value.js edge is provably parser-free

Section 1.1. Zero imports in `dist/subpaths/math.js`; R1 unreachable. This is the strongest possible answer to the transitive-exposure question and it is a *measurement*, not a posture.

### S-4 — the prop shape is the one a prior in-repo audit blessed by name

```
docs/tranches/U/audit/lane-24-design-restructure-system.md:234–236
  "The good counter-example the rule should bless: leaf components take scoped
   scalars — SpringTrace.vue:37 …, SequencePlayhead.vue:15 (`progress: number`)."
```

Amid a scene family where the context-delivery grammar is inconsistent (lane-24 documents `provide`/`inject` and `props.demo` coexisting across the easing scene), this component takes one scalar and injects nothing. `defineProps<{ progress: number }>()` with no emits is the right contract for a display leaf. **Confirmed superlative with external corroboration** — and it makes C-2 sharper, not weaker: the *declared* half of the contract is exemplary; the undeclared half is five times larger.

### S-5 — real tokens, not literals, for radius and tone

`:48` consumes glass-ui's `--radius-pill` rather than `9999px`; `:47,50,62,81` consume `--ball-tone` with the `design-idioms.css:161–165` ancestor-parameterization fallback rather than a hardcoded hue; `:49–50,81,84` consume `--seq-glow` rather than duplicating an intensity. Six of eight color/geometry productions are tokenized. The two that are not are C-3, and I note the tension honestly: this component is 75% exemplary and 25% in violation of a law that names it.

---

## 4. Shadow census — SequencePlayhead against glass-ui 7.0.0

**No exported glass-ui primitive is a counterpart. lane-frontend's classification is CONFIRMED.** lane-frontend §5 places "axis/playhead" in *"Bespoke, no glass counterpart"* (12 remaining, ~1900 lines). Correct, and for the right reason: a bare, non-interactive progress caret overlaying a multi-lane grid is not a shape glass-ui exports. The nearest candidates and why each fails:

| candidate | reachable? | why not a counterpart |
|---|---|---|
| `GlassTimeline variant="scrubber"` (`./timeline`) | **yes** | an *interactive* `role=slider` with its own rail, spring-driven head, pointer capture and 44px halo. SequencePlayhead is `aria-hidden`, has no rail, and must overlay five foreign lanes. Adopting it would duplicate the `SequenceScrubber` role=slider (S-2) and re-introduce the announcement it correctly avoids. |
| `Progress` (root barrel + `./progress`) | yes | a bar, not a caret. |
| `ScrubberTimeline` / `ContinuousRail` / `ContinuousMarkers` / `geometry.*` | **NO** | see the correction below. |

### Correction to the hitherto corpus — lane-frontend S-3 overstates the timeline export surface

lane-frontend **S-3** maps the demo's bespoke timeline cluster onto `ContinuousRail + ContinuousMarkers` and `ScrubberTimeline caret / geometry`, and its Provenance note asserts every replacement is "available without an upgrade". The `.d.ts` files it cites do exist on disk. **They are not exported.**

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/timeline/index.d.ts
export { default as GlassTimeline } from "./GlassTimeline.vue";
export type { TimelineSegment, TimelineSegmentGradient, TimelineSegmentState, } from "./types";

$ cat node_modules/@mkbabb/glass-ui/dist/timeline.d.ts
export * from "./components/timeline";

$ grep -rn "ScrubberTimeline" node_modules/@mkbabb/glass-ui/dist/*.d.ts \
        node_modules/@mkbabb/glass-ui/dist/components/timeline/index.d.ts   → (no output)

$ node -e 'console.log(Object.keys(require("…/glass-ui/package.json").exports).filter(x=>x.includes("*")))'
[ './fonts/*' ]
```

`ScrubberTimeline`, `SegmentedTimeline`, `ContinuousTimeline`, `ContinuousRail`, `ContinuousMarkers` and every function in `geometry.d.ts` (`fillFor`, `createContinuousGeometry`, `stitchedRailGradient`, `stitchedRegionWindow`, `continuousFillWidth`, `popoverPayloadFor`) are **internal**: absent from every public barrel, and unreachable by deep path because the `exports` map has no wildcard outside `./fonts/*`. `ScrubberTimeline.vue.d.ts:4` says so itself — *"Internal variant SFC dispatched from `<GlassTimeline variant="scrubber">`"*.

**Consequence for the S-3/S-4 replacement wave:** the only reachable form is the `GlassTimeline` dispatcher and its four props. Any plan that assumes it can import `geometry`'s percent math (which is exactly what S-3 offers as the fix for `TimelineCaret.vue:4`'s `left: %` arithmetic) needs either a glass-ui export addition or a re-derivation demo-side. That is a producer-side prerequisite lane-frontend's wave order (§10 items 6) does not currently carry. It does not change S-3's *verdict* — the dispatcher may still be the right target — but it changes its **cost and its dependency order**.

*Falsifier:* a `package.json` `exports` entry or barrel re-export exposing any of those names. I enumerated both.

---

## 5. What I looked for and did not find (negative results, recorded)

| probe | result |
|---|---|
| glass-ui import in this file | none — the boundary is clean, not merely unused |
| `reka-ui` import | none (consistent with lane-frontend §3.4, zero repo-wide) |
| local `ui/` shadcn copy, `cva`/`clsx`/`cn` | none (lane-frontend §3.3) |
| backwards-compat shim (lane-frontend F-5 class) | none in the sequence tree |
| a `clamp` available from `@mkbabb/keyframes.js` that this file bypasses | **does not exist** — `dist/keyframes.d.ts` declares none; `internal/leaves.ts:28` is not barrel-exported (lane-library LEG-3) |
| padding double-count in `:26–29` | **checked and refuted** — the containing block is the padding box, so crossing `.seq-stage`'s padding is correct. Only the `--col-gap` term (C-1) and the mobile axis height (C-5) are wrong |
| NaN reachability into `--playhead-p` | not reachable today (`sequence.duration ≥ 900`); recorded under C-6 as dead-guard, not live bug |
| `prefers-reduced-motion` guard | absent, and **correctly** so — the file declares no transition or `@keyframes`; its motion is playback-driven and PRM-snapped upstream at `useSequenceInstrument.ts:29–32` and `SequenceTarget.css:238–243`. Not a defect |
| test or `proof:` gate covering this component | **none** — `grep -rn "SequencePlayhead\|seq-playhead" src/ test/ scripts/` returns zero. Context for C-1/C-2's silence, not a separate finding on this axis |

---

## 6. Repair order (if the owner wants one)

1. **C-1 + C-5 together, one change:** `grid-column: 2` on `.seq-playhead-track`; delete `left`, `right`, and the `1.25rem` term from `top`. The grid area becomes the containing block, `100cqw` becomes the column width exactly, `--track-inset` leaves the contract, and the mobile drift dies with the hardcoded axis height. Settle the subgrid-gutter branch first with the C-1 live measurement so `.seq-row`'s `column-gap` can be reconciled in the same pass.
2. **C-3:** define `--specular`/`--shade` in `design-idioms.css` per `DESIGN.md:53–57`; repoint `:63–64` and CubeTarget's literals. Cross-repo relay if the pair belongs in glass-ui.
3. **C-4:** correct the comment, or make the claim true by giving the playhead an engine target — the latter also deletes C-6 and C-7.
4. **C-2 residue:** fallbacks on `:28`/`:31` (moot for `:28` after step 1).
5. **C-8, C-9, C-7, C-10:** one-liners, independently landable.

None of these is a blocker. Nothing here breaks the build, crashes at runtime, or fails an a11y gate. The component's consumption is unusually disciplined on every edge a tool can see, and undisciplined on every edge no tool can see — which is the finding.

---

## Provenance

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (the installed 7.0.0 the demo already has on disk) and its `package.json` `exports` map. Every value.js claim from `node_modules/@mkbabb/value.js/dist/subpaths/`. Every demo claim from the working tree at `8281638c`. Prior in-repo audits cited: `docs/tranches/R/audit/demo-styling.md` F8, `docs/tranches/U/audit/lane-24-design-restructure-system.md`, `docs/tranches/U/audit/lane-25-design-demo-coherence.md` F7, `demo/DESIGN.md`. Hitherto corpus folded: `formation/keyframes/lane-frontend.md` (F-1, F-5, §3, §3.3, §3.4, §5 S-3/S-4, §10) and `lane-library.md` (§1, §4 R1 surface, LEG-3). No file in keyframes.js, glass-ui, or fourier-analysis was written, mutated, or executed; no installs, no dev servers, no browser tooling. Sole write: this file.
