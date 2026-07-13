# h-exec-w0 — EXECUTION-READINESS of T.W0 (+ a W1 lane-brief quick pass)

**Lane class**: hardening / adversarial (zero product-code, zero corpus edits — findings only).
**Substrate**: `tranche-t` @ `2cde0e3`. **Product under audit**: `docs/tranches/T/waves/T.W0.md`
against its spec-of-record (`SYNTHESIS.md §3` W0 rows · §4 packets · §6.1 slate · §6.2/Q14),
the letter `letters/GLASSUI-T-ASKS.md`, the cited evidence lanes (`t-ci-lighthouse-record`,
`t-oracle-gaps`, `t-legacy-sweep`, `t-docs-truth`), and the LIVE TREE @ HEAD.
**The charge**: could a cold agent dispatch T.W0 today **from its doc alone**? I walked every W0
item as that agent — the packet re-stamp/dispatch protocol, the `proof:*` → `test:dist`
institutionalization, the seven oracle mints, the O-25/`--ring` CI hygiene, and doc-truth W0-4 —
asking of each step: is the prerequisite present, the instruction unambiguous, the decision owned?
Then a quick pass over W1's three lane briefs for W0-deliverable seams.

**Method**: I re-derived the concrete anchors against the live tree (the retained-4 proof-script
headers, the CI job graph in `ci.yml`, the `scripts/` inventory, the demo excision targets, the
`src/subpaths/` + `src/transform/` trees), traced O-25/O-3 back to their cited lanes, and read the
S-tranche dispatch precedent (`S/FINAL.md`, `S/PROGRESS.md`, `S/letters/`) for what "dispatch +
producer-inbox cite" has meant in practice.

**Overlap discipline**: the sibling `h-wave-w0-w1` owns the W1-src subpath-invariant-home
contradiction (its M1), the Q15 leaked-symbol undercount (M2), the F3 dark-mode drop (S1), the
writer-disjointness overstatement (S2), the KF-letter-artefact gap (S3), and the cross-ref label
nits (N1–N4). The sibling `h-oracle-slate` owns the oracle-**slate structure** (O-6/perceptibility
proxy, the ×φ size oracle, O-3 real-GPU-in-CI, the §6.3 dangling ref). **I report only
EXECUTION-readiness seams those lanes did not reach** — where a cold agent, doc in hand, hits a
missing prerequisite, an undischargeable gate, or an unowned decision. Ranked most-severe first.

**Top-line verdict**: the wave scaffolding (file-bounds, commit-plan, verification-artefacts,
hand-off) is thorough and most anchors are live. But TWO W0 gate items are **non-executable as
written** — the W0-1 "producer-inbox cite" cannot be produced by a value.js agent under the fence
(M1), and O-25 (a full W0-6 gate item) has **no buildable spec anywhere in the corpus** (M2). Three
SHOULDFIX are wiring/definition gaps that stall a cold agent at a decision the corpus never made.

> **Framing note (not a finding).** The literal answer to "could a cold agent dispatch T.W0
> **today**?" is **no, by design**: the dispatch gate is CLOSED — development-only until the
> `T.md §12` Q1–Q17 owner ratification (`T.W0.md:4-5,20`; `T.md:31-33`). The findings below assume
> that gate opens with the §8 DEFAULTs applied, and ask whether the doc is self-sufficient
> *then*.

---

## MUSTFIX

### M1 — W0-1's "producer-inbox cite" completion criterion is undischargeable by a value.js agent under the foreign-tree fence; the corpus never assigns the relay

