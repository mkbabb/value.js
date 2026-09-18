claude-opus-5[1m]

# CHALLENGE · EditorShell · axis L (LIBRARY) — **r2 (superseding)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorShell.vue` (261 L: 110 template · 86 script · 62 style)
**Mode** static, read-only. No installs, no dev server, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Substrate** keyframes.js `master` @ `8281638c fix(demo-shell): provide tooltip context for the routed control group`; glass-ui producer read via `git show`/`git log` only.
**Date** 2026-08-04.

> **r2 note — nothing lost.** An r1 pass already occupied this path (13 defects · 2 blockers · 5 superlatives · 7 cleared-in-flight). r1 was sound; every one of its 13 findings was independently re-probed here and **all 13 survive** — they are carried below with their original ids so cross-references keep working (§2), condensed to claim + evidence + falsifier-verdict. r1's §4 kills are honoured (§5): two of my own candidates died on C-4 and C-6 and are **not** re-raised. r2's contribution is the **delta in §1**: four new findings (L-14…L-17), one extension to L-4, and — the payload — a producer-evidence resolution of the L-1/L-2 branch r1 explicitly left open.

**Import graph read whole (read-only):** the target; `utils/iosTextEntry.ts`; `shell/{SharePopover,EditorStartScreen,KeyboardShortcutsModal}.vue` + `useShareState.ts`; `transport/AnimationControlsGroup.vue`; `transport/transportSource.ts`; `transport/controls-pane/ControlsPaneWrapper.vue`; `app/{App.vue,main.ts}`; `app/dock/MbabbMenu.vue`; `state/hashSharing.ts`; `components/instrument/{index,shell/index,transport/index}.ts`; `components/instrument/surfaceTabs.ts`; `styles/{style,layout}.css`; `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `.github/workflows/ci.yml`; glass-ui installed `dist/{header-ribbon.js,keyboard.js,tooltip.js,createContext-*.js}`, `dist/components/header-ribbon/{types,index,HeaderRibbon.vue}.d.ts` + `styles.css`, `dist/styles/{index,transitions}.css`; glass-ui producer `src/components/header-ribbon/*` at HEAD, `v7.0.0`, `v6.0.0`, `4e8c6387`, `47774fe5`, `490cc46e` + `docs/consumer-evidence/header-ribbon.md`; built artifact `dist/gh-pages/assets/*` (gitignored, corroboration only).

**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom dep, RED) — re-verified and extended in L-2/L-4; **S-2** (type-only `/tabs`, `EditorShell.vue:126` is one of its three cited sites) — confirmed; roster §4 (EditorShell 261 L, `G`) and §6.4/§6.3 (9 `@keyframes`, 98 demo tokens) — consistent. `lane-library.md` §5 (100% external tests) and §7.4 (dual-path/duplicate-name hazard) — the demo-tier analogue is recorded at L-15. **Zero contradictions of either lane were found.**

---

## 0. Headline

| # | Finding | Sev | live? | prov |
|---|---|---|---|---|
| **L-1** | Three primary header controls (Share · Shortcuts · Dark-mode) render `inert` + `aria-hidden="true"` + zero-width by default; EditorShell binds no `#anchor` ⇒ **no keyboard route, no touch route** to any of them | **BLOCKER** | working tree + every build from it | r1, **branch closed in r2** |
| **L-2** | glass-ui is absent from `package.json` **and** `package-lock.json` while a structurally different `HeaderRibbon` sits installed as `7.0.0`; the artifact is unpinnable in both directions | **BLOCKER** | LIVE | r1 (F-1), extended r2 |
| **L-14** | The shell's default `#header-right` SharePopover cannot restore scenes — and reports success anyway | MAJOR | **LIVE** | **r2 NEW** |
| **L-16** | The static `AnimationControlsGroup` import defeats the lazy transport barrel; the whole transport subtree is entry-chunk resident and the barrel's async export has zero consumers | MAJOR | LIVE | **r2 NEW** |
| **L-15** | `#tabs-content` severs its scoped slot props; its two siblings forward theirs | MAJOR | LATENT | **r2 NEW** |
| **L-17** | The installed `HeaderRibbon` matches **no** producer revision — and `mode="persistent"` was once *correct* | MAJOR | LIVE | **r2 NEW** (sharpens L-2/L-3) |
| L-3 | `mode="persistent"` is a clean-break-deleted prop; lands as a stray DOM attribute on a `role="toolbar"` div | MAJOR | LIVE | r1 |
| L-4 | Nothing in the repo type-checks this file — and no merge-path job builds, lints or tests the demo at all | MAJOR | LIVE | r1, extended r2 |
| L-5 | Dead template ref + dead `defineExpose` (`:187`, `:197`) — zero readers repo-wide | MINOR | dead | r1 (+ producer corroboration) |
| L-6 | `const props = withDefaults(…)` (`:135`) never read; `superKey: undefined` a no-op default | MINOR | LIVE | r1 |
| L-7 | `#header-left`/`#header-right` unbound; the `#header-right` default is an all-or-nothing bundle | MINOR | LIVE | r1 |
| L-8 | The "standalone playground host" justifying five defaults **does not exist** | MINOR | LIVE | r1 |
| L-9 | `:key="superKey"` is a compensating full-subtree remount for a non-reactive store read | MINOR | LIVE | r1 |
| L-10 | Comment/tree drift inside a gate-exit rationale (`:229–246`): wrong owning file, two wrong token values | MINOR | LIVE | r1 |
| L-11 | `initIOSPlatformClass()` — app-bootstrap document mutation in a leaf `setup()`, per instance | INFO | LIVE | r1 |
| L-12 | Hidden ambient `TooltipProvider` requirement (mechanism UNVERIFIED) | INFO | LIVE | r1 |
| L-13 | `AnimationGroup<any>` erases the `V extends Vars` bound on a pure pass-through prop | INFO | LIVE | r1 |
| **S-1..S-6** | Six superlatives — L-18 runs both ways (§3) | — | — | 5 r1 + 1 r2 |

**Defects: 17 · Blockers: 2 · Superlatives: 6 · Cleared-in-flight: 7 (r1 §4, honoured)**

---

## 1. The r2 delta

### 1.0 — The L-1 / L-2 branch, closed with producer evidence

r1 ended L-2 with an open disjunction and could not decide it without an install:

> *"Install `@mkbabb/glass-ui@7.0.0` from the registry and `grep dist/header-ribbon.js` for `inert`. A hit means the installed copy **is** the published 7.0.0 … A miss means the on-disk copy is a stale pre-cut build … Either branch leaves at least one blocker standing; the two cannot both be discharged."*

The producer answers it in prose, without an install — `glass-ui/docs/consumer-evidence/header-ribbon.md:5-10`:

> `The collapsible mode, the anchor slot, mode, anchorLabel, HeaderRibbonMode, and HeaderRibbonAnchorSlotProps are DELETED clean-break (no alias; collapsible never shipped in a published release — it is cut pre-7.0.0).`

**Branch resolved: the second one.** The disclosure/pin machinery in `node_modules/@mkbabb/glass-ui/dist/header-ribbon.js` is, by the producer's own record, code that **no published release contains**. The installed tree therefore holds a pre-release build wearing the string `7.0.0` (dir mtime `Jul 16 05:17`).

**This does not discharge L-1 — it relocates and sharpens it:**

- L-1 is real for **the working tree and every build made from it**: the dev server, `npm run gh-pages` from this checkout, and the built artifact already on disk. Verified end-to-end at the *output* layer, not just the source: `dist/gh-pages/assets/index-CL_QYCiO.css` contains, verbatim,
  `header-ribbon:not([data-expanded]) .header-ribbon__actions{opacity:0;pointer-events:none;max-inline-size:0}`.
- The escape hatch — "just install the real 7.0.0" — is **closed by L-2 itself**. There is no lockfile entry to install from (`grep -c "glass-ui" package-lock.json` → 0), so no reproducible build exists in which L-1 is absent.

Net: the blocker count is unchanged at two, but the causal order is now settled — **L-2 is the root; L-1 is what L-2 currently produces.** Fixing L-2 (declare + lock) is *also* the mechanical fix for L-1, provided the pinned version is ≥ the `4e8c6387` cut. That is a materially better remediation story than r1 could offer, and it comes from evidence rather than an install.

*Falsifier for the resolution:* a registry probe showing a published `7.0.0` tarball that **does** contain `inert` in `dist/header-ribbon.js` — which would falsify the producer's own consumer-evidence doc, and would make L-1 unconditional (worse, not better). Not runnable under lane law; recorded as the one open probe.

---

### 1.1 — L-14 · MAJOR · **LIVE** — the shell's own Share popover cannot restore scenes, and reports success anyway

`EditorShell.vue:19-20` — the default `#header-right` fill:

```vue
<slot name="header-right">
    <SharePopover />
```

`SharePopover.vue:56-61` needs a callback to do half its job:

```ts
const props = defineProps<{ onSceneRestore?: (sceneId: string) => void }>();
const { sharePopoverOpen, loadHashInput, shareState, loadFromInput } = useShareState(props.onSceneRestore);
```

`useShareState.ts:75-86` — the navigation is conditional, the success report is not:

```ts
const result = restoreStateFromParam(stateParam);
sharePopoverOpen.value = false;
if (result.activeScene && onSceneRestore) { onSceneRestore(result.activeScene); }   // ← skipped
toast.success("State restored!", { duration: 3000, description: "Animation state loaded from shared URL." });
```

And the state layer explicitly refuses to compensate — `demo/state/hashSharing.ts`:

```ts
/** Restore state from a base64-encoded state param string.
 *  Caller is responsible for URL cleanup (the router owns the URL). */
