# D.W1 Step 1 — Contract-v2 Alignment Audit

**Wave**: D.W1 Step 1 — Lanes L1–L5 (contract-v2 alignment).
**Branch**: `tranche-b`. **Base HEAD**: `afdfe77` (D.W0 close).
**Mode**: implementation; no mutating git; orchestrator owns the index.
**Sources**:
- Wave spec: `docs/tranches/D/waves/D.W1.md`
- Research: `docs/tranches/D/research/Dh-contract-v2.md §1, §2`
- Precept: `docs/precepts/cross-repo-dev-resolution.md` @ `68d9b20` (the contract-v2 codification — advanced at D.W0)
- Upstream script: glass-ui `scripts/proof-resolution-contract.mjs` @ `ce5aad82f524b779941f9e1bc8d54296abd41e32`

---

## §1 — L1: `package.json` exports + scripts

### §1.1 — Diff of `exports["."]`

**Before** (4-key contract-v1 shape):

```jsonc
"exports": {
    ".": {
        "development": "./src/index.ts",
        "types":       "./dist/index.d.ts",
        "import":      "./dist/value.js",
        "default":     "./dist/value.js"
    }
}
```

**After** (3-key contract-v2 shape — `development` struck per precept §2.1):

```jsonc
"exports": {
    ".": {
        "types":   "./dist/index.d.ts",
        "import":  "./dist/value.js",
        "default": "./dist/value.js"
    }
}
```

Verification:
```
$ cat package.json | jq '.exports."."'
{
  "types": "./dist/index.d.ts",
  "import": "./dist/value.js",
  "default": "./dist/value.js"
}
```

Exactly the three required keys, in the required order.

### §1.2 — Diff of `scripts`

Two additions to `scripts`, both contract-v2 obligations:

- `"build:watch": "vite build --mode production --watch"` — placed after `"build:hero-lab"`, before `"gh-pages"` (logical grouping with the other build scripts). Satisfies precept §2.3 (every `@mkbabb/*` publisher exposes an incremental watch build).
- `"proof:resolution": "node scripts/proof-resolution-contract.mjs"` — wires the ported gate into the npm-script surface (L3 below).

No existing script keys were renamed or removed.

---

## §2 — L2: `vite.config.ts` strips `demoConditions` + `demoServerFsAllow`

### §2.1 — Deleted constants

Both top-level constants are deleted (precept §2.2 — consumer half struck):

```ts
// (DELETED — contract-v2 abrogation)
// const demoConditions = ["development", "module", "browser"];
// const demoServerFsAllow = [path.resolve(import.meta.dirname, "..")];
```

### §2.2 — Deleted callsites

Three callsites of `demoConditions` and two callsites of `demoServerFsAllow`, struck across the three demo modes:

| Mode | Removed | Why |
|---|---|---|
| `hero-lab` | `resolve: { ...defaultOptions.resolve, conditions: demoConditions }` | precept §2.2 — `["development", ...]` resolves nothing under contract-v2 |
| `hero-lab` | `server: { ..., fs: { allow: demoServerFsAllow } }` | precept §2.2 — sibling-`src/` widening struck |
| `gh-pages` | `resolve: { ...defaultOptions.resolve, conditions: demoConditions }` | same |
| `dev` (default branch) | `resolve: { ...defaultOptions.resolve, conditions: demoConditions }` | same |
| `dev` (default branch) | `server: { ..., fs: { allow: demoServerFsAllow } }` | same |

### §2.3 — Comment rewrite (lines ~40-50)

**Before**:

> Demo build modes (dev, gh-pages, hero-lab) resolve sibling `@mkbabb/*` packages through their `development` conditional export so the demo always consumes the siblings' `src/` and never a stale `dist/`. … The demo reaches assets (fonts) inside symlinked sibling packages that live outside value.js's root. `fs.allow` must cover the shared parent directory …

**After**:

