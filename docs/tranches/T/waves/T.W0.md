# T.W0 — SUBSTRATE · ORACLE FLOOR · PACKET DISPATCH

**Name**: W0 — Substrate (the first act: packet dispatch + oracle floor + hygiene + doc-truth)
**Opens after**: tranche ratification (`T.md §12`, Q1–Q17 — **PENDING; the dispatch gate is
CLOSED**). Round 0 — everything else opens after this wave.
**Spec of record**: `audit/SYNTHESIS.md §3` T.W0 rows (items W0-1..W0-6) · §4 packet series
(dispatch = W0-1; Q7 timing) · §6.1 oracle slate (the boot set) · §6.2 the Lighthouse record +
Q14 disposition · Q13 (the proof:* split) · `audit/lanes/t-ci-lighthouse-record.md` (the
deploy-fully chain of record).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the
T.md charter clause, restated here so the rule is self-evident in-file); above both,
`MANDATE-2026-07-06.md §0` + addenda §0.1–§0.4 are VERBATIM LAW.
**Agents**: 1 serial, item order — **W0-1 FIRST** (the dispatch fires AT ratification,
immediately — Q7; the W-1/W-2 freeze windows are OPEN but LAST); W0-5's oracle mints are
test-tree work and may interleave after W0-2's CI wiring; no parallel writers.
**Hard gate**: composite (§Hard gate) — packets dispatched + acked-or-recorded (P9 named FIRST)
· oracle floor green-or-born-RED-by-design · `proof:*` split per Q13 with `test:dist` CI-wired ·
legacy grep-zero on the named set · doc-truth pre-E-1 set landed · CI hygiene captured (wedge
diagnosis + O-25 + `--ring` pre-migration) · the Lighthouse record disposition recorded per Q14.
**Status**: PENDING — DEVELOPMENT ONLY; waves dispatch only post-ratification (E-6).

---

## §Goal criterion

True the ground T stands on; dispatch the producer letters while the W-1/W-2 freeze windows are
OPEN; mint the oracles the design waves gate on. (SYNTHESIS §3 T.W0 Goal, verbatim.)

## §Completion criterion

Packets dispatched + acked-or-recorded; oracle floor green-or-born-red-by-design; legacy grep
zero on the named set; doc-truth pre-E-1 set landed. (SYNTHESIS §3 T.W0 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3 T.W0 item table, transcribed verbatim — gates intact; anchors + evidence appended)

