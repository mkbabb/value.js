# CHALLENGE-C — AdminNamesPanel implementation audit

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant), the tier
declared at spawn. Not inherited, not undeclared.

**Subject**: `demo/palettes/browser/admin/AdminNamesPanel.vue` (152 lines, area `palettes`)
**Repo**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
**Date**: 2026-07-28
**Verdict**: **DEFECTIVE** — 16 findings, 1 BLOCKER, 7 MAJOR.

---

## 0. What I actually ran

Every number below is measured. The reproduction artifacts live beside this report:

| artifact | what it is |
|---|---|
| `probe-C-mount.test.ts` | 7 mounts of the REAL SFC via `@vue/test-utils`, all green |
| `probe-C-queue.test.ts` | `useColorNameQueue` double-approve reproduction, green |
| `probe-C-error-state.png` | live `#/admin/names` error render at localhost:9000 |

Run them (scratch config; nothing lands in the repo test tree):

```
npx vitest run --config <scratch>/vitest.mount.config.ts   # root=repo, plugins=[vue()], jsdom
```

Result:

```
 ✓ .../probe-C-mount.test.ts (7 tests) 60ms
      Tests  7 passed (7)
```

Printed evidence (verbatim stdout):

```
LOADING tab labels = ["Pending · 0","Approved · 0"]
loading wrapper: tag = DIV | role = NONE | nested role=status count = 3
approved-branch delete buttons = 1
rows rendered for ONE unique id = 2
aria-live = 0 | role=tabpanel = 0 | aria-controls = 0
Retry button outerHTML = <button data-slot="button" data-emphasis="secondary" data-tone="neutral"
  data-size="sm" data-press-armed="" type="button" class="button tap-squish focus-ring glass-wash
  glass-capsule glass-capsule-hover font-display" style="--glass-btn-press-t: 0.0000;
  --flex-vel: 0.0000;" variant="outline"> Retry <
pendingItems=2 + error → rendered rows = 0 | tab label = "Pending · 2"
swatch style = "" | row still approvable = 1
```

and from the composable probe:

```
approveCalls = ["c1","c1"]
approvedColors ids = ["c1","c1"]
```

Live browser (Playwright against the running dev server at `http://localhost:9000`, route
`#/admin/names`, read-only):

```
{ "hash": "#/admin/names",
  "tabs": [ {"t":"Pending · 0","pressed":"true","role":null,"controls":null},
            {"t":"Approved · 0","pressed":"false","role":null,"controls":null} ],
  "alertLens": [37, 484],
  "tabpanels": 0, "liveRegions": 0, "groupAriaLabel": null, "groupLabelledby": null,
  "retryButtons": 1 }
```

Retry-click experiment (3 clicks, same session):

```
before  { alertText: "The proposal queue is unreachable. value.js dev is MISCONFIG", skeletons: 0, html: 1548 }
mid     { ... identical ... html: 1548 }
after   { ... identical ... html: 1548 }
after3  { ... identical ... html: 1548 }
networkToApi: []
```

