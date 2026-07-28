# CONSUMER, ADMIN, CRUD, AND DAG AUDIT — 2026-07-28

**Authority:** SCOPE M-16..M-18.
**Purpose:** amend the active Claude megatranche without changing its identity.
**Evidence date:** 2026-07-28.
**Subject heads:** value.js `f6f7040a`; keyframes.js `a59d3a22`; fourier-analysis
`cd26c653`; parse-that `ef10d5b7`.

This is the factual continuation of `AUDIT-HANDOFF-2026-07-28.md`. It does not reopen the
archaeology, create another wave set, or equate a rendered frame with a verified route.

## 0. Evidence vocabulary

Every row below carries one of these modes. They are not interchangeable.

| mode | what it proves |
|---|---|
| **BROWSER-LIVE** | a real control was exercised through the in-app Browser against a live disposable API and database |
| **BROWSER-FIXTURE** | a view was rendered through the in-app Browser after a disposable fixture supplied state that the product cannot create |
| **API-TEST** | the wire/domain operation passed, but no frontend affordance is implied |
| **SOURCE** | a route, wrapper, callsite, or absence was established statically |
| **BLOCKED** | the intended proof could not run; the exact blocker and hotfix are named |

An operation is frontend-verified only when its row says **BROWSER-LIVE**. A green API test is not
permission to call missing UI “implemented.”

## 1. Audit-enabling hotfix ledger

| id | blocker | cure | result | durability |
|---|---|---|---|---|
| HF-1 | Every keyframes demo route failed before mount with `Injection Symbol(TooltipProviderContext) not found` | Wrap the application once in Glass `TooltipProvider` at `keyframes.js/demo/app/App.vue`; no per-scene providers or fallback context | all seven hash routes render at desktop and 390×844 | source change in keyframes.js |
| HF-2 | Fourier Admin and CRUD states could not be distinguished from gateway failure | disposable Mongo on 27018 + FastAPI on 8000 + Vite proxy on 9002, with an audit-only bearer | real upload, compute, publish, gallery, Admin user, moderation, and audit journeys ran | environment only; no product source changed |
| HF-3 | Fourier has no public flag-write route, so populated Flagged is unreachable from a real reporter | insert one flag into the disposable database, then dismiss it through the real Admin UI | populated Flagged and `dismiss_flags` audit entry verified | fixture only; the missing writer remains a product defect |
| HF-4 | value Admin rendered with a standalone disposable Mongo, but palette create failed because its service correctly opens transactions | restart the disposable database as a single-node replica set | public palette create and the full Admin mutation matrix ran | environment only |
| HF-5 | value Admin “Feature” posted no body while the API requires `{ featured: boolean }`; the composable swallowed the error | replace the ambiguous transport helper with `setPaletteFeatured(token, slug, featured)`, pass the desired state, and delete the unused slug-only helper | feature and unfeature both changed the badge/menu live; demo typecheck, changed-file lint, and 2 transport tests passed | source + external isomorphic test in value.js |
| HF-6 | keyframes could not stage HF-1 because `.git/index.lock` remained from 2026-07-16 | verify no live Git process owns the zero-byte lock, then remove that exact stale file | isolated staging/commit could proceed without touching the dirty worktree | repository-state repair only; the stale lock was not recoverable data |

HF-1 and HF-5 are root-seam repairs, not compatibility shims. HF-2..HF-4 are disposable witness
infrastructure and must not be copied into production code. HF-6 is a proven-stale repository-state
repair, not a product change.

## 2. value.js — every Admin view and mutation surface

### 2.1 Route matrix

All five routes were audited first without an API and then against the disposable authenticated
stack:

| route | empty/error audit | populated audit | heading | structural result |
|---|---|---|---|---|
| `/#/admin/users` | BROWSER-LIVE | BROWSER-LIVE | H3 `Users` | one-route/one-H1 fails; `My Palettes` remains a route-irrelevant equal companion |
| `/#/admin/names` | BROWSER-LIVE | BROWSER-LIVE | H3 `Names` | same companion and heading failure |
| `/#/admin/flagged` | BROWSER-LIVE | BROWSER-LIVE | H3 `Flagged` | same companion and heading failure |
| `/#/admin/tags` | BROWSER-LIVE | BROWSER-LIVE | H3 `Tags` | same companion and heading failure |
| `/#/admin/audit` | BROWSER-LIVE | BROWSER-LIVE | H3 `Audit Log` | same companion and heading failure |

