# CHALLENGE-L — library structure under `demo/palettes/BrowsePane.vue` · PASS 4

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and I confirm the served tier matches it. Declared seat,
not inherited. No DEFECT.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`. The brief named HEAD `c654824e`; at
read time HEAD is `640652df` (docs-only commits since — `docs(V·mega): L-15.8 completeness law`).
No source difference on this axis.
Subject: `demo/palettes/BrowsePane.vue` (360 lines), area `demo/palettes`, route `#/browse`.

**Scope discipline.** This seat wrote only under
`docs/tranches/V/megatranche/audit/components/BrowsePane/`. No source edits, no `dist/` writes, no
`node_modules` writes. Two scratchpad scripts (`typediff.mjs`, `vite-parsing.mjs`) ran from the
session scratchpad; three probes are preserved in `./probe-L4/`.

**Verdict: DEFECTIVE.**

---

## Provenance — this is the fourth seat on this axis

On arrival this path held three reports. **All three are preserved byte-identically:**

| file | findings | seat |
|---|---|---|
| `challenge-L-library-pass1.md` | L-1 … L-17 (17) | pass 1 |
| `challenge-L-library-pass2.md` | + 4 (21 total) | pass 2 |
| `challenge-L-library-pass3.md` | + N-6 … N-9 (25 total) | pass 3 — **`md5 a18e1e87…` verified identical to the file it replaced** |

I re-derived the axis independently before reading any of them. Where a prior pass proved something
better than I did, I defer and say so; I do not re-litigate. Pass 1's slugifier divergence table and
its typed-error finding, pass 2's `--print-config` proof, and pass 3's three build probes are each
stronger than anything I produced on those points.

**Novelty is measured, not asserted.** Every term below returns zero across all three prior reports:

```
$ for t in FormattedPalette "wire contract" isOwned parsing phantom \
           injectGroundTokens ApiOfflineChip "20 of 22"; do grep -ci "$t" \
           challenge-L-library-pass{1,2,3}.md; done

FormattedPalette      p1=0  p2=0  p3=0
wire contract         p1=0  p2=0  p3=0
isOwned               p1=0  p2=0  p3=0
parsing               p1=0  p2=0  p3=0
phantom               p1=0  p2=0  p3=0
injectGroundTokens    p1=0  p2=0  p3=0
ApiOfflineChip        p1=0  p2=0  p3=0
20 of 22              p1=0  p2=0  p3=0
```

Three passes audited **the demo tree** (structure), then **the build** (whether that tree ships).
None audited **the boundary between the demo tree and the two things on either side of it**: the
API that feeds it, and the type map that claims to police what it may import. Both boundaries are
broken, and one of them is producing a wrong screen for every anonymous visitor to `#/browse` right
now.

§A rolls all three passes forward. §B carries what is new. §C is the joint verdict across four
passes. §D amends the lattice.

---

# §A — Passes 1–3, rolled forward

Full text in the preserved files. Spot-checks I re-derived independently are marked ✔.

| # | sev | finding | my check |
|---|---|---|---|
| N-6 | BLOCKER | The composition root is 8 inline lines in `index.html` with no module home; the `gh-pages` build emits 12,472 B and **no** `BrowsePane` chunk (probe A reproduces the committed artifact byte-for-byte; probe C with a file-homed entry emits 1,595,550 B / 45 chunks). | not re-derived; probe evidence is decisive |
| L-1 | BLOCKER | The V.W51 byte-exact export contract (`demo/palettes/export/`, 12 modules, **914 L** measured) ships to nobody. `usePaletteExport.ts:9` resolves `./export` → the 132-line legacy `export.ts`. | ✔ `grep -rln 'export/serializers\|palettes/export/' demo test` → **one** file, `demo/test/export/byte-exact.test.ts`. `export/types.ts:6-9` *names its own dual path in a comment*: "the sibling legacy `../export.ts` … still resolves `./export`" |
| L-2 | MAJOR | Three slugifiers, 6-of-6 divergence on non-ASCII. | not re-derived; pass-1 evidence stronger |
| L-3 / N-9 | MAJOR | `demo/ui/**` is 19 pure re-export barrels of glass-ui; BrowsePane reaches the design system **both ways** in one import block. | ✔ measured: **18 of 19** barrels are exactly **1 line**; `demo/ui/alert/index.ts` is 11 (9 comment). `BrowsePane.vue:180-181` shims vs `:195` `@mkbabb/glass-ui/search` — 15 lines apart. glass-ui publishes **74** export keys incl. `./card` and `./button` |
| L-4 / N-2 | MAJOR | `eslint.config.js:220-303` G-DEMO-1/3a/3b globs are inert (`demo/@` does not exist). | ✔ — and see **N-15**, which shows the seam those globs protect has zero importers |
| L-5 | MAJOR | No `"."` in `package.json#exports`; a root import is unresolvable. | ✔ `vite pluginContainer.resolveId("@mkbabb/value.js")` → `"." is not exported under the conditions ["module","browser","development","import"]` |
| L-6 | MAJOR | `BROWSE_PORT_KEY` lives in the 275-line provider module. | ✔ `BrowsePane.vue:182` |
| L-7 | MAJOR | The port smuggles whole sub-composables; the god facade was renamed, not dissolved. | ✔ `usePalettePorts.ts:186-190` hands `versions`, `tagEdit`, `flagged` across whole. `flagged` is `useAdminFlagged()` — an **admin** composable reached through the **public browse** port so a visitor can file a report (`BrowsePane.vue:298`) |
| L-8 / N-3 | MAJOR | OKLab distance has no home; `BrowsePane.vue:339-349` and `crud-list.ts:159-180` hand-roll it with the same `0.15`; 5 of 10 live palettes silently excluded. | ✔ re-derived on the live commons (5/10 missing `oklabColors`); **extended — N-13** |
| L-9 | MAJOR | `useDialogBrowseActions` is the duplicate it was written to kill; `modalStack` is a shim for a host that no longer exists. | ✔ 3 of its 5 members are browse-filter setters; it lives in `browser/dialog/composables/` while doing no dialog work |
| L-10 | MAJOR | `remotePalettes` has no owner — 9 hand-rolled slug-index mutations across 6 modules. | ✔ `BrowsePane.vue:281-282, 314-318` |
| L-11 | MAJOR | The typed error vocabulary is flattened at the pane boundary, producing the exact mislabel `availability.ts:168` forbids by name. | ✔ **and extended below** — the correct rendering atom already exists |
| L-12 | MAJOR | The card-feedback `cardRefs` rail is implemented twice and leaks in both. | ✔ `BrowsePane.vue:94,209` ≡ `PalettesPane.vue:84,177` |
| L-13 | MINOR | "ONE card species" is a copy-pasted 7-utility string on 8 sites. | ✔ `BrowsePane.vue:2` |
| L-14 | MINOR | `MiniColorPicker.vue` hand-rolls HSV↔RGB↔hex inside a colour library's own demo. | ✔ |
| L-15 | MINOR | `.search-seated .input-bar-field` styles a glass-ui internal class, unlayered to beat the producer recipe. | ✔ `BrowsePane.vue:12` |
| L-16 | INFO | Masking fallback at the leaf for an untyped wire payload (`availableTags`, `:215-220`). | ✔ — **N-10 explains why it had to exist** |
| L-17 | MINOR | The pane owns half its data lifecycle, app-boot the other half. | ✔ `:222-224` |
| N-1 | MAJOR | `.pane-scroll-fade`, a nine-consumer global recipe, lives in `PaneHeader.vue`'s unscoped `<style>`. | ✔ |
| N-4 | MINOR | Colour-search state split across the pane/child boundary; `onClearFilters` nulls the same ref twice. | ✔ `:329-332` |
| N-5 | INFO | `./value` and `./transform` are published with zero demo consumers. | ✔ demo census: `color` 25 · `css` 10 · `math` 6 · `easing` 5 · `quantize` 4 · `value` **0** · `transform` **0** |
| N-7 | MAJOR | `"sideEffects": false` is declared for a package that contains a non-library tree; `files` carves the demo back out by double negation. | ✔ `package.json:12, 60-64` |
| N-8 | MAJOR | Live-resolver proof of the export dual path + the dogfood inversion (the **dead** path imports `@mkbabb/value.js/color`; the **live** one imports nothing). | ✔ `export.ts:1` imports only `./types` |

