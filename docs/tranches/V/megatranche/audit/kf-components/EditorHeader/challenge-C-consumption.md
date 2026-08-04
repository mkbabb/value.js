claude-opus-5[1m]

# CHALLENGE · `EditorHeader.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorHeader.vue` (108 L)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components, value.js transitive exposure, props/emits contract, sibling seams.
**Method** static + source-derived only. No browser. Read whole: the target, `SharePopover.vue`, `useShareState.ts`, `shell/index.ts`, `EditorShell.vue`, `MbabbMenu.vue`, `App.vue` (slot surface), `demo/styles/{style,layout,design-idioms}.css`, `vite.config.ts`, and the **installed** glass-ui 7.0.0 dist (`dark-mode-toggle.js`, `header-ribbon.js`, `styles/**`, `components/header-ribbon/styles.css`), plus the **shipped** `dist/gh-pages/assets/*.css`.
**Prior** hitherto corpus folded, not re-invented: `formation/keyframes/lane-frontend.md` (F-1 phantom dep; roster row `:194`; shadow census S-1..S-8 `:264-397`; the glass↔kf cycle `:569`) and `lane-library.md` (`:80` the value.js-free LIGHT barrel; `:25-26,54-57` the value.js subpath ledger). **Contradictions with the census are flagged explicitly.**

**Verdict.** 15 defects (1 BLOCKER · 4 MAJOR · 9 MINOR · 1 INFO) and 4 superlatives. The BLOCKER is not a bug inside the component — it is that the component *exists*: it is a dead, hand-rolled re-implementation of a first-class glass-ui 7.0.0 primitive the demo already consumes three files away, and the S-1..S-8 census did not catch it.

---

## C-1 · **BLOCKER** — `EditorHeader` is a dead hand-rolled shadow of glass-ui 7.0.0 `HeaderRibbon` (census miss → new row **S-9**)

**Claim.** The entire component is a strict, degraded subset of `@mkbabb/glass-ui/header-ribbon`, which the *sibling file in the same directory* already imports. It has zero importers and is absent from the shipped bundle.

**Provenance — the API is not merely similar, it is the same API.**

| surface | `EditorHeader.vue` | glass-ui 7.0.0 `HeaderRibbon` (`node_modules/@mkbabb/glass-ui/dist/header-ribbon.js`) |
|---|---|---|
| items slot | `:22` `<slot name="items">` | `u(n.$slots, "items")` |
| anchor slot | `:36` `<slot name="anchor" :pinned="isPinned">` | `u(n.$slots, "anchor", { pinned: x.value })` — **identical slot-prop name** |
| pin toggle | `:75` `onAnchorClick` on the anchor wrapper | `function k(){ x.value = !x.value }`, bound `onClick` on `.header-ribbon__anchor` |
| expanded | `:51` `isExpanded \|\| isPinned` | `w = n(() => x.value \|\| S.value \|\| C.value)` (pinned ‖ hover ‖ **focus-within**) |
| hover | `:64` `onRibbonMouseEnter` | `T(e){ e.pointerType !== "touch" && (S.value = true) }` |
| placement | hardcoded `justify-between` (`:3`) | `placement` prop → `data-placement="left\|right"` |

**Provenance — it is dead.**
- `EditorShell.vue:116` `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";` and `:16-50` mounts it with `#items` — **the real one is live, in the same directory.**
- `grep -rn EditorHeader` across the whole repo (excl. `node_modules`, `.git`) returns exactly three non-doc hits: the file itself, `shell/index.ts:2` (barrel re-export), `demo/styles/layout.css:15` (a comment). **No consumer.** The only barrel consumers import other symbols — `App.vue:138` `{ EditorShell, EditorStartScreen }`, `MbabbMenu.vue:81` `{ SharePopover }`.
- **Shipped-bundle proof:** in `dist/gh-pages/assets/`, `grep -rl "header-items-wrapper"` → *empty*; `grep -rl "header-collapsed"` → *empty*; `grep -rlo "header-ribbon__actions" assets/*.css` → `assets/index-CL_QYCiO.css`. The shadow's scoped CSS never entered the build; the real primitive's did.
- The orphan token still ships: `grep -o -- "--header-items-max-w:[^;]*;"` → `--header-items-max-w:500px;` present in the bundle with **zero consumers**.

