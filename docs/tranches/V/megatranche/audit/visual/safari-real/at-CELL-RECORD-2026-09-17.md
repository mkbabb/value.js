SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.d` — THE AT CELLS · evidence record

**Wave**: X.KF.W9 (Track B · X·KF). **Unit**: `.d`. **Date**: 2026-09-17.
**Authority**: COHESION **§0j.C KF-AT** — *"**AT runs inside KF.W9 `.d`'s arm** (the proposed
resolution); no new lane is minted."* `KF-W9.md` §Carry **§F** · §Sequencing **S-8 family (vi)** ·
**S-12** (the scope dissent, **decided** by KF-AT and therefore not re-opened here) · **S-14** (the N-1
lock) · §Surface-list protocol 5 (discriminator + falsifier per probe).

Substrate and bundle as `hcm-CELL-RECORD-2026-09-17.md` §1:
`substrateSha 55e9bf0d2391bbc6d9871bb3f0555a6225daae92` ·
`bundleSha256 1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448` (both **measured**).

---

## 1 · WHAT THIS FILE IS, AND WHAT IT IS NOT — the line drawn first

**An AT cell's verdict is what an assistive technology UTTERS.** None of the three AT cells could be
opened on this host (§3). What this file publishes instead is the **AT-PRECONDITION INVENTORY**: the
roles, accessible names, live regions and value attributes **as the UA computes and the markup
authors them**, read in named non-AT cells.

> **The inventory is not a substitute and is never booked as one.** It is what makes each AT probe
> *checkable*: a probe whose subject has no accessible name cannot be satisfied by a screen reader
> announcing one, and a probe whose subject does not exist has no announcement to measure. Where a
> row's whole question is *"does it announce?"*, the answer here is **UNREACHABLE-IN-CELL** and the
> inventory records only the precondition.

Cells used for the inventory: **`chromium`** (playwright), stated because `webkit-engine` could not be
launched (§3.4) and **a chromium reading was not labelled `webkit-engine`** — that substitution is
I-20 in its other direction. Two rows were additionally read in the real **`safari-app/desktop`** cell
before it closed (`hcm-CELL-RECORD` §5) and are marked as such.

---

## 2 · THE INVENTORY, BY §F ROW

Six routes read: `/#/easing · /#/spring · /#/sequence · /#/amiga · /#/cube · /#/square`.

### 2.1 **D-2** ⟨kf-AmigaScene⟩ MAJOR — the bare `<canvas>` subject · **CONFIRMED, clause by clause**

The bank, quoted: *"The rendered DOM is one bare `<canvas>` (:13–16, read) — **no role, name, tabindex,
keydown, or fallback content**; both interactions pointer-only."*

Measured at `/#/amiga`, after a 9 s settle (the first pass at 6 s read only the Monaco editor's
canvases — recorded so no later seat repeats the mistake: canvases `0..2` are
`monaco-scrollable-element` / `minimap`, 14×446 and 0×446, **not the scene subject**):

One read, one element, whole output — the only canvas wider than 200 px on the route:

```json
{"className":"amiga-canvas h-full w-full rounded-card",
 "parentClassName":"scene-root relative h-full w-full",
 "w":781,"h":792,
 "role":null,"ariaLabel":null,"ariaLabelledby":null,"ariaDescribedby":null,
 "tabindex":null,"ariaHidden":null,"title":null,"textLen":0,
 "cursor":"grab","forcedColorAdjust":"auto","hasOnKeyDown":false,
 "attrs":["data-v-c2735272","class","data-engine","width","height","style"]}
```

**`attrs` is the whole finding in one line**: the element's *complete* attribute list is a scope id,
a class, a `data-engine` hook, `width`, `height` and `style`. **There is no ARIA attribute of any
kind, no `role`, no `tabindex`, no `title`** — not "unset in the ones we checked", but *absent from
the element's entire attribute set*.

