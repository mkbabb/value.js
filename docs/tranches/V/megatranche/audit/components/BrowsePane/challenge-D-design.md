# CHALLENGE-D · PASS 4 — `demo/palettes/BrowsePane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared at the seat, not inherited from a parent.

---

## 0. Verdict

**DEFECTIVE.**

Three CHALLENGE-D passes already stand at this path. I did not re-run them. This pass contributes
**seven findings that no prior pass raised** — one BLOCKER — plus **eight independent
corroborations carried at my own coordinates**, and **one narrowing of a negative proof pass 2
banked**.

The strongest new result:

> **The Browse wall's primary interaction — expand a palette — is a state machine with no state and
> no seat.** Clicking a card grows it from **100 px → 211 px** (desktop 1440) and **125 px → 228 px**
> (iPhone 14). After the growth the element carries `aria-expanded: null`, `aria-pressed: null`,
> `tabIndex: -1`. There is no attribute anywhere in the subtree that records that the card is open.
> Pass 2/3 established the card cannot be *reached* by keyboard. This pass establishes that even
> when it is reached by pointer, **nothing about the resulting state is expressible** — so the
> defect is not one missing `tabindex`, it is that the expand affordance was never designed as a
> control at all. `VISUAL-CONSTITUTION §5` names both halves: the seat must be
> `<button type="button" aria-pressed="false|true">`, and *"the card body owns no expand"*.

The second: **the specimen loses area to its own chrome.** On the audit's exact mobile profile the
colour strip — the thing a person opens a colour commons to see — is **40 px of a 125 px card
(32 %)**; the metadata rail owns the other **68 %**. Pass 2 proved the *identity* loses width. Nobody
had measured that the *specimen* loses area.

The third: **`show-slug` is inert.** `BrowsePane.vue:101` passes `show-slug`; `PaletteCard.vue:143`
consumes it only inside `v-if="expanded"`. Measured on the settled populated wall:
`slugShown: false`. And when it does render it is a **button** named `"Copy slug user-1"` — an
action, not a shown slug. A prop whose name promises a wall affordance and delivers an
unreachable copy button.

**Model observed: Opus 5 (`claude-opus-5[1m]`).**

---

## 1. Provenance, scope, and what I deliberately did not re-litigate

| file | findings | status |
|---|---|---|
| `./challenge-D-design-pass1.md` | 20 + 11 | preserved |
| `./challenge-D-design-pass2.md` | 26, six BLOCKER | preserved |
| `./challenge-D-design-pass3.md` | 15 + 6 negative proofs | **preserved verbatim from the prior `challenge-D-design.md` before this write** |

I ran a dedup grep of every candidate finding against all three files before writing a word of §3.
The families already owned — the `Card` shell inversion, the equal-card matrix, the clickable
`role="article"`, the `role="list"`/`role="article"` mismatch, the caster stacking, the
`DevMisconfigError` collapse, the filtered-to-zero lie, the mobile placeholder clip, the expanded
double-specimen, the absent status region — are **not re-reported**. Where I reached them
independently I record the concurrence in §4 with my own coordinates, so they no longer rest on one
or two seats.

**MT-F022 compliance.** I have not born-RED the 7/12 keyboard reachability figure. The one keyboard
consequence in §3 is engine-invariant by construction and proved on two engines: I measured
`[...document.querySelectorAll('[role="article"]')].map(a => a.tabIndex)` → `[-1,-1,-1,-1,-1]` in
**Chromium** and the same in **WebKit**, and the Chromium tab walk lands on every vote chip and
every card menu *individually* — which is the opposite of a roving group. A roving rail has exactly
one `tabindex="0"`; this wall has zero.

### Reproduction environment

Branch `tranche-u`, HEAD `c654824e`. Dev server live at `http://localhost:9000` (not started or
modified by me).

- **Error arm** — `http://localhost:9000/#/browse`. The loopback origin latches
  `detectDevMisconfig` (`demo/platform/transport/availability.ts:112–115`), so no request is
  issued. This is the arm all 60 mega-tranche captures froze on.