**Provenance — a ruling already ordered its deletion and never executed.** `docs/tranches/U/waves/U.B.md:389` "**DELETE `EditorHeader.vue`** (108 L) — ZERO runtime importers (verified)"; `U.B.md:135` U.B5; `U.B.md:800` the `proof:no-dead-export` re-arm row; `docs/tranches/U/audit/lane-18-demo-instrument-editors-shell-state.md:69-78` "**Fully dead** … masked by a barrel re-export". The gate cannot see it because the barrel is consumed for *other* symbols (`lane-18:71`).

**Contradiction with the hitherto corpus (explicit).** `lane-frontend.md:194` rosters `EditorHeader.vue | 108 | G | header bar — DarkModeToggle` — an ordinary live row. It is neither live nor an ordinary row. The shadow census `lane-frontend.md:264-397` enumerates S-1..S-8 (KfPillTabs, timeline cluster, SequenceScrubber, AnimatedText, skeleton, CopyButton, TypingDots) and **misses this one**, which is the cleanest shadow in the tree — a 1:1 slot-API duplicate of a shipped primitive. The census's own arithmetic (`:395-397`: 217 replace / 1 168 evaluate / 125 keep) understates the shadow surface by **108 lines**. File as **S-9 · `EditorHeader` → `HeaderRibbon` — RED, 108 lines, DEAD, replace-by-deletion (no port needed; the consumer already exists at `EditorShell.vue:16`).**

**Falsifier.** Produce (a) any runtime import of `EditorHeader` other than the barrel line, **or** (b) a `HeaderRibbon` behaviour the shadow provides and the primitive cannot (with the 7.0.0 dist line that proves the gap), **or** (c) `header-items-wrapper` present in `dist/gh-pages/assets/`. Any one kills this claim.

---

## C-2 · **MAJOR** — the shadow strips the design system's keyboard model: no focus-within expansion, and the collapsed controls stay focusable

**Claim.** `.header-collapsed` (`:101-107`) hides with `max-width:0; opacity:0; pointer-events:none; overflow:hidden` — none of which removes a descendant from the tab order or the a11y tree. The wrapper also has **no `focusin` handler** (contrast `:64` mouseenter only). Net: a keyboard-only user can never expand the ribbon, yet `SharePopover`'s trigger `<button>` (`SharePopover.vue:4`) and `DarkModeToggle`'s `<button>` remain fully focusable and announced while invisible — focus lands on nothing.

**Provenance of the free fix declined.** `header-ribbon.js` solves exactly this three ways the shadow drops:
- `inert: !w.value || void 0` and `"aria-hidden": !w.value` on `.header-ribbon__actions` — collapsed actions leave the tab order *and* the a11y tree;
- `function D(){ C.value = true }` on `onFocusin` + `O` on `onFocusout` (with a `relatedTarget`-contains guard) — tabbing in expands;
- `onKeydown: withKeys(withModifiers(A, ["stop","prevent"]), ["esc"])` where `A` collapses **and** returns focus to the anchor via `b.value?.querySelector("button, a, [tabindex]:not([tabindex='-1']))?.focus()`.

