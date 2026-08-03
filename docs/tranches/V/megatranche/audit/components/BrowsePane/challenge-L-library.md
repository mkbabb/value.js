# CHALLENGE-L — library structure under `demo/palettes/BrowsePane.vue` · PASS 6

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. Declared seat, not
inherited. No DEFECT.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. The brief named HEAD `c654824e`; at
read time HEAD is `d19da6d3` (`docs(V·mega): 3:30am wall harvested — 233/243 axes banked`). Docs-only
drift; no source difference on this axis.
Subject: `demo/palettes/BrowsePane.vue` (360 lines), area `demo/palettes`, route `#/browse`.

**Scope discipline.** Wrote only under
`docs/tranches/V/megatranche/audit/components/BrowsePane/`. No source edits. One probe and its
output preserved in `./probe-L6/`.

**Verdict: DEFECTIVE.** Two new MAJOR findings, both measured; one novel negative proof that
reclassifies a prior pass's cure from *demo-actionable* to *producer-blocked*; one honest retraction
of my own independently-derived finding in favour of pass 3's better proof.

---

## Provenance — this is the sixth seat on this axis

On arrival this path held five reports. **All five are preserved byte-identically.** Pass 5 was
canonical at `challenge-L-library.md`; it is now archived at `challenge-L-library-pass5.md`, md5
verified against the file it was copied from:

```
$ cp challenge-L-library.md challenge-L-library-pass5.md && md5 -q challenge-L-library.md challenge-L-library-pass5.md
fe83ead03016b5de456587c5add3a680
fe83ead03016b5de456587c5add3a680
```

| file | contribution | seat |
|---|---|---|
| `challenge-L-library-pass1.md` | L-1 … L-17 (17) | the structural census |
| `challenge-L-library-pass2.md` | + 4 (21) | the build/config layer |
| `challenge-L-library-pass3.md` | + N-6 … N-9 (25) | the ship path (three build probes) |
| `challenge-L-library-pass4.md` | + N-10 … N-17 (33) | the two boundaries either side of the demo tree |
| `challenge-L-library-pass5.md` | + L5-1 … L5-6 (39) | what the ports hand out **at runtime** (ref identity) |

I derived the axis independently before opening any of them. That derivation reproduced, in this
order: the export dual path, `useDialogBrowseActions`, the OKLab colour search, the `demo/ui/**`
shim barrels, the `getTags` type lie, the port god-object, and `.search-seated`. **Every one was
already recorded, most with sharper evidence than mine.** §Deferrals lists them with the owning
pass. I re-litigate nothing.

### Measured novelty

Five passes audited the demo tree, the build, the ship path, the API/type-map boundaries, and the
ports' runtime object identity. **None audited the cluster barrels as an audience graph** — who
imports which sub-barrel, and whether a cluster's stated audience matches its actual one. Every term
below returns zero across all five prior reports (`probe-L6/novelty-scan.sh`):

```
$ ./probe-L6/novelty-scan.sh
                          p1  p2  p3  p4  p5
UserSortMenu               0   0   0   0   0
MixSourceSelector          0   0   0   0   0
GenerateControls           0   0   0   0   0
ExtractWorkbench           0   0   0   0   0
SKELETON_COUNT             0   0   0   0   0
SearchVariant              0   0   0   0   0
searchVariants             0   0   0   0   0
palettes/mix               1   0   0   0   0      ← pass 1, but only as a value.js-import census row
wrong home                 0   0   0   0   0
```

Pass 4's N-15 established that the top-level seam `demo/palettes/browser/index.ts` has **zero
importers**. That is correct and I re-derived it. But zero-importers was read as *dead scaffolding*.
It is not: the seam is dead **because its real external consumers bypass it**, and once you look at
who those consumers are, the `browser/` cluster's self-description turns out to be false about its
own audience. That is L6-1, and it changes the lattice rather than adding a line to it.

---

## L6-1 · MAJOR — the `browser/` mega-feature seam misdescribes its audience: the `card` cluster is a repo-wide component set homed inside one feature

`demo/palettes/browser/index.ts:1-7` states the ownership claim:

> "palette-browser — the mega-feature's **TOP-LEVEL SEAM** (U.W-DEMO · U-F47). The stable public API
> of the palette-browser feature: a single barrel that re-exports the six sub-feature faces
> (card · admin · search · dialog · slug · status). **External consumers reach the feature through
> THIS seam** (or a sub-barrel it re-exports), never a raw internal `.vue` file."

Two measurements, both from `probe-L6/probe-cluster-audience.mjs` (a real multi-line-aware import
parser over all 305 `demo/**/*.{vue,ts}` files — not a grep, because every cluster import in the
tree spans multiple lines):

**(a) The seam has zero importers.**

```
$ grep -rn 'from "[^"]*palettes/browser"\|from "\./browser"\|from "\.\./browser"' demo/
(empty)
```

**(b) Its actual external consumers reach past it, and three of them are not palettes features
at all.** Full cluster-import graph (`probe-L6/cluster-audience-output.txt`):

```
demo/workbenches/mix/MixSourceSelector.vue      -> card   [PaletteCard, PaletteColorStrip]
demo/workbenches/generate/GenerateControls.vue  -> card   [PaletteColorStrip]
demo/workbenches/extract/ExtractWorkbench.vue   -> card   [PaletteCard, PaletteCardSkeleton, ShadowPalette]
demo/color-picker/App.vue                       -> dialog [MigratePalettesDialog]
demo/palettes/BrowsePane.vue                    -> card   [PaletteCard, PaletteCardGrid, PaletteCardSkeleton]
demo/palettes/BrowsePane.vue                    -> search [SearchFilterBar, TagEditPopover]
demo/palettes/BrowsePane.vue                    -> dialog [VersionHistoryDrawer, FlagReportDialog]
demo/palettes/BrowsePane.vue                    -> dialog [useDialogBrowseActions]
demo/palettes/admin/AdminPane.vue               -> admin  [AdminUsersPanel × 5]
demo/palettes/admin/AdminPane.vue               -> search [UserSortMenu]                    ← L6-2
demo/palettes/useAdminUsers.ts                  -> admin  [AdminUsersPanel]
demo/palettes/useSlugMigration.ts               -> slug   [PaletteSlugBar]
demo/palettes/PalettesPane.vue                  -> card   [CurrentPaletteEditor, PaletteCard, PaletteCardGrid]
```

Exact sites:

```
demo/workbenches/mix/MixSourceSelector.vue:8       import { PaletteCard, PaletteColorStrip } from "../../palettes/browser/card";
demo/workbenches/generate/GenerateControls.vue:16  import { PaletteColorStrip } from "../../palettes/browser/card";
demo/workbenches/extract/ExtractWorkbench.vue:200  } from "../../palettes/browser/card";
```

**The finding.** `PaletteCard`, `PaletteColorStrip`, `PaletteCardSkeleton` and `ShadowPalette` are
consumed by **four features** — palettes, mix, generate, extract. They are not a palette-browser
sub-face; they are the demo's shared palette-presentation vocabulary, and they live three
directories deep inside one consumer of themselves (`demo/palettes/browser/card/`). Every
non-palettes consumer must write `../../palettes/browser/card` — an import path that names a feature
it has nothing to do with, then a *sub-feature* of that feature, to reach a component it co-owns.

This is the "unique semantic ownership" invariant failing in the direction nobody checked. Five
passes asked *"is logic here that belongs in `src/`?"*. The answer for the card cluster is the
mirror image: **logic here belongs to more callers than its home admits.** And the seam's docstring
asserts the opposite of what the graph shows — that external consumers come through the top, when in
fact 3 of the 4 external consumers come through the side and the top is unused.

Consequence for BrowsePane specifically: it and three workbenches now co-own six components with no
declared shared owner, so any change to `PaletteCard`'s contract is a four-feature change that looks
like a one-feature change from the directory tree. Pass-1 L-12's `cardRefs`/`defineExpose` finding
and pass-5 L5-3's leak both live in exactly that blind spot — `defineExpose` on
`PaletteCard.vue:244` is part of a contract three workbenches also consume.