Without an Admin token, the loaders return before requesting. The earlier API-less pass therefore
showed “No users,” “queue clear,” and “nothing flagged” rather than authentication failure. That
was not an empty database proof. With a valid token and live backend, network failure uses the
new error surfaces, but mutations still generally fall through to `console.warn`.

A populated 390×844 pass was repeated in a newly selected tab after the first viewport override was
proved to have remained desktop-sized; the first captures are struck. The valid mobile pass showed
one Admin panel at a time with a route-irrelevant `Palettes` toggle in the dock. Users, Names, and
Tags are vertically centered below a large dead first-screen field; Users wraps Refresh onto a
second toolbar row; Flagged compresses slugs/details aggressively; Audit fills the field but clips
long row values and its entry count at the right edge. All five still render H3 rather than route H1.

### 2.2 Live CRUD/moderation receipts

| domain | operation | evidence | result |
|---|---|---|---|
| users | list/search/sort | BROWSER-LIVE | populated roster rendered |
| users | expand and fetch owned palettes | BROWSER-LIVE | live palette rendered after collapse/re-expand |
| users | prune empty users | BROWSER-LIVE | confirmation rendered; 2 users pruned; visible result beat |
| users | delete all palettes | BROWSER-LIVE | confirmed; roster count changed to zero, but the initiating button label is merely `Palettes` |
| users | delete user | BROWSER-LIVE | confirmed against the disposable empty reporter; roster 2→1 |
| users | impersonate | SOURCE | API wrapper and composable method exist, but there is no UI callsite; frontend-unreachable |
| users | suspend/unsuspend/import/batch | SOURCE | server routes remain; wrappers were deliberately pruned because no UI existed |
| names | list pending | BROWSER-LIVE | two real public proposals rendered |
| names | approve | BROWSER-LIVE | queue 2→1; approved 0→1 |
| names | reject | BROWSER-LIVE | queue 1→0 |
| names | list approved | BROWSER-LIVE | approved item rendered |
| names | delete approved | BROWSER-LIVE | approved 1→0 |
| tags | list | BROWSER-LIVE | honest empty state |
| tags | create | BROWSER-LIVE | `audit-tag`/`audit` rendered |
| tags | delete/cascade request | BROWSER-LIVE | tag 1→0 |
| flags | public report | API-TEST through live API | a second session reported the public palette |
| flags | list populated | BROWSER-LIVE | reason, detail, reporter target, count rendered |
| flags | dismiss | BROWSER-LIVE | queue 1→0 and audit row written |
| flags | delete palette | BROWSER-LIVE | queue 1→0; API soft-delete invoked |
| palettes | feature | BROWSER-LIVE after HF-5 | `Featured` badge and `Unfeature` action appeared |
| palettes | unfeature | BROWSER-LIVE after HF-5 | badge disappeared and action returned to `Feature` |
| audit | list | BROWSER-LIVE | eight operation rows rendered |
| audit | action filter | BROWSER-LIVE | `delete-tag` reduced eight rows to one |
| audit | target/date/pagination | SOURCE | API supports them; this pass did not browser-exercise every combinatorial filter |

The API’s public palette CRUD, version, fork, vote, publish, and ownership suite remains covered by
the 213-test API run. That is API coverage, not evidence that Admin exposes every server operation.

### 2.3 Confirmed value defects

1. **Admin feature was broken and silent.** HF-5 closes the wire mismatch. The absence of a visible
   mutation error remains.
2. **Soft-deleted palettes inflate user counts.** After Admin deleted `audit-aurora`, the roster
   reported two palettes while a fresh expansion returned only `feature-fixture`. The count and
   collection query disagree on `deletedAt`.
3. **Expanded user palettes go stale.** Refreshing the roster changed its count but left the
   expanded child list showing the deleted palette until the row was collapsed and expanded.
4. **Destructive naming is evasive.** The button that means “delete all palettes” is labelled
   `Palettes`. It discloses its meaning only after activation.
5. **Permanent registry deletes are immediate.** Approved-name deletion and tag deletion have no
   confirmation or undo. Flagged-palette deletion also fires immediately.
6. **Admin cards inherit user actions.** Save, Remix, Export, and Report appear beside Feature and
   Delete in an Admin-owned palette menu. Admin review is not a distinct scene.
7. **Impersonation is ceremonial code.** `onImpersonate` and its transport wrapper have no UI
   callsite. Either build an explicit, auditable operator journey or delete both client layers.
8. **Server-only management rails are not frontend CRUD.** Status/import/batch routes remain valid
   backend surface, but they must be terminally marked BUILD or RETIRE; “the route exists” is not a
   completed Admin view.
9. **The Admin route never owns the canvas.** Every route carries an empty `My Palettes` partner,
   produces no H1, and constrains the review list to half the available field.