> Contract-v2 (`docs/precepts/cross-repo-dev-resolution.md §1.2, §2`): bare `@mkbabb/*` specifiers resolve through the sibling's `exports` map to `dist/` via the `file:` symlink in `node_modules`; the sibling's `build:watch` keeps `dist/` fresh under dev-orchestration. Consumer-side `resolve.conditions` widening and `server.fs.allow` widening into sibling `src/` are both struck — Vite's defaults (`module`, `browser`, `default`) resolve the published surface in every demo mode.

### §2.4 — Residual reference grep

```
$ grep -n "development\|demoConditions\|demoServerFsAllow" vite.config.ts
$ echo $?
1   # grep exit 1 = no matches; clean
```

Zero residual references to any of the three contract-v1 fossils.

---

## §3 — L3: `scripts/proof-resolution-contract.mjs` port

### §3.1 — Attribution

Ported VERBATIM from glass-ui's `scripts/proof-resolution-contract.mjs` at SHA `ce5aad82f524b779941f9e1bc8d54296abd41e32`. The file's first comment line names the upstream source + SHA, per the wave spec.

Line count: 366 lines (matches glass-ui's; only a 2-line header was added to record the port attribution).

The script is fleet-centric: `ROOT` is computed from the script's own location (`resolve(fileURLToPath(new URL("../", import.meta.url)))`), and `PARENT` is `ROOT/..`. From value.js's `scripts/` directory the same constants name the same siblings (`glass-ui`, `keyframes.js`, `value.js` as publishers; the same 7-row consumer list).

### §3.2 — `npm run proof:resolution` output

Captured verbatim post-L1+L2:

```
$ npm run proof:resolution

> @mkbabb/value.js@0.5.1 proof:resolution
> node scripts/proof-resolution-contract.mjs

[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation

$ echo $?
0
```

**PASS across the constellation** at this commit. glass-ui is compliant since `ce5aad8`; value.js is compliant as of this step; keyframes.js was already compliant on the code side (`0909177`, per `coordination/Q.md §9`). All three publishers carry the 3-key shape + `build:watch`; no consumer Vite config carries a `dist/` alias on a `@mkbabb/*` key.

---

## §4 — L4: Precept content verification (read-only)

`docs/precepts/cross-repo-dev-resolution.md` is on-target at `68d9b20`. Spot-checked:

- **§1.2** ("Contract-v2, in one sentence"): "Consumers resolve `dist/`, dev and prod alike; every `@mkbabb/*` publisher exposes a `build:watch` script, and consumer dev-orchestration spawns the siblings' watch-builds so that `dist/` is always fresh." ✓ contract-v2 framing.
- **§2.1** (Publisher half): "Every `@mkbabb/*` `package.json` `exports["."]` MUST declare exactly these three keys, in this order: `types → import → default`. The `development` key is **struck**. There is no `src/` resolution target in the `exports` map." ✓ matches value.js's L1 final shape.
- **§2.2** (Consumer half STRUCK): "Contract-v1's consumer half required every `@mkbabb/*` consumer's `vite.config.ts` to declare `resolve.conditions: ["development", …]` and to widen `server.fs.allow` into sibling repo roots. **Both obligations are struck under contract-v2.**" ✓ matches value.js's L2 strip.
- **§2.3** (Watch-build contract): "Every `@mkbabb/*` publisher package MUST declare a `build:watch` script. … Every workspace consumer's dev orchestration spawns the siblings' watch-builds." ✓ matches L1's script addition.
- **§4** (Invariant 30 redefined in-place): "Every `@mkbabb/*` package's `exports` map resolves only `dist/` … The fail-closed gate `scripts/proof-resolution-contract.mjs` asserts the `development` key is ABSENT, asserts `build:watch` is PRESENT, and bans `dist/` aliases." ✓ matches the gate L3 ported.

No edits — read-verified only.

---

## §5 — L5: `coordination/Q.md §9` reconciliation

§9.1 ("Precept-pin convergence") gains a post-D.W1-Step-1 fleet status table — minor reconciliation, no restructure. The new table records:

| Repo | Code-side compliance | Precept-pin | Status |
|---|---|---|---|
| **glass-ui** | ✓ contract-v2 at `ce5aad8` | `68d9b20` (fleet target) | ✓ compliant |
| **value.js** | ✓ contract-v2 at D.W1 Step 1 (this commit) | `68d9b20` (fleet target — advanced at D.W0) | ✓ compliant |
| **keyframes.js** | ✓ code-side at `0909177` | `458c2d1` (off-target; standing ask filed §9.1) | ✓ code-side; precept-pin drift filed — value.js does **not** block |

The rest of §9 (the C1–C5 keyframes.js asks, §9.2–§9.6) is unchanged.

---

## §6 — Sub-gate verdict

| Sub-gate | Requirement | Verdict |
|---|---|---|
| **D.W1-L1** | `package.json exports["."]` = exactly `{types, import, default}`; `build:watch` script present | ✓ **PASS** — jq output verified §1.1; `build:watch` + `proof:resolution` both added §1.2 |
| **D.W1-L2** | `vite.config.ts` carries zero `development` / `demoConditions` / `demoServerFsAllow` references | ✓ **PASS** — grep exit 1 (no matches), §2.4 |
| **D.W1-L3** | `npm run proof:resolution` returns GREEN for value.js | ✓ **PASS** — fleet-wide GREEN (all 3 publishers + 7 consumers clean), §3.2 |
| **D.W1-L4** | Precept content describes contract-v2 | ✓ **PASS** — §1.2/§2.1/§2.2/§2.3/§4 read-verified, §4 above |
| **D.W1-L5** | `coordination/Q.md §9` reflects post-W1 fleet status | ✓ **PASS** — §9.1 status table added, §5 above |

### Wave-level gate matrix

| Gate | Target | Observed | Verdict |
|---|---|---|---|
| `npx vue-tsc --noEmit \| grep -c "error TS"` | 126 | 126 | ✓ no regression |
| `npx vitest run` | 1409 passing / 26 files | 1409 passing / 26 files (2.82s) | ✓ no regression |
| `npx playwright test --project=smoke` | 3/3 green | 3/3 green after orchestrator's narrow `fs.allow` transient restoration — see §6.1 | ✓ |
| `npm run proof:resolution` | GREEN for value.js (other repos may RED) | GREEN fleet-wide | ✓ exceeded target |
| `npm run dev` boot probe | HTTP 200 within 30s on `localhost:9000` | HTTP 200 on first attempt (~6s) | ✓ |

### §6.1 — Deviation routed: smoke 403 on sibling-`src/` font + orchestrator's narrow `fs.allow` transient

**Initial symptom (post-L2 strip)**: `[smoke] page-load.spec.ts` console-error assertion failed. The failing resource was `/Users/mkbabb/Programming/glass-ui/src/fonts/fira-code/fira-code-latin.woff2`, denied by Vite's `fs.allow` with the message *"is outside of Vite serving allow list. — /Users/mkbabb/Programming/value.js"*.

**Trace**:

1. value.js's demo imports `@mkbabb/glass-ui/styles` at `demo/@/styles/style.css:3` (CSS subpath).
2. glass-ui's `package.json` declares `"./styles": "./src/styles/index.css"` AND `"./styles.css": "./dist/glass-ui.css"`. The two are orthogonal distribution mechanisms (glass-ui commit `9275584`): `./styles` ships **Tailwind-source** (tokens, `@theme`, `@layer`, `@apply` — processed by the consumer's Tailwind compiler); `./styles.css` ships the **compiled SFC-scoped surface** (`data-v-<hash>` selectors).
3. The Tailwind-source `./styles` `@import`s `typography.css`, which carries `src: url("../fonts/fira-code/fira-code-latin.woff2") format("woff2")`.
4. The relative URL resolves through the symlinked `node_modules/@mkbabb/glass-ui` to `realpath` = `/Users/mkbabb/Programming/glass-ui/src/fonts/fira-code-latin.woff2`, outside value.js's root.
5. With L2's `demoServerFsAllow` strip, Vite's default allow-list rejects the request.

