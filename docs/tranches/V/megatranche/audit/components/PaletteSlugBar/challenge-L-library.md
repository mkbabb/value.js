# CHALLENGE-L · library structure — `demo/palettes/browser/slug/PaletteSlugBar.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

**Run note — this is run 5.** Four prior Opus 5 CHALLENGE-L runs exist. Nothing in them is
superseded except where §Corrections says so explicitly.

| run | file | landed |
|---|---|---|
| 1 | `challenge-L-library.run-1.md` (L-1 … L-9b) | 2026-07-27 |
| 2 | `challenge-L-library.run-2.md` (L2-1 … L2-6) | 2026-07-28 |
| 3 | `challenge-L-library.run-3.md` (L3-1 … L3-6) | 2026-07-28 |
| 4 | `challenge-L-library.run-4.md` (L4-1 … L4-3) — archived by this run before writing | 2026-07-28 |

I audited the component **cold**, deliberately without reading any prior run, and reconciled only
afterward. Every structural defect I found unaided was already on the record — runs 1–4 are, on this
axis, effectively exhaustive at the component, module and package altitudes. Restating them a fifth
time is worth nothing, so this report does not.

Run 5's contribution is three things and no more:

1. **A withdrawal.** My cold traversal produced a MAJOR finding that is **false**, and run 4 had
   already measured why. I reproduced run 4's probe and confirm the withdrawal against my own
   evidence. §Corrections.
2. **One new measured defect** runs 1–4 did not take: the two `slugify` implementations inside
   run 3's dual-export finding **behave differently**, with a reproduction. §L5-1.
3. **Two new evidence routes** to standing findings — a live-DOM probe with working controls for
   L-1 (which runs 2 and 4 recorded as blocked at the bundle level), and a partial **dispute** of
   run 4's negative proof on `.slug-pill`. §L5-2, §L5-3.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. The brief names HEAD
`c654824e`; the branch has advanced to `d19da6d3`. Every subject file is byte-identical to run 4's
HEAD (`9268f054`):

```
$ git diff --stat 9268f054 HEAD -- demo/palettes/browser/slug/ demo/palettes/useSlugMigration.ts \
      demo/shell/dock/layers/SlugEditLayer.vue eslint.config.js tsconfig.demo.json \
      demo/palettes/export.ts demo/palettes/utils.ts
(no output)
```

**No source edits.** The only writes are this file and the run-4 archive, both under this
component's audit directory.

---

## Verdict

**DEFECTIVE — BLOCKER**, unchanged. `PaletteSlugBar.vue` is unmounted dead code (run 1 L-1 / run 2
L2-1) and the application's only login-error surface was authored inside it (run 1 L-3). I
re-derived both cold and confirm them at HEAD `d19da6d3` by a route no prior run used.

Run 5 removes one finding from the ledger and adds one.

---

## Corrections

### C-1 · I independently reproduced run 2's L2-3 error, and withdraw it

My cold traversal reached this, and I had it written as a MAJOR:

> `tsconfig.demo.json` `paths` declares 8 keys; `package.json#exports` publishes 7; `/css` and
> `/value` have no `paths` entry, so `vue-tsc` falls through to `node_modules/@mkbabb/value.js@4.0.0`
> while Vite aliases the same specifier to the local `dist/`. Types from the frozen tarball, runtime
> from the working tree — a silent split across 10 live import sites.

I had what looked like hard evidence for the split — the two declaration files genuinely differ:

```
$ diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts | grep -c '^[<>]'
34
$ wc -l dist/subpaths/css.d.ts                                 → 382
$ wc -l node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts   → 350
```

**That evidence is real and the conclusion drawn from it is wrong.** The diff establishes that two
different files exist; it says nothing about which one the compiler reads. I never resolved that
question — I inferred it from the `paths` map. Run 4 did resolve it. I re-ran run 4's probe
unmodified:

```
$ node docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/L4-resolve-probe.cjs

===== WITH tsconfig.demo.json paths (as shipped) =====
OK   @mkbabb/value.js/css          <repo>/dist/subpaths/css.d.ts
…
===== WITHOUT the value.js paths block (self-reference only) =====
OK   @mkbabb/value.js/css          <repo>/dist/subpaths/css.d.ts
…
```

