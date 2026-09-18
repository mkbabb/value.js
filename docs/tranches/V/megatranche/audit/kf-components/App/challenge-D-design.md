claude-opus-5[1m]

# CHALLENGE · `App` · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue` (387 L)
**Mode:** static, read-only, source-derived. No browser tooling; no installs; no dev server. Nothing was written outside this file.
**Date:** 2026-08-04. Tree state: `App.vue` mtime Jul 28 13:57 (post-census; census lane HEAD was `8281638c`).

**Import closure read whole** (17 first-level + 8 second-level, all read-only):
`styles/brand.css` · `components/instrument/transport/injectionKeys.ts` · `components/instrument/shell/{index.ts,EditorShell.vue,EditorStartScreen.vue,HeroAurora.vue,AnimatedText.vue,TypingDots.vue}` · `app/App.skeleton.vue` · `app/dock/{index.ts,ChromeDock.vue,MbabbMenu.vue}` · `app/scene/{scenes.ts,sceneExposedApi.ts,useSceneMachineRouterBinding.ts,useSceneMachineShellBinding.ts}` · `app/transition/{useSceneSwap.ts,useSceneTransition.ts}` · `app/lifecycle/useMonacoCancellationGuard.ts` · `scenes/cube/CubeScene.vue` · `composables/scene-facility/index.ts` · `components/instrument/transport/AnimationControlsGroup.vue` · `styles/{style.css,layout.css}` · `app/main.ts` · `app/index.html` · installed `@mkbabb/glass-ui@7.0.0` `dist/styles/**` (token + PRM verification only).

**Tally: 18 defects — 2 BLOCKER · 5 MAJOR · 10 MINOR · 1 INFO. 5 superlatives.**

**Hitherto corpus folded:** lane-frontend.md F-1 (phantom `@mkbabb/glass-ui` dep) is the standing precondition for every glass claim below and is NOT re-reported; S-6 (`App.skeleton` → glass `Skeleton`) is *partly contradicted* at **S-B**; §6.3's "0 `--kf-*` tokens / flat global namespace" hazard is **tested and comes back clean for `--dock-*`** (D-15 note) — the collision the census feared does not exist in App's closure; §6.5's PRM census is *extended* with the delegation-verification the census left "unverified statically" (**S-A**).

---

## Method note on the two live-dependent axes

Two axis items are only partly decidable from source, and I mark them explicitly rather than launder them:

- **Contrast (D-1).** The *ratios* are fully decidable: both operands are declared tokens (`demo/styles/style.css:148–153` face crayons; glass-ui `dist/styles/tokens/color-radius.css` + `theme/bridges.css` neutrals). What is not decidable statically is whether a given glyph sits over a given facet **in a given frame**. I therefore compute the ratios, then prove the *overlap is designed-in* from two independent comments rather than asserting it. The per-frame incidence is flagged `NEEDS-LIVE` for SS-13.
- **Geometry (D-4).** Arithmetic over `dvh` fractions with the two unknown terms (`--dock-margin`, `--menubar-measured-h-peak`) carried as a bounded interval, so the conclusion survives the whole plausible range.

Everything else is decidable from the tree alone.

---

## BLOCKERS

### D-1 · BLOCKER · The hero ink prints over the cube's saturated facets at contrast ratios down to **1.28 : 1** — and the mitigations were deliberately deleted

**Provenance**
- `demo/app/App.vue:45–51` — App mounts `HeroAurora` + `EditorStartScreen` on home.
- `demo/app/App.vue:283–296` — home renders `CubeScene` (`hideLoader: true`) **behind** that hero.
- `demo/components/instrument/shell/EditorStartScreen.vue:12–14` — "overlap with the die's lower quadrant is **WELCOME** (the ruling says so)".
- `demo/components/instrument/shell/EditorStartScreen.vue:116` — "hero printing OVER the die's lower quadrant — overlap WELCOME per OD-4".
- `demo/components/instrument/shell/EditorStartScreen.vue:96–110` — "the depth-text lilac recolor **+ 4-step shadow stamp are GONE**"; `:135–154` — deck/hint carry `color` + `opacity` only. **No text-shadow, no scrim, no backdrop-filter, no plate.**
- `demo/styles/style.css:148–153` — the six facets, `rgba(…, 0.8)`.
- `demo/scenes/cube/useCubeDemo.ts:74–100` — a `Rotations` channel: every facet rotates through the hero band.

**Computed ratios** (sRGB relative luminance, WCAG 2.x; facets composited at α 0.8 over light `--background` = `--neutral-0` = `hsl(40 30% 98%)`; hint ink = `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)`; deck ink = `--foreground` = `hsl(24 10% 10%)` at `opacity: .85`):

