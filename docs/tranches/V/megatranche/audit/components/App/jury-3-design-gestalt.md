# JUROR-3 — DESIGN, GESTALT, AND PERFORMANCE

**Seat:** JUROR-3 (the whole, as experienced) · **Subject:** `demo/color-picker/App.vue` (417 lines, area `core`)
**Repo:** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD `c654824e` · **Date:** 2026-07-24
**Live substrate:** `http://localhost:9000` (vite dev) · **Engine for all my own probes:** Chromium 1.60.0

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model ID `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. Not inherited, not
undeclared.

---

## VERDICT — **APOTHEOSIS_REQUIRED**

Not because the file is careless. It is the opposite of careless: every one of its choices is
documented, reasoned, and dated. It is a *well-built instance of a retired architecture*. The
constitution abolishes the two-pane `left`/`right` workspace by name in four separate clauses, and
App.vue is structurally nothing else. Five findings are consequences of that one premise and cannot
be patched out of it.

And independently of the canon, the whole — as experienced — measures badly in three places no
challenger looked:

| Axis | Measured | Canon / threshold |
|---|---|---|
| Main-thread block | **TBT 673–823 ms** on every matrix; the dominant **608–741 ms** long task starts at t≈1.9–2.6 s, coincident with `overture:b4` | ≤200 ms is "good"; >600 ms is "poor" |
| Idle frame rate | **44.4–46.5 fps** sustained at 1440×900 with zero input, vs **120.2 fps** at 390×844 on the same binary | 60 fps |
| Post-paint geometry | **CLS 0.0193** at desktop (0 at mobile), source named: `.pane-container` `199,148 1042×685` → `199,103 1042×774` at t≈345–472 ms | §6:142 "…enhance it after paint **without geometry change**" |

The desktop scene costs roughly 2.7× the per-frame budget of the mobile scene on the same machine.
The extra cost is the second pane — the companion the canon retires. That is the performance
argument for the transposition, and it is measured, not asserted.

**Counts:** 3 BLOCKER · 8 MAJOR · 5 MINOR · 1 INFO upheld; 3 dismissed with bytes; 1 hypothesis
resolved to sound.

---

## 0. How I measured

Five read-only Chromium probes against the live dev server, plus my own reading of the tracked
frames. Probe sources in the session scratchpad; every number below is reproduced inline.

| Probe | Decides |
|---|---|
| `j3-gestalt.mjs` | grid share, heading census, blob rect vs headline interval, scroll/clip, beats, LCP/CLS/longtask, rAF — 4 matrices |
| `j3-perf.mjs` | real fps (clean single rAF chain, post-settle), TBT, layout-shift **sources**, dock-ink computed color — light + dark + mobile |
| `j3-dock.mjs` | 50 ms timeline of `nav.dock-band` height vs `.pane-main` top vs `.pane-container` top/height through boot |
| `j3-fc.mjs` | forced-colors under **Chromium** (the state WebKit cannot emulate) + eager first-paint module census |
| `j3-mobile-act.mjs` | independent third reproduction of the mobile dock-action defect |

Frames read with my own eyes: `safari-desktop-light/picker.png`, `safari-desktop-dark/picker.png`,
`safari-mobile-light/picker.png`, `zoom-200-desktop/picker.png`, and my own Chromium
forced-colors capture.

---

## 1. What the frames actually say

### 1.1 The desktop scene is two equal slabs — confirmed by my own measurement

```
gridCols   = "512px 512px"
left       = {x:199, w:512}   right = {x:729, w:512}
leftShare  = 50.0000 %
```

`VISUAL-CONSTITUTION.md:27` permits exactly `golden` (61.8033989/38.1966011) or `preview-dominant`
(66.6666667/33.3333333); `:43` binds Picker to the **exact golden inspector 38.1966011%**. Delta:
**11.80 percentage points**. Written intent, `demo/styles/shell.css:133-138`: *"Equal columns always
(the kept 1fr↔1fr invariant)"*. In `safari-desktop-light/picker.png` the About card and the Picker
card are the same width and the same material, so the frame does not say which one is the
instrument. That is not a shadow problem. It is the grid.

### 1.2 The blob is corner-bound; the void is NOT the blob's — CHALLENGE-D's harm claim is refuted

CHALLENGE-D (D-6) argues that when the blob loses the race, ~230 px of dead acreage ships in the
headline interval. I measured the interval directly, in both schemes:

```
                     desktop light      desktop dark
