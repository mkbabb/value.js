# CROSS seat — CONSUMER TRUTH (import graph AND registry)

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]`. This is a
declared Opus seat; no Fable, no Sonnet.

**Scope:** value.js `@ tranche-u`, HEAD `c654824e`. Audit-only. No file outside
`docs/tranches/W/audit/history/` was written. `src/`, `demo/`, `api/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh`, and every `INBOX.md` untouched — verified by writing exactly one file.

**Date of measurement:** 2026-07-24.

---

## 0. Headline

Both axes were established independently. **They disagree, and the disagreement is the finding.**

The registry says `@mkbabb/value.js@4.0.0` is a zero-dependency, seven-subpath, root-export-less
package. The repository at HEAD says it is a two-runtime-dependency package. Both call themselves
4.0.0. Meanwhile the single most-consumed export in the whole surface — `parseCssColor`, imported
by published glass-ui 7.0.0 — **throws a raw `TypeError` on an entire class of legal CSS input in
the immutable published artifact**, and the CI gate that certifies the packed surface asserts that
`parseCssColor` *exists* without ever *calling* it.

Nine of eighteen probed color-function inputs crash. The library's own `package.json` description
is "Immutable, **failure-explicit** CSS color…".

---

## 1. Import graph — every sibling consumer, measured

Command: recursive `find … -name package.json -not -path '*/node_modules/*'` over
`/Users/mkbabb/Programming/`, then `grep -l '"@mkbabb/value.js"'`. Subpath usage measured by
`grep -rhoE '@mkbabb/value\.js(/[a-z]+)?'` over each consumer's `src/`.

### 1a. LIVE consumers (on value 4.x)

| Consumer | Path | Branch | Pin | Lock | Subpaths imported | All resolve in 4.0.0? |
|---|---|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | `master` | `^4.0.0` (dev **and** peer, `package.json:530`, `:567`) | `4.0.0` | `/color` (13) · `/css` (7) · `/easing` (3) | **YES** |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | `master` | **`4.0.0` exact** (`package.json:69`) | `4.0.0` | `/css` (46) · `/math` (41) · `/value` (29) · `/easing` (19) · `/color` (12) · `/transform` (2) | **YES** |
| **atlas (ACTIVE)** | `/Users/mkbabb/Programming/.p-totality/atlas` | **`p/totality`** | `^4.0.0` dep + `4.0.0` lock (`:114`, `:142`) | `4.0.0` | `/math` (16) · `/easing` (9) · `/color` (1) | **YES** |
| **sci (dashboards)** | `/Users/mkbabb/Programming/.p-totality/sci/dashboards` | `p/totality` | **`4.0.0` exact** (`:20`) | — | none found in tree | n/a |

### 1b. STALE consumers (pinned to pre-4.x; would BREAK on bump)

| Consumer | Pin | Import shape | Status against 4.0.0 |
|---|---|---|---|
| **fourier-analysis/web** | `^0.13.0` (`web/package.json:18`) | **13 bare-root** `from "@mkbabb/value.js"` | **HARD BREAK** — see §1c |
| **atlas (standalone checkout)** | `^3.1.0` (`:124`), lock `3.1.0` (`:147`) | — | stale worktree of the *same* repo as `.p-totality/atlas` (`git rev-parse --git-common-dir` → `/Users/mkbabb/Programming/atlas/.git`). Confirms the task's disambiguation. |
| **sci-report/dashboards** (`feat/tranche-k-arc`) | `3.1.0` exact, glass-ui `6.0.0`, kf `5.3.5` (`:17-20`) | — | **NOT crossed.** See finding F-9. |
| **muster/frontend** | `^0.10.0` (`:20`) | — | stale |
| **bbnf-buddy** | `^0.10.0` (`:25`) | — | stale |
| **speedtest** | `^0.13.0` (`:95`) | — | stale |
| **words/frontend/glass-ui** | `^0.10.0` (`:553`) | — | a **vendored fork of glass-ui inside `words/`**, four majors behind. Not on any tranche ledger. |

### 1c. Live resolution probe — the actual export map, exercised

Run from `/Users/mkbabb/Programming/glass-ui` (which has the real published 4.0.0 installed):

```
FAIL @mkbabb/value.js           -> ERR_PACKAGE_PATH_NOT_EXPORTED
OK   @mkbabb/value.js/color     -> exports: 23
OK   @mkbabb/value.js/css       -> exports: 19
OK   @mkbabb/value.js/easing    -> exports: 16
OK   @mkbabb/value.js/math      -> exports: 9
OK   @mkbabb/value.js/transform -> exports: 9
OK   @mkbabb/value.js/quantize  -> exports: 2
OK   @mkbabb/value.js/value     -> exports: 1
FAIL @mkbabb/value.js/units     -> ERR_PACKAGE_PATH_NOT_EXPORTED
FAIL @mkbabb/value.js/parsing   -> ERR_PACKAGE_PATH_NOT_EXPORTED
FAIL @mkbabb/value.js/browser   -> ERR_PACKAGE_PATH_NOT_EXPORTED
FAIL @mkbabb/value.js/node      -> ERR_PACKAGE_PATH_NOT_EXPORTED
```

**The absent root is DELIBERATE and gated** — `scripts/ci/verify-packed-surface.mjs:119-121`
asserts `@mkbabb/value.js`, `/parsing`, `/units` must throw `ERR_PACKAGE_PATH_NOT_EXPORTED`.
Good gate. It is the reason fourier-analysis is permanently frozen: its 13 bare imports
(`web/src/components/equation/ConvergencePlot.vue:5`,
`web/src/components/equation/composables/useCurveTransition.ts:8`,
`web/src/components/equation/lib/harmonics.ts:5`, `web/src/lib/easings.ts:9` and `:16`) can never
be satisfied by any 4.x. `web/src/lib/easings.ts:9` additionally imports `timingFunctions`, a
symbol that does not exist anywhere in the 4.0.0 surface.

**False alarm cleared:** glass-ui's references to `/units`, `/parsing`, `/browser` live *only* in
`tests/scripts/profile-bundle-value-js.test.ts:60-64`, in the **rejected** list of a negative
census test. Not defects.

**Named-consumer correction:** the record names `colors` as a consumer. `/Users/mkbabb/Programming/colors`
is `@mkbabb/colors@1.0.1` with **no `dependencies` block at all** and zero `mkbabb`/`value.js`
references in `src/` or `test/`. It is not a value.js consumer and never was. The record row is wrong.

---

## 2. Registry truth

```
npm view @mkbabb/value.js     dist-tags → {"latest":"4.0.0"}   32 versions, 0.1.0 → 4.0.0
npm view @mkbabb/glass-ui     dist-tags → {"latest":"7.0.0"}   30 versions
npm view @mkbabb/keyframes.js dist-tags → {"latest":"6.0.0"}   26 versions
npm view @mkbabb/value.js dependents → (empty; npm does not serve it for this registry)
```

`@mkbabb/value.js@4.0.0` published **2026-07-16T12:21:06.985Z**. `dist.unpackedSize` 128 983 B,
`fileCount` 20, 10 `.js` files.

### 2a. Declared vs installed vs locked — value.js's own deps

| | `@mkbabb/glass-ui` | `@mkbabb/keyframes.js` |
|---|---|---|
| HEAD `package.json` `dependencies` | `^7.0.0` | `^6.0.0` |
| `package-lock.json` (v3) | `7.0.0`, `glass-ui-7.0.0.tgz` | `6.0.0`, `keyframes.js-6.0.0.tgz` |
| `node_modules` installed | `7.0.0` | `6.0.0` |
| **npm latest** | `7.0.0` | `6.0.0` |

Declared / installed / locked / registry: **fully consistent.** That axis is clean.

`package-lock.json` also carries `node_modules/@mkbabb/value.js -> 4.0.0` (the self-alias
resolution), matching the registry.

---

## 3. FINDINGS

### F-1 · BLOCKER · `parseCssColor` throws a raw TypeError in the immutable published 4.0.0

Probed against the real installed tarball, from `/Users/mkbabb/Programming/glass-ui`:

```js
import('@mkbabb/value.js/css').then(m => m.parseCssColor('oklch()'))
// TypeError: Cannot read properties of undefined (reading 'replace')
```

Full probe, 18 inputs, **9 throw**:

```
THROW "hsl()"    THROW "lab()"    THROW "color()"   THROW "rgba()"
THROW "hwb()"    THROW "oklab()"  THROW "lch()"     THROW "xyz()"
THROW "rgb(   )"
```

This is not one bad input; it is the entire **empty-argument color-function class**. Every
`<fn>()` form crashes. The contract is `ParseResult<CssColor>` — a `Result`. It returns
`{ok:false}` correctly for `color-mix(in oklab, red, blue)`, `oklch(from red l c h)`,
`light-dark(red,blue)`. It **throws** for `oklch()`.

**Source site:** `src/css/grammar.ts:181`

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

`splitTopLevel("", "/")` returns `[]` (`src/css/grammar.ts:63-80` — the loop never executes and
the trailing push is guarded by `if (part)`). So `slash[0]` is `undefined` and the `!` is a lie.

**Aggravating factor — the type system caught this and was overridden.**
`tsconfig.base.json:10` sets `"noUncheckedIndexedAccess": true`. Under that flag `slash[0]` is
`string | undefined` and the code does not compile. The `!` at `grammar.ts:181` is the sole reason
it does. `eslint.config.js` has **no** `@typescript-eslint/no-non-null-assertion` rule (grep for
`non-null` returns zero hits), so nothing structural stops it. There are 4 such assertions in
`src/css/grammar.ts`, 6 in `stylesheet.ts`, 2 in `timeline.ts`.

**Blast radius:** `parseCssColor` is imported by published **glass-ui 7.0.0**
(`src/composables/color/value.ts:12`, `accent-tone-solve.ts:14` via `serializeCssColor`,
`components/easing/composables/useEasingPicker.ts:30` via `parseTimingFunction`) and by value.js's
own tests. glass-ui feeds it user/theme-supplied color strings.

This is memory's "R1 = live `parseCssColor("oklch()")` shipping crash". **It is still live in the
immutable published artifact, eight days after the parser-proof gate recorded it.**

**Test coverage:** `grep -rnE '"(oklch|rgb|hsl|lab|lch|oklab|hwb)\(\s*\)"' test/` → **zero hits**.
23 `parseCssColor` references across `test/`; not one exercises the crashing class.

---

### F-2 · BLOCKER · The packed-surface gate is name-only — it can never catch F-1

`scripts/ci/verify-packed-surface.mjs` is the release gate (`.github/workflows/ci.yml:49-50`). It
does real work: installs the actual tarball into a temp workspace (`:66-74`), asserts the exact
`exports` map byte-for-byte (`:86-88`), type-checks a consumer fixture under
`strict`+`NodeNext`+`skipLibCheck:false` (`:96-107`), asserts the exact runtime export *names* per
subpath (`:111-117`), and asserts the three forbidden specifiers throw (`:119-131`).

**What exact input would make it RED?** Renaming an export, adding one, changing the export map,
adding a root export, breaking a `.d.ts`. All real.

**What it cannot catch:** any behaviour. It reads `Object.keys(await import(...))` and stops. It
never invokes a single export. `parseCssColor` is asserted *present*; the packed artifact where it
throws on `oklch()` passes this gate green.

The W44 close (`docs/tranches/V/reformation/CARRY-LEDGER.md` §F) quotes this gate as the release
evidence, verbatim: `packed surface 23/1/19/16/9/9/2·62`. All eight numbers match my independent
measurement — **except the last one is not a measurement.**

---

### F-3 · MAJOR · `strictTypes: 62` is a hardcoded literal printed as if measured

`scripts/ci/verify-packed-surface.mjs:139`:

```js
process.stdout.write(`${JSON.stringify({ runtime, strictTypes: 62 })}\n`);
```

`62` is a source literal. `runtime` is genuinely computed; `strictTypes` is not derived from the
fixture, the tarball, or anything else. Add a type, remove a type, delete
`fixtures/public-types/value-v4.ts` entirely — this line still prints `62`.

I measured the real type count independently (parse of `src/subpaths/*.ts` `export type {}` blocks):
**62.** It happens to be right today. It is still a number that cannot go RED, and it was quoted
into CARRY-LEDGER §F as the `·62` in the evidence tuple. **Vacuous by construction.**

---

### F-4 · BLOCKER · The boot-truth gate was un-wired and deleted; the defect class it defended recurred within 19 hours

Timeline, all commits verified with `git show -s --format='%h %ci %s'`:

| When | Commit | What |
|---|---|---|
| 2026-06-11 18:43 | `d9c3b9f2` | N.W1 **adds** `scripts/ci/boot-smoke.mjs` + wires it into `ci.yml` (inv-N-1) |
| 2026-07-17 **03:19** | `164343c1` | v4 producer surface — **removes `boot-smoke` from `ci.yml`**, replaced by the packed-surface gate |
| 2026-07-17 **11:00** | `6d6d3521` | W42 **deletes** `scripts/ci/boot-smoke.mjs` (160 L) + `css-emission-probe.mjs` (171 L), labelled *"prune proof-theater, orphaned probes"*, justification in the commit body: `boot-smoke.mjs (CI-orphaned; W44 routed-mount witness supersedes)` |
| 2026-07-17 **22:12** | `91fa1368` | W44 closes **GREEN-WITH-RESIDUALS** — and books, in CARRY-LEDGER §F: *"**Deep-audit item — gh-pages prod-preview empty mount:** the PRODUCTION build previewed at a bare 127.0.0.1 origin **mounts empty**"* |

The deleted script's own docstring (`git show 6d6d3521^:scripts/ci/boot-smoke.mjs`) states its
purpose in as many words:

> "the **structural defeat of the white-screen failure class** N restored from … so vitest/lint/
> typecheck all stay green while the live demo white-screens. This gate runs the real runtime path,
> cold, and fails loud."

Nineteen hours after it was deleted, the production build mounted empty — a white screen — and
that was recorded as a *carry*, not a RED. The "CI-orphaned" label is factually true
(`git show 6d6d3521^:.github/workflows/ci.yml | grep boot-smoke` → no hits), which makes it worse:
the gate was silently un-wired at `164343c1` eight hours earlier *in the same day*, then deleted as
orphaned. The successor named in the deletion rationale, the "W44 routed-mount witness," ran
against **dev** only; §F's own text concedes *"dev witness green and canonical"* while production
is empty. **Per-mechanism green, gestalt broken.**

---

### F-5 · MAJOR · Published 4.0.0 and HEAD both claim `4.0.0` with different manifests — and the delta is a dependency cycle

Diffed the installed published manifest against HEAD:

```
both declare version: 4.0.0 4.0.0
  DIFF dependencies: published=null | HEAD={"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}
  DIFF scripts:      published has boot-smoke + css-emission-probe; HEAD has neither
```

The published 4.0.0 has **no `dependencies` and no `peerDependencies`** (`npm view @mkbabb/value.js@4.0.0`
→ `deps: None`, `peer: None`). The two runtime deps were added at `f2c8f565` (2026-07-17 22:05),
**thirty-four hours after 4.0.0 was published**. Version identity is therefore broken: the string
`4.0.0` names two different manifests.

The delta is not cosmetic. On the next publish:

1. **`@mkbabb/keyframes.js@^6.0.0` is a phantom runtime dependency.**
   `grep -rn '@mkbabb/keyframes' . --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git`
   excluding `docs/` returns **only `package.json:84` and six `package-lock.json` lines**. Zero
   imports in `src/`, zero in `demo/`, zero in `test/`. It is declared and never used.

2. **`@mkbabb/glass-ui@^7.0.0` is a demo-only dependency declared as a runtime dependency.**
   `grep -rn '@mkbabb/glass-ui' src/` → **zero hits** (the published library never touches it;
   `tsconfig.lib.json:1-12` and `eslint.config.js` `no-restricted-imports` structurally forbid it).
   82 files under `demo/` use it. Shipping it in `dependencies` means every consumer of value.js
   installs an entire Vue component library it cannot use.

3. **It closes a dependency cycle.** glass-ui 7.0.0 declares `"@mkbabb/value.js": "^4.0.0"` in
   `peerDependencies` (`glass-ui/package.json:567`). value.js HEAD declares
   `"@mkbabb/glass-ui": "^7.0.0"` in `dependencies`. value.js → glass-ui → (peer) value.js.

The packed-surface gate cannot see this: it asserts the `exports` map, never the `dependencies`
field. `verify-packed-surface.mjs` would pass a tarball that ships glass-ui as a runtime dep.

---

### F-6 · MINOR · Published 4.0.0 declares two `scripts` whose files no longer exist

`npm view @mkbabb/value.js@4.0.0` carries `"boot-smoke": "node scripts/ci/boot-smoke.mjs"` and
`"css-emission-probe": "node scripts/ci/css-emission-probe.mjs"`. Both files were deleted at
`6d6d3521`. `ls scripts/ci/` → only `verify-packed-surface.mjs`. Severity is low only because
`"files": ["dist", …]` never publishes `scripts/`, so they were unrunnable from a tarball anyway —
which is itself the point: they were dead metadata in the shipped manifest.

---

### F-7 · MAJOR · The Glass 8 question — v8 is NOT imminent, nothing has shipped, both holds are CORRECT

Measured at `/Users/mkbabb/Programming/glass-ui`, branch `master`, HEAD `0371836d`.

**Version:** `package.json:3` → `"version": "7.0.0"`. The working tree is dirty (22+ modified
files incl. `package.json`), but `git diff package.json` shows **no version change** — the diff adds
a `verify:governed` script, `@vue/compiler-sfc`, `postcss`. **There is no v8 in the tree.**

**Is a cut imminent? No.** `docs/tranches/BJ/EXECUTION-PROGRESS.md:244`:

> `| P-CLOSE-BATTERY | PLAN §7 whole: … the 8.0.0 cut + tag-push provenance publish (authorized) | QUEUED |`

And the phase in front of it, `:239`:

> `| P-EX1 | BAND-GATES FIRST … | **REOPENED ACCEPTANCE-RED 2026-07-22.** … remains historical progress, not a 5-of-5 close.`

Rows P-EX1 (RED), P-EX2, P-EX3, P-EX4, P-EX5 are all QUEUED or REOPENED-RED ahead of the 8.0.0
cut. P-EX2 (`:240`) names an entire un-run band pipeline: DOC-TRUTH · COLOCATION · REDUCTION ·
STORY · PERF · MATERIAL · A11Y · FEEDBACK-MOTION.

**Has anything shipped that Value must consume? No — and I verified both holds mechanically.**

*W4 slider typed-track-seam.* The producer cut landed in glass-ui **source** at `abb1eba2`
(2026-07-22, "land BJ.W4-TYPEDSEAM producer cut — typed track seam, no generic `--track-bg`"). It
is present at `src/components/slider/Slider.vue:302` and `:498`. It is **absent from published
7.0.0**: `grep -c 'glass-slider-track-background' node_modules/@mkbabb/glass-ui/dist/glass-ui.css` → **0**.
Published 7.0.0 still reads `var(--slider-track-bg, var(--muted-medium))` / `var(--secondary))`.
Value's four receivers all still feed `--slider-track-bg` and are therefore **correctly wired
against the shipping contract**. Hold is correct; no action possible.

*W8 refract-state.* `armGlassRefract` exists in glass-ui source
(`src/composables/glass/supportsBackdropRefract.ts:143`, re-exported at
`src/composables/glass/index.ts:38`) but is **absent from published 7.0.0**:
`grep -c 'armGlassRefract' node_modules/@mkbabb/glass-ui/dist/glass-ui.js` → **0**, and
`'armGlassRefract' in m` on the published root export → `false`. Furthermore
`git diff --stat src/composables/glass/supportsBackdropRefract.ts` shows **37 insertions
uncommitted** — part of the mechanism is not even in glass-ui's git history yet. Hold is correct;
no action possible.

**§D's own claims verified — and they hold.** The four pinned receiver SHA-256s in
CARRY-LEDGER §D match byte-for-byte:

```
a61b5ed39703af205d6ba0f4923d32daeaaf55cf9c2e21e22030a01fa82ef327  demo/picker/controls/ComponentSliders/ComponentSliders.vue
e4ae64e6a5b1e30082cde67d7313cdc7be2da01b0357aab62b517933d8d58b2d  demo/scenes/ConfigSliderPane.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

§D's W8 claim that *"Value's actual browser root is `demo/color-picker/index.html:205–213`; it
currently contains neither an `armGlassRefract` call nor an HMR disposer"* is **exactly true** —
lines 205-213 are the `createApp`/`router`/`mount("#app")` block, and
`grep -rn 'armGlassRefract' demo/ src/` returns nothing.

Both declared reference tags exist: `git tag -l` shows `v-blob-b0-26-ref-w40` and
`v-perceived-space-plate-ref-w40`. **No declared-capture-missing in §D.** §D is the most honest
document I read in this audit.

---

### F-8 · MAJOR · §D's cascade-closure precondition is FALSIFIED — and it is a four-close chronic

CARRY-LEDGER §D conditions the retirement of Value's duplicate blur rule on:

> "retire the duplicate spectrum-range blur rule in `demo/styles/foundation.css` only after **both
> installed public CSS entries** retain `backdrop-filter:none` **plus** `-webkit-backdrop-filter:none`"

Measured against installed glass-ui 7.0.0. The exact rule in `dist/glass-ui.css`:

```css
.glass-slider[data-variant=spectrum] .slider-range[data-v-4f4cab01]{-webkit-backdrop-filter:none;box-shadow:none;background:0 0}
```

**Only the `-webkit-` leg.** The unprefixed `backdrop-filter:none` is still dropped by
minification. (`grep -c 'backdrop-filter:none'` returns 1 — that hit is the *substring* of
`-webkit-backdrop-filter:none`; the standalone declaration does not exist.)

The second public CSS entry is worse. `./styles` → `dist/styles/index.css`:

```
grep -c 'backdrop-filter:none'         dist/styles/index.css → 0
grep -c -- '-webkit-backdrop-filter:none' dist/styles/index.css → 0
```

**Neither leg. Both preconditions RED.**

Value's restatement at `demo/styles/foundation.css:571-574` is therefore **still load-bearing**.
Its own comment dates the diagnosis:

> `/* MARKER (S owner-ruling 2026-07-05, alpha-checker lane) … Retire when the glass-ui dist keeps
> the unprefixed leg (reported; the W8 /slider consume is the checkpoint). */`

**Chronic:** ruled at **S** (2026-07-05) → rode **T** → rode **U** → rode **V** (W44) → re-booked
in V's CARRY-LEDGER §D as a *v8-gated* condition. Four closes, still undecided, and the gating
condition has now been renamed from "the W8 /slider consume" to "both installed public CSS entries."
Same defect, new name, new gate. **DISEASE ROW.**

Note also the specificity: glass-ui's rule carries `[data-v-4f4cab01]` (SFC-scoped, 0-4-0); Value's
restatement is `.glass-slider[data-variant="spectrum"] .slider-range` (0-3-0) — **lower**. It works
only because glass-ui never declares the unprefixed property at all. If glass-ui 8 ships the
unprefixed leg *inside* the scoped rule, Value's lower-specificity restatement loses and the
retirement becomes mandatory-and-silent rather than optional.

---

### F-9 · MAJOR · The `I-8` downstream posture is branch-dependent and stale as written

CARRY-LEDGER §B, W56 row:

> "**I-8 posture:** active atlas already migrated — zero atlas work; **sci-report crosses
> ATOMICALLY at its glass-7 consume, no early bump**"

Half true, half falsified, depending on which checkout you look at:

- `/Users/mkbabb/Programming/.p-totality/sci/dashboards/package.json:17-20` (branch `p/totality`)
  → glass-ui `7.0.0`, keyframes `6.0.0`, value `4.0.0`. **Already crossed.**
- `/Users/mkbabb/Programming/sci-report/dashboards/package.json:17-20` (branch
  `feat/tranche-k-arc`, HEAD `da1e3763`) → glass-ui `6.0.0`, keyframes `5.3.5`, value `3.1.0`.
  **Not crossed. Three majors behind on value.**

Both are the same repository at different branches. The ledger row names a single "sci-report"
without naming a branch, so it is simultaneously discharged and outstanding. A carry row that
cannot be evaluated without a branch qualifier is not a carry row; it is an ambiguity.

Same class for atlas: the standalone `/Users/mkbabb/Programming/atlas` checkout sits at `^3.1.0`
while its `p/totality` worktree sits at `4.0.0`. The task's disambiguation is confirmed correct —
but note the *active* atlas is at `/Users/mkbabb/Programming/.p-totality/atlas`, a **git worktree
of `atlas.git`**, not a subtree of `sci-report`. `sci-report/atlas/` on `feat/tranche-k-arc`
contains **only `docs/`** — no `package.json`, no source. The record's "sci-report atlas subtree"
phrasing does not describe anything on disk.

---

### F-10 · MAJOR · Re-booked chronics across the whole tranche arc

`grep -rl <name> docs/tranches/` reduced to tranche letters:

| Ask | Tranches it appears in | Closes ridden |
|---|---|---|
| **`sampleColorRamp`** | **N · O · Q · R · T · U · V · W** | **8** |
| **`mixColorsInto`** | **O · Q · R · S · V · W** | **6** |
| `toRgba8Into` | V · W | 2 |
| `sampleBezier` | D · V | 2 |

`sampleColorRamp` first appears at tranche **N** (June 2026, `docs/tranches/N/waves/N.W11.md`,
`N.W18.md`, `scratch/VJ.W2-N.W11.D-sampleColorRamp.md`) and is still an open ask in
`docs/tranches/V/coordination/keyframes-inbox-2026-07-18-vnext-formation-handoff.md:261`
(`| 5 | R-RAMP | sampleColorRamp/At/Into + mixColorsN; …`). Eight tranche letters. Memory's own
entry records it as "sampleColorRamp M.W7 book dischargeable-on-adopt" — booked at M, still not
discharged at V.

`mixColorsInto`/`toRgba8Into` are the D54/SCI-1 "SHIP-4.1.x" ruling
(`docs/tranches/V/DECISIONS.md:82`) — the *sole* ship out of 8 covenant rows, and it is
**"un-dated, execution-gated"**, riding the W56 release row which is itself unexecuted. A ship
ruling with no date attached to an unexecuted wave is a deferral wearing a ship label.

**These two are the highest-value rows in this report for the next tranche.**

---

### F-11 · INFO · Zero-external-consumer export census

Measured: every `import { … } from "@mkbabb/value.js/<sub>"` across glass-ui/src,
keyframes.js/src, and .p-totality/atlas/src, matched against the 79 runtime exports.

**41 of 79 runtime exports have at least one external consumer. 38 have none.**

Per subpath, external-consumer coverage:

| Subpath | runtime exports | with ≥1 external consumer |
|---|---|---|
| `/color` | 23 | 9 |
| `/css` | 19 | 17 |
| `/easing` | 16 | 9 |
| `/math` | 9 | 4 |
| `/transform` | 9 | **1** (`PathGeometry`, keyframes.js only) |
| `/value` | 1 | 1 |
| `/quantize` | 2 | **0** |

The 38 with zero external consumers:

```
color/    a98Rgb displayP3 hsl hsv hwb ictcp jzazbz kelvin lab lch
          linearSrgb prophotoRgb rec2020 xyz
