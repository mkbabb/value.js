# K.W0 — Path-forward synthesis (2026-06-02)

The reconciliation of the 5 W2-pathforward audit dimensions + the 3 new session
mandates + the ceremony-shedding decisions into a single planning disposition.
This document authors **no code**; it is the standing record of *what K keeps,
what L inherits, and what the project deliberately deleted*.

---

## §1 — The structural decision: SPLIT-K-PLUS-L

**Decision.** K stays as authored and **absorbs two folds** (dev.sh/deploy.sh
standardization + the visual-evidence protocol). A **new successor tranche L**
holds the `api/` backend **legacy-excision + transposition** charter; L's IMPL
dispatches only **after K.W2 restores the green substrate**.

**Rationale.** All five audits converge on one finding: K is
**frontend/cross-repo-cohesion-dominant**. Every IMPL row in `K.md §5` and every
gate in `§6` targets `demo/`, glass-ui source, `tsconfig`, e2e, View-Transitions,
or the router. The *only* `api/` scope K already owns is the I-tail CRUD
residuals (folded into K.W2's api-lane). Two audits independently surfaced a
coherent `api/`-domain backlog K does **not** carry — 3 grounded legacy-debt
items + 5 gestalt transpositions (see §2 ledger rows L-1..L-8). The user's third
mandate is **self-classifying**: *"a fastidious backend legacy-excision refactor
(next tranche)."* "Next tranche" is a disposition, not an ambiguity.

Folding a full backend excision into K would (a) overload K's 6-wave
cohort-coordinated schedule, (b) inject `api/` churn into the K.W2–K.W3
brittleness window (`K.md §8`) already mid-transposition across two repos, and
(c) blur K's crisp thesis (acyclic color topology + glass-ui-first + the two
oldest mandates). The idiomatic resolution — **K keeps only what it already
owns; L inherits the rest** — honors NO-legacy (the debt has a named home +
triggers, not silent carry) and NO-workarounds (every L fix is structural
removal or transposition, never a shim). This is the project's own AB+1 /
C-precedent retire-and-fold cadence: **L opens planning-only at K.W6 close,
dispatches after.**

**The one apparent contradiction, reconciled.** The precept-conformance audit
recommended folding `sessionToken`/`status`/`as any` into K.W2–W4; the
deferred-ledger honors "next tranche." These reconcile: the `status`-field
consumer sweep *touches* demo surfaces K.W5 also touches, so a narrow coupling
exists — but it is a coupling, not a merger. K closes the demo-side typing; L
removes the api-side field. The seam is clean.

---

## §2 — Consolidated deferred-ledger

Every chronic + deferred item across the arc, with a binding disposition:
**SHIP** (lands in a named K wave), **KILL** (retired, not carried), or
**BOOK** (named-successor + E5 trigger: blocker · smallest-unblock · re-check).
This supersedes the scattered ledgers in `K.md §7`, `PROGRESS.md`, and the W0
audit Lane 1 — it is the single authoritative list.

### Chronic mandates (deferred ≥2 tranches)

