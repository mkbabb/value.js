# CHALLENGE-L — library structure under `PaletteCardMenu.vue` (PASS 5)

> Pass 5. The four predecessors are preserved verbatim:
> `challenge-L-library.pass-1-2026-07-28.md` (HEAD `32b4040e`),
> `challenge-L-library.pass-2-2026-07-28.md` (HEAD `e79fcd43`),
> `challenge-L-library.pass-3-2026-07-28.md` (HEAD `9268f054`),
> `challenge-L-library.pass-4-2026-07-28.md` (HEAD `9268f054`).
>
> Worked **blind**, as passes 3 and 4 were: I traced the import cone, ran a whole-tree import-graph
> census and my browser probes, and only then read the four predecessors. Contribution: **five new
> findings (L-26…L-30)**, **one correction that overturns a pass-4 negative result**, and the first
> measurement in this series of the thing the challenge premise names most directly — **the repo's
> own ratified import-direction lattice, which no prior pass cites, and which the demo violates 28
> times.**

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
matches the explicit declaration this seat was spawned with. The seat is **DECLARED, not inherited**;
no defect on the receipt axis.

## Substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD `d19da6d3`** — the commission names `c654824e`; the branch has now moved five times under
  five passes. Every file:line below is against `d19da6d3`:
  ```
  $ git log --oneline -1
  d19da6d3 docs(V·mega): 3:30am wall harvested — 233/243 axes banked; both bands re-resumed
  ```
- `PaletteCardMenu.vue` — 228 lines, unchanged since pass 1.
- `vue-tsc -p tsconfig.demo.json --noEmit` → clean (no output). Nothing below is a red build.
- Dev server live at `http://localhost:9000`.
- New probe: `probe-L5-lattice.mjs` (+ `probe-L5-lattice-results.txt`) — the whole-`demo/` import-graph
  census against `ARCHITECTURE.md:50-56`.

**Verdict: DEFECTIVE.** Carrying the standing record (3 BLOCKERs, 10 MAJORs, 7 MINORs, 2 INFOs from
passes 1–4) plus **four new MAJORs, one new MINOR**, and one correction.

---

## Part I — correction to the standing record

### C-6 — pass 4's negative result *"**Feature → shell direction** — no upward import"* is **false**, and the counterexample is inside this component's own feature

Pass 4 closed its negative-results block with:

> "**Feature → shell direction** — no upward import. `platform/transport` is *below* the feature; the
> defect there is altitude (pass 3 L-18), not direction."

The first clause is wrong. `demo/palettes/` — the feature that owns the subject component — imports
from `demo/shell/`:

```
demo/palettes/usePalettePorts.ts:19:import type { ViewId } from "../shell/useViewManager";
```

and it is not the only one. Two more features do the same:

```
demo/picker/ColorPicker.vue:130:import { VIEW_MANAGER_KEY } from "../shell/useViewManager";   ← VALUE import
demo/picker/ColorPicker.vue:131:import { COLOR_TARGET_PORT_KEY } from "../palettes/usePalettePorts";
```

**Honest qualification:** the `palettes → shell` arm is `import type`, so `verbatimModuleSyntax`
erases it at runtime and the *emitted* graph stays acyclic there. The `picker → shell` arm at
`ColorPicker.vue:130` is a **value** import of an injection key and is not erased. So: one type-only
upward edge and one runtime upward edge, from two different features. The negative as stated —
"no upward import" — does not survive either.

Pass 4 checked the direction from *this file's* cone, where it is genuinely absent (see my Negative
results). It generalised a leaf-scoped observation to the tree. The census in L-26 is what a
tree-scoped claim requires.

---

## Part II — new findings

### L-26 — MAJOR — the repo has a **ratified, written import-direction lattice**; no pass in this series cites it; the demo violates it **28 times**

`docs/tranches/V/ARCHITECTURE.md:48-58` is not commentary — it is the tranche-V architecture of
record, and it fixes the demo's module lattice as a closed relation:

```text
app           → shell / color-session / feature / platform / shared
shell         → color-session / platform / shared
feature       → color-session / own descendants / platform / shared / published packages
color-session → platform / shared / published packages
platform      → shared / external packages
shared        → external packages
```

> `ARCHITECTURE.md:58` — "**Cross-feature internal imports are forbidden by construction.** …
> Palette transport, DTO, cache and operation semantics stay in `palettes/`, while only generic
> auth/HTTP primitives live in platform. … When two live consumers need another semantic object, it
> is promoted once; superficial similarity does not earn a shared home."

