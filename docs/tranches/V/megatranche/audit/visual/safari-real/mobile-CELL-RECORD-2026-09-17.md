SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.c` — THE MOBILE / iOS CELLS · terminal disposition, 2026-09-17

**Seat**: `.c` (mobile-Safari / iOS cell · the device session). **Cells owned**: `safari-app/ios-device`
and `safari-app/ios-simulator` — **SEPARATE cells** (`KF-W9.md` §Surface-list protocol 4; I-20;
`evidence/W9/CELL-ROSTER.md` §1 rows 2 and 3). **Gate**: G-KFW9-11.
**Substrate of record as published by `.a`**: keyframes.js `master == origin/master ==
55e9bf0d2391bbc6d9871bb3f0555a6225daae92` (`evidence/W9/SUBSTRATE-PIN.md`).

**CAPTURES IN THIS CELL: 0. SIDECARS: 0.** Self-counted from the settled bytes at the foot of this
file. **No shot is claimed, no cell is greened, and no reading is inherited from another cell.**

---

## 0 · The verdict, stated first

**G-KFW9-11: RED → RED (correctly).** Its CLOSES names *"one real-iOS-Safari session recording
focus-zoom fire AND non-restoration on blur at both surfaces … plus KAD-F4's autocapitalize/autocorrect
mutation"*. **Neither iOS cell can be opened on this host**, and the wave's pinned substrate no longer
has a servable artifact built from it. Three foreclosures are measured below; **two of them are not
curable by any grant this wave could be given**, which is why this seat escalates rather than
substitutes.

`KF-W9.md` §Goal criterion admits exactly three terminal states for a banked probe — EXECUTED,
RETIRED, or **UNREACHABLE-IN-CELL** — and `CELL-ROSTER.md` §2 defines the last as *"a UA capability
**or a missing host** forecloses it"*, requiring **the capability or host, named**. Every probe below is
booked `UNREACHABLE-IN-CELL` **with its host named**. None is booked EXECUTED. None is silently omitted.

---

## 1 · F-1 · `safari-app/ios-device` — NO PAIRED iOS DEVICE EXISTS ON THIS HOST

Three independent witnesses, the first double-run:

```
⟨xcrun devicectl list devices⟩  pass 1 → No devices found.
⟨xcrun devicectl list devices⟩  pass 2 → No devices found.

⟨system_profiler SPUSBDataType | grep -ic 'iPhone\|iPad'⟩ → 0

⟨xcrun xctrace list devices⟩  (== Devices == section, whole)
    == Devices ==
    MacBook Pro (DB2CF45D-880D-5456-9337-2EF1F62FBAEE)
    == Simulators ==
```

The `== Devices ==` section contains **exactly one entry and it is the host Mac**. There is no paired
iPhone or iPad over USB or network.

**Named host that is missing**: *a paired iOS device running Safari 26.x.* This forecloses the cell
itself, not one probe inside it.

**Why no other cell may stand in for it.** The bank's own words, re-read at
`registry/adjudicated/kf-CSSPasteDialog.md`'s R-9 row as carried at `KF-W9.md` §Carry D:
*"**KF.W9 owns the live witness** (zoom is hardware-only)"*, and *"**Head of the iOS-floor family** —
only this wave's Safari-mobile cell can witness it."* A desktop-Safari window resized to 390 px does not
auto-zoom on focus; it is a viewport, not a platform. Writing such a shot into a mobile cell would be
**I-20's convicted failure one cell over** — the same class the spec names at S-13 as *"a chromium
emulation labelled as WHC"*. **It is not done here.**

---

## 2 · F-2 · `safari-app/ios-simulator` — THE CELL CANNOT BE OPENED THROUGH THE WAVE'S APPARATUS

Simulators are **installed** — `⟨xcrun xctrace list devices⟩` lists 18, including
`iPhone 16 Simulator (26.0)`, `iPhone 17 Simulator (26.0)`, `iPhone Air Simulator (26.0)`. The cell is
foreclosed not by their absence but by the driver.

**(a) The flag named in the roster does not exist.** `⟨safaridriver --help⟩` prints six options —
`-h/--help`, `--version`, `-p/--port`, `-b/--bidi`, `--enable`, `--diagnose` —
and `⟨safaridriver --help | grep -ci simulator⟩` → **0**. `⟨safaridriver --version⟩` →
`Included with Safari 26.4 (21624.1.16.11.4)`.

**(b) The capability is rejected by the platform, double-run, identical:**

```
⟨nohup /usr/bin/safaridriver -p 4605 &⟩ ; ⟨curl -s :4605/status⟩
  → {"value":{"message":"","ready":true}}

