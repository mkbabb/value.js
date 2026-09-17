SERVED MODEL: claude-opus-5[1m]

# X.KF.W4 `.b` — the merge-path lanes: G-KFW4-2 · G-KFW4-3 · G-KFW4-12 evidence

**Date** 2026-09-17 · **Substrate** `/Users/mkbabb/Programming/keyframes.js`, branch `master`,
`origin/master` `55e9bf0d`, this unit's commit **`fb509edd`** on `.a`'s `5388907b`.
Every figure double-run (RUN1 == RUN2). G-KFW4-11's evidence is in
`G11-oracle-addendum-2026-09-17.md` beside this file.

---

## G-KFW4-2 — the merge-path demo seat

### (a) The falsifier's own precondition, discharged FIRST

*"the first `--project demo` run's full pass/fail roster is written to `census-first-run.txt` before
the step is marked blocking"* — written at 16:30, before a byte of `ci.yml` or `vitest.config.ts` was
touched. ⟨`npx vitest run --project demo --reporter=verbose`⟩ → **27 files passed / 27 · 155 tests
passed / 155 · 0 failed · exit 0**, both runs. Roster + per-file test counts in `census-first-run.txt`
(sha256 `8688d9316402adfdac890607cba79295348960d25c8c8f51e7d78add52b81225`; SELF-COUNT over its own
settled bytes → 27 rows / 155 tests).
**NO RED among the 27 ⇒ the declared triumvirate trigger for the merge-path wiring DID NOT FIRE.**

**Artefact NAME COLLISION, declared (E-3)**: the spec names `census-first-run.txt` twice with two
different contents — G-KFW4-2's falsifier (this roster) and §Artefacts *"census-first-run.txt (the
three clauses, RED)"*, which is unit `.d`'s `scripts/gates/census.mjs` first run. This seat wrote the
artefact its own binding falsifier names. **`.d` executes later and must take a DISTINCT path**, or
the wave breaks its own G-KFW4-11 law *"ONE PATH, ONE WRITER, ONE CONTENT"*. Routed, not smoothed;
the note also rides inside `census-first-run.txt`'s own header so it cannot be missed.

### (b) The registration, and the falsifier that it is not a no-op

*"fails if it 'passes' with zero mounted SFCs (the plugin registration is asserted by mounting one)"*.

BEFORE: ⟨`git show origin/master:vitest.config.ts | grep -c plugins`⟩ → **0** — no `plugins` array at
all. AFTER: `plugins: [vue()]` at the config ROOT, so both projects inherit it through
`extends: true`.

**No in-tree spec mounts an SFC today** (⟨`git grep -nE 'from "[^"]*\.vue"' -- test/`⟩ → **0**; the two
`.vue` strings under `test/demo/` are `readFileSync` source-text pins, not imports), and SFC *runtime
loading* plus its `+@vue/test-utils` devDep are **KF.W8's** by the declared boundary (*"W4 owns SFC
type-checking and performs the plugin registration; W8 owns SFC runtime loading"*). So the assertion
was made **by measurement, writing no byte into the keyframes.js tree**: a probe config that imports
`/Users/mkbabb/Programming/keyframes.js/vitest.config.ts` and takes its `plugins` array **verbatim**,
against a probe spec that mounts a real demo SFC.

Subject: `demo/scenes/sequence/SequenceAxis.vue` — `<script setup lang="ts">` + a `v-for` template +
a scoped `<style>`, i.e. all three transforms at once.

| run | plugins | result |
|---|---|---|
| **POSITIVE** | the repo's own `plugins` array, verbatim | **1 passed (1)** — the SFC compiles, `createApp(...).mount()` renders **5** `.seq-axis-tick` nodes and their computed labels `["0","100","200","300","400"]` |
| **NEGATIVE CONTROL** | `plugins: []`, every other byte identical (bare `vue` aliased so the control cannot fail for a resolution reason instead of a transform one) | **1 failed** — `Error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.` |

The pair is the falsifier: with the registration an SFC mounts; without it the same file cannot be
parsed. **This commit (`fb509edd`) is the witness KF.W8's G10 leg (a) cites; W8 performs no
`vitest.config.ts` edit.** Three W8 gates (G10 leg (a), G11, G12) consume it as a dependency-cite.

### (c) The merge path

`ci.yml` BEFORE: `gates` = 4 library steps; `demo-correctness` behind
`if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'` with its own comment
*"it does not block library merges"*.

AFTER (YAML re-parsed from the settled bytes, not asserted):