Identical, line for line, across both halves — reproduced independently at HEAD `d19da6d3`.
`@mkbabb/value.js/css` resolves to **this checkout's** `dist/`, with and without the `paths` block,
via ESM **package self-reference**. There is no type/runtime split. The `node_modules` copy is
shadowed (run 4 L4-3).

**Withdrawn in full.** Run 4's L4-1 stands as measured, at MINOR, with deletion — not generation —
as the cure.

**The datum worth keeping.** Run 4's L4-2 claims that `vite.config.ts:24-26` ("**A package does not
install itself**") and `tsconfig.demo.json:37-41` ("a **CLOSED 8-key set**") state the inverse of the
mechanism, and that this mis-led three consecutive audit runs. I am the **fifth** auditor to walk
into it, having read those exact comments early and reasoned from them for the rest of the traversal.
That is no longer an inference about auditor behaviour; it is a five-for-five observed rate. It
raises L4-2 from a documentation nit to the highest-leverage cheap fix in this directory: two
comments, rewritten to name self-reference, would have saved four seats' worth of work.

### C-2 · attribution fix on L-1's mechanism

My first pass named `PaletteDialogHeader.vue` as the deleted mounter. Run 2 names
`PaletteControlsBar.vue`. **Run 2 is correct** — I mis-read a `--stat` line. Resolved directly:

```
$ git show 95993197:demo/@/…/PaletteDialog/components/PaletteControlsBar.vue | grep -c PaletteSlugBar
0        # ← the pre-image at this commit is the DELETION; the mount is in the removed hunk
$ git show 95993197 | sed -n '794,830p' | grep -n "PaletteSlugBar\|slugBarRef"
4:-<template>
7:-        <PaletteSlugBar
8:-            ref="slugBarRef"
```

Diff hunk 794 is `PaletteControlsBar.vue` (172 lines removed). `PaletteDialogHeader.vue` (101 lines,
hunk 972) did not carry the mount. Run 2's L2-1 is accurate as written.

---

## L5-1 · MAJOR (new) — the two `slugify` implementations inside run 3's dual-export finding produce *different slugs*, measured

Run 3's **L3-3** (BLOCKER) established the dual export path structurally: `demo/palettes/export.ts`
(132 L, shipped, untested) vs `demo/palettes/export/` (12 modules, 914 L, tested, unreachable —
no `index.ts`, so the bare `./export` specifier resolves to the file). I re-derived that
independently and confirm it:

```
$ ls demo/palettes/export/index.ts
NO index.ts  →  './export' resolves to export.ts
$ grep -rn 'from "./export"' demo/
demo/palettes/usePaletteExport.ts:9:} from "./export";            ← the APP path
$ grep -rn 'palettes/export/' demo/ test/
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";   ← the ONLY importer
```

**What no prior run measured** (`grep -c "Café\|NFKD\|caf-noir"` across runs 1–4 → **0**): the name→slug
function is *also* forked, across a third pair of files, and the two bodies are not equivalent.

| home | body |
|---|---|
| `demo/palettes/utils.ts:3-12` | `.normalize("NFKD").replace(/[̀-ͯ]/g,"")` → strip combining marks → lowercase → `[^a-z0-9 -]` drop → spaces to `-` |
| `demo/palettes/export.ts:9-11` | `.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-\|-$)/g,"")` — **no NFKD, no mark strip** |

They diverge on any name carrying a diacritic:

```
$ node -e '…both bodies, verbatim…'
"Café Noir"   utils=> "cafe-noir"   export=> "caf-noir"
"Naïve Blue"  utils=> "naive-blue"  export=> "na-ve-blue"
"Zürich"      utils=> "zurich"      export=> "z-rich"
```

**Reproduction.** Name a palette `Café Noir`. Its in-app slug (via `utils.ts` `createSlug`) is
`cafe-noir`; the filename its export receives (via `export.ts`) is `caf-noir`. The two identifiers
for the same palette disagree, and a round-trip through the export does not recover it. Because
`export.ts` is the *shipped* path and `export/` is the *tested* path (run 3 L3-3), the byte-exact
serializer gate is green over the implementation the user never invokes, and the divergent one has
no test at all.

