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

---
---

# CHALLENGE-D · ROUND 2 — the populated arm

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was explicitly spawned with. Declared, not inherited.

## R2.0 · Why a second round, and what it changes

Round 1 above was conducted entirely against `http://localhost:9000`. So were all sixty captures in
`audit/visual/`. **Every one of them is the error arm.** All ten Browse matrices
(`safari-{desktop,mobile}-{light,dark}`, `forced-colors`, `rtl-desktop`, `rtl-mobile`, `zoom-200`,
`keyboard-focus`, `reduced-motion`) render "The commons is unreachable. / Failed to load palettes /
Retry". Cause, from the live console:

```
[WARNING] Failed to load remote palettes: DevMisconfigError: value.js dev is MISCONFIGURED:
http://localhost:9000 has no VITE_API_URL and is targeting the cross-origin production API
(https://api.color.babb.dev), whose CORS allow-list excludes localhost
    at assertApiAttemptAllowed (demo/platform/transport/availability.ts:138:9)
```

Consequence for the record: **`REPORT.md`'s `/#/browse` row measures an error page, not a palette
wall.** `text 280`, `smallTapTargets 4`, `namelessButtons 0` are all error-arm figures. Round 1
inherited that limit and said so honestly in two places — including its own open question:

> "Keyboard reachability 7/12 is a defect → **NOT BORN-RED**, per MT-F022. The gap is roving
> tabindex, which is correct behaviour; a two-engine proof would be required and I did not run one."

Round 2 closes the gap read-only, without touching `scripts/dev/dev.sh` or any source: a 20-line
CORS-permissive proxy on `127.0.0.1:9099` in front of the live commons, plus a **second** vite on
`:9010` with `VITE_API_URL` set. Same HEAD (`c654824e`), real data:

```
$ curl -s "https://api.color.babb.dev/palettes?limit=50" | ...
rows 10   hasMore False
empty oklabColors: 5 of 10
color counts [(1, 4), (3, 1), (4, 1), (5, 2), (6, 1), (7, 1)]
```

New artifacts, all under this directory:

| file | what |
|---|---|
| `shots/populated-desktop-{light,dark}.png` | the wall, 1440×900 DPR2, both schemes — **first rendered evidence of this component's primary state** |
| `shots/populated-mobile-{light,dark}.png` | the wall, iPhone 14 |
| `shots/filtered-empty-desktop-light.png` | search `zzzzqqqq` against a 10-palette commons |
| `shots/TELEMETRY.json` | geometry / state per matrix |
| `shots/STATES-2ENGINE.json` | WebKit **and** Chromium — the MT-F022 proof |

**Verdict unchanged: DEFECTIVE.** Round 2 adds nine findings, one of them a BLOCKER that only the
populated arm can expose, and it **overturns one row of Round 1's negative-proof table**.

---

## R2.1 · BLOCKER — the palette seat is pointer-only: 0 of 10 reachable by keyboard, in both engines

This is Round 1's D-03 ("no inspector, so the card is the seven-mode omnibus") measured at the DOM,
and it is worse than reasoned: the omnibus is not merely overloaded, it is **inoperable without a
mouse**.

`shots/STATES-2ENGINE.json` — identical in WebKit and Chromium:

```json
"cardCount": 10, "cardFocusable": 0, "cardRoles": ["article"],
"cardCursor": ["pointer"], "ariaPressed": 0, "tabStops": 22, "tabHitArticle": 0
```

Thirty consecutive `Tab` presses in each engine never land on a palette. The 22 tab stops are
1 search input + 1 Filters + 10 vote + 10 menu — **zero seats for the ten palettes themselves**.
The card root's live computed state is `tabIndex: -1`, `cursor: pointer`, `role: article`, with a
click handler and no keyboard path.

