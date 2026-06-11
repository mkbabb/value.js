# N.W1.B — CI boot-smoke + the standing abrogation sweep (impl lane report)

**Lane**: N.W1.B · **Date**: 2026-06-11 · **Branch**: `tranche-f-handoff`
**Invariants**: inv-N-1 (boot-truth) + inv-N-10 (abrogation-truth)
**Ownership**: `.github/workflows/ci.yml` · new scripts under `scripts/` — ONLY.
(I did NOT touch `e2e/**` — W1.D owns it; the boot-smoke is a standalone node script, not a
playwright spec. The `package.json` `scripts` block got two additive entries to wire the new
scripts — that is the npm-wiring for files I own, intrinsic to "wire as a CI job.")

---

## §0 — One-paragraph outcome

Both inv-N-1/inv-N-10 structural gates are authored, run, and CI-wired. **`scripts/boot-smoke.mjs`**
spawns the demo dev server on a **cold** vite dep-optimizer cache (`vite --force`), drives it headless
(playwright chromium), and asserts the pane-shell `role="main"` landmark renders with a console clean
of value.js-origin errors — **PASS (exit 0)** locally; a negative-control proof confirms it rejects a
white-screen + a synthetic console error (not a vacuous pass). **`scripts/abrogation-sweep.mjs`** runs
the ledger §4 steps 1–2: the exports-map diff is **clean** (all 13 distinct `@mkbabb/glass-ui/<subpath>`
specifiers across demo/ resolve to live `package.json#exports` keys), and the retired-classes sweep is
**RED (exit 1)** on exactly the expected phantom-class hits. The **typecheck** gate (W1.C retired
`scripts/check-types.mjs`; it is now the plain `vue-tsc -p tsconfig.{lib,demo}.json --noEmit` two-leaf
gate) is **green (exit 0)** against the dts-complete glass-ui dist and is wired blocking. The CI's
glass-ui checkout is now **built from source** (its `dist/` is a gitignored artefact — a fresh checkout
ships zero dist) in all three jobs, making the typecheck/boot-smoke/gh-pages gates meaningful.

---

## §1 — Expected-red, stated plainly (do NOT silence, do NOT weaken)

The retired-classes half of the abrogation sweep is **deliberately RED** and CI will be red until
N.W5.E lands. Two phantom-class hits:

| Class | Site | Charter | Note |
|---|---|---|---|
| `glass-elevated` | `MixResultDisplay.vue:31` | **N.W5.E** → `glass-floating` | the brief's named known-red; retired upstream (`.retired-classes.txt:28`) |
| `glass-subtle` ×2 | `GradientStopEditor.vue:109`, `GradientCodeEditor.vue:138` | **N.W5.E** → `glass-wash` | **NEW — this sweep surfaced it** (see §4) |

