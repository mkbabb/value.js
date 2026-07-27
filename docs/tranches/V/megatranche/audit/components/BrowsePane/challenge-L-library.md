# CHALLENGE-L — library structure under `demo/palettes/BrowsePane.vue` · PASS 2

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with an explicit declaration for. Declared seat, not inherited. No DEFECT.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/BrowsePane.vue` (360 lines), area `demo/palettes`, route `#/browse`.

---

## Provenance — a pass-1 seat had already run this axis

On arrival this path already held a 17-finding CHALLENGE-L report written earlier today
(13:47). **It is preserved verbatim at
`docs/tranches/V/megatranche/audit/components/BrowsePane/challenge-L-library-pass1.md`** — nothing
is lost. I re-derived the axis independently before reading it; where we converge I say so and
defer to whichever evidence is stronger, and I do not re-litigate a finding pass 1 proved better
than I did (its slugifier divergence table and its `import.meta.resolve` root-export proof are both
strictly better than anything I produced on those points).

This pass-2 file is the reading surface: §A rolls pass-1 forward in full so this document alone is
sufficient; §B carries what is **new** — four findings pass 1 does not contain, one of them MAJOR
and structurally interlocked with pass 1's own proposed cure; §C carries the joint verdict.

**Verdict: DEFECTIVE.** 21 findings across both passes; 12 MAJOR-or-worse. The premise holds, but
not at the library boundary the brief guessed — I prove that negative in §C along with pass 1. The
rot is inside `demo/`, and its through-line is: **a concept has two or three homes, the shipping
home is the wrong one, and the guard that was supposed to prevent exactly this evaluates to
`undefined`.**

---

# §A — Pass 1, rolled forward

Full text and evidence: `challenge-L-library-pass1.md`. Verified spot-checks of mine are marked ✔.

