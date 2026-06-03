# K.W1 — Cross-repo topology + the single canonical color core

**Wave**: K.W1 (DEV/design). **Status**: authored 2026-06-02.
**Owns invariants**: **inv-K-1** (acyclic cross-repo color topology), **inv-K-2**
(single canonical color core), **inv-K-4** (contract-v2 resolution completeness).
**Binds**: this is one of the four K.W1 CORE specs (`K.md §3` / `§6`). It is the
**K.W2 work-order** for surfaces (a)+(b)+(c)+(d) — the substrate-restoration +
topology lane. It authors **no code** (planning-only at open); it prescribes the
W2 edits on both repos under the cohort lockstep (`coordination/glass-ui.md`).

The peer pin is refreshed below from drift found at authoring time — read it
first, the K.md/coordination numbers are stale.

---

## §0 — Peer pin refresh (drift found at authoring — supersedes the W0 pin)

`coordination/glass-ui.md` and `K.md §0`/§9 pin glass-ui at HEAD `84a6cc1`,
tranche "K", `@3.1.0`, "dist/ not built / zero .d.ts". **All four drifted** —
verified read-only at authoring:

| Pinned (K.W0) | Actual (authoring, 2026-06-02) | Source of truth |
|---|---|---|
| HEAD `84a6cc1` | HEAD **`756adcc`** | `git -C ../glass-ui log --oneline -1` |
| tranche "K" | tranche **AS** (`docs(tranche-AS)…inv-θ…close AR at W2`) | the HEAD commit subject |
| `@mkbabb/glass-ui@3.1.0` | **`@3.1.1`** | `../glass-ui/package.json` |
| `dist/` not built, **0 `.d.ts`** | `dist/` built, **464 `.d.ts`** present | `find ../glass-ui/dist -name '*.d.ts' \| wc -l` |
| glass-ui `@mkbabb/value.js` = phantom `file:../glass-ui` devDep | **devDep `"^0.10.0"`** (a registry-version devDep, NOT `file:`), imported **0× in `src/`** | `../glass-ui/package.json` devDeps + `grep -rn @mkbabb/value src/` = 0 |
| value.js → glass-ui = `package.json:79 "file:../glass-ui"` | confirmed: `devDependencies."@mkbabb/glass-ui": "file:../glass-ui"` (symlinked, `node_modules/@mkbabb/glass-ui → ../../../glass-ui`) | `package.json` + `ls -la node_modules` |

**Net effect on the K plan**: the *topology argument* is unchanged (still
acyclic by construction). Two W2 sub-asks shrink and one grows:
- glass-ui's `dist/` dts is **already emitted** (464 files) — the
  `coordination/glass-ui.md §"glass-ui-side prerequisite"` "fix dts emission"
  cohort note is **already satisfied**; drop it from the W2 ledger (re-verify at
  W2-open in case AS-tranche churn regressed it).
- glass-ui's `@mkbabb/value.js` is a **truly unused** devDep (0 src/ imports) —
  the peerDep promotion (§3) is *clean*: nothing breaks when the devDep is
  removed, because nothing imports it yet. The "phantom" is literal.
- **W0 action carried**: re-pin glass-ui at `756adcc` / tranche-**AS** as the
  value.js-K peer in `coordination/glass-ui.md` and `PROGRESS.md`. The
  lettering-collision note (glass-ui's letters ≠ value.js's) holds — glass-ui is
  on its own A…AS sequence.

---

## §1 — The topology (inv-K-1) — acyclic by construction

The DAG K activates. Three nodes, three edges, no cycle:

```
   value.js LIBRARY (src/)  ──►  @mkbabb/parse-that         [imports glass-ui NEVER — inv-K-1]
            ▲
            │ peerDependency  (ACTIVATE in K.W2 — today an unused devDep)
            │
   glass-ui (design system)  ──►  value.js LIBRARY           [color core; delete the aurora dup]
            ▲
            │ file:../glass-ui  (existing symlink)
            │
   value.js DEMO (demo/)  ──────►  glass-ui                  [Aurora, Dock, goo-blob (lifted), …]
```

