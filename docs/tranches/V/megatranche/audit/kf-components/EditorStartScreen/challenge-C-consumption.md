claude-opus-5[1m]

# EditorStartScreen — CHALLENGE, axis C (CONSUMPTION)

**Target** `keyframes.js/demo/components/instrument/shell/EditorStartScreen.vue` (191 L)
**Read whole (read-only)** the target + `AnimatedText.vue` (126 L), `TypingDots.vue` (125 L), both consumers (`app/App.vue`, `shell/EditorShell.vue`), the token substrate it silently rides (`demo/styles/style.css`, `demo/styles/layout.css`, `demo/app/index.html`), the kf barrel it reaches (`src/animation/index.ts`, `load-engine.ts`, `easing.ts`, `compile/easing/easing-registry.ts`, `orchestration/stagger.ts`, `orchestration/split-text/split-text.ts`, `engine/play-lifecycle.ts`, `constants/types.ts`), and the installed `@mkbabb/glass-ui@7.0.0` + `@mkbabb/value.js@4.0.0` + `@lucide/vue@1.17.0` dists.

**Method** static + source-derived only (no browser tooling, per LAW). Two claims were checked by *executing* read-only evidence: the SFC was compiled through `vue/compiler-sfc` (D-C6) and `steps(4, jump-none)` was resolved through the installed value.js 4.0.0 (S-C2). Everything else is grep/read provenance. Livable-only assertions are marked **UNPROVEN-NEEDS-LIVE** for SS-13.

**Tally** 15 defects — **0 BLOCKER**, 5 MAJOR, 4 MINOR, 6 INFO — and 4 superlatives.

**Posture note.** The component was assumed defective. It is not *broken*: nothing here crashes, nothing fails the build, and its light/heavy barrel discipline is genuinely exemplary (S-C1..S-C4). What it *is* is **a museum of its own comments**. Five of its load-bearing rationales were true when written and are false against the tree standing today — glass-ui shipped the token the component is waiting for, keyframes.js shipped the primitive the component hand-rolls, and a recorded-DISCHARGED grapheme bug came back. On the consumption axis, a stale rationale is the defect: it is the mechanism by which a consumer stops consuming.

---

## Contradictions of the hitherto corpus (declared up front, per LAW)

| Corpus row | Says | Tree says | Where |
|---|---|---|---|
| `lane-frontend.md:354–363` **S-5** (+ `CENSUS-2026-08-03.md:130`) | AnimatedText → glass-ui `TypewriterText`, AMBER, "evaluate — `/typewriter` unimported … the accessibility concern `TypewriterText` exists to solve centrally" | **Wrong comparator.** glass-ui 7.0.0's `TypewriterText` is a *keystroke simulator* (typo state machine, `deletingSpeed`, `cursorChar`, word rotation) with **no per-char stagger at all** — and it types text *in over time*, which would empty the LCP node at first paint. The true comparator is keyframes.js's **own** `splitText`, whose docstring names `AnimatedText.vue` as its precedent. See **D-C2**. | `glass-ui/dist/components/typewriter/TypewriterText.vue.d.ts`; `kf/src/animation/orchestration/split-text/split-text.ts:10` |
| `lane-22-perf-demo-runtime.md:110–121` **F3** / `U.D.md:194` | "the hero `<h1>` … imports only `@lucide/vue` `List`, `AnimatedText`, `TypingDots` (`EditorStartScreen.vue:61-63`): **zero engine dependency**" | **False.** `TypingDots.vue:27–28` imports `loadAnimationEngine` + `stagger` from the barrel and constructs a `CSSKeyframesAnimation` at `:86`; `EditorStartScreen.vue:29` mounts it *inside* the LCP `<h1>`. The edge is DYNAMIC, so F3's transposition still stands — but at a price F3 never quoted. See **D-C10**. | |
| `docs/tranches/G/audit/r-animation-sota.md:109` **F26-4** | "**The F26-4 demo grapheme-bug is DISCHARGED:** F.W16 rewrote `AnimatedText.vue` to split by `/\s+/` into WORD spans … the old raw-UTF-16 per-char split is gone." | **REGRESSED.** The T-era P-HERO rebirth (`AnimatedText.vue:1–20`, "the word-granular F.W16 split was REJECTED by the owner") restored the raw UTF-16 split verbatim: `chars: w.split("")` at `AnimatedText.vue:82`. The discharge row is now false. See **D-C2**. | |
| `lane-frontend.md:387–392` **S-8** (`TypingDots` KEEP) | justified bespoke, replacement removes library coverage | **Affirmed and strengthened** — the dogfood is real, not nominal, and it holds up against the engine's actual PRM contract. See **S-C4**. | |
| `lane-frontend.md:15,54` **F-1** (glass-ui phantom dep, RED) | absent from `package.json` **and** `package-lock.json`, 7.0.0 present in `node_modules` | **Re-verified** (`grep -c glass-ui package.json` → 0; `package-lock.json` 222 KB, → 0). Amplified: the LCP element is the phantom dep's most exposed consumer *and* consumes it with **zero import statements**. See **D-C9**. | |

