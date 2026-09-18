<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/TYPED-DAGS-AND-DISPOSITIONS-2026-07-29.md
  original-mtime: 2026-07-29T17:38:46
  original-sha256: 5736d6da2451a3b558952736038b5d2b382ede79aadecbf3709491d6edd2a6cd
  original-bytes: 17897
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value typed DAGs and terminal dispositions — 2026-07-29

Status: formation evidence at clean `e01d0065`; live-dirty differences are
identified where material. Counts do not substitute for reachability.

## 1. Node and edge grammar

```ts
type NodeKind =
    | "source" | "test" | "component" | "style" | "route" | "state"
    | "di" | "api-route" | "api-service" | "repository" | "worker"
    | "asset" | "package-entry" | "consumer";

type EdgeKind =
    | "runtime-import" | "type-import" | "dynamic-import" | "style-import"
    | "route-renders" | "component-renders" | "provides" | "injects"
    | "calls" | "reads" | "writes" | "serializes" | "packs" | "consumes";

type Disposition = "KEEP" | "FOLD" | "MOVE" | "SPLIT" | "PRUNE";

type DagEdge = Readonly<{
    from: string;
    to: string;
    kind: EdgeKind;
    lazy: boolean;
    authority: "value" | "glass" | "parse-that" | "keyframes" | "consumer";
}>;
```

Every executable graph artifact must preserve edge kind and laziness. A flat
import count cannot prove package weight, DI ownership, route reachability, or
test isomorphism.

## 2. Census

At the committed snapshot:

| plane | observed |
|---|---:|
| Vue SFCs | 88 |
| TypeScript files under source/demo/API/tests/scripts | 419 |
| CSS files | 9 |
| API files | 132 |
| demo files | 269 |
| library `src` files | 26 |
| explicit worker-file references in the mechanical file census | 1 |
| public package entries | 7 |
| broad package root export | 0 |
| shadcn/Glass forwarding barrels | 19 |
| imports through those barrels | 90 across 48 consumers |
| direct `@mkbabb/keyframes.js` runtime imports in Value product source | 0 |
| Value package dependency on Keyframes | 1 phantom manifest/lock edge |

The live-dirty corpus adds six omitted component workflows and banks the
GenericActionBar challenge. It does not change the physical 88-SFC denominator.

## 3. Library/package DAG

### Current

```text
package.json exports
  ├─ /color ─> src/subpaths/color ─> color model/anchors/conversion
  ├─ /value ─> src/subpaths/value ─> immutable CSS-value representation
  ├─ /css ─> src/subpaths/css ─> css grammar/stylesheet/timeline
  │                                 ├─> color
  │                                 ├─> value
  │                                 ├─> easing types
  │                                 └─> result
  ├─ /easing ─> easing
  ├─ /math ─> foundation math
  ├─ /transform ─> decompose + path parser/geometry   [contradictory]
  └─ /quantize ─> quantize

package dependencies
  ├─> @mkbabb/glass-ui          [demo/build consumer]
  └─> @mkbabb/keyframes.js      [phantom reverse edge]
```

`/transform` claims “zero parsing” while exporting a string-accepting
`PathGeometry`. The code contains a regex number scanner and parses each
convenience call. The manifest depends on Keyframes even though no Value
product source imports it.

### Target

```text
immutable unpublished parse-that candidate tarball
  ├─runtime-result-span-recovery─> /css grammar dogfood
  ├─runtime-result-span-recovery─> /path SVG d grammar dogfood
  └─same primitive─> named non-CSS grammar receipt
        └─deletion/equivalence/formal-performance proof─> published release
              └─exact released rebind/retest─> /css + /path closure

/css grammar
  ├─ CSS values/timing/stylesheet
  ├─ CSS transform list + matrix constructors
  └─ CSS motion-path/path() wrapper
/path SVG d grammar ─> typed PathGeometry

/transform ─> numeric decompose/recompose/interpolate/slerp
/css ─X─> /path geometry evaluation in timing-only imports
/transform ─X─> parse-that | css | color | path
Keyframes /easing ─X─> css | path | transform
Keyframes /engine ─> css | path | transform             [allowed heavy tier]
Value V.L6 ─> Keyframes W2 deletion ─> W3 immutable pack
Value/Keyframes engine edge ─> Atlas W10 crater          [remains open]
Glass 8 candidate pack ─> Value development only
published immutable Glass 8 ─> Value V.G1/final closure
Value package ─X─> Keyframes package
Value published tarball ─X─> Glass package
Value demo/build ─> Glass package [devDependency only]
```

### Dispositions

