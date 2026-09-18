# Arm A — Frontend/Design Program Compliance Audit (Codex V-next formation, frozen snapshot)

- **Lens:** L1 §4 demo/frontend block + owner marks E-C2/E-C3/E-C4 + program edicts E-C5/E-C10/E-C22 + method rows E-L1-S4.8/E-L1-S8.1 (design routing) + product-identity soundness.
- **Corpus read (frozen snapshot 2026-07-19 21:29):** DESIGN-PROGRAM.md, DESIGN-PROVENANCE.md, LIVE-VISUAL-AUDIT.md, DEMO-TARGET-DAGS.md, waves/G-D.md (G00–G09 + D00A–D25, 43 rows), waves/M-C.md (M00–M11 + C-band context), PROMPT-RECAP.md, DISPOSITIONS.md §Demo-and-design (13 rows), waves/K-A.md K12 row, coordination/HANDOFFS.md GL packet, reviews/X-ADJUDICATION.md (DesignSync row), PROVENANCE.md glass pin.
- **On-disk verification performed (read-only):** value.js demo residue census; keyframes-v-exec Cube input-lane anchors; value/kf font stacks; glass-ui BJ + IOS27-MICRO corpus existence and content. Every verified probe is cited inline. No repo file modified; no dev server, build, or install run.
- **Frontend wave surface judged:** G 10 + D 33 + M 13 = 56 waves, plus C04/C07/D25/M11 audit riders.
- **Severity:** P0 charter-breach · P1 material · P2 minor. Verdicts: CORRECT / PARTIAL / WRONG / MISSING.

---

## 1. The three owner marks

### FD-01 — Value mobile toolbar lost (E-C3) — **CORRECT** (severity: none)

The mark is carried with evidence-grounded root cause, not a checkbox.

- **Live witness:** LIVE-VISUAL-AUDIT.md §"Lost tools bar witness" — on Picker/Home the unique `Toggle action bar` button paints at ~48×40; activating it left `aria-pressed=false`; toolbar containers remained width `0`, opacity `0`, exposing no semantic action items. "The button is therefore an empty affordance on that route, not merely a small toolbar."
- **Root cause diagnosed, not asserted:** D03A born-RED (waves/G-D.md): "Generate/Gradient/Mix commands optional-chain refs populated only by desktop mounts; mobile Tools can be visible yet empty/no-op."
- **Remedy shape is architectural:** one mount-independent route capability registry; typed `RouteCapability` contract (DEMO-TARGET-DAGS.md §Value capability edge) with the law "Mobile and desktop consume identical IDs; a route with no action renders no Tools toggle." D03A gate: "Same descriptor IDs and effects desktop/mobile… all execute without component refs; zero-capability route has no toggle."
- **Ledger:** PROMPT-RECAP.md:144 "Restore lost value mobile toolbar through mount-independent capability descriptors | D00A, D03A" — exactly the claimed landing. Design-program closure row: "The mobile tools bar remains identifiable and does not replace all context with an unlabeled toggle" (DESIGN-PROGRAM.md §Value-specific closure).

### FD-02 — kf demo mobile overhaul + multi-touch quaternion + single-screen app (E-C4) — **CORRECT** (severity: none)

The strongest-carried mark; every clause of the owner's ask has an owning wave with falsifiable gates, and the born-RED premise is TRUE ON DISK.

