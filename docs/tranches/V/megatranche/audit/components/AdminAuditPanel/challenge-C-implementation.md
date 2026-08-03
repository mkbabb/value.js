# CHALLENGE-C — `AdminAuditPanel.vue` is improperly implemented

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier declared
at spawn. Seat declared, not inherited.

---

## Scope + method

| | |
|---|---|
| Subject | `demo/palettes/browser/admin/AdminAuditPanel.vue` (120 lines) |
| Composable | `demo/palettes/useAdminAudit.ts` (103 lines) |
| Transport | `demo/palettes/api/admin-audit.ts`, `demo/platform/transport/client.ts` |
| Siblings read | `AdminListItem.vue`, `AdminListSkeleton.vue`, `PaginationBar.vue`, `AdminFlaggedPanel.vue`, `AdminTagsPanel.vue`, `AdminNamesPanel.vue`, `EmptyState.vue`, `AdminPane.vue` |
| Repo HEAD | `e39da983` (branch `tranche-u`; the brief cited `c654824e`, three commits back — no change to any file in scope) |
| Probe artifacts | `docs/tranches/V/megatranche/audit/components/AdminAuditPanel/pi/` |

Three independent evidence channels, all reproducible:

1. **`@vue/compiler-sfc` render-function dump** — proves the template's conditional topology.
2. **A 10-case `@vue/test-utils` + jsdom mount suite** — `pi/probe.test.ts`, run with its own config,
   `10 passed`. Every `[C-n]` line quoted below is pasted verbatim from `pi/probe-output.log`.
   ```
   npx vitest run --config docs/tranches/V/megatranche/audit/components/AdminAuditPanel/pi/vitest.probe.config.ts
   ```
3. **Live WebKit/Chromium probes against `http://localhost:9000`** — real Tailwind cascade, real
   glass-ui, real accessibility tree. `pi/probe-live.mjs`, `pi/probe-aria.mjs`, `pi/probe-minwidth.mjs`.

**Verdict: DEFECTIVE.** 16 findings — 2 BLOCKER, 5 MAJOR, 5 MINOR, 4 INFO. Two of them are
*regressions of defects this repo already diagnosed, named, and cured elsewhere*, and both are
invisible to every existing gate for the same single reason: **`AdminAuditPanel` has never been
rendered with a single row — not in a unit test, not in an e2e spec, not in the visual audit
matrix, not in the live capture.** That is finding D-7, and it is the mechanism behind D-1 and D-2.

---

## The controlling fact: nothing has ever seen a row

- `grep -rln "useAdminAudit\|AdminAuditPanel" test/ demo/test/` → **empty**. Zero unit tests.
- `/#/admin/audit` is visited by exactly one spec, `e2e/smoke/admin/admin-walk.spec.ts:37-40`, under
  the `admin-auth` fixture — which answers *every* admin envelope EMPTY (its own header says so:
  `e2e/smoke/admin/fixtures/admin-populated.ts:5-7`).
- The POPULATED fixture *does* route the endpoint —
  `e2e/smoke/admin/fixtures/admin-populated.ts:170`:
  `if (url.includes("/admin/audit")) return json(paginated(AUDIT));` with 3 seeded entries
  (`:79-83`) — but **no spec that uses it ever navigates to `/#/admin/audit`**:
  ```
  $ grep -n "goto" e2e/smoke/admin/{admin-populated,a11y-authed-admin,o10d-admin-title-voice}.spec.ts
  admin-populated.spec.ts:19       page.goto("/#/admin/users")
  admin-populated.spec.ts:57       page.goto("/#/admin/names")
  admin-populated.spec.ts:98       page.goto("/#/admin/flagged")
  o10d-admin-title-voice.spec.ts:19 page.goto("/#/admin/flagged")
  a11y-authed-admin.spec.ts:28-30  users / names / flagged
  ```
  The `AUDIT` array is routed and never asserted. Dead fixture data.
- The visual audit matrix captured `/#/admin/audit` four times — all four with **zero rows**,
  because the capture is unauthenticated (see D-3 and the screenshot below).

So the entire row-rendering half of this component is unexercised by construction.

---

# BLOCKERS

## D-1 · BLOCKER — the entries row omits `min-w-0`; it blows a 320px track to 732px at mobile width

**This is a re-introduction of S.W5-12 / F-1, a defect this repo already diagnosed and cured.**

