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

---

# ROUND 2 (2026-07-12) — 8 agents (3 verifiers + 5 fresh lenses), 9 verdicts + 30 findings (2 A · 11 B · 17 C). Budget 20/32.

## §10 VERDICTS ON THE ROUND-1 A/B CLAIMS (adversarial verify)

| Claim | Verdict | Correction |
|---|---|---|
| **U-F4** PRM-dock | **SHARPENED, A stands** | Behavior CONFIRMED (empty 44px pill, ~0 usable controls, no recovery, ships in dist) but the mechanism was HALF WRONG: `overture.css:179` is a RED HERRING (never applied under PRM). True root is **PRODUCER-ONLY**: `data-morphing` latches ON under PRM → `../glass-ui .../morph.css:72` derives `--dock-expand-t` from the frozen `--dock-morph-t=0` while the "expanded" class is set. **DESKTOP-viewport-specific** (always-expanded=false); mobile degrades to 244px, not empty. Demo EXONERATED. → the communiqué gets a named producer row; the demo has no cure to make. |
| **U-F3** Q14 magnitude | **WEAKENED** | The 11085ms mobile LCP was an **uncompressed-serve artifact** (~2.2× inflated, wrong transport). At the true gate instrument (LHCI, compressed static-dir, mobile+simulate): **LCP ~4951 local / 5141 CI** (~2× budget, RED). On a fast host the binding reds are **LCP + CLS**, not TBT (TBT 187ms local, only reddens on the 2-core CI runner). Desktop fully GREEN. Direction (producer-coupled, uncloseable by value.js alone) STANDS. |
| **U-F16** CLS | **CONFIRMED + sharpened** | CLS 0.219 (LHCI) / up to 0.435 standalone — deterministic, mobile-only, **the shifting node is the SAME element as the LCP element** (the picker/readout plate mount). Untracked in PI-1; baseline "PASS" was asserted un-measured. A hard-red that reddens W9 even if LCP is cured. |
| **U-F14** perf-flake | **CONFIRMED + sharpened** | Genuine non-deterministic RED ~50% on a clean tree, and it **flakes even at IDLE** (40%), not only under load. Root: native V8 `JSON.parse` (156–353 MB/s) does not co-scale with the interpreted CSS parser (1.5–8 MB/s), so the ratio's designed 25% headroom is already spent on fast archs. |
| **U-F25** gradient-focus | **CONFIRMED** | Dead from day one by TWO causes (empty `--ring`/`--color-ring` token + inline `boxShadow` override at GradientStopEditor.vue:226); the commit that cured the twin dead-hover (4e6c178) missed the identical focus pattern. |
| **U-F26** dark-accent | **SHARPENED** | The sub-3:1 breach is **DEFAULT-SEED-SPECIFIC** (light L=92 pink → mid-dark-pink paper): default breaches 2.91–3.26:1; 5 other seeds all clear 4.37–5.02:1. The specific "Tools 1.89" active-tab case not isolated in headless; the ~2.8–3.0 component-label breach replicated. |
| **U-F22** barrel-drift | **CONFIRMED exact** | All 10 value symbols verified in src AND dist .d.ts; no exclusion comment covers any. Type-level drift is even wider (>10 with types). |
| **U-F23** ground-fork | **WEAKENED** | The forked read + dead `parseGroundRecord` CONFIRMED, but `GROUND_RECORD_VERSION` is NOT zero-ref (live via buildGroundRecord write). Version-bump-strands-boot risk stands. |
| **U-F24** dead-orphans | **CONFIRMED** | All 3 safe-delete (mulberry32 in prng.ts is live — trio only). Note: CLAUDE.md/MEMORY.md list a stale `demo/@/composables/prng.ts` path. |

## §11 NEW FAMILIES — LIBRARY API CORRECTNESS (the round-2 headline: real bugs shipping in published 3.1.0)