```
jobs: gates, demo-correctness
gates steps: checkout · setup-node · npm ci · check library types · build library ·
             correctness suite · demo correctness suite (npm run test:demo) ·
             lint (source graph + SFC templates) (npm run lint) · publish boundary
demo-correctness if: <absent — the event gate is REMOVED>
demo-correctness name: "demo correctness (browser roster)"
record last-demo-green if: "success() && (github.event_name == 'push' || github.event_name == 'schedule')"
```

Both demo instruments now block a merge: the jsdom lane as a step of the library-gates job, the
browser roster as an ungated job that runs on `pull_request` and `push`. The `schedule`/`workflow_dispatch`
triggers survive for deploy ancestry, which is the one thing the nightly was genuinely for. The
deploy-ancestry tag step is scoped to `push`/`schedule` **by event, not by convenience**: on a
pull_request `github.sha` is the ephemeral merge commit and a fork PR's token carries no
`contents: write`, so tagging there would be false ancestry. The stale comments that asserted the
opposite are corrected in place — a phantom authority is exactly what this wave extinguishes.

`test:demo` (`vitest run --project demo`) is added to the `scripts` block, mirroring `test:lib` — the
§Bounds row opens `test:*` **for the merge-path wiring**, which is this.

### (d) Gate reading

| leg | BEFORE | AFTER |
|---|---|---|
| plugin registered | `grep -c plugins vitest.config.ts` → **0** | `plugins: [vue()]`, mount PROVED + falsified |
| demo lane on the merge path | nightly/dispatch only | `npm run test:demo`, blocking step of `gates` |
| `demo:correctness` on the merge path | `if: schedule \|\| workflow_dispatch` | event gate REMOVED; job blocks |
| the 27 | 27/155 pass, unrecorded | 27/155 pass, recorded before the wiring; re-run after: **27/155** |
| **G-KFW4-2** | **RED-AS-EXPECTED** | **GREEN** |

Collateral, re-measured after the registration: ⟨`npx vitest run --project library`⟩ → **98 passed |
5 skipped (103) · 1040 tests passed**; ⟨`npx vite build --mode gh-pages`⟩ → **exit 0**.

---

## G-KFW4-3 — ESLint + `eslint-plugin-vue` essentials

### (a) The chassis, landed

`eslint.config.js` created — flat, **`eslint-plugin-vue` ESSENTIALS ONLY**
(`pluginVue.configs["flat/essential"]`). No second tier, no extra plugin, no rule added by hand: a
wider ruleset is itself a failure of this gate. `lint` redefined `depcruise src` →
`depcruise --config .dependency-cruiser.cjs src demo && eslint demo`, and `npm run lint` is a blocking
step of the merge job.

**Two parser dependencies, declared rather than slipped in.** Both are parsers; **neither adds a
rule.**

1. **`vue-eslint-parser`** — a **required** (non-optional) peer of the authorized `+eslint-plugin-vue`.
   It was absent from `node_modules` and from the lock after `.a`'s add, and the reason is measured,
   not guessed: ⟨`cat .npmrc`⟩ → `legacy-peer-deps=true`, so npm **never** auto-installs peers in this
   repo. Under the repo's own npm law the authorized add is inert without it.
2. **`@typescript-eslint/parser`** — measured necessity, not preference. With `flat/essential` alone:
   ⟨`npx eslint demo`⟩ → **55 problems, every one a fatal `Parsing error`** on TS syntax inside
   `<script lang="ts">` (`Unexpected token :`, `Unexpected token !`, …) and **zero** template
   findings. A lint tier blind to its own subject is the by-construction pass G-KFW4-9 rule (e)
   convicts. It is declared for `**/*.vue` (as `parserOptions.parser`, the script-block parser) and for
   `**/*.ts` (so `--ext .ts,.vue` reads them); **no rule applies to `.ts` here** — `tsc`/`vue-tsc` own
   that surface.

### (b) The gate's own command, run — and the finding the spec's denominator did not hold

⟨`npx eslint demo --ext .ts,.vue`⟩ → **exit 1 · 10 problems (10 errors, 0 warnings) across 5 files**
(double-run):