.title-row   h        84.97              84.97          ← byte-identical
identity→headline gap  7.16              7.16           ← byte-identical
blob rect             x564.6 y114.2 180.2×180.2 (bottom 294.4)   ← present in BOTH under Chromium
.readout              x220.47 y253.13 441.81×122.41
```

The blob's rect starts at **y=114.2 — above `.title-row`'s top (y=161)** — and it sits at
x=564.6 while the readout occupies x=220.47…662.28. The blob never occupied the identity→headline
interval. The interval is reserved unconditionally by `demo/picker/seat.css:89`
`min-height: calc(0.76 * var(--blob-fp) - 0.75rem)`, which resolves the same whether the blob
arrives or not. Compare the two tracked frames yourself: the gap between `Lab` and
`92.0%, 88.8, 20.0` is visually identical in the blob-present dark frame and the blob-absent light
frame.

**Ruling.** The blob-reservation void is `PROPORTION-AUDIT.md` PR-01/PR-03 — a **Picker-seat** row
owned by W20/W29 — and is **not App.vue's defect**. D-6's underlying defect (B4 has no terminal
`unavailable` arm; the blob canvas has no `webglcontextlost` contract where the aurora does) survives
and is upheld as **U-6**, at MAJOR, with the geometric harm claim struck.

### 1.3 200% zoom hands the user a different product, then clips it

At 720×450 @2 DPR — the 200% arm:

```
gridCols       = "688px"        ← single column: the MOBILE information architecture
left  = {x:104, w:512}          right = null
docScrollable  = 0              bodyScrollable = 0    appLayout = hidden/hidden h=450px
channelRail    = {y:451.67, h:182, bottom:633.67}   vs vh 450  → 183.67 px below the fold
clippedY       = div.card-content.z-1 · div.flex.flex-col · div.glass-quiet.card
scrollables    = ["div.glass-resting.card +223px"]   ← the ONLY escape, unlabelled, inside glass
```

`zoom-200-desktop/picker.png` shows it plainly: the card is cut across its middle, the entire
`L / a / b / α` channel rail — the Picker's only continuous editing instrument — is gone, and there is
no page scrollbar. WCAG 2.1 SC 1.4.4 and 1.4.10 both fail before `PROPORTION-AUDIT.md:16`'s required
*actual-400%-zoom* arm is even reachable.

Note the audit harness cannot see this: `audit/visual/states.mjs:69-71` filters on
`b.right > clientWidth+1 || b.left < -1` — **there is no vertical term**, so `STATES.json` reports
`clipped: []` for the very matrix whose screenshot shows the rail missing.

### 1.4 The chrome is seed-tinted in light — a finding no challenger raised

Computed `color` of the text leaves inside `nav.dock-band`:

```
light:  Tools → oklch(47.118925176164% 0.188447570516 9.83402284231deg)   chroma 0.1884
        Login → oklch(47.118925176164% 0.188447570516 9.83402284231deg)   chroma 0.1884
        (+ one nav <svg> at the same value)
dark:   Tools → oklch(95.832172477266% 0.021053120065 9.83402284231deg)   chroma 0.0211
```

Both labels paint in `--accent-live` verbatim. `--accent-live` is written to `document.documentElement`
by `demo/color-picker/composables/boot/useAtmosphereBoot.ts:96`, the composable **App.vue mounts at
:285-289**. In light the token carries chroma 0.188 — a fully saturated seed tint on two navigation
labels.

`VISUAL-CONSTITUTION.md:23`: *"`My` and every other navigation, route, pane, Admin, Account, action,
and status label use **neutral ink**. Consequently pastel/rainbow identity applications outside those
two exact `Palettes` substrings equal zero."* `:21`: *"Seed tint is forbidden outside the ambient
field, active accent, WatercolorDot/specimen, and pastel Palettes lanes."*

Look at `safari-desktop-light/picker.png` and then at `safari-desktop-dark/picker.png`. Dark is the
correct frame: neutral-warm chrome, near-white ink, the chromatic field doing all the color work.
Light is one hue end to end — field, glass, ink — and nothing in it is neutral. The dark scheme obeys
`:21`'s restrained neutral pole; the light scheme has no pole at all. **The shell is the producer of
the token that leaks**, so this is App.vue's root even though the Dock is the visible site.

### 1.5 The retired pane selector is live at BOTH breakpoints

`nav.dock-band` button text, measured:

```
desktop-1440 : ["Home","Tools","Picker","About","Login","@mbabb"]
mobile-390   : ["Picker","About","Login","@mbabb"]
```

`VISUAL-CONSTITUTION.md:89`: *"V retires the global Dock `PaneSegmentedControl` and left/right view
state."* CHALLENGE-D presents this as a mobile artifact (`shots/safari-mobile-light/picker.png`); it
is on the desktop dock too. The finding is broader than charged.

---

## 2. Motion verdict

| Question | Answer |
|---|---|
| Does the ambient motion terminate? | **No.** rAF still climbing at t=7.8 s on every matrix (`rafRateLast4s` 143–342/s). Real frame rate sampled t=6→8 s: 44.7 / 43.7 / 120.2 fps. Nothing has stopped. |
| Is there a still/pause control? | **No.** `pauseControl = 0` measured; `grep -rniE "animation-play-state\|pauseAnim\|isPaused\|aria-pressed.*motion" demo/` → zero hits. |
| §6:145 | *"terminates within five seconds **or** exposes one persistent keyboard-operable still/pause control whose state is announced and remembered."* **Both arms fail.** |
| `prefers-reduced-motion` | **Correct, and it is the best-engineered thing in the file.** `rafPer1500ms = 0` under `reducedMotion: reduce` (`STATES.json`) — the WebGL loops genuinely tear down, not merely zero their opacity. `prmInstant` gates the land class (App.vue:30); `useOverture.ts:98-100` collapses every beat synchronously. |
| Layout-forcing property animated? | **No.** App.vue:388-394 records deleting the former `height`/`margin`/`padding` co-transition for exactly this reason. The swap rides transform/opacity. Correct. |
| Tokenized? | **One exception.** App.vue:119 hard-codes `transition-opacity duration-200` on the right slot — an ad-hoc 200 ms, per-instance, bypassing the `--overture-*` / `--spring-*` ladder the rest of the file uses properly. Edicts 5 and 6. |
| Global keyframes home | **Violated.** `demo/color-picker/composables/boot/overture.css` is 195 lines declaring `@keyframes overture-plate-land` (:84), `plate-land` (:118), `blob-emerge` (:167) — three **global** keyframes outside `demo/styles/`. Edict 6. The cure is a `git mv`, never a deletion. |

The reduced-motion arm being right is what makes the missing pause control indefensible: the
mechanism to stop the loops already exists and is proven to work. It is simply not reachable by a
user who has not set an OS preference. Ambient motion runs forever on a battery-powered mobile
device with no way to stop it.

---

## 3. Performance verdict

### 3.1 The shell paints fast and then blocks for two thirds of a second

```
matrix                LCP    CLS      longTasks (dur@start)          TBT
desktop-1440-light    300    0.0193   217@141 · 608@2542             725–823 ms
desktop-1440-dark     276    0.0193   162@115 · 611@2413             673–763 ms
mobile-390-light      236    0        174@136 · 675@1925             749 ms
zoom200-720x450       300    0        —                              549–608 ms (2 tasks)
```

LCP 236–300 ms is genuinely excellent — the CSS-ground-first strategy works exactly as §6:142
intends. Then, at t≈1.9–2.6 s, a **608–741 ms** long task lands. Compare the overture marks from the
same runs: `overture:b4@2343` (desktop) / `@1831` (mobile). The block is coincident with B4 — the
beat App.vue's DAG owns (`App.vue:296`) and which gates the hero-blob mount. **The shell schedules a
>600 ms main-thread stall after its own first paint.** This is the same class as the T-tranche Q14
escalation (eager-WebGL-blob boot blocker) and it is still shipping.

### 3.2 The idle desktop scene drops one frame in four

Sustained frame rate, measured six seconds after load with a clean single rAF chain and zero user
input:

```
desktop-1440-light   44.7 / 46.5 fps
desktop-1440-dark    43.7 / 44.4 fps
mobile-390-light     120.2 fps
```

Same headless binary, same machine, same moment. The mobile scene reaches 120 fps; the desktop scene
is pinned at ~45. This is not a harness ceiling — the ceiling is demonstrably ≥120. It is scene cost.
The desktop differences are: two mounted panes instead of one, `backdropCarriers` 3 vs 2, and a
1042×774 glass area versus 358 px. **The companion pane the canon retires costs roughly half the
frame budget.**

### 3.3 The scene re-centres after paint

```
CLS 0.01928 @ t=345–472 ms, source:
  DIV.pane-container.pane-container--dual   199,148 1042x685  →  199,103 1042x774
  DIV.pane-wrapper.pane-wrapper--left       199,148  512x685  →  199,103  512x774
