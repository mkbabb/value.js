claude-opus-5[1m]

# CHALLENGE — `Tooltip` · axis C (CONSUMPTION)

**Subject** `fourier-analysis/web/src/components/ui/tooltip/Tooltip.vue` (38 lines) + barrel `index.ts` (1 line)
**Date** 2026-08-07 · **Method** static + source-derived only (no browser tooling; livable-only claims marked `UNPROVEN-NEEDS-LIVE`)
**Posture** assumed DEFECTIVE until the tree proved otherwise; every claim carries its falsifier, and four falsifiers **killed my own drafts** (§4).

**Tally — defects 11 · blockers 0 · superlatives 4**

## §0 — What this component actually consumes

Read whole, plus every file it imports, transitively to the primitive:

| Dependency | Surface consumed by `Tooltip.vue` | Provenance |
|---|---|---|
| **glass-ui `^4.0.0`** | subpath `@mkbabb/glass-ui/tooltip` → `Tooltip`, `TooltipTrigger`, `TooltipContent` (3 of the 4 exported members; `TooltipProvider` is consumed by `App.vue` instead) | `Tooltip.vue:13-17`; export map `node_modules/@mkbabb/glass-ui/package.json` `"./tooltip"`; `dist/tooltip.js:1-2` |
| **value.js `0.13`** | **NONE** | §3 C-10 |
| **keyframes.js `4.3`** | **NONE** | §3 C-10 |
| **fourier API (45 ops)** | **NONE** | §3 C-10 |
| **reka-ui `^2.9.10`** | transitively: `TooltipRoot` → `PopperRoot`, `TooltipTrigger` → `Primitive`/`Slot`, `TooltipContent` → `TooltipPortal`/`Teleport` | `dist/TooltipProvider-B3MkB_8P.js:1-6` |

Call-site denominator is **35 over 9 consumers** — I re-derived it and it matches intake row **R3-7a** exactly (`lane-fourier-r3-r6.md:79`). The census files this as the **F.W3** migration budget (`CENSUS-2026-08-03.md:361`). I do **not** contradict `lane-frontend.md:371`'s "thin API-shape adapters, not shadows … the correct posture — keep": the adapter *should* stay. What follows is the cost of its current *shape*, which that verdict did not measure.

---

## §1 — MAJOR findings

### C-1 · MAJOR · The shim's multi-root render shape makes `CoefficientsSpectrum`'s entire `coeff-list` transition register dead code

**Where** `components/shared/CoefficientsSpectrum.vue:79-84` (the `<TransitionGroup name="coeff-list">` wrapping `<Tooltip v-for>`), CSS at `:147-163`; root cause `Tooltip.vue:26-37`.

**Claim.** The shim renders **two root nodes** — the trigger and the portal — so its vnode `el` is a Fragment anchor **Text** node, not an `Element`. Vue's `TransitionGroupImpl` gates position recording on `child.el instanceof Element` (`@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1464`), so **no** `<Tooltip>` child ever enters `prevChildren`. `onUpdated` then short-circuits on `if (!prevChildren.length) return` (`:1421-1423`) and the `-move` FLIP never runs. Enter is dead by a second, independent path: `setTransitionHooks` (`@vue/runtime-core:1656-1665`) recurses through the component chain and lands `vnode.transition` on the **Fragment** produced by `PopperRoot`'s bare `renderSlot` — and only `mountElement` invokes `beforeEnter`/`enter`, never `processFragment`. So `.coeff-list-enter-from` / `-enter-active` / `-move` (`:153-163`) are all inert.

**Chain, verified link by link:** `Tooltip` → `GlassTooltip` → reka `TooltipRoot` → `PopperRoot`, and `PopperRoot` is `inheritAttrs: false` returning **only** `renderSlot(_ctx.$slots, "default")` (`reka-ui/dist/Popper/PopperRoot.js:8-16`) — a Fragment over `[TooltipTrigger, TooltipContent]`. `TooltipContent` unconditionally wraps in `TooltipPortal` → `Teleport` (`reka-ui/dist/Tooltip/TooltipPortal.js:29-34`), so the second root node exists in every state, open or closed.

**Why it is a consumption defect and not a call-site defect.** The file's own header records the intent: "the bespoke `:hover` CSS tooltip **lifts to the glass-ui `Tooltip` primitive** … discharging the L5 §5 A8 LOW a11y gap" (`CoefficientsSpectrum.vue:12-15`). `git show ca58321~1:…CoefficientsSpectrum.vue` → file did not exist; it was **born** at `ca58321` with the shim already inside the `TransitionGroup`. The a11y lift was paid for with a motion regression nobody measured, because the shim's render shape is invisible at the call site.