The shadow also drops `role="toolbar"` + `aria-label` (`header-ribbon.js` sets both; the shadow's root `:2` is a bare `<div>`).

**Severity note.** Latent, because C-1: the component never mounts. It fires the day anyone adopts it — which is why it is MAJOR and not INFO.

**Falsifier.** Show that `max-width:0` + `overflow:hidden` + `opacity:0` + `pointer-events:none` removes a `<button>` from sequential focus navigation in any engine (it does not — only `display:none`, `visibility:hidden`, `inert`, `content-visibility:hidden`, or `tabindex="-1"` do), **or** show a `focusin` path in the file. Either kills it.

---

## C-3 · **MAJOR** — the collapse animation drops the design system's motion-safety and environment guards

**Claim.** The scoped transition (`:95-98`) has no `prefers-reduced-motion` guard, no `forced-colors` treatment, and no coarse-pointer accommodation. The primitive ships all three.

**Provenance.** `node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/styles.css`:
- `@media (prefers-reduced-motion: reduce) { .header-ribbon__actions { transition: none } }` — **absent** in the shadow, whose `max-width` + `opacity` transition therefore always runs.
- `@media (forced-colors: active) { .header-ribbon__band { border: 1px solid CanvasText } }` — absent (the shadow has no band at all, so in forced-colors mode the floating cluster has no delimiting edge).
- `@media (pointer: coarse) { .header-ribbon { padding: 0.75rem } .header-ribbon__band { max-inline-size: calc(100vw - 1.5rem) } }` — absent; the shadow's `px-4 py-2` (`:3`) and the 500 px cap are viewport-blind.

The demo *has* a reduced-motion posture elsewhere — glass-ui's own `tokens/scheme-motion.css` sets `--motion-weight: 0` under `prefers-reduced-motion` — but the shadow's transition is written in raw `--duration-*`/`--ease-*`, which that register does not attenuate.

**Falsifier.** Point to a demo-global `@media (prefers-reduced-motion)` rule that reaches `.header-items-wrapper` (there is none in `demo/styles/*.css`), or show `--duration-slow` is tempo-scaled (`tokens/scheme-motion.css` defines it as a flat `0.45s`, not a `calc(... * var(--motion-tempo))` — unlike the `--spring-*-duration` family).

---

## C-4 · **MAJOR** — the default `items` slot instantiates `SharePopover` with no `onSceneRestore`; the restore silently no-ops **and toasts success** (and the *live* twin has the same defect)

**Claim.** `:23` `<SharePopover />` — no `:on-scene-restore`. `SharePopover.vue:56-58` declares it optional, so `useShareState(undefined)`; `useShareState.ts:79-86` then reads
```ts
if (result.activeScene && onSceneRestore) { onSceneRestore(result.activeScene); }
toast.success("State restored!", { … description: "Animation state loaded from shared URL." });
```
The scene switch is skipped, the toast fires unconditionally. A user pasting a share URL for a *different* scene stays on the current one and is told it worked.

**Provenance that this is LIVE, not only latent.** `EditorShell.vue:19-20` has the identical unwired default inside `#header-right`, and `App.vue` **never overrides it** — `grep -n "header-left\|header-right\|#header" demo/app/App.vue` → no hits; its slot list is `#backdrop, #start-screen, #tabs-trigger, #tabs-content, #ribbon-content, #target`. Meanwhile the *other* mount is wired: `App.vue:23` `:on-scene-restore="runSceneSwitch"` → `MbabbMenu.vue:9` `<SharePopover :on-scene-restore="onSceneRestore" />`. So the app ships two `SharePopover`s, one correct (dock menu) and one broken (header ribbon).

**Why this is a consumption finding.** The seam is a slot *default* that silently drops a required-in-practice prop; every host that accepts the default inherits a broken feature with a success toast. The shadow replicates the defect verbatim, which is evidence the two files were copy-forked rather than one consuming the other.

**Falsifier.** Show `restoreStateFromParam` performs the route switch itself (it does not — `useShareState.ts:75` only reads `result.activeScene`), or show `App.vue` supplies `#header-right`.

---

## C-5 · **MAJOR** — `SharePopover` reads its function prop non-reactively (one-shot capture at setup)

**Claim.** `SharePopover.vue:60-61`
```ts
const { … } = useShareState(props.onSceneRestore);
```
reads `props.onSceneRestore` **once, during setup**, and hands the value to a composable that closes over it. A parent that later swaps the handler (a different scene router, a lazily-bound callback, HMR) keeps calling the stale one — or `undefined` forever if the first render had none.

**Provenance.** `useShareState.ts:12` takes `onSceneRestore?: (sceneId:string)=>void` by value and captures it in the closure at `:79`. Nothing re-reads it. Contrast the same repo's correct idiom in `MbabbMenu.vue:75-81`, which declares the prop non-optional and never destructures it out of reactivity.

**Falsifier.** Show `onSceneRestore` is guaranteed referentially stable for the lifetime of every mount. `MbabbMenu`'s is (`App.vue:23` `runSceneSwitch`), so today the *live* impact is nil — this is a contract defect (the prop advertises reactivity Vue's `defineProps` implies, and the component silently drops it), not a live crash. Demonstrating that no host can ever rebind it kills the claim.

