# CHALLENGE-D — `demo/palettes/BrowsePane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
this seat was explicitly spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** Twenty findings, three of them BLOCKER. The strongest is not a proportion
quibble: **one click on the pane's own Retry button permanently destroys the pane body.**
Measured, reproduced in a clean page, screenshotted. The pane is left as a 462 × 470 px void
under a search field, with no error, no empty plate, no skeleton, and no recovery path short of
a route change or reload.

Beneath that, the pane is composed against its own binding constitution: it is the *equal-card
matrix* `VISUAL-CONSTITUTION.md §3.1` explicitly rules cannot satisfy any member; it wraps the
field in the `Card` shell that same row forbids; and it has **no selected-palette inspector at
all**, so every action the constitution assigns to the inspector is crammed onto the card as a
seventeen-handler omnibus.

Scope note: the seat is `BrowsePane.vue`. Where a defect's cure lives in a shared atom
(`PaneHeader`, `EmptyState`, `useBrowsePalettes`, the shell composition) I say so, because the
constitution's "one family row plus an exhaustive site list" rule (`PROPORTION-AUDIT.md §3`)
means naming the family matters more than naming the file.

**Model observed: Opus 5 (`claude-opus-5[1m]`).**

---

## 1. Method and evidence base

| Source | What I used it for |
|---|---|
| `demo/palettes/BrowsePane.vue` (360 lines) | full read, line-cited |
| `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md` | the binding law; quoted verbatim |
| `.../audit/visual/REPORT.json` + `REPORT.md` | per-route probe rows for `/#/browse` × 4 matrices |
| `.../audit/visual/shots/{safari-desktop,safari-mobile}-{light,dark}/browse.png` | read as images |
| `.../audit/visual/shots/{rtl-mobile,forced-colors-desktop,zoom-200-desktop}/browse.png` | read as images |
| live `http://localhost:9000/#/browse`, Playwright/WebKit, 1440 × 900 | 4 instrumented probes; two new screenshots in `./evidence/` |

Browser probes were kept to four runs (probe parsimony edict, 2026-07-12). Each one decided
something a code read could not.

---

## 2. Findings

### D-01 · BLOCKER — one Retry click permanently blanks the pane body

`BrowsePane.vue:40` wraps the three-state container in `<Transition name="vj-morph" mode="out-in">`.
The design premise written into the comment at `:30–39` is *"the skeleton's last shimmer sweep
hands off into the enter (one clock, no double-flash)"*. `mode="out-in"` is by construction the
opposite of a handoff — it is *leave fully, then enter* — and the state machine it is animating
can transition **faster than the leave duration**, because `request()` calls
`assertApiAttemptAllowed()` **synchronously** (`demo/platform/transport/availability.ts:188–195`)
and throws before any fetch is issued.

So `loadRemotePalettes()` sets `browsing = true` (skeleton branch), the awaited call rejects on
the next microtask, the `catch` sets `browseError` and the `finally` sets `browsing = false` — all
inside the 200 ms `--duration-fast` leave that `mode="out-in"` has already started. The pending
enter never mounts.

**Measured.** Live probe, clean page, sampled every 25 ms from the Retry click:

```
t=  0 ms  n=1  h=224.5  "The commons is unreachable.Failed to load palettes"
t= 28 ms  n=1  h=224.5  vj-morph-leave-from|vj-morph-leave-active
t=227 ms  n=1  h=224.5  vj-morph-leave-active|vj-morph-leave-to
t=251 ms  n=0  h= 12.0  ""      <-- content gone
t=602 ms  n=0  h= 12.0  ""
t=1202 ms n=0  h= 12.0  ""
```

Second run, fresh page, 6-second tail plus a recovery attempt:

```
stateAfter6s     : { wrapChildren: 0, wrapH: 12, paneText: "BrowseDiscover palettes from the community." }
stateAfterTyping : { wrapChildren: 0,            paneText: "BrowseDiscover palettes from the community." }
```