**Severity**: MUSTFIX. **Location**: `T.W0.md:16` (composite gate), `:98` (Hard gate item 1:
"dispatch record + producer-inbox cite"), `:141` (verification artefacts: "the W0-1 dispatch record
+ inbox cite"); `letters/GLASSUI-T-ASKS.md:113-127` (Dispatch protocol step 5: "Record the dispatch
in `PROGRESS.md` (event-log row + **producer-inbox cite**)"); vs the fence `T.W0.md:92`
("Do NOT touch: `../glass-ui` … zero files — the fence") + letter `:25` ("**T touches ZERO
glass-ui files**").

**The seam.** The W0-1 gate requires a **producer-inbox cite** in three places. What is the
"producer inbox," and what does citing it entail? The corpus never says — but the S precedent it
inherits does, and it contradicts T's fence. In S, "dispatch + producer-inbox cite" was discharged
by **physically relaying the asks into the glass-ui repo** and citing the resulting glass-ui-side
commit: `S/FINAL.md:38` — *"blob-genesis brief (**relayed to the producer inbox @ their
`3188171`**)"*; `S/PROGRESS.md:106` — *"ADDENDUM DISPATCHED → **glass-ui `f2ab4a18`**"*,
*"L20 … DISPATCHED (addendum A5 → **glass-ui `60fe642a`**)"*. So historically the "inbox cite" is a
**glass-ui commit hash** produced by writing into the producer tree.

T forbids exactly that write ("zero files — the fence"). So a cold W0-1 agent is stranded:
- It cannot relay into glass-ui (the fence), so it cannot mint the glass-ui-side commit the S
  precedent's "inbox cite" *is*.
- The letter's own §3 note ("it will be relayed into this inbox **when it lands**") implies a
  *later, other-actor* relay — which means the cite does not exist at W0-1 dispatch time, yet W0-1
  must **complete** at dispatch (Q7: "fires immediately"; `T.W0.md:13-14`).
- The wave header's escape hatch is "acked-**or-recorded**" (`T.W0.md:16`) — a value.js-side
  `PROGRESS.md` record would satisfy "recorded" — but the Hard gate (item 1) and verification
  artefacts still name a **"producer-inbox cite"** specifically, and nothing in the corpus says the
  cite may be a value.js-side self-record, deferred to the producer, or supplied later.

This is precisely a papered-over seam: the gate reads clean, but the artefact it demands is either
forbidden (relay) or nonexistent-at-close (deferred), and the doc never rules which.

**Failure for a cold agent.** At W0-1 close the agent has re-stamped the HEAD and recorded a
`PROGRESS.md` row, then reaches "producer-inbox cite" in the Hard gate and cannot produce one
without either breaching the fence or inventing an unowned convention. It halts or papers it.

**Proposed amendment.** Rule the cite explicitly at `T.W0.md:98` + the letter's protocol step 5:
either **(a)** the W0-1 "producer-inbox cite" **is** the value.js-side dispatch record (the letter's
`## Dispatch stamp` section + the `PROGRESS.md` event-log row) — the relay into glass-ui is a
producer/maintainer action recorded **later** (a booked residual, like X1/X2), not a W0-1
completion artefact — OR **(b)** name the actual relay channel and owner (who writes the T asks into
the glass-ui inbox, and under what fence exemption), and mark the glass-ui-side cite as a
**deferred/acked** artefact so W0-1 can close on "recorded" alone. Reconcile the "acked-or-recorded"
header with the "producer-inbox cite" Hard-gate line so they name the same closeable artefact.

---

### M2 — O-25 (a full W0-6 gate item) has NO buildable spec anywhere in the corpus; its cited evidence lane contains zero O-25 content

**Severity**: MUSTFIX. **Location**: `T.W0.md:19,45,112` (W0-6 gate: "O-25 prod-lineage assert
wired (CI/boot probe vs expected build lineage)") + `:169`; `SYNTHESIS.md:523` (the sole spec: the
one-line §6.1 row); cited evidence `T.W0.md:45` = "O-25 = §6.1 (the next stale-prod window caught by
an oracle, not an owner eyeball)" pointing at `t-ci-lighthouse-record §layer-4`.

**The gap.** O-25 is a hard-gate item of W0-6 (item 6: "O-25 prod-lineage assert wired") and a
first-class member of the slate of record. Yet its **entire specification** is the one §6.1 line:
*"Prod-lineage assert: CI/boot probe vs expected build lineage."* I traced it:
- `t-ci-lighthouse-record.md` (the named evidence lane) — `grep -n 'O-25\|lineage\|prod-lineage'`
  = **zero hits**. The lane tells the *why* (the `--branch=main` false-success footgun that left
  color.babb.dev a month stale — its §layer-5) but never specifies the *assert*: no "expected build
  lineage" definition, no comparison mechanism, no probe surface.
- `t-oracle-gaps.md` (the oracle census) — O-25 is a CI-infra oracle born from the deploy-chain
  lane, **not** one of the T-1..T-29 finding gaps the census enumerates; it is absent there.