| ID | Sev | Family | Mechanism | Disp |
|---|---|---|---|---|
| **U-F29** | **A** | `parseCSSValue-silent-truncation` | The headline, README-usage-example export `parseCSSValue` (src/parsing/index.ts:494) is `tryParse(ValuesValue)` — a SINGLE value — so it silently drops every token after the first sub-value: `'1px solid red'`→`'1px'`, `'0 0 4px red'`→`'0'`, `'translate(10px) rotate(45deg)'`→drops rotate. The full-value fn `parseCSSSubValue` exists but is absent from the README and named as if it parses LESS. A consumer following the README loses data on borders/shadows/fonts/padding/transform-lists with zero signal. | **build** — the consumer-facing API contract is wrong; the fix is BREAKING (rename/re-shape the primary export). A U design-loop question (the greenfield naming). |
| **U-F30** | **A** | `computed-color-normalized-serialization` | Colors from the flagship CSS Color 4/5 paths (color-mix, relative-color) carry internal normalized [0,1] channels and `Color.toString()` emits them verbatim: `parseCSSColor('color-mix(in srgb, red 30%, blue)').toString()`→`'rgb(0.3 0 0.7)'` (near-black) vs the direct-parse `'rgb(76.5 0 178.5)'`. Same `parseCSSColor` yields two incompatible numeric conventions by input path; propagates through parseCSSValue into gradients. base.ts's own docstring calls toString "the canonical round-trip serializer". | **build** — a denorm-on-serialize (or normalize-on-construct) correctness fix; a real library bug, not taste. |
| U-F31 | B | `transform-single-axis-expansion` | `rotate(45deg)`→`rotateX rotateY rotateZ` (CSS rotate is Z-only); `translate(10px)`→all-axis; `scale(2)`→`scaleZ(2)` too. Multi-arg forms are correct. If this feeds decompose/interpolate, blends compute a wrong transform. | **build** (verify the decompose interaction) |
| U-F32 | B | `math-trig-unit-leak` | `sin(30deg)`→`0.5deg` (should be unitless `<number>` per css-values-4); leaks into `calc(sin(30deg)*100px)`→`50deg` not `50px`. | **build** |
| U-F33 | B | `gradient-stop-position-roundtrip` | `linear-gradient(90deg, red 20%, blue 80%)`→`'...red), 20%, ...blue), 80%'` (comma not space-joined → invalid CSS, reads as 5 stops). | **build** |
| U-F34 | C | `library-naming-incoherence` | `{from}2{to}` vs `{from}To{to}` coexist (xyz2rgb vs xyzToICtCp); `serialize*` vs `reverse*` for the same parse-inverse role; casing drift (srgbToOKLab / linearToSrgb / oklabToLinearSRGB). | **fold** into the U library-coherence row (pick one convention — a design-loop call) |
| U-F35 | C | `transform-2D-recompose-missing` | `decomposeMatrix2D` has no `recomposeMatrix2D` inverse and `interpolateDecomposed` is 3D-only — 2D decompose is a dead-end. | **fold** |

