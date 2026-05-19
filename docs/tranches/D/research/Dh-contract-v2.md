# Dh — Contract-v2 + cross-repo fleet alignment

**Tranche**: value.js D (planning). **Lane**: Dh.
**Mode**: research, read-only. No `src/` edits, no commits, no submodule bumps.
**Scope**: invariant-30 contract-v2 alignment for value.js + fleet-wide precept
SHA convergence. Quotes the canonical contract from glass-ui `ce5aad8` (v1.9.3,
2026-05-19) and `glass-ui:docs/precepts@68d9b20` and maps it onto value.js's
current state at `master` HEAD `70e61e9`.
**Inputs read** (read-only):
- glass-ui repo at `/Users/mkbabb/Programming/glass-ui` — commit `ce5aad8`
  (the contract-v2 publisher edit) and the precept submodule pointer it
  advances (`3c32fae → 68d9b20`).
- glass-ui's pinned precept text at `glass-ui/docs/precepts/cross-repo-dev-resolution.md`
  (the rewritten v2 edict).
- keyframes.js repo at `/Users/mkbabb/Programming/keyframes.js` — HEAD `0909177`
  (already contract-v2 compliant; the audit's quoted `19d1a1b` snapshot is
  stale).
- value.js at `master` HEAD `70e61e9` — `package.json:23-28`, `vite.config.ts`,
  `docs/precepts/` pinned at `3c32fae`.
- value.js's own pinned precept text at
  `docs/precepts/cross-repo-dev-resolution.md` (the v1 edict — what value.js
  thinks the contract is) and the v1 `scripts/proof-resolution-contract.mjs`
  via the glass-ui git history at `git -C glass-ui show ce5aad8^:scripts/proof-resolution-contract.mjs`.
- `docs/tranches/B/audit/B.W3-library-gap.md §4` and
  `docs/tranches/B/coordination/Q.md §6/§9` (the prior filings this lane
  refreshes).

**Inheritance**: this doc refreshes — does not supersede — the contract-v2
recommendation already on file at `B/audit/B.W3-library-gap.md §4.2-§4.3`
(which named contract-v2 and listed the value.js-side changes) and the
keyframes.js-pin desync filing at `B/coordination/Q.md §9`. The B-side filings
were *recommendation-only* and *stale-snapshot* respectively; this lane re-reads
both at HEAD and produces an executable Dh-wave shape.

---

## §1 — Contract-v2 specification (from glass-ui `ce5aad8` + `precepts@68d9b20`)

### §1.1 — One-sentence statement

> Consumers resolve `dist/`, dev and prod alike; every `@mkbabb/*` publisher
> exposes a `build:watch` script, and consumer dev-orchestration spawns the
> siblings' watch-builds so that `dist/` is always fresh.

(`precepts@68d9b20:cross-repo-dev-resolution.md §1.2`.)

### §1.2 — Publisher half (the 3-key shape)

Every `@mkbabb/*` `package.json` `exports["."]` MUST declare exactly these
three keys, in this order — and MUST NOT declare a `development` key
**anywhere** in its `exports` map (root or subpath):

```jsonc
"exports": {
  ".": {
    "types":   "./dist/<name>.d.ts",
    "import":  "./dist/<name>.js",
    "default": "./dist/<name>.js"
  }
}
```

The `default` terminal key STAYS — it is contract-v1's one durable
contribution and is orthogonal to the abrogated condition. Subpath exports
collapse to `{ types, import }` (no `default` needed — subpaths are import-only
and have no `require` surface). value.js has no subpaths today; the root rule
is the only one that bites.

### §1.3 — Consumer half — STRUCK

Both contract-v1 consumer obligations are deleted under v2:

- **No `resolve.conditions: ["development", …]`.** With the `development` key
  gone from every publisher, the condition resolves nothing. `["module",
  "browser", "default"]` is the standard browser-target order; even those
  three can be omitted because they are Vite's defaults.