Gate probe:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
EXIT=0
```

---

## 1. Findings

### C-1 · BLOCKER · Double-click Approve double-POSTs and renders the same proposal twice

`AdminNamesPanel.vue:55` emits `approve` on every click with **no in-flight guard, no `:disabled`,
no `loading` state**. The handler `useColorNameQueue.ts:68-79` awaits the network, then
*unconditionally appends*:

```ts
await approveColorName(token, item.id);
adminColorQueue.value = adminColorQueue.value.filter((q) => q.id !== item.id);
approvedColors.value = [...approvedColors.value, { ...item, status: "approved" as const }];
```

Two clicks inside the network RTT → two POSTs and two array entries with the **same `id`**. The
Approved tab keys its `v-for` on exactly that id (`AdminNamesPanel.vue:94` — `:key="item.id"`), so
the panel renders one proposal as two rows.

**Reproduction** (`probe-C-queue.test.ts`, green):

```
approveCalls        = ["c1","c1"]     ← two POST /admin/colors/c1/approve
approvedColors ids  = ["c1","c1"]     ← duplicate v-for key
```

**Rendered consequence** (`probe-C-mount.test.ts` case C, green):

```
rows rendered for ONE unique id = 2
```

Downstream: clicking Delete on *either* phantom row calls `onDeleteColor`
(`useColorNameQueue.ts:92-102`), whose `filter((q) => q.id !== item.id)` removes **both** rows for a
single `DELETE` — the list and the server diverge without a word to the operator. `reject`
(`:66`) and `delete` (`:111`) are ungated in the identical way; a double-reject fires two POSTs
against an id the first call already consumed.

**Cure (gestalt, not patch)**: the panel owns no mutation state today, so the cure belongs one
level down. Give `useColorNameQueue` a `pendingIds: Set<string>` (a `shallowRef<Set>`), have the
three mutation handlers early-return when the id is in flight, expose it as `busyIds`, and let the
row bind `:loading="busyIds.has(item.id)"` — glass-ui's Button already ships `loading?: boolean`
("Marks an in-flight command and **suppresses activation until it settles**",
`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:15`). The library solved this;
the panel is not using it. Additionally make the append idempotent — the optimistic row should
replace-by-id, not push.

---

### C-2 · MAJOR · Every `variant=` on this panel is an inert DOM attribute — glass-ui 7 was never migrated to here

`demo/ui/button/index.ts` is one line: `export { Button } from "@mkbabb/glass-ui";` →
`dist/index.d.ts:5 export * from "./components/button"` → glass-ui **7.0.0**, whose `ButtonProps`
(`components/button/Button.vue.d.ts:6-19`) is:

```ts
emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
tone?: Tone;                 // "neutral" | "success" | "warning" | "info" | "destructive"
size?: ButtonSize; iconOnly?: boolean; loading?: boolean; ...
```

**There is no `variant` prop.** The panel passes `variant` five times — `:37` `outline`, `:55`
`outline`, `:61` `ghost`, `:87` `outline`, `:106` `ghost` — and every one falls through to the DOM
as a dead attribute. Measured, from a real mount:

```
<button data-slot="button" data-emphasis="secondary" data-tone="neutral" data-size="sm"
        ... variant="outline"> Retry </button>