- `T.md` (`:42,251,342,378`) and `PROGRESS.md` — references only; "the slate of record is
  SYNTHESIS §6.1" (`T.md:342`). No fuller spec.

So a cold W0-6 agent building "the O-25 prod-lineage assert" from the doc must **invent** every
load-bearing decision the spec omits:
1. **What is "expected build lineage"?** The current `github.sha`? A content hash embedded in the
   built bundle? The CF Pages *production* deployment's source sha?
2. **What does the probe compare, and to what source of truth?** Served asset hash vs built-artifact
   hash? `wrangler pages deployment list` production-source vs `github.sha`? The footgun in the
   lane was a **branch** mismatch (`main` vs `master`) — is O-25 asserting the deployed branch, the
   deployed sha, or the served bytes?
3. **CI or boot?** The spec says "**CI/boot** probe" — two different surfaces (a CI step vs a
   runtime boot-time check). Unresolved.
4. **Credentials.** A production-lineage assert that queries CF Pages needs wrangler/CF creds in
   CI — present? scoped? The corpus is silent.

`h-oracle-slate` verified O-25 is *wired* (numbering + wave assignment) but its CLEAN note checks
only "numbering integrity + wave-column match" — it did not test **buildability**. So this is
un-claimed: the gate item is non-executable because its spec does not exist.

**Failure for a cold agent.** W0-6 lists "O-25 prod-lineage assert wired" as a hard gate; the agent
reads the one-line spec, cannot determine what to assert or where, and either fabricates an
arbitrary check (a proxy — the exact S disease) or halts.

**Proposed amendment.** Author a real O-25 mint spec (in `SYNTHESIS.md §6.1` extended, or a new
row in `t-ci-lighthouse-record` beside its §layer-5 footgun narrative) naming: the compared
quantities (recommend: CF Pages **production** deployment source-sha == the built commit, since the
footgun was a production-branch mismatch), the surface (CI step in the deploy-pages workflow, run
post-deploy), the source of truth (`wrangler pages deployment list` production entry), and the
credential precondition. Until then, mark O-25 as **spec-pending** in the W0-6 gate rather than a
close-blocking hard-gate item.

---

## SHOULDFIX

### S1 — `test:dist` has an implicit `npm run build` (library) prerequisite that W0-2's wiring instruction omits; the script's command shape is also an unowned decision

