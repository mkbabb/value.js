# CHALLENGE-D — `AdminAuditPanel.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier explicitly
declared for this seat. Nothing inherited; the declaration and the observation agree.

- **Seat**: CHALLENGE-D (design), mega-tranche per-component audit.
- **Subject**: `demo/palettes/browser/admin/AdminAuditPanel.vue` (120 lines), area `palettes`.
- **Base**: branch `tranche-u`, HEAD `c654824e`. Route `/#/admin/audit`.
- **Verdict**: **DEFECTIVE**. 3 BLOCKER · 9 MAJOR · 7 MINOR · 3 INFO.
- **Writes**: only under
  `docs/tranches/V/megatranche/audit/components/AdminAuditPanel/`. No source touched. All
  browser work read-only (navigation, context emulation, and DOM-injected measurement
  replicas that died with the page).

---

## 0. Method, and its honest limits

Five evidence classes. Every finding says which it rests on.

1. **Shipped captures.**
   `docs/tranches/V/megatranche/audit/visual/shots/{safari-desktop-light,safari-desktop-dark,
   safari-mobile-light,safari-mobile-dark}/admin-audit.png`, read as images.
2. **Live WebKit measurement** against the running dev server (`http://localhost:9000/#/admin/audit`),
   Playwright `webkit`, viewports 1440×900 / 720×450 / 390×844 / 320×700, plus context arms for
   `reducedMotion: "reduce"`, `forcedColors: "active"`, `colorScheme: "dark"`, and `dir="rtl"`.
   Scripts: `/private/tmp/.../scratchpad/AAP-probe{2,3,4,5,6}.mjs`.
3. **Real driven error state.** The populated state is unreachable on this machine (the dev server
   runs web-only; `initApiEnvironment` latches `misconfigured`,
   `demo/platform/transport/availability.ts:149-163`). But seeding
   `localStorage["palette-admin-token"]` (`demo/platform/auth/useAdminAuth.ts:15`) makes
   `loadAuditLog` actually attempt the fetch, so the **error arm is the real component with real
   state** — captured at `evidence/error-state-errD1440{light,dark}.png`,
   `evidence/error-state-errM390light.png`.
4. **Cascade replica** for the populated arm. Class strings copied **byte-for-byte** from
   `AdminAuditPanel.vue:59-79`, and the badge's class string computed by running glass-ui's own
   `cn(badgeVariants({variant:"secondary"}), "text-mono-caption shrink-0")` in Node against
   `@mkbabb/glass-ui@7.0.0`, then injected into the live route's own panel so every measurement
   resolves through the real cascade, real tokens, real aurora ground. Findings resting on it are
   marked **[replica]**; geometry and computed style are real, only the data is synthetic. The
   synthetic data itself is not invented — the target strings are generated from the API's own
   emit sites and schema bounds (`api/src/modules/admin/service/batch.ts:54-56`,
   `api/src/modules/admin/schema.ts:42`, `api/src/modules/palette/schema.ts:19-23`).
5. **Source + API read** — the component, `demo/palettes/useAdminAudit.ts`,
   `demo/palettes/types.ts`, `api/src/modules/admin/service/audit.ts`,
   `api/src/modules/admin/audit-log.ts`, the four canon documents, and `@mkbabb/glass-ui@7.0.0`
   compiled runtime.

**A correction I owe the record.** My first replica used a bare
`<span class="text-mono-caption shrink-0">` for the action badge and measured it at 14.384 px,
weight 400, transparent, unpadded — I was one keystroke from filing "the Badge renders with no
badge chrome at all". That was my replica's fault, not the product's. Re-run with the real
`badgeVariants` output the badge measures 16.4 px / weight 600 / `bg` `rgb(237,230,222)` /
`padding 4px 10px` / `border-radius 9999px`. **"The badge has no chrome" is NOT a defect and is
not filed.** What survives is different and worse (D-6): the badge takes its *size* from one rung
and its *tracking and case* from another.

**A second honest limit.** WebKit's `forcedColors: "active"` emulation reported
`matchMedia("(forced-colors: active)").matches === true` while every computed color came back
byte-identical to the normal arm. I could not verify UA color substitution actually applied, so
the forced-colors finding (D-20) is filed as a **HYPOTHESIS**, argued from the declared policy
plus a measured structural fact, not from a measured repaint.

---

## 1. Visual truth — what the four shipped captures actually show

### 1.1 Desktop, light and dark (1440 CSS px)

Measured live, not eyeballed (`AAP-probe2.mjs`, `d1440`):

```
main                          x=16   w=1408
Audit Log card                x=199  w=512    36.4% of main
"My Palettes" companion card  x=729  w=512    36.4% of main
audit panel body              x=224  w=462
```

Two byte-identical 512 px cards. The right one is **an empty `My Palettes` plate** — `· EMPTY
PLATE ·`, `No saved palettes yet.` — a different domain, in its zero state, holding 36.4% of the
route. The Audit ledger is not the protagonist of its own route; it is one of two equal tenants,
and its co-tenant has nothing to say.

Inside the left card the body is mostly void. At zero entries the panel is
`toolbar → EmptyState`, and the empty plate's bottom edge sits **209.0 px** above the card's
bottom edge (empty block bottom `538.8`, card bottom `747.8` — `AAP-probe1`). Nothing occupies
that interval; the card does not collapse to fit.

Dark is not a treatment, it is the same geometry with the plate darkened. The row separator, the
badge fill and the muted ink all thin against the darker ground — the `--card-edge` token is
literally the same 12% mix in both schemes
(`color-mix(in oklab, light-dark(hsl(24 10% 10%), hsl(30 14% 90%)) 12%, transparent)`, measured),
so the boundary that reads as a hairline in light reads as almost nothing in dark. There is no
dark-specific row material.

### 1.2 Mobile, light and dark (390 CSS px)

The dock renders an `Audit | Palettes` **segmented pane selector**. That control exists only
because the desktop composition has a companion to switch between; it is the downstream cost of
§1.1, and `VISUAL-CONSTITUTION.md §3` law 6 forbids exactly it ("no global pane selector … survives").

And the toolbar is visibly broken in both shipped mobile captures. Measured (`AAP-probe1`, `mobile390`):

```
toolbar          x=33   w=324  h=80     ← wrapped to two rows
  input Action   x=33   w=128
  input Target   x=169  w=107.5
  spacer div     x=284.5 w=72.5 h=0     ← stayed on row 1
  span "0 entries" x=33  y=413.7        ← row 2, flush left
  button Refresh   x=118.5 y=405.5      ← row 2, aligned to nothing
```

The count and the Refresh button land **left**, at x=33 and x=118.5, with ~210 px of void to
their right, because the `flex-1` spacer that was supposed to push them right stayed on the first
line. The Refresh button's left edge aligns with no other element on the panel. Both placeholders
are clipped mid-string in the captures (`Action .`, `Target`) — the fields are narrower than
their own placeholder text.

### 1.3 The populated state [replica]

