# CHALLENGE-L — library structure under `PaletteCardMenu.vue` (PASS 3)

> Pass 3. Pass 2 is preserved verbatim at `challenge-L-library.pass-2-2026-07-28.md` (HEAD
> `e79fcd43`); pass 1 at `challenge-L-library.pass-1-2026-07-28.md` (HEAD `32b4040e`). This pass was
> worked **blind** — I traced the component's imports, consumers and ownership from source and drove
> the live app before reading either predecessor — so the overlap below is independent
> re-derivation, not agreement. It contributes: **one new BLOCKER, reproduced live** (L-17); **two
> corrections to pass 2, both against pass 2's own data** (C-1, C-2); and one new MINOR (L-18).

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
matches the explicit declaration this seat was spawned with. The seat is **DECLARED, not inherited**;
no defect on the receipt axis.

## Substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD is `9268f054`** — not the `c654824e` in the commission, and not pass 2's `e79fcd43`. The
  branch has now moved under three consecutive passes:
  ```
  $ git log --oneline -1
  9268f054 docs(V·mega): picker band COMPLETE 12/12 validated — flagship corpus banked; two bands remain
  ```
  Every file:line below is against `9268f054`. `PaletteCardMenu.vue` is still 228 lines and still
  byte-identical to pass 1's citations.
- Dev server live at `http://localhost:9000`, `VITE_API_URL` unset — the app therefore boots into the
  **`misconfigured`** availability state. Pass 2 recorded that same precondition. It turns out to be
  load-bearing (L-17).
- Probes: `probe-L3-mix-relay.mjs`, `probe-L3-misconfig-latch.mjs`, results in `probe-L3-results.json`.

**Verdict: DEFECTIVE.** Three BLOCKERs (two carried and re-reproduced, one new), six MAJORs, six
MINORs. Two pass-2 claims corrected.

---

## Part I — independent re-derivation of the standing findings

I did not read pass 1 or pass 2 until my own trace was complete. Each row is a claim I reached and a
command I wrote before seeing the predecessor that also reached it.

| standing finding | my independent command | result |
|---|---|---|
| export dual path (p1 L-1) | `grep -rn "export/serializers\|export/json\|export/png\|…" demo src e2e` → **one hit, `demo/test/export/byte-exact.test.ts:23`**; `demo/palettes/export.ts` = 132 lines vs `demo/palettes/export/` = 914 lines across 12 modules | **CONFIRMED** |
| eslint boundary dead (p1 L-2) | `npx eslint --print-config …/PaletteCardMenu.vue` → `no-restricted-imports: null`; `ls -d demo/@` → *No such file or directory*; `grep -rn 'from "@components' demo src \| wc -l` → **0** | **CONFIRMED**, sharpened → C-3 |
| untyped action relay (p1 L-3 / p2 L-10) | reproduced live at `/#/mix` with an independently written seed+drive script | **CONFIRMED**, count corrected → C-1 |
| `demo/ui/` alias layer (p1 L-4 / p2 L-15) | 19 dirs, 19 one-line `index.ts`; 18 reach the glass-ui **root**, `input/` alone reaches `/forms` | **CONFIRMED**, scope corrected → C-2 |
| `isOwned` homeless (p2 L-11) | `grep -rn "isOwned\|is-owned\|userSlug ===" demo` → **one derivation site**, `BrowsePane.vue:99`; omitted at the other 4 consumers | **CONFIRMED** |
| two spellings of "remote" (p2 L-13) | `PaletteCardMenu.vue:94` `!palette.isLocal` vs `paletteKind` at `:16,:28,:49,:64,:74,:84,:134,:144` — and `utils.ts:22` defines them equal | **CONFIRMED** |
| visibility arity (p2 L-14) | `api/.../format.ts:86` `published = visibility === "public"` vs `PaletteCardMenu.vue:222` `isPublic = visibility !== "private"` — opposite answers on `unlisted` | **CONFIRMED**, and I closed the reachability question → below |
| visual matrix is silent (p1 L-9) | read `shots/safari-desktop-light/browse.png` — "The commons is unreachable." / "No saved palettes yet."; `REPORT.md:120-121` bodyText 237/280 | **CONFIRMED** |

**Reachability closed on the visibility finding.** Pass 2 left `unlisted` as an open hypothesis on the
demo side. It is unreachable on the **API** side too, which is the stronger statement: every write
path pins the value. `crud.ts:97` and `forks.ts:76` create at `"public"`, and the only visibility
route takes `target: Extract<PaletteVisibility, "public" | "private">`
(`api/src/modules/palette/service/visibility.ts:60-64`). The three-state enum has a **dead middle at
both ends of the wire**. That keeps the finding MINOR and latent — but it also means the divergence
is a live *type-lie* today: `Palette.visibility` declares a state the system cannot produce, and two
modules disagree about what it would mean.

