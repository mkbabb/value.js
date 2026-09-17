# THRICE — F-PE-api — SKEPTIC 2 (assume WRONG; attack architecture + parsimony)

Target: `armB/program-PE-api.md` (11 waves, 8 OD rows). Truth inputs re-read:
`armB/sweep-api-fourier.md`, `armB/sweep-value-demo.md`. Fresh probes this seat (file:line
below): value api `routes/{forks,publish,crud}.ts`, `service/{forks,oklab,crud}.ts`,
`schema.ts`; fourier `routers/visualizations.py:488-612`; git history (`a8ff7792` = TA-4).
Independence firewall honored (no vnext/, no snapshot, no armA). Verdict up front: **the
program's truth base is sound but the formation is process-heavy (5 of 11 waves are
documents/apparatus), its flagship wave is internally contradictory, one OD row ratifies a
vacuous invariant over an unseen divergence, and two waves resurrect the owner-retired
grep-proof idiom.** Counter-program: 6 waves + registry rows (§C).

---

## A — FINDINGS (ranked; each: attack → evidence → consequence → fix)

### A1 · BLOCKER · OD-api-3 is refuted by F-03's own born-RED gate (fork ≠ remix-with-zero-overrides)
The recommendation "fork becomes remix-with-zero-overrides; the verbatim-copy route retires"
coexists with the F-03 gate "remix no-op test expecting 422 `urn:contract:remix-noop`". Under
the fourier-isomorphic semantics the program mandates, these are mutually exclusive: fourier
builds `child_atoms = source_atoms ∪ overrides` and 422s when `diff_atoms` is empty
(`visualizations.py:512-542` — probed, confirmed). A ZERO-override remix changes zero atoms
**by construction** → it is ALWAYS the no-op → always 422. Palette atoms are the colors
(order-independent `atomSetHash`, sweep §3.4C; name is not an atom in either repo's
vocabulary). Consequence: the "converged" design does not converge fork into remix — it
**deletes the verbatim-fork capability outright**, and the F-03 demo rider ("`forkPalette`
migrated to remix") ships a fork affordance (`demo/palettes/useVersionHistory.ts` →
`api/versions.ts:43`) that 422s on every press. No capability tombstone prices this; the §7
law-1 discipline the program cites everywhere else is silent exactly where it fires.
**Fix**: OD-api-3 must present the real trichotomy — (i) keep `POST /fork` as the honest
zero-delta verb beside remix; (ii) drop the no-op guard (breaking fourier isomorphism —
say so); (iii) retire verbatim-fork as a PRICED product regression with a redesigned UI flow
(fork button must collect ≥1 changed color). "Converge on remix" as written picks none and
implies all three.

### A2 · MAJOR · F-03 re-books the TA-4 chronic (the write-only apparatus, third ride)
The excision commit names the mechanism: `a8ff7792` — "excise the **write-only** atom-diff
apparatus (the /remix+/diff fold)". It died because no product consumer existed (the exact
no-advocate ⇒ no-paper mechanism P2.1 names). F-03 restores the server rail + client
wrappers but makes the UI consumer CONDITIONAL ("DELTA only **if** remix is surfaced in the
browse/palette-card UI"). Restored-but-unsurfaced = write-only apparatus again = the same
chronic on its third ride (J.W2 birth → T.W1 excision → V restore). Per §7 this is a DISEASE
ROW: the consumer decision belongs INSIDE the wave gate, not in a conditional rider.
**Fix**: F-03's acceptance gate must include a live demo consumer (the natural one: diff
rendering in the version-history panel + the remix flow), or OD-api-2 must honestly offer
client-only ratification as the parsimony arm.

### A3 · MAJOR · Vacuous-green coverage: F-05's gate closes over holes in its own row list
F-05's gate is "every §3.4C divergence row has a verdict". But §3.4C is incomplete — probed
divergences absent from sweep AND program:
- **Creation-default visibility**: value palettes are born `visibility: "public"` at create
  (`service/crud.ts:97`) and at fork (`service/forks.ts:76`); fourier is born `draft` with
  owner required. This is a same-facility semantic divergence bigger than the unpublish-target
  row the program does adjudicate.
- Consequence for **OD-api-4**: the proposed invariant "anon-owned palettes cannot publish"
  is **vacuous-by-birth**. Anon creates are allowed (`routes/crud.ts:85` `userSlug ?? null`)
  and born public — they never touch the publish verb; nor can their creator ever unpublish
  (owner-gate never matches null, `publish.ts:54-64`). The REAL owner question — anon-create
  visibility policy / moderation posture — is nowhere in the program.
The gate is the close-class lie the charter warns about: green census over an incomplete
inventory. **Fix**: coverage must be derived from the live route+schema surface (conformance
probes per facility), not from the sweep's row list; add the born-visibility row and re-cut
OD-api-4 around it.

