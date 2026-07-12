# TRANCHE U FORMATION — THE FINDING-FAMILY REGISTRY

**Charter**: the owner's 2026-07-12 order — *"Let's mark what's been done in T, and the fold
those, propogate them, to a new forthcoming tranche that will seek to close all noted gaps"* —
executed as the post-tranche audit (32-agent steerable budget; diverse independent lenses;
adversarial against the close-class lies; registry stable after two consecutive clean passes)
followed by the convergent formation. **This campaign is PLANNING-ONLY**: no source edits land
from it (T.W8's remediation, running concurrently, is T's own and unaffected).

**OWNER PROCESS EDICT (2026-07-12, binding on every campaign lane from round 3 onward)**:
*"Parsimonious usage of playwright and dev tools MCP, as to not overwhelm context. Fastidious
design and code analysis."* — static analysis first, live probes only to confirm a formed
hypothesis; probes via purpose-built scripts emitting compact summaries (never raw DOM/console
dumps in context); element-clipped captures over full-page; targeted, filtered DevTools calls.
The probe budget forces selectivity, never shallowness.

**The registry law**: two findings sharing a defect MECHANISM share a family, however
differently worded. Dispositions here are CANDIDATES until formation; re-booking is forbidden —
every family terminates in build / fold / retire / escalate with rationale. A family that has
ridden ≥2 closes un-decided is a DISEASE row and deciding it is a wave of its own.

**State**: ROUND 1 COMPLETE (2026-07-12). 12 agents (mark scribe + 11 lenses), 12/12 returned,
46 findings (4 A · 22 B · 20 C). Raw evidence of record: the round-1 journal
(`wf_8ec238c0-a15/journal.jsonl`) + the T done-state census `docs/tranches/T/audit/T-MARK-2026-07-12.md`
(committed f33df7d; the scribe's `[OWNER-undefined]` template token — itself caught by the
plan-vs-landed lens as U-F20 — was cured at rename). Budget: 12 of 32 spent.

Audited heads drifted f33df7d → 9efe3d1 → 6f7cb35 across batches (T.W8 landing passes
concurrently); each finding cites its own head.

---

## §1 A-SEVERITY (the block that shapes the tranche)

| ID | Family | Mechanism | Lens(es) | State | Disposition-candidate |
|---|---|---|---|---|---|
| **U-F1** | `ci-oracle-slate-nonblocking` | Only `page-load.spec.ts` is a hard CI e2e step; the full `smoke` project runs `continue-on-error: true` (ci.yml:334) and `smoke-perf`/`reactivity`/`mobile`/`admin` are invoked by NO workflow — a green CI is zero evidence any visual oracle or built-bundle perf gate passed. Deliberate "soft-launch" posture, but it defeats the tranche's core deliverable (the oracle slate). | gate-soundness | CONFIRMED (source-read + grep) | **build** — a CI-hardening wave row: promote the slate to blocking, or the soft posture is an owner decision |
| **U-F2** | `adopt-trigger-disease` | The glass-ui 5.0.0 adopt cohort has ridden S.W8 → T.W7 → now a THIRD tranche whole (~10-tranche primitive-asks lineage). Sibling tree already reads 5.0.0 (npm 4.2.0, no v5 tag, USER-GATED); CI still pins `tranche/BG` (ci.yml:80,277,369 + deploy-pages.yml:80); the goo-blob→blob clean-break rename WILL break 3 demo sites at the cut; and glass-ui's BI formation (91 wave specs, 0 impl commits) absorbed only the mechanical asks — **every §1 design red is live at their HEAD and none is rowed as a BI acceptance constraint** (each topical wave declares "No cross-repo ask" and diagnoses a different root). | chronic + cross-repo ×3 | CONFIRMED (their HEAD e4e7f660 re-verified file:line) | **build** — THE DISEASE LAW APPLIES: the adopt event is a wave of its own in U, and the §1 design reds must be re-filed as EXPLICIT named BI acceptance constraints, not trusted to topical waves |
| **U-F3** | `q14-perf-redemption-uncloseable` | The owner-ruled HARD close gate (Q14: "no re-baseline, no deferral") is coupled to producer-side levers (L20/GAP-L5) gated on the unfired adopt — structurally uncloseable by value.js alone; RP-2 (347.9 KiB JS-eager vs ≤280) now rides its 3rd tranche. Measured this round: desktop LCP 2394 GREEN / mobile LCP ~11085 on an uncompressed static serve (instrument caveat — the CI ledger says 5141; reconcile in round 2); ~419 KiB gz critical render-blocking payload; LCP≈FCP (paint-gated, not reveal-gated — the reveal-only cure DID land). | chronic + performance + prompt-recap | CONFIRMED-DIRECTION, magnitude needs instrument parity | **escalate** — the U charter must present the owner the structural fact: green requires the producer cut in-window, or a ruled re-scope |
| **U-F4** | `reduced-motion-dock-collapse` | **NEW, the sharpest a11y break found**: under `prefers-reduced-motion: reduce` the dock stays a 44px pill on every view — 19/20 nav+action controls visually clipped away, with NO hover/click/keyboard recovery (probes: width stays 44px through all interactions). Mechanism = demo `overture.css:179` (`.overture-dock-land{animation:none}` under PRM) × the producer GlassDock morph-spring geometry (expanded state is motion-carried). WCAG 2.4.3/2.4.7/1.4.13-class app-level nav failure. | accessibility | LIVE-PROBED (round-2 adversarial verify queued) | **build** (demo arm-static-fallback) + producer half → communiqué addendum |