---

## Part II — corrections to pass 2

### C-1 — the dead-affordance count is **22, not 18**; pass 2 under-counted its own strongest finding

Pass 2's table (its L-10) gives `MixSourceSelector` **"4 (all of them)"** dead items, listing
`Publish, Rename, Export, Delete`. But `Export` is a `DropdownMenuSubTrigger`
(`PaletteCardMenu.vue:107-111`), not an action — it emits nothing. The five actions live in the
sub-menu (`:113-128`). Pass 2 expanded that sub-menu in its `ExtractWorkbench` row ("Export×5" → 5
dead) but not in its `MixSourceSelector` row. Internal inconsistency.

I expanded it (`probe-L3-mix-relay.mjs` hovers the sub-trigger before enumerating):

```
menu items on /mix card:  ["Publish","Rename","Export","Delete"]
menu incl. submenu:       ["Publish","Rename","Export","Delete",
                           "JSON","CSS Custom Properties","Tailwind Config","SVG Swatch","PNG Swatch"]
```

`MixSourceSelector` binds **zero** listeners (`MixSourceSelector.vue:264-267`), so the dead set there
is **Publish + Rename + Delete + 5 export formats = 8**, not 4.

| consumer | dead actions | basis |
|---|---|---|
| `MixSourceSelector.vue:264` | **8** | measured |
| `AdminUsersPanel.vue:140` | **9** | code-derived |
| `ExtractWorkbench.vue:145` | **5** | code-derived |
| **total** | **22** | |

I also closed the half pass 2 left inferred. Pass 2 clicked Delete only. I clicked Delete **and**
Export → JSON, with a `page.on("download")` listener attached:

```
store BEFORE Delete: ["Probe Alpha","Probe Beta"]
store AFTER  Delete: ["Probe Alpha","Probe Beta"]
download fired after Export>JSON: false
```

Both halves of the sub-menu claim are now measured, not inferred.

### C-2 — the 234 kB root-barrel chunk is **not** attributable to `demo/ui/`; pass 2's L-15 headline number does not survive

Pass 2 upgraded the `demo/ui/` finding from MINOR to MAJOR on the strength of a measured
234,309-byte `@mkbabb_glass-ui.js` root-barrel chunk on `/#/palettes`, concluding *"the 234 kB
root-barrel chunk leaves the graph"* once `demo/ui/` is deleted. That inference does not hold, for
two reasons I checked:

1. **The measurement is of a Vite _dev_ pre-bundle, not a build artifact.** The filename pass 2
   reports — `node_modules/.vite/deps/@mkbabb_glass-ui.js` — is esbuild dep-optimization output.
   Dev pre-bundles are deliberately un-treeshaken; they say nothing about the shipped graph.
2. **glass-ui is side-effect-free in JS**, so the production Rollup build tree-shakes the root reach:
   ```
   $ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').sideEffects)"
   [ '*.css' ]
   ```
   And the root barrel is pure re-export — `head -c 900 node_modules/@mkbabb/glass-ui/dist/glass-ui.js`
   is 13 consecutive `import … from "./chunk.js"` lines, nothing else.

The 43× file-size ratio pass 2 cites (`glass-ui.js` 25,239 B vs `dropdown-menu.js` 586 B) is real but
is a ratio between *entry* files, not between what each pulls.

**The `demo/ui/` finding stands — on structure, not on bytes.** It is 19 directories and 19 one-line
files interposed between the demo and its design system: an alias layer, which edict 2 bans, with no
policy (18 root reaches, one `/forms` subpath reach), reached from this component through four `..`
segments (`PaletteCardMenu.vue:190`). I rank it **MAJOR on edict-2/3/4 grounds and INFO on
performance**, and I withdraw the byte claim as the justification. Deleting `demo/ui/` remains
correct; it should not be sold as a 234 kB win.

### C-3 — pass 2's Part III mis-diagnoses its own probe output

Pass 2's Part III explains its measured `{"t":"Publish","disabled":false}` as: *"the latch is applied
only on the `saved`-Publish item (`:30`)"* — implying the observed Publish was un-gated for some
structural reason. But `MixSourceSelector` renders **`saved`**-kind palettes, so the item it measured
**is** the `:28-32` saved-Publish item, and that item *does* carry `:disabled="apiOffline"` (`:30`).
The latch was applied and still evaluated false. Pass 2 had the anomaly in hand and explained it
away. The real cause is L-17.