**Severity**: SHOULDFIX. **Location**: `T.W0.md:17,41,86,101-102` (W0-2: "into a CI-wired
`test:dist`" / gate "CI runs `test:dist`") + `SYNTHESIS.md:270`; the §Format cadence `T.W0.md:136`
("`test:dist` after W0-2").

**The gap.** All four retained gates read the **built** artifact and say so in their own headers
(verified @HEAD): `proof-css-parity.mjs:14` *"This gate reads the BUILT dist (not source) —
**rebuild before running it**"*; `proof-round-trip-idempotent.mjs:19` *"Reads the BUILT dist — run
`npm run build` first"*; `proof-serialize-fidelity.mjs:15` *"Run `npm run build` first"*;
`proof-perf-target.mjs:5` — over `dist/value.js`. So `test:dist` has a hard **library-build**
prerequisite. W0-2 never states it:
- The item says "retain-reclassify … into a CI-wired `test:dist`" but gives **no build-ordering
  instruction** and **no `test:dist` command shape**. Does `test:dist` embed the build
  (`"test:dist": "npm run build && node scripts/…"`) or assume a prior build? Unowned.
- `ci.yml` builds the library at line 148 (`Build library (dist/value.{js,d.ts})`) inside
  `build-and-test`, before vitest — so a natural CI home exists. But the **gh-pages** job
  (`ci.yml:333+`) builds only the demo, and a `test:dist` step misplaced there, or run **locally**
  without a fresh build, ENOENTs on `dist/value.js` — **the exact ENOENT class this very lane just
  fixed** (`t-ci-lighthouse-record` §layer-2: LHCI `scandir … dist/gh-pages` before it existed).

**Failure for a cold agent.** The agent authors `"test:dist": "node scripts/proof-css-parity.mjs
&& …"`, wires it as a fresh CI step or runs it locally to satisfy the §Format cadence, and gets
`ENOENT dist/value.js` because no build preceded it — with no doc line telling it the build is a
precondition.

**Proposed amendment.** State in W0-2 that `test:dist` runs **after** the library build (or, more
robustly, self-builds: `"test:dist": "npm run build && node scripts/proof-css-parity.mjs && …"`),
name its CI home (the `build-and-test` job, after `ci.yml:148`), and fix the aggregate command shape
so the cold agent does not re-decide it.

### S2 — W1-api's "scripts/ regroup" MOVES the repo-root proof scripts that W0-2's `test:dist` wiring points at; no re-point gate in either wave (W1 quick-pass)

**Severity**: SHOULDFIX. **Location**: `T.W0.md:86` (W0-2 file-bounds: `package.json` scripts +
`.github/workflows/ci.yml` test:dist step) vs `T.W1.md:43,122` + `SYNTHESIS.md:282` (W1-api:
"`scripts/` regroup (deploy/dev/ci/**gates**)").

**The seam.** The four retained gates are all repo-root `scripts/proof-*.mjs` (verified:
`scripts/proof-css-parity.mjs`, `-round-trip-idempotent.mjs`, `-perf-target.mjs`,
`-serialize-fidelity.mjs`). W0-2 wires `test:dist` to those paths in `package.json` + `ci.yml`.
Then W1-api's file-bounds explicitly claims "`scripts/` regroup" with a **`gates/`** bucket — i.e.
the retained-4 (the surviving `test:dist` "gates") move to `scripts/gates/`. After that move,
**every `test:dist` path (package.json + ci.yml) is stale** unless re-pointed. Neither the W0-2 nor
the W1-api gate names this re-point; W1's "ZERO re-export shims" + "suites green" gates don't reach
a `package.json` script-path update. (Secondary: repo-root `scripts/` also holds `abrogation-sweep`,
`boot-smoke`, `dev.sh`, `deploy.sh` — non-api tooling — so W1-**api** claiming write-authority over
the whole repo-root `scripts/` tree is itself a lane-boundary question the disjointness map does not
flag.)

**Failure for a cold agent.** A W1-api agent regroups `scripts/` per its file-bounds; `test:dist`
(and its ci.yml step) silently break; the W0-2 deliverable is dead and nothing in W1's gate catches
it until a later `test:dist` run fails.

**Proposed amendment.** Add to W1-api's gate "re-point `package.json` `test:dist` + the ci.yml step
to the regrouped `scripts/gates/` paths (the W0-2 deliverable)," or exempt the W0-2 retained-4 from
the `scripts/` regroup (keep the `test:dist` paths frozen). Either way name the coordination so the
moving-script-path target is owned.

### S3 — W0-5's "O-7 card-census **scaffold**" is undefined; "scaffold" appears only in the mint row, while the only O-7 spec is the full W3 census — the cold agent has no scaffold/census boundary and no born-RED content

**Severity**: SHOULDFIX. **Location**: `T.W0.md:44,89,109` (W0-5 mints "O-7 card-census
scaffold") + `SYNTHESIS.md:273`; the full O-7 spec `SYNTHESIS.md:505` + `t-oracle-gaps §2.2`
(the W3 deliverable).

**The gap.** W0-5 must mint an **"O-7 card-census scaffold"** born-RED. But "scaffold" is defined
**nowhere** — `grep 'scaffold'` across the lanes + SYNTHESIS returns only the W0-5 row that uses the
word (`SYNTHESIS.md:273`). The only O-7 specification is the **full** population census
(`t-oracle-gaps §2.2`: enumerate 9 `Card`-panes + named fixtures, read `background-color` +
`backdrop-filter`, assert ONE rung membership, both schemes) — and that is explicitly the **W3**
gate (O-7 wave column = W3; `T.W3.md` W3-1). So the cold W0-5 agent must guess: is the scaffold a
test harness skeleton with no assertions? the census loop stubbed against the current (mostly
un-ruled) tiers? a subset of panes? And "born-RED against today's tree where its defect is live" is
incoherent for a *scaffold* — a skeleton with no live assertion cannot be honestly RED.

**Failure for a cold agent.** The agent cannot produce the O-7 scaffold as a discrete, born-RED
W0 artefact distinct from the W3 census, because the boundary and the scaffold's asserting content
are unspecified.

**Proposed amendment.** Define "O-7 scaffold" at `SYNTHESIS.md:273` / `T.W0.md:44`: e.g. "the
census **loop + surface roster + resolver** landed and wired, asserting nothing yet (or asserting
the one already-live rung defect), so W3 fills in the rung table" — and state its born-RED (or
born-neutral-with-cite) expectation explicitly, since a scaffold is a structural precondition, not a
defect gate.

---

## NOTE

### N1 — the born-RED rule is a per-oracle conditional ("where its defect is live") that is never resolved per oracle; O-4/O-5 guard a boot overture W2 has not built yet

`T.W0.md:44,109` (Hard gate item 5): "each **born-RED against today's tree where its defect is
live** … never softened to warns." But the W0-5 set spans oracles whose defects have very different
live-ness today: O-1 (color-truth) and O-2 (real-hydration) guard *live, prod-visible* defects
(the pink boot / seeded-hydration proxy) — clearly born-RED. But **O-4** (order-invariance under 6×
throttle) and **O-5** (pacing/jitter) guard the **boot OVERTURE that W2 has not yet authored** —
there is no B0–B4 beat sheet in the tree today (W2-3 builds it), so an order-inversion or
jitter defect may simply not be *expressible* yet. The rule's "where its defect is live" clause
implicitly permits born-GREEN/born-N/A for such oracles, but the adjacent prohibition ("NO faking
an oracle green … a mint that passes where its defect is live is a proxy"; `:123-124`) leaves the
cold agent unable to tell whether a green O-4/O-5 today is honest (defect not yet live) or a
forbidden proxy. Amendment: annotate each W0-5 oracle with its expected W0 state (born-RED vs
born-GREEN-pending-W2) at `SYNTHESIS.md:273` so the honesty bar is per-oracle, not a blanket
"born-RED" the two boot-order oracles cannot literally meet pre-overture.

### N2 — W0-3 excision targets verified live and clean (recorded so the clean bill carries evidence)

Spot-checked @HEAD: `BulkActionToolbar.vue` + `SortFilterMenu.vue` both exist under
`demo/@/components/custom/palette-browser/` with **zero render consumers** (no `import`/`<Tag>`
usage; the only `admin-palettes.ts:11` reference is a **comment**, covered by W0-3's separate "stale
comments" item) — excision is clean, `grep-zero` reachable. `PaletteSlugBar` iconOnly migration IS
specified in `t-legacy-sweep §301-306` (the `PaletteSlugBar.vue:16` TODO → `<Button iconOnly …>`
per BH.W-SIZE-UNIFY, condition met, migration never done) — executable, though W0-3's cross-ref
label "t-legacy-sweep LEG-1..9" is the wrong-lane label already logged by `h-wave-w0-w1 N1`.
`src/transform/path.ts` EXISTS (W0-4's "transform/CLAUDE.md path.ts" doc-add anchor is valid);
`src/subpaths/` has the 7 barrels and no `CLAUDE.md` (W0-4 authors it NEW — correct); the "5→6 e2e
×2" doc-truth fix is real and executable (`t-docs-truth F13`: root `CLAUDE.md` says "5 projects" at
two sites; the 6th is `smoke-perf`). `generate-favicon.mjs` has zero references outside itself
(W0-2 verify-dead confirmed). These are executable as written.

---

## Recovery-readiness verdict

W0's scaffolding is strong and most anchors are live, so a cold agent resuming a dead W0 lane has
good footing on W0-2's proof-split arithmetic, W0-3's excisions, W0-4's doc-truth, and W0-6's
`--ring`/smoke-safari items. The blockers are two gate items that **cannot be closed from the doc
alone**: **M1** (the "producer-inbox cite" is forbidden-by-fence or nonexistent-at-close, unruled)
and **M2** (O-25 is a hard-gate item with no buildable spec anywhere in the corpus). S1–S3 are
wiring/definition gaps that will stall the agent mid-item (a `test:dist` ENOENT, a broken
script-path after W1, an undefined "scaffold"). Fix M1+M2, pin S1's build-order, coordinate S2's
re-point, and define S3's scaffold, and W0 is cold-dispatchable under the §8 DEFAULTs.

*Every claim is a corpus `file:line` or live-tree cite at `tranche-t` @ `2cde0e3`. Zero
product-code, zero corpus edits. No dev server booted (this is a spec-executability audit, not a
live probe).*
