> _Hoisted 2026-07-02 (R.W0-14) by lane L2-kf1-reverify from `.claude/worktrees/wf_d9a4e4d9-899-2/docs/tranches/R/audit/pass2/boot-blast-radius.md`. Byte-faithful. This worktree self-corrected during its own run (`git reset --hard tranche-q` → all results on head `e80b359`/v1.2.0, per its §0)._

# boot-blast-radius — Pass-2 lane report (Tranche R)

**Lane**: boot-blast-radius (seed 2) · **Date**: 2026-07-02 · **Worktree**: `.claude/worktrees/wf_d9a4e4d9-899-2`
**Descends from**: proto-boot-cascade (88%) + CRIT-proto-boot-cascade (M1/M2/M3) · **Burns down**: PASS1-VERDICT §5 P0-#3 + §5 P1-#12 (the array-alias cure's unverified blast radius across the 3 non-dev build modes; the regex↔exports-map coupling; the dev-config-only framing).

**One-line verdict**: The array-form alias cure is GREEN under all four vite modes as far as value.js is concerned — dev boots clean, the production lib is BYTE-IDENTICAL, and gh-pages + hero-lab resolve value.js with zero errors. I replaced the hand-rolled regex with **exports-map-driven generation** (closes CRIT-M2). Two material corrections to the pass-1 picture: (1) the proto's "no `node_modules/@mkbabb/value.js` to walk up to" premise is FALSE — a stale registry self-install at **1.0.2** exists and is exactly what the alias must override; (2) getting past the `/math` load error UNMASKS a **second, independent, pre-existing** demo-build blocker — glass-ui 4.2.0 deleted `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`, so `demo/@/components/ui/tabs/index.ts:1` dead-imports them and **gh-pages/hero-lab cannot reach full green until that demo↔glass-ui drift is fixed** (out of this lane).

---

## §0 — A worktree-provenance caveat that reshaped the lane (read first)

The worktree was checked out **3 commits stale** — HEAD `15b0382` (v**1.0.2**), not tranche-q `e80b359` (v1.2.0). The stale src predates the P/Q barrel exports (`parseCSSSubValue`, `extractFunctions`), so an early cold-cache dev boot on it produced a **false** `[MISSING_EXPORT] "extractFunctions"/"parseCSSSubValue" is not exported by dist/value.js` from keyframes.js 5.1.0 (which declares `@mkbabb/value.js: ^1.2.0`). I `git reset --hard tranche-q` (bringing src+package.json to 1.2.0 — its `vite.config.ts` is byte-identical to the stale one, so the cure re-applies unchanged), rebuilt, and **re-ran every mode against the correct tree**. Every result below is on tranche-q 1.2.0. **Flag to the orchestrator**: lane worktrees should be cut from the current tranche head, not an ancestor — the stale checkout would have produced a spurious "value.js is missing exports" finding.

---

## §1 — The cure (re-applied, exports-map-driven)

`vite.config.ts` (worktree diff; the sole tracked change). The change is confined to `resolve.alias` + a generated alias block:

- The 7 `@…`-prefixed demo aliases become `{find, replacement}` array entries but stay **STRING** finds — `@rollup/plugin-alias` prefix-matches a string (exact OR `find + "/…"`), which is exactly what `@src/foo/bar` needs.
- The value.js self-aliases are **generated** from this repo's own `package.json#exports` (`vite.config.ts:41-59` in the cured file), one **anchored-regex** entry per exports key:
  - `.` → `/^@mkbabb\/value\.js$/` → `dist/value.js`
  - `./math` → `/^@mkbabb\/value\.js\/math$/` → `dist/subpaths/math.js`  … (and the other 6 subpaths)

The replacement is taken from each entry's `import` condition (`conditions.import`), resolved against `import.meta.dirname` — so the alias points at the **exact** file the exports map publishes, not an assumed shape.

Why anchored regex, not object-form string: the prior object-form string alias `"@mkbabb/value.js" → dist/value.js` (`vite.config.ts:50` pre-cure) is a **prefix rewrite**. `@mkbabb/value.js/math` matched it and rewrote to `dist/value.js/math` — a path INTO the `dist/value.js` **file** → "Not a directory (os error 20)". Anchored `^…$` regexes cannot prefix-match, so the bare `.` entry never swallows a subpath specifier — the fix is order-independent.

