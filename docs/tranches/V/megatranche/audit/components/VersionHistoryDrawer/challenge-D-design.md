# CHALLENGE-D — `VersionHistoryDrawer.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the model this
seat was explicitly spawned with. Declared, not inherited. No seat defect.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The premise is correct and understates the case. This component's design is not merely
mis-proportioned: **its primary read fails on first use, its primary action is invisible,
unreachable on touch, unconfirmed, and destructive, and after that action fires the panel
displays a version history that is factually false.**

Three of its four per-instance style overrides are inert dead CSS that have never once
applied. Its three data states (loading, empty, error) render one identical blank panel.
Its entire colour payload — the only reason a *palette* version history exists — renders as
black circles under forced colors.

Everything below is measured on the live app in real WebKit, with pasted numbers.

---

## §0. Method and evidence base

The megatranche visual audit (`audit/visual/REPORT.md`, 60 route captures + 30 state
captures) contains **zero** frames of this component: it is an interaction-gated overlay, no
capture opens it, and `grep -ic version REPORT.json STATES.json` → `0`, `0`. The only
existing test that opens it (`e2e/smoke/oracles/o10d-display-voice-census.spec.ts:326`)
mocks `{data: [], total: 0}` and asserts one font-family. **This component has never been
looked at.** That is finding **D-21** and it is why every defect below is new.

So I built the frames. A second, isolated Vite server was started on `:9111` with
`VITE_API_URL` pointed at its own origin (the same device the e2e config uses at
`playwright.config.ts:121`) — the user's `:9000` server was left untouched. The prod API
default (`demo/platform/transport/client.ts:37`) trips the `misconfigured` latch on
loopback, which short-circuits every fetch before `page.route` can see it; that is why the
`/#/browse` capture in the visual audit reads "The commons is unreachable."

Probes, all committed under `evidence-D/`:

| file | what it establishes |
|---|---|
| `evidence-D/probe.json` | 11 WebKit arms, first-open state |
| `evidence-D/probe2.json` | first-vs-second open, 8 populated matrices, error/slow, hover, tab order |
| `evidence-D/probe3.json` | keyboard focus with pointer parked, cascade-layer proof, revert behaviour, reduced-motion, forced-colors |
| `evidence-D/*.png` | 38 real WebKit/Chromium frames (desktop/mobile/320/RTL/dark/reduced-motion/forced-colors/zoom) |

Fixture: 24 versions, page size 20, one 14-colour version, one 1-colour version, one
85-character name, one forked version, `currentHash` = newest.

---

## §1. Defect register

| ID | Defect | Sev | Family |
|---|---|---|---|
| D-01 | The drawer's **first open always renders blank** — no request is ever issued | BLOCKER | state |
| D-02 | Revert is `opacity: 0` at rest, revealed **only** by `group-hover`, which is compiled inside `@media (hover: hover)` — **permanently invisible on every touch device**, and clickable while invisible | BLOCKER | action |
| D-03 | A **keyboard-focused Revert is invisible**: measured `opacity: "0"` with the pointer parked off-panel; the focus ring paints inside the zeroed opacity | BLOCKER | action |
| D-04 | Revert is destructive, irreversible, and fires on one click with **zero confirmation** | BLOCKER | action |
| D-05 | After revert the list is **never refetched**; the panel then shows a *newer* version above the current one and hides the revert commit — a false history | BLOCKER | truth |
| D-06 | **loading ≡ empty ≡ error ≡ first-open**: four distinct states render one identical blank panel reading "— 0 versions" | MAJOR | state |
| D-07 | `w-[380px]`, `sm:max-w-[420px]` and `h-7` are **inert dead CSS** — glass-ui ships unlayered CSS which outranks every Tailwind `@layer utilities` rule | MAJOR | design system |
| D-08 | Under forced colors **every swatch renders black** — the entire colour payload dies; current-vs-other row delta measured **0** on every surface property | MAJOR | forced-colors |
| D-09 | 23 of 24 rows reserve a **44.0px invisible band** (34% of row height) for the hidden button; the current row does not — the vertical rhythm is broken by design | MAJOR | proportion |
| D-10 | Version identity is the positional expression `total - i`, not the record's own `depth` — it goes wrong the moment `total` moves | MAJOR | truth |
| D-11 | Three semantic roles (ordinal, provenance, palette identity) collapse onto **one identical 11px Plus Jakarta Sans setting**; `text-micro` is not in the §4 closed matrix at all | MAJOR | type |
| D-12 | The side sheet **does not mirror in RTL** (measured `x = 1056` in both directions) while the whole page does | MAJOR | direction |
| D-13 | In RTL: `+6` reads `6+`; `Forked from cccccccc...` reads `...Forked from cccccccc`; the long name truncates from the wrong end; the current-marker bar stays physically left | MAJOR | direction |
| D-14 | Below `40rem` the header is **centre-aligned over a left-aligned body** (producer `text-center sm:text-left`), and `justify-between` wraps into rag | MAJOR | mobile |
| D-15 | The producer's `scroll` axis is unused (`data-scroll = null`); the component hand-rolls a second scroll container inside the producer's flex region | MAJOR | design system |
| D-16 | Colour swatches are hand-rolled `div.rounded-full` — a second swatch species competing with the constitution's `WatercolorDot`; unnamed and not `aria-hidden` | MAJOR | design system |
| D-17 | `useVersionHistory` exposes 7 members with **zero consumers**; the drawer re-implements 5 of them locally | MAJOR | duplication |
| D-18 | No list semantics, no `<time>`, no live region, no status role anywhere in the panel | MAJOR | semantics |
| D-19 | Hover replaces the **opaque** `bg-well` with a 50%-alpha accent, breaking the well law the codebase cites this component as the exemplar of | MINOR | material |
| D-20 | The row name line is rendered unconditionally under a comment claiming "(if different from current)" — pure duplication in the common case | MINOR | proportion |
| D-21 | Zero visual-audit coverage; the only e2e that opens it mocks the empty case and asserts one font | INFO | evidence |

