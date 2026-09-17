SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.d` — THE CONTRAST / FORCED-COLORS CELLS · evidence record

**Wave**: X.KF.W9 (Track B · X·KF). **Unit**: `.d`. **Date**: 2026-09-17.
**Gates**: G-KFW9-8 · G-KFW9-9 (BEFORE witness) · share of G-KFW9-1/-2/-4/-14.
**Authority**: `docs/tranches/X/keyframes/waves/KF-W9.md` §Gates · §Sequencing S-2/S-8(iv)/S-13 ·
§Carry §B · COHESION §0m.2 (shape (b)) · §0j.C KF-ODV3/KF-ODV5/KF-AT.

---

## 0 · CELL SEPARATION, STATED BEFORE ANY VERDICT (I-20)

> **Nothing in this file is the `windows/real-HCM` cell.** That cell requires a Windows host in real
> High Contrast Mode. This host is `Darwin 25.4.0` and **no Windows host and no VM host exists**
> (measured at §4). A chromium emulation wearing a WHC label is **the I-20 failure by name**
> (`KF-W9.md` §Sequencing S-13) and is not committed here under any spelling.
>
> Every row below carries its **own** cell id. A `chromium/emulated-forced-colors` verdict **never**
> enters the `safari-app` column or the `windows` column, and a `safari-app` verdict never enters
> either of the others.

---

## 1 · SUBSTRATE — the §0m.2 shape-(b) capture clone, built and hashed here

Per **COHESION §0m.2**: *"Shape (b): build and serve from a SEPARATE CLONE at the named ref …
a grant for that tree only, never the sacred checkout; `npm ci && npm run gh-pages` there; the
bundle's `bundleSha256` and `substrateSha` are then both measured, never asserted."*

```
⟨git clone --no-hardlinks /Users/mkbabb/Programming/keyframes.js \
          /Users/mkbabb/Programming/keyframes-w9-capture⟩     → Cloning into … done.
⟨git -C …/keyframes-w9-capture checkout 55e9bf0d⟩             → HEAD is now at 55e9bf0d docs(coordination): …
⟨git -C …/keyframes-w9-capture rev-parse HEAD⟩                → 55e9bf0d2391bbc6d9871bb3f0555a6225daae92
⟨git -C …/keyframes-w9-capture status --porcelain | wc -l⟩     → 0        (clean at the pin)
⟨npm ci⟩                                                       → added 325 packages … audited 326
⟨npm run gh-pages⟩                                             → ✓ built in 1.15s
⟨find dist/gh-pages -type f | wc -l⟩                           → 54
⟨find dist/gh-pages -type f | LC_ALL=C sort | xargs shasum -a 256 | shasum -a 256⟩
                                                               → 1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448
   (DOUBLE-RUN, byte-identical; the tree re-verified at 55e9bf0d and still clean AFTER the build)
```

**SUBSTRATE OF RECORD, carried on every row below:**

| field | value | how it was obtained |
|---|---|---|
| `repo` | `keyframes.js` | — |
| `substrateRef` | `55e9bf0d` (the §0m.2 **HOLD**; the frontier has moved to `3e81f500`, of which the pin is an ancestor) | `git rev-parse` in the clone |
| `substrateSha` | `55e9bf0d2391bbc6d9871bb3f0555a6225daae92` | measured, not asserted |
| `bundleSha256` | `1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448` | measured, double-run |
| origin served | `http://127.0.0.1:9123` (static server over `dist/gh-pages`) | `curl → 200` |

**ZERO keyframes.js bytes written.** The clone is a §0m.2 grant for that tree only; the sacred
checkout was never touched, nothing was committed or pushed there, and the clone holds no commit
of ours ⟨`git -C …/keyframes-w9-capture status --porcelain | wc -l`⟩ → `0`.

---

## 2 · OP-4 — the per-cell capability record, taken INSIDE each cell

OP-4's law: *a row reporting `UNREACHABLE-IN-CELL` on a capability ground must point at its own
cell's reading, not at another cell's.* No cell inherits another's.

### 2.1 `safari-app/desktop` — Safari 26.4 / macOS 26.4.1 (25E253), `safari:useSimulator: false`