- **Multi-touch quaternion:** K12 (waves/K-A.md:31) "Establish one PointerEvent and one Float64 quaternion kernel… centroid/pinch/twist rebase, shortest-arc quaternion… cancel/lost-capture/1→2→1/antipodal/coalescing traces pass; No TouchEvent, GestureEvent, Euler source-of-truth." M05 Cube rides it: one-pointer arcball; two-pointer centroid pan, logarithmic distance, twist; exact rebasing; keyboard parity.
- **Born-RED witness verified on disk:** the audit's claim "Cube binds Pointer Events, Touch Events and Safari Gesture Events in parallel at `demo/scenes/cube/orbital-drag/OrbitalDrag.vue:279`" is accurate — I read keyframes-v-exec at those lines: `pointerdown → pointer.onPointerDown` (~:280) AND `touchstart/touchmove/touchend → pinch.*` (~:283-285) bound in parallel; `useOrbitalPinch.ts` derives touch distance from `TouchEvent` independently; `useOrbitalPointer.ts` keeps a second `activeTouchPointers` set + a pinch-to-single-finger transition flag — exactly the claimed double-authority 1→2→1 machine. The design provenance here is genuine inspection.
- **"Every other animation":** M06 Amiga (OrbitControls DELETED, custom K12 camera, two-pointer target pan/pinch/twist), M07 Square (kills the current two-pointer refusal; 1×1 px slider-seat collapse witnessed), M08 Easing viewport pan/zoom, M09 Spring pan/pinch, M10 Sequence pan/pinch with edit-cancel arbitration — plus the 7-route Keyframes input matrix (DESIGN-PROGRAM.md) covering one-pointer/two-pointer/keyboard per route, including the honest refusal row for Home ("Refused: no stage transform exists").
- **Single-screen app:** M03 stage-first shell + the mobile composition grammar: "The mobile Keyframes shell is therefore a real single-screen application… an off-screen desktop sidebar is not accepted as a mobile layout." The Monaco 16.7-million-pixel hidden-editor witness is owned (M03 lazy unmount gate: "inactive authoring code is absent from DOM, heap and animation work").
- **Desktop affordances + inspiration:** M03 non-modal wider rail; M11 full desktop matrix; the Chronographic Stage identity takes glass interaction laws without cloning value ("Glass does not erase the distinct identities").
- **Ledger:** PROMPT-RECAP.md:150–155 map shell/scenes/K12+M05/multitouch/Monaco to exactly the claimed K12/M03–M10 set.

### FD-03 — Easing-curve-selector mobile redesign (E-C2) — **PARTIAL** (attribution) / substance CORRECT — **P2**

- **Substance is excellent and anti-gameable:** M08 (waves/M-C.md:27) replaces the pill wall with the Chronograph Contact Sheet: 2 columns/≥6 complete curves at 320×568, 3/≥9 at 390/844+430×932; painted radius ≤4 CSS px with a separate ≥44 px semantic seat; exact vector cubic-Bézier/steps/`linear()` glyphs; adaptive paths deviating ≤0.5 physical px at DPR 1/2/3; static catalogue, one user-triggered sweep only. The exclusion column pre-kills the token-tune dodge: "A DELTA that merely shrinks, flattens or retokens the existing pill grid also fails" (echoed at LIVE-VISUAL-AUDIT §Easing redesign decree: "retaining the same card geometry with smaller tokens is not an admissible close"). This answers the owner's "far too rounded, too large, low-res" verbatim.
- **The attribution defect:** the binding CONVERSATION-ADDENDA capture reads "C2 — easing curve selector on mobile **(value demo)**." PROMPT-RECAP.md:152 homes the owner mark ONLY at "M08, M11, C07" — the **keyframes** demo. The value demo's own easing-selection surface (Gradient route; born-RED witness: ~1,475 px specimen strip, ~20 px stops) IS redesigned — D16 "Responsive non-horizontal specimen grid; G09 Glyph/Picker… delete local sampler/literal/deep overrides," with G09 supplying density/fidelity gates — but the owner-mark ledger row does not credit D16/G09, so if the owner meant the value demo, the recap row mis-homes the mark.
- **Net:** both apps' easing selectors have dramatic-redesign waves with hard gates; only the request→wave bookkeeping diverges from our binding capture. Tests E-C2; severity P2.

---

## 2. Program edicts

### FD-04 — Total shadcn abrogation (E-C5) — **CORRECT** (severity: none)

