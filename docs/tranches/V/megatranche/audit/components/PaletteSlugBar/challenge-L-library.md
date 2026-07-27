# CHALLENGE-L · library structure — `demo/palettes/browser/slug/PaletteSlugBar.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The premise handed to this seat was "assume the library structure underneath this component is
wrong." The measurement is worse than the premise. The component **does not exist in the running
application**, has not for at least three tranches, and the structural machinery erected around it
(a "hardened public surface" barrel, a "TOP-LEVEL SEAM" barrel, an ESLint rule that names the seam
by hand) is **provably inert in all three layers**. Meanwhile the concept it owns — user identity —
is implemented **four times** across two top-level areas, and the one job the dead component still
holds by contract (rendering login errors) means **login failure is silent in the live app**, which
I reproduced in the browser.

This is not a component that needs restructuring. This is a **7-file, 4-way ownership fracture**
with a dead 243-line node at its centre and a dead lint rule guarding it.

Environment note: HEAD is `7cae8bd0` (advanced from the `c654824e` named in the brief;
`git log --oneline -1` pasted below). No source edits were made; only
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/` was written.

```
$ git log --oneline -1
7cae8bd0 docs(V·megatranche): bank the wall-interrupted challenge harvest (564 defects, 80 BLOCKER); re-deploy all three area bands by resume
```

---

## L-1 · BLOCKER — the component never mounts. Zero routes, zero templates, 243 dead lines.

**Mechanism:** dead module retained behind a live-looking barrel.

**Static enumeration.** `PaletteSlugBar` has exactly four references repo-wide, and none is a
template instantiation:

```
$ grep -rn "SlugBar\|slugBar" demo test e2e src
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/useSlugMigration.ts:84:            if (status === 409) slugBarRef.value?.setError(…)
…
e2e/smoke/flows/login-register.spec.ts:6: * The SlugBar live-app surface is only inside the PaletteDialog
```

The single consumer is an **`import type`** (`useSlugMigration.ts:6`) — erased at build. There is no
`<PaletteSlugBar`, no `:is=`, no `ref="slugBarRef"` binding anywhere.

**Live proof (dev server, `http://localhost:9000`).** Walked the mounted Vue component tree:

```json
{ "total": 115, "hasPaletteSlugBar": false,
  "slugish": ["Dock","DockControl","DockCrossfade","DockLayer","DockLayerGroup","DockSeparator",
              "DockStatusLamp","DockTrigger","DockViewSelect","GlassDock",
              "ProfileSection","SlugEditLayer"] }
```

115 components mounted. `PaletteSlugBar` is not one of them; its two live usurpers are. Then
DOM-probed for the component's two unique fingerprints (`aria-label="Account menu"`, the only
occurrence in `demo/` is `PaletteSlugBar.vue:84`; and `.slug-pill`) across four routes:

```json
{ "#/":        {"accountMenu":0,"slugPill":0},
  "#/browse":  {"accountMenu":0,"slugPill":0},
  "#/palettes":{"accountMenu":0,"slugPill":0},
  "#/admin":   {"accountMenu":0,"slugPill":0} }
```

**Visual-audit corroboration.** `docs/tranches/V/megatranche/audit/visual/REPORT.md` — "4 matrices ×
15 routes = **60 captures**". `grep -in "slug" REPORT.md` → **0 hits**. The component renders on 0
of 15 routes in 0 of 60 captures. I read
`shots/safari-mobile-light/palettes.png`: the `/#/palettes` mobile surface carries a dock with a
palette-swatch chip, a Picker/Palettes segmented control, and a kebab — **no identity affordance of
any kind** where this component was meant to live.

**The e2e suite has known this since tranche E** and encoded the workaround as prose rather than
filing it (`e2e/smoke/flows/login-register.spec.ts:6-9`):

> "The SlugBar live-app surface is only inside the PaletteDialog (currently unused by the App.vue
> shell post-D.W3 Lane A restructure), so the canonical login-register exercise on the smoke level
> is the cold-boot auto-registration path…"

**Reproduction:** `npm run dev`; open `http://localhost:9000`; run the tree-walk above. Also:
`grep -rn "SlugBar" demo` → four hits, none a mount.

**Cure:** delete `demo/palettes/browser/slug/` entire (component + barrel). See L-8 for where its
one surviving responsibility goes.

---

## L-2 · BLOCKER — four homes for one concept; two of them byte-identical.