**Mechanism.** No unique semantic owner for "how a human name becomes a slug". The area now has
**three** claimants for the naming concept and **two** for its validation:

```
name → slug   :  demo/palettes/utils.ts:3          (NFKD-correct, in-app)
                 demo/palettes/export.ts:9         (NFKD-naive, exports)
                 api/src/modules/session/slugWords.ts:84-90   (server, generative — run 1 L-9b)
slug → valid? :  demo/palettes/browser/slug/PaletteSlugBar.vue:184   ┐ byte-identical
                 demo/shell/dock/layers/SlugEditLayer.vue:25         ┘ (run 1 L-2)
```

**Proposed cure — an addendum to run 3's L3-3, not a replacement.** Run 3's cure (delete
`export.ts`, point `usePaletteExport.ts:9` at `./export/serializers`) is right and I concur. Add one
node to it: the surviving `slugify` must be **one** function in `demo/palettes/slug.ts`, consumed by
both `utils.ts`'s `createSlug` and the serializers, and it must be the NFKD-correct body. Otherwise
run 3's deletion silently picks the *naive* implementation's behaviour for in-app slugs or the
correct one for exports, depending on which call site is rewired — a behaviour change smuggled inside
a structural cleanup.

---

## L5-2 · evidence addendum to run 1 L-1 — a live-DOM probe with working controls

Runs 1–4 proved the component never mounts by static reachability plus a screenshot read. Runs 2 and
4 both recorded that the **bundle-level** proof was unavailable (run 2 L2-2 / run 4: `vite build
--mode gh-pages` emits a 0.69 kB `index.js` containing no application code). I hit the same wall from
the other direction and record it as a failed probe rather than a result:

> **Abandoned as invalid.** I attempted to prove the dead component is tree-shaken out by
> string-grepping `dist/gh-pages/`. The **control** string (`"Search your palettes"`, from a
> demonstrably-live component) also returned zero hits — the artifact holds 2 JS chunks alongside
> fonts. No claim is made about production bundle contents. This is run 2 L2-2's blocker observed
> independently.

The live dev server admits a route that the build does not. `http://localhost:9000/#/palettes`,
probing the component's four *unique* DOM markers with the live twin's markers as controls:

```js
{
  route: "#/palettes",
  slugPillCount: 1,
  slugPillOwners: ["div.dock-layer-group > div.dock-crossfade > div.dock-face > div.dock-face-content > div.hidden > span.slug-pill"],

  enterSlugPlaceholder: false,   // PaletteSlugBar.vue:12  placeholder="enter slug..."
  yourSlugPopoverCopy:  false,   // PaletteSlugBar.vue:57  "This is your unique identity"
  accountMenuBtn:       false,   // PaletteSlugBar.vue:84  aria-label="Account menu"
  signInWithSlugBtn:    false,   // PaletteSlugBar.vue:24  aria-label="Sign in with slug"

  enterSlugOrToken:     true,    // SlugEditLayer.vue:84   CONTROL — fires
  switchToSlugBtn:      true     // SlugEditLayer.vue:94   CONTROL — fires
}
```

The controls fire, so the four `false`s are measured absences rather than a broken probe — the
discipline the abandoned bundle grep failed. And the single `.slug-pill` present on the route the
component is *filed under* belongs to the **dock** (`ProfileSection.vue:73`), by DOM ancestry.

This is a third independent route to run 1 L-1 (static reachability → screenshot → live DOM), and
the only one that discriminates *which* implementation is painting the pill.

---

## L5-3 · MINOR (new) — partial dispute of run 4's negative proof on `.slug-pill`

Run 4 records `.slug-pill` under its negative-proof section:

> "Both style families it uses are correctly rooted globally — `.slug-pill` at
> `demo/styles/foundation.css:585` … satisfying edicts 5 and 6."

Edict 6 (animations) is satisfied — I confirm `vj-morph` is a global keep-set family with four other
live users, so deleting this component orphans nothing. **Edict 5 is not satisfied**, and the recipe
itself says so. `demo/styles/foundation.css:582-587`:

```css
/* Slug pill — the user/palette slug chip recipe, shared across the dock menus,
 * the admin users panel, and the slug bar (was copy-pasted at 5+ sites).
 * Consumers set `color` / `border-color` per-instance via :style. */
.slug-pill { @apply text-mono-small font-bold px-2 py-0.5 rounded-full border; }
```

Two defects in the comment, both checkable:

1. **The third sentence codifies the exact practice edict 5 forbids.** "Consumers set
   `color`/`border-color` per-instance via `:style`" is a written contract for per-instance
   overrides. Live instances: `PaletteSlugBar.vue:49`, `ProfileSection.vue:96`,
   `MobileMenuDropdown.vue:67`. A root-level recipe that requires every consumer to override it at
   the instance is a token that was never cut — the tint should arrive as a custom property set once
   on the dock root, not written onto each element.
2. **Its justification names two consumers that do not exist.** `grep -rn "slug-pill" demo/`
   returns only `ProfileSection.vue:73,96`, `MobileMenuDropdown.vue:48,67`, `PaletteSlugBar.vue:48`.
   The **admin users panel does not use it**, and "the slug bar" is the dead component. `demo/DESIGN.md:388`
   lists `.slug-pill` among "true cross-feature recipes" earning "global residence" — but all three
   live consumers are inside `demo/shell/dock/`. It is a single-area recipe whose cross-feature
   warrant rests on two phantoms, and deleting the dead component (run 1 L-1) drops it to two
   consumers in one directory.

This does not overturn run 2's **L2-4**, which already routes `.slug-pill` → glass-ui `Chip`/`Badge`
and separately flags the uncertified ink at `PaletteSlugBar.vue:49` (≤1.28:1, per the sibling's own
measurement). It **strengthens** L2-4's cure and narrows run 4's negative proof to edict 6 only.
`@mkbabb/glass-ui@7.0.0` publishes `./chip`, `./badge` and `./status-dot`; the accent belongs there
as a token, and per the standing BH/BI fond that variant is relayed to glass-ui, not added to `demo/`.

---

## L5-4 · INFO (new) — `dist/subpaths/css.d.ts` leaks dts-rollup dedup artifacts into a public declaration

Surfaced while measuring C-1, in the library's own output rather than the demo. Not covered by any
prior run (`grep -c "Color_2\|_2-suffixed\|dts-rollup"` across runs 1–4 → **0**).

`dist/subpaths/css.d.ts` declares `Alpha_2`, `Channel_2`, `ChannelsBySpace_2`, `Color_2<S>` and
`SpaceId_2` — `_2`-suffixed clones of types the same rollup already declares unsuffixed — and maps
`CssColorBySpace[S]` to `Color_2<S>` (`:136`) where the published 4.0.0 maps it to `Color<S>`
(`:106`). These are `vite-plugin-dts` name-collision artifacts in a **public** declaration file: a
consumer reading the published `.d.ts` sees two structurally identical `Color` types that are
nominally distinct in error messages.

```
$ diff dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
34 differing lines · 382 local vs 350 published · exported NAMES identical
```

That the exported name lists match is why C-1's split was invisible to inspection and why the
resolution probe was necessary. The artifacts themselves are a `src/subpaths/css.ts` re-export-shape
issue, orthogonal to everything else on this axis. INFO, filed for the library seat.

*Hypothesis, labelled as such and not reproduced:* under a future non-structural change, a consumer
assigning `Color<"oklch">` from `@mkbabb/value.js/color` into a slot typed
`CssColorBySpace["oklch"]` from `/css` would get a confusingly-named error. I did not construct it.

---

## Standing findings I re-derived cold and confirm at HEAD `d19da6d3`

Listed as confirmations only. Each was found before I read any prior run; none is restated in full,
because runs 1–4 already state them better than a fifth pass would.

