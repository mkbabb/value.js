# M — The frontend-consummation + precept-remediation + v1.0.0 tranche

**Tranche letter**: M — value.js's eleventh tranche (arc A..L → M). The tranche that
**finishes what K started and L proved**: it discharges the chronic frontend mandates
(aurora-derive C2, blob-extirpation C3, dock C1), retires the one live contract-v2
precept violation, completes the type-discipline L under-measured, re-anchors the
cohort on a fresh glass-ui cut, folds the value.js-owned infra debt, and cuts **v1.0.0**.

**Predecessor**: K (cross-repo frontend cohesion — mid-flight) + L (api/src backend
excision — CLOSED `66dcd68`). M **supersedes K's unfinished waves** (see §1) and builds
on L's green backend.

**Opened**: 2026-06-04, from a two-wave 12-agent deep audit (`audit/wave1-2-synthesis.md`,
`audit/fold-ledger.md`, `audit/prompt-coverage.md`).

**Mode**: **planning-only at open** (this document + the audit ledgers author NO code).
M.W0 is DEV (this charter). M.W1–M.W9 are IMPL and dispatch on explicit user
ratification.

---

## §0 — Why a new tranche (the supersede-K decision)

K was the right tranche; its **plan drifted past the point where patching it is honest**.
The evidence the audit surfaced:

1. **K's wave numbering became corrective.** K.W2.5 and K.W2.6 are *patch-sub-waves* — the
   signature of a plan that broke mid-flight (W2.5 reverses W2's own central mechanism; its §3
   dts-keystone is still unmet even in the shipped cohort). When the corrections need corrections,
   you re-baseline. (K.W2.5 was not *wrong* — its reka "single-install" diagnosis was correct,
   verified live: one `reka-ui@^2.0.0` install, not two — it is simply a sub-wave that should be a
   first-class wave in a clean plan.)
2. **The version anchors are spent.** K.W3–W6 were specced to "consume glass-ui 3.2.0," but
   3.2.0 shipped **asymmetrically** — the aurora half (`deriveAurora`) landed; the blob-lift
   and dock-fix did not (verified: no `goo-blob`/`watercolor-dot` in glass-ui src; `GlassDock.vue:359`
   `:inert` still on raw `expanded`). Every K.W3 "3.2.0" reference is stale; the cohort needs a
   **3.3.0 re-anchor**.
3. **The publish-spine never executed in order.** K's plan was *value.js 0.11.0 → glass-ui
   3.2.0-against-0.11.0 → consume*. Reality: glass-ui cut 3.2.0 against value.js **0.10.0**;
   0.11.0 was never published; the aurora `cssToOklch` cast the plan said would delete
   **survived** (`glass-ui color.ts:124`).
4. **The audit found work K's structure has no home for** — the WithId read-side type gap L
   under-measured (25 casts, 4 models), the color-resolver duplication, the value.js-owned infra asks
   (ADOPTION-ASKS 3/5/inv-22).

So K stays as the **historical record** (W2 executed + closed cohort-halves; the rest marked
*superseded-by-M* with a pointer). M is the clean consolidation. **No legacy, including no
legacy plan-debt**: M re-states the surviving K work as its own waves with corrected premises,
rather than threading a growing chain of `.5`/`.6` patches.

> **K's genuinely-landed work is befitting-kept, not re-litigated** (§7): all of L; K.W2's
> tsconfig.lib/demo split (inv-K-1, precept-clean), the inv-K-2 OKLab dedup + 1e-6 canary, the
> api-lane, the unified CI/CD + DEC-9 deploy; the proof-idiom retirement; the value.js-J
> atom-diff + publish cohort (green). M builds **on** these.

---

## §1 — Thesis

Three forces converge at M, and the audit proved each is now *actionable* where it was
previously *blocked*:

**First — the precept fossil must die before v1.0.0.** The `development` export condition
(`package.json:27`) is the **sole remaining exports-map precept violation in the entire
constellation** (glass-ui stripped its 68 at AS.W2b; keyframes has 0). It is a contract-v2
violation the user personally directed abrogated; `proof:resolution` fails-closed on it; it is
the dual-instance root cause and a v1.0.0 release-gate blocker. value.js is the *least-migrated*
repo — the band-aids (`dedupe`, `fs.allow`, `check-types.mjs` foreign-filter) are live, and the
demo self-alias (`vite.config.ts:37`) points at `src/` rather than `dist/`. M.W1 deletes the
fossil + retires the band-aids (mechanism-C by deletion — dist-resolution + `build:watch`) and
*repoints* the self-alias to dist (it survives — it is the demo bundler's resolution path for
glass-ui's `@mkbabb/value.js` import, not a published-exports self-reference; see M.W1.B′).

**Second — the cohort gates are now SATISFIED, but the anchors moved.** The two dependencies
that blocked K's frontend waves for 7+ tranches have shipped: **glass-ui 3.2.0** (with
`deriveAurora` — C2 is *consumable now*) and **keyframes 3.0.0** (the router-bump anchor). But
3.2.0 shipped without the blob-lift/dock-fix, so C3 + C1 re-anchor on a **glass-ui 3.3.0** cut —
and that cut must be made *against value.js 0.11.0* (published first). The publish-spine is the
binding constraint, and it is **acyclic by construction** (§3).

**Third — L's discipline is one transposition short.** L closed `as any = 0 / as unknown as = 1`
green, but it measured two *strings*, not the type-escape *class* it claimed to bring to the
`src/` regime. A third escape — `as <Model> & { _id: unknown }` — is pervasive: **25 casts across
4 model types / 13 files** (Palette ×17, ProposedName ×5, Tag ×2, AdminAuditEvent ×1; the 9
`: X & { _id }` *type annotations* are legitimate and NOT counted). It is the symmetric twin of
L.W2's filter-side branding, never done read-side: the repository layer discards the driver's own
`WithId<T>`. M.W2 completes it for the *whole class* — the read signatures of all 4 model
repositories → `WithId<T>`, the formatter params likewise, all **25 casts delete**, the type flows
driver → repo → service → formatter with zero assertion. (Scoping the gate to Palette alone — the
first cut — would leave the 8 sibling casts live, shipping the very workaround it claims to delete;
inv-M-2 covers all 4 models.) This is the gestalt the user demands — an architectural transposition
for the escape *class*, not a budget-grep.

M is **elegance, simplicity, performance** made concrete: delete a precept fossil; delete 37
casts by reaching for the driver's own type; collapse two divergent CSS-color→RGB DOM resolvers
into one library-backed primitive; gate the one real un-PRM'd animation loop; extirpate two
bespoke blob facilities into the design system; cut v1.0.0.

---

## §2 — Recap-coverage of ALL prompts, requests, and precepts (the §3 detail in `audit/prompt-coverage.md`)

Every distinct user mandate across the arc, with its M disposition. **Verdict: zero un-recapped
prompts; the open items are all UNADDRESSED-IN-CODE requests that M now lands.**

| Mandate (source) | State at M-open | M disposition |
|---|---|---|
| CONSTELLATION-arm execution → L (this session) | ✅ L CLOSED | befitting-keep; M.W9 re-confirms L close on the corrected post-W1 substrate |
| K execution / K.W2 | ✅ W2 executed; rest specced | superseded → M waves |
| post-W2 audit (K.W2.5/2.6 spec) | specced, unimplemented | M.W1 (W2.5 corrected) + M.W2 (W2.6) |
| visual-grounded re-audit (π lane, desktop-P0) | specced | M.W2 (desktop-P0) + M.W9 (π) |
| **aurora-derive-from-color (oldest mandate, 7+ tranches)** | producer shipped (deriveAurora), consumer unwired | **M.W5** (C2 + VAL-1 ship-or-KILL) |
| **blob-facility extirpation (2nd-oldest, 7+ tranches)** | both blob dirs still in demo | **M.W7** (cohort lift → glass-ui 3.3.0) |
| dock focus-reachability (C1) | reka-skew + GlassDock :inert bug live | M.W1 (reka) + M.W7 (glass-ui W-D) |
| "NO legacy code / NO workarounds / idiomatic gestalt" (standing) | — | the spine of M (delete the fossil, the casts, the band-aids, the dup resolvers) |
| "architectural transpositions for elegance/simplicity/performance" | — | M.W2 (WithId), M.W3 (color-resolver, parseCSSColor, PRM) |
| KISS / no-contrivance · no-god-module · glass-ui-first · no-backwards-compat · preserve-animations · proof-idiom-retired | upheld at L | re-affirmed as M invariants (§6) |
| "fold chronically-deferred + deferred items into this new tranche" (×2) | — | `audit/fold-ledger.md` — every CH-/K-/L-SEED/DEC item folded |

