# LANE R3 — Fold-ledger v2 (the second-fleet re-divination census)

**Lane**: R3 (fold-ledger v2). **Date**: 2026-06-12. **Branch**: `tranche-f-handoff` · HEAD `199fd15` + 0.12.0 published.
**Mode**: tranche-development ONLY — nothing implemented; this file is the durable artifact.

**Charge**: re-divine the fold-ledger after N's execution. Every BOOK / defer / handoff / residual /
advisory / carry born during W0–W5+W7 execution (or surviving from N-open un-landed because **W6 DIED
un-implemented**) gets a **disposition column** for the re-divined waves. The user-audit (U1–U33,
`user-audit-2026-06-12/LEDGER.md`) OUTRANKS prior claims and re-frames where the survivors land. Zero
silent drops.

**Method**: read the N-open fold-ledger (`audit/fold-ledger.md`), every N impl report
(`audit/impl/*.md`, 30 files), the abrogation-ledger, N.md §8 cohort asks, PROGRESS.md wave-status, and
the user-audit. Each row below is grounded (file:line / report:line). I verified W6 has **zero impl
reports** (`ls impl/ | grep -i w6` → none; PROGRESS.md:20 = "PLANNED"); every item dispositioned to W6
at N-open or born → W6 during execution is therefore **STILL OPEN**.

---

## §0 — The W6-death finding (the spine of this re-divination)

**N.W6 never executed.** PROGRESS.md:20 lists it **PLANNED**, gated on W2.B (in flight). There is no
`impl/W6*.md`. The only W6 artifacts are **"before" screenshots** in `impl/shots/w6/` (82 PNGs dated
Jun 12 04:xx, the pre-implementation Fable audit corpus) — captures, never a delta — plus **5 stray
probe scripts left untracked in the repo root** (`.w6a-audit{,2,3,4,5}.mjs` per `git status`), the
W6 Fable-audit residue that died with the wave and was never cleaned up (→ N.W8 hygiene, §5). Every N-open row
filed → **N.W6.{A,B,C,D}** is therefore **un-landed**, and every defer/handoff that an execution lane
routed → W6 (the W1D residuals, the W5-defectA dual-mount note, the W4-artifact openapi advisory's
demo-side surface) is **un-landed too**. The user-audit (28 screenshots, 33 findings) is overwhelmingly
**the same surface W6 was chartered to fix** — it is, in effect, the user re-auditing the un-executed
W6 wave from the live app and finding the design-language regressions N.W5+W7 left standing.

