# Canonical API Operation Manifest

## Authority and notation

This is the closed target HTTP/headless registry signed
`A-ADJ-SOL3-ROUTES-2026-07-18`. A00 inventories the current deployed and
repository surfaces; it does not select a target method or path. A20/A23C
generate code, OpenAPI and clients from these rows and may invent nothing.
The manifest contains 130 HTTP operations (89 value, 41 Fourier) and 17
deliberately headless operations.

Canonical tuple signatures (`id`, `method`, `path`, authority/precondition,
success) are SHA-256
`5d311e21660a2ec8a3dfee1b5c7389c91e4426926205a543ddf9aa5fbbc2793a`;
the ordered headless-ID signature is
`80af0a72d99e88dbcbac5fbc652604e733cfac7bd70df21417110491302cc8b2`.
`tools/validate-corpus.mjs` reparses every cell, rejects duplicate service/
method/path tuples and compares both signatures; a count-only check is invalid.

- `I` means `Idempotency-Key` is required.
- `E` means `If-Match` is required.
- Value `administrator` and `moderator` are roles on a value secure-cookie
  session. They are not Fourier's deployment `Operator` principal.
- Fourier `Resource` is the client-generated 32-byte per-resource credential
  carried by `Authorization: Resource`; the service stores only its salted
  digest. `Operator` is the deployment principal.
- Generated immutable slugs are locators. `userId`, `paletteId` and the
  corresponding Fourier opaque IDs are authority-bearing identities.
- Raw media, typed exports, job results and OpenAPI use their declared media
  type rather than a JSON `data` envelope.

## Executable semantic contract

[`api-contract.source.json`](./api-contract.source.json) is the authoritative,
strict machine source behind these human rows. It binds every HTTP operation to
its owning wave, request path/query/header/body schema references and media,
success and RFC 9457 error responses, authority/preconditions, cache/CORS/
privacy/idempotency/CAS policy, lifecycle transition, named consumers and
`headless: false`. Its 17 `headless: true` rows separately bind input/output,
authority, idempotency, retry, state transition, owner and consumer without
inventing HTTP routes. Value's Palette API remains in `value.js/api`; Fourier's
Python service remains an independent runtime. Only wire contracts and neutral
vectors are shared.

The source is governed by
[`api-contract.source.schema.json`](./api-contract.source.schema.json) and
[`tools/validate-api-contract.mjs`](./tools/validate-api-contract.mjs). Run the
validator without arguments for the signed digest set, with `--expanded` for
canonical JSON, or with `--pretty` for the fully expanded generator input. The
expansion resolves every named authority/policy/error profile and emits a total
schema-binding ledger; it performs no operation inference. A20/A23C must refuse
generation while any non-built-in schema reference remains unmaterialized.

The signed formation expansion is HTTP
`571bf5d0c3ad1942a4c0e0ce6802f7ee13a4d66a52a93d0ca5301d91833e8c07`,
headless
`b840f1b6efb3c09321ead0acb244d0c8ecb15a9527ede015be6ee28925f82157`,
schema bindings
`a82165f1a3cc43cb96132efee4fe5bb2c899ec47992b49f8f93295fffd40456a`
and whole expanded contract
`975eb8d720aea4e826b549f3d47f9054775371f90dd5ba631e968653f1121469`.

[`API-TARGET-PATHS.json`](./API-TARGET-PATHS.json) is the sole expanded
language-local file/test/worker/migration projection of this registry. Its
147-row operation/owner/target-unit digest is
`0eaa1439df3a06b382d432fa4fc15f8b528a38fde19b378603298df4e59208fc`;
`tools/validate-api-target-paths.mjs` rejects an operation without exactly one
target unit or, for a headless operation, without an exact worker binding.

[`API-RETURN-COVERAGE.json`](./API-RETURN-COVERAGE.json) is the closed return
projection for all 36 A waves plus C03, C06 and C10. Each row keeps exact HTTP
and headless ownership vectors separate from exact audit vectors; empty arrays
are authoritative, not permission to omit the API section. Ownership is
derived solely from `api-contract.source.json` and forms a 147-operation
bijection. Its RFC 8785/JCS self-hash is
`46083a726ea3edf9e333d3b5ba5a159f66d9b48662f495780b78d37972970157`.
A00/A01/A26/C06/C10 audit all 147 operations; A03/A06 audit the 96
value operations; A21R/C03 audit the 51 Fourier operations. A20 and A23C own
their two service metadata operations and separately audit every other
same-service HTTP operation, so their disjoint unions close at 89 and 41 HTTP
IDs respectively. [`tools/validate-api-return-coverage.mjs`](./tools/validate-api-return-coverage.mjs)
rejects missing/extra/duplicate IDs, unknown owners, owned/audited overlap,
source or wave drift, and a wave return whose four owned/audited
HTTP/headless arrays do not equal its exact row vectors.