| # | site | rule | message |
|---|---|---|---|
| 1 | `demo/scenes/cube/matrix-editor/MatrixEditor.vue:8:17` | `vue/require-v-for-key` | Elements in iteration expect to have 'v-bind:key' directives |
| 2 | `demo/components/instrument/transport/TransportDock.vue:124:45` | `vue/valid-v-for` | Custom elements in iteration require 'v-bind:key' directives |
| 3 | `demo/app/App.skeleton.vue:1:1` | `vue/multi-word-component-names` | Component name "App.skeleton" should always be multi-word |
| 4 | `…/channel-controls/TimingFunctionPanel.vue:137:9` | `vue/no-mutating-props` | Unexpected mutation of "storedAnimationOptions" prop |
| 5 | `…/channel-controls/TimingFunctionPanel.vue:139:9` | `vue/no-mutating-props` | Unexpected mutation of "storedAnimationOptions" prop |
| 6 | `…/channel-controls/TimingFunctionPanel.vue:144:5` | `vue/no-mutating-props` | Unexpected mutation of "storedAnimationOptions" prop |
| 7 | `…/channel-controls/TimingFunctionPanel.vue:152:5` | `vue/no-mutating-props` | Unexpected mutation of "animation" prop |
| 8 | `…/controls-pane/ControlsPaneWrapper.vue:51:58` | `vue/no-mutating-props` | Unexpected mutation of "animControlRefs" prop |
| 9 | `…/controls-pane/ControlsPaneWrapper.vue:264:5` | `vue/no-mutating-props` | Unexpected mutation of "storedControls" prop |
| 10 | `…/controls-pane/ControlsPaneWrapper.vue:294:9` | `vue/no-mutating-props` | Unexpected mutation of "storedControls" prop |

**Row 1 is ME-29, the gate's banked born-RED witness, reproducing exactly** (the rule anchors on the
`:8` element; the `v-for` attribute is `:11`, as §Bounds quotes it).

**Rows 2–10 are NINE findings the spec's witness column never held.** This is the R4-2 disease at a
second address: a gate whose denominator was one banked site, never re-derived at the frontier, and
the frontier holds ten. Seven of the nine are `vue/no-mutating-props` — **behavioural defects**, a
child writing through its parent's prop object, not hygiene.

### (c) The gate's GREEN is UNREACHABLE inside §Bounds — TRIUMVIRATE