---

## MAJOR

### D-C1 — MAJOR — the display-weight override is dead code against glass-ui 7.0.0's shipped `--font-display-weight` token

`EditorStartScreen.vue:99–101` states the scoped weight is a stopgap that "dies into the `--font-display-weight` token **when** glass-ui ships BG-6", and `:107` carries `font-weight: 400`. `demo/styles/style.css:48–49` states the same premise for the whole demo: "glass-ui's `text-display-*` rungs **hardcode font-weight:600** and there is **no `--font-display-weight` token** to swap it."

Both premises are false against the installed 7.0.0:

- `glass-ui/dist/styles/typography/scale.css:1` — `:root { … --font-display-weight: 600; --type-weight-display: var(--font-display-weight); … }`
- `glass-ui/dist/styles/typography/semantic.css:1` — `@utility text-display-mega { … font-weight: var(--type-weight-display); … }` (and identically for `-audacious`, `-hero`, `-5`…`-2`, `text-display`). **Not** a hardcoded 600.
- The sibling `letter-spacing: 0` half of the override is equally token-settable: the rungs bind `letter-spacing: var(--type-tracking-display)`, declared at `glass-ui/dist/styles/tokens/scheme-motion.css:1` as `-0.015em`.

So three layers exist where the shipped seam is two declarations. The component's scoped `font-weight: 400` (`:107`), the demo's 8-selector `@layer demo-typography` block (`style.css:263–274`), and the `:root { font-synthesis: none }` belt (`style.css:100`) all fight a hardcode that no longer exists. Correct consumption is `:root { --font-display-weight: 400; --type-tracking-display: 0; }` and the deletion of both overrides.

This is the identical failure mode lane-frontend graded RED for S-1 ("rationale is void against 7.0.0, `dist/tabs.js:232`") — a fork kept alive by a comment describing a version that shipped.

**Falsifier.** Find any rule in glass-ui 7.0.0's emitted cascade that sets a literal `font-weight: 600` on a `text-display-*` selector at a layer that wins over `@theme`/`:root` token substitution; or show `--font-display-weight` is not the value `--type-weight-display` resolves to at the rung. Either kills this.

---

### D-C2 — MAJOR — the hero hand-rolls `splitText` — the library primitive that was **generalised from this exact file** — and in doing so re-opens the recorded-DISCHARGED F26-4 grapheme bug

`EditorStartScreen.vue:28` is the sole consumer of `AnimatedText`, which at `AnimatedText.vue:74–84` hand-rolls: word split (`props.text.split(/\s+/)`, `:77`), per-char split (`chars: w.split("")`, `:82`), a manual running global index (`:80–81`), a monotone `index × offsetMs` delay ramp (`:39`), and a bespoke sr-only/aria-hidden a11y mirror (`:21–23`).

keyframes.js ships all five as one LIGHT primitive on the barrel the component's own sibling already imports:

- `src/animation/index.ts:107` — `export { splitText, SplitTextRefusalError }`, annotated "a11y-first text-splitter … composes `stagger` + the platform `Intl.Segmenter`; no parser/color edge".
- `src/animation/orchestration/split-text/split-text.ts:1–33` — the docstring quotes **this component's own default string**: "so a screen reader reads *'Select an animation'*, not the 'S…e…l…e…c…t' per-glyph stream the split produced (**the AnimatedText.vue precedent, generalised into a LIGHT primitive**)" (`:9–11`). `by: "grapheme"` runs `Intl.Segmenter`; the result carries a ready `stagger` and `delays[]`.
- `docs/published-surface.md:42` enrolls it as shipped public surface with a Chromium accessible-name oracle (`test/orchestration/split-a11y-oracle.test.ts`).

The demo is the library's declared proving ground — `TypingDots.vue:8` names the "inv-ζ seam (the demo's signature animation IS the library, not pure CSS)". The single most-viewed surface in the demo shadows the library's own primitive, and its sibling *inside the same `<h1>`* does dogfood the paired primitive (`stagger`, `TypingDots.vue:61`). One hero, two delay mechanisms, one of them the library's.

**The concrete harm — a regressed, recorded-discharged defect.** `w.split("")` is a UTF-16 **code-unit** split. `docs/tranches/G/audit/r-animation-sota.md:109` records F26-4 as DISCHARGED precisely because the word-split removed it, and `:112` makes "the grapheme-correctness floor (`Intl.Segmenter`) … the non-negotiable". The T-era per-char rebirth (`AnimatedText.vue:1–20`) restored the raw split. `title` is a public `string` prop (`EditorStartScreen.vue:68`): any astral or ZWJ grapheme is shredded into lone surrogate halves, each in its own `<span>`, each with its own `animationDelay`. This is not hypothetical for this component's copy register — its *sibling prop on the same element* already carries a ZWJ emoji sequence: `App.vue:50` `hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;"`. `index += w.length` (`:81`) is code-unit-based too, so the global wave index is silently wrong for the same inputs.

