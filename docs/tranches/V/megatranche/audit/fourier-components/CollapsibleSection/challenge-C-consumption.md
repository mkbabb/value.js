claude-opus-5[1m]

# CHALLENGE · `CollapsibleSection` · axis **C — CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/CollapsibleSection.vue` (72 lines)
**Axis** how this component consumes value.js 0.13 · keyframes.js 4.3 · glass-ui ^4.0.0 · the 45-operation fourier API; props/emits contract quality; integration seams.
**Mode** static + source-derived, read-only. No browser tooling. Two read-only *executions* were used as measurement and are disclosed: `npx vue-tsc --noEmit -p tsconfig.json` (no emit, no `-b`, no tsbuildinfo) and `npm install --dry-run --no-audit --no-fund` (no writes to `node_modules`, `package.json`, or `package-lock.json`). No product source in any repo was written. The sole write of this lane is this file.
**Substrate** fourier HEAD `cd26c65`, tree `9a66411d` — byte-identical to the coordinate adjudicated at `lane-fourier-r3-r6.md` R4-9. Installed `@mkbabb/glass-ui@4.0.0`, `@mkbabb/keyframes.js@4.3.0`, `@mkbabb/value.js@0.13.0`, `lucide-vue-next@1.0.0`.
**Posture** the component was assumed DEFECTIVE. Seven hypotheses were killed by their own falsifiers before reaching this page (§7); what survives is below.

---

## §0 · What this component actually consumes

| Producer | Consumed? | Surface | Line |
|---|---|---|---|
| `@mkbabb/glass-ui` | **YES** | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` — via the **root barrel**, not `/collapsible` | `:2` |
| `@mkbabb/glass-ui` (CSS) | **YES, implicitly** | `@keyframes collapsible-open` / `collapsible-close`; `--ease-out`; `@utility cm-serif`; `--muted-foreground` | `:53-71`, `:39-41` |
| `lucide-vue-next` | **YES** | `ChevronRight` | `:4` |
| `vue` | YES | `ref`, `watch` | `:3` |
| `@mkbabb/value.js@0.13` | **NO** | zero imports | — |
| `@mkbabb/keyframes.js@4.3` | **NO** | zero imports | — |
| fourier API (45 ops) | **NO** | zero imports; no `lib/api.ts`, no store, no `lib/types.ts` | — |

So the F.W2 *source*-migration surface (bare specifiers, the hand-rolled `lib/colors.ts` arms) does **not** touch this file, and the R6-8 operation↔client leaf coupling has no reachable seam here. The consumption defects are (a) in the **manifest**, (b) in the **glass-ui CSS contract**, and (c) in the **props/emits contract**.

---

## §1 · Findings — ranked

| id | sev | site | claim (one line) |
|---|---|---|---|
| **C-1** | **BLOCKER** | `web/package.json:15,17` ← `:2` | `npm install` **fails ERESOLVE today**: `value.js@0.13.0` violates `glass-ui@4.0.0`'s `peerOptional @mkbabb/value.js ^0.10.0 \|\| ^0.11.0`. Every symbol this file imports comes from that package. |
| **C-2** | MAJOR | `:14`, `:34` | Open state is **unrecoverable**: no `update:open` emit, no `defineExpose`, `defaultOpen` is a mount-time snapshot — and 3 of the 4 call sites sit behind remount boundaries. |
| **C-3** | MAJOR | `:53-65` | The producer's own collapse motion is **definitionally absent** from fourier's build; this scoped block is the tree's only working bridge, and the component does not export it. `PaperSidebar.vue` believes otherwise and animates nothing. |
| **C-4** | MAJOR | `:19-30` | The scroll-into-view seam is **wired to the wrong element on both arms**: `scrollParent` is computed then never used to scroll, and the literal-class probe can only ever resolve to `App.vue:26 <main>`. |
| **C-5** | MAJOR | `web/package.json:34` ← `:4` | `lucide-vue-next` is imported at **runtime** but declared in `devDependencies`, and it is **not a glass-ui peer at all** — `glass-ui@4.0.0` peers `@lucide/vue ^1.16.0`. |
| **C-6** | MINOR | `:2` | Sole root-barrel `@mkbabb/glass-ui` import among the tree's three `Collapsible*` consumers; the other two use `/collapsible`. |
| **C-7** | MINOR | `:26`, `:61,64`, `:37` | Three hardcoded durations (`250`, `0.2s`, `duration-200`) bypass `--duration-fast: 0.2s`, and the JS timer is hand-kept 50 ms ahead of the CSS clock. |
| **C-8** | MINOR | `:15`, `:21` | `$el` resolves to `any`; the `?? rootEl.value` fallback would be a `TypeError` if reached. The tree's own conformant idiom is `MobileFloatingToc.vue:27-33`. |
| **C-9** | MINOR | `:37` | `<ChevronRight>` carries no `aria-hidden="true"`, against **24** in-tree exemplars. |
| **C-10** | MINOR | `:34`, `:36` | Three dead classes: `.collapsible-section`, `.collapsible-trigger`, `group` — zero matching rules or variants anywhere in the repo. |
| **C-11** | MINOR | `:38-41` | A component named `CollapsibleSection` emits **no heading and no labelled region**; four titled sections expose zero `<h*>`. |
| **C-12** | INFO | `:20-29` | The 250 ms timer is never cancelled on unmount. |
| **C-13** | INFO | `:54-56` | `overflow: hidden` duplicates the producer's `overflow-hidden` (which *is* emitted) — a harmless hedge that is load-bearing only in the counterfactual. |
| **C-14** | INFO | — | **Zero automated coverage**: vitest is absent from the tree; no e2e spec reaches any of the four call sites. |
| **C-15** | INFO | `:9-16` | `defaultOpen` never re-syncs; safe *today* only because all four call sites pass literals. |
| **C-16** | INFO | `:43` | The `actions` slot has **0 consumers** — dead public API. |
| **C-17** | INFO | whole file | Formatting diverges from the tree: single quotes + no semicolons in the top half, semicolons in the watch body, 4-space script vs 2-space template. |

**Tally: 17 defects — 1 BLOCKER · 4 MAJOR · 6 MINOR · 6 INFO. 5 superlatives (§6).**

> **→ SECOND PASS APPENDED — read §11 before citing this tally.** An independent second C-axis seat adds
> **5 net-new defects** (N-1..N-5) and **withdraws S-4**. Consolidated file totals: **22 defects —
> 1 BLOCKER · 5 MAJOR · 10 MINOR · 6 INFO · 4 superlatives standing.** (This pointer is the only edit
> made to §0–§10; the first pass is otherwise verbatim.)

---

## §2 · The BLOCKER

### C-1 · `npm install` cannot resolve this tree — and the conflict is on the **value.js** arm, at glass-ui **4.0.0**, not 7.0.0

**Claim.** The `@mkbabb/value.js@^0.13.0` pin in `web/package.json:15` is already outside the peer range declared by the *installed* `@mkbabb/glass-ui@4.0.0`. A fresh `npm install` in `web/` errors out; the tree is only installable via the existing lockfile (`npm ci`) or with `--force` / `--legacy-peer-deps`.

**Receipt** (`npm install --dry-run --no-audit --no-fund`, run in `/Users/mkbabb/Programming/fourier-analysis/web`):

```
npm error code ERESOLVE
npm error While resolving: @mkbabb/glass-ui@4.0.0
npm error Found: @mkbabb/value.js@0.13.0
npm error   @mkbabb/value.js@"^0.13.0" from the root project
npm error   @mkbabb/value.js@"^0.13.0" from @mkbabb/keyframes.js@4.3.0
npm error Could not resolve dependency:
npm error peerOptional @mkbabb/value.js@"^0.10.0 || ^0.11.0" from @mkbabb/glass-ui@4.0.0
npm error   optional @mkbabb/glass-ui@"~4.0.0" from @mkbabb/keyframes.js@4.3.0
npm error Conflicting peer dependency: @mkbabb/value.js@0.11.2
npm error Fix the upstream dependency conflict, or retry this command with --force or
npm error --legacy-peer-deps to accept an incorrect (and potentially broken) resolution.
```

Corroborating manifest reads:
- `node -e '…glass-ui/package.json.peerDependencies'` → `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"`, `"@mkbabb/keyframes.js": "^2.2.0 || ^3.0.0 || ^4.0.0"`, `"@lucide/vue": "^1.16.0"`.
- `web/package-lock.json:440-441` → `"node_modules/@mkbabb/value.js": { "version": "0.13.0" }`, `lockfileVersion: 3`. The lockfile was therefore written under a peer-override.
- `web/Dockerfile:11` and `.github/workflows/ci.yml:92,131` all run plain `npm ci` — which reads the lockfile and never re-resolves. **That is the only reason CI is green.**