---

## §2. The state-coverage collapse

### D-01 — the first open is always blank (BLOCKER)

`VersionHistoryDrawer.vue:158-167`:

```js
watch(
    () => open,
    (isOpen) => {
        if (isOpen && paletteSlug) { /* … loadVersions() … */ }
    },
);
```

No `{ immediate: true }`. `BrowsePane.vue:157-158` mounts the component with
`v-if="versionPalette"` and sets `versionPalette` and `versionDrawerOpen = true` in the same
tick (`BrowsePane.vue:272-275`). The component is therefore **created with `open` already
`true`**. A `watch` on a value that never changes never fires.

Measured — `evidence-D/probe2.json`:

```
firstOpenVersionRequests  = ["…/demo/palettes/api/versions.ts"]        ← module fetch only
firstOpen.rowCount        = 0
firstOpen.bodyText        = "Version HistoryCensus Palette — 0 versionsClose"

secondOpenVersionRequests = [… , "http://localhost:9111/palettes/census-palette/versions?limit=20&offset=0"]
secondOpen.rowCount       = 20
secondOpen.bodyText       = "… Census Palette — 24 versions v24 (current) …"
```

Frame: `evidence-D/A1-first-open.png` — an 840px-tall empty sheet whose own description says
"0 versions" while the palette card three inches to its left displays the badge **24**.
Frame: `evidence-D/A2-second-open-populated.png` — the same drawer, after Escape + reopen,
fully populated.

`versionPalette` is never cleared on close, so the component stays mounted and every
*subsequent* open works. The failure is exactly the one a developer never sees, because a
developer always opens it twice.

**Reproduction.** `node scratchpad/vhd-probe2.mjs <out>` against a Vite server with
`VITE_API_URL` same-origin; compare `firstOpen` / `secondOpen`. Or by hand: load
`/#/browse`, open any versioned palette's menu → Versions. Blank. Escape. Versions again.
Populated.

### D-06 — four states, one blank panel (MAJOR)

There is no empty state, no error state, and the loading state is a bare unlabelled glyph.

| state | measured render |
|---|---|
| first open | `rowCount 0`, `"— 0 versions"`, no spinner |
| true empty (`total: 0`) | `rowCount 0`, `"— 0 versions"` |
| HTTP 500 | `rowCount 0`, `"— 0 versions"`; console: `Failed to load versions: ApiProblem: Internal Server Error` |
| loading (in flight) | `rowCount 0`, `"— 0 versions"`, one spinning icon |

(`evidence-D/probe2.json` → `firstOpen`, `empty-desktop-light`, `C1-error`, `C2-slow-loading`;
`C1-error.png`, `C2-slow-loading.png`.)

The user cannot distinguish "this palette has one version" from "the server is down" from
"the drawer forgot to ask". `useVersionHistory.ts:56-62` swallows the failure into
`console.warn` and returns `undefined`; the drawer's `if (!page) return` (`:141`) then leaves
`total` at 0 while `finally` clears `loading` — so a 500 renders as a confident, quiet zero.

The description line is complicit: `{{ total }} version{{ total === 1 ? "" : "s" }}`
(`:11`) **asserts a count before the count is known**. During loading and after an error it
publishes "0 versions" as fact.

This codebase has a named law against exactly this, in a component `BrowsePane.vue` already
imports. `demo/shared/ui/EmptyState.vue:2-13`:

> `S.W5-5: TWO species, never conflated (SYNTHESIS §2.4 — loading ≠ empty, error ≠ empty).`

It ships an `error` variant with `role="alert"`, a machine-truth detail line and a Retry
action slot, and an `empty` variant with `role="status"`. Ten demo files consume it. The
drawer conflates all three and uses neither.

### D-06b — the loading state has no content under reduced motion

`evidence-D/probe3.json` → `reducedMotionLoading`:

```
spinnerPresent      : true
animationName       : "spin"
animationDuration   : "0.00001s"     ← the global reduced-motion step freezes it
animationPlayState  : "running"
spinnerAria         : { ariaLabel: null, role: null, parentRole: null, parentAriaLive: null }
bodyText            : "Version HistoryCensus Palette — 0 versionsClose"
```

Under `prefers-reduced-motion: reduce` the loading affordance is a **motionless, unnamed,
unannounced glyph** — a dot. VISUAL-CONSTITUTION §6: *"Reduced motion resolves directly to
the final geometry and stable chromatic state."* A spinner has no final state; it needed a
textual or determinate substitute. PROPORTION-AUDIT **PR-08** already books this family
(*"Pending/failure/export/recovery truth only transient → ADD-AFFORDANCE"*).

