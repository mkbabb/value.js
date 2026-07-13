# U.W-A11Y — THE A11Y HARDENING WAVE (the modalities T never ran)

**Name**: W-A11Y — the accessibility-hardening wave. The a11y correctness the T campaign's
owner-eye lens was blind to: a keyboard focus affordance that never paints, "certified" accents
that render below their own claimed floor, tap targets under the referent, and a whole slate of
modalities (forced-colors, prefers-contrast, prefers-reduced-transparency, screen-reader, real
slider-keyboard OPERATION, the authed+populated surface) that no lens ever drove. This is a
**designHeavy** wave (E-6): it designs the CURE — a focus-affordance SYSTEM, a live-surface contrast
referent, a target-size geometry, a high-contrast/reduced-transparency support layer, an
announcement grammar — not merely the gate.

**The wave's thesis** (why lighthouse's 1.0 proves nothing): the U-F55 a11y-half MEASURED
lighthouse `accessibility` at **1.0** (registry §19 — RETIRED, not re-opened here). That automated
score is BLIND to exactly the class this wave cures — it checks text contrast against SOLID
backgrounds (misses the accent-on-tinted-translucent-surface case), focusABILITY (misses whether a
ring PAINTS), and nothing about target-size-on-fine-pointers, forced-colors, prefers-contrast,
prefers-reduced-transparency, or screen-reader OPERATION. A green automated a11y audit over a
picker whose keyboard focus is invisible and whose accents breach 3:1 is the same green-over-broken
lie the whole U audit surfaced. **This wave gates the REAL a11y properties the automated audit
cannot see.**

**The a11y gate is machine-checkable** (the crisp contrast with U.W-VISUAL): unlike the aurora /
blob / veil GPU frames (SwiftShader-confounded → owner-attested annex, U-F54), the a11y properties
this wave cures are **deterministic and headless-verifiable** — WCAG contrast is a pure function of
resolved colors; a focus ring's paint is a computed `box-shadow`/`outline`; a target's size is DOM
geometry; forced-colors / prefers-contrast / prefers-reduced-transparency are Playwright media
emulations; `aria-valuetext` is a DOM attribute. So this wave's gates are **real born-RED
assertions**, not annex attestations — a green here is earned by the machine, and the owner-attested
register is small (only the aesthetic coherence of the high-contrast fallback + the authed-surface
gestalt).

**Opens after**: **U.W-VISUAL settles the shared picker/readout mount** (U-F76 — VISUAL → **A11Y** →
PERF; `U.md §wave DAG` + `DISPOSITION-LEDGER §A U-F76`). U.W-A11Y is the **SECOND writer** on that
mount: U-F26 (dark accents on the picker controls) + U-F27 (control tap targets) touch the SAME
picker/readout plate the VISUAL reseats (U-F5 blob, U-F9 header) settle first — so the mount-box
reservation PERF makes is not undone by A11Y geometry. The **non-mount rows run in parallel with
U.W-VISUAL** (U-F25 the gradient rail, U-F56 the authed surface, U-F57 the modality support layer,
U-F58 the web-modality decisions are all mount-independent). A W8-terminal residue folds in (U-F26
absorbs the error-detail sub-3:1 the T.W8 close left — CLOSED `complete_with_misses` at `28f30ed`).