- **The premise census is EXACT on disk** (verified read-only, value.js working tree): exactly **19** `demo/ui/<primitive>/index.ts` barrels (counted 19/19); direct `AcceptableValue` reka-ui imports in exactly the 4 named surfaces — `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue`, `demo/workbenches/mix/MixConfigBar.vue`, `demo/workbenches/generate/GenerateControls.vue`, `demo/scenes/atmosphere/AuroraPane.vue`; `tailwind-merge` at `demo/shared/utils.ts:2`; `tw-animate-css` at `demo/styles/foundation.css:2` + `package.json:108,110`. LIVE-VISUAL-AUDIT §"Current shadcn/vendor cut" states precisely this. The abrogation premise is "live and mechanically falsifiable" as claimed.
- **Waves:** G00 total tagged/working/packed boundary census with mutation-bite gates; D00 executes the cut with the anti-forwarding law ("A barrel that merely re-exports glass under a shadcn-era path still fails: no forwarding or compatibility path survives"); M00 the kf-side dependency/vendor cut; C00 proves packed no-network craters. DISPOSITIONS row: "Shadcn and direct vendor consumption | **Delete totally** | G00–G09, D00, M00, C00."
- **Gap primitives specced IN glass-ui** as the owner directed: G03 toolbar, G06 ColorSwatch (around paint-only WatercolorDot), G08 seat/event-region substrate, G09 EasingPicker/CurveGlyph — all glass-owned, with the concrete glass target tree (DEMO-TARGET-DAGS §Glass target slice: `components/easing/{Picker,Configurator,Glyph,model,path,usePicker}` etc.; "`Sheet`, source tests and forwarding barrels are absent").
- **Minor note (no penalty at formation phase):** the owner's "prototype/design one" clause is discharged as structural design (target trees + contracts), not rendered prototypes; prototyping is deferred into the G waves themselves.

### FD-05 — THE BREATH OF LIFE (E-C10) — **PARTIAL** — **P1 (the lens's principal defect)**

Split verdict: the design substance is real; the mandated corpus ingestion did not happen.

**(a) Substance — CORRECT, genuinely non-checkbox:**
- Motion-tier table with quantified budgets (DESIGN-PROGRAM §Breath of Life): engage 70–160 ms, scale ≤1.03/lift ≤2 px; birth 180–320 ms seeded from stable item identity; ambient cadence ≥4 s, scale ≤1.015, ≤3 participants; one-clock/one-procedural-frame-source laws; visibility parking; PRM/forced-colors laws; layout-property animation banned.
- G05 turns it into an executable manifest ("Named `engage`, `release`, `birth`, `relocate`, `ambient-breath`, `procedural` contracts"); the **slider-area watercolor ask lands verbatim** at D05: "Semantic value seats; **value-derived watercolor backplates**; exact contrast… named engage/release/birth usage ledger"; procedural beget lands at D15 ("restrained procedural birth", "hover never reseeds") and D24 (server-confirmed tag birth); per-screen padding/margin/curve refinement is distributed across every D06–D24 route wave and M03–M10, audited by D25/M11.
- The D19–D24 effect/N-A disposition ledger is machine-projected (`VNEXT-D19-D25-G05` comment block in waves/G-D.md) — D22's typed N/A for the read-only audit page, with required evidence of zero owned clocks, is genuinely thoughtful motion design.

**(b) Provenance — WRONG on the named clause:** the owner's first instruction — "**read glass-ui's BREATH OF LIFE corpus (tranches BJ + IOS27-MICRO)** and suffuse it into the value demo" — was not executed.
- DESIGN-PROVENANCE.md §Bound inputs lists: two owner attachments, the `frontend-design` plugin rubric, the in-app browser, current source. **The BJ/IOS27-MICRO corpus is absent from the bound-input list.**
- BJ appears only as a pin note (PROVENANCE.md:54: "Active BJ and IOS27 tranche/research/prototype work. Re-pin and overlap-audit before G00; preserve all 26 entries") and as three "Pull only when needed" rows in coordination/HANDOFFS.md:274–276 (`BJ/PLAN.md`, `BJ/waves/BAND-FEEDBACK-MOTION.md`, `BJ/ASK-REDUCTION.md`). **IOS27-MICRO is never named as an input or pull item anywhere in the snapshot.**
- Verified on disk: the corpus exists and is rich — `glass-ui/docs/tranches/BJ/` (PLAN, ASK, 9+ band waves, formation/, APOTHEOSIS.md) and `glass-ui/docs/tranches/IOS27-MICRO/` (CHARTER, SUFFUSION-MATRIX.md, suffusion drafts, prototypes/). BJ's BAND-FEEDBACK-MOTION cites a codified design authority, `IOS27-CODEX.md`, with numbered laws: Law 8 (per-channel desync with fixed lead order; exits fade-led, faster, never mirroring entries), Law 18 (overlays GROW from a blurred seed — nothing slides in from an edge), Law 12 (fill-pill + dots; spring the width, crossfade the dots), Laws 1/3/4 (material/rim/radius grammar).
- **Consequence:** the formation's independently-authored motion grammar (G04 directional-surface transitions, G05 effect budgets) never references these laws and is grammatically divergent — e.g., G04 specifies directional travel with inert-before-travel but nothing about per-channel desync, fade-led asymmetric exits, or blurred-seed overlay growth. Executed as written, G04/G05 could land motion on glass components that contradicts glass-ui's own active, owner-ratified motion canon. The owner's admired hover/beget watercolor behaviors were never looked up; the formation invented its own "hover never reseeds" bound instead of ingesting how the corpus does it.
- **Mitigation (why P1, not P0):** the gap is routed, not silently dropped — the pre-G00 "re-pin and overlap-audit" note plus the pull-on-demand rows exist; and the restraint posture is defensible under the owner's own "the extant value demo UI is quite good — this is REFINING details." But the overlap-audit is framed as fingerprint preservation, not design-law ingestion, and DESIGN-PROVENANCE banks the DesignSync gap while never banking the BJ/IOS27 ingestion gap. Tests E-C10.

