# CHALLENGE-C — implementation · `VersionHistoryDrawer.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and I confirm it rather than inherit it.

Subject: `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` (168 lines, area `palettes`).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

> **Round note.** A round-1 challenge-C report already existed at this path (written 2026-07-28
> 22:36). I preserved it verbatim as `challenge-C-implementation.round1.md` and wrote this file
> independently — code read first, then probes, then a comparison. Where a finding corroborates
> round 1 I say so explicitly and cite its id; four mechanisms below are new to this round.
> Nothing from round 1 was discarded.

**Verdict: DEFECTIVE.** Fourteen defects, and every one in the BLOCKER/MAJOR band is reproduced by
an executable probe or a measured browser read — no hypotheses above MINOR. The headline is not
subtle: **the drawer's primary function does not work the first time a user asks for it**, and its
only action is a control that on every phone and tablet is mathematically incapable of becoming
visible.

---

## Evidence index — every probe I ran

| # | Probe | Instrument | Receipt | Findings |
|---|---|---|---|---|
| E1 | 10 component-level probes mounting the **real SFC** through a host replicating `BrowsePane.vue:157-164 + 269-275` verbatim | `@vue/test-utils` + jsdom, scratchpad vitest config, **no repo source touched** | `evidence-C2/vhd-probes.test.ts`, `evidence-C2/probe-run.log` (10/10 pass) | C-1, C-4, C-5, C-8, C-9, C-11, C-13, C-14 |
| E2 | 4 live CSS reads against the running dev server | Playwright MCP → `http://localhost:9000`, Chromium, desktop 1440 + phone 390 | `evidence-C2/live-css-probe.md` | C-3, C-6 |
| E3 | API service / repository / route / test read | `api/src/modules/palette/**` | C-2, C-10, C-12 |
| E4 | `Intl` micro-benchmark, 20 000 iterations | `node -e` | C-14 |
| E5 | Test-tree census + the one e2e that opens this drawer | `grep`, `ls`, source read | C-10 |
| E6 | Visual-audit REPORT rows + `shots/safari-mobile-light/browse.png` read | audit tree | reachability, below |

**Reproducing E1 in one command** (nothing is written into the repo; the config's `root` is the repo
so `node_modules` resolve):

```
npx vitest run --config docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/evidence-C2/vhd-probes.config.ts
```

(the shipped config's `include` points at the scratchpad copy of the test — repoint it at
`evidence-C2/vhd-probes.test.ts` to run it from the audit tree.)

### Reachability, and what the visual audit could not see

`shots/safari-mobile-light/browse.png` renders the designed **"The commons is unreachable."** plate —
the dev server at `:9000` has no `VITE_API_URL`, so `initApiEnvironment` latches `misconfigured`
before any fetch (`demo/platform/transport/availability.ts:151-164`) and `/#/browse` never lists a
palette. The drawer therefore **never appears in any of the 60 captures**. `REPORT.md:121/136/151/166`
shows `/#/browse` at 4 smallTapTargets and 0 accessible-name defects in all four matrices — those
counts are dock and search chrome. **This component contributes exactly zero rows to the visual
REPORT, so the REPORT's silence about it is not evidence of anything.** Every a11y defect below was
measured from the rendered DOM instead.

In production the drawer is reachable for **any** remote palette with `versionCount > 1`, owned or
not — `PaletteCardMenu.vue:93-102` carries no ownership gate, unlike its neighbours Rename (`:77`)
and Edit Tags (`:84`), which both test `isOwned`.

---

## Defects

### C-1 · BLOCKER — the first open of the drawer always renders "0 versions". CONFIRMED, executable.

**Mechanism.** The fetch is bound to a *rising edge* of `open` that, for the first open, never
exists. The host creates the component with `open` already `true`.

```
VersionHistoryDrawer.vue:158-167
watch(
    () => open,
    (isOpen) => { if (isOpen && paletteSlug) { versions.value = []; total.value = 0; loadVersions(); } },
);                                   // ← no `immediate`, and no init call anywhere
```
```
BrowsePane.vue:158      <VersionHistoryDrawer v-if="versionPalette" :open="versionDrawerOpen" …/>
BrowsePane.vue:272-275  function onVersions(palette) {
                            versionPalette.value = palette;   // ← creates the component …
                            versionDrawerOpen.value = true;   // ← … already open, same tick
                        }
```