Typing into the search field does not bring it back. The state container's only remaining child
is the HTML comment. Visual proof: `./evidence/D-browse-before-retry.png` (error plate present)
vs `./evidence/D-browse-after-retry-6s.png` (Browse pane empty; the My Palettes companion beside
it fully populated, proving the app is otherwise alive).

**Law violated.** `VISUAL-CONSTITUTION.md §6`: *"A scene swap preserves the specimen and changes
the surrounding instrument. **No full-slab remount hole**, rAF-delayed blank, or dock collapse."*
This is the full-slab remount hole, and it does not close.

**Design mechanism (the real defect, not the symptom).** The pane makes *DOM presence* a function
of an *animation clock*. `mode="out-in"` is legitimate for a swap whose two states are both
guaranteed to outlive the transition; it is never legitimate for a swap driven by an async
boundary that can settle in under a millisecond. The design assumed network latency ≫ animation
duration and shipped no arm for the case where it isn't.

**Cure (gestalt, not patch).** Do not animate branch identity. Keep one persistent state region
whose *content* cross-fades (`mode` default / simultaneous), or drop the Transition entirely on
the state container and let the plates own their own entrance. The constitution already says the
swap must "preserve the specimen"; a container that can be empty is not preserving anything. A
`v-if`-guard patch inside `mode="out-in"` would only narrow the window, not close the class.

---

### D-02 · BLOCKER — the composition is the equal-card matrix the constitution rules out, inside the Card shell it forbids

`VISUAL-CONSTITUTION.md §3.1`, Browse row, verbatim:

> Browse | discoverable public specimen field at **64%…66.6666667%** when selected |
> complementary selected-public-palette inspector at **33.3333333%…36%**; primary empty
> invitation content-hugs | search, results, selected inspector | **browse workspace chassis;
> every rendered bounded palette entity slip has exactly one Card shell, and the
> field/empty/inspector have none**

and, same section: *"`Card` remains semantic housing for a bounded object or specimen and **is
never the default page primitive**."* And §3.1 closing: *"**Resizing the old equal-card matrix
cannot satisfy any member.**"*

**Measured, live at 1440 × 900:**

| element | x-range | width | share of the 1041 px stage |
|---|---|---:|---:|
| Browse pane | 199 → 711 | **512 px** | **49.2 %** |
| My Palettes companion | 731 → 1240 | 509 px | 48.9 % |

Required: 64 – 66.667 %. Delta: **−14.8 to −17.5 percentage points.** Confirmed visually in
`shots/safari-desktop-light/browse.png` and `shots/safari-desktop-dark/browse.png` — two cards of
visually identical width, side by side, the exact figure the constitution names as the thing that
cannot satisfy any member.

And `BrowsePane.vue:2` is the shell the row forbids:

```
<Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

The *field* wears a Card. `tier="resting"` also puts the field on structural-glass material
(§2) rather than the neutral specimen well the field's job calls for.

**Cure.** The row already names it: a *browse workspace chassis*, with the field, empty plate and
inspector unhoused. The Card tuple survives only on the entity slips. This is an architectural
transposition, not a class edit — the companion currently occupying the other half is a whole
other route's pane, not the mandated inspector.

---

### D-03 · BLOCKER — no selected-palette inspector exists, so the card is the seven-mode omnibus

`VISUAL-CONSTITUTION.md §5`, verbatim:

> A palette card is a bounded entity article, not a clickable `role=article`, `listbox`/`option`
> composite, or **seven-mode omnibus**. … **The card body owns no expand, inline rename, action
> menu, transient result or hover-only swatch-action path. Full detail, rename/lifecycle/export
> actions and durable operation state live in the selected inspector.**

`BrowsePane.vue:92–117` mounts `PaletteCard` with **seventeen** bindings/handlers, every one of
which the constitution assigns elsewhere:

```
:expanded="pm.expandedId.value === palette.slug"     <-- expand, forbidden on the card body
@click="pm.toggleExpand(palette.slug)"               <-- expand, forbidden
@rename @edit-color @add-color @edit-tags            <-- inline rename/edit, forbidden
@save @delete @fork @export @versions @flag          <-- lifecycle/export, inspector's job
@feature @admin-delete @set-visibility @vote
```

There is **no inspector region anywhere in the file.** Selection is expressed as `expandedId`
inside the card — the exact "expand" the law names first. The constitution's mobile order for
Browse is *"search, results, selected inspector"*; the third term does not exist.

The same section requires the seat to be `<button type="button" aria-pressed>`; the live
accessibility snapshot for `/#/browse` shows the entity as
`article "Palette: Featured One" [cursor=pointer]` — a cursor-bearing article, i.e. the clickable
`role=article` the sentence forbids by name.

