claude-opus-5[1m]

# CHALLENGE — `EqCoefficientsPanel` · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EqCoefficientsPanel.vue` (17 lines)
**Date** 2026-08-04 · **Method** static + source-derived only (no browser tooling; livable-only claims marked `UNPROVEN-NEEDS-LIVE`)
**Repo posture** `/Users/mkbabb/Programming/fourier-analysis` READ-ONLY evidence. Sole write = this file.

---

## §0 · The read closure

`EqCoefficientsPanel.vue` is 17 lines and imports exactly three things. Its *consumption* surface is almost entirely inherited, so the closure was read whole:

| Depth | File | LOC | Why it is in the closure |
|---|---|---|---|
| 0 | `web/src/components/equation/EqCoefficientsPanel.vue` | 17 | target |
| 1 | `web/src/components/ui/CollapsibleSection.vue` | 72 | `:2` — the chrome |
| 1 | `web/src/components/shared/CoefficientsSpectrum.vue` | 168 | `:3` — the body |
| 1 | `web/src/lib/types.ts` | 300+ | `:4` — `BasisComponent` |
| 2 | `web/src/components/ui/tooltip/Tooltip.vue` + `index.ts` | 36 + 1 | `CoefficientsSpectrum.vue:22` |
| 2 | `@mkbabb/glass-ui` **root barrel** | 4.0.0 | `CollapsibleSection.vue:2` |
| 2 | `@mkbabb/glass-ui/button`, `/animated-digit`, `/tooltip` | 4.0.0 | `CoefficientsSpectrum.vue:18-19`, `Tooltip.vue:14-18` |
| 2 | `lucide-vue-next` | 1.0.0 | `CollapsibleSection.vue:4`, `CoefficientsSpectrum.vue:20` |
| 3 (host) | `web/src/components/equation/EquationView.vue` | 520+ | sole caller (`:18`, `:213`) |
| 3 (API) | `web/src/lib/equation/types.ts` · `api.ts` · `api/routers/equations.py` · `src/fourier_analysis/symbolic/{integration,spline,identification,simplification}.py` | — | the 45-operation surface behind `components` |
| 3 (peer) | `web/package.json` · `web/package-lock.json` · `web/vite.config.ts` · `.github/workflows/ci.yml` | — | the declared consumption contract |

**Direct value.js consumption: ZERO. Direct keyframes.js consumption: ZERO.** Both arrive only transitively (glass-ui `AnimatedDigit` → `useAnimatedNumber` → `SmoothProgress` from `@mkbabb/keyframes.js`; value.js only as a glass-ui *peer*). This is itself the axis-C story: the panel is a pure glass-ui + fourier-API consumer, and every one of its consumption defects is a **seam** defect, not a math defect.

Hitherto corpus folded (not re-derived): `formation/fourier/lane-frontend.md:140` (panel = "Thin spectrum host", 17 LOC), `:180` (spectrum = SHADOW candidate §4), `:182` + `:368` (the 3 `components/ui/` thin adapters — verdict *keep*), `:293` (the barrel import, already inventoried as a raw line), `:443` (`CoefficientsPanel`/`EqCoefficientsPanel` → `./metric-stack` → `./metric`), `:619` (the 8 reduced-motion blocks); intake `lane-fourier-r3-r6.md` rows **R3-7a** (35 Tooltip callsites / `ui/tooltip` disposition → F.W3), **R3-10** (the `<component :is>` family at `CoefficientsSpectrum.vue:132`), **R6-8** (the operation↔client leaf-coupling contract lesson → F.W5). Contradictions with the corpus are marked explicitly in §4.

---

## §1 · Summary

**Defects 20** (1 BLOCKER · 5 MAJOR · 9 MINOR · 5 INFO) · **Superlatives 5**

The panel is 17 lines and delegates everything. That is the right shape. The defects are all in *what it delegates to and how it is declared*:

1. Its chrome edge (`CollapsibleSection.vue:2`) is one of only **7** root-barrel glass-ui imports in a tree with **89** subpath imports, and the root barrel statically imports `vaul-vue` — a **required, non-optional peer that is in neither `web/package.json` nor `web/package-lock.json`**, while CI runs `npm ci`. That is the BLOCKER, and the panel is on its critical path.
2. The B.W2.c glass-ui `Tooltip` lift (documented at `CoefficientsSpectrum.vue:12-17`) silently killed the A.W3.d list transitions (documented at `CoefficientsSpectrum.vue:159`). Two dated in-file claims in the same closure, mutually destructive.
3. Its sibling consumer of the *same shared body* (`visualization/CoefficientsPanel.vue`) consumes glass-ui's `ConfiguratorLayer`; this one consumes a local wrapper plus the `.cartoon-card` dead-class shim. Same panel, two design-system postures.

I opened this audit assuming the component defective. Six hypotheses were **falsified by the tree** and are recorded in §5 — they are not counted as defects.

---

## §2 · Defects

### BLOCKER

---

#### **C-1 · BLOCKER · The panel's chrome edge reaches a glass-ui barrel that statically imports an unlocked, non-optional peer (`vaul-vue`); `npm ci` cannot install it.**

**Provenance**
- `web/src/components/equation/EqCoefficientsPanel.vue:2` → `import CollapsibleSection from "@/components/ui/CollapsibleSection.vue"`
- `web/src/components/ui/CollapsibleSection.vue:2` → `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@mkbabb/glass-ui'` — the **root barrel**
- `web/node_modules/@mkbabb/glass-ui/package.json` → `"exports"` has **80 keys**, including `"./collapsible"`; `"main"` entry `"."` → `./dist/glass-ui.js`
- `web/node_modules/@mkbabb/glass-ui/dist/glass-ui.js:60` → `import { DrawerClose as hr, … DrawerTrigger as Cr } from "vaul-vue";` — a **static ESM import**, always resolved by Rollup/Vite whether or not `Drawer*` is referenced
- `web/node_modules/@mkbabb/glass-ui/package.json` → `peerDependencies["vaul-vue"] = "^0.4"`, and `peerDependenciesMeta` marks `@vueuse/core`, `embla-carousel-vue`, `@mkbabb/keyframes.js`, `@mkbabb/pencil-boil`, `@mkbabb/value.js`, `perfect-freehand`, `tw-animate-css` optional — **`vaul-vue` is NOT among them; it is required**
- `web/package.json` — `vaul-vue` appears in neither `dependencies` nor `devDependencies`
- `web/package-lock.json` — 195 package entries; `vaul-vue` **ABSENT FROM LOCK** (likewise `@lucide/vue`, `embla-carousel-vue`, `perfect-freehand`)
- `.github/workflows/ci.yml:90-98` — `working-directory: web` → `npm ci` → `npx vue-tsc -b --force` → `npm run build`; `.github/workflows/deploy-pages.yml:108` — same `npm ci`
- Contrast: `web/node_modules/@mkbabb/glass-ui/dist/collapsible.js` re-exports from `CollapsibleContent-C_s6fG7r.js`, whose *only* bare externals are `reka-ui`, `vue`, and (via `cn-DJXf4yaB.js`) `clsx`. **No `vaul-vue`, no `class-variance-authority`.**

