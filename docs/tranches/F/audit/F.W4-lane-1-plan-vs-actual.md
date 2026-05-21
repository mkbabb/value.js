# F.W4 close-audit Lane 1 — plan-vs-actual

**HEAD**: `cf42c6c` (post-F.W3 close).
**Captured**: 2026-05-21.
**Authority**: `docs/tranches/F/waves/F.W4.md` audit-lane 1 + each wave spec
`docs/tranches/F/waves/F.W{0..3}.md` (Scope + sub-gates + commit plan) crossed
against the actual commits on `tranche-f` + the audit deliverables under
`docs/tranches/F/audit/` + the working-tree state at HEAD.
**Procedure**: READ-ONLY verification (no git mutations, no source/doc writes
outside this file).

---

## §0 — HEAD verification

```
$ git rev-parse HEAD
cf42c6c63f39458ccf4bbbd223bf8d7593418ab1

$ git log --oneline tranche-f -8
cf42c6c feat(ci/w3): CI substrate hygiene — broaden CHANGELOG-gate + tighten vue-tsc + dts-shape guard + bundle-size gate (F.W3 Lanes B+C+D+E)
1ead49e feat(library/w3)!: delete lerpLegacy — F2 invariant satisfied + v0.8.0 BREAKING (F.W3 Lane A)
df0650c docs(tranche-f/w2): keyframes.js codemod applied — both lerp sites migrated; F2 (c) trigger SATISFIED
1401d75 chore(demo/w1): zero-consumer shadcn-vue subdir sweep + VENDOR-POLICY refresh (F.W1 Lane C)
f0d6aab chore(build/w1): adopt Rolldown declarative codeSplitting (Vite 9 future-proofing; F.W1 Lane B)
6c6c0ea refactor(library/w1): strengthen memoize type signature; @ts-ignore drops to zero in src/ (F.W1 Lane A)
bdfecf2 docs(tranche-f/w0): state-at-open + W8-W12 back-reference + coord refresh + gh-pages unblock evidence
419ce84 fix(demo/w0): migrate dock-menu Github icon off W9-C @lucide/vue rename (closes gh-pages chronic)
```