`glass-subtle` is retired upstream (`.retired-classes.txt:25`, replacement `glass-wash`), is **absent
from the glass-ui dist CSS**, and is **not defined in any demo CSS** — so those two gradient-editor
elements render flat (the P9 silent-no-op failure mode). The abrogation ledger §2 catalogued
`glass-elevated`/`dashed-well`/`pastel-rainbow-text`/`stagger-children` but **missed `glass-subtle`**;
the structural sweep caught what the human audit did not — which is exactly its purpose. I did NOT fix
it (class fixes are N.W5.E's, and those files are outside W1.B ownership) and did NOT weaken the sweep
to hide it. **N.W5.E should add `glass-subtle` → `glass-wash` to its work-order alongside
`glass-elevated`.**

The boot-smoke is **green** (the W1.A import fixes landed: zero `GlassCarousel`/`BouncyTabs` refs
remain; the demo mounts console-clean).

---

## §2 — What I authored

### `scripts/boot-smoke.mjs` (inv-N-1)

- Spawns `npx vite --force --host 127.0.0.1 --port <PORT> --strictPort` — **`--force` discards
  `.vite/deps`** (the cold dep-optimizer cache; the ledger §4 names the warm cache as a silencer that
  masks a dead import: a clean server white-screens where the warm server renders). `VITE_API_URL` is
  pointed same-origin so the optional palette read stays hermetic.
- Polls the root for HTTP 200 (120s budget), then launches playwright **chromium headless**, navigates,
  and asserts the **`role="main"` "Color tool panes"** landmark renders (a white-screen leaves `#app`
  empty and the landmark absent). Console-error + pageerror capture uses the **same env-noise policy**
  as `e2e/smoke/fixtures/env-noise.ts` (live-API 4xx/5xx are network conditions, NARROW filter — any
  other error fails the gate).
- Exit 0 = mounted + console-clean; non-zero = white-screen / mount timeout / server-spawn failure /
  any non-noise console or page error. Teardown SIGTERMs vite (SIGKILL fallback).
- **Why the dev server, not the gh-pages static build**: the dev server IS the path that broke — it
  carries the dep-optimizer + the runtime glass-ui import graph. A static build sidesteps the optimizer,
  so it cannot exercise the silencer this gate defeats.
- **Why standalone (not a playwright spec)**: W1.D owns `e2e/**`; a plain node script wired as its own
  CI job makes a boot break legible without the 5-project harness.

### `scripts/abrogation-sweep.mjs` (inv-N-10)

- **Half 1 — exports-map diff**: scans every demo file (`.vue/.ts/.css/.html/.mts/.js/.mjs`), matches
  `@mkbabb/glass-ui[/<subpath>]` **only inside quoted strings** (the syntactic position of every real
  ESM/dynamic/`@import` specifier — this excludes prose/comment mentions; see §4), and asserts each
  subpath is a live key in the installed glass-ui `package.json#exports` (wildcard prefixes like
  `./fonts/*` handled).
- **Half 2 — retired-classes sweep**: reads `.retired-classes.txt` — **prefers
  `node_modules/@mkbabb/glass-ui/.retired-classes.txt`, falls back to `../glass-ui/.retired-classes.txt`**
  — strips `#` comments, and greps each entry against demo/ class usage with a **whole-token boundary**
  (`(^|[^A-Za-z0-9_-])CLS([^A-Za-z0-9_-]|$)`) so a superset class (`glass-subtler`, `my-glass-subtle-x`)
  does NOT false-match. Any hit → exit 1, every offending site printed.
- The typecheck-vs-fresh-d.ts / cold-cache boot-smoke / e2e steps of ledger §4 are the inv-N-1 gates
  wired separately in `ci.yml`; this script is steps 1–2 (judgment + grep, no proof-script idiom).

### `package.json` (additive wiring only)

`"boot-smoke": "node scripts/boot-smoke.mjs"` and `"abrogation-sweep": "node scripts/abrogation-sweep.mjs"`
added to `scripts`. (The `typecheck` and `reka-ui` lines visible in the working-tree diff are W1.C's
already-present edits, not mine.)

### `.github/workflows/ci.yml`

1. **Glass-ui built from source in all 3 jobs.** A fresh `actions/checkout` of glass-ui ships **zero
   dist** (it is gitignored). N.W1.C repointed the demo to resolve glass-ui from its `dist/` and the
   ledger §4 step-3 makes a dts-complete dist the W1 precondition. Added a `cd ../glass-ui && npm ci &&
   npm run build` step to `build-and-test`, `lighthouse`, and the new `boot-smoke` job. (Closes the
   W1.C §5 CI follow-up: "ensure the CI glass-ui-build step runs glass-ui's full build, not a
   partial/cached dist" — the gh-pages CSS-incompleteness block W1.C §3 hit was this missing build.)
2. **Typecheck step comment de-staled + retitled blocking** (inv-N-1). The step already ran
   `npm run typecheck`; only the comment described the retired `check-types.mjs`. Now states the plain
   direct two-leaf gate + the dts-complete-dist precondition.
3. **Abrogation-sweep step** (`2b`, blocking, inv-N-10) added after the api typecheck — cheap, runs
   every push.
4. **New `boot-smoke` job** (`needs: build-and-test`, blocking, inv-N-1): checkout + build glass-ui,
   `npm ci`, build value.js dist (the self-alias target — `@mkbabb/value.js` → `dist/value.js`),
   install playwright chromium, `npm run boot-smoke`.

---

## §3 — Gates run + observed output

| Gate | Command | Result |
|---|---|---|
| boot-smoke (cold cache) | `BOOT_SMOKE_PORT=9126 npm run boot-smoke` | **EXIT 0** — `Forced re-optimization of dependencies` → `VITE v8.0.16 ready` → `[boot-smoke] PASS — demo mounted, console clean (cold dep-optimizer cache).` |
| boot-smoke (negative control) | inline: serve a page with no `role="main"` + `console.error("…GlassCarousel is undefined")` | mount-assertion=`false`, captured errors=`1`, **would gate FAIL=`true`** — proves non-vacuous |
| abrogation-sweep | `npm run abrogation-sweep` | **EXIT 1** (expected). exports-map: `✓ every @mkbabb/glass-ui/<subpath> import resolves to a live exports entry` (75 live subpaths). retired-classes: `✗ 3 hits` — `glass-subtle`×2 + `glass-elevated` (the §1 expected-red) |
| typecheck (the wired gate) | `npm run typecheck` | **EXIT 0** — `vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json --noEmit`, both leaves 0, against glass-ui dist (71 top-level `.d.ts`) |
| lint (regression check) | `npm run lint` + `npx eslint scripts/{boot-smoke,abrogation-sweep}.mjs` | **EXIT 0** — both new scripts lint clean; full `.` lint green |
| ci.yml YAML | `python3 yaml.safe_load` + `yamllint -d relaxed` | parses OK; 3 jobs (`build-and-test`, `lighthouse`, `boot-smoke`); only cosmetic line-length warnings (pre-existing style, no GH-Actions constraint). actionlint not installed in env. |

**Sweep coverage check**: 76 quoted glass-ui specifiers across demo/ → 13 distinct subpaths
(`aurora, configurator, confirm-dialog, controls, dark, dock, dom, forms, search, styles, styles.css,
tabs`, root) — all live; no template-interpolated/dynamic specifiers (static coverage complete).

---

## §4 — Two false-positive classes I designed out (sweep correctness)

1. **Exports-map prose match.** A first pass matched `@mkbabb/glass-ui/styles/animations.css` inside a
   **CSS comment** in `demo/@/styles/animations.css:3` (and a `theme.css` comment in `style.css:40`) —
   not imports. Tightened the regex to match the specifier **only inside a quoted string**
   (`["'`]@mkbabb/glass-ui…["'`]`), which is where every real ESM/dynamic/`@import` specifier sits.
   The two real CSS `@import`s (`"@mkbabb/glass-ui/styles"`, `"…/styles.css"`) are exact exports keys
   and pass. After the fix the exports-map half is clean.
2. **Retired-class substring match.** A naive `grep -F` of retired entries would false-match supersets.
   The whole-token boundary regex was verified: `glass-subtle` matches `rounded-lg glass-subtle …`
   (true) but NOT `glass-subtler` / `my-glass-subtle-x` (false). `dock-group`/`instrument-rail` have no
   demo substrings at all (boundary not even exercised, but correct).

---

## §5 — Notes for the lead / downstream lanes

- **CI will be red on the abrogation-sweep** until **N.W5.E** clears `glass-elevated` (→`glass-floating`)
  **and `glass-subtle` ×2** (→`glass-wash`). This is the intended inv-N-10 state (a real phantom is
  loud, not silent). N.W5.E's work-order should add the `glass-subtle` row — the ledger §2 missed it.
- **The glass-ui CI build is now load-bearing.** All three jobs `cd ../glass-ui && npm ci && npm run
  build` before resolving the demo. If glass-ui's build is slow/flaky in CI, that surfaces here first;
  it is the structural cost of mechanism-C's dist-resolution (the alternative — a stale published dist —
  is exactly the silencer N restored from).
- I did **not** add a `concurrency`/cache step to the boot-smoke job beyond the default — it `needs:
  build-and-test`, so it only runs once that matrix is green.
- The boot-smoke uses port 9123 by default (`BOOT_SMOKE_PORT` overridable). `--strictPort` fails fast on
  a port collision rather than silently drifting to another port the chromium client wouldn't reach.
