# Tranche V — Prompt Recap

## 1. Method

The cumulative sources are K `audit/request-coverage.md`, N `audit/prompt-coverage.md`, T `MANDATE-2026-07-06.md`, U's disposition/final ledgers, the original V request, and the complete user-message records in these three recent Claude Code sessions:

- `~/.claude/projects/-Users-mkbabb-Programming-value-js/daa7c418-d0bc-4d88-913c-27283e6345eb.jsonl`
- `~/.claude/projects/-Users-mkbabb-Programming-glass-ui/1cec2ef4-8e9b-486a-a1f7-877fa77a0ade.jsonl`
- `~/.claude/projects/-Users/mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe.jsonl`
- `~/.claude/history.jsonl` (index/cross-check only; it does not add unrelated-project prompts)

The extraction boundary is the full named sessions: value.js `2026-06-03T18:30:14.779Z…2026-07-14T00:43:35.188Z`, glass-ui `2026-06-19T06:39:19.371Z…2026-07-14T18:02:43.556Z`, and the substantive Glass session `e79fce3f…` `2026-07-16T04:33:39.961Z…2026-07-16T16:08:26.385Z`, reviewed on 2026-07-16. Select JSONL records with `type == "user"` and `message.role == "user"`; retain only string content and text blocks, keyed by `(project path, session id, timestamp, uuid)`. History rows are filtered to the three project/session keys and used only to confirm coverage.

Before comparison, text is Unicode-NFC normalized, CRLF-normalized, outer whitespace collapsed and pasted-content display wrappers resolved. Exact normalized duplicates are collapsed by digest while preserving all source keys. Near duplicates collapse only when actor, object, requested outcome and defect mechanism are the same; a changed scope, fence, acceptance condition or reversal remains a distinct clause. Workflow starts, “begin tranche development,” guardian/watchdog/heartbeat messages, compact/model/usage commands, empty turns, status prompts, task notifications, queue operations, tool envelopes, generated summaries and stop-hook repetitions are excluded. This is why orchestration prose does not masquerade as product intent, while differently worded substantive asks sharing one mechanism map to one family. Every historical ledger ID remains visible below.

`DISPOSITION-LEDGER.md` separately maps all U-F1…F77 rows.

## 2. K cumulative requests A→J

| ID | Normalized ask | V disposition |
|---|---|---|
| K-1 | Unbreak boot/font/dropdown/dock/animation regression | Historical fixes retained; W19/W28–W32 revalidate product and gestalt |
| K-2 | Styling resilience; remove brittle/monolithic/deprecated CSS | W6, W18–W19 |
| K-3 | Token/type/radius/shadow/overlay design audit | W18, W32 |
| K-4 | Complete button states | W17/W21/W30 |
| K-5 | Modal/dropdown/popup/hover hierarchy | W17/W23/W24/W30 |
| K-6 | Consistent duplicated components | W17 retires synonyms |
| K-7 | Golden hierarchy; no spreadsheet lists | W18/W22 |
| K-8 | Colocation and idiomatic styling | W5–W6 |
| K-9 | Root-level component restyling including glass-ui | BI W3/W17; value W18–W29 |
| K-10 | glass-ui for all styling/components | W17–W32; no local producer forks |
| K-11 | Flatten complex components | W6/W8–W9 plus feature waves |
| K-12 | value.js **and** glass-ui gaps | W2–W3/W7–W9/W17 |
| K-13 | Playwright flows plus idiomatic Blob/Aurora abstraction | **SUPERSEDED by the later Browser-first edict:** W16/W28–W32 use standalone/headless Playwright only for named binary automation, exhaustive repetition or synthetic timing the in-app Browser cannot express; it never authors visual gestalt |
| K-14 | Dock sizing/layout overfit | W19 |
| K-15 | E2E hangs/overgrowth | W4 retains proportionate real journeys; W16 |
| K-16 | Simplify layout without losing quality | W18–W19 |
| K-17 | Contract-v2/self-resolution correctness | W7/W17 packed cut |
| K-18 | Surgical API boundaries/DI/pipeline/no gods | W10 retains vertical vocabulary, narrows composition |
| K-19 | Fail explicitly; no masking fallback/legacy | W9/W11–W16 |
| K-20 | Frontend encapsulation/composables/colocation | W5–W6 |
| K-21 | Localized design idiom; no nested imports/dynamic excess | W6/W18 |
| K-22 | Full user/admin browser flows | W16/W23/W24/W30 |
| K-23 | Aurora derived from actual color | W28/W31 + BI P046 |
| K-24 | Extirpate bespoke Blob and perfect producer facility | W17/W29 + BI P047 |
| K-25 | No gods/workarounds/fallbacks; KISS | standing law, concretely W4–W17 |
| K-26 | Architectural transposition for elegance/simplicity/performance | W5–W10/W31 |
| K-27 | No legacy/deprecated compatibility | all clean-break waves; W33 audit |
| K-28 | Deep multiagent audit/recap/planning-only | formation + W0; no product source in formation |
| K-29 | Analyze sibling constellation | W3/W17/W33 |
| K-30 | Relay carry-forward items for ratification | terminal decisions here; BI inbox W3 |
| K-31 | No deferrals | `DISPOSITION-LEDGER.md`; no undecided row |
| K-32 | CRUD contract across repos | W1/W10–W16/W22–W24/W30 |
| K-33 | Keyframes remix/atom/consumer work | W7–W9/W17/W33 |
| K-M | 2026-06-02 aggregate glass/Blob/Aurora/cycles/panes/router/modern web/Playwright/no legacy mandate | clause-grained immediately below; no omnibus `W3–W33` disposition |