| # | sev | finding | my check |
|---|---|---|---|
| L-1 | BLOCKER | The V.W51 byte-exact export contract (`demo/palettes/export/`, 12 modules) ships to **nobody**; its only consumer is `demo/test/export/byte-exact.test.ts:23`. `usePaletteExport.ts:9` resolves `./export` → the 132-line pre-contract `demo/palettes/export.ts`, which is what `BrowsePane.vue:115,324` runs. `export/serializers.ts:6-9` names its own rival in prose. | ✔ re-derived independently; same two greps |
| L-2 | MAJOR | Three slugifiers (`utils.ts:3-12`, `export.ts:9-11`, `canonical.ts:52-58`), 6-of-6 measured divergence on non-ASCII (`"Ångström Blues"` → `angstrom-blues` vs `ngstr-m-blues`), against a contract clause that says *"no slugifier exists"*. | not re-derived; pass-1 evidence is stronger than mine |
| L-3 | MAJOR | `demo/ui/**` is 19 pure re-export barrels of glass-ui; BrowsePane reaches the design system **both ways** in one import block (`:180-181` barrel, `:195` `@mkbabb/glass-ui/search`). | ✔ `for f in demo/ui/*/index.ts; do …` → **zero** non-re-export lines in any of the 19 |
| L-4 | MAJOR | G-DEMO-1 / 3a / 3b in `eslint.config.js:220-303` are inert — globs point at the deleted `demo/@/**`, ban a deleted `@components` alias. | ✔ **and strengthened — see N-2** |
| L-5 | MAJOR | No `"."` in `package.json#exports`; `import.meta.resolve("@mkbabb/value.js")` → `ERR_PACKAGE_PATH_NOT_EXPORTED`, yet `demo/shared/utils.ts:15-17` and `docs/colors/quantization.md:6` both assert a root barrel. | ✔ confirmed the map has 7 subpaths, no root |
| L-6 | MAJOR | `BROWSE_PORT_KEY` lives in the provider module, so a leaf pane importing the key pulls the whole port assembly. | ✔ `BrowsePane.vue:182` imports from `./usePalettePorts` (275 L, 17 sub-composable imports) |
| L-7 | MAJOR | The port smuggles whole sub-composables (`versions`, `tagEdit`, `flagged` at `usePalettePorts.ts:189-191`); the god facade was renamed, not dissolved. | ✔ `browsePort` = 36 members; BrowsePane consumes ~30 of them |
| L-8 | MAJOR | OKLab distance has no home: `BrowsePane.vue:339-349` and `api/.../crud-list.ts:159-180` hand-roll it with the same `0.15`; the typed seam (`api/palettes.ts:27-30,50-53`) has **zero callers** — a comment (`BrowsePane.vue:354`) stands in for the call. Includes the gratuitous `(p: any)` over an already-typed `Palette.oklabColors` (`types.ts:32`). | ✔ re-derived independently; **extended with live data — see N-3** |
| L-9 | MAJOR | `useDialogBrowseActions` is now the duplicate it was written to kill, and carries a `modalStack` shim for `PaletteDialog.vue`, a host that no longer exists. | ✔ `find demo -name "PaletteDialog*"` → empty; `grep -rn modalStack demo/` → 5 hits, all inside that one file |
| L-10 | MAJOR | `remotePalettes` has no owner — 9 hand-rolled slug-index mutations across 6 modules. | ✔ `BrowsePane.vue:281-282,314-318` are two of them |
| L-11 | MAJOR | The typed error vocabulary is discarded at the pane boundary. | not re-derived |
| L-12 | MAJOR | The card-feedback rail is implemented twice and leaks in both copies. | not re-derived |
| L-13 | MINOR | "ONE card species" (`DESIGN.md:97`) is a copy-pasted 7-utility string on 8 sites; `sed -n 2p` of BrowsePane/PalettesPane/AdminPane md5-matches byte-identical. | ✔ **and its cure is incomplete without N-1** |
| L-14 | MINOR | `MiniColorPicker.vue` hand-rolls HSV↔RGB↔hex inside a colour library's own demo. | ✔ its sibling `SearchFilterBar.vue:206` *does* reach the library (`parseColorIn`), so the inconsistency is intra-directory |
| L-15 | MINOR | `.search-seated .input-bar-field` (`demo/styles/utils.css:152`) styles a glass-ui internal class. Known residual, booked to P3/ASK-D. | ✔ applied at `BrowsePane.vue:12` |
| L-16 | INFO | Masking fallback at the leaf for an untyped wire payload (`availableTags`, `BrowsePane.vue:215-220`). | ✔ |
| L-17 | MINOR | The pane owns half its data lifecycle, app-boot owns the other half. | ✔ `onMounted(() => pm.tagEdit.loadAllTags())` at `:222-224` while the wall's own load is elsewhere |

---

# §B — New in pass 2

## N-1 · MAJOR — a nine-consumer global CSS recipe is owned by a component that renders none of its consumers

**Not in pass 1** (`grep -ci "PaneHeader\|pane-scroll-fade" challenge-L-library-pass1.md` → 0, 0).

`demo/shared/ui/PaneHeader.vue:40-58` ships an **unscoped** `<style>` block — the only unscoped
block in the file, sitting above a normal `<style scoped>` — that defines the pane scroll host:

```css
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
```

The file's own comment states the inversion rather than resolving it (`:43-49`):

> *"The `.pane-scroll-fade` host class lives on the ROOT element of each pane Card (9 sibling
> panes…). Because the class is applied across siblings of PaneHeader (not its descendants), the
> block must be UNSCOPED to reach those consumers."*

The nine consumers — none of which is PaneHeader, all of which are pane **roots**:

```
$ grep -rn "pane-scroll-fade" demo/ | grep -v DESIGN.md | grep -v PaneHeader.vue
demo/palettes/BrowsePane.vue:2            demo/palettes/PalettesPane.vue:2
demo/palettes/admin/AdminPane.vue:2       demo/workbenches/gradient/GradientPane.vue:20
demo/workbenches/mix/MixPane.vue:62       demo/workbenches/extract/ExtractPane.vue:5
demo/workbenches/generate/GeneratePane.vue:31  demo/scenes/about/AboutPane.vue:4
demo/scenes/ConfigSliderPane.vue:106
```

Three separate laws are broken by one block.

**(a) Ownership.** A component owns the CSS of a surface it does not render. `PaneHeader` emits a
`<div class="pane-header …>`; `.pane-scroll-fade` lands on a `<Card>` two levels up that PaneHeader
never sees. Unique semantic ownership — exactly one home per concept — fails here in the most
literal way available: the producer and the consumer are different components in different
directories.