**Reproduction.** `node probe-L6/probe-cluster-audience.mjs` from the repo root; output preserved at
`probe-L6/cluster-audience-output.txt`. Deterministic, no browser required.

**Cure (transposition).** The card cluster is not a sub-feature; promote it to what it is. Move
`demo/palettes/browser/card/{PaletteCard,PaletteCardGrid,PaletteCardSkeleton,PaletteColorStrip,ShadowPalette}`
to `demo/palettes/cards/` — one level, out of `browser/`, since `demo/palettes` *is* the palette
domain and all four consumers agree on that much. `CurrentPaletteEditor` stays behind (sole consumer
`PalettesPane.vue`, a genuine feature face). Then delete
`demo/palettes/browser/index.ts` entirely: it has zero importers, and with the shared set promoted
the remaining five clusters are genuinely feature-private, so a top-level seam over them has nothing
to seam. Net: −1 dead barrel, −1 directory level for four consumers, and the audience becomes
readable from the path.

This does not create a new `shared/` directory (edict 3): `demo/palettes/` already exists and is the
correct domain owner for a palette card.

---

## L6-2 · MAJOR — `UserSortMenu` is admin-only, lives in the `search` cluster, and `#/browse` loads it

`demo/palettes/browser/search/UserSortMenu.vue` has exactly one importer, and it is the admin
console:

```
demo/palettes/admin/AdminPane.vue:86   import { UserSortMenu } from "../browser/search";
demo/palettes/admin/AdminPane.vue:17               <UserSortMenu
```

It is not used by `SearchFilterBar` — that file's import block (`SearchFilterBar.vue:128-145`) does
not mention it. The only edge from the browse surface is the barrel line:

```
demo/palettes/browser/search/index.ts:4   export { default as UserSortMenu } from "./UserSortMenu.vue";
```

and `BrowsePane.vue:190` imports `{ SearchFilterBar, TagEditPopover }` from that barrel.

**Measured on the live dev server** — `http://localhost:9000/#/browse`, Playwright network trace,
one navigation:

```
2. GET /@fs/…/demo/palettes/BrowsePane.vue                       200
3. GET /@fs/…/demo/palettes/browser/search/index.ts              200
4. GET /@fs/…/demo/palettes/browser/search/SearchFilterBar.vue   200
5. GET /@fs/…/demo/palettes/browser/search/UserSortMenu.vue      200   ← admin-only component
6. GET /@fs/…/demo/palettes/browser/search/TagEditPopover.vue    200
7. GET /@fs/…/demo/palettes/browser/search/MiniColorPicker.vue   200
```

Request 5 is the finding: an unauthenticated public route fetches an admin-console component,
purely because of which directory the file sits in.

**Severity, stated honestly.** In the production build, named re-exports plus glass-ui's
`sideEffects` posture mean this is tree-shaken — pass 3's Probe B established by build measurement
that forcing `moduleSideEffects: true` changes the output not at all, so I claim **no shipped-bytes
regression**. It is an ownership defect with a measured dev-graph consequence, which is exactly the
severity pass 4 assigned the analogous `demo/ui` case. Cross-audience leakage through a cluster
barrel is also the mechanism that will make L6-1's promotion harder the longer it stands.

**Cure.** `git mv demo/palettes/browser/search/UserSortMenu.vue demo/palettes/admin/` and drop line
4 of `browser/search/index.ts`. `AdminPane.vue:86` becomes `import UserSortMenu from
"./UserSortMenu.vue"` — a sibling import inside the cluster that actually consumes it. The search
cluster stops exporting admin surface; BrowsePane's barrel import stops reaching it.

---

## L6-3 · MINOR — `demo/palettes/mix.ts` has zero consumers in its own feature

```
demo/workbenches/mix/MixConfigBar.vue:14               import type { LeftoverStrategy } from "../../palettes/mix";
demo/workbenches/mix/composables/useMixingState.ts:21  import { mixColorSequence, mixPalettes, type LeftoverStrategy } from "../../../palettes/mix";
```

