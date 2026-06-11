# N — Deep-audit synthesis (the durable record)

The 2026-06-11 audit that opened N. Mandate: a 32-agent parallel deep audit of the plan, waves,
and all changes; a frontend-design audit of every UI pane; a blob-expressivity comparison; a
value.js + fourier API/deploy-CI/CRUD audit (KISS); fold all deferrals; recap all prompts;
**planning only**. Model discipline: orchestration/design/synthesis on the core model (Fable);
fan-out on opus (judgment lanes) and sonnet (mechanical lanes).

## Method + fleet history

1. **Fleet 1** — 32 lanes (6 recap · 4 substrate · 10 design · 6 API · 6 forward; opus×19,
   sonnet×13), findings to /tmp. 25/32 emitted; 7 died on server-side rate limits.
2. **Fleet 2 (recovery)** — the 6 lanes that left no findings re-ran; 6/6. (C8's file had
   survived its emission-step death.)
3. **Fleet 3 (verification)** — 5 lanes (V1–V5) settled every inter-lane factual conflict with
   primary evidence (registry tarballs, live curls, byte-exact greps, a clean-server boot) and
   redeployed C8 (`lanes/n-audit-C8v2.md`). All 5 emitted.
4. **The /tmp wipe** — the entire fleet-1/2 findings corpus was deleted from /tmp mid-session.
   The structured summaries survived in the workflow journals; on the user's "re-deploy all, no
   exceptions" order the full 32-lane fleet re-ran (fleet 4) writing to the durable
   `audit/lanes/` base. 19/32 landed; 13 rate-limited again.
5. **Fleet 5 (gaps)** — the 11 true gaps re-ran throttled (3 sequential batches of 4/4/3);
   11/11. C8's original design prose was lost in the wipe and **subsumed into the V4
   re-derivation** (`lanes/n-audit-C8v2.md`); `C8.md` is its lane-naming-completeness copy
   (byte-identical — one logical artifact, not two).
6. **Fleet 6 (critics)** — 3 adversarial opus critics (facts / completeness / mandate-fidelity)
   reviewed the drafted charter against the substrate: 3× *sound-with-fixes*; their findings
   (incl. the typecheck-91 and forkOfHash-is-live corrections, 5 silent drops, the resolver
   count, the W6⟵W2.B DAG edge) were folded pre-commit (`lanes/n-critic-K{1,2,3}.md`).

**Net**: 37 distinct lane identities + 3 critics, 89 agent runs, ~8.5M subagent tokens.
`audit/lanes/` = 31 unique lane files + the C8 duplicate + 4 verification files + 3 critic
files + shots. Zero lanes unaccounted for.

## Environment lessons (recorded for the next fleet)

- Port 5173 belonged to an unrelated app ("Connectivity Atlas"); the demo binds 9000. Opus
  visual lanes self-corrected from source; the lane brief must state the port and a wrong-app
  guard.
- The shared dev server churned (lanes/playwright spawning servers; the vite dep-optimizer
  cache in `node_modules/.vite` *masks* the glass-carousel skew on warm servers and *surfaces*
  it on clean ones) — visual lanes need their own per-lane ports and an explicit
  may-not-boot fallback protocol.
- glass-ui's live `build --watch` flaps its dist (the dangling `segmented-tabs.css` window) —
  the dts/CSS-emitting watch ask (C-DTS) has a measured local cost: it broke an audit fleet.
- Rate-limit hygiene: 16-concurrent opus fleets get server-limited; throttled sequential
  batches of ≤4 complete cleanly. Findings must be written to durable paths *before* the
  structured emission (the emission step is where rate-limit deaths strike), and /tmp is not
  durable even intra-session.

## The verdict stack (what reshaped the plan — detail in `lanes/`)

1. **The demo is unbootable at HEAD by value.js's own hand** — the `./glass-carousel` import
   never existed in any glass-ui version (V1); `BouncyTabs` is latent; typecheck RED; e2e 0/37;
   gh-pages build fails; **no gate catches white-screen**. → N.W1 + inv-N-1.
