# Contributing to value.js

## Repository constellation + sibling checkout layout

`value.js` is developed alongside sibling repositories that are checked out **side-by-side** under a common parent directory:

```
Programming/
├── value.js/          # this repo
├── glass-ui/          # design-system primitives
├── keyframes.js/      # animation library (a value.js consumer)
└── precepts/          # shared engineering precepts (a git submodule of value.js)
```

Two devDependencies in `package.json` point at siblings via `file:` specifiers:

```json
"@mkbabb/glass-ui":     "file:../glass-ui",
"@mkbabb/keyframes.js": "file:../keyframes.js"
```

### Why `file:` devDependencies

- They are **devDependencies**, not runtime `dependencies` — `@mkbabb/value.js`'s published package has exactly one runtime dependency (`@mkbabb/parse-that`). The `file:` siblings are consumed only by the demo + by cross-repo development workflows.
- The `file:` form lets local development resolve the *working-tree* state of a sibling — so a change in `glass-ui/` is immediately visible to the value.js demo without a publish round-trip.
- It encodes the **work-pairing assumption**: contributors doing cross-repo work have the siblings checked out at `../<repo>`. If you do not have a sibling checked out, install with `npm install --legacy-peer-deps` and the `file:` resolution is tolerated; the library build (`npm run build`) does not need the siblings.

### Sibling-cwd codemod execution

`value.js` publishes consumer-migration codemods under `scripts/migrate-*.mjs` (e.g. `scripts/migrate-keyframes-js-lerp.mjs`). These are included in the npm tarball (`package.json` `files:` carries `scripts/migrate-*.mjs`) and guarded by `npm run proof:codemod-publication`.

A codemod is run **with the consuming repo as the current working directory**:

```bash
cd ../keyframes.js
node ../value.js/scripts/migrate-keyframes-js-lerp.mjs --dry-run .
node ../value.js/scripts/migrate-keyframes-js-lerp.mjs .
```

Codemods are **parity-asserting, idempotent, and dry-run-safe** — re-running one is a no-op, and `--dry-run` previews the diff without writing. Cross-repo writes (applying a codemod against a sibling) are made only with explicit authorization and stay narrowly bounded to the codemod's scope.

## Development

```bash
npm install --legacy-peer-deps   # the constellation pins Vite 8; some peers declare Vite ^7
npx playwright install           # one-time: fetch all browser binaries (chromium + webkit + firefox)
npm run build                    # library → dist/
npm run dev                      # demo dev server
npm test                         # vitest unit suite
npx playwright test              # e2e smoke suite (5 projects)
npm run lint                     # eslint flat config — exit 0 required
```

`npx playwright install` is a one-time setup step. The e2e smoke suite spans 5 Playwright projects: `smoke` + `smoke-admin` + `smoke-reactivity` run on Chromium, `smoke-mobile` on Pixel-7 Chromium, and `smoke-safari` on iPhone-14 WebKit — so a local full-suite run needs both Chromium and WebKit installed. CI installs the narrower `chromium webkit` pair only (see `.github/workflows/node.js.yml`).

## Invariant proof scripts

The repository's structural invariants are codified as runtime-checkable proof scripts. All must exit 0 before a change merges:

```bash
npm run proof:resolution          # contract-v2 dev-resolution + types-key probe
npm run proof:dts-layout          # flat dist/ dts emission
npm run proof:no-deprecated       # zero @deprecated in src/
npm run proof:no-ts-ignore        # zero @ts-ignore in src/
npm run proof:as-any-budget       # ≤ 5 `as any` in src/ (currently 0)
npm run proof:codemod-publication # migrate-*.mjs discoverable in the npm tarball
npm run proof:no-deep             # zero :deep()/::v-deep in demo/ + src/
npm run proof:no-bare-builtins    # node:* prefix required for built-ins in api/src/
```

CI runs every proof script post-build. A new structural invariant should be codified as a proof script, not left to review.

## Conventions

See `CLAUDE.md` for the full set. In brief: TypeScript `strict` + `verbatimModuleSyntax` (`import type` for all type-only imports); named exports only (no defaults); `@mkbabb/parse-that` for parsing; color components normalized to `[0,1]` internally; no god modules — focused modules ≤ 350 LoC; CHANGELOG.md must be updated when `src/`, `package.json`, build config, or `api/` source changes.

## Release

Publishing is a manual, tranche-close ceremony — there is no tag-triggered release workflow. For the full publish sequence (version bump, CHANGELOG header, `npm publish --legacy-peer-deps`, tag-push, GitHub release), see `docs/RELEASE.md`.