**Failure scenario.** A clean CI checkout runs `npm ci` in `web/`. `npm ci` installs strictly the lockfile tree and deletes anything else, so `web/node_modules/vaul-vue` (present today at 0.4.1 from an out-of-band install — it is in the tree but not in the lock) does not exist. `vue-tsc -b` / `vite build` walks the module graph, reaches `@mkbabb/glass-ui` via `CollapsibleSection.vue:2`, resolves `dist/glass-ui.js`, and hits the static `from "vaul-vue"` at `:60` → `Failed to resolve import "vaul-vue"` → build fails. Every route that renders `EqCoefficientsPanel` is on that path.

**Falsifier.** `cd web && rm -rf node_modules && npm ci && npm run build`. If the build succeeds, this claim is dead. (I did not run it: it mutates the read-only evidence tree. The three-file static chain — required peer + absent from lock + static import + `npm ci` — is fully proven; only the end-to-end failure is `UNPROVEN-NEEDS-CI`.) A weaker falsifier that *does not* mutate the tree: `npm ls vaul-vue --prefix web` reporting it as `extraneous` corroborates lock-absence.

**Remediation is one line and is exact for this panel.** `CollapsibleSection.vue:2` → `from '@mkbabb/glass-ui/collapsible'`. The `./collapsible` subpath exists in the 4.0.0 export map, exports the identical three symbols, and pulls neither `vaul-vue` nor `cva`. That removes 1 of the 7 barrel edges. (The other 6 — `useMorphConfig.ts:9`, `UserSlugBar.vue:5`, `AdminUserList.vue:4`, `GalleryCard.vue:5`, `EquationResult.vue:4`, `router/index.ts:2` — are outside this component and belong to the same wave item.)

**Note for the lane.** `lane-frontend.md:293` already *inventoried* this import line, but as a raw census row with no disposition. This challenge upgrades it: the barrel edge is not stylistic, it is the load-bearing edge of an undeclared required peer.

---

### MAJOR

---

#### **C-2 · MAJOR · The glass-ui `Tooltip` lift made every `TransitionGroup` child a non-element (Fragment) root — the panel's list transitions are dead CSS and Vue dev-warns once per row.**

**Provenance**
- `web/src/components/shared/CoefficientsSpectrum.vue:84-86` — `<TransitionGroup name="coeff-list">` whose direct children are `<Tooltip v-for="(comp, i) in topComponents" :key="…" side="bottom">`
- `web/src/components/shared/CoefficientsSpectrum.vue:157-176` — the scoped `coeff-list-enter-active` / `-leave-active` / `-enter-from` / `-leave-to` / `-move` rules, annotated `A.W3.d — named properties + canonical tokens, no transition: all`
- `web/src/components/shared/CoefficientsSpectrum.vue:12-17` — the B.W2.c docblock announcing the lift to the glass-ui `Tooltip` primitive
- `web/src/components/ui/tooltip/Tooltip.vue:26-36` — the shim's template: `<GlassTooltip>` containing **two** children, `<TooltipTrigger as-child>` and `<TooltipContent …>`
- `web/node_modules/@mkbabb/glass-ui/dist/TooltipProvider-B3MkB_8P.js` — glass-ui `Tooltip` renders reka `TooltipRoot`
- `web/node_modules/reka-ui/dist/Tooltip/TooltipRoot.js` (render fn) — `createBlock(PopperRoot_default, null, { default: withCtx(() => [renderSlot(_ctx.$slots, "default", …)]) })`; `PopperRoot` is likewise renderless. The chain therefore terminates in a **Fragment of 2 nodes**, so the `Tooltip` component vnode's `.el` is a fragment anchor Text node, not an `Element`.
- `web/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js` — contains the string `renders non-element root node that cannot be animated` (1 occurrence)
- `web/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js` — the `TransitionGroup` position/FLIP machinery is guarded by `instanceof Element` (2 occurrences)

**Failure scenario.** The user expands *Coefficients* and recomputes with a different `n_harmonics`. `topComponents` changes; `TransitionGroup` runs. Every child fails the `instanceof Element` guard, so no `coeff-list-move` FLIP is recorded and no enter/leave class is ever applied to a DOM node — the 20 lines of A.W3.d transition CSS at `:157-176` are unreachable. In a dev build Vue additionally emits *"Component inside `<Transition>` renders non-element root node that cannot be animated"* — once per visible row, i.e. **12 warnings collapsed, up to 40 expanded**.

**Why it is a consumption defect, not a styling nit.** Two dated authorship claims inside the same 168-line file destroy each other: A.W3.d installed the transitions; B.W2.c replaced the transitioned element with a renderless provider. Nothing in the type system or the build caught it because reka's renderless roots are structurally invisible to TypeScript. This is precisely the class of breakage a component-level consumption audit exists to find.

**Falsifier.** Boot `/equation`, expand *Coefficients*, change `n_harmonics`, and observe (a) whether any DOM node ever carries `coeff-list-enter-active`, (b) whether the console carries the non-element-root warning. If the classes appear, the claim is dead. `UNPROVEN-NEEDS-LIVE` for the console half; the Fragment-root half is fully proven from reka-ui + glass-ui `dist` + the Vue runtime guard.

**Remediation shape (not prescriptive).** Wrap each row in a real element inside the `TransitionGroup` and put the `Tooltip` *inside* it, or move the tooltip to `TooltipTrigger as-child` on the existing `div.coeff-row` so the transitioned node is an element.

---

#### **C-3 · MAJOR · Both files in the panel's render closure import their icons from a package declared as a `devDependency`.**