```json
{"fc":{"media":"(forced-colors: active)","matches":false},
 "fcNone":{"media":"(forced-colors: none)","matches":true},
 "prt":{"media":"(prefers-reduced-transparency: reduce)","matches":false},
 "prm":{"media":"(prefers-reduced-motion: reduce)","matches":false},
 "pcMore":{"media":"(prefers-contrast: more)","matches":false},
 "pcNoPref":{"media":"(prefers-contrast: no-preference)","matches":true},
 "dark":{"media":"(prefers-color-scheme: dark)","matches":true},
 "dpr":2,"iw":1280,"ih":848}
```

Window requested `1280×900`; **actual `1280×848`** — the clamp is recorded, never assumed.

### 2.2 THE DECISIVE READING — **can this host enter forced-colors at all?** (measured, with a control)

`.a` measured that the three `.media` strings **parse** in this cell, and correctly concluded that the
column *"is NOT foreclosed by UA capability"*. **That is a different question from whether the mode can
be entered**, and this seat measured the second one — because S-13's escape hatch is worded on the
first, and a seat that conflates them books a false `UNREACHABLE`.

The host's highest-contrast accessibility mode was toggled **on**, then **off**, and the same query
batch re-read in a fresh Safari session each time:

| host state | `prefers-contrast: more` | `forced-colors: active` | `forced-colors: none` |
|---|---|---|---|
| `com.apple.universalaccess increaseContrast` **absent** | `false` | `false` | `true` |
| `⟨defaults write com.apple.universalaccess increaseContrast -int 1⟩` | **`true`** | **`false`** | **`true`** |
| `⟨defaults delete …⟩` (restored) | `false` | `false` | `true` |

**THE CONTROL IS THE POINT.** `prefers-contrast: more` **flipped live**, in the same session, in the
same `matchMedia` batch, with no browser restart — so the host setting demonstrably **does** reach
Safari's media-query engine. `forced-colors: active` did **not** move. The conclusion is therefore a
**measurement, not an inference**:

> **`forced-colors` is not enterable on this host.** macOS/WebKit implements no forced-colors mode;
> the feature is a Windows High-Contrast-Mode mapping. The `safari-app` forced-colors arm is
> **UNREACHABLE-IN-CELL by PLATFORM**, not by UA capability (the query parses) and not by omission.
>
> The host setting was **restored** ⟨`defaults read com.apple.universalaccess increaseContrast`⟩ →
> *"The domain/default pair … does not exist"* — the state found at seat open.

### 2.3 `chromium/emulated-forced-colors` — playwright chromium, `forcedColors: "active"`

```json
{"fc":"(forced-colors: active)","fcMatch":true,
 "prt":"(prefers-reduced-transparency: reduce)","prtMatch":false,
 "prm":"(prefers-reduced-motion: reduce)","prmMatch":false,"dpr":1}
```

**`fcMatch: true`.** This is the only cell on this host in which `forced-colors: active` evaluates
true. **It is the chromium column.** Its control twin `chromium` (`forcedColors: "none"`,
`fcMatch: false`) was run in the same script, same bundle, same substrate.

---

## 3 · G-KFW9-9 — THE BEFORE WITNESS

### 3.1 The cascade, re-derived at the bytes of the substrate and of glass 7.0.0's shipped dist

Every link measured, none inherited:

| # | link | measured at | reading |
|---|---|---|---|
| 1 | producer ships the forced-colors focus rule | `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css` | `@media (forced-colors: active) { .focus-ring:focus-visible, .interactive-item:focus-visible, .dock-icon-button:focus-visible, … { outline: 2px solid Highlight; outline-offset: 2px; } }` |
| 2 | that producer file is **UNLAYERED** | ⟨`grep -c '@layer' …/a11y-overrides.css`⟩ | **`0`** |
| 3 | producer also ships the normal-mode twin | `…/dist/styles/utilities/base.css` | `.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }` — **inside `@layer components`** (brace-depth 1 from its `@layer` token) |
| 4 | demo copy A, at its anchor | `demo/styles/design-idioms.css:76-79` | `.focus-ring:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }` |
| 5 | demo copy A is **UNLAYERED** — and says so | brace-depth from the file's only `@layer` token → **0**; the file's own comment at `:10` reads *"OUTSIDE @layer so the demo's copy overrides glass-ui's incidental same-named"* | **the defeat is AUTHORED, not incidental** |
| 6 | demo copy B, at its anchor | `demo/styles/playback-idiom.css:72-75` | `.btn-playback:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }` |
| 7 | demo copy B is **UNLAYERED** | ⟨`grep -c '@layer' playback-idiom.css`⟩ → **`0`** | — |
| 8 | import order | `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` · `:14` `@import "./design-idioms.css"` (which imports `./playback-idiom.css` at its own `:6`) | **the demo imports LATER** |