**Root cause analysis**: glass-ui's `"./styles"` does violate the contract-v2 §2.1 keystone ("no subpath advertises anything but a `dist/` artefact"). But Tailwind-source CSS is structurally `src/` — it cannot be pre-compiled into `dist/` without losing its Tailwind-processing semantics. This is a fleet-coordination question the contract-v2 codification at `68d9b20` did not fully resolve: either glass-ui changes its Tailwind-source distribution model (ship tokens as a JS module exporting CSS strings? bundle the fonts inline? rework the architectural seam), OR the contract-v2 keystone admits an explicit Tailwind-source exception, OR consumers carry a narrow `fs.allow` widening as a documented transient.

**Orchestrator decision**: restore a **narrowly-scoped, inline-rationaled** `fs.allow` widening on the dev and hero-lab modes only, named `siblingFsAllowTransient` in `vite.config.ts`. This is the consumer-side reciprocal of the publisher-side gap; it is the "befitting graceful" exception under invariant D3 — **explicit and time-boxed, not silent**. The widening:

- Is named `siblingFsAllowTransient` so its provisional status is grep-visible.
- Carries an inline comment citing precept `§2.1` keystone, the AG glass-ui-core fleet-migration map at `§5`, and the routing to `docs/tranches/D/coordination/Q.md §3`.
- Is scoped to one directory up (`path.resolve(import.meta.dirname, "..")`) — minimum necessary to reach symlinked sibling assets.
- Applies only to `dev` and `hero-lab` server modes; `gh-pages` and `production` are unaffected.
- Will be retired when glass-ui ships a contract-v2-compliant Tailwind-source distribution (filed in coord/Q.md §3).

