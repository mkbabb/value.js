claude-opus-5[1m]

# CHALLENGE · `EditorHeader.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorHeader.vue` (108 L)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components, value.js transitive exposure, props/emits contract, sibling seams.
**Method** static + source-derived only. No browser. Read whole: the target, `SharePopover.vue`, `useShareState.ts`, `shell/index.ts`, `instrument/index.ts`, `EditorShell.vue`, `MbabbMenu.vue`, `App.vue` (slot surface), `demo/state/{index,hashSharing}.ts`, `demo/styles/{style,layout,design-idioms}.css`, `vite.config.ts`, `src/animation/index.ts`, the **installed** glass-ui 7.0.0 dist (`package.json` exports, `dark-mode-toggle.js`, `header-ribbon.js`, `components/header-ribbon/{types,HeaderRibbon.vue}.d.ts`, `components/*/styles.css`, `styles/tokens/scheme-{motion,spring}.css`, `theme/bridges.css`, the chunk import graph), and the **shipped** `dist/gh-pages/assets/*.{css,js}`.
**Prior** hitherto corpus folded, not re-invented: `formation/keyframes/lane-frontend.md` (F-1 phantom dep `:15,54-66`; roster row `:194`; subpath census `:96`; shadow census S-1..S-8 `:264-397`; the glass↔kf cycle `:569`) and `lane-library.md` (`:80` the value.js-free LIGHT barrel; `:243` the R1 crash surface). **Contradictions with the corpus are flagged explicitly (§0, C-1).**

**Verdict.** **18 defects (2 BLOCKER · 5 MAJOR · 11 MINOR) + 1 INFO, and 5 superlatives.** Neither BLOCKER is a bug *inside* the component. The first is that the component *exists*: it is a dead, hand-rolled re-implementation of a first-class glass-ui 7.0.0 primitive the demo already consumes three files away, and the S-1..S-8 census did not catch it. The second is that its published contract is *bricked by default* — the slot that is its only reveal affordance has no fallback, so an adopting host gets a permanently collapsed ribbon with no pointer, focus, or keyboard path back.

---

## §0 · CONTRADICTION of the hitherto corpus — the Glass 7 premise on record is wrong against the installed artifact

`docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md:11-14` asserts:

> "HeaderRibbon is persistent-only. The `mode` prop, `anchorLabel`, **the anchor slot, and the collapsible machinery are removed** (twice-critique cut)"

**The installed 7.0.0 tree disagrees on two of the four.** `node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/HeaderRibbon.vue.d.ts:3-9` declares the `anchor` slot **with its `{ pinned: boolean }` payload**, and `dist/header-ribbon.js` implements the **entire** collapsible machinery — `data-expanded`/`data-pinned`, pointer/focus/Esc state, `inert` + `aria-hidden` on collapse, and the `max-inline-size` morph in `components/header-ribbon/styles.css`. Only `mode` and `anchorLabel` are actually gone.

This is not bookkeeping — it inverts the disposition of the target file. Under the letter's version of Glass 7, `EditorHeader` would hold a capability upstream had *dropped*, and would be **irreplaceable**. Under the tree's version it is **redundant, deletable, and slot-compatible**. Downstream rows that inherited the letter's framing — `DISPOSITIONS.md:21` (XR-4), `PROMPT-RECAP-V.md:132` (IN-GLASS-1), `INBOUND-LEDGER.md:30` — carry the same stale premise and must be re-read against `dist/header-ribbon.js` before the Glass-7 consume slice is scoped.

**Falsifier.** Show `node_modules/@mkbabb/glass-ui/package.json` is not `7.0.0` (I read `"version": "7.0.0"`), or that the letter describes a *later* 7.x re-cut than the installed artifact. If glass re-cut 7.0.0 in place, that is itself a finding against the "immutable artifact" pin, not against this challenge.

*(In-scope corollary, already lane-filed as XR-4 and not re-counted here: `EditorShell.vue:16` still passes `mode="persistent"`, which 7.0.0 does not declare — it lands as a stray attribute on the `role="toolbar"` div via `mergeProps(useAttrs())`.)*

---

## C-1 · **BLOCKER** — `EditorHeader` is a dead hand-rolled shadow of glass-ui 7.0.0 `HeaderRibbon` (census miss → new row **S-9**)

**Claim.** The entire component is a strict, degraded subset of `@mkbabb/glass-ui/header-ribbon`, which the *sibling file in the same directory* already imports. It has zero importers and is absent from the shipped bundle.

**Provenance — the API is not merely similar, it is the same API.**

| surface | `EditorHeader.vue` | glass-ui 7.0.0 `HeaderRibbon` (`dist/header-ribbon.js`, `header-ribbon/types.d.ts`) |
|---|---|---|
| items slot | `:22` `<slot name="items">` | `u(n.$slots, "items")` |
| anchor slot | `:36` `<slot name="anchor" :pinned="isPinned">` | `u(n.$slots, "anchor", { pinned: x.value })` — **identical slot-prop name** |
| pin toggle | `:75` `onAnchorClick` on the anchor wrapper | `function k(){ x.value = !x.value }`, bound `onClick` on `.header-ribbon__anchor` |
| expanded | `:51` `isExpanded \|\| isPinned` | `w = n(() => x.value \|\| S.value \|\| C.value)` (pinned ‖ hover ‖ **focus-within**) |
| hover | `:64` `onRibbonMouseEnter` (unguarded) | `T(e){ e.pointerType !== "touch" && (S.value = true) }` |
| placement | hardcoded `justify-between` (`:3`) | `placement` prop → `data-placement="left\|right"` |
| inline gap | `:93` `margin-right: 0.75rem` | `margin-inline-start: 0.75rem` — **the same literal** |