- **Populated arm** — the LAN origin `http://192.168.1.166:9000` (`vite.config.ts` binds
  `server.host: true`). `isLoopbackHost("192.168.1.166")` is `false`
  (`availability.ts:74–81`), so the misconfig latch never fires and a real request goes out; I then
  fulfilled it from a Playwright `page.route` stub. **No mutating verb is ever issued and nothing is
  written to the commons.** Probe: `./probe/p4-D-wall.mjs`.
- **Stub-shape honesty.** My first stub used `{ color }` for a swatch and the wall rendered five
  blank plates. I checked `demo/palettes/types.ts:1–11` — the field is `css` — corrected the stub,
  and **discarded the blank-strip frame rather than report it.** Every measurement below comes from
  the corrected run. The discarded artefact is named here so no reader mistakes it for a finding.

---

## 2. Visual truth — the frames this pass adds

The mega-tranche matrix never photographed the populated wall. All 60 captures show the error plate
(`REPORT.json` → every `/#/browse` row carries
`consoleWarnings: ["Failed to load remote palettes: …"]` and `bodyTextLength: 280` desktop /
`124` mobile). Pass 3 reached the populated arm through a production mirror; this pass reaches it
through a route stub with deliberately adversarial rows — a 12-colour palette, a 2-colour palette, a
45-character name, an untagged palette — and adds the **iPhone 14** arm, which is the exact profile
`audit/visual/capture.mjs:57` uses and which no pass had rendered populated.

| frame | what it establishes |
|---|---|
| `./evidence/D-p4-wall-desktop-1440.png` | the wall at 1440: Browse 512 px beside an **empty** 512 px `My Palettes` |
| `./evidence/D-p4-wall-iphone14.png` | the wall on the audit's own mobile profile — identity annihilated, rhythm ragged |
| `./evidence/D-p4-expanded-desktop.png` | the expand: +111 px of card to reveal one 6-character owner chip and a second copy of the strip |
| `./evidence/D-p4-expanded-iphone14.png` | the same, +103 px, on mobile |
| `./evidence/D-p4-filtered-zero.png` | `zzzznotathing` in the field; the plate says the commons is empty |
| `./evidence/D-p4-wall-measurements.json` | raw probe output, both viewports |

Read at desktop, the wall is a column of five 462 × 100 px drawers whose top 40 px is the only
colour on the plate and whose bottom 60 px is a six-species jumble — name, filled count chip, fork
glyph + n, two tag chips, heart + n, `···` — left-packed against a right-anchored menu, leaving a
ragged 0–400 px void mid-row that changes width per card. Read at 390, it is worse: see §3.

---

## 3. New findings

### D4-01 · BLOCKER — the expand is a state machine with no state and no seat

**Defect.** `BrowsePane.vue:97` binds `:expanded="pm.expandedId.value === palette.slug"` and
`:102` binds `@click="pm.toggleExpand(palette.slug)"`. The card therefore has two designed visual
states. Neither is expressible to anything but the eye.

**Evidence** (`./probe/p4-D-iphone14-expand.mjs`, WebKit, both viewports):

```
iPhone 14   collapsed cardH = 125   → click → { h: 228, expandedAttr: null, pressed: null, buttons: 3 }
1440 × 900  collapsed cardH = 100   → click → { h: 211, expandedAttr: null, pressed: null, buttons: 3 }
artTabIndex (chromium) = [-1,-1,-1,-1,-1]   artTabIndex (webkit) = [-1,-1,-1,-1,-1]
```

The element grows by **103 px / 111 px** and emits no `aria-expanded`, no `aria-pressed`, no
`aria-controls`, no `role="button"`, no `tabindex`, no `keydown`. The revealed payload, read back
from the live DOM, is `"Sunset Commons | 5 | 1 | warm | sunset | 7 | user-1"` — the collapsed row
verbatim, **plus one token**: `user-1`.

**Mechanism.** `PaletteCard.vue:5–26` is a `<div role="article" … cursor-pointer @click>`. `expanded`
is a *render prop* (`:185`), never a *state attribute*. The component was designed as a display
surface that happens to respond to clicks, not as a disclosure control. That is why no attribute
exists to carry the state: nobody ever modelled one.