Both importers are the mix workbench. Nothing in `demo/palettes/` imports it. It is one of only two
files in the whole demo that consume value.js from this area (`mix.ts:14` →
`@mkbabb/value.js/color`), so the area's library coupling is misattributed along with the file.

Pass 1 lists `demo/palettes/mix.ts:14` in its value.js-subpath census (a *correctness* check on the
public surface, which it passes). No pass has filed its **home** as a defect — `probe-L6/novelty-scan.sh`
confirms `"wrong home"` returns 0/5.

Same mechanism as L6-1, opposite sign: L6-1 is a module whose audience is wider than its home
admits; this is a module whose audience is entirely *elsewhere*.

**Cure.** `git mv demo/palettes/mix.ts demo/workbenches/mix/mix.ts`. It keeps its
`../palettes/types` import — a legitimate downhill edge to the domain types.

---

## L6-4 · INFO — a named constant contradicted three lines from its own rationale

`BrowsePane.vue:205-207` names the developing-plate count and argues for it:

```ts
// W5-1: the developing-wall shadow count — a handful of plates reads as "the
// wall is developing" without paying 50 shimmer surfaces of compositor work
// (the K.WP P1-4 lesson).
const SKELETON_COUNT = 4;
```

`BrowsePane.vue:130`, the load-more skeleton row, hard-codes a different one:

```
<PaletteCardSkeleton v-for="i in 2" :key="i" variant="developing" />
```

Two skeleton counts in one file, one named and reasoned, one literal. Either the page-2 count is a
distinct concept and deserves a name, or it is the same concept and should read `SKELETON_COUNT`.
0/5 prior mentions.

---

## Novel negative proof — the `.search-seated` cure is producer-blocked, not demo-actionable

Pass 1 L-15 filed `.search-seated .input-bar-field` (`utils.css:152`, applied at `BrowsePane.vue:12`)
as MINOR: it styles a glass-ui internal class, unlayered to beat the producer recipe. Correct. Both
pass 1 and pass 5 note the demo books it as interim. **No pass checked whether the booked swap
target exists in the adopted producer version.** I did, and it does not:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/search/searchVariants.d.ts
declare const VARIANT: {
    readonly inline: "";
    readonly bare: "border-none bg-transparent p-0 rounded-none";
    readonly floating: "border-none bg-transparent p-0 rounded-none";
};
export type SearchVariant = keyof typeof VARIANT;

$ cat node_modules/@mkbabb/glass-ui/dist/components/_shared/axes.d.ts
export declare const SURFACES = ["glass", "veil", "opaque"];
export declare const SURFACE_TIERS = ["wash","quiet","resting","floating","overlay"];