**What I am *not* claiming.** A mechanical swap to `splitText` is not obviously right and I found no recorded reasoning either way (`grep -rn splitText demo` → zero hits; every hit is library/audit docs). `splitText` is imperative post-mount DOM surgery; applied to a `text-wrap: balance` mega hero it would paint one unsplit run and then shred it — a CLS contribution landing on the LCP node, the exact failure `style.css:69–88`'s metric-matched fallback face was engineered to prevent. The honest cure is (a) make the template split grapheme-safe today (`[...w]` or `Intl.Segmenter`), and (b) *record* the non-adoption of `splitText` with its CLS rationale, because today the tree carries no rationale at all — only a lane row pointing at the wrong comparator.

**Falsifier.** Render `<EditorStartScreen title="Ship it 🚀" />` and observe intact glyphs (kills the grapheme half). Or produce a ruling/design note anywhere in `keyframes.js/docs` that considered and rejected `splitText` for the hero (kills the shadow half). Neither exists in the tree I read.

---

### D-C3 — MAJOR — the italic display face is above the fold, is not preloaded, and its metric-matched fallback is upright-only under `font-synthesis: none`

T.D11 moved the deck **and** the hint onto Instrument Serif true italic 400: `EditorStartScreen.vue:138` (`.hero-deck { font-style: italic }`) and `:149` (`.hero-hint`). The comment at `:32–33` asserts "the ital@1 face is **already loaded**; zero new payload."

The head disagrees, and the head is stale in the opposite direction:

- `demo/app/index.html:48` — the preload policy comment: "ONE face only (the guide forbids over-preloading: **italic** + latin-ext **are not above the fold**)." Written before T.D11. Both italic runs now sit in the hero band, on the LCP screen.
- `index.html:54–60` — the single `rel="preload" as="font"` is the **upright** latin woff2 (`…/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7Motmp5g.woff2`).
- `index.html:69–72` — the family stylesheet requests `ital@0;1` but is loaded `media="print" onload="this.media='all'"`, i.e. deliberately non-render-blocking. The italic woff2 is therefore *discovered* only after the sheet swaps, strictly later than the preloaded upright.
- `demo/styles/style.css:81–88` — `@font-face { font-family: "Instrument Serif Fallback"; src: local("Georgia"); … }` declares **no `font-style`**, so the family holds an upright face only, and its `size-adjust`/`ascent-override` descriptors were calibrated against the *upright* box (`style.css:78–80` cites the upright metrics).
- `demo/styles/style.css:100` — `:root { font-synthesis: none }`, which is `font-synthesis-weight/style/small-caps: none`. There is no synthetic oblique to bridge the gap.

Net: during the swap window the deck and the hint — two `--type-title` (2.058rem) lines directly under the LCP node — render in a face whose italic was never preloaded and whose fallback cannot even *fake* the slant, then restyle *and* re-metric when the italic file lands. The whole point of the metric-matched fallback engineering was to keep this exact region from reflowing.

**Falsifier.** A live font-loading trace (SS-13) showing the italic face resolved before the deck's first contentful paint on a cold cache — **UNPROVEN-NEEDS-LIVE** for the visual magnitude. Or evidence that Google serves `Instrument+Serif:ital@0;1` as one variable file with an `ital` axis rather than two `@font-face` blocks (it does not for v5, but this is the clean kill). Or a second `@font-face` for `"Instrument Serif Fallback"` with `font-style: italic` somewhere I missed — I grepped `demo/styles/` and found exactly one.

---

### D-C4 — MAJOR — `subtitle` + `subtitleSuffix` is an icon-sandwich, not a props contract

`EditorStartScreen.vue:40–44`:

```
{{ subtitle }}
<List class="hero-deck-icon inline" aria-hidden="true" />
{{ subtitleSuffix }}
```

with `subtitle?: string` / `subtitleSuffix?: string` at `:69–70`, defaulting to `"from the list"` / `"below, then press Play."` (`:74–75`).

`subtitleSuffix` has no meaning of its own. It exists solely as "the text on the far side of a hard-coded `<List>`". The contract makes it impossible for a consumer to: omit the icon, reorder it, choose a different glyph, or pass one sentence. It is a two-prop API extracted from exactly one string, and the split point is an implementation detail of that one string.

Both consumers prove it has never earned its shape: `EditorShell.vue:62` renders `<EditorStartScreen />` with every default; `App.vue:50` overrides `hint` only. The pair has never once been exercised. Meanwhile the *genuinely* variable copy (`hint`) is a plain prop and works fine.