```

`size="sm"` was consumed (`data-size="sm"`). `variant="outline"` was not: `data-emphasis` and
`data-tone` sit at their **defaults**. Approve (`outline`) and Reject (`ghost`) therefore render as
the *same* button; the only visual difference between an approve and a reject is the icon glyph and
whatever the hand-rolled class string does on hover.

Which brings the second half: the "quiet destructive" register the W5-12/F-8 comment describes
(`:58-60`, "destructive quieted to ink-at-rest") is hand-written as a five-utility per-instance
string, verbatim at `:64` and `:109`:

```
text-muted-foreground hover:text-destructive focus-visible:text-destructive hover:bg-destructive/10
```

That exact string appears at 4 sites repo-wide (`AdminNamesPanel:64,:109`, `AdminFlaggedPanel:96`,
`AdminUsersPanel:125`) plus a 4-class cousin at `PalettesPane:67`. glass-ui already owns this axis
and says so in its own type file (`components/_shared/axes.d.ts:16-17`):

> The tone axis — the semantic status register (`--<tone>` token cohort); **NEVER a `variant`
> member.**

This violates **edict 2** (no legacy — a pre-Glass-7 prop name kept alive as a no-op), **edict 4**
(the variant belongs in glass-ui, and it already does), and **edict 5** (root-level styling, never
per-instance overrides). `h-7 px-2` is a third instance of the same disease: glass-ui ships
`iconOnly` ("Square geometry for an accessibly named icon command") and a `size` ladder.

**Cure**: delete all five `variant=` props and both class strings; write the intent in the
library's own axes —

```html
<Button emphasis="secondary" tone="neutral"    size="sm" icon-only :aria-label="…">  <!-- approve -->
<Button emphasis="quiet"     tone="destructive" size="sm" icon-only :aria-label="…"> <!-- reject/delete -->
```

Repo-wide this pattern has **66** occurrences (`grep -rn 'variant="\(outline\|ghost\|default\|destructive\|secondary\|link\)"' demo/ | wc -l` → 66) across 20 files; this component owns 5 of them. That
is a tranche-scale migration, but the finding is real here and the panel is one of its worst cases
(5 of 5 buttons inert).

---

### C-3 · MAJOR · The tab strip states counts that contradict the body directly beneath it

`AdminNamesPanel.vue:18-21` builds the labels from list length with no reference to load or error
state:

```
{ label: `Pending · ${pendingItems.length}`, value: 'pending' },
{ label: `Approved · ${approvedItems.length}`, value: 'approved' },
```

Two measured contradictions, both from real mounts:

1. **Loading** → `LOADING tab labels = ["Pending · 0","Approved · 0"]` while three skeletons render
   beneath. The panel asserts "zero pending" when the truth is "unknown".
2. **Error** → `pendingItems=2 + error → rendered rows = 0 | tab label = "Pending · 2"`. The strip
   says *two*, the body says *"The proposal queue is unreachable."* and shows *none*.

The feature already codified the opposite rule one file up, in prose, in this same wave —
`AdminPane.vue:120-122`:

> A-3: suppress the badge while the roster/queue loads — a "0" over the loading skeletons **lies**
> (the length is 0 before data arrives).

The panel's own tab strip does the exact thing the parent's comment forbids, and additionally lies
in the error state that the parent never handled either (`adminCount`, `AdminPane.vue:117-131`,
guards on `loadingColorQueue` only — hence the "0" badge visible next to "Names" in
`probe-C-error-state.png`).

**Cure**: one derived label per tab — `count == null ? "Pending" : "Pending · N"`, with `count`
`null` whenever `loadingX || xError`. Hoist it into the same `computed` the other two SegmentedTabs
consumers already use (see C-12).

---

### C-4 · MAJOR · Approve / reject / delete fail SILENTLY — the panel has an error channel for reads and none for writes

`useColorNameQueue.ts:76-78, 87-89, 99-101` — all three mutations end in:

```ts
} catch (e: any) { console.warn("Failed to approve:", e?.message); }
```

No state is set, nothing is emitted, nothing is surfaced. An admin clicks Reject on a proposal; the
POST 500s or the auth token has expired; the row stays exactly where it was, no message appears, and
the only trace is a `console.warn` no operator will ever read. The next click repeats it. Meanwhile
the same composable maintains `queueLoadError` / `approvedLoadError` and the panel renders them
prominently (`:30-41`, `:80-91`) — so the surface *has* an error idiom and simply does not apply it
to the actions that mutate the corpus. That is the inverted priority: a failed *read* is loud, a
failed *moderation write* is mute.

This is worse in the live tree than it looks, because the transport can reject *before issuing a
request* (`availability.ts:188-195`, see C-7): during the latch cooldown **every** approve/reject/
delete throws instantly, and the UI is indistinguishable from a no-op click.

**Cure**: `mutationError: Ref<string | null>` on the port, set in each catch, cleared on the next
success; the panel renders it as a single `role="alert"` line above the list (it already imports
nothing new), and the row's optimistic removal is only applied after the await resolves — which it
already is, so the failure path just needs to *say so*.

---

### C-5 · MAJOR · False-empty: "· QUEUE CLEAR · No pending proposals." is rendered when no request was ever made

`useColorNameQueue.ts:36-37` and `:52-53`:

```ts
const token = getAdminToken();
if (!token) return;                // ← no load, no error, no flag
```

`loadingColorQueue` stays `false`, `queueLoadError` stays `null`, `adminColorQueue` stays `[]`. The
panel's precedence (`:26` loading → `:30` error → `:42` empty) therefore falls through to the
**empty plate**, which asserts a fact the app never learned.

**Reproduction — this is already in the mega-tranche's own visual capture.** Open
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-names.png`: an
unauthenticated visitor (the dock shows a **Login** button) at `/#/admin/names` sees the full
moderation surface with "Pending · 0 / Approved · 0" and the words **"· QUEUE CLEAR ·  No pending
proposals."** There is no queue. There is no admin. Nothing was fetched.