**(b) The project's own written rule is inverted.** `demo/DESIGN.md:388`:

> *"**No new global utility class for one consumer** — colocate to the component's `<style
> scoped>` (post-D.W4 Lane A: `.pane-scroll-fade`, the touch-gate cluster … moved out of
> `style.css`). The shared survivors (`.slug-pill`, `.app-layout`, `.pane-container`,
> `.underline-tabs`) are true cross-feature recipes; each carries a comment justifying its global
> residence."*

The rule's test is consumer count. `.pane-scroll-fade` has **nine** consumers spanning four feature
trees (`palettes`, `workbenches`, `scenes`, `palettes/admin`) — by DESIGN.md's own definition it is
a *shared survivor* and belongs in `demo/styles/`. It was moved the wrong way, and the migration
note at `demo/styles/foundation.css:578` records the move as done: *"`.pane-scroll-fade` colocated
into PaneHeader.vue's unscoped `<style>`"*. The colocation rationale offered in `PaneHeader.vue:47-49`
— *"PaneHeader owns the only consumers of `--pane-scroll`"* — is true of the **timeline** and false
of the **class**: it justifies colocating the `animation-timeline` *readers* (which are already in
the scoped block at `:177-194`), not the timeline *definition*, which nine foreign roots must apply.

**(c) Load-order coupling with nothing holding it** *(mechanism — hypothesis, currently masked)*.
An SFC `<style>` is a side-effecting import: the global rule exists in the document only while
`PaneHeader.vue` is in the loaded chunk. A pane that applies `.pane-scroll-fade` without importing
PaneHeader gets no `scroll-timeline: --pane-scroll`, and every scroll-driven animation in the
`@supports (animation-timeline: scroll())` block (`PaneHeader.vue:177-194` — the veil swell, the
title shrink, the desc fade) silently no-ops with no error, no type failure and no lint. All nine
consumers import PaneHeader today (`grep -rn "PaneHeader" demo/ --include="*.vue" | grep import` →
9 hits, exactly the nine), so it is masked. I could not exhibit it without editing `demo/`, which
this seat may not do — labelled a hypothesis.

**Interlock with pass-1 L-13.** Pass 1's cure for the copy-pasted pane-root string is
`<Card tier="resting" variant="pane">` in glass-ui. That cure **cannot land while N-1 stands**: a
glass-ui `variant="pane"` can carry `overflow`/`min-w`/`h-full`, but it cannot carry
`scroll-timeline: --pane-scroll` without glass-ui owning a timeline name that a *demo* component
(`PaneHeader`) consumes — a producer→consumer inversion across the package boundary. The two
findings must be cured together or the second will re-open the first.

**Cure.** The animation is never deleted (edict 6) — it *moves*. `.pane-scroll-fade` and the
`--pane-scroll` timeline declaration go to `demo/styles/` as a named cross-feature recipe carrying
the DESIGN.md-required residence comment, and `PaneHeader.vue` keeps only the scoped rules for
markup it renders. Then pass-1 L-13's glass-ui `variant="pane"` becomes safe to add, because the
timeline is a demo-level ground the variant merely sits on.

Preferred gestalt (subsumes L-13 + N-1, and adds no new component — edict 3): **transpose
`PaneHeader` into the pane root.** It already owns the timeline, the display-voice title and the
certified caption ink; let it own the surface those live on. It renders the `Card tier="resting"`,
the sticky header and a default slot; `.pane-scroll-fade` stops being a public class anyone can
forget to type; `BrowsePane.vue:2-3` collapses to one element and eight sibling panes lose their
pasted string. One existing component grows one responsibility it already half-had.

---

## N-2 · MAJOR (strengthens pass-1 L-4) — the effective config for this file has no boundary rule at all

Pass 1 proved the G-DEMO globs match nothing by enumerating the missing directories. The stronger
proof is to ask ESLint what it actually resolves for the subject file:

```
$ npx eslint --print-config demo/palettes/BrowsePane.vue      # rules['no-restricted-imports']
no-restricted-imports = undefined
```

Not "a rule with dead patterns" — **no rule**. The palette-browser feature, the exact subject of
G-DEMO-3b's standing declaration, has zero import governance.

And the one glob that *does* match live files resolves to a ban on a specifier that cannot exist:

```
$ npx eslint --print-config demo/color-picker/App.vue         # rules['no-restricted-imports']
[2,{"patterns":[{"group":["@components/custom/palette-browser/**/*.vue"],
   "message":"G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file."}]}]
