# U — FINAL.md · the zero-drop DISPOSITION-LEDGER walk (the tranche close of record)

**Wave**: U.W-CLOSE (the terminal DAG sink over nine decided waves). **Date**: 2026-07-13.
**Branch**: `tranche-u`. **Verdict**: **CLOSED `complete_with_misses`** (PP-16) — the named residuals
are each recorded with an external gate, NONE rides UN-DECIDED to a successor tranche.

**What this is** (G-CLOSE-1): this file walks `DISPOSITION-LEDGER.md` **row by row** — every one of the
77 U-Fxx families (§A), every embedded chronic/disease class (§B), the three T-close carried books
(§B.1), the BI→BH bridge (§B.2), every prompt-recap row (§C — owner asks T-1..T-61 + edicts E-1..E-7),
the four exhaustive-census orphans (§C.1), and the retired-WINS set (§D). Each row carries its DECIDED
terminal disposition + a **one-line terminal-evidence cite** (the landed commit / gate-artefact for a
build; the sibling remediation cite for a fold; the recorded rationale for a retire; the structural-fact
document for an escalate; the book-register outcome for a booked `complete_with_misses`). The walk is
**GATE-BACKED** — `scripts/gates/proof-close-ledger.mjs` (`npm run proof:close-ledger`, CI-wired via
`test:dist`) parses this file against the ledger and RED-fails any dropped row or the Family-audit
invariant. **Zero silent drops.**

**Terminal-wave fact**: all nine upstream waves are CLOSED/decided; the glass-ui **v5 cut is STILL
UNFIRED** (`git -C ../glass-ui tag --list 'v5*'` → EMPTY; glass-ui HEAD `8b0f9acc` on `tranche/BI`).
CLOSE proves the zero-silent-drop contract; it fixes no defect except the CANON hygiene-retires the
book-register executed (U-F51/F52/F53). An un-taken publish cut is **NOT a miss** (PP-16 / G-CLOSE-5):
the fix LANDED and the cut is sequenced + owner-held.

**Precedence** (binds every row): owner verbatim → `audit/registry.md` (§8/§13.5/§16/§21/§26/§28/§28.3) →
`DISPOSITION-LEDGER.md` → `U.md` → `waves/U.W-CLOSE.md`. The registry WINS on divergence.

**Sources consumed** (stage-1 w-close/ docs, verified present): `audit/w-close/book-register.md` (the
B1..B14 live re-probe register — §BOOKS draws from it) · `audit/w-close/annex-packet.md` (the
owner-attest slate) · `audit/w-close/publish-presentation.md` (the version-cut packet, §13.5) ·
`audit/w-close/relay-close.md` (the relay verification). The nine `w-*-close-artefacts.md` carry each
family's terminal commit/gate cite.

---

## §A — the 77 U-Fxx families (each with terminal disposition + evidence cite)