Every one of the ten sites is under `demo/**`. Unit `.b`'s writable set is
`package.json` · `package-lock.json` · `.github/workflows/ci.yml` · `vitest.config.ts` ·
`.dependency-cruiser.cjs` · `eslint.config.js`. **No file above is in it**, and no other KF.W4 unit
carries them either: `.a` closed under R-10 (type-surface only — *"no template's rendered output may
change"*, which a `:key` addition and a prop-mutation cure both are not), `.c` holds ChannelOptions +
TimelineTrack, `.d` the citation targets, `.e` the easing carve. A registry sweep finds **zero**
routing: ⟨`grep -c 'no-mutating-props' KF-W4.md`⟩ → **0**, ⟨`grep -c 'App.skeleton' …`⟩ → **0**,
⟨`grep -c 'valid-v-for' …`⟩ → **0**.

**This is the born-RED-with-UNREACHABLE-GREEN class the §Gates head says it convicts**, arriving from
the witness column rather than from the tree, and reaching GREEN would require a write outside
§Bounds — the first §Sequencing triumvirate trigger, verbatim.

**What was NOT done, each a HIGH defect under standing law and each individually available**: no
`ignores` entry over the five files, no `rules: { "vue/no-mutating-props": "off" }`, no
`eslint-disable` comment, no `--max-warnings`, no severity downgrade, no `|| true` in the script, no
`known-violations` file. The gate is wired at full strength and reads RED.

**Consequence, stated plainly rather than discovered in CI**: `npm run lint` is a blocking merge step
and it exits non-zero today — at the depcruise arm (4 cycles, `&&` short-circuit) before it reaches
eslint. That is the designed born-RED state of a wave whose goal criterion is *"a `.vue` file can fail
a build, a demo test can block a merge"*; the cures belong to the packets and to KF.W6/KF.W7.

| | BEFORE | AFTER |
|---|---|---|
| `eslint.config.js` | ABSENT (`git cat-file -e` → fatal) | **created, essentials only** |
| `lint` | `depcruise src` | `depcruise --config .dependency-cruiser.cjs src demo && eslint demo`, on the merge job |
| `npx eslint demo --ext .ts,.vue` | **no gate can run it** | runs: **10 problems / 5 files**, ME-29 among them |
| **G-KFW4-3** | **RED-AS-EXPECTED** | **RED — WIRED, NOT GREEN · TRIUMVIRATE** |

---

## G-KFW4-12 — manifest hygiene

**LAW A census for `−monaco-themes`, re-run at this seat (inherited from nothing):**

1. **specifier census** ⟨`git grep -nF 'monaco-themes' -- src demo test scripts`⟩ → **4 lines, one
   file**: `demo/components/instrument/keyframes/CSSCodeEditor.vue` `:32`/`:33` (prose, the file
   explaining its own vendoring) and `:36`/`:37` `import DarkTheme from "./monaco-themes/Dracula.json"`
   / `import LightTheme from "./monaco-themes/GitHub.json"` — a **relative** specifier into a
   **VENDORED SIBLING DIRECTORY of the same basename**, verified present:
   ⟨`ls demo/components/instrument/keyframes/monaco-themes/`⟩ → `Dracula.json` `GitHub.json`. This is
   the same-basename trap R3-1 convicted at KF.W6.
2. **bare-package census** ⟨`git grep -nE 'from "monaco-themes|require\("monaco-themes|import\("monaco-themes'`⟩
   → **none**. 3. **config / npm-script census** → the only hit is the manifest line itself.
   **Consumer set of the PACKAGE = ∅.**

Deleted with `package-lock.json` regenerated **in the same commit** (`fb509edd`):
⟨`grep -c '"node_modules/monaco-themes"' package-lock.json`⟩ → **0**;
⟨`grep -c '"monaco-themes":' package.json`⟩ → **0**.
**Falsifier run, not assumed**: ⟨`npx vite build --mode gh-pages`⟩ → **exit 0** — the vendored JSONs
resolve and the demo builds without the package.

**Gate state**: the ACT is complete. The gate's *command* — `node scripts/gates/census.mjs
--clause manifest` — is **unrunnable at this seat by construction**: `census.mjs` is unit `.d`'s
`create` row (the spec's own *"author as ONE script, three separately-closing clauses"*). Booked
**ACT-COMPLETE · command DEFERRED to `.d`'s census.mjs**, not GREEN-by-assertion.

**Rider for `.d`'s clause C3**, measured here so it is not discovered at execution: clause C3 *"fails
when a declared devDependency has no import specifier, config reference, or npm script naming it"*.
This seat removed the one devDep §Bounds authorizes. `.d`'s C3 run over the remaining manifest is that
unit's denominator to publish; **no other devDep was deleted, because no other delete is in any
§Bounds row of this wave.**

---

## NO-SILENT-DELETION — the five opened scripts, after (R2-3, scope-extended at D-11)

⟨`sed -n '37p;38p;44p;45p;46p;47p' package.json`⟩ at the settled bytes:

```
"check": "vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure",
"check:lib": "tsc --noEmit -p tsconfig.lib.json",
"lint": "depcruise --config .dependency-cruiser.cjs src demo && eslint demo",
"test": "vitest",
"test:lib": "vitest run --project library",
"test:demo": "vitest run --project demo",
```

- `check` — **not touched by this unit** (`.a`'s form; the `&& npm run proof:structure` tail stands).
- `check:lib`, `test`, `test:lib` — **byte-identical to their `origin/master` before-forms**.
- `lint` — redefined, and the `depcruise` invocation **SURVIVES** (widened to `src demo`, config path
  made literal per R-8.4); `eslint` is an ADD. No live invocation was removed anywhere, by any script.
- `test:demo` — an ADD, the merge-path wiring the §Bounds row opens `test:*` for.

## Prettier, measured before it was run

⟨`npx prettier --check`⟩ over the six touched files flags **2**: `vitest.config.ts` and
`.dependency-cruiser.cjs`. Both fail **identically at `origin/master`**, verified by formatting
pristine `git show` copies with the repo's own `.prettierrc.json`: `vitest.config.ts`'s two
`path.resolve(…)` wraps (`@composables`, `@kf-engine`) and `.dependency-cruiser.cjs`'s one
quote-style line in rule 3's comment. **This seat's edits introduce ZERO new drift**, and
`eslint.config.js`, `package.json` and `ci.yml` are clean. Reformatting the pre-existing lines would
be an unrelated write dressed as cadence, so it was not done.

## What this unit did not touch

`scripts/dev/dev.sh` (value.js, never touched, never staged) · the four untracked `src/` files of
F-1 (not deleted, edited, `.gitignore`d, moved or gate-wrapped) · `.npmrc` (measured, not modified) ·
any glass-ui byte (READ-ONLY always) · any `demo/**`, `src/**`, `test/**` or `scripts/**` file ·
`tsconfig*.json` · any other unit's row.
