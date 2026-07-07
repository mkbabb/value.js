# T lane — t-search-tabs (T-12 + T-20)

**Lane**: design (Fable), the search surface register + the glass-ui Tabs pilling.
**Rows**: T-12 (search area styled inconsistently vs sibling areas) + T-20 (Tabs
triggers fill the space, no gap — proper pilling; producer-root candidate).
**Method**: owner shots re-read from disk (`t-2005-08.png`, `t-2008-51.png`); live
probes on an isolated dev server (:9457, `VITE_API_URL=http://localhost:59999`) in a
PRIVATE Playwright context (1440×900 + 390×844, dpr 2, light + dark — the shared MCP
browser was contended by a sibling lane, so every probe ran in its own context);
computed styles cited inline. Producer ground truth read from `../glass-ui` source
(READ-ONLY). ZERO product-code changes.

**Shot↔finding re-derivation** (one correction against the plausible mis-read):

- `t-2005-08.png` — the **PalettesPane** glass-ui `SearchBar` ("Search your
  palettes...", `PalettesPane.vue:12-15`), dark scheme over the rust-derived ground:
  a dark roast slab, mono placeholder, no visible edge, ending short of the card
  strip below it. Reproduced pixel-for-pixel on :9457 dark (probe shots
  `t12-search-dark.png` / `t12-ctx-light.png`, session scratchpad — all load-bearing
  numbers inlined below).
- `t-2008-51.png` — **NOT the dock pane toggle** (its labels are "Picker/Mix" etc.).
  The labels "Colors | Palettes" exist at exactly ONE surface: the **Mix pane's
  source selector** (`MixSourceSelector.vue:106-111`, glass-ui `SegmentedTabs`
  `variant="pill"`). Reproduced live: the skinny rim-lit pill floating in a tall
  track, both schemes. The defect is pure producer CSS, so every pill-variant host
  inherits it — `MixSourceSelector`, `PaneSegmentedControl` (dock mobile toggle),
  `GradientEasingEditor.vue:193`, `AdminNamesPanel.vue:14`, and glass-ui's own
  consumers.

---

## Findings

### 1. T-12 — the search pill is dock furniture seated in a paper pane: the ONE floating-glass element in a cartoon-grammar column

**Evidence** (computed, :9457 `#/palettes`, 1440×900): the bar is glass-ui's
`.input-bar` recipe (`glass-ui/src/styles/utilities/components.css:205-228`) at the
**floating** glass tier — light `bg color(srgb .994 .96 .926 / 0.8)`, dark
`color(srgb .207 .165 .133 / 0.88)`, `backdrop-filter: blur(13px) saturate(1.6)`,
border **1px at 5% α** (sub-visible both schemes), `box-shadow: none`,
radius 16px. Its immediate siblings in the same pane column speak the pane's paper/
cartoon grammar: the `dashed-well` ("Start a new palette") is 75%-α cream +
**1.5px dashed ink border (12%)** + the **cartoon stamp shadow**
(`-2px 2px 0 / -3px 3px 0` offsets); `PaletteCard`s ride `shadow-cartoon-sm/md` +
drawn edges; the pane shell is `Card tier="wash"`. Per the demo's own Z-tier law
(`demo/DESIGN.md` § Shadows/Z-tier: **Z2 in-plate cards → `--shadow-cartoon-sm/md`
or `--card-edge`**), the search bar is a Z2 in-plate element wearing Z0 floating-
overlay material. Over a flat pane wash the 13px backdrop blur has nothing to blur —
the "glass" reads as a matte slab (exactly the owner's shot). Dark is worse: the
88%-α roast is *darker than its own pane plate* (pane wash `oklab(0.41… / 0.43)`),
so the bar reads as a hole, not a control.

**Root-cause**: producer-default material consumed unexamined. glass-ui's SearchBar
defaults `surface="glass"` (the floating pill — designed for docks/overlays, where
it is correct); the demo seats it in pane BODIES at 5 sites (`PalettesPane.vue:12`,
`BrowsePane.vue:7`, `AdminPane.vue`, `PaletteSlugBar.vue`,
`PaletteDialog/components/PaletteControlsBar.vue:47`) with no register decision.
None of the existing chrome rungs fits a paper seat: the `variant` CVA
(`glass-ui/src/components/custom/search/searchVariants.ts`) offers `inline`
(boxed glass) / `bare` / `floating` (chromeless), and the shared surface axis
{glass·veil·opaque} deliberately fences `cartoon` out as a Card-local decoration
(`glass-ui/src/styles/glass/surface-axis.css` header; `Card.vue:67`
`CardSurface = "glass" | "cartoon" | "veil"`).

**Owner**: joint — producer (the missing chrome rung) + demo (the seat decision).

**Cure direction (gestalt — the SEATED field-chrome rung, one register law)**:

- **Producer (ask, see §Packet ASK-D)**: a `seated` (working name; `paper` also
  honest) rung joins the search field-chrome CVA — the DESIGNED axis for exactly
  this ("the field CHROME rung", searchVariants.ts:42). It composes the already-
  shared utilities — opaque `--card`/`--background` fill, the drawn ink edge +
  `shadow-cartoon-sm` stamp (both live in glass-ui's own components.css), no
  backdrop blur — winning over the `@layer components` recipe by layer order (the
  exact mechanism the `bare` rung already proved; NO `!important`, no recipe fork).
  The surface-axis fence stands: cartoon does NOT join {glass·veil·opaque}; it
  arrives as field CHROME, the same way Card carries it as a Card-local surface.
- **Demo (consume half)**: ONE register law — *fields on paper wear paper; fields
  on glass stay glass.* The 3 pane-body/dialog sites (PalettesPane, BrowsePane,
  AdminPane + PaletteControlsBar) take the seated rung; dock/overlay search keeps
  the floating pill. The law is encoded once (the T corpus's card-material lane owns
  the umbrella; this rung is its input-field arm), never per-instance class soup.
- The result must be judged by eye against the dashed-well and a PaletteCard in the
  same frame, light + dark — the bar should read as the same paper at the same
  elevation, one radius family, ink edge visible in both schemes.

### 2. T-12 — the mono voice: the producer bakes `--font-mono` into every search field; the demo's voice law reserves Fira for readouts and CSS literals

**Evidence**: `.input-bar-field { font-family: var(--font-mono, monospace) }`
(`components.css:235`) — computed live: **Fira Code 16.4px** for the prose
placeholder "Search your palettes...". The demo's voice law (`demo/DESIGN.md:36-38`)
names Fira Code "the readout/annotation voice — numeric readouts, code, admin
identifiers"; prose belongs to the text voice (Jakarta). The demo already treats
mono-on-a-field as an EXPLICIT opt-in elsewhere: `SearchFilterBar.vue:86-90` keeps
the Fira voice *by class* on its `#hex, hsl(...)` input precisely because that field
is a CSS-literal readout — the comment says so. A prose search wearing the terminal
voice is the single loudest "not styled the same" cue in the owner's shot (the
letterform mismatch against the Fraunces title + Jakarta description directly above
it).

**Root-cause**: a producer voice opinion hardcoded where a seam belongs — every
consumer's search field is forced mono regardless of content class.

**Owner**: producer (the seam) + demo (the per-site voice decision).

**Cure direction**: the field font becomes a token seam —
`font-family: var(--input-bar-font, inherit)` (inherit = the host plate's voice; the
dock search and any CSS-literal field opt back into mono via the existing class
mechanism or a root token pin). Demo half: the prose sites (palettes/browse/admin
search) inherit the text voice; `PaletteSlugBar` (slugs are identifiers) and the
SearchFilterBar color input KEEP mono by explicit class — the law stays "mono is a
statement about the content, never a default".

### 3. T-12 — the producer's 24rem width cap truncates the bar against its column: the bar ends 78px short of every sibling's right edge

**Evidence** (measured live, 1440×900): `.input-bar` carries
`max-width: var(--max-width-input)` = **24rem/384px**
(`components.css:223`; token at `glass-ui/src/styles/tokens/offsets.css:93`). In the
pane column: bar left 754 = card left 754 ✓, but bar right **1138** vs sibling card
right **1216** — a 78px shortfall with no counterweight (the bar is start-aligned in
a stretch column). The owner's shot shows the same read: the pill stops short of the
card strip beneath it. Every sibling surface in the column is full-width; the capped
bar reads as a layout accident, not a designed measure.

**Root-cause**: layout opinion inside a material recipe. A floating dock pill
plausibly wants an intrinsic cap; a SEATED field's measure belongs to its host
column. The cap rides the recipe unconditionally, so every seated consume inherits
dock geometry.

**Owner**: producer (the seam) + demo (consume).

**Cure direction**: the cap moves out of the recipe's unconditional path — either
the `seated` rung (finding 1) neutralizes it (`max-width: none` — the rung already
owns the chrome delta) or the recipe demotes it to a consumer-ownable seam. Demo
half: seated bars run the column measure by construction — never a per-instance
`max-w-none` fight.

### 4. T-20 — THE root cause of "gaps, improper pilling": the anchor-path indicator DOUBLE-COUNTS the track trim — the pill fills 62% of the track's height instead of the designed 79%

**Evidence** (measured live, Mix pane "Colors | Palettes", 1440×900, identical both
schemes): track h **39** (content 31 inside the 4px `--bouncy-track-trim` padding);
buttons h **31** (they correctly fill the trimmed band); indicator h **24.2** — the
pill is inset ~4px INSIDE the button on both block edges, leaving ~8px of raw track
above/below it. At 390×844 (the dock pane toggle, S.W7-2 compact): track 32.3,
buttons 26.3, indicator **21.8** — same double-trim at the 0.1875rem rung. This is
the owner's shot exactly: a skinny rim-lit chip floating in a tall dark channel
(reproduced `t20-mix-tabs-dark.png`). The producer CSS
(`glass-ui/src/styles/segmented-tabs.css`):

- base (container-relative, CORRECT): `.segmented-indicator { inset-block:
  var(--bouncy-track-trim) }` (:93) — 4px from the padding-box = flush with the
  button band;
- anchor path (button-relative, WRONG): `inset-block-start: calc(anchor(top) +
  0.1875rem); inset-block-end: calc(anchor(bottom) + 0.1875rem)` (:181-182; the
  ≥640px arm `+ 0.25rem` at :221-222; the vertical variant mirrors it on the inline
  axis at :192-193/:227-228). `anchor(top/bottom)` already resolves to the button's
  edges — which already sit inside the trim — so the trim is applied TWICE;
- the INLINE axis of the same rule uses bare `anchor(left)`/`anchor(right)` (:183-184)
  with no addend — the two axes of one indicator disagree about what anchor() means.
  (Measured: indicator spans its button exactly inline — 81.5 vs 81.5.)

Three corroborating facts: (i) the JS fallback (`--js`, measured-box path) and the
base rule both produce the flush geometry, so browsers WITHOUT anchor support render
a taller pill than Chrome — an engine-dependent visual fork; (ii) the added
`0.1875rem`/`0.25rem` are raw literals, violating the file's own W20 magic-number
lock ("`--bouncy-track-trim` is the token the track padding, the indicator
`inset-block`, AND the `anchor()` offset all read so they cannot drift", :27-33 —
they drifted); (iii) the fill ratio 24.2/39 ≈ 0.62 matches the owner's shot's
pill/track ratio.

**Root-cause**: a reference-frame error — the anchor arm was written as if
`anchor(top)` were container-relative (where the trim addend would be correct) when
it is button-relative (where the correct addend is zero).

**Owner**: **producer** (glass-ui `segmented-tabs.css`; zero demo half beyond
re-judging after adopt).

**Cure direction (§Packet ASK-A)**: the anchor arm's block insets become bare
`anchor(top)` / `anchor(bottom)` (vertical variant: bare `anchor(left)`/
`anchor(right)` on the inline axis); both breakpoint arms and both orientations move
together; any future deliberate offset is expressed in `var(--bouncy-track-trim)`
terms, never a literal (restoring the file's own lock). Acceptance: the indicator
box ≡ the active button's box at every breakpoint × orientation × scheme × engine
(anchor AND JS paths byte-equal geometry); expected post-fix at 1440w: pill 31 in
39 (79% fill — the iOS concentric read the file's BD.W-TAB-IOS-CAPSULE header
specifies). Note in passing: Chrome's `anchor()` tracks the transformed box, so the
active tab's +3.7% scale-pop breathes the pill ~1px — that is the designed liquid
behavior, not part of this defect.

### 5. T-20 — the fill law, stated so the cure cannot overshoot: the trim is the ONE sanctioned gap; the horizontal grammar is already correct

**Evidence**: `grid-auto-flow: column; grid-auto-columns: 1fr` resolves EQUAL
columns even under shrink-to-fit (measured: 78.6 = 78.6 unscaled); buttons stretch
to their columns; the indicator spans the active button inline exactly. The visual
slack around the shorter label ("Colors" in a Palettes-width column) is the correct
consequence of equal-column pilling — the iOS segmented grammar — not a defect. The
`--bouncy-track-trim` (3px/4px) concentric inset between pill and track edge is the
DESIGNED gap (`--bouncy-track-radius = pill radius + trim`, :46-47, Apple's
`.containerConcentric`).

**Root-cause** (of the guardrail's necessity): the owner's words "fill the space
and not have gap" could be over-read as zero-trim full-bleed pilling, which would
collapse the concentric radius law and the recessed-well read.

**Owner**: producer (the same fix as finding 4 — this row bounds it).

**Cure direction**: finding 4's fix IS the fill cure — after it, the pill fills the
trimmed band exactly (top/bottom/left/right all `trim` from the track edge, uniform).
No change to the trim itself, the 1fr column law, or the label padding. The T
corpus should encode T-20's acceptance as "uniform trim on all four sides, pill ≡
button band" — not "pill ≡ track".

---

## The ask packet (E-2 — GLASSUI-T-ASKS rows; producer = `../glass-ui`, READ-ONLY here)

| Ask | Class | Surface | Shape |
|---|---|---|---|
| **ASK-A** | defect | `styles/segmented-tabs.css` :181-184, :192-193, :221-228 | Anchor-arm insets: drop the trim addend on all anchor-relative edges (block axis horizontal, inline axis vertical; both breakpoints). Acceptance: indicator ≡ active-button box, anchor/JS engine parity, both orientations, both schemes. Kills the t-2008-51 skinny-chip read at every consumer. |
| **ASK-B** | seam | `styles/utilities/components.css:235` | `.input-bar-field` font → `var(--input-bar-font, inherit)`; mono becomes opt-in (dock search + CSS-literal fields). |
| **ASK-C** | seam | `components.css:223` | The 24rem `max-width` leaves the recipe's unconditional path (rung-neutralized or consumer-owned). |
| **ASK-D** | rung | `custom/search/searchVariants.ts` | A `seated` field-chrome rung (opaque card fill + drawn ink edge + `shadow-cartoon-sm` + no blur + no cap), composed from existing shared utilities via the proven `bare`-rung layer-order mechanism. Surface-axis fence respected (cartoon stays off {glass·veil·opaque}). |

Demo consume half (post-adopt, rides the S.W8 5.0.0-adopt gate per §3.4/E-2):
`variant="seated"` + inherited voice at PalettesPane/BrowsePane/AdminPane +
PaletteControlsBar; PaletteSlugBar + the SearchFilterBar color input keep mono by
explicit class (identifiers/CSS literals). T-20 requires NO demo change — re-judge
the four pill hosts by eye after adopt.

## Cross-references

- Finding 1's material law feeds **T-24** (the gray/black/white glass-card
  consistency audit) — the dark bar's 88%-α roast-darker-than-plate is a T-24 datum;
  and **T-18** (inconsistent glass-card backgrounds) shares the root (producer-tier
  defaults consumed without a seat decision).
- Finding 4 is a sibling of the GAP-* producer-defect family — encode it in the T
  corpus as a named producer gap so the adopt wave gates on it.
- The S.W7-2 compact rule (`PaneSegmentedControl.vue:36-52`) reaches into
  `.segmented-tab` via `:deep` — after ASK-A lands its arithmetic still holds (it
  touches padding/type only), but the T corpus's colocation edict (E-1) should note
  it as a consumer-reach-into-producer-internals site to revisit when the producer
  grows a size rung.
- The mono-voice law (finding 2) is the same law the title-typography lane enforces
  from the display side (one voice system, two lanes).