Separately: the route's own established loading grammar is the request-bound skeleton
(`PaletteCardSkeleton variant="developing"`, VISUAL-CONSTITUTION §7 *"Request-bound skeletons
exist only while real work is in flight"*). A full-panel spinner that jumps to 20 rows is
both off-grammar and a guaranteed layout jump.

---

## §3. The invisible destructive control

This is the worst thing in the file, and it is four defects wearing one coat.

`VersionHistoryDrawer.vue:75-84`:

```html
<Button v-if="version.hash !== currentHash" variant="outline" size="sm"
        class="mt-2 h-7 text-caption opacity-0 transition-opacity group-hover:opacity-100"
        @click="$emit('revert', version.hash)">
```

### D-02 — unreachable on touch (BLOCKER)

The *only* rule in the entire cascade that raises this button's opacity is, verbatim from
`node_modules/@mkbabb/glass-ui/dist/styles/components.css`:

```css
@media (hover:hover){.group-hover\:opacity-100:is(:where(.group):hover *){opacity:1}}
```

On a device reporting `hover: none` — every phone and tablet — **that rule does not exist**,
and no other rule ever sets a non-zero opacity. The button is `opacity: 0` forever.

Measured at rest, desktop, populated (`probe2.json → secondOpen.revertButtons`):

```
{ w: 90, h: 36, opacity: "0", pointerEvents: "auto", transition: "opacity 0.2s …" }
```

`pointerEvents: "auto"` at `opacity: 0` — **an invisible, tappable, destructive control**.
A touch user who happens to tap the 90×36 dead-looking band below a version's swatches
rewrites the palette's history.

*(Caveat, stated per evidence law: Playwright's mobile arms emulate viewport, not the `hover`
media feature, so my `B2/B3/B4` frames still report `hover: hover`. The touch consequence is
CONFIRMED from the compiled CSS above — the media query is the mechanism — not from a driven
touch device.)*

### D-03 — invisible to the keyboard too (BLOCKER)

`probe3.json → keyboardFocusOnRevert`, with the pointer explicitly parked at `(5, 890)`,
far off the panel:

```json
{ "tag": "BUTTON", "text": "Revert", "inDialog": true,
  "opacity": "0", "visibility": "visible",
  "rect": { "w": 90, "h": 36, "top": 284 }, "inViewport": true,
  "boxShadow": "rgba(255,255,255,0.3) 0px 1px 0px 0px inset, …" }
```

The **first Tab stop inside the dialog** is a destructive button with `opacity: 0`. glass-ui's
Button root already carries `focus-ring` (measured `revertClass` includes it, and the focus
box-shadow is present) — but `opacity: 0` on the element zeroes its own box-shadow too. The
focus indicator is painted and then erased by the consumer's own class.

WCAG 2.4.7 (A) and 2.4.11 (AA) both fail. The fix already exists in the loaded utility set:
`.focus\:opacity-100:focus{opacity:1}` is generated and shipped in the same
`components.css`. It was simply not used.

Also measured, deterministically over two independent runs (4/4 and 5/5 presses): focus
**alternates out of the dialog** — `BUTTON(Revert) → BODY → BUTTON(Revert) → BODY`, with
`inDialog: false` on the BODY stops. Half the tab stops inside a modal land on nothing.
*(Labelled PLAUSIBLE, WebKit-only; not reproduced in Chromium.)*

### D-04 — no confirmation (BLOCKER)

`probe3.json → revertBehaviour.stateAfter.confirmationDialogs = 0`.

One click on an invisible button issues `POST /palettes/census-palette/revert` and rewrites
a published palette's history. VISUAL-CONSTITUTION §5 grammar is *select → tune → commit*;
§7 requires *"dangerous confirmation"* for the review suite. This is a destructive commit
with no select step, no confirm step, and no undo.

### D-09 — the 44px hole (MAJOR)

Because the button is `opacity: 0` rather than absent, it stays **in flow**. Measured row
heights, `probe3.json → typeCensus.rowHeights`:

```
[85.5, 129.5, 129.5, 129.5, 129.5, 129.5]
       ^^^^^ every non-current row
 ^^^^ the current row (no Revert button)
```

Exactly **44.0px** — `h-9` (36) + `mt-2` (8) — of invisible reserved band on 23 of 24 rows,
**34.0% of each row's height**, and none on the 24th. The result, plainly visible in
`evidence-D/B1-desktop-dark.png`: every row but the top one ends in an unexplained void, and
the list has two different rhythms for no reason a viewer can perceive.

This is PROPORTION-AUDIT's own PR-01 mechanism — *"unconditional two-line/bottom-aligned …
reservation"* — reappearing in a component nobody audited. §5.3 is explicit: *"Renderer, icon
or touch footprints may reserve collision space only on the axis where collision exists."*
§5.5: *"A small icon/mark is either data, status, labeled action, drag affordance,
focus/selection register or removed. Decorative controls and operable ornaments without names
are forbidden."*

And PROPORTION-AUDIT **PR-07** names this species by hand:

> `Hover-only/unlabeled controls and invisible drag state` → **ADD-AFFORDANCE / REMOVE** …
> *every surviving action/drag seat has a name/state*

VISUAL-CONSTITUTION §5 repeats it: *"The card body owns no expand, inline rename, action
menu, transient result or **hover-only swatch-action path**."*

---

## §4. The panel tells lies after you use it

### D-05 — no refetch after revert (BLOCKER)

`probe3.json → revertBehaviour`, after clicking Revert on `v23`:

```json
"requestsAfterRevert": ["POST /palettes/census-palette/revert"],
"stateAfter": {
  "drawerClosed": false,
  "rowCount": 20,
  "description": "Census Palette — 24 versions",
  "labels": ["v24", "v23 (current)", "v22", "v21"],
  "confirmationDialogs": 0
}
```

**Exactly one request.** No `GET …/versions` follows. The mocked server returned
`versionCount: 25` and a new `currentHash`; the drawer's local `versions`/`total` are
untouched because the only call sites of `loadVersions` are the (never-firing) `open` watch
and `loadMore`.

The rendered result is a history that cannot exist: **`v24` sits above `v23 (current)`**. In
an append-only version log the current version is by definition the newest. The panel now
claims the user is "on" an older version while a newer one still exists ahead of it, and the
revert commit itself — the thing that just happened — is nowhere. Frame:
`evidence-D/F2-after-revert.png`.

`BrowsePane.vue:277-285` reassigns `versionPalette.value = updated`, which moves the
`currentHash` prop and therefore the ring — but nothing re-reads the list. The `(current)`
marker walks *backwards* through a monotone history.

### D-10 — version identity is a paging artefact (MAJOR)

`:37` — `v{{ total - i }}`.

The record carries a real server ordinal: `PaletteVersion.depth` (`demo/palettes/types.ts:76`).
It is never read. Instead the label is computed from `total` (a mutable count) and `i` (the
index in whatever pages happen to be loaded). Two consequences:

- the moment `total` moves — as it does after this drawer's own Revert — every label is
  wrong (D-05 above measures precisely this);
- `loadMore()` pages by `versions.value.length` (`:154`), so if the server appended a version
  between page 1 and page 2 the offset window shifts by one and page 2 either **repeats** a
  record (duplicate `:key="version.hash"` → Vue duplicate-key warning) or **skips** one.
  *(Hypothesis — I did not drive an append-during-paging race; the offset arithmetic at
  `:140,154` is the mechanism.)*

VISUAL-CONSTITUTION §6.1: *"palette/release order | **preserve explicit ordinal identity**".*
A label recomputed from a cursor is not an identity.

---

## §5. Three dead style overrides — and why "root-level styling" is a correctness law here

### D-07 (MAJOR)

`:3` — `class="w-[380px] sm:max-w-[420px] flex flex-col"`; `:79` — `class="mt-2 h-7 …"`.

Measured on the live element (`probe3.json → widthCascade`, `probe4`):

| declared | intended | **measured** | why |
|---|---|---|---|
| `w-[380px]` | 380px | **384px** | producer `:where([data-placement="right"]){width:75%}` + `{max-width:24rem}` |
| `sm:max-w-[420px]` | 420px | **384px** | same |
| `h-7` (Revert) | 28px | **36px** | producer `.button` height |

The utilities are **not missing**. A synthetic probe div proves they generate correctly:

```
utilityExists : { "w380": "380px", "smMax420": "420px" }   ← same document, same stylesheet
h7ProbeHeight : "28px"
heightRules   : [ { "layer": "utilities", "sel": ".h-7", "h": "calc(var(--spacing) * 7)" } ]
```

Yet the dialog computes `width: 384px, maxWidth: 384px` and the button computes `36px`.

The mechanism is **cascade layers**. Measured layer order:

```
layerOrder : ["properties","theme","base","components","utilities", …]
```

and the winning rules:

```json
{ "layer": "(unlayered)", "sel": ":where([data-slot=\"dialog-content\"][data-placement=\"right\"])",
  "css": "top:0; bottom:0; right:0; height:100%; width:75%;" },
{ "layer": "(unlayered)", "sel": ":where(…placement=\"left\"]), :where(…placement=\"right\"])",
  "css": "max-width:24rem;" }
```

glass-ui's `dist/components/dialog/placement.css` is imported **unlayered**. In CSS, an
unlayered declaration beats *every* layered one regardless of specificity — so a `:where()`
selector at specificity `0,0,0` defeats `.w-\[380px\]` at `0,1,0` because the latter lives in
`@layer utilities`.

The consequences are worth stating plainly:

1. **The drawer's declared width contract has never once applied.** The 380–420px sheet the
   author designed does not exist. Every frame ever shipped is the producer default: 75% on
   mobile, 24rem on desktop. This has been live since `f2c8f565` (glass-ui 7.0.0 adoption)
   and its ancestor `a61094e3`.
2. **Edict 5 is not a style preference in this codebase — it is a correctness requirement.**
   "Style at the shadcn/glass root component level, never per-instance overrides" is true
   here because per-instance box-model overrides on glass-ui side sheets *silently do
   nothing*. Three of this file's four sizing overrides are dead code (edict 2: no dual
   paths, no dead paths).
