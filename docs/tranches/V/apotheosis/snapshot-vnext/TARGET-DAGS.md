# Target DAGs

## Arrow convention

Every DAG uses `DEPENDENCY OR PRODUCER --> CONSUMER`. An arrow `A --> B`
means “B requires or consumes A”; it never means “A imports B.” Every rendered
edge names what the consumer receives.

The sole machine status authority is
[`WAVE-EDGE-POLICY.json`](WAVE-EDGE-POLICY.json). Every wave-contract hash binds
its outcome class, exact incoming edge policies and that manifest's self-hash.
Its 759-edge expansion is closed: 723 `COMPLETE` predecessors, 24 conditional
`KEEP|PRUNE` dispositions, four KEEP-only edges and eight PRUNE-only edges.
No static edge admits `REFUSED`, `BLOCKED` or `NOT_CLEAN`; `REFUSED` exists only
as a non-advancing typed reopening-supersession result.

## Package DAG

```mermaid
flowchart LR
    P["published parse-that 1.0.0 — immutable no-link receipt"]
    V["value.js 5"]
    K["keyframes.js 7"]
    G["glass-ui"]
    VD["value demo"]
    KD["keyframes demo"]
    VA["value /api"]
    FA["Fourier API"]
    FW["Fourier frontend"]
    A["active Atlas"]
    S["sci-report"]
    BB["bbnf-buddy"]
    SL["Slides"]
    BL["bbnf-lang playground"]
    MU["Muster frontend"]
    SP["Speedtest"]
    WO["Words frontend"]
    LP["latex-paper"]

    P -->|"parser runtime consumed by"| V
    P -->|"published parser runtime consumed by"| BL
    P -->|"published parser runtime consumed by"| LP
    V -->|"CSS/value/property semantics consumed by"| K

    V -->|"peer library consumed by"| G
    K -->|"peer animation library consumed by"| G

    V -->|"library consumed by"| VA

    V -->|"library consumed by"| VD
    K -->|"animation library consumed by"| VD
    G -->|"UI primitives consumed by"| VD
    VA -->|"generated palette client consumed by"| VD

    K -->|"animation library consumed by"| KD
    G -->|"UI primitives consumed by"| KD

    V -->|"value/color library consumed by"| FW
    K -->|"animation library consumed by"| FW
    G -->|"UI primitives consumed by"| FW
    FA -->|"generated visualization client consumed by"| FW
    VA -->|"public immutable palette-revision binding consumed by"| FA

    V -->|"library consumed by"| A
    K -->|"animation library consumed by"| A
    G -->|"UI primitives consumed by"| A

    V -->|"library consumed by"| S
    K -->|"animation library consumed by"| S
    G -->|"UI primitives consumed by"| S

    V -->|"value/CSS/easing consumed by"| BB
    K -->|"animation runtime consumed by"| BB
    G -->|"UI primitives consumed by"| BB

    K -->|"spring/animation consumed by"| SL
    G -->|"UI primitives consumed by"| SL

    V -->|"easing/value consumed by"| BL
    K -->|"scroll/timeline animation consumed by"| BL
    G -->|"UI primitives consumed by"| BL

    V -->|"lazy color conversion consumed by"| MU
    G -->|"UI primitives/motion consumed by"| MU

    V -->|"value/color/easing consumed by"| SP
    K -->|"animation constellation consumed by"| SP
    G -->|"UI primitives consumed by"| SP

    K -->|"explicit engine/Program consumed by"| WO
    G -->|"UI primitives consumed by"| WO
```

The pinned Words manifest and direct import census prove only keyframes and
Glass edges; therefore no value→Words target edge is invented. C02W owns both
proved edges. C02S owns all three declared Speedtest V/K/G edges even though
its feature casualty is concentrated in keyframes.

There is no value-to-keyframes reverse production edge, no value-to-glass
production edge, and no keyframes server node. The glass-to-value/keyframes
relationships are peer/consumer relationships.

## Semantic ownership

| Domain | Sole owner | Consumers |
|---|---|---|
| Published parser runtime/combinators | parse-that | value full-CSS prototype and production parser |
| Major parse-that/BBNF research | separate PT-E/BBNF session | no V-next runtime consumer without a new owner return |
| CSS syntax/property/value semantics | value.js | keyframes, demos, consumers |
| Color/image/transform/easing semantics | value.js | keyframes, demos, consumers |
| Animation program/plans/runtime | keyframes.js | demos, glass, Atlas |
| Palette API | value.js `/api` | value demo, Fourier binding |
| Visualization API | Fourier Python API | Fourier frontend |
| Interaction primitives/Breath grammar | glass-ui | value/keyframes/Fourier demos and included UI consumers |
| URL state | each application | its routes only |

## Source/test targets