```

The pane grows 89.2 px and, because it is flex-centred inside a fixed-height `<main>`, its top moves
**44.6 px up**. Mobile CLS is 0 because the mobile pane is `max-height`-clamped and cannot grow.
§6:142 requires enhancement *"after paint without geometry change"*.

### 3.4 The anonymous first paint carries the admin console

```
totalAll = 250 resources · totalDemo = 137 modules
bucket = { shell:31, palettes:29, picker:25, color-session:23, ui:11, platform:10, scenes:3, styles:3, shared:2 }
admin eager on /#/ as an anonymous visitor:
  shell/dock/composables/useDockAdminMode.ts · platform/auth/useAdminAuth.ts
  palettes/useAdminUsers.ts · useAdminAudit.ts · useAdminFlagged.ts · useAdminTags.ts
  palettes/api/admin-palettes.ts · admin-users.ts · admin-colors.ts · admin-audit.ts
```

Ten admin modules and four admin API clients parse and execute on the first paint of a route that
mounts none of them, inside the long-task window measured in §3.1. CHALLENGE-L found this
statically (L-6/L-7); I confirm it live and bind it to the cost.

---

## 4. Negative proof — what I attacked and could not break

Recorded so the APOTHEOSIS verdict is not read as "everything here is wrong." Each of these is a
**pinned witness that must stay green**; a future wave that "fixes" one of them has broken something.

### 4.1 §3 law 4 HOLDS — the dock's reserved band is real

I suspected the 0.0193 CLS was the dock collapsing the scene, and I was wrong. 50 ms timeline through
boot:

```
desktop:  navH 72 → 86.7 → 81.8 → 77.1 → … → 72      mainTop = 88   CONSTANT, every sample
mobile:   navH 72 → 75.7 → 75.2 → 74   → … → 72      mainTop = 104  CONSTANT, every sample
```

The dock morphs through five distinct heights during its mount-and-land and the scene below **never
moves**. `VISUAL-CONSTITUTION.md:30` (§3 law 4) — *"Expanded/collapsed/mounted states do not move the
scene below it"* — is satisfied structurally. `--dock-band-min-h` (`shell.css:44`) earns its keep.
The shift in §3.3 is the pane's own late height resolution inside a centred fixed-height main, which
is a different mechanism and folds into **U-7**.

### 4.2 Forced colors is CORRECT — and better than CHALLENGE-D assumed

D-15 was labelled a hypothesis because WebKit ignores `forcedColors` emulation. I resolved it under
Chromium. Measured with `forced-colors: active` genuinely matching:

```
nav.dock-band  bg rgba(255,255,255,0)  color rgb(0,0,0)  backdrop-filter none  forced-color-adjust auto
.pane-main     bg rgba(255,255,255,0)  color rgb(0,0,0)  backdrop-filter none  forced-color-adjust auto
.app-layout    bg rgba(255,255,255,0)  color rgb(0,0,0)  backdrop-filter none  forced-color-adjust auto
.atmosphere-canvas                                        forced-color-adjust none  (chromatic, by roster)
```

My capture shows the chrome correctly adopting the system palette: opaque white cards, black borders,
black ink, glass dropped — while the spectrum well, the channel gradients, the blob and the ambient
field keep their color. That is a **deliberate, documented two-tier policy**
(`demo/styles/foundation.css:653-698`): *"tier 1 — `forced-color-adjust: none` on the color-DISPLAY
surfaces (they ARE the content) … tier 2 — the CHROME stays at the UA default `auto`."* A color tool
that blanked its specimens in WHCM would be useless. **D-15 is DISMISSED.**

### 4.3 Also sound

- **One `<main>`, always.** `mainCount = 1` on every matrix I measured and on all 60 tracked captures
  (`REPORT.md:27` `mainCountNotOne = 0`). The `<nav>` is a real labelled landmark (App.vue:24-27).
- **Zero page errors, zero horizontal overflow** across all 60 tracked captures and all my runs.
- **Dark chrome uses the restrained neutral pole** (§2:21) — measured `--accent-live` chroma 0.0211.
  Dark is the reference frame; light should be brought to it, not the reverse.
- **`ErrorBoundary`** (App.vue:50, `role="alert"`, focus-managed) is the one fully designed state in
  the file.
- **No layout-animating transitions**, and the deletion is recorded with its reason (App.vue:388-394).

---

## 5. Upheld findings

Merged by mechanism. `U-n` is this jury's identity; the challenger IDs it absorbs are named.

### U-1 · BLOCKER — instance registration is a per-call-site prop, so liveness forks with the breakpoint
*(absorbs D-1, C-2, C-3, D-13)*

`:on-mount` is attached to the two **desktop** slots (App.vue:105, :131) and **not** to the mobile
slot (App.vue:83-91). `onDesktopLeftMount`/`onDesktopRightMount` (App.vue:323-332) are the sole
writers of all four pane refs. At any mobile viewport they are permanently `null`, and every consumer
optional-chains into the null (`usePaneRouter.ts:196-198, :208-210, :220-222` — nine actions).

**My own reproduction** (`j3-mobile-act.mjs`, Chromium, a third independent script and engine —
CHALLENGE-D used WebKit, CHALLENGE-C used a different Chromium harness):

```
desktop-1440  Regenerate  found · enabled · 32×32 · specimenChanged TRUE
              oklch(0.591714 0.124709 75.2157) → oklch(0.698249 0.158545 115.242)