3. The relay to glass-ui writes itself: side-sheet placement needs a `size` axis on
   `DialogContent`, or the placement CSS needs to move into a layer consumers can outrank.

### D-15 — the producer's scroll axis is ignored (MAJOR)

`DialogContent` publishes a `scroll` prop; for side placements it stamps `data-scroll`, and
`placement.css` then gives `[data-slot="dialog-content-region"]` its `max-block-size` and
`overflow-y: auto`. Measured: `dataScroll = null`. The consumer never passes it. Instead
`:15` hand-rolls `mt-4 flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin`
*inside* the producer's already-flex-column region — a second scroll container nested in the
first, plus a `flex flex-col` on the content root that the producer's region already
provides. Measured: `scrollCandidates: 1` active, `regionCss.overflowY: "visible"`. It
happens not to break; it is still the design system being routed around by hand.

### D-16 — a second swatch species (MAJOR)

`:52-57` renders palette colour as `div.h-5.w-5.rounded-full.border.border-background` with
an inline `background-color`. Measured a11y:

```
swatchA11y : { ariaHidden: null, role: null, title: null, tag: "DIV",
               inlineStyle: "background-color: rgb(225, 29, 72);" }
```

VISUAL-CONSTITUTION §2 material tier 5 names exactly one colour-bearing ornamental species:
*"Watercolor/data | swatches, active mark, pastel `Palettes` identity | **the only** ornamental
colour-bearing species"*. §4.2 requires ornamental faces be `aria-hidden` and data-bearing
faces be *"noninteractive **named** list/text content"*. These are neither: anonymous to AT,
and not hidden from it.