| facet | token | L | **hint** (`--muted-foreground`) | **deck** (`--foreground` @ .85) |
|---|---|---|---|---|
| `--face-3` back | `rgba(0,0,255,.8)` | 0.101 | **1.28 : 1** ❌ | **2.34 : 1** ❌ |
| `--face-1` front | `rgba(255,0,0,.8)` | 0.236 | **1.48 : 1** ❌ | 4.11 : 1 ✅ |
| `--face-5` top | `rgba(255,0,255,.8)` | 0.305 | **1.83 : 1** ❌ | 4.94 : 1 ✅ |
| `--face-2` right | `rgba(0,255,0,.8)` | 0.718 | 3.96 : 1 ✅ | ✅ |
| `--face-6` bottom | `rgba(0,255,255,.8)` | 0.788 | 4.32 : 1 ✅ | ✅ |
| `--face-4` left | `rgba(255,255,0,.8)` | 0.923 | 5.01 : 1 ✅ | ✅ |

Both strings are **large text** (`--type-title: 2.058rem` ≈ 32.9 px; glass-ui `dist/styles/typography/*`), so the SC 1.4.3 AA threshold is **3 : 1**. **Three of six facets fail for the hint; one of six fails for the deck.** The blue back-face at 1.28 : 1 is not marginal — it is below the 1.5 : 1 floor at which text stops being text.

For reference, over the *intended* substrate the same ink is fine — hint 5.21 : 1, deck 10.73 : 1 over `--background`. The failure is created **entirely** by the sanctioned overlap.

**Why this is a blocker, not a taste note:** the hero is the LCP node and the only copy on the landing screen; the overlap is a ruled design decision (two comments, above), not an accident; and the two standard mitigations for text-over-imagery (a shadow stamp and a scrim) were *explicitly removed* at T.D10 with nothing put in their place.

**Falsifier.** Any of: (a) a live 390×844 or desktop capture showing the hero glyphs never intersecting a facet's painted pixels; (b) a `text-shadow` / scrim / `backdrop-filter` / paint-order rule on `.hero-display`/`.hero-deck`/`.hero-hint` that I missed (I grepped the whole scoped block — `EditorStartScreen.vue:81–191` — and found none); (c) a facet re-token that lifts `--face-1/3/5` luminance above the 3 : 1 crossover; (d) a demonstration that the die is clipped out of the hero band on every breakpoint — which D-4 shows is false on mobile.
**NEEDS-LIVE (SS-13):** the per-frame incidence — what fraction of the rotation cycle a failing facet actually sits under a glyph. The ratios themselves need no live probe.

---

### D-2 · BLOCKER · There is **no error state**. A failed scene chunk leaves the skeleton shimmering forever under a permanent `aria-busy="true"`

**Provenance**
- `demo/app/App.vue:90–99` — the only async boundary: a bare `<Suspense>` with a `#fallback` and **no error path**.
- `demo/app/scene/scenes.ts:104–107` — `defineAsyncComponent(loader)`; **no `errorComponent`, no `onError`, no `timeout`, no retry**.
- Whole-tree grep: `onErrorCaptured` / `errorComponent` / `errorHandler` / `ErrorBoundary` → **0 hits** across `demo/**/*.{vue,ts}`.
- `demo/app/main.ts:32–54` — `createApp` with no `app.config.errorHandler`.
- `demo/app/App.skeleton.vue:28–33` — the fallback declares `role="status"` + `aria-busy="true"` + `aria-label="Loading scene"`.

**Failure scenario (concrete).** The demo ships to gh-pages with content-hashed chunks. A user with a tab open across a deploy taps a scene in the dock → `import("../../scenes/amiga/AmigaScene.vue")` 404s → the async setup rejects → `<Suspense>` never resolves and, with no `errorCaptured` anywhere in the chain and no app-level handler, the rejection is logged to console and **the pending branch is never replaced**. The user is left staring at a shimmer plate indefinitely; AT is left holding `aria-busy="true"` forever. There is no message, no retry, no way back except a manual reload — and the dock's other scenes will do the same thing. The same path fires on any offline/flaky-network nav.

Note the asymmetry: `warmScene` is *carefully* defensive about a rejected prefetch (`scenes.ts:118–123`, "a rejected warm is swallowed; **the real mount surfaces the error via `<Suspense>`**") — but the real mount surfaces nothing, because nothing is listening. The delegation named in that comment has no receiver.

**Falsifier.** An `errorComponent`/`onError` on `lazyScene`, an `onErrorCaptured` anywhere in the App→EditorShell→AnimationControlsGroup chain, an `app.config.errorHandler` in `main.ts`, a router-level error view (`app/scene/router.ts`), or a service-worker/`vite:preloadError` handler that reloads on chunk 404. I checked all five; none exists.

---

## MAJOR

### D-3 · MAJOR · `currentChannels` is missing the `isHome` guard its own sibling carries — so the **transport dock mounts on the home landing**, against the ruling that deleted it