mobile-390    Regenerate  found · enabled · 32×32 · specimenChanged FALSE
              oklch(0.790367 0.10542 270.016) → oklch(0.790367 0.10542 270.016)   [byte-identical]
errs: [] on both sides
```

Nine named, enabled, hit-testable controls that do nothing, silently. Plus everything hanging off
`colorPickerRef`: the picker's action bar (App.vue:38), commit/cancel-edit (App.vue:41-42), and
`usePaletteWiring` (App.vue:352), whose 2 s give-up poll (`usePaletteWiring.ts:37-58`) is the
*guaranteed* path on mobile rather than the race guard it was written as.

`VISUAL-CONSTITUTION.md:83`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."* A control
that is named and enabled and inert is the worst possible state expression — worse than absent.

C-3's second symptom is the same mechanism read from the other end: the dispatcher decides *which*
ref by reading `currentConfig.value.left` (the incoming view) while `PaneSlot` delays its rendered
triplet by one rAF (`PaneSlot.vue:86-97`), so during a swap a ColorPicker instance lands in
`generatePaneRef`. The `ref<any>` declarations (App.vue:317-319) and `onDesktopLeftMount(el: any)`
are the enabling condition: nothing type-checks, so a structural gap is a silent no-op forever.

**Disposition BUILD.** The slot knows what it mounted; the shell does not. `PaneSlot` reports
`(instance, liveKey)`; the shell keys one `paneRefs` record off that name. One path for all slots,
typed over the real instance shapes, so a missing registration is a compile error. Under U-2 the
branch does not exist at all.

### U-2 · BLOCKER — the organizing premise is retired by the constitution, by name, in four clauses
*(absorbs D-2; root of U-3, U-6-adjacent, U-9, U-11, U-14)*

App.vue is a `left` + `right` + mobile-selector workspace and nothing else. Measured against the live
table (`grep -n "right:" demo/shell/viewSchema.ts`): **13 of 14 views ship a companion**; only
`/atmosphere` (`:172`) is `right: null`. All five Admin views ship `right: "palettes"` (`:190, :199,
:208, :217, :226`) — the exact companion §7 deletes. About is Picker's equal companion (`:107`).
Two canonical member routes, `/about` and `/easing`, **do not exist**: `grep -n "path:"
demo/color-picker/router/index.ts` lists 14 paths and neither is among them.

- `VISUAL-CONSTITUTION.md:89` — *"V retires the global Dock `PaneSegmentedControl` and left/right view state."*
- `:32` — *"no global pane selector, left/right split state, or simultaneous two-stage miniature survives."*
- `:218` — *"the current Palettes companion, right label and resulting mobile pane selector are **removed rather than restyled**."*
- `:58` — *"About is a quiet trailing destination rather than Picker's companion."* Inventory fixed at eleven routes.
- `:38` — `InstrumentChassis` is the housing contract; *"value.js composes regions with domain content; it **does not clone a local chassis recipe**."*

`.pane-container` / `.pane-wrapper--left` / `--right` / `--ghost` **is** a local chassis recipe: one
hand-rolled stage/inspector split with its own ratio, collapse rule and reserve, applied uniformly to
eleven members the canon requires to be separately composed. And §3.1's closing sentence forecloses
the cheap read: *"Resizing the old equal-card matrix cannot satisfy any member."*

**Disposition BUILD.** Single-scene shell: `<nav>` dock band + one `<main>` + one landmark-neutral
route scene + the stable H1. Region composition — stage/inspector/action, ratio, collapse, mobile
order — moves onto `InstrumentChassis` per route as §3.1's table already binds. The `left`/`right`
axis, `mobilePaneIndex`, the physical wrapper names, the ghost slot, `--dual`, and the
desktop/mobile `v-if` fork die in one cut. §3.3's 45 fps and §3.2's long task are the performance
receipt for doing it.

### U-3 · BLOCKER — 50.0000 % / 50.0000 % where the canon permits two exact ratios
*(absorbs D-3)* · **UPHELD_REPRODUCED** — my measurement in §1.1. Source `shell.css:133-138`.
§3 law 2 compounds it: *"Empty secondary content … never receives half the viewport"* — every
`right:"palettes"` route with an empty library receives exactly half. `PROPORTION-AUDIT.md:48`
(PR-04) requires the Admin companion `50%→0`.
**Disposition FOLD into U-2's wave** — the ratio is a property of the route composition, not of the
shell; the shell must stop declaring `grid-template-columns` at all.

### U-4 · MAJOR — the shell owns `<main>` but not the heading; there is no H1 anywhere and no skip link
*(absorbs D-4, C-4)*

Measured by me on four matrices: `h1 = 0` everywhere. Desktop `h2 = 10`, `h3 = 11` (both from panes);
mobile `h2 = 0`, `h3 = 1` — so on mobile the document's **first heading is an `h3`**. `mainCount = 1`
everywhere; skip-link anchors `0`; `role="status"` / `aria-live="polite"` regions `0`. The tracked
matrix agrees: the `h1` column is `0` for all 60 captures (`REPORT.md:119-178`). `grep -rln "<h1"
demo/` → no output.

`VISUAL-CONSTITUTION.md:85`: *"Each route has one H1 and exactly one stable main landmark, **owned by
the shell**."* `:118`: *"The shell `<main>` and route H1 are stable nodes."* App.vue delivers exactly
half the sentence — and it is the only component that *can* deliver the other half, since §3.1 makes
route scenes landmark-neutral. Four of the seven rows of §5.1's navigation-focus table resolve focus
to a "destination H1" that does not exist.

**Disposition BUILD.** One `<h1>` inside `<main>`, fed by the same route identity
`installDocumentTitle` already composes (`router/useDocumentTitle.ts:62`) — one source, two sinks —
plus the `tabindex="-1"` focus seat §5.1 requires, plus a skip link as the shell's first tabbable
node. Promote `PaneHeader` (`demo/shared/ui/PaneHeader.vue:21`) from `h3` to `h2` so the outline
reads h1→h2→h3.

### U-5 · MAJOR — ambient motion never terminates and no still/pause control exists
*(absorbs D-5)* · **UPHELD_REPRODUCED** — §2. Both arms of `VISUAL-CONSTITUTION.md:145` fail:
motion measured live at t=7.8 s on every matrix, `pauseControl = 0`, zero grep hits for any pause
mechanism. App.vue:285-289 mounts the renderer and App.vue:9-17 owns its canvas, so the control has
no other home.
**Disposition BUILD.** One shell-level ambient-motion control, keyboard-operable, `aria-pressed`,
persisted alongside the color-mode store, gating **both** renderers through the `OVERTURE_KEY` beats
App.vue already provides — so "paused" tears the rAF loops down exactly as the reduced-motion path
already proves it can (§4.3), rather than zeroing opacity. §6:145: *"Paused, parked and offscreen mean
no animation work."*

### U-6 · MAJOR — B4 is a success-only gate and the blob has no context-loss contract
*(absorbs D-6, with its geometric harm claim STRUCK — see §1.2)*

The asymmetry is the defect. `grep -rn "webglcontextlost|webglcontextrestored|isContextLost" demo/ src/`
returns exactly three lines, all in `demo/color-picker/composables/boot/useAtmosphere.ts:288, 298, 301`
— the **aurora**. The blob has none. And B4 (`useOverture.ts:28-40`) opens on
"B3-complete ∧ B2-started ∧ chunk-resolved" with **no failed / unavailable / lost terminal arm**, so
the DAG cannot express "the ornament will not arrive." The tracked Safari run caught the consequence:
`REPORT.md:17` `safari-desktop-light /#/: WebGL: context lost.` with `canvas=1` and an **18905 ms**
settle against dark's `canvas=2` / 3515 ms — a 5.4× settle outlier. I could not reproduce the loss
under Chromium (blob present in all four of my matrices), so the trigger is engine-specific; the
missing arm is not.
**Disposition BUILD.** B4 gains a terminal `unavailable` arm (context lost, WebGL absent, chunk
rejected) and the blob canvas gains the `webglcontextlost`/`webglcontextrestored` contract mirroring
`useAtmosphere.ts:288-301`. The *geometry* consequence is **not** this wave's: it belongs to W20/W29
via PR-01/PR-03 (`seat.css:89`), and this jury pins that boundary with π-8.