$ node -e 'console.log(require("@mkbabb/glass-ui/package.json").version)'
7.0.0
```

`SearchBar`'s props are `{modelValue, placeholder, icon, tag, size, surface, variant}`
(`SearchBar.vue.d.ts:4-12`). There is **no `seated` rung** on `SearchVariant`, and no
`well`/`seated` member on `Surface`. The seated register the demo needs — `--well-bg` fill,
`backdrop-filter: none`, `--card-edge` border, `--shadow-cartoon-sm` (`utils.css:132-139`) — is not
expressible with any combination of the shipped axes.

**Why this matters and is not a quibble.** W44 adopted glass-ui 7.0.0 whole. A reader of passes 1–5
would reasonably conclude the `.search-seated` override is now removable demo debt. It is not: the
producer ask (**GLASSUI-T-ASKS ASK-D `variant="seated"`**, with ASK-B the font seam and ASK-C the cap
seam, per `utils.css:129-131`) **did not land in 7.0.0**, and inventing a demo wrapper instead would
violate edict 3. So:

- the override is **correctly booked** and must not be born-RED as a demo defect;
- the only demo-side defect is its *reach* — `.search-seated .input-bar-field` (`utils.css:152`)
  descends into a producer-internal class, which is pass 1 L-15's real finding and stands;
- the actionable output is a **relay, not a repair**. Per the standing BH/BI edict (every
  component/glass-ui-level change relays to the active glass-ui inbox), ASK-D should be re-sent
  against 7.0.0 with this measurement attached: three panes
  (`BrowsePane.vue:12`, `PalettesPane.vue:35`, `admin/AdminPane.vue:14`) carry the override, and the
  producer surface that would retire it is enumerated above.

---

## Retraction — one of my own findings, deferred to pass 3

My independent derivation flagged `demo/palettes/browser/dialog/index.ts:2-5` for blaming a
"`./demo/**` sideEffects mark" that I could not find in the tree (`package.json:20` is
`"sideEffects": false`; no `demo/**` glob exists in `package.json` or `vite.config.ts`). I was going
to file it as a stale-rationale defect.

**Pass 3 proved this better and I withdraw the framing.** Its Probe B forced
`treeshake: { moduleSideEffects: true }` and measured byte-identical output with the same hash, then
concluded the sharper thing: `"sideEffects": false` is declared for the whole package *including*
`demo/**`, whose SFC `<style>` blocks are genuinely side-effecting, so the declaration is **untrue
of `demo/` and currently inert** — "an untrue declaration that happens to be inert under today's
tree-shaker and will not stay inert" (`challenge-L-library-pass3.md:152-160`). The barrel comment is
imprecisely worded, not false. Pass 3's cure — `demo/` becomes its own workspace package declaring
`sideEffects: ["*.css","*.vue"]` — subsumes anything I would have said. Recorded so a seventh seat
does not re-file it.

---

## Deferrals — prior passes are stronger; do not re-open on my account

| finding | owner | note |
|---|---|---|
| Export dual path: `export.ts` (0 tests, ships) vs `export/` (29 tests, 0 runtime consumers) | **pass 1 L-1 / pass 4** | independently re-derived incl. the `ls export/index.ts` resolution proof, the `serializers.ts:6-9` self-quote, the schema/filename divergence table, and `npx vitest run demo/test/export/byte-exact.test.ts` → 29 pass. Pass 1's slugifier-divergence table and pass 4's measurement are better. Nothing added. |
| `useDialogBrowseActions`: dead `modalStack`, unreachable `onRevert`, duplicate at `BrowsePane.vue:277-284` | **pass 1 L-9** | re-derived identically, incl. `find demo -iname "*PaletteDialog*"` → empty and `grep modalStack` → 5 hits all inside the definition. Pass 1 already states "**0 suppliers**" and "**unreachable**" verbatim. |
| OKLab search: no home, `0.15` twice, page-scoped filter, gratuitous `(p: any)` at `:344` | **pass 1 L-8 / pass 4 N-13** | re-derived incl. the `crud-list.ts:159-181` clone and `types.ts:32`. Pass 4's live 5-of-10 `oklabColors` census is decisive; pass 5's L5-5 measured hypot-vs-sqrt at 37.4 % / 0 predicate disagreements. |
| `demo/ui/**` = 19 pure re-export shims; both conventions in one BrowsePane import block | **pass 1 L-3 / pass 3 N-9 / pass 4** | re-derived (19/19 pure; measured root barrel 43 chunks / 168,303 B vs card+button 2 / 8,259 B; `sideEffects:["*.css"]` + no CSS import ⇒ tree-shaken, so no shipped-bytes claim). Pass 4's "74 export keys" and pass 4 N-9's `no-restricted-imports` cure are finer. |
| `getTags` asserts `Tag[]` and never validates; `availableTags` shim at `:215-220`; TagEditPopover unrepaired | **pass 1 L-16 / pass 4 N-10 / pass 5 L5-4** | re-derived incl. `curl` both targets → `[]`. Pass 5's root cause — `request<T>` is an assertion, not a decoder (`client.ts:101,130`) — is strictly better than my leaf framing. |
| Ports are a god facade: whole sub-composables smuggled; shared `searchQuery` and `expandedId` refs | **pass 4 L-7 / pass 5 L5-1, L5-2** | re-derived the coarse version (30-member `browsePort`, `versions`/`tagEdit`/`flagged` at `:189-191`, 15 template `.value` reads). Pass 5's runtime `===` identity probe with a negative control is a different and higher order of proof. |
| `useAdminFlagged` mixed authority: 15 of 16 token-gated, `report` public, reached via the browse port | **pass 1 L-7** | re-derived exactly (`:119-131` vs `:46,60,82,94`; `BrowsePane.vue:298`). Pass 1 already prescribes the split into `useFlagReport()` / `useAdminFlagQueue()`. |
| `cardRefs` never prunes; `el &&` discards Vue's unmount `null` | **pass 1 L-12 / pass 5 L5-3** | not re-derived; pass 5's proof from `runtime-core.cjs.js:1763` is definitive. |
| `remotePalettes` unowned — 9 index mutations across 6 modules | **pass 1 L-10 / pass 5 synthesis** | subsumed. |
| `"sideEffects": false` untrue of `demo/`; `files` negation globs patch a boundary | **pass 3 (Probe B) / N-7** | **my retraction above.** |
| No `"."` in `package.json#exports` | **pass 1 L-5** | pass 4's `vite resolveId` proof is decisive. |
| G-DEMO eslint globs inert (`demo/@` absent) | **pass 1 L-4 / pass 3 N-2** | re-derived; nothing added. |
| Wire contract has no home; 20 of 22 fields diverge | **pass 4 N-10** (cure amended by pass 5 L5-4) | untouched. |
| `.search-seated .input-bar-field` reaches a producer-internal class | **pass 1 L-15** | stands; **producer-blocked per my negative proof above.** |
| `pane-scroll-fade` re-typed on 8–9 pane roots | **pass 1 L-13 / pass 2** | not re-derived. |
| Visual matrix captured only the `misconfigured` error state | **pass 5 L5-6** | re-derived independently (read `shots/safari-desktop-light/browse.png`; REPORT rows `text=280/124, overflowX=0, pageErr=0, consoleErr=0`). Pass 5's `availability.ts:29-36` causal proof is better. Restated only as §Visual below because it bounds L6-2's reproduction. |

### Sound — and my own re-derivation agrees

The demo→library public-surface discipline is **clean**, and pass 5 proved it positively. I
re-derived it and got the same result: no `@src`, no `../src`, no unpublished subpath anywhere in
`demo/`; the sole bare `@mkbabb/value.js` occurrence is prose (`demo/shared/utils.ts:12`);
`vite.config.ts:37-50` *generates* the self-alias set from `package.json#exports` with anchored
regexes, so an alias cannot drift from the export map. **BrowsePane imports no value.js at all**, and
every value.js specifier in this area (`palettes/mix.ts:14`, `palettes/export/png.ts:11`) is one a
real npm consumer could write. This remains the boundary that works; L6-1's and L6-3's moves do not
touch it.

Also confirmed sound on my axis: `verbatimModuleSyntax` (BrowsePane's only type-only import,
`:197`, is correctly `import type`); `Card tier="resting"` (`:2`) uses glass-ui's real `SURFACE_TIERS`
axis; `demo/shared/ui/{EmptyState,PaneHeader}.vue` have no glass-ui equivalent (the producer ships
`header-ribbon` only) and are legitimately demo-owned; the three-parallel-`useDark` suspect named in
the brief does not reach this subtree (`grep -rn useDark demo/palettes/` → empty); the
`(open, subject)` triple at `:269-310` is **not** duplicated in `PalettesPane.vue` or
`admin/AdminPane.vue` (checked), so it is local verbosity and edict 3 argues against extracting it.

Per MT-F022 the Chromium keyboard 7/12 gap is roving tabindex and is **not** born-RED. No keyboard
finding is filed.

---

## Visual — bounding L6-2's reproduction

All four Safari matrices captured `/#/browse` in the error state (`REPORT.md:121,136,151,166`:
`text=280` desktop / `124` mobile, `overflowX=0`, `pageErr=0`, `consoleErr=0`, `smallTapTargets=4`;
image read at `shots/safari-desktop-light/browse.png` shows "The commons is unreachable. / Failed to
load palettes" plus the Retry button, `BrowsePane.vue:61-78`). Pass 5's L5-6 established the cause
(`availability.ts:29-36`: loopback origin + unset `VITE_API_URL` → the designed `misconfigured`
latch) and I confirm it — `curl` against both the local and prod commons returns `[]`.

Two consequences for this pass, recorded because they bound what I claim:

1. **L6-2's dev-graph measurement is unaffected** — the module fetch for `UserSortMenu.vue` happens
   at route load, before any commons request, so the latch is irrelevant to it. CONFIRMED.
2. **L6-1's user-visible surface is uncaptured** — `PaletteCard` renders in none of the four
   matrices, so the four-feature shared contract it exposes (`defineExpose`,
   `PaletteCard.vue:244`) has no visual regression baseline in any of the three workbenches that
   consume it either. A matrix re-run with `VITE_API_URL` set closes this and four prior open
   reproductions at once; it remains the single highest-leverage cheap action on this component.

---

## Lattice contribution — the layer five passes did not place

Passes 1–4 specified the export, `demo/ui`, eslint and contract layers; pass 5 specified the port
layer. All five placed the card cluster where it already is. It does not belong there:

```
L1  demo/palettes/                     the palette DOMAIN
      types.ts · api/ · use*.ts        (unchanged)
      mix.ts                → DELETED, moves to workbenches/mix/            (L6-3)

L2  demo/palettes/cards/               ← NEW HOME, not a new concept
      PaletteCard · PaletteCardGrid · PaletteCardSkeleton
      PaletteColorStrip  · ShadowPalette
      audience: palettes · workbenches/mix · workbenches/generate
                · workbenches/extract  — four features, one home           (L6-1)
      feedback is a PROP; no defineExpose                       (pass 1 L-12 / pass 5 L5-3)
      expanded is v-model on the Grid, per wall                            (pass 5 L5-2)

L3  demo/palettes/browser/             genuinely feature-PRIVATE faces
      search/   SearchFilterBar · TagEditPopover · MiniColorPicker
                (UserSortMenu REMOVED → admin/)                            (L6-2)
      dialog/   FlagReportDialog · VersionHistoryDrawer · MigratePalettesDialog
                (composables/ DELETED)                                     (pass 1 L-9)
      slug/ · status/
      card/     CurrentPaletteEditor only (sole consumer PalettesPane)
      index.ts  → DELETED: zero importers, and with L2 promoted there is
                  nothing left that needs a seam                           (L6-1, pass 4 N-15)

L4  demo/palettes/admin/               AdminPane · UserSortMenu            (L6-2)
L5  demo/palettes/{BrowsePane,PalettesPane}.vue    composition only
```

Two rules generate this layer, and both are the same rule read in opposite directions:

1. **A module's home must not be narrower than its audience.** The card set has four consumers; its
   path claims one. (L6-1)
2. **A module's home must not be wider than its audience.** `UserSortMenu` has one consumer, the
   admin console; its path offers it to the public browse surface. `mix.ts` has zero consumers in
   the feature it lives in. (L6-2, L6-3)

Neither rule needs a new directory that does not already exist, and neither needs a wrapper
component — the moves are `git mv` plus barrel-line deletions. Both are mechanically checkable by
the probe in `./probe-L6/`, which should be lifted into the suite alongside pass 5's ref-identity
probe: **assert that every cluster barrel's exports have importers only within that cluster's
declared audience.** Those two probes together are the standing guard for the whole ports-and-
clusters layer.

BrowsePane after this pass's cures and the prior five: still pass 5's ~90 lines, but its import
block also loses the `browser/search`→admin edge and reads `./cards` instead of `./browser/card` —
four specifiers of the original thirteen, each naming something that is actually where it says it is.

---

## Ledger — pass 6

| ID | Severity | Defect | Reproduction |
|---|---|---|---|
| **L6-1** | MAJOR | The `browser/` seam misdescribes its audience: seam has 0 importers while `card`'s real consumers are 3 non-palettes features; a repo-wide component set is homed inside one of its own consumers | **CONFIRMED** — `probe-L6/probe-cluster-audience.mjs` full import graph; sites `MixSourceSelector.vue:8`, `GenerateControls.vue:16`, `ExtractWorkbench.vue:200`; seam-importer grep empty |
| **L6-2** | MAJOR | `UserSortMenu` is admin-only (`admin/AdminPane.vue:86` sole importer) but homed in `browser/search/` and exported from the barrel `BrowsePane.vue:190` imports | **CONFIRMED** — live dev-server network trace of `#/browse` fetches `UserSortMenu.vue` (request 5); `search/index.ts:4` is the sole edge; `SearchFilterBar.vue:128-145` does not import it |
| **L6-3** | MINOR | `demo/palettes/mix.ts` has zero consumers in its own feature; both importers are `workbenches/mix/` | **CONFIRMED** — `MixConfigBar.vue:14`, `composables/useMixingState.ts:21`; no `demo/palettes/` importer |
| **L6-4** | INFO | `SKELETON_COUNT = 4` (`:207`) contradicted by hard-coded `v-for="i in 2"` (`:130`) in the same file | **CONFIRMED** by read |
| **N-L6** | negative proof | glass-ui 7.0.0 has no `seated` rung — `SearchVariant = inline\|bare\|floating`, `Surface = glass\|veil\|opaque`. Pass 1 L-15's cure is **producer-blocked**; ASK-D must be re-relayed, not repaired in demo | **CONFIRMED** — `searchVariants.d.ts`, `_shared/axes.d.ts`, `SearchBar.vue.d.ts:4-12` at version 7.0.0 |
| — | retraction | My `./demo/**` sideEffects finding withdrawn in favour of pass 3's Probe B, which proved the sharper claim | `challenge-L-library-pass3.md:152-160` |

Running total across six passes: **43 findings**, of which this pass contributes 3 new defects
+ 1 INFO + 1 novel negative proof, defers 16 to prior seats, and retracts 1 of its own.

---

## Evidence index (pass 6)

| claim | artifact |
|---|---|
| pass 5 preserved byte-identically | `md5 -q` both files → `fe83ead03016b5de456587c5add3a680` |
| novelty of every claimed finding vs passes 1–5 | `probe-L6/novelty-scan.sh` (all terms 0/5) |
| L6-1 cluster audience graph | `probe-L6/probe-cluster-audience.mjs`, output `probe-L6/cluster-audience-output.txt` |
| L6-1 external card-cluster sites | `MixSourceSelector.vue:8` · `GenerateControls.vue:16` · `ExtractWorkbench.vue:200` |
| L6-1 seam has zero importers | `grep -rn 'from "[^"]*palettes/browser"' demo/` → empty |
| L6-1 the seam's own audience claim | `demo/palettes/browser/index.ts:1-7` |
| L6-2 sole importer + barrel edge | `admin/AdminPane.vue:17,86` · `browser/search/index.ts:4` · `SearchFilterBar.vue:128-145` |
| L6-2 dev fetch on `#/browse` | Playwright network trace, requests 2-7, `http://localhost:9000/#/browse` |
| L6-3 importers both outside the feature | `MixConfigBar.vue:14` · `composables/useMixingState.ts:21` |
| L6-4 | `BrowsePane.vue:130` vs `:205-207` |
| N-L6 producer surface at 7.0.0 | `node_modules/@mkbabb/glass-ui/dist/components/search/searchVariants.d.ts` · `components/_shared/axes.d.ts` · `components/search/SearchBar.vue.d.ts:4-12` · `package.json` version `7.0.0` |
| N-L6 the demo recipe ASK-D would replace | `demo/styles/utils.css:126-155`; sites `BrowsePane.vue:12`, `PalettesPane.vue:35`, `admin/AdminPane.vue:14` |
| commons unreachable (bounds the visual matrix) | `curl` local + `https://api.color.babb.dev/colors/tags` → `[]` |
| public-surface discipline sound (re-derived) | subpath census vs `package.json#exports`; `vite.config.ts:37-50` |
| export dual path re-derived (deferred) | `ls demo/palettes/export/index.ts` → absent; `npx vitest run demo/test/export/byte-exact.test.ts` → 29 passed |

**No source edits land from this seat.** Files written: this report,
`challenge-L-library-pass5.md` (archival copy), and `probe-L6/` (1 probe + 1 output + 1 scan script).
