claude-opus-5[1m]

# CHALLENGE · `EditorStartScreen` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorStartScreen.vue` (191 L)
**Substrate** keyframes.js `master` @ `8281638c` (`git worktree list` → main tree at `8281638c [master]`). READ-ONLY; no installs, no dev server, no browser.
**Mode** static + source-derived. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read whole** the target, plus every file it imports — `./AnimatedText.vue` (126 L), `./TypingDots.vue` (125 L), `@lucide/vue` (`List`) — plus both mount sites (`demo/app/App.vue:50`, `demo/components/instrument/shell/EditorShell.vue:62`), the barrel (`shell/index.ts`), the cascade it consumes (`demo/styles/style.css`, `demo/styles/layout.css`), the installed producer artifact (`node_modules/@mkbabb/glass-ui/dist/styles/typography/{scale,semantic}.css`, `transitions.css`), the library primitives it dogfoods (`src/animation/orchestration/stagger.ts`, `src/animation/group/{group,types,waapi}.ts`, `src/animation/physics/playback.ts`, `src/animation/engine/options.ts`), and the gate apparatus it cites (`package.json` scripts, `scripts/gates/**`, `git log`).

**Hitherto corpus folded** `lane-frontend.md` (F-1 phantom-dep, F-2/S-1 stale-rationale fork, S-5 AnimatedText→TypewriterText, S-8 TypingDots JUSTIFIED-KEEP, roster row `191 | EditorStartScreen.vue | b`), `lane-library.md` (§1 exports/scripts, §3.3 dynamic edges, §5 test placement, L-1/L-2 lint defects).

**Posture** assumed DEFECTIVE until the tree proved otherwise. Six candidate defects were **killed by their own falsifiers** and are recorded in §4 so the next auditor does not re-raise them. The component is genuinely strong in three places (§3) and the strongest finding below (L-EST-2) is a *new instance of an already-banked class*, not a re-statement of it.

---

## 0. Headline

| # | Finding | Sev |
|---|---|---|
| **L-EST-1** | The **entire** type/ink contract of this file resolves through **undeclared** glass-ui tokens + one glass-ui `@utility`. This is F-1's widest single-file blast radius, and the census roster miscodes the file as glass-free (`b`). | **BLOCKER** |
| **L-EST-2** | **BG-6 has already shipped** in the installed glass-ui 7.0.0 (`--font-display-weight`). The file (`:100`) and `style.css:48` both assert the token does not exist. **Three** redundant weight-400 mechanisms are live; one `@theme` line retires two. A NEW instance of the F-2/S-1 class. | MAJOR |
| **L-EST-3** | Five `proof:*` gates cited as binding authority (`:15,:56,:134,:159,:181`) were **deleted from the tree by `70b32501`**; the `92746148` "remove retired gate authority references" sweep **missed this file**. Unenforceable authority claims. | MAJOR |
| **L-EST-4** | **Zero** test coverage for the LCP hero *and* for the flagship engine-dogfood seam — while `test/demo/instrument/KfPillTabs.test.ts` covers the component lane-frontend wants deleted. Contradicts S-8's "keep — it's library coverage". | MAJOR |
| **L-EST-5** | `TypingDots` spends **N independent `RAFPlayback` loops** on a 3-glyph ellipsis where `AnimationGroup` owns exactly one — and `stagger`'s own docblock names that composition as the canonical idiom. | MAJOR |
| L-EST-6 | `AnimatedText.vue:69` plain-destructures `props` → `offsetMs`/`cycleMs` are **non-reactive snapshots** consumed by the template at `:24,:39`. | MINOR |
| L-EST-7 | `subtitle` / `subtitleSuffix` is an i18n-hostile split contract with an unsuppressible icon wedged between the halves; overriding one half alone produces a broken sentence. | MINOR |
| L-EST-8 | `--start-hero-band: 34dvh` exists solely to clear THIS hero as a raw-vh magic number, while this hero's own comment (`:85-86`) bans exactly that. Plus `CubeScene.vue:260` cites a class this file no longer has. | MINOR |
| L-EST-9 | Dead default-slot fallback: `EditorShell.vue:62 <EditorStartScreen />` is unreachable. Two mount sites, one live. | MINOR |
| L-EST-10 | CSS duplication inside a 110-line sheet: `.hero-deck`/`.hero-hint` share 5 of 6 declarations; **two** separate `@media (max-width: 1023px)` blocks. | MINOR |
| L-EST-11 | The hint renders `<h2>` (`:45`) — a parenthetical as a document heading, sibling to the real deck `h2`. | MINOR |
| L-EST-12 | `AnimatedText.vue:36` fans `$attrs` onto **N** char spans — `id` duplicates N×, listeners bind N×. | MINOR |
| L-EST-13 | `TypingDots` `count` is reactive in the template (`:15`) but engine-wired once in `onMounted` — post-mount changes desync DOM from animations. | MINOR |
| L-EST-14 | 9-line tombstone comment (`:49-57`) documenting deleted code. | INFO |
| L-EST-15 | **Inverted** `var()` fallbacks: present on the two tokens that can never be missing, absent on the four that provably can. | INFO |
| L-EST-16 | No linter reaches this file. `npm run lint` = `depcruise src`; no ESLint/oxlint/biome config in the repo. L-EST-6 is precisely what `vue/no-setup-props-destructure` catches. | INFO |
| L-EST-17 | Hidden cross-file contract: `font-roles.json:36` binds a role to `h1.hero-display .wave-char` — `AnimatedText`'s **private scoped** class — and nothing reads the manifest (see L-EST-3). | INFO |
| **L-EST-18** | The mobile subtitle rung wins by **source order alone**, at equal specificity, under a *different class name* than the base rule it overrides. Reordering the sheet silently kills the serif floor `:177-181` calls mandatory. | MINOR |
| L-EST-19 | `6.2cqi` / `5.4cqi` (`:185`, `:188`) with **no container ancestor** — they resolve against the small viewport by fallback, not by the design the comment describes. | INFO |
| L-EST-20 | Three provably no-op utility classes: `p-0` (`:27`), `w-full` (`:40`, `:45`). | INFO |
| **C-1** | **Corpus contradiction.** U lane-22 F3 / `U.D.md:194` assert the hero has "**ZERO** engine dependency". False transitively — `:29` renders `<TypingDots>`, which imports the engine barrel and awaits `loadAnimationEngine()`. The *verdict* survives; the premise does not. | — |

**Tally** 20 defects · 1 blocker · 5 superlatives · 10 candidates killed by falsifier · 1 corpus contradiction.

---

## 1. Defects

### L-EST-1 — the phantom dependency bites hardest exactly here · **BLOCKER**

**Provenance.** The file imports **zero** glass-ui JS. lane-frontend §4 therefore rosters it `191 | EditorStartScreen.vue | b` (no glass-ui import). **The tree disagrees at the CSS layer.** Every visual quantity in the file is glass-ui-sourced:

| consumed at | symbol | defined where |
|---|---|---|
| `:27` `class="… text-display-mega …"` | `@utility text-display-mega` | `node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css:1` |
| `:109` `color: var(--foreground)` | `--foreground` | glass-ui `styles/**` (`light-dark(hsl(24 10% 10%), hsl(30 14% 90%))`) |
| `:140`, `:151`, `:185`, `:188` `var(--type-title)` | `--type-title: 2.058rem` | glass-ui `typography/scale.css:1` `:root` |
| `:125` `var(--type-display-4)` | `--type-display-4: clamp(3.33rem, 2.5rem + 4vw, 5.382rem)` | glass-ui `typography/scale.css:1` `:root` |
| `:153` `var(--muted-foreground)` | `--muted-foreground` | glass-ui `styles/**` |
| `:18` `class="… z-controls …"` | the **utility class itself** | glass-ui `dist/styles/tokens/scheme-motion.css:1` (`--z-controls: 20`) **plus** `dist/styles/theme/bridges.css` (`@theme inline { … --z-index-controls: var(--z-controls) … }` — the theme key Tailwind v4 *generates the class from*) |

