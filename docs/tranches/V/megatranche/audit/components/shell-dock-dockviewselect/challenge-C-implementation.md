# CHALLENGE-C — `demo/shell/dock/DockViewSelect.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the model this seat
was explicitly spawned with. The declaration is present, not inherited.

---

## Verdict

**DEFECTIVE.** Fourteen defects. The component is the product's sole navigation surface and it is
built on a category error: a `<Select>` — a *value* control whose option set is its value domain —
is carrying *navigation*, whose value domain is the router's route space. The two sets are computed
in different files by different predicates and **they do not agree**. Every major finding below is a
consequence of that one seam.

Scope note: `DockViewSelect.vue` is 162 lines of which ~62 are comment prose. Its behaviour is
co-owned by `demo/shell/dock/composables/useDockAdminMode.ts` (77 lines) which computes the option
list; that file is audited as part of this component because the SFC is not analysable without it.

---

## Evidence provenance and one contamination caveat

The dev server at `http://localhost:9000` is driven **concurrently by other seats in this
workflow**. I observed a foreign navigation land in my page mid-probe (my page moved to
`http://localhost:9000/?probe=3#/gradient` — a `?probe=3` query string I never set). Accordingly
every finding below is anchored to one of:

- **[SRC]** source lines in this repo — contention-free;
- **[SHOT]** the committed capture set under `docs/tranches/V/megatranche/audit/visual/shots/` —
  contention-free;
- **[GREP]** a pasted command + output — contention-free;
- **[LIVE]** a single-round-trip DOM measurement, used only where a static read cannot decide.

The one finding whose reproduction is contention-sensitive (**D-7**) is labelled as such and carries
a restatement of its mechanism from source.

---

## Where the other eight routes are — the question the seat was asked

`demo/color-picker/router/index.ts` declares **15 route records: 14 named + 1 catch-all redirect**
(`/:pathMatch(.*)*` → `/`). The visual audit's 15 rows are those 14 plus `/#/does-not-exist`.

The selector offers **7**. The missing **7 named views** are enumerated at
`useDockAdminMode.ts:27`:

```ts
const adminViews: ViewId[] = ["admin-users", "admin-names", "admin-audit", "admin-flagged", "admin-tags", "atmosphere", "blob"];
```

and are rendered **only** when `isAdminMode.value && isAdminAuthenticated.value`
(`useDockAdminMode.ts:35`). `isAdminMode` can only be *entered* through the `__admin_toggle__` row,
which renders only when `pm.isAdminAuthenticated.value` (`DockViewSelect.vue:122`).

**Answer: for any user who is not an authenticated admin, those seven views are reachable only by
typing a URL.** There is no other entry point — no link, no menu item, no keyboard route. And even
for an authenticated admin the two lists are *mutually exclusive* (`useDockAdminMode.ts:34-39`
returns one list or the other), so no state of the product ever shows a user a path from Atmosphere
back to Browse except by leaving admin mode entirely.

Two of those seven — `atmosphere` and `blob` — **are not admin surfaces**:

- the router gives them **no** `meta: { admin: true }` (`router/index.ts:28-29`), unlike all five
  `/admin/*` routes (`:30-34`);
- `viewSchema.ts` gives them primary hue shifts **280** and **320** (`:177`, `:186`), on the same
  40°-fan as picker/palettes/browse/…, while every genuine admin view is pinned to **0** (`:195`,
  `:204`, `:213`, `:222`, `:231`) — the schema's own doc comment says *"The nine primary views are
  proportioned around the wheel in 40° steps in dock order; admin views stay at 0° — admin identity
  is the gold accent, not a hue turn."* The schema classifies them as **primary**; the dock
  classifies them as **admin**. One of the two is wrong, and the schema is the one the paint
  pipeline actually consumes (`useViewAccents.ts:138`).

That contradiction is finding **D-1**.

---

## Defects

### D-1 · MAJOR · Half the product's views have no navigation entry point; two of them are misclassified as admin

**Evidence [SRC]**
- `demo/shell/dock/composables/useDockAdminMode.ts:26-27` — the two hard-coded lists.
- `demo/shell/dock/composables/useDockAdminMode.ts:34-39` — `viewEntries` returns **one list or the
  other**, never a union, never a route-derived set.