| # | Item | Gate | Anchors · evidence |
|---|---|---|---|
| W0-1 | **Dispatch the E-2 packet series** (SYNTHESIS §4) at ratification: GLASSUI-T-ASKS (P1–P10) + the KF letter (PRM-expand re-cite w/ current line numbers) — HEAD-restamped at dispatch (S-letter §16); the W-1/W-2 payload (P9) named FIRST | dispatch record + producer-inbox cite | `letters/GLASSUI-T-ASKS.md` (`<RE-STAMP AT DISPATCH>` placeholder); the consolidation law: PRM-expand routes to keyframes, NEVER the glass-ui letter · t-request-packets §0/§1; t-glassui-forward §1 (windows); t-glassui-current |
| W0-2 | **Finish the proof:* retirement** (LEG-1/F5 split verdict): retain-reclassify **5** behavioral gates (`css-parity`, `round-trip-idempotent`, `perf-target`, `serialize-fidelity`, **`subpath-budget`** — the bundle-trace that IS the parse-that-free invariant W1-src's gate reads [AMENDED-AT-HARDENING — h-wave-w0-w1 M1: retain-5/excise-7, same home at all four sites; Q13 annotated]) into a CI-wired `test:dist`; EXCISE the other **7** + `generate-favicon.mjs` (verify-dead) + `globals` devDep; CLAUDE.md sentence made true by construction (**Q13**) | grep `proof:` = the 5 reclassified only; CI runs test:dist | `package.json` scripts · `scripts/generate-favicon.mjs` · CLAUDE.md §Test+verify · t-legacy-sweep F5; the CHRONIC `proof:*` carry (T.md §5 — the doc-claimed retirement that never completed) |
| W0-3 | Legacy excisions: BulkActionToolbar + SortFilterMenu (+doc rows), savedPalettes param, `constants.ts:340-344` type trio, PaletteDialog orphan confirm+excise (CC-6), PaletteSlugBar iconOnly migration, **the `dark-mode-toggle/` DISSOLVE (LEG bundle item 3 — named here so no wave orphans it** [h-wave-w0-w1 S1]**)**, stale comments | grep-zero; suites green | t-legacy-sweep LEG-1..9; t-card-color-census CC-6 |
| W0-4 | Doc-truth (pre-E-1-safe): 5→6 e2e ×2 · ci.yml:362 comment · DESIGN.md 32/25rem + `--alpha-checker` + `@lib/gamut-ink` entries · `transform/CLAUDE.md` path.ts + LoC strip · `units/color` space table +ICtCp/Jzazbz · `subpaths/CLAUDE.md` authored (the frozen-entry law) · docs-truth F5 (AMENDED-AT-PASS-2: color-theory/gamut-mapping now live under `docs/colors/` + app.md/quantization.md exist; `assets/docs` = **11** pages incl. kelvin.md, not 10) | doc-vs-tree spot check | t-docs-truth DOC-1..13; the demo/api CLAUDE.md FULL rewrites are W9's (E-1 orphans them as documents — post-restructure, not diffs) |
| W0-5 | **Oracle mints** (the boot set MUST precede W2 — plan-audit-1 F3/F4): O-1 color-truth · O-2 real-hydration · O-3 headed-GPU probe annex (owner/headed-attested, not CI pass/fail) · O-4 order-invariance · O-5 pacing variance · **O-26 perceptibility (render, not atoms)** [AMENDED-AT-HARDENING — M-22] · O-16 computed-cascade · O-7 card-census **scaffold = the census loop + pane roster + rung resolver, asserting nothing yet** (its assertions arm at W3) [h-exec-w0 S3] | each born-RED against today's tree where the defect is live (honest reds recorded); rows whose defect is NOT yet live are annotated born-GREEN-pending-W2, never conflated | §6.1 rows O-1..O-5/O-16/O-7 (each names the S failure shape it repairs: named-site-not-population or proxy-predicates) · t-oracle-gaps; t-load-sync; t-aurora-boot-active; t-transitions-liquid |
| W0-6 | CI hygiene: smoke-safari wedge diagnosis (`--reporter=line`, keep the 12-min bound) · O-25 prod-lineage assert · `--ring` fallback-first pre-migration (`ColorInput.vue:338` → `var(--focus-ring-color, var(--ring))`) | CI captured | t-ci-lighthouse-record §layer-4 (the wedge: 4 tests, zero output ~12 min to step-kill; outside Playwright's test-timeout jurisdiction) · O-25 = §6.1 (the next stale-prod window caught by an oracle, not an owner eyeball) · P9-J4 (value.js is an UN-ROSTERED `--ring` consumer; this pre-migration makes W7's roster verify a no-op) |

### Rider — the deploy-fully chain of record + the Lighthouse record disposition (t-ci-lighthouse-record, binding context)

The five-layer CI peel is **already landed on master** (path-scoped, sanctioned: `be0a703` →
`29ea8ac` → `fcd4273` → `80c5888` → `0441aba`); layer 5 was the **false-success deploy footgun**
— `--branch=main` cut branch-alias *Preview* deployments while wrangler exited 0 and printed
"Deployment complete", so every "green" deploy (including the R-close era's) left color.babb.dev
stale; the fix (`--branch=master` = the CF Pages project's production branch) is live
(Production `7573d1fb`). W0 does NOT re-land the fix — it **institutionalizes the guard**: O-25
(W0-6) exists precisely so the next stale-prod window is caught by an oracle. Layer 4 (the
smoke-safari CI wedge) is the W0-6 diagnosis item; do not raise the 12-min bound — it correctly
contains a hang, not a slow suite.

**The LCP/TBT record disposition (Q14, transcribed)**: Lighthouse run of record `28836873580` —
LCP **5563ms** (~2.2× over) · TBT **5618ms** (~19× over) — **HONESTLY RED, no gate weakened**;
budgets stay red + the **PI-1 per-wave delta ledger opens at this wave** (every richness wave
re-runs LHCI and records the delta, up or down) until the owner adjudicates budget/preset pairing
at W8/W9. Run-to-run spread is large (TBT 4170→6593) — treat single-run deltas < ~30% as noise
(PP-10 bounded numbers). Re-baselining now is the REJECTED alternative.

## §Triumvirate dispatch

Mandatory (research + plan-augment + redress) on:

- **bounds expansion**: any `../glass-ui` or `../keyframes.js` write (the foreign-tree fence —
  E-2 speaks in packets); any `src/` runtime write beyond W0-2/W0-3's verified-dead excisions;
  any demo runtime write beyond the two named one-liners (`ColorInput.vue:338`; the W0-3 set);
- **non-local gate failures**: an oracle minting GREEN where its defect is live (the mint is
  then a proxy — the exact S failure shape W0-5 exists to repair); the W0-2 reclassified
  `test:dist` gates failing against the CURRENT dist (a real dist regression, not a wiring
  matter — halt and root-cause); a producer inbox refusing/contradicting a packet's premise
  (record the disposition, never soften the ask);
- **loop halt**: the third iteration of any smoke-safari wedge-diagnosis loop, or any
  CI-config diagnostic loop, halts and routes.

## §File bounds · disjointness · worktrees

| Item | Files | Access |
|---|---|---|
| W0-1 | `letters/GLASSUI-T-ASKS.md` (+ the KF letter) — re-stamp + dispatch record | dispatch |
| W0-2 | `package.json` (scripts + `globals` devDep) · `scripts/generate-favicon.mjs` (delete) · the retained-4 test wiring (`test:dist`) · `.github/workflows/ci.yml` (test:dist step) · `CLAUDE.md` (Q13 sentence) | modify/delete |
| W0-3 | `BulkActionToolbar` + `SortFilterMenu` (+doc rows) · the savedPalettes param site · `constants.ts:340-344` · `PaletteDialog` orphan (CC-6) · `PaletteSlugBar` · stale comments | delete/modify |
| W0-4 | the named doc set (DESIGN.md · ci.yml:362 comment · `transform/CLAUDE.md` · `units/color` table · `subpaths/CLAUDE.md` NEW · docs-truth F5 rows) | modify/create |
| W0-5 | `e2e/` + `test/` oracle mints (O-1..O-5, O-16, O-7 scaffold) · CI wiring for the annex/probes | create |
| W0-6 | `.github/workflows/ci.yml` (reporter, O-25) · `ColorInput.vue:338` | modify |

Do NOT touch: `../glass-ui`, `../keyframes.js` (zero files — the fence), `docs/precepts/`,
`src/` runtime beyond the named verified-dead deletions, the boot chain (W2's), the tier/material
surfaces (W3's). Single writer — no sibling worktrees.

## §Hard gate (verbatim-faithful to SYNTHESIS §3 T.W0 + §6.2/Q14)

1. **W0-1**: dispatch record + producer-inbox cite — **RULED [AMENDED-AT-HARDENING — h-exec-w0 M1]: the cite = the value.js-SIDE dispatch record (the letter's `## Dispatch stamp` section + the PROGRESS.md event row); a glass-ui-side relay commit is FORBIDDEN by T's zero-touch fence and is a later booked producer/maintainer action, never this gate's artefact. "acked-or-recorded" reads accordingly: the RECORD is the gate; an ack is a bonus, never waited on**; P9 named FIRST; the letter HEAD-restamped at
   dispatch (PP-11 — present-tense producer claims carry a HEAD-stamp); the **§KF section dispatched SEPARATELY to the keyframes inbox** (consolidation law; the keyframes HEAD re-stamped at dispatch too [h-wave-w0-w1 S3]), never folded into the glass-ui letter.
2. **W0-2**: grep `proof:` = the 5 reclassified only (incl. `subpath-budget` [AMENDED-AT-HARDENING]); CI runs `test:dist` — **which SELF-BUILDS (`npm run build && …`) and lands as a named step in `build-and-test` after ci.yml:148** [h-exec-w0 S1]; the excised 7 +
   `generate-favicon.mjs` + `globals` devDep gone (grep-zero); the CLAUDE.md sentence true by
   construction (Q13 — names which batch retired).
3. **W0-3**: grep-zero on the named legacy set; suites green.
4. **W0-4**: doc-vs-tree spot check green across every named row (incl. the AMENDED-AT-PASS-2
   F5 corrections: `docs/colors/`, `assets/docs` = 11 pages).
5. **W0-5**: all seven oracles minted; each **born-RED against today's tree where its defect is
   live** — honest reds recorded with defect cites, never softened to warns; the boot set
   (O-1..O-5, O-16, O-7 scaffold) exists BEFORE W2 opens (structural precondition, plan-audit-1
   F3/F4).
6. **W0-6**: CI captured — the smoke-safari wedge diagnosed with `--reporter=line` progress
   evidence (12-min bound KEPT); O-25 prod-lineage assert wired per its buildable spec
   [AMENDED-AT-HARDENING — h-exec-w0 M2]: a post-deploy CI step asserts the CF Pages production
   deployment's source sha == the built commit (`wrangler pages deployment list`,
   Environment=Production, branch=master); creds precondition NAMED — absent creds = SKIPPED-with-
   record, never silently green; `--ring` fallback-first landed at `ColorInput.vue:338`.
7. **Q14 disposition recorded**: run `28836873580` stays HONESTLY RED (LCP 5563 / TBT 5618); the
   PI-1 per-wave delta ledger opened with this run as baseline; NO gate weakened, NO re-baseline.
8. PP-8 repo-wide sweep (caps · legacy grep · as-any ledger regenerated) · `npm run lint` 0 ·
   `npm run typecheck` 0 · `npm test` green · clean `git status`.

## §No-workaround prohibitions (binding)

- **NO weakening the Lighthouse gate** — Q14: budgets stay RED; the delta ledger is the
  instrument, adjudication is the owner's at W8/W9.
- **NO faking an oracle green** — a W0-5 mint that passes where its defect is live is a proxy
  predicate (the S disease); record the honest red with its cite.
- **NO raising the smoke-safari 12-min bound** — it contains a hang, not a slow suite
  (t-ci-lighthouse-record §layer-4).
- **NO demo-side shims for producer defects** surfaced by the mints — record + packet, never
  shim (PR-2).
- **NO holding the packets for a quieter frontier** — Q7: W-1/W-2 are OPEN but are the LAST
  window; a missed window is a post-5.0.0 second break event, forbidden by the one-migration
  edict.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each item batch and before close;
`npx playwright test` (full project set) after W0-5 and before close; `test:dist` after W0-2;
`git diff --check` on every docs/record commit. The tool-artefact grep `grep -rnE '</?(content|invoke|parameter|antml)'` over the wave's touched docs MUST be empty before any docs commit (the §Recovery seam class — M-1).

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the W0-1 dispatch record + inbox cite; the grep
captures (`proof:`, the W0-3 legacy set, the W0-2 excisions); the born-RED oracle table (oracle
→ red/green → defect cite); the doc-vs-tree spot-check record; the CI run URL showing
`test:dist` + O-25 + the smoke-safari reporter evidence; the Q14 disposition + PI-1 ledger
opening entry; per-item commit hashes.

## §Commit plan

W0-1 (dispatch record, own commit); W0-2 (proof:* split, own commit with body naming the Q13
batches); W0-3 (legacy excisions, one commit with grep-zero proof in body); W0-4 (doc-truth,
one docs commit); W0-5 (oracle mints — one commit per oracle family, honest reds named in
bodies); W0-6 (CI hygiene); a status commit at close. Scopes name the owned surface (packets /
proof-split / legacy / doc-truth / oracles / ci-hygiene).

## §Recovery (STANDING — the `T.md §8` completion-brief rider binds every dispatch AND resume of this wave; PP-14/PP-15 operationalized) [AMENDED-AT-HARDENING — M-29/h-exec-recovery]

The four-step protocol (audit-partial → patch-brief at `audit/recovery/T.W<n>-<lane>-brief-<date>.md` → resume-from-work-order → seam-audit-at-close) is standing law in `T.md §8`; E-6 batches-of-three is the prevention half, this rider the cure. This wave's type-specific deltas:

**Partial signatures**: a packet DISPATCHED but its re-stamp + inbox cite not recorded (W0-1); an
oracle minted GREEN where its defect is live (a proxy, not a partial — re-mint born-RED); a legacy
grep-zero claimed but the deletion uncommitted; `test:dist` wired but CI not green.
**Resume specifics**: the partial IS the working tree (single-writer mainline — no worktree); never
assume a prior W0 item "landed" without its commit + grep/dispatch capture. **W0-1 is the ONE
irreversible act** — if a packet was already sent, recover its re-stamp + inbox cite from the
letter's dispatch record; do NOT re-send (double-dispatch is a producer-inbox defect, not a clean
retry).

## §Dependencies

- **Depends on**: `T.md §12` ratification (Q1–Q17 ruled; the encoding doc's §0 wins).
- **Blocks**: every other wave (round 0). W0-5 is a STRUCTURAL precondition of W2 and of E-7
  (W8); W0-1's dispatch starts the producer clock every booked swap reads.

## §BOOKS opened/serviced (books-never-gates)

- **The `proof:*` carry (CHRONIC)** — discharged at W0-2 (Q13 split); the retained 5 live on as
  `test:dist` [AMENDED-AT-HARDENING — retain-5/excise-7].
- **O-16's R1 row** — born EXPECTED-RED with the PKT-1 cite (the dist 150ms clobber is
  producer-root); goes live the day PKT-1 lands. The red carries the cite, never weakened.
- **The `/easing` 17th-subpath GAP-3 verify-watch** — rides P9-J3 in the W0-1 letter
  [AMENDED-AT-PASS-2].
- **X1 / X2 (CHRONIC, maintainer)** — NOT W0 work; O-25 (W0-6) is their oracle-side guard; the
  books restate at W9 with firing ops.
- **The `.underline-tabs` + A6 `backdrop-filter:none` MARKERs** — named in the P7/P8 letter
  rows at W0-1; retire-checks fire at W7 (legacy-sweep F6/F7).

## §Evidence packets consumed

`audit/lanes/t-legacy-sweep.md` · `audit/lanes/t-docs-truth.md` · `audit/lanes/t-oracle-gaps.md`
· `audit/lanes/t-ci-lighthouse-record.md` · `audit/lanes/t-request-packets.md` ·
`audit/lanes/t-glassui-forward.md` §1 · `audit/lanes/t-glassui-current.md` ·
`audit/lanes/t-plan-audit-1.md` F3/F4 · `audit/lanes/t-deferred-census.md`.

## §Hand-off

Round 1 (W1) opens on this wave: the restructure lands against a CI that runs `test:dist` (the
parse-that-free subpath invariant's new home — W1-src's gate reads it) and a tree with the
legacy set already zero (nothing dead gets a new colocated home). The oracle floor waits armed
for W2/W3 (born-RED rows are their completion evidence); the packet clock started at W0-1 feeds
every booked interim swap (W3/W4) and the W7 verify-at-cut walk. The PI-1 delta ledger opened
here is appended by every subsequent wave gate.