### U-7 · MAJOR — a viewport-locked shell displaces the document scroller and re-centres the scene after paint
*(absorbs D-8; absorbs my CLS finding §3.3)*

```
desktop-1440    docScrollable 0  bodyScrollable 0  appLayout hidden/hidden h=900px   scrollables ["div.glass-resting.card +6685px"]
mobile-390      docScrollable 0  bodyScrollable 0  appLayout hidden/hidden h=844px
zoom200-720x450 docScrollable 0  bodyScrollable 0  appLayout hidden/hidden h=450px   scrollables ["div.glass-resting.card +223px"]
CLS 0.0193 @ desktop; .pane-container 199,148 1042×685 → 199,103 1042×774 @ t≈345–472 ms
```

Source: `demo/styles/shell.css:19-28` — `height: 100dvh; overflow: hidden`. §3 law 6 requires
*"Mobile uses **one document-scrolling** stage→inspector→action sequence beneath the same top dock."*
Instead every route's overflow is displaced into nested card wells — **6685 px deep** at desktop `/`,
behind the `shell.css:196-208` backdrop-filter carrier, with the page's own scrollbar suppressed.
And because the pane is flex-centred inside that fixed-height frame, any late height resolution
re-centres the whole scene: measured 89.2 px of growth producing 44.6 px of upward motion, 0.0193 CLS,
100 ms after first paint. One mechanism, two symptoms.
**Disposition BUILD.** The shell's block axis becomes `min-height: 100dvh`; the document scrolls; the
dock band keeps its reserved band via `position: sticky` on grid row 1 — which §4.1 proves is already
structurally sound and must stay sound. Content flows from the top rather than being centred, so a
late height cannot move what is above it.