**Cure.** Build the inspector the composition row already specifies, move the fourteen action
handlers into it, and reduce the card to identity + specimen + one pressed seat. Trimming handlers
one at a time inside the card cannot reach this; the missing region is the design.

---

### D-04 · MAJOR — the error plate asserts one cause for every failure, and the record shows it is the wrong one

`BrowsePane.vue:62–66` renders a fixed sentence:

```
message="The commons is unreachable."
:detail="pm.browseError.value"           // always the literal "Failed to load palettes"
```

`browseError` has exactly one value in the entire composable (`useBrowsePalettes.ts:79`). So a
CORS refusal, a 500, a rate-limit, a client parse bug and a dev misconfiguration all render the
identical network-blame sentence.

**It is measurably wrong in two independent captures.**

1. **The audit record.** `REPORT.json`, `/#/browse`, both desktop matrices:
   `consoleWarnings: ["Failed to load remote palettes: SyntaxError: The string did not match the expected pattern."]`
   — a *client-side* `SyntaxError`, with `failedRequests: []` and `pageErrors: []`. Nothing was
   unreachable. The pane told the user the commons was down when the bug was in the page.

2. **Live.** The true cause is `DevMisconfigError`, and the app has a designed, loud state for it.
   The Dock renders `alert: "dev misconfigured — run `npm run dev`"` **in the same viewport, at the
   same instant**, while BrowsePane renders "The commons is unreachable." Two surfaces, one fact,
   contradictory diagnoses.

`apiAvailability` is a public reactive cell (`availability.ts:49`) exported through
`useApiClient()` (`useApiClient.ts:41`). Consumer census across `demo/`:

```
$ grep -rn "apiAvailability|DevMisconfigError" demo/ | grep -v transport/availability.ts
demo/shell/dock/DockStatusLamp.vue      demo/shell/dock/status-lamp.ts
demo/platform/transport/useApiClient.ts
```

BrowsePane is not on the list. The one surface whose entire body depends on API reachability is
the one surface that does not read the reachability cell.

**Cure.** The error plate reads `apiAvailability` and branches on the closed union
(`unknown | available | unavailable | misconfigured`), each arm with its own true sentence and its
own correct affordance. Not a longer string — a state discrimination.

---

### D-05 · MAJOR — Retry is a dead affordance in exactly the state it is offered

`availability.ts:188–191`:

```ts
export function assertApiAttemptAllowed(): void {
    if (apiAvailability.value === "misconfigured") {
        throw new DevMisconfigError();
    }
```

Unconditional. No cooldown arm (the 30 s `RETRY_COOLDOWN_MS` applies only to `unavailable`).
While latched `misconfigured`, Retry can never issue a request.

**Measured.** Live probe counting every request whose URL contains `/palettes`:

```
networkReqsBeforeRetry: 8      networkReqsAfterRetry: 8
```

All eight are Vite module URLs (`/@fs/.../BrowsePane.vue?t=…`). **Zero API requests before or
after the click.** The button is inert by construction, and — per D-01 — clicking it destroys the
pane.

`PROPORTION-AUDIT.md §5.6`: *"Add affordance when the surviving action/state is otherwise
undiscoverable"* — the converse holds. An action that provably cannot succeed is not an
affordance; it is furniture that lies.