**Against canon.** `VISUAL-CONSTITUTION §5`: *"One native named `<button type="button">` spans its
specimen/identity region and expresses inspector selection only through `aria-pressed` … The card
body owns no expand, inline rename, action menu, transient result or hover-only swatch-action
path."* `PROPORTION-AUDIT §5.12` repeats it with the `aria-pressed="false|true"` spelling and the
"at most one seat is true" invariant. Both halves fail: there is no seat, and there is no state.

**Why this is distinct from pass 2/3's D-11.** D-11 is *reachability*: the card cannot be focused.
D4-01 is *expressibility*: even a pointer user's successful expansion produces no machine-readable
state, so no AT transcript, no `:has()` styling hook, no test assertion and no deep link can
observe it. Adding `tabindex="0"` — the obvious patch — closes D-11 and leaves D4-01 fully open.

**Reproduction.** `node ./probe/p4-D-iphone14-expand.mjs` (LAN origin + stub); or manually: open
`#/browse` with a reachable API, click a card, inspect the `[role="article"]` element.

---

### D4-02 · MAJOR — the specimen loses area to its own chrome, 32 % / 68 %

**Defect.** The palette *is* the colours. On the card the colours get less than a third of the
plate.

**Evidence** (`./probe/p4-D-iphone14-expand.mjs`, `devices["iPhone 14"]`):

```
cardH  = 125       (the ragged arm; 100 on the one-line arm)
stripH =  40       PaletteColorStrip, role="presentation"
→ specimen share 40/125 = 32.0 %   chrome share 85/125 = 68.0 %
```

Desktop 1440: `cardH = 100`, `stripH = 40` → **40 % / 60 %**. The strip is a fixed `h-10`
(`PaletteColorStrip.vue:9`) at every viewport, while the metadata rail grows with wrapping. The
narrower the device, the smaller the specimen's share — exactly backwards.

**Against canon.** `VISUAL-CONSTITUTION §3` law 8: *"One pane may have one full-strength visual
protagonist. Supporting fixtures do not compete with it through equal size or equal shadow."*
`PROPORTION-AUDIT §5.2`: *"A card has one protagonist, one identity line, and at most one persistent
action/status region."* Counting the shipped card's persistent regions: colour count chip, fork
count, tag chips, vote button, `···` menu — **five**, and together they out-mass the protagonist
2 : 1 on mobile.

**Distinct from pass 2's D-13.** D-13 measured the identity *span's* width collapse. This is the
*specimen's* area share, a different quantity on a different element, and it is the one that
explains why the card reads as a metadata row that happens to have a colour bar on top rather than
as a colour specimen with a caption.

**Reproduction.** `node ./probe/p4-D-iphone14-expand.mjs`; frame
`./evidence/D-p4-wall-iphone14.png`.

---

### D4-03 · MAJOR — `show-slug` is inert on the wall, and is an action when it fires

**Defect.** `BrowsePane.vue:101` passes `show-slug` to every card on the commons. On the settled
populated wall the slug is nowhere.

**Evidence** (`./probe/p4-D-iphone14-expand.mjs`):

```
slugShown: false            // document.body.innerText.includes("sunset-commons")
```

**Mechanism.** `PaletteCard.vue:140–143`:

```
v-if="expanded"
  … :display-slug="showSlug ? displaySlug : undefined"
```

The prop is gated behind `expanded` — the state D4-01 proves is unreachable by keyboard and
unexpressible when reached. And what it renders is not a slug line: the live subtree reports

```
{ t: "button", ds: null, r: null, ti: 0, al: "Copy slug user-1" }
```

— a **named action button**, not provenance text.

**Against canon.** `VISUAL-CONSTITUTION §4` assigns *"value, code, or provenance"* to
`text-mono-small` — a text role. `§7`: *"Principal attribution renders only the supplied principal
identity."* A slug is provenance; rendering it as a clipboard action, only inside a disclosure that
has no state, is neither. And per owner edict 2 (no dead paths), a prop that cannot be observed on
the surface it is passed on is dead plumbing at the call site.