This is a masking fallback (**edict 2**): a designed state is being used to paper over an
un-attempted one. The route is also reachable in that state at all — `usePaletteWiring.ts:148-155`
fires the loaders `{ immediate: true }` on mount, while the "kick anonymous users out of admin"
watcher (`usePaletteWiring.ts:169-173`) is **not** immediate, so a cold boot straight to
`#/admin/names` renders the admin panel to anyone.

**Cure**: `if (!token) { queueLoadError.value = "Not signed in as an administrator."; return; }` — or
better, do not mount the moderation panels at all without a token. "Empty" must mean *the server
said zero*.

---

### C-6 · MAJOR · Raw transport `e.message` is piped verbatim into user-facing copy — a 484-character developer paragraph in the moderation panel

`useColorNameQueue.ts:44` / `:61`: `queueLoadError.value = e?.message ?? "Backend unreachable"`, then
`AdminNamesPanel.vue:34` / `:84`: `:detail="pendingError"` into `EmptyState`'s error branch, which
prints it unedited (`EmptyState.vue:23-25`).

Measured live at `#/admin/names`:

```
alertLens: [37, 484]
"The proposal queue is unreachable. value.js dev is MISCONFIGURED: http://localhost:9000 has no
 VITE_API_URL and is targeting the cross-origin production API (https://api.color.babb.dev), whose
 CORS allow-list excludes localhost — every palette request will be blocked. Run `npm run dev` (the
 full local stack via scripts/dev.sh up) instead of `npm run dev:web-only`, or set VITE_API_URL to a
 reachable, CORS-permissive backend. This is a dev-config error, NOT \"backend offline\". Retry"
```

See `probe-C-error-state.png` — twelve lines of shell instructions occupying the entire Names card.
The message is *correct* and *well-authored* (`availability.ts:118-131`); it is authored **for a
developer's console**, and the panel forwards it to whoever is looking. In production the same slot
carries `ApiProblem` detail strings and raw `TypeError: Failed to fetch` text with equal
indifference.

**Cure**: the panel must map, not forward. The transport already throws *typed* errors —
`ApiUnavailableError`, `DevMisconfigError`, `ApiProblem` — so the port can select one human sentence
per class and keep the machine text for the console. `detail` should carry an operator-actionable
line (a status code, a correlation id), never a paragraph.

---

### C-7 · MAJOR · Retry is a no-op with zero feedback whenever the transport latch is closed

`AdminNamesPanel.vue:37` / `:87` emit `retryPending` / `retryApproved` → `AdminPane.vue:56-57` →
`loadColorQueue` / `loadApprovedColors`. Those call through `assertApiAttemptAllowed`
(`availability.ts:188-195`), which **throws before issuing any request** when the latch is
`misconfigured`, or when it is `unavailable` and less than `RETRY_COOLDOWN_MS = 30_000`
(`availability.ts:59`) has elapsed.

Because the thrown message is a constant, the resulting `queueLoadError` is byte-identical to the
one already on screen. Measured, three consecutive Retry clicks in a live session:

```
before / mid / after / after3  →  alert outerHTML length 1548, 1548, 1548, 1548
skeletons observed: 0 at every sample
networkToApi: []               ← zero requests issued
liveRegions: 0                 ← nothing announced
```

The control is dead and *looks* dead-silent: no spinner (the `loading` flag flips inside one
microtask, so `AdminListSkeleton` never paints), no text change, no announcement. A sighted user
concludes the button is broken; a screen-reader user gets literally nothing, because `role="alert"`
re-renders identical content and there is no live region (C-9).

The `misconfigured` branch is dev-only, but the `unavailable` branch is **production-reachable**:
any single network failure latches it, and every Retry for the next 30 seconds is this exact no-op.