| bank clause | measured | verdict |
|---|---|---|
| one bare `<canvas>` | `.amiga-canvas`, **781×792 CSS px**, inside `.scene-root`, the only canvas > 200×200 on the route | **HOLDS** |
| no **role** | `role: null`, and `role` is not among `attrs` | **HOLDS** |
| no **name** | `aria-label` · `aria-labelledby` · `title` all `null`, none among `attrs` | **HOLDS** |
| no **tabindex** | `tabindex: null`, not among `attrs` | **HOLDS** |
| no **keydown** | `hasOnKeyDown: false` | **HOLDS** |
| no **fallback content** | `textContent.trim().length: 0` | **HOLDS** |

*(`forcedColorAdjust: "auto"` is recorded here because it is the mechanism behind the
**canvas-bitmaps-EXEMPT** limit kf-SpringHeatmap D-M6/D-M7 requires the cure to state: forced colors
does not repaint a canvas's drawn bitmap.)*

**DISCRIMINATOR**: the probe reads the *subject's own* announced role/name, not the page's — the trap
§F names is *"the surrounding `<main>`, which announces a landmark and no subject"*, and it is present
and distinguished: ⟨`document.querySelectorAll('main,nav,header,footer,aside').length`⟩ → **1**.
**FALSIFIER**: *"any announced accessible name kills the row."* **None exists. The row survives its
own falsifier.**

**Cure-shape lock carried, unspent**: *"the cure is a **shared subject-a11y idiom for cube AND amiga**"*
— never an amiga-only patch, and never this wave's to spend (NO-WAVE-OWNER, scene-repair wave).
Corroborating the "shared" half: `/#/cube`'s inventory is structurally the same shape — `landmarks: 1`,
`namelessButtons: 6`, no subject role or name.

**Shot**: `at-chromium-amiga-bare-canvas-subject.png` ·
`sha256 e4937bdfe60c2cfc4b16e4e24d7d11f7c92ec622f7cc0fe5b52edb27b8dc3c4d` · cell `chromium`.

### 2.2 **MISSED-A** ⟨kf-AmigaScene⟩ MAJOR — the touch-affordance row · **UNREACHABLE-IN-CELL**

The bank's subject is **touch**: *"`cursor: grab` is the entire discoverability story … and cursors do
not exist on touch."* The instrument is a real phone, and **§0m.2 rules the iOS cells
UNREACHABLE-IN-CELL** (no paired device; `safari:useSimulator` refused). **The row is NOT measured
here and is not weakened to a desktop reading.**

What *is* measured is the **desktop control**, which is the row's own premise:

| premise | measured | reading |
|---|---|---|
| `cursor: grab` is present on the subject | `getComputedStyle(canvas).cursor` → **`"grab"`** | **HOLDS** |
| there is no *text* hint | ⟨`/drag\|grab\|swipe\|pinch/i.test(document.body.innerText)`⟩ on `/#/amiga` → **`false`** | **HOLDS** |
| the visible affordance inventory is *cursor only* | no subject role, no name, no title, no fallback text (§2.1); no hint string | **HOLDS** |

**DISCRIMINATOR**: *"a capture that merely shows the scene proves nothing — the probe is the
affordance."* The record above is the **affordance inventory**, not a scene shot.
**FALSIFIER**: *"any rendered discoverability signal at all."* On desktop the signal is `cursor: grab`
— **present**, so the desktop arm does not kill the row; on touch that signal is void by construction,
and **that is the cell that cannot be opened.** Precondition for closure: one real-iOS-Safari session
on the amiga route.

### 2.3 **D-B3** ⟨kf-SpringHeatmap⟩ MAJOR — `role="application"`, empty subtree · **CONFIRMED**

The bank: *"`role="application"` keyboard widget exposing no value, announcing no change, **both
children aria-hidden = EMPTY application subtree**; sole such role in the demo, unbanked."*

Measured at `/#/spring`:

```json
{"label":"Spring parameter-space heatmap — click or use the arrow keys to navigate response
          (horizontal) and damping (vertical); cells are tinted by peak overshoot",
 "labelWords":23, "describedby":null,
 "valuenow":null, "valuetext":null,
 "tabindex":"0", "childCount":2, "childrenAriaHidden":["true","true"]}
```

| bank clause | measured | verdict |
|---|---|---|
| `role="application"` keyboard widget | present, `tabindex="0"` | **HOLDS** |
| exposing **no value** | `aria-valuenow: null` · `aria-valuetext: null` | **HOLDS** |
| announcing **no change** | no `aria-describedby`; no live region inside the subtree | **HOLDS** |
| **both children `aria-hidden`** ⇒ empty application subtree | `childCount: 2`, `childrenAriaHidden: ["true","true"]` | **HOLDS — exactly two, both hidden** |

**NET-NEW, recorded not re-booked**: the element appears **TWICE** on the route with an identical
label — two `role="application"` nodes, not one. The bank's *"sole such role in the demo"* is a
*role-kind* claim, not an instance count, and is untouched; the duplication is a new datum for `.e`'s
addendum under the original id.

**DISCRIMINATOR**: an empty subtree is distinguished from an unlabelled one by reading the label
*and* the children — the label is rich (23 words) while the subtree is hidden, which is precisely the
defect shape. **FALSIFIER**: any exposed value or unhidden child would kill it; neither exists.
**Cure sequencing carried verbatim, unspent**: *"any `aria-valuetext` must wait on the packet's
lattice decision (L-M-1) — there is no honest cell to announce until the two input modes share one."*

**Shot**: `at-chromium-spring-heatmap-application.png` ·
`sha256 67e4ca6205e7a18e81fd4dffa2af4679116dda1e7a53c3989f06da830c50549a` · cell `chromium`.

### 2.4 **D-m8** ⟨kf-SpringHeatmap⟩ MINOR — the long label, **with a measured divergence**

The bank: *"the **33-word** `aria-label` announced whole on every focus, with no `aria-describedby`
split."*

| half | measured | verdict |
|---|---|---|
| no `aria-describedby` split | `describedby: null` | **HOLDS** |
| the label is announced whole on every focus | one `aria-label`, no split, `tabindex="0"` | **HOLDS** |
| **33 words** | ⟨`label.trim().split(/\s+/).filter(Boolean).length`⟩ → **23** | **DIVERGES — 23 at this substrate** |

**No re-grade and no re-booking.** The row's substance (one undivided announcement, no describedby) is
confirmed; only its numeral moves, and it moves **downward**, which does not strengthen the row. The
counting rule is stated with the figure so it reproduces: whitespace-split, empty tokens dropped, on
the literal `aria-label`. Routed to `.e` as a dated addendum under the original id (E-3).

### 2.5 **D-1 / L-i1** ⟨kf-PlaybackRibbon⟩ MAJOR-band — the unnamed scrub control · **CONFIRMED**

The bank: *"the sole AT-exposed scrub control has no accessible name (all three glass naming seams
unused; announces 'slider, 4820'; N-2: no meaningful value either)."*