**Reproduction.** Populated wall, no card expanded: grep the rendered text for any palette slug —
zero hits. Expand one: the slug appears only as `Copy slug <userSlug>`.

---

### D4-04 · MINOR — the wall's vertical rhythm is set by whether a name happens to wrap

**Defect.** Card height is data-dependent, so the wall has no rhythm.

**Evidence** (`./evidence/D-p4-wall-measurements.json`, `populated-mob`, 390 px):

```
arts: [ {h:125}, {h:125}, {h:100}, {h:100}, {h:100} ]
```

Two cards are 125 px because their names wrapped to two clipped lines; three are 100 px. The wall
therefore alternates 125/125/100/100/100 with a constant 12 px `gap-3`
(`BrowsePane.vue:46`). Desktop is uniform at 100 px only because no name wrapped at 462 px.

**Against canon.** `VISUAL-CONSTITUTION §3` law 7: *"Spacing is container-scaled from glass-ui
tokens."* A row height that is a function of a *string* is not container-scaled; it is content
noise reaching the layout. `PROPORTION-AUDIT §5.3` — *"Renderer, icon or touch footprints may
reserve collision space only on the axis where collision exists"* — the metadata rail reserves a
second line on an axis where the specimen has no collision at all.

**Reproduction.** `./evidence/D-p4-wall-mobile-390.png` — the five-card column, two tall, three
short.

---

### D4-05 · MINOR — the only keyboard-reachable control on each card is mis-named

**Defect.** The vote chip is the first tab stop inside each card and its accessible name is
ungrammatical and mis-scoped.

**Evidence** (`./probe/p4-D-filtered-empty.mjs`, live subtree read):

```
{ t: "button", ti: 0, al: "1 votes, click to vote" }
```

and from the Chromium tab walk (`./probe/p4-D-wall.mjs`):

```
BUTTON "7 votes, click to vote" → BUTTON "Palette menu" → BUTTON "14 votes, click to vote" → …
```

`"1 votes"` is a plural rule that was never written. Worse: the name embeds the *instruction*
(`click to vote`) rather than the *object*, so the AT transcript for a wall of ten palettes is ten
interchangeable `"n votes, click to vote"` with no palette identity in any of them — because the
palette identity is on the `role="article"` parent, which is not a control and is not announced as
the button's context.

**Against canon.** `VISUAL-CONSTITUTION §4.1`: *"Selected, failed, pending, withdrawn and disabled
states are never color-only. Role, accessible name, state/value and associated error/status are
explicit."* A toggle whose name is an imperative and whose count is its only variable content
exposes neither its object nor its pressed state.

**Note on prior passes.** Pass 2 *quoted* this string inside a tab-walk transcript. Neither pass
raised it as a finding. I raise it because it is the consequence of D4-01: once the card seat is
missing, the vote chip becomes the card's de-facto accessible representative, and it is not fit for
that job.

---

### D4-06 · MINOR — the pane header keeps animating under `prefers-reduced-motion: reduce`
### (this narrows a negative proof pass 2 banked)

**Prior claim being narrowed.** `challenge-D-design-pass2.md:667` banks
*"Motion is tokenized and reduced-motion-correct."*

**Measurement** (`./probe/p4-D-wall.mjs`, WebKit context `reducedMotion: "reduce"`, `#/browse`,
t + 4000 ms):

```
document.getAnimations() → 6 entries, all playState: "running", all timeline: ScrollTimeline
  pane-header-veil    on div.pane-header    ×2   (Browse + My Palettes)
  pane-title-shrink   on h3.pane-header-title ×2
  pane-desc-shrink    on p.pane-header-desc  ×2
```

This matches `STATES.json`'s `reduced-motion-desktop` `#/browse` row (`animatedCount: 6`,
`rafPer1500ms: 0`) — the rAF loop stops, the CSS animations do not.

**Mechanism.** `PaneHeader.vue:177` gates the whole choreography on
`@supports (animation-timeline: scroll())` **and nothing else**. There is no
`prefers-reduced-motion` media query in the file. `PaneHeader.vue:148–151` states the design
position explicitly: *"A scroll SCRUB is position-mapped, not time-based motion, so it needs no PRM
gate."*