| concept | current home | target | disposition |
|---|---|---|---|
| numeric decompose/recompose/slerp | `src/transform/decompose.ts` | `/transform` | KEEP |
| SVG string scanner | `src/transform/path.ts` | parse-that-backed `/path` grammar | MOVE then PRUNE |
| path flattening/geometry | `src/transform/path.ts` | `/path` typed geometry | SPLIT+MOVE |
| string `PathGeometry` constructor | `/transform` | none | PRUNE |
| parse-each-call path helpers | `/transform` | explicit parse then typed geometry | PRUNE |
| duplicate `PathGeometry.getTotalLength()` | `/transform` | `PathGeometry.totalLength` on `/path` | PRUNE duplicate; KEEP property |
| CSS transform-list grammar | absent | `/css` | KEEP after V.L4 forms it |
| numerical `invertCssMatrix*` | candidate only | none | PRUNE; no consumer evidence |
| `serializeCssValue` | internal stylesheet | public failure-explicit `/css` inverse | FOLD |
| `serializeKeyframeSelector` | exported internally, not `/css` | public `/css` inverse | FOLD |
| hybrid animation options/shorthand serializer | Keyframes emitter candidate | parsed-shorthand inverse + semantic ordered longhands | SPLIT |
| Value adaptive-sampling provenance | formation candidate | none | PRUNE; Keyframes owns callable sampler receipt |
| raw unknown-at-rule string construction | structurally possible | parser-provenanced opaque node only | PRUNE |
| Value→Keyframes manifest edge | `package.json` + lock | none | PRUNE |
| immutable unpublished parse candidate | successor producer wave | dogfood only, then released rebind | KEEP as bounded evidence; PRUNE as final coordinate |
| Keyframes “can migrate” claim | coordination prose | W2 deletion + W3 immutable pack receipts | PRUNE claim; KEEP receipts |
| Atlas engine/MorphSVG receiver | cross-repo consumer edge | W10 crater | MOVE open edge to W10 |
| Glass 8 candidate pack | producer candidate | development only | KEEP as development evidence; PRUNE as final coordinate |
| published immutable Glass 8 | producer release | V.G1/final Value closure | KEEP |
| Glass runtime dependency classification | `dependencies` | `devDependencies` | MOVE |
| JS-mtime-only Glass readiness | `scripts/dev/dev.sh` | complete immutable artifact-set receipt | SPLIT |

## 4. Demo route/component DAG

### Route inventory at e01

The committed router has fourteen identities:

```text
picker, palettes, browse, extract, mix, generate, gradient,
atmosphere, blob,
admin-users, admin-names, admin-audit, admin-flagged, admin-tags
```

Every route renders a stub component; `App.vue` and `useViewManager` translate
the route name into `VIEW_MAP`, and `usePaneRouter` separately resolves pane
components. Current route arrival therefore does not intrinsically own its
heading, focus, scroll, state, or actions.

### Current route graph

```text
vue-router route (Stub)
  └─> App.vue
       ├─> useViewManager ─> VIEW_MAP
       ├─> usePaneRouter
       │    ├─dynamic─> route pane components
       │    └─> DockActionBar descriptors ─> Ref<any> pane instances
       ├─> mobile PaneSlot       [no pane-instance capture]
       ├─> desktop PaneSlots     [pane-instance capture]
       └─> Dock
            ├─> picker ActionBarLayer
            └─> GenericActionBar ─> optional-chain no-op handlers
```

### Target route graph

```text
RouteScene<ViewId>
  ├─> route-owned H1/focus/scroll identity
  ├─> one protagonist
  ├─> optional inspector/secondary region
  ├─> route-local actions closed over route state
  └─> stable App main + stable Dock navigation
```

### Route/component dispositions

| concept | disposition |
|---|---|
| one `VIEW_MAP` inventory | KEEP, narrow to scene facts |
| stub routes plus out-of-band pane rendering | FOLD into typed `RouteScene` |
| parallel mobile/desktop state derivation | PRUNE; one container/scene law |
| `GenericActionBar` and shell route-command mirror | PRUNE |
| `PaneActionRefs`, `Ref<any>`, mount callbacks, forward exposes | PRUNE |
| route-local async result truth | KEEP |
| universal companion palettes/about Card | PRUNE; optional by route job |
| one H1/persistent main/focus/scroll identity | KEEP after V.U1 forms it |

## 5. State and DI DAG

### Current state owners