**The no-cycle argument (the spine of inv-K-1).** The apparent cycle —
"value.js imports glass-ui which imports value.js" — is an artifact of treating
"value.js" as one node. It is two: the **library** (`src/`, the published
`@mkbabb/value.js`) and the **demo** (`demo/`, an unpublished app). These are
**distinct DAG nodes**. The real edges are:

- `value.js(lib) → parse-that` (its only runtime dep — `package.json`
  `dependencies` = `@mkbabb/parse-that` alone).
- `glass-ui → value.js(lib)` — the edge K *activates* (the color core).
- `value.js(demo) → glass-ui` — the existing edge (65 import sites in `demo/`,
  verified `grep -rln @mkbabb/glass-ui demo/ | wc -l` = 65).

No edge points `value.js(lib) → glass-ui`. The graph
`{lib→parse-that, glass-ui→lib, demo→glass-ui}` is acyclic: `lib` is a sink
(toward glass-ui), `glass-ui` depends only on `lib`, `demo` depends only on
`glass-ui`. A cycle would require `lib → glass-ui` — which inv-K-1 forbids and
which §1's structural split makes *impossible to introduce silently*.

**Baseline already holds.** `grep -rn "glass-ui\|@mkbabb/glass" src/` = **0**
today. inv-K-1's job is not to *remove* a `lib→glass-ui` edge (there is none) —
it is to make that edge **structurally unrepresentable** so a future "let's just
import glass-ui to de-dup the color math" refactor cannot compile, *and* to
**activate** the dormant correct edge (`glass-ui → lib`).

---

## §2 — The structural enforcement: the `tsconfig.lib` / `tsconfig.demo` split

**The problem the split solves.** Today `tsconfig.json` is one program:
`"include": ["src/", "demo/"]` (verified, `tsconfig.json:29`). The demo's 65
glass-ui imports therefore sit in the **same TS program** as `src/`. Source-text
alone (the close-time `grep -r glass-ui src/`) is a *backstop*, not a proof:
nothing in the type system stops a `src/` file importing `@mkbabb/glass-ui` —
the program already has glass-ui in scope. The split makes the library program
**glass-ui-free by construction**: glass-ui is simply not in the library
program's `include`, so a `src/` import of it would fail to resolve a module the
program can see — the typecheck *is* the proof.

**The split.** Three configs, project-references topology:

```
tsconfig.json          # solution file — references [lib, demo]; no own `include`
  ├── tsconfig.lib.json   # "include": ["src/"]              — the PUBLISHED graph
  └── tsconfig.demo.json  # "include": ["demo/"]             — resolves glass-ui from source
```

- **`tsconfig.lib.json`** — `"include": ["src/"]`, `"references": []`. Inherits
  the root `compilerOptions` (extends a shared base). **Does NOT carry the
  `@mkbabb/glass-ui` path mapping** (§4) — glass-ui is not in its program, so it
  *cannot* import glass-ui. This is the load-bearing inv-K-1 proof: the published
  library type-graph is glass-ui-free because glass-ui is structurally absent
  from it.
- **`tsconfig.demo.json`** — `"include": ["demo/"]`, carries the demo path
  aliases (`@src`, `@components`, …) **and** the `@mkbabb/glass-ui → source` path
  (§4). The demo is where the `demo → glass-ui` edge lives; it resolves glass-ui
  from source (inv-K-4).
- **`tsconfig.json`** — becomes a thin solution/aggregator. `vue-tsc --noEmit`
  with `--build` (or `-p` per leaf) typechecks both; the binding K.W2 evidence
  is **`vue-tsc -p tsconfig.lib.json` typechecks with glass-ui's `dist/`
  deleted** (it never touches glass-ui at all) AND
  **`vue-tsc -p tsconfig.demo.json` typechecks resolving glass-ui from source**.