**Provenance**
- `web/src/components/ui/CollapsibleSection.vue:4` — `import { ChevronRight } from 'lucide-vue-next'`
- `web/src/components/shared/CoefficientsSpectrum.vue:20` — `import { ChevronDown, ChevronUp } from "lucide-vue-next"`
- `web/package.json` — `lucide-vue-next: "^1.0.0"` is under **`devDependencies`**, alongside `reka-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` — all of which are reached at runtime through glass-ui's `dist` chunks (`CollapsibleContent-C_s6fG7r.js` → `reka-ui`; `cn-DJXf4yaB.js` → `clsx`; `glass-ui.js:59` → `class-variance-authority`)
- `web/package-lock.json` — all five carry `"dev": true`
- `web/vite.config.ts:52-56` — `manualChunks["vendor-ui"] = ["@mkbabb/glass-ui", "reka-ui", "lucide-vue-next"]`, i.e. the build *itself* treats two devDependencies as first-class shipped vendor code

**Failure scenario.** Any production-shaped install — `npm ci --omit=dev`, `NODE_ENV=production npm ci`, a multi-stage Dockerfile that prunes dev deps before building, or a downstream consumer reading `web/package.json` as the manifest of truth — yields a tree where `lucide-vue-next`, `reka-ui`, `clsx` and `cva` are absent, and the build fails on the very first icon import in this panel's closure. The current CI (`ci.yml:92`, plain `npm ci`) masks it because it installs dev deps.

**Falsifier.** `cd web && rm -rf node_modules && npm ci --omit=dev && npm run build`. Success kills the claim. (Not run — mutates the evidence tree.) Statically the classification is unambiguous from `package.json` + the two import lines.

**Note.** This is separable from C-1: C-1 is *undeclared and unlocked*; C-3 is *declared in the wrong section*. Both land on the same panel.

---

#### **C-4 · MAJOR · The panel's design-system dependency declares a value.js peer range (`^0.10.0 || ^0.11.0`) that the repo's pinned `^0.13.0` violates; the lockfile encodes a tree that cannot be regenerated.**

**Provenance**
- `web/node_modules/@mkbabb/glass-ui/package.json` → `peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"`
- `web/package.json` → `dependencies["@mkbabb/value.js"] = "^0.13.0"`; `web/node_modules/@mkbabb/value.js/package.json` → `version 0.13.0`
- `web/package-lock.json` → `node_modules/@mkbabb/value.js` v0.13.0, **top-level, no nesting**; `web/node_modules/@mkbabb/glass-ui/node_modules` does not exist
- No `.npmrc` at `web/` or repo root; `web/package.json` has no `overrides`/`resolutions`
- `web/vite.config.ts:57` — `manualChunks["vendor-math"] = ["@mkbabb/value.js", "katex"]` (`0.13.0` is a deliberate, budgeted vendor edge, not an accident)
- `web/node_modules/@mkbabb/value.js/package.json` → `exports` has exactly one key, `"."` — there is no subpath surface to migrate onto; every value.js consumer in the tree (`lib/easings.ts:9,16`, `equation/ConvergencePlot.vue:5`, `equation/lib/harmonics.ts:5`, `equation/composables/useCurveTransition.ts:8`) is necessarily a bare-specifier root import

**Failure scenario.** `rm web/package-lock.json && npm install` (the ordinary way a lockfile is refreshed, e.g. during the F.W2 uplift) hits npm 7+ strict peer resolution: `@mkbabb/value.js@0.13.0` does not satisfy glass-ui 4.0.0's `^0.10.0 || ^0.11.0`, and there is no override or `legacy-peer-deps` escape hatch on disk → `ERESOLVE unable to resolve dependency tree`. The current lock is therefore a frozen artifact of an install performed under different flags, and the very first act of the F.W2 migration (touching the manifest) will surface it.

**Why it is charged to this component.** `EqCoefficientsPanel` consumes zero value.js directly, but it consumes glass-ui at three subpaths and one barrel, and it is glass-ui that carries the violated peer. On the CONSUMPTION axis the panel inherits the constraint whether or not it names it. Honest attribution: **not unique to this component** — it is a closure-level fact reached through the panel's glass-ui edge, and it is the F.W2 headline.

**Falsifier.** `cd web && cp package-lock.json /tmp/ && rm package-lock.json && npm install --dry-run`. A clean resolve kills the claim. (Not run — mutates the evidence tree.) The range/version arithmetic is proven from the two `package.json` files alone.

---

#### **C-5 · MAJOR · The two consumers of the same shared body diverge on chrome: the visualization panel consumes glass-ui `ConfiguratorLayer`; this one consumes a local wrapper plus the `.cartoon-card` dead-class shim.**

**Provenance**
- `web/src/components/visualization/CoefficientsPanel.vue:4,14` — `import { ConfiguratorLayer } from "@mkbabb/glass-ui/configurator"` → `<ConfiguratorLayer label="Coefficients" sub="Fourier spectrum" :default-open="false">`
- `web/src/components/equation/EqCoefficientsPanel.vue:12-13` — `<div class="cartoon-card px-3 py-2"><CollapsibleSection title="Coefficients" subtitle="Fourier spectrum" :default-open="false">`
- Identical label text, identical `default-open`, identical body component — **the only difference is the host primitive**
- `web/node_modules/@mkbabb/glass-ui/package.json` — `./configurator` is exported at 4.0.0, i.e. it was available to this file at the time of writing
- `web/src/style.css:98-112` — `/* D.W4.a — .cartoon-card shim (the dead-class resurrection). glass-ui removed the .cartoon-card recipe at C.W5 (cards.css:2); … 14 application sites (13 files) … this shim is the fourier-local KISS stop-gap. */` followed by `@utility cartoon-card { @apply cartoon-surface; … }`
- `formation/fourier/lane-frontend.md:443` files both panels against `./metric-stack` (4.0.0) → `./metric` (7.0.0) with an empty note

**Failure scenario.** The 4.0.0 → 7.0.0 uplift changes `ConfiguratorLayer`'s tokens/props. The visualization panel moves with the substrate; the equation panel does not, because its chrome is `CollapsibleSection` + a locally resurrected dead class. The two *Coefficients* panels — same title, same subtitle, same body — drift apart visually with no diff in either file. Additionally, `EqCoefficientsPanel:12` is one of the 14 sites keeping the C.W5-deleted `.cartoon-card` recipe alive, so this 17-line component is a live consumer of a documented stop-gap.