**Sixth row, second pass.** `z-controls` is not merely a token read — the class does not exist unless glass-ui's bridge sheet is loaded, because Tailwind derives `z-<name>` utilities from `--z-index-*` theme keys and the demo's own `@theme` (`style.css:42-67`) declares none. Probe:

```
$ grep -o -- "--z-index-controls: var([^)]*)" node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css
--z-index-controls: var(--z-controls)
$ grep -rn -- "--z-index-" demo/styles/   → (no output)
```

This **qualifies superlative S5**, which praises `z-controls` as the disciplined alternative to a bracket `z-[N]`. The praise stands on discipline and falls on durability: the disciplined choice is the one that evaporates under F-1, while the `z-[20]` bracket it avoided would have survived. That is not an argument for the bracket — it is the sharpest available statement of what F-1 costs.

Probe that none of the four *value* tokens is demo-owned:

```
$ grep -rn -- "--type-title:\|--type-display-4:\|--foreground:\|--muted-foreground:" demo/   → (no output)
$ grep -rho -- "--type-title:[^;]*;" node_modules/@mkbabb/glass-ui/dist/styles/  → --type-title: 2.058rem;
```

Only `--font-display` (`:137`, `:148`) is demo-owned (`demo/styles/style.css:55`).

**Why BLOCKER.** F-1 (lane-frontend, RED): glass-ui is absent from `package.json` **and** `package-lock.json` while 7.0.0 sits in `node_modules`. `demo/styles/style.css:3 @import "@mkbabb/glass-ui/styles"` is the load-bearing edge. On a clean `npm ci` the import cannot resolve and the build dies before this file is reached; if the import were softened, this component degrades to browser-default type and default ink because **it declares no fallback on any of the four glass tokens**. The file is the demo's LCP node and its single largest painted surface — of the 21 `.vue` files the census marks glass-free, this is the one whose *entire* rendered identity is glass-owned.

