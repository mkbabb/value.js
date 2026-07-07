# T lane · t-misc-elements — T-4 (the bottom text area) · T-16 (the corner element) · T-9-UX (life after the banner)

**Lane class**: DESIGN (Fable — frontend-design bar; judged by eye in the browser, light + dark, computed styles cited).
**Substrate**: `tranche-t` = master @ `cc4f4fa` (the S close). ZERO product-code changes made.
**Live probes**: own vite on **:9123** (`VITE_API_URL=http://localhost:59999` → the `unavailable` register) and **:9124** (no `VITE_API_URL` → the designed `misconfigured` register; safe — the misconfig latch throws synchronously at `availability.ts:188–195`, zero requests issued to prod). Owner's :9000 untouched. Dark mode probed via the root `.dark` class.

---

## §0 Shot re-derivation (the mandate map is best-effort; these are READ-from-disk verdicts)

| Shot | Actually shows | Finding |
|---|---|---|
| `t-2000-41` | The picker card's **slider block** in Lab: the L/A/B/A rail letters + four *static* parenthesized range captions `(0% - 100%)`, `(-125 - 125)`, … one above each slider. Verified pixel-for-layout identical live at :9123. | **T-4** |
| `t-2006-56` | The **Generate view's `Regenerate` pill** — a gray-brown glass capsule floating below the specimen plate's bottom-left corner shadow, on the bare accent field. View context anchored by `t-2006-46` (the "Generated Palette" plate, 10 s earlier) and `t-2007-15/-18` (the Preset/Harmony selects, ~20 s later). | **T-16** |
| `t-2004-10` | **THE BANNER** — the full-width (3024×96 px) destructive-red `DevMisconfigBanner` strip: "value.js dev is misconfigured — no local backend. Run `npm run dev` …". The mandate's map points T-9 at `t-2004-32`, but `t-2004-32` is the **nav menu** (Home/Palettes/Browse/… with per-item color dots) — that shot belongs to **T-10**. Correction for the synthesis lane; T-8 (blob) must re-derive its own shot, since `t-2004-10` is spoken for. | **T-9** |

---

## Finding 1 — T-4: the "bottom text area" is static range furniture; *dynamic* means the live channel readout

**Identification.** The bottom text area of the picker card = the per-slider range captions:

- `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:49–51` —
  `<span class="font-normal text-caption italic opacity-50 pl-1">{{ currentColorRanges[component] }}</span>`
  One caption above each channel slider; the block is the card's bottom section.

**Evidence.**
- *Static*: `currentColorRanges` changes only on **space switch**, never with the picked color. Drag the L slider end-to-end — the text never moves (live probe :9123).
- *Computed (light)*: Plus Jakarta Sans **italic** 14.54 px, `opacity: 0.5`, ink `rgb(28,25,23)`, span width 435 px (a full text row per slider). *Computed (dark)*: `rgb(233,230,226)` @ 0.5 over card `oklab(0.3628 0.0101 0.0172 / 0.7424)` — a half-alpha whisper. On the owner's saturated dark-orange field (t-2000-41) it reads as noise.
- *The live value exists but is hover-jailed*: the slider tooltip (`ComponentSliders.vue:88–94`) prints `denormalizedCurrentColor.value[component].toFixed(2)` — visible only while hovering the thumb, and never on touch.
- *The range is stated three times*: the caption (line 49), the rail-letter tooltip (line 36), and the About card's Components section ("L* (Lightness) 0% to 100%…" — live probe, home view). The live per-channel value is stated persistently **nowhere**.

**Root cause.** The instrument's voices are inverted: its *persistent* text is static reference furniture (triplicated elsewhere), while its *dynamic* signal — the value the user is actively setting — is transient (hover tooltip) or aggregated far away (the header readout tuple). An instrument's standing text should be its reading, not its spec sheet.

**Owner**: demo.

**Cure direction (gestalt — the channel strip).** Invert the voices. Each slider row becomes an instrument **channel strip** — *name, signal, meter*: the rail letter (name), the spectrum track (signal), and a **persistent live readout** of that channel (meter): the denormalized value with unit, in the house mono voice (Fira Code, `tabular-nums`, the mono-caption size), updating synchronously with the drag. The data source already flows through `COLOR_MODEL_KEY` (`denormalizedCurrentColor`, formatted per `COLOR_SPACE_DENORM_UNITS`) — zero new state, the same reactive cell the header readout consumes. The static range **retires** to the two surfaces that already own it (the rail tooltip + the About card); the hover tooltip **dies** (one voice per fact — E-3). Typographically the meter joins T-7's recalibrated readout register: the header shows the contiguous tuple, each strip shows its member — same voice, one golden-scale step down; never italic, never `opacity-50` (the t-2001-51 legibility complaint is this same block). Alpha row included; the meter must ride the properly-contrasted variant system T-5 specifies for this area.