**Provenance**
- `demo/app/App.vue:227` — `const currentChannels = computed(() => sceneRef.value?.facility?.channels);` — **unguarded**.
- `demo/app/App.vue:244–255` — the *sibling* derivation is guarded, and the comment states exactly why: "Home renders the SAME CubeScene component (the backdrop) — so **`sceneRef` on home exposes cube's PAINTING facility** … so it derives `[]` explicitly, never cube's triad."
- `demo/app/scene/useSceneMachineShellBinding.ts:68–79` — the third site guards the same hazard again: "Home uses the CubeScene component, which DOES expose a facility/group, so this **must NOT adopt it**."
- `demo/app/App.vue:283–296` — home mounts `CubeScene` synchronously (not the `lazyScene` wrapper), so `sceneRef` binds on mount.
- `demo/scenes/cube/useCubeDemo.ts:50,114–116` — the group is built **synchronously in setup** from the pre-warmed engine (`main.ts:45–54` awaits `warmKfEngine()` before `app.mount`), with three animations.
- `demo/composables/scene-facility/index.ts:92–119` — `get channels()` maps `Object.entries(getGroup().animations)` → **3 channels, available the instant `sceneRef` binds**.
- `demo/components/instrument/shell/EditorShell.vue:78` → `demo/components/instrument/transport/AnimationControlsGroup.vue:181–183` — `transportNames = channels?.map(c => c.name) ?? Object.keys(animationGroup.animations)`. The `??` short-circuits: a non-null `channels` array means the empty-group fallback is **never reached**.
- `demo/components/instrument/transport/AnimationControlsGroup.vue:97–98` — `<TransportDock v-if="transportNames.length > 0">`.

**Failure scenario.** Boot at `/` (home). `CubeScene` mounts as the backdrop; `sceneRef.facility.channels` resolves to cube's 3 channels; `transportNames.length === 3`; **the bottom transport dock renders on the landing screen** — the exact "orphaned home transport cluster" that `AnimationControlsGroup.vue:90–96` says was "deleted at the root (VERDICT #6)" and that home is "COMPASS ONLY". Worse, the home superKey's store was never seeded — `useSceneMachineShellBinding.ts:74–79` early-returns *before* the `selectedAnimation` defaulting at `:101–113`, and `demo/state/controlOptionsStore.ts:37` defaults `selectedAnimation: ""` — so the transport's animation-name pill is driven by a selection that matches none of the three names it was handed.

Three files independently guard this hazard; the fourth edge — the one App itself owns — does not. That is the shape of a real regression, not a design choice.

**Falsifier.** Show `transportNames` is empty on home: e.g. `facility.channels` returning `[]` before targets attach (it does not — the getter reads `animations`, which `useCubeDemo` populates in setup), or a guard on the `channels` edge somewhere in `EditorShell`/`AnimationControlsGroup` that I missed, or `sceneRef` failing to bind for the home mount. A live home screenshot showing no bottom dock kills this outright.
**NEEDS-LIVE (SS-13):** what the name pill actually *renders* with `selectedAnimation === ""` (empty pill vs. placeholder vs. first-item fallback). The **mount** is source-confirmed; only the pill's text is live.

---

### D-4 · MAJOR · Two live seat rules encode **contradictory** hero-vs-die geometry; the "intersection is 0 by construction" invariant is arithmetically false

**Provenance**
- `demo/app/App.vue:291–296` — `activeSceneProps` passes `hideLoader: isHome.value`.
- `demo/scenes/cube/CubeScene.vue:11` — `hideLoader` ⇒ class `cube-stage--hero-recede`.
- `demo/scenes/cube/CubeScene.vue:259–267` — the rule's stated model: "**The hero parks in the top band (EditorStartScreen `pt-[var(--dock-top-band-reserve)]`)**; the cube's centering region starts BELOW the `--start-hero-band` split … **the 390×844 hero/subject intersection is 0 by construction**."
- `demo/styles/layout.css:26` — `--start-hero-band: 34dvh; /* the hero owns above; the subject's centering starts below */`.
- **The cited hero seat no longer exists.** `EditorStartScreen.vue:2–16` records its deletion verbatim: "the hero **leaves the top band**. The former seat (`lg:mt-[var(--work-area-top-offset)]` …) parked the H1 … the re-seat is the φ BAND". The live seat is `EditorStartScreen.vue:88–94` + `:117–123`: `top: calc(--work-area-top-offset + --work-area-height × 0.52)` below `lg`. There is no `pt-[var(--dock-top-band-reserve)]` anywhere in the file.

**Arithmetic** (390×844, `@media (max-width:1023px)`; `layout.css:180–188`; `--work-area-vertical-bias-top: 0.382` at `:66`):
`--work-area-height = 100dvh − B` where `B = --dock-band-reserve`; slack `= B`; `--work-area-top-offset = 0.382·B`.
Hero band top `= 0.382·B + 0.52·(100dvh − B) = 52dvh − 0.138·B`. For any `B` in 60–110 px (7.1–13.0 dvh on 844 px — `--dock-icon-height: 2.75rem` at `layout.css:48` plus margin/safe-area), hero top ∈ **[50.2, 51.0] dvh**.
Die: centering region `[34dvh, ~92dvh]` (`padding-block-start: --start-hero-band`; `padding-block-end = --dock-menubar-reserve − --dock-band-reserve`), centre ≈ **63 dvh**; `--side-size: min(40vh, 40vw, 16rem) = 156 px = 18.5 dvh` (`CubeScene.vue:283–285`), face-on half-extent 9.2 dvh ⇒ die spans ≈ **[53.3, 73.2] dvh** (wider under rotation).
Hero block ≈ 3 lines at `--type-display-4` + two `--type-title` rungs ≈ 16 dvh ⇒ spans ≈ **[50.5, 67] dvh**.