**Why this is the component's problem and not merely the repo's.** `CollapsibleSection.vue:2` imports all three of its structural symbols from `@mkbabb/glass-ui`. This file cannot be uplifted, re-pinned, or lifted onto `glass-ui/collapsible` without the manifest resolving first. It is the smallest, cleanest reproduction of the deadlock in the tree — 72 lines, one import line, no product logic in the blast radius.

**Falsifier (applied, survived).** If glass-ui's value.js peer were `^0.13.0` or absent, or if the peer were declared non-optional-but-satisfied, `--dry-run` would have exited 0. It did not. If `npm ci` also failed, the finding would be larger, not smaller; `npm ci` succeeds, which is precisely why the defect is invisible in CI and why it must be booked explicitly.

**Contradiction with the hitherto corpus — explicit.** `formation/fourier/lane-frontend.md` §5 routes the value.js peer floor to the 4→7 hop ("`7.0 peers @mkbabb/value.js@^4.0.0`; installed **0.13.0**") and §9 carry **#5** calls the value.js leg "the cheapest leg of the deadlock." The tree disagrees on both counts: the peer is **already violated at the installed 4.0.0**, and the leg is not cheap-because-small — it is **install-blocking today**. §5's `🔴 THE RESOLUTION DEADLOCK` box correctly identifies the `keyframes@4.3.0 → glass-ui ~4.0.0` tilde (reproduced verbatim in the ERESOLVE trace above) but omits this second, currently-red arm. **Correction owed to lane-frontend §5 + §9 carry #5.**

---

## §3 · The MAJORs

### C-2 · The props/emits contract loses user state, and the parent cannot get it back

**Claim.** `open` is a private `ref` seeded once from `props.defaultOpen` (`:14`). There is no `emits`, no `defineExpose`, no `v-model:open` pass-through, and no watcher on `props.defaultOpen`. The component's entire state is therefore destroyed on unmount with no recovery path — and three of its four call sites are behind remount boundaries.

**Failure scenario (concrete, source-derived).**
`EquationView.vue:212-214`:
```
<Transition name="slide-down">
    <EqCoefficientsPanel v-if="components.length" :components="components" />
</Transition>
```
`components` is a `computed` (`EquationView.vue:59-69`) that returns `[]` whenever `result.value` is falsy. `EqCoefficientsPanel.vue:13` mounts `<CollapsibleSection … :default-open="false">`. So: user expands **Coefficients** → any state transition that clears `result` (recompute, error, expression edit path that nulls the result) drops `components.length` to 0 → `v-if` unmounts the panel → `CollapsibleSection`'s `open` ref is destroyed → on the next successful compute the section remounts **collapsed**. The parent holds no copy and has no channel to restore one.

`VisualizationView.vue:253-257` is the same shape for `ContourPreview`: `<Transition name="panel-swap" mode="out-in"><div v-if="isEditing" …><ContourPreview …>`. Every exit-and-return from edit mode resets that section to `defaultOpen: true`, discarding a user collapse.

Only `FunctionInput.vue:94` / `:176` are mounted unconditionally and therefore stable.

**Falsifier (applied, survived).** I checked whether the parent already mirrors the state (it would make the emit redundant): `EqCoefficientsPanel.vue` is 17 lines, declares one prop, and holds no open/expanded state; `ContourPreview.vue` holds only `previewPath`/`previewViewBox` computeds. I checked whether `keepAlive` or `unmountOnHide=false` shields the tree: `grep -rn "KeepAlive\|keep-alive" src/` → the router (`router/index.ts`) uses lazy `import()` per route with no `<KeepAlive>`, and `Collapsible`'s `unmountOnHide` prop (present in the dist props at `CollapsibleContent-C_s6fG7r.js:12`) is never passed. Both shields absent — the scenario stands.

**Contrast, in-tree.** `SliderControl.vue` — the sibling adapter `lane-frontend.md` §3 groups with this file as "the correct posture — keep" — does forward a model. This one does not. The lane's verdict that all three `components/ui/` wrappers are equally "thin API-shape adapters" is **too generous to this file**; see also C-3.

**Severity rationale.** MAJOR not BLOCKER: silent UX state loss, no crash, no data loss, no build break. It becomes a BLOCKER if F.W-anything makes section state persistent (`useSafeStorage.ts` exists at `src/composables/useSafeStorage.ts`, 27 lines) — there is no seam to persist through.

---

### C-3 · glass-ui's own collapse motion is dead in fourier's build; this file is the only bridge, and it does not export it

**Claim.** `CollapsibleContent` ships three Tailwind classes hardcoded in its dist render function. **None of the three are ever emitted into fourier's stylesheet.** The local scoped block at `:53-65` is therefore not a redundant override — it is the sole animation driver for the four sections this component owns, and the tree's other two `CollapsibleContent` consumers are left in two different broken states.

**Receipts.**

1. Producer render, `node_modules/@mkbabb/glass-ui/dist/CollapsibleContent-C_s6fG7r.js:56`:
```js
i(t, { class: "overflow-hidden transition-collapse data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down" })
```
2. Emission census over the shipped glass-ui CSS (`dist/styles/**` + `dist/glass-ui.css`), occurrence counts:

| class | `components.css` (glass-ui's compiled utility payload) | anywhere in shipped CSS | emitted for fourier? |
|---|---:|---:|---|
| `overflow-hidden` | present | ✓ | **YES** (also used literally in `src/App.vue` etc.) |
| `transition-collapse` | **0** | 1 — an `@utility` *declaration* only, `utilities/btn.css:67` | **NO** |
| `animate-collapsible-up` | **0** | **0** | **NO** |
| `animate-collapsible-down` | **0** | **0** | **NO** |

3. The consumer cannot rescue them: `grep -rn "animate-collapsible\|transition-collapse" web/src/` → **0 hits**, and `grep -rn "@source" web/src/` → **0**. Tailwind v4's automatic source detection excludes `node_modules`, so the class strings inside glass-ui's dist JS are never scanned. `tw-animate-css` *does* define `--animate-collapsible-down/up` and their keyframes (`node_modules/tw-animate-css/dist/tw-animate.css`), which is exactly why the absence is silent rather than loud: the theme variable exists, the utility is simply never generated.

4. The keyframes this file *does* use are real and correctly cited: `dist/styles/animations.css:18` `@keyframes collapsible-open`, `:29` `@keyframes collapsible-close`, both reading `var(--reka-collapsible-content-height)`. The comment at `:56-58` is TRUE (see S-1).

**The consequence, across the three consumers.**

| consumer | posture | outcome |
|---|---|---|
| `ui/CollapsibleSection.vue:53-65` | declares the bridge locally | **animates** |
| `visualization/ContourSettings.vue:363-372` | **byte-duplicates** the same three rules under a different class name (`.advanced-content`), comment at `:354-361` explicitly citing "the same substrate animation `CollapsibleSection` adopted at A.W3.d" | animates, by copy-paste |
| `paper/PaperSidebar.vue:255-258` | comment: *"Collapsible animation driven by glass-ui `CollapsibleContent` … The previous hand-rolled `grid-template-rows: 0fr → 1fr` shim is retired."* — then declares **only** `.sidebar-sublist-wrapper { overflow: hidden; }` | **animates nothing.** The comment's premise is false in this build. |

`grep -rn "animation: collapsible-open\|animation: collapsible-close" web/src/` returns exactly four lines — two in this file, two in `ContourSettings.vue`. `PaperSidebar.vue` is absent.

**Why this lands on `CollapsibleSection`.** It is the tree's *designated* collapsible adapter and it is the only place the bridge works. A wrapper that owns the motion contract but ships it as a private scoped rule forces every direct-primitive consumer to rediscover it — one did (by copy), one did not (and regressed). The bridge belongs either in the wrapper's public surface or upstream in glass-ui's own emitted CSS.

**Falsifier (applied, survived).** The obvious kill was "glass-ui ships a compiled utility payload, so these classes are fine" — and glass-ui *does* ship one: `dist/styles/components.css` contains a large minified block of real compiled utilities (`.sr-only{…}.absolute{…}` …). I therefore re-ran the census **against `components.css` specifically, unanchored, to defeat the single-line minification**: `transition-collapse` 0, `animate-collapsible-down` 0, `animate-collapsible-up` 0. By contrast the same probe found `.rounded-control{border-radius:var(--radius-control)}` and `disabled\:opacity-disabled:disabled{opacity:var(--opacity-disabled)}` present, and `.focus-ring:focus-visible` / `.tap-squish` present in `utilities/base.css:174,258` — so `CollapsibleTrigger`'s *other* four classes **do** work, and the finding narrows to exactly the three collapse classes. A second falsifier — "fourier's own source uses these classes and thus generates them" — returned 0 hits (the 5 `focus-ring` hits in `web/src/` are all prose comments, verified site-by-site).

**Cross-repo carry.** The producer is internally incoherent here: `dist/styles/animations.css` ships `collapsible-open`/`collapsible-close`, while `CollapsibleContent`'s own render references `collapsible-down`/`collapsible-up` (a `tw-animate-css` family). Two keyframe vocabularies for one job. → glass-ui BH inbox.

---

### C-4 · The scroll-into-view seam probes one element and scrolls a different one

```ts
:20  setTimeout(() => {
:21      const el = rootEl.value?.$el ?? rootEl.value;
:22      if (!el) return;
:23      const rect = el.getBoundingClientRect();
:24      const scrollParent = el.closest('.overflow-y-auto, .overflow-auto') ?? el.parentElement;
:25      if (scrollParent && rect.bottom > scrollParent.getBoundingClientRect().bottom) {
:26          el.scrollIntoView({ behavior: 'smooth', block: 'end' });
:27      }
:28  }, 250)
```

Three independent defects in nine lines:

**(a) `scrollParent` is computed and then never used to scroll.** `:26` calls `el.scrollIntoView()`, which walks the browser's own nearest-scrollable-ancestor chain. The element the code *measured* and the element the browser *scrolls* are unrelated by construction.

**(b) The probe can only match literal class attributes, and the real scrollers are declared in scoped CSS.** The equation view's actual scroll containers are `EquationView.vue:373-383`:
```
.eq-panel-left  { @apply flex flex-col gap-3 w-full pb-8 overflow-y-auto min-h-0 flex-1; }
.eq-panel-right { @apply flex flex-col gap-3 min-h-0 min-w-0 flex-1; overflow-y: auto; overflow-x: hidden; }
```
Neither element carries `class="overflow-y-auto"` in markup — one applies it through `@apply` inside `<style scoped>`, the other through a longhand. `closest('.overflow-y-auto, .overflow-auto')` is blind to both. The literal-class census over the whole tree (`grep -rn "overflow-y-auto\|overflow-auto" web/src/`) returns 7 markup sites, of which exactly one — `App.vue:26 `<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">`, wrapping `<RouterView/>` at `App.vue:27` — is an ancestor of all four call sites. **The probe therefore resolves to the app shell's `<main>`, at every call site, always.** The gate asks "is my bottom below the *application viewport*", never "below my panel".

**(c) The `?? el.parentElement` fallback is unreachable, and would be a constant-`false` gate if reached.** Because `<main>` is universal, `closest` never returns null. If it did, `el.parentElement` at all four sites is the wrapping `<div class="cartoon-card px-3 py-2">` (`EqCoefficientsPanel.vue:12`, `ContourPreview.vue:33`, `FunctionInput.vue:93,175`) — a parent whose `py-2` padding puts its `bottom` strictly *below* its child's, making `rect.bottom > parent.bottom` false by construction.

**Coupling verdict.** This is a hard integration seam: a leaf `components/ui/` primitive reaching **upward** into ancestor markup it does not own, keyed on Tailwind utility strings. Any layout refactor that moves `overflow-y-auto` from a class attribute into `@apply` (which is exactly what `EquationView` already did) silently changes this component's behaviour with no type error, no test failure, and no lint.

**Falsifier (applied, partially survived — disclosed).** I tried to kill (a)+(b) by hypothesising that the gate happens to be *correct anyway*, because a section below the fold of `.eq-panel-left` is also below `<main>`'s bottom (both are clipped to the same box on desktop). That is plausible and I could not refute it statically — so the **user-visible** consequence is marked **UNPROVEN-NEEDS-LIVE (SS-13)**: measure whether the smooth scroll fires and lands correctly on mobile (`eq-panel-left-wrap` gets `overflow: visible; flex: none` under `@media (max-width: 1023px)`, `EquationView.vue:361` — the layout where the two boxes definitively diverge). What is **proven statically** and does not need live confirmation: the measured element and the scrolled element are different by construction (a), and the probe cannot see the panel scrollers (b), and the fallback arm is dead (c).

---

### C-5 · The icon dependency is mis-declared *and* mis-named against the producer's peer contract

**Claim.** `:4` `import { ChevronRight } from 'lucide-vue-next'` is a runtime import. `web/package.json:34` declares `lucide-vue-next: "^1.0.0"` under **`devDependencies`**. And `glass-ui@4.0.0`'s peer set names **`@lucide/vue: "^1.16.0"`** — `lucide-vue-next` is **not a peer at all**.

**Receipts.**
```
$ node -e 'const p=require("./package.json"); console.log(p.dependencies["lucide-vue-next"], p.devDependencies["lucide-vue-next"])'
undefined ^1.0.0
$ node -e '…glass-ui peerDependencies…'
"@lucide/vue": "^1.16.0"     # lucide-vue-next => NOT A PEER
```
Same class for `reka-ui` (`devDependencies:36`, peer `^2.0`), `class-variance-authority` (peer `^0.7`), `clsx` (peer `^2.0`), `tw-animate-css` (peer `^1.2.5` — this one *is* correctly in `dependencies`).

**Blast radius, measured.** Harmless *today*: `web/Dockerfile:11` and `.github/workflows/ci.yml:92,131` all run plain `npm ci` with no `--omit=dev`. It becomes a build break the moment any install path uses `--production` / `--omit=dev`, and it is a latent correctness defect regardless.

**Contradiction with the hitherto corpus — explicit, and it changes a carry.** `lane-frontend.md` §1 states: *"**Dead devDeps (measured, not estimated):** `class-variance-authority`, `clsx`, `tailwind-merge` all have **0 import sites**"*, and §9 carry **#10** books their retirement. The import-site count is correct; the **disposition is wrong for three of the four**. `class-variance-authority`, `clsx` and `reka-ui` are **declared peerDependencies of `@mkbabb/glass-ui@4.0.0`** — retiring them breaks the peer contract and widens C-1's ERESOLVE surface. Only **`tailwind-merge` is genuinely dead** (`=> NOT A PEER`, 0 import sites). §9 carry #10 should be narrowed from four packages to one, and the other three re-filed as *correctly-present-but-mis-classified* (peers belong in `devDependencies` for an application, so their *placement* is defensible — their labelling as "dead" is not).

Also correcting `lane-frontend.md` §1 row 13 and §5 row 7, both of which attribute the `lucide-vue-next → @lucide/vue` rename to **glass-ui 7**: the installed **4.0.0 already peers `@lucide/vue ^1.16.0`**. The 35-site rename is a *current* debt, not an uplift-only one. This file is one of the 35.

---

## §4 · The MINORs

**C-6 · Root-barrel import.** `:2` imports from `@mkbabb/glass-ui`; the tree's two other `Collapsible*` consumers (`ContourSettings.vue:12`, `PaperSidebar.vue:7`) import from `@mkbabb/glass-ui/collapsible`. Byte cost: `dist/collapsible.js` is **154 B** with one static import; `dist/glass-ui.js` is **33 527 B** with **60** static imports. *Falsifier applied:* `glass-ui/package.json` declares `sideEffects: ["*.css"]`, marking every JS module shakeable, and `vite.config.ts:40-56` collapses all of glass-ui into one `vendor-ui` chunk regardless — so I **cannot** claim a measured bundle regression, and do not. The real cost is convention divergence and a wider uplift blast radius (the root barrel's export surface is the one most likely to move across a major). *Non-break confirmed for the uplift:* producer `glass-ui/src/index.ts:135` still re-exports `./components/collapsible` at 7.0.0.

