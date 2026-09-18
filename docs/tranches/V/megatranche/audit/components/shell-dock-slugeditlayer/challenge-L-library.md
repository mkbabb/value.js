# CHALLENGE-L — library structure under `demo/shell/dock/layers/SlugEditLayer.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]` — spawned with
an explicit Opus 5 declaration. The seat is declared, not inherited. No defect on this axis.

---

## Scope, method, and what decided each claim

- Subject: `demo/shell/dock/layers/SlugEditLayer.vue` (119 lines), area `demo/shell`.
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Static: full read of the SFC, its one consumer (`Dock.vue`), its injected port
  (`demo/palettes/usePalettePorts.ts`), the port's slug machinery
  (`demo/palettes/useSlugMigration.ts`), and its duplicate
  (`demo/palettes/browser/slug/PaletteSlugBar.vue`).
- Live: Playwright against the running dev server at `http://localhost:9000`, five evaluate probes
  (geometry, hit-stack, layer state, WCAG 2.5.8 spacing arithmetic, resolution probes). Screenshot
  read: `shots/safari-mobile-light/picker.png`.
- Resolution: `node -e` probes against `package.json#exports` and `tsconfig.demo.json#paths`.
- `npx eslint demo/shell/dock/layers/SlugEditLayer.vue` → **clean, zero output**. The lint gate
  does not see any of what follows. That is itself part of the finding.

**Verdict: DEFECTIVE.** Ten findings, two of them BLOCKER. The strongest is not a style
complaint — it is that **the slug-login error path is dead end-to-end through four independent
breaks**, so a failed sign-in is silently swallowed with no user-visible signal anywhere.

I also **falsify one premise handed to this seat**: the three 22×22 controls **pass** WCAG 2.2
SC 2.5.8 via the spacing exception (measured center distances 47 / 75 / 28 px, all ≥ 24). MT-F004
as worded is a harness heuristic that does not implement the exception. The defect underneath it
is real but is a *design-system* defect, not an AA failure. Details in L-4.

---

## The lattice as it stands

```
demo/shell/dock/layers/SlugEditLayer.vue        ← the SHELL owns:
  ├─ looksLikeSlug()          slug grammar        · identity grammar
  ├─ normalizeTokenInput()    admin-token grammar · credential parsing
  ├─ slugError + 409/404/429  error taxonomy      · transport semantics
  ├─ onCopySlug()             clipboard           · a MAIN-layer concern
  └─ raw <input>              a field primitive   · one of 4 in the whole demo
        │  inject SESSION_PORT_KEY                         (5 shell→palettes edges)
        ▼
demo/palettes/usePalettePorts.ts       ← identity lives under the PALETTES feature
        │  ├─ import type { ViewId } from "../shell/useViewManager"   ◄── back-edge: CYCLE
        ▼
demo/palettes/useSlugMigration.ts      ← onSlugSwitch / onRegenerateSlug
        │  └─ slugBarRef.setError(…)   ← ref is NEVER bound. Every call is a no-op.
        ▼
demo/palettes/browser/slug/PaletteSlugBar.vue  (243 L)  ← DEAD. Never rendered anywhere.
        └─ looksLikeSlug() / normalizeTokenInput() / the 409-404-429 block — BYTE-DUPLICATED
        ▼
demo/platform/auth/{useUserAuth,useAdminAuth,useSession}   ← where identity ACTUALLY belongs
```

Three homes claim the identity concept; none owns it.

---

## Findings

### L-1 — BLOCKER — the slug/token grammar is implemented twice, and one twin is dead code

`looksLikeSlug` and `normalizeTokenInput` exist, character-identical, in two SFCs:

| concept | site A | site B |
|---|---|---|
| `looksLikeSlug` | `SlugEditLayer.vue:25` | `PaletteSlugBar.vue:184` |
| `normalizeTokenInput` | `SlugEditLayer.vue:29` | `PaletteSlugBar.vue:188` |
| submit + 409/404/429 map | `SlugEditLayer.vue:39-66` | `PaletteSlugBar.vue:198-225` |

```
$ grep -rn "normalizeTokenInput\|looksLikeSlug" demo/ api/ src/ e2e/ test/
demo/shell/dock/layers/SlugEditLayer.vue:25,29,45,46,48,54
demo/palettes/browser/slug/PaletteSlugBar.vue:184,188,204,205,207,213
```

`PaletteSlugBar` is **never rendered**. Its only live references are two re-exports and one
type-position use:

```
$ grep -rn "PaletteSlugBar\|SlugBar" demo/ e2e/ test/
demo/palettes/useSlugMigration.ts:6   import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30  const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/browser/index.ts:44     export { PaletteSlugBar } from "./slug";
demo/palettes/browser/slug/index.ts:3 export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
```

No template mounts it (checked `PaletteSlugBar`, `palette-slug-bar`, `SlugBar` across
`demo/ e2e/ test/`).

**Mechanism** — no unique semantic home for "parse an identity input". The grammar is
Vue-free pure logic sitting inside two SFCs. When the dock rewrote the identity surface, the
old surface was left standing rather than deleted, which is a standing-edict-2 violation
(no legacy code / dual paths) with 243 lines of dead weight.

**Reproduction** — the grep above; the absence grep for a mount site.

**Cure** — one pure module `demo/platform/auth/identity.ts` exporting
`parseIdentityInput(raw): { kind: "slug"; slug: string } | { kind: "token"; token: string }`,
unit-tested without a DOM. Delete `demo/palettes/browser/slug/` whole, delete the two
re-exports, delete `slugBarRef`.

---

### L-2 — BLOCKER — the slug-login error surface is dead through four independent breaks

A user who types a wrong slug or a wrong admin token gets **no feedback at all**. Four
separate defects each independently suffice:

**(a) The call is not awaited.** `SlugEditLayer.vue:54`

```ts
pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);
slugInput.value = "";
slugEditMode.value = false;
```

`pm.onSlugSwitch` is `migration.onSlugSwitch` (`usePalettePorts.ts:134`), declared
`async function onSlugSwitch(...)` at `useSlugMigration.ts:53`. It is invoked bare. The layer
therefore closes and clears the field *before* the network round-trip resolves, and the
`finally { slugSwitching.value = false }` at `SlugEditLayer.vue:63-65` fires immediately — the
`Loader2` spinner at line 97 can never be seen.

**(b) The `catch` is unreachable.** `useSlugMigration.ts:53-83` has three exits — the admin
branch (`return`), the migrate-dialog branch (`return`), and a `try/await/catch` that swallows
everything. It cannot reject. So `SlugEditLayer.vue:57-62` — the `catch (e: any)` with the
409/404/429 mapping — is unreachable code.

**(c) `slugError` is never rendered.** `slugError` is written at lines 18, 43, 49, 59-62 and read
**nowhere**. The template (lines 75-119) contains no error node. Compare `PaletteSlugBar.vue:124-126`,
which does render it. The write-only ref survived the port of the surface; the display did not.

**(d) The producer-side error sink is unbound.** `useSlugMigration.ts:78-81` reports through
`slugBarRef.value?.setError(...)`. `slugBarRef` is created at line 30 and returned at line 105;
`demo/color-picker/App.vue:153-156` consumes `migration.showMigrateDialog`, `migration.migrateMode`
and `migration.onMigrateRespond` — and nothing else. `slugBarRef` is never assigned. It is
permanently `null`; the `?.` swallows all four branches.

**Mechanism** — error is modelled as an *imperative push into a component instance* rather than as
*state on the identity port*. That coupling is what let the display die without any consumer
noticing: there is no type-level obligation to render a `Ref<AuthError|null>` that does not exist.

**Reproduction** — the four file:line citations above. Additionally: the `S.W2 W2-6` comment at
`useSlugMigration.ts:73-77` explicitly documents that HTTP-status substring matching on
`e.message` never matched, and replaced it with `e instanceof ApiProblem ? e.status : undefined`.
`SlugEditLayer.vue:57-62` **re-introduces the exact defect that comment records as cured**.

**Cure** — errors become state on the identity port:

```ts
// demo/platform/auth/useIdentity.ts
const lastError = shallowRef<AuthError | null>(null);
async function signIn(raw: string): Promise<void> { … lastError.value = toAuthError(e) … }
```

The layer `await`s `signIn`, keeps the field open on failure, and renders `lastError` in a live
region. glass-ui already ships the primitive for this: `useUserInvalidAria` from
`@mkbabb/glass-ui/forms` (`node_modules/@mkbabb/glass-ui/dist/forms.d.ts:4`).

---

### L-3 — MAJOR — shell → feature layering inversion, plus a module-tree cycle

`demo/shell` is the application shell. It depends on `demo/palettes`, a feature, at five edges:

```
$ grep -rn "from \"\.\./.*palettes/" demo/shell/
demo/shell/dock/DockViewSelect.vue        -> "../../palettes/usePalettePorts"
demo/shell/dock/Dock.vue                  -> "../../palettes/usePalettePorts"
demo/shell/dock/layers/SlugEditLayer.vue  -> "../../../palettes/usePalettePorts"   ← subject, line 5
demo/shell/dock/menus/ProfileSection.vue  -> "../../../palettes/usePalettePorts"
demo/shell/dock/menus/MobileMenuDropdown.vue -> "../../../palettes/usePalettePorts"
```

And `demo/palettes` depends back on `demo/shell`:

```
$ grep -rn "from \"\.\./.*shell/" demo/palettes/
demo/palettes/usePalettePorts.ts:19: import type { ViewId } from "../shell/useViewManager";
```

**`demo/shell ⇄ demo/palettes` is a cycle.** It is type-only in the back direction, so
`verbatimModuleSyntax` erases it and there is no runtime cycle — but the source graph is circular
and neither package can be reasoned about, moved, or tested in isolation.

The inversion is gratuitous: **`demo/platform/auth/` already exists and already owns identity.**

```
$ find demo/platform -type f
demo/platform/auth/sessionToken.ts
demo/platform/auth/sessions.ts
demo/platform/auth/useAdminAuth.ts
demo/platform/auth/useUserAuth.ts
demo/platform/auth/useSession.ts
demo/platform/{storage,transport}/…
```

`usePalettePorts.ts:5-7` imports all three auth composables and re-aggregates five of their members
into `sessionPort` (lines 127-135). The shell then reaches *through the palettes feature* to get at
`platform/auth`. Nothing in `sessionPort` is palette-specific:
`isAdminAuthenticated`, `userSlug`, `userLogout`, `ensureUser`, `ensureSession`,
`onRegenerateSlug`, `onSlugSwitch`.

**Mechanism** — `usePalettePorts.ts` is the residue of the retired `usePaletteManager` god facade
(its own header, lines 21-31, says so). The RF-15 §b dissolution split the god object into five
ports but left all five in the god module's *file*, so the module boundary never moved. Port 1 is
not a palette concept and should never have stayed.

**Reproduction** — the two greps above.