**There is no roving tabindex.** `demo/palettes/browser/card/PaletteCard/PaletteCard.vue:5-26` is a
bare `div` with `@click="$emit('click')"`; the grid has no `keydown` handler, no
`aria-activedescendant`, and no `tabindex="0"` anywhere. Round 1's charitable reading is therefore
**overturned** — with the two-engine proof MT-F022 demands.

Law, `VISUAL-CONSTITUTION.md:102` (§5), verbatim:

> "A palette card is a bounded entity article, **not a clickable `role=article`** … **One native
> named `<button type="button">`** spans its specimen/identity region and expresses inspector
> selection only through `aria-pressed`."

Shipped: clickable `role="article"`, `aria-pressed` count **0**. Also WCAG 2.1.1 (Keyboard) and
4.1.2 (Name, Role, Value).

The producer comment encodes the premise that caused it (`PaletteCard.vue:2-4`):

> "button semantics on the card are omitted because inner interactive controls must be reachable —
> using article + click is the correct pattern for a card container that also houses nested
> interactive elements."

A false dichotomy the constitution already answers: the root stays noninteractive and a **child**
button spans the specimen/identity region, as a sibling of the vote/menu controls. The shipped
third option — clickable, non-focusable div — delivers neither. BrowsePane elects it at `:97`
(`:expanded=…`) and `:102` (`@click="pm.toggleExpand(…)"`).

**Cure:** unchanged from Round 1 D-03 (field + selected inspector), with the seat made explicit:
one named `<button type="button" aria-pressed>` spanning strip+name; pressed ⇔ this palette is the
inspector identity; `expandedId`/`toggleExpand` deleted.

---

## R2.2 · MAJOR — in dark mode the specimen is invisible against its own stage: 1.41 : 1

Invisible to Round 1, because the specimen never rendered.

The strip is the protagonist — `h-10`, 40px of a 100px card, full 458px bleed. Four of the ten live
palettes carry a single near-black color, `lab(12.23 2.53 0.5)`.

Pixel-sampled from the real captures (`shots/populated-desktop-*.png`, DPR2, x=900):

| scheme | strip px | card-body px | contrast |
|---|---|---|---|
| dark | `rgb(36,31,31)` | `rgb(66,55,47)` | **1.41 : 1** |
| light | `rgb(36,31,31)` | `rgb(233,225,217)` | 12.58 : 1 |

An 8.9× legibility swing between schemes on the one element that *is* the content. WCAG 1.4.11
requires 3:1 for graphics essential to understanding. In `populated-desktop-dark.png` the top four
cards read as empty dark rectangles with a name floating in them.

`§2` gives the specimen well an "opaque/quiet neutral stage; the specimen supplies color" — but a
*dark* stage cannot hold a dark specimen, and no design exists for that case: no plate, no inset
hairline, no scheme-aware stage.

**Cure:** the specimen stage is scheme-*inverted*, not scheme-*following* — a light plate under the
strip in both schemes, or a producer-owned specimen-well tier with a guaranteed ≥3:1 floor against
any member color.

---

## R2.3 · MAJOR — the entity card is a triple-stacked cartoon caster; the route paints four caster layers

`VISUAL-CONSTITUTION.md:54` fixes the tuple exactly — `size="sm", material="content", tier="quiet",
surface="opaque", **shadow=false**, grain=false, specular="off"` — and `§7` adds: "matte specimen
slips inside a glass workspace, **not cartoon casters stacked within casters**."

Live computed style of the card root:

```
class     = "group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer"
role      = article
boxShadow = oklab(.28 .0168 .0249/.32) -3px 3px 0 0,
            oklab(.28 .0168 .0249/.26) -5px 5px 0 0,
            oklab(.28 .0168 .0249/.18) -7px 7px 0 0
```

Three stacked zero-blur casters on a class literally named `cartoon-surface` — the prohibition
quoted word for word. It is also not a glass-ui `Card` at all; it is a hand-styled `div`. The pane
it sits in adds its own hard caster (`8px 8px 0 0, α .8`), so the route paints **four** caster
layers. `PROPORTION-AUDIT.md` PR-05: "Dividers, caster shadows and corner marks repeat a boundary →
**REMOVE**."