### A4 · MAJOR · Process mass violates C21, and two gates resurrect the owner-retired proof idiom
Five of eleven waves produce documents/apparatus, not product behavior: 01 (SPEC.md + census
gate), 02 (born-GREEN chores), 05 (contract text), 07 (vector corpus), 10 (a spec for a
facility the same program recommends BANKING). The critical path to the FIRST line of product
code is 01→02→08 — three process waves — while the one live user-facing defect (hsl/oklch/
named palettes rejected, F-04) queues behind a spec dependency it does not need (the cure is
self-contained; its born-RED test needs no SPEC.md). Worse, two gates re-introduce the
codification idiom the owner deleted as "overfit junk" (memory: feedback-proof-idiom-retired —
"Never re-introduce; enforce invariants structurally"): 01's "machine-readable row inventory
consumed by a coverage gate" (doc-vs-doc census) and 10's "no token-bearing URL construction
exists" test (a negative grep over the client). **Fix**: F-04 ships first with zero
dependencies; spec truth lives in ONE home (A6); the no-token invariant is a route/schema
conformance assertion (no token query param accepted server-side), not a source grep.

### A5 · MAJOR · F-07 is redundant apparatus contradicting its own C21 invocation
F-05 already deliverables "per-converged-row born-RED test specifications handed to F-06
and F-11". F-07 re-delivers the same rows as a mirrored fixture corpus with cross-repo
hash-equality checks and per-consumer "shims" normalizing camel/snake. Mirror drift, hash
bookkeeping, and normalizer shims ARE a mini-harness — the thing the wave claims not to
build. fourier already carries the full per-repo conformance battery (sweep §3.5); value has
`api/test/conformance/` (probed: exists). **Fix**: kill F-07; v3's test specs land directly
in each repo's existing conformance suite. Parity witness = the shared CONTRACT text + both
suites green, which is exactly today's (working) discipline.

### A6 · MODERATE · Dual normative authority: SPEC.md vs CRUD-CONTRACT v3
F-01 houses ETag/cursor/idempotency "as normative sections" of `api/SPEC.md`; F-05 adjudicates
the same semantics into CRUD-CONTRACT v3. Two normative homes for one contract = the
parallel-authority anti-pattern the canon bans for structure governance (P4.4's principle),
with no drift gate between them. **Fix**: v3 is the sole normative home for cross-repo
semantics; the value-side "spec" shrinks to the generated `openapi.json` + a thin facility
index pointing at v3 — or does not exist.

### A7 · MODERATE · Over-decomposition sand + wrong-repo ordering + a re-litigated decided row
- **F-02 is not a wave**: an expected-born-GREEN boundary wire + a tombstone; F-08's own
  dependency note admits they "share the check home". Fold 02 into 08.
- **F-08's ordering law is wrong-repo for 06**: "lands BEFORE 03/04/06/11 merge test
  additions" — F-06 is fourier-side; its test home is governed by 09(b), not by value's
  displacement. As written it serializes fourier work behind value housekeeping for nothing.
- **OD-api-1 re-litigates a decided addendum row**: C7's text IS the owner ruling ("stays at
  its current /api"), given later than P3.2 and binding ("addenda WIN"). The addendum asks
  for explicit reconciliation — that is a supersession-tombstone registry row, not a fresh
  STAY-vs-EXTRACT owner decision plus a ratification wave. Burning a docket slot + a wave on
  a decided row is the re-litigation §7 forbids.

### A8 · MODERATE · The flagship wave's breaking change is unpriced, and its recipe is topology-unsafe
(a) Retiring `POST /:slug/fork` on a split-deploy product (api at mbabb.fi.ncsu.edu/colors/,
demo on gh-pages) has a deploy-order window where the LIVE demo's fork affordance 404s —
repo-atomic client migration ≠ deploy-atomic. No api semver row exists anywhere (route
removal on api `2.0.0` = major → `3.0.0`). The canon prices every wedge (P4.2); this program
prices none of its own. (b) "Isomorphic to fourier `visualizations.py:488-612`" is unsafe as
a resurrection recipe: fourier's remix is deliberately NON-transactional
("standalone-topology-honest", viz.py:493); value's fork/remix write path is under
`withTransaction` with the H1 coverage invariant (`service/forks.ts:38-40,94-137`).
**Fix**: state that isomorphism is CONTRACT-level; the code recipe is `a8ff7792^` (value's
own txn-based J.W2 tree), never a port of fourier's write sequence; add the semver +
deploy-order pricing row.

### A9 · MODERATE · F-04's gate is underspecified for denormalized at-rest data
`oklab.ts`'s narrow domain is a DOCUMENTED deliberate fail-explicit boundary (D-HARDEN-3 §3
W4) with an in-file migration mandate (`oklab.ts:16-21`) — the wave is the pre-authorized
migration, not the discovery of an accident (framing matters for the record). The gate
"round-trip equivalence, no drift" has no tolerance, yet `oklabColors` is denormalized
at-rest AND queried by radius search (`crud-list.ts:159-181`) — an engine swap needs a
tolerance spec plus an explicit backfill/no-backfill decision row for existing docs, and the
acceptance-domain matrix (`currentColor`? `var()`? `none` keywords?) belongs on the OD sheet,
not inside a wave's "Fable adjudicates" pocket.