export const restoreStateFromParam = (stateParam: string): { restored: boolean; activeScene?: string } => { … }
```

It writes `applySharedAnimationState` / `applySharedControlState` and **returns** `activeScene` for the caller to act on. Nothing downstream navigates.

The app therefore ships two Share affordances with different capabilities:

| mount | wiring | can restore the shared scene? |
|---|---|---|
| `MbabbMenu.vue:9` (dock) | `<SharePopover :on-scene-restore="onSceneRestore" />` ← `App.vue:23` `runSceneSwitch` | **yes** |
| `EditorShell.vue:20` (header ribbon) | `<SharePopover />` | **no** |

**Failure scenario (concrete):** user is on `spring`; pastes a share URL captured on `cube` into the ribbon popover; presses ⏎. `cube`'s options *and* controls are written into the stores, `sharePopoverOpen` closes, the toast reads *"State restored! — Animation state loaded from shared URL."* — and the app stays on `spring`, rendering `spring`'s superKey-keyed controls. The restored state is invisible and the success report is false. (Worse under L-9: the transport subtree is keyed by `superKey`, so nothing even remounts to hint that something changed.)

**Falsifiers, all run:**
- *App.vue overrides `#header-right`* — it supplies `#backdrop`(:45), `#start-screen`(:49), `#tabs-trigger`(:53), `#tabs-content`(:61), `#ribbon-content`(:65), `#target`(:73). No `#header-*`. The default fill is what renders. ✗
- *`restoreStateFromParam` navigates internally* — read above; it does not, by docstring and by body. ✗
- *A router-level `?state=` reconcile picks up the slack* — `useSceneMachineRouterBinding` owns the `?anim=` projection and the first-load seed; this path writes stores directly and never touches the route (`useShareState.ts:75`, no `router` call on the restore leg — contrast `:35`, where the *share* leg does use `router.replace`). ✗
- *The ribbon popover is unreachable anyway, so the bug is masked by L-1* — **partially true, and it is the ugliest reading**: the one route that reaches it (mouse hover, §L-1) is exactly the route that reaches this bug. The finding stands independently: fixing L-1 without fixing L-14 promotes a silent no-op to a discoverable one.