`versionPalette` starts `null`, so the component does not exist until the first `onVersions()`. Vue
flushes both writes in one render: the component is created with `open === true` and the watcher,
registered without `immediate`, has no transition to observe. The user sees the drawer open, the
header say "0 versions", and the body stay blank forever.

**Reproduction** — `evidence-C2/probe-run.log`, probe C-1, against the real SFC:

```
C-1 {"firstOpenCalls":0,"firstOpenRows":0,"firstOpenDesc":"Census Palette — 0 versions",
     "secondOpenCalls":1,"secondOpenRows":2,"secondOpenDesc":"Census Palette — 2 versions"}
```

Zero requests, zero rows on open #1. Close and reopen and it works. **The workaround a user must
discover for themselves is "close the drawer and open it again."**

**Blast radius.** `BrowsePane` is `KeepAlive`-cached (`PaneSlot.vue:120`, `App.vue:88` `:max="9"`),
so `versionPalette` survives view switches and the breakage is once per page load — plus once more
each time the pane is evicted from the 9-entry LRU (the 5 admin views can do that).

**Cure (gestalt, not patch).** Do not re-implement the trigger; **delete the drawer's private data
layer and consume the composable that already exists** (see C-7). `useVersionHistory.loadVersions`
is correct; only the drawer's inline copy is mis-triggered. If a per-drawer list must stay, the
honest Vue-3.5 shape is `watch(() => [open, paletteSlug], …, { immediate: true })` — the identity
the fetch actually depends on, evaluated at creation.

*Corroborates round-1 C-1, which confirmed the same failure in a live browser with a stub API.*

---

### C-2 · MAJOR — `Revert` is offered to users who provably cannot use it, and the refusal is silent. CONFIRMED.

**Mechanism.** Three independent gates are missing along one path.

1. The menu item that opens the drawer has no ownership test —
   `PaletteCardMenu.vue:94` `v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"`.
2. The drawer renders `Revert` on every row that is not current —
   `VersionHistoryDrawer.vue:76` `v-if="version.hash !== currentHash"`. Ownership is never consulted;
   the component is not even given the owner slug.
3. The server rejects: `routes/versions.ts:49-51` wraps `POST /:slug/revert` in
   `requireOwnership(paletteOwnerExtractor)`, which throws `OwnershipError` → **403**
   (`require-ownership.ts:38`), or `AuthenticationError` → 401 when signed out (`:34`).

The rejection is then swallowed twice:

```
useVersionHistory.ts:86-92    catch (e) { console.warn("Failed to revert:", e); return undefined; }
BrowsePane.vue:279-280        const updated = await pm.versions.revert(…); if (!updated) return;
```

**Failure scenario.** A signed-in user browses the commons, opens Versions on someone else's
palette, hovers a row, clicks **Revert**. A request goes out, 403 comes back, and the UI does
**nothing at all** — no toast, no disabled state, no message. The console gets a `console.warn` the
user will never see.

**Cure.** Gate the affordance at its source: pass ownership into the drawer and render the history
read-only for non-owners, using the same `isOwned` predicate `PaletteCardMenu.vue:77/84` already
uses. For the paths that can still fail, surface the typed `ApiProblem` through the feedback channel
`PaletteCard` already exposes — `BrowsePane.vue:262-263` calls
`cardRefs[palette.slug]?.showFeedback(message, "error")` for fork failures. Revert should use it,
not invent one.

*Corroborates round-1 C-2.*

---

### C-3 · MAJOR — on every touch device the drawer's only action is permanently invisible. CONFIRMED, measured from the served CSS. **NEW this round.**

Round 1 found that the Revert buttons are `opacity: 0`, still hit-testable, with no focus reveal.
The stronger fact is *why they can never be revealed on the devices where it matters*.

```
VersionHistoryDrawer.vue:79
class="mt-2 h-7 text-caption opacity-0 transition-opacity group-hover:opacity-100"
```

Read out of the live `document.styleSheets` (`evidence-C2/live-css-probe.md` P4):