### FD-06 — Frontend audit totality (E-C22) — **CORRECT** (severity: none)

- **Every page of every app, mobile AND desktop:** LIVE-VISUAL-AUDIT covers all 14 value routes and Home+6 kf routes at both 390×844 and 1440×900, each with visible-interactive counts, <44 px paint counts, and a route-specific principal witness (e.g., Palettes search ~21 px; Gradient strip ~1,475 px; kf Spring controls pane ~799 px tall with ~1,294 px content; Sequence reel play ~28×40).
- **Brainstormed add/refine/remove affordances:** the two audit registers (DESIGN-PROGRAM §Value.js/§Keyframes.js audit register) carry per-route current-evidence + required-refinement columns — additions (Browse voting/flagging/pagination; Extract camera/cancel; Users session revocation), removals (Admin "irrelevant palette context… no unrelated pane"; Atmosphere long-form presentation transposed), refinements (per-route target/hierarchy/material rows).
- **Honest scope labeling:** the live pass is declared formation evidence, not closure ("does not authorize execution or claim closure across the full compact/tablet/zoom/theme/PRM/forced-color/device matrix"); the balance is wave-time obligation via the shared π contract (320/768/1440/200–400% zoom/themes/PRM/browsers) and the D25/M11 audit-only reopen law. C07's phone leg is "truthfully born RED rather than simulated green" — the exact opposite of a close-class lie.

---

## 3. Method rows

### FD-07 — Design routing / DesignSync (E-L1-S8.1) — **PARTIAL** — **P1 (heavily mitigated)**