HEAD matches the post-F.W3 close SHA. Working tree status outside this lane:
clean of source mutations (only an untracked `docs/tranches/C/` directory
unrelated to F's scope is present; pre-existing).

---

## §1 — Per-wave plan-vs-actual cross-walk

### §1.1 — F.W0 (commits `419ce84` + `bdfecf2`)

**Wave spec**: `docs/tranches/F/waves/F.W0.md` — 4 lanes (A gh-pages unblock,
B W8-W12 back-reference doc, C state-at-open gate matrix, D coord refresh).
**Commit plan in wave spec**:

- `fix(demo/w0): …` — Lane A.
- `docs(tranche-f/w0): …` — Lanes B + C + D.

Actual: both planned commits present with the planned messages.

| Lane | Planned scope | Evidence | Actual | Verdict |
|---|---|---|---|---|
| A — `Github` lucide alias-hygiene fix (gh-pages unblock) | 2 dock-menu files migrated off `Github` import; `npm run gh-pages` exit 0; vue-tsc drops by 2; audit `F.W0-lane-a-gh-pages-unblock.md` | `grep "Github" demo/@/components/custom/dock/menus/` → ZERO; `419ce84` commit body cites 120 → 118 vue-tsc + `gh-pages` exit 0 + 0 grep hits; `audit/F.W0-lane-a-gh-pages-unblock.md` present (9,057 B). | 2 files migrated to inline `<svg>` brand-mark (per F-AUDIT-5 §5.1 recommendation); gh-pages chronic CLOSED; both consumers (`MobileMenuDropdown.vue`, `ProfileSection.vue`) confirmed clean of `Github` symbol. | **PASS** |
| B — W8-W12 back-reference doc | `docs/tranches/F/W8-W12-consumer-lockstep.md` authored with 8-commit inventory + F-AUDIT-3 §3 gate-matrix transcribe + chronics + F1 verdict + authority pin | File present (16,478 B); all 8 SHAs (`1fafd5d`, `4cd8d15`, `442aba1`, `02ed508`, `209584c`, `08a7f96`, `9f56813`, `e1549e0`) inventoried with per-commit summary; F-AUDIT-3 §3 12-gate matrix transcribed; chronics include the Github icon (closed F.W0 Lane A) + `--legacy-peer-deps` (carry). | F4-mandated back-reference SHIPPED; consumer LOCKSTEP authority pinned to speedtest tranche AI § 11. | **PASS** |
| C — State-at-open gate matrix | `audit/F.W0-state-at-open.md` recording 11 gates at HEAD `e1549e0`/post-Lane-A (lint, vue-tsc, vitest, smoke, build, gh-pages, proof:resolution, 3 bench medians, api) | File present (16,703 B); referenced in `bdfecf2` commit body: 10/12 PASS outright, 2 documented drifts (vue-tsc 119 vs 118 predicted — within shadcn-vue measurement tolerance; playwright local-environment flake — CI-environmental). | Baseline captured + drifts documented as required by sub-gate C. | **PASS** |
| D — Coord refresh | `audit/F.W0-coord-refresh.md` recording peer-state re-verification; Q.md §1 updated to reflect post-refresh SHAs | File present (7,623 B); `bdfecf2` body records glass-ui drift +13 (`5b81866` → `e150e2f`), speedtest +20 (`30f7f555` → `5e52d136`), keyframes.js ZERO drift, fourier-analysis ZERO drift, precepts `68d9b20` ZERO drift; Q.md §1 reads `e150e2f` / `5e52d136` / `d312517` / `68d9b20` post-refresh. | Peer-state recorded; Q.md §1 reconciled. | **PASS** |

**Drift vs plan**: NONE. F.W0 landed exactly the 4 lanes with the planned
commits, audit docs, and sub-gate evidence.

---

### §1.2 — F.W1 (commits `6c6c0ea` + `f0d6aab` + `1401d75`)

**Wave spec**: `docs/tranches/F/waves/F.W1.md` — 3 lanes (A `@ts-ignore`
strengthening, B Rolldown declarative `codeSplitting`, C zero-consumer
shadcn-vue subdir sweep).
**Commit plan in wave spec**: 3 commits — `refactor(library/w1)…` +
`chore(build/w1)…` + `chore(demo/w1)…`. All 3 land with the planned messages.

| Lane | Planned scope | Evidence | Actual | Verdict |
|---|---|---|---|---|
| A — `@ts-ignore` strengthening via typed memoize | `grep -rn '@ts-ignore' src/` ZERO; vue-tsc unchanged; vitest 1584/34 GREEN; audit `F.W1-lane-a-ts-ignore.md` | `grep -rn '@ts-ignore' src/` → ZERO (verified at HEAD). `6c6c0ea` strengthens `memoize` signature; `audit/F.W1-lane-a-ts-ignore.md` present (5,364 B). | Sole `@ts-ignore` in `src/parsing/utils.ts:146` retired via typed wrapper. | **PASS** |
| B — Rolldown declarative `codeSplitting` | `vite.config.ts` adopts declarative `codeSplitting: { groups: [...] }` shape; build output documented; gates GREEN; audit `F.W1-lane-b-rolldown.md` | `vite.config.ts:174` carries `codeSplitting: { groups: [ { name: "vendor-katex", test: /node_modules[\\/]katex/ }, { name: "vendor-highlight", test: /node_modules[\\/]highlight/ } ] }`; the comment at lines 163-173 explicitly cites the deprecation notice that drove the swap from `manualChunks`. `f0d6aab` commit lands the change. `audit/F.W1-lane-b-rolldown.md` present (9,826 B). | Declarative form adopted; legacy `manualChunks` function-form retired. | **PASS** |
| C — Zero-consumer shadcn-vue subdir sweep | 29 subdirs DELETED; `demo/@/components/ui/` retains 22 kept subdirs; vue-tsc count drops; VENDOR-POLICY.md updated; audit `F.W1-lane-c-vendor-sweep.md` | `ls demo/@/components/ui/` → exactly 22 dirs (alert, avatar, badge, button, card, checkbox, collapsible, dialog, dropdown-menu, hover-card, input, label, popover, radio-group, select, separator, sheet, skeleton, slider, switch, tabs, tooltip). `1401d75` commit body enumerates 29 deletions verbatim. `npx vue-tsc --noEmit \| grep -c 'error TS'` → **0** at HEAD (down from 118 pre-deletion; ALL 118 errors were attributable to the 29 zero-consumer subdirs). `audit/F.W1-lane-c-vendor-sweep.md` present (6,878 B). | Sweep delivered the expected vue-tsc 118 → 0 drop; KEPT 22 / DELETED 29 categorization holds. | **PASS** |

**Drift vs plan**: vue-tsc dropped further than the wave spec anticipated
(spec language at F.W3 Lane C predicted "~112-118"; actual is 0). This drift
is positive (gate tightened to 0 at F.W3 Lane C) and documented in the F.W1
Lane C commit body + F.W3 Lane C commit body. No silent drift.

---

### §1.3 — F.W2 (commit `df0650c`)

**Wave spec**: `docs/tranches/F/waves/F.W2.md` — 2 lanes (A codemod
application — cross-repo write, B post-apply Q.md record + maintainer
signal).
**Commit plan in wave spec**:

1. CROSS-REPO commit in keyframes.js's tree (Lane A.9 template).
2. value.js commit `docs(tranche-f/w2): keyframes.js codemod applied — both
   lerp sites migrated; F2 (c) trigger SATISFIED` — Lane B.

Both land. The cross-repo commit is `keyframes.js@470814e` (LOCAL ONLY by
explicit Lane B step 3 default — maintainer push authority).

| Lane | Planned scope | Evidence | Actual | Verdict |
|---|---|---|---|---|
| A — Codemod apply + test verification (cross-repo) | Both keyframes.js call sites migrated; `cd keyframes.js && npm test` PASS; codemod idempotency confirmed; single commit in keyframes.js tree; audit `F.W2-lane-a-codemod-apply.md` | `git -C keyframes.js log -1` → `470814e fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order`; `numeric.ts:159` reads `lerp(seg.startVals[i]!, seg.stopVals[i]!, …)` (canonical (a,b,t)); `group.ts:251` reads `lerp(existing.value, incoming.value, …)` (canonical (a,b,t)). Pre-state keyframes.js HEAD per Q.md §3.3 = `d312517`; post-state = `470814e`. `df0650c` commit body records: dry-run + real-apply both `rewritten=2 / already-migrated=0 / unmatched=0`; npm test PASS (15 files / 218 tests, 1.96s); idempotency CONFIRMED (`[already-migrated]` ×2 on re-run, zero additional mods). `audit/F.W2-lane-a-codemod-apply.md` present (10,205 B). | Cross-repo write executed per F3 boundary exception; sole authorized cross-repo write in F's window. | **PASS** |
| B — Q.md §3.3 outcome record + audit doc | Q.md §3.3 updated with SHA pair + verdict + push status; audit `F.W2-lane-b-coord-record.md` | Q.md §3.3 reads: pre-state `d312517`; post-state `470814e`; outcome PASS; "F2 (c) trigger ('keyframes.js codemod applied + tests PASS → unblocks F.W3 lerpLegacy delete'): SATISFIED"; push status LOCAL ONLY. `audit/F.W2-lane-b-coord-record.md` present (4,641 B). | Outcome record + maintainer-signal substrate landed. | **PASS** |

**Drift vs plan**: NONE. F.W2 is the cleanest wave — 1 wave-spec scope item
(`F2 (c) trigger SATISFIED`), 1 value.js commit, 1 cross-repo commit, both
audit docs landed.

**Cross-repo bound check**: keyframes.js commit `470814e` is the SOLE
cross-repo mutation in F's window (verified per the F4 boundary; audit-lane
7's integrity sweep formally validates).

---

### §1.4 — F.W3 (commits `1ead49e` + `cf42c6c`)

**Wave spec**: `docs/tranches/F/waves/F.W3.md` — 5-6 lanes (A `lerpLegacy`
delete, B CHANGELOG-changed gate broadening, C vue-tsc baseline lowering,
D dts-shape invariant guard, E bundle-size gate, F proof:resolution types-key
probe — OPTIONAL).
**Commit plan in wave spec**: up to 6 commits. Actual: 2 commits (Lane A
landed alone in `1ead49e`; Lanes B+C+D+E bundled into `cf42c6c`'s surgical
single-pass over the workflow YAML). The bundling is explicitly justified in
the `cf42c6c` body ("single edit to avoid YAML race conditions; per-lane
audit docs preserve the per-lane evidence"). Lane F deferred per its OPTIONAL
status in the wave spec.

| Lane | Planned scope | Evidence | Actual | Verdict |
|---|---|---|---|---|
| A — `lerpLegacy` delete (F2 invariant; v0.8.0 BREAKING) | `grep '@deprecated' src/` ZERO; `grep 'lerpLegacy' src/ test/` ZERO; CHANGELOG v0.8.0 BREAKING entry; build clean; size delta recorded; audit `F.W3-lane-a-lerplegacy-delete.md` | `grep -rn '@deprecated' src/` → ZERO; `grep -rn 'lerpLegacy' src/ test/` → ZERO. CHANGELOG.md carries `## [0.8.0] — 2026-05-21 (F close)` with the "**Removed `lerpLegacy`**" BREAKING entry (sole BREAKING in v0.8.0). `audit/F.W3-lane-a-lerplegacy-delete.md` present (7,576 B). | F2 satisfied; LONE v0.8.0 BREAKING surface honored. | **PASS** |
| B — CHANGELOG-changed gate broadening | `.github/workflows/node.js.yml` regex extended to catch package.json + vite.config.ts + tsconfig.json + api/src/ + api/package.json (lockfile-only excluded); audit `F.W3-lane-b-changelog-gate.md` | Workflow lines 221-227: `grep -qE "^(src/|package\.json$|vite\.config\.ts$|tsconfig\.json$|api/(src/|package\.json$))"` — exactly the broader regex from the wave spec; lockfile-only changes still excluded by design. `audit/F.W3-lane-b-changelog-gate.md` present (3,917 B). | The W8-W12 dep-only commits would have failed the broader gate; F.W0/F.W1 commits all touch CHANGELOG so they pass. | **PASS** |
| C — vue-tsc baseline lowering | CI gate threshold lowered to post-F.W1 actual; VENDOR-POLICY.md updated; audit `F.W3-lane-c-vuetsc-baseline.md` | Workflow lines 46-53: gate hardened to ≤ 0 errors (`if [ "$COUNT" -gt 0 ]`) — strict zero-error baseline since F.W1 Lane C drove vue-tsc to 0. `audit/F.W3-lane-c-vuetsc-baseline.md` present (3,490 B). `cf42c6c` body confirms VENDOR-POLICY.md update. | Tighter than the wave spec anticipated (spec predicted "~112-118"); the actual 0 enables a strict-zero gate. | **PASS** (tightened beyond plan — positive drift) |
| D — dts-shape invariant guard | `scripts/proof-dts-layout.mjs` authored + executable; `proof:dts-layout` in package.json scripts; CI step wired; passes at HEAD; audit `F.W3-lane-d-dts-invariant.md` | `scripts/proof-dts-layout.mjs` present (1,109 B). `package.json` carries `"proof:dts-layout": "node scripts/proof-dts-layout.mjs"`. Workflow line 66-67 wires the CI step (`npm run proof:dts-layout`). Local invocation: `npm run proof:dts-layout` → `[proof:dts-layout] PASS — flat dist/ dts emission`. `audit/F.W3-lane-d-dts-invariant.md` present (3,975 B). | Guard active at HEAD; W12-unblocker regression now CI-enforced. | **PASS** |
| E — Bundle-size gate | Workflow has the `dist/value.js` ≤ 148480 bytes (145 KB raw) check; audit `F.W3-lane-e-bundle-gate.md` | Workflow lines 74-81: `SIZE=$(stat -c%s dist/value.js …); if [ "$SIZE" -gt 148480 ]; then …; fi` — exactly the ≤ 148480 budget from the wave spec. `audit/F.W3-lane-e-bundle-gate.md` present (3,181 B). | Gate added; passes at HEAD (post-Lane-A delete bundle is ≪ 145 KB). | **PASS** |
| F — proof:resolution types-key probe (OPTIONAL) | If included: extend `scripts/proof-resolution-contract.mjs` to probe `types` key | No `audit/F.W3-lane-f-*.md` present. Deferred per the wave spec's explicit OPTIONAL framing ("If F.W3 is on a tight critical path, defer this lane to F.W4 close-prep OR a successor tranche"). | Lane F NOT executed; this is per-spec, not silent drift. | **DEFERRED-PER-SPEC** |

**Drift vs plan**: 6 → 2 commits is a delivery-shape difference (single
workflow pass for Lanes B+C+D+E vs the spec's per-lane commits) and is
explicitly justified in the `cf42c6c` body (YAML race-condition avoidance);
all 5 mandatory sub-gates (A-E) have landed evidence + audit docs. Lane F's
deferral is per-spec OPTIONAL.

---

## §2 — PROGRESS.md reconciliation needed

`docs/tranches/F/PROGRESS.md` "Wave log" table currently reads (lines 63-71):

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| F.W0 HEADLINE — open + state-at-open + W8-W12 back-reference + gh-pages unblock + coord refresh | **planned** | — | — | — |
| F.W1 — post-W12 transpositions + dead-code sweep | **planned** | — | — | — |
| F.W2 — keyframes.js codemod cross-repo apply (F3 boundary exception) | **planned** | — | — | — |
| F.W3 — lerpLegacy delete + CI substrate hygiene (v0.8.0 candidate) | **planned** | — | — | — |
| F.W4 HEADLINE close — FINAL.md, merge, v0.8.0 tag | **planned** | — | — | — |

The close ceremony (per F.W4 §"Close ceremony" item 2) will reconcile these.
Lane 1's verification confirms all 5 rows have commit-evidence READY to fill
in:

- **F.W0**: planned → should be **CLOSED** at `419ce84..bdfecf2` (Opened
  2026-05-21 ~12:57 EDT, Closed ~12:58 EDT; 2 commits as planned).
- **F.W1**: planned → should be **CLOSED** at `6c6c0ea..1401d75` (3 commits
  as planned; vue-tsc 118 → 0 verified).
- **F.W2**: planned → should be **CLOSED** at `df0650c` (1 value.js commit
  as planned + cross-repo `keyframes.js@470814e`; F2 (c) trigger SATISFIED).
- **F.W3**: planned → should be **CLOSED** at `1ead49e..cf42c6c` (2 commits;
  Lane A separate + Lanes B+C+D+E bundled; Lane F deferred per OPTIONAL).
- **F.W4**: planned → will close at the close-ceremony commits (this lane's
  audit doc is the first of those).

**Reconciliation is the close-ceremony writer's responsibility, NOT Lane 1's
scope per F.W4.md**. Lane 1 verifies that every planned wave-lane has
landed evidence so the close-ceremony writer can fill the table with full
confidence.

---

## §3 — Verdict summary

| Wave | Sub-gates verified | Drift | Verdict |
|---|---|---|---|
| F.W0 | A + B + C + D | NONE | **PASS** |
| F.W1 | A + B + C | Lane C exceeded expectations (vue-tsc 118 → 0 vs spec's "≤ 118"); positive drift, documented | **PASS** |
| F.W2 | A + B | NONE | **PASS** |
| F.W3 | A + B + C + D + E (F deferred per OPTIONAL) | Commit bundling 6 → 2 (explicitly justified in `cf42c6c` body — YAML race-condition avoidance); Lane C tightened beyond spec (≤ 0 vs ~112-118 expected) | **PASS** |

**Sub-gate verdict (Lane 1 close-audit)**: **PASS** — every planned wave-lane
has landed evidence + the required audit doc; the only "drifts" are positive
(Lane C tightened past spec) or explicitly justified (F.W3 commit bundling);
Lane F is deferred per its OPTIONAL framing in the spec.

**PROGRESS.md reconciliation is required** at the close ceremony — 5 rows
need to flip from `planned` to `closed` with commit hashes and timestamps.
Lane 1's verification confirms this reconciliation is mechanical (every row
has landed commit evidence) and carries no remaining open risks.

---

## §4 — Cross-references

- Wave specs: `docs/tranches/F/waves/F.W{0,1,2,3,4}.md`
- Per-lane audit docs (10 docs):
  `audit/F.W0-lane-a-gh-pages-unblock.md`,
  `audit/F.W0-state-at-open.md`,
  `audit/F.W0-coord-refresh.md`,
  `audit/F.W1-lane-a-ts-ignore.md`,
  `audit/F.W1-lane-b-rolldown.md`,
  `audit/F.W1-lane-c-vendor-sweep.md`,
  `audit/F.W2-lane-a-codemod-apply.md`,
  `audit/F.W2-lane-b-coord-record.md`,
  `audit/F.W3-lane-a-lerplegacy-delete.md`,
  `audit/F.W3-lane-b-changelog-gate.md`,
  `audit/F.W3-lane-c-vuetsc-baseline.md`,
  `audit/F.W3-lane-d-dts-invariant.md`,
  `audit/F.W3-lane-e-bundle-gate.md`.
- Back-reference doc: `docs/tranches/F/W8-W12-consumer-lockstep.md`.
- Coordination state: `docs/tranches/F/coordination/Q.md` (§1 + §3.3).
- Progress log: `docs/tranches/F/PROGRESS.md` (Wave log table — requires
  close-ceremony reconciliation; not Lane 1's write scope).