---

## C-6 · **MINOR** — physical-property collapse: RTL-broken where the primitive is RTL-correct

**Claim.** `:92-97` animate `max-width` and `margin-right`. The cluster is a right-anchored ribbon; under `dir="rtl"` the margin lands on the wrong side and the collapse pulls the wrong way.

**Provenance.** `components/header-ribbon/styles.css` uses logical properties throughout — `max-inline-size`, `margin-inline-start`/`-end` keyed off `[data-placement]`, `inset-inline-start`/`-end`, and even a directional `translate: ±0.375rem 0` per placement. The shadow has no placement concept at all.

**Falsifier.** Show the demo declares itself LTR-only in a way that makes logical properties moot (`demo/app/index.html` sets `lang` but I found no `dir` lock; and the rest of the demo does use logical properties via glass-ui). Producing an explicit LTR-only ruling downgrades this to INFO.

---

## C-7 · **MINOR** — the props/emits/expose contract is empty; the `pinned` slot prop is write-only from the host's view

**Claim.** No `defineProps`, no `defineEmits`, no `defineExpose` (`:42-85`). `isExpanded`/`isPinned` are private refs. The `anchor` slot advertises `:pinned` (`:36`) but a host cannot **set** it, cannot **observe** it outside that one slot, cannot pin programmatically, cannot label the region, cannot choose a side, and gets no `data-*` hooks to style against.

**Provenance of what a first-class contract looks like, same concern, same version.** `header-ribbon.js` props `{ placement: {default:"left"}, ariaLabel: {default:"Header actions"}, class }` and emits state to CSS as `data-placement` / `data-expanded` / `data-pinned` / `data-slot="header-ribbon"` — a styling contract the shadow replaces with two private class names. `EditorShell.vue:187,197` even shows the host-side idiom the shadow forecloses (`useTemplateRef<InstanceType<typeof HeaderRibbon>>` + `defineExpose`).

**Falsifier.** Show a host that needs none of these (vacuously true today — there is no host, per C-1). The claim is about the contract's fitness for the barrel export it advertises at `shell/index.ts:2`; deleting the export moots it.

---

## C-8 · **MINOR** — z-rung violation against the demo's own written z-contract

**Claim.** `:3` `z-dock`. `demo/styles/style.css:31-32` states the contract: `--z-bar : 30  the editor bars (header / menubar chrome)` / `--z-dock : 40  the bottom dock band`. A header on the dock rung is exactly the drift the contract block exists to prevent ("Use the SEMANTIC z-* utility for the rung", `style.css:36-38`).

**Provenance of the correct rung.** glass-ui declares `--z-header: 35` (`dist/styles/tokens/scheme-motion.css`) and `HeaderRibbon` uses it (`components/header-ribbon/styles.css` → `z-index: var(--z-header)`). The demo's contract block does not even list `--z-header`, so the shadow had no local rung between bar and dock and reached one too high.

**Verified NOT a defect (falsifier already run):** I first suspected `z-dock` generates no CSS, since glass-ui declares `--z-*` on `:root` and ships **no `@theme` block** (`grep -l "@theme" dist/styles/*.css` → empty). The shipped bundle disproves it: `dist/gh-pages/assets/index-CL_QYCiO.css` contains `.z-dock{z-index:var(--z-dock)}`. Claim withdrawn; only the semantic-rung claim stands.

**Falsifier.** Show the header must paint over the bottom dock band (it is `top-0`, the dock is bottom — they do not overlap), or that `--z-bar` is deprecated.

---

## C-9 · **MINOR** — stale token-provenance comment, and the token it names is now an orphan

**Claim.** `:89-91` "the expanded-state cap reads the named layout token (**design-idioms.css** `--header-items-max-w`, same 500px value)". The token is declared in **`demo/styles/layout.css:15`**, not `design-idioms.css` (`grep -rn "header-items-max-w" demo/styles/` returns exactly one declaration, in `layout.css`). Compounding: because the only consumer is dead (C-1), `layout.css:15`'s self-describing comment ("the EditorHeader expanded items-wrapper cap") documents a component that is not in the build, and `--header-items-max-w:500px` ships to every user as a dead custom property.