`AdminListItem.vue:5-11` carries the cure and the diagnosis verbatim:

> `min-w-0` on the ROW ITSELF — the row is a grid item, and its `min-width:auto` automatic minimum
> resolves to the flex row's min-content (the un-breakable nowrap spans), blowing the track to
> ~850px at 390. Zeroing it lets the inner `min-w-0` content column actually truncate.

`AdminAuditPanel.vue:59-63` hand-rolls the identical row and **drops `min-w-0`**:

| | root class string |
|---|---|
| `AdminListItem.vue:11` | `flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge **min-w-0**` |
| `AdminAuditPanel.vue:62` | `flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge transition-colors duration-fast hover:bg-accent/50` |

Identical prefix. The cure is gone. And the row satisfies every precondition of the pathology: its
parent is `grid gap-3 pb-3` (`:2`), and it contains two `shrink-0` nowrap spans — the action Badge
(`:67`) and the timestamp (`:70`).

**Reproduction** — `pi/probe-minwidth.mjs`, run against the live page at 390×844 so the real
Tailwind/glass cascade applies. Both row markups are injected verbatim into a 320px track (the
admin card's inner width at 390) with a realistic 82-char audit target:

```json
{ "trackWidth": 320,
  "auditRow":     { "w": 732.5, "scrollW": 730, "minW": "auto" },
  "listItemRow":  { "w": 304,   "scrollW": 302, "minW": "0px"  },
  "auditGridScrollW": 732,
  "itemGridScrollW":  304 }
```

**732.5px inside a 320px track — 412px of overflow.** The `truncate` at `:76` is inert, because
truncation can never engage while the row's own `min-width:auto` has already resolved the track to
min-content. `pi/minwidth-390.png` is the picture: the top row (audit markup) runs off the right
edge of the phone untruncated; the bottom row (`AdminListItem` markup) truncates cleanly.

Why the visual audit says `overflowX: 0` for `safari-mobile-*` `/#/admin/audit`
(`visual/REPORT.json`): the capture has zero rows. Nothing to overflow.

**Cure (transposition, not patch):** delete the hand-rolled row and render through
`AdminListItem` — the atom that already exists, already carries the cure, and is already the row
grammar `AdminListSkeleton` is shaped to shadow (`AdminListSkeleton.vue:2-6`). `AdminNamesPanel.vue:44`
already does exactly this. The audit row needs only `#content`; leave `#swatch`/`#actions` empty.
That kills D-1, D-10 and D-16 in one move, and it is the KISS answer: no new component, no new dir.

---

## D-2 · BLOCKER — the `v-for` sits OUTSIDE the `v-if` chain: loading and error render *on top of* a fully populated ledger

`AdminAuditPanel.vue:36-56` is a `v-if` / `v-else-if` / `v-else-if` chain (skeletons → error →
true-empty). `:59-80`, the entries `v-for`, is **a sibling of that chain with no `v-else`.**

Proof from the compiler, not from reading:

```
$ node -e '…compileTemplate(AdminAuditPanel.vue)…'
        : (_ctx.audit.entries.value.length === 0)
          ? … EmptyState "· ledger clear ·" …
          : _createCommentVNode("v-if", true),          ← chain ENDS here
    _createCommentVNode(" Entries — Ag-13: … "),
    (_openBlock(true), _createElementBlock(_Fragment, null,
       _renderList(_ctx.audit.entries.value, (entry) => { …  ← unconditional sibling
```

`AdminTagsPanel.vue:85` (`<div v-else class="flex flex-col gap-4">`) and `AdminNamesPanel.vue:43`
and `:93` (`<div v-else class="grid gap-2 min-w-0">`) all get this right. `AdminAuditPanel` and
`AdminFlaggedPanel.vue:44-48` do not — a two-member defect family.

**Reproduction** (`pi/probe.test.ts` C-1, C-2):

```
[C-1] loading=true -> skeletons=3 rows=2
[C-2] loadError set -> errorBanner=true rows=2 toolbarCount="2"
[C-2] rendered text: "2 entriesThe ledger is unreachable.user.deleteJul 4, 08:00 PM
                      spammer-42palette.featureJul 4, 09:00 PMsunset-riot"
```

Read that rendered string. The panel simultaneously asserts **"2 entries"**, **"The ledger is
unreachable."**, and then lists two audit entries as fact.

The component's own comment at `:40-41` states the doctrine it violates:

> W5-5 (F-2, the P0 case): error ≠ empty — **a dead backend never costumes as a clear ledger.**

The implementation inverts F-2 into something strictly worse than the bug F-2 cured. F-2's failure
mode was *a dead backend showing an empty ledger*. This failure mode is **a dead backend showing a
populated, authoritative, timestamped ledger** — on the one surface in the product whose entire
purpose is to be the trustworthy record of admin action. An auditor reading this panel during an
outage sees a complete history that is silently frozen at whatever moment the backend last answered.

Same for loading: 3 shadow rows stacked above 20 live rows, every refresh, every filter keystroke.

**Cure:** the chain's terminal branch must own the list — `<div v-else class="grid gap-2">` wrapping
the `v-for`, matching `AdminTagsPanel`/`AdminNamesPanel`. Relay the identical fix to
`AdminFlaggedPanel`.

---

# MAJOR

## D-3 · MAJOR — the no-token path returns silently, so the panel paints "· ledger clear ·"

`useAdminAudit.ts:48-50`:

```ts
async function loadAuditLog(opts: AuditLogOptions = {}) {
    const token = getToken();
    if (!token) return;          // ← loading stays false, loadError stays null
```

`entries` stays `[]`, `loadError` stays `null`, `loading` stays `false` — which drives the template
straight past the error branch (`:44`) into the **TRUE-empty specimen plate** (`:56`,
`eyebrow="· ledger clear ·"`). The F-2 costume, re-entered through the auth gate rather than the
network gate.

**Reproduction** (C-6):
```
[C-6] no token -> loading=false loadError=null entries=0 total=0
[C-6] panel text with no token: "0 entriesNo audit entries found."
```

**And it is already shipping in the captured evidence.** `visual/shots/safari-desktop-light/admin-audit.png`
— the dock reads **"Login"** (unauthenticated) while the panel below declares
**"0 entries · LEDGER CLEAR · No audit entries found."** All four matrices captured the same thing;
that is why the audit-log row shows `bodyTextLength: 259` and zero rows in `visual/REPORT.json`.

The other three states of the world are distinguishable and none of them is "the ledger is clear":
not-authenticated, request-in-flight, request-failed. The composable collapses the first into the
fourth-best answer.

**Cure:** the token guard must produce a state, not a silence — a `notAuthenticated` branch that
renders a sign-in plate. (A bare `loadError = "Not signed in"` would work but is the wrong register:
it is not a failure, it is a precondition.)

## D-4 · MAJOR — a 200 with the wrong shape makes `entries` `undefined` and crashes render, invisibly

`client.ts:155` — `adminRequest` ends `return res.json()` with **zero shape validation**.
`useAdminAudit.ts:60-63` assigns straight through:

```ts
const res = await getAuditLog(token, merged);
entries.value = res.data;      // undefined if the body isn't a PaginatedResponse
total.value = res.total;
loadError.value = null;        // ← and the panel is told everything is fine
```

Any 200 that is not the expected envelope — a proxy/CDN interstitial, an API version skew, a
`{ "data": null }` — sets `entries.value = undefined`. The template then evaluates
`audit.entries.value.length === 0` at `:56` and throws inside render.

**Reproduction** (C-8, `getAuditLog` mocked to resolve `{}`):
```
[C-8] after 200-with-{} -> entries=undefined total=undefined loadError=null
[C-8] render threw: Cannot read properties of undefined (reading 'length')
```

Note the second half: `loadError` is `null`. The designed error plate — the whole F-2 apparatus —
never fires, because from the composable's point of view the request *succeeded*. The user gets a
white pane and a console throw.

**Cure:** validate at the transport boundary, once, for the whole admin surface — a
`PaginatedResponse<T>` shape assertion in `adminRequest` (or a small `parsePaginated` in
`api/admin-audit.ts`) that throws an `ApiProblem`, so the existing error plate does its job. Not a
`?? []` at the callsite: that would mask a real backend break, which edict 2 forbids.

## D-5 · MAJOR — no request sequencing: a stale response overwrites a fresh one, and `loading` is cleared by the first finisher

`loadAuditLog` (`useAdminAudit.ts:48-71`) has no in-flight token, no sequence counter, no
`AbortController`. Three call sites can overlap freely:
`onMounted` (`AdminAuditPanel.vue:119`), the 300ms filter debounce (`:115`), the Refresh button
(`:30` — **never `:disabled`**), and `nextPage`/`prevPage` (`useAdminAudit.ts:73-85`, which gate on
`hasNext`/`hasPrev` but never on `loading`).

**Reproduction** (C-7 — page 2 requested, then page 3; page 3 lands first):
```
[C-7] after fresh(page3) lands: entries=[{"id":"off-40"}] loading=false
[C-7] after stale(page2) lands: entries=[{"id":"off-20"}] page=3
```

Two distinct defects in three lines of output:

1. **Last-writer-wins.** The pager reads "Page 3", the rows are page 2's. On an audit log — an
   ordered, offset-paginated record — this silently presents the wrong 20 rows as the wrong page.
2. **`loading` is a boolean where a count is required.** `finally { loading.value = false }` (`:68-70`)
   fires when the *first* request settles, so the shadow plate vanishes while another request is
   still outstanding. `loading=false` is printed above with `p1` still pending.

Reachable by hand: hold the Next button, or type in the target filter while a refresh is in flight.

**Cure:** a monotonic request id captured at call time; the response applies only if it is still the
newest (`if (seq !== latest) return`). Same guard clears `loading`. This is the idiom the constellation
already uses for latched transport (`availability.ts`); it belongs in the composable, not the panel.

## D-6 · MAJOR — the debounce timer outlives the component and writes into the shared singleton port

`AdminAuditPanel.vue:110-117`:

```ts
let filterTimeout: ReturnType<typeof setTimeout>;
watch([audit.actionFilter, audit.targetFilter], () => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
        audit.page.value = 1;
        audit.loadAuditLog();
    }, 300);
});
```

There is **no `onUnmounted`/`onScopeDispose`** anywhere in the file. The `watch` itself is
scope-bound and stops, but the already-scheduled `setTimeout` is not, and its callback closes over
`audit` — which is **not** component state. `pm.audit` is a module-level singleton provided once at
the composition root (`usePalettePorts.ts:72, 245`), and `AdminPane.vue:61` mounts the panel behind
a plain `v-if` on `subView` (no KeepAlive at this level), so the panel unmounts on every admin
sub-view switch while the state survives.

**Reproduction** (C-3, fake timers):
```
[C-3] after unmount + 400ms -> loadAuditLog calls=2 page=1
```
Mounted with `page = 4`, one keystroke, unmount, advance 400ms → a second fetch fires and `page` is
reset to `1`, both after destruction.

By hand: type one character in "Action…", then click the Users tab within 300ms. The audit port's
page silently resets and an orphan request goes out while you are looking at a different pane.

**Cure:** the debounce belongs in the composable that owns the state, not in the view — expose
`setFilters(action, target)` from `useAdminAudit` and let its own `effectScope` own the timer. If it
must stay in the panel, `onUnmounted(() => clearTimeout(filterTimeout))` is the minimum.

## D-7 · MAJOR — vacuous gate: the sole test asserts a heading and a button name

Coverage in full: `e2e/smoke/admin/admin-walk.spec.ts`, three assertions for this route
(`:37-40`, `:74-84`, `:88`):

1. `getByRole("heading", { name: "Audit Log" })` is visible — that heading is rendered by
   `PaneHeader` in **`AdminPane.vue:3-6`**, not by this component at all.
2. `getByRole("button", { name: "Refresh audit log" })` is visible.
3. `consoleErrors` is empty.

Plus: e2e is not typechecked (`package.json:65` runs `vue-tsc` on `tsconfig.lib.json` and
`tsconfig.demo.json` only), which is why
`e2e/smoke/admin/fixtures/admin-populated.ts:22` still imports from
`"../../../../demo/@/lib/palette/types"` — a directory that does not exist
(`ls demo/@` → `No such file or directory`).

**Mutations that keep the suite green** — each deletes a load-bearing behaviour and is not detected:

| mutation | still green because |
|---|---|
| delete the whole entries `v-for` (`:59-80`) | nothing asserts a row |
| delete `onMounted(() => audit.loadAuditLog())` (`:119`) | nothing asserts a fetch |
| delete the debounced filter `watch` (`:110-117`) | nothing types into the filters |
| `formatTime` → `return ""` | no timestamp is asserted |
| swap the error `EmptyState` (`:42`) for the empty one (`:56`) | never driven to error |
| delete `<PaginationBar>` (`:83-90`) | never driven past 20 entries |
| `total` → hardcoded `0` | the count text is not asserted |

**Cure:** point the existing populated fixture at the route it already serves. Add
`/#/admin/audit` to `a11y-authed-admin.spec.ts:28-30`'s view list and one populated spec that
asserts 3 rows, the action/target text, a filter round-trip, and the error plate under a routed 500.
Then add the unit suite that does not exist: `useAdminAudit` sequencing, the no-token branch, the
malformed-body branch.

---

# MINOR

## D-8 · MINOR — the loading plate's accessible name is dropped by the browser; there is no busy state

`AdminAuditPanel.vue:36` puts `aria-label="Loading audit log"` on a bare `<div>` with no role.
A role-less `<div>` maps to `role=generic`, for which WAI-ARIA 1.2 specifies **"Name from:
prohibited"** — the name is discarded.

**Proven live**, not asserted from the spec (`pi/probe-aria.mjs`, injected into the running page,
read back through Playwright's ARIA snapshot):

```
input:  <div aria-label="Loading audit log">…</div>
        <div role="status" aria-label="Loading audit log"></div>
output: - text: inner
        - status "Loading audit log"
```

The generic div contributes nothing. What a screen reader actually receives instead is **three
identical announcements** — each `AdminListSkeleton` carries its own `role="status" aria-label="Loading"`
(`AdminListSkeleton.vue:11-12`) and the panel renders `v-for="i in 3"` of them (`:37`).

Also missing: `aria-busy` on the region (C-5: `aria-busy=(none)`); any association between the
`{{ total }} entries` count (`:26-28`) and the list, so a filter that changes 40 entries to 2
announces nothing; and any list semantics — the rows are 20 sibling `<div>`s, no `<ul>`, no
`role="list"`/`listitem` (C-5 asserts `role=list` absent).

Correct in the neighbourhood, for contrast: `PaginationBar.vue:17` (`aria-live="polite"
aria-atomic="true"`) and `EmptyState.vue:17`/`:29` (`role="alert"` / `role="status"`).

**Cure:** one `role="status" aria-busy` region around the list; `aria-hidden="true"` on the three
skeletons (they are decoration once the region is named); `role="list"`/`listitem` on the rows;
put the count inside the live region.

## D-9 · MINOR — `formatTime`'s catch is unreachable; "Invalid Date" reaches the DOM

`demo/palettes/browser/dateFormat.ts:2-13` wraps `toLocaleString` in `try/catch` and falls back to
`return iso`. `Date.prototype.toLocaleString` **does not throw** on an invalid Date — it returns the
string `"Invalid Date"`. (`RangeError` comes from `toISOString`, and from invalid *options*, not
from an invalid date.) So the fallback is dead code and the failure is user-visible.

```
$ node -e 'console.log((()=>{try{return new Date("x").toLocaleString(undefined,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch(e){return "THREW"}})())'
Invalid Date
```
```
[C-4] formatTime("not-an-iso-timestamp") = "Invalid Date"
[C-4] formatTime(undefined as any)       = "Invalid Date"
[C-4] formatTime("")                     = "Invalid Date"
[C-4b] row text: "1 entryx.yInvalid Datet"
```

**Cure:** `const d = new Date(iso); return Number.isNaN(d.getTime()) ? iso : d.toLocaleString(…)`.
Drop the try/catch — it was never doing anything.

## D-10 · MINOR — a hover affordance on a row that is not interactive

`AdminAuditPanel.vue:62` carries `transition-colors duration-fast hover:bg-accent/50` on a `<div>`
with no `@click`, no `role`, no `tabindex`, no `cursor-pointer`, no `focus-visible` treatment. The
row lights up under the pointer and does nothing; a keyboard user cannot reach it at all, so the
affordance is also mouse-only.

Every other `hover:bg-accent/50` in the tree pairs it with real interactivity:
- `AdminUsersPanel.vue:82-86` — `cursor-pointer hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:ring-2` + `:tabindex="…"`
- `AdminTagsPanel.vue:94, 99` — on a `<button>`, with `focus-visible:ring-2`
- `PaletteSlugBar.vue:73, 84, 91` — same pairing

This row is the sole unpaired instance.

**Cure:** drop the hover class (the row is a readout — this is the honest answer for an audit
ledger), or make it a real disclosure the way `AdminUsersPanel` did. Folding into `AdminListItem`
per D-1 removes it for free.

## D-11 · MINOR — a raw internal error string is rendered verbatim as end-user copy

`:46` passes `:detail="audit.loadError.value"` straight from `catch (e: any) { loadError.value = e?.message }`
(`useAdminAudit.ts:64-66`) into the plate. Live at `localhost:9000`, that message is 443 characters
of developer prose and occupies a 444×252px block inside the panel:

```
{ "detailLen": 443, "detailBox": { "w": 444.1, "h": 252.5 },
  "detailTag": "P.text-mono-small plate-ink max-w-[44ch] break-words" }
```

`pi/live-error-detail-dump.png` shows the result: the Audit Log card is dominated by a centered
ragged mono wall reading *"value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL
and is targeting the cross-origin production API (https://api.color.babb.dev), whose CORS
allow-list excludes localhost … Run `npm run dev` (the full local stack via scripts/dev.sh up)…"* —
build tooling, internal hostnames, and shell commands, in a moderator-facing surface. Note also the
toolbar above it still reads a count.

`EmptyState`'s `detail` is documented as "The machine truth (error variant) — the caught message"
(`EmptyState.vue:79`), which is right for `ApiProblem.detail`; it is not a licence to pipe an
unbounded arbitrary `Error.message` through. `ApiProblem` (`api-problem.ts`) already exists and
already carries a bounded, user-facing `detail`.

**Cure:** narrow the catch — surface `ApiProblem.detail` when the throw is an `ApiProblem`, a fixed
string otherwise, and `console.warn` the raw error (which `:67` already does).

## D-12 · MINOR — `class="h-7 px-2"` is a per-instance override of a glass-ui root, and it is inert

`:30` — `<Button variant="outline" size="sm" class="h-7 px-2" …>`. Measured live:

```json
{ "refreshBtn": { "h": "36px", "minH": "36px",
    "cls": "button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover h-7 px-2" } }
```

`h-7` asks for 28px. glass-ui's root sets `min-height: 36px`, which wins. The class is dead — it
does not change the rendered height by a single pixel, it just sits in the markup implying it does.
`px-2` does apply (28px width = 8 + 12 + 8), so the button is 28×36, an inconsistent aspect that no
token asked for.

This is a straight edict-5 violation (style at the root, never per-instance) that also happens to be
dead code, and it is copy-pasted across the family (`AdminFlaggedPanel.vue:10` is byte-identical).

**Cure:** delete `h-7 px-2` and let `size="sm"` speak. If a tighter icon-only rung is genuinely
wanted, it is a glass-ui `Button` variant (edict 4), not a demo-side class list.

---

# INFO

## D-13 · INFO — `duration-fast` at the callsite is a documented no-op

`:62` writes `transition-colors duration-fast`. `demo/styles/foundation.css:122-129` already aliases
the bare-utility default to the house token *specifically so that no callsite has to*:

> Alias it at the `@theme` ROOT to the house motion tokens so every un-tuned `transition` utility
> speaks the app's fast duration + standard ease by construction — **no per-callsite modifier.**

Measured live:
```json
{ "dur": "0.2s", "baseDur": "0.2s", "tokenFast": "0.2s", "tokenTdFast": "0.2s" }
```
`transition-colors duration-fast` and bare `transition-colors` are both 0.2s. The modifier is noise
against a rule the repo wrote down. (Animations are not deleted here — nothing changes visually;
edict 6 is satisfied.)

## D-14 · INFO — `total` is trusted raw at the domain boundary

`pageCount = Math.max(1, Math.ceil(total.value / pageSize))` (`useAdminAudit.ts:44`) with `total`
assigned unvalidated from the wire (D-4). Measured (C-9):

```
[C-9] total=NaN         -> pageCount=NaN       hasNext=false  toolbar="NaN"
[C-9] total=Infinity    -> pageCount=Infinity  hasNext=true   toolbar="Infinity"
[C-9] total=-5          -> pageCount=1         hasNext=false  toolbar="-5"
[C-9] total=null        -> pageCount=1         hasNext=false  toolbar=""      (blank count)
[C-9] total=string '40' -> pageCount=2         hasNext=true   toolbar="40"
```

`NaN` renders "NaN entries" and makes `PaginationBar`'s `v-if="pageCount > 1"` false, so the pager
silently disappears. `Infinity` gives an always-enabled Next that pages forever past the end.
`Math.max(1, …)` guards the low side and nothing guards the high side. Subsumed by D-4's cure.

Related, same line of code: the pluralisation at `:27` is `total.value === 1`, strict — a string
`"1"` from the wire renders "1 entries".

## D-15 · INFO — house idioms missed in the composable

- `entries = ref<AuditEntry[]>([])` (`useAdminAudit.ts:35`) deep-proxies up to 20 objects that are
  replaced wholesale and never mutated in place. `shallowRef` is the house idiom (edict 7) and is
  what this collection wants.
- `catch (e: any)` (`:64`) — an `any` in a repo whose api tree tracks `as any = 0` as a gate. `unknown`
  plus an `instanceof ApiProblem` narrowing is what D-11's cure needs anyway.
- `verbatimModuleSyntax` (edict 8) is **clean** in both files: `useAdminAudit.ts:9-11` uses
  `type Ref` inline and `import type { AuditEntry }`; the SFC has no type-only imports.

## D-16 · INFO — the shared row atom exists and is bypassed; the forensic field is dropped

`AdminListItem.vue` is the admin row atom (used by `AdminNamesPanel.vue:44, 94`), and
`AdminListSkeleton.vue:2-6` states it shadows "the AdminListItem row grammar". `AdminAuditPanel`
duplicates the atom's markup instead of using it (root cause of D-1 and D-10), and the skeleton the
panel shows therefore shadows a row shape the panel does not render — the shadow has a leading
8×8 swatch and a trailing action lozenge; the real audit row has neither.

Separately: `AuditEntry.ipHash` (`demo/palettes/types.ts:122`) is fetched on every request and never
rendered. On an audit ledger, the actor fingerprint is not decoration.

---

## Defect families

| family | findings | one cure |
|---|---|---|
| **The row was never rendered** | D-1, D-2, D-10, D-16 | render through `AdminListItem` inside a `v-else` branch |
| **The composable trusts the wire and the clock** | D-4, D-5, D-14 | validate the envelope at `adminRequest`; sequence requests by id |
| **"Empty" is used as the default for every unknown state** | D-2, D-3, D-4 | make not-authenticated, in-flight, failed and empty four distinct states |
| **Ownership: view code holds state-machine concerns** | D-6, D-5 | debounce + in-flight belong in `useAdminAudit`, not the SFC |
| **Assertions never reached the behaviour** | D-7 | point the populated fixture at `/#/admin/audit`; add the missing unit suite |
| **Per-instance styling over root tokens** | D-12, D-13 | delete the overrides; the root already says it |

---

## The strongest single defect

**D-2.** `AdminAuditPanel.vue:59` — the entries `v-for` is a sibling of the state chain rather than
its terminal branch, so `loadError` and `loading` decorate a fully populated ledger instead of
replacing it. Measured: `[C-2] loadError set -> errorBanner=true rows=2 toolbarCount="2"`, rendered
text `"2 entriesThe ledger is unreachable.user.deleteJul 4, 08:00 PM…"`. The component's own comment
at `:40-41` declares the invariant — *"a dead backend never costumes as a clear ledger"* — and the
markup two dozen lines below breaks it in the more dangerous direction: on the product's record-of-
truth surface, a dead backend costumes as a **complete** ledger. One `v-else` cures it.

---

## Probe artifacts (all under this component's audit dir)

| path | what it is |
|---|---|
| `pi/probe.test.ts` | the 10-case mount suite (C-1…C-9) |
| `pi/vitest.probe.config.ts` | its standalone config — this suite is NOT wired into `npm test` |
| `pi/probe-output.log` | the pasted run output quoted throughout |
| `pi/probe-live.mjs` | live control measurement + panel text + ARIA sample |
| `pi/probe-aria.mjs` | proves `aria-label` on `role=generic` is dropped (D-8) |
| `pi/probe-minwidth.mjs` | the 320px-track layout measurement (D-1) |
| `pi/minwidth-390.png` | audit row vs `AdminListItem` row at 390 — the overflow, pictured |
| `pi/live-error-detail-dump.png` | the 443-char raw error wall in the live panel (D-11) |

No file outside `docs/tranches/V/megatranche/audit/components/AdminAuditPanel/` was created or
modified by this seat. No source edit was made.