### K-M clause ledger

| Clause | Exact ask | Terminal V disposition |
|---|---|---|
| K-M.1 | glass-ui usage and gaps | **BUILD W3/W17** immediate post-BI `G_NEXT` reconciliation and direct packed adoption, with `G_NEXT` derived from the packed public diff against immutable Glass 6.0.0; no consumer fork |
| K-M.2 | move and perfect goo/Blob at its producer | **FOLD retained P047 into the post-BI producer cut + BUILD W17/W29**; glass owns the primitive and value owns only adoption/composition |
| K-M.3 | derive Aurora from actual color | **FOLD retained P046 into the post-BI producer cut + BUILD W28/W31**; one seven-atom derivation, CSS-first boot and measured renderer lifecycle |
| K-M.4 | delete duplicated OKLab/math and dependency cycles | **BUILD W2/W8/W17** final-object topology and staged acyclic constellation cut |
| K-M.5 | coherent pane system | **RETIRE the historical `VIEW_MAP` repair as landed; BUILD W5/W6/W18/W19** physical feature ownership and eighteen separately evidenced compositions (eleven members, five Admin, Account, storage recovery), with shell routing and no generic Card page chassis |
| K-M.6 | Vue Router 5 | **RETIRE the exact upgrade as landed** (`^5.1.0` is current); **FOLD W19** route/focus/history behavior into the settled shell |
| K-M.7 | use modern-web facilities | **FOLD W18–W21/W30** container/logical/inert/popover/view-transition facilities where they simplify a named product mechanism; **RETIRE** indiscriminate novelty adoption |
| K-M.8 | validate with Playwright | **SUPERSEDED by the later Browser-first edict:** **BUILD W16/W30/W32** live-routed Browser inspection first; standalone/headless Playwright only for named binary automation, exhaustive repetition or synthetic timing the Browser cannot express, never gestalt authority |
| K-M.9 | fold all deferrals | **FOLD `DISPOSITION-LEDGER.md`**; every exact row terminates BUILD/FOLD/RETIRE/BANK |
| K-M.10 | recap all prompts | **FOLD this document** using the reproducible method above |
| K-M.11 | no legacy, workaround or masked fallback; preserve gestalt | **BUILD W4–W17/W33** clean cuts and **BUILD W18–W32** product gestalt |
| K-M.12 | tranche development only | **RETIRE at formation close**; V authors planning/coordination documents only and makes no product-source change |

## 3. N cumulative mandates

| ID | Normalized mandate | V disposition |
|---|---|---|
| N-1 | Library modernization | W7–W9 |
| N-2 | Aurora derive from color, oldest chronic | W28/W31 + BI P046 |
| N-3 | Blob facility extirpation + watercolor | W17/W25/W29 |
| N-4 | Dock admin/golden/glass styling | W19/W24 |
| N-5 | Slim truthful smoke architecture | W4/W16 |
| N-6 | Contract-v2 mechanism-C/self-alias abrogation | W7/W17 |
| N-7 | Cross-repo cohesion | W3/W17/W33 |
| N-8 | API excision from older constellation | Historical close retained; W10 verifies no aggregate revival |
| N-9 | Post-L/M plan-only residue | Superseded by V authority; no implementation claim carried |
| N-10 | Keyframes F nine asks | Retained; packed migration W17/W33 |
| N-11 | Next twelve value-library asks | W7–W9/W17, exact live consumers only |
| N-12 | 32-agent audit/fold deferrals/recap/planning-only | formation/W0/ledgers |
| N-13 | Frontend-design audit of every pane; glass/grid/math/type/color/motion in proportion | W18–W32 |
| N-14 | Blob expressivity/satellites/placement and producer split | W29 + BI P047 |
| N-15 | Audit value/fourier API/deploy/CRUD for scale/KISS | W1/W10–W16/W33 |
| N-16 | Core model owns design/synthesis | root adjudication; independent fanout recorded in research |
| N-17 | Re-deploy workflows after wipe | Historical orchestration fact; excluded from product scope |

## 4. T-1…T-61 visual/product mandate