| ID | Family | Owning wave | Disp | Terminal disposition + one-line evidence cite |
|---|---|---|---|---|
| U-F1 | ci-oracle-slate-nonblocking | U.W-ORACLE | build | **LANDED** `755a089` — G-ORACLE-1 born-RED→GREEN: un-owned `continue-on-error` 2→0, unrun projects 4→0, CI-teeth gate wired hard. Blocking-vs-soft posture = DECISION-PENDING-OWNER (B7). |
| U-F2 | adopt-trigger-disease | U.W-ADOPT | build | **DECIDED** `f0f2965` — G-ADOPT-1 ARMED born-RED; the 7 `tranche/BG` pin-retirement + named BI-acceptance constraints authored. Cut EXECUTION `complete_with_misses`, glass-ui `v5*` UNFIRED (B2). THE DISEASE ROW — its own wave. |
| U-F3 | q14-perf-redemption-uncloseable | U.W-PERF | escalate | **ESCALATE DELIVERED-as-structural-fact** `ca8dbca`/`a16e1f4` (`w-perf/u-f3-escalate.md`); G-PERF-3 ARMED-RED, LCP ~4919 local/5141 CI, RP-2 331.0 KiB JS-eager producer-gated on the unfired adopt; `lighthouserc.json:13` untouched (Q14 verbatim). Pole A/B owner (B3). |
| U-F4 | reduced-motion-dock-collapse | U.W-ADOPT | fold | **FOLDED → U-F2 BI-acceptance list** `b9a9290` — G-ADOPT-2 ARMED born-RED; PRODUCER-ONLY, demo EXONERATED (`overture.css` a CONFIRMED RED HERRING, §21). OA-B1 owner-attest, cut-gated. |
| U-F5 | blob-card-seat | U.W-VISUAL | build | **ANNEX-OWNER-ATTEST** `cfa8c31`/`be807ce` — seat box unchanged, inside the 1.6× overscan budget; visible-bead containment = OA-4/U-F54 real-GPU owner frame; producer GAP-L5→ADOPT. |
| U-F6 | q5-ramp-register + proxy-predicate-oracle | SPLIT (U-F62) | build | **SPLIT-HOMED**: ramp-half CENSUS-GREEN RETIRED `be807ce` (BR-3 per-stop L + WCAG, nearBlackSink=false → U.W-VISUAL); oracle-half `15e306e` (the feasibility-leg law, U.W-ORACLE G-ORACLE-2). |
| U-F7 | scene-transition-motion | U.W-VISUAL | build | **ANNEX-OWNER-ATTEST** `be807ce` — confounds ABSENT/ISOLATED (PKT-1 dist-clock · O-16-R1 clobber stubbed); OA-1 real-GPU swap-window frame owed (T-58 MANDATE) + wake-gray must-not-regress (`5cecdf2`). |
| U-F8 | generate-plate-species-chrome | U.W-VISUAL | build | **ANNEX-OWNER-ATTEST** `be807ce` — WatercolorDot swatch + 1-primary/2-quiet verb register GREEN; OA-2 SVG-filter organic-edge material owner frame; producer register → RELAY (BI `dd9af7cf`). |
| U-F9 | picker-header-spacing-regime | U.W-VISUAL | build | **CENSUS-RED RE-CURED GREEN** `cfa8c31`/`be807ce` (BR-5 at-rest · BR-9/BR-11 scrolled arm); BR-4 born-GREEN guard STAYS. P3 ScrollCardHeader (Pole B) → RELAY; OA-6 "one strip" gestalt → owner. |
| U-F10 | console-veil-material | U.W-VISUAL | build | **ANNEX-OWNER-ATTEST** `be807ce` — α light 0.443/dark 0.56, clarity window active; OA-3 GPU backdrop-filter translucency owner frame; veil primitive → RELAY. |
| U-F11 | collapsed-dock-swatch-seam | U.W-VISUAL | build | **ANNEX-OWNER-ATTEST** `be807ce` — DERIVE_SEAM_FLOOR=0.06 GPU-independent, dE2000 8.19–13.03 ≫ 2.3; the "reads as a deliberate derive-seam" WebGL gestalt → OA/U-F54 owner frame. |
| U-F12 | dark-scheme-derived-tint-muddiness | U.W-VISUAL | build | **ANNEX-OWNER-ATTEST · owner-ruling bracket Pole A/B UN-PICKED** `be807ce` — Pole B (C3-compliant) met as-built (C 0.0216); Pole A at its RED pole (needs a C3-ledger amendment); pole + clean/muddy read owner (OA-4). Coupled to U-F26 dock-icon 2.26:1. |
| U-F13 | dock-edge-clip | U.W-VISUAL (demo) + U.W-ADOPT/relay (producer) | build | **demo half CENSUS-GREEN RETIRED** `be807ce` (Tools true-button interior) + band `be807ce` (BR-10 72px invariant) + menuink `ccf4b30` (BR-14 computed); **producer clip/fade half** `b9a9290` (G-ADOPT-3, OA-B2 real-GPU/owner ONLY, cut-gated). |
| U-F14 | perf-ratio-nonportable-flake | U.W-PERF | build | **LANDED** `b3f4f76` — G-PERF-2 GREEN; premise re-anchored on the co-scaling parse-that normaliser + peak-of-15; 32/32 clean, re-probed live 2/2 at close. |
| U-F15 | o26-softwaregl-nonflip | U.W-ORACLE | fold | **FOLDED → U-F42's headed-GPU annex** `637686c` — O-26/O-3 re-hosted (can never flip on software-GL); undecided 2 → annex-hosted 2 (G-ORACLE-3). |
| U-F16 | untracked-CLS-gate | U.W-PERF | build | **LANDED** `a0d777d` — G-PERF-1 GREEN; mobile CLS 0.2146→0.0010 (−99.5%) over the settled box; PI-1 CLS budget row + per-wave CLS column added (the untracked-gate ambush closed). |
| U-F17 | q4-well-veil-silent-reversal | U.W-CANON | build | **AUTHORED** `e824bf2` — G-CANON-1 born-RED→GREEN; §4-amendment rows 0→1 (T.md "STANDS" superseded, reversal-locus named); `canon/q4-well-amendment.md`. |
| U-F18 | e5-addressed-half-unmet-paused | U.W-CLOSE (charter §W8-inheritance) | fold | **FOLDED → the W8-census** — E-5's §0.7 addressed-half absorbed into U's W8-terminal inheritance census (walked at §C); W8's remediation is the live counter-motion. |
| U-F19 | w8-remediation-live-defects | U.W-VISUAL/U.W-CANON (charter §W8-inheritance) | fold | **FOLDED → the W8-census**: T-56→U-F6, error-detail→U-F26, T-53 census-GREEN `be807ce` (BR-13 dark caster), AB-1 KaTeX census-GREEN `faa49ce` (CANON); the 9 producer reds→ADOPT relay. |
| U-F20 | doc-template-token-unsubstituted | — | retire | **RETIRED at root** — `${DATE}`/`[OWNER-undefined]` cured at rename; the harness lesson (Workflow args must be a JSON object) recorded. No wave (§D). |
| U-F21 | canon-structure-drift | U.W-CANON | build | **LANDED** `a31f2d1` — G-CANON-2 born-RED→GREEN; canon-sync-lies 4→0 (root+api Structure regen · README "15"→17 · +`demo/CLAUDE.md` +`demo/DESIGN.md`); joins U-F69; `test/dist/canon-sync.test.ts` (regenerable). |
| U-F22 | barrel-parity-drift | U.W-CANON | build | **LANDED** `43a196e` (wired `6bed451`) — G-CANON-3 STANDING CI-wired; barrel-drift symbols 10→0; `scripts/gates/proof-barrel-parity.mjs` re-probed GREEN at close (B5). |
| U-F23 | ground-record-forked-read | U.W-CANON | build | **LANDED** `faa49ce` — G-CANON-4 born-RED→GREEN; hand-duplicated boot constants 2→0 (vite `injectGroundTokens` single-source); dead `parseGroundRecord` retired; `ground-single-source.test.ts` 4/4. |
| U-F24 | dead-orphans + over-export-hygiene | U.W-CANON | retire + rule | **LANDED** `e57f541` — 3–4 true orphans retired (api `migrate-soft-delete`, `__resetServicesForTest`, the prng radii trio); the ~150 over-exports RULED leave-as-is (idiomatic aliases + testability seams). |
| U-F25 | gradient-stop-focus-invisible | U.W-A11Y | build | **LANDED** `87b4eca` — BR-1 born-RED→GREEN; dual-contrast focus ring (`focus-ring.css`) + WHCM `outline` fallback; `o27-focus-affordance.spec.ts` 5/5. |
| U-F26 | dark-accent-below-floor | U.W-A11Y | build | **LANDED** `6667eb05` — BR-2 born-RED→GREEN; `safeAccentAgainstSurface` (live-probed surface) 1.19→4.31:1 dark, light no-regression. The dock-icon 2.26:1 residual rides the U-F12 pole pick. |
| U-F27 | tap-targets-aria-polish | U.W-A11Y | fold | **FOLDED** `87b4eca` — BR-3 target-size (24px fine / 44px coarse hit-inflation, 20×20 dot held) + BR-4 unit-aware `aria-valuetext`; `slider-announcement.test.ts` 7/7. |
| U-F28 | kf-prm-expand-fixed-unreleased | U.W-ADOPT | retire | **STILL-BOOKED (WATCH)** (B1) — keyframes tags to `v5.2.0`, no tag past it; `grep` → 0 direct value.js kf imports (a standing GREEN structural fact); retires on kf's next tag. |
| U-F29 | parseCSSValue-silent-truncation | U.W-LIB | build | **LANDED** — LIB slate 20/20, `proof:lib-correctness` 10/10; LIB-G1 GREEN (loud-fail `CSSParseError` + `parseCSSSubValue→parseCSSValues`, no alias). Publish owner-held (B14/§13.5). |
| U-F30 | computed-color-normalized-serialization | U.W-LIB | build | **LANDED** — LIB-G2/G3a/G3b/G5/G6 GREEN (composite Locus-P; `CONVENTION_INVARIANT_LANDED=true`, zero co-migrants); the 4 consumer surfaces preserved (§28); `proof:lib-correctness` 10/10. |
| U-F31 | transform-single-axis-expansion | U.W-LIB | build | **LANDED** — LIB-G7 GREEN; `rotate(45deg)`→`rotateZ` (Z-only), `scale(2)` stays 2D, `translate(10px)` X-only. Rides U-F77 co-land (keyframes verifies at its cut). |
| U-F32 | math-trig-unit-leak | U.W-LIB | build | **LANDED** — LIB-G8 GREEN; `sin(30deg)`→unitless `0.5`, `calc(sin(30deg)*100px)`→`50px`. `proof:lib-correctness`. |
| U-F33 | gradient-stop-position-roundtrip | U.W-LIB | build | **LANDED** — LIB-G9 GREEN; positioned gradient stops round-trip to valid space-joined CSS. `proof:lib-correctness`. |
| U-F34 | library-naming-incoherence | U.W-LIB | fold | **FOLDED → library-coherence row** — LIB-G12 GREEN (STANDING parity); `{from}To{to}` drift set `[]`; every conversion export is `{from}2{to}`. |
| U-F35 | transform-2D-recompose-missing | U.W-LIB | fold | **FOLDED → library-coherence row** — LIB-G11 GREEN; `recomposeMatrix2D` round-trips ≈ M, `interpolateDecomposed` accepts the 2D shape. |
| U-F36 | impersonation-dead-credential | U.W-SEC | build | **LANDED** `469f840` — G-SEC-1 born-RED→GREEN (inert token→live 200; auth-driving test). Deployed-middleware live confirm deploy-dependent-flagged (B13). |
| U-F37 | db-trust-boundary | U.W-SEC | build | **LANDED** `2c35f6f` — G-SEC-2 GREEN; unwired `.env.example` `MONGO_*` vars 4→0 + the mongo-discipline precept residual written (`api/CLAUDE.md`). |
| U-F38 | db-token-at-rest | U.W-SEC | build | **LANDED** `469f840` — G-SEC-3 GREEN; session tokens cleartext `_id`→SHA-256 digest at rest (raw-read ≠ token). Deployed live confirm deploy-dependent-flagged (B13). |
| U-F39 | frontend-missing-security-headers | U.W-SEC | build | **LANDED** `217cd16` — G-SEC-4 GREEN (`_headers` CF-Pages artefact present). Live wire lacks CSP/HSTS/X-Frame-Options pre-deploy → deploy-dependent-flagged (B12, `curl` HTTP/2 200 nosniff-only). |
| U-F40 | admin-audit-attribution | U.W-SEC | fold | **FOLDED → U-F36's remediation** `469f840` — `admin_audit.actorSlug` null→`system:admin` on `c.var.adminActor` across the whole admin-route class (G-SEC-1 sub). |
| U-F41 | duplicate-ncsu-origin | U.W-SEC | escalate | **ESCALATE** `217cd16` (`sec/F41-ncsu-origin-escalate.md`, the `[U-F41-DEPLOY]` action item) — VPN-gated re-verify attested-not-verified, **ties X2** (B11 / §attested-not-verified claim 1). |
| U-F42 | vacuous-ci-tripwire | U.W-ORACLE | escalate | **ESCALATE** `637686c` — G-ORACLE-3; the 3 orphaned `test.fail()` 3→3 mapped BY NAME (O-16 clobber · O-26 aurora · O-5 boot); flips booked-not-held (B6 / §attested-not-verified claim 3). |
| U-F43 | slow-build-in-beforeAll | U.W-ORACLE | fold | **FOLDED (test-hygiene)** `637686c` — G-ORACLE-4; build calls in the unit suite 1→0 (moved to `test:dist`), ~70–80% wall-time drop; the `proof:dts-surface` guard preserved. |
| U-F44 | impl-detail-coupled-tests | U.W-ORACLE | fold | **FOLDED** `637686c` — `value-unit.test.ts` de-coupled from internal `superType`/`.value` nesting (snapshots defensible); no gate row (a test-quality decouple, not a live defect). |
| U-F45 | demo-cross-layer-inversion | U.W-DEMO | build | **LANDED** `616e84f` — G-DEMO-1 STANDING ESLint boundary gate; the color-spine resolver relocated to the shared layer (`@composables/color/view-accent`); spine→boot up-reach cured (B9). |
| U-F46 | session-token-triplication | U.W-DEMO | build | **LANDED** `d039952` — G-DEMO-2; 3 reactive token cells→1 canonical `sessionTokenRef`; dead `clearSession` twin deleted; `session-single-source.test.ts` 7/7. |
| U-F47 | colocation-e1-violation | U.W-DEMO | build | **LANDED** `616e84f` — G-DEMO-3a/3b STANDING ESLint gates; the primitive moved down, `palette-browser` barrel seam minted (B9). |
| U-F48 | demo-state-fragility-cluster | U.W-DEMO | fold | **FOLDED (one state-cluster row)** `7efc0b7` — G-DEMO-4; `usePaletteStore` module singleton + `COLOR_STORE_KEY` single-def + `Dock.vue` 7 watchers→1 computed predicate. |
| U-F49 | gitignore-auth-unanchored | U.W-CANON | build | **LANDED** `e57f541` — G-CANON-5 born-RED→GREEN; `.gitignore:8 auth/`→`/auth/`; the tracked-source silent-drop trap 1→0. |
| U-F50 | tracked-binary-bloat | U.W-CANON | retire | **LANDED** `e57f541` — G-CANON-7 born-RED→GREEN; the 58 MB N-tranche heapsnapshot `git rm` from tip + `shot-policy.test.ts`; history-rewrite BOOKED owner-decidable. |
| U-F51 | stale-local-branches | U.W-CANON | retire | **EXECUTED at close** (`book-register.md §2`) — 4 genuinely-dead `worktree-*` branches `git branch -d` (all 0-unique); every `master`/`tranche-*`/origin-tracked/live-worktree branch PROTECTED (DELETE-LAW). |
| U-F52 | scratch-accumulation | U.W-CANON | retire | **EXECUTED at close** (`book-register.md §2`) — 5 unreferenced untracked scratch dirs swept ~8.9 MB; `u-gestalt/` (VISUAL π-frames) + `u-bh-communique-draft.md` load-bearing → DEFERRED-with-rationale (not a drop). |
| U-F53 | worktree-prune-proof | U.W-CANON | retire (actionable) | **DEFERRED-WITH-PROOF at close** (`book-register.md §2`) — NO worktree passes the 4-clause law (the sole non-primary is the LIVE U.W-PERF-tail, +61 unique); `git worktree prune --dry-run` empty. |
| U-F54 | real-GPU-visual-oracle-never-run | U.W-CLOSE §G-CLOSE-4 (charter §real-GPU annex) | acknowledge | **THE OWNER-ATTESTED ANNEX** (`annex-packet.md`) — 11 owner-attest rows + the HG6 taste stub; the headed-GPU slate never ran in 7 rounds (SwiftShader). `complete_with_misses` with each real-GPU/owner frame obligation NAMED, NEVER a headless assertion (§21). |
| U-F55 | ci-oracle-slate-no-teeth + unmeasured-a11y-gate | SPLIT: a11y-half RETIRE · CI-teeth→U.W-ORACLE | retire + build | **SPLIT-HOMED**: a11y-half RETIRED (lighthouse a11y MEASURED 1.0 — not a W9 ambush, §D); CI-teeth-half LANDED `755a089` (G-ORACLE-1, same mechanism as U-F1). |
| U-F56 | authenticated-populated-surface-uneyeballed | U.W-A11Y | build | **LANDED** `42608eb` — BR-9 born-RED→GREEN over 5 populated states (7/7 smoke-admin); 2 defects cured (admin row-expander role · thrown-error boundary). OA-2 authed gestalt → owner (§owner-reserved). |
| U-F57 | a11y-modality-gaps | U.W-A11Y | build | **LANDED** `7335786` — BR-5/BR-6/BR-7/BR-8 GREEN (two-tier `forced-color-adjust`, tint 4%→0%, elevated `--muted-foreground`, 4 sliders operable). OA-1 fallback aesthetic-coherence → owner. |
| U-F58 | untested-web-modalities | U.W-A11Y | build-or-out-of-scope | **LANDED** `7335786`+`42608eb` — BR-10 RTL · BR-11 print GREEN; thrown-error a11y-half→U-F56 (`42608eb`), gestalt-half→VISUAL census; PWA/offline + long-session recorded explicitly out-of-scope (not silently dropped). |
| U-F59 | unread-sources-of-record | — | retire | **RETIRED (round-4)** — precepts read, api suite RUN, the pre-R owner-ask chain spot-checked, assets/docs skimmed. Recorded so no successor re-opens (§D). |
| U-F60 | color-math-correctness-unaudited | — | retire | **RETIRED (round-4: SOUND)** — the numeric core VERDICT SOUND (sRGB→XYZ ≤1.11e-16, OKLab ≤1e-6, CIEDE2000 3e-5, analytical≡raytrace ≤1.4e-4); no numeric defects. Recorded (§D). |
| U-F61 | single-sourced-claims | U.W-CLOSE | fold | **FOLDED (the close ledger FLAGS each)** — the §attested-not-verified section names all four (X2 NCSU-301↔U-F41 · CI TBT red↔U-F3 · born-RED cure-ownership↔U.W-ORACLE · deploy-webhook); G-CLOSE-3, never laundered to a false-green. |
| U-F62 | families-that-are-two-mechanisms | U.W-ORACLE | fold | **FOLDED (the U-F6 split-executor)** `15e306e` — records that U-F6 = the Q5 ramp resolver (→U.W-VISUAL) + the O-14 proxy oracle (→U.W-ORACLE); registry-hygiene bookkeeping (records G-ORACLE-2). |
| U-F63 | npm-pack-ships-demo | U.W-CANON | build | **LANDED** `6bed451` — G-CANON-6 born-RED→GREEN; tarball `dist/gh-pages/` demo payload 9→0 (`files` negation globs + `proof-pack-manifest.mjs` CI-wired). |
| U-F64 | size-gate-blind | U.W-CANON | retire/re-anchor | **LANDED** `6bed451` — G-CANON-8 STANDING; the 14.9 KB facade byte-count → chunk-graph total (192 917 B ≤ budget); `scripts/gates/proof-size-graph.mjs` re-probed GREEN at close (B5). |
| U-F65 | lint-vacuity | U.W-CANON | fold (owner call) | **LANDED (ACCEPT path)** `a31f2d1` — owner-call: the types+eslint+review posture formally ACCEPTED, a one-line lint-depth rationale in `CLAUDE.md`; no gate (owner-call). |
| U-F66 | typecheck-stale-dist | U.W-CANON | fold (owner call) | **LANDED (PRETYPECHECK path)** `6bed451` — owner-call: `pretypecheck: npm run build` (a src type change is now visible to the demo typecheck against a fresh dist); G-CANON-10 GREEN. |
| U-F67 | api-hono-advisory | U.W-SEC | build | **LANDED** `33391b2` — G-SEC-5 GREEN; hono `4.12.2`→`^4.12.25` in-range minor (bodyLimit-bypass advisory 1→0); `npm audit --omit=dev` clean. |
| U-F68 | glass-ui-lock-adopt-drift | U.W-ADOPT | fold | **FOLDED → the adopt cut** `f0f2965` — package-lock `~4.0.0`@:193 refreshes to 5.0.0 at the cut (G-ADOPT-1 sub-assertion); cut-gated (B2). |
| U-F69 | parse-that-doc-lie | U.W-CANON | build | **LANDED** `a31f2d1` — G-CANON-2; the "shipped 2.0.1" prose struck → pinned `^1.0.0`/1.0.0 (spec/lock/node_modules all 1.0.0); joins U-F21 canon-sync. |
| U-F70 | root-zod-orphan | U.W-CANON | retire | **LANDED** `6bed451` — G-CANON-9 born-RED→GREEN; the unused root devDep `zod` 1→0 (api's own `zod` untouched, separate tree). |
| U-F71 | dev-toolchain-advisories | U.W-CANON | fold | **LANDED (batch bump)** `6bed451` — dev-audit hits 2→1; the production audit (`--omit=dev`) clean (0); the residual esbuild low is dev/build-only (no in-dist reach). |
| U-F72 | test-ground-truth-circularity | U.W-ORACLE | build | **LANDED** `fc14c01` — G-ORACLE-6 (born-GREEN coverage); external-vector anchors added for `rgb2xyz`/`xyz2lab`/`xyz2oklab` (breaks the round-trip-only blindness). |
| U-F73 | test-ground-truth-incomplete | U.W-ORACLE | build | **LANDED** `fc14c01` — G-ORACLE-7 (born-GREEN coverage); the Sharma CIEDE2000 table completed (14→34 pairs: the large-ΔE + achromatic-transition pairs). |
| U-F74 | conversion-silent-gamut-map | U.W-LIB | fold | **FOLDED → library-correctness wave** — LIB-G10 GREEN; `{gamut:'raw'}` options-bag exposes RAW OOB channels (the default `map` unchanged); `proof:lib-correctness` 10/10. |
| U-F75 | precept-stale-label | U.W-CANON | retire | **RELAY-record** `e824bf2` — the stale `palette` precept label removed at source (upstream `origin/main` `8781ebb`); pin-advance BOOKED owner-decidable; `canon/precept-label-relay.md`. |
| U-F76 | shared-surface-coordination | U.W-PERF | build | **LANDED** `a0d777d` — G-PERF-4 the SETTLE-GUARD; the settled plate rect IDENTICAL before/after (`y=199 h=613`), mount guards o10/o11/o21 16/16; binds VISUAL→A11Y→PERF (B4). THE ORDERING LAW. |
| U-F77 | library-cut-adopt-ordering | U.W-ADOPT | build | **DECIDED** `e82d27a` — G-ADOPT-4 ARMED (4a build-time re-enumeration of the FOUR surfaces · 4b BOTH `^3.1.0` floors); the both-floor co-land sequenced; the version cut owner-held (B14/§13.5). THE CO-LAND ORDERING. |

**Family-audit invariant (machine-confirmed by `proof:close-ledger`)**: every integer 1..77 appears
exactly once above; **F6** and **F55** carry named SPLIT-homes (F62 is F6's split-executor bookkeeping,
homed at U.W-ORACLE); **F18/F19** route to the charter's W8-inheritance census (walked at §C);
**F20/F59/F60** retire (closed/cured, owning-wave `—`); **F54** is the owner-attested annex. Zero silent
drops.

---

## §B — the chronic / disease rows (the registry's embedded classes — each decided, each cited)

| Chronic class | Where embedded | Decided disposition + evidence |
|---|---|---|
| **adopt-disease** (glass-ui 5.0.0, ridden ≥3 tranches) | U-F2 (§1) | **build — DISEASE LAW: its own wave** (U.W-ADOPT `f0f2965`); the §1 design reds re-filed as EXPLICIT named glass-ui BI-acceptance constraints. Cut execution `complete_with_misses` (B2). |
| **Q14 / RP-2 perf-redemption** (the HARD close gate + 331.0 KiB JS-eager) | U-F3 (§1) + RP-2 (inline) | **escalate** (U.W-PERF `ca8dbca`): the structural fact handed to the owner (`w-perf/u-f3-escalate.md`); RP-2 is the payload arm, producer-gated on the unfired adopt (B3). |
| **cross-repo KEEP-BOOKED — the glass-ui BH relay set** (§1 producer reds + 9 carried-forward T reds + mixColors coupling) | §28 + §28.3 (`17e0f522`) | **decided via RELAY rows** — carried by U.W-ADOPT (BI-acceptance constraints `b9a9290`), U.W-VISUAL (U-F8/F10/F13 producer material, BI `dd9af7cf`), U.W-LIB (the convention co-migration, BI `6c3e1609`). Relay verified live (`relay-close.md`). |
| **cross-repo KEEP-BOOKED — the keyframes ask** (managed-stepper PRM-expand, fixed-unreleased) | U-F28 (§7) | **retire on their next tag** (U.W-ADOPT WATCH, B1) — keyframes tags to `v5.2.0`, no tag past it; 0 direct value.js kf imports. |
| **born-RED cure-ownership** (3 armed `test.fail()`: O-16 clobber · O-26 aurora · O-5 boot) | U-F42 (§13) | **escalate** (U.W-ORACLE `637686c`): all 3 owned born-RED + the headed-GPU annex; O-26 can never flip on software-GL (B6 / §attested-not-verified claim 3). |
| **the perf-flake gate** (the flagship dist ratio gate, non-deterministic even at idle) | U-F14 (§3/§10) | **build** (U.W-PERF `b3f4f76`): floors re-anchored on the co-scaling normaliser; 32/32 clean, re-probed 2/2 (B5-adjacent, G-PERF-2). |

Every chronic class terminates in a named wave; none rides un-decided. The disease-row law is honored
(U-F2 is its own wave; U-F3 is a named escalate).

---

## §B.1 — the T-close carried books (from `T/FINAL.md §5` HAND-TO-U — not registry-family-enumerated)

| T-close carried book | Decided U disposition + evidence |
|---|---|
| **The W8 HG5 demo-caps re-encapsulation** (`useAtmosphere.ts` 411 · `Markdown.vue` 408 over ≤400) | **U.W-DEMO §BOOKS** — a demo-hygiene lane (re-encapsulate below ≤400), verify-at-execution, NO gate; the verify-at-execution half rides U.W-DEMO's BOOK, the HG6 taste verdict is owner-reserved (`annex-packet.md §6`). Lands after the U-F11/U-F19 re-cures settle. |
| **The chronic cross-repo spec-status 7-set** (CH-10 · CH-13 · FN-7 · kf `resolveEasing` · R8-23 · R-5 · R-10) | **U.W-CANON §BOOKS** — a rolling spec-status WATCH row (no work; re-surfaces only if a trigger crosses the consume-edge). NOT a family, build row, or producer RELAY. |
| **DORMANT/PARK** (`Color.try()` 3 wraps · `usePaletteStore` schema-v1 migration · S.H3 Pratt) | **PARK — carried, no wave work** (re-surfaces only on a fired trigger). The `usePaletteStore` schema-version migration is DISTINCT from U-F48's per-call-factory concern. |

These three complete the `T/FINAL.md §5` HAND-TO-U fold — zero silent drop of a T-close handoff.

---

## §B.2 — the BI → BH inbox bridge (the glass-ui active-coordination redirect)

The T-era `f3f3c097`(BI) producer handoff is **CARRIED FORWARD, not re-issued** — its payload (the 9
BLOCKING reds + the booked swaps) rides U's **BH** relay of record (`17e0f522` + the U.W-ADOPT co-land
addendum). The owner's 2026-07-12 edict names **BH** as the relay-of-record channel; the producer's
LIVE coordination dir is **BI** (5 valuejs files, activity 2026-07-13). `relay-close.md` verified the
HONEST split read-only at sibling HEADs: **formation + A11Y @ BH** (`17e0f522` + addendum `bfa01512`);
**LIB-invariant @ BI** (`6c3e1609`) · **VISUAL @ BI** (`dd9af7cf`) · **dist-breakage @ BI** (`c66b5354`).
The redirect: at the fired cut the co-land ADDENDUM lands in the THEN-active dir (BI now), SUPPLEMENTING
— never superseding. No obligation stranded; foreign-tree fence honored.

