# CHALLENGE-L — library structure under `demo/palettes/BrowsePane.vue` · PASS 5

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. Declared seat, not
inherited. No DEFECT.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. The brief named HEAD `c654824e`; at
read time HEAD is `f36f780c` (docs-only commits since — `docs(V·mega): STATE — three OM censuses`).
No source difference on this axis.
Subject: `demo/palettes/BrowsePane.vue` (360 lines), area `demo/palettes`, route `#/browse`.

**Scope discipline.** This seat wrote only under
`docs/tranches/V/megatranche/audit/components/BrowsePane/`. No source edits. Three probes and their
outputs are preserved in `./probe-L5/`.

**Verdict: DEFECTIVE.** One new BLOCKER, live-reproduced by two independent methods.

---

## Provenance — this is the fifth seat on this axis

On arrival this path held four reports. **All four are preserved byte-identically.** Pass 4 was
canonical at `challenge-L-library.md`; it is now archived at `challenge-L-library-pass4.md`, md5
verified against the file it was copied from:

```
$ cp challenge-L-library.md challenge-L-library-pass4.md && md5 -q challenge-L-library.md challenge-L-library-pass4.md
9439e085608d6685ccb6e73b8e5f4d6f
9439e085608d6685ccb6e73b8e5f4d6f
```

| file | findings | seat |
|---|---|---|
| `challenge-L-library-pass1.md` | L-1 … L-17 (17) | pass 1 — the structural census |
| `challenge-L-library-pass2.md` | + 4 (21) | pass 2 — the build/config layer |
| `challenge-L-library-pass3.md` | + N-6 … N-9 (25) | pass 3 — the ship path |
| `challenge-L-library-pass4.md` | + N-10 … N-17 (33) | pass 4 — the two boundaries either side of the demo tree |

I re-derived the axis independently before reading any of them. **Where a prior pass proved
something better than I did, I defer and say so; I do not re-litigate.** My independent derivation
reproduced pass 1's L-8 (colour search), L-10 (`remotePalettes` has no owner), L-12 (`cardRefs`),
L-16 (`availableTags` shim), L-3 (`demo/ui` shims), L-4 (dead eslint globs) and L-1 (export dual
path) — every one of those is already recorded, several with sharper measurements than mine
(pass 1's slugifier divergence table; pass 4's `vite resolveId` proof and its 5-of-10 live-commons
`oklabColors` census). Those sections below are deferrals, not findings.

### Measured novelty

Four passes audited the demo tree, the build, the ship path, and the API/type-map boundaries. None
audited **what the five injected ports actually hand out at runtime.** Every term below returns
zero across all four prior reports:

```
$ for t in searchQuery "shared ref" expandedId keyspace setRef isUnmount \
           runtime-core "request<T>" res.json decoder; do … done

term                pass1  pass2  pass3  pass4
searchQuery           0      0      0      0
shared ref            0      0      0      0
expandedId            0      0      0      0
keyspace              0      0      0      0
setRef                0      0      0      0
isUnmount             0      0      0      0
runtime-core          0      0      0      0
request<T>            0      0      0      0
res.json              0      0      0      0
decoder               0      0      0      0
```

Pass 4 called `usePalettePorts` "the god facade renamed, not dissolved" (L-7) on the evidence that
it *smuggles whole sub-composables* — `versions`, `tagEdit`, `flagged` passed across intact. That
is correct and it is the right diagnosis. But it understates the disease by one order. The ports do
not merely share sub-composables; **they share primitive mutable cells**, and two of them are
load-bearing UI state rendered simultaneously on this route. That is L5-1 and L5-2, and L5-1 is a
BLOCKER a user hits on first keystroke.

---

## L5-1 · BLOCKER — the five "narrow ports" hand out ONE `searchQuery` ref; two panes on this route share one text box

**Confirmed twice, live, by independent methods.**

`usePalettePorts.ts` opens with a ten-line banner stating the invariant it believes it holds:

> `usePalettePorts` — the RF-15 §b 6 dissolution of the old `usePaletteManager` god facade
> (153 L, ONE cross-everything injected blob) into FIVE narrow, feature-owned ports. Each port is a
> cohesive palette sub-domain surface […] **no consumer injects a member outside the port it
> named.** — `demo/palettes/usePalettePorts.ts:22-31`