`evidence/real-badge-replica-m390.png` and `evidence/batch-target-d1440.png`. Three rows render
and the whole panel — rows, toolbar, empty plate — is dragged past the card edge and guillotined
mid-glyph with no ellipsis. That is D-3, and it is the most violent thing in this report.

---

## 2. State coverage — the enumeration

Every state this component can be in, and its disposition. A state never designed is a design defect.

| State | Reachable? | Designed? | Verdict |
|---|---|---|---|
| **signed out** | yes — the shipped default | **no** | costumes as `· ledger clear ·` (**D-2**) |
| loading (first) | yes | partly | 3 shadows of the wrong shape (**D-10**) |
| loading (refresh / filter / page) | yes | **no** | shadows render *above* the stale rows; both visible (**D-10**) |
| error | yes — captured live | yes, but | plate is right; the toolbar still asserts `0 entries` (**D-12**) |
| true empty | yes | yes | correct plate, 209 px of void under it (**D-18**) |
| populated | yes | **no** | row blows the track and is clipped (**D-3**) |
| populated + long target | yes, guaranteed by schema | **no** | 22,370 px row (**D-3**) |
| **actor of the event** | — | **never designed** | no slot exists (**D-1**) |
| **event detail / disclosure** | — | **never designed** | canon requires it; absent (**D-1**) |
| row hover | yes | **wrongly** | repaints, but nothing is clickable (**D-11**) |
| row focus | **unreachable** | no | `tabIndex −1`, no role, no keyboard path (**D-11**) |
| row selected / active / pressed | **unreachable** | no | no selection model exists |
| disabled (controls during load) | **never entered** | no | Refresh and both filters stay live (**D-19**) |
| truncated | **never entered** | intended, dead | `truncate` never fires (**D-3**) |
| overflowing | yes | **no** | `overflow-x: hidden`, no scrollbar, content lost (**D-3**) |
| filter pending (300 ms debounce) | yes | **no** | no indication anywhere |
| filter result announced | no | **no** | count has no live region (**D-15**) |
| paginated | yes | partly | offset, not the mandated stable cursor (**D-13**) |
| RTL | yes | **no** | machine strings not bidi-isolated (**D-17**) |
| reduced motion | yes | inherited | resolves to 0.1 s colour (INFO-1) |
| forced colors | yes | **no** | badge's only differentiator is a fill (**D-20**, hypothesis) |
| 200% zoom (720×450 proxy) | yes | partly | Target field 113.6 px vs fixed 128 px (**D-8**) |
| dragging | n/a | — | no drag surface |

---

## 3. Defects

### BLOCKER

---

#### D-1 — The audit ledger cannot answer *who*. The server sends the actor; the client types it away and the row anatomy has no slot for it

`api/src/modules/admin/audit-log.ts:39-48` writes `actorSlug` on **every** event, and
`api/src/modules/admin/service/audit.ts:17-25,43-51` puts it on the wire:

```ts
export interface AuditEntryDTO {
    id: string;
    timestamp: Date;
    action: string;
    target?: string | undefined;
    ipHash?: string | undefined;
    actorSlug?: string | null | undefined;   // ← who
    payload?: Record<string, unknown> | undefined;   // ← what changed
}
```

The client type, `demo/palettes/types.ts:117-123`, is:

```ts
export interface AuditEntry {
    id: string;
    timestamp: string;
    action: string;
    target: string;
    ipHash: string;
}
```

`actorSlug` and `payload` are **dropped at the type boundary**, and `ipHash` — the one provenance
field that did survive typing — is never rendered. `AdminAuditPanel.vue:64-79` paints exactly
three data points: action badge, timestamp, target.

So the shipped Audit route answers *what verb* and *against which slug*, and cannot answer
*who did it*, *what the value became*, or *from where*. That is not an audit log. It is a verb
log. `impersonate` (`api/src/modules/admin/service/impersonate.ts:52`) — the single most
sensitive event in the product — renders as `IMPERSONATE · Jul 27, 04:29 PM · slug=mbabb`, naming
the victim and never the perpetrator.

The canon does not leave this to taste. Three independent instruments bind it:

- `OPTICAL-BENCH-COMPOSITIONS.md:59` — **Admin · Audit** … regions "query; event rows;
  **detail disclosure**; pagination" … result "Companion `0`; stable cursor, **actor/scope/effect**
  and readable event density."
- `VISUAL-CONSTITUTION.md §7` — "Admin is a five-route review suite … using **one review-row
  anatomy** … **Actor, scope, provenance and effect remain visible.**"
- `PROPORTION-AUDIT.md §4` **PR-11** — "Admin rows obscure actor/scope/effect → **ADD-AFFORDANCE**
  … One review anatomy with authority/state/confirmation."

The mandated **detail disclosure** region is likewise absent: there is no expansion, no selected
inspector, nowhere for `payload` to live even if it were fetched. The design has no room for the
truth it is supposed to hold.

- **Severity**: BLOCKER.
- **Evidence**: `api/src/modules/admin/service/audit.ts:17-25`; `demo/palettes/types.ts:117-123`;
  `AdminAuditPanel.vue:64-79`; `OPTICAL-BENCH-COMPOSITIONS.md:59`; `VISUAL-CONSTITUTION.md §7`;
  `PROPORTION-AUDIT.md` PR-11.
- **Reproduction**: read the three sources above; the DTO field set and the rendered field set
  differ by `{actorSlug, payload}` and the row template contains no third slot.