`grep -c ARCHITECTURE` across passes 1–4 → **`0, 0, 0, 0`**. Four passes argued about module
ownership from first principles while a ratified answer sat unread. Every prior finding on this axis
— pass 2's Amendment 2 ("`PaletteCard` must stop being one component"), pass 1's L-2 (the dead
eslint boundary), pass 4's L-24 (the flat drawer) — is a rediscovery of a rule that is already law.

I resolved every relative import in `demo/` to its area and classified each cross-area edge against
that relation (`probe-L5-lattice.mjs`; areas = the nine top-level `demo/` directories, roles per the
lattice, `picker|palettes|workbenches|scenes` = `feature`):

```
=== VIOLATIONS of ARCHITECTURE.md:50-56 ===

17x  feature(workbenches) -> feature(palettes)
      demo/workbenches/mix/MixSourceSelector.vue:8    <- ../../palettes/browser/card      (internal UI barrel)
      demo/workbenches/mix/MixSourceSelector.vue:6    <- ../../palettes/usePalettePorts   (injection keys)
      demo/workbenches/mix/MixSourceSelector.vue:10   <- ../../palettes/types
      demo/workbenches/extract/composables/useExtractSession.ts:17 <- ../../../palettes/usePaletteStore   (a STORE)
      demo/workbenches/extract/ExtractWorkbench.vue:200 <- ../../palettes/browser/card
      demo/workbenches/generate/GenerateControls.vue:16 <- ../../palettes/browser/card
      demo/workbenches/mix/composables/useMixingState.ts:21 <- ../../../palettes/mix       (domain logic)
      demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:27 <- ../../../palettes/usePalettePorts
      … 9 more

 5x  shell(shell) -> feature(palettes)          ← all five are SESSION_PORT_KEY; see L-27
 1x  feature(scenes)  -> app(color-picker)      demo/scenes/atmosphere/aurora-harmony-stops.ts:23
 1x  feature(picker)  -> app(color-picker)      demo/picker/ColorPicker.vue:129
 1x  feature(picker)  -> shell(shell)           demo/picker/ColorPicker.vue:130
 1x  feature(picker)  -> feature(palettes)      demo/picker/ColorPicker.vue:131
 1x  shell(shell)     -> feature(picker)        demo/shell/usePaneRouter.ts:21
 1x  feature(palettes)-> shell(shell)           demo/palettes/usePalettePorts.ts:19

TOTAL VIOLATIONS: 28
```

Three properties of that census matter more than the total:

1. **The violation is one-directional and localised.** Of the four feature areas, three emit **zero**
   cross-feature edges (`palettes → 0`, `scenes → 0`, and `picker` emits exactly 1). `workbenches`
   emits **17**. This is not an emergent property of the tree; it is one area's habit, and it is
   bounded enough to fix in one wave and lint thereafter.
2. **`palettes/` is clean as a source and dirty as a target.** The feature this component lives in
   imports across no forbidden edge except the single type-only `→ shell` arm (C-6). It is *reached
   into* 23 times. So the defect the challenge premise points at is not "this component imports
   wrongly" — it is "**this component's feature has no boundary**", and everything pass 2 and pass 3
   reproduced at `/#/mix` is that absence expressed at runtime.
3. **The four edges the challenge names by name are all present.** "feature → shell"
   (`ColorPicker.vue:130`, `usePalettePorts.ts:19`), "component → boot"
   (`ColorPicker.vue:129`, `aurora-harmony-stops.ts:23`), "demo → deep internal"
   (`MixSourceSelector.vue:8` → `palettes/browser/card`), and cross-feature reach (17×).

**Mechanism.** A lattice with no enforcement is a description, not a structure. Pass 1's L-2 proved
enforcement is absent; I confirm it independently and more sharply — `no-restricted-imports` resolves
to **`undefined`** on the subject file, and to a *single unmatchable pattern* on the one region that
still has a rule:

```
$ npx eslint --print-config demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue
no-restricted-imports = undefined

$ npx eslint --print-config demo/color-picker/App.vue
[2,{"patterns":[{"group":["@components/custom/palette-browser/**/*.vue"], …G-DEMO-3b…}]}]

$ ls -d demo/@                        →  No such file or directory
$ grep -n '@components' vite.config.ts tsconfig.base.json   →  (no output — the alias is gone)
```