## Value identity and sessions

| Operation ID | Method | Canonical path | Authority / precondition | Success |
|---|---|---|---|---:|
| `value.user.create` | POST | `/api/users` | Public; I; write-only client recovery credential | 201 |
| `value.user.current` | GET | `/api/users/me` | Session | 200 |
| `value.user.delete-current` | DELETE | `/api/users/me` | Session; E; `Palette-Disposition` | 204 |
| `value.user.rotate-recovery` | PUT | `/api/users/me/recovery-credential` | Session; E; write-only client credential | 204 |
| `value.session.create` | POST | `/api/sessions` | Recovery credential | 201 + `Set-Cookie` |
| `value.session.current` | GET | `/api/sessions/current` | Session | 200 |
| `value.session.delete-current` | DELETE | `/api/sessions/current` | Session | 204 |
| `value.user.list` | GET | `/api/users` | Administrator; cursor/search | 200 |
| `value.user.detail` | GET | `/api/users/{userId}` | Administrator | 200 |
| `value.user.set-status` | PUT | `/api/users/{userId}/status` | Administrator; E | 200 |
| `value.user.revoke-sessions` | DELETE | `/api/users/{userId}/sessions` | Administrator; E | 204 |
| `value.user.add-role` | PUT | `/api/users/{userId}/roles/{role}` | Administrator; E | 204 |
| `value.user.remove-role` | DELETE | `/api/users/{userId}/roles/{role}` | Administrator; E | 204 |
| `value.user.delete` | DELETE | `/api/users/{userId}` | Administrator; E; `Palette-Disposition` | 204 |

There is no `/api/admin/*` router. First-administrator bootstrap is headless.

## Value palettes, history, forks and variants

| Operation ID | Method | Canonical path | Authority / precondition | Success |
|---|---|---|---|---:|
| `value.palette.create` | POST | `/api/palettes` | Session; I | 201 |
| `value.palette.list-search` | GET | `/api/palettes` | Public/policy-filtered; cursor | 200 |
| `value.palette.mine` | GET | `/api/palettes/mine` | Session; cursor | 200 |
| `value.palette.detail` | GET | `/api/palettes/{slug}` | Policy-filtered | 200 |
| `value.palette.patch` | PATCH | `/api/palettes/{slug}` | Owner/administrator; E | 200 |
| `value.palette.set-visibility` | PUT | `/api/palettes/{slug}/visibility` | Owner/administrator; E | 200 |
| `value.palette.trash` | DELETE | `/api/palettes/{slug}` | Owner/administrator; E | 204 |
| `value.palette.trash-list` | GET | `/api/palette-trash` | Session/administrator; cursor | 200 |
| `value.palette.trash-detail` | GET | `/api/palette-trash/{slug}` | Owner/administrator | 200 |
| `value.palette.restore` | POST | `/api/palette-trash/{slug}/restore` | Owner/administrator; E + I | 200 |
| `value.palette.purge` | DELETE | `/api/palette-trash/{slug}` | Owner/administrator; E | 204 |
| `value.revision.list` | GET | `/api/palettes/{slug}/revisions` | Policy-filtered; cursor | 200 |
| `value.revision.detail` | GET | `/api/palettes/{slug}/revisions/{revisionNo}` | Policy-filtered | 200 |
| `value.revision.diff` | GET | `/api/palettes/{slug}/revisions/{fromRevisionNo}/diff/{toRevisionNo}` | Policy-filtered | 200 |
| `value.revision.revert` | POST | `/api/palettes/{slug}/revisions/{revisionNo}/revert` | Owner; E + I | 201 |
| `value.fork.create` | POST | `/api/palettes/{slug}/forks` | Session; I | 201 |
| `value.fork.list` | GET | `/api/palettes/{slug}/forks` | Policy-filtered; cursor | 200 |
| `value.fork.provenance` | GET | `/api/palettes/{slug}/provenance` | Policy-filtered/redacted | 200 |
| `value.variant.create` | POST | `/api/palettes/{slug}/variants` | Owner; E + I | 201 |
| `value.variant.list` | GET | `/api/palettes/{slug}/variants` | Policy-filtered; cursor | 200 |
| `value.variant.detail` | GET | `/api/palettes/{slug}/variants/{variantId}` | Policy-filtered | 200 |
| `value.variant.patch` | PATCH | `/api/palettes/{slug}/variants/{variantId}` | Owner; E | 200 |
| `value.variant.delete` | DELETE | `/api/palettes/{slug}/variants/{variantId}` | Owner; E | 204 |
| `value.variant.revision-list` | GET | `/api/palettes/{slug}/variants/{variantId}/revisions` | Policy-filtered; cursor | 200 |
| `value.variant.revision-detail` | GET | `/api/palettes/{slug}/variants/{variantId}/revisions/{revisionNo}` | Policy-filtered | 200 |
| `value.variant.revision-diff` | GET | `/api/palettes/{slug}/variants/{variantId}/revisions/{fromRevisionNo}/diff/{toRevisionNo}` | Policy-filtered | 200 |
| `value.variant.revert` | POST | `/api/palettes/{slug}/variants/{variantId}/revisions/{revisionNo}/revert` | Owner; E + I | 201 |

