# CHALLENGE-D — `demo/color-picker/App.vue`, the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model ID `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. No inherited or
undeclared seat.

Axis: **DESIGN**. Subject: `demo/color-picker/App.vue` (417 lines, area `core`) — the app shell:
it owns the sole `<main>`, the dock band `<nav>`, the pane grid, the breakpoint, the boot chain
and the global modal mount.

Verdict: **DEFECTIVE**. 4 BLOCKER, 7 MAJOR, 3 MINOR, 1 INFO.

---

## 0. How this was measured

Three read-only WebKit probes against the live dev server at `http://localhost:9000`, plus the
tracked Safari capture matrices and the canon. Probe sources are in the session scratchpad and are
reproduced inline below where a claim depends on them.

| Probe | What it decided |
|---|---|
| `probe-app-D.mjs` | grid columns, `h1` count, mount host, scrollability, canvas census, vertical clipping at 1440 / 720×450@2x / 390×844 |
| `probe-overture.mjs` | overture beat marks `b0…b4`, blob canvas presence, sustained rAF rate over 14.6 s, three schemes |
| `p3.mjs` | differential synthetic `Regenerate` click, mobile vs desktop |

Canon read in full: `VISUAL-CONSTITUTION.md` (228 lines), `PROPORTION-AUDIT.md` (83 lines),
`PALETTE-CONTRACT.md` header. Visual evidence: `audit/visual/REPORT.md`, `STATES.json`, and the
`safari-desktop-{light,dark}`, `safari-mobile-light`, `zoom-200-desktop`, `rtl-desktop`,
`forced-colors-desktop` shots for `picker` (the route App.vue's shell dominates).

---

## 1. Visual truth first

### 1.1 The desktop scene is two equal slabs. The canon forbids equal.

Measured at 1440×900 (`probe-app-D.mjs`, desktop-1440):

```
paneGridCols = 512px 512px
left  = {x: 199, w: 512}
right = {x: 729, w: 512}
left share = 50.0000%
```

`VISUAL-CONSTITUTION.md:27` (§3 law 1): *"A two-part desktop scene is **earned**, not default. A
P122 instrument chooses exactly `golden` (`61.8033989% / 38.1966011%`) or `preview-dominant`
(`66.6666667% / 33.3333333%`)."* `VISUAL-CONSTITUTION.md:43` (§3.1) binds Picker specifically to
*"exact golden inspector 38.1966011%"*.

The shell ships 50/50 **by written intent** — `demo/styles/shell.css:133-138`:

```css
.pane-container--dual {
    /* Equal columns always (the kept 1fr↔1fr invariant) … */
    grid-template-columns: repeat(2, minmax(var(--pane-min), 1fr));
}
```

Delta from the nearest legal ratio: **11.80 percentage points**. Look at
`shots/safari-desktop-light/picker.png`: the About card and the Picker card are the same width, so
nothing in the frame says which one is the instrument. The protagonist law
(`VISUAL-CONSTITUTION.md:34`, §3 law 8 — *"One pane may have one full-strength visual
protagonist"*) is not violated by a stray shadow; it is violated by the grid.

### 1.2 The Picker's Blob specimen is present in dark and absent in light — in the same tracked run

`shots/safari-desktop-dark/picker.png` has the white blob at the Picker card's top-right.
`shots/safari-desktop-light/picker.png` **has no blob at all**, and in its place sits ~230 CSS px of
empty card between the `Lab` identity and the `92.0%, 88.8, 20.0` headline. Corroborated in the
tracked data, `audit/visual/REPORT.md`:

```
line 17:  consoleErrors — safari-desktop-light /#/: WebGL: context lost.
line 119: | safari-desktop-light | `/#/` | 859 | 0 | 1 | 0 | canvas=1 | … | consoleErr=1 | 18905 ms |
line 134: | safari-desktop-dark  | `/#/` | 859 | 0 | 1 | 0 | canvas=2 | … | consoleErr=0 |  3515 ms |
```

`canvas=1` vs `canvas=2`, one console error, and a 18.9 s settle against 3.5 s. That is the exact
failure `PROPORTION-AUDIT.md:59` (PR-15) names: *"the headline→next-instrument interval … Buffer-only
alpha, empty canvas, card reserve, opacity/z-index cover and second Blob do not satisfy it"* — and
`VISUAL-CONSTITUTION.md:182`: *"The headline→next-instrument interval is not dead acreage."* In light
mode it is dead acreage. See **D-6**.

### 1.3 200% zoom clips the primary editing instrument and the page cannot scroll

`shots/zoom-200-desktop/picker.png` shows the card cut across its middle: the `L / a / b / α`
channel rail — the Picker's only continuous editing instrument — is entirely below the frame, and
there is no page scrollbar. Measured (`probe-app-D.mjs`, zoom200-720x450):

```
vh = 450
docScrollable  = 0
bodyScrollable = 0
appLayoutOverflow = hidden/hidden h=450px
channelRail = {y: 439.67, h: 206, bottom: 645.67}     → 195.67px below the fold
clippedY    = div.channel-rail.self-stretch@y452,
              button.channel-rail-item@y455, @y499, @y543, @y587
scrollables = ["div.glass-resting.card +223px"]
```

The content is reachable only by discovering an unlabelled inner scroll well inside a glass card
while the document itself is inert. This never surfaced because the tracked state probe measures
horizontal clipping only — `audit/visual/states.mjs:69-71`:

```js
clipped: [...].filter(el => { const b = el.getBoundingClientRect();
                              return b.right > de.clientWidth + 1 || b.left < -1; })
```

No vertical term. `STATES.json` therefore reports `clipped: []` for `zoom-200-desktop /#/` while the
screenshot in the same directory shows the rail gone. See **D-7**, **D-8**.

### 1.4 RTL relocates the protagonist and reverses the entrance sweep

`shots/rtl-desktop/picker.png`: with `dir="rtl"` the Picker renders on the **right** and About on the
**left**, the Lab triple renders `20.0 , 88.8 , %92.0`, and the dock reads
`mbabb@ | Login ← | ← Tools | Home ⌄`. The grid flow is logical; App.vue's names and its motion
timing are physical. See **D-10**.

### 1.5 Dark mode

`shots/safari-desktop-dark/picker.png` is the better of the two frames: the neutral-brown chrome
against the chromatic field satisfies `VISUAL-CONSTITUTION.md:21` (*"Dark chrome uses the restrained
neutral pole"*). No dark-specific shell defect found. `darkClassMissing = 0` across all 60 captures
(`REPORT.md:23`). This is the one axis where the shell is sound.

---

## 2. State coverage — the enumeration

App.vue's shell states, exhaustively. A state with no design is a design defect.

| State | Designed? | Evidence |
|---|---|---|
| populated (desktop dual) | yes, but at illegal proportion | D-3 |
| populated (desktop single, `right: null`) | yes — `pane-container--dual` drops, ghost slot absolutely positioned (App.vue:403-409) | only `/atmosphere` reaches it (`viewSchema.ts:172`) |
| populated (mobile single slot) | rendered, but **controls inert** | **D-1** |
| loading / pane chunk in flight | partial — `PaneSlot` `appear` grammar; no skeleton, no announced busy state | `VISUAL-CONSTITUTION.md:186` allows request-bound skeletons only; none here |
| error (pane render throw) | **yes** — `ErrorBoundary` (App.vue:50), `role="alert"`, `aria-live="assertive"` (`ErrorBoundary.vue:6,20`) | the one well-designed state in the file |
| not found | **no** — silent redirect to `/`, no status | **D-11** |
| WebGL unavailable / context lost (blob) | **no** — no handler, no fallback, no terminal arm | **D-6** |
| WebGL unavailable / context lost (aurora) | yes — `useAtmosphere.ts:288-301` re-arms on `webglcontextrestored` | the asymmetry is the finding |
| ground-seed invalid (§6.2 `invalid-default`) | **no** — `data-ground-state` is never set (`groundState: null`, measured) | **D-9** |
| disabled | `DockAction.disabled?: boolean` exists (`usePaneRouter.ts:44`); the shell never sets it | untested surface |
| focused | no shell focus target at all — no `h1`, no skip link | **D-4** |
| hovered / active / pressed | delegated to glass-ui; no shell-level defect found | — |
| selected (pane) | `mobilePaneIndex` — the state the canon retires | **D-2**, **D-12** |
| dragging | not a shell concern | — |
| overflowing / truncated | **no** — document never scrolls; overflow is pushed into nested card scrollers (desktop `/`: `div.glass-resting.card +7251px`) | **D-8** |
| RTL | mechanically flipped, semantically wrong | **D-10** |
| reduced motion | **yes** — `rafPer1500ms: 0` under `reducedMotion: reduce` (`STATES.json`), `prmInstant` gate (App.vue:30) | sound |
| forced colors | unproven; zero shell rules | **D-15** (hypothesis) |
| zoomed 200% | **no** — aliased onto "mobile" and remounted | **D-7** |

---

## 3. Findings

### D-1 · BLOCKER — On mobile the action-bar controls are named, enabled, and inert

**Mechanism.** `PaneSlot`'s `:on-mount` is the only writer of the three pane instance refs, and
App.vue attaches it to the **desktop** slots only:

- App.vue:105 — `:on-mount="onDesktopLeftMount"` (desktop left)
- App.vue:131 — `:on-mount="onDesktopRightMount"` (desktop right)
- App.vue:83-91 — the mobile `PaneSlot` has **no `:on-mount`**

`onDesktopLeftMount` (App.vue:323-328) is the sole writer of `colorPickerRef`, `generatePaneRef`,
`gradientPaneRef`; `onDesktopRightMount` (App.vue:330-332) the sole writer of `mixPaneRef`. Those
four refs are what every action dereferences — `usePaneRouter.ts:196`:

```ts
{ key: "regenerate", … handler: () => paneRefs.generate.value?.regenerate?.() }
```

At mobile `paneRefs.generate.value` is permanently `null`, so `null?.regenerate?.()` evaluates to
`undefined`: no call, no throw, no feedback. The Dock still renders the layer, because
`Dock.vue:41` gates on the metadata, not on liveness: `hasAnyActionBar = !!actionBar || !!genericBar`.

**Reproduction** (`p3.mjs` — same route, same button, synthetic click to bypass the collapsed layer):

```
{ "label": "mobile-390",  "clicked": "dispatched", "specimenChanged": false }
{ "label": "desktop-1440","clicked": "dispatched", "specimenChanged": true  }
```

Desktop before → after: `oklch(0.667417 0.182968 248.748459)` → `oklch(0.632577 0.21149 37.050613)`.
Mobile before → after: `oklch(0.685775 0.168594 55.603336)` → **unchanged**. Zero page errors either
side.

**Blast radius.** 9 generic actions dead on mobile (Generate: Regenerate / Save palette / Copy
colors; Gradient: Reset / Copy CSS / Seed from palette; Mix: Clear / Mix / Copy result), plus
everything hanging off `colorPickerRef`, which is never populated at mobile:

- App.vue:38 — `:action-bar="colorPickerRef?.actionBarContext ?? null"` → the Picker action bar
  never exists on mobile
- App.vue:41-42 — `@commit-edit` / `@cancel-edit` → no-ops on mobile
- App.vue:352 — `usePaletteWiring(colorPickerRef, …)` → degraded on mobile

This is a **design** defect, not a bug: `VISUAL-CONSTITUTION.md:100` requires *"Commit uses one
glass-ui action set"*, and §4.1 line 83 requires *"Selected, failed, pending, withdrawn and disabled
states are never color-only. Role, accessible name, state/value and associated error/status are
explicit."* A control that is named and enabled and does nothing is the worst possible state
expression.

**Cure (transposition, not patch).** `:on-mount` is a per-call-site prop, so liveness forks with
every breakpoint branch — the fork is structural. The instance registry belongs to
`usePaneRouter`, which already owns the route table: let it expose one `bindPane(slotName)` capture
that every `PaneSlot` call site passes through, so a slot cannot be mounted without registering. The
breakpoint then cannot desynchronise liveness. Under **D-2**'s cure the branch disappears entirely
and the question stops existing.

---

### D-2 · BLOCKER — The dual-pane workspace shell is retired by the canon; App.vue is nothing else

App.vue's whole structure is `left` + `right` + a mobile selector between them. The canon abolishes
all three, by name:

- `VISUAL-CONSTITUTION.md:89` (§4.2): *"V retires the global Dock `PaneSegmentedControl` and
  left/right view state."*
- `VISUAL-CONSTITUTION.md:32` (§3 law 6): *"no global pane selector, left/right split state, or
  simultaneous two-stage miniature survives."*
- `VISUAL-CONSTITUTION.md:218` (§7 Admin): *"Each Admin route uses the full main width: the current
  Palettes companion, right label and resulting mobile pane selector are **removed rather than
  restyled**."*
- `VISUAL-CONSTITUTION.md:58` (§3.1): *"About is a quiet trailing destination rather than Picker's
  companion."*
- `VISUAL-CONSTITUTION.md:38` (§3.1): the housing contract is `InstrumentChassis`; *"value.js
  composes regions with domain content; it does not clone a local chassis recipe."*

Measured against the live table, `demo/shell/viewSchema.ts` — **13 of 14 views ship a companion**,
and all five Admin views ship the exact companion §7 deletes:

```
:107  right: "about"      (/, Picker)          ← §3.1 forbids About as Picker's companion
:116  right: "palettes"   (/palettes)
:126  right: "palettes"   (/browse)
:135  right: "palettes"   (/extract)
:144  right: "mix"        (/mix)
:154  right: "palettes"   (/generate)
:163  right: "palettes"   (/gradient)          ← §3.1 binds Gradient support to "stop and code inspector"
:172  right: null         (/atmosphere)        ← the only compliant row
:181  right: "blob"       (/blob)
:190  right: "palettes"   (/admin/users)   ┐
:199  right: "palettes"   (/admin/names)   │ §7: "removed rather than restyled"
:208  right: "palettes"   (/admin/audit)   │ 5 sites, all live
:217  right: "palettes"   (/admin/flagged) │
:226  right: "palettes"   (/admin/tags)    ┘
```

App.vue:113-137 renders that companion; App.vue:41-42 writes `viewManager.mobilePaneIndex`; the
mobile selector is visible in `shots/safari-mobile-light/picker.png` as the `Picker | About`
segmented control. Two canonical member routes are absent from the table entirely: `/about` and
`/easing` (`VISUAL-CONSTITUTION.md:58` fixes the inventory at exactly eleven).

**Why this is the root, not a sibling finding.** D-1 (breakpoint-forked ref plumbing), D-3 (equal
columns), D-7 (zoom aliased onto mobile), D-10 (physical `--left`/`--right` naming and timing) and
D-12 (`mobilePaneIndex`) are all consequences of one premise: *the shell hosts two panes and the
viewport picks how many.* Remove the premise and five findings collapse.

**Cure.** App.vue becomes a single-scene shell: `<nav>` dock band + one `<main>` + one landmark-neutral
route scene + the stable H1 (D-4). Region composition (stage / inspector / action, ratio, collapse,
mobile order) moves into glass-ui's `InstrumentChassis` per route, as §3.1 already binds. The
`left`/`right` axis, `mobilePaneIndex`, `pane-wrapper--left/--right`, the ghost slot, the
`--dual` grid and the desktop/mobile `v-if` fork all die in one cut. This is a producer-composition
change, not a demo restyle — which is exactly what §3.1 says it must be.

---

### D-3 · BLOCKER — 50.0000% / 50.0000% where the canon permits only 61.8034/38.1966 or 66.6667/33.3333

Full evidence in §1.1. `shell.css:133-138` encodes "Equal columns always"; measured
`paneGridCols = "512px 512px"` at 1440×900. Violates `VISUAL-CONSTITUTION.md:27` (§3 law 1) and
`:43` (§3.1 Picker row). Delta 11.80 pp.

Note also `VISUAL-CONSTITUTION.md:28` (§3 law 2): *"Empty secondary content occupies at most a narrow
invitation tray (≤15% of the stage) or disappears. It never receives half the viewport."* Every
`right: "palettes"` route with an empty library receives exactly half the viewport.

**Cure.** The ratio is a property of the route's composition, not of the shell. It moves onto
`InstrumentChassis` with `golden` / `preview-dominant` as named typed values, per §3.1's table. The
shell stops owning `grid-template-columns` at all.

---

### D-4 · BLOCKER — Zero `<h1>` in the entire demo; the shell owns `<main>` but not the heading

```
$ grep -rln "<h1" demo/
(no output)
```

Measured `h1Count = 0` at 1440×900, 720×450, 390×844 (`probe-app-D.mjs`, all three rows). The tracked
matrix agrees: the `h1` column in `REPORT.md:119-178` is `0` for **all 60 captures**. `mainCount = 1`
everywhere — the `<main>` is correct (App.vue:47) and `mainCountNotOne = 0` (`REPORT.md:27`).

`VISUAL-CONSTITUTION.md:85` (§4.1): *"Each route has one H1 and exactly one stable main landmark,
**owned by the shell**."* `:118` (§5.1): *"The shell `<main>` and route H1 are stable nodes."* App.vue
delivers half the sentence.

The consequence is that the entire navigation-focus contract has no target. Every row of §5.1's
table (`VISUAL-CONSTITUTION.md:108-116`) resolves focus to a "destination H1":

| Origin | Required focus target |
|---|---|
| Dock/global in-app route choice | *destination H1 with temporary `tabindex="-1"`* |
| browser Back/Forward | *… otherwise destination H1* |
| auth, not-found, or policy redirect | *destination H1* |
| successful navigating command | *new resource H1* |

There is also **no skip link** (`grep -rn "skip-link\|Skip to" demo/` → empty), so a keyboard user
landing on `/` must traverse the whole dock band to reach the instrument, with no heading to jump
to. `STATES.json` `keyboard-focus-desktop` rows report `focused: "body[…]"` — after 12 Tabs the
active element is still `document.body`, which is *also* the mount host (D-9).

**Cure.** The shell renders one `<h1>` inside `<main>`, fed by the same route identity
`installDocumentTitle` already composes (`router/useDocumentTitle.ts:62`) — one source, two sinks
(`<title>` + H1), plus the `tabindex="-1"` focus seat §5.1 requires. Add the skip link as the first
tabbable node in the shell. Both belong to App.vue and nowhere else.

---

### D-5 · MAJOR — Ambient motion never terminates and there is no still/pause control

`VISUAL-CONSTITUTION.md:145` (§6): *"Continuous Aurora/Blob ambient motion terminates within five
seconds **or** exposes one persistent keyboard-operable still/pause control whose state is announced
and remembered. Paused, parked and offscreen mean no animation work."*

Measured rAF rate over the window t=8.5 s → t=14.6 s after load (`probe-overture.mjs`, instrumented
`requestAnimationFrame`, two concurrent loops so the count is ~2× the frame rate):

```
desktop-1440-light : 261.0 /s   (raf 2024 @8565ms → 3590 @14576ms)
desktop-1440-dark  : 284.0 /s   (raf 2304 @8112ms → 4008 @14117ms)
mobile-390         : 259.5 /s   (raf 2193 @8624ms → 3750 @14631ms)
```

Still running at 14.6 s, on battery-powered mobile included. And there is no control:

```
$ grep -rniE "animation-play-state|pauseAnim|\"pause\"|'pause'|isPaused" demo/
(no output)
```

Both arms of §6 fail. App.vue:285-289 mounts the atmosphere renderer and owns the canvas
(App.vue:9-17), so the control has no other home. The reduced-motion arm *is* satisfied
(`STATES.json`: `rafPer1500ms: 0` under `reducedMotion: reduce`) — but reduced-motion is a user OS
preference, not the persistent, announced, remembered control §6 demands.

**Cure.** One shell-level ambient-motion control, keyboard-operable, `aria-pressed`, persisted with
the color-mode store, that gates both renderers through the `OVERTURE_KEY` beats App.vue already
provides — so "paused" means the rAF loops are torn down, not merely opacity-zeroed.

---

### D-6 · MAJOR — The Picker's Blob specimen is nondeterministic with no designed fallback; when it loses, PR-15's void ships

Three independent observations of the same route, same viewport class:

| Observation | Blob canvas |
|---|---|
| `REPORT.md:119` — tracked `safari-desktop-light /#/` | **absent** (`canvas=1`), `consoleErr=1` = "WebGL: context lost", settle 18905 ms |
| `REPORT.md:134` — tracked `safari-desktop-dark /#/` | present (`canvas=2`), settle 3515 ms |
| `probe-app-D.mjs` desktop-1440 (networkidle + 2500 ms) | **absent** — `canvases: [atmosphere-canvas]` |
| `probe-overture.mjs` desktop-1440-light (DCL + 4000 ms) | present — `b4@2306ms`, `goo-blob-canvas` |

So the specimen is a coin flip, and the losing frame is `shots/safari-desktop-light/picker.png`: no
blob, ~230 px of empty card in the headline interval. That is the literal text of
`PROPORTION-AUDIT.md:59` (PR-15) — *"raw-buffer Blob geometry can pass while the composed Blob is
absent or occluded"* — and of `VISUAL-CONSTITUTION.md:182`.

The asymmetry is the design defect. The aurora canvas has a context-loss contract:

```
demo/color-picker/composables/boot/useAtmosphere.ts:298   canvas.addEventListener("webglcontextlost", …)
demo/color-picker/composables/boot/useAtmosphere.ts:301   canvas.addEventListener("webglcontextrestored", …)
```

Those are the **only** matches in the whole tree:

```
$ grep -rn "webglcontextlost|contextlost|isContextLost|contextrestored" demo/ src/
demo/color-picker/composables/boot/useAtmosphere.ts:288,298,301
```

The blob has none. And App.vue owns the DAG that gates it — App.vue:296 `useOverture(auroraArrived)`,
whose B4 beat (`useOverture.ts:28-40`) opens on *"B3-complete ∧ B2-STARTED ∧ chunk-resolved"* with
**no failed / unavailable / lost terminal arm**. A gate with only a success edge cannot express
"the ornament will not arrive", so nothing downstream can collapse the interval.

**Cure.** B4 gets a terminal `unavailable` arm (context lost, WebGL absent, chunk rejected). When it
resolves to `unavailable` the headline interval collapses to *"the named shared section rhythm"* —
the alternative `PROPORTION-AUDIT.md:59` already authorises — instead of holding a void for an
ornament that is not coming. `VISUAL-CONSTITUTION.md:142`: *"The CSS ground is the honest first
frame. Aurora/Blob enhance it after paint without geometry change."* The geometry must therefore be
correct with the blob absent, which today it is not.

---

### D-7 · MAJOR — 200% zoom is not a designed state; it is silently aliased onto "mobile" and remounts the scene

At 720×450 @2 DPR (the 200% arm), measured (`probe-app-D.mjs`, zoom200):

```
mobileSlot = {x:104, y:104, w:512, h:338}     ← the MOBILE slot is what renders
left  = null
right = null
textLen (STATES.json, same matrix) = 70       ← vs 859 at desktop 1440
```

The breakpoint is `useBreakpoint("(min-width: 1024px) and (min-aspect-ratio: 1.1)")` (App.vue:310-312),
consumed as a hard `v-if` / `v-else` (App.vue:77, 94). So crossing the threshold — by zooming, by
rotating a tablet, by dragging a window — **unmounts and remounts the entire scene**: both
`KeepAlive` caches (`:max="6"` and `:max="4"`, App.vue:107,133) are destroyed along with the `:max="9"`
mobile cache, every pane's local state is lost, and both WebGL contexts are torn down and rebuilt.
App.vue:62-70 documents this as a WebGL-budget win; it is also a state-destruction event on an
ordinary user gesture.

Worse, the zoom user does not get a reflow of the desktop scene — they get a **different information
architecture** (one slot + a pane selector). `VISUAL-CONSTITUTION.md:32` (§3 law 6) defines the
mobile grammar as a distinct *sequence*, and `:33` (§3 law 7) forbids *"desktop-tight/mobile-airy
fork and no breakpoint pile."*

Combined with D-8 the content is then clipped (§1.3): 195.67 px of the channel rail below a
non-scrolling fold. WCAG 2.1 SC 1.4.4 (Resize Text, AA) and SC 1.4.10 (Reflow, AA) both fail at
200%, before `PROPORTION-AUDIT.md:16`'s required *"actual 400%-zoom in-app Browser"* arm is even
reached.

**Cure.** Under D-2's single-scene shell there is no mount fork to cross — one scene, container
queries for its regions (`.pane-wrapper` is already `container-type: inline-size`, `shell.css:82-84`).
Zoom then reflows instead of re-architecting. Separately, `states.mjs:69-71` must gain a vertical
term so this class of defect is measurable at all.

---

### D-8 · MAJOR — The document never scrolls at any viewport; §3 law 6 requires that it does on mobile

`VISUAL-CONSTITUTION.md:32` (§3 law 6): *"Mobile uses **one document-scrolling** stage→inspector→action
sequence beneath the same top dock."*

Measured, all three matrices (`probe-app-D.mjs`):

```
desktop-1440    : docScrollable 0, bodyScrollable 0, appLayoutOverflow hidden/hidden h=900px
zoom200-720x450 : docScrollable 0, bodyScrollable 0, appLayoutOverflow hidden/hidden h=450px
mobile-390x844  : docScrollable 0, bodyScrollable 0, appLayoutOverflow hidden/hidden h=843.98px
```

Source: `demo/styles/shell.css:19-28` — `height: 100dvh; overflow: hidden`, plus
`.pane-container { max-height: var(--content-max-h) }` (`shell.css:75`) resolving to
`clamp(30rem, 62dvh, 38rem)` on the mobile arm (`foundation.css:481`). The shell is a fixed,
non-scrolling viewport frame, so every route's overflow is forced into a nested card scroller. At
desktop `/` that well is **7251 px deep**:

```
scrollables = ["div.glass-resting.card +7251px"]
```

7251 px of content inside a 774 px card, behind a `backdrop-filter` carrier
(`shell.css:196-208`), with the page's own scrollbar suppressed. That is not "one
document-scrolling sequence"; it is a scroll well inside a glass pane inside a frame.

**Cure.** The shell's block axis becomes `min-height: 100dvh` and the document scrolls. The dock band
keeps its reserved band via `position: sticky` on row 1 — which preserves §3 law 4 (*"The top dock
owns a reserved band. Expanded/collapsed/mounted states do not move the scene below it"*, already
satisfied by `--dock-band-min-h`, `shell.css:44`) without the `overflow: hidden` that costs the
document its scroll.

---

### D-9 · MAJOR — The boot contract is split across a file App.vue does not own, and duplicated in two languages

Measured (`probe-app-D.mjs`, all three matrices):

```
mountHostIsBody  = true
appLayoutParent  = "body"
bodyAttrs        = class="relative" id="app" data-paper-field="" data-v-app=""
groundState      = null
```

`demo/color-picker/index.html:205-213` is the inline `<script type="module">` that MT-F012 identifies
as the P0 (its module graph is dropped from the production bundle). It ends
`app.mount("#app")`, and `#app` **is `<body>`** (`index.html:226`). App.vue is a three-root fragment
(`div.app-layout` at :2, the comment nodes at :144-149, `MigratePalettesDialog` at :152), so Vue
renders its roots as direct `<body>` children and replaces whatever `<body>` contained.

**What App.vue assumes about its mount, and what it costs:**

1. **`class="relative"` on the host — and it is dead weight.** The atmosphere canvas
   (App.vue:9-17) is `absolute inset-0`, but it is a *descendant* of `.app-layout` (App.vue:2),
   which is already `position: relative` (`shell.css:25`). The nearest positioned ancestor is
   therefore `.app-layout`, never `<body>`. `class="relative"` positions nothing — a legacy
   positioning ancestor for a canvas that no longer needs one. Owner edict 2 (no legacy code).
2. **`data-paper-field` on the host.** `index.html:222-226` documents it as glass-ui's field
   contract: *"under this ancestor, the producer's orphan-card warm field-floor fallback switches
   OFF."* It governs App.vue's own descendants — including its portalled dialogs — and it is
   declared in a file App.vue cannot see, with no type and no test seam.
3. **`<body>` cannot hold anything.** Because mount replaces the host's children, `<body>` can hold
   no `<noscript>` and — decisively — no pre-rendered fallback. `VISUAL-CONSTITUTION.md:168` (§6.2)
   requires exactly one: *"A **static semantic boot-error region already present in HTML** becomes
   visible through that data state and names a configuration fault."* Measured `groundState: null`:
   `data-ground-state` is never written, `data-ground-schema`/`data-ground-store` are absent, and the
   whole §6.2 frame-zero seed latch is unimplemented. The current mount target makes the required
   region structurally impossible to preserve.
4. **Two precedence engines over the same three inputs.** `index.html:180-200` runs a URL/storage/
   default resolution in vanilla JS and writes `--saved-bg-0…N`; then App.vue:231
   `resolveHydratedBootModel()` runs URL→storage→default **again** in TypeScript
   (`boot/hydrate.ts:53-78`). `VISUAL-CONSTITUTION.md:172` (§6.2) forbids precisely this: *"The
   hydrated model consumes the frozen boot object and reads those computed tokens; it **does not
   repeat scheme/URL/storage precedence**, reconstruct an initial palette in TypeScript, or repaint a
   second 'equivalent' ground."* Two engines, two languages, two files, that must agree forever.

**Would a correct entry make any of this unnecessary? Yes — most of it.** Moving those 8 lines into
`main.ts` and referencing it via `src=` (MT-F012's cure) with `<div id="app">` as the host:

- `.app-layout` becomes the app's own root element. It already declares `position: relative`, so
  assumption 1 dissolves and `class="relative"` is deleted, not moved.
- `data-paper-field` moves onto `.app-layout` — the element App.vue owns and already writes a
  paragraph about. Assumption 2 becomes local and reviewable.
- `<body>` regains the right to carry §6.2's static boot-error region and a `<noscript>`, because
  mount no longer nukes it. Assumption 3 dissolves.
- `main.ts` becomes the single place that reads the frozen `window.__VALUE_GROUND_BOOT__` and hands
  it to `createApp(App, { boot })`. App.vue then *consumes* the boot object as §6.2 requires, and
  `resolveHydratedBootModel`'s duplicate precedence engine is **deleted outright** rather than kept
  in sync. Assumption 4 dissolves.

**What a correct entry does not fix:** App.vue's three-root fragment (it still cannot receive a host
`id` or fallthrough attributes, and a fragment root is the wrong shape for a shell that owns
landmarks), nor D-2, D-3, D-4. The entry fix is necessary and insufficient.

---

### D-10 · MAJOR — RTL: physical slot names and physical entrance timing under a logical grid

`shots/rtl-desktop/picker.png` — under `dir="rtl"` the grid flow reverses, so the **Picker
(protagonist) renders on the right** and About on the left. App.vue's contract is physical on both
axes:

- **Names.** `pane-wrapper--left` / `pane-wrapper--right` (App.vue:77, 96, 119). Under RTL the class
  named `--left` paints on the visual right. `shell.css:94-96` gives `.pane-wrapper--left { z-index: 1 }`
  precisely *"so the bead's overlap strip is never buried under the About card"* — a directional
  stacking intent that is now wrong-sided.
- **Timing.** `--overture-left-delay: 40ms` / `--overture-right-delay: 120ms`
  (`boot/overture.css:18-19`) are bound per-slot inline (App.vue:96, 121). The entrance sweep is a
  directional gesture; under RTL it sweeps against the reading direction.

`VISUAL-CONSTITUTION.md:150` (§6.1): *"chrome, navigation and layout | logical inline/block direction
follows the document."* Names and choreography are part of the layout contract; only the box model
went logical here.

**Cure.** Under D-2 the slots vanish. Until then the names become role-based (`--protagonist` /
`--inspector`) and the stagger keys off role, not side, so both survive `dir` inversion by
construction.

---

### D-11 · MAJOR — "Not found" has no designed state

`demo/color-picker/router/index.ts:37`:

```ts
{ path: "/:pathMatch(.*)*", redirect: "/" },
```

A silent redirect. Measured in the tracked matrix, `REPORT.md:133` vs `:119` —
`/#/does-not-exist` has `text = 859`, byte-identical to `/#/`'s `859`, in all four matrices. The user
typed something wrong and the app pretends they typed `/`.

`VISUAL-CONSTITUTION.md:113` (§5.1) requires: *"auth, not-found, or policy redirect | destination H1 |
top | **redirect reason in one polite status**, then destination title/H1; no focus on removed
content."* App.vue mounts no polite status region — the shell's only live region is
`ErrorBoundary`'s `role="alert"` / `aria-live="assertive"` (`ErrorBoundary.vue:6,20`), which is
assertive and reserved for render throws. And there is no H1 to focus (D-4).

**Cure.** One shell-owned polite status region beside the H1, written by the same route-settlement
commit `installDocumentTitle` already hooks (`router/index.ts:47`). The 404 becomes an announced
redirect rather than a lie.

---

### D-12 · MINOR — Business logic in a template handler, a magic index, and retired state

App.vue:41-42:

```html
@commit-edit="colorPickerRef?.commitEdit(); viewManager.mobilePaneIndex.value = 1"
@cancel-edit="colorPickerRef?.cancelEdit(); viewManager.mobilePaneIndex.value = 1"
```

Three defects in two lines: two statements sequenced inside an inline template handler; a foreign
composable's ref mutated from the template rather than through its own API; and a bare literal `1`
meaning "the right pane" — an unnamed magic index. It also runs on desktop, where
`mobilePaneIndex` is meaningless, and `colorPickerRef` is null on mobile (D-1), so on the one
viewport where the pane index matters the `commitEdit()` half never fires. And `mobilePaneIndex` is
itself the *"left/right view state"* `VISUAL-CONSTITUTION.md:89` retires. Owner edict 3 (KISS) and
edict 7 (idiomatic Vue 3.5).

**Cure.** `viewManager` exposes a named intent (`returnToInspector()`); the handler becomes one
method call. Under D-2 the state disappears.

---

### D-13 · MINOR — `any` in the shell's ref plumbing is what let D-1 ship

```
App.vue:317-319  const generatePaneRef = ref<any>(null);  (×3)
App.vue:323      function onDesktopLeftMount(el: any)
App.vue:330      function onDesktopRightMount(el: any)
PaneSlot.vue:52  onMount?: (instance: any) => void;
```

The three pane instances have real public shapes — `regenerate`, `save`, `copyColors`, `reset`,
`copyCSS`, `seedFromPalette`, `clearSelection`, `startMix`, `copyResult`
(`usePaneRouter.ts:196-222`) — and `any` erases every one. This is the direct enabling condition for
D-1: `paneRefs.generate.value?.regenerate?.()` type-checks against `null` forever, so the missing
mobile `:on-mount` produced no diagnostic anywhere. Note the file otherwise honours
`verbatimModuleSyntax` correctly — all four type-only imports use `import type` (App.vue:163, and
`ColorModel`/`EditTarget` at :163).

**Cure.** `PaneSlot`'s `onMount` becomes generic over the mounted component's instance type; the
three refs get their real `InstanceType<typeof …>` unions. Then the compiler reports the mobile gap.

---

### D-14 · MINOR — A migration-choice overlay mounted unconditionally at the shell root

App.vue:152-157 mounts `MigratePalettesDialog` as a permanent shell child.
`VISUAL-CONSTITUTION.md:224` (§7): *"Unsupported/corrupt palette storage replaces the Library body
inside its existing main with one content-hug recovery article: diagnosis, preservation/export, then
separately confirmed reset. … It is **never** rendered as an empty library, silent reset, **migration
choice**, **overlay**, or companion pane."* This mount is two of the five named prohibitions at once.
It also accretes the shell toward a god module (owner edict 1) — the shell should own landmarks and
routing, not the palette domain's recovery dialog.

**Cure.** The recovery article renders inside `<main>`, owned by the Library scene, per §7. The shell
mounts no domain dialogs.

---

### D-15 · INFO (hypothesis — needs a Chromium run) — the shell has no forced-colors rules

`shots/forced-colors-desktop/picker.png` shows the aurora field, the pink glass and the full
chromatic dock rendering unchanged under `forcedColors: "active"`. **This is not proof**: Playwright's
`forcedColors` emulation is not honoured by WebKit, and `states.mjs:1-9` already warns that WebKit-only
rows mislead. Labelled a hypothesis.

The source-side fact is solid: `demo/styles/foundation.css:678` has one
`@media (forced-colors: active)` block, and none of the shell's own selectors — `.app-layout`,
`.dock-band`, `.pane-main`, `.pane-container`, `.pane-wrapper`, `.atmosphere-canvas` — appear in it.
The atmosphere canvas has no forced-colors arm at all, and
`VISUAL-CONSTITUTION.md:84` requires *"Focus remains visibly distinct from selection in both schemes,
forced colors and reduced transparency."*

**To decide:** `ENGINE=chromium node docs/tranches/V/megatranche/audit/visual/states.mjs` and compare
the `forced-colors-desktop/picker.png` frame.

---

## 4. Motion audit (the brief's explicit question)

| Question | Answer |
|---|---|
| Does it animate? | Yes — the overture DAG B0…B4 (App.vue:296), the dock veil/land (App.vue:28-33), the slot `appear` grammar (App.vue:89, 108, 134), the canvas derive-in (App.vue:12), and a per-instance opacity transition (App.vue:119). |
| Tokenized? | **Mostly yes, one exception.** The overture uses named tokens (`--overture-left-delay: 40ms`, `--overture-right-delay: 120ms`, `--overture-derive-in`, `--spring-snappy` — `boot/overture.css:18-19,70,131`). **App.vue:119 hard-codes `transition-opacity duration-200`** — an ad-hoc 200 ms on a shell slot, per-instance, bypassing the token ladder. Owner edict 5 (root-level styling) and edict 6 (tokenized). Note `--animation-slide-sm/md/lg` does not exist in `foundation.css` — the register named in the brief is not the live one; `--overture-*` and `--spring-*` are. |
| `prefers-reduced-motion`? | **Yes, well.** `prmInstant` gates the land class (App.vue:30); `useOverture.ts:98-100` collapses every beat to instant states synchronously; `overture.css:51,184` and `animations.css:184,202` carry the guards. Measured `rafPer1500ms: 0` under `reducedMotion: reduce` (`STATES.json`) — the WebGL loops actually stop. This is the strongest part of the file. |
| Animates a layout-forcing property? | **No.** App.vue:388-394 documents deleting the former `height`/`margin`/`padding` co-transition on `.pane-wrapper` for exactly this reason; the swap rides transform/opacity. Correct. |
| Untokenized state change | The ghost slot toggles `visibility`, `position: absolute` and `content-visibility` (App.vue:403-409) — none transitionable — alongside the 200 ms opacity fade, so the ghost pops rather than fades. Minor, and it dies with D-2. |

---

## 5. Design-system boundary

| Check | Verdict |
|---|---|
| Reaches past glass-ui to hand-roll something it provides | **Yes — the housing.** `VISUAL-CONSTITUTION.md:38` names `InstrumentChassis` as the housing contract and says *"value.js composes regions with domain content; it **does not clone a local chassis recipe**."* App.vue's `.pane-container` / `.pane-wrapper--left` / `.pane-wrapper--right` / `.pane-wrapper--ghost` is a local chassis recipe: a hand-rolled stage/inspector split with its own ratio, its own collapse rule and its own reserve. See D-2/D-3. |
| Correctly defers to glass-ui | `useClipboard` (App.vue:362) replaced a hand-rolled copy+timer — exemplary, and the comment says so. `useGlobalDark`, `useBreakpoint` likewise. |
| Per-instance override of a root | **Yes, twice.** App.vue:119 `transition-opacity duration-200` on the right slot; App.vue:77/96/121 inline `style="--overture-appear-delay: …"` per slot. Both are slot-role properties that belong in `shell.css` / `overture.css` keyed by role. Owner edict 5. |
| Forked producer ladder | No — and `shell.css:141-216` is explicit that its oversampled-blur carrier is a booked interim awaiting the producer root cure, reading the producer's own `--glass-blur-resting` token. Correct discipline. |
| Reuses existing component-type names | Yes (`Dock`, `PaneSlot`, `ErrorBoundary`). |

---

## 6. Proportion and seat law — the register verdict

Judged against `PROPORTION-AUDIT.md` §4's seed rows, for the rows the shell owns or blocks:

| Row | Disposition | Shell status |
|---|---|---|
| PR-01 label→headline void | TIGHTEN | **still RED in the shipped light frame** — §1.2; the void is present precisely when the blob loses (D-6) |
| PR-04 empty/equal companion Cards | REMOVE | **RED** — 13/14 views ship a companion; 5 Admin companions the canon deletes by name (D-2); Admin `50%→0` not started, measured `512px 512px` (D-3) |
| PR-15 headline→next-instrument interval | TIGHTEN / ADD-AFFORDANCE | **RED** — the interval is unoccupied whenever B4 fails, and B4 has no failure arm (D-6) |
| §5 law 3 (title gap vs section gap) | — | not a shell row, but the shell's 50/50 grid is what fixes the Picker's inline measure |
| §5 law 7 (glyph vs target vs reservation are separate) | — | `smallTapTargets = 8` on `/#/` in **all four** matrices (`REPORT.md:33,48,63,78`); `namelessButtons = 1` on `/#/` desktop (`REPORT.md:96,103`). The shell's `<nav>` is their landmark; the seats are Dock/Picker rows. |
| §5 law 8 (real rendered relation wins over token intent) | — | this report obeys it: every ratio here is a measured rect, not a token name |
| §6 terminal close | — | `PROPORTION-AUDIT.md:83`: *"a newly observed superfluous element or missing affordance reopens its owner."* D-1 (missing affordance: nine named controls with no effect) and D-4 (missing H1) are new observations that reopen their owners. |

`VISUAL-CONSTITUTION.md:56` (§3.1) additionally requires W18 to ratify a composition for **each** of
the eleven members before feature styling proceeds, and *"Picker cannot stand in for About."* The
shell's single `left`+`right` recipe stands in for all eleven.

---

## 7. What is sound

Stated so the negative claims stay credible:

- **`<main>` landmark**: exactly one, every route, every matrix (`mainCount = 1`; `mainCountNotOne = 0`,
  `REPORT.md:27`). The dock band is a real `<nav>` with a label (App.vue:24-27). §4.1's landmark half
  is met.
- **Error boundary**: App.vue:50, `ErrorBoundary.vue:6,20` — focus-managed, `role="alert"`,
  `aria-live="assertive"`. A pane render throw does not white-screen. This is the file's best state.
- **Reduced motion**: genuinely correct, measured to zero rAF (§4).
- **No layout-animating transitions**: the former height/margin/padding co-transition was deleted with
  the reason recorded (App.vue:388-394).
- **No horizontal overflow**: `overflowX = 0` on all 60 captures (`REPORT.md:23`) and all state
  matrices.
- **No page errors**: `pageErrors = 0` on all 60 captures (`REPORT.md:19`).
- **Dark chrome**: neutral pole, per §2. No dark-mode shell defect found.
- **`verbatimModuleSyntax`**: all type-only imports are `import type` (App.vue:163).
- **Hydration-before-derivation ordering**: the *ordering* law (App.vue:225-231) is right and the
  reasoning is recorded; only its duplication of the prepaint script's precedence is wrong (D-9).

---

## 8. The one-sentence gestalt

App.vue is a well-documented, carefully choreographed **two-pane workspace shell** — and Tranche V's
constitution retires the two-pane workspace: it asks for a single-scene shell that owns one `<main>`,
one stable H1, and one landmark-neutral `InstrumentChassis` per route. Every finding above except D-5,
D-6, D-9 and D-14 is a consequence of that one premise, which is why the cure is a transposition
(delete the `left`/`right` axis, the breakpoint mount fork and the local chassis recipe; add the H1
and the skip link the shell was always supposed to own) and not a sequence of patches.

---

## Appendix — probe reproductions

Scratchpad (session-local):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
· `probe-app-D.mjs` · `probe-overture.mjs` · `p3.mjs`

The decisive one, D-1, in full — same route, same button, differential viewport:

```js
// p3.mjs (abridged)
await p.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const sig = () => p.evaluate(() =>
  [...document.querySelectorAll("main [style*='background-color']")]
    .slice(0,10).map(e => e.getAttribute("style")).join("|"));
const before = await sig();
await p.evaluate(() => {
  const b = [...document.querySelectorAll("nav.dock-band button")]
    .find(x => /regenerate/i.test((x.getAttribute("aria-label")||"")+(x.textContent||"")));
  b.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
});
await p.waitForTimeout(1500);
const after = await sig();               // mobile: === before.  desktop: !== before.
```

```
{ "label": "mobile-390",   "clicked": "dispatched", "specimenChanged": false, "errs": [] }
{ "label": "desktop-1440", "clicked": "dispatched", "specimenChanged": true,  "errs": [] }
```

No source file was modified by this seat. Writes confined to
`docs/tranches/V/megatranche/audit/components/App/`.