⟨curl -s -X POST :4605/session
   -d '{"capabilities":{"alwaysMatch":{"browserName":"safari","safari:useSimulator":true}}}'⟩
  pass 1 → {"value":{"error":"session not created",
             "message":"Could not create a session: The 'macOS' platform is incompatible with
                        requested capability: safari:useSimulator.","stacktrace":""}}
  pass 2 → (byte-identical)

⟨pkill -f 'safaridriver -p 4605'⟩ ; ⟨lsof -nP -iTCP:4605 -sTCP:LISTEN | grep -c LISTEN⟩ → 0
```

The driver is **ready** and the refusal is **specific to the capability** — so this is a measurement of
the cell, not of a broken apparatus. `.a` measured the same binary opening a real `safari-app/desktop`
session at this clock (`CELL-ROSTER.md` §3.1), which is the control.

**Named host that is missing**: *a WebDriver endpoint able to host an iOS-Simulator Safari session.*

> **DATED CORRECTION-BESIDE (E-3 — `.a`'s artifact is NOT edited).**
> `evidence/W9/CELL-ROSTER.md` §1 row 3 names this cell's driver as **`safaridriver --use-simulator`**.
> **That flag does not exist in `safaridriver` 26.4** (the whole `--help` is printed above, and the
> `grep -ci simulator` count is 0), and the capability form of it is rejected by the platform. The
> roster's *cell separation* is untouched and correct — rows 2 and 3 remain distinct cells and the
> `assertCell()` throw still holds. What is corrected is one **driver cell**: the row named an opener
> that is not available on this host. Recorded here, beside, as the E-3 idiom requires; the roster's
> bytes are immutable.

---

## 3 · F-3 · THE PINNED SUBSTRATE IS STALE — no artifact built from `55e9bf0d` is servable

This bar is **wave-level**, not this seat's, and it moved twice during this seat's run. Measured in
order, each with its clock:

| clock | measurement | reading |
|---|---|---|
| 16:17 | `⟨ls -la ../keyframes.js/dist/gh-pages⟩` | `No such file or directory` — `.a`'s booked break (wave record, Act 2) still standing |
| 16:17 | `⟨git -C ../keyframes.js diff --name-only -- demo/ \| wc -l⟩` | **23** uncommitted demo files — `.a`'s ADDENDUM 16:14 blocker, widened from 21 |
| 16:20 | `⟨git rev-parse HEAD⟩` | **`5388907b`** — *moved*; `⟨git log --oneline -1⟩` → `build(kf/check): wire vue-tsc into 'check' … (X.KF.W4 .a / G-KFW4-1)` |
| 16:20 | `⟨git rev-parse origin/master⟩` | **`55e9bf0d`** — unchanged |
| 16:20 | `⟨git rev-list --left-right --count origin/master...HEAD⟩` | `0	1` — HEAD is **1 ahead and UNPUSHED** |
| 16:20 | `⟨git diff --name-only -- demo/ \| wc -l⟩` | **0** — the sibling committed; the worktree is clean |
| 16:20 | `⟨ls -la dist/gh-pages⟩` + `⟨stat -f '%Sm %N'⟩` | present again, **16:17:47**, `index.html` 8,381 B, 51 assets |

**So the two blockers `.a` escalated are gone — and they have been replaced by a third, which is the
same hazard at a different address.** The bundle on disk was built at **16:17:47**, i.e. **from
`5388907b`**, and:

```
⟨git diff --stat 55e9bf0d..5388907b⟩            → 26 files changed, 1200 insertions(+), 73 deletions(-)
⟨git diff --name-only 55e9bf0d..5388907b -- demo/ | wc -l⟩ → 23
⟨git diff --name-only 55e9bf0d..5388907b -- src/  | wc -l⟩ → 0
⟨shasum -a 256 dist/gh-pages/index.html⟩        → b127991c0f1e9ff0ff662fd5fba329269c5d4c188190972eb652ceba9e05343e
```

**The 23 changed demo files are this seat's photographic subjects, by name** — among them
`components/instrument/shell/EditorShell.vue` (**D-25**'s shell, and the `initIOSPlatformClass()`
caller), `components/instrument/keyframes/CSSCodeEditor.vue` (**R-9**'s sole
`clampIOSNoZoomFontSize` consumer), `app/dock/ChromeDock.vue` (**S-6**'s whole session),
`components/instrument/shell/EditorStartScreen.vue` (**KF-EST-3/4**, and S-7's P-1/P-2 head),
`components/instrument/transport/controls-pane/ControlsPaneWrapper.vue`, and
`scenes/cube/CubeScene.vue` · `scenes/cube/orbital-drag/OrbitalDrag.vue` · `scenes/easing/EasingTarget.vue` ·
`scenes/square/useSquareDemo.ts` — **three of OD-V3's four duplicating scenes**.

**Two consequences, stated so neither is softened:**

1. A capture taken from this bundle **cannot honestly carry `substrateSha: 55e9bf0d`**. That is the
   receipt-against-a-moving-substrate class which disqualified `8281638c` in the first place
   (`KF-W9.md` §H's witness-substrate law), and `.a` named it as *"the one option that is not
   available."* It is not taken.
2. The identity **`master == origin/master`** — the equality COHESION **§0j.C KF-WRITE** uses to
   *define* the execution substrate (*"the sacred checkout on `master` (= `origin/master`) is the
   execution substrate for … W9"*) — **no longer holds at the bytes**. Re-pinning is **G-KFW9-14's
   act**, and `.a` escalated exactly this decision to the orchestrator at `SUBSTRATE-PIN.md` §8 with
   three named shapes **(a)** wait-and-re-pin · **(b)** clean clone at `55e9bf0d` · **(c)** re-pin
   forward. **A phase-2 cell seat does not choose among them and does not re-pin.**

**F-3 is curable** — by the orchestrator taking one of `.a`'s three shapes. **F-1 and F-2 are not**: no
grant, build, clone or re-pin puts a paired iPhone on this desk.

---

## 4 · OP-4 — the per-cell capability record, OWED AND UNTAKEN

`KF-W9.md` OP-4 requires the three `.media` strings **evaluated inside each cell**. They are
**NOT TAKEN** for either cell, because **no session can be opened in either cell** (§1, §2).

| cell | `(forced-colors: active)` | `(prefers-reduced-transparency: reduce)` | `(prefers-reduced-motion: reduce)` | status |
|---|---|---|---|---|
| `safari-app/ios-device` | — | — | — | **UNREACHABLE-IN-CELL** · host: no paired iOS device |
| `safari-app/ios-simulator` | — | — | — | **UNREACHABLE-IN-CELL** · host: no iOS-Simulator WebDriver endpoint |

**NOT INHERITED.** `.a`'s `safari-app/desktop` reading (`CELL-ROSTER.md` §3.1) binds that cell alone and
is not copied into these rows — *"No cell inherits another's."* A blank here is a **named unreachability
with its host printed**, which is precisely what OP-4 demands instead of *"a silent blank"*.

---

## 5 · PROBE DISPOSITIONS — every row this seat owns, with its terminal state and its exact precondition

All rows: **`UNREACHABLE-IN-CELL`**, host named per §1/§2, plus the F-3 substrate precondition.
**Zero rows are EXECUTED. Zero are omitted. Zero are RETIRED** — this seat retires nothing; retirement
names a ruling and no ruling retires these.

### 5.1 · S-8 family (v) — the ONE iOS device session, whole (8 members, none double-spent)

The family's lock is that **one** session discharges all eight. No session opened, so **none** is spent
and the family remains intact and re-runnable as one unit.

| # | id ⟨record⟩ | what the device session would have decided | state |
|---|---|---|---|
| 1 | **R-9** ⟨kf-CSSPasteDialog⟩ | focus-zoom FIRE at the 14 px entry, and NON-restoration on blur | UNREACHABLE-IN-CELL |
| 2 | **SP-4** ⟨kf-SharePopover⟩ | same pair at the ~12.2 px share-URL field at 390; right-anchored popover off-screen | UNREACHABLE-IN-CELL |
| 3 | **R-20 / KAD-F4** ⟨kf-CSSPasteDialog + kf-KeyframesAddDialog⟩ | iOS autocapitalize/autocorrect **mutating typed CSS** in a `contenteditable` `<pre>`, `onInput` emitting the mutation into the model. **ARMED**: may revive **R-A's MAJOR** (§H trigger) | UNREACHABLE-IN-CELL |
| 4 | **KF-KC-16 / KF-KC-25** ⟨kf-KeyframeCard⟩ | auto-zoom on focusing the **`<pre>`** (`--type-small` floors at 14 px) + the same attribute rewriting | UNREACHABLE-IN-CELL |
| 5 | **KF-SCR-1** ⟨kf-SequenceScrubber⟩ | two-finger pinch on `.seq-scrub` at **375×667**: does `body.is-dragging` stick; does rubber-band fire `pointercancel` mid-drag | UNREACHABLE-IN-CELL |
| 6 | **i-13 / C-3** ⟨MISSED-F family, kf-AmigaScene house-wide⟩ | whether `touch-action: none` at the scene sites suppresses pinch-zoom in fact | UNREACHABLE-IN-CELL |
| 7 | **K-13** ⟨kf-SequenceScrubber probe 4⟩ | Safari mousedown-focus on `tabindex="0"` divs; keypress-after-scrub on **both** `.seq-scrub` and `.spring-rail`. **A cure-HOME decider** (S-7: run before either packet writes its focus cure) | UNREACHABLE-IN-CELL |
| 8 | **TimelineCaret probe 10** ⟨riding banked D-9's fold⟩ | the caret limb of the same session | UNREACHABLE-IN-CELL |

**Exact precondition for all eight**: *a paired iOS device running Safari, plus a servable build whose
source sha the capture may honestly stamp.*

### 5.2 · S-8 family (iii) — the 390×844 + 375×667 mobile pass

| subject | state | note |
|---|---|---|
| **KF-APP-6**, **KF-APP-8** | UNREACHABLE-IN-CELL | — |
| **EditorShell D-25** | UNREACHABLE-IN-CELL | the **notch** witness; needs a device with a safe-area inset. §6 records what reproduces statically and why that is not the witness |
| **EditorShell D-6** | UNREACHABLE-IN-CELL | — |
| **TD-36** | UNREACHABLE-IN-CELL | S-5: measured BEFORE and AFTER the KF-APP-6 cure — neither end taken |
| **KF-EST-3**, **KF-EST-4** | UNREACHABLE-IN-CELL | — |

**S-7's ordering is published and unspent**, so the next seat inherits it rather than its absence:
**KF-EST P-1 (the home Play control) FIRST**, then **P-2** (the KF-APP-6 IACVT settler, off which
D-1/D-7/ND-6, the ChromeDock anchor, TD-36 and D-25 all hang); **K-13 before either packet writes its
focus cure**; **KF-APP-1's crash-witness before kf-CubeScene SS-13 #8**; and **D-25 + KF-APP-6 in ONE
390×844 capture** — *"do not shoot separately."*

### 5.3 · S-8 (iii-a) — THE OD-V3 CAPTURE PACKET, 390 ARM · **NOT PRODUCED**

**Required by the packet**: **both transport homes** — the in-panel transport card (progress bar +
`Play`/`Reverse` + scrubber) **and** the bottom-center floating transport pill (play triangle in a
rainbow ring + scene dropdown + reset) — on **all four duplicating scenes `cube · amiga · square ·
easing`**, at **390** (this seat's arm; **1280** is `.b`'s), **against real Glass 7**.

**State: NOT PRODUCED — 0 of 8 cells (4 scenes × 2 homes) at 390.**

- **DISCRIMINATOR honoured, not evaded**: *a capture of one home, or of either home at one viewport
  only, does NOT satisfy the packet.* Nothing partial is filed as if it did.
- **FALSIFIER honoured**: *any scene shot at 390 alone, or against a pre-Glass-7 build, voids that
  scene's cell.* No scene is shot at 390 alone here, because no scene is shot.
- **Three of the four scenes moved under the pin** — `CubeScene.vue`, `EasingTarget.vue` and
  `useSquareDemo.ts` are inside the 23-file delta at §3, so even the bundle now on disk would not be a
  Glass-7-at-`55e9bf0d` reading of them.

**EXACT PRECONDITION, stated for KF.W10.** COHESION **§0j.C KF-ODV3** authorizes the shape in advance:
*"if the packet does not exist by then KF.W10 closes `complete_with_misses` on that row citing its exact
precondition."* The precondition is:

> **A servable keyframes.js demo build whose source sha the capture may honestly stamp (F-3), rendered
> at 390 in a cell this host can open.** F-1/F-2 foreclose the iOS cells; the 390 arm therefore also has
> no mobile cell to run in even once F-3 is cured. **This wave produces the packet and rules nothing** —
> the transport-home ruling stays the orchestrator's at KF.W10 `.g`, *"Never proxied."*

### 5.4 · S-8 (iii-b) — THE OD-V5 390 AT-REST OBSERVATION · **NOT OBSERVED**

**State: NOT OBSERVED.** The instruction is to record the at-rest state at 390 **either way** and rule
nothing; there is no cell in which to observe it. **Nothing is ruled here** — **OD-V5 stays DEFERRED**
pending glass's dock mark (§0j.C **KF-ODV5**; the mark is SS-6's boundary, not this wave's), and the
`complete_with_misses` shape is authorized in advance. **No glass-ui byte was read or written**;
producer rows ride the SS-6 BH relay, never a demo-side hack.

### 5.5 · S-6 — the ChromeDock touch/menu session · **NOT RUN**

One session was to carry all three: the **M-5/C-6** witness, the **M-4** rider check (the two kf-MbabbMenu
MUST-CARRY riders travel with banked kf-ChromeDock **M-4**, *whose cure as worded ships an unopenable
menu*), and **MM-4's computed-style falsifier**. **State: UNREACHABLE-IN-CELL**, and additionally
`app/dock/ChromeDock.vue` is itself inside the §3 delta — the session's own subject moved under the pin.
**The riders stay MUST-CARRY and unspent**; the deciding evidence S-6 names is still owed.

---

## 6 · WHAT *WAS* MEASURED — the static anchors, re-verified at the pin, read-only

Taken with `git show`/`git grep` **at `55e9bf0d`**, never at the dirty worktree, so these readings are
of the pinned substrate exactly. **This is the probes' SUBJECT reproducing; it is NOT the device
witness, and it closes nothing.** The bank's own standing on this family is *"mechanisms closed
statically, device confirmation outstanding"* — these rows leave it exactly there.

| row | command → output at `55e9bf0d` | reads |
|---|---|---|
| **D-25** | `⟨git show 55e9bf0d:demo/app/index.html \| grep -n viewport⟩` → `6:<meta name="viewport" content="width=device-width, initial-scale=1.0" />`; `⟨git grep -c 'viewport-fit' 55e9bf0d -- demo/ src/⟩` → **exit 1, no hits** | `viewport-fit=cover` absent repo-wide ⇒ every `env(safe-area-inset-*)` term resolves 0 px. Reproduces |
| **D-25 shell** | `⟨git grep -n initIOSPlatformClass 55e9bf0d -- demo/⟩` → `EditorShell.vue:115` (import) · `:133` (call) · `utils/iosTextEntry.ts:14` (decl) | the shell does call it. Reproduces |
| **R-9** | `⟨git grep -n clampIOSNoZoomFontSize 55e9bf0d -- demo/ src/ test/⟩` → decl `utils/iosTextEntry.ts:10`; **exactly one** consumer `CSSCodeEditor.vue:39`/`:137`; tests `ios-text-entry.test.ts:88`/`:89`/`:97` | ruled + unit-tested 14→16, **unused at the two surfaces that need it**. Reproduces — G-KFW9-11's born-RED witness holds |
| **R-20 / KAD-F4 / KF-KC-25** | `⟨git grep -c autocapitalize 55e9bf0d -- demo/ src/⟩` → **exit 1** · `⟨… autocorrect …⟩` → **exit 1** · `⟨… spellcheck …⟩` → **exit 1** | **zero hits repo-wide for all three attributes**. Reproduces exactly |
| **the contenteditable surfaces** | `⟨git grep -ln contenteditable 55e9bf0d -- demo/⟩` → 6 files; the three source-code ones are `timeline/CSSPasteDialog.vue` (`:17`), `keyframes/KeyframeCard.vue` (`:46`, its `<pre` at `:41`), `keyframes/components/KeyframesAddDialog.vue` | the three surfaces the attribute family names are present. Reproduces |
| **MISSED-F / i-13 / C-3** | `⟨git grep -n 'touch-action: *none' 55e9bf0d -- demo/⟩` → declarations at `amiga/AmigaScene.vue:254` · `cube/CubeScene.vue:12` · `cube/CubeTarget.vue:4` · `cube/orbital-drag/OrbitalDrag.vue:350` · `sequence/SequenceTarget.css:134` · `square/SquareScene.css:64` (two further hits are comments, in `AnimationControlsGroup.css:167` and `PlaybackRibbon.vue:165`) | **6 scene sites**, reproducing the banked figure to the digit |

**Self-count of this table**: 6 rows, all read at `55e9bf0d`, all read-only. **Zero keyframes.js bytes
written by this seat.**

---

## 7 · ESCALATION — S-13 shape

`KF-W9.md` **S-13** fences *"gate failures not local-recoverable"* and names the head case:
*"G-KFW9-1 RED because safaridriver cannot be enabled (**the named condition is unreachable → the
horizon is re-planned, not faked with webkit**)."* **This is that class, one cell over**: G-KFW9-11's
named condition — a real iOS Safari — is unreachable on this host, measured three ways, and the
simulator fallback the roster assumed is refused by the platform.

**The orchestrator's decision surface, stated without a recommendation this seat has no standing to
make:**

1. **F-1/F-2** — provide a paired iOS device, or re-plan the horizon so `safari-app/ios-device` is a
   declared UNREACHABLE cell for this pass and the family-(v) rows close as UNREACHABLE-IN-CELL at
   wave close rather than as owed.
2. **F-3** — take one of `.a`'s three shapes at `SUBSTRATE-PIN.md` §8. **(a)** and **(c)** are now both
   *available* where they were not at 16:14: the sibling has committed (`5388907b`) and the tree is
   clean. Note for whoever takes **(c)**: `5388907b` is **unpushed**, so `master == origin/master` is
   false until it is pushed, and re-pinning to it re-points every byte-offset receipt this wave carries
   across a **23-file demo delta**.
3. **The 390 arm of OD-V3 is not rescued by F-3 alone.** Even with a lawful pin and bundle, this seat
   has no mobile cell. If the orchestrator wants the 390 arm taken in `safari-app/desktop` at a 390-wide
   viewport, that is **a different cell, a different seat (`.b`) and a different filename prefix** — it
   is a lawful capture only if labelled `safari-app/desktop`, and it is **not** this seat's to file
   under `mobile-*`. Deciding that is a wave-level call, not a seat's.

**What this seat did NOT do**, named so the absences are legible as choices: no webkit-engine or
chromium reading was taken and relabelled; no desktop-Safari shot was filed as a mobile cell; no
simulator shot was filed as the device cell; no rebuild, clone, stash or checkout touched the
keyframes.js tree; `safari-real-matrix.js` was executed never written — in fact not executed, having no
lawful bundle to point at; no probe was marked EXECUTED, RETIRED or GREEN; no `.a` artifact was edited
(the one correction is a dated addendum-beside, §2); `scripts/dev/dev.sh` untouched.

---

## 8 · SELF-COUNT (from the settled bytes)

- **Captures in `safari-app/ios-device`**: **0**. **Captures in `safari-app/ios-simulator`**: **0**.
- **Per-shot `sha256` sidecars written**: **0** (there being 0 shots; a sidecar without a shot would be
  a fabricated receipt).
- **Probes booked to a terminal state by this seat**: **8** (family (v)) **+ 7** (family (iii) subjects
  — the table's five rows carry seven subjects: `KF-APP-6`/`-8` and `KF-EST-3`/`-4` are paired rows)
  **+ 8** (OD-V3 390 cells, 4 scenes × 2 homes) **+ 1** (OD-V5 at-rest) **+ 3** (S-6's M-5/C-6, M-4,
  MM-4) = **27**, every one `UNREACHABLE-IN-CELL` or `NOT PRODUCED` with its host and precondition
  named, **0 EXECUTED**, **0 RETIRED**, **0 GREEN**. *(Counted from the settled JSON by command, not
  from this prose: the first writing of this cell read "6 … = 26", counting the family-(iii) table's
  rows where the unit of account is its subjects. The figure is the re-run's, per the self-count law.)*
- **Gate turned**: none. **G-KFW9-11: RED → RED.**
- **keyframes.js bytes written**: **0**. **glass-ui bytes read or written**: **0**.
- **Files written by this seat**: 3 — this file, `mobile-cell-foreclosure-2026-09-17.json`, and
  `docs/tranches/X/keyframes/evidence/W9/UNIT-C-MOBILE-INDEX.md`, all inside `.c`'s writable set.