The Vue-native contract is one slot (`<slot name="subtitle">{{ default }}</slot>`) — or, if the icon must stay structural, an `icon?: Component` prop with the prose as a single string. Either lets `EditorShell`'s standalone-host default and `App`'s home copy diverge without the component knowing where the sentence breaks.

Adjacent, same seam: `hint: undefined` at `:76` is a no-op — an optional prop's absent value is already `undefined`, and `withDefaults` emits nothing useful for it (see D-C12).

**Falsifier.** Point at a third consumer (playground, docs, a test) that passes `subtitle` **and** `subtitleSuffix` with copy different from the defaults and wants the `List` glyph between them. I grepped every `EditorStartScreen` reference in `demo/`, `docs/`, `scripts/`, `test/` — the only two call sites are the ones above.

---

### D-C5 — MAJOR — this component is the app's entire `h1`/`h2` outline, it is decorative ink, and it unmounts on every non-home scene

Heading census of the whole demo (`grep -rn "<h1\|<h2\|<h3" demo`):

| | |
|---|---|
| `<h1>` | **one**, `EditorStartScreen.vue:27` |
| `<h2>` | `EditorStartScreen.vue:40` (deck), `EditorStartScreen.vue:45` (hint), `scenes/easing/EasingTarget.vue:24` (specimen name) |
| `<h3>` | `transport/channel-controls/TimingFunctionPanel.vue:14`, `shell/KeyboardShortcutsModal.vue:12` |

Three consequences, all source-provable:

1. **The h2s are ink, not structure.** The component's own comment says so — `:14` "pointer-events: none — the hero is ink, not chrome"; `EditorShell.vue:58–59` confirms "gestures pass through to the subject". The `hint` in particular ("or drag M. cubert 🙂‍↔️") is an affordance nudge, not a section heading, and it is a *prop-conditional* heading (`v-if="hint"`, `:45`) — the document outline changes shape depending on which host mounted the component.
2. **On every non-home scene the document has no `<h1>` at all.** `EditorShell.vue:60` gates the whole block on `v-if="showStartScreen"`, and `App.vue:32` binds that to `isHome`. Navigate to easing and `EasingTarget`'s `<h2>` is a top-level orphan; navigate anywhere else and `TimingFunctionPanel`'s `<h3>` and `KeyboardShortcutsModal`'s `<h3>` hang with no `h1`/`h2` ancestor anywhere in the tree.
3. **The h3s already skip a level even on home**, because the only h2s in scope are the hero's two ink lines.

The remedy is cheap and is a consumption choice, not a redesign: the deck and hint are `<p>` (or one `<p>` with the hint as a second sentence), and the `<h1>` stays. The type rungs are class-driven (`.hero-deck`, `.hero-hint`), not tag-driven, so nothing visual moves.