Measured at `/#/easing` — **4** `role="slider"` nodes:

| # | `aria-label` | `aria-labelledby` | `aria-valuenow` | `aria-valuetext` | `aria-valuemax` |
|---|---|---|---|---|---|
| 1 | `Bezier control point 1` | — | `0.25` | `x 0.250, y 0.100` | `1` |
| 2 | `Bezier control point 2` | — | `0.25` | `x 0.250, y 1.000` | `1` |
| 3 | **`null`** | **`null`** | **`1500`** | **`null`** | `5000` |
| 4 | **`null`** | *(labelledby present)* | **`0`** | **`null`** | `1500` |

**Row 3 is the finding**: a `role="slider"` with **no accessible name at all** and a **bare numeric
`aria-valuenow` of `1500`** against `max 5000` — the announcement is *"slider, 1500"*, structurally
identical to the banked *"slider, 4820"* (the numeral differs because the substrate's duration differs;
the defect is the absence of a name and of a valuetext, not the digits). **N-2's second half —
*"no meaningful value either"* — HOLDS**: `aria-valuetext: null`, so a raw millisecond integer is the
whole utterance. **All three glass naming seams unused: confirmed** (`aria-label`, `aria-labelledby`
and `title` all absent on row 3).

**DISCRIMINATOR**: named vs unnamed is read on the **subject element**, and the two *named* bezier
sliders fifteen lines away are the in-page control that proves naming was available and not used.
**FALSIFIER**: any of the three seams populated would kill the row; none is.
**SCOPE DISSENT ON RECORD** (M-2/N-2 → AT lane vs ≥8 records routing utterances here) — **decided by
§0j.C KF-AT**, and not re-opened.