- DesignSync was NOT used; the charter requires "ALL design routes through Fable + DesignSync."
- The handling is honest and adversarially sealed: DESIGN-PROVENANCE — "No unavailable DesignSync/Figma artifact is represented as consulted… DesignSync is a banked method gap, not an audit waiver," with named preimplementation retrigger owners G00/D00A/M00 and the rule that no wave may claim DesignSync consultation. X-ADJUDICATION amendment 14 independently confirms: "DesignSync was unavailable and no substitute is equivalent. Bank the method gap at formation root; retrigger G00/D00A/M00."
- **The substitute provenance tested TRUE, not merely asserted:** every spot-checked claim held on disk — the Cube parallel-lane anchors (OrbitalDrag.vue:279 region; useOrbitalPinch/useOrbitalPointer state machines), the exact 19-barrel/4-reka-file/2-vendor-dep residue census, and the type registers (Fraunces + Plus Jakarta Sans + Fira Code present in the value demo; Instrument Serif present in the kf demo at `demo/app/index.html`, `SequenceTarget.css`). DESIGN-PROVENANCE is corroborated by measurable, falsifiable artifacts.
- Note (outside this lens's adjudication): design seats ran GPT-5.6 Sol per the fleet's own owner docket (OA-01 Fable→Sol substitution) — recorded as edict-matrix Finding F1; the union program treats Fable-side design formation as our arm's job. Tests E-L1-S8.1.

### FD-08 — Product identities — **CORRECT: sound, not invented ceremony** (severity: none)

"Optical Instrumentarium" and "Chronographic Stage" are ceremonial names carrying real, falsifiable content:
- **Material registers resolved from actual source tokens** (named hex reference swatches with source authorities: `--background`/`--card`/`--accent-kf`…), with the honest caveat "the tokens remain the authority."
- **Three-voice type registers that match the real trees** (verified on disk, both demos), with enforcement teeth: "No wave may introduce a fourth identity face or use the display face as ordinary body copy"; "Synthesized display weights and ornamental serif control labels are inadmissible."
- **Composition grammars** per app × platform (four diagrams) with an invariance law ("may not invert the stage/output priority").
- **Signature gestures** (living numeric mark / chronographic trace) and a named **anti-template test**: "Warm cream, serif display type, glass and rounded panels alone would produce a generic premium-template aesthetic" — the preservation calibration exists precisely so a later wave "cannot replace observed identity with a generic cream/serif/glass template while claiming visual improvement" (DESIGN-PROVENANCE). This is the strongest identity-preservation device in the corpus and directly serves the owner's refine-don't-replace edict.

### FD-09 — Aristotelian proportionality + recursive colocation (E-L1-S4.8) — **CORRECT in substance** (severity: none)

- Proportionality (the word is absent; the substance is present): "Its work is proportional correction, semantic repair, state clarity, responsive completion" (DESIGN-PROGRAM §Mandate); superfluous→removal and under-afforded→converse markings throughout the registers (Blob "~thirty controls overwhelm the stage" → stage-first progressive disclosure; Admin dead areas; Atmosphere presentation-only transpose vs D17A's all-18-leaf KEEP — proportionality WITHOUT capability loss).
- Recursive colocation: DEMO-TARGET-DAGS feature-first trees (per-feature `state.ts/route.ts/api.ts/capability.ts`, scene subtrees with stage/panel/renderer children); grouped filenames strip module names; tests external-isomorphic per the E-C11 addendum (which supersedes colocation for tests) — both encoded as D00/M10T gates.
- Glass defect batching per §4: the G-band is one batched producer pack with exact per-defect wave addenda and a dedicated HANDOFFS GL packet — not piecemeal interruption of the active glass agent.
- D17A/D18A total-field dispositions (18 AuroraAtoms leaves; 49 BlobConfig leaves, 47 shareable) are the strongest anti-"simplification-by-deletion" device in the demo band: "progressive disclosure follows total field disposition rather than visual simplification by deletion" (DESIGN-PROVENANCE).

### FD-10 — W53 perceived-space-plate connection — **MISSING** — **P2**

- The charter's demo block names it: "The W53 perceived-space plate rebuild is the named connection for any gamut-viz restore" (L1 §4); E-P2.2-R-BOUNDARY gates boundary samplers on W53's needs; E-P5.7 carries W53/W55/W56 as inherited vehicles.
- Grep across the frozen snapshot's entire .md corpus: **zero hits** for `W53`, `W55`, `W56`, or `perceived-space`. No gamut-viz demo wave exists in the D band; the inherited V′ vehicle namespace is wholly absent.
- Internally consistent (nothing pulls R-BOUNDARY, so nothing is built — V15P holds the cusp/Halley decision separately), but under the §7 zero-silent-drop law the named connection deserved a terminal disposition row (folded/banked/retired), not silence. From this lens it is a P2 silent drop of a named charter connection; the broader vehicle-inheritance question belongs to the structure/color arms. Tests E-L1-S4.8 / E-P2.2-R-BOUNDARY / E-P5.7.

---

## 4. Design-quality gestalt (E-C21 posture)

**Verdict: the frontend/design program carries real breath, not checkbox rows.** Evidence classes:

1. **Falsifiable numeric gates everywhere:** M08 density minima + radius ≤4 px + glyph deviation ≤0.5 physical px at DPR 1/2/3; G05 amplitude/duration/cadence budgets; G08 ≥44×44 seat floor with paint/event separation and `elementFromPoint` probes; M02 URL byte/depth/node budgets; C07 frame p95/p99 + input-to-paint + retained-growth + thermal budgets.
2. **Anti-gaming exclusions written into the waves:** "A DELTA that merely shrinks, flattens or retokens the existing pill grid also fails" (M08); "no CSS patch, threshold relaxation, route repair" (D25); "no raster thumbnail, clamp, sample-only extrema claim, per-glyph clock, silent coarse fallback" (G09); "A screenshot is evidence, not an oracle" (π/DELTA contract).
3. **Honest RED:** C07 phone leg born-RED with no phone connected; D25/M11 audit-only with owner-reopen + clean-pass reset; the design convergence ledger's pass 10 REOPENED itself on fresh G/D evidence rather than claiming clean.
4. **Structural repair over cosmetics:** the three owner marks each got architecture (capability registry; one-authority pointer kernel; selector architecture replacement), not token tuning.

Residual quality notes (no severity): the formation's restraint posture ("hover never reseeds"; catalogue glyphs static) narrows the owner's evident enthusiasm for hover-alive watercolor into bounded laws — defensible under the owner's "refining details" clause, but it was decided without reading the corpus that motivated the ask (folded into FD-05). G07 appears after G09 in waves/G-D.md file order (cosmetic only; dependency graph is explicit).

---

## 5. Verdict table

| # | Finding | Edict row(s) | Verdict | Severity |
|---|---|---|---|---|
| FD-01 | Mobile toolbar mark carried with verified empty-toggle witness + mount-independent capability registry (D00A/D03A) | E-C3 | CORRECT | — |
| FD-02 | kf mobile overhaul: K12 one-authority quaternion kernel (born-RED premise verified on disk), M03 single-screen shell, M04–M10 per-scene multi-touch, honest refusal rows | E-C4 | CORRECT | — |
| FD-03 | Easing-selector redesign: M08 contact-sheet decree is design-substantive; owner-mark ledger homes it at kf (M08/M11/C07) while our binding capture says value demo; value side covered by D16+G09 but uncredited in the recap row | E-C2 | PARTIAL (attribution) / CORRECT (substance) | P2 |
| FD-04 | Total shadcn abrogation: residue census exact on disk (19 barrels, 4 reka files, 2 vendor deps); D00/M00/C00 gates anti-forwarding; gap primitives specced as glass-owned waves | E-C5 | CORRECT | — |
| FD-05 | Breath of Life: substance real (quantified tiers, G05 manifest, D05 watercolor backplates, D19–D24 machine ledger) but the mandated BJ+IOS27-MICRO corpus was never a bound design input; IOS27-MICRO never named; formation-invented motion grammar diverges from the corpus's IOS27-CODEX laws | E-C10 | PARTIAL | **P1** |
| FD-06 | Frontend audit totality: all 14+7 routes × mobile+desktop live-measured with per-route witnesses; add/refine/remove brainstorms in both registers; honest formation-evidence labeling | E-C22 | CORRECT | — |
| FD-07 | Design routing: DesignSync unused (charter says all design routes through it) but honestly banked with named G00/D00A/M00 retriggers; substitute browser/plugin provenance spot-checked TRUE on disk | E-L1-S8.1 | PARTIAL | P1 (mitigated) |
| FD-08 | Product identities grounded in verified source tokens/fonts, composition grammars, signature gestures, anti-template test — sound, load-bearing, not empty ceremony | E-L1-S4.8 | CORRECT | — |
| FD-09 | Proportionality-in-substance + recursive colocation + batched glass defect release + total-field dispositions (18/49 leaves) against simplification-by-deletion | E-L1-S4.8, E-C11 | CORRECT | — |
| FD-10 | W53 perceived-space-plate connection: zero snapshot hits; no gamut-viz demo wave; named charter connection silently dropped without a disposition row | E-L1-S4.8, E-P2.2-R-BOUNDARY, E-P5.7 | MISSING | P2 |

**Aggregate for the apotheosis:** the Codex formation's frontend/design program is, on this lens, the strongest band of its corpus — the three owner marks are carried with verified evidence and architectural remedies, the abrogation premise is mechanically exact, the identities are grounded, and the gates are hostile to their own gaming. Its two real debts are provenance debts, not substance debts: the Breath program was reinvented rather than suffused from the owner-named BJ/IOS27-MICRO corpus (risking collision with glass-ui's live motion canon), and the value-vs-kf homing of the easing-selector mark diverges from our binding owner capture. The union formation should (1) ingest IOS27-CODEX + SUFFUSION-MATRIX and reconcile G04/G05/M08 against its numbered laws before any motion wave executes, (2) dual-home the C2 mark (M08 + D16/G09) explicitly, and (3) give W53 a terminal disposition row.