```css
.group-hover\:opacity-100 {
  &:is(:where(.group):hover *) {
    @media (hover: hover) {          /* ← Tailwind v4 gates every hover variant */
      opacity: 1;
    }
  }
}
.group-focus-visible\:opacity-100 {
  &:is(:where(.group):focus-visible *) { opacity: 1; }   /* ← generated, available, unused here */
}
.opacity-0 { opacity: 0; }
```

`opacity-0` is unconditional; the only rule that can raise it lives inside `@media (hover: hover)`.
On a coarse-pointer device that query never matches, so **the opacity is pinned at 0 for the life of
the page**. The control still occupies layout, still takes hit-tests, still sits in the tab order and
the accessibility tree.

Measured from the rendered DOM (probe C-3):

```
C-3 {"buttons":1,"cls":["mt-2 h-7 text-caption opacity-0 transition-opacity group-hover:opacity-100"]}
```

and the same probe asserts `tabindex`, `disabled` and `aria-hidden` are all absent — a fully live,
fully invisible button.

**Failure scenario.** iPhone, `/#/browse`, tap ⋮ → Versions. The history renders. There is no visible
way to revert anything, but a stray tap in the 28 px band below a version's swatches silently
rewrites the palette. Keyboard users on desktop hit the mirror image: Tab moves focus into a control
they cannot see, because there is no `focus-visible` escape.

**The repo already knows the cure.** Three siblings use it; this component is the only one that
does not:

```
demo/workbenches/extract/ImageDropZone.vue:58      group-hover:opacity-100 group-focus-visible:opacity-100
demo/workbenches/mix/MixSourceSelector.vue:153     group-hover:opacity-100 … focus-visible:opacity-100
demo/palettes/browser/admin/AdminTagsPanel.vue:99  group-hover:opacity-100 … focus-visible:opacity-100
```

**Cure.** Hover-to-reveal is the wrong grammar for a destructive action on a touch-first surface.
Make the control permanently present (it costs 28 px in a row that is already five lines tall), or at
minimum add `group-focus-visible:opacity-100` **and** a coarse-pointer always-visible branch. The
proper home for "row action revealed on intent" is a glass-ui row primitive, not a per-instance
opacity utility.

*Strengthens round-1 C-3 with the media-query mechanism and the mobile consequence.*

---

### C-4 · MAJOR — no request identity: a late response paints another palette's history under this palette's header. CONFIRMED, executable.

```
VersionHistoryDrawer.vue:137-151
async function loadVersions(offset = 0) {
    loading.value = true;
    try {
        const page = await pm.versions.fetchVersions(paletteSlug, 20, offset);
        if (!page) return;
        if (offset === 0) versions.value = page.data; else versions.value = [...versions.value, ...page.data];
        total.value = page.total;
    } finally { loading.value = false; }
}
```

No generation counter, no slug check on the response, no `AbortController` — and no seam for one:
`demo/platform/transport/client.ts:100-118` builds its `RequestInit` without a `signal`. Any
in-flight page writes into `versions`/`total` whenever it lands, for whatever palette it was issued
for.