**Spec of record**: `audit/registry.md §6` (U-F25/F26/F27) + §10 (the round-2 verify SHARPENINGS —
U-F25 twin-dead-hover, U-F26 default-seed-specific) + §16 (U-F56/F57/F58 the completeness frontier)
+ §19 (U-F55 a11y-half → PASSES 1.0, RETIRED) + §26 (the wave-shape) · `U.md §wave DAG` +
`§W8-terminal-state inheritance` (the U-F26 error-detail residue) · `DISPOSITION-LEDGER §A`
(U-F25/F26/F27/F56/F57/F58 rows) + `§C` (the T-row map) · the U-F6/O-14 **feasibility-leg law**
(WR-8 — *"O-14 gains a ramp-stop FEASIBILITY leg … the oracle compared sites to tokens, never
tokens to their floors"*, `T.W8.md:186`) which U-F26's rendered-tier gate IMPORTS · the landed BH
communiqué (`../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md`,
glass-ui HEAD `17e0f522`) — the producer-relay of record this wave appends to.
**On any divergence between this wave doc and its spec-of-record, the spec wins**; above both, the
owner's verbatim (§13.5 + any live ruling) wins over every encoding.

**Agents**: Fable + the frontend-design plugin for every design lane (E-6); opus/sonnet fanout,
batches of three. Each cure runs the design loop (research → synthesize → prototype → critique →
agglomerate). The probe-parsimony edict binds: static-analysis-first, live probes only to confirm a
formed hypothesis, purpose-built scripts emitting compact summaries (the a11y probes are
computed-style / geometry / attribute reads + Playwright media emulations — element-clipped, never
full-page dumps).

**Mode**: PLANNING-ONLY at authorship — this doc is the spec. The named cures LAND in-wave when U
executes; nothing here edits source. Every U commit is path-scoped to `docs/tranches/U/**` and
pull-rebased first.

**Status**: PENDING — mount-coupled rows (U-F26/F27) open on U.W-VISUAL's settled mount; the
modality rows (U-F25/F56/F57/F58) open at root in parallel.

---

## §Goal criterion

Every a11y defect in the registry's §6 + §16 A11Y set is **cured at its root and gated born-RED
against a real headless assertion** (deterministic a11y property, NOT the owner-attested annex), and
every modality T never ran is **either built to a designed cure or explicitly ruled out-of-scope
with recorded rationale** (zero silent drops per modality). The design is the deliverable:

- keyboard focus paints a **distinctive, any-background-legible focus affordance** on every operable
  control — a coherent focus SYSTEM (dual-contrast ring composed in the cascade, forced-colors
  `outline` fallback), never an inline-clobbered no-op;
- every "certified" accent renders **≥ its claimed WCAG 3:1 floor against the ACTUAL rendered
  surface** (the live-probed tinted/translucent plate, not a gray proxy) — the guard-constant earns
  a feasibility leg (the U-F6/O-14 law);
- every keyboard/pointer-operable control meets the **target-size floor** (WCAG 2.5.8 24px on fine
  pointers via always-on hit-inflation; the producer's 44px referent on coarse) with **no
  mount-box regression** (the U-F76 handoff stays clean);
- every slider announces a **human-readable value** (`aria-valuetext`, unit-aware) — not a raw
  16-digit `aria-valuenow`;
- the app is **usable and coherent under forced-colors, prefers-contrast, and
  prefers-reduced-transparency** — with the CHROMATIC content (the whole point of a color tool)
  PRESERVED where the chrome is systematized;
- the **authed + populated surface** (login → save → publish → admin → populated Extract-Browse) is
  driven live and passes the a11y battery + reads as a coherent gestalt;
- the untested web modalities (i18n/RTL, print, PWA/offline, long-session/memory) each carry a
  **decided disposition** — built with a designed cure, or out-of-scope with rationale.

## §Completion criterion

- Every §6/§16 a11y family (U-F25/F26/F27/F56/F57/F58) lands its designed cure; each **born-RED
  headless gate flips RED→GREEN** on the cure (the machine-checkable half) and each carries its
  **before/after π-frame + DELTA** (the eye half; captured headless — a11y properties are
  deterministic).
- The **U-F76 mount handoff is clean**: U-F26/F27 apply their control edits WITHOUT re-opening the
  mount box VISUAL settled (target-size prefers hit-inflation over visual-box growth precisely to
  hold the geometry stable); where a box MUST change, it is frozen HERE and the final geometry is
  handed to U.W-PERF (booked).
- The **U-F58 per-modality decision table is complete** — every modality is built-with-gate or
  out-of-scope-with-rationale; none silently dropped.
- The **producer RELAY addendum** landed at the glass-ui BH inbox (the target-size floor on producer
  primitives + the forced-colors/prefers-contrast/reduced-transparency + focus-`outline` support on
  producer primitives), supplementing the landed communiqué (`17e0f522`).
- The **owner's verdict is recorded** for the small owner-attested register (high-contrast fallback
  coherence + authed-surface gestalt). PP-16: gates-pass-goal-unmet closes `complete_with_misses`.

---

## §Scope — the families this wave builds (each with its cure APPROACH; E-3 binds: no workaround/legacy)

Every design axis is presented as a **BRACKET with both poles named** (the house convention); the
design loop's prototype phase picks inside the bracket against the owner's word.

**Explicitly NOT in this wave's set** (named so no reader expects them here):
- **U-F4** the PRM dock-collapse (the sharpest a11y break found) is **PRODUCER-ONLY** (glass-ui
  `morph.css:72` `data-morphing` latch; demo EXONERATED, R-1) → folds into **U.W-ADOPT**'s
  BI-acceptance list. No demo cure to make.
- **U-F55 a11y-half** (lighthouse `accessibility` score) MEASURED **1.0** → **RETIRED** (registry
  §19). This wave does NOT chase the automated score; it gates the properties the score is blind to.

### U-F25 · `gradient-stop-focus-invisible` — build (born-RED; the twin of the 4e6c178 dead-hover miss)

**The defect** (registry §6/§10; `GradientStopEditor.vue`): the keyboard-operable gradient stop
`<button>` (`:242-280`) carries `focus-visible:ring-2 focus-visible:ring-ring` (`:248`) but the
ring **never paints**, dead from day one by TWO causes: (1) the inline `boxShadow: 'var(--shadow-sm)'`
(`:261`) REPLACES the whole `box-shadow` property, clobbering Tailwind's ring (which is a
`--tw-ring-shadow` box-shadow layer) — the identical "inline value shadows the class utility"
failure the file itself documents for hover-scale-vs-transform (`:37-39`); (2) the `--ring`/
`--color-ring` token resolves empty, so even an un-clobbered ring would be invisible. The commit that
cured the twin dead-HOVER (`4e6c178`) missed the identical FOCUS pattern (§10). Zero focus
affordance on a control operated by arrows/Delete/Escape (`onHandleKeydown`, `:186-200`).