### Extension to L-11 — the correct rendering atom already exists and this pane does not use it

Pass 1 proved that `#/browse` paints *"The commons is unreachable. / Failed to load palettes"* while
the latch state is `misconfigured`, and proposed teaching `EmptyState` to select copy from the error
type. That cure is larger than necessary, because the atom is already written:

`demo/palettes/browser/status/ApiOfflineChip.vue:11-27` renders exactly the two designed registers —
`dev misconfigured — run \`npm run dev\`` (role=alert) and `backend offline — saved locally`
(role=status) — reading `availability` through the injected api-client seam. It is exported from the
feature's own barrel (`browser/status/index.ts:7`).

```
$ grep -rn "ApiOfflineChip" demo | grep -v "status/ApiOfflineChip.vue:"
demo/palettes/browser/index.ts:46          (barrel — see N-15, zero importers)
demo/palettes/browser/status/index.ts:7    (barrel)
demo/palettes/browser/card/CurrentPaletteEditor.vue:116,193   ← the ONE consumer
```

One consumer, and it is the **My Palettes** editor. The pane whose entire content is a remote read
does not render it. `demo/palettes/browser/status/index.ts:2` even records the fact in a comment:
*"ApiOfflineChip's live consumer is CurrentPaletteEditor"*. The four-state `ApiAvailability` union
has an owner (`platform/transport/availability.ts:40-45`) **and** a renderer, and BrowsePane
consumes neither — it re-derives "error" as the constant string at `useBrowsePalettes.ts:79`.

---

# §B — New in pass 4

## N-10 · BLOCKER — the wire contract has no home; 20 of 22 fields diverge between the server's response type and the client's

### The defect

The palette envelope that `#/browse` renders is declared **twice, independently, in two languages of
the same repo**, with no generation step, no shared module, and no runtime validation:

| home | declares | authority |
|---|---|---|
| `api/src/modules/palette/format.ts:19-47` | `FormattedPalette` | **the truth** — `formatPalette()` (`:60-90`) constructs exactly this object and it is what the route serializes |
| `demo/palettes/types.ts:15-71` | `Palette` | a hand transcription; what `BrowsePane.vue:197` imports and every `pm.*` member is typed as |

The transport does not check the transcription. `demo/palettes/api/palettes.ts:39-41`:

```ts
export function listPalettes(opts: ListPalettesOptions = {}):
    Promise<CursorPaginatedResponse<Palette>> {   // ← an unchecked assertion over response.json()
```

I diffed the two declarations field-by-field (script preserved at `./probe-L4/typediff.mjs`):

```
$ node probe-L4/typediff.mjs
...
DIVERGENT: 20 of 22
```

| field | server `FormattedPalette` | demo `Palette` | verdict |
|---|---|---|---|
| `userSlug` | `string \| null` | `?: string` | **`null` erased** |
| `oklabColors` | required | `?: {L,a,b}[]` | optionality |
| `createdAt` / `updatedAt` | `Date` | `string` | type |
| `deletedAt` | `Date \| null` | `?: string \| null` | type + optionality |
| `isLocal` | `false` (literal) | `boolean` | **discriminant erased** |
| `tags` `voteCount` `visibility` `tier` `currentHash` `forkOf` `forkOfHash` `forkCount` `versionCount` `published` `atomSetHash` | all required | all `?:` | optionality ×11 |
| `voted` | `?: boolean \| undefined` | `?: boolean` | type |
| `id` | — | `?: string` | client-only |
| `name` `slug` | | | **the only two that agree** |