The rules name `demo/@/components/**`, `demo/@/lib/**`, `demo/@/composables/**` and the
`@components/*` alias. W43/RF-15 deleted that entire tree and that alias. Zero files match two of the
three objects; the third matches 16 files and bans a path that can no longer resolve.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/PaletteCardMenu/probe-L5-lattice.mjs`
(deterministic, source-only, no browser). Full output in `probe-L5-lattice-results.txt`.

**Owner-edict violation:** #1 (`palettes/browser/card` and `palettes/usePalettePorts` are being used
as god-surfaces by foreign areas) and #3 (17 edges of contrivance where a purpose-built local surface
was the KISS answer).

**Cure.** Not a component split — a **lint that makes the ratified relation executable**. Four objects,
one per region, each a whole `no-restricted-imports` value (flat config resolves this rule
last-match-wins with no merge — `eslint.config.js:267-270` already documents that trap):

```js
{ files:["demo/palettes/**"],    ban:["**/picker/**","**/workbenches/**","**/scenes/**","**/shell/**","**/color-picker/**"] }
{ files:["demo/workbenches/**"], ban:["**/palettes/**","**/picker/**","**/scenes/**","**/shell/**","**/color-picker/**"] }
{ files:["demo/picker/**"],      ban:["**/palettes/**","**/workbenches/**","**/scenes/**","**/shell/**","**/color-picker/**"] }
{ files:["demo/platform/**"],    ban:["**/palettes/**","**/picker/**","**/workbenches/**","**/scenes/**","**/shell/**","**/color-session/**","**/color-picker/**"] }
```

Three of those four pass **today** (`palettes`, `scenes`, `platform` are already compliant modulo the
single type-only arm). Only the `workbenches` object fails, on 17 known edges. That makes the rule
adoptable immediately as a ratchet, with one area quarantined — the standard way to land a boundary
without a big-bang refactor. It is also the missing **completion gate** for pass 1's L-2 and pass 2's
Amendment 2: both propose the right end-state and neither names the check that keeps it.

---

### L-27 — MAJOR — `SESSION_PORT_KEY` has the wrong home: five shell modules reach **through a feature** for a `platform/auth` concept, and five of the port's seven members are pure platform re-exports

All five `shell → feature` edges in the census are the same import:

```
demo/shell/dock/Dock.vue:18                  import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
demo/shell/dock/DockViewSelect.vue:8         import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
demo/shell/dock/menus/ProfileSection.vue:14  import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
demo/shell/dock/menus/MobileMenuDropdown.vue:13 …same
demo/shell/dock/layers/SlugEditLayer.vue:5      …same
```

These are **value** imports (an `InjectionKey` symbol), not erasable. The lattice permits
`shell → color-session / platform / shared`. It does not permit `shell → feature`.

The port itself shows the concept is misfiled. `usePalettePorts.ts:126-135`:

```ts
// ── PORT 1 · Session — identity/auth surface ──
const sessionPort = {
    isAdminAuthenticated,   // ← useAdminAuth   (platform/auth)
    userSlug,               // ← useUserAuth    (platform/auth)
    userLogout,             // ← useUserAuth    (platform/auth)
    ensureUser,             // ← useUserAuth    (platform/auth)
    ensureSession,          // ← useSession     (platform/auth)
    onRegenerateSlug: migration.onRegenerateSlug,   // palettes-local
    onSlugSwitch:     migration.onSlugSwitch,       // palettes-local
};
```

and its own sources, three lines apart at `usePalettePorts.ts:5-7`:

```ts
import { useAdminAuth } from "../platform/auth/useAdminAuth";
import { useUserAuth }  from "../platform/auth/useUserAuth";
import { useSession }   from "../platform/auth/useSession";
```

**Five of seven members are verbatim re-exports of `platform/auth`.** `platform` is a legal target for
`shell`. So the dock is entitled to every member it actually uses — it is merely being routed through
a feature that adds two palette-specific members and a wrapper name. `ARCHITECTURE.md:58` calls this
exact case: *"only generic auth/HTTP primitives live in platform"* — session identity is that
primitive, and it has been annexed by the palettes feature.

**Reproduction:** the five greps above plus `usePalettePorts.ts:5-7,126-135` (facts, no runtime step).

**Cure (transposition).** Move the identity surface to its home. `platform/auth/useAuthPort.ts` mints
`AUTH_PORT_KEY` over the five platform members; `usePalettePorts` keeps `onRegenerateSlug` /
`onSlugSwitch` (genuinely palette-slug concerns) in the library port where the slug bar already lives.
The five dock imports become `../../platform/auth/useAuthPort`, and **5 of the 28 lattice violations
disappear without touching a component**. This is the cheapest violation in the census to retire and
the one that most clearly proves the lattice is right: the concept did not need promoting, it needed
un-demoting.

---

### L-28 — MAJOR — `palettes/usePalettePorts.ts` is a **bidirectional hinge** across a layer boundary: it type-imports *up* into shell while five shell modules value-import *down* into it

The two preceding findings meet in one file:

```
demo/palettes/usePalettePorts.ts:19  ──type──▶  demo/shell/useViewManager.ts     (ViewId)
demo/shell/dock/*.vue  (×5)          ──value──▶  demo/palettes/usePalettePorts.ts (SESSION_PORT_KEY)
```

`demo/shell/useViewManager.ts` imports only `vue`, `vue-router` and `./viewSchema` (lines 1-12), so
the **emitted** module graph is acyclic — the palettes arm is `import type` and
`verbatimModuleSyntax` erases it. I state that plainly because it is the difference between a
correctness bug and a structural one, and this is the structural one.

What is cyclic is the **typecheck program and the ownership story**: `shell` cannot be understood
without `palettes`, and `palettes` cannot be typed without `shell`. `usePalettePorts.ts:21-30`
describes itself as the cure for a god facade —

> "the RF-15 §b 6 dissolution of the old `usePaletteManager` god facade (153 L, ONE cross-everything
> injected blob) into FIVE narrow, feature-owned ports … no consumer injects a member outside the
> port it named."

The dissolution held *within* the feature and leaked *across* it. The file is 275 lines, wires 13
composables, provides 5 injection keys, and is imported by three of the four feature areas plus the
shell — **9 of the 28 lattice violations pass through this one module** (5 shell, 4 workbenches/picker).
A "narrow port" that four areas outside its own feature must import is the god facade wearing five
hats. Edict 1.

**Reproduction:** `probe-L5-lattice.mjs` output, plus the two greps in C-6 and L-27.

**Cure.** Two subtractions, both already implied by L-26/L-27:
`ViewId` is a shell vocabulary word — if palettes needs it, it is a `shared/` type or the port takes
the view as a parameter rather than naming shell's enum; and the session port goes home to
`platform/auth`. After both, `usePalettePorts` is imported by `demo/palettes/**` only, and the hinge
is gone. Nothing is added.

---

### L-29 — MAJOR — two features reach into **app-root boot**, which is the precise inversion the dead G-DEMO-1 rule was written to make impossible

```
demo/picker/ColorPicker.vue:129
    import { OVERTURE_KEY } from "../color-picker/composables/boot/useOverture";
demo/scenes/atmosphere/aurora-harmony-stops.ts:23
    import … from "../../color-picker/composables/boot/atmosphere-calibration";
```

`demo/color-picker/` is the `app` role — the router, `App.vue`, and `composables/boot/`. The lattice
runs `app → feature`; there is no `feature → app` arm. Both are **value** imports.

The repo knew this would happen. `eslint.config.js:288-292`, the G-DEMO-1 rule:

> ```js
> group: ["**/color-picker/**"],
> message: "G-DEMO-1: the shared color layer (demo/@/composables/color) must never import app-root
>           boot (demo/color-picker) — the spine is a clean lower layer."
> ```
> and its header comment, `eslint.config.js:262-264`: *"Wired **STANDING** so a future feature edit
> cannot silently re-invert the demo module graph."*

The rule's `files` glob is `demo/@/composables/**`, a directory that no longer exists (0 matching
files, §L-26). The graph re-inverted the instant the rule went dark, and it re-inverted into
`boot/` — the exact target the rule names. This is the strongest available evidence for L-26's cure:
the boundary was not merely undefended, it was defended, the defence rotted with a directory rename,
and the predicted regression landed.

**Reproduction:** the two greps above; the `--print-config` output in L-26 proves the rule is dead.

**Cure.** The `demo/picker/**` object in L-26's block bans `**/color-picker/**` and catches
`ColorPicker.vue:129` on the next lint run. The import itself is an injection key; `OVERTURE_KEY`
belongs beside the thing that is injected, in `shared/` or `color-session/`, not in the app's boot
directory — same shape of cure as L-27, one layer up.

---

### L-30 — MINOR — third independent reproduction of the nested `<button>`, this time on **organic** data, plus the enabled-Delete measurement

Passes 2 and 3 both reproduced the invalid nesting at `/#/mix` on **seeded** palettes. I reproduced it
on a palette that was already in the store when I arrived ("Sunset" — I seeded two rows, the list
rendered a pre-existing one), which removes the last "artifact of the probe" objection:

```js
// http://localhost:9000/#/mix → "Palettes" tab, read-only Playwright
document.querySelectorAll('button button').length          // → 1
// nested:          [{ inner: "Palette menu", outer: "Select palette Sunset" }]
// outerCardButtons:[{ label: "Select palette Sunset",
//                     innerInteractive: ["BUTTON:Palette menu"] }]
```

`MixSourceSelector.vue:246-268` wraps `<PaletteCard>` in `<button type="button" :aria-pressed>`.
`PaletteCard.vue:2-4` documents the rule being broken, in its own words:

> "button semantics on the card are omitted because inner interactive controls must be reachable —
> using article + click is the correct pattern for a card container that also houses nested
> interactive elements."

Opening that trigger on `/#/mix`:

```js
{ open: true, items: [{text:"Publish"},{text:"Rename"},{text:"Export"},{text:"Delete"}] }
// every one enabled: ariaDisabled null, dataDisabled null
```

**"Delete" is offered, enabled, on a route where the `delete` emit is unbound** —
`MixSourceSelector.vue:264-267` passes `:palette` and `:css-color` and binds **none** of
`PaletteCard`'s 17 emits (`PaletteCard.vue:200-218`). Pass 3 measured the same silence on Export;
Delete is the one that matters, because a destructive verb that silently no-ops is worse than one
that errors.

I add the **structural** attribution passes 2–4 did not make: this is not primarily a component-design
problem, it is violation #1 of the 17 in L-26. `MixSourceSelector.vue:8` is a forbidden edge into
another feature's internal UI barrel. Under the L-26 lint the import fails and the nesting, the four
dead items, the enabled Delete and pass 2's `isOwned` mis-render all become unreachable **at build
time** — one rule retires five runtime findings.

*(Corroborated but not re-reproduced this pass: pass 3's L-17 misconfigured-Publish. My live capture
shows the un-annotated enabled Publish — `… Publish <!--v-if--></div>`, `menuHasOffline: false` — but
the running server is the full local stack, so the state I observed is `unknown`/`available`, not
`misconfigured`. Pass 3's and pass 4's captures of the `misconfigured` frame stand as the authority.)*

---

## Part III — corroborations of the standing record

Everything below I derived independently before reading the predecessors; all of it is already
banked, and I record only the confirmation so the record shows convergence rather than a fifth
retelling:

| standing finding | my independent evidence |
|---|---|
| p1 L-1 — Export ships the legacy serializers | `usePaletteExport.ts:9` → `./export`; `export/serializers.ts:6-9` self-declares the sibling "legacy"; sole importer of `export/` is `demo/test/export/byte-exact.test.ts:23`; **and: `grep -rn "Export\|download" e2e` → 0 hits — the shipping export surface has no e2e coverage either** |
| p1 L-2 — the barrel-seam boundary is dead | `--print-config` → `undefined` (p1 recorded `null`); `demo/@` absent; `@components` alias absent |
| p1 L-3 — `action: [action: string]` erases the vocabulary; `copyAll` is dead | 17 emitted verbs vs 18 handled keys; `grep -rn copyAll demo src test e2e` → 1 hit, `PaletteCard.vue:294`; the miss path `if (!fn) return` at `:316` |
| p1 L-4 / p2 L-15 / p4 C-4 — `demo/ui/` is a 19-module alias layer | 19 dirs, 18 of them a single re-export line; `demo/ui/alert/index.ts:3-9` states the shim's back-compat purpose outright ("import from this barrel **unchanged**"); 48 barrel consumers vs 79 direct. **I make no byte claim** — p4 built both and measured 20,333 vs 20,337 B |
| p1 L-8 / p2 L-12 — the small-caps register has no home | 6 implementations (`PaletteCardMenu.vue:38`, `:58` inline `style=`; `AdminFlaggedPanel.vue:74` inline; `ApiOfflineChip.vue:45`, `DockStatusLamp.vue:52`, `ColorComponentDisplay.vue:203` scoped) while glass-ui ships `DropdownMenuShortcut` (typed at `dist/components/dropdown-menu/DropdownMenuShortcut.vue.d.ts`, `class?` prop) and it is re-exported by the very shim this file imports through, unused |
| p3 L-17 — the latch is a 4-member union read by one `===` | `availability.ts:41-45` (4 states) vs `PaletteCardMenu.vue:217`; `assertApiAttemptAllowed` (`:184-198`) throws synchronously on `misconfigured` and `markApiUnreachable` (`:169`) refuses to relabel, so the doomed set is `{unavailable, misconfigured}`; three readings exist, only `status-lamp.ts:44-62` is total |
| p2 (visibility) — 3-state domain, 2-state reader | `types.ts:40` (`public\|unlisted\|private`) + `:49` (`published`, a second field for one concept) vs `PaletteCardMenu.vue:222` `!== "private"`; `api/palettes.ts:130` confirms the flip leaves `unlisted` untouched |
| p2 L-13 / p4 L-22 — two spellings of one discriminator | `:94` `!palette.isLocal` vs `:16,:28,:49,:64,:74,:84,:134,:144,:153` `paletteKind === …`; equal by `utils.ts:23` |
| p4 L-21 — two slugify algorithms | `utils.ts:3` (NFKD) vs `export.ts:9` (no normalisation) vs `export/canonical.ts:54` `identifierPrefix` (contract, never ships) |
| p4 L-24 — `types.ts` spans four domains | 12 interfaces; `PaginatedResponse:125` / `CursorPaginatedResponse:132` are generic HTTP envelopes inside a feature |
| p1 L-9 — the visual matrix contains no evidence of this component | `REPORT.json` `/#/palettes` `bodyTextLength: 237`, shot = "EMPTY PLATE · No saved palettes yet"; `/#/browse` = "The commons is unreachable." I read both PNGs; zero cards in 60 frames |

---

## Greenfield module lattice

Passes 2–4 converged on a lattice by reasoning. **It is already ratified** — `ARCHITECTURE.md:48-58`
— and the convergent answer is close enough to it that the honest move is to adopt the ratified one
and stop re-deriving. I restate it with the three amendments the findings force:

```text
app (demo/color-picker/)     → shell · color-session · feature · platform · shared
shell (demo/shell/)          → color-session · platform · shared
feature (picker|palettes|workbenches|scenes)
                             → color-session · own descendants · platform · shared · published pkgs
color-session                → platform · shared · published pkgs
platform (transport|auth|storage)
                             → shared · external
shared                       → external
                                 ↓
@mkbabb/glass-ui/<subpath>       design system — consumed directly; no demo/ui/ alias layer
                                 ↓
@mkbabb/value.js/<subpath>       library — consumed as an INSTALLED PACKAGE (p4 L-19/L-20)
```

**Amendment 6 (L-26/L-29) — the lattice becomes executable or it is not a lattice.** Four
`no-restricted-imports` objects, one per region, whole values (never merged). Three pass today; the
`workbenches` object quarantines 17 known edges. Landing the three that pass is a ratchet that costs
nothing and prevents pass 6 from rediscovering this. G-DEMO-1's epitaph — *"wired STANDING so a
future feature edit cannot silently re-invert the demo module graph"* — is the argument, and its
corpse is the proof.

**Amendment 7 (L-27/L-28) — a port belongs to the layer that owns the concept, not the layer that
first needed it.** `SESSION_PORT_KEY` is `platform/auth`'s; `ViewId` is `shell`'s; `OVERTURE_KEY` is
`shared`'s or `color-session`'s. Each is a one-file move that deletes forbidden edges in bulk (5, 1
and 2 respectively) without touching a component. Ownership relocation is strictly cheaper than
component surgery and strictly more durable, because the lint can hold it.

**Amendment 8 (L-30) — the component split passes 2–4 propose is *downstream* of the boundary, not a
substitute for it.** `PaletteCard` / `PaletteCardTile` is the right end-state, but the reason
`MixSourceSelector` reaches for the instrument is that nothing stops it. Land the lint first: the
build fails, the consumer is forced to state what it actually wants, and the split falls out of the
requirement instead of being argued for.

**Order of value (revised).** Pass 4's ordering stands for the demo-side work. L-26/L-27/L-29 slot in
at the top because they are the cheapest items in the entire five-pass record — three file moves and
one config block — and because they convert several standing runtime findings into build failures:

0. **L-26 + L-27 + L-29** — move `SESSION_PORT_KEY` to `platform/auth`, move `OVERTURE_KEY` out of
   `boot/`, re-aim the four `no-restricted-imports` objects at the real tree. Retires 8 of 28 lattice
   violations outright, quarantines the other 20, and puts p2 L-10, p2 L-11 and L-30 behind a
   compiler error.
1. **p2 L-10 + p1 L-3 + p3 L-17 + p4 L-22 + p4 L-23** — `actions.ts`, handler-map inversion,
   `describeAvailability`, delete the derived `paletteKind` prop and the hand-rolled open model.
2. **p1 L-1 + p4 L-21** — delete `export.ts` + `usePaletteExport.ts`, promote `export/serializers.ts`
   to `index.ts`; the second slugifier and the `caf-noir.json` bug die with it.
3. **p4 L-19 + L-20** — consume the package, delete both alias mechanisms, gate the `_2` emission.
4. **p2 L-15 + p1 L-4** — delete `demo/ui/`. On edict 2/3/4 grounds; **not** on bytes (p4 C-4).

---

## Negative results (checked this pass)

- **Published-surface forgery at the specifier level — none, and now measured tree-wide.** Every
  `@mkbabb/value.js` specifier in `demo/` is one of the seven published subpaths —
  `/color`×25, `/css`×10, `/math`×6, `/easing`×5, `/quantize`×4 — and
  `grep -rn 'from "\.\./\.\./src|@src|value\.js/src' demo` returns **zero**. `package.json#exports`
  declares seven keys; `src/subpaths/` holds exactly seven matching files. `vite.config.ts:24-50`
  *generates* the demo's self-alias set from the exports map rather than hand-rolling it, with the
  array form chosen so `/math` is not prefix-mangled. No demo import is one a real consumer could not
  write. (p4's L-19 shows the *artifact* behind those specifiers is a local build; the specifiers
  themselves are clean and I confirm it independently.)
- **Library → design-system dependency — none.** `eslint.config.js:206-215` bans `@mkbabb/glass-ui`
  from `src/` (inv-K-1) and `tsconfig.lib.json` scopes the published program to `src/`. That is the
  one import boundary in this repo that is both stated and enforced — which is exactly the shape
  L-26 asks for on the demo side.
- **Feature → shell *from this component's cone* — none.** `PaletteCardMenu` reaches `types`,
  `utils`, `platform/transport` and `demo/ui`; nothing upward. The tree-level claim is a different
  claim, and it fails (C-6).
- **`verbatimModuleSyntax`** — clean. `:177` `Palette` and `:178` `PaletteKind` are `import type`;
  `:176`, `:179`–`:204` are genuine value imports. `vue-tsc -p tsconfig.demo.json --noEmit` silent.
- **God module** — this file is not one. 228 lines, 53 of script, two `computed`s, no business logic.
  `usePalettePorts.ts` (275 lines, 13 composables, 5 keys, 4 foreign consumer areas) is — see L-28.
- **Animations (edict 6)** — this file defines and deletes no keyframes; nothing to move or tokenize.
- **A second `PaletteCardMenu` implementation — none.** `grep -rn PaletteCardMenu demo` → one
  definition, one importer (`PaletteCard.vue:176`). The duplication in this area is of *concepts*
  (export, slug, availability, annotation register, kind), never of this component.

---

## Probes in this directory (pass 5)

| file | what it establishes |
|---|---|
| `probe-L5-lattice.mjs` / `probe-L5-lattice-results.txt` | L-26: whole-`demo/` import-graph census against `ARCHITECTURE.md:50-56` — 37 cross-area edge classes, **28 violations**, grouped by role-pair with file:line and specifier; also the L-27 five-way `SESSION_PORT_KEY` fan-in, the L-28 hinge and the two L-29 boot reaches |
| *(live, read-only)* `/#/mix` Playwright session | L-30: `button button` = 1 on an organic palette; menu items Publish/Rename/Export/Delete all `ariaDisabled: null`; `Publish … <!--v-if-->` with `menuHasOffline: false` |