**Cascade verdict**: rules 1 and 4 carry the **identical selector** `.focus-ring:focus-visible`, both
**unlayered**, so specificity and layer are ties and **source order decides — the demo wins** and
`outline` resolves to `none`. Under forced colors the UA additionally forces `box-shadow` to `none`.
**No indicator remains.** *(The spec's §B cell reads "different selectors, same (0,2,0) specificity",
which describes the two DEMO copies; the producer↔demo pair measured here is **the same selector**,
which is a stronger form of the same finding and is recorded as such, not as a correction of the bank.)*

### 3.2 THE LIVE WITNESS — `chromium/emulated-forced-colors`, forced-colors genuinely active

Method: navigate the served bundle, press **Tab** to establish keyboard modality, focus the subject,
read `getComputedStyle` **and** `:focus-visible` separately. Splitting the two is the built-in
**DISCRIMINATOR**: *"no indicator"* can never be confused with *"focus never happened"*.

| subject | route | `:focus-visible` | `outline-style` | `box-shadow` | verdict |
|---|---|---|---|---|---|
| `.btn-playback` (the ribbon Play button) | `/#/easing` | **`true`** | **`none`** | **`none`** | **NO INDICATOR** |
| `.focus-ring` (the demo-wide class) | `/#/easing` | **`true`** | **`none`** | **`none`** | **NO INDICATOR** |
| `.seq-handle` (a sequence row slider — ST-1) | `/#/sequence` | **`true`** | **`none`** | **`none`** | **NO INDICATOR** |

**THE FALSIFIER, run as its own control** — same engine, same bundle, same substrate,
`forcedColors: "none"`:

| subject | `:focus-visible` | `outline-style` | `box-shadow` |
|---|---|---|---|
| `.btn-playback` | `true` | `none` | `color(srgb 0.109804 0.0980392 0.0901961 / 0.3) 0px 0px 0px 2px, …` — **an indicator paints** |
| `.focus-ring` | `true` | `none` | same — **an indicator paints** |
| `.seq-handle` | `true` | `none` | same — **an indicator paints** |

**The row is falsifiable and survives.** The indicator exists in normal mode and is **wholly absent**
under forced colors, on all three subjects, with focus provably active in every cell of both tables.
The producer's `outline: 2px solid Highlight` **never appeared** — its defeat is observed, not argued.

Token resolved at `:root` in both states:
`--focus-ring-shadow: 0 0 0 2px color-mix(in srgb, light-dark(#1c1917,#bab7ab) 30%, transparent), 0 0 …`
— a **box-shadow-only** affordance, which is exactly why forced colors erases it.

**Shots** (force-added, per-shot `sha256` sidecar beside each PNG):

| shot | cell | sha256 |
|---|---|---|
| `hcm-chromium-emulated-forced-colors-easing-ribbon.png` | `chromium/emulated-forced-colors` | `bb2434b5c7bb9e17f29736ef8246b422e013ca7f3222af2b9dfd20bdcc1bdd88` |
| `hcm-chromium-emulated-forced-colors-sequence-slider.png` | `chromium/emulated-forced-colors` | `32c0504df7aa370a08a28e53e3e2da5faf26deb8b2c11a8cbd27268c72d1f36e` |

### 3.3 The `safari-app/desktop` arm — what it CAN and CANNOT carry

Three shots were taken in the real Safari cell before the cell closed (§5). They are the
**normal-mode** state, because §2.2 measured that the forced-colors state is not enterable here:

| shot | route | subject | `:focus-visible` | `outline-style` | sha256 |
|---|---|---|---|---|---|
| `hcm-safari-app-desktop-easing-ribbon-default.png` | `/#/easing` | tab-walk (60 tabs, did **not** reach `.btn-playback`; landed on `span.slider-thumb`) | `true` | `auto 5px rgb(26,169,255)` (the UA ring on a non-demo-classed element) | `631c27a9a8851d20f559001d5ca269d9de89f7983f5c4d6e277e44421f43c538` |
| `hcm-safari-app-desktop-easing-focusring-default.png` | `/#/easing` | `.focus-ring` (a `toggle-group__item`) reached in **3** tabs | `true` | **`none`** | `9c357c5f352c647b6277c3fcc6a51101a4b6f82f90caa2cd19eecebda9820356` |
| `hcm-safari-app-desktop-sequence-slider-default.png` | `/#/sequence` | `.seq-handle` reached in **1** tab | `true` | **`none`** | `ed0e28d46e55dc28208744f39481a5f0af4ec2c1ecaf0d5d39c06ef871936105` |

**What these prove in the safari-app cell**: the demo's `outline: none` is in force in real Safari
(`outline-style: none` on both demo-classed subjects with `:focus-visible` true), and the only
indicator present is the `box-shadow`. **The antecedent of RB-1 is measured here.** The consequent —
that the box-shadow is erased and nothing replaces it — is measured in §3.2's cell and is
**spec-derived** for this one, never claimed as a safari-app capture.

**`safari-app` + forced-colors ⇒ `UNREACHABLE-IN-CELL`**, bound stated at §2.2 (platform, not
capability, not omission).

### 3.4 THE RE-DERIVATION OBLIGATION — DISCHARGED, with a correction for KF.W13

§Carry §B hands this wave an explicit obligation: *"the redundancy ground for
`.btn-playback:focus-visible` is UNTESTED here and must be re-derived at KF.W13 before the deletion
lands; this wave measures it (G-KFW9-9) and hands the finding over."* The bank's ground is *"both demo
copies are wholly redundant against producer base.css's identical rule."* Measured, per copy:

| demo copy | producer counterpart at glass 7.0.0 | ground |
|---|---|---|
| `design-idioms.css:76-79` `.focus-ring:focus-visible` | `base.css` ships `.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }` | **TRUE AS STATED** — identical selector, same two declarations (the producer adds `border-radius`) |
| `playback-idiom.css:72-75` `.btn-playback:focus-visible` | ⟨`find node_modules/@mkbabb/glass-ui/dist -name '*.css' -type f \| LC_ALL=C sort \| xargs grep -l 'btn-playback'`⟩ → **no output, exit 1**; widened to ⟨`find …/dist -type f \| xargs grep -l 'btn-playback'`⟩ → **no output**. **No producer rule at any coordinate, in any file type** — `.btn-playback` is a demo-owned class | **FALSE AS STATED** |

**But the row survives by a different path, and the path is the finding.** Measured live in the
`safari-app/desktop` cell: **both `.btn-playback` buttons also carry `.focus-ring`** —

```
.btn-playback[0].className = "button tap-squish focus-ring glass-wash glass-capsule
                              glass-capsule-hover btn-playback btn-playback-accent"
.btn-playback[1].className = "button tap-squish focus-ring glass-wash glass-capsule
                              glass-capsule-hover btn-playback h-10 w-full rounded-full …"
   ⟨hasFocusRing⟩ → true, true       ⟨document.querySelectorAll('.focus-ring').length⟩ → 44
```

So the ribbon buttons are reached by the producer's `.focus-ring` rules — **once both demo copies are
gone**. This also makes **K-5 measured rather than argued**:

> Delete only `design-idioms.css:76-79` → `playback-idiom.css`'s `.btn-playback:focus-visible
> { outline: none }` still matches the **same buttons** → still no indicator.
> Delete only `playback-idiom.css:72-75` → `design-idioms.css`'s `.focus-ring:focus-visible
> { outline: none }` still matches the **same buttons** (they carry both classes) → still no indicator.
> **ONE ACT, NEVER SPLIT — confirmed by the buttons' own class list, not by inference.**

**Handed to KF.W13**: the redundancy ground must be re-worded before the deletion lands — it is
redundancy **via the co-present `.focus-ring` class**, not via a producer `.btn-playback` rule. This
wave spends no cure and deletes no byte; the AFTER witness reads **UNMEASURED** until KF.W13's act
lands (S-9).

---

## 4 · G-KFW9-8 — the demo-side count, re-recorded, and the fold families

### 4.1 The demo-side grep, re-run at the pin — **still 0**

```
⟨git -C …/keyframes-w9-capture grep -c 'forced-colors' -- demo/⟩ → exit 1, NO OUTPUT (0 files, 0 hits)
```

**Ninth independent seat to measure it.** This is the gate's *recorded result*, exactly as R-9a item 4
/ D-9 re-cut it: **the demo-side count is still 0 and no demo-side forced-colors rule is authored by
this wave** (the standing edict forbids it; KF-ET-4's cure lock forbids it).

### 4.2 The producer's rules — the FOUR-FILE CORRECTION re-measured, and it is now **TWELVE**

kf-SequenceAxis ruling 7 binds: *"producer forced-colors rules live in FOUR dist files
(components.css, accessibility.css, glass/a11y-fallback.css, utilities/a11y-overrides.css); every
'sole forced-colors rule is X' cell is KILLED."* Re-measured at glass **7.0.0**'s shipped dist:

```
⟨find node_modules/@mkbabb/glass-ui/dist -name '*.css' | LC_ALL=C sort | xargs grep -l 'forced-colors'⟩
  components/_shared/disclosure.css        components/checkbox/styles.css
  components/dialog/placement.css          components/header-ribbon/styles.css
  components/radio-group/styles.css        components/switch/styles.css
  components/toggle-group/styles.css       glass-ui.css
  styles/accessibility.css                 styles/components.css
  styles/glass/a11y-fallback.css           styles/utilities/a11y-overrides.css
                                                                       → TWELVE files