**Falsifier (survived).** *"Vue crashes instead — `getPosition(Text)` throws."* It does not: the `instanceof Element` guard at `:1464` predates the call and skips the child entirely. I drafted this as a BLOCKER and demoted it on that read. *"Maybe the transition still works via the dev-only fragment branch in `remove()` (`@vue/runtime-core:6738-6750`)."* That branch is `NODE_ENV !== "production"`-gated and touches **leave** only; enter and move are dead in both modes, which is sufficient. **To falsify:** make `<Tooltip>` single-root (or move it inside the row) and observe `.coeff-list-move` transitions appear on reorder.

**Severity rationale.** MAJOR not BLOCKER: silent, no crash, no data loss — but the list re-renders on every recompute and the designed motion is 100% absent.

### C-2 · MAJOR · The prop contract offers no per-instance escape hatch, and the app's disabled triggers need one

**Where** `Tooltip.vue:19-22` declares exactly `text?` and `side?`. Not exposed: `disabled`, `delayDuration`, `open`/`v-model:open`, `align`, `disableHoverableContent`, `class`, `ariaLabel`. Every tooltip in the app is therefore governed **solely** by `App.vue:23`'s `:delay-duration="400" :skip-delay-duration="200"`.

**Claim.** Four live triggers go `disabled`: `EditorControlsDock.vue:74` (Undo), `:79` (Redo), `:97` (Delete point), and `FunctionInput.vue:193` (`<Button :disabled="!effectiveN">`). `DockIconButton` declares **no** `disabled` prop (`glass-ui/dist/components/custom/dock/DockIconButton.vue.d.ts:15-24` — `compact`/`type`/`as`/`asChild`/`class` only), so `:disabled` falls through as a native attribute onto the `<button>` host. reka's `TooltipTrigger` binds `pointermove`/`focus`/`blur` directly to that same host (`reka-ui/dist/Tooltip/TooltipTrigger.js:32-43`, applied via `toHandlers` at `:95`) — there is no wrapper element to catch the pointer. Disabled form controls suppress pointer events and are not focusable, so the tooltip is unreachable by mouse *and* keyboard exactly in the disabled state.

The `FunctionInput` case is the substantive one: that tooltip is the **only** explanation of the auto-harmonics feature — "Auto (Parseval's theorem) … Sets N to the minimum harmonics capturing ≥99.99% of total energy ‖f‖²" (`FunctionInput.vue:196-210`) — and the button is disabled precisely when `!effectiveN`, i.e. before the user has computed anything and most needs the explanation. The shim gives the call site no way to wrap the trigger or to force `open`.

**Falsifier (partially open).** The **structural** half is source-proven: no wrapper element exists, handlers bind to the disabled host, no shim escape hatch. The **browser** half — that Chrome/Safari/Firefox suppress `pointermove` on `<button disabled>` — is `UNPROVEN-NEEDS-LIVE` (**SS-13**): hover a disabled Undo in the editor dock and confirm no tooltip. If some engine does dispatch `pointermove` to disabled buttons, C-2 collapses to the keyboard path only (still true — disabled buttons are not focusable, so `handleFocus` at `:39` is unreachable regardless).

### C-3 · MAJOR · Rich `#content` bodies degrade the screen-reader string to concatenated `textContent`, with no `ariaLabel` passthrough

**Where** `Tooltip.vue:35` (`<slot name="content">`), no `ariaLabel` in the props at `:19-22`, none forwarded at `:30-34`.

**Claim.** reka's `TooltipContentImpl` computes the assistive string as `props.ariaLabel || currentElement.value?.textContent` and renders it into a `VisuallyHidden` with `role="tooltip"` (`reka-ui/dist/Tooltip/TooltipContentImpl.js:87` and `:134-138`). glass-ui's `TooltipContent` does declare `ariaLabel` (`dist/TooltipProvider-B3MkB_8P.js` props block; `TooltipContent.vue.d.ts` → `TooltipContentProps`) — the shim simply never plumbs it. So the two rich-body call sites announce raw concatenations: `CoefficientsSpectrum.vue:104-119` yields the label/value grid run together (`n = 3` `Amplitude` `0.1234` `Phase` … `Re / Im` …) with no punctuation or pauses, and `FunctionInput.vue:196-210` yields the three prose paragraphs plus the `N<sub>eff</sub>` subscript flattened.