**Falsifier.** Find a `--header-items-max-w` declaration in `design-idioms.css`, or a second consumer of the token.

---

## C-10 · **MINOR** — the template's `overflow-hidden` utility is dead against the component's own scoped rule

**Claim.** `:18` puts `overflow-hidden` in the wrapper's class list; `:99` sets `overflow: visible` on the same element via `.header-items-wrapper`. Vue scoped styles are emitted **unlayered**, and unlayered author styles outrank every `@layer` at the same origin — so the scoped `visible` wins and the utility never applies. The collapsed clip is delivered by `.header-collapsed { overflow: hidden }` (`:106`) instead. One of the two spellings is noise; a reader cannot tell which without knowing the layer rule.

**Provenance.** The build emits layered utilities — `dist/gh-pages/assets/index-CL_QYCiO.css` carries `@layer base, components, demo, properties, theme, utilities`. The primitive avoids the ambiguity entirely with a single `overflow: clip` on `.header-ribbon__actions`.

**Falsifier.** Show Vue SFC scoped styles are emitted inside `@layer utilities` (they are not; `vite.config.ts` declares no CSS-layer injection for SFC styles), or show `overflow-hidden` is emitted unlayered *after* the scoped block.

---

## C-11 · **MINOR** — `DarkModeToggle` sizing bypasses the component's first-class `size` prop, and the hover treatment contradicts the live twin

**Claim.** `:24-27`
```html
<DarkModeToggle title="Toggle dark mode" class="aspect-square w-8 scale-on-hover hover:opacity-50" />
```
Two consumption problems:
1. glass-ui 7.0.0 ships `props: { size: { default: "md" }, disableTransitions: … }` and renders `data-size` (`dark-mode-toggle.js`). The shadow sizes with ad-hoc utilities instead of the design-system axis, so the emitted DOM carries `data-size="md"` *and* a contradicting `w-8`.
2. `hover:opacity-50` is layered on top of the component's built-in press physics (`useLiquidPress` → `pressStyle` + `data-press-armed`, `dark-mode-toggle.js`). The live twin at **`EditorShell.vue:46`** spells the *same* component `class="aspect-square w-8 scale-on-hover"` — **no opacity hover**. Two files, same directory, same component, divergent hover idiom.