The border token is wrong too: measured `borderColor: rgb(251,250,248)` (`--background`)
sitting on a well measured at `oklab(0.913299 0.005463 0.013024)`. The ring is *brighter*
than the surface it is cut from, so each dot wears a visible white halo instead of reading as
carved out of the plate. In dark mode the same token is near-black on a dark well — the same
mismatch with the sign flipped.

### D-19 — the hover state breaks the well law (MINOR)

`demo/DESIGN.md:98` cites this component by name as a canonical `bg-well` consumer:

> **WELL** — *an **opaque** tone-step of the plate, NO backdrop-blur (**nothing live sits
> behind an in-plate fixture**…)* … *VersionHistoryDrawer rows*

Two problems, both measured.

First, the precondition is false here. The host is not a plate: `sheetSurface.bg =
oklab(0.903539 0.015313 0.014228 / **0.705088**)` — a 70.5%-alpha glass sheet over the live
ambient field. Live content *does* sit behind. Frames `A2` and `B1` show the page's own
copy — "No saved palettes y…", "Add colors above, then sav…" — legible **through** the panel
at its inner edge. A data panel is being read against a moving background.

Second, `hover:bg-accent/50` (`:25`) *replaces* the opaque well with a translucent one:

```
row at rest : "oklab(0.913299 0.005463 0.013024)"          ← opaque
row hovered : "oklab(0.871139 0.007229 0.023625 / 0.5)"    ← 50% alpha
```

Hovering a row makes it *more* transparent, i.e. the affordance that is supposed to say
"this row is live" makes it harder to read.

---

## §6. Type — the closed matrix is not being spoken

`probe3.json → typeCensus`:

| element | size | family | weight | role per VISUAL-CONSTITUTION §4 | correct? |
|---|---|---|---|---|---|
| `Version History` | 20.35px | **Fraunces** | 500 | display voice | ✅ |
| `Census Palette — 24 versions` | 14px | Plus Jakarta Sans | 400 | prose/help | ✅ |
| `v24 (current)` | **11px** | **Plus Jakarta Sans** | 500 | value/ordinal → `text-mono-small`, **Fira Code** | ❌ |
| `Mar 26 at 12:30 AM` | **11px** | **Plus Jakarta Sans** | 400 | provenance → `text-mono-small`, **Fira Code** | ❌ |
| `Census Palette` (row name) | **11px** | **Plus Jakarta Sans** | 400 | palette identity → `--type-subheading`, **Fraunces** | ❌ |
| `Revert` | **14.38px** | Plus Jakarta Sans | 400 | control → `text-small` | ~ |
| `Load older versions` | 14.38px | Plus Jakarta Sans | 400 | control | ~ |

Three findings fall out of that table.

**D-11a — one size for three roles.** Ordinal, provenance and identity all render at
`11px / 13.75px / Plus Jakarta Sans`. The *only* differentiators are `font-weight` and
`color`. VISUAL-CONSTITUTION §4.1: *"Selected, failed, pending, withdrawn and disabled states
are never colour-only."* Inside a row there is no hierarchy at all — every string has equal
optical weight, which is why the populated frames read as undifferentiated grey text soup.

**D-11b — `text-micro` is off-matrix.** `.text-micro{font-size:var(--type-micro)}` resolves
to 11px. §4's matrix — *"This matrix is closed across all eighteen compositions"* — contains
`text-display`, `--type-title`, `--type-subheading`, `text-heading`, `text-prose`,
`text-small`, `text-mono-small`/`mono-caption`. `--type-micro` is not among them. The entire
body of this panel is written in a size the constitution does not sanction.

**D-11c — inverted hierarchy.** The invisible button's label (14.38px) is **31% larger** than
the data it acts upon (11px). The one thing you cannot see is set larger than everything you
can.

