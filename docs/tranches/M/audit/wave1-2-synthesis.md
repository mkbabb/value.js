# M — Two-wave deep-audit synthesis (the durable record)

The post-L deep audit that opened M. Two sequential 6-agent Workflow waves (12 agents),
read-only, planning-only. The per-lane full findings were written to `/tmp/m-w1-{A..F}.md` +
`/tmp/m-w2-E.md` (ephemeral); this file is the durable synthesis. Dispositions → `fold-ledger.md`;
prompt recap → `prompt-coverage.md`.

## Method

- **Wave 1 (value.js-internal, 6 parallel):** A prompt/precept coverage · B L post-close · C the
  live precept violation · D K.W2.6/W3-W6 + chronic frontend mandates · E architectural-transposition
  + elegance/perf sweep · F deferred/chronic census. **6/6 lanes emitted; 13 raw P0 IDs → 11 distinct after dedup.**
- **Wave 2 (cross-repo, 6 parallel):** A glass-ui 3.2.0 reality · B keyframes 3.0.0 · C fourier J.WC
  K.W4 asks · D ADOPTION-ASKS infra · E publish-spine · F wave-DAG. **Lane E emitted + filed; A/B/C/D/F
  hit the StructuredOutput-emission failure but their substance was recovered** (Lane E's structured
  return carried the publish-order; A/B/D from Wave-1-D + the orchestrator's own cross-repo recon;
  C from a direct read of `fourier J.md` + `WC-design-hierarchy.md`).

## The five load-bearing findings (what reshaped the plan)

1. **The `development` precept violation is LIVE and value.js is the SOLE constellation violator**
   (`package.json:27`; glass-ui stripped its 68 at AS.W2b, keyframes has 0). It is the v1.0.0
   release-gate blocker, the dual-instance root cause, and the thing the user personally directed
   abrogated. → M.W1, the lead lane.

2. **The cohort gates are SATISFIED but the anchors moved.** glass-ui shipped **3.2.0 with the
   aurora half only** (`deriveAurora` exists + tested; the blob-lift + dock-fix did NOT land —
   verified: no `goo-blob`/`watercolor-dot` in glass-ui src, `GlassDock.vue:359` `:inert` on raw
   `expanded`). keyframes shipped **3.0.0** (the router anchor). So C2 (aurora) is *consumable now*;
   C3 (blob) + C1 (dock) re-anchor on a **glass-ui 3.3.0** cut. The 7+-tranche "gated on absent deps"
   blocker is GONE — these waves are dispatchable.

3. **The publish-spine never executed in order** and is acyclic by construction. glass-ui cut 3.2.0
   against value.js **0.10.0** (0.11.0 was never published), so the aurora `cssToOklch` cast
   **survived**. The binding M order: **value.js 0.11.0 → glass-ui 3.3.0 (against 0.11.0) → consume →
   v1.0.0**. Only library edge into value.js is `glass-ui(lib)→value.js(lib)`; the demo→glass-ui edge
   is unpublished → no cycle.

4. **L under-measured its own headline invariant.** `as any = 0 / as unknown as = 1` are clean, but a
   third escape — `as <Model> & { _id: unknown }` — is pervasive: **25 casts / 13 files across 4 model
   types** (Palette ×17, ProposedName ×5, Tag ×2, AdminAuditEvent ×1; the 9 `: X & {_id}` *type
   annotations* are legit, not casts), `grep WithId api/src` = 0. Root cause: the repository layer
   declares `Promise<T|null>` instead of the driver's `Promise<WithId<T>|null>`. The gestalt fix
   (the 4-model read sigs → `WithId<T>`, 25 casts delete) is the symmetric twin of L.W2's filter-side
   branding, never done read-side. The gate must cover all 4 models — Palette-only leaves 8 siblings
   live. → M.W2.B.

5. **value.js src/+demo/ is already disciplined** (0 god-modules, exactly 2 `as unknown as`, 0 `as
   any`, clean barrel). The "PRM-RAF epidemic" is **constellation-wide, not value.js** — only ONE real
   un-gated continuous loop (`useWatercolorBlob`). The elegance wins are a *small precise set*, headed
   by collapsing the two divergent CSS-color→RGB DOM resolvers into one library-backed primitive — NOT
   a rote sweep. → M.W3. (This is itself a finding: M must NOT carry a blanket "gate all RAF" wave.)

## Cross-repo obligations (the cohort ledger)

- **value.js OWES (publish):** 0.11.0 (precept-clean + `parseCSSColor` typed) — the registry gate.
- **value.js is OWED (glass-ui 3.3.0, glass-ui's arm — inv-16, coordinated not written by value.js):**
  the W-LIFT blob primitives + subpath exports, the W-D `GlassDock :inert` realignment (unblocks
  value.js's 16 dock-Select e2e specs), the aurora cast-delete (against 0.11.0), dts-emitting
  `build:watch`, the value.js-devDep drop, + fourier's **K.W4 design primitives** (`asideSide`,
  inter-row divider-rule, label/sub token-hook, P5 inner-rounding — so fourier-J.WC can adopt them in
  the same cut).
- **keyframes:** a `build:watch` dts-emit cohort note (no publish; 3.0.0 already unblocks the router).
- **fourier-J ↔ value.js-J** atom-diff/publish cohort: **closed on value.js's side** (shipped green);
  fourier-J.WC continues independently.

## Net

11 distinct P0s, 11 chronic, 10 K-carry, 7 transpositions, 3 infra asks, 5 doc-drift — all folded
(`fold-ledger.md`). The two oldest user mandates (aurora C2, blob C3) land at M.W5/M.W7. The plan
re-baselines K (supersede, not patch) and closes at **v1.0.0**.