## Value mixes, shares and typed exports

| Operation ID | Method | Canonical path | Authority / precondition | Success |
|---|---|---|---|---:|
| `value.mix.validate` | POST | `/api/mixes/validate` | Session optional; stateless | 200 |
| `value.mix.preview` | POST | `/api/mixes/preview` | Session optional; stateless | 200 |
| `value.mix.create` | POST | `/api/mixes` | Session; I | 201 |
| `value.mix.list` | GET | `/api/mixes` | Session/policy-filtered; cursor | 200 |
| `value.mix.detail` | GET | `/api/mixes/{mixId}` | Policy-filtered | 200 |
| `value.mix.patch` | PATCH | `/api/mixes/{mixId}` | Owner; E | 200 |
| `value.mix.delete` | DELETE | `/api/mixes/{mixId}` | Owner; E | 204 |
| `value.mix.revision-list` | GET | `/api/mixes/{mixId}/revisions` | Policy-filtered; cursor | 200 |
| `value.mix.revision-detail` | GET | `/api/mixes/{mixId}/revisions/{revisionNo}` | Policy-filtered | 200 |
| `value.mix.revision-diff` | GET | `/api/mixes/{mixId}/revisions/{fromRevisionNo}/diff/{toRevisionNo}` | Policy-filtered | 200 |
| `value.mix.revert` | POST | `/api/mixes/{mixId}/revisions/{revisionNo}/revert` | Owner; E + I | 201 |
| `value.mix.materialize` | POST | `/api/mixes/{mixId}/materializations` | Owner + target authority; E + I | 201 |
| `value.share.create` | POST | `/api/shares` | Session; I | 201 |
| `value.share.list` | GET | `/api/shares` | Session; cursor | 200 |
| `value.share.detail` | GET | `/api/shares/{shareId}` | Creator | 200 |
| `value.share.revoke` | DELETE | `/api/shares/{shareId}` | Creator; E | 204 |
| `value.share.redeem` | POST | `/api/shares/{shareId}/redeem` | One-use URL-fragment capability | 204 + `Set-Cookie` |
| `value.revision.export` | GET | `/api/palettes/{slug}/revisions/{revisionNo}/exports/{format}` | Policy-filtered; raw typed media | 200 |
| `value.variant.export` | GET | `/api/palettes/{slug}/variants/{variantId}/revisions/{revisionNo}/exports/{format}` | Policy-filtered; raw typed media | 200 |
| `value.mix.export` | GET | `/api/mixes/{mixId}/revisions/{revisionNo}/exports/{format}` | Policy-filtered; raw typed media | 200 |

Palette/variant `format` is exactly `canonical-json`,
`css-custom-properties`, or `css-gradient`; mixes admit only
`canonical-json`. A private share capability exists only in the fragment,
redeems once into an HttpOnly grant and is stripped immediately.

## Value community, catalog, curation, audit and meta