---

## §C — the prompt-recap rows (owner asks T-1..T-61 + edicts E-1..E-7 — addressed-or-owning-wave)

**The still-red T-rows** → their U-Fxx family → owning wave → close disposition. Every T-row is walked;
discharged T-rows retire to §D:

| Owner ask (T-row) | U-Fxx family | Owning wave | Close disposition |
|---|---|---|---|
| T-30 · T-49 (blob card seat) | U-F5 | U.W-VISUAL | ANNEX-OWNER-ATTEST `cfa8c31`/`be807ce` (visible-bead containment owner frame). |
| T-10 · T-43 · T-56 (Q5 ramp register + the near-black wreck) | U-F6 (ramp-half) | U.W-VISUAL (+ oracle-half U.W-ORACLE) | CENSUS-GREEN RETIRED `be807ce` (BR-3); oracle-half `15e306e`. |
| T-14 · T-48 · T-58 (scene-transition motion, thrice-red) | U-F7 | U.W-VISUAL (real-GPU annex) | ANNEX-OWNER-ATTEST `be807ce`; OA-1 real-GPU swap-window frame (T-58 MANDATE). |
| T-54 · T-55 (generate plate species chrome) | U-F8 | U.W-VISUAL | ANNEX-OWNER-ATTEST `be807ce`; OA-2 SVG-filter material owner frame. |
| T-2 · T-51 · T-59 (at-rest header) · **T-61/T-42 B-01** (scrolled-header whole-contraction, §0.8 owner-verbatim — a DISTINCT arm) | U-F9 | U.W-VISUAL | CENSUS-RED RE-CURED GREEN `cfa8c31`/`be807ce` (BR-5 at-rest · BR-9/BR-11 scrolled); P3 ScrollCardHeader → RELAY. |
| **T-5** (picker active channel-rail seat; LANDED-partial P1-R1, owner-uncertified) | **U-F9-rail** (a DISTINCT arm) | U.W-VISUAL (W8-census) | CENSUS-GREEN RETIRED `be807ce` (BR-12 seat ≡ active rung). T-5's 2nd residual (P5/S-3 letter-rail, producer-gated) → U.W-ADOPT BH relay. |
| T-34 · T-50 (console veil material) | U-F10 | U.W-VISUAL | ANNEX-OWNER-ATTEST `be807ce`; OA-3 GPU backdrop-filter owner frame. |
| T-37 (collapsed dock swatch seam) | U-F11 | U.W-VISUAL | ANNEX-OWNER-ATTEST `be807ce`; the WebGL-field seam gestalt → OA. |
| T-36 · T-52 (dock edge clip) | U-F13 | U.W-VISUAL (demo) + U.W-ADOPT/relay (producer) | demo half CENSUS-GREEN RETIRED `be807ce`; producer clip/fade `b9a9290` (OA-B2, cut-gated). |
| **T-20** (P4 glass-ui Tabs pilling; PRODUCER-DECLINED → owner-escalated) | — (no value.js/demo family) | U.W-ADOPT relay (owner-escalation lane) | carried to the glass-ui BH inbox (`17e0f522`), owner-visible until the producer ships OR the owner accepts the decline; NOT a §2b pending red (already producer-DECLINED). |
| T-53 (dark caster) · AB-1 (About-KaTeX) | U-F19 residue | U.W-VISUAL / U.W-CANON (W8-census) | T-53 census-GREEN `be807ce` (BR-13); AB-1 census-GREEN `faa49ce` (CANON RETIRE-census). |
| **T-57** (WR-9 dock-band `--dock-h` floor; MEASURED +3.0px reflow; **T-31→T-57 re-bracket**) | U-F13 (dock-band arm — DISTINCT from the edge-clip) | U.W-VISUAL (W8-census) | CENSUS-GREEN RETIRED `be807ce` (BR-10 band 72px INVARIANT, scene shift Δ0.00px). |
| **T-39** (the Q14-pressure perf face; LCP 5141 / TBT 5988) | U-F3 (**LCP**) · U-F61 (**TBT**) | LCP → U.W-PERF · TBT → U.W-CLOSE | LCP the DECIDED escalate `ca8dbca` (B3); **TBT re-homed** — 187 ms local GREEN, only reddens on the 2-core CI runner → U-F61 attested-not-verified (§attested-not-verified claim 2, cross-ref U-F3). |
| **T-22 · T-47** (the easing surface; LANDED W6/W6.5 O-17 3/3, but the W8 easing critique pass UNFILED) | — (no §2 owner-eye family) | U.W-VISUAL W8-census | the unfiled-pass re-judge — AUTOMATIC census-red re-cure if opened RED, else RETIRE-with-the-O-17-cite `be807ce`. One of the three unfiled T.W8 passes. |