### Mechanism

One type is being asked to model two disjoint things. The server publishes the discriminant —
`isLocal: false` as a **literal** — so `FormattedPalette` and a local draft are a discriminable
union by construction. `demo/palettes/types.ts:47` widens it to `isLocal: boolean`, which destroys
the discrimination, and the only way to keep one interface inhabited by both a client-minted draft
and a server envelope is to make every server-guaranteed field optional. Every `?:` in that table is
the shadow of the erased literal.

The leaf pays the bill three times, and pass 1 recorded two of the three without the cause:

- `BrowsePane.vue:344-345` — `palettes.filter((p: any) => { const oklabColors = p.oklabColors as
  {L,a,b}[] | undefined; ...})`. An `any` *and* an `as` on a field that **is** declared in
  `demo/palettes/types.ts:32`, because the declaration is optional while the wire guarantees it.
- `BrowsePane.vue:346` — `if (!oklabColors || oklabColors.length === 0) return false;` — the silent
  exclusion pass 3 measured at 5 of 10 live rows.
- `BrowsePane.vue:215-220` (pass-1 L-16) — the `Array.isArray(tags) ? tags : Object.values(tags)`
  masking fallback, written because nothing types the `/colors/tags` payload either.

L-16 is not a discipline failure at the leaf. It is the only available move when the wire has no
type owner.

### Cure

One home for the envelope, and let the union be a union.

`api/src/modules/palette/format.ts` already contains the authority. Publish it: `api/` emits a
`contract.d.ts` (or the repo hoists a tiny `contracts/palette.ts` both trees import — it is types
only, so it costs nothing at runtime and crosses no bundling boundary). The demo then declares

```ts
type Palette = LocalPalette | RemotePalette;   // discriminated on isLocal: true | false
```

with `RemotePalette = SerializedFormattedPalette` (`Date` → `string` applied once, by a mapped type,
not by hand). `pm.remotePalettes` becomes `Ref<RemotePalette[]>`, at which point
`BrowsePane.vue:339-349` needs no `any`, no `as`, and no `!oklabColors` branch — the exclusion
disappears because the type says it cannot happen. `usePaletteStore` gets `LocalPalette[]` and stops
pretending it might hold `atomSetHash`.

---

## N-11 · MAJOR — `is-owned` evaluates `null === null` for every anonymous visitor: five of the ten live commons rows offer Delete, Rename, Edit Tags and the visibility flip, and suppress Report

**This is N-10's erased `null`, cashed out on the live site.**

### The chain, each link measured

**1. The server emits `userSlug: null`.** `api/src/modules/palette/format.ts:26` declares it;
`api/src/modules/palette/service/crud.ts:77,96` accepts `userSlug: string | null` at create and
writes it through; `model.ts:60` is `string | null`.

**2. The live commons is half null.**

```
$ curl -s https://api.color.babb.dev/palettes?limit=50 | node -e '…'
rows 10
userSlug null/undefined: 5  [ lavender-dreams, forest-canopy, neon-cyberpunk, ocean-depths, sunset-blaze ]
```

**3. A fresh visitor's `userSlug` is `null`, and stays `null`.**
`demo/platform/auth/useUserAuth.ts:32` — `_userSlug = ref<string | null>(safeGetItem(localStorage,
SLUG_KEY))`; `demo/platform/storage/useSafeStorage.ts:5-11` returns `localStorage.getItem`, i.e.
`null` when absent. `userSlug` is `computed(() => slugRef.value)` (`:60`). Nothing at boot mints
one:

```
$ grep -rn "ensureUser" demo | grep -v usePalettePorts.ts
demo/palettes/usePaletteActions.ts:42                      ← publish
demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:53   ← fork
```

Two call sites, both user-initiated writes. A visitor who only browses never registers.

**4. The comparison.** `BrowsePane.vue:99`:

```
:is-owned="palette.userSlug === pm.userSlug.value"
```

`null === null` → **`true`**. TypeScript cannot warn, because `demo/palettes/types.ts:29` declares
`userSlug?: string` — the client type says `null` is impossible, so no null-guard was ever written.

**5. `paletteKind` is `remote`.** `demo/palettes/utils.ts:22-23` — `if (!palette.isLocal) return
"remote"`, and `format.ts:45` emits `isLocal: false`.

**6. What `isOwned` unlocks**, quoted from `PaletteCardMenu.vue`:

| line | `v-if` | item |
|---|---|---|
| `:49` | `paletteKind === 'remote' && isOwned` | **Publish / Make private** |
| `:74` | `paletteKind !== 'remote' \|\| isOwned` | **Rename** |
| `:84` | `paletteKind === 'remote' && isOwned` | **Edit Tags** |
| `:134` | `… \|\| (paletteKind === 'remote' && isOwned)` | **Delete** |
| `:144` | `paletteKind === 'remote' && !isOwned` | **Report** — *hidden when owned* |

### Reproduction

```
$ node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-L4/probe-isowned-deterministic.mjs
commons rows            : 10
rows with userSlug null : 5
isOwned===true for anon : 5  -> lavender-dreams, forest-canopy, neon-cyberpunk, ocean-depths, sunset-blaze
```

The five are the seeded showcase palettes — the first thing a first-time visitor sees.

### Why MAJOR and not BLOCKER — the honest boundary

The **server is safe.** `api/src/modules/palette/require-ownership.ts:33-38`:

```ts
const userSlug = c.var.userSlug;
if (!userSlug) throw new AuthenticationError();          // 401 — anonymous cannot proceed
const ownerSlug = await getResourceOwner(c);
if (ownerSlug === null) throw new NotFoundError(…);      // 404 — null owner is never matched
if (ownerSlug !== userSlug) throw new OwnershipError(…); // 403
```