**Smallest fix:** add `onSceneRestore?: (id: string) => void` to EditorShell and thread it to `:20` (App already holds `runSceneSwitch` and already passes it to the dock copy) — or delete the ribbon SharePopover and keep the dock as the single share seat.

---

### 1.2 — L-16 · MAJOR — the static import defeats the lazy transport barrel; measured entry-chunk residency

`EditorShell.vue:120`:

```ts
import AnimationControlsGroup from "@components/instrument/transport/AnimationControlsGroup.vue";
```

`components/instrument/transport/index.ts:1-11` exists to prevent precisely this:

> `The transport instrument barrel (T.F5). Heavy SFCs are re-exported LAZILY via defineAsyncComponent so importing this barrel never eager-loads the control facility's downstream Monaco/highlight.js chunk`
> `export const AnimationControlsGroup = defineAsyncComponent(() => import("./AnimationControlsGroup.vue"));`

and the umbrella above it restates the guarantee (`components/instrument/index.ts:16-19`):

> `Every heavy member re-exports its SFCs LAZILY (defineAsyncComponent), so importing this umbrella never eager-loads the Monaco / highlight.js chunk`

`shell/index.ts:1` exports `EditorShell` **eagerly**, and EditorShell statically imports the SFC — so the umbrella's guarantee is void through the shell leg, and `transport/index.ts:8`'s async export has **zero consumers**: `grep -rn AnimationControlsGroup demo/` shows `EditorShell.vue:120` as the sole component importer; nothing imports the transport barrel except the umbrella's `export *`, and nothing imports the umbrella.