The `title` attribute is harmless (it flows through `useAttrs()`'s rest spread) but redundant: the component already computes a *state-aware* `aria-label` ("Switch to light mode" / "Switch to dark mode"), which the static `title` shadows in tooltip form.

**Falsifier.** Show `size` has no visual effect in 7.0.0 (it is emitted as `data-size` and consumed by `components/dark-mode-toggle/dark-mode-toggle.css`), or show `EditorShell.vue:46` also carries `hover:opacity-50`.

---

## C-12 · **MINOR** — the 2 000 ms hover-out grace is an untokenized literal, and the primitive has no timer at all

**Claim.** `:59` hardcodes `2000`. glass-ui exposes a full duration scale (`--duration-instant … --duration-xxl`, `tokens/scheme-motion.css`) and the demo already reads it. More pointedly, `HeaderRibbon` collapses **immediately** on `pointerleave` (`E(){ S.value = false }`) and relies on focus-within + Esc for the keyboard path — so the shadow's timer is not merely untokenized, it encodes a *different UX* that the design system deliberately does not have.

**Falsifier.** Produce a design ruling that the demo header wants a dwell delay the primitive lacks; that converts this from drift into a legitimate `HeaderRibbon` feature request (and a glass-ui BH relay, per the standing law).

---

## C-13 · **MINOR** — F-1 confirmed live: `:46` imports a phantom dependency

**Claim.** `:46` `import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";` while `package.json` declares **no** `@mkbabb/glass-ui` anywhere: `dependencies` is exactly `{"@mkbabb/value.js": "4.0.0"}`; `devDependencies` (42 entries) has no glass-ui; `peerDependencies` and `optionalDependencies` are empty. 7.0.0 nonetheless sits in `node_modules` (`node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"`).

**Fold, not re-invent.** This is `lane-frontend.md:15` / `:54` **F-1** (RED), verified unchanged against the tree on this pass. Every glass-ui edge in the file inherits it. `lane-frontend.md:612` is right that F-1 must land before any replacement wave; note that for *this* component the replacement is a deletion, which is F-1-independent.

**Falsifier.** Any `@mkbabb/glass-ui` entry in `package.json` or `package-lock.json`.

---

## C-14 · **MINOR** — `:46` is a concrete instance of the demo → glass-ui → keyframes.js cycle, standing only on a Vite alias

**Claim.** `DarkModeToggle`'s import closure reaches back into keyframes.js itself. Measured closure of `dist/dark-mode-toggle.js` (9 chunks): externals = `{@mkbabb/keyframes.js, @vueuse/core, vue}`. The edge is `dark-mode-toggle.js` → `useLiquidPress-D0PFjKuk.js` → `useSpring-BCHxLjwv.js:3` `import { SpringProgress as c } from "@mkbabb/keyframes.js"`.

Nothing resolves that bare specifier from `node_modules` (keyframes.js does not install itself). It works **only** because `vite.config.ts:37-43` self-aliases `"@mkbabb/keyframes.js" → src/animation/index.ts`, whose own comment (`:28-36`) explains the graft. Consequence for consumption: this file is portable only inside this Vite config. Lift it into any other build (a Storybook, a docs site, an extracted package) and glass-ui's `SpringProgress` import dangles or duplicates the engine.

**Fold.** `lane-frontend.md:569` names the cycle ("glass-ui depends on keyframes.js (peer), and keyframes.js's demo depends on glass-ui — a deliberate cycle held together by an alias"). This is the file-and-line instance.

**Falsifier.** Show `@mkbabb/keyframes.js` resolves without the alias (it does not — `vite.config.ts:31-33` states rolldown would stub it as an empty optional peer), or that `SpringProgress` is not exported from the alias target (`src/animation/index.ts:37` exports it — the alias is sound).

---

## C-15 · **INFO** — root-barrel vs granular subpath in the default slot's dependency (a repo-wide idiom, not an `EditorHeader` defect)

**Measurement.** `SharePopover.vue:47-52` imports `Popover`, `PopoverTrigger`, `PopoverContent`, `Button` from the **root** `@mkbabb/glass-ui`, though 7.0.0 publishes `./popover` and `./button` among its 73 export entries. Static ESM closure of the installed dist:

| entry | chunks | bytes |
|---|---|---|
| `@mkbabb/glass-ui` (root barrel) | 62 | 219 898 |
| `./popover` + `./button` + `./forms` | 20 | 40 561 |

**Why this is INFO and not a defect.** The demo's specifier census (`grep -rho 'from "@mkbabb/glass-ui[^"]*"' demo | sort | uniq -c`) is **31 root-barrel** vs 38 granular across 19 subpaths — the root barrel is the *majority* idiom, and `EditorShell.vue:124` does the same for `Button`. Attributing it to `EditorHeader` would be a false defect. Additionally, rolldown tree-shakes ESM, so the static closure is an upper bound, not a shipped-bytes measurement.

**Falsifier (which must be run before anyone acts on this).** Build `gh-pages` with `SharePopover` on `./popover` + `./button` and diff `dist/gh-pages/assets/*.js` bytes. A null delta kills the size half of the claim outright and leaves only an idiom-consistency observation.

---

# SUPERLATIVES (L-18 both ways)

## S-A · The R1 parser-crash class is **NOT** reachable from this component — measured, not assumed

The whole import closure of `EditorHeader` is value.js-free.

- `dist/dark-mode-toggle.js` closure (9 chunks): externals `{@mkbabb/keyframes.js, @vueuse/core, vue}` — no `@mkbabb/value.js`.
- `dist/header-ribbon.js` closure (6 chunks): externals `{reka-ui, vue}`.
- `dist/glass-ui.js` **root barrel** closure (62 chunks, the heaviest thing `SharePopover` pulls): externals `{@lucide/vue, @mkbabb/keyframes.js, reka-ui, vue}` — **still no value.js**.
- `dist/forms.js` closure (6 chunks): `{@lucide/vue, @vueuse/core, reka-ui, vue}`.
- The keyframes.js edge lands on `src/animation/index.ts`, which `lane-library.md:80` independently certifies as "the LIGHT static barrel, **value.js-free**".