- **Cure (transposition, not patch)**: adopt the mandated **one review-row anatomy** —
  `AdminListItem.vue`, which already ships the swatch / primary+secondary content / actions
  triad — and give the audit row the four-part sentence an audit entry is:
  *actor* (leading identity, the swatch slot's job), *verb* (badge), *scope* (target), *when*
  (right-aligned provenance). Widen `AuditEntry` to the DTO it is already receiving and put
  `payload` behind the canon's `detail disclosure` in the actions slot. This is one anatomy for
  five routes, not a fifth bespoke row.

---

#### D-2 — Signed out, the ledger reports itself clear. The exact P0 the component's own comment claims to have cured

`AdminAuditPanel.vue:40-41` states the law:

```
W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
costumes as a clear ledger.
```

`demo/palettes/useAdminAudit.ts:48-51` breaks it:

```ts
async function loadAuditLog(opts: AuditLogOptions = {}) {
    const token = getToken();
    if (!token) return;          // ← returns before loading, before loadError
    loading.value = true;
```

With no token the function returns **before** `loading` is set and **before** `loadError` can be
assigned. `loading` stays `false`, `loadError` stays `null`, `entries` stays `[]`, `total` stays
`0`. The template therefore falls through lines 36 and 42 straight to line 56 and renders the
**true-empty invitation plate**:

> `· LEDGER CLEAR ·` / **No audit entries found.**

All four shipped captures are this state. The dock in each reads **`Login`** — nobody is
authenticated, nothing was ever fetched, and the product asserts to an unauthenticated visitor
that the administrative audit trail is empty.

The A/B is decisive, and I ran it live. Same machine, same unreachable backend, same route; the
only difference is the presence of a token:

| arm | rendered |
|---|---|
| no token (shipped captures) | `· LEDGER CLEAR ·` · `No audit entries found.` |
| token seeded (`evidence/error-state-errD1440light.png`) | `The ledger is unreachable.` · `Forbidden` · `Retry` |

The error grammar exists and is good. It is simply not wired to the arm the product actually
ships in.

- **Severity**: BLOCKER.
- **Evidence**: `useAdminAudit.ts:48-51`; `AdminAuditPanel.vue:40-41,56`;
  shipped `safari-{desktop,mobile}-{light,dark}/admin-audit.png`;
  `evidence/error-state-errD1440light.png`.
- **Reproduction**: `http://localhost:9000/#/admin/audit` with `localStorage` clear → "ledger
  clear". Then
  `localStorage.setItem("palette-admin-token","x")` and reload → "The ledger is unreachable."
- **Cure**: the unauthenticated arm is a **third species**, not a silent empty. It is not an
  error either — it is *unauthorised*. `EmptyState` already carries the two-species split
  (`variant: "empty" | "error"`); the signed-out arm belongs to the error register with an
  authenticate action, or better, the Admin routes gate at the pane and never mount a ledger no
  one may read.

---

#### D-3 — One realistic entry destroys the panel: a 22,370 px row inside a 510 px card, clipped with no scrollbar, dragging the toolbar out with it

The row (`AdminAuditPanel.vue:59-63`) is a hand-rolled near-copy of the shared anatomy. Compare
byte-for-byte:

```
AdminListItem.vue:11    flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge min-w-0
AdminAuditPanel.vue:62  flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge transition-colors duration-fast hover:bg-accent/50
```

Identical prefix. The copy **drops `min-w-0`** — and `AdminListItem.vue:6-10` documents in its own
comment precisely why that token is load-bearing:

> S.W5-12 (F-1): `min-w-0` on the ROW ITSELF — the row is a grid item, and its `min-width:auto`
> automatic minimum resolves to the flex row's min-content (the un-breakable nowrap spans),
> blowing the track … Zeroing it lets the inner `min-w-0` content column actually truncate.

The audit row is a grid item of `.grid gap-3` (line 2). Without `min-w-0` its automatic minimum is
its min-content, and its min-content is the `truncate` span's *un-wrapped* width, because
`truncate` implies `white-space: nowrap`. Measured [replica], 1440 px:

```
panel width                462.0
target span scrollWidth    494.5     ← 47-char slug
row width                  520.5     = 494.5 + 24 padding + 2 border
row − panel                 +58.5
target truncated?          false     ← the ellipsis never fires
card clientWidth           510   cardScrollWidth 545   overflow-x: hidden
```

The `truncate` on line 76 is dead code: the row grows instead of the text shrinking, and the
growth is then **clipped** — `overflow-x: hidden`, so there is no scrollbar and no way to reach
the lost characters.

Now the realistic case, and it is not exotic. `api/src/modules/admin/service/batch.ts:54-56`:

```ts
await emitAuditEvent(services, actorSlug, `batch-${action}-palettes`, {
    target: `count=${processed} slugs=${slugs.join(",")}`,
});
```

with `slugs: z.array(z.string()).min(1).max(50)` (`api/src/modules/admin/schema.ts:42`) and
`slugSchema = z.string().min(1).max(120)` (`api/src/modules/palette/schema.ts:19-23`). One batch
feature/unfeature of 50 palettes writes a **single `target` of up to ~6,070 characters**.

Measured with 50 realistic 43-char slugs (`AAP-probe4.mjs`, `evidence/batch-target-d1440.png`):

| viewport | row width | clipped past card | card scrollWidth | toolbar width |
|---|---:|---:|---:|---:|
| 1440×900 | **22,370.4** | **21,885.4** | 22,394 (client 510) | **22,370.4** (was 462) |
| 390×844 | **19,100.5** | **18,761.5** | 19,116 (client 356) | **19,100.5** (was 324) |

The last column is the part that turns a rendering bug into a dead end. The toolbar is a sibling
grid item in the same single-column track, so it stretches to the blown track width too — the
Target filter runs off the card edge and **the `N entries` count and the Refresh button leave the
card entirely**. The only controls that could filter the offending row out of view are destroyed
by the offending row. `evidence/batch-target-d1440.png` shows it: the Target pill runs to the card
edge and the right-hand cluster is simply gone.

Note also why the shipped visual audit missed this: the route's page-level `overflowX` is `0`
(`REPORT.json`, all four matrices) because the card clips internally. A page-level overflow probe
cannot see it.

- **Severity**: BLOCKER.
- **Evidence**: `AdminAuditPanel.vue:59-63,76` vs `AdminListItem.vue:6-11`;
  `api/src/modules/admin/service/batch.ts:54-56`; `api/src/modules/admin/schema.ts:42`;
  `api/src/modules/palette/schema.ts:19-23`; measurements above from `AAP-probe2/4.mjs`;
  `evidence/batch-target-d1440.png`, `evidence/real-badge-replica-m390.png`.
- **Reproduction**: `node AAP-probe4.mjs` — injects three rows with the schema-maximum target into
  the live route's own panel and prints `row.w`, `clippedPx`, `toolbarAfter.w`.
- **Cure**: delete the hand-rolled row and compose `AdminListItem`, which already carries the
  `min-w-0` cure and the slot grammar D-1 needs. The `target` is structured data
  (`k=v k=v …`), not a sentence: render it as keyed chips with the list behind the mandated detail
  disclosure, so a 50-slug batch is `50 palettes ▸` and not six thousand characters of nowrap.

---

### MAJOR

---

#### D-4 — Every row is a four-sided box where the binding boundary inventory allows exactly one line between adjacent rows and none after the last

`OPTICAL-BENCH-COMPOSITIONS.md:84`, the binding §5 boundary inventory:

| member | … | boundaries |
|---|---|---|
| Admin · Audit | … | **one low-emphasis separator between adjacent event rows; none after the final row** |

`VISUAL-CONSTITUTION.md §4.2` repeats it: "Only the five Admin lists retain a non-P122
**adjacent-row separator**; every other composition retains no divider." `PROPORTION-AUDIT.md`
PR-05 rules the family **REMOVE / KEEP** with "only the five Admin fields retain one
adjacent-row separator and **no terminal rule**".

Shipped (`AdminAuditPanel.vue:62`, measured [replica] at 1440):

```
border-top 1px solid oklab(0.216129 0.003491 0.005182 / 0.12)
border-right 1px   border-bottom 1px   border-left 1px
border-radius 6px
row gap 11.9px
```

Four painted edges per row, plus a rounded corner set, plus a terminal edge under the final row —
where canon budgets **one** horizontal line and explicitly forbids the terminal rule. For a
20-row page that is 80 boundary segments against a budget of 19. The visual consequence is exactly
what PR-05 names: spacing and material already express the grouping, and the box repeats it, so a
chronological *ledger* reads as a stack of unrelated cards. Chronology has no rendered continuity.

- **Severity**: MAJOR.
- **Evidence**: `OPTICAL-BENCH-COMPOSITIONS.md:84`; `VISUAL-CONSTITUTION.md §4.2`;
  `PROPORTION-AUDIT.md` PR-05; `AdminAuditPanel.vue:62`; computed style above.
- **Reproduction**: `AAP-probe2.mjs` → `d1440.rowCS`.
- **Cure**: one `border-block-end` on `:not(:last-child)`, no radius, no lateral edges. The row
  becomes a line in a ledger instead of a card in a stack.

---

#### D-5 — The route spends 36.4% of `<main>` on an empty companion from another domain, and pays for it again with a mobile pane selector

`OPTICAL-BENCH-COMPOSITIONS.md:59` — Admin · Audit is a "**Full-width** chronological event
ledger", material "no decorative dashboard metrics or **palette companion**", result "**Companion
`0`**". `VISUAL-CONSTITUTION.md §7` — "Each Admin route uses the full main width: the current
Palettes companion, right label and resulting mobile pane selector are **removed rather than
restyled**." `PROPORTION-AUDIT.md` PR-04 — "Empty/equal companion Cards … **REMOVE** … Admin
companion `50%→0`." `VISUAL-CONSTITUTION.md §3` law 2 — "Empty secondary content occupies at most
a narrow invitation tray (≤15% of the stage) or disappears. **It never receives half the
viewport.**"

Measured, 1440 (`AAP-probe2.mjs`, `d1440.before`):

```
main   w=1408
audit card      x=199  w=512   →  36.4% of main
companion card  x=729  w=512   →  36.4% of main, rendering "· EMPTY PLATE ·"
```

Equal widths to the pixel; the companion is in its zero state. And the mobile capture shows the
`Audit | Palettes` segmented selector that exists only to switch between them — the exact control
`VISUAL-CONSTITUTION.md §3` law 6 says must not survive.

This row is already registered (PR-04) and still shipping. I file it against this component
because the Audit member is named individually in the binding composition table and because
D-3's severity is a direct function of the panel being 462 px wide instead of 1408.

- **Severity**: MAJOR.
- **Evidence**: measurements above; the four shipped captures;
  `OPTICAL-BENCH-COMPOSITIONS.md:59`; `VISUAL-CONSTITUTION.md §3` laws 2/6, §7;
  `PROPORTION-AUDIT.md` PR-04.
- **Reproduction**: `AAP-probe2.mjs` → `d1440.before.card` and the second `.card` rect.
- **Cure**: companion `→ 0`; the ledger takes the full main width; the mobile pane selector dies
  with it.

---

#### D-6 — The type hierarchy the row's own comment claims does not exist: it is flat, inverted, and the badge is a chimera of two rungs

`AdminAuditPanel.vue:58` declares the intent:

```
Entries — Ag-13: primary (action+time) / secondary (target) hierarchy
```

Measured [replica] at 1440 with the real glass-ui badge class:

| element | size | family | weight | colour | tracking | case |
|---|---:|---|---:|---|---:|---|
| action badge | **16.4 px** | Fira Code | 600 | `rgb(28,25,23)` | **1.64 px** | **uppercase** |
| timestamp | **16.4 px** | **Plus Jakarta Sans** | 400 | `rgb(112,89,66)` | normal | none |
| target ("secondary") | **16.4 px** | Fira Code | 400 | **`rgb(112,89,66)`** | normal | none |

Three failures in one measurement.

**(a) The hierarchy is flat.** Every line in the row is 16.4 px. The "secondary" target line is
the *same size* as the primary line and *the same colour* as the timestamp — `rgb(112,89,66)`
exactly, in both. Nothing in the rendered row expresses primary vs secondary except vertical
order. In dark the two are again identical (`rgb(195,185,172)` both).

**(b) The badge is a chimera.** Its class list carries two competing type rungs, because
tailwind-merge does not collapse them — verified by running the merge:

```
$ node -e "…cn(badgeVariants({variant:'secondary'}), 'text-mono-caption shrink-0')"
… text-[length:var(--control-text)] leading-[1.1] px-2.5 py-1 text-mono-caption shrink-0
```

Both survive, and the cascade splits them: the **size** resolves to `--control-text`
(`clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` → 16.4 px at 1440) while the **letter-spacing
(1.64 px) and uppercase** come from `text-mono-caption`. So the badge is a caption's tracking and
case at a control's size — a specimen that exists at no rung of the ladder. Which half wins is
stylesheet order, not design intent. `PROPORTION-AUDIT.md §5` law 8: "Real rendered relation wins
over token intent."

**(c) The timestamp is in the wrong family.** `VISUAL-CONSTITUTION.md §4` binds
"value, code, or **provenance** → `text-mono-small`, or the already-established `mono-caption`
where the content is a caption · **Fira Code**". A timestamp is provenance. It renders in Plus
Jakarta Sans (`text-small`, line 70) — the *control* rung. The component knows this rule and
applies it correctly one line below, at line 74-78: "a machine string is a READOUT: Fira, never
italic display type". The timestamp is the machine string it forgot.

There is a fourth, quieter cost: the action is the most important datum in an audit row and it is
rendered as an uppercase 0.1em-tracked pill 254.7 px wide (55.1% of the 462 px panel for
`delete-user-palettes`) that is also `shrink-0` — it cannot yield, and it is the direct
co-conspirator in D-3's min-content floor.

- **Severity**: MAJOR.
- **Evidence**: `AdminAuditPanel.vue:58,67-78`; the measured table above (`AAP-probe3.mjs`,
  `d1440.badge/.time/.target`); the `cn()` output above; `VISUAL-CONSTITUTION.md §4`;
  `PROPORTION-AUDIT.md §5` laws 8 and 13.
- **Reproduction**: `node AAP-probe3.mjs` → `d1440.badge.fontSize/letterSpacing/textTransform`,
  `d1440.time.family`, `d1440.target.color` vs `d1440.time.color`.
- **Cure**: pick one rung per role at the root and stop overriding at the instance. Verb =
  `text-mono-small` in a badge sized by the producer, no local type class. Timestamp = Fira,
  quiet, right-aligned as provenance. Target = the same Fira rung but *dimmer* than the verb, so
  the hierarchy is a rendered fact rather than a comment.

---

#### D-7 — Two identical pills with different matching laws, over a closed vocabulary the UI never reveals, and the one query a chronological ledger needs is missing

The toolbar offers two visually identical free-text pills (`AdminAuditPanel.vue:7-22`). Their
server semantics are not identical — `api/src/modules/admin/service/audit.ts:58-66`:

```ts
if (query.action) filter.action = query.action;            // ← exact equality
if (query.target) {
    (filter as Record<string, unknown>).target = {
        $regex: escapeRegex(query.target), $options: "i",   // ← substring, case-insensitive
    };
}
```

**Action is exact-match; Target is substring.** Nothing in the UI distinguishes them: same `size`,
same `font-mono`, same `…` placeholder idiom, adjacent. Typing `delete` into Action returns zero
rows even though five delete verbs exist; typing `delete` into Target matches anything containing
it. Two controls that look like one control and behave like two.

Worse, Action is exact-match over a **closed vocabulary of 16 verbs** enumerated at 37 emit sites:

```
$ grep -rhn "emitAuditEvent" -A3 api/src | grep -o '"[a-z][a-z0-9_.:-]*"' | sort -u
approve-color · create-tag · delete · delete-color · delete-palette · delete-tag ·
delete-user · delete-user-palettes · dismiss-flags · feature · impersonate ·
import-palettes · prune-empty-users · reject-color · set-featured · set-user-status
```

(plus the `batch-${action}-palettes` template.) A closed enum behind a free-text exact-match field
is an unguessable interface: the operator must already know the vocabulary to use the filter at
all, and a typo is indistinguishable from an empty result. glass-ui ships `Select` with
`SelectItem` — the design system already has the right primitive and the panel hand-rolls the
wrong one.

And the query a chronological ledger actually needs is absent. `AuditLogOptions`
(`demo/palettes/api/admin-audit.ts:15-22`) declares `after` and `before`, the service implements
them (`service/audit.ts:67-72`), and the panel exposes **no date range at all**. The binding
composition calls this member a "chronological event ledger with **bounded query**"
(`OPTICAL-BENCH-COMPOSITIONS.md:59`). The only bound offered is a 20-row page.

- **Severity**: MAJOR.
- **Evidence**: `AdminAuditPanel.vue:7-22`; `api/src/modules/admin/service/audit.ts:58-72`;
  the grep above; `demo/palettes/api/admin-audit.ts:15-22`; `OPTICAL-BENCH-COMPOSITIONS.md:59`.
- **Reproduction**: read the two filter branches — one is `=`, one is `$regex`.
- **Cure**: Action becomes a glass-ui `Select` over the enum (with an "any" option); Target stays
  free text and *says* it is a contains-match; add the `after`/`before` range that already exists
  on both sides of the wire.

---

#### D-8 — The field declared elastic is narrower than the field declared fixed, because an empty spacer competes with it for the same free space

`AdminAuditPanel.vue:13,21,23`:

```html
<Input … class="w-32 font-mono" />                      <!-- Action: fixed 8rem -->
<Input … class="flex-1 min-w-[6rem] font-mono" />       <!-- Target: "the wide one" -->
<div class="flex-1" />                                  <!-- ← an empty second claimant -->
```

Two `flex: 1 1 0%` items in one row. The spacer is not a spacer; it is a peer bidding for the same
free space. Measured (`AAP-probe1/2.mjs`):

| viewport | Action (fixed) | Target (elastic) | spacer | Target − Action |
|---|---:|---:|---:|---:|
| 1440 | 128.0 | **109.1** | 74.1 | **−18.9** |
| 720 (200%-zoom proxy) | 128.0 | **113.6** | 79.6 | **−14.4** |
| 390 | 128.0 | **107.5** | 72.5 | **−20.5** |
| 320 | 128.0 | **96.0** (at its min) | 14.0 | **−32.0** |

At every viewport measured the field carrying the longer content (`slug=…`, `paletteSlug=… count=…`,
`count=… slugs=…`) is **narrower than the fixed one carrying a 16-token enum**. The intent stated
in the class list is inverted by the element two lines below it. Both shipped mobile captures show
the consequence at the placeholder level: `Action .` and `Target` are clipped mid-string.

The same spacer causes the mobile wrap failure documented in §1.2: right-alignment implemented as
"an elastic void before the right cluster" does not survive `flex-wrap`, because the void stays on
line 1 and the cluster it was pushing lands flush left on line 2 (measured: count at x=33,
Refresh at x=118.5, ~210 px of unused row to their right).

- **Severity**: MAJOR.
- **Evidence**: `AdminAuditPanel.vue:13,21,23`; the table above; `AAP-probe1.json`
  `.mobile390.toolbarChildren`; shipped mobile captures.
- **Reproduction**: `node AAP-probe2.mjs` → compare `actionInput.w` and `targetInput.w` per arm.
- **Cure**: delete the spacer div and express the split structurally — `justify-content:
  space-between` on the toolbar with the filters and the status cluster as two real groups, so
  wrapping produces two honest rows instead of one orphaned cluster.

---

#### D-9 — A per-instance `h-7` fights the producer's `min-height` and loses, yielding a 28×36 portrait capsule around a 12 px glyph

`AdminAuditPanel.vue:30`:

```html
<Button variant="outline" size="sm" class="h-7 px-2" aria-label="Refresh audit log" …>
    <RefreshCw class="h-3 w-3" aria-hidden="true" />
```

Measured, identically at every viewport (`AAP-probe1.mjs`, `refreshCS`):

```
height 36px   min-height 36px   width 28px   padding 0px 8px
```

The instance asks for 28 px of height. The glass-ui Button root enforces `min-height: 36px`, which
wins. The instance's `px-2` does succeed on the inline axis. Net result: **width 28, height 36** —
a vertical capsule (`glass-capsule` rounds it fully), aspect 0.78, wrapping a 12×12 glyph. It is
visible in both shipped mobile captures as a tall pill floating beside the count, and it aligns
with nothing.

This is edict #5 verbatim ("style at the shadcn/glass root component level, never per-instance
overrides") and `PROPORTION-AUDIT.md §5` law 7 ("Visual glyph size, operable target size and
layout reservation are separate quantities. **Accessibility floors do not require bloated visible
chrome.**"). The instance tried to shrink the target because it wanted a smaller *glyph*; the
right lever is the glyph, or a producer `size` rung, never a height that the root already owns.

Related but separate: the shipped audit's `smallTapTargets` list for this route
(`REPORT.json`, all four matrices) contains four 22–23 px controls from the dock — the Refresh
button's 28×36 clears the probe's 24 px threshold but is well under a 44 px touch target on the
mobile arms, and its width axis is the constrained one.

- **Severity**: MAJOR.
- **Evidence**: `AdminAuditPanel.vue:30`; measured `refreshCS` above; shipped mobile captures;
  `PROPORTION-AUDIT.md §5` law 7; owner edict #5.
- **Reproduction**: `node AAP-probe2.mjs` → any arm's `refreshCS`.
- **Cure**: drop `h-7 px-2`, take a producer `size` rung, and if the glyph is too big, size the
  glyph.

---

#### D-10 — The loading grammar is broken twice: the shadows do not replace the rows, and they are not the shape of the rows

**(a) The `v-else-if` chain does not reach the list.** Reading `AdminAuditPanel.vue`:

```
36  <div v-if="audit.loading.value" …>            skeletons
42  <EmptyState v-else-if="audit.loadError.value" …>
56  <EmptyState v-else-if="audit.entries.value.length === 0" …>
59  <div v-for="entry in audit.entries.value" …>   ← no v-else. Unconditional.
```

The chain terminates at line 56. The entry list is therefore rendered **in every state**. While a
refresh, a filter keystroke or a page turn is in flight, the panel shows three skeleton rows
*stacked above* the still-present previous page. When the ledger errors after having loaded, the
red "The ledger is unreachable." plate renders *above* the stale rows it contradicts.

The sibling that shares the grammar does it correctly — `AdminTagsPanel.vue:85`:
`<div v-else class="flex flex-col gap-4">`. AdminAuditPanel is the one that broke the chain.

**(b) The shadow is not the shape of the row.** `AdminListSkeleton.vue:2-6` states the intent —
"shaped as the AdminListItem row grammar". But AdminAuditPanel's row is *not* AdminListItem
(see D-3). Measured side by side [replica], both injected into the live panel:

| | height | gap |
|---|---:|---:|
| `AdminListSkeleton` (line 37, wrapper `grid gap-2`) | **54.0** | **8.0** |
| real audit row (line 59, wrapper `grid gap-3`) | **73.0** desktop / **67.0** mobile | **11.9** |
| Δ | **19.0** / 13.0 per row | **3.9** per gap |

The skeleton shows a leading 8×8 swatch and a trailing 7×14 action lozenge — **neither of which
the audit row has** — and omits the badge the audit row leads with. It is a faithful shadow of a
different component. Every settle therefore moves the page: three 54 px shadows (block height
178 px) resolve into up to twenty 73 px rows (block height 1,688 px), a 1,510 px jump, on first
load and again on every 300 ms debounce tick.

- **Severity**: MAJOR.
- **Evidence**: `AdminAuditPanel.vue:36,42,56,59`; `AdminTagsPanel.vue:85`;
  `AdminListSkeleton.vue:2-19`; measurements from `AAP-probe6.mjs`.
- **Reproduction**: (a) read the template — no `v-else` on line 59; (b) `node AAP-probe6.mjs` →
  `skeletonRow.h` `54` vs `realRow.h` `73`, `skeletonGap` `8` vs `realGap` `11.9`.
- **Cure**: put the list in the chain (`v-else`), and let the shadow be generated from the same
  row anatomy the rows use — which is the D-1/D-3 cure, so one transposition closes all three.

---

#### D-11 — A hover state that promises an action the design never built

`AdminAuditPanel.vue:62` paints the row on hover. Measured live (`AAP-probe2.mjs`, `hover`):

```
rest   background-color  rgba(0, 0, 0, 0)
hover  background-color  oklab(0.871139 0.007229 0.023625 / 0.5)
       cursor            auto
       tabIndex          -1
       role              null
```

A 50%-alpha fill sweeps across the row on pointer-over. The cursor does not change. There is no
click handler, no keyboard path, no focus state, no `role`, and — per D-1 — no detail disclosure
for a click to open. The row responds to the pointer and does nothing.

`PROPORTION-AUDIT.md §5` law 5: "A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed. **Decorative controls and operable ornaments
without names are forbidden.**" PR-07: "**Hover-only/unlabeled controls** … ADD-AFFORDANCE /
REMOVE … every surviving action/drag seat has a name/state."
`VISUAL-CONSTITUTION.md §4.1`: "Focus remains visibly distinct from selection in both schemes" —
here there is no focus at all to be distinct.

The row is also inconsistent with itself: it declares `transition-colors` for a state change no
other state can reach. Either the row is interactive — in which case it needs a native named
control, a focus register, and the canon's detail disclosure — or it is data, in which case the
hover must go.

- **Severity**: MAJOR.
- **Evidence**: `AdminAuditPanel.vue:59-63`; measured hover/cursor/tabIndex above;
  `PROPORTION-AUDIT.md §5` law 5 and PR-07; `VISUAL-CONSTITUTION.md §4.1`.
- **Reproduction**: `node AAP-probe2.mjs` → `hover.pre` vs `hover.post`, and `d1440.rowCursor` /
  `rowTabIndex`.
- **Cure**: make it real. The canon already specifies the destination — "contextual event detail"
  / "detail disclosure" (`OPTICAL-BENCH-COMPOSITIONS.md:59`). One native named
  `<button type="button" aria-expanded>` spanning the row, a focus register that is distinct from
  hover, and the `payload` behind it.

---

#### D-12 — In the error state the toolbar still asserts a count, and the count is a fiction

Captured live from the real error arm (`AAP-probe5.mjs`, `errD1440light.cardText`):

```
Audit Log
View admin action history.
0 entries                       ← asserted
The ledger is unreachable.      ← contradicted
Forbidden
Retry
```

`total` initialises to `0` (`useAdminAudit.ts:36`) and is written only on success
(`:61-62`). On failure it retains whatever it was — `0` on first load, or a **stale count from a
previous successful page** on a later failure. The toolbar states it flatly, in tabular figures,
next to a red alert saying the ledger could not be read. `evidence/error-state-errD1440light.png`
shows the two claims 160 px apart.

This is the same species as D-2 — a confident zero standing in for an unknown — relocated from the
body to the toolbar. `VISUAL-CONSTITUTION.md §4.1`: "Selected, failed, pending, withdrawn and
disabled states are never colour-only. Role, accessible name, **state/value** and associated
error/status are explicit."

Two smaller things ride along in the same capture: the detail line renders the raw transport
string `Forbidden` — a server word, not an operator instruction, with no remedy — and the Retry
button is **Fraunces** (see D-16). Below the Retry there are again ~180 px of unowned card.

- **Severity**: MAJOR.
- **Evidence**: `evidence/error-state-errD1440light.png`; `AAP-probe5.mjs` `errD1440light.cardText`;
  `useAdminAudit.ts:36,61-62`; `VISUAL-CONSTITUTION.md §4.1`.
- **Reproduction**: seed `localStorage["palette-admin-token"]`, load `/#/admin/audit`, read the
  card text.
- **Cure**: a count is a *measured* value; when the measurement fails the readout goes to its
  unknown state (`—`) or leaves. Never fall back to `0`.

---

### MINOR

---

#### D-13 — Offset pagination where the binding composition says "stable cursor", with the cursor type already in the codebase

`OPTICAL-BENCH-COMPOSITIONS.md:59` result column: "Companion `0`; **stable cursor**, actor/scope/
effect and readable event density."

Shipped: `useAdminAudit.ts:53-59` sends `offset: (page.value - 1) * pageSize` against a repository
that sorts `{ timestamp: -1 }` (`api/src/modules/admin/repository/audit.ts:26-29`). On a
descending-time feed that is still being appended to, every insert between page turns shifts the
window by one, so page 2 re-shows the last row of page 1 and skips one. For an *audit* ledger,
silently skipping an event is the one failure mode that matters.

The alternative is not hypothetical: `demo/palettes/types.ts:132` already declares
`CursorPaginatedResponse<T>`, in use elsewhere in the same module. Audit did not adopt it.

- **Severity**: MINOR (BLOCKER-adjacent for an audit domain; filed MINOR because it is a
  correctness-of-window issue behind three larger blockers).
- **Evidence**: `useAdminAudit.ts:53-59`; `api/src/modules/admin/repository/audit.ts:26-29`;
  `demo/palettes/types.ts:132`; `OPTICAL-BENCH-COMPOSITIONS.md:59`.
- **Reproduction**: NONE (hypothesis at runtime — requires a live backend with concurrent writes).
  The source-level mechanism is confirmed.
- **Cure**: cursor on `(timestamp, _id)`; the response type exists.

---

#### D-14 — The timestamp drops the year and the zone, and repeats the date on every row

`demo/palettes/browser/dateFormat.ts:3-13`:

```ts
new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
```

→ `Jul 27, 04:30 PM`. No year, no timezone, no seconds. An audit trail is a legal artifact of
*when*; "Jul 27" is ambiguous across years and across the reader's and server's zones. The panel
also renders the full date on every one of up to 20 rows — measured 129.2 px per row at 1440,
`shrink-0`, in the widest column after the badge — where a chronological ledger conventionally
groups by day and prints the time only.

Also: `hour: "2-digit"` yields a variable-width `AM`/`PM` suffix in en-US, so the `tabular-nums`
on line 70 buys nothing — the column does not align.

- **Severity**: MINOR.
- **Evidence**: `dateFormat.ts:3-13`; `AdminAuditPanel.vue:70-72`; measured `time.w = 129.2`.
- **Reproduction**: read `formatTime`; the option bag has no `year` and no `timeZoneName`.
- **Cure**: day-group headers own the date; the row owns `HH:mm:ss` in Fira with a real
  `<time datetime>`; the zone is stated once per view.

---

#### D-15 — The loading region's accessible name is discarded, and the filter's result count is never announced

`AdminAuditPanel.vue:36`:

```html
<div v-if="audit.loading.value" class="grid gap-2" aria-label="Loading audit log">
```

`aria-label` on a generic `div` with no `role` is not exposed — the name is dropped. What *is*
announced is three copies of `AdminListSkeleton`'s own `role="status" aria-label="Loading"`
(`AdminListSkeleton.vue:11-12`): "Loading. Loading. Loading.", never saying what. The sibling gets
it right — `AdminTagsPanel.vue:51-56` puts `role="status" aria-label="Loading tags"` on the
wrapper and leaves the children mute.

Separately, `VISUAL-CONSTITUTION.md §5.1` binds "in-route filter, tab, selection, or pagination →
… announce **changed result count/state** through the owning status region". The count span
(line 26) has no `aria-live`. Measured live, the only live regions on the whole route are the
error plate's `role="alert"` and the *companion card's* `role="status"` — the audit count is not
among them. `PaginationBar.vue:17` does announce its page, so the grammar exists and this panel's
own count was left out of it.

- **Severity**: MINOR.
- **Evidence**: `AdminAuditPanel.vue:26-28,36`; `AdminListSkeleton.vue:11-12`;
  `AdminTagsPanel.vue:51-56`; `PaginationBar.vue:17`; `AAP-probe5.mjs` `liveRegions`;
  `VISUAL-CONSTITUTION.md §5.1`.
- **Reproduction**: `node AAP-probe5.mjs` → `errD1440light.liveRegions` lists two regions, neither
  the count.
- **Cure**: `role="status"` on the loading wrapper, mute children; `aria-live="polite"` on the
  count, which is the natural owning status region for the filter.

---

#### D-16 — The Retry control is set in the display serif

`AdminAuditPanel.vue:49`: `<Button variant="outline" size="sm" class="font-display" …>Retry</Button>`.

Measured live in the real error state (`AAP-probe5.mjs`, `errD1440light.retry`):
`fontFamily: "Fraunces"`, `fontSize: 16.4px`. Visible in `evidence/error-state-errD1440light.png`.

`VISUAL-CONSTITUTION.md §4`: "control or label, including dropdown options → `text-small` ·
**Plus Jakarta Sans, non-bold**". Fraunces is bound to display/identity only. The matrix is
declared "closed across all eighteen compositions" with exactly one named exception (P019's Picker
pair), which this is not. It is also another per-instance override of a glass-ui root (edict #5).

- **Severity**: MINOR.
- **Evidence**: `AdminAuditPanel.vue:49`; measured `retry.fontFamily`;
  `evidence/error-state-errD1440light.png`; `VISUAL-CONSTITUTION.md §4`.
- **Reproduction**: `node AAP-probe5.mjs` → `errD1440light.retry.fontFamily === "Fraunces"`.
- **Cure**: delete `font-display`; the Button root already carries the control rung.

---

#### D-17 — Machine strings are not bidi-isolated

`VISUAL-CONSTITUTION.md §6.1`: "CSS strings, hex, **slugs, IDs and provenance** → render in
**LTR-isolated spans** inside RTL prose." §5.2, last row, repeats it for "CSS direction keywords,
physical axes, code, hex, slug, ID".

`AdminAuditPanel.vue:76-78` renders `entry.target` — literally `slug=…`, `id=…`, `name=…`,
`count=… slugs=…` — in a bare `<span>` with no `dir="ltr"`, no `<bdi>`, no isolation. Same for the
action badge and the timestamp. Measured in the RTL arm (`AAP-probe2.mjs`, `rtl1440`): the row
mirrors (badge at x=997.2, target starting at x=708.5) and the machine strings ride the mirrored
flow with no isolation attribute anywhere in the subtree.

- **Severity**: MINOR.
- **Evidence**: `AdminAuditPanel.vue:67-78`; `AAP-probe2.mjs` `rtl1440`;
  `VISUAL-CONSTITUTION.md §5.2, §6.1`.
- **Reproduction**: `node AAP-probe2.mjs` (the `rtl1440` arm sets `dir="rtl"` on
  `documentElement`); no `dir`/`bdi` exists in the row.
- **Cure**: `<bdi>` (or `dir="ltr"`) around target, action and timestamp — one change, all three.

---

#### D-18 — 209 px of unowned card beneath the empty plate

Measured at 1440 in the clean (uninjected) state (`AAP-probe1.mjs`):

```
empty-state message  y=503.2  h=35.6   → bottom 538.8
card                 y=232.0  h=515.8  → bottom 747.8
unowned interval                        209.0 px  (40.5% of card height)
```

At 390 the same interval is 61 px; at 320 the message wraps to two lines and the interval closes.
So the void is a desktop-only artifact of a card that neither hugs its content nor fills the
interval with anything.

`PROPORTION-AUDIT.md §5` law 1 — "A Card houses one bounded object/specimen. A page region, empty
column, inner stage or mere padding group does not become a Card by default." §5 law 3 —
"Renderer, icon or touch footprints may reserve collision space **only on the axis where collision
exists**." Nothing here reserves the 209 px; it is left over from the equal-card matrix that
PR-04/D-5 already condemns.

- **Severity**: MINOR (it largely dissolves when D-5 is cured).
- **Evidence**: measurements above; shipped `safari-desktop-light/admin-audit.png`.
- **Reproduction**: `node AAP-probe2.mjs` → `d1440.before.card` and the empty block rect from
  `AAP-probe1`.
- **Cure**: content-hug the Admin card, or let the full-width ledger of D-5 fill the band.

---

#### D-19 — The debounce outlives the component, responses are unsequenced, and no control is ever disabled while a request is in flight

Three small things with one root: the panel has no request lifecycle.

```ts
110  let filterTimeout: ReturnType<typeof setTimeout>;
111  watch([audit.actionFilter, audit.targetFilter], () => {
112      clearTimeout(filterTimeout);
113      filterTimeout = setTimeout(() => { audit.page.value = 1; audit.loadAuditLog(); }, 300);
114  });
```

- **No `onUnmounted`.** Navigate away within 300 ms of a keystroke and the timer still fires,
  issuing an admin fetch from a destroyed component.
- **No sequencing.** `useAdminAudit.ts:60-62` does `entries.value = res.data` unconditionally,
  with no `AbortController` and no request token. Type a character, turn a page, and whichever
  response lands last wins — which may be the older one.
- **Nothing disables.** Refresh (line 30) has no `:disabled="audit.loading.value"`; the filters
  stay live during a load and during an error. The sibling does gate its action —
  `AdminTagsPanel.vue:42` `:disabled="… || tagsApi.creating.value"` — so the convention exists.

- **Severity**: MINOR.
- **Evidence**: `AdminAuditPanel.vue:30,110-119`; `useAdminAudit.ts:60-62`;
  `AdminTagsPanel.vue:42`.
- **Reproduction**: source-level; the three guards are absent.
- **Cure**: one `useAsyncTask`-shaped owner in `useAdminAudit` that carries `pending`, aborts the
  previous request, and exposes the disabled state the toolbar should bind to.

---

### INFO / HYPOTHESIS

---

#### D-20 — [HYPOTHESIS] Under forced colors the action badge should lose its only differentiator

`demo/styles/foundation.css:665-678` declares the two-tier WHCM policy: tier 1 keeps author colors
on named colour-*display* surfaces; **tier 2 — chrome stays at the UA default `auto`** and adopts
`Canvas`/`CanvasText`/`ButtonFace`. The audit row is chrome.

Structural fact, measured: the badge's entire visual identity is `background-color:
var(--secondary)` (`rgb(237,230,222)` light, `rgb(47,40,35)` dark). Its class list contains **no
border utility**, and `grep -o "\.badge-atom[^{]*{[^}]*}" node_modules/@mkbabb/glass-ui/dist/glass-ui.css`
returns **nothing** — `badge-atom` is a marker class with no CSS rule. So when the UA substitutes
`Canvas` for author backgrounds, the badge fill becomes the row fill and the verb stops being a
distinct object. The row box survives (borders repaint to `CanvasText`); the verb does not.

I am filing this as a hypothesis because I could not confirm the substitution: WebKit reported
`matchMedia("(forced-colors: active)").matches === true` while returning byte-identical computed
colors to the normal arm (`AAP-probe2.mjs`, `fc1440` vs `d1440`). The emulation matched the query
without repainting, so my measurement proves nothing about UA behaviour.

- **Severity**: INFO (hypothesis).
- **Reproduction**: NONE — needs a real Windows High Contrast session or a Chromium
  forced-colors run.
- **Cure if confirmed**: give the badge a `border` (which also survives print), or select it into
  the tier-1 roster.

---

#### INFO-1 — Reduced motion, measured

`matchMedia("(prefers-reduced-motion: reduce)")` matched. The row's transition resolved to
`opacity, color, background-color, border-color, box-shadow` at **0.1 s** — not to the
`0.01ms !important` of the global guard at `demo/styles/animations.css:184-192`, so a later
carve-out is winning. A 0.1 s colour fade under `reduce` is defensible (`VISUAL-CONSTITUTION.md
§6`: "Reduced motion resolves directly to the final geometry and **stable chromatic state**" — the
geometry does not move). **Not filed as a defect.** Recorded because it means the component's own
`duration-fast` is not authoritative in that arm, and because the animation register here is a
global inheritance, not a component decision — the component adds no keyframes and deletes none
(edict #6 satisfied).

#### INFO-2 — Edicts satisfied

- **#1 no god modules** — the panel is 120 lines and delegates state to `useAdminAudit`. Clean.
- **#2 no legacy code** — no shim, alias, dual path or back-compat fallback. Clean.
- **#3 KISS** — no new `shared/` dir, no invented wrapper. Clean. (It hand-rolls a row that
  already exists, which is the opposite failure — see D-3.)
- **#8 `verbatimModuleSyntax`** — `AdminAuditPanel.vue:95-104` imports only values; the sole type
  usage (`ReturnType<typeof setTimeout>`, line 110) needs no import. Clean.

#### INFO-3 — What the shipped visual audit could not see

`REPORT.json` records `overflowX: 0` and `pageErrors: 0` for `/#/admin/audit` in all four
matrices, and the route is not flagged. Both facts are true and both are misleading: the panel's
zero state is the only state the capture could reach (D-2), and the populated state's overflow is
clipped *inside* the card by `overflow-x: hidden` (D-3), which a document-level overflow probe
cannot detect. Worth carrying into the visual-audit methodology: route probes need a populated
fixture and a per-container overflow check, not only `documentElement.scrollWidth`.

---

## 4. Family grouping

Five of the six most serious findings share one mechanism: **the row was hand-rolled instead of
composed from the one review-row anatomy the canon mandates.**

```
hand-rolled row  ──┬── D-1   no slot for actor / scope / effect / detail disclosure
                   ├── D-3   min-w-0 dropped → track blowout → clipping → toolbar destroyed
                   ├── D-4   four-sided box instead of one adjacent-row separator
                   ├── D-6   local type classes fighting producer rungs
                   └── D-10b the shared skeleton is the shadow of a different shape
```

`AdminListItem.vue` exists. Exactly **one** of the five Admin panels imports it
(`AdminNamesPanel.vue:128`); Audit, Flagged, Tags and Users each re-invent the row. The single
transposition that closes this column is not five patches — it is composing the anatomy that is
already in the tree, and giving it the actor slot the canon has been asking for since PR-11.

The remaining three families are independent: the auth-arm false-empty (D-2, D-12 — a confident
zero standing in for an unknown), the toolbar's flex idiom (D-8, D-9 — instance overrides fighting
producer roots), and the route composition (D-5 — a registered PR-04 row still shipping).

---

## 5. Verdict

**DEFECTIVE.** The component is competently written, carefully commented, and wrong at the level
the comments are proudest of. It states "error ≠ empty" and then ships the empty for the
unauthenticated arm. It states "primary / secondary hierarchy" and renders both at 16.4 px in the
same colour. It states "one grammar" for the loading shadows and shows them stacked on top of the
rows they were meant to replace. And it is an audit log that cannot name an actor — which the
canon has required in three separate binding documents since the register was written.

**Strongest defect: D-1.** The others degrade the ledger; D-1 means there is no ledger. A record of
what happened, with no record of who made it happen, does not do the one job the route exists for,
and the design has no slot to put the answer in even though the answer is already arriving on the
wire.