- `demo/color-picker/router/index.ts:28-29` — `atmosphere`/`blob` carry no `meta.admin`.
- `demo/shell/viewSchema.ts:177,186` vs `:195-231` — primary hue shifts vs admin 0°.

**Evidence [SHOT]** `shots/safari-desktop-light/atmosphere.png` — the Atmosphere pane renders in
full to an **unauthenticated** visitor (the dock shows a **Login** button in the same frame). The
view is public; only its *entry point* is admin-gated.

**Evidence [GREP]** the e2e suite never reaches these two views through the UI:

```
$ grep -rn "openView(" e2e/ | sed 's/.*openView(page, //' | sort | uniq -c | sort -rn
   9 "Mix");     8 "Palettes");   6 "Browse");    5 view);
   5 "Gradient");4 "Home");       2 name);        2 "Generate");
$ grep -rn "atmosphere" e2e/smoke/**/*.spec.ts | grep goto
e2e/smoke/oracles/o18-contrast-census.spec.ts:929:            await page.goto("/#/atmosphere");
e2e/smoke/oracles/o18-contrast-census.spec.ts:1164:            await page.goto("/#/atmosphere");
```

Every test that needs Atmosphere types the URL. Nothing asserts it is reachable by a human.

**Mechanism.** The option list is a *hand-maintained partition of `ViewId`* held in a composable,
not a projection of the route table. Nothing structurally forces `userViews ∪ adminViews` to equal
`keys(VIEW_MAP)` or to respect `meta.admin`. A fourth list would drift the same way.

**Cure (gestalt).** Delete both literal arrays. Derive the menu from the route table, which already
carries the authority: `meta.admin` marks the admin set, `VIEW_MAP` carries label + icon. One
`computed` over `router.getRoutes()` partitioned by `meta.admin` makes the drift unrepresentable and
returns `atmosphere`/`blob` to the user set where the schema already puts them.

---

### D-2 · MAJOR · `isAdminMode` is sticky — it latches TRUE and never clears; unauthenticated users get the gold admin identity

**Evidence [SRC]** `demo/shell/dock/composables/useDockAdminMode.ts:55-59`:

```ts
watch(() => viewManager.currentView.value, (view) => {
    if (adminViews.includes(view)) {
        isAdminMode.value = true;
    }
});
```

**There is no `else`.** The watcher is a one-way latch. It also **does not consult
`isAdminAuthenticated`** — any visitor who lands on `/#/atmosphere` or `/#/blob` (both public, per
D-1) flips the dock into admin mode.

The only two clearing paths are `toggleAdminMode()` (`:41-48`, reachable only from the admin row,
which needs auth) and the logout watch (`:62-64`, needs a login to have happened).

**Consequence [SRC]** `DockViewSelect.vue:70` and `:80` bind the dock ring and the icon shimmer
straight to that latched flag:

```
:style="{ '--dock-ring': isAdminMode ? 'var(--color-gold)' : 'var(--accent-view)' }"
:class="isAdminMode && 'gold-shimmer-icon'"
```

**Reproduction [SHOT + LIVE]** — visit `http://localhost:9000/#/atmosphere` unauthenticated:

`shots/safari-desktop-light/atmosphere.png` shows the trigger icon rendered in **gold** beside a
**Login** button. Live DOM read on that route:

```json
{ "dockRing": "var(--color-gold)",
  "iconClass": "lucide lucide-sparkles-icon … gold-shimmer-icon" }
```

Then select **Home** from the menu and re-read — the app is on `#/`, the user has never
authenticated, and the gold **persists**:

```json
{ "hash": "#/", "triggerText": "Home",
  "dockRing": "var(--color-gold)",
  "iconClass": "lucide lucide-house-icon lucide-house w-6 h-6 shrink-0 gold-shimmer-icon",
  "goldShimmer": true }
```

The false admin identity survives every subsequent navigation until a full page reload.

**Cure.** `isAdminMode` is not state. It is a *predicate over the current route*:
`computed(() => isAdminAuthenticated.value && currentRoute.meta.admin === true)`. Derived, it cannot
latch, cannot desync from auth, and cannot be entered by an anonymous deep link. The `ref` + watcher
+ two mutators collapse to one line. (`toggleAdminMode` then becomes what it actually is: a
`switchView("admin-users") | switchView("picker")`.)