**Mechanism:** ownership duplication across an area boundary (`palettes` ↔ `shell`).

The identity concept — *slug pill, copy slug, switch account, logout, regenerate, admin badge,
credential parsing, error mapping* — is implemented in **four** components:

| # | File | lines | state | what it owns |
|---|---|---|---|---|
| 1 | `demo/palettes/browser/slug/PaletteSlugBar.vue` | 243 | **DEAD** | pill + menu + edit form + parse + error map |
| 2 | `demo/shell/dock/layers/SlugEditLayer.vue` | 119 | LIVE | edit form + parse + error map |
| 3 | `demo/shell/dock/menus/ProfileSection.vue` | 181 | LIVE (`hidden lg:flex`) | pill + menu (desktop) |
| 4 | `demo/shell/dock/menus/MobileMenuDropdown.vue` | 115 | LIVE (`lg:hidden`) | pill + menu (mobile) |

**#3 and #4 are self-documented twins.** `MobileMenuDropdown.vue:21-22`:

```
// D6 (T.W3-5 / A11Y-F2): certified ink on the menu's floating rung — the
// desktop twin's cure, verbatim (ProfileSection.vue).
```

Their menu row sets are the same four items with the same icons and the same copy
(`ProfileSection.vue:77-89` vs `MobileMenuDropdown.vue:52-63`) — Copy slug / Switch account /
Logout / Regenerate slug. Two files, one menu, split by a Tailwind breakpoint rather than by a
`compact` prop on one component.

**#1 and #2 share 13 byte-identical lines.** Measured:

```
$ sed -n '184,196p' demo/palettes/browser/slug/PaletteSlugBar.vue > a.txt
$ sed -n '25,37p'   demo/shell/dock/layers/SlugEditLayer.vue      > b.txt
$ diff a.txt b.txt && echo "IDENTICAL (13 lines)"
IDENTICAL (13 lines)
```

That block is `looksLikeSlug()` + `normalizeTokenInput()`. Their callers
(`PaletteSlugBar.vue:198-225` vs `SlugEditLayer.vue:39-66`) differ only in three token
substitutions: `userSlug` → `pm.userSlug.value`, `emit("switchSlug", …)` → `pm.onSlugSwitch(…)`,
and the copy `"Already signed in as this slug."` → `"Already signed in."`. That last one is a
**user-visible string divergence between two copies of the same handler** — the exact failure mode
duplication produces.

**Reproduction:** the `diff` above; `grep -rn "ADMIN_TOKEN" demo` returns exactly two hits, one per
twin.