10. **shadcn abrogation has not landed.** Admin still imports forwarding `Button`/`Badge` barrels,
    participating in the measured 90-import/19-barrel residue.

## 3. keyframes.js — every demo scene

The correct route form is hash routing. The earlier `/cube`-style probe was invalid and is struck.
The audited matrix is:

`/#/`, `/#/cube`, `/#/amiga`, `/#/square`, `/#/easing`, `/#/spring`,
`/#/sequence`.

Before HF-1, all seven were blank with the same missing provider exception. After HF-1, all seven
rendered in the in-app Browser at desktop and 390×844.

| scene | desktop | 390×844 | heading result |
|---|---|---|---|
| home | rendered; lower explanatory copy crowds the short viewport | coherent | H1 `Select an animation` |
| cube | stage + left controls + dock | bottom control sheet obscures lower stage/labels | no route H1 |
| amiga | nested stage card + left controls | bottom sheet occludes lower content | no route H1 |
| square | drag target + left controls | same occlusion | no route H1 |
| easing | dense specimen wall with heavy Glass framing and awkward wraps | two dense columns under an overlaying drawer | no route H1 |
| spring | coherent stage/controls | coherent stage but bottom sheet remains | no route H1 |
| sequence | central sequence card + dock | fits | no headings |

Six of seven scenes therefore fail the one-route/one-H1 law. The mobile drawer is a shell mechanism
that repeatedly hides the subject; it is not seven scene-specific defects. The Easing scene is the
strongest overfit/contrivance candidate: repeated capsule/card treatment overwhelms the curves.

Measured graph:

- library `src`: 145 nodes, 601 records, 498 unique edges, zero runtime SCCs, four type-inclusive
  SCCs;
- demo: 184 nodes, 258 records, 245 edges, one runtime five-node orbital-drag SCC and three
  type-inclusive SCCs.

The canonical `keyframes-v-exec` copy already contains the provider pattern, but cannot resolve 18
Glass subpaths in its incomplete install. The active primary is the only browser-verified subject.

## 4. fourier-analysis — every page, Admin, and CRUD

### 4.1 Page matrix

| route | browser result | disposition |
|---|---|---|
| `/` | redirects to saved/workspace rail | keep redirect, verify its target state explicitly |
| `/paper` | desktop nested Card/page housing; mobile table of contents consumes the first viewport | rewrite as document, not a card collection |
| `/w/:imageSlug?` and `/visualize` | huge empty canvas; mobile Controls selected while canvas still dominates | establish a real empty/input state and mobile stage/controls contract |
| `/v/:slug` | missing slug read as a generic input while API was down | error, missing, and empty must be distinct |
| `/gallery` | API-less pass showed empty + gateway toast together; live pass showed an honest empty state | keep live separation; never costume error as empty |
| `/equation` | gateway failure in API-less pass | add an honest route-level error scene |
| `/morph` | strongest coherent page; desktop still wastes a large right field under Card housing | retain mechanism, remove housing/dead field |
| `/demo/shape-extractor` | production-addressable internal tool; raw JSON overflows and mobile clips Moon | retire from production routing or make it an owned, tested tool |
| `/s/:slug` | legacy redirect produces the clearest missing-workspace message | fold the honest message into the canonical route, then remove the legacy rail |

### 4.2 Live journey

With HF-2:

1. generated a real public session slug;
2. uploaded `assets/animals/sun.png` through the file chooser;
3. waited for computation and saw the epicycle visualization;
4. expanded the top dock and published;
5. opened the resulting gallery entry;
6. exercised like, Admin tier, user suspend/unsuspend, flag dismissal, and the audit log.

### 4.3 CRUD evidence

- **BROWSER-LIVE:** upload, compute, create draft/session, publish, gallery read/open, like control,
  tier change, user suspend/unsuspend, entry delete, user delete, prune three empty users, and flag
  dismiss.
- **BROWSER-FIXTURE:** populated Flagged, because no public reporter route exists.
- **API-TEST:** three complete viewport lifecycles at 375×667, 1280×800, and 1440×900:
  upload → draft → public → unlisted → stale ETag 412 → soft-delete → restore.
- **SOURCE:** store `softDelete()` and `restore()` have no Vue callsites; the E2E lifecycle invokes
  those mutations by API after its initial upload.
- **SOURCE:** Admin hard/batch/prune affordances exist by route or store, but the attempted selected
  gallery row produced no batch toolbar; batch UI remains unverified.

Test receipts:

- disposable-Mongo API selection: **33 passed**;
- corrected single-worker browser CRUD: three lifecycles passed at all target viewports;
- workspace a11y keystones: three `fixme`/skipped;
- ExportModal a11y: mobile/laptop passed; desktop timed out waiting for `Export`;
- aggregate E2E selection: **5 passed, 3 skipped, 1 failed**.

Confirmed defects:

1. Like became pressed while its visible count stayed `0`.
2. Admin aggregate state is stale in both directions. It initially reported entries/featured `0/0`
   while one row rendered, corrected after a tier mutation, then stayed `1/1` after deletion while
   the gallery showed “No visualizations yet.”
3. Publish/equation/edit/fullscreen buttons in the top dock have no accessible names.
4. Public flag creation is absent; populated moderation requires a database fixture.
5. Soft-delete/restore are wire-complete but frontend-unreachable.
6. Soft-deleted entries inflate Admin user counts: the deleted owner still reported `1 entries`.
7. The selected Admin row did not expose its expected batch action surface.
8. A “rendered” route is frequently still unhealthy: gateway/bootstrap diagnostics coexist with
   usable frames.

## 5. parse-that and named consumer constellation

`parse-that@1.0.0` is not structurally releasable merely because its unit suite is green:

- `npm test`: **124 passed**;
- `npm run proof:all`: **FAILED** its performance proof;
- measured JSON parse: 3,188 ns vs 1,742 ns baseline, **+82.9%** against a 15% threshold;
- TypeScript graph: 18 nodes, 60 records, 46 unique edges, two runtime SCCs:
  - `debug ↔ lazy ↔ leaf ↔ packrat ↔ parser ↔ state`;
  - `parse/index ↔ parsers/csv ↔ parsers/index ↔ parsers/json ↔ parsers/utils`.

The parser program therefore gets a terminal choice in W7: adopt it where a measured idiomatic
benefit closes both SCC/performance debt, or retire the readoption edict. No consumer acquires a
parallel parser, alias, or fallback.

The required universe remains 15 repository roots and six subpaths:

- roots: active Atlas, bbnf-buddy, bbnf-lang, fourier-analysis, glass-ui, canonical
  keyframes-v-exec, latex-paper, muster, parse-that, sci-report, slides, slides-k, speedtest,
  value.js, words;
- subpaths: bbnf-lang playground, Fourier API/web, Muster frontend, sci-report Atlas, words
  frontend.

The version constellation is still fractured: modern consumers sit at Glass/Keyframes/value
7/6/4 or 6/5/3, while bbnf, Muster, slides, speedtest, Fourier, and words retain combinations from
Glass 3–4, Keyframes 2–4, and value 0.10–0.13. Release closure must prove all bounded consumers;
current direct-consumer success is not constellation completion.

Coordination receipts sent during this audit:

- **glass-ui active Codex audit:** component flattening, provider ownership, page-render versus
  route-health distinction, and the no-local-shim law;
- **sci-report/Atlas active Codex audit:** consumer pin/isomorphism consequences and the new
  Goldilocks DAG commission.

Their latest receipts sharpen the same boundary: the Glass audit independently distinguishes
rendered frames from healthy routes; the completed sci/Atlas census has 1,236 nodes, 6,852 edges,
67 dynamic clusters, six file SCCs, and zero unresolved local imports, but its external test buckets
are not isomorphic to source ownership. Those are coordination inputs, not value.js implementation
claims.

Atlas pass 2 is banked at
`/Users/mkbabb/Programming/.p-totality/sci/atlas/docs/tranches/Q/coordination/ATLAS-TO-VALUE-2026-07-28-PASS2.md`.
Its exact value.js cut is binding:

- pinned sci (Atlas 4 / Glass 6 / Keyframes 5.3.5 / value 3.1) still imports `clamp`,
  `easeOutExpo`, `easeOutCubic`, and `easeInOutCubic` from the value root;
- active sci (7/7/6/4) imports `/math` `clamp` and `/easing` `easeOutExpo`,
  `easeInOutCubic`;
- Atlas 7 imports `/math` `clamp`, `lerp`; `/easing` `CubicBezier`,
  `EasingFunction`, `easeOutExpo`, `smoothStep3`; and `/color` `rgb`, `convertColor`,
  `toRgba8`.

Value 4 deliberately has no `"."` export. Preserve that clean break: migrate the pinned consumer;
never add a root shim. Atlas’s private `usePaperCallout` clamp and reveal-score `clamp01` are
duplicate-core candidates, not automatic library extractions—domain semantics decide.