### 2.6 **D-12 + the kf-SequenceTarget relay** ⟨kf-SequenceAxis⟩ INFO datum · **valuetext limb CONFIRMED**

Received verbatim: *"`text-mono-caption` on the row label uppercases the child span, so `@800ms`
renders `@800MS` while the accessible name stays lowercase; and **the sliders lack `aria-valuetext`
(unit never announced — concordant with banked N-14's class)**."*

Measured at `/#/sequence` — **6** `role="slider"` nodes, **read in BOTH the `safari-app/desktop` cell
(real Safari 26.4) and the `chromium` cell, identically**:

| `aria-label` | `aria-valuenow` | `aria-valuetext` | `aria-valuemin`/`max` |
|---|---|---|---|
| `Re-time row 1 start offset` | `0` | **`null`** | `0` / `1600` |
| `Re-time row 2 start offset` | `260` | **`null`** | `0` / `1600` |
| `Re-time row 3 start offset` | `520` | **`null`** | `0` / `1600` |
| `Re-time row 4 start offset` | `780` | **`null`** | `0` / `1600` |
| `Re-time row 5 start offset` | `1040` | **`null`** | `0` / `1600` |
| `Scrub the sequence master playhead` | `0` | **`null`** | `0` / **`100`** |

**Valuetext limb: 6 of 6 sliders lack `aria-valuetext`.** The five row handles announce a bare
millisecond integer (`260`, `520`, …) with **no unit**; the master scrubber announces a bare
**percentage-domain** integer against `max 100`. **`aria-hidden` half NOT re-filed** — it is an
adjudicated NON-DEFECT (superlative 7) and is carried, not re-argued; the five sliders' min/now/max
triple is present exactly as that adjudication relies on.

**The uppercase-render limb (`@800ms` → `@800MS`) is NOT measured here** — it is a rendered-text
observation and the text was not captured at a legible scale in this pass. **UNMEASURED, precondition
named**: one capture of a sequence row label at a legible scale beside its accessible name. *(S-14:
the **valuetext** limb's cure stays blocked on N-1's time-domain decision; the **uppercase-render**
limb is explicitly free of that lock. Neither cure is this wave's to spend.)*

**Corroborating S-14's subject, measured**: the master scrubber's domain is a **percentage**
(`max 100`) while the row handles' domain is **milliseconds** (`max 1600`) — two normalizations on one
scene, which is the banked N-14 / D17+D18-unit *"no honest millisecond exists until the scene picks a
clock"* in one table.

### 2.7 **KF-CB-9** ⟨kf-CopyButton⟩ — the registry's single highest-value SS-13 probe · **PRECONDITION CONFIRMED, UTTERANCE UNREACHABLE**

The probe: *"does the NESTED `role="status"` announce at all in VoiceOver/NVDA/JAWS despite
Children-Presentational; if silent, ZERO working feedback on any channel, through every mount."*

**The structure the probe interrogates exists, and is measured:**

```json
/#/easing : [{"label":"Copy curve literal",  "nestedStatus":[]},
             {"label":"Copy easing literal","nestedStatus":[{"role":"status","live":"polite","text":""}]}]
/#/spring : five buttons, each {"label":"Copy to clipboard",
             "nestedStatus":[{"role":"status","live":"polite","text":""}]}
```

⟨live-region scan, `/#/easing`⟩ → the first hit is
`{"role":"status","live":"polite","parentTag":"button","parentRole":null}` — **a `role="status"`
whose PARENT IS A `<button>`**. That is exactly the Children-Presentational nesting the probe exists
to test.

**NET-NEW, recorded**: **two different copy-button implementations ship side by side on one route** —
`"Copy curve literal"` has **no** nested status region at all (`nestedStatus: []`), while
`"Copy easing literal"` has one. The probe's reach-through therefore has a **third** possible outcome
the bank does not enumerate: not *"announces"* vs *"silent"*, but *"one of the two mounts has no
status region to announce from in the first place"*. Routed to `.e` as a dated addendum under the
original id.

**The announcement question is UNREACHABLE-IN-CELL** (§3): no AT could be driven. **REACH-THROUGH
held, not spent**: kf-StartingStyleTarget #9 — *"silence re-weights KF-SST-7/11/29/39 together"* — and
ST-1's AT limb both remain **UNMEASURED** on the same precondition. *One AT pass, five rows: the pass
did not happen and no row is closed on its behalf.*

### 2.8 **KF-APP-33** ⟨kf-App; sites also kf-ChromeDock⟩ MINOR-band — `aria-label="Scene"` · **CONFIRMED on 6 of 6 routes**

The bank: *"`aria-label="Scene"` overrides `<SelectValue />` per accname §4.3.1-2C, ×3 sites."*

Measured on **every one of the six routes**:

```json
{"tag":"button","role":"combobox","aria-label":"Scene","innerText":""}
```

The element is a `role="combobox"` whose **`aria-label` is the static string `"Scene"`** and whose
**rendered text is empty at read time**, so accname §4.3.1 step 2C takes the `aria-label` and the
*selected scene* never reaches the accessible name. **The override is structural, not incidental**,
and it is present on the cube, amiga, square, easing, spring and sequence routes alike.
**DISCRIMINATOR**: a populated `innerText` with no `aria-label` would announce the selection; the
measured pair is the opposite. **FALSIFIER**: any route where the accessible name carried the scene
name would kill it; **0 of 6** do.

### 2.9 **D-6** ⟨kf-SpringTarget⟩ MINOR — *"no heading, no landmark, no accessible name anywhere in the scene"* · **CONFIRMED**

Measured at `/#/spring`: ⟨`document.querySelectorAll('h1,h2,h3')`⟩ → **`[]` (zero headings)** ·
⟨`main,nav,header,footer,aside`⟩ → **1**.

The bank's contrast — *"the sibling at the identical rung is semantic (EasingTarget.vue:22-28
`<header>` + `<h2>`, same utilities)"* — **reproduces in the same measurement run**: `/#/easing` →
headings **`["H2:ease"]`**. **Intra-repo divergence, measured on one substrate in one pass: spring 0
headings, easing 1.** That is the row's whole ground — *not house style* — and it now rests on a
side-by-side reading rather than on two separate citations.

### 2.10 **D-14 + N-4 — ONE BINDING** ⟨kf-SpringTarget⟩ MINOR each · **CONFIRMED**

N-4: *"the slider's accessible name is an instruction naming a modality … while `aria-valuenow`
announces the commanded target … two scalars, one unlabelled 0-100 announcement, no `aria-valuetext`."*

Measured at `/#/spring` — **16** `role="slider"` nodes, **16 of 16 with `aria-valuetext: null`**:

```json
[{"label":null,"now":"0.5","vt":null,"max":"1.2"},
 {"label":null,"now":"0.86","vt":null,"max":"1.5"},
 {"label":"Value 1 of 5","now":"0","vt":null,"max":"110"},
 {"label":"Value 2 of 5","now":"0.25","vt":null,"max":"110"},
 {"label":"Value 3 of 5","now":"0.5","vt":null,"max":"110"},
 {"label":"Value 4 of 5","now":"0.75","vt":null,"max":"110"},
 {"label":"Value 5 of 5","now":"1","vt":null,"max":"110"},  … (the set repeats)]
```

**`aria-valuetext` absent on every slider in the scene** — the N-4 half that is *"concordant with the
banked kf-SequenceAxis D-12 relay class"*. The `"Value n of 5"` names are **positional, not semantic**:
they name the slider's index, never its domain, and `aria-valuenow` runs `0 … 1` against a declared
`max` of `110` — a **declared range the values do not inhabit**, which is a sharper form of N-4's
*"one unlabelled 0-100 announcement"* and is recorded as a dated datum, not a re-grade.

**D-14's live-region half**: live regions **do** exist on the route, but every one measured is a
`role="status" aria-live="polite"` whose parent is a **`<button>`** — i.e. the copy-button feedback
regions of §2.7, **not** a settle/tracking region on the spring target. **No `role="status"` /
`aria-live` is attached to the settled↔tracking state change.** **HOLDS.**
**CURE LOCK CARRIED AND UNSPENT**: *D-14 and N-4 are ONE cure and are NEVER split.* Not this wave's
to spend.

### 2.11 **D-5 (aria-hidden half)** ⟨kf-SpringTarget⟩ MINOR — **UNMEASURED, precondition named**

The overlay's `aria-hidden` at `:107` and the retired discovery affordance at `:173` are source
coordinates in the kf tree; the **rendered** overlay was not isolated in this pass (the spring route's
inventory shows the scene's sliders and live regions, not the derby overlay's subtree).
**UNMEASURED**, precondition: one capture of the derby overlay in a mounted state with its subtree's
`aria-hidden` read. *Keyboard-only / AT operability is separately **UNREACHABLE-IN-CELL** (§3).*

### 2.12 **D-12's demo-side stopgap** ⟨kf-PlaybackRibbon⟩ MINOR, GLASS-OWNED — held, not spent

Booked as measurement (R-1e #30). The WHC pass is where this row is spent, and **there is no WHC
cell** (`hcm-CELL-RECORD` §4.4) — so it reads **UNREACHABLE-IN-CELL** with that bound. **No demo-side
`forced-colors` rule is authored by this wave**; the producer half rides the SS-6 letter and the
stopgap's cure bytes ride the transport/ribbon packet at KF.W13. *Dissent preserved: DU's MAJOR.*

### 2.13 **The D17/D18-unit fold** ⟨kf-SequenceScene⟩ — the S-14 lock, carried

The three normalizations the fold names are all measured at §2.6 on one substrate: slider
`aria-valuenow` in **ms** (`max 1600`) and the master scrubber in **percent** (`max 100`) on the same
scene. **D18's `aria-hidden` limb is KILLED BY THE BANK and is not carried.** The valuetext-in-ms cure
**stays BLOCKED on N-1** — *"no honest millisecond exists until the scene picks a clock"* — and no cure
is spent here.

---

## 3 · THE THREE AT CELLS — **UNREACHABLE-IN-CELL**, each with its own bound

| cell | driver required | measured bound |
|---|---|---|
| `at/voiceover-safari` | `voiceover+safaridriver` | **BOTH legs foreclosed.** (a) `safaridriver`: session creation returns *"You must enable 'Allow remote automation'…"*; `⟨safaridriver --enable⟩` → `Password:Password is not valid` — an interactive admin authorization this seat cannot supply (`hcm-CELL-RECORD` §5). (b) VoiceOver: `⟨ls -d /System/Library/CoreServices/VoiceOver.app⟩` → present, but `⟨pgrep -x VoiceOver \| wc -l⟩` → **0** and `⟨osascript -e 'tell application "System Events" to return (exists application process "VoiceOver")'⟩` → **`false`** — not running, and starting it takes over the owner's live machine (audio + keyboard) with no grant covering that |
| `at/nvda` | `windows-host` | **no Windows host and no VM host** — `⟨uname -a⟩` → `Darwin 25.4.0`; `⟨ls /Applications \| grep -iE 'parallels\|vmware\|utm\|virtualbox\|crossover'⟩` → no matches; `⟨command -v qemu-system-x86_64⟩` → no output |
| `at/jaws` | `windows-host` | same bound |

**Nothing is inferred from another cell.** §2's inventory is booked in `chromium` (and two rows in
`safari-app/desktop`); no inventory reading is written into an `at` column, and no `at` row is closed.

---

## 4 · S-8 FAMILY (vi) — ONE AT PASS · **NOT SPENT**

The family: *"ONE AT pass for KF-CB-9, KF-APP-33, KF-KC-2/3/26, MM-2, D-B3, D-1/L-i1, ST-1."*
**The pass did not happen**, so **no probe in the family is spent** and none may be re-spent later on
the ground that this seat "already looked". What each member now carries:

| member | state after `.d` | what remains owed |
|---|---|---|
| **KF-CB-9** | precondition **CONFIRMED** (nested `role="status"` inside `<button>`; two divergent mounts) | the **utterance** — one AT pass |
| **KF-APP-33** | **CONFIRMED** structurally on 6/6 routes | the utterance, if the row is to be closed on announcement rather than on markup |
| **KF-KC-2/3/26** | **UNMEASURED** — the KeyframeCard surface was not isolated in this pass | one AT pass + a KeyframeCard mount |
| **MM-2** | **UNMEASURED** — the MbabbMenu was not opened | one AT pass + the menu opened |
| **D-B3** | **CONFIRMED** structurally (§2.3) | the utterance |
| **D-1 / L-i1** | **CONFIRMED** structurally (§2.5) | the utterance |
| **ST-1 (AT limb)** | **UNMEASURED** — the five sliders' *announced* state | the utterance; its **HCM datum** is at `hcm-CELL-RECORD` §3.2 (no indicator under forced colors, `chromium` column) |

---

## 5 · SELF-COUNT · CAPTURES · BOUNDS

- **Shots in this record**: **2**, both force-added with a per-shot `sha256` sidecar, cell label and
  substrate ref — `at-chromium-spring-heatmap-application.png` ·
  `at-chromium-amiga-bare-canvas-subject.png`. (`hcm-*` carries **5** more; **7** for the unit.)
- **§F rows touched**: **13** — D-2 · MISSED-A · D-B3 · D-m8 · D-1/L-i1 · D-12+relay · KF-CB-9 ·
  KF-APP-33 · D-6 · D-14+N-4 · D-5 · D-12 stopgap · the D17/D18-unit fold.
  **CONFIRMED 8** (D-2 · D-B3 · D-1/L-i1 · D-12 valuetext limb · KF-APP-33 · D-6 · D-14+N-4 · D-m8's
  no-split half) · **DIVERGENT 1** (D-m8's word count, 23 not 33) · **UNMEASURED 3** (KF-CB-9's
  utterance · D-5 · D-12's uppercase-render limb) · **UNREACHABLE-IN-CELL 2** (MISSED-A's touch arm ·
  D-12's demo-side stopgap WHC arm). *Counting rule: one row = one §F bullet subject as named above;
  a row appearing in two dispositions is counted at its strongest measured half.*
- **NET-NEW data for `.e`'s addenda** (no re-booking, no re-grade, no new id):
  (1) D-m8's label is **23** words, not 33; (2) `role="application"` appears **twice**, not once;
  (3) the copy button ships in **two divergent forms**, one with **no** nested status region at all;
  (4) the spring sliders declare `max 110` for values that run `0…1`.
- **Bounds**: wrote only `safari-real/at-*`, `safari-real/hcm-*`,
  `docs/tranches/X/keyframes/evidence/W9/**` and `docs/tranches/X/execution/B/KF-W9.md`.
  **No adjudicated-record byte was written** — E-1/E-3 reserve that to `.e` alone, and this file hands
  the addendum material over rather than landing it. **Zero keyframes.js bytes. Zero glass-ui bytes.**