```text
App
  provides COLOR_MODEL_KEY
  provides EDIT_TARGET_KEY
  provides CSS_COLOR_KEY
  provides VIEW_MANAGER_KEY
  provides OVERTURE_KEY
  calls atmosphere boot
    provides SAFE_ACCENT_KEY
    provides INK_AMBIENT_KEY
    provides AURORA_ATOMS_KEY
    provides BLOB_CONFIG_KEY
  calls palette ports
    provides SESSION_PORT_KEY
    provides LIBRARY_PORT_KEY
    provides BROWSE_PORT_KEY
    provides ADMIN_PORT_KEY
    provides COLOR_TARGET_PORT_KEY
  provides API_CLIENT_KEY

ColorPicker
  injects color/view/palette/overture
  provides POINTER_DEBUG_KEY                         [production debug debt]

Persistence
  localStorage: color, palette, user slug/token, admin token, ground record
  sessionStorage: anonymous session token
```

### Target ownership

| state/DI concept | target | disposition |
|---|---|---|
| one app color pipeline | app-provided typed port | KEEP |
| route identity | router/scene, not component ref | MOVE |
| palette session/library/browse/Admin ports | keep only if each consumer is typed and policy-honest | KEEP/FOLD |
| browser bearer/localStorage/sessionStorage auth | same-origin HttpOnly cookie | PRUNE |
| admin token in localStorage | server/bootstrap authority | PRUNE |
| production pointer-debug provide/inject/log branch | none | PRUNE |
| CSS/ambient/blob/aurora producer atoms | exact semantic providers | KEEP |
| shell-to-pane instance dispatch | none | PRUNE |
| thrown missing-provider assertions | app boot Result/terminal error where boot-critical | FOLD |

DI gates:

1. every `provide` has a typed consumer or is pruned;
2. no default `ref(null)` masks a required provider;
3. no layout branch changes command reachability;
4. no UI state pretends to authorize API access;
5. auth secrets never enter browser-readable storage.

## 6. API DAG

### Current

```text
Hono routes
  ├─ GET /:slug ─> getPaletteBySlug
  │                  └─ findBySlug + deleted check only
  ├─ POST /:slug/fork ─> forkPalette
  │                       ├─ findBySlug existence
  │                       ├─ transaction recheck existence
  │                       ├─ insert child/version
  │                       └─ increment parent
  ├─ GET /:slug/forks ─> listForks
  │                       └─ deletedAt-only child filter
  ├─ GET /:slug/provenance ─> getProvenance
  │                            └─ isActivePublic per hop
  ├─ GET /:slug/versions ─> listVersions(slug)
  ├─ GET /:slug/versions/:hash ─> getVersionByHash(hash) [slug discarded]
  └─ POST /:slug/revert ─> requireOwnership(target)
                            └─ findByHash(hash) [global transplant]

PaletteVersionRepository
  `_id = contentHash`
  insertIfAbsent(hash) [global membership suppression]
```

### Target

```text
route
  └─> PaletteIdentityRepository.resolveSlug(slug) ─> immutable paletteId
  └─> ObjectAccessPolicy(operation, paletteId, viewer)
       └─> default-deny / existence-hiding projection / explicit Admin branch
  └─> palette-local RevisionRepository(paletteId, revisionNo)
       ├─> immutable RevisionMembership
       ├─> PerReleaseAccessPolicy(revision, viewer)
       ├─> immutable Release + strong validator
       └─> ReleaseContentStore [LOCAL-SNAPSHOT default; corrected R2 may select]
            ├─ LOCAL-SNAPSHOT
            ├─ GLOBAL-BLOB-SPLIT
            ├─ PERSISTENT-TRIE
            └─ BOUNDED-DELTA

Palette aggregate
  ├─> immutable paletteId + generated slug locator
  ├─> private saved Workspace(workspaceRevision)
  ├─> handleGeneration / policyRevision CAS clocks
  └─> ForkSourceEdge UNIQUE(childPaletteId)
```

### API dispositions

| concept | disposition |
|---|---|
| routes/service/repository vocabulary | KEEP |
| `isActivePublic` as facility-wide authorization | FOLD into closed policy |
| `unlisted` | PRUNE |
| global `findByHash` for route/revert | PRUNE |
| `/versions/:releaseHash` route identity | PRUNE; absorb numeric vnext revision routes |
| `CURRENT-GLOBAL-MEMBERSHIP` | PRUNE |
| `LOCAL-SNAPSHOT` | KEEP as correctness baseline/default |
| `GLOBAL-BLOB-SPLIT` | unselected; BLOCKED-ON corrected F-L1 R2 |
| `PERSISTENT-TRIE` | unselected; BLOCKED-ON corrected F-L1 R2 |
| `BOUNDED-DELTA` | unselected; BLOCKED-ON corrected F-L1 R2 |
| `OBJECT-LOCAL-BLOB` | non-F-L1 backend fallback only; never a compatibility path |
| per-object author/parent/fork membership | SPLIT from payload identity |
| route slug discarded at version read | PRUNE |
| transaction recheck of existence only | FOLD into policy recheck |
| child list deleted-only filter | FOLD into viewer policy |
| `Gone` before viewer policy | MOVE after authorization; owner-only lifecycle projection |
| mutable slug as object identity | PRUNE; immutable `paletteId` KEEP |
| object authorization reused for every revision/list item | SPLIT into object + per-release policy |
| stored public `forkCount` | PRUNE; exact filtered indexed join KEEP |
| route-local Admin repository bypass | PRUNE; explicit audited Admin policy KEEP |
| read-then-write CAS | PRUNE; conditional database write + `matchedCount === 1` KEEP |
| fork/revert without exact replay | FOLD into process-local keyed byte-equivalent replay |