Glass’s sealed 112/112 third-Sol contract is banked at
`/Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/coordination/valuejs-outbound-2026-07-28-dag-consumer-contract.md`.
It is binding migration input, not proof that value has migrated:

- Glass removes its runtime root. Value’s 80 files/121 static Glass edges migrate symbol-by-symbol
  to one canonical owner; no local Glass barrel, forwarder, alias, or fallback is allowed.
- `TooltipProvider` survives only at `/tooltip`, mounted once around the nearest real stable group
  of tooltip-bearing controls. Keyframes HF-1 satisfies that law; value must derive its own groups.
- `/motion` owns the single reduced-motion producer. `/motion-core` and parallel media-query
  wrappers disappear.
- `/dom` has no replacement facade. Each imported symbol is assigned to theme, forms, interaction,
  observer, demo/code, or value-local ownership.
- `/aurora` and `/blob` move to `/renderers/*`; `/color` and `/dark` move to `/theme`; `/easing`
  moves to `/motion/easing`; `/fading-scroll` and `/tabs` move to `/navigation`;
  `/watercolor-dot` becomes `/watercolor-swatch`.
- value’s local Button/Badge forwarders are deleted in the same cut; Badge semantics fold to Chip.
  Carousel, DataTable, Deck, InstrumentChassis, Easing, Constellation, Fourier, and
  WatercolorSwatch remain adjudicated semantic products rather than pass-1 deletion casualties.
- Every owner cut requires source, tests, CSS, docs, build assertions, type, behavior, a11y,
  Browser, full-stack, and packed-consumer proof before Glass publishes.

This receipt does **not** dispose the older O-series producer asks: Button attribute closure,
ConfirmDialog safety, Slider rail/stops, Configurator labelling, dark Card tone, and Skeleton tone
remain open questions against the terminal families.

## 6. Current DAG and grain census

| graph | nodes | records | edges | runtime SCCs | type-inclusive SCCs |
|---|---:|---:|---:|---:|---:|
| value `src` | 26 | 58 | 44 | 0 | 0 |
| value `demo` forensic all-files | 250 | 683 | 655 | 1 (`Dock.vue ↔ dock/index.ts`) | 4 total clusters |
| value `api/src` | 111 | 354 | 348 | 0 | 0 |
| keyframes `src` | 145 | 601 | 498 | 0 | 4 |
| keyframes demo | 184 | 258 | 245 | 1 five-node orbital-drag cluster | 3 |
| Fourier web | 131 | 136 | 130 | 0 | 0 |
| parse-that TS | 18 | 60 | 46 | 2 | 2 |

The other value demo type clusters are:

- seven-node Admin/provider cluster;
- `Markdown.vue ↔ markdown/index.ts`;
- `gradientParse ↔ useGradientCSS ↔ useGradientModel`.

All seven runs used `vnext-module-graph/3`, tool SHA-256
`25dc5cd78b5bc18941ba90fbadaa1126e84052429cf0bb75c020afd92a1899c3`, and resolved every
relative import:

| graph | working-input SHA-256 | full node/edge artifact SHA-256 |
|---|---|---|
| value `src` | `643892b8acd0368b2f16cd241c365992172b25142e1c57a738655d2ebcdeae6a` | `26d4ea66f66756c7a63605eda8140298f183550cc2e32668d7e5d38253fc23e2` |
| value `demo` forensic all-files | `c7486503175e0cfbcba005043cf373f517971b4d45f961829f0a127bc5fb3f77` | `7e31a142c5c968f07e1f4525d693e7b58af0f5fecca9f5779c7ba9cd54e06df6` |
| value `api/src` | `351d2a0c734108ac995b282de7813d50f40ec5a69f4e3a9c247421106ef6924b` | `3c0538f6e0bf5db072a4fb74071c261294bbed1186a36e4c1fb7f9474d84b2dc` |
| keyframes `src` | `959f9b85af298cf0c9ffd179ffaf8fd7871206fe975e865b72b5ce260c4b41ca` | `6166daeb69f73429e6ca2b52055ba95784027c0c14265dbbe877c785b35462a8` |
| keyframes demo | `808262c779445678c64150f1a1d8c7d35bbc499d191ef5f3de8e372c6a61bf89` | `ed308950ee68d766841addd696178061bdf3b13200d234cc048b78ba7719a55d` |
| Fourier web | `dd7dc7dcda3c172a95412c9581a72f30ef8f70f1a12c1d1820c1cdac97e6e15c` | `766108ccf1abfccf11c2259c76ff428adc178602b1edad5b30615f7a36a9c591` |
| parse-that `typescript/src` | `787a81130b68780bf3e3b3d51bdafb728b93c0879b1f282b1c1202c5c550baeb` | `d0c65b46e34643dabffb07a134922ec50fc582d61252e6fc241ab2ffe4d726d4` |