| Operation ID | Method | Canonical path | Authority / precondition | Success |
|---|---|---|---|---:|
| `value.vote.put` | PUT | `/api/palettes/{slug}/vote` | Session | 204 |
| `value.vote.delete` | DELETE | `/api/palettes/{slug}/vote` | Session | 204 |
| `value.flag.create` | POST | `/api/palettes/{slug}/flags` | Session; I | 201 |
| `value.flag.list` | GET | `/api/flags` | Moderator; cursor | 200 |
| `value.flag.detail` | GET | `/api/flags/{flagId}` | Reporter/moderator | 200 |
| `value.flag.claim-review` | PUT | `/api/flags/{flagId}/review` | Moderator; E | 200 |
| `value.flag.decide` | PUT | `/api/flags/{flagId}/decision` | Moderator; E | 200 |
| `value.tag.create` | POST | `/api/tags` | Administrator; I | 201 |
| `value.tag.list` | GET | `/api/tags` | Public; cursor/search | 200 |
| `value.tag.detail` | GET | `/api/tags/{tagId}` | Public | 200 |
| `value.tag.patch` | PATCH | `/api/tags/{tagId}` | Administrator; E | 200 |
| `value.tag.delete` | DELETE | `/api/tags/{tagId}` | Administrator; E | 204 |
| `value.tag.impact` | GET | `/api/tags/{tagId}/impact` | Administrator | 200 |
| `value.tag.merge` | POST | `/api/tags/{tagId}/merge` | Administrator; E + I | 200 |
| `value.color-name.list` | GET | `/api/color-names` | Public; cursor/search | 200 |
| `value.color-name.detail` | GET | `/api/color-names/{nameId}` | Public | 200 |
| `value.color-name-proposal.create` | POST | `/api/color-name-proposals` | Public/rate-limited; I | 201 |
| `value.color-name-proposal.list` | GET | `/api/color-name-proposals` | Moderator; cursor | 200 |
| `value.color-name-proposal.detail` | GET | `/api/color-name-proposals/{proposalId}` | Public status/moderator detail | 200 |
| `value.color-name-proposal.decide` | PUT | `/api/color-name-proposals/{proposalId}/decision` | Moderator; E | 200 |
| `value.color-name-proposal.merge` | POST | `/api/color-name-proposals/{proposalId}/merge` | Moderator; E + I | 200 |
| `value.featured.list` | GET | `/api/featured-palettes` | Public; cursor | 200 |
| `value.featured.put` | PUT | `/api/featured-palettes/{paletteId}` | Moderator; E | 204 |
| `value.featured.delete` | DELETE | `/api/featured-palettes/{paletteId}` | Moderator; E | 204 |
| `value.audit.list` | GET | `/api/audit-events` | Administrator; cursor/filter | 200 |
| `value.audit.detail` | GET | `/api/audit-events/{eventId}` | Administrator | 200 |
| `value.meta.health` | GET | `/api/health` | Public | 200 |
| `value.meta.openapi` | GET | `/api/openapi.json` | Public; raw OpenAPI | 200 |

`/api/docs`, publish/unpublish commands, vote toggles, impersonation and every
`/api/admin/*` path are absent.

## Fourier visualizations, history, derivation and binding

| Operation ID | Method | Canonical path | Authority / precondition | Success |
|---|---|---|---|---:|
| `fourier.visualization.create` | POST | `/api/visualizations` | Public; client edit credential; I | 201 |
| `fourier.visualization.list-search` | GET | `/api/visualizations` | Public live search; Operator may include all states | 200 |
| `fourier.visualization.detail` | GET | `/api/visualizations/{slug}` | Public/unlisted or Resource/Operator | 200 |
| `fourier.visualization.patch` | PATCH | `/api/visualizations/{slug}` | Resource/Operator; E | 200 |
| `fourier.visualization.trash` | DELETE | `/api/visualizations/{slug}` | Resource/Operator; E | 204 |
| `fourier.visualization.trash-detail` | GET | `/api/visualization-trash/{slug}` | Resource/Operator | 200 |
| `fourier.visualization.restore` | POST | `/api/visualization-trash/{slug}/restore` | Resource/Operator; E + I | 200 |
| `fourier.visualization.purge` | DELETE | `/api/visualization-trash/{slug}` | Resource/Operator; E | 204 |
| `fourier.revision.list` | GET | `/api/visualizations/{slug}/revisions` | Readable source; cursor | 200 |
| `fourier.revision.detail` | GET | `/api/visualizations/{slug}/revisions/{revisionNo}` | Readable source | 200 |
| `fourier.revision.diff` | GET | `/api/visualizations/{slug}/revisions/{fromRevisionNo}/diff/{toRevisionNo}` | Readable source | 200 |
| `fourier.revision.revert` | POST | `/api/visualizations/{slug}/revisions/{revisionNo}/revert` | Resource/Operator; E + I | 201 |
| `fourier.derivation.create` | POST | `/api/visualizations/{slug}/derivations` | Readable source; client child credential; I | 201 |
| `fourier.derivation.list` | GET | `/api/visualizations/{slug}/derivations` | Readable source; cursor | 200 |
| `fourier.derivation.provenance` | GET | `/api/visualizations/{slug}/provenance` | Readable/redacted | 200 |
| `fourier.binding.read` | GET | `/api/visualizations/{slug}/palette-binding` | Readable visualization | 200 |
| `fourier.binding.put` | PUT | `/api/visualizations/{slug}/palette-binding` | Resource/Operator; E | 200 |
| `fourier.binding.delete` | DELETE | `/api/visualizations/{slug}/palette-binding` | Resource/Operator; E | 204 |