**Why I narrow rather than born-RED it.** That argument is defensible for `pane-title-shrink`, a
pure `transform: scale()` whose from-state equals the base state. It is **not** defensible for
`pane-desc-shrink` (`PaneHeader.vue:214–223`), which drives `opacity: 1 → 0` plus a `translateY`:
under PRM, scrolling the Browse wall makes the pane's description *disappear*.
`VISUAL-CONSTITUTION §6`: *"Reduced motion resolves directly to the final geometry and stable
chromatic state."* A description that fades out as a function of scroll offset is neither final
geometry nor a stable chromatic state.

**Disposition.** Pass 2's proof holds for the transform arm and fails for the opacity arm. The
correct verb is `TIGHTEN` on `pane-desc-shrink`, not a wholesale PRM gate — and the owner is
`PaneHeader`, not `BrowsePane`, which merely consumes it at `:3`. Filed here because this is the
route the measurement was taken on.

---

### D4-07 · INFO — the pane hands its search field to the design system and then fights it

**Defect.** `BrowsePane.vue:12` applies `class="search-seated"` to the glass-ui `SearchBar` root.
`demo/styles/utils.css:132–137` implements it as an **unlayered** override chosen specifically to
beat the producer's `@layer components` recipe by layer order — the file says so at `:125–128`:
*"a consumer opt-in on the producer recipe (unlayered, so it wins over the `@layer components`
recipe by layer order …)"*.

**Evidence.** glass-ui is at **7.0.0**
(`node -p "require('@mkbabb/glass-ui/package.json').version"` → `7.0.0`);
`grep -rn "seated" node_modules/@mkbabb/glass-ui/dist/*.d.ts *.css` → **no match**. The booked swap
(`variant="seated"`, ASK-D) did not land in the 7.0.0 adoption, so the override is live in three
consumers: `BrowsePane.vue:12`, `PalettesPane.vue:35`, `AdminPane.vue:14`.

**Against owner edicts 4 and 5.** *"Glass-ui is the design system — variants/primitives belong in
glass-ui"* and *"style at the shadcn/glass root component level, never per-instance overrides."*
A three-consumer per-instance class that wins by cascade-layer exploitation is the textbook shape
of both violations, and it also stacks a third caster (`box-shadow: var(--shadow-cartoon-sm)`,
`utils.css:137`) onto the plate pass 1's R2.3 already found stacked twice.

**Not born-RED.** The carry is *documented* and *booked* — `utils.css:129–131` names the exact
producer ask. This is an INFO row recording that the booked swap did **not** arrive with glass-ui
7.0.0 and the interim is now a year-old cascade hack in three files, not a proposal that the
component invented.

---

## 4. Concurrence — independently re-derived, at my coordinates

Recorded so these no longer rest on one or two seats. **Not re-reported as findings.**