(The lib #6 subpath class-asymmetry and #9 README drift MERGE into U-F22 / U-F21 respectively.)

## §12 NEW FAMILIES — SECURITY / API RUNTIME

| ID | Sev | Family | Mechanism | Disp |
|---|---|---|---|---|
| U-F36 | B | `impersonation-dead-credential` | `POST /admin/impersonate` mints a session with NO `expiresAt`; the auth path (`findAndTouch`, session.ts:25) filters `expiresAt>now` → the impersonation token is dead-on-arrival, and the route test asserts only row-existence (via the no-expiry `findByToken`), staying green over the break — a green-over-broken masking. | **build** (fix + a test that drives the auth middleware) |
| U-F37 | B | `db-trust-boundary` | Mongo deployed with NO auth (`--replSet rs0 --bind_ip_all`, no `--auth`/`--keyFile`); `.env.example` advertises 4 `MONGO_*` creds compose.yaml never references — config-truth lie + defense-in-depth gap under the plaintext token store. Mitigated (not host-exposed). | **build** (wire creds or delete the advertised vars) |
| U-F38 | C | `db-token-at-rest` | Session tokens stored cleartext as `sessions._id`; any DB read = every live token (mass hijack). Entropy is fine (UUIDv4). | **build** (SHA-256 at rest, lookup by hash) |
| U-F39 | C | `frontend-missing-security-headers` | color.babb.dev serves HTML with only `x-content-type-options` — no CSP/HSTS/X-Frame-Options, while the API origin sets a full suite. CF-Pages `_headers` fix. | **build** |
| U-F40 | C | `admin-audit-attribution` | Admin auth is bearer-token-only; `admin_audit.actorSlug` derives from the optional session `userSlug` → privileged actions recordable with `actorSlug=undefined`. | **fold** into U-F36 remediation |
| U-F41 | C | `duplicate-ncsu-origin` | apache-vhost.conf documents the `mbabb.fi.ncsu.edu/colors/` alias STILL live + byte-identical (DEC-9 declared retired; N.W4 V3 found it alive), sharing the rate-limit pool. NCSU-VPN-gated, unverified this audit. **Ties to X2 residual.** | **escalate** (deploy ceremony; re-verify) |

## §13 NEW FAMILIES — TEST HEALTH / DEMO ARCH / HYGIENE

| ID | Sev | Family | Mechanism | Disp |
|---|---|---|---|---|
| U-F42 | B | `vacuous-ci-tripwire` (merges toward U-F1/U-F15) | 3 armed `test.fail()` at head (O-16 clobber INDEPENDENTLY re-verified STILL shipped at glass-ui dist components.css:1; O-26 aurora; O-5 boot) whose cure waves have not landed; on the software-GL CI runner O-26 can never flip AND O-3's chroma assertion fully SKIPS — the aurora has no executable gate on CI. | **escalate** (own all 3 + wire a headed-GPU annex or acknowledge) |
| U-F43 | C | `slow-build-in-beforeAll` | `test/dts-published-surface.test.ts:23` runs a full `npm run build` in beforeAll for 2 string checks → ~70–80% of the unit-suite wall time. Move to test:dist. | **fold** |
| U-F44 | C | `impl-detail-coupled-tests` | value-unit.test.ts couples to internal `superType` array identity + `.value` nesting (breaks on a no-op rep refactor). Snapshots are defensible (parse output IS the contract). | **fold** |
| U-F45 | B | `demo-cross-layer-inversion` | `demo/@/composables/color/palettes-ramp.ts:49` reaches UP into app-root boot (`../../../color-picker/composables/boot/view-accents`, raw path bypassing the alias) while boot reaches DOWN — a near-cycle between the shared layer and app-root; blocks extracting demo/@ as a clean lower layer. | **build** (relocate resolveViewAccent to the shared layer) |
| U-F46 | B | `session-token-triplication` | One token in 3 reactive cells (useSession._token, useUserAuth._userToken, api client sessionTokenRef) + 2 storage backends, synced only by manual write-through; `useSession.clearSession()` is a dead incomplete-teardown twin that would desync all 3 if wired. | **build** (single source + delete the dead twin) |
| U-F47 | C | `colocation-e1-violation` | The color-pipeline spine (`useColorParsing.ts:5`) imports `generateSingleColor` from a feature's internal composable; `palette-browser` (consumed by 6 features) exposes NO index.ts barrel — all 6 reach into internals. | **build** (move the primitive down; give palette-browser a seam) |
| U-F48 | C | `demo-state-fragility-cluster` | usePaletteStore per-call factory duplicated at 3 sites (localStorage-round-trip sync); COLOR_STORE_KEY defined in 2 files/2 idioms; Dock.vue 7 watchers (5 coordinating one open/close state). | **fold** (one hoist-to-singleton + const-extract + computed-predicate row) |
| U-F49 | B | `gitignore-auth-unanchored` | `.gitignore:8 auth/` is unanchored → matches the tracked SOURCE dir `demo/@/composables/auth/` (4 composables). Survive only by tracked-exemption; any new/re-added file there is silently ignored — a silent-drop trap. Anchor to `/auth/`. | **build** (one-line, high-value) |
| U-F50 | C | `tracked-binary-bloat` | 133 MB (84%) of the 159 MB tracked tree is audit binaries; a 58 MB heapsnapshot (N-tranche) still tracked (37% of tree); 154 of 156 tracked PNGs match the repo's own `*.png` ignore. | **retire** (git rm the heapsnapshot; policy for shots) |
| U-F51 | C | `stale-local-branches` | 3 orphan local branches == master + t-w5-motion-liquid (0-unique, merged); local-only clutter. | **retire** |
| U-F52 | C | `scratch-accumulation` | `docs/tranches/T/audit/pi/` holds 1.8 GB untracked scratch (w8/ = 1.7 GB); bulk is *.png-ignored (0.5 MB real accidental-add exposure). | **retire** (sweep before U opens) |
| U-F53 | — | `worktree-prune-proof` | 5 of 9 worktrees are 0-unique + clean (prunable WITH the law's proof delivered); 4 protected (e53-14/15 live W8 commits, e53-16/ec3-2 uncommitted, e53-16 OS-locked). | **actionable** (prune the 5 at a safe moment) |

## §13.5 OWNER RULING (2026-07-12, verbatim — wins over every disposition-candidate above)

> Indded, both of these are incorrect and must be ameliorated:
> - U-F29 — parseCSSValue, the headline README function, silently drops everything after the first sub-value ('1px solid red' → '1px'). A consumer following the README loses data on every shorthand with no signal.
> - U-F30 — colors from color-mix()/relative-color serialize their internal normalized [0,1] channels verbatim, so color-mix(in srgb, red 30%, blue).toString() yields a near-black rgb(0.3 0 0.7) instead of rgb(76.5 0 178.5) — the same parseCSSColor produces two incompatible numeric conventions by input path.

**Encoding**: U-F29 and U-F30 flip from disposition-candidate to **OWNER-RULED DEFECTS — AMELIORATE**.
The round-3 verify:lib-api question narrows: no longer "is it a bug?" (ruled) but "what is the
correct amelioration shape?" — its contract/consumer analysis feeds the fix design directly.
EXECUTION: a dedicated library-correctness remediation dispatches on the round-3 verifier's
return (born-RED tests reproducing both defects FIRST, then the idiomatic cure — E-3 binds: the
fix addresses the serialization/contract CLASS, and the verifier-confirmed siblings U-F31/F32/F33
join the same wave if confirmed real, never cherry-picked around). The PUBLISH decision (the
version cut — U-F29's shape change is semver-loaded against glass-ui's `value ^3.1.0` peer floor)
is PRESENTED to the owner with the landed fix, not taken unilaterally.

## §14 ROUND-3 STEERING

Round 2 surfaced 2 A-class + many B — NOT stable; round 3 required. The two library A-class bugs (U-F29/U-F30) are the highest-impact new claims and MUST survive a fresh refuter before they shape the tranche (is `parseCSSValue` contractually single-value with `parseCSSSubValue` the intended multi path? is the normalized-serialization real end-to-end or denormalized at a consumer seam?). Remaining unexplored: build/bundle/tooling truth, dependency/supply-chain, and a **completeness critic** (what modality was never run, what claim is unverified).

**Round-3 roster (5 agents, batches of 3; 25/32 after)**: verify:lib-api (opus — refute U-F29..F33 against the tests + the type contract + real consumer use) · verify:security (sonnet — drive the auth middleware to confirm/refute U-F36; re-probe U-F37/F38) · completeness-critic (opus — read BOTH rounds' coverage statements, name every un-run modality/unverified claim/unread source) · lens:build-tooling (sonnet — vite/rolldown config, build determinism, sourcemaps, gh-pages chunking, tsconfig/eslint coverage) · lens:dependency-supply-chain (sonnet — the file: sibling deps, pins, peer/unused deps, npm audit, the parse-that re-pin). All under the probe-parsimony edict (static-first, compact returns).

**Then**: if round 3 is confirmatory (no material new families), round 4 = a fresh-eyes adversarial completeness pass → two-clean-passes stability → the convergent design-loop FORMATION opens on W8's terminal state.

---

# ROUND 3 (2026-07-12) — 5 agents (2 verifiers + completeness critic + 2 lenses), 8 verdicts + 18 findings. Budget 25/32. NOT stable (new families surfaced) → round 4.

## §15 VERDICTS

| Claim | Verdict | Resolution (feeds the amelioration) |
|---|---|---|
| **U-F29** parseCSSValue truncation | **WEAKENED** (but OWNER-RULED ameliorate §13.5 — the ruling wins) | Not a "wrong contract": `parseCSSValue = tryParse(ValuesValue)` is a DOCUMENTED single-value parser (truncation explicitly documented at index.ts:513-518), paired with the full-list `parseCSSSubValue`; the README shows NO multi-token example. The legitimately-sharp defect is the **SILENT no-signal truncation** (`tryParse` never requires full-input consumption → returns partial, no throw/warn). AMELIORATION SHAPE (design-loop): make the truncation LOUD (throw/warn on unconsumed input) and/or fix discoverability (the naming footgun — `parseCSSSubValue` sounds like it parses *less*). The owner's intent ("a consumer must not silently lose data") is honored by either the loud-fail or the full-value default — the design loop picks. There is no `parseCSSValues` top-level fn (only the combinator + parseCSSSubValue). |
| **U-F30** normalized serialization | **SHARPENED + CONFIRMED** | No denorm seam exists (`toFormattedString` emits the same normalized floats; base.ts:248 calls both "canonical round-trip serializers"). Root: `mixColors` returns a `Color<number>` normalized [0,1] (mix.ts:105,177) and `createColorValueUnit` (color-unit.ts:32) wraps it WITHOUT denormalizing; `toString` (base.ts:202) emits verbatim. **The relative-color path ALSO leaks** (`rgb(from red r g b)`→`rgb(1 0 0)`, should be `rgb(255 0 0)`) — same `createColorValueUnit`-wraps-normalized seam. A single, clear fix locus. Zero tests assert a color-mix/relative-color serialization. |
| **U-F31** transform single-axis expansion | **CONFIRMED, real** | `rotate(45deg)`→3 axes etc.; root src/parsing/index.ts:87-91 (single-value branch iterates all dims). Downstream hypothesis REFUTED: the library's own decompose/interpolate is matrix-component based and never consumes the expanded FunctionValue list — blast radius is DIRECT consumers of the parse output (an apply/keyframes path), not internal. |
| **U-F32** trig unit leak | **CONFIRMED, bounded** | `evaluateMathFunction(sin(30deg))`→`0.5deg`; root math.ts:504-524 (sin/cos/tan not in the inverse-fn unit list). Confined to the `evaluateMathFunction` resolve path; `parseCSSValue` does not eagerly evaluate (AST round-trips unevaluated). |
| **U-F33** gradient-stop comma | **CONFIRMED, bounded** | Positioned stops comma-join → invalid CSS; root FunctionValue.toString default (units/index.ts:300, no positioned-stop case). The DEMO uses a SEPARATE strict gradient parser (gradientParse/useGradientCSS, test-asserted correct) — no app path hits it; confined to the library FunctionValue serialize. |
| **U-F36** impersonation | **CONFIRMED** | Route is LIVE-reachable (app.ts:80 → POST /admin/impersonate behind ADMIN_TOKEN) and returns HTTP 200 with a functionally-inert token; the missing `expiresAt` also defeats the TTL reaper (dead rows accumulate). |
| **U-F37** no-auth Mongo | **CONFIRMED** | Bounded: mongo publishes no host port (internal bridge only), api loopback-bound 127.0.0.1:8130. Config-truth-lie (unwired MONGO_* vars) stands. |
| **U-F38** cleartext tokens | **CONFIRMED** | Mitigated only by the network boundary — which U-F37 shows is itself unauthenticated; the two compound. |

**Amelioration consolidation**: U-F30 (+relative-color leak) is a single-locus correctness fix (denormalize at `createColorValueUnit`, or normalize-on-construct — the design loop picks the invariant). U-F29/U-F31/U-F32/U-F33 are the **serialization/contract CLASS** the owner's E-3 binds together — one library-correctness wave, born-RED per defect, no cherry-picking. The publish/semver decision stays with the owner (§13.5).

## §16 NEW FAMILIES — COMPLETENESS FRONTIER (the critic; these are COVERAGE gaps, not new defects — they bound what a formation may claim)

| ID | Sev | Family | Gap → how to close |
|---|---|---|---|
| **U-F54** | **A** | `real-GPU-visual-oracle-never-run` | The headed-GPU oracle slate (O-1..O-26 live legs) was NEVER executed across all 3 rounds — the tranche-T core deliverable is verified only statically + SwiftShader-confounded headless. **Un-runnable in this headless env** → a FORMATION-TIME ACKNOWLEDGEMENT: U carries a real-GPU visual annex (owner-attested or a headed-CI lane), exactly as S/T did; not chased further. |
| **U-F55** | **A** | `ci-oracle-slate-no-teeth` (merges U-F1+U-F15+U-F42) + unmeasured a11y HARD gate | lighthouserc `accessibility:['error',{minScore:0.9}]` is a HARD gate NO lens measured — a second W9-close ambush beside CLS. → round 4 MEASURES it (closeable). The no-teeth CI slate → a U build row. |
| U-F56 | B | `authenticated-populated-surface-uneyeballed` | Login/save/publish/admin/populated Extract-Browse never driven live (empty-plate + unauth GETs only). → a U gestalt+a11y row over the authed surface. |
| U-F57 | B | `a11y-modality-gaps` | Zero coverage: real screen-reader, forced-colors/high-contrast, prefers-contrast, prefers-reduced-transparency, real-mobile touch, slider keyboard OPERATION. Source has ZERO forced-colors/prefers-contrast rules. → a U a11y hardening row. |
| U-F58 | C | `untested-web-modalities` | i18n/RTL (html has no dir), print (no @media print), PWA/offline (no SW/manifest), error-injection, long-session/memory (the iOS 294-frame class unprobed). → formation decides build-or-explicitly-out-of-scope per modality. |
| U-F59 | B | `unread-sources-of-record` | docs/precepts/* (live submodule, unopened), the pre-R owner-ask chain (A..Q + N U1-U33, inherited by chain-of-custody, never re-verified), the api test suite (never run — only tsc), assets/docs content. → round 4 reads/runs these. |
| U-F60 | C | `color-math-correctness-unaudited` | No lens audited the numeric color core (17-space conversions, Ottosson/raytrace gamut, deltaE, SPSA colorFilter, okhsl). Tests exist with external ground-truth + green, but soundness unverified. → round 4 spot-checks. |
| U-F61 | B | `single-sourced-claims` | X2 NCSU-301 (VPN-gated, both rounds), the CI TBT red (pure ledger claim, local understates), born-RED cure-ownership, the deploy-webhook repair — all single-sourced/network-unverified. → formation flags each as attested-not-verified. |
| U-F62 | C | `families-that-are-two-mechanisms` | U-F6 = the Q5 ramp resolver (color-math) + the O-14 proxy-oracle (instrument-class) — SPLIT them: the ramp cure (WR-8) and the oracle-class law ("every guard-constant gets a feasibility leg") have different owners/surfaces. |

## §17 NEW FAMILIES — BUILD/TOOLING + SUPPLY-CHAIN

| ID | Sev | Family | Mechanism | Disp |
|---|---|---|---|---|
| U-F63 | B | `npm-pack-ships-demo` | No `.npmignore` + a no-op `prepare` → a stale `dist/gh-pages/` (the whole demo app) ships inside the npm tarball (measured unpackedSize ~4.3 MB). | **build** (clean-before-pack or .npmignore) |
| U-F64 | C | `size-gate-blind` | CI gates `dist/value.js ≤145KB` but the file is a 14.9 KB post-split facade — core bloat now lives in hashed shared chunks the gate can't see. | **retire/re-anchor** (gate the chunk-graph total) |
| U-F65 | C | `lint-vacuity` | `npm run lint` is green over 680 files but ~every rule is OFF; only the src/ glass-ui import ban enforces anything (breadth genuine, depth ~nil). | **fold** (owner call: restore a real rule set or accept types+review) |
| U-F66 | C | `typecheck-stale-dist` | `npm run typecheck` resolves demo→value.js through `dist/*.d.ts` with no prebuild → silently passes against STALE published types. | **fold** (add a pretypecheck build, or accept the documented build-state dependence) |
| U-F67 | B | `api-hono-advisory` | `hono@4.12.2` (api runtime) carries an open advisory set; the reachable bodyLimit-bypass class is live, fix by an in-range minor bump. Other hono CVEs unreachable (no serveStatic/toSSG/hono-cors). | **build** (bump) |
| U-F68 | C | `glass-ui-lock-adopt-drift` | package-lock records file:glass-ui @ 4.2.0 but disk/symlink is 5.0.0 — the adopt gap is ALREADY LIVE locally; the lock's 4.2.0 is a false record. glass-ui 5.0.0 peers ARE satisfied (value 3.1.0, kf 5.2.0). | **fold** into the W7-adopt wave (the lock refreshes at the cut) |
| U-F69 | C | `parse-that-doc-lie` | CLAUDE.md:154 says parse-that "shipped 2.0.1"; registry latest is 1.0.0, spec/lock/node_modules ALL 1.0.0, caret `^1.0.0` forbids 2.x. The dep state is coherent; the prose is false. | **build** (canon-sync — joins U-F21) |
| U-F70 | C | `root-zod-orphan` | Root devDep `zod ^3.23.8` unused (0 imports in src/demo/test/e2e/scripts); all zod is api-side (own 4.4.3). | **retire** |
| U-F71 | C | `dev-toolchain-advisories` | Remaining npm-audit hits (esbuild/js-yaml/vitest/vite) are dev/build-only, none ship in dist. | **fold** (batch dev-dep bump) |

## §18 ROUND-4 STEERING (the convergence round)

Round 3 was NOT confirmatory — it surfaced build/dep/completeness families. Two-clean-passes rule ⇒ round 4 required. Round 4 CLOSES the closeable frontier gaps + runs the fresh-adversary completeness pass; if it surfaces no NEW material family, that + a clean round 5 = stability, and formation opens.

**Round-4 roster (4 agents, batches of 3; 29/32 after)**:
- `measure:a11y-hard-gate` (sonnet) — run the lighthouse accessibility category (the U-F55 unmeasured HARD gate) on dist/gh-pages, lane port :8196; report the score + top failures. Closeable.
- `read:unread-sources` (opus) — open docs/precepts/* (the submodule), RUN the api test suite (`cd api && npm test`), spot-check the pre-R owner-ask chain (A..Q + N U1-U33) for any genuinely-unaddressed ask, skim assets/docs content claims. Closes U-F59.
- `verify:color-math` (opus) — the U-F60 gap: confirm the color-science tests assert against EXTERNAL ground truth (Sharma CIEDE2000 table, known conversion vectors) and spot-check 3-4 conversions/gamut-maps for soundness against an independent reference. Closes U-F60.
- `adversary:fresh-completeness` (opus) — a skeptic who did NOT author the registry: attack it for the two-clean-passes rule — is any CONFIRMED finding actually wrong? any disposition unsafe to build on? what breaks if U forms on this registry today? Names anything that must move before formation.

**Real-GPU (U-F54)**: NOT chased — a formation-time acknowledgement (U carries a real-GPU visual annex, owner-attested). The headless env cannot run it; pretending otherwise is the close-class lie the charter forbids.