The `0.75rem` coincidence *plus* the identical `anchor({ pinned })` signature is the provenance tell: one was cut from the other. The dates say upstream is the descendant (this file carries `W1.S4` and `J.W7b STY-5` marks from tranches D and J; glass shipped `HeaderRibbon` at 7.0.0), which makes it worse, not better — **the fork was upstreamed and then never retired.**

**Provenance — it is dead.**
- `EditorShell.vue:116` `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";` and `:16-50` mounts it with `#items` — **the real one is live, in the same directory.**
- `grep -rn EditorHeader` across the whole repo (excl. `node_modules`, `.git`) returns exactly three non-doc hits: the file itself, `shell/index.ts:2` (barrel re-export), `demo/styles/layout.css:15` (a comment). **No consumer.** The only barrel consumers import other symbols — `App.vue:138` `{ EditorShell, EditorStartScreen }`, `MbabbMenu.vue:81` `{ SharePopover }`. It is re-exported a second time by `instrument/index.ts:27` `export * from "./shell"`, doubling the mask.
- **Shipped-bundle proof (re-verified this pass):** in `dist/gh-pages/assets/`, `grep -rl "header-items-wrapper"` → *empty*; `grep -rl "header-collapsed"` → *empty*; `grep -rl "header-ribbon__actions"` → `index-CL_QYCiO.css` **and** `index-B2hcFaCm.js`. The shadow's scoped CSS never entered the build; the real primitive's did.
- The orphan token still ships: `grep -o -- "--header-items-max-w:[^;]*;" dist/gh-pages/assets/*.css` → `--header-items-max-w:500px;` present with **zero consumers**.

**Provenance — a ruling already ordered its deletion and never executed.** `docs/tranches/U/waves/U.B.md:389` "**DELETE `EditorHeader.vue`** (108 L) — ZERO runtime importers (verified)"; `U.B.md:135` U.B5; `U.B.md:800` the `proof:no-dead-export` re-arm row; `docs/tranches/U/audit/lane-18-demo-instrument-editors-shell-state.md:69-78` "**Fully dead** … masked by a barrel re-export". The gate cannot see it because the barrel is consumed for *other* symbols (`lane-18:71`).

**Contradiction with the hitherto corpus (explicit).** `lane-frontend.md:194` rosters `EditorHeader.vue | 108 | G | header bar — DarkModeToggle` as an ordinary live row. It is neither live nor ordinary. The shadow census `lane-frontend.md:264-397` enumerates S-1..S-8 and **misses this one** — the cleanest shadow in the tree, a 1:1 slot-API duplicate of a shipped primitive. The census *saw both halves and never joined them*: `:194` rosters the file, `:96` scores `/header-ribbon` at one consumer (that one is `EditorShell.vue:116`). Its arithmetic (`:395-397`: 217 replace / 1 168 evaluate / 125 keep) understates the shadow surface by **108 lines**. File as **S-9 · `EditorHeader` → `HeaderRibbon` — RED, 108 lines, DEAD, replace-by-deletion (no port needed; the consumer already exists at `EditorShell.vue:16`).**

**Falsifier.** Produce (a) any runtime import of `EditorHeader` other than the barrel lines, **or** (b) a `HeaderRibbon` behaviour the shadow provides and the primitive cannot (with the 7.0.0 dist line that proves the gap — note C-12 identifies exactly one candidate, the 2 s dwell), **or** (c) `header-items-wrapper` present in `dist/gh-pages/assets/`. Any one kills this claim.

---

## C-16 · **BLOCKER** — the `anchor` slot has no fallback, and it is the sole reveal affordance: the default contract is bricked

**Claim.** A host that mounts `<EditorHeader />` — or supplies only `#items` — gets a ribbon that is **permanently collapsed and unrecoverable**: no pointer path, no focus path, no keyboard path.

**Provenance.** `items` has default content (`:22-28`); `anchor` has **none** (`:36`). The reveal paths are exactly two: `@mouseenter` on the middle div (`:13`) and `@click` on the anchor wrapper (`:34`). In the default unexpanded state the collapsed wrapper is `max-width:0; overflow:hidden; pointer-events:none` (`:101-107`) and the anchor wrapper is `shrink-0` (`:33`) around an empty slot — so the middle div, the *only* `pointer-events-auto` element carrying a hover handler, has **zero hit area**. The root is `pointer-events-none` (`:3`) and contributes none. Vue will not warn: slots are not type-enforced at the usage site, and `shell/index.ts:2` publishes the component with this contract.

**Provenance that the primitive does not share the defect.** `HeaderRibbon` binds `pointerenter` to the **root**, not to an inner cluster (`dist/header-ribbon.js:45-51`); the band is a painted glass `Surface` with `padding: var(--panel-padding)` and `min-block-size: var(--size-icon-btn)` (`components/header-ribbon/styles.css`), so it always has a hit box; and `onFocusin` gives an independent keyboard reveal. The fork's contract is strictly more fragile than the primitive it forked.

**Severity note.** Latent today because of C-1 (no host). It is a BLOCKER on the *contract* the barrel advertises: adopting this component — the one action C-1's deletion is meant to prevent — fails closed and silently.

**Falsifier.** Show the collapsed wrapper or the empty anchor retains a non-zero hit box: a `min-width`/`min-height`/padding on `.header-collapsed` or on `:32`, or a global rule giving `.shrink-0` intrinsic size. I found none in the scoped block (`:87-108`), `design-idioms.css`, or `layout.css`. `UNPROVEN-NEEDS-LIVE` applies only to the rendered pixel box, not to the code reading.

---

## C-2 · **MAJOR** — the shadow strips the design system's keyboard model: no focus-within expansion, and the collapsed controls stay focusable