```

`@components` was killed at W43/RF-15 — `vite.config.ts:68-72` (*"W43 (RF-15) killed the demo `@…`
path aliases"*) and `tsconfig.demo.json:33` both record its removal. So: 6 of 8 `files:` globs match
zero files, and the 2 that match ban an unresolvable specifier. The law is dead in both halves.

Live damage in BrowsePane: it already makes the banned *shape* of reach twice —
`../shared/ui/EmptyState.vue:189` and `../shared/ui/PaneHeader.vue:196`, raw cross-feature `.vue`
imports (31 exist demo-wide). Nothing reaches past the browser seam today
(`grep -rn 'from "[^"]*browser/[^"]*\.vue"' demo/` → empty), so the tree complies **by accident**.

**Cure** (extends pass-1 L-4): re-home the globs onto the live tree and express the ban relatively
(`**/palettes/browser/**/*.vue`), **and** add a config-level assertion that fails when any `files:`
glob matches zero paths. The class of rot here is not "a wrong glob" — it is "a glob that stopped
matching and said nothing." Fix it once and it recurs at the next restructure; fence it and it
cannot.

---

## N-3 · MAJOR (extends pass-1 L-8) — measured: the colour filter silently drops half the live commons, and the model is why

Pass 1 established the structure (two hand-rolled copies, a dead typed seam). The missing piece is
what it does to real data. Against the production commons the demo actually targets
(`demo/platform/transport/client.ts:36-37` — `DEFAULT_REMOTE_API_URL = "https://api.color.babb.dev"`):

```
$ curl -s "https://api.color.babb.dev/palettes?limit=50" | …
rows 10   hasMore false
rows with a non-empty oklabColors array: 5
```

`BrowsePane.vue:346` — `if (!oklabColors || oklabColors.length === 0) return false;` — therefore
**excludes 5 of the 10 published palettes from every colour search**, with no UI signal. The server
matcher drops them identically (`crud-list.ts:172-173`), so this is not a client/server divergence:
it is a **model** defect. `Palette.oklabColors` is optional (`demo/palettes/types.ts:32`) on a
projection where the search feature requires it, and both implementations independently chose
silent exclusion as the fallback for a field the type says may be absent. That is edict-2's
"masking fallback" appearing twice because the type invited it.

Second, an environment fact this seat is obliged to record, because it bounds every other seat's
evidence: **the browse wall's populated state is not observable on the live dev server.**

```
$ curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/            → 200
$ curl -s http://localhost:9000/colors/api/palettes                        → the SPA index.html
$ grep -n "proxy" vite.config.ts                                           → (no matches)
```

There is no API proxy; a loopback page with no `VITE_API_URL` targets the remote origin
(`client.ts:37`, and `demo/platform/transport/availability.ts:23-33` documents this precise
footgun). The visual-audit matrix captured the consequence — all four matrices show
`/#/browse` at text 280/124 with **overflowX 0, pageErr 0, consoleErr 0**
(`audit/visual/REPORT.md:121,136,151,166`), and the screenshot
`audit/visual/shots/safari-desktop-light/browse.png` shows the pane in its **error** branch
("The commons is unreachable." / "Failed to load palettes" / Retry). So the wall, the card grid, the
skeleton→content `vj-morph` transition and the load-more affordance are **unproven by that matrix**;
what it certifies is `EmptyState variant="error"` (`BrowsePane.vue:62-78`), which renders correctly
and without overflow in all four matrices. Any downstream seat citing the visual matrix as coverage
of the browse *wall* is citing coverage of the browse *error state*.

**Cure**: pass-1 L-8's (publish the metric, use the existing seam) — plus make `oklabColors`
non-optional on the searchable projection so neither implementation can choose silence, and add a
dev proxy or a documented `VITE_API_URL` so the wall's populated state is capturable at all.