## Fourier assets and durable jobs

| Operation ID | Method | Canonical path | Authority / precondition | Success |
|---|---|---|---|---:|
| `fourier.image.create` | POST | `/api/images` | Public; client image/job credential; I | 202 + `Location` |
| `fourier.image.list` | GET | `/api/images` | Operator; cursor/state | 200 |
| `fourier.image.detail` | GET | `/api/images/{imageId}` | Exposure policy or Resource/Operator | 200 |
| `fourier.image.representation` | GET | `/api/images/{imageId}/representations/{kind}` | Exposure policy or Resource/Operator; raw media | 200/206 |
| `fourier.image.delete` | DELETE | `/api/images/{imageId}` | Resource/Operator; E | 204 |
| `fourier.contour.create` | POST | `/api/contours` | Public; bounded validation; client credential; I | 201 |
| `fourier.contour.list` | GET | `/api/contours` | Operator; cursor/state | 200 |
| `fourier.contour.detail` | GET | `/api/contours/{contourId}` | Exposure policy or Resource/Operator | 200 |
| `fourier.contour.points` | GET | `/api/contours/{contourId}/points` | Exposure policy or Resource/Operator | 200 |
| `fourier.contour.delete` | DELETE | `/api/contours/{contourId}` | Resource/Operator; E | 204 |
| `fourier.job.extract-contour` | POST | `/api/images/{imageId}/contour-jobs` | Readable image; client job/result credential; I | 202 |
| `fourier.job.epicycles` | POST | `/api/contours/{contourId}/epicycle-jobs` | Readable contour; client job credential; I | 202 |
| `fourier.job.bases` | POST | `/api/contours/{contourId}/basis-jobs` | Readable contour; client job credential; I | 202 |
| `fourier.job.equation` | POST | `/api/equation-jobs` | Public; client job credential; I | 202 |
| `fourier.job.simplification` | POST | `/api/simplification-jobs` | Public; client job credential; I | 202 |
| `fourier.job.list` | GET | `/api/jobs` | Operator; cursor/state/type | 200 |
| `fourier.job.detail` | GET | `/api/jobs/{jobId}` | Resource/Operator | 200 |
| `fourier.job.result` | GET | `/api/jobs/{jobId}/result` | Resource/Operator; raw typed result | 200 |
| `fourier.job.cancel` | DELETE | `/api/jobs/{jobId}` | Resource/Operator; E | 202 + truthful job state |
| `fourier.audit.list` | GET | `/api/audit-events` | Operator; cursor/filter | 200 |
| `fourier.audit.detail` | GET | `/api/audit-events/{eventId}` | Operator | 200 |
| `fourier.meta.health` | GET | `/api/health` | Public | 200 |
| `fourier.meta.openapi` | GET | `/api/openapi.json` | Public; raw OpenAPI | 200 |

Image representation `kind` is exactly `content`, `thumbnail`, or `analysis`.
Arbitrary resize-on-GET and `/by-hash` are absent. Fourier also has no
sessions, gallery, users, owners, mine, private/draft server state,
likes/views/flags, social/admin router, publish/unpublish command or synchronous
heavy-compute endpoint.

## Headless registry operations

These operations have `transport: "headless"` and deliberately have no HTTP
path:

```text
value.identity.expire-sessions
value.http.expire-idempotency
value.share.expire-grants
value.lifecycle.purge-expired
value.audit.rebuild-projections
value.db.run-migrations
value.identity.bootstrap-first-administrator

fourier.job.claim
fourier.job.heartbeat
fourier.job.complete
fourier.job.reclaim-expired-lease
fourier.asset.sweep
fourier.visualization.purge-expired
fourier.http.expire-idempotency
fourier.compute.expire-cache
fourier.audit.rebuild-projections
fourier.db.run-migrations
```

No internal worker callback, cron, migration, projection rebuild or bootstrap
HTTP route is admitted.