`!userSlug` catches `null` **and** `""`, and the `ownerSlug === null` branch is checked before the
equality — so the API cannot be walked through this hole. There is no privilege escalation and no
data loss. What ships is a **false affordance on half the public wall** (four destructive-looking
actions that 401) plus **suppression of the moderation path** (the only Report button is hidden on
exactly the rows a stranger is most likely to want to report). That is MAJOR.

### Live-probe note (negative result, recorded)

I attempted to confirm the menu in the running app and could not, for a reason worth recording:
the dev server at `:9000` never issues the request. `demo/platform/transport/availability.ts:29-35`
detects `VITE_API_URL` unset + loopback origin + cross-origin `BASE_URL` and latches
`misconfigured`; `assertApiAttemptAllowed` then short-circuits before any fetch. My Playwright run
(`./probe-L4/probe-isowned.mjs`, preserved) logged **zero** `/palettes?` requests and zero cards.
This independently corroborates pass 1's note that every `#/browse` row in the visual matrix
(`REPORT.md:121,136,151,166`) was captured on the **error plate** — I read
`shots/safari-desktop-light/browse.png` and it shows *"The commons is unreachable. / Failed to load
palettes"*, not a wall. **The wall has still never been captured by any seat.** The deterministic
probe above is therefore the reproduction of record: it runs the literal expression from `:99`
against the literal wire body from the production API.

### Cure

Falls out of N-10 for free: `RemotePalette.userSlug: string | null` makes `:99` a type error until
it is written `palette.userSlug != null && palette.userSlug === pm.userSlug.value`. Better still,
ownership is not the pane's arithmetic — `useBrowsePalettes` exposes `isOwnedBy(p)` and the template
reads a boolean it did not compute. (Independently, `formatPalette` should stop emitting a `null`
owner to the public wall at all, or the seed script should own its rows.)

---

## N-12 · MAJOR — the demo's type map bypasses the `exports` map it claims to enforce: 3 of its 8 keys point at files that do not exist, 2 published subpaths are unlisted, and one side is generated while the other is hand-written

### The asymmetry