```

**The ruling's four are all present and all four still resolve.** The figure is **larger**, not
different in kind: the ruling's point — *no "sole rule" cell survives* — is reinforced, and this seat
publishes the enumeration rather than a numeral so the next census reproduces it. **No bank row is
re-graded here**; the reading is a dated measurement for `.e`'s addendum.

### 4.3 The sixteen fold families — status

`KF-W9.md` §Carry §B enumerates **sixteen** ` · `-separated fold families under KF-CE-13's one
identity, and G-KFW9-8's CLOSES asks for *"one WHC capture per fold family"*. **There is no WHC cell**
(§4.4), so no fold family receives a WHC capture. Each therefore reads **UNREACHABLE-IN-CELL** on the
`windows/real-HCM` column with the bound stated, and **UNMEASURED** on the `safari-app` column with
§2.2's platform bound. The `chromium/emulated-forced-colors` captures at §3.2 cover the **focus-
indicator** family only and are booked in their own column; they are **not** offered as WHC captures
and do not discharge any fold family's WHC row.

**canvas bitmaps EXEMPT** — the mechanism limit the cure must state, not paper over
(kf-SpringHeatmap D-M6/D-M7): measured live, the amiga subject is a `<canvas>` of 781×792 CSS px
(§`at-CELL-RECORD`), and `forced-color-adjust` computed **`auto`** on every subject read — forced
colors does not repaint canvas bitmap contents, so the exemption stands as a mechanism fact.

### 4.4 `windows/real-HCM` — **UNREACHABLE-IN-CELL**, with the bound

```
⟨uname -a⟩ → Darwin MacBook-Pro 25.4.0 …                     (no Windows host)
⟨ls /Applications | grep -iE 'parallels|vmware|utm|virtualbox|crossover'⟩ → (no matches)
⟨command -v qemu-system-x86_64⟩ → (no output)                 (no VM host either)
```

**BOUND**: no Windows host and no virtualization host exists on this machine, so real High Contrast
Mode cannot be entered in any form. **The `chromium/emulated-forced-colors` rows at §3.2 are NOT this
cell and are not labelled as it** — S-13 names that substitution as the I-20 failure by name, and it
is not committed here.

---

## 5 · THE `safari-app/desktop` CELL CLOSED MID-SEAT — recorded, not hidden

The cell was **open and productive**: four sessions were created and deleted cleanly
(`7BB393EF-…` at `.a`, then `2267EB2A-4A1F-4CDC-A014-BB3C3FE032D6` and two more here), OP-4 was taken,
and the three §3.3 shots were captured. Then session creation began returning:

```
⟨curl -X POST :4602/session -d '{"capabilities":{"alwaysMatch":{"browserName":"safari"}}}'⟩
→ {"value":{"error":"session not created","message":"Could not create a session: You must enable
   'Allow remote automation' in the Developer section of Safari Settings to control Safari via
   WebDriver.","stacktrace":""}}
```

Recovery attempted and **measured**, not assumed:

| attempt | command | result |
|---|---|---|
| restart the driver | `pkill safaridriver` + relaunch on `:4602` | `/status → ready:true`; session still refused |
| the documented enable | `⟨safaridriver --enable⟩` | `Password:Password is not valid, please try again.` — **an interactive admin authorization this seat cannot supply** (the same bound `.a` recorded at open) |
| the preference route | `⟨defaults write com.apple.Safari AllowRemoteAutomation -bool true⟩` | written (`read → 1`), session **still refused**: the running Safari holds its own copy |
| restart Safari so it re-reads | **NOT DONE** | `⟨ps -o pid,ppid,lstart -p 23725⟩` → started **16:23:59**, parent `launchd`; `⟨osascript … count of windows⟩` → **6**. **This is the owner's Safari with six open windows.** No grant in this wave covers quitting it, and a capture seat does not close a person's browser to get a screenshot. |

**Declared host-state change, with its revert**: this seat left
`com.apple.Safari AllowRemoteAutomation = 1` set. It restores the capability the cell was found
with at open (`.a`'s sessions succeeded while the key was absent) and takes effect at Safari's next
launch. Revert: `⟨defaults delete com.apple.Safari AllowRemoteAutomation⟩`.
The accessibility probe of §2.2 was **fully restored** — no host a11y setting is left changed.

**Consequence, stated at the gate rather than averaged away**: the `safari-app/desktop` arms of
G-KFW9-9's targeted ribbon probe and of the AT-precondition inventory were **not** taken in that cell.
They are **UNMEASURED with an exact precondition** — *Safari's "Allow Remote Automation" re-enabled
by a hand that can answer an admin prompt, or the owner's Safari restarted* — which is the shape
§0j.C authorizes a downstream wave to close `complete_with_misses` on.

---

## 6 · THE CELL LEDGER — every cell present, none silent

| cell | column | state | ground |
|---|---|---|---|
| `safari-app/desktop` | `safari-app` | **PARTIAL — 3 captures + OP-4** | normal state only; forced colors **UNREACHABLE-IN-CELL by platform** (§2.2); cell closed mid-seat (§5) |
| `safari-app/ios-device` | `safari-app` | **UNREACHABLE-IN-CELL** | §0m.2 ruling; `⟨xcrun devicectl list devices⟩` → *No devices found.* Not `.d`'s cell |
| `safari-app/ios-simulator` | `safari-app` | **UNREACHABLE-IN-CELL** | §0m.2 ruling; `⟨safaridriver --help \| grep -ci simulator⟩` → **0**. Not `.d`'s cell |
| `webkit-engine` | `webkit-engine` | **UNMEASURED** | playwright 1.60.0 resolves webkit to `webkit-2287`; only `webkit-2311` is installed ⟨`ls ~/Library/Caches/ms-playwright`⟩, so `webkit.launch()` throws. **A chromium reading was NOT labelled `webkit-engine`** — that is I-20 in its other direction |
| `chromium` | `chromium` | **MEASURED** | the forced-colors-off control twin, 8 rows |
| `chromium/emulated-forced-colors` | `chromium` | **MEASURED** | 2 shots + 3 subjects; `fcMatch: true`. **NOT the WHC cell** |
| `windows/real-HCM` | `windows` | **UNREACHABLE-IN-CELL** | no Windows host, no VM host (§4.4) |
| `at/voiceover-safari` | `at` | **UNREACHABLE-IN-CELL** | see `at-CELL-RECORD-2026-09-17.md` §3 |
| `at/nvda` | `at` | **UNREACHABLE-IN-CELL** | no Windows host (§4.4) |
| `at/jaws` | `at` | **UNREACHABLE-IN-CELL** | no Windows host (§4.4) |

---

## 7 · GATE READINGS AT THIS UNIT'S LIMB

| gate | BEFORE (this sitting's baseline) | AFTER (`.d`'s limb) |
|---|---|---|
| **G-KFW9-8** | RED — *"demo-side count 0 … no WHC capture exists in any cell"* | **RED, correctly.** The count half is re-recorded at **0** (ninth seat) and the producer enumeration is republished at **twelve** files; **the WHC half cannot close** — no Windows host (§4.4). The restoration read *"taken from the rendered focus indicator"* is taken at §3.2 **in the chromium column** and is not offered as the WHC capture the gate names |
| **G-KFW9-9** | RED — *"The BEFORE witness is a shot; none exists"* | **RED → the BEFORE witness EXISTS, in the `chromium/emulated-forced-colors` cell, with its falsifier run as a control** (§3.2), plus the safari-app normal-state antecedent (§3.3). **The gate as worded asks for the safari-app AND real-HCM cells; neither carries a forced-colors shot, so the gate stays RED with both bounds stated.** The **re-derivation obligation the gate hands to KF.W13 is DISCHARGED** (§3.4) |
| **G-KFW9-1** (share) | RED — 0 tracked captures with sha256 | **7 captures force-added**, each with a `.sha256` sidecar, cell label and substrate ref. `.d`'s share moves; the wave gate turns when the other cells' captures exist |
| **G-KFW9-2** (share) | RED — 10 cells `UNMEASURED`, 9 of 10 `capability: null` | **4 cells now carry a reading or a named foreclosure from THIS seat**; every row carries its own cell; no verdict crosses a column |
| **G-KFW9-4** (share) | RED — 0 of 590 terminal | `.d`'s probes reach terminal states (EXECUTED / UNREACHABLE-IN-CELL); `.e` folds the tally |
| **G-KFW9-14** (share) | RED — 0 captures name substrate ref + sha + cell | **every capture names `substrateRef` + `substrateSha` + `bundleSha256` + cell**, and the bundle hash is **measured** (double-run) from a clone built at the pin. `.d`'s share moves |

---

## 8 · PROBE PARSIMONY · BOUNDS · MAIL

- **Browser drives, total**: 4 safaridriver sessions (all created and **deleted**, including on the
  failure path) + 3 playwright launches. No DevTools-MCP. Files were read to plan; the browser was
  driven only for cells that need pixels or live computed style.
- **Bounds**: this unit wrote only `safari-real/hcm-*`, `safari-real/at-*`,
  `docs/tranches/X/keyframes/evidence/W9/**` and `docs/tranches/X/execution/B/KF-W9.md`.
  `capture.mjs` / `states.mjs` / `safari-real-matrix.js` / `REPORT.*` / `STATES.json` were **not
  touched**; `desktop-*` and `mobile-*` were **not touched**; `scripts/dev/dev.sh` **never touched**;
  **zero keyframes.js bytes**; **zero glass-ui bytes** (read-only always).
- **Mail (E13)**: swept at this seat's clock, **2026-09-17 19:07:29**, six paths (the four plus atlas's
  Q extension). ⟨`find <each> -maxdepth 1 -type f -newermt '2026-09-17 17:43'`⟩ →
  `V/ 0 · V/coordination/ 1 · glass BK/coordination/ 3 · kf V/coordination/ 0 · atlas P/ 0 · atlas Q/ 0`.
  The **1** is `INBOX.md` itself (a sibling seat's own sweep line, self-excluded by the SELF-COUNT law).
  The **3** are the BK letters already rowed — ⟨`grep -c <basename> INBOX.md`⟩ → **1 · 2 · 1**, each
  present. ⟨`grep -c '^| I-' INBOX.md`⟩ → **36**, tail **I-34**.
  ⟨`grep '^| I-' INBOX.md \| grep -c 'UNREAD'`⟩ → **5** — `I-30 I-31 I-32 I-33 I-34`, and **none is in
  KF.W9's scope**: I-32/-33/-34 are the glass consumer-band letters whose acts are Track A's, I-31 is
  the atlas consumer contract, and I-30 is the SS-6 ACK — **this wave FEEDS that relay with captures
  and does not send it**. **0 unrowed · 0 UNREAD in scope; no `INBOX.md` byte written.**
