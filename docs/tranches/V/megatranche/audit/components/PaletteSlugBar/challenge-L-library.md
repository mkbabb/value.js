# CHALLENGE-L · library structure — `demo/palettes/browser/slug/PaletteSlugBar.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

**Run note — this is run 4.** Three prior Opus 5 CHALLENGE-L runs exist and **nothing in them is
superseded except where §Correction says so explicitly**:

| run | file | landed |
|---|---|---|
| 1 | `challenge-L-library.run-1.md` (L-1 … L-9b) | 2026-07-27 |
| 2 | `challenge-L-library.run-2.md` (L2-1 … L2-6) | 2026-07-28 |
| 3 | `challenge-L-library.run-3.md` — archived by this run before writing | 2026-07-28 |

I audited the component cold, without reading the prior runs, and only then reconciled. That was
deliberate: an independent traversal is worth more as corroboration than as a summary. The result is
that **every defect I found unaided was already on the record** — runs 1–3 are, on this axis,
close to exhaustive at the module and package altitudes. §Independent confirmation records what I
re-measured and how, because three-of-three agreement reached by separate routes is itself evidence.

Run 4's own contribution is narrower and sharper: I probed the one mechanism all three prior runs
(and my own first pass) *assumed* rather than measured — TypeScript's resolution of the
`@mkbabb/value.js` specifier — and the measurement **overturns run 2's L2-3 severity and its
proposed cure**.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. The brief names HEAD
`c654824e`; the branch has advanced to `9268f054` (`git merge-base --is-ancestor c654824e HEAD` →
YES). Every subject file is **byte-identical** across that span:

```
$ git diff --stat c654824e HEAD -- demo/palettes/browser/slug/ demo/palettes/useSlugMigration.ts \
      demo/shell/dock/layers/SlugEditLayer.vue eslint.config.js
(no output)
```

so runs 1–3's findings are re-measurable at HEAD, and I re-measured them there. **No source edits.**
The only writes are this file, the run-3 archive, and `probes/L4-resolve-probe.{cjs,out.txt}` — all
under this component's audit directory.

---

## Verdict

**DEFECTIVE — BLOCKER**, on the prior runs' findings, which I confirm independently. The premise of
the challenge holds: `PaletteSlugBar.vue` is not merely mis-homed, it is **unmounted**, and the
application's only login-error surface was authored inside it.

Run 4 adds one **MINOR-severity correction that removes work from the ledger** rather than adding
it, and one **INFO** on the documentation defect that caused three consecutive audit runs to
mis-model the same mechanism.

---

## L4-1 · MINOR (new — and a CORRECTION to run 2's L2-3) — the `tsconfig.demo.json` value.js `paths` block is provably inert; the correct cure is to delete it, not to generate it

### What run 2 claimed

Run 2 (L2-3, rated **MAJOR**) established that `tsconfig.demo.json:41–48` declares eight
`@mkbabb/value.js` keys while `package.json#exports` publishes seven, that three of the eight
(`.`, `/parsing`, `/units`) are published nowhere and point at `.d.ts` files that do not exist, and
that `/css` — published, and imported by 10 demo files — has no `paths` entry at all. Its stated
risk:

> "a future demo author who writes `@mkbabb/value.js/parsing` … is writing an import no consumer of
> the published package can write, and `tsconfig.demo.json` tells them it is public. **The dogfood
> proof would be false at exactly the moment it mattered most.**"

Its proposed cure:

> "Generate the tsconfig `paths` from `package.json#exports` the same way the Vite aliases already
> are: a small prebuild step emitting a generated `tsconfig.paths.json` that `tsconfig.demo.json`
> extends."

Both halves are declaration-level reasoning. Neither was resolved against the compiler.

### The measurement

I drove TypeScript's own resolver (`ts.resolveModuleName`) with the real parsed
`tsconfig.demo.json` options, from a containing file inside the subject directory, twice — once as
shipped, once with the `paths` block deleted. Probe: `probes/L4-resolve-probe.cjs`; output banked at
`probes/L4-resolve-probe.out.txt`.