**Correction to the proto's rationale (load-bearing).** The pre-cure comment (`vite.config.ts:42-43`) and the proto assert *"A package never installs itself — there is no `node_modules/@mkbabb/value.js` to walk up to."* **False.** `package.json:113` declares a self-dependency `"@mkbabb/value.js": "^1.0.2"`, and npm materializes a **real registry tarball dir** at `node_modules/@mkbabb/value.js` (version **1.0.2**, a directory, not a symlink — verified). Its graph predates the subpath cut. So the alias's true job is not "there's nothing to resolve to" — it is to **override that stale 1.0.2 self-install** and point every value.js specifier (the demo's own + glass-ui's + keyframes') at THIS repo's freshly-built `dist/`. My cured comment states this correctly.

---

## §2 — Four-mode proof (tranche-q 1.2.0)

| Mode | Command | Baseline (object-form alias) | **Cured (array/regex from exports)** |
|---|---|---|---|
| production lib | `npm run build` | GREEN (lib entry is `src/`, never touches the value.js alias) | **GREEN + dist BYTE-IDENTICAL** (§3) |
| dev | `npm run boot-smoke` (cold `vite --force`) | **FAIL** — `[UNLOADABLE_DEPENDENCY] Could not load dist/value.js/math` "Not a directory (os error 20)" during dep-optimization | **PASS** — "demo mounted, console clean (cold dep-optimizer cache)" |
| gh-pages | `npm run gh-pages` | **FAIL** at LOAD phase — same `/math` UNLOADABLE_DEPENDENCY | value.js **FULLY CLEAN** (no `/math`, no missing-export); full-green when the unrelated Tabs drift is stubbed (§4) |
| hero-lab | `npm run build:hero-lab` | **FAIL** — `/math` (+ Tabs, masked) | value.js **FULLY CLEAN**; full-green when the Tabs drift is stubbed (§4) |

All four share `resolve.alias` via the `...defaultOptions` spread (`vite.config.ts:27→125/204/232/273`), so all four inherited the object→array conversion. Verified individually.

**Why the gh-pages/hero-lab result is conclusive for value.js despite not reaching full green:** rolldown fails at the **earliest** phase with errors. On baseline these builds die at the **LOAD** phase (`/math` cannot load). Cured, they proceed **past** LOAD — every value.js specifier (bare + `/math` + all subpaths) loads — and only then hit a **LINK**-phase error on an unrelated glass-ui symbol. A residual value.js load failure would reappear as an UNLOADABLE_DEPENDENCY (higher precedence), as it did on baseline. Its absence proves value.js resolves clean. §4 removes the last doubt by stubbing the unrelated blocker and reaching `✓ built`.

**dev is THE boot bug.** Baseline cold-cache `boot-smoke` fails with the exact R-era error during dependency optimization; cured cold-cache `boot-smoke` mounts `#app` + the `role="main"` landmark with a console clean of value.js-origin errors. The `boot-smoke.mjs` gate (`--force`, the cold dep-optimizer the abrogation-ledger §4 names as a silencer) is the right instrument — a warm cache can render a stale-but-green graph, which is likely how the proto observed "dev boots clean" without noticing the `/math` failure reproduces only cold.

---

## §3 — Byte-parity of the production lib (the cure is dev-graph-only in effect)

Built the pristine 1.2.0 lib (cure stashed), hashed all 71 emitted `dist/**/*.{js,d.ts}`; built the cured lib; re-hashed. **IDENTICAL** — every file matches. (Hashes: `scratchpad/q-baseline.sha` vs `scratchpad/q-cured.sha`.)

This is expected and is the proof the change is dev-graph-only: the `production` build's entry set is `libraryEntries(...)` over `src/` (`vite.config.ts:135`), and **nothing under `src/` imports `@mkbabb/value.js`** (the library never consumes itself — inv-K-1, eslint-enforced). The value.js self-alias only ever fires for the **demo/sibling** graph (glass-ui's + keyframes' `dist/` imports), which the lib build does not include. So the shipped `dist/` is unchanged.

**Stated plainly: dev-config-only. No `dist/` change, no library version bump, no republish. The cure is decoupled from every publish gate** — it can land at R.W0/R.W2 independent of any value.js version cut.

---

## §4 — The UNMASKED second blocker: glass-ui `Tabs`→`SegmentedTabs` drift (out of lane, but gh-pages/hero-lab-fatal)

Getting past the `/math` load error advances gh-pages + hero-lab into the LINK phase, where they hit:

```
[MISSING_EXPORT] "Tabs" is not exported by "demo/@/components/ui/tabs/index.ts".
[MISSING_EXPORT] "Tabs" is not exported by "../../../../glass-ui/dist/glass-ui.js".
  (+ TabsList / TabsTrigger / TabsContent)
```

Root: `demo/@/components/ui/tabs/index.ts:1` is `export { Tabs, TabsList, TabsTrigger, TabsContent } from "@mkbabb/glass-ui";` — but **glass-ui 4.2.0's barrel (`dist/glass-ui.js`) exports none of them**, and `./tabs` (`dist/tabs.js`) exports only **`SegmentedTabs`** (verified: `grep` for `Tabs*` in the barrel = 0; `dist/tabs.js` tail = `export { V as SegmentedTabs }`). The four shadcn-era `Tabs*` symbols were removed. Ten demo files consume this shim (`grep -rl 'ui/tabs' demo/`), incl. the color-picker (gh-pages) and hero-lab graphs.

This is **not** in the boot-cascade lane and **not** caused by the alias — value.js resolves clean. It is a pre-existing demo↔glass-ui consumption drift that the `/math` load abort **masked on baseline**. Two facts pin it as independent:
1. Stubbing `tabs/index.ts` to `export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent } from "reka-ui"` (diagnostic, reverted) makes **both** `npm run gh-pages` (`✓ built in 1.27s`) and `npm run build:hero-lab` (`✓ built in 586ms`) go **fully green** — no value.js error anywhere.
2. dev `boot-smoke` **passes** despite the drift because the Tabs consumers are behind a lazily-mounted dialog, not the synchronous boot path; native-ESM dev only throws when the specific import executes.

**Disposition**: surface to the R demo/glass-ui consumption track (adjacent to proto-glassui-consume). The demo must migrate `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` → glass-ui `SegmentedTabs` (or glass-ui re-adds the compound Tabs). Until then the **deployed** demo (gh-pages) is unbuildable against glass-ui 4.2.0 — a live tranche-R gate item, separate from the boot fix. This is precisely the blast-radius CRIT-M1 worried about: exercising all four modes surfaced a second, independent shipping-mode blocker.

---

## §5 — DECISION: regex vs exports-map → **resolve through `package.json#exports`**

I replaced the proto's hand-rolled `{find: /^@mkbabb\/value\.js\/(.+)$/, replacement: dist/subpaths/$1.js}` with **generation from value.js's own exports map** (still emitting anchored regexes, but sourced from the map). Rationale:

1. **Single source of truth — kills CRIT-M2.** The proto's regex hard-codes `dist/subpaths/$1.js`, duplicating the exports-map's path shape. It is correct only while all subpaths map uniformly. My generation reads each entry's actual `conditions.import` path, so a non-uniform future entry (e.g. `./special → ./dist/special/foo.js`) resolves correctly with zero edits. Add/rename/remove a subpath in `package.json#exports` and the dev alias follows automatically — the alias↔exports drift is eliminated *by construction*, not by a documented-coupling caveat.
2. **Idiomatic.** `scripts/abrogation-sweep.mjs:67-72` already reads a sibling's `package.json#exports` (`JSON.parse(readFileSync(...)).exports`) to validate specifiers. Reading value.js's own exports map with the same idiom is the established pattern, not a new contrivance.
3. **Order/subpath-safe.** Each generated entry is `^…$`-anchored, so it cannot prefix-match — the class of bug this whole lane exists to kill cannot recur regardless of array order.

The **one** assumption I did NOT over-engineer: every exports entry has an `import` condition (all 8 of value.js's do). value.js's exports map is authored in this same repo, not an external contract; guarding a `conditions.import`-missing case that cannot occur in the repo's own map would be the speculative generality the precepts warn against. If a future entry ever ships `default`-only, the generation throws loudly at config load (fail-fast, not silent mis-resolve) — acceptable.

---

## §6 — Coupling, drift failure modes, and the guard

There are **two orthogonal drift axes**; the alias/exports-map addresses one, and a different gate must catch the other.

**Axis A — alias ↔ exports-map (path shape).** *"The dev-graph alias set must name the same specifiers, mapped to the same files, that value.js publishes."* Siblings import value.js by the exact specifiers the exports map publishes (`@mkbabb/value.js`, `@mkbabb/value.js/math`). **My generation collapses this coupling to zero** — the alias IS the exports map, read at config-eval time. A **residual** sub-coupling remains: the alias assumes the `dist/` files the exports map names **exist and are fresh**. Freshness is held by `build:watch` (dev.sh) during co-development; a missing/stale `dist/subpaths/*.js` would resolve to a real path with stale content, not error. This is the intended dist-resolution posture (N.W1.C), not a new hazard.

**Axis B — sibling ↔ value.js public API (named exports).** *"keyframes.js/glass-ui import symbol X by name; value.js's barrel must export X."* Neither the alias nor the exports map covers this — the alias only fixes *where* `@mkbabb/value.js` resolves, not *what it exports*. This axis bit my stale worktree (§0: keyframes needed `extractFunctions`/`parseCSSSubValue`, absent from 1.0.2's barrel), and it is the SAME failure class as the §4 Tabs drift (a named export a consumer needs, gone from the producer).

**Guard recommendation (primary): rely on `boot-smoke` — it already exists and is the correct catch-all.** A **cold** (`--force`) dev boot links the entire runtime graph — demo + glass-ui `dist/` + keyframes `dist/` — so it structurally trips on *both* Axis-B classes: a value.js↔sibling API mismatch AND the glass-ui named-export drift (when the consumer is in the boot path). It is wired as its own CI job (`package.json:83`). No new script is needed for Axis B; the discipline is "boot cold, boot green."

**Guard recommendation (secondary, cheap tripwire): extend `abrogation-sweep.mjs` half-1 to a named-export check.** Today the sweep validates only that a `@mkbabb/glass-ui/<subpath>` **specifier** resolves to a live exports key (`scripts/abrogation-sweep.mjs:84-109`) — it **passes green right now despite the §4 Tabs drift**, because the bare `@mkbabb/glass-ui` specifier IS a live `.` entry; the sweep never checks that `Tabs` is actually *exported*. A cheap extension — for each `import { A, B } from "@mkbabb/glass-ui[/sub]"` in demo/, assert each named binding exists in the resolved dist module's export set — would catch the Tabs class at grep-time, **before** the gh-pages build fails. This is a genuine gap, not a nitpick: the sweep is the pin-bump abrogation gate and a **removed named export** is precisely an abrogation it currently blind-spots. Recommend it as a follow-on, but note boot-smoke is the load-bearing catch either way.

I did **not** extend the sweep in this lane (it touches `scripts/`, outside the boot-cascade charter, and the fix belongs with whoever lands the Tabs migration). Filed here as the guard recommendation.

---

## §7 — Precept + scope statement

- **dev-config-only**: the sole change is `vite.config.ts` (§1). No `src/`, no `demo/`, no `dist/`, no `package.json`.
- **no dist change**: production lib is byte-identical (§3).
- **no republish / decoupled from publish gates**: no version bump, no `dist/` mutation; lands at R.W0/R.W2 independent of any value.js cut.
- **KISS / no-contrivance / no-legacy**: exports-map generation removes duplicated path-shape knowledge rather than adding a shim; the `@…` aliases keep string-prefix semantics they actually need; no fallback for impossible cases.
- All diagnostic artifacts (Tabs stub, stale-worktree build) were **reverted**; final `git status` = `M vite.config.ts` + untracked `node_modules` (the read-only symlink into the main install).

## §8 — Amendments to the pass-1 record

1. **PASS1-VERDICT §5 P0-#3 — DISCHARGED for value.js**, with the caveat that gh-pages/hero-lab **full green** additionally requires the §4 Tabs-drift fix (a separate demo↔glass-ui lane). The alias cure itself is proven across all four modes.
2. **PASS1-VERDICT §5 P1-#12 — DISCHARGED**: coupling resolved by exports-map generation (§5/§6); dev-config-only stated (§7).
3. **Proto §1.3 rationale corrected**: `node_modules/@mkbabb/value.js@1.0.2` DOES exist (stale registry self-install from the `package.json:113` self-dep); the alias overrides it, it is not a "nothing to resolve to" case (§1).
4. **New finding — §4 Tabs drift** is a live, independent gh-pages/hero-lab blocker the boot bug masked. Route to the demo/glass-ui consumption track.
5. **New finding — §0 stale worktree**: lane worktrees must be cut from the tranche head, not an ancestor.
6. **New finding — §6 abrogation-sweep blind spot**: the sweep validates subpath specifier resolution but not named-export existence; it is green despite the Tabs drift.

## §9 — Evidence artifacts
- Cured config: `git diff vite.config.ts` in the worktree (sole tracked change) · saved copy `scratchpad/vite.config.cured.ts`.
- Byte-parity: `scratchpad/q-baseline.sha` == `scratchpad/q-cured.sha` (71 files).
- dev cured PASS: `scratchpad/boot-q.log`. dev baseline FAIL (`/math` UNLOADABLE): `scratchpad/boot-baseline.log`.
- gh-pages/hero-lab: value.js-clean logs above; full-`✓ built` with the reverted Tabs stub (§4).