**Cure** — move `SESSION_PORT_KEY` and its provider to `demo/platform/auth/useIdentity.ts` and
rename it `IDENTITY_KEY`. Every shell→palettes edge becomes shell→platform, and the back-edge
`palettes → shell/useViewManager` becomes the only cross-feature edge (itself worth killing by
passing `ViewId` in as a generic, but that is outside this component's blast radius). Cycle gone,
five imports shortened, `usePalettePorts` drops from five ports to four.

---

### L-4 — MAJOR — the compact dock control has no hit-target floor, and the repo's own cure was applied per-instance next door

Measured live at `http://localhost:9000/#/`, all three controls, in both the inert and the
active layer state (geometry is state-invariant):

```json
[{"l":"Switch to slug",   "w":22,"h":22,"width_css":"22px","height_css":"22px",
  "padding":"4px","glyph":[14,14],"glyphCls":"w-3.5 h-3.5"},
 {"l":"Generate new slug","w":22,"h":22,"padding":"4px","glyph":[14,14]},
 {"l":"Cancel",           "w":22,"h":22,"padding":"4px","glyph":[14,14]}]
```

22 = 4 px padding + 14 px glyph + 4 px padding. The producer's own rule, from
`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/icon-button.css`:

```css
.dock-icon-button--compact {
    width:  var(--dock-compact-control-size, auto);
    height: var(--dock-compact-control-size, auto);
    min-width: var(--dock-compact-control-min-width, 0);
    padding: var(--dock-compact-control-padding, 0.25rem);
}
```

`auto` / `0` — **the compact variant delegates its entire hit box to whatever glyph the consumer
slots in.** And glass-ui's coarse-pointer floor explicitly exempts it
(`…/controls/touch-floor.css`):

```css
@media (pointer: coarse) {
  .dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *)) {
      min-block-size: var(--dock-touch-target, 2.75rem);
      min-inline-size: var(--dock-touch-target, 2.75rem);
  }
}
```

A `:not(--compact)` **and** a `:not(:where(.glass-dock *))` — so inside the glass dock, on a touch
device, *no* dock icon button receives the 44 px floor, and compact ones are doubly exempt.

**Honest correction to MT-F004.** Measured center distances between the three targets:

```json
[{"a":"Switch to slug","b":"Generate new slug","centerDist":47.00,"exceptionMet":true},
 {"a":"Switch to slug","b":"Cancel",           "centerDist":75.00,"exceptionMet":true},
 {"a":"Generate new slug","b":"Cancel",        "centerDist":28.00,"exceptionMet":true}]
```

WCAG 2.2 SC 2.5.8 *Spacing* exception: undersized targets pass if 24 px-diameter circles centred on
each do not intersect — i.e. centres ≥ 24 px apart. 47, 75 and 28 all clear it. **These controls
pass SC 2.5.8 (AA).** They fail SC 2.5.5 (AAA, 44×44) and they fail the producer's own declared
`--dock-touch-target: 2.75rem` intent on coarse pointers. The audit harness's flat 24×24 rule does
not implement the spacing exception, so MT-F004's severity is overstated for this component.

**The real defect is inconsistency with a law this repo already wrote.** `compact` appears at
exactly four call sites in the entire dock:

```
$ grep -rn "compact" demo/shell/dock/ | grep -v '^\s*\*'
demo/shell/dock/ActionBarToggle.vue:87                  compact
demo/shell/dock/ActionBarToggle.vue:155  --dock-compact-control-padding: 0.5rem 0.75rem;
demo/shell/dock/layers/SlugEditLayer.vue:92,105,113     compact
```

`ActionBarToggle.vue:147-158` records the ruling verbatim:

> *T-36 (§0.6 owner rider): THE TRUE-BUTTON BOX-MODEL. The compact register seats content 4px off
> a full pill cap — a sticker, not a button. The cure rides the producer's OWN token hook
> (`--dock-compact-control-padding`, dock-controls/icon-button.css), never a specificity fight […]
> the box lands at the sibling controls' 2.5rem height.*

**SlugEditLayer is the only unremediated survivor of T-36.** The 4 px sticker seat the rider
condemns is exactly what all three of its controls still render.

**Mechanism** — the T-36 cure was landed as a **per-instance override on one SFC's local class**
(`.dock-tools-btn`), which is a standing-edict-5 violation (style at the root, never per instance).
Because it was per-instance, it did not propagate; there is no structural mechanism by which the
next `compact` consumer inherits it. A law enforced by a comment is not enforced.

**Reproduction** — the greps and the live measurements above; `git log`-free, current at HEAD.

**Cure, in order of preference**
1. **Producer (correct home, standing edict 4).** glass-ui gives
   `--dock-compact-control-min-width`/-height a non-zero default (24 px) and drops the
   `:not(.dock-icon-button--compact)` clause from `touch-floor.css`. This is a glass-ui BH relay
   obligation — see §Relay below.
2. **Dock root (correct home here, standing edict 5).** Until (1) lands, set
   `--dock-compact-control-padding` / `--dock-compact-control-min-width` **once** on `.glass-dock`
   in `Dock.vue`'s scoped block, and delete `.dock-tools-btn`'s local copy. One declaration, all
   four consumers, no new class.
3. Never: `min-w-6 min-h-6` utilities on the three `<DockControl>` tags. That is more of the same
   per-instance disease.

---

### L-5 — MAJOR — a raw `<input>`, unlabelled and unconfigured, where three field primitives already exist

`SlugEditLayer.vue:81-87`:

```html
<input ref="slugInputRef" v-model="slugInput" placeholder="enter slug or token..."
       class="text-mono-small bg-transparent border-none outline-none w-40 min-w-0 …"
       @keydown.escape.stop="slugEditMode = false" />
```

Live probe of that element:

```json
{"w":160,"h":19.59,"fontSize":"14px","ariaLabel":null,"title":null,"id":null,"name":null,
 "autocomplete":null,"type":"text","inputmode":null,"spellcheck":null,"autocapitalize":null}
```

There are **four** raw `<input>` elements in the entire demo tree:

```
$ grep -rn "<input" demo/
demo/workbenches/generate/GenerateControls.vue:144
demo/workbenches/extract/ImageDropZone.vue:27          (type=file, visually hidden)
demo/shell/dock/layers/SlugEditLayer.vue:81            ← subject
demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue:11
```

Everything else routes through a primitive. Available and unused:
`Input` from `@mkbabb/glass-ui/forms`; `SearchBar` from `@mkbabb/glass-ui/search` — **which the
dead twin `PaletteSlugBar.vue:132` uses for this exact field**; `demo/ui/input/`. And the sibling
dock field, `demo/shell/dock/ColorInput.vue:12-26`, uses a third idiom again — a
`contenteditable` `<span role="textbox">` **with** an explicit `:aria-label`.

So: four dock/identity text fields, four different idioms, one of which (the subject) is the only
one with no accessible name at all.

**Sub-finding, HYPOTHESIS (no iOS device available to this seat).** The field takes admin tokens
(`normalizeTokenInput` strips an `ADMIN_TOKEN=` prefix and surrounding quotes — lines 29-37) and the
admin path passes the value through **without** `.toLowerCase()`:

```ts
const normalized = normalizeTokenInput(raw).toLowerCase();   // line 45, slug path
const isAdmin = !looksLikeSlug(normalized);                  // line 46
pm.onSlugSwitch(isAdmin ? normalizeTokenInput(raw) : normalized, isAdmin);   // line 54 — token NOT lowercased
```

With no `autocapitalize="none"`, iOS Safari's default sentence-casing uppercases the first character
of a typed token, which then fails server-side — and by L-2 the failure is invisible. The missing
attributes are *measured*; the keyboard behaviour is *spec-derived*, so I label the compound failure
a hypothesis. The whole demo has exactly one `spellcheck`/`autocapitalize`/`autocorrect` declaration
(`GradientCodeEditor.vue:89`), so this is a repo-wide gap that lands hardest here.

**Cure** — the field becomes `<Input>` from `@mkbabb/glass-ui/forms` with `aria-label`,
`autocapitalize="none"`, `autocorrect="off"`, `spellcheck="false"`, `autocomplete="username"`, and
the error state driven by glass-ui's `useUserInvalidAria`. If the glass `Input` cannot render inside
a dock row at the required density, that is a producer gap to relay — not grounds for a fourth
bespoke field.

---

### L-6 — MINOR — `onCopySlug` is misfiled into the edit layer and reached by a three-hop imperative round-trip through an inert sibling

Copying your slug has nothing to do with editing it. Yet `onCopySlug` lives at
`SlugEditLayer.vue:68-70`, is exposed at line 72, and is invoked from the **main** layer:

```
Dock.vue:62          function onCopySlug() { slugEditRef.value?.onCopySlug(); }
Dock.vue:213, 224    @copy-slug="onCopySlug"   (MobileMenuDropdown, ProfileSection)
ProfileSection.vue:36, 77   copySlug: []  →  @click="emit('copySlug')"
```

So: menu item → `emit('copySlug')` → `Dock.onCopySlug()` → `slugEditRef.value?.onCopySlug()` →
`writeClipboard(pm.userSlug.value)`. Four hops, reaching into a component instance that is `inert`
at the moment of the call.

Both callers **already inject the same port**:

```
demo/shell/dock/menus/ProfileSection.vue:14     import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
demo/shell/dock/menus/MobileMenuDropdown.vue:13 import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
```

The entire chain collapses to one line in each caller: `void writeClipboard(pm.userSlug.value)`.
`SlugEditLayer` then loses its `writeClipboard` import (line 6) and its only reason to be reached
imperatively at all.

**Mechanism** — the function was placed where the `pm` injection already existed rather than where
the concept lives. `defineExpose` + a parent `ref` is a private-channel back door that lets any
member drift into any component without a type error.

**Reproduction** — the file:line chain above.

---

### L-7 — MINOR — `defineExpose` leaks a member no consumer reads

`SlugEditLayer.vue:72` — `defineExpose({ onStartSlugEdit, onCopySlug, slugSwitching })`.
`Dock.vue:61-62` reads `onStartSlugEdit` and `onCopySlug` only. `slugSwitching` is never read
(grep across `demo/ e2e/ test/`). It is public API with no consumer, and by L-2(a) it is a value
that can never be observed as `true` anyway.

**Cure** — after L-6 removes `onCopySlug` and L-2 makes the layer declarative, `defineExpose`
should be **empty and deleted**: `slugEditMode` is already a `defineModel` (line 10), so the parent
can open the layer by writing the model, and the layer can own its own focus with
`watch(slugEditMode, v => v && nextTick(() => slugInputRef.value?.focus()))`. That removes
`slugEditRef` from `Dock.vue:60-62` entirely.

---

### L-8 — MINOR — resurrected legacy: `catch (e: any)` + HTTP-status substring matching

`SlugEditLayer.vue:57-62`:

```ts
} catch (e: any) {
    const msg = e?.message ?? "";
    if (msg.includes("409")) slugError.value = "Already signed in.";
    else if (msg.includes("404")) slugError.value = "Slug not found.";
    else if (msg.includes("429")) slugError.value = "Too many attempts.";
```

`useSlugMigration.ts:73-81` documents that this precise pattern was a *bug*, cured at S.W2 W2-6:

> *branch on the typed `ApiProblem.status`, not `.message` substrings — the server titles ("Already
> logged in as this user", "User not found", "Rate limit exceeded") never contain "409"/"404"/"429",
> so those branches matched nothing and the authored copy below never showed.*

The typed carrier `ApiProblem` exists at `demo/platform/transport/api-problem.ts`. The shell
re-implemented the pre-cure form and did not import it. Standing edict 2 (no legacy code) — this is
legacy that was *re-authored*, which the lint gate cannot detect (`npx eslint` on this file is
clean; the config permits `any` in a catch clause).

---

### L-9 — MINOR — the declared public surface of the library disagrees with itself in three ways

The subject file imports no `@mkbabb/value.js` — but its area's resolution contract is broken, and
this is the axis's explicit question. Measured:

```
$ node -e "…compare package.json#exports against tsconfig.demo.json#paths…"
package.json exports : /color /css /easing /math /quantize /transform /value
tsconfig.demo paths  : (bare) /color /easing /math /parsing /quantize /transform /units
IN tsconfig, NOT exported (phantom): [ '@mkbabb/value.js/parsing', '@mkbabb/value.js/units' ]
EXPORTED, not in tsconfig paths    : [ '@mkbabb/value.js/value', '@mkbabb/value.js/css' ]

$ node -e "require.resolve('@mkbabb/value.js/parsing',{paths:['.']})"
FAILS AT RUNTIME: ERR_PACKAGE_PATH_NOT_EXPORTED
$ node -e "require.resolve('@mkbabb/value.js',{paths:['.']})"
FAILS: ERR_PACKAGE_PATH_NOT_EXPORTED
```

1. **Phantom subpaths.** `@mkbabb/value.js/parsing` and `/units` are declared in
   `tsconfig.demo.json#paths` but absent from `package.json#exports`. A demo import of either
   **typechecks green and fails to resolve at runtime** — `vite.config.ts:43-51` generates its
   alias set from `package.json#exports`, so no alias is produced, and Node rejects the specifier
   outright. That is precisely "a demo import a real consumer could not write", pre-authorised.
   Latent today: nothing imports them (verified below), so this is a trap, not a break.
2. **Two live resolution mechanisms.** `@mkbabb/value.js/css` has **10** live demo imports and no
   `paths` entry — it resolves through the `node_modules/@mkbabb/value.js` self-link's exports map,
   while `/color`, `/math`, `/easing`, `/quantize` resolve through `paths`. The tsconfig prose
   (lines 41-46) asserts "a CLOSED 8-key set"; the two sets differ by four keys.
3. **No `"."` root export.** `package.json#exports` has no root key, yet `tsconfig.demo.json` maps
   the bare specifier to `./dist/index.d.ts` and the tsconfig prose (lines 22-25) asserts that
   glass-ui imports value.js by the bare specifier. It does not:
   `grep -rho "@mkbabb/value\.js[a-zA-Z./]*" node_modules/@mkbabb/glass-ui/dist/` yields
   `7 × /color, 4 × /css, 2 × /easing` and **zero** bare. So a bare `import "@mkbabb/value.js"`
   would fail for every real consumer, and the tsconfig prose documents a dependency that no longer
   exists.

Confirmed clean: **no demo file reaches into `src/`.**
`grep -rn "from \"../../../src|@src|value.js/src" demo/` → zero hits. The T.W1 dogfood keystone
holds. Demo specifier census:
`25 × /color · 10 × /css · 6 × /math · 5 × /easing · 4 × /quantize`.

**Cure** — generate `tsconfig.demo.json#paths` from `package.json#exports` the same way
`vite.config.ts` already generates its alias set, or delete the `paths` block entirely and let the
self-link's exports map be the single authority. Two hand-maintained mirrors of one closed set is
the mechanism; one generated view is the fix. Add a `"."` export or delete the bare `paths` entry
and the stale prose.

---

### L-10 — INFO — the visual audit never captures this component in its active state

Every MT-F004 row for this component was measured with the slug layer `inert` and `opacity: 0`.
Live confirmation of the layer stack while the main layer is active:

```json
[{"cls":"dock-face justify-center",           "inert":true, "pe":"none","opacity":"0","text":"→"},
 {"cls":"dock-face is-active justify-center", "inert":false,"pe":"auto","opacity":"1","zIndex":"1"},
 {"cls":"dock-face",                          "inert":true, "pe":"none","opacity":"0","text":"oklch(70% 0.15 30deg)"},
 {"cls":"dock-face",                          "inert":true, "pe":"none","opacity":"0","text":"HomeToolsPickerAbout Login  @mbabb"}]
```

All four dock faces are laid out simultaneously at the same rect (370,18,285,46); only the active
one is non-inert. The harness's `getBoundingClientRect` walk therefore reports geometry for
components the screenshot cannot show. Confirmed by reading
`shots/safari-mobile-light/picker.png` — the dock shows only `Home ▾ | Picker About | ⋮`; no slug
field is visible anywhere in the capture. `STATES.json` contains no slug-edit state either.

**Consequence** — geometry findings for the dock's non-main layers are sound (I verified the 22×22
is state-invariant by measuring in both states), but *rendering* findings for them are absent from
the whole visual corpus. The dock layer states are an uncovered surface.

---

## Greenfield lattice — what I would build today

```
demo/platform/auth/                       ← identity is a PLATFORM concern. Full stop.
  identity.ts          pure, Vue-free, unit-tested
                       parseIdentityInput(raw): ParsedIdentity
                       type ParsedIdentity = {kind:"slug"; slug} | {kind:"token"; token}
                       (folds looksLikeSlug + normalizeTokenInput; ONE home)
  errors.ts            toAuthError(e): AuthError   ← branches on ApiProblem.status, never strings
  useIdentity.ts       THE identity port + IDENTITY_KEY
                       { userSlug, isAdmin, lastError, signIn, regenerate, signOut, copySlug }
                       — signIn AWAITS and settles lastError; errors are STATE
  useUserAuth.ts / useAdminAuth.ts / useSession.ts    (unchanged, now the port's only deps)

demo/shell/dock/layers/SlugEditLayer.vue  ← presentation ONLY, ~55 lines
  inject(IDENTITY_KEY)                     — a platform import; the shell→feature edge is gone
  <Input> from @mkbabb/glass-ui/forms      — one field primitive, labelled, configured
  renders lastError in a live region       — the error finally has a display
  no defineExpose, no parent ref           — v-model:active + a local focus watch
  no grammar, no clipboard, no error map

demo/palettes/usePalettePorts.ts           ← FOUR ports (library, browse, admin, colorTarget)
  no SESSION_PORT_KEY, no useSlugMigration wiring

demo/palettes/browser/slug/                ← DELETED (243 lines)
```

Concretely, the moves:

| move | from | to | why |
|---|---|---|---|
| slug + token grammar | 2 SFCs | `platform/auth/identity.ts` | one home, testable without a DOM |
| error taxonomy | 2 SFCs, string matching | `platform/auth/errors.ts` on `ApiProblem.status` | the S.W2 cure, applied once |
| error transport | `slugBarRef.setError()` | `lastError: Ref<AuthError\|null>` | state cannot silently lose its sink |
| `SESSION_PORT_KEY` | `palettes/usePalettePorts` | `platform/auth/useIdentity` | kills 5 shell→feature edges + the cycle |
| `onCopySlug` | `SlugEditLayer` | the two menus that already inject the port | 4 hops → 1 line |
| the field | raw `<input>` | `@mkbabb/glass-ui/forms` `Input` | 4 idioms → 1 |
| compact size floor | per-instance `.dock-tools-btn` | `.glass-dock` root token, then the producer | edict 5, then edict 4 |
| `PaletteSlugBar.vue` + `browser/slug/` | alive | deleted | edict 2 |

Net: the subject drops from 119 to roughly 55 lines and becomes pure presentation; ~250 lines of
duplicate/dead code are deleted; the `shell ⇄ palettes` cycle is cut; the error surface starts
working; the field gets a name; and the T-36 box-model law becomes structural instead of a comment.

---

## Negative results — checked and SOUND

These were live hypotheses on this axis that the evidence killed. Recording them so the next seat
does not re-spend the probes.

1. **No deep-`src/` imports.** `grep -rn "from \"../../../src|@src|value.js/src" demo/` → zero.
   The demo speaks only published `@mkbabb/value.js` subpaths. The T.W1 dogfood boundary holds.
2. **The inert layer does not steal focus.** First-load probe: all three controls report
   `inertAncestor: true`, `slugInputFocusable: false`, `focusableCount: 12` with the slug input
   excluded. `inert` is correctly applied by the producer's `DockLayer`.
3. **The inert layer does not steal pointer events.** `.dock-face` (inactive) computes
   `pointer-events: none`. A mid-probe Playwright "element intercepts pointer events" error came
   from the app being *legitimately in slug-edit mode* (my own earlier synthetic click), not from a
   z-order defect — confirmed by the layer dump in L-10.
4. **The three controls pass WCAG 2.2 SC 2.5.8 (AA)** via the spacing exception — measured, see L-4.
   MT-F004's premise is over-stated for this component.
5. **ESLint is clean on this file** — so none of L-1..L-8 is reachable by the existing lint gate.
6. **`verbatimModuleSyntax` is satisfied.** `SlugEditLayer.vue` imports no types; `SESSION_PORT_KEY`
   is a value. No missing `import type`.
7. **Idiomatic Vue 3.5 is largely satisfied** — `useTemplateRef` at line 14, `defineModel` at line 10.
   The un-idiomatic residue is `defineExpose` + parent `ref` (L-6/L-7), not the reactivity API.
8. **Animations**: this SFC has no `<style>` block and deletes no keyframes. Edict 6 clean.
9. **glass-ui `useDockSearch` is not a drop-in.** It is a fuzzy-search seam
   (`components/dock/composables/useDockSearch.d.ts`), not a generic dock text field. The producer
   has no `DockField` primitive today — the field gap in L-5 is real and the relay should say so.

---

## Relay obligations (standing glass-ui BH/BI edict)

Two producer-level items belong in the active glass-ui BH inbox:

- **BH-a — `dock-icon-button--compact` ships no hit-target floor and is exempted from the dock's
  own coarse-pointer floor.** `--dock-compact-control-size` / `--dock-compact-control-min-width`
  default to `auto` / `0`, and `touch-floor.css` carries
  `:not(.dock-icon-button--compact):not(:where(.glass-dock *))`. Consumers must therefore
  re-derive a floor per call site — which value.js did once (`ActionBarToggle`) and forgot once
  (`SlugEditLayer`). Ask: a 24 px default floor on the compact variant, and drop the
  `:not(--compact)` clause.
- **BH-b — no dock-density field primitive.** `@mkbabb/glass-ui/forms` `Input` is not usable at
  dock row density, `useDockSearch` is search-specific, and `SearchBar` is a search chrome. The
  result is that every dock inline field in this consumer is hand-rolled and each one differs
  (`ColorInput` contenteditable+`role=textbox`+aria-label; `SlugEditLayer` raw `<input>`, no name).
  Ask: a `DockField` primitive, or a documented density recipe for `Input` inside `DockLayer`.

Also relevant to the producer: `ActionBarLayer.vue:53-81` still carries the local
`useLayerTransition` successor for the composable Glass 7 folded into `DockCrossfade` — its own
header requests "a public content-swap composable". That is a sibling file, not the subject, but it
is the same mechanism as BH-b: the producer folded a capability into a component and left consumers
with no composable seam, so consumers re-implement it locally.

---

## Summary table

| id | severity | defect | mechanism |
|---|---|---|---|
| L-1 | BLOCKER | slug/token grammar duplicated across 2 SFCs; one twin (243 L) is dead | no unique semantic home for identity parsing |
| L-2 | BLOCKER | slug-login error path dead through 4 independent breaks | error modelled as imperative push into a component instance, not port state |
| L-3 | MAJOR | shell→palettes inversion (5 edges) + `shell ⇄ palettes` type cycle | god-module residue: ports split, file boundary never moved |
| L-4 | MAJOR | 22×22 compact controls; T-36 box-model law unapplied here | the cure was landed per-instance, so it cannot propagate |
| L-5 | MAJOR | raw unlabelled `<input>`; 4th parallel dock-field idiom | no design-system field usable at dock density; no structural pressure to use one |
| L-6 | MINOR | `onCopySlug` misfiled; 4-hop imperative round-trip through an inert sibling | `defineExpose` + parent ref is an untyped private channel |
| L-7 | MINOR | `defineExpose` leaks unread `slugSwitching` | same |
| L-8 | MINOR | `catch (e: any)` + HTTP-status substring matching, already cured elsewhere | typed error carrier exists and was not imported |
| L-9 | MINOR | `tsconfig.demo.json#paths` vs `package.json#exports` drift, 3 ways | two hand-maintained mirrors of one closed set |
| L-10 | INFO | visual corpus never captures any non-main dock layer | harness measures geometry it cannot screenshot |

**Strongest defect: L-2.** A user whose slug or admin token is rejected sees the field close, the
input clear, and nothing else — no error, no spinner, no retry affordance — because the error path
is broken at four independent points and no test, type, or lint rule observes any of them.