**Refactor mechanics (KISS — extract a base, don't fork).** Lift the current
`compilerOptions` into `tsconfig.base.json`; `tsconfig.lib.json` and
`tsconfig.demo.json` each `"extends": "./tsconfig.base.json"` and add their own
`include` + (demo-only) the glass-ui path. The root `tsconfig.json` keeps only
`{ "files": [], "references": [{"path":"./tsconfig.lib.json"},
{"path":"./tsconfig.demo.json"}] }`. No `compilerOptions` are *changed* — they
move. `verbatimModuleSyntax`, `strict`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `moduleResolution:bundler`, the
`target/lib/module` triad — all carry verbatim into the base.

**The dts-emission invariant is undisturbed.** dts is emitted by
`vite-plugin-dts` with its own `include: ["src/"]` + `rootDir`/`entryRoot`
anchored at `<repo>/src` (`vite.config.ts:129-135`) — it already scopes to `src/`
independently of the `tsconfig.json` `include`. The flat-`dist/` layout
(W12-unblocker) and the `tsconfig.lib` program are the *same* source set, so dts
emission is unaffected by the split. **W2 must re-run a dts smoke** (build the
library, confirm `dist/index.d.ts` + the flat tree) after the split lands — the
split is `include`-only, but a project-references misconfig could perturb what
the plugin's program sees.

**Why the split also fixes the 75 `TS7016` red gate.** Today `vue-tsc` resolves
`@mkbabb/glass-ui` for the *whole unified program* (including `src/`'s neighbors)
via the package `types` field → `dist/index.d.ts`. The K.md empirical finding
("75 of 92 errors are glass-ui-build-state coupling") assumed glass-ui `dist/`
was absent; at authoring it is **present** (464 dts). **W2-open must re-measure
`vue-tsc` against the current glass-ui `dist/` state** — the split is the right
fix regardless (it removes the build-state *dependency*: the library program
never reads glass-ui's dist, and the demo program reads glass-ui *source* via
§4), but the "75 errors" figure may have shifted now that dist is built. The
split's value does not depend on the error count: it makes the library typecheck
**independent of glass-ui's build state, period** (inv-K-4) — green whether
glass-ui's `dist/` is fresh, stale, or deleted.

---

## §3 — The peerDependency promotion (clean — the devDep is genuinely unused)

**glass-ui side (cohort — glass-ui commit lands first).**

1. `../glass-ui/package.json`: **remove** `"@mkbabb/value.js": "^0.10.0"` from
   `devDependencies`; **add** to `peerDependencies`
   `"@mkbabb/value.js": "^0.10.0"` (matching value.js's current
   `version: "0.10.0"`; widen to `">=0.10 <1"` or `"^1.0.0"` only after K.W6
   cuts v1.0.0 — coordinate the range at the cohort close). It is a peer because
   glass-ui *consumes* value.js's color core but must not bundle a second copy:
   the host app supplies the single instance (same discipline as glass-ui's
   existing `reka-ui`/`vue`/`keyframes.js` peers).
2. `../glass-ui/vitest.config.ts`: the "phantom `@mkbabb/value.js` devDep" note
   (`vitest.config.ts:9-13`) explains that the test runner reaches value.js
   *transitively* through keyframes.js's nested `node_modules` symlink under the
   `development` condition. After §5 makes glass-ui import value.js **directly**,
   that note is **stale**: value.js is now a first-class (peer) import, resolved
   in glass-ui's own program. Update the note to: "value.js is a direct
   peerDependency consumed by aurora's color path; resolved via [the source
   condition / the symlink]" (pick per §4's glass-ui-side resolution choice).

**Why this is clean.** glass-ui imports `@mkbabb/value.js` **0× in `src/`**
today (verified). The devDep was never load-bearing — removing it breaks
nothing. The promotion is *purely* the activation of §5's new direct imports;
there is no migration of existing consumers because there are none. This is the
one genuinely-frictionless half of the brittleness window (`K.md §8`).

**value.js side.** value.js's `package.json` is **unchanged by the peerDep
promotion** — value.js neither adds nor removes a dep here; it remains the
canonical core glass-ui peers against. (The v1.0.0 version cut at K.W6 is a
separate ceremony — `docs/RELEASE.md`.)

---

## §4 — Contract-v2 TS source-resolution completeness (inv-K-4)

**The drift correction (read this — the K.md framing is partly stale).** K.md §1
asserts "Vite *dev* resolves glass-ui from *source* (contract-v2); vue-tsc
resolves `dist/` — two resolvers, two truths." Verified at authoring, **both Vite
and TS currently resolve glass-ui to `dist/`**:
- glass-ui `package.json` `exports["."]` has **only** `{types: dist/index.d.ts,
  import: dist/glass-ui.js, default: dist/glass-ui.js}` — **no `development` /
  source condition** (verified).
- value.js `vite.config.ts:40-45` documents contract-v2 as resolving
  `@mkbabb/*` **to `dist/`** via the `exports` map + the `build:watch`
  freshness loop, and explicitly **strikes** `resolve.conditions` widening.
- value.js `tsconfig.json` has **no `paths` entry** for `@mkbabb/glass-ui`
  (verified) — TS also falls to the package `types` → `dist/index.d.ts`.

So today the two resolvers *agree* (both `dist/`) — but on the **wrong** target
for inv-K-4: the demo's typecheck depends on glass-ui's build state. inv-K-4
demands **both halves resolve from source**. The fix is the explicit choice
below; whichever is chosen must be applied **symmetrically** (TS + Vite) so the
two resolvers stay in lockstep on *source*.

**The TS half (binding — this is what `tsconfig.demo.json` carries).** Add to
`tsconfig.demo.json`'s `compilerOptions.paths` (NOT `tsconfig.lib.json` — the
library must never see glass-ui):