These are content-addressed **script import/export baselines**, not complete application DAGs.
Both independent DAG critics rejected the existing tool as the final authority:

- Vite/tsconfig aliases are classified as package edges. An independent TypeScript-compiler
  resolution found keyframes demo **399** internal edges (143 alias-resolved) rather than 245, and
  Fourier web **314** (179 alias-resolved) rather than 130. Their SCC memberships happened to remain
  unchanged; degree and edge-cut conclusions did not.
- CSS `@import`, Vue render ownership, provide/inject, router, state read/write, API-operation,
  worker, asset, focus/scroll/style, package-export, and Python edges are absent.
- the hostile pass first measured **251/684/656** because the new HF-5 test temporarily joined
  three inherited files under `demo/test/**`. That violation was corrected before handoff:
  `test/demo/**` now owns the new test. The final stock demo receipt is **250/683/655**, still mixing
  three inherited `demo/test/**` nodes, five records, and five file edges. Removing that layer
  leaves **247 product nodes / 678 records / 650 file edges**, with the same known SCC shape. The API
  run includes 28 source-colocated tests. Neither stock receipt is a production-only graph.
- the Fourier Python disagreement is adjudicated: **48 production nodes / 104 deduplicated internal
  edges / zero SCCs**. The 51-node view accidentally retained three
  `api/services/__tests__/**` files; its 94-ish edge count used base-package/import-record semantics.
  The winning resolver excludes every `tests`/`__tests__` directory and maps
  `from pkg import child` to `pkg.child` when that module exists, otherwise to `pkg`.

Therefore B0 is not “refresh the hashes.” It is **replace the graph authority**, bind its resolver
and edge taxonomy, and only then regenerate content-addressed receipts. The baselines above remain
useful for exact SCC reproduction and for proving what the old instrument could see.

The inherited current-DAG durability validator is RED: it requests value HEAD `c654824e`, while the
audit opened at `f6f7040a` and HF-5 landed at `94ad2e71`. The value library/API working-input hashes
remain unchanged; HF-5 changed the demo input to
`c7486503175e0cfbcba005043cf373f517971b4d45f961829f0a127bc5fb3f77` and its final forensic
stock graph to 250/683/655. This is not a product-graph target. W0 first replaces the authority with
source/test/support layers, then generates a product receipt; no one edits an expected hash merely
to make the stale validator green.

### 6.1 Adjudicated W0 graph-authority hotfix

The two hostile GPT Sol xhigh critics and third GPT Sol xhigh arbiter agree on one clean cut:
replace `module-graph.mjs` and its five-graph hard-coded validator with one configured composite
authority; archive the old receipts as historical evidence and leave no second active path.

The replacement must:

1. bind repository, HEAD, working-input, tool, configuration, declared roots, and exclusions;
2. inventory every file as product source, test, support, generated, asset, migration/operation, or
   excluded-with-reason;
3. resolve TS/JS/Vue imports and external blocks, CSS/assets, literal dynamic imports, Vite globs,
   workers, query suffixes, aliases, package exports, workspace paths, and Python child-or-base
   imports with a source locator and resolution provenance on every edge;
4. emit separate syntactic, type, style/asset, render, route, DI, state, API operation, worker, test,
   package, packed-export, consumer, file, module, and composite layers;
5. cover Fourier’s Python `fourier_analysis` package and parse-that’s published Rust surface, or
   record an explicit terminal exclusion;
6. emit all SCC classes, unresolved and unowned nodes, boundary edges, deterministic hashes,
   dynamic cluster membership, and exactly one review owner per node and edge; and
7. fail CI on stale HEAD/dirty-input identity, path/config/tool substitution, unresolved internal
   edges, or category drift.

The grouped-name detector is versioned and normalizes case/kebab/camel/Pascal token prefixes only
inside an accepted multi-leaf module. Existing module-prefix totals are candidate censuses, not
gates: competing normalizations produced materially different Glass counts. Renames remain
adjudicated, never automatic.

### 6.2 Grain pressure