---

### D-06 · MAJOR — the empty plate lies when the wall is merely filtered

`BrowsePane.vue:83–86`:

```
:empty="displayedBrowse.length === 0"
empty-text="No published palettes here yet."
empty-hint="Publish one from My Palettes and start the wall."
```

`displayedBrowse` (`:339–349`) is `pm.filteredBrowse` — a client-side text filter
(`useBrowsePalettes.ts:43`) — further narrowed by the pane-local colour filter. There are **four**
independent narrowing dimensions (search text, tier, tags, colour) and **one** empty sentence,
which asserts a fact about the server.

Type `zzz` and the commons — which may hold thousands of palettes — announces *"No published
palettes here yet."* That is a false statement of world-state presented as a diagnosis.

Worse, the recovery signal is absent too. `SearchFilterBar.vue:186–192`:

```ts
const activeFilterCount = computed(() => {
    let count = 0;
    if (tier) count++;
    count += selectedTags.length;
    if (colorSearchActive.value) count++;
    return count;                       // search TEXT is not counted
});
```

So the text-filtered case shows an empty wall, a false sentence, **and no filter badge**. The only
"Clear all filters" control is buried inside the `⋮` popover (`SearchFilterBar.vue:110–119`), and
`PaletteCardGrid`'s `#emptyAction` slot — which exists (`PaletteCardGrid.vue:27–29`) — is left
unused by BrowsePane, so the empty plate carries no action at all while the *error* plate does.

The family mechanism is shared: `PalettesPane.vue:77–80` has the identical shape
(`"No saved palettes yet."` under a live search). One mechanism, two sites.

**Reproduction (mechanism, live).** The Browse instance needs a reachable API to demonstrate;
the identical mechanism reproduces today on `/#/palettes` (1 saved palette present) by typing
`zzz` into "Search your palettes…" — the plate reads "No saved palettes yet."

**Cure.** Three species, not two: `no-results-for-this-filter` (with the filter summary and a
clear-filters action on the plate) is a distinct state from `true-empty`, exactly as
`EmptyState.vue`'s own header already argues that `loading ≠ empty, error ≠ empty`. The third
distinction was simply never made.

---

### D-07 · MAJOR — the load-more failure state does not exist

`useBrowsePalettes.ts:109–111`:

```ts
} catch (e) {
    console.warn("Failed to load more palettes:", e);
}
```

No `browseError`, no flag, no surface. `BrowsePane.vue:125–144` therefore renders: two skeleton
plates appear, silently vanish, and "More from the commons" returns unchanged. The user can press
it forever and be told nothing. `PROPORTION-AUDIT.md` PR-08 — *"Pending/failure/export/recovery
truth only transient → **ADD-AFFORDANCE** … Persistent entity status/recovery"* — is a register
row this pane's paging path does not satisfy at all.

---

### D-08 · MAJOR — a failed sort ships a stale wall under the new sort's label

`onSortChange` (`useBrowsePalettes.ts:117–121`) sets `sortMode.value` **before** awaiting
`loadRemotePalettes(true)`. On failure (`:78–82`) `browseError` is set but `remotePalettes` is
**not** cleared. BrowsePane's error branch (`:62`) requires `displayedBrowse.length === 0`, so with
a populated wall the error is skipped entirely and the `v-else` wall renders.