- **No `server.fs.allow` widening for sibling `src/`.** The `/@fs/` channel
  was needed only to serve a sibling's `src/`-relative assets when the
  `development` branch resolved into `src/`. `dist/` lives inside `node_modules`
  via the `file:` symlink — already inside Vite's default allow-list. An
  `fs.allow` entry that exists *solely* to reach a sibling `src/` is removed.
  An `fs.allow` entry that serves a genuine non-sibling purpose stays.

### §1.4 — The watch-build contract (§2.3)

Resolving `dist/` is only correct if `dist/` is fresh. Contract-v2 makes
freshness structural:

1. **Every `@mkbabb/*` publisher MUST declare a `build:watch` script.** The
   canonical form is an incremental Vite library build in watch mode that
   inherits the cold build's heap ceiling:
   ```jsonc
   "build:watch": "NODE_OPTIONS=--max-old-space-size=8192 vite build --watch"
   ```
2. **Every workspace consumer's dev orchestration spawns the siblings'
   watch-builds**, gated *before* the consumer's own dev server starts, so the
   first page load already resolves a fresh `dist/`. (This is the consumer
   side; value.js's own demo-dev-orchestration story for spawning glass-ui's
   `build:watch` is out of scope for this lane — see §5.4.)

### §1.5 — Prohibitions (carried forward from v1, unchanged)

- No hard `dist/` alias for any workspace sibling.
- No self-aliasing a package's own published name.
- No hoisting a transitive sibling into a grandparent's `devDependencies`.
- No checked-in `dist/` artefact as a tracked resolution target.
- No shared `outDir` between library and demo builds (`emptyOutDir: true`
  would destroy the library artefact).

### §1.6 — Enforcement gate (rewritten in `ce5aad8`)

`glass-ui/scripts/proof-resolution-contract.mjs` is **inverted**:

- `REQUIRED_EXPORT_KEYS = ["types", "import", "default"]`.
- `FORBIDDEN_EXPORT_KEY = "development"` — the gate now **forbids** anywhere
  in any `exports` map (root or subpath) the key it once *required*.
- `REQUIRED_PUBLISHER_SCRIPT = "build:watch"` — a new third check.
- Consumer `dist/`-alias text-scan is retained.

The gate is registered in the constellation list with three publishers
(`glass-ui`, `keyframes.js`, `value.js`) and seven consumers (those three plus
`fourier-analysis/web`, `bbnf-buddy`, `words/frontend`, `speedtest`). Under v2
the gate is GREEN for glass-ui at `ce5aad8` and now GREEN for keyframes.js at
its `0909177` migration; value.js is the last `@mkbabb/*` publisher still RED
against the v2 inversion.

### §1.7 — Invariant 30, redefined in-place

Per invariant 28 (no permanent-defer) and Q's "every invariant ships its gate
in the same wave that names it" principle, invariant 30 is **redefined in-place,
not renumbered and not retired** (`precepts@68d9b20:cross-repo-dev-resolution.md §4`):

> Every `@mkbabb/*` package's `exports` map resolves only `dist/` (the 3-key
> `types`/`import`/`default` shape; no `development` branch). Every
> `@mkbabb/*` publisher declares a `build:watch` script, and every workspace
> consumer's dev orchestration spawns the siblings' watch-builds, so `dist/`
> is always fresh. Consumers resolve `dist/` in dev and prod alike — one
> resolution, no `development` condition, no sibling-`src/` `fs.allow`
> widening. The fail-closed gate `scripts/proof-resolution-contract.mjs`
> asserts the `development` key is ABSENT, asserts `build:watch` is PRESENT,
> and bans `dist/` aliases.

### §1.8 — Per-repo migration map (from the precept, §5)