**Falsifier.** Show that `ConfiguratorLayer` at 4.0.0 cannot express `title`/`subtitle`/`default-open` + an arbitrary default slot. Its use at `CoefficientsPanel.vue:14` with exactly those three concerns is direct counter-evidence, so the falsifier is unlikely to survive; a stronger one would be a product decision that the equation route must *not* look like the configurator surface — which no doc in the closure states.

**Contradiction with the corpus, stated explicitly.** `lane-frontend.md:368` classes `CollapsibleSection.vue` among *"thin API-shape adapters, not shadows … the correct posture — keep"*. I do not contradict that as a general verdict — `SliderControl` and the tooltip shim document their adaptation (`Tooltip.vue:2-12`). But `CollapsibleSection` documents **no** adaptation rationale (`:1-15` is imports + a `defaultOpen` default + a scroll `watch`), and this callsite has a same-repo sibling proving a glass-ui primitive covers the need. For *this* consumer the "keep" verdict is under-argued.

---

#### **C-6 · MAJOR · The panel's only chromatic surface hard-codes `hsl(h, 85%, 55%)`, bypassing the `--viz-*` token layer that the same view's other coefficient readout consumes — and bypassing value.js entirely.**

**Provenance**
- `web/src/components/shared/CoefficientsSpectrum.vue:48-51` — `function spectrumColor(i, total) { const hue = (1 - i / Math.max(total - 1, 1)) * 300; return \`hsl(${hue}, 85%, 55%)\`; }`
- Applied at `:100` (`backgroundColor: spectrumColor(i, topComponents.length)` on every amplitude bar) and `:112` (the tooltip swatch)
- `web/src/lib/colors.ts:1-6, 76-95` — the project's reactive token layer: `VIZ_COLORS` + `resolveVizColors()` reading `--viz-fourier/chebyshev/legendre/amber/green`, explicitly *"derived from CSS custom properties (--viz-*) so they automatically adapt to light/dark mode"*
- `web/src/components/equation/composables/useCoeffHover.ts:60-66` — the **other** coefficient readout in the **same card** does consume it: *"read the resolved `--viz-amber` hex via VIZ_COLORS at render time (the runtime token-shadow pattern documented at lib/colors.ts:11)"* → `const amber = VIZ_COLORS.amber || VIZ_COLORS.golden`
- `web/src/style.css:114-131` — `/* D.W4.d — light-mode --viz-amber darken (axe contrast carry) … ≈3.54:1 … fails WCAG AA … darkens to hsl(35 76% 35%) ≈ 4.6:1 */` with distinct `:root` and `.dark` values
- `web/src/components/shared/CoefficientsSpectrum.vue` — grep for `--viz`, `VIZ_COLORS`, `var(--` in the script/template: **zero hits**. The file references no theme token at all.

**Failure scenario.** In dark mode the spectrum bars render at the identical `85% / 55%` HSL as in light mode — the one meaning-bearing chromatic element of the panel is the only one in the view that does not respond to the theme. The documented WCAG carry at `style.css:114-131`, which the maintainers went out of their way to apply to `--viz-amber`, cannot reach these bars. And the hue sweep is a raw sRGB-HSL ramp: equal `i` steps are not equal perceptual steps, so at hue ≈ 60° the bar is markedly lighter than at hue ≈ 240° at the same nominal `L: 55%`.

**The value.js connection, stated honestly.** `@mkbabb/value.js@0.13.0` is a declared direct dependency of this app and a budgeted vendor chunk (`vite.config.ts:57`). It is the constellation's color/unit substrate. This function is the panel's *only* color-producing site, and it neither uses value.js nor the app's own token layer — it is a textbook instance of the "hand-rolled `colors.ts` arms" surface the F.W2 migration is scoped to. I do **not** claim value.js 0.13 exposes a drop-in `spectrumColor`; its export map has a single `"."` key and its published function surface (`timingFunctions`, `easeInOutSine`, `interpBezier`, …) is motion-first. The claim is narrower and survives: *the panel produces color without consulting either of the two substrates the repo has already paid for.*

**Falsifier.** Show that the bar fills must be theme-invariant by design, or that a `--viz-*`-derived / perceptually-uniform ramp is expressible neither through `colors.ts` nor value.js 0.13. The `useCoeffHover.ts:60-66` precedent — same view, same datum family, token-derived — is direct counter-evidence to the first. The measured contrast ratios per hue are `UNPROVEN-NEEDS-LIVE`; the mechanism (no token reference anywhere in the file) is proven by grep.

---

### MINOR

---

#### **C-7 · MINOR · The `empty-text` prop is doubly dead: it equals the declared default *and* the branch is unreachable under the caller's `v-if`.**

- `EqCoefficientsPanel.vue:14` — `empty-text="Compute to see coefficients"`
- `CoefficientsSpectrum.vue:32-34` — `withDefaults(…, { emptyText: "Compute to see coefficients" })` — **byte-identical**
- `EquationView.vue:213` — `<EqCoefficientsPanel v-if="components.length" :components="components" />` — the panel never mounts with an empty array, so `CoefficientsSpectrum.vue:143-145` (`<p v-else …>{{ emptyText }}</p>`) cannot render on this route
- Contrast `CoefficientsPanel.vue:15` — the sibling passes `empty-text="Compute epicycles to see coefficients"`, a *meaningful* override, and mounts unconditionally (`components` = `store.epicycleData?.components ?? []`)

**Failure scenario.** A future edit changes the shared default; this panel silently pins the old copy at a callsite whose branch nobody can reach to notice. **Falsifier.** Find a caller that mounts `EqCoefficientsPanel` with `components.length === 0` — `grep -rn "EqCoefficientsPanel" web/src` returns exactly one callsite, `EquationView.vue:213`, guarded.

---

#### **C-8 · MINOR · Neither of the two slots in the panel's closure is forwarded, and `FrequencyGraph.vue` sits under `components/equation/` while only the *visualization* panel consumes it.**

- `CoefficientsSpectrum.vue:67-70` declares `<slot name="graph" />`; `CollapsibleSection.vue:40` declares `<slot name="actions" />`. `EqCoefficientsPanel.vue:11-17` forwards neither, so the equation route cannot reach either without editing the wrapper.
- `web/src/components/visualization/CoefficientsPanel.vue:5` — `import FrequencyGraph from "@/components/equation/FrequencyGraph.vue"` — the visualization panel reaches **across route folders** into `equation/` for it.
- `grep -rn "FrequencyGraph" web/src` → the only non-self references are `CoefficientsPanel.vue:5,17` and two prose mentions in `CoefficientsSpectrum.vue:8,68`. The equation route owns the file and does not use it.