```
$ node probes/L4-resolve-probe.cjs

===== WITH tsconfig.demo.json paths (as shipped) =====
FAIL @mkbabb/value.js              unresolved
OK   @mkbabb/value.js/color        <repo>/dist/subpaths/color.d.ts
OK   @mkbabb/value.js/css          <repo>/dist/subpaths/css.d.ts
OK   @mkbabb/value.js/value        <repo>/dist/subpaths/value.d.ts
OK   @mkbabb/value.js/math         <repo>/dist/subpaths/math.d.ts
OK   @mkbabb/value.js/easing       <repo>/dist/subpaths/easing.d.ts
OK   @mkbabb/value.js/quantize     <repo>/dist/subpaths/quantize.d.ts
OK   @mkbabb/value.js/transform    <repo>/dist/subpaths/transform.d.ts
FAIL @mkbabb/value.js/parsing      unresolved
FAIL @mkbabb/value.js/units        unresolved

===== WITHOUT the value.js paths block (self-reference only) =====
FAIL @mkbabb/value.js              unresolved
OK   @mkbabb/value.js/color        <repo>/dist/subpaths/color.d.ts
OK   @mkbabb/value.js/css          <repo>/dist/subpaths/css.d.ts
OK   @mkbabb/value.js/value        <repo>/dist/subpaths/value.d.ts
OK   @mkbabb/value.js/math         <repo>/dist/subpaths/math.d.ts
OK   @mkbabb/value.js/easing       <repo>/dist/subpaths/easing.d.ts
OK   @mkbabb/value.js/quantize     <repo>/dist/subpaths/quantize.d.ts
OK   @mkbabb/value.js/transform    <repo>/dist/subpaths/transform.d.ts
FAIL @mkbabb/value.js/parsing      unresolved
FAIL @mkbabb/value.js/units        unresolved
```

**The two halves are identical, line for line.** Corroborated on the real program — a full
`tsc --traceResolution -p tsconfig.demo.json` reports, for every one of the 10 live `/css` imports:

```
======== Module name '@mkbabb/value.js/css' was successfully resolved to
'/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

— this checkout's `dist/`, despite having no `paths` entry.

### What this establishes

1. **The `paths` block contributes nothing.** All seven published subpaths resolve to the identical
   files without it, via ESM **package self-reference**: the repo's own `package.json` carries
   `"name": "@mkbabb/value.js"` + an `exports` map, so a specifier beginning with that name resolves
   *within the package scope*. The five entries that "work" are duplicating what self-reference
   already does.

2. **The phantom keys cannot manufacture a false pass — run 2's stated risk does not exist.**
   `@mkbabb/value.js/parsing` is `unresolved` **with the block in place**, because a `paths` target
   that does not exist on disk falls through to node resolution, where `exports` correctly refuses.
   An author who writes `/parsing` or `/units` or the bare root today gets a **type error**, not a
   silent pass. The dogfood gate holds — by `exports`, not by `paths`. Run 2's L2-3 should drop
   **MAJOR → MINOR**, and its failure narrative ("the dogfood proof would be false at exactly the
   moment it mattered most") should be struck.

3. **Run 2's proposed cure is contrivance** (edict 3). It adds a prebuild step, a generated
   `tsconfig.paths.json`, and an `extends` hop, in order to keep a block synchronised that has no
   effect. The idiomatic cure is **deletion**: remove the eight `@mkbabb/value.js*` entries from
   `tsconfig.demo.json:41–48`. `package.json#exports` then becomes the single source of truth for
   the type surface exactly as it already is for the runtime surface — with *less* machinery, and
   with drift structurally impossible rather than generated-away. This is the architectural
   transposition the brief asks for, and it lands on the side of subtraction.