---

### D-3 · MAJOR · The trigger label goes BLANK on 7 of the 14 routes, and the menu reports "nothing selected"

**Evidence [SRC]** `DockViewSelect.vue:52` binds `:model-value="currentView"` — the *route*. The
options come from `viewEntries` — the *hand-partitioned list*. When the current route is not in the
rendered list, reka-ui has no matching item; `<SelectValue />` (`:87`) has no `placeholder` prop
(glass-ui `SelectValueProps` = `{ placeholder?, class? }`, and none is passed), so it renders
nothing.

**Reproduction [SHOT]** — compare, both unauthenticated, both desktop-light, both committed:

| capture | trigger reads |
|---|---|
| `shots/safari-desktop-light/picker.png` | icon + **"Home"** |
| `shots/safari-desktop-light/atmosphere.png` | icon only — **no label** |
| `shots/safari-desktop-light/admin-users.png` | icon only — **no label** |

**Reproduction [LIVE]** at `/#/atmosphere`, one DOM read:

```json
{ "role": "combobox", "ariaLabel": "Select view", "text": "",
  "rect": { "w": 60, "h": 32 }, "dockRing": "var(--color-gold)" }
```

and with the listbox open, **all seven options report `aria-selected="false"`**:

```json
{ "count": 7,
  "opts": [ {"text":"Home","selected":"false"}, {"text":"Palettes","selected":"false"},
            {"text":"Browse","selected":"false"}, {"text":"Extract","selected":"false"},
            {"text":"Mix","selected":"false"},    {"text":"Generate","selected":"false"},
            {"text":"Gradient","selected":"false"} ] }
```

A screen-reader user on 7 of 14 routes is told the product's primary navigation has **no
selection**, and a sighted user sees a nameless gold glyph (D-2 compounding). Together with D-1 the
worst state is: *you can reach the route by URL, and once there the nav can neither name where you
are nor offer you the list you came from.*

**Cure.** Same as D-1 — if the option set is the route set, an unmatched value is unrepresentable.
Until then a `placeholder` on `SelectValue` is a bandage, not a fix, and would mask the real seam.

---

### D-4 · MAJOR · The open menu contains NO indication of the current view — the mechanism its own comment cites does not exist

`DockViewSelect.vue:97` puts `hide-indicator` on **every** `SelectItem`, and the comment at
`:99-109` justifies it:

> *"EVERY option computes 400, selection speaks reka's `aria-selected` + the producer's glass-quiet
> highlighted-on-open row, never weight."*

**The producer has no such row.** [GREP], contention-free:

```
$ grep -c "data-highlighted" node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0
$ grep -rc "data-highlighted" demo/styles/*.css
demo/styles/animations.css:0   demo/styles/shell.css:0   demo/styles/focus-ring.css:0
demo/styles/hljs.css:0         demo/styles/utils.css:0   demo/styles/foundation.css:0
$ grep -c 'checked' node_modules/@mkbabb/glass-ui/dist/glass-ui.css
1
$ grep -o '\[data-state=checked\][^{]\{0,80\}{[^}]\{0,140\}}' node_modules/@mkbabb/glass-ui/dist/glass-ui.css
[data-state=checked] .switch__track{background-color:var(--control-checked-bg)}
```

The **only** `[data-state=checked]` rule in the whole design system belongs to `Switch`. There is no
select-option checked style and no select-option highlighted style anywhere in producer or consumer
CSS.

And `hideIndicator` removes the one affordance glass-ui *does* ship — its compiled `SelectItem`
(`dist/select-BcBAyLXA.js:272`):

```js
let C = s(() => a.hideIndicator ? "none" : "start");
… C.value === "none" ? l("", !0) : (_(), u("span", J, [ /* the indicator dot */ ]))
```

**Measurement [LIVE]** — menu open on `/#/` where **Home is the current view**, all seven rows:

```json
{ "distinctBg":     ["rgba(0, 0, 0, 0)"],
  "distinctWeight": ["400"],
  "distinctColor":  ["rgb(28, 25, 23)"] }
```

with every row also `opacity: 1`, `outline: none`, `boxShadow: none`, `data-highlighted: null`.
`data-state` is the only difference — `"checked"` on Home, `"unchecked"` on the rest — and **nothing
paints it**.