**Measured** (`dist/gh-pages/assets/`): the entry chunk `index-B2hcFaCm.js` contains `AnimationControlsGroup`'s scoped class token `controls-layout--stage-`, and no `AnimationControlsGroup-*.js` / `ControlsPaneWrapper-*.js` / `TransportDock-*.js` chunk exists (the split chunks that *do* exist are `KeyframeTimeline`, `KeyframesStringControls`, `CSSCodeEditor`, and the scene shells). So the transport subtree — `AnimationControlsGroup` 336 + `ControlsPaneWrapper` 319 + `ChannelControls` 456 + `ChannelOptions` 609 + `TransportDock` 403 + `RibbonBar` 151 + `KfPillTabs` 124 + `LayerConfigPanel` 92 + `TimingFunctionPanel` 166 lines (lane-frontend §4), plus glass `Drawer` and `EasingPicker` — is first-paint resident.

On `home` the shell renders **neither** consumer of it: `hasControlSurfaces` is `false` (`App.vue:35`; `derivedSurfaces` → `[]` on home) so `ControlsPaneWrapper` is `v-if`-skipped, and `transportNames` is `[]` (`AnimationControlsGroup.vue:98,181-183`) so `TransportDock` is skipped. The landing route pays for the whole instrument and mounts none of it.

**Explicitly NOT claimed:** this is *not* a "Monaco is eager" finding. `ChannelControls.vue:252-253` keeps `KeyframesStringControls` and `KeyframeTimeline` behind `defineAsyncComponent`, and the built tree confirms `vendor-monaco-*.js` (2.4 MB) is its own chunk. The barrel's Monaco rationale is belt-and-braces; what is actually lost is the transport tree. Overstating this would be the false defect.

**Falsifiers:** (a) the async barrel export having any consumer → none; (b) the entry chunk not containing it → it does; (c) the subtree being trivial → ~2 700 lines. **Caveat, stated:** `dist/` is gitignored and this build is dated Jul 16, so it *corroborates* rather than proves today's HEAD. The source-level claim stands without it — a static import from an entry-reachable module cannot be code-split absent a manual chunk rule, and `vite.config.ts` declares none for it.

---

### 1.3 — L-15 · MAJOR (LATENT) — `#tabs-content` severs its scoped slot props

`EditorShell.vue:88-102`:

```vue
<template #tabs-trigger="slotProps">  <slot name="tabs-trigger"  v-bind="slotProps"></slot> </template>   <!-- forwards -->
<template #tabs-content>              <slot name="tabs-content"></slot>                      </template>   <!-- DROPS  -->
<template #ribbon-content="slotProps"><slot name="ribbon-content" v-bind="slotProps"></slot> </template>   <!-- forwards -->
```

The props exist and are alive one hop down — `ControlsPaneWrapper.vue:77-85`:

```vue
<template #tabs-content>
    <slot name="tabs-content" :selected-animation="storedControls.selectedAnimation" :is-playing="isPlaying"></slot>
</template>
```

and `AnimationControlsGroup.vue:41-43` forwards them intact (`v-bind="slotProps"`). **EditorShell is the only hop that drops them — and it is the public one** (`shell/index.ts:1` barrels it).

The docblock immediately above the affected prop names the use case that needs them (`EditorShell.vue:164-167`):

> `The playground supplies the Assets tab here AS DATA + renders its panel via the tabs-content slot (gated on the active surface)`

`selectedAnimation` — the gate input — is exactly what line 93 severs.

**Blast radius, reported against myself:** `App.vue:61-63` does not bind them either, and it is the sole host (L-8). **The live consequence today is zero.** Graded MAJOR for the contract asymmetry on a barrel-exported component, not for present breakage; a reader should treat it as an API defect, not an outage. Fix is `="slotProps"` + `v-bind="slotProps"` on one line.

---

### 1.4 — L-17 · MAJOR — the installed `HeaderRibbon` matches **no** producer revision, and `mode="persistent"` was once correct

r1's L-3 establishes that `mode` is absent from `HeaderRibbonProps` in both artifacts it compared. The history adds two facts r1 did not have, and they change the reading of the line.