## §2 THE OWNER-EYE STILL-REDS (gestalt lens vs MANDATE §0.5/0.6/0.7 — most already routed to W8/WR rows; U absorbs whatever W8's running remediation does not land)

| ID | Family | Owner rows | Live read (frames under `audit/pi/u-gestalt/`) |
|---|---|---|---|
| U-F5 | `blob-card-seat` | T-30 · T-49 | STILL-RED on seat/integration/size (bead pinned top-right, spills the card edge at 1440, collides the readout at 390); **blur axis genuinely CURED** |
| U-F6 | `q5-ramp-register` + `proxy-predicate-oracle` | T-10 · T-43 · T-56 (+ plan-vs-landed) | STILL-RED: purple→maroon→brown, mid-letters sink on dark. The resolver walks to its L=0.02 clamp (palettes-ramp.ts:93-110) AND its oracle O-14 is a proxy predicate (paint≡token, never token≡floor) that was gate-green over the wreck — the S-disease recurring in T's own instrument. WR-8 owns the cure; **U owns the oracle-class law: every guard-constant gets a feasibility leg** |
| U-F7 | `scene-transition-motion` | T-14 · T-48 · T-58 (thrice-red, MANDATE-escalated) | Direction confirmed (swap-window max 88ms, 11/74 frames >32ms) but headless SwiftShader + the unlanded O-16-R1 producer clobber confound magnitude — the real-GPU frame-by-frame with confound isolation stands as the T-58 mandate |
| U-F8 | `generate-plate-species-chrome` | T-54 · T-55 | STILL-RED: flat rounded squares (not WatercolorDots); three verb registers in one row (not one glass-ui instrument) |
| U-F9 | `picker-header-spacing-regime` | T-2 · T-51 · T-59 | STILL-RED/SHORT: title 67.8px un-stepped, dead band above readout, 1440-tight vs 390-airy divergent rhythm |
| U-F10 | `console-veil-material` | T-34 · T-50 (owner re-red once) | STILL-RED: reads flat cream/brown, not a translucent veil — despite Lane P's ad301e7 `surface="veil"` re-seat (see U-F17) |
| U-F11 | `collapsed-dock-swatch-seam` | T-37 | STILL-RED: derive-seam ΔL .004–.023 imperceptible; the swatch exists structurally, invisibly |
| U-F12 | `dark-scheme-derived-tint-muddiness` | (NEW — no owner row) | The ambient dark-card tint resolves to uniform desaturated warm-brown across every pane, dragging mid-tones down and compounding U-F6/U-F26 — a candidate for the owner's judgment at formation |
| U-F13 | `dock-edge-clip` | T-36 · T-52 | Producer clip/fade-mask shaves EDGE items' rings only (interior rings full) — milder than the earlier total-shave read, which was the U-F4 PRM confound. Producer half at the communiqué; the Tools true-button box-model half is demo work |