**Cure APPROACH** — a coherent focus SYSTEM, not a per-symptom patch (E-3: fix the class). **The
architectural transposition BRACKET**:
- **Pole A — hoist the shadow stack to the cascade**: stop setting `box-shadow` INLINE; the per-stop
  COLOR stays inline (it is per-stop data), but the material lift (`--shadow-sm`) + the focus ring
  move into the scoped `.rail-handle` CSS so the cascade COMPOSES them (`:focus-visible { box-shadow:
  <ring>, var(--shadow-sm) }`) instead of the inline value clobbering. This is the gestalt fix — the
  shadow/ring stack becomes a stylesheet contract, the color stays data.
- **Pole B — fold the ring into the inline expression**: keep the inline `boxShadow` but make it a
  computed that APPENDS the ring layers when the handle is `:focus-visible` (the file's own
  hover-scale-into-transform idiom, generalized to box-shadow).
Pole A is preferred (it also removes the inline/class shadowing class of bug outright).

**The affordance design** (any-background legibility — the ring rides OVER the stop's own color
fill): a **dual-contrast ring** — a 1px inner hairline in a dark tone + a 2–3px outer ring in a
light tone (or the certified accent), so at least one edge contrasts against ANY stop fill
(`0 0 0 1px var(--focus-ring-inner), 0 0 0 3px var(--focus-ring-outer), var(--shadow-sm)`). The
`--focus-ring` recipe binds to the CERTIFIED accent (`--accent-view`, WCAG-guarded post-U-F26) for a
branded focus, with the forced-colors fallback below.

**The token cure**: resolve `--ring`/`--color-ring` (or mint `--focus-ring-inner`/`--focus-ring-outer`)
to real, non-empty values — ONE recipe reused by every keyboard-operable control (the sliders, the
dock, the buttons), not a per-control literal.

**The forced-colors bind (links U-F57)**: under `@media (forced-colors: active)` the UA strips
box-shadow → the affordance vanishes; the scoped rule adds `:focus-visible { outline: 2px solid
Highlight; outline-offset: 2px }` so the ring survives WHCM. The focus SYSTEM is one recipe across
the normal + forced-colors registers.

### U-F26 · `dark-accent-below-floor` — build (born-RED; imports the U-F6/O-14 feasibility-leg law)

**The defect** (registry §6/§10; `view-accents.ts`, `contrast.ts`, `viewSchema.ts:78-88`): the
per-view accent resolver DOES walk a WCAG 1.4.11 ≥3:1 floor (`view-accents.ts:159-174`,
`wcagContrastRatio` step 5) — but it verifies against a **pure-gray proxy** `publicOklch(bgL, 0, 0)`
(`:161`), NOT the actual rendered surface. Two mechanisms make the "certified" floor a fiction on
the RENDERED tier:
1. **gray-proxy referent** — the walk compares the accent to a gray at the derived lightness `bgL`,
   but the real plate is CHROMATIC (the U-F12 warm-brown tint) and TRANSLUCENT; a chromatic surface
   at the same OKLab L has a DIFFERENT WCAG relative luminance than a gray at that L, so the
   certified ratio ≠ the rendered ratio. The RAMP path already solved this (WR-8 —
   `resolveSurfaceLightnessLive`, `useViewAccents.ts:106-112`, the LIVE surface probe); the ACCENT
   path still trusts the gray proxy.
2. **coverage gap** — the measured breaches (default-seed: Tools active-tab 1.89:1, component
   channel labels ~2.8–3.0:1; §10 DEFAULT-SEED-SPECIFIC — light L=92 pink → mid-dark-pink paper,
   default 2.91–3.26:1, five other seeds clear 4.37–5.02:1) sit on surfaces that either consume a
   RAW un-guarded accent or consume `--accent-view` against a DIFFERENT surface than the resolver
   assumed. The certified floor covers the ONE token it walks, not every accent-bearing control.

Compounding: `computeSafeAccent` (`contrast.ts:122-155`) enforces an OKLab **lightness DISTANCE**
(`DEFAULT_MIN_CONTRAST = 0.35`, `:107`) — NOT a contrast ratio; its own docstring admits "0.35 …
~0.25–0.30 in OKLab L" ≈ WCAG, but ΔL does not map monotonically to the WCAG ratio, so the ΔL guard
alone lets sub-3:1 through.

**W8-terminal residue absorbed** (charter §W8-inheritance): the T.W8 close-`complete_with_misses`
error-detail sub-3:1 contrast (2.72:1, `microchrome-error.p1` pass) folds into this family — U-F26
re-guards the error-detail tier against its rendered surface if W8 left it red.

**Cure APPROACH** — ONE live-surface contrast referent across ramp AND accent (the elegant
transposition, E-3 desirable). **The referent BRACKET**:
- **Pole A — unify onto the live-surface probe**: route `resolveViewAccent`'s WCAG leg through the
  SAME `resolveSurfaceLightnessLive` referent the ramp already uses (WR-8), passing the surface's
  ACTUAL color (its relative luminance), not a gray at its L — so the certified ratio IS the rendered
  ratio. One referent, per-site (the WR-8 per-site split idiom applied to accents: each
  accent-bearing surface certified against ITS OWN rendered plate).
- **Pole B — a rendered-tier re-guard leaf in the library**: mint a `safeAccentAgainstSurface`
  leaf in `contrast.ts` that takes the surface COLOR (not just L) and walks the accent to clear the
  true WCAG ratio — the demo consumes it, no norm/denorm at the callsite (the `safeAccentCssString`
  discipline). (If minted, it is a value.js export → RELAY availability note.)