**Axis note.** This overlaps the A/a11y axis; I raise it here because it is *caused* by the props contract (a `string` prop rendering as a heading element) and by the integration seam (`v-if` on the app's only heading source), both squarely axis-C.

**Falsifier.** An axe/lighthouse run over home + one scene reporting no `heading-order` / `page-has-heading-one` violation — **UNPROVEN-NEEDS-LIVE** for the tool verdict; the tag census above is not in doubt. Or a recorded design ruling that the deck must be `h2`.

---

## MINOR

### D-C6 — MINOR — `AnimatedText`'s `offsetMs` / `cycleMs` props are advertised as props but are a one-time snapshot

`AnimatedText.vue:55` assigns `withDefaults(defineProps<…>(), …)` to `props`, then `:69` does `const { offsetMs, cycleMs } = props;`. Vue 3.5's reactive-props-destructure transform fires only on destructuring **directly** off the `defineProps()`/`withDefaults()` call; destructuring off an intermediate variable is a plain read.

Verified by compiling the SFC through `vue/compiler-sfc` (read-only):

```
const props = __props;
const { offsetMs, cycleMs } = props;
```

Both are consumed in the template — `cycleMs` at `:24` (`'--wave-cycle'`), `offsetMs` at `:39` (`animationDelay`) — and neither will ever update. `props.text` **is** reactive (read inside the `words` computed at `:76`), so the component is half-reactive: change the text and the wave re-splits; change its timing and nothing happens. That inconsistency is the defect — a caller has no way to know which half is live.

Not reachable from `EditorStartScreen` (it binds `:text` only, `:28`), hence MINOR/latent rather than MAJOR. MEMORY.md records "reactive props destructure" as a known project idiom, so this is a slip, not a policy.

**Falsifier.** Bind `:offset-ms` to a `ref`, mutate it, and observe the per-char `animationDelay` change. If it changes, the compiler output above is not what ships and the claim dies.

### D-C7 — MINOR — `TypingDots`' `count` prop is reactive in the template and mount-once in the engine wiring

`TypingDots.vue:15` renders `v-for="i in count"` — fully reactive. But `:61–63` materializes `delays` once at setup from `props.count`, and `:71–101` constructs one `CSSKeyframesAnimation` per dot inside a single `onMounted`. Raising `count` post-mount adds `<span>`s that no animation is ever bound to — they freeze at the CSS rest paint (`opacity: 0.2`, `:123`). Lowering it strands the surplus animations driving detached nodes until `onBeforeUnmount` (`:103–107`).

Not reachable from `EditorStartScreen` (`<TypingDots />`, no props, `:29`) → MINOR/latent. The honest fix is either to drop the prop (the "…" is three) or to re-seat the animations in a `watch`.

**Falsifier.** Bind `:count` to a ref, bump it, and observe the new dot pulsing.

### D-C8 — MINOR — the hero consumes two *unpinned* glass-ui tokens bare while supplying fallbacks only to tokens it owns

Fallback posture is exactly inverted. The two tokens that get `var(x, fallback)` treatment (`:90–91`: `var(--work-area-top-offset, 0px)`, `var(--work-area-height, 100dvh)`) are **demo-owned and `:root`-declared** — `demo/styles/layout.css:69` and `:51` — i.e. they cannot go missing. Every glass-ui token is consumed bare.

Checked against glass-ui's own published override contract (`dist/styles/tokens/manifest.d.ts:7,4`):

| Token used | Site | In glass-ui's public manifest? |
|---|---|---|
| `--type-title` | `:140`, `:151`, `:186`, `:189` | ✔ pinned |
| `--foreground` | `:109`, `:142` | ✔ pinned |
| `--font-display` | `:137`, `:148` | n/a — demo-owned (`style.css:55`) |
| **`--type-display-4`** | `:125` | ✘ **not pinned** |
| **`--muted-foreground`** | `:153` | ✘ **not pinned** |
| `text-display-mega` (utility) | `:27` | ✘ no manifest guarantee |
| `z-controls` (utility) | `:18` | ✘ no manifest guarantee |

If `--type-display-4` moves, `font-size: var(--type-display-4)` (`:125`) is invalid-at-computed-value-time and the **mobile hero rung** falls back to the inherited size — and the same token appears inside `clamp(1.5rem, 6.2cqi, var(--type-title))` shapes at `:186`/`:189` where an IACVT poisons the entire function. Adding the fallbacks the demo-owned tokens already get costs one word each.

Graded MINOR, not MAJOR, precisely because `--type-title` and `--foreground` — the two loudest consumers — *are* governed. The claim is about the unpinned pair.

**Falsifier.** Show `--type-display-4` / `--muted-foreground` in glass-ui's `semanticTokens` manifest (they are absent from the `type` and `color` arrays at `manifest.d.ts:7,4`), or a glass-ui stability policy that treats every `--type-*`/`--*-foreground` token as public regardless of manifest membership.

### D-C10 — MINOR — the corpus's "hero has zero engine dependency" is false, and the LCP transposition it justifies has an unpriced cost

Stated in the contradictions table. The correction matters for what happens next: `lane-22 F3` / `U.D §F3` propose mounting immediately and warming at idle, on the premise that the hero touches nothing heavy. It touches the heavy graph via `TypingDots.vue:75` (`await loadAnimationEngine()`), which today always resolves instantly because `demo/app/main.ts:50` blocks `app.mount()` on `warmKfEngine()`. Remove the mount gate and the ordering inverts: the hero paints, and its ellipsis sits at the CSS rest paint `opacity: 0.2` (`TypingDots.vue:123`) until the heavy chunk lands. Any LCP transposition must decide explicitly whether the hero ships a dim static ellipsis during that window or drops the dots from first paint. F3 does not name this.

**Falsifier.** Show `TypingDots` is not mounted by the hero (it is, `EditorStartScreen.vue:29`, *inside* the LCP `<h1>`), or that the heavy chunk always resolves before the hero's first paint under the proposed non-blocking mount — **UNPROVEN-NEEDS-LIVE**.

---

## INFO

### D-C9 — INFO — the LCP element consumes glass-ui with **zero import statements**: a dependency-graph blind spot on top of F-1

`EditorStartScreen.vue:61–63` imports `@lucide/vue` and two local SFCs. Nothing else. Yet 100% of the component's type scale (`text-display-mega` → `glass-ui/dist/styles/typography/semantic.css:1`; `--type-title`, `--type-display-4` → `typography/scale.css:1`), its ink (`--foreground`, `--muted-foreground`), and its stacking rung (`z-controls` → glass-ui's `--z-controls`, contract documented at `style.css:23–30`) are glass-ui surface, reached entirely through CSS.

Consequence for the audit machinery: `package.json:lint` is `depcruise src` — the demo is not cruised at all, and even a demo-wide import cruise would report this file as glass-ui-free. The most glass-ui-dependent node in the app is invisible to every import-graph tool.