**Cure**: the retry path must be honest about the latch. Read `apiAvailability`
(`availability.ts:47`, already a reactive cell) and either disable Retry with a "retry in Ns" label
during the cooldown, or let the click *always* produce an observable transition (skeleton →
result), and announce the outcome in a polite live region.

---

### C-8 · MAJOR (a11y) · The tab strip is an unnamed toggle group controlling zero tabpanels — with the library's `tabs` semantics sitting unused

`AdminNamesPanel.vue:14-22` renders `SegmentedTabs variant="pill"` and nothing else. With `variant`
`pill` and `semantics` omitted, glass-ui preserves "the historical mapping: `pill` → `toggle`"
(`components/tabs/SegmentedTabs.vue.d.ts`, `semantics` doc). Measured on the live route and again in
a mount:

```
tabs: [{"t":"Pending · 0","pressed":"true","role":null,"controls":null},
       {"t":"Approved · 0","pressed":"false","role":null,"controls":null}]
groupAriaLabel: null   groupLabelledby: null
tabpanels: 0   aria-controls: 0   aria-live: 0
```

So: two `aria-pressed` buttons inside an **unnamed** `role="group"`; the panel bodies (`:24`, `:75`)
are bare `<div>`s with no `id`, no `role="tabpanel"`, no relationship to the control that reveals
them. A screen-reader user gets "Pending · 0, toggle button, pressed" with no group name, no
"1 of 2", and no way to know a panel changed.

This is not a library gap. `SegmentedTabsProps` ships exactly the three affordances needed, and
documents them:

- `semantics?: "toggle" | "tabs"` — "`tabs` exposes a tablist with selected tabs";
- `SegmentedTabOption.controls?: string` — "emitted as the tab's `aria-controls`, **completing the
  APG tablist↔tabpanel linkage for consumers that own a panel**";
- `ariaLabel?: string` — "Accessible name shared by the desktop strip and responsive Select".

This consumer owns two panels and uses none of the three.

**Cure**: `semantics="tabs"`, `aria-label="Color name queue"`, `controls: "names-pending" | "names-approved"`
on the options, and `id` + `role="tabpanel"` + `tabindex="0"` on the two bodies. Four lines.

---

### C-9 · MAJOR (a11y) · The loading state is simultaneously unannounced and announced three times

`AdminNamesPanel.vue:26` and `:76`:

```html
<div v-if="loadingPending" class="grid gap-2" aria-label="Loading pending proposals">
```

Measured from a mount:

```
loading wrapper: tag = DIV | role = NONE | nested role=status count = 3
```

Two defects in one construct:

1. A `<div>` with no role maps to ARIA `generic`, and `aria-label` is **prohibited** on `generic`
   (WAI-ARIA 1.2, "Roles Supporting Name From Author"; HTML-AAM maps `div` → `generic`). The string
   is authored, ignored by AT, and reads as coverage that does not exist. The sibling panel gets
   this right — `AdminTagsPanel.vue:51-56` puts `role="status"` on the equivalent wrapper.
2. Three `AdminListSkeleton` children each carry their own `role="status" aria-label="Loading"`
   (`AdminListSkeleton.vue:10-13`), so entering the queue fires **three** live-region
   announcements of the word "Loading".

And when the load resolves, nothing is announced at all — `aria-live = 0` across the whole panel
(`probe-C-mount.test.ts` case D). Approving a row silently deletes it from the DOM.

**Cure**: one `role="status" aria-live="polite"` wrapper on the list region that owns *both* the
"Loading pending proposals" and the settled "3 pending proposals" text; the skeleton atom drops its
per-instance `role="status"` (it is decorative once its container speaks) — a change in
`AdminListSkeleton.vue`, relayed to the glass-ui BH inbox per the standing fond if the Skeleton
primitive is touched.

---

### C-10 · MINOR · A failed refresh hides rows that are still held in memory

Template precedence at `:26 / :30 / :42 / :43` puts `pendingError` **before** the list. Measured:

```
pendingItems=2 + error → rendered rows = 0 | tab label = "Pending · 2"
```

