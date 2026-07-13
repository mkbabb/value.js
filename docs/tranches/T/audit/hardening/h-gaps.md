# T HARDENING · lane h-gaps — THE DEVIL'S ADVOCATE: what the T corpus never says

**Charge**: not errors IN the corpus (other lanes own those) but ABSENCES — surfaces no lane
audited, mandate implications unexplored, finding classes with zero items, producer risks
unhedged, and the owner's likely next complaints extrapolated from the T-1..T-29 trajectory.
**Method**: the 14-ViewId inventory (`demo/@/composables/viewSchema.ts:35-49`) crossed against
every design-wave item + oracle roster; class-by-class greps over the full corpus (hardening/
excluded) for candidate absent classes; live-tree verification of every absence claimed.
**Dedupe**: claims already made by sibling hardening lanes are cited, not repeated
(h-mandate-trace owns mandate-word drift; h-refine-hardening owns the W8 roster-source hole;
h-refine-console owns the AuroraPane Select mis-routing; h-dag owns W7-float collisions;
h-packets owns packet-content staleness).
**Speculative rows are marked SPECULATIVE** — they extrapolate owner taste, not defects.

**Verdict: 1 MUSTFIX · 8 SHOULDFIX · 3 NOTE.** The corpus is remarkably total on the surfaces
the owner PROBED; the gaps cluster on the surfaces the owner has NOT yet probed (the second
slider population, the markdown content body, admin) and on event paths the plan assumes away
(producer refusal, runtime errors, the no-GPU boot, the ratification event's own mechanics).

---

## §0 The coverage matrix (14 ViewIds × design-wave content coverage)

| View | Design-wave content coverage | Verdict |
|---|---|---|
| picker (+About right pane) | T-2..T-8, W4 whole-wave, About card T-3 | COVERED (but see G-2: the About CONTENT) |
| palettes | T-11, T-13/T-19, W3-2 | COVERED |
| browse | T-12 (W3-3), search census | COVERED |
| extract | W3-2 ghost, eyedropper rung (Q4) | COVERED |
| mix | T-19, MixSourceSelector rows | COVERED (chip mis-route → h-refine-console) |
| generate | T-16 (W6-5), T-17 (W6-4) | COVERED |
| gradient | T-6 (W6-1), T-21 (W6-2) | COVERED |
| **atmosphere** | material rung A8 ONLY — no content item | **GAP → G-1** |
| **blob** (BlobPane right pane) | material rung ONLY (HeroBlob work = the picker's blob) | **GAP → G-1** |
| admin-users/-names/-audit/-flagged/-tags | pane-card rung A7 + admin-gold exception + O-7 list | rung-only → G-11 |

---

## G-1 — MUSTFIX · The app's SECOND slider population (Atmosphere + Blob config panes) is absent from every design wave — the corpus reproduces the named-site-not-population disease it indicts

- **Evidence**: `atmosphere` (hue 280°) and `blob` (hue 320°) are two of the NINE primary dock
  views (`viewSchema.ts:96-223` — "nine primary views … in 40° steps in dock order"), publicly
  reachable, not admin-gated. Their shared content surface is `ConfigSliderPane.vue` (196 LoC,
  ~15 slider rows; hosts `AuroraPane.vue` 189 LoC + `BlobPane.vue` 130 LoC). The corpus's
  complete non-hardening mention set for `ConfigSlider` is SEVEN rows, all non-design:
  material rung A8 (`t-card-color-census.md:46,52`), the pane-card list (`t-card-material.md:29`),
  PaneHeader host (`t-header-shading.md:210-211`), the O-7 pane list (`t-oracle-gaps.md:118`),
  colocation kit (`t-coloc-components.md:341`). Meanwhile D5 + W4-3/W4-4 mint an entirely new
  slider design language — console WELL sub-card, ink letters, live channel meters, touch rung,
  letter-rail — scoped to the PICKER's `ComponentSliders` alone (SYNTHESIS §2 D5; `waves/T.W4.md`
  items W4-3/W4-4), and the O-18 population roster names "slug pills, readout fracs, graph
  nodes, channel letters, captions" (SYNTHESIS §6.1 O-18) — zero config-slider rows.
- **Failure scenario**: W4 lands; the owner opens Atmosphere or Blob (the blob TUNING pane, on
  the axis of the owner's single most-worded finding T-8) and sees the S-era slider language
  beside the new console — the exact T-12 complaint shape ("Why is this search area no styled
  the same as the other areas?") re-filed as a T+1 finding. The corpus's own lesson 14 (`T.md
  §9`) names named-site-not-population as the S verification disease; here it recurs at
  wave-item level, invisible to O-7 (pane-card rung only) and O-18 (roster-scoped).
- **Corpus location**: SYNTHESIS §2 D5 + §3 W4-3/W4-4 + §6.1 O-18; `T.md §2 D5`; `waves/T.W4.md`.
- **Proposed amendment** (either, but SAID): (a) a population clause on W4-4 — "the console
  grammar (well seat, ink labels, live meter where a live value exists, touch rung) extends to
  the ConfigSliderPane population (Atmosphere/Blob)" + O-18 rows for config-slider labels; or
  (b) an explicit DEFERRED book with rationale (tuning surfaces, lower bar) + a NAMED W8
  critique-roster row so the fork is at least judged. Adjacent-not-duplicate: h-refine-console
  already owns AuroraPane's Select being unlisted for T-17 chips.

## G-2 — SHOULDFIX · The markdown/KaTeX rendered content — the inside of the owner's own T-2/T-3 card — was never audited by any lane and sits under no oracle

- **Evidence**: the About pane renders the color-space reference pages (11 pages,
  `assets/docs/`, KaTeX + highlight.js). The corpus's total mention set: the WELL-rung exemplar
  ("the markdown `bg-muted` pattern generalized", SYNTHESIS:125), a colocation tree node
  (SYNTHESIS:443), a Q14 payload aside ("a KaTeX+WebGL SPA", SYNTHESIS:585), and W0-4's page
  COUNT for doc-truth. No lane audited the rendered body's typography/ink; t-title-typography
  touches prose only at the trigger rung (`:87,:98`) and KaTeX only as a self-host precedent
  (`:135`). O-10d is title-surfaces; O-18's roster has no prose/markdown/code-block row.
- **Failure scenario**: W3-1 swaps the About card's material out from under this content
  (wash → resting cartoon plate) and W3-5 rebuilds the ink contract around it; the inherited
  prose/code/math ink on the NEW plate is judged by nothing — a green O-7/O-18 with a muddy
  reference page, on the very card the owner flagged twice (T-2 title, T-3 material).
- **Corpus location**: SYNTHESIS §6.1 O-18 roster; `waves/T.W3.md` W3-1/W3-5; W8 roster.
- **Proposed amendment**: one O-18 row — "markdown body ink + code-block + KaTeX ink on the
  rung-1 plate, both schemes"; W8 roster names "About content (markdown+KaTeX)" as a surface.

## G-3 — SHOULDFIX · The boot overture stops at the document edge: no `theme-color`, so the browser chrome never joins "one material from t0"

- **Evidence**: `demo/color-picker/index.html` head carries NO `<meta name="theme-color">`
  (verified live); corpus grep for `theme-color` = zero. D3's law is "one material from t0" and
  B0 already paints `body { background: var(--saved-bg) }` via the FOUC guard (index.html) —
  but the surrounding browser chrome (Android Chrome, iOS/macOS Safari tab tint) stays default
  white/black over a derived-gradient app. h-mandate-trace H-N2 records T-1's "etc" as absorbed
  but never widened — this is a concrete, cheap widening on exactly the T-1/T-27 axis.
- **Failure scenario**: the owner probes on a phone (T-8 demands "all screen sizes"); the load
  choreography is perfect inside the viewport and the browser bar above it flashes the wrong
  material — T-1 re-filed one level up.
- **Corpus location**: SYNTHESIS §2 D3 / §3 W2-3; `waves/T.W2.md`.
- **Proposed amendment**: a W2-3 sub-clause — mint `theme-color` at B0 from the persisted
  ground; update it beside the `@property --saved-bg` pick transition (both schemes via
  `media` attr or JS). SPECULATIVE-LOW: not owner-worded, but on-axis and one line of spec.

## G-4 — SHOULDFIX · The overture has no designed NO-FIELD composition: WebGL-unavailable and context-loss are absent from every W2 beat and gate

- **Evidence**: corpus grep for context-loss/`webglcontextlost` = zero (non-hardening). The
  producer aurora is dual-strategy — t-load-sync itself drives a `"css"` substrate for the
  π-gate and flags harness divergence (LS-7) — and the repo's OWN e2e roster names
  "smoke-safari … sustained-30s context-loss probe" (CLAUDE.md) as a standing failure class.
  Yet W2's beats and gates (O-1..O-6, O-24) are specced exclusively over the armed WebGL path;
  no clause names what B2 composes when `webgl2` context creation fails (low-end/blocklisted
  GPU) or drops mid-session, and the css-renderer path is un-rostered for the T-26 bracket.
- **Failure scenario**: PP-2 demands the honest failure state be DESIGNED; today the answer
  ("the persisted gradient ground IS the rest state"?) is derivable but unwritten — an
  implementer either invents a fallback (PP-2 violation) or ships an unjudged accident.
- **Corpus location**: SYNTHESIS §2 D3/§3 W2; `waves/T.W2.md` gates.
- **Proposed amendment**: one W2-3 rider naming the no-field terminal composition (the
  persisted gradient ground, dark-honest) + the context-loss rule (re-arm once, else rest on
  the ground); mark the css-renderer path in the W8 GPU-class marking (rides h-refine-hardening's
  GPU-class NOTE).

## G-5 — SHOULDFIX · Producer NON-DELIVERY is hedged everywhere; producer REFUSAL is hedged nowhere — and T-20 has no demo interim to fall back on

- **Evidence**: the interim→swap machinery (`T.md §7.2`), EXPECTED-RED rows, and PP-5 all
  hedge the packet-never-lands-in-T timeline. No packet in `letters/GLASSUI-T-ASKS.md` carries
  a DECLINE disposition (grep reject/decline = zero; the W0-1 gate is "dispatched +
  acked-or-recorded"). For most packets an interim exists (P3 `--well-bg`, P5 seal-recipe
  ring); for **P4/T-20** the routing is `T-20→P4+W7` with NO demo half — E-2 forbids a demo
  fork of a component-level item, and O-8 exists only post-adopt.
- **Failure scenario**: the producer answers "the double-trim is intentional" (a taste
  disagreement between repos, precedented — the S-era L8 reached its 5th booking). T-20 then
  has no landing, no interim, and no disposition row; the hole surfaces only at the W9
  zero-drop walk, where it can only close `complete_with_misses` without ever having been
  adjudicated.
- **Corpus location**: `letters/GLASSUI-T-ASKS.md` (per-packet rows); `T.md §7.2`; SYNTHESIS §4.
- **Proposed amendment**: a one-line DECLINE disposition per mandated packet (P3/P4/P5):
  P3/P5 → interim-becomes-permanent (recorded); P4/T-20 → escalate to the OWNER (the two-repo
  taste conflict is the owner's call, both repos being theirs) — recorded at first producer
  response, never discovered at close.

## G-6 — SHOULDFIX · "The ratification package" is invoked once (Q5) and specced nowhere: the corpus's terminal event has no artefact definition

- **Evidence**: Q5's amended cell says "the ratification package LEADS with the owner-verbatim
  letterform reading" (SYNTHESIS §8 / `T.md §12`) — the only occurrence of the phrase. Nothing
  defines what the owner RECEIVES to rule Q1–Q17: contrast T.W8, whose owner package is specced
  to the TOC level (`waves/T.W8.md:61-65`; h-refine-hardening §P tightens it further). Six rows
  are taste axes ruled NOW, pre-implementation (Q2/Q3/Q4/Q5/Q9/Q12); the S precedent
  (`S/audit/RATIFICATION-2026-07-05.md`) is cited only as the ENCODING pattern for the answers.
- **Failure scenario**: the ratification session opens with 17 prose rows; the owner rules Q5
  ("rainbow") without seeing either pole rendered, or stalls asking for visuals — the gate the
  whole corpus waits on is the one event with no runbook.
- **Corpus location**: `T.md §12` preamble; `PROGRESS.md` (dispatch-gate paragraph).
- **Proposed amendment**: a 3-line §12 preamble: who assembles the ratification presentation,
  what it contains (the Q-table + the on-disk owner shots re-used per taste row + both poles of
  Q5/Q4 described-or-mocked), and the explicit statement if prose-only ratification is the
  deliberate choice (the S precedent).

## G-7 — SHOULDFIX · The owner's probe ENVIRONMENT is unspecified — though the mandate itself was born from a misconfigured `:9000` probe

- **Evidence**: T-9's genesis: the owner probed dev `:9000` web-only and hit the
  DevMisconfigBanner + dead backend (MANDATE §0 t-2004-32; R10) — an environment artifact
  became two findings (banner + "why does the backend not work"). X1 means PROD's api is also
  broken (publish/unpublish 404, `T.md §7.1`). W8's verdict package prescribes frames/
  screencast, but the 2026-07-06 precedent says the owner also probes LIVE — and no document
  names the sanctioned environment for that probe (or for any Q-row eye-judgment).
- **Failure scenario**: the owner re-probes web-only at W8; every network species (D9 shimmer,
  Browse/Palettes content, publish flows) is judged against a dead backend; T-9-class
  findings regenerate and the taste verdict is contaminated by an environment defect the
  corpus already root-caused once.
- **Corpus location**: `waves/T.W8.md` package cover sheet; `T.md §12` preamble (with G-6).
- **Proposed amendment**: one line, both places: "the sanctioned live-probe environment is
  `npm run dev` (full local stack, S.W0 W0-1); web-only probes judge non-network surfaces
  only" — never the owner's own `:9000` session (the hardening fence already binds agents).

## G-8 — SHOULDFIX · The runtime-error-containment class is EMPTY: no errorHandler, no error boundary, anywhere — and T's plan rewrites the boot chain and moves ~199 files over that void

- **Evidence**: grep `onErrorCaptured|errorHandler|ErrorBoundary` over `demo/` = zero; the app
  mounts via inline `createApp` (`demo/color-picker/index.html:63-67`) with no
  `app.config.errorHandler`. PR-4 + D9 govern DESIGNED states for KNOWN failure paths
  (network/empty/error species); no corpus row addresses an UNCAUGHT render/effect exception —
  the class the E-1 restructure (W1, ~199 demo files) and the boot transposition (W2) most
  plausibly mint.
- **Failure scenario**: one thrown error in a moved leaf → white/frozen SPA with console-only
  evidence; the owner files "the app is buugged out" (the T-21 word) with no designed surface
  to even name the state. PP-2's "honest failure state" doctrine exists but has no runtime leg.
- **Corpus location**: `waves/T.W1.md` (cargo list) or `waves/T.W2.md`; SYNTHESIS §1.2 fleet rows.
- **Proposed amendment**: one W1-demo cargo row — app-level `errorHandler` + an honest terminal
  surface (the misconfig-lamp register generalized: loud console + a plain-register chip),
  gate = a thrown-error fixture renders the designed state; or an explicit considered-and-
  declined row (G-10's ledger) if the owner judges it out of T's scope.

## G-9 — SHOULDFIX (rows individually SPECULATIVE) · The micro-chrome next-complaint roster: five unclaimed surfaces at exactly the altitude the owner's eye now operates

- **Evidence of trajectory**: T-15 (one wrong font), T-16 (one corner element), T-28 (one
  outline), T-29 (one clipped edge) — the owner's later findings are micro-chrome. Corpus grep
  (non-hardening) = zero for each of: **(a)** `::selection` ink (default engine blue over the
  new plates; verify producer ownership first — glass-ui `styles/utilities/base.css` styles
  adjacent chrome); **(b)** pane-scroller scrollbar material on non-macOS (glass-ui owns
  `scrollbar-gutter` only, `base-misc.css:233`; Windows Chrome paints stock scrollbars over
  glass); **(c)** cursor grammar (spectrum/slider drag, blob hover — no grab/grabbing spec);
  **(d)** the static `<title>Color Picker</title>` (`index.html:8`) — the one text surface that
  never joins the color voice; **(e)** native-`title` tooltips BEYOND the dock — W6-8 retires
  exactly ×4 with a dock-scoped gate ("zero native `title` on the dock set",
  `waves/T.W6.md:123`), an intra-corpus named-site echo.
- **Proposed amendment**: five named rows in the W8 critique-pass roster (pre-filter fodder;
  zero new waves; each row verify-producer-first per the P10 pattern). This rides — but is
  content-distinct from — h-refine-hardening's roster-source SHOULDFIX.

## G-10 — NOTE (SPECULATIVE) · Five finding classes have zero items and no considered-and-declined ledger

i18n (`lang="en"`, single-author app — decline-worthy) · print/PDF of palettes (export exists;
no print stylesheet) · color-vision-deficiency tooling (on-theme for a COLOR product — a
plausible owner feature-ask, not a defect) · `forced-colors` / `prefers-contrast` /
`prefers-reduced-transparency` (the ENTIRE D1 ladder is transparency and D6's guard family is
being rebuilt at W3-5 — the cheapest moment there will ever be to thread `prefers-contrast:
more` into the one guard) · zoom-200%/text-scaling reflow. Corpus grep = zero for all.
**Amendment**: a six-line "classes considered, no items minted" table (SYNTHESIS §6 or `T.md
§5`) so absence reads as judgment, not blindness — the same move §5.4 made for colocation
totality. Promote any row the owner elevates at ratification.

## G-11 — NOTE · The five admin views have never been owner-probed and their CONTENT is uncovered; name them in the W8 roster BY NAME

Coverage stops at the pane-card rung (A7, `t-card-color-census.md:45`), the admin-gold C3
exception, and O-7's pane list; no design-wave item, no O-18 rows, and the admin panels'
own furniture (sort menus, list rows, gold identity under the new ink contract) ride nothing.
Deliberate under-scoping is defensible (the owner never complained about admin) — but
h-refine-hardening's W8 roster fix should enumerate `admin-users/-names/-audit/-flagged/-tags`
+ the auth/profile flows BY NAME, else the roster repair inherits the same blind spot.

## G-12 — NOTE · `err.log` — an empty untracked file at the repo root, un-dispositioned

0 bytes, present in `git status` at hardening open; no lane or wave dispositions it (LEG-1..9
predate it). Likely dead-lane residue (a `2>err.log` from a crashed session). Amendment: delete
at W0-3's hygiene sweep (or immediately); add `*.log` to the PP-8 sweep's residue grep.

---

## CLEAN — absences probed and found NOT to be gaps

- **E-5 has its discharge vehicle**: t-prompts-recap §7 carries the completeness statement and
  the W8 package indexes verdicts "to the owner-verbatim line it answers (E-5 support)".
- **Landscape**: probed at 1024×640 (t-mobile:56); the witness law covers the fork.
- **The material census IS population-total**: O-7 spans all panes incl. Admin/ConfigSlider
  (t-oracle-gaps:118) — G-1 is about content items, not the rung census.
- **Fonts**: the Google-Fonts `media="print"` swap hack (`index.html:21`) dies with LS-6
  self-hosting — no separate print-hack finding needed.
- **Favicon generator**: dispositioned (W0-2 verify-dead excise).
- **Dock micro-chrome**: tooltips/separator/clip fully covered WITHIN the dock set (W6-8).
- **MOB-1/MOB-2, the 390 band, both schemes**: covered to census depth by t-mobile + gates.
- **Backend/API**: t-api-state TA-1..TA-7 + X1/O-25 cover the deploy/hygiene surface; no
  security-shaped owner ask exists to hang a security lane on (SPECULATIVE class, sub-NOTE).
- **Packet content staleness, W7-float collisions, W8 roster mechanics, owner-word drift**:
  owned and reported by h-packets, h-dag, h-refine-hardening, h-mandate-trace respectively.

---

*Lane artefact of the T hardening fleet. ZERO corpus edits made — every amendment above is a
proposal for the amend pass. Evidence gathered live at `tranche-t` HEAD (source tree byte-equal
to `tranche-s-close`), demo tree + `../glass-ui` read-only.*

## VERDICT DISSENT (recorded at the amend pass — VERDICT §5-D3)

G-8's option (a) — an app-level `errorHandler` as a W1 cargo row — is **NARROWED to the lane's own
option (b)**: runtime-error machinery inside the E-1 move wave is scope the move-only discipline
counsels against. Folded instead: a considered-and-declined ledger row (the G-10 table, now in
`T.md §5`) + a named W8 roster row ("thrown-error state"); promoted to a wave item only on owner
elevation. G-1 folded as MUSTFIX (M-34, option (a) + a W8 roster row); G-2/G-3/G-4/G-5/G-6/G-7/G-9/
G-11/G-12 folded as filed.