This also supplies the forced-colors treatment Round 1's D-20 correctly declined to assert:
`box-shadow` is *not* adjusted in forced-colors, so in
`visual/shots/forced-colors-desktop/browse.png` the caster survives as a solid black slab hanging
off the pane's right/bottom edge while every other surface flattens. The caster is the one thing
that renders identically in WHCM and in normal light mode — which is precisely backwards.

---

## R2.4 · MAJOR — the sort-pending arm drops identity text from 13.52 : 1 to 3.11 : 1

Round 1's D-09 named the mechanism ("opacity-only and still fully interactive"). Here is the number.

`BrowsePane.vue:87-90` composites the whole grid subtree at `opacity .5`. Live measurement:
palette-name ink `rgb(28,25,23)` on card `rgb(233,225,217)` is **13.52:1** at rest; composited at
`.5` over the pane fill `rgba(238,231,222,.169)` it is **3.11:1** — below the 4.5:1 AA floor for the
route's identity text.

`§4.1`: "Text, focus, boundaries and state meet their rendered contrast on the actual material
tier; **a token name is not evidence**." The pending state fails its own material.

Credit where due, and confirming Round 1's negative proof: `duration-fast` resolves to a real
`0.2s`. The defect is not untokenized motion — it is an *undesigned* state expressed in the alpha
channel.

---

## R2.5 · MAJOR — no status region exists: filtering 10 results to 0 announces nothing

`shots/STATES-2ENGINE.json`: `"liveRegions": 0` in both engines. Zero `aria-live` nodes anywhere in
the Browse pane, across skeleton → wall → empty → error and every filter change.

`VISUAL-CONSTITUTION.md:114` (§5.1), row *"in-route filter, tab, selection, or pagination"*:
"announce **changed result count/state** through the owning status region". Browse has five
independent filters (query, sort, tier, tags, color) plus a pager and **no owning status region at
all**. There is also no visible result count anywhere — a "commons" whose size the user can never
learn.

This is the receptacle Round 1's D-04…D-10 family needs, named precisely: not "better copy", but
one durable status region that R2.4's pending state, D-06's filtered-empty count, D-07's load-more
failure and D-08's stale-sort all report into.

---

## R2.6 · MAJOR — the route's primary control has no accessible name

```json
"searchNamed": false                                   // both engines
"nameless":   ["INPUT.input-bar-field rect=373x24.87"]
```

`placeholder="Search the commons..."` is not an accessible name, and this input is the **first** tab
stop inside the pane. `§4.1`: "Role, **accessible name**, state/value and associated error/status
are explicit."

Why the audit missed it: `REPORT.md:94`'s `namelessButtons` metric counts only `<button>`, so
`/#/browse` scores 0 while shipping a nameless `<input>`.

---

## R2.7 · MINOR — ten sub-24px vote targets on mobile, beside siblings twice their size

`shots/TELEMETRY.json`, iPhone 14, ten instances:

```
BUTTON.flex 38.63x23.59 name="0 votes, click to vote"
```

23.59px block size is below the 24px WCAG 2.5.8 floor, and each sits in the same cluster as a
`Palette menu` button roughly twice its size — two adjacent actions differing >2× in target.
`PROPORTION-AUDIT.md` PR-12.

**This extends Round 1's negative-proof row** "The 4 small tap targets on `/#/browse` → NOT
BROWSEPANE'S". That row is correct *for the error arm*. The populated arm adds **10** sub-24px
targets inside BrowsePane's own field, so `REPORT.md`'s `smallTapTargets: 4` understates this route
by ten.

Same cluster, related: the row reads `1  ⑂2  ♡0  ⋯` — a color-count badge (data), a fork count
(data), a vote control (action) and a menu (action), at identical weight and spacing. `§5 law 5`:
"A small icon/mark is either data, status, labeled action, drag affordance, focus/selection register
or removed."