| tree | observed pressure |
|---|---|
| value `src` | 26 files / 6 shallow dirs; `stylesheet` 900 LOC, `decompose` 610, `path` 565, `grammar` 484, `anchors` 378 |
| value demo | 250 files / 81 dirs / depth 4; direct-file hotspots: `color-session` 23, `palettes` 21, palette export 12, dock 10, Admin 9; repeated module-name files remain |
| value API | 111 files / 27 dirs / depth 3; 28 tests are colocated under `api/src/**/__tests__`, violating the owner’s external isomorphic-test law |
| keyframes `src` | 145 files / 26 dirs / depth 4; animation/group 14 direct, compile/emit 12, engine 10; 13 repeated module prefixes |
| keyframes demo | 184 files / 44 dirs / depth 5; spring 14 direct; `ChannelOptions` 610 LOC and several 480–500 LOC scenes |
| Fourier web | 131 files / 23 dirs / depth 4; visualization 20 direct, lib 16, gallery 12; `PaperView` 686, `lib/api` 673, `BasisCanvas` 548, `AdminUserList` 530 |
| Fourier API | router 890 LOC, Admin router 653; tests are externally separated under `api/tests` |
| parse-that | 18 files / 2 dirs / depth 2; `parser` 712, `packrat` 489, `leaf` 400, `debug` 384 |

Examples of required deduplication:

- `animation/compile/easing/easing-option.ts` → `animation/compile/easing/option.ts`;
- `animation/compile/easing/easing-registry.ts` → `.../registry.ts`;
- `engine/css/css-animation.ts` → `engine/css/animation.ts`;
- `PaletteCard/PaletteCard.vue` → `PaletteCard/index.vue` only if the directory remains a genuine
  component capsule; otherwise flatten to `card/PaletteCard.vue`.

The rule is not a blind rename campaign. The containing module must first be adjudicated as the
right boundary.

## 7. Goldilocks DAG commission

The existing vnext graph program already states that consumer count is not sufficient evidence,
tests live outside source in an isomorphic tree, filenames omit the enclosing module name, and
architecture is judged by cohesion, edge cuts, change coupling, SCCs, and public boundaries. Absorb
and replace its graph authority; do not author a rival registry. Its value 103/103 and keyframes
67/67 source/test target maps—and the demo 146/144 and 102/102 maps—remain responsibility
inventories, not proved leaf topology. Isomorphism follows accepted modules, never a file-for-file
test bijection that manufactures sand.

### 7.1 Dynamic cluster protocol

Each cluster batch is sized by graph shape, not a fixed file quota:

1. Start with one SCC; if acyclic, start with one feature capsule plus its immediate inbound and
   outbound cut.
2. Expand only while the same change-coupling reason explains the added nodes.
3. Include tests, public exports, and named consumers in the batch even when they live outside the
   source directory.
4. Two fresh GPT Sol xhigh critics independently assume the cluster is wrong.
5. A third GPT Sol xhigh arbiter attempts to disprove both, then records one target topology and
   terminal disposition for every node/edge.
6. A batch closes only when its source graph, external isomorphic test graph, and consumer cuts are
   all explicit and every removed edge has a replacement ownership path.

### 7.2 Adjudicated batch order

| batch | seed | terminal question |
|---|---|---|
| G0 | graph authority, scope, source/test contamination, alias/query resolution | is every file/edge classified, locatable, resolved, content-addressed, and singly owned? |
| G1 | all runtime SCCs: value Dock; keyframes orbital; both parse knots; Glass runtime/module cycles | which neutral lower contract makes every runtime/module edge one-way? |
| G2 | all type SCCs: value Admin, Markdown, gradient; keyframes constants/AST, engine/WAAPI, group, sequence, easing, spring; Glass families | which types move below composition entries so type-inclusive SCCs reach zero? |
| G3 | high-centrality/change clusters | what are the stable phase contracts in value CSS/transform/API, keyframes compiler/runtime/composition, Fourier visualization/Admin/client/Python routers, and parse state/diagnostics? |
| G4 | god modules and sand | does cohesion, historical co-change, boundary cut, public contract, or performance prove KEEP/SPLIT/MERGE/MOVE/DELETE? |
| G5 | external tests and grouped-name reduction | what is the module-isomorphic test tree and which basenames repeat only after the module boundary is proved? |
| G6 | package entries, packed exports, CRUD/API parity, bounded constellation | is every server operation reachable or deleted, and does each public symbol have exactly one clean path? |
| G7 | regenerated condensation DAG | do two consecutive clean passes reproduce zero target SCCs and the exact same topology? |

### 7.3 Acceptance laws

- Runtime and type SCCs are zero unless an arbiter records a mathematical impossibility and owner
  ruling; “type-only” is not an automatic waiver.
- Every file is categorized and every internal alias/query/glob/worker edge resolves.
- Every node and edge has two critic receipts and one arbiter receipt; a changed cluster and its
  affected boundaries re-enter review, while unchanged hashed clusters retain their receipt.