**Failure scenario.** The equation route wants its own spectrum graph (the file for it already lives in its own folder) and must edit a third component to get it; meanwhile a `visualization/` component's import breaks whenever `equation/` is reorganised. **Falsifier.** A doc stating the equation route must never show a frequency graph — `CoefficientsSpectrum.vue:6-9` explains the slot's *existence* but asserts no prohibition, and the file placement argues the opposite.

---

#### **C-9 · MINOR · The "Show more" `Tooltip` wraps a `v-if`'d `Button`, so a trigger-less `TooltipRoot`/`PopperRoot` pair mounts — with a misleading label — whenever the term count is ≤ 12.**

- `CoefficientsSpectrum.vue:135-146` — `<Tooltip :text="expanded ? … : \`Show top 40 of ${totalComponents} coefficients\`"><Button v-if="totalComponents > 12" …>` — the `v-if` is on the **child**, not on the `Tooltip`
- `web/node_modules/reka-ui/dist/Primitive/Slot.js` — with only a `v-if` Comment vnode in the slot, `firstNonCommentChildrenIndex === -1` → the slot returns the comment array; no element is ever registered as the popper trigger
- Reachable: `web/src/components/equation/FunctionInput.vue:184` — the harmonics slider is `:min="1" :max="100"`; `api/routers/equations.py` + `src/fourier_analysis/symbolic/integration.py:110-145` emit `1 + 2·n_harmonics` terms, so `n_harmonics ∈ {1,…,5}` → 3…11 terms → `totalComponents ≤ 12`

**Failure scenario.** At `n_harmonics ≤ 5`, the panel mounts a live reka tooltip root and popper context with no trigger and a `:text` promising *"Show top 40 of 11 coefficients"* — dead machinery plus a false string. **Falsifier.** Show `totalComponents ≤ 12` is unreachable — refuted by the slider's `:min="1"` and the server's term arithmetic.

---

#### **C-10 · MINOR · An amplitude-descending ordering contract binds the API operation to this leaf and is written down on neither side.**

- `CoefficientsSpectrum.vue:38-46` — `topComponents = components.slice(0, expanded ? 40 : 12)` (documented in the UI as "top N") and `maxAmplitude = topComponents[0].amplitude` — both are correct **only if** the array is sorted by amplitude descending
- `web/src/lib/types.ts:1-6` — `interface BasisComponent { index; coefficient; amplitude; phase }` — no ordering statement
- Server side the invariant *does* hold today, in three independent places: `src/fourier_analysis/symbolic/integration.py:145`, `spline.py:116`, `identification.py:125` — each ends `terms.sort(key=lambda t: t.amplitude, reverse=True)`
- But the same module family also re-sorts by index for display: `simplification.py:29-30` — `# Re-sort by index for display` → `kept.sort(key=lambda t: (abs(t.n), -t.n))`. That list is not the one serialized today (`api/routers/equations.py:124` serializes `result["terms"]`, and `truncate_by_budget` operates on fresh lists), but the *idiom* is one refactor away from the response.

**Failure scenario.** A server change serializes an index-ordered list (as `simplification.py:30` already does for its own purpose). `maxAmplitude` becomes the DC term's amplitude instead of the maximum; every bar whose amplitude exceeds it renders wider than its track (`width: >100%`), and the tooltip's *Relative* row reports `>100%`. No type breaks, no test in the closure asserts ordering.

**Falsifier.** Point at an assertion of the ordering — in `web/src/lib/types.ts`, in `api/models/equations.py`, or in a test. `grep -rn "sort" web/src/lib/types.ts web/src/lib/equation/` → none. This is the R6-8 lesson (`lane-fourier-r3-r6.md:142`) in its softer form: **operation↔client leaf coupling carried by convention rather than by contract.** Cite R6-8 alongside for F.W5.

---

#### **C-11 · MINOR · The coefficient crosses the seam as a positional `[number, number]` tuple through two hand-written remaps and eight index sites, while a third parallel shape renders the same datum at a different precision in the same view.**

- Server → wire: `api/routers/equations.py:19-26` `_term_to_dto` → named `coefficient_re` / `coefficient_im`; `web/src/lib/equation/types.ts:4-10` mirrors the names
- Wire → panel: `EquationView.vue:60-67` — `coefficient: [c.coefficient_re, c.coefficient_im] as [number, number]` (**names collapse to positions, with an `as` assertion**)
- Panel → wire (the return leg): `web/src/lib/equation/api.ts:38-42` — `coefficient_re: c.coefficient[0], coefficient_im: c.coefficient[1]` — a second, independently written remap
- Index sites: `CoefficientsSpectrum.vue:118`, `web/src/lib/evaluators.ts:22,23,46,78`, `web/src/lib/bases.ts:41,42`
- The third shape: `web/src/components/equation/composables/useCoeffHover.ts:74-75` builds ad-hoc `[re, im]` arrays straight from the DTO, bypassing `BasisComponent` entirely
- Precision divergence for the same number, same route, same card: `CoefficientsSpectrum.vue:112` `amplitude.toFixed(4)`, `:118` `coefficient[…].toFixed(3)`; `useCoeffHover.ts:86` `coefficient_re.toFixed(3)` / `:76` and `:88` `toFixed(4)`

**Failure scenario.** One of the two remaps swaps re/im (or a future DTO adds a field). `[number, number]` accepts the swap silently; the panel's *Re / Im* row and the epicycle math in `evaluators.ts`/`bases.ts` disagree with the hover popover's readout, and TypeScript is satisfied throughout. Separately, the same coefficient is already displayed to different digit counts depending on which of the two hover surfaces the user is over.

**Falsifier.** Show a single adapter both directions route through — `grep -rn "coefficient_re" web/src` returns nine sites across five files with no shared converter.

---

#### **C-12 · MINOR · The expanded cap of 40 cannot show the full spectrum at the app's own default harmonic count.**

- `CoefficientsSpectrum.vue:38-40` — `slice(0, expanded ? 40 : 12)`; `:139` — the button reads `Show more (${totalComponents} total)`
- `FunctionInput.vue:28` — `nHarmonics` default **20**; `EquationView.vue:29` — same default
- `integration.py:110-145` (and the spline/identification tiers) emit **`1 + 2·n_harmonics` = 41 terms** at that default