glass-ui *does* reach value.js — but only through `dock.js`, `color.js`, `aurora.js`, `easing.js` and the `value-DMhh2R94.js` chunk, none of which are in this component's closure. So `parseCssColor("oklch()")` (the R1 shipping-crash class) cannot fire through `EditorHeader`. **Falsifier:** name a chunk in the four closures above that imports `@mkbabb/value.js`; I enumerated them exhaustively and found none.

## S-B · The `useTimeoutFn` migration comment makes a load-bearing claim that the vendored source actually confirms

`:53-55` asserts "vueuse owns the handle + auto-cleanup on unmount (`tryOnScopeDispose`) … `immediate: false` so it only runs when started." Verified in the installed source: `node_modules/@vueuse/shared/dist/index.js:1694` `function useTimeoutFn(cb, interval, options = {})` — the body ends `tryOnScopeDispose(stop);` and gates the eager path on `if (immediate) { … }`. Both halves of the comment are true, and `{ immediate: false }` is genuinely *required* (the default is `true`, which would fire the collapse 2 s after mount). This is the rare audit-trail comment that survives its own falsifier — and it is a correct discharge of `docs/tranches/D/audit/frontend-findings.md:27` F8.

## S-C · STY-5 was discharged honestly, not cosmetically

`docs/tranches/J/audit/styling-design-system.md:42` flagged `max-width: 500px` as an off-contract magic number. The cure at `:92` reads a real declared token (`layout.css:15`), same value, with the collapse animating to/from it — not a rename-in-place. The provenance pointer is wrong (C-9) but the substance is right.

## S-D · The pointer-events discipline is exactly the primitive's, arrived at independently

`:3` `pointer-events-none` on the full-width fixed bar, re-armed to `pointer-events-auto` on precisely the two live clusters (`:7`, `:12`). That is the same two-tier model glass-ui ships (`.header-ribbon { pointer-events: none }` + `.header-ribbon__band { pointer-events: auto }`), and it is the correct answer to the occlusion class the V audit tracks (`docs/tranches/V/audit/R2-01-visual-design.md:16` "no occlusion at either viewport"). Whoever wrote the shadow understood the problem; they simply solved it a second time.

---

# DISPOSITION

The consumption story here is **one recommendation, not fifteen**: `EditorHeader.vue` and `shell/index.ts:2` should be deleted, and `demo/styles/layout.css:15`'s `--header-items-max-w` with them. That single act discharges C-1, C-2, C-3, C-6, C-7, C-8, C-9, C-10, C-11, C-12 and one of the two F-1 edges (C-13) and one cycle edge (C-14) — twelve of fifteen — and it is already the standing U.B5 ruling (`U.B.md:389`) that never executed.

Three findings **survive the deletion** and must be routed independently, because they live in the *live* tree:
- **C-4** (MAJOR) — the unwired `<SharePopover />` default at **`EditorShell.vue:20`**, shipping today with a false success toast. Fix at the seam (`useShareState.ts:79-86`: do not toast success when the scene switch was requested and dropped), not just at the call site.
- **C-5** (MAJOR) — `SharePopover.vue:60-61`'s one-shot prop capture.
- **C-13** (MINOR) — F-1, repo-wide.

**Census amendment requested:** add **S-9** to `lane-frontend.md`'s shadow census (`:264-397`) and correct the roster row at `:194`; the summary table at `:395-397` gains a fourth class — **"Replace by deletion (already ruled, unexecuted)" — 108 lines**.

**Not claimed / left to SS-13 (UNPROVEN-NEEDS-LIVE).** Nothing in this challenge rests on a rendered frame; the component does not render. Should a future wave adopt it, the visual audit would need to confirm the 500 px cap against the real ribbon width and the collapse's perceived continuity — but adopting it is the wrong move, so these are noted only for completeness.