**Cure:** one `IdentityMenu.vue` with a `compact` prop (kills #3/#4 into one); one
`SlugEditLayer.vue` (keeps #2); delete #1; hoist the 13 shared lines to
`demo/platform/auth/slugFormat.ts` (L-8).

---

## L-3 · BLOCKER — the dead component holds the live app's only login-error surface, so login failure is silent. Reproduced.

**Mechanism:** cross-boundary responsibility parked on a template ref that is never bound.

`useSlugMigration.ts` routes **every** login failure through `slugBarRef` — a ref typed to the dead
component:

```ts
// demo/palettes/useSlugMigration.ts:30
const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
…
// :83-87
const status = e instanceof ApiProblem ? e.status : undefined;
if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
else if (status === 404) slugBarRef.value?.setError("Slug not found.");
else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
```

`slugBarRef` is returned (`useSlugMigration.ts:121`), surfaced as `migration`
(`usePalettePorts.ts:257`), and then — measured —

```
$ grep -n "migration" demo/color-picker/App.vue
153:        v-model:open="paletteManager.migration.showMigrateDialog.value"
155:        :mode="paletteManager.migration.migrateMode.value"
156:        @respond="paletteManager.migration.onMigrateRespond"
```

App.vue binds three members. `slugBarRef` is not one of them, and appears in no template repo-wide
(the `grep` in L-1 is exhaustive). **`slugBarRef.value` is permanently `null`; all four `setError`
calls are no-ops.**

The S.W2 · W2-6 fix celebrated in the comment at `useSlugMigration.ts:75-80` — replacing
`msg.includes("409")` substring matching with typed `ApiProblem.status` — repaired **already-dead
code**. The fix is correct and unreachable.

The live twin has the same hole from the other side. `SlugEditLayer.vue:13` declares
`const slugError = ref("")`, writes it at lines 49, 59, 60, 61, 62 — and **never renders it**: the
template (lines 75-119) contains no reference to `slugError`. It is write-only. Additionally
`SlugEditLayer.vue:54` calls `pm.onSlugSwitch(...)` **un-awaited**, so its own `try/catch` at 57-65
cannot observe a rejection even in principle.

**Reproduction (live, `http://localhost:9000`).** Clicked the dock `Login` control, filled a
nonexistent slug (`nonexistent-fake-bogus-slugword` — four `[a-z]+` segments, so it takes the *user
login* branch, not the admin branch), submitted, waited 2.5 s:

```json
{ "slugEditLayerOpen": true,
  "destructive": 0,
  "matchingLines": ["OKLCh is the polar form of OKLab, published by Björn Ottosson in 2020 …"],
  "ariaLive": [{"role":"alert","text":"dev misconfigured — run `npm run dev`"}, …],
  "slugInputValue": "" }
```

`destructive: 0` — no `.text-destructive` node anywhere. The only body text matching
`/not found|failed|already signed|too many|error/i` is unrelated OKLCh documentation prose. No
`role="alert"` carries a login error (the one present is the pre-existing dev-backend banner). And
`slugInputValue: ""` — **the input cleared itself**, i.e. the UI performed the *success* affordance
while the login had failed.

**Severity:** BLOCKER. Login failure produces no feedback of any kind on any breakpoint. This is a
library-structure defect, not a UI bug: the error surface was assigned to a module that the shell
does not — and structurally cannot — mount.

**Cure:** `lastError` becomes reactive state on the identity module (L-8), rendered by
`SlugEditLayer` next to the input. No template refs, no cross-area imperative reach.

---

## L-4 · BLOCKER — the ESLint rule that guards this component's seam is vacuous. Proven twice.

**Mechanism:** enforcement written against a module layout deleted three tranches ago.

`demo/palettes/browser/index.ts:1-8` states the invariant as *enforced*:

> "External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a
> raw internal `.vue` file — the G-DEMO-3b boundary (**eslint.config.js**) enforces it **standing**."

It does not. Measured:

```
$ npx eslint --print-config demo/palettes/browser/slug/PaletteSlugBar.vue | jq -c '.rules["no-restricted-imports"]'
null
```

**No rule at all** applies to the subject file. The rule object at `eslint.config.js:232-238` scopes
itself to `demo/@/components/**`, `demo/@/lib/**`, `demo/color-picker/**`:

```
$ ls -d demo/@
ls: demo/@: No such file or directory
```

`demo/@` was deleted at W43 · RF-15 — `vite.config.ts:68-72` records it: *"W43 (RF-15) killed the
demo `@…` path aliases: every demo import is now relative to its physical home."* Two of the three
globs match zero files.

The one surviving glob is worse, because it looks alive:

```
$ npx eslint --print-config demo/color-picker/App.vue | jq -c '.rules["no-restricted-imports"]'
[2,{"patterns":[{"group":["@components/custom/palette-browser/**/*.vue"],
   "message":"G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file."}]}]

$ grep -rn '"@components' demo src test e2e | wc -l
0
```

The rule is live, and bans an alias with **zero** uses repo-wide. The same dead pattern is
re-declared a third time at `eslint.config.js:294-299`.

`eslint demo/palettes/browser/slug/PaletteSlugBar.vue demo/shell/dock/layers/SlugEditLayer.vue`
exits clean — which now means nothing about either file's boundary hygiene.

**Reproduction:** the two `--print-config` invocations above.

**Cure:** re-express G-DEMO-3b against the live tree (`demo/palettes/**`, banning
`**/palettes/browser/*/[A-Z]*.vue` from outside `demo/palettes/`) — **or**, per the L-8 lattice,
delete the rule with the barrel it guards. A rule that cannot fail is worse than no rule: it
launders the invariant.

---

## L-5 · MAJOR — the "TOP-LEVEL SEAM" barrel has zero importers; every real consumer bypasses it.

**Mechanism:** an architectural artefact that documents a contract nobody signs.

`demo/palettes/browser/index.ts` (45 lines of header prose + named re-exports) declares itself
*"The stable public API of the palette-browser feature: a single barrel… External consumers reach
the feature through THIS seam."* Measured reach:

```
$ grep -rn 'browser' demo | grep -v '^demo/palettes/browser/' | grep -E 'import|from '
demo/workbenches/mix/MixSourceSelector.vue:8: … from "../../palettes/browser/card";
demo/workbenches/generate/GenerateControls.vue:16: … from "../../palettes/browser/card";
demo/workbenches/extract/ExtractWorkbench.vue:200: … from "../../palettes/browser/card";
demo/color-picker/App.vue:176: … from "../palettes/browser/dialog";
demo/palettes/BrowsePane.vue:188,190,194,199: … from "./browser/card" | "./browser/search" | "./browser/dialog";
demo/palettes/PalettesPane.vue:140: … from "./browser/card";
demo/palettes/useAdminUsers.ts:14: … from "./browser/admin";
demo/palettes/admin/AdminPane.vue:85,86: … from "../browser/admin" | "../browser/search";
demo/palettes/useSlugMigration.ts:6: … from "./browser/slug";
```

**Twelve reaches, all to sub-barrels. The top barrel: zero.** Its own header (lines 14-18) concedes
the reason — *"App.vue's eager `index.js` chunk therefore still reaches `MigratePalettesDialog`
through the `dialog/` sub-barrel directly"* — i.e. the seam is bypassed for the one property that
matters (tree-shake honesty), which leaves it with no property at all.

Downstream of that: `./browser/slug` has exactly **one** importer and it is `import type`. The
`slug/` sub-barrel (`slug/index.ts`, "hardened public surface (T.W1 F7) · NAMED re-exports only
(PI-6)") exists solely to hand a type to a ref that is never bound (L-3).

**Reproduction:** the grep above.

**Cure:** delete `demo/palettes/browser/index.ts` and `demo/palettes/browser/slug/`. Keep the
sub-barrels, which are the seams people actually use.

---

## L-6 · MAJOR — `demo/ui/` is 19 alias barrels and nothing else; this component reaches glass-ui through two of them, and through the 43-chunk root barrel.

**Mechanism:** a compatibility alias layer retained as a structural fiction. Directly violates owner
edict 2 (*no aliases, no migration shims, no dual paths*) and inverts edict 4 (*glass-ui is the
design system*).

The component's 14-line import block uses **three different idioms to reach one design system**:

```ts
// PaletteSlugBar.vue:132-145
import { SearchBar } from "@mkbabb/glass-ui/search";              // ← subpath (correct)
import { Button } from "../../../ui/button";                      // ← demo alias barrel
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { writeClipboard } from "@mkbabb/glass-ui";                // ← root barrel
```

`demo/ui/button/index.ts` is one line, entire:

```ts
export { Button } from "@mkbabb/glass-ui";
```

Whole-layer measurement:

```
$ find demo/ui -type f | wc -l          → 19
$ find demo/ui -type f -exec wc -l {} + | tail -1  → 29 total
```

**Nineteen files, twenty-nine lines, zero implementation** — every one a re-export of glass-ui,
while glass-ui ships a matching subpath for each (`./button`, `./popover`, `./dropdown-menu`,
`./avatar`, `./alert`, `./badge`, `./card`, `./dialog`, `./input`, `./label`, `./select`,
`./separator`, `./slider`, `./switch`, `./tooltip`, `./skeleton`, `./collapsible`, `./checkbox`,
`./radio-group` — verified in glass-ui 7.0.0's `exports` map).

`demo/ui/alert/index.ts` documents itself as exactly the shim edict 2 forbids:

> "This barrel previously held a local shadcn-vue re-implementation… B.W2 converted it to a
> re-export… The two consumers (`ColorNutritionLabel.vue`, `Markdown.vue`) import from this barrel
> **unchanged**."

The shim's stated purpose is *to avoid migrating the consumers* — the textbook back-compat shim.
Scale of the debt:

```
$ grep -rn 'from "[^"]*ui/(button|popover|dropdown-menu|…)"' demo | wc -l   → 92
$ grep -rln 'from "[^"]*ui/' demo | wc -l                                    → 81
```

**92 import statements across 81 files.**

Additionally, every one of those barrels re-exports from glass-ui's **root** entry, not its subpath.
Measured fan-out:

```
$ grep -o 'from "\./[^"]*"' node_modules/@mkbabb/glass-ui/dist/glass-ui.js | sort -u | wc -l  → 43
$ grep -o 'from "\./[^"]*"' node_modules/@mkbabb/glass-ui/dist/search.js   | sort -u | wc -l  → 7
```

The root barrel pulls **43 distinct chunks**; `./search` pulls 7. glass-ui declares
`sideEffects: ["*.css"]` and the root barrel contains no CSS side-effect import
(`grep -cE 'import\s*"[^"]*\.css"' glass-ui.js` → 0), so a production rollup pass should tree-shake
this to nothing.

> *Hypothesis (labelled, not measured):* the 43-chunk root reach inflates the **dev** module graph
> and the pre-bundle, and removes rollup's per-subpath chunk-boundary information in the gh-pages
> build. I did not run a comparative build; the bytes claim is unproven. The **consistency** claim —
> three reach idioms for one dependency inside one 14-line block — is measured and stands on its own.

**Reproduction:** `cat demo/ui/button/index.ts`; the `find`/`grep` counts above.

**Cure:** delete `demo/ui/` entire; rewrite the 92 imports to glass-ui subpaths
(`@mkbabb/glass-ui/button`, `/popover`, …). Mechanical, one-pass, and it makes the demo's design-
system consumption identical to what a real external consumer would write — which is the whole point
of dogfooding.

---

## L-7 · MAJOR — direction of dependency is inverted: the shell depends on a feature for the app's identity surface.

**Mechanism:** the identity port is namespaced, owned, and provided by the *palettes* feature; the
*shell* injects it.

```
$ grep -rn 'from "\.\./*.*palettes/' demo/shell/
demo/shell/dock/DockViewSelect.vue         -> "../../palettes/usePalettePorts"
demo/shell/dock/Dock.vue                   -> "../../palettes/usePalettePorts"
demo/shell/dock/layers/SlugEditLayer.vue   -> "../../../palettes/usePalettePorts"
demo/shell/dock/menus/ProfileSection.vue   -> "../../../palettes/usePalettePorts"
demo/shell/dock/menus/MobileMenuDropdown.vue -> "../../../palettes/usePalettePorts"
```

Five shell files, all **value** imports of `SESSION_PORT_KEY`. And the key is literally named for
the feature that should not own it:

```ts
// demo/palettes/usePalettePorts.ts:271
export const SESSION_PORT_KEY: InjectionKey<SessionPort> = Symbol("palette.session");
```

`"palette.session"`. The app's login/logout/identity is a `palette.` concern.

The reverse edge exists too — `demo/palettes/usePalettePorts.ts:19` imports `ViewId` from
`../shell/useViewManager` (feature → shell). It is `import type`, so no runtime cycle, but the
module graph is **bidirectional between two top-level areas**. Its sole load-bearing use is a cast:

```ts
// usePalettePorts.ts:88
setActiveTab: (tab: string) => depsSwitchView(tab as ViewId),
```

An `as` cast is the entire justification for a cross-area type edge.

`usePalettePorts.ts` is 275 lines providing **five** injection ports (`SESSION`, `LIBRARY`, `BROWSE`,
`ADMIN`, `COLOR_TARGET`) built from **fifteen** composables (`usePalettePorts.ts:4-18`). By edict 1
(*no god modules*) it is one, and PORT 1 · Session is the member that has no business being in it:
its inputs come from `demo/platform/auth/` (`useAdminAuth`, `useUserAuth`, `useSession` — lines 5-7),
so it is pure pass-through of another area's state under a third area's key.

**Reproduction:** the greps above.

**Cure:** L-8.

---

## L-8 · the greenfield lattice (architectural transposition, stated concretely)

Structuring this today with no legacy, identity is **its own module, below both areas**, and the
chrome that renders it lives in the shell that owns the chrome. Nothing about it is a palette.

```
demo/platform/auth/                     ← identity DOMAIN (already the state home; complete it)
  useUserAuth.ts   useAdminAuth.ts   useSession.ts   sessionToken.ts     (unchanged)

  slugFormat.ts               NEW · pure, testable, ZERO Vue
      export const SLUG_SEGMENTS = 4;
      export function isSlug(v: string): boolean          // the 13 duplicated lines, once
      export function normalizeCredential(raw: string): string
      export function classifyCredential(raw): {kind:"slug"|"admin-token", value:string}
      ↑ the ONE home for "what shape is this credential". Unit-testable without a DOM,
        which no copy is today. Pin it to the server contract with a test that imports
        api/src/modules/session/slugWords.ts and asserts generateSlug() satisfies isSlug().

  useIdentity.ts              NEW · the identity PORT, provided by App.vue
      { userSlug, isAdmin, lastError, login(raw), logout(), regenerate() }
      export const IDENTITY_KEY: InjectionKey<Identity> = Symbol("identity")
      ↑ owns the ApiProblem.status → message map ONCE (409/404/429/fallback), as reactive
        `lastError` state. No template refs. No setError(). No cross-area imperative reach.

  useSlugMigration.ts         MOVED from demo/palettes/
      ↑ its trigger is identity, its payload is the library; it takes the palette
        inventory as an injected dep (it already does — useSlugMigration.ts:9).
        Error handling deletes entirely: it throws, useIdentity catches into lastError.

demo/shell/dock/identity/               ← identity CHROME (one dir, two thin views)
  IdentityMenu.vue    ← ONE menu. `compact` prop picks desktop trigger (Profile button)
                        vs mobile row set. Kills the ProfileSection/MobileMenuDropdown twin
                        AND the breakpoint-forked duplication (L-2). Rows built from
                        glass-ui DropdownMenuItem, as both live twins already do correctly.
  SlugEditLayer.vue   ← the edit form, RENDERS useIdentity().lastError. No local regex,
                        no local error map, no local slugError, awaits login().

DELETE  demo/palettes/browser/slug/**          (L-1: 243 + 3 dead lines)
DELETE  demo/palettes/browser/index.ts         (L-5: 0 importers)
DELETE  demo/shell/dock/menus/{ProfileSection,MobileMenuDropdown}.vue  → IdentityMenu.vue
DELETE  demo/ui/**                             (L-6: 19 files / 29 lines; rewrite 92 imports
                                                to glass-ui subpaths)
SHRINK  demo/palettes/usePalettePorts.ts       (PORT 1 · Session leaves → 4 ports, and the
                                                `palette.session` misnomer dies with it)
FIX     usePalettePorts.ts:19,88               (drop the `ViewId` type edge + the `as` cast:
                                                post-login view switching is a composition-root
                                                concern — App.vue, which already owns the router)
```

**Resulting edge set — strictly downward, no cycle:**

```
   App.vue  (composition root: provides IDENTITY_KEY + the 4 palette ports, owns view switching)
      │
      ├── demo/shell/**        ──→ demo/platform/auth/**       (down)
      └── demo/palettes/**     ──→ demo/platform/auth/**       (down)

   demo/shell/** ──✗──→ demo/palettes/**        (5 files / 8 edges dissolve)
   demo/palettes/** ──✗──→ demo/shell/**        (the ViewId cast dissolves)
```

**Net:** −4 files, −~470 lines, four homes → one, and one bidirectional area edge → zero. The
`vj-morph` transition family (`demo/styles/animations.css:70-122`) is untouched — it is a global
tokenized family with ten other consumers, so deleting `PaletteSlugBar.vue:4` deletes a *usage*, not
an animation (edict 6 satisfied; `SlugEditLayer` already rides the dock's `DockCrossfade`).

---

## L-9 · MINOR — defects inside the dead file, recorded so deletion is not mistaken for loss

Enumerated because a future seat may propose reviving rather than deleting. Reviving requires fixing
all of these:

| ref | defect |
|---|---|
| `:150` | `hasSavedPalettes: boolean` — a **required** prop, destructured at `:147`, **never referenced**. |
| `:155` | `copy: []` emit declared, **never emitted** — `onCopySlug()` (`:168`) calls `writeClipboard` directly. |
| `:205` | `const isAdmin` **shadows** the destructured `isAdmin` prop (`:147`) inside `onSlugSwitch`. |
| `:216-221` | `catch (e: any)` + `msg.includes("409")` — the **string-substring** error branching that S.W2 · W2-6 already condemned and replaced with typed `ApiProblem.status` in `useSlugMigration.ts:75-80`. The dead file kept the retired idiom; so did the live twin (`SlugEditLayer.vue:57-62`). Both are unreachable: `ApiProblem` titles never contain `"409"`. |
| `:176-181` | `setTimeout(…, 50)` — a magic delay to race the Popover close. The live twin does the same job with `nextTick` alone (`SlugEditLayer.vue:16-23`). Contrivance (edict 3). |
| `:166` | `ref<InstanceType<typeof SearchBar> \| null>(null)` + `ref="searchBarRef"` — the pre-3.5 idiom. `useTemplateRef` is the law (edict 7) and the live twin already uses it (`SlugEditLayer.vue:14`). *(Same staleness at `Dock.vue:60`, in a file that imports `useTemplateRef` on line 2.)* |
| `:71-78`, `:84-86`, `:89-118` | **Six hand-rolled `<button>`s** with 14-class utility strings, in a file that imports glass-ui `Button` (used at `:17`, `:29`) and `Popover`. The 4-row menu (`:89-118`) repeats one 13-utility class string **verbatim ×4** — reimplementing `DropdownMenuItem`, which both live twins use correctly. Edicts 4 + 5. |
| `:45`, `:81` | Uses `Popover` (with `aria-haspopup="dialog"` at `:84`) as a **menu**. The live twins use `DropdownMenu` — correct `menu`/`menuitem` semantics and correct component-type-name reuse (edict 4). |
| `:239-243` | `<style scoped>` containing **only** an `@reference` and a comment — zero rules. Still emits a `data-v-*` scope id and, by `browser/index.ts:9-11`'s own PI-6 reasoning, still makes the SFC a side-effecting import. |

**INFO (latent, currently sound).** The client regex `/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/`
(`PaletteSlugBar.vue:185` = `SlugEditLayer.vue:26`) re-derives a **server-owned** format
(`api/src/modules/session/slugWords.ts:84-90`, `adj-verb-color-animal`) with no shared constant and
no test. I verified every word literal in that file:

```
total word literals: 515
words failing /^[a-z]+$/: ["node:crypto","findBySlug","Failed to generate unique slug after max retries"]
```

All 512 real words pass — **no live bug today**. But a single hyphenated or accented word added
server-side (`off-white`, `blue-grey`) would make the client classify a legitimate slug as an
**admin token** and route it to `adminLogin`. Labelled a hypothesis: no failing input exists at
HEAD. Cured structurally by `slugFormat.ts` + the contract test in L-8.

---

## Defect table

| id | severity | defect | evidence |
|---|---|---|---|
| L-1 | BLOCKER | Component never mounts — 0/15 routes, 0/60 captures, 243 dead lines | live tree-walk `hasPaletteSlugBar:false` of 115; `grep -rn SlugBar` = 4 non-mount refs; REPORT.md 0 slug hits |
| L-2 | BLOCKER | Four homes for identity; `diff` of the parse block = IDENTICAL (13 lines) | `PaletteSlugBar.vue:184-196` ≡ `SlugEditLayer.vue:25-37`; `MobileMenuDropdown.vue:22` "verbatim" |
| L-3 | BLOCKER | Login failure is silent — `slugBarRef` never bound; `slugError` never rendered | live probe: `destructive:0`, `slugInputValue:""`; `useSlugMigration.ts:84-87`; `App.vue:153-156` |
| L-4 | BLOCKER | G-DEMO-3b seam rule is vacuous | `--print-config` → `null`; `ls demo/@` → ENOENT; `grep '"@components'` → 0 |
| L-5 | MAJOR | Top-level `browser/index.ts` seam has 0 importers | 12 reaches, all sub-barrel |
| L-6 | MAJOR | `demo/ui/` = 19 files / 29 lines of pure aliases; 92 imports across 81 files; root barrel = 43 chunks vs subpath 7 | `find`/`wc`/`grep`; `demo/ui/alert/index.ts` self-documents the shim |
| L-7 | MAJOR | Shell → feature inversion (5 files / 8 edges) + `Symbol("palette.session")` + `ViewId` back-edge for one cast | `grep demo/shell/`; `usePalettePorts.ts:19,88,271` |
| L-9 | MINOR | Dead prop, dead emit, prop shadow, retired error idiom, magic 50 ms, pre-3.5 refs, 6 hand-rolled buttons, Popover-as-menu, empty scoped style | line refs in the table above |
| L-9b | INFO | Client re-derives server slug format, untested (currently sound: 512/512 words pass) | `api/src/modules/session/slugWords.ts:84-90`; word scan |

**Strongest defect:** L-3 — the live application silently swallows every login failure, because the
only error surface was assigned to a component the shell has not mounted since the D.W3 restructure.
It is a user-facing BLOCKER whose *cause* is purely structural, and it is the cleanest possible
demonstration that the library boundary here is wrong: no amount of correct code inside
`PaletteSlugBar.vue` could have prevented it.