| ID | Concise ask | Owning V wave(s) |
|---|---|---|
| T-1 | synchronized background/blob/titles arrival | W19, W28–W29 |
| T-2 | proportionate non-bold Lab/About titles | W18, W20 |
| T-3 | About plate less transparent/cartoon-correct | W18 |
| T-4 | dynamic bottom text | W18/W20: the channel-strip bottom annotation binds to the named selected color, replaces static range copy, records an exact before→after content transcript, and remains ordinary `aria-live="off"` text while the slider owns identical `aria-valuetext` |
| T-5 | contrasted sliders, ringed letter rail, glass hierarchy | W20–W21 |
| T-6 | more legible gradient netting | W27 |
| T-7 | larger contiguous readout values | W20 |
| T-8 | Blob hover/satellites/containment/card seat/all sizes | W29 |
| T-9 | remove banner; truthful backend/dev UX | W16 |
| T-10 | only “Palettes” carries rainbow/pastel color | W18 shared composition + W19 exact Dock witness + W22 exact `My Palettes` Library witness, both schemes; non-`Palettes` identity applications = 0 |
| T-11 | another over-transparent card | W18 |
| T-12 | search styled consistently | W22 |
| T-13 | missing shadow palette/transparent surface | W22/W26; filler arm retired |
| T-14 | all card transitions on liquid-glass curves | W19 |
| T-15 | wrong font | W18 |
| T-16 | strange corner element | W0 identifies; W18 removes or homes it |
| T-17 | dropdown color previews, deftly proportioned | W20 |
| T-18 | inconsistent glass-card shading | W18 |
| T-19 | palette specimen where semantically always required | W22/W26 |
| T-20 | glass-ui Tabs proper fill/pilling | W17/W23/W24/W30 for surviving owner/Admin tabs; the consumer-less global mobile pane selector is RETIRE W19 |
| T-21 | broken gradient surface/short bar | W27 |
| T-22 | easing area still a mess | W27 |
| T-23 | header shaded at rest | W19 |
| T-24 | neutral consistency audit | W18/W32 |
| T-25 | boot/Aurora arrival and living behavior | W28/W31 |
| T-26 | Aurora variance inside calibrated bracket | W28 |
| T-27 | gray/slow/jittery boot and color motion | W19/W28/W29/W31 |
| T-28 | WatercolorDot active outline fit or abrogate | W17/W21/W25/W27; abrogate on face, geometric seats own channel/Generate/Gradient state |
| T-29 | clipped pseudo-dropdown | W17/W19/W30 |
| T-30 | crisp center-ward integrated Blob | W29 |
| T-31 | dock atop as structural band | W19 |
| T-32 | configurable additional Aurora zones | W28 |
| T-33 | readout↔rail gap and pathological/max values | W20 |
| T-34 | airier slider console with glass-ui veil | W21 |
| T-35 | all contrast-friendly text sites | W18/W22/W30 |
| T-36 | Tools trigger true-button box | W19 |
| T-37 | collapsed dock swatch visibility | W19 |
| T-38 | noteworthy Aurora pointer response, producer relay | BI P046; W28 consume |
| T-39 | unacceptable load performance | W31 |
| T-40 | dropdown options not bold | W18/W20 |
| T-41 | reject shadow palettes as filler; restore true empty | W22/W26 |
| T-42 | shrunken header footprint/text wrong | W19 |
| T-43 | pastel-rainbow Palettes identity | W18 shared composition, W19 Dock, W22 Library; exactly two textual coordinates and no neutral-label leakage |
| T-44 | Extract sliders unreadable; redesign palette result | W21/W26 |
| T-45 | card border clipping artifacts | BI P017; W17/W18 consume |
| T-46 | unusable rounded gradient instrument | W27 |
| T-47 | first-principles compact keyframes-like easing editor | W27 |
| T-48 | frame-by-frame liquid scene motion | W19/W32 |
| T-49 | Blob gray arrival, size, meatball satellites | W29 |
| T-50 | slider console must read as glass-ui veil | W21 |
| T-51 | picker header gap/title step/one mobile-desktop regime | W20 |
| T-52 | dock inline-edge clipping and producer root | BI P038; W17/W19 |
| T-53 | persistent top-border edge artifact | BI P017; W17/W18 |
| T-54 | Generate swatches are WatercolorDots | W25 |
| T-55 | Generate action cluster one glass-ui Dock set | W25 |
| T-56 | pleasing pastel Palettes at both sites/schemes | W18 shared law + W19 Dock + W22 `My Palettes`; light/dark pairs at both sites and outside count 0 |
| T-57 | dock expansion must not shift UI | W19 |
| T-58 | scene transitions still awful after prior close | W19/W32 |
| T-59 | perfected union of desktop/mobile slider rhythm | W18/W21/W30 |
| T-60 | eliminate hardwired gray reveal-bloom stage | BI P046; W28/W29/W31 |
| T-61 | shrink header padding/background with title | BI P109; W19 |

## 5. Recent Claude Code substantive families