The **coverage half**: audit every accent-bearing control surface (Tools active-tab, channel labels,
the picker controls) and route each through the CERTIFIED token against its own surface — no raw
un-guarded accent survives on a control.

**The feasibility-leg import** (U-F6/O-14 law, WR-8): the guard-constant `GRAPHICS_CONTRAST_FLOOR = 3`
(`view-accents.ts:78`) earns a **feasibility leg** — a test that measures the RENDERED accent-on-real-
surface contrast (not the resolver's internal gray-proxy self-report). This is the born-RED (BR-2):
the oracle-class law that "every guard-constant gets a leg against its floor" (the O-14 owner-half
lives in U.W-ORACLE; U-F26 APPLIES the discipline to its own gate). Coordinates with U-F6 (ramp) +
U-F12 (dark tint) — the three dark-scheme reds share the derivation surface, cured coherently.

### U-F27 · `tap-targets-aria-polish` — fold (into the U-F25/A11Y hardening row; born-RED)

**The defect** (registry §6; `GradientStopEditor.vue`, `ComponentSliders.vue`): (1) the gradient
stops are **20×20** visual (`w-5 h-5`, `:248`) — the file ALREADY carries a coarse-pointer 44px
hit-inflation (`::before` under `@media (pointer: coarse)`, `:379-391`, consuming the producer
`--touch-target`) but the VISUAL target stays 20×20 on FINE pointers, under the WCAG 2.5.8 (Target
Size Minimum, AA) 24px floor — and stops can be dragged adjacent, so the 2.5.8 spacing exception
FAILS when two stops sit close; (2) **17/19 picker controls** sit under the owner's 44px referent;
(3) sliders emit a **raw 16-digit `aria-valuenow`** (e.g. `0.5833333333333334`) with no
`aria-valuetext` — a screen reader announces the raw float, not a value; (4) label casing is
inconsistent.

**Why fold (not standalone build)**: U-F27 edits the SAME gradient-stop control as U-F25 and the same
sliders U-F26 re-guards — it merges into ONE target-size + announcement hardening row within this
wave (the ledger's disposition), not an independent remediation.

**Cure APPROACH** — target-size WITHOUT mount regression (the U-F76 constraint). **The target
BRACKET**:
- **Pole A — always-on hit-inflation** (preferred, zero mount change): drop the `@media (pointer:
  coarse)` gate so the `::before` hit-expander is present on ALL pointers at `max(24px, …)` on fine /
  44px on coarse — the effective TARGET (WCAG 2.5.8 measures the target, which is the pointer-events
  area) clears 24px while the 20px visual dot is unchanged, so the mount box VISUAL settled is HELD
  (clean U-F76 handoff).
- **Pole B — grow the visual dot to 24×24**: only if the owner wants the visual target itself larger
  — this CHANGES control geometry (mount reflow) and must be frozen HERE (second writer) and handed
  to PERF.
Pole A is the mount-safe design; Pole B is the owner-preference escape.

**The announcement grammar** (design): every slider exposes `aria-valuetext` with a **human-readable,
unit-aware** value — "Hue 210°", "Red 128", "Saturation 42%" — one formatter keyed on the channel's
unit (degrees for hue, % for s/l/w/b, integer for rgb, the space's native precision). The SR user
hears a VALUE, not a 16-digit float. Label casing normalized to one convention. The formatter is the
demo's; if the underlying slider primitive is a glass-ui `Slider`, the `aria-valuetext` prop-through
is a producer RELAY (below).

### U-F56 · `authenticated-populated-surface-uneyeballed` — build (born-RED coverage gate)

**The gap** (registry §16): Login / save / publish / admin / populated Extract-Browse were NEVER
driven live — the entire audit ran on the empty-plate + unauthenticated GETs. `ProfileSection.vue`
(the login entry), the admin panels (`AdminNamesPanel`/`AdminUsersPanel`/`AdminFlaggedPanel`/…), and
the populated palette-card grid + populated browse have zero gestalt-or-a11y coverage.

**Cure APPROACH** — a driven-live gestalt + a11y pass over the authed journey (the design loop over
surfaces the empty-plate audit never saw). Drive the full journey against the HONEST full local
stack (`npm run dev` — api + mongo, or the `smoke-admin` `addInitScript` fixture): login → save a
palette → publish → admin moderation → populated browse. Over EACH populated state, run the a11y
battery (focus order, accessible names, contrast against the RENDERED surface per U-F26, target-size
per U-F27) AND the frontend-design gestalt critique (the login form's focus flow, the admin table's
keyboard nav + row/cell semantics, the populated grid's SR announcements, the publish flow's status
feedback). Any defect found becomes an in-wave cure row (born-RED where headless-verifiable).

### U-F57 · `a11y-modality-gaps` — build (born-RED; the support-layer design)

**The gap** (registry §16; VERIFIED grep — **ZERO** `forced-colors` / `prefers-contrast` /
`prefers-reduced-transparency` rules across `demo/` + `src/`): no coverage of forced-colors /
high-contrast, prefers-contrast, prefers-reduced-transparency, real screen-reader, real-mobile
touch, or slider keyboard OPERATION (presence ≠ operation). The source has no support layer at all.

**Cure APPROACH** — a designed high-contrast / contrast-preference SUPPORT LAYER (the biggest design
artifact of the wave). The app's aesthetic is glass/translucent (aurora, blob, veil, glass
surfaces); each modality needs a designed fallback, NOT a blanket override:

- **`@media (forced-colors: active)`** — the CRITICAL nuance for a COLOR tool: a blanket
  system-color substitution would destroy the very content the tool exists to show. Design a
  **two-tier `forced-color-adjust` policy**: `forced-color-adjust: none` on the color-DISPLAY
  surfaces (swatches, spectrum canvas, gradient rail, the blob, the readout well) so the actual
  colors SURVIVE WHCM; default `auto` on the CHROME (buttons, labels, borders, the dock) which adopts
  system colors (`Canvas`/`CanvasText`/`ButtonFace`/`ButtonText`/`Highlight`/`LinkText`). Restore
  `outline` focus (the U-F25 forced-colors bind — box-shadow rings vanish here). This is the design
  judgment call the modality demands.
- **`@media (prefers-contrast: more)`** — an elevated-contrast token layer: thicker borders,
  text tokens at a higher floor, the low-contrast decorative tints (the U-F12 warm-brown muddiness)
  DROPPED. One override token set, not per-component.
- **`@media (prefers-reduced-transparency: reduce)`** — the veil / glass surfaces (the U-F10 console
  veil, the dock glass, the popover glass) drop translucency for an OPAQUE fallback. Design ONE
  opaque-surface token set the glass falls back to (coordinates with U-F10 in U.W-VISUAL — the
  reduced-transparency opaque is the same material the veil approaches).
- **Screen-reader** — landmark structure (`main`/`nav`/`complementary`), the picker's live-region
  color-change announcement, SR-only labels; a real SR pass (or the axe/role assertion battery
  driven live).
- **Slider keyboard OPERATION** — drive arrow/Home/End across each slider's full range and assert
  the value moves (not merely that the thumb is focusable).

The demo-side support layer lands HERE; the **producer-primitive support** (the glass-ui GlassDock /
Button / Select / WatercolorDot / GooBlob under forced-colors + reduced-transparency, with
`forced-color-adjust: none` on the producer color surfaces) is a RELAY (below) — a forced-colors
pass that stops at demo CSS leaves the producer glass invisible in WHCM.

### U-F58 · `untested-web-modalities` — build-or-out-of-scope PER MODALITY (recorded, never dropped)

**The gap** (registry §16; VERIFIED — `index.html` has `lang="en"` (good) but **no `dir`**, **no
`@media print`**, **no manifest / service worker**). Severity C; the formation DECIDES per modality:

| Modality | Decision | Rationale / cure |
|---|---|---|
| **i18n / RTL** | **build (mechanical readiness)** | Set `dir` plumbing + a logical-property audit (physical `left/right` → `inline-start/end`); born-RED: `dir="rtl"` layout integrity (no clipped/overlapping controls). NOT full string extraction (single-locale tool — that half out-of-scope). |
| **print** | **build** | A color tool's palette IS a printable artifact; design a clean `@media print` layout — swatches + hex/space labels, chrome hidden, ink-economical. Born-RED: a print render produces a legible palette. |
| **PWA / offline** | **out-of-scope (recorded)** | Static demo, already browser-cached; no offline DATA model (palettes are API-backed). A SW/manifest is scope creep with no offline value — recorded so no successor re-opens. |
| **i18n string extraction** | **out-of-scope (recorded)** | Single-locale English tool; the RTL mechanical readiness (above) is the buildable half. Recorded. |
| **long-session / memory** | **fold → U.W-PERF** | The iOS 294-frame `ValueUnit`-nesting historical class (MEMORY.md) is perf-adjacent; folds into the existing `smoke-safari` sustained-30s probe + booked to U.W-PERF. Recorded, not dropped. |

---

## §Hard gate (born-RED headless-verifiable — a11y is deterministic; a SMALL owner-attested register)

The distinguishing law of THIS wave (vs U.W-VISUAL's U-F54 annex): a11y properties are
**deterministic and headless-verifiable**, so the gates are **real born-RED assertions** — a
computed contrast ratio, a computed focus-shadow/outline, DOM target geometry, a Playwright media
emulation, a DOM attribute. There is NO SwiftShader confound to dodge (contrast does not depend on
the GPU). The owner-attested register is small (only the aesthetic coherence of the high-contrast
fallback + the authed-surface gestalt).

### Register 1 — born-RED headless-verifiable (RED today; flips GREEN on cure)

| # | Gate (born-RED) | Family | LIVE evidence (the RED it guards) |
|---|---|---|---|
| **BR-1** | keyboard-focus a gradient stop → computed focus affordance PAINTS: a ring layer present in `box-shadow` (distinct from `--shadow-sm`) with a non-empty resolved ring color; under `forced-colors:active`, a computed `outline` ≥ 2px | U-F25 | `GradientStopEditor.vue:261` inline `boxShadow` clobbers `focus-visible:ring-2` (`:248`) + empty `--ring`; 4e6c178 missed the focus twin (§10) |
| **BR-2** | default-seed render → EVERY accent-bearing control's WCAG contrast, computed against its LIVE-PROBED rendered surface color, ≥ 3:1 (the feasibility leg — U-F6/O-14) | U-F26 | `view-accents.ts:161` walks against gray proxy `publicOklch(bgL,0,0)`; §10 default-seed Tools 1.89 / labels ~2.8–3.0; W8 error-detail 2.72 |
| **BR-3** | every keyboard/pointer-operable picker control's effective target ≥ 24px CSS on fine pointers (WCAG 2.5.8) / ≥ 44px on coarse — via always-on hit-inflation (no mount-box change) | U-F27 | gradient stops 20×20 on fine (`:248`); coarse-only `::before` (`:379`); 17/19 controls < 44px |
| **BR-4** | every slider exposes a human-readable, unit-aware `aria-valuetext` — NOT a raw ≥10-digit `aria-valuenow` | U-F27 | registry §6: raw 16-digit `aria-valuenow`, no `aria-valuetext` |
| **BR-5** | under `forced-colors:active` emulation: the operable chrome (dock nav, sliders, gradient handles, buttons) stays visible + operable AND the color-DISPLAY surfaces (swatches, spectrum, rail, blob, readout) retain their colors (`forced-color-adjust:none`) | U-F57 | VERIFIED: 0 `forced-colors` rules in `demo/`+`src/` → chrome loses affordance, color surfaces forced |
| **BR-6** | under `prefers-contrast:more` emulation: the elevated-contrast token layer engages (border weight up, decorative tints dropped, text tokens at the higher floor) | U-F57 | VERIFIED: 0 `prefers-contrast` rules |
| **BR-7** | under `prefers-reduced-transparency:reduce` emulation: the veil / dock glass / popover glass present an OPAQUE fallback (computed `backdrop-filter:none` + opaque background) | U-F57 | VERIFIED: 0 `prefers-reduced-transparency` rules |
| **BR-8** | slider keyboard OPERATION: arrow/Home/End drive each slider's value across its range (driven, not merely focusable) | U-F57 | registry §16: "slider keyboard OPERATION" uncovered |
| **BR-9** | drive the authed+populated surface (login→save→publish→admin→populated browse) → the a11y battery (focus order, accessible names, contrast, target-size) passes over EACH populated state | U-F56 | registry §16: never driven live (empty-plate + unauth GETs only) |
| **BR-10** | `dir="rtl"` → layout integrity (no clipped/overlapping controls; the logical-property audit holds) | U-F58 (RTL) | VERIFIED: `index.html` has no `dir`; physical `left/right` unaudited |
| **BR-11** | `@media print` render → a legible palette artifact (swatches + hex/space labels, chrome hidden) | U-F58 (print) | VERIFIED: 0 `@media print` rules |

**Born-RED count: 11** (BR-1..BR-9 guard a LIVE defect/gap; BR-10/BR-11 are born-RED capability
gates for the two U-F58 built modalities). Each is a real headless assertion — the a11y annex does
NOT apply (contrast/geometry/attribute/emulation are GPU-independent).

### Register 2 — owner-attested (small — only the genuinely perceptual/subjective)

| # | Gate (owner-attested) | Family | Why not machine-checkable |
|---|---|---|---|
| **OA-1** | the forced-colors / prefers-contrast / reduced-transparency fallbacks read as COHERENT (not a broken systematized mess) — the aesthetic of the high-contrast register | U-F57 | operability is born-RED (BR-5..BR-7); the AESTHETIC coherence of the fallback is taste |
| **OA-2** | the authed+populated surface reads as a coherent gestalt (the login/admin/populated-browse design critique) | U-F56 | the a11y battery is born-RED (BR-9); the gestalt is owner-terminal (lesson 12) |

**The gate**: Register 1 is machine-terminal (the born-RED flip IS the pass); Register 2 is the
owner's verdict. PP-16: gates-pass-goal-unmet closes `complete_with_misses`.

---

## §π/DELTA obligations (every VISUAL claim carries a before/after π-frame + a DELTA)

Every a11y cure with a visual surface carries an annotated before → after π-frame pair — captured
**HEADLESS** (a11y properties are deterministic; no real-GPU annex needed here, the crisp contrast
with U.W-VISUAL) under `docs/tranches/U/audit/pi/w-a11y/`, both schemes, the named viewports/media.
The DELTA is the measured quantity that moved RED→GREEN.

| Family | π-frame (before → after) | DELTA (measured) |
|---|---|---|
| U-F25 | `gradient-focus-{light,dark}.png` (+ `-forced-colors`) — no ring → dual-contrast ring / `outline` | focus-affordance paint (RED: 0 ring layers / empty ring color → GREEN: ring present, non-empty, ≥ Npx); forced-colors `outline` (0 → ≥2px) |
| U-F26 | `accent-contrast-default-{light,dark}.png` — control labels/Tools tab breaching → certified | WCAG contrast vs LIVE surface (RED: Tools 1.89 / labels ~2.8 / error-detail 2.72 → GREEN: ≥3:1); referent (gray proxy → live-probed surface color) |
| U-F27 | `tap-targets-{fine,coarse}.png` — 20×20 dot / raw valuenow → inflated target / spoken value | effective target size (RED: 20px fine → GREEN: ≥24px fine / ≥44px coarse); `aria-valuetext` (absent → "Hue 210°"); mount-box delta (0 — held) |
| U-F56 | `authed-{login,admin,browse}-{light,dark}.png` — never-eyeballed → driven + passing | a11y-battery pass-count over populated states (RED: uncovered → GREEN: all pass); defects-found→cured count |
| U-F57 | `modality-{forced-colors,contrast-more,reduced-transparency}.png` — no layer → designed fallback | operable-control visibility under emulation (RED: 0 rules / chrome invisible → GREEN: all visible+operable); color-surface preservation (forced → retained); glass opacity under reduced-transparency (translucent → opaque) |
| U-F58 | `rtl-layout.png` + `print-artifact.png` — no dir / no print → integral RTL / clean print | RTL layout-integrity (RED: no `dir` → GREEN: integral); print legibility (RED: 0 `@media print` → GREEN: palette artifact) |

**Obligation law**: a family may not claim GREEN without BOTH the after π-frame captured AND the
DELTA logged moving RED→GREEN. Because a11y is deterministic, BOTH halves are headless — the born-RED
flip is the machine half, the π-frame is the eye half; both, or the row stays RED.

---

## §Cross-repo RELAY (E-2 — every glass-ui-touching wave carries a RELAY row)

U.W-A11Y touches glass-ui producer surfaces (the shared controls the demo consumes — Slider,
Button, GlassDock, WatercolorDot, GooBlob, the veil), so per E-2 (THE RELAY EDICT — *"All component
level and glass-ui level changes must be communicated to them directly, at the root, a fond"*) it
carries a RELAY row into the ACTIVE glass-ui **BH** inbox at their HEAD, path-scoped, foreign-tree
fence otherwise.

**RELAY row (this wave)** — an A11Y-wave ADDENDUM appended to
`../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md` (the landed
communiqué, glass-ui HEAD `17e0f522`), supplementing (never superseding) it:

| Producer surface | The A11Y-wave ask | Status |
|---|---|---|
| **target-size floor on producer primitives** (U-F27) | honor the producer's own `--touch-target` (44px) on the Slider thumb / Button / DockIconButton / DockSelectTrigger / DockDropdownTrigger via visual size OR always-on hit-inflation (fine pointers too — the demo hit-inflates its OWN gradient handles but the SHARED controls are producer-owned) | **NEW addendum** — A11Y-wave acceptance constraint |
| **forced-colors / prefers-contrast / reduced-transparency on producer primitives** (U-F57) | GlassDock / Button / Select / veil under `forced-colors:active` + `prefers-reduced-transparency:reduce` (opaque fallback); `forced-color-adjust:none` on the producer COLOR surfaces (WatercolorDot / GooBlob / spectrum) so the color content survives WHCM — a demo-only pass leaves producer glass invisible in high-contrast | **NEW addendum** — the largest producer ask; A11Y acceptance constraint |
| **focus `outline` fallback on producer primitives** (U-F25) | box-shadow focus rings vanish under `forced-colors:active`; producer interactive primitives carry a real `outline` focus affordance in the forced-colors register | **NEW addendum** — the focus-system producer half |
| **`aria-valuetext` prop-through on the Slider primitive** (U-F27) | if the color sliders are the glass-ui `Slider`, expose an `aria-valuetext` prop so the demo's unit-aware formatter reaches the a11y tree | **NEW addendum** — announcement-grammar producer half |
| **a value.js contrast primitive** (U-F26, conditional) | if the cure mints `safeAccentAgainstSurface` (WCAG-against-real-surface-color) in value.js `contrast.ts`, ANNOUNCE its availability so glass-ui's own contrast paths can adopt it | **NEW addendum** — value.js→glass-ui AVAILABILITY note (not coordination-blocking) |
| **the PRM dock-collapse** (U-F4) | the desktop `data-morphing` PRM latch collapse | **ALREADY DISPATCHED** — communiqué §2a (do NOT re-book; U-F4 is U.W-ADOPT's, cited by name) |

**Relay discipline** (M1 ruling): the value.js-side record IS the gate; an ack is a bonus, never
waited on. The addendum is a path-scoped single-file append into the foreign tree
(`../glass-ui/docs/tranches/BH/coordination/`), local, no force, not pushed — left for their
session. The already-dispatched U-F4 row is cited BY NAME (no second book).

---

## §Dispositions (each family → the exact build/fold/retire + rationale)

| Family | Disposition | Rationale |
|---|---|---|
| **U-F25** gradient-stop-focus-invisible | **build** | focus SYSTEM (cascade-hoisted shadow stack + dual-contrast ring + forced-colors `outline`); born-RED BR-1; the twin of the 4e6c178 dead-hover miss |
| **U-F26** dark-accent-below-floor | **build** | live-surface contrast referent unifying ramp+accent (the WR-8 idiom applied to accents); the O-14 feasibility-leg applied; born-RED BR-2; absorbs the W8 error-detail 2.72 residue |
| **U-F27** tap-targets-aria-polish | **fold** (into the U-F25/A11Y hardening row) | edits the same gradient-stop control + sliders; always-on hit-inflation (mount-safe) + the `aria-valuetext` announcement grammar; born-RED BR-3/BR-4 |
| **U-F56** authenticated-populated-surface-uneyeballed | **build** | driven-live gestalt+a11y over the authed journey (surfaces the empty-plate audit never saw); born-RED BR-9 (coverage) + owner-attested OA-2 (gestalt) |
| **U-F57** a11y-modality-gaps | **build** | the designed high-contrast/contrast-preference SUPPORT LAYER (forced-colors two-tier policy + prefers-contrast + reduced-transparency + SR + slider operation); born-RED BR-5..BR-8 + owner-attested OA-1 (fallback coherence) |
| **U-F58** untested-web-modalities | **build-or-out-of-scope PER MODALITY** | RTL + print BUILD (born-RED BR-10/BR-11); PWA/offline + i18n-strings OUT-OF-SCOPE (recorded); long-session/memory FOLD → U.W-PERF. Zero silent drops per modality. |

**Named NOT here** (no silent drop): U-F4 (PRM dock) → U.W-ADOPT (producer-only, demo EXONERATED);
U-F55 a11y-half (lighthouse 1.0) → RETIRED (registry §19, not re-opened). The U-F6/O-14 oracle-half
that U-F26 IMPORTS lives in U.W-ORACLE (U-F62 split) — this wave APPLIES the law, does not own it.

---

## §Dependencies

- **opens-after: U.W-VISUAL settles the shared mount** (U-F76 — VISUAL → **A11Y** → PERF) — U-F26
  (control accents) + U-F27 (control target-size) touch the SAME picker/readout plate VISUAL reseats
  (U-F5 blob, U-F9 header) settle first. The A11Y edits are the SECOND writer; target-size prefers
  hit-inflation precisely to hold the mount box stable (clean PERF handoff). The **non-mount rows
  (U-F25, U-F56, U-F57, U-F58) run in PARALLEL with U.W-VISUAL** (mount-independent).
- **The U-F6/O-14 feasibility-leg law (U.W-ORACLE)** — U-F26's rendered-tier gate (BR-2) IMPORTS the
  law ("every guard-constant gets a feasibility leg"). The LAW is stated in the registry/WR-8; no
  hard blocking dependency (U.W-ORACLE owns the O-14 fix; U-F26 applies the discipline).
- **The honest full local stack** (`npm run dev` — api + mongo, or the `smoke-admin` fixture) — U-F56
  drives login/save/publish/admin, so it needs the authenticated surface live.
- **glass-ui producer primitives** (Slider / Button / GlassDock / WatercolorDot / GooBlob / veil) —
  the producer HALVES of U-F27 (target-size), U-F57 (forced-colors/reduced-transparency), U-F25
  (focus `outline`) are relayed; they ride the glass-ui dev process / U.W-ADOPT BI-acceptance (NOT
  blocking the demo halves, which are buildable independently).
- **No dependency on U.W-LIB / U.W-ADOPT for the demo cures** — the a11y cures are orthogonal to the
  library-correctness cut and the 5.0.0 adopt (except the conditional U-F26 contrast-leaf, which if
  minted rides the library-cut availability — booked).

---

## §BOOKS (rides to a later wave, by name — no silent drop)

- **The SETTLED picker/readout mount + the final control geometry → U.W-PERF** (U-F76): U-F26/F27
  apply their control edits WITHOUT re-opening the mount box (hit-inflation over visual-box growth);
  the final geometry is handed to PERF, which reserves the box + measures CLS/LCP over it. If Pole B
  (visual dot → 24×24) is owner-chosen, the changed box is frozen HERE and booked to PERF.
- **The producer halves → U.W-ADOPT BI-acceptance / BH relay** (already dispatched or newly relayed):
  the target-size floor on producer primitives, the forced-colors/reduced-transparency + focus-
  `outline` support on producer primitives, the Slider `aria-valuetext` prop-through — the demo halves
  land in-wave; the producer halves ride the glass-ui cut.
- **The U-F26 `safeAccentAgainstSurface` leaf (if minted) → U.W-LIB / U.W-ADOPT** (availability): a
  new value.js `contrast.ts` export co-lands with the library-correctness cut's version decision and
  is announced to glass-ui (RELAY availability note) — booked so the export surface stays coherent.
- **U-F58 long-session / memory (the iOS 294-frame `ValueUnit`-nesting class) → U.W-PERF** (fold):
  perf-adjacent; the existing `smoke-safari` sustained-30s probe carries it; booked, not dropped.
- **The U-F6/O-14 oracle-class law → U.W-ORACLE** (U-F62 split): U-F26 IMPORTS the feasibility-leg
  discipline; the O-14 proxy-oracle FIX (the law's home) is U.W-ORACLE's — cited, not owned here.
- **The owner-attested register (OA-1 fallback coherence + OA-2 authed gestalt) → the owner's verdict
  at wave-close** (recorded — it IS the gate for the perceptual half; PP-16).

---

**Precedence chain** (restated): the owner's verbatim (§13.5 + any live ruling) → `audit/registry.md
§6/§10/§16/§19/§26` → `U.md` (charter) → this wave doc. Downstream never overrides upstream. Unlike
U.W-VISUAL, this wave's gates are **machine-terminal born-RED** (a11y is deterministic — no U-F54
annex applies); only the small owner-attested register (fallback coherence + authed gestalt) awaits
the owner's eye.