This is the sharp end of **F-1** (`lane-frontend.md:15,54`), re-verified here: `grep -c glass-ui package.json` → 0; `package-lock.json` (222 KB, present) → 0. Under `npm ci` the `@import "@mkbabb/glass-ui/styles"` at `style.css:3` cannot resolve, and the LCP element renders at browser-default `h1`/`h2` sizes with no display face and an unresolved `z-controls`. F-1's "nothing below is reproducible until this lands" understates it: the landing page is the casualty.

**Falsifier.** Find `@mkbabb/glass-ui` in `package.json` or `package-lock.json`.

### D-C11 — INFO — `6.2cqi` / `5.4cqi` have no query container and silently resolve against the small viewport

`EditorStartScreen.vue:186` and `:189` size the mobile deck and hint with container-query inline units. No ancestor establishes a query container: the demo's only `container-type` declaration is the opt-in utility `.container-inline-size` (`demo/styles/style.css:239`), which appears on neither `.editor-shell` (`EditorShell.vue:3`), the start-screen wrapper (`EditorShell.vue:60`), nor `.hero-band` (`:17–19`); and glass-ui's shipped CSS declares `container-type` nowhere (`grep -ro "container-type:[^;]*" glass-ui/dist/styles/` → empty).

Per CSS Containment L3, with no eligible container the `cq*` units evaluate against the small viewport, so `6.2cqi` ≡ `6.2svw`. Behaviourally near-identical here because `.hero-band` is `w-screen` — which is why this is INFO, not a defect of output. It is a defect of *contract*: the unit reads as "relative to my container" and the tree provides none, so a future ancestor gaining `container-type` (a glass-ui `Surface`, a scoped `@container`) would silently re-scale the LCP screen's prose with no call-site change.

**Falsifier.** Any ancestor of `.hero-band` with `container-type` in the live cascade — **UNPROVEN-NEEDS-LIVE** for the computed check; the static grep is what I have.

### D-C12 — INFO — two redundant arguments in the library-consumption seam

- `TypingDots.vue:61–63` — `stagger(props.count, {…}).delays(props.count)`. `StaggerFn.delays(total?)` already defaults to the construction-time count; `src/animation/orchestration/stagger.ts:63–75` documents this explicitly ("Both `total` args are OPTIONAL: the implementation defaults them to the construction-time count … so `fn(i)` and `fn.delays()` are valid"). Passing it twice is the pre-S.B7 idiom.
- `EditorStartScreen.vue:76` — `hint: undefined` in `withDefaults`. An optional prop is already `undefined`; the entry documents nothing the type does not.

**Falsifier.** `stagger(3,{…}).delays()` returning a different array than `.delays(3)`.

### D-C13 — INFO — the EditorShell ↔ EditorStartScreen seam carries two competing positioning contracts

`EditorShell.vue:60` wraps the slot in `absolute inset-0 z-controls flex items-center justify-center pointer-events-none`. `EditorStartScreen.vue:17–19` roots itself as `absolute left-0 w-screen` with its own `top: calc(…)` (`:89–92`). An out-of-flow child is not a flex item, so `flex items-center justify-center` is inert for the only content this slot has ever held — it survives from the pre-T.D9 era when the hero was in flow (the `lg:mt-[var(--work-area-top-offset)]` seat named at `:3–4`). Both sides also duplicate `pointer-events-none` (`EditorShell.vue:60` and `EditorStartScreen.vue:18`) and both duplicate the `z-controls` rung (`EditorShell.vue:60`, `EditorStartScreen.vue:18`).

None of this misrenders. It matters because the wrapper's utilities read as the hero's positioning authority and are not; the next editor of either file has to derive that from scratch.

**Falsifier.** Delete `flex items-center justify-center` from `EditorShell.vue:60` and observe any position change in the hero — **UNPROVEN-NEEDS-LIVE**, though the CSS box model makes the outcome unambiguous.

### D-C14 — INFO — the icon is documented as `☰` and is not

`EditorStartScreen.vue:165` — "The ☰ glyph sits inline at ~0.8em cap height — an icon voiced as a word." The imported glyph is Lucide `List` (`:61`), whose node set is three dots plus three lines (`@lucide/vue/dist/esm/icons/list.mjs`: `M3 5h.01`, `M3 12h.01`, `M3 19h.01`, `M8 5h13`, `M8 12h13`, `M8 19h13`) — a bulleted list, not a hamburger. `☰` is Lucide `Menu` / `AlignJustify`. Since the icon is being read *as a word* in running prose ("from the list ☰ below"), which mark it actually is, is the whole point of the line.

`demo/app/index.html:38` carries the matching drift on the other side of the seam: "the hero `<h1 class="text-display-4">`" — the rung is `text-display-mega` (`EditorStartScreen.vue:27`); `text-display-4` is the *mobile* step-down (`:125`).

