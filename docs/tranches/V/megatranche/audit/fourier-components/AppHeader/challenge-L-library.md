claude-opus-5[1m]

# CHALLENGE — `AppHeader.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/layout/AppHeader.vue` (354 lines: 30 script · 92 template · 232 style)
**Posture** Assumed DEFECTIVE until the tree proved otherwise. Every row carries file:line provenance and its own falsifier; three candidate defects were **killed by their falsifiers** and are recorded in §5 rather than suppressed. L-18 runs both ways — §4 books six superlatives on the same evidentiary standard.
**Method** Static + source-derived only. No browser tooling. One livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read closure** The component whole, plus every file it imports and one hop past where the import is a re-export: `DarkModeToggle.vue`, `UserSlugBar.vue`, `stores/workspace.ts` (471), `stores/gallery.ts` (293), `composables/useFourierMorph.ts` (230), `lib/svg-fourier.ts` (154), `components/decorative/FourierMorphSvg.vue` (41), `lib/easings.ts`, `lib/colors.ts` (117), `router/index.ts` (192), `App.vue`, `src/style.css`, and the installed `@mkbabb/glass-ui@4.0.0` / `@mkbabb/keyframes.js@4.3.0` export maps and engine chunk.

**Tally — 23 defects (1 BLOCKER · 5 MAJOR · 10 MINOR · 7 INFO) · 6 superlatives.**

---

## §0 — Hitherto corpus, folded not re-invented

| Corpus row | What it already says | This challenge's relation |
|---|---|---|
| `lane-frontend.md:176` | `AppHeader.vue` \| 354 \| "Global header — nav `DropdownMenu` + `HoverCard` + `Button`" | **Extends.** The census counted it; nobody had opened it. |
| `lane-frontend.md:177,419-421` | `DarkModeToggle` = **CHARACTERFUL SHADOW**, "keep, but reconcile against the 7.0.0 props/tokens rather than let it drift" | **Sharpens with a number.** The drift is not stylistic — it is **L-1**, 450 631 B on the eager boot path. "Keep" is still right; "keep as-is" is not. |
| `lane-frontend.md:473` | `./hover-card` **removed at glass-ui 5.0.0** (`CHANGELOG.md:216`, `BI.W-OVERLAY-UNION`); 2 importers, one of them `AppHeader.vue:20` | **Confirms + localises** → **L-9**. |
| `lane-frontend.md:479` | keyframes peer floor: glass-ui 7.0 peers `^6.0.0`, installed **4.3.0** | **Corroborated** — `node_modules/@mkbabb/keyframes.js/package.json.version = 4.3.0`. Relevant to **L-6/L-7**: the `stop()` semantics below are 4.3.0's. |
| `CENSUS-2026-08-03.md:85-86` | "**Canvas2D throughout, WebGL/WebGPU ABSENT**; three independent canvases … + 12 SVG surfaces" | **Bounds §3.** AppHeader owns none of the three canvases; its render-path touch is **SVG + the theme-flip trigger** into `resolveVizColors()`. Stated precisely in §3 rather than asserted vaguely. |
| `CENSUS-2026-08-03.md:91`, `lane-frontend.md:602,643` | the `--viz-amber` light-mode WCAG darken is an **upstream coordination ask held locally** | **New consumer surfaced** → **L-13**: AppHeader is a *chrome* consumer of that held viz token, so the glass-BH relay's blast radius is wider than the census recorded. |
| `lane-frontend.md` §4 HARD SHADOW / `CENSUS:92-94` | `lib/easings.ts` = "the producer README's **forbidden 'fourth fork'**; `./easing` ships at 7.0.0" | **New reach path** → **L-14**: AppHeader pulls the forbidden fork transitively through `useFourierMorph`. |
| intake `lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT, CARRY → F.W4) | "template-loop evidence keyed to *component* callsites is blind to native element loops" | **Explicit negative result (L-19) + a sibling class (L-16).** See §2. |
| intake **X-2** (CONFLICT — Codex correct, census wrong) | 9 route records: 7 lazy component + 2 redirect + 1 alias; `/v/:visualizationSlug` and the `/s/`→`/w/` redirect enumerated separately | **Directly weaponised** → **L-2**. X-2's route model is exactly the model `activeTab` fails to implement. This challenge is the first consumer of X-2's ruling. |

---

## §1 — Defects

### 🔴 BLOCKER

#### **L-1 — AppHeader drags 450 631 B of Fourier coefficient data into the eager entry chunk to draw a 40 px icon. It is 91.7 % of that chunk. Every route pays it.**

`AppHeader.vue:6` statically imports `DarkModeToggle`, which at `DarkModeToggle.vue:23-24` statically imports two JSON payloads:

```
src/assets/fourier-paths/sun.json    225 687 B
src/assets/fourier-paths/moon.json   224 944 B
                            total    450 631 B   (minified already — 0 newlines)