So the product's primary navigation menu, opened, is seven visually identical rows. It cannot tell
you where you are, and (`data-highlighted` absent on all rows even after opening) it cannot show you
which row the keyboard is on. That is WCAG **2.4.7 Focus Visible (A)** for the listbox and a plain
loss of location for everyone else.

**Cure.** Selection in a navigation menu is not decoration; it is the menu's only job. Restore a
selected-row treatment at the **root** — a `[data-state=checked]` rule in glass-ui's select
stylesheet (edict 4: it belongs in the design system, and the *whole constellation's* selects are
missing it, not just this one). `hide-indicator` may then stay: the dot is not the only way to paint
checked. It must not stay while nothing else does.

---

### D-5 · MAJOR (a11y) · WCAG 2.5.3 "Label in Name" (Level A) failure on the primary navigation

`DockViewSelect.vue:68` hard-codes `aria-label="Select view"` on the trigger. `aria-label` **wins
over element content**, so the accessible name is the constant string on every route, and the
visible label — the current view's name — is never in the accessible name.

**Evidence [LIVE]**, accessibility tree, closed state:

```yaml
- combobox "Select view" [ref=f16e42] [cursor=pointer]:
    - generic: Home
```

Visible text = `Home`. Accessible name = `Select view`. WCAG 2.5.3 requires the accessible name to
**contain** the visible label text. It does not. A voice-control user who says *"click Home"* cannot
operate the product's navigation.

It is also a value-exposure failure: `role="combobox"` with a constant name and (measured)
`aria-activedescendant: null` while closed means the current view is conveyed by **nothing** in the
a11y layer — the only carrier was `aria-selected` on the option, which D-3 shows is `false`
everywhere on 7 routes.

**Cure.** The visible label *is* the name. Drop `aria-label` and let the trigger's content name it
(reka composes trigger content + `SelectValue` into the name); if a role hint is wanted, put it on
an associated `<label>`/`aria-labelledby` that *includes* the value, not one that replaces it. Note
the mobile branch (`:87`, `SelectValue v-if="isDesktop"`) leaves no content at all below 1024px —
so mobile needs the value in the name, not a constant, more than desktop does.

---

### D-6 · MAJOR · Two independent sources of truth for "is this an admin?" — the dual path the owner edict forbids

- The **parent** injects `SESSION_PORT_KEY` (`Dock.vue:37`) and hands `isAdminAuthenticated` into
  `useDockAdminMode` (`Dock.vue:44`), which gates the option list on
  `isAdminMode.value && isAdminAuthenticated.value` (`useDockAdminMode.ts:35`).
- The **child** injects `SESSION_PORT_KEY` **again** (`DockViewSelect.vue:35`) and gates the admin
  row on `pm.isAdminAuthenticated.value` **alone** (`DockViewSelect.vue:122`).

Different predicates, same menu. They disagree in exactly the D-2/D-3 state: `isAdminMode = true`,
`isAdminAuthenticated = false` ⇒ the list falls back to `userViews` (so the current admin/tuning
route vanishes from it → blank trigger) while the admin row is correctly withheld. The component is
already living in the inconsistent state its two gates permit.

This is owner edict **2 (no dual paths)** and edict **1 (real encapsulation)**: the child re-derives
a fact the parent already owns and passes down four other props for.

**Cure.** `useDockAdminMode` returns the **whole menu model** — rows, plus an optional
`adminRow: { mode: "enter" | "exit" } | null` — and `DockViewSelect` renders it. One predicate, one
place, one prop. The child's `inject` and its `!` non-null assertion both disappear.

---

### D-7 · MAJOR · Every `update:modelValue` is a committed `router.push` — there is no highlight-vs-commit distinction

**Mechanism [SRC].** `DockViewSelect.vue:55` forwards reka's raw value change straight out:

```
@update:model-value="(id) => emit('update:modelValue', id as string)"
```

`Dock.vue:174` binds it to `onViewChange`, which (`useDockAdminMode.ts:66-74`) calls
`viewManager.switchView(id as ViewId)` → `router.push` (`useViewManager.ts:78`). **Any** value
reka emits — for any reason, from any input path — is an immediate, history-pushing navigation with
a full pane re-layout at the far end.