| revision | `mode` prop | collapse gate | `anchor` slot | shape |
|---|---|---|---|---|
| producer `v6.0.0` | — | yes (`isVisible`, `hideTimeoutMs`) | yes | Tailwind utilities, `left` slot |
| producer `490cc46e` / `47774fe5` (Glass-7 era) | **`mode?: "persistent"` \| `mode: "collapsible"`** | `isVisible = !isCollapsible \|\| pinned \|\| pointer \|\| focus` | yes | BEM + `Surface` |
| producer `4e8c6387` / `v7.0.0` / HEAD | — (cut, breaking) | **none** | **none** | BEM + `Surface`, persistent-only |
| **installed `node_modules` (labelled 7.0.0)** | **—** | **yes, with no persistent disjunct** | **yes** | BEM + `Surface` |

Two consequences.

1. **`mode="persistent"` was correct and load-bearing** against `490cc46e`-era glass-ui: `git show 490cc46e^…` — sorry, `git show 4e8c6387^:src/components/header-ribbon/types.ts` — declares `mode?: "persistent"` with the doc *"Keeps the action row available without a disclosure control"*, and `isVisible = !isCollapsible || …` made it always-visible. EditorShell:16 is not a careless prop; it is a **fossil of a contract that was cut underneath it** (`4e8c6387 refactor(header-ribbon)!: cut the collapsible mode; the ribbon is persistent-only`). That reframes L-3 from author error to unpinned-dependency drift — and reinforces L-2 as the root.
2. **The installed artifact matches nothing.** It has no `mode` (so it is post-types-cut) but retains the collapse gate *with the persistent disjunct removed* (so it is pre-`4e8c6387`) — a combination that appears at no tag and no commit touching that file (`4e8c6387`, `47774fe5`, `490cc46e`, `ae5bbb1e`, `bed0a122`, `9a8761f0`, `v6.0.0`, `v7.0.0` all probed). It is the one shape in which a caller can never obtain an expanded ribbon by any prop.

**Falsifier:** a producer commit whose `HeaderRibbon.vue` has no `props.mode` **and** a collapse gate **and** an `anchor` slot. None on `master`. Survives, with the honest caveat that the probe covers `master` only — a tarball built from an unmerged branch would explain it, and would be the same finding with a different name.

---

### 1.5 — L-4, extended: the merge path never sees the demo *at all*

r1 established that nothing type-checks this file. The CI topology adds why nothing else catches it either — `.github/workflows/ci.yml` + `vitest.config.ts`:

- the **merge-path** job (`gates`, on every PR/push) runs `npm ci` → `check:lib` → `build:lib` → `test:lib` → `proof:publish`. `check:lib` is `tsc -p tsconfig.lib.json` (**src/ only**). `test:lib` is `vitest run --project library`, whose project config **excludes `test/demo/**`** (`vitest.config.ts:41-48`) — so the 26 demo test files never run on merge either. **The demo is not built, not type-checked, not linted (`lint` = `depcruise src`) and not tested on the merge path.**
- the demo build lives in `demo-correctness`, gated `if: schedule || workflow_dispatch`, after its own `npm ci` — which, per L-2, has no glass-ui to install.
- `deploy-pages.yml` gates on that workflow's conclusion plus a `last-demo-green` tag, so a red nightly silently freezes the site at the last green SHA rather than reporting a break.
- the workflow header concedes the ownership gap outright (`ci.yml:6-7`): *"The producer library graph has no Glass dependency; the later demo-consumer commit owns that registry edge."*

Also confirmed for this file specifically: `grep -rln "EditorShell\|HeaderRibbon" test/` → **0**. The blocker has no test, in a repo with 1 051 test cases.

---

## 2. Carried from r1 — re-probed, all 13 survive

Condensed; r1's reasoning stands and is not restated. Every falsifier below was re-run in r2.