| prior | severity | my independent evidence |
|---|---|---|
| run 1 **L-1** / run 2 **L2-1** — never mounted | BLOCKER | `grep -rn "SlugBar" demo/ --include="*.vue"` → **zero mounts**; 4 total references, all barrel/type positions; no `<component :is>` route (only `PaletteCardMenu.vue:54`, `SearchFilterBar.vue:24`). Live DOM probe §L5-2. |
| run 1 **L-3** — login failure is silent | BLOCKER | `slugBarRef` is created at `useSlugMigration.ts:30`, threaded at `usePalettePorts.ts:79`, and **never bound to a template ref** → permanently `null` → `setError` at `:84-87` is swallowed by the optional chain. The S.W2 W2-6 fix documented at `:78-82` was applied to a channel with no receiver. |
| run 1 **L-4** — the seam gate is vacuous | BLOCKER | `npx eslint --print-config demo/palettes/browser/slug/PaletteSlugBar.vue` → `no-restricted-imports = <ABSENT>`. Where it *does* apply (`demo/color-picker/App.vue`) its only pattern is `@components/custom/palette-browser/**/*.vue` and `grep -rn '"@components' demo/ src/` → **0** — the alias was retired at W43/RF-15. `ls demo/@` → ENOENT, so G-DEMO-1 and G-DEMO-3a match zero files. `demo/palettes/browser/index.ts:9-11` asserts the gate "enforces it standing"; it cannot fire. |
| run 1 **L-2** — forked identity vocabulary | BLOCKER | `looksLikeSlug` + `normalizeTokenInput` byte-identical, `PaletteSlugBar.vue:184-196` ≡ `SlugEditLayer.vue:25-37` (normalized string compare → `True`). Both retain the substring `409/404/429` taxonomy that `useSlugMigration.ts:78-82` documents as retired, inside a `try` whose body ends in a **synchronous** dispatch — unreachable twice over. Correct home `demo/platform/auth/` already exists (`useUserAuth.ts:23,37,77,109`, `sessionToken.ts`, `useAdminAuth.ts`). |
| run 1 **L-6** / run 3 **L3-6** — the `demo/ui/` shim layer | MAJOR | All **19** `demo/ui/*/index.ts` dumped: every one a single re-export, 18 from the glass-ui **root** barrel, `input` alone from `/forms`. glass-ui@7.0.0 publishes `./button`, `./popover` and 12 more of the 19 as subpaths. This one 243-line file reaches the design system three ways: shim→root (`:133`,`:134`), root direct (`:145`), subpath (`:132`). `demo/ui/alert/index.ts` documents its own conversion from a local implementation — the shim is the residue of a migration that stopped one step early (edicts 2, 3). |
| run 1 **L-7** — shell→feature inversion | MAJOR | `SlugEditLayer.vue:5` imports `SESSION_PORT_KEY` from `../../../palettes/usePalettePorts` — the shell reaching *up* into a feature for session identity, while `demo/platform/auth/` owns exactly that concept. This mis-homing is *why* a slug UI could plausibly live inside the palettes feature at all. |
| run 3 **L3-3** — dual export path | BLOCKER | Confirmed independently (no `export/index.ts`; `usePaletteExport.ts:9` → the file; `demo/test/export/byte-exact.test.ts:23` the sole importer of the directory; **0** non-test app importers). Extended by §L5-1. |
| run 2 **L2-4** — `.slug-pill` + uncertified ink | MINOR | Confirmed; partially disputed against run 4's negative proof — §L5-3. |
| run 1 **L-9** minors | MINOR | Re-confirmed: `hasSavedPalettes` (`:150`) required and never read; `resetEditMode` zero callers; `:166` pre-3.5 `ref<InstanceType<…>>` where the live twin already uses `useTemplateRef` (`SlugEditLayer.vue:14`, edict 7); `:239-243` a `<style scoped>` with zero rules. **Small addition:** the `copy: []` emit (`:155`) is **never emitted** — the menu calls the local `onCopySlug()` (`:92` → `:169`) which writes the clipboard directly, so the declared event contract is phantom in the same way `hasSavedPalettes` is. |

**Negative proof, re-taken.** The component imports **nothing** from `@mkbabb/value.js` — correct
for an identity presenter, and there is no deep `src/` reach and no `@src/*` specifier anywhere in
`demo/palettes/`. `verbatimModuleSyntax` (edict 8) is clean in this file (no type-only imports;
`SearchBar` is a genuine value import used in `typeof SearchBar`) and in `useSlugMigration.ts:6`
(`import type`). `npx eslint demo/palettes/browser/slug demo/shell/dock/layers` exits clean — which
is L-4's point, not a reassurance.