4. **The asymmetry is now explained, and it is real.** Vite/rollup genuinely need the generated
   alias set (`vite.config.ts:37–50`) because bundler resolvers do not implement package
   self-reference. TypeScript does. One surface needs the machinery; the other does not. Treating
   them as symmetric — which is what the hand-rolled `paths` block encodes — is the error.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/L4-resolve-probe.cjs`
(read-only; banked output alongside it).

---

## L4-2 · INFO (new) — the load-bearing comment asserts the opposite of the mechanism, and it mis-led three consecutive audit runs

`vite.config.ts:24–26`:

> "The demo and its current sibling builds consume Value through bare package subpaths. **A package
> does not install itself**, so these exact aliases point the seven public specifiers at this
> checkout's freshly-built published surface."

The sentence is true *for the bundler* and false as a general statement: package self-reference is
precisely a package resolving itself by its own name, and it is what carries the entire TypeScript
side of the demo's dogfood contract (L4-1). `tsconfig.demo.json:37–41` compounds it, describing "the
bare `.` root + the 7 subpath barrels … a **CLOSED 8-key set**" for a map that has seven keys and no
root.

The cost is measurable in this very audit directory: **three prior CHALLENGE-L runs and my own first
pass all treated the `paths` map as the demo's type surface** — run 2 built a MAJOR finding and a
build-step cure on that reading. Documentation that states the inverse of the mechanism is not a
cosmetic defect; it is a structural one, because it is the only artifact an auditor or a future
author has to reason from. Whatever else lands, these two comments must be rewritten to name
self-reference explicitly.

---

## L4-3 · INFO (new) — a hoisted registry copy of value.js sits in `node_modules`, currently shadowed

```
$ npm ls @mkbabb/value.js
@mkbabb/value.js@4.0.0 /Users/mkbabb/Programming/value.js
├─┬ @mkbabb/glass-ui@7.0.0
│ └── @mkbabb/value.js@4.0.0
└─┬ @mkbabb/keyframes.js@6.0.0
  └── @mkbabb/value.js@4.0.0 deduped