`vite.config.ts:38-49` **generates** the runtime alias set from `package.json#exports`, with an
explicit, correct comment about why it must be generated ("so the alias set can never drift from the
exports map"). `tsconfig.demo.json:43-53` declares the *same* mapping **by hand** — and it has
already drifted:

```
$ for f in dist/index.d.ts dist/subpaths/{parsing,units,color,css,value,math,easing,transform,quantize}.d.ts; …
MISSING dist/index.d.ts              ← tsconfig paths: "@mkbabb/value.js"
MISSING dist/subpaths/parsing.d.ts   ← tsconfig paths: "@mkbabb/value.js/parsing"
MISSING dist/subpaths/units.d.ts     ← tsconfig paths: "@mkbabb/value.js/units"
EXISTS  dist/subpaths/{color,css,value,math,easing,transform,quantize}.d.ts
```

| | `package.json#exports` (7) | `tsconfig.demo.json` `paths` (8) |
|---|---|---|
| `.` | — | ✗ → missing file |
| `./color` `./easing` `./math` `./transform` `./quantize` | ✓ | ✓ |
| `./value` | ✓ | **absent** |
| `./css` | ✓ | **absent** — and **10 live demo import sites** |
| `./parsing` `./units` | — | ✗ → missing files |

The tsconfig's own doc-comment (`:47-50`) asserts "the bare `.` root + the 7 subpath barrels … a
CLOSED 8-key set". `package.json#exports` publishes seven keys and no root. The comment describes a
surface that does not exist.

### The mechanism — `paths` outranks `exports`

TypeScript's `paths` substitution runs **before** node resolution, so it does not consult the
`exports` map at all. Proof (probe preserved at `./probe-L4/`):

```
$ cat probe-L4/probe-paths.ts
import { parseCssColor } from "@mkbabb/value.js/parsing";   // NOT in package.json#exports
$ npx tsc -p probe-L4/tsconfig.probe.json ; echo "exit=$?"
exit=0                                                       ← typecheck GREEN
```

```
$ npx vite-node …/vite-parsing.mjs          # the alias set generated exactly as vite.config.ts does
generated alias count = 7 | covers /parsing? false
@mkbabb/value.js/parsing => ERROR: "./parsing" is not exported under the conditions
                                    ["module","browser","development","import"]
@mkbabb/value.js/color   => /Users/mkbabb/Programming/value.js/dist/subpaths/color.js
```

**Type gate green, runtime gate red, on the same specifier.** Today the three dead keys are inert
only because their `.d.ts` files are absent — an accident, not a guard. The instant one appears the
split is live, and the repo is *chartered to make one appear*: the V·π mini-tranche exists to ship a
CSS parser, and the natural home is `src/subpaths/parsing.ts` → `dist/subpaths/parsing.d.ts`. On
that day `import { parseCssColor } from "@mkbabb/value.js/parsing"` typechecks and cannot be
bundled.

This is precisely the class pass 1 named as its meta-rule (*a structural invariant is only real if a
green build fails without it*) and pass 3 found twice more. The demo-dogfood keystone's guarantee —
"a non-published specifier is unauthorable" — is enforced on the runtime side by generation and on
the type side by a hand-list. Only one half is true.

### Cure

Generate the `paths` map the same way the alias set is generated, or delete it entirely. Deleting is
better and is the true KISS move: TypeScript ≥5 resolves a package's own name through its `exports`
map by self-reference — I verified it does so here today for `@mkbabb/value.js/css`, which has **no**
`paths` entry:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "@mkbabb/value.js/css"
Module name '@mkbabb/value.js/css' was successfully resolved to
  '…/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'
```

Ten import sites already resolve correctly with no `paths` entry at all. Remove all eight, keep
`moduleResolution: "Bundler"`, and the `exports` map becomes the single authority for both gates —
which is what the keystone always claimed. Pass 3's §D-0 package split would achieve the same thing
by real resolution and is strictly better; this is the version that works before the split lands.

---

## N-13 · MAJOR (extends L-8/N-3) — the OKLab colour-search protocol is fully implemented at both ends and connected at neither; the shipping implementation is the leaf's, and it is the weakest of the three

Pass 3 established two homes for the distance metric. There are in fact **three implementations of
the colour-search feature**, and the two good ones are dead plumbing.

**Server — complete.** `api/src/modules/palette/schema.ts:89` accepts `colorL`, and
`crud-list.ts:153-180` builds the matcher over the denormalized `oklabColors` index with
`query.colorRadius ?? 0.15`. Tested: `__tests__/palette-list.test.ts:118,137,161`.

**Client transport — complete.** `demo/palettes/api/palettes.ts:27-30` declares
`colorL/colorA/colorB/colorRadius` on `ListPalettesOptions` and `:49-52` serializes all four into
the query string.

**Callers — none.**

```
$ grep -rn 'colorL\|colorRadius' demo | grep -v 'api/palettes.ts'
demo/palettes/BrowsePane.vue:354:  // (API also supports server-side via colorL/colorA/colorB params, but client-side is instant)
```

One hit, and it is a comment in the leaf explaining why the leaf does it itself.
`useBrowsePalettes.currentFilterOpts()` (`:52-60`) builds `limit/sort/q/tier/tags` and never a
colour param. So the live implementation is `BrowsePane.vue:339-349` — a filter over
`pm.filteredBrowse.value`, i.e. **only the pages already loaded**, with its own literal
`const radius = 0.15` (`:343`) duplicating the server default at `crud-list.ts:167`.

Consequences the two dead implementations would not have had:

- the search is page-local: it cannot see past the 50-row cursor page, and the "More from the
  commons" trigger at `:132-144` is gated on `pm.hasMore` — untouched by the colour filter — so it
  keeps offering more of a wall the filter has already emptied;
- a colour search matching nothing renders `PaletteCardGrid`'s **`empty-text="No published palettes
  here yet."** plus `empty-hint="Publish one from My Palettes and start the wall."` (`:85-86`) — a
  false statement about the commons, produced by a client-side filter the empty state knows nothing
  about;
- `0.15` is a protocol constant with two independently editable homes.

**Cure** (supersedes the client half of L-8's): delete `displayedBrowse` and `colorSearchParams`
from the pane. `useBrowseQuery` puts `(L, a, b, radius)` into `ListPalettesOptions` alongside
`tier`/`tags`/`sort` — where the other four filters already live — and the wall reloads through the
one path. Colour search then searches the commons instead of the viewport, `hasMore` is honest,
and the empty state is reached only when the query truly has no rows. The metric itself moves to
`src/color/` (`deltaEOK`) so the api can retire its hand-rolled matrix too — `api/.../oklab.ts:16-21`
already books exactly that.

---

## N-14 · MAJOR — the published library's build configuration imports application code out of the demo tree

`vite.config.ts:16`:

```ts
import { injectGroundTokens } from "./demo/color-picker/composables/boot/ground";
```

`groundRecordInject()` (`:143-151`) wraps it as a plugin and the plugin is in `defaultPlugins`
(`:159-165`), which **the production library build spreads** (`:203` — `plugins: [...defaultPlugins,
dts({…})]`). The direction of dependency is inverted at the top of the tree: the module graph that
produces `dist/subpaths/*.js` — the artifact `demo/` is supposed to *consume* — reaches down into
`demo/color-picker/composables/boot/`.

Two mitigations, stated so the finding is not overclaimed: `ground.ts` has **zero** imports
(`grep -nE '^\s*import ' demo/color-picker/composables/boot/ground.ts` → no output), so no demo
runtime is dragged into the library bundle; and `transformIndexHtml` never fires in `production`
mode because the library build has no `index.html` (the config says so at `:141`). The plugin is
loaded and inert.

It is still the wrong edge. It makes `demo/` a **build-time dependency of the library**, so pass 3's
§D-0 move — extracting `demo/` into its own workspace package, the move on which the `sideEffects`
cure (N-7) and the entry-module cure (N-6) both rest — breaks `npm run build` on the day it is
attempted. And `npm run prepare` is `rm -rf dist && npm run build`: the publish path traverses this
edge.

**Cure**: the token contract is a build concern, not an application concern. `injectGroundTokens`
and the `GROUND_*` constants move to `plugins/vite-ground-tokens.ts` beside its two siblings
(`plugins/vite-source-export.ts`, `plugins/vite-defer-glass-fonts.ts`); `demo/.../boot/ground.ts`
imports the constants from there. Single-sourcing (the U-F23 · G-CANON-4 goal) is preserved exactly
— the arrow just points the way the layering says it must.

---

## N-15 · MINOR — the feature's declared "top-level seam" has zero importers

`demo/palettes/browser/index.ts` is a 47-line barrel whose header (`:1-17`) declares it *"the stable
public API of the palette-browser feature … External consumers reach the feature through THIS seam
… the G-DEMO-3b boundary (eslint.config.js) enforces it standing."*

```
$ grep -rn 'from "\./browser"\|from "\.\./browser"\|palettes/browser"' demo
(no output)
```

Nothing imports it. `BrowsePane.vue:186-194` reaches the three cluster barrels directly
(`./browser/card`, `./browser/search`, `./browser/dialog`), which is the tree-shake-honest thing to
do and which the barrel's own comment concedes for `MigratePalettesDialog`. Combined with pass-1
L-4/N-2 (the G-DEMO-3b globs match nothing), the position is: a boundary that is documented,
un-enforced, and un-used, sitting in the middle of a tree whose actual reach convention is
"whichever barrel is nearest".

**Cure**: delete it. The cluster barrels (`card/`, `search/`, `dialog/`, `admin/`, `slug/`,
`status/`) are the real seams, they are already named-re-export-only, and they are what every
consumer already uses. Then re-home the eslint glob onto *those* six paths, with the
zero-match-glob assertion pass 2 proposed, so the rule fails loudly if it stops matching again.

---

## N-16 · MINOR — `usePaletteExport` is a composable in name only

`demo/palettes/usePaletteExport.ts` (27 lines) declares no `ref`, no `computed`, no `watch`, no
lifecycle hook, and closes over nothing. It is one `switch` in a function that returns
`{ onExport }`, and both consumers immediately unwrap it:

```
demo/palettes/BrowsePane.vue:324    const { onExport } = usePaletteExport();
demo/palettes/PalettesPane.vue:211  const { onExport } = usePaletteExport();
```

`use*` is a contract with the reader: reactive state or lifecycle inside. This is a module-level
function wearing the prefix, plus a factory call on every mount to obtain it. Edict 3 (KISS, no
contrivance).

**Cure**: it disappears entirely under L-1/N-8's cure — `export/index.ts` (promoted from
`serializers.ts`) exports `exportPalette(snapshot, format)` and the two panes import it. One home,
no factory, no prefix lie.

---

## N-17 · MINOR — an undeclared second copy of the library sits in `node_modules`, at the same version, with different bytes (currently shadowed — negative proof included)

`node_modules/@mkbabb/value.js/` is a real directory containing a published tarball of
`@mkbabb/value.js@4.0.0`. This repo **is** `@mkbabb/value.js@4.0.0`, and does not declare itself:

```
$ node -e "const p=require('./package.json'); console.log(p.dependencies)"
{ '@mkbabb/glass-ui': '^7.0.0', '@mkbabb/keyframes.js': '^6.0.0' }

$ node -e "console.log(require('./node_modules/@mkbabb/keyframes.js/package.json').dependencies)"
{ '@mkbabb/value.js': '4.0.0' }     ← an exact-pin RUNTIME dep, not a peer
```

glass-ui declares it as a peer (correct); keyframes.js declares it as a hard dependency at an exact
pin, so npm materialises a full copy. The two copies are not the same build:

```
$ cmp dist/subpaths/css.js node_modules/@mkbabb/value.js/dist/subpaths/css.js
differ                                    # 43,973 B vs 43,972 B
$ find dist -name '*.js' -not -path 'dist/gh-pages/*' | sort | xargs md5 -q | md5 -q
e13ed2ad291a5cd37bcd7882375552da
$ find node_modules/@mkbabb/value.js/dist -name '*.js' | sort | xargs md5 -q | md5 -q
993b31794f22be55bdf4b2f117ff92d8
```

Same version string, different bytes. (I inspected the diff: minifier identifier assignment, so the
two are semantically equivalent today — the published 4.0.0 and the local build of "4.0.0" simply
are not the same artifact.)

**The negative, proved.** The hazard is not currently live. Both resolvers reach the repo's own
`dist/` by package self-reference, ahead of `node_modules`:

```
$ node --input-type=module -e "console.log(await import.meta.resolve('@mkbabb/value.js/color'))"
file:///Users/mkbabb/Programming/value.js/dist/subpaths/color.js

$ vite pluginContainer.resolveId("@mkbabb/value.js/color", from BrowsePane.vue)
/Users/mkbabb/Programming/value.js/dist/subpaths/color.js

$ npx tsc -p tsconfig.demo.json --traceResolution | grep "@mkbabb/value.js/css"
… resolved to '…/value.js/dist/subpaths/css.d.ts'
```

Recorded as MINOR because it is a *latent* second instance of the library in the resolution path of
a repo whose central structural claim is "the demo consumes exactly one published surface", and
because `vitest.config.ts:6-13` carries **no** value.js alias at all (only `@src`) — it relies
entirely on self-reference, which is a property of the tooling rather than of this repo's
configuration. Under pass 3's §D-0 package split, where `demo/` no longer shares the library's
`package.json`, self-reference stops applying and the phantom copy becomes reachable. Fix it before
the split, not after: `npm dedupe` cannot help across an exact pin, so the real cure is
keyframes.js moving `@mkbabb/value.js` to `peerDependencies` — a producer-side change that belongs
in the keyframes relay.

---

# §C — Joint verdict across four passes

**DEFECTIVE.** 33 findings across four independent seats; 21 MAJOR-or-worse; three BLOCKERs.

The through-line, now stated at its full width: **one concept, two or more homes, and the shipping
home is the wrong one.**

| concept | homes | which one ships |
|---|---|---|
| the application entry | **zero** | none — N-6 |
| the wire envelope | 2 (`format.ts`, `types.ts`) | the transcription — **N-10** |
| palette export | 2 (`export.ts`, `export/`) | the legacy one — L-1/N-8 |
| OKLab colour search | 3 (server, client transport, leaf) | the leaf's page-local filter — **N-13** |
| the design system reach | 3 (shim / subpath / root barrel) | all three, 209 sites — L-3/N-9 |
| the public-surface map | 2 (generated alias / hand `paths`) | both, disagreeing — **N-12** |
| the availability state | 2 (typed union + chip / a string) | the string — L-11 |
| the remote row list | 6 mutation sites | all six — L-10 |
| the slugifier | 3 | all three — L-2 |
| the library itself | 2 (repo `dist`, `node_modules`) | the repo's, by accident — **N-17** |

**Strongest defect overall — unchanged from pass 3: N-6.** Nothing in this pass displaces it. The
production `gh-pages` build emits 12,472 bytes and no `BrowsePane` chunk; the same config with the
entry given a file emits 1,595,550 bytes across 45 chunks. Until that is cured, no other finding
reaches a user.

**Strongest defect new in pass 4: N-10**, with **N-11** as its live cash-out. It outranks every
remaining finding because it is the *only* one whose blast radius is the whole feature area rather
than one file: every `pm.*` member, every card, both panes and both walls are typed against a
20-of-22-divergent transcription of a contract the repo already owns in machine-readable form. N-11
is what that costs today — half the visible commons wall mis-labelled as owned, for every visitor
who has not yet published — and pass 1's L-16 masking fallback and pass 3's 5-of-10 silent exclusion
are two more instalments of the same debt. It is also the finding whose cure is cheapest relative to
blast radius: publish the type that already exists and restore the discriminant the server already
emits.

**A note on evidence integrity, now confirmed from a second direction.** Pass 1 observed that the
`#/browse` rows of the visual matrix were measured on the error plate. My Playwright run reproduced
the cause independently: the dev origin latches `misconfigured` and issues **zero** `/palettes`
requests, so the wall cannot render there at all. Four seats have now audited a component whose
primary state no capture in this programme has ever contained. Any born-RED gate written against
`#/browse` pixel or count evidence is a gate against an error plate. The corrected state matrix
handed to this seat (text=280 / 124, 12 operable controls, overflowX=0) describes that plate — it is
accurate and it is not the component. **Capturing the wall requires `npm run dev` (the full local
stack) or a `VITE_API_URL`, and should be a prerequisite of the next visual pass**, not an item in
it.

**The negative, proved — and it survives a fourth pass.** The brief's headline charge — *a demo
import a real consumer could not write* — does **not** hold for this component. `BrowsePane.vue`'s
14 imports (`:179-199`) are `vue`, demo-relative paths, and one published subpath
(`@mkbabb/glass-ui/search`). Repo-wide: `grep -rn 'from "@mkbabb/value.js"' demo` → 0 bare-root
imports; `@src/` or `../../src/` reaches from `demo/` → 0; and all 46 value.js specifiers in `demo/`
name keys that exist in `package.json#exports`. The runtime mechanism is genuinely well engineered
— `vite.config.ts:38-49` *generates* the alias set from the exports map by anchored regex, so it
cannot drift and cannot prefix-match into a subpath. That must survive any restructure verbatim.
**N-12 narrows the negative rather than overturning it**: the guarantee is real on the runtime side
and only conventional on the type side, and the fix is to delete the hand-written half so both gates
read the same authority.

---

# §D — The lattice, greenfield (pass 4's amendment)

Passes 1–3 produced a lattice that stands. Pass 4 inserts one move ahead of the demo-internal work,
because it is the one that makes the leaf's cures *type-checkable* instead of merely tidy.

```
0.  SPLIT THE PACKAGE                                                    (N-7, pass 3 §D-0)
    demo/ becomes a private workspace package.
    PREREQUISITE, new: move injectGroundTokens → plugins/vite-ground-tokens.ts,
    or the library build breaks the day the split lands.                 (N-14)
    PREREQUISITE, new: keyframes.js → peerDependencies, or the phantom
    value.js copy becomes reachable once self-reference stops applying.  (N-17)

1.  GIVE THE APPLICATION AN ENTRY MODULE                                 (N-6)
    demo/color-picker/main.ts + <script src>; CI entry-chunk floor (>50 KB).

2.  ONE HOME FOR THE WIRE CONTRACT                                  ★ new (N-10, N-11)
    contracts/palette.ts   ← the ONLY declaration; api/ and demo/ both import it
      type RemotePalette   = Serialized<FormattedPalette>   // isLocal: false
      type LocalPalette    = { isLocal: true; id: string; … }
      type Palette         = LocalPalette | RemotePalette   // discriminated
    Deletes at the leaf: the `(p: any)` cast, the `as {L,a,b}[]`, the
    `!oklabColors` exclusion, the `Array.isArray(tags)` fallback, and the
    `null === null` ownership bug — each becomes impossible rather than fixed.

3.  ONE AUTHORITY FOR THE PUBLIC SURFACE                            ★ new (N-12)
    tsconfig.demo.json `paths` for @mkbabb/value.js/*  → DELETED (all 8 keys).
    package.json#exports is the sole authority; self-reference serves types,
    the generated alias serves runtime. Type gate and runtime gate agree by
    construction, not by hand-maintenance.

4..n  passes 1–3's lattice, unchanged, with two amendments marked ★:

demo/palettes/browse/
  BrowsePane.vue        template + wiring only; root is <PaneHeader>          (N-1, L-13)
  useBrowseQuery.ts     THE query owner: search · sort · tier · tags ·
                        colour(L,a,b,radius) → ListPalettesOptions.
                      ★ the colour params already exist on that interface and
                        have zero callers — wiring them retires the pane's
                        client-side filter, the stranded load-more and the
                        false empty-state in one move.                        (N-13)
  useBrowseActions.ts   fork · vote · rename · visibility · delete;
                        ONE replaceRow(slug, next)                            (L-9, L-10)
  useModalTarget.ts     open/target × 3 (the hand-rolled ref pairs, :269-320)
demo/palettes/export/index.ts   ← promoted from serializers.ts
                              ★ exports exportPalette(); usePaletteExport DELETED (L-1, N-8, N-16)
demo/shared/ui/PaneHeader.vue   renders the Card root + sticky header + slot   (N-1)
demo/styles/                    owns .pane-scroll-fade + --pane-scroll        (N-1)
src/color/operations.ts         deltaEOK — the metric gets a home in the library;
                                api/.../oklab.ts:16-21 already books consuming it (L-8, N-13)

DELETED: demo/ui/**  (19 barrels, 90 sites → @mkbabb/glass-ui/<subpath>)      (L-3, N-9)
       ★ demo/palettes/browser/index.ts  (the seam with zero importers)       (N-15)
         demo/palettes/export.ts + its slugifier                              (L-1, L-2, N-8)
         BrowsePane's displayedBrowse + colorSearchParams                     (N-13, N-4)
         useDialogBrowseActions.onRevert + modalStack                         (L-9)
         both cardRefs registries                                             (L-12)
ADDED:   BrowsePane renders <ApiOfflineChip/>; browseError becomes
         Ref<Error|null> and EmptyState selects copy from error.name          (L-11 ext.)
FIXED:   eslint globs → the six cluster barrels + a zero-match assertion      (L-4, N-2, N-15)
         no-restricted-imports bans the glass-ui root barrel from demo/**     (N-9)
```

Direction of dependency after the transposition: `pane → feature composables → api client → the one
contract module`, with `shared/ui` and glass-ui the only upward reaches and `@mkbabb/value.js/*` the
only downward one. **No component owns arithmetic. No component owns a wire shape. No CSS class is
owned by a component that does not render it. No concept has two homes — and the two that had none
(the application entry, the wire contract) each have a file.**

`BrowsePane.vue` at the end is roughly 190 lines: a header, a search bar, three states, a grid,
three portalled surfaces, and no logic another module could own.

---

## Evidence index (pass 4)

| claim | command / artifact |
|---|---|
| N-10 wire divergence, 20 of 22 | `node probe-L4/typediff.mjs` over `api/src/modules/palette/format.ts:19-47` vs `demo/palettes/types.ts:15-71` |
| N-10 the assertion is unchecked | `demo/palettes/api/palettes.ts:39-41` — `Promise<CursorPaginatedResponse<Palette>>` over `request()` |
| N-10 the discriminant the server emits | `format.ts:45` `isLocal: false` vs `demo/palettes/types.ts:47` `isLocal: boolean` |
| N-11 live commons is half-null | `curl -s https://api.color.babb.dev/palettes?limit=50` → 10 rows, **5** with `userSlug: null` |
| N-11 a fresh visitor's slug is null | `useUserAuth.ts:32,60` + `useSafeStorage.ts:5-11`; `grep -rn ensureUser demo` → 2 call sites, both user-initiated writes |
| N-11 the expression | `BrowsePane.vue:99` `:is-owned="palette.userSlug === pm.userSlug.value"` |
| N-11 what it unlocks / suppresses | `PaletteCardMenu.vue:49,74,84,134` (Publish/Rename/Edit Tags/Delete) and `:144` (Report, `!isOwned`) |
| N-11 reproduction | `node probe-L4/probe-isowned-deterministic.mjs` → `isOwned===true for anon : 5` |
| N-11 the server is safe | `api/src/modules/palette/require-ownership.ts:33-38` — `!userSlug` → 401, `ownerSlug === null` → 404 |
| N-11 dev cannot render the wall | `node probe-L4/probe-isowned.mjs` → zero `/palettes?` requests; `availability.ts:29-35`; `shots/safari-desktop-light/browse.png` (read — error plate) |
| N-12 three `paths` keys point at missing files | `ls dist/index.d.ts dist/subpaths/{parsing,units}.d.ts` → all MISSING |
| N-12 two published subpaths unlisted | `package.json#exports` has `./value` `./css`; `tsconfig.demo.json:43-53` has neither; `grep -roh '@mkbabb/value.js/css' demo \| wc -l` → **10** |
| N-12 an unpublished specifier typechecks GREEN | `npx tsc -p probe-L4/tsconfig.probe.json` → exit **0** |
| N-12 the same specifier cannot be resolved | `vite-parsing.mjs` → `generated alias count = 7 \| covers /parsing? false`; resolveId → `"./parsing" is not exported` |
| N-12 self-reference already serves the unlisted keys | `tsc --traceResolution` → `@mkbabb/value.js/css` → `dist/subpaths/css.d.ts@4.0.0` |
| N-13 colour params have zero callers | `grep -rn 'colorL\|colorRadius' demo \| grep -v api/palettes.ts` → one comment, `BrowsePane.vue:354` |
| N-13 both dead ends are complete | `api/.../schema.ts:89` + `crud-list.ts:153-180` + `__tests__/palette-list.test.ts:118`; `demo/palettes/api/palettes.ts:27-30,49-52` |
| N-13 duplicated protocol default | `BrowsePane.vue:343` `const radius = 0.15` vs `crud-list.ts:167` `query.colorRadius ?? 0.15` |
| N-13 the false empty state | `BrowsePane.vue:85-86` `empty-text` / `empty-hint` reached via a client-side filter |
| N-14 library build imports demo | `vite.config.ts:16` → `groundRecordInject()` at `:143`, in `defaultPlugins` `:159`, spread by production at `:203` |
| N-14 the mitigation, measured | `grep -nE '^\s*import ' demo/color-picker/composables/boot/ground.ts` → no output |
| N-15 the seam has zero importers | `grep -rn 'from "\./browser"\|from "\.\./browser"\|palettes/browser"' demo` → no output |
| N-16 composable in name only | `demo/palettes/usePaletteExport.ts` (27 L, no reactive state); `BrowsePane.vue:324`, `PalettesPane.vue:211` |
| N-17 undeclared second library copy | `package.json` deps = glass-ui + keyframes only; `keyframes.js/package.json` deps = `{"@mkbabb/value.js":"4.0.0"}`; `md5` of the two dist trees → `e13ed2ad…` vs `993b3179…` |
| N-17 currently shadowed (negative) | `import.meta.resolve`, vite `resolveId`, and `tsc --traceResolution` all → the repo's `dist/` |
| L-11 ext. the chip exists, one consumer | `browser/status/ApiOfflineChip.vue:11-27`; `grep -rn ApiOfflineChip demo` → `CurrentPaletteEditor.vue:116` only |
| L-1 ✔ the dual path names itself | `demo/palettes/export/types.ts` header, and `export/serializers.ts:6-9` |
| L-3 ✔ shim census | 18 of 19 `demo/ui/*/index.ts` are one line; glass-ui publishes 74 export keys incl. `./card`, `./button` |
| N-5 ✔ demo subpath census | `color` 25 · `css` 10 · `math` 6 · `easing` 5 · `quantize` 4 · `value` 0 · `transform` 0 |
| probes | `./probe-L4/{probe-isowned.mjs, probe-isowned-deterministic.mjs, probe-paths.ts, tsconfig.probe.json, fake-parsing.d.ts, typediff.mjs}` |
| passes 1–3, preserved | `challenge-L-library-pass{1,2,3}.md` (pass 3 verified `md5 a18e1e879ea7db3bb2e272dd2c79c5e2`) |