## §3 GATE/INSTRUMENT INTEGRITY

| ID | Family | Mechanism | Disposition-candidate |
|---|---|---|---|
| U-F14 | `perf-ratio-nonportable-flake` | `proof:perf-target`'s ratio premise fails under CPU contention (both clauses red on a clean tree; green margin 0–7%, not the intended 25%; `test:dist` exited 1 once at head) — the flagship dist gate is a flake risk, its RED not a trustworthy regression signal | **build** — re-anchor floors with real headroom (round-2 verify first) |
| U-F15 | `o26-softwaregl-nonflip` | The O-26 born-RED cannot flip on ANY headless runner (SwiftShader forces the static CSS placeholder → migration≈0 forever) and its cure-confirming O-3 SKIPS on software-GL — aurora perceptibility is verified only by a manual, non-gating annex | **fold** — into the U oracle-hardening row: an oracle whose cure-path is unmeasurable on its runner is mis-hosted |
| U-F16 | `untracked-CLS-gate` | lighthouserc errors on CLS ≤ 0.1 at the same HARD level as LCP/TBT, but the PI-1 ledger tracks only LCP+TBT and the baseline "CLS PASS" was asserted un-measured; measured mobile CLS **0.219 deterministic** (pane-shell mount reflow) — a third red hard gate nobody watches, a W9-close ambush | **build** — add CLS to the ledger + cure the pane-shell reflow (round-2 verify with instrument parity) |

## §4 LEDGER/PROCESS INTEGRITY

| ID | Family | Mechanism | Disposition-candidate |
|---|---|---|---|
| U-F17 | `q4-well-veil-silent-reversal` | The owner twice overruled the ratified Q4 WELL (opaque, NO-blur) toward the glass-ui veil, the demo LANDED the reversal (`ComponentSliders.vue:26 surface="veil"`, whose producer definition IS glass+blur) — yet T.md §4 still reads "Q4 The well. STANDS … a calibration, not a construction". A ratified decision was materially reversed with no re-ratification row; a successor reading §4 would believe the WELL is live | **build** — an honest §4 amendment row in U's W0 (ledger-integrity, lesson-15 class) |
| U-F18 | `e5-addressed-half-unmet-paused` | E-5's "ensure ADDRESSED" is structurally unmet for §0.7 (zero landed cures at audit time) — honest, recorded, and W8's running remediation is the live counter-motion; U inherits the residue | **fold** — into U's inheritance census at formation |
| U-F19 | `w8-remediation-live-defects` | Behind the (then-paused, now-running) W8: WR-1..11 minted-not-executed, and the filed body holds LIVE A-class defects that are ordinary bugs, not taste brackets — T-56 near-black wreck (U-F6), AB-1 About-KaTeX scope-dead, error-detail 2.72:1 sub-3:1, T-53 dark caster (`--shadow-color` → 50%-α cream slab) | **fold** — W8 executes now; U's formation takes the terminal W8 state and absorbs the un-landed residue by name |
| U-F20 | `doc-template-token-unsubstituted` | The mark scribe's `${DATE}` arrived undefined (Workflow args delivered as a string, not an object) → `T-MARK-undefined.md` + `[OWNER-undefined]` | **retired at root** — renamed/cured this commit; harness lesson recorded (args must be a JSON object) |

## §5 CANON/CONSUMER/CODE HEALTH

| ID | Family | Mechanism | Disposition-candidate |
|---|---|---|---|
| U-F21 | `canon-structure-drift` | Root CLAUDE.md Structure block predates the T.W1 reorg (9 parsing + 4 gamut paths dead, counts stale); **api/CLAUDE.md's entire structure section is invalid** (all 9 documented paths gone — modules/+platform/ transposition); README says "15 color spaces" ×3 (tree ships 17); index counts 27 vs 26 vs actual 22; docs/ omits 3 real artifacts | **build** — ONE canon-sync wave row (regenerable-count precept applied) |
| U-F22 | `barrel-parity-drift` | Root vs subpath barrels disagree bidirectionally on 10 symbols (ICtCpColor/JzazbzColor classes absent from /color; timeline List/Named variants in no subpath; raytrace + slice-boundary fns absent from root) — ships in dist .d.ts; copy-omission signature across 3 tranche edits; **no parity gate exists** | **build** — cure the 10 + mint the parity gate (round-2 mechanical verify first) |
| U-F23 | `ground-record-forked-read` | GroundRecord write is TS, the only READ is inline vanilla JS in index.html hand-duplicating `VERSION=1` + FIRST_VISIT constants; the typed `parseGroundRecord` (with the version-invalidation logic) is DEAD — a ground.ts version bump silently strands the boot script | **build** — single-source the record contract (codegen or build-time inline) |
| U-F24 | `dead-orphans` + `over-export-hygiene` | 4 true orphans (api migrate-soft-delete.ts vs the delete-after-run convention; `__resetServicesForTest`; the prng radii trio) + ~150 over-exported-but-live internals (candidate only — idiomatic type aliases + testability seams) | **retire** the orphans; **registry rules** the over-export class at formation (likely leave-as-is with a named rationale) |