**The irony is load-bearing:** `CoefficientsSpectrum.vue:15` claims this lift "discharg[es] the L5 §5 A8 LOW a11y gap." For the `text=` call sites it does. For the two `#content` call sites it substitutes a different a11y defect.

**Falsifier (survived).** *"`ariaLabel` is optional, so reka's textContent fallback is the intended design."* It is the intended *fallback* — for simple text bodies. `:87`'s `||` exists precisely so rich bodies can override it, and the shim removes that ability from all 35 call sites. **To falsify:** show a `#content` call site whose flattened `textContent` reads correctly aloud, or an `ariaLabel` reaching `TooltipContent` by another route (`grep -rn "ariaLabel\|aria-label" src/components/ui/tooltip/` → 0 hits).

---

## §2 — MINOR findings

### C-4 · MINOR · Hardcoded `side-offset` / `collision-padding` bypass the glass-ui token authority

`Tooltip.vue:32-33` pins `:side-offset="6"` and `:collision-padding="8"`. glass-ui's `TooltipContent` ships `sideOffset: { default: 4 }` (`dist/components/ui/tooltip/TooltipContent.vue.d.ts`, the `{ sideOffset: number }` defaults slot; and the runtime `sideOffset: { default: 4 }` in `dist/TooltipProvider-B3MkB_8P.js`). The shim silently overrides the design system's spacing for all 35 call sites with two un-named magic numbers that cannot be re-themed and will not track a glass-ui token change. This is the standing `feedback_glass_ui_first_class` posture inverted: the offset belongs in glass-ui (or a token), not in a consumer literal. **Falsifier:** point to a `--tooltip-offset`-class token these numbers derive from — `grep -rn "side-offset\|sideOffset" src/` → this file only.

### C-5 · MINOR · `text` and `#content` are *both* optional — `<Tooltip>` with neither renders an empty bubble

`Tooltip.vue:19-22` + `:35`. Nothing in the type or the runtime requires a body; `<slot name="content">{{ text }}</slot>` with `text === undefined` renders the empty string inside a fully-styled glass panel. **Latent, not live:** all 35 call sites supply one or the other (`FunctionInput.vue:188` and `CoefficientsSpectrum.vue:80` are `side`-only but both carry `#content`). Reported because the contract permits it and TypeScript will not catch it. **Falsifier:** a discriminated-union prop type (`{text: string} | {}` with a required `#content`) would close it; none exists.

### C-6 · MINOR · No attribute-fallthrough target — anything passed to `<Tooltip>` is silently dropped

The shim does not set `inheritAttrs: false`, and its root resolves to the multi-root Fragment of C-1. Vue therefore cannot inherit fallthrough attrs and dev-warns "Extraneous non-props attributes … component renders fragment or text root nodes". A consumer writing `<Tooltip class="…">` or `@click="…"` gets a warning and a no-op. **Latent:** no live call site passes a non-prop attr (`:key` on the `v-for` sites is a reserved vnode prop, unaffected). **Falsifier:** add `class="x"` to any call site and inspect the DOM for the class — it will be absent.

### C-7 · MINOR · Misplaced `v-if` inside the trigger slot mounts a phantom, unanchored tooltip

`CoefficientsSpectrum.vue:124-126`: the `v-if="totalComponents > 12"` sits on the `<Button>` **inside** the slot rather than on the `<Tooltip>`. When false, the slot renders only a Comment placeholder; reka's `Slot` hits `firstNonCommentChildrenIndex === -1` and **returns the children with no merged props** (`reka-ui/dist/Primitive/Slot.js:12-13`) — the `aria-describedby`, `data-state` and all six pointer/focus handlers are discarded. The `TooltipRoot` + `PopperRoot` + `TooltipPortal`/`Teleport` subtree still mounts, anchored to nothing. The same file's neighbours use the correct idiom (`CanvasControlsDock.vue:70`, `:76`, `:86` all put `v-if` on the `<Tooltip>`), which is what makes this a defect rather than a style choice. No user-visible breakage — hence MINOR. **Falsifier:** move `v-if` to the `<Tooltip>` and observe identical rendering with one less mounted subtree.

### C-8 · MINOR · Multi-node trigger slots bind only the first non-comment child, silently

`Tooltip.vue:27-28` always passes `as-child`. reka's `Slot` takes `children[firstNonCommentChildrenIndex]`, clones it with the merged props, and — when `children.length !== 1` — **returns the remaining siblings untouched with no warning** (`Slot.js:14-23`). A bare-text slot (`<Tooltip text="x">hello</Tooltip>`) is worse: props merged onto a Text vnode do nothing, so `triggerElement` never resolves and the tooltip can never open. The shim's header block (`Tooltip.vue:2-12`) documents the `text`/`side`/`#content` API but never states the "exactly one element child" requirement it silently imposes. **Latent** — all 35 call sites pass a single element or component. **Falsifier:** the doc comment saying so; it does not.