| Family | What was repeatedly exhorted | V disposition |
|---|---|---|
| RC-1 physical ownership | Recursive colocation, flatten aliases, break long directories by responsibility, apply across demo/backend/library/parsing | W5–W10 |
| RC-2 reduction | Reduce logic/concepts/branches, do not merely move code or worship line caps | W2/W6/W8–W9 |
| RC-3 subtraction | Delete most plugins/scripts/gates/benches/screenshots/worktrees/docs | W4 plus replacement deletions W6/W17/W31 |
| RC-4 no legacy | Clean breaks, no aliases/shims/dual paths/masked fallbacks | all hardening; W33 audit |
| RC-5 glass suffusion | iOS/liquid motion, one component vocabulary, KISS/DRY, glass-ui producer ownership | W17–W32 |
| RC-6 palette truth | Backend and all CRUD facilities actually work, including concurrency/state | W1/W10–W16/W22–W24/W30 |
| RC-7 chroma-honest boot | no gray stage; more zones/pointer response; coherent Blob/Aurora arrival | W28/W29/W31 + BI |
| RC-8 UI refinement | WatercolorDots, one action instrument, proportional type/spacing, true empty/loading, usable Gradient/Easing, smooth scenes, responsive parity | W18–W32 |
| RC-9 CLAUDE deletion | “Do not leave CLAUDE.md” was scoped to glass-ui | value dirty deletions BANKED pending independent attribution |

### Recent value.js clauses: credited without re-booking

These clauses are explicit because the full-session claim must remain falsifiable. They share mechanisms with rows above, but their historical completion or current re-judgment is not silently collapsed into a generic UI family.

| Clause / source | Substantive ask | Terminal V disposition |
|---|---|---|
| RC-V1 · value session `daa7…`, owner ruling later indexed at T recap §2 | “hero lab is to be deleted” | Exact Hero Lab route/tree/mode/script deletion **RETIRE as landed credit** (`9ed9175`); it is not rebuilt. The separate “no NCSU alias” clause remains **BANK U-F41** with the named NCSU-VPN re-trigger. |
| RC-V2 · same session / T recap §3 Q9 | “Jzazbz is to be implemented” | Exact Jzazbz space **RETIRE as landed at 3.1.0**; **FOLD W8** only to preserve it in the final immutable color object/entry cut. No second implementation row. |
| RC-V3 · same session / T recap §4.1 | card approximately one-third smaller | Exact `44→32rem` correction **RETIRE as landed** (`52c5fd4`). W18's composition/card-economy audit re-judges outer housing by job and may transpose it; it does not miscredit the old width ask as still open. |
| RC-V4 · same session / T recap §4.5 | subtle, idiomatic alpha checkerboard | Exact shared checker token **RETIRE as landed** (`695cca1`); **FOLD W21/W27** preservation wherever alpha/transparency is editable or previewed. |
| RC-V5 · same session / T recap §4.2–4.4/4.6 | Aurora arrival, bounded variance, pointer/living response | Landed portions retain credit; current re-judgment is exactly **T-1/T-25/T-26/T-38 → BI P046 + W28/W31**, including the calibrated bracket and producer pointer seam. |
| RC-V6 · same session / T recap §3 Q7 | Blob full-mobile containment, morphology and producer facility | Historical partial retains credit; current widened result is exactly **T-8/T-30/T-49 → BI P047 + W17/W20/W29**, with separate Picker-seat and Blob-workbench laws. |

### Recent glass-ui clauses: foreign ownership without duplication

| Clause | Substantive glass-ui ask | Disposition |
|---|---|---|
| RC-G1 | demo/story language must describe the product, not tranches, gates or internal codenames; examples remain real code | **BUILD post-BI `G_NEXT` P059/P060 amendment** for rendered no-meta/product-language acceptance, including V-A8's Search statuses, then **FOLD W17/W33** consumption and typed value snippets; P061's scenario runner remains declined |
| RC-G2 | specimen/chassis/story composition and page-level proportion need a coherent shared grammar | **FOLD completed BI P055/P059 and BUILD the post-BI P122 V delta**; W17 adopts landmark-neutral `InstrumentChassis`, and W18 separately evidences all eleven members plus five Admin, Account and storage recovery compositions in `OPTICAL-BENCH-COMPOSITIONS.md` |
| RC-G3 | dock morph, hairline scroll progress, collapsed geometry and buttery motion need first-principles refinement | **FOLD completed BI P030/P033–P042**; W17/W19 consume the terminal seams and add no producer CSS |
| RC-G4 | carousel/pager must be rebuilt as a usable product mechanism | **FOLD completed BI P118/P119; RETIRE from V** because value has no carousel consumer |
| RC-G5 | prune duplicate/broken substrates and aggressively simplify the glass-ui tree | **FOLD completed BI P005–P014/P126–P129; RETIRE from V**; the session's explicit approval-before-delete and remain-in-repo fence stays glass-owned |
| RC-G6 | verify liquid-glass behavior in Chrome and real Safari, including reference-image/motion fidelity | **FOLD completed BI P017/P022/P045/P053 behavior** plus native review at each live product owner; W17 consumes producer evidence and W32 independently verifies value's rendered result without reviving P061's runner |
| RC-G7 | improve demo code examples, narrative, dark readability, visual hierarchy and component discoverability | **FOLD completed BI P016/P055–P060 and BUILD the post-BI P019 V delta; RETIRE from V** except direct W17 component adoption |
| RC-G8 | glass-ui CLAUDE removal and repo-level meta/temp/docs cleanup | exact glass-ui CLAUDE deletion **RETIRE as met at `8b0f9acc`**; remaining cleanup **FOLD completed BI P005–P014/P126–P129**; neither grants authority over value.js dirty files |

