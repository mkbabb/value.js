# E.W4 Lane D — CW seed preparation (value.js as CONSUMER)

**Lane**: E.W4 Lane D — CW-readiness verdict for the speedtest CW seed.
**Mode**: READ-ONLY against the speedtest CW seed (`61079cb1`). The only writes are this audit + a proposed `coordination/Q.md §4` update (the orchestrator integrates).
**Date**: 2026-05-20.
**Branch / HEAD**: `tranche-e` @ `4dbe5c48efe0e6dde6b48a15ca21c9effcd1c24a`.
**Authoring posture**: this artefact records the verification verdict; the §4 update text in §3 below is the orchestrator's integration payload (Lane D does not write `Q.md` directly per the dispatch contract's hard cap).

---

## §1 — Pre-state

- **Speedtest CW seed**: `61079cb1` (verified at E.W0 Lane C; CW-seed merge commit on speedtest master).
- **CW form**: pnpm-workspace overlay (7 repos, 7 cadences, one `constellation/` root). Grade A overlay preserves 7 git histories (per A4 §2.1).
- **value.js's CW-coupling**: **CONSUMER**, not author. Per CW.md §17 + A4 §5.1 option 2: value.js is "flipped last by its own team in one commit" — the workspace landing is gated on Phase-0 quiescence (fourier-analysis is the lone blocker today with 109 dirty files), then on a per-member opt-in flip.
- **value.js's authoring role in CW**: MINIMAL — value.js does NOT write `pnpm-workspace.yaml`, does NOT change its `exports` map (contract-v2 + v0.6.0 surface stand). value.js MAY change its `devDependencies` block: `@mkbabb/glass-ui: file:../glass-ui` → `@mkbabb/glass-ui: workspace:^` — a 1-line `package.json` edit, opportunistic with CW Phase-2.
- **coordination/Q.md §4 current state** (verbatim):