**C-7 · Three hardcoded clocks bypass the motion token.** `:26` `250`, `:61`/`:64` `0.2s`, `:37` `duration-200`. glass-ui ships `--duration-fast: 0.2s` (`dist/styles/tokens/scheme-motion.css:67`) — an exact match for two of the three. The 250 ms JS timer is a hand-maintained 50 ms lead over the 200 ms CSS animation; changing either in isolation desynchronises the "scroll after the open animation completes" intent at `:20`. The token-conformant alternative (`--duration-fast`, plus reading the computed animation duration) exists and is used elsewhere in the tree. Note the timing token *is* consumed correctly: `var(--ease-out)` resolves through `scheme-motion.css:217 → --motion-ease-out: cubic-bezier(0, 0, 0.2, 1)` (`:212`). *Falsifier applied:* I first suspected `--ease-out` was undefined (every other A.W3.d-annotated site in the tree uses `--ease-out-expo`/`--ease-standard`) — it is defined by **both** glass-ui and Tailwind v4 (`node_modules/tailwindcss/theme.css:435`) **at the identical value**, so there is no collision and no invalid-at-computed-value failure. Claim withdrawn to a token-bypass on duration only.

**C-8 · The `$el` escape is untyped.** `:15` `ref<InstanceType<typeof Collapsible> | null>(null)`; `:21` `rootEl.value?.$el ?? rootEl.value`. `vue-tsc --noEmit` passes (the only diagnostic in the whole project is `PaperView.vue(12,8): TS2882` for `@mkbabb/latex-paper/theme`, unrelated) — because `$el` resolves to `any`, which then poisons `el` and silently type-checks `el.closest(...)`, `el.getBoundingClientRect()`, **and** the `?? rootEl.value` arm that would hand a *component instance* to `getBoundingClientRect`. The tree already contains the conformant idiom, with a comment explaining it — `MobileFloatingToc.vue:27-33`:
```ts
// fall back to querying the focusable child if the instance exposes `$el`.
const tocTriggerRef = useTemplateRef<HTMLElement | { $el?: HTMLElement }>("tocTrigger");
…  return r instanceof HTMLElement ? r : (r.$el ?? null);
```
*Falsifier applied and it killed my stronger hypothesis:* I predicted `InstanceType<typeof Collapsible>` would resolve to `{ $slots: … }` (because `Collapsible.vue.d.ts` wraps `DefineComponent` in `__VLS_WithSlots<T,S> = T & { new(): { $slots: S } }`, whose *last* construct signature wins inference) and therefore break the CI typecheck. It does not — measured. Reported as MINOR type-safety, not as a build break.

**C-9 · Decorative icon is not hidden from AT.** `:37` `<ChevronRight class="h-4 w-4 …" :class="{ 'rotate-90': open }" />` — no `aria-hidden`. The tree uses `aria-hidden="true"` on decorative lucide icons at **24** sites (`GalleryView.vue:323,340,350`, `AdminFlaggedPanel.vue:173,206,216,226,233,257`, `GalleryAdminBanner.vue:30,39`, `GalleryMarquee.vue:55`, …). The trigger's accessible name already comes from the `<span>` text, so the chevron adds only noise. `@axe-core/playwright ^4.11.3` is installed but no spec covers these sections (C-14), so nothing catches it. *Falsifier applied:* `lucide-vue-next@1.0.0`'s generated icons set no default `aria-hidden` or `role`, so the attribute is genuinely absent rather than supplied upstream.

**C-10 · Three dead classes.** `grep -rn "collapsible-section" web/src/` → exactly one hit, the `class=` at `:34`; no rule in this file's `<style scoped>`, none in `style.css`, none in glass-ui's shipped CSS. Same for `collapsible-trigger` (`:36`) — one hit, zero rules; note `style.css:133-143` declares global `:focus-visible` rings for four scoped-styled classes and `.collapsible-trigger` is **not** one of them, so the class was plausibly minted for that pattern and never wired. `group` (`:36`) has zero `group-*` variants in this file or in any of the four consumers (`grep -rn "group-hover\|group-focus\|group-data"` over `components/ui/`, `FunctionInput.vue`, `EqCoefficientsPanel.vue`, `ContourPreview.vue` → 0). Three attributes carrying no behaviour, on a 72-line file.

**C-11 · No section semantics.** `:38-41` renders the title as `<span class="cm-serif text-sm font-semibold tracking-tight">` inside the trigger, with the subtitle as a sibling `<span>`. There is no `<h2>`/`<h3>`, no `aria-level`, no `role="region"`, no `aria-labelledby` on the content. `CollapsibleTrigger` (reka-ui) supplies `aria-expanded`/`aria-controls` and `CollapsibleContent` supplies `data-state` — so the *disclosure* semantics are correct and free — but the four titled sections in `/equation` contribute **zero** entries to a heading-navigation pass. For a component whose name is `CollapsibleSection`, the section is purely visual. Not a violation of a specific SC on its own (a `Collapsible` is not an `Accordion`, which would require the heading wrapper), hence MINOR; live axe confirmation is **UNPROVEN-NEEDS-LIVE (SS-13)**.

---

## §5 · The INFOs (compressed)