## §6 ACCESSIBILITY (beyond U-F4)

| ID | Family | Mechanism | Disposition-candidate |
|---|---|---|---|
| U-F25 | `gradient-stop-focus-invisible` | `:focus-visible` resolves `outline-style: none` (the 1px blue outline never paints) + unchanged box-shadow → zero focus affordance on a 20×20 keyboard-operable control | **build** (pairs with U-F27 target-size on the same element) |
| U-F26 | `dark-accent-below-floor` | Default-seed dark accents render 1.89–2.87:1 (Tools 1.89, channel labels ~2.8) — below AA and below the system's own claimed 3:1 floor (viewSchema.ts:78-88); the "certified accent" path does not guarantee its floor against the actual rendered dark tier | **build** — re-guard against rendered tier; joins U-F6's feasibility-leg law |
| U-F27 | `tap-targets-aria-polish` | Gradient stops 20×20 (<24 floor), thumbs 12px-wide (track rescues coarse), 17/19 picker controls under the owner's 44px referent; raw 16-digit `aria-valuenow` with no `aria-valuetext`; label casing inconsistent | **fold** — one target-size + announcement hardening row |

## §7 CROSS-REPO RESIDUE

| ID | Family | Mechanism | Disposition-candidate |
|---|---|---|---|
| U-F28 | `kf-prm-expand-fixed-unreleased` | The one keyframes ask is FIXED at their HEAD (managed-stepper.ts PRM arm now emits) but unreleased (post-5.2.0, no tag); value.js has zero direct kf imports | **retire on their next tag** (watch row, no work) |

## §8 THE ZERO-DROP WINS (retire — the successor must NOT re-fold these)

T genuinely discharged: the proof:* Q13 retain-5/excise-7 (CI-wired `test:dist`); **X1** prod-api
deploy + **X2** NCSU 301 (the two oldest owner orders — on-host claims verified via close
artefacts only; round-2 probes prod GET-only as the honest caveat); /remix+/diff full excision;
dup-useDark folds; L1 Normalized/Display brand PERMANENTLY RETIRED; doc 5→6 projects. Recorded
so no successor reader re-opens them.

---

## §9 ROUND-2 STEERING (the root's redirection)

Convergence check: U-F6 drew two independent lenses (plan-vs-landed + gestalt) — family merged,
excess redirected. Verification duty: U-F4, U-F16, U-F14, U-F22 are load-bearing new claims —
each gets an adversarial refuter. Underexplored space from the round-1 coverage statements:
security/api runtime truth, test-suite health, library API design quality, demo architecture
gestalt, repo hygiene.

**Round-2 roster (8 agents, batches of 3; 20/32 spent after)**:
verify:prm-dock (opus) · verify:perf-instrument (opus — LCP 11085-vs-5141 reconciliation +
CLS parity + the perf-ratio flake matrix) · verify:mechanical (sonnet — U-F22/23/24 refutation)
· lens:security-api-truth (opus) · lens:test-suite-health (sonnet) · lens:library-api-design
(fable) · lens:demo-architecture (opus) · lens:repo-hygiene (sonnet).
New lenses run INDEPENDENT (round-1 findings withheld); verifiers get the specific claims to
refute, prompted to refute.

**Stability rule**: the registry is stable when two consecutive rounds surface nothing new; then
formation (the convergent design loop) opens on W8's terminal state.