css/      collectDeclarations parseCssValue
easing/   easeInBounce easeInOutCirc easeInOutExpo easeInOutQuad
          easeInOutSine easeOutCubic linear
math/     logerp deCasteljau cubicBezier interpBezier cubicBezierToString
quantize/ dominantColor quantizePixels
transform/ decomposeMatrix2D decomposeMatrix3D recomposeMatrix2D
          recomposeMatrix3D slerp interpolateDecomposed
          getTotalLength getPointAtLength
```

Caveats, honestly stated: `/quantize` has a real *internal* consumer
(`demo/workbenches/extract/quantize-worker.ts:6`) and a test (`test/v4-quantize.test.ts`), so it is
demo-load-bearing, not dead. **`/transform`'s six decompose/recompose/slerp exports have no
consumer anywhere except `test/transform/decompose-targeted.test.ts` and `test/v4-c1.test.ts`** —
`grep` for them across `demo/` returns nothing. Six public exports whose only caller is their own
test suite is the sharpest candidate for retirement in the next tranche.

---

## 4. The "52-export surface" — resolved

**The surface is not 52. It is 141 (79 runtime + 62 types) across 7 subpaths.**

Measured by parsing `export type { … }` and `export { … }` blocks in `src/subpaths/*.ts`,
cross-checked against a live `Object.keys(await import(...))` on the installed 4.0.0:

| Subpath | types | runtime | total | runtime count confirmed live |
|---|---|---|---|---|
| `color` | 11 | 23 | 34 | ✅ 23 |
| `css` | **33** | **19** | **52** | ✅ 19 |
| `easing` | 5 | 16 | 21 | ✅ 16 |
| `math` | 0 | 9 | 9 | ✅ 9 |
| `quantize` | 3 | 2 | 5 | ✅ 2 |
| `transform` | 6 | 9 | 15 | ✅ 9 |
| `value` | 4 | 1 | 5 | ✅ 1 |
| **TOTAL** | **62** | **79** | **141** | |

**Where "52" comes from:** it is the `/css` subpath **alone** — 33 types + 19 runtime = 52.
`docs/tranches/V/coordination/value-inbox-2026-07-20-parser-proof-evidence.md:18` says so
explicitly: *"frozen 52-export surface 0 TOTAL/3 PARTIAL/16 ABSENT runtime **+ 33 types**"* —
19 runtime (0+3+16) plus 33 types.

**The lie is in the propagation, not the origin.** The origin document is precise. But
`value-inbox-2026-07-20-pi-minitranche-notice.md:13` then writes *"the C14 mirror carried to the
frozen 52-export **/css surface**"* while
`value-inbox-2026-07-20-bbnf-coordination.md:18` writes *"the complete L4 grammar, not just the
frozen 52-export contract"* — dropping the `/css` qualifier. By the time it reaches the task brief
it reads as "value.js's 52-export surface", which understates the real public surface by **2.7×**.
Anyone sizing a migration, a codemod, or a coverage denominator off "52" is planning against 37%
of the actual API.