**Reproduction** (probe C-2 in the log — drawer opened for palette A, closed, opened for palette B,
then A's response resolves last):

```
C-2 {"desc":"Bravo — 2 versions",
     "body":"Version HistoryBravo — 2 versions v2 … A-v1 Revert  v1 … A-v2 Revert"}
```

The header says **Bravo**, the total is **Bravo's**, and every row is **Alpha's**. Clicking Revert
now sends Alpha's version hash to Bravo's slug. For the owner of both palettes that is a successful,
wrong write; for anyone else it is the silent 403 of C-2.

**Cure.** One idiom, applied once: a monotonic request token captured before the await and compared
after (`if (token !== latest) return;`) — or, better, let the composable own the request and key its
state by slug so a stale page cannot be adopted at all.

*Corroborates round-1 C-6.*

---

### C-5 · MAJOR — a failed fetch is rendered as "this palette has no history". CONFIRMED, executable.

`useVersionHistory.ts:53-62` catches every transport failure — offline latch, 429 exhaustion, 500,
malformed JSON — logs `console.warn` and returns `undefined`. The drawer's `if (!page) return`
(`:141`) leaves `versions = []` and `total = 0`, which the template renders as the *success* state
for an empty history.

```
C-4 {"text":"Version HistoryP — 0 versions"}
```

Probe C-4 also asserts the rendered subtree contains **zero** `[aria-live]`, `[role=status]` and
`[role=alert]` nodes, so an assistive-technology user is told nothing at all — not even the wrong
thing.

There is no error state, no retry, and no empty state either: with zero versions the scroll region is
a blank rectangle under a subtitle reading "— 0 versions". The app renders a proper
`Retry` affordance for the browse wall (visible in `shots/safari-mobile-light/browse.png`); the
drawer does not use it.

**Cure.** Three states, not one: `loading` / `error(problem)` / `empty`. The typed `ApiProblem` is
already parsed by the transport (`api-problem.ts`) and thrown away by the composable's blanket catch
— stop discarding it.

*Corroborates round-1 C-5 and C-8.*

---

### C-6 · MAJOR — the width the component declares is dead code; glass-ui decides the width. CONFIRMED, measured, both viewports.

```
VersionHistoryDrawer.vue:3
<DialogContent placement="right" class="w-[380px] sm:max-w-[420px] flex flex-col">
```

Measured on the running dev server (`evidence-C2/live-css-probe.md` P1/P2):

| viewport | computed `width` | computed `max-width` | same two classes, no `data-slot` |
|---|---|---|---|
| 1440 px | **384 px** | **384 px** | 380 px / 420 px |
| 390 px | **292.5 px** (= 75 %) | **none** | 380 px / 420 px |

Cause (P3): `@mkbabb/glass-ui/dist/styles/index.css:1` imports
`../components/dialog/placement.css` **without a `layer()`**, so its
`:where([data-slot="dialog-content"][data-placement="right"]) { width: 75% }` and
`@media (min-width: 40rem) { … max-width: 24rem }` are *unlayered* author styles — which outrank
everything inside `@layer utilities`, where Tailwind v4 puts `.w-\[380px\]` (confirmed present in the
served CSS as `.w-\[380px\] { width: 380px; }`). The zero specificity of `:where()` is irrelevant:
layer order is resolved before specificity.

Three edicts at once: dead code (edict 2), a per-instance override where the design system already
rules (edict 5), and a declaration whose author believed it took effect.

**Cure.** Delete both width utilities. If 420 px is genuinely wanted, it is a glass-ui
`DialogContent` placement token or prop, authored once in glass-ui — exactly the shape edict 4
prescribes. (`sm:max-w-md` on `FlagReportDialog.vue:3` and `max-w-sm` on
`MigratePalettesDialog.vue:3` are centre-placement dialogs and are **not** shadowed — this is a
`placement`-specific trap, worth a one-line note to the glass-ui BH inbox under the standing relay
edict.)

*Corroborates round-1 C-10; the phone-viewport measurement and the layer-order mechanism are added here.*

---

### C-7 · MAJOR — the paging state machine exists twice, and the shipped copy is the broken one. CONFIRMED by census.

`useVersionHistory.ts` exports 10 members. A grep across the whole `demo/` tree for each:

```
pm.versions.loadVersions   -> 0        pm.versions.fetchVersions -> 1
pm.versions.loadMore       -> 0        pm.versions.revert        -> 1
pm.versions.reset          -> 0        pm.versions.fork          -> 1
pm.versions.paletteSlug    -> 0
pm.versions.versions       -> 0
pm.versions.total          -> 0
pm.versions.loading        -> 0
```

Seven of ten members have **zero consumers**. `useVersionHistory.loadVersions` (`:64-77`) and the
drawer's `loadVersions` (`VersionHistoryDrawer.vue:137-151`) are the same accumulate line for line —
same page size of 20, same `offset === 0 ? replace : append`, same `try/finally` on `loading`. The
composable's copy is dead; the drawer's copy is the one wired to a broken trigger (C-1) with no
request identity (C-4).

A dual path with a dead branch — the standing "no legacy code, no dual paths" edict — and the
`loadMore()`/`reset()` pair is a ready-made cure sitting unused two files away. The comment at
`VersionHistoryDrawer.vue:130-131` ("keep per-drawer local list — each drawer instance owns its
display state") justifies the duplication, but there is only ever **one** instance:
`BrowsePane.vue:157` mounts exactly one, `v-if`-gated on a single `versionPalette` ref.

**Cure.** Delete the drawer's `versions`/`total`/`loading`/`loadVersions`/`loadMore` and render
`pm.versions.*`, calling `loadVersions(slug)` on open and `reset()` on close — or delete the seven
dead composable members. One of the two must go; keeping both is the defect.

*Corroborates round-1 C-11; the per-member census is this round's.*

---

### C-8 · MINOR — offset paging over a non-unique sort key shows one version twice and hides another. CONFIRMED, executable. **NEW this round.**

Two independent facts compose:

```
VersionHistoryDrawer.vue:153-155   function loadMore() { loadVersions(versions.value.length); }
repository/paletteVersion.ts:22-27 .find({ paletteSlug }).sort({ createdAt: -1 }).skip(skip).limit(limit)
```

`createdAt` is not unique (`createVersionRecord` stamps `new Date()`; a fork, a patch and a revert in
the same millisecond tie), and offset paging over an unstable order — or over an order into which a
row is inserted between two requests — re-serves rows the previous page already showed.

**Reproduction** (probe C-8: page 1 = the newest 3; a version lands server-side; page 2 at offset 3
re-serves one of them):

```
C-8 {"rows":6,"offsets":[0,3],"vLabels":"v7,v6,v5,v4,v3,v2"}
```

Six rows for five distinct versions. The duplicated hash is rendered **twice, under two different
version numbers** (`v5` and `v4` are the same record); Vue emits no duplicate-key warning even in
dev; and `versions.value.length` is now 6, so the next `loadMore()` skips to offset 6 and the
genuinely unseen version is never reachable. `versions.length < total` (`:89`) keeps the button on
screen inviting the user to try again.

**Cure.** Page by cursor (`createdAt` + `_id` tiebreak — the shape the browse wall already uses via
`nextCursor` in `useBrowsePalettes`), or at minimum add `_id` as a secondary sort key in
`findByPaletteSlug` and dedupe by hash on append.

---

### C-9 · MINOR — a11y and focus: measured, four separate gaps. CONFIRMED, executable.

Census of the rendered drawer with three versions loaded (probe C-10; the full DOM dump is in
`evidence-C2/probe-run.log`):

```
C-10 {"liveRegions":0,"lists":0,"listitems":0,"headings":0,"ariaBusy":0,
      "buttonNames":["Revert","Revert"],"swatchDivsWithoutName":3,"ariaHiddenIcons":0}
```

1. **No live region, no `aria-busy`.** The list arrives asynchronously and is announced to nobody.
   The spinner (`:18`) is a bare `<Loader2 class="h-5 w-5 animate-spin …" />` with no `role="status"`,
   no accessible name, and no `aria-hidden` either.
2. **No list semantics.** Versions are sibling `<div>`s. A screen-reader user gets an
   undifferentiated run of text with no item count and no per-item navigation.
3. **Every action button carries the same accessible name.** `"Revert"` × N, with the version it
   reverts to conveyed only by visual proximity (WCAG 2.4.6). `aria-label="Revert to v3, Jul 1"`
   costs one attribute.
4. **Focus is dropped on the floor.** Probe C-9: focus the "Load older versions" button, click it,
   the final page arrives, `versions.length < total` goes false and the button unmounts under the
   focus it holds:
   ```
   C-9 {"focusedBefore":true,"stillThere":false,"activeAfter":"BODY"}
   ```
   `document.activeElement` becomes `<body>` — inside an open modal dialog. The keyboard user's
   position is destroyed and the next Tab restarts from the top of the document. **NEW this round.**

Not a defect (checked, negative): the spinner's `animate-spin` **is** neutralised under
`prefers-reduced-motion` by the global guard at `demo/styles/animations.css:183-192`, and the row's
`ring-2 ring-primary` current-marker is paired with a literal `(current)` text label (`:38`), so it
is not colour-only. The Revert button's 28 px height (`h-7`) clears the 24 px tap-target floor — the
defect there is invisibility (C-3), not size.

*Extends round-1 C-9; item 4 is new.*

---

### C-10 · MINOR — vacuous gate: no test in this repo could fail if the component were gutted. CONFIRMED.

**Unit tests: none.** `test/demo/` contains exactly one file,
`test/demo/palettes/api/admin-palettes.test.ts`. `grep -rl version test/demo/` → no hits. No test
exists for the SFC, for `useVersionHistory`, or for `demo/palettes/api/versions.ts`.

**The one e2e that opens this drawer is a typography census.**
`e2e/smoke/oracles/o10d-display-voice-census.spec.ts:326-337`:

```ts
await page.getByRole("menuitem", { name: /Versions/ }).click();
const drawerTitle = page.getByRole("heading", { name: "Version History" });
await expect(drawerTitle).toBeVisible();
const drawer = await typeVoice(drawerTitle);
expect(drawer.fontFamily, "drawer title off the display face").toMatch(DISPLAY_FACE);
expect(Number(drawer.fontWeight)).toBeLessThanOrEqual(500);
```

It asserts the **title's font**. And its own stub deliberately serves an empty history —
`:146-152` fulfils `/versions` with `{ data: [], total: 0 }` — so even a correct fetch would render
nothing.

> **Exact mutation that keeps every gate in this repo green:** delete template lines 15–98 (the whole
> scroll region: loading, `v-for`, load-more) and script lines 130–167 (the port injection, all three
> refs, `loadVersions`, `loadMore`, the watcher), leaving the `<Dialog>` + `<DialogHeader>` +
> `<DialogTitle>` shell. `npm test` and `npm run test:e2e` both stay green.
> That mutation is very nearly the component's *actual* first-open behaviour (C-1) — which is the
> proof the gate is vacuous: the shipped bug is already inside the mutation's blast radius and no
> gate noticed.

**A second vacuous gate, on the api side, that this component depends on.**
`api/src/modules/palette/__tests__/palette-versions.test.ts:58-75` is titled
`"listVersions returns versions in createdAt desc order"` and its body asserts, in full,
`expect(list.total).toBe(2)`. Order is never checked. Mutation: flip
`repository/paletteVersion.ts:24` from `.sort({ createdAt: -1 })` to `{ createdAt: 1 }` — the test
stays green and the drawer's `v{{ total - i }}` labels (`:37`) silently invert, presenting the
oldest version as the newest. The happy path of `revertToVersion` has no test at all; only the
`NotFoundError` case (`:83-91`).

*Corroborates round-1 C-14; the api-side vacuous gate and the two named mutations are this round's.*

---

### C-11 · MINOR — the version ordinal is invented from array position and goes non-positive. CONFIRMED, executable.

```
VersionHistoryDrawer.vue:37    v{{ total - i }}
```

`i` is the render index; `total` is `countByPaletteSlug` from a *different* query
(`service/versions.ts:92-96` issues the find and the count in one `Promise.all` — two independent
round trips, no snapshot). Whenever `data.length > total` the label runs off the bottom:

```
C-6 {"text":"… v1 … n Revert  v0 … n Revert  v-1 … n Revert"}
```

`v0` and `v-1` are rendered. Reachable whenever a version is removed between the count and the find,
and reachable *by construction* on the paging path of C-8. The number is not the version's identity
at all — `PaletteVersion` carries a real `depth` field (`demo/palettes/types.ts:76`,
`service/versions.ts:56`) that the drawer ignores.

**Cure.** Render the record's own `depth` (or its hash prefix, the true identity), not an arithmetic
guess about a list that may be one page of a shifting set.

*Corroborates round-1 C-7.*

---

### C-12 · MINOR — `versionCount` on the card and `total` in the drawer diverge on **every** revert. CONFIRMED by code, untested server-side.

```
service/versions.ts:137     const newHash = computeContentHash(version.name, version.colors);
service/versions.ts:146-160 await services.withTransaction(async (session) => {
                                if (userSlug) await createVersionRecord(services, { … name: version.name,
                                                     colors: version.colors … }, session);
service/versions.ts:162-175     await services.repositories.palettes.update(slug, {
                                    $set: { … currentHash: newHash … },
                                    $inc: { versionCount: 1 },          // ← unconditional
                                }, session);
                            });
```

`createVersionRecord` computes the same content hash as the record being reverted to and returns
early when it already exists (`:38-44`) — which, for a revert, is **always**, because
`PaletteVersion._id` *is* `computeContentHash(name, colors)` (`:60-71`). So a revert inserts no row,
yet always increments `versionCount`.

**Failure scenario.** A palette with 3 versions. Revert once: the card menu badge
(`PaletteCardMenu.vue:101`) reads **4**; open the drawer and its subtitle reads **3 versions**
(`total` = `countByPaletteSlug`). Two numbers for one thing, on the same screen, one click apart.
Repeat and the gap widens without bound.

**Cure.** Increment `versionCount` only when `createVersionRecord` actually inserted (have it return
`{ hash, created }`), or stop denormalising and read the count from `countByPaletteSlug`. A
server-side change — recorded here because the divergence is *visible in this component's surface*.

*Corroborates round-1 C-4.*

---

### C-13 · MINOR — rapid reopen double-fetches and clears the spinner while a request is still open. CONFIRMED, executable.

The watcher has no in-flight guard, and `loading` is a plain boolean cleared by whichever request
finishes first:

```
C-7 {"requests":2,"spinnerGone":true}
```

Two concurrent GETs for one drawer, and after the *first* resolves the spinner is gone though the
second is still open — the drawer looks settled while its content is about to change under the user.
The `:disabled="loading"` on the load-more button (`:93`) is the component's only guard and it does
not cover the watcher path. Subsumed by the C-4 cure.

---

### C-14 · INFO — `formatTime` builds a fresh `Intl` formatter per row per render, and its `catch` is dead code.

```
demo/palettes/browser/dateFormat.ts:2-13
try { return new Date(iso).toLocaleString(undefined, {month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}); }
catch { return iso; }
```

`Date.prototype.toLocaleString` does **not** throw on an invalid date — it returns the string
`"Invalid Date"`. Measured:

```
$ node -e "console.log(new Date('garbage').toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}))"
Invalid Date
```

so the `catch` is unreachable and the fallback (`return iso`, which would at least show the raw
value) never runs. Probe C-5 confirms it reaches the DOM:

```
C-5 {"text":"Version HistoryP — 1 version v1 Invalid Dateone Revert"}
```

Cost, 20 000 iterations:

```
per-call toLocaleString(opts): 21.60 us     total 432.0 ms
per-call cached Intl.format :   2.15 us     total  42.9 ms
ratio 10.1x  →  20-row drawer render: 0.432 ms vs 0.043 ms
```

10× for a value that is invariant across renders. At 0.43 ms per re-render of a 20-row list this is
not a performance blocker; it is a per-tick habit in a shared helper with three consumers
(`VersionHistoryDrawer.vue`, `AdminAuditPanel.vue`, `AdminFlaggedPanel.vue`).

**Cure.** Hoist one module-level `Intl.DateTimeFormat` per option set; drop the dead `try/catch` and
replace it with a real `Number.isNaN(d.getTime())` guard that renders something honest.

*Corroborates round-1 C-12 + C-15.*

---

## What is genuinely sound — positive evidence, not silence

Looked for specifically and not found, recorded so a later seat does not re-spend the probe budget:

- **No leaks.** No `requestAnimationFrame`, no `setInterval`, no `addEventListener`, no
  `ResizeObserver`/`IntersectionObserver`, no WebGL in the component or its imports. There is nothing
  to clean up, and correspondingly no missing `onUnmounted`. The PRM-RAF epidemic does not reach this
  file.
- **No `defineModel` stale-read hazard.** The component uses an explicit `open` prop +
  `update:open` emit (`:118-128`), so the async round-trip that motivates the local-`shallowRef` cure
  never arises. `defineModel<boolean>("open")` would be terser but would *introduce* the hazard, not
  remove one.
- **No `ValueUnit` nesting and no colour maths.** Swatches bind `c.css` straight to
  `background-color` (`:56`); no parse, no wrap, no `parseCssColor`. The live `parseCssColor` crash
  class in the repo's record does not reach here.
- **Reactive props destructure is correct.** `const { open, paletteSlug, … } = defineProps<…>()`
  (`:118`) compiles to `props.*` accesses, and probe C-1 proves the watcher fires on a real
  transition — C-1 is a missing edge, not a broken destructure.
- **`verbatimModuleSyntax` is respected.** `import type { PaletteVersion }` (`:116`) is the only
  type-only import and it is correctly marked.
- **`prefers-reduced-motion` is honoured** for the one animation used
  (`demo/styles/animations.css:183-192`), and no animation has been deleted — the row's
  `transition-colors`/`transition-opacity` are intact.
- **Boundary inputs do not crash.** Empty history, empty `colors`, absent `forkedFromHash`,
  `currentHash === null`, `colors.length > 8` — each is `v-if`-guarded and each was exercised by a
  probe.
- **No god module.** At 168 lines with one injected port and two emits, the file is a focused unit;
  the structural sin is duplication (C-7), not accretion.

---

## Severity roll-up

| id | severity | one line | reproduction |
|---|---|---|---|
| C-1 | **BLOCKER** | first open never fetches; drawer shows "0 versions" | probe C-1 |
| C-2 | MAJOR | Revert offered to non-owners; 403/401 silent | code + api route read |
| C-3 | MAJOR | Revert can never become visible on touch (`@media (hover: hover)`) | live CSS read |
| C-4 | MAJOR | no request identity; wrong palette's versions rendered | probe C-2 |
| C-5 | MAJOR | fetch failure rendered as "no history"; no live region | probe C-4 |
| C-6 | MAJOR | declared width is dead code; glass-ui wins the cascade | live measure, 2 viewports |
| C-7 | MAJOR | paging implemented twice; 7 dead composable members | grep census |
| C-8 | MINOR | offset paging duplicates one version, hides another | probe C-8 |
| C-9 | MINOR | 4 a11y gaps incl. focus dropped to `<body>` | probes C-9, C-10 |
| C-10 | MINOR | vacuous gate: no test could fail; two named mutations | test-tree census |
| C-11 | MINOR | `v{total-i}` renders `v0`, `v-1` | probe C-6 |
| C-12 | MINOR | `versionCount` inflates on every revert; two counts disagree | api code read |
| C-13 | MINOR | rapid reopen double-fetches; spinner clears early | probe C-7 |
| C-14 | INFO | `Intl` per row per render (10×); dead `catch` | benchmark + probe C-5 |

---

## Files cited

- `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` — the subject
- `demo/palettes/BrowsePane.vue:157-164, 269-284` — the host
- `demo/palettes/useVersionHistory.ts` — the composable with 7 dead members
- `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:77, 84, 93-102` — the missing ownership gate
- `demo/palettes/browser/dateFormat.ts:1-14` — the dead `catch`
- `demo/palettes/api/versions.ts`; `demo/platform/transport/client.ts:100-118`;
  `demo/platform/transport/availability.ts:151-164`
- `demo/shell/PaneSlot.vue:120`; `demo/color-picker/App.vue:88` — the KeepAlive that bounds C-1
- `demo/workbenches/extract/ImageDropZone.vue:58`; `demo/workbenches/mix/MixSourceSelector.vue:153`;
  `demo/palettes/browser/admin/AdminTagsPanel.vue:99` — the in-repo focus-reveal idiom this component omits
- `demo/styles/animations.css:183-192` — the PRM guard
- `api/src/modules/palette/service/versions.ts:32-75, 86-97, 121-181`; `routes/versions.ts:25-40, 49-67`;
  `repository/paletteVersion.ts:17-28`; `require-ownership.ts:29-41`;
  `__tests__/palette-versions.test.ts:58-91`
- `node_modules/@mkbabb/glass-ui/dist/styles/index.css:1`; `dist/components/dialog/placement.css`
- `e2e/smoke/oracles/o10d-display-voice-census.spec.ts:140-161, 326-337`
- `docs/tranches/V/megatranche/audit/visual/REPORT.md:121, 136, 151, 166`;
  `shots/safari-mobile-light/browse.png`

## Artifacts written by this seat

- `evidence-C2/vhd-probes.test.ts` — the 10 executable probes (real SFC, jsdom)
- `evidence-C2/vhd-probes.config.ts` — the vitest config they run under
- `evidence-C2/probe-run.log` — 10/10 pass, with every measured value printed
- `evidence-C2/live-css-probe.md` — the four live browser CSS reads
- `challenge-C-implementation.round1.md` — round 1's report, preserved unmodified

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was read-modified by this seat. All writes are under
`docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/`.