### A10 · MODERATE · fourier feature waves sit at the wrong altitude
F-06's gap half auto-commits PRODUCT and SECURITY decisions in fourier — a like/vote write
endpoint (a product feature), a user flag route, a session-hash migration with live-session
invalidation — as implementation waves inside a value-owned api program, on "silent-drop
candidate" evidence. `liked_ips` was deliberately STRIPPED (`viz.py:80`): restoring a likes
write path may re-litigate a decided prune, exactly the record-state discipline (P3.1
trichotomy) the canon applies everywhere else. **Fix**: the trio goes to fourier's own docket
as a RELAY letter + OD rows (P4.5's protocol shape, adapted); this program implements only
fourier's v3 convergence half unless the owner pulls the trio in.

### A11 · MINOR · Thrice under-application is unexplained
C20: the thrice loop runs on "every wave/cluster/prototype". The program applies it to 2 of
11 waves with no stated deviation rationale. Either annotate the parsimony trade (C17 Fable
cost) as an owner-visible tension or comply. Silence re-litigates the edict (P4.4's own rule).

Confirmed-right (for the adjudicator's ledger): the sweep truth base held up under every
probe I ran; 28 colocated api test files confirmed; `api/test/` + conformance suite exists
(displacement = unification into an existing home — F-08a is real); OD-api-5/6/8
recommendations are sound; STAY is the right verdict (mis-shaped, per A7); F-11's row set is
the correct value-side convergence list.

---

## C — COUNTER-PROGRAM (S2-PE-api; 6 waves + registry rows; code-first, one normative home)

1. **S2-A | value | OKLAB MIGRATION — ships first, depends on nothing.** Execute the in-file
   pre-authorized migration (`oklab.ts:16-21`) onto published `@mkbabb/value.js` parse→convert;
   born-RED `oklch()`/named-color 201 conformance; tolerance-specified equivalence on the
   legacy hex/rgb domain; explicit backfill/no-backfill decision row for at-rest `oklabColors`
   (the radius search is the consumer); acceptance-domain matrix on the OD sheet. C13 rider
   re-checks after 4.1.x Into work.
2. **S2-B | value | THE MIXING DOCKET + REMIX RAIL (OD-fused, consumer-mandatory).** Put the
   REAL trichotomy to the owner (client-only ratify / restore with mandatory UI consumer /
   restore + keep zero-delta fork verb — resolving A1 explicitly). On RESTORE: resurrect from
   `a8ff7792^` under `withTransaction` (H1 preserved; isomorphism is contract-level, A8b);
   born-RED diff-envelope + version.atomDiff + whichever no-op semantics the verb design
   ratifies; the demo consumer (version-history diff view + remix flow) is IN the acceptance
   gate (A2); api semver bump + deploy-order pricing row; fork tombstone iff retired.
3. **S2-C | both | CRUD-CONTRACT v3 — the single normative home.** Divergence adjudication
   including the rows the sweep missed (creation-default visibility; anon-create policy —
   A3); per-row CONVERGE/RATIFY verdicts; born-RED test specs handed DIRECTLY to each repo's
   existing conformance suite (no vector corpus, no SPEC.md twin); one thrice pass here.
4. **S2-D | value | CONVERGENCE LANDINGS.** cursor-400 + visibility transition guard +
   Mongo-TTL idempotency + demo stale-cursor 400 handling; born-RED from v3 specs (the F-11
   row set, kept intact).
5. **S2-E | value | API STRUCTURE PASS (absorbs F-02).** Displace the 28 colocated tests into
   the EXISTING `api/test/` tree + isomorphism check; bidirectional zero-import boundary rule;
   `_parity.ts` one-line CI wire; P3.2 supersession tombstone (registry row, per A7); route-
   removal discipline = CHANGELOG tombstone rule + a conformance test pinning the retired
   route's 404-with-tombstone — no census-diff apparatus. Lands before S2-B/D merge tests
   (value-side only).
6. **S2-F | fourier | CONVERGENCE + RELAY.** Implement fourier's v3 half + the mechanical
   pair (slugs.py shim dissolution; test-tree unification). The like/flag/session-hash trio
   goes as a RELAY letter + OD rows for fourier's docket (A10); implemented here only on
   owner pull. Layout adjudication (horizontal-vs-vertical) = one thrice pass amending v3's
   layer vocabulary.

**Registry rows, not waves**: share-URL backend = one v3 paragraph (unlisted-as-primitive +
no-token-in-URL as a server-side schema/route conformance assertion) + `/shares` BANKED as an
OD row with the named re-trigger, design deferred until the frontend state schema exists (the
program's own seam admits the dependency inversion); kf-has-no-api NULL record; the
born-public-fork/remix child-visibility row rides S2-C.

**Net vs the program**: 6 waves (vs 11), 3-4 OD rows that are real owner calls (mixing verb
design, anon-create visibility policy, fourier trio pull-in, /shares bank) instead of 8, zero
new cross-repo apparatus, zero grep-proof gates, and the only live user-facing defect cured
in the first wave instead of behind three process waves.

— Skeptic 2, thrice loop on F-PE-api. Every probe cited above run this session against
value.js `tranche-u` working tree, fourier-analysis working tree, and value.js git history.