---

## Part III — new finding

### L-17 — BLOCKER — a 4-state availability latch collapsed to 1; the `misconfigured` state leaves the doomed action enabled and unannounced. Reproduced live.

```ts
// PaletteCardMenu.vue:214-217
// K-INV5: the publish action reads the availability latch — through the
// injected api-client seam (S.W2 W2-4), not a hard module-singleton import.
const { availability } = useApiClient();
const apiOffline = computed(() => availability.value === "unavailable");
```

The latch is not a boolean:

```ts
// demo/platform/transport/availability.ts:40-44
export type ApiAvailability = "unknown" | "available" | "unavailable" | "misconfigured";
```

and the transport gate short-circuits **both** degraded members:

```ts
// demo/platform/transport/availability.ts:187-193
export function assertApiAttemptAllowed(): void {
    if (apiAvailability.value === "misconfigured") throw new DevMisconfigError();
    if (apiAvailability.value !== "unavailable") return;
    if (Date.now() - unavailableSince >= RETRY_COOLDOWN_MS) return;
    throw new ApiUnavailableError();
}
```

`=== "unavailable"` therefore returns **false** in the `misconfigured` state, and every latch-gated
affordance in this file (`:29` Publish `:disabled`, `:35-39` the annotation, `:51` visibility
`:disabled`, `:59` its annotation) silently reports "healthy" while the transport is throwing.

**This is the invariant the file's own comment declares, violated by the file that declares it**:
*"K-INV5: a tripped availability latch disables the doomed action and NAMES the degraded state
in-register (small-caps annotation, not a toast)"* — `PaletteCardMenu.vue:24-26`.

**Reproduction — live, single page load** (`probe-L3-misconfig-latch.mjs`; results in
`probe-L3-results.json`). The app is demonstrably in the `misconfigured` state:

```
LATCH-STATE surfaces on /#/browse: [
 "dev misconfigured — run `npm run dev`",
 "The commons is unreachable."
]
console errors mentioning MISCONFIGURED: [
 "[value.js] value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is
  targeting the cross-origin production API (https://api.color.babb.dev), whose CORS allow-list
  excludes localhost…",
 "Failed to load remote palettes: DevMisconfigError: …"
]
```

`DockStatusLamp` names the state. The transport already threw `DevMisconfigError` for the browse
load. On the same session, the card menu:

```
MENU on /#/palettes while latch is tripped:
[ { "text": "Publish", "ariaDisabled": null, "dataDisabled": false },
  { "text": "Rename",  "ariaDisabled": null, "dataDisabled": false },
  { "text": "Export",  "ariaDisabled": null, "dataDisabled": false },
  { "text": "Delete",  "ariaDisabled": null, "dataDisabled": false } ]
in-menu annotations rendered: []
```

**Publish is enabled. No `offline` annotation renders.** Clicking it issues a request that
`assertApiAttemptAllowed` throws on synchronously. Three surfaces read one latch and two of them
(`ApiOfflineChip.vue:36-37`, `DockStatusLamp` via `status-lamp.ts:49-62`) handle `misconfigured`
while this one does not — so the app simultaneously tells the user "dev misconfigured" in the dock
and offers an enabled Publish in the card.

This is the *mechanism* beneath pass 2's L-12. Pass 2 found three homes for the degraded **register**
(the label and its styling) and proposed unifying the presentation. The deeper defect is that the
three homes have **three different domains**: `resolveLampState` switches on all four members
(`status-lamp.ts:49-62`), `ApiOfflineChip` tests two (`:35-36`), and this file tests one (`:217`).
Unifying the label without unifying the domain would leave L-17 standing.

**Owner-edict violation:** #2 — `=== "unavailable"` on a 4-member union is a masking fallback: it
silently maps two unhandled states onto "fine".

**Cure.** The predicate is not a boolean and must stop being written as one. One home, at the
concept's own layer — `demo/platform/transport/degraded.ts`:

```ts
export interface Degraded { role: "status" | "alert"; short: string; long: string; doomed: true }
export function describeAvailability(a: ApiAvailability): Degraded | null {
    switch (a) {
        case "misconfigured": return { role: "alert",  short: "misconfigured",
                                       long: "dev misconfigured — run `npm run dev`", doomed: true };
        case "unavailable":   return { role: "status", short: "offline",
                                       long: "backend offline — saved locally",       doomed: true };
        case "unknown":
        case "available":     return null;
    }
}
```