Result: the Sort radio reads "Most Popular", the wall is still in "Newest" order, and nothing
anywhere says the sort failed. `VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending,
withdrawn and disabled states are never color-only. Role, accessible name, state/value and
associated error/status are explicit."* Here the failed state is not even colour — it is nothing.

**Reproduction:** requires a reachable API that then fails a sort request; labelled a
**code-proven hypothesis** on the runtime arm, with the branch conditions cited above as the proof
of shape.

---

### D-09 · MAJOR — the sort-pending state is opacity-only and still fully interactive

`BrowsePane.vue:87–90`:

```
:grid-class="'transition-opacity duration-fast ' + (pm.sortLoading.value ? 'opacity-50' : '')"
```

That is the entire pending design. **Measured on the live page:** `[aria-busy]` count `0`;
`[aria-live]` regions `0` (whole document). No `pointer-events-none`, so a 50 %-dimmed wall
accepts clicks, votes, deletes and expands against rows that are about to be replaced.

`§4.1` again: never colour-only. A dim is colour-only.

*Negative note, recorded so it is not re-litigated:* I suspected `duration-fast` was a dead
utility per `demo/DESIGN.md:250`. It is not. Live probe: injecting `class="transition-opacity
duration-fast"` yields `transitionDuration: "0.2s"`, `transitionProperty: "opacity"`. The token
resolves. **Not a finding.**

---

### D-10 · MAJOR — the two loading states carry no accessible name

`BrowsePane.vue:44–48` and `:125–131`:

```
<div v-if="pm.browsing.value" key="developing" class="grid grid-cols-1 gap-3" aria-label="Loading palettes">
<div v-if="pm.loadingMore.value" class="grid grid-cols-1 gap-3" aria-label="Loading more palettes">
```

`aria-label` on a bare `<div>` resolves to `role=generic`, which is in ARIA 1.2's
*name-prohibited* set (§5.2.8.4). The label is dropped. Confirmed by construction and consistent
with the measured `aria-busy: 0` / `aria-live: []` — the loading states are inaudible.

Note the asymmetry the pane already knows about: `EmptyState.vue` gives the error plate
`role="alert"` and the empty plate `role="status"`. Only the loading plates — authored inline in
BrowsePane rather than in the shared atom — got no role. The god-module boundary is drawn in the
wrong place: two of the four states live in a shared, correctly-roled atom, two live as raw divs
in the pane.

---

### D-11 · MAJOR — the search placeholder is hard-clipped on mobile, in both directions, with no ellipsis

`BrowsePane.vue:10–27` puts `SearchFilterBar` in `SearchBar`'s default slot, so the `⋮` trigger
becomes an in-field end-cap. The field reserves no inline padding for it.

| capture | rendered placeholder | authored string |
|---|---|---|
| `shots/safari-mobile-light/browse.png` | `Search the common` | `Search the commons...` |
| `shots/safari-mobile-dark/browse.png` | `Search the common` | `Search the commons...` |
| `shots/rtl-mobile/browse.png` | `earch the commons` | `Search the commons...` |

LTR loses the tail; RTL — where the trigger flips to the inline-start — loses the **head letter**.
Neither shows an ellipsis; both are hard cuts mid-token. The desktop captures are clean, so this
is purely the narrow arm. Compare the twin `Search your palettes...` in the same viewport, which
uses no slot and renders whole — proof the clip is caused by the slotted trigger, not the string
length.

---

### D-12 · MAJOR — English prose is not direction-isolated; RTL relocates terminal punctuation

`shots/rtl-mobile/browse.png`, read directly:

- header description renders **`.Discover palettes from the community`**
- error headline renders **`The commons` / `.is unreachable`**

The full stops have migrated to the visual left because the paragraph's base direction is RTL and
a sentence-final `.` is a bidi-neutral. `VISUAL-CONSTITUTION.md §6.1` assigns chrome and layout to
document direction but requires content that carries declared meaning to be isolated; §5.2's last
row spells out the isolation idiom. BrowsePane's authored strings — `"Discover palettes from the
community."` (`:3`), `"The commons is unreachable."` (`:65`), `"No published palettes here yet."`
(`:85`) — get none.

This is not a translation gap (the tool is single-locale by design, U-F58). It is that the RTL
readiness plumbing landed at the `dir` attribute and stopped before the prose.

---

### D-13 · MAJOR — the empty/error plate floats in the top third of a fixed-height card

`VISUAL-CONSTITUTION.md §3.1`, Browse row: *"primary empty invitation **content-hugs**"*.
`PROPORTION-AUDIT.md` PR-04: *"Empty/equal companion Cards and nested housing → **REMOVE** …
Collapse absent support."*