**Intersection ≈ 13.7 dvh — not zero.** Both live claims are false simultaneously: `CubeScene.vue:263`'s "intersection is 0 by construction", *and* `EditorStartScreen.vue:116`'s compensating "the die keeps the upper ~45% (two focal planes)" — the die's *top edge* is at ≈53 dvh, entirely in the lower half, because the recede rule pushed it there under the abandoned model. The recede padding, authored to *separate* hero from die, now *maximises* their collision. This is the direct amplifier of D-1.

**Falsifier.** A 390×844 capture showing the die occupying the upper ~45% with the hero clear of it; or a re-derivation of `--start-hero-band` post-T.D9 that I missed (grep: it is defined once, `layout.css:26`, and read only by `CubeScene.vue:267`); or a `dvh`-resolution argument that pushes `B` outside 60–110 px far enough to move hero top above 34 dvh (it would need `B ≈ 130 dvh`, impossible).

---

### D-5 · MAJOR · The scene-swap focus target is **anonymous** — the announcement the code claims to make cannot happen

**Provenance**
- `demo/app/App.vue:84–89` — `<div ref="sceneHostEl" class="scene-host h-full w-full" tabindex="-1" :style="sceneSwapStyle">`. **No `role`, no `aria-label`, no `aria-labelledby`.**
- `demo/app/transition/useSceneTransition.ts:46–50` — "a11y MANDATORY: … On `finished` we route focus to the new scene's host container (`tabindex="-1"`), **announcing the context change to keyboard/AT users**".
- `demo/app/transition/useSceneTransition.ts:89–91` — the route fires on every nav.
- Whole-demo grep for `aria-live`: **exactly one hit**, `components/CopyButton.vue:15`. There is no scene-change live region.
- `demo/app/App.vue:384–386` — `.scene-host:focus { outline: none }`.

**Failure scenario.** A screen-reader user picks "Spring" from the dock. Focus lands on an unnamed, role-less `<div>`. NVDA/JAWS/VoiceOver have nothing to announce for the container itself — there is no accessible name and no role to voice — so the user gets, at best, silence or a raw dump of whatever text happens to be first in the new scene, with no signal that navigation succeeded, no scene name, and no visual focus indicator either (`outline: none`). The one thing the design says this exists to do is the one thing it cannot do.

The fix is one attribute (`role="region"` + `:aria-label="currentLabel + ' scene'"` — `currentLabel` is already computed at `App.vue:192`), which is why the omission is worth flagging rather than excusing.