An exhaustive `switch` over the union: adding a fifth member becomes a compile error at the **one**
site instead of a silent false at three. `status-lamp.ts` becomes
`isDev ? describeAvailability(a) : null` — the dev gate is the *dock's* policy, not the concept's,
which is what made pass 2 correctly note the pure resolver was structurally unreachable.
`ApiOfflineChip` consumes `long`; this menu consumes `short` + `doomed`. Under L-10's descriptor cure
it is one `needsNetwork` row evaluated once, not four hand-written `:disabled` / annotation pairs.

---

### L-18 — MINOR — transport DI at leaf altitude makes the menu unmountable in isolation

`PaletteCardMenu.vue:216` calls `useApiClient()`, which throws without a provider:

```ts
// demo/platform/transport/useApiClient.ts:56-62
if (!client) throw new Error("useApiClient() requires an API_CLIENT_KEY provider — …");
```

Every other input to this component is a prop. This one out-of-band dependency means the menu cannot
be mounted in a unit test or a visual-state harness without standing an entire transport provider
above it — which is part of why the states this component gets wrong (L-17) have never been caught by
a test, and why the visual matrix has no row for it (p1 L-9). It also instantiates per card: a 50-row
browse grid performs 50 `inject` + 50 `computed` over one shared `Ref`.

The feature → platform *direction* is correct (downward, and pass 2's negative results rightly cleared
it). The defect is **altitude**: a leaf asking a global question. Under the L-10 + L-17 cures it
disappears — `availableActions(palette, viewer, availability)` takes the latch as an argument and
returns actions already carrying `disabled` + `annotation`, the menu becomes 100% props-driven, and
exactly one `useApiClient()` call remains, at the pane.

---

## Part IV — carried findings

Pass 1's **L-1…L-9** and pass 2's **L-10…L-16** all stand; the eight I re-derived independently are
in Part I. Three carry notes:

- **p2 L-10 (dead menu items) is re-reproduced** on a different seed (2 palettes, not 1) with an
  independently written script, and its count is corrected upward to 22 (C-1).
- **p2 L-15 (`demo/ui/`) keeps its MAJOR rank but loses its byte justification** (C-2). The cure is
  unchanged; the argument for it is edict-2/3/4, not performance.
- **p2 L-12 (degraded register) is subsumed by L-17.** Its presentation-unification cure is
  necessary but insufficient: three homes with three *domains* is the load-bearing half.

I add one detail to the nested-`<button>` observation both prior passes made. It is not only invalid
HTML — it is invalid *silently*, because Vue builds the DOM through `createElement`/`appendChild`,
which does not enforce content models the way the HTML parser does. The tree that HTML Living
Standard §4.10.6 forbids ("Phrasing content, but there must be no interactive content descendant")
survives to runtime and is what AT consumes. My probe reproduces both instances:

```
NESTED button-in-button: 2 [
 { "outerAria": "Select palette Probe Alpha", "inner": "Palette menu" },
 { "outerAria": "Select palette Probe Beta",  "inner": "Palette menu" } ]
```

This corroborates pass 2's Amendment 2 — `PaletteCard` is being asked to be both an instrument and a
thumbnail, and the invalid nesting is the receipt.

---

## Greenfield module lattice

Pass 2's lattice is right and I adopt it unchanged, with one amendment L-17 forces.

```
shell/            router, dock, panes — the only role that composes features
  └── palettes/                                        ← feature; owns the palette DOMAIN
        index.ts     Palette, PaletteColor, PaletteVisibility, PaletteKind,
                     getPaletteKind, isOwnedBy, isPubliclyVisible, createSlug
        api/         endpoints
        export/      index.ts = the byte-exact serializers + the one download effect
        browser/card/
          actions.ts     PALETTE_ACTIONS descriptors + PaletteCardAction union
          PaletteCard.vue        props: palette, viewer, actions: Partial<Record<…>>
          PaletteCardTile.vue    inert; no menu, no emits  (Mix source, Extract preview)
          PaletteCardMenu.vue    v-for over PALETTE_ACTIONS ∩ actions — ~30 template lines
  └── platform/
        transport/index.ts   useApiClient, ApiClient, ApiAvailability,
                             describeAvailability, ApiOfflineChip.vue
        auth/ · storage/
  └── shared/       role-free utilities
  └── (no demo/ui/ — glass-ui subpaths consumed directly)
                    ↓
@mkbabb/glass-ui/<subpath>        design system — primitives + variants live HERE
                    ↓
@mkbabb/value.js/<exports key>    library — self-reference resolution; tsconfig paths deleted
```