| # | Item | Disposition | Home / trigger |
|---|---|---|---|
| 1 | Aurora derive-from-color (A m.13 / D-open #6) — oldest mandate | **SHIP** | K.W4 (co-author `deriveAuroraPalette` in glass-ui; picker→atmosphere wiring) |
| 2 | Blob extirpation (`useMetaballRenderer` + `WatercolorDot` → glass-ui) | **SHIP** | K.W3 (paired-authorship lift) |
| 3 | 8 glass-ui primitive asks | **SHIP** | K.W3 (boundary now open) |
| 4 | VAL-1 OKLab aurora-LUT | **SHIP** | K.W4 (2nd-consumer gate fires at picker→`auroraConfig.palette`) |
| 5 | demo/ `as any` (12 sites outside `ui/`) | **SHIP** | K.W5/close — retired by W2 typecheck + W5 typed-routes; cap enforced **structurally** (tsc + close-time grep-review, NOT a committed proof script — see §3) |

### Booked residuals (enabling consumer not K-controllable)

| # | Item | Trigger (blocker · smallest-unblock · re-check) |
|---|---|---|
| 6 | VAL-9 `spring()→LinearStop[]` emitter | ≥2-consumer gate is glass-ui-side (keyframes.js owns it privately) · glass-ui adopts a lifted value.js emitter at a `--spring-*`-touching wave · re-gate at the glass-ui peer tranche that next touches spring tokens. Promotes to SHIP if a late K wave surfaces a 2nd value.js consumer |
| 7 | WebMCP / `fetchLater` / Summarizer / passkeys | No value.js consumer surface earns them (folding = speculative substrate) · a real demo surface materializes (agentic palette tool / analytics beacon / credential flow) · re-check each tranche-open vs the demo surface inventory |
| 8 | Cron transactional semantics (monitor) | Each sweep is independently idempotent (no defect now) · a new cross-collection vote/write disrupts idempotency · re-check at any `api/src/cron.ts` change. **Reassess under L** (L touches api/ broadly) |
| 9 | Bench-gate script extraction (monitor) | Borderline cost/benefit · the inline bench shell grows OR a 2nd CI consumer appears · re-check at any `bench/` change |
| 10 | keyframes.js precept-pin / precepts submodule convergence | Submodule pin lags canonical · the precepts-sync step in the K.W1 visual-evidence protocol runs · re-check at K.W6 close (the sync is now a protocol step, not a free-floating defer) |
| 11 | Navigation API + cross-document View Transitions | gh-pages hash-history constraint; speculative · a non-static host or document-VT consumer materializes · named-forward (no fixed re-check) |
| 12 | Library `Palette` domain type (C Axis 2, ORPHANED) | Fires only on user re-mandate · K.W0 re-verified D's service+repo+DI remains canonical, no consumer demand → orphaned status holds · re-check on any palette-domain re-mandate |
| 13 | glass-ui `dist/glass-ui.css` `@font-face` inline | glass-ui-side publish concern · the glass-ui cohort peer addresses it · named-forward to the peer |

### I-tail CRUD residuals (folded per J-disposition path (b))

| # | Item | Disposition |
|---|---|---|
| 14 | Idempotency-Key API-side replay store (24h) | **SHIP** K.W2 api-lane (`api/src/middleware/idempotency.ts` store) |
| 15 | Per-repo conformance suite (`api/test/conformance/`) | **SHIP** K.W2 api-lane |
| 16 | `id`-field hard-removal from palette envelope | **SHIP** K.W2 (gated on a consumer-audit grep confirming nothing reads `palette.id`) |
| 17 | Per-call-site `ifMatch`/`idempotencyKey` on demo callers | **SHIP** K.W2 (lands with the store) |

### L charter — `api/` legacy-excision + transposition (the new successor)

These are **deferred OUT of K to L**, pre-authorized by the user's "next tranche"
mandate. L opens planning-only at K.W6 close. None is a shim; every one is a
structural removal or a gestalt transposition.

| # | Item | Kind | Grounding (file:line) |
|---|---|---|---|
| L-1 | `sessionToken` shim — hard-delete via migration + interface excision | legacy removal | `api/src/models.ts:85`, stripped at `api/src/format/palette.ts:68` |
| L-2 | Legacy 4-state `status` field (computed from `(visibility,tier)`) — consumer-sweep + removal; admin dual-write one-path-rule fix | legacy removal | `models.ts:87-92` + `format/palette.ts:27-30` ("Drop scheduled at I.W4" — never executed); `services/admin/batch.ts` dual-write |
| L-3 | The only 2 `as any` in all of `api/src/` → branded nominal types (`SessionToken`/`UserSlug`) | type-excision | `resolve-session.ts:35,47` (ObjectId type-erasure) — enforced **structurally** via branded types + tsc, **NOT** a `proof:*` script (§3) |
| L-4 | Service-registry seam reification | transposition | `inject-services.ts:71-109` |
| L-5 | Pagination-cursor reification | transposition | `crud-list.ts:20-44` |
| L-6 | Visibility state-machine (`from` is `void`-ignored) | transposition | `visibility.ts:35-42` |
| L-7 | Middleware-pipeline + reified guards | transposition | `index.ts:24-61` |
| L-8 | atomdiff cross-repo shape-parity test | hardening | cohort probe (value.js-J ↔ peer) |
| L-9 | `api/CLAUDE.md` doc-drift | doc | deferred-ledger #15 (W0) |

**Correction folded forward to L planning.** The transposition audit's "Smell #6"
mis-cited `dispatch.ts` as `api/src/units/color/dispatch.ts`; it is actually
`src/units/color/dispatch.ts` (372 LoC, library, G3-cap trigger) and is already
**FOLDED → K.W2(e)**, NOT an L item. L's dispatch-related transpositions are the
genuinely api-side ones (L-4..L-7).

---

## §3 — Architectural simplification: the `proof:*` idiom RETIREMENT + the de-ceremony

This entry records a **deliberate architectural simplification** completed this
session: the grep-based `proof:*` invariant-codification idiom (formerly G4/H4)
is **RETIRED as overfit**, and a band of ceremony files was **deleted**. Both are
ceremony-shedding, KISS moves — not regressions.

### The `proof:*` codification idiom — RETIRED

The arc G→H codified ~13 structural invariants as committed
`scripts/proof-*.mjs` grep scripts wired to `npm run proof:*` (`as any` budget,
`as unknown as` budget, no-`@deprecated`, no-`@ts-ignore`, no-`:deep()`,
no-bare-builtins, dts-layout, codemod-publication, dev-resolution, …). **This
idiom is retired.** It was overfit: a committed grep script is a maintenance
surface that drifts, duplicates what the type-system already proves, and
ceremonializes review.

**Replacement — invariants enforced STRUCTURALLY:**
- **Branded / nominal types + `tsc`** — e.g. L-3's `as any` excision lands as a
  `SessionToken`/`UserSlug` brand the compiler enforces; no script needed.
- **`eslint` flat config** — lint-class rules stay in eslint, exit-0 required.
- **The excision itself** — a deleted field cannot regress; the structural
  removal *is* the invariant.
- **Close-time review / grep-checks a human runs** — at the 7-lane close, a
  reviewer runs the grep-checks by hand against the diff. They are **not
  committed scripts**.

**Consequence for K planning.** No K (or L) wave authors or proposes ANY
`proof:*` script. Prior K-doc text that named `proof:no-glass-in-lib`,
`proof:as-any-budget-demo`, `proof:i1-fourier-closed`, `proof:as-any-budget-api`,
or the "9 prior proof scripts" gate is de-referenced (see `K.md` edits, §4
below): the same invariants survive as **structural facts** (the `tsconfig.lib`
split is glass-ui-free *by construction*; the topology grep is a close-time human
check; the demo `as any` cap is a tsc+review fact). inv-K-1..K-5 are unchanged
in *intent* — only their enforcement mechanism shifts from committed-script to
structural+review.

### The de-ceremony — deleted files (architectural-simplification record)

The following were **intentionally deleted** this session as shed ceremony.
They are **gone from the working tree** (verified) and must **never be referenced
as live** in any tranche doc:

| Deleted | Was | Why shed |
|---|---|---|
| `CHANGELOG.md` | release ledger | git history is the changelog |
| `CONTRIBUTING.md` | contributor guide | single-author repo; CLAUDE.md + precepts suffice |
| `VENDOR-POLICY.md` | shadcn-vue vendored-noise policy | `demo/@/components/ui/` is now a glass-ui adapter-shim; the policy is moot (the reality is codified in K.W3 prose, not a standing file) |
| 9 × `scripts/proof-*.mjs` | the proof idiom | retired per above |
| `scripts/migrate-keyframes-js-lerp.mjs` | one-shot codemod | consumed; codemod-publication proof retired with it |
| `api/mongo-init` | container bootstrap dir | superseded by `scripts/dev.sh` (already standardized this session) |
| `api/scripts/backup.sh` | ad-hoc backup | superseded by `scripts/deploy.sh` |

**Note on CLAUDE.md drift.** `CLAUDE.md` still documents the retired `proof:*`
commands and `VENDOR-POLICY.md` as live. That doc-sync is **L-9-adjacent
doc-drift** — flagged here; CLAUDE.md is build/source config, so per the
tranche-writing boundary this session does **not** edit it. It is a close-time /
L doc-sweep item.

---

## §4 — Prompt-coverage recap (all prior + this-session asks)

The full A→J request corpus (33 distinct requests) is recapped in
`audit/request-coverage.md` — every one is **ADDRESSED**, **ONGOING** (standing
invariant), or **FOLDED** into a named K wave; the only two genuinely
UNADDRESSED-across-the-arc (#23 aurora-derive, #24 blob-extirpation) are K.W4 and
K.W3. This section adds the **this-session (2026-06-02) asks** and re-states the
net.

| Ask (this session) | Status | Disposition |
|---|---|---|
| Devise a path forward reconciling the 5 audits | **ADDRESSED** | this doc §1 (SPLIT-K-PLUS-L) |
| Fold ALL chronically-deferred items into the new tranche | **ADDRESSED** | §2 consolidated ledger — every item SHIP/KILL/BOOK |
| Standardized `scripts/dev.sh` + `deploy.sh` across the constellation | **ADDRESSED** (impl already done) | scripts present + executable; folded as **K.W2 infra micro-lane** (`K.md §3`, ref `docs/dev-deploy-standard.md`) |
| Before/after screenshot protocol + precepts update + sync | **ADDRESSED** (planning) | folded as **K.W1 design spec** (`design/K.W1-visual-evidence-protocol.md`) + K.W6 π-lane binding; precepts-sync is ledger #10 |
| Fastidious backend legacy-excision refactor (next tranche) | **ADDRESSED** (deferred-with-home) | **successor L** — charter authored §2 (L-1..L-9); opens planning-only at K.W6 |
| Retire the `proof:*` codification idiom (overfit) | **ADDRESSED** | §3 — retired; invariants now structural; de-referenced in `K.md` |
| Shed ceremony (the deleted files) | **ADDRESSED** | §3 de-ceremony table |
| NO legacy, NO workarounds, idiomatic/gestalt | **ONGOING** | every K wave deletes-not-shims; L is structural-removal-only |
| Tranche-development ONLY (no code) | **ADDRESSED** | this session edits only `docs/tranches/K/` planning docs |

**Net.** Every prior and this-session ask is ADDRESSED, ONGOING-as-invariant, or
deferred-with-a-named-home-and-trigger. Zero silent punts.

| Status | Count (this-session) |
|---|---|
| ADDRESSED | 7 |
| ONGOING | 1 |
| PARTIAL / deferred-with-home | 1 (L charter) |
| OPEN | 0 |

---

## §5 — `docs/tranches/C/` disposition

**State.** `docs/tranches/C/` is **untracked** (`git status: ?? docs/tranches/C/`;
zero git-log history). It is a complete RETIRED-tranche scaffold: 8 files, 1215
LoC, including a self-documenting `FINAL.md` ("RETIRED 2026-05-26 via the AB+1
retrospective pattern") and a `C.md` whose header already declares the retirement
and three-axis disposition.

**Recommendation: COMMIT-AS-RETIRED-RECORD.**

C is cited as canonical "C-precedent" across the arc (A/PROGRESS.md, E/E.md,
F/PROGRESS.md, F-AUDIT-2/-4, E-FOLD-1, and K's own retire-and-fold idiom). A
load-bearing precedent whose scaffold lives only untracked on one machine is a
provenance gap: the references resolve to nothing in a fresh clone. The scaffold
is already in its terminal close-state (FINAL.md authored, retirement
self-declared) — committing it is a one-shot `git add docs/tranches/C/` that
makes the cited precedent durable and reproducible at zero ongoing cost. Deleting
it would orphan every "C-precedent" citation. Commit it as the retired record;
do not re-open or edit it.

---

## §6 — Sequencing (planning-only — no dispatch implied)

- **K.W0 — CLOSED.** 3 ratification gates RESOLVED 2026-06-02; RED baseline
  captured (vue-tsc 92, Playwright 27/9). Micro-relay: ratify `docs/tranches/C/`
  per §5 (commit-as-retired-record).
- **K.W1 — UNBLOCKED.** Author the 4 CORE specs **+ the 5th**:
  `design/K.W1-visual-evidence-protocol.md` (a sibling agent authors it).
- **K.W2–W6 — execute as planned** (`K.md §3`), with the dev.sh/deploy.sh
  infra-adoption micro-lane riding W2 (impl already complete;
  `docs/dev-deploy-standard.md` authored by a sibling agent).
- **L — open planning-only at K.W6 close.** The fastidious backend
  legacy-excision + transposition tranche; charter = §2 L-1..L-9. Dispatches IMPL
  only after K.W2 restores the green substrate.