```markdown
## §4 — Speedtest CW (monorepo workspace transposition)

**The largest in-flight constellation change.** Per `E-AUDIT-4 §4`:

- **Form**: pnpm-workspace overlay across the constellation (7 repos, 7 cadences, one `constellation/` root).
- **Authorship**: speedtest's CW lead. Value.js is a CONSUMER, not author.
- **Predecessor**: G-AH-D1 (decision from speedtest tranche AH).
- **Gating posture (per the CW seed `61079cb1`)**: Phase-0 quiescence (fourier-analysis is the lone Phase-0 blocker — 109 dirty files); user-explicit signal; AH-CLOSE (✓).
- **Value.js role**: when CW Phase-2 reaches value.js, it's a 1-line `package.json` flip (`file:../glass-ui` → `workspace:^`). No structural change.
- **E preparation (E.W4 sub-lane)**: verify value.js's CW-readiness:
  - Zero hard `dist/` aliases for `@mkbabb/*` siblings (already verified at D.W1).
  - `peerDependencies` declarations are correct (only `parse-that` currently; check if any `@mkbabb/*` should be peer-dep).
  - `siblingFsAllowTransient` removed (E.W0).
  - The contract-v2 publisher half stays green (post-E.W1 changes don't violate).
```

The §4 update authored in §3 below appends a "CW-readiness verdict" subsection while preserving the existing scaffold above.

---

## §2 — Per-check verdict

### D.1 — Hard `dist/` aliases for `@mkbabb/*` siblings in `vite.config.ts`

**Verdict**: **NONE** (re-verified at HEAD `4dbe5c48`).

Evidence — `grep -n 'dist/\|@mkbabb/' vite.config.ts`:

| Line | Match | Type |
|---|---|---|
| 31  | `// The symlinked \`@mkbabb/glass-ui\` ships its own nested \`vue\` in` | comment |
| 41  | `// bare \`@mkbabb/*\` specifiers resolve through the sibling's \`exports\` map to` | comment |
| 42  | `// \`dist/\` via the \`file:\` symlink in \`node_modules\`; the sibling's` | comment |
| 43  | `// \`build:watch\` keeps \`dist/\` fresh under dev-orchestration. Consumer-side` | comment |
| 56  | `//   \`./styles.css\` — SFC-scoped compiled (dist/glass-ui.css): data-v-* scoped` | comment |
| 62  | `// are resolved RELATIVE to \`node_modules/@mkbabb/glass-ui/src/styles/\` — i.e.` | comment |
| 69  | `// font binaries as base64 data URLs in \`dist/glass-ui.css\` and exporting the` | comment |
| 96  | `external: ["vue", "@mkbabb/parse-that"],` | rollup `external` (library-build externals — not a Vite resolve.alias) |
| 112 | `outDir: path.resolve(import.meta.dirname, "./dist/hero-lab"),` | demo build output dir — not a resolve.alias |
| 138 | `outDir: path.resolve(import.meta.dirname, "./dist/gh-pages"),` | demo build output dir — not a resolve.alias |

Every match is either a comment, a rollup `external` (correct posture — `parse-that` should be marked external for library builds), or a `build.outDir` declaration (orthogonal to module resolution). **Zero hard `@mkbabb/*` → `dist/` aliases exist**, and `proof:resolution` confirms this via the consumer-half check (`scanViteConfigForDistAliases` returned zero hits for value.js).

The consumption of `@mkbabb/glass-ui` is via the `devDependencies` entry `"@mkbabb/glass-ui": "file:../glass-ui"`, resolved by Vite's module resolution through the sibling's `exports` map per contract-v2 §2.4. Under CW, this becomes `"workspace:^"`; the resolution semantics are equivalent (the alias mechanism is not used in either case).

### D.2 — `peerDependencies` audit (the `parse-that` decision)

**Verdict**: **STAY AS RUNTIME DEPENDENCY.** Do NOT promote `parse-that` to a peer-dep at E.W4.

Survey of `parse-that` consumption across the constellation:

| Repo | parse-that pin | Declaration block | Site |
|---|---|---|---|
| value.js | `^0.8.2` | `dependencies` | `src/parsing/{math,units,stylesheet,index,utils,color}.ts` (8+ import sites) |
| keyframes.js | `^0.8.1` | `dependencies` | runtime consumer (per keyframes.js `package.json` line 53) |
| glass-ui | — | — | not a consumer |
| fourier-analysis | — | — | not a consumer (consumes value.js's `easings` only — 5 files) |
| bbnf-buddy | — | — | not a consumer |
| words | — | — | not a consumer |
| speedtest | — | — | not a consumer |

**Two consumers exist** — value.js (`0.8.2`) and keyframes.js (`0.8.1`). Both currently have their own physical copy in `node_modules/@mkbabb/parse-that/` (verified — keyframes.js's nested copy is at `0.8.1`, value.js's is at `0.8.2`). Under CW Phase-2:

- **pnpm workspace hoist**: the content-addressed store deduplicates by version. Since `^0.8.1` (keyframes.js) accepts `0.8.2`, and `^0.8.2` (value.js) requires `>=0.8.2`, both would resolve to a SINGLE hoisted `0.8.2` install. Peer-dep declaration is NOT REQUIRED for this dedup — pnpm's resolution algorithm achieves it via range overlap alone.
- **npm flat hoist** (pre-workspace state): npm hoists one copy to the top-level `node_modules` and nests duplicates where ranges diverge. Currently both copies exist nested because the `file:` linking does not deduplicate across symlinked repos.

**Why NOT promote to peer-dep at E.W4**:

1. **value.js is a published library** (`@mkbabb/value.js@0.6.0` on npm registry, per `D FINAL §close-tag v0.6.0 @ 7ac4ecc`). Peer-dep migration is a BREAKING CHANGE for npm-registry consumers — they would need to add `parse-that` to their own `dependencies` block to satisfy the peer requirement. **fourier-analysis is a registry consumer** of `@mkbabb/value.js@^0.4.6` (per `coordination/Q.md §6`); promoting `parse-that` to peer-dep would silently require fourier-analysis to add the dep too — a silent-break repeat of the v0.6.0 `lerp` arg-order silent-break (`§5.1` filing).
2. **Workspace dedup happens REGARDLESS of peer-dep declaration**. The peer-dep posture is the cleaner npm-publish posture (declares intent: "I expect my consumer to provide this") but is not a CW-prerequisite. The CW seed does NOT prescribe peer-dep promotion in either `CW.md` or `seed-references.md`.
3. **Per dispatch contract's hard cap**: "If peer-dep migration is proposed AND there's even a small risk of breaking the demo (e.g., a dev tool depends on parse-that being a runtime dep), STAY AS RUNTIME and route the question forward." — registry-consumer breakage (fourier-analysis) is exactly this category of risk.

**Routed forward**: a future tranche may revisit peer-dep promotion as part of a v0.7.0 (or v1.0.0) breaking-change wave WITH the consumer migrations (fourier-analysis + keyframes.js) coordinated. This belongs in a "library API consolidation" tranche, NOT in E.W4 Lane D's CW-readiness gate.

### D.3 — `siblingFsAllowTransient` posture

**Verdict**: **NARROWED, not retired.** Posture matches E.W0 Lane A's filing.

Re-confirmed at HEAD `4dbe5c48` — `vite.config.ts:47-74` carries the rationale comment block; `vite.config.ts:74` declares:

```ts
const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];
```

…used in two `server.fs.allow` sites (`hero-lab` mode `:120`; default dev mode `:162`). Per the comment-block reasoning + E.W0 Lane A's audit (`audit/E.W0-lane-a-styles-adoption.md`):

- The SFC-scoped half of contract-v2 §2.1 keystone gap is **CLOSED** by glass-ui `9275584`'s `./styles.css → dist/glass-ui.css` ship.
- The Tailwind-source `./styles` import in `demo/@/styles/style.css` still consumes glass-ui's `src/styles/index.css`, which carries `@font-face` declarations whose `url("../fonts/fira-code/...woff2")` references resolve OUT of `node_modules/@mkbabb/glass-ui/src/styles/` into the symlinked repo's `fonts/` directory. THAT walk is what `siblingFsAllowTransient` permits.
- Retirement requires glass-ui inlining font binaries as base64 in `dist/glass-ui.css` (filed as a glass-ui-side successor concern per `coordination/Q.md §3` row 7).

**CW interaction**: under CW Phase-2's workspace overlay, glass-ui's source files are resolved by pnpm to a hoisted path (`constellation/node_modules/@mkbabb/glass-ui/`), and the relative `url("../fonts/...")` walk resolves INSIDE that hoisted tree (not OUT through a symlink). **`siblingFsAllowTransient` becomes structurally unnecessary under CW** — it is a `file:`-symlink-era carve-out that retires automatically when the symlink retires. No E.W4 Lane D action required; the carve-out is benign and will fall away with the CW flip.

### D.4 — Contract-v2 publisher half (proof:resolution gate)

**Verdict**: **GREEN.**

Evidence — `npm run proof:resolution` at HEAD `4dbe5c48`:

```
[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation
```

Sub-checks (per `scripts/proof-resolution-contract.mjs`):

- **Publisher exports shape** (`exports["."]` declares 3-key `types/import/default`): PASS for value.js + glass-ui + keyframes.js.
- **Forbidden `development` condition** (collected recursively across the whole `exports` map): ABSENT for all 3 publishers.
- **`build:watch` script** (contract-v2 §2.3): PRESENT in value.js + glass-ui + keyframes.js `package.json:scripts`.
- **Consumer hard-`dist/`-alias scan** across 7 consumer Vite configs: ZERO violations.

`package.json:exports["."]` at HEAD:

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/value.js",
    "default": "./dist/value.js"
  }
}
```

**Note on the `types` target**: the dispatch contract's expected-shape stanza names `./dist/value.d.ts`, but value.js's `vite-plugin-dts` emits the type declarations rooted at `dist/index.d.ts` (the entry is `src/index.ts`). This is a NON-VIOLATION — `proof:resolution` checks the SHAPE (3-key, no `development`), not the specific filename, and `dist/index.d.ts` exists + is the canonical type entry (matches `package.json:types`). The contract-v2 publisher half is GREEN whether the file is `index.d.ts` or `value.d.ts`; renaming is purely cosmetic and out of scope for E.W4 Lane D.

`npm run build` at HEAD: CLEAN (33 modules transformed; `dist/value.js` 141.47 kB; `dist/index.d.ts` regenerated by `vite-plugin-dts` in 1758 ms).

### D.5 — `default` export key under CW's workspace-resolution

**Verdict**: **`default` points at `./dist/value.js`** — VERIFIED.

Per contract-v2 (`docs/precepts/cross-repo-dev-resolution.md §2.1`), the terminal fallback under any unmatched condition stack is the `default` key. Under CW's workspace-resolution (when value.js is consumed via `workspace:^` instead of `file:../`), the consumer Vite resolves through value.js's `exports["."]` map:

- ESM-mode imports (e.g. demo + glass-ui + keyframes.js): match `import` → `./dist/value.js`.
- Type-only imports (TS): match `types` → `./dist/index.d.ts`.
- Anything else: match `default` → `./dist/value.js`.

**No `default → src/` resolution path exists.** This was the contract-v1 → contract-v2 inversion at value.js D.W1 (per `D FINAL §2 D.W1 L1-L5`): the `development` condition that resolved sibling `src/` directly has been abrogated; all conditions terminally point at `dist/value.js`.

**Operational implication for CW Phase-2**: the workspace consumer (demo / keyframes.js / fourier-analysis) imports the bundled `dist/value.js`, NOT source-mode value.js. Under workspace-resolution, dev-orchestration relies on value.js's `build:watch` script keeping `dist/` fresh (per contract-v2 §2.3 — `proof:resolution` D.4 confirms presence). The dev-mode UX is identical between `file:` and `workspace:^`.

If a future need arose to consume source-mode value.js (e.g. for IDE jump-to-source), the consumer would explicitly use a `"@mkbabb/value.js/src/*"` subpath, NOT the `default` key. Today no such subpath is declared in value.js's `exports` map (only the root entry); the consumer surface is the bundled `dist/` and only the bundled `dist/`.

### D.6 — Q.md §4 update authoring

**Verdict**: PROPOSED text below (§3). Lane D does NOT write `coordination/Q.md` directly per the dispatch contract's hard cap — the orchestrator integrates this update atomically (E.W4 may also fold Lane E + Lane F changes into Q.md).

---

## §3 — Proposed Q.md §4 update

The orchestrator should APPEND the following block to `docs/tranches/E/coordination/Q.md §4` (after the existing scaffold ending with the "E preparation (E.W4 sub-lane)" bullets at line ~68):

```markdown
### CW-readiness verdict (E.W4 Lane D — read-only)

**Verdict**: **READY.**

| Check | Result |
|---|---|
| D.1 — Zero hard `dist/` aliases for `@mkbabb/*` in `vite.config.ts` | PASS (re-verified at HEAD `4dbe5c48`; all `dist/` mentions are comments, rollup `external`, or `build.outDir`) |
| D.2 — `parse-that` peer-dep migration | **STAY-AS-RUNTIME**. Two consumers (value.js `^0.8.2`, keyframes.js `^0.8.1`); pnpm workspace hoist deduplicates by range overlap regardless of peer-dep declaration. Promoting to peer-dep is a BREAKING CHANGE for `@mkbabb/value.js@^0.4.6`'s registry consumer (fourier-analysis) and is out of E.W4 scope. Filed forward as a v0.7.0+ "library API consolidation" candidate (coordinated with consumer migrations). |
| D.3 — `siblingFsAllowTransient` posture | **NARROWED** at E.W0 Lane A (font-asset resolution only). Structurally retires under CW Phase-2 — workspace overlay hoists glass-ui's `src/styles/` inside `constellation/node_modules/`, so the `url("../fonts/...")` walk resolves inside the hoisted tree rather than escaping a `file:` symlink. No E.W4 action; the carve-out falls away with the CW flip. Glass-ui-side font-inlining (filed §3 row 7) accelerates retirement but is not on CW's critical path. |
| D.4 — Contract-v2 publisher half (`proof:resolution`) | **GREEN** at HEAD `4dbe5c48`. 3-key shape (`types/import/default`); zero `development` condition keys; `build:watch` script present. `dist/index.d.ts` is the canonical types target (vite-plugin-dts emits from `src/index.ts`); per-D.4 §2 this is shape-compliant — the contract checks 3-key + forbidden-key, not the specific filename. |
| D.5 — `default` export key under workspace-resolution | **POINTS AT `./dist/value.js`** — verified. Under CW Phase-2 (`workspace:^` in demo + keyframes.js + fourier-analysis), the consumer resolves through `exports["."]` to `dist/value.js`; dev-orchestration relies on `build:watch` keeping `dist/` fresh (D.4 confirms presence). No `default → src/` resolution path exists; the contract-v1 `development` condition was abrogated at D.W1. |

**When CW Phase-2 reaches value.js**, the only change required is a 1-line `package.json` edit: `"@mkbabb/glass-ui": "file:../glass-ui"` → `"@mkbabb/glass-ui": "workspace:^"` in `devDependencies` (demo-side dep). The library publisher half (`exports`, `types`, `default`, `build:watch`) stays green; the consumer-half `vite.config.ts` requires no edits; `siblingFsAllowTransient` retires structurally with the symlink retirement.

**Sequencing reminder** (per A4 §5.1 option 2 + `coordination/Q.md §4`): value.js is FLIPPED LAST in CW Phase-2, after Phase-0 quiescence (fourier-analysis dirty-tree gate) clears and the per-member opt-in cadence reaches value.js.

**Filed at**: 2026-05-20 (E.W4 Lane D).
**Evidence**: `docs/tranches/E/audit/E.W4-lane-d-cw-readiness.md`.
```

---

## §4 — Files modified

- **`docs/tranches/E/audit/E.W4-lane-d-cw-readiness.md`** (this file) — NEW, authored by Lane D.
- **`docs/tranches/E/coordination/Q.md`** (§4 update) — proposed text in §3 above; **orchestrator integrates** (E.W4 may fold Lane E + Lane F changes into the same Q.md write).
- **`package.json`** — NO CHANGES. The peer-dep migration audited at D.2 is STAY-AS-RUNTIME (rationale: registry-consumer breakage risk; CW workspace hoist achieves dedup without peer-dep declaration).

---

## §5 — E.W4 Lane D sub-gate verdict

**PASS.**

All 5 verification checks PASS:
- D.1 — zero hard `dist/` aliases: ✓
- D.2 — peer-dep audit complete with STAY-AS-RUNTIME verdict (rationale recorded): ✓
- D.3 — `siblingFsAllowTransient` posture confirmed NARROWED + structurally-retires-under-CW: ✓
- D.4 — `proof:resolution` GREEN; `npm run build` CLEAN: ✓
- D.5 — `default` export key resolves to `dist/value.js`: ✓

**CW-readiness**: value.js as CONSUMER is READY for CW Phase-2's `workspace:^` flip whenever speedtest's CW W0 dispatches and Phase-0 quiescence (fourier-analysis 109-dirty-file blocker) clears. No further value.js-side preparation is required.

**Cross-repo writes**: zero (Lane D is READ-ONLY against the speedtest CW seed by dispatch contract).