- **C-12** `:20-28` — the 250 ms `setTimeout` is not captured or cleared in `onUnmounted`. Benign: on unmount `rootEl.value` is `null`, both operands of `?? ` are `null`, and `:22 if (!el) return` exits. A pending timer per open, no leak beyond one tick.
- **C-13** `:54-56` — `.collapsible-content { overflow: hidden }` duplicates the producer's `overflow-hidden` class, which **is** emitted (fourier's own source uses `overflow-hidden` at `App.vue:23`, `ImageUpload.vue`, `GalleryCard.vue`, …). Defensible as a hedge given C-3, but it is the one rule in the block that is *not* load-bearing today.
- **C-14** — no automated coverage. vitest is absent from `web/package.json` entirely (`lane-frontend.md` §9 carry #11, confirmed). The 8 e2e specs never reach the four call sites: `contour-extraction.spec.ts:60,109` click a "Contour"-texted trigger (`ContourSettings`, not this component); `paper-performance.spec.ts:125` queries `closest("[data-state]")` in `PaperSidebar`; `visual-baseline.spec.ts:34` screenshots `/equation` but asserts no collapsible behaviour. Neither C-2's state loss nor C-3's dead classes nor C-4's mis-gating can be caught by any existing gate.
- **C-15** `:9-16` — `defaultOpen` never re-syncs. Safe **today** only because all four call sites pass literals (`:default-open="false"` at `EqCoefficientsPanel.vue:13`; `"true"` at `FunctionInput.vue:94,176` and `ContourPreview.vue:34`). Falsifier survived: a single reactive binding at any call site desynchronises silently. Arguably correct-by-name (`default*`), hence INFO.
- **C-16** `:43` `<slot name="actions" />` — `grep -rn "#actions\|v-slot:actions\|slot=\"actions\"" web/src/` → 0. Dead public API on a 3-prop component. (Its *placement* is nonetheless right — see S-5.)
- **C-17** — formatting diverges from the tree: single quotes and no semicolons in `:1-16`, semicolons inside the `watch` body `:21-27`, 4-space script vs 2-space template. Every other file surveyed in this lane uses double quotes + semicolons + 4-space. No linter is configured to catch it (no eslint/prettier in `web/package.json`).

---

## §6 · Superlatives (L-18 runs both ways — each with its falsifier)

**S-1 · The provenance comment at `:56-58` is precise, dated, and TRUE.**
> *"A.W3.d — `collapsible-open` / `collapsible-close` are canonical glass-ui animations (see `@mkbabb/glass-ui/styles/animations.css`); the consumer-side shadow rules have been excised. Substrate keyframes resolve via global cascade."*

Verified end to end: `dist/styles/animations.css:18` and `:29` define exactly those two keyframes; they read `var(--reka-collapsible-content-height)`, which reka-ui's `CollapsibleContent` supplies; `src/style.css:3 @import "@mkbabb/glass-ui/styles"` is the single cascade entry that pulls them; and Vue's scoped-CSS keyframe rewriting does **not** apply (it only renames `@keyframes` declared inside the same block), so the global names resolve as claimed. *Falsifier:* if either keyframe were absent from the shipped CSS, or if the animation names were rewritten by the scope transform, the comment would be false — neither holds. Consumer comments that name a producer file path and survive verification are rare; this one is the reason C-3 was diagnosable at all.

**S-2 · Zero coupling to value.js, keyframes.js, and the 45-operation API.** The component imports three glass-ui symbols, two Vue primitives, and one icon. No `lib/api.ts`, no `lib/types.ts`, no store, no `BasisComponent`, no `easeInOutSine`/`timingFunctions`, no `loadAnimationEngine`. For the F.W2 migration this is the ideal leaf shape: its entire source-side migration cost is **one import line** (C-6) plus **one icon specifier** (C-5), and R6-8's operation↔client back-reference hazard has no reachable seam. *Falsifier:* `grep -rn "@mkbabb/value.js\|@mkbabb/keyframes\|lib/api\|lib/types" src/components/ui/CollapsibleSection.vue` → 0. Contrast the 5 value.js sites and 35 lucide sites the lane must budget elsewhere.

**S-3 · It uses the producer's *supported* controlled channel.** `:34 v-model:open="open"` binds to glass-ui's declared contract — `Collapsible.vue.d.ts` types `"update:open": (value: boolean) => any`, and the dist implementation (`CollapsibleContent-C_s6fG7r.js:16-18`) declares `emits: ["update:open"]` and forwards via `useForwardPropsEmits`. It does **not** reach past the wrapper into `reka-ui`'s `CollapsibleRoot` directly. The tree has **0** direct `reka-ui` imports (`lane-frontend.md` §3, re-confirmed) and this file does not break that record. *Falsifier:* had it imported `CollapsibleRoot` or poked `data-state` imperatively, the 4→7 uplift would inherit an unforwardable seam; it does not, and the channel survives the uplift (producer `src/index.ts:135`).

**S-4 · The reduced-motion block is correct and complete.** `:66-71` disables **both** state animations outright (`animation: none`) rather than shortening them — the stronger, WCAG-2.3.3-conformant reading. It is one of only 8 `@media (prefers-reduced-motion: reduce)` blocks in the tree (`lane-frontend.md` §8, which names this file at `:66`). *Falsifier:* had it set `animation-duration: 0.01ms` (the common half-measure) or covered only the open state, the claim would fail; it covers both selectors and nulls the animation. **Note the asymmetry this creates with C-3:** because this file is the only working animation bridge, it is also the only place the reduced-motion guard has anything to guard — `PaperSidebar`'s guard-free collapsible is guard-free *and* motion-free, which is accidental conformance.

**S-5 · `<slot name="actions" />` is placed outside the trigger.** `:43` sits as a sibling of `<CollapsibleTrigger>` inside the flex row (`:35`), not inside it. That is the correct construction: `CollapsibleTrigger` renders a `<button>`, and any actionable content projected into it would be a nested interactive control (an HTML content-model violation and a keyboard trap). The author anticipated the hazard. *Falsifier:* had the slot been inside the trigger, or had a consumer projected a `<Button>` into it, the defect would be live — the placement is correct and (per C-16) no consumer exercises it, so the design is right and untested. Superlative for the design; C-16 stands for the dead surface.

---

## §7 · Hypotheses killed by their own falsifiers (recorded so they are not re-litigated)

| # | hypothesis | killed by |
|---|---|---|
| K-1 | `var(--ease-out)` is undefined ⇒ the whole `animation` shorthand is invalid-at-computed-value ⇒ nothing animates | Defined **twice**, at the same value: `glass-ui/dist/styles/tokens/scheme-motion.css:217` → `--motion-ease-out: cubic-bezier(0,0,.2,1)` (`:212`) and `tailwindcss/theme.css:435`. No collision, no failure. |
| K-2 | `InstanceType<typeof Collapsible>` resolves to `{ $slots }` (last construct signature of `__VLS_WithSlots`) ⇒ `.$el` is a `vue-tsc` error ⇒ CI `web-build` is red | `npx vue-tsc --noEmit -p tsconfig.json` → one unrelated diagnostic (`PaperView.vue(12,8) TS2882`). `$el` resolves to `any`. Downgraded to C-8. |
| K-3 | The scoped `.collapsible-content` rules are a redundant override of the producer's own animation | The producer's animation classes are never emitted (C-3). The block is load-bearing; only `overflow: hidden` is redundant (C-13). |
| K-4 | `class="collapsible-section"` / `"collapsible-content"` never reach the DOM because the glass-ui components don't declare `class` props | Both use `inheritAttrs: true` (no `defineOptions`) and `CollapsibleContent` merges via `mergeProps` (`…C_s6fG7r.js:56`); Vue merges fallthrough `class` onto the child's root. Classes land. (They land and do nothing — C-10.) |
| K-5 | Root-barrel import measurably bloats the bundle | `sideEffects: ["*.css"]` marks all JS shakeable and `vite.config.ts:40-56` puts glass-ui in one `vendor-ui` chunk regardless. No measured regression; C-6 rests on convention + uplift risk only. |
| K-6 | `CollapsibleTrigger`'s glass-ui utility classes are all dead (same mechanism as C-3) ⇒ no focus ring, keyboard focus invisible | `.focus-ring:focus-visible` and `.tap-squish` ship as real rules in `dist/styles/utilities/base.css:174,258`; `.rounded-control{…}` and `disabled\:opacity-disabled:disabled{…}` ship compiled in `components.css`. Only `transition-collapse` is dead on the trigger's sibling. Finding narrowed to exactly three classes. |
| K-7 | `defaultOpen` desyncs from a reactive parent binding | All four call sites pass literals. Downgraded to C-15 (INFO). |

---

## §8 · Corpus reconciliation

| corpus row | this challenge |
|---|---|
| `lane-frontend.md` §3 "these three `components/ui/` files are **thin API-shape adapters, not shadows.** … They are the correct posture — keep." | **PARTIAL AGREE / SHARPEN.** Not-a-shadow: agreed (`glass-ui` ships no `CollapsibleSection` analogue at 4.0.0 or 7.0.0). "Thin adapter": **contradicted** — this file also owns the tree's only working collapse-motion bridge (C-3) and swallows a state contract (C-2). §3 further notes `SliderControl.vue:3-20` and `Tooltip.vue:2-12` "document the adaptation explicitly"; **`CollapsibleSection` does not** — it has one comment, and it is about CSS. Keep the file; do not keep the verdict that all three are equivalent. |
| `lane-frontend.md` §1 + §9 carry #10 — "Dead devDeps (measured): `class-variance-authority`, `clsx`, `tailwind-merge` … `reka-ui` also has 0 direct imports" ⇒ retire | **CONTRADICTED (3 of 4).** `class-variance-authority`, `clsx`, `reka-ui` are declared **peerDependencies of `glass-ui@4.0.0`**. Only `tailwind-merge` is retirable. Carry #10 must narrow. (C-5) |
| `lane-frontend.md` §1 row 13 + §5 row 7 — `lucide-vue-next → @lucide/vue` is a **glass-ui 7** peer rename | **CONTRADICTED.** `glass-ui@4.0.0` already peers `@lucide/vue ^1.16.0`. Current debt, not uplift-only. (C-5) |
| `lane-frontend.md` §5 + §9 carry #5 — value.js peer floor bites at 7.0.0; "the cheapest leg of the deadlock" | **CONTRADICTED.** `value.js@0.13.0` already violates `glass-ui@4.0.0`'s `^0.10.0 \|\| ^0.11.0`; `npm install` errors ERESOLVE **today**. Not cheap — install-blocking. (C-1) |
| `lane-frontend.md` §5 `🔴 THE RESOLUTION DEADLOCK` — `keyframes@4.3.0` optional-deps `glass-ui ~4.0.0`; the three bumps are one atomic transaction | **AGREE — reproduced verbatim** inside the ERESOLVE trace (`optional @mkbabb/glass-ui@"~4.0.0" from @mkbabb/keyframes.js@4.3.0`). This challenge adds the second red arm (value.js) that makes it red *now* rather than *on uplift*. |
| `lane-frontend.md` §8 — 8 `prefers-reduced-motion` CSS blocks, naming `ui/CollapsibleSection.vue:66` | **AGREE, exact.** Elevated to superlative S-4, with the C-3 asymmetry noted. |
| `lane-frontend.md` §3 — "zero direct `reka-ui` imports" | **AGREE.** Re-confirmed for this file; recorded as S-3. |
| `lane-frontend.md` §9 carry #11 — no unit-test runner; 8 Playwright specs the only frontend gate | **AGREE + INSTANTIATE.** Zero of the 8 specs reach any of this component's four call sites. (C-14) |
| `intakes/lane-fourier-r3-r6.md` **R4-9** — audited scope byte-identical to the tree F.W0 opens on | **AGREE.** HEAD `cd26c65`, tree `9a66411d` re-confirmed; all line numbers here are valid against that coordinate. |
| `intakes/lane-fourier-r3-r6.md` **R6-8** — operation↔client leaf coupling; keep operation identity independent of client identity | **NOT REACHABLE HERE.** This component consumes 0 of the 45 operations and 0 client functions; no seam to test. Recorded as S-2 rather than silently omitted. |
| `intakes/lane-fourier-r3-r6.md` **R5-7 / R6-5** — loop evidence keyed to component callsites is blind to native element loops | **NOT APPLICABLE, and confirmed by inspection**: this component has **0** `v-for` (native or component). It contributes nothing to the `PaperSidebar` blind spot and nothing to the 16 native template loops. |
| `intakes/lane-fourier-r3-r6.md` **R3-7a** — 35 Tooltip callsites / 9 consumers → F.W3 | **NOT APPLICABLE.** `CollapsibleSection` imports no `Tooltip`; it is outside the F.W3 adapter budget. |
| `CENSUS-2026-08-03.md` / `lane-frontend.md` §2 — `components/ui/CollapsibleSection.vue` = 72 LOC | **AGREE, exact** (`wc -l` → 72). |

---

## §9 · Carries proposed

| id | to | ask |
|---|---|---|
| **CS-1** | **F.W0 / F.W2 (P0)** | Land C-1 before any other fourier work: the manifest does not resolve. Either float the `value.js` pin into `^0.11.x`, or take the atomic tri-package bump. Every downstream carry in `lane-frontend.md` §9 is sequenced behind this. |
| **CS-2** | **glass-ui BH inbox** (standing formation invariant) | (a) `CollapsibleContent` hardcodes `transition-collapse` + `animate-collapsible-{up,down}`, none of which glass-ui emits into its own shipped CSS — every consumer without an `@source` over `node_modules` gets an unanimated collapsible. (b) The producer ships `collapsible-open`/`collapsible-close` keyframes in `animations.css` while its own component references the `collapsible-down`/`collapsible-up` family — two vocabularies, one job. |
| **CS-3** | **F.W3** | Give `CollapsibleSection` a real contract: `defineModel<boolean>('open')` (or `update:open`), and lift the motion bridge out of the private scoped block so `ContourSettings.vue:363-372` stops copy-pasting it and `PaperSidebar.vue:255-258` stops silently not animating. |
| **CS-4** | **F.W3** | Replace the `closest('.overflow-y-auto, .overflow-auto')` probe (C-4) with a computed-style walk or an explicit `scrollContainer` prop; a leaf primitive must not key on ancestor Tailwind class strings. |
| **CS-5** | **F.W4** | Narrow `lane-frontend.md` §9 carry #10 from four packages to one (`tailwind-merge`); re-file the other three as glass-ui peers. |
| **CS-6** | **SS-13 (live)** | Two claims are marked UNPROVEN-NEEDS-LIVE: whether C-4's mis-gating produces a visible miss at `< 1024px` (where `eq-panel-left-wrap` goes `overflow: visible`, `EquationView.vue:361`), and whether C-11's heading absence trips `@axe-core/playwright` on `/equation`. |

---

## §10 · Method + limits

- Read-only over `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`. Evidence: `cat`/`sed`/`grep`/`find`/`ls`/`wc`/`node -e` over manifests and dist bytes, plus the two disclosed non-mutating executions (`vue-tsc --noEmit`, `npm install --dry-run`). No file in either repo was written.
- The component was read whole. Every file it imports was read: `glass-ui/dist/collapsible.js`, `glass-ui/dist/CollapsibleContent-C_s6fG7r.js` (the full implementation of all three components), the four `.d.ts` under `glass-ui/dist/components/ui/collapsible/`, `glass-ui/dist/styles/animations.css`, `tokens/scheme-motion.css`, `utilities/btn.css`, `utilities/base.css`, `typography/utilities.css`, `components.css`, and the glass-ui + fourier `package.json`s. All four consumers were read (`EqCoefficientsPanel.vue` whole, `FunctionInput.vue`, `ContourPreview.vue`, and their mount contexts in `EquationView.vue` / `VisualizationView.vue`), as were the two sibling `CollapsibleContent` consumers (`ContourSettings.vue`, `PaperSidebar.vue`) and `src/style.css`.
- No browser tooling. Two claims are explicitly marked UNPROVEN-NEEDS-LIVE (CS-6) and are excluded from the defect severities above where they would have raised them.
- `web/package.json` and `web/src` sit on branch `m/w1-bump-migration` with the in-flight bump uncommitted (`lane-frontend.md` §0 [WT] caveat). Every version figure here is **[WT] = installed**, verified against `node_modules` rather than against `package.json` alone. `CollapsibleSection.vue` itself is **not** among the 24 in-scope dirty paths.

---
---

# §11 · SECOND PASS — independent re-challenge (claude-opus-5[1m])

**Provenance.** This section was authored by a second, independently-spawned C-axis seat that opened the
component cold and did not read §0–§10 until its own measurements were banked. **The only edit made to
§0–§10 is the forward-pointer blockquote under §1's tally line; the first pass is otherwise preserved
verbatim.** This section records (a) what the second pass
independently **corroborated**, (b) **five net-new defects** the first pass did not reach, and (c) **one
explicit refutation of a first-pass superlative**. Where the two passes disagree, the disagreement is
stated, not smoothed.

**Second-pass mode.** Static + source-derived, read-only. **One** execution, entirely inside the session
scratchpad: an isolated `tsc` project (`paths`-mapped to the repo's `node_modules`, `noEmit: true`, no
`-b`, no symlink into the repo, no `.tsbuildinfo`) — **zero bytes written anywhere in
`fourier-analysis`, `glass-ui`, or any `node_modules`.** No `npm`, no browser tooling. The first pass's
`npm install --dry-run` receipt (§2) is adopted as-cited and was independently corroborated by manifest
arithmetic below rather than re-run.

**Revised tally for the file as a whole: 22 defects — 1 BLOCKER · 5 MAJOR · 10 MINOR · 6 INFO ·
4 superlatives standing (S-4 WITHDRAWN, see N-1).**

---

## §11.1 · Net-new defects

### N-1 · **MAJOR** — the reduced-motion guard covers the CSS animation but **not** the JS smooth scroll. This refutes S-4.

`:66-71` nulls both state animations under `prefers-reduced-motion: reduce`. `:26` then issues

```ts
el.scrollIntoView({ behavior: 'smooth', block: 'end' });
```

— **imperative motion that no CSS media query can reach.** A user who has asked the platform for reduced
motion still gets a smooth-scrolling viewport on every expand of every one of the four sections. The
component suppresses the motion the *producer* owns and then adds motion of its own beside it, unguarded.

*Provenance* `CollapsibleSection.vue:17-30` (the watcher), `:26` (the scroll), `:66-71` (the guard that
does not cover it).

*Falsifier, applied and survived.* The claim dies if `scrollIntoView({behavior:"smooth"})` honours
`prefers-reduced-motion` implicitly. It does not: the reduced-motion idiom in CSS applies to the
`scroll-behavior` **property**; an explicit `ScrollBehavior` argument passed to
`Element.scrollIntoView()` is an author instruction that overrides the element's computed
`scroll-behavior` and is not media-query-gated. The conformant consumer forms are
`behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"`, or dropping the
argument and letting a CSS `scroll-behavior` + `@media` pair decide. It also dies if no user path reaches
`:26` — refuted: all four callsites are user-togglable, and `:26` is the terminal statement of the only
behavioural branch in the file.

*Direct contradiction of §6 S-4.* The first pass wrote: *"The reduced-motion block is correct and
**complete**. … `:66-71` disables **both** state animations outright … the stronger,
WCAG-2.3.3-conformant reading."* The block is correct **for what it covers**; it is **not complete**. Its
own falsifier — *"had it … covered only the open state, the claim would fail"* — was scoped to the two CSS
selectors and never asked whether the file emits motion outside CSS. It does, nine lines above. **S-4 is
WITHDRAWN and re-filed as this defect.** The file's superlative count drops 5 → 4.

*Second-order note.* This also weakens the first pass's C-3 asymmetry remark ("this file is the only
place the reduced-motion guard has anything to guard"): the guard has *more* to guard than it guards.

*UNPROVEN-NEEDS-LIVE (SS-13)* — the perceived scroll distance under an OS reduced-motion setting. Add to
CS-6.

### N-2 · **MINOR** — the 250 ms callback never re-reads `open`; close-within-the-window still scrolls

`:20-28` fires on the leading edge of `open === true` and, 250 ms later, checks **only** `if (!el)`
(`:22`). It never re-consults `open.value`. Open → collapse inside the window ⇒ the branch still executes
`getBoundingClientRect` + the gate at `:25` on a now-collapsed section, and can still fire `:26`. Nothing
in `:17-30` cancels a pending timer, so N rapid opens queue N timers.

*Provenance* `CollapsibleSection.vue:17-30`.

*Relationship to §5 C-12.* C-12 is the **unmount** arm and the first pass correctly closed it as benign
(refs null on unmount; `:22` exits). This is the **toggle** arm, which C-12 does not cover and which is
not benign-by-the-same-mechanism: the root `<Collapsible>` stays mounted through a collapse, so `el` is
non-null and the guard does not fire. The two are separate rows.

*Falsifier, applied, partially against me.* The gate at `:25` will usually be false for a collapsed
section (its `rect.bottom` has shrunk to the trigger row), so the *scroll* usually does not fire — this is
a correctness defect in the guard, not a reliably visible one. It is filed MINOR for exactly that reason.
It becomes live whenever a section is collapsed while already below `<main>`'s bottom edge.

### N-3 · **MINOR** — `:58` cites a specifier that glass-ui 4.0.0 does not export. This qualifies S-1.

The comment at `:57-59` directs the reader to **`@mkbabb/glass-ui/styles/animations.css`**. The installed
producer's exports map carries exactly `./styles`, `./styles/fonts`, `./styles.css`, `./collapsible`
(and the rest of the component subpaths) — **no `./styles/animations`, no `./styles/animations.css`, and
no `./styles/*` wildcard.** A consumer who acts on the comment gets
`ERR_PACKAGE_PATH_NOT_EXPORTED`. The identical false path is duplicated at `ContourSettings.vue:358`.

*Provenance* `CollapsibleSection.vue:58`; `ContourSettings.vue:358`;
`node_modules/@mkbabb/glass-ui/package.json` `exports` (enumerated:
`node -e "Object.keys(require('…/package.json').exports).filter(k=>/styles/.test(k))"` →
`./styles`, `./styles/fonts`, `./styles.css`).

*Falsifier, applied and it protects S-1's substance.* The comment's **claim** is TRUE and the second pass
re-verified it end-to-end independently: `src/style.css:3 @import "@mkbabb/glass-ui/styles"` →
`dist/styles/index.css` → `@import "./animations.css"` → `animations.css:18` (`collapsible-open`) /
`:29` (`collapsible-close`), both reading `var(--reka-collapsible-content-height)`. So this is a
**pointer defect on a correct mechanism**, not a broken cascade. §6 S-1 called the comment *"precise …
and TRUE"* and *"names a producer file path and survives verification"* — the **path** does not survive:
it is a real file at a real location inside the package, but it is **not reachable as a specifier**.
S-1 stands with that qualification; the two are compatible.

### N-4 · **MINOR** — the fork at `ContourSettings.vue:255-307` is a *composition*-level fork, and the wrapper offers no seam that would let it be consumed

§3 C-3 records the CSS half of this (`ContourSettings.vue:363-372` byte-duplicates the animation block).
The second pass records the other half: `ContourSettings.vue:255-307` re-builds the **entire
composition** — `<Collapsible v-model:open>` + `<CollapsibleTrigger>` + `<ChevronRight>` + animated
`<CollapsibleContent>` — rather than mounting `CollapsibleSection`. Measured divergences between the fork
and the wrapper are exactly two, and both are one prop away from being expressible:

| axis | `CollapsibleSection` | `ContourSettings` fork |
|---|---|---|
| trigger typography | `.cm-serif text-sm font-semibold tracking-tight` (`:39`) | `.advanced-trigger` — `@apply text-sm`, `font-weight: 500`, `letter-spacing: .03em`, `color-mix(… --foreground 40% …)` (`ContourSettings.vue:336-352`) |
| content class | `.collapsible-content` (`:45`) | `.advanced-content` (`ContourSettings.vue:265`) |

The wrapper exposes **no `variant` prop and no trigger slot** (`:6-12` is three scalars; `:36-42` hardcodes
the trigger's entire content). So the fork is not merely undisciplined — it is *unavoidable* given the
wrapper's surface. That makes this a consumption-contract defect on the wrapper, not only a hygiene
defect on the forker.

*Provenance* `CollapsibleSection.vue:6-12,36-42`; `ContourSettings.vue:8-12,255-307,336-352,363-372`.

*Falsifier, applied and survived.* The claim dies if the two compositions are behaviourally distinct
enough to justify two implementations. They are not: both bind `v-model:open` to a local `ref`, both
rotate a lucide chevron on open, both drive `data-state` → the same two glass-ui keyframes. A `variant`
prop plus a `#title` slot subsumes the fork exactly. It also dies if `ContourSettings` predates the
wrapper — refuted: `ContourSettings.vue:354-361` explicitly cites *"the same substrate animation
`CollapsibleSection` adopted at A.W3.d"*, so the forker knew the wrapper existed and chose around it.

*Sharpens CS-3.*

### N-5 · **MINOR** — the wrapper narrows a 6-prop primitive to 3 with no forwarding seam; `unmountOnHide` in particular is unreachable and load-bearing

Second-pass type-probe (isolated `tsc`, scratchpad) resolved
`InstanceType<typeof Collapsible>["$props"]` to:

```
{ readonly defaultOpen?: boolean; readonly open?: boolean; readonly disabled?: boolean;
  readonly unmountOnHide?: boolean; readonly asChild?: boolean; readonly as?: AsTag | … }
```

`defineProps` at `:6-12` declares `{title, subtitle, defaultOpen}`. Four primitive props —
`disabled`, `unmountOnHide`, `asChild`, `as` — are **unreachable by declaration**. They remain reachable
at runtime as fallthrough attrs (`inheritAttrs` defaults true; the template root is `<Collapsible>`), but
that path is untyped, undocumented, and invisible to `vue-tsc -b` (`ci.yml:95`) — the definition of an
accidental API.

`unmountOnHide` is the one that bites. Its reka default destroys content on collapse, so
`ContourPreview.vue:36-50`'s live SVG is torn down and rebuilt on every toggle with no consumer opt-out —
while the parent's `previewPath` / `previewViewBox` computeds (`ContourPreview.vue:10-29`) keep
recomputing regardless, because the wrapper emits nothing to gate them on.

*Provenance* `CollapsibleSection.vue:6-12`; `glass-ui/dist/components/ui/collapsible/Collapsible.vue.d.ts`
(props = reka `CollapsibleRootProps`, emits `update:open`); `ContourPreview.vue:10-29,36-50`.

*Relationship to §3 C-2.* C-2 is the **state-recovery** defect (no emit, no expose, snapshot
`defaultOpen`). N-5 is the **surface-narrowing** defect. C-2's falsifier paragraph notes in passing that
`unmountOnHide` "is never passed"; it is filed here as its own row because the fix is different — C-2
wants `defineModel`, N-5 wants forwarding (`v-bind="$attrs"` typed, or an explicit passthrough).

*Falsifier, applied and survived.* The claim dies if `CollapsibleRootProps` lacks those members — refuted
by the probe above. It dies as a *practical* matter if some callsite already needs one of them and gets it
— refuted: `grep -rn "unmount-on-hide\|:disabled\|as-child" ` over the four callsites → 0.

---

## §11.2 · Independent corroborations (second pass, arrived at cold)

Recorded because a finding reproduced by two seats that did not share receipts is stronger than one:

| first-pass row | second-pass receipt (independent) | verdict |
|---|---|---|
| **C-1** BLOCKER (value.js peer violated at 4.0.0) | Manifest arithmetic, no `npm` run: installed `@mkbabb/glass-ui@4.0.0` `peerDependencies["@mkbabb/value.js"] = "^0.10.0 \|\| ^0.11.0"`; installed `@mkbabb/value.js` = `0.13.0`. Caret on `0.x` is minor-locked (`^0.10.0` ≡ `>=0.10.0 <0.11.0`; `^0.11.0` ≡ `>=0.11.0 <0.12.0`) ⇒ **0.13.0 satisfies neither**. | **CONFIRMED** by a second, independent method. The first pass's ERESOLVE receipt and this arithmetic agree. |
| **C-5** (lucide mis-declared and mis-named) | `web/package.json:35` = devDependencies; `grep -rn "lucide-vue-next" web/src \| wc -l` → **35**; `vite.config.ts` `manualChunks.vendor-ui: ["@mkbabb/glass-ui","reka-ui","lucide-vue-next"]` — the repo's **production** chunk map names a devDependency. | **CONFIRMED + EXTENDED** — the build config contradicting the manifest is net-new colour on the same row. |
| **C-6** (root barrel) | `dist/collapsible.js` 154 B vs `dist/glass-ui.js` 33 527 B; `sideEffects: ["*.css"]`; `ContourSettings.vue:8-12` and `PaperSidebar.vue:7` both use `/collapsible`. | **CONFIRMED**, including the first pass's own refusal to claim a byte regression. |
| **K-2 → C-8** (`$el` is `any`, not a `vue-tsc` error) | Isolated scratchpad `tsc`: `const t1: 1 = inst.$el` and `const t2: 1 = el` **both compiled silently** (proving `any`), while `const t3: 1 = inst` errored and printed the full `ComponentPublicInstance`. This isolates the exact expression rather than inferring from a whole-project pass. | **CONFIRMED** — and the second pass raised, then killed, the identical `__VLS_WithSlots` hypothesis before reading K-2. Two seats, same wrong guess, same kill. |
| **C-16** (`#actions` dead) | `grep -rn "#actions\|v-slot:actions" web/src` → 0, across all four callsites. | **CONFIRMED** |
| **S-1** (keyframes cascade real) | `animations.css:18,29` located in the **installed** dist; reached via `style.css:3` → `index.css`; `--ease-out` located at `tokens/scheme-motion.css:217` reached via `tokens.css:26`. | **CONFIRMED**, with the pointer qualification at N-3. |
| **S-2** (zero value.js / keyframes.js / API coupling) | `grep -rn "@mkbabb/value.js" web/src` → 5 sites, none in this file; keyframes 0; no `lib/api.ts`, no store, no `fetch`. | **CONFIRMED** |

---

## §11.3 · Additional hypotheses killed (append to §7)

| # | hypothesis | killed by |
|---|---|---|
| **K-8** | `CollapsibleTrigger` renders a `type`-less `<button>` ⇒ clicking a section header inside a form submits it ⇒ page reload. Would have been a second BLOCKER. | `node_modules/reka-ui/dist/Collapsible/CollapsibleTrigger.js` emits `type: _ctx.as === "button" ? "button" : void 0` and `as` defaults to `"button"`. Independently, `grep -rn "<form" web/src/components/{equation,visualization}` → **0**. Dead twice over. |
| **K-9** | The `lucide-vue-next` → `@lucide/vue` rename (C-5) carries **visual** drift, so the 35-site migration needs a screenshot gate. | **REFUTED — and this is good news for the F.W2 budget.** `lucide-vue-next@1.0.0/dist/esm/icons/chevron-right.js` and `@lucide/vue@1.20.0/dist/esm/icons/chevron-right.mjs` carry byte-identical geometry: `["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]`. The rename is a specifier sweep, not a visual migration. |
| **K-10** | Importing the glass-ui **root barrel** (`:2`) drags glass-ui's icon runtime and its optional peers (value.js / keyframes.js / pencil-boil) into this leaf's graph, making C-1's peer violation reachable from this file. | **REFUTED.** `grep -rlE 'from"@mkbabb/(value\.js\|keyframes\.js\|pencil-boil)"' dist/*.js` → **0** — glass-ui 4.0.0's shipped dist statically imports none of its `@mkbabb/*` optional peers. Combined with `sideEffects: ["*.css"]`, the root barrel is shakeable. C-1 remains a **manifest**-level blocker, not a graph-level one reachable from `:2`. |

**New measurement supporting C-5** (net-new, no first-pass counterpart): glass-ui 4.0.0 does not import
`@lucide/vue` at runtime at all — it has **vendored** the icon factory into its own dist
(`dist/createLucideIcon-DydS2qgk.js`, 1 775 B, whose source regions read
`//#region node_modules/@lucide/vue/dist/esm/Icon.mjs`), and **14** dist chunks import that vendored
module. Meanwhile `@lucide/vue@1.20.0` sits installed (to satisfy the declared required peer) and
**unimported**. So the graph carries three lucide surfaces — fourier's bundled `lucide-vue-next`,
glass-ui's vendored copy, and a dead installed `@lucide/vue`. This does **not** raise C-5's severity (the
vendored factory is 1.8 KB and the geometry is identical per K-9); it does mean the producer's own peer
declaration is decorative, which belongs in the **CS-2** glass-ui BH relay.

---

## §11.4 · Second-pass carries

| id | to | ask |
|---|---|---|
| **CS-7** | **F.W3** | Gate `:26`'s `behavior` on `prefers-reduced-motion` (or delete the JS scroll in favour of `scroll-margin-block-end` + CSS `scroll-behavior`). N-1. This is the cheapest row in the whole challenge — one expression — and it is the only one with an accessibility consequence. |
| **CS-8** | **F.W3** (fold into CS-3) | Give the wrapper a `variant` prop and a `#title` slot so `ContourSettings.vue:255-307` can be re-homed onto it, and forward `disabled` / `unmountOnHide` explicitly. N-4 + N-5. |
| **CS-9** | **F.W2 (doc sweep)** | Correct the two prose citations of `@mkbabb/glass-ui/styles/animations.css` (`CollapsibleSection.vue:58`, `ContourSettings.vue:358`) to the reachable specifier `@mkbabb/glass-ui/styles`. N-3. Cheap, and the current text will send the next reader into `ERR_PACKAGE_PATH_NOT_EXPORTED`. |
| **CS-10** | **glass-ui BH inbox** (fold into CS-2) | glass-ui 4.0.0 declares `@lucide/vue ^1.16.0` as a **required, non-optional** peer while its shipped dist imports it **zero** times (the factory is vendored). Either drop the peer or stop vendoring; a required peer nobody imports is a resolution tax on every consumer. |
| **CS-11** | **F.W3 / this audit's ledger** | Record that **§6 S-4 is WITHDRAWN** (N-1). Any downstream roll-up that counts this component's superlatives should read **4**, not 5. |

---

## §11.5 · Second-pass method + limits

- Read whole, cold, before any corpus read: `CollapsibleSection.vue` (72 lines) and every file it imports
  — `glass-ui/dist/collapsible.js`, `dist/components/ui/collapsible/{Collapsible,CollapsibleTrigger,CollapsibleContent,index}.d.ts`,
  `dist/styles/index.css`, `dist/styles/animations.css`, `dist/styles/tokens.css`,
  `dist/styles/tokens/scheme-motion.css`, `dist/createLucideIcon-DydS2qgk.js`,
  `reka-ui/dist/Collapsible/CollapsibleTrigger.js`, `lucide-vue-next` + `@lucide/vue` `chevron-right`,
  and the glass-ui + fourier `package.json`s. Then all four callsites and their mount contexts
  (`ContourPreview.vue`, `EqCoefficientsPanel.vue`, `FunctionInput.vue`, `EquationView.vue`,
  `VisualizationView.vue`, `App.vue`), the sibling fork (`ContourSettings.vue`), `src/style.css`,
  `vite.config.ts`, `web/Dockerfile`, `.github/workflows/ci.yml`.
- **Writes:** this file only. `/Users/mkbabb/Programming/fourier-analysis` and
  `/Users/mkbabb/Programming/glass-ui` were read-only throughout; the one `tsc` run and its tsconfig live
  in the session scratchpad and resolve the repo's `node_modules` through `compilerOptions.paths`, so
  nothing was emitted into either tree. `vue-tsc -b` was deliberately **not** run against the repo,
  because build mode writes `.tsbuildinfo`.
- No browser tooling. Second-pass UNPROVEN-NEEDS-LIVE additions for **CS-6**: (i) N-1's perceived scroll
  under OS reduced-motion; (ii) whether `main.scrollHeight > main.clientHeight` on `/v/:slug` — if it is
  not, C-4's `:26` is entirely inert at the `ContourPreview` callsite, which would sharpen C-4 from
  mis-gated to dead; (iii) whether Vue's scope-id propagation actually reaches the content root two
  component layers down (glass-ui `CollapsibleContent` → reka `CollapsibleContent` → `Primitive`), on
  which **all** of `:54-71` — the clip, both animations, and the reduced-motion guard — depends.
- Substrate re-confirmed at the same coordinate the first pass used: fourier HEAD `cd26c65`
  (`lane-fourier-r3-r6.md` **R4-9**). `wc -l` → 72. No line number above was inferred; every one was read.