`loadColorQueue` never clears `adminColorQueue` on failure (`useColorNameQueue.ts:43-45`), so the
data is right there — and the panel throws it away visually. On any transient refresh failure the
operator loses the queue they were working, and (C-3) the tab strip keeps counting the rows the body
refuses to show.

**Cure**: error is a *banner over data*, not a *replacement for data*, whenever data exists. Render
the list and put the error line above it; keep the full-plate error only for the true cold-fail
(`items.length === 0`).

---

### C-11 · MINOR · `cssColorOpaque` is a required prop that is never read

`AdminNamesPanel.vue:140` declares `cssColorOpaque: string;` — required, non-optional. `grep -n
cssColorOpaque demo/palettes/browser/admin/AdminNamesPanel.vue` returns **exactly one line, the
declaration**. `AdminPane.vue:52` dutifully passes it (`:css-color-opaque="cssColorOpaque"`), which
is the only reason `AdminPane` injects `CSS_COLOR_KEY` on this branch.

Dead required surface — **edict 2**. Delete the prop and the binding.

---

### C-12 · MINOR · The `:options` array is re-allocated on every render, unlike both sibling call sites

`AdminNamesPanel.vue:18-21` inlines the array literal in the template, so a fresh array identity is
produced on every parent render. Vue's props diff is a shallow identity compare, so `SegmentedTabs`
is forced to re-render on *every* tick of the panel — including every keystroke in the admin search
box (`AdminPane.vue:11-16` binds `pm.searchQuery`, which drives `filteredColorQueue` /
`filteredApproved` at `useColorNameQueue.ts:27-33` and therefore re-renders this panel per
character). The strip's indicator geometry is ResizeObserver-driven
(`glass-ui/dist/useTabRovingFocus-*.js`), so the churn is not free.

Both other `SegmentedTabs` consumers in the demo hoist their options into a `computed`:
`PaneSegmentedControl.vue:29-32` and `MixSourceSelector.vue` (`:options="tabOptions"`). This file is
the sole deviation.

**Cure**: `const tabOptions = computed(...)` — which is also where the C-3 count logic belongs.

---

### C-13 · MINOR · `namesTab` is stringly typed and the second branch is a catch-all `v-else`

`:151` — `const namesTab = ref<string>("pending")`, consumed as `v-if="namesTab === 'pending'"` /
`v-else` (`:24`, `:75`). Any value that is not exactly `"pending"` silently renders the Approved
panel. The union exists and is free: `ref<"pending" | "approved">("pending")`, with the second
branch as `v-else-if="namesTab === 'approved'"`. (Vue 3.5 idiom, **edict 7**.)

Related, same block: `:132` destructures only `pendingError` and `approvedError` out of eight props,
with `= null` defaults that can never fire because `AdminPane.vue:50-51` always passes both. Pick
one style; drop the dead defaults.

---

### C-14 · MAJOR (test truth) · The gates around this component are vacuous, and the repo has no component tests at all

**There is no unit or component test for `AdminNamesPanel`.** `grep -rln "AdminNames" test/ e2e/`
→ no matches. Wider: `grep -rn "@vue/test-utils" --exclude-dir=node_modules .` finds it only in
`package.json:96` and the lockfile — **`@vue/test-utils` is a declared, installed, entirely unused
devDependency**, and no `mount(` call exists anywhere in `test/` or `demo/test/`. (The last consumer,
`test/color-picker-lifecycle.test.ts`, is gone; see `docs/tranches/N/audit/lanes/E4.md:70`.) The
probes accompanying this report are, as far as I can measure, the first component mounts in this
repo's history.

The only coverage is three e2e specs, and each asserts a single fact:

| spec | assertion | what it cannot see |
|---|---|---|
| `e2e/smoke/admin/flows/color-approve.spec.ts` | `POST /admin/colors/<id>/approve` fired | anything after the POST |
| `e2e/smoke/admin/flows/color-reject.spec.ts` | `POST …/reject` fired | ditto |
| `e2e/smoke/admin/admin-populated.spec.ts:83-85` | approve removes one row at 390px | the Approved tab, counts, errors |
| `e2e/smoke/admin/a11y-authed-admin.spec.ts` | no nameless / sub-24px **visible** control | roles, live regions, tab semantics |