V00A produces five independently hashed truths rather than one hand-authored
graph: tagged source, working source, packed exports, API-by-name semantics and
consumer census. V00C records topology constraints without moving feature
clusters. [`VALUE-TARGET-PATHS.json`](VALUE-TARGET-PATHS.json), canonical
SHA-256 `b96ac0bc2ecf0701bffb262202f4ed9e5bcdc75dbf7bd85fb600b20eed8f7536`,
is the sole expanded path authority for the conditional library branch family
in [`PARSER-CSS-COLOR.md`](PARSER-CSS-COLOR.md) and the exact value-demo tree
in [`DEMO-TARGET-DAGS.md`](DEMO-TARGET-DAGS.md). Its 105 library candidates
include four explicitly owned KEEP/PRUNE pairs; V29T selects 101–105 accepted
source/test pairs and emits the final source/import/export/test graphs. Its
146 demo source leaves map to 144 exact external test leaves plus the A20
generated-client and D13 worker-entry exceptions. No branch-family candidate
count is misreported as the final node count.

```text
value src/<domain>/...        ↔ test/src/<domain>/...
value demo/features/...       ↔ test/demo/features/...
value api/src/modules/...     ↔ api/test/src/modules/...

keyframes src/<domain>/...    ↔ test/src/<domain>/...
keyframes demo/features/...   ↔ test/demo/features/...

fourier api/modules/...       ↔ tests/api/modules/...
```

Generated corpora, fixtures, browser harnesses and test-support utilities use named exceptions. There are no `__tests__` directories inside source.

The exhaustive Glass/value-demo target trees, route packets and import/render/
state/API/capability/focus/scroll edge laws live in
[`DEMO-TARGET-DAGS.md`](DEMO-TARGET-DAGS.md). They are canonical; a generic
`features/shared/components` sketch is not.

The standards evidence graph is likewise explicit:

```text
standards-lock.json → registry-facts.generated.json ─┐
                                                     ├→ feature-matrix.json
terminal wave receipts → support-manifest.reviewed.json ┘

feature-matrix.json + accepted terminal decisions → V29T transpose
V29T packed graph + semantic capability diff        → V30/V31 audits
```

The feature matrix contains total operation vectors; generated facts never
contain a handwritten support verdict.

## Keyframes target modules

The sole expanded path authority is
[`KEYFRAMES-TARGET-PATHS.json`](KEYFRAMES-TARGET-PATHS.json), canonical SHA-256
`6bddafafc9d7cc2dd670d030503b396268b0692488e9d9afde74f57b0c320a17`.
[`KEYFRAMES-API.md`](KEYFRAMES-API.md) explains the library topology;
[`DEMO-TARGET-DAGS.md`](DEMO-TARGET-DAGS.md) explains the demo topology. This
projection deliberately carries no second handwritten tree. K22T and M10T must
materialize the manifest exactly, including `src/index.ts`, `proof/`, `bench/`,
the external isomorphic test trees and the sole typed demo-support exception
`proof/demo-text-loader.mjs`. `node tools/validate-target-paths.mjs`
rejects prose divergence, duplicate/case-colliding paths, exact or prefixed
grouped-name repetition, source-colocated tests and non-isomorphic external
tests across both manifests.

## API target modules

The sole expanded API path and operation-owner authority is
[`API-TARGET-PATHS.json`](API-TARGET-PATHS.json), canonical SHA-256
`05e0ad4dbce909d7eb1785fbba02e5921dbb56399c8520a9b9b818a23b39efce`.
It closes 379 exact target paths across the language-local TypeScript and
Python runtimes, 14 value modules, 10 Fourier modules, all generated OpenAPI,
schema, operation, vector and TypeScript-client outputs, migrations, workers,
and external isomorphic tests. Its exact 147-row operation/owner/module
projection is SHA-256
`0eaa1439df3a06b382d432fa4fc15f8b528a38fde19b378603298df4e59208fc`.
This document deliberately carries no second handwritten directory sketch.
A20/A23C/A26 materialize and prove the manifest; `node
tools/validate-api-target-paths.mjs` rejects a missing or invented path,
operation, owner, worker binding, module entry, test mirror, or generated
artifact.

Fourier has no legacy session/user/owner/private/draft/social/admin façade after A22S. Value uses pseudonymous users, recovery credentials and secure-cookie sessions; Fourier instead uses per-resource edit credentials and a deployment operator. Both are explicitly single-tenant. The APIs share protocol vectors, not runtime modules. In each tree, `app/main → routes → contract + service → own store + platform ports → database`; no module imports another module's route or store, lifecycle participants are injected, tests mirror the target externally and runtime plus type graphs have zero SCCs.

## Closure graph

```mermaid
flowchart TD
    I["Implementation waves"]
    PA["Producer audits: V29T, V30/V31, K24, A26"]
    AA["Application audits: D25, M11"]
    UC["Total consumer universe: C00U"]
    CC["Consumer cuts: C00–C04"]
    PR["Rehearsal and independent proof: C05–C07"]
    CP1["Fresh clean pass one: C08"]
    CP2["Fresh clean pass two: C09"]
    REL["Sole release and cutover: C10"]

    I -->|"completed implementation is inspected by"| PA
    I -->|"completed application work is inspected by"| AA
    PA -->|"producer evidence is required by"| UC
    AA -->|"application evidence is required by"| UC
    UC -->|"included/excluded root digest is required by"| CC
    CC -->|"consumer evidence is required by"| PR
    PR -->|"rehearsal/security/device evidence is required by"| CP1
    CP1 -->|"first clean result is required by"| CP2
    CP2 -->|"two consecutive clean passes authorize"| REL
```

A closure finding routes backward and resets the clean-pass count.