---

## N-4 · MINOR — one concept, two owners across the prop boundary, and a double-fired clear

**Not in pass 1** (`grep -ci "onClearAll\|clearColorSearch\|colorSearchActive"` → 0, 0, 0).

The colour-search feature is split down the middle of the pane/child boundary:

- **params** live in the pane — `BrowsePane.vue:336` `const colorSearchParams = ref<{L,a,b}|null>(null)`
- **the active flag** lives in the child — `SearchFilterBar.vue:171` `const colorSearchActive = ref(false)`,
  read only by `activeFilterCount` (`:189-195`)

Neither component can answer "is a colour search on?" without the other, and the flag is set in two
places in the child (`:185`, `:220`) while the params are set in one place in the parent (`:352`).

The seam is also double-wired. `SearchFilterBar.onClearAll` (`:227-231`) emits **both** events for
one click:

```ts
function onClearAll() {
    colorSearchActive.value = false;
    colorText.value = "";
    emit("clearColorSearch");
    emit("clearFilters");
}
```

BrowsePane binds both (`:23-25`) to handlers that each null the same ref — `onClearColorSearch`
(`:357-359`) and `onClearFilters` (`:329-332`, which calls `clearBrowseFilters()` *and*
`colorSearchParams.value = null`). One intent, two events, three handlers, and
`colorSearchParams.value = null` executes twice. Harmless today; it is the shape that produces a
desync the moment either side grows a side effect.

**Cure**: one owner. When the colour target becomes browse-query state (pass-1 L-8 / N-3),
`SearchFilterBar` reads it as a prop, `activeFilterCount` derives from the same source as the query,
and the `clearColorSearch` event disappears into `clearFilters`.

---

## N-5 · INFO — two published subpaths have no dogfood

Adds to pass-1 L-5 (which covers the *missing root*, not the *unused subpaths*):

```
$ grep -rho 'from "@mkbabb/value.js/[a-z]*"' demo/ | sort | uniq -c | sort -rn
  24 from "@mkbabb/value.js/color"
  10 from "@mkbabb/value.js/css"
   6 from "@mkbabb/value.js/math"
   5 from "@mkbabb/value.js/easing"
   4 from "@mkbabb/value.js/quantize"
```

`./value` and `./transform` are published and have **zero** demo consumers — two-sevenths of the
public surface is proved by its own unit tests and nothing else. Not BrowsePane's fault; recorded
because this seat owns the public-surface question and the demo is the repo's only integration
proof of the export map.

---

# §C — Joint verdict

**DEFECTIVE.** 21 findings across two independent passes, 12 MAJOR-or-worse, converging on the same
mechanism from different directions: *one concept, two or three homes, and the shipping home is the
wrong one* — exports (L-1), slugs (L-2), the design system (L-3), colour distance (L-8/N-3), the
remote row list (L-10), the feedback rail (L-12), the pane surface (L-13/N-1), the colour-search
state (N-4).