`grep -rn "Pending\|Approved\|proposal queue\|Retry" e2e/ test/` returns **nothing**. Nothing in the
suite ever selects the Approved tab, reads a count, provokes an error, or clicks Retry.

**Exact mutations that keep every gate green** (each verified against the assertions above):

1. Delete `useColorNameQueue.ts:75` (the approved-list append) — the Approved tab never updates
   again. Green.
2. Replace both tab labels with the constants `"Pending · 0"` / `"Approved · 0"`. Green.
3. Delete the entire `v-else` block (`:75-118`) — the Approved tab renders nothing. Green.
4. Delete both `EmptyState variant="error"` blocks (`:30-41`, `:80-91`) — every load failure becomes
   a silent empty plate. Green.
5. Change `:key="item.id"` to `:key="item.name"` at `:44` and `:94`. Green.
6. Delete the `cssColorOpaque` prop (C-11). Green — **and `vue-tsc` stays green too**.
7. Swap `variant="ghost"` for `variant="banana"` anywhere. Green — proven: the hard typecheck gate
   passes today with 66 inert `variant=` attributes in `demo/` (`npx vue-tsc -p tsconfig.demo.json
   --noEmit` → `EXIT=0`).

That last row is the sharpest one: the repo's *hard* CI typecheck (made blocking at `ef57230b`,
"ci(v-w44): flip demo-typecheck + test steps to hard") cannot see C-2 at all.

**Cure**: this component is pure-props/pure-emits — the cheapest possible mount target. Six
component tests (loading counts, error precedence, empty-vs-error, approve emits once,
approved-branch render, tab semantics) would have caught C-1, C-3, C-8, C-9 and C-10. The
infrastructure is already installed and paid for.

---

### C-15 · MINOR · An unparseable or unsupported css literal renders as a blank swatch, silently

`:46` / `:96` — `:style="{ backgroundColor: item.css }"`. The browser drops an invalid declaration,
so the swatch becomes an empty bordered circle indistinguishable from `transparent`. Measured:

```
swatch style = "" | row still approvable = 1
```

for `css: "not-a-color"`. The same happens for any color function the *reviewing* browser does not
support (the repo's own fixture seeds `color(display-p3 …)`, `AdminUsersPanel`-adjacent fixture
`admin-populated.ts:87-94`). On a moderation surface this is a correctness problem, not a cosmetic
one: the admin is approving a **name for a color they may not be seeing**, and the panel gives no
signal to distinguish "black-ish" from "unrenderable".

This repo has a first-class parser for exactly this (`parseCssColor`, and note the standing record
of a live crash class in it — the panel must *not* call it unguarded). A `CSS.supports("color",
item.css)` check is enough to mark the swatch invalid and suppress the approve action.

---

### C-16 · INFO · No transition on the panel swap (cross-referenced, already booked)

`grep -c "<Transition" AdminNamesPanel.vue` → **0**; the `v-if`/`v-else` swap at `:24`/`:75` is a
one-frame cut. Already recorded by the design lane as F034-b
(`docs/tranches/V/megatranche/excavation/DESIGN-CANON-BRIEF.md:97`). Noted here only so the
implementation lane does not re-derive it as new.

---

## 2. Hazards checked and found ABSENT (negative results, stated plainly)

The challenge names specific local hazards. Honesty requires reporting the ones that are not here:

| hazard | status in this component |
|---|---|
| `defineModel()` stale-read round-trip | **absent** — the tab uses a plain local `ref` (`:151`); no `defineModel` anywhere in the file |
| oklch→HSV hue drift / `stableHue` | **absent** — no color math; `item.css` is only ever a style string |
| `ValueUnit` nesting accumulation | **absent** — no `ValueUnit` construction |
| reka-ui slider pointer-capture leak | **absent** — no slider |
| ungated `requestAnimationFrame` (PRM-RAF) | **absent** — `grep -c requestAnimationFrame` → 0; the panel adds no rAF loop (the glass-ui strip owns its own motion) |
| WebGL context loss / eager boot | **absent** — no canvas |
| listener / observer leaks, unbounded growth | **absent in the panel** — it registers no listeners and no observers; the growth defect it *does* have is C-1's duplicate array entry |
| tap targets < 24px | **not a defect, and the REPORT rows are not this component's** — actions are `h-7` (28px) with a 14px glyph and `px-2` (30px wide); the a11y battery at `e2e/smoke/admin/a11y-authed-admin.spec.ts:44-55` asserts this and passes. The visual REPORT's 4 small-tap-targets on `/#/admin/names` (all four matrices, `REPORT.md:43,58,73,88`) resolve, in `REPORT.json` → `results[].probe.a11y.smallTapTargets`, to `{160×23 input, ""}`, `{22×22 "Switch to slug"}`, `{22×22 "Generate new slug"}`, `{22×22 "Cancel"}` — the **slug bar**, not this panel. Same node: `"namelessButtons": 0`. This component's contribution to both counts is **zero** |
| horizontal overflow at 390px | **not a defect** — `REPORT.md:129` overflowX 0 for `/#/admin/names`; the F-1 min-width cure at `:13`, `:24`, `:43` and `AdminListItem.vue:13` holds, and `admin-populated.spec.ts:73-81` fences it with `toBeInViewport({ ratio: 1 })` |
| page/console errors on the route | **clean** — `REPORT.md:129` pageErr 0, consoleErr 0 |
| `verbatimModuleSyntax` (edict 8) | **satisfied** — `:127` is `import type { ProposedColorName }`; it is the only type-only import |
| god module (edict 1) | **satisfied** — 152 lines, single responsibility, no barrel accretion |

---

## 3. Ranked summary

| id | sev | one line |
|---|---|---|
| C-1 | BLOCKER | ungated Approve/Reject/Delete → double POST + duplicate keyed row (reproduced twice) |
| C-2 | MAJOR | all 5 `variant=` props inert on glass-ui 7; destructive tone hand-rolled per instance; typecheck blind |
| C-3 | MAJOR | tab counts contradict the body — "Pending · 0" over skeletons, "Pending · 2" over an error plate |
| C-4 | MAJOR | moderation writes fail silently (`console.warn` only) while reads have a full error idiom |
| C-5 | MAJOR | false-empty "· QUEUE CLEAR ·" rendered with no token and no request ever issued |
| C-6 | MAJOR | raw transport `e.message` forwarded to users — a measured 484-char developer paragraph |
| C-7 | MAJOR | Retry is a zero-feedback no-op under the transport latch (3 clicks, 0 requests, identical DOM) |
| C-8 | MAJOR | unnamed toggle group, 0 tabpanels, 0 `aria-controls` — the library's `tabs` semantics unused |
| C-9 | MAJOR | `aria-label` on a role-less div (ignored) + 3 simultaneous `role="status"`; 0 live regions on result |
| C-14 | MAJOR | vacuous gates — no component test in the entire repo; 7 named mutations stay green |
| C-10 | MINOR | a failed refresh hides in-memory rows behind the error plate |
| C-11 | MINOR | `cssColorOpaque` required and never read |
| C-12 | MINOR | inline `:options` literal re-allocates per render; both sibling call sites use `computed` |
| C-13 | MINOR | `ref<string>` tab + catch-all `v-else`; partial props destructure with dead defaults |
| C-15 | MINOR | invalid/unsupported css literal → blank swatch, still approvable |
| C-16 | INFO | no `<Transition>` on the panel swap (already booked as F034-b) |

**Strongest defect**: C-1. It is the only finding that corrupts state the operator cannot repair from
the UI — one impatient double-click both double-POSTs a moderation decision and leaves the Approved
list holding two entries under one key, after which a single Delete removes both rows for one server
DELETE.