**Falsifier.** A different `List` node set in the installed `@lucide/vue@1.17.0` than the six paths quoted.

### D-C15 — INFO — under `prefers-reduced-motion` the hero's ellipsis rests permanently at 20% ink

`TypingDots.vue:91` sets `respectReducedMotion: true`. The engine's contract for that flag is "snap `play()` to the **final frame** in a single paint instead of running the rAF/WAAPI loop" (`src/animation/constants/types.ts:146–152`), implemented at `engine/play-lifecycle.ts:375–381` → `playReducedMotion` (`:320–330`) → `fillForwards()`. The final frame is `"100%": { opacity: REST_OPACITY }` (`TypingDots.vue:95`), so the PRM rest paint is `0.2` — matching the CSS rest paint at `:123` and the component's own claim at `:121–123`. The dots therefore hold at 20% of `--foreground` beside a `clamp(5.382rem, 4rem + 9vw, 11.089rem)` hero, forever, for PRM users.

Recorded as INFO rather than a defect because the value is a *gated* choice: `:51–53` cites `proof:typing-dots (c)`'s "≥0.15 floor" and the dots are `aria-hidden="true"` (`:14`) decorative, so WCAG 1.4.3 does not bind. It is flagged only so that any future PRM or contrast pass knows this rung was chosen, not defaulted.

**Falsifier.** The engine painting the `50%` frame, or clearing the inline style entirely, on the PRM path — `fillForwards()` at `play-lifecycle.ts:325` says otherwise.

---

## Superlatives (L-18 runs both ways)

### S-C1 — the light/heavy barrel boundary is consumed **exactly** as designed

`TypingDots.vue:27–28` takes the *type* `CSSKeyframesAnimation` (erased under `verbatimModuleSyntax`; the barrel re-exports it type-only at `src/animation/index.ts:283`) and the *runtime* `stagger` (a genuine LIGHT export, `index.ts:94`, "shares only Value's `/math` leaf") statically — and reaches the heavy constructor **only** through `loadAnimationEngine()` (`index.ts:308` → `load-engine.ts:123–124`, the sole `import("./public")` edge). No deep `@src/animation/*` path, no `/engine` subpath shortcut, no static value.js edge.

This is not accidental: the barrel's own docstring (`index.ts:1–26`) defines this split as the package's central contract, and `proof:boundary` gates it. A hand-written hero component got it right on the first read.

**Falsifier.** A built-chunk trace showing value.js or `./engine` on the entry chunk *attributable to the hero* — **UNPROVEN-NEEDS-LIVE**; the static graph is unambiguous.

### S-C2 — the R1 parser-crash class is unreachable from this component, and the one string that *does* cross into value.js was checked, not assumed

The only values the hero hands the engine are numeric: `fromKeyframes({ "0%": {opacity: 0.2}, "50%": {opacity: 1}, "100%": {opacity: 0.2} })` (`TypingDots.vue:92–96`), with the invariant named in-file at `:9–12` ("only numeric opacity is interpolated, so no string ever reaches a `_lerp` value position"). Every color in the hero (`--foreground` at `:109`/`:142`, `--muted-foreground` at `:153`) is CSS-only and never crosses the boundary. `parseCssColor` is not reachable — the R1 shipping-crash class (`parseCssColor("oklch()")`) has no path here.

One string *does* cross: `timingFunction: "steps(4, jump-none)"` (`:90`) routes through `easing-registry.ts:131` → value.js `parseTimingFunction` → `steppedEase` (`:110–114`). I executed it against the installed value.js 4.0.0 rather than assume:

```
parseTimingFunction("steps(4, jump-none)") → ok {kind:"steps", count:4, position:"jump-none"}
steppedEase(4,"jump-none")                 → ok; 0→0, .25→.333, .5→.667, .75→1, 1→1
```

Clean monotone 4-step curve, no throw, no NaN. `jump-none` is a first-class `JumpPosition` in value.js's published type (`dist/subpaths/easing.d.ts:31,87`) even though the string appears nowhere in keyframes.js's own `src/` or `test/`. The consumer reached past its own library's test coverage into the transitive dependency's surface — and landed.

**Falsifier.** Any hero-reachable path that calls `parseCssColor`, or a `steppedEase` regression under a different value.js pin.

### S-C3 — the late-dynamic-resolve unmount race is guarded, correctly and minimally

`TypingDots.vue:69` declares `let unmounted = false`; `:76` re-checks it immediately after `await loadAnimationEngine()`; `:103–107` flips it and calls `anim.stop()` for every constructed animation, then clears the array. This is the precise shape a dynamic-engine consumer needs — the `await` is a real suspension point, and a component torn down inside it would otherwise construct and `play()` animations onto detached nodes with no owner. The hero is mounted/unmounted on *every* scene navigation (`EditorShell.vue:60`, `v-if="showStartScreen"`), so this path is hot, not theoretical.