---

## §3 — INFO findings

### C-9 · INFO · Import-path inconsistency splits the F.W3 migration budget

Eight consumers use the barrel (`import { Tooltip } from "@/components/ui/tooltip"` — e.g. `CoefficientsSpectrum.vue:21`, `FunctionInput.vue:9`, `AnimationControls.vue:7`, `BasisSelector.vue:6`, `CanvasControlsDock.vue:5`, `ContourSettings.vue:21`, `EditorControlsDock.vue:7`, `VisualizationView.vue:11`). One deep-imports the SFC: `PaperSidebar.vue:2` → `"@/components/ui/tooltip/Tooltip.vue"`. Intake **R3-7a** (`lane-fourier-r3-r6.md:79`) scopes F.W3 as "barrel `web/src/components/ui/tooltip/index.ts` → `@mkbabb/glass-ui/tooltip`" — that framing assumes a single choke point. It has two: a barrel swap leaves `PaperSidebar`'s 2 call sites on the old path. **Refinement of R3-7a, not a contradiction:** the 35/9 count is exact; the *choke-point* count is 2, not 1. **Falsifier:** `grep -rn "ui/tooltip" src/` → 9 import lines, one of which is the deep path.

### C-10 · INFO · Zero coupling to value.js, keyframes.js and the 45-operation API — the component sits outside three of this axis's four migration surfaces

`grep` over `Tooltip.vue` → no `@mkbabb/value.js`, no `@mkbabb/keyframes.js`, no api/store/fetch reference. The web app's entire value.js surface is five imports in three files plus `lib/easings.ts` (`easings.ts:9,10-16` — `timingFunctions` + five `easeInOut*`), and `ConvergencePlot.vue:5` / `useCurveTransition.ts:8` / `harmonics.ts:5`. The hand-rolled `lib/colors.ts` arms (`cssVarToHex`, `hslToHex`, the hsl/bare-triplet/rgb regex ladder at `:22-45`) are reached only via `App.vue:8,11`. keyframes.js is confined to `composables/useFourierMorph.ts:14`. The API client is `lib/api.ts` (36 client edges against 45 operations, per R3-7).

**Consequence for F.W2:** `Tooltip` carries **no** bare-specifier debt and **no** `colors.ts` arm, so it is a zero-cost row on the F.W2 ledger and should not be budgeted there. Its only cross-package surface is glass-ui — which is exactly what `lane-frontend.md:184` records ("thin wrapper over glass-ui `Tooltip*`"). **Falsifier:** any transitive value.js/keyframes reach — the import chain terminates at reka-ui + Vue, neither of which depends on either package.

### C-11 · INFO · `text` is silently ignored whenever `#content` is supplied

`Tooltip.vue:35` uses `text` as *slot fallback*. A call site passing both `:text` and `#content` loses `text` with no type error and no runtime signal. No live call site does both, but the props type advertises them as independent, optional siblings rather than alternatives. Folds together with C-5; both are cured by the same discriminated union.

---

## §4 — Falsifiers that killed my own drafts (L-18 runs both ways)

Recorded because each was a plausible high-severity finding that the tree refuted, and re-deriving them later would waste a lane:

1. **"glass-ui's mangled re-export is scrambled."** `dist/tooltip.js:1-2` reads `import { i as e, n as t, r as n, t as r }` then `export { e as Tooltip, n as TooltipContent, r as TooltipProvider, t as TooltipTrigger }` — which looks transposed. Resolving against the chunk's `export { v as i, b as n, y as r, x as t }` (`TooltipProvider-B3MkB_8P.js`, last line) where `v`=Tooltip, `b`=Trigger, `y`=Content, `x`=Provider: **all four bindings are correct.** NOT A DEFECT.
2. **"No `TooltipProvider` → reka's `injectTooltipProviderContext` throws."** `App.vue:23` mounts it at the app root wrapping `AppHeader` + `RouterView`. NOT A DEFECT. (Independently corroborated by `lane-frontend.md:41`.)
3. **"glass-ui's wrapper declares `open: { type: Boolean }` with no `default: void 0`, so Vue's boolean casting pins it to `false`, forwards it, and `passive: props.open === void 0` (`TooltipRoot.js:57-60`) turns every tooltip into a controlled-closed component that never opens."** Refuted by `useForwardProps` (`reka-ui/dist/shared/useForwardProps.js:14-32`): it forwards only the union of *declared defaults* (none — no glass-ui prop carries a `.default` key) and *keys the parent actually wrote in `vm.vnode.props`* (none — `Tooltip.vue:26` writes `<GlassTooltip>` bare). The forwarded object is `{}`. All of `TooltipRoot`'s `?? providerContext` merges (`:52-56`) therefore see `undefined` and resolve to the provider. **NOT A DEFECT — and see S-1, it is the opposite.**
4. **"Tailwind v4 ignores `node_modules`, so `z-tooltip` / `rounded-tooltip` / `glass-floating` / `popover-animate` / `slide-in-from-side` (the class string in `TooltipProvider-B3MkB_8P.js`) are never emitted and the tooltip paints unstyled."** Refuted: `src/style.css:3` imports `@mkbabb/glass-ui/styles` → `dist/styles/index.css`, whose tail carries `@source "../*.js"` — resolving in the shipped context to `dist/*.js`, the flat chunk directory that contains exactly this class string. glass-ui's own comment documents the prior `../components` bug and its cure. NOT A DEFECT.

## §5 — Superlatives (verified, not courtesy)

**S-1 · The zero-prop pass-through at `Tooltip.vue:26` is the correct and non-obvious choice.** Per falsifier #3, the *natural* shim — declaring `delayDuration`/`disabled`/`open` and forwarding them — would have injected Vue-cast `false`/`undefined` values that mask reka's provider merge, and in `open`'s case would pin every tooltip closed. Writing `<GlassTooltip>` bare is what lets `App.vue:23`'s `delay-duration="400"` / `skip-delay-duration="200"` genuinely govern all 35 call sites. *Falsifier: add any explicit boolean prop to `:26` and the provider merge at `TooltipRoot.js:52-56` starts losing.* (Note the tension with C-2: the same choice that makes the global path correct is what removes the per-instance path. The cure is opt-in forwarding — `v-bind` only the props the consumer actually passed — not blanket declaration.)

**S-2 · Correct subpath consumption, no deep-dist reach.** `Tooltip.vue:13-17` imports `@mkbabb/glass-ui/tooltip`, a real key in the export map and in `typesVersions["*"]`. No `@mkbabb/glass-ui/dist/...` path, no bare-specifier debt, no relative escape. Against the F.W2 framing this row is clean. *Falsifier: any `dist/` segment or unmapped subpath in the import — there is none.*

**S-3 · The one failure mode that kills most reka tooltip adoptions is absent.** The provider is mounted once, at the root, with tuned delays (`App.vue:23`) — not per-instance, not missing. Combined with the shim, the decomposition tax avoided is real: 35 call sites × 3 primitives + a provider each, collapsed to one tag. This is the substance behind `lane-frontend.md:371`'s "correct posture — keep", and I concur with that verdict.

**S-4 · `as-child` is the right trigger posture.** `Tooltip.vue:27` merges onto the consumer's own element instead of injecting a wrapper `<div>`, so the dock flex rows (`EditorControlsDock.vue:73-99`, `CanvasControlsDock.vue:70-96`) keep their gap/alignment and `DockIconButton`'s own `:disabled`/`:class` styling is untouched. A wrapper-based shim would have broken every dock layout in the app. *Falsifier: any call site needing a wrapper — none found across the 9 consumers.*

## §6 — Disposition

The adapter should be **kept** (upholding `lane-frontend.md:371`) and **repaired**, not migrated away. Ranked, cheapest-first:

1. **C-1** — make the shim single-root, or move the `<Tooltip>` inside the row at `CoefficientsSpectrum.vue:80-84`. Restores the `coeff-list` register at one call site with no API change. *(Carries to F.W3; interacts with the R3-7a budget.)*
2. **C-2 + C-3** — widen the contract by *conditional* forwarding (`ariaLabel`, `disabled`, `delayDuration`, `align`, `class`), preserving S-1 by binding only what the consumer passed. Then wrap the four disabled triggers.
3. **C-9** — normalize `PaperSidebar.vue:2` to the barrel **before** F.W3 executes, so the migration has one choke point instead of two.
4. **C-4** — lift `6`/`8` to glass-ui or a token.
5. **C-5/C-7/C-8/C-11** — contract hygiene: discriminated union for the body, `v-if` relocation, and a documented single-element-child requirement.

**Open for SS-13 (live):** the C-2 browser half — pointer-event suppression on `<button disabled>` under the app's actual engines.