**Consequence for the re-divined waves**: W6's charter cannot survive as one monolithic "suffusion
wave." The user-audit decomposes it into per-surface work-orders (typography U1/U2/U31/U32; blob
U3/U30b; dock U6/U16/U12/U11; selects U7/U8/U23/U30a; controls U13/U14/U15/U20/U21/U28/U29; cards
U17/U18/U19/U22/U24/U26; docs U4/U5; easing U25/U27; functional U9/U10). The re-divination below names
**N2** waves (N-prime) as the disposition target for the survivors, because the user-audit re-opens the
tranche. I do **not** invent the N2 wave letters (that is the synthesis lane's call); I disposition each
row to a **named work-surface** + flag whether it is W6-orphaned, an execution-born BOOK, a cohort ask,
or a K-carry, so the synthesis lane folds with zero drops.

---

## §1 — N-open fold-ledger rows, RE-DISPOSITIONED

Source: `audit/fold-ledger.md`. Each row: its N-open fold → **landed?** (per PROGRESS.md + impl reports)
→ **re-divined disposition**.

### §1.1 — P0s (`fold-ledger.md §1`)

| ID | N-open fold | Landed? | Re-divined disposition |
|---|---|---|---|
| N-P0-1 demo unbootable | N.W1 | **YES** `d9c3b9f` (typecheck 0; boot-smoke PASS; CI boot-smoke wired) | CLOSED. Re-verify under the user-audit U1 "all fonts wrong / gray" — boot is fixed but the *visual* regression U1 reports is a NEW surface (font-token regression suspected) → **N2 typography** |
| N-P0-2 compose standalone Mongo | N.W4.A | **ARTIFACT YES** `e62567a` (rs0 mutation proof PASSED) | Artifact done; **the wire deploy is the W8 ceremony** (still PENDING) → **N.W8 deploy-ceremony** |
| N-P0-3 prod = I-era | N.W4.C/E | **NO** — deferred to W8 (`W4-artifact.md:130` "W4.C deploy to prod — deferred to N.W8 by the lead's binding sequencing") | **OPEN → N.W8 deploy-ceremony** (the wire still serves I-era code until the master-merge deploy fires) |
| N-P0-4 CRUD contract dishonest | N.W3.H | **YES** `fe3c00c` (urn:contract:* adopted; conformance tests added; api 161→214) | CLOSED (value.js side); the matrix fix stays fourier's ask (§3 cohort) |
| N-P0-5 release hygiene | N.W8.A | **NO** — W8 PENDING | **OPEN → N.W8 hygiene** (master merge, retro-tag v0.11.2, CI green) |

### §1.2 — Chronic spine (`fold-ledger.md §2`)

| ID | Item | N-open fold | Landed? | Re-divined disposition |
|---|---|---|---|---|
| CH-2 | aurora-derive | N.W5.B | **YES** `e32111c`+`ee458e5` (aurora palette-derived, paired screenshots) | **RE-OPENED by U33**: "background aurora completely broken — does not move, no shade variation." The N.W5 consume landed the *wiring* but the user finds it **static/dead on real GPU**. → **N2 aurora-defect** (software-GL probe `e59987ae` mis-fire OR deep-watch not re-deriving — U33's two hypotheses) |
| CH-1/CH-3 | blob + watercolor extirpation | N.W5.A/C | **YES** (fork dirs deleted, inv-N-4) | **RE-OPENED by U3**: blob "awful — hover broken+janky, colors FAR TOO WHITE (must derive from current color), NO orbiting satellite metaballs." The fork is gone but the *consume is mis-tuned* (paletteStops too pale; satellites absent) → **N2 blob-expressivity** + the `uSatColor[]` cohort ask (now load-bearing, §3) |
| CH-4..8 | glass-ui primitive asks | cohort @ 3.13.0 | **NOT CUT** (glass-ui 3.13.0 still uncut at HEAD) | **OPEN — cohort ask**; the user-audit *expands* this set: U7 (dropdown font = trigger), U8 (dropdown bounds/scroll), U15/U28 (slider first-class + thicker), U18 (watercolor ghost/dashed variant), U27 (easing selector port). → **N.W9 pin gate + §3 cohort** |
| CH-9 | `fs.allow` retirement | N.W1.C | **YES** (mechanism-C remainder landed `d9c3b9f`) | CLOSED |
| CH-10 | keyframes precept-pin convergence | BOOK | **BOOKED** (maintainer-signal; no trigger fired) | **BOOK-CARRY** → re-state in N2 §successor (unchanged) |
| CH-11 | wire-before-retire | N.W5 | **YES** (closed with CH-1/2/3 consume) | CLOSED structurally; the *retire* half (NCSU alias) is the W8 on-host item (see §2 W4 ceremony) |
| CH-13 | fourier Phase-0 quiescence | BOOK | **BOOKED** (fourier-owned) | **BOOK-CARRY** → re-state, fourier-owned |
| CH-14a | CF-Pages half | N.W4.F | **ARTIFACT YES** `deploy-pages.yml` authored (`W4-edge.md`) | Workflow authored, **never fired** ("No deploy fires now — the wire fires at W8") → **N.W8 deploy-ceremony** |
| CH-12 | speedtest CW | KILL (permanent) | killed | CLOSED — no carry |
| K-PARSE | parseCSSColor typing | N.W2.C | **YES** (`W2C.md`; 11 demo casts + 2 lib `as any` deleted at `color.ts:593/635`) | CLOSED |
| K-W26 | desktop-P0 `@source` | N.W2.B | **YES** `W2B.md` (live `@source` directive; W6-unblock satisfied per `W2B.md:113`) | CLOSED |
| K-DOCK | dock e2e 16 RED | N.W1 then re-verify | **PARTIAL** — boot fixed, but `W2-gate.md §3.3` + `W5-defectB.md` re-diagnose a **live dock-open defect** (collapsed-overlay intercept + spring-never-settles). `W5-defectB.md` fixed first-paint (`:start-collapsed=false`) → e2e 37/37 (`W1D-closure.md:236`) | CLOSED for e2e, but **U6/U16 RE-OPEN it as a design defect**: "dock animations take FAR too long; not sized properly between transitions; slow/laggy/jittery" → **N2 dock-motion** (needs a measured trace; cohort spring-tuning) |
| K-VAL1 | VAL-1 aurora-LUT ship-or-KILL | N.W5.B | **KILLED** (`W5B.md §5` — "no re-book; the chronic row closes here") | CLOSED — no carry |
| K-W3DIFF / K-PALID / K-INV5 / K-DISP / K-W5RT | PaletteDiff render · Palette id-honesty · VITE_API_URL · dispatch.ts decomp · router-5 | N.W6.D | **NO — W6 DIED** | **ALL OPEN → N2 modern-web** (the 5-item M.W6 carry, now twice-deferred: M→N.W6→N2) |
| L-SEED cron-txn | orphaned-vote TOCTOU | N.W3.A | **YES** `fe3c00c` (TOCTOU `createdAt<sweepStart` filter) | CLOSED |
| kf VJ ledger | 12 items | N.W7.A | **YES — ALL 12** (`9cd815e`; VJ-F1 path-sampler shipped IN FULL: `src/transform/path.ts` 21694 bytes + `test/path-geometry.test.ts` 18 tests; `W7A-primitives.md:77-84` "it shipped in full") | **ALL 12 CLOSED** (the BOOK-candidate flag was resolved to ship). The kf-side consume (`rotate:auto` tangent from `getTangentAtT`) is **kf BOOK** (§3.3) |

### §1.3 — Architectural transpositions (`fold-ledger.md §4`)

| ID | Transposition | N-open fold | Landed? | Re-divined disposition |
|---|---|---|---|---|
| T1 | WithId 26 casts → 0 | N.W2.A | **YES** `e4b5f60` (26→0 verified) | CLOSED |
| T2 | parseCSSColor annotation | N.W2.C | **YES** | CLOSED |
| T3 | 4 DOM color resolvers → 1 | N.W2.C | **YES** (resolvers 4→1) | CLOSED |
| T4 | carousel → role=tablist | N.W1.A | **YES** | CLOSED — but **U2/U14 RE-OPEN the rail's layout**: "numbers should not be strictly columnar"; "channel letters must center EXACTLY with sliders" → **N2 controls** |
| T5 | perf fleet on dead path | N.W7.B | **DECIDED** (`W7B-perf.md` — lerpArray KEEP; kf consume-edge refuted the demote premise) | CLOSED |
| T6 | prettier in dist | N.W7.B | **YES** (`W7B-dist.md` — 586→287KB; gate re-pointed) | CLOSED (honest re-target: ≤320KB not <200KB — d.ts are half the tarball; `W7B-dist.md:63`) |
| T7 | 18 txns → ≤14 | N.W3.B/C | **YES** (txns 18→14 justified-each) | CLOSED |
| T14 | session TTL index | N.W3.C | **YES** (sessions TTL `expireAfterSeconds:0`) | CLOSED |
| T15 | forkOfHash delete | REFUTED (K1) | — | CLOSED — no action |
| T16 | mix-canvas RAF PRM gate | N.W6.C | **NO — W6 DIED** | **OPEN → N2 design-suffusion (PRM)**; this is the **one LIVE un-gated RAF** (`useMixingAnimation.ts:116,206`, inv-N-9). Still a live PRM hole. |
| T17 | session-TTL contract drift | N.W3.I | **YES** (`W3-data.md`; 30d contract reconciled) | CLOSED |
| T18 | fork-count drift | N.W3.J | **YES** (`W3-txns.md:184` recompute from countForksOf on restore) | CLOSED |
| T19 | extract pane discards population/dominance | N.W6.C | **NO — W6 DIED** | **OPEN → N2 design-suffusion (extract)** |
| T20 | ExtractPane↔ImagePaletteExtractor 90% dup | N.W6.C | **NO — W6 DIED** | **OPEN → N2 design-suffusion (extract)** |
| T21 | EditDrawer display:none dead UI | N.W6.C | **NO — W6 DIED** | **OPEN → N2 design-suffusion (cleanup)** |
| T8 | dual pagination | N.W3.D | **YES** (`W3-txns.md:91` ListResult `{data,nextCursor,hasMore}`) | CLOSED |
| T9 | blob fork delete | N.W5.A | **YES** | CLOSED (consume mis-tuned → U3, §1.2 CH-1) |
| T10 | mood timers → autonomic circumplex | N.W5.A | **YES** | CLOSED structurally; **U3 RE-OPENS** ("hover broken+janky") → **N2 blob-expressivity** |
| T11 | flat blob → live-palette coupling | N.W5.A | **YES** (paletteStops coupled) | CLOSED structurally; **U3 RE-OPENS** ("colors far too white") → **N2 blob-expressivity** |
| T12 | useLayerTransition → glass-ui /dock | N.W5.D | **YES** (`W5-verify.md`; layerProps shim retired) | CLOSED — but the spring is what U6/U16 finds too-slow → **N2 dock-motion** |
| T13 | net-loss oklab paths prune | N.W7.B | **YES** (`W7B-perf.md`) | CLOSED |

### §1.4 — Kill-list (`fold-ledger.md §5`)

| Item | N-open verdict | Landed? | Re-divined disposition |
|---|---|---|---|
| useCardMenu / useCodeFormatting / usePaletteExport dup | KILL @ N.W8.E | **NO — W8 PENDING** | **OPEN → N.W8 kill-list** |
| Katex.vue / ImagePaletteExtractor.vue | REFUTED — KEEP | — | CLOSED — no action |
| gold-shimmer "undefined" | REFUTED | — | CLOSED |
| `$OUT` + staged CHANGELOG/CONTRIBUTING/VENDOR-POLICY deletions | N.W8.B | **NO — W8 PENDING** | **OPEN → N.W8 hygiene** (`$OUT` still present per git-status) |
| M's 3.3.0 anchors / M.W4 / glass-ui-P5 / bench-monitor | KILL | killed | CLOSED |
| VAL-1 | ship-or-KILL @ N.W5.B | **KILLED** | CLOSED |
| dashed-well / glass-elevated / pastel-rainbow-text / stagger-children phantoms | N.W5.E (inv-N-7) | **YES** (zero phantom classes, sweep green) | CLOSED — but **U18** re-frames `dashed-well`/the watercolor-ghost as a glass-ui variant ask → §3 cohort |
| A5's Ask-3/CF-Pages DISCHARGED | OVERRULED → N.W4 | artifacts authored, wire pending → **N.W8** | **OPEN → N.W8 deploy-ceremony** |

### §1.5 — Net-new deferrals (`fold-ledger.md §6`)

| Source | Item | N-open fold | Landed? | Re-divined disposition |
|---|---|---|---|---|
| glass-ui AX.W34/35/42 | delete forks on barrel availability | N.W5 | **YES** | CLOSED |
| glass-ui AZ FLEET | value.js 2nd consumer (Button icon-sm / Select size / clampLabel / Tooltip mono) | cohort @ 3.13.0 adopt @ N.W6 | **NO — W6 DIED + 3.13.0 uncut** | **OPEN → §3 cohort + N2 design-suffusion** (the user-audit U7/U30a amplifies the Select asks) |
| glass-ui AZ | proof:motion-suite ⇐ value.js easing stability | N.W7.A | **YES** (easing additions additive) | CLOSED — notify glass-ui (§3) |
| kf I/J | `^0.11.2` floor; 0.12.0 notify | N.W7.C | **0.12.0 PUBLISHED** | **NOTIFY-CARRY** → notify keyframes at 0.12.0 (kf BOOK, §3) |
| fourier | conformance-matrix corrections + `^0.11.0` bump | fourier-owned | fourier-owned | **CARRY** — fourier-owned ask (§3) |

---

## §2 — Execution-born BOOK / defer / handoff (born DURING W0–W5+W7; not in the N-open ledger)

Every item that an N execution lane created as a defer/BOOK/handoff/advisory/residual. Grounded to the
impl report that births it. **The W4 wire-deploy ceremony**, **DEC-9 on-host retirement**, the
**dual-mounted WebGL context note**, the **openapi source-vs-table drift advisory**, and the **R1/R2
e2e residuals** are all here, each with its re-divined disposition.

| # | Item (born during) | Source (file:line) | Nature | Landed? | Re-divined disposition |
|---|---|---|---|---|---|
| X1 | **W4.C deploy HEAD to prod** | `W4-artifact.md:130` "deferred to N.W8 by the lead's binding sequencing (no origin push, no manual CF deploy this lane)" | **defer → W8** | **NO — W8 PENDING** | **OPEN → N.W8 deploy-ceremony** (the gating P0-3 closure) |
| X2 | **W4.E NCSU-alias retirement (DEC-9 on-host)** | `W4-edge.md:38-44,137`; `W4-artifact.md:263-266` "retirement is an ON-HOST action item for the N.W8 deploy ceremony" | **handoff → W8 on-host** | **NO — W8 PENDING** | **OPEN → N.W8 deploy-ceremony (on-host)**: remove the `mbabb.fi.ncsu.edu/colors/` proxy block from the NCSU box's Apache config once `color.babb.dev` serves HEAD-lineage code. DEC-9's "retired" claim stays FALSE-on-wire until then; recorded honestly in the vhost header comment. |
| X3 | **CF-Pages first wire deploy** | `W4-edge.md:135` "no `wrangler pages deploy` run now; the workflow fires on the next green-CI master push (W8)" | **defer → W8** | **NO — W8 PENDING** | **OPEN → N.W8 deploy-ceremony** (the `deploy-pages.yml` first real run) |
| X4 | **openapi route-table vs SOURCE drift (no automated gate)** | `W4-artifact.md:287` advisory note 1: "no automated test gates table-vs-source drift… a source route added without a matching table row would be silently absent from `/docs` and `/openapi.json`" | **advisory** | **NO** (the table-vs-spec gate exists; the table-vs-source gate does not) | **OPEN → N2 contract-hardening** (a source-route enumeration test, or accept the review-discipline risk — record the decision). Low-risk; not a P0. |
| X5 | **rollback build_and_up does not clear intermediate container state** | `W4-artifact.md:226` advisory note: "a crashed container left in an `Exited` state could cause `up -d` to attempt to restart rather than re-create" | **advisory (operational)** | **NO** | **BOOK (operational)** → fold into the N.W8 deploy-ceremony runbook (benign in standard Compose lifecycle; note for first rollback exercise). |
| X6 | **Dual-mounted WebGL blob context (off-breakpoint pane paints nothing)** | `W5-defectA.md:152-161` standing handoff: "the `lg:hidden` + `pane-wrapper hidden` dual-pane layout keeps BOTH picker panes mounted, so the off-breakpoint pane holds a live 200×200 goo-blob WebGL2 context that paints nothing… worth a fix in the dual-pane-layout territory (sibling Defect-B / a W6 layout pass)" — VERIFIED LIVE: `demo/color-picker/App.vue:34` (`lg:hidden` mobile pane) + `:45` (`pane-wrapper hidden lg:flex` desktop pane), both mounting `GooBlob` (import `:115`) | **handoff → W6 layout** | **NO — W6 DIED** | **OPEN → N2 design-suffusion (layout)**: render one pane variant per reactive breakpoint, OR gate the off-breakpoint blob's WebGL init. A context-budget waste (2 live WebGL2 contexts where 1 paints). Relevant to U32 (dual-card desktop layout) + U3 (blob). |
| X7 | **W5-defectB: e2e open-idiom migration off `force:true`** | `W2-gate.md:222-225` "the specs' open step needs the new idiom (a real click on a settled trigger, or a keyboard open) — a legitimate spec follow-up to land **with** the dock fix" | **follow-up** | **YES** (resolved in `W1D-closure.md` — e2e 37/37 via `openView` dock path, no `force:true`) | CLOSED |
| X8 | **R1 residual: direct-hash boot leaves Palettes pane in hidden slot** | `W1D-closure.md:153-176,245-246` Residual #1: "`goto("/#/palettes")` direct mounts CurrentPaletteEditor only in the `display:none` slot… owner `usePaneRouter.ts`/`useViewManager.ts`" | **residual → W1 boot or W6.B first-paint** | **NO** (worked around in-spec via dock nav; app defect un-fixed) | **OPEN → N2 boot/pane-router** (direct-link robustness; `usePaneRouter.ts`/`useViewManager.ts` cold-hash slot hydration). Relates to **U11** "desktop missing the second right-most pane?" |
| X9 | **R2 residual: `availableTags` prop-shape console.warn under e2e stub** | `W1D-closure.md:178-193,249` Residual #2: "tags read resolves to Object not `Tag[]`… `[Vue warn] Invalid prop… Expected Array, got Object` (20×)… coerce `pm.tagEdit.allTags` to an array at `BrowsePane.vue:135`" | **residual → W3 or demo tags-data** | **NO** (warn only; suite green) | **OPEN → N2 demo-data-hygiene**: coerce/guard the tags read to an array at `BrowsePane.vue:135` → `SearchFilterBar.vue:145`. Non-fatal but un-fixed. |
| X10 | **CI glass-ui-build should run FULL build, not a partial** | `W1B.md:101`; `W1C.md:193` "W1.C §5 CI follow-up: ensure the CI glass-ui-build step runs glass-ui's full build, not a [partial]" | **CI follow-up** | **UNVERIFIED** (W1.B owns `.github/**`; W1.C did not touch it) | **OPEN → N.W8 hygiene/CI** (confirm the CI `glass-ui-build` step is the full build; the abrogation sweep inv-N-10 depends on a dts-complete CI dist) |
| X11 | **W7B endpoint-cache docstring names kf FrameCompiler SoA** | `W7B-dist.md:180` "`src/math.ts:45–48` docstring names keyframes.js's `FrameCompiler` SoA path (J.W6 S2 ADOPT)" | advisory | **DOCSTRING FIXED** per W7B (task #37 completed) | CLOSED |
| X12 | **dispatch.ts hue-cluster → mix.ts (real decomposition)** | recon `W7A-recon.md:680-681` "NOT a W7.A deliverable. Flag to the impl lane that touches transform decomposition… Record only." Also fold-ledger T (K-DISP) → N.W6.D | record-only / W6.D | **NO — W6 DIED** | **OPEN → N2 modern-web** (the K-DISP carry; twice-deferred) |
| X13 | **DESIGN.md catalog refresh** | `W5A.md:137` "(DESIGN.md catalog refresh is a W6/W8 concern)" | defer → W6/W8 | **NO — W6 DIED** | **OPEN → N.W8 doc-truth** (fold into the doc-truth pass; the blob/watercolor deletions changed the catalog) |
| X14 | **W2-gate WebGL interaction stability under sustained pointer** | `W2-gate.md:169-174` "the goo-blob/aurora RAF render loops must survive headless software rendering under interaction (or gate WebGL init behind a capability check the e2e build can disable)… N.W5 substrate" | disposition → W5 | **PARTIAL** — `W5-defectA.md` cured the *boot* hang (aurora→CSS fallback); the *sustained-interaction* SwiftShader residual is the renderer, "not the dock" (`W5-defectB.md:36,96`) | **BOOK (harness)** — the SwiftShader residual intermittency is a renderer artifact, not an app defect; the e2e config (`playwright.config.ts` SwiftShader pin) is the durable mitigation. Record; no app action. Relates to U33 aurora-on-real-GPU. |
| X15 | **U33 software-GL probe (`e59987ae`) suspected aurora mis-fire on real GPU** | user-audit U33 hypothesis (the W5 aurora consume + the new software-GL probe) | NEW (user-audit) | n/a | **OPEN → N2 aurora-defect** — the prime suspect for U33's "aurora does not move." Cross-check: does the `renderMode` consume mis-fire on real GPU → static CSS fallback always painting? |

---

## §3 — §8 cohort asks + K-carries (the cross-repo census)

Source: `N.md §8`. These are **asks, not value.js writes** (inv-16). Re-dispositioned against the
user-audit, which *expands* the glass-ui ask surface materially.

### §3.1 — glass-ui-owned (paired-authored in its arm; tranche BA pre-greenlight)

| Ask | N-open state | Landed? | Re-divined disposition |
|---|---|---|---|
| **3.13.0 clean-lineage cut** | uncut | **STILL UNCUT** | **OPEN — the ONE cross-repo wait** → gates only the N.W9 registry pin, not the work (N.md §9) |
| devDep `@mkbabb/value.js ^0.10.0→^0.11.0` | stale | glass-ui-owned | **CARRY** → glass-ui ask |
| dts-emitting `build:watch` (C-DTS) | the dist-flap that broke this audit's visual lanes | **MET at dispatch** (glass-ui watch emits 551 d.ts, PROGRESS.md:8) but the STANDING ask (watch always emits) is glass-ui-owned | **CARRY (C-DTS)** → glass-ui ask; the inv-N-10 abrogation sweep reads it |
| **`uSatColor[]` per-satellite shader extension** | satellites geometry-only uniforms (V4: "infeasible without shader change") | **NOT SHIPPED** | **OPEN + NOW LOAD-BEARING** → **U3** makes this the headline blob ask: "satellite blobs that orbit and meatball out, slightly-different shades of the current color, like deriveAurora." The satellite-metaballing expressivity ask is no longer optional. → **§3 cohort (priority)** + glass-ui BA arm |
| **`AuroraConfig` slider-section descriptor** | BlobPane/AuroraPane re-author substrate | **NOT SHIPPED** | **OPEN** → needed for the AuroraPane re-author (U33) + BlobPane (U3). → **§3 cohort** |
| CH-4..8 primitive asks (Select size, clampLabel, Tooltip mono, Button icon-sm, Tabs underline) | unshipped | **NOT SHIPPED** (ship-or-kill @ cut) | **OPEN — EXPANDED by user-audit**: U7 (dropdown font=trigger), U8 (dropdown bounds+scroll first-class — study keyframes.js easing-picker dropdown), U15/U28 (**slider FIRST-CLASS in glass-ui** + thicker), U18 (dashed/ghost watercolor-dot variant), U27 (**easing selector+configurator ABSTRACTED FROM keyframes.js INTO glass-ui**). → **§3 cohort (major glass-ui BA expansion)** |
| keep `.retired-classes.txt` current + changelog renames | the abrogation manifest | glass-ui-owned | **CARRY** → glass-ui ask (inv-N-10 reads it) |

### §3.2 — fourier-owned

| Ask | State | Re-divined disposition |
|---|---|---|
| conformance-matrix corrections (fictional value.js test paths; URN rows per W3.H) | `W3-contract.md:124` "fourier's ask" | **CARRY** → fourier-owned (value.js now emits `urn:contract:*`, so the matrix rows move DEFERRED-TO-VALUE.JS → ADDRESSED) |
| fourier-web `@mkbabb/value.js ^0.10.0→^0.11.0` (excludes 0.11.x) | N.md §3 | **CARRY** → fourier-owned bump ask |

### §3.3 — keyframes-owned (tranche K just authored)

| Ask | Source | Re-divined disposition |
|---|---|---|
| **0.12.0 notify** | N.W7.C `^0.11.2` floor honored; 0.12.0 cut | **0.12.0 PUBLISHED** → **NOTIFY NOW** (kf BOOK; the W7 ledger flips its `it.fails` witnesses) |
| MCI-5 pad re-wire (replace `new ValueUnit(0)` with `functionIdentityValue`) | `W7A-recon.md:741` "the kf pad re-wire is kf BOOK; the `it.fails` witness flips RED on that re-pin" | **kf BOOK** — value.js ships `functionIdentityValue`+`FUNCTION_IDENTITY`; the two-repo flip is kf's side |
| `color(display-p3 …)` keyframe animation | `W7A-emit.md:208` "kf BOOK" | **kf BOOK** — value.js emits output-space; kf consumes |
| `light-dark()`/`currentColor` per-target resolution | `W7A-parsers.md:129,185`; `W7A-recon.md:601` "the per-target fold is kf's FOLD (kf BOOK). value.js emits the sentinel" | **kf BOOK** — value.js emits the `"color-keyword"` deferred sentinel (`W2C.md:78`); kf resolves per-scheme |
| VJ-F1 path sampler / MorphSVG | `W7A-recon.md:373-376` "value.js-HANDOFF (BOOK)"; `W7A-primitives.md:77` BOOK-candidate | **VERIFY** (§1.2 kf-VJ): did it land in the 12 or get cut? If cut → **kf-coordinated BOOK** (value.js ships `src/transform/path.ts`, kf consumes `rotate:auto` tangent) |

### §3.4 — N.md §9 successor BOOKs (with trigger)

| BOOK | Trigger | Re-divined disposition |
|---|---|---|
| glass-ui 3.13.0 pin | the 3.13.0 cut (if it lags W9, v1.0.0 holds — the pin is the gate, not the work) | **CARRY** → N.W9 (still uncut) |
| CH-10 keyframes precept-pin | maintainer-signal | **CARRY** (§1.2 CH-10) |
| CH-13 fourier quiescence | fourier-owned | **CARRY** (§1.2 CH-13) |
| `uSatColor[]` expressivity | glass-ui ships it (consume-only delta here) | **PROMOTED to load-bearing by U3** (§3.1) — no longer a quiet successor-BOOK; it is the headline blob ask |

---

## §4 — User-audit findings mapped to the disposition (the re-divination key)

The user-audit (U1–U33) is the second fleet's canon and OUTRANKS the prior corpus. Each finding maps
to either a **re-opened** N row (above) or a **NET-NEW** work-surface. The lanes auditing each U-cluster
will ground the file:line; R3's job is the **fold disposition** so nothing drops. (Ownership column =
the initial hypothesis from the user-audit; the per-cluster lanes refine it.)

| U | Maps to | Disposition |
|---|---|---|
| U1 fonts all wrong / gray-dark | NEW (W6-orphaned: typography never suffused) | **N2 typography** — verify which font-family renders + why the wash went gray (suspect a styles-surface token regression) |
| U2 numbers not columnar | re-opens T4 rail | **N2 controls** (ComponentSliders layout) |
| U31 numbers larger/hero/fluid, card must NOT resize | NEW (the audacious-type ramp W6.B was chartered to do) | **N2 typography** (tabular-nums + ch-reservation + display ramp) |
| U33 aurora dead/static | re-opens CH-2 / X15 | **N2 aurora-defect** (PRIME suspect: software-GL probe e59987ae or deep-watch) |
| U32 contrived/not-modern; dual-card clamped desktop | NEW (the grand-hierarchy W6.B layout) + relates X6 dual-mount | **N2 layout** (grand hierarchy; clamp pathological wide/tall) |
| U3 blob awful/white/no satellites | re-opens CH-1/T10/T11 + `uSatColor[]` | **N2 blob-expressivity** + §3 cohort `uSatColor[]` (headline) |
| U30b blob bigger, absolute top-right | NEW | **N2 blob-place-in-pane** |
| U6/U16 dock too slow / not sized between transitions | re-opens K-DOCK/T12 dock-motion | **N2 dock-motion** (measured trace; cohort spring-tune) |
| U12 pane/card transitions not smooth; STANDARDIZE nomenclature | NEW + needs a nomenclature doc | **N2 dock-motion + doc** |
| U11 desktop missing 2nd right pane | re-opens X8 (R1 residual) | **N2 boot/pane-router** |
| U7 dropdown font = trigger | NEW glass-ui Select | **§3 cohort (glass-ui)** |
| U8 dropdown bounds+scroll first-class (study kf easing-picker) | NEW glass-ui + keyframes reference | **§3 cohort (glass-ui collision/scroll, kf reference mechanism)** |
| U23 dropdown open jerks | NEW glass-ui | **§3 cohort (glass-ui)** |
| U30a color-space dropdown more audacious | NEW demo+glass-ui variant | **N2 selects + §3 cohort** |
| U15 sliders FIRST-CLASS in glass-ui | re-opens CH-4..8 (new primitive) | **§3 cohort (glass-ui slider primitive)** |
| U28 slider too thin | NEW glass-ui/demo | **§3 cohort + N2 controls** |
| U20 skeletons too black, want glassy + spectrum-glass slider | NEW demo skeletons + glass slider | **N2 controls + §3 cohort** |
| U14 channel letters center exactly with sliders | re-opens T4 | **N2 controls (ComponentSliders)** |
| U13 component section lost the hairline ellipse veil card | NEW (regression) | **N2 controls (restore encapsulation)** |
| U21 pills not centered | NEW demo | **N2 controls** |
| U29 clipped items need hover state | NEW demo | **N2 controls** |
| U17 palettes/cards not rounded, shadow fighting, glass+cartoon-shadow | NEW (the depth-grammar) | **N2 cards/depth-grammar** |
| U19 components not rounded per language (two panes) | NEW | **N2 cards/depth-grammar** |
| U24 shadow too extreme, hairline wrong, PaletteCard → first-class w/ variants | NEW (PaletteCard componentization) | **N2 cards (PaletteCard variants: skeleton, glass)** |
| U26 black hairline wrong (glassy), shadow extreme | NEW | **N2 cards/depth-grammar** |
| U18 dashed outline = dashed/ghost watercolor-dot variant → glass-ui | re-opens dashed-well phantom (§1.4) | **§3 cohort (glass-ui watercolor-dot ghost variant)** |
| U22 not a proper watercolor ghost; UI refine | NEW glass-ui+demo | **§3 cohort + N2** |
| U4 no spacing definition↔about content | NEW demo docs | **N2 docs-styles** |
| U5 padding inconsistent; golden-ratio sectional padding | NEW demo docs (the φ ladder — fold-ledger had this as W6.C measure ~68ch + φ) | **N2 docs-styles (φ ladder)** |
| U25 easing area needs hierarchy | NEW demo | **N2 easing-pane** |
| U27 easing → first-class selector ABSTRACTED FROM kf INTO glass-ui | NEW cross-repo (the easing-curve port) | **§3 cohort (glass-ui port + keyframes source) — cross-repo tranche item** |
| U9 reset current color DOES NOT WORK | NEW functional bug | **N2 functional-defect (demo)** — highest-urgency functional row |
| U10 LAB→RGB quantization "nothing close" | NEW **LIBRARY** bug (highest-severity claim) | **N2 LIBRARY color-fidelity** — reproduce, diff vs reference impls, SOTA research (`src/units/color/`) |

---

## §5 — Disposition roll-up + zero-drop attestation

**Landed-and-CLOSED (no carry)**: N-P0-1 (boot re-verify excepted), N-P0-4; CH-9, CH-11, CH-12, K-PARSE,
K-W26, K-VAL1, L-SEED, kf-VJ (11 of 12); T1, T2, T3, T5, T6, T7, T8, T13, T14, T15, T17, T18; the four
phantom classes; X7 (e2e open-idiom), X11 (docstring); VAL-1 KILL; the M-anchor kills. **≈ 32 rows closed.**

**OPEN — re-divined to N2 / N.W8 / N.W9 (the survivors)**:
- **W8-bound (deploy + hygiene)**: N-P0-2 (wire), N-P0-3, N-P0-5, CH-14a, X1, X2 (DEC-9 on-host), X3,
  X10 (CI full-build), X13 (DESIGN.md), the kill-list (useCardMenu et al.), `$OUT` + staged deletions,
  A5's Ask-3/CF-Pages, **the 5 stray `.w6a-audit*.mjs` probe scripts** (W6-death residue, untracked
  at root). **≈ 14 rows.**
- **W9-bound (close, gated on glass-ui 3.13.0)**: the registry pin, transitive peers. **2 rows.**
- **N2 design-suffusion (W6-orphaned, the bulk)**: T16 (mix-canvas PRM — the one LIVE hole), T19, T20,
  T21, X6 (dual-mount WebGL), X8 (R1 pane-router residual), X9 (R2 tags-warn), X12 (dispatch→mix), the
  full K-W3DIFF/K-PALID/K-INV5/K-DISP/K-W5RT modern-web carry, **plus all 33 user-audit findings**
  mapped in §4. **≈ 40+ rows.**
- **Cohort asks (§3)**: glass-ui (3.13.0 cut, `uSatColor[]` PROMOTED, `AuroraConfig`, CH-4..8 EXPANDED
  by U7/U8/U15/U18/U27/U28, C-DTS, devDep, retired-classes manifest); fourier (matrix, web bump);
  keyframes (0.12.0 notify NOW, MCI-5 flip, P3 keyframe, light-dark, VJ-F1 verify). **≈ 18 cohort rows.**
- **BOOK-with-trigger carries**: CH-10 (kf precept-pin), CH-13 (fourier quiescence), X5 (rollback
  runbook), X14 (SwiftShader harness residual). **4 rows.**
- **VERIFY (one un-resolved status)**: kf-VJ VJ-F1 path-sampler — landed in the 12 or cut? Resolve
  before the N2 library wave plans. **1 row.**
- **ADVISORY (decision needed)**: X4 (openapi table-vs-source drift gate — add a source-route
  enumeration test or accept review-discipline + record). **1 row.**

**Net census**: ~32 closed · ~13 W8 · 2 W9 · ~40+ N2-design (incl. 33 user-audit) · ~18 cohort · 4
BOOK · 1 verify · 1 advisory. **Every row from the N-open fold-ledger, every execution-born
defer/handoff/residual/advisory, every §8 cohort ask, and every K-carry has a re-divined disposition.
Zero silent drops.**

**The headline re-divination**: **W6 died → the entire design-language surface re-opens**, and the
user-audit is the authoritative re-statement of it. The two oldest mandates (aurora, blob) landed
*structurally* at N.W5 but **regressed in tuning** under the user's eye (U33 dead aurora, U3 white
satellite-less blob) — the consume wired the wrong values, not the wrong code. The cohort glass-ui ask
surface roughly **doubled** (U7/U8/U15/U18/U27/U28 + the promoted `uSatColor[]`). The W8 deploy
ceremony (X1/X2/X3 + N-P0-2/3/5) remains the single largest un-fired closure cluster — production still
serves I-era code.