**Failure scenario.** Default state: the button offers *"Show more (41 total)"*; expanding yields the readout `40 / 41` at `CoefficientsSpectrum.vue:74-77`. One coefficient is permanently unreachable, and at `n_harmonics = 100` (slider max, `FunctionInput.vue:184`) 161 of 201 are. The rows already live in a `max-h-[300px] overflow-y-auto` scroller (`:79`), so the cap buys nothing the scroller does not already provide. **Falsifier.** A stated 40-row budget — none appears in the file, and the tooltip at `:135` describes the cap as a feature (*"Show top 40 of N"*) without acknowledging the remainder.

---

#### **C-13 · MINOR · Disclosure state is neither lifted nor persisted, on a route that persists everything else.**

- `CoefficientsSpectrum.vue:36` — `const expanded = ref(false)`, component-local, no `v-model`
- `CollapsibleSection.vue:14` — `const open = ref(props.defaultOpen)`, component-local, no `v-model`
- `EqCoefficientsPanel.vue:6-8` — props only; **no `emits`**, no `v-model` passthrough
- `web/node_modules/reka-ui/dist/Presence/Presence.js` (render fn) — returns `null` when not present; `web/node_modules/reka-ui/dist/Collapsible/CollapsibleContent.js:71-77` — `present: forceMount || rootContext.open` → collapsing **destroys** the body, so `expanded` resets to `false` on every collapse
- Contrast `EquationView.vue:23-24, 34-38, 118` — `loadCachedInputState` / `loadCachedResult` / `saveCachedResult` via `composables/useEquationCache`: expression, domain, harmonics, budget, notation, latex and energy all survive a reload

**Failure scenario.** The user expands *Coefficients*, clicks *Show more*, collapses to read the equation, re-expands — and is back at 12 rows. On reload the panel is collapsed again while every other input is restored. **Falsifier.** A product decision that disclosure is deliberately ephemeral — nothing in `useEquationCache` or the panel says so, and the surrounding persistence posture argues the other way.

---

#### **C-14 · MINOR · The scoped rule that the file's own comment calls "excised" is itself a shadow rule over glass-ui's built-in collapsible animation.**

- `CollapsibleSection.vue:57-59` — *"A.W3.d — `collapsible-open` / `collapsible-close` are canonical glass-ui animations …; **the consumer-side shadow rules have been excised**."*
- `CollapsibleSection.vue:60-65` — the rules that remain: `.collapsible-content[data-state="open"] { animation: collapsible-open 0.2s var(--ease-out); }` (+ the `closed` twin)
- `web/node_modules/@mkbabb/glass-ui/dist/CollapsibleContent-C_s6fG7r.js` (CollapsibleContent setup) — glass-ui **already** merges `class: "overflow-hidden transition-collapse data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"` onto the same element
- Those utilities are live: `web/node_modules/tw-animate-css/dist/tw-animate.css` defines both `--animate-collapsible-down/-up` and `@keyframes collapsible-down/-up`, and `web/src/style.css:2` imports `tw-animate-css`
- The consumer rule wins regardless — it is unlayered SFC-scoped CSS while the utilities sit in Tailwind's `@layer utilities`, and it also carries the higher specificity (`…[data-state][data-v-…]`)
- `CollapsibleSection.vue:54-56` likewise re-declares `overflow: hidden`, which glass-ui already applies

**Failure scenario.** A glass-ui uplift retunes `animate-collapsible-down` (duration, easing, or the `--reka-collapsible-content-height` plumbing). Every other collapsible in the constellation moves; this panel does not, because an unlayered consumer rule outranks the substrate — and the comment above it tells the next reader that no such override exists. **Falsifier.** Show the two animations are intentionally distinct — the comment claims the opposite (they are "canonical glass-ui animations"), which is the contradiction.

---

#### **C-15 · MINOR · The scroll-into-view probe is class-string based and cannot see the `@apply`-generated scroll container, so it binds to the wrong ancestor.**

- `CollapsibleSection.vue:20-28` — `setTimeout(… 250)` → `el.closest('.overflow-y-auto, .overflow-auto') ?? el.parentElement`, then `if (scrollParent && rect.bottom > scrollParent.getBoundingClientRect().bottom) el.scrollIntoView({behavior:'smooth', block:'end'})`
- The intended container is `EquationView.vue:373-374` — `.eq-panel-left { @apply flex flex-col gap-3 w-full pb-8 overflow-y-auto min-h-0 flex-1; }`. Because the overflow comes from `@apply`, the DOM node's class attribute is literally `class="eq-panel-left"` (`EquationView.vue:197`) — **`closest('.overflow-y-auto')` cannot match it**
- The first ancestor that *does* carry the literal class is `App.vue:26` — `<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">`, the route-level scroller

**Failure scenario.** The guard compares the collapsible's bottom against `<main>`'s box rather than the left column's. On desktop the panel is clipped inside `.eq-panel-left`, so its `rect.bottom` rarely exceeds `<main>`'s bottom and the scroll simply never fires — the wrapper's entire reason for existing (see C-5: it documents no other adaptation) is inert at this callsite. **Falsifier.** On a ≥1024px viewport, scroll the left column so the collapsed *Coefficients* header sits near the bottom, expand it, and observe whether the panel scrolls into view. `UNPROVEN-NEEDS-LIVE`; the `closest()` miss and the `<main>` binding are proven statically.

---

### INFO

---

#### **C-16 · INFO · `setTimeout(…, 250)` hard-codes a duplicate of the `0.2s` animation duration declared 40 lines below it.**
`CollapsibleSection.vue:20` (`250`) vs `:61` / `:64` (`0.2s`). The comment at `:19` — *"Scroll into view after the open animation completes"* — makes the coupling explicit and untokenised. If the duration is retuned (or C-14 is resolved in favour of the substrate utility) the timer silently desynchronises. **Falsifier.** A shared token for both — none exists; glass-ui exposes `--motion-*` / `--ease-*` in `dist/styles/tokens/scheme-motion.css:210-220` but no collapse-duration token is consumed here.