$ readlink node_modules/@mkbabb/value.js   # → nothing: a real directory, not a link
$ node -e "console.log(require('./node_modules/@mkbabb/value.js/package.json').version)"
4.0.0
```

A second, registry-sourced artifact stands behind the same specifier, installed transitively through
the two `dependencies` run 3 flagged (L3-1: `src/` imports neither — measured again here,
`grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/` → **0**). Self-reference (types) and the
generated anchored-regex aliases (bundle) both shadow it today, so it is inert — but it is the
concrete, on-disk cost of the package cycle, and any resolution context lacking both (a bare `node`
script, a tool that honours neither `paths` nor Vite aliases, a future workspace split) silently
gets the tarball instead of the checkout. Recorded as the physical evidence for run 3's L3-1, not as
a separate defect.

Clean on the adjacent manifest axes, checked and passing: `"type": "module"`, `"sideEffects": false`,
`src/subpaths/` matches `exports` exactly (7 ↔ 7).

---

## Independent confirmation — prior-run findings I re-derived cold, by my own route

Each of these I found before reading any prior run. Listing them as confirmations, with the evidence
*I* took, because independent convergence is the strongest form this axis admits.

| Prior | Severity | Confirmed by (my measurement, at HEAD `9268f054`) |
|---|---|---|
| **run 1 L-1** — component never mounts | BLOCKER | `grep -rni "palette-slug-bar\|PaletteSlugBar" --include=*.vue --include=*.ts --include=*.js --include=*.html .` → 4 hits: 2 barrel re-exports, 1 `import type`, 1 `ref<InstanceType<…>>`. Zero template instantiations in `demo/`, `test/`, `e2e/`, either casing. **Visual corroboration:** I read `visual/shots/safari-desktop-light/palettes.png` — the login affordance is in the dock band ("Login" pill), and none of this component's chrome (slug pill, "Your slug" popover, three-dot account menu) appears on the route it is filed under. |
| **run 1 L-3** — login failure is silent | BLOCKER | Four-link chain, all static: (a) `useSlugMigration.ts:83–87` is the sole error→text site; (b) `slugBarRef` appears in exactly one file (`grep -rn slugBarRef demo/` → 6 hits, all `useSlugMigration.ts`), is surfaced via `usePalettePorts.ts:257`, and `App.vue` consumes only `:153,:155,:156` — no `ref="slugBarRef"` binding exists, so `.value` is permanently `null`; (c) `SlugEditLayer.vue` writes `slugError` at 6 sites and renders it at **0** (`grep -n slugError` returns nothing inside `<template>`); (d) `SlugEditLayer.vue:54` calls `pm.onSlugSwitch(...)` un-awaited and that function catches internally, so its own `catch` at 57–65 is unreachable. |
| **run 1 L-4** — the seam rule is vacuous | BLOCKER | `npx eslint --print-config demo/palettes/browser/slug/PaletteSlugBar.vue` → `no-restricted-imports: undefined`; `ls -d demo/@` → ENOENT. `demo/palettes/browser/index.ts:6–7` asserts "the G-DEMO-3b boundary (eslint.config.js) enforces it standing" — it does not, for this file or any file in the tree. |
| **run 1 L-2** — four homes for identity | BLOCKER | The account menu (*Copy slug · Switch account · Logout · Regenerate*) is authored three times: `PaletteSlugBar.vue:89–118`, `ProfileSection.vue:77–89`, `MobileMenuDropdown.vue:55–71`. `looksLikeSlug` + `normalizeTokenInput` are byte-identical at `PaletteSlugBar.vue:184–196` ≡ `SlugEditLayer.vue:25–37`. |
| **run 1 L-6 / run 3 L3-6** — the `demo/ui/` shim layer | MAJOR | `ls demo/ui \| wc -l` → **19**, every `index.ts` a one-line re-export (18 from the glass-ui **root** barrel, `input` from `/forms`). Measured entry cost of the root barrel vs the subpaths this file could use: `dist/glass-ui.js` **25,239 B / 43** distinct relative module edges, vs `button.js` 71 B / 1, `popover.js` 131 B / 1, `dom.js` 4,179 B / 6 (`writeClipboard`'s real home, `dist/composables/dom/useClipboard.d.ts`). One 243-line file reaches glass-ui three different ways: shim→root (`:133`, `:134`), root direct (`:145`), subpath (`:132`). |
| **run 1 L-7** — shell→feature inversion | MAJOR | `grep -rln "palettes/" demo/shell/` → 7 files, 9 import edges, for `SESSION_PORT_KEY` (`usePalettePorts.ts:271`, `Symbol("palette.session")`) — while `demo/platform/auth/` already exists with `useSession.ts`, `useUserAuth.ts`, `useAdminAuth.ts`, `sessionToken.ts`. The back-edge `usePalettePorts.ts:19` → `../shell/useViewManager` is `import type`, so the cycle is type-level, not runtime. |
| **run 2 L2-4** — uncertified ink | MINOR | `PaletteSlugBar.vue:49` paints the pill with raw `cssColorOpaque` as text *and* border. `ProfileSection.vue:28–31` uses `useSafeAccentFn("chrome"\|"floating")` for the identical pill, with the reason recorded at `:22–27` — the raw pick measured **≤1.28:1** on the real menu ground for ~half of all picks per scheme. This file also takes the color as a **prop** where 8 other consumers inject `CSS_COLOR_KEY` (`demo/color-session/keys.ts:8`). |
| **run 1 L-9b** — client re-derives the server slug format | INFO | Canonical home `api/src/modules/session/slugWords.ts:84–90` (`adj-verb-color-animal`). Scanned all four word lists: 128 entries each, **0** non-`[a-z]+` entries, 268,435,456-slug space; 5,000 random draws → **0** misclassifications by the demo regex. Sound today. Counterfactual, labelled as such: add `"blue-green"` to `COLOR_TERMS` → `gentle-drifting-blue-green-otter` → `looksLikeSlug` **false** → `isAdmin` **true** → a real user's slug routed to `deps.adminLogin(value)` (`useSlugMigration.ts:53–54`), in **two** demo files no api change would touch. |
| **run 2 L2-2 / run 3** — the build emits no application code | BLOCKER | `npx vite build --mode gh-pages` → exit 0, `dist/gh-pages/assets/index-Dezn_h7o.js` **0.69 kB**, `grep -c slug` on it → **0**. This blocked the bundle-level tree-shake measurement I attempted for the dead component; L-1's proof therefore rests on static reachability, which is exhaustive. |
| **run 1 L-9 minors** | MINOR | Re-confirmed individually: `hasSavedPalettes` (`:150`) is a **required** prop referenced nowhere (2 grep hits, both the declaration); `resetEditMode` has **0** call sites repo-wide; `defineExpose` (`:236`) leaks the raw mutable `slugEditMode` ref; `:166` uses the pre-3.5 `ref<InstanceType<…>>` idiom where `SlugEditLayer.vue:14` already uses `useTemplateRef` (edict 7); `:176` `setTimeout(…, 50)` races the Popover close where the live twin does the same job with `nextTick` alone (edict 3); `:216–221` keeps the substring-matching error taxonomy that `useSlugMigration.ts:78–82` documents as never matching, inside a `try` block containing **no `await`** (`emit` at `:213` is synchronous — the `catch` is unreachable twice over); `:239–243` is a `<style scoped>` with zero rules that still stamps `data-v-*` and, by `browser/index.ts:9–11`'s own PI-6 reasoning, still makes the SFC a side-effecting import. |

**Clean on this axis, recorded as negative proof.** The component imports **nothing** from
`@mkbabb/value.js` — correct for an identity presenter. There is no deep `src/` reach, no `@src/*`
specifier, nothing a real consumer could not write. `SearchBar`'s `inputRef` (used at `:179`) is
genuinely exposed by the published type
(`node_modules/@mkbabb/glass-ui/dist/components/search/SearchBar.vue.d.ts` declares
`{ inputRef: Ref<HTMLInputElement | null> }`), so `:132` is a correct subpath reach against a real
surface. Both style families it uses are correctly rooted globally —`.slug-pill` at
`demo/styles/foundation.css:585`, the `vj-morph` family at `demo/styles/animations.css:104–122` —
satisfying edicts 5 and 6.

---

## Correction to the standing ledger

| finding | prior severity | run 4 | reason |
|---|---|---|---|
| run 2 · **L2-3** — declared value.js surface wider than `exports` | MAJOR | **MINOR** | Measured: the phantom keys resolve to `unresolved` **with** the `paths` block in place. No false pass is reachable; the dogfood gate holds via `exports`. The finding survives as untruthful documentation, not as a live hazard. |
| run 2 · **L2-3 cure** — generate `tsconfig.paths.json` from `exports` in a prebuild step | proposed | **struck; replaced by deletion** | The block is provably inert (identical resolution with and without). Generating it adds a build step, a generated file and an `extends` hop to maintain something with no effect. Delete `tsconfig.demo.json:41–48`; `exports` becomes the sole type surface, unaided. |

No other prior finding is amended. Runs 1, 2 and 3 stand as written.

---

## The lattice — run 4's delta only

Runs 1–3 have stated the component lattice (identity leaves `demo/palettes/` for
`demo/platform/auth/`; one `SlugField` + one `IdentityMenu`; error state becomes a reactive
`lastError` on the identity facade instead of a method reached through a parent-held component ref;
`demo/ui/**` deleted in favour of glass-ui subpaths; the eslint boundary re-pointed at the tree that
exists). I concur with all of it, having reached the same shape independently, and add nothing to it.

Run 4's delta is one line at the **package** layer:

```
DELETE  tsconfig.demo.json:41-48        the eight @mkbabb/value.js* `paths` entries.
                                        Measured inert. package.json#exports is already
                                        the type surface, via ESM package self-reference.
REWRITE vite.config.ts:24-26            "A package does not install itself" is true for the
        tsconfig.demo.json:37-41        bundler ONLY. Name self-reference explicitly, and
                                        drop the "CLOSED 8-key set" claim — the map has 7
                                        keys and no root.
```

That is subtraction on both counts: fewer declarations, and the two surfaces derived from one
source with no generator between them.

---

## Defect table (this run)

| id | severity | defect | evidence |
|---|---|---|---|
| L4-1 | MINOR (+ correction) | `tsconfig.demo.json` value.js `paths` block is inert; resolution is identical with and without it; run 2's MAJOR risk is not reachable and its generated-`paths` cure is contrivance | `probes/L4-resolve-probe.{cjs,out.txt}` — two runs, byte-identical; `tsc --traceResolution` on the real program resolves `/css` to `<repo>/dist/subpaths/css.d.ts` with **no** `paths` entry |
| L4-2 | INFO | `vite.config.ts:24–26` and `tsconfig.demo.json:37–41` assert the inverse of the actual resolution mechanism; three prior audit runs mis-modelled it in consequence | the quoted comments vs the L4-1 measurement |
| L4-3 | INFO | hoisted registry copy `node_modules/@mkbabb/value.js@4.0.0`, transitive via glass-ui@7.0.0 + keyframes.js@6.0.0; shadowed today | `npm ls @mkbabb/value.js`; `readlink` → not a link; `grep` → `src/` imports neither dep (0) |

**Strongest defect overall — unchanged from run 1: L-3.** The live application silently swallows
every login failure, because the only error surface was assigned to a component the shell has not
mounted since the D.W3 restructure, and the live control's own `slugError` is written six times and
rendered zero. I re-derived that chain cold and confirm it at HEAD `9268f054`. Run 4 does not
displace it; nothing at the manifest layer is worse than a user-facing auth flow that cannot report
failure.

**Strongest defect *new to run 4*: L4-1** — and it is a negative one. The most useful thing this
seat found is that a standing MAJOR is not a hazard and that its proposed remedy would have added
machinery to preserve a no-op. On an axis this thoroughly worked, removing a false obligation from
the ledger is worth more than adding a fourth restatement of a true one.