The 2026-07-16 Glass session is substantive source, not an orchestration wrapper: its proportional-card/spacing challenge, request to delete contrived gates, evidence-derived semver/publication ordering, and renewed adversarial re-audit are deduplicated into RC-5/RC-6/RC-8 and V-A160. Meta-command/task-wrapper/status/capacity noise remains excluded and mints no separate ask.

## 6. Current V prompts and edicts

| Ask | Disposition |
|---|---|
| Audit original plan, landed changes, deferrals, modularization, UI, palette API with 32 roles | formation audit + W0–W3; product owners W4–W33 |
| Minimum 20+ waves and fully formed next tranche | 34 wave specs in four meta-tranches |
| Decide every chronic/partial; no re-booking | `DISPOSITION-LEDGER.md` |
| Use active glass-ui BI and scribe all needed changes directly into V plus executor prose in its inbox | BI completed at immutable v6 before ingestion; V/W3 bind the exact producer asks, and the Glass inbox carries the post-BI amendments. On 2026-07-15 V sent the complete de-duplicated contract directly to active task `019f6610-6022-7df1-95b3-472b17a64656`, credited live P019/P051/P092/P122 source/tests and P047 mass/origin seams, and routed V-A5–V-A8. The executor deleted P122's surviving universal minimum and added its ordinary absence contract, so V-A5 is source/test LANDED. Value4 and Keyframes6 are now immutable; all prior Glass7 rehearsal bytes remain held, and the current ordinary Glass batch is LANDED/pre-release pending fresh artifact, strict/native close and routed evidence. Fresh audits then sent V-A9–V-A12 and V-A63/V-A64: Glass consumes `/color`+`/css`+`/easing`; `/css` has the CSS-native Color Result plus named-range selector offset/parser; all seventeen Color objects remain but library-only colors explicitly convert; nine named easing functions plus failure-explicit `easing(name)` replace `timingFunctions`; description copy moves to its UI owners; silent substitutions, contrast proxies and degree/turn mismatch die. The later P047 propagation correction is V-A68: W17 validates/freezes producer baseline `b0`, while W29 alone owns final painted `0.66 ±0.015`, centroid/hull and 0px geometry. V-A72's W20 consumer deletion is now LANDED/IMPLEMENTED with 3/3 focused tests and targeted lint: Blob Tooltip/press/listeners/duplicate Copy are absent and ActionToolbar retains the sole Copy; V-A80's sole `.325` calibration is likewise implemented and raw-buffer measured, while native routed evidence remains pending. W17 owns remaining adoption/native close, while W33 owns the fresh Glass sole candidate, exact publish, registry-byte/integrity equality and final lock. Native witnesses remain honestly pending; no Playwright substitution, new tranche or process framework is permitted. |
| Suffuse glass-ui principles and Aristotelian proportion across every route and small UI element | `OPTICAL-BENCH-COMPOSITIONS.md`, `PROPORTION-AUDIT.md`, W0/W18–W32 |
| Tighten the supplied Lab label→numbers void; make the selected space one golden rung below the numeric headline; enlarge Blob without growing its card | PR-01…03, constitution §3.2, W0/W18/W20/W29/W32: P019 exact `1/√φ`, P122 line-box gap `G`, rendered `I_after ≤ min(φG, I_before − G)` within `±0.5 CSS px` at 1440/390/320/actual-400%-zoom plus all clamp arms, W18-settled/W20-locked chassis, rendered alpha body `0.66 ±0.015`, and 0px W29 geometry growth |
| Challenge every Card, hierarchy, margin, padding, divider and small element; remove superfluous/duplicate/distraction and add missing affordance | W0 exhaustive proportion register with terminal `KEEP/TIGHTEN/ENLARGE/REMOVE/ADD-AFFORDANCE`; V-A54 fixes the sole retained Card tuple, V-A55 fixes every role/rung and About's 66ch measure, V-A56 restores one visible producer selected marker, W18–W30 execute, and W32 closes every family |
| Deduplicate Claude sessions and ignore meta commands | method above and W0 |
| Spend little time on gates; delete contrivances | one W4 subtraction front; behavioral evidence only |
| Expand V to fully realize frontend while auditing all palette facilities | W10–W16/W22–W32 |
| Use research, hardening, realization, and analysis meta-tranches | `V.md §2` |
| Use the goal facility with the original prompt melded with standing edicts | **SATISFIED in formation:** the active goal carries the planning-only, 32-role, UI/palette, four-meta-tranche, BI-inbox and two-clean-audit objective; it creates no execution wave |
| Fold the Keyframes U covenant into W2→W7/W8/W9→W17→W33 without another process/gate: timing ParseResult, InterpSlot, layout-unit classification, descriptor collision, D-GAP-1/5/6, diagnostics and artifact coordinates | **DECIDED `CONSUMER-CUT.md` + D27/D28:** ship timing/slot/classifier/descriptor/six catalog rows; fold diagnostics; decline superseded flatten growth and upstream presentation sampler; delete the named kf seams. The packed 5.3.5 diff selected and the registry now proves immutable Keyframes6; W17/addenda retain those producer coordinates, while W33 owns only the fresh Glass7 SHIPPED coordinate. |
| Execute visual work Browser-first, with bounded direct implementation and visual verification rather than headless authorship | `V.md §1` and `EVIDENCE.md §1–2`: every visual π opens/inspects/captures the live routed Browser state first; W0 and W18–W32 use inspect→change→reinspect, W19–W29 inherit through W18, and Computer Use/headed hardware is limited to named Browser-inaccessible native AT/OS/device/Safari/GPU surfaces. Standalone/headless Playwright is only named binary automation, exhaustive repetition or synthetic timing that the Browser cannot express and never visual gestalt authority; literal filenames remain coordinates |
| Re-deploy the formation fleet after the reset with maximal available agent-v2 fanout; three-agent batches are a rate-wall tactic, not a fixed ceiling | **SATISFIED as orchestration, not product scope:** `audit/AGENT-REGISTRY.md` records 52 roles against the required 32-role minimum; live fanout uses every available slot subject only to the host's actual concurrency/rate wall, with no permanently staffed lens and no fixed three-agent cap. This operational fence creates no wave, proof framework or implementation claim. |
| Converge and do not spin wheels; report exact done/remaining truth | **BINDING formation close:** a substantive finding is repaired in its owning document and resets the clock; only two consecutive unchanged-tree non-author passes may close formation. Once the second clean pass is earned, V stops expanding and returns the formed tranche rather than launching another favored-narrative audit. `PROGRESS.md` remains the exact status authority while the clock is open. |
| Every material defect becomes an explicit addendum | **BINDING `ADDENDA.md`:** each concrete post-candidate defect that changes architecture, product truth or release evidence receives one mechanism-level V-A row plus existing wave owners. Addenda may amend a wave but may not mint another meta-tranche, process gate, compatibility path or re-deadline. |
| Resolve the live Glass P127 contradiction without a workaround | **DECIDED V-A9–V-A12/V-A63/V-A64/V-A88/V-A90–V-A92/V-A94–V-A96 + D38–D41:** exact `/color`+`/css`+`/easing` and Glass 7 semver stand. Value4 and Keyframes6 are now immutable; Glass has a clean registry-only pair install. Fresh Glass7 still must close declaration isolation, **persistent-only** HeaderRibbon behavior (the opt-in-collapsible arm CUT per the 2026-07-16 glass mark; V-A92 superseded-in-part), Q003 cue/layer native integrity and publication. No serializer registry, stale `dist`, file link, undeclared reach, parser, nightly/ambient injection, hoisting, `skipLibCheck`, DOM/VNode inference, offset/cover/reset, consumer sizing/overflow/timing or fallback. Sent to active Glass task. |
| Challenge Glass color failure and perceptual-math claims rather than accepting source-green prose | **DECIDED V-A11/V-A12:** CSS parse/unresolved/pending/absent states remain explicit Results/domain errors; contrast is measured against the actual typed band with a WCAG ratio, not background lightness; Value 4 hue interpolation is degree-domain and Glass proves warm/cool wrap, no overshoot, identity and throw bounds. No new runner, gate or wave. |
| Let the active Glass task delegate atomic C1 without collision | **IMPLEMENTED/HANDED:** Glass source/rehearsal work has consumed registry Value4 + Keyframes6 and warning hygiene is product-clean (55 affected tests, zero stderr); the live value demo still has the legacy pinned Glass5/Keyframes5 graph that causes the blank mount. The ordinary Glass batch is LANDED/pre-release. Fresh strict declaration/HeaderRibbon/Q003 native, Glass7 publication and routed Picker remain W17. No held archive or local source state earns release credit. |
| Explain and close the largely blank app without restoring removed Value entries | **DECIDED V-A74/V-A75/V-A84/V-A85/V-A93:** eager pinned Glass5/Keyframes5 imports abort ESM before Vue mount. Value4 and Keyframes6 are immutable, but the current value consumer still renders an empty mount until Glass7 is published and installed. The row stays RED until W17 removes the legacy graph and proves the routed Picker; no old entry, local parser/classifier, static ground or second mount is allowed. |
| Preserve standard Keyframes selectors through the clean parser cut | **IMPLEMENTED SLICE / BUILD W9/W17:** V-A76 makes `from` and `to` canonical typed 0%/100% selectors with serialization/reparse and removes duplicate normalization. Focused 36/36, full 2,310/2,310, type/build green; no public export, fallback or bootstrap claim was added. |
| Derive Keyframes/Glass versions from evidence rather than tranche epoch labels | **DECIDED V-A78/W17/W33:** Value 4.0.0 is the only predetermined major. Compare packed Keyframes against immutable 5.3.5 and Glass against immutable 6.0.0; compatible deltas choose same-major minors and only enumerated public incompatibilities justify 6.0.0/7.0.0. The clean packed diffs select Keyframes 6.0.0 and Glass 7.0.0; the latter removes eleven public subpaths without aliases/shims. |
| Do not advertise an emerging-CSS AST that rejects the grammar Keyframes already consumes | **IMPLEMENTED PRODUCER/FOCUSED-CONSUMER SLICE:** V-A79/A84 grammar and A85 shorthand/list collection are present in immutable Value4. Keyframes6 is published and contains the clean consume cut. Glass/native, Value consumer refresh and routed evidence remain open. |
| Calibrate Picker Blob from native raw buffers, not the nominal radius | **IMPLEMENTED SLICE / BUILD W29:** V-A80 assigns the existing owner only `bodyRadius 0.33→0.325`; focused tests/lint are green and raw buffers yield ratio `0.660192…0.660415`, centroid `≤1.342%`, hull `12.0%`, bounded DPR edges and equal WebGPU/WebGL2 alpha area. W17's baseline and the routed 0px chassis/seat/footprint witness remain RED; no pack/tag/publish is implied. |
| Properly coordinate the Keyframes animation-shorthand collector gap without a local parser or workaround | **IMMUTABLE PRODUCER/CONSUMER CLOSED:** Value is the sole structural owner; Keyframes deletes the classifier trio and is published at 6.0.0 against exact Value4. Glass's ordinary source/build integration is green against the registry pair, but no fresh Glass artifact, strict declaration/native close or routed product is green; W33 remains RED for Glass7 only. |
| Reject a package-local green Keyframes rehearsal when the real Glass build exposes undeclared formatter/build-tool runtime | **ADDENDUM V-A86 / W17:** the 231,628-byte archive remains held; Prettier/PostCSS runtime reach and public `printWidth` were removed in Keyframes itself. Immutable Keyframes6 has zero formatter residue and exact Value4 dependency; Glass added no alias, externalization exception, hidden peer or fallback. |
| Reject the first formatter-free correction when deterministic indentation changes animation semantics | **ADDENDUM V-A87/V-A93 / W17:** the 184,655-byte, 184,684-byte, 184,708-byte, 184,710-byte and 184,254-byte archives remain historical/held. The corrected producer was repacked and published as immutable Keyframes6; no rehearsal archive is republished or substituted. |
| Reject a runtime-green Glass rehearsal whose public declarations rely on undeclared transitives | **ADDENDUM V-A88/V-A93 / W17:** the 966,350-byte Glass archive remains held/defective. Glass must prove strict declaration isolation from the registry Value4/Keyframes6 graph without a shim, `skipLibCheck`, alias, fallback or hoisting assumption before fresh Glass7 publication. |
| Stop native validation at the first visible-but-inoperable Keyframes control and fix the composition owner, not hit testing | **ADDENDUM V-A89 / W17:** the obsolete HeaderRibbon `position` prop placed DarkModeToggle beneath the panel. Keyframes uses Glass 7 `placement="right"` directly; check and 3,554-module build are green; the exact 53-file frozen directory is under host Browser re-close. No z-index, pointer, click-forwarding, event, alias or fallback workaround. |
| Do not make Keyframes compensate when correct right placement exposes an anchorless Glass HeaderRibbon that can never reveal | **ADDENDUM V-A90 / W17:** Glass distinguishes real interactive anchors from action-only ribbons. Anchorless left/right stays expanded/clickable; anchored left/right retains collapse, pointer/focus reveal, touch/click pin and Escape return. The rule remains a live Glass7 obligation; Keyframes retains no width, overflow, z-index, pointer or placement shim. |
| Reject an eventual-only HeaderRibbon correction or a declaration check that cannot fail on bare imports | **ADDENDUM V-A91 / W17:** the exact empty-anchor Keyframes composition is required to be expanded/actionable on its first rendered frame and across anchor transitions; the packed declaration walk must own residual bare roots and typecheck without `skipLibCheck`. This remains open in Glass's fresh candidate; no tick delay, opacity, sizing, consumer omission, hoisting or typecheck mask. |
| Do not equate a renderable VNode with an interactive HeaderRibbon anchor | **ADDENDUM V-A92 / W17:** Glass 7 defaults HeaderRibbon to persistent/expanded and admits collapsible behavior only through explicit opt-in requiring a real focusable anchor contract. Text/span/disabled/opaque nodes cannot silently create an unreachable collapsed toolbar. Prove both modes left/right in types, stories, ordinary tests and the in-app Browser; Keyframes retains only `placement="right"`. |
| Reject a Keyframes declaration that passes package-local checks but fails a strict consumer | **ADDENDUM V-A93 / W17:** hold the 184,710-byte archive for TS2420; remove the false public `SpringProgress implements SpringPlayback` without exposing stripped loop members. The independently rehashed 184,254-byte replacement is historical evidence; immutable Keyframes6 is the current registry input. No declaration patch, augmentation, internal leak or older-archive fallback. |
| Preserve immutable release order when producer roots contain reverse local dev edges | **ADDENDUM V-A97 / W33:** Value4 and Keyframes6 have completed the producer-only registry order. Glass7 remains the sole unpublished stage; after it publishes, demo/dev registry edges and locks refresh last. No file/tarball lock, force, stale-lock acceptance, hidden peer, CI bypass or circular publication. |
| Preserve the Glass Drawer material law while evaluating Q023’s sheet-edge/engage ideas | **ADDENDUM V-A122:** Q023’s “drawer + sheet” shorthand is amended: Drawer remains fixed-radius blur plus scalar dim; graded edge work is sheet/overlay-owned, and the engage register is built only with a genuine second consumer or explicitly declined. No per-frame Drawer blur ramp, parallel token or gate farm. |
| Keep current-stage release and visual obligations acceptance-bearing | **ADDENDUM V-A123:** Glass's registry-only Value4/Keyframes6 graph is already proven; only strict/native Glass7 packaging/publication and the downstream stale graph remain. Historical producer-rebuild prose is marked; V-A120's Dock and composed-Blob outcomes now sit in W19/W20/W29 completion and DELTA, not only RED commentary. |
| Preserve the Glass-only Q003 boundary after native nested-filter reduction | **ADDENDUM V-A124:** Aurora compositor plates still corrupt beside WebGPU after approximately 95→5 nested filters. This falsifies filter count as a sufficient cause but leaves live-backdrop adjacency isolation with Glass W17/W33. No Keyframes/Drawer change, mask, sampler workaround, z-index/opacity cover, parallel token or new wave is authorized. |
| Correct the Q003 experiment record and withdraw premature Chromium-only attribution | **ADDENDUM V-A125, acceptance superseded by V-A168:** the inert Configurator backing-plane experiment reduced the route to 3 active/0 nested filters but still failed native V-A95 and was fully reverted. The honest baseline is 5 active/0 nested after retaining only the valid nested-cell simplification; V-A95 remains ACTIVE RED. Glass W17a/W33a must return repeated native cycles with zero slab, occlusion corruption and lost target. Only a causal hypothesis may be declined. No Browser-upgrade wait, backing-plane, filter target, mask, sampler, Keyframes/Drawer or package/lock workaround is authorized. |
| Correct stale U-F77/B1/B14 producer-order close-book wording | **ADDENDUM V-A126:** Value4 and Keyframes6 are immutable and their producer order is discharged. Those rows are historical/retired; W17/W33 alone own fresh Glass7/Q003 and downstream adoption. No producer rebuild, K_NEXT rehearsal, alias, fallback or new wave is implied. |
| Correct residual Consumer-Cut/W2 future producer wording | **ADDENDUM V-A127:** the Keyframes covenant, bootstrap, and sibling migration text is historical/implemented evidence; consumer targets pin immutable Keyframes6, and only Glass7 remains a live release candidate. No producer re-booking or second rehearsal is implied. |
| Consolidate the exact active Glass execution boundary | **ADDENDA V-A128/V-A165/V-A168:** the active Glass task consumes immutable Value4+Keyframes6, closes strict declarations/HeaderRibbon, repeats native Q003 forward/reverse from honest 5/0 until the product is uncorrupted, emits one fresh W17a rehearsal, and leaves publication to W33a before W17b refreshes the routed consumer. No product-level decline, workaround or held-archive credit. |
| Remove stale Value3 names from tracked demo canon | **ADDENDUM V-A129:** `demo/CLAUDE.md` and the root-barrel comment in `demo/@/utils/utils.ts` still describe `/parsing`/`/units` and the root as active. W4/W17 must remove or mark those passages historical and rerun the tracked-doc census; no root export, alias, or runtime migration is implied. |

Every row above is either historical-retained, built by a named V wave, folded into a named producer/consumer pair, banked with a re-trigger, or retired. No prompt is represented by an unowned “consider” row.

**V-A168 current-stage override:** rows that retain E404, bootstrap, held-archive, “W33 publishes Value/Keyframes,” “Keyframes rebuilds/refreezes after Glass,” U-F77/B1/B14 producer-order, residual Consumer-Cut/W2 producer language, stale Value3 demo documentation, a cyclic W17/W33 order or product-level Q003 decline are historical records. Current truth is Value4 + Keyframes6 immutable; Glass's ordinary batch is LANDED/pre-release. Glass alone must close strict declarations/HeaderRibbon, stale canon and product-green native Q003 from honest 5/0; W17a returns fresh rehearsal bytes, W33a publishes them, W17b refreshes the routed value consumer, and W33b closes only after the remaining product waves. No held archive, producer re-booking, corrupt-artifact decline or source-green claim substitutes for that rail.