2. **The cohort gate dissolved** — registry glass-ui 3.12.0 ships every producer (blob,
   watercolor, aurora+`deriveAurora`+`deriveBlobPalette`, dock, tabs; V1/V4); the two oldest
   mandates are consumer wiring. Pin strategy: hold `file:` (3.11/3.12 self-declared
   stale-lineage), registry pin at the 3.13.0 cut, by explicit range (E6: naive `^3.x` pulls
   3.12.0). → N.W5, N.W9.
3. **Deploy-truth is broken twice** — the committed compose artifact cannot execute any of the
   18 transaction sites (no replica set; V2), and production serves I-era code (nothing after
   2026-05-29 deployed; NCSU alias un-retired; V3). → N.W4 + inv-N-5.
4. **L's discipline completes read-side** — 26 `as <Model> & {_id}` casts (V2 byte-exact,
   incl. the `forks.ts:206` parenthetical the first count missed) → `WithId<T>`. → N.W2.A.
5. **The F-handoff train is high quality but optimized a dead path** — zero non-test callers
   for the interpolation fleet while the demo runs `mixColors`; prettier is bundled into dist
   (54% of the tarball); the endpoint cache has var()-mutation + memo-growth edges (B3/E1/E3).
   → N.W7.
6. **The design language is genuine but confined** — the tokens/radii/z-tiers/glass rules are
   excellent and one-language (C9), but audacious type lives in 1 of 14 panes, the aurora is
   palette-blind, empty states whisper, celebratory tokens have zero consumers, and 3 phantom
   classes silently no-op (V5). → N.W6 + inv-N-7.
7. **The blob decision is consume-not-improve** — glass-ui's OKLCh lit-glass spring blob is a
   strict superset (C8/V4); the expressivity mandate lands as live-palette `paletteStops`
   coupling + the `uSatColor[]` per-satellite shader ask (infeasible as a uniform feed today —
   V4 corrected C8). → N.W5.A + §8 ask.
8. **CRUD is disciplined; the wins are right-sizing** — exemplary atomdiff/idempotency (D4),
   but: TOCTOU sweep, maximal transactions, write-only indexes/fields, dual pagination, a TTL
   index that deletes cron code, URN divergence + a conformance matrix citing fictional tests
   (D2). → N.W3 + inv-N-8.

## Verification corrections (claims that died — keep them dead)

- `Katex.vue` and `ImagePaletteExtractor.vue` are **consumed** (11 docs pages; PaletteDialog +
  camera) — NOT dead code (V5 refuted fleet-1 E2).
- `gold-shimmer` **is defined** (glass-ui `base.css:335`) — the admin pill claim was wrong (V5).
- The published glass-ui 3.12.0 CSS is **clean** — the dangling import is local-dist-only (V1
  refuted the fleet-1 B2/C-lane "published defect" framing).
- The PRM hole is the **mix canvas**, not the watercolor fork (dormant) — E1 corrected M's
  framing.
- A5's "38-line" WithId count conflated casts with annotations; the cast truth is 26 (V2).
- Per-satellite blob color is **not** a uniform feed — it needs a shader extension (V4
  corrected C8's E1 design point).
- The "typecheck RED ×3" several lanes reported was a transient warm-dist measurement; the
  reproducible truth is **91** (74 of them from the dts-less local glass-ui dist) — K1.
- `forkOfHash` is **not** dead storage (live at `format/palette.ts:74`, on the wire) — K1
  refuted D4's delete-claim; only the 3 `palette_versions` *indexes* are write-only.
- Registry keyframes 4.1.0 deps `^0.11.1`, not the `^0.11.2` its local checkout declares — K1.
- A5's Ask-3/CF-Pages "DISCHARGED" verdicts were overruled (the deploy-hook is absent from the
  tree) — K2 arbitration; the asks stay OPEN.

## Disposition

Synthesized into `N.md` (charter), `PROGRESS.md` (board + verified-counts), `fold-ledger.md`
(every chronic/deferred row), `prompt-coverage.md` (the cumulative mandate ledger). N awaits
ratification; nothing here authored code.