One `ref` is created and aliased into three ports and three sub-composables:

```
usePalettePorts.ts:54    const searchQuery = ref("");
usePalettePorts.ts:65    const browse     = useBrowsePalettes({ searchQuery });
usePalettePorts.ts:68    const admin      = useAdminUsers({ searchQuery, … });
usePalettePorts.ts:69    const colorQueue = useColorNameQueue({ searchQuery });
usePalettePorts.ts:112   const filteredSaved = useFilteredList(savedPalettes, searchQuery, …);
usePalettePorts.ts:141       searchQuery,   // → libraryPort
usePalettePorts.ts:183       searchQuery,   // → browsePort
usePalettePorts.ts:224       searchQuery,   // → adminPort
```

`BrowsePane.vue:11` binds `v-model="pm.searchQuery.value"` with `pm = inject(BROWSE_PORT_KEY)`.
`PalettesPane.vue:35` binds the byte-identical expression with `pm = inject(LIBRARY_PORT_KEY)`.
And `/#/browse` renders **both panes side by side** (`usePaneRouter.ts:70-71,84,90`).

### Proof 1 — runtime reference identity across the provide chain

`probe-L5/probe-port-identity.mjs` walks the live component tree's `provides` prototype chain,
collects every symbol-keyed provide, and tests `===` between members of different ports. Output
preserved at `probe-L5/port-identity-output.json`:

```json
{
  "portsFound": ["Symbol(palette.session)","Symbol(palette.library)","Symbol(palette.browse)",
                 "Symbol(palette.admin)","Symbol(palette.colorTarget)"],
  "searchQuery_browse_is_library": true,
  "searchQuery_browse_is_admin":   true,
  "expandedId_browse_is_library":  true,
  "expandedId_browse_is_admin":    true,
  "toggleExpand_browse_is_library": true,
  "control_remotePalettes_vs_savedPalettes": false
}
```

The last line is the **negative control**: `browse.remotePalettes !== library.savedPalettes`, so the
probe discriminates — it is not reporting trivial equality. All five ports resolve; three of them
share the same `searchQuery` object and the same `expandedId` object.

### Proof 2 — the user-visible consequence

`probe-L5/probe-shared-search.mjs`, one page load, typing into the commons field only:

```
INPUT PLACEHOLDERS: ["enter slug or token...","Search the commons...","Search your palettes..."]
commons count: 1 mine count: 1
BEFORE  commons.value= ""  mine.value= ""
AFTER typing 'zzq-probe' into COMMONS field:
  commons.value= "zzq-probe"
  mine.value   = "zzq-probe"
  SHARED-REF DEFECT: true
```

Frame: `probe-L5/L5-shared-searchquery.png` — "zzq-probe" legible in **both** fields, one of which
was never touched. The reverse direction is confirmed too: `probe-L5/probe-local-search-network.mjs`
types only into "Search your palettes…" and reports `commons field now reads: "sunset"`.

### Blast radius

One keystroke in either field simultaneously drives five consumers of five different corpora:

| consumer | site | corpus |
|---|---|---|
| commons wall, client filter | `useBrowsePalettes.ts:43-46` | remote |
| commons wall, **server query** | `useBrowsePalettes.ts:52-60` (`q.length >= 2`) | remote |
| the user's saved palettes | `usePalettePorts.ts:112` | localStorage |
| admin user table | `useAdminUsers({ searchQuery })` | admin |
| colour-name moderation queue | `useColorNameQueue({ searchQuery })` | admin |

`searchPlaceholder` (`usePalettePorts.ts:104-110`) switches the *label* on the one ref by
`currentView` — the module knows the cell is overloaded and paints over it rather than splitting it.