The Card is `h-full` (`:2`); the inner column is `flex flex-col gap-3 min-h-0` (`:4`) with no
grow on the state region. The plate therefore top-aligns and the remainder is void.

**Measured, live at 1440 × 900:**

```
pane  rect: top 114.99  bottom 865.09   height 750.10
error rect: top 268.67  bottom 481.22   height 212.55
dead space below the plate = 865.09 − 481.22 = 383.87 px  (51.2 % of the card's height)
```

Visible in every one of the four Safari matrices. A container that reserves 750 px to present
213 px of content is the opposite of a content-hug — the constitution's own word for the
requirement.

---

### D-14 · MAJOR — `.search-seated` is a per-instance override of a glass-ui root, replicated across three consumers

Owner edict 5: *style at the shadcn/glass root component level, never per-instance overrides.*
Edict 4: *variants/primitives belong in glass-ui.*

`BrowsePane.vue:12` applies `class="search-seated"` to `SearchBar` from `@mkbabb/glass-ui/search`.
The rule (`demo/styles/utils.css:132–155`) overrides the producer's background, backdrop-filter,
border, box-shadow, max-width **and** the descendant `.input-bar-field` font-family. The file's own
comment concedes the shape:

> INTERIM DEMO SEAT — a consumer opt-in on the producer recipe (**unlayered, so it wins over the
> `@layer components` recipe by layer order**) … BOOKED SWAP … dies onto glass-ui's P3 seated
> field-chrome rung — ASK-D (`variant="seated"`)

Site census: `BrowsePane.vue:12`, `PalettesPane.vue:35`, `admin/AdminPane.vue:14`. **Three**
consumers of the same hand-rolled chrome is the definition of a producer variant that was never
raised. That the swap is *booked* is provenance, not compliance; the ask has been open across
tranches T→V while the override kept shipping and kept spreading. It also deliberately exploits
cascade-layer ordering to beat the producer — the mechanism edict 5 exists to forbid.

---

### D-15 · MAJOR — "Find by Color" is a silent partial search, with a magic radius and a silent data-dependent exclusion

`BrowsePane.vue:336–355`:

```ts
const radius = 0.15;
return palettes.filter((p: any) => {
    const oklabColors = p.oklabColors as {...}[] | undefined;
    if (!oklabColors || oklabColors.length === 0) return false;
    return oklabColors.some((c) => Math.hypot(c.L - L, c.a - a, c.b - b) <= radius);
});
```

with the comment at `:353–354`:

> API also supports server-side via colorL/colorA/colorB params, but client-side is instant

Three defects in one block.

1. **Scope lie.** `listPalettes` genuinely accepts `colorL`, `colorA`, `colorB`, `colorRadius`
   (`demo/palettes/api/palettes.ts:49–52`). The pane declines them and filters only the ≤50 rows
   already loaded. The user believes they searched the commons; they searched one page of it. The
   load-more button meanwhile still keys on `pm.hasMore` (`:133`), so paging fetches the *next
   unfiltered page* and then colour-filters it — an arbitrary, unexplained subset. Owner edict 2
   forbids masking fallbacks; this is a masking fallback chosen over a working path that exists.

2. **Magic radius.** `0.15` is a bare literal with no token, no legend, no user control. In OKLab
   (L ∈ [0,1], a/b typically within ±0.4) a 0.15 sphere is an enormous neighbourhood — for a
   mid-chroma query it admits most of colour space. "Find by Color" is therefore not tuned; it is
   unparameterised.

3. **Silent exclusion.** `if (!oklabColors …) return false` drops every palette whose
   `oklabColors` is absent — the field is optional on the type (`types.ts:32`) and is a migration
   field server-side (`api/src/platform/migrations/check.ts:46`). Those palettes vanish from
   results with no explanation, and the wall then shows D-06's false "No published palettes here
   yet."

Also note the `(p: any)` cast is unnecessary — `oklabColors` is declared on `Palette` — so it
defeats type checking for nothing.