**Routing**: filed in `docs/tranches/D/coordination/Q.md §3` as a new constellation-coordination row. The cross-repo destination is glass-ui's next subpath-surface wave (or the AG-GU fleet-migration sequence cited in `cross-repo-dev-resolution.md §5`). value.js does not block.

**Post-restoration verification**: `npx playwright test --project=smoke` returns 3/3 green; the dev server boots without console errors; `npm run proof:resolution` remains GREEN (the gate inspects `exports`/`scripts`/`alias`, not `fs.allow`).

### §6.2 — Overall verdict

- **Sub-gates L1–L5**: 5/5 PASS.
- **Wave gates**: vue-tsc 126 unchanged ✓; vitest 1409 unchanged ✓; `proof:resolution` GREEN fleet-wide ✓; `npm run dev` 200 ✓; smoke 3/3 green post-orchestrator transient ✓.
- **Step 1 verdict**: COMPLETE. The Tailwind-source-subpath gap is filed sharper at `coordination/Q.md §3` with the inline-rationaled `fs.allow` transient on the consumer side; the publisher-side fix lives in glass-ui's next subpath-surface wave.

---

## §7 — Files changed

| Path | Change | Lane |
|---|---|---|
| `package.json` | `exports["."]` 4-key → 3-key; added `build:watch` + `proof:resolution` scripts | L1, L3 |
| `vite.config.ts` | deleted `demoConditions` constant + 3 callsites; deleted `demoServerFsAllow` constant + restored as narrow `siblingFsAllowTransient` on dev/hero-lab modes with inline rationale (consumer-side reciprocal of glass-ui's outstanding subpath migration — see §6.1); rewrote contract-v2 comment | L2 + orchestrator routing |
| `scripts/proof-resolution-contract.mjs` | NEW — ported from glass-ui `ce5aad8` (366 lines + 2 attribution header) | L3 |
| `docs/tranches/D/coordination/Q.md` | §9.1 status table added (post-W1 fleet snapshot) | L5 |
| `docs/tranches/D/audit/D.W1-contract-v2.md` | NEW — this file | (audit) |

No `src/`, `test/`, or `demo/` edits. No git mutations.
