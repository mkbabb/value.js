# Fourier and auxiliary eight-hour source delta — 2026-08-03

Status: `SOURCE_GAP_REGISTRY_FROZEN / ADMISSION_ZERO`

Mode: tranche development only

Authority and product, API, Browser, Safari, Simulator, Docker, package,
release, rebind, owner-slot, and constellation credit: 0

## 1. Boundary

This delta turns the smallest Fourier and auxiliary readiness gaps into stable,
bounded source work. It consumes the existing read-only readiness audit and
source inventories. It does not repair R6, create a Fourier or auxiliary owner
packet, reconstruct P29, execute a control, or modify a peer repository.

Fourier remains 64/66 reachable workflows, 207/1,105 exact mounted subjects,
30/37 controls, 36/45 client edges, 0/137 COMPLETE P29 rows, and 0/1 native
input. Auxiliary remains 180/184 reachable Vue files, 8/37 standalone semantic
ACCEPT dispositions, 0/37 source-admissible D1, 0/37 source-admissible D2, and
0/3 owner-accepted successor packets.

## 2. Fourier reachability delta

The two exact unreachable workflows are source-authenticated and must receive
one owner disposition each; existence alone is not convergence.

| Delta ID | Workflow | Source | SHA-256 / bytes | Current state | Required terminal disposition |
|---|---|---|---|---|---|
| `F8-REACH-01` | `N.C11` | `web/src/components/equation/InfoCard.vue` | `b2c2e718374047d930380337d3e30aeca3254b52844071f2f266b0b4ca3f18a8` / 1,516 | unmounted | exact `KEEP_WITH_MOUNT`, `ISOLATED_HARNESS`, or `DELETE`; HOLD is RED |
| `F8-REACH-02` | `N.C39` | `web/src/components/visualization/CanvasOverlayButton.vue` | `35f3db919432e330205348c8fed2132892a5d36f514873a792a77bc5d85b5efd` / 595 | unmounted | exact `KEEP_WITH_MOUNT`, `ISOLATED_HARNESS`, or `DELETE`; HOLD is RED |

Closing both dispositions would change workflow reachability/disposition from
64/66 to 66/66 only in that named source denominator. It would not change
mounted-subject, Browser, Apple, P29, or slot numerators.

## 3. Fourier dynamic-target delta

The current source contains six physical `<component :is>` callsites. The
existing readiness denominator reports seven dynamic-target-open subject
instances but does not publish seven independently addressable subject records.
That count-to-row disconnect is itself RED; it must not be filled by guessing.

| Delta ID | Workflow | Source callsite | Dynamic selector | Required proof |
|---|---|---|---|---|
| `F8-DYN-01` | `N.C15` | `AppHeader.vue:117` | `activeTabData.icon` | exact tab-to-component domain, missing/unknown rejection, route/state mount |
| `F8-DYN-02` | `N.C15` | `AppHeader.vue:130` | `tab.icon` | exact loop member set, stable key/order, active/inactive mount ownership |
| `F8-DYN-03` | `N.C17` | `FourierMorphDemo.vue:72` | copied ? `Check` : `ClipboardCopy` | both targets, copied-state transition, timer/cleanup ownership |
| `F8-DYN-04` | `N.C22` | `MobileFloatingToc.vue:158` | expanded ? `ChevronDown` : `ChevronRight` | section identity, expand/collapse state, mobile mount and cleanup |
| `F8-DYN-05` | `N.C30` | `CoefficientsSpectrum.vue:132` | expanded ? `ChevronUp` : `ChevronDown` | disclosure state, keyboard semantics, target equality |
| `F8-DYN-06` | `N.C46` | `EditorControlsDock.vue:144` | showGhost ? `Eye` : `EyeOff` | ghost state, accessible label, visual/control ownership |
| `F8-DYN-07` | denominator reconciliation | seventh reported subject instance | **unbound in current inventory** | publish its exact parent callsite, target domain, route/mount context, and identity or correct the denominator |

The first six rows pin source-owned callsites; `F8-DYN-07` deliberately remains
RED. A later packet may claim 7/7 only after the seventh record is independently
derivable and duplicate/omission checks prove the denominator.

## 4. Fourier client-edge delta

These are the exact nine mounted API operations with zero current frontend
client edges in the authenticated inventory:

| Delta ID | Operation | Owning source | Required source result |
|---|---|---|---|
| `F8-CLIENT-01` | `GET /api/gallery/cursor` | `api/routers/gallery.py` | bind one current client method and consumer state, or explicit `SERVER_ONLY` law |
| `F8-CLIENT-02` | `GET /api/health` | `api/main.py` | bind readiness client/receiver without treating health as product readiness |
| `F8-CLIENT-03` | `GET /api/visualizations/{slug}/diff` | `api/routers/visualizations.py` | bind client method and diff UI/error receiver |
| `F8-CLIENT-04` | `GET /api/visualizations/{slug}/forks` | `api/routers/visualizations.py` | bind client method and forks empty/error receiver |
| `F8-CLIENT-05` | `GET /api/visualizations/{slug}/provenance` | `api/routers/visualizations.py` | bind client method and provenance receiver |
| `F8-CLIENT-06` | `GET /api/visualizations/{slug}/versions` | `api/routers/visualizations.py` | bind client method and version-history receiver |
| `F8-CLIENT-07` | `POST /api/visualizations/{slug}/publish` | `api/routers/visualizations.py` | bind client mutation and auth/success/error state |
| `F8-CLIENT-08` | `POST /api/visualizations/{slug}/remix` | `api/routers/visualizations.py` | bind client mutation and new-resource/conflict state |
| `F8-CLIENT-09` | `POST /api/visualizations/{slug}/unpublish` | `api/routers/visualizations.py` | bind client mutation and auth/success/error state |

If all nine receive authenticated client or explicit server-only dispositions,
the client-edge contract can advance from 36/45 to 45/45. This does not repair
OpenAPI security descriptions, currently 0/45, or the three absent/prune API
surfaces.

## 5. Fourier C31 split

R6 C31 is terminal RED because one mutation changes both
`client.method.visualization-update` and the non-owner
`operation.method.visualization-update`. A successor must define two distinct
production-consumed controls:

| Control | Sole mutable target | Required owner result | Required non-owner result |
|---|---|---|---|
| `F8-C31A` | `client.method.visualization-update` | exactly its client-method leaf fails | operation-method leaf and all other predicates retain |
| `F8-C31B` | `operation.method.visualization-update` | exactly its operation-method leaf fails | client-method leaf and all other predicates retain |

Both must use raw receipts, the same production validator, an owner-only bypass,
all-non-owner retention, and no caller-supplied expected code. C32–C37 remain
six separate absent controls. This delta authorizes neither construction nor
execution.

## 6. Auxiliary identity and causal-source delta

The next auxiliary packet must use a versioned repository-qualified identity:

`aux.subject.v2|repositoryId|logicalSubjectId|sourceCoordinateSha256`

and a length-framed cell preimage binding packet version, subject identity,
applicability witness, platform, viewport, state, profile, evidence joins, and
D1/D2 identities. Raw IDs such as `support:admin-debug` are forbidden as
cross-repository keys.

The package-consumer registry must add these four exact causal files before it
rederives any join:

| Delta ID | Repository | Required causal member | Pinned SHA prefix | Gap closed |
|---|---|---|---|---|
| `A8-CAUSE-01` | bbnf-buddy | `src/editor/components/EditorPanel.vue` | `0edc3197…` | editor/debug/error ownership |
| `A8-CAUSE-02` | CSC411 | `GameGallery.vue` | `82c90b4d…` | gallery/game-state ownership |
| `A8-CAUSE-03` | CSC411 | `useDebug.ts` | `3adad5c9…` | debug/Admin causality |
| `A8-CAUSE-04` | CSC411 | `FilterTuner.vue` | `96b05cc6…` | filter/solver-state ownership |

Pencil must replace the free 41-subject × 4-origin × 11-state × 11-profile
Cartesian product with one applicability record per subject and axis. Every
inapplicable combination needs an authenticated N/A witness naming the source
fact that makes it impossible. Forced-colors, RTL, and large-text are distinct
profiles; they may not be collapsed or injected as fixture-only states.

## 7. Honest deltas and stop law

| Denominator | Before | Maximum source-only after this delta is implemented | Admission effect |
|---|---:|---:|---:|
| Fourier workflow dispositions | 64/66 | 66/66 | 0 |
| Fourier dynamic subject records | 0/7 closed | 7/7 only after `F8-DYN-07` is derived | 0 |
| Fourier client edges/dispositions | 36/45 | 45/45 | 0 |
| Fourier controls | 30/37 | 32/38 if C31 is lawfully replaced by C31A/C31B; later denominator must be owner-frozen | 0 |
| Fourier P29 COMPLETE | 0/137 | unchanged | 0 |
| auxiliary repository-qualified identity law | 0/1 | 1/1 source mechanism | 0 |
| auxiliary missing causal members | 0/4 present | 4/4 present | 0 |
| auxiliary source-admissible D1 | 0/37 | must be independently recomputed | 0 |
| auxiliary source-admissible D2 | 0/37 | must be independently recomputed | 0 |

No row in this document is an owner decision, source-packet acceptance, or
execution release. The common V6 law remains terminal RED; native inputs remain
0/4 and the strict root remains 0/5.