---

## Lattice — run 5's delta only

Runs 1–4 have stated the lattice and I concur with it entire, having reached the same shape
independently: identity leaves `demo/palettes/` for `demo/platform/auth/`; one `SlugField` + one
`IdentityMenu`; error state becomes a reactive `lastError` on the identity facade rather than a
method reached through a parent-held component ref; `demo/ui/**` deleted for glass-ui subpaths; the
eslint boundary re-pointed at physical directory zones so it cannot go stale when an alias is
retired; `tsconfig.demo.json:41-48` deleted (run 4 L4-1, confirmed §C-1).

Run 5 adds one node and one guard:

```
ADD    demo/palettes/slug.ts          ONE slugify, the NFKD-correct body. Consumed by
                                      utils.ts createSlug AND export/serializers. Without
                                      this, run 3's L3-3 deletion silently changes slug
                                      behaviour depending on which call site is rewired.

GUARD  CI: every eslint `files:` glob must match >= 1 file.
                                      One assertion. Would have caught G-DEMO-1, G-DEMO-3a
                                      and G-DEMO-3b at W43, four audit runs ago. An inert
                                      gate and a satisfied gate are indistinguishable in a
                                      green run — which is the whole mechanism of run 1 L-4.
```

Both are subtraction-shaped: one function where there are three, one assertion that makes three dead
rules fail loudly instead of passing silently.

---

## Defect table (this run)

| id | severity | defect | evidence |
|---|---|---|---|
| L5-1 | MAJOR | the two `slugify` bodies inside run 3's dual-export finding diverge; the shipped one is NFKD-naive and untested | `demo/palettes/utils.ts:3-12` vs `demo/palettes/export.ts:9-11`; `node -e` → `"Café Noir"` ⇒ `cafe-noir` / `caf-noir` |
| L5-2 | — (evidence) | live-DOM probe with firing controls confirms run 1 L-1 by a third route and attributes the on-page `.slug-pill` to the dock | probe output above; abandoned bundle grep recorded as a failed control, not a result |
| L5-3 | MINOR | `.slug-pill` codifies the per-instance `:style` contract edict 5 forbids, and its cross-feature warrant cites two consumers that do not exist | `demo/styles/foundation.css:582-587`; `grep -rn "slug-pill" demo/` → 3 files, all in `shell/dock` once the dead one is removed; `demo/DESIGN.md:388` |
| L5-4 | INFO | `dist/subpaths/css.d.ts` leaks `_2`-suffixed dts-rollup dedup artifacts into a public declaration | `diff` vs published: 34 lines, 382 vs 350, exported names identical |
| C-1 | withdrawal | my cold-derived MAJOR "type/runtime split on `/css`" is **false**; run 4's L4-1 measurement reproduced | `probes/L4-resolve-probe.cjs` re-run at HEAD `d19da6d3` — both halves identical |
| C-2 | correction | the deleted mounter was `PaletteControlsBar.vue`, not `PaletteDialogHeader.vue`; run 2 is right | `git show 95993197` hunk 794 |

**Strongest defect overall — unchanged since run 1: L-3.** The live application silently swallows
every login failure. The only error surface was assigned to a component nothing has mounted since
`95993197`, and the live control's own `slugError` is written six times and rendered zero. Nothing at
the module or manifest layer is worse than an auth flow that cannot report failure.

**Strongest defect new to run 5: L5-1** — because it is the one place where a *standing, correct,
BLOCKER-rated cure* (run 3's L3-3) would, if executed as written, change user-visible behaviour
without anyone intending it. The dual-export finding was taken as a structural defect; it is also a
correctness one, and the cure needs the extra node before it lands.

**The most useful thing this seat did was withdraw a finding.** I reached run 2's L2-3 independently,
with what looked like stronger evidence than run 2 had, and it was wrong for the reason run 4 had
already measured — I read `vite.config.ts:24-26` and reasoned from a comment instead of from the
resolver. Five auditors, five times. On an axis this thoroughly worked, the marginal value is in
pruning the ledger and fixing the two sentences that keep growing it.