**Claim.** `.header-collapsed` (`:101-107`) hides with `max-width:0; opacity:0; pointer-events:none; overflow:hidden` — none of which removes a descendant from the tab order or the a11y tree. The wrapper also has **no `focusin` handler** (contrast `:64`, mouseenter only). Net: a keyboard-only user can never expand the ribbon, yet `SharePopover`'s trigger `<button>` (`SharePopover.vue:4`) and `DarkModeToggle`'s `<button>` remain fully focusable and announced while invisible — focus lands on nothing, and focusing a clipped descendant additionally scrolls its `overflow:hidden` ancestor.

**Provenance of the free fix declined.** `header-ribbon.js` solves exactly this three ways the shadow drops:
- `inert: !w.value || void 0` and `"aria-hidden": !w.value` on `.header-ribbon__actions` — collapsed actions leave the tab order *and* the a11y tree;
- `function D(){ C.value = true }` on `onFocusin` + `O` on `onFocusout` (with a `relatedTarget`-contains guard) — tabbing in expands;
- `onKeydown: withKeys(withModifiers(A, ["stop","prevent"]), ["esc"])` where `A` collapses **and** returns focus to the anchor via `b.value?.querySelector("button, a, [tabindex]:not([tabindex='-1'])")?.focus()`.

The shadow also drops `role="toolbar"` + `aria-label` (`header-ribbon.js` sets both, the latter defaulting to `"Header actions"` and overridable via `HeaderRibbonProps.ariaLabel`; the shadow's root `:2` is a bare `<div>` and the group is anonymous to assistive tech).

**Severity note.** Latent, because C-1: the component never mounts. It fires the day anyone adopts it — which is why it is MAJOR and not INFO. Note the interaction with C-16: the missing `focusin` reveal is exactly *why* the missing `inert` is dangerous — upstream has both; the shadow has neither, and the combination yields focus-into-invisible.

**Falsifier.** Show that `max-width:0` + `overflow:hidden` + `opacity:0` + `pointer-events:none` removes a `<button>` from sequential focus navigation in any engine (it does not — only `display:none`, `visibility:hidden`, `inert`, `content-visibility:hidden`, or `tabindex="-1"` do), **or** show a `focusin` path in the file. Either kills it.

---

## C-17 · **MAJOR** — no touch guard on the hover-expand, and no touch-safe collapse path

**Claim.** `:13` binds the legacy `mouseenter` and `:4` the legacy `mouseleave`. Mobile browsers synthesize `mouseenter` on tap but do **not** reliably deliver a matching `mouseleave` when the finger lifts elsewhere. `onGroupMouseLeave` (`:69-73`) is the *only* path that starts the 2 s collapse timer, so a tap that opens the ribbon without a subsequent `mouseleave` leaves it expanded indefinitely — the stuck-open class, over the scene subject, on the smallest viewport.

**Provenance of the guard declined.** Upstream binds `pointerenter` and refuses touch explicitly: `function T(e){ e.pointerType !== "touch" && (S.value = !0) }` (`dist/header-ribbon.js`). Its collapse rides `pointerleave` **plus** `focusout` **plus** `Esc` — three independent exits, none of which the shadow has. glass-ui additionally exports `useTouchGate` from its root barrel (`lane-frontend.md:3.2` names it in the drawn-components list); this file imports neither.

**Falsifier.** Demonstrate that the synthesized `mouseleave` always fires after the tap sequence in the demo's supported browsers, or find a pointer-type/touch gate applied to this subtree. `UNPROVEN-NEEDS-LIVE` on the stuck-open *symptom*; the code-level absence of any touch guard is proven.

---

## C-3 · **MAJOR** — the collapse animation drops the design system's motion-safety and environment guards

**Claim.** The scoped transition (`:95-98`) has no `prefers-reduced-motion` guard, no `forced-colors` treatment, and no coarse-pointer accommodation. The primitive ships all three.

**Provenance.** `node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/styles.css`:
- `@media (prefers-reduced-motion: reduce) { .header-ribbon__actions { transition: none } }` — **absent** in the shadow, whose `max-width` + `opacity` transition therefore always runs.
- `@media (forced-colors: active) { .header-ribbon__band { border: 1px solid CanvasText } }` — absent (the shadow has no band at all, so in forced-colors mode the floating cluster has no delimiting edge).
- `@media (pointer: coarse) { .header-ribbon { padding: 0.75rem } .header-ribbon__band { max-inline-size: calc(100vw - 1.5rem) } }` — absent; the shadow's `px-4 py-2` (`:3`) and the 500 px cap are viewport-blind.

There is no global escape hatch: `grep -rn "prefers-reduced-motion" demo/styles/*.css` → **zero hits**, and glass-ui's `styles/transitions.css` reduced-motion block is scoped to named `*-enter-active`/`*-leave-active` transition classes, none of which match here. The demo *does* honour reduced motion — but per-component, in the scenes (`SquareScene.css:136`, `SpringTarget.vue:462`, `SequenceTarget.css:238`, …) — which makes the omission a local lapse against a house idiom the DS also encodes.

**Falsifier.** Point to any rule matched by `.header-items-wrapper` under `prefers-reduced-motion: reduce`, or show `--duration-slow` is tempo-scaled (`tokens/scheme-motion.css` defines it as a flat `0.45s`, not a `calc(… * var(--motion-tempo))` — unlike the `--spring-*-duration` family).

---

## C-4 · **MAJOR** — the default `items` slot instantiates `SharePopover` with no `onSceneRestore`; the restore silently no-ops **and toasts success** (and the *live* twin has the same defect)

**Claim.** `:23` `<SharePopover />` — no `:on-scene-restore`. `SharePopover.vue:56-58` declares it optional, so `useShareState(undefined)`; `useShareState.ts:79-86` then reads

```ts
if (result.activeScene && onSceneRestore) { onSceneRestore(result.activeScene); }
toast.success("State restored!", { … description: "Animation state loaded from shared URL." });
```

The scene switch is skipped; the toast fires unconditionally. A user pasting a share URL for a *different* scene stays on the current one and is told it worked.

**Provenance that this is LIVE, not only latent.** `EditorShell.vue:19-20` has the identical unwired default inside `#header-right`, and `App.vue` **never overrides it** — `grep -n "header-left\|header-right\|#header" demo/app/App.vue` → no hits; its slot list is `#backdrop, #start-screen, #tabs-trigger, #tabs-content, #ribbon-content, #target`. Meanwhile the *other* mount is wired: `App.vue:23` `:on-scene-restore="runSceneSwitch"` → `MbabbMenu.vue:9` `<SharePopover :on-scene-restore="onSceneRestore" />`. The app ships two `SharePopover`s, one correct (dock menu) and one broken (header ribbon).

**Why this is a consumption finding.** The seam is a slot *default* that silently drops a required-in-practice prop; every host that accepts the default inherits a broken feature with a success toast. The shadow replicates the defect verbatim, which is further evidence the two files were copy-forked rather than one consuming the other.

**Falsifier.** Show `restoreStateFromParam` performs the route switch itself (it does not — `hashSharing.ts:51-69` only *returns* `activeScene`, and `useShareState.ts:78-81` is its sole consumer), or show `App.vue` supplies `#header-right`.

---

## C-5 · **MAJOR** — `SharePopover` reads its function prop non-reactively (one-shot capture at setup)

**Claim.** `SharePopover.vue:60-61`

```ts
const { … } = useShareState(props.onSceneRestore);
```

reads `props.onSceneRestore` **once, during setup**, and hands the value to a composable that closes over it. A parent that later swaps the handler (a different scene router, a lazily-bound callback, HMR) keeps calling the stale one — or `undefined` forever if the first render had none.

**Provenance.** `useShareState.ts:12` takes `onSceneRestore?: (sceneId:string)=>void` **by value** and captures it in the closure at `:79`. Nothing re-reads it. Contrast the same repo's correct idiom in `MbabbMenu.vue:75-92`, which declares the prop non-optional and never destructures it out of reactivity.

**Falsifier.** Show `onSceneRestore` is guaranteed referentially stable for the lifetime of every mount. `MbabbMenu`'s is (`App.vue:23` `runSceneSwitch`), so the *live* impact today is nil — this is a contract defect (the prop advertises the reactivity `defineProps` implies, and the component silently drops it), not a live crash. Demonstrating that no host can ever rebind it kills the claim.

---

## C-6 · **MINOR** — physical-property collapse: RTL-broken where the primitive is RTL-correct

**Claim.** `:3` pins with `left-0 right-0`; `:92-97` and `:102-103` animate `max-width` and `margin-right`. The cluster is a right-anchored ribbon; under `dir="rtl"` the margin lands on the wrong side of the anchor and the collapse pulls the wrong way.

**Provenance.** `components/header-ribbon/styles.css` uses logical properties throughout — `max-inline-size`, `margin-inline-start`/`-end` keyed off `[data-placement]`, `inset-inline-start`/`-end`, and even a directional `translate: ±0.375rem 0` per placement. The shadow has no placement concept at all.

**Falsifier.** Show the demo declares itself LTR-only in a way that makes logical properties moot (`demo/app/index.html` sets `lang` but I found no `dir` lock, and the rest of the demo inherits glass-ui's logical properties). An explicit LTR-only ruling downgrades this to INFO.

---

## C-7 · **MINOR** — the props/emits/expose contract is empty; the `pinned` slot prop is write-only from the host's view

**Claim.** No `defineProps`, no `defineEmits`, no `defineExpose` (`:42-85`). `isExpanded`/`isPinned` are private refs. The `anchor` slot advertises `:pinned` (`:36`) but a host cannot **set** it, cannot **observe** it outside that one slot, cannot pin programmatically, cannot label the region, cannot choose a side, and gets no `data-*` hooks to style against. For a component whose entire purpose is a two-state disclosure, unobservable and uncontrollable state is a contract defect, not a style preference — the demo even has a shortcut registry (`EditorShell.vue:122`, `@mkbabb/glass-ui/keyboard`) that could drive it and cannot.

**Provenance of what a first-class contract looks like, same concern, same version.** `header-ribbon.js` props `{ placement: {default:"left"}, ariaLabel: {default:"Header actions"}, class }` (typed at `header-ribbon/types.d.ts:3-10`) and emits state to CSS as `data-placement` / `data-expanded` / `data-pinned` / `data-slot="header-ribbon"` — a styling contract the shadow replaces with two private class names. `EditorShell.vue:187,197` even shows the host-side idiom the shadow forecloses (`useTemplateRef<InstanceType<typeof HeaderRibbon>>`).

**Falsifier.** Show a host that needs none of these (vacuously true today — there is no host, per C-1). The claim is about the contract's fitness for the barrel export it advertises at `shell/index.ts:2`; deleting the export moots it.

---

## C-8 · **MINOR** — z-rung violation against the demo's own written z-contract

**Claim.** `:3` `z-dock`. `demo/styles/style.css:31-32` states the contract: `--z-bar : 30  the editor bars (header / menubar chrome)` / `--z-dock : 40  the bottom dock band`. A header on the dock rung is exactly the drift the contract block exists to prevent ("Use the SEMANTIC z-* utility for the rung", `style.css:36-38`). It is also the rung the *real* dock bands occupy — `ChromeDock.vue:215`, `TransportDock.vue:7`, `AnimationControlsGroup.vue:82` — so header-vs-dock paint order would fall to DOM order rather than to the contract.

**Provenance of the correct rung.** glass-ui declares `--z-header: 35` (`dist/styles/tokens/scheme-motion.css`), bridges it to a Tailwind utility (`theme/bridges.css`: `--z-index-header: var(--z-header)` → `z-header`), and `HeaderRibbon` uses it (`components/header-ribbon/styles.css` → `z-index: var(--z-header)`). The demo's contract block enumerates 7 of glass's 17 rungs and does not list `--z-header` at all, so the shadow had no *documented* local rung between bar and dock and reached one too high; `grep -rn "z-header" demo` → zero uses repo-wide, while `z-bar` has a live consumer (`AnimationVisualizer.vue:21`).

**Verified NOT a defect (falsifier already run, twice).** I first suspected `z-dock` generates no CSS, since glass-ui declares `--z-*` on `:root` and ships no `@theme` block in its style sheets. The shipped bundle disproves it: `dist/gh-pages/assets/index-CL_QYCiO.css` contains `.z-dock{z-index:var(--z-dock)}` (re-verified this pass). That sub-claim is withdrawn; only the semantic-rung claim stands.

**Falsifier.** Show the header must paint over the bottom dock band (it is `top-0`, the dock is bottom — they do not overlap in practice), or that `--z-bar`/`--z-header` are deprecated.

---

## C-9 · **MINOR** — stale token-provenance comment, and the token it names is now an orphan that still ships

**Claim.** `:89-91` says the cap "reads the named layout token (**design-idioms.css** `--header-items-max-w`, same 500px value)". The token is declared in **`demo/styles/layout.css:15`**, not `design-idioms.css` — `grep -rn "header-items-max-w" demo/styles/` returns exactly one declaration, in `layout.css`. The misdirection matters because `style.css:11-13` assigns the two files different jobs (design-idioms = the authoritative `--rainbow-*`/`--color-gold`/keyframes copy; layout = work-area/dock/rail **geometry** tokens), which the comment inverts for a geometry token.

Compounding: because the only consumer is dead (C-1), `layout.css:15`'s self-describing comment ("the EditorHeader expanded items-wrapper cap") documents a component that is not in the build, and `--header-items-max-w:500px` **ships to every user as a dead custom property** (verified in `dist/gh-pages/assets/index-CL_QYCiO.css`). The deletion in C-1 must take `layout.css:15` with it.

**Falsifier.** Find a `--header-items-max-w` declaration in `design-idioms.css`, or a second consumer of the token.

---

## C-19 · **MINOR** — the forked width token duplicates a DS-parameterized one and loses its viewport clamp

**Claim.** `:92` caps the expanded wrapper at `var(--header-items-max-w)` = a raw `500px` (`layout.css:15`). The primitive parameterizes the same dimension as `--header-ribbon-actions-width` with a `30rem` default on `.header-ribbon__actions`, and clamps the *band* at `min(32rem, calc(100vw - 2rem))` with a `@media (pointer: coarse)` arm at `calc(100vw - 1.5rem)` (`components/header-ribbon/styles.css`). So the demo owns a bespoke raw-pixel token for a cap the DS already exposes in `rem`, and the DS's version is viewport-clamped and coarse-pointer-aware while the fork's is neither.

**Scope discipline.** This is the *token duplication* claim only; the missing coarse-pointer media arm is filed once, at C-3, and the orphan-token/comment claim once, at C-9. I do **not** claim an overflow at narrow viewports: the wrapper is a shrinkable flex item whose content is two small controls, so the 500 px cap is not reached in the current composition.

**Falsifier.** Find a second consumer of `--header-items-max-w`, or show `--header-ribbon-actions-width` is not consumer-settable (it is a `var(…, 30rem)` fallback read, i.e. designed to be overridden).

---

## C-10 · **MINOR** — the template's `overflow-hidden` utility is dead against the component's own scoped rule

**Claim.** `:18` puts `overflow-hidden` in the wrapper's class list; `:99` sets `overflow: visible` on the same element via `.header-items-wrapper`. Vue scoped styles are emitted **unlayered**, and unlayered author styles outrank every `@layer` at the same origin — so the scoped `visible` wins and the utility never applies. The collapsed clip is delivered by `.header-collapsed { overflow: hidden }` (`:106`) instead. One of the two spellings is noise, and a reader cannot tell which without knowing the layer rule.

**Provenance.** The build emits layered utilities — `dist/gh-pages/assets/index-CL_QYCiO.css` carries `@layer base, components, demo, properties, theme, utilities`. The primitive avoids the ambiguity entirely with a single `overflow: clip` on `.header-ribbon__actions`.

**Falsifier.** Show Vue SFC scoped styles are emitted inside `@layer utilities` (they are not; `vite.config.ts` declares no CSS-layer injection for SFC styles), or show `overflow-hidden` is emitted unlayered *after* the scoped block.

---

## C-11 · **MINOR** — `DarkModeToggle` is sized and hovered against the design system, not through it

**Claim.** `:24-27`

```html
<DarkModeToggle title="Toggle dark mode" class="aspect-square w-8 scale-on-hover hover:opacity-50" />
```

Three consumption problems, in ascending order of provability:

1. **Sizing bypasses the first-class axis, and defeats its own `aspect-square`.** glass-ui 7.0.0 ships `size?: "sm"|"md"|"lg"|"control"|"dock"` (`DarkModeToggle.vue.d.ts:1-6`) which drives `--dark-mode-toggle-size` **and** the matching `--dark-mode-toggle-padding` (glyph inset) — `dark-mode-toggle.css` sets `width` *and* `height` from that one variable. The consumer sizes with utilities instead. Cascade order: `style.css:1` is `@import "tailwindcss"` (v4 → utilities in `@layer utilities`) while glass-ui's component CSS is wrapped in `@layer components`, and the shipped bundle confirms the order (`@layer base, components, demo, properties, theme, utilities`). So `w-8` (2 rem = 32 px) **wins** on width while `height` stays at the untouched default `--dark-mode-toggle-size: 2.25rem` (36 px). Both dimensions being definite, `aspect-square`'s `aspect-ratio: 1/1` is **inert**. Net: a **32 × 36 px** control carrying padding computed for a 36 px box — off-centre glyph, and the declared square intent silently defeated. The correct consumption is `size="sm"` (28 px) or `size="control"` (inherits `--control-size`), which keeps size and padding coherent.
2. **The hover treatment inverts the DS's own semantic.** `dark-mode-toggle.css` rests the control at `opacity: .8` and **raises it to 1 on hover** — pointer arrives, control becomes fully present. The utility-layer `hover:opacity-50` overrides that to **dim on hover**, the opposite affordance, on the same element, against the system that defines it. Decisive corroboration: the live twin at **`EditorShell.vue:44-46`** spells the *same* component `class="aspect-square w-8 scale-on-hover"` — **no opacity hover**. The migration corrected this seam and left the fork carrying the defect, which is exactly the harm two-sources-of-truth causes. (`EditorShell` still carries problem 1.)
3. **`title` shadows a state-aware accessible name.** It flows through `useAttrs()`'s rest spread harmlessly (`dark-mode-toggle.js` strips only `class` and `type`), but the component already computes `aria-label` = `"Switch to light mode"` / `"Switch to dark mode"` plus `aria-pressed`. The static tooltip therefore says one thing while the accessible name says another — a visible-label/accessible-name divergence (WCAG 2.5.3 smell) that also means voice-control users cannot say what they read. Inherited by `EditorShell.vue:43` too.

**Falsifier.** For (1): show the demo emits Vue/Tailwind utilities *before* glass-ui's `@layer components` — then width stays 2.25 rem, the button is square but the wrong size, and the sizing-bypass finding survives with different numbers; or show `--dark-mode-toggle-size` is redefined on an ancestor (the one real case is `.glass-dock .dark-mode-toggle-button:not([data-size=…])` re-pointing at `--dock-control-size`; this root is not a `.glass-dock`). For (2): show `EditorShell.vue:46` also carries `hover:opacity-50`. For (3): show `title` wins the accessible-name computation over `aria-label` (it does not).

---

## C-12 · **MINOR** — the 2 000 ms hover-out grace is an untokenized literal, and it is the shadow's *only* genuine capability

**Claim.** `:60` hardcodes `2000`. glass-ui exposes a full duration scale (`--duration-instant … --duration-xxl`, `tokens/scheme-motion.css`) and this very file reads it for CSS (`:96-98`), so the literal is an internal inconsistency. More pointedly, `HeaderRibbon` collapses **immediately** on `pointerleave` (`E(){ S.value = false }`) and relies on focus-within + Esc for the keyboard path — so the timer is not merely untokenized, it encodes a *different UX* the design system does not have.

That makes this the single strongest candidate answer to C-1's falsifier (b). The correct disposition is to push it **upstream** as a `collapseDelay` prop (or a dwell token) — not to keep 108 forked lines alive to hold one number.

**Falsifier.** Produce a design ruling that the demo header wants a dwell delay the primitive lacks; that converts this from drift into a legitimate `HeaderRibbon` feature request (and a glass-ui BH relay, per the standing law). Alternatively, name a glass-ui dwell/delay token this file should have read — I searched the token sheets and found only duration/spring/settle families, no dwell register.

---

## C-13 · **MINOR** — F-1 confirmed live: `:46` imports a phantom dependency

**Claim.** `:46` `import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";` while `package.json` declares **no** `@mkbabb/glass-ui` anywhere: `dependencies` is exactly `{"@mkbabb/value.js": "4.0.0"}`; `devDependencies` (42 entries) has no glass-ui; `peerDependencies` and `optionalDependencies` are empty. `grep -n "glass-ui" package.json package-lock.json` → **no output**. 7.0.0 nonetheless sits in `node_modules` (`node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"`).

**Fold, not re-invent.** This is `lane-frontend.md:15` / `:54-66` **F-1** (RED), verified unchanged against the tree on this pass. Every glass-ui edge in the file inherits it. `lane-frontend.md:612` is right that F-1 must land before any replacement wave; note that for *this* component the replacement is a deletion, which is F-1-independent.

**Falsifier.** Any `@mkbabb/glass-ui` entry in `package.json` or `package-lock.json`.

---

## C-18 · **MINOR** — F-1 extension: two glass-ui peers are unmet, and the rest are satisfied only out of `devDependencies`

**Claim.** glass-ui 7.0.0's `peerDependencies` are `{@lucide/vue, @mkbabb/keyframes.js, @mkbabb/pencil-boil ^0.9.2, @mkbabb/value.js, @vueuse/core, embla-carousel-vue ^8.0, reka-ui, tailwindcss, tw-animate-css, vue}`. **`@mkbabb/pencil-boil` and `embla-carousel-vue` are not installed** — `node_modules/@mkbabb/` holds only `glass-ui`, `parse-that`, `value.js`, and a depth-3 search finds no `embla-carousel-vue`. The remaining peers are satisfied only out of keyframes.js's **devDependencies**, and `@mkbabb/keyframes.js` is satisfied by nothing at all except a Vite alias (C-14). The whole discrepancy is absorbed silently by `.npmrc` `legacy-peer-deps=true` (F-1's own note).

**Why it belongs on this file's axis.** `:46` is one of the 42 files whose design-system resolution rests on this arrangement. A wave that lands F-1 (declare + lock glass-ui) must simultaneously rule on the two unmet peers: dead subpaths (`/carousel`, whatever consumes pencil-boil) or a latent runtime hole. Deciding F-1 alone leaves the graph half-declared.

**Falsifier.** Find either package anywhere under `node_modules`, or show every glass-ui subpath the demo imports is provably free of those peers — which would justify the omission but not the missing declaration.

---

## C-14 · **MINOR** — `:46` is a concrete instance of the demo → glass-ui → keyframes.js cycle, standing only on a Vite alias

**Claim.** `DarkModeToggle`'s import closure reaches back into keyframes.js itself. Measured closure of `dist/dark-mode-toggle.js` (9 chunks): externals = `{@mkbabb/keyframes.js, @vueuse/core, vue}`. The edge is `dark-mode-toggle.js` → `useLiquidPress-D0PFjKuk.js` → `useSpring-BCHxLjwv.js` → `import { SpringProgress as c } from "@mkbabb/keyframes.js"`.

Nothing resolves that bare specifier from `node_modules` (keyframes.js does not install itself). It works **only** because `vite.config.ts:37-43` self-aliases `"@mkbabb/keyframes.js" → src/animation/index.ts`, whose own comment (`:28-36`) explains the graft. Consequence for consumption: this file is portable only inside this Vite config. Lift it into any other build (a Storybook, a docs site, an extracted package) and glass-ui's `SpringProgress` import dangles or duplicates the engine.

**Fold.** `lane-frontend.md:569` names the cycle ("glass-ui depends on keyframes.js (peer), and keyframes.js's demo depends on glass-ui — a deliberate cycle held together by an alias"). This is the file-and-line instance.

**Falsifier.** Show `@mkbabb/keyframes.js` resolves without the alias (it does not — `vite.config.ts:31-33` states rolldown would stub it as an empty optional peer), or that `SpringProgress` is not exported from the alias target (`src/animation/index.ts` exports it — the alias is sound).

---

## C-15 · **INFO** — root-barrel vs granular subpath in the default slot's dependency (a repo-wide idiom, not an `EditorHeader` defect)

**Measurement.** `SharePopover.vue:47-52` imports `Popover`, `PopoverTrigger`, `PopoverContent`, `Button` from the **root** `@mkbabb/glass-ui`, though 7.0.0 publishes `./popover` and `./button` among its 73 export entries. Static ESM closure of the installed dist:

| entry | chunks | bytes |
|---|---|---|
| `@mkbabb/glass-ui` (root barrel) | 62 | 219 898 |
| `./popover` + `./button` + `./forms` | 20 | 40 561 |

**Why this is INFO and not a defect.** The demo's specifier census (`grep -rho 'from "@mkbabb/glass-ui[^"]*"' demo | sort | uniq -c`) is **31 root-barrel** vs 38 granular across 19 subpaths — the root barrel is the *majority* idiom, and `EditorShell.vue:124` does the same for `Button`. Attributing it to `EditorHeader` would be a false defect. Additionally, rolldown tree-shakes ESM, so the static closure is an upper bound, not a shipped-bytes measurement.

**Falsifier (which must be run before anyone acts on this).** Build `gh-pages` with `SharePopover` on `./popover` + `./button` and diff `dist/gh-pages/assets/*.js` bytes. A null delta kills the size half outright and leaves only an idiom-consistency observation.

---

# SUPERLATIVES (L-18 both ways)

## S-A · The R1 parser-crash class is **NOT** reachable from this component — measured, not assumed

The whole import closure of `EditorHeader` is value.js-free.

- `dist/dark-mode-toggle.js` closure (9 chunks): externals `{@mkbabb/keyframes.js, @vueuse/core, vue}` — no `@mkbabb/value.js`.
- `dist/header-ribbon.js` closure (6 chunks): externals `{reka-ui, vue}`.
- `dist/glass-ui.js` **root barrel** closure (62 chunks, the heaviest thing `SharePopover` pulls): externals `{@lucide/vue, @mkbabb/keyframes.js, reka-ui, vue}` — **still no value.js**.
- `dist/forms.js` closure (6 chunks): `{@lucide/vue, @vueuse/core, reka-ui, vue}`.
- The keyframes.js edge lands on `src/animation/index.ts`, whose own header (`:2-25`) documents it as the **LIGHT** side of the value.js static/dynamic boundary — `SpringProgress` shares only value.js's rootless `/math` leaf; every parser-bearing surface is reached exclusively through `loadAnimationEngine()`'s dynamic import. `lane-library.md:80` independently certifies the same barrel as value.js-free.
- The untrusted-input path is gated too: `SharePopover` → `useShareState.ts:47-81` → `restoreStateFromParam`, which refuses on `isValidState` (`hashSharing.ts:56-57`); the only value.js reference on that path is an erased `import type { JumpPosition }` (`animationOptionsStore.ts:2`) — **no runtime parse edge**.

glass-ui *does* reach value.js — but only through `dock.js`, `color.js`, `aurora.js`, `easing.js`, `accent-tone-solve-*.js`, `useAnimatedNumber-*.js`, `useDragMorph-*.js` and the `value-DMhh2R94.js` chunk, none of which are in this component's closure. So `parseCssColor("oklch()")` — the R1 shipping-crash class, whose live surface `lane-library.md:243` places at `demo/scenes/square/useSquareTumble.ts:22` — **cannot fire through `EditorHeader`.** I make no R1 claim for this component.

**Falsifier.** Name a chunk in the four closures above that imports `@mkbabb/value.js`, or a static (non-`import type`) value.js edge on `src/animation/index.ts`. I enumerated both exhaustively and found none.

## S-B · The `useTimeoutFn` migration comment makes a load-bearing claim that the vendored source actually confirms

`:53-55` asserts "vueuse owns the handle + auto-cleanup on unmount (`tryOnScopeDispose`) … `immediate: false` so it only runs when started." Verified in the installed source: `node_modules/@vueuse/shared/dist/index.js:1694` `function useTimeoutFn(cb, interval, options = {})` — the body ends `tryOnScopeDispose(stop);` and gates the eager path on `if (immediate) { … }`. Both halves of the comment are true, and `{ immediate: false }` is genuinely *required* (the default is `true`, which would fire the collapse 2 s after mount). Every state transition (`:64-84`) correctly pairs a `clearHoverTimeout()` with each expand and a `startHideTimeout()` with each release; the pin branch is symmetric and complete, with no path that leaves a timer running. This is the rare audit-trail comment that survives its own falsifier — and a correct discharge of `docs/tranches/D/audit/frontend-findings.md:27` F8.

## S-C · STY-5 was discharged honestly, not cosmetically — and the motion tokens all resolve

`docs/tranches/J/audit/styling-design-system.md:42` flagged `max-width: 500px` as an off-contract magic number. The cure at `:92` reads a real declared token (`layout.css:15`), same value, with the collapse animating to/from it — not a rename-in-place. Beyond that, all four motion customs at `:96-98` resolve for real in the installed DS (`tokens/scheme-motion.css`: `--duration-slow: .45s`, `--duration-normal: .3s`; `tokens/scheme-spring.css`: `--motion-ease-standard`, `--ease-decelerate: var(--ease-out)`), so none silently falls back — compare `demo/styles/playback-idiom.css:33-36`, which hedges every one with a `var(--duration-fast, 150ms)` literal. The file's *only* magic number is the JS `2000` (C-12). The provenance pointer is wrong (C-9) but the substance is right.

## S-D · The pointer-events discipline is exactly the primitive's, arrived at independently

`:3` `pointer-events-none` on the full-width fixed bar, re-armed to `pointer-events-auto` on precisely the two live clusters (`:7`, `:12`). That is the same two-tier model glass-ui ships (`.header-ribbon { pointer-events: none }` + `.header-ribbon__band { pointer-events: auto }`), and it is the correct answer to the occlusion class the V audit tracks (`docs/tranches/V/audit/R2-01-visual-design.md:16` "no occlusion at either viewport"). Whoever wrote the shadow understood the problem; they simply solved it a second time.

## S-E · The `left` slot topology is *better* than the primitive's — and the migration lost it

`:6-9` places a `left` slot **outside** the collapsible wrapper: `pointer-events-auto`, `shrink-0`, always visible — the correct home for the mobile sidebar toggle its comment names. `HeaderRibbon` has **no** leading slot (`HeaderRibbon.vue.d.ts:3-9`: `anchor` + `items` only) and is `width: max-content` pinned to one inline edge, so it structurally cannot host one. When the migration landed, `#header-left` was folded **inside** `#items` (`EditorShell.vue:18`) — i.e. into the region that collapses and (upstream) goes `inert`, which is the wrong place for a persistent navigation affordance. On this one axis the dead fork holds the better contract, and the live tree regressed.

**Tempered, honestly:** no consumer supplies `#header-left` today (`grep -rn "header-left"` → only the definition at `EditorShell.vue:18`), so nothing regressed *in practice*, and the finding is a design question for the consume slice rather than a live defect. **Falsifier for the superlative:** a `HeaderRibbon` slot or prop providing a persistent leading region (the 7.0.0 type surface has none), or evidence the sidebar toggle was deliberately made collapsible.

---

# DISPOSITION

The consumption story here is **one recommendation, not eighteen**: `EditorHeader.vue`, `shell/index.ts:2`, and `demo/styles/layout.css:15`'s `--header-items-max-w` should be deleted. That single act discharges C-1, C-16, C-2, C-17, C-3, C-6, C-7, C-8, C-9, C-19, C-10, C-11, C-12 and one edge each of C-13 and C-14 — **fifteen of eighteen** — and it is already the standing U.B5 ruling (`U.B.md:389`) that never executed.

Findings that **survive the deletion** and must be routed independently, because they live in the *live* tree:

- **C-4** (MAJOR) — the unwired `<SharePopover />` default at **`EditorShell.vue:20`**, shipping today with a false success toast. Fix at the seam (`useShareState.ts:79-86`: do not toast success when a scene switch was requested and dropped), not just at the call site.
- **C-5** (MAJOR) — `SharePopover.vue:60-61`'s one-shot prop capture.
- **C-11** (MINOR) — the `DarkModeToggle` sizing bypass and the `title`/`aria-label` divergence both persist at `EditorShell.vue:43-46` (the hover inversion does not).
- **C-13 / C-18** (MINOR) — F-1 and its two unmet peers, repo-wide.
- **C-8 / S-E** — two design questions for the consume slice: `--z-header` is unused demo-wide though glass ships and bridges it, and `#header-left` currently nests inside the collapsible `#items`.

**§0 must be settled first.** The Glass-7 premise on record (anchor slot + collapsible machinery "removed") is contradicted by the installed dist. Under the record, this file is irreplaceable; under the tree, it is deletable. Re-read XR-4 / IN-GLASS-1 / `DISPOSITIONS.md:21` before scoping.

**Census amendment requested.** Add **S-9** to `lane-frontend.md`'s shadow census (`:264-397`) and correct the roster row at `:194` (it is not a live "header bar" row); the summary table at `:395-397` gains a fourth class — **"Replace by deletion (already ruled, unexecuted)" — 108 lines**. Note for the census's own credibility that both halves of S-9 were already in the lane: `:194` rostered the file and `:96` scored `/header-ribbon`; only the join was missing.

**Not claimed / left to SS-13 (UNPROVEN-NEEDS-LIVE).** Nothing here rests on a rendered frame; the component does not render. Two *symptoms* would need a live surface if it were ever adopted: C-16's zero-hit-box (the code reading is proven; the pixel box is not) and C-17's stuck-open-on-touch (the absent guard is proven; the browser's synthesized-event behaviour is not). Both are noted for completeness — adopting the component is the wrong move.
