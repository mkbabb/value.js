# N — The consummation tranche: boot-truth, design-system consume, deploy-truth, v1.0.0

**Tranche letter**: N — value.js's twelfth tranche (arc A..M → N). The tranche that lands the
two oldest mandates (aurora-derive, blob-extirpation) as *unilateral consumer work*, restores a
bootable demo + a deployed-truth backend, suffuses the house design language across every pane,
right-sizes the CRUD substrate (KISS), discharges the chronic keyframes library asks, and cuts
**v1.0.0**.

**Predecessor**: M (authored 2026-06-04, planning-only, **never ratified** — superseded here) on
L (api excision, CLOSED `66dcd68`) on K (W2 executed; rest superseded at M).

**Opened**: 2026-06-11, from a **32-lane + 5-verification-lane** deep audit (re-deployed in full
after a /tmp corpus wipe; the durable evidence base lives at `audit/lanes/`). Two sequential
fleets: 32 audit lanes (recap/substrate/design/API/forward) + 5 conflict-resolution lanes that
settled every inter-lane factual dispute with primary evidence (`audit/lanes/n-verify-V*.md`).

**Mode**: **planning-only at open**. N.W0 is DEV (this charter). N.W1–N.W9 are IMPL and dispatch
on explicit user ratification.

---

## §0 — Why N supersedes M

M was authored against the 2026-06-04 world; the world moved before ratification:

1. **M's cheap deletions shipped out-of-band.** The `development` export-key fossil (M.W1.A)
   was deleted at **0.11.1** (`4c8c532`); the 0.11.0 publish (M.W4) happened — and overshot to
   **0.11.2** — during the keyframes-F hand-off wave. M's lead lane and its spine head are moot.
2. **The cohort gate dissolved.** M gated blob (W7) and re-anchored aurora (W5) on a future
   "glass-ui 3.3.0." Verified at the registry (V1, V4): **glass-ui 3.12.0 ships `./goo-blob`,
   `./watercolor-dot`, `./aurora` (+`deriveAurora`, `deriveBlobPalette`), `./dock`, `./tabs`** —
   every producer the chronic mandates wait on is published. The blob/aurora waves are now
   **consumer wiring**, not cohort waits. (One nuance: glass-ui declares 3.11/3.12 *stale-lineage*
   publishes — the clean cut is 3.13.0; the demo therefore **holds `file:../glass-ui` until
   3.13.0**, then pins registry. V1 verdict.)
3. **The audit found P0s M has no home for**: the demo is **unbootable at HEAD** (a value.js-own
   import bug, §1); the committed api deploy artifact **cannot execute a single transaction**
   (compose.yaml runs standalone Mongo; 18 `withTransaction` sites require a replica set — V2);
   **production serves I-era code** — nothing from K.W2 onward ever deployed (V3).
4. **M's one durable premise carries**: the WithId read-side transposition (now **26** casts —
   25 strict + 1 parenthetical `forks.ts:206` — across 4 models; V2 count-exact) → N.W2.

M stays as the historical record; its still-live substance is re-stated here with corrected
anchors. **No legacy, including no legacy plan-debt.**

---

## §1 — Thesis: the three truths N restores, then the consummation

**Boot-truth.** `npm run typecheck` is RED — **91 errors** (1 TS2307: the glass-carousel
import; 16 TS7006 implicit-any fallout; 74 TS7016 because the stale local glass-ui dist ships
**zero `.d.ts`** under the `file:` symlink — K1 corrected the transient warm-dist "3" earlier
lanes measured) — and the demo white-screens on a clean server, with no gate catching either
(vitest/lint/api all green). First fatal: `ComponentSliders.vue:117` imports
`{GlassCarousel, GlassCarouselItem}` from `@mkbabb/glass-ui/glass-carousel` — a subpath and
symbols **no glass-ui version ever exported** (real: `./carousel`, `Carousel/CarouselItem`).
Latent twin: `BouncyTabs` (renamed `SegmentedTabs`) at `MixSourceSelector.vue:4` +
`PaneSegmentedControl.vue:18`. The stale local dist adds the local-only CSS fatal. N.W1 fixes
the consumer imports **gestalt** (the picker label rail is a static 3–5 item column — a
`role="tablist"` flex column, not a carousel; C1), makes a **dts-complete glass-ui dist a W1
precondition** (one clean sibling rebuild; the *standing* dts-emitting watch stays the §8 ask),
and installs the missing gate: a **CI boot-smoke** (headless mount + console-clean) + blocking
typecheck, so a sibling rename can never silently dead the demo again.