- No source-owned `__tests__` directories remain. Test paths mirror source ownership externally.
- A directory has at least two cohering implementation leaves or an independently enforceable
  public boundary; otherwise flatten it.
- A file is not split by line count alone. Every split names the invariant and lowers a measured
  edge cut or change-coupling burden.
- A file inside module `x/` does not repeat `x` in its basename.
- Barrels exist only at published capsule boundaries, never as same-directory convenience loops.
- Implementations never import public `index`/entry modules; entries point inward and export
  outward only.
- Every DI consumer is dominated by exactly one declared provider path; no hidden fallback exists.
- Server operations, generated clients, frontend adapters, and reachable UI commands have exact set
  equality, or the operation is deleted end to end.
- Deletion needs semantic evidence of vacuity/superfluity; zero consumers alone is insufficient.
- Every breaking change updates all bounded consumers in the same release cut. No aliases, shims,
  dual paths, or masking fallbacks survive the cut.
- Parse-that cannot be adopted while its performance proof is +82.9% over baseline.
- Final manifests are generated from adjudicated modules and reproduce in two consecutive clean
  graph validations.

### 7.4 Terminal topology rulings

| area | adjudicated disposition |
|---|---|
| value library | keep the foundation, easing/math, color, image, geometry/path/transform, and CSS axes; split large leaves only by semantic phase; delete `subpaths/` as ownership and map exports directly to domain entries; retain no `"."` export or root shim |
| value demo/API | cut all four demo SCCs with neutral models/contracts and outward-only composition entries; put Admin types below components; move tests to root `test/demo/**` and `api/test/**`; split API by coherent route contract, command/query service, and store/port; delete shadcn source, style, barrels, dependencies, and tooling atomically |
| keyframes library/demo | preserve model → resolve → compile → runtime/timeline/physics/composition/interaction; remove a macro `animation/` shell if it supplies no ownership; neutralize constants/AST, engine/WAAPI, group, and sequence contracts; app composition owns the single tooltip/provider path; orbital gesture code consumes an injected controller, never a component/barrel |
| Fourier web/API | split only at generated-client, feature-adapter, rendering, query/command, contract/route, service, and persistence-port boundaries; bank Python 48/104/0 with request-runtime/migration slices; every hidden CRUD path becomes UI-reachable or is deleted across UI/client/routes/models/tests/docs |
| parse-that | move diagnostics outward behind an observer, make parser state/diagnostics/packrat instance-owned, place primitives below CSV/JSON/root entries, and close both SCCs; terminal outcome is measured adoption or total retirement, never dual parsers |
| Glass coordination | adopt alias/CSS/glob/asset extraction, module ledger, dynamic batches, and grouped-basename law; do not copy its current topology, cycles, tiny wrappers, forwarding barrels, or shadcn ancestry |

## 8. Megatranche amendment

Do not add waves. Amend the nine-wave spine:

| wave | amended ownership |
|---|---|
| W0 | repair graph fidelity, regenerate current DAG receipts, hydrate/hash missing reports, and record all hotfixes/witness modes |
| W1 | production application boundaries in value and every named frontend consumer |
| W2 | semantic controls and accessible names, including Fourier’s unnamed dock actions |
| W3 | one route/one scene/one H1 across five value Admin routes and seven keyframes scenes; remove universal companions |
| W4 | adversarial instruments plus every Fourier page and every keyframes scene at mobile/desktop/short-landscape |
| W5 | palette specimen/domain split plus authenticated public and Admin CRUD journeys |
| W6 | atomic shadcn deletion, provider scoping, all measured SCC closures, and real boundary lint |
| W7 | Goldilocks library/module batches, external isomorphic tests, parse-that terminal disposition, consumer-safe breaking surface |
| W8 | re-author the design/motion canon and apply Golden Glass, Breath of Life, and Movement of Momentum to named consumers |
| W9 conditional | close only with all 15 roots/six subpaths, production/browser/API/test receipts, and no unresolved frontend CRUD state |

## 9. Resume order

1. Read this file immediately after `AUDIT-HANDOFF-2026-07-28.md`.
2. Preserve the dirty tree; do not normalize the active Claude formation’s files.
3. Replace the graph authority and classify source/test/support layers; then regenerate its receipt
   and run G0–G7 in the tri-fold cluster protocol.
4. Land HF-1 and HF-5 with their browser/type evidence.
5. Route each confirmed defect into W0..W9 above; do not create a defect-named wave.
6. Reconcile the active Glass and sci/Atlas audit receipts before changing a shared public surface.
7. Begin implementation. No further general census or general archaeology pass is authorized.