| Repo | Migration | Wave | Status at this lane |
|---|---|---|---|
| **glass-ui** | Delete `development` from `exports["."]` + 41 subpaths; add `build:watch`; bump v1.9.2→v1.9.3; drop `development` from `resolve.conditions` + the sibling-`src/` `fs.allow` widening | AG glass-ui-core | **DONE** at `ce5aad8` |
| **keyframes.js** | Delete `development` from `exports["."]`; add `build:watch`; drop `development` from `devConditions` + the `fs.allow` widening | AG-GU0 | **DONE** at `0909177` (already a watch-build script and the 3-key shape — the audit's `19d1a1b` snapshot is stale) |
| **value.js** | Delete `development` from `exports["."]` (the `default` key stays); add `build:watch`; drop `development` from `demoConditions` + the `fs.allow` widening — *"handoff, multi-writer repo"* per the precept | AG-GU0 | **PENDING** — this lane's target |
| (leaf consumers) | drop `development` from `resolve.conditions`; trim `fs.allow`; add `optimizeDeps.include` for resolved `dist/` entries | AG-GU2 | out of scope here |

The precept's "value.js handoff, multi-writer repo" tag acknowledges that
value.js is an independently-tranched repo whose changes pass through its own
plan-then-execute pipeline rather than a glass-ui-side write. Dh is that
plan-side artefact.

---

## §2 — value.js — required changes to reach contract-v2

### §2.1 — Current state (HEAD `70e61e9`, on branch `w.w2.1-value-js-prebuild`)

`package.json` `exports["."]` (lines 22-28) — **contract-v1 4-key shape**:

```json
"exports": {
    ".": {
        "development": "./src/index.ts",
        "types": "./dist/index.d.ts",
        "import": "./dist/value.js",
        "default": "./dist/value.js"
    }
}
```

`vite.config.ts` (lines 41-50) — **contract-v1 consumer half** (the demo-mode
consumer of the *sibling*, not value.js's own publish-side):

```ts
// Demo build modes (dev, gh-pages, hero-lab) resolve sibling `@mkbabb/*`
// packages through their `development` conditional export so the demo always
// consumes the siblings' `src/` and never a stale `dist/`. This is scoped to
// the demo modes only — the `production` library build keeps Vite's default
// conditions so it resolves to published `dist/` artefacts.
const demoConditions = ["development", "module", "browser"];

// The demo reaches assets (fonts) inside symlinked sibling packages that live
// outside value.js's root. `fs.allow` must cover the shared parent directory
// or Vite's dev server denies them with a 403.
const demoServerFsAllow = [path.resolve(import.meta.dirname, "..")];
```

`demoConditions` is applied in three serve-mode branches (`hero-lab`,
`gh-pages`, the default dev mode) at `vite.config.ts:84,108,133`.
`demoServerFsAllow` is applied to two serve blocks (`hero-lab`, default dev)
at `vite.config.ts:90,135`. `gh-pages` does not currently widen `fs.allow`.

`package.json` `scripts` block has no `build:watch` (lines 31-40 declare
`dev`, `dev:hero-lab`, `build`, `build:hero-lab`, `gh-pages`, `prepare`,
`typecheck`, `test`, `test:e2e`).

`docs/precepts` submodule pin: `3c32fae` (the v1 codification — the same SHA
the `cross-repo-dev-resolution.md` quoted in §2.2 here was read from).

**Net status against the v2 gate**: value.js fails the inverted publisher
exports check (`development` key present), fails the watch-build check (no
`build:watch`), passes the no-`dist/`-alias check (the `@src` etc. aliases
key on demo paths, not `@mkbabb/*`). It is the last `@mkbabb/*` publisher
holding contract-v1 shape.

### §2.2 — The minimal edit list (planning-only — not applied here)

#### §2.2.a — `package.json` (2 hunks, both small)

1. **Delete the `development` key** from `exports["."]`. The map collapses
   to the contract-v2 3-key shape:
   ```jsonc
   "exports": {
     ".": {
       "types":   "./dist/index.d.ts",
       "import":  "./dist/value.js",
       "default": "./dist/value.js"
     }
   }
   ```
2. **Add the `build:watch` script** in `scripts`. value.js's `build` is
   `vite build --mode production`; the canonical watch form is the same
   command with `--watch`, but value.js's existing `build` does not carry a
   heap-bumped `NODE_OPTIONS` (glass-ui's does; keyframes.js's does). value.js's
   library bundle is far smaller than glass-ui's — no heap ceiling is needed.
   The proposed line is:
   ```jsonc
   "build:watch": "vite build --mode production --watch"
   ```
   This matches keyframes.js's `build:watch` form (also no `NODE_OPTIONS`).
3. **Version bump**: contract-v2 is a public-surface change (a resolution
   condition is removed). value.js is `0.5.1`; the bump is a judgement call
   (`0.5.1 → 0.5.2` patch is defensible — value.js's consumed surface in
   sibling repos is the bare module specifier, which does not change). The
   D-wave plan can elect either; glass-ui's `v1.9.2 → v1.9.3` precedent is
   "minor public-surface change → patch bump."

#### §2.2.b — `vite.config.ts` (the demo-consumer half)

value.js's `vite.config.ts` is itself a *consumer* of `@mkbabb/glass-ui` and
`@mkbabb/keyframes.js` (its demo modes resolve these sibling packages). Under
v2 the consumer half of those resolutions is struck:

1. **Delete `demoConditions = ["development", "module", "browser"]`** (line
   45) — or collapse it to its no-op residue `["module", "browser"]` and
   delete the `resolve.conditions` line entirely. Vite's defaults already
   contain `module`/`browser`/`default` for the browser target. The cleanest
   shape is to drop `demoConditions` and remove all three of its callsites
   (`hero-lab:84`, `gh-pages:108`, dev:133).
2. **Delete `demoServerFsAllow`** (line 50) and its two callsites
   (`hero-lab:90`, dev:135) — *provided* the only purpose of widening
   `fs.allow` to the workspace parent was reaching sibling `src/`. The
   comment at lines 47-49 says "demo reaches assets (fonts) inside symlinked
   sibling packages." If those assets were imported from a sibling's `src/`
   tree (under v1), they will now be inside the sibling's `dist/` (or are
   served by the sibling's own build pipeline). A careful audit is needed:
   if any demo `<link>` or `import` reaches into `../glass-ui/<path>/`
   directly (i.e. not through a bare specifier), the `fs.allow` entry stays.
   Initial scan (`grep -rn '\\.\\./' demo/`) is recommended at execution
   time; under the contract-v2 spec the expected outcome is "no such
   imports remain, the widening can go."
3. **Rewrite the explanatory comment** (lines 39-44, 47-49) to describe the
   v2 contract: bare `@mkbabb/<pkg>` specifiers resolve through the
   sibling's `exports` map to `dist/`; the sibling's `build:watch` keeps
   `dist/` fresh; consumer-side `resolve.conditions` is no longer needed.

The `production` library-build branch (lines 56-77) is untouched by v2 — it
already resolves siblings via Vite's default conditions and treats them as
externals.

#### §2.2.c — `docs/precepts` submodule bump

Advance value.js's `docs/precepts` pin from `3c32fae` to the post-v2 SHA. The
glass-ui-side bump in `ce5aad8` lands the precept at `68d9b20` (the rewritten
contract-v2 text). value.js follows. This is the same one-line submodule
update glass-ui did in its commit.

#### §2.2.d — `scripts/proof-resolution-contract.mjs` (NEW FILE — port from glass-ui)

value.js has **no `scripts/` resolution gate today** (`scripts/` holds only
`generate-favicon.mjs`). Glass-ui's gate at `ce5aad8` is a 364-line ESM script
that runs over the whole constellation — but it is *centred at glass-ui's
root* (it computes `ROOT = resolve(fileURLToPath(new URL("../", …)))` then
walks siblings). The contract's `proof-resolution-contract.mjs` is a fleet
gate, intended to run once from any `@mkbabb/*` repo's root and assert the
whole constellation.

Two porting options for value.js:

- **Port verbatim** — copy `glass-ui/scripts/proof-resolution-contract.mjs`
  to `value.js/scripts/proof-resolution-contract.mjs` unchanged (the
  `ROOT`/`PARENT` paths resolve identically from any sibling's `scripts/`
  dir). Add `"proof:resolution": "node scripts/proof-resolution-contract.mjs"`
  to `package.json` `scripts`. The gate then asserts the same constellation
  invariants from value.js as it does from glass-ui — symmetric coverage.
  Maintenance: drift hazard. If glass-ui updates the gate (e.g. to add a
  new publisher), the value.js copy goes stale.
- **Defer porting** — rely on glass-ui's gate alone. The constellation has
  one canonical gate; running it from value.js's CI is unusual when
  glass-ui's CI already runs it. Loses defence-in-depth: a value.js-only
  regression that lands on a glass-ui branch where the gate is not running
  is unattributable until a glass-ui CI run later picks it up.

**Recommendation: port verbatim**, with a one-line top-of-file comment naming
glass-ui's `scripts/proof-resolution-contract.mjs` as the upstream source and
the SHA from which value.js's copy was last sync'd. Add a `proof:resolution`
script in `package.json`. This matches the precept's section-3 framing that
the gate is "exposed as `npm run proof:resolution` in glass-ui's package.json"
and lets value.js's own CI catch v2 violations without round-tripping through
glass-ui's pipeline. The value.js D-wave can also add the gate to value.js's
GitHub Actions workflow (a single `npm run proof:resolution` line — see §5).

Sketch of what the gate checks when run from value.js (identical to glass-ui's):

1. **Publisher exports shape (×3 repos)** — `glass-ui`, `keyframes.js`,
   `value.js` each declare the 3-key `exports["."]` shape; no `development`
   key anywhere in any `exports` map.
2. **Watch-build presence (×3 repos)** — each publisher `package.json`
   declares a `build:watch` script.
3. **Consumer `dist/`-alias scan (×7 repos)** — each consumer Vite config
   has no `resolve.alias` keyed on `@mkbabb/*` with a `dist/` value.

The script exits 0 clean, exits 1 with violation list naming the repo, file,
and (when applicable) line number.

### §2.3 — What value.js does NOT change

These are intentionally *not* in the v2-alignment edit set:

- `tsconfig.json`'s `vue` / `@vue/*` hard aliases (load-bearing —
  single-Vue-instance dedupe; see `B.W3-library-gap.md §5/K2`).
- `vitest.config.ts`'s minimal `@src` alias set (correct for the test
  surface; see `B.W3 §5/K3`).
- The library build's `external: ["vue", "@mkbabb/parse-that"]` — unchanged
  by v2 (v2 governs *resolution* of siblings, not whether they bundle).
- The `production` library mode's resolution config — already correct under v2.
- Any of the unrelated B.W3 finds (G1 barrel exports, K5 `solveCubicBezierX`
  export, etc.) — those are independent waves.

---

## §3 — Precept-side fix — Dh's verdict

### §3.1 — value.js's pinned precept (at `3c32fae`) is now stale

value.js's `docs/precepts/cross-repo-dev-resolution.md` describes contract-v1:
the 4-key publisher shape with `development` first (lines 47-58 of the v1
edict), the consumer half requiring `resolve.conditions: ["development", …]`
and `server.fs.allow` widening (lines 102-130), the gate that requires the
4-key shape (lines 156-160). Every one of those clauses has been **rewritten
in-place** in `glass-ui:docs/precepts@68d9b20` to v2 shape (publisher 3-key,
consumer half struck, watch-build contract added, gate inverted to forbid
what it once required).

The fix is **not** "write a new precept": the canonical document is the same
file (`cross-repo-dev-resolution.md`), the canonical invariant is the same
number (30), the canonical owner is the same repo (glass-ui). The fix is the
**submodule bump** from `3c32fae` to `68d9b20`, which moves value.js's view of
the precept onto the v2 text.

The corresponding entry in `precepts@3c32fae:instructions/LESSONS-LEARNED.md:584`
(quoted in §1.7 of this doc) names the v1 contract verbatim. After the bump,
`LESSONS-LEARNED.md` at `68d9b20` carries the v2 redefinition. The lesson
entry is not a separate fix — it moves with the submodule.

### §3.2 — Should there be a NEW invariant 34 codifying contract-v2?

No. The precept's §4 explicitly addresses this:

> Per invariant 28 (no permanent-defer) and Q's own §4.3 principle — *every
> invariant that addresses a recurring anti-pattern MUST ship its gate in the
> same tranche* — the invariant is **redefined in-place**, not renumbered and
> not retired.

Adding "invariant 34: contract-v2" alongside an unchanged "invariant 30:
contract-v1" would create exactly the duplication invariant 28 forbids: two
invariants for one rule, with the older one carrying a now-incorrect contract.
The precept's chosen path is to keep invariant 30 the canonical citation and
update its definition; consumers cite "invariant 30 (contract-v2)" with the
clause distinguishing it from "invariant 30 (contract-v1)." value.js's
in-tranche references already use this form (`B.W3 §4.2`: "stale relative to
glass-ui's contract-v2"; `B coordination §6`: "Invariant 30 — cross-repo
dev-resolution contract").

### §3.3 — Fleet-wide precept SHA convergence

As of this lane the precept submodule sits at three SHAs across three repos:

| Repo | Precept pin | Status |
|---|---|---|
| glass-ui | `68d9b20` (post-v2) | head of line — owns the precept |
| keyframes.js | `458c2d1` (a contract-v1-era SHA, off-target) | needs convergence |
| value.js | `3c32fae` (the v1 codification SHA) | needs convergence to `68d9b20` |

The fleet-target SHA is `68d9b20`. value.js D bumps its pin in the same wave
that lands the §2.2 `package.json`/`vite.config.ts` edits. keyframes.js
converges on its own schedule — see §4.

### §3.4 — Flag (fleet-wide precept-update recommendation)

The B.W3 audit recommended a fleet-wide precept update; this lane confirms it
is **already done** on glass-ui's side at `68d9b20`. Nothing further is needed
at the precept level; value.js and keyframes.js each pull the existing v2
text by advancing their submodule pin. No precept *rewrite* is open work — only
the SHA bumps.

---

## §4 — keyframes.js convergence — refresh `coordination/Q.md §9`

### §4.1 — What `B coordination/Q.md §9` said (as of 2026-05-19, B-close)

> The shared `docs/precepts` submodule is at three SHAs: value.js `3310a8c`
> (→ `3c32fae` at B.W0), keyframes.js `458c2d1`, glass-ui `3c32fae` (fleet
> HEAD). The fleet target is `3c32fae`; keyframes.js's pin is off-target —
> filed; keyframes.js converges on its own schedule. B does not block.

That filing is correct in its *direction* (keyframes.js's pin is off-target,
file the request, don't block) but **stale on two facts** at the Dh read:

1. The fleet HEAD has advanced from `3c32fae` (the v1 codification) to
   `68d9b20` (the v2 codification). Both keyframes.js and value.js are
   off-target with respect to the *new* fleet HEAD.
2. **keyframes.js's `package.json` is already contract-v2 compliant.** HEAD
   `0909177` (commit message: "build: abrogate `development` export
   condition — contract-v2 (AG-GU0.L-a)") ships the 3-key `exports["."]`
   shape, a `build:watch` script (`vite build --watch --mode production`),
   and a `vite.config.ts` whose `devConditions` are `["module", "browser",
   "default"]` with the `fs.allow` widening retired. The audit's quoted
   `keyframes.js HEAD = 19d1a1b` is the immediately-prior commit; the
   `458c2d1` precept pin is a snapshot of when keyframes.js *last* updated
   its submodule, not its current code-side state.

So the actual state at Dh open is:

| Repo | Code-side contract-v2? | Precept submodule pin | Filed convergence ask |
|---|---|---|---|
| glass-ui | YES (`ce5aad8`) | `68d9b20` (v2) | none — head of line |
| keyframes.js | YES (`0909177`) | `458c2d1` (v1-era; off-target) | **REFRESH** — precept-pin convergence only; the code-side migration is done |
| value.js | NO | `3c32fae` (v1) | this lane (Dh) targets both |

### §4.2 — The refreshed filing for keyframes.js

The previous file at `B coord §9` should be re-stated as a *one-action ask*
to keyframes.js, not a two-action one:

> keyframes.js — at HEAD `0909177` your `package.json` and `vite.config.ts`
> are already contract-v2 compliant (3-key `exports["."]`, `build:watch`
> script, no `development` in `devConditions`). The remaining drift is the
> `docs/precepts` submodule pin: keyframes.js carries `458c2d1` (a v1-era
> snapshot) but the fleet target is `68d9b20` (glass-ui's post-v2
> codification at `glass-ui:ce5aad8`, lands the rewritten precept text
> in-place at invariant 30). Please advance the keyframes.js precept pin to
> `68d9b20` at your convenience. Nothing in keyframes.js source needs to
> change; this is a one-line submodule bump.

value.js D files this as the refresh in Dh's own `coordination/` artefact
when D-wave executes (not in this lane — this is research, not coordination
writing). The B-vintage Q.md §9 line stays where it is; the D-side
coordination doc supersedes it.

### §4.3 — No cross-repo block

value.js cannot write keyframes.js (precept-bound: each `@mkbabb/*` repo is
its own writer). Filing the refreshed convergence ask is the correct extent
of action. value.js's D wave does **not** wait on keyframes.js's submodule
bump: the contract-v2 gate (when ported per §2.2.d) is GREEN for value.js
as soon as value.js's own publisher checks pass, regardless of where
keyframes.js's precept pin sits — the gate inspects code-side artefacts
(`exports`, `scripts`, `vite.config.ts`), not submodule pins. The
submodule-SHA story is precept-hygiene, not gate-hygiene.

---

## §5 — Recommended D-wave shape

### §5.1 — Single-wave alignment — `D.W?-contract-v2` (proposed)

The contract-v2 alignment is small, mechanical, and self-contained. One wave
absorbs the whole change. Proposed wave shape:

| Lane | Edit | Risk | Gate |
|---|---|---|---|
| **L1** | `package.json` — delete `development` from `exports["."]`; add `build:watch`; (optionally) version bump `0.5.1 → 0.5.2` | low — public surface unchanged at the bare-specifier level | `npm run build` GREEN (dist/ produced); the package's own entry resolves from dist/ via the collapsed map |
| **L2** | `vite.config.ts` — delete `demoConditions` + its three callsites; delete `demoServerFsAllow` + its two callsites; rewrite the explanatory comment to v2 framing | low-medium — depends on whether any demo asset actually reaches a sibling's `src/` outside `node_modules` | demo build modes (`hero-lab`, `gh-pages`, `dev`) all run; demo loads correctly with no `403`s |
| **L3** | `scripts/proof-resolution-contract.mjs` — port verbatim from glass-ui `ce5aad8`; add `"proof:resolution": "node scripts/proof-resolution-contract.mjs"` to `package.json` scripts | low — net-new file, no risk to existing surface | `npm run proof:resolution` GREEN for value.js's own publisher + consumer rows; expected RED for keyframes.js until its precept-pin convergence (gate is constellation-wide; transient RED is acceptable and named in the v2 precept) |
| **L4** | `docs/precepts` submodule bump `3c32fae → 68d9b20` | nil — moves a pointer | submodule status clean; the new precept text reads as the v2 edict |
| **L5** (close, coordination) | refresh `coordination/<peer>.md` §keyframes.js convergence per §4.2; record the precept SHA convergence target | nil | the coordination doc names the v2 fleet HEAD `68d9b20` and the one-line keyframes.js ask |

All five lanes can execute as one wave — they are non-conflicting (L1/L2/L3
touch separate files; L4 is a submodule pointer; L5 is a doc edit), and the
gate (L3 ‖ `npm run proof:resolution`) cleanly verifies L1+L2 in one stroke.

### §5.2 — Lane ordering

L1 → L2 → L3 → L4 → L5 is a safe order:

1. L1 first because the `package.json` edit is the centrepiece — every other
   lane is downstream of it. After L1 alone, `npm run build` should still
   pass (the production build never resolved through `development`).
2. L2 next, because once value.js stops *publishing* `development` (L1),
   continuing to *consume* `development` in `demoConditions` is dead code.
3. L3 introduces the gate — and the gate runs against the post-L1+L2 state,
   so it should immediately pass for value.js's own rows.
4. L4 is precept-hygiene; it could run first (the precept text is what
   defines the contract value.js is implementing), but landing it last has
   the practical benefit that the code edits are already in tree when the
   precept's narrative starts pointing at them.
5. L5 is the close ceremony — refresh the keyframes.js coordination ask and
   record the precept SHA target. Already covered above.

### §5.3 — What this lane does NOT propose

- **No demo-orchestration `dev.sh` work** (contract-v2 §2.3 second clause:
  consumer dev orchestration spawns siblings' `build:watch`). value.js's
  demo is started via `npm run dev` (a single Vite invocation) and there is
  no `dev.sh` orchestration script. Adding one to spawn glass-ui's
  `build:watch` is a *correctness improvement* (the demo will currently
  resolve a possibly-stale glass-ui `dist/`) but a separate wave from
  contract-v2 alignment per se. The per-repo migration map in
  `precepts@68d9b20 §5` routes all-consumers dev-orchestration to **AG-GU3**,
  a later wave; value.js's mirror (an own-side D-or-later wave) follows the
  same staging.
- **No version-bump strategy beyond a recommendation**. Whether D bumps
  `0.5.1 → 0.5.2` or leaves `0.5.1` is a judgement call for the D
  orchestrator. Glass-ui chose a patch bump (`v1.9.2 → v1.9.3`); keyframes.js
  did not bump (v2.1.1 stayed). Both are defensible. The decision is filed
  here, not pre-empted.
- **No `node_modules/.bin/vite` invocation in `build:watch`.** The canonical
  form matches keyframes.js (`vite build --watch --mode production`); the
  `--mode production` is value.js's existing convention. Heap ceiling is
  not needed (value.js's bundle is small).

### §5.4 — Single-wave or split?

**Single wave.** Rationale: the five lanes are tightly coupled (the gate
verifies the publisher edits), small enough to fit one execution turn, and
non-conflicting at the file level. Splitting them adds a temporal-coupling
hazard with no benefit. Glass-ui's contract-v2 close was a single commit
(`ce5aad8`, 5 files, 121 insertions, 113 deletions). value.js's version will
be similarly compact (5 files: `package.json`, `vite.config.ts`,
`scripts/proof-resolution-contract.mjs`, `docs/precepts` submodule pointer,
`docs/tranches/D/coordination/<peer>.md`).

### §5.5 — Where Dh fits in the D-tranche plan

The other Dh-adjacent research lanes filed at this tranche open are Da
(hitherto deferrals), Db (api/ legacy), Dc (aurora), Dd (blob/glass-ui
extirpation). Contract-v2 alignment is **orthogonal to all four** — it edits
`package.json` / `vite.config.ts` / `scripts/` / submodule pointers, none of
which collide with `api/` work, demo aurora/blob component changes, or the
backend audit. The Dh wave can run in parallel with any of Da/Db/Dc/Dd.

If D wants to absorb the Dh edits into a broader "consumer/publisher hygiene"
W0-style opening wave, that is also defensible: it pairs the precept-side
discipline with whatever else D opens with. The lane-set in §5.1 is granular
enough to slot under any container wave.

---

## §6 — Summary

The cross-repo dev-resolution contract has moved off `development` and onto
"every publisher resolves `dist/`, kept fresh by `build:watch`." glass-ui
landed v2 at `ce5aad8` with the rewritten gate and precept text; keyframes.js
followed at `0909177` (code already done; only its precept submodule pin is
behind). value.js is the last `@mkbabb/*` publisher carrying contract-v1
shape. The alignment is a small one-wave edit set: collapse `exports["."]`
to the 3-key shape, add `build:watch`, drop `demoConditions` +
`demoServerFsAllow`, port `proof-resolution-contract.mjs` verbatim from
glass-ui, bump the precept submodule from `3c32fae` to `68d9b20`, and refresh
the keyframes.js coordination ask. Five lanes, one wave, no source-code
changes outside the publish/consume seam.