## 7. Style and material DAG

### Current

```text
demo styles
  ├─ app/theme/layout/route styles
  ├─ Tailwind utilities
  ├─ 19 `demo/ui/**` forwarding paths
  ├─ direct Glass subpaths
  ├─ some Glass root imports
  └─ E2E direct `glass-ui/dist/styles`
```

### Target

```text
Glass published primitives/styles
  └─ interaction/material/paint mechanics

Value theme/feature styles
  └─ content layout, measured chroma, route hierarchy, feature-specific geometry
```

Rules:

- a producer primitive owns focus, hit target, overlay, forced colors, and
  interaction motion;
- Value does not copy producer CSS, reach `dist/styles` directly from product
  tests, or alias raw source;
- a style file survives only with a semantic owner and a live consumer;
- a divider survives only when it names a grouping boundary;
- a Card survives only when its material and interaction role are both real.

Dispositions: forwarding barrels, `components.json`, dead `cn`/clsx/tailwind
merge, copied CSS, raw-source aliases, and compatibility style paths **PRUNE**.
Feature-owned chroma/layout **KEEP**. Repeated feature rules **FOLD** only after
two real consumers.

## 8. Tests

### Target layers

```text
unit tests
  └─ pure value/grammar/policy/state behavior
external isomorphic tests
  └─ import only public package entries or mounted HTTP/UI surfaces
packed graph tests
  └─ module evaluation, declaration closure, tarball install
browser journeys
  └─ route/component/state/viewport/media/keyboard workflows
```

Tests may not deep-import the implementation to certify a public contract.
Test helpers cannot implement an alternate parser, serializer, policy, or
consumer shim. Snapshot text is secondary to semantic assertions.

## 9. Workers and assets

At e01 the mechanical census finds one explicit worker-file reference. Worker
promotion is not inferred from a filename:

| plane | rule |
|---|---|
| worker | KEEP only when a measured CPU/off-main-thread job and typed message protocol exist |
| service worker | PRUNE; a future named delivery contract requires its own owning wave |
| font assets | normal hashed producer assets; no custom source/font plugin |
| images/markdown/content | typed content registry; no deep alias imports |
| generated assets | exact producer, input hash, and reproduction command required |

Unused workers/assets **PRUNE**. Renderer/animation scheduling remains Glass or
Keyframes ownership, not a Value worker fork.

## 10. Consumer tiers

| consumer/tier | allowed Value entries | forbidden eager reach |
|---|---|---|
| Keyframes eager `.` | separately proved `/math` only | `/css`, `/path`, `/transform`, parse-that, color, heavy engine |
| Keyframes named timing `resolveEasing()` | `/easing` only | `/css`, `/path`, `/transform`, parse-that, heavy engine |
| Keyframes engine | `/css`, `/path`, `/transform` as causally loaded | eager root contamination |
| Glass | `/color`, `/css`, `/easing` exact packed surface | Value root/raw source/fallback parser |
| Atlas engine | Keyframes explicit engine and downstream Value capabilities | eager app/root contamination |
| other first-party consumers | smallest semantic subpath | Value root, source alias, copied implementation |

The Keyframes census authority is 49 direct import declarations in 47 files.
The two extra literal references in `import.meta.resolve` are graph/test strings,
not direct imports.

## 11. Goldilocks and filename law

1. Colocate a leaf with its sole semantic owner.
2. Promote a shared module only at two real consumers with the same semantics.
3. Split on responsibility/branch complexity, not an arbitrary line ceiling.
4. A parent directory supplies the concept; a child filename does not repeat
   it (`gradient/stop.ts`, not `gradient/gradient-stop.ts`) unless ambiguity is
   demonstrable outside that parent.
5. A forwarding-only file is not a module boundary.
6. Every surviving public export needs semantic authority plus measured
   consumer evidence.