---

## R2.8 · MINOR — `.pane-scroll-fade` promises a fade the CSS never implements

`getComputedStyle(pane).maskImage === "none"` (and `-webkit-mask-image: none`). The rule
(`PaneHeader.vue:44-47`) sets only `contain` and `scroll-timeline`. Consequence, visible at the
bottom of both `populated-desktop-*.png`: the sixth card is sliced through its color strip by a hard
horizontal cut, which reads as a rendering fault rather than a scroll boundary.

A class whose name asserts an affordance it does not deliver is legacy naming (owner edict 2) and,
because Round 1's D-13 showed the same host also stretches the empty plate, the `h-full` scroll host
is the shared cause of both.

---

## R2.9 · MINOR — two import paths to the same design system, in one file

```
BrowsePane.vue:180  import { Card }      from "../ui/card";
BrowsePane.vue:181  import { Button }    from "../ui/button";
BrowsePane.vue:195  import { SearchBar } from "@mkbabb/glass-ui/search";
```

`demo/ui/card/index.ts` and `demo/ui/button/index.ts` are each a **single line** re-exporting from
`@mkbabb/glass-ui`. Census: **18 of the 19** `demo/ui/*` barrels are pure one-line re-exports.
Owner edict 2 (no aliases / shims / dual paths) and edict 4 (glass-ui is the design system, not
`demo/ui/`). Family defect; BrowsePane is a site, and the same file demonstrates both halves of the
dual path.

---

## R2.10 · MINOR — `availableTags` masks a contract violation client-side

`BrowsePane.vue:215-220` coerces `Tag[] | Record<string, Tag>` with `Object.values`, and the comment
states why: the declared type is `Tag[]` "but the `/colors/tags` read **can resolve an object-shaped
payload** at runtime". Owner edict 2 bans masking fallbacks by name. The payload shape is the
defect; the client-side widening hides it from every future reader and from the API's own tests.

---

## R2.11 · Round 1's D-01 is confirmed from the opposite direction

Round 1's BLOCKER (one Retry click permanently blanks the pane, via `mode="out-in"` racing a
synchronous throw) is independently supported by the populated arm: `mode="out-in"` unmounts the
leaving branch before the entering one mounts, and the only height reserve — `min-h-[120px]` — lives
*on* `PaletteCardGrid`, which is absent during the leave. So the container has no floor at exactly
the moment it is empty. The state container is `<div class="grid gap-3 pb-3">` (`:29`) with no
reserve of its own.

I did not re-measure the blank window (Round 1 measured it to 25 ms, twice, with screenshots); I
record the structural corroboration and the missing reserve as the second half of the same cure.

---

## R2.12 · Negative proofs added by Round 2

Recorded so no later seat re-litigates them.

| Claim I tested | Result |
|---|---|
| Dark chrome carries **seed tint** (`§2`: "Seed tint is forbidden outside the ambient field…") | **REFUTED BY EXPERIMENT.** Loading `#/browse` in dark with a pink seed and with `oklch(60% 0.18 195)` yields byte-identical surfaces — pane `oklab(0.395241 0.00968 0.016528/.7536)`, card `oklab(0.345296 0.010372 0.017546)` in both. The warmth is a fixed neutral pole (OKLab C≈0.019, h≈59°) plus the ambient field reading through the pane's alpha. Hypothesis withdrawn. |
| Reduced motion leaves time-based animation running | **SOUND.** Under `reducedMotion:"reduce"`, both engines report only the six scroll-scrubbed `pane-header-*` animations (three per pane). Those are position-mapped scrubs, not motion, with the reasoning recorded at `PaneHeader.vue` ("A scroll SCRUB is position-mapped… so it needs no PRM gate"). |
| The `metal-shimmer-sweep` "Featured" badge runs unguarded | **PARTLY.** It is infinite (`iterations: null`, `duration: 5000`) with no pause control — `§6` wants ≤5s or a persistent still control — **but it is correctly PRM-gated**: absent under `reduce`. Owned by `PaletteCard`/`badge-atom`, not BrowsePane. Filed INFO. |
| Horizontal overflow in the populated arm | **SOUND.** `overflowX: 0` in all four populated matrices, matching Round 1's error-arm result and the RTL/zoom matrices. |
| The main landmark multiplies with two panes mounted | **SOUND.** `mains: 1` in every matrix; the shell owns it and neither pane nests another. |
| The load-more pager is exercised anywhere | **DEAD IN PRACTICE.** The live commons returns 10 rows with `hasMore: false` at `limit=50`, so "More from the commons" (`:132-144`) and its 2-plate skeleton have never rendered against real data. Round 1's D-07 (no load-more failure state) is therefore an *untested* surface as well as an incomplete one. |