The `tabular-nums` on the timestamp (`:40`) is the tell: the author wanted a monospaced
numeric register and reached for a numeric font-feature on a humanist face instead of the
Fira Code role the matrix assigns. Also: the format (`dateFormat.ts:1-13`,
`{month, day, hour, minute}`) carries **no year** — a history spanning years is
indistinguishable — and emits no `<time datetime>` element (`timeSemantics: 0`).

`Forked from cccccccc...` (`:71`) is a truncated hash with literal ASCII ellipsis, in the
prose face, not in a `<code>`/mono span, not LTR-isolated, not a link, and not resolvable to
anything. It is a dead-end string that reads as placeholder text.

---

## §7. RTL — the panel does not turn around

Frame: `evidence-D/B5-rtl-desktop.png`, viewport 1440×900, `dir="rtl"`.

**D-12 — the sheet stays physically right.** Measured `contentRect.x = 1056` in **both**
LTR and RTL. The whole page mirrors around it; the drawer does not. VISUAL-CONSTITUTION §6.1:
*"chrome, navigation and layout | logical inline/block direction follows the document."*
`placement="right"` is a physical axis, and `placement.css` has only physical arms
(`right: 0`, `rounded-l-dialog border-l`), so this is a producer gap the consumer selected
into without noticing. In RTL the "trailing" drawer now opens from the reading *start*.

**D-13 — five direction defects visible in one frame:**

1. **Header and body disagree.** "Version History" and "Census Palette — 24 versions" stay
   left-aligned while every row flips right. `DialogHeader`'s compiled class is
   `"flex flex-col gap-y-1.5 text-center sm:text-left"` — `text-left` is a physical keyword
   that does not mirror. In RTL *every glass-ui dialog header* is misaligned against its own
   body. Producer defect, inherited unnoticed.
2. **`+6` renders `6+`.** The `+` is bidi-neutral and resolves to the trailing side. A count
   affordance that reads backwards.
3. **`Forked from cccccccc...` renders `...Forked from cccccccc`.** The hash is not
   LTR-isolated. §6.1: *"CSS strings, hex, slugs, IDs and provenance | render in
   LTR-isolated spans inside RTL prose."*
4. **The long name truncates from the wrong end.** LTR shows
   `The Unabridged Chromatic Atlas of Every Sunset We Hav…`; RTL shows
   `… of Every Sunset We Have Ever Archived Together, Vol. II`. In RTL the head of an
   English name is thrown away and the tail kept.
5. **The current-marker bar stays physically left** (`absolute -left-px`, `:31`) — now on the
   outer edge, detached from the reading start.

And in both directions the truncated name has **no `title`, no tooltip and no `line-clamp`**.
Measured `truncated: { scrollW: 461, clientW: 308 }` desktop, `217` at 390px, `164` at 320px
— at the narrow arm **64% of the name is unrecoverable by any means**. `.line-clamp-1` is
generated and shipped in the same utility set; `PaletteCard` already uses line-clamp for the
same data.

---

## §8. Forced colors — the colour dies

`probe3.json → forcedColors` (Chromium, `forcedColors: "active"`, dark):

```json
"swatch":     { "bg": "rgb(0, 0, 0)", "borderColor": "rgb(255,255,255)", "forcedColorAdjust": "auto" },
"swatchInline": "background-color: rgb(225, 29, 72);",
"current":    { "bg": "rgb(0,0,0)", "borderColor": "rgb(255,255,255)", "boxShadow": "none", "color": "rgb(255,255,255)" },
"other":      { "bg": "rgb(0,0,0)", "borderColor": "rgb(255,255,255)", "boxShadow": "none", "color": "rgb(255,255,255)" },
"currentBar": { "bg": "rgb(0,0,0)" },
"sheetBg":    "rgb(0,0,0)"
```

**D-08a.** The inline `background-color` on every swatch is overridden to black. A version
history *for a colour palette* renders as rows of identical black circles. `forced-color-adjust`
is left at `auto`; a colour specimen is the textbook sanctioned case for setting it to `none`,
and the component never does.

**D-08b.** The measured delta between the current row and every other row is **zero** on
every rendered surface property — same `bg`, same `borderColor`, same `boxShadow: none`
(the `ring-2` is a box-shadow, and forced colors strips it), and `currentBar` is
`rgb(0,0,0)` on an `rgb(0,0,0)` sheet. VISUAL-CONSTITUTION §4.2 requires a *"nonzero
selected-state delta in monochrome and forced colors"*; §4.1 requires *"Focus remains visibly
distinct from selection in both schemes, forced colors and reduced transparency."* Both fail
by measurement. Only the literal text `(current)` survives — which is fortunate, and also the
whole reason the state is recoverable at all.