**The discharged T-rows** (T's own waves landed them fully — no owner-uncertified OPEN residual) →
retire into §D; recorded so no successor re-opens them. LANDED-PARTIAL rows are NOT discharged (T-5's
ACTIVE seat = the exemplar, routed above to U-F9-rail). The producer-gated LANDED-partial residuals
(T-1 → GAP-ARM, T-8 → GAP-L5, T-25/T-26/T-27 → GAP-L2/GAP-ARM/T-60) route to the §B glass-ui BH relay
set (`17e0f522`), NOT §D — no value.js-side cure to build. The 29 owner-uncertified T.W8 pi-audit LAND
rows inherit to the U.W-VISUAL W8-inheritance census (most fold to existing families; P1-R1/R2 →
U-F9-rail, P9-R4 → U-F13-menuink BR-14 `ccf4b30`).

**The edicts E-1..E-7** (status):

| Edict | Status in U |
|---|---|
| E-1 colocation grand edict | LANDED by T.W1; residue (U-F47) → U.W-DEMO build `616e84f`. |
| E-2 packet series → THE RELAY EDICT | STANDING invariant; U's cross-repo waves carry RELAY rows; the U-formation BH communiqué landed (`17e0f522`), verified live (`relay-close.md`). |
| E-3 no legacy / gestalt / architectural transposition | INHERITED binding; shapes U.W-LIB (fix the CLASS, no alias) + forbids demo overrides (U-F4). |
| E-4 fold ALL deferred items | DISCHARGED BY THIS LEDGER (every family + chronic + prompt-recap decided); this FINAL.md is the completion proof. |
| E-5 recap ALL owner prompts, verify addressed | DISCHARGED BY THIS §C; the §0.7 addressed-half residue (U-F18) → the W8-inheritance census. |
| E-6 process: Fable + frontend-design; opus/sonnet fanout | INHERITED process; U.W-A11Y + U.W-VISUAL ran designHeavy under Fable+frontend-design. |
| E-7 hardening/critique stage | INHERITED: T.W8 is E-7; U did not re-run it — U.W-VISUAL absorbed its terminal residue (the W8-census). |

---

## §C.1 — the exhaustive T→U handoff census residue (the RG-2 kill — four orphans homed)

| Census orphan | Decided U home + evidence |
|---|---|
| **boot-G** — the o12 boot-time backing-ratio oracle leg | **U.W-ORACLE §BOOKS** `15e306e` — the oracle-slate BOUNDS-EXPANSION decision recorded (mint the o12 boot-time backing-ratio leg OR the declined-note with rationale); parallels U-F1 + the feasibility-leg law. |
| **CC-1** — `.glass-wash` zero-fill (producer-gated packet P8 + the W3 consume note) | **U.W-ADOPT §BOOKS** — producer half rides packet P8 in the §B BH-relay set (`17e0f522`); the demo consume-half is a CONSUME-AT-CUT action booked to the adopt (E-3: no demo override of the producer fill). |
| **L8 / the L2..L16 open GLASSUI asks** (L8 = the 5th booking, ESCALATED) | **U.W-ADOPT §BOOKS / U-F2** `f0f2965` — the L2..L16 asks ARE the §1 design reds U-F2 re-files as EXPLICIT NAMED BI-acceptance constraints; L8's 5th-booking escalation recorded as a disease-adjacent signal; the per-item book-reverify = the adopt-cut ledger vs the rebuilt dist (G-ADOPT-1). |
| **W8-2 rest-floor F9.R1 producer knob** | **U.W-ADOPT §BOOKS / §B BH relay** — the F9.R1 rest-floor producer knob is a producer-gated residual that rides the adopt cut like the GAP-* reds (booked W7 in T); the PR-2 fence honored (no demo cure for a producer knob). |

**Census completeness**: the four orphans + the twenty-seven verified-homed rows account for EVERY
enumerated T-side handoff candidate — the RG-2 kill by construction. (HONESTY: this discharges the
*enumeration* residual; RG-1 stands — no retroactive claim that T's 7-round loop was clean.)

---

## §D — the §8 zero-drop WINS (retire — the successor must NOT re-fold these)

Recorded so no U reader re-opens what T genuinely discharged (registry §8):

- The `proof:*` Q13 disposition (retain-5 behavioral gates → CI-wired `test:dist`; excise-7 overfit).
- **X1** prod-api deploy + **X2** NCSU 301 (the two oldest owner orders; on-host claims verified via
  close artefacts — X2's VPN-gated re-verify rides U-F41/U-F61 as attested-not-verified, §attested-not-verified).
- `/remix` + `/diff` full excision · the duplicate `useDark` folds · the L1 Normalized/Display brand
  (PERMANENTLY RETIRED) · the doc 5→6 playwright-projects reconcile.
- **RETIRED / round-closed (no wave; recorded)**: **U-F20** (harness token, cured at root) · **U-F59**
  (unread sources — read/run at round 4) · **U-F60** (color-math — VERDICT SOUND at round 4) ·
  **U-F55-a11y-half** (lighthouse a11y MEASURED 1.0).

---

## §attested-not-verified (G-CLOSE-3 · U-F61 fold — the FOUR single-sourced claims, TRUE status)

BORN-RED HONESTY: each of the four claims below is **single-sourced / network-unverified / off-instrument**
at close. None is laundered into a verified green. Each carries its TRUE status + cross-reference.

1. **X2 NCSU-301** — the `mbabb.fi.ncsu.edu/colors/` alias re-verify. **TRUE status: attested-not-verified
   (VPN-gated)** — un-probeable from this env (no NCSU VPN); the repo record (`sec/F41-ncsu-origin-escalate.md`,
   the `[U-F41-DEPLOY]` action item) LANDED. **Ties U-F41**; book-register **B11**. NEVER asserted green.
2. **The CI TBT red** — the 5988 ms figure. **TRUE status: 2-core-CI-only, a pure ledger claim** — local
   TBT is **187/188 ms GREEN**; TBT reddens ONLY on the 2-core CI runner (registry §10:144). The 5988 CI
   figure is single-sourced from the ledger, not re-measured. **Ties U-F3**; book-register **B3**.
3. **The born-RED cure-ownership register** — the 3 armed `test.fail()`. **TRUE status: still-armed
   (booked-not-held)** — O-16 (`o16-computed-cascade.spec.ts:34`) · O-26 (`o26-aurora-perceptibility.spec.ts:57`)
   · O-5 (`o5-boot-pacing.spec.ts:48`) still ship RED; O-16/O-26 flip on the adopt cut, O-5 on the RP-2
   payload cut, **O-26 can NEVER flip on software-GL** (rides the headed-GPU annex). **Ties U.W-ORACLE**;
   book-register **B6**.
4. **The deploy-webhook repair** — **TRUE status: attested from close artefacts, network-unverified** —
   asserted from the repo record, not driven live from this env. Recorded honestly, not presented as
   verified.

None of the four is presented as verified. This is the anti-close-class-lie discipline: the close records
what was MEASURED versus what was ATTESTED.

---

## §BOOKS — the B1..B14 discharge table (consume `book-register.md`; every book live-re-probed at close)

Legend: **LANDED** (live standing guard, GREEN on the tree) · **STILL-BOOKED** (WATCH, named external
gate) · **complete_with_misses** (DECIDED, trigger-/frame-gated) · **DECISION-PENDING-OWNER**
(owner-reserved, presented) · **attested-not-verified / deploy-dependent-flagged** (off-instrument) ·
**RATIFIED-with-rationale**.

| # | Book (source wave) | Live re-probe outcome (this close) | Outcome |
|---|---|---|---|
| **B1** | U-F28 keyframes next-tag retire (ADOPT) | keyframes tags to `v5.2.0`, no tag past it; 0 direct value.js kf imports | **STILL-BOOKED (WATCH)** — gate: a kf tag > 5.2.0. |
| **B2** | glass-ui 5.0.0 cut-execution residual (ADOPT · U-F2/F68) | `git -C ../glass-ui tag --list 'v5*'` → EMPTY (UNFIRED); 7 `tranche/BG` pins live; lock stale `~4.0.0`@:193 | **complete_with_misses** — gate: the owner-gated `v5*` tag. Disease row DECIDED in-wave; only the cut execution is trigger-gated. |
| **B3** | U-F3 Q14 LCP adjudication (PERF · W9) | producer cut UNFIRED → the escalate structural-fact handed (`w-perf/u-f3-escalate.md`); `lighthouserc.json:13` untouched | **DECISION-PENDING-OWNER** — Pole A / Pole B bracket is the owner's; resolved to ESCALATE. |
| **B4** | U-F76 settled mount settle-guard (PERF) | settled plate rect IDENTICAL before/after (`y=199 h=613`); mount guards 16/16; CLS 0.0010 | **LANDED** — a live guard, RED-on-reseat. |
| **B5** | U-F22 barrel-parity + U-F64 size-graph (CANON) | `proof-barrel-parity.mjs` exit 0 (346 symbols); `proof-size-graph.mjs` GREEN (192 917 B ≤ budget) | **LANDED** — two STANDING CI-wired guards, GREEN on the tree. |
| **B6** | U-F42 born-RED cure-ownership register (ORACLE) | the 3 armed `test.fail()` still ship (O-16/O-26/O-5); cures UNFIRED | **STILL-BOOKED** — mapped BY NAME; O-16/O-26 flip on the adopt cut, O-5 on RP-2, O-26/O-3 ride the annex (→ G-CLOSE-4). |
| **B7** | CI-teeth soft-posture decision (ORACLE · U-F1/F55-CI) | gap-closure LANDED, gate wired HARD; the Pole-A hard-subset promotion PREPARED-but-RESERVED; no owner ruling on record | **DECISION-PENDING-OWNER** — default SOFT-but-OWNED; the blocking-vs-ratified-soft ruling is the owner's. |
| **B8** | U-F54 / O-26·O-3 headed-GPU annex attestation | the headed-GPU slate never ran in 7 rounds (SwiftShader) | **complete_with_misses** — gate: an owner-attested / real-GPU frame; cross-ref `annex-packet.md`. |
| **B9** | G-DEMO-1 + G-DEMO-3 ESLint import-boundary gates (DEMO) | `npm run lint` exit 0; boundary objects wired at `eslint.config.js:206/241/279` | **LANDED** — live import-graph guards, RED-on-re-inversion. |
| **B10** | the two adjacent shared-tree → app-root up-imports (DEMO) | both present in the COMPONENTS (feature) tree, not the gated color-composable layer | **RATIFIED-with-rationale** — a legitimate downward dependency; relocation deferred (no cycle-cut gain). |
| **B11** | U-F41 NCSU-origin on-wire re-verify (SEC → U-F61) | VPN-gated: un-probeable; the repo record LANDED | **attested-not-verified** — ties X2 (→ G-CLOSE-3 claim 1). |
| **B12** | U-F39 live security-header confirmation (SEC → U-F61) | `curl -sI color.babb.dev` → HTTP/2 200; nosniff ONLY; CSP/HSTS/X-Frame-Options ABSENT on the wire | **deploy-dependent-flagged** — the `_headers` artefact LANDED (G-SEC-4 GREEN); gate = the CF-Pages deploy. |
| **B13** | U-F36 impersonation + U-F38 token-at-rest live confirms (SEC) | deploy-gated: the deployed middleware is un-driveable from the tree; the born-RED tests + fix LANDED | **deploy-dependent-flagged** — the live-wire confirm is booked; gate = deploy. |
| **B14** | the library-correctness PUBLISH decision (LIB→ADOPT · U-F77) | the U-F29/F30 fix LANDED (LIB 20/20); the semver packet assembled (`publish-presentation.md`) | **DECISION-PENDING-OWNER (owner-held §13.5)** — PRESENTED-WITH-LANDED-FIX (G-CLOSE-5); the cut is the owner's. |

**Tally**: LANDED (B4·B5·B9) = 3 · STILL-BOOKED (B1·B6) = 2 · complete_with_misses (B2·B8) = 2 ·
DECISION-PENDING-OWNER (B3·B7·B14) = 3 · attested-not-verified/deploy-dependent (B11·B12·B13) = 3 ·
RATIFIED-with-rationale (B10) = 1 · RETIRED-on-re-probe = 0. **TOTAL B1..B14 = 14, zero silent drops.**
Every book reached a recorded discharge outcome with its live re-probe result and (where external-gated)
its named gate. Cross-ref `relay-close.md` for the relay obligations (formation@BH · A11Y@BH ·
LIB-invariant@BI · VISUAL@BI · dist-breakage@BI · co-land addendum STILL-BOOKED cut-gated · keyframes
co-migration STILL-BOOKED cut-gated).

---

## §owner-reserved — the terminal owner slate (PRESENTED, never ruled here)

CLOSE presents; the owner judges. Every item below POINTS at its stage-1 packet — this FINAL.md does NOT
rule, cut, or attest any of them.

- **The version cut / publish** → `annex-packet.md`-adjacent `publish-presentation.md` (§13.5): semver
  class FORCED MAJOR, the NUMBER owner-decides (recommended `4.0.0`); the both-`^3.1.0`-floor co-land
  (glass-ui peer + keyframes runtime); the FOUR consumer surfaces preserved-or-co-migrated (zero
  co-migrants). **An un-taken cut is NOT a miss (PP-16).**
- **The VISUAL ANNEX-7 owner-eye still-reds** → `annex-packet.md §1`: u-f5 · u-f11 · u-f8 · u-f10 · u-f12
  · u-f7 · zd3-microchrome — real-GPU / owner-eye frames, NEVER headless (§21 two logged false-reds).
- **The u-f12 Pole A/B bracket** → `annex-packet.md §4`: Pole B (C3-compliant) met as-built, Pole A needs
  a C3-ledger amendment; the U-F26 dock-icon 2.26:1 residual rides the pick. Owner picks; do NOT proxy.
- **The A11Y owner-attest rows OA-1 / OA-2** → `annex-packet.md §2`: the high-contrast fallback
  aesthetic-coherence (U-F57) + the authed+populated gestalt (U-F56); operability is machine-terminal
  GREEN, only the taste is owner-terminal.
- **The ADOPT annex rows OA-B1 / OA-B2** → `annex-packet.md §3`: U-F4 PRM-dock reads-correct-when-expanded
  + U-F13-producer edge-ring un-shaved — **CUT-GATED** (glass-ui v5 UNFIRED); ride forward with the
  cut-execution residual.
- **The U-F7 T-58 real-GPU swap-window MANDATE** → `annex-packet.md §5`: the swap-window read + the
  wake-gray must-not-regress; the confounds are ISOLATED but the compositor read is the owner's.
- **The T.W8 HG6 taste verdict** → `annex-packet.md §6` (STUB): DECISION-PENDING-OWNER, part of the
  coupled owner event (ratify U + close T as ONE); CLOSE fills no verdict.
- **The CI-teeth posture (B7)** → DECISION-PENDING-OWNER (no owner ruling on record; default SOFT-but-OWNED).

---

## §verdict — the tranche close (PP-16)

**Tranche U CLOSES `complete_with_misses`.** The zero-drop DISPOSITION-LEDGER walk is complete and
GATE-VERIFIED (`proof:close-ledger` GREEN): all 77 U-Fxx families, the 6 chronic classes, the 3 carried
books, the BI→BH bridge, every prompt-recap T-row (28) + edict (E-1..E-7), the 4 census orphans, and the
retired-WINS set reach a DECIDED terminal state with a one-line evidence cite. The Family-audit invariant
is machine-confirmed (F1..F77 each once; F6/F55 split-homed; F18/F19 → W8-census; F20/F59/F60 retire; F54
the annex). The four U-F61 single-sourced claims are FLAGGED attested-not-verified, never laundered.

**The named residuals do NOT block close** — each is recorded with its external gate named, and NO
UN-DECIDED family rides to a successor tranche (re-booking is forbidden):

- the **trigger-gated glass-ui 5.0.0 cut** (U-F2/F68/F77 DECIDED; the cut is owner-/USER-gated, UNFIRED —
  gate: the `v5*` tag);
- the **VPN-gated NCSU re-verify** (U-F41/U-F61 attested-not-verified — gate: the NCSU VPN);
- the **deploy-dependent live confirmations** (U-F39 headers · U-F36 impersonation · U-F38 token-at-rest —
  the repo artefacts LANDED; gate: the deploy);
- the **owner-un-attested annex frames** (U-F54 / U-F7 + the §2 still-reds — gate: a real-GPU/owner frame,
  NEVER headless);
- the **un-taken publish** (U-F77/§13.5 — the fix LANDED, the cut sequenced + owner-held; PP-16 / G-CLOSE-5:
  an un-taken cut is NOT a defect);
- the **U-F3 Q14 LCP escalate** (DELIVERED-as-structural-fact — gate: the producer cut in-window OR an
  owner-ruled re-scope, never a gate re-baseline).

**The coupled owner event** (ratify U + close T as ONE: master-merge+tag · Q14 ack · T.W8 HG6 verdict) is
the owner's — never crossed here. CLOSE proved the tranche's zero-silent-drop contract, flagged the
honest caveats, presented the semver-loaded publish decision, and pointed the real-GPU annex at the owner
— against a real-GPU/owner frame, never a headless assertion.

---

**Precedence chain** (restated): owner verbatim (§13.5) → `audit/registry.md`
(§8/§13.5/§16/§21/§26/§28/§28.3) → `DISPOSITION-LEDGER.md` → `U.md` → `waves/U.W-CLOSE.md` → this FINAL.md.
The registry wins on divergence; the owner's verbatim wins above all. **Zero silent drops.**