---

### D-16 · MINOR — `cardRefs` is a deep-`reactive` map of component instances that never releases an entry

`BrowsePane.vue:94` and `:209`:

```ts
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
...
:ref="(el: any) => el && (cardRefs[palette.slug] = el)"
```

The `el &&` guard is the whole bug: Vue calls the function ref with `null` on unmount, and the
guard *skips* that call, so nothing is ever deleted. Filter churn and paging past the 50-cap
therefore accumulate detached component instances for the lifetime of the pane.

Separately, `reactive` (not `shallowReactive`, not `markRaw`) means every read of
`cardRefs[slug]` returns a reactive proxy **wrapping a component public instance** — Vue will
track property access inside the component's own instance graph from whatever effect is running.
The idiom for a template-ref collection is a plain `Map` or `shallowReactive`; the repo has zero
`markRaw`/`shallowReactive` under `demo/palettes/`.

Runtime consequence labelled a **hypothesis** — reproducing accumulation needs a reachable API to
populate and page the wall. The code shape is confirmed.

---

### D-17 · MINOR — transient card feedback is the only truth for save / delete / visibility / fork outcomes

`:226–250` and `:262–265` route every verdict through `cardRefs[slug].showFeedback(...)`, a
per-card flourish. `VISUAL-CONSTITUTION.md §5`: *"Persistent operation state stays with the
entity/workspace. **A transient flourish may celebrate success but never carries the only
truth.**"* Here it carries all of it — and if the card has unmounted (filter change, sort, page
turn) between the request and its verdict, the optional-chain at `:249` swallows the failure
entirely. Same PR-08 family as D-07/D-08; the cure is the same inspector D-03 is missing.

---

### D-18 · MINOR — the route has no H1; the pane identity is `<h3>` with nothing above it

`REPORT.json`, `/#/browse`, all four matrices: `"h1": 0`, `"main": 1`. Live accessibility
snapshot: `heading "Browse" [level=3]`. `VISUAL-CONSTITUTION.md §4.1`: *"Each route has one H1 and
exactly one stable main landmark, owned by the shell."* §4's type matrix assigns *route H1 or
major argument* to `text-display`/Fraunces — which `PaneHeader` styles for
(`.pane-header-title { font-size: var(--type-display-1) }`) while emitting `h3`. The pane looks
like an H1 and announces as an H3 under no H2 under no H1.

Family: `PaneHeader.vue` (9 consumers). Cure belongs at the shell + that atom, not in BrowsePane;
recorded here because BrowsePane is a site.

---

### D-19 · MINOR — two skeleton counts, both bare literals, neither related to the payload

`SKELETON_COUNT = 4` (`:207`) for the first load, `v-for="i in 2"` (`:130`) for the continuation.
Two hard-coded plate counts for one grammar, one of them not even named. `BROWSE_PAGE_SIZE` is 50,
so neither count previews the incoming volume — the skeleton is decoration, not a request-bound
preview. `VISUAL-CONSTITUTION.md §7`: *"Request-bound skeletons exist only while real work is in
flight."* They are request-bound; they are not request-*shaped*.

---

### D-20 · INFO — forced-colors is unverified, and the pane ships no treatment

`shots/forced-colors-desktop/browse.png` is visually indistinguishable from
`shots/safari-desktop-light/browse.png` except for a slightly muted ambient field: the glass cards
are still translucent, the pastel `Palettes` gradient text still renders, the cartoon shadows
still paint. WebKit does not honour Playwright's `forcedColors` emulation, so **that matrix proves
nothing** and should not be cited as a pass.

Repo-wide there are 9 `forced-colors` hits, all in `demo/styles/foundation.css`,
`demo/styles/focus-ring.css` and one gradient editor. **Zero** under `demo/palettes/`.
`VISUAL-CONSTITUTION.md §4.1` requires focus to stay distinct from selection *"in both schemes,
forced colors and reduced transparency"*, and §4.2 requires a nonzero selected-state delta in
forced colors. Neither is demonstrated for this pane's selection (`expanded`) state — which per
D-03 is expressed as card expansion, i.e. geometry only.