**Cross-lane**: T-5 (the same block gains the dock-like letter ring + glass encapsulation — the meter is part of that row hierarchy), T-7 (one readout voice), T-24 (ink consistency).

---

## Finding 2 — T-16: the strange bottom-left corner element is the Generate view's own primary verb, orphaned

**Identification.** `t-2006-56` = the `Regenerate` button of `GenerateControls.vue:109–123` — the toolbar row (`Button variant="primary-audacious"` + right-aligned `seed:` mono note) that sits **below** the generated-palette specimen plate, inside the wash-tier Generate pane.

**Evidence.**
- *Intent/reality gap*: the S.W5-6 · F8 comment (`GenerateControls.vue:106–108`) declares "the plate's toolbar: the one verb" — but the landed DOM places the row **outside** the `PaletteCard`, between plate and marginalia. In the owner's crop it hangs off the plate's corner shadow like stray furniture.
- *The container vanishes*: the pane surface is `Card tier="wash" :shadow="false"` (`GeneratePane.vue:32`) — computed `oklab(0.8036 0.0052 0.0118 / 0.356)` + `blur(1px) saturate(1.4)`. Against a saturated accent field (the owner's dark-orange session) the wash reads as *background*, so the row loses any visible parent (the T-11/T-18 transparency family, adjacent lanes).
- *The hero register is static-frame-invisible*: `primary-audacious` resolves to `glass-wash btn-glass glass-deep glass-capsule glass-capsule-hover btn-punch text-foreground` (glass-ui `src/components/ui/button/index.ts:100–101`, BD.W-BUTTON-GLASS-CONSUME — the disco deliberately retired). Computed paint: light `oklab(0.8815 0.0054 0.0127 / 0.328)`, dark `oklab(0.4613 0.0088 0.0152 / 0.4544)`, foreground ink — **zero accent hue**. Its hero cues are kinetic and material (deep blur, punch press, specular catch-light), all of which read as *nothing* in a still glance on a saturated field. Hence: a mud-gray anonymous pill.

**Root cause (threefold).** (1) The verb landed outside the plate it acts on; (2) its wash container is invisible under saturated accents; (3) its "deliberate primary" register carries no chromatic prominence by producer doctrine — correct doctrine, but it makes *placement* carry the whole hierarchy, and placement is exactly what's broken.

**Owner**: demo (placement/containment — the decisive half); **joint** rider for register (E-2 packet).

**Verdict: REDESIGN — never excise.** It is the view's only verb; F8's hierarchy-inversion cure was right and incompletely landed.

**Cure direction (gestalt — the verb joins the plate).** Regenerate lives **on** the specimen plate's own chrome: the plate header row already carries *name — count — overflow*; it becomes *name — count — regenerate — overflow* (the regenerate action as a first-class plate action, not an adjacent stray). The seed becomes the plate's bench note (mono footnote inside the plate — provenance, like a specimen label), and the orphan toolbar row **dies**. Remaining pane flow: plate → marginalia (Preset/Harmony) → count ramp. This resolves "strange corner element" independent of paint, on all screen widths, and finally lands F8 as written. *E-2 packet rider (producer question, not a demo fork)*: whether the house wants a hue-carrying primary tier — the "prominence = tint, not size" rule glass-ui's own comment cites — is glass-ui's call; the demo must not costume the button locally (E-3).

**Cross-lane**: T-11/T-18 (the wash-tier invisibility is the enabling defect), T-15 (`t-2006-46` — the plate title font — same view, different lane), T-17 (the same view's selects).

---

## Finding 3 — T-9 (UX half): the banner dies; the honest-dev states re-home to the shell's status organ + the surfaces that feel the failure

**The owner's question answered** ("why does the backend not work hereof?"): it works exactly as designed. The audited :9000 is bare vite with no `VITE_API_URL`, so the app is in the **designed `misconfigured` state** (S.W0 W0-1): loopback origin + unset `VITE_API_URL` + cross-origin prod `BASE_URL` (`api.color.babb.dev`, whose CORS allow-list excludes localhost by the standing REJECTED ruling). Every transport call throws a synchronous `DevMisconfigError` (`availability.ts:188–195`) — no request is even issued. Nothing is broken; the bench is mis-set. The honest fix is `npm run dev` (full local stack). This answer belongs in the T corpus verbatim, because:

**The banner failed its one communicative job — proven by the strongest possible test.** The banner's entire text is "this is a dev-config error, not 'backend offline'" — and the owner, reading it, still asked *why the backend doesn't work*. An alarm register (full-width destructive red) swamps its own message: it says *the product is on fire*, and no sentence printed on a fire reads as "your bench is mis-set".

**Evidence.**
- `DevMisconfigBanner.vue:42–60`: `position: fixed; top: 0; z-index: 9999`, `background: var(--destructive …)` → computed `rgb(219,36,36)`, Fira Code 11 px. Measured live (:9124, light + dark): **1440×47 px, overlapping the dock** (dock rect y 8–79) — the shell's chrome is half-buried behind a permanent, undismissable strip on every dev boot.
- The first-paint hole it was born to patch: `ApiOfflineChip` mounts only inside `CurrentPaletteEditor` and only with ≥ 1 saved color (`CurrentPaletteEditor.vue:109`); live probe at first paint: `chipPresent: false`.
- Latch consumers today (the complete set): the banner (`App.vue:115`), the chip, and `PaletteCardMenu`'s publish-disable (`PaletteCardMenu.vue:214–217`). The chip's own two registers are already *correct and designed*: filled warning lamp = misconfigured, open ring = unavailable ("no signal" glyph, `ApiOfflineChip.vue:57–79`).
- The console signal (`availability.ts:163`, unconditional `console.error` naming origin, target, and fix) fired verbatim in the live probe.

**Root cause.** The state machine was designed at the right layer (transport latch — correct, elegant), but its *presentation* was bolted on as an App-level alarm: "guaranteed visible at first paint" was solved with `z-index: 9999` instead of with design. The shell already owns a status vocabulary (the dock: wax-seal, `@mbabb` provenance) and the product already owns a designed-empty vocabulary (the S.W5 Q6 true-empty specimen plates) — the banner used neither.

**Owner**: demo (presentation only — `availability.ts` is presentation-agnostic and stays byte-identical).

**Cure direction (gestalt — the banner's three jobs, re-homed; the banner and nothing else dies).**

1. **The standing signal → the dock.** The dock is the shell's one status organ. Its provenance cluster (`@mbabb`) gains a **status lamp** carrying the chip's existing dot grammar, promoted: filled warning lamp (misconfigured — dev-only), open ring (unavailable), absent (available/unknown). Hover/press reveals the full sentence + the `npm run dev` fix in the mono annotation voice. First paint is guaranteed (the dock always mounts), zero layout occupation, zero chrome overlap. The dev-only gate (`import.meta.env.DEV`) moves with the misconfigured register — the "zero bytes in prod" property survives, since the misconfig precondition is provably unreachable in prod.
2. **The felt failure → the surfaces.** Wherever palette data would render (My Palettes, Browse, the editor), the designed state renders *in the data's place*: the true-empty specimen-plate vocabulary gains a `misconfigured` variant ("no backend on this bench — run `npm run dev`", filled lamp) and an `unavailable` variant ("backend offline — working locally", open ring). The chip's editor-only mount generalizes into this per-surface state; the publish-disable in `PaletteCardMenu` already models the pattern.
3. **The developer signal → the console, unchanged.** The `console.error` remains the load-bearing dev signal (developers live in the console — the design already says so).

**Binding constraints (NO regressions).** The latch + synchronous `DevMisconfigError` stay; transport never silently retargets prod; the `misconfigured` ≠ `unavailable` distinction survives on every surface (never conflate — the two registers exist precisely because the fetch layer cannot distinguish CORS-refusal from network-down); the REJECTED localhost-in-prod-CORS ruling stays rejected. This is a presentation re-homing, not a contract change: W0-1 stands whole.

**Cross-lane**: T-23 (the dock's at-rest shading — same organ, coordinate the lamp with that lane's band), T-10 (owns `t-2004-32`), E-2 (the lamp is candidate dock vocabulary — if glass-ui grows a dock status primitive, consume it at the root).

---

## §4 Probe ledger

- Screenshots (transient, gitignored class): probe captures moved to the session scratchpad (`home-light.png`, `generate-light.png`, `banner-light.png`, `banner-dark.png`). All claims above are anchored to committed file:line cites, computed styles, and the on-disk owner shots.
- Servers :9123/:9124 were lane-local and torn down; the owner's :9000 was never touched.
- Console truth (:9124, no `VITE_API_URL`): exactly one error — the designed misconfig `console.error`. Console truth (:9123, dead `VITE_API_URL`): two `ERR_CONNECTION_REFUSED` then latch silence — the cooldown works as specified.