**Falsifier.** Any of: (a) `grep -c "glass-ui" package-lock.json` returns non-zero on HEAD; (b) one of `--type-title` / `--type-display-4` / `--foreground` / `--muted-foreground` is found defined under `demo/`; (c) `demo/styles/style.css` gains local definitions for all four so the hero survives a glass-less resolve. Any one kills the BLOCKER rating (leaving L-EST-15's inverted-fallback finding standing on its own).

**Contradiction of corpus, explicit.** lane-frontend §4's `G/b` column is an *import-graph* classification and is correct as such; used as a coupling proxy it understates this row by 100%. Recommend the roster gain a third state (`b*` = no import, CSS-coupled) or the wave order in §10 note that F-1's remediation is a prerequisite for the hero, not just for the 37 importing files.

---

### L-EST-2 — BG-6 already shipped; three live mechanisms for one intent · MAJOR

**The claim in the tree.** `EditorStartScreen.vue:99-101`:

> `this scoped 400 is the hero's own belt-and-braces` / `(dies into the --font-display-weight token when glass-ui ships BG-6)`

and `demo/styles/style.css:47-49`:

> `glass-ui's text-display-* rungs hardcode font-weight:600 and there is no --font-display-weight token to swap it, so the honest 400 lands via the @layer demo-typography rung override`

**The installed producer artifact.** `node_modules/@mkbabb/glass-ui/dist/styles/typography/scale.css:1`, in `:root`:

```
--font-display-weight: 600;
--type-weight-display: var(--font-display-weight);
--type-tracking-display: -0.015em;
```

`typography/semantic.css:1`:

```
@utility text-display-mega { … font-weight: var(--type-weight-display);
                                 letter-spacing: var(--type-tracking-display); … }
```

The weight is **not hardcoded** and the swap token **exists**, named exactly as the comment predicted. BG-6 is on disk. The tracking is tokenised too.

**Consequence — three mechanisms, one intent.** All three are simultaneously live for "the hero renders Instrument Serif at 400":

1. `EditorStartScreen.vue:107` scoped `font-weight: 400` (self-described "belt-and-braces"), plus `:108` `font-synthesis: none` re-declaring what `:root` already sets (`:99-101` says so).
2. `demo/styles/style.css:263-274` — an 8-selector `@layer demo-typography` block overriding `font-weight` + `letter-spacing` on the whole `text-display-*` ladder.
3. The token, unused: `grep -rn -- "--font-display-weight" demo/` → **one hit, and it is prose** (`style.css:48` asserting it does not exist).

Two lines in `style.css`'s existing `@theme` (`:42`) — `--font-display-weight: 400; --type-tracking-display: 0;` — retire both (1) and (2), and land the intent at the token layer glass-ui published for it.

**Class, not novelty.** This is lane-frontend **F-2 / S-1's exact shape**: a demo-side mechanism whose written justification cites a glass-ui limitation that the *installed* 7.0.0 has already removed (S-1: `aria-orientation` unconditional → `dist/tabs.js:232 … : void 0`). S-1 found it in a 217-line fork; this is the same failure in a 3-line CSS override plus two prose assertions. **The census did not catalogue this instance** — §5's shadow census enumerates bespoke *components*, not stale *cascade* rationales. Recommend the S-1 remediation wave carry a generalized clause: re-verify every "glass-ui doesn't ship X" comment against `node_modules/@mkbabb/glass-ui/dist/`.

**Falsifier.** (a) `--font-display-weight` is absent from the installed `scale.css` (it is not — quoted above); (b) setting `--font-display-weight: 400` in `@theme` fails to reach the utility because Tailwind v4's `@theme` does not emit into the same `:root` cascade the utility reads — **this is the one live-ish leg**: mark the *replacement* as `UNPROVEN-NEEDS-LIVE`, but the *defect* (a false comment + a redundant mechanism) is fully proven statically; (c) the demo deliberately wants tracking `0` **and** weight 400 while other consumers want 600 — but the demo controls `@theme` for itself, so this does not save the override.

---

### L-EST-3 — five cited gates were deleted from the tree; the retirement sweep missed this file · MAJOR

The file cites `proof:*` gates as binding authority at five sites:

| line | citation |
|---|---|
| `:15` | `Gated by proof:hero-two-focal (OWNER, successor of the retired hero-rung/-balance/-cls FROZEN locks).` |
| `:56` | `proof:design-refinement's S1 home arm was re-cut in the same motion` |
| `:134` | `No weight above 400 anywhere on the start screen (proof:hero-deck-voice).` |
| `:159` | `never a silent-flatten (proof:styling-idioms membership).` |
| `:181` | `the display face may never render below the smallest display rung (proof:font-census clause b).` |

Its import `TypingDots.vue` adds three more clause-level cites of a sixth gate: `:46` (`proof:typing-dots (d)'s ≤1.6s ceiling`), `:51` (`(c)'s ≥0.15 floor`), `:59` (`(b)`). **Six distinct gate names, eight citation sites.**

**None is executable.**

```
$ node -e 'console.log(Object.keys(require("./package.json").scripts).join("\n"))' | grep proof
proof:publish        → node scripts/gates/surface/index.mjs
proof:owner-golden   → node scripts/gates/visual/index.mjs
$ grep -rn "hero-two-focal\|hero-deck-voice\|font-census\|design-refinement\|styling-idioms" scripts/   → (no output)
$ git ls-files | grep "scripts/proof-"   → (no output)
```

**They existed and were deliberately dissolved:**

```
$ git log --oneline -3 -- scripts/proof-hero-two-focal.mjs
70b32501 refactor(tranche-u): dissolve the proof apparatus around direct product checks
92746148 docs(U.Z2): remove retired gate authority references
969990f6 refactor(demo-home): dissolve the at-sign wrapper …
$ git show --stat --oneline 70b32501 | grep -c "proof-"   → 183
```

`70b32501` deleted 183 `proof-*` paths. `92746148` — literally titled *"remove retired gate authority references"* — was the follow-up prose sweep. **It did not touch these three files:**

```
$ git show --stat --oneline 92746148 | grep -iE "EditorStartScreen|TypingDots|AnimatedText"   → (no output)
$ git log --oneline -5 -- demo/components/instrument/shell/EditorStartScreen.vue
969990f6 refactor(demo-home): …          ← older than 92746148; never swept
```

The only surviving `proof-*.mjs` files in the checkout sit in an orphaned worktree (`.claude/worktrees/wf_645e7d37-d7f-13/scripts/proof-hero-two-focal.mjs`), not on `master`.

**Why MAJOR and not INFO.** `:15` does not merely reference a gate — it asserts the hero's φ-band seat *is gated*, by an OWNER-blocking oracle, as the named successor of three retired FROZEN locks. A reader (or a future wave) taking that at face value will believe the seat is machine-defended when nothing checks it. The same file's `:181` grounds a hard numeric floor (`1.5rem`) in `proof:font-census clause b`, and `font-roles.json` — the manifest that gate read — is now an orphan data file (L-EST-17). This is the value.js-side "proof idiom retired as overfit junk" ruling arriving in keyframes.js and leaving eight tombstones behind.

**Falsifier.** Any of the six names resolves to an executable check reachable from `package.json` or CI (e.g. as a clause inside `scripts/gates/surface/index.mjs` or `scripts/gates/visual/index.mjs`) — I read both directories' file lists and grepped their contents for all six names; the only near-hits are `scripts/gates/surface/published-surface.mjs:175-176`, which describes `dist/_proof-typing-dots` as **"the historical typing-dots check"** (past tense, gitignored), and `scripts/observe/demo/live-session.mjs:1162 budget.attach(page, "S2:prm-typing-dots")`, an observability *label*. Neither is a gate.

---

### L-EST-4 — the LCP hero and the flagship dogfood seam have zero tests · MAJOR

```
$ grep -rln "EditorStartScreen|hero-band|hero-deck|hero-hint|AnimatedText|TypingDots|wave-char|typing-dot" test/   → (no output)
$ grep -rln "start-screen|startScreen|hero" test/   → test/scroll/scroll-scene.test.ts   (unrelated: scroll "hero" fixture)
```

`test/demo/` holds 27 files / 153 cases (lane-library §5). It covers `KfPillTabs`, iOS text entry, toolbar keyboard, resize tracks, timeline undo, transport actuation, `useAnimationGroupPlayback`, `useThrottledReadout`, the value4 editor boundary, seven scene suites, and five state suites. It does not cover this component, its two children, or the hero at all.

Two edges make this MAJOR rather than a bare coverage gap:

1. **The uncovered component is the one lane-frontend elected to keep for coverage.** S-8 rules `TypingDots` **JUSTIFIED BESPOKE, do not replace** on the grounds that "replacing it with a glass primitive would *remove library coverage*." That justification is a *live-exercise* argument with no automated assertion behind it: nothing in `test/` constructs a `CSSKeyframesAnimation` the way `TypingDots.vue:86-98` does, and nothing asserts the teardown at `:103-107`. Meanwhile `test/demo/instrument/KfPillTabs.test.ts` gives a dedicated suite to the component S-1 rules **replace (rationale void)**. The test investment is inverted with respect to the census's own verdicts.
2. **The repo already owns the missing test shape.** `test/demo/scenes/scene-raf-leak.test.ts` exists — rAF-leak discipline is asserted for scenes. `TypingDots` opens N rAF loops in `onMounted` and closes them in `onBeforeUnmount`; it is the exact subject that suite's harness was built for, and it is excluded.

**Falsifier.** A test file (any name) that mounts `EditorStartScreen`, `AnimatedText`, or `TypingDots`, or that asserts on `.wave-char` / `.typing-dot` / the hero seat. My grep covered all of `test/` for eight distinct identifiers and returned nothing; a test asserting via a non-obvious selector (e.g. a snapshot of `App.vue`) would weaken the "zero coverage" phrasing to "no direct coverage" — the S-8 inversion argument survives either way.

---

### L-EST-5 — N rAF loops where the library ships one · MAJOR

`TypingDots.vue:78-100` builds one `CSSKeyframesAnimation` **per dot** and calls `.play()` on each:

```ts
els.forEach((el, i) => {
    const anim = new CSSKeyframesAnimation<{ opacity: number }>({ … delay: delays[i] ?? 0 … })
        .fromKeyframes({ … });
    anim.setTargets(el);
    anim.play();          // ← :98
    anims.push(anim);
});
```

Each standalone animation owns its own driver — `KeyframesAnimation` composes a `_playback` (`src/animation/engine/play-lifecycle.ts:22`, `:39`) and `RAFPlayback` holds a **per-instance** `_rafId` scheduling its own `requestAnimationFrame` (`src/animation/physics/playback.ts:78`, `:83`, `:119`, `:150`). Three dots ⇒ **three rAF callbacks per frame, forever** (`iterationCount: "infinite"` → `Infinity`, verified at `src/animation/engine/options.ts` `normalizeIterationCount`).

`AnimationGroup` exists precisely to collapse that: `src/animation/group/group.ts:87` `readonly playback = new RAFPlayback();` — **one** driver for all children.

And the component is already holding half the idiomatic composition. `stagger`'s own docblock (`src/animation/orchestration/stagger.ts:1-24`) names the whole pattern:

> `stagger is a pure delay distribution computed ONCE, at construction, then handed to the substrate that already carries it — AnimationGroup's per-child delay`
> ```ts
> const delay = stagger(items.length, { each: 50, from: "center" });
> const group = new AnimationGroup(items.map((el, i) => ({ animation: fadeIn(el), options: { delay: delay(i, items.length) } })));
> ```

`TypingDots.vue:61-63` performs the first half exactly (`stagger(props.count, { each: STEP_MS, from: "first" }).delays(props.count)`), cites the primitive by name at `:59`, then **discards the composition** and drives the children individually. Fix is mechanical: keep the per-child `delay` on each `CSSKeyframesAnimation`'s options as today, hand the three to `new AnimationGroup(...)`, and `.play()`/`.stop()` the group.

**Two honest deflations, stated so the finding survives them:**

- **WAAPI lowering is NOT forfeited by this choice.** `src/animation/group/waapi.ts:29-31` refuses any multi-target group — `"group requires one shared target"` — and three dots are three targets. The group rewrite buys one rAF loop, **not** compositor offload. Any claim that the current shape loses WAAPI eligibility would be false.
- **`stagger`'s docblock example does not typecheck against the current input type.** `AnimationGroupInput` (`src/animation/group/types.ts:27-29`) is `KeyframesAnimation<V> | { animation, layer? }` — there is **no `options` field**, so `options: { delay: … }` in the quoted example is stale library documentation. That is a genuine library-side defect (severity MINOR, `src/animation/orchestration/stagger.ts:19-22`) and it is the most plausible *cause* of the consumer's hand-rolled shape: the consumer followed the primitive to a docblock whose composition example is wrong. The correct composition (per-child `delay` on the child's own options, children handed to the group) is still available — it is simply undocumented.

**Falsifier.** (a) `RAFPlayback` multiplexes through a module-global ticker, making N instances free — it does not (`_rafId` is a private per-instance field, `playback.ts:83`); (b) `AnimationGroup` cannot host per-child infinite iteration counts or heterogeneous targets — `group.ts:159`/`:201` compute `singleTarget` as a *property*, so multi-target groups are constructible and merely ineligible for the native lowering; (c) three rAF callbacks are below any measurable budget — plausible, and it is why this is MAJOR-on-idiom rather than a perf blocker. The *idiom* claim (a dogfood component that names the library's own composition primitive and then does not compose) stands independent of the frame cost.

---

### L-EST-6 — `AnimatedText` snapshots two props out of reactivity · MINOR

`AnimatedText.vue:55-69`:

```ts
const props = withDefaults(defineProps<{ text: string; offsetMs?: number; cycleMs?: number }>(), { offsetMs: 55, cycleMs: 3600 });
const { offsetMs, cycleMs } = props;      // ← :69
```

Vue 3.5's reactive-props destructure transform applies only to the direct form `const { x } = defineProps()`. Here `defineProps` is bound to `props` on one statement and destructured on the next, so the compiler emits plain `const` bindings holding the values read once at setup. The template consumes both bindings — `:24` `'--wave-cycle': \`${cycleMs}ms\`` and `:39` `animationDelay: \`${(word.startIndex + ci) * offsetMs}ms\`` — so a parent that changes `offsetMs`/`cycleMs` gets no re-render. Note `text` is (correctly) read as `props.text` inside the `computed` at `:75`, so the file is internally inconsistent about the same object.

**Why MINOR, not MAJOR.** Latent: the sole consumer is `EditorStartScreen.vue:28 <AnimatedText :text="title" />`, which passes neither prop. The defect is unconditional in the code; the impact requires a consumer that does not yet exist.

**Falsifier.** `vite.config.ts` (or `@vitejs/plugin-vue`) enables a props-destructure transform that rewrites two-statement destructures — no such option exists in the Vue compiler; or the two bindings are never read in the template — they are, at `:24` and `:39`.

---

### L-EST-7 — the `subtitle`/`subtitleSuffix` split is not a composable contract · MINOR

`:40-44` renders `{{ subtitle }}` · `<List>` · `{{ subtitleSuffix }}` from three separately-defaulted props (`:73-76`: `"from the list"` / `"below, then press Play."`, with the icon hard-wired between them and no prop to suppress it).

Failure mode: a consumer overriding `subtitle` alone inherits the default suffix and renders e.g. `"pick a curve ☰ below, then press Play."`. The sentence is fragmented across three bindings plus a fixed glyph, so no single caller can express a different sentence shape, and no caller can localise it (word order is structural). The single live consumer (`App.vue:50`) passes only `hint`, so all three defaults hold — the contract is never exercised, which is why it has not bitten.

**Falsifier.** A second consumer that passes `subtitle` and `subtitleSuffix` as a coherent pair (there is none: `grep -rn "subtitleSuffix" demo/` hits only this file), or a prop that hides the icon (there is none). If the component is accepted as *not* reusable (see L-EST-9's conclusion), the right fix is to delete the three props and inline the copy, not to widen the contract.

---

### L-EST-8 — the hero's own anti-magic-number law is broken by the token that clears it · MINOR

`:82-87` and `:112-116` state the law twice: the seat is `Derived ENTIRELY from the work-area chain … No raw vh/px magic number (the K.W3 M4/C5 ban holds)` and the mobile rung steps `via the published --type-display-4 token (never a raw px)`. The seat honours it (`:89-92`, `:118-123`) — see superlative S5.

But the token other components use to *avoid* this hero is a raw number: `demo/styles/layout.css:26`

```
--start-hero-band: 34dvh; /* the phone home hero/subject band split … clears the display-4 mobile hero on the 667/844 heights */
```

consumed at `demo/scenes/cube/CubeScene.vue:267 padding-block-start: var(--start-hero-band)`. The hero's actual mobile band is `calc(var(--work-area-top-offset) + var(--work-area-height) * 0.52)` (`:118-123`), where both terms are `:root`-scoped and re-derived under `@media (max-width: 1023px)` (`layout.css:184-186`). `34dvh` is a hand-fit of that expression at two specific heights; any change to `--work-area-max-height`, `--dock-band-reserve`, or the `0.52` share silently desyncs the clearance with no gate to catch it (L-EST-3).

Second, smaller edge in the same coupling: `CubeScene.vue:260` describes the hero as `parks in the top band (EditorStartScreen \`pt-[var(--dock-top-band-reserve)]\`)`. That class is not in this file — `grep -n "dock-top-band-reserve" demo/components/instrument/shell/EditorStartScreen.vue` → no output. The T.D9 re-seat moved the hero out of the top band and the cross-reference was not updated.

**Falsifier.** `34dvh` is provably equal to the derived expression at all viewports (it is not — `--work-area-height` is `min(100dvh, min(64rem, calc(100dvh - var(--dock-band-reserve))))` below `lg`, and `--dock-band-reserve` contains a live `ResizeObserver` term `--menubar-measured-h`, so the derived band *breathes* and a constant cannot track it); or `--start-hero-band` is consumed for something other than clearing this hero (its own comment says otherwise).

---

### L-EST-9 — dead default-slot fallback; the component is not reusable · MINOR

Two mount sites:

```
demo/app/App.vue:50                                     <EditorStartScreen hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;" />   (inside <template #start-screen>)
demo/components/instrument/shell/EditorShell.vue:62     <EditorStartScreen />                                  (slot default content)
```

`EditorShell`'s sole consumer is `App.vue:28` (`grep -rn "EditorShell" demo/ --include=*.vue --include=*.ts` → the only render site is `App.vue:28`; every other hit is a comment or the barrel export), and `App.vue` **always** supplies `#start-screen`. So `EditorShell.vue:62` is unreachable — dead code, and it silently diverges from the live call (no `hint`).

The related structural point: the component's root (`:17-19`) hard-codes `absolute left-0 w-screen` plus a `top:` computed from `:root` tokens. It renders correctly only inside a full-viewport positioned containing block, which its one host happens to provide (`EditorShell.vue:61 <div class="absolute inset-0 z-controls flex items-center justify-center pointer-events-none">`). That host also re-declares `z-controls` and `pointer-events-none`, both of which the child sets again (`:18`), and its `flex items-center justify-center` is inert against an absolutely-positioned child. The component is a *fragment of `EditorShell`* wearing a component's clothes — which is fine, but then the dead fallback, the three-prop copy contract (L-EST-7), and the duplicated positioning declarations are all cost with no reuse to pay for them.

**Falsifier.** A second `EditorShell` render site anywhere (including tests — there are none, L-EST-4), or a consumer that mounts `EditorStartScreen` outside a full-viewport positioned parent. Both greps came back empty.

---

### L-EST-10 — duplication inside the 110-line scoped sheet · MINOR

`.hero-deck` (`:135-144`) and `.hero-hint` (`:146-154`) differ in exactly two declarations (`margin-block-start`, `color`) and repeat five identical ones (`font-family`, `font-style`, `font-weight`, `font-size`, `line-height`). The file's own comment (`:130-134`) says they are one rung by design — the CSS does not say it: no shared selector, no shared custom property.

Separately, the sheet opens **two** `@media (max-width: 1023px)` blocks — `:117-127` (the band + display rung) and `:182-190` (the prose clamps) — 55 lines apart, in a single-author 110-line file. Both were merged from different waves (`J.W7a TYP-1`, `K.W3 U-K9`) and never consolidated.

**Falsifier.** The two media blocks carry different conditions (they are byte-identical: `@media (max-width: 1023px)`), or the deck/hint declarations must diverge in a state the file does not express (nothing in the file or `font-roles.json:41-50` suggests so — the manifest asserts the *same* `voice`/`weight`/`style` tuple for both roles, differing only in ink).

---

### L-EST-11 — the hint is not a heading · MINOR

```html
:40  <h2 class="start-screen-prose start-screen-subtitle hero-deck w-full">   ← the deck
:45  <h2 v-if="hint" class="start-screen-prose hero-hint w-full">             ← the optional gesture tip
```

Two sibling `h2`s under one `h1`, where the second is a parenthetical aside, not a section title. It introduces a phantom outline node and, for a screen-reader user navigating by heading, a second same-level landmark whose content is an optional gesture tip. `<p>` is the correct element; the entire visual contract (`:146-154`) is class-driven and survives the swap unchanged.

**Falsifier.** A CSS or gate dependency on `h2` for the hint — `font-roles.json:47-48` binds the role by class (`.hero-hint`), not element, and the scoped rule is `.hero-hint`, so nothing in the tree needs the tag. Flagged MINOR (not MAJOR) because it is severity-shared with the A11Y axis, which owns the AT-navigation consequence.

---

### L-EST-12 — `$attrs` fans out to N elements · MINOR

`AnimatedText.vue:53` sets `inheritAttrs: false` and `:36` re-binds `v-bind="$attrs"` on the **per-char** span inside the `v-for`. The stated intent (`:51-52`) is that "decorative classes passed by a consumer still land on the moving glyphs" — which works for `class`/`style` and breaks for everything else: an `id` is emitted once per glyph (17 duplicate ids for the default title, invalid HTML and a broken `document.getElementById`), an `aria-*` attribute is stamped on every glyph inside an already-`aria-hidden` subtree, and a listener (`@click`) binds N times so one user click fires N handlers.

Latent today — the one consumer (`EditorStartScreen.vue:28`) passes only `:text`. The contract is nonetheless wrong for any attribute that is not additive.

**Falsifier.** A consumer relying on the fan-out (none: `grep -rn "<AnimatedText" demo/` → one site, `:text` only), or evidence that Vue de-duplicates fallthrough `id` across a `v-for` (it does not).

---

### L-EST-13 — `count` is reactive in the template, one-shot in the engine · MINOR

`TypingDots.vue:15` renders `v-for="i in count"` from the reactive prop, while the engine wiring runs once in `onMounted` (`:71-101`) over a snapshot of `dotEls.value`. Raising `count` after mount adds spans that render at the stylesheet's `opacity: 0.2` (`:117-124`) and never animate; lowering it leaves entries in `anims` driving detached elements until unmount. There is no `watch` on `count` and no re-arm path.

Latent: the sole consumer renders `<TypingDots />` with defaults (`EditorStartScreen.vue:29`). Either make `count` a construction-time constant (drop the prop, or document it as mount-only) or `watch` it and re-arm.

**Falsifier.** A `watch`/`watchEffect` on `count` anywhere in the file (there is none — the script is 88 lines and fully read), or a consumer that mutates `count` (none).

---

### L-EST-14 — 9-line tombstone for deleted code · INFO

`:49-57` is a comment describing code that no longer exists: `the @KEYFRAMES · LIVE typing card (kf-source-egg) is EXCISED: markup + ~140L scoped CSS + useHeroSourceEgg.ts, all deleted.` It sits in the template, after the last rendered node, and carries a citation to a now-nonexistent gate (`proof:design-refinement`, L-EST-3). The excision is recorded in git and in `docs/tranches/T/stage-manifests/home.json:13`; the source does not need to carry it. `feedback_no_backwards_compat`-adjacent: the shim is documentary rather than executable, but it is the same class of residue.

**Falsifier.** A reader-facing reason the source must carry the negative inventory — `stage-manifests/home.json` already holds it as the machine-readable forbidden set, which is the better home.

---

### L-EST-15 — the `var()` fallbacks are inverted · INFO

`:89-92` and `:119-123` supply fallbacks for the two tokens that cannot be missing:

```css
top: calc(var(--work-area-top-offset, 0px) + var(--work-area-height, 100dvh) * 0.45);
```

Both are `:root`-scoped in `demo/styles/layout.css` (`:12 :root {`, `:51`, `:69`, and re-derived at `:184-186`), imported unconditionally by `demo/styles/style.css`. The fallbacks are unreachable defensive code — and the `0px` one is actively misleading: if it *could* fire the hero would jump to the viewport top, silently reproducing the exact top-band collision T.D9 was ruled to fix (`:2-16`).

Meanwhile the four tokens that provably **can** be missing (L-EST-1: they live in an undeclared, unlocked dependency) carry **no** fallback at `:109`, `:125`, `:140`, `:151`, `:153`, `:185`, `:188`.

**Falsifier.** `--work-area-top-offset` or `--work-area-height` is defined somewhere non-`:root` such that a hero outside that subtree would miss it — both are `:root` (verified: the enclosing selector for `layout.css:51`/`:69` is `:root {` opened at `:12`).

---

### L-EST-16 — no linter reaches this file · INFO

```
$ node -e 'const p=require("./package.json");console.log(p.scripts.lint, "|", p.scripts.check)'
depcruise src | tsc --noEmit && tsc --noEmit -p tsconfig.test.json
$ ls -a | grep -iE "eslint|oxlint|biome"   → (no output; only .prettierrc.json)
```

`lint` is dependency-cruiser scoped to `src` — the library graph only (and lane-library's L-1/L-2 show that config has its own dead allowlist and a phantom baseline). `check` is `tsc --noEmit`, which validates types but has no opinion on Vue idiom. So the demo tier — 58 `.vue` / 11 984 lines — has **zero** lint coverage. L-EST-6 is exactly `vue/no-setup-props-destructure`; L-EST-12's duplicate-`id` fan-out is `vue/no-duplicate-attributes`-adjacent; L-EST-10's duplicated media blocks are a stylelint concern. The absence of a demo linter is why a hand audit is finding them.

**Falsifier.** An ESLint/oxlint config elsewhere (a `package.json#eslintConfig` key — absent; a config under `demo/` — `ls -a` of the repo root and the script list both come back clean), or a CI step running one (out of this lane's read scope; if CI runs `eslint` without a checked-in config it would fail, so the claim is safe).

---

### L-EST-17 — an orphaned manifest binds a private scoped class · INFO

`demo/styles/font-roles.json:35-38`:

```json
{ "role": "hero-display", "selector": "h1.hero-display .wave-char",
  "expect": { "voice": "display", "weight": 400, "style": "normal" } }
```

Two problems. (a) `.wave-char` is `AnimatedText`'s **scoped, private** class (`AnimatedText.vue:98`); a rename inside that component silently invalidates an external JSON contract with no import edge and no type to catch it — and the two files are in different directories. (b) Nothing reads the manifest: its `_doc` (`font-roles.json:2`) says it is "the committed artifact `proof:font-census`'s clause (e) reads", and that gate was deleted (L-EST-3). The manifest is a data file with no consumer, describing expectations no process checks — while the file it describes (`:181`) cites it back as binding authority. A closed loop of two unenforced documents.

Also unmeasured by the manifest even if the gate returned: the `.hero-dots` glyphs (`:29` → `TypingDots` `.typing-dot`) and `AnimatedText`'s `sr-only` mirror span, both children of the same `h1`, are outside the `.wave-char` selector.

**Falsifier.** Any code path that loads `font-roles.json` (`grep -rn "font-roles" --include=*.ts --include=*.mjs --include=*.vue .` outside `docs/` → the only references are prose), or a lint rule tying scoped class names to the manifest.

---

### L-EST-18 — the mobile subtitle rung is held by source order alone · MINOR

L-EST-10 records that the sheet duplicates declarations and splits its breakpoint. This is the *correctness* half of that shape, and it is a distinct claim: one of the duplicated `font-size` declarations is a live conflict resolved by nothing but line number.

The subtitle element carries three classes (`:40`):

```html
<h2 class="start-screen-prose start-screen-subtitle hero-deck w-full">
```

Its `font-size` is declared twice, under **two different selectors**:

```css
:140   .hero-deck              { font-size: var(--type-title); }
:185   .start-screen-subtitle  { font-size: clamp(1.5rem, 6.2cqi, var(--type-title)); }   /* inside @media (max-width: 1023px) */
```

Both are single-class selectors — `(0,1,0)`, each raised identically by the scoped `[data-v-…]` attribute to `(0,2,0)`. Neither is layered (scoped SFC CSS is unlayered). Neither carries `!important`. **The media-query rule wins only because line 185 is below line 140.**

Two consequences:

1. **Fragility.** Hoisting the `.hero-deck`/`.hero-hint` block below the media queries — the obvious tidy-up that L-EST-10's split breakpoint invites, and the shape a formatter or a "group the media queries" pass would produce — silently deletes the phone clamp. What dies with it is the `1.5rem` serif floor that `:177-181` calls a hard requirement ("the display face may never render below the smallest display rung"), backed by a gate that no longer exists (L-EST-3). Nothing else would notice: no test (L-EST-4), no lint (L-EST-16), no gate.
2. **Grep-defeat.** The base rule and its mobile override are keyed to *different class names* for the same element. An editor changing the deck rung greps `.hero-deck`, finds `:140`, and never sees `:185`.

`.hero-hint` is not exposed the same way — its base (`:146`) and its override (`:187`) share one selector, so the override is an ordinary same-selector cascade. The asymmetry between the two sibling rungs is itself the tell that `:185` was authored in a different wave (`K.W3 U-K9`) than `:135` (`T.D11`).

**Falsifier.** Any mechanism making the override order-independent — a higher-specificity selector (both are equal, verified by inspection), an `@layer` (neither is layered), or `!important` (absent). Or evidence that `.start-screen-subtitle` and `.hero-deck` are never co-applied — they are, on the same element, `:40`.

---

### L-EST-19 — container-query units with no container · INFO

`:185` `clamp(1.5rem, 6.2cqi, var(--type-title))` and `:188` `clamp(1.5rem, 5.4cqi, var(--type-title))` use container-query inline units. **No ancestor of the hero establishes a query container.** The only `container-type` in the whole demo cascade is an opt-in utility nobody in this chain applies:

```
$ grep -rn "container-type\|container:" demo/styles/ demo/app/ demo/components/instrument/shell/
demo/styles/style.css:239:        container-type: inline-size;      ← inside @layer utilities { .container-inline-size { … } }
```

Chain checked: `EditorShell.vue:2-4` (root) → `:60` (overlay) → `EditorStartScreen.vue:17` (band) → `:40` (the element). None carries `.container-inline-size` or any `container-*` declaration.

Per spec, `cqi` without a query container resolves against the small-viewport inline size — so the units behave as `vi`/`vw`. The rule therefore works, by fallback rather than by the mechanism its neighbours document (`layout.css:17-22` explains the demo's *deliberate* `cqi/cqb` usage on the cube target, where a container genuinely exists — so the idiom is understood in this repo and simply unfulfilled here).

The middle term binds only for viewport widths where `1.5rem ≤ 6.2 % · w ≤ 2.058rem`, i.e. **≈387–531 px** — real phone widths, so the clamp is not inert. The exposure is that a one-class change on any wrapper (adding `.container-inline-size` for an unrelated reason) silently re-scales the LCP node's deck against that wrapper, with nothing to catch it.

**Falsifier.** A `container-type` / `container-name` / `container` shorthand on any ancestor of `.hero-band` (probed across `demo/styles/`, `demo/app/`, `demo/components/instrument/shell/` — only the unused opt-in utility), or a spec reading in which `cqi` without a container is invalid rather than viewport-relative (it is viewport-relative; the initial containing block is the fallback query container).

---

### L-EST-20 — three provably no-op utility classes · INFO

- `:27` `<h1 class="hero-display text-display-mega p-0">` — Tailwind v4 preflight already zeroes `padding` on every element, and no rule in `demo/styles/`, in glass-ui `dist/styles/`, or in the UA sheet sets `h1 { padding }`. `p-0` cannot change a pixel.
- `:40`, `:45` `class="… w-full"` on both `<h2>` — each is a block-level child of a plain block (`.hero-band` sets no `display`, so it is `block`), where `width: auto` already fills the content box. `w-full` restates the initial value.

Trivial in cost, and listed for one reason: each is an assertion the tree does not back, in a file whose central defect (L-EST-3) is exactly that. A reader cannot tell by inspection which of this file's many declarations are load-bearing.

**Falsifier.** Any rule setting `h1 { padding }` anywhere in the resolved cascade, or a `display: flex`/`grid`/`inline-*` on `.hero-band` that would make `w-full` meaningful (`:88-94` sets only `top` and `padding-inline`; the utility list at `:18` sets position, inset, and width).

---

## 2. — (no additional blockers)

L-EST-1 is the sole BLOCKER. L-EST-3 would arguably be a blocker on a GOVERNANCE axis (an OWNER-blocking gate asserted over an ungated surface); on the LIBRARY axis it is a MAJOR documentation-integrity defect and is rated as such.

---

## 3. Superlatives (L-18, the other direction)

### S1 — the async-teardown discipline is exemplary · `TypingDots.vue:69,75-76,103-107`

```ts
let unmounted = false;                                  // :69
onMounted(async () => {
    const { CSSKeyframesAnimation } = await loadAnimationEngine();
    if (unmounted) return;                              // :76 — the await-race guard
    …
});
onBeforeUnmount(() => { unmounted = true; for (const anim of anims) anim.stop(); anims.length = 0; });
```

An `await` inside `onMounted` is the single most common leak shape in Vue: the component unmounts while the promise is in flight, the continuation then constructs and `.play()`s an infinite animation against a detached node with no owner left to stop it. This file guards it explicitly, stops every animation, **and** clears the array so the closure holds no references. The comment (`:67-68`) names the hazard precisely. Of the 68 engine-consuming demo files this is the pattern the rest should be measured against.

*Falsifier (L-18 runs both ways).* The guard would be dead if `loadAnimationEngine()` always resolved synchronously — it does not; it is one of the library's only two dynamic edges (`src/animation/load-engine.ts:124`, lane-library §3.3). It would be *insufficient* if `anim.stop()` did not release the rAF handle — `RAFPlayback` owns a cancellable `_rafId` (`physics/playback.ts:83`). Neither deflation lands. Note the guard is *belt-and-braces* in practice because `demo/app/main.ts` awaits `warmKfEngine()` before `app.mount()`, so the promise is pre-resolved — which makes it *more* praiseworthy, not less: it is correct for a boot order the component does not control.

### S2 — the per-glyph a11y mirror is the right construction · `AnimatedText.vue:21-25`

One `sr-only` span carries the whole phrase; the entire animated layer is `aria-hidden="true"`. AT hears `"Select an animation"`, never the glyph stream. The same two-tier split solves a second, unrelated trap the comment documents at `:10-13`: Vue's `whitespace: 'condense'` strips whitespace-only text nodes between sibling spans, so the inter-word gap is a per-word `margin-inline-end: 0.25em` (`:29-32`) rather than a rendered space — the naive `"Selectananimation"` regression cannot recur. Two recorded lessons preserved through a third rewrite, with the reasons written down. This is what lane-frontend S-5 should weigh before proposing `TypewriterText`: the swap must preserve *both* invariants, not just per-char granularity.

### S3 — the engine-painted property has a correct pre-first-frame value · `TypingDots.vue:51-53,117-124`

`REST_OPACITY = 0.2` in script, `opacity: 0.2` in the stylesheet, with the comment stating exactly why: the engine paints `opacity` per frame, so the stylesheet must carry the resting paint or the dots are invisible before frame 1 **and** under `prefers-reduced-motion` (where the engine snaps to the resting frame). The keyframes are symmetric (`0%`/`100%` both `REST_OPACITY`, `:92-96`), so either resting convention yields the readable value. This is the correct discipline for *every* engine-driven property and it is rare — the general failure is a JS-animated property with no CSS initial value, producing a flash.

### S4 — the LCP text is fully painted at frame 0 · `AnimatedText.vue:98-116`

`animation: charLift var(--wave-cycle, 3.6s) infinite both` over keyframes whose `0%` is `transform: translateY(0)`. With `animation-fill-mode: both` and a positive per-char `animation-delay` (`:39`), each glyph holds its `0%` frame — *fully opaque, at its final position* — for the whole delay window. The motion is transform-only and compositor-friendly. An opacity- or width-based typewriter would have pushed the demo's LCP element behind its own animation; this construction makes that impossible, which is precisely what `style.css:52-54` needs to be true when it names this `h1` the LCP node. Paired with the metric-matched `"Instrument Serif Fallback"` face (`style.css:55`), the LCP box is final from first paint. `UNPROVEN-NEEDS-LIVE` for the actual LCP timing; the *structural* claim (no frame in which the glyphs are unpainted) is fully static.

### S5 — the seat is derived, with zero magic numbers, in a file where cheating was trivial · `:88-94,117-127`

```css
top: calc(var(--work-area-top-offset, 0px) + var(--work-area-height, 100dvh) * 0.45);
padding-inline: clamp(2rem, 5vw, 4.5rem);
```

and the mobile rung steps through the published `var(--type-display-4)` rather than a hand-picked `px`. The `z-controls` token is used instead of a bracket `z-[N]`. A "hero should sit lower on the page" instruction is the canonical invitation to write `top: 45vh` and move on; this file resolved it through the existing work-area chain and wrote down why (`:82-87`). Corpus note: lane-frontend §6.3 records exactly one acknowledged raw-`z-index` exception in the demo (`CubeAxisLines.vue`) — this file is not it, and (per L-EST-8) the discipline it keeps is stricter than the discipline of the token that clears it.

---

## 4. Candidates KILLED by their own falsifier

Recorded so the next auditor does not spend the probe budget twice. Each was a plausible defect the tree refuted.

| candidate | why it dies |
|---|---|
| **`w-screen` (100vw) overflows past the scrollbar gutter** (`:18`) | The host root is `class="editor-shell relative grid h-dvh max-h-dvh w-dvw overflow-hidden …"` (`EditorShell.vue:2-4`). `overflow-hidden` means no scrollbar and no horizontal overflow; `100vw == 100dvw` for width regardless. The `vw`/`dvw`/`dvh` unit mixture across the chain is an inconsistency, not a bug. |
| **Multi-root template ⇒ attribute fallthrough breaks / Vue warns** | The template root is comment · `div` · comment (`:2`, `:17`, `:49`). Vue tags such a root with the `DEV_ROOT_FRAGMENT` patch flag and `renderComponentRoot` resolves the single element child, so fallthrough and `class` merging behave as single-root. Not a defect. |
| **`await loadAnimationEngine()` in the hero's `onMounted` drags the heavy value.js chunk into the LCP path** (`TypingDots.vue:75`) | `demo/app/main.ts` awaits `warmKfEngine()` **before** `app.mount()` (`demo/kf-engine.ts:20-21,38-42`), and `loadAnimationEngine()` memoizes its promise. By the time `TypingDots` mounts the chunk is resolved; the `await` costs a microtask, not a fetch. (A *related*, non-defect observation: `kfEngine()` would give the class synchronously and remove the race entirely — but `kf-engine.ts:12-13` explicitly sanctions the per-site async form as the house idiom, so this is a preference, not a finding.) |
| **The N-animation shape forfeits WAAPI lowering** | `src/animation/group/waapi.ts:29-31` refuses any group without a single shared target. Three dots are three targets, so `AnimationGroup` would be refused too. The group rewrite (L-EST-5) buys one rAF loop, not compositor offload. |
| **`@lucide/vue` is a second phantom dependency** (`:61`) | Declared: `package.json:74 "@lucide/vue": "^1.17.0"`. And consistent — `grep -rhon 'from "@lucide/vue"\|from "lucide-vue-next"' demo/` → **24** hits, all `@lucide/vue`, zero of the legacy specifier. |
| **`<Transition name="fade">` at the mount site has no CSS classes** (`EditorShell.vue:52`) | `grep -rn "fade-enter\|fade-leave" demo/` → nothing, but `node_modules/@mkbabb/glass-ui/dist/styles/transitions.css:1` ships `.fade-enter-active/.fade-leave-active/.fade-enter-from/.fade-leave-to` in `@layer components`, with a `prefers-reduced-motion` clamp. Delegation is real. (It is one more undeclared-glass-ui edge — folded into L-EST-1 rather than double-counted.) |
| **The deck's `{{ subtitle }}` · `<List/>` · `{{ subtitleSuffix }}` (`:41-43`) hits the same `whitespace: 'condense'` trap `AnimatedText.vue:10-13` documents — the words will run together** | **No.** Vue's condense drops a whitespace-only text node only when **both** neighbours are ELEMENT (or comment) nodes *and* the node contains a newline; otherwise it is condensed to a single space. Here both whitespace nodes are flanked by an INTERPOLATION on one side, so both survive as single spaces. The deck renders `"from the list ☰ below, then press Play."` The X-5 lesson does not generalise to this file, and the split-prop contract (L-EST-7) is bad for reasons that have nothing to do with whitespace. |
| **`timingFunction: "steps(4, jump-none)"` (`TypingDots.vue:90`) is a bare string, and the engine is documented fail-explicit about string easings (`stagger.ts:139-148` *throws* on one) → it throws inside the async `onMounted`, the rejection is swallowed by Vue's async-hook handler, and the dots never animate** | **No — the fail-explicit rule is `stagger`-local.** `timingFunction` routes `options.ts:40-46` → `resolveEasingOption` (`compile/easing/easing-option.ts:23-66`) → `resolveTimingFunction` (`easing-registry.ts:121-135`), which parses CSS literals through value.js `parseTimingFunction` and maps `steps` → `steppedEase(count, position)` (`:110-113`). `jump-none` is present in the installed `@mkbabb/value.js/dist/subpaths/{css,easing}.js`. It resolves, and `cssTwinFor` even attaches the faithful CSS twin. Likewise `iterationCount: "infinite"` is explicitly normalised to `Infinity` (`options.ts:49-57`). The dogfood's option surface is *correct*, not merely plausible. |
| **`font-style: italic` (`:138`, `:149`) under `:root { font-synthesis: none }` (`style.css:100`) renders upright — the comment's "the ital@1 face is already loaded" (`:32-33`) is the kind of claim L-EST-2 shows this file gets wrong** | **No — this one is true.** `demo/app/index.html:70,75` request `family=Instrument+Serif:ital@0;1` — both faces, one payload. And the fallback chain (`"Instrument Serif Fallback"` → local Georgia → `serif`, `style.css:55`) carries true italics at every rung, so even a blocked Google Fonts fetch cannot produce the synthesis-suppressed upright. Recorded because L-EST-2 establishes that this file's producer-facing claims must be checked, not assumed — and checking found this one sound. |
| **The band overflows short phones, and `EditorShell.vue:3 overflow-hidden` clips the hint rather than scrolling it** | **Not filed — the arithmetic clears it, narrowly.** At 320×568 with `--dock-band-reserve ≈ 60px`: band top ≈ 287px (`0.382·60 + 0.52·508`); hero 2 lines at the `--type-display-4` floor (53.3px × `line-height: 0.92`) ≈ 98px; deck 2 lines at the `1.5rem` floor ≈ 55px; hint 1 line ≈ 28px; margins 18px → bottom ≈ 486px against a dock band beginning ≈508px. It fits with ~20px. A two-line hint consumes that margin, and the failure mode would be a **clip, not a scroll**. **UNPROVEN-NEEDS-LIVE** — handed to the SS-13 visual audit as a specific probe (320px width, two-line `hint`), not asserted here. |

---

## 5. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| **F-1** (glass-ui phantom dep, RED) | **Extended.** L-EST-1 is F-1's widest single-file exposure and shows the §4 roster's `G/b` column understates it by 100% for this row. Recommend a third roster state (`b*` = no import, CSS-coupled). |
| **F-2 / S-1** (fork justified by a defect fixed in installed 7.0.0) | **New instance found.** L-EST-2 is the same failure mode in the *cascade* rather than in a component. The shadow census enumerates bespoke components only; recommend a generalized re-verify clause over all "glass-ui doesn't ship X" prose. |
| **S-5** (`AnimatedText` → `TypewriterText`, AMBER, "verify per-char granularity first") | **Two more preconditions.** Superlative S2: the swap must also preserve (a) the single `sr-only` accessible mirror over an `aria-hidden` visual layer and (b) the non-space inter-word gap that defeats Vue's `whitespace: 'condense'`. Per-char granularity is the *third* requirement, not the only one. |
| **S-8** (`TypingDots` JUSTIFIED BESPOKE — "replacing it removes library coverage") | **Verdict upheld, justification unbacked.** L-EST-4: nothing in `test/` asserts on it. The keep is right; the stated reason is a live-exercise claim with no automated net, and L-EST-5 shows the exercise itself skips the library's documented composition. |
| **lane-library §5** (100 % external test placement; `test/demo` 26 files) | **Consistent** (I count 27 files on `8281638c`; the delta is `scene-entries.test.ts` sitting at `test/demo/` root rather than in a subdir — a counting convention, not a disagreement). L-EST-4 adds the hero-shaped hole. |
| **lane-library §1** (`lint` = `depcruise src`) | **Extended.** L-EST-16: that scoping leaves the entire 11 984-line demo tier unlinted, which is the proximate cause of L-EST-6 and L-EST-12 surviving. |
| **lane-library L-1/L-2** (dead allowlist paths; phantom baseline file) | **Same class as L-EST-3.** Three independent instances of *configuration/prose asserting machinery that is not wired*. Recommend one wave that greps every `proof:` / baseline / allowlist citation in the repo against the executable surface. |
| **U lane-22 F3 / `U.D.md:194`** ("the hero has ZERO engine dependency") | **CONTRADICTED — see C-1 below.** |

### C-1 — corpus contradiction, stated explicitly

> `docs/tranches/U/audit/lane-22-perf-demo-runtime.md:110-112` — "the LCP element — the hero `<h1>` in `instrument/shell/EditorStartScreen.vue` — imports only `@lucide/vue` `List`, `AnimatedText`, `TypingDots` (`EditorStartScreen.vue:61-63`): **zero engine dependency.**"
>
> `docs/tranches/U/waves/U.D.md:194` — "The hero `<h1>` (`EditorStartScreen.vue:61-63`) has **ZERO** engine dependency, yet mount waits on the full heavy graph."

**False, transitively.** `EditorStartScreen.vue:29` renders `<TypingDots />` *inside* the LCP `<h1>`, and `TypingDots.vue:27-28` imports `@mkbabb/keyframes.js` (type + `loadAnimationEngine`, `stagger`) and awaits `loadAnimationEngine()` at `:75`. The hero's own import list is engine-free — the lane read *that* correctly, and cites the right lines — but it then promoted a one-file import list to a subtree claim without following the two child components it had just enumerated in the same sentence. The census's own §1 count contradicts it from the other side: 68 demo files import the library, and `TypingDots.vue:8` is the file lane-frontend quotes as naming the "inv-ζ seam".

**The verdict survives; the premise must be re-stated.** F3's remedy — mount immediately, warm at idle, transpose the scene-machine's sync non-null `AnimationGroup` contract into an async-tolerant one — is still correct, because the `<h1>`'s *glyphs* (the actual LCP paint) need only CSS, the font, and the DOM; superlative S4 shows they are painted at frame 0 with no engine involvement. What changes is the follow-through: under the inversion the **dots** begin their pulse when the engine resolves rather than at mount. That is already safe by construction — the `unmounted` latch (`TypingDots.vue:69,76`) tolerates an arbitrarily late resolve (superlative S1), and the stylesheet's `opacity: 0.2` makes the pre-resolve state a *designed* frame rather than a blank (superlative S3) — but an implementer who trusts "zero engine dependency" would not know to check either, and would be surprised to find an engine import under the element they were told was engine-free.

Two secondary corrections to the same entry, both cheap to land with it:

- It cites the accessor as `@utils/kfEngine.ts` / `kfEngine.ts:27,38-43`. The file is **`demo/kf-engine.ts`**, aliased `@kf-engine` (`App.vue:148`, `main.ts:30`); no `demo/@utils/` path exists on `8281638c`.
- It quotes the mount gate as `void Promise.all([warmKfEngine()…, fontsDecoded]).finally(…)`. The live line (`main.ts:50`) is `warmKfEngine().catch(() => undefined)` — the warm is already failure-tolerant, which the elision hides and which matters to F3's risk assessment.

---

## 6. Recommended remediation order (this component's share)

1. **L-EST-1 / F-1** — declare `@mkbabb/glass-ui: 7.0.0` and regenerate the lock. Nothing below is reproducible first.
2. **L-EST-3** — finish the `92746148` sweep: strip the 8 dead gate citations from `EditorStartScreen.vue` (`:15,:56,:134,:159,:181`) and `TypingDots.vue` (`:46,:51,:59`), or re-author the checks. Decide `font-roles.json`'s fate in the same motion (L-EST-17). *(Read the deletion commit `70b32501` first — it names the replacement posture: "direct product checks".)*
3. **L-EST-2** — two lines into `style.css`'s `@theme`; delete `EditorStartScreen.vue:107-108` and the `@layer demo-typography` weight/tracking block. Verify live (the `@theme` → `:root` emission is the one unproven leg).
4. **L-EST-4** — one test file: mount the hero, assert the `.wave-char` count and the `sr-only` mirror text, assert `.typing-dot` animation arm + teardown on unmount (reuse `scene-raf-leak.test.ts`'s harness).
5. **L-EST-5** — collapse `TypingDots` onto one `AnimationGroup`; fix `stagger.ts`'s docblock example while there.
6. **L-EST-9 / L-EST-7 / L-EST-11 / L-EST-14** — one cleanup pass: delete the dead fallback, decide reusable-or-inline for the copy props, `h2`→`p` for the hint, drop the tombstone.
7. **L-EST-10 / L-EST-18 / L-EST-15** — merge the two media blocks **and, in the same motion, re-key the mobile subtitle override to `.hero-deck`** so it stops depending on line order (L-EST-18 is the reason step 7 must not be a blind "group the media queries" pass — done naively it deletes the serif floor); move the fallbacks onto the tokens that can actually be missing (or delete them once step 1 makes the point moot). L-EST-19 (`cqi` with no container) and L-EST-20 (the three no-op utilities) ride this same pass.
8. **L-EST-8** — derive `--start-hero-band` from the work-area chain, or delete it and let `CubeScene` read the same expression; fix the `:260` cross-reference.
9. **L-EST-16** — a demo-tier linter (out of this component's scope, but it is the durable fix for L-EST-6 / L-EST-12).

---

## Provenance note

Every claim above is sourced from reads of `/Users/mkbabb/Programming/keyframes.js` (working tree at `8281638c [master]`), its `node_modules/@mkbabb/glass-ui/dist/` and `node_modules/@mkbabb/value.js/dist/` (the copies already installed in the audit target), and `git log`/`git show --stat`/`git ls-files`/`git worktree list`. No file in keyframes.js was written, mutated, or executed; no installs, no dev server, no browser tooling. The producer repo `/Users/mkbabb/Programming/glass-ui` was **not** read for this challenge (the installed artifact is the authority for what the demo actually resolves against). The single write of this task is this file.

**Second-pass note (merge, not overwrite).** This artifact was extended by a second independent L-axis pass over the same target and the same head. That pass re-derived the component from source without consulting this file first, then folded its deltas in rather than replacing a stronger artifact with a weaker one. What it added: **L-EST-18** (the order-only override — the correctness half of L-EST-10), **L-EST-19** (`cqi` with no container), **L-EST-20** (three no-op utilities), the **sixth row of L-EST-1's table** (`z-controls` is a glass-ui-*generated* class, not merely a glass-ui token read — which qualifies superlative S5), **C-1** (the U lane-22 / U.D F3 contradiction, a corpus edge the first pass did not fold), and **four** additional killed candidates in §4 (the condense trap that does not generalise, the `steps(4, jump-none)` resolution chain, the `ital@0;1` payload, and the 320×568 overflow arithmetic).

Claims inherited from the first pass that the second pass **independently re-verified before adopting**, since publishing them means owning them: `--font-display-weight: 600` present in the installed `typography/scale.css` (L-EST-2); `70b32501` / `92746148` as the gate-deletion and missed-sweep commits (L-EST-3); `group.ts:87 readonly playback = new RAFPlayback()` and `physics/playback.ts:83 private _rafId` as a per-instance handle (L-EST-5); `play-lifecycle.ts:436-441` `stop()` cancelling WAAPI **and** the rAF loop, settling, and resolving the pending play promise, plus `:376-382` routing reduced motion to the final frame — which is `REST_OPACITY`, matching both the `0%` frame and the stylesheet (S1, S3); `stagger.ts:133-178` `from: "first"` yielding exactly `distance · each` (S1's companion). Every adopted claim survived its own falsifier a second time.