**Amendment 3 — every domain predicate in this lattice must be a total function over its union, not
an `===` against one member.** `describeAvailability` is the instance L-17 forces, but the rule is
what generalises: `getPaletteKind` already obeys it (a `switch`-shaped total function in
`utils.ts:22-30`), `resolveLampState` obeys it (`status-lamp.ts:49-62`), and the three predicates
this component hand-rolls — `apiOffline` (`:217`), `isPublic` (`:222`), `!palette.isLocal` (`:94`) —
all violate it, each by testing one member of a union with three or four. That single rule, applied,
dissolves L-17, p2 L-13 and p2 L-14 together, and it is checkable: a union-typed value compared with
`===` inside a `computed` in a `.vue` file is a lintable pattern.

**Order of value (revised):**
1. **p2 L-10 + p1 L-3 + L-17** — `actions.ts`, the handler-map inversion, and
   `describeAvailability`. One wave: they are the same seam viewed from two sides (which actions
   exist, and which are doomed). Fixes 22 dead affordances and one live enabled-doomed action.
2. **p1 L-1** — delete `demo/palettes/export.ts` + `usePaletteExport.ts`, promote
   `export/serializers.ts` to `index.ts`. A deletion, not a build; moves 914 lines of contract code
   from test-only to shipping.
3. **p2 L-15 + p1 L-2** — delete `demo/ui/`, re-encode the eslint boundary by role
   (`eslint-plugin-boundaries` keyed on element type, so a restructure cannot silently detach it —
   an unclassified directory is itself an error). Makes edicts 2 and 4 structural rather than
   documentary.

---

## Negative results (checked this pass)

- **Published-surface forgery** — none. `grep -rn "@src/\|\.\./\.\./src/" demo` over `.ts`/`.vue`
  returns **0 rows**. All 20 library import sites use live `exports` keys
  (`./color ./value ./css ./easing ./math ./transform ./quantize`), and `vite.config.ts:37-50`
  *generates* the self-alias set from the exports map, so demo resolution cannot drift from the
  published surface. A real consumer could write every library import the demo writes. This axis is
  clean, and it is the axis the challenge premise most directly targets — the premise fails here.
- **This component imports nothing from `@mkbabb/value.js`**, so it cannot falsely prove the public
  API even in principle.
- **inv-K-1** — `src/**` → glass-ui remains lint-banned and unviolated
  (`eslint.config.js:204-217`); the topology is still one-directional. Note the contrast with L-2:
  the *library* boundary is enforced and alive, the *demo* boundary is dead. The pattern that
  survived is the one keyed to a directory that did not move.
- **Barrel discipline honoured in practice** — `grep -rn 'palettes/browser/.*\.vue"' demo` excluding
  the feature itself → **0 rows**. Nothing reaches a raw internal `.vue`, though nothing enforces it.
- **`verbatimModuleSyntax`** — clean. `:177` (`Palette`) and `:178` (`PaletteKind`) are
  `import type`; `:176`, `:179`, `:180-190`, `:191-204` are genuine value imports.
- **Vue 3.5 idioms** — `const { palette } = defineProps<…>()` (`:206`) is the reactive destructure,
  and `palette` is read inside `computed` (`:222`), which preserves reactivity under the 3.5
  transform. No `defineModel` → no stale-read hazard, no `shallowRef` obligation. No template refs →
  no `useTemplateRef` obligation.
- **God module** — not one. 228 lines, 53 script, two `computed`s, no business logic. Its defect is
  under-specification, not accumulation.
- **Animations (edict 6)** — this file defines no keyframes and deletes none; the `vj-morph` and
  `cartoon-surface` registers it neighbours are intact (`PaletteCard.vue:337-363`).
- **Page errors on the probed routes** — none beyond the deliberate S.W0-1 misconfiguration throw,
  which is the designed loud failure and is working correctly at its own layer.

---

## Probes in this directory

| file | what it establishes |
|---|---|
| `probe-L3-mix-relay.mjs` | C-1: 8 dead actions at `/#/mix` (sub-menu expanded), Delete leaves the store unchanged, Export→JSON fires no download, 2 nested `<button>` |
| `probe-L3-misconfig-latch.mjs` | L-17: the app in `misconfigured` state — dock lamp + `DevMisconfigError` in console — with Publish rendered enabled and unannotated on the same load |
| `probe-L3-results.json` | both runs' captured output |