#### **C-17 · INFO · `@reference "tailwindcss"` is present in one scoped block of the closure and absent from the other, and is unnecessary in both.**
`CoefficientsSpectrum.vue:152` declares `@reference "tailwindcss"`; `CollapsibleSection.vue:53-72` does not. Neither block uses `@apply` or a Tailwind theme function — both use only plain `var(--ease-standard)` / `var(--ease-out)` custom properties, which resolve through the global cascade (defined at `@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css:216-217`). The directive costs a full Tailwind context load per SFC compile and buys nothing. **Falsifier.** Find an `@apply` or `theme()` call in `CoefficientsSpectrum.vue:152-176` — there is none.

#### **C-18 · INFO · `tabular-nums` is passed to a component that already applies it.**
`CoefficientsSpectrum.vue:104-107` passes `class="w-16 text-right fira-code text-muted-foreground tabular-nums"` to `AnimatedDigit`, whose render root is `cn("animated-digit tabular-nums", $props.class)` (`@mkbabb/glass-ui/dist/animated-digit.js`, AnimatedDigit setup). Harmless duplication; a signal that the primitive's contract was not read. **Falsifier.** Show `AnimatedDigit` omits it — the dist render function contains it literally.

#### **C-19 · INFO · The `slide-down` transition recipe wrapping this panel is defined four separate times across four SFCs.**
`EquationView.vue:212` names it; `EquationView.vue:449-452`, `VisualizationView.vue:434-437`, `PaperView.vue:651-666` and `ContourSettings.vue:456-468` each define it in their own `<style scoped>` block, with divergent durations/offsets. Neither glass-ui's `dist/styles/` nor `tw-animate-css` ships a `slide-down` recipe, so there is no substrate to consume — but four copies is three too many for a design-system-first tree. **Falsifier.** A shared definition — `grep -rn "slide-down" web/src/style.css` returns nothing.

#### **C-20 · INFO · No `defineOptions({ name })`, so the component's devtools/warning identity is filename-derived.**
`EqCoefficientsPanel.vue:1-9`. Relevant here because C-2's per-row Vue warning will surface the *inner* renderless components, and a named wrapper is the only breadcrumb back to this file. **Falsifier.** Vue's SFC compiler infers the name from the filename for `<script setup>` — true, which is exactly why this is INFO and not MINOR.

---

## §3 · Superlatives (L-18 runs both ways)

Each carries provenance and its own falsifier, on the same terms as the defects.

**S-1 · The D7/D11 de-duplication is exemplary, and the divergence is hoisted rather than branched.**
`CoefficientsSpectrum.vue:2-10` states the extraction (*"The two consumers were ~95% identical … The sole structural divergence — the visualization route's `FrequencyGraph` — is hoisted to the `#graph` slot"*). The tree bears it out: `CoefficientsPanel.vue` and `EqCoefficientsPanel.vue` are 26 and 17 lines, both delegating to the same 168-line body, with **zero `route === "equation"`-style conditionals** anywhere in `CoefficientsSpectrum.vue`. Corroborates `lane-frontend.md:180`'s framing without needing its SHADOW disposition. **Falsifier.** A route-discriminating branch inside the shared body — `grep -rn "equation\|visualization" web/src/components/shared/CoefficientsSpectrum.vue` returns only the two prose comments at `:6` and `:68`.

**S-2 · The `AnimatedDigit` consumption is precisely correct against the 4.0.0 contract, and it discharges a booked a11y gap.**
`CoefficientsSpectrum.vue:19` imports from the `./animated-digit` **subpath** (not the barrel), and `:104-107` passes `:value` + `:format` — both real props per the shipped component (`dist/animated-digit.js` declares `value, format, placeholder, digitCount, mode, damping, class`; `format` is invoked as `a.format(e)`). The docblock at `:11-17` ties it to the L5 §5 A8 LOW a11y gap. This is what disciplined design-system consumption looks like, and it is the exact counter-example that makes C-1's barrel import indefensible in the same closure. **Falsifier.** A prop mismatch or a deprecated subpath — the export map has `./animated-digit`, and every passed prop is declared.

**S-3 · The tooltip lift consumes a single app-level provider with real delay configuration, not a per-callsite provider.**
`grep -rn "TooltipProvider" web/src` → exactly one hit: `App.vue:4` (import) and `App.vue:23` (`<TooltipProvider :delay-duration="400" :skip-delay-duration="200">` wrapping the app). The 12–40 tooltip roots this panel mounts all share it. This falsified my strongest early hypothesis (§5.2). **Falsifier.** A second provider, or none — grep returns one.

**S-4 · Reduced motion is honoured at the panel's own animation site, consistent with the tree-wide posture.**
`CollapsibleSection.vue:66-71` — `@media (prefers-reduced-motion: reduce) { … animation: none; }` over both collapse states. `lane-frontend.md:619` records this as one of 8 such blocks across the tree and names `ui/CollapsibleSection.vue:66` explicitly. Notably, the *other* half of the panel's motion (the `coeff-list-*` transitions, `CoefficientsSpectrum.vue:157-176`) has **no** reduced-motion guard — which C-2 renders moot, but would become a real gap the moment C-2 is fixed. Flagging it here rather than as a separate defect precisely because it is currently unreachable.

**S-5 · The consumption graph is deliberately budgeted at the bundler, and the budget names each substrate.**
`web/vite.config.ts:40-66` — `manualChunks` splits `vendor-vue` / `vendor-ui` (glass-ui + reka + lucide) / `vendor-math` (**`@mkbabb/value.js`** + katex) / `vendor-paper` / `vendor-keyframes`, with a comment recording the pre-W7 854 kB index chunk and the split rationale ("by load-cadence"). `:24-32` further records the contract-v2 dev-resolution precept — *"the `development` condition is STRUCK; consumers resolve `dist/` via the bare specifier through each sibling's `exports` map, dev and prod alike. No `@mkbabb/*` `dist/`-path `resolve.alias` (forbidden by §2.4)"* — and the tree obeys it: `resolve.alias` contains only `"@"`. On the bare-specifier half of the F.W2 surface this repo is **already compliant**, and that deserves saying. **Falsifier.** A `@mkbabb/*` alias or a `development` condition — `vite.config.ts:27-33` has neither.

---