---

## §3 — Topology: the acyclic publish-spine

In the constellation library graph **value.js is the pure sink** — it depends on no cohort peer;
both glass-ui and keyframes depend *into* it (verified against the live package.json files):

```
glass-ui(lib) ──▶ keyframes(lib) ──▶ value.js(lib)     value.js = the SINK (cohort-dep-free)
     └──────────────────────────────▶ value.js(lib)     (glass-ui → value.js direct, OKLab dedup)
value.js(demo) ──▶ glass-ui(dist)                        [demo edge, UNPUBLISHED — no cycle]
```

`keyframes(lib) → value.js(lib)` is direct (`keyframes` deps `@mkbabb/value.js@^0.10.0`).
`glass-ui(lib) → value.js(lib)` is the OKLab dedup (inv-K-2; glass-ui externalizes `@mkbabb/value.js`).
`glass-ui(lib) → keyframes(lib)` is the spring dep. value.js itself imports no cohort peer at the
library level, so it is the sink — **publish it first**. The only `value.js → glass-ui` edge is
`value.js(demo) → glass-ui(dist)`, demo-only and unpublished, so there is **no cycle**.
**The binding publish-order for M** (Lane E, verified):

1. **value.js 0.11.0** — strike `development`; tighten `parseCSSColor` return type; add
   `parseColorUnitToRgb01`; land the M.W1 consumer-compliance. **PUBLISH FIRST** (the registry
   gate for glass-ui's consume).
2. **glass-ui 3.3.0** — **bump its `@mkbabb/value.js` peer + devDep `^0.10.0` → `^0.11.0`** (the
   `^0.10.0` range excludes 0.11.0 — without this bump the 3.3.0 cut ships against a stale peer and
   the spine's gate is unenforced), then cut *against value.js ^0.11.0*, carrying the aurora
   cast-delete + the W-LIFT blob primitives + the W-D dock fix + dts-emitting `build:watch` + the
   value.js-devDep drop (+ fourier's K.W4 design primitives `asideSide`/divider-rule/token-hook/P5 —
   glass-ui's arm, coordinated). **glass-ui-owned; M tracks it as a cohort ask.**
3. **value.js demo consume** — bump `@mkbabb/glass-ui → ^3.3.0`; extirpate the bespoke blobs;
   delete the parseCSSColor casts; re-verify dock e2e; **v1.0.0**.

keyframes needs no further publish (3.0.0 already unblocks the router); a cohort note asks it to
make `build:watch` dts-emit (§2.3 freshness parity).

---

## §4 — Wave schedule (the unilateral → publish → cohort → close spine)

**UNILATERAL** waves (value.js-only; dispatch as soon as M.W0 ratifies — no cross-repo wait).
**COHORT** waves gate on a glass-ui 3.3.0 cut. The DEV/IMPL boundary is M.W0→M.W1.

| Wave | Disp. | Kind | Lanes | Hard gate |
|---|---|---|---|---|
| **M.W0 — Charter** | DEV | — | this doc + `audit/{fold-ledger,prompt-coverage,wave1-2-synthesis}.md`; ratify supersede-K | committed; ratified |
| **M.W1 — Precept remediation + publisher compliance** | IMPL | unilateral | A: delete the `development` export key (package.json:27) — the §2.4 precept violation · B: retire the true band-aids (`dedupe` expansion, `fs.allow` widening, `check-types.mjs` foreign-filter) → mechanism-C (dist-resolution + `build:watch`); populate `dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)` · B′: **REPOINT (do not delete) the demo self-alias** `@mkbabb/value.js` from `src/index.ts` → `dist/value.js` — it is the demo bundler's resolution path for glass-ui's `@mkbabb/value.js` import (a package cannot self-install; `node_modules/@mkbabb/value.js` is absent), NOT a published-exports self-reference, so it survives under mechanism-C pointing at dist · C: bump `reka-ui ^2.0.0 → ^2.9` + `npm install` + a lockfile-drift guard (align the demo to glass-ui's reka) | `vue-tsc` 0 against a FRESH dist; `proof:resolution`-clean (no `development`); the demo resolves glass-ui's value.js import via the dist-alias; full vitest + playwright = baseline |
| **M.W2 — Hardening (desktop-P0 + type completion)** | IMPL | unilateral | A: the desktop pane-visibility P0 — Tailwind v4 `@source` directive in `demo/@/styles/style.css` (K.W2.6) + a CI emission-probe · B: the **WithId read-side transposition** for the WHOLE escape class — the read signatures of all 4 model repositories (Palette ×6 methods, ProposedName, Tag, AdminAuditEvent) + the formatter params → `WithId<T>`; **all 25 `as <Model> & { _id: unknown }` casts delete**; the secondary escapes (`as Record<string,unknown>` ×8, `row.x as T` ×7) typed at the repo-aggregation boundary | desktop panes render in-viewport (Playwright); `grep -E 'as [A-Z]\w+ & \{ _id: unknown \}' api/src` → 0, `grep WithId api/src` > 0; api `tsc` 0 + suites green |
| **M.W3 — Elegance transpositions** | IMPL | unilateral | A: collapse the two divergent CSS-color→RGB DOM-round-trip resolvers into one library-backed primitive (`parseColorUnitToRgb01`) · B: `parseCSSColor` typing root-fix (annotate the memoize return; deletes the 9-site `cssToOklch` cast surface) — the 0.11.0 head · C: the ONE real PRM hole — `useWatercolorBlob` gates via the existing static path (treat PRM as `animate=false`); adopt `useLayerTransition` off its self-described glass-ui "Local fork" | `tsc` 0; the 2 resolvers → 1; PRM-gated; no behavior drift |
| **M.W4 — value.js 0.11.0 publish** | IMPL | unilateral (spine head) | cut 0.11.0 to the registry (W1+W3 landed); the RELEASE.md ceremony | `npm publish` 0.11.0 green; the registry tag live (unblocks glass-ui 3.3.0) |
| **M.W5 — Aurora consummation (C2 + VAL-1)** | IMPL | semi-unilateral (producer `deriveAurora` in 3.2.0) | A: wire `AuroraPane` → glass-ui's **`deriveAurora`** (the real export — the spec's `deriveAuroraPalette` was a ghost name); picker→atmosphere derive · B: VAL-1 OKLab aurora-LUT **ship-or-KILL** at this close (the J kill-date; the 2nd consumer is the ≥2-gate) · C: fix the "/atmosphere is live" false-footer | aurora visibly palette-derived (π before/after); VAL-1 shipped-or-killed; no static "Sky" |
| **M.W6 — Modern-web + router 4→5** | IMPL | unilateral (vue 3.5 satisfies router 5; NOT keyframes-gated) | A: vue-router 4→5 + typed routes + `VIEW_MAP` single-source (deletes `componentFor`'s if-ladder) · B: View Transitions / `@layer` / `@container` / `light-dark()` levers · C: the real `dispatch.ts` hue-cluster extraction → `mix.ts` (vs the K.W2e comment-condensation) · D: demo `Palette` id-honesty (`id?: string` + guards, NOT a discriminated union) · E: inv-K-5 typed-degraded-backend (delete the `VITE_API_URL` hack) | router 5 green; VIEW_MAP single-source; `dispatch.ts` genuinely decomposed; suites green |
| **M.W7 — glass-ui 3.3.0 cohort re-anchor (blob C3 + dock C1)** | IMPL | **COHORT** | glass-ui authors 3.3.0 (the W-LIFT goo-blob/WatercolorDot lift + subpath exports + the W-D `GlassDock :inert` realignment + dts-watch + devDep-drop) → value.js consumes: **extirpate** `demo/@/components/custom/{goo-blob,watercolor-dot}/` + `webgl-utils` (CH-1/CH-3); the 9 WatercolorDot + blob-footprint refinements; **re-verify the 16 dock-Select e2e specs GREEN** | glass-ui 3.3.0 published; demo blob dirs deleted; dock e2e green; π blob-footprint correct |
| **M.W8 — Infra convergence** | IMPL | unilateral | A: **Ask 3 (N1-fix, P1 critical-path)** — palette-api rsync deploy-dir → git checkout under the canonical root + adopt `deploy-hook.sh` (the 4th migration that unblocks deleting the host `dispatch.sh`) · B: Ask 5 — GH-Pages → CF-Pages CNAME · C: inv-22-color — bring `api.color.babb.dev` to the 4-endpoint vhost contract (`/health`,`/docs`,`/openapi.json` currently 404) | the deploy acceptance-shapes (ADOPTION-ASKS §Ask-3/5/inv-22) green; CI deploy via webhook |
| **M.W9 — v1.0.0 close + π + reconciliation** | DEV (close) | unilateral | A: the π visual-runtime lane (`design/K.W6-pi-visual-runtime.md`, migrated) — before/after readPixels on aurora/blob/desktop/dock · B: **v1.0.0** cut · C: the doc-reconciliation sweep (strike VAL-9 re-bookings from K.md §7; commit the dirty `docs/precepts` submodule; the `demo/CLAUDE.md` is restored; PROGRESS inv-K-4 framing) · D: **re-confirm L's close gate on the post-M.W1 substrate** (the A2 process-integrity item); cohort close; `FINAL.md` | π green; v1.0.0 published; all invariants verified; `FINAL.md` = M CLOSED |

**Dependency edges** (not strictly linear — the DAG): W1 precedes everything (clean resolution
is the substrate). W2/W3 are parallel-capable unilateral hardening. W4 (publish) gates W7 (the
glass-ui cut against 0.11.0). W5 consumes an already-shipped producer (3.2.0 `deriveAurora`);
W6 needs only vue 3.5 (satisfied) — both dispatchable after W1, before or beside W4. W7 is the one
genuinely cohort-blocked wave. W8 (infra) is independent unilateral, runs anytime after W1. W9 closes.

---

## §5 — Critical files + ownership (the binding sites)

| Surface | Files | Wave |
|---|---|---|
| Precept fossil + band-aids | `package.json:27` (delete `development`), `vite.config.ts:37` (repoint self-alias→dist), `:49` (dedupe), `:195,254` (fs.allow), `tsconfig.demo.json:28`, `scripts/check-types.mjs`, `scripts/dev.sh:37` | W1 |
| Desktop-P0 | `demo/@/styles/style.css` (`@source`), `demo/color-picker/App.vue:35,46,59` | W2.A |
| WithId transposition | the 6 Palette read methods `repositories/palette.ts` (`findBySlug`/`findManyByFilter`/`findManyForCursor`/`findByUserSlug`/`findForksOf`/`findPastGrace`) + the ProposedName/Tag/AdminAuditEvent read methods → `WithId<T>`; `format/palette.ts` + the 13 cast-holding files; `insert(WithoutId<Palette>)` stays untouched | W2.B |
| Color-resolver + parseCSSColor | `src/parsing/index.ts` (parseCSSColor), the 2 demo canvas resolvers, `useWatercolorBlob.ts:87` | W3 |
| Aurora | `demo/@/components/.../AuroraPane.vue`, glass-ui `deriveAurora` (consume), `src/units/color/oklab.ts` (VAL-1) | W5 |
| Router / modern-web | `demo/` router + `VIEW_MAP`, `src/units/color/dispatch.ts` → `mix.ts` | W6 |
| Blob extirpation | `demo/@/components/custom/{goo-blob,watercolor-dot}/`, `demo/@/lib/animation/webgl-utils.ts` | W7 |
| Infra | `api/compose.yaml`, `api/apache-vhost.conf`, `scripts/deploy.sh`, the deploy host arm | W8 |

---

## §6 — Invariants (design constraints, structural — no proof scripts)

M inherits the full `src/` + `api/src` (L) regime and adds:

- **inv-M-1 — zero exports-map precept violation.** No `development` (or any source-resolution)
  export condition in `package.json`; `proof:resolution`-clean. *Enforced by* deletion + glass-ui's
  `FORBIDDEN_EXPORT_KEY` gate reading clean.
- **inv-M-2 — WithId completeness (the whole escape class).** Zero `as <Model> & { _id: unknown }`
  in `api/src` across ALL 4 model types (Palette/ProposedName/Tag/AdminAuditEvent); the driver's
  `WithId<T>` flows from the repository boundary. *Enforced by* the repo signatures + the
  class-wide close-grep `grep -E 'as [A-Z]\w+ & \{ _id: unknown \}' → 0`.
- **inv-M-3 — one color-resolution path.** Exactly one CSS-color→RGB resolver, library-backed (no
  divergent DOM-round-trip duplicate). *Enforced by* the unification + review.
- **inv-M-4 — PRM-complete.** Every continuous render loop in the shipped surface gates
  `prefers-reduced-motion`. *Enforced by* the `useWatercolorBlob` fix + the audit's RAF ledger (the
  "epidemic" is constellation-wide, not value.js — only one real hole).
- **inv-M-5 — no bespoke design-system facility in demo/.** The goo-blob + watercolor-dot facilities
  live in glass-ui, consumed from dist (CH-1/CH-3 discharge). *Enforced by* the W7 extirpation.
- **inv-M-6 — registry consumption.** Post-close, value.js consumes glass-ui + keyframes by published
  version (DEC-2), not `file:` (the `file:` symlink is a co-dev convenience, version-tag-gated). *Verified
  at* v1.0.0.

The proof-idiom stays retired: every invariant is structural (deletion, the type system, `tsc`/`eslint`,
the excision itself) + a close-time review, never a committed `proof:*.mjs`.

---

## §7 — Befitting-keep (K's landed work M builds on — do not re-litigate)

All of L (the api fastidious closure, 9 invariants). From K.W2: the tsconfig.lib/demo split
(inv-K-1, precept-clean), inv-K-2 OKLab dedup + 1e-6 canary, the api-lane (idempotency +
conformance + id-removal), the unified `ci.yml` + lighthouse/axe + DEC-9 deploy. The proof-idiom
retirement. The value.js-J atom-diff + publish + the [P0] visibility filter (cohort-green with
fourier-J). The L.W4 verify-not-split (an exemplary KISS proof). The screenshot-session π baseline
(84 captures, the M.W9 π before-side). value.js src/+demo/ discipline (0 god-modules, exactly 2
`as unknown as`, 0 `as any`, clean barrel) — re-affirmed by the audit, not re-litigated.

---

## §8 — Cohort coordination (the cross-repo asks M is owed / owes)

M owes (value.js-unilateral, then publish): the 0.11.0 cut (precept-clean + parseCSSColor typed).
M is owed (glass-ui 3.3.0, glass-ui's arm — coordinated, not value.js-written, inv-16): **the
`@mkbabb/value.js` peer + devDep bump `^0.10.0` → `^0.11.0`** (the spine-gate enforcer — the
`^0.10.0` range excludes 0.11.0), the W-LIFT blob primitives + subpath exports, the W-D
`GlassDock :inert` realignment, the aurora `cssToOklch` cast-delete (against 0.11.0), dts-emitting
`build:watch`, the value.js-devDep *drop* (phantom devDep, keep peer only), and fourier's K.W4
design primitives (`asideSide`/divider-rule/token-hook/P5 — so fourier-J.WC can adopt them in the
same cut). keyframes: a `build:watch` dts-emit cohort note (no publish).
The fourier-J ↔ value.js-J atom-diff/publish cohort is **closed on value.js's side** (shipped);
fourier-J.WC continues independently. All cross-repo writes stay in each repo's own session
(inv-16); M tracks the asks, glass-ui authors them.

---

## §9 — Successor + deferrals

M targets **zero-deferral close**. Anything that cannot land is BOOKED with an E5 trigger in
`audit/fold-ledger.md`: the keyframes precept-pin convergence (CH-10, maintainer-signal), the
fourier-quiescence chronic (CH-13, fourier-owned), any residual host-only infra op (Ask-3's host
git-checkout step if maintainer-gated). The L-SEED monitors (cron-txn — re-scope to the
orphaned-vote TOCTOU the audit found; bench-script — the audit found it phantom, DROP) fold here.
M's successor (if any) inherits only true maintainer-signal items. **v1.0.0 is the close.**

---

## §10 — Mode + authority

**Mode**: planning-only at open. This document + the audit ledgers author **no code**. M.W0
(charter) is DEV; M.W1–M.W9 are IMPL, dispatched on explicit user ratification.

**Authority**: the post-L two-wave 12-agent deep audit of 2026-06-04 (`audit/wave1-2-synthesis.md`).
The supersede-K decision (§0) re-baselines K's drifted plan rather than patching it. NO legacy
(including no legacy plan-debt), NO workarounds, idiomatic gestalt — architectural transpositions
for elegance, simplicity, and performance.