| prior finding | my independent coordinate |
|---|---|
| the field wears a `Card` §3.1 forbids | `BrowsePane.vue:2` — `<Card tier="resting" class="pane-scroll-fade … h-full">`. §3.1 Browse row: *"the field/empty/inspector have none"* |
| the equal-card matrix | measured at 1440: Browse `{x:199, w:512}`, My Palettes `{x:729, w:512}`. Browse = **35.6 %** of viewport, **49.1 %** of the 1042 px stage. §3.1 demands **64–66.67 %**; §3 law 1 floors the protagonist at **61.8 %**. The companion holds the other 49.1 % **while empty** — §3 law 2 caps an empty secondary at **≤15 %** |
| there is no inspector | `viewSchema.ts:124–131` — `browse: { left: "browse", right: "palettes" }`. The §3.1 "complementary selected-public-palette inspector" slot is occupied by a *different route's pane*. BrowsePane renders no inspector region at all |
| the clickable `role="article"` | `PaletteCard.vue:5–26`; `artTabIndex` = `[-1,-1,-1,-1,-1]` in **both** Chromium and WebKit. §5 names the anti-pattern verbatim |
| `role="list"` over `role="article"` | measured `gridRole: "list"`, `gridChildRoles: ["article"×5]` (`PaletteCardGrid.vue:3`). Zero owned `listitem` |
| the identity annihilation | iPhone 14, WebKit: `"Sunset Commons"` `clientWidth **15** / scrollWidth **99**`; `"Mine"` `clientWidth **7** / scrollWidth **48**`. **The identity is allotted a constant ~15 % of the ink it needs** (15.2 %, 14.6 %) — a structural ratio, not a per-string accident. Class is correct (`font-display font-medium text-subheading`, §4's palette-identity rung); the flex layout destroys it |
| the error-species collapse | live loopback console: `error: [value.js] value.js dev is MISCONFIGURED … This is a dev-config error, NOT "backend offline"`, and the same string as the caught error at `warning: Failed to load remote palettes: DevMisconfigError: …`. `useBrowsePalettes.ts:79` overwrites it with the constant `"Failed to load palettes"`; `BrowsePane.vue:65` heads the plate *"The commons is unreachable."* — the exact claim the transport layer forbids |
| the filtered-to-zero lie | typed `zzzznotathing` into the Browse field over a live 2-row wall; the plate rendered, verbatim: `· THE COMMONS · | No published palettes here yet. | Publish one from My Palettes and start the wall.` Strings are hard-coded at `BrowsePane.vue:84–86` with no dependence on `searchQuery`, `tierFilter`, `selectedTags` or `colorSearchParams`, and no clear-filters affordance in that state |
| the expanded double-specimen | `./evidence/D-p4-expanded-desktop.png` — the 5-band strip at card top, five WatercolorDots of the identical colours 100 px below it |
| caster stacking | three registers on one plate: pane `Card` shadow → `.search-seated` `box-shadow: var(--shadow-cartoon-sm)` (`utils.css:137`) → per-card `cartoon-surface` (`PaletteCard.vue:20`) |

---

## 5. Negative proofs — what I tried to fault and could not

1. **`duration-fast` is live, not dead.** `DESIGN.md:250` warns the `@theme` alias is *"DEAD until
   PKT-1 clears the dist `:root` 150ms clobber"*, and `BrowsePane.vue:88` reaches for it. Measured
   on the live grid: `getComputedStyle(grid).transitionDuration === "0.2s"`. The token resolves.
   **Not a finding.**
2. **Type roles on the card are correct.** The identity element computes
   `font-display font-medium text-subheading` — exactly `VISUAL-CONSTITUTION §4`'s *"palette
   identity → `--type-subheading`, Fraunces"*. The defect is layout, not typography. **Not a
   finding.**
3. **`verbatimModuleSyntax` is clean.** `BrowsePane.vue:197` is `import type { Palette, Tag }`;
   every other import at `:179–199` is value-only. **Not a finding.**
4. **No horizontal overflow, in any matrix.** `overflowX = 0` measured on my populated desktop and
   mobile arms, matching `REPORT.json`'s `0` across all four Safari matrices and `STATES.json`'s
   `rtl-desktop` / `rtl-mobile` / `zoom-200-desktop` rows. The RTL frame mirrors pane order
   correctly. **Not a finding.**
5. **The keyboard gap is not a born-RED.** Per MT-F022 I checked the roving hypothesis and rejected
   it *in the direction that favours the code*: a roving rail has one `tabindex="0"`; this wall has
   zero, and every chip is individually tabbable. The reachable-control count is real, but the
   cause is absence, not roving. **Recorded as cause, not as a new count.**
6. **The blank colour strip was my bug, not the app's.** Named in §1 so it cannot be mistaken for
   evidence.
7. **The RTL punctuation flip** (`.The commons is unreachable` in `rtl-desktop/browse.png`) is the
   expected bidi rendering of untranslated English prose in a forced `dir="rtl"` document, not a
   component defect. The app has no i18n; `index.html`'s own comment records `dir` as *"mechanical
   readiness"* only. **Not claimed.**

---

## 6. The gestalt cure this pass adds

Passes 2 and 3 own the chassis transposition and the typed-error/typed-empty cure. Both stand. This
pass adds one that is orthogonal and can land without either:

**The entity card stops being a display surface with a click handler and becomes a control.**

Today `expanded` is a render prop and the click is an afterthought on a `<div role="article">`. The
transposition is the one `VISUAL-CONSTITUTION §5` already specifies, and it closes D4-01, D4-03,
D4-05 and pass-2's D-11/D-13 in one move because they are all the same mechanism — *the card was
never modelled as a control, so it has no seat, no state, no name and no reason to give its
identity priority in the layout*:

- the `<article>` root becomes a noninteractive container (no `@click`, no `cursor-pointer`);
- one native `<button type="button" aria-pressed>` spans specimen + identity and owns activation,
  focus and the selected state — which makes the identity a *button label*, and a button label is
  not a flex item that yields to a vote chip, so D4-02's 32 % and the ~15 % identity ratio both
  resolve as a consequence rather than as separate padding fixes;
- the payload that today lives in the 103 px in-card expansion (owner, slug, duplicate swatches)
  moves to the §3.1 inspector the route is supposed to have and currently gives to `My Palettes` —
  which simultaneously fills the 49.1 % empty companion §3 law 2 forbids;
- the metadata rail keeps **one** persistent status region and discloses the rest in the inspector,
  per §5.2.

`show-slug` then either becomes a real wall-level provenance line in `text-mono-small` or is
deleted. It cannot stay as a prop gated behind an unreachable disclosure that renders a clipboard
button.

---

## 7. Evidence index

| artifact | what it establishes |
|---|---|
| `./probe/p4-D-wall.mjs` | the LAN-origin populated arm; desktop + mobile geometry; the reduced-motion `getAnimations()` read; the Chromium tab walk and `artTabIndex` |
| `./probe/p4-D-iphone14-expand.mjs` | the `devices["iPhone 14"]` arm: identity `clientWidth`/`scrollWidth`, `stripH`/`cardH`, `slugShown`, and the expand before/after |
| `./probe/p4-D-filtered-empty.mjs` | the `zzzznotathing` reproduction and the expanded-card subtree read |
| `./evidence/D-p4-wall-desktop-1440.png` | the populated wall beside its empty 512 px companion |
| `./evidence/D-p4-wall-mobile-390.png` | the ragged 125/125/100/100/100 column |
| `./evidence/D-p4-wall-iphone14.png` | the audit's own mobile profile, populated for the first time |
| `./evidence/D-p4-expanded-desktop.png` · `-iphone14.png` | the stateless expand, both viewports |
| `./evidence/D-p4-filtered-zero.png` | the empty-commons plate over a live wall |
| `./evidence/D-p4-wall-measurements.json` | raw probe output |
| `./challenge-D-design-pass3.md` | the prior pass, preserved verbatim |

---

## 8. Findings summary

| id | severity | finding |
|---|---|---|
| **D4-01** | BLOCKER | the expand is a state machine with no state and no seat — `100→211` / `125→228` px with `aria-expanded: null`, `aria-pressed: null`, `tabIndex: -1` on two engines |
| **D4-02** | MAJOR | the specimen loses area to its own chrome — strip `40 px` of a `125 px` card (**32 %**) on iPhone 14; five persistent status/action regions where §5.2 allows one |
| **D4-03** | MAJOR | `show-slug` is inert on the wall (`slugShown: false`) and renders as a `Copy slug` **button** only inside the unreachable expansion |
| **D4-04** | MINOR | wall rhythm is a function of string length — `125/125/100/100/100` at 390 px |
| **D4-05** | MINOR | the card's only keyboard-reachable control is named `"1 votes, click to vote"` — bad plural, imperative-as-name, no palette identity |
| **D4-06** | MINOR | six `ScrollTimeline` animations run under `prefers-reduced-motion: reduce`; `pane-desc-shrink` fades the description to `opacity: 0` — **narrows pass 2's negative proof**, `TIGHTEN` on the opacity arm only |
| **D4-07** | INFO | `.search-seated` is an unlayered per-instance override of a glass-ui root in three consumers; the booked `variant="seated"` did **not** ship in glass-ui 7.0.0 |