That is safe for a colour-space `<Select>`. It is not safe for navigation, because reka's
`SelectTrigger` implements native-`<select>` semantics in which arrow keys *cycle the value* when
focus is on the trigger rather than inside the content.

**Observation [LIVE, contention-caveated].** At `/#/`, real click on the trigger →
`activeElement` was the combobox and `aria-selected="true"` was on **Home**; one real `ArrowDown` →

```json
{ "hash": "#/palettes", "activeRole": "combobox",
  "selected": ["Palettes"], "expanded": "true" }
```

The app navigated while the listbox stayed open. The destination was *exactly the next option in
the list*, which contention cannot manufacture — but I could not re-run it cleanly on the shared
browser (a repeat attempt on a fresh load left `document.activeElement` as `BODY` with the listbox
open — a second, distinct defect state, see D-11 note), so I label this **CONFIRMED-once, needs
re-verification on an uncontended browser**. The *mechanism* above is source-certain regardless.

Note also that focus placement after a pointer-open was observed in **three** different states
across opens — `combobox`, `option`, and `BODY` — i.e. it is not deterministic, which is precisely
what makes the arrow-key path hazardous rather than merely unusual.

**Cure (architectural transposition, the real one).** This control is a **navigation menu**, not a
form field. Its rows should be `<a href="#/browse">` inside a menu/list. Then: arrow keys move
focus and commit nothing; Enter/click navigates; ⌘-click and middle-click open a new tab (today
impossible — there is no href anywhere in the product's navigation); the current row is `aria-
current="page"` (which *does* have paint conventions, curing D-4); and the whole
sentinel-in-the-value-space problem (D-9) evaporates because a mode toggle becomes a button, not a
fake route. glass-ui already ships `DropdownMenu` primitives; this is a reuse, not a new component
(edict 3).

---

### D-8 · MINOR · `update:open` is declared twice — dead declaration alongside `defineModel`

`DockViewSelect.vue:29` declares `"update:open": [open: boolean]` in `defineEmits`, and `:33`
declares the same channel again via `defineModel<boolean>("open")`. The component never calls
`emit("update:open", …)` — it writes `open = $event` (`:54`), which emits through the model.

**Evidence [GREP]** — compiled SFC:

```
$ node -e "…compileScript(descriptor)…"
  emits: /*@__PURE__*/_mergeModels(["update:modelValue", "update:open"], ["update:open"]),
```

`mergeModels` concatenates, so the runtime emits array is
`["update:modelValue", "update:open", "update:open"]`.

Harmless at runtime; a dead dual declaration under edicts 2 and 3. Delete line 29 (and the
now-orphaned comment at `:27-28`).

Related, same line: `"update:modelValue"` names a v-model channel the component does not
implement — there is no `modelValue` prop; the value comes in as `currentView` (`:18`). The emit is
misnamed for its contract. `@select` or `update:view` is what it is.

---

### D-9 · MINOR · `__admin_toggle__` is a magic string duplicated across two files, smuggled into the `ViewId` value space, and cast away unchecked

**Evidence [GREP]**

```
$ grep -n "__admin_toggle__" -r demo/
demo/shell/dock/DockViewSelect.vue:125:                        value="__admin_toggle__"
demo/shell/dock/composables/useDockAdminMode.ts:68:            if (id === "__admin_toggle__") {
```

Two literals, no shared constant. Rename one and the admin toggle silently becomes a `router.push`
to a route named `__admin_toggle__`, which vue-router rejects at runtime — the failure is a thrown
navigation error, not a type error, because `useDockAdminMode.ts:72` casts:

```ts
viewManager.switchView(id as ViewId);
```

`viewSchema.ts:236` exports `isViewId()` — a type predicate written for exactly this boundary — and
it is not used. The cast is the *only* thing standing between an arbitrary emitted string and
`router.push({ name: <that string> })`.

**Cure.** The sentinel disappears entirely under the D-7 cure (a mode toggle is a `<button>`, not an
option). If the `<Select>` shape is kept in the interim, the boundary must be
`if (!isViewId(id)) return;` — never a cast.

---

### D-10 · MINOR · Two per-instance overrides of producer styling; the root fix has been filed and STANDING since Tranche A

`DockViewSelect.vue:69` carries `[&>span]:line-clamp-none` — an arbitrary-variant child selector
whose only job is to cancel glass-ui's internal `line-clamp-1`. The file admits it (`:57-59`):
*"Root fix is a `clampLabel` prop on glass-ui DockSelectTrigger (filed coordination/Q.md §3)."*

**Evidence [GREP]** — the ask is real, old, and unresolved:

```
$ grep -rn "clampLabel" docs/tranches/*/coordination/Q.md
docs/tranches/A/coordination/Q.md:64:| `DockSelectTrigger`/`SelectTrigger` `clampLabel` prop | `research/Ad` Ad-18 | STANDS — a `[&>span]:line-clamp-none` child-selector hack | A.W4 |
docs/tranches/D/coordination/Q.md:38:| `DockSelectTrigger clampLabel` | unchanged | STANDS |
docs/tranches/E/coordination/Q.md:46:| `DockSelectTrigger clampLabel` | unchanged | STANDS |
$ grep -rn "clampLabel" node_modules/@mkbabb/glass-ui/dist/   # → no matches
$ cat node_modules/@mkbabb/glass-ui/dist/components/dock/DockTrigger.vue.d.ts
type __VLS_Props = { for?: "select" | "dropdown" | "popover"; class?: HTMLAttributes["class"]; };
```

glass-ui **7.0.0** still exposes only `for` and `class`. A per-instance hack has shipped across five
tranches against edicts 4 and 5.

`:70`'s inline `--dock-ring` override is the second instance: a producer token being re-pointed from
the call site rather than by a variant on the root control. (The file names this too, as "the filed
L13/W7-1 ask".) Two standing producer asks means the consumer is patching where the design system
should be growing.

---

### D-11 · MINOR (a11y) · The listbox has no accessible name

**Evidence [LIVE]**

```json
{ "listboxLabel": { "label": null, "labelledby": null, "role": "listbox" } }
```

`SelectContent` (`:90`) receives only `class="min-w-[12rem]"`. A screen-reader user entering the
popup is told "listbox" with no indication that this is the site navigation.

Related note (hypothesis, not a claim): the e2e fixture at `e2e/smoke/fixtures/dock.ts:66-77`
documents that *"once the reka-ui Select opens, the combobox's computed accessible name changes …
`getByRole("combobox", { name: "Select view" })` no longer resolves the same element."* My open-state
a11y snapshot corroborates the name loss (`- combobox [expanded] [active]:` with no name), but the
sibling `Toggle action bar` button also lost its name in the same snapshot, so the cause is likely
the portal's `aria-hidden` wrapper, not this component. Flagged for the seat that owns the popup
layer.

---

### D-12 · MINOR · `inject(SESSION_PORT_KEY)!` is a render-time crash outside its provider, with no test to catch it

`DockViewSelect.vue:35` asserts non-null; `:122` dereferences `pm.isAdminAuthenticated.value` in the
**template**. Mounted outside `usePalettePorts`' provider (`usePalettePorts.ts:242`) — a unit test,
a story, a future teleport — the render function throws `Cannot read properties of undefined`, and
the whole dock unmounts. Under the D-6 cure this injection disappears; until then it is an
unguarded non-null assertion on the product's navigation with zero coverage (see D-13).

Adjacent type erosion: `ViewEntry` (`useDockAdminMode.ts:7-12`) declares `icon: unknown` **and** an
index signature `[k: string]: unknown`, which makes the interface accept literally any object;
`:36`/`:38` then use `as ViewEntry` casts on spreads. `PaneConfig.icon` is a properly typed
`Component` (`viewSchema.ts:75`) — the type is being *thrown away* at the composable boundary and
handed to `<component :is="currentIcon">` as `unknown` (`DockViewSelect.vue:19`, `:76`).

---

### D-13 · MAJOR (test truth) · Zero tests target this component's behaviour; the entire admin branch is untestable-by-omission

**Evidence [GREP]**

```
$ grep -rln "DockViewSelect\|useDockAdminMode\|viewEntries" --include="*.ts" --include="*.vue" . | grep -v node_modules
demo/shell/dock/DockViewSelect.vue
demo/shell/dock/Dock.vue
demo/shell/dock/composables/useDockAdminMode.ts
demo/color-session/palettes-ramp.ts
demo/color-picker/composables/boot/useViewAccents.ts
$ grep -rn "DockViewSelect\|dock/composables" test/     # → no matches
$ grep -rn "openView\|combobox\|role=\"option\"" e2e/smoke/admin/*.spec.ts e2e/smoke/admin/flows/*.spec.ts e2e/smoke/admin/fixtures/*.ts
# → no matches
```

Sibling dock modules **do** have unit tests (`test/status-lamp.test.ts`, `test/view-accents.test.ts`)
— this one has none. In e2e, the select appears only as a *fixture* (`fixtures/dock.ts:59`
`openView`) or as an *anchor* for other assertions (`a11y-modality-support.spec.ts:128`,
`a11y-web-modality.spec.ts:76`, `page-load.spec.ts:33`, `o14-preview-truth.spec.ts:200`,
`o18-contrast-census.spec.ts:534`).

**Named vacuous-gate mutations** — each keeps the whole suite green:

1. **Delete the entire admin block, `DockViewSelect.vue:122-142`** (separator, Shield/"Admin" row,
   ArrowLeft/"Back to app" row). The admin e2e suite authenticates by seeding
   `localStorage["palette-admin-token"]` (`e2e/smoke/admin/fixtures/admin-auth.ts:22`) and then
   reaches every admin view with `page.goto(path)` (`admin-walk.spec.ts:71`). **No admin spec ever
   opens the view select.** The admin-mode UI could not exist and every test would pass.
2. **Delete `:80` (`gold-shimmer-icon`) and `:70` (`--dock-ring`).** `o18` asserts the icon wears
   `--accent-view` — which is only true in the *non*-admin branch it already runs in — and the whole
   leg is wrapped in `if (await icon.count())` (`o18-contrast-census.spec.ts:534-536`), so deleting
   the trigger outright skips the assertion silently rather than failing it.
3. **Swap `hide-indicator` for `hide-indicator="false"` on `:97`, or vice-versa.** Nothing asserts
   the selected row's appearance. `o14`'s "legend stays dead" test asserts
   `span.rounded-full` count **is 0** inside options — i.e. the suite actively pins the *absence* of
   an indicator and would fail if D-4 were **fixed** with the producer's own dot.
4. **Change `:52` to `:model-value="'picker'"`** (constant). `openView()` clicks by option name and
   the route changes on click, so every navigation test still passes; only the trigger label and
   `aria-selected` would be wrong — and nothing reads either.

The tests that exist verify the menu's *typography and contrast* in detail (`o14`, `o18`) and its
*behaviour* not at all.

**Missing coverage, minimally:** current-view ⇒ trigger label (all 14 routes); current-view ⇒ exactly
one `aria-selected="true"`; every named route reachable from the menu; `isAdminMode` false after
leaving an admin view; the admin row appears/disappears with auth; keyboard: Enter opens, arrows
move highlight **without navigating**, Enter commits, Escape restores focus to the trigger.

---

### D-14 · MAJOR (adjacent; not this file's code, but this file is the only gate) · `meta: { admin: true }` is declared and never enforced

`demo/color-picker/router/index.ts:30-34` marks the five admin routes `meta: { admin: true }`. The
file contains **no `beforeEach`, no guard, no use of that meta** — the only consumer of the flag in
the whole demo is… nothing (`grep -rn "meta.admin\|meta\?\.\admin" demo/` → no matches).

**Evidence [SHOT]** `shots/safari-desktop-light/admin-users.png`: an **unauthenticated** visitor at
`/#/admin/users` gets the full Users administration pane ("0 users", "No users found", "Prune
empty", "Refresh") with a **Login** button in the dock beside it.

Hiding the option row in `DockViewSelect` is therefore the *de facto* access control for the admin
surface. That is why D-1's "hidden from the menu" is not a cosmetic finding: the component has been
made load-bearing for something it cannot bear. Recorded here so the mega-tranche routes the guard
to the router, not to the menu.

---

## Passes — what I checked and did NOT find

Recorded so the negative is proven, not assumed.

- **`defineModel` stale-read hazard (the known local hazard):** `open` is a `defineModel` over the
  parent's mutex-backed `WritableComputedRef` (`Dock.vue:66`, `usePopupMutex.ts:75-80`), so
  `open = true` is genuinely an async round-trip that the mutex may *defer 180 ms* or refuse
  (`usePopupMutex.ts:46-54`). But the component **never reads `open` after writing it** — the only
  read is the `:open` binding, which is the render pass. No stale-read defect here. (The deferred
  open is a latency the mutex intends; I could not measure a first-click-drops case on the
  contended browser and do not assert one.)
- **`usePopupMutex` timer:** `clearSwapTimer` is called on every re-open path and on `onUnmounted`
  (`:82`); the one path that leaves a live timer (close-during-swap, `:63-68`) fires with
  `pending === null` and assigns `current = null` — benign. No leak.
- **rAF loops / listeners / observers in this component:** none. The only rAF in the dock is
  `Dock.vue:105`, one-shot, cleared by `@animationend.self` (`Dock.vue:130`). Not a PRM-RAF site.
- **`ValueUnit` nesting / `parseCssColor` / oklch→HSV hue drift:** this component parses nothing and
  touches no colour values; `--accent-view` arrives pre-resolved from `useViewAccents.ts:144`.
- **`--accent-view` transition (`:159-161`) is real, not a no-op:** the property is registered with a
  syntax at `demo/styles/foundation.css:192` (`@property --accent-view`), so it is animatable; and
  `accentHueShift` is genuinely consumed (`useViewAccents.ts:138`), so the per-view hue is live, not
  dead schema data. I checked this specifically because the sibling `PRIMARY_VIEW_IDS` machinery is
  documented as dead (`useViewAccents.ts:21-22`) — the hue path survived that excision intact.
- **`verbatimModuleSyntax` (edict 8):** `import type { ViewEntry }` (`:9`) is correct; every other
  import is a value import. Clean.
- **Tap targets:** options measure 174×44 px, trigger 60–108×32 px; `REPORT.json` lists **zero**
  dock-select contributions to `smallTapTargets` on any of the 60 captures (the 8 flagged on `/#/`
  are the slug-edit buttons at 22×22 and the four 12×24 channel handles). The 32 px trigger height
  is below the 44 px AAA target but above the 24 px AA minimum and is not flagged.
- **God module (edict 1):** 162 lines, ~100 of code, one job. Not a god module. It should *shrink*
  under D-6/D-7, not grow.
- **Animations (edict 6):** `vj-morph` and `vj-settle` live in `demo/styles/animations.css`; the one
  scoped rule here is a transition, not a keyframe. Compliant.
- **`hasDarkClass`, `mainCountNotOne`, `horizontalOverflow`, `pageErrors`:** 0 across all 60
  captures. The single console error (`WebGL: context lost`, `safari-desktop-light /#/`) belongs to
  the blob/atmosphere canvas, not here.

---

## Defect family map — why these are one bug wearing eight faces

```
        the option set is not the route set
                       │
   ┌───────────────────┼────────────────────┬──────────────┐
   │                   │                    │              │
 D-1 seven views    D-3 unmatched        D-9 sentinel   D-7 select
 unreachable        value ⇒ blank        in the value   used as
                    label, nothing        space          navigation
                    aria-selected
                       │                                    │
              D-2 sticky isAdminMode              D-4 no selected paint
              (the flag that decides           D-5 name overrides value
               which set is rendered           D-11 unnamed listbox
               is a latch, not a
               function of the route)          D-6 two auth predicates
                                               D-8 duplicate emit
                                               D-10 per-instance patches
                                               D-13 no behavioural tests
```

**Two structural cures retire eleven of the fourteen findings:**

1. **Derive the menu from the router.** Option set = route set partitioned by `meta.admin`;
   `isAdminMode` = a computed over the current route and auth. Kills D-1, D-2, D-3, D-6, and the
   `viewEntries`/`ViewEntry` type erosion in D-12.
2. **Make navigation navigation.** Anchor-based menu rows with `aria-current="page"` instead of a
   `<Select>` whose every value change is a `router.push`. Kills D-4, D-5, D-7, D-9, and the
   `aria-selected`-as-location half of D-3; makes D-13's missing tests writable.

D-10 (producer asks) and D-14 (router guard) route outward — to glass-ui and to the router
respectively — and D-8 is a one-line deletion.