The **7 subpath entries** in `package.json#exports` are exhaustively:
`./color ./value ./css ./easing ./math ./transform ./quantize`. **No `"."` root.** No `main`, no
`module`, no `types` at top level (verified on the published manifest).

---

## 5. Where the two axes AGREE

Stated for completeness — these are the parts that are genuinely sound and should not be re-litigated.

1. Registry `latest` = repo HEAD version = installed = locked, for all three packages
   (value 4.0.0 / glass-ui 7.0.0 / keyframes 6.0.0).
2. The published tarball's `exports` map matches `src/subpaths/` exactly — 7 entries, all 14
   `dist/subpaths/*.{js,d.ts}` files present on disk in the installed package.
3. Every subpath any live consumer imports resolves. Zero broken subpath imports among
   glass-ui, keyframes.js, and the active atlas.
4. The absent root export is intentional, documented, and gated.
5. CARRY-LEDGER §D's four SHA-256 receiver pins, its `index.html:205-213` claim, and both
   reference tags all verify. No declared-capture-missing in §D.
6. `verify-packed-surface.mjs` is a real gate for surface *shape*. It is not theatre. It is
   simply the wrong instrument for behaviour, and was quoted as if it were both.

---

## 6. What I could not verify

- **`npm view @mkbabb/value.js dependents`** returns empty. The registry does not serve a
  dependents list for this scope. The import graph in §1 is therefore the only dependents truth
  available, and it is bounded by `/Users/mkbabb/Programming/` at depth 4. **UNVERIFIED:** whether
  any consumer exists outside this machine. Would be verified by an npm registry search API query
  or a GitHub code search for `@mkbabb/value.js`.
- **Whether the gh-pages prod-preview empty mount (F-4) is still live at HEAD.** I did not build
  or serve — that is out of scope for a read-only cross seat and belongs to the gestalt/browser
  seat. Would be verified by `npm run gh-pages && npx serve dist -l 127.0.0.1:PORT` and checking
  `#app` innerHTML plus `pageerrors`.
- **Whether glass-ui's 22 dirty working-tree files contain a v8 version bump staged elsewhere.**
  I read `git diff package.json` (no version change) and `EXECUTION-PROGRESS.md` (8.0.0 QUEUED).
  Would be falsified by a `git stash list` entry or an unpushed branch I did not enumerate.