### U-8 · MAJOR — there is no composition root, so the shell's own root contract lives in a file it cannot see
*(absorbs D-9, C-8, L-1, L-2; is the same seam as MT-F012's P0)*

Measured, every matrix: `mountHostIsBody = true`, `appLayoutParent = "body"`, `bodyAttrs =
class="relative" id="app" data-paper-field="" data-v-app=""`, and — my own measurement —
**`--ground-seed` empty and `data-ground-state = null` on all four matrices**, so §6.2's entire
frame-zero seed latch is unimplemented.

`find demo -name main.ts` → nothing. The entry is the 8-line inline `<script type="module">` at
`demo/color-picker/index.html:205-213`, whose module graph Vite 8/Rolldown drops from the production
bundle (MT-F012, reproduced byte-identically). Because an HTML file cannot express a composition
root, App.vue *is* the composition root and silently carries: the router-plugin dependency, the
fouc-guard lockstep, the `<body>` mount, four CSS imports, and two app-level installs
(`useGlobalDark()` :214, `provideApiClient()` :219) whose ordering contract exists only in a comment
at :212-213.

Four consequences, each dissolved by a correct entry:

1. `class="relative"` is **dead**: the atmosphere canvas is `absolute inset-0` inside `.app-layout`,
   which is already `position: relative` (`shell.css:25`), so `<body>` is never the positioning
   ancestor. Legacy — edict 2.
2. `data-paper-field` is glass-ui's field contract governing App.vue's own descendants, declared
   where App.vue cannot see it, with no type and no test seam.
3. `<body>` can hold no `<noscript>` and no pre-rendered fallback, because mount replaces its
   children — which makes §6.2's required *"static semantic boot-error region already present in
   HTML"* (`:168`) structurally impossible.
4. **Two precedence engines over the same three inputs**: `index.html:180-200` runs URL/storage/default
   in vanilla JS; `App.vue:231 resolveHydratedBootModel()` runs it **again** in TypeScript
   (`boot/hydrate.ts:53-78`). `VISUAL-CONSTITUTION.md:172` forbids it verbatim: *"it **does not repeat
   scheme/URL/storage precedence**, reconstruct an initial palette in TypeScript, or repaint a second
   'equivalent' ground."*

**Disposition BUILD.** `demo/color-picker/main.ts`, referenced by `src=`, with `<div id="app">` as
the host: `createApp(App, { boot: window.__VALUE_GROUND_BOOT__ })`, `app.use(router)`,
`await router.isReady()`, `app.mount("#app")`, plus the two installs and the CSS imports. Then
`class="relative"` is **deleted** not moved; `data-paper-field` moves onto `.app-layout`; `<body>`
regains §6.2's boot-error region; and `resolveHydratedBootModel`'s duplicate engine is deleted
outright rather than kept in sync. App.vue becomes a single-root component that owns its own material.

### U-9 · MAJOR — a cold load on 10 of 14 routes wedges the overture DAG for the session
*(absorbs C-1)* · **UPHELD_BY_BYTES** (CHALLENGE-C measured it three ways; I verified the byte path
and confirmed the sibling-beat asymmetry, but did not re-run the deep-link probe).

Mechanism: no `router.isReady()` before mount ⇒ `route.name` is `undefined` at App setup ⇒
`useViewManager.ts:43-46` falls back to `"picker"` ⇒ the picker mounts first on every deep link ⇒
`PaneSlot` swaps the child one tick later ⇒ the Vue `Transition` `appear` is cancelled ⇒
`@after-appear` never fires ⇒ `noteLeftPlateSettled` (App.vue:90, :109 — its **only** two call sites)
never runs ⇒ b3 and b4 never fire for the session. B3 is the **only** beat in this chain with no
state-checked fallback: `useDockArrival.ts:63-72` falls through on a `getAnimations()` emptiness
check, and B4's own wait falls through at `useOverture.ts:173`.
**Disposition BUILD, in U-8's wave** (the `await router.isReady()` line is the cure), **plus an
independent second arm**: arm B3 on the left pane's *mount* plus a `getAnimations()` settle check, so
no beat can ever be wedged by one missed DOM event.

### U-10 · MAJOR — the chrome paints in the seed accent in light mode
*(NEW — no challenger raised it)* · **UPHELD_REPRODUCED** — §1.4.
Producer: `useAtmosphereBoot.ts:96` writes `--accent-live` to `document.documentElement`; App.vue
mounts it at :285-289 and documents it at :278-284. There is no chroma bound and no declared consumer
contract, so an unbounded seed chroma is published to every descendant and the navigation labels take
it. Violates `VISUAL-CONSTITUTION.md:23` (neutral ink for every label but the two `Palettes`
coordinates) and `:21` (seed tint forbidden outside the four named lanes). The dark scheme is the
reference: same token, chroma 0.0211.
**Disposition BUILD.** The root token is bounded to the neutral pole for chrome consumption; a
separately named token carries the unbounded chromatic value for the ambient field / specimen lanes
that legitimately need it. One token cannot serve both a "restrained neutral pole" and a live
chromatic field. Site fix in the Dock; root fix here.

### U-11 · MAJOR — 200 % zoom is aliased onto "mobile" and then clipped
*(absorbs D-7)* · **UPHELD_REPRODUCED** — §1.3. `useBreakpoint("(min-width: 1024px) and
(min-aspect-ratio: 1.1)")` (App.vue:310-312) is consumed as a hard `v-if`/`v-else` (App.vue:77, :94),
so crossing it by zooming, rotating a tablet, or dragging a window **unmounts and remounts the entire
scene** — destroying the `:max="9"`, `:max="6"` and `:max="4"` KeepAlive caches, every pane's local
state, and both WebGL contexts. §3 law 7 forbids *"desktop-tight/mobile-airy fork and no breakpoint
pile."*
**Disposition FOLD into U-2's wave** — under a single-scene shell there is no mount fork to cross;
`.pane-wrapper` is already `container-type: inline-size` (`shell.css:82-84`), so zoom reflows instead
of re-architecting. **Plus one standalone obligation:** `states.mjs:69-71` gains a vertical term, or
this entire defect class stays invisible to the tracked audit.

### U-12 · MAJOR — "not found" is a silent rewrite of the user's intent
*(absorbs D-11)* · `router/index.ts:37` `{ path: "/:pathMatch(.*)*", redirect: "/" }`. Tracked:
`/#/does-not-exist` text = 859, byte-identical to `/#/`'s 859, in all four matrices
(`REPORT.md:133, 148, 163, 178`). Measured by me: `politeStatus = 0` on every matrix — the shell's
only live region is `ErrorBoundary`'s `aria-live="assertive"`, reserved for render throws.
`VISUAL-CONSTITUTION.md:113` requires *"redirect reason in one polite status, then destination
title/H1."*
**Disposition BUILD, in U-4's cure** — one shell-owned `role="status"` beside the H1, written by the
same route-settlement commit `installDocumentTitle` already hooks (`router/index.ts:47`).

### U-13 · MINOR — the anonymous first paint carries the admin console
*(absorbs L-6, L-7)* · **UPHELD_REPRODUCED** — §3.4: 137 demo modules, 10 admin modules, 250
resources, inside the long-task window. Root: `usePalettePorts` constructs and provides fifteen
composables in one call, so root-level DI statically pins every port to the eager chunk regardless of
the async pane boundaries. Edict 1 — a provider whose scope equals its constituents' scopes is a god
module reconstituted at the DI seam.
**Disposition BUILD.** Split by lifetime: always-on ports from `main.ts` via `app.provide`; browse
ports from `BrowsePane.vue`; the five admin ports plus `palettes/api/admin-*` from `AdminPane.vue` —
both already async boundaries.

### U-14 · MINOR — physical names and physical choreography under a logical grid
*(absorbs D-10)* · `shots/rtl-desktop/picker.png`: under `dir="rtl"` the Picker (protagonist) renders
on the **right**. `pane-wrapper--left` / `--right` (App.vue:77, :96, :119) are physical, and
`shell.css:94-96` gives `--left` an explicit `z-index: 1` for a directional stacking intent that is
now wrong-sided. `--overture-left-delay: 40ms` / `--overture-right-delay: 120ms`
(`boot/overture.css:18-19`) bind the entrance sweep to sides, so it runs against the reading
direction. §6.1:151 — *"chrome, navigation and layout | logical inline/block direction follows the
document."*
**Disposition FOLD into U-2's wave** — the slots vanish; until they do, names key off role
(`--protagonist` / `--inspector`) and the stagger keys off role, surviving `dir` inversion by
construction.

### U-15 · MINOR — a migration-choice overlay mounted unconditionally at the shell root
*(absorbs D-14)* · App.vue:152-157. `VISUAL-CONSTITUTION.md:224`: recovery *"is **never** rendered as
an empty library, silent reset, **migration choice**, **overlay**, or companion pane."* This mount is
two of the five named prohibitions at once, and it accretes the shell toward a god module (edict 1).
**Disposition BUILD.** The recovery article renders inside `<main>`, owned by the Library scene, per
§7. The shell mounts no domain dialogs.

### U-16 · MINOR — global keyframes outside `demo/styles/`, and one untokenized per-instance transition
*(absorbs L-9; adds the App.vue:119 site)* · `demo/color-picker/composables/boot/overture.css` — 195
lines, three global `@keyframes` (`:84`, `:118`, `:167`) — lives under `composables/`. Edict 6.
App.vue:119 hard-codes `transition-opacity duration-200` on the right slot, a per-instance override of
a slot-role property. Edicts 5 and 6.
**Disposition BUILD.** `git mv` the sheet to `demo/styles/overture.css` (**a move, never a
deletion**) and `@import` it from `foundation.css` beside `animations.css` (`:76`) and `shell.css`
(`:85`). The 200 ms opacity becomes a named token in that sheet, keyed by slot role.

### U-17 · MINOR — a styling hook with no rule anywhere
*(absorbs L-10)* · `grep -rn "picker-shell" demo/ node_modules/@mkbabb/glass-ui/dist/` → exactly one
line, `demo/shell/usePaneRouter.ts:134`, and it is the consumer. A class name that exists only to be
applied. Edict 2 (legacy residue).
**Disposition BUILD** — delete the token from the class string.

### U-18 · INFO — the ambient field opts out of forced colors, by design
The one residual from §4.2: `.atmosphere-canvas` is in the tier-1 `forced-color-adjust: none` roster
(`foundation.css:678-698`) although it is atmosphere, not a color-display specimen — so a WHCM user
gets a saturated magenta→orange field behind system-colored chrome. Contrast is preserved (text sits
on opaque system-white cards), and the roster comment names *"the atmosphere field"* explicitly, so
this is a deliberate ruling and not an oversight.
**Disposition RETIRE** — recorded as an owner-visible policy consequence, not a defect. Reopening it
would require an owner ruling that the ambient field is chrome rather than content, which the roster
already decided the other way.

---

## 6. Dismissed

| id | Why | Refuting bytes |
|---|---|---|
| **D-15** (shell fails forced colors) | The two-tier policy is deliberate, documented, and correct. My Chromium capture — the run WebKit could not produce — shows the chrome adopting system colors while the color-display surfaces keep theirs, which is the only sane behaviour for a color tool. | `demo/styles/foundation.css:653-698` (the roster + the tier-1/tier-2 rationale, naming `.atmosphere-canvas` and `.goo-blob-canvas`); measured `nav.dock-band` → `bg rgba(255,255,255,0)`, `color rgb(0,0,0)`, `backdrop-filter none`, `forced-color-adjust auto` under `forced-colors: active`; capture `scratchpad/fc-chromium.png` |
| **D-6's geometric harm** (blob absence ships ~230 px of dead acreage) | The interval is reserved unconditionally by the Picker seat and is byte-identical in the blob-present and blob-absent frames. The blob never occupied it — it is corner-bound, above and to the right of the reservation. The defect is PR-01/PR-03, owned by W20/W29, not App.vue. | `.title-row` height **84.97 px** and identity→headline gap **7.16 px** measured identically in light and dark; blob rect `x564.6 y114.2 180.2×180.2` vs `.title-row` top `y=161`; source `demo/picker/seat.css:89` `min-height: calc(0.76 * var(--blob-fp) - 0.75rem)`. D-6's *own* two screenshots show the same gap in both. |
| **D-8's premise that §3 law 4 is already satisfied and merely incidental** — and, symmetrically, my own initial suspicion that the 0.0193 CLS was a dock collapse | Both wrong in the same direction. The dock band's reserve is genuinely load-bearing and holds through five distinct nav heights; the shift is the pane's own late height inside a centred fixed-height main. Naming the wrong mechanism would have sent a wave to "fix" a sound structure. | 50 ms boot timeline: desktop `navH 72 → 86.7 → 81.8 → 77.1 → 72` with `mainTop = 88` **constant, every sample**; mobile `navH 72 → 75.7 → 75.2 → 74 → 72` with `mainTop = 104` constant. Shift source is `DIV.pane-container` `1042×685 → 1042×774`. |

---

## 7. Dissent

**Against CHALLENGE-D, on D-6.** D-6 is upheld as a defect and dismissed as a harm. Its severity
rests on a geometric claim its own evidence refutes, and its cure ("the headline interval collapses to
the named shared section rhythm") would have App.vue reach into a Picker-seat reservation owned by
W20/W29. Jurisdiction matters here: PR-01/PR-03 have named owners and a locked coordinate protocol
(`PROPORTION-AUDIT.md:17`), and a shell wave editing `seat.css:89` would collide with them. π-8 exists
to pin that boundary so the next session cannot blur it.

**Against CHALLENGE-D, on D-15.** Filed as a hypothesis with a stated way to decide it. I decided it,
and it came back sound and better-reasoned than the challenge assumed. Recorded so the pattern is
visible: an unverifiable emulation produced a suspicion, and the suspicion was wrong.

**Against CHALLENGE-C, on C-9's framing.** C-9 says the gates are vacuous. I would put it harder:
the gates are worse than vacuous, they are *actively misleading*. `states.mjs:69-71` measures
horizontal clipping with no vertical term, so `STATES.json` publishes `clipped: []` for the 200 % zoom
matrix whose own screenshot, in the same directory, shows the primary editing instrument gone. A gate
that reports green on a frame that is visibly red is a liability, not an absence. The vertical term is
a **wave obligation**, not a nice-to-have.

**Against all three challengers, on what was not measured.** Three seats produced twelve BLOCKER/MAJOR
findings between them and not one of them measured a frame rate, a long task, or a layout shift. The
component's worst-behaving axis at runtime — 673–823 ms TBT, 44 fps at idle, 0.0193 CLS — went
unexamined by every seat that was told to find defects. Structural reading finds structural defects;
it does not find cost. This is why the seat that owns the whole must measure the whole.

**No dissent** on U-1, U-2, U-3, U-4, U-5, U-7, U-8, U-9. Those are correct as charged, and U-2 is
correct as *root*: five findings collapse with it.

---

## 8. The one-sentence gestalt

App.vue is a lovingly documented two-pane workspace shell that the constitution retires by name, that
costs half its frame budget on the pane the constitution deletes, and that owns exactly half of every
contract it owns — the `<main>` without the H1, the landmarks without the bypass, the beat DAG without
a failure arm, the ambient motion without a stop, and the root element without the root.

---

## Appendix — probe reproductions

Scratchpad (session-local):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
· `j3-gestalt.mjs` · `j3-perf.mjs` · `j3-dock.mjs` · `j3-fc.mjs` · `j3-mobile-act.mjs` · `fc-chromium.png`

The decisive performance measurement, in full:

```js
// j3-perf.mjs — real frame rate, sampled 6 s after load, clean single rAF chain
const fps = await p.evaluate(() => new Promise(res => {
  let n = 0; const t0 = performance.now();
  const tick = () => { n++; if (performance.now() - t0 < 2000) requestAnimationFrame(tick);
                       else res(+(n / ((performance.now()-t0)/1000)).toFixed(1)); };
  requestAnimationFrame(tick);
}));
```

```
desktop-1440-light  fps 44.7 / 46.5   tbt 725–823   cls 0.0193   backdropCarriers 3
desktop-1440-dark   fps 43.7 / 44.4   tbt 673–763   cls 0.0193   backdropCarriers 3
mobile-390-light    fps 120.2         tbt 749       cls 0        backdropCarriers 2
```

No source file was modified by this seat. Writes confined to
`docs/tranches/V/megatranche/audit/components/App/`.