**Strongest defect (pass 2's own):** N-1 — a nine-consumer, four-feature global CSS recipe smuggled
out of one component's unscoped `<style>`, inverting the project's own written residence rule
(`DESIGN.md:388`) and silently blocking pass-1 L-13's cure. It is the finding that changes what the
mega-tranche must *do*, not merely what it must delete.

**Strongest defect overall:** pass-1 L-1 — the byte-exact export contract ships to nobody while its
test stays green, which is the highest-value single deletion in this blast radius. Closely followed
by L-4/N-2, because that is the guard whose death let every other finding accumulate:
`npx eslint --print-config demo/palettes/BrowsePane.vue` → `no-restricted-imports = undefined`.

**The negative, proved.** The brief's headline charge — a demo import a real consumer could not
write — does **not** hold, and both passes prove it independently. Zero bare-root imports
(`grep -rn 'from "@mkbabb/value.js"' demo/` → 0), zero `@src/` or `../../src/` reaches from `demo/`
(→ 0), and all 49 value.js specifiers are keys that exist in `package.json#exports`. The mechanism
is structural, not disciplinary: `vite.config.ts:38-49` *generates* the self-alias set from
`package.json#exports` by anchored regex, so an alias cannot drift from the export map nor
prefix-match into a subpath, and `tsconfig.demo.json` carries no `@src/*` path. A non-published
specifier is not merely absent here — it is unauthorable. That mechanism is the single best-engineered
thing in this component's library posture and must survive any restructure verbatim.

---

## The lattice, greenfield (pass 2's amendment)

Pass 1's lattice stands; N-1 amends its surface layer:

```
demo/palettes/browse/
  BrowsePane.vue        template + wiring only; ROOT is <PaneHeader> (N-1, L-13)
  useBrowseQuery.ts     THE query owner: search · sort · tier · tags · colour(L,a,b,radius)
                        → api/palettes.ts params. No client-side re-filter. (L-8, N-3)
  useBrowseActions.ts   fork · vote · rename · visibility · delete; ONE replaceRemote(slug, next) (L-9, L-10)
  useModalTarget.ts     open/target/show/hide × 3 instances (the 3 hand-rolled ref pairs, :269-320)
demo/palettes/export/index.ts   ← promoted from serializers.ts; the byte-exact set IS the export (L-1)
demo/shared/ui/PaneHeader.vue   renders the Card root + sticky header + slot (N-1)
demo/styles/                    owns .pane-scroll-fade + --pane-scroll, with the DESIGN.md:388 comment (N-1)

DELETED: demo/ui/** (19 barrels, L-3) · demo/palettes/export.ts + its slugifier (L-1, L-2) ·
         BrowsePane's displayedBrowse + colorSearchParams (L-8, N-3, N-4) ·
         useDialogBrowseActions.onRevert + modalStack (L-9)
FIXED:   eslint.config.js globs → live tree + a zero-match-glob assertion (L-4, N-2)
         Palette.oklabColors non-optional on the searchable projection (N-3)
```

Direction of dependency after the transposition: `pane → feature composables → api client → wire`,
with `shared/ui` and glass-ui the only upward reaches and `@mkbabb/value.js/*` the only downward
one. No component owns arithmetic; no CSS class is owned by a component that does not render it;
one home per concept.

---

## Evidence index (pass 2)

| claim | command / artifact |
|---|---|
| N-2 no rule for the subject file | `npx eslint --print-config demo/palettes/BrowsePane.vue` → `no-restricted-imports = undefined` |
| N-2 live glob bans a dead alias | `npx eslint --print-config demo/color-picker/App.vue` → ban on `@components/custom/palette-browser/**/*.vue` |
| N-2 `demo/@` gone | `find demo -path 'demo/@*' \| wc -l` → `0` |
| N-1 nine consumers | `grep -rn "pane-scroll-fade" demo/` → 9 pane roots + PaneHeader + DESIGN.md |
| N-1 the inverted rule | `demo/DESIGN.md:388`; `demo/styles/foundation.css:578`; `PaneHeader.vue:40-58` |
| N-3 live commons shape | `curl -s "https://api.color.babb.dev/palettes?limit=50"` → rows 10, hasMore false, 5 with `oklabColors` |
| N-3 no local API | `curl http://localhost:9000/colors/api/palettes` → SPA HTML; `grep -n proxy vite.config.ts` → none |
| N-3 browse captured in its error branch | `audit/visual/REPORT.md:121,136,151,166`; `audit/visual/shots/safari-desktop-light/browse.png` (read) |
| N-4 double-fired clear | `SearchFilterBar.vue:227-231` + `BrowsePane.vue:23-25,329-332,357-359` |
| N-5 subpath dogfood census | `grep -rho 'from "@mkbabb/value.js/[a-z]*"' demo/ \| sort \| uniq -c` |
| L-3 ✔ 19 pure barrels | loop over `demo/ui/*/index.ts` counting non-re-export lines → 0 for all 19 |
| L-9 ✔ dead host | `find demo -name "PaletteDialog*"` → empty; `grep -rn modalStack demo/` → 5, all internal |
| negative proof | `grep -rn 'from "@mkbabb/value.js"' demo/` → 0; `grep -rn '@src/\|\.\./\.\./src/' demo/` (non-`.md`) → 0 |
| pass 1, preserved | `challenge-L-library-pass1.md` (byte-identical copy of the 13:47 artifact) |