**Falsifier.** A heap/rAF trace showing a live animation after a home→scene navigation — **UNPROVEN-NEEDS-LIVE**.

### S-C4 — the engine dogfood is load-bearing, not decorative — S-8's KEEP is affirmed against the engine's actual contract

lane-frontend `S-8` ruled `TypingDots` JUSTIFIED BESPOKE on the strength of its own comment. I checked the claim against the library rather than the comment, and it holds on all three legs:

1. **It is a real engine animation**, not a CSS shim: `new CSSKeyframesAnimation({ iterationCount: "infinite", … })` at `:86–96`, with `setTargets`/`play` at `:97–98`. The `NumericAnimation` alternative is correctly ruled out in-file (`:80–83`) because it is single-pass — verified against `src/animation/physics/numeric.ts`.
2. **The PRM delegation actually delegates**: `respectReducedMotion: true` (`:91`) routes to the engine's ONE `withReducedMotion` gate (`play-lifecycle.ts:375`), which is the same authority `SpringProgress`, `SmoothProgress`, `RAFPlayback`, `Sequence` and `viewTransition` ride. `lane-frontend.md:489` flags this as "correct if the delegation holds, unverified statically" — it holds: `playReducedMotion` (`:320–330`) → `fillForwards()` → the `100%` frame, which is `REST_OPACITY`. The comment's readability claim is true.
3. **It exercises the `stagger` primitive for real** (`:61`, `from: "first"` monotone ramp) rather than reimplementing it — the one place in this hero where the library is genuinely dogfooded, and the direct counterexample that makes **D-C2** actionable rather than pedantic.

Replacing it with glass-ui's `Pulse`/`PagerDots` would delete live library coverage of `CSSKeyframesAnimation` + `iterationCount:"infinite"` + `respectReducedMotion` + `stagger` from the demo's most-viewed surface. **KEEP** — with the S-8 rationale upgraded from self-attestation to verified.

**Falsifier.** The engine's PRM path painting a non-final frame, or `stagger`'s `"first"` origin producing a non-monotone ramp (`stagger.ts:79–90` says otherwise).

---

## Ledger

| id | sev | claim | anchor |
|---|---|---|---|
| D-C1 | MAJOR | display-weight override dead vs glass-ui 7.0.0 `--font-display-weight` | `EditorStartScreen.vue:99–101,107` |
| D-C2 | MAJOR | shadows `splitText`; UTF-16 split regresses DISCHARGED F26-4 | `AnimatedText.vue:82` |
| D-C3 | MAJOR | italic above fold, unpreloaded, upright-only fallback + `font-synthesis:none` | `EditorStartScreen.vue:32,138,149` |
| D-C4 | MAJOR | `subtitle`/`subtitleSuffix` icon-sandwich, never exercised | `EditorStartScreen.vue:40–44,69–70` |
| D-C5 | MAJOR | sole `h1`/`h2` source; decorative ink; unmounts per scene | `EditorStartScreen.vue:27,40,45` |
| D-C6 | MINOR | `offsetMs`/`cycleMs` non-reactive (compiler-verified) | `AnimatedText.vue:69` |
| D-C7 | MINOR | `count` reactive in template, mount-once in engine wiring | `TypingDots.vue:15,61,71` |
| D-C8 | MINOR | unpinned glass-ui tokens consumed bare; fallbacks inverted | `EditorStartScreen.vue:125,153` |
| D-C10 | MINOR | corpus "zero engine dependency" false; LCP transposition unpriced | `TypingDots.vue:27–28,75` |
| D-C9 | INFO | glass-ui consumed with zero imports; F-1 blind spot on the LCP node | `EditorStartScreen.vue:61–63` |
| D-C11 | INFO | `cqi` units with no query container | `EditorStartScreen.vue:186,189` |
| D-C12 | INFO | redundant `.delays(count)`; `hint: undefined` no-op | `TypingDots.vue:61–63`, `:76` |
| D-C13 | INFO | inert flex centering + doubled `pointer-events-none`/`z-controls` | `EditorShell.vue:60` |
| D-C14 | INFO | `☰` comment vs Lucide `List` glyph; `text-display-4` stale in head | `EditorStartScreen.vue:165` |
| D-C15 | INFO | PRM rest paint holds the ellipsis at 20% ink (gated choice) | `TypingDots.vue:91,123` |
| S-C1 | ★ | light/heavy barrel boundary consumed exactly right | `TypingDots.vue:27–28,75` |
| S-C2 | ★ | R1 parser-crash class unreachable; `steps(4,jump-none)` executed clean | `TypingDots.vue:90,92–96` |
| S-C3 | ★ | late-resolve unmount race guarded on a hot path | `TypingDots.vue:69,76,103–107` |
| S-C4 | ★ | S-8 KEEP affirmed against the engine, not the comment | `TypingDots.vue:86–98` |

**defects 15 · blockers 0 · superlatives 4**