| id | claim | key evidence | falsifier verdict (r2 re-probe) |
|---|---|---|---|
| **L-1** | ribbon actions `inert` + `aria-hidden` + `max-inline-size:0` + `opacity:0` + `pointer-events:none` by default; empty 0×0 `#anchor`; touch `pointerenter` discarded (`pointerType !== "touch"`); `inert` ⇒ `focusin` unreachable ⇒ keyboard route circular | `dist/header-ribbon.js` render fn + `dist/components/header-ribbon/styles.css`; **and the built `index-CL_QYCiO.css`** | demo override → none (`grep -rn header-ribbon demo/` = 5 hits, all EditorShell); `#anchor` bound → none; producer-tree resolution → `node_modules` is a real dir, no vite alias. **survives; branch closed §1.0** |
| **L-2** | glass-ui in neither `package.json` nor `package-lock.json`; installed 7.0.0 ≠ producer 7.0.0 | `grep -c glass-ui package.json package-lock.json` → 0/0; `ls -l node_modules/@mkbabb/` → 3 real dirs, no symlinks | survives; **root cause of L-1, L-3, L-17** |
| **L-3** | `mode="persistent"` is a deleted prop; `inheritAttrs:false` + attr spread ⇒ stray `mode="persistent"` on `div[role=toolbar]` | `types.d.ts` has 3 members; `grep -c mode dist/header-ribbon.js` → **0** | survives; **re-framed by L-17** (drift, not author error) |
| **L-4** | no `vue-tsc` anywhere; `tsc` cannot read `.vue` | `ls node_modules/.bin` → `tsc`, `vue-demi-*` only; `grep -rn vue-tsc` → nothing | survives; **extended §1.5** |
| **L-5** | dead `useTemplateRef` + dead `defineExpose` | `grep -rn headerRibbonRef demo/ test/` → 3 hits, all in-file | survives; independently corroborated by `glass-ui/docs/consumer-evidence/header-ribbon.md` calling it "a **dead** …" |
| **L-6** | unused `props` binding (`:135`); `superKey: undefined` a no-op default (`:172`) | sole occurrence of the identifier in the file; sibling `AnimationControlsGroup.vue:140` uses the 3.5 reactive-destructure idiom | survives |
| **L-7** | `#header-left`/`#header-right` unbound; the default is an indivisible bundle (overriding it silently drops dark-mode **and** the shortcuts trigger) | `grep -rn "#header-left\|#header-right" demo/` → declarations only | survives |
| **L-8** | the "playground" host does not exist | `find demo -iname "*playground*"` → nothing; 7 prose hits; `EditorShell` instantiated once (`App.vue:28`); demo unpublished (`files: ["dist", …]`) | survives; **L-15 + L-19-adjacent** — see the dead `extraTabs` chain note below |
| **L-9** | `:key="superKey"` is a compensating remount for a non-reactive store read | `AnimationControlsGroup.vue:176` reads the store once at setup; `App.vue:229` writes the reactive form of the same expression | survives |
| **L-10** | gate-exit rationale cites the wrong file and two wrong values | `:231` says `design-idioms.css`, tokens live at `layout.css:32-35`; `:234`/`:247` say 12%, tree says 11%; `:241` says 5%, tree says 3% | survives (`grep -rn -- "--graph-" demo/styles/` → `layout.css` only) |
| **L-11** | `initIOSPlatformClass()` in a leaf `setup()`, per instance | sole call site; `main.ts` owns every sibling global (cascade `:18`, font decode, engine warm, LoAF) and never calls it | survives |
| **L-12** | ambient `TooltipProvider` requirement, undeclared | `:30-43` renders `Tooltip*` with no provider; child self-provides (`AnimationControlsGroup.vue:2`); HEAD is `8281638c fix(demo-shell): provide tooltip context…` | survives as INFO; mechanism still **UNVERIFIED** — glass-ui's `createContext` ships both a throwing `use()` and a tolerant `useOptional()` (`dist/createContext-BhkE9mLH.js`), and `dist/tooltip.js` is a pure re-export from a minified chunk. Claiming "throws" would be a false defect. |
| **L-13** | `AnimationGroup<any>` erases `V extends Vars` | 13 sites tree-wide; EditorShell is a follower, and this is its **only** value taken from the library under test | survives |

**Dead `extraTabs` chain (folded into L-8, not counted separately).** `EditorShell.vue:161-169` + `:178` + `:84` head a four-hop prop chain (`EditorShell → AnimationControlsGroup:173 → ControlsPaneWrapper:198 → ChannelControls:65`) with **zero suppliers**: `grep -rn "extra-tabs\|extraTabs" demo/ test/` returns only the declaration/forward hops and the unrelated dock-side `extraTabsFrom` helper. `App.vue` feeds `machine.extraControlTabs()` to **ChromeDock**, never to the shell. Three of the four hops carry a present-tense docblock describing the host L-8 proves absent.