**Deploy-truth.** The wire at `api.color.babb.dev` runs code from 2026-05-29 (I-era `23a7b27`):
legacy `id`/`status` fields, no `published`/`atomSetHash`, J/K-era routes 404. The NCSU alias is
alive and byte-identical (DEC-9's retirement claim is false on the wire). The committed
`compose.yaml` cannot run transactions at all. N.W4 makes the deploy artifact true (single-node
`rs0`), ships the deploy-hook (Ask 3, the 4th and gating migration), deploys HEAD-lineage code,
adds `/health` `/docs` `/openapi.json` (inv-22-color), and refreshes the vhost.

**Type/contract-truth.** L's escape-class discipline completes read-side: all 4 model repos
return the driver's `WithId<T>`, the **26 casts delete** (N.W2). The cross-repo CRUD contract
gets honest: value.js and fourier emit **divergent problem+json `type` URNs**
(`urn:palette-api:problem:*` vs `urn:contract:*`) and the shared conformance matrix cites ~7
value.js test files that **do not exist** (D2) — N.W3 decides the URN convergence on value.js's
side and closes the conformance-test gap; the matrix correction is fourier's ask.

**Then the consummation.** With a bootable demo and shipped producers, the two oldest mandates
land (N.W5): delete the 1270-LoC flat-HSV blob fork and consume glass-ui's OKLCh lit-glass
spring-physics blob; wire `deriveAurora` (the AuroraPane stub dies); couple the hero blob to the
**live palette** (`deriveBlobPalette` → `paletteStops` — "the palette made flesh"). The design
language gets suffused app-wide (N.W6, the per-pane Fable design wave): audacious typography is
used in **1 of 14 panes** today; empty-states whisper; the celebratory motion tokens have zero
consumers; phantom classes silently no-op (`pastel-rainbow-text`, `glass-elevated`,
`dashed-well`). The chronic keyframes library asks (7-tranche carry) get their own wave (N.W7)
— including re-routing the F-handoff perf fleet onto the *real* demo path (it currently
optimizes a dead path: `lerpArray`/frozen-plan have **zero** non-test callers while the demo
runs unoptimized `mixColors`; E3/E1) and evicting prettier from the dist (54% of the 560.7KB
unpacked tarball is bundled prettier — it is not rolldown-external; the CI size gate measures
only `dist/value.js` and is structurally blind to it).

---

## §2 — Recap-coverage of ALL prompts and precepts (detail: `audit/prompt-coverage.md`)

| Mandate (source) | State at N-open | N disposition |
|---|---|---|
| **aurora-derive-from-color (oldest, 8+ tranches)** | producer shipped + published; `AuroraPane.vue` an "under rework" stub; `deriveAurora` consumed 0× | **N.W5.B** |
| **blob-extirpation (2nd-oldest, 8+ tranches)** | glass-ui ships the superset blob; demo fork (1270 LoC) live at 10+ sites | **N.W5.A** |
| dock C1 (focus/e2e) + DOCK-ANIMATION-CONVERGENCE | convergence spring inherited free; e2e blocked by boot-break, not reka | **N.W1** (boot) + **N.W5.D** (adoptions) |
| K.W2.5 mechanism-C remainder (self-alias→dist, band-aids, reka ^2.9) | all still live (A3) | **N.W1.C** |
| desktop-P0 `@source` (K.W2.6/M.W2.A) | directive still comment-only | **N.W2.B** |
| WithId escape class (L→M.W2.B) | 26 casts, `WithId` 0× (V2) | **N.W2.A** |
| color-resolver unification + parseCSSColor typing + PRM hole (M.W3) | 2 DOM resolvers; 11+2 casts; PRM hole dies with the fork | **N.W2.C** + **N.W5.A** |
| router-5 / modern-web / dispatch.ts / Palette-id / VITE_API_URL (M.W6) | all unaddressed | **N.W6.D** |
| infra Asks 3/5 + inv-22-color (M.W8) | hook never committed; CF-Pages unwired; 404s confirmed live (V3) | **N.W4** |
| **NEW 2026-06-11 (a): per-pane frontend-design audit + design-language suffusion** | C1–C10 corpus + C9 incongruence matrix authored | **N.W6** (standing Fable wave + work-orders) |
| **NEW 2026-06-11 (b): blob expressivity, satellite metaballing, place-in-pane** | C8/C8v2 design complete (consume + live-palette coupling; `uSatColor[]` = glass-ui shader ask) | **N.W5.A** + cohort ask |
| **NEW 2026-06-11 (c): value.js + fourier API/deploy-CI/CRUD audit — scale, simplicity, KISS** | D1–D6 + V2/V3 corpus | **N.W3** + **N.W4** |
| keyframes VJ next-slice (7-tranche chronic, 12 items) | all open (A4) | **N.W7** |
| "NO legacy / NO workarounds / idiomatic gestalt / KISS / no-contrivance" (standing) | — | the spine of N; §6 invariants |
| "fold chronically-deferred + deferred items" (×3 now) | — | `audit/fold-ledger.md` — every row dispositioned |

**Zero un-recapped prompts.** Two first-fleet kill-list claims were *refuted* by verification
and are recorded as NOT-dead (V5): `Katex.vue` (11 docs consume it), `ImagePaletteExtractor.vue`
(PaletteDialog renders it; the camera feature lives there).

---

## §3 — Topology: the spine is walked; what remains

value.js remains the **pure sink** (sole runtime dep `@mkbabb/parse-that`). Verified live (E6/V1):
keyframes 4.1.0 (registry) deps `@mkbabb/value.js@^0.11.1` (its local checkout declares
`^0.11.2`) ✓ both satisfied; glass-ui 3.12.0 peers
`^0.10.0 || ^0.11.0` ✓ satisfied (its *devDep* `^0.10.0` is stale — glass-ui-owned ask);
fourier-web pins `^0.10.0` (excludes 0.11.x — fourier-owned bump ask). **No producer blocks
value.js v1.0.0.**

Remaining version moves (N-owned unless noted):
1. **Hold `file:../glass-ui`** through W5 (against a *clean rebuilt local dist*), migrate to
   **`^3.13.0`** when glass-ui cuts it (3.11/3.12 self-declared stale-lineage) → the inv-N-6
   registry-consumption close. Add the 3.12.0+ transitive peers (`pencil-boil`,
   `perfect-freehand`) at that pin.
2. **Drop the phantom `@mkbabb/keyframes.js` devDep** (value.js imports it nowhere — E6).
3. **0.12.0** cuts after N.W7 (the library-asks wave); **v1.0.0** at N.W9 close.

---

## §4 — Wave schedule

| Wave | Disp. | Kind | Lanes | Hard gate |
|---|---|---|---|---|
| **N.W0 — Charter** | DEV | — | this doc + `audit/{fold-ledger,prompt-coverage,synthesis}.md` + `audit/lanes/` (the 37-lane evidence base) | committed; ratified |
| **N.W1 — Boot-truth substrate** | IMPL | unilateral | A: fix the 3 cohort-skew imports gestalt — carousel→`role="tablist"` label column (C1); `BouncyTabs`→`SegmentedTabs` ×2 (the full re-alias/abrogation census + migration table: `audit/abrogation-ledger.md`) · B: **CI boot-smoke** (headless mount + console-clean, **cold dep-optimizer cache**) + typecheck as a blocking gate + the **pin-bump abrogation sweep** (ledger §4: exports-map diff + retired-classes sweep — inv-N-10) · C: the mechanism-C remainder — self-alias→dist, retire `dedupe`/`fs.allow`/`check-types.mjs` band-aids, `dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)`, reka-ui `^2.0.0→^2.9` + lockfile guard · D: e2e back to green baseline (the 0-passed-of-37 was the boot-break) | typecheck 0 **against a dts-complete glass-ui dist** (one clean sibling rebuild = the W1 precondition; 74 of the 91 HEAD errors are its absence); demo mounts console-clean on a fresh server; e2e = green baseline; boot-smoke in CI |
| **N.W2 — Type hardening** | IMPL | unilateral | A: **WithId transposition** — all 4 model repos' read sigs → `WithId<T>`, formatters likewise; **all 26 casts delete** (incl. `forks.ts:206`); aggregation-boundary secondary escapes typed · B: desktop-P0 — live `@source` directive + CI emission probe · C: `parseCSSColor` typing root-fix at the parser annotation (`color.ts:593` `Value` + `:635` memoize — K1 corrected the `:239` cite) — deletes the 11 demo casts + 2 lib `as any`; collapse the **four** DOM color resolvers (`useMetaballRenderer:58`, `useMixingAnimation:28`, `useGradientInterpolation:37`, `useGradientCSS:25` — K2 corrected the count) onto the library-backed path (E1: rank-1 win/LoC) | `grep -E 'as \(?(Palette|ProposedName|Tag|AdminAuditEvent) &' api/src` → 0; `WithId` flows repo→formatter; api tsc 0 + 161 suite; desktop panes in-viewport; resolvers 4 → 1 |
| **N.W3 — CRUD right-sizing + contract honesty (KISS)** | IMPL | unilateral | A: orphaned-vote TOCTOU fix (`createdAt < sweepStart` filter) · B: right-size transactions — **18** sites (V2 byte-exact; D4's drop-walk used a 16 base) → a justified-each set, target **≤14** (drop toggleVote/login-touch/single-collection sites) · C: indexes — drop the 3 write-only `palette_versions` indexes; replace the lone `createdAt` with the `{deletedAt, visibility, createdAt}` browse compound (net-0; D1 proposes two further sort-path compounds — voteCount/forkCount — W3.C decides the full set); add the sessions **TTL index** (`expireAfterSeconds:0` on `expiresAt`) which deletes `deleteExpired` + the cron expired-session arm outright (NOTE, K1: `Palette.forkOfHash` is **live on the wire** — `format/palette.ts:74` — D4's delete-claim conflated it with the write-only `palette_versions` *indexes*; do not delete the field) · D: collapse dual cursor+offset pagination; fix the color-distance post-filter short-page contrivance · E: PATCH read-amplification 4→2 (ownership extractor returns the doc) · F: the remix `/diff` `forkedFromHash` arm — the stored `atomDiff` is write-only and the whole diff/remix surface has **zero in-repo consumers** (D4): serve it + wire the demo diff view (W6.D, the K-W3DIFF carry) or record cohort-only status and stop persisting · G: idempotency body-hash (the CS3.2 409 row) · H: **URN convergence decision** (adopt `urn:contract:*` or record divergence-by-design) + close the conformance-test gap (impersonate, sessions/colors, remix HTTP, revert-200; D5/E4) · I: **session-TTL contract reconcile** — the 7d mint (`auth.ts:36`) vs the spine's 30d contract leaves the 30d cron sweep dead code (`cron.ts:20`); align or record sanctioned divergence (K2/K3 caught this as a silent drop) · J: fork-count drift — `incrementForkCount` ungated vs gated decrement inflates the public count across delete/restore; recompute from `countForksOf` on restore (D1) | api suite green + new conformance tests; txn sites ≤14 justified-each; KISS review |
| **N.W4 — Deploy-truth (the Ask-3 wave)** | IMPL | unilateral infra | A: `compose.yaml` single-node `rs0` (the transactions P0) · B: commit `scripts/deploy-hook.sh` (rsync→git-checkout; the 4th migration that retires host `dispatch.sh`) · C: **deploy HEAD-lineage api to prod** (the wire is I-era) · D: `/health` `/docs` `/openapi.json` routes (inv-22-color) + healthcheck → `/health` · E: vhost refresh (`:8130`) + the NCSU-alias retirement decision recorded honestly (DEC-9) · F: `deploy-pages.yml` CI-gated CF-Pages (Ask 5) | a mutation succeeds on the committed artifact; wire envelope == HEAD format; 200s on the 3 endpoints; deploy via webhook |
| **N.W5 — Design-system consummation (the two oldest mandates)** | IMPL | semi-unilateral (clean local dist now; registry pin at 3.13.0) | A: **blob** — delete the fork (+`webgl-utils.ts`), consume `@mkbabb/glass-ui/goo-blob`; HeroBlob → thin consumer (autonomic hover-curious/click-happy via the component's grammar); BlobPane **re-authored** against the 8-atom config; **live-palette coupling**: `deriveBlobPalette` → `config.color.paletteStops` (≤4 stops; deep-watch repaints free) · B: **aurora** — wire `deriveAurora` picker→atmosphere; rebuild AuroraPane off the stub; kill the false-footer; **VAL-1 ship-or-KILL** here · C: **watercolor-dot** — consume glass-ui's superset (9 consumers; the PRM hole + global-filter risk die with the fork) · D: dock adoptions — glass-ui `useLayerTransition` (delta documented: spring vs CSS-width; `layerProps` shim retired), `DockSeparator` at the 13 div sites, document the `:show-rail=false` opt-out · E: phantom-class fixes — `pastel-rainbow-text` → a real shared utility (3 use sites, 2 outside its defining scoped style; K3); `glass-elevated` → `glass-floating`; `dashed-well` minted-or-removed; `stagger-children` (`ComponentSliders.vue:4` — the 4th phantom, K2) defined-or-removed | blob dirs deleted; aurora visibly palette-derived (π before/after); zero phantom classes; e2e green; π blob-footprint |
| **N.W6 — Design-language suffusion (the standing Fable wave)** | IMPL | unilateral | A: the **per-pane Fable design-audit wave** (C9 structure: W0 gate = boot-green console-clean on all 14 routes; ~10 per-pane Fable agents scoring 5 axes + house-suffusion vs latest glass-ui; 1 synthesis lane promotes recurring findings to app-level work-orders) — re-runnable as a standing facility · B: the suffusion work-orders — audacious-type ramp (the one-file `PaneHeader.vue` promotion to the display rungs lifts all 14 panes; empty states, the mix result, docs h1), glass-tier rebalance (today: picker = resting frost, the other 13 = flat wash — C9), empty-state CTAs with colorful pops, celebratory motion (the zero-consumer Family-B tokens at save/copy/publish), icon energy (semantic accent tints per view), dock first-paint (desktop boots as a 57px collapsed pill — open it) · C: per-pane corpus fixes — KaTeX `output:"html"` (the MathML matrix mangle), docs measure ~68ch + φ ladder, easing-curve as the gradient pane's hero motif + tokenized stroke, mix: skip/PRM the 2.9s gate + un-withhold the result + **gate the mix-canvas RAF** (`useMixingAnimation.ts:116,206` — the one LIVE un-gated loop; E1 corrected the M-era watercolor framing: that hole is dormant) + preview-honesty (preview averages sRGB while the result mixes OKLab), gradient stop affordances, picker dual-hero + thumb live-color, 1440px mix clipping, extract: thread `population`/dominance end-to-end + a dominant-color hero swatch (C4/K2), collapse the `ExtractPane`↔`ImagePaletteExtractor` ~90% duplicate to one shell (consumption ≠ non-duplication — K2 on V5's KEEP), delete the mounted-but-`display:none` `EditDrawer` (C1/K2) · D: modern-web — router 4→5 + typed routes + `VIEW_MAP` single-source; `dispatch.ts` hue-cluster → `mix.ts` (real decomposition); demo `Palette` id-honesty; delete the `VITE_API_URL` hack (typed degraded-backend) | per-pane DELTA evidence; type-ramp adopted ≥ the named surfaces; suites green |
| **N.W7 — Library asks (the kf next-slice) + perf-truth → 0.12.0** | IMPL | unilateral | A: the 12-item keyframes ledger — `linear()`/`steps()` parsers (E1/E2), `toAnimationString` (B1), output-space emit (B2), P3 egress gamut (B4), LRU memoize bound (F3/VJ-F6), path-geometry sampler (VJ-F1), diagnostics sink (VJ-F2), buffer-reusing unflatten (VJ-F4), identity-aware arity pad (MCI-5), `light-dark()`/`currentColor` sentinels (VJ-3), parse-that `^0.9` re-pin · B: **perf-truth** — route the demo's real interpolation onto the shipped fleet (`mixColors` → frozen-plan path) or demote `lerpArray` from the barrel (E1: the SoA idiom did not generalize — decide, don't carry); evict prettier from dist (rolldown `external` + optional peer or a `/format` subpath; 560.7KB → ~250KB unpacked; re-point the CI size gate at `npm pack` unpackedSize); prune the flat direct paths (oklab/oklch 1.03–1.08× — gamutMap dominates); endpoint-cache fixes (B3): container-resize AND `var()`-mutation staleness, unbounded memo growth, the stale docstring; F7 custom-name-shadows-built-in documented + tested; the parse-that `console.error` diagnostic leak; predispatch dedup (E1.B2) · C: cut **0.12.0** | kf `it.fails` witnesses flip; tarball < 200kB unpacked; benches re-run honest; 0.12.0 published |
| **N.W8 — Hygiene + reconciliation** | IMPL | unilateral | A: merge `tranche-f-handoff` → master via PR; CI green on master (the vite-8 fix + retired proof refs); retro-tag v0.11.2 annotated · B: commit the staged deletions; delete `$OUT`; `.gitignore` the class · C: precepts submodule — commit the 2 dirty authoring-site files + bump to canonical · D: doc-truth — RELEASE.md rewrite (5 contradictions), CLAUDE.md drift (indexes 26, parse-that, typecheck cmd, port, 11 docs pages, new exports), demo/CLAUDE.md one-liner · E: kill-list deletions — `useCardMenu`, `useCodeFormatting`, the `usePaletteExport` duplicate (**NOT** `Katex.vue`, **NOT** `ImagePaletteExtractor` — V5 refuted) | master green; tags == registry; submodule clean; docs match tree |
| **N.W9 — v1.0.0 close + π** | DEV (close) | unilateral (pin gated on glass-ui 3.13.0) | A: glass-ui `file:` → `^3.13.0` + transitive peers; drop the keyframes phantom devDep · B: the π paired before/after lane (DELTA.md per affected page; WebGL canvas rect + non-empty-pixel assertion — the precepts edict value.js authored) · C: re-confirm L's close on the post-N substrate · D: **v1.0.0** publish; `FINAL.md` | π green; v1.0.0 on the registry; all inv-N verified; FINAL.md = N CLOSED |

**DAG**: W1 precedes all demo-visible work (boot is the substrate). W2/W3/W4 are parallel-capable
after W0 (api lanes don't need the demo). W5 needs W1 + a clean local glass-ui dist. W6 needs W5
**and W2.B** (the per-pane wave's console-clean-on-14-routes gate requires desktop panes to
*render*, which is `display:none` until the `@source` fix — K2). W7 is independent (library-only)
— may run beside W2–W6. W8 anytime after W1; the master-merge waits for green. W9 closes
(registry pin gated on glass-ui's 3.13.0 cut — the ONE cross-repo wait, and it gates only the
final pin, not the work).

---

## §5 — Critical files (the binding sites)

| Surface | Files | Wave |
|---|---|---|
| Boot-break | `ComponentSliders.vue:117`, `MixSourceSelector.vue:4`, `PaneSegmentedControl.vue:18`, `vite.config.ts:37,49,195,254`, `scripts/{check-types.mjs,dev.sh:37}`, `.github/workflows/ci.yml` (boot-smoke) | W1 |
| WithId | `api/src/repositories/*.ts` (4 model read-sigs), `format/*.ts`, the 13 cast files + `forks.ts:206` | W2.A |
| parseCSSColor root | `src/parsing/color.ts:593` (`Value` annotation) + `:635` (memoize), the 11 demo cast sites, `color-utils.ts:25,37` | W2.C |
| CRUD | `api/src/{cron.ts:50-51,db.ts:41-91,routes/crud-list.ts,services/palette/{ownership,votes,forks}.ts,middleware/idempotency.ts,errors/index.ts:155}` | W3 |
| Deploy | `api/{compose.yaml,apache-vhost.conf}`, `scripts/{deploy.sh,deploy-hook.sh(new)}`, `api/src/index.ts` (health/docs/openapi) | W4 |
| Blob/aurora/watercolor | `demo/@/components/custom/{goo-blob/ (DELETE),watercolor-dot/ (DELETE)}`, `demo/@/lib/animation/webgl-utils.ts` (DELETE), `HeroBlob.vue`, `BlobPane.vue` (re-author), `App.vue:212,218-219`, `AuroraPane.vue` (rebuild) | W5 |
| Suffusion | `demo/@/styles/{style.css,typography.css}`, `Markdown.vue`, `Katex.vue:20` (+`useMarkdownHighlighting.ts:89`), the C1–C6 per-pane sites, `usePaneRouter.ts`/`viewSchema.ts` (router-5/VIEW_MAP) | W6 |
| Library | `src/{easing.ts,utils.ts:147,units/utils.ts:115,parsing/{serialize.ts:136-137,color.ts,units.ts},math.ts:48,units/interpolate.ts,index.ts}` | W7 |

---

## §6 — Invariants (structural; the proof-idiom stays retired)

- **inv-N-1 — boot-truth.** CI boots the demo headless and asserts mount + console-clean on
  every push; typecheck is a blocking gate. *The white-screen class of failure is structurally
  un-shippable.*
- **inv-N-2 — WithId completeness.** Zero `as <Model> & {_id}` casts (all forms, all 4 models);
  `WithId<T>` flows from the repository boundary.
- **inv-N-3 — one color-resolution path.** Exactly one CSS-color→RGB resolver, library-backed.
- **inv-N-4 — no bespoke design-system facility in demo/.** goo-blob, watercolor-dot,
  useLayerTransition forks deleted; consumed from glass-ui.
- **inv-N-5 — deployed-truth.** The production wire serves HEAD-lineage code; the committed
  deploy artifact can execute transactions; retired topologies are actually retired (or their
  docs say otherwise honestly).
- **inv-N-6 — registry consumption at close.** glass-ui `^3.13.0` (no `file:`), keyframes
  phantom devDep dropped, transitive peers declared (DEC-2 / inv-30).
- **inv-N-7 — zero phantom classes.** Every class name used in `demo/` resolves to a live rule
  (the P9 no-op-utility failure mode, killed).
- **inv-N-8 — contract honesty.** The problem+json URN scheme decision is recorded and
  conformance-tested; every shipped route has wire-level coverage; the cross-repo matrix cites
  only real test paths (value.js side; the matrix fix is fourier's).
- **inv-N-9 — PRM-complete.** Every continuous render loop gates `prefers-reduced-motion`.
  Verified census (E1): 8 RAF sites; the one LIVE hole is the mix-canvas loop (gated at W6.C);
  the watercolor fork's dormant hole dies with the W5 consume.
- **inv-N-10 — abrogation-truth.** Every glass-ui pin/dist move runs the standing abrogation
  sweep (`audit/abrogation-ledger.md §4`): exports-map diff, `.retired-classes.txt` sweep
  against demo class usage, typecheck vs the fresh d.ts, cold-cache boot-smoke, e2e. A sibling
  rename or retirement can break loudly at the bump, never silently in the tree — the three
  silencers (dts-less `any`-typing, the warm dep-optimizer cache, CSS classes that cannot
  error) are each defeated structurally.

---

## §7 — Befitting-keep (verified intact at HEAD; do not re-litigate)

All of L (V2/D1: as-any 0, as-unknown-as 1, envelopes typed, DI seam, 18 txn sites coherent,
161/161). The F-handoff release train (B3: high quality, zero new escapes, claims honest at
93–94% where docs said 99). K.W2's tsconfig split + OKLab dedup + api-lane + unified CI. The
token system, cartoon-shadow language, radii roles, z-tiers, glass-tier rules (C9: "excellent
and one-language"). The atomdiff/remix/publish subsystem (D4: "exemplary KISS"). The e2e
5-project architecture. The quantize SoA pipeline. `mix.ts`/`dispatch.ts` correctness.

---

## §8 — Cohort coordination (asks, not value.js writes — inv-16)

**glass-ui-owned** (paired-authored in its arm): the **3.13.0 clean-lineage cut**; devDep
`@mkbabb/value.js ^0.10.0→^0.11.0`; dts-emitting `build:watch` (C-DTS; the dist-flap that broke
this audit's visual lanes is the live cost); the **`uSatColor[]` per-satellite shader extension**
(the satellite-metaballing expressivity ask — satellites are geometry-only uniforms today;
spec: per-satellite stop index + smin color-weight threading, V4); an `AuroraConfig`
slider-section descriptor (BlobPane/AuroraPane re-author substrate); CH-4..8 primitive asks
ship-or-kill at the cut; **keep `.retired-classes.txt` current at every cut + changelog every
subpath/symbol rename** — the manifest the inv-N-10 abrogation sweep reads.
**fourier-owned**: conformance-matrix corrections (the fictional value.js test paths; the URN
rows per the W3.H decision); fourier-web `@mkbabb/value.js ^0.10.0→^0.11.0`.
**keyframes**: none blocking (4.1.0 satisfied by 0.11.2); the W7 ledger flips its `it.fails`
witnesses — notify at 0.12.0.

---

## §9 — Successor + deferrals

N targets **zero-deferral close**; v1.0.0 is the close. BOOK-with-trigger only: the glass-ui
3.13.0 pin (if the cut lags W9, v1.0.0 holds — the pin is the gate, not the work); CH-10
keyframes precept-pin (maintainer-signal); CH-13 fourier quiescence (fourier-owned). The
`uSatColor[]` expressivity extension lands when glass-ui ships it (a consume-only delta here).

---

## §10 — Mode + authority

Planning-only at open; N.W0 is DEV; N.W1–W9 dispatch on explicit user ratification.
Authority: the 2026-06-11 32+5-lane deep audit (`audit/lanes/`, `audit/synthesis.md`) under the
standing mandate — NO quick solutions, NO workarounds, idiomatic gestalt, architectural
transpositions for elegance/simplicity/performance, NO legacy, KISS, fold all deferrals, recap
all prompts. The model discipline held: orchestration/synthesis on the core model; fan-out on
opus/sonnet; the standing per-pane design wave (N.W6.A) runs on Fable per the mandate.