**Falsifier.** Any of: an `aria-label`/`aria-labelledby`/`role` on `sceneHostEl` I missed (the element is fully quoted above); a scene-change `aria-live` announcer elsewhere in the closure (grep says no); a scene component that renders an `<h1>`/`<h2>` as its first child (grep: `EditorStartScreen.vue:27` is the demo's *only* `<h1>`, and it is home-only — see D-7); or an AT recording showing a useful announcement.

---

### D-6 · MAJOR · The home screen's document outline is one sentence chopped into a heading and two sub-headings

**Provenance**
- `demo/app/App.vue:49–51` — App supplies `hint="or drag M. cubert 🙂‍↔️"`; it is the **only** call site that passes `hint`, so App is what materialises the third heading (`EditorStartScreen.vue:45` is `v-if="hint"`).
- `demo/components/instrument/shell/EditorStartScreen.vue:27` — `<h1>` "Select an animation"
- `:40–44` — `<h2>` "from the list ☰ below, then press Play."
- `:45–47` — `<h2>` "or drag M. cubert 🙂‍↔️"

**Failure scenario.** A screen-reader user opens the heading list (the primary orientation gesture) and gets three entries that are not sections, have no content beneath them, and only make sense read consecutively: *"Select an animation" / "from the list below, then press Play." / "or drag M. cubert slightly-smiling-face left-right-arrow"*. Heading navigation on this page is worse than useless — it fragments a single instruction into three false landmarks (WCAG 1.3.1: elements marked as headings must be headings).

The tell is in the source itself: `EditorStartScreen.vue:31–39` calls the deck a "**deck**" and the third line a "**hint**" — prose roles, both authored as `<h2>` purely to inherit the type rung. `:31–39` even concedes the typography is "a named deviation": deck and hint sit on the *same* `--type-title` rung, separated only by ink strength — so the markup buys nothing the CSS wasn't already doing.

**Falsifier.** A `role="presentation"`/`role="doc-subtitle"` on either `<h2>` (there is none), or an argument that the deck genuinely heads a section (nothing follows it), or a demonstration that AT collapses the three into one announcement (it does not — each is a separate heading node).

---

### D-8 · MAJOR · The app's only navigation has **no landmark**; landmark navigation reaches `<main>` and nothing else

**Provenance**
- `demo/app/App.vue:4–26` — `ChromeDock` is mounted as a **sibling** of `EditorShell`, i.e. outside every landmark box.
- `demo/app/dock/ChromeDock.vue:213–218` — the dock's root is a bare `<div data-dock-tether="top" class="fixed …">`. No `<nav>`, no `role="navigation"`, no `aria-label`.
- `demo/app/dock/ChromeDock.vue:235–271` — the scene `<Select>` inside it is the **only** way to change scenes in the UI (`@switch-scene` → `App.vue:14` → `runSceneSwitch`).
- `demo/components/instrument/shell/EditorShell.vue:74` — the single `<main>`, carefully justified at `:67–73` ("a REAL layout box — not `display:contents`, which strips the box AND the implicit `main` role").

**Failure scenario.** A screen-reader user presses the landmark-jump key (`D` in NVDA, rotor in VoiceOver). They land in `main`, which contains the stage and the controls. The scene switcher — the app's entire navigation model — is in a fixed-position div with no landmark, so it is never offered. To reach it they must tab through, or discover it by accident. The care spent on `<main>` at `:67–73` makes the absence of the matching `<nav>` conspicuous rather than excusable.

**Falsifier.** A `<nav>` or `role="navigation"` emitted by glass-ui's `GlassDock` around the default slot (checked `dist/components/dock/` — the roster exposes `GlassDock`/`DockControl`/`DockTrigger`/`DockSeparator` with no navigation role; a dist inspection showing otherwise kills this), or an `aria-label`ed region wrapper I missed in `App.vue:4–26` (quoted whole above).

---

## MINOR

### D-7 · MINOR · Six of seven scenes ship **zero `<h1>`**

`EditorStartScreen.vue:27` is the demo's only `<h1>` (whole-tree grep: 1 hit across 58 `.vue`), and it renders only under `App.vue:32` `:show-start-screen="isHome"`. Navigate to cube/amiga/square/easing/spring/sequence and the document has no top-level heading at all — nothing names the page for AT, for the heading outline, or for a "skip to content" mental model. Compounding D-5: focus lands on an unnamed div in a document with no headings.
**Falsifier.** An `<h1>` inside any scene subtree (grep found none), or a documented decision that the demo is a single-heading app.

### D-9 · MINOR · A permanent `transform: scale(1)` rides the scene host on every VT-capable browser, buying zero motion

`App.vue:88` binds `:style="sceneSwapStyle"` unconditionally. `useSceneSwap.ts:38–42` always returns `{opacity, transform: scale(…)}`, but `:44–51` only ever *drives* `sceneOpacity` when `!vtOwnsMotion`. On any browser with `startViewTransition` the spring never runs, so the binding resolves to a static `opacity: 1; transform: scale(1)` — a non-`none` transform, which per CSS Transforms §3 makes `.scene-host` a stacking context **and** a containing block for `position: fixed` descendants, and hints compositing. That is imposed on the one element whose 18-line style comment (`App.vue:361–378`) argues at length for *de-layering* it. Today no scene uses `position: fixed` inside the host (grep over `scenes/`: 0), so the containing-block consequence is latent, not live — hence MINOR, not MAJOR.
**Falsifier.** A `vtOwnsMotion` early-return in `sceneSwapStyle` (there is none), or a demonstration that `scale(1)` is optimised to `none` by the engine (it is not — computed `transform` is `matrix(1,0,0,1,0,0)`, non-`none`).

### D-10 · MINOR · Two hover-reveal cadences in one chrome, 7× apart

`App.vue:3` mounts the root `<TooltipProvider>` **with no props** → reka's defaults (700 ms delay / 300 ms skip; `node_modules/reka-ui/dist/Tooltip/TooltipProvider.*` carries the 700 literal). Two descendants override: `AnimationControlsGroup.vue:2` and `ChannelControls.vue:2`, both `:delay-duration="100" :skip-delay-duration="0"`. Result: the header-ribbon's "Keyboard shortcuts (?)" tooltip (`EditorShell.vue:30–43`) reveals after 700 ms while the transport's Play tooltip reveals after 100 ms — same visual chrome, two different latencies, on a page where both docks are on screen simultaneously.
**Falsifier.** A reka default that is in fact 100/0, or a third provider between App and `EditorShell`'s tooltip (there is none — `EditorShell` is a direct child of the App provider).

### D-11 · MINOR · The app's only interaction hint is an in-joke plus a ZWJ emoji that fragments off-platform

`App.vue:50` — `hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;"`. Two problems.
(a) "M. cubert" is a Q\*bert pun naming an object the first-time user has never heard called that; nothing on screen labels the die "M. cubert", so the sole discoverability hint for the drag gesture (`OrbitalDrag.vue`, 352 L of pointer/pinch/inertia) points at a name that exists only in the author's head.
(b) `U+1F642 U+200D U+2194 U+FE0F` is *head shaking horizontally* — Emoji 15.1 (Sept 2023). Where the ZWJ sequence is unsupported the platform decomposes it to **two glyphs** (🙂 ↔️), and the arrow may render monochrome-text rather than emoji; the emoji is also carrying the entire semantic payload ("side to side"), so the degradation isn't cosmetic — the instruction loses its verb. Inside an `<h2>` (D-6), AT reads the components: "slightly smiling face, left right arrow".
**Falsifier.** A platform-support matrix showing the ZWJ sequence is universal in the demo's target browsers, or an `aria-label`/visually-hidden gloss on the emoji (there is none — `EditorStartScreen.vue:45–47` interpolates raw `{{ hint }}`).

### D-12 · MINOR · "from the list ☰ below" points at nothing, in the wrong direction

`EditorStartScreen.vue:74–75` (defaults accepted verbatim by `App.vue:50`, the only production call site) renders "Select an animation / from the list **below**, then press Play."
- The **only** scene list is the `<Select>` in `ChromeDock` (`ChromeDock.vue:235–271`), anchored to the viewport **top**: `style="top: var(--dock-top-anchor)"` (`:216`) where `--dock-top-anchor` is measured from the top edge (`layout.css:107–118`) on **every** breakpoint. The hero band sits at 45–52 % of the work area (D-4). The list is *above*.
- That dock is `:start-collapsed="true"` (`ChromeDock.vue:224`) and its collapsed slot renders **the scene glyph alone** (`:363–366`) — a circle. Nothing that reads as "a list" is on screen when the sentence is read.
- The inline `<List>` glyph (`EditorStartScreen.vue:42`) is a bulleted-list icon that resembles neither the circle nor the `<Select>` it purports to point at.
**Falsifier.** A breakpoint where `ChromeDock` renders below the hero (`layout.css` defines only the top anchor for `[data-dock-tether="top"]`, incl. the `@supports (anchor-name)` arm at `:154–169` which tethers to the stage *top*), or a second scene list somewhere below the fold.

### D-13 · MINOR · `forced-colors` coverage is zero across the demo

Whole-tree grep for `forced-colors` / `prefers-contrast` across 12 CSS files + 40 `<style>` blocks: **0 hits**. glass-ui's `dist/styles/accessibility.css` supplies a `@media (forced-colors: active)` block, but it covers **only** aria-state border affordances (`[aria-selected]`, `[data-state=checked]`, `[aria-invalid]`) — it says nothing about App's own surfaces: the graph-paper gradients (`EditorShell.vue:238–260`), the Aurora wash (`HeroAurora.vue`), the six `rgba()` cube facets, or the skeleton plate + sheen (`App.skeleton.vue:51–83`). In Windows High Contrast the hero/die relationship of D-1 is re-rolled with no design intent behind it at all.
Contrast this with the PRM discipline (13 enforcement sites, census §6.5, and the verified delegation at **S-A**) — forced-colors is the one state-coverage axis that got no attention.
**Falsifier.** A `forced-colors` block in `demo/` (none), or a glass-ui rule that neutralises decorative background layers globally (checked `accessibility.css` + `utilities/a11y-overrides.css` — it does not).

### D-14 · MINOR · `--shadow-glass` is a phantom token; the loading plate's elevation is a hardcoded light-mode value in both themes

`App.skeleton.vue:64` — `box-shadow: var(--shadow-glass, 0 1px 2px rgb(0 0 0 / 0.04));`. `--shadow-glass` is defined **nowhere**: 0 definitions in `demo/**` and 0 in `@mkbabb/glass-ui@7.0.0/dist/**`. The fallback therefore always wins, so the plate carries a black-at-4 % shadow in dark mode where it is invisible, and the "glass surface silhouette" the comment at `:50` promises is a flat rectangle. (The plate's *other* fallbacks are fine — see **S-B** — which makes this one look like a typo rather than a policy.)
**Falsifier.** A `--shadow-glass` definition anywhere on the cascade (I grepped both trees), or a demonstration that glass-ui's `glass.css` sets it under a different selector scope.

### D-15 · MINOR · `--dock-label-padding-inline` is a phantom token; the "keeps the dock row rhythm" claim is unmet

`ChromeDock.vue:381` — `padding-inline: var(--dock-label-padding-inline, 0.5rem);`, justified at `:373–379` as reading "the same inline height + padding a `DockSelectTrigger` occupies **so the dock row keeps its rhythm**". The token exists in neither tree (0 defs in `demo/**`, 0 in glass-ui `dist/**`); glass-ui's actual trigger token is `--dock-trigger-padding-inline`. So the rhythm claim is decorative prose over a hardcoded `0.5rem`. Mitigating: the branch is self-declared dead — `:144–146` says the inline zone is "never on the surviving scene set" — hence MINOR.
**Namespace note (folds census §6.3).** I tested the census's flat-namespace hazard on the `--dock-*` family, the largest shared prefix: glass-ui defines 65 `--dock-*` tokens, the demo defines 11, and `comm -12` over the two sorted sets returns **∅**. The feared collision does not exist here; the real hazard in this closure is the inverse — demo rules reading glass tokens that do not exist. Recommend re-cutting the census's "token collision audit" (§10 item 7) as a **phantom-token audit**.
**Falsifier.** A definition of either token, or a glass-ui version bump that introduces them.

### D-16 · MINOR · A dead centering contract wraps the hero

`EditorShell.vue:60` — `<div v-if="showStartScreen" class="absolute inset-0 z-controls flex items-center justify-center pointer-events-none">`. Its only child (default or slotted) is `EditorStartScreen`, whose root is `position: absolute` with **both** `top` and `left` resolved (`EditorStartScreen.vue:17–19` `absolute left-0`, `:88–92` `top: calc(…)`). An absolutely positioned child with both offsets resolved ignores its parent's flex alignment entirely, so `flex items-center justify-center` is inert — vestigial from the pre-T.D9 seat the hero abandoned. The comment above it (`:53–59`) still describes the old centering model. Zero visual impact today; it is a trap for the next editor, who will change the flex alignment and see nothing move.
**Falsifier.** A consumer passing a `#start-screen` slot child that is statically positioned (App is the only host, `App.vue:49–51`, and it passes `EditorStartScreen`).

### D-17 · MINOR · The style block is 6 : 1 comment-to-rule, and 18 of those lines document a declaration that was deleted

`App.vue:350–387` — 38 lines, **5 of them CSS** (`view-transition-name`, `outline: none`). `:361–378` is an 18-line perf narrative about `contain: paint` — a declaration **that is not in the file**; it argues for a "de-layer contract" that D-9 shows the component simultaneously violates via its own `:style` binding. File-wide: **110 of 387 lines (28 %) are comment**, including archaeology of deleted files (`:113–121`, `scene-transition.css`), retired props (`:186–189`, `machinePlaying`), and superseded mechanisms (`:200–206`, "the reka-tab-fallback hacks … are SUPERSEDED"). This is design documentation that describes a tree that no longer exists — the same failure mode that produced D-3 and D-4, at lower stakes.
**Falsifier.** Show that a `contain` declaration or `scene-transition.css` survives (neither does), or that the ledger prose has a downstream consumer that requires the deleted-thing entries.

---

## INFO

### D-18 · INFO · RTL is not applicable, and the two sites that would matter are already correct

The demo is single-locale (`app/index.html:2` `lang="en"`, no `dir`, no i18n surface, 0 `[dir=`/`:dir()` rules tree-wide). I record this rather than manufacture an RTL defect: the two direction-sensitive declarations in App's closure use **logical** properties correctly — `EditorStartScreen.vue:93` `padding-inline: clamp(2rem, 5vw, 4.5rem)` and `AnimatedText.vue:30` `marginInlineEnd` (the inter-word gap, itself a deliberate fix per `:11–13`) — and `ChromeDock.vue:215`'s `left-1/2 -translate-x-1/2` is direction-symmetric. `EditorStartScreen.vue:18`'s `left-0 w-screen` is physical but spans the full viewport, so it is direction-invariant. **No claim.**

---

## SUPERLATIVES (L-18, running the other way)

### S-A · The `prefers-reduced-motion` delegation is **real**, verified end to end

`App.vue:353–357` asserts that the scene swap's PRM degrade "rides glass-ui's `view-transition.css`, already loaded via the demo's `@import "@mkbabb/glass-ui/styles"` — no demo-side VT CSS duplicates it." I chased all three links:
1. `demo/styles/style.css:3` → `@import "@mkbabb/glass-ui/styles"`;
2. `dist/styles/index.css` → `@import "./view-transition.css"` (present, mid-chain);
3. `dist/styles/view-transition.css` **opens with** `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; } }`.

The claim holds exactly as written, `!important` and universal selector included. The census (§6.5) listed this as "correct if the delegation holds, **unverified statically**" — it holds. Delegation claims of this shape are usually wishes; this one is a fact. Paired with the kf-side gate (`useSceneTransition.ts:15–17`, `withReducedMotion` → `backend: "immediate"`) and the spring's own `respectReducedMotion: true` (`useSceneSwap.ts:45`), **all three swap paths degrade** — CSS, dispatch, and fallback spring.
**Falsifier (runs both ways).** A build that tree-shakes `view-transition.css` out of the `styles` entry, or a demo-side `::view-transition-*` rule re-introducing motion (grep: the demo declares zero).

### S-B · The loading state is a designed, PRM-honest, genuinely theme-aware component

`App.vue:96–98` mounts `SceneSkeleton` rather than a text node, and the component earns it: `role="status"` + `aria-busy="true"` + a real `aria-label` (`App.skeleton.vue:28–33`); the shimmer is `transform`-free `background-position` on a `will-change`d layer (`:80–83`); and PRM collapses it to a static plate rather than merely stopping it (`:95–100` — `animation: none` **and** `background: none`, so no frozen half-swept gradient). I also verified the token fallbacks actually resolve: `--color-muted`, `--color-border`, `--color-foreground`, `--radius-lg` are all bridged in glass-ui `dist/styles/theme/bridges.css`, which `theme.css` imports, which `index.css` imports — so the plate retints correctly in both themes rather than falling to its hardcoded `oklch()` literals.
**This partly contradicts census S-6**, which recommends delegating the shimmer plate to glass-ui's `Skeleton`: the delegation may still be worth it for line count, but the census's implicit premise — that the bespoke plate is the weaker artifact — does not survive inspection. The demo copy is theme-correct, PRM-correct, and AT-announced today. (Its one flaw, `--shadow-glass`, is D-14 — cosmetic.)
**Falsifier.** A missing bridge import in a production build, or a `Skeleton` primitive demonstrably superior on all three axes (a11y, PRM, theme).

### S-C · Per-character text animation that does not shred the accessible name

`AnimatedText.vue:21–23` — one `sr-only` span carries the whole phrase; the 17-span animated layer is `aria-hidden="true"`. AT hears "Select an animation", never the glyph stream. The PRM guard (`:121–125`) rests every char at its 0 %/100 % frame. The inter-word gap is `margin-inline-end`, never a rendered space (`:11–13`), because Vue's `whitespace: 'condense'` would otherwise weld the words — a recorded regression, fixed structurally. The lift is `em`-relative (`−0.09em`, `:19`) so it scales from the 177 px mega rung to the 54 px phone rung without re-tuning. This is the hardest common a11y trap in decorative typography and it is handled on all four fronts.
**Falsifier.** An AT recording announcing the per-char spans (they are `aria-hidden`), or a `text-wrap: balance` interaction breaking mid-word (words are `inline-block`, `:90–92`).

### S-D · The focus route is written against the *failure* path

`useSceneTransition.ts:89–91` — `finished.finally(() => sceneHost.value?.focus())`, not `.then(...)`. A skipped, aborted, or unsupported transition still routes focus; the docblock at `:48–50` states the reasoning explicitly ("The helper's `finished` never rejects … so the focus route always runs"). Most view-transition integrations put focus in `.then` and silently lose it whenever the transition is skipped — which is *exactly* the reduced-motion and mid-nav-interrupt case, i.e. the users who need it most. (What it routes focus *to* is D-5; the routing mechanism itself is right.)
**Falsifier.** A `finished` implementation that can reject (kf's `viewTransition` settles cleanly per `:48–50`), or an ordering bug where `focus()` fires before the new host is mounted.

### S-E · Exactly one `view-transition-name` in the entire demo — the runtime mandatory is satisfied *structurally*

`App.vue:359` declares `view-transition-name: scene-subject` and a whole-tree grep returns **one** declaration across 58 `.vue` + 12 `.css` (the other two hits are prose). The "≤ 1 element per VT state, or names collide and the transition throws" rule is therefore enforced by there being only one place it *could* be declared, not by a convention someone must remember. The complement holds too: **zero** demo-side `::view-transition-*` rules, so the look is single-sourced to glass-ui (which is what makes S-A verifiable at all). The comment at `:350–357` states the invariant and the tree matches it exactly — rare in a file with D-17's comment-drift problem.
**Falsifier.** A second `view-transition-name` (including one inside glass-ui's own component CSS that could co-occur — `dist/styles/view-transition.css` names only classes it owns, `.gl-list-item` / `root`, never `scene-subject`).

---

## Ranked remediation

| # | ID | Severity | One-line fix |
|---|---|---|---|
| 1 | D-2 | BLOCKER | `errorComponent` on `lazyScene` + `onErrorCaptured` in App → a retry surface. |
| 2 | D-1 | BLOCKER | Restore a scrim/shadow under the hero ink, or bound the die out of the hero band (which is D-4's fix), or re-token the three failing facets. |
| 3 | D-3 | MAJOR | `App.vue:227` → `isHome.value ? undefined : sceneRef.value?.facility?.channels` — the guard its sibling at `:248` already has. |
| 4 | D-4 | MAJOR | Re-derive `--start-hero-band` against the live 0.52 φ seat, or delete the recede rule; kill both false invariant comments. |
| 5 | D-5 | MAJOR | `role="region"` + `:aria-label="`${currentLabel} scene`"` on `sceneHostEl`. |
| 6 | D-8 | MAJOR | Wrap `ChromeDock` in `<nav aria-label="Scenes">`. |
| 7 | D-6 / D-7 | MAJOR / MINOR | Deck + hint → `<p>`; give non-home scenes an `<h1>` (visually hidden is fine). |
| 8 | D-10..D-17 | MINOR | Individually landable; D-14/D-15 are one-line token fixes. |

**Standing precondition:** none of the above is reproducible until lane-frontend **F-1** lands (`@mkbabb/glass-ui` undeclared and unlocked) — every token, PRM, and primitive claim in this challenge is sourced from an installed `7.0.0` that `npm ci` cannot currently reconstruct.