---

## R2.13 · Round 2 additions to the family table

| Family (Round 1 §4) | Round 2 members | Effect on the cure |
|---|---|---|
| **The composition row was never built** (D-02, D-03, D-13) | **R2.1**, R2.3, R2.8 | The inspector is no longer only a proportion fix — it is the WCAG 2.1.1 cure. The entity Card's tuple (`shadow=false`) must land in the same wave. |
| **Failure/pending truth is absent or false** (D-04…D-10, D-17) | **R2.4**, **R2.5**, R2.6 | R2.5 names the missing receptacle: one status region the whole family reports into. |
| **Narrow + RTL arms unfinished** (D-11, D-12) | R2.7 | Adds ten sub-floor targets to the same narrow-arm wave. |
| **Producer boundary crossed** (D-14) | R2.9 | Same wave: retire the `demo/ui/*` re-export barrels alongside `.search-seated`. |
| **Local hygiene** (D-16, D-18…D-20) | R2.10 | — |
| **NEW — specimen legibility** | **R2.2** | No existing family. The specimen well needs a scheme-independent contrast floor; owner is the producer tier, sites are Browse + Library. |

---

## R2.14 · Strongest defect, after two rounds

Round 1 named **D-01** (Retry blanks the pane). I do not displace it — it is measured, reproduced
twice and violates `§6`'s "no full-slab remount hole" by name.

But D-01 is reachable only from an already-broken state. **R2.1 is the defect the product ships on a
good day**: with the commons healthy and ten palettes on the wall, a keyboard user cannot open a
single one of them, in either engine, and the constitution forbids the exact construction that
causes it in a sentence that reads like it was written after seeing this file. Ranked together:
D-01 is the sharper failure; R2.1 is the larger one.

Immediately behind them, and unique to the populated arm: `§3 law 2` — "Empty secondary content
occupies at most a narrow invitation tray (≤15% of the stage) or disappears. **It never receives
half the viewport**" — is violated at `paneSharePct: [50, 50]`, with the empty half showing
`EMPTY PLATE / No saved palettes yet.` beside a 1289px wall crushed into a 772px porthole.

---

## R2.15 · Reproduction environment

- HEAD `c654824e`, branch `tranche-u`. **No source modified.** Nothing written outside
  `docs/tranches/V/megatranche/audit/components/BrowsePane/`.
- Existing dev server `:9000` (web-only → `DevMisconfigError` arm) left untouched and still running.
- Read-only rig for the populated arm: CORS proxy `127.0.0.1:9099` → `api.color.babb.dev`; second
  vite `:9010` with `VITE_API_URL=http://127.0.0.1:9099`. Scratch processes only; no repo file, no
  `scripts/dev/dev.sh`, no `INBOX.md` touched.
- Probes: `playwright` `webkit` **and** `chromium`, 1440×900 DPR2 and iPhone 14, light / dark /
  reduced-motion / two seeds.

*Round 2 written by the CHALLENGE-D seat (Opus 5, `claude-opus-5[1m]`). Read-only against the tree;
no source edits land from this formation.*