⚠ *Adjacent, recorded for a fix wave (not EditorShell's, and not counted):* `extraTabsFrom` resolves at **two** paths with different bodies — `demo/state/controlSurfaces.ts:189` and `demo/components/instrument/surfaceTabs.ts:21`. Same duplicate-name hazard shape lane-library §7.4 names in `src/`, reproduced in the demo tier.

---

## 3. Superlatives — L-18 runs both ways

**S-1 · `registerShortcut` consumed exactly right — no leak, no ceremony.** *(r1; re-verified)*
`:190` discards the returned unregister handle, which *looks* like a textbook teardown leak and is not. `dist/keyboard.js`: `return t() && n(l), l;` — `getCurrentScope() && onScopeDispose(unregister)`. Called from `<script setup>` ⇒ inside a component effect scope ⇒ auto-disposed on unmount. Passing `{ label, group }` additionally makes the shortcut self-register into the very modal it opens (`KeyboardShortcutsModal.vue:55` reads the same global registry through `useRegisteredShortcuts()`), so binding and discovery surface cannot drift. *Falsifier:* a non-scope-disposing registry would make the discarded handle a per-mount leak. Read the shipped implementation; it disposes.

**S-2 · Engine consumption is a pure, type-only pass-through.** *(r1)*
The shell's entire contact with the library under test is `:128 import type { AnimationGroup }`. It never constructs, plays, seeks or disposes — it forwards the reference down (`:77`) and the play-state up (`:85`, `:192-194`). In a demo where 68 files consume the engine, the outermost frame holding *no* engine state is the correct altitude, and it makes an engine leak impossible to originate here. *Falsifier:* any value-level kf import in this file — there is none, and `verbatimModuleSyntax: true` guarantees erasure.

**S-3 · The `dvh` fallback covers both axes, and says why.** *(r1; re-verified)*
`:208-221` — negative feature query, both elements that use the unit, and the spec fact that licenses the width leg written down (`a browser without dvh also lacks dvw (same spec)`). Most `dvh` fallbacks patch height and leave a half-corrected box. Specificity is also right: the scoped `.editor-shell[data-v-…]` rule is unlayered and outranks Tailwind's layered `.h-dvh`.

**S-4 · The `<main>` landmark correction records its own mechanism.** *(r1)*
`:67-74` rejects `display:contents` for the *correct* reason — it strips the box **and** the implicit `main` role from the a11y tree — and reproduces the prior geometry deliberately (`place-self-stretch` + `grid place-items-center`). Writing the mechanism at the site is what stops a well-meaning "simplify to `display:contents`" from re-landing. *Falsifier:* the a11y half is static-true; "byte-identical layout" is **UNPROVEN-NEEDS-LIVE**.

**S-5 · One rule set, two themes.** *(r1)*
`.grid-background` (`:238-259`) derives both tints from `--foreground` via `color-mix`, so the dark theme retints from the same four gradients — the duplicated dark data-URI died with its light twin, "no legacy beside the replacement". `feedback_no_backwards_compat` applied to CSS. *Falsifier:* a `.dark .grid-background` override — `grep -rn grid-background demo/` → this file only.

**S-6 · `#backdrop` is a paint-order contract that costs nothing when unused.** *(r2 NEW)*
`:5-14` places the slot **before** `.grid-background` in DOM order so a host-supplied wash paints over the `bg-background` field but **under** the graph-paper ink — "the wash tints the paper; the lines stay crisp" — and is empty by default: "*no layer, no cost*". The one host uses it exactly as specified and gates it (`App.vue:45-47`, `v-if="isHome"` → `<HeroAurora/>`), and `HeroAurora.vue:10` names this slot as its contract from the other side. An extension seam that states its invariant, is verified in use, and imposes zero cost when unfilled is rarer than it should be — and it is the correct counter-example to L-7, where the same file's *other* slot pair is an all-or-nothing trap.

---

## 4. Module size / Goldilocks

**Goldilocks-OK, unchanged from r1.** 86 script lines: one `ref`, one auto-disposed shortcut, one emit adapter, one type-only engine import. No god-module risk (lane-library §7.1's >400 LOC bar is not remotely approached), no fragment-shim smell (§7.2). ~95 of 261 lines (≈36%) are comment — dense and mostly load-bearing, but **three blocks now contradict the tree**: the `F.W15.S3` discoverability claim (L-1), the `J.W7a S4` gate-exit rationale (L-10), and the `BA.W-TABS` playground rationale (L-8/L-15). Two optional extractions exist (`.grid-background` → a demo idiom sheet; the header action row → `EditorHeaderActions.vue`, which would also dissolve L-7); neither is owed.

---

## 5. Cleared in flight — honoured from r1, plus r2's own kills

r1's §4 table (C-1 `fade-*` classes ship from glass-ui `transitions.css`; C-2 `icon-*` are demo `@utility`; C-3 `scale-on-hover` is glass `@utility`; C-4 the `--graph-pitch`/`--graph-major` fallback gap is cosmetic because the tokens resolve; C-5 `registerShortcut` does not leak; C-6 the duplicated `@styles/style.css` import is documented and deduped at `main.ts:16-17`; C-7 `defineExpose` of a `Ref` is fine via `proxyRefs`) is **adopted whole and not re-litigated**.

Two of r2's own candidates died on it and are therefore **not** raised as findings:

| r2 candidate | killed by |
|---|---|
| `background-size: var(--graph-major) …` has no fallback ⇒ IACVT ⇒ tiling collapses | **C-4** — `layout.css:32-33` defines both; the fallback asymmetry is cosmetic. Only the *drift* half survives, and it is already L-10. |
| `import "@styles/style.css"` (`:131`) duplicates `main.ts:18` — a leaf owning the app cascade root | **C-6** — deliberate and documented; Vite dedupes; the layering smell is already folded into L-8. |

Two further r2 candidates died on their own falsifiers and are recorded so a third pass does not spend the probe:

| r2 candidate | why it died |
|---|---|
| `registerShortcut("?")` never matches, because the combo parser cannot see a shifted `?` | `dist/keyboard.js` `d()`: `i = e.key.length === 1 && e.shiftKey && !t.shift` short-circuits the shift comparison for single-character keys, then `s === a` matches `"?"`. It works. |
| `<Transition name="fade" appear>` on `v-if="showStartScreen"` leaks the start screen's `AnimatedText`/`TypingDots` engine animations across the transition | The start screen is `v-if`-destroyed; `TypingDots`/`AnimatedText` own their own teardown, and EditorShell holds no engine handle at all (S-2). No shell-side leak surface exists. |

---

## 6. Verdict

EditorShell's **own logic** is small, correct, and leak-free: one ref, one auto-disposed shortcut, one emit adapter, a type-only engine touch. Nothing in its 86 script lines is wrong on its own terms, and four of its six superlatives are things most components get wrong.

Its **boundary** is where it fails, and r2 sharpens the shape of that failure rather than widening it. The root is **L-2**: an undeclared, unlocked dependency. From that root grow the fossil prop (L-3/L-17), the unreachable header controls (L-1), and the unreproducibility of any fix. Beside it sit three boundary defects that have nothing to do with glass-ui and would survive a perfect pin: a Share affordance that lies about success (**L-14**), a public slot that is quietly narrower than its two siblings (**L-15**), and a static import that voids the lazy barrier two barrels were written to hold (**L-16**). And **L-4** is why none of the seven is visible to any gate: no job in the repository builds, type-checks, lints, or tests this file — not one.

**Remediation order (dependency-respecting):**

1. **L-2** — declare `@mkbabb/glass-ui` at a version ≥ the `4e8c6387` cut and regenerate the lock. This is *also* the mechanical fix for L-1 and L-3, and nothing below is reproducible until it lands.
2. **L-4** — add `vue-tsc --noEmit` over `demo/`, and put the demo build (or at least `npm run check`) on the merge path. It surfaces L-3 and L-6 mechanically, and it is the only thing that stops the next drift.
3. **L-1 / L-17** — re-read the ribbon against the *pinned* artifact. If it is persistent-only, delete `mode` and close. If not, bind a labelled `#anchor` or move the three actions out of the ribbon. **Never ship a "persistent" claim against a collapsing component.**
4. **L-14** — one prop threaded from App, or delete the ribbon SharePopover. Independent of everything above.
5. **L-16, L-5, L-8/`extraTabs`** — pure subtraction: route through the async barrel (or delete that export as the dead code it is); delete the ref/expose trio; delete the four-hop dead prop chain and its three docblocks.
6. **L-15, L-6, L-7, L-9, L-10, L-11** — one line each.

---

## Provenance

Read-only throughout. No file in `/Users/mkbabb/Programming/keyframes.js` or `/Users/mkbabb/Programming/glass-ui` was written, mutated, staged, or executed; no installs, no dev servers, no browser tooling, no registry access. glass-ui producer history was read via `git show` / `git log` only. The single write of this lane is this file, which supersedes its r1 predecessor at the same path and carries all 13 of r1's findings, its 7 cleared candidates, and 5 of its 6 superlatives forward intact.

`dist/gh-pages/**` observations (L-1's built CSS, L-16's entry chunk) come from a **local, gitignored** build dated Jul 16; they are cited as corroboration of source-derived claims, never as repository state. Everything else is HEAD source, the installed `node_modules` artifact the demo actually compiles against, or producer git history.