Note the ironic corollary: in *normal* rendering the current row carries **three** redundant
markers — `ring-2 ring-primary`, a 4×16px `bg-primary` bar at `-left-px`, and the `(current)`
text. PROPORTION-AUDIT **PR-06** (*"duplicated selected fills → REMOVE … one action/selection
owner"*) and **PR-05** (*"Dividers, caster shadows and corner marks repeat a boundary →
REMOVE"*). Three markers where the design system asks for one, and in the one mode where a
marker is actually needed, two of the three evaporate.

---

## §9. Mobile and narrow — never designed

`evidence-D/B4-narrow-320-light.png`, 320×568:

- **D-14a — the header centres over a left-aligned list.** `DialogHeader` is
  `text-center sm:text-left`; below `40rem` the `sm:` arm drops. So on every phone the title
  and description are centred while all 24 rows are left-aligned. Two competing axes in one
  240px-wide panel.
- **D-14b — `justify-between` collapses into rag.** The row header wraps to
  `v24 / (current)` on the left and `Mar 26 at 12:30 / AM` on the right, with
  `justify-between` pushing the fragments apart. Unreadable.
- **D-14c — the description breaks mid-phrase**: `Census Palette — 24` / `versions`.
- **D-33 — a 75% side sheet on a 320px phone.** Measured `contentRect: { x: 80, w: 240 }` —
  the sheet takes 240 of 320px and leaves an 80px sliver of unusable page. It is neither a
  full-screen sheet nor a modal. VISUAL-CONSTITUTION §3.6 mandates a single document-scrolling
  mobile sequence; the sibling `FlagReportDialog.vue:3` uses a centred `sm:max-w-md` dialog
  and behaves correctly at the same width.
- **D-34 — the type/container relationship inverts.** Measured control font-size:
  `12.03px @320` · `12.18px @390` · `14.38px @1440`, against panel widths `240 / 292.5 / 384`.
  Type shrinks to 84% while the container shrinks to 62% — so **relative to its container the
  text is 1.34× larger at 320px than at 1440px**. VISUAL-CONSTITUTION §3.7: *"Spacing is
  container-scaled from glass-ui tokens. No desktop-tight/mobile-airy fork."* The panel
  scales; its contents do not.
- **Row heights diverge grotesquely** at this width: the 1-colour `v22` row is taller than
  the 5-colour `v24` row, because of the D-09 invisible band.

Scroll economy, desktop: `scrollerScrollH: 2760` vs `clientH: 759` — **3.6 viewports** for
page one. `Load older versions` sits at `top: 2834`, i.e. **2075px of scrolling below the
fold**, with nothing anywhere indicating that 4 more versions exist. (`probe2.json →
secondOpen.loadMore`, `scrolledBottom.loadMore`.)

The 200%-zoom arm (`B7`) was emulated by halving the viewport. VISUAL-CONSTITUTION §3.2
explicitly forbids that substitution — *"the live routed page at actual in-app Browser zoom,
not a substituted CSS-width or responsive-emulation frame"* — so I record it as a
**hypothesis**: at 720×450 the sheet occupies 53% of the viewport at a fixed 384px, and the
scroller drops to `clientH: 309` (8.9 viewports of content). A real-zoom arm is owed.

---

## §10. Semantics, duplication, and the god-facade

**D-18 — no structure.** `listSemantics: { ul: 0, li: 0, roleList: 0 }`, `timeSemantics: 0`,
`liveRegions: 0`, `headings: ["H2:Version History"]`. Twenty-four ordered historical records
are 24 bare `<div>`s. Nothing announces the load, the failure, the count change after
`Load older versions`, or the result of a revert. VISUAL-CONSTITUTION §5.1 requires
*"overlay title/description/state on open"*; PR-08 requires persistent operation truth.

**D-17 — the composable is a ghost.** `demo/palettes/useVersionHistory.ts` exports 11 members.
`grep` across `demo/` for every one of them:

```
pm.versions.fetchVersions  → VersionHistoryDrawer.vue:140
pm.versions.revert         → BrowsePane.vue:279
pm.versions.fork           → useDialogBrowseActions.ts:55
(everything else)          → zero consumers
```

`versions`, `total`, `loading`, `paletteSlug`, `loadVersions`, `loadMore`, `reset` — **seven
exported members with no consumer**, of which the drawer re-implements five locally at
`:133-155` while calling only the raw `fetchVersions`. The composable's own docstring says it
*"owns the version-drawer state"*. It does not; the drawer does, twice. Edict 2 (no dual
paths) and edict 1 (focused modules with real encapsulation).

**D-40 — one call, 32 members.** `:132` injects `BROWSE_PORT_KEY`, a 32-member facade
(`usePalettePorts.ts:157-192`), to reach exactly one function. `DEFECT-LEDGER.md:23386`
already records that only three files inject this key and that two of them *"take one slice
each"* — this is one of them.

**D-20 — the comment lies.** `:45` reads `<!-- Name (if different from current) -->` and
`:46-48` renders `version.name` **unconditionally**. In the overwhelmingly common case where
a palette's name never changed, every one of 24 rows repeats the same string that the
description directly above already states once. Measured `bodyText`:
`"Census Palette — 24 versions v24 (current) … **Census Palette** v23 … **Census Palette rev 23**"`.
A documented condition that does not exist in the code is worse than no comment.

---

## §11. What is sound — the negative proof

Not everything here is broken, and saying so is part of the job:

- **Motion is properly tokenized.** Measured `transition: opacity 0.2s cubic-bezier(0.4,0,0.2,1)`
  from the producer's `--default-transition-duration` / `--default-transition-timing-function`,
  and it correctly steps to `0.1s` under `prefers-reduced-motion: reduce` (`B6` vs `secondOpen`).
  No ad-hoc durations, no layout-forcing property is animated (`opacity` and `background-color`
  only), no keyframes were deleted. Edict 6 is satisfied.
- **The hover surface delta is real**, not decorative-only: `oklab(0.913299…)` → `oklab(0.871139… / 0.5)`.
  I checked before claiming otherwise.
- **The `+N` overflow chip is the codebase's good precedent** and it works: measured
  `swatchRows: [5, 8, 1, 5, …]`, `plusChips: ["+6"]` for a 14-colour version — capped at 8
  with an honest remainder. `SCALABILITY-AUDIT.md:138` calls this row *"the good precedent"*
  and it earns that.
- **Pagination terminates correctly**: after `Load older versions`, `rowCount: 24`,
  `labels: [v24 … v1]`, `loadMore: null`. The button retires exactly when the cursor exhausts.
- **`verbatimModuleSyntax` is clean** — `:116` `import type { PaletteVersion }`.
- **Vue 3.5 idioms are correct** — reactive props destructure at `:118`; no `defineModel`
  round-trip, so no `shallowRef` is owed; no template refs, so no `useTemplateRef` is owed.
- **The dialog title correctly joins the display voice** (measured Fraunces, weight 500) —
  the one thing the existing e2e checks is the one thing that passes.
- **`role="dialog"` with `aria-labelledby` and `aria-describedby`** are wired by the producer
  and present.

---

## §12. The gestalt cure

Patching this file would take about fifteen edits and would still leave the wrong object.
The transposition:

1. **Delete the local state machine; make the composable do its job.** `useVersionHistory`
   already owns `versions/total/loading/loadVersions/loadMore/reset` — and owns them for
   nobody. Give it the request identity (`slug`) and let it expose a real discriminated
   state: `{ status: "idle" | "loading" | "ready" | "error", versions, total, error }`. The
   drawer then renders a `switch`, not four accidental aliases of "blank". D-01, D-06, D-17
   and D-40 all die at once — including D-01, because a composable keyed on `slug` loads when
   the slug appears, with no `watch(open)` to forget `immediate`.

2. **Render the three states with the component the codebase already wrote.**
   `EmptyState variant="error"` (with its `role="alert"`, machine-truth detail and Retry
   action slot) for the failure; `EmptyState` default for the true empty; the route's own
   `PaletteCardSkeleton variant="developing"` grammar — not a bare spinner — for in-flight.
   Never publish `total` until it is known.

3. **Promote Revert out of hover and into the row.** The invisible band is 44px of layout the
   design already pays for. Spend it: a persistent, named, `text-small` control on every
   non-current row, identical on touch and pointer, with a real focus ring, behind one
   confirmation step (glass-ui `AlertDialog`), and with the list refetched — or the drawer
   closed — on success. D-02, D-03, D-04, D-05 and D-09 are all the same defect wearing
   different clothes, and one decision retires all five.

4. **Make a version a version, not a `<div>`.** An `<ol>` of `<li>` records; `depth` as the
   ordinal (never `total - i`); `<time :datetime>` with a year; the hash in a mono,
   LTR-isolated span; `WatercolorDot` for the colours with a named accessible list; one
   `role="status"` for load/count/result. D-08, D-10, D-11, D-13, D-16, D-18 fold into this.

5. **Stop styling the sheet from the outside — and tell glass-ui why.** `w-[380px]`,
   `sm:max-w-[420px]` and `h-7` do nothing and must simply be deleted (edict 2). If a
   380–420px drawer is genuinely wanted, that is a `size` axis on `DialogContent`, authored
   in glass-ui (edicts 4 + 5). Pass the producer's `scroll` prop instead of hand-rolling a
   nested scroller. The relay to the glass-ui BH inbox is standing law and this is exactly
   what it is for: **placement CSS shipped unlayered makes every consumer box-model override
   silently inert**, and side placements have no logical (RTL-aware) arm and a physical
   `text-left` header.

6. **Decide what this is on a phone.** A 240px, 75%-wide side sheet at 320px is not a
   decision anyone made. Either a bottom sheet / full-screen surface below `40rem`, or the
   centred dialog its sibling `FlagReportDialog` already uses.

---

## §13. Strongest single defect

**D-01 + D-05 together**, but if forced to one: **D-02/D-03 — the Revert button.**

It is `opacity: 0` with `pointer-events: auto`. Its only reveal is a `group-hover` rule
compiled inside `@media (hover: hover)`, so on every touch device it is invisible forever and
still tappable. With the pointer parked off-panel it is the **first Tab stop inside the
modal**, measured at `opacity: "0"`, and its own focus ring is erased by that opacity. It
fires an irreversible `POST /revert` on a single activation with `confirmationDialogs = 0`.
And after it fires, the panel shows `v24` sitting above `v23 (current)` — a history that
cannot exist.

An invisible, unconfirmed, keyboard-reachable, touch-tappable destructive control that leaves
the UI lying about what it did is not a proportion complaint. It is a shipping hazard.

---

**Report:** `docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/challenge-D-design.md`
**Evidence:** `docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/evidence-D/`
(38 frames · `probe.json` · `probe2.json` · `probe3.json`)