## §4 · Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md:140` — panel = "Thin spectrum host", 17 LOC | **Confirmed.** The shape is right; the defects are in the seams (C-1, C-5, C-7). |
| `lane-frontend.md:180` — `CoefficientsSpectrum` = SHADOW candidate §4 | **Neither confirmed nor contradicted here** — the shadow question is glass-ui `fourier-field` convergence, out of this axis's scope. C-2 and C-6 are independent of it and survive either disposition. |
| `lane-frontend.md:182,368` — the 3 `components/ui/` wrappers are "thin API-shape adapters, not shadows … keep" | **Contradicted for this consumer only** (C-5). `SliderControl.vue:3-20` and `tooltip/Tooltip.vue:2-12` document their adaptation; `CollapsibleSection.vue` documents none, and the sibling panel proves `ConfiguratorLayer` covers the need at 4.0.0. |
| `lane-frontend.md:293` — the barrel import, inventoried as a raw census line | **Upgraded to BLOCKER** (C-1): that edge is the sole path from this panel to `dist/glass-ui.js:60`'s static `vaul-vue` import, and `vaul-vue` is absent from the lock while CI runs `npm ci`. |
| `lane-frontend.md:443` — both panels → `./metric-stack` (4.0.0) → `./metric` (7.0.0), note empty | **Filled in** (C-5): the more consequential 4.0.0 divergence is `ConfiguratorLayer` vs `CollapsibleSection` + the `.cartoon-card` shim. |
| `lane-frontend.md:619` — 8 reduced-motion blocks incl. `CollapsibleSection.vue:66` | **Confirmed** (S-4), with the caveat that the sibling half of the panel's motion has no guard. |
| intake **R3-7a** (TRUE) — 35 Tooltip callsites / 9 consumers → F.W3 | **Confirmed and localised.** `CoefficientsSpectrum` contributes 2 of the 35 (`:86`, `:135`). C-2 and C-9 are the two that must be budgeted *inside* that migration, not after it. |
| intake **R3-10** (TRUE) — dynamic `<component :is>` at `CoefficientsSpectrum.vue:132` | **Confirmed live**: `:137` in the current tree reads `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />` (a 5-line drift from the intake's `:132`, consistent with edits since). It sits inside the C-9 trigger-less tooltip. |
| intake **R6-8** (TRUE) — operation↔client leaf coupling is structurally non-isolable | **Extended** (C-10, C-11): the same lesson in its *soft* form. Here the coupling is not an embedded back-reference but an **unwritten ordering invariant** plus a **positional tuple with two hand-written remaps**. Same failure mode — a defect cannot be attributed to one side of the seam — reached without any explicit join. Budget alongside R6-8 at F.W5. |

---

## §5 · Falsified hypotheses (recorded, not counted)

Six defect hypotheses were pursued and killed by the tree. Recording them is part of the method: each was plausible from the component alone, and each cost real evidence to refute.

1. **"The consumer's `animation: collapsible-open` names a keyframe glass-ui 4.0.0 renamed to `collapsible-down`, so the collapse is dead."** — FALSE. `@mkbabb/glass-ui/dist/styles/animations.css:18,29` defines `@keyframes collapsible-open` and `collapsible-close`, and `dist/styles/index.css:162` `@import`s that file into the entry the app pulls at `style.css:3`. The names resolve. (What survives is the weaker C-14.)
2. **"No `TooltipProvider` — 12–40 reka tooltip roots without a provider ancestor."** — FALSE. `App.vue:4,23` provides exactly one, configured. Became superlative S-3.
3. **"`var(--ease-out)` / `var(--ease-standard)` are undefined, so the shorthand is invalid-at-computed-value-time and suppresses the animation."** — FALSE. Both are defined at `@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css:216-217` (and mirrored at `theme/bridges.css:325-326`), inside the cascade the app imports.
4. **"`<Transition name="slide-down">` at `EquationView.vue:212` names a transition defined only in unrelated scoped blocks, so the panel's mount transition is dead."** — FALSE. `EquationView.vue:449-452` defines it in its own scoped block. (What survives is the INFO-level C-19: four copies across four files.)
5. **"The bar chart assumes an amplitude-descending order the API does not provide."** — FALSE at HEAD. All three tiers sort descending (`integration.py:145`, `spline.py:116`, `identification.py:125`) and `truncate_by_budget` works on fresh lists, so `result["terms"]` reaches `api/routers/equations.py:124` sorted. (What survives is C-10: the invariant is real, load-bearing, and written down nowhere.)
6. **"Collapsed-by-default still pays for 12–40 `SmoothProgress` RAF integrators at first paint."** — FALSE. `reka-ui/dist/Presence/Presence.js` returns `null` unless `forceMount || present || isPresent`, and `Collapsible/CollapsibleContent.js:71-77` sets `present: forceMount || rootContext.open`. With `:default-open="false"` (`EqCoefficientsPanel.vue:13`) the body — and therefore every `AnimatedDigit` → `useAnimatedNumber` → `new SmoothProgress(...).play(...)` (`glass-ui/dist/useAnimatedNumber-C_3wZLx4.js`) — is not constructed until the user expands. The keyframes.js cost is real but demand-paid, and it is bounded by the C-12 cap of 40. Recorded as a **non-defect**; the teardown/rebuild on every collapse is what makes C-13 bite.

---

## §6 · Disposition sketch (non-binding)

| Id | Sev | Cheapest correct move | Wave |
|---|---|---|---|
| C-1 | BLOCKER | `CollapsibleSection.vue:2` → `@mkbabb/glass-ui/collapsible`; separately declare + lock `vaul-vue` (and the 6 sibling barrel edges) | F.W2 |
| C-3 | MAJOR | move `lucide-vue-next`, `reka-ui`, `clsx`, `cva`, `tailwind-merge` to `dependencies` | F.W2 |
| C-4 | MAJOR | the value.js peer-range reconciliation is the F.W2 headline; nothing component-local to do | F.W2 |
| C-2, C-9 | MAJOR/MINOR | fold into the R3-7a tooltip migration — the transitioned node must be an element | F.W3 |
| C-5, C-7, C-8 | MAJOR/MINOR | one edit to `EqCoefficientsPanel.vue`: adopt `ConfiguratorLayer`, drop the redundant `empty-text`, forward `#graph` | F.W3 |
| C-6 | MAJOR | route `spectrumColor` through `VIZ_COLORS` / a perceptually-uniform ramp | F.W2 (colors.ts arms) |
| C-10, C-11 | MINOR | ordering + coefficient shape belong in the shared-provenance contract, with R6-8 | F.W5 |
| C-12…C-20 | MINOR/INFO | opportunistic, inside whichever wave touches the file | — |
