# Value 4 release

> **HISTORICAL / IMMUTABLE COORDINATE (V-A130):** `@mkbabb/value.js@4.0.0` has already been published with provenance. This file remains the producer workflow record; do not rerun its tag/publish recipe from this checkout. The live V release boundary is the Glass-only W17/W33 close.

Observed immutable coordinate: gitHead `44ddaff7a22283a4f7a42608893eeae7bc234424`; tarball [value.js-4.0.0.tgz](https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz); integrity `sha512-Z8ywb4htSxJlRFvoU1DNtvzr9Bsuaw9ahT/hvNlKbnRj6fTnLuXjn0itKq1Q5s6rwg24ct0zcLZ04BuR3/SzGw==`; shasum `ccb962e592fb42e6602fc2bb6afbfb1763788b9d`; provenance run `29497728532`.

This is the canonical immutable publication path for `@mkbabb/value.js`.
Value is the producer root of the Value → Keyframes → Glass dependency graph.
It publishes from a registry-only lock and never resolves either consumer
through a file link, tarball lock, forced resolution, stale lock, or CI bypass.

## Producer boundary

Version 4 publishes exactly seven capability entries:

- `@mkbabb/value.js/color`
- `@mkbabb/value.js/value`
- `@mkbabb/value.js/css`
- `@mkbabb/value.js/easing`
- `@mkbabb/value.js/math`
- `@mkbabb/value.js/transform`
- `@mkbabb/value.js/quantize`

The package root, `/parsing`, and `/units` do not resolve. The producer
manifest has no runtime, peer, optional, Glass, or Keyframes dependency.
Demo and integration consumers are released only after their immutable
registry dependencies exist.

## Pre-tag rehearsal

Start from the intended release index or commit, not from unrelated dirty demo
or tranche files. A fresh isolated checkout must pass:

```bash
npm ci
npm run lint
npx vue-tsc -p tsconfig.lib.json --noEmit
npm run build
npm test
npm pack --json --ignore-scripts
node scripts/ci/verify-packed-surface.mjs ./mkbabb-value.js-4.0.0.tgz
```

`npm ci` runs the unconditional `prepare` build. The later pack uses
`--ignore-scripts` deliberately: it packages the already checked output once
instead of rebuilding inside the pack command and corrupting its JSON record.
The packed verifier performs a registry-free install, imports all seven runtime
entries, rejects the three removed entries, and compiles all 62 public types
with `skipLibCheck:false`.

The local tarball is rehearsal evidence only. Delete it after inspection. It is
not the release candidate and must not be published.

## Commit, push, and tag

The producer release commit contains only the exact Value 4 library,
producer tests, package metadata, registry-only lock, documentation, and
release automation. Push that commit before creating the tag.

```bash
git push origin tranche-u
git tag -a v4.0.0 -m "v4.0.0 — exact seven-capability Value surface"
git push origin v4.0.0
```

The annotated tag must peel to the already-pushed release commit. Pushing the
tag is irreversible release authorization because it starts
`.github/workflows/release.yml`.

## Governed publication

The tag workflow:

1. installs only the registry lock with `npm ci`;
2. runs lint, library typecheck, unconditional build, and the full producer
   suite;
3. verifies the tag version, stamps the peeled commit as `gitHead`, and packs
   exactly one candidate with `npm pack --json --ignore-scripts`;
4. records bytes, SHA-256, raw SHA-512, npm integrity, shasum, tag, commit, run
   and attempt;
5. verifies the packed runtime and strict declaration surface in an isolated
   consumer;
6. uploads that exact tarball and its machine manifest;
7. publishes that exact pathname with npm provenance; and
8. waits for registry visibility, then requires registry version, integrity,
   shasum, and `gitHead` to equal the candidate record.

There is no local `npm publish` fallback. A red workflow leaves publication
blocked; it does not authorize repacking or bypassing provenance.

## Immutable return coordinates

After the workflow and registry are green, record:

- version and dist-tag;
- annotated tag object and peeled commit;
- registry `gitHead`;
- tarball URL;
- bytes, SHA-256, raw SHA-512, integrity, and shasum;
- GitHub Actions provenance run URL and ID; and
- a fresh registry install/signature verification result.

Only observed registry bytes receive release credit. Rehearsal archives,
predicted hashes, dirty trees, and source-only checks do not.

## Downstream order

After immutable Value 4 exists:

1. Keyframes regenerates its registry-only lock against exact Value 4,
   removes unpublished Glass as a producer prerequisite, and publishes its
   evidence-derived version.
2. Glass publishes against registry Value and Keyframes artifacts.
3. Value and Keyframes demo lanes may then restore ordinary registry consumer
   dependencies and refresh deployment workflows and locks.

No downstream demo or deployment assumption may delay, mutate, or contaminate
the producer artifact.

## Recovery

Do not unpublish an artifact that consumers may have resolved. Deprecate the
bad immutable version with a precise reason, correct the source on a new patch
version, repeat this entire producer path, and publish a new provenance-backed
artifact.
