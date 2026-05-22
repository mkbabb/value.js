# G.W3 Lane K — `proof:no-bare-builtins` for `api/src/` (FOLD-S2)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: author `scripts/proof-no-bare-builtins.mjs` — zero bare built-in
imports (no `node:` prefix) in `api/src/` — and wire it into `package.json
scripts` + the CI workflow. Per `G.W3.md §"Lane K"` and
`G-PEER-SPEEDTEST §7.1 FOLD-S2` (user-ratified 2026-05-21).

---

## The finding

Node 22+ resolution accepts both `events` and `node:events`, but the bare form
**collides with local directory names** — a future `api/src/events/`,
`api/src/util/`, or `api/src/crypto/` would silently shadow the builtin under
bundler resolution. The Hono + Node 22+ stack at `api/` shares the exact
fragility class speedtest's `scripts/check-bare-built-ins.mjs` gates against.
value.js had no equivalent guard for its backend. FOLD-S2 ports it, scoped at
`api/src/`.

## The fix

`scripts/proof-no-bare-builtins.mjs` — a faithful port of speedtest's
`check-bare-built-ins.mjs`:

- Walks `api/src/` recursively (`node:fs` readdir; skips `node_modules`,
  `dist`, `.git`; matches `.ts/.tsx/.mts/.cts/.js/.mjs/.cjs`).
- Three regex families catch every bare-import idiom against the 13 builtins
  (`fs`, `path`, `crypto`, `url`, `os`, `stream`, `util`, `child_process`,
  `http`, `https`, `events`, `querystring`, `buffer`):
  - ESM `from "<builtin>"`,
  - bare side-effect `import "<builtin>"`,
  - CJS/dynamic `require("<builtin>")` / `import("<builtin>")`.
- Each pattern tolerates a `/subpath` segment. Any match → file:line + snippet
  → exit 1 with the `node:`-prefix remediation.

Wired: `package.json scripts` entry `proof:no-bare-builtins`; CI workflow step
"Proof — no bare built-in imports in api/src/" in the G.W3 invariant block.

## Verification

`npm run proof:no-bare-builtins` →
`PASS — scanned 71 file(s) in api/src/; zero bare built-in imports`, exit 0 at
HEAD. The api/ backend already uses the `node:` prefix throughout — the gate
codifies the existing discipline.

## Sub-gate K — status

- [x] `npm run proof:no-bare-builtins` exits 0 at HEAD.
- [x] CI step wired.

## Files

- `scripts/proof-no-bare-builtins.mjs` — new.
- `package.json` — `scripts` entry.
- `.github/workflows/node.js.yml` — CI step.