Classed INFO because the evidence is a *gap*, not a defect sighting. It becomes a finding the
moment a real WHCM capture exists.

---

## 3. Negative proofs — what I attacked and could not break

Recorded so no later seat re-litigates these, and so the DEFECTIVE verdict is not read as
"everything is wrong".

| Claim I tested | Result |
|---|---|
| `duration-fast` is a dead utility (per `DESIGN.md:250`) | **SOUND.** Live probe: `transitionDuration "0.2s"`, `transitionProperty "opacity"`. `--duration-fast` = `0.2s`, `--duration-normal` = `0.3s` on `:root`. |
| `vj-morph`'s `max-height` leg animates layout every frame | **SOUND.** `--vj-morph-collapse` is unset here, so `max-height` resolves `none → none` and the leg is inert. No layout-animating property runs. |
| A fourth motion family / ad-hoc keyframes | **SOUND.** `vj-morph` is one of the three sanctioned families (`animations.css:56–79`); BrowsePane defines no local keyframes and deletes none. |
| `prefers-reduced-motion` unhandled | **SOUND.** Global guard at `animations.css:184–193` neutralises all three families; the overlay carve-out at `:202–212` is deliberate and documented. |
| `verbatimModuleSyntax` violation | **SOUND.** `:197` `import type { Palette, Tag }`; every other import is value-only. |
| Horizontal overflow | **SOUND.** `overflowX: 0` for `/#/browse` in all four Safari matrices and in RTL desktop + RTL mobile. |
| Keyboard reachability 7/12 is a defect | **NOT BORN-RED**, per MT-F022. The gap is roving tabindex, which is correct behaviour; a two-engine proof would be required and I did not run one. |
| The 4 small tap targets on `/#/browse` | **NOT BROWSEPANE'S.** `REPORT.json` names them: one unlabelled `input` 160×23 and three 22×22 buttons `"Switch to slug"`, `"Generate new slug"`, `"Cancel"` — all in the My Palettes companion's slug editor. BrowsePane's own `⋮` trigger is 32×32, above the WCAG 2.2 SC 2.5.8 minimum of 24×24. |
| `EmptyState` conflates loading/empty/error | **SOUND** for those three — the atom separates them with `role="alert"` vs `role="status"` and distinct registers. The *fourth* species (filtered-empty) is the gap; see D-06. |

---

## 4. Family grouping

| Family | Members | One cure |
|---|---|---|
| **Animation clock owns DOM presence** | D-01 | Stop animating branch identity on the state container |
| **The composition row was never built** | D-02, D-03, D-13 | Browse workspace chassis + the 64/33 field-plus-inspector split; entity Cards only |
| **Failure/pending truth is absent or false** | D-04, D-05, D-06, D-07, D-08, D-09, D-10, D-17 | One durable status region driven by a discriminated state union (incl. `apiAvailability`), replacing five ad-hoc surfaces |
| **Narrow + RTL arms unfinished** | D-11, D-12 | Reserve the trigger's inline space in the producer; isolate authored prose |
| **Producer boundary crossed** | D-14 | Raise `variant="seated"` in glass-ui; delete the three-site override |
| **Search semantics unowned** | D-15 | Use the server colour params; token the radius; state the scope |
| **Local hygiene** | D-16, D-18, D-19, D-20 | — |

---

## 5. Strongest defect

**D-01.** Everything else is a design that is wrong. D-01 is a design that *destroys the product
surface on a single click of its own recovery button*, in the exact state all sixty audit captures
were taken in, and does not recover. It is reproduced twice, measured to the 25 ms, screenshotted,
and it violates `VISUAL-CONSTITUTION.md §6`'s "no full-slab remount hole" by name.

---

*Written by the CHALLENGE-D seat. Read-only against the tree; no source edits land from this
formation. Evidence images in `./evidence/`.*