**Negative result, recorded honestly.** I could not observe the local field issuing a network call
on this host: `probe-local-search-network.mjs` reports `palette/commons calls: 0`. That is *not*
evidence against the claim — the dev page is in the designed `misconfigured` latch (the
`DEV MISCONFIGURED — RUN 'npm run dev'` chip is visible in both frames), and
`availability.ts:49-50` documents that the latch throws `ApiUnavailableError` **"when the latch
short-circuits a call (no request was issued)"**. So the network half of the blast radius is a
**hypothesis on this host**, sound by code trace (`useBrowsePalettes.ts:52-60`), unobservable
without `VITE_API_URL`. The two mirroring proofs above are unaffected and are CONFIRMED.

### Mechanism

Wrong ownership at the smallest possible granularity. "Search" is not one concept; it is five
queries against five corpora. A port that hands out a **shared mutable primitive** is not a port —
it is the god blob with five names. The stated invariant ("no consumer injects a member outside the
port it named") is satisfied *textually* and violated *referentially*, which is exactly how a
renamed god module passes its own review.

### Cure

Delete `searchQuery` from `providePalettePorts` entirely. Each corpus mints and owns its query:
`useBrowsePalettes` owns `query`; `useFilteredList(savedPalettes, query, …)` takes a library-owned
one; `useAdminUsers` and `useColorNameQueue` likewise. Each port exposes its own
`query: Ref<string>`. `searchPlaceholder` and its `switch` die with it — the placeholder is already
a prop each pane passes (`BrowsePane.vue:13`, `PalettesPane.vue:37`). Net: −1 shared cell,
−1 computed, −1 `switch`, −5 aliases; five independent queries; the banner's invariant becomes true.

---

## L5-2 · MAJOR — `expandedId` is one ref over two disjoint keyspaces, and both walls render at once

**Confirmed at runtime** (`expandedId_browse_is_library: true`, `toggleExpand_browse_is_library:
true`, same probe as above).

```
usePalettePorts.ts:144-145   expandedId / toggleExpand  → libraryPort   ┐
usePalettePorts.ts:177-178   expandedId / toggleExpand  → browsePort    ├ all three are actions.*
usePalettePorts.ts:226-227   expandedId / toggleExpand  → adminPort     ┘
```

BrowsePane keys it by **slug**; PalettesPane keys the same object by the **local UUID**:

```
BrowsePane.vue:97     :expanded="pm.expandedId.value === palette.slug"
BrowsePane.vue:102    @click="pm.toggleExpand(palette.slug)"
PalettesPane.vue:88   :expanded="pm.expandedId.value === palette.id"
PalettesPane.vue:90   @click="pm.toggleExpand(palette.id)"
```

`types.ts:14-27` establishes that these are deliberately non-overlapping identity domains — the
K-PALID id-honesty note: a remote palette has **no** `id` and is slug-identified; `id` is a
client-minted `crypto.randomUUID()` present iff `isLocal`. The domains cannot intersect, which is
precisely the defect: a *single-valued* "which card is open" register is shared by two walls that
are on screen together (`probe-L5/L5-shared-searchquery.png` shows both). Expanding a commons card
collapses whatever the user had open in My Palettes, and vice versa.

**Reproduction status.** Reference identity: CONFIRMED (probe above). The *user-visible* collapse
requires both walls populated; the commons wall cannot populate on a loopback host under the
`misconfigured` latch, so the collapse itself is a **hypothesis** — sound by construction (one
`ref<string|null>`, two exclusive readers), not yet observed. Observing it needs `VITE_API_URL`
pointed at a reachable commons plus ≥1 saved local palette.

**Mechanism.** A per-wall UI register hoisted into shared state because it sat next to the other
palette actions in `usePaletteActions`, not because the concept is shared.

**Cure.** `expandedId` belongs to `PaletteCardGrid` — the component that *is* a wall. Give the grid
a `shallowRef<string|null>` exposed as `v-model:expanded` (or slot props). Delete it from
`usePaletteActions` and from all three ports. Two walls, two registers, zero coordination, and the
slug-vs-id question stops being a global concern.

---

## L5-3 · MAJOR (extends pass-1 L-12) — the `cardRefs` leak, mechanism proved from Vue's source

Pass 1 recorded that the card-feedback rail "is implemented twice and leaks in both"
(`BrowsePane.vue:94,209` ≡ `PalettesPane.vue:84,177`). The finding stands; **the mechanism was
asserted, not proved.** Proving it matters because the obvious reading — "Vue nulls the ref on
unmount, so the entry clears" — is wrong in a way that is easy to miss on review.

```
BrowsePane.vue:209  const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
BrowsePane.vue:94   :ref="(el: any) => el && (cardRefs[palette.slug] = el)"
```

Vue *does* invoke function refs with `null` on unmount — `setRef` in
`node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:1763`:

```js
const value = isUnmount ? null : refValue;
```

…and the `el &&` guard short-circuits on exactly that call. So the unmount notification is received
and **discarded**: the entry is never deleted. `cardRefs` grows monotonically over the union of
every slug ever rendered, each entry retaining a live `ComponentPublicInstance`.

That matters here specifically because this pane replaces its row set wholesale on every sort,
tier or tag change (`useBrowsePalettes.ts:63+`) and appends 50 at a time on paging
(`BROWSE_PAGE_SIZE = 50`, `:18`) — so ordinary browsing accumulates detached instances for the
life of the route. The `reactive()` wrapper additionally makes each retained instance a reactivity
target.

**Cure** (as pass 1, restated with the mechanism in hand). Delete `cardRefs`, `defineExpose`
(`PaletteCard.vue:244`) and both panes' registries. Verdict state is data that flows *down*: one
`feedback?: { message: string; variant: "success" | "error" } | null` prop on `PaletteCard`, driven
by a single `shallowRef<{slug,message,variant}|null>` on the wall — `shallowRef` being the correct
primitive per edict 7. Self-pruning, declarative, and the "feedback" concept lands inside
`PaletteCard`'s own contract instead of in two panes' bookkeeping.

---

## L5-4 · MAJOR (extends pass-1 L-16, and amends pass-4 N-10's cure) — the transport layer asserts types it never validates, so no type-only contract can close this boundary

Pass 1 filed the `availableTags` shim (`BrowsePane.vue:215-220`) as INFO: "masking fallback at the
leaf for an untyped wire payload." Pass 4's N-10 found the deeper defect — 20 of 22 fields diverge
between the server's response type and the client's `Palette` — and prescribed the cure:

> `api/` emits a `contract.d.ts` (or the repo hoists a tiny `contracts/palette.ts` both trees
> import — **it is types only, so it costs nothing at runtime** …)
> — `challenge-L-library-pass4.md`, N-10 § Cure

That cure is right about ownership and **insufficient at runtime**, and the shim BrowsePane carries
is the proof. Trace the lie to its home:

```
BrowsePane.vue:215-220        Array.isArray(tags) ? tags : Object.values(tags)      ← the shim
demo/palettes/useTagEdit.ts:31    const allTags = ref<Tag[]>([]);
demo/palettes/useTagEdit.ts:42    allTags.value = await getTags();
demo/palettes/api/colors.ts:14    export function getTags(): Promise<Tag[]> { return request("/colors/tags"); }
demo/platform/transport/client.ts:101,130
    export async function request<T>(path, init?): Promise<T> { … return res.json(); }
```

`request<T>` is a **generic type assertion, not a decoder** — `res.json()` is `Promise<any>` widened
to `Promise<T>` with zero runtime checking. Every function in `demo/palettes/api/` (8 modules)
inherits it. A shared `contract.d.ts` would make both sides *name* the same shape; it cannot make
the wire *carry* it, because a `.d.ts` erases. The shim would still be necessary, just further from
its cause — which is why BrowsePane's comment (`:210-214`) describes a *runtime* payload
("the `/colors/tags` read can resolve an object-shaped payload") that no type can forbid.

This is also the reason pass 1 could only rank it INFO: at the leaf it looks like defensive noise.
At the seam it is a structural hole with 40-odd call sites.

**Amended cure.** Ownership from N-10 **plus** validation at the boundary. `request<T>(path,
decode: (u: unknown) => T, init?)`. `getTags` becomes `request("/colors/tags", decodeTags)`. The
`api/` tree already ships the authority — zod schemas at `api/src/modules/palette/schema.ts:89-91`
and siblings — so the decoders are derivable from the same source that validates inbound requests,
which makes the contract single-homed in the strong sense N-10 wants (one definition, two
directions) rather than the weak one (one type, asserted twice). `availableTags` collapses to
`pm.tagEdit.allTags`; the shim and its 8-line apology both die; and a wire-shape change becomes a
loud typed error at the seam instead of a Vue prop warning at a leaf.

---

## Synthesis — one mechanism under L5-1, L5-2, and pass-1 L-10

Three findings across two seats are the same structural fault:

| finding | what the port publishes | who writes it |
|---|---|---|
| L5-1 (this pass) | `searchQuery` — a raw `Ref<string>` | 3 panes, 3 composables |
| L5-2 (this pass) | `expandedId` — a raw `Ref<string\|null>` | 2 panes, 2 keyspaces |
| L-10 (pass 1) | `remotePalettes` — a raw `Ref<Palette[]>` | 9 hand-rolled index mutations across 6 modules |

**A port that publishes writable state has no invariants.** In all three cases the "port" is a
property bag over cells that anyone can assign, so no owner can hold anything true: not "the query
belongs to this corpus", not "one card is open per wall", not "the row set is consistent with the
cursor". Pass 4 diagnosed the *coarse* version (whole sub-composables smuggled across); this is the
fine version, and it is what makes the coarse one harmless-looking — you cannot see a shared `ref`
in an import graph, only in the object identity at runtime, which is why four seats missed it and
why `probe-port-identity.mjs` is the tool that found it.

The single structural rule that dissolves all three: **ports expose `Readonly<Ref<T>>` plus named
commands, never a writable cell.** `browsePort` becomes `{ rows: Readonly<Ref<Palette[]>>, query:
Ref<string> /* its own */, setColorTarget(), upsertBySlug(), patchBySlug(), loadMore() }`. Every one
of pass 1's nine index-splices and both of BrowsePane's (`:281-283`, `:314-318`) collapse into
`upsertBySlug`, and the compiler enforces it rather than a comment.

---

## Deferrals — prior passes are stronger; do not re-open on my account

| finding | owner | note |
|---|---|---|
| Export dual path (`export.ts` vs `export/`, 914 L dark) | **pass 1 L-1 / pass 4** | independently re-derived; pass 4's measurement and the `export/types.ts` self-naming quote are better than mine |
| Three slugifiers, 6-of-6 non-ASCII divergence | **pass 1 L-2** | not re-derived |
| `demo/ui/**` = 19 shim barrels; both conventions in one import block | **pass 1 L-3 / pass 3 N-9** | re-derived identically (19/19 pure re-export); pass 4's "18 of 19 are one line" + "glass-ui publishes 74 export keys" is finer |
| G-DEMO-1/3a/3b eslint globs inert (`demo/@` absent) | **pass 1 L-4 / pass 3 N-2** | re-derived (`ls -d demo/@` → no such directory; `@components` has 2 hits, both prose) |
| No `"."` in `package.json#exports` | **pass 1 L-5** | pass 4's `vite resolveId` proof is decisive |
| OKLab search: no home, `0.15` twice, page-scoped filter, `hasMore`/empty-copy contradiction, gratuitous `any` | **pass 1 L-8 / pass 4 N-13** | fully covered incl. the `(p: any)` at `:344` and the `as` at `:345`; my only addition is INFO-grade (below) |
| `remotePalettes` unowned, 9 mutation sites | **pass 1 L-10** | subsumed into the synthesis above |
| `useDialogBrowseActions` is the duplicate it was written to kill | **pass 1 L-9** | re-derived; its docblock at `:37` states the dual path as policy |
| Wire contract has no home; 20 of 22 fields diverge | **pass 4 N-10** | cure amended in L5-4, ownership finding untouched |
| `is-owned` `null === null` for anonymous visitors | **pass 4 N-11** | not re-derived; needs live commons |
| `.search-seated .input-bar-field` styles a glass-ui internal | **pass 1 L-15** | re-derived (`utils.css:152`); BrowsePane's own comment books it as interim (`:8-9`) |

### Sound, and worth keeping sound

The demo→library public-surface discipline is **clean**, and the proof is positive. No demo file
reaches `src/` (`grep -rn 'from "\.\./\.\./src/…' demo/` → empty), and every value.js specifier
written in `demo/` is a proper subset of the exports map:

```
$ grep -rho '@mkbabb/value\.js/[a-z]*' demo/ | sort -u
color  css  easing  math  quantize          (5 of the 7 published subpaths; none unpublished)
```

The one bare `@mkbabb/value.js` occurrence is prose in a comment (`demo/shared/utils.ts:12`) — which
is consistent with pass 1's L-5 (a root import would be unresolvable) and confirms nobody has
written one. `vite.config.ts:37-50` derives the self-alias set *from the exports map by generation*
with anchored `^…$` regexes, so a specifier the demo can write is one a real npm consumer can write.
**BrowsePane's proof of the public API is honest.** With `demo/ui/**` (L-3) and the type map
(N-12) both broken, this is the boundary that still works; the cures for those two must not disturb
the generated alias set.

Likewise the barrel seam is respected in fact (`grep` for raw `.vue` reaches into `browser/` from
outside → empty; `npx eslint demo/palettes/BrowsePane.vue` → clean), even though the guard meant to
enforce it is inert (L-4) and the top-level seam has zero importers (pass 4 N-15).

---

## New INFO

**L5-5 · `Math.hypot` (client) vs `Math.sqrt(Σd²)` (server) — measured, not load-bearing.** The two
homes in pass-1 L-8 use different functions. Over 3×10⁶ random OKLab deltas in [−0.2, 0.2]³:

```
hypot !== sqrt: 1122317 of 3000000 (37.4%);  max |Δ| = 1.11e-16
radius-0.15 predicate DISAGREEMENTS: 0
```

Not a behavioural defect today. Recorded because it is the fingerprint of the two-home problem, and
because the server exposes a tunable `colorRadius` (`crud-list.ts:167`) that the client hard-codes
(`BrowsePane.vue:343`) — the day one is tuned, they diverge for real.

**L5-6 · the visual matrix never captured this component's success state.** All four Safari
matrices captured `/#/browse` in the error state
(`audit/visual/shots/*/browse.png` — "The commons is unreachable."). The per-capture rows are clean
(`text=280 desktop / 124 mobile, overflowX=0, pageErr=0, consoleErr=0, smallTapTargets=4` —
`REPORT.md:121,136,151,166`) but they describe an *error card*, not the wall. The cause is
environmental and by design (`availability.ts:29-36`: loopback origin + unset `VITE_API_URL` →
the loud `misconfigured` state; the chip is visible in `probe-L5/L5-shared-searchquery.png`), not a
component defect. Consequence for the record: the skeleton→content `vj-morph`, the load-more
affordance, the L-8 filter contradiction and the L5-2 collapse are **all uncaptured**; no conclusion
about the wall may be drawn from `browse.png`. A matrix re-run with `VITE_API_URL` set is the
cheapest way to close four open reproductions at once.

Per the seat brief (MT-F022) the Chromium keyboard 7/12 gap is roving tabindex and is **not**
born-RED; no keyboard finding is filed.

---

## Revised greenfield lattice — the port layer only

Prior passes specified the export, `demo/ui`, eslint and contract layers; I do not restate them.
The layer they left unspecified is the one this pass indicts:

```
L2  palettes/store/
      useBrowseWall()        OWNS  rows · cursor · query · colorTarget · sort · tier · tags
                             EXPOSES  rows: Readonly<Ref<Palette[]>>
                                      query: Ref<string>            ← its own          (L5-1)
                                      setColorTarget(L,a,b) · setSort · setTier · setTags
                                      loadMore() · upsertBySlug(p) · patchBySlug(slug, patch)
      usePaletteLibrary()    OWNS  saved rows + its OWN query                          (L5-1)
      useAdminConsole()      OWNS  its OWN query                                       (L5-1)

L3  palettes/browser/
      PaletteCardGrid        OWNS  expanded (v-model:expanded, per wall)               (L5-2)
      PaletteCard            feedback is a PROP; no defineExpose                       (L5-3)

L4  palettes/BrowsePane.vue  composition only
```

Invariant, stated once: **a port exposes readonly state plus named commands.** No writable `Ref`
crosses an inject boundary. That single rule makes L5-1, L5-2 and pass-1 L-10 unrepresentable, and
it is mechanically checkable — the probe in `./probe-L5/` is the check, and should be lifted into
the suite as a standing test (assert that no two port objects share a `ref` identity).

BrowsePane after this and the prior passes' cures is roughly **90 lines**: a `<Pane>` root, a
`<SearchBar>` on `browse.query`, a `<SearchFilterBar>` whose colour emit calls
`browse.setColorTarget`, one `<Transition>` over three states, a `<PaletteCardGrid v-model:expanded>`
over `browse.rows`, and three portal components. No `cardRefs`, no `colorSearchParams`, no
`displayedBrowse`, no `availableTags` shim, no local `onRevert`/`onTagsUpdated`, no index splicing,
no `any`.

---

## Ledger — pass 5

| ID | Severity | Defect | Reproduction |
|---|---|---|---|
| **L5-1** | **BLOCKER** | Three ports share one `searchQuery` ref; two panes on `#/browse` share one text box; 5 corpora driven by 1 cell | **CONFIRMED** ×2 — runtime `===` identity (with negative control) + live typing, both directions; network half a labelled hypothesis (latch) |
| **L5-2** | MAJOR | Three ports share one `expandedId` ref, read against two disjoint keyspaces (slug vs UUID), both walls rendered together | ref identity **CONFIRMED**; the collapse itself a labelled hypothesis (needs reachable commons) |
| **L5-3** | MAJOR | `cardRefs` never prunes — extends pass-1 L-12 with the mechanism | **CONFIRMED** from `runtime-core.cjs.js:1763` (`isUnmount ? null` vs the `el &&` guard) |
| **L5-4** | MAJOR | `request<T>` asserts, never decodes — the root of pass-1 L-16; amends pass-4 N-10's types-only cure | **CONFIRMED** by trace, `client.ts:101,130` → `colors.ts:14` → `useTagEdit.ts:42` → `BrowsePane.vue:215` |
| L5-5 | INFO | hypot vs sqrt: 37.4 % numeric divergence, 0 predicate disagreements in 3M | measured |
| L5-6 | INFO | Visual matrix captured only the designed `misconfigured` error state; the wall is uncaptured in all 4 matrices | REPORT rows + `availability.ts:29-36` + the chip in the frame |

Running total across five passes: **39 findings**, of which this pass contributes 4 new + 2 INFO and
defers 11 to prior seats.

---

## Evidence index (pass 5)

| claim | artifact |
|---|---|
| pass 4 preserved byte-identically | `md5 -q` both files → `9439e085608d6685ccb6e73b8e5f4d6f` |
| L5-1/L5-2 runtime ref identity + negative control | `probe-L5/probe-port-identity.mjs`, output `probe-L5/port-identity-output.json` |
| L5-1 user-visible mirroring (commons → mine) | `probe-L5/probe-shared-search.mjs`; frame `probe-L5/L5-shared-searchquery.png` |
| L5-1 reverse mirroring (mine → commons) + network negative result | `probe-L5/probe-local-search-network.mjs` |
| L5-1 aliasing sites | `usePalettePorts.ts:54,65,68,69,112,141,183,224` |
| L5-2 keyspace split | `BrowsePane.vue:97,102` vs `PalettesPane.vue:88,90`; `types.ts:14-27` |
| L5-3 Vue unmount semantics | `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:1763` |
| L5-4 assertion chain | `client.ts:101,130` · `colors.ts:14` · `useTagEdit.ts:31,42` · `BrowsePane.vue:215-220` |
| L5-6 latch is by design | `availability.ts:29-36,49-50,151-159`; `client.ts:36-43` |
| public-surface discipline sound | `grep` subpath census vs `package.json#exports`; `vite.config.ts:37-50` |

**No source edits land from this seat.** Files written: this report, `challenge-L-library-pass4.md`
(archival copy), and `probe-L5/` (3 probes + 1 output + 1 frame).