```

`App.vue:6,25` mounts `<AppHeader />` **statically** in the root template, outside `<RouterView/>`. Nothing on this path is lazy. Measured against the committed build artifact `web/dist/assets/index-dWFIqpKn.js` (the entry — `dist/index.html` `src="/assets/index-dWFIqpKn.js"`):

| measure | entry chunk | sun+moon JSON | ratio |
|---|---|---|---|
| bytes | 491 278 | 450 631 | **91.7 %** |
| digit characters | 391 656 | 391 063 | **99.8 %** |
| `eval_points` occurrences | **2** (one per shape object) | — | both payloads present |

The entry chunk's numeric content is, to within 593 characters, *entirely* these two files.

And a measurable fraction of it is provably unreachable. `prepareFourierShape` (`svg-fourier.ts:76-88`) reads exactly two fields — `data.levels` and `data.partial_sums`:

```ts
for (const level of data.levels) {
    const ps = data.partial_sums[String(level)];
    if (ps) pointsByLevel.set(level, xyToPoints(ps));
}
return { data, pointsByLevel };
```

Per-key byte census of `sun.json` / `moon.json`:

| key | sun B | % | read by any code path reachable from AppHeader? |
|---|---|---|---|
| `partial_sums` | 198 419 | 87.9 % | yes |
| `original` | 19 884 | 8.8 % | **no** |
| `decomposition` | 13 814 | 6.1 % | **no** |
| `eval_points` | 6 146 | 2.7 % | **no** |
| `levels` | 35 | 0.0 % | yes |

≈ **79 KB (17.6 %) is dead payload** shipped, parsed, and — because `FourierShape.data` retains the whole parsed object (`svg-fourier.ts:87`) — **retained on the heap for the application lifetime**.

The idle icon needs one level (`highLevel: 50`, `useFourierMorph.ts:59-68`); the morph needs the 5→50 bracket. The rest is boot tax on `/paper`, `/gallery`, `/equation` — routes where the toggle is decoration and the morph may never fire.

**Falsifiers, all attempted, all failed to clear it:**
1. *"Vite code-splits JSON to a lazy chunk."* Refuted — measured in the built entry chunk above. `FourierMorphDemo.vue:95-96` (the lazy `/morph` route) imports the same two files, which is exactly why the shared payload is hoisted *up* into the entry, not down.
2. *"The dist artifact is stale, so this is archaeology."* Partly — `dist/` is gitignored (`.gitignore:42`) and dated 2026-06-12. But the *source* imports at `DarkModeToggle.vue:23-24` are static, top-level, and unconditional, and `App.vue:25` mounts the consumer eagerly. The bundling outcome is forced by the source, not by the artifact; the artifact merely confirms it.
3. *"It's needed for the first paint of the icon."* Only `levels` + `partial_sums["50"]` are — ≈ 20 KB of the 225 KB. Everything else is deferrable to first click.

**Severity.** BLOCKER on the LIBRARY axis: this is the module-size / Goldilocks failure at its most consequential — a decorative leaf component setting the floor for the application's boot payload on every route. It is precisely the class value.js's own tranche T escalated as **Q14** (eager-WebGL-blob boot blocker, LCP 5141 / TBT 5988) — same shape, different asset. Any F-wave that measures fourier's LCP without fixing this is measuring `sun.json`.

---

### 🟠 MAJOR

#### **L-2 — `activeTab` does not know the `/v/:visualizationSlug` route. On the primary share target the header announces "Paper".**

`AppHeader.vue:34-41`:

```ts
const activeTab = computed(() => {
    if (route.path === "/paper") return "/paper";
    if (route.path === "/visualize" || route.path.startsWith("/s/") || route.path.startsWith("/w/")) return "/visualize";
    ...
    return "/paper";                       // ← the catch-all
});
```

Against the router (`router/index.ts`), and against intake row **X-2**'s adjudicated model (7 lazy component routes + 2 redirects + 1 alias):

| live route | `activeTab` yields | correct |
|---|---|---|
| `/v/:visualizationSlug` (`:57-58`) — **the saved visualization; the thing users share** | `/paper` ❌ | `/visualize` |
| `/demo/shape-extractor` (`:112-115`) | `/paper` ❌ | (none — acceptable) |
| `/s/:slug` (`:117-119`) | `/visualize` — **dead branch** | never observed |

`/s/:slug` is a `redirect`, not a rendered route: `redirect: (to) => \`/w/${to.params.slug}\``. `route.path` is therefore **never** `/s/…` once navigation settles. The `startsWith("/s/")` test at `:36` can never be true. Its presence, next to the *absence* of any `/v/` test, is the fingerprint: B.W4 renamed the saved-visualization route `/s/` → `/v/` (the rename is documented in the router's own comment at `:53-56`) and `AppHeader.vue:36` was left holding the pre-rename predicate.

Consequences, both statically provable:
- `AppHeader.vue:117-118` renders the `FileText` icon and (were it visible — see **L-3**) the word "Paper" while the user is looking at an epicycle visualization.
- `AppHeader.vue:115` announces `aria-label="Navigate — current section Paper"` to assistive tech. The header's *only* current-section signal is wrong on this route.
- `AppHeader.vue:127` marks the wrong dropdown row `is-active`, so the amber highlight lands on Paper.

**Corroborating (not this component's defect, same root):** `router/index.ts:177-188` persists `fourier_active_tab` for `/paper|/visualize|/morph|/gallery|/equation` and the `/w/` prefix — and likewise omits `/v/`. So a user who lands on a shared `/v/…` link and returns later is sent to `/paper`. Two independent sites, same missed rename.

**Falsifier.** If `/v/` were an alias of `/w/`, `route.path` would report `/w/…` and the `startsWith("/w/")` branch would cover it. Refuted: `/v/:visualizationSlug` is its own record with `name: "visualization"` (`:57-59`); the alias in this router is `alias: ["/visualize"]` on `/w/` (`:71`) — a different route. X-2 adjudicated this exact three-kind distinction.

---

#### **L-3 — `.nav-trigger-label` is `display:none` at every viewport. The nav trigger has no visible text label anywhere, and the `sm:` reveal that was meant to exist was replaced by a rule that restates the base padding.**

`AppHeader.vue:118` renders `<span class="nav-trigger-label">{{ activeTabData.label }}</span>`. `AppHeader.vue:201-204`:

```css
.nav-trigger-label {
    display: none;
    color: var(--viz-amber);   /* ← a color on a display:none element */
}
```

No other rule in the tree touches the class — `grep -rn "nav-trigger-label" src/` returns exactly two hits, both in this file (`:118` markup, `:201` style). Scoped-CSS specificity `.nav-trigger-label[data-v-*]` is unopposed. **The label never renders, at any width.**

Three independent tells that this is a lost rule, not a design choice:

1. **The sibling proves the intended pattern.** `.logo-text` does base-`display:none` → `AppHeader.vue:229-231`, then reveals at the same breakpoint → `:249-251` `display: inline`. `.nav-trigger-label` has the first half and not the second.
2. **The slot where the reveal belonged is occupied by a no-op.** `AppHeader.vue:218-222`:
   ```css
   @media (min-width: 640px) { .nav-trigger { padding: 0.25rem; } }
   ```
   Byte-identical to the base declaration at `:174` (`padding: 0.25rem`). A media query whose entire body restates the base rule is dead; it sits in the exact 640px block that already reveals `.logo-text` and grows `.header-divider` / `.dark-mode-toggle`.
3. **`color: var(--viz-amber)` on a `display:none` element** is a declaration written for a visible element.

**Consequence.** `activeTabData.label` (`:43`) is computed and interpolated for nothing; the trigger is an unlabelled icon + chevron at every viewport, and its accessible name is the `aria-label` at `:115` — which, per **L-2**, is wrong on `/v/`. L-2 and L-3 compound: the one channel still carrying the section name is the one channel that lies.

**Falsifier.** A Tailwind utility or glass-ui `Button` internal that unsets `display` would clear this. Refuted: the class is not a Tailwind utility (it is an author class in a `scoped` block), glass-ui's `Button` styles the button element and not an author-classed descendant span, and the grep above shows no competing declaration in the tree.

---

#### **L-4 — `const workspaceStore = useWorkspaceStore()` is dead, and eagerly instantiates a 471-line store — with a deep watcher, a debounce timer and a router injection — on every route in the application.**

`AppHeader.vue:49`. `grep -n "workspaceStore" AppHeader.vue` → **one hit, the declaration itself**. Not referenced in the template, not in either style block, not re-exported. By contrast `galleryStore` (`:50`) is used at `:137`.

This is not a free unused local. Calling `useWorkspaceStore()` runs the store's setup (`stores/workspace.ts:33-108`), which:
- calls `useRouter()` (`:34`) — an injection performed from AppHeader's setup context;
- registers `watch([contourSettings, animationSettings], scheduleDraftSave, { deep: true })` (`:108`) for the application lifetime;
- installs `onScopeDispose` + a `setTimeout` draft-save channel (`:72-84`);
- allocates the full state surface — two `shallowRef` payload slots for `epicycleData` / `basesData`, plus 14 refs.

Because `App.vue:25` mounts AppHeader outside `<RouterView/>`, this fires on `/paper`, `/gallery`, `/equation` and `/morph` — every route that never touches a workspace. `tsconfig.json` sets `strict: true` but **not** `noUnusedLocals`, and `<script setup>` bindings are template-visible by construction, so neither `tsc` nor `vue-tsc` will ever surface it. It is invisible to the gates.

**Provenance of the rot.** The dead `.share-pop-*` transition CSS at `AppHeader.vue:278-292` — annotated *"Share button enter/leave (A.W3.d)"* — is the matching orphan (**L-11**). A share/save affordance lived in this header, consumed the workspace store, and was removed; the store handle and its transition classes were not.

**Falsifier.** If the store were wanted for a side effect the header depends on, the dead binding would be intentional. Refuted: nothing in the header reads workspace state, and the store's only side effects (draft autosave, in-flight abort) are keyed on `imageSlug` (`:79`), which the header never sets. Second falsifier: if `useWorkspaceStore()` had to be *called from a component setup* for `useRouter()` to resolve, AppHeader might be the deliberate host. Refuted — `VisualizationView` is the real consumer and is itself a component.

---

#### **L-5 — One failed dynamic import permanently desynchronises the dark-mode icon from the theme, silently, for the rest of the session. The failure is memoised and never retried; the caller has no `catch`.**

`useFourierMorph.ts:38-44`:

```ts
let enginePromise: Promise<AnimationCtor> | null = null;
function getAnimationCtor(): Promise<AnimationCtor> {
    if (!enginePromise) {
        enginePromise = loadAnimationEngine().then((engine) => engine.Animation);
    }
    return enginePromise;
}
```

The memo is written **before** resolution and is never cleared on rejection. A rejected promise is a permanent cache entry: every subsequent `getAnimationCtor()` returns the same rejected promise, synchronously, forever.

`DarkModeToggle.vue:62-72` is the caller:

```ts
async function handleToggle() {
    if (morph.phase.value !== "idle") return;
    const from = isDark.value ? moonShape : sunShape;
    const to   = isDark.value ? sunShape : moonShape;
    morphingToDark.value = !isDark.value;
    toggleDark();                       // ← theme flips HERE, unconditionally
    await morph.morphTo(from, to);      // ← no try/catch; @click handler; nothing awaits it
}
```

Trace the failure, entirely statically:

1. `toggleDark()` flips the theme and the `documentElement` class. Irreversible from here.
2. `morphTo` rejects at `useFourierMorph.ts:149` (`await getAnimationCtor()`) — **before** `phase.value = "settle-out"` at `:169`, so `phase` stays `"idle"` and the guard at `DarkModeToggle.vue:63` keeps letting clicks through.
3. `morph.currentPath` is never reassigned. It still holds whatever `onMounted → setShape` (`DarkModeToggle.vue:58-60`) put there — the **sun** on a cold load.
4. `strokeColor` (`DarkModeToggle.vue:46-56`) takes the `phase === "idle"` branch and returns `lerpColor(SUN_COLOR, MOON_COLOR, 1)` = `rgb(192,132,252)`.

**Rendered result: a sun-shaped path, stroked in moon purple, in dark mode — permanently.** Plus one unhandled promise rejection per click, into an `@click` handler that discards the returned promise.

Chunk-load failure is not exotic: `loadAnimationEngine()` resolves a content-hashed chunk (`engine-BKm1GcJT.js`), and a deploy during an open session, a flaky network, or an aggressive cache/SW is enough. The correct posture is the standard one — clear the memo in a `.catch` so the next attempt re-imports — and the correct caller posture is a `try/catch` that falls back to `setShape(target)` so the icon at minimum snaps to the right glyph.

**Falsifier.** If `loadAnimationEngine()` were itself retry-wrapped upstream, the memo would be harmless. Refuted at the source: `useFourierMorph.ts:41` is a bare `.then()` on the import, and the module-level `let` is the only cache.

---

#### **L-6 — `onUnmounted(() => stopAnim())` is not a teardown. Because `Animation.stop()` *resolves* the awaited play promise, unmounting mid-morph advances `morphTo` into its next phase and starts a fresh rAF loop that nothing can ever stop.**

The teardown, `useFourierMorph.ts:115-120, 215`:

```ts
function stopAnim() { if (currentAnim) { currentAnim.stop(); currentAnim = null; } }
onUnmounted(() => stopAnim());
```

The engine's contract, read out of the installed 4.3.0 build (`node_modules/@mkbabb/keyframes.js/dist/engine-BKm1GcJT.js`, `Animation.prototype.stop`):

```js
stop() { this._cancelWAAPI(), this.playback.stop(), this.settle(), this._resolvePlay(); }
_resolvePlay() { let e = this.resolvePromise; this.resolvePromise = null, e?.(); }
```

`stop()` **calls `_resolvePlay()`** — it deliberately resolves the promise returned by `play()` so a stopped animation never hangs its awaiter (the `.d.ts` states the intent at `keyframes.d.ts:163-167`: *"the lifecycle methods (`stop`/`reset`) … so … the awaited play promise never hangs"*). That guarantee is correct for the engine and catastrophic for this consumer, because `morphTo` (`useFourierMorph.ts:145-213`) is a **three-phase sequence of awaited play promises with no cancellation token**:

```ts
await new Promise<void>(r => { currentAnim = createTweenAnimation(...); currentAnim.play().then(() => r()); });  // phase 1  :170-179
phase.value = "morph";                                                                                            //          :182
await new Promise<void>(r => { currentAnim = createTweenAnimation(...); currentAnim.play().then(() => r()); });    // phase 2  :186-193
...                                                                                                               // phase 3  :199-208
```

Unmount during phase 1 ⇒ `stopAnim()` stops animation 1 **and resolves its promise** ⇒ `morphTo` proceeds ⇒ line 187 assigns a **new** `Animation` to `currentAnim` and `.play()`s it, *after unmount*, driving `playback.loop` and writing `currentPoints` / `harmonicLevel` / `morphProgress` on a destroyed scope. Phase 3 then does it again. `stopAnim` has already run; nothing will call it a second time; `currentAnim` now points at an animation with no owner. The teardown does not merely fail — it **accelerates the animation past the point where it could have been stopped**.

**Blast radius, stated honestly.** Latent *from AppHeader*: `App.vue:25` mounts the header outside `<RouterView/>`, so `DarkModeToggle` never unmounts in this application, and `useFourierMorph.ts:215`'s `onUnmounted` never fires here. **Live via the shared composable**: `FourierMorphDemo.vue:108,134` is the `/morph` lazy route (`router/index.ts:101-110`) and *does* unmount on navigation, with a user-configurable duration (`useMorphConfig`) that widens the window arbitrarily. AppHeader's subtree owns the defective contract; another consumer reaches it.

**Falsifier — this is the one that decided the row.** If `stop()` left the play promise pending, `morphTo` would simply stall at the first `await` and no post-unmount animation would ever be constructed; the row would be INFO at most. The engine source above refutes it explicitly, and the `.d.ts` documents the resolve-on-stop as intentional. The defect is the *composable's* — it treats a resolve-on-stop engine as if stop meant abort.

---

### 🟡 MINOR

#### **L-7 — `morphTo` has no `finally`, and its only guard is a one-way door.**
`useFourierMorph.ts:145-213` sets `phase.value` at `:169`, `:182`, `:196` and restores `"idle"` only on the success path at `:210`. Any throw after `:169` strands `phase` at a non-idle value; `DarkModeToggle.vue:63` (`if (morph.phase.value !== "idle") return;`) then **permanently disables the dark-mode toggle** for the session. Correct shape is `try { … } finally { phase.value = "idle"; currentAnim = null; }`.
**Falsifier, partially successful — hence MINOR not MAJOR.** I looked for a reachable throw between `:169` and `:210`. `getEasingFn` cannot throw (`easings.ts:65-67` — `EASING_PRESETS[name]?.fn ?? EASING_PRESETS.linear.fn`, a soft fallback), and `createTweenAnimation`'s frame spec is a fixed literal, so `parse()` is unlikely to throw in practice. The *posture* defect (no `finally` behind a one-way guard) is CONFIRMED statically; a **reachable** throw is `UNPROVEN-NEEDS-LIVE` — SS-13 should fault-inject `Animation#parse` and confirm the toggle bricks.

#### **L-8 — `stopAnim()` and an in-flight `morphTo` race over `phase` and `currentPoints`.**
`setShape` / `setLevel` (`useFourierMorph.ts:89-104`) call `stopAnim()` then set `phase.value = "idle"`. Per L-6 that resolves the in-flight phase promise, so the *same tick*'s continuation at `:182` reassigns `phase.value = "morph"` and clobbers the reset — and both the caller's shape and the resumed chain write `currentPoints`. Latent in AppHeader (`setShape` is called once, from `onMounted`, `DarkModeToggle.vue:58-60`); live in `FourierMorphDemo.vue:177`, which calls `setShape` from a handler.

#### **L-9 — `@mkbabb/glass-ui/hover-card` is an upgrade dead-end; AppHeader is one of the two remaining importers.**
`AppHeader.vue:16-20`. `lane-frontend.md:473`: the subpath is **removed at glass-ui 5.0.0** (`CHANGELOG.md:216`, `BI.W-OVERLAY-UNION`), replacement `<Popover>`. Not broken today — installed is 4.0.0 and `package.json` pins `^4.0.0`, whose caret cannot reach 5.x; the export map confirms `./hover-card` present at 4.0.0. But the census also records glass-ui at **7.0.0** upstream, so this file and `EquationView.vue:9` are two of the concrete blockers on a three-major upgrade. Booking it as a MINOR with a live falsifier (`^4.0.0` holds it) rather than the MAJOR it becomes the day the range moves.

#### **L-10 — the header claims the `--z-overlay` tier (50) when the design system ships `--z-header` (35).**
`AppHeader.vue:54` — `z-[var(--z-overlay)]`. The producer's scale (`@mkbabb/glass-ui/src/styles/tokens/scheme-motion.css:333-345`) is `…bar 30 · header 35 · dock 40 · panel 45 · overlay 50 · hovercard 120 · modal 140`. A dedicated header token exists and is bypassed, and `overlay` is the tier glass-ui's own `ModalOverlay` paints on (`dist/ModalOverlay-*.js` → the `z-overlay` utility). Result: the sticky header ties modal scrims and outranks `--z-panel` (45) and `--z-dock` (40), so no in-page surface can ever be layered above the header without also clearing modal scrims. Teleported reka-ui content escapes via `--z-hovercard`/`--z-popover` (120/130) and is unaffected — which is why this is MINOR and not a visible break today. `VisualizationView.vue:146` makes the same substitution, so it is a two-site convention, not a typo.

#### **L-11 — dead CSS: `.share-pop-*` and `.fade-*` with no `<Transition>` in the template.**
`AppHeader.vue:278-292` (`.share-pop-enter-active` / `-leave-active` / `-enter-from` / `-leave-to`, annotated *"Share button enter/leave (A.W3.d — bezier→`--ease-apple-spring`)"*) and `:294-301` (`.fade-*`). The template (`:53-145`) contains **zero** `<Transition>` / `<TransitionGroup>` elements, and both blocks are `scoped`, so the classes can only ever be applied by a Vue transition inside this component. 24 dead lines, and the matching orphan to **L-4**.

#### **L-12 — the sun/moon stroke colours are hardcoded RGB literals that duplicate `--viz-*` tokens, and the comment asserting the match is false.**
`DarkModeToggle.vue:30-31`:
```ts
const SUN_COLOR  = [232, 136, 69]  as const;   // #E88845
const MOON_COLOR = [192, 132, 252] as const;   // #c084fc — matches VIZ_COLORS.legendre
```
`lib/colors.ts:79` declares `legendre: "#9545b8"`. The claimed match is wrong against the module default, and cannot hold against the resolved value either, because `resolveVizColors()` (`colors.ts:90-96`) overwrites `VIZ_COLORS.legendre` from `--viz-legendre` at runtime while the literal is frozen. `DarkModeToggle` does **not** import `VIZ_COLORS` — the only occurrence of that identifier in the file is this comment. The whole application routes viz colour through `--viz-*` + a reactive store precisely so a theme change propagates; this one component opts out and then documents the opt-out as if it were a link.

#### **L-13 — navigation chrome is coloured from `--viz-amber`, a visualization-palette token that is under an open upstream coordination ask.**
`AppHeader.vue:197` (`.nav-trigger-icon`), `:203` (the dead label, L-3), `:341-342,346` (`.nav-dropdown-item.is-active`). `src/style.css:119-127` overrides `--viz-amber` in `:root` to `hsl(35 76% 35%)` — a **light-mode WCAG darken (≈4.6:1)** that the file itself annotates as *"held as a coordination ask"*, and which `lane-frontend.md:602,643` and `CENSUS:91` book as a live glass-BH carry. Coupling the header's chrome to a chart-legibility token means any upstream rebaseline of the viz palette silently re-skins the navigation. This challenge adds AppHeader to that carry's consumer list, which the census did not have.

#### **L-14 — AppHeader transitively imports the forbidden easing fork.**
`AppHeader.vue:6` → `DarkModeToggle.vue:20` → `useFourierMorph.ts:21-27` imports `EASING_PRESETS`, `EASING_PRESET_NAMES`, `getEasingFn` from `@/lib/easings` and **re-exports them at `:29`**. `lane-frontend.md` §4 / `CENSUS:92-94` classify `lib/easings.ts` as a **HARD SHADOW** — "the producer README's forbidden 'fourth fork'; `./easing` ships at 7.0.0". Two defects in one: the header's boot path pulls the fork, and a morph composable barrel-re-exporting an unrelated easing table is a colocation violation that makes the fork harder to excise (every `useFourierMorph` importer becomes a nominal easings importer).

#### **L-15 — `role="button"` div with Enter-only activation.**
`AppHeader.vue:59-66`: `role="button" tabindex="0"` with `@click.stop` and `@keydown.enter`, no `@keydown.space`. The ARIA button contract requires both Enter and Space; a native `<button>` gets both free. Cross-axis with A11y, booked here as a correctness/contract row because the element exists only to satisfy `HoverCardTrigger as-child` — which accepts a `<button>` equally well.

#### **L-23 — `as any` × 2 on the JSON imports, masking a real structural mismatch that the type would otherwise have caught.**
`DarkModeToggle.vue:26-27`:
```ts
const sunShape  = prepareFourierShape(sunData as any);
const moonShape = prepareFourierShape(moonData as any);
```
The casts are not cosmetic — a mismatch is actually there. `tsconfig.json` sets `resolveJsonModule: true`, so `sunData.decomposition.domain` infers as **`number[]`**, while `FourierPathData.domain` (`svg-fourier.ts:17`) demands the tuple **`[number, number]`** — not assignable, and `decomposition.components: BasisComponent[]` (`:21`) is a second candidate mismatch against the inferred JSON literal type. `as any` erases the entire 8-field contract to silence a one-field variance, so any *future* drift in the Python generator's output — a renamed `partial_sums`, a dropped `levels` — passes the compiler and surfaces only as the silent empty path that **S-5**'s soft posture produces (`interpolateAtHarmonicLevel` → `[]` → `pointsToSvgPath` → `""` → an invisible toggle, no error anywhere). `as unknown as FourierPathData` at minimum, or a tuple-widened field type, preserves the seven fields the cast currently throws away. Compounds **L-1**: the eagerly-shipped payload is also the unvalidated one.

### ⚪ INFO

#### **L-16 — `<component :is>` inside `v-for`: the R5-7 invisibility class's sibling, applied.**
`AppHeader.vue:123-132` renders five `DropdownMenuItem`s, each containing `<component :is="tab.icon" class="nav-item-icon" />` (`:130`); `:117` does the same for the trigger. The five icon components (`FileText`, `Eye`, `LayoutGrid`, `Sigma`, `Shuffle`) are **data, held in the `tabs` array at `:26-32`**, resolved at runtime. Intake row **R5-7** established that loop evidence keyed to *component callsites* is blind to native element loops, and R6 cured it with a `NATIVE_TEMPLATE_LOOP` family (R6-5). The dual hole is here: a callsite keyed by resolved tag name records `component` — an unresolvable identity — not the five distinct lucide subjects, and it compounds multiplicatively with the `v-for` (5 mounted subjects behind 1 opaque callsite; 6 across both sites). **F.W4's per-component denominator must resolve `:is` bindings to their candidate set, or it inherits an R5-7-shaped blind spot on the dynamic-component axis exactly as it did on the native-element axis.**

#### **L-17 — `prepareFourierShape` runs per-instance in setup and allocates ~10 240 tuple arrays synchronously on the boot path.**
`DarkModeToggle.vue:26-27` calls it at `<script setup>` top level (per instance, not per module). Each shape: 10 levels × 512 points (`sun.json` `levels [1,2,3,5,8,12,18,25,35,50]`, `n_eval 512`) → 5 120 two-element arrays, ×2 shapes. Plus the parsed JSON object graph, retained via `FourierShape.data` (`svg-fourier.ts:87`) though only `levels`/`partial_sums` are read — the data is held **twice**, once as `{x[],y[]}` and once as `[x,y][]`. Synchronous, on the critical path, for a decorative icon. Compounds L-1.

#### **L-18 — per-frame path-string rebuild during the morph.**
`useFourierMorph.ts:81` — `currentPath = computed(() => pointsToSvgPath(currentPoints.value))`; `svg-fourier.ts:47-73` string-concatenates a ~512-segment cubic path per invocation, and `currentPoints` is reassigned every rAF tick (`:175`, `:189`, `:204`), each tick also allocating a fresh N×2 array via `interpolateAtHarmonicLevel`/`lerpPoints`. ~21 frames per 350 ms morph. Bounded and infrequent; booked for completeness because it sits in the render path §3 describes.

#### **L-19 — R5-7 does **not** bite AppHeader's own template. Explicit negative result.**
The component's sole `v-for` is at `AppHeader.vue:124`, on `<DropdownMenuItem>` — a **registered component callsite**, precisely the shape R5-7 says the deriver *can* see (contrast `PaperSidebar.vue:65,87,105`'s three native `<li v-for>`, R6-5). `grep` for `<li`/`<ul`/`<tr` in the template: zero hits. AppHeader contributes 0 rows to the `NATIVE_TEMPLATE_LOOP` family. Recorded so the F.W4 roll-up does not carry a phantom.

#### **L-20 — route knowledge is triplicated.**
The tab whitelist exists three times, in three encodings: `AppHeader.vue:26-32` (`tabs[].value`), `router/index.ts:29` (`VALID_TABS`, a `Set`), and `router/index.ts:177-188` (an `||` chain in `afterEach`). L-2 is what triplication costs — the `/v/` omission had to be made once and would have been caught by a single shared source.

#### **L-21 — `router.push` results are discarded at three call sites.**
`AppHeader.vue:46` (`onTabSelect`), `:64` and `:65` (logo click/keydown). vue-router 4 resolves with a `NavigationFailure` rather than rejecting, so re-selecting the current tab or clicking the logo while on `/paper` is silently a no-op — acceptable, but the failure channel is unread, so a genuine guard rejection would also vanish.

#### **L-22 — a cross-file line pin into this component has rotted.**
`src/style.css:129-131`: *"Mirrors the canonical pattern at **AppHeader.vue:174-177** (the only pre-W4 conformant site)"* — referring to the `:focus-visible` ring. `AppHeader.vue:174-177` is now `border-radius / border / background / color` inside `.nav-trigger`; the ring lives at **`:188-191`**. The pin drifted by 14 lines. Line-number pins across files are unmaintainable by construction; cite the selector (`.nav-trigger:focus-visible`).

---

## §2 — R5-7 disposition (required by the axis brief)

| question | answer | evidence |
|---|---|---|
| Does AppHeader contain native element `v-for`? | **No.** | Template `:53-145`; zero `<li>/<ul>/<tr>`; the one loop is `<DropdownMenuItem v-for>` at `:124`. |
| Is AppHeader's loop visible to component-callsite-keyed derivation? | **Yes** — it is exactly the visible shape (cf. the populated sibling leaf `instance.loop.presets`, keyed `callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:…`, intake R5-7). | — |
| Does a *sibling* invisibility class apply? | **Yes** → **L-16**: `<component :is>` × `v-for`, 6 runtime-resolved subjects behind 2 opaque callsites. | `AppHeader.vue:117, 123-132` |
| Carry | **F.W4** — extend R6's `NATIVE_TEMPLATE_LOOP` cure with a dynamic-component resolution family, or the same defect recurs on a second axis. | intake `lane-fourier-r3-r6.md` R5-7 / R6-5 / R6-6 |

---

## §3 — The viz render path, where this component touches it

The census bounds the surface: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces"* — `CENSUS-2026-08-03.md:85-88`.

**AppHeader owns none of the three canvases.** Its two touches are:

1. **An SVG surface it drives directly.** `AppHeader.vue:141` → `DarkModeToggle` → `FourierMorphSvg.vue` (a single `<path :d>`), fed by an rAF-driven point stream through `useFourierMorph`. This is the surface **L-6/L-7/L-8/L-18** govern, and the payload behind it is **L-1**. Notably it is the *only* rAF-driven surface in the application that is mounted on **every** route.

2. **It is the sole in-app trigger of the global viz palette re-resolution.** `DarkModeToggle.vue:69` `toggleDark()` → glass-ui `useGlobalDark` flips the `documentElement` class → `App.vue:13-17`'s `MutationObserver` fires → `resolveVizColors()` (`colors.ts:90-96`) re-reads the five `--viz-*` custom properties via `getComputedStyle` and mutates the `reactive()` `VIZ_COLORS` object (`colors.ts:78-88`) that all three canvases and 14 modules consume. **A button in this header is the input edge of the entire visualization colour system.**

   That edge is architecturally sound — `VIZ_COLORS` is `reactive`, so Vue-driven redraws track it — and I decline to assert a stale-canvas defect without live evidence (`UNPROVEN-NEEDS-LIVE`, SS-13: toggle the theme on `/equation` with the ConvergencePlot idle and confirm the plot re-strokes). But two properties of the trigger are provable statically and belong to this component's file set:
   - the trigger fires the palette re-resolution **and** launches a 350 ms colour lerp (`DarkModeToggle.vue:46-56`) whose endpoints are hardcoded literals that bypass the very tokens being re-resolved — **L-12**;
   - `App.vue:13` never disconnects its observer. Harmless (root component, never unmounts) and out of this component's scope, but it is the other half of this edge and should be recorded where the edge is audited.

---

## §4 — Superlatives (L-18 runs both ways)

Held to the same standard: claim, provenance, falsifier.

**S-1 — the `@global` style block is correct *and* explains itself.**
`AppHeader.vue:304-315`: a second, deliberately unscoped `<style>` introduced by `<!-- Global style for portaled components -->` and two `/* @global — portaled glass-ui … */` annotations. This is the right call and an easy one to get wrong: reka-ui teleports `HoverCardContent` / `DropdownMenuContent` out of the component subtree, so `scoped` attribute selectors cannot reach them. The author split exactly the four rules that need to escape (`.hover-card-content`, `.nav-dropdown`, `.nav-dropdown-item`, `.nav-item-icon`) and left the other 22 scoped. *Falsifier:* if the split were arbitrary, some non-portaled selector would sit in the global block — `grep` confirms all four global classes appear only on teleported content (`:72`, `:122`, `:126`, `:130`), and every scoped class only on in-tree elements. The residual risk is generic naming (`.nav-item-icon` is unprefixed in a shared stylesheet); today there is no collision — those classes appear nowhere else in `src/`.

**S-2 — the avatar is CLS-proof, third-party-free, and the reasoning is committed next to the code.**
`AppHeader.vue:74-85`: explicit `width="80" height="80"` in a `h-10 w-10` box (intrinsic ratio reserved → zero layout shift, and 2× density deliberately chosen), `decoding="async"`, self-hosted via `import.meta.env.BASE_URL` — with a four-line comment recording *why*: *"restores the zero-third-party-origins posture — no avatars.githubusercontent.com handshake/beacon."* A privacy decision, its mechanism, and its density rationale, all durable. *Falsifier:* I checked the asset actually ships — `web/public/assets` is a symlink to the repo-root `assets/`, `git ls-files` tracks `assets/maintainer-avatar.png`, and the built `dist/assets/maintainer-avatar.png` exists. (This killed one of my own candidate defects; see §5.)

**S-3 — both external links are correctly hardened.** `AppHeader.vue:88-90` and `:99-101`: `target="_blank"` with `rel="noopener noreferrer"` on both, and `@click.stop` so the anchors do not trip the enclosing `role="button"` logo handler. No exceptions in the file.

**S-4 — `loadAnimationEngine()` is a genuinely well-built lazy boundary.**
`useFourierMorph.ts:33-44`: the value.js-bearing engine is deferred behind a dynamic import, memoised at module scope so the promise is constructed at most once, with a comment stating the intent and the caching assumption. This is real, correct bundle discipline — the engine chunk (`dist/assets/engine-*.js`) is provably out of the entry. *Falsifier:* the memo has a hole on the rejection path (**L-5**) — the boundary is right, the error posture is not. **And the irony is the shape of the whole audit: this composable carefully defers a modest engine chunk while its own consumer, one file away, ships 450 KB of JSON eagerly (L-1).** The discipline exists in this codebase; it was simply not applied to the largest asset.

**S-5 — `interpolateAtHarmonicLevel` degrades instead of throwing.**
`svg-fourier.ts:144-148`: `if (!loPoints || !hiPoints) return loPoints ?? hiPoints ?? [];`, and `pointsToSvgPath` returns `""` for `< 2` points (`:51`). A missing level yields an invisible glyph, never an exception inside an rAF callback — where a throw would kill the loop and take the surrounding frame with it. A deliberate soft posture in the right place. *Falsifier:* this is the same softness that lets **L-23**'s `as any` fail silently — correct here, but it raises the cost of that type hole rather than lowering it.

**S-6 — the nav trigger carries a computed accessible name.**
`AppHeader.vue:115`: `:aria-label="\`Navigate — current section ${activeTabData.label}\`"` — a dynamic accessible name on an icon-only control, which most codebases ship as a bare static string or omit. It is the single reason **L-3** (label invisible at every viewport) is not also a hard a11y break. Its value is exactly bounded by **L-2**: the name is correct on 6 of the application's route shapes and wrong on `/v/:visualizationSlug`.

---

## §5 — Candidates killed by their own falsifiers

Recorded so a later pass does not re-derive them, and as evidence the falsifier gate is real.

| candidate | why it looked live | what killed it |
|---|---|---|
| **Missing avatar asset → 404 on the hover card** | `find web -name "maintainer-avatar*"` returned **only** `web/dist/assets/…`, and `dist/` is gitignored (`.gitignore:42`) — apparently a build-only artifact with no committed source, contradicting the code comment's *"the repo's committed-raster convention"*. | `web/public/assets` is a **symlink** to `../../assets` (`ls -la web/public/`), which `find` does not follow. `git ls-files` tracks `assets/maintainer-avatar.png`. The comment is accurate; the finding was an artifact of my tool. → **S-2**. |
| **`--z-overlay` undefined → invalid `z-index` on the sticky header** | `grep -rn -- "--z-overlay" web/src/` returned four *usages* and **zero definitions**. | The token is producer-owned: `@mkbabb/glass-ui/src/styles/tokens/scheme-motion.css:341` → `--z-overlay: 50`, bridged at `theme/bridges.css:241`. Resolves correctly. The residue is the *tier* choice, downgraded to **L-10**. |
| **`tabs[]` holds component references in reactive state → `markRaw` warning / deep-reactivity cost** | `AppHeader.vue:26-32` stores five lucide components as data, a classic Vue footgun. | `tabs` is a plain `const` array, never passed to `ref()`/`reactive()`; `activeTabData` (`:43`) is a `computed`, which does not reactive-wrap its return. No reactivity ever touches the component objects. **Correct as written** — no finding. |

---

## §6 — Verdict

The component is **defective**, and the defects are not stylistic. In descending order of what they cost:

1. **L-1 (BLOCKER)** — a decorative 40 px toggle sets the application's boot payload floor on every route; the entry chunk is 91.7 % Fourier coefficient data, ~17.6 % of which no code path reads. Same shape as value.js's own Q14 escalation.
2. **L-2, L-3 (MAJOR)** — the header's two channels for "where am I" are, respectively, wrong on the primary share route and invisible everywhere. Both are missed-rename / lost-rule archaeology with the fingerprints still in the file (the dead `/s/` branch at `:36`; the no-op 640px block at `:218-222`).
3. **L-5, L-6 (MAJOR)** — the morph composable's error and teardown postures are both inverted: a rejection is memoised forever, and `stop()` is treated as abort when the engine documents it as resolve. L-6 is latent from AppHeader and live from `/morph`.
4. **L-4 (MAJOR)** — a dead binding that eagerly instantiates a 471-line store application-wide, invisible to `tsc` because `noUnusedLocals` is off and `<script setup>` bindings are template-visible.

Two structural notes for the formation, beyond the rows:

- **L-16 generalises R5-7 onto a second axis.** Component-callsite keying was blind to native element loops (R5-7, cured by R6-5); it is *equally* blind to `<component :is>`. F.W4's denominators need both cures or they will under-count this file by 6 subjects while reporting a clean derivation.
- **L-20 / L-2 are the same defect at two altitudes.** Route knowledge lives in three encodings across two files. Any repair that fixes `activeTab` without collapsing the triplication buys one wave of correctness.

The header is also, on the axes it gets right, unusually careful — a documented teleport-CSS split, a CLS-proof self-hosted avatar with its privacy rationale committed, hardened external links, a computed accessible name, and a correctly-built lazy engine boundary one file away. The failures are concentrated in exactly two places: **what it eagerly loads**, and **what it was supposed to have been updated to know**.