```jsonc
"paths": {
  "@mkbabb/glass-ui": ["../glass-ui/src/index.ts"],
  "@mkbabb/glass-ui/*": ["../glass-ui/src/*"]   // sub-path exports (./dom, ./tabs, …)
}
```

This resolves `vue-tsc -p tsconfig.demo.json` to glass-ui **source** — green
with glass-ui's `dist/` deleted (the binding inv-K-4 evidence). The
sub-path map matters: the demo imports `@mkbabb/glass-ui/dom`
(`useBreakpoint`), `@mkbabb/glass-ui/tabs`, etc. (the `typesVersions` map in
glass-ui's `package.json` enumerates ~60 sub-paths). The `/*` glob must point at
glass-ui's `src/` such that each sub-path resolves to its source module — W2
verifies the mapping against glass-ui's actual `src/` layout (a sub-path like
`./dom` may map to `src/composables/.../index.ts`, not `src/dom.ts`; W2 reads
glass-ui's build entry map to author the exact glob, or — cleaner — uses the
Vite-condition approach below so TS follows the same `exports` resolution).

**The Vite half (must match).** Two valid mechanisms; pick ONE and apply to both
resolvers:
- **(A) `development` export condition (preferred — symmetric, no path glob).**
  glass-ui adds a `development` condition to every `exports` entry pointing at
  `src/` (e.g. `"development": "./src/index.ts"`); value.js's
  `vite.config.ts` re-adds `resolve.conditions: ["development", …]` for the demo
  modes, and `tsconfig.demo.json` sets
  `"customConditions": ["development"]` (TS `moduleResolution:bundler` honors
  `customConditions`). This is glass-ui's own keyframes.js-style contract-v2
  pattern *extended to source*, and it keeps TS + Vite reading the **same**
  `exports` map — no hand-authored path glob to drift. This is the
  cohort-recommended mechanism; it is glass-ui-side work (the condition lives in
  glass-ui's `package.json`).
- **(B) explicit `paths` (TS) + `resolve.alias` (Vite).** value.js-side only; no
  glass-ui change. Heavier to maintain (the ~60 sub-paths) and the two resolvers
  drift independently. Use only if the cohort cannot land (A) in the same wave.

**Decision for W2**: prefer (A); it is symmetric, drift-proof, and reuses the
exact contract-v2 condition idiom. The glass-ui-side `development`-condition
commit lands first (lockstep), then value.js flips `resolve.conditions` +
`customConditions`. Fall back to (B) only if (A) slips the wave.

**The trap (forbidden — inv-K-4 rejects it explicitly).** Do **NOT** silence the
`TS7016`s with an ambient `declare module "@mkbabb/glass-ui" { … }` shim. That
hides the resolution gap instead of fixing it (`K.md §6` invalid-gate list). The
fix is real source-resolution, not a typing black hole.

---

## §5 — The OKLab dedup (inv-K-2) — delete glass-ui's copy, consume value.js

**The duplicate is byte-exact.** glass-ui
`aurora/composables/color.ts:18-72` re-implements value.js's Ottosson OKLab/
OKLCh/sRGB math with **identical coefficients**:
- `srgbToOKLab` LMS→OKLab row (`0.2104542553`, `0.7936177850`,
  `-0.0040720468`, …) — `glass-ui color.ts:24-26` ≡ value.js
  `gamut.ts:295-297` (identical literals).
- `oklabToLinearRgb` (`+4.0767416621`, `-3.3077115913`, …) —
  `glass-ui color.ts:49-51` ≡ value.js `gamut.ts:80-82` (via the
  `LMS_TO_LINEAR_SRGB` constant, same values).

value.js **already exports** every primitive the deletion needs (verified
`src/index.ts`): `srgbToOKLab`, `oklabToLinearSRGB`, `oklabToRgb255`,
`rawOklabToOklch`, `rawOklchToOklab` (all from `./units/color/gamut`), plus
`color2`, `colorUnit2` (dispatch/normalize) and `parseCSSColor` (parsing/color).
No new value.js export is required for the dedup.

**The dedup map (EXACT — what is DELETED, REWIRED, and KEPT).** Verified per
function via usage-grep across glass-ui's aurora tree:

| glass-ui `color.ts` symbol | Uses outside `color.ts` | Disposition | value.js source |
|---|---|---|---|
| `srgbToOKLab` (`:18`) | **0** | **DELETE** (internal-only dup) | `srgbToOKLab` |
| `oklabToOklch` (`:30`) | **0** | **DELETE** | `rawOklabToOklch` |
| `oklchToOklab` (`:36`) | **0** | **DELETE** | `rawOklchToOklab` |
| `oklabToLinearRgb` (`:41`, file-private) | 0 (private) | **DELETE** | `oklabToLinearSRGB` |
| `oklabToRgb255` (`:55`) | **0** | **DELETE** | `oklabToRgb255` |
| `rgbToOklch` (`:64`) | **0** | **DELETE** | compose `srgbToOKLab`+`rawOklabToOklch` (r/255) |
| `oklchToRgb` (`:69`) | **0** | **DELETE** | compose `rawOklchToOklab`+`oklabToRgb255` |
| `cssToRgb` (`:152`, 1×1-canvas) | **0** | **DELETE** | `parseCSSColor` (the value.js demo path) |
| `clamp` (`:4`) | 13 | **KEEP** (trivial util, not color math; not a dup of value.js's `clamp`-on-channels) — or re-export value.js `clamp` to satisfy the close-time "defined once" grep; W2 picks |
| `oklchToLinear` (`:78`) | 2 | **KEEP — REWIRE BODY** | rewrite to `rawOklchToOklab`→`oklabToLinearSRGB` |
| `oklchStopToHex` (`:136`) | 1 | **KEEP — REWIRE BODY** | rewrite to `rawOklchToOklab`→`oklabToRgb255` |
| `hexToOklchStop` (`:142`) | 1 | **KEEP — REWIRE BODY** | parse hex → `srgbToOKLab`→`rawOklabToOklch` |
| `cssToOklch` (`:166`) | 1 | **KEEP — REWIRE BODY** | `parseCSSColor`→OKLCh via value.js |
| `flattenPalette` (`:90`) | 4 | **KEEP** (aurora-consumer; calls `oklchToLinear`) | unchanged — rides the rewired `oklchToLinear` |
| `paletteToCssGradient` (`:125`) | 5 | **KEEP** (aurora-consumer; calls `oklchStopToHex`) | unchanged — rides the rewired `oklchStopToHex` |

**The critical nuance (NOT a clean delete-7-keep-3).** The KEPT
aurora-consumer helpers (`oklchToLinear`, `oklchStopToHex`, transitively
`flattenPalette`/`paletteToCssGradient`) **call the DELETED primitives**
internally — e.g. `oklchToLinear` (`color.ts:78-82`) calls `oklchToOklab` +
`oklabToLinearRgb`, both deletion targets. The dedup is therefore **delete the 8
internal-dup primitives AND rewire the 4 KEPT helpers' bodies to source their
primitives from value.js**. The kept helpers' *signatures* and consumers
(`runtime.ts`, `Aurora.vue`, the aurora `index.ts` re-export at `:25-33`) are
untouched — only the bodies re-source. This preserves `OklchStop`-typed,
`Float32Array`-buffer-reusing aurora-bake semantics while deleting every
duplicated coefficient.

> A subtlety to verify at W2: value.js `oklabToLinearSRGB` returns linear-sRGB
> **without** the `Math.max(0, …)` clamp that `oklchToLinear` applies
> (`color.ts:81`). The rewired `oklchToLinear` keeps its own `Math.max(0,…)`
> wrap around the value.js call — the ACES-tonemap-in-linear contract
> (`color.ts:75-77` comment) is aurora's, not value.js's. The equivalence test
> (§6) asserts the *composed* path agrees, not the raw primitive.

**The latent value.js dependency this introduces is correct (inv-K-2).** Unlike
the blob (inv-K-3 — color-agnostic, NO value.js default), aurora's color path
*genuinely needs* OKLab/OKLCh and so consumes value.js **by design**. This is the
one place glass-ui→value.js coupling is intentional and load-bearing.

---

## §6 — The equivalence test (the canary — inv-K-2's structural enforcement)

**Location**: `../glass-ui/src/components/custom/aurora/__tests__/color-equivalence.test.ts`
(NEW, glass-ui-side, vitest). It is the brittleness-window canary
(`K.md §8`, `coordination/glass-ui.md §"Lockstep"`): green at **every**
glass-ui color-change commit, or the dedup is wrong.

**Assertions (to 1e-6).** For a fixed sample set spanning the gamut (≥ the CSS
named-color set + edge cases: near-black, near-white, max-chroma per hue
sextant, an out-of-sRGB-gamut OKLCh stop):
1. `oklchToLinear(stop)` (glass-ui, rewired) ≈ the value.js composed path
   `rawOklchToOklab → oklabToLinearSRGB` (then the same `Math.max(0,·)` wrap),
   componentwise `|Δ| ≤ 1e-6`.
2. `oklchStopToHex(stop)` (glass-ui) === the value.js
   `rawOklchToOklab → oklabToRgb255 → hex` path (exact string, integers).
3. `hexToOklchStop(hex)` round-trips: `oklchStopToHex(hexToOklchStop(h)) === h`
   for the sample hexes, AND its OKLCh agrees with value.js
   `parseCSSColor(h) → colorUnit2(…, "oklch")` to 1e-6.
4. `flattenPalette` buffer (the `Float32Array` aurora hands the shader) is
   identical pre/post-dedup for a fixed multi-stop palette — the bake output the
   GPU actually consumes must not move by even a ULP the eye could see.

The test imports value.js as the **peer** (resolved via §4 — source). It is the
proof inv-K-2 names instead of a `proof:*` script (the idiom is retired,
`K.md §2`): a passing equivalence test + the *deletion itself* (8 dup symbols
gone — a deleted symbol cannot duplicate) is the structural enforcement. A
close-time grep confirms each Ottosson coefficient family is defined **exactly
once** across both repos (in value.js `gamut.ts` / `constants.ts`).

---

## §7 — Demo API-config + CORS + `setupEnvNoise` (inv-K-5) — the second red gate

Verified state grounding inv-K-5:
- `demo/@/lib/palette/api/client.ts:28-29`: `DEFAULT_REMOTE_API_URL =
  "https://api.color.babb.dev"`; `BASE_URL = import.meta.env.VITE_API_URL ??
  DEFAULT_REMOTE_API_URL`. With no `VITE_API_URL`, the demo fetches the
  production `api.` subdomain — which the deployed CORS policy refuses for
  `localhost`/test origins (K.md §1 finding).
- `useCustomColorNames.ts:45-49`: the optional color-names read **already**
  `catch`es and `console.warn`s (`"Failed to load custom color names:"`). The
  CORS failure is therefore surfaced as a `console.warn`, AND the browser itself
  logs a CORS-preflight error — either trips the e2e "zero console errors"
  assertion. (Note `client.ts` itself *throws* `ApiProblem`; the
  console-noise comes from the browser's CORS log + this `console.warn`, not an
  uncaught throw.)

**W2 work-order (three coordinated edits — the optional-read must be *designed*
fail-silent, not blanket-swallowed):**

1. **Base-URL config for the gated environment.** The e2e/dev environment must
   not hit the production `api.` origin. Set `VITE_API_URL` to a test-local /
   intercepted base for the Playwright projects (or to an empty/sentinel that
   short-circuits optional reads). The `??` default stays for the deployed demo
   (production keeps `api.color.babb.dev`). The fix is *environment config*, not
   a code change to the default.
2. **Optional-read fail-silent BY DESIGN.** `useCustomColorNames.loadFromAPI`
   already degrades to an empty registry on failure (`customNameRegistry`
   stays empty; the picker falls back to the 147 built-in CSS names + value.js's
   `COLOR_NAMES`). The console-noise is the only defect. **Change the
   `console.warn` to a non-console signal**: either drop it (the empty-registry
   fallback is the designed behavior — a missing optional read is not an error),
   or route it to a dev-only `import.meta.env.DEV` guard so it never fires in the
   e2e/prod build. inv-K-5 demands the optional read be *designed* to fail
   silently — this is that design, not a swallow.
3. **`setupEnvNoise` filter stays NARROW.** The e2e `setupEnvNoise` fixture
   today filters 4xx/5xx *text* but not CORS-preflight-class messages
   (K.md §1). The fix is **not** to widen it to swallow all errors (`K.md §6`
   invalid gate — that hides real regressions). Two correct moves, in order of
   preference: (a) eliminate the CORS message at the source — edits (1)+(2) mean
   no production-origin fetch fires in the gated environment, so there is no CORS
   message to filter; (b) only if a residual optional-read message survives, add
   a **single narrowly-scoped** allowance for that exact known-optional-read
   pattern (the color-names endpoint), documented as the one designed fail-silent
   read — never a wildcard. The structural enforcement of inv-K-5 is the existing
   "zero console errors" assertion **passing with the `api/` container down** —
   the filter stays narrow enough that a real fetch regression still trips it.

**The binding inv-K-5 evidence**: `npx playwright test` → all 5 projects green,
**zero console errors, with the `api/` backend unreachable**.

---

## §8 — The `ui/`-shim whitelist (K.W2 authors it; K.W3 collapses to it)

inv-K-3 (detailed in `K.W1-primitive-lift.md`) forbids new primitives in
`demo/@/components/ui/` and codifies that tree as a **glass-ui adapter-shim
layer** (`VENDOR-POLICY.md` retired, `K.md §2`/§5). This spec authors the
**whitelist** the close-time grep checks: the permitted shims are exactly the
`demo/@/components/ui/*/index.ts` files whose body is a bare
`export … from "@mkbabb/glass-ui…"` re-export. K.W2 enumerates the current
`ui/*` directories and records, per directory, whether it (a) is already a bare
glass-ui re-export (e.g. `ui/alert` → glass-ui, per `demo/CLAUDE.md`), (b) is a
shadcn-vue vendored primitive slated to collapse in K.W3, or (c) must stay as a
demo-local shim with a named reason. The whitelist is a **prose table in K.W3**
(not a committed script); the close-time enforcement is `grep` against it. This
spec hands K.W3 the audit scaffold; the collapse itself is K.W3 work
(`K.W1-primitive-lift.md`).

---

## §9 — The `dispatch.ts` hygiene fold (K.W2(e)) — trigger fired

The I-SEED "monitor `dispatch.ts` LoC" trigger has **fired**: `wc -l
src/units/color/dispatch.ts` = **372 LoC > the G3 ≤350 cap** (verified). It is no
longer booked — it folds into K.W2(e) (`K.md §3`/§7). The extraction is a
focused module lift back under 350, structural-only (no behavior change), and is
**topology-adjacent but not on the color-topology critical path** — it can land
in the same W2 wave but is independently revertible. Candidate extraction
(W2 confirms by reading the file): the contrast-helper cluster
(`computeSafeAccent`/`safeAccentColor`/`needsContrastAdjustment`/
`getOklchLightness`) is re-exported from `dispatch.ts`'s barrel
(`src/index.ts:125-128`) but conceptually belongs with `contrast.ts` — lifting
those re-exports to source directly from `./contrast` shrinks `dispatch.ts` and
is consumer-transparent (the barrel still exports the same symbols). W2 measures
the exact lift to clear ≤350. (This is the only `src/` edit in the W2 lane that
is *not* about the cross-repo boundary; it rides along because it touches the
same `units/color/` tree.)

---

## §10 — The W2 work-order (the binding ledger for this lane)

Sequenced under the cohort lockstep (`coordination/glass-ui.md §"Lockstep"`:
glass-ui commit first, then value.js consumes; inv-K-4 lands first):

| # | Edit | Repo | Owner-gate |
|---|---|---|---|
| 0 | Re-pin glass-ui peer at `756adcc` / tranche-AS in `coordination/glass-ui.md` + `PROGRESS.md` (drift fix, §0) | value.js docs | inv-K (cohort hygiene) |
| 1 | **inv-K-4 first**: glass-ui adds `development`→`src/` export condition (mechanism A, §4); value.js `tsconfig.demo.json` `customConditions` + `vite.config.ts` `resolve.conditions` | glass-ui → value.js | inv-K-4 |
| 2 | Split `tsconfig.json` → `tsconfig.base.json` + `tsconfig.lib.json` (`src/`, glass-ui-free) + `tsconfig.demo.json` (`demo/`, glass-ui-from-source) (§2) | value.js | inv-K-1 |
| 3 | Type the genuine implicit-anys (`hero-lab` HeroControls 11× / type-or-retire; `useAdminUsers.ts:88` `tier`; the demo SFC anys) — `K.md §5` table | value.js | inv-K-4 (gate green) |
| 4 | glass-ui `package.json`: value.js devDep→peerDep; `vitest.config.ts` note refresh (§3) | glass-ui | inv-K-2 |
| 5 | glass-ui `aurora/composables/color.ts`: delete the 8 dup primitives, rewire the 4 kept helpers to value.js (§5) | glass-ui | inv-K-2 |
| 6 | NEW `aurora/__tests__/color-equivalence.test.ts` vs value.js, 1e-6 (§6) | glass-ui | inv-K-2 (canary) |
| 7 | Demo API base-URL config + optional-read fail-silent + narrow `setupEnvNoise` (§7) | value.js | inv-K-5 |
| 8 | `dispatch.ts` extraction back under ≤350 (§9) | value.js | G3 (fired trigger) |

**Binding W2 close-evidence** (`K.md §6`): `vue-tsc -p tsconfig.lib.json`
typechecks **with glass-ui `dist/` deleted**; `vue-tsc -p tsconfig.demo.json`
green resolving glass-ui source; `npx playwright test` → 5 projects green, zero
console errors, **api/ down**; `grep -r "glass-ui" src/` → 0; the equivalence
test green to 1e-6; glass-ui `@mkbabb/value.js` in `peerDependencies`; the 8 dup
symbols deleted; `npm run lint` exit 0; `npm test` green; `wc -l dispatch.ts`
≤ 350.

---

## §11 — The traps (forbidden moves — restated from `K.md §6` for this lane)

1. **`value.js(lib) → glass-ui`** — the cycle. The `tsconfig.lib` split makes it
   structurally unrepresentable (§2). Never "de-dup OKLab by importing glass-ui
   into the library" — the dedup direction is `glass-ui → value.js` (§5).
2. **`declare module "@mkbabb/glass-ui"` ambient shim** to silence `TS7016` —
   hides the resolution gap; inv-K-4 demands real source-resolution (§4).
3. **A third color package** to "de-dup" — inv-K-2 says *delete and consume*, not
   *extract* (`K.md §6` invalid gate). The dedup deletes glass-ui's copy and
   points it at value.js's existing exports; no new package.
4. **Widening `setupEnvNoise` to swallow all errors** — inv-K-5 demands the
   optional read be *designed* fail-silent, the filter stays narrow (§7).
5. **Carrying glass-ui→value.js into the `tsconfig.lib` paths** — the path map
   is `tsconfig.demo.json`-only; the library program must never see glass-ui
   (§2/§4).

---

## §12 — Mode + authority

Planning-only (K.W1 DEV/design). Authors no code. Prescribes the K.W2 IMPL
work-order on both repos under the paired-authorship cohort
(`coordination/glass-ui.md`; inv-I-1 amended — glass-ui open, fourier closed).
Dispatch is gated on the three W0 ratification gates (all RESOLVED 2026-06-02,
`K.md §7`) + user ratification of the W1 CORE specs (inv-G1). The peer-pin drift
(§0) is the one W0-action this spec carries forward to `coordination/glass-ui.md`.
